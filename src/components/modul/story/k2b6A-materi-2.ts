import type { AdeganStory, Obj } from "./logika-story";
import { E, W, WL, bola, botol, bulat, emo, garis, gantungan, gawang, judul, kantong, kartu, kotak, lapangan, panah, papan, pindah, raket, teks, tokoh } from "./k2b6A-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k2b6A-bantu";

/*
 * Cerita orisinal IGIL "Peralatan Lomba Pak Anton" (Kelas 2 Bab 6 Sub-Bab A), awal cerita Hari Olahraga Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b6a.md. Bagian ini: posisi dan tiga kata (lebih berat, lebih ringan, sama berat), tiga benda (paling berat, paling ringan),
 * dan langkah kira-kira lalu bukti.
 */

/* ------------------------------ 4. Posisi dan tiga kata ------------------------------ */
const SUARA_P1 = "Benda yang lebih berat berada lebih bawah, dan yang lebih ringan lebih atas.";
const SUARA_P2 = "Chacha menaruh dua bola sama berat, dan papan itu datar. Itu disebut sama berat.";
const SUARA_P3 = "Jadi ada tiga kata: lebih berat, lebih ringan, dan sama berat.";

export const ADEGAN_POSISI_KATA: AdeganStory = {
  id: "posisi-kata",
  judul: "Posisi dan tiga kata",
  sumber: "Materi: posisi di papan dan tiga kata",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Posisi di Papan"), ...lapangan("lp", 152)),
      tambah("berat", ...papan("pj", 150, 120, 64, 14), ...kantong("kp", 198, 113, 22, 15)),
      tambah("bawah,", panah("pb", 240, 112, 0, 34, W.merah, 2.4), teks("tb", 240, 166, "bawah", 9, W.merah)),
      tambah("ringan", emo("va", 92, 100, E.voli, 20)),
      tambah("atas.", panah("pa", 60, 100, 0, -30, W.hijau, 2.4), teks("ta", 60, 70, "atas", 9, W.hijau)),
    ),
    k(
      SUARA_P2,
      hapus(0, "va", "kp", "kp-s", "pb", "tb", "pa", "ta"),
      tambah("Chacha", ...tokoh("ch", 40, 184, "Chacha")),
      ubah("papan", ...pindah(papan("pj", 150, 120, 64, 0))),
      tambah("dua", teks("n2", 150, 64, "2 bola", 10, W.ungu), ...bola("b1", 96, 109, 8), ...bola("b2", 204, 109, 8)),
      tambah("datar.", teks("dt", 150, 96, "datar", 9, W.hijau)),
      tambah("sama@2", teks("sb", 150, 176, "sama berat", 10, W.ungu), emo("ok", 150, 150, E.benar, 18)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Tiga Kata")),
      tambah("tiga", teks("n3", 150, 52, "3 kata", 11, W.ungu)),
      tambah("lebih", ...kartu("c1", 14, 76, 84, 36, W.merahMuda, ["lebih berat"], 10), ...papan("m1", 56, 150, 24, 6)),
      tambah("lebih@2", ...kartu("c2", 108, 76, 84, 36, W.hijauMuda, ["lebih ringan"], 10), ...papan("m2", 150, 150, 24, -6)),
      tambah("sama", ...kartu("c3", 202, 76, 84, 36, W.krem, ["sama berat"], 10), ...papan("m3", 244, 150, 24, 0)),
    ),
  ],
};

/* ------------------------------ 5. Tiga benda ------------------------------ */
const SUARA_B1 = "Pak Anton menaruh kantong pasir, bola basket, dan bola voli di papan.";
const SUARA_B2 = "Kantong pasir paling berat, bola voli paling ringan, dan bola basket di tengah.";
const SUARA_B3 = "Untuk tiga benda atau lebih, kita pakai kata paling berat dan paling ringan.";

export const ADEGAN_TIGA_BENDA: AdeganStory = {
  id: "tiga-benda",
  judul: "Tiga benda di papan",
  sumber: "Materi: tiga benda, paling berat dan ringan",
  latar: "#FEF3C7",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Tiga Benda"), ...lapangan("lp", 152)),
      tambah("Anton", ...tokoh("pa", 36, 184, "Pak Anton")),
      tambah("menaruh", ...papan("pj", 160, 140, 84, 0)),
      tambah("kantong", ...kantong("kp", 100, 122, 22, 15)),
      tambah("basket,", ...bola("bb", 160, 128, 9, "#F97316", "#7C2D12")),
      tambah("voli", ...bola("bv", 210, 128, 9, "#FEF9C3", "#A16207")),
    ),
    k(
      SUARA_B2,
      tambah("Kantong", emo("mk", 111, 112, E.mahkota, 18)),
      sorotkan("berat,", "kp"),
      tambah("paling", teks("l1", 111, 172, "paling berat", 8, W.merah)),
      tambah("voli", emo("aw", 210, 112, E.awan, 18)),
      tambah("ringan,", teks("l3", 210, 172, "paling ringan", 8, W.hijau)),
      tambah("tengah.", teks("l2", 160, 172, "tengah", 8, W.ungu)),
    ),
    k(
      SUARA_B3,
      bersih(0),
      tambah(0, judul("Tiga Benda atau Lebih")),
      tambah("tiga", teks("n3", 150, 52, "3 benda atau lebih", 11, W.ungu)),
      tambah("benda", bulat("o1", 110, 90, 10, "#E0B87A", W.coklat), bulat("o2", 150, 90, 10, "#F97316", "#7C2D12"), bulat("o3", 190, 90, 10, "#FEF9C3", "#A16207")),
      tambah("paling", ...kartu("c1", 30, 124, 110, 34, W.merahMuda, ["paling berat"], 10)),
      tambah("paling@2", ...kartu("c2", 160, 124, 110, 34, W.hijauMuda, ["paling ringan"], 10)),
    ),
  ],
};

