require("dotenv").config();

const {
  Client,
  TopicCreateTransaction,
  TopicMessageSubmitTransaction,
  PrivateKey,
} = require("@hashgraph/sdk");
const fs = require("fs-extra");
const path = require("path");

// Read environment variables
const operatorId = process.env.OPERATOR_ID;
const rawPrivateKey = process.env.OPERATOR_KEY.replace(/^0x/, "");

let operatorKey;

// Try ECDSA first (since you KNOW your key is ECDSA), fallback to ED25519
try {
  operatorKey = PrivateKey.fromStringECDSA(rawPrivateKey);
} catch (error) {
  try {
    operatorKey = PrivateKey.fromStringED25519(rawPrivateKey);
  } catch (innerError) {
    console.error("❌ Failed to parse private key as ECDSA or ED25519.");
    process.exit(1);
  }
}

const client = Client.forTestnet().setOperator(operatorId, operatorKey);

// Path to your wallet folder
const walletDir = path.join(__dirname, "wallet");

async function publishDID(didFileName) {
  const filePath = path.join(walletDir, didFileName);

  if (!fs.existsSync(filePath)) {
    console.error("❌ DID file not found:", filePath);
    return;
  }

  const didDocument = await fs.readJson(filePath);

  console.log("📄 Loaded DID Document:", didDocument);

  // Create a new topic
  const topicTx = await new TopicCreateTransaction().execute(client);
  const topicReceipt = await topicTx.getReceipt(client);
  const topicId = topicReceipt.topicId.toString();

  console.log("🧵 Created Topic:", topicId);

  // Publish the DID Document as a message
  const message = JSON.stringify(didDocument);

  await new TopicMessageSubmitTransaction({
    topicId,
    message,
  }).execute(client);

  console.log(`✅ DID Document published to Topic: ${topicId}`);
}

(async () => {
  if (!process.argv[2]) {
    console.error("❌ Usage: node publishDid.js <account_num>");
    process.exit(1);
  }

  const didFilename = "didhederatestnet0.0." + process.argv[2] + ".json";
  await publishDID(didFilename);
})();
