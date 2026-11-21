import type { AdeganStory } from "./logika-story";
import { E, W, batangDatar, batangTegak, diagramDatar, diagramTegak, emo, garis, idDiagramTegak, judul, kartu, kotak, lantai, panah, papan, skalaTegak, sumbuTegak, teks, tokoh, ujungTegak, type OpsiDatar, type OpsiTegak } from "./k4b6b-gambar";
import { hapus, k, pudarkan, redamkan, sorotkan, tambah, ubah } from "./k4b6b-bantu";

/*
 * Cerita orisinal IGIL "Diagram Batang Pak Dodi" (Kelas 4 Bab 6 Sub-Bab B), video metode global.
 * Naskah suara dari naskah/story-naskah-k4b6b.md. Bagian ini: Bar Duel (Adu Batang), Flip the Chart (Putar Diagram), terapannya, dan ringkasan.
 */

const TINJU = "\u{1F94A}";
/** Diagram adu: sumbu bertingkat lima (delapan garis, satu tingkat 9 piksel), es teh 40 dan jus 25 gelas. */
const ADU: OpsiTegak = { x0: 70, yb: 128, tinggi: 72, n: 8, tingkat: 5, data: [{ nama: "Es teh", banyak: 40 }, { nama: "Jus", banyak: 25 }], lebar: 36, jarak: 56 };
const PAPAN_ADU = () => papan("pb", 42, 34, 156, 114);
const [, Y_TEH] = ujungTegak(ADU, 0);
const [X_JUS, Y_JUS] = ujungTegak(ADU, 1);

/* ------------------------------ Bar Duel: konsep ------------------------------ */
const SUARA_A1 = "Cara kedua, Bar Duel, atau Adu Batang.";
const SUARA_A2 = "Dua batang diadu berdampingan, dan yang lebih tinggi atau lebih panjang berarti lebih banyak.";
const SUARA_A3 = "Selisihnya dicari dengan mengurangkan angka kedua batang.";
const SUARA_A4 = "Kedua batang harus berada pada sumbu yang sama, supaya perbandingannya adil.";

export const ADEGAN_LUAR_ADU: AdeganStory = {
  id: "luar-adu",
  judul: "Bar Duel: Adu Batang",
  sumber: "Metode global: Bar Duel (konsep)",
  latar: "#FEF2F2",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Cara 2: Bar Duel"), ...lantai("lt", 150)),
      tambah("Bar", emo("pg", 110, 112, TINJU, 40)),
      tambah("Adu", teks("nm", 150, 140, "Adu Batang", 13, W.merah), emo("kl", 190, 104, E.kilau, 28)),
    ),
    k(
      SUARA_A2,
      hapus(0, "pg", "nm", "kl"),
      tambah(0, PAPAN_ADU(), ...sumbuTegak("ad", ADU), ...skalaTegak("ad", ADU)),
      tambah("batang", teks("n2", 246, 44, "2 batang", 10, W.merah)),
      tambah("berdampingan", ...batangTegak("ad", ADU)),
      tambah("tinggi", teks("lt", 246, 76, "lebih tinggi", 8, W.hijauTua)),
      tambah("banyak", teks("lb", 246, 92, "lebih banyak", 8, W.hijauTua)),
    ),
    k(
      SUARA_A3,
      tambah("mengurangkan", teks("fm", 246, 112, "besar - kecil", 8, W.ungu)),
      tambah("kedua", garis("gb", 70, Y_TEH, 100, 0, W.merah, 1.6, { putus: true, z: 6 })),
      tambah("batang", panah("br", X_JUS, Y_TEH + 2, 0, Y_JUS - Y_TEH - 4, W.ungu, 2, { z: 6 })),
    ),
    k(
      SUARA_A4,
      sorotkan("sumbu", "ad-sy"),
      tambah("sama", teks("sb", 246, 130, "sumbu sama", 8, W.hijauTua)),
      tambah("adil", emo("ok", 262, 62, E.benar, 22)),
    ),
  ],
};

