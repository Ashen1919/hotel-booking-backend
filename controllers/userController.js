import jwt from "jsonwebtoken"
import User from "../models/user.js"
import bcrypt from "bcrypt"


export function isValidAdmin(req){
    if(req.user == null){
        return false;
    }
    if(req.user.type != "admin"){
        return false;
    }
    return true;
}
export function isValidCustomer(req){
    if(req.user == null){
        return false;
    }
    if(req.user.type != "customer"){
        return false;
    }
    return true;
}
export function getUser(req, res) {
    const user = req.body.user
    User.find()
        .then((usersList) => {
            res.json({
                message: "Users found",
                user: usersList
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "Failed to retrieve users",
                error: error.message,
            });
        });
}


export function postUser(req,res){
    const password = req.body.password
    const user = req.body

    const saltRounds = 10
    const passwordHash = bcrypt.hashSync(password, saltRounds);
    user.password = passwordHash

    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        whatsapp: req.body.whatsapp,
        profileImage: req.body.profilePicture || "https://cloud.appwrite.io/v1/storage/buckets/672a1e700037c646954e/files/674578c80028b7645a44/view?project=672a1dc2000b4396bb7d&project=672a1dc2000b4396bb7d&mode=admin"
      });
      
    newUser.save().then(()=>{
            res.json({
                message : "User created successfully"
            })
        }).catch((error)=>{
            res.status(500).json({
                error: error,
                message : "Failed to Create user"
            })
        })
}

export function putUser(req,res){
    const email = req.body.email
    const firstName = req.body.firstName
    User.updateOne({email : email}, {firstName : firstName}).then(()=>{
        res.json({
            message : "User updated successfully"
        })
    }).catch(()=>{
        res.json({
            message : "Failed to update"
        })
    })
}

export function deleteUser(req,res){
    const email = req.body.email
    User.deleteOne({email : email}).then(()=>{
        res.json({
            message : "User deleted successfully"
        })
    }).catch(()=>{
        res.json({
            message : "User delete failed"
        })
    })
}

export function loginUser(req,res){
    const credential = req.body
    User.findOne({email : credential.email}).then((user)=>{
        if(user == null){
            res.status(404).json({
                message : "User Not Found"
            })
        }else{
            const isValidPassword = bcrypt.compareSync(credential.password, user.password);
            if(!isValidPassword){
                res.status(403).json({
                    message : "Invalid password"
                })
            }else{
                try{
                    const payLoad = {
                        id : user._id,
                        email : user.email,
                        firstName : user.firstName,
                        lastName : user.lastName,
                        type : user.type
                    };
                    const token = jwt.sign(payLoad, process.env.JWT_KEY, {expiresIn: "48h"});
                    res.json({
                        message : "User Found",
                        user : user,
                        token : token
                    })
                }catch(error){
                    res.json({
                        error : error.message
                    })
                }
            }

            
        }
    })
}