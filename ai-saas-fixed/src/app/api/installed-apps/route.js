import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const installedApps = await prisma.installedApp.findMany({
      where: { userId: session.user.id },
      include: { app: { include: { category: true } } },
      orderBy: { createdAt: "desc" },
    });

    return Response.json({ success: true, data: installedApps });
  } catch (error) {
    console.error("Error fetching installed apps:", error);
    return Response.json({ error: "Failed to fetch apps" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { appId, config } = await req.json();

    // Check if app exists
    const app = await prisma.app.findUnique({ where: { id: appId } });
    if (!app) {
      return Response.json({ error: "App not found" }, { status: 404 });
    }

    // Check if already installed
    const existing = await prisma.installedApp.findUnique({
      where: { appId_userId: { appId, userId: session.user.id } },
    });

    if (existing) {
      return Response.json({ error: "App already installed" }, { status: 400 });
    }

    // Install app
    const installed = await prisma.installedApp.create({
      data: {
        name: app.name,
        appId,
        userId: session.user.id,
        config: config || {},
      },
      include: { app: { include: { category: true } } },
    });

    return Response.json({ success: true, data: installed }, { status: 201 });
  } catch (error) {
    console.error("Error installing app:", error);
    return Response.json({ error: "Failed to install app" }, { status: 500 });
  }
}
