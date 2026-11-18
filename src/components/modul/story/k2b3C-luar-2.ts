import type { AdeganStory, Obj } from "./logika-story";
import { E, W, bantalan, benda, bulat, emo, idBantalan, idBenda, kartu, kertas, kotak, lantai, panah, teks, tokoh } from "./k2b3C-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k2b3C-bantu";
import { NAMA_METODE, NAMA_METODE_ID, WARNA_METODE, kepala } from "./k2b3C-luar-1";

/* Video metode global Sub-Bab C: Face Printing (Cetak Permukaan), Top and Side Views (Pandangan Atas dan Samping), terapannya, dan ringkasan. */

const BIRU_CETAK = "#93C5FD";
const segitiga = (id: string, cx: number, cy: number, s: number, warna: string): Obj => ({
  id,
  t: "jalur",
  x: cx,
  y: cy,
  d: `M0 ${-s} L${s} ${s * 0.8} L${-s} ${s * 0.8} Z`,
  warna,
  garis: W.biru,
  tebal: 2,
});

/* ------------------------------ 1. Face Printing (Cetak Permukaan) ------------------------------ */
const SUARA_C1 = "Cara kedua, Face Printing, atau Cetak Permukaan.";
const SUARA_C2 = "Tekan satu permukaan benda pada bantalan tinta, lalu cetak di kertas.";
const SUARA_C3 = "Hasil cetakannya adalah bangun datar, yaitu bentuk permukaan yang rata itu.";
const SUARA_C4 = "Dengan begitu, kita tahu ada bangun datar di permukaan bangun ruang.";

export const ADEGAN_LUAR_CETAK: AdeganStory = {
  id: "luar-cetak",
  judul: "Face Printing: Cetak Permukaan",
  sumber: "Metode global: Face Printing, konsep",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, ...kepala(1), lantai("lt", 150)),
      tambah("Face", teks("fp", 150, 74, "Face Printing", 15, W.coklat)),
      tambah("Cetak", ...bantalan("bt", 100, 104, 100, 20)),
      tambah("Permukaan.", teks("cp", 150, 172, "Cetak Permukaan", 13, W.ungu)),
    ),
    k(
      SUARA_C2,
      hapus("Tekan", "fp", "cp", ...idBantalan("bt")),
      tambah("Tekan", ...bantalan("bt", 30, 136, 100, 14)),
      tambah("satu", ...kartu("sp", 24, 54, 112, 20, W.krem, ["1 permukaan"], 9.4)),
      tambah("benda", ...benda("kb", "kubus", 80, 106, 44), panah("pd", 80, 88, 80, 122, W.merah)),
      tambah("kertas.", kertas("kr", 172, 84, 110, 62), kotak("cx", 206, 96, 40, 40, BIRU_CETAK, W.biru, { rx: 2, tebal: 2 }), panah("pc", 134, 130, 168, 116, W.merah)),
    ),
    k(
      SUARA_C3,
      bersih(0),
      tambah(0, ...kepala(1), lantai("lt", 150), kertas("kr", 80, 58, 140, 80)),
      tambah("cetakannya", kotak("cx", 128, 68, 60, 60, BIRU_CETAK, W.biru, { rx: 2, tebal: 2.4 })),
      tambah("bangun", ...kartu("bd", 30, 150, 110, 22, W.hijauMuda, ["bangun datar"], 10)),
      tambah("permukaan", ...kartu("pr", 156, 150, 120, 22, W.krem, ["bentuk permukaan"], 10)),
      sorotkan("rata", "cx"),
    ),
    k(
      SUARA_C4,
      bersih(0),
      tambah(0, ...kepala(1), lantai("lt", 150)),
      tambah("tahu", emo("lm", 150, 100, E.lampu, 24)),
      tambah("datar", kotak("cx", 196, 66, 44, 44, BIRU_CETAK, W.biru, { rx: 2, tebal: 2.4 }), teks("cxn", 218, 128, "bangun datar", 10, W.biru)),
      tambah("permukaan", ...benda("kb", "kubus", 78, 92, 56)),
      sorotkan("permukaan", "kb-d"),
      tambah("ruang.", teks("kbn", 78, 140, "bangun ruang", 10, W.coklat)),
    ),
  ],
};

