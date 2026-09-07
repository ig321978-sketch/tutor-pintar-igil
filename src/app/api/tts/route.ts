import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/** Fitur voice dinonaktifkan. Jangan panggil Google TTS dari sini. */
export async function POST() {
  return NextResponse.json(
    {
      berhasil: false,
      dinonaktifkan: true,
      pesan: "Fitur suara dinonaktifkan.",
    },
    { status: 410 },
  );
}

export async function GET() {
  return POST();
}
