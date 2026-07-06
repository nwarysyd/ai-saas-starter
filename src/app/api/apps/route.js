import { prisma } from "@/lib/prisma";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const featured = searchParams.get("featured") === "true";
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const offset = parseInt(searchParams.get("offset") || "0", 10);

    const where = {
      isPublic: true,
      ...(category && { category: { slug: category } }),
      ...(featured && { featured: true }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
          { tags: { has: search } },
        ],
      }),
    };

    const [apps, total] = await Promise.all([
      prisma.app.findMany({
        where,
        include: { category: true },
        orderBy: [{ featured: "desc" }, { rating: "desc" }],
        take: limit,
        skip: offset,
      }),
      prisma.app.count({ where }),
    ]);

    return Response.json({
      success: true,
      data: apps,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });
  } catch (error) {
    console.error("Error fetching apps:", error);
    return Response.json(
      { success: false, error: "Failed to fetch apps" },
      { status: 500 }
    );
  }
}
