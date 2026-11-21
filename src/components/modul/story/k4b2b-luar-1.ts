import type { AdeganStory, Obj } from "./logika-story";
import { D, E, W, bak, bulat, emo, garis, judul, kartu, kotak, panah, papan, pecahan, tanah, teks, tokoh } from "./k4b2b-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k4b2b-bantu";

/*
 * Cerita orisinal IGIL "Bak Warna Pak Joyo" (K4 Bab 2 Sub-Bab B), video metode global.
 * Naskah suara dari naskah/story-naskah-k4b2b.md. Bagian ini: pembuka (kaleng Pak Joyo), Compare Numerators (Banding Pembilang), dan terapannya.
 */

export const NAMA_METODE = ["Compare Numerators", "Fraction Bars", "Order on Line"] as const;
export const NAMA_METODE_ID = ["Banding Pembilang", "Batang Pecahan", "Urut di Garis"] as const;

/** Papan besar sebagai latar tulisan: papan `pd` (lebar 284) pojok kiri-atas (8, 28), tinggi 112. */
const papanBesar = (): Obj[] => papan("pd", 8, 28, 284, 112);

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Sore itu, di dekat bak-bak warna, Pak Joyo membuka kaleng berisi cara-cara membandingkan pecahan.";
const SUARA_O2 = "Di dalamnya ada tiga cara supaya pecahan berpenyebut sama selalu terbanding benar, tanpa keliru.";
const SUARA_O3 = "Tiga cara itu: Compare Numerators, Fraction Bars, dan Order on Line.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Banding Pembilang, Batang Pecahan, dan Urut di Garis.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Kaleng Pak Joyo",
  sumber: "Metode global: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Dekat Bak Warna"), ...tanah("tn", 120)),
      tambah("bak-bak", ...bak("b1", 20, 44, 120, 18, 5, 3, D.biru), ...bak("b2", 20, 74, 120, 18, 4, 2, D.merah)),
      tambah("Pak", ...tokoh("pj", 60, 184, "Pak Joyo")),
      tambah("kaleng", kotak("kl", 110, 148, 40, 28, "#CBD5E1", W.tinta, { rx: 3, z: 2 }), garis("kt", 110, 148, 40, 0, W.tinta, 2, { z: 3 })),
      tambah("cara-cara", ...kartu("kp", 160, 60, 60, 28, "#FEF3C7", ["pembilang"], 8), ...kartu("kb", 226, 60, 60, 28, "#DBEAFE", ["batang"], 8), ...kartu("kg", 160, 98, 60, 28, "#DCFCE7", ["garis"], 8)),
    ),
    k(
      SUARA_O2,
      tambah("tiga", teks("n3", 250, 150, "3 cara", 14, W.ungu)),
      tambah("pecahan", teks("pc", 80, 136, "pecahan penyebut sama", 8, W.tinta)),
      tambah("benar,", emo("ok", 270, 112, E.benar, 22)),
      tambah("keliru.", emo("xs", 236, 112, E.salah, 22)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara"), teks("n3", 262, 40, "3 cara", 11, W.ungu), ...papanBesar()),
      tambah("Compare", teks("m0", 150, 66, "1. Compare Numerators", 10, W.tinta)),
      tambah("Fraction", teks("m1", 150, 92, "2. Fraction Bars", 10, W.tinta)),
      tambah("Order", teks("m2", 150, 118, "3. Order on Line", 10, W.tinta)),
    ),
    k(
      SUARA_O4,
      tambah("Banding", teks("g0", 150, 78, "Banding Pembilang", 10, W.ungu)),
      tambah("Batang", teks("g1", 150, 104, "Batang Pecahan", 10, W.ungu)),
      tambah("Urut", teks("g2", 150, 130, "Urut di Garis", 10, W.ungu)),
    ),
  ],
};

/* ------------------------------ Compare Numerators: konsep ------------------------------ */
const SUARA_P1 = "Cara pertama, Compare Numerators, atau Banding Pembilang.";
const SUARA_P2 = "Kalau penyebutnya sama, semua bagian sama besar, sehingga kita tidak perlu menghitung hal lain.";
const SUARA_P3 = "Kita cukup melihat pembilangnya, karena pembilang menunjukkan banyaknya bagian yang diambil.";
const SUARA_P4 = "Pembilang lebih besar berarti pecahannya lebih besar, dan pembilang lebih kecil berarti pecahannya lebih kecil.";

