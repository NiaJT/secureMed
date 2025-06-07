import express from "express";
import validateReqBody from "../middleware/validatereqbody.middleware.js";
import { RegisterSchema } from "./userValidation.js";
import UserTable from "./userModel.js";
import bcrypt from "bcrypt";
const router = express.Router();
router.post("/register", validateReqBody(RegisterSchema), async (req, res) => {
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
});
export { router as UserController };
