/**
 * Misi dan tantangan bebas Kelas 3 Bab 4 (Unsur-Unsur Bangun Datar). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-k3b4.mjs.
 *
 * Simulasi bertahap per sub-bab (tiga alat). Tiap lab memuat beberapa bagian (tampilan) dalam satu alat:
 *  A Sisi Bangun Datar        : Lab Ruas Garis (Jenis, Ukur, Sisi) + Mesin Ruas Garis + skenario Peta Alfa.
 *  B Sudut                    : Lab Sudut (Strip, Busur, Satuan) + Mesin Sudut + skenario Pintu Meutia.
 *  C Garis Tegak Lurus, Sejajar : Lab Dua Garis (Dua Garis, Bangun) + Mesin Garis + skenario Pagar Taman (pencapaian bab).
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi, KeadaanSelesai } from "./misi-simulasi";
import type { KeadaanRuas } from "./lab-ruas-k3b4";
import type { KeadaanSudut } from "./lab-sudut-k3b4";
import type { KeadaanGaris } from "./lab-garis-k3b4";

export type KeadaanK3Bab4 = KeadaanRuas | KeadaanSudut | KeadaanGaris | KeadaanSelesai;

const ruas = (k: KeadaanK3Bab4): k is KeadaanRuas => k.alat === "ruas";
const sudut = (k: KeadaanK3Bab4): k is KeadaanSudut => k.alat === "sudut";
const garis = (k: KeadaanK3Bab4): k is KeadaanGaris => k.alat === "garis";
const selesai = (k: KeadaanK3Bab4, id: string) => k.alat === "selesai" && k.id === id;

/** Id yang dilaporkan skenario dan mesin saat tuntas (dipakai misi di bawah dan pembungkus React). */
export const ID_SKENARIO_K3B4 = { A: "peta-alfa", B: "pintu-meutia", C: "pagar-taman" } as const;
export const ID_MESIN_K3B4 = { A: "mesin-ruas", B: "mesin-sudut", C: "mesin-garis" } as const;

/** Ada sudut yang sudah diukur dengan irisan besar dan irisan kecil sekaligus. */
export const satuanGanda = (pernah: readonly string[]): boolean => [30, 60, 90, 120, 150, 180].some((s) => pernah.includes(`${s}:besar`) && pernah.includes(`${s}:kecil`));

