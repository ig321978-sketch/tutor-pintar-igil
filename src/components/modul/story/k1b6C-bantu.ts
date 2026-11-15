import type { Aksi, KetukanStory, Obj } from "./logika-story";
import { teks, W, type Titik } from "./k1b6C-gambar";

/** Penyingkat penulisan naskah Story Sub-Bab C Bab 6 Kelas 1 (khusus sub-bab ini). */
type At = string | number | undefined;
type Ubah = Partial<Obj> & { id: string };

export const tambah = (at: At, ...objs: (Obj | Obj[])[]): Aksi => ({ at, tambah: objs.flat() });
export const ubah = (at: At, ...u: Ubah[]): Aksi => ({ at, ubah: u });
export const hapus = (at: At, ...ids: string[]): Aksi => ({ at, hapus: ids });
export const bersih = (at: At = 0): Aksi => ({ at, bersih: true });
export const k = (suara: string, ...aksi: Aksi[]): KetukanStory => ({ suara, aksi });
export const sorotkan = (at: At, ...ids: string[]): Aksi => ({ at, ubah: ids.map((id) => ({ id, sorot: true })) });
export const redamkan = (at: At, ...ids: string[]): Aksi => ({ at, ubah: ids.map((id) => ({ id, sorot: false })) });
/** Benda yang "pergi" dibuat pudar (tampak sudah tidak ada) tetapi tetap terlihat di tempatnya. */
export const pudarkan = (at: At, ...ids: string[]): Aksi => ({ at, ubah: ids.map((id) => ({ id, op: 0.25, sorot: false })) });

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

/** Nama bilangan 0 sampai 20 (indeks = bilangan). */
export const NAMA_BILANGAN = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas", "dua belas", "tiga belas", "empat belas", "lima belas", "enam belas", "tujuh belas", "delapan belas", "sembilan belas", "dua puluh"];

const cariNama = (kata2: string[], kursor: number, n: number, suara: string): number => {
  const pecah = NAMA_BILANGAN[n].split(" ");
  for (let i = kursor; i + pecah.length <= kata2.length; i += 1) if (pecah.every((c, q) => kata2[i + q] === c)) return i;
  throw new Error(`bilangan "${NAMA_BILANGAN[n]}" tidak ada setelah nomor ${kursor} dalam: ${suara}`);
};
const mulaiKursor = (kata2: string[], setelah: string | undefined, suara: string): number => {
  const kursor = setelah ? kata2.indexOf(norm(setelah)) + 1 : 0;
  if (setelah && kursor === 0) throw new Error(`kata "${setelah}" tidak ada dalam: ${suara}`);
  return kursor;
};

/** Nomor kata awal untuk deret bilangan naik dari `dari` sampai `sampai` (nama bilangan boleh dua kata), dicari berurutan mulai setelah kata `setelah`. */
export const urutBilangan = (suara: string, dari: number, sampai: number, setelah?: string): number[] => {
  const kata2 = suara.split(/\s+/).filter(Boolean).map(norm);
  let kursor = mulaiKursor(kata2, setelah, suara);
  const hasil: number[] = [];
  for (let n = dari; n <= sampai; n += 1) {
    const p = cariNama(kata2, kursor, n, suara);
    hasil.push(p);
    kursor = p + NAMA_BILANGAN[n].split(" ").length;
  }
  return hasil;
};

/** Seperti urutBilangan, tetapi deret turun: dari `dari` mundur sampai `sampai` (dari >= sampai). */
export const urutMundur = (suara: string, dari: number, sampai: number, setelah?: string): number[] => {
  const kata2 = suara.split(/\s+/).filter(Boolean).map(norm);
  let kursor = mulaiKursor(kata2, setelah, suara);
  const hasil: number[] = [];
  for (let n = dari; n >= sampai; n -= 1) {
    const p = cariNama(kata2, kursor, n, suara);
    hasil.push(p);
    kursor = p + NAMA_BILANGAN[n].split(" ").length;
  }
  return hasil;
};

/**
 * Aksi menghitung maju sambil menyentuh: tiap nama bilangan dalam suara memunculkan angka di atas benda ke-i dan memindahkan tangan ke bawahnya.
 * Angka `${id}n{i}`, tangan `tg`. `dari` = bilangan pertama dalam deret (bawaan satu), `awal` = nomor benda pertama yang dihitung.
 */
export function hitungAksi(suara: string, id: string, pts: Titik[], opsi: { setelah?: string; dari?: number; awal?: number; tanganAda?: boolean; naik?: number; turun?: number; akhir?: number } = {}): Aksi[] {
  const dari = opsi.dari ?? 1;
  const awal = opsi.awal ?? 0;
  const naik = opsi.naik ?? 14;
  const turun = opsi.turun ?? 24;
  const akhir = opsi.akhir ?? pts.length;
  const pos = urutBilangan(suara, dari, dari + akhir - 1 - awal, opsi.setelah);
  return pts.slice(awal, akhir).flatMap((p, q) => {
    const i = awal + q;
    const angka = tambah(pos[q], teks(`${id}n${i}`, p.x, p.y - naik, String(dari + q), 10.6, W.merah));
    if (turun === 0) return [angka];
    const tg = { id: "tg", t: "teks" as const, x: p.x, y: p.y + turun, isi: "\u{1F446}", u: 20, warna: W.biru };
    if (q === 0 && !opsi.tanganAda) return [angka, tambah(pos[q], tg)];
    return [angka, ubah(pos[q], { id: "tg", x: p.x, y: p.y + turun })];
  });
}

/**
 * Aksi menghitung mundur sambil menyentuh benda yang pergi. Ada `awal` benda (nomor 0 sampai awal-1); benda nomor i yang pergi
 * meninggalkan i benda, jadi nomor yang diucapkan sama dengan nomor benda. Benda nomor awal-1 pergi lebih dulu (bilangan awal-1 diucapkan),
 * lalu awal-2, dan seterusnya sebanyak `pergi` kali. Tiap bilangan yang diucapkan memunculkan angka `${id}m{i}` di atas bendanya dan membuat benda pudar.
 * Nama bilangan dicari berurutan setelah kata `setelah` dalam suara.
 */
export function mundurAksi(suara: string, id: string, pts: Titik[], pergi: number, opsi: { setelah?: string; naik?: number } = {}): Aksi[] {
  const awal = pts.length;
  const naik = opsi.naik ?? 14;
  const pos = urutMundur(suara, awal - 1, awal - pergi, opsi.setelah);
  return pos.flatMap((p, q) => {
    const i = awal - 1 - q;
    return [tambah(p, teks(`${id}m${i}`, pts[i].x, pts[i].y - naik, String(i), 10.6, W.merah)), pudarkan(p, `${id}${i}`)];
  });
}