/* ------------------------------ 6. Kira-kira lalu bukti ------------------------------ */
const SUARA_K1 = "Dika menulis empat langkah: ambil dua benda, kira-kira, timbang, tulis hasilnya.";
const SUARA_K2 = "Chacha mengira raket lebih berat daripada botol minum. Setelah ditimbang, botol minum turun!";
const SUARA_K3 = "Kira-kiraku keliru, tetapi timbangan membuatku teliti, kata Chacha sambil mencatat.";

/** Raket (kiri) dan botol minum (kanan) digantung di gantungan; dy = naik-turun ujung (positif: kanan turun). */
const susunRaketBotol = (dy: number): Obj[] => [
  ...gantungan("gt", 150, 100, 40, dy),
  garis("tl1", 110, 100 - dy, 0, 10, WL.besiTua, 1.4),
  ...raket("rk", 110, 100 - dy + 18, 8),
  garis("tl2", 190, 100 + dy, 0, 10, WL.besiTua, 1.4),
  ...botol("bt", 185.5, 110 + dy),
];

export const ADEGAN_KIRA_BUKTI: AdeganStory = {
  id: "kira-bukti",
  judul: "Kira-kira lalu bukti",
  sumber: "Materi: kira-kira, timbang, tulis hasil",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Catatan Dika")),
      tambah("Dika", ...tokoh("dk", 262, 184, "Dika")),
      tambah("menulis", kotak("pc", 30, 34, 200, 128, "#FEF3C7", W.coklat, { rx: 6, tebal: 3 }), kotak("pj", 118, 29, 24, 8, "#9CA3AF", "#4B5563", { rx: 2, tebal: 1.2 })),
      tambah("empat", teks("n4", 130, 54, "4 langkah", 10, W.ungu)),
      tambah("ambil", teks("s1", 52, 82, "1. ambil 2 benda", 10, W.biru, { anchor: "start" })),
      tambah("kira-kira,", teks("s2", 52, 106, "2. kira-kira", 10, W.biru, { anchor: "start" })),
      tambah("timbang,", teks("s3", 52, 130, "3. timbang", 10, W.biru, { anchor: "start" })),
      tambah("tulis", teks("s4", 52, 154, "4. tulis hasilnya", 10, W.biru, { anchor: "start" })),
    ),
    k(
      SUARA_K2,
      bersih(0),
      tambah(0, judul("Kira-kira Lalu Timbang"), ...lapangan("lp", 124)),
      tambah("Chacha", ...tokoh("ch", 40, 184, "Chacha")),
      tambah("mengira", emo("tq", 40, 148, E.tanya, 20)),
      tambah("raket", ...gawang("gw", 70, 50, 160, 76), garis("tk", 150, 50, 0, 25, WL.besiTua, 1.8), ...susunRaketBotol(0)),
      tambah("berat", teks("kr", 150, 42, "raket lebih berat?", 9, W.merah)),
      hapus("ditimbang,", "tq", "kr"),
      ubah("ditimbang,", ...pindah(susunRaketBotol(8))),
      tambah("turun!", panah("pt", 232, 118, 0, 22, W.merah, 2.4), teks("tu", 244, 150, "turun", 9, W.merah)),
    ),
    k(
      SUARA_K3,
      bersih(0),
      tambah(0, judul("Catatan Chacha")),
      tambah("Kira-kiraku", ...kartu("t1", 40, 50, 220, 30, W.merahMuda, ["kira-kira: raket lebih berat"], 9), emo("x1", 276, 72, E.salah, 16)),
      tambah("timbangan", ...kartu("t2", 40, 90, 220, 30, W.hijauMuda, ["timbang: botol lebih berat"], 9), emo("o1", 276, 112, E.benar, 16)),
      tambah("teliti,", emo("bs", 150, 148, E.bintang, 24)),
      tambah("Chacha", ...tokoh("ch", 40, 184, "Chacha")),
      tambah("mencatat.", emo("ct", 80, 176, E.catat, 20)),
    ),
  ],
};
