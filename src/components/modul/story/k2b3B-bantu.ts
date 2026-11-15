import type { Aksi, KetukanStory, Obj } from "./logika-story";
import { W, angkaKeping, kartuAngka, type Titik } from "./k2b3B-gambar";

/** Penyingkat penulisan naskah Story Sub-Bab B Bab 3 Kelas 2 (khusus sub-bab ini). */
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

const SATUAN = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
const BELASAN = ["sepuluh", "sebelas", "dua belas", "tiga belas", "empat belas", "lima belas", "enam belas", "tujuh belas", "delapan belas", "sembilan belas"];

/** Nama bilangan 0 sampai 20 (indeks = bilangan). */
export const NAMA_BILANGAN: string[] = Array.from({ length: 21 }, (_, n) => {
  if (n === 0) return "nol";
  if (n < 10) return SATUAN[n];
  if (n < 20) return BELASAN[n - 10];
  return "dua puluh";
});

/** Nomor kata awal tiap nilai dalam `nilai`, dicari berurutan mulai setelah kata `setelah` bila diberikan. Galat bila ada yang tidak ketemu. */
export const urutNilai = (suara: string, nilai: number[], setelah?: string): number[] => {
  const kata2 = suara.split(/\s+/).filter(Boolean).map(norm);
  let kursor = setelah ? kata2.indexOf(norm(setelah)) + 1 : 0;
  if (setelah && kursor === 0) throw new Error(`kata "${setelah}" tidak ada dalam: ${suara}`);
  const hasil: number[] = [];
  for (const n of nilai) {
    const pecah = NAMA_BILANGAN[n].split(" ");
    let p = -1;
    for (let i = kursor; i + pecah.length <= kata2.length; i += 1) {
      if (pecah.every((c, q) => kata2[i + q] === c)) {
        p = i;
        break;
      }
    }
    if (p < 0) throw new Error(`bilangan "${NAMA_BILANGAN[n]}" tidak ada setelah nomor ${kursor} dalam: ${suara}`);
    hasil.push(p);
    kursor = p + pecah.length;
  }
  return hasil;
};

/** Deret bilangan berurutan `dari` sampai `sampai`. */
export const urutBilangan = (suara: string, dari: number, sampai: number, setelah?: string): number[] => urutNilai(suara, Array.from({ length: sampai - dari + 1 }, (_, q) => dari + q), setelah);

/** Angka hitungan keping: tiap nama bilangan dalam suara memunculkan angka `kn{i}` di pusat keping ke-i (daftar titik sudut tiap keping). */
export function hitungKeping(suara: string, keping: Titik[][], opsi: { setelah?: string; naik?: number } = {}): Aksi[] {
  const pos = urutBilangan(suara, 1, keping.length, opsi.setelah);
  return keping.map((pts, q) => tambah(pos[q], angkaKeping(q, pts, String(q + 1), 9, opsi.naik ?? 0)));
}

/** Pilihan kartu (id c1..cn), pojok kiri-atas di tinggi `y`, lebar kartu menyesuaikan jumlah. */
export const pilihKata = (y: number, isi: string[], u = 11): ReturnType<typeof kartuAngka> => {
  const n = isi.length;
  const w = n === 2 ? 120 : 90;
  const jarak = n === 2 ? 20 : 5;
  const x0 = (300 - (n * w + (n - 1) * jarak)) / 2;
  return isi.flatMap((t, i) => kartuAngka(`c${i + 1}`, x0 + i * (w + jarak), y, t, [W.hijauMuda, W.pink, W.langit][i], w, 30, u));
};

/** Hapus n kartu pilihan (c1..cn). */
export const hapusKartu = (at: At, n: number): Aksi => hapus(at, ...Array.from({ length: n }, (_, i) => [`c${i + 1}-k`, `c${i + 1}-t`]).flat());
