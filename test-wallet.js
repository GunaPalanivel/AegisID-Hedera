const { saveCredential, loadCredential, listCredentials } = require("./wallet");

async function run() {
  const sampleCredential = {
    id: "did:example:123456789abcdefghi",
    name: "Rohith Varma",
    degree: "Bachelor of Technology",
    issuedOn: new Date().toISOString(),
  };

  console.log("Saving credential...");
  await saveCredential("credential1", sampleCredential);

  console.log("\nListing credentials...");
  const credentials = await listCredentials();
  console.log(credentials);

  console.log("\nLoading credential...");
  const loadedCredential = await loadCredential("credential1");
  console.log(loadedCredential);
}

run().catch(console.error);