/* ------------------------------ Bar Duel: terapan ------------------------------ */
const SUARA_B1 = "Genta mengadu batang es teh yang empat puluh gelas dengan batang jus yang dua puluh lima gelas.";
const SUARA_B2 = "Selisihnya empat puluh dikurangi dua puluh lima, yaitu lima belas gelas.";
const SUARA_B3 = "Cocok untuk mencari yang paling laris dan yang paling sepi, karena perbedaan tinggi langsung terlihat.";
const SUARA_B4 = "Kurang cocok kalau sumbunya tidak dimulai dari nol, karena batang tampak lebih panjang atau lebih pendek dari sebenarnya.";

export const ADEGAN_LUAR_ADU_TERAPAN: AdeganStory = {
  id: "luar-adu-terapan",
  judul: "Bar Duel: terapan",
  sumber: "Metode global: Bar Duel (terapan)",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Genta Mengadu Batang"), ...lantai("lt", 150), PAPAN_ADU(), ...sumbuTegak("ad", ADU), ...skalaTegak("ad", ADU), ...tokoh("ge", 36, 184, "Genta")),
      tambah("teh", ...batangTegak("ad", ADU, [0])),
      tambah("empat", teks("l40", 246, 64, "40 = 4 puluh", 8, W.merah)),
      tambah("jus", ...batangTegak("ad", ADU, [1])),
      tambah("dua", teks("l25", 246, 80, "25 = 2 puluh 5", 7, W.merah)),
    ),
    k(
      SUARA_B2,
      tambah("dikurangi", garis("gb", 70, Y_TEH, 100, 0, W.merah, 1.6, { putus: true, z: 6 })),
      tambah("dikurangi", panah("br", X_JUS, Y_TEH + 2, 0, Y_JUS - Y_TEH - 4, W.ungu, 2, { z: 6 })),
      tambah("yaitu", teks("sl", 246, 104, "40 - 25 = 15", 8, W.ungu)),
      sorotkan("lima@2", "ad-b0", "ad-b1"),
    ),
    k(
      SUARA_B3,
      tambah("Cocok", emo("jp", 262, 130, E.jempol, 22)),
      tambah("laris", teks("t1", 246, 118, "laris", 8, W.hijauTua)),
      tambah("sepi", teks("t2", 246, 140, "sepi", 8, W.biru)),
      tambah("terlihat", emo("mt", 236, 156, E.mata, 18)),
    ),
    k(
      SUARA_B4,
      hapus(0, "jp", "mt", "t1", "t2"),
      tambah("Kurang", emo("xs", 262, 130, E.salah, 22)),
      ubah("nol", { id: "ad-a0", isi: "20", warna: W.merah }),
      tambah("tampak", teks("lx", 246, 150, "tampak berbeda jauh", 6.5, W.merah)),
      tambah("sebenarnya", emo("tn", 28, 128, E.tanya, 18)),
    ),
  ],
};

/* ------------------------------ Flip the Chart: konsep ------------------------------ */
const TP: OpsiTegak = { x0: 60, yb: 128, tinggi: 72, n: 8, tingkat: 5, data: [{ nama: "Es teh", banyak: 40 }, { nama: "Jus", banyak: 25 }, { nama: "Teh tarik", banyak: 20 }], lebar: 30, jarak: 44 };
const TPD: OpsiDatar = { x0: 78, y0: 48, panjang: 144, n: 8, tingkat: 5, data: TP.data, tebal: 14, jarak: 26 };
const PAPAN_TP = () => papan("pp", 18, 34, 214, 114);
const TP_TEGAK_IDS = idDiagramTegak("tp", 8, 3);
const SUARA_P1 = "Cara ketiga, Flip the Chart, atau Putar Diagram.";
const SUARA_P2 = "Diagram batang tegak diputar menjadi mendatar, atau sebaliknya, tanpa mengubah datanya.";
const SUARA_P3 = "Pada diagram mendatar, panjang batang dibaca dari kiri ke kanan, dan angka ada di sumbu bawah.";
const SUARA_P4 = "Nama jenis pindah ke sumbu samping, tetapi angka pada batang tetap sama.";

