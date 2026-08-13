import express from "express";
import { requestLogger } from "./middleware/requestLogger.ts";

const app = express();

app.use(express.json());
app.use(requestLogger);
app.get('/',(req,res)=>{
    res.send("hello")
})
export default app;
