import type { AdeganStory } from "./logika-story";
import { E, W, WARNA_LAMPION, batang, deretKue, emo, garisBilangan, judul, kartu, kisi, lampion, lapak, nampan, orang, panah, sandal, teks, bulat, xGaris, type Titik } from "./k1b6A-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k1b6A-bantu";

/*
 * Lanjutan cerita "Dua Nampan Kue" (Kelas 1 Bab 6 Sub-Bab A): selisih dengan mengurangi (dan Igil kehabisan jari), menyamakan dua nampan,
 * serta lampion yang selisihnya dilihat pada batang kotak dan garis bilangan.
 */

/* ------------------------------ 4. Selisih (lucu: jari tidak cukup) ------------------------------ */
const SUARA_S1 = "Delapan kurang dari dua belas. Dua belas lebih dari delapan.";
const SUARA_S2 = "Selisih dicari dengan mengurangi bilangan besar dengan bilangan kecil. Dua belas dikurangi delapan sama dengan empat.";
const SUARA_S3 = "Igil ingin menghitung dua belas dengan jari, tetapi jarinya hanya sepuluh. Dia melepas sandal untuk memakai jari kaki!";

export const ADEGAN_SELISIH: AdeganStory = {
  id: "selisih",
  judul: "Selisih: besar dikurangi kecil",
  sumber: "Materi: selisih dan mengurangi",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Kurang dari, lebih dari")),
      tambah("Delapan", teks("a8", 60, 76, "8", 26, W.merah)),
      tambah("kurang", teks("ak", 150, 76, "kurang dari", 10, W.biru)),
      tambah("belas", teks("a12", 240, 76, "12", 26, W.merah)),
      tambah("belas@2", teks("b12", 60, 146, "12", 26, W.merah)),
      tambah("lebih", teks("bl", 150, 146, "lebih dari", 10, W.biru)),
      tambah("delapan@2", teks("b8", 240, 146, "8", 26, W.merah)),
    ),
    k(
      SUARA_S2,
      bersih(0),
      tambah(0, judul("Mencari selisih")),
      tambah("Selisih", ...kartu("rm", 20, 34, 260, 26, W.krem, ["selisih = bilangan besar – bilangan kecil"], 9.4)),
      tambah("belas", teks("q12", 78, 120, "12", 28, W.biru), teks("lb1", 78, 146, "besar", 9, W.hijau)),
      tambah("dikurangi", teks("qm", 122, 120, "–", 28, W.biru)),
      tambah("delapan", teks("q8", 164, 120, "8", 28, W.biru), teks("lb2", 164, 146, "kecil", 9, W.hijau)),
      tambah("sama", teks("qs", 202, 120, "=", 28, W.biru)),
      tambah("empat.", teks("q4", 244, 120, "4", 28, W.merah)),
    ),
    k(
      SUARA_S3,
      bersih(0),
      tambah(0, judul("Jari tidak cukup")),
      tambah("Igil", ...orang("ig", 150, 124, E.igil, "Igil")),
      tambah("jari,", emo("jr1", 108, 104, E.tangan, 24), emo("jr2", 192, 104, E.tangan, 24)),
      tambah("belas", teks("t12", 150, 62, "12?", 18, W.merah)),
      tambah("sepuluh.", teks("t10", 150, 84, "jari: 10", 12, W.biru)),
      tambah("sandal", ...sandal("sd1", 128, 172), ...sandal("sd2", 158, 172)),
      ubah("memakai", { id: "sd1", x: 36, y: 138, rot: -25 }, { id: "sd1-x", x: 40, y: 135, rot: -25 }, { id: "sd2", x: 250, y: 138, rot: 25 }, { id: "sd2-x", x: 254, y: 135, rot: 25 }),
      tambah("kaki!", emo("kk", 150, 168, E.kaki, 22), teks("tk", 150, 192, "pakai jari kaki", 9, W.ungu)),
    ),
  ],
};

/* ------------------------------ 5. Menyamakan dua nampan ------------------------------ */
const SUARA_M1 = "Mamah ingin kedua nampan sama banyak supaya adil.";
const SUARA_M2 = "Boleh menambah empat kue pukis, atau mengambil empat kue cubit.";
const SUARA_M3 = "Banyak yang ditambah atau diambil sama dengan selisihnya, yaitu empat.";
const TCM: Titik[] = kisi(12, 24, 58, 6, 18, 18);
const TPM: Titik[] = kisi(12, 180, 58, 6, 18, 18);
const BARU = TPM.slice(8, 12);
const ASAL: Titik[] = BARU.map((_, i) => ({ x: 216 + i * 18, y: 34 }));

