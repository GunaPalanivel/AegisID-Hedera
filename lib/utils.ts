import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import crypto from "crypto"

export function generateRandomHex(length: number): string {
  const bytes = Math.ceil(length / 2)
  return [...Array(bytes)]
    .map(() =>
      Math.floor(Math.random() * 256)
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")
    .substring(0, length)
}

export function generateTimestamp(): string {
  return new Date().toISOString()
}

export function generateSignature(data: string, privateKey: string): string {
  // In a real implementation, this would use actual cryptographic libraries
  // to create a digital signature using the private key

  // For this demo, we'll create a simulated signature
  const hash = crypto.createHash("sha256").update(data).digest("hex")
  return `${hash.substring(0, 16)}...${hash.substring(hash.length - 16)}`
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
