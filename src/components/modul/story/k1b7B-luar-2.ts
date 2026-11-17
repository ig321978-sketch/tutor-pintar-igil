import type { AdeganStory } from "./logika-story";
import { E, W, batangKotak, emo, judul, kartu, orang, panah, petak, sisi, teks } from "./k1b7B-gambar";
import { NAMA_METODE, WARNA_METODE, kepala } from "./k1b7B-luar-1";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k1b7B-bantu";

/* Video metode global Sub-Bab B "Papan Lantai Rumah Pohon": Estimate and Check, Grid Measuring, dan ringkasan. */

/* ------------------------------ 1. Estimate and Check: konsep ------------------------------ */
const SUARA_A1 = "Cara kedua, Estimate and Check, atau Kira-Kira lalu Periksa.";
const SUARA_A2 = "Kira-kira dulu berapa satuan, lalu ukur dengan benar.";
const SUARA_A3 = "Bandingkan perkiraan dengan hasil, lalu cari selisihnya.";
const SUARA_A4 = "Makin sering berlatih, perkiraan makin dekat. Mulailah dengan bilangan kecil, misalnya dua atau tiga satuan.";

export const ADEGAN_LUAR_KIRA: AdeganStory = {
  id: "luar-kira",
  judul: "Estimate and Check: kira-kira lalu periksa",
  sumber: "Metode global: Estimate and Check",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_A1,
      tambah("kedua,", ...kepala(1)),
      tambah("Estimate", emo("mt", 90, 100, E.mata, 30), ...kartu("e1", 56, 124, 90, 28, W.krem, ["kira-kira"], 10)),
      tambah("Periksa.", emo("kc", 210, 100, E.kaca, 30), ...kartu("e2", 164, 124, 90, 28, W.hijauMuda, ["periksa"], 10)),
    ),
    k(
      SUARA_A2,
      hapus(0, "mt", "kc", "e1-k", "e1-t0", "e2-k", "e2-t0"),
      tambah("Kira-kira", ...kartu("k1", 20, 70, 110, 40, W.krem, ["kira-kira", "dulu"], 10)),
      tambah("ukur", panah("pk", 134, 90, 28, 0, W.merah)),
      tambah("benar.", ...kartu("k2", 166, 70, 114, 40, W.hijauMuda, ["lalu ukur", "dengan benar"], 10)),
    ),
    k(
      SUARA_A3,
      hapus(0, "k1-k", "k1-t0", "k1-t1", "k2-k", "k2-t0", "k2-t1", "pk"),
      tambah("perkiraan", ...batangKotak("p", 4, 40, 70, 24, W.langit), teks("lp", 150, 124, "perkiraan", 9.4, W.biru)),
      tambah("hasil,", ...batangKotak("h", 6, 40, 138, 24, W.hijauMuda), teks("lh", 190, 154, "hasil", 9.4, W.biru, { anchor: "start" })),
      sorotkan("selisihnya.", "h4", "h5"),
    ),
    k(
      SUARA_A4,
      bersih(0),
      tambah(0, ...kepala(1)),
      tambah("sering", ...kartu("l0", 30, 64, 240, 26, W.krem, ["makin sering berlatih"], 10)),
      tambah("dekat.", ...kartu("l1", 30, 98, 240, 26, W.hijauMuda, ["perkiraan makin dekat"], 10)),
      tambah("dua", ...kartu("l2", 30, 140, 110, 30, W.langit, ["2 satuan"], 12)),
      tambah("tiga", ...kartu("l3", 160, 140, 110, 30, W.langit, ["3 satuan"], 12)),
    ),
  ],
};

/* ------------------------------ 2. Estimate and Check: terapan pada meja bengkel ------------------------------ */
const SUARA_B1 = "Kaka memperkirakan meja bengkel enam jengkal. Setelah diukur, hasilnya delapan jengkal.";
const SUARA_B2 = "Selisihnya dua. Delapan dikurangi enam sama dengan dua.";
const SUARA_B3 = "Cocok untuk melatih mata dan memeriksa apakah hasil masuk akal.";
const SUARA_B4 = "Kurang cocok kalau kita butuh ukuran pasti, karena perkiraan bukan hasil ukur.";

