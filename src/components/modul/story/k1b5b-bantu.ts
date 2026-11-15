import type { Aksi, KetukanStory, Obj } from "./logika-story";

/** Penyingkat penulisan naskah Story Sub-Bab B Bab 5 Menghitung Maju dan Mundur Kelas 1 (khusus sub-bab ini). */
type At = string | number | undefined;
type Ubah = Partial<Obj> & { id: string };

export const tambah = (at: At, ...objs: (Obj | Obj[])[]): Aksi => ({ at, tambah: objs.flat() });
export const ubah = (at: At, ...u: Ubah[]): Aksi => ({ at, ubah: u });
export const hapus = (at: At, ...ids: string[]): Aksi => ({ at, hapus: ids });
export const bersih = (at: At = 0): Aksi => ({ at, bersih: true });
export const k = (suara: string, ...aksi: Aksi[]): KetukanStory => ({ suara, aksi });
export const sorotkan = (at: At, ...ids: string[]): Aksi => ({ at, ubah: ids.map((id) => ({ id, sorot: true })) });
export const redamkan = (at: At, ...ids: string[]): Aksi => ({ at, ubah: ids.map((id) => ({ id, sorot: false })) });

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
const kataSuara = (suara: string): string[] => suara.split(/\s+/).filter(Boolean).map(norm);

/** Nomor kata (mulai 0) ke-`n` yang persis sama dengan `kata`. Galat bila tidak ada, supaya salah ketik pemicu ketahuan. */
export const idx = (suara: string, kata: string, n = 1): number => {
  const kata2 = kataSuara(suara);
  let c = 0;
  for (let i = 0; i < kata2.length; i += 1) {
    if (kata2[i] === norm(kata)) {
      c += 1;
      if (c === n) return i;
    }
  }
  throw new Error(`pemicu "${kata}" ke-${n} tidak ada dalam: ${suara}`);
};

const SATUAN = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh"];
/** Nama bilangan 0 sampai 20 sebagai deretan kata. */
export const kataBil = (n: number): string[] => {
  if (n <= 10) return [SATUAN[n]];
  if (n === 11) return ["sebelas"];
  if (n === 20) return ["dua", "puluh"];
  return [SATUAN[n - 10], "belas"];
};
export const sebutBil = (n: number): string => kataBil(n).join(" ");

/** Cari nama bilangan `n` mulai nomor kata `dari`; kembalikan nomor kata terakhirnya atau -1. */
const cari = (kata: string[], n: number, dari: number): number => {
  const nama = kataBil(n);
  for (let p = dari; p + nama.length <= kata.length; p += 1) {
    if (!nama.every((w, j) => kata[p + j] === w)) continue;
    const lanjut = kata[p + nama.length];
    if (n < 10 && (lanjut === "belas" || lanjut === "puluh")) continue;
    return p + nama.length - 1;
  }
  return -1;
};

/**
 * Nomor kata terakhir tiap bilangan dalam `daftar` (0 sampai 20) yang diucapkan berurutan, dicari mulai setelah kata `setelah`
 * (kemunculan pertama) bila diberikan. Galat bila ada yang tak ketemu.
 */
export const urutBil = (suara: string, daftar: number[], setelah?: string): number[] => {
  const kata = kataSuara(suara);
  let dari = setelah ? kata.indexOf(norm(setelah)) + 1 : 0;
  if (setelah && dari === 0) throw new Error(`kata "${setelah}" tidak ada dalam: ${suara}`);
  return daftar.map((n) => {
    const p = cari(kata, n, dari);
    if (p < 0) throw new Error(`bilangan ${n} tidak ada setelah nomor ${dari} dalam: ${suara}`);
    dari = p + 1;
    return p;
  });
};
/** Nomor kata terakhir bilangan `n` yang ke-`ke` kali disebut. */
export const bilKe = (suara: string, n: number, ke = 1): number => {
  const kata = kataSuara(suara);
  let dari = 0;
  for (let c = 1; c <= ke; c += 1) {
    const p = cari(kata, n, dari);
    if (p < 0) throw new Error(`bilangan ${n} ke-${ke} tidak ada dalam: ${suara}`);
    if (c === ke) return p;
    dari = p + 1;
  }
  return -1;
};
