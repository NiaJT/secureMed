// /utils/hasher.js
import crypto from "crypto";

function sha256(data) {
  return crypto.createHash("sha256").update(data).digest("hex");
}

export default sha256;
