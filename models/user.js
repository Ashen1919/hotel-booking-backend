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
    profileImage : {
        type: String,
        required: false,
        default: "https://cloud.appwrite.io/v1/storage/buckets/672a1e700037c646954e/files/674578c80028b7645a44/view?project=672a1dc2000b4396bb7d&project=672a1dc2000b4396bb7d&mode=admin"
    }
    
})

const User = mongoose.model("user", userSchema)
export default User 