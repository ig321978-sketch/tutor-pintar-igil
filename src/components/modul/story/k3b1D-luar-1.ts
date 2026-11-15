import type { AdeganStory, Obj } from "./logika-story";
import { OWL, W, emo, judul, kartu, susun, teks } from "./k3b1D-gambar";
import { E, bersih, e, hapus, idPilihan, idx, k, pilihKata, redamkan, sorotkan, tambah } from "./k3b1D-bantu";

export const NAMA_METODE_ID = ["Penjumlahan Bersusun", "Pasangan Bilangan", "Menghitung Maju"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`Metode ${i + 1}: ${NAMA_METODE_ID[i]}`], 8.8);

const cap = (isi: string) => teks("cp", 150, 198, isi, 10.5, W.merah);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara punya cara lain untuk belajar penjumlahan. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Tiga metode itu bernama Penjumlahan Bersusun, Pasangan Bilangan, dan Menghitung Maju.";
const SUARA_O3 = "Semua metode ini menjawab satu pertanyaan. Bagaimana cara menjumlahkan dengan cepat dan tepat?";
const SUARA_O4 = "Kita memakai gambar di layar. Kamu cukup mengetuk, melihat dengan teliti, dan memilih jawaban.";
const SUARA_O5 = "Ada yang menjumlahkan dari satuan, ada yang memecah bilangan, dan ada yang maju selangkah demi selangkah. Siap? Ayo kita mulai dengan metode pertama.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk penjumlahan",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Tiga metode dari luar")), tambah(idx(SUARA_O1, "negara"), emo("gl", 150, 110, "\u{1F30D}", 50)), tambah(idx(SUARA_O1, "tiga"), ...kartu("pk", 50, 140, 200, 32, W.emas, ["3 metode dari luar"], 11))),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga metode")),
      tambah(idx(SUARA_O2, "Penjumlahan"), ...kartu("m0", 20, 40, 260, 38, WARNA_METODE[0], [`1. ${NAMA_METODE_ID[0]}`], 11)),
      tambah(idx(SUARA_O2, "Pasangan"), ...kartu("m1", 20, 88, 260, 38, WARNA_METODE[1], [`2. ${NAMA_METODE_ID[1]}`], 11)),
      tambah(idx(SUARA_O2, "Menghitung"), ...kartu("m2", 20, 136, 260, 38, WARNA_METODE[2], [`3. ${NAMA_METODE_ID[2]}`], 11)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Satu pertanyaan")),
      tambah(idx(SUARA_O3, "satu"), emo("i1", 60, 84, "➕", 34), emo("i2", 150, 84, "❓", 34), emo("i3", 240, 84, "\u{1F440}", 34)),
      tambah(idx(SUARA_O3, "Bagaimana"), ...kartu("iq", 20, 112, 260, 52, W.emas, ["bagaimana cara menjumlahkan", "dengan cepat dan tepat?"], 10)),
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
      tambah(0, judul("Dari satuan, pasangan, dan maju")),
      tambah(idx(SUARA_O5, "satuan,"), teks("kt0", 150, 70, "dari satuan", 14, W.ungu)),
      tambah(idx(SUARA_O5, "memecah"), teks("kt1", 150, 100, "memecah bilangan", 14, W.ungu)),
      tambah(idx(SUARA_O5, "maju"), teks("kt2", 150, 130, "maju selangkah", 14, W.ungu)),
      tambah(idx(SUARA_O5, "pertama."), emo("ow", 150, 182, OWL, 30)),
    ),
  ],
};

/* ------------------------------ 2. Penjumlahan Bersusun: konsep ------------------------------ */
const A1 = susun(35, 48, 14);
const SUARA_B1 = "Metode pertama bernama Penjumlahan Bersusun. Bilangan disusun ke bawah, lalu dijumlahkan dari kolom satuan.";
const SUARA_B2 = `Susun ${e(35)} dan ${e(48)} ke bawah. Satuan di bawah satuan, puluhan di bawah puluhan.`;
const SUARA_B3 = `Mulai dari satuan. ${E(5)} ditambah ${e(8)} sama dengan ${e(13)}. Tulis ${e(3)}, simpan ${e(1)}.`;
const SUARA_B4 = `Lalu puluhan. ${E(1)} ditambah ${e(3)} ditambah ${e(4)} sama dengan ${e(8)}.`;
const SUARA_B5 = `Jadi ${e(35)} ditambah ${e(48)} sama dengan ${e(83)}. Metode ini selalu mulai dari satuan, dan menyimpan jika perlu.`;

export const ADEGAN_LUAR_BERSUSUN: AdeganStory = {
  id: "luar-bersusun",
  judul: "Penjumlahan Bersusun: mulai dari satuan",
  sumber: "Metode luar: Penjumlahan Bersusun",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_B1, tambah(0, ...kepala(0)), tambah(idx(SUARA_B1, "Bilangan"), emo("bs", 150, 112, "\u{1F4CB}", 44))),
    k(SUARA_B2, hapus(0, "bs"), tambah(0, ...A1.kepala()), tambah(idx(SUARA_B2, "Susun"), ...A1.atas()), tambah(idx(SUARA_B2, "dan"), ...A1.bawah())),
    k(SUARA_B3, tambah(idx(SUARA_B3, "Mulai"), A1.sorS()), tambah(idx(SUARA_B3, "Lima"), A1.eqS()), tambah(idx(SUARA_B3, "Tulis"), A1.hSatuan()), tambah(idx(SUARA_B3, "simpan"), A1.sim())),
    k(SUARA_B4, hapus(0, "ls-sor"), tambah(idx(SUARA_B4, "puluhan"), A1.sorT()), tambah(idx(SUARA_B4, "Satu"), A1.eqP()), tambah(idx(SUARA_B4, "delapan."), A1.hPuluhan())),
    k(SUARA_B5, hapus(0, "ls-sor"), tambah(idx(SUARA_B5, "sama"), cap("35 + 48 = 83"))),
  ],
};

