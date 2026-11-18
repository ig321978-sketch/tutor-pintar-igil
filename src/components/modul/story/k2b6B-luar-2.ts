import type { AdeganStory } from "./logika-story";
import { E, JAM_KANAN, W, batangLama, emo, jalurJam, jam, judul, kartu, kotak, panah, papanJadwal, teks, tokoh } from "./k2b6B-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k2b6B-bantu";

/*
 * Cerita orisinal IGIL "Jadwal Lomba Bu Ratna" (Kelas 2 Bab 6 Sub-Bab B), video metode global.
 * Naskah suara dari naskah/story-naskah-k2b6b.md. Bagian ini: Hour Track (Jalur Jam), Duration Bars (Batang Lama Kegiatan), dan ringkasan.
 */

/* ------------------------------ Hour Track: konsep ------------------------------ */
const SUARA_C1 = "Cara kedua, Hour Track, atau Jalur Jam.";
const SUARA_C2 = "Gambar jalur kotak, dan satu kotak berarti satu jam.";
const SUARA_C3 = "Mulai dari jam mulai, lalu hitung kotak sampai jam selesai.";
const SUARA_C4 = "Banyaknya kotak adalah lamanya kegiatan dalam jam.";

export const ADEGAN_LUAR_JALUR: AdeganStory = {
  id: "luar-jalur",
  judul: "Hour Track: Jalur Jam",
  sumber: "Metode global: Hour Track (konsep)",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_C1,
      bersih(0),
      tambah(0, judul("Cara Kedua")),
      tambah("Hour", ...kartu("nm", 50, 34, 200, 26, W.krem, ["Hour Track"], 13)),
      tambah("Jalur", teks("nid", 150, 94, "Jalur Jam", 12, W.ungu)),
      tambah("Jam.", ...jalurJam("ij", 60, 130, 5, 36, 22)),
    ),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Satu Kotak, Satu Jam")),
      tambah("jalur", ...jalurJam("jk", 30, 96, 6, 40, 22)),
      tambah("satu", teks("t1", 50, 84, "1 kotak", 10, W.merah)),
      sorotkan("satu", "jk0"),
      tambah("satu@2", teks("t2", 120, 84, "= 1 jam", 10, W.merah)),
      tambah("jam.", emo("tk", 150, 160, E.jam, 26)),
    ),
    k(
      SUARA_C3,
      bersih(0),
      tambah(0, judul("Hitung Kotaknya"), ...jalurJam("jk", 30, 96, 6, 40, 22)),
      tambah("Mulai", teks("tm", 30, 84, "mulai", 10, W.hijau), panah("pm", 30, 88, 0, 8, W.hijau, 2.4)),
      ubah("hitung", ...[0, 1, 2, 3].map((i) => ({ id: `jk${i}`, warna: W.emas }))),
      tambah("selesai.", teks("ts", 190, 84, "selesai", 10, W.merah), panah("ps", 190, 88, 0, 8, W.merah, 2.4)),
    ),
    k(
      SUARA_C4,
      tambah("Banyaknya", ...[1, 2, 3, 4].map((i) => teks(`n${i}`, 10 + i * 40, 128, String(i), 11, W.biru, { z: 2 }))),
      tambah("lamanya", ...kartu("lk", 80, 146, 140, 24, W.langit, ["lama: 4 jam"], 11)),
      sorotkan("jam.", "lk-k"),
    ),
  ],
};

/* ------------------------------ Hour Track: terapan ------------------------------ */
const SUARA_T1 = "Dika menghitung senam pagi dari pukul enam sampai pukul delapan. Ia mewarnai dua kotak.";
const SUARA_T2 = "Jadi senam berlangsung dua jam, dan Dika menulis angka dua.";
const SUARA_T3 = "Cocok kalau kita ingin tahu berapa jam sebuah kegiatan berlangsung.";
const SUARA_T4 = "Kurang cocok kalau kegiatannya hanya beberapa menit, karena satu kotak terlalu besar.";

