import type { AdeganStory, Obj } from "./logika-story";
import { E, W, barisBintang, emo, idBaris, judul, kartu, konfeti, kursi, kotak, mikrofon, panah, panggungDepan, papanLayar, spanduk, teks, tokoh, garis } from "./k2b8B-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k2b8B-bantu";
import { diagramLengkap } from "./k2b8B-materi-2";
import { WARNA_SEL } from "./k2b8B-materi-1";

/*
 * Cerita orisinal IGIL "Bintang Bu Maya" (Kelas 2 Bab 8 Sub-Bab B), akhir cerita Pentas Seni Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b8b.md. Bagian ini: jumlah dua baris dan semua baris, presentasi data, dan penutup (taruhan, tirai terbuka, spanduk).
 */

/* ------------------------------ 7. Jumlah ------------------------------ */
const SUARA_G1 = "Bu Maya bertanya, berapa jumlah selendang hijau dan biru?";
const SUARA_G2 = "Gabungkan dua baris: tiga ditambah lima sama dengan delapan.";
const SUARA_G3 = "Semua selendang: tujuh ditambah lima ditambah tiga ditambah lima sama dengan dua puluh. Diagram membantu kita menjawab banyak pertanyaan.";

export const ADEGAN_JUMLAH: AdeganStory = {
  id: "jumlah",
  judul: "Jumlah dua baris dan semua baris",
  sumber: "Materi: jumlah dua jenis dan semua jenis",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_G1,
      bersih(0),
      tambah(0, judul("Berapa Jumlahnya?"), ...panggungDepan("dn"), ...diagramLengkap({ jumlah: true })),
      tambah("Maya", ...tokoh("bm", 40, 175, "Bu Maya", 22)),
      tambah("berapa", emo("tz", 76, 150, E.tanya, 20)),
      sorotkan("hijau", "nm2", "b20", "b21", "b22"),
      sorotkan("biru?", "nm3"),
    ),
    k(
      SUARA_G2,
      hapus(0, "tz"),
      tambah("dua", teks("d2", 150, 152, "2 baris", 8, W.ungu, { z: 2 })),
      tambah("Gabungkan", panah("pa", 150, 124, 0, 20, W.ungu, 2.4)),
      tambah("tiga", ...barisBintang("gh", 96, 158, 3, WARNA_SEL[2])),
      tambah("lima", ...barisBintang("gb", 141, 158, 5, WARNA_SEL[3])),
      tambah("delapan.", teks("pj", 244, 162, "3 + 5 = 8", 12, W.ungu, { z: 2 })),
    ),
    k(
      SUARA_G3,
      hapus(0, "pa", ...idBaris("gh", 3), ...idBaris("gb", 5), "pj", "d2"),
      tambah("tujuh", teks("eq", 150, 162, "7", 12, W.ungu, { z: 2 })),
      ubah("lima", { id: "eq", isi: "7 + 5" }),
      ubah("tiga", { id: "eq", isi: "7 + 5 + 3" }),
      ubah("lima@2", { id: "eq", isi: "7 + 5 + 3 + 5" }),
      ubah("dua", { id: "eq", isi: "7 + 5 + 3 + 5 = 20" }),
      tambah("puluh.", teks("tt", 262, 112, "20", 20, W.hijau, { z: 2 })),
      tambah("pertanyaan.", emo("lp", 262, 140, E.lampu, 20)),
    ),
  ],
};

/* ------------------------------ 8. Presentasi ------------------------------ */
const SUARA_H1 = "Hari pentas tiba, dan Bu Sari meminta Chacha menyajikan data di depan penonton.";
const SUARA_H2 = "Chacha menyebut judul, selendang yang paling banyak dan paling sedikit, lalu lebihnya dan kurangnya.";
const SUARA_H3 = "Suaranya jelas dan percaya diri. Penonton bertepuk tangan!";

const KURSI_X = [24, 76, 128, 180, 232];
const kursiBaris = (): Obj[] => KURSI_X.flatMap((x, i) => kursi(`ks${i}`, x, 128));
const idKursiBaris = (): string[] => KURSI_X.flatMap((_, i) => [`ks${i}`, `ks${i}-s`]);
const papanMini = (): Obj[] => [
  ...papanLayar("pl", 70, 34, 160, 62, 1, 4),
  ...[7, 5, 3, 5].flatMap((n, i) => barisBintang(`m${i}`, 84, 44 + i * 14, n, WARNA_SEL[i], 3.6, 9)),
];

