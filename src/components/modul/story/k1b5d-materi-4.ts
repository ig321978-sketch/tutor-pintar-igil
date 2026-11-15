import type { AdeganStory } from "./logika-story";
import { W, batang, emo, judul, kartu, kartuAngka, kotak, teks, type Titik } from "./k1b5d-gambar";
import { bersih, geserKartu, hapus, k, redamkan, sorotkan, tambah, ubah } from "./k1b5d-bantu";

const IGIL = "\u{1F989}";
const MOBIL = "\u{1F697}";
const BARIS_MOBIL = (n: number, y: number): Titik[] => Array.from({ length: n }, (_, i) => ({ x: 24 + i * 20, y }));

/* ------------------------------ 1. Latihan 1: mobil Wei dan Halim ------------------------------ */
const SUARA_L1 = "Latihan satu. Wei punya sembilan mobil. Halim punya tiga belas mobil. Siapa yang mobilnya lebih sedikit?";
const SUARA_L2 = "Pikirkan dulu. Bilangan mana yang lebih kecil, sembilan atau tiga belas? Pilih kartu nama yang tepat di layar.";
const SUARA_L3 = "Sembilan lebih kecil dari tiga belas. Jadi mobil Wei lebih sedikit. Kita ketuk kartu Wei.";
const SUARA_L4 = "Betul! Mobil Wei lebih sedikit, dan mobil Halim lebih banyak. Hebat sekali!";

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan 1: mobil Wei dan Halim",
  sumber: "Materi: latihan mobil Wei dan Halim",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Latihan 1")),
      tambah("Wei", teks("lw", 14, 44, "Wei: 9 mobil", 9.4, W.ungu, { anchor: "start" }), ...BARIS_MOBIL(9, 64).map((p, i) => emo(`mw${i}`, p.x, p.y, MOBIL, 16))),
      tambah("Halim", teks("lh", 14, 84, "Halim: 13 mobil", 9.4, W.ungu, { anchor: "start" }), ...BARIS_MOBIL(13, 104).map((p, i) => emo(`mh${i}`, p.x, p.y, MOBIL, 16))),
    ),
    k(SUARA_L2, tambah("Pikirkan", emo("q1", 276, 44, "\u{1F914}", 22)), tambah("Pilih", ...kartu("o1", 40, 130, 100, 28, W.langit, ["Mobil Wei"], 10), ...kartu("o2", 160, 130, 100, 28, W.pink, ["Mobil Halim"], 10))),
    k(SUARA_L3, hapus(0, "q1"), tambah("Sembilan", ...kartu("lk", 50, 166, 200, 26, W.krem, ["9 lebih kecil dari 13"], 10)), sorotkan("Wei.", "o1-k"), redamkan("Wei.", "o2-k")),
    k(SUARA_L4, tambah("Betul!", emo("ok", 276, 184, "✅", 24)), tambah("Hebat", emo("ow", 24, 190, IGIL, 24))),
  ],
};

/* ------------------------------ 2. Latihan 2: apel Upe, Malosi, dan Kira ------------------------------ */
const SUARA_M1 = "Latihan dua. Upe punya dua belas apel. Malosi punya delapan belas apel. Kira punya sepuluh apel. Siapa yang apelnya paling banyak?";
const SUARA_M2 = "Pilih jawabannya. Siapa yang paling banyak? Siapa yang paling sedikit? Ketuk kartu nama di layar.";
const SUARA_M3 = "Delapan belas paling besar. Jadi apel Malosi paling banyak. Sepuluh paling kecil. Jadi apel Kira paling sedikit.";
const SUARA_M4 = "Betul! Apel Upe ada di tengah. Hebat sekali!";
const BAR_APEL = (id: string, y: number, nama: string, n: number, warna: string) => [teks(`${id}n`, 12, y + 14, nama, 9, W.biru, { anchor: "start" }), batang(`${id}b`, 52, y, n, warna, 20), teks(`${id}t`, 52 + n * 6, y + 14, `${n} apel`, 9, W.biru)];

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan 2: apel Upe, Malosi, dan Kira",
  sumber: "Materi: latihan apel tiga anak",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Latihan 2")),
      tambah("Upe", ...BAR_APEL("u", 40, "Upe", 12, "#FCA5A5")),
      tambah("Malosi", ...BAR_APEL("m", 70, "Malosi", 18, "#FCA5A5")),
      tambah("Kira", ...BAR_APEL("r", 100, "Kira", 10, "#FCA5A5")),
    ),
    k(SUARA_M2, tambah("Pilih", ...kartu("n1", 14, 140, 86, 26, W.krem, ["Upe"], 10), ...kartu("n2", 107, 140, 86, 26, W.langit, ["Malosi"], 10), ...kartu("n3", 200, 140, 86, 26, W.pink, ["Kira"], 10))),
    k(
      SUARA_M3,
      ubah("Malosi", { id: "mb", warna: "#4ADE80" }),
      sorotkan("Malosi", "n2-k"),
      ubah("Kira", { id: "rb", warna: "#60A5FA" }),
      sorotkan("Kira", "n3-k"),
      tambah("sedikit.", ...kartu("pp", 14, 174, 134, 22, W.hijauMuda, ["paling banyak: Malosi"], 8.6), ...kartu("ps", 152, 174, 134, 22, W.langit, ["paling sedikit: Kira"], 8.6)),
    ),
    k(SUARA_M4, redamkan(0, "n2-k", "n3-k"), tambah("Betul!", emo("ok", 262, 112, "✅", 24)), tambah("Hebat", emo("ow", 230, 134, IGIL, 22))),
  ],
};

