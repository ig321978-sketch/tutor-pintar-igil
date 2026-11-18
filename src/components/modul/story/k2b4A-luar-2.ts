import type { AdeganStory } from "./logika-story";
import { E, W, bulat, emo, idPeta, judul, kartu, karya, lantai, meja, panah, peta, sekat, teks, tengahSel, tokoh } from "./k2b4A-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah } from "./k2b4A-bantu";

/*
 * Cerita orisinal IGIL "Rak Pameran Pak Hasan" (Kelas 2 Bab 4 Sub-Bab A), video metode global.
 * Naskah suara dari naskah/story-naskah-k2b4a.md. Bagian ini: Treasure Map (Peta Harta Karun), Barrier Game (Permainan Sekat), terapannya, dan ringkasan.
 */

/* ------------------------------ Treasure Map: konsep ------------------------------ */
const SUARA_P1 = "Cara kedua, Treasure Map, atau Peta Harta Karun.";
const SUARA_P2 = "Gambar kotak-kotak seperti papan catur, lalu sembunyikan harta di satu kotak.";
const SUARA_P3 = "Petunjuknya memakai posisi, misalnya, kotak di atas bintang, lalu kotak di sebelah kanannya.";
const SUARA_P4 = "Tiap petunjuk menggeser kita satu kotak, sampai tiba di tempat harta.";

const PX = 90;
const PY = 40;
const sel = (i: number) => tengahSel(PX, PY, 4, i, 30);
const SEMUA = idPeta("pt", 4, 3).slice(1);

export const ADEGAN_LUAR_PETA: AdeganStory = {
  id: "luar-peta",
  judul: "Treasure Map: Peta Harta Karun",
  sumber: "Metode global: Treasure Map (konsep)",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Cara 2: Treasure Map")),
      tambah("Treasure", ...peta("pt", PX, PY, 4, 3, 30)),
      tambah("Peta", teks("pn", 150, 170, "Peta Harta Karun", 11, W.ungu)),
    ),
    k(
      SUARA_P2,
      hapus(0, "pn"),
      sorotkan("kotak-kotak", ...SEMUA),
      redamkan("lalu", ...SEMUA),
      ubah("sembunyikan", { id: "ptc6", warna: "#FEF08A" }),
      tambah("harta", emo("ht", sel(6).x, sel(6).y + 6, E.harta, 18)),
      tambah("satu", teks("n1", 150, 160, "1 kotak", 11, W.merah)),
      sorotkan("kotak.@2", "ptc6"),
    ),
    k(
      SUARA_P3,
      hapus(0, "n1"),
      redamkan(0, "ptc6"),
      tambah("atas", panah("a1", sel(9).x, sel(9).y - 8, 0, -22, W.merah, 3)),
      tambah("bintang,", emo("st", sel(9).x, sel(9).y + 6, E.bintang, 18)),
      tambah("kanannya.", panah("a2", sel(5).x + 6, sel(5).y, 18, 0, W.hijau, 3)),
    ),
    k(
      SUARA_P4,
      hapus(0, "a1", "a2"),
      tambah("menggeser", emo("jr", sel(9).x, sel(9).y + 14, E.jari, 22)),
      ubah("satu", { id: "jr", x: sel(5).x, y: sel(5).y + 14 }),
      tambah("satu", teks("n1", 150, 160, "1 kotak", 11, W.merah)),
      ubah("tiba", { id: "jr", x: sel(6).x, y: sel(6).y + 14 }),
      sorotkan("harta.", "ht", "ptc6"),
    ),
  ],
};

/* ------------------------------ Treasure Map: terapan ------------------------------ */
const SUARA_Q1 = "Nia menggambar peta kotak dengan bintang di tengah. Harta ada di bawah bintang, lalu di sebelah kiri.";
const SUARA_Q2 = "Ia menggeser jarinya turun satu kotak, lalu ke kiri satu kotak, dan menemukan gambar koin.";
const SUARA_Q3 = "Cocok kalau petunjuknya berurutan dan kita ingin melihat jalannya.";
const SUARA_Q4 = "Kurang cocok kalau tidak ada gambar kotak, karena petunjuk mudah tertukar.";

const QX = 105;
const QY = 50;
const sel3 = (i: number) => tengahSel(QX, QY, 3, i, 30);

