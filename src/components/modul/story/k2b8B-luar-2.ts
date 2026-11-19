import type { AdeganStory } from "./logika-story";
import { E, W, barisBintang, bulat, emo, garis, judul, kartu, panah, panggungDepan, papanLayar, teks, tokoh } from "./k2b8B-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k2b8B-bantu";

/*
 * Cerita orisinal IGIL "Bintang Bu Maya" (Kelas 2 Bab 8 Sub-Bab B), video metode global.
 * Naskah suara dari naskah/story-naskah-k2b8b.md. Bagian ini: Row Comparing (Banding Baris), Graph Detective (Detektif Diagram), terapannya, dan ringkasan.
 */

const TOPI = "\u{1F3A9}";
const SEPATU = "\u{1F45F}";
const TARI = "\u{1F483}";
const JAM = "\u{23F3}";
const TIMBANGAN = "\u{2696}";

/* ------------------------------ Row Comparing: konsep ------------------------------ */
const SUARA_B1 = "Cara kedua, Row Comparing, atau Banding Baris.";
const SUARA_B2 = "Dua baris gambar diletakkan sejajar, mulai dari garis yang sama.";
const SUARA_B3 = "Baris yang lebih panjang berarti lebih banyak, dan selisih panjangnya adalah lebihnya.";
const SUARA_B4 = "Baris yang lebih pendek berarti kurang, sebanyak gambar yang tidak sampai.";

export const ADEGAN_LUAR_BANDING: AdeganStory = {
  id: "luar-banding",
  judul: "Row Comparing: Banding Baris",
  sumber: "Metode global: Row Comparing (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_B1,
      bersih(0),
      tambah(0, judul("Cara Kedua"), ...panggungDepan("dn")),
      tambah("Row", ...kartu("nm", 50, 38, 200, 28, W.krem, ["Row Comparing"], 13)),
      tambah("Banding", teks("nid", 150, 100, "Banding Baris", 12, W.ungu, { z: 2 })),
      tambah("Baris.", emo("ic", 150, 156, TIMBANGAN, 34)),
    ),
    k(
      SUARA_B2,
      bersih(0),
      tambah(0, judul("Dua Baris Sejajar"), ...panggungDepan("dn")),
      tambah("Dua", teks("n2", 250, 52, "2 baris", 10, W.ungu, { z: 2 })),
      tambah("baris", ...barisBintang("r1", 96, 70, 5, W.selMerah)),
      tambah("gambar", ...barisBintang("r2", 96, 100, 3, W.selBiru)),
      tambah("garis", garis("gs", 84, 54, 0, 66, W.ungu, 2.4)),
      tambah("sama.", teks("gl", 150, 140, "mulai dari garis yang sama", 9, W.hijau, { z: 2 })),
    ),
    k(
      SUARA_B3,
      sorotkan("panjang", "r10", "r11", "r12", "r13", "r14"),
      tambah("banyak,", teks("lb", 252, 70, "lebih banyak", 8, W.hijau, { z: 2 })),
      tambah("selisih", garis("kb", 133, 80, 30, 0, W.merah, 2.6)),
      tambah("lebihnya.", teks("ls", 150, 91, "lebihnya", 8, W.merah, { z: 2 })),
    ),
    k(
      SUARA_B4,
      sorotkan("pendek", "r20", "r21", "r22"),
      tambah("kurang,", teks("kr", 252, 100, "kurang", 8, W.merah, { z: 2 })),
      tambah("sebanyak", bulat("e0", 141, 100, 6.5, W.putih, W.merah, { z: 2, op: 0.7 }), bulat("e1", 156, 100, 6.5, W.putih, W.merah, { z: 2, op: 0.7 })),
      tambah("sampai.", emo("ok", 262, 150, E.benar, 20)),
    ),
  ],
};

/* ------------------------------ Row Comparing: terapan ------------------------------ */
const SUARA_Q1 = "Dika membandingkan baris topi tujuh dengan baris sepatu tiga.";
const SUARA_Q2 = "Baris topi lebih panjang empat gambar, jadi topi empat lebihnya dari sepatu.";
const SUARA_Q3 = "Cocok untuk mencari lebihnya dan kurangnya dari dua jenis.";
const SUARA_Q4 = "Kurang cocok kalau yang dicari jumlah, karena perbandingan tidak menggabungkan baris.";

