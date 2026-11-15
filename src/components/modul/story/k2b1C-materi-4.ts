import type { AdeganStory, Aksi, Obj } from "./logika-story";
import { OWL, W, angkaBlok, bingkaiSepuluh, blok, emo, idBlok, judul, kartu, kartuAngka, namaBlok, teks } from "./k2b1C-gambar";
import { bersih, hapus, idf, idx, k, pilihKata, redamkan, sorotkan, tambah, ubah } from "./k2b1C-bantu";
import { SLOT_X } from "./k2b1C-materi-3";

const ex = (isi: string, id = "ex", x = 150, y = 132, u = 16): Obj => teks(id, x, y, isi, u, W.merah);
const cap = (id: string, x: number, isi: string, y = 122): Obj => teks(id, x, y, isi, 8.6, W.biru);

/* ------------------------------ Latihan 1: Wei dan Halim (puluhan sama, banding satuan) ------------------------------ */
const SUARA_L1 = "Latihan satu. Wei punya tiga puluh delapan permen. Halim punya tiga puluh lima permen.";
const SUARA_L2 = "Permen siapa yang lebih banyak? Ayo pilih jawabannya.";
const SUARA_L3 = "Puluhannya sama, yaitu tiga puluhan. Jadi kita lihat satuannya.";
const SUARA_L4 = "Delapan satuan lebih banyak daripada lima satuan. Jadi permen Wei yang lebih banyak.";
const SUARA_L5 = "Jadi tiga puluh delapan lebih besar daripada tiga puluh lima.";
const bar3 = (key: string): string[] => [0, 1, 2].map((i) => `b${key}-p${i}`);
const kub = (key: string, n: number): string[] => Array.from({ length: n }, (_, i) => `b${key}-s${i}`);

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan 1: permen siapa lebih banyak?",
  sumber: "Materi: Latihan 1",
  latar: "#ECFEFF",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Latihan 1")),
      tambah(idx(SUARA_L1, "Wei"), namaBlok("w", 44, 110, "Wei")),
      tambah(idx(SUARA_L1, "punya"), ...blok("w", 3, 8, 44, 110)),
      tambah(idx(SUARA_L1, "delapan"), angkaBlok("w", 44, 110, "38")),
      tambah(idx(SUARA_L1, "Halim"), namaBlok("h", 184, 110, "Halim")),
      tambah(idx(SUARA_L1, "punya", 2), ...blok("h", 3, 5, 184, 110)),
      tambah(idx(SUARA_L1, "lima"), angkaBlok("h", 184, 110, "35")),
    ),
    k(SUARA_L2, tambah("pilih", ...pilihKata(150, ["Wei", "Halim", "Sama banyak"], 10))),
    k(SUARA_L3, sorotkan(0, ...bar3("w"), ...bar3("h")), redamkan("satuannya", ...bar3("w"), ...bar3("h")), sorotkan("satuannya", ...kub("w", 8), ...kub("h", 5))),
    k(SUARA_L4, tambah("lebih", ex("8 > 5")), sorotkan("Wei", "c1-k", "c1-t")),
    k(SUARA_L5, redamkan(0, ...kub("w", 8), ...kub("h", 5)), ubah("lebih", { id: "ex", isi: "38 > 35" })),
  ],
};

