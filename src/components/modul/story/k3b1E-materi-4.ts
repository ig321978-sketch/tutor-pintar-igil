import type { AdeganStory } from "./logika-story";
import { EMO, MIN, OWL, W, buatSusun, emo, judul, kartu, teks } from "./k3b1E-gambar";
import { hapus, idPilihan, idx, k, pilihKata, redamkan, sorotkan, tambah, ubah } from "./k3b1E-bantu";

const cap = (isi: string) => teks("cp", 150, 198, isi, 10.5, W.merah);
const tanya = (isi: string) => teks("tanya", 205, 64, isi, 12, W.ungu);

/* ------------------------------ 15. Latihan 1: tanpa mengambil ------------------------------ */
const S1 = buatSusun(57, 23);
const SUARA_A1 = "Latihan satu. Upe punya lima puluh tujuh ikan di kolam, lalu dua puluh tiga ikan dipindahkan ke kolam lain.";
const SUARA_A2 = "Berapa sisa ikan Upe? Ketuk jawaban yang tepat.";
const SUARA_A3 = "Betul! Tujuh dikurangi tiga sama dengan empat, dan lima dikurangi dua sama dengan tiga.";
const SUARA_A4 = "Satuan atas cukup, jadi kita tidak perlu mengambil satu puluhan.";

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan 1: ikan Upe",
  sumber: "Materi: Latihan 1",
  latar: "#FEF2F2",
  ketukan: [
    k(SUARA_A1, tambah(0, judul("Latihan 1"), ...S1.kerangka()), tambah(idx(SUARA_A1, "tujuh"), ...S1.atas()), tambah(idx(SUARA_A1, "tiga"), ...S1.bawah()), tambah(idx(SUARA_A1, "ikan"), emo("ik", 225, 108, EMO.ikan, 34))),
    k(SUARA_A2, tambah(idx(SUARA_A2, "Berapa"), tanya(`berapa 57 ${MIN} 23?`)), tambah(idx(SUARA_A2, "jawaban"), ...pilihKata(150, ["24", "34", "44"], 16))),
    k(SUARA_A3, sorotkan(idx(SUARA_A3, "Betul!"), "c2-k"), tambah(idx(SUARA_A3, "empat,"), S1.hasil0()), tambah(idx(SUARA_A3, "tiga", 2), S1.hasil1()), tambah(idx(SUARA_A3, "dikurangi", 2), cap(`57 ${MIN} 23 = 34`))),
    k(SUARA_A4, redamkan(0, "c2-k"), hapus(0, "tanya", ...idPilihan(3)), tambah(idx(SUARA_A4, "cukup,"), emo("ok", 225, 64, "✅", 28))),
  ],
};

/* ------------------------------ 16. Latihan 2: mengambil satu puluhan ------------------------------ */
const S2 = buatSusun(63, 27);
const SUARA_B1 = "Latihan dua. Wei punya enam puluh tiga kelereng, lalu dua puluh tujuh kelereng ia berikan kepada Halim.";
const SUARA_B2 = "Berapa sisa kelereng Wei? Ketuk jawaban yang tepat.";
const SUARA_B3 = "Betul! Tiga kurang dari tujuh, jadi kita ambil satu puluhan. Tiga belas dikurangi tujuh sama dengan enam.";
const SUARA_B4 = "Puluhan: lima dikurangi dua sama dengan tiga. Jadi sisa kelereng Wei tiga puluh enam.";
const SUARA_B5 = "Kita periksa. Tiga puluh enam ditambah dua puluh tujuh sama dengan enam puluh tiga.";

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan 2: kelereng Wei",
  sumber: "Materi: Latihan 2",
  latar: "#FEFCE8",
  ketukan: [
    k(SUARA_B1, tambah(0, judul("Latihan 2"), ...S2.kerangka()), tambah(idx(SUARA_B1, "tiga"), ...S2.atas()), tambah(idx(SUARA_B1, "tujuh"), ...S2.bawah()), tambah(idx(SUARA_B1, "kelereng", 2), emo("kl", 225, 108, EMO.kelereng, 34))),
    k(SUARA_B2, tambah(idx(SUARA_B2, "Berapa"), tanya(`berapa 63 ${MIN} 27?`)), tambah(idx(SUARA_B2, "jawaban"), ...pilihKata(150, ["46", "56", "36"], 16))),
    k(SUARA_B3, sorotkan(idx(SUARA_B3, "Betul!"), "c3-k"), tambah(idx(SUARA_B3, "ambil"), ...S2.coret(), S2.puluhBaru(), S2.satuBaru()), tambah(idx(SUARA_B3, "enam."), S2.hasil0())),
    k(SUARA_B4, redamkan(0, "c3-k"), hapus(0, "tanya", ...idPilihan(3)), tambah(idx(SUARA_B4, "tiga."), S2.hasil1()), tambah(idx(SUARA_B4, "Jadi"), cap(`63 ${MIN} 27 = 36`))),
    k(SUARA_B5, ubah(idx(SUARA_B5, "ditambah"), { id: "cp", isi: "36 + 27 = 63" }), sorotkan(idx(SUARA_B5, "periksa."), "sg-r1", "sg-r0")),
  ],
};

