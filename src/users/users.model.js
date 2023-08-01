import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      spare: true,
      // required: true,
    },
    password: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "super admin"],
      default: "admin",
    },
  },
  { timestamps: true }
);

export default mongoose.model("users", UserSchema);