const barisEmoji = (id: string, e: string, y: number, n: number) => Array.from({ length: n }, (_, i) => emo(`${id}${i}`, 84 + i * 17, y + 5, e, 16));

export const ADEGAN_LUAR_BANDING_TERAPAN: AdeganStory = {
  id: "luar-banding-terapan",
  judul: "Dika membandingkan topi dan sepatu",
  sumber: "Metode global: Row Comparing (terapan)",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_Q1,
      bersih(0),
      tambah(0, judul("Topi dan Sepatu"), ...panggungDepan("dn")),
      tambah("Dika", ...tokoh("dk", 40, 172, "Dika")),
      tambah("topi", teks("nt", 44, 73, "topi", 9, W.biru, { z: 2 }), ...barisEmoji("ht", TOPI, 66, 7)),
      tambah("tujuh", teks("c7", 222, 74, "7", 12, W.ungu, { z: 2 })),
      tambah("sepatu", teks("ns", 44, 103, "sepatu", 9, W.biru, { z: 2 }), ...barisEmoji("sp", SEPATU, 96, 3)),
      tambah("tiga.", teks("c3", 222, 104, "3", 12, W.ungu, { z: 2 })),
    ),
    k(
      SUARA_Q2,
      tambah("panjang", garis("br", 127, 84, 68, 0, W.merah, 2.6)),
      tambah("empat", teks("e4", 160, 120, "4 gambar", 9, W.merah, { z: 2 })),
      tambah("lebihnya", teks("ll", 262, 74, "4 lebih", 9, W.hijau, { z: 2 })),
      tambah("sepatu.", emo("ok", 262, 150, E.benar, 20)),
    ),
    k(
      SUARA_Q3,
      bersih(0),
      tambah(0, judul("Kapan Cocok?"), ...panggungDepan("dn"), ...kartu("cc", 90, 36, 120, 24, W.hijauMuda, ["Cocok"], 12)),
      tambah("mencari", ...barisEmoji("ht", TOPI, 70, 5), ...barisEmoji("sp", SEPATU, 98, 3)),
      tambah("lebihnya", teks("lb", 240, 80, "lebih", 9, W.hijau, { z: 2 })),
      tambah("kurangnya", teks("kr", 240, 108, "kurang", 9, W.merah, { z: 2 })),
      tambah("dua", teks("j2", 150, 150, "2 jenis", 11, W.ungu, { z: 2 })),
      tambah("jenis.", emo("ok", 262, 150, E.benar, 22)),
    ),
    k(
      SUARA_Q4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?"), ...panggungDepan("dn"), ...kartu("kc", 80, 36, 140, 24, W.merahMuda, ["Kurang cocok"], 12)),
      tambah("jumlah,", teks("jm", 150, 128, "jumlah = ?", 13, W.merah, { z: 2 })),
      tambah("perbandingan", ...barisEmoji("ht", TOPI, 70, 5), ...barisEmoji("sp", SEPATU, 94, 3)),
      tambah("tidak", emo("x1", 232, 90, E.salah, 24)),
      tambah("menggabungkan", panah("pg", 100, 150, 100, 0, W.merah, 2.2)),
      tambah("baris.", emo("tz", 150, 172, E.tanya, 24)),
    ),
  ],
};

/* ------------------------------ Graph Detective: konsep ------------------------------ */
const SUARA_D1 = "Cara ketiga, Graph Detective, atau Detektif Diagram.";
const SUARA_D2 = "Detektif membaca dalam urutan: judul, keterangan, nama jenis, lalu gambar.";
const SUARA_D3 = "Dengan urutan itu, tidak ada petunjuk yang terlewat.";
const SUARA_D4 = "Setelah itu barulah kita menghitung gambar di tiap baris.";

const LANGKAH_BACA = ["judul", "keterangan", "nama jenis", "gambar"];

export const ADEGAN_LUAR_DETEKTIF: AdeganStory = {
  id: "luar-detektif",
  judul: "Graph Detective: Detektif Diagram",
  sumber: "Metode global: Graph Detective (konsep)",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_D1,
      bersih(0),
      tambah(0, judul("Cara Ketiga"), ...panggungDepan("dn")),
      tambah("Graph", ...kartu("nm", 50, 38, 200, 28, W.krem, ["Graph Detective"], 13)),
      tambah("Detektif", teks("nid", 150, 100, "Detektif Diagram", 12, W.ungu, { z: 2 })),
      tambah("Diagram.", emo("ic", 150, 156, E.kaca, 34)),
    ),
    k(
      SUARA_D2,
      bersih(0),
      tambah(0, judul("Urutan Membaca"), ...panggungDepan("dn")),
      tambah("Detektif", emo("kc", 150, 130, E.kaca, 26)),
      tambah("judul,", ...kartu("c0", 10, 54, 64, 40, W.kuning, [LANGKAH_BACA[0]], 9)),
      tambah("keterangan,", ...kartu("c1", 82, 54, 64, 40, W.hijauMuda, [LANGKAH_BACA[1]], 9)),
      tambah("nama", ...kartu("c2", 154, 54, 64, 40, W.lavender, [LANGKAH_BACA[2]], 9)),
      tambah("gambar.", ...kartu("c3", 226, 54, 64, 40, W.merahMuda, [LANGKAH_BACA[3]], 9)),
    ),
    k(
      SUARA_D3,
      tambah("urutan", panah("pu", 20, 116, 260, 0, W.ungu, 2.6)),
      tambah("tidak", emo("tz", 150, 168, E.tanya, 22), emo("x1", 190, 168, E.salah, 22)),
      tambah("petunjuk", emo("kc2", 110, 168, E.kaca, 22)),
      tambah("terlewat.", ...[0, 1, 2, 3].map((i) => emo(`ok${i}`, 42 + i * 72, 112, E.benar, 20))),
    ),
    k(
      SUARA_D4,
      bersih(0),
      tambah(0, judul("Menghitung Gambar"), ...panggungDepan("dn")),
      tambah("gambar", ...barisBintang("bs", 90, 84, 5, W.selMerah, 8, 24)),
      tambah("tiap", ...[0, 1, 2].map((i) => teks(`h${i}`, 90 + i * 24, 108, String(i + 1), 9, W.biru, { z: 2 }))),
      tambah("baris.", teks("h3", 186, 108, "4", 9, W.biru, { z: 2 }), teks("h4", 210, 108, "5", 9, W.biru, { z: 2 }), panah("pk", 70, 134, 160, 0, W.ungu, 2.4), emo("ok", 262, 150, E.benar, 22)),
    ),
  ],
};

/* ------------------------------ Graph Detective: terapan ------------------------------ */
const SUARA_R1 = "Nia membaca diagram tiket: judul dulu, lalu keterangan satu gambar mewakili satu penonton.";
const SUARA_R2 = "Ia menghitung gambar dari kiri ke kanan, lalu menjawab pertanyaan Bu Maya.";
const SUARA_R3 = "Cocok untuk diagram baru yang belum kita kenal.";
const SUARA_R4 = "Kurang cocok untuk diagram yang sudah sangat kita kenal, karena terasa lambat.";

const diagramTiket = () => [
  ...barisBintang("t0", 100, 64, 6, W.selKuning, 6.5, 15),
  ...barisBintang("t1", 100, 94, 4, W.selHijau, 6.5, 15),
  ...barisBintang("t2", 100, 122, 5, W.selBiru, 6.5, 15),
  teks("n0", 84, 67, "pagi", 8, W.biru, { z: 2 }),
  teks("n1", 84, 97, "siang", 8, W.biru, { z: 2 }),
  teks("n2", 84, 125, "malam", 8, W.biru, { z: 2 }),
];

