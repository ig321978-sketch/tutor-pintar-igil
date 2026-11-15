import type { AdeganStory, Obj } from "./logika-story";
import { EMO_BALON, EMO_JERUK, EMO_MERAH, OWL, W, angkaKotak, benda, bendaDi, emo, jumlahG, kartu, kartuAngka, kotak, kotakSepuluh, judul, letakKotak, namaG, pusatBenda, teks, titikGrid, titikKotak, titikPetak, type Kotak10 } from "./k2b1A-gambar";
import { bersih, hapus, hitungAksi, idx, isiAksi, k, pilihKata, redamkan, sorotkan, tambah, urutBilangan, urutNilai } from "./k2b1A-bantu";

export const NAMA_METODE_ID = ["Bingkai Sepuluh", "Hitung Sepuluh-Sepuluh", "Garis Bilangan"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`Metode ${i + 1}: ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara mengajarkan cara menghitung yang berbeda-beda. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Tiga metode itu bernama Bingkai Sepuluh, Hitung Sepuluh-Sepuluh, dan Garis Bilangan.";
const SUARA_O3 = "Semua metode ini menjawab satu pertanyaan. Berapa banyak bendanya, dan bagaimana cara menghitung dengan cepat?";
const SUARA_O4 = "Kita memakai benda bergambar di layar. Kamu cukup mengetuk dan melihat dengan teliti.";
const SUARA_O5 = "Semua contoh memakai paling banyak lima puluh benda. Siap? Ayo kita mulai dengan metode pertama.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk menghitung",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Tiga metode dari luar")), tambah("negara", emo("gl", 150, 110, "\u{1F30D}", 50)), tambah("tiga", ...kartu("pk", 50, 140, 200, 32, W.emas, ["3 metode dari luar"], 11))),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga metode")),
      tambah(idx(SUARA_O2, "Bingkai"), ...kartu("m0", 20, 40, 260, 38, WARNA_METODE[0], [`1. ${NAMA_METODE_ID[0]}`], 11)),
      tambah(idx(SUARA_O2, "Hitung"), ...kartu("m1", 20, 88, 260, 38, WARNA_METODE[1], [`2. ${NAMA_METODE_ID[1]}`], 11)),
      tambah(idx(SUARA_O2, "Garis"), ...kartu("m2", 20, 136, 260, 38, WARNA_METODE[2], [`3. ${NAMA_METODE_ID[2]}`], 11)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Satu pertanyaan")),
      tambah("satu", emo("i1", 60, 84, "\u{1F522}", 34), emo("i2", 150, 84, "❓", 34), emo("i3", 240, 84, "\u{1F440}", 34)),
      tambah("Berapa", ...kartu("iq", 20, 112, 260, 52, W.emas, ["berapa banyak bendanya,", "dan cara menghitung yang cepat?"], 10)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Alat bantu hari ini")),
      tambah("benda", ...bendaDi("a", EMO_MERAH, titikGrid(3, 100, 100, 50, 0), 26), teks("ea-t", 150, 128, "benda bergambar", 10, W.ungu)),
      tambah("mengetuk", emo("tg", 190, 152, "\u{1F446}", 22)),
    ),
    k(
      SUARA_O5,
      bersih(0),
      tambah(0, judul("Sampai lima puluh")),
      tambah("lima", ...kartuAngka("ob", 112, 60, "50", W.emas, 76, 44, 26)),
      tambah("pertama.", emo("ow", 150, 168, OWL, 30)),
    ),
  ],
};

/* ------------------------------ 2. Bingkai Sepuluh: konsep ------------------------------ */
const GB: Kotak10 = { x: 75, y: 58, c: 30 };
const merah = (i: number): Obj => benda("a", i, titikPetak(i, GB, 22).x, titikPetak(i, GB, 22).y, EMO_MERAH, 22);
const kosong = (dari: number): Obj[] => Array.from({ length: 10 - dari }, (_, q) => {
  const i = dari + q;
  const p = i % 10;
  return kotak(`ko${i}`, GB.x + (p % 5) * GB.c + 3, GB.y + Math.floor(p / 5) * GB.c + 3, GB.c - 6, GB.c - 6, W.putih, W.merah, { rx: 6, tebal: 1.4, putus: true });
});
const SUARA_A1 = "Metode pertama bernama Bingkai Sepuluh. Bingkai ini punya dua baris, dan tiap baris punya lima petak.";
const SUARA_A2 = "Kita isi dari kiri ke kanan, baris atas dulu. Satu, dua, tiga, empat, lima. Baris atas penuh, ada lima.";
const SUARA_A3 = "Lanjut ke baris bawah. Enam, tujuh, delapan, sembilan, sepuluh. Semua petak penuh, ada sepuluh.";
const SUARA_A4 = "Bingkai penuh berarti sepuluh. Kita tidak perlu menghitung ulang. Kita langsung tahu, sepuluh.";
const SUARA_A5 = "Sekarang tujuh. Baris atas penuh, lima. Baris bawah berisi dua. Lima ditambah dua sama dengan tujuh.";
const SUARA_A6 = "Ada tiga petak kosong. Jadi tujuh butuh tiga lagi supaya penuh sepuluh.";

export const ADEGAN_LUAR_BINGKAI: AdeganStory = {
  id: "luar-bingkai",
  judul: "Bingkai Sepuluh: dua baris lima petak",
  sumber: "Metode luar: Bingkai Sepuluh",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_A1, tambah("pertama", ...kepala(0)), tambah(idx(SUARA_A1, "Bingkai", 2), ...kotakSepuluh("a", 0, GB))),
    k(SUARA_A2, ...isiAksi(SUARA_A2, 0, 5, merah, "dulu.")),
    k(SUARA_A3, ...isiAksi(SUARA_A3, 5, 10, merah, "bawah."), tambah(idx(SUARA_A3, "penuh,"), jumlahG("a", 150, 176, "10", 22))),
    k(SUARA_A4, sorotkan(idx(SUARA_A4, "Bingkai"), "fra0", "ea-ln"), redamkan(idx(SUARA_A4, "Kita", 2), "fra0")),
    k(
      SUARA_A5,
      bersih(0),
      tambah(0, ...kepala(0), ...kotakSepuluh("a", 0, GB)),
      tambah(idx(SUARA_A5, "penuh,"), ...Array.from({ length: 5 }, (_, i) => merah(i))),
      tambah(idx(SUARA_A5, "berisi"), merah(5), merah(6)),
      tambah(idx(SUARA_A5, "ditambah"), ...kartu("eq", 90, 134, 120, 28, W.emas, ["5 + 2 = 7"], 12)),
    ),
    k(SUARA_A6, tambah(idx(SUARA_A6, "kosong."), ...kosong(7)), tambah(idx(SUARA_A6, "butuh"), ...kartu("bt", 90, 168, 120, 28, W.krem, ["7 + 3 = 10"], 12))),
  ],
};

/* ------------------------------ 3. Bingkai Sepuluh: terapan ------------------------------ */
const Y_B = 56;
const SUARA_B1 = "Terapkan pada bilangan baru. Ada tiga bingkai sepuluh. Dua bingkai penuh dan satu bingkai berisi tujuh.";
const SUARA_B2 = "Dua bingkai penuh berarti dua puluh. Dua puluh ditambah tujuh sama dengan dua puluh tujuh.";
const SUARA_B3 = "Pilih jawabannya. Ada berapa benda semuanya? Ketuk bilangan yang tepat.";
const SUARA_B4 = "Betul! Ada dua puluh tujuh benda. Dua bingkai penuh dan tujuh lagi. Hebat!";
const merahKecil = (i: number): Obj => benda("a", i, titikKotak(i, Y_B).x, titikKotak(i, Y_B).y, EMO_MERAH, 15);

export const ADEGAN_LUAR_BINGKAI_TERAPAN: AdeganStory = {
  id: "luar-bingkai-terapan",
  judul: "Bingkai Sepuluh: dua puluh tujuh benda",
  sumber: "Metode luar: Bingkai Sepuluh, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_B1,
      tambah("Terapkan", ...kepala(0)),
      tambah(idx(SUARA_B1, "bingkai", 1), namaG("a", 4, 50, "Benda"), ...[0, 1, 2].flatMap((f) => kotakSepuluh("a", f, letakKotak(f, Y_B)))),
      tambah(idx(SUARA_B1, "penuh"), ...Array.from({ length: 20 }, (_, i) => merahKecil(i))),
      tambah(idx(SUARA_B1, "berisi"), ...Array.from({ length: 7 }, (_, i) => merahKecil(20 + i))),
    ),
    k(SUARA_B2, tambah(idx(SUARA_B2, "berarti"), angkaKotak("a", 1, "20", Y_B)), tambah(idx(SUARA_B2, "ditambah"), ...kartu("eq", 20, 118, 160, 28, W.emas, ["20 + 7 = 27"], 12))),
    k(SUARA_B3, tambah(idx(SUARA_B3, "jawabannya."), ...pilihKata(152, ["26", "27", "28"])), sorotkan(idx(SUARA_B3, "Ketuk"), "c2-k")),
    k(SUARA_B4, tambah(idx(SUARA_B4, "tujuh", 1), jumlahG("a", 240, 140, "27", 20)), tambah(idx(SUARA_B4, "Hebat!"), emo("ow", 262, 100, OWL, 22))),
  ],
};

/* ------------------------------ 4. Hitung Sepuluh-Sepuluh: konsep ------------------------------ */
const Y0_R = 60;
const DY_R = 28;
const titikBalon = (n: number) => titikGrid(n, 36, Y0_R, 24, DY_R, 10);
const angkaBaris = (f: number, isi: string, y0 = Y0_R, dy = DY_R): Obj => teks(`fna${f}`, 276, y0 + f * dy - 4, isi, 11, W.merah);
const SUARA_C1 = "Metode kedua bernama Hitung Sepuluh-Sepuluh. Kita meloncat sepuluh demi sepuluh, tidak satu per satu.";
const SUARA_C2 = "Balon disusun dalam baris, sepuluh balon tiap baris. Kita hitung per baris: sepuluh, dua puluh, tiga puluh.";
const SUARA_C3 = "Baris terakhir belum penuh. Kita lanjutkan satu per satu. Tiga puluh satu, tiga puluh dua, tiga puluh tiga, tiga puluh empat.";
const SUARA_C4 = "Jadi ada tiga puluh empat balon.";
const SUARA_C5 = "Meloncat sepuluh membuat hitungan lebih cepat. Cara ini cocok untuk benda yang banyak.";

export const ADEGAN_LUAR_SEPULUH: AdeganStory = {
  id: "luar-sepuluh",
  judul: "Hitung Sepuluh-Sepuluh: meloncat per baris",
  sumber: "Metode luar: Hitung Sepuluh-Sepuluh",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_C1, tambah("kedua", ...kepala(1)), tambah(idx(SUARA_C1, "meloncat"), ...kartu("lc", 40, 100, 220, 32, W.emas, ["10, 20, 30, 40, 50"], 12))),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, ...kepala(1)),
      tambah(idx(SUARA_C2, "disusun"), namaG("a", 4, 52, "Balon"), ...bendaDi("a", EMO_BALON, titikBalon(34), 16)),
      ...urutNilai(SUARA_C2, [10, 20, 30], "hitung").map((p, q) => tambah(p, angkaBaris(q, String((q + 1) * 10)))),
    ),
    k(
      SUARA_C3,
      ...hitungAksi(SUARA_C3, "ea", pusatBenda(titikBalon(34), 16), { dari: 31, awal: 30, setelah: "lanjutkan", naik: 10, u: 10 }),
      tambah(urutBilangan(SUARA_C3, 34, 34, "lanjutkan")[0], angkaBaris(3, "34")),
    ),
    k(SUARA_C4, tambah(idx(SUARA_C4, "empat"), jumlahG("a", 160, 186, "34", 18))),
    k(SUARA_C5, sorotkan(idx(SUARA_C5, "Meloncat"), "fna0", "fna1", "fna2"), tambah(idx(SUARA_C5, "cocok"), emo("ow", 262, 196, OWL, 22))),
  ],
};

/* ------------------------------ 5. Hitung Sepuluh-Sepuluh: terapan ------------------------------ */
const Y0_J = 58;
const DY_J = 26;
const titikJeruk = (n: number) => titikGrid(n, 36, Y0_J, 24, DY_J, 10);
const SUARA_D1 = "Terapkan pada jeruk. Jeruk disusun dalam baris, sepuluh jeruk tiap baris.";
const SUARA_D2 = "Hitung per baris: sepuluh, dua puluh, tiga puluh, empat puluh. Baris terakhir belum penuh.";
const SUARA_D3 = "Lanjutkan satu per satu: empat puluh satu, empat puluh dua, empat puluh tiga, empat puluh empat, empat puluh lima, empat puluh enam, empat puluh tujuh.";
const SUARA_D4 = "Pilih jawabannya. Ada berapa jeruk semuanya? Ketuk bilangan yang tepat.";
const SUARA_D5 = "Betul! Ada empat puluh tujuh jeruk. Hebat!";

export const ADEGAN_LUAR_SEPULUH_TERAPAN: AdeganStory = {
  id: "luar-sepuluh-terapan",
  judul: "Hitung Sepuluh-Sepuluh: empat puluh tujuh jeruk",
  sumber: "Metode luar: Hitung Sepuluh-Sepuluh, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_D1, tambah("Terapkan", ...kepala(1)), tambah(idx(SUARA_D1, "disusun"), namaG("a", 4, 54, "Jeruk"), ...bendaDi("a", EMO_JERUK, titikJeruk(47), 16)), tambah(idx(SUARA_D1, "sepuluh"), teks("tb", 150, 190, "10 jeruk tiap baris", 10, W.ungu))),
    k(SUARA_D2, hapus(0, "tb"), ...urutNilai(SUARA_D2, [10, 20, 30, 40], "baris:").map((p, q) => tambah(p, angkaBaris(q, String((q + 1) * 10), Y0_J, DY_J)))),
    k(
      SUARA_D3,
      ...hitungAksi(SUARA_D3, "ea", pusatBenda(titikJeruk(47), 16), { dari: 41, awal: 40, naik: 10, u: 9 }),
      tambah(urutBilangan(SUARA_D3, 47, 47)[0], angkaBaris(4, "47", Y0_J, DY_J)),
    ),
    k(SUARA_D4, tambah(idx(SUARA_D4, "jawabannya."), ...pilihKata(168, ["46", "47", "48"])), sorotkan(idx(SUARA_D4, "Ketuk"), "c2-k")),
    k(SUARA_D5, tambah(idx(SUARA_D5, "empat"), jumlahG("a", 250, 166, "47", 20)), tambah(idx(SUARA_D5, "Hebat!"), emo("ok", 262, 140, "✅", 20))),
  ],
};
