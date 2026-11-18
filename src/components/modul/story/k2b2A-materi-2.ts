import type { AdeganStory } from "./logika-story";
import { E, W, WK, baju, bulat, emo, gantungan, gs, judul, judulKolom, kardus, kartu, kolomPS, lantai, panah, teks, tokoh } from "./k2b2A-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah } from "./k2b2A-bantu";

/*
 * Cerita orisinal IGIL "Kiriman dari Gudang" (Kelas 2 Bab 2 Sub-Bab A, penjumlahan sampai dua puluh), awal cerita Toko Seragam dan Alat Tulis Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b2a.md. Bagian ini: pasangan bilangan, penjumlahan bersusun, dan kardus baju olahraga (sepuluh satuan tidak muat).
 */

/* ------------------------------ 4. Pasangan bilangan ------------------------------ */
const SUARA_P1 = "Nia menggambar cara lain. Tiga belas dipecah menjadi sepuluh dan tiga.";
const SUARA_P2 = "Tiga ditambah lima sama dengan delapan, lalu sepuluh ditambah delapan sama dengan delapan belas.";
const SUARA_P3 = "Hasilnya sama, delapan belas. Cara yang berbeda boleh menjawab sama!";

export const ADEGAN_PASANGAN: AdeganStory = {
  id: "pasangan",
  judul: "Pasangan bilangan",
  sumber: "Materi: pasangan bilangan",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Pasangan Bilangan"), lantai("lt", 168)),
      tambah("Nia", ...tokoh("ni", 30, 178, "Nia")),
      tambah("menggambar", emo("pn", 62, 164, "\u{270F}\u{FE0F}", 20)),
      tambah(idx(SUARA_P1, "tiga", 1), bulat("cu", 150, 52, 16, "#FDE68A", W.biru, { tebal: 2 })),
      tambah("belas", teks("tu", 150, 57, "13", 14, W.biru)),
      tambah("dipecah", gs("ga", 140, 66, 108, 92, W.biru, 2), gs("gb", 160, 66, 192, 92, W.biru, 2)),
      tambah("sepuluh", bulat("ca", 100, 106, 15, W.langit, W.biru, { tebal: 2 }), teks("ta", 100, 111, "10", 14, W.biru)),
      tambah(idx(SUARA_P1, "tiga", 2), bulat("cb", 200, 106, 15, W.pink, W.biru, { tebal: 2 }), teks("tb", 200, 111, "3", 14, W.biru)),
    ),
    k(
      SUARA_P2,
      sorotkan(0, "cb"),
      tambah(0, teks("e1a", 100, 142, "3", 14, W.biru)),
      tambah("ditambah", teks("e1b", 118, 142, "+", 14, W.merah)),
      tambah("lima", teks("e1c", 136, 142, "5", 14, W.biru)),
      tambah("sama", teks("e1d", 154, 142, "=", 14, W.merah)),
      tambah("delapan,", teks("e1e", 172, 142, "8", 14, "#15803D")),
      ubah("sepuluh", { id: "cb", sorot: false }, { id: "ca", sorot: true }),
      tambah("sepuluh", teks("e2a", 92, 164, "10", 14, W.biru)),
      tambah(idx(SUARA_P2, "ditambah", 2), teks("e2b", 114, 164, "+", 14, W.merah)),
      tambah(idx(SUARA_P2, "delapan", 2), teks("e2c", 134, 164, "8", 14, W.biru)),
      tambah(idx(SUARA_P2, "sama", 2), teks("e2d", 154, 164, "=", 14, W.merah)),
      tambah(idx(SUARA_P2, "delapan", 3), teks("e2e", 178, 164, "18", 14, "#15803D")),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Hasil Sama"), lantai("lt", 168), ...tokoh("ni", 30, 178, "Nia")),
      tambah("Hasilnya", ...kartu("ja", 30, 38, 104, 28, W.langit, ["cara pasangan"], 9)),
      tambah("sama,", ...kartu("jb", 166, 38, 104, 28, W.pink, ["cara maju"], 9)),
      tambah("delapan", teks("hs", 150, 128, "18", 30, "#15803D")),
      tambah("belas.", panah("pa", 82, 70, 132, 104, W.biru), panah("pb", 218, 70, 168, 104, W.biru)),
      sorotkan("berbeda", "ja-k", "jb-k"),
      tambah(idx(SUARA_P3, "sama", 2), emo("ok", 222, 128, E.benar, 24)),
    ),
  ],
};

/* ------------------------------ 5. Bersusun ------------------------------ */
const SUARA_B1 = "Lalu Dika menyusun angka di tabel puluhan dan satuan, satuan lurus dengan satuan.";
const SUARA_B2 = "Satuannya tiga ditambah lima sama dengan delapan, puluhannya tinggal satu.";
const SUARA_B3 = "Jadi satu puluhan dan delapan satuan, yaitu delapan belas. Tiga cara, hasilnya sama!";

