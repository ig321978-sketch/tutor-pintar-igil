/**
 * Misi dan tantangan bebas Bab 5 (Bilangan sampai 20). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-kelas1.mjs.
 *
 * Simulasi bertahap: satu laboratorium bilangan yang alatnya bertambah per sub-bab
 * (A: Lab Puluhan dan Satuan sampai 20; B: + Maju dan Mundur, Ulat dan Kisi; C: + nilai tempat
 * dan tab Odometer; D: semua alat + Banding dan Urutan + bandingkan nilai tempat, sekaligus
 * simulasi pencapaian misi bab ini).
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";

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

export type KeadaanBab5 = KeadaanPuluhan | KeadaanDeret | KeadaanBandingJeruk | KeadaanSelesai;

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

/** Sub-Bab A: bilangan 11 sampai 20 dengan benda, bingkai, kalimat sepuluh, dan garis bilangan. */
export const MISI_A: DefMisi<KeadaanBab5>[] = [
  { id: "a-sebelas", teks: "Buat bilangan 11: sepuluh ditambah satu. Lihat bingkai kedua mulai terisi.", wajib: true, cek: (k) => pul(k) && k.bingkai && k.n === 11 },
  { id: "a-sepuluh", teks: "Buat tepat 10. Bingkai pertama penuh, bingkai kedua kosong.", wajib: true, cek: (k) => pul(k) && k.n === 10 },
  { id: "a-ikat", teks: "Buat 13, lalu nyalakan Ikat sepuluh.", wajib: true, cek: (k) => pul(k) && k.ikat && k.n === 13 },
  { id: "a-garis", teks: "Ketuk angka 17 di garis bilangan. Letaknya di kanan angka 10.", wajib: true, cek: (k) => pul(k) && k.garis && k.n === 17 },
  { id: "a-dua-puluh", teks: "Isi sampai 20: dua bingkai penuh.", wajib: true, cek: (k) => pul(k) && k.n === 20 },
  { id: "a-sembilan-belas", teks: "Buat 19. Tinggal satu lagi menjadi 20.", wajib: false, cek: (k) => pul(k) && k.n === 19 },
  { id: "a-kalimat", teks: "Buat 16 dan baca kalimat sepuluh ditambah sisanya.", wajib: false, cek: (k) => pul(k) && k.kalimat && k.n === 16 },
];

/** Sub-Bab B: menghitung maju dan mundur, bilangan yang hilang, kisi 1 sampai 20. */
export const MISI_B: DefMisi<KeadaanBab5>[] = [
  { id: "b-maju", teks: "Tekan Maju 3 kali. Lihat bilangan bergerak ke kanan.", wajib: true, cek: (k) => der(k) && k.maju >= 3 },
  { id: "b-mundur", teks: "Tekan Mundur 3 kali. Lihat bilangan bergerak ke kiri.", wajib: true, cek: (k) => der(k) && k.mundur >= 3 },
  { id: "b-mulai", teks: "Ubah Mulai dari menjadi 18, lalu maju sampai 20.", wajib: true, cek: (k) => der(k) && k.awal === 18 && k.n === 20 },
  { id: "b-ulat", teks: "Sembunyikan bilangan sekarang di ulat bilangan. Tebak, lalu buka.", wajib: true, cek: (k) => der(k) && k.sembunyi },
  { id: "b-tetangga", teks: "Pindah ke bilangan 16. Lihat tetangga sebelum dan sesudahnya.", wajib: false, cek: (k) => der(k) && k.tetangga && k.n === 16 },
  { id: "b-ingat", teks: "Ingat Sub-Bab A: buat bilangan 20 di Lab Bilangan.", wajib: false, cek: (k) => pul(k) && k.n === 20 },
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
