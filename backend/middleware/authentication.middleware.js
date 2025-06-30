import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserTable from "../user/userModel.js";
dotenv.config();
export const isUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .send({ message: "Unauthorized: No token provided" });
    }
    const payload = jwt.verify(token, process.env.SecretKey);
    const user = await UserTable.findOne({ email: payload.email });
    if (!user) {
      return res.status(401).send({ message: "Unauthorized: User not found" });
    }
    req.loggedInUser = user._id;
    next();
  } catch (error) {
    return res.status(404).send({ message: "Unauthorized: Invalid token" });
  }
};
export const isDoctor = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .send({ message: "Unauthorized: No token provided" });
    }
    const payload = jwt.verify(token, process.env.SecretKey);
    const user = await UserTable.findOne({ email: payload.email });
    if (!user) {
      return res.status(401).send({ message: "Unauthorized: User not found" });
    }
    if (user.role !== "doctor") {
      return res.status(401).send({ message: "Unauthorized for verification" });
    }
    req.loggedInUser = user._id;
    next();
  } catch (error) {
    console.log("error:",error);
    return res.status(404).send({ message: "Unauthorized: Invalid token" });
  }
};
