import express, { type Express, type Request, type Response } from "express";
import { projectRoutes } from "./modules/projects/project.routes";
import morgan from "morgan";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware";
import { issueRoutes } from "./modules/issues/issue.routes ";
import cors from "cors";
import { authRoutes } from "./modules/auth/auth.routes";
const app: Express = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});
app.use("/api/projects", projectRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/auth", authRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server running smoothly on port http://localhost:3000");
});
