import type { AdeganStory } from "./logika-story";
import { OWL, W, emo, garisLompat, judul, kartu, latarSusunan, namaBaris, namaKolom, barisSusunan, rumus, teks } from "./k3b1F-gambar";
import { bersih, hapus, idPilihan, idx, k, pilihKata, redamkan, sorotkan, tambah } from "./k3b1F-bantu";
import { NAMA_METODE_ID, WARNA_METODE, kepala } from "./k3b1F-luar-1";

/* ------------------------------ 4. Susunan Baris Kolom: konsep ------------------------------ */
const SUARA_S1 = "Metode kedua bernama Susunan Baris Kolom. Benda disusun rapi dalam baris dan kolom.";
const SUARA_S2 = "Lihat susunan bunga ini. Ada tiga baris, dan tiap baris berisi empat bunga.";
const SUARA_S3 = "Banyak baris dikali banyak kolom sama dengan jumlah benda. Jadi tiga kali empat sama dengan dua belas.";
const SUARA_S4 = "Setiap baris berisi empat bunga. Empat tambah empat tambah empat sama dengan dua belas.";
const SUARA_S5 = "Itulah metode Susunan Baris Kolom. Baris dikali kolom sama dengan jumlah semuanya.";

export const ADEGAN_LUAR_SUSUNAN: AdeganStory = {
  id: "luar-susunan",
  judul: "Susunan Baris Kolom: baris dikali kolom",
  sumber: "Metode luar: Susunan Baris Kolom",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_S1, tambah(0, ...kepala(1)), tambah(idx(SUARA_S1, "disusun"), emo("tp", 150, 112, "\u{1F33C}", 44))),
    k(
      SUARA_S2,
      hapus(0, "tp"),
      tambah(idx(SUARA_S2, "Lihat"), latarSusunan(3, 4)),
      tambah(idx(SUARA_S2, "susunan"), ...barisSusunan(0, 3, 4, "bunga")),
      tambah(idx(SUARA_S2, "tiga"), ...barisSusunan(1, 3, 4, "bunga")),
      tambah(idx(SUARA_S2, "baris"), ...barisSusunan(2, 3, 4, "bunga")),
      tambah(idx(SUARA_S2, "berisi"), namaBaris(3, 4)),
    ),
    k(SUARA_S3, tambah(idx(SUARA_S3, "kolom"), namaKolom(3, 4)), tambah(idx(SUARA_S3, "Jadi"), rumus("eq", 188, "3 × 4 = 12"))),
    k(SUARA_S4, tambah(idx(SUARA_S4, "sama"), rumus("ps", 166, "4 + 4 + 4 = 12", 12, W.ungu))),
    k(SUARA_S5, hapus(0, "ps"), tambah(idx(SUARA_S5, "Itulah"), ...kartu("sk", 30, 152, 240, 24, W.emas, ["Susunan Baris Kolom: baris × kolom"], 10))),
  ],
};

/* ------------------------------ 5. Susunan Baris Kolom: terapan ------------------------------ */
const SUARA_T1 = "Terapkan pada soal ini. Wei menyusun mobil mainan dalam tiga baris. Tiap baris berisi enam mobil.";
const SUARA_T2 = "Berapa mobil semuanya? Ketuk jawaban yang tepat.";
const SUARA_T3 = "Betul! Tiga kali enam sama dengan delapan belas.";
const SUARA_T4 = "Dengan Susunan Baris Kolom, tiga baris dan enam kolom, hasilnya delapan belas mobil.";