/* ------------------------------ 3. Latihan 3: urutkan dari terbesar ------------------------------ */
const KX = [32, 122, 212];
const SLOT_Y = 128;
const KARTU_Y = 44;
const SUARA_N1 = "Latihan tiga. Ada tiga kartu bilangan: enam belas, dua belas, dan sembilan belas. Susun dari yang terbesar.";
const SUARA_N2 = "Cari yang paling besar. Sembilan belas paling besar. Seret kartu sembilan belas ke tempat pertama.";
const SUARA_N3 = "Lalu enam belas dan dua belas. Enam belas lebih besar dari dua belas. Seret enam belas ke tempat kedua, dua belas ke tempat ketiga.";
const SUARA_N4 = "Betul! Urutan dari terbesar adalah sembilan belas, enam belas, dua belas. Hebat sekali!";

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan 3: urutkan dari terbesar",
  sumber: "Materi: latihan mengurutkan tiga bilangan",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Latihan 3")),
      ...[0, 1, 2].flatMap((i) => [tambah(0, kotak(`sl${i}`, KX[i], SLOT_Y, 56, 44, "#F1F5F9", W.biru, { rx: 6, tebal: 1.4 }), teks(`st${i}`, KX[i] + 28, 188, ["pertama", "kedua", "ketiga"][i], 8.6, W.ungu))]),
      tambah("enam", ...kartuAngka("c16", KX[0], KARTU_Y, "16", W.langit, 56, 44, 24)),
      tambah("dua", ...kartuAngka("c12", KX[1], KARTU_Y, "12", W.hijauMuda, 56, 44, 24)),
      tambah("sembilan", ...kartuAngka("c19", KX[2], KARTU_Y, "19", W.pink, 56, 44, 24)),
    ),
    k(SUARA_N2, sorotkan("besar.", "c19-k"), tambah("Cari", emo("tg", 150, 108, "\u{1F446}", 24)), geserKartu("pertama.", "c19", KX[0], SLOT_Y)),
    k(SUARA_N3, redamkan(0, "c19-k"), sorotkan("kedua,", "c16-k"), geserKartu("kedua,", "c16", KX[1], SLOT_Y), geserKartu("ketiga.", "c12", KX[2], SLOT_Y), hapus("ketiga.", "tg"), redamkan("ketiga.", "c16-k")),
    k(SUARA_N4, tambah("Betul!", emo("ok", 150, 100, "✅", 30)), tambah("Urutan", ...kartu("hu", 60, 52, 180, 26, W.emas, ["19, 16, 12"], 13))),
  ],
};

/* ------------------------------ 4. Penutup ------------------------------ */
const SUARA_E1 = "Hebat! Hari ini kita sudah belajar membandingkan dua kumpulan. Ada lebih banyak, lebih sedikit, dan sama banyak.";
const SUARA_E2 = "Kita juga belajar kata paling banyak dan paling sedikit, untuk tiga kumpulan atau lebih.";
const SUARA_E3 = "Lalu kita belajar mengurutkan bilangan, dari yang terkecil dan dari yang terbesar. Kita bisa melihat puluhan dulu, lalu satuan, atau memakai garis bilangan.";
const SUARA_E4 = "Terima kasih sudah belajar. Sampai jumpa di video berikutnya!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup",
  sumber: "Materi: penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_E1, tambah(0, judul("Yang sudah kita pelajari")), tambah("membandingkan", ...kartu("e1", 14, 44, 244, 34, W.hijauMuda, ["membandingkan dua kumpulan"], 10)), tambah("lebih", emo("e1m", 278, 68, "⚖️", 22))),
    k(SUARA_E2, tambah("paling", ...kartu("e2", 14, 92, 244, 34, W.langit, ["paling banyak, paling sedikit"], 10), emo("e2m", 278, 116, "\u{1F3C6}", 22))),
    k(SUARA_E3, tambah("mengurutkan", ...kartu("e3", 14, 140, 244, 34, W.pink, ["mengurutkan bilangan"], 10)), tambah("garis", emo("e3m", 278, 164, "\u{1F4CF}", 22))),
    k(SUARA_E4, bersih(0), tambah(0, judul("Terima kasih"), emo("ow", 150, 100, IGIL, 54)), tambah("Sampai", teks("ez", 150, 170, "Sampai jumpa!", 13, W.ungu))),
  ],
};
