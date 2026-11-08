import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Hanya server dev lokal. Mencatat ucapan Suara Guru yang diminta pemutar ke
 * src/content-master/naskah-guru.json (tidak di-commit). Skrip scripts/buat-audio-guru.mjs
 * membuat audio statis dari berkas ini. Di produksi rute ini tidak ada.
 */
const BERKAS = path.join(process.cwd(), "src", "content-master", "naskah-guru.json");

type Entri = { teks: string; kelas: string; tanpaNotasi: boolean; suaraTetap: boolean };

let antrean: Promise<unknown> = Promise.resolve();

async function tambah(entri: Entri): Promise<void> {
  let daftar: Entri[] = [];
  try {
    daftar = JSON.parse(await fs.readFile(BERKAS, "utf8")) as Entri[];
  } catch {
    daftar = [];
  }
  const sama = (e: Entri) => e.teks === entri.teks && e.kelas === entri.kelas && e.tanpaNotasi === entri.tanpaNotasi && e.suaraTetap === entri.suaraTetap;
  if (daftar.some(sama)) return;
  daftar.push(entri);
  await fs.mkdir(path.dirname(BERKAS), { recursive: true });
  await fs.writeFile(BERKAS, JSON.stringify(daftar, null, 1), "utf8");
}

export async function POST(req: Request) {
  if (process.env.NODE_ENV === "production") return new NextResponse(null, { status: 404 });
  try {
    const b = (await req.json()) as Partial<Entri>;
    if (typeof b.teks !== "string" || !b.teks.trim() || typeof b.kelas !== "string") {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    const entri: Entri = {
      teks: b.teks.replace(/\s+/g, " ").trim(),
      kelas: b.kelas,
      tanpaNotasi: b.tanpaNotasi === true,
      suaraTetap: b.suaraTetap === true,
    };
    antrean = antrean.then(() => tambah(entri)).catch(() => {});
    await antrean;
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
