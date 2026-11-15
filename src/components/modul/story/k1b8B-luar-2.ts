import type { AdeganStory } from "./logika-story";
import { OWL, W, diagram, emo, judul, kartu, pilihan, teks, type Kat } from "./k1b8B-gambar";
import { bersih, k, redamkan, sorotkan, tambah } from "./k1b8B-bantu";
import { NAMA_METODE_ID, WARNA, WARNA_METODE, kepala, tanpaJudul } from "./k1b8B-luar-1";

/* ------------------------------ 4. Diagram Gambar: konsep ------------------------------ */
const DW = diagram("dw", "datar", WARNA, "Bola warna", "bola", { y0: 66, rowH: 30, ketY: 176 });
const SUARA_C1 = "Metode kedua bernama Diagram Gambar. Data dari turus kita ubah menjadi gambar.";
const SUARA_C2 = "Merah ada tujuh, jadi tujuh gambar bola merah.";
const SUARA_C3 = "Biru ada lima, jadi lima gambar. Hijau ada tiga, jadi tiga gambar.";
const SUARA_C4 = "Satu gambar mewakili satu data. Gambar tidak boleh mewakili lebih dari satu data.";
const SUARA_C5 = "Barisnya berjajar ke samping, jadi mudah melihat bahwa merah paling banyak.";

export const ADEGAN_LUAR_DIAGRAM: AdeganStory = {
  id: "luar-diagram",
  judul: "Diagram Gambar: satu gambar satu data",
  sumber: "Metode luar: Diagram Gambar",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_C1, tambah("kedua", ...kepala(1)), tambah("Data", ...tanpaJudul(DW.dasar)), tambah("turus", DW.label(0), DW.label(1), DW.label(2))),
    k(SUARA_C2, tambah("tujuh,", ...DW.gambar(0))),
    k(SUARA_C3, tambah("lima,", ...DW.gambar(1)), tambah("tiga,", ...DW.gambar(2))),
    k(SUARA_C4, sorotkan("Satu", "dwk")),
    k(SUARA_C5, redamkan(0, "dwk"), sorotkan("merah", ...DW.idGambar(0))),
  ],
};

/* ------------------------------ 5. Diagram Gambar: terapan ------------------------------ */
const BURUNG: Kat[] = [
  { nama: "burung", n: 4, emo: "\u{1F426}" },
  { nama: "kupu", n: 2, emo: "\u{1F98B}" },
  { nama: "lebah", n: 3, emo: "\u{1F41D}" },
];
const DU = diagram("du", "tegak", BURUNG, "Hewan di taman", "hewan", { yb: 128, ketY: 154 });
const SUARA_D1 = "Terapkan pada hewan di taman. Ini diagram gambar tegak. Hitung gambar pada tiap kolom.";
const SUARA_D2 = "Hewan apa yang paling banyak? Ketuk jawabannya.";
const SUARA_D3 = "Betul! Burung paling banyak, ada empat gambar.";
const SUARA_D4 = "Kupu paling sedikit, hanya dua gambar. Jumlah semuanya sembilan.";

export const ADEGAN_LUAR_DIAGRAM_TERAPAN: AdeganStory = {
  id: "luar-diagram-terapan",
  judul: "Diagram Gambar: hewan di taman",
  sumber: "Metode luar: Diagram Gambar, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_D1, tambah("Terapkan", ...kepala(1)), tambah("diagram", ...tanpaJudul(DU.semua))),
    k(SUARA_D2, tambah("Hewan", ...pilihan(162, ["burung", "kupu", "lebah"], 10))),
    k(SUARA_D3, sorotkan("Betul!", "c1-k", ...DU.idGambar(0))),
    k(SUARA_D4, redamkan(0, "c1-k", ...DU.idGambar(0)), sorotkan("Kupu", ...DU.idGambar(1)), tambah("sembilan.", emo("ok", 262, 80, "✅", 22))),
  ],
};

/* ------------------------------ 6. Banding Kategori: konsep ------------------------------ */
const DK = diagram("bk", "datar", WARNA, "Bola warna", "bola", { y0: 66, rowH: 30, ketY: 176 });
const SUARA_E1 = "Metode ketiga bernama Banding Kategori. Kita membandingkan satu kategori dengan kategori lain.";
const SUARA_E2 = "Merah paling banyak, dan hijau paling sedikit.";
const SUARA_E3 = "Merah lebih banyak dua dari biru. Biru lebih banyak dua dari hijau.";
const SUARA_E4 = "Merah lebih banyak empat dari hijau. Jadi kita bisa membandingkan dua kategori mana saja.";
const SUARA_E5 = "Jumlah semuanya lima belas. Itu tujuh, lima, dan tiga.";

