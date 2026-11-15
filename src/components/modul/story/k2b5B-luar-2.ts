import type { AdeganStory } from "./logika-story";
import { OWL, W, benda, emo, hasil, judul, kartu, kartuBilangan, kepalaGenap, meja, persamaan, tanda, tempat } from "./k2b5B-gambar";
import { bersih, bersihMeja, duaTempat, geser, hapusKartu, idx, k, mejaSekaligus, pilihKata, pindah, sorotkan, tambah, ubah, urutKata } from "./k2b5B-bantu";
import { gantian } from "./k2b5B-materi-2";
import { NAMA_METODE_ID, WARNA_METODE, kepala } from "./k2b5B-luar-1";

/* ------------------------------ 4. Bagi Rata Kumpulan ------------------------------ */
const SUARA_W1 = "Metode kedua bernama Bagi Rata Kumpulan. Bagi benda menjadi dua bagian sama banyak.";
const SUARA_W2 = "Halim punya enam ikan. Kita masukkan ikan itu ke dua tempat, satu demi satu.";
const SUARA_W3 = "Kiri, kanan, kiri, kanan, kiri, kanan.";
const SUARA_W4 = "Sekarang keduanya sama banyak, yaitu tiga ikan.";
const SUARA_W5 = "Bagi rata berarti kedua bagian harus sama banyak.";

export const ADEGAN_LUAR_BAGIRATA: AdeganStory = {
  id: "luar-bagirata",
  judul: "Bagi Rata Kumpulan: dua bagian sama banyak",
  sumber: "Metode luar: Bagi Rata Kumpulan",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_W1, tambah(0, ...kepala(1)), tambah(idx(SUARA_W1, "Bagi", 2), ...kartu("kk", 30, 76, 240, 44, W.langit, ["bagi benda jadi", "dua bagian sama banyak"], 11))),
    k(SUARA_W2, tambah(0, meja()), mejaSekaligus(idx(SUARA_W2, "enam"), 6, "ikan"), duaTempat(idx(SUARA_W2, "tempat,"), "Kiri", "Kanan"), { at: 0, hapus: ["kk-k", "kk-t0", "kk-t1"] }),
    k(SUARA_W3, ...pindah("ikan", 6, gantian(SUARA_W3, 6))),
    k(SUARA_W4, bersihMeja(0), tambah(idx(SUARA_W4, "keduanya"), tanda(true))),
    k(SUARA_W5, tambah(idx(SUARA_W5, "Bagi"), ...hasil("hs", "bagi rata: sama banyak", W.langit))),
  ],
};

/* ------------------------------ 5. Bagi Rata Kumpulan: terapan ------------------------------ */
const SUARA_X1 = "Sekarang giliranmu. Wei membagi delapan bola menjadi tiga bola dan lima bola.";
const SUARA_X2 = "Apakah pembagian ini sudah rata? Ketuk jawabanmu.";
const SUARA_X3 = "Betul, belum rata! Tiga dan lima tidak sama banyak.";
const SUARA_X4 = "Pindahkan satu dari kanan ke kiri, maka keduanya jadi empat bola. Itu baru bagi rata.";

export const ADEGAN_LUAR_BAGIRATA_TERAPAN: AdeganStory = {
  id: "luar-bagirata-terapan",
  judul: "Bagi Rata Kumpulan: memeriksa pembagian",
  sumber: "Metode luar: Bagi Rata Kumpulan, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_X1,
      tambah(0, ...kepala(1)),
      tambah(idx(SUARA_X1, "membagi"), tempat("pa", "Kiri", 3), tempat("pb", "Kanan", 5)),
      tambah(idx(SUARA_X1, "tiga"), [0, 1, 2].map((i) => benda("pa", i, "bola", 8))),
      tambah(idx(SUARA_X1, "lima"), [0, 1, 2, 3, 4].map((i) => benda("pb", i, "bola", 8))),
    ),
    k(SUARA_X2, tambah(idx(SUARA_X2, "Ketuk"), ...pilihKata(38, ["bagi rata", "belum rata"], 11))),
    k(SUARA_X3, sorotkan(idx(SUARA_X3, "Betul"), "c2-k"), tambah(idx(SUARA_X3, "Tiga"), tanda(false))),
    k(SUARA_X4, hapusKartu(0, 2), ...geser(idx(SUARA_X4, "kanan"), "bola", 8, "pb", 4, "pa", 3, 4, 4), ubah(idx(SUARA_X4, "keduanya"), { id: "tanda", isi: "✅" })),
  ],
};

/* ------------------------------ 6. Cek Genap ------------------------------ */
const SUARA_Y1 = "Metode ketiga bernama Cek Genap. Kumpulan genap mudah dibagi dua.";
const SUARA_Y2 = "Lihat bilangannya dulu. Dua, empat, enam, delapan, dan sepuluh adalah bilangan genap.";
const SUARA_Y3 = "Bilangan genap mudah dibagi dua. Contohnya, lima tambah lima sama dengan sepuluh.";
const SUARA_Y4 = "Bilangan ganjil seperti tiga, lima, tujuh, dan sembilan selalu tersisa satu.";
const SUARA_Y5 = "Jadi cek dulu: kalau genap, mudah dibagi dua. Kalau ganjil, pasti tersisa satu.";
const NAMA_GENAP = ["dua", "empat", "enam", "delapan", "sepuluh"];
const NAMA_GANJIL = ["tiga", "lima", "tujuh", "sembilan"];

