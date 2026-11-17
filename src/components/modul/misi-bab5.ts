/**
 * Misi dan tantangan bebas Bab 5 (Bilangan sampai 20). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-kelas1.mjs.
 *
 * Simulasi bertahap: satu laboratorium bilangan yang alatnya bertambah per sub-bab
 * (A: kini Wadah Sekat Sepuluh, Misi Lapak Ikan bagian satu (ikan-k1b5a); dulu Lab Puluhan dan Satuan sampai 20; B: kini Rak Akuarium Bernomor, Misi Lapak Ikan bagian satu (rak-k1b5b); dulu Maju dan Mundur, Ulat dan Kisi; C: + nilai tempat
 * dan tab Odometer; D: semua alat + Banding dan Urutan + bandingkan nilai tempat, sekaligus
 * simulasi pencapaian misi bab ini).
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanIkan } from "./ikan-k1b5a/logika";
import type { KeadaanRak } from "./rak-k1b5b/logika";

export type KeadaanPuluhan = {
  alat: "puluhan";
  n: number;
  m: number;
  /** Sepuluh benda sedang diikat (hanya bila n sudah 10 atau lebih). */
  ikat: boolean;
  /** Bandingkan nilai tempat sedang menyala. */
  banding: boolean;
  benda: boolean;
  bingkai: boolean;
  kalimat: boolean;
  tabel: boolean;
  garis: boolean;
};

export type KeadaanDeret = {
  alat: "deret";
  /** Titik awal perjalanan. */
  awal: number;
  /** Bilangan sekarang. */
  n: number;
  maju: number;
  mundur: number;
  /** Bilangan sekarang sedang disembunyikan di ulat bilangan. */
  sembunyi: boolean;
  tetangga: boolean;
  kisi: boolean;
};

/** Jeruk Kira, Tika, dan Wei (dipakai juga Bab 6, bersama SimulasiBanding). */
export type KeadaanBandingJeruk = {
  alat: "banding";
  jumlah: number[];
  pas: number;
  pasang: boolean;
  tanda: boolean;
  selisih: boolean;
  batang: boolean;
  benda: boolean;
  paling: boolean;
  urut: boolean;
  garis: boolean;
};

export type KeadaanBab5 = KeadaanPuluhan | KeadaanDeret | KeadaanBandingJeruk | KeadaanSelesai | KeadaanIkan | KeadaanRak;

const pul = (k: KeadaanBab5): k is KeadaanPuluhan => k.alat === "puluhan";
const der = (k: KeadaanBab5): k is KeadaanDeret => k.alat === "deret";
const ban = (k: KeadaanBab5): k is KeadaanBandingJeruk => k.alat === "banding";
const selesai = (k: KeadaanBab5, id: string) => k.alat === "selesai" && k.id === id;

/** Indeks yang paling besar sendirian, atau -1 bila ada yang sama besar di puncak. */
export function puncakTunggal(a: number[]): number {
  const m = Math.max(...a);
  const di = a.flatMap((x, i) => (x === m ? [i] : []));
  return di.length === 1 ? di[0] : -1;
}

/**
 * Sub-Bab A: Misi Lapak Ikan bagian satu, wadah sekat sepuluh (Simulasi "Ikan Baru Datang", ikan-k1b5a). Banyak ikan tiap kantong sama dengan
 * KANTONG_SIM di ikan-k1b5a/data.ts (diuji di scripts/uji-ikan-k1b5a.mjs): ikan cupang dua belas, ikan molly enam belas, ikan buntal sembilan belas.
 */
const ikan = (k: KeadaanBab5): k is KeadaanIkan => k.alat === "ikan";
export const TOTAL_IKAN_A: Record<string, number> = { cupang: 12, molly: 16, buntal: 19 };
const ID_IKAN = Object.keys(TOTAL_IKAN_A);
const habis = (k: KeadaanIkan, id: string) => k.pindah[id] === TOTAL_IKAN_A[id];
const labelPas = (k: KeadaanIkan, id: string) => habis(k, id) && k.angka[id] === TOTAL_IKAN_A[id] && k.nama[id] === TOTAL_IKAN_A[id];
export const MISI_A: DefMisi<KeadaanBab5>[] = [
  { id: "a-tebak", teks: "Pilih tebakan untuk satu kantong, lalu pindahkan semua ikannya satu per satu dengan jaring.", wajib: true, cek: (k) => ikan(k) && ID_IKAN.some((id) => k.tebak[id] !== null && habis(k, id)) },
  { id: "a-sepuluh", teks: "Penuhi wadah pertama sampai sepuluh sekat terisi, lalu mulai isi wadah kedua.", wajib: true, cek: (k) => ikan(k) && ID_IKAN.some((id) => k.pindah[id] > 10) },
  { id: "a-label", teks: "Pasang label angka dan label nama yang tepat pada satu kantong yang sudah dihitung.", wajib: true, cek: (k) => ikan(k) && ID_IKAN.some((id) => labelPas(k, id)) },
  { id: "a-semua", teks: "Hitung dan pasang label angka dan nama yang tepat pada ketiga kantong ikan.", wajib: true, cek: (k) => ikan(k) && ID_IKAN.every((id) => labelPas(k, id)) },
  { id: "a-dekat", teks: "Buat tebakan yang dekat dengan hasil hitung, lalu buktikan dengan menghitung.", wajib: false, cek: (k) => ikan(k) && ID_IKAN.some((id) => k.tebak[id] !== null && habis(k, id) && Math.abs((k.tebak[id] ?? 0) - TOTAL_IKAN_A[id]) <= 2) },
  { id: "a-ulang", teks: "Kembalikan satu ikan ke kantong, lalu hitung lagi sampai habis. Hasilnya tetap sama.", wajib: false, cek: (k) => ikan(k) && k.ulang.some((id) => habis(k, id)) },
];