export const ADEGAN_LUAR_PUTAR: AdeganStory = {
  id: "luar-putar",
  judul: "Flip the Chart: Putar Diagram",
  sumber: "Metode global: Flip the Chart (konsep)",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Cara 3: Flip the Chart"), ...lantai("lt", 150)),
      tambah("Flip", emo("pg", 110, 112, E.putar, 40)),
      tambah("Putar", teks("nm", 150, 140, "Putar Diagram", 13, W.ungu), emo("kl", 190, 104, E.kilau, 28)),
    ),
    k(
      SUARA_P2,
      hapus(0, "pg", "nm", "kl"),
      tambah(0, PAPAN_TP(), ...diagramTegak("tp", TP)),
      tambah("diputar", emo("pt", 266, 60, E.putar, 24)),
      hapus("mendatar", ...TP_TEGAK_IDS),
      tambah("mendatar", ...diagramDatar("tp2", TPD)),
      tambah("datanya", teks("dn", 266, 100, "data sama", 8, W.hijauTua)),
    ),
    k(
      SUARA_P3,
      tambah("panjang", panah("ka", 80, 52, 142, 0, W.merah, 2, { z: 6 })),
      tambah("kiri", teks("lr", 266, 118, "kiri ke kanan", 7.5, W.merah)),
      sorotkan("sumbu", ...Array.from({ length: 9 }, (_, i) => `tp2-a${i}`)),
      tambah("bawah", teks("lb", 266, 136, "angka: bawah", 7.5, W.hijauTua)),
    ),
    k(
      SUARA_P4,
      sorotkan("jenis", "tp2-n0", "tp2-n1", "tp2-n2"),
      tambah("samping", teks("ls", 266, 80, "nama: samping", 7.5, W.ungu)),
      tambah("sama", teks("lt", 266, 154, "angka sama", 8, W.hijauTua)),
    ),
  ],
};

/* ------------------------------ Flip the Chart: terapan ------------------------------ */
const SUARA_Q1 = "Satria memutar diagram es teh, jus, dan teh tarik menjadi mendatar supaya muat di dinding yang sempit.";
const SUARA_Q2 = "Nama minuman yang panjang kini mudah dibaca di sisi kiri, tidak berdesakan di bawah batang.";
const SUARA_Q3 = "Cocok untuk nama jenis yang panjang atau tempat yang sempit, karena ruangnya lebih lega.";
const SUARA_Q4 = "Kurang cocok kalau kita lupa pindah arah baca, karena panjang batang bisa disangka tinggi.";

