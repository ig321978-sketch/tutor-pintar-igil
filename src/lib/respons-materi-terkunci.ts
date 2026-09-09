import { NextResponse } from "next/server";
import { PESAN_MATERI_TERKUNCI } from "@/lib/cache-materi-tutor";

export function responsMateriTerkunci() {
  return NextResponse.json(
    {
      berhasil: false,
      terkunci: true,
      pesan: PESAN_MATERI_TERKUNCI,
    },
    { status: 403 },
  );
}
