/**
 * Lab Hariku (Kelas 2 Bab 6, Sub-Bab B: Waktu): lab 2D di atas garis waktu 24 jam.
 * Dua pertanyaan yang berbeda dipisahkan: KAPAN (urutan kejadian dan bagian hari) dan BERAPA LAMA (lama kegiatan).
 * Kegiatan yang mulai lebih dulu belum tentu lebih lama. Hanya lama dalam jam bulat yang punya "jam selesai" di jam.
 * Murni: tanpa React, tanpa jaringan, tanpa impor nilai. Diuji di scripts/uji-lab-k2b6.mjs.
 */

import type { KeadaanLabHari } from "./misi-k2bab6";

export type BagianHariHari = "pagi" | "siang" | "sore" | "malam";

export type KegiatanLab = { id: string; nama: string; ikon: string; jam24: number; menit: number };

/** Urutan tampil awal sengaja bercampur (tidak menurut waktu). Jam dan lama mengikuti acuan buku Kelas 2. */
export const KEGIATAN_LAB: KegiatanLab[] = [
  { id: "tidur", nama: "tidur malam", ikon: "😴", jam24: 21, menit: 480 },
  { id: "sarapan", nama: "sarapan", ikon: "🍳", jam24: 6, menit: 20 },
  { id: "bermain", nama: "bermain bersama adik", ikon: "🧸", jam24: 16, menit: 90 },
  { id: "mandiPagi", nama: "mandi pagi", ikon: "🚿", jam24: 7, menit: 15 },
  { id: "makanMalam", nama: "makan malam", ikon: "🍽️", jam24: 19, menit: 30 },
  { id: "kantin", nama: "makan di kantin", ikon: "🍱", jam24: 12, menit: 30 },
  { id: "olahraga", nama: "berolahraga", ikon: "🏃", jam24: 6, menit: 60 },
  { id: "sikatGigi", nama: "menyikat gigi", ikon: "🦷", jam24: 20, menit: 3 },
  { id: "sekolah", nama: "belajar di sekolah", ikon: "🏫", jam24: 7, menit: 300 },
  { id: "mandiSore", nama: "mandi sore", ikon: "🛁", jam24: 17, menit: 15 },
  { id: "bangun", nama: "bangun tidur", ikon: "🛏️", jam24: 5, menit: 10 },
  { id: "cuciTangan", nama: "mencuci tangan", ikon: "🧼", jam24: 12, menit: 1 },
];

export const kegiatanLab = (id: string): KegiatanLab => KEGIATAN_LAB.find((k) => k.id === id) as KegiatanLab;

export function bagianHariHari(jam24: number): BagianHariHari {
  if (jam24 >= 4 && jam24 <= 10) return "pagi";
  if (jam24 >= 11 && jam24 <= 14) return "siang";
  if (jam24 >= 15 && jam24 <= 17) return "sore";
  return "malam";
}

/** Pita bagian hari pada garis waktu 24 jam: batas dalam jam. Malam dipecah dua (0 sampai 4 dan 18 sampai 24). */
export const PITA_BAGIAN: { dari: number; sampai: number; bagian: BagianHariHari }[] = [
  { dari: 0, sampai: 4, bagian: "malam" },
  { dari: 4, sampai: 11, bagian: "pagi" },
  { dari: 11, sampai: 15, bagian: "siang" },
  { dari: 15, sampai: 18, bagian: "sore" },
  { dari: 18, sampai: 24, bagian: "malam" },
];

export const jam12Hari = (jam24: number): number => ((jam24 + 11) % 12) + 1;

export type LabHari = { urut: boolean; pilih: string[] };
export const awalHari = (): LabHari => ({ urut: false, pilih: [] });

/** Mengetuk kegiatan: memilih, atau melepas bila sudah dipilih. Paling banyak dua; pilihan ketiga menggantikan yang paling lama. */
export function ketukKegiatan(l: LabHari, id: string): LabHari {
  if (l.pilih.includes(id)) return { ...l, pilih: l.pilih.filter((x) => x !== id) };
  const pilih = l.pilih.length >= 2 ? [l.pilih[1], id] : [...l.pilih, id];
  return { ...l, pilih };
}

export const nyalakanUrut = (l: LabHari, nyala: boolean): LabHari => ({ ...l, urut: nyala });
export const resetHari = (): LabHari => awalHari();

