import type { AdeganStory } from "./logika-story";
import { E, W, bedeng, emo, judul, kartu, orang, papan, teks } from "./k1b2a-gambar";
import { bersih, k, sorotkan, tambah } from "./k1b2a-bantu";

/* Akhir "Bibit Kiriman Nenek": semua bibit tertanam pas, papan catatan kebun, lalu penutup. Tanpa latihan. */

/* ------------------------------ 7. Semua bibit tertanam ------------------------------ */
const SUARA_H1 = "Sekarang semua bibit sudah tertanam. Tidak ada bibit yang kelebihan atau kekurangan lubang.";
const SUARA_H2 = "Abang memasang papan catatan kebun. Empat ditambah dua, tiga ditambah lima, tujuh ditambah nol, enam ditambah empat.";
const SUARA_H3 = "Mamah tersenyum. Ayo kita siram setiap hari. Nanti kita panen bersama!";
const BEDENG = [
  { e: E.cabai, n: "cabai 6" },
  { e: E.tomat, n: "tomat 8" },
  { e: E.selada, n: "selada 7" },
  { e: E.sawi, n: "sawi 10" },
];
const CATATAN = [
  { e: E.cabai, t: "4 + 2 = 6", at: "Empat" },
  { e: E.tomat, t: "3 + 5 = 8", at: "tiga" },
  { e: E.selada, t: "7 + 0 = 7", at: "tujuh" },
  { e: E.sawi, t: "6 + 4 = 10", at: "enam" },
];

export const ADEGAN_HASIL: AdeganStory = {
  id: "semua-tertanam",
  judul: "Semua bibit tertanam",
  sumber: "Materi: hasil dan papan catatan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Semua bibit tertanam")),
      tambah("semua", ...BEDENG.flatMap((b, i) => [...bedeng(`bd${i}`, 12 + i * 72, 118, 60, 40), emo(`be${i}`, 42 + i * 72, 146, b.e, 22), teks(`bn${i}`, 42 + i * 72, 174, b.n, 8.6, W.coklat)])),
      tambah("lubang.", emo("ok", 150, 92, E.benar, 30)),
    ),
    k(
      SUARA_H2,
      bersih(0),
      tambah(0, judul("Papan catatan kebun"), ...orang("ab", 30, 110, E.abang, "Abang")),
      tambah("papan", ...papan("pp", 70, 30, 210, 140)),
      ...CATATAN.map((c, i) => tambah(c.at, emo(`ce${i}`, 112, 62 + i * 30, c.e, 18), teks(`ct${i}`, 196, 62 + i * 30, c.t, 16, W.biru))),
    ),
    k(
      SUARA_H3,
      bersih(0),
      tambah(0, judul("Tunggu panen"), ...orang("mm", 150, 120, E.mamah, "Mamah")),
      tambah("siram", emo("a1", 80, 110, E.air, 26), emo("a2", 220, 110, E.air, 26)),
      tambah("panen", emo("kj", 150, 178, E.keranjang, 30), emo("mt", 262, 56, E.matahari, 30)),
      sorotkan("bersama!", "mm"),
    ),
  ],
};

/* ------------------------------ 8. Penutup ------------------------------ */
const SUARA_Z1 = "Ingat, penjumlahan berarti bertambah atau menggabungkan dua kumpulan.";
const SUARA_Z2 = "Mulai dari bilangan pertama, lalu hitung maju. Tulis kalimatnya dengan tanda tambah dan sama dengan.";
const SUARA_Z3 = "Terima kasih, Igil, Kaka, Abang, dan Mamah. Sampai jumpa di kebun saat bibitnya tumbuh!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: ingat cara menjumlah",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_Z1,
      tambah(0, judul("Ingat, ya!")),
      tambah("bertambah", ...kartu("p1", 14, 34, 272, 34, W.hijauMuda, ["bertambah: datang lagi"], 9.6)),
      tambah("menggabungkan", ...kartu("p2", 14, 76, 272, 34, W.langit, ["menggabungkan: dua kumpulan jadi satu"], 9.6)),
    ),
    k(
      SUARA_Z2,
      tambah("Mulai", ...kartu("p3", 14, 118, 272, 34, W.emas, ["mulai dari bilangan pertama, hitung maju"], 9.6)),
      tambah("Tulis", ...kartu("p4", 14, 160, 272, 34, W.pink, ["4 + 2 = 6"], 13)),
    ),
    k(
      SUARA_Z3,
      bersih(0),
      tambah(0, judul("Terima kasih!"), emo("ht", 150, 66, E.hati, 30)),
      tambah("Igil,", ...orang("ig", 45, 130, E.igil, "Igil")),
      tambah("Kaka,", ...orang("kk", 115, 130, E.kaka, "Kaka")),
      tambah("Abang,", ...orang("ab", 185, 130, E.abang, "Abang")),
      tambah("Mamah.", ...orang("mm", 255, 130, E.mamah, "Mamah")),
      tambah("tumbuh!", emo("ba", 90, 186, E.bibit, 26), emo("bb", 210, 186, E.bibit, 26)),
    ),
  ],
};
