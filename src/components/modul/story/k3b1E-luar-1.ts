import type { AdeganStory, Obj } from "./logika-story";
import { EMO, MIN, OWL, W, buatSusun, emo, judul, kartu, teks } from "./k3b1E-gambar";
import { bersih, hapus, idPilihan, idx, k, pilihKata, redamkan, sorotkan, tambah, ubah } from "./k3b1E-bantu";

export const NAMA_METODE_ID = ["Pengurangan Bersusun", "Menghitung Naik", "Meminjam"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 4, 288, 22, WARNA_METODE[i], [`Metode ${i + 1}: ${NAMA_METODE_ID[i]}`], 8.8);

const cap = (isi: string) => teks("cp", 150, 198, isi, 10.5, W.merah);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara punya cara lain untuk belajar pengurangan. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Tiga metode itu bernama Pengurangan Bersusun, Menghitung Naik, dan Meminjam.";
const SUARA_O3 = "Semua metode ini menjawab satu pertanyaan. Bagaimana cara mengurangkan dengan mudah dan tepat?";
const SUARA_O4 = "Kita memakai gambar di layar. Kamu cukup mengetuk, melihat dengan teliti, dan memilih jawaban.";
const SUARA_O5 = "Ada yang mulai dari satuan, ada yang naik dari bilangan kecil, dan ada yang membuka satu puluhan. Siap? Ayo kita mulai dengan metode pertama.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk pengurangan",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Tiga metode dari luar")), tambah(idx(SUARA_O1, "negara"), emo("gl", 150, 110, "\u{1F30D}", 50)), tambah(idx(SUARA_O1, "tiga"), ...kartu("pk", 50, 140, 200, 32, W.emas, ["3 metode dari luar"], 11))),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga metode")),
      tambah(idx(SUARA_O2, "Pengurangan"), ...kartu("m0", 20, 40, 260, 38, WARNA_METODE[0], [`1. ${NAMA_METODE_ID[0]}`], 11)),
      tambah(idx(SUARA_O2, "Menghitung"), ...kartu("m1", 20, 88, 260, 38, WARNA_METODE[1], [`2. ${NAMA_METODE_ID[1]}`], 11)),
      tambah(idx(SUARA_O2, "Meminjam."), ...kartu("m2", 20, 136, 260, 38, WARNA_METODE[2], [`3. ${NAMA_METODE_ID[2]}`], 11)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Satu pertanyaan")),
      tambah(idx(SUARA_O3, "satu"), emo("i1", 60, 84, "➖", 34), emo("i2", 150, 84, "❓", 34), emo("i3", 240, 84, "\u{1F440}", 34)),
      tambah(idx(SUARA_O3, "Bagaimana"), ...kartu("iq", 20, 112, 260, 52, W.emas, ["bagaimana cara mengurangkan", "dengan mudah dan tepat?"], 10)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Alat bantu hari ini")),
      tambah(idx(SUARA_O4, "layar."), emo("a1", 70, 100, "\u{1F4E6}", 36), emo("a2", 150, 100, "\u{1F522}", 36), emo("a3", 230, 100, "\u{1F4CF}", 36)),
      tambah(idx(SUARA_O4, "mengetuk,"), emo("tg", 150, 150, "\u{1F446}", 24)),
      tambah(idx(SUARA_O4, "memilih"), teks("al-t", 150, 184, "ketuk, lihat, lalu pilih", 10, W.ungu)),
    ),
    k(
      SUARA_O5,
      bersih(0),
      tambah(0, judul("Susun, naik, dan buka")),
      tambah(idx(SUARA_O5, "mulai"), teks("kt0", 150, 70, "mulai dari satuan", 14, W.ungu)),
      tambah(idx(SUARA_O5, "naik"), teks("kt1", 150, 100, "naik dari bilangan kecil", 14, W.ungu)),
      tambah(idx(SUARA_O5, "membuka"), teks("kt2", 150, 130, "membuka satu puluhan", 14, W.ungu)),
      tambah(idx(SUARA_O5, "pertama."), emo("ow", 150, 182, OWL, 30)),
    ),
  ],
};

/* ------------------------------ 2. Pengurangan Bersusun: konsep ------------------------------ */
const SB = buatSusun(73, 28);
const SUARA_B1 = "Metode pertama bernama Pengurangan Bersusun. Bilangan disusun ke bawah, puluhan lurus dengan puluhan dan satuan lurus dengan satuan.";
const SUARA_B2 = "Kita mulai dari satuan. Tiga kurang dari delapan, jadi kita ambil satu puluhan dari tujuh puluhan.";
const SUARA_B3 = "Tiga belas dikurangi delapan sama dengan lima.";
const SUARA_B4 = "Lanjut ke puluhan. Enam dikurangi dua sama dengan empat.";
const SUARA_B5 = "Itulah Pengurangan Bersusun. Mulai dari satuan, ambil satu puluhan jika perlu, lalu kurangkan puluhan.";

