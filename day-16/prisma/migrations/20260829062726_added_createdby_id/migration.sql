-- AlterTable
ALTER TABLE "ticket-management"."Ticket" ADD COLUMN     "createdById" INTEGER;

-- AddForeignKey
ALTER TABLE "ticket-management"."Ticket" ADD CONSTRAINT "Ticket_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "ticket-management"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
