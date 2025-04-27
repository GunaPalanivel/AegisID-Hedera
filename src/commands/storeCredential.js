const fs = require("fs-extra");
const path = require("path");

const walletDir = path.join(__dirname, "..", "wallet");

async function storeCredential() {
  const files = await fs.readdir(walletDir);
  if (files.length === 0) {
    console.log("❌ No credentials found to store.");
    return;
  }

  console.log("✅ Stored credentials:");
  files.forEach((file) => {
    console.log(`- ${file}`);
  });
}

module.exports = { storeCredential };
