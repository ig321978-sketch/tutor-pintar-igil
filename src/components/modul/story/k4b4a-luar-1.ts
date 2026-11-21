import type { AdeganStory } from "./logika-story";
import { E, K, W, emo, judul, kotak, nomori, papanTulis, petak, tanah, teks, tokoh } from "./k4b4a-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k4b4a-bantu";

/*
 * Cerita orisinal IGIL "Lantai Ubin Bu Sinta" (Kelas 4 Bab 4 Sub-Bab A), video metode global.
 * Naskah suara dari naskah/story-naskah-k4b4a.md. Bagian ini: pembuka (denah lantai), Cover the Floor (Tutup Lantai), dan terapannya.
 */

export const NAMA_METODE = ["Cover the Floor", "Rows and Columns", "Unit Square Ladder"] as const;
export const NAMA_METODE_ID = ["Tutup Lantai", "Baris dan Kolom", "Tangga Satuan"] as const;

/** Petak berkapur di papan tulis: `${id}-c{i}`. */
export const petakKapur = (id: string, x: number, y: number, b: number, kol: number, s: number) => petak(id, x, y, b, kol, s, "#1F6B3F", K.kapur, { tebal: 1 });

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Pagi itu, di tepi kolam, Bu Sinta membuka gulungan denah lantai yang masih kosong.";
const SUARA_O2 = "Di dalamnya ada tiga cara supaya luas mudah dihitung, tanpa salah menutup lantai.";
const SUARA_O3 = "Tiga cara itu: Cover the Floor, Rows and Columns, dan Unit Square Ladder.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Tutup Lantai, Baris dan Kolom, dan Tangga Satuan.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Denah lantai Bu Sinta",
  sumber: "Metode global: pembuka",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Pagi di Tepi Kolam"), ...tanah("tn", 150), emo("mt", 262, 46, "\u{1F305}", 26)),
      tambah("Bu", ...tokoh("bs", 60, 184, "Bu Sinta")),
      tambah("gulungan", kotak("gl", 150, 70, 100, 56, "#FEF3C7", W.kayuTua, { rx: 4, tebal: 1.8, z: 1 })),
      tambah("denah", teks("dn", 200, 62, "denah lantai", 8.4, W.coklat)),
      tambah("kosong.", teks("ks", 200, 102, "masih kosong", 8.4, W.coklat, { z: 2 })),
    ),
    k(
      SUARA_O2,
      hapus(0, "gl", "dn", "ks"),
      tambah("tiga", teks("n3", 110, 60, "3 cara", 12, W.merah)),
      tambah("cara", ...[0, 1, 2].flatMap((i) => [kotak(`c${i}-k`, 90 + i * 34, 74, 28, 24, "#FDE68A", W.ubinTua, { rx: 4 }), teks(`c${i}-t`, 104 + i * 34, 90, "cara", 6.4, W.coklat)])),
      tambah("mudah", emo("ok", 262, 100, E.benar, 20)),
      tambah("salah", emo("xs", 236, 100, E.salah, 18)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara"), teks("n3", 260, 40, "3 cara", 10, W.merah)),
      tambah("Cover", teks("m0", 112, 70, "1. Cover the Floor", 10, W.hijauTua), emo("i0", 30, 72, "\u{1F9F1}", 16)),
      tambah("Rows", teks("m1", 112, 120, "2. Rows and Columns", 10, W.hijauTua), emo("i1", 30, 122, "\u{1F4CA}", 16)),
      tambah("Unit", teks("m2", 112, 170, "3. Unit Square Ladder", 10, W.hijauTua), emo("i2", 30, 172, "\u{1F4F6}", 16)),
    ),
    k(
      SUARA_O4,
      tambah("Nama", kotak("bk", 196, 52, 100, 130, "#0C4A6E", W.putih, { rx: 6, tebal: 1, z: -1 })),
      tambah("Tutup", teks("g0", 246, 70, "Tutup Lantai", 9, W.sorot)),
      tambah("Baris", teks("g1", 246, 120, "Baris dan Kolom", 9, W.sorot)),
      tambah("Tangga", teks("g2", 246, 170, "Tangga Satuan", 9, W.sorot)),
    ),
  ],
};

/* ------------------------------ Cover the Floor: konsep ------------------------------ */
const SUARA_C1 = "Cara pertama, Cover the Floor, atau Tutup Lantai.";
const SUARA_C2 = "Kita menutup seluruh permukaan dengan petak sama besar, tanpa celah dan tanpa tumpang tindih.";
const SUARA_C3 = "Banyak petak yang menutupi permukaan itulah luasnya, dan satuannya mengikuti ukuran petak.";
const SUARA_C4 = "Petak yang dipakai harus sama besar, supaya hasilnya adil, sebab satuan berbeda ukuran membuat hasil berbeda.";

