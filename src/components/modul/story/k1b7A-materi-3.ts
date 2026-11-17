import type { AdeganStory } from "./logika-story";
import { E, W, WT, burung, dahan, emo, judul, kartu, kotak, orang, panah, putus, rangka, tali, tanah, teks } from "./k1b7A-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah } from "./k1b7A-bantu";

/*
 * Cerita orisinal IGIL "Tiang dan Tangga" (Kelas 1 Bab 7 Sub-Bab A). Naskah suara dari naskah/story-naskah-k1b7a.md.
 * Bagian ini: tali pegangan dari garis awal, burung di dahan (tinggi dan rendah), dan penutup (jembatan ke papan lantai).
 */

/* ------------------------------ 7. Tali pegangan ------------------------------ */
const SUARA_A1 = "Kakek Jaya membawa tali pegangan. Tiga tali dijajarkan, ujung kirinya di garis yang sama.";
const SUARA_A2 = "Tali merah lebih panjang dari tali biru. Tali hijau paling pendek.";
const SUARA_A3 = "Kalau ujungnya tidak sejajar, tali pendek bisa tampak paling panjang!";
const YT = { tm: 70, tb: 96, th: 122 } as const;

export const ADEGAN_TALI: AdeganStory = {
  id: "tali",
  judul: "Tali pegangan dari garis awal",
  sumber: "Materi: tali dari garis awal sama",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_A1,
      bersih(0),
      tambah(0, judul("Tali pegangan tangga"), tanah("tn")),
      tambah("Kakek", ...orang("kj", 36, 176, E.kakek, "Kakek Jaya")),
      tambah("Tiga", teks("tg", 255, 84, "3 tali", 12, W.biru)),
      tambah("dijajarkan,", tali("tm", 70, YT.tm, 140, WT.merah), tali("tb", 70, YT.tb, 100, WT.biru), tali("th", 70, YT.th, 60, WT.hijau)),
      tambah("garis", putus("ga", 70, 54, 70, 140, W.merah, 2), teks("gt", 62, 151, "garis awal", 9, W.merah)),
    ),
    k(
      SUARA_A2,
      sorotkan("merah", "tm"),
      tambah("panjang", ...kartu("k1", 90, 146, 190, 20, W.krem, ["merah lebih panjang dari biru"], 9)),
      ubah("hijau", { id: "tm", sorot: false }, { id: "th", sorot: true }),
      tambah("pendek.", ...kartu("k2", 90, 170, 190, 20, "#BBF7D0", ["hijau paling pendek"], 9)),
    ),
    k(
      SUARA_A3,
      hapus(0, "k1-k", "k1-t0", "k2-k", "k2-t0", "gt"),
      ubah("tidak", { id: "th", x: 165, sorot: false }),
      tambah("sejajar,", teks("tk", 150, 170, "ujung kiri tidak sejajar", 9.4, W.merah)),
      tambah("tampak", teks("tp", 150, 152, "tampak paling panjang?", 9, W.biru)),
      tambah("panjang!", emo("sl", 254, 130, E.salah, 22)),
    ),
  ],
};

/* ------------------------------ 8. Burung di dahan ------------------------------ */
const SUARA_B1 = "Di dahan jambu bertengger tiga burung. Burung abu lebih tinggi dari burung putih.";
const SUARA_B2 = "Burung putih lebih rendah dari abu, dan burung cokelat paling rendah.";
const SUARA_B3 = "Tinggi dan rendah dipakai untuk letak benda di udara.";
const YB = { ba: 54, bp: 90, bc: 126 } as const;

