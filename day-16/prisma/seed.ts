import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";
import { TicketPriority, TicketStatus } from "@prisma/client";
import { Prisma } from "@prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

type SeedUser = {
  email: string;
  name: string;
  password: string;
  role: Role;
};

const users: SeedUser[] = [
  {
    email: "admin@example.com",
    name: "Rida",
    password: "Admin123!",
    role: Role.ADMIN,
  },
  {
    email: "agent@example.com",
    name: "Deekshith",
    password: "Agent123!",
    role: Role.AGENT,
  },
  {
    email: "user1@example.com",
    name: "hawas",
    password: "User123!",
    role: Role.USER,
  },
  {
    email: "user2@example.com",
    name: "neha",
    password: "User234!",
    role: Role.USER,
  },
];

async function upsertUser(user: SeedUser) {
  const passwordHash = await bcrypt.hash(user.password, 10);

  return prisma.user.upsert({
    where: { email: user.email },
    update: {
      name: user.name,
      role: user.role,
      passwordHash,
    },
    create: {
      email: user.email,
      name: user.name,
      role: user.role,
      passwordHash,
    },
  });
}

async function main() {
  const seededUsers = await Promise.all(users.map(upsertUser));
  const byEmail = new Map(seededUsers.map((user) => [user.email, user]));

  const agentId = byEmail.get("agent@example.com")?.id || null;
  const user1Id = byEmail.get("user1@example.com")?.id || null;
  const user2Id = byEmail.get("user2@example.com")?.id || null;

  const ticketInputs: Prisma.TicketUncheckedCreateInput[] = [
    {
      title: "Unable to reset password",
      description: "Password reset emails are not arriving for some accounts.",
      status: TicketStatus.OPEN,
      priority: TicketPriority.HIGH,
      assignedToId: agentId,
      createdById: user1Id, 
    },
    {
      title: "Incorrect invoice total",
      description: "Tax is being applied twice on renewal invoices.",
      status: TicketStatus.CLOSED,
      priority: TicketPriority.HIGH,
      assignedToId: agentId,
      createdById: user2Id, 
    },
    {
      title: "Cannot update profile",
      description: "Saving changes on the profile page returns a generic error.",
      status: TicketStatus.OPEN,
      priority: TicketPriority.MEDIUM,
      assignedToId: null,
      createdById: user1Id, 
    },
    {
      title: "Export report fails",
      description: "CSV export for weekly reports stops with a timeout.",
      status: TicketStatus.IN_PROGRESS,
      priority: TicketPriority.HIGH,
      assignedToId: agentId,
      createdById: user2Id, 
    },
  ];

  for (const ticket of ticketInputs) {
    await prisma.ticket.create({
      data: ticket,
    });
  }
  
  console.log("Seeding completed successfully.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error("Seed failed", error);
    await prisma.$disconnect();
    process.exit(1);
  });
