import { PrismaClient } from "@prisma/client";
import sampleData from "./sample-data";

async function main() {
  console.log("Seeding database with sample data...");
  const prisma = new PrismaClient();

  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: sampleData.products,
  });

  console.log("Database seeded with sample data");
}

main();
