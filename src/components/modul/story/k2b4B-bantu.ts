import type { Aksi, KetukanStory, Obj } from "./logika-story";
import { W, hurufItem, item, kartuAngka, kodeDari, kurungSatuan, type Tata, idItem, KOSONG } from "./k2b4B-gambar";

/** Penyingkat penulisan naskah Story Sub-Bab B Bab 4 Kelas 2 (khusus sub-bab ini). */
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

type OpsiMuncul = { dari?: number; setelah?: string };

/** Benda barisan muncul satu per satu tepat saat namanya disebut dalam suara (urutan sama dengan `seq`). */
export function munculItem(suara: string, b: string, seq: string[], t: Tata, cy: number, o: OpsiMuncul = {}): Aksi[] {
  const dari = o.dari ?? 0;
  const pos = urutKata(suara, seq, o.setelah);
  return seq.slice(dari).map((s, q) => tambah(pos[dari + q], item(b, dari + q, s, t, cy)));
}

/** Huruf kode muncul satu per satu saat hurufnya diucapkan (A, B, C). */
export function munculHuruf(suara: string, b: string, seq: string[], t: Tata, cy: number, o: OpsiMuncul = {}): Aksi[] {
  const dari = o.dari ?? 0;
  const kode = kodeDari(seq);
  const pos = urutKata(suara, kode, o.setelah);
  return kode.slice(dari).map((h, q) => tambah(pos[dari + q], hurufItem(b, dari + q, h, t, cy)));
}

/** Kurung satuan j muncul pada kata `kata` (ke-n). */
export const kurung = (suara: string, kata: string, b: string, j: number, banyak: number, t: Tata, cy: number, n = 1): Aksi => tambah(idx(suara, kata, n), kurungSatuan(b, j, banyak, t, cy));

/** Ganti kotak kosong ke-n dengan benda `s` (disorot sebagai jawaban). */
export const isiKosong = (at: At, b: string, n: number, s: string, t: Tata, cy: number, sorot = true): Aksi => ({ at, hapus: [idItem(b, n, KOSONG)], tambah: [item(b, n, s, t, cy, sorot ? { sorot: true } : {})] });

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

/** Id semua benda `seq` pada barisan `b`. */
export const idBaris = (b: string, seq: string[]): string[] => seq.map((s, i) => idItem(b, i, s));

const SATUAN = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
const BELASAN = ["sepuluh", "sebelas", "dua belas", "tiga belas", "empat belas", "lima belas", "enam belas", "tujuh belas", "delapan belas", "sembilan belas"];

/** Nama bilangan 0 sampai 20 (indeks = bilangan). */
export const NAMA_BILANGAN: string[] = Array.from({ length: 21 }, (_, n) => {
  if (n === 0) return "nol";
  if (n < 10) return SATUAN[n];
  if (n < 20) return BELASAN[n - 10];
  return "dua puluh";
});
