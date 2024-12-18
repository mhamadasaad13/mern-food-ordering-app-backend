import express , {Request , Response} from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import MyUserRoute from "./routes/MyUserRoute"
import MyRestaurantRoute from "./routes/MyRestaurantRoute";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
    .then(()=>{
        console.log("Connected to DB");
})

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/health" , async (req:Request , res:Response)=>{
    res.send({message:"health ok !"});
});

app.use("/api/my/user"  , MyUserRoute);
app.use("/api/my/restaurant"  , MyRestaurantRoute)
app.listen(7070 , ()=>{
    console.log("server run on porte 7070")
});
