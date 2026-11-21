/**
 * Data Infografis (label kosong, papan hitung panitia) Kelas 5 Bab 1 Sub-Bab D "Hitungan Penonton Pak Darmo": DUA kartu, tiap kartu satu layar tanpa gulir.
 * Data bersambung dari Sub-Bab A sampai C (penonton empat tribun Stadion Kota, satuan orang): Utara 24.350, Selatan 18.705, Timur 9.060, Barat 30.402; kursi stadion 90.000.
 * Kartu 1 = jumlah bersusun keempat tribun (simpanan di ratusan, ribuan, puluh ribuan; jumlah 82.517) dan kurang bersusun kursi kosong (pinjaman bergulir melewati nol; selisih 7.483).
 * Kartu 2 = kali 12 x 5.000 (pisah pengali 10 dan 2, kali bersusun, jumlah 60.000), bagi 64.000 : 4 = 16.000 per kolom, dan cek dengan operasi kebalikan (16.000 x 4 = 64.000; 7.483 + 82.517 = 90.000).
 * Semua isi dan hitungan dari logika-data.ts. Digital saja: suara dan kanvas hanya di CPA. Diuji: scripts/uji-hitung-k5b1d.mjs.
 */
import { ucapkan } from "./logika-cpa";
import { NAMA_KOLOM, bagiKolom, balikCek, fmt, kaliBersusun, kaliPisah, susunJumlah, susunKurang } from "./logika-data";

/** Ucapan tanpa digit yang diawali huruf kapital. */
const ucap = (t: string): string => {
  const u = ucapkan(t);
  return u.charAt(0).toUpperCase() + u.slice(1);
};

export type Tribun = { nama: string; penonton: number };
/** Data bersambung (kontrak data bab): empat tribun, urut seperti di Story Sub-Bab D. */
export const TRIBUN: Tribun[] = [
  { nama: "Utara", penonton: 24350 },
  { nama: "Selatan", penonton: 18705 },
  { nama: "Timur", penonton: 9060 },
  { nama: "Barat", penonton: 30402 },
];
export const KURSI_STADION = 90000;
export const BILANGAN_TRIBUN: number[] = TRIBUN.map((t) => t.penonton);
export const SUSUN_JUMLAH = susunJumlah(BILANGAN_TRIBUN);
export const JUMLAH_PENONTON = SUSUN_JUMLAH.hasil;
export const SUSUN_KURANG = susunKurang(KURSI_STADION, JUMLAH_PENONTON);
export const KURSI_KOSONG = SUSUN_KURANG.hasil;
export const CEK_KURSI = balikCek("kurang", KURSI_STADION, JUMLAH_PENONTON);
/** Angka atas tiap kolom setelah meminjam (satuan sampai puluh ribuan). */
export const ATAS_SETELAH: number[] = SUSUN_KURANG.kolom.map((c) => c.atasSetelah);

/** Kolom simpanan yang diketuk pada kartu 1: simpanan dari kolom k masuk ke kolom k + 1. */
export type SelSimpan = { kolom: number; isi: number; suara: string };
export const SEL_SIMPAN: SelSimpan[] = SUSUN_JUMLAH.kolom
  .filter((c) => c.simpan > 0)
  .map((c) => ({
    kolom: c.k + 1,
    isi: c.simpan,
    suara: ucap(`Kolom ${NAMA_KOLOM[c.k]} berjumlah ${c.jumlah}, jadi tulis ${c.tulis} dan simpan ${c.simpan} ke kolom ${NAMA_KOLOM[c.k + 1]}.`),
  }));
