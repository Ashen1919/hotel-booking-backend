import mongoose from 'mongoose'

const categorySchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    description : {
        type : String,
        required : true
    },
    price : {
        type : String,
        required : true
    },
    image : {
        type : String,
        default : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREO3tkIJnmJZcWmgLLR-z973QVHQ8zbwDGnw&s"
    },
    features : [
        {
            type : String
        }
    ]
})

const Category = mongoose.model("category", categorySchema);

export default Category;