import express , {Response , Request, NextFunction} from "express";
import MyRestaurantController from "../controllers/MyRestaurantController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyRestaurantRequest } from "../middleware/validation";
const router = express.Router();
router.get("/" ,
    jwtCheck,
    jwtParse as (req:Request , res:Response  , next:NextFunction)=>Promise<any>,
    MyRestaurantController.getMyRestaurant as (req:Request , res:Response)=>Promise<any>
);

router.post("/" , 
    validateMyRestaurantRequest as [any],
    jwtCheck,
    jwtParse as (req:Request , res:Response  , next:NextFunction)=>Promise<any>,
    MyRestaurantController.createMyRestaurant as (req:Request , res:Response)=>Promise<any>
);

router.put("/" , 
    validateMyRestaurantRequest as [any],
    jwtCheck,
    jwtParse as (req:Request , res:Response  , next:NextFunction)=>Promise<any>,
    MyRestaurantController.updateMyRestaurant as (req:Request , res:Response)=>Promise<any>
);

export default router;