/**
 * Sub-Bab B: Misi Lapak Ikan bagian satu, rak akuarium bernomor (Simulasi "Rak Akuarium Bernomor", rak-k1b5b). Label nomor yang jatuh sama dengan
 * HILANG_SIM di rak-k1b5b/data.ts (diuji di scripts/uji-rak-k1b5b.mjs): sembilan dan delapan belas, berbeda dari Story (tiga belas dan tujuh belas).
 */
const rak = (k: KeadaanBab5): k is KeadaanRak => k.alat === "rak";
export const HILANG_RAK_B = [9, 18] as const;
const pakanSekali = (k: KeadaanRak) => k.pakan.slice(1).every((p) => p === 1);
export const MISI_B: DefMisi<KeadaanBab5>[] = [
  { id: "b-maju", teks: "Pilih nomor mulai, lalu hitung maju: tekan Maju lima langkah berturut-turut.", wajib: true, cek: (k) => rak(k) && k.terbaikMaju >= 5 },
  { id: "b-mundur", teks: "Hitung mundur dari nomor lain: tekan Mundur lima langkah berturut-turut.", wajib: true, cek: (k) => rak(k) && k.terbaikMundur >= 5 },
  { id: "b-label", teks: "Pasang lagi dua label nomor yang jatuh. Lihat nomor sebelum dan sesudahnya.", wajib: true, cek: (k) => rak(k) && HILANG_RAK_B.every((n) => k.label[String(n)] === n) },
  { id: "b-pakan", teks: "Beri pakan semua akuarium rak cupang tepat sekali, tidak ada yang terlewat.", wajib: true, cek: (k) => rak(k) && pakanSekali(k) },
  { id: "b-tetangga", teks: "Nyalakan Tetangga, lalu berdiri di akuarium sembilan belas. Sebutkan sebelum dan sesudahnya.", wajib: false, cek: (k) => rak(k) && k.tetangga && k.posisi === 19 },
  { id: "b-kisi", teks: "Nyalakan Kisi, lalu turun satu tingkat. Nomor di bawahnya tambah sepuluh.", wajib: false, cek: (k) => rak(k) && k.kisi && k.turun >= 1 },
];

/** Sub-Bab C: puluhan dan satuan di papan nilai tempat, odometer bilangan. */
export const MISI_C: DefMisi<KeadaanBab5>[] = [
  { id: "c-ikat", teks: "Buat tepat 10, lalu nyalakan Ikat sepuluh. Lihat tabel nilai tempat.", wajib: true, cek: (k) => pul(k) && k.tabel && k.ikat && k.n === 10 },
  { id: "c-lima-belas", teks: "Buat 15. Baca puluhan dan satuannya di tabel.", wajib: true, cek: (k) => pul(k) && k.tabel && k.n === 15 },
  { id: "c-sebelas", teks: "Buat 11. Angka 1 di kiri dan angka 1 di kanan nilainya beda.", wajib: true, cek: (k) => pul(k) && k.tabel && k.n === 11 },
  { id: "c-odometer", teks: "Selesaikan Odometer Bilangan sampai selesai.", wajib: true, cek: (k) => selesai(k, "odometer") },
  { id: "c-dua-puluh", teks: "Buat 20: dua puluhan dan nol satuan di tabel.", wajib: false, cek: (k) => pul(k) && k.tabel && k.n === 20 },
  { id: "c-ingat", teks: "Ingat Sub-Bab B: tekan Maju 3 kali di Maju dan Mundur.", wajib: false, cek: (k) => der(k) && k.maju >= 3 },
];

/** Sub-Bab D (sub-bab akhir): membandingkan dan mengurutkan, sekaligus pencapaian misi bab ini. */
export const MISI_D: DefMisi<KeadaanBab5>[] = [
  { id: "d-satuan", teks: "Nyalakan Bandingkan, lalu buat 13 dan 16. Puluhan sama, satuan menentukan.", wajib: true, cek: (k) => pul(k) && k.banding && ((k.n === 13 && k.m === 16) || (k.n === 16 && k.m === 13)) },
  { id: "d-puluhan", teks: "Bandingkan bilangan belasan dengan bilangan di bawah 10. Puluhan dibandingkan lebih dulu.", wajib: true, cek: (k) => pul(k) && k.banding && ((k.n >= 10 && k.m < 10) || (k.n < 10 && k.m >= 10)) },
  { id: "d-wei", teks: "Buat jeruk Wei paling banyak sendirian.", wajib: true, cek: (k) => ban(k) && puncakTunggal(k.jumlah) === 2 },
  { id: "d-urut", teks: "Atur jeruk supaya Kira terbanyak, Tika sedang, Wei paling sedikit.", wajib: true, cek: (k) => ban(k) && k.jumlah[0] > k.jumlah[1] && k.jumlah[1] > k.jumlah[2] },
  { id: "d-sama", teks: "Buat dua orang punya jeruk sama banyak.", wajib: false, cek: (k) => ban(k) && new Set(k.jumlah).size < k.jumlah.length },
  { id: "d-odometer", teks: "Ingat Sub-Bab C: selesaikan Odometer Bilangan.", wajib: false, cek: (k) => selesai(k, "odometer") },
];

export const daftarMisiBab5 = (sub: string): DefMisi<KeadaanBab5>[] => (sub === "B" ? MISI_B : sub === "C" ? MISI_C : sub === "D" ? MISI_D : MISI_A);
