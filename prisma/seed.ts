import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed roles
  const adminRole = await prisma.role.upsert({
    where: { name: "ADMIN" },
    update: {},
    create: {
      id: "580b3c75-164f-4a3d-9891-9063c472740b",
      name: "ADMIN",
    },
  });

  const userRole = await prisma.role.upsert({
    where: { name: "USER" },
    update: {},
    create: {
      id: "580b3c75-164f-4a3d-9891-9063c472740a",
      name: "USER",
    },
  });

  console.log("✅ Roles seeded:", { adminRole, userRole });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
