import type { AdeganStory } from "./logika-story";
import { E, W, digitBaris, emo, garisHitung, judul, kotak, labelBaris, lajurKolom, lantai, papanHitung, rumus, teks, tokoh } from "./k5b1d-gambar";
import { bersih, k, tambah } from "./k5b1d-bantu";

/*
 * Cerita orisinal IGIL "Hitungan Penonton Pak Darmo" (Kelas 5 Bab 1 Sub-Bab D), akhir cerita Hari Pertandingan di Stadion Kota.
 * Naskah suara dari naskah/story-naskah-k5b1d.md. Bagian ini: kali dengan memisah pengali (12 kotak air minum x 5.000), salah langkah Fajar (nol hilang) dengan taruhannya, dan kali bersusun sebagai pemeriksa.
 */
const HARGA = 5000;
const Y_H = 54;
const Y_B = 69;
const Y_A = 90;
const Y_S = 105;
const Y_T = 125;
/** Baris harga (5.000) dan banyak (x 12): label `${id}-l` dan angka `${id}-c{k}`. */
const BARIS_HARGA = [labelBaris("hg-l", Y_H + 3, "Harga 5.000"), ...digitBaris("hg", Y_H, HARGA), labelBaris("bn-l", Y_B + 3, "× 12"), ...digitBaris("bn", Y_B, 12)];

/* ------------------------------ 4. Pisah pengali ------------------------------ */
const SUARA_PISAH1 = "Pak Darmo membeli dua belas kotak air minum untuk pemain, lima ribu rupiah sebuah.";
const SUARA_PISAH2 = "Citra memisah pengalinya: sepuluh kali lima ribu sama dengan lima puluh ribu.";
const SUARA_PISAH3 = "Dua kali lima ribu sama dengan sepuluh ribu, dan keduanya dijumlahkan menjadi enam puluh ribu rupiah.";

export const ADEGAN_KALI_PISAH: AdeganStory = {
  id: "kali-pisah",
  judul: "Memisah pengali dua belas",
  sumber: "Materi: kali dengan memisah pengali",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_PISAH1,
      tambah(0, judul("Dua Belas Kotak Minuman"), ...lantai("lt", 150), ...tokoh("pd", 266, 184, "Pak Darmo")),
      tambah("dua", papanHitung(), ...lajurKolom(), labelBaris("bn-l", Y_B + 3, "× 12"), ...digitBaris("bn", Y_B, 12)),
      tambah("kotak", emo("kt", 268, 76, "\u{1F4E6}", 22)),
      tambah("lima", labelBaris("hg-l", Y_H + 3, "Harga 5.000"), ...digitBaris("hg", Y_H, HARGA), garisHitung("gh", 75)),
    ),
    k(
      SUARA_PISAH2,
      tambah("Citra", ...tokoh("ci", 222, 184, "Citra")),
      tambah("memisah", rumus("rm", "12 = 10 + 2", 139, 124, 9, W.krem)),
      tambah("sepuluh", labelBaris("ba-l", Y_S + 3, "10 × 5.000 = 50.000")),
      tambah("sama", ...digitBaris("ba", Y_S, 50000, { warna: W.oranye })),
    ),
    k(
      SUARA_PISAH3,
      tambah("Dua", labelBaris("bc-l", Y_A + 3, "2 × 5.000 = 10.000"), ...digitBaris("bc", Y_A, 10000, { warna: W.oranye })),
      tambah("dijumlahkan", garisHitung("g2", 111), labelBaris("bt-l", Y_T + 3, "Jumlah 60.000"), ...digitBaris("bt", Y_T, 60000, { warna: W.emas })),
      tambah("rupiah", emo("kl", 268, 100, E.kilau, 20)),
    ),
  ],
};

/* ------------------------------ 5. Salah langkah Fajar ------------------------------ */
const SUARA_SALAH1 = "Fajar menghitung dua belas kali lima ribu dengan cepat, dan hasilnya enam ribu.";
const SUARA_SALAH2 = "Ia hanya mengalikan dua belas dengan lima, lalu lupa menambahkan nol di belakangnya.";
const SUARA_SALAH3 = "Kalau aku salah, aku mengangkat semua kotak air minum sendirian, katanya sambil tertawa.";

