-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "ticket-management";

-- CreateEnum
CREATE TYPE "ticket-management"."Role" AS ENUM ('ADMIN', 'AGENT', 'USER');

-- CreateEnum
CREATE TYPE "ticket-management"."TicketStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED');

-- CreateEnum
CREATE TYPE "ticket-management"."TicketPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateTable
CREATE TABLE "ticket-management"."Ticket" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(30) NOT NULL,
    "description" TEXT NOT NULL,
    "priority" "ticket-management"."TicketPriority" NOT NULL DEFAULT 'MEDIUM',
    "status" "ticket-management"."TicketStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedToId" INTEGER,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket-management"."User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "ticket-management"."Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "ticket-management"."User"("email");

-- AddForeignKey
ALTER TABLE "ticket-management"."Ticket" ADD CONSTRAINT "Ticket_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "ticket-management"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

