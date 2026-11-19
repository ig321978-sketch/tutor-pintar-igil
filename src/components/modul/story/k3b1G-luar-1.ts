import type { AdeganStory, Obj } from "./logika-story";
import { E, W, bulat, emo, judul, kartu, keranjang, kotak, spanduk, teks, tokoLatar, tokoh, tumpukan, idBingkisan, bingkisan, warnaKado } from "./k3b1G-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k3b1G-bantu";

/*
 * Cerita orisinal IGIL "Pesta Hari Jadi Toko" (Kelas 3 Bab 1 Sub-Bab G), video metode global.
 * Naskah suara dari naskah/story-naskah-k3b1g.md. Bagian ini: pembuka (tiga lembar catatan lama), Fair Share (Bagi Rata), dan terapannya.
 */

export const NAMA_METODE = ["Fair Share", "Repeated Subtraction", "Fact Family"] as const;
export const NAMA_METODE_ID = ["Bagi Rata", "Kurang Berulang", "Keluarga Fakta"] as const;

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Di bawah spanduk, Salsa menemukan tiga lembar catatan lama tentang cara membagi barang.";
const SUARA_O2 = "Nenek Ijah berkata, itu tiga cara yang dipakai penjaga toko supaya pembagian adil. Cara-cara itu masih dipakai sampai sekarang.";
const SUARA_O3 = "Tiga cara itu: Fair Share, Repeated Subtraction, dan Fact Family.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Bagi Rata, Kurang Berulang, dan Keluarga Fakta.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga lembar catatan lama",
  sumber: "Metode global: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      bersih(0),
      tambah(0, judul("Catatan Lama"), ...tokoLatar("tk")),
      tambah("spanduk,", ...spanduk("sp", 15, 36, 270, "OBRAL HARI JADI TOKO MERIAH", 11)),
      tambah("Salsa", ...tokoh("sl", 40, 176, "Salsa", 28)),
      tambah("tiga", teks("n3", 150, 124, "3 catatan", 11, W.ungu)),
      tambah("lembar", ...[0, 1, 2].flatMap((i) => kartu(`c${i}`, 86 + i * 58, 68, 50, 36, W.krem, ["catatan"], 7))),
      tambah("lama", emo("kc", 242, 150, E.kaca, 24)),
    ),
    k(
      SUARA_O2,
      tambah("Nenek", ...tokoh("nn", 262, 176, "Nenek Ijah", 28)),
      ubah("tiga", { id: "n3", isi: "3 cara" }),
      tambah("penjaga", emo("pn", 190, 150, E.pria, 24)),
      tambah("adil.", emo("ad", 150, 150, "\u{2696}", 24)),
      tambah("sekarang.", emo("kl", 120, 150, E.kilau, 22)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara Tadi"), ...tokoLatar("tk")),
      tambah("Tiga", teks("n3", 252, 52, "3 cara", 10, W.ungu)),
      tambah("Fair", teks("m0", 140, 82, "1. Fair Share", 13, W.biru), emo("i0", 262, 82, E.keranjang, 22)),
      tambah("Repeated", teks("m1", 140, 120, "2. Repeated Subtraction", 13, W.biru), emo("i1", 262, 120, "\u{2796}", 22)),
      tambah("Fact", teks("m2", 140, 158, "3. Fact Family", 13, W.biru), emo("i2", 262, 158, "\u{1F46A}", 22)),
    ),
    k(
      SUARA_O4,
      tambah("Bagi", teks("q0", 140, 96, "Bagi Rata", 10, W.ungu)),
      tambah("Kurang", teks("q1", 140, 134, "Kurang Berulang", 10, W.ungu)),
      tambah("Keluarga", teks("q2", 140, 172, "Keluarga Fakta", 10, W.ungu)),
    ),
  ],
};

/* ------------------------------ Gambar bersama ------------------------------ */
const KX = [60, 130, 200];
const keranjangTiga = (): Obj[] => KX.flatMap((x, i) => keranjang(`kr${i}`, x, 122, 40, 24));
/** Bingkisan ke-j di keranjang ke-i (tiga keranjang), bingkisan nomor n = j * 3 + i. */
const kadoTiga = (i: number, j: number): Obj[] => bingkisan(`g${i}${j}`, KX[i] + 5 + (j % 3) * 10.5, 124 + Math.floor(j / 3) * 10.5, 8.5, warnaKado(j * 3 + i), { z: 2 });
const idPile = (dari: number, sampai: number): string[] => Array.from({ length: sampai - dari + 1 }, (_, q) => idBingkisan(`bk${dari + q}`)).flat();

/* ------------------------------ Fair Share: konsep ------------------------------ */
const SUARA_P1 = "Cara pertama, Fair Share, atau Bagi Rata.";
const SUARA_P2 = "Barang dibagikan satu-satu ke tiap bagian secara bergiliran.";
const SUARA_P3 = "Teruskan sampai semua barang habis. Jangan lupa menghitung isi tiap bagian di akhir.";
const SUARA_P4 = "Banyak barang di tiap bagian adalah hasil bagi.";

