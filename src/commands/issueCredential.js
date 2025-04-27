const fs = require("fs-extra");
const path = require("path");

// Load your existing DID keys
const walletDir = path.join(__dirname, "..", "wallet");

// DID
const issuerDid =
  "did:hedera:302a300506032b657003210090ba13ffa50199461b42c9d940f3ac1f63c5e2f683638c103f198f7b98a6bcf7";

async function issueCredential(name, degree) {
  const credential = {
    id: issuerDid, // use your actual DID
    name,
    degree,
    issuedOn: new Date().toISOString(),
  };

  // Safe filename (remove ':' from DID)
  const safeFileName = issuerDid.replace(/:/g, "") + ".json";

  const filePath = path.join(walletDir, safeFileName);
  await fs.outputJson(filePath, credential);

  console.log("✅ Credential issued and saved:");
  console.log(credential);
}

module.exports = { issueCredential };
