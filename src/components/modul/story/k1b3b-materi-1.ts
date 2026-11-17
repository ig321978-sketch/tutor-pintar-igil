import type { AdeganStory } from "./logika-story";
import { E, KURANG, W, deret, deretEmo, emo, ikatan, judul, kalimatK, label, orang, teks, troli } from "./k1b3b-gambar";
import { hapus, k, sorotkan, tambah, ubah } from "./k1b3b-bantu";

/*
 * Cerita orisinal IGIL "Pindah Kereta di Stasiun Besar" (Kelas 1 Bab 3 Sub-Bab B, berbagai cara mengurangi), lanjutan Kereta ke Rumah Nenek.
 * Masalah: kereta lanjutan segera berangkat; barang, peron, dan kursi harus dihitung cepat tanpa menghitung satu per satu.
 * Penyelesaian: satu bagan dua pengurangan, dikurangi nol dan bilangan yang sama, lompat mundur di garis bilangan, pasangan sepuluh.
 */

/* ------------------------------ 1. Pindah kereta di stasiun besar ------------------------------ */
const SUARA_S1 = "Kereta berhenti di stasiun besar. Igil, Kaka, Abang, dan Mamah harus pindah ke kereta lanjutan.";
const SUARA_S2 = "Kereta lanjutan berangkat sebentar lagi. Barang harus dibawa, peronnya harus dicari, dan kursinya harus cukup.";
const SUARA_S3 = "Mamah berseru, ayo cepat, kereta tidak mau menunggu! Tidak ada waktu untuk menghitung satu per satu. Mereka butuh cara cepat untuk mengurangi.";

export const ADEGAN_STASIUN: AdeganStory = {
  id: "stasiun-besar",
  judul: "Pindah kereta di stasiun besar",
  sumber: "Materi: masalah pindah kereta",
  latar: "#EEF2FF",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Pindah kereta")),
      tambah("stasiun", emo("st", 80, 82, E.stasiun, 40)),
      tambah("Igil,", ...orang("ig", 45, 160, E.igil, "Igil")),
      tambah("Kaka,", ...orang("kk", 115, 160, E.kaka, "Kaka")),
      tambah("Abang,", ...orang("ab", 185, 160, E.abang, "Abang")),
      tambah("Mamah", ...orang("mm", 255, 160, E.mamah, "Mamah")),
      tambah("lanjutan.", emo("kr", 220, 82, E.kereta, 40), teks("kl", 220, 112, "kereta lanjutan", 8.6, W.ungu)),
    ),
    k(
      SUARA_S2,
      hapus(0, "st", "kr", "kl"),
      tambah("sebentar", teks("jm", 150, 40, "sebentar lagi berangkat", 10, W.merah)),
      tambah("Barang", emo("br", 60, 86, E.koper, 26), teks("brn", 60, 114, "barang", 8.6, W.ungu)),
      tambah("peronnya", emo("pr", 150, 86, E.stasiun, 26), teks("prn", 150, 114, "peron", 8.6, W.ungu)),
      tambah("kursinya", emo("ks", 240, 86, E.kursi, 26), teks("ksn", 240, 114, "kursi", 8.6, W.ungu)),
    ),
    k(SUARA_S3, tambah("waktu", emo("jam", 270, 40, "\u{23F0}", 20)), sorotkan("satu", "br", "pr", "ks"), tambah("cara", teks("tq", 150, 192, "butuh cara cepat", 10, W.merah))),
  ],
};

/* ------------------------------ 2. Satu bagan, dua pengurangan ------------------------------ */
const SUARA_B1 = "Barang mereka ada tujuh. Lima koper dan dua tas.";
const SUARA_B2 = "Abang menggambar bagan pasangan. Tujuh di atas sebagai utuh, lima dan dua di bawah sebagai bagian.";
const SUARA_B3 = "Abang membawa lima koper. Yang tersisa untuk Kaka, tujuh dikurangi lima sama dengan dua tas.";
const SUARA_B4 = "Dari bagan yang sama ada kalimat kedua. Tujuh dikurangi dua sama dengan lima. Satu bagan, dua pengurangan.";
const KOPER = deret(5, 40, 30, 58);
const TAS = deret(2, 214, 30, 58);

