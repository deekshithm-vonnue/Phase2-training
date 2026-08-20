-- AlterTable
CREATE SEQUENCE tickets_id_seq;
ALTER TABLE "tickets" ALTER COLUMN "id" SET DEFAULT nextval('tickets_id_seq');
ALTER SEQUENCE tickets_id_seq OWNED BY "tickets"."id";
