import { NextResponse } from "next/server";
import { daftarCacheMateri } from "@/lib/cache-materi-tutor";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const daftar = await daftarCacheMateri();
  return NextResponse.json({ berhasil: true, daftar });
}
