import express from "express";
import validateReqBody from "../middleware/validatereqbody.middleware.js";
import { patientValidationSchema } from "./patient.validation.js";

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

export { router as PatientController };
