import express from "express";
import validateReqBody from "../middleware/validatereqbody.middleware.js";
import { patientValidationSchema } from "./patient.validation.js";

import { isUser } from "../middleware/authentication.middleware.js";
import { addPatientData } from "./patient.service.js";

const router = express.Router();
router.post(
  "/add",
  isUser,
  validateReqBody(patientValidationSchema),
  addPatientData
);
export { router as PatientController };
