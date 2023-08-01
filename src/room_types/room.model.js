import mongoose, { Schema } from "mongoose";

const RoomSchema = new Schema({
    image: String,
    name: String,
    description: String,
    tags: [{
        type: Schema.Types.ObjectId, ref:"tags"
    }]
},{timestamps: true})

export default mongoose.model("room_types", RoomSchema);