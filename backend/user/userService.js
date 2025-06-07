import UserTable from "./userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();
export const loginToken = async (req, res) => {
  const loginCredentials = req.body;
  const user = await UserTable.findOne({ email: loginCredentials.email });
  if (!user) {
    return res.status(400).send({ message: "Invalid Credentials" });
  }
  const plainPassword = loginCredentials.password;
  const hashedPassword = user.password;
  const passwordMatch = await bcrypt.compare(plainPassword, hashedPassword);
  if (!passwordMatch) {
    return res.status(404).send({ message: "Invalid Credentials" });
  }
  const payload = { email: user.email };
  const secretKey = process.env.SecretKey;
  const token = jwt.sign(payload, secretKey, {
    expiresIn: "7d",
  });
  user.password = undefined;
  return res.status(200).send({
    message: "Login Successful",
    accessToken: token,
    userDetails: user,
  });
};
export const registerUser = async (req, res) => {
  const newUser = req.body;
  const user = await UserTable.findOne({ email: newUser.email });
  if (user) {
    return res.status(404).send({ message: "User already exists" });
  }
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(newUser.password, saltRounds);
  newUser.password = hashedPassword;
  await UserTable.create(newUser);
  return res.status(200).send({ message: "User added Successfully" });
};
