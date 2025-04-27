const fs = require("fs-extra");
const path = require("path");

const walletDir = path.join(__dirname, "..", "wallet");

async function createPresentation(credentialId) {
  const filePath = path.join(walletDir, `${credentialId}.json`);
  if (!(await fs.pathExists(filePath))) {
    console.error("❌ Credential not found.");
    return;
  }
  const credential = await fs.readJson(filePath);

  const presentation = {
    context: ["https://www.w3.org/2018/credentials/v1"],
    type: ["VerifiablePresentation"],
    verifiableCredential: credential,
    created: new Date().toISOString(),
    proof: {
      type: "Ed25519Signature2018",
      created: new Date().toISOString(),
      proofPurpose: "authentication",
      verificationMethod: "did:example:verifier",
      signatureValue: "mock-signature-value",
    },
  };

  const presentationPath = path.join(
    walletDir,
    `${credentialId}-presentation.json`
  );
  await fs.outputJson(presentationPath, presentation);

  console.log("✅ Presentation created and saved:");
  console.log(presentation);
}

module.exports = { createPresentation };
