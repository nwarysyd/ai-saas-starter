import { NextResponse } from "next/server";

// Allowed domains for download proxy (prevent SSRF)
const ALLOWED_PROTOCOLS = ["https:"];
const BLOCKED_HOSTS = ["localhost", "127.0.0.1", "0.0.0.0", "::1", "169.254.169.254"];

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const imageUrl = searchParams.get("url");

  if (!imageUrl) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  // Validate URL
  let parsedUrl;
  try {
    parsedUrl = new URL(imageUrl);
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  // Security: only HTTPS, no localhost/internal IPs
  if (!ALLOWED_PROTOCOLS.includes(parsedUrl.protocol)) {
    return NextResponse.json({ error: "Only HTTPS URLs are allowed" }, { status: 400 });
  }
  if (BLOCKED_HOSTS.some(h => parsedUrl.hostname === h || parsedUrl.hostname.endsWith(".internal"))) {
    return NextResponse.json({ error: "URL not allowed" }, { status: 403 });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000); // 15s timeout

    const res = await fetch(imageUrl, {
      signal: controller.signal,
      headers: { "User-Agent": "AI-SaaS-Downloader/1.0" },
    });
    clearTimeout(timeout);

    if (!res.ok) {
      throw new Error(`Upstream returned ${res.status}`);
    }

    // Guard against huge files (max 50MB)
    const contentLength = res.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > 50 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large" }, { status: 413 });
    }

    const buffer = await res.arrayBuffer();
    const contentType = res.headers.get("content-type") || "application/octet-stream";
    const ext = contentType.includes("video") ? "mp4"
      : contentType.includes("audio") ? "mp3"
      : contentType.includes("png") ? "png"
      : contentType.includes("webp") ? "webp"
      : "jpg";
    const filename = imageUrl.split("/").pop()?.split("?")[0] || `download_${Date.now()}.${ext}`;

    return new Response(Buffer.from(buffer), {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    if (err.name === "AbortError") {
      return NextResponse.json({ error: "Download timed out" }, { status: 504 });
    }
    console.error("Download proxy error:", err);
    // Redirect as last resort
    return NextResponse.redirect(imageUrl);
  }
}