/* ------------------------------ Latihan 2: Kira dan Upe (tukar dulu) ------------------------------ */
const SUARA_M1 = "Latihan dua. Kira punya tiga puluhan dan lima satuan. Upe punya dua puluhan dan dua belas satuan.";
const SUARA_M2 = "Satuan Upe ada dua belas, lebih dari sepuluh. Kita tukar dulu sebelum membandingkan.";
const SUARA_M3 = "Sepuluh satuan ditukar menjadi satu puluhan. Sekarang Upe punya tiga puluhan dan dua satuan.";
const SUARA_M4 = "Sekarang bandingkan. Pilih siapa yang permennya lebih banyak.";
const SUARA_M5 = "Puluhannya sama, tiga puluhan dan tiga puluhan. Lima satuan lebih banyak daripada dua satuan.";
const SUARA_M6 = "Jadi tiga puluh lima lebih besar daripada tiga puluh dua. Permen Kira lebih banyak.";
const idSemuaU = [...idBlok("u", 2, 12, ["nm"]), "fr-k", "fr-t", "cpu"];

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan 2: tukar dulu, lalu bandingkan",
  sumber: "Materi: Latihan 2",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Latihan 2")),
      tambah(idx(SUARA_M1, "Kira"), namaBlok("k", 44, 110, "Kira")),
      tambah(idx(SUARA_M1, "puluhan"), ...blok("k", 3, 5, 44, 110)),
      tambah(idx(SUARA_M1, "satuan"), cap("cpk", 94, "3 puluhan 5 satuan")),
      tambah(idx(SUARA_M1, "Upe"), namaBlok("u", 184, 110, "Upe")),
      tambah(idx(SUARA_M1, "puluhan", 2), ...blok("u", 2, 12, 184, 110)),
      tambah(idx(SUARA_M1, "satuan", 2), cap("cpu", 228, "2 puluhan 12 satuan")),
    ),
    k(SUARA_M2, sorotkan(idx(SUARA_M2, "dua"), ...idBlok("u", 2, 12)), tambah(idx(SUARA_M2, "sepuluh"), ...bingkaiSepuluh("fr", "u", 184, 110, 2))),
    k(
      SUARA_M3,
      sorotkan(idx(SUARA_M3, "ditukar"), "fr-k", "fr-t"),
      hapus(idx(SUARA_M3, "menjadi"), ...idSemuaU),
      tambah(idx(SUARA_M3, "menjadi"), namaBlok("v", 184, 110, "Upe"), ...blok("v", 3, 2, 184, 110)),
      tambah(idx(SUARA_M3, "satuan", 2), cap("cpv", 234, "3 puluhan 2 satuan")),
    ),
    k(SUARA_M4, tambah("siapa", ...pilihKata(152, ["Kira", "Upe", "Sama banyak"], 10))),
    k(SUARA_M5, sorotkan("Lima", ...idBlok("k", 3, 5).filter((q) => q.includes("-s")), ...idBlok("v", 3, 2).filter((q) => q.includes("-s")))),
    k(SUARA_M6, redamkan(0, ...idBlok("k", 3, 5).filter((q) => q.includes("-s")), ...idBlok("v", 3, 2).filter((q) => q.includes("-s"))), sorotkan("Kira", "c1-k", "c1-t"), tambah("lebih", ex("35 > 32", "ex", 150, 142))),
  ],
};

