import mongoose from "mongoose";
import { string } from "yup";

const patientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  name: String,
  age: Number,
  gender: String,
  allergies: [String],
  chronicDiseases: [String],
  emergencyContact: {
    name: String,
    phone: String,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  reports: [
    {
      reportTitle: {
        type: String,
        required: true,
        trim: true,
      },
      reportDescription: {
        type: String,
        trim: true,
      },
      reportFileUrl: {
        type: String,
        required: true,
      },
      uploadedAt: {
        type: Date,
        default: Date.now,
      },

      accessLevel: {
        type: String,
        enum: ["private", "doctor-patient", "admin"],
        default: "doctor-patient",
      },
      verificationStatus: {
        type: String,
        enum: ["pending", "verified", "rejected"],
        default: "pending",
      },
      verifiedAt: Date,
      verificationRemarks: String,
    },
  ],
  verifiedAt: Date,
  qrToken: { type: String, default: null },
});

const PatientTable = mongoose.model("Patients", patientSchema);
export default PatientTable;
