import mongoose, { Schema } from "mongoose";


const ExtraSchema = new Schema({
    image: [{ type: String}],
    title: {
        type: String,
        required: true
    },
    description: String,
    price: String,
    bookable: {
        type: String,
        enum: ["Yes","No"]
    },
    enabled: {
        type: String,
        enum: ["Enabled", "Disabled"]
    }
},{ timestamps:true })

export default mongoose.model("extra_service", ExtraSchema);