import { prisma } from "../src/db/primsa";
import mockData from "../../forntend/mockdata.json";
import type { Priority, Status } from "../src/generated/prisma/client";
async function main() {
   //cleaning up database
  await prisma.issue.deleteMany({});
  await prisma.project.deleteMany({});

    console.log("seeding project");
  for (const project of mockData.projects) {
    await prisma.project.create({
      data: {
        id: project.id,
        title: project.title,
        code: project.code,
        description: project.description,
        priority: project.priority as Priority,
        status: project.status as Status,
        dueDate: new Date(project.dueDate),
      },
    });
  }

  console.log("seeding issue");
  for (const issue of mockData.issues) {
    await prisma.issue.create({
      data: {
        id: issue.id,
        title: issue.title,
        description: issue.description,
        priority: issue.priority as Priority,
        status: issue.status as Status,
        dueDate: new Date(issue.dueDate),
        projectId: issue.projectId,
      },
    });
  }

  console.log("seeding completed");
}

main()
  .catch((e) => {
    console.log(e);
    console.log("error in connecting database");
  })
  .finally(async () => {
     await prisma.$disconnect();
  });
