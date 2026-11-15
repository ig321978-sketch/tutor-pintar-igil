import type { AdeganStory, Obj } from "./logika-story";
import { OWL, W, bendaBagi, emo, hasilBagi, jalur, judul, kartu, labelBagian, lingkaranPoli, persegiPanjang, tarik, teks, titikTengah } from "./k2b5A-gambar";
import type { Titik } from "./k2b5A-gambar";
import { bersih, hapus, idx, k, pilihKata, redamkan, sorotkan, tambah, ubah } from "./k2b5A-bantu";

export const NAMA_METODE_ID = ["Setengah Benda Utuh", "Bagian Sama", "Uji Lipat"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`Metode ${i + 1}: ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara punya cara lain untuk belajar setengah. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Tiga metode itu bernama Setengah Benda Utuh, Bagian Sama, dan satu lagi, Uji Lipat.";
const SUARA_O3 = "Semua metode ini menjawab satu pertanyaan. Bagaimana cara menemukan setengah dengan benar?";
const SUARA_O4 = "Kita memakai benda di layar. Kamu cukup mengetuk, melihat dengan teliti, dan memeriksa garis potong.";
const SUARA_O5 = "Setengah artinya dua bagian sama besar. Siap? Ayo kita mulai dengan metode pertama.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk setengah",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Tiga metode dari luar")), tambah("negara", emo("gl", 150, 110, "\u{1F30D}", 50)), tambah("tiga", ...kartu("pk", 50, 140, 200, 32, W.emas, ["3 metode dari luar"], 11))),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga metode")),
      tambah(idx(SUARA_O2, "Setengah"), ...kartu("m0", 20, 40, 260, 38, WARNA_METODE[0], [`1. ${NAMA_METODE_ID[0]}`], 11)),
      tambah(idx(SUARA_O2, "Bagian"), ...kartu("m1", 20, 88, 260, 38, WARNA_METODE[1], [`2. ${NAMA_METODE_ID[1]}`], 11)),
      tambah(idx(SUARA_O2, "Uji"), ...kartu("m2", 20, 136, 260, 38, WARNA_METODE[2], [`3. ${NAMA_METODE_ID[2]}`], 11)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Satu pertanyaan")),
      tambah("satu", emo("i1", 60, 84, "\u{1F370}", 34), emo("i2", 150, 84, "❓", 34), emo("i3", 240, 84, "\u{1F440}", 34)),
      tambah("Bagaimana", ...kartu("iq", 20, 112, 260, 52, W.emas, ["bagaimana cara menemukan", "setengah dengan benar?"], 10)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Alat bantu hari ini")),
      tambah("benda", jalur("al0", lingkaranPoli(70, 92, 20), "#FBBF24"), jalur("al1", persegiPanjang(120, 74, 56, 36), "#FDE68A"), emo("al2", 232, 104, "\u{1F349}", 34)),
      tambah("mengetuk,", emo("tg", 160, 142, "\u{1F446}", 22)),
      tambah("memeriksa", teks("al-t", 150, 182, "garis potong di layar", 10, W.ungu)),
    ),
    k(
      SUARA_O5,
      bersih(0),
      tambah(0, judul("Dua bagian sama besar")),
      tambah("Setengah", teks("kt0", 150, 74, "satu benda utuh", 14, W.ungu), teks("kt1", 150, 104, "dua bagian sama besar", 14, W.ungu)),
      tambah(idx(SUARA_O5, "pertama."), emo("ow", 150, 172, OWL, 30)),
    ),
  ],
};

/* ------------------------------ 2. Setengah Benda Utuh: konsep ------------------------------ */
const POLI_ROTI = persegiPanjang(90, 64, 120, 62);
const ROTI_ATAS: Titik = [150, 56];
const ROTI_BAWAH: Titik = [150, 134];
const RT = bendaBagi(1, POLI_ROTI, ROTI_ATAS, ROTI_BAWAH, "#FDE68A");
const SUARA_V1 = "Metode pertama bernama Setengah Benda Utuh. Kita mulai dari satu benda utuh.";
const SUARA_V2 = "Langkah pertama, bagi benda menjadi dua bagian. Garis potong lewat tepat di tengah.";
const SUARA_V3 = "Langkah kedua, periksa kedua bagian. Keduanya sama besar.";
const SUARA_V4 = "Langkah ketiga, sebut setiap bagian. Setiap bagian adalah setengah roti.";
const SUARA_V5 = "Jadi bagi benda menjadi dua bagian sama besar, lalu sebut bagiannya setengah.";

export const ADEGAN_LUAR_SETENGAH: AdeganStory = {
  id: "luar-setengah",
  judul: "Setengah Benda Utuh: bagi jadi dua",
  sumber: "Metode luar: Setengah Benda Utuh",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_V1, tambah(0, ...kepala(0)), tambah(idx(SUARA_V1, "benda", 2), RT.w), tambah(idx(SUARA_V1, "utuh."), teks("nm", 150, 150, "roti", 10, W.coklat))),
    k(SUARA_V2, hapus(0, "nm"), tambah(idx(SUARA_V2, "bagi"), RT.gp, titikTengah(1, POLI_ROTI)), hapus(idx(SUARA_V2, "menjadi"), "bn1-w"), tambah(idx(SUARA_V2, "menjadi"), RT.a, RT.b)),
    k(SUARA_V3, ubah(idx(SUARA_V3, "periksa"), ...tarik(1, ROTI_ATAS, ROTI_BAWAH, 8)), tambah(idx(SUARA_V3, "sama"), hasilBagi(1, 150, 158, "sama besar"))),
    k(SUARA_V4, tambah(idx(SUARA_V4, "setengah"), ...labelBagian(1, POLI_ROTI, ROTI_ATAS, ROTI_BAWAH, "setengah", "setengah", 8)), ubah(idx(SUARA_V4, "setengah"), { id: "bn1-hs", isi: "setengah" })),
    k(SUARA_V5, tambah(idx(SUARA_V5, "Jadi"), ...kartu("vr", 30, 172, 240, 24, W.emas, ["dua bagian sama besar: setengah"], 10))),
  ],
};

/* ------------------------------ 3. Setengah Benda Utuh: terapan ------------------------------ */
const POLI_PIZZA = lingkaranPoli(150, 92, 40);
const PIZZA_ATAS = POLI_PIZZA[30];
const PIZZA_BAWAH = POLI_PIZZA[10];
const PZ = bendaBagi(1, POLI_PIZZA, PIZZA_ATAS, PIZZA_BAWAH, "#FDBA74", "#FCA5A5", "#FDE68A");
const SUARA_W1 = "Terapkan pada soal ini. Upe punya sebuah pizza di layar. Garis potong lewat tepat di tengah.";
const SUARA_W2 = "Pizza terbagi menjadi dua bagian sama besar. Apa nama satu bagian itu? Ketuk jawaban yang tepat.";
const SUARA_W3 = "Betul! Satu bagian adalah setengah pizza. Hebat!";
const SUARA_W4 = "Dua bagian sama besar, jadi tiap bagian adalah setengah.";

export const ADEGAN_LUAR_SETENGAH_TERAPAN: AdeganStory = {
  id: "luar-setengah-terapan",
  judul: "Setengah Benda Utuh: pizza Upe",
  sumber: "Metode luar: Setengah Benda Utuh",
  latar: "#ECFCCB",
  ketukan: [
    k(SUARA_W1, tambah(0, ...kepala(0)), tambah(idx(SUARA_W1, "pizza"), PZ.w), tambah(idx(SUARA_W1, "Garis"), PZ.gp)),
    k(SUARA_W2, hapus(idx(SUARA_W2, "menjadi"), "bn1-w"), tambah(idx(SUARA_W2, "menjadi"), PZ.a, PZ.b), tambah(idx(SUARA_W2, "jawaban"), ...pilihKata(150, ["setengah", "dua", "utuh"], 12))),
    k(SUARA_W3, sorotkan(idx(SUARA_W3, "Betul!"), "c1-k"), sorotkan(idx(SUARA_W3, "Satu"), "bn1-a"), ubah(idx(SUARA_W3, "setengah"), ...tarik(1, PIZZA_ATAS, PIZZA_BAWAH, 6))),
    k(SUARA_W4, redamkan(0, "bn1-a", "c1-k"), tambah(idx(SUARA_W4, "tiap"), ...labelBagian(1, POLI_PIZZA, PIZZA_ATAS, PIZZA_BAWAH, "setengah", "setengah", 6, 8))),
  ],
};

/* ------------------------------ 4. Ringkasan metode luar ------------------------------ */
const SUARA_R1 = "Mari kita ringkas tiga metode dari luar. Semuanya membantu kita menemukan setengah.";
const SUARA_R2 = "Metode Setengah Benda Utuh, bagi benda menjadi dua bagian sama.";
const SUARA_R3 = "Metode Bagian Sama, setengah hanya jika bagian sama besar.";
const SUARA_R4 = "Metode Uji Lipat, lipat membuktikan dua bagian sama.";
const SUARA_R5 = "Pilih metode yang kamu suka, lalu periksa dengan metode lain. Hasilnya harus sama.";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Metode luar: ringkasan",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_R1, tambah(0, judul("Ringkasan")), tambah(idx(SUARA_R1, "ringkas"), ...kartu("r0", 14, 34, 272, 30, W.emas, ["3 metode dari luar"], 11))),
    k(SUARA_R2, tambah(idx(SUARA_R2, "Setengah"), ...kartu("r1", 14, 72, 272, 34, WARNA_METODE[0], [NAMA_METODE_ID[0], "bagi benda jadi dua"], 9.2))),
    k(SUARA_R3, tambah(idx(SUARA_R3, "Bagian"), ...kartu("r2", 14, 114, 272, 34, WARNA_METODE[1], [NAMA_METODE_ID[1], "setengah hanya jika sama besar"], 9.2))),
    k(SUARA_R4, tambah(idx(SUARA_R4, "Uji"), ...kartu("r3", 14, 156, 272, 34, WARNA_METODE[2], [NAMA_METODE_ID[2], "lipat membuktikan dua bagian sama"], 9.2))),
    k(SUARA_R5, bersih(0), tambah(0, judul("Hasilnya harus sama"), emo("rw", 150, 100, OWL, 54)), tambah(idx(SUARA_R5, "sama."), emo("rk", 150, 160, "✅", 30))),
  ],
};
