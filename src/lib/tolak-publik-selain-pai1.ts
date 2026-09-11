import { NextResponse } from "next/server";
import { naskahResmiJikaAda } from "@/lib/naskah-resmi";
import { sesiPenggunaSaatIni } from "@/lib/supabase-auth";
import {
  PESAN_MATERI_TERKUNCI_PUBLIK,
  situsHanyaAdmin,
} from "@/lib/situs-hanya-admin";

export async function tolakPublikSelainPai1(
  kelas: string,
  mapel: string,
  materi = "",
): Promise<NextResponse | null> {
  if (!situsHanyaAdmin()) return null;
  const { adalahAdmin } = await sesiPenggunaSaatIni();
  if (adalahAdmin) return null;
  if (naskahResmiJikaAda(kelas, mapel, materi)) return null;
  return NextResponse.json(
    {
      berhasil: false,
      pesan: PESAN_MATERI_TERKUNCI_PUBLIK,
      terkunci: true,
    },
    { status: 403 },
  );
}
