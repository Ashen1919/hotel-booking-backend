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
    const user = req.body
    User.find()
        .then((usersList) => {
            res.json({
                message: "Users found",
                user: user,
                users: usersList
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "Failed to retrieve users",
                error: error.message,
            });
        });
}

export function findByEmail(req, res) {
    const email = req.params.email
    User.findOne({ email: email }).then((result) => {
        if (result == null) {
            res.status(404).json({
                message: "User not found"
            });
        } else {
            res.status(200).json({
                user: result
            });
        }
    }).catch(() => {
        res.status(500).json({
            message: "Failed to get users"
        });
    });
}

export function postUser(req, res) {
    const { password, firstName, lastName, email, whatsapp, profileImage } = req.body;

    // Hash the password
    const saltRounds = 10;
    const passwordHash = bcrypt.hashSync(password, saltRounds);

    // Create new user with hashed password and default profile picture if not provided
    const newUser = new User({
        firstName,
        lastName,
        email,
        password: passwordHash, // Use hashed password
        whatsapp,
        profileImage,
    });

    // Save the user and handle possible errors
    newUser
        .save()
        .then(() => {
            res.json({
                message: "User created successfully",
            });
        })
        .catch((error) => {
            console.error("Error saving user:", error); // Log the error for debugging
            res.status(500).json({
                error: error.message, // Send a readable error message
                message: "Failed to Create user",
            });
        });
}

export function putUser(req,res){
    const email = req.params.email
    const updateInfo = req.body
    User.updateOne({email : email}, {$set : updateInfo}).then(()=>{
        res.json({
            message : "User updated successfully"
        })
    }).catch((err)=>{
        res.json({
            message : "Failed to update",
            error: err.message
        })
    })
}

export function deleteUser(req,res){
    const email = req.params.email
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
                        type : user.type,
                        profileImage: user.profileImage
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