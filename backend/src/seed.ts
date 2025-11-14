import { PrismaClient, Prisma } from "@prisma/client"

const prisma = new PrismaClient();

const menuItems: Prisma.MenuItemCreateInput[] = [
  {
    title: "North Indian",
    imageUrl: "/images/foods/north indian.png",
    description: "Authentic North Indian Thali, rich in spices and flavors.",
    price: 250,
  },
  {
    title: "Chinese",
    imageUrl: "/images/foods/chineseFood.png",
    description: "Delicious schezwan noodles and gobi manchurian.",
    price: 180,
  },
  {
    title: "Beverages",
    imageUrl: "/images/foods/beverages.png",
    description: "Cool and refreshing drinks, including shakes and mocktails.",
    price: 90,
  },
  {
    title: "Ice Cream",
    imageUrl: "/images/foods/ice cream.png",
    description: "Creamy scoops of vanilla, chocolate, and butterscotch.",
    price: 120,
  },
]

async function main() {
  console.log("Start seeding ...");
  
  for (const item of menuItems) {

    await prisma.menuItem.upsert({
      where: { title: item.title }, 
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