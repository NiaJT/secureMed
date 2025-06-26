import {
  SignJWT,
  jwtVerify,
  CompactEncrypt,
  compactDecrypt,
  generateSecret,
} from "jose";
import dotenv from "dotenv";
dotenv.config();

// Secret key for JWE (make sure it matches the one used during encryption)
const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

/**
 * Decrypts and parses the QR token back into its original payload
 */
export async function decodeQRToken(jweToken) {
  try {
    const { plaintext } = await compactDecrypt(jweToken, secretKey);
    const decoded = new TextDecoder().decode(plaintext);
    const payload = JSON.parse(decoded);

    return payload; // { sub, verified, iat, exp }
  } catch (err) {
    console.error("Failed to decrypt QR token:", err);
    throw new Error("Invalid or corrupted token");
  }
}