export const ADEGAN_BURUNG: AdeganStory = {
  id: "burung",
  judul: "Burung di dahan jambu",
  sumber: "Materi: tinggi dan rendah, letak di udara",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_B1,
      bersih(0),
      tambah(0, judul("Burung di dahan jambu"), tanah("tn")),
      tambah("dahan", kotak("bg", 64, 40, 12, 110, WT.batang, W.biru, { rx: 3, tebal: 1.4, z: -2 }), dahan("d0", 76, YB.ba + 10, 110), dahan("d1", 76, YB.bp + 10, 110), dahan("d2", 76, YB.bc + 10, 110)),
      tambah("jambu", emo("jb", 40, 70, E.jambu, 20)),
      tambah("tiga", teks("tb", 250, 26, "3 burung", 11, W.biru)),
      tambah("burung.", ...burung("ba", 140, YB.ba, "#9CA3AF"), ...burung("bp", 140, YB.bp, "#FFFFFF"), ...burung("bc", 140, YB.bc, "#A16207")),
      sorotkan("abu", "ba"),
      tambah("abu", teks("la", 210, YB.ba + 4, "abu", 10, W.biru)),
      tambah("putih", teks("lp", 210, YB.bp + 4, "putih", 10, W.biru), teks("lc", 210, YB.bc + 4, "cokelat", 10, W.biru)),
      tambah("tinggi", ...kartu("ka", 60, 160, 180, 20, W.krem, ["abu lebih tinggi dari putih"], 9.4)),
    ),
    k(
      SUARA_B2,
      ubah(0, { id: "ba", sorot: false }),
      sorotkan("putih", "bp"),
      tambah("putih", teks("lp", 210, YB.bp + 4, "putih", 10, W.biru)),
      ubah("rendah", { id: "ka-t0", isi: "putih lebih rendah dari abu" }),
      ubah("cokelat", { id: "bp", sorot: false }, { id: "bc", sorot: true }),
      tambah("cokelat", teks("lc", 210, YB.bc + 4, "cokelat", 10, W.biru)),
      tambah("rendah@2", ...kartu("kb", 60, 180, 180, 18, "#FED7AA", ["cokelat paling rendah"], 9.4)),
    ),
    k(
      SUARA_B3,
      hapus(0, "ka-k", "ka-t0", "kb-k", "kb-t0", "la", "lp", "lc", "tb"),
      ubah(0, { id: "bc", sorot: false }),
      tambah("Tinggi", teks("ti", 250, 50, "tinggi", 11, W.merah), panah("pn", 250, 100, 250, 60, W.merah)),
      tambah("rendah", teks("re", 250, 150, "rendah", 11, W.hijau), panah("pr", 250, 106, 250, 140, W.hijau)),
      tambah("udara.", emo("aw", 250, 32, E.awan, 24)),
    ),
  ],
};

/* ------------------------------ 9. Penutup ------------------------------ */
const SUARA_N1 = "Ingat ya, dua benda memakai lebih, tiga benda atau lebih memakai paling.";
const SUARA_N2 = "Selalu mulai dari garis awal yang sama.";
const SUARA_N3 = "Abang bertanya, papan lantai rumah pohon harus berapa panjang? Menurutmu, bagaimana mengukurnya? Terima kasih, Igil, Kaka, Abang, dan Mamah!";
const [N3_IGIL, N3_KAKA] = [idx(SUARA_N3, "Igil"), idx(SUARA_N3, "Kaka")];
const [N3_ABANG, N3_MAMAH] = [idx(SUARA_N3, "Abang", 2), idx(SUARA_N3, "Mamah")];

export const ADEGAN_PENUTUP_A: AdeganStory = {
  id: "penutup",
  judul: "Ingat dan lanjut ke papan lantai",
  sumber: "Materi: ringkasan dan jembatan",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_N1,
      bersih(0),
      tambah(0, judul("Ingat ya!")),
      tambah("dua", ...kartu("r1", 20, 34, 260, 36, W.krem, ["2 benda: kata lebih"], 12)),
      tambah("tiga", ...kartu("r2", 20, 78, 260, 36, W.pink, ["3 benda atau lebih: kata paling"], 11)),
    ),
    k(
      SUARA_N2,
      tambah("Selalu", ...kartu("r3", 20, 122, 260, 36, "#BBF7D0", ["mulai dari garis awal sama"], 11)),
      tambah("garis", putus("ga", 30, 166, 270, 166, W.merah, 2.2)),
    ),
    k(
      SUARA_N3,
      bersih(0),
      tambah(0, tanah("tn"), ...rangka("rp", 150, 100)),
      tambah("Abang", kotak("gp", 124, 100, 52, 6, "#FFFBEB", W.merah, { rx: 1, tebal: 1.6, putus: true, z: -1 })),
      tambah("papan", ...kartu("pq", 96, 28, 108, 20, W.krem, ["papan lantai?"], 9.4)),
      tambah("panjang?", emo("tq", 222, 60, E.tanya, 26)),
      tambah("mengukurnya?", teks("uk", 150, 130, "bagaimana mengukurnya?", 9.4, W.biru)),
      tambah(N3_IGIL, ...orang("ig", 50, 176, E.igil, "Igil")),
      tambah(N3_KAKA, ...orang("kk", 110, 176, E.kaka, "Kaka")),
      tambah(N3_ABANG, ...orang("ab", 190, 176, E.abang, "Abang"), emo("lb", 208, 160, E.lambai, 18)),
      tambah(N3_MAMAH, ...orang("mm", 250, 176, E.mamah, "Mamah")),
    ),
  ],
};
