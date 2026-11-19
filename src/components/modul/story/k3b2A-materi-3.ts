import type { AdeganStory } from "./logika-story";
import { E, W, emo, judul, kotak, poligon, rak, rumput, teks, tenda, tokoh, tumpukKayu } from "./k3b2A-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k3b2A-bantu";

/*
 * Cerita orisinal IGIL "Kayu untuk Api Unggun" (Kelas 3 Bab 2 Sub-Bab A, kalimat Matematika penjumlahan), awal cerita Perkemahan Akhir Pekan.
 * Naskah suara dari naskah/story-naskah-k3b2a.md. Bagian ini: titik-titik di depan, banyak kemungkinan, dan penutup (jembatan ke Sub-Bab B).
 */

/* ------------------------------ 7. Titik di depan ------------------------------ */
const SUARA_D1 = "Kak Rina membawa sekeranjang ranting. Ditambah dua puluh lima ranting dari Bima, jumlahnya enam puluh.";
const SUARA_D2 = "Kalimatnya titik-titik tambah dua puluh lima sama dengan enam puluh. Caranya sama: enam puluh dikurangi dua puluh lima sama dengan tiga puluh lima.";
const SUARA_D3 = "Diperiksa lagi: tiga puluh lima tambah dua puluh lima sama dengan enam puluh.";

export const ADEGAN_TITIK_DEPAN: AdeganStory = {
  id: "titik-depan",
  judul: "Titik-titik di depan",
  sumber: "Materi: titik-titik di depan",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Titik-Titik di Depan"), ...rumput("rt", 150)),
      tambah("Kak", ...tokoh("rn", 40, 184, "Kak Rina")),
      tambah("sekeranjang", kotak("kj", 80, 130, 42, 20, "#D6A15E", W.coklat, { rx: 4 }), emo("kr", 101, 132, E.ranting, 18)),
      tambah("Ditambah", ...tokoh("bm", 210, 184, "Bima")),
      tambah("dua", teks("n25", 210, 134, "25", 16, W.hijauTua), emo("rb", 238, 152, E.ranting, 16)),
      tambah("jumlahnya", teks("n60", 150, 90, "60", 26, W.jumlah)),
    ),
    k(
      SUARA_D2,
      bersih(0),
      tambah(0, judul("Titik-Titik di Depan"), ...rumput("rt", 150), ...tokoh("bm", 40, 184, "Bima")),
      tambah("Kalimatnya", teks("t1", 92, 62, "…", 26, W.merah)),
      tambah("tambah", teks("t+", 128, 60, "+", 24, W.biru), teks("t25", 164, 62, "25", 26, W.hijauTua)),
      tambah("titik-titik", teks("dp", 92, 84, "di depan", 9, W.merah)),
      tambah("sama", teks("t=", 200, 60, "=", 24, W.biru), teks("t60", 236, 62, "60", 26, W.jumlah)),
      tambah("Caranya", teks("r2", 150, 112, "60 − 25 = 35", 22, W.hijauTua)),
    ),
    k(
      SUARA_D3,
      tambah("Diperiksa", teks("r3", 150, 140, "35 + 25 = 60", 22, W.hijauTua)),
      tambah("sama", emo("ok", 262, 138, E.benar, 22)),
    ),
  ],
};

/* ------------------------------ 8. Banyak kemungkinan ------------------------------ */
const SUARA_M1 = "Di gudang kemah tersimpan seratus batang kayu di dua rak.";
const SUARA_M2 = "Kalau hanya jumlahnya yang diketahui, ada banyak kemungkinan.";
const SUARA_M3 = "Enam puluh di rak kiri dan empat puluh di rak kanan, atau tujuh puluh lima dan dua puluh lima. Semuanya seratus.";