/* ------------------------------ Latihan 3: urutkan kartu Igil ------------------------------ */
export const KARTU_IGIL = [34, 45, 32, 37];
const kartuIgil = (i: number, slot: number): Obj[] => kartuAngka(`od${i}`, SLOT_X(slot), 50, String(KARTU_IGIL[i]), W.krem, 60, 44, 22);
const geser = (at: string | number, i: number, slot: number): Aksi => ubah(at, { id: `od${i}-k`, x: SLOT_X(slot) }, { id: `od${i}-t`, x: SLOT_X(slot) + 30 });
const SUARA_N1 = "Latihan tiga. Igil punya empat kartu bilangan: tiga puluh empat, empat puluh lima, tiga puluh dua, dan tiga puluh tujuh.";
const SUARA_N2 = "Urutkan dari yang paling kecil. Pilih urutan yang benar.";
const SUARA_N3 = "Empat puluh lima punya empat puluhan, jadi dialah yang paling besar.";
const SUARA_N4 = "Sisanya punya tiga puluhan semua. Jadi kita lihat satuannya: dua, empat, dan tujuh.";
const SUARA_N5 = "Urutan dari yang paling kecil adalah tiga puluh dua, tiga puluh empat, tiga puluh tujuh, lalu empat puluh lima.";
const SUARA_N6 = "Hebat! Jawaban yang benar adalah pilihan pertama.";

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan 3: urutkan kartu Igil",
  sumber: "Materi: Latihan 3",
  latar: "#F0FDFA",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Latihan 3")),
      tambah(idf(SUARA_N1, "tiga puluh empat"), ...kartuIgil(0, 0)),
      tambah(idf(SUARA_N1, "empat puluh lima"), ...kartuIgil(1, 1)),
      tambah(idf(SUARA_N1, "tiga puluh dua"), ...kartuIgil(2, 2)),
      tambah(idf(SUARA_N1, "tiga puluh tujuh"), ...kartuIgil(3, 3)),
    ),
    k(SUARA_N2, tambah("Pilih", ...pilihKata(118, ["32, 34, 37, 45", "45, 37, 34, 32", "32, 37, 34, 45"], 9))),
    k(SUARA_N3, sorotkan(idx(SUARA_N3, "Empat"), "od1-k", "od1-t")),
    k(SUARA_N4, redamkan(0, "od1-k", "od1-t"), sorotkan(idx(SUARA_N4, "Sisanya"), "od0-k", "od0-t", "od2-k", "od2-t", "od3-k", "od3-t")),
    k(
      SUARA_N5,
      redamkan(0, "od0-k", "od0-t", "od2-k", "od2-t", "od3-k", "od3-t"),
      geser(idx(SUARA_N5, "adalah"), 2, 0),
      geser(idx(SUARA_N5, "adalah"), 0, 1),
      geser(idx(SUARA_N5, "adalah"), 3, 2),
      geser(idx(SUARA_N5, "adalah"), 1, 3),
      tambah(idx(SUARA_N5, "adalah"), ex("32 < 34 < 37 < 45", "ex", 150, 108, 14)),
    ),
    k(SUARA_N6, sorotkan(0, "c1-k", "c1-t"), tambah("Hebat!", emo("ok", 150, 196, "✅", 18))),
  ],
};

/* ------------------------------ Penutup ------------------------------ */
const SUARA_E1 = "Hari ini kita sudah belajar membandingkan bilangan. Kita mulai dengan menebak, lalu menghitung untuk membuktikan.";
const SUARA_E2 = "Kita membandingkan puluhan dulu. Kalau puluhannya sama, baru kita lihat satuannya.";
const SUARA_E3 = "Kalau satuannya sudah sepuluh atau lebih, kita tukar dulu menjadi puluhan.";
const SUARA_E4 = "Kita juga memakai tiga tanda dan bisa mengurutkan bilangan dari yang paling kecil atau paling besar.";
const SUARA_E5 = "Kerja bagus! Sampai jumpa lagi di video berikutnya.";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Ringkasan dan penutup",
  sumber: "Materi: ringkasan membandingkan bilangan",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_E1, tambah(0, judul("Yang kita pelajari")), tambah("menebak,", ...kartu("r1", 20, 34, 260, 32, W.hijauMuda, ["1. tebak, lalu hitung"], 10))),
    k(SUARA_E2, tambah("Kita", ...kartu("r2", 20, 74, 260, 32, W.krem, ["2. puluhan dulu, lalu satuan"], 10))),
    k(SUARA_E3, tambah("sepuluh", ...kartu("r3", 20, 114, 260, 32, W.pink, ["3. tukar 10 satuan jadi 1 puluhan"], 10))),
    k(SUARA_E4, tambah("tanda", ...kartu("r4", 20, 154, 260, 32, W.langit, ["4. tiga tanda dan mengurutkan"], 10))),
    k(SUARA_E5, bersih(0), tambah(0, judul("Kerja bagus!")), tambah(0, emo("pe", 150, 110, "\u{1F389}", 54), emo("ow", 262, 170, OWL, 28))),
  ],
};
