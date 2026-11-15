import type { Aksi, KetukanStory, Obj } from "./logika-story";
import { W, benda, idBenda, kartuAngka, jmlMeja, tempat, type Simbol, type Tempat } from "./k2b5B-gambar";

/** Penyingkat penulisan naskah Story Sub-Bab B Bab 5 Kelas 2 (khusus sub-bab ini). */
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

/** Nomor kata awal tiap kata dalam `daftar`, dicari berurutan mulai setelah kata `setelah` (kemunculan pertama) bila diberikan. */
export const urutKata = (suara: string, daftar: string[], setelah?: string): number[] => {
  const kata2 = suara.split(/\s+/).filter(Boolean).map(norm);
  let kursor = 0;
  if (setelah) {
    const p = kata2.indexOf(norm(setelah));
    if (p < 0) throw new Error(`kata "${setelah}" tidak ada dalam: ${suara}`);
    kursor = p + 1;
  }
  return daftar.map((d) => {
    const p = kata2.indexOf(norm(d), kursor);
    if (p < 0) throw new Error(`kata "${d}" tidak ada setelah nomor ${kursor} dalam: ${suara}`);
    kursor = p + 1;
    return p;
  });
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

/**
 * Benda di meja muncul satu per satu tepat saat bilangannya disebut (satu, dua, tiga, ...) setelah kata `setelah`;
 * angka banyak benda muncul bersama benda terakhir. `n0` = banyak benda awal di meja (menentukan posisi).
 */
export function munculMeja(suara: string, n: number, s: Simbol, setelah?: string, n0 = n): Aksi[] {
  const pos = urutKata(suara, SATUAN.slice(1, n + 1), setelah);
  return pos.map((p, i) => tambah(p, benda("mj", i, s, n0), ...(i === n - 1 ? [jmlMeja(n)] : [])));
}

/** Semua benda di meja sekaligus pada kata `at`, dengan angkanya. */
export const mejaSekaligus = (at: At, n: number, s: Simbol, n0 = n): Aksi => tambah(at, Array.from({ length: n }, (_, i) => benda("mj", i, s, n0)), jmlMeja(n));

/** Dua tempat pembagian muncul pada kata `at`. */
export const duaTempat = (at: At, namaKiri: string, namaKanan: string): Aksi => tambah(at, tempat("pa", namaKiri), tempat("pb", namaKanan));

export type Langkah = { at: At; n: number; ke: "pa" | "pb" };

/**
 * Pindahkan benda meja ke-n ke tempat kiri atau kanan pada kata `at`; angka di meja dan di tempat ikut berubah.
 * `awal` = banyak benda tiap tempat sebelum langkah pertama (benda sudah ada di tempat itu).
 */
export function pindah(s: Simbol, n0: number, langkah: Langkah[], awal = { mj: n0, pa: 0, pb: 0 }): Aksi[] {
  const c = { ...awal };
  const out: Aksi[] = [];
  for (const l of langkah) {
    out.push({ at: l.at, hapus: [idBenda("mj", l.n, s)], tambah: [benda(l.ke, c[l.ke], s, n0, { sorot: true })] });
    c[l.ke] += 1;
    c.mj -= 1;
    out.push(ubah(l.at, { id: `${l.ke}-jml`, isi: String(c[l.ke]) }, { id: "mj-jml", isi: String(c.mj) }));
  }
  return out;
}

/** Benda yang sudah dipindah tidak lagi disorot. */
export const redamBenda = (at: At, g: "pa" | "pb", banyak: number, s: Simbol): Aksi => redamkan(at, ...Array.from({ length: banyak }, (_, i) => idBenda(g, i, s)));

/** Pilihan kartu (id c1..cn), pojok kiri-atas di tinggi `y`. */
export const pilihKata = (y: number, isi: string[], u = 11): ReturnType<typeof kartuAngka> => {
  const n = isi.length;
  const w = n === 2 ? 120 : 90;
  const jarak = n === 2 ? 20 : 5;
  const x0 = (300 - (n * w + (n - 1) * jarak)) / 2;
  return isi.flatMap((tx, i) => kartuAngka(`c${i + 1}`, x0 + i * (w + jarak), y, tx, [W.hijauMuda, W.pink, W.langit][i], w, 30, u));
};

/** Hapus n kartu pilihan (c1..cn). */
export const hapusKartu = (at: At, n: number): Aksi => hapus(at, ...Array.from({ length: n }, (_, i) => [`c${i + 1}-k`, `c${i + 1}-t`]).flat());

export type { Tempat };

/** Pindahkan benda dari tempat kiri atau kanan ke tempat lain (benda ke-n di `dari` menjadi benda ke-m di `ke`); angka kedua tempat ikut berubah. */
export function geser(at: At, s: Simbol, n0: number, dari: "pa" | "pb", n: number, ke: "pa" | "pb", m: number, jmlDari: number, jmlKe: number): Aksi[] {
  return [
    { at, hapus: [idBenda(dari, n, s)], tambah: [benda(ke, m, s, n0, { sorot: true })] },
    ubah(at, { id: `${dari}-jml`, isi: String(jmlDari) }, { id: `${ke}-jml`, isi: String(jmlKe) }),
  ];
}

/** Meja kosong: kotak dan angkanya dihapus. */
export const bersihMeja = (at: At): Aksi => hapus(at, "mj-w", "mj-jml");