export const ADEGAN_LUAR_SUSUNAN_TERAPAN: AdeganStory = {
  id: "luar-susunan-terapan",
  judul: "Susunan Baris Kolom: mobil Wei",
  sumber: "Metode luar: Susunan Baris Kolom",
  latar: "#DBEAFE",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, ...kepala(1), latarSusunan(3, 6)),
      tambah(idx(SUARA_T1, "menyusun"), ...barisSusunan(0, 3, 6, "mobil")),
      tambah(idx(SUARA_T1, "tiga"), ...barisSusunan(1, 3, 6, "mobil")),
      tambah(idx(SUARA_T1, "baris."), ...barisSusunan(2, 3, 6, "mobil")),
      tambah(idx(SUARA_T1, "berisi"), namaBaris(3, 6)),
    ),
    k(SUARA_T2, tambah(idx(SUARA_T2, "Berapa"), teks("tanya", 150, 152, "berapa semuanya?", 12, W.ungu)), tambah(idx(SUARA_T2, "jawaban"), ...pilihKata(158, ["18", "21", "24"], 16))),
    k(SUARA_T3, sorotkan(idx(SUARA_T3, "Betul!"), "c1-k"), tambah(idx(SUARA_T3, "Tiga"), rumus("eq", 198, "3 × 6 = 18", 11))),
    k(SUARA_T4, redamkan(0, "c1-k"), hapus(0, "tanya", ...idPilihan(3)), tambah(idx(SUARA_T4, "kolom,"), namaKolom(3, 6)), tambah(idx(SUARA_T4, "hasilnya"), rumus("eq", 176, "3 × 6 = 18"))),
  ],
};

/* ------------------------------ 6. Lompat Hitung: konsep ------------------------------ */
const GL1 = garisLompat(2, 5, 120);
const SUARA_L1 = "Metode ketiga bernama Lompat Hitung. Kita melompat di garis bilangan, dua langkah demi dua langkah.";
const SUARA_L2 = "Mulai dari nol. Lompatan pertama sebesar dua, mendarat di dua.";
const SUARA_L3 = "Lompat lagi sebesar dua, mendarat di empat. Lompat lagi, mendarat di enam.";
const SUARA_L4 = "Hitungannya dua, empat, enam, delapan, sepuluh. Setelah lima lompatan, kita mendarat di sepuluh.";
const SUARA_L5 = "Jadi lima kali dua sama dengan sepuluh. Itulah metode Lompat Hitung, cocok untuk kali dua.";

export const ADEGAN_LUAR_LOMPAT: AdeganStory = {
  id: "luar-lompat",
  judul: "Lompat Hitung: kali dua",
  sumber: "Metode luar: Lompat Hitung",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_L1, tambah(0, ...kepala(2)), tambah(idx(SUARA_L1, "melompat"), emo("fg", 150, 102, "\u{1F438}", 46))),
    k(SUARA_L2, hapus(0, "fg"), tambah(idx(SUARA_L2, "Mulai"), ...GL1.kerangka()), tambah(idx(SUARA_L2, "Lompatan"), ...GL1.lompat(1)), tambah(idx(SUARA_L2, "mendarat"), ...GL1.tanda(1))),
    k(SUARA_L3, tambah(idx(SUARA_L3, "Lompat"), ...GL1.lompat(2)), tambah(idx(SUARA_L3, "empat."), ...GL1.tanda(2)), tambah(idx(SUARA_L3, "lagi", 2), ...GL1.lompat(3)), tambah(idx(SUARA_L3, "enam."), ...GL1.tanda(3))),
    k(SUARA_L4, tambah(idx(SUARA_L4, "delapan,"), ...GL1.lompat(4), ...GL1.tanda(4)), tambah(idx(SUARA_L4, "sepuluh."), ...GL1.lompat(5), ...GL1.tanda(5))),
    k(SUARA_L5, tambah(idx(SUARA_L5, "Jadi"), rumus("eq", 176, "5 × 2 = 10"))),
  ],
};

