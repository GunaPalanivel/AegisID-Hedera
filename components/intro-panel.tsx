"use client";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface IntroPanelProps {
  onClose: () => void;
}

export function IntroPanel({ onClose }: IntroPanelProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-3xl max-h-[80vh] overflow-y-auto bg-gray-900 text-white border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>AegisID - Introduction</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-2">
              Welcome to the AegisID Tool
            </h3>
            <p>
              This tool demonstrates the power of Decentralized Identity (DID)
              using the Hedera network. It allows you to create and manage DIDs,
              issue and verify credentials, and create selective disclosures
              through verifiable presentations.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-2">
              What is Decentralized Identity?
            </h3>
            <p className="mb-2">
              Decentralized Identity is a paradigm that shifts control of
              digital identity from centralized entities to individuals. It
              enables users to own and manage their digital identifiers and
              credentials without relying on a central authority.
            </p>
            <p>The core components of a DID ecosystem include:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>
                <strong>Decentralized Identifiers (DIDs)</strong>: Unique
                identifiers that enable verifiable, self-sovereign digital
                identity
              </li>
              <li>
                <strong>Verifiable Credentials</strong>: self-sovereign digital
                identity
              </li>
              <li>
                <strong>Verifiable Credentials</strong>: Digital attestations
                made by an issuer about a subject that can be cryptographically
                verified
              </li>
              <li>
                <strong>Verifiable Presentations</strong>: Collections of
                credentials or claims that can be shared with verifiers with
                selective disclosure
              </li>
              <li>
                <strong>Digital Wallets</strong>: Secure storage for DIDs and
                credentials, giving users control over their digital identity
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-2">
              Why Hedera?
            </h3>
            <p>
              Hedera provides a secure, fast, and cost-effective distributed
              ledger technology that is ideal for DID applications. Its
              consensus service and token service enable the creation of
              tamper-proof records of DID documents and credential status.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-2">
              Getting Started
            </h3>
            <p className="mb-2">
              To get started with this CLI tool, try the following commands:
            </p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>
                Type <code className="bg-gray-800 px-2 py-1 rounded">help</code>{" "}
                to see all available commands
              </li>
              <li>
                Create your first DID with{" "}
                <code className="bg-gray-800 px-2 py-1 rounded">
                  did create my-identity
                </code>
              </li>
              <li>
                Explore the credential and wallet commands to see how the DID
                ecosystem works
              </li>
            </ol>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-2">
              Example Use Case: Academic Credentials
            </h3>
            <p className="mb-2">
              Imagine a university issuing a degree credential to a student:
            </p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>
                The university creates a DID:{" "}
                <code className="bg-gray-800 px-2 py-1 rounded">
                  did create university
                </code>
              </li>
              <li>
                The student creates a DID:{" "}
                <code className="bg-gray-800 px-2 py-1 rounded">
                  did create student
                </code>
              </li>
              <li>
                The university issues a credential:{" "}
                <code className="bg-gray-800 px-2 py-1 rounded">
                  credential issue university student Degree
                </code>
              </li>
              <li>
                The student stores the credential in their wallet:{" "}
                <code className="bg-gray-800 px-2 py-1 rounded">
                  wallet store [credential-id]
                </code>
              </li>
              <li>
                When applying for a job, the student creates a presentation with
                only relevant information:{" "}
                <code className="bg-gray-800 px-2 py-1 rounded">
                  wallet present [credential-id] student name,degree
                </code>
              </li>
              <li>
                The employer verifies the presentation:{" "}
                <code className="bg-gray-800 px-2 py-1 rounded">
                  verify [presentation-id]
                </code>
              </li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
