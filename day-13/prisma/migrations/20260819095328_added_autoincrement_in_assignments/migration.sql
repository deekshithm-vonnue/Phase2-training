-- AlterTable
CREATE SEQUENCE assignments_id_seq;
ALTER TABLE "assignments" ALTER COLUMN "id" SET DEFAULT nextval('assignments_id_seq');
ALTER SEQUENCE assignments_id_seq OWNED BY "assignments"."id";

-- AlterTable
CREATE SEQUENCE categories_id_seq;
ALTER TABLE "categories" ALTER COLUMN "id" SET DEFAULT nextval('categories_id_seq');
ALTER SEQUENCE categories_id_seq OWNED BY "categories"."id";

-- AlterTable
CREATE SEQUENCE comments_id_seq;
ALTER TABLE "comments" ALTER COLUMN "id" SET DEFAULT nextval('comments_id_seq');
ALTER SEQUENCE comments_id_seq OWNED BY "comments"."id";
