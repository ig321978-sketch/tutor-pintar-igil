import type { AdeganStory } from "./logika-story";
import { E, W, WK, bedeng, biji, emo, garis, gerobak, judul, kartu, kotak, pagar, pindahGerobak, pindahTokoh, potongBulat, rumput, semangka, teks, tokoh, wadah, idSemangka } from "./k2b5A-gambar";
import { hapus, k, sorotkan, tambah, ubah } from "./k2b5A-bantu";

/*
 * Cerita orisinal IGIL "Semangka Raksasa Pak Danu" (Kelas 2 Bab 5 Sub-Bab A, setengah dari benda utuh), awal cerita Kebun Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b5a.md. Bagian ini: semangka datang, salah potong, adil itu tepat di tengah.
 */

/* ------------------------------ 1. Semangka datang ------------------------------ */
const SUARA_S1 = "Kebun sekolah sedang panen besar, dan Pak Danu mendorong gerobak berisi satu semangka raksasa!";
const SUARA_S2 = "Bu Sari berkata, semangka ini untuk dua regu penyiram, regu Merah dan regu Hijau. Bagiannya harus adil.";
const SUARA_S3 = "Kalau tidak adil, satu regu kecewa dan tidak mau menyiram kebun besok!";

export const ADEGAN_SEMANGKA_DATANG: AdeganStory = {
  id: "semangka-datang",
  judul: "Semangka raksasa datang",
  sumber: "Materi: semangka raksasa datang",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Kebun Sekolah"), rumput("rm"), ...pagar("pg", 8, 94, 284)),
      tambah("panen", ...bedeng("bd", 20, 134, 112), ...bedeng("be", 168, 134, 112)),
      tambah("Danu", ...tokoh("pd", 34, 180, "Pak Danu")),
      tambah("mendorong", ...gerobak("gr", 50, 152)),
      ubah("gerobak", ...pindahGerobak("gr", 72, 152)),
      tambah("satu", teks("n1", 105, 76, "1 semangka", 10, W.ungu)),
      tambah("semangka", ...semangka("sm", 101, 140, 15)),
      sorotkan("raksasa!", "sm"),
    ),
    k(
      SUARA_S2,
      tambah("Sari", ...tokoh("bs", 262, 180, "Bu Sari")),
      tambah("dua", ...kartu("kr", 156, 34, 96, 22, W.krem, ["Untuk 2 regu"], 9)),
      tambah("regu@2", emo("rk1", 186, 152, E.anak, 18)),
      tambah("Merah", ...wadah("em", 173, 162, 26, 20, 0, "#60A5FA", "#DC2626"), teks("lm", 186, 193, "Merah", 8, W.merah)),
      tambah("regu@3", emo("rk2", 222, 152, E.anak, 18)),
      tambah("Hijau.", ...wadah("eh", 209, 162, 26, 20, 0, "#60A5FA", "#16A34A"), teks("lh", 222, 193, "Hijau", 8, W.hijau)),
      sorotkan("adil.", "kr-k"),
    ),
    k(
      SUARA_S3,
      hapus(0, "kr-k", "kr-t0"),
      tambah("adil,", ...kartu("tk", 156, 34, 96, 22, W.merahMuda, ["Tidak adil"], 9)),
      tambah("satu", ...kartu("kc", 150, 62, 110, 22, W.merahMuda, ["1 regu kecewa"], 9)),
      ubah("kecewa", { id: "rk1", isi: E.geleng }),
      tambah("menyiram", emo("x1", 204, 146, E.salah, 16)),
      tambah("besok!", emo("kl", 262, 132, E.tanya, 22)),
    ),
  ],
};

/* ------------------------------ 2. Salah potong ------------------------------ */
const SUARA_P1 = "Chacha mengangkat pisau plastik dan langsung memotong semangka itu miring sembarangan.";
const SUARA_P2 = "Dika menggeleng. Chacha, lihat! Potongan regu Hijau jauh lebih besar daripada potongan regu Merah.";
const SUARA_P3 = "Potongan yang kecil menggelinding, dan Chacha mengejarnya sampai kakinya tersangkut di ember!";

const BESAR = potongBulat("pb", 178, 146, 22, 80, 380, WK.daging, WK.kulit);
const KECIL = potongBulat("pk", 185, 151, 22, 20, 80, WK.daging, WK.kulit);

