import { prisma } from "../lib/prisma.ts";
import app from "./app.ts";
import db from "./db.ts";
const hostname = "localhost";
const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port} wiht url http://${hostname}:${port}`);
});

process.on("SIGINT", async () => {
  console.log("Shutting down server gracefully...");
  await prisma.$disconnect();
  process.exit(0);
});
