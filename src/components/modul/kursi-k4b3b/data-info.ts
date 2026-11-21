/**
 * Data Infografis Kelas 4 Bab 3 Sub-Bab B "Barisan Kursi Pak Gunawan": DUA kartu, tiap kartu satu layar tanpa gulir, semuanya dari benda dan angka Story B.
 * Kartu 1 "Daftar baris kursi" = lima baris kursi digambar sebanyak datanya (dua belas sampai dua puluh empat), tiap baris punya banyak kursi tertutup
 * dan antara dua baris ada loncatan beda tertutup (tambah tiga), semua diketuk dan dibacakan.
 * Kartu 2 "Papan nomor dan aturan" = nomor tampil empat puluh, tiga puluh lima, tiga puluh dengan loncatan kurang lima (nomor berikutnya tertutup) dan lima kotak aturan tertutup
 * (beda, membesar, mengecil, bilangan pada baris kelima lewat empat lompatan, berhenti di nol). Digital saja: suara dan kanvas hanya di CPA.
 * Sambungan dari Mind-map lewat Story. Diuji: scripts/uji-kursi-k4b3b.mjs.
 */
import { ejaK4B3, kataUrutanK4B3 } from "../eja-k4b3";
import { BANYAK_BARIS, BEDA_KURSI, BEDA_NOMOR, KURANG_TEKS, KURSI_BARIS, NOMOR_PAPAN, TAMBAH_TEKS } from "./data-peta";

const hurufBesar = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);
const u = (t: string): string => hurufBesar(ejaK4B3(t));

export type Sel = { teks: string; suara: string };

/** Kartu 1: banyak kursi tiap baris (lima sel) dan loncatan beda antara dua baris (empat sel). */
export const SEL_KURSI: Sel[] = KURSI_BARIS.map((n, i) => ({ teks: `${n}`, suara: u(`Baris ${kataUrutanK4B3(i + 1)} berisi ${n} kursi.`) }));
export const SEL_LONCAT: Sel[] = KURSI_BARIS.slice(1).map((n, i) => ({
  teks: TAMBAH_TEKS,
  suara: u(`Dari baris ${kataUrutanK4B3(i + 1)} ke baris ${kataUrutanK4B3(i + 2)}, ${KURSI_BARIS[i]} menjadi ${n}. Bertambah ${BEDA_KURSI}.`),
}));

/** Kartu 2: nomor tampil berikutnya (tertutup) dan lima kotak aturan. */
export const NOMOR_BERIKUT = NOMOR_PAPAN[NOMOR_PAPAN.length - 1] - BEDA_NOMOR;
export const SEL_NOMOR: Sel = { teks: `${NOMOR_BERIKUT}`, suara: u(`Nomor berikutnya ${NOMOR_BERIKUT}, karena ${NOMOR_PAPAN[NOMOR_PAPAN.length - 1]} dikurangi ${BEDA_NOMOR}.`) };

export type KotakAturan = { id: string; label: string; isi: string; suara: string };
export const KOTAK_ATURAN: KotakAturan[] = [
  { id: "beda", label: "Beda", isi: "selisih, harus sama", suara: u("Beda adalah selisih dua bilangan yang berurutan, dan harus sama di setiap pasangan.") },
  { id: "besar", label: "Membesar", isi: "beda tambah", suara: u("Kalau bedanya tambah, bilangan makin besar. Itu pola membesar.") },
  { id: "kecil", label: "Mengecil", isi: "beda kurang", suara: u(`Kalau bedanya kurang, bilangan makin kecil. Itu pola mengecil, seperti nomor tampil ${KURANG_TEKS}.`) },
  {
    id: "kelima",
    label: "Baris kelima",
    isi: `${KURSI_BARIS[0]} + ${BEDA_KURSI} × ${BANYAK_BARIS - 1} = ${KURSI_BARIS[BANYAK_BARIS - 1]}`,
    suara: u(`Baris kelima punya ${BANYAK_BARIS - 1} lompatan, satu kurang dari nomor barisnya. ${KURSI_BARIS[0]} ditambah ${BEDA_KURSI} sebanyak ${BANYAK_BARIS - 1} kali sama dengan ${KURSI_BARIS[BANYAK_BARIS - 1]}.`),
  },
  { id: "nol", label: "Batas kecil", isi: "berhenti di nol", suara: u("Pola mengecil boleh terus dikurangi selama bilangannya belum habis, dan berhenti di nol.") },
];

export const PETUNJUK_INFO_1 = "Daftar baris kursi. Ketuk kotak tanda tanya untuk melihat banyak kursi tiap baris dan loncatan di antara dua baris.";
export const PETUNJUK_INFO_2 = "Papan nomor dan aturan. Ketuk kotak tanda tanya untuk melihat nomor berikutnya dan aturan pola bilangan.";
export const SELESAI_INFO_1 = "Daftar baris kursi lengkap! Tiap loncatan sama besar.";
export const SELESAI_INFO_2 = "Papan nomor dan aturan lengkap!";
export const PESAN_INFO_2 = "Ketuk semua kotak tanda tanya untuk melanjutkan.";