export const ADEGAN_LUAR_CEK: AdeganStory = {
  id: "luar-cek",
  judul: "Cek Genap: kumpulan genap mudah dibagi dua",
  sumber: "Metode luar: Cek Genap",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_Y1, tambah(0, ...kepala(2)), tambah(idx(SUARA_Y1, "Kumpulan"), ...kartu("kk", 30, 76, 240, 44, W.pink, ["kumpulan genap", "mudah dibagi dua"], 11))),
    k(SUARA_Y2, { at: 0, hapus: ["kk-k", "kk-t0", "kk-t1"] }, tambah(idx(SUARA_Y2, "Lihat"), kepalaGenap()[0]), ...[2, 4, 6, 8, 10].map((n, i) => tambah(urutKata(SUARA_Y2, NAMA_GENAP, "dulu.")[i], kartuBilangan(n)))),
    k(SUARA_Y3, tambah(idx(SUARA_Y3, "Contohnya"), persamaan(5, 5, 10, 164))),
    k(SUARA_Y4, tambah(idx(SUARA_Y4, "ganjil"), kepalaGenap()[1]), ...[3, 5, 7, 9].map((n, i) => tambah(urutKata(SUARA_Y4, NAMA_GANJIL, "seperti")[i], kartuBilangan(n)))),
    k(SUARA_Y5, sorotkan(idx(SUARA_Y5, "genap,"), "gh1"), sorotkan(idx(SUARA_Y5, "ganjil,"), "gh2")),
  ],
};

/* ------------------------------ 7. Cek Genap: terapan ------------------------------ */
const SUARA_Z1 = "Sekarang giliranmu. Kira punya sembilan bintang di meja.";
const SUARA_Z2 = "Cek dulu bilangannya. Sembilan itu genap atau ganjil? Ketuk jawabanmu.";
const SUARA_Z3 = "Betul, sembilan itu ganjil! Jadi sembilan bintang tidak bisa dibagi dua sama banyak.";
const SUARA_Z4 = "Kalau Kira punya delapan bintang, delapan itu genap, jadi bisa dibagi dua sama banyak.";

export const ADEGAN_LUAR_CEK_TERAPAN: AdeganStory = {
  id: "luar-cek-terapan",
  judul: "Cek Genap: genap atau ganjil",
  sumber: "Metode luar: Cek Genap, terapan",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_Z1, tambah(0, ...kepala(2), meja()), mejaSekaligus(idx(SUARA_Z1, "sembilan"), 9, "bintang")),
    k(SUARA_Z2, tambah(idx(SUARA_Z2, "Ketuk"), ...pilihKata(128, ["genap", "ganjil"], 11))),
    k(SUARA_Z3, sorotkan(idx(SUARA_Z3, "Betul"), "c2-k"), tambah(idx(SUARA_Z3, "Jadi"), tanda(false))),
    k(SUARA_Z4, bersih(0), tambah(0, ...kepala(2), meja()), mejaSekaligus(idx(SUARA_Z4, "delapan", 1), 8, "bintang")),
  ],
};

/* ------------------------------ 8. Ringkasan ------------------------------ */
const SUARA_R1 = "Mari kita ingat lagi tiga metode dari luar.";
const SUARA_R2 = "Setengah Kumpulan: ambil setengah dari banyak benda.";
const SUARA_R3 = "Bagi Rata Kumpulan: bagi benda menjadi dua bagian sama banyak.";
const SUARA_R4 = "Cek Genap: kumpulan genap mudah dibagi dua.";
const SUARA_R5 = "Pilih cara yang paling mudah untukmu. Terima kasih, sampai jumpa!";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Ringkasan: tiga metode luar",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_R1, tambah(0, judul("Ringkasan tiga metode")), tambah(idx(SUARA_R1, "ingat"), emo("ib", 150, 110, "\u{1F4DD}", 44))),
    k(SUARA_R2, { at: 0, hapus: "ib" }, tambah(idx(SUARA_R2, "ambil"), ...kartu("r0", 14, 30, 272, 40, WARNA_METODE[0], [NAMA_METODE_ID[0], "ambil setengah dari banyak benda"], 9.2))),
    k(SUARA_R3, tambah(idx(SUARA_R3, "bagi"), ...kartu("r1", 14, 78, 272, 40, WARNA_METODE[1], [NAMA_METODE_ID[1], "dua bagian sama banyak"], 9.2))),
    k(SUARA_R4, tambah(idx(SUARA_R4, "kumpulan"), ...kartu("r2", 14, 126, 272, 40, WARNA_METODE[2], [NAMA_METODE_ID[2], "kumpulan genap mudah dibagi dua"], 9.2))),
    k(SUARA_R5, tambah(idx(SUARA_R5, "Terima"), emo("ow", 150, 190, OWL, 30))),
  ],
};
