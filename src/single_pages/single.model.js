import mongoose, { Schema } from "mongoose";


const SingleSchema = new Schema({
    image: [{type:String}],
    icon: String,
    title: {
        type: String,
        required: true,
    },
    description: String,
    enabled: {
        type: String,
        enum: ["Enabled", "Disabled"]
    },
    pageVisible: Boolean,
    // groups: [{
    //     type: Schema.Types.ObjectId, ref: "groups"
    // }],
    // members: [{
    //     type: Schema.Types.ObjectId, ref: "guests"
    // }],
    // tags: [{
    //     type: Schema.Types.ObjectId, ref: "tags"
    // }],
},{ timestamps: true })

export default mongoose.model("single_pages", SingleSchema);