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
