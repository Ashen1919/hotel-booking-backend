import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    type : {
        type : String,
        required : false,
        default : "Customer"
    },
    whatsapp : {
        type : String,
        required : true
    }, 
    password : {
        type : String,
        required : true
    },
    disabled : {
        type : Boolean,
        required : false,
        default : false
    },
    emailVerified : {
        type : Boolean,
        required : false,
        default : false
    },
    
})

const User = mongoose.model("user", userSchema)
export default User 