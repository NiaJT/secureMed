import express from "express";
import validateReqBody from "./../middleware/validatereqbody.middleware.js";
import { patientValidationSchema } from "./report.validation.js";

import { isUser } from "../middleware/authentication.middleware.js";
import PatientTable from "./report.model.js";
const router = express.Router();
router.post(
  "/add",
  isUser,
  validateReqBody(patientValidationSchema),
  async (req, res) => {
    try {
      const patientData = req.body;
      const userId = req.loggedInUser;
      const patientExists = await PatientTable.findOne({ user: userId });
      if (patientExists) {
        return res
          .status(404)
          .send({ message: "Patient data already exists try updating it" });
      }

      // Add patient field from logged-in user
      const newReport = {
        ...patientData,
        user: userId,
      };

      await PatientTable.create(newReport);

      return res.status(201).send({ message: "Report added successfully" });
    } catch (error) {
      console.error("Error adding report:", error);
      return res.status(400).send({ message: "Invalid Operation" });
    }
  }
);
export { router as ReportController };
