import mongoose, { Schema } from "mongoose";

const ShoppingSchema = new Schema({
    image: String,
    title: {
        type: String,
        required: true
    },
    location: String,
    price: String,
    phone: String,
    email: String,
    openHours: String,
    description: String,
    enabled: {
        type: String,
        enum: ["Enabled", "Disabled"]
    }
},{timestamps:true})

export default mongoose.model("shopping", ShoppingSchema);