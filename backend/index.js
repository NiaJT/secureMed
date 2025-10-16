import express from "express";
import dotenv from "dotenv";
import connectDB from "./connectDB.js";
import { UserController } from "./user/userController.js";
import { PatientController } from "./patientData/patientController.js";
import cors from "cors";
dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.1.9:3000/","https://secure-med.vercel.app"],
  })
);
connectDB();
app.use("/user", UserController);
app.use("/patient-data", PatientController);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("App is listening at port", PORT);
});