export const ADEGAN_LUAR_KIRA_TERAPAN: AdeganStory = {
  id: "luar-kira-terapan",
  judul: "Estimate and Check: meja bengkel",
  sumber: "Metode global: Estimate and Check, terapan",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, ...kepala(1)),
      tambah("Kaka", ...orang("kk", 262, 80, E.kaka, "Kaka")),
      tambah("enam", ...batangKotak("p", 6, 30, 66, 24, W.langit), teks("lp", 30, 62, "perkiraan 6", 9.4, W.biru, { anchor: "start" })),
      tambah("delapan", ...batangKotak("h", 8, 30, 112, 24, W.hijauMuda), teks("lh", 30, 108, "hasil 8", 9.4, W.biru, { anchor: "start" })),
    ),
    k(
      SUARA_B2,
      sorotkan("Selisihnya", "h6", "h7"),
      tambah("dua.", teks("kal", 150, 170, "8 – 6 = 2", 16, W.biru)),
    ),
    k(
      SUARA_B3,
      bersih(0),
      tambah(0, ...kepala(1)),
      tambah("Cocok", ...kartu("cc", 40, 70, 220, 30, W.hijauMuda, ["cocok: melatih mata"], 10.5), emo("ok", 276, 86, E.benar, 18)),
      tambah("memeriksa", ...kartu("cd", 40, 114, 220, 30, W.hijauMuda, ["cocok: memeriksa hasil"], 10.5), emo("kc", 276, 130, E.kaca, 18)),
    ),
    k(
      SUARA_B4,
      tambah("Kurang", ...kartu("kc2", 40, 158, 220, 30, W.merahMuda, ["kurang cocok: ukuran pasti"], 10.5), emo("sl", 276, 174, E.salah, 16)),
    ),
  ],
};

/* ------------------------------ 3. Grid Measuring: konsep ------------------------------ */
const SUARA_C1 = "Cara ketiga, Grid Measuring, atau Ukur di Kotak-Kotak.";
const SUARA_C2 = "Letakkan benda di kertas berpetak, lalu hitung kotak yang tertutup.";
const SUARA_C3 = "Semua kotak sama besar dan rapat, jadi tidak perlu khawatir celah.";
const SUARA_C4 = "Mulai menghitung dari ujung kiri, satu kotak untuk satu langkah. Jangan ada kotak yang terlewat.";

export const ADEGAN_LUAR_PETAK: AdeganStory = {
  id: "luar-petak",
  judul: "Grid Measuring: ukur di kotak-kotak",
  sumber: "Metode global: Grid Measuring",
  latar: "#F7FEE7",
  ketukan: [
    k(
      SUARA_C1,
      tambah("ketiga,", ...kepala(2)),
      tambah("Grid", ...petak("pt", 90, 70, 5, 3, 24)),
      tambah("Kotak-Kotak.", emo("kt", 150, 166, E.kertas, 26)),
    ),
    k(
      SUARA_C2,
      hapus(0, "kt"),
      tambah("benda", ...batangKotak("b", 4, 90, 70, 24, W.emas)),
      tambah("kertas", teks("lk", 150, 160, "kertas berpetak", 9.4, W.biru)),
      sorotkan("tertutup.", "b0", "b1", "b2", "b3"),
    ),
    k(
      SUARA_C3,
      hapus(0, "lk"),
      tambah("sama", ...kartu("c0", 30, 150, 110, 26, W.hijauMuda, ["sama besar"], 10)),
      tambah("rapat,", ...kartu("c1", 160, 150, 110, 26, W.hijauMuda, ["rapat"], 10)),
      tambah("celah.", emo("ok", 150, 192, E.benar, 14)),
    ),
    k(
      SUARA_C4,
      hapus(0, "c0-k", "c0-t0", "c1-k", "c1-t0", "ok"),
      tambah("ujung", panah("pu", 90, 62, 0, 6)),
      tambah("satu", ...kartu("sk", 40, 150, 220, 26, W.krem, ["1 kotak, 1 langkah"], 10.5)),
      tambah("terlewat.", emo("tl", 150, 188, E.mata, 16)),
    ),
  ],
};

/* ------------------------------ 4. Grid Measuring: terapan pada pita ------------------------------ */
const SUARA_D1 = "Igil menggambar pita merah sepanjang delapan kotak dan pita biru lima kotak.";
const SUARA_D2 = "Pita merah lebih panjang tiga kotak. Delapan dikurangi lima sama dengan tiga.";
const SUARA_D3 = "Cocok untuk membandingkan gambar benda di kertas.";
const SUARA_D4 = "Kurang cocok untuk benda besar, karena tidak muat di kertas.";

