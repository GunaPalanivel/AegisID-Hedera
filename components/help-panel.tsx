"use client"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface HelpPanelProps {
  onClose: () => void
}

export function HelpPanel({ onClose }: HelpPanelProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-3xl max-h-[80vh] overflow-y-auto bg-gray-900 text-white border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>AegisID - Help</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-2">
              General Commands
            </h3>
            <ul className="space-y-2">
              <li>
                <code className="bg-gray-800 px-2 py-1 rounded">help</code> -
                Display this help information
              </li>
              <li>
                <code className="bg-gray-800 px-2 py-1 rounded">intro</code> -
                Show introduction to DID concepts
              </li>
              <li>
                <code className="bg-gray-800 px-2 py-1 rounded">clear</code> -
                Clear the terminal
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-2">
              DID Commands
            </h3>
            <ul className="space-y-2">
              <li>
                <code className="bg-gray-800 px-2 py-1 rounded">
                  did create [name]
                </code>{" "}
                - Create a new DID with optional name
              </li>
              <li>
                <code className="bg-gray-800 px-2 py-1 rounded">did list</code>{" "}
                - List all DIDs
              </li>
              <li>
                <code className="bg-gray-800 px-2 py-1 rounded">
                  did info [did-name-or-id]
                </code>{" "}
                - Show detailed information about a DID
              </li>
              <li>
                <code className="bg-gray-800 px-2 py-1 rounded">
                  did delete [did-name-or-id]
                </code>{" "}
                - Delete a DID
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-2">
              Credential Commands
            </h3>
            <ul className="space-y-2">
              <li>
                <code className="bg-gray-800 px-2 py-1 rounded">
                  credential issue [issuer-did] [subject-did] [type]
                </code>{" "}
                - Issue a new credential
              </li>
              <li>
                <code className="bg-gray-800 px-2 py-1 rounded">
                  credential list
                </code>{" "}
                - List all credentials
              </li>
              <li>
                <code className="bg-gray-800 px-2 py-1 rounded">
                  credential revoke [credential-id]
                </code>{" "}
                - Revoke a credential
              </li>
              <li>
                <code className="bg-gray-800 px-2 py-1 rounded">vc</code> -
                Alias for credential commands
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-2">
              Wallet Commands
            </h3>
            <ul className="space-y-2">
              <li>
                <code className="bg-gray-800 px-2 py-1 rounded">
                  wallet store [credential-id]
                </code>{" "}
                - Store a credential in the wallet
              </li>
              <li>
                <code className="bg-gray-800 px-2 py-1 rounded">
                  wallet list
                </code>{" "}
                - List all credentials in the wallet
              </li>
              <li>
                <code className="bg-gray-800 px-2 py-1 rounded">
                  wallet present [credential-id] [holder-did] [fields]
                </code>{" "}
                - Create a verifiable presentation
              </li>
              <li>
                <code className="bg-gray-800 px-2 py-1 rounded">
                  wallet export
                </code>{" "}
                - Export wallet contents
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-2">
              Verification Commands
            </h3>
            <ul className="space-y-2">
              <li>
                <code className="bg-gray-800 px-2 py-1 rounded">
                  verify [presentation-id]
                </code>{" "}
                - Verify a presentation
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-2">
              Example Workflow
            </h3>
            <ol className="space-y-2 list-decimal pl-5">
              <li>
                Create issuer DID:{" "}
                <code className="bg-gray-800 px-2 py-1 rounded">
                  did create university
                </code>
              </li>
              <li>
                Create subject DID:{" "}
                <code className="bg-gray-800 px-2 py-1 rounded">
                  did create student
                </code>
              </li>
              <li>
                Issue credential:{" "}
                <code className="bg-gray-800 px-2 py-1 rounded">
                  credential issue university student Degree
                </code>
              </li>
              <li>
                Store in wallet:{" "}
                <code className="bg-gray-800 px-2 py-1 rounded">
                  wallet store [credential-id]
                </code>
              </li>
              <li>
                Create presentation:{" "}
                <code className="bg-gray-800 px-2 py-1 rounded">
                  wallet present [credential-id] student name,degree
                </code>
              </li>
              <li>
                Verify presentation:{" "}
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
