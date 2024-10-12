import bodyParser from "body-parser";
import express from "express";
import userRouter from "./routes/userRouter.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import galleryItemRouter from "./routes/galleryItemRoute.js";

const app = express();
app.use(bodyParser.json());

app.use("/api/users/",userRouter)
app.use("/api/gallery/",galleryItemRouter)

app.use((req,res,next)=>{
    const token = req.header("Authorization")?.replace("Bearer", "")
    if(token != null){
        jwt.verify(token,"secret",(err,decoded)=>{
            if(decoded != null){
                req.user = decoded
                console.log(decoded)
                next()
            }else{
                next()
            }
        })
    }else{
        next()
    }
})

const mongoUrl = "mongodb+srv://adminAshen:ashen2001@cluster0.aceud.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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