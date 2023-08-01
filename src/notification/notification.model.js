import mongoose, { Schema } from "mongoose";


const NotificationSchema = new Schema({
    title: {
        required: true,
        type: String
    },
    text: String,
    deliveryDate: Date,
    status: {
        type:String,
        enum: ["Delivery Filed", "Sent"]
    },
    groups: [{ type: Schema.Types.ObjectId, ref: "groups" }],
    members: [{ type: Schema.Types.ObjectId, ref: "guests" }],
    tags: [{ type: Schema.Types.ObjectId, ref: "tags" }],
},{ timestamps:true });

export default mongoose.model("notifications",NotificationSchema);