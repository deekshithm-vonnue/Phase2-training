import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { v4 as uuidv4 } from "uuid";
import { requestLogger } from "./middleware/requestLogger.ts";
import { errorhandler, notFoundHandler } from "./middleware/errorhandler.ts";
import { prisma } from "./db/prisma.ts";
import { authRoutes } from "./module/auth/auth.routes.ts";
import ticketRoutes from "./module/tickets/ticket.routes.ts";
import { userRoutes } from "./module/users/user.routes.ts";
import { rateLimter } from "./middleware/ratelimiter.middleware.ts";
import { IncomingMessage } from "node:http";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.ts";

const app = express();

app.use(helmet());
app.use(rateLimter());
app.use((req, res, next) => {
  (req as any).id = uuidv4();
  next();
});
app.use(cors());
app.use(express.json({ limit: "1kb" }));
morgan.token("id", (req: IncomingMessage & { id?: string }) => {
  return req.id || "";
});

const logformat = ":id :method :url :status : response-time ms";
app.use(morgan(logformat));

// app.use(requestLogger);

/**
 * @openapi
 *  /health:
 *    get:
 *      summary: Get the status of database connection
 *      tags: [Health]
 *      responses:
 *        200:
 *          description: Database connection successfull
 */
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

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/users", userRoutes);

app.use(notFoundHandler);
app.use(errorhandler);
export default app;