export const ADEGAN_BERSUSUN: AdeganStory = {
  id: "bersusun",
  judul: "Bersusun di tabel puluhan dan satuan",
  sumber: "Materi: penjumlahan bersusun",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Bersusun"), lantai("lt", 168)),
      tambah("Dika", ...tokoh("dk", 30, 178, "Dika")),
      tambah("angka", emo("pn", 62, 164, "\u{270F}\u{FE0F}", 20)),
      tambah("tabel", ...kolomPS("tb", 40, 44, 80, 104)),
      tambah("puluhan", ...judulKolom("tb", 40, 44, 80, "p")),
      tambah("satuan,", ...judulKolom("tb", 40, 44, 80, "s")),
      tambah("lurus", teks("a1", 80, 84, "1", 22, W.biru), teks("a3", 160, 84, "3", 22, W.biru)),
      tambah("dengan", teks("ap", 54, 112, "+", 18, W.merah), teks("a5", 160, 112, "5", 22, W.biru), gs("gl", 46, 118, 196, 118, W.biru, 2)),
      sorotkan(idx(SUARA_B1, "satuan", 3), "tb-s", "a3", "a5"),
    ),
    k(
      SUARA_B2,
      hapus(0, "pn"),
      sorotkan(0, "tb-s"),
      tambah("ditambah", teks("nt", 252, 100, "3 + 5", 12, W.merah)),
      ubah("delapan,", { id: "nt", isi: "3 + 5 = 8" }),
      tambah("delapan,", teks("h8", 160, 142, "8", 22, "#15803D")),
      ubah("puluhannya", { id: "tb-s", sorot: false }, { id: "tb-p", sorot: true }, { id: "a1", sorot: true }),
      tambah(idx(SUARA_B2, "satu"), teks("h1", 80, 142, "1", 22, "#15803D")),
    ),
    k(
      SUARA_B3,
      hapus(0, "nt"),
      ubah(0, { id: "tb-p", sorot: false }, { id: "a1", sorot: false }),
      tambah("puluhan", teks("l1", 80, 162, "1 puluhan", 9, W.biru)),
      tambah("satuan,", teks("l8", 160, 162, "8 satuan", 9, W.merah)),
      tambah(idx(SUARA_B3, "delapan", 2), teks("hs", 252, 142, "18", 22, "#15803D")),
      tambah(idx(SUARA_B3, "tiga"), teks("t3", 252, 66, "3 cara", 12, W.ungu)),
      tambah("sama!", emo("ok", 252, 106, E.benar, 24)),
    ),
  ],
};

/* ------------------------------ 6. Baju olahraga (sepuluh satuan tidak muat) ------------------------------ */
const SUARA_O1 = "Kardus berikutnya berisi baju olahraga. Ada enam belas baju hijau dan empat baju kuning.";
const SUARA_O2 = "Gantungan panjang itu muat tepat dua puluh baju, dan Chacha ingin memastikan pas.";
const SUARA_O3 = "Satuannya enam ditambah empat sama dengan sepuluh, lalu Chacha menulis sepuluh di kotak satuan, tapi angkanya tidak muat!";

const xb = (i: number): number => 24 + 13.4 * i;

export const ADEGAN_BAJU_OLAHRAGA: AdeganStory = {
  id: "baju-olahraga",
  judul: "Baju olahraga dan gantungan panjang",
  sumber: "Materi: baju olahraga, sepuluh satuan tidak muat",
  latar: "#FEF9C3",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Baju Olahraga"), lantai("lt", 168), ...kardus("kd", 70, 80, 160, 70)),
      tambah("Kardus", ...tokoh("ch", 30, 178, "Chacha")),
      tambah("baju", baju("bh", 112, 114, WK.hijau, 16)),
      tambah("olahraga.", teks("bo", 150, 66, "baju olahraga", 10, W.ungu)),
      tambah("enam", teks("w16", 112, 142, "16", 16, "#15803D")),
      tambah("empat", baju("bk", 190, 114, WK.kuning, 16)),
      tambah("kuning.", teks("w4", 190, 142, "4", 16, "#B45309")),
    ),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Gantungan Panjang"), lantai("lt", 168), ...gantungan("gt", 14, 60, 272, 104)),
      tambah("muat", teks("m20", 150, 44, "muat", 11, W.ungu)),
      tambah("dua", teks("n20", 190, 44, "20", 16, W.merah)),
      tambah("baju,", ...Array.from({ length: 20 }, (_, i) => baju(`h${i}`, xb(i), 71, i < 16 ? WK.hijau : WK.kuning, 6))),
      tambah("Chacha", ...tokoh("ch", 30, 178, "Chacha")),
      tambah("pas.", emo("qm", 150, 130, E.tanya, 24)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Satuan Penuh"), lantai("lt", 168), ...kolomPS("tb", 50, 44, 80, 104), ...judulKolom("tb", 50, 44, 80, "p"), ...judulKolom("tb", 50, 44, 80, "s")),
      tambah("enam", teks("a1", 90, 84, "1", 22, W.biru), teks("a6", 170, 84, "6", 22, W.biru)),
      tambah("ditambah", teks("ap", 62, 112, "+", 18, W.merah), gs("gl", 56, 118, 206, 118, W.biru, 2)),
      tambah("empat", teks("a4", 170, 112, "4", 22, W.biru), teks("nt", 254, 100, "6 + 4", 12, W.merah)),
      ubah("sepuluh,", { id: "nt", isi: "6 + 4 = 10" }),
      tambah("Chacha", ...tokoh("ch", 30, 178, "Chacha")),
      tambah("menulis", emo("pn", 62, 164, "\u{270F}\u{FE0F}", 20)),
      tambah(idx(SUARA_O3, "sepuluh", 2), teks("h10", 170, 142, "10", 26, W.merah)),
      sorotkan("kotak", "tb-s"),
      ubah("angkanya", { id: "h10", u: 34 }),
      tambah("muat!", emo("xs", 232, 142, E.salah, 22), teks("tm", 254, 130, "tidak muat!", 9, W.merah)),
    ),
  ],
};
