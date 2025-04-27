require("dotenv").config();
const { Client, PrivateKey } = require("@hashgraph/sdk");

async function main() {
  try {
    // Load from .env
    const operatorId = process.env.OPERATOR_ID;
    const operatorKeyHex = process.env.OPERATOR_KEY?.replace(/^0x/, ""); // Remove "0x" if present

    if (!operatorId || !operatorKeyHex) {
      throw new Error("OPERATOR_ID or OPERATOR_KEY is missing from .env file");
    }

    // Parse the hex key into PrivateKey once using fromStringECDSA
    const operatorKey = PrivateKey.fromStringECDSA(
      process.env.OPERATOR_KEY.replace(/^0x/, "")
    );

    // Create the client and set the operator
    const client = Client.forTestnet().setOperator(operatorId, operatorKey);

    console.log("✅ Hedera Client Connected Successfully!");
  } catch (error) {
    console.error("❌ Error connecting to Hedera:", error.message);
  }
}

main();
