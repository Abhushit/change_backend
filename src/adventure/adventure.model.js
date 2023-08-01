import mongoose, { Schema } from "mongoose";


const AdventureSchema = new Schema({
    image: [{ type: String}],
    title: {
        type: String,
        required: true,
    },
    description: String,
    location: String,
    price: String,
    bookable: {
        type: String,
        enum: ["Yes", "No"]
    },
    enabled: {
        type: String,
        enum: ["Enabled", "Disabled"]
    }
},{ timestamps:true })

export default mongoose.model("adventure", AdventureSchema);