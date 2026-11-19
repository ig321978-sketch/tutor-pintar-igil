import type { AdeganStory } from "./logika-story";
import { E, W, emo, judul, kartu, kios, panah, papanKecil, pasir, pohon, teks, tokoh, tumpuk, wadah } from "./k4b1d-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k4b1d-bantu";

/*
 * Cerita orisinal IGIL "Kios Kelapa Pak Darwis" (Kelas 4 Bab 1 Sub-Bab D, menyusun dan menguraikan bilangan), Penginapan Pulau Karang Indah.
 * Naskah suara dari naskah/story-naskah-k4b1d.md. Bagian ini: kios, panen, dan salah langkah Satria.
 */

/* ------------------------------ 1. Kios ------------------------------ */
const SUARA_K1 = "Di dekat pantai berdiri kios kelapa milik Pak Darwis, penuh dengan kelapa muda.";
const SUARA_K2 = "Hari ini panennya sangat banyak, sampai ditulis di papan kecil.";
const SUARA_K3 = "Pak Darwis meminta Satria, Laras, dan Genta membantu mengemasnya ke dalam keranjang.";
/** Tumpukan kelapa di meja kios: dua baris pada ketukan pertama, baris ketiga (empat butir) menyusul. */
const TUMPUK_MEJA = tumpuk("tk", 205, 130, 6, 3, 13);

export const ADEGAN_KIOS: AdeganStory = {
  id: "kios",
  judul: "Kios kelapa Pak Darwis",
  sumber: "Materi: kios kelapa",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Kios Kelapa Pak Darwis"), ...pasir("ps", 150)),
      tambah("kios", ...kios("ks", 130, 84, 150, 66)),
      tambah("Darwis,", pohon("p1", 36, 140, 44), pohon("p2", 84, 142, 34)),
      tambah("kelapa", ...TUMPUK_MEJA.slice(0, 11)),
    ),
    k(
      SUARA_K2,
      tambah("banyak,", ...TUMPUK_MEJA.slice(11)),
      tambah("ditulis", emo("pn", 112, 62, E.catat, 18)),
      tambah("papan", papanKecil("pk", 20, 36, 76, 34), teks("pt", 58, 57, "PANEN", 10, W.coklat, { z: 2 })),
    ),
    k(
      SUARA_K3,
      tambah("Darwis", ...tokoh("pd", 268, 184, "Pak Darwis")),
      tambah("Satria,", ...tokoh("st", 24, 184, "Satria")),
      tambah("Laras,", ...tokoh("lr", 62, 184, "Laras")),
      tambah("Genta", ...tokoh("gn", 100, 184, "Genta")),
      tambah("membantu", ...tokoh("ph", 138, 184, "Pak Hendro")),
      tambah("keranjang.", ...wadah("e1", 166, 152, 24, 20), ...wadah("e2", 194, 157, 19, 15), ...wadah("e3", 217, 161, 14, 11), emo("e4", 240, 172, E.kelapa, 11, { z: 4 })),
    ),
  ],
};

/* ------------------------------ 2. Panen ------------------------------ */
const SUARA_P1 = "Panennya lima ribu dua ratus tujuh puluh butir kelapa.";
const SUARA_P2 = "Keranjang besar menampung seribu, sedang seratus, kecil sepuluh, dan satu butir sendiri.";
const SUARA_P3 = "Menyusun bilangan berarti menggabungkan semua bagian menjadi satu bilangan.";

