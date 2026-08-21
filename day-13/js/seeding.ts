import { prisma } from "../lib/prisma";

export async function seedData() {
  try {
    console.log("Starting database seed...");

    await prisma.assignments.deleteMany();
    await prisma.tickets.deleteMany();
    await prisma.categories.deleteMany();
    await prisma.customers.deleteMany();
    await prisma.customers.deleteMany();
    await prisma.users.deleteMany();
    console.log("Seeding categories...");
    await prisma.categories.createMany({
      data: [
        { id: 1, category: "Technical" },
        { id: 2, category: "Billing" },
      ],
    });

    console.log("Seeding customers...");
    await prisma.customers.createMany({
      data: [
        { id: 1, name: "deekhsiht", email: "deekshith@gmail.com" },
        { id: 2, name: "riya", email: "riya@gmail.com" },
      ],
    });

    console.log("Seeding users...");
    await prisma.users.createMany({
      data: [
        { id: 1, name: "rida", email: "rida@gmail.com" },
        { id: 2, name: "hawas", email: "hawas@gmail.com" },
      ],
    });

    console.log("Seeding tickets...");
    const rawTickets = [
      {
        id: 2,
        title: "issue in sudo access",
        description: "sudo command is not working",
        priority:"low",
        status: "open",
        customer_id: 1,
        category_id: 1,
      },
      {
        id: 4,
        title: "issue in active coding",
        description: "description of active coding time",
         priority:"high",
        status: "open",
        customer_id: 2,
        category_id: 1,
      },
      {
        id: 5,
        title: "issue in sudo access",
        description: "sudo command is not working",
        status: "open",
        customer_id: 1,
        category_id: 1,
      },
      {
        id: 6,
        title: "issue in active coding",
        description: "description of active coding time",
        status: "close",
        customer_id: 2,
        category_id: 1,
      },
      {
        id: 7,
        title: "issue in active coding",
        description: "description of active coding time",
        status: "open",
        customer_id: 1,
        category_id: 2,
      },
      {
        id: 8,
        title: "Buffer in video",
        description: "After each 1 minutes buferring happening",
         priority:"high",
        status: "open",
        customer_id: 1,
        category_id: 2,
      },
      {
        id: 3,
        title: "issue in discord",
        description: "Cannot create new server",
        status: "close",
        customer_id: 1,
        category_id: 1,
      },
      {
        id: 9,
        title: "new task",
        description: "new description",
         priority:"medium",
        status: "open",
        customer_id: 1,
        category_id: 1,
      },
    ];

    const result = await prisma.tickets.createMany({
      data: rawTickets as any,
      skipDuplicates: true,
    });

    console.log(`Successfully seeded ${result.count} tickets.`);
    return result;
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

seedData()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
