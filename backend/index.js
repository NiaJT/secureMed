import express from "express";
import dotenv from "dotenv";
import connectDB from "./connectDB.js";
import { UserController } from "./user/userController.js";
dotenv.config();
const app = express();
app.use(express.json());
connectDB();
app.use("/user", UserController);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("App is listening at port", PORT);
});