export const ADEGAN_LUAR_PETA_TERAPAN: AdeganStory = {
  id: "luar-peta-terapan",
  judul: "Treasure Map: peta Nia",
  sumber: "Metode global: Treasure Map (terapan)",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, judul("Peta Nia")),
      tambah("Nia", ...tokoh("ni", 36, 178, "Nia")),
      tambah("peta", ...peta("pq", QX, QY, 3, 3, 30)),
      tambah("bintang", emo("st", sel3(4).x, sel3(4).y + 6, E.bintang, 18)),
      tambah("bawah", panah("a1", sel3(4).x, sel3(4).y + 10, 0, 18, W.merah, 3)),
      sorotkan("bintang,@2", "st"),
      tambah("kiri.", panah("a2", sel3(7).x - 6, sel3(7).y, -18, 0, W.hijau, 3)),
    ),
    k(
      SUARA_Q2,
      hapus(0, "a1", "a2", "st"),
      tambah("jarinya.", emo("jr", sel3(4).x, sel3(4).y + 14, E.jari, 22)),
      ubah("turun", { id: "jr", x: sel3(7).x, y: sel3(7).y + 14 }),
      tambah("satu", teks("n1", 232, 116, "1 kotak", 9.6, W.merah)),
      ubah("kiri", { id: "jr", x: sel3(6).x, y: sel3(6).y + 14 }),
      tambah("satu@2", teks("n2", 64, 142, "1 kotak", 9.6, W.merah)),
      tambah("gambar", bulat("kn", sel3(6).x, sel3(6).y, 9, "#FACC15", "#CA8A04"), bulat("kn2", sel3(6).x, sel3(6).y, 5, "#FDE047", "#CA8A04")),
      sorotkan("koin.", "kn"),
    ),
    k(
      SUARA_Q3,
      bersih(0),
      tambah(0, judul("Kapan Cocok?")),
      tambah("Cocok", emo("ok", 236, 84, E.benar, 28)),
      tambah("petunjuknya", ...kartu("cs", 40, 60, 80, 24, W.langit, ["turun"], 10)),
      tambah("berurutan", panah("pa", 124, 72, 26, 0, W.ungu, 2.6), ...kartu("ct", 154, 60, 60, 24, W.hijauMuda, ["kiri"], 10)),
      tambah("melihat", emo("mt", 90, 130, E.mata, 28)),
      tambah("jalannya.", panah("pj", 150, 136, 60, 0, W.merah, 3), emo("hj", 224, 140, E.harta, 22)),
    ),
    k(
      SUARA_Q4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?")),
      tambah("Kurang", emo("xs", 236, 84, E.salah, 28)),
      tambah("gambar", ...kartu("kc", 50, 150, 200, 26, W.merahMuda, ["tidak ada gambar kotak"], 9.4)),
      tambah("petunjuk", teks("t1", 80, 70, "kanan", 12, W.hijau), teks("t2", 150, 70, "kiri", 12, W.merah)),
      tambah("mudah", panah("pt1", 90, 88, 40, 26, W.ungu, 2.2), panah("pt2", 140, 88, -40, 26, W.ungu, 2.2)),
      tambah("tertukar.", emo("tq", 110, 128, E.tanya, 24), emo("tq2", 150, 128, E.tanya, 24)),
    ),
  ],
};

/* ------------------------------ Barrier Game: konsep ------------------------------ */
const SUARA_B1 = "Cara ketiga, Barrier Game, atau Permainan Sekat.";
const SUARA_B2 = "Dua orang duduk dengan sekat di tengah. Satu orang menata benda, dan yang lain tidak boleh mengintip.";
const SUARA_B3 = "Orang pertama menyebutkan posisi benda dengan kata, dan orang kedua menatanya sesuai ucapan.";
const SUARA_B4 = "Setelah selesai, sekat dibuka dan kedua tatanan dibandingkan.";

