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

export { router as PatientController };
