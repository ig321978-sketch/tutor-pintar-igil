import type { AdeganStory } from "./logika-story";
import { E, W, WARNA_BENTUK, WT, angkaSisi, bangun, bulat, capLingkaran, garis, garisSisi, emo, jamDinding, judul, kotak, lingkaran, pohon, pos, perosotan, relBeraturan, relSegitiga, relSegiempat, relRumah, rumahBurung, rumput, sudutBangun, teks, telur, tokoh, namaBangun } from "./k2b3A-gambar";
import { hapus, k, tambah, ubah } from "./k2b3A-bantu";

/*
 * Cerita orisinal IGIL "Ubin untuk Taman Bermain" (Kelas 2 Bab 3 Sub-Bab A, bangun datar), awal cerita Taman Bermain Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b3a.md. Bagian ini: satu tanda awal lalu hitung berputar dan nama segi banyak, mencari bentuk di taman,
 * dan lingkaran (cetak dan putar uang logam).
 */

/* ------------------------------ 4. Tandai awal, hitung berputar ------------------------------ */
const SUARA_T1 = "Nia punya cara. Beri tanda di satu sisi sebagai awal, lalu hitung berputar sampai kembali ke tanda.";
const SUARA_T2 = "Kali ini hasilnya enam. Bentuk dengan enam sisi bernama segi enam, persis seperti sarang lebah.";
const SUARA_T3 = "Tiga sisi bernama segitiga, empat sisi segi empat, dan lima sisi segi lima.";

const ptsH = sudutBangun(relBeraturan(6, 34), 150, 98, 0);

export const ADEGAN_TANDAI_AWAL: AdeganStory = {
  id: "tandai-awal",
  judul: "Tandai awal, hitung berputar",
  sumber: "Materi: tandai awal dan nama segi banyak",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Tandai Awal"), rumput("rp"), bangun("hx", relBeraturan(6, 34), 150, 98, WT.ubinKuning)),
      tambah("Nia", ...tokoh("ni", 40, 178, "Nia")),
      tambah("cara.", emo("ld", 66, 156, E.lampu, 18)),
      tambah("satu", garisSisi("hx", ptsH, 0), angkaSisi("hx", ptsH, 0)),
      tambah("satu", emo("bd", ptsH[0].x + 14, ptsH[0].y - 18, E.bendera, 16)),
      tambah("awal,", teks("aw", 226, 70, "awal", 10, W.merah)),
      tambah("berputar", emo("pt", 222, 124, "\u{1F504}", 18)),
      tambah("tanda.@2", teks("kb", 226, 150, "kembali ke tanda", 8.6, W.ungu)),
    ),
    k(
      SUARA_T2,
      hapus(0, "aw", "kb", "pt"),
      tambah("Kali", garisSisi("hx", ptsH, 1), angkaSisi("hx", ptsH, 1), garisSisi("hx", ptsH, 2), angkaSisi("hx", ptsH, 2)),
      tambah("ini", garisSisi("hx", ptsH, 3), angkaSisi("hx", ptsH, 3), garisSisi("hx", ptsH, 4), angkaSisi("hx", ptsH, 4)),
      tambah("hasilnya", garisSisi("hx", ptsH, 5), angkaSisi("hx", ptsH, 5)),
      tambah("segi", namaBangun("hx", 150, 156, "segi enam", 11)),
      tambah("sarang", emo("lb", 236, 76, E.lebah, 20)),
      tambah("lebah.", emo("lb2", 262, 100, E.lebah, 16)),
    ),
    k(
      SUARA_T3,
      { at: 0, bersih: true },
      tambah(0, judul("Nama dari Banyak Sisi"), rumput("rp")),
      tambah("Tiga", bangun("b3", relSegitiga(40, 36), 45, 84, WARNA_BENTUK[3]), teks("a3", 45, 134, "3 sisi", 9)),
      tambah("segitiga,", teks("n3", 45, 150, "segitiga", 9, W.ungu)),
      tambah("empat", bangun("b4", relSegiempat(36, 36), 115, 84, WARNA_BENTUK[4]), teks("a4", 115, 134, "4 sisi", 9)),
      tambah("empat@2", teks("n4", 115, 150, "segi empat", 9, W.ungu)),
      tambah("lima", bangun("b5", relRumah(36, 40), 185, 84, WARNA_BENTUK[5]), teks("a5", 185, 134, "5 sisi", 9)),
      tambah("lima@2", teks("n5", 185, 150, "segi lima", 9, W.ungu)),
      tambah("dan", bangun("b6", relBeraturan(6, 22), 255, 84, WARNA_BENTUK[6]), teks("a6", 255, 134, "6 sisi", 9), teks("n6", 255, 150, "segi enam", 9, W.ungu)),
    ),
  ],
};

/* ------------------------------ 5. Mencari bentuk di taman ------------------------------ */
const SUARA_C1 = "Pak Tono mengajak mereka mencari bentuk di taman bermain.";
const SUARA_C2 = "Papan perosotan berbentuk segi empat, dan rumah burung di pohon berbentuk segi lima.";
const SUARA_C3 = "Chacha menghitung sisi jam dinding di pos taman, dan ternyata segi enam!";

