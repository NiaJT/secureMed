import express from "express";
import validateReqBody from "../middleware/validatereqbody.middleware.js";
import { patientValidationSchema } from "./patient.validation.js";

import { isDoctor, isUser } from "../middleware/authentication.middleware.js";
import { addPatientData, getPatientDetails } from "./patient.service.js";
import PatientTable from "./patient.model.js";

const router = express.Router();
router.post(
  "/add",
  isUser,
  validateReqBody(patientValidationSchema),
  addPatientData
);
router.get("/detail", isUser, getPatientDetails);
router.put("/verify", isDoctor, async (req, res) => {
  try {
    const { patientId, reportId, verificationRemarks, status } = req.body;

    if (!patientId || !reportId || !status) {
      return res.status(400).send({ message: "Missing required fields." });
    }

    if (!["verified", "rejected"].includes(status)) {
      return res.status(400).send({ message: "Invalid verification status." });
    }

    const patient = await PatientTable.findOne({ _id: patientId });

    if (!patient) {
      return res.status(404).send({ message: "Patient not found." });
    }

    const report = patient.reports.id(reportId);

    if (!report) {
      return res.status(404).send({ message: "Report not found." });
    }

    // Update verification info
    report.verificationStatus = status;
    report.verifiedAt = new Date();
    report.verificationRemarks = verificationRemarks || "";

    await patient.save();

    return res.status(200).send({ message: "Report verified successfully." });
  } catch (error) {
    console.error("Verification error:", error);
    return res.status(500).send({ message: "Internal server error." });
  }
});

export { router as PatientController };
