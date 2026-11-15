import type { AdeganStory } from "./logika-story";
import { W, batangP, idBatang, judul, jalurBilangan, kartu, kotakPenerima, kubusP, labelN, langkah, lompat, rumus, sel, slotBatang, slotKubus, tabelKurang, tandaAkhir, tandaAwal, teks, idKotakSel, emo } from "./k2b2B-gambar";
import { idx, ids, k, redamkan, sorotkan, tambah, ubah, urutNilai } from "./k2b2B-bantu";

/* ------------------------------ 4. Jalur bilangan: lompat besar ------------------------------ */
const SUARA_D1 = "Cara pertama memakai jalur bilangan. Kita mulai dari delapan belas.";
const SUARA_D2 = "Dikurangi dua belas berarti melompat mundur sebanyak dua belas langkah.";
const SUARA_D3 = "Lompat besar dulu. Mundur sepuluh langkah, dari delapan belas sampai ke delapan.";
const SUARA_D4 = "Masih ada dua langkah lagi. Dari delapan mundur dua, sampai ke enam.";
const SUARA_D5 = "Berhenti di enam. Jadi delapan belas dikurangi dua belas sama dengan enam.";

export const ADEGAN_MUNDUR_BESAR: AdeganStory = {
  id: "mundur-besar",
  judul: "Jalur bilangan: mundur sepuluh lalu dua",
  sumber: "Materi: cara pertama, jalur bilangan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_D1, tambah(0, judul("Cara 1: jalur bilangan"), ...jalurBilangan(), rumus("18 − 12 = ?", 160)), tambah(idx(SUARA_D1, "mulai"), tandaAwal(18))),
    k(SUARA_D2, tambah(idx(SUARA_D2, "mundur"), ...kartu("kl", 60, 116, 180, 22, W.langit, ["mundur 12 langkah"], 10))),
    k(SUARA_D3, tambah(idx(SUARA_D3, "Mundur"), lompat(0, 18, 8), langkah(0, 18, 8, "10"))),
    k(SUARA_D4, tambah(idx(SUARA_D4, "mundur"), lompat(1, 8, 6, W.hijau), langkah(1, 8, 6, "2")), tambah(idx(SUARA_D4, "enam."), tandaAkhir(6))),
    k(SUARA_D5, sorotkan(idx(SUARA_D5, "Berhenti"), "gb-akhir"), ubah(idx(SUARA_D5, "Jadi"), { id: "rm", isi: "18 − 12 = 6" }), tambah(idx(SUARA_D5, "sama"), emo("ok", 262, 160, "✅", 22))),
  ],
};

/* ------------------------------ 5. Jalur bilangan: lompat satu-satu ------------------------------ */
const SUARA_E1 = "Sekarang bilangan yang dikurangkan kecil, yaitu empat. Kita mulai dari lima belas.";
const SUARA_E2 = "Lompat mundur satu-satu, empat langkah. Empat belas, tiga belas, dua belas, sebelas.";
const SUARA_E3 = "Kita berhenti di sebelas. Hitung lompatannya: ada empat. Cocok dengan bilangan yang dikurangkan.";
const SUARA_E4 = "Jadi lima belas dikurangi empat sama dengan sebelas.";
const SUARA_E5 = "Cara ini enak kalau bilangan yang dikurangkan kecil. Kalau besar, lompat sepuluh dulu.";
const POS_E2 = urutNilai(SUARA_E2, [14, 13, 12, 11], "langkah");

export const ADEGAN_MUNDUR_KECIL: AdeganStory = {
  id: "mundur-kecil",
  judul: "Jalur bilangan: mundur satu-satu",
  sumber: "Materi: cara pertama, lompat kecil",
  latar: "#ECFEFF",
  ketukan: [
    k(SUARA_E1, tambah(0, judul("Lompat satu-satu"), ...jalurBilangan(), rumus("15 − 4 = ?", 160)), tambah(idx(SUARA_E1, "lima"), tandaAwal(15))),
    k(SUARA_E2, ...[0, 1, 2, 3].map((q) => tambah(POS_E2[q], lompat(q, 15 - q, 14 - q)))),
    k(SUARA_E3, tambah(idx(SUARA_E3, "berhenti"), tandaAkhir(11)), tambah(idx(SUARA_E3, "empat."), ...kartu("kl", 60, 116, 180, 22, W.langit, ["4 lompatan"], 10))),
    k(SUARA_E4, ubah(idx(SUARA_E4, "sama"), { id: "rm", isi: "15 − 4 = 11" }), sorotkan(idx(SUARA_E4, "sebelas."), "gb-akhir")),
    k(SUARA_E5, tambah(idx(SUARA_E5, "enak"), ...kartu("tp", 20, 172, 260, 24, W.emas, ["kecil: satu-satu; besar: 10 dulu"], 9.6))),
  ],
};

