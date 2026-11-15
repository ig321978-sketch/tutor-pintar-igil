import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

export type SoalPratinjau = { id: string; pertanyaan: string; pilihan: string[] };

/** Satu baris kunci ujian. Indeks benar sengaja tidak ditangkap. */
const BARIS =
  /^\s*\('([^']*)',\s*'([^']*)',\s*'([^']*)',\s*'((?:[^']|'')*)',\s*'(\[[\s\S]*?\])'::jsonb/;

/** 10 soal ujian dari berkas seed lokal, tanpa indeks benar dan tanpa pembahasan. */
export function bacaSoalUjianLokal(chapterId: string): SoalPratinjau[] {
  const dir = path.join(process.cwd(), "supabase", "seed");
  let berkas: string[] = [];
  try {
    berkas = readdirSync(dir).filter((nama) => nama.endsWith("_keys.sql"));
  } catch {
    return [];
  }
  const hasil: SoalPratinjau[] = [];
  const terlihat = new Set<string>();
  for (const nama of berkas) {
    const teks = readFileSync(path.join(dir, nama), "utf8");
    for (const bagian of teks.split(/insert into private\.exam_keys/i).slice(1)) {
      const isi = bagian.split(";")[0] ?? "";
      for (const baris of isi.split("\n")) {
        const cocok = BARIS.exec(baris);
        if (!cocok || cocok[1] !== chapterId || terlihat.has(cocok[3])) continue;
        let pilihan: unknown;
        try {
          pilihan = JSON.parse(cocok[5]);
        } catch {
          continue;
        }
        if (!Array.isArray(pilihan) || pilihan.length !== 4 || pilihan.some((item) => typeof item !== "string")) continue;
        terlihat.add(cocok[3]);
        hasil.push({
          id: cocok[3],
          pertanyaan: cocok[4].replace(/''/g, "'"),
          pilihan: pilihan as string[],
        });
        if (hasil.length === 10) return hasil;
      }
    }
  }
  return hasil;
}
