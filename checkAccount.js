require("dotenv").config({ path: "./cli.env" }); // to loan env

const { Client, PrivateKey, AccountBalanceQuery } = require("@hashgraph/sdk");

async function main() {
  const operatorId = process.env.HEDERA_ACCOUNT_ID;
  const operatorKeyRaw = process.env.HEDERA_PRIVATE_KEY;

  if (!operatorId || !operatorKeyRaw) {
    console.error("❌ Environment variables missing. Please check .env file!");
    return;
  }

  const operatorKey = PrivateKey.fromStringECDSA(
    process.env.OPERATOR_KEY.replace(/^0x/, "")
  );

  const client = Client.forTestnet().setOperator(operatorId, operatorKey);

  try {
    const balance = await new AccountBalanceQuery()
      .setAccountId(operatorId)
      .execute(client);

    console.log(
      `✅ Success! Your account balance is: ${balance.hbars.toString()}`
    );
  } catch (err) {
    console.error("❌ Error verifying your account:");
    console.error(err);
  }
}

main();
