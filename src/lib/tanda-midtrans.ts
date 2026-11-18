import { createHash, timingSafeEqual } from "node:crypto";

import { modePembayaranServer, type ModePembayaran } from "./pembayaran-qris";

const KUNCI_MOCK_DEV = "igil-mock-server-key";

export function basisMidtrans(mode: ModePembayaran): string | null {
  if (mode === "production") return "https://api.midtrans.com";
  if (mode === "sandbox") return "https://api.sandbox.midtrans.com";
  return null;
}

/** Kunci tanda tangan. Kunci tiruan hanya hidup di mode mock di luar produksi. */
export function kunciTandaTangan(): string | null {
  const kunci = (process.env.MIDTRANS_SERVER_KEY ?? "").trim();
  if (kunci) return kunci;
  if (modePembayaranServer() === "mock" && process.env.NODE_ENV !== "production") return KUNCI_MOCK_DEV;
  return null;
}

export function tandaMidtrans(orderId: string, statusCode: string, grossAmount: string, serverKey: string): string {
  return createHash("sha512").update(`${orderId}${statusCode}${grossAmount}${serverKey}`).digest("hex");
}

export function tandaCocok(diberikan: string, dihitung: string): boolean {
  const a = Buffer.from(diberikan.trim().toLowerCase());
  const b = Buffer.from(dihitung.trim().toLowerCase());
  if (a.length === 0 || a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
