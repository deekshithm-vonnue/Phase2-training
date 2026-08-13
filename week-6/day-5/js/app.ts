import express from "express";
import { requestLogger } from "./middleware/requestLogger.ts";
import router from "./router.ts";
import { errorhandler, notFoundHandler } from "./middleware/errorhandler.ts";

const app = express();

app.use(express.json());
app.use(requestLogger);
app.use("/tickets", router);
app.get("/", (req, res) => {
  res.send("Welcome to Home Page");
});

app.use(notFoundHandler);
app.use(errorhandler);
export default app;
