const { PrismaClient } = require('@prisma/client');
const APP_CATALOG = require('../src/lib/apps/appRegistry.js').APP_CATALOG;
const APP_CATEGORIES = require('../src/lib/apps/appRegistry.js').APP_CATEGORIES;

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with AIForge apps...');

  // Create categories
  const categories = {};
  for (const [key, category] of Object.entries(APP_CATEGORIES)) {
    const created = await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: {
        name: category.name,
        slug: category.slug,
        description: `Collection of ${category.name} tools`,
        icon: category.icon,
        color: category.color,
      },
    });
    categories[key] = created;
    console.log(`✓ Created category: ${category.name}`);
  }

  // Create apps
  let appCount = 0;
  for (const [appId, appManifest] of Object.entries(APP_CATALOG)) {
    const categoryKey = appManifest.category.toUpperCase();
    const category = categories[categoryKey];

    if (!category) {
      console.warn(`⚠ Category not found for app: ${appManifest.name}`);
      continue;
    }

    await prisma.app.upsert({
      where: { slug: appManifest.slug },
      update: {
        manifest: appManifest,
        featured: appManifest.featured,
      },
      create: {
        name: appManifest.name,
        slug: appManifest.slug,
        description: appManifest.description,
        longDescription: appManifest.longDescription || appManifest.description,
        icon: appManifest.icon,
        author: appManifest.author,
        version: appManifest.version,
        rating: appManifest.rating,
        downloads: appManifest.downloads,
        creditCost: appManifest.creditCost,
        isPublic: appManifest.isPublic,
        featured: appManifest.featured,
        tags: appManifest.tags,
        categoryId: category.id,
        manifest: appManifest,
      },
    });
    console.log(`✓ Created app: ${appManifest.name}`);
    appCount++;
  }

  console.log(`\n✅ Seeding complete! Added ${Object.keys(categories).length} categories and ${appCount} apps.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
