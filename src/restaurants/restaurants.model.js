import mongoose, { Schema } from "mongoose";

const RestaurantSchema = new Schema({
    image: [{ type: String}],
    title: {
        type: String,
        required: true
    },
    shortDescription: String,
    location: String,
    phone: String,
    email: String,
    openHours: String,
    priceRange: String,
    bookable:{
        type: String,
        enum: ["Yes","No"]
    },
    enabled: {
        type: String,
        enum: ["Enabled","Disabled"]
    }
},{timestamps:true})

export default mongoose.model("restaurants",RestaurantSchema);