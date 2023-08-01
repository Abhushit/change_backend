import mongoose, { Schema } from "mongoose";


const ExtraSchema = new Schema({
    pageVisible: {
        type: Boolean,
        default: false
    }
},{ timestamps:true })


export default mongoose.model("extra_services_visible",ExtraSchema);