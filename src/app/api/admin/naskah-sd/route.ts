import { NextResponse } from "next/server";
import { responsJikaBukanAdmin } from "@/lib/supabase-auth";
import {
  generateDanKunciNaskahSd,
  semuaBabNaskahSd,
} from "@/lib/generate-kunci-naskah-sd";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const maxDuration = 300;

const TANPA_CACHE = { "Cache-Control": "no-store, max-age=0" };

function sebagaiTeks(nilai: unknown, cadangan = ""): string {
  return typeof nilai === "string" ? nilai.trim() : cadangan;
}

async function izinkanBatch(req: Request): Promise<NextResponse | null> {
  const host = req.headers.get("host") ?? "";
  if (
    process.env.NODE_ENV !== "production" &&
    /^(localhost|127\.0\.0\.1)(:\d+)?$/i.test(host)
  ) {
    return null;
  }
  const header = req.headers.get("x-batch-key")?.trim() ?? "";
  const sah = (process.env.SUPABASE_SERVICE_ROLE_KEY ?? "").trim();
  if (sah && header && header === sah) return null;
  return responsJikaBukanAdmin();
}

export async function GET(req: Request) {
  const ditolak = await izinkanBatch(req);
  if (ditolak) return ditolak;
  const daftar = semuaBabNaskahSd();
  return NextResponse.json(
    { berhasil: true, jumlah: daftar.length, daftar },
    { headers: TANPA_CACHE },
  );
}

export async function POST(req: Request) {
  const ditolak = await izinkanBatch(req);
  if (ditolak) return ditolak;

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { berhasil: false, pesan: "Request JSON tidak valid." },
      { status: 400 },
    );
  }

  const kelas = sebagaiTeks(body.kelas);
  const mapel = sebagaiTeks(body.mapel);
  const materi = sebagaiTeks(body.materi);
  if (!kelas || !mapel || !materi) {
    return NextResponse.json(
      { berhasil: false, pesan: "kelas, mapel, dan materi wajib diisi." },
      { status: 400 },
    );
  }

  const hasil = await generateDanKunciNaskahSd({
    kelas,
    mapel,
    materi,
    nama: sebagaiTeks(body.nama, "Siswa"),
  });
  return NextResponse.json(
    { berhasil: hasil.status !== "gagal", data: hasil },
    { headers: TANPA_CACHE, status: hasil.status === "gagal" ? 500 : 200 },
  );
}
