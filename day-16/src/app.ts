import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { requestLogger } from "./middleware/requestLogger.ts";
import { errorhandler, notFoundHandler } from "./middleware/errorhandler.ts";
import { prisma } from "./db/prisma.ts";
import ticketRoutes from "./module/tickets/ticket.routes.ts";
import { authRoutes } from "./module/auth/auth.routes.ts";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(requestLogger);

app.get("/health", async (_request, response, next) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    response.json({
      status: "ok",
      database: "connected",
    });
  } catch (error) {
    next(error);
  }
});

app.get("/", (_req, res) => {
  res.send("Welcome to Home Page");
});

app.use('/api/auth',authRoutes)
// app.use("/", ticketRoutes);

app.use(notFoundHandler);
app.use(errorhandler);
export default app;