/* ------------------------------ 6. Tabel nilai tempat: kubus dan batang ------------------------------ */
const SUARA_F1 = "Cara kedua memakai tabel nilai tempat. Delapan belas adalah satu puluhan dan delapan satuan.";
const SUARA_F2 = "Malosi memberikan dua belas kepada Upe. Dua belas adalah satu puluhan dan dua satuan.";
const SUARA_F3 = "Pertama, satu batang puluhan pindah ke kotak Upe.";
const SUARA_F4 = "Kedua, dua kubus satuan ikut pindah.";
const SUARA_F5 = "Yang tersisa di Malosi hanya enam kubus, jadi enam satuan.";
const SUARA_F6 = "Delapan belas dikurangi dua belas sama dengan enam.";

export const ADEGAN_PAPAN_AMBIL: AdeganStory = {
  id: "papan-ambil",
  judul: "Cara kedua: batang dan kubus",
  sumber: "Materi: cara kedua, tabel nilai tempat",
  latar: "#FEFCE8",
  ketukan: [
    k(SUARA_F1, tambah(0, judul("Cara 2: nilai tempat")), tambah(idx(SUARA_F1, "Delapan"), ...batangP("a", 0), ...kubusP("a", 0, 7), labelN("a", 236, 54, "18", 22))),
    k(SUARA_F2, tambah(idx(SUARA_F2, "kepada"), ...kotakPenerima("Upe"), rumus("18 − 12 = ?", 176)), sorotkan(idx(SUARA_F2, "satu"), ...idBatang("a", 0)), redamkan(idx(SUARA_F2, "dan", 1), ...idBatang("a", 0))),
    k(SUARA_F3, sorotkan(idx(SUARA_F3, "batang"), ...idBatang("a", 0)), ubah(idx(SUARA_F3, "pindah"), { id: "bpa0", x: slotBatang.x, y: slotBatang.y }, { id: "bqa0", x: slotBatang.x, y: slotBatang.y }), redamkan(idx(SUARA_F3, "ke"), ...idBatang("a", 0))),
    k(SUARA_F4, sorotkan(idx(SUARA_F4, "dua"), "bsa6", "bsa7"), ubah(idx(SUARA_F4, "pindah"), { id: "bsa6", x: slotKubus(0, true).x, y: slotKubus(0, true).y }, { id: "bsa7", x: slotKubus(1, true).x, y: slotKubus(1, true).y }), redamkan(idx(SUARA_F4, "pindah"), "bsa6", "bsa7")),
    k(SUARA_F5, sorotkan(idx(SUARA_F5, "tersisa"), ...ids("bsa", 0, 5)), ubah(idx(SUARA_F5, "jadi"), { id: "n-a", isi: "6" })),
    k(SUARA_F6, redamkan(0, ...ids("bsa", 0, 5)), ubah(idx(SUARA_F6, "sama"), { id: "rm", isi: "18 − 12 = 6" }), tambah(idx(SUARA_F6, "enam."), emo("ok", 262, 176, "✅", 22))),
  ],
};

/* ------------------------------ 7. Tabel nilai tempat: tiga baris ------------------------------ */
const SUARA_G1 = "Sekarang kita catat di tabel nilai tempat. Baris pertama delapan belas, yaitu satu puluhan dan delapan satuan.";
const SUARA_G2 = "Baris kedua dua belas, yaitu satu puluhan dan dua satuan. Satuan lurus dengan satuan.";
const SUARA_G3 = "Kurangi satuannya dulu. Delapan dikurangi dua sama dengan enam.";
const SUARA_G4 = "Lalu kurangi puluhannya. Satu dikurangi satu sama dengan nol.";
const SUARA_G5 = "Hasilnya nol puluhan dan enam satuan, yaitu enam.";

export const ADEGAN_TABEL_KURANG: AdeganStory = {
  id: "tabel-kurang",
  judul: "Cara kedua: mengurangi di tabel",
  sumber: "Materi: cara kedua, tabel nilai tempat",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_G1, tambah(0, judul("Tabel nilai tempat"), ...tabelKurang()), tambah(idx(SUARA_G1, "Baris"), sel(0, 0, "18"), sel(0, 1, "1"), sel(0, 2, "8"))),
    k(SUARA_G2, tambah(idx(SUARA_G2, "kedua"), sel(1, 0, "− 12"), sel(1, 1, "1"), sel(1, 2, "2"))),
    k(
      SUARA_G3,
      sorotkan(idx(SUARA_G3, "satuannya"), idKotakSel(0, 2), idKotakSel(1, 2)),
      tambah(idx(SUARA_G3, "Delapan"), teks("m1", 150, 158, "8 − 2 = 6", 12, W.merah)),
      tambah(idx(SUARA_G3, "enam."), sel(2, 0, "hasil"), sel(2, 2, "6")),
    ),
    k(
      SUARA_G4,
      redamkan(0, idKotakSel(0, 2), idKotakSel(1, 2)),
      sorotkan(idx(SUARA_G4, "puluhannya."), idKotakSel(0, 1), idKotakSel(1, 1)),
      tambah(idx(SUARA_G4, "Satu"), teks("m2", 150, 174, "1 − 1 = 0", 12, W.merah)),
      tambah(idx(SUARA_G4, "nol."), sel(2, 1, "0")),
    ),
    k(SUARA_G5, redamkan(0, idKotakSel(0, 1), idKotakSel(1, 1)), tambah(idx(SUARA_G5, "Hasilnya"), rumus("18 − 12 = 6", 196, 14))),
  ],
};