export const ADEGAN_LUAR_BANDING: AdeganStory = {
  id: "luar-banding",
  judul: "Banding Kategori: mana lebih banyak",
  sumber: "Metode luar: Banding Kategori",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_E1, tambah("ketiga", ...kepala(2)), tambah("Kita", ...tanpaJudul(DK.semua))),
    k(SUARA_E2, sorotkan("Merah", ...DK.idGambar(0)), sorotkan("hijau", ...DK.idGambar(2))),
    k(SUARA_E3, redamkan(0, ...DK.idGambar(0), ...DK.idGambar(2)), sorotkan("dua", "bkg0_5", "bkg0_6"), sorotkan("dua@2", "bkg1_3", "bkg1_4")),
    k(SUARA_E4, redamkan(0, "bkg0_5", "bkg0_6", "bkg1_3", "bkg1_4"), sorotkan("empat", "bkg0_3", "bkg0_4", "bkg0_5", "bkg0_6")),
    k(SUARA_E5, redamkan(0, "bkg0_3", "bkg0_4", "bkg0_5", "bkg0_6"), tambah("Jumlah", ...kartu("bj", 70, 181, 160, 19, W.emas, ["7 + 5 + 3 = 15"], 11))),
  ],
};

/* ------------------------------ 7. Banding Kategori: terapan ------------------------------ */
const TERNAK: Kat[] = [
  { nama: "sapi", n: 4, emo: "\u{1F404}" },
  { nama: "kuda", n: 4, emo: "\u{1F434}" },
  { nama: "domba", n: 2, emo: "\u{1F411}" },
];
const DT = diagram("bt", "datar", TERNAK, "Hewan ternak", "hewan", { y0: 66, rowH: 24, ketY: 150 });
const SUARA_F1 = "Terapkan pada hewan ternak. Lihat baris sapi, kuda, dan domba.";
const SUARA_F2 = "Hewan mana yang sama banyak? Ketuk jawabannya.";
const SUARA_F3 = "Betul! Sapi dan kuda sama banyak, empat gambar.";
const SUARA_F4 = "Domba paling sedikit. Domba lebih sedikit dua dari sapi.";

export const ADEGAN_LUAR_BANDING_TERAPAN: AdeganStory = {
  id: "luar-banding-terapan",
  judul: "Banding Kategori: hewan ternak",
  sumber: "Metode luar: Banding Kategori, terapan",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_F1, tambah("Terapkan", ...kepala(2)), tambah("Lihat", ...tanpaJudul(DT.semua))),
    k(SUARA_F2, tambah("Hewan", ...pilihan(158, ["sapi dan kuda", "kuda dan domba", "sapi dan domba"], 8.2))),
    k(SUARA_F3, sorotkan("Betul!", "c1-k", ...DT.idGambar(0), ...DT.idGambar(1))),
    k(SUARA_F4, redamkan(0, "c1-k", ...DT.idGambar(0), ...DT.idGambar(1)), sorotkan("Domba", ...DT.idGambar(2))),
  ],
};

/* ------------------------------ 8. Ringkasan ------------------------------ */
const SUARA_G1 = "Mari kita ingat tiga metode dari luar. Metode pertama, Turus. Setiap data dicatat dengan satu goresan.";
const SUARA_G2 = "Metode kedua, Diagram Gambar. Satu gambar mewakili satu data.";
const SUARA_G3 = "Metode ketiga, Banding Kategori. Kita membandingkan dengan kata paling banyak, paling sedikit, dan lebih banyak.";
const SUARA_G4 = "Hebat sekali, anak-anak! Sampai jumpa di pelajaran berikutnya.";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Ringkasan metode luar",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_G1, tambah(0, judul("Ringkasan")), tambah("pertama,", ...kartu("r0", 14, 36, 272, 34, WARNA_METODE[0], [`${NAMA_METODE_ID[0]}:`, "satu goresan satu data"], 9))),
    k(SUARA_G2, tambah("kedua,", ...kartu("r1", 14, 80, 272, 34, WARNA_METODE[1], [`${NAMA_METODE_ID[1]}:`, "satu gambar satu data"], 9))),
    k(SUARA_G3, tambah("ketiga,", ...kartu("r2", 14, 124, 272, 34, WARNA_METODE[2], [`${NAMA_METODE_ID[2]}:`, "bandingkan kategori"], 9))),
    k(SUARA_G4, bersih(0), tambah(0, judul("Sampai jumpa!"), emo("sj", 150, 100, OWL, 50), teks("sk", 150, 186, "tiga metode dari luar", 10, W.ungu)), tambah("anak-anak!", emo("pa", 80, 150, "\u{1F389}", 30), emo("pb", 220, 150, "\u{1F389}", 30))),
  ],
};