export const SUARA_JUMLAH = ucap(`Kolom puluh ribuan berjumlah ${SUSUN_JUMLAH.kolom[4].jumlah}. Jumlah semua penonton adalah ${fmt(JUMLAH_PENONTON)} orang.`);
export const SUARA_PINJAM = ucap(`Kolom satuan meminjam dari kolom puluh ribuan karena kolom nol di antaranya tidak bisa memberi. Kolom puluh ribuan menjadi ${ATAS_SETELAH[4]}, kolom di tengah menjadi ${ATAS_SETELAH[3]}, dan kolom satuan menjadi ${ATAS_SETELAH[0]}.`);
export const SUARA_KOSONG = ucap(`${fmt(KURSI_STADION)} − ${fmt(JUMLAH_PENONTON)} = ${fmt(KURSI_KOSONG)}. Ada ${fmt(KURSI_KOSONG)} kursi kosong.`);

/** Kartu 2: kali 12 x 5.000 (12 kotak air minum, lima ribu rupiah sebuah). */
export const HARGA_KOTAK = 5000;
export const BANYAK_KOTAK = 12;
export const KALI_PISAH = kaliPisah(HARGA_KOTAK, BANYAK_KOTAK);
export const KALI_SUSUN = kaliBersusun(HARGA_KOTAK, BANYAK_KOTAK);
export const TOTAL_KOTAK = KALI_PISAH.total;
/** Baris kali bersusun: hasil kali dengan angka satuan pengali (dua), lalu angka puluhan pengali (satu) yang bergeser satu kolom. */
export const BARIS_KALI = KALI_SUSUN.baris;
export const SUARA_PISAH = ucap(`${BANYAK_KOTAK} dipisah menjadi ${KALI_PISAH.bagian.map((b) => b.pengali).join(" dan ")}. ${KALI_PISAH.bagian.map((b) => `${b.pengali} × ${fmt(HARGA_KOTAK)} = ${fmt(b.hasil)}`).join(", ")}.`);
export const SUARA_BARIS = BARIS_KALI.map((b) => ucap(`Dikali ${b.angka}${b.geser ? ", digeser satu kolom ke kiri" : ""}: ${fmt(b.hasil)}.`));
export const SUARA_TOTAL_KALI = ucap(`Kedua baris dijumlahkan: ${BARIS_KALI.map((b) => fmt(b.hasil)).join(" + ")} = ${fmt(TOTAL_KOTAK)} rupiah.`);
/** Bagi 64.000 : 4 per kolom. */
export const KAS = 64000;
export const PEMBAGI = 4;
export const BAGI = bagiKolom(KAS, PEMBAGI);
export const TIAP_TRIBUN = BAGI.hasil;
export const SUARA_BAGI = ucap(`${fmt(KAS)} : ${PEMBAGI} dibagi per kolom dari kiri: ${BAGI.langkah
  .filter((l) => l.angka > 0)
  .map((l) => `${l.angka} : ${PEMBAGI} = ${l.q}`)
  .join(", ")}. Hasilnya ${fmt(TIAP_TRIBUN)} rupiah.`);
export const CEK_BAGI = balikCek("bagi", KAS, PEMBAGI);
export const SUARA_CEK = ucap(`Cek dengan kebalikannya: ${fmt(TIAP_TRIBUN)} × ${PEMBAGI} = ${fmt(CEK_BAGI.kembali)}. Dan ${fmt(KURSI_KOSONG)} + ${fmt(JUMLAH_PENONTON)} = ${fmt(CEK_KURSI.kembali)}, tepat sama dengan banyak kursi stadion.`);

export const JUDUL_INFO_1 = "Jumlah dan Kurang";
export const JUDUL_INFO_2 = "Kali, Bagi, Cek";
export const PETUNJUK_INFO_1 = "Lembar hitung penonton. Ketuk tanda tanya untuk melihat simpanan, jumlah, pinjaman, dan selisihnya.";
export const PETUNJUK_INFO_2 = "Lembar hitung kotak air minum dan uang kas. Ketuk tanda tanya untuk melihat pisah pengali, kali bersusun, bagi, dan cek.";
export const SELESAI_INFO_1 = "Lembar lengkap! Jumlah dan selisih sudah terbuka.";
export const SELESAI_INFO_2 = "Lembar lengkap! Hasil kali dan bagi saling kembali.";
