import { generateQRToken } from "../lib/generateQrToken.js";
import PatientTable from "./patient.model.js";

export const addPatientData = async (req, res) => {
  try {
    const patientData = req.body;
    const userId = req.loggedInUser;

    const patientExists = await PatientTable.findOne({ user: userId });
    if (patientExists) {
      return res
        .status(409)
        .send({ message: "Patient data already exists. Try updating it." });
    }

    // Add patient field from logged-in user
    const newPatient = {
      ...patientData,
      user: userId,
    };

    await PatientTable.create(newPatient);

    return res.status(201).send({ message: "Patient data added successfully" });
  } catch (error) {
    console.error("Error adding patient data:", error);
    return res.status(400).send({ message: "Invalid Operation" });
  }
};
export const getPatientDetails = async (req, res) => {
  try {
    const userId = req.loggedInUser;
    const patientDetails = await PatientTable.findOne({ user: userId });
    if (!patientDetails) {
      res.status(400).send({ message: "User has no medical Records" });
    }
    return res.status(200).send({ message: "Success", patientDetails });
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Couldn't get patient medical details" });
  }
};
export const verifyReports = async (req, res) => {
  try {
    const { patientId, reportId, action, remarks } = req.body;

    if (!patientId || !reportId || !action) {
      return res.status(400).send({ message: "Missing required fields." });
    }

    if (!["verify", "reject"].includes(action)) {
      return res.status(400).send({ message: "Invalid action." });
    }

    const patient = await PatientTable.findOne({ _id: patientId });
    if (!patient) {
      return res.status(404).send({ message: "Patient not found." });
    }

    const report = patient.reports.id(reportId);
    if (!report) {
      return res.status(404).send({ message: "Report not found." });
    }

    // Update verification
    report.verificationStatus = action === "verify" ? "verified" : "rejected";
    report.verifiedAt = new Date();
    report.verificationRemarks = remarks || "";

    // Check if all reports are verified
    const isVerified = patient.reports.every(
      (report) => report.verificationStatus === "verified"
    );

    if (isVerified) {
      // Only generate token if it doesn't already exist
      if (!patient.qrToken) {
        const qrToken = await generateQRToken(patient._id); // creates a signed encrypted JWT
        patient.qrToken = qrToken;
        patient.verifiedAt = new Date();
      }
    } else {
      patient.qrToken = null; // Remove QR if not all are verified
    }

    await patient.save();

    return res.status(200).send({ message: "Report updated successfully." });
  } catch (error) {
    console.error("Verification error:", error);
    return res.status(500).send({ message: "Internal server error." });
  }
};