export const ADEGAN_LUAR_SEKAT: AdeganStory = {
  id: "luar-sekat",
  judul: "Barrier Game: Permainan Sekat",
  sumber: "Metode global: Barrier Game (konsep)",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Cara 3: Barrier Game"), lantai("lt")),
      tambah("Barrier", ...sekat("sk", 146, 56, 110)),
      tambah("Permainan", teks("pn", 150, 44, "Permainan Sekat", 11, W.ungu)),
    ),
    k(
      SUARA_B2,
      hapus(0, "pn"),
      tambah("Dua", teks("n2", 150, 44, "2 orang", 11, W.merah)),
      tambah("duduk", ...tokoh("dk", 50, 178, "Dika"), ...tokoh("ch", 250, 178, "Chacha")),
      tambah("sekat", meja("m1", 20, 150, 110), meja("m2", 166, 150, 110)),
      tambah("Satu", teks("n1", 70, 70, "1 orang", 10, W.merah)),
      tambah("menata", karya("lm", "lampion", 52, 139), karya("tp", "topeng", 90, 139)),
      tambah("tidak", emo("xm", 214, 112, E.salah, 20)),
      tambah("mengintip.", emo("mt", 190, 96, E.mata, 22)),
    ),
    k(
      SUARA_B3,
      hapus(0, "xm", "mt", "n1"),
      tambah("menyebutkan", ...kartu("gb", 20, 70, 116, 34, W.putih, ["lampion di sebelah", "kiri topeng"], 7.6)),
      tambah("dengan", panah("pb", 138, 88, 36, 0, W.ungu, 2.6)),
      tambah("menatanya", karya("lm2", "lampion", 188, 139), karya("tp2", "topeng", 226, 139)),
      sorotkan("ucapan.", "gb-k"),
    ),
    k(
      SUARA_B4,
      hapus(0, "gb-k", "gb-t0", "gb-t1", "pb", "n2"),
      hapus("dibuka", "sk", "sk-k"),
      tambah("tatanan", teks("sm", 150, 104, "sama", 11, W.hijau)),
      tambah("dibandingkan.", emo("ok", 150, 130, E.benar, 24)),
    ),
  ],
};

/* ------------------------------ Barrier Game: terapan ------------------------------ */
const SUARA_R1 = "Dika menata tiga benda di balik sekat, lalu berkata, lampion di sebelah kiri topeng, dan boneka di atas topeng.";
const SUARA_R2 = "Chacha menata dengan ucapan itu. Saat sekat dibuka, tatanannya sama!";
const SUARA_R3 = "Cocok kalau kita ingin memastikan petunjuk kita jelas dan lengkap.";
const SUARA_R4 = "Kurang cocok kalau bendanya terlalu banyak, karena petunjuknya jadi panjang dan mudah terlewat.";

