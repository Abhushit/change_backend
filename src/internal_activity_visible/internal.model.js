import mongoose, { Schema } from "mongoose";


const InternalSchema = new Schema({
    pageVisible: {
        type: Boolean,
        default: false
    }
},{ timestamps:true })


export default mongoose.model("internal_page_visible",InternalSchema);