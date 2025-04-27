#!/usr/bin/env node

const { Command } = require("commander");

// env
require("dotenv").config();

const program = new Command();

// CLI program metadata
program
  .name("AegisID-Hedera")
  .description("CLI tool for managing DIDs and credentials on Hedera")
  .version("1.0.0");

// Import command handlers
const { createDID } = require("./src/commands/createDid"); // Capital D-I-D
const { createPresentation } = require("./src/commands/createPresentation");
const { issueCredential } = require("./src/commands/issueCredential");
const { storeCredential } = require("./src/commands/storeCredential");
const { verifyPresentation } = require("./src/commands/verifyPresentation");

// Define commands
program
  .command("create-did")
  .description("Create a new Decentralized Identifier (DID)")
  .requiredOption("--name <name>", "Name of the user")
  .action(async (options) => {
    await createDID(options.name); // <--- FIXED (Capital D-I-D)
  });

program
  .command("issue-credential")
  .description("Issue a verifiable credential")
  .requiredOption("--name <name>", "Name of the person")
  .requiredOption("--degree <degree>", "Degree earned")
  .action(async (options) => {
    await issueCredential(options.name, options.degree);
  });

program
  .command("store-credential")
  .description("Store a verifiable credential locally")
  .action(async () => {
    await storeCredential();
  });

program
  .command("create-presentation")
  .description("Create a verifiable presentation from a credential ID")
  .requiredOption("--id <credentialId>", "Credential ID")
  .action(async (options) => {
    await createPresentation(options.id);
  });

program
  .command("verify-presentation")
  .description("Verify a verifiable presentation by ID")
  .requiredOption("--id <presentationId>", "Presentation ID")
  .action(async (options) => {
    await verifyPresentation(options.id);
  });

// Parse CLI arguments
program.parse(process.argv);
