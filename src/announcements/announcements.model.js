import mongoose, { Schema } from "mongoose";

const AnnouncementSchema = new Schema({
    image: String,
    title: {
        required: true,
        type: String
    },
    text: String,
    date: Date,
    // groups: [{
    //     type: Schema.Types.ObjectId, ref: "groups"
    // }],
    // members: [{
    //     type: Schema.Types.ObjectId, ref: "guests"
    // }],
    // tags: [{
    //     type: Schema.Types.ObjectId, ref: "tags"
    // }]
}, { timestamps: true });

export default mongoose.model("announcements", AnnouncementSchema);