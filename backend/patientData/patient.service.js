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
};