export const ADEGAN_SALAH_POTONG: AdeganStory = {
  id: "salah-potong",
  judul: "Salah potong",
  sumber: "Materi: salah potong",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Salah Potong"), rumput("rm"), ...pagar("pg", 8, 94, 284)),
      tambah("Chacha", ...tokoh("ch", 52, 180, "Chacha")),
      tambah("pisau", garis("ps", 84, 138, 24, -12, "#94A3B8", 3, { z: 4 }), kotak("ph", 76, 136, 9, 6, W.merah, "#7F1D1D", { rx: 1, tebal: 1, z: 4 })),
      tambah("plastik", kotak("mj", 140, 168, 80, 8, WK.kayu, W.coklat, { rx: 1.5, tebal: 1.6, z: -1 }), garis("k1", 150, 176, 0, 20, W.coklat, 3), garis("k2", 210, 176, 0, 20, W.coklat, 3), ...semangka("sm", 178, 146, 22)),
      sorotkan("semangka", "sm"),
      ubah("memotong", { id: "ps", x: 150, y: 126 }, { id: "ph", x: 142, y: 124 }),
      tambah("miring", garis("gm", 162, 128, 34, 42, W.merah, 2.6, { putus: true, z: 5 })),
      tambah("sembarangan.", emo("tn", 178, 112, E.tanya, 18)),
    ),
    k(
      SUARA_P2,
      hapus(0, ...idSemangka("sm"), "gm", "ps", "ph", "tn"),
      tambah(0, BESAR, KECIL),
      tambah("Dika", ...tokoh("dk", 258, 180, "Dika")),
      ubah("menggeleng.", { id: "dk", isi: E.geleng }),
      tambah("Hijau", teks("th", 141, 150, "Hijau", 9, W.hijau)),
      tambah("jauh", emo("sx", 214, 128, E.salah, 18)),
      tambah("Merah.", teks("tm", 228, 150, "Merah", 9, W.merah)),
    ),
    k(
      SUARA_P3,
      ubah("menggelinding,", { id: "pk", x: (KECIL.x ?? 0) + 48, y: (KECIL.y ?? 0) + 14 }),
      ubah("mengejarnya", ...pindahTokoh("ch", 98, 180, "Chacha")),
      ubah("tersangkut", { id: "ch", isi: E.pusing }),
      tambah("ember!", ...wadah("eb", 120, 168, 26, 20, 0, "#60A5FA", "#475569")),
    ),
  ],
};

/* ------------------------------ 3. Adil itu tepat di tengah ------------------------------ */
const SUARA_A1 = "Nia berpikir. Adil berarti dua bagian sama besar, jadi kita harus memotong tepat di tengah.";
const SUARA_A2 = "Pak Danu membelah semangka baru tepat di tengah. Satu semangka menjadi dua bagian sama besar.";
const SUARA_A3 = "Setiap bagian itu kita sebut setengah.";

export const ADEGAN_ADIL_TENGAH: AdeganStory = {
  id: "adil-tengah",
  judul: "Adil itu tepat di tengah",
  sumber: "Materi: adil itu tepat di tengah",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Adil Itu Sama Besar"), rumput("rm", 134)),
      tambah("Nia", ...tokoh("ni", 40, 180, "Nia")),
      ubah("berpikir.", { id: "ni", isi: E.pikir }),
      tambah("dua", ...kartu("kd", 78, 34, 140, 22, W.krem, ["2 bagian sama besar"], 9)),
      tambah("memotong", ...semangka("sm", 176, 142, 26)),
      tambah("tepat", garis("gt", 176, 110, 0, 64, W.merah, 2.6, { putus: true, z: 5 })),
      sorotkan("tengah.", "gt"),
    ),
    k(
      SUARA_A2,
      hapus(0, ...idSemangka("sm"), "gt", "kd-k", "kd-t0"),
      tambah("Danu", ...tokoh("pd", 254, 180, "Pak Danu")),
      tambah("membelah", ...semangka("s2", 168, 142, 26), garis("g2", 168, 110, 0, 64, W.merah, 2.6, { putus: true, z: 5 })),
      hapus("tengah.", ...idSemangka("s2"), "g2"),
      tambah("tengah.", potongBulat("bl", 156, 142, 26, 90, 270, WK.daging, WK.kulit), potongBulat("br", 180, 142, 26, -90, 90, WK.daging, WK.kulit), ...biji("bj1", 146, 142), ...biji("bj2", 190, 142)),
      tambah("Satu", teks("n1", 96, 112, "1 semangka", 9, W.ungu)),
      tambah("dua", teks("n2", 232, 112, "2 bagian sama", 9, W.ungu)),
    ),
    k(
      SUARA_A3,
      sorotkan("bagian", "bl", "br"),
      tambah("sebut", teks("s1", 140, 188, "setengah", 9, W.hijau), teks("s2", 196, 188, "setengah", 9, W.hijau)),
      tambah("setengah.", emo("ok", 168, 108, E.benar, 20)),
    ),
  ],
};