export const ADEGAN_LUAR_JALUR_TERAPAN: AdeganStory = {
  id: "luar-jalur-terapan",
  judul: "Dika menghitung jam senam",
  sumber: "Metode global: Hour Track (terapan)",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_T1,
      bersih(0),
      tambah(0, judul("Dika Menghitung Senam"), ...jalurJam("jt", 75, 96, 3, 50, 22)),
      tambah("Dika", ...tokoh("dk", 40, 176, "Dika")),
      tambah("senam", ...kartu("sp", 100, 34, 100, 22, W.krem, ["senam pagi"], 10)),
      tambah("enam", teks("k6", 75, 134, "6", 11, W.biru), teks("k7", 125, 134, "7", 11, W.biru)),
      sorotkan("enam", "jt0"),
      tambah("delapan.", teks("k8", 175, 134, "8", 11, W.biru), teks("k9", 225, 134, "9", 11, W.biru)),
      ubah("mewarnai", { id: "jt0", warna: W.emas, sorot: false }, { id: "jt1", warna: W.emas }),
      tambah("dua", ...kartu("dq", 214, 34, 78, 22, W.hijauMuda, ["2 kotak"], 10)),
    ),
    k(
      SUARA_T2,
      ubah("dua", { id: "sp-t0", isi: "senam: 2 jam" }),
      tambah("menulis", emo("ct", 40, 140, E.catat, 18)),
      tambah("dua@2", kotak("bk", 232, 62, 52, 52, W.putih, W.biru, { rx: 8, tebal: 2.4 }), teks("b2", 258, 100, "2", 36, W.merah)),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Kapan Cocok?"), ...kartu("cc", 90, 34, 120, 24, W.hijauMuda, ["Cocok"], 12)),
      tambah("berapa", emo("tq", 40, 120, E.tanya, 26)),
      tambah("jam", ...jalurJam("jt", 70, 96, 4, 40, 22, W.emas)),
      tambah("berlangsung.", emo("ok", 262, 108, E.benar, 26)),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?"), ...kartu("kc", 80, 34, 140, 24, W.merahMuda, ["Kurang cocok"], 12)),
      tambah("beberapa", kotak("bg", 60, 80, 180, 56, W.hijauMuda, W.biru, { rx: 3, tebal: 2 }), kotak("bs", 70, 96, 16, 24, W.emas, W.biru, { rx: 2, tebal: 1.4 })),
      tambah("satu", teks("t1", 150, 156, "1 kotak", 11, W.merah)),
      sorotkan("besar.", "bg"),
      tambah("besar.", emo("x1", 262, 108, E.salah, 24)),
    ),
  ],
};

/* ------------------------------ Duration Bars: konsep ------------------------------ */
const SUARA_B1 = "Cara ketiga, Duration Bars, atau Batang Lama Kegiatan.";
const SUARA_B2 = "Gambar satu batang untuk tiap kegiatan, dan satu kotak pada batang berarti satu jam.";
const SUARA_B3 = "Makin lama kegiatannya, makin panjang batangnya.";
const SUARA_B4 = "Batang yang lebih panjang adalah kegiatan yang lebih lama.";

