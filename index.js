import bodyParser from "body-parser";
import express from "express";
import userRouter from "./routes/userRouter.js";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import galleryItemRouter from "./routes/galleryItemRoute.js";
import categoryRouter from "./routes/categoryRoute.js";
import dotenv from 'dotenv';
import roomRouter from "./routes/roomRoute.js";
dotenv.config();

export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token is required' });
    }

    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }

        req.user = user;  
        next();  
    });
}

const app = express();
app.use(bodyParser.json());

app.use("/api/users/",userRouter)
app.use("/api/gallery/",galleryItemRouter)
app.use("/api/category/", categoryRouter)
app.use("/api/rooms/", roomRouter)

const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl).then(
    ()=>{
        console.log("Connected to the database")
    }  
).catch(
    ()=>{
        console.log("Failed to connect to the database")
    }
)

app.listen(5000,(req,res)=>{
    console.log("Server is run on 5000 port")
}); 