export const ADEGAN_LUAR_RATA: AdeganStory = {
  id: "luar-rata",
  judul: "Fair Share: Bagi Rata",
  sumber: "Metode global: Fair Share (konsep)",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_P1,
      bersih(0),
      tambah(0, judul("Cara Pertama"), ...tokoLatar("tk")),
      tambah("Fair", ...kartu("nm", 50, 44, 200, 28, W.krem, ["Fair Share"], 13)),
      tambah("Bagi", teks("nid", 150, 104, "Bagi Rata", 13, W.ungu)),
      tambah("Rata.", emo("ic", 150, 156, E.keranjang, 34)),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Bagi Satu-Satu"), ...tokoLatar("tk"), ...tumpukan("bk", 126, 44, 3, 9, 11, 13), ...keranjangTiga()),
      tambah("satu-satu", teks("s1", 150, 108, "1 untuk tiap bagian", 9, W.coklat)),
      hapus("tiap", ...idPile(0, 2)),
      tambah("tiap", ...kadoTiga(0, 0), ...kadoTiga(1, 0), ...kadoTiga(2, 0)),
      hapus("bergiliran.", ...idPile(3, 5)),
      tambah("bergiliran.", ...kadoTiga(0, 1), ...kadoTiga(1, 1), ...kadoTiga(2, 1)),
    ),
    k(
      SUARA_P3,
      hapus(0, "s1"),
      hapus("habis.", ...idPile(6, 8)),
      tambah("habis.", ...kadoTiga(0, 2), ...kadoTiga(1, 2), ...kadoTiga(2, 2)),
      tambah("isi", ...KX.map((x, i) => teks(`h${i}`, x + 20, 116, "3", 12, W.merah))),
      tambah("akhir.", emo("ok", 262, 100, E.benar, 22)),
    ),
    k(
      SUARA_P4,
      hapus(0, "ok"),
      tambah("bagian", ...kartu("hb", 100, 44, 100, 22, W.hijauMuda, ["hasil bagi"], 11)),
      sorotkan("hasil", "kr1"),
      tambah("hasil", emo("pn", 150, 88, E.tangan, 22)),
      tambah("bagi.", emo("kl", 262, 100, E.kilau, 22)),
    ),
  ],
};

/* ------------------------------ Fair Share: terapan ------------------------------ */
const KUE_X = (q: number): number => 104 + (q % 6) * 13;
const KUE_Y = (q: number): number => 52 + Math.floor(q / 6) * 13;
const WARNA_KUE = ["#F59E0B", "#EC4899", "#A855F7", "#22C55E"];
const kue = (id: string, cx: number, cy: number, i: number, r = 5): Obj => bulat(id, cx, cy, r, WARNA_KUE[i % 4], W.biru, { tebal: 0.9, z: 2 });
const PX = [40, 120, 200];
const piringTiga = (): Obj[] => PX.map((x, i) => kotak(`pg${i}`, x, 132, 60, 14, W.putih, W.biru, { rx: 7, tebal: 1.6, z: 1 }));
const idKueSemua = (): string[] => Array.from({ length: 18 }, (_, q) => `ku${q}`);

const SUARA_T1 = "Bima membagi delapan belas kue ke tiga piring, satu-satu bergiliran.";
const SUARA_T2 = "Setiap piring akhirnya berisi enam kue. Semua piring sama banyak, jadi pembagiannya adil.";
const SUARA_T3 = "Cocok kalau barangnya nyata dan bisa dibagikan langsung.";
const SUARA_T4 = "Kurang cocok untuk bilangan besar, karena membagi satu-satu terlalu lama.";

export const ADEGAN_LUAR_RATA_TERAPAN: AdeganStory = {
  id: "luar-rata-terapan",
  judul: "Bima membagi kue ke piring",
  sumber: "Metode global: Fair Share (terapan)",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_T1,
      bersih(0),
      tambah(0, judul("Kue untuk Piring"), ...tokoLatar("tk")),
      tambah("Bima", ...tokoh("bm", 36, 178, "Bima", 26)),
      tambah("delapan", teks("n18", 150, 46, "18 kue", 10, W.merah), ...Array.from({ length: 18 }, (_, q) => kue(`ku${q}`, KUE_X(q), KUE_Y(q), q))),
      tambah("tiga", ...piringTiga(), teks("n3", 150, 106, "3 piring", 10, W.coklat)),
      tambah("satu-satu", teks("s1", 150, 118, "1 per piring", 9, W.ungu)),
    ),
    k(
      SUARA_T2,
      hapus(0, ...idKueSemua(), "s1"),
      tambah("berisi", ...PX.flatMap((x, i) => Array.from({ length: 6 }, (_, j) => kue(`kp${i}${j}`, x + 7 + j * 9.2, 126, i * 6 + j, 4)))),
      tambah("enam", ...PX.map((x, i) => teks(`t6${i}`, x + 30, 160, "6", 14, W.merah))),
      tambah("adil.", emo("ad", 262, 120, "\u{2696}", 26)),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Kapan Cocok?"), ...tokoLatar("tk"), ...kartu("cc", 90, 44, 120, 24, W.hijauMuda, ["Cocok"], 12)),
      tambah("barangnya", ...tumpukan("bk", 120, 84, 4, 8, 14, 17)),
      tambah("nyata", emo("ny", 70, 110, E.hadiah, 28)),
      tambah("dibagikan", emo("tg", 234, 108, E.tangan, 26)),
      tambah("langsung.", emo("ok", 150, 168, E.benar, 28)),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?"), ...tokoLatar("tk"), ...kartu("kc", 80, 44, 140, 24, W.merahMuda, ["Kurang cocok"], 12)),
      tambah("bilangan", teks("bs", 150, 100, "96 kue", 20, W.merah)),
      tambah("satu-satu", teks("s1", 150, 130, "1, 1, 1, 1, 1 ...", 12, W.ungu)),
      tambah("terlalu", emo("jm", 100, 168, "\u{23F3}", 28)),
      tambah("lama.", emo("x1", 200, 168, E.salah, 26)),
    ),
  ],
};
