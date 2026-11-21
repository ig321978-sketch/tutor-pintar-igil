import type { AdeganStory } from "./logika-story";
import { E, G5, G6, W, angka, angkaBilangan, emo, judul, kolom, kotak, panah, papanAngka, tabelKosong, tanah, teks, tokoh } from "./k5b1a-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah } from "./k5b1a-bantu";

/*
 * Cerita orisinal IGIL "Tiket Tribun Bu Ningsih" (Kelas 5 Bab 1 Sub-Bab A), awal cerita Hari Pertandingan di Stadion Kota.
 * Naskah suara dari naskah/story-naskah-k5b1a.md. Bagian ini: uraian Tribun Barat (30.402), bilangan terbesar lima angka sampai seratus ribu, dan jembatan ke Sub-Bab B (Pak Hasto).
 */

/* ------------------------------ 7. Uraian tiap angka menurut kolomnya (30.402) ------------------------------ */
const SUARA_R1 = "Tribun Barat dihuni tiga puluh ribu empat ratus dua penonton.";
const SUARA_R2 = "Citra menjabarkan: tiga di puluh ribuan mewakili tiga puluh ribu, empat di ratusan mewakili empat ratus.";
const SUARA_R3 = "Angka dua di satuan mewakili dua, sehingga ketiganya dijumlahkan menjadi bilangan semula.";

export const ADEGAN_URAIAN: AdeganStory = {
  id: "uraian",
  judul: "Menguraikan bilangan",
  sumber: "Materi: uraian menurut kolom",
  latar: "#E0F2FE",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Tribun Barat"), ...tanah("tn", 150), ...tabelKosong("tb", G5)),
      tambah("tiga", teks("bl", 150, 40, "30.402", 16, W.merah, { z: 3 })),
      tambah("penonton.", ...angkaBilangan("tb", 30402, G5)),
    ),
    k(
      SUARA_R2,
      tambah("Citra", ...tokoh("ct", 40, 184, "Citra")),
      sorotkan(idx(SUARA_R2, "tiga", 1), "tb-c0"),
      tambah(idx(SUARA_R2, "ribu", 1), teks("u0", 46, 126, "30.000", 8.4, W.merah, { z: 3 })),
      sorotkan(idx(SUARA_R2, "empat", 1), "tb-c2"),
      tambah(idx(SUARA_R2, "ratus", 1), teks("u2", 150, 126, "400", 8.4, W.merah, { z: 3 })),
    ),
    k(
      SUARA_R3,
      tambah("satuan", teks("u4", 254, 126, "2", 8.4, W.merah, { z: 3 })),
      sorotkan("satuan", "tb-c4"),
      tambah("dijumlahkan", teks("sm", 150, 142, "30.000 + 400 + 2 = 30.402", 9, W.hijauTua, { z: 3 })),
      tambah("semula.", emo("ok", 262, 142, E.benar, 18)),
    ),
  ],
};

/* ------------------------------ 8. Bilangan terbesar lima angka dan seratus ribu ------------------------------ */
const SUARA_B1 = "Fajar bertanya bilangan terbesar di papan, dan Bima menjawab lima angka sembilan semua.";
const SUARA_B2 = "Sembilan puluh sembilan ribu sembilan ratus sembilan puluh sembilan ditambah satu menjadi seratus ribu.";
const SUARA_B3 = "Seratus ribu butuh kolom baru di kiri, yaitu ratusan ribu.";