export const ADEGAN_LUAR_TUTUP: AdeganStory = {
  id: "luar-tutup",
  judul: "Cover the Floor: Tutup Lantai",
  sumber: "Metode global: Cover the Floor (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Cara 1: Cover the Floor"), ...papanTulis("pt", 8, 28, 284, 132)),
      tambah("Cover", teks("nm", 150, 56, "Cover the Floor", 13, K.kapurMerah)),
      tambah("Tutup", teks("ni", 150, 74, "Tutup Lantai", 10, K.kapur)),
      tambah("Lantai.", kotak("fl", 106, 92, 88, 44, undefined, K.kapurBiru, { rx: 2, tebal: 1.4, putus: true, z: 2 })),
    ),
    k(
      SUARA_C2,
      tambah("permukaan", teks("tp", 226, 100, "permukaan", 8.4, K.kapurBiru)),
      tambah("petak", ...petakKapur("g", 106, 92, 2, 4, 22)),
      tambah("celah", teks("tc", 150, 150, "tanpa celah", 9, K.kapur)),
      tambah("tumpang", teks("tt", 240, 122, "tidak tumpuk", 9, K.kapur), emo("ok", 262, 148, E.benar, 18)),
    ),
    k(
      SUARA_C3,
      hapus(0, "tc", "tt", "tp", "ok"),
      tambah("Banyak", teks("bp", 150, 88, "8 petak", 12, K.kapurMerah)),
      sorotkan("petak", ...Array.from({ length: 8 }, (_, i) => `g-c${i}`)),
      tambah("luasnya.", teks("ls", 150, 152, "luas = 8 petak", 11, K.kapur)),
    ),
    k(
      SUARA_C4,
      hapus(0, "bp"),
      tambah("Petak", kotak("kb", 212, 96, 26, 26, "#1F6B3F", K.kapur, { rx: 0, tebal: 1.2, z: 2 }), kotak("ks", 252, 102, 14, 14, "#1F6B3F", K.kapur, { rx: 0, tebal: 1.2, z: 2 })),
      tambah("sama", teks("sb", 239, 140, "sama besar", 8.4, K.kapurBiru)),
      tambah("adil.", emo("ok2", 239, 82, E.benar, 20)),
    ),
  ],
};

/* ------------------------------ Cover the Floor: terapan ------------------------------ */
const SUARA_D1 = "Laras menutup denah lantai kecil dengan petak sentimeter persegi.";
const SUARA_D2 = "Setelah ditutup, ia menghitung petaknya dan mendapat luas yang pasti, bahkan untuk bangun berbeda bentuk.";
const SUARA_D3 = "Cocok untuk bidang kecil, karena petak mudah dihitung satu per satu.";
const SUARA_D4 = "Kurang cocok untuk lantai yang sangat besar, karena petaknya terlalu banyak.";

export const ADEGAN_LUAR_TUTUP_TERAPAN: AdeganStory = {
  id: "luar-tutup-terapan",
  judul: "Tutup Lantai: kapan cocok",
  sumber: "Metode global: Cover the Floor (terapan)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Denah Laras"), ...papanTulis("pt", 8, 28, 284, 124), ...tokoh("lr", 40, 184, "Laras")),
      tambah("denah", kotak("dn", 120, 50, 72, 48, undefined, K.kapurBiru, { rx: 2, tebal: 1.4, putus: true, z: 2 })),
      tambah("petak", ...petakKapur("g", 120, 50, 2, 3, 24)),
      tambah("sentimeter", teks("u1", 156, 114, "1 cm²", 10, K.kapurMerah)),
    ),
    k(
      SUARA_D2,
      tambah("menghitung", ...nomori("g", 120, 50, 2, 3, 24, K.kapur)),
      tambah("luas", teks("ls", 156, 134, "luas 6 cm²", 11, K.kapur)),
      sorotkan("pasti,", "ls"),
      tambah("bangun", teks("bb", 156, 150, "bentuk beda, luas sama", 8, K.kapurBiru)),
    ),
    k(
      SUARA_D3,
      tambah("Cocok", emo("ok", 100, 172, E.benar, 20)),
      tambah("bidang", teks("pk", 170, 170, "bidang kecil", 10, W.hijauTua)),
      tambah("satu", teks("sp", 250, 170, "1 per 1", 10, W.hijauTua)),
    ),
    k(
      SUARA_D4,
      hapus(0, "ok", "pk", "sp"),
      tambah("Kurang", emo("xs", 100, 172, E.salah, 20)),
      tambah("lantai", teks("bs", 170, 170, "lantai besar", 10, W.merah)),
      tambah("terlalu", teks("tb", 250, 170, "petak banyak", 9, W.coklat)),
    ),
  ],
};