/* ------------------------------ 3. Penjumlahan Bersusun: terapan ------------------------------ */
const A2 = susun(26, 38, 14);
const SUARA_R1 = `Terapkan pada soal ini. Kira menjumlahkan ${e(26)} dan ${e(38)} dengan penjumlahan bersusun.`;
const SUARA_R2 = "Berapa jumlahnya? Ketuk jawaban yang tepat.";
const SUARA_R3 = `Betul! Jumlahnya adalah ${e(64)}. Kita periksa langkahnya.`;
const SUARA_R4 = `Satuan: ${e(6)} ditambah ${e(8)} sama dengan ${e(14)}. Puluhan: ${e(1)} ditambah ${e(2)} ditambah ${e(3)} sama dengan ${e(6)}.`;

export const ADEGAN_LUAR_BERSUSUN_TERAPAN: AdeganStory = {
  id: "luar-bersusun-terapan",
  judul: "Penjumlahan Bersusun: soal Kira",
  sumber: "Metode luar: Penjumlahan Bersusun",
  latar: "#ECFCCB",
  ketukan: [
    k(SUARA_R1, tambah(0, ...kepala(0), ...A2.kepala()), tambah(idx(SUARA_R1, "Kira"), ...A2.atas()), tambah(idx(SUARA_R1, "dan"), ...A2.bawah())),
    k(SUARA_R2, tambah(idx(SUARA_R2, "Berapa"), teks("tanya", 150, 156, "berapa jumlahnya?", 12, W.ungu)), tambah(idx(SUARA_R2, "jawaban"), ...pilihKata(162, ["54", "64", "74"], 16))),
    k(SUARA_R3, sorotkan(idx(SUARA_R3, "Betul!"), "c2-k"), tambah(idx(SUARA_R3, "Jumlahnya"), cap("26 + 38 = 64"))),
    k(
      SUARA_R4,
      redamkan(0, "c2-k"),
      hapus(0, "tanya", ...idPilihan(3)),
      tambah(idx(SUARA_R4, "Satuan:"), A2.sorS()),
      tambah(idx(SUARA_R4, "Enam"), A2.eqS()),
      tambah(idx(SUARA_R4, "empat", 1), A2.hSatuan(), A2.sim()),
      hapus(idx(SUARA_R4, "Puluhan:"), "ls-sor"),
      tambah(idx(SUARA_R4, "Puluhan:"), A2.sorT()),
      tambah(idx(SUARA_R4, "Satu"), A2.eqP()),
      tambah(idx(SUARA_R4, "enam", 2), A2.hPuluhan()),
    ),
  ],
};

/* ------------------------------ 9. Ringkasan metode luar ------------------------------ */
const SUARA_Y1 = "Mari kita ringkas tiga metode dari luar. Semuanya membantu kita menjumlahkan dengan tepat.";
const SUARA_Y2 = "Metode Penjumlahan Bersusun, mulai dari satuan dan simpan jika perlu.";
const SUARA_Y3 = "Metode Pasangan Bilangan, memecah bilangan supaya mudah dijumlah.";
const SUARA_Y4 = "Metode Menghitung Maju, mulai dari bilangan besar lalu maju selangkah demi selangkah.";
const SUARA_Y5 = "Pilih metode yang kamu suka, lalu periksa dengan metode lain. Hasilnya harus sama.";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Metode luar: ringkasan",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Y1, tambah(0, judul("Ringkasan")), tambah(idx(SUARA_Y1, "ringkas"), ...kartu("r0", 14, 34, 272, 30, W.emas, ["3 metode dari luar"], 11))),
    k(SUARA_Y2, tambah(idx(SUARA_Y2, "Penjumlahan"), ...kartu("r1", 14, 72, 272, 34, WARNA_METODE[0], [NAMA_METODE_ID[0], "mulai dari satuan, simpan jika perlu"], 9.2))),
    k(SUARA_Y3, tambah(idx(SUARA_Y3, "Pasangan"), ...kartu("r2", 14, 114, 272, 34, WARNA_METODE[1], [NAMA_METODE_ID[1], "pecah bilangan agar mudah dijumlah"], 9.2))),
    k(SUARA_Y4, tambah(idx(SUARA_Y4, "Menghitung"), ...kartu("r3", 14, 156, 272, 34, WARNA_METODE[2], [NAMA_METODE_ID[2], "mulai dari yang besar, lalu maju"], 9.2))),
    k(SUARA_Y5, bersih(0), tambah(0, judul("Hasilnya harus sama"), emo("rw", 150, 100, OWL, 54)), tambah(idx(SUARA_Y5, "sama."), emo("rk", 150, 160, "✅", 30))),
  ],
};
