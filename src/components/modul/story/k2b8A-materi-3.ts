import type { AdeganStory, Obj } from "./logika-story";
import { E, W, emo, garis, jepit, judul, kartu, kotak, lampu, lantai, papanLayar, rangka, tabel, teks, tirai, tokoh, turus } from "./k2b8A-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k2b8A-bantu";
import { barisTurus } from "./k2b8A-materi-2";

/*
 * Cerita orisinal IGIL "Alat Musik Pak Hendra" (Kelas 2 Bab 8 Sub-Bab A, diagram turus), awal cerita Pentas Seni Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b8a.md. Bagian ini: membaca diagram turus, mengumpulkan data sendiri, dan penutup (jembatan ke Sub-Bab B).
 */

/* ------------------------------ 7. Membaca diagram turus ------------------------------ */
const SUARA_R1 = "Turus yang paling panjang menunjukkan alat musik paling banyak, yaitu angklung.";
const SUARA_R2 = "Gendang dan rebana sama panjang, jadi sama banyak, yaitu empat.";
const SUARA_R3 = "Angklung sembilan dan seruling enam. Angklung tiga lebihnya dari seruling, dan seruling tiga kurangnya dari angklung.";

/** Tabel turus lengkap alat musik (angklung 9, seruling 6, gendang 4, rebana 4) beserta kepala, judul tabel, dan angka banyaknya. */
const TABEL_LENGKAP: Obj[] = [
  ...tabel("tb", 15, 44, [80, 120, 70], 20, 22, 4),
  teks("hn", 55, 58, "Nama", 9, W.biru),
  teks("ht", 155, 58, "Turus", 9, W.biru),
  teks("hb", 250, 58, "Banyaknya", 9, W.biru),
  teks("jj", 150, 38, "Alat Musik Pentas", 10, W.merah),
  ...barisTurus("r0", 0, "Angklung", 9),
  ...barisTurus("r1", 1, "Seruling", 6),
  ...barisTurus("r2", 2, "Gendang", 4),
  ...barisTurus("r3", 3, "Rebana", 4),
  ...[9, 6, 4, 4].map((n, r) => teks(`rb${r}`, 250, 79 + 22 * r, String(n), 11, W.merah)),
];
const sorotBaris = (id: string, r: number): Obj => kotak(id, 17, 64 + 22 * r + 1, 266, 20, undefined, W.hijau, { rx: 3, tebal: 2.6, z: 5 });

export const ADEGAN_BACA_DIAGRAM: AdeganStory = {
  id: "baca-diagram",
  judul: "Membaca diagram turus",
  sumber: "Materi: membaca paling banyak, sama, lebih, kurang",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Baca Diagram Turus"), ...TABEL_LENGKAP),
      tambah("panjang", sorotBaris("hl", 0)),
      tambah("banyak,", teks("pb", 150, 166, "paling banyak", 10, W.hijau)),
      tambah("angklung.", emo("st", 8, 75, E.bintang, 14)),
    ),
    k(
      SUARA_R2,
      hapus(0, "hl", "st", "pb"),
      tambah("Gendang", sorotBaris("h2", 2)),
      tambah("rebana", sorotBaris("h3", 3)),
      tambah("sama", garis("br", 291, 119, 0, 22, W.merah, 2, { z: 5 }), teks("eq", 296, 134, "=", 14, W.merah)),
      tambah("banyak,", teks("pb", 150, 166, "sama banyak", 10, W.hijau)),
      tambah("empat.", emo("ok", 8, 130, E.benar, 14)),
    ),
    k(
      SUARA_R3,
      bersih(0),
      tambah(0, judul("Lebih dan Kurang"), teks("la", 46, 82, "Angklung", 9, W.biru), ...turus("ta", 84, 66, 9, W.biru, 26, 8, 2.6)),
      tambah("sembilan", teks("n9", 176, 82, "9", 12, W.merah)),
      tambah("seruling", teks("ls", 46, 122, "Seruling", 9, W.biru), ...turus("ts", 84, 106, 6, W.biru, 26, 8, 2.6)),
      tambah("enam.", teks("n6", 176, 122, "6", 12, W.merah)),
      tambah("tiga", teks("l3", 136, 56, "3 lebih", 10, W.merah)),
      ubah("tiga", ...["ta-g6", "ta-g7", "ta-g8"].map((id) => ({ id, warna: W.merah, tebal: 3.6 }))),
      tambah("lebihnya", garis("gd", 124, 58, 0, 84, W.hijau, 1.4, { putus: true, z: 4 })),
      tambah("tiga@2", ...[6, 7, 8].map((i) => garis(`gh${i}`, 84 + 36 + (i - 5) * 8, 106, 0, 26, W.merah, 2.4, { putus: true, op: 0.4, z: 2 }))),
      tambah("kurangnya", teks("k3", 136, 146, "3 kurang", 10, W.ungu)),
    ),
  ],
};

/* ------------------------------ 8. Mengumpulkan data sendiri ------------------------------ */
const SUARA_M1 = "Nia bertanya kepada dua belas anak: penampilan apa yang paling ingin kalian tonton?";
const SUARA_M2 = "Setiap anak menjawab satu kali, dan Nia langsung menulis satu garis di baris yang tepat dengan tertib.";
const SUARA_M3 = "Hasilnya tari lima, musik empat, drama tiga. Tari paling banyak dipilih.";

/** Dua belas anak kecil: enam di kiri (x 28-80) dan enam di kanan (x 220-272). */
const ANAK: Obj[] = Array.from({ length: 12 }, (_, i) => {
  const kiri = i < 6;
  const j = i % 6;
  return emo(`kd${i}`, (kiri ? 28 : 220) + (j % 3) * 26, 100 + Math.floor(j / 3) * 26, E.anak, 20);
});