/* ------------------------------ 2. Terapan Face Printing ------------------------------ */
const SUARA_Q1 = "Nia mencetak dadu, dan hasilnya segi empat yang keempat sisinya sama panjang.";
const SUARA_Q2 = "Ia mencetak alas kaleng, dan hasilnya sebuah lingkaran.";
const SUARA_Q3 = "Cocok kalau benda punya permukaan yang rata.";
const SUARA_Q4 = "Kurang cocok untuk bola, karena bola tidak punya permukaan rata untuk dicetak.";

export const ADEGAN_LUAR_CETAK_TERAPAN: AdeganStory = {
  id: "luar-cetak-terapan",
  judul: "Nia mencetak benda",
  sumber: "Metode global: Face Printing, terapan",
  latar: "#FEF3C7",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, ...kepala(1), lantai("lt", 150)),
      tambah("Nia", ...tokoh("ni", 36, 172, "nia")),
      tambah("dadu,", ...benda("dd", "dadu", 80, 98, 50)),
      tambah("hasilnya", kertas("kr", 168, 60, 112, 70), kotak("sq", 202, 72, 44, 44, BIRU_CETAK, W.biru, { rx: 2, tebal: 2.4 })),
      tambah("segi", ...kartu("sg", 150, 138, 136, 22, W.krem, ["segi empat: 4 sisi sama"], 8.6)),
    ),
    k(
      SUARA_Q2,
      hapus("Ia", ...idBenda("dd", "dadu"), "sq", "sg-k", "sg-t0"),
      tambah("alas", ...benda("kl", "kaleng", 80, 98, 50)),
      tambah("hasilnya", bulat("lk", 224, 94, 24, BIRU_CETAK, W.biru, { tebal: 2.4 })),
      tambah("lingkaran.", teks("lkn", 224, 138, "lingkaran", 11, W.biru)),
    ),
    k(
      SUARA_Q3,
      bersih(0),
      tambah(0, ...kepala(1), lantai("lt", 150)),
      tambah("Cocok", ...kartu("ck", 60, 56, 180, 26, W.hijauMuda, ["cocok untuk benda rata"], 11), emo("jm", 262, 70, E.jempol, 22)),
      tambah("permukaan", ...benda("kd", "kardus", 150, 112, 56)),
      sorotkan("rata.", "kd-d", "kd-a", "kd-s"),
    ),
    k(
      SUARA_Q4,
      bersih(0),
      tambah(0, ...kepala(1), lantai("lt", 150)),
      tambah("Kurang", ...kartu("kr", 60, 56, 180, 26, W.merahMuda, ["kurang cocok untuk bola"], 11)),
      tambah("bola,", ...benda("bl", "bola", 80, 112, 50)),
      tambah("tidak", emo("sl", 126, 100, "\u{274C}", 20), kertas("ks", 176, 90, 100, 52)),
      tambah("dicetak.", emo("tn", 226, 116, E.tanya, 24)),
    ),
  ],
};

/* ------------------------------ 3. Top and Side Views (Pandangan Atas dan Samping) ------------------------------ */
const SUARA_V1 = "Cara ketiga, Top and Side Views, atau Pandangan Atas dan Samping.";
const SUARA_V2 = "Lihatlah benda dari atas, lalu lihat lagi dari samping.";
const SUARA_V3 = "Dari tiap arah, benda tampak seperti sebuah bangun datar.";
const SUARA_V4 = "Bayangan dari dua arah itu membantu kita mengenali benda aslinya.";

