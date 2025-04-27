const {
  PrivateKey,
  AccountCreateTransaction,
  Client,
} = require("@hashgraph/sdk");
const fs = require("fs-extra");
const path = require("path");

const walletDir = path.join(__dirname, "..", "..", "wallet");

async function createDID(name) {
  const operatorId = process.env.OPERATOR_ID;

  const operatorKey = PrivateKey.fromStringECDSA(
    process.env.OPERATOR_KEY.replace(/^0x/, "")
  );

  if (!operatorId || !operatorKey) {
    throw new Error(
      "Missing OPERATOR_ID or OPERATOR_KEY in environment variables."
    );
  }

  const client = Client.forTestnet().setOperator(operatorId, operatorKey);

  // Generate new key pair
  const privateKey = PrivateKey.generateECDSA();
  const publicKey = privateKey.publicKey;

  // Create new Hedera account
  const transaction = new AccountCreateTransaction()
    .setKey(publicKey)
    .setInitialBalance(0); // 0 hbars

  const txResponse = await transaction.execute(client);
  const receipt = await txResponse.getReceipt(client);
  const newAccountId = receipt.accountId.toString();

  // Form DID according to HIP-412
  const did = `did:hedera:testnet:${newAccountId}`;

  // Prepare credential object
  const credential = {
    id: did,
    name,
    privateKey: privateKey.toStringRaw(),
    publicKey: publicKey.toStringRaw(),
    createdOn: new Date().toISOString(),
  };

  // Save credential into wallet
  const filePath = path.join(walletDir, `${did.replace(/:/g, "")}.json`);
  await fs.outputJson(filePath, credential);

  console.log("✅ DID created and saved:");
  console.log(credential);
}

module.exports = { createDID };
