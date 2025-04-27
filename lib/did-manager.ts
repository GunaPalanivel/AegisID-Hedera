import { generateRandomHex, generateTimestamp } from "./utils"

export interface DID {
  id: string
  name: string
  controller: string
  created: string
  publicKey: string
  privateKey: string
  hederaAccount: string
}

export class DIDManager {
  private dids: DID[] = []

  async createDID(name: string): Promise<DID> {
    // In a real implementation, this would interact with Hedera
    // to create a DID document on the ledger

    const id = `did:hedera:testnet:${generateRandomHex(16)}`
    const publicKey = `z${generateRandomHex(32)}`
    const privateKey = generateRandomHex(64)
    const hederaAccount = `0.0.${Math.floor(1000000 + Math.random() * 9000000)}`

    const did: DID = {
      id,
      name,
      controller: id,
      created: generateTimestamp(),
      publicKey,
      privateKey,
      hederaAccount,
    }

    this.dids.push(did)

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return did
  }

  listDIDs(): DID[] {
    return this.dids.map((did) => ({
      ...did,
      privateKey: "********", // Hide private key in listings
    }))
  }

  getDID(nameOrId: string): DID | undefined {
    return this.dids.find((did) => did.name === nameOrId || did.id === nameOrId)
  }

  deleteDID(nameOrId: string): boolean {
    const initialLength = this.dids.length
    this.dids = this.dids.filter((did) => did.name !== nameOrId && did.id !== nameOrId)
    return this.dids.length < initialLength
  }
}
