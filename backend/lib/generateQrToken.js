import {
  SignJWT,
  jwtVerify,
  CompactEncrypt,
  compactDecrypt,
  generateSecret,
} from "jose";
import dotenv from "dotenv";
dotenv.config();

// We'll use the same secret from env, but convert it to a Uint8Array key for JWE
const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

export async function generateQRToken(userId) {
  // Create JWT payload
  const payload = {
    sub: userId,
    verified: true,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 90 * 24 * 60 * 60, // 90 days
  };

  // Stringify and encode payload
  const encoder = new TextEncoder();
  const plaintext = encoder.encode(JSON.stringify(payload));

  // Encrypt the payload as JWE (direct encryption with A256GCM)
  const jwe = await new CompactEncrypt(plaintext)
    .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
    .encrypt(secretKey);

  return jwe; // encrypted JWT token string
}
