import type { AdeganStory } from "./logika-story";
import { BINTANG, BULAT, HATI, OWL, W, diagram, emo, judul, kartu, pilihan, teks, type Kat } from "./k2b8B-gambar";
import { bersih, hapus, idx, k, redamkan, sorotkan, tambah } from "./k2b8B-bantu";
import { BALON, NAMA_METODE_ID, kepala, tanpaJudul } from "./k2b8B-luar-1";

/* ------------------------------ 4. Kunci Gambar: konsep ------------------------------ */
const IKAN: Kat[] = [
  { nama: "mas", n: 4, g: HATI, warna: W.jingga },
  { nama: "lele", n: 6, g: HATI, warna: W.hijau },
  { nama: "nila", n: 3, g: HATI, warna: W.biruGambar },
];
const DI = diagram("kw", IKAN, "Ikan di kolam", "ikan", { y0: 66, rowH: 30, ketY: 176 });
const SUARA_E1 = "Metode kedua bernama Kunci Gambar. Kunci gambar adalah keterangan di bawah diagram. Baca kunci dulu sebelum menghitung.";
const SUARA_E2 = "Di sini kuncinya berbunyi, satu hati sama dengan satu ikan. Jadi satu hati berarti satu ikan.";
const SUARA_E3 = "Sekarang kita hitung. Lele ada enam hati, jadi lele ada enam ikan.";
const SUARA_E4 = "Mas ada empat hati, jadi empat ikan. Nila ada tiga hati, jadi tiga ikan.";
const SUARA_E5 = "Jadi sebelum menghitung, selalu baca kunci gambar lebih dulu. Satu gambar mewakili satu benda.";

export const ADEGAN_LUAR_KUNCI: AdeganStory = {
  id: "luar-kunci",
  judul: "Kunci Gambar: baca keterangan dulu",
  sumber: "Metode luar: Kunci Gambar",
  latar: "#F5F3FF",
  ketukan: [
    k(SUARA_E1, tambah("kedua", ...kepala(1)), tambah("Kunci@2", ...tanpaJudul(DI.semua))),
    k(SUARA_E2, sorotkan("kuncinya", "kwk")),
    k(SUARA_E3, redamkan(0, "kwk"), sorotkan("Lele", ...DI.idGambar(1)), tambah(idx(SUARA_E3, "enam", 2), DI.angka(1))),
    k(SUARA_E4, redamkan(0, ...DI.idGambar(1)), tambah(idx(SUARA_E4, "empat"), DI.angka(0)), tambah(idx(SUARA_E4, "tiga"), DI.angka(2)), sorotkan("Mas", ...DI.idGambar(0)), redamkan("Nila", ...DI.idGambar(0)), sorotkan("Nila", ...DI.idGambar(2))),
    k(SUARA_E5, redamkan(0, ...DI.idGambar(2)), sorotkan("kunci", "kwk")),
  ],
};

/* ------------------------------ 5. Kunci Gambar: terapan ------------------------------ */
const OLAHRAGA: Kat[] = [
  { nama: "voli", n: 4, g: BINTANG, warna: W.merah },
  { nama: "renang", n: 6, g: BINTANG, warna: W.biruGambar },
];
const DO = diagram("ko", OLAHRAGA, "Olahraga", "anak", { y0: 62, rowH: 28, ketY: 132 });
const SUARA_F1 = "Terapkan Kunci Gambar. Baca dulu keterangan di bawah diagram. Satu bintang sama dengan satu anak.";
const SUARA_F2 = "Berapa anak yang suka renang? Ketuk jawabannya. Lima, enam, atau tujuh?";
const SUARA_F3 = "Betul! Baris renang punya enam bintang, jadi enam anak suka renang.";
const SUARA_F4 = "Voli ada empat bintang, jadi empat anak. Renang lebih banyak dua dari voli.";

export const ADEGAN_LUAR_KUNCI_TERAPAN: AdeganStory = {
  id: "luar-kunci-terapan",
  judul: "Kunci Gambar: olahraga",
  sumber: "Metode luar: Kunci Gambar, terapan",
  latar: "#F5F3FF",
  ketukan: [
    k(SUARA_F1, tambah("Terapkan", ...kepala(1)), tambah("diagram.", ...tanpaJudul(DO.semua)), sorotkan("Satu", "kok")),
    k(SUARA_F2, redamkan(0, "kok"), tambah("Berapa", ...pilihan(148, ["5", "6", "7"]))),
    k(SUARA_F3, sorotkan("Betul!", "c2-k", ...DO.idGambar(1)), tambah(idx(SUARA_F3, "enam", 2), DO.angka(1))),
    k(SUARA_F4, redamkan(0, "c2-k", ...DO.idGambar(1)), tambah("Voli", DO.angka(0)), sorotkan("Renang", "kog1_4", "kog1_5"), tambah("lebih", emo("ok", 262, 80, "✅", 22))),
  ],
};

