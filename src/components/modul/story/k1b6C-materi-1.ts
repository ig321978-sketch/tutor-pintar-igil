import type { AdeganStory } from "./logika-story";
import { E, W, deretEmo, emo, garisBil, judul, kartu, kotak, lompat, orang, penanda, teks, xGB } from "./k1b6C-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah } from "./k1b6C-bantu";

/*
 * Cerita orisinal IGIL "Tutup Pasar Malam" (Kelas 1 Bab 6 Sub-Bab C, pengurangan sampai dua puluh), akhir cerita Pasar Malam Kampung.
 * Naskah suara dari naskah/story-naskah-k1b6c.md. Bagian ini: lonceng penutup, Igil lupa puluhan, dan hitung mundur di garis bilangan.
 */

/* ------------------------------ 1. Lonceng penutup ------------------------------ */
const SUARA_L1 = "Lonceng penutup masih bergema. Lampu-lampu pasar malam mulai padam satu per satu.";
const SUARA_L2 = "Pak RT berkeliling meminta laporan. Kalau salah lapor, dagangan bisa dikira hilang!";
const SUARA_L3 = "Mamah bertanya, kue cubit tadi enam belas, anak-anak sudah makan tiga. Tinggal berapa?";

export const ADEGAN_LONCENG: AdeganStory = {
  id: "lonceng",
  judul: "Lonceng penutup berbunyi",
  sumber: "Materi: lonceng penutup dan masalah",
  latar: "#EDE9FE",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Lonceng penutup berbunyi")),
      tambah(idx(SUARA_L1, "Lonceng"), emo("lc", 150, 62, E.lonceng, 30)),
      tambah(idx(SUARA_L1, "Lampu-lampu"), ...[54, 118, 182, 246].map((x, i) => emo(`lp${i}`, x, 112, E.lampu, 26))),
      ubah(idx(SUARA_L1, "padam"), { id: "lp0", op: 0.25 }),
      ubah(idx(SUARA_L1, "satu", 1), { id: "lp1", op: 0.25 }),
      tambah(idx(SUARA_L1, "satu", 1), teks("n1", 118, 148, "1", 11, W.merah)),
      ubah(idx(SUARA_L1, "satu", 2), { id: "lp2", op: 0.25 }),
      tambah(idx(SUARA_L1, "satu", 2), teks("n2", 182, 148, "1", 11, W.merah)),
    ),
    k(
      SUARA_L2,
      bersih(0),
      tambah(0, judul("Pak RT meminta laporan")),
      tambah(idx(SUARA_L2, "Pak"), ...orang("pr", 250, 96, E.pakRT, "Pak RT")),
      tambah(idx(SUARA_L2, "laporan"), emo("pp", 210, 96, E.papan, 26), ...kartu("lap", 90, 130, 120, 24, W.krem, ["LAPORAN"], 10)),
      tambah(idx(SUARA_L2, "salah"), emo("sl", 60, 96, E.salah, 24)),
      tambah(idx(SUARA_L2, "hilang"), emo("hl", 30, 160, E.tanya, 24), teks("hlt", 120, 178, "dagangan hilang?", 9.4, W.merah)),
    ),
    k(
      SUARA_L3,
      bersih(0),
      tambah(0, judul("Berapa kue yang tinggal?")),
      tambah(idx(SUARA_L3, "Mamah"), ...orang("mm", 36, 56, E.mamah, "Mamah")),
      tambah(idx(SUARA_L3, "kue"), kotak("nm", 24, 78, 216, 62, W.krem, W.coklat, { rx: 10, tebal: 2, z: -1 })),
      tambah(idx(SUARA_L3, "belas"), ...deretEmo(E.kue, "ku", 16, 40, 96, 24, 24, 8, 16), ...kartu("n16", 24, 146, 100, 20, W.langit, ["16 kue"], 10)),
      tambah(idx(SUARA_L3, "makan"), emo("an", 262, 70, E.senang, 26)),
      ubah(idx(SUARA_L3, "tiga"), { id: "ku13", x: 262, y: 100 }, { id: "ku14", x: 262, y: 124 }, { id: "ku15", x: 262, y: 148 }),
      tambah(idx(SUARA_L3, "tiga"), teks("dm", 262, 176, "dimakan 3", 9, W.merah)),
      tambah(idx(SUARA_L3, "Tinggal"), teks("tg", 170, 160, "tinggal ?", 12, W.merah)),
    ),
  ],
};

/* ------------------------------ 2. Lupa puluhan (salah langkah) ------------------------------ */
const SUARA_P1 = "Igil cepat menjawab. Enam dikurangi tiga sama dengan tiga, jadi sisa tiga!";
const SUARA_P2 = "Kaka menunjuk nampan yang masih penuh. Sisa tiga? Nampannya masih banyak. Sepuluhnya ke mana?";
const SUARA_P3 = "Igil menepuk dahi. Satu puluhan belum dihitung. Sepuluh ditambah tiga sama dengan tiga belas.";