export const ADEGAN_LUAR_PUTAR_TERAPAN: AdeganStory = {
  id: "luar-putar-terapan",
  judul: "Flip the Chart: terapan",
  sumber: "Metode global: Flip the Chart (terapan)",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, judul("Satria Memutar Diagram"), ...lantai("lt", 150), PAPAN_TP(), ...diagramTegak("tp", TP), ...tokoh("sa", 36, 184, "Satria")),
      tambah("memutar", emo("pt", 266, 60, E.putar, 22)),
      hapus("mendatar", ...TP_TEGAK_IDS),
      tambah("mendatar", ...diagramDatar("tp2", TPD)),
      tambah("dinding", kotak("dn", 240, 70, 56, 70, undefined, W.coklat, { putus: true, tebal: 1.6, z: 1 }), teks("ld", 268, 108, "dinding", 8, W.coklat)),
    ),
    k(
      SUARA_Q2,
      sorotkan("Nama", "tp2-n0", "tp2-n1", "tp2-n2"),
      tambah("mudah", emo("ok", 266, 56, E.benar, 22)),
      tambah("sisi", panah("pk", 72, 106, -30, 0, W.hijauTua, 1.8, { z: 6 })),
      tambah("berdesakan", teks("bd", 268, 128, "tidak sesak", 7.5, W.hijauTua)),
    ),
    k(
      SUARA_Q3,
      hapus(0, "ok", "bd", "pk"),
      tambah("Cocok", emo("jp", 266, 56, E.jempol, 24)),
      tambah("panjang", teks("lp", 268, 128, "nama panjang", 7.5, W.hijauTua)),
      tambah("lega", teks("ll", 268, 142, "ruang lega", 7.5, W.hijauTua)),
    ),
    k(
      SUARA_Q4,
      hapus(0, "jp", "lp", "ll"),
      tambah("Kurang", emo("xs", 266, 56, E.salah, 24)),
      tambah("lupa", teks("lu", 268, 128, "arah baca?", 7.5, W.merah)),
      tambah("tinggi", teks("lg", 268, 142, "disangka tinggi", 6.5, W.merah), emo("tn", 266, 92, E.tanya, 18)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_R1 = "Tiga cara sudah kita pelajari bersama Pak Dodi. Mana yang pas tergantung keadaan.";
const SUARA_R2 = "Ingin membaca angka batang, pakai Telusuri Garis. Ingin membandingkan dua jenis, pakai Adu Batang.";
const SUARA_R3 = "Ingin menyesuaikan tempat atau nama yang panjang, pakai Putar Diagram. Apa pun caranya, periksa tingkatan sumbu lebih dulu.";
const SUARA_R4 = "Menurutmu, untuk membandingkan dua batang yang hampir sama tinggi, cara mana yang paling pas?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Metode global: ringkasan tiga cara",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Tiga Cara Pak Dodi"), ...lantai("lt", 150), teks("n3", 240, 44, "3 cara", 10, W.ungu)),
      tambah("Dodi", ...tokoh("pr", 262, 184, "Pak Dodi")),
      tambah("pelajari", ...kartu("r0", 10, 34, 170, 30, "#DBEAFE", ["Telusuri Garis"], 10), ...kartu("r1", 10, 74, 170, 30, "#FEE2E2", ["Adu Batang"], 10), ...kartu("r2", 10, 114, 170, 30, "#EDE9FE", ["Putar Diagram"], 10)),
      tambah("pas", emo("tn", 232, 92, E.tanya, 28)),
    ),
    k(
      SUARA_R2,
      sorotkan("Telusuri", "r0-k"),
      tambah("Telusuri", emo("e1", 210, 52, E.penggaris, 18)),
      tambah("dua", teks("n2", 240, 72, "2 jenis", 9, W.merah)),
      redamkan("Adu", "r0-k"),
      sorotkan("Adu", "r1-k"),
      tambah("Adu", emo("e2", 210, 90, TINJU, 18)),
    ),
    k(
      SUARA_R3,
      redamkan("Putar", "r1-k"),
      sorotkan("Putar", "r2-k"),
      tambah("Putar", emo("e3", 210, 128, E.putar, 18)),
      tambah("periksa", teks("tg", 150, 160, "periksa tingkat sumbu dulu", 9, W.hijauTua)),
    ),
    k(
      SUARA_R4,
      tambah(0, teks("qq", 240, 112, "cara mana?", 9, W.ungu)),
      tambah("dua", teks("n2b", 240, 126, "2 batang", 9, W.merah)),
      tambah("hampir", kotak("e0", 212, 134, 12, 14, "#F97316", W.biru, { rx: 1, z: 2 }), kotak("e1b", 228, 132, 12, 16, "#22C55E", W.biru, { rx: 1, z: 2 })),
      pudarkan("pas", "r2-k"),
      sorotkan("pas", "r1-k", "r0-k"),
    ),
  ],
};
void batangDatar;
