const crypto = require("crypto");

export function encrypt(text) {
  // The string length of NEXTAUTH_SECRET should be 32 to be qualified for aes-256-gcm
  const secretKey = process.env.NEXTAUTH_SECRET;

  const iv = new crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", secretKey, iv);

  let enc_utf = cipher.update(text, "utf8");
  let enc_buf = cipher.final();
  let auth_tag = cipher.getAuthTag();

  return Buffer.concat([enc_utf, enc_buf, iv, auth_tag]).toString("hex");
}

export function decrypt(encryptedString) {
  const secretKey = process.env.NEXTAUTH_SECRET;

  let enc = Buffer.from(encryptedString, "hex");
  const iv = enc.subarray(enc.length - 28, enc.length - 16);
  const auth_tag = enc.subarray(enc.length - 16);
  const enc_data = enc.subarray(0, enc.length - 28);

  const decipher = crypto.createDecipheriv("aes-256-gcm", secretKey, iv);
  decipher.setAuthTag(auth_tag);

  let rslt = decipher.update(enc_data, null, "utf8");
  rslt += decipher.final("utf8");
  return rslt;
}