export const ADEGAN_LUAR_PANDANG: AdeganStory = {
  id: "luar-pandang",
  judul: "Top and Side Views: Pandangan Atas dan Samping",
  sumber: "Metode global: Top and Side Views, konsep",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_V1,
      tambah(0, ...kepala(2), lantai("lt", 150)),
      tambah("Top", teks("tv", 150, 80, "Top and Side Views", 14, W.coklat)),
      tambah("Pandangan", ...kartu("pa", 40, 110, 220, 22, W.putih, ["Pandangan Atas dan Samping"], 10)),
      tambah("Samping.", emo("mt", 150, 172, E.mata, 22)),
    ),
    k(
      SUARA_V2,
      hapus("Lihatlah", "tv", "pa-k", "pa-t0", "mt"),
      tambah("benda", ...benda("kc", "kerucut", 140, 112, 50)),
      tambah("atas,", emo("m1", 140, 62, E.mata, 22), panah("p1", 140, 76, 140, 88, W.merah), teks("t1", 204, 66, "dari atas", 10, W.merah)),
      tambah("samping.", emo("m2", 250, 112, E.mata, 22), panah("p2", 240, 112, 190, 112, W.merah), teks("t2", 248, 144, "dari samping", 10, W.merah)),
    ),
    k(
      SUARA_V3,
      bersih(0),
      tambah(0, ...kepala(2), lantai("lt", 150)),
      tambah("benda", ...benda("kc", "kerucut", 150, 100, 50)),
      tambah("arah,", panah("pa", 128, 100, 90, 100, W.merah), panah("pb", 172, 100, 210, 100, W.merah)),
      tambah("bangun", bulat("lg", 60, 100, 22, BIRU_CETAK, W.biru, { tebal: 2.4 }), teks("lgn", 60, 140, "tampak atas", 9, W.biru)),
      tambah("datar.", segitiga("sg", 240, 100, 22, "#FDE68A"), teks("sgn", 240, 140, "tampak samping", 9, W.biru)),
    ),
    k(
      SUARA_V4,
      tambah("Bayangan", ...kartu("dr", 100, 56, 100, 20, W.krem, ["2 arah"], 10)),
      tambah("membantu", emo("lm", 150, 160, E.lampu, 22)),
      tambah("aslinya.", emo("jm", 150, 132, E.jempol, 18)),
    ),
  ],
};

/* ------------------------------ 4. Terapan Top and Side Views ------------------------------ */
const SUARA_W1 = "Dika melihat kerucut dari atas, dan tampak sebuah lingkaran.";
const SUARA_W2 = "Dari samping, kerucut yang sama tampak seperti segitiga.";
const SUARA_W3 = "Cocok kalau benda tidak boleh disentuh dan hanya boleh dilihat.";
const SUARA_W4 = "Kurang cocok kalau hanya melihat dari satu arah, karena kubus dan balok dari atas sama-sama tampak segi empat.";

export const ADEGAN_LUAR_PANDANG_TERAPAN: AdeganStory = {
  id: "luar-pandang-terapan",
  judul: "Dika melihat kerucut",
  sumber: "Metode global: Top and Side Views, terapan",
  latar: "#FCE7F3",
  ketukan: [
    k(
      SUARA_W1,
      tambah(0, ...kepala(2), lantai("lt", 150)),
      tambah("Dika", ...tokoh("dk", 36, 172, "dika")),
      tambah("kerucut", ...benda("kc", "kerucut", 110, 112, 56)),
      tambah("atas,", emo("m1", 110, 62, E.mata, 22), panah("p1", 110, 76, 110, 86, W.merah)),
      tambah("tampak", bulat("lg", 230, 96, 24, BIRU_CETAK, W.biru, { tebal: 2.4 })),
      tambah("lingkaran.", teks("lgn", 230, 138, "lingkaran", 11, W.biru)),
    ),
    k(
      SUARA_W2,
      hapus("Dari", "m1", "p1", "lg", "lgn"),
      tambah("samping,", emo("m2", 170, 112, E.mata, 22), panah("p2", 180, 112, 152, 112, W.merah)),
      tambah("tampak", segitiga("sg", 230, 96, 24, "#FDE68A")),
      tambah("segitiga.", teks("sgn", 230, 138, "segitiga", 11, W.biru)),
    ),
    k(
      SUARA_W3,
      bersih(0),
      tambah(0, ...kepala(2), lantai("lt", 150)),
      tambah("Cocok", ...kartu("ck", 70, 56, 160, 26, W.hijauMuda, ["cocok untuk dilihat"], 11)),
      tambah("benda", ...benda("kl", "kaleng", 90, 112, 50)),
      tambah("tidak", emo("tg", 150, 112, E.tangan, 22), emo("sl", 180, 108, "\u{274C}", 22)),
      tambah("dilihat.", emo("mt", 240, 112, E.mata, 26)),
    ),
    k(
      SUARA_W4,
      bersih(0),
      tambah(0, ...kepala(2)),
      tambah("satu", ...kartu("sa", 95, 52, 110, 18, W.merahMuda, ["hanya 1 arah"], 9.4)),
      tambah("kubus", ...benda("kk", "kubus", 70, 106, 44)),
      tambah("balok", ...benda("bb", "balok", 230, 106, 64)),
      tambah("atas", kotak("ka", 52, 134, 30, 30, BIRU_CETAK, W.biru, { rx: 1, tebal: 2 }), kotak("ba", 204, 138, 52, 22, BIRU_CETAK, W.biru, { rx: 1, tebal: 2 })),
      tambah("empat.", ...kartu("sm", 50, 172, 200, 20, W.krem, ["sama: segi empat (4 sisi)"], 9)),
    ),
  ],
};

