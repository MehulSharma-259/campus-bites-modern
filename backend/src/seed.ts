// backend/src/seed.ts
import { PrismaClient } from "./generated/prisma/client.js";
import {Prisma} from "@prisma/client"

const prisma = new PrismaClient();

// Define your *actual menu items* here
const menuItems: Prisma.MenuItemCreateInput[] = [
  // --- North Indian Items ---
  {
    title: "Chola Bhatoora",
    price: 150,
    image: "/images/foods/chola-bhatoora.png", // <-- Public URL path
    category: "north_indian",
  },
  {
    title: "Paneer Butter Masala",
    price: 220,
    image: "/images/foods/paneer-butter-masala.jpeg", // <-- Public URL path
    category: "north_indian",
  },

  // --- Chinese Items ---
  {
    title: "Schezwan Noodles",
    price: 180,
    image: "/images/foods/schezwan-noodles.jpeg", // <-- Public URL path
    category: "chinese",
  },
  {
    title: "Gobi Manchurian",
    price: 160,
    image: "/images/foods/gobi-manchurian.jpeg", // <-- Public URL path
    category: "chinese",
  },

  // --- Beverage Items ---
  {
    title: "Cold Coffee",
    price: 90,
    image: "/images/foods/cold-coffee.jpeg", // <-- Public URL path
    category: "beverages",
  },

  // --- Ice Cream Items ---
  {
    title: "Chocolate Scoop",
    price: 120,
    image: "/images/foods/chocolate-ice-cream.png", // <-- Public URL path
    category: "ice_cream",
  },
];

async function main() {
  console.log("Start seeding ...");

  for (const item of menuItems) {
    await prisma.menuItem.upsert({
      where: { title: item.title }, // Assumes title is unique as per your schema
      update: {},
      create: item,
    });
    console.log(`Created or found menu item: ${item.title}`);
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });