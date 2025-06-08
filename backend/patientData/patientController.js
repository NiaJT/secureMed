import express from "express";
import validateReqBody from "../middleware/validatereqbody.middleware.js";
import { patientValidationSchema } from "./patient.validation.js";

import { isUser } from "../middleware/authentication.middleware.js";
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
export { router as PatientController };