/* ------------------------------ 5. Ringkasan ------------------------------ */
const SUARA_R1 = "Kita sudah melihat tiga cara. Mana yang pas? Itu tergantung bendanya.";
const SUARA_R2 = "Benda tersembunyi dan hanya bisa diraba, pakai Tas Misteri. Benda punya permukaan rata, pakai Cetak Permukaan.";
const SUARA_R3 = "Benda hanya boleh dilihat, pakai Pandangan Atas dan Samping. Apa pun caranya, perhatikan permukaannya.";
const SUARA_R4 = "Menurutmu, untuk mengenali sebuah bola, kamu pilih cara yang mana?";

const LABEL_RINGKAS = NAMA_METODE.map((m, i) => `${i + 1}. ${m} · ${NAMA_METODE_ID[i]}`);
/** Baris pilihan cara: kotak `${id}-k`, syarat `${id}-t0`, cara `${id}-t1`. */
const baris = (id: string, y: number, warna: string): Obj => kotak(`${id}-k`, 14, y, 272, 40, warna, W.biru, { rx: 8 });
const syarat = (id: string, y: number, isi: string): Obj => teks(`${id}-t0`, 150, y + 16, isi, 9.4);
const cara = (id: string, y: number, isi: string): Obj => teks(`${id}-t1`, 150, y + 31, isi, 10, W.ungu);

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Metode global: ringkasan",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, { ...teks("jud", 150, 18, "3 cara mengenali benda", 11, W.ungu) }),
      tambah("melihat", ...kartu("r0", 14, 34, 272, 32, WARNA_METODE[0], [LABEL_RINGKAS[0]], 9)),
      tambah("tiga", ...kartu("r1", 14, 74, 272, 32, WARNA_METODE[1], [LABEL_RINGKAS[1]], 9)),
      tambah("cara.", ...kartu("r2", 14, 114, 272, 32, WARNA_METODE[2], [LABEL_RINGKAS[2]], 8.2)),
      tambah("pas?", emo("tn", 150, 176, E.tanya, 24)),
    ),
    k(
      SUARA_R2,
      bersih(0),
      tambah(0, teks("jud", 150, 18, "Pilih menurut bendanya", 11, W.ungu)),
      tambah("Benda", baris("q0", 34, WARNA_METODE[0]), syarat("q0", 34, "benda tersembunyi, hanya bisa diraba")),
      tambah("pakai", cara("q0", 34, "pakai Tas Misteri")),
      tambah("Benda@2", baris("q1", 82, WARNA_METODE[1]), syarat("q1", 82, "benda punya permukaan rata")),
      tambah("pakai@2", cara("q1", 82, "pakai Cetak Permukaan")),
    ),
    k(
      SUARA_R3,
      tambah("Benda", baris("q2", 130, WARNA_METODE[2]), syarat("q2", 130, "benda hanya boleh dilihat")),
      tambah("pakai", cara("q2", 130, "pakai Pandangan Atas dan Samping")),
      tambah("perhatikan", ...kartu("pu", 60, 176, 180, 20, W.emas, ["apa pun caranya: lihat permukaan"], 8.6)),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, teks("jud", 150, 18, "Pilih satu cara", 11, W.ungu)),
      tambah("bola,", ...benda("bl", "bola", 150, 74, 60), teks("bln", 150, 118, "bola", 11, W.coklat)),
      tambah("kamu", ...kartu("pc0", 10, 134, 92, 44, WARNA_METODE[0], ["Tas", "Misteri"], 9)),
      tambah("pilih", ...kartu("pc1", 104, 134, 92, 44, WARNA_METODE[1], ["Cetak", "Permukaan"], 9)),
      tambah("mana?", ...kartu("pc2", 198, 134, 92, 44, WARNA_METODE[2], ["Pandangan Atas", "dan Samping"], 8)),
    ),
  ],
};
