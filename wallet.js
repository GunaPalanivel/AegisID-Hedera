const fs = require("fs-extra");
const path = require("path");
const { encrypt, decrypt } = require("./encryption");

// Wallet directory
const WALLET_DIR = path.join(__dirname, "wallet");

// Initialize wallet directory
async function initWallet() {
  await fs.ensureDir(WALLET_DIR);
}

// Save a credential securely
async function saveCredential(filename, credential) {
  await initWallet();
  const encrypted = encrypt(JSON.stringify(credential));
  await fs.writeFile(
    path.join(WALLET_DIR, filename + ".json"),
    encrypted,
    "utf8"
  );
}

// Load a credential securely
async function loadCredential(did) {
  await initWallet();
  const safeDid = did.replace(/:/g, ""); // remove colons for filename
  const filepath = path.join(WALLET_DIR, safeDid + ".json");

  if (!(await fs.pathExists(filepath))) {
    throw new Error("Credential not found.");
  }

  const encrypted = await fs.readFile(filepath, "utf8");
  const decrypted = decrypt(encrypted);
  return JSON.parse(decrypted);
}

// List all stored credentials
async function listCredentials() {
  await initWallet();
  const files = await fs.readdir(WALLET_DIR);
  return files.map((f) => f.replace(".json", ""));
}

module.exports = {
  saveCredential,
  loadCredential,
  listCredentials,
};
