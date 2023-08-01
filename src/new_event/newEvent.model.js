import mongoose, { Schema } from "mongoose";


const NewEventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    location: String,
    start: String,
    end: String,
    bookable:{
        type: String,
        enum: ["Yes","No"]
    }
},{timestamps:true})

export default mongoose.model("new_event",NewEventSchema);