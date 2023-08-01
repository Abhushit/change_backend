import mongoose, { Schema } from "mongoose";


const AdventureSchema = new Schema({
    pageVisible: {
        type: Boolean,
        default: false
    }
},{ timestamps:true })


export default mongoose.model("adventure_visible",AdventureSchema);