export const ADEGAN_LUPA: AdeganStory = {
  id: "lupa-puluhan",
  judul: "Igil lupa puluhan",
  sumber: "Materi: salah langkah, puluhan tetap",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Igil menjawab cepat")),
      tambah(
        0,
        kotak("bk", 22, 82, 256, 30, "#FEF3C7", W.coklat, { rx: 8, tebal: 2, z: -1 }),
        ...deretEmo(E.kue, "ru", 10, 40, 100, 24, 0, 10, 15),
        ...deretEmo(E.kue, "ls", 6, 40, 142, 24, 0, 6, 15),
        teks("pl", 150, 128, "1 puluhan", 8.4, W.coklat),
      ),
      tambah(idx(SUARA_P1, "Igil"), ...orang("ig", 40, 52, E.igil, "Igil")),
      tambah(idx(SUARA_P1, "Enam"), ...kartu("jw", 150, 38, 130, 22, W.merahMuda, ["6 – 3 = 3"], 11)),
      tambah(idx(SUARA_P1, "sisa"), teks("sc", 150, 180, "sisa 3", 12, W.merah)),
    ),
    k(
      SUARA_P2,
      hapus(0, "jw-k", "jw-t0"),
      tambah(idx(SUARA_P2, "Kaka"), ...orang("kk", 262, 52, E.kaka, "Kaka")),
      tambah(idx(SUARA_P2, "menunjuk"), emo("tj", 150, 156, E.tunjuk, 22)),
      sorotkan(idx(SUARA_P2, "penuh"), "bk"),
      ubah(idx(SUARA_P2, "tiga"), { id: "sc", isi: "sisa 3?" }),
      tambah(idx(SUARA_P2, "tiga"), emo("x1", 236, 44, E.salah, 22)),
      tambah(idx(SUARA_P2, "Sepuluhnya"), teks("hp", 150, 74, "sepuluhnya ke mana?", 9, W.merah)),
    ),
    k(
      SUARA_P3,
      hapus(0, "x1", "hp", "tj"),
      tambah(idx(SUARA_P3, "menepuk"), emo("dh", 76, 52, E.pusing, 20)),
      ubah(idx(SUARA_P3, "Satu"), { id: "pl", warna: W.merah, u: 10 }),
      ubah(idx(SUARA_P3, "belum"), { id: "ls3", op: 0.25 }, { id: "ls4", op: 0.25 }, { id: "ls5", op: 0.25 }),
      tambah(idx(SUARA_P3, "Sepuluh"), ...kartu("pn", 150, 38, 130, 22, W.hijauMuda, ["10 + 3 = 13"], 11)),
      ubah(idx(SUARA_P3, "belas"), { id: "sc", isi: "sisa 13", warna: W.hijau }),
    ),
  ],
};

/* ------------------------------ 3. Hitung mundur di garis bilangan ------------------------------ */
const SUARA_M1 = "Abang mencoba cara baru di garis bilangan. Lima belas mundur tiga.";
const SUARA_M2 = "Jangan sebut lima belas lagi. Empat belas, tiga belas, dua belas.";
const SUARA_M3 = "Sisanya dua belas. Cocok kalau yang diambil sedikit.";

export const ADEGAN_MUNDUR: AdeganStory = {
  id: "mundur",
  judul: "Hitung mundur di garis bilangan",
  sumber: "Materi: hitung mundur",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Abang mencoba cara baru")),
      tambah(idx(SUARA_M1, "Abang"), ...orang("ab", 40, 56, E.abang, "Abang")),
      tambah(idx(SUARA_M1, "garis"), ...garisBil("gb", 118)),
      tambah(idx(SUARA_M1, "belas"), ...penanda("mk", 15, 118)),
      tambah(idx(SUARA_M1, "mundur"), ...kartu("ks", 110, 36, 120, 22, W.krem, ["15 – 3 = ?"], 11)),
      tambah(idx(SUARA_M1, "tiga"), teks("tg", 150, 76, "mundur 3", 10, W.merah)),
    ),
    k(
      SUARA_M2,
      hapus(0, "tg"),
      tambah(idx(SUARA_M2, "Jangan"), emo("jg", xGB(15), 70, E.salah, 16)),
      tambah(idx(SUARA_M2, "Empat"), lompat("h1", 15, 14, 96), teks("h1n", xGB(14), 88, "14", 9, W.merah)),
      tambah(idx(SUARA_M2, "tiga"), lompat("h2", 14, 13, 96), teks("h2n", xGB(13), 88, "13", 9, W.merah)),
      tambah(idx(SUARA_M2, "dua"), lompat("h3", 13, 12, 96), teks("h3n", xGB(12), 88, "12", 9, W.merah)),
    ),
    k(
      SUARA_M3,
      ubah(idx(SUARA_M3, "dua"), { id: "ks-t0", isi: "15 – 3 = 12" }),
      tambah(idx(SUARA_M3, "dua"), ...penanda("md", 12, 118, W.emas)),
      sorotkan(idx(SUARA_M3, "belas"), "h3n"),
      tambah(idx(SUARA_M3, "Cocok"), ...kartu("cc", 60, 152, 180, 22, W.hijauMuda, ["cocok kalau yang diambil sedikit"], 9)),
    ),
  ],
};
