import { Router } from "express"
import { projectController } from "./project.controller";

export const projectRoutes = Router();



projectRoutes.get('/',(req,res,next)=>{
    projectController.list(req,res).catch(next)
})