export const ADEGAN_SERATUS_RIBU: AdeganStory = {
  id: "seratus-ribu",
  judul: "Bilangan terbesar",
  sumber: "Materi: seratus ribu",
  latar: "#E0F2FE",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Bilangan Terbesar"), ...tanah("tn", 150)),
      tambah("Fajar", ...tokoh("fj", 60, 184, "Fajar"), emo("tq", 90, 156, E.tanya, 18)),
      tambah("papan,", ...papanAngka("pp", 40, 30, 220, 70)),
      tambah("Bima", ...tokoh("bm", 120, 184, "Bima")),
      tambah("lima", teks("c5", 150, 116, "5 angka", 9, W.merah, { z: 3 })),
      tambah("sembilan", ...[0, 1, 2, 3, 4].map((i) => teks(`n${i}`, 90 + i * 30, 78, "9", 22, W.sorot, { z: 3 }))),
      tambah("semua.", teks("c99", 150, 132, "99.999", 12, W.hijauTua, { z: 3 })),
    ),
    k(
      SUARA_B2,
      hapus(0, "n0", "n1", "n2", "n3", "n4", "tq"),
      tambah("Sembilan", teks("ps", 150, 66, "99.999 + 1", 18, W.sorot, { z: 3 })),
      tambah("seratus", teks("ph", 150, 92, "= 100.000", 18, W.sorot, { z: 3 })),
      tambah("ditambah", emo("bs", 262, 124, E.bintang, 20)),
    ),
    k(
      SUARA_B3,
      bersih(0),
      tambah(0, judul("Kolom Baru"), ...tanah("tn", 150), ...([1, 2, 3, 4, 5].flatMap((j) => [...kolom("tb", j, G6), angka("tb", j, "0", G6)]))),
      tambah("Seratus", teks("bl", 150, 40, "100.000", 16, W.merah, { z: 3 })),
      tambah("baru", ...kolom("tb", 0, G6, W.sorot)),
      tambah("kiri,", panah("pk", 35, 122, 0, -12, W.merah, 1.8), teks("kb", 35, 136, "kolom baru", 8.4, W.merah, { z: 3 })),
      tambah("ratusan", angka("tb", 0, "1", G6, W.merah)),
    ),
  ],
};

/* ------------------------------ 9. Penutup: Pak Hasto datang (jembatan ke Sub-Bab B) ------------------------------ */
const SUARA_N1 = "Pak Hasto, penyiar stadion, datang membawa pengeras suara dan daftar penonton keempat tribun.";
const SUARA_N2 = "Ia ingin tahu tribun mana yang paling ramai dan mana yang paling sepi.";
const SUARA_N3 = "Menurutmu, bagaimana cara membandingkan bilangan sebesar itu? Terima kasih, Bima, Citra, Fajar, Pak Arif, dan Bu Ningsih!";

const DAFTAR: [string, string][] = [
  ["Utara", "24.350"],
  ["Selatan", "18.705"],
  ["Timur", "9.060"],
  ["Barat", "30.402"],
];

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Pak Hasto datang",
  sumber: "Materi: jembatan ke urutan tribun",
  latar: "#E0F2FE",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Pak Hasto Datang"), ...tanah("tn", 150)),
      tambah("Hasto,", ...tokoh("ph", 50, 184, "Pak Hasto")),
      tambah("membawa", emo("mg", 88, 160, E.megafon, 22, { z: 3 })),
      tambah("daftar", kotak("dp", 120, 34, 160, 100, W.putih, W.coklat, { rx: 4, tebal: 1.6, z: 1 }), teks("dj", 200, 52, "daftar penonton", 8.4, W.coklat, { z: 3 })),
      tambah("tribun.", ...DAFTAR.map(([n, v], i) => teks(`dl${i}`, 200, 72 + i * 20, `${n} ${v}`, 9.4, W.biru, { z: 3 }))),
    ),
    k(
      SUARA_N2,
      tambah("ramai", teks("rm", 56, 96, "paling ramai?", 9, W.merah, { z: 3 })),
      tambah("sepi.", teks("sp", 56, 114, "paling sepi?", 9, W.merah, { z: 3 })),
      tambah("tahu", emo("tn2", 50, 70, E.tanya, 22, { z: 3 })),
    ),
    k(
      SUARA_N3,
      bersih(0),
      tambah(0, judul("Terima Kasih"), ...tanah("tn", 150)),
      tambah("membandingkan", teks("ba", 70, 76, "9.060", 14, W.biru, { z: 3 }), teks("bq", 150, 76, "?", 26, W.merah, { z: 3 }), teks("bb", 230, 76, "18.705", 14, W.biru, { z: 3 })),
      tambah("Bima,", ...tokoh("bm", 32, 184, "Bima")),
      tambah("Citra,", ...tokoh("ct", 86, 184, "Citra")),
      tambah("Fajar,", ...tokoh("fj", 140, 184, "Fajar")),
      tambah("Arif,", ...tokoh("pa", 194, 184, "Pak Arif")),
      tambah("Ningsih!", ...tokoh("bn", 252, 184, "Bu Ningsih"), emo("lb", 150, 124, E.lambai, 20)),
    ),
  ],
};