export const ADEGAN_LUAR_BATANG: AdeganStory = {
  id: "luar-batang",
  judul: "Duration Bars: Batang Lama Kegiatan",
  sumber: "Metode global: Duration Bars (konsep)",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_B1,
      bersih(0),
      tambah(0, judul("Cara Ketiga")),
      tambah("Duration", ...kartu("nm", 50, 34, 200, 26, W.krem, ["Duration Bars"], 13)),
      tambah("Batang", teks("nid", 150, 94, "Batang Lama Kegiatan", 12, W.ungu)),
      tambah("Kegiatan.", kotak("ib0", 90, 124, 120, 12, W.hijauMuda, W.biru, { rx: 2, tebal: 1.4 }), kotak("ib1", 90, 142, 70, 12, W.merahMuda, W.biru, { rx: 2, tebal: 1.4 }), kotak("ib2", 90, 160, 95, 12, W.lavender, W.biru, { rx: 2, tebal: 1.4 })),
    ),
    k(
      SUARA_B2,
      bersih(0),
      tambah(0, judul("Satu Batang, Kotak Jam")),
      tambah("Gambar", ...jalurJam("jb", 90, 96, 3, 40, 22, W.hijauMuda)),
      tambah("satu", teks("t1", 50, 112, "1 batang", 10, W.merah)),
      tambah("satu@2", teks("t2", 108, 84, "1 kotak", 10, W.merah)),
      sorotkan("kotak", "jb0"),
      tambah("satu@3", teks("t3", 158, 84, "= 1 jam", 10, W.merah)),
    ),
    k(
      SUARA_B3,
      bersih(0),
      tambah(0, judul("Makin Lama, Makin Panjang")),
      tambah("Makin", ...batangLama("b1", 56, "kegiatan A", 2, "2 jam", W.hijauMuda)),
      tambah("panjang", ...batangLama("b2", 100, "kegiatan B", 5, "5 jam", W.merahMuda)),
      tambah("batangnya.", panah("pn", 150, 150, 70, 0, W.ungu, 2.6)),
    ),
    k(
      SUARA_B4,
      sorotkan("Batang", "b2"),
      tambah("panjang", ...kartu("kp", 60, 128, 130, 24, W.merahMuda, ["lebih panjang"], 10)),
      tambah("lama.", ...kartu("kl", 196, 128, 90, 24, W.emas, ["lebih lama"], 10), emo("ok", 150, 178, E.benar, 22)),
    ),
  ],
};

/* ------------------------------ Duration Bars: terapan ------------------------------ */
const SUARA_Q1 = "Chacha menggambar batang untuk lari, senam, dan lompat tali. Batang senam paling panjang.";
const SUARA_Q2 = "Jadi senam lebih lama dari lompat tali, dan lompat tali lebih sebentar dari senam.";
const SUARA_Q3 = "Cocok kalau kita ingin membandingkan lama banyak kegiatan sekaligus.";
const SUARA_Q4 = "Kurang cocok kalau kita ingin tahu pukul berapa kegiatan dimulai, karena batang tidak memuat jam.";

const BATANG_Q = (y0: number) => ({
  lari: batangLama("q1", y0, "lari", 1, "1 jam", W.hijauMuda, 56),
  senam: batangLama("q2", y0 + 30, "senam", 2, "2 jam", W.merahMuda, 56),
  lompat: batangLama("q3", y0 + 60, "lompat tali", 0.25, "15 menit", W.lavender, 56),
});

