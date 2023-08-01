import mongoose, { Schema } from "mongoose";


const ShoppingSchema = new Schema({
    pageVisible: {
        type: Boolean,
        default: false
    }
},{ timestamps:true })


export default mongoose.model("shopping_visible",ShoppingSchema);