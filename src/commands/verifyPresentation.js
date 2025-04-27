const fs = require("fs-extra");
const path = require("path");

const walletDir = path.join(__dirname, "..", "wallet");

async function verifyPresentation(presentationId) {
  const presentationPath = path.join(
    walletDir,
    `${presentationId}-presentation.json`
  );
  if (!(await fs.pathExists(presentationPath))) {
    console.error("❌ Presentation not found.");
    return;
  }
  const presentation = await fs.readJson(presentationPath);

  if (
    presentation.proof &&
    presentation.proof.signatureValue === "mock-signature-value"
  ) {
    console.log("✅ Presentation verification successful.");
  } else {
    console.log("❌ Presentation verification failed.");
  }
}

module.exports = { verifyPresentation };