export const ADEGAN_LUAR_DETEKTIF_TERAPAN: AdeganStory = {
  id: "luar-detektif-terapan",
  judul: "Nia membaca diagram tiket",
  sumber: "Metode global: Graph Detective (terapan)",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_R1,
      bersih(0),
      tambah(0, judul("Diagram Tiket"), ...panggungDepan("dn")),
      tambah("Nia", ...tokoh("ni", 40, 172, "Nia")),
      tambah("diagram", ...papanLayar("pl", 70, 48, 200, 92, 1, 3)),
      tambah("tiket:", teks("jt", 170, 42, "Tiket Terjual", 9, W.ungu, { z: 2 })),
      tambah("keterangan", teks("kt", 170, 158, "1 gambar = 1 penonton", 9, W.coklat, { z: 2 })),
      tambah("penonton.", ...diagramTiket()),
    ),
    k(
      SUARA_R2,
      tambah("menghitung", panah("p0", 96, 76, 100, 0, W.ungu, 2.2)),
      tambah("kiri", panah("p1", 96, 106, 70, 0, W.ungu, 2.2)),
      tambah("kanan,", panah("p2", 96, 134, 80, 0, W.ungu, 2.2)),
      tambah("pertanyaan", emo("tz", 236, 150, E.tanya, 20)),
      tambah("Maya.", ...tokoh("bm", 262, 172, "Bu Maya")),
    ),
    k(
      SUARA_R3,
      bersih(0),
      tambah(0, judul("Kapan Cocok?"), ...panggungDepan("dn"), ...kartu("cc", 90, 36, 120, 24, W.hijauMuda, ["Cocok"], 12)),
      tambah("diagram", ...papanLayar("pl", 90, 72, 120, 62, 1, 2)),
      tambah("baru", emo("kl", 232, 90, E.kilau, 22)),
      tambah("belum", emo("tz", 150, 104, E.tanya, 26)),
      tambah("kenal.", emo("kc", 60, 100, E.kaca, 26), emo("ok", 150, 168, E.benar, 24)),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?"), ...panggungDepan("dn"), ...kartu("kc", 80, 36, 140, 24, W.merahMuda, ["Kurang cocok"], 12)),
      tambah("diagram", ...papanLayar("pl", 90, 72, 120, 62, 1, 2), ...barisBintang("bs", 110, 92, 4, W.selMerah, 6, 15), ...barisBintang("bt", 110, 116, 6, W.selBiru, 6, 15)),
      tambah("sudah", emo("ok", 232, 100, E.benar, 22)),
      tambah("sangat", emo("kc2", 60, 100, E.kaca, 22)),
      tambah("lambat.", emo("jm", 150, 164, JAM, 26), emo("x1", 196, 164, E.salah, 22)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_G1 = "Tiga cara sudah kita lihat. Mana yang pas? Itu tergantung tujuannya.";
const SUARA_G2 = "Mengumpulkan data langsung, pakai Diagram Kertas Tempel. Membandingkan dua jenis, pakai Banding Baris.";
const SUARA_G3 = "Membaca diagram baru, pakai Detektif Diagram. Apa pun caranya, satu gambar mewakili satu benda.";
const SUARA_G4 = "Menurutmu, untuk mengetahui tarian yang paling disukai penonton, kamu pilih cara yang mana?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Metode global: ringkasan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_G1,
      bersih(0),
      tambah(0, judul("Tiga Cara Diagram Gambar"), ...panggungDepan("dn")),
      tambah("Tiga", teks("n3", 252, 44, "3 cara", 10, W.ungu, { z: 2 }), ...kartu("r0", 14, 50, 150, 32, W.krem, ["1. Kertas Tempel"], 10)),
      tambah("lihat.", ...kartu("r1", 14, 90, 150, 32, W.krem, ["2. Banding Baris"], 10)),
      tambah("pas?", ...kartu("r2", 14, 130, 150, 32, W.krem, ["3. Detektif Diagram"], 10)),
    ),
    k(
      SUARA_G2,
      sorotkan("Mengumpulkan", "r0-k"),
      tambah("langsung,", ...kartu("g0", 172, 50, 118, 32, W.hijauMuda, ["kumpul data langsung"], 8.5)),
      ubah("Membandingkan", { id: "r0-k", sorot: false }),
      sorotkan("Membandingkan", "r1-k"),
      tambah("dua", ...kartu("g1", 172, 90, 118, 32, W.hijauMuda, ["banding 2 jenis"], 8.5)),
    ),
    k(
      SUARA_G3,
      ubah(0, { id: "r1-k", sorot: false }),
      sorotkan("Membaca", "r2-k"),
      tambah("baru,", ...kartu("g2", 172, 130, 118, 32, W.hijauMuda, ["baca diagram baru"], 8.5)),
      tambah("caranya,", ...kartu("pp", 40, 168, 220, 26, W.kuning, ["1 gambar = 1 benda"], 12)),
    ),
    k(
      SUARA_G4,
      bersih(0),
      tambah(0, judul("Pilihan Kamu"), ...panggungDepan("dn")),
      tambah("tarian", emo("d0", 60, 80, TARI, 30), emo("d1", 150, 80, TARI, 30), emo("d2", 240, 80, TARI, 30)),
      tambah("penonton,", emo("tz", 150, 50, E.tanya, 22)),
      tambah("cara", emo("i0", 90, 140, E.catat, 28), emo("i1", 150, 140, TIMBANGAN, 28), emo("i2", 210, 140, E.kaca, 28)),
      tambah("mana?", emo("pk", 150, 184, E.pikir, 28)),
    ),
  ],
};
