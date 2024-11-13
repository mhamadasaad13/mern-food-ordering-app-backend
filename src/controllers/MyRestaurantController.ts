import { Request , Response } from "express";
import Restaurant from "../models/restaurant";
import mongoose from "mongoose";

const getMyRestaurant = async (req:Request , res:Response)=>{
    try{
        const restaurant = await Restaurant.findOne({user : req.userId});
        if(!restaurant){
        return res.status(404).json({message: "Restaurant not found"});
        }
        res.json(restaurant);
    }catch(error){
        console.log(error);
        res.status(500).json({ message:"Error fetching restaurant" });
    }

};

const createMyRestaurant = async (req:Request , res:Response)=>{
    try{
        const existingRestaurant = await Restaurant.findOne({user : req.userId});
        if(existingRestaurant){
            return res.status(409).json({message: "User restaurant already exist"});
        }
        
        const newRestaurant = new Restaurant(req.body);
        newRestaurant.user = new mongoose.Types.ObjectId(req.userId);
        newRestaurant.lastUpdated = new Date();
        await newRestaurant.save();
        res.status(201).send(newRestaurant);
    }catch(error){
        console.log(error);
        res.status(500).json({ message:"Error Creating Restaurant" });
    }
};

const updateMyRestaurant = async (req:Request , res:Response)=>{
    try{
        const restaurant = await Restaurant.findOne({user : req.userId});
        if(!restaurant){
        return res.status(404).json({message: "Restaurant not found"});
        }
        
        restaurant.restaurantName = req.body.restaurantName;
        restaurant.city = req.body.city;
        restaurant.country = req.body.country;
        restaurant.deliveryPrice = req.body.deliveryPrice;
        restaurant.estimatedDelivaryTime = req.body.estimatedDelivaryTime;
        restaurant.cuisines = req.body.cuisines;
        restaurant.menuItems = req.body.menuItems;
        restaurant.lastUpdated = new Date();

        await restaurant.save();
        res.status(200).send(restaurant);

    }catch(error){
        console.log(error);
        res.status(500).json({ message:"Error updating Restaurant" });
    }
}

export default {
    getMyRestaurant,
    createMyRestaurant,
    updateMyRestaurant
}