export const ADEGAN_BAGAN: AdeganStory = {
  id: "bagan-barang",
  judul: "Satu bagan, dua pengurangan",
  sumber: "Materi: bagan pasangan",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Barang ada tujuh")),
      tambah("tujuh.", ...deretEmo(E.koper, "kp", KOPER, 22), ...deretEmo(E.tas, "ts", TAS, 22)),
      tambah("Lima", teks("tk", 100, 88, "5 koper", 9.5, W.biru)),
      tambah("tas.", teks("tt", 229, 88, "2 tas", 9.5, W.biru)),
    ),
    k(
      SUARA_B2,
      tambah("Abang", ...orang("ab", 36, 170, E.abang, "Abang")),
      tambah("bagan", ...ikatan("ik", 150, 122, "7", "5", "2")),
      sorotkan("utuh,", "ik-u"),
      sorotkan("bagian.", "ik-a", "ik-b"),
    ),
    k(
      SUARA_B3,
      hapus(0, "tk", "tt", ...KOPER.map((_, i) => `kp${i}`), ...TAS.map((_, i) => `ts${i}`)),
      sorotkan("lima", "ik-a"),
      tambah("Kaka,", ...orang("kk", 264, 170, E.kaka, "Kaka")),
      tambah("tujuh", ...kalimatK("k1", 150, 52, ["7", KURANG, "5", "=", "2"], 18, 26)),
      sorotkan("dua", "ik-b"),
    ),
    k(
      SUARA_B4,
      tambah("kedua.", ...kalimatK("k2", 150, 84, ["7", KURANG, "2", "=", "5"], 18, 26)),
      tambah("pengurangan.", ...label("dp", 208, 104, 84, "2 kalimat", W.emas)),
    ),
  ],
};

/* ------------------------------ 3. Dikurangi nol dan bilangan yang sama ------------------------------ */
const SUARA_T1 = "Di troli Mamah ada empat bungkus oleh-oleh. Belum ada yang diambil, berarti dikurangi nol.";
const SUARA_T2 = "Igil menebak, empat dikurangi nol pasti nol! Kaka menggeleng, tidak ada yang diambil, jadi banyaknya tetap. Empat dikurangi nol sama dengan empat.";
const SUARA_T3 = "Lalu Mamah memindahkan keempat bungkus ke tas besar. Empat dikurangi empat sama dengan nol. Troli kosong.";
const BUNGKUS = deret(4, 124, 26, 124);

export const ADEGAN_NOL_SAMA: AdeganStory = {
  id: "nol-sama",
  judul: "Dikurangi nol dan bilangan yang sama",
  sumber: "Materi: nol dan bilangan yang sama",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Troli oleh-oleh"), ...orang("mm", 40, 120, E.mamah, "Mamah")),
      tambah("troli", ...troli("tr", 104, 110, 120)),
      tambah("empat", ...deretEmo(E.bungkus, "bk", BUNGKUS, 20)),
      tambah("nol.", teks("t0", 164, 92, "diambil 0", 10, W.merah)),
    ),
    k(
      SUARA_T2,
      tambah("nol!", teks("sl", 164, 60, "0? keliru!", 13, W.merah)),
      hapus("menggeleng,", "sl"),
      tambah("tetap.", teks("tp", 164, 186, "tetap 4", 10, W.hijau)),
      tambah("Empat@2", ...kalimatK("k1", 164, 60, ["4", KURANG, "0", "=", "4"], 18, 26)),
    ),
    k(
      SUARA_T3,
      hapus(0, "t0", "tp", "k10", "k11", "k12", "k13", "k14"),
      tambah("tas", emo("tb", 266, 120, E.tas, 34)),
      ubah("besar.", ...BUNGKUS.map((_, i) => ({ id: `bk${i}`, x: 256 + (i % 2) * 18, y: 156 + Math.floor(i / 2) * 16, u: 14 }))),
      tambah("Empat@2", ...kalimatK("k2", 164, 60, ["4", KURANG, "4", "=", "0"], 18, 26)),
      tambah("kosong.", teks("ks", 164, 92, "troli kosong: 0", 10, W.merah)),
    ),
  ],
};