export const ADEGAN_SAMAKAN: AdeganStory = {
  id: "samakan",
  judul: "Menyamakan dua nampan",
  sumber: "Materi: menyamakan banyaknya",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Samakan banyaknya"), ...nampan("na", 12, 44, 120, 46), ...nampan("nb", 168, 44, 120, 46), ...deretKue("cubit", "c", TCM), ...deretKue("pukis", "k", TPM.slice(0, 8))),
      tambah("Mamah", ...orang("mm", 150, 156, E.mamah, "Mamah")),
      tambah("sama", ...kartu("sm", 100, 108, 100, 22, W.emas, ["sama banyak"], 10)),
      tambah("adil.", emo("sj", 240, 160, "\u{2696}\u{FE0F}", 24)),
    ),
    k(
      SUARA_M2,
      hapus(0, "sm-k", "sm-t0"),
      tambah("menambah", ...kartu("tb", 168, 108, 122, 22, W.hijauMuda, ["tambah 4 pukis"], 9), ...BARU.map((_, i) => ({ ...(deretKue("pukis", "n", [ASAL[i]])[0]), id: `n${i}` }))),
      ubah("pukis,", ...BARU.map((p, i) => ({ id: `n${i}`, x: p.x, y: p.y }))),
      tambah("pukis,", teks("r1", 228, 100, "jadi 12", 9, W.hijau)),
      tambah("mengambil", ...kartu("am", 14, 108, 122, 22, W.pink, ["ambil 4 cubit"], 9)),
      ubah("cubit.", ...[8, 9, 10, 11].map((i) => ({ id: `c${i}`, x: TCM[i].x, y: 32 }))),
      tambah("cubit.", teks("r2", 72, 100, "jadi 8", 9, W.hijau)),
    ),
    k(
      SUARA_M3,
      hapus(0, "mm", "mm-n", "sj"),
      sorotkan("ditambah", "tb-k"),
      sorotkan("diambil", "am-k"),
      tambah("selisihnya,", ...kartu("se", 60, 146, 180, 30, W.krem, ["tambah = ambil = selisih"], 9.4)),
      ubah("empat.", { id: "se-t0", isi: "tambah 4 = ambil 4 = selisih 4" }),
    ),
  ],
};

/* ------------------------------ 6. Lampion: batang kotak dan garis bilangan ------------------------------ */
const SUARA_L1 = "Di atas lapak tergantung tujuh lampion merah dan sepuluh lampion kuning. Abang menggambar dua batang kotak.";
const SUARA_L2 = "Batang kuning lebih panjang tiga kotak. Di garis bilangan, dari tujuh ke sepuluh melompat tiga langkah.";
const SUARA_L3 = "Selisihnya tiga. Sepuluh dikurangi tujuh sama dengan tiga.";
const MERAH = "#F87171";
const KUNING = "#FDE047";
const GB = { x0: 60, y: 150, dari: 6, sampai: 11, jarak: 36 };
const gx = (n: number): number => xGaris(GB.x0, GB.dari, GB.jarak, n);
const IDS_BATANG = [...Array.from({ length: 7 }, (_, i) => `br${i}`), ...Array.from({ length: 10 }, (_, i) => `by${i}`), "k3"];

export const ADEGAN_LAMPION: AdeganStory = {
  id: "lampion",
  judul: "Lampion merah dan kuning",
  sumber: "Materi: batang kotak dan garis bilangan",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Lampion di atas lapak"), ...lapak("lp", 6, 22, 288, 60)),
      tambah("tujuh", ...Array.from({ length: 7 }, (_, i) => lampion(`rl${i}`, 24 + i * 19, 58, WARNA_LAMPION.merah, 6)).flat(), teks("m7", 81, 80, "7", 11, W.merah)),
      tambah("sepuluh", ...Array.from({ length: 10 }, (_, i) => lampion(`yl${i}`, 156 + i * 14.5, 58, WARNA_LAMPION.kuning, 5.4)).flat(), teks("m10", 221, 80, "10", 11, W.coklat)),
      tambah("Abang", ...orang("ab", 256, 142, E.abang, "Abang")),
      tambah("dua", teks("n2", 232, 108, "2 batang", 9, W.biru)),
      tambah("batang", ...batang("br", 40, 118, 7, MERAH), ...batang("by", 40, 142, 10, KUNING)),
    ),
    k(
      SUARA_L2,
      bersih(0),
      tambah(0, judul("Batang dan garis bilangan"), ...batang("br", 40, 36, 7, MERAH), ...batang("by", 40, 58, 10, KUNING), ...garisBilangan("gb", GB.x0, GB.y, GB.dari, GB.sampai, GB.jarak)),
      sorotkan("tiga", "by7", "by8", "by9"),
      tambah("tiga", teks("k3", 226, 70, "3 kotak", 10, W.merah)),
      tambah("tujuh", bulat("m7", gx(7), GB.y, 5, W.biru, W.putih, { tebal: 1.4 })),
      tambah("sepuluh", bulat("m10", gx(10), GB.y, 5, W.merah, W.putih, { tebal: 1.4 })),
      tambah("melompat", panah("h1", gx(7) + 4, 138, gx(8) - 3, 138), panah("h2", gx(8) + 4, 138, gx(9) - 3, 138), panah("h3", gx(9) + 4, 138, gx(10) - 3, 138)),
      tambah("tiga@2", teks("lg", 150, 124, "3 langkah", 10, W.merah)),
    ),
    k(
      SUARA_L3,
      hapus(0, ...IDS_BATANG),
      tambah("tiga", ...kartu("sd", 100, 34, 100, 22, W.emas, ["selisih = 3"], 10)),
      tambah("Sepuluh", teks("g10", 96, 100, "10", 24, W.biru)),
      tambah("dikurangi", teks("gm", 130, 100, "–", 24, W.biru)),
      tambah("tujuh", teks("g7", 158, 100, "7", 24, W.biru)),
      tambah("sama", teks("gs", 186, 100, "=", 24, W.biru)),
      tambah("tiga@2", teks("g3", 214, 100, "3", 24, W.merah)),
    ),
  ],
};