export const ADEGAN_PANEN: AdeganStory = {
  id: "panen",
  judul: "Panen lima ribu dua ratus tujuh puluh",
  sumber: "Materi: panen dan keranjang",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Hasil Panen"), papanKecil("pb", 40, 36, 220, 84)),
      tambah("lima", teks("pn", 150, 92, "5.000", 28, W.merah, { z: 2 })),
      ubah("dua", { id: "pn", isi: "5.200" }),
      ubah("tujuh", { id: "pn", isi: "5.270" }),
      tambah("butir", teks("bt", 150, 110, "butir kelapa", 10, W.coklat, { z: 2 })),
      tambah("kelapa.", emo("kl", 66, 170, E.kelapa, 40), emo("kr", 234, 170, E.kelapa, 40)),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Empat Keranjang")),
      tambah("besar", ...wadah("b1", 8, 62, 70, 56), teks("n1", 43, 134, "besar", 8.4, W.ungu)),
      tambah("seribu,", teks("l1", 43, 94, "1.000", 15, W.biru, { z: 4 })),
      tambah("sedang", ...wadah("b2", 94, 72, 58, 46), teks("n2", 123, 134, "sedang", 8.4, W.ungu)),
      tambah("seratus,", teks("l2", 123, 99, "100", 15, W.biru, { z: 4 })),
      tambah("kecil", ...wadah("b3", 168, 82, 44, 36), teks("n3", 190, 134, "kecil", 8.4, W.ungu)),
      tambah("sepuluh,", teks("l3", 190, 105, "10", 14, W.biru, { z: 4 })),
      tambah("satu", emo("kb", 240, 112, E.kelapa, 30), teks("l4", 240, 126, "1", 12, W.biru, { z: 4 })),
      tambah("butir", teks("n4", 240, 144, "butir", 8.4, W.ungu)),
      sorotkan("sendiri.", "kb"),
    ),
    k(
      SUARA_P3,
      tambah("Menyusun", teks("sn", 150, 44, "menyusun bilangan", 11, W.ungu)),
      tambah("menggabungkan", teks("p1", 86, 96, "+", 16, W.merah), teks("p2", 160, 96, "+", 16, W.merah), teks("p3", 220, 96, "+", 16, W.merah)),
      tambah("satu", panah("pa", 150, 150, 0, 8, W.merah, 2), teks("s1", 150, 172, "1 bilangan", 14, W.merah)),
    ),
  ],
};

/* ------------------------------ 3. Salah langkah Satria ------------------------------ */
const SUARA_S1 = "Satria menguraikan bilangan itu menjadi lima ribu ditambah dua ratus ditambah tujuh.";
const SUARA_S2 = "Ia berseru, jadi lima ribu dua ratus tujuh puluh sama dengan lima ribu dua ratus tujuh!";
const SUARA_S3 = "Kalau aku salah, aku memanjat pohon kelapa itu, katanya.";

export const ADEGAN_URAI_SALAH: AdeganStory = {
  id: "urai-salah",
  judul: "Satria menguraikan dengan salah",
  sumber: "Materi: uraian yang salah",
  latar: "#FEF3C7",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Satria Menguraikan"), ...kartu("n0", 70, 32, 160, 38, W.krem, ["5.270"], 22), ...tokoh("st", 40, 184, "Satria")),
      tambah("menguraikan", emo("ct", 76, 160, E.catat, 18)),
      tambah("lima", teks("ur", 160, 110, "5.000", 18, W.merah)),
      ubah("dua", { id: "ur", isi: "5.000 + 200" }),
      ubah("tujuh.", { id: "ur", isi: "5.000 + 200 + 7" }),
    ),
    k(
      SUARA_S2,
      bersih(0),
      tambah(0, judul("Tanda Sama yang Goyang"), ...tokoh("st", 40, 184, "Satria")),
      tambah("berseru,", emo("ru", 66, 150, E.seru, 18)),
      tambah("lima", teks("a1", 90, 90, "5.270", 22, W.biru)),
      tambah("sama", teks("eq", 150, 92, "=", 24, W.merah, { rot: -8 })),
      ubah("dengan", { id: "eq", rot: 8 }),
      tambah("tujuh@2", teks("a2", 208, 90, "5.207", 22, W.merah)),
    ),
    k(
      SUARA_S3,
      tambah("Kalau", ...[pohon("pk", 250, 150, 70)]),
      tambah("aku", panah("ar", 66, 128, 140, -16, W.merah, 2)),
      tambah("memanjat", teks("tr", 150, 60, "taruhan!", 12, W.merah)),
      tambah("katanya.", ...tokoh("pd", 170, 184, "Pak Darwis"), emo("al", 196, 160, E.alis, 16)),
    ),
  ],
};
