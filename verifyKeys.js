require("dotenv").config();
const { PrivateKey, AccountId } = require("@hashgraph/sdk");

async function verifyOperator() {
  try {
    const accountId = AccountId.fromString(process.env.OPERATOR_ID);
    const privateKey = PrivateKey.fromString(
      process.env.OPERATOR_KEY.replace(/^0x/, "")
    );
    const publicKey = privateKey.publicKey;

    console.log("🔍 Your Account ID:", accountId.toString());
    console.log("🔍 Derived Public Key:", publicKey.toString());

    console.log("\n👉 Now manually check:");
    console.log(
      `- Go to: https://hashscan.io/testnet/account/${accountId.toString()}`
    );
    console.log(`- Check if the public key on HashScan matches:`);
    console.log(publicKey.toString());
    console.log("\n✅ If public keys match -> your keys are OK.");
    console.log(
      "❌ If public keys DO NOT match -> wrong OPERATOR_KEY for this OPERATOR_ID."
    );
  } catch (err) {
    console.error("🚨 Error verifying keys:", err);
  }
}

verifyOperator();
