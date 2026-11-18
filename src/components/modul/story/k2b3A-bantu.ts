import type { Aksi, KetukanStory, Obj } from "./logika-story";
import { angkaSisi, garisSisi, type Titik } from "./k2b3A-gambar";

/** Penyingkat penulisan naskah Story Sub-Bab A Bab 3 Kelas 2 (khusus sub-bab ini). */
type At = string | number | undefined;
type Ubah = Partial<Obj> & { id: string };

export const tambah = (at: At, ...objs: (Obj | Obj[])[]): Aksi => ({ at, tambah: objs.flat() });
export const ubah = (at: At, ...u: Ubah[]): Aksi => ({ at, ubah: u });
export const hapus = (at: At, ...ids: string[]): Aksi => ({ at, hapus: ids });
export const bersih = (at: At = 0): Aksi => ({ at, bersih: true });
export const k = (suara: string, ...aksi: Aksi[]): KetukanStory => ({ suara, aksi });
export const sorotkan = (at: At, ...ids: string[]): Aksi => ({ at, ubah: ids.map((id) => ({ id, sorot: true })) });
export const redamkan = (at: At, ...ids: string[]): Aksi => ({ at, ubah: ids.map((id) => ({ id, sorot: false })) });

/** Id berurutan `${s}${dari}` sampai `${s}${sampai}`. */
export const ids = (s: string, dari: number, sampai: number): string[] => Array.from({ length: sampai - dari + 1 }, (_, q) => `${s}${dari + q}`);

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

/** Nomor kata (mulai 0) ke-`n` yang persis sama dengan `kata`. Galat bila tidak ada, supaya salah ketik pemicu ketahuan. */
export const idx = (suara: string, kata: string, n = 1): number => {
  const kata2 = suara.split(/\s+/).filter(Boolean);
  let c = 0;
  for (let i = 0; i < kata2.length; i += 1) {
    if (norm(kata2[i]) === norm(kata)) {
      c += 1;
      if (c === n) return i;
    }
  }
  throw new Error(`pemicu "${kata}" ke-${n} tidak ada dalam: ${suara}`);
};

export const KATA_ANGKA = ["satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan"];

/** Nomor kata untuk deretan kata bilangan berurutan (mis. satu, dua, tiga), dicari mulai setelah kata `setelah` (kemunculan pertama) bila diberikan. */
export const urutKata = (suara: string, daftar: string[], setelah?: string): number[] => {
  const kata2 = suara.split(/\s+/).filter(Boolean).map(norm);
  let dari = setelah ? kata2.indexOf(norm(setelah)) + 1 : 0;
  if (setelah && dari === 0) throw new Error(`kata "${setelah}" tidak ada dalam: ${suara}`);
  return daftar.map((d) => {
    const p = kata2.indexOf(norm(d), dari);
    if (p < 0) throw new Error(`kata "${d}" tidak ada setelah nomor ${dari} dalam: ${suara}`);
    dari = p + 1;
    return p;
  });
};

/**
 * Menghitung sisi: tiap kata bilangan dalam suara (satu, dua, tiga, ...) memunculkan garis merah sisi ke-i dan angkanya.
 * `awal` = nomor sisi pertama yang dihitung (mulai 0), `sampai` = banyak sisi yang dihitung (bawaan semua).
 */
export function sisiAksi(suara: string, id: string, pts: Titik[], opsi: { setelah?: string; awal?: number; sampai?: number } = {}): Aksi[] {
  const awal = opsi.awal ?? 0;
  const sampai = opsi.sampai ?? pts.length;
  const pos = urutKata(suara, KATA_ANGKA.slice(awal, sampai), opsi.setelah);
  return Array.from({ length: sampai - awal }, (_, q) => tambah(pos[q], garisSisi(id, pts, awal + q), angkaSisi(id, pts, awal + q)));
}