export const ADEGAN_LUAR_SUSUN: AdeganStory = {
  id: "luar-susun",
  judul: "Pengurangan Bersusun: mulai dari satuan",
  sumber: "Metode luar: Pengurangan Bersusun",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_B1, tambah(0, ...kepala(0)), tambah(idx(SUARA_B1, "Bilangan"), ...SB.kerangka()), tambah(idx(SUARA_B1, "disusun"), ...SB.atas()), tambah(idx(SUARA_B1, "bawah,"), ...SB.bawah())),
    k(SUARA_B2, sorotkan(idx(SUARA_B2, "satuan."), "sg-a0", "sg-b0"), tambah(idx(SUARA_B2, "ambil"), ...SB.coret(), SB.puluhBaru(), SB.satuBaru())),
    k(SUARA_B3, redamkan(0, "sg-a0", "sg-b0"), tambah(idx(SUARA_B3, "lima."), SB.hasil0())),
    k(SUARA_B4, sorotkan(idx(SUARA_B4, "puluhan."), "sg-a1", "sg-b1"), tambah(idx(SUARA_B4, "empat."), SB.hasil1())),
    k(SUARA_B5, redamkan(0, "sg-a1", "sg-b1"), tambah(idx(SUARA_B5, "Mulai"), ...kartu("rk", 30, 156, 240, 28, W.emas, ["mulai dari satuan, ambil jika perlu"], 9.5)), tambah(idx(SUARA_B5, "kurangkan"), cap(`73 ${MIN} 28 = 45`))),
  ],
};

/* ------------------------------ 3. Pengurangan Bersusun: terapan ------------------------------ */
const ST = buatSusun(56, 29);
const SUARA_R1 = "Terapkan pada soal ini. Igil punya lima puluh enam balon, dan dua puluh sembilan balon pecah.";
const SUARA_R2 = "Berapa sisa balon Igil? Ketuk jawaban yang tepat.";
const SUARA_R3 = "Betul! Enam kurang dari sembilan, jadi kita ambil satu puluhan. Enam belas dikurangi sembilan sama dengan tujuh, dan empat dikurangi dua sama dengan dua.";
const SUARA_R4 = "Dengan Pengurangan Bersusun, kita selalu mulai dari satuan. Sisa balon Igil dua puluh tujuh.";

export const ADEGAN_LUAR_SUSUN_TERAPAN: AdeganStory = {
  id: "luar-susun-terapan",
  judul: "Pengurangan Bersusun: balon Igil",
  sumber: "Metode luar: Pengurangan Bersusun",
  latar: "#ECFCCB",
  ketukan: [
    k(SUARA_R1, tambah(0, ...kepala(0)), tambah(idx(SUARA_R1, "Terapkan"), ...ST.kerangka()), tambah(idx(SUARA_R1, "enam"), ...ST.atas()), tambah(idx(SUARA_R1, "balon,"), emo("bl", 225, 108, EMO.balon, 34)), tambah(idx(SUARA_R1, "sembilan"), ...ST.bawah())),
    k(SUARA_R2, tambah(idx(SUARA_R2, "Berapa"), teks("tanya", 205, 64, `berapa 56 ${MIN} 29?`, 12, W.ungu)), tambah(idx(SUARA_R2, "jawaban"), ...pilihKata(150, ["37", "27", "35"], 16))),
    k(SUARA_R3, sorotkan(idx(SUARA_R3, "Betul!"), "c2-k"), tambah(idx(SUARA_R3, "ambil"), ...ST.coret(), ST.puluhBaru(), ST.satuBaru()), tambah(idx(SUARA_R3, "tujuh,"), ST.hasil0()), tambah(idx(SUARA_R3, "dua", 2), ST.hasil1())),
    k(SUARA_R4, redamkan(0, "c2-k"), hapus(0, "tanya", ...idPilihan(3)), tambah(idx(SUARA_R4, "Sisa"), cap(`56 ${MIN} 29 = 27`))),
  ],
};

/* ------------------------------ 9. Ringkasan metode luar ------------------------------ */
const SUARA_Y1 = "Mari kita ringkas tiga metode dari luar. Semuanya membantu kita mengurangkan dengan tepat.";
const SUARA_Y2 = "Metode Pengurangan Bersusun, mulai dari satuan dan ambil satu puluhan jika perlu.";
const SUARA_Y3 = "Metode Menghitung Naik, naik dari bilangan yang dikurangi sampai bilangan semula.";
const SUARA_Y4 = "Metode Meminjam, membuka satu puluhan menjadi sepuluh satuan.";
const SUARA_Y5 = "Pilih metode yang kamu suka, lalu periksa dengan metode lain. Hasilnya harus sama.";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Metode luar: ringkasan",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Y1, tambah(0, judul("Ringkasan")), tambah(idx(SUARA_Y1, "ringkas"), ...kartu("r0", 14, 34, 272, 30, W.emas, ["3 metode dari luar"], 11))),
    k(SUARA_Y2, tambah(idx(SUARA_Y2, "Pengurangan"), ...kartu("r1", 14, 72, 272, 34, WARNA_METODE[0], [NAMA_METODE_ID[0], "mulai dari satuan, ambil jika perlu"], 9.2))),
    k(SUARA_Y3, tambah(idx(SUARA_Y3, "Menghitung"), ...kartu("r2", 14, 114, 272, 34, WARNA_METODE[1], [NAMA_METODE_ID[1], "naik sampai bilangan semula"], 9.2))),
    k(SUARA_Y4, tambah(idx(SUARA_Y4, "Meminjam,"), ...kartu("r3", 14, 156, 272, 34, WARNA_METODE[2], [NAMA_METODE_ID[2], "buka puluhan jadi 10 satuan"], 9.2))),
    k(SUARA_Y5, bersih(0), tambah(0, judul("Hasilnya harus sama"), emo("rw", 150, 100, OWL, 54)), tambah(idx(SUARA_Y5, "sama."), emo("rk", 150, 160, "✅", 30))),
  ],
};

void ubah;
