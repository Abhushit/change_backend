import mongoose, { Schema } from "mongoose";

const TagSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    color: String
},{ timestamps: true });

export default mongoose.model("tags", TagSchema);