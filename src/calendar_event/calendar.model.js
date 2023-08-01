import mongoose, { Schema } from "mongoose";


const CalendarEventSchema = new Schema({
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

export default mongoose.model("calendar_event",CalendarEventSchema);