/* ------------------------------ 17. Latihan 3: jawaban yang keliru ------------------------------ */
const S3 = buatSusun(71, 38);
const SUARA_C1 = "Latihan tiga. Igil mengurangkan tujuh puluh satu dengan tiga puluh delapan.";
const SUARA_C2 = "Igil menjawab empat puluh tujuh, karena delapan dikurangi satu sama dengan tujuh. Berapa jawaban yang tepat? Ketuk jawaban.";
const SUARA_C3 = "Betul! Satu kurang dari delapan, jadi kita ambil satu puluhan. Sebelas dikurangi delapan sama dengan tiga.";
const SUARA_C4 = "Puluhan: enam dikurangi tiga sama dengan tiga. Jadi jawabannya tiga puluh tiga.";
const SUARA_C5 = "Periksa: tiga puluh tiga ditambah tiga puluh delapan sama dengan tujuh puluh satu. Hasilnya benar.";

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan 3: jawaban Igil",
  sumber: "Materi: Latihan 3",
  latar: "#F0FDFA",
  ketukan: [
    k(SUARA_C1, tambah(0, judul("Latihan 3"), ...S3.kerangka()), tambah(idx(SUARA_C1, "satu"), ...S3.atas()), tambah(idx(SUARA_C1, "delapan."), ...S3.bawah())),
    k(SUARA_C2, tambah(idx(SUARA_C2, "tujuh,"), emo("ig", 225, 108, "\u{1F914}", 34)), tambah(idx(SUARA_C2, "Berapa"), tanya(`berapa 71 ${MIN} 38?`)), tambah(idx(SUARA_C2, "jawaban", 2), ...pilihKata(150, ["33", "47", "43"], 16))),
    k(SUARA_C3, sorotkan(idx(SUARA_C3, "Betul!"), "c1-k"), tambah(idx(SUARA_C3, "ambil"), ...S3.coret(), S3.puluhBaru(), S3.satuBaru()), tambah(idx(SUARA_C3, "tiga."), S3.hasil0())),
    k(SUARA_C4, redamkan(0, "c1-k"), hapus(0, "tanya", "ig", ...idPilihan(3)), tambah(idx(SUARA_C4, "tiga", 2), S3.hasil1())),
    k(SUARA_C5, tambah(idx(SUARA_C5, "ditambah"), cap("33 + 38 = 71")), tambah(idx(SUARA_C5, "benar."), emo("ok", 225, 108, "✅", 28))),
  ],
};

/* ------------------------------ 18. Penutup ------------------------------ */
const SUARA_Z1 = "Hari ini kita sudah belajar pengurangan sampai seratus.";
const SUARA_Z2 = "Kita belajar susun pendek, mengambil satu puluhan, dan susun panjang.";
const SUARA_Z3 = "Jika satuan atas kurang, ambil satu puluhan, lalu periksa hasilnya dengan penjumlahan.";
const SUARA_Z4 = "Kamu hebat! Sampai jumpa di video berikutnya, dan tetap semangat berlatih.";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Rangkuman pengurangan",
  sumber: "Materi: penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Rangkuman")), tambah(idx(SUARA_Z1, "pengurangan"), ...kartu("z0", 30, 40, 240, 34, W.emas, ["pengurangan sampai seratus"], 11))),
    k(SUARA_Z2, tambah(idx(SUARA_Z2, "susun"), ...kartu("z1", 30, 82, 240, 28, W.hijauMuda, ["susun pendek"], 10.5)), tambah(idx(SUARA_Z2, "mengambil"), ...kartu("z2", 30, 116, 240, 28, W.merahMuda, ["mengambil satu puluhan"], 10.5)), tambah(idx(SUARA_Z2, "panjang."), ...kartu("z3", 30, 150, 240, 28, W.langit, ["susun panjang"], 10.5))),
    k(SUARA_Z3, tambah(idx(SUARA_Z3, "periksa"), emo("pe", 150, 196, "\u{1F501}", 18)), sorotkan(idx(SUARA_Z3, "kurang,"), "z2-k")),
    k(SUARA_Z4, redamkan(0, "z2-k"), tambah(idx(SUARA_Z4, "hebat!"), emo("ow", 275, 40, OWL, 34))),
  ],
};
