const crypto = require("crypto");
const fs = require("fs-extra");
const path = require("path");

// Helper to generate random hex
function randomHex(size = 16) {
  return crypto.randomBytes(size).toString("hex");
}

async function createDID() {
  const id = `did:example:${randomHex(8)}`;

  const { publicKey, privateKey } = crypto.generateKeyPairSync("ed25519");

  const publicKeyPem = publicKey.export({ type: "spki", format: "pem" });
  const privateKeyPem = privateKey.export({ type: "pkcs8", format: "pem" });

  const didDocument = {
    id,
    publicKey: publicKeyPem,
    created: new Date().toISOString(),
  };

  const didsPath = path.join(__dirname, "dids");

  await fs.ensureDir(didsPath);

  await fs.writeJson(
    path.join(didsPath, `${id.split(":").pop()}.json`),
    didDocument,
    { spaces: 2 }
  );

  console.log(`✅ DID created successfully!\n`);
  console.log(didDocument);

  return { id, privateKeyPem };
}

module.exports = { createDID };
