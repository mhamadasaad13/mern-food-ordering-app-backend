import { NextFunction  , Request , Response} from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors = async (req:Request , res:Response , next:NextFunction)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors:errors.array() });
    }
    next();
}

export const validateMyUserRequest = [
    body("name").isString().notEmpty().withMessage("Name must be a string"),
    body("addressLine1").isString().notEmpty().withMessage("AddressLine1 must be a string"),
    body("city").isString().notEmpty().withMessage("City must be a string"),
    body("country").isString().notEmpty().withMessage("Country must be a string"),
    handleValidationErrors
]

export const validateMyRestaurantRequest = [
    body("restaurantName").notEmpty().withMessage("Restaurant Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("deliveryPrice").isFloat({min:0}).withMessage("The delivery price must a positif number"),
    body("estimatedDelivaryTime").isInt({min:0}).withMessage("The estimated delivary time must a positif integar"),
    body("cuisines").isArray().withMessage("cuisines must be an array").not().isEmpty().withMessage("cuisines cannot be emty array"),
    body("menuItems").isArray().withMessage("Menu items must be an array"),
    body("menuItems.*.name").notEmpty().withMessage("Menu item name is required"),
    body("menuItems.*.price").isFloat({min:0}).withMessage("Menu item price must be required and a positif number"),
    handleValidationErrors
]   