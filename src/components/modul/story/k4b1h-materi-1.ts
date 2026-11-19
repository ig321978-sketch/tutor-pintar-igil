import type { AdeganStory } from "./logika-story";
import { E, W, angkaSus, bersusunDasar, emo, garisSus, idPintu, judul, kartu, kerumunan, lorong, panah, pintu, sikat, teks, tokoh, busa } from "./k4b1h-gambar";
import { hapus, k, sorotkan, tambah } from "./k4b1h-bantu";

/*
 * Cerita orisinal IGIL "Papan Jatah Bu Ratna" (Kelas 4 Bab 1 Sub-Bab H, pembagian sampai seratus), cerita Penginapan Pulau Karang Indah.
 * Naskah suara dari naskah/story-naskah-k4b1h.md. Bagian ini: lorong kamar, rombongan tamu, salah menurunkan angka.
 */

/* ------------------------------ 1. Lorong kamar ------------------------------ */
const SUARA_K1 = "Sore itu Bu Ratna berdiri di lorong kamar penginapan sambil memegang papan jatah.";
const SUARA_K2 = "Rombongan tamu baru tiba, dan semua harus dibagi ke kamar.";
const SUARA_K3 = "Ia ingin tiap kamar mendapat tamu sama banyak, dan meminta bantuan ketiga anak.";
const PINTU_X = [100, 138, 176, 214];

export const ADEGAN_KAMAR: AdeganStory = {
  id: "kamar",
  judul: "Lorong kamar penginapan",
  sumber: "Materi: lorong kamar",
  latar: "#FEF3C7",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Lorong Kamar"), ...lorong("lr", 150)),
      tambah("Ratna", ...tokoh("br", 40, 184, "Bu Ratna")),
      tambah("lorong", ...PINTU_X.flatMap((x, i) => pintu(`p${i}`, x, 96, i + 1, 30, 52))),
      sorotkan("jatah", "br-pj"),
    ),
    k(
      SUARA_K2,
      tambah("tamu", ...[0, 1, 2, 3, 4].map((i) => ({ id: `kt${i}`, t: "bulat" as const, x: 262 + i * 6, y: 140, r: 2.8, warna: i % 2 === 0 ? "#FDBA74" : "#93C5FD", garis: "#7C2D12", tebal: 0.7, z: 4 })), teks("tb", 270, 118, "tamu baru", 8, W.coklat), emo("kp", 276, 164, E.koper, 16)),
      tambah("dibagi", panah("pb", 256, 128, -22, -12, W.merah, 2.2)),
    ),
    k(
      SUARA_K3,
      tambah("sama", teks("sm", 160, 84, "sama banyak", 10, W.merah)),
      tambah("bantuan", ...tokoh("sa", 100, 184, "Satria"), ...tokoh("lr2", 140, 184, "Laras"), ...tokoh("ge", 180, 184, "Genta")),
      tambah("anak", ...tokoh("ph", 224, 184, "Pak Hendro")),
      sorotkan("anak", "sa", "lr2", "ge"),
    ),
  ],
};
export const ID_PINTU_KAMAR = PINTU_X.flatMap((_, i) => idPintu(`p${i}`));

/* ------------------------------ 2. Rombongan ------------------------------ */
const SUARA_R1 = "Rombongan itu terdiri atas lima puluh enam tamu.";
const SUARA_R2 = "Kamar yang tersedia ada empat.";
const SUARA_R3 = "Membagi berarti menaruh tamu sama banyak pada tiap kamar, dan itu ditulis lima puluh enam dibagi empat.";
const PINTU_R = [162, 196, 230, 264];

export const ADEGAN_ROMBONGAN: AdeganStory = {
  id: "rombongan",
  judul: "Lima puluh enam tamu, empat kamar",
  sumber: "Materi: rombongan tamu",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Rombongan Tamu")),
      tambah("terdiri", ...kerumunan("tm", 14, 78, 56, 14)),
      tambah("enam", teks("n56", 68, 60, "56 tamu", 12, W.merah)),
    ),
    k(
      SUARA_R2,
      tambah("tersedia", ...PINTU_R.flatMap((x, i) => pintu(`q${i}`, x, 70, i + 1, 28, 50))),
      tambah("empat", teks("n4", 228, 58, "4 kamar", 12, W.merah)),
    ),
    k(
      SUARA_R3,
      tambah("menaruh", panah("ar", 130, 96, 26, 0, W.merah, 2.4)),
      sorotkan("kamar,", ...PINTU_R.map((_, i) => `q${i}`)),
      tambah("ditulis", teks("rm", 150, 156, "56 : 4", 22, W.biru)),
    ),
  ],
};

/* ------------------------------ 3. Salah menurunkan angka ------------------------------ */
const SUARA_S1 = "Satria membagi lima dengan empat, hasilnya satu sisa satu, lalu ia berhenti dan menulis sebelas.";
const SUARA_S2 = "Ia berseru, sebelas tamu tiap kamar, selesai!";
const SUARA_S3 = "Kalau aku salah, aku menyikat lantai semua kamar, katanya.";
const BX = 70;
const BY = 96;

export const ADEGAN_SALAH_TURUN: AdeganStory = {
  id: "salah-turun",
  judul: "Satria lupa menurunkan angka",
  sumber: "Materi: salah langkah",
  latar: "#FEF2F2",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Hitungan Satria"), ...bersusunDasar("bs", BX, BY, "56", "4"), ...tokoh("sa", 240, 184, "Satria")),
      sorotkan("lima", "bs-d0", "bs-pb"),
      tambah("hasilnya", angkaSus("q1", BX, BY, 0, -1, "1", W.merah)),
      tambah("satu", angkaSus("pr", BX, BY, 0, 1, "4"), garisSus("gl1", BX, BY, 0, 0, 1)),
      tambah("sisa", angkaSus("sr", BX, BY, 0, 2, "1", W.merah)),
      tambah("berhenti", emo("st", 190, 130, E.tangan, 20)),
      tambah("sebelas.", teks("h11", 150, 100, "= 11", 24, W.merah)),
    ),
    k(
      SUARA_S2,
      tambah("sebelas", ...kartu("gb", 150, 124, 140, 26, "#FFFFFF", ["11 tamu tiap kamar!"], 8.6)),
      hapus("sebelas", "st"),
      tambah("selesai!", emo("ok", 262, 118, E.benar, 20)),
    ),
    k(
      SUARA_S3,
      tambah("salah,", teks("tr", 76, 50, "taruhan!", 11, W.merah)),
      tambah("menyikat", ...sikat("sk", 196, 150)),
      tambah("lantai", ...busa("bu", 118, 166, 5)),
      tambah("kamar,", ...pintu("pt", 262, 90, 4, 26, 48)),
      hapus("kamar,", "ok"),
    ),
  ],
};
