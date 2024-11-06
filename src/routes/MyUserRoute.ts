import express , {Response , Request, NextFunction } from "express";
import MyUserController from "../controllers/MyUserController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";
const router = express.Router();

router.get("/" 
        ,jwtCheck ,
        jwtParse as (req:Request , res:Response  , next:NextFunction)=>Promise<any>,
        MyUserController.getCurrentUser as (req:Request , res:Response)=>Promise<any>)

router.post("/" , 
    jwtCheck, 
    MyUserController.createCurrentUser as (req:Request , res:Response)=>Promise<any>);

router.put("/" , 
    jwtCheck, 
    jwtParse as (req:Request , res:Response  , next:NextFunction)=>Promise<any>,
    validateMyUserRequest as [any],
    MyUserController.updateCurrentUser as (req:Request , res:Response)=>Promise<any>)

export default router;