export const ADEGAN_DATA_SENDIRI: AdeganStory = {
  id: "data-sendiri",
  judul: "Mengumpulkan data sendiri",
  sumber: "Materi: mengumpulkan data dengan turus",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Bertanya kepada Anak-Anak"), ...lantai("lt", 150), ...tokoh("ni", 150, 184, "Nia"), ...jepit("pj", 172, 138, 22, 26)),
      tambah("dua", teks("n12", 150, 40, "12 anak", 11, W.ungu), ...ANAK),
      tambah("penampilan", ...kartu("bt", 14, 66, 52, 20, W.pink, ["tari"], 9), ...kartu("bu", 124, 66, 52, 20, W.krem, ["musik"], 9), ...kartu("bd", 234, 66, 52, 20, W.hijauMuda, ["drama"], 9)),
    ),
    k(
      SUARA_M2,
      bersih(0),
      tambah(
        0,
        judul("Satu Jawaban, Satu Garis"),
        ...tokoh("ni", 40, 184, "Nia"),
        kotak("bd", 84, 30, 208, 100, "#FFFFFF", W.biru, { rx: 6, tebal: 1.6, z: -1 }),
        garis("bs1", 84, 68, 208, 0, W.biru, 1, { z: -0.5 }),
        garis("bs2", 84, 100, 208, 0, W.biru, 1, { z: -0.5 }),
        teks("a0", 112, 52, "Tari", 10, W.ungu),
        teks("a1", 112, 84, "Musik", 10, W.ungu),
        teks("a2", 112, 116, "Drama", 10, W.ungu),
      ),
      tambah("menjawab", emo("kd", 40, 128, E.anak, 22), emo("bb", 40, 102, "\u{1F4AC}", 18)),
      tambah("satu", teks("n1", 190, 152, "1 anak = 1 garis", 10, W.merah)),
      tambah("menulis", ...turus("u0", 140, 43, 5, W.biru, 18, 6, 2)),
      tambah("garis", ...turus("u1", 140, 75, 4, W.biru, 18, 6, 2)),
      tambah("tertib.", ...turus("u2", 140, 107, 3, W.biru, 18, 6, 2)),
    ),
    k(
      SUARA_M3,
      hapus(0, "n1", "kd", "bb"),
      tambah(0, teks("nj", 190, 152, "jumlah 12 anak", 10, W.ungu)),
      tambah("lima,", teks("a5", 262, 52, "5", 13, W.merah)),
      tambah("empat,", teks("a4", 262, 84, "4", 13, W.merah)),
      tambah("tiga.", teks("a3", 262, 116, "3", 13, W.merah)),
      tambah("paling", kotak("hl", 86, 32, 204, 34, undefined, W.hijau, { rx: 4, tebal: 2.6, z: 5 })),
      tambah("dipilih.", emo("jr", 232, 52, E.juara, 18)),
    ),
  ],
};

/* ------------------------------ 9. Penutup: Chacha berkokok, Bu Maya datang ------------------------------ */
const SUARA_N1 = "Chacha menepati taruhannya. Ia memakai kostum ayam, lalu berkokok keras di atas panggung!";
const SUARA_N2 = "Bu Maya datang membawa papan layar kosong dan bertanya, bisakah data ini dibuat lebih bergambar?";
const SUARA_N3 = "Menurutmu, selain turus, data bisa ditulis dengan cara apa lagi? Terima kasih, Chacha, Dika, Nia, Bu Sari, dan Pak Hendra!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup dan jembatan",
  sumber: "Materi: penutup dan jembatan ke Sub-Bab B",
  latar: "#FEF2F2",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, { ...judul("Chacha Berkokok"), y: 36 }, ...lantai("lt", 150), ...tirai("tr", 150), rangka("rg"), ...lampu("l1", 70), ...lampu("l2", 230), ...tokoh("ch", 150, 184, "Chacha")),
      ubah("kostum", { id: "ch", isi: E.ayam }),
      tambah("berkokok", teks("kk", 218, 70, "kukuruyuk!", 11, W.merah), emo("n1", 96, 84, E.nada, 20), emo("n2", 112, 62, E.nada, 16)),
      tambah("panggung!", ...lampu("l3", 150, 8, true)),
    ),
    k(
      SUARA_N2,
      tambah("Maya", ...tokoh("bm", 262, 184, "Bu Maya")),
      tambah("papan", ...papanLayar("pl", 186, 40, 100, 70, 5, 4)),
      tambah("bertanya,", emo("tq", 176, 124, E.tanya, 24)),
      tambah("bergambar?", emo("st", 236, 86, E.bintang, 18)),
    ),
    k(
      SUARA_N3,
      bersih(0),
      tambah(0, judul("Terima Kasih"), ...lantai("lt", 150), ...tirai("tr", 150)),
      tambah("selain", ...turus("tq", 116, 48, 6, W.biru, 18, 5, 2)),
      tambah("cara", emo("qq", 190, 66, E.tanya, 26)),
      tambah("Chacha,", ...tokoh("ch", 40, 184, "Chacha"), emo("lb0", 40, 130, E.lambai, 18)),
      tambah("Dika,", ...tokoh("dk", 95, 184, "Dika"), emo("lb1", 95, 130, E.lambai, 18)),
      tambah("Nia,", ...tokoh("ni", 150, 184, "Nia"), emo("lb2", 150, 130, E.lambai, 18)),
      tambah("Sari,", ...tokoh("bs", 205, 184, "Bu Sari"), emo("lb3", 205, 130, E.lambai, 18)),
      tambah("Hendra!", ...tokoh("ph", 258, 184, "Pak Hendra"), emo("lb4", 258, 130, E.lambai, 18)),
    ),
  ],
};
