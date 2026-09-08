import express, { type Express, type Request, type Response } from "express";
import { projectRoutes } from "./modules/projects/project.routes";
import morgan from "morgan";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware";
import { issueRoutes } from "./modules/issues/issue.routes ";
import cors from "cors";
const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(3000);
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/projects", projectRoutes);
app.use("/api/issues", issueRoutes);
app.use(notFoundHandler);
app.use(errorHandler);