/** Sub-Bab A: ruas garis, mengukur dalam cm dan mm, dan sisi bangun datar. */
export const MISI_A: DefMisi<KeadaanK3Bab4>[] = [
  {
    id: "a-jenis",
    teks: "Di Jenis, perpanjang sinar garis ke kanan (kiri ditolak) dan perpanjang garis ke kiri dan ke kanan.",
    wajib: true,
    cek: (k) => ruas(k) && ["sinar-kanan", "sinar-kiri-tolak", "garis-kiri", "garis-kanan"].every((p) => k.pernah.includes(p)),
  },
  {
    id: "a-dua-titik",
    teks: "Hubungkan dua titik P dan Q dengan satu ruas garis lurus dan tiga kurva yang berbeda.",
    wajib: true,
    cek: (k) => ruas(k) && k.ruasLurus && k.kurva >= 3,
  },
  {
    id: "a-ukur",
    teks: "Ukur MN dari angka 0 dan nyalakan mm dan cm desimal: 5 cm 5 mm = 55 mm = 5,5 cm.",
    wajib: true,
    cek: (k) => ruas(k) && k.pernahUkur.includes("mn") && k.tampilMm && k.tampilDesimal,
  },
  {
    id: "a-salah",
    teks: "Tekan Baca panjang saat ruas garis belum di angka 0, dan lihat mengapa bacaannya keliru.",
    wajib: true,
    cek: (k) => ruas(k) && k.pernahSalah,
  },
  {
    id: "a-sisi",
    teks: "Di Sisi, tandai semua sisi segitiga dan semua sisi segilima, lalu lihat banyak sisinya.",
    wajib: true,
    cek: (k) => ruas(k) && k.pernahLengkap.includes("segitiga") && k.pernahLengkap.includes("segilima"),
  },
  { id: "a-mesin", teks: "Selesaikan Mesin Ruas Garis sampai semua ruas garis diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K3B4.A) },
  { id: "a-skenario", teks: "Selesaikan skenario Peta Alfa sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K3B4.A) },
  { id: "a-37", teks: "Ukur PQ dari angka 0: 3 cm 7 mm = 37 mm = 3,7 cm.", wajib: false, cek: (k) => ruas(k) && k.pernahUkur.includes("pq") },
  { id: "a-ruas-tolak", teks: "Coba perpanjang ruas garis dan lihat lab menolaknya. Ruas garis punya dua ujung dan panjang tetap.", wajib: false, cek: (k) => ruas(k) && k.pernah.includes("ruas-tolak") },
  { id: "a-enam", teks: "Tandai semua sisi segienam ABCDEF. Berapa sisinya?", wajib: false, cek: (k) => ruas(k) && k.pernahLengkap.includes("segienam") },
];

/** Sub-Bab B: sudut, busur derajat, dan jenis-jenis sudut. */
export const MISI_B: DefMisi<KeadaanK3Bab4>[] = [
  {
    id: "b-siku",
    teks: "Putar kaki OB sampai tepat 90° dan nyalakan Pojok kertas: sudut siku-siku.",
    wajib: true,
    cek: (k) => sudut(k) && k.sudut === 90 && k.pojok,
  },
  {
    id: "b-gambar",
    teks: "Nyalakan Busur derajat dan buat sudut 50° dengan memutar kaki OB.",
    wajib: true,
    cek: (k) => sudut(k) && k.sudut === 50 && k.busur,
  },
  {
    id: "b-jenis",
    teks: "Nyalakan Jenis sudut, lalu temukan sudut lancip, siku-siku, tumpul, dan lurus.",
    wajib: true,
    cek: (k) => sudut(k) && ["lancip", "siku-siku", "tumpul", "lurus"].every((j) => k.pernahJenis.includes(j)),
  },
  {
    id: "b-refleks",
    teks: "Buat sudut refleks 300° dan nyalakan Pasangan: busur membaca 60°, dan 360° − 60° = 300°.",
    wajib: true,
    cek: (k) => sudut(k) && k.sudut === 300 && k.pasangan,
  },
  {
    id: "b-satuan",
    teks: "Di Satuan, ukur sudut yang sama dengan irisan besar dan irisan kecil, dan lihat bilangannya berbeda.",
    wajib: true,
    cek: (k) => sudut(k) && satuanGanda(k.pernahSatuan),
  },
  { id: "b-mesin", teks: "Selesaikan Mesin Sudut sampai semua sudut diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K3B4.B) },
  { id: "b-skenario", teks: "Selesaikan skenario Pintu Meutia sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K3B4.B) },
  { id: "b-lurus", teks: "Buat sudut lurus 180° dan nyalakan Pojok kertas. Sudut lurus sama dengan dua sudut siku-siku.", wajib: false, cek: (k) => sudut(k) && k.sudut === 180 && k.pojok },
  { id: "b-nol", teks: "Buat kedua kaki berimpit, yaitu sudut 0°, dengan Busur derajat menyala.", wajib: false, cek: (k) => sudut(k) && k.sudut === 0 && k.busur },
  { id: "b-135", teks: "Buat sudut tumpul 135° dengan Busur derajat menyala.", wajib: false, cek: (k) => sudut(k) && k.sudut === 135 && k.busur },
  { id: "b-230", teks: "Buat sudut refleks 230° dan nyalakan Pasangan: pasangannya sudut tumpul 130°.", wajib: false, cek: (k) => sudut(k) && k.sudut === 230 && k.pasangan },
];

/** Sub-Bab C: garis tegak lurus, garis sejajar, dan bangun datar sederhana (pencapaian misi bab). */
export const MISI_C: DefMisi<KeadaanK3Bab4>[] = [
  {
    id: "c-tegak",
    teks: "Buat dua garis yang bertemu pada sudut siku-siku dan nyalakan Lambang: tegak lurus, ⊥.",
    wajib: true,
    cek: (k) => garis(k) && k.relasi === "tegak-lurus" && k.lambang,
  },
  {
    id: "c-sejajar",
    teks: "Buat dua garis yang jaraknya sama di kedua ujung, dan nyalakan Lambang dan Jarak petak: sejajar, //.",
    wajib: true,
    cek: (k) => garis(k) && k.relasi === "sejajar" && k.lambang && k.jarak,
  },
  {
    id: "c-bukan",
    teks: "Buat dua garis yang bukan sejajar dan bukan tegak lurus. Nyalakan Jarak petak: jarak atau kedudukan di ujung kiri dan kanan berbeda.",
    wajib: true,
    cek: (k) => garis(k) && k.relasi === "bukan" && k.jarak && k.kiri !== null && k.kiri !== k.kanan,
  },
  {
    id: "c-rakit",
    teks: "Di Bangun, rakit batang: dua batang belum tertutup, tiga batang membentuk segitiga.",
    wajib: true,
    cek: (k) => garis(k) && k.pernahRakit.includes(2) && k.pernahRakit.includes(3),
  },
  {
    id: "c-lingkaran",
    teks: "Pilih lingkaran dan nyalakan Sudut: lingkaran dibatasi garis lengkung dan tidak punya sudut.",
    wajib: true,
    cek: (k) => garis(k) && k.bangun === "lingkaran" && k.sudutTampil,
  },
  { id: "c-mesin", teks: "Selesaikan Mesin Garis sampai semua pasangan garis diperiksa.", wajib: true, cek: (k) => selesai(k, ID_MESIN_K3B4.C) },
  { id: "c-skenario", teks: "Selesaikan skenario Pagar Taman sampai adegan akhir.", wajib: true, cek: (k) => selesai(k, ID_SKENARIO_K3B4.C) },
  {
    id: "c-miring",
    teks: "Buat dua garis sejajar yang miring (45° atau 135°), dengan Jarak petak menyala.",
    wajib: false,
    cek: (k) => garis(k) && k.relasi === "sejajar" && (k.ab === 45 || k.ab === 135) && k.jarak,
  },
  {
    id: "c-berimpit",
    teks: "Buat dua garis berimpit. Lab tidak menyebutnya dua garis sejajar, karena hanya terlihat satu garis.",
    wajib: false,
    cek: (k) => garis(k) && k.relasi === "berimpit",
  },
  {
    id: "c-persegi",
    teks: "Pilih persegi dan nyalakan Sisi, Sudut, Sisi sama, dan Siku-siku: 4 sisi sama panjang dan 4 sudut siku-siku.",
    wajib: false,
    cek: (k) => garis(k) && k.bangun === "persegi" && k.sisiTampil && k.sudutTampil && k.samaTampil && k.sikuTampil,
  },
  { id: "c-enam", teks: "Rakit enam batang menjadi segienam yang tertutup.", wajib: false, cek: (k) => garis(k) && k.pernahRakit.includes(6) },
];

export type HurufMisiK3B4 = "A" | "B" | "C";

export const daftarMisiK3Bab4 = (huruf: HurufMisiK3B4): DefMisi<KeadaanK3Bab4>[] => (huruf === "B" ? MISI_B : huruf === "C" ? MISI_C : MISI_A);
