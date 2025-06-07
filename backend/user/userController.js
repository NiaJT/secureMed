import express from "express";
import validateReqBody from "../middleware/validatereqbody.middleware.js";
import { loginCredentialSchema, RegisterSchema } from "./userValidation.js";
import { loginToken, registerUser } from "./userService.js";
const router = express.Router();
router.post("/register", validateReqBody(RegisterSchema), registerUser);
router.post("/login", validateReqBody(loginCredentialSchema), loginToken);
export { router as UserController };