export const ADEGAN_LUAR_SEKAT_TERAPAN: AdeganStory = {
  id: "luar-sekat-terapan",
  judul: "Barrier Game: tatanan Dika",
  sumber: "Metode global: Barrier Game (terapan)",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Dika Menata"), lantai("lt"), ...sekat("sk", 146, 56, 110), meja("m1", 20, 150, 110), meja("m2", 166, 150, 110)),
      tambah("Dika", ...tokoh("dk", 50, 178, "Dika")),
      tambah("tiga", teks("n3", 150, 44, "3 benda", 11, W.merah)),
      tambah("benda", karya("tp", "topeng", 90, 139)),
      tambah("berkata,", ...kartu("gb", 20, 70, 116, 34, W.putih, ["lampion di kiri topeng,", "boneka di atas topeng"], 7.2)),
      tambah("lampion", karya("lm", "lampion", 52, 139)),
      tambah("boneka", karya("bn", "boneka", 90, 114)),
    ),
    k(
      SUARA_R2,
      hapus(0, "gb-k", "gb-t0", "gb-t1", "n3"),
      tambah("Chacha", ...tokoh("ch", 250, 178, "Chacha")),
      tambah("menata", karya("lm2", "lampion", 188, 139)),
      tambah("ucapan", karya("tp2", "topeng", 226, 139)),
      tambah("itu.", karya("bn2", "boneka", 226, 114)),
      hapus("dibuka,", "sk", "sk-k"),
      tambah("sama!", teks("sm", 150, 104, "sama", 11, W.hijau), emo("ok", 150, 130, E.benar, 24)),
    ),
    k(
      SUARA_R3,
      bersih(0),
      tambah(0, judul("Kapan Cocok?")),
      tambah("Cocok", emo("ok", 236, 84, E.benar, 28)),
      tambah("petunjuk", ...kartu("p1", 50, 70, 100, 24, W.hijauMuda, ["jelas"], 10)),
      tambah("jelas", ...kartu("p2", 50, 100, 100, 24, W.langit, ["lengkap"], 10)),
      tambah("lengkap.", emo("kc", 90, 150, E.kaca, 28)),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?")),
      tambah("Kurang", emo("xs", 236, 84, E.salah, 28)),
      tambah("banyak,", ...[0, 1, 2, 3, 4, 5].map((i) => karya(`bk${i}`, (["guci", "kendi", "topeng", "lampion", "wayang", "boneka"] as const)[i], 50 + i * 36, 70))),
      tambah("panjang", ...kartu("pj", 30, 110, 240, 24, W.merahMuda, ["petunjuk sangat panjang, mudah terlewat"], 8.6)),
      tambah("terlewat.", emo("tq", 150, 160, E.tanya, 28)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_G1 = "Kita sudah melihat tiga cara. Mana yang pas? Itu tergantung tugasnya.";
const SUARA_G2 = "Ingin melatih telinga pada kata posisi, pakai Simon Berkata. Ingin mengikuti petunjuk berurutan, pakai Peta Harta Karun.";
const SUARA_G3 = "Ingin memastikan petunjuk kita jelas, pakai Permainan Sekat. Apa pun caranya, tentukan dulu siapa yang melihat.";
const SUARA_G4 = "Menurutmu, untuk menemukan harta yang ada di bawah bintang lalu di sebelah kiri, kamu pilih cara yang mana?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Ringkasan metode global",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Tiga Cara, Satu Tugas")),
      tambah("Kita", ...kartu("r0", 20, 40, 200, 28, W.langit, ["1. Simon Berkata"], 11)),
      tambah("tiga", teks("t3", 262, 84, "3 cara", 10, W.ungu), ...kartu("r1", 20, 80, 200, 28, W.hijauMuda, ["2. Peta Harta Karun"], 11)),
      tambah("cara.", ...kartu("r2", 20, 120, 200, 28, W.pink, ["3. Permainan Sekat"], 11)),
      tambah("pas?", emo("tq", 262, 172, E.tanya, 30)),
    ),
    k(
      SUARA_G2,
      sorotkan("telinga", "r0-k"),
      tambah("telinga", emo("td", 34, 172, E.telinga, 26)),
      tambah("Simon", panah("o0", 60, 168, 60, 0, W.ungu, 2.6)),
      redamkan("Ingin@2", "r0-k"),
      sorotkan("berurutan,", "r1-k"),
      tambah("Peta", panah("o1", 130, 172, 60, 0, W.ungu, 2.6), emo("pe", 214, 172, E.peta, 26)),
    ),
    k(
      SUARA_G3,
      hapus(0, "td", "o0", "o1", "pe"),
      redamkan(0, "r1-k"),
      sorotkan("memastikan", "r2-k"),
      tambah("jelas,", emo("kc", 50, 172, E.kaca, 26)),
      tambah("Sekat.", panah("o2", 80, 168, 60, 0, W.ungu, 2.6)),
      tambah("siapa", emo("mt", 214, 172, E.mata, 28)),
    ),
    k(
      SUARA_G4,
      bersih(0),
      tambah(0, judul("Harta di Bawah Bintang")),
      tambah("harta", ...peta("pz", 105, 44, 3, 3, 30)),
      tambah("bawah", emo("st", 150, 95, E.bintang, 18), panah("a1", 150, 100, 0, 18, W.merah, 3)),
      tambah("kiri,", panah("a2", 144, 119, -18, 0, W.hijau, 3), emo("ht", 120, 125, E.harta, 18)),
      tambah("cara", ...kartu("o0", 14, 150, 86, 28, W.langit, ["Simon Berkata"], 8.6), ...kartu("o1", 107, 150, 86, 28, W.hijauMuda, ["Peta Harta"], 8.6), ...kartu("o2", 200, 150, 86, 28, W.pink, ["Permainan Sekat"], 8.6)),
      tambah("mana?", emo("tq", 150, 192, E.tanya, 20)),
    ),
  ],
};
