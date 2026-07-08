require("dotenv/config");
const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("@prisma/client");

const adapter = new PrismaPg({
  connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  const categories = [
    { name: "Image Generation", slug: "image",   icon: "🖼️",  color: "#ec4899", order: 1, description: "AI-powered image and art generation tools" },
    { name: "Video Generation", slug: "video",   icon: "🎬",  color: "#f59e0b", order: 2, description: "Create stunning AI videos from text or images" },
    { name: "Audio & Music",    slug: "audio",   icon: "🎵",  color: "#8b5cf6", order: 3, description: "Generate music, audio effects, and voice content" },
    { name: "Text Generation",  slug: "text",    icon: "📝",  color: "#6366f1", order: 4, description: "AI writing assistants and content generators" },
    { name: "Image Editing",    slug: "editing", icon: "✏️",  color: "#10b981", order: 5, description: "Edit, enhance, and transform existing images" },
    { name: "Voice & Speech",   slug: "voice",   icon: "🎤",  color: "#ef4444", order: 6, description: "Text-to-speech and voice cloning tools" },
    { name: "Design Tools",     slug: "design",  icon: "🎨",  color: "#f97316", order: 7, description: "AI-assisted design and creative tools" },
    { name: "Enhancement",      slug: "upscale", icon: "✨",  color: "#06b6d4", order: 8, description: "Upscale and enhance image resolution" },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
    console.log(`  ✓ Category: ${cat.name}`);
  }

  console.log("✅ Seeding complete!");
}

main()
  .catch((e) => { console.error("❌ Seed failed:", e); process.exit(1); })
  .finally(() => prisma.$disconnect());
