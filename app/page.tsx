"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Terminal } from "@/components/terminal"
import { CommandInput } from "@/components/command-input"
import { CommandOutput } from "@/components/command-output"
import { HelpPanel } from "@/components/help-panel"
import { IntroPanel } from "@/components/intro-panel"
import { DIDManager } from "@/lib/did-manager"
import { CredentialManager } from "@/lib/credential-manager"
import { WalletManager } from "@/lib/wallet-manager"

export default function Home() {
  const [commandHistory, setCommandHistory] = useState<Array<{ input: string; output: React.ReactNode }>>([])
  const [showHelp, setShowHelp] = useState(false)
  const [showIntro, setShowIntro] = useState(true)
  const terminalRef = useRef<HTMLDivElement>(null)
  const didManager = useRef(new DIDManager())
  const credentialManager = useRef(new CredentialManager())
  const walletManager = useRef(new WalletManager())

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [commandHistory])

  const handleCommand = async (command: string) => {
    const trimmedCommand = command.trim()

    if (!trimmedCommand) return

    let output: React.ReactNode

    const parts = trimmedCommand.split(" ")
    const mainCommand = parts[0].toLowerCase()

    switch (mainCommand) {
      case "help":
        setShowHelp(true)
        output = "Showing help panel..."
        break

      case "clear":
        setCommandHistory([])
        return

      case "intro":
        setShowIntro(true)
        output = "Showing introduction..."
        break

      case "did":
        output = await handleDIDCommand(parts.slice(1))
        break

      case "credential":
      case "vc":
        output = await handleCredentialCommand(parts.slice(1))
        break

      case "wallet":
        output = await handleWalletCommand(parts.slice(1))
        break

      case "verify":
        output = await handleVerifyCommand(parts.slice(1))
        break

      default:
        output = (
          <div className="text-red-400">
            Command not recognized. Type <span className="text-green-400">help</span> to see available commands.
          </div>
        )
    }

    setCommandHistory((prev) => [...prev, { input: command, output }])
  }

  const handleDIDCommand = async (args: string[]) => {
    if (!args.length) {
      return <div className="text-yellow-400">Please specify a DID operation: create, list, info, or delete</div>
    }

    const operation = args[0].toLowerCase()

    switch (operation) {
      case "create":
        const name = args[1] || `entity-${Math.floor(Math.random() * 1000)}`
        const did = await didManager.current.createDID(name)
        return (
          <div>
            <div className="text-green-400">✓ DID created successfully</div>
            <div className="mt-2">
              <div>
                <span className="text-blue-400">Name:</span> {did.name}
              </div>
              <div>
                <span className="text-blue-400">DID:</span> {did.id}
              </div>
              <div>
                <span className="text-blue-400">Controller:</span> {did.controller}
              </div>
              <div>
                <span className="text-blue-400">Created:</span> {did.created}
              </div>
            </div>
          </div>
        )

      case "list":
        const dids = didManager.current.listDIDs()
        if (!dids.length) {
          return <div className="text-yellow-400">No DIDs found. Create one with 'did create [name]'</div>
        }
        return (
          <div>
            <div className="text-green-400">Found {dids.length} DIDs:</div>
            <div className="mt-2 space-y-2">
              {dids.map((did, index) => (
                <div key={index} className="border border-gray-700 p-2 rounded">
                  <div>
                    <span className="text-blue-400">Name:</span> {did.name}
                  </div>
                  <div>
                    <span className="text-blue-400">DID:</span> {did.id}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case "info":
        if (!args[1]) {
          return <div className="text-red-400">Please specify a DID name or ID</div>
        }
        const didInfo = didManager.current.getDID(args[1])
        if (!didInfo) {
          return <div className="text-red-400">DID not found: {args[1]}</div>
        }
        return (
          <div>
            <div className="text-green-400">DID Information:</div>
            <div className="mt-2">
              <div>
                <span className="text-blue-400">Name:</span> {didInfo.name}
              </div>
              <div>
                <span className="text-blue-400">DID:</span> {didInfo.id}
              </div>
              <div>
                <span className="text-blue-400">Controller:</span> {didInfo.controller}
              </div>
              <div>
                <span className="text-blue-400">Created:</span> {didInfo.created}
              </div>
              <div>
                <span className="text-blue-400">Public Key:</span> {didInfo.publicKey}
              </div>
              <div>
                <span className="text-blue-400">Hedera Account:</span> {didInfo.hederaAccount}
              </div>
            </div>
          </div>
        )

      case "delete":
        if (!args[1]) {
          return <div className="text-red-400">Please specify a DID name or ID to delete</div>
        }
        const deleted = didManager.current.deleteDID(args[1])
        if (!deleted) {
          return <div className="text-red-400">DID not found: {args[1]}</div>
        }
        return <div className="text-green-400">✓ DID deleted successfully: {args[1]}</div>

      default:
        return (
          <div className="text-red-400">Unknown DID operation. Available operations: create, list, info, delete</div>
        )
    }
  }

  const handleCredentialCommand = async (args: string[]) => {
    if (!args.length) {
      return <div className="text-yellow-400">Please specify a credential operation: issue, list, or revoke</div>
    }

    const operation = args[0].toLowerCase()

    switch (operation) {
      case "issue":
        if (args.length < 3) {
          return <div className="text-red-400">Usage: credential issue [issuer-did] [subject-did] [type]</div>
        }

        const issuerDid = args[1]
        const subjectDid = args[2]
        const type = args[3] || "Degree"

        const issuer = didManager.current.getDID(issuerDid)
        const subject = didManager.current.getDID(subjectDid)

        if (!issuer) {
          return <div className="text-red-400">Issuer DID not found: {issuerDid}</div>
        }

        if (!subject) {
          return <div className="text-red-400">Subject DID not found: {subjectDid}</div>
        }

        const credential = await credentialManager.current.issueCredential(issuer, subject, type)

        return (
          <div>
            <div className="text-green-400">✓ Credential issued successfully</div>
            <div className="mt-2 border border-gray-700 p-3 rounded bg-gray-900">
              <div>
                <span className="text-blue-400">ID:</span> {credential.id}
              </div>
              <div>
                <span className="text-blue-400">Type:</span> {credential.type}
              </div>
              <div>
                <span className="text-blue-400">Issuer:</span> {credential.issuer}
              </div>
              <div>
                <span className="text-blue-400">Subject:</span> {credential.subject}
              </div>
              <div>
                <span className="text-blue-400">Issued Date:</span> {credential.issuanceDate}
              </div>
              <div className="mt-2">
                <div className="text-blue-400">Claims:</div>
                <pre className="text-xs mt-1 p-2 bg-black rounded">{JSON.stringify(credential.claims, null, 2)}</pre>
              </div>
              <div className="mt-2">
                <div className="text-blue-400">Proof:</div>
                <div className="text-xs mt-1 p-2 bg-black rounded font-mono overflow-x-auto">
                  {credential.proof.type}: {credential.proof.signature}
                </div>
              </div>
            </div>
          </div>
        )

      case "list":
        const credentials = credentialManager.current.listCredentials()
        if (!credentials.length) {
          return <div className="text-yellow-400">No credentials found.</div>
        }
        return (
          <div>
            <div className="text-green-400">Found {credentials.length} credentials:</div>
            <div className="mt-2 space-y-2">
              {credentials.map((cred, index) => (
                <div key={index} className="border border-gray-700 p-2 rounded">
                  <div>
                    <span className="text-blue-400">ID:</span> {cred.id}
                  </div>
                  <div>
                    <span className="text-blue-400">Type:</span> {cred.type}
                  </div>
                  <div>
                    <span className="text-blue-400">Issuer:</span> {cred.issuer}
                  </div>
                  <div>
                    <span className="text-blue-400">Subject:</span> {cred.subject}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case "revoke":
        if (!args[1]) {
          return <div className="text-red-400">Please specify a credential ID to revoke</div>
        }
        const revoked = await credentialManager.current.revokeCredential(args[1])
        if (!revoked) {
          return <div className="text-red-400">Credential not found: {args[1]}</div>
        }
        return <div className="text-green-400">✓ Credential revoked successfully: {args[1]}</div>

      default:
        return (
          <div className="text-red-400">Unknown credential operation. Available operations: issue, list, revoke</div>
        )
    }
  }

  const handleWalletCommand = async (args: string[]) => {
    if (!args.length) {
      return <div className="text-yellow-400">Please specify a wallet operation: store, list, present, or export</div>
    }

    const operation = args[0].toLowerCase()

    switch (operation) {
      case "store":
        if (!args[1]) {
          return <div className="text-red-400">Please specify a credential ID to store</div>
        }

        const credentialId = args[1]
        const credential = credentialManager.current.getCredential(credentialId)

        if (!credential) {
          return <div className="text-red-400">Credential not found: {credentialId}</div>
        }

        const stored = await walletManager.current.storeCredential(credential)

        return <div className="text-green-400">✓ Credential stored in wallet successfully: {credentialId}</div>

      case "list":
        const storedCredentials = walletManager.current.listCredentials()
        if (!storedCredentials.length) {
          return <div className="text-yellow-400">No credentials found in wallet.</div>
        }
        return (
          <div>
            <div className="text-green-400">Found {storedCredentials.length} credentials in wallet:</div>
            <div className="mt-2 space-y-2">
              {storedCredentials.map((cred, index) => (
                <div key={index} className="border border-gray-700 p-2 rounded">
                  <div>
                    <span className="text-blue-400">ID:</span> {cred.id}
                  </div>
                  <div>
                    <span className="text-blue-400">Type:</span> {cred.type}
                  </div>
                  <div>
                    <span className="text-blue-400">Issuer:</span> {cred.issuer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case "present":
        if (args.length < 3) {
          return (
            <div className="text-red-400">Usage: wallet present [credential-id] [holder-did] [fields (optional)]</div>
          )
        }

        const credId = args[1]
        const holderDid = args[2]
        const fields = args[3] ? args[3].split(",") : undefined

        const cred = walletManager.current.getCredential(credId)
        if (!cred) {
          return <div className="text-red-400">Credential not found in wallet: {credId}</div>
        }

        const holder = didManager.current.getDID(holderDid)
        if (!holder) {
          return <div className="text-red-400">Holder DID not found: {holderDid}</div>
        }

        const presentation = await walletManager.current.createPresentation(cred, holder, fields)

        return (
          <div>
            <div className="text-green-400">✓ Verifiable presentation created successfully</div>
            <div className="mt-2 border border-gray-700 p-3 rounded bg-gray-900">
              <div>
                <span className="text-blue-400">ID:</span> {presentation.id}
              </div>
              <div>
                <span className="text-blue-400">Type:</span> {presentation.type}
              </div>
              <div>
                <span className="text-blue-400">Holder:</span> {presentation.holder}
              </div>
              <div className="mt-2">
                <div className="text-blue-400">Disclosed Claims:</div>
                <pre className="text-xs mt-1 p-2 bg-black rounded">{JSON.stringify(presentation.claims, null, 2)}</pre>
              </div>
              <div className="mt-2">
                <div className="text-blue-400">Proof:</div>
                <div className="text-xs mt-1 p-2 bg-black rounded font-mono overflow-x-auto">
                  {presentation.proof.type}: {presentation.proof.signature}
                </div>
              </div>
            </div>
          </div>
        )

      case "export":
        const exportData = await walletManager.current.exportWallet()
        return (
          <div>
            <div className="text-green-400">✓ Wallet exported successfully</div>
            <div className="mt-2">
              <pre className="text-xs p-2 bg-black rounded overflow-x-auto">{JSON.stringify(exportData, null, 2)}</pre>
            </div>
          </div>
        )

      default:
        return (
          <div className="text-red-400">
            Unknown wallet operation. Available operations: store, list, present, export
          </div>
        )
    }
  }

  const handleVerifyCommand = async (args: string[]) => {
    if (!args.length) {
      return <div className="text-red-400">Usage: verify [presentation-id]</div>
    }

    const presentationId = args[0]
    const presentation = walletManager.current.getPresentation(presentationId)

    if (!presentation) {
      return <div className="text-red-400">Presentation not found: {presentationId}</div>
    }

    const verificationResult = await walletManager.current.verifyPresentation(presentation)

    if (verificationResult.verified) {
      return (
        <div>
          <div className="text-green-400">✓ Presentation verified successfully</div>
          <div className="mt-2">
            <div>
              <span className="text-blue-400">Issuer:</span> {verificationResult.issuer}
            </div>
            <div>
              <span className="text-blue-400">Subject:</span> {verificationResult.subject}
            </div>
            <div>
              <span className="text-blue-400">Holder:</span> {verificationResult.holder}
            </div>
            <div>
              <span className="text-blue-400">Issued Date:</span> {verificationResult.issuedDate}
            </div>
            <div>
              <span className="text-blue-400">Verification Date:</span> {verificationResult.verificationDate}
            </div>
            <div className="mt-2">
              <div className="text-blue-400">Verified Claims:</div>
              <pre className="text-xs mt-1 p-2 bg-black rounded">
                {JSON.stringify(verificationResult.claims, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )
    } else {
      return <div className="text-red-400">✗ Presentation verification failed: {verificationResult.reason}</div>
    }
  }

  const closeHelp = () => {
    setShowHelp(false)
  }

  const closeIntro = () => {
    setShowIntro(false)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 bg-gray-950">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-2xl font-bold text-center mb-4 text-green-400">
          AegisID
        </h1>

        <Terminal ref={terminalRef}>
          {commandHistory.map((item, index) => (
            <div key={index} className="mb-4">
              <CommandInput value={item.input} readOnly />
              <CommandOutput>{item.output}</CommandOutput>
            </div>
          ))}
          <CommandInput
            onSubmit={handleCommand}
            placeholder="Type 'help' for available commands or 'intro' for an introduction"
          />
        </Terminal>

        {showHelp && <HelpPanel onClose={closeHelp} />}
        {showIntro && <IntroPanel onClose={closeIntro} />}
      </div>
    </main>
  );
}