export const ADEGAN_LUAR_PEMBILANG: AdeganStory = {
  id: "luar-pembilang",
  judul: "Compare Numerators: Banding Pembilang",
  sumber: "Metode global: Compare Numerators (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Cara 1: Compare Numerators"), ...papanBesar()),
      tambah("Compare", teks("nm", 150, 64, "Compare Numerators", 14, W.tinta)),
      tambah("Banding", teks("ni", 150, 88, "Banding Pembilang", 11, W.merah)),
      tambah("Pembilang.", panah("ak", 50, 112, 200, 0, W.merah, 3)),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Penyebut Sama"), ...papanBesar(), ...bak("a1", 30, 50, 190, 24, 6, 2, D.biru)),
      tambah("semua", ...bak("a2", 30, 90, 190, 24, 6, 5, D.merah)),
      tambah("sama@2", teks("sb", 125, 136, "semua bagian sama besar", 9, W.hijau)),
      tambah("menghitung", emo("xs", 262, 70, E.salah, 22), teks("tm", 262, 96, "tak perlu hitung", 7, W.merah)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Lihat Pembilang"), ...papanBesar()),
      tambah("pembilangnya,", ...pecahan("a", 80, 76, 2, 6, 22, W.biru), ...pecahan("b", 220, 76, 5, 6, 22, W.merah)),
      tambah("karena", bulat("ca", 80, 69, 12, undefined, W.merah, { tebal: 2.4, z: 5 }), bulat("cb", 220, 69, 12, undefined, W.merah, { tebal: 2.4, z: 5 })),
      tambah("menunjukkan", teks("tj", 150, 124, "banyak bagian yang diambil", 10, W.tinta)),
      tambah("diambil.", emo("mt", 150, 52, E.mata, 20)),
    ),
    k(
      SUARA_P4,
      bersih(0),
      tambah(0, judul("Besar dan Kecil"), ...papanBesar()),
      tambah("besar", ...pecahan("a", 80, 76, 5, 6, 20, W.merah), teks("lb", 80, 124, "lebih besar", 9, W.merah)),
      tambah("pecahannya", teks("gt", 150, 88, ">", 22, W.tinta)),
      tambah("kecil", ...pecahan("b", 220, 76, 2, 6, 20, W.biru)),
      tambah("kecil@2", teks("lk", 220, 124, "lebih kecil", 9, W.biru)),
    ),
  ],
};

/* ------------------------------ Compare Numerators: terapan ------------------------------ */
const SUARA_T1 = "Laras membandingkan lima per tujuh dengan dua per tujuh pada kertas sakunya.";
const SUARA_T2 = "Penyebutnya sama, jadi ia melihat pembilangnya, yaitu lima dan dua.";
const SUARA_T3 = "Cocok untuk perbandingan cepat di kepala, karena hanya dua bilangan yang dibandingkan.";
const SUARA_T4 = "Kurang cocok kalau penyebutnya berbeda, karena ukuran bagiannya tidak lagi sama.";

export const ADEGAN_LUAR_PEMBILANG_TERAPAN: AdeganStory = {
  id: "luar-pembilang-terapan",
  judul: "Banding Pembilang: kapan cocok",
  sumber: "Metode global: Compare Numerators (terapan)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Laras Membandingkan"), ...papanBesar(), ...tokoh("lr", 40, 184, "Laras")),
      tambah("lima", ...pecahan("a", 90, 76, 5, 7, 22, W.merah)),
      tambah("dengan", teks("vs", 150, 88, "?", 24, W.merah)),
      tambah("dua", ...pecahan("b", 210, 76, 2, 7, 22, W.biru)),
      tambah("kertas", teks("kt", 150, 128, "di kertas saku", 9, W.ungu)),
    ),
    k(
      SUARA_T2,
      hapus(0, "kt"),
      tambah("sama,", teks("ps", 150, 128, "penyebut sama", 10, W.hijau)),
      tambah("pembilangnya,", bulat("ca", 90, 69, 12, undefined, W.merah, { tebal: 2.4, z: 5 }), bulat("cb", 210, 69, 12, undefined, W.merah, { tebal: 2.4, z: 5 })),
      sorotkan("lima", "a-p"),
      sorotkan("dua.", "b-p"),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Cocok untuk Cepat"), ...papanBesar(), ...tokoh("lr", 40, 184, "Laras")),
      tambah("Cocok", emo("ok", 262, 52, E.benar, 22)),
      tambah("cepat", teks("cp", 150, 70, "cepat", 14, W.merah)),
      tambah("dua", teks("n2", 150, 100, "2 bilangan", 12, W.tinta)),
      tambah("dibandingkan.", emo("pk", 150, 126, E.pikir, 22)),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Penyebut Berbeda"), ...papanBesar(), ...tokoh("lr", 40, 184, "Laras")),
      tambah("Kurang", emo("xs", 262, 52, E.salah, 22)),
      tambah("penyebutnya", ...bak("c1", 60, 54, 180, 20, 4, 2, D.biru)),
      tambah("berbeda,", ...bak("c2", 60, 90, 180, 20, 6, 3, D.merah)),
      tambah("ukuran", teks("uk", 150, 132, "ukuran bagian beda", 9, W.merah)),
    ),
  ],
};
