const {
  Client,
  TopicCreateTransaction,
  TopicMessageSubmitTransaction,
  PrivateKey,
} = require("@hashgraph/sdk");

const operatorId = process.env.HEDERA_ACCOUNT_ID;

// Parsing the private key correctly (removing `0x` if it exists)
const operatorKey = PrivateKey.fromStringECDSA(
  process.env.OPERATOR_KEY.replace(/^0x/, "")
);

const client = Client.forTestnet();
client.setOperator(operatorId, operatorKey);

async function createTopic() {
  const tx = await new TopicCreateTransaction().execute(client);
  const receipt = await tx.getReceipt(client);
  return receipt.topicId.toString();
}

async function publishDidDocument(topicId, didDocument) {
  const message = JSON.stringify(didDocument);
  await new TopicMessageSubmitTransaction({
    topicId,
    message,
  }).execute(client);
  console.log(`✅ DID Document published to Topic: ${topicId}`);
}

module.exports = { createTopic, publishDidDocument };
