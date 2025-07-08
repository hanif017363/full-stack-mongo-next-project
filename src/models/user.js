import mongoose from "mongoose";
import { Inder } from "next/font/google";

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minLength: 1,
      maxLength: 50,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      inder: true,
      trim: true,
      minLength: 5,
      maxLength: 30,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,

      default: "user",
    },
    image: String,
  },
  { timestamps: true }
);

// Create and export the model
export default mongoose.models.User || mongoose.model("User", userSchema);
