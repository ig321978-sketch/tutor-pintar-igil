import type { Aksi, KetukanStory, Obj } from "./logika-story";
import { type PosisiJam, jam, sudutPanjang, sudutPendek, tulisDigital } from "./k2b6B-gambar";

/** Penyingkat penulisan naskah Story Sub-Bab B Bab 6 Kelas 2 (khusus sub-bab ini). */
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

const SATUAN = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh"];
const BELASAN = ["sepuluh", "sebelas", "dua belas", "tiga belas", "empat belas", "lima belas", "enam belas", "tujuh belas", "delapan belas", "sembilan belas"];

/** Nama bilangan 0 sampai 20 (indeks = bilangan). */
export const NAMA_BILANGAN: string[] = Array.from({ length: 21 }, (_, n) => {
  if (n === 0) return "nol";
  if (n < 10) return SATUAN[n];
  if (n < 20) return BELASAN[n - 10];
  return "dua puluh";
});
export const NAMA = SATUAN;

/* ------------------------------ Jam analog ------------------------------ */

export type Waktu = { h: number; m: number };

/** Jam analog lengkap muncul pada kata `at`. */
export const tambahJam = (at: At, id: string, p: PosisiJam, h: number, m = 0, semua = true): Aksi => tambah(at, jam(id, p, h, m, semua));

/** Hapus seluruh jam `id` (muka, angka, jarum, poros). */
export const hapusJam = (at: At, id: string, semua = true): Aksi => ({
  at,
  hapus: [`${id}-w`, ...(semua ? Array.from({ length: 12 }, (_, i) => i + 1) : [3, 6, 9, 12]).map((n) => `${id}-a${n}`), `${id}-p`, `${id}-m`, `${id}-h`],
});

/**
 * Jam `id` maju dari waktu `dari` ke waktu `ke` (searah jarum jam): kedua jarum berputar. Selisih waktu (dalam menit) dibagi
 * dua untuk jarum pendek dan dikali enam untuk jarum panjang, sehingga hubungan kedua jarum tetap benar.
 */
export function putarJam(at: At, id: string, dari: Waktu, ke: Waktu): Aksi {
  const selisih = (((ke.h % 12) * 60 + ke.m - ((dari.h % 12) * 60 + dari.m)) % 720 + 720) % 720;
  if (selisih === 0) throw new Error("waktu awal dan akhir sama");
  return ubah(at, { id: `${id}-p`, rot: sudutPendek(dari.h, dari.m) + selisih / 2 }, { id: `${id}-m`, rot: sudutPanjang(dari.m) + selisih * 6 });
}

/** Tulisan jam digital berubah. */
export const ubahDigital = (at: At, jam24: number, m = 0): Aksi => ubah(at, { id: "dg-t", isi: tulisDigital(jam24, m) });

/** Hapus kartu pilihan c1..cn. */
export const hapusKartu = (at: At, n: number): Aksi => hapus(at, ...Array.from({ length: n }, (_, i) => [`c${i + 1}-k`, `c${i + 1}-t`]).flat());
