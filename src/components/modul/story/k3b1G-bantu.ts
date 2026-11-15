import type { Aksi, KetukanStory, Obj } from "./logika-story";
import { bendaLangkah, langkahKb } from "./k3b1G-gambar";
import type { OpsiKb } from "./k3b1G-gambar";

/** Penyingkat penulisan naskah Story Sub-Bab G Bab 1 Kelas 3 (khusus sub-bab ini). */
type At = string | number | undefined;
type Ubah = Partial<Obj> & { id: string };

export const tambah = (at: At, ...objs: (Obj | Obj[])[]): Aksi => ({ at, tambah: objs.flat() });
export const ubah = (at: At, ...u: (Ubah | Ubah[])[]): Aksi => ({ at, ubah: u.flat() });
export const hapus = (at: At, ...ids: string[]): Aksi => ({ at, hapus: ids });
export const bersih = (at: At = 0): Aksi => ({ at, bersih: true });
export const k = (suara: string, ...aksi: Aksi[]): KetukanStory => ({ suara, aksi });
export const sorotkan = (at: At, ...ids: string[]): Aksi => ({ at, ubah: ids.map((id) => ({ id, sorot: true })) });
export const redamkan = (at: At, ...ids: string[]): Aksi => ({ at, ubah: ids.map((id) => ({ id, sorot: false })) });

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

/** Satu langkah kurang berulang: tulisan langkah ke-s muncul dan b benda diambil dari tumpukan berisi a benda, pada kata yang sama. */
export const langkah = (at: At, s: number, a: number, b: number, nama?: string, o: OpsiKb = {}): Aksi[] => [
  tambah(at, langkahKb(s, a, b, o)),
  ...(nama ? [hapus(at, ...bendaLangkah(nama, a, b, s))] : []),
];
