import express from "express";
import { requestLogger } from "./middileware/requestLogger.ts";
import router from "./router.ts";
const app = express();

app.use(express.json());

app.use(requestLogger);

app.use("/tasks", router);

app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: "Not found",
  });
});

app.use((err: any, req: any, res: any, next: any) => {
  res.status(500).json({
    message: "Internal Server Error",
  });
});

export default app;
