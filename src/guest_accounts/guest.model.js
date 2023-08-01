import mongoose, { Schema } from "mongoose";


const GuestSchema = new Schema({
    name: String,
    email: String,
    phone:  String,
    checkinDate: Date,
    checkoutDate: Date,
    stayDays: String,
    // room: String,
    // status: {
    //     type: String,
    //     enum: ["Not yet checked in", "Onsite", "Checked-out"]
    // },
    account: {
        type: String,
        enum: ["active", "expired"]
    },
    // tags: [{
    //     type: Schema.Types.ObjectId, ref: "tags"
    // }]
},{timestamps: true})

export default mongoose.model("guests", GuestSchema);