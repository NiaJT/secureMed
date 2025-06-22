import jwt from "jsonwebtoken";
// Generates a JWT token for QR code verification.
import dotenv from "dotenv";
dotenv.config();
export function generateQRToken(userId) {
  return jwt.sign({ sub: userId, verified: true }, process.env.JWT_SECRET, {
    expiresIn: "3Months",
  });
}
