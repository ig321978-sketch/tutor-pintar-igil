import type { AdeganStory } from "./logika-story";
import { E, W, WK, bulat, deretKue, emo, etalase, judul, kapur, karcis, kartu, kotak, kueEmo, lantai, nampan, geserKarcis, panah, papan, teks, tokoh } from "./k2b1A-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k2b1A-bantu";

/*
 * Cerita orisinal IGIL "Kue Kiriman dari Dapur" (Kelas 2 Bab 1 Sub-Bab A), awal cerita Kue di Kantin Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b1a.md. Bagian ini: karcis sobek (melengkapi urutan), hasil tercatat di papan harga, dan penutup.
 */

/* ------------------------------ 7. Karcis sobek: melengkapi urutan ------------------------------ */
const SUARA_S1 = "Karcis antrean sobek, dan satu nomor hilang di antara tiga puluh tujuh dan tiga puluh sembilan.";
const SUARA_S2 = "Nia berpikir. Setelah tiga puluh tujuh datang tiga puluh delapan, dan sebelum tiga puluh sembilan juga tiga puluh delapan.";
const SUARA_S3 = "Chacha memasang nomor tiga puluh delapan, dan ternyata pas sekali!";

const BARIS_X = [14, 70, 126, 182, 238];

export const ADEGAN_SOBEK: AdeganStory = {
  id: "nomor-sobek",
  judul: "Nomor karcis yang hilang",
  sumber: "Materi: melengkapi urutan bilangan",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_S1,
      tambah("Karcis", judul("Karcis Antrean Sobek"), lantai("lt", 168), ...karcis("c0", BARIS_X[0], 66, "36"), ...karcis("c1", BARIS_X[1], 66, "37"), ...karcis("c3", BARIS_X[3], 66, "39"), ...karcis("c4", BARIS_X[4], 66, "40")),
      tambah("sobek,", kotak("bl", BARIS_X[2], 66, 46, 24, W.putih, W.merah, { putus: true, rx: 3, tebal: 1.8 })),
      tambah("satu", ...kartu("sk", 80, 112, 140, 22, W.merahMuda, ["1 nomor hilang"], 9)),
      tambah("hilang", teks("tq", 149, 84, "?", 16, W.merah)),
      ubah("tiga@1", { id: "c1", sorot: true }, { id: "c1t", sorot: true }),
      ubah("tiga@2", { id: "c1", sorot: false }, { id: "c1t", sorot: false }, { id: "c3", sorot: true }, { id: "c3t", sorot: true }),
    ),
    k(
      SUARA_S2,
      hapus(0, "sk-k", "sk-t0"),
      ubah(0, { id: "c3", sorot: false }, { id: "c3t", sorot: false }),
      tambah("Nia", ...tokoh("ni", 30, 178, "Nia")),
      tambah("berpikir.", emo("pk", 58, 160, E.pikir, 22)),
      tambah("Setelah", panah("a1", 100, 104, 140, 104, W.hijau), teks("m1", 120, 120, "+1", 10, W.hijau)),
      ubah("delapan,", { id: "tq", isi: "38", warna: W.hijau }),
      tambah("sebelum", panah("a2", 198, 104, 158, 104, W.merah), teks("m2", 178, 120, "-1", 10, W.merah)),
      ubah("delapan@2", { id: "tq", sorot: true }),
    ),
    k(
      SUARA_S3,
      hapus(0, "a1", "m1", "a2", "m2", "tq", "pk"),
      tambah("Chacha", ...tokoh("ch", 266, 178, "Chacha")),
      tambah("nomor", ...karcis("k38", 126, 132, "38", 46, 24, "#BBF7D0")),
      ubah("memasang", ...geserKarcis("k38", BARIS_X[2], 66)),
      tambah("pas", emo("ok", 149, 112, E.benar, 22)),
      ubah("sekali!", { id: "ok", sorot: true }),
    ),
  ],
};

/* ------------------------------ 8. Hasil tercatat ------------------------------ */
const SUARA_T1 = "Bu Sari menyalin hasilnya ke papan harga, tiga puluh enam kue lapis.";
const SUARA_T2 = "Etalase tertata rapi, dan semua kue sudah tercatat.";
const SUARA_T3 = "Setiap anak mendapat kue, dan Chacha mendapat kue terakhir yang bekas krimnya ia jilat sendiri!";