/* ------------------------------ 6. Banding Kategori: konsep ------------------------------ */
const DK = diagram("bk", BALON, "Balon warna", "balon", { y0: 66, rowH: 30, ketY: 176 });
const SUARA_G1 = "Metode ketiga bernama Banding Kategori. Kita membandingkan baris yang satu dengan baris yang lain.";
const SUARA_G2 = "Merah paling banyak, dan biru paling sedikit.";
const SUARA_G3 = "Merah lebih banyak dua dari biru. Kuning lebih banyak satu dari biru.";
const SUARA_G4 = "Merah lebih banyak satu dari kuning. Jadi kita bisa membandingkan dua baris mana saja.";
const SUARA_G5 = "Jumlah semuanya lima belas. Itu enam, empat, dan lima.";

export const ADEGAN_LUAR_BANDING: AdeganStory = {
  id: "luar-banding",
  judul: "Banding Kategori: membandingkan baris",
  sumber: "Metode luar: Banding Kategori",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_G1, tambah("ketiga", ...kepala(2)), tambah("Kita", ...tanpaJudul(DK.semua), ...BALON.map((_, c) => DK.angka(c)))),
    k(SUARA_G2, sorotkan("Merah", ...DK.idGambar(0)), redamkan("biru", ...DK.idGambar(0)), sorotkan("biru", ...DK.idGambar(1))),
    k(SUARA_G3, redamkan(0, ...DK.idGambar(0), ...DK.idGambar(1)), sorotkan("dua", "bkg0_4", "bkg0_5"), redamkan("Kuning", "bkg0_4", "bkg0_5"), sorotkan("Kuning", "bkg2_4")),
    k(SUARA_G4, redamkan(0, "bkg2_4"), sorotkan("satu", "bkg0_5")),
    k(SUARA_G5, redamkan(0, "bkg0_5"), tambah("Jumlah", teks("jm", 150, 150, "6 + 4 + 5 = 15", 13, W.coklat))),
  ],
};

/* ------------------------------ 7. Banding Kategori: terapan ------------------------------ */
const MINUMAN: Kat[] = [
  { nama: "teh", n: 5, g: BULAT, warna: W.jingga },
  { nama: "jus", n: 5, g: BULAT, warna: W.hijau },
  { nama: "susu", n: 3, g: BULAT, warna: W.biruGambar },
];
const DM = diagram("bt", MINUMAN, "Minuman kesukaan", "anak", { y0: 60, rowH: 26, ketY: 138 });
const SUARA_H1 = "Terapkan Banding Kategori. Ini diagram minuman kesukaan. Bandingkan barisnya.";
const SUARA_H2 = "Dua minuman mana yang sama banyak? Ketuk jawabannya.";
const SUARA_H3 = "Betul! Teh dan jus sama banyak, karena barisnya sama panjang.";
const SUARA_H4 = "Susu paling sedikit, hanya tiga lingkaran. Teh lebih banyak dua dari susu.";

export const ADEGAN_LUAR_BANDING_TERAPAN: AdeganStory = {
  id: "luar-banding-terapan",
  judul: "Banding Kategori: minuman",
  sumber: "Metode luar: Banding Kategori, terapan",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_H1, tambah("Terapkan", ...kepala(2)), tambah("diagram", ...tanpaJudul(DM.semua))),
    k(SUARA_H2, tambah("Dua", ...pilihan(152, ["teh dan jus", "jus dan susu", "teh dan susu"], 9))),
    k(SUARA_H3, sorotkan("Betul!", "c1-k"), sorotkan("Teh", ...DM.idGambar(0), ...DM.idGambar(1))),
    k(SUARA_H4, redamkan(0, "c1-k", ...DM.idGambar(0), ...DM.idGambar(1)), sorotkan("Susu", ...DM.idGambar(2)), redamkan("Teh", ...DM.idGambar(2)), sorotkan("Teh", "btg0_3", "btg0_4"), tambah("lebih", emo("ok", 262, 80, "✅", 22))),
  ],
};

/* ------------------------------ 8. Ringkasan ------------------------------ */
const SUARA_Y1 = "Mari kita ingat tiga metode dari luar tadi.";
const SUARA_Y2 = "Diagram Gambar. Satu gambar mewakili satu benda, dan barisnya dibaca dari kiri ke kanan.";
const SUARA_Y3 = "Kunci Gambar. Baca keterangan di bawah diagram lebih dulu, sebelum menghitung gambarnya.";
const SUARA_Y4 = "Banding Kategori. Bandingkan baris untuk mencari paling banyak, lebihnya, dan jumlah. Sampai jumpa!";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Metode luar: ringkasan",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Y1, tambah(0, judul("Ringkasan"), emo("ow", 150, 110, OWL, 50))),
    k(SUARA_Y2, bersih(0), tambah(0, judul("Ringkasan")), tambah("Diagram", ...kartu("r0", 14, 40, 272, 44, W.hijauMuda, [`1. ${NAMA_METODE_ID[0]}`, "satu gambar, satu benda"], 10))),
    k(SUARA_Y3, tambah("Kunci", ...kartu("r1", 14, 94, 272, 44, W.langit, [`2. ${NAMA_METODE_ID[1]}`, "baca keterangan dulu"], 10))),
    k(SUARA_Y4, tambah("Banding", ...kartu("r2", 14, 148, 272, 44, W.pink, [`3. ${NAMA_METODE_ID[2]}`, "paling banyak, lebihnya, jumlah"], 10)), hapus(0, "jud")),
  ],
};
