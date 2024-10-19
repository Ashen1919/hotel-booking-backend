import mongoose from "mongoose";


const galleryItemsSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    image : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    }
})

const GalleryItem = mongoose.model("galleryItems", galleryItemsSchema)

export default GalleryItem;