/* ------------------------------ 7. Lompat Hitung: terapan ------------------------------ */
const GL2 = garisLompat(5, 6, 120);
const SUARA_P1 = "Terapkan pada soal ini. Kira melompat sebesar lima, sebanyak enam lompatan, mulai dari nol.";
const SUARA_P2 = "Di mana Kira mendarat? Ketuk jawaban yang tepat.";
const SUARA_P3 = "Betul! Enam lompatan sebesar lima mendarat di tiga puluh.";
const SUARA_P4 = "Jadi enam kali lima sama dengan tiga puluh, sama seperti hasil tadi.";

export const ADEGAN_LUAR_LOMPAT_TERAPAN: AdeganStory = {
  id: "luar-lompat-terapan",
  judul: "Lompat Hitung: lompatan Kira",
  sumber: "Metode luar: Lompat Hitung",
  latar: "#FCE7F3",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, ...kepala(2)),
      tambah(idx(SUARA_P1, "Kira"), ...GL2.kerangka()),
      tambah(idx(SUARA_P1, "sebesar"), ...[1, 2, 3].flatMap((q) => [...GL2.lompat(q), ...GL2.tanda(q)])),
      tambah(idx(SUARA_P1, "enam"), ...[4, 5].flatMap((q) => [...GL2.lompat(q), ...GL2.tanda(q)]), ...GL2.lompat(6)),
    ),
    k(SUARA_P2, tambah(idx(SUARA_P2, "Di"), teks("tanya", 150, 156, "mendarat di mana?", 12, W.ungu)), tambah(idx(SUARA_P2, "jawaban"), ...pilihKata(162, ["25", "30", "35"], 16))),
    k(SUARA_P3, sorotkan(idx(SUARA_P3, "Betul!"), "c2-k"), tambah(idx(SUARA_P3, "tiga"), ...GL2.tanda(6))),
    k(SUARA_P4, redamkan(0, "c2-k"), hapus(0, "tanya", ...idPilihan(3)), tambah(idx(SUARA_P4, "Jadi"), rumus("eq", 176, "6 × 5 = 30"))),
  ],
};

/* ------------------------------ 8. Ringkasan metode luar ------------------------------ */
const SUARA_Y1 = "Mari kita ringkas tiga metode dari luar. Semuanya membantu kita menghitung benda yang sama banyak.";
const SUARA_Y2 = "Metode Kelompok Sama, menjumlahkan isi tiap kelompok berulang kali.";
const SUARA_Y3 = "Metode Susunan Baris Kolom, benda disusun dalam baris dan kolom, lalu baris dikali kolom.";
const SUARA_Y4 = "Metode Lompat Hitung, melompat di garis bilangan dengan langkah yang sama.";
const SUARA_Y5 = "Pilih metode yang kamu suka, lalu periksa dengan metode lain. Hasilnya harus sama.";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Metode luar: ringkasan",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Y1, tambah(0, judul("Ringkasan")), tambah(idx(SUARA_Y1, "ringkas"), ...kartu("r0", 14, 34, 272, 30, W.emas, ["3 metode dari luar"], 11))),
    k(SUARA_Y2, tambah(idx(SUARA_Y2, "Kelompok"), ...kartu("r1", 14, 72, 272, 34, WARNA_METODE[0], [NAMA_METODE_ID[0], "jumlah berulang isi tiap kelompok"], 9.2))),
    k(SUARA_Y3, tambah(idx(SUARA_Y3, "Susunan"), ...kartu("r2", 14, 114, 272, 34, WARNA_METODE[1], [NAMA_METODE_ID[1], "baris dikali kolom"], 9.2))),
    k(SUARA_Y4, tambah(idx(SUARA_Y4, "Lompat"), ...kartu("r3", 14, 156, 272, 34, WARNA_METODE[2], [NAMA_METODE_ID[2], "lompat dengan langkah sama"], 9.2))),
    k(SUARA_Y5, bersih(0), tambah(0, judul("Hasilnya harus sama"), emo("rw", 150, 100, OWL, 54)), tambah(idx(SUARA_Y5, "sama."), emo("rk", 150, 160, "✅", 30))),
  ],
};
