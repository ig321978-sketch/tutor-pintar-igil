/**
 * Data Infografis Kelas 4 Bab 1 Sub-Bab A "Loket Tiket Bu Maya": DUA kartu, tiap kartu satu layar tanpa gulir, semuanya dari benda dan angka Story A.
 * Kartu 1 "Daftar tiket" = tiga tiket bersobekan (tiket pemenang pertama 3.406, tiket kedua 5.080, tulisan Satria 3.46); nomor tampak, dua sel (bacaan dan nol) tertutup.
 * Kartu 2 "Bagan tempat" = papan empat kotak untuk 3.406 dan 5.080; angka tampak, cara baca tiap tempat tertutup. Digital saja. Diuji: scripts/uji-tiket-k4b1a.mjs.
 */
import { kataBilK4B1 } from "../eja-k4b1";

/** Sel tertutup: `tampil` muncul setelah diketuk, `suara` dibacakan Guru (tanpa digit). */
export type SelInfo = { id: string; tampil: string; suara: string };

/** Bilangan Story A. */
export const TIKET_PERTAMA = 3406;
export const TIKET_KEDUA = 5080;
/** Tulisan Satria yang keliru: nol di puluhan hilang. */
export const TULISAN_SALAH = "3.46";

export type BarisTiket = { id: string; judul: string; nomor: string; salah: boolean; bacaan: SelInfo; nol: SelInfo };

export const TIKET_INFO: readonly BarisTiket[] = [
  {
    id: "t1",
    judul: "Pemenang pertama",
    nomor: "3.406",
    salah: false,
    bacaan: { id: "t1-baca", tampil: kataBilK4B1(TIKET_PERTAMA), suara: `Tiket pemenang pertama dibaca ${kataBilK4B1(TIKET_PERTAMA)}.` },
    nol: { id: "t1-nol", tampil: "nol di puluhan", suara: "Puluhan berisi nol. Nol tidak dibaca, tetapi menjaga tempat." },
  },
  {
    id: "t2",
    judul: "Pemenang kedua",
    nomor: "5.080",
    salah: false,
    bacaan: { id: "t2-baca", tampil: kataBilK4B1(TIKET_KEDUA), suara: `Tiket kedua dibaca ${kataBilK4B1(TIKET_KEDUA)}.` },
    nol: { id: "t2-nol", tampil: "nol di ratusan dan satuan", suara: "Ratusan dan satuan berisi nol. Keduanya tidak dibaca, tetapi tempatnya tetap dihitung." },
  },
  {
    id: "t3",
    judul: "Tulisan Satria",
    nomor: TULISAN_SALAH,
    salah: true,
    bacaan: { id: "t3-baca", tampil: "hanya tiga angka", suara: "Tulisan Satria hanya tiga angka, padahal bilangan ribuan harus empat angka." },
    nol: { id: "t3-nol", tampil: "nol puluhan hilang", suara: "Nol di puluhan hilang. Harusnya ditulis tiga ribu empat ratus enam dengan nol di puluhan." },
  },
];

/** Kartu 2: tempat dan warna kotak (sama dengan kartu angka di Mind-map). */
export const TEMPAT_BAGAN = ["ribuan", "ratusan", "puluhan", "satuan"] as const;
export const WARNA_TEMPAT = ["#2563EB", "#EA580C", "#16A34A", "#DC2626"] as const;

export type KolomBagan = { tempat: (typeof TEMPAT_BAGAN)[number]; angka: number; baca: SelInfo };
export type BaganInfo = { id: string; judul: string; bilangan: number; kolom: readonly KolomBagan[] };

/** Cara baca satu tempat: angka nol tidak dibaca; angka lain disebut dengan nama tempatnya. */
export function caraBaca(tempat: (typeof TEMPAT_BAGAN)[number], angka: number): string {
  if (angka === 0) return "nol tidak dibaca";
  const k = kataBilK4B1(angka);
  if (tempat === "ribuan") return angka === 1 ? "seribu" : `${k} ribu`;
  if (tempat === "ratusan") return angka === 1 ? "seratus" : `${k} ratus`;
  if (tempat === "puluhan") return angka === 1 ? "sepuluh" : `${k} puluh`;
  return k;
}

function susunBagan(id: string, judul: string, bilangan: number): BaganInfo {
  const d = String(bilangan).padStart(4, "0").split("").map(Number);
  return {
    id,
    judul,
    bilangan,
    kolom: TEMPAT_BAGAN.map((tempat, i) => ({
      tempat,
      angka: d[i],
      baca: { id: `${id}-${i}`, tampil: caraBaca(tempat, d[i]), suara: d[i] === 0 ? `Angka nol di ${tempat}. Nol tidak dibaca, tetapi tempatnya tetap dihitung.` : `Angka ${kataBilK4B1(d[i])} di ${tempat} dibaca ${caraBaca(tempat, d[i])}.` },
    })),
  };
}

export const BAGAN_INFO: readonly BaganInfo[] = [susunBagan("b1", "Tiket pertama", TIKET_PERTAMA), susunBagan("b2", "Tiket kedua", TIKET_KEDUA)];

export const ACUAN_BAGAN = "Baca dari kiri. Nol tidak dibaca, tetapi tempatnya tetap dihitung.";

export const JUDUL_KARTU1_TIKET = "Daftar tiket Bu Maya";
export const JUDUL_KARTU2_TIKET = "Papan empat tempat";
export const PETUNJUK1_INFO_TIKET = "Ketuk tanda tanya untuk melihat cara baca dan nolnya.";
export const PETUNJUK2_INFO_TIKET = "Ketuk tanda tanya untuk melihat cara baca tiap angka.";
export const SELESAI1_INFO_TIKET = "Daftar tiket lengkap! Tekan BERIKUTNYA.";
export const SELESAI2_INFO_TIKET = "Papan lengkap! Kamu sudah bisa membaca bilangan dengan nol.";

/** Bilangan dengan titik ribuan (3.406). */
export const titik = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
