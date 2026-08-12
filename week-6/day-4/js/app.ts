import express from "express";
import { requestLogger } from "./middileware/requestLogger.ts";
import router from "./router.ts";
const app = express();

app.use(express.json());

app.use(requestLogger);

app.use("/tasks", router);
export default app;
