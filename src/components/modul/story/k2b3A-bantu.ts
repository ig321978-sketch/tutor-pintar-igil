import type { Aksi, KetukanStory, Obj } from "./logika-story";
import { W, angkaSisi, angkaSudut, garisSisi, kartuAngka, titikSudut, type Titik } from "./k2b3A-gambar";

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

const SATUAN = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
const NAMA_DASAR = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas", "dua belas", "tiga belas", "empat belas", "lima belas", "enam belas", "tujuh belas", "delapan belas", "sembilan belas"];

/** Nama bilangan 0 sampai 20 (indeks = bilangan). */
export const NAMA_BILANGAN: string[] = Array.from({ length: 21 }, (_, n) => {
  if (n < 20) return NAMA_DASAR[n];
  const puluh = Math.floor(n / 10);
  const sisa = n % 10;
  return `${SATUAN[puluh]} puluh${sisa ? ` ${SATUAN[sisa]}` : ""}`;
});

/** Kata-kata suara dengan penanda batas: kata yang diakhiri tanda baca memutus nama bilangan dua kata atau lebih. */
const tokenBatas = (suara: string): { w: string; akhir: boolean }[] => suara.split(/\s+/).filter(Boolean).map((t) => ({ w: norm(t), akhir: /[,.;:!?]$/.test(t) }));

/**
 * Nomor kata awal untuk deret bilangan `daftar`, dicari berurutan mulai setelah kata `setelah` (kemunculan pertama) bila diberikan.
 * Nama bilangan tidak menyeberangi tanda baca. Galat bila ada yang tidak ketemu.
 */
export const urutNilai = (suara: string, daftar: number[], setelah?: string): number[] => {
  const kata2 = tokenBatas(suara);
  let kursor = setelah ? kata2.findIndex((t) => t.w === norm(setelah)) + 1 : 0;
  if (setelah && kursor === 0) throw new Error(`kata "${setelah}" tidak ada dalam: ${suara}`);
  const hasil: number[] = [];
  for (const n of daftar) {
    const pecah = NAMA_BILANGAN[n].split(" ");
    let p = -1;
    for (let i = kursor; i + pecah.length <= kata2.length; i += 1) {
      if (pecah.every((c, q) => kata2[i + q].w === c && (q === pecah.length - 1 || !kata2[i + q].akhir))) {
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

/** Deret naik dari `dari` sampai `sampai` (lihat urutNilai). */
export const urutBilangan = (suara: string, dari: number, sampai: number, setelah?: string): number[] => urutNilai(suara, Array.from({ length: sampai - dari + 1 }, (_, q) => dari + q), setelah);

/**
 * Menghitung sisi: tiap nama bilangan dalam suara (satu, dua, tiga, ...) memunculkan garis merah sisi ke-i dan angkanya.
 * `awal` = nomor sisi pertama yang dihitung (mulai 0), `sampai` = banyak sisi yang dihitung (bawaan semua).
 */
export function sisiAksi(suara: string, id: string, pts: Titik[], opsi: { setelah?: string; awal?: number; sampai?: number } = {}): Aksi[] {
  const awal = opsi.awal ?? 0;
  const sampai = opsi.sampai ?? pts.length;
  const pos = urutBilangan(suara, awal + 1, sampai, opsi.setelah);
  return Array.from({ length: sampai - awal }, (_, q) => tambah(pos[q], garisSisi(id, pts, awal + q), angkaSisi(id, pts, awal + q)));
}

/** Menghitung pojok: tiap nama bilangan memunculkan titik emas pojok ke-i dan angkanya. */
export function sudutAksi(suara: string, id: string, pts: Titik[], opsi: { setelah?: string; awal?: number; sampai?: number } = {}): Aksi[] {
  const awal = opsi.awal ?? 0;
  const sampai = opsi.sampai ?? pts.length;
  const pos = urutBilangan(suara, awal + 1, sampai, opsi.setelah);
  return Array.from({ length: sampai - awal }, (_, q) => tambah(pos[q], titikSudut(id, pts, awal + q), angkaSudut(id, pts, awal + q)));
}

/** Pilihan kartu (id c1..cn), pojok kiri-atas di tinggi `y`, lebar kartu menyesuaikan jumlah; `u` = ukuran huruf. */
export const pilihKata = (y: number, isi: string[], u = 13): ReturnType<typeof kartuAngka> => {
  const n = isi.length;
  const w = n === 2 ? 120 : 88;
  const jarak = n === 2 ? 20 : 6;
  const x0 = (300 - (n * w + (n - 1) * jarak)) / 2;
  return isi.flatMap((t, i) => kartuAngka(`c${i + 1}`, x0 + i * (w + jarak), y, t, [W.hijauMuda, W.pink, W.langit][i], w, 30, u));
};

/** Sorotan bergilir: pada kata pemicu ke-i, benda sebelumnya diredam dan benda ke-i disorot. `ke` = kemunculan kata (bawaan pertama). */
export function gilir(suara: string, urut: [string, string[], number?][]): Aksi[] {
  const out: Aksi[] = [];
  urut.forEach(([kata, id, ke], i) => {
    const at = idx(suara, kata, ke ?? 1);
    if (i > 0) out.push(redamkan(at, ...urut[i - 1][1]));
    out.push(sorotkan(at, ...id));
  });
  return out;
}