export const ADEGAN_LUAR_PETAK_TERAPAN: AdeganStory = {
  id: "luar-petak-terapan",
  judul: "Grid Measuring: pita merah dan biru",
  sumber: "Metode global: Grid Measuring, terapan",
  latar: "#F7FEE7",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, ...kepala(2)),
      tambah("Igil", ...orang("ig", 262, 176, E.igil, "Igil")),
      tambah("menggambar", ...petak("pt", 30, 62, 8, 3, 26)),
      tambah("merah", ...batangKotak("m", 8, 30, 62, 26, "#FCA5A5"), teks("lm", 262, 80, "8 kotak", 9.4, W.merah)),
      tambah("biru", ...batangKotak("u", 5, 30, 114, 26, "#93C5FD"), teks("lu", 262, 132, "5 kotak", 9.4, W.biru)),
    ),
    k(
      SUARA_D2,
      sorotkan("tiga", "m5", "m6", "m7"),
      tambah("Delapan", teks("kal", 150, 172, "8 – 5 = 3", 16, W.biru)),
    ),
    k(
      SUARA_D3,
      bersih(0),
      tambah(0, ...kepala(2)),
      tambah("Cocok", ...kartu("cc", 40, 90, 220, 36, W.hijauMuda, ["cocok: gambar di kertas"], 10.5), emo("ok", 276, 108, E.benar, 18)),
    ),
    k(
      SUARA_D4,
      tambah("Kurang", ...kartu("kc", 40, 138, 220, 36, W.merahMuda, ["kurang cocok: benda besar"], 10.5), emo("sl", 276, 156, E.salah, 16)),
    ),
  ],
};

const PILIH = [["Mengulang", "Satuan"], ["Kira-Kira lalu", "Periksa"], ["Ukur di", "Kotak-Kotak"]];

/* ------------------------------ 5. Ringkasan ------------------------------ */
const SUARA_E1 = "Kita sudah melihat tiga cara. Mana yang pas? Itu tergantung bendanya.";
const SUARA_E2 = "Benda lurus yang bisa dijangkau, pakai Mengulang Satuan. Ingin melatih mata, pakai Kira-Kira lalu Periksa.";
const SUARA_E3 = "Benda yang digambar di kertas, pakai Ukur di Kotak-Kotak. Apa pun caranya, mulailah dari ujung dan tulis nama satuannya.";
const SUARA_E4 = "Menurutmu, untuk mengukur lantai rumah pohon yang panjang, kamu pilih yang mana?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode global",
  sumber: "Ringkasan: tiga metode global",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_E1,
      tambah(0, judul("3 cara mengukur")),
      ...NAMA_METODE.map((m, i) => tambah(i === 0 ? "sudah" : i === 1 ? "pas?" : "tergantung", ...kartu(`r${i}`, 20, 34 + i * 46, 260, 38, WARNA_METODE[i], [m], 11))),
      tambah("bendanya.", emo("tn", 150, 190, E.tanya, 18)),
    ),
    k(
      SUARA_E2,
      hapus(0, "tn"),
      ubah("Benda", { id: "r0-t0", isi: "Mengulang Satuan: benda lurus" }),
      sorotkan("Mengulang", "r0-k"),
      ubah("melatih", { id: "r1-t0", isi: "Kira-Kira lalu Periksa: melatih mata" }),
      sorotkan("Kira-Kira", "r1-k"),
    ),
    k(
      SUARA_E3,
      ubah("digambar", { id: "r2-t0", isi: "Ukur di Kotak-Kotak: gambar di kertas" }),
      sorotkan("Ukur", "r2-k"),
      tambah("mulailah", ...kartu("lm", 40, 176, 220, 20, W.krem, ["mulai dari ujung, tulis nama satuan"], 8.6)),
    ),
    k(
      SUARA_E4,
      bersih(0),
      tambah(0, judul("Menurutmu?")),
      tambah("lantai", ...sisi("sd", 40, 60, 220, 14)),
      tambah("panjang,", emo("tn", 150, 110, E.tanya, 34)),
      ...PILIH.map((p, i) => tambah("mana?", ...kartu(`q${i}`, 20 + i * 90, 150, 86, 34, WARNA_METODE[i], p, 8))),
    ),
  ],
};
