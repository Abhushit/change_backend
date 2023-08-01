import mongoose, { Schema } from "mongoose";


const GroupSchema = new Schema({
    name: String,
   description: String,
    member: [{
        type: Schema.Types.ObjectId, ref: "guests"
    }],
    tags: [{
        type: Schema.Types.ObjectId, ref: "tags"
    }]
},{timestamps:true})

export default mongoose.model("groups", GroupSchema);