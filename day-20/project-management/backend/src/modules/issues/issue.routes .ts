import { Router } from "express"
import { issueController } from "./issue.controller";

export const issueRoutes = Router();



issueRoutes.get('/',(req,res,next)=>{
    issueController.list(req,res).catch(next)
})