const ptsJam = sudutBangun(relBeraturan(6, 17), 153, 120, 0);

export const ADEGAN_CARI_TAMAN: AdeganStory = {
  id: "cari-taman",
  judul: "Mencari bentuk di taman",
  sumber: "Materi: bentuk di taman bermain",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Bentuk di Taman"), rumput("rp"), ...pohon("pn", 268, 60, 18)),
      tambah("Pak", ...tokoh("pt", 36, 178, "Pak Tono")),
      tambah("mengajak", ...tokoh("ni", 96, 178, "Nia"), ...tokoh("dk", 146, 178, "Dika")),
      tambah("mereka", ...tokoh("ch", 196, 178, "Chacha")),
      tambah("mencari", emo("kc", 236, 150, E.kaca, 22)),
    ),
    k(
      SUARA_C2,
      hapus(0, "kc"),
      tambah("Papan", ...perosotan("ps", 30, 82)),
      tambah("empat,", teks("s4", 62, 148, "4 sisi", 10, W.merah)),
      tambah("rumah", ...rumahBurung("rb", 226, 88, 34, 36)),
      tambah("lima.", teks("s5", 226, 148, "5 sisi", 10, W.merah)),
    ),
    k(
      SUARA_C3,
      tambah("menghitung", ...pos("po", 118, 98, 70, 52), ...jamDinding("jm", 153, 120, 17)),
      tambah("menghitung", garisSisi("jm", ptsJam, 0, W.merah, 3), angkaSisi("jm", ptsJam, 0, 10)),
      tambah("sisi", garisSisi("jm", ptsJam, 1, W.merah, 3), angkaSisi("jm", ptsJam, 1, 10), garisSisi("jm", ptsJam, 2, W.merah, 3), angkaSisi("jm", ptsJam, 2, 10)),
      tambah("pos", garisSisi("jm", ptsJam, 3, W.merah, 3), angkaSisi("jm", ptsJam, 3, 10), garisSisi("jm", ptsJam, 4, W.merah, 3), angkaSisi("jm", ptsJam, 4, 10)),
      tambah("ternyata", garisSisi("jm", ptsJam, 5, W.merah, 3), angkaSisi("jm", ptsJam, 5, 10)),
      tambah("enam!", namaBangun("jm", 153, 166, "segi enam", 10)),
    ),
  ],
};

/* ------------------------------ 6. Lingkaran ------------------------------ */
const SUARA_L1 = "Satu ubin masih membingungkan. Tepinya melengkung, bisa bulat seperti roda, bisa juga seperti telur.";
const SUARA_L2 = "Nia meletakkan uang logam di atas kertas dan mencetak tepinya. Lalu logam itu diputar di atas cetakan.";
const SUARA_L3 = "Bentuknya selalu pas ke arah mana pun! Itu tandanya lingkaran, bentuk lengkung yang bulat sempurna.";

export const ADEGAN_LINGKARAN: AdeganStory = {
  id: "lingkaran",
  judul: "Lingkaran dan cetakannya",
  sumber: "Materi: lingkaran dengan cetak dan putar",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Ubin yang Melengkung"), rumput("rp")),
      tambah("Satu", teks("s1", 150, 46, "1 ubin", 11, W.merah)),
      tambah("membingungkan.", emo("qm", 196, 48, E.tanya, 18)),
      tambah("bulat", lingkaran("lk", 90, 104, 30)),
      tambah("roda,", teks("nr", 90, 150, "seperti roda", 9, W.ungu)),
      tambah("telur.", telur("tl", 210, 104, 36, 24)),
      tambah("telur.", teks("nt", 210, 150, "seperti telur", 9, W.ungu)),
    ),
    k(
      SUARA_L2,
      { at: 0, bersih: true },
      tambah(0, judul("Cetak dan Putar")),
      tambah("Nia", ...tokoh("ni", 40, 178, "Nia")),
      tambah("meletakkan", bulat("lg", 262, 66, 22, "#FDE047", "#CA8A04", { tebal: 2.4, z: 2 }), bulat("lgd", 262, 66, 14, "#FEF08A", "#CA8A04", { tebal: 1.2, z: 2 })),
      tambah("kertas", kotak("kt", 70, 40, 160, 120, W.putih, W.abu, { rx: 4, tebal: 2, z: -1 })),
      ubah("kertas", { id: "lg", x: 150, y: 100 }, { id: "lgd", x: 150, y: 100 }),
      tambah("mencetak", capLingkaran("lg", 150, 100, 22)),
      tambah("diputar", garis("lgm", 150, 100, 14, 0, "#CA8A04", 2.2, { z: 3 })),
      ubah("atas@2", { id: "lgm", rot: 120 }),
      ubah("cetakan.", { id: "lgm", rot: 250 }),
    ),
    k(
      SUARA_L3,
      tambah("pas", emo("ok", 208, 66, E.benar, 20)),
      tambah("arah", emo("pr", 98, 66, "\u{1F504}", 18)),
      tambah("lingkaran,", teks("nl", 150, 176, "lingkaran", 10, W.ungu)),
      tambah("sempurna.", teks("bs", 150, 190, "bulat sempurna", 9, W.merah)),
    ),
  ],
};
