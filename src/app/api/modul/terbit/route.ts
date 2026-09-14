import { NextResponse } from "next/server";
import { muatDaftarModulTerbitPublik } from "@/lib/cache-materi-tutor";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const daftar = await muatDaftarModulTerbitPublik();
    return NextResponse.json(
      { berhasil: true, daftar },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      },
    );
  } catch (error) {
    const pesan =
      error instanceof Error ? error.message : "Gagal memuat daftar modul terbit.";
    return NextResponse.json(
      { berhasil: false, daftar: [], pesan },
      { status: 500 },
    );
  }
}