export const ADEGAN_SALAH_KALI: AdeganStory = {
  id: "salah-kali",
  judul: "Fajar kehilangan satu nol",
  sumber: "Materi: salah langkah, nol hilang di belakang hasil",
  latar: "#FEF2F2",
  ketukan: [
    k(
      SUARA_SALAH1,
      tambah(0, judul("Fajar Menghitung Cepat"), ...lantai("lt", 150), papanHitung(), ...tokoh("fa", 266, 184, "Fajar")),
      tambah("dua", teks("f1", 124, 66, "12 × 5.000", 16, W.kapur, { z: 2 })),
      tambah("cepat", emo("sn", 268, 96, E.kilat, 20)),
      tambah("hasilnya", teks("f2", 124, 104, "= 6.000", 18, "#FCA5A5", { z: 2 }), emo("xs", 215, 106, E.salah, 18)),
    ),
    k(
      SUARA_SALAH2,
      tambah("mengalikan", teks("f3", 124, 128, "12 × 5 = 60", 12, W.emas, { z: 2 })),
      tambah("lupa", teks("f4", 124, 140, "lupa: 000", 8, W.kapurRedup, { z: 2 })),
      tambah("nol", teks("f5", 200, 128, "+ 000", 12, W.merah, { op: 0.6, z: 2 })),
    ),
    k(
      SUARA_SALAH3,
      tambah("Kalau", kotak("gb", 72, 152, 170, 36, W.putih, W.merah, { rx: 8, tebal: 2, z: 1 }), teks("g1", 157, 166, "Kalau salah, aku angkat", 8, W.merahTua, { z: 2 }), teks("g2", 157, 178, "semua kotak air minum!", 8, W.merahTua, { z: 2 })),
      tambah("kotak", emo("c1", 28, 172, "\u{1F4E6}", 18), emo("c2", 48, 172, "\u{1F4E6}", 18)),
      tambah("tertawa", emo("tw", 232, 150, "\u{1F602}", 16)),
    ),
  ],
};

/* ------------------------------ 6. Periksa dengan kali bersusun ------------------------------ */
const SUARA_PERIKSA1 = "Bima menyusun ke bawah: lima ribu dikali dua sama dengan sepuluh ribu, dikali sepuluh sama dengan lima puluh ribu.";
const SUARA_PERIKSA2 = "Jumlahnya enam puluh ribu, jadi hasil Fajar yang enam ribu kehilangan satu nol.";
const SUARA_PERIKSA3 = "Fajar mengangkat kotak sampai wajahnya merah, dan Pak Arif ikut membantu sambil tertawa.";

export const ADEGAN_PERIKSA_KALI: AdeganStory = {
  id: "periksa-kali",
  judul: "Kali bersusun memeriksa",
  sumber: "Materi: kali bersusun sebagai pemeriksa",
  latar: "#ECFEFF",
  ketukan: [
    k(
      SUARA_PERIKSA1,
      tambah(0, judul("Bima Menyusun ke Bawah"), ...lantai("lt", 150), ...tokoh("bi", 266, 184, "Bima")),
      tambah("menyusun", papanHitung(), ...lajurKolom(), ...BARIS_HARGA, garisHitung("gh", 75)),
      tambah("dua", labelBaris("bc-l", Y_A + 3, "× 2 = 10.000"), ...digitBaris("bc", Y_A, 10000, { warna: W.oranye })),
      tambah("dikali@2", labelBaris("ba-l", Y_S + 3, "× 10 = 50.000"), ...digitBaris("ba", Y_S, 50000, { warna: W.oranye })),
    ),
    k(
      SUARA_PERIKSA2,
      tambah("Jumlahnya", garisHitung("g2", 111), labelBaris("bt-l", Y_T + 3, "Jumlah 60.000"), ...digitBaris("bt", Y_T, 60000, { warna: W.emas })),
      tambah("Fajar", teks("fz", 268, 112, "6.000", 12, W.merah), emo("xs", 268, 94, E.salah, 18)),
      tambah("kehilangan", teks("hn", 268, 126, "hilang 1 nol", 7.5, W.merah)),
    ),
    k(
      SUARA_PERIKSA3,
      bersih(0),
      tambah(0, judul("Fajar Mengangkat Kotak"), ...lantai("lt", 150), ...Array.from({ length: 4 }, (_, i) => emo(`kb${i}`, 100 + i * 24, 124, "\u{1F4E6}", 20))),
      tambah("Fajar", ...tokoh("fa", 60, 184, "Fajar")),
      tambah("merah", emo("lp", 96, 150, E.lelah, 16), teks("ad", 140, 142, "berat!", 8, W.merah)),
      tambah("Pak", ...tokoh("pa", 220, 184, "Pak Arif")),
      tambah("tertawa", emo("tw", 252, 156, "\u{1F602}", 18)),
    ),
  ],
};
