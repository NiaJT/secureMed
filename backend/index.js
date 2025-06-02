import express from "express";
import dotenv from "dotenv";
import connectDB from "./connectDB.js";
dotenv.config();
const app = express();
connectDB();
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("App is listening at port", PORT);
});
