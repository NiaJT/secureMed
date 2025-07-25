import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      required: true,
      maxlength: 255,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 255,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    dob: {
      type: Date,
      max: Date.now(),
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"],
    },
    role: {
      type: String,
      required: true,
      enum: ["patient", "doctor", "admin"],
    },
    address: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },

    // Add doctor-specific fields here as optional fields
    licenseNumber: {
      type: String,
      default: null,
    },
    specialization: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const UserTable = mongoose.model("User", userSchema);
export default UserTable;
