import mongoose, { Schema } from "mongoose";


const RestaurantSchema = new Schema({
    pageVisible: {
        type: Boolean,
        default: false
    }
},{ timestamps:true })


export default mongoose.model("restaurant_visible",RestaurantSchema);