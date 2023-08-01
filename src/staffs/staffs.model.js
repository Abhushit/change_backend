import mongoose, { Schema } from "mongoose";

const StaffSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        spare: true,
        required: true
    },
    jobTitle:{
        type: String
    },
    role:{
        type:String
    },
}, {timestamps: true})

export default mongoose.model("staffs", StaffSchema);