export const ADEGAN_BANYAK_KEMUNGKINAN: AdeganStory = {
  id: "banyak-kemungkinan",
  judul: "Banyak kemungkinan di gudang kayu",
  sumber: "Materi: banyak kemungkinan pasangan",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Gudang Kayu"), ...rumput("rt", 150)),
      tambah("gudang", kotak("gd", 50, 70, 200, 80, "#FDE68A", W.coklat, { rx: 2, z: -1 }), poligon("at", [[40, 70], [150, 40], [260, 70]], "#FDBA74", W.coklat, { z: -1 })),
      tambah("seratus", teks("n100", 150, 62, "100", 16, W.jumlah)),
      tambah("dua", teks("n2", 150, 92, "2 rak", 9, W.ungu), ...rak("r1", 64, 114, 78, 36), ...rak("r2", 158, 114, 78, 36)),
    ),
    k(
      SUARA_M2,
      sorotkan("jumlahnya", "n100"),
      tambah("banyak", teks("km", 150, 172, "banyak pasangan", 10, W.merah)),
      tambah("kemungkinan.", emo("tq", 240, 172, E.tanya, 20)),
    ),
    k(
      SUARA_M3,
      tambah("Enam", teks("a60", 100, 104, "60", 14, W.hijauTua)),
      tambah("empat", teks("a40", 198, 104, "40", 14, W.jumlah)),
      ubah("tujuh", { id: "a60", isi: "75" }),
      ubah("dua", { id: "a40", isi: "25" }),
      sorotkan("seratus.", "n100"),
    ),
  ],
};

/* ------------------------------ 9. Penutup ------------------------------ */
const SUARA_P1 = "Dua puluh batang kayu pun terkumpul, dan Raka menepati taruhannya, memindahkan ranselnya ke tenda dekat semak sambil menepuk nyamuk.";
const SUARA_P2 = "Besok Pak Darto, penjaga hutan, akan datang membawa persediaan air minum.";
const SUARA_P3 = "Menurutmu, kalau sebagian botol dibagikan dan tersisa sedikit, bagaimana mencari yang dibagikan? Terima kasih, Raka, Salsa, Bima, Pak Joko, dan Kak Rina!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Taruhan Raka dan jembatan ke Sub-Bab B",
  sumber: "Materi: taruhan Raka dan Pak Darto",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Taruhan Raka"), ...rumput("rt", 150), ...tenda("td", 230, 150, 40, 32, "#FCA5A5")),
      tambah("Dua", teks("n20", 80, 60, "20 batang", 12, W.hijauTua), ...tumpukKayu("ky", 40, 146, 20, 5, 12, 5)),
      tambah("Raka", ...tokoh("rk", 110, 184, "Raka")),
      tambah("ranselnya", emo("rs", 142, 164, E.ransel, 18)),
      tambah("semak", emo("sm", 268, 138, E.ranting, 24)),
      tambah("nyamuk.", emo("ny", 250, 112, E.nyamuk, 16), emo("ny2", 214, 120, E.nyamuk, 14)),
    ),
    k(
      SUARA_P2,
      tambah("Pak", ...tokoh("pd", 190, 96, "Pak Darto", 18)),
      tambah("Darto,", emo("lb", 214, 92, E.lambai, 16)),
      tambah("air", emo("bo", 160, 100, E.botol, 18)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Sampai Besok"), ...rumput("rt", 150)),
      tambah("botol", ...[0, 1, 2, 3, 4].map((i) => emo(`b${i}`, 90 + i * 30, 92, E.botol, 22))),
      tambah("dibagikan?", teks("tq", 150, 56, "?", 30, W.merah)),
      tambah("Terima", ...tokoh("rk", 36, 184, "Raka"), ...tokoh("sl", 80, 184, "Salsa"), ...tokoh("bm", 122, 184, "Bima")),
      tambah("Joko,", ...tokoh("pj", 168, 184, "Pak Joko"), ...tokoh("rn", 220, 184, "Kak Rina")),
      tambah("Rina!", emo("l1", 36, 150, E.lambai, 16), emo("l2", 220, 150, E.lambai, 16)),
    ),
  ],
};
