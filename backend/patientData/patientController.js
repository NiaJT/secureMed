import express from "express";
import validateReqBody from "../middleware/validatereqbody.middleware.js";
import {
  patientValidationSchema,
  updatePatientValidationSchema,
} from "./patient.validation.js";

import { isDoctor, isUser } from "../middleware/authentication.middleware.js";
import {
  addPatientData,
  getPatientDetails,
  verifyReports,
} from "./patient.service.js";
import PatientTable from "./patient.model.js";

const router = express.Router();
router.post(
  "/add",
  isUser,
  validateReqBody(patientValidationSchema),
  addPatientData
);
router.get("/detail", isUser, getPatientDetails);
router.put("/verify", isDoctor, verifyReports);
router.put(
  "/update",
  (req, res, next) => {
    console.log("aayo yaha");
    next();
  },
  isUser,
  validateReqBody(updatePatientValidationSchema),
  async (req, res) => {
    try {
      const patientData = req.body;
      const userId = req.loggedInUser;

      const patientExists = await PatientTable.findOne({ user: userId });
      if (!patientExists) {
        return res.status(404).send({
          message:
            "Patient data doesn't exist. Try adding your medical Report.",
        });
      }
      await PatientTable.findOneAndUpdate(
        { user: userId },
        { $set: { ...patientData } },
        { new: true }
      );

      return res.status(200).send({ message: "Updated data successfully" });
    } catch (error) {
      console.error("Error adding patient data:", error);
      return res.status(400).send({ message: "Invalid Operation" });
    }
  }
);

router.post("/list", isDoctor, async (req, res) => {
  try {
    const page = req.body.page || 1;
    const limit = req.body.limit || 10;
    const skip = (page - 1) * limit;

    const patientList = await PatientTable.aggregate([
      {
        $match: {
          "reports.verificationStatus": "pending",
        },
      },
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          _id: 1,
          user: 1,
          reports: 1,
        },
      },
    ]);

    return res.status(200).send({
      message: "Loaded patient data successfully",
      patientList,
    });
  } catch (error) {
    console.error("error:", error.message);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});
router.get("/getQr", isUser, async (req, res) => {
  try {
    const patientId = req.loggedInUser;
    const qrData = await PatientTable.findOne(
      { user: patientId },
      { qrToken: 1 }
    );
    if (!qrData || !qrData.qrToken) {
      return res.status(404).send({ message: "QR code not found" });
    }
    return res
      .status(200)
      .send({ message: "Loaded QR code successfully", qrCode: qrData.qrToken });
  } catch (error) {
    console.error("error:", error.message);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});
export { router as PatientController };
