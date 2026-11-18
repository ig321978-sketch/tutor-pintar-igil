/**
 * Misi dan tantangan bebas Kelas 2 Bab 5 (Pecahan, tema Kebun Sekolah). Murni: tanpa React, tanpa jaringan.
 * Diuji di scripts/uji-lab-kelas2.mjs.
 *
 * Sub-Bab A memakai Simulasi Meja Bagi (semangka-k2b5a), Sub-Bab B Bedeng Bibit (bibit-k2b5b), Sub-Bab C (akhir bab) Meja Panen (panen-k2b5c).
 * KERANGKA: agen tiap Sub-Bab mengganti MISI_A / MISI_B / MISI_C dan menambah tipe keadaannya ke union KeadaanK2Bab5.
 */

// Hanya impor tipe: berkas ini diuji langsung di Node (tanpa pemaket), jadi tidak boleh mengimpor nilai dari berkas lain.
import type { DefMisi } from "./misi-simulasi";

import type { KeadaanSemangka } from "./semangka-k2b5a/logika";
import type { KeadaanBibit } from "./bibit-k2b5b/logika";
import type { KeadaanPanen } from "./panen-k2b5c/logika";

export type KeadaanK2Bab5 = { alat: "kerangka" } | KeadaanSemangka | KeadaanBibit | KeadaanPanen;

/**
 * Sub-Bab A (awal cerita Kebun Sekolah): Misi Meja Bagi, Simulasi Meja Bagi (semangka-k2b5a). Benda yang dibelah (jeruk bali, keju, sosis, nasi kepal),
 * kertas lipat (persegi panjang, segitiga, lingkaran), dan dua gelas susu berbeda dari Story. Diuji di scripts/uji-semangka-k2b5a.mjs.
 */
const semangka = (k: KeadaanK2Bab5): k is KeadaanSemangka => k.alat === "semangka";
export const MISI_A: DefMisi<KeadaanK2Bab5>[] = [
  { id: "a-belah", teks: "Belah satu benda tepat di tengah sampai menjadi dua bagian sama besar.", wajib: true, cek: (k) => semangka(k) && k.dibelah.length >= 1 },
  { id: "a-tumpuk", teks: "Tumpuk dua bagian dari benda yang sudah dibelah, lalu lihat apakah keduanya pas.", wajib: true, cek: (k) => semangka(k) && k.ditumpuk.length >= 1 },
  { id: "a-tuang", teks: "Tuang susu dari gelas penuh sampai kedua gelas sama tinggi.", wajib: true, cek: (k) => semangka(k) && k.tuangBenar.length >= 1 },
  { id: "a-lipat", teks: "Lipat satu kertas sampai kedua sisinya saling menutup dengan pas.", wajib: true, cek: (k) => semangka(k) && k.lipatBenar.length >= 1 },
  { id: "a-belahdua", teks: "Belah dua benda yang bentuknya berbeda sampai bagiannya sama besar.", wajib: false, cek: (k) => semangka(k) && k.dibelah.length >= 2 },
  { id: "a-lipatdua", teks: "Temukan dua cara melipat yang berbeda sampai keduanya pas.", wajib: false, cek: (k) => semangka(k) && k.lipatBenar.length >= 2 },
];

/**
 * Sub-Bab B (tengah cerita): Misi Bedeng Bibit, Simulasi Bedeng Bibit (bibit-k2b5b). Tumpukan jagung, wortel, terong, apel, bunga, empat paket neraca,
 * dan setengah dua sampai lima berbeda dari Story. Diuji di scripts/uji-bibit-k2b5b.mjs.
 */
const bibit = (k: KeadaanK2Bab5): k is KeadaanBibit => k.alat === "bibit";
export const MISI_B: DefMisi<KeadaanK2Bab5>[] = [
  { id: "b-bagi", teks: "Bagikan satu tumpukan benda satu-satu ke dua petak sampai habis dan sama banyak.", wajib: true, cek: (k) => bibit(k) && k.terbagi.length >= 1 },
  { id: "b-ganjil", teks: "Bagikan satu tumpukan ganjil, lalu lihat benda yang tersisa tanpa pasangan.", wajib: true, cek: (k) => bibit(k) && k.ganjilSelesai.length >= 1 },
  { id: "b-neraca", teks: "Seimbangkan satu neraca dengan memindahkan benda dari piringan yang lebih banyak.", wajib: true, cek: (k) => bibit(k) && k.neracaSet.length >= 1 },
  { id: "b-gandakan", teks: "Gandakan satu tumpukan setengah, lalu lihat banyak seluruhnya.", wajib: true, cek: (k) => bibit(k) && k.digandakan.length >= 1 },
  { id: "b-semua", teks: "Bagikan tiga tumpukan yang berbeda sampai habis dan sama banyak.", wajib: false, cek: (k) => bibit(k) && k.terbagi.length >= 3 },
  { id: "b-dua", teks: "Seimbangkan dua neraca yang isinya berbeda.", wajib: false, cek: (k) => bibit(k) && k.neracaSet.length >= 2 },
];

/** Sub-Bab C (akhir bab, pencapaian misi bab ini): Misi Meja Panen. KERANGKA kosong. */
const panen = (k: KeadaanK2Bab5): k is KeadaanPanen => k.alat === "panen";
export const MISI_C: DefMisi<KeadaanK2Bab5>[] = [
  { id: "c-pai", teks: "Bagi pai apel dengan dua garis sampai terbentuk empat bagian sama besar.", wajib: true, cek: (k) => panen(k) && k.paiSeperempat >= 1 },
  { id: "c-miring", teks: "Coba dua garis yang tidak tegak lurus pada pai, lalu lihat bagian-bagiannya.", wajib: true, cek: (k) => panen(k) && k.paiTidakSama >= 1 },
  { id: "c-kain", teks: "Bagi kain taplak dengan dua garis sampai terbentuk empat bagian sama besar.", wajib: true, cek: (k) => panen(k) && k.kainSeperempat >= 1 },
  { id: "c-pita", teks: "Susun dua pita seperempat sampai sama panjang dengan satu pita setengah.", wajib: true, cek: (k) => panen(k) && k.bukti.includes("2s=1t") },
  { id: "c-utuh", teks: "Susun empat pita seperempat sampai sama panjang dengan satu pita utuh.", wajib: false, cek: (k) => panen(k) && k.bukti.includes("4s=1u") },
  { id: "c-segitiga", teks: "Bagi kain taplak dengan dua garis miring sampai terbentuk empat segitiga sama besar.", wajib: false, cek: (k) => panen(k) && k.kainSegitiga >= 1 },
];

export const daftarMisiK2Bab5 = (sub: string): DefMisi<KeadaanK2Bab5>[] => (sub === "B" ? MISI_B : sub === "C" ? MISI_C : MISI_A);
