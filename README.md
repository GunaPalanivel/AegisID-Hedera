# 📜 AegisID-Hedera

> **Decentralized Identity (DID) Management on Hedera Hashgraph**  
> Smart Contracts ⚡ | Hardhat 🛠️ | Node.js 🚀 | Solidity 🔥

---

## 🎉 Built for: [Cystar 24-Hour Hackathon, IIT Madras (CS Exebit 2025)](https://unstop.com/hackathons/cystar-24-hour-hackathon-cs-exebit-2025-iit-madras-1469132)

AegisID-Hedera was conceptualized, built, and deployed as part of the **Cystar 24-Hour Hackathon** conducted at **IIT Madras, Chennai** under the **CS Exebit 2025** tech festival.

The hackathon focused on **Distributed Ledger Technologies (DLTs)** and this project aims to tackle decentralized identity management through a scalable, gas-optimized, and modular fullstack setup on the **Hedera network**.

AegisID-Hedera is a fullstack blockchain starter kit to **publish and manage DIDs (Decentralized Identifiers)** on the **Hedera** network using **Solidity Smart Contracts** and **Node.js** scripts.

This project is built to be **real-world ready** — modular, scalable, and production deployable.  
Ideal for hackathons, portfolios, startup MVPs, or just leveling up as a Web3 Dev!

---

## 📦 Project Structure

```bash
AegisID-Hedera/
├── contracts/          # Solidity smart contracts (e.g., Lock.sol)
├── scripts/            # Deployment and interaction scripts
├── test/               # Unit tests (using Mocha + Chai)
├── hardhat.config.js   # Hardhat project configuration
├── package.json        # NPM project metadata
├── .gitignore          # Git ignored files
└── README.md           # Project documentation (this file)
```

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/rohithvarma73/AegisID-Hedera.git
cd AegisID-Hedera
```

### 2. Install Dependencies

```bash
npm install
```

> Installs Hardhat, Ethers.js, Chai, dotenv and all required tooling.

### 3. Set Up Environment Variables

Create a `.env` file at the root:

```bash
PRIVATE_KEY=your-wallet-private-key
ACCOUNT_ID=your-hedera-account-id
HEDERA_NETWORK=testnet
```

---

## 🛠️ Usage

### Compile Contracts

```bash
npx hardhat compile
```

✅ Generates ABI, Bytecode, and Typechain artifacts.

---

### Deploy Smart Contract

```bash
npx hardhat run scripts/deploy.js --network testnet
```

> 🔥 Deploys your contract onto the Hedera Testnet.

---

### Run Tests

```bash
npx hardhat test
```

> 🧪 Executes your unit tests inside `/test`.

---

## 🧩 Example Smart Contract

> Basic locking contract (can be extended to DID management later)

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/**
 * @title Lock
 * @dev Stores and locks Ether until a given unlock time
 */
contract Lock {
    uint public unlockTime;
    address payable public owner;

    constructor(uint _unlockTime) payable {
        require(_unlockTime > block.timestamp, "Unlock time must be in the future");
        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    function withdraw() public {
        require(block.timestamp >= unlockTime, "Cannot withdraw yet");
        require(msg.sender == owner, "Only owner can withdraw");

        payable(msg.sender).transfer(address(this).balance);
    }
}
```

✅ **Gas-efficient**  
✅ **Security checks** (owner, unlock time)  
✅ **Upgradeable to DID registry contract**

---

## 🧠 Why Hedera for DIDs?

- Ultra-low gas fees compared to Ethereum
- Super fast finality (sub-3 seconds)
- Native support for identity services via Hedera Consensus Service (HCS)

---

## 📈 Future Improvements

| Feature                                         | Reason                      |
| :---------------------------------------------- | :-------------------------- |
| DID Registry Contract (ERC-1056 / W3C DID Spec) | Full DID lifecycle support  |
| Frontend Portal (React + TailwindCSS)           | Easy identity management UI |
| Mirror Node Event Listening                     | Real-time identity updates  |
| Hedera Token Service (HTS)                      | NFT-based identity proofs   |
| Role-Based Access Control (RBAC)                | Secure permissioning        |

---

## 📚 Best Practices Followed

- Hardhat-based workflow 🔥
- Proper error handling in scripts (async/await try-catch)
- Secrets managed via `.env`
- Gas optimization in contracts (no unnecessary storage writes)
- Modular project structure

---

## ✨ Tech Stack

| Tech       | Purpose                 |
| :--------- | :---------------------- |
| Solidity   | Smart contracts         |
| Hardhat    | Development environment |
| Node.js    | Scripts and toolings    |
| Ethers.js  | Blockchain interaction  |
| Mocha/Chai | Testing framework       |

---

# 🔥 Let's Build Decentralized Identity on Hedera!

> AegisID-Hedera is just getting started — future upgrades incoming! 🚀

If you found this useful, feel free to ⭐ star the repo or connect with me for collabs!