export const ADEGAN_LUAR_BATANG_TERAPAN: AdeganStory = {
  id: "luar-batang-terapan",
  judul: "Chacha menggambar batang kegiatan",
  sumber: "Metode global: Duration Bars (terapan)",
  latar: "#FEF2F2",
  ketukan: [
    k(
      SUARA_Q1,
      bersih(0),
      tambah(0, judul("Batang Tiga Kegiatan")),
      tambah("Chacha", ...tokoh("ch", 40, 176, "Chacha")),
      tambah("lari,", ...BATANG_Q(40).lari),
      tambah("senam,", ...BATANG_Q(40).senam),
      tambah("lompat", ...BATANG_Q(40).lompat),
      sorotkan("paling", "q2"),
    ),
    k(
      SUARA_Q2,
      ubah(0, { id: "q2", sorot: false }),
      tambah("lama", ...kartu("kl", 236, 66, 60, 24, W.emas, ["lebih lama"], 8.6)),
      sorotkan("lama", "q2"),
      tambah("sebentar", ...kartu("kb", 156, 96, 100, 24, W.krem, ["lebih sebentar"], 8.6)),
      sorotkan("sebentar", "q3"),
    ),
    k(
      SUARA_Q3,
      bersih(0),
      tambah(0, judul("Kapan Cocok?"), ...kartu("cc", 90, 34, 120, 24, W.hijauMuda, ["Cocok"], 12)),
      tambah("membandingkan", ...BATANG_Q(70).lari, ...BATANG_Q(70).senam, ...BATANG_Q(70).lompat),
      tambah("kegiatan", emo("kc", 262, 100, E.kaca, 26)),
      tambah("sekaligus.", emo("ok", 262, 150, E.benar, 24)),
    ),
    k(
      SUARA_Q4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?"), ...kartu("kc", 80, 34, 140, 24, W.merahMuda, ["Kurang cocok"], 12)),
      tambah("pukul", ...jam("j", { ...JAM_KANAN, cy: 112, r: 38 }, 6, 0, false), emo("tq", 222, 62, E.tanya, 22)),
      tambah("batang", ...batangLama("q2", 100, "senam", 2, "2 jam", W.merahMuda, 28, 78)),
      tambah("jam.", emo("x1", 150, 164, E.salah, 24)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_R1 = "Kita sudah melihat tiga cara. Mana yang pas? Itu tergantung pertanyaannya.";
const SUARA_R2 = "Ingin mengurutkan kegiatan, pakai Garis Waktu Hari. Ingin menghitung berapa jam, pakai Jalur Jam.";
const SUARA_R3 = "Ingin membandingkan lama kegiatan, pakai Batang Lama Kegiatan. Apa pun caranya, lihat jam dengan teliti.";
const SUARA_R4 = "Menurutmu, untuk mengatur jadwal belajarmu di rumah, kamu pilih cara yang mana?";

const NAMA_ID = ["Garis Waktu Hari", "Jalur Jam", "Batang Lama Kegiatan"] as const;
const WARNA_R = [W.hijauMuda, W.langit, W.pink] as const;

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Mana cara yang pas?",
  sumber: "Metode global: ringkasan",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_R1,
      bersih(0),
      tambah(0, judul("Ringkasan Tiga Cara")),
      tambah("tiga", teks("t3", 262, 34, "3 cara", 10, W.ungu)),
      tambah("cara.", ...NAMA_ID.flatMap((n, i) => kartu(`r${i}`, 20, 44 + i * 40, 260, 32, WARNA_R[i], [`${i + 1}. ${n}`], 10.5))),
      tambah("pas?", emo("tq", 150, 178, E.tanya, 24)),
      sorotkan("pertanyaannya.", "r0-k", "r1-k", "r2-k"),
    ),
    k(
      SUARA_R2,
      ubah(0, ...[0, 1, 2].map((i) => ({ id: `r${i}-k`, sorot: false }))),
      tambah("mengurutkan", emo("i0", 256, 60, "\u{1F31E}", 16)),
      sorotkan("Garis", "r0-k"),
      tambah("menghitung", emo("i1", 256, 100, "\u{1F9EE}", 16)),
      ubah("Jalur", { id: "r0-k", sorot: false }),
      sorotkan("Jalur", "r1-k"),
    ),
    k(
      SUARA_R3,
      ubah(0, { id: "r1-k", sorot: false }),
      tambah("membandingkan", emo("i2", 256, 140, "\u{1F4CA}", 16)),
      sorotkan("Batang", "r2-k"),
      tambah("lihat", emo("kc", 60, 178, E.kaca, 24)),
      tambah("teliti.", emo("ok", 240, 178, E.benar, 24)),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Jadwal Belajarmu"), emo("tq", 150, 50, E.tanya, 26)),
      tambah("jadwal", ...papanJadwal("pp", 90, 62, 120, 50), teks("pj", 150, 92, "jadwal belajar", 10, W.biru)),
      tambah("belajarmu", emo("ct", 150, 138, E.catat, 20)),
      tambah("cara", emo("e0", 60, 164, "\u{1F31E}", 22), emo("e1", 150, 164, "\u{1F9EE}", 22), emo("e2", 240, 164, "\u{1F4CA}", 22)),
      tambah("mana?", teks("g0", 60, 190, "Garis", 9, W.ungu), teks("g1", 150, 190, "Jalur", 9, W.ungu), teks("g2", 240, 190, "Batang", 9, W.ungu)),
    ),
  ],
};