export const ADEGAN_PRESENTASI: AdeganStory = {
  id: "presentasi",
  judul: "Chacha menyajikan data",
  sumber: "Materi: menyajikan dan mempresentasikan data",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_H1,
      bersih(0),
      tambah(0, judul("Hari Pentas"), ...panggungDepan("dn"), ...papanMini()),
      tambah("Sari", ...tokoh("bs", 246, 172, "Bu Sari")),
      tambah("Chacha", ...tokoh("ch", 110, 172, "Chacha")),
      tambah("menyajikan", ...mikrofon("mk", 150, 170, 30)),
      tambah("penonton.", ...kursiBaris(), emo("p0", 40, 120, E.senyum, 16), emo("p1", 144, 120, E.senyum, 16), emo("p2", 248, 120, E.senyum, 16)),
    ),
    k(
      SUARA_H2,
      hapus(0, ...idKursiBaris(), "p0", "p1", "p2"),
      tambah("judul,", ...kartu("c0", 14, 106, 56, 18, W.krem, ["judul"], 8)),
      tambah("banyak", ...kartu("c1", 74, 106, 72, 18, W.hijauMuda, ["paling banyak"], 8)),
      tambah("sedikit,", ...kartu("c2", 150, 106, 72, 18, W.merahMuda, ["paling sedikit"], 8)),
      tambah("lebihnya", ...kartu("c3", 226, 106, 62, 18, W.lavender, ["lebih, kurang"], 8)),
    ),
    k(
      SUARA_H3,
      hapus(0, "c0-k", "c0-t0", "c1-k", "c1-t0", "c2-k", "c2-t0", "c3-k", "c3-t0"),
      tambah("jelas", emo("kl", 180, 140, E.kilau, 18)),
      tambah("Penonton", ...kursiBaris(), emo("p0", 40, 120, E.senyum, 16), emo("p1", 144, 120, E.senyum, 16), emo("p2", 248, 120, E.senyum, 16)),
      tambah("bertepuk", emo("t0", 72, 112, E.tepuk, 18), emo("t1", 176, 112, E.tepuk, 18), emo("t2", 280, 112, E.tepuk, 18)),
      tambah("tangan!", emo("sr", 210, 140, E.sorak, 20)),
    ),
  ],
};

/* ------------------------------ 9. Penutup ------------------------------ */
const SUARA_N1 = "Chacha menepati taruhannya dan menyapu seluruh panggung sambil bersenandung.";
const SUARA_N2 = "Tirai merah terbuka lebar, dan Pentas Seni Sekolah pun dimulai. Penonton bersorak!";
const SUARA_N3 = "Menurutmu, data apa di sekitarmu yang bisa dibuat diagram gambar? Terima kasih, Chacha, Dika, Nia, Bu Sari, dan Bu Maya!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Taruhan, tirai terbuka, dan spanduk",
  sumber: "Materi: penutup dan perayaan pentas",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_N1,
      bersih(0),
      tambah(0, judul("Taruhan Chacha"), ...panggungDepan("dn")),
      tambah("Chacha", ...tokoh("ch", 150, 172, "Chacha")),
      tambah("menepati", emo("ok", 190, 140, E.benar, 20)),
      tambah("menyapu", emo("sp", 106, 166, E.sapu, 26), emo("db", 74, 168, E.debu, 18)),
      tambah("seluruh", garis("jl", 30, 160, 240, 0, W.coklat, 1.4, { z: 1, op: 0.6 })),
      tambah("bersenandung.", emo("n1", 200, 112, E.not, 20), emo("n2", 230, 100, E.not, 16)),
    ),
    k(
      SUARA_N2,
      bersih(0),
      tambah(0, ...panggungDepan("dn"), kotak("tk2", 14, 12, 136, 156, W.tirai, W.tiraiTua, { rx: 3, tebal: 1.4, z: 0 }), kotak("tr2", 150, 12, 136, 156, W.tirai, W.tiraiTua, { rx: 3, tebal: 1.4, z: 0 })),
      tambah("Tirai", garis("lt", 82, 14, 0, 150, W.tiraiTua, 1.2, { z: 1 }), garis("lr", 218, 14, 0, 150, W.tiraiTua, 1.2, { z: 1 })),
      ubah("terbuka", { id: "tk2", w: 36 }, { id: "tr2", x: 250, w: 36 }, { id: "lt", x: 30 }, { id: "lr", x: 266 }),
      tambah("lebar,", emo("lp", 150, 60, E.lampu, 22), kotak("pt", 90, 112, 120, 40, "#FEF3C7", "#F59E0B", { rx: 6, tebal: 1.2, z: 1, op: 0.6 })),
      tambah("dimulai.", emo("b1", 60, 80, E.balon, 24), emo("b2", 240, 80, E.balon, 24)),
      tambah("bersorak!", emo("t0", 110, 140, E.tepuk, 22), emo("t1", 190, 140, E.tepuk, 22), emo("sr", 150, 100, E.sorak, 24)),
    ),
    k(
      SUARA_N3,
      bersih(0),
      tambah(0, ...panggungDepan("dn")),
      tambah("Menurutmu,", ...spanduk("sp", 30, 22, 240, "PENTAS SENI MERIAH", 12)),
      tambah("data", emo("pk", 150, 84, E.pikir, 24)),
      tambah("gambar?", teks("qq", 150, 112, "diagram gambar?", 10, W.hijau, { z: 2 })),
      tambah("Chacha,", ...tokoh("ch", 40, 172, "Chacha")),
      tambah("Dika,", ...tokoh("dk", 94, 172, "Dika")),
      tambah("Nia,", ...tokoh("ni", 148, 172, "Nia")),
      tambah("Sari,", ...tokoh("bs", 202, 172, "Bu Sari")),
      tambah("Maya!", ...tokoh("bm", 262, 172, "Bu Maya"), emo("lb", 262, 138, E.lambai, 20), ...konfeti("kf", 56, 10), emo("b1", 36, 90, E.balon, 22), emo("b2", 266, 90, E.balon, 22)),
    ),
  ],
};