/** Daftar yang ditampilkan: urutan awal, atau menurut jam mulai (jam sama tetap menurut urutan awal). */
export function daftarTampil(l: LabHari): KegiatanLab[] {
  if (!l.urut) return KEGIATAN_LAB;
  return KEGIATAN_LAB.map((k, i) => ({ k, i })).sort((a, b) => a.k.jam24 - b.k.jam24 || a.i - b.i).map((x) => x.k);
}

/** Nomor urutan kejadian. Kegiatan yang mulai pada jam yang sama berbagi nomor, karena tidak ada yang lebih dulu. */
export const nomorUrut = (k: KegiatanLab): number => 1 + KEGIATAN_LAB.filter((x) => x.jam24 < k.jam24).length;

export function lamaTeks(menit: number): string {
  if (menit < 60) return `${menit} menit`;
  const j = Math.floor(menit / 60);
  const m = menit % 60;
  return m === 0 ? `${j} jam` : `${j} jam ${m} menit`;
}

export const lamaJamBulat = (menit: number): boolean => menit >= 60 && menit % 60 === 0;

/** Jam selesai (jam 24) hanya bila lamanya jam bulat; selain itu null karena jarum pendek tidak cukup. */
export const selesaiJam = (k: KegiatanLab): number | null => (lamaJamBulat(k.menit) ? (k.jam24 + k.menit / 60) % 24 : null);

/** Selesai pada hari berikutnya (melewati tengah malam). */
export const lewatTengahMalam = (k: KegiatanLab): boolean => k.jam24 + k.menit / 60 > 24;

export type BandingLama = "lebih lama" | "lebih sebentar" | "sama lama";
export const bandingLama = (a: KegiatanLab, b: KegiatanLab): BandingLama => (a.menit > b.menit ? "lebih lama" : a.menit < b.menit ? "lebih sebentar" : "sama lama");

export function pasanganDipilih(l: LabHari): [KegiatanLab, KegiatanLab] | null {
  return l.pilih.length === 2 ? [kegiatanLab(l.pilih[0]), kegiatanLab(l.pilih[1])] : null;
}

export const banding = (l: LabHari): BandingLama | null => {
  const p = pasanganDipilih(l);
  return p ? bandingLama(p[0], p[1]) : null;
};

/** Satu kegiatan hitungan menit dan satu kegiatan hitungan jam sedang dibandingkan. */
export const menitDanJam = (l: LabHari): boolean => {
  const p = pasanganDipilih(l);
  return p !== null && ((p[0].menit < 60 && p[1].menit >= 60) || (p[1].menit < 60 && p[0].menit >= 60));
};

/** Laporan keadaan ke papan misi. */
export const laporanHari = (l: LabHari): KeadaanLabHari => ({ alat: "hari", urut: l.urut, pilih: l.pilih, banding: banding(l), menitJam: menitDanJam(l) });

/** Segmen pada garis waktu (jam desimal). Kegiatan yang melewati tengah malam dipecah dua. */
export function segmenKegiatan(k: KegiatanLab): { dari: number; sampai: number }[] {
  const akhir = k.jam24 + k.menit / 60;
  if (akhir <= 24) return [{ dari: k.jam24, sampai: akhir }];
  return [
    { dari: k.jam24, sampai: 24 },
    { dari: 0, sampai: akhir - 24 },
  ];
}

export const sebutMulai = (k: KegiatanLab): string => `pukul ${jam12Hari(k.jam24)} ${bagianHariHari(k.jam24)}`;

const Kap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function kalimatBandingHari(a: KegiatanLab, b: KegiatanLab): string {
  const r = bandingLama(a, b);
  if (r === "sama lama") return `${Kap(a.nama)} sama lama dengan ${b.nama}: sama-sama ${lamaTeks(a.menit)}.`;
  return `${Kap(a.nama)} ${r} dari ${b.nama}: ${lamaTeks(a.menit)} dan ${lamaTeks(b.menit)}.`;
}

export function kalimatHari(l: LabHari): string {
  if (l.pilih.length === 0) return "Ketuk satu atau dua kegiatan untuk melihat kapan dan berapa lamanya.";
  if (l.pilih.length === 1) {
    const k = kegiatanLab(l.pilih[0]);
    const s = selesaiJam(k);
    let t = `${Kap(k.nama)}: mulai ${sebutMulai(k)}, lamanya ${lamaTeks(k.menit)}.`;
    if (s !== null) t += ` Jarum pendek bergerak ${k.menit / 60} jam, sampai angka ${jam12Hari(s)}.`;
    return t;
  }
  const [a, b] = pasanganDipilih(l) as [KegiatanLab, KegiatanLab];
  return kalimatBandingHari(a, b);
}