export const ADEGAN_TERCATAT: AdeganStory = {
  id: "tercatat",
  judul: "Semua kue tercatat",
  sumber: "Materi: hasil tercatat di papan harga",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Papan Harga"), lantai("lt", 168)),
      tambah("Sari", ...tokoh("bs", 268, 178, "Bu Sari")),
      tambah("menyalin", emo("sn", 208, 62, E.pesanan, 22)),
      tambah("papan", papan("ph", 14, 30, 150, 70)),
      tambah("harga,", kapur("hj", 89, 52, "Kue Lapis", 11)),
      tambah("tiga", kapur("h36", 89, 88, "36", 28)),
      tambah("lapis.", kueEmo("hk", 132, 82, 18)),
    ),
    k(
      SUARA_T2,
      tambah("Etalase", ...etalase("et", 176, 30, 112, 98, 2)),
      tambah("tertata", nampan("n1", 184, 70, 96, 6), nampan("n2", 184, 114, 96, 6)),
      tambah("rapi,", ...deretKue("a", 4, 196, 26, 62)),
      tambah("semua", ...deretKue("b", 4, 196, 26, 106)),
      tambah("tercatat.", emo("ok", 100, 126, E.benar, 24)),
    ),
    k(
      SUARA_T3,
      tambah("anak", ...[0, 1, 2].map((i) => emo(`ak${i}`, 40 + i * 36, 156, E.anak, 22))),
      tambah("mendapat", ...[0, 1, 2].map((i) => kueEmo(`ku${i}`, 40 + i * 36, 138, 14))),
      tambah("Chacha", ...tokoh("ch", 200, 178, "Chacha")),
      tambah("terakhir", kueEmo("ck", 226, 158, 16)),
      tambah("krimnya", bulat("ks", 226, 152, 3, WK.krim, W.merah, { z: 3 })),
      ubah("jilat", { id: "ch", isi: E.lezat }),
    ),
  ],
};

/* ------------------------------ 9. Penutup ------------------------------ */
const SUARA_P1 = "Bu Sari tersenyum. Besok kantin menerima pesanan kue yang lebih banyak.";
const SUARA_P2 = "Dika merangkum. Hitung dengan menggeser tiap kue, kemas per sepuluh, lalu tulis puluhan dan satuannya.";
const SUARA_P3 = "Menurutmu, mengapa angka tiga pada tiga puluh enam artinya tiga puluh, bukan tiga saja? Terima kasih, Chacha, Dika, Nia, dan Bu Sari!";

export const ADEGAN_PENUTUP_A: AdeganStory = {
  id: "penutup",
  judul: "Penutup Sub-Bab A",
  sumber: "Materi: ringkasan dan pertanyaan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Besok Lebih Banyak"), lantai("lt", 168), ...etalase("et", 14, 30, 150, 98, 2), ...deretKue("a", 5, 34, 26, 62), ...deretKue("b", 5, 34, 26, 106)),
      tambah("Sari", ...tokoh("bs", 268, 178, "Bu Sari")),
      tambah("tersenyum.", emo("sn", 268, 150, E.senyum, 16)),
      tambah("Besok", emo("kl", 220, 56, E.kalender, 26), teks("klt", 220, 80, "besok", 9, W.ungu)),
      tambah("pesanan", ...kartu("pn", 176, 100, 100, 26, W.krem, ["pesanan kue", "lebih banyak"], 8.4)),
      ubah("banyak.", { id: "pn-k", sorot: true }),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah("Dika", ...tokoh("dk", 28, 178, "Dika")),
      tambah("Hitung", judul("Cara Menghitung Kue"), ...kartu("r1", 50, 34, 210, 28, W.langit, ["1. Geser tiap kue"], 11)),
      tambah("kemas", ...kartu("r2", 50, 72, 210, 28, W.krem, ["2. Kemas per 10"], 11)),
      tambah("tulis", ...kartu("r3", 50, 110, 210, 28, W.hijauMuda, ["3. Tulis puluhan dan satuan"], 11)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah("Menurutmu,", judul("Pertanyaan untukmu")),
      tambah("angka", kapur("w36", 150, 86, "36", 52, { warna: W.biru })),
      tambah("tiga@1", teks("q1", 150, 112, "3 di kiri = puluhan", 11, W.ungu)),
      tambah("artinya", teks("q2", 150, 134, "3 puluhan = 30", 13, W.merah)),
      tambah("Chacha,", ...tokoh("ch", 50, 178, "Chacha"), emo("l1", 50, 150, E.lambai, 16)),
      tambah("Dika,", ...tokoh("dk", 110, 178, "Dika"), emo("l2", 110, 150, E.lambai, 16)),
      tambah("Nia,", ...tokoh("ni", 170, 178, "Nia"), emo("l3", 170, 150, E.lambai, 16)),
      tambah("Sari!", ...tokoh("bs", 240, 178, "Bu Sari"), emo("l4", 240, 150, E.lambai, 16)),
    ),
  ],
};
