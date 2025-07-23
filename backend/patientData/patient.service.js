import { generateQRToken } from "../lib/generateQrToken.js";
import PatientTable from "./patient.model.js";

import BlockchainBlock from "../blockchain/blockchain.model.js";
import { Blockchain } from "../blockchain/blockchain.service.js";
import sha256 from "../utils/hasher.js";

const addBlockToChain = async (data) => {
  const allBlocks = await BlockchainBlock.find().sort("index");
  const blockchain = new Blockchain(allBlocks);
  const newBlock = blockchain.addBlock(data);
  await BlockchainBlock.create(newBlock);
};

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

    const newPatient = {
      ...patientData,
      user: userId,
    };

    await PatientTable.create(newPatient);

    // 🔗 Blockchain log
    await addBlockToChain({
      action: "patient_data_added",
      patientId: userId,
      hash: sha256(JSON.stringify(patientData)),
    });

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
      return res.status(400).send({ message: "User has no medical Records" });
    }
    return res.status(200).send({ message: "Success", patientDetails });
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Couldn't get patient medical details" });
  }
};

export const scannedPatientDetails = async (req, res) => {
  try {
    const patientId = req.id;
    const patientDetails = await PatientTable.findOne({ _id: patientId });

    if (!patientDetails) {
      return res.status(400).send({ message: "User has no medical records" });
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

    report.verificationStatus = action === "verify" ? "verified" : "rejected";
    report.verifiedAt = new Date();
    report.verificationRemarks = remarks || "";

    await addBlockToChain({
      action: action === "verify" ? "report_verified" : "report_rejected",
      patientId,
      reportId,
      remarks,
      hash: sha256(`${reportId}:${action}:${remarks}`),
    });

    const isVerified = patient.reports.every(
      (report) => report.verificationStatus === "verified"
    );

    if (isVerified) {
      if (!patient.qrToken) {
        const qrToken = await generateQRToken(patient._id);
        patient.qrToken = qrToken;
        patient.verifiedAt = new Date();

        // 🔗 Log QR creation
        await addBlockToChain({
          action: "qr_generated",
          patientId,
          hash: sha256(qrToken),
        });
      }
    } else {
      patient.qrToken = null;
    }

    await patient.save();

    return res.status(200).send({ message: "Report updated successfully." });
  } catch (error) {
    console.error("Verification error:", error);
    return res.status(500).send({ message: "Internal server error." });
  }
};
