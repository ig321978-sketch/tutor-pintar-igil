import type { AdeganStory, Obj } from "./logika-story";
import { E, W, emo, halaman, judul, kartu, kotak, panah, sepeda, tabel, teks, tokoh } from "./k3b5B-gambar";
import { bersih, hapus, k, pudarkan, redamkan, sorotkan, tambah } from "./k3b5B-bantu";

/*
 * Cerita orisinal IGIL "Tabel Bu Wulan" (Kelas 3 Bab 5 Sub-Bab B), video metode global.
 * Naskah suara dari naskah/story-naskah-k3b5b.md. Bagian ini: Table Fill (Isi Tabel) dan terapannya, Read and Ask (Baca dan Tanya) dan terapannya, dan ringkasan.
 */

const dariId = (objs: Obj[], ...ids: string[]) => objs.filter((o) => ids.includes(o.id));
const prefiks = (objs: Obj[], p: string) => objs.filter((o) => o.id.startsWith(p));
const KEP: [string, string, string] = ["jenis", "turus", "banyak"];
const kotakSaja = (objs: Obj[]) => objs.filter((o) => o.t === "kotak");

/* ------------------------------ Table Fill: konsep ------------------------------ */
const SUARA_I1 = "Cara kedua, Table Fill, atau Isi Tabel.";
const SUARA_I2 = "Kita siapkan tabel tiga kolom: jenis, turus, dan banyak.";
const SUARA_I3 = "Kita isi turus lebih dulu, lalu menyalin banyaknya sebagai angka.";
const SUARA_I4 = "Dengan begitu setiap jenis punya barisnya sendiri, dan tidak ada yang tercampur.";
const TI = tabel("ti", 40, 44, [64, 84, 56], 22, KEP, [["bel", { turus: 6 }, "6"], ["lampu", { turus: 9 }, "9"], ["pompa", { turus: 4 }, "4"]]);
const NAMA_TI = dariId(TI, "ti-t00", "ti-t10", "ti-t20");
const BANYAK_TI = dariId(TI, "ti-t02", "ti-t12", "ti-t22");
const TURUS_TI = prefiks(TI, "ti-u");

export const ADEGAN_LUAR_ISI: AdeganStory = {
  id: "luar-isi",
  judul: "Table Fill: Isi Tabel",
  sumber: "Metode global: Table Fill (konsep)",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_I1,
      tambah(0, judul("Cara 2: Table Fill"), ...halaman("hl", 150)),
      tambah("Table", emo("jr", 150, 104, "\u{1F4CB}", 36)),
      tambah("Isi", teks("nm", 150, 140, "Isi Tabel", 13, W.ungu)),
    ),
    k(
      SUARA_I2,
      hapus(0, "jr", "nm"),
      tambah("tabel", ...kotakSaja(TI)),
      tambah("tiga", teks("k3", 262, 40, "3 kolom", 9, W.merah)),
      tambah("jenis,", ...dariId(TI, "ti-ht0"), ...NAMA_TI),
      tambah("turus,", ...dariId(TI, "ti-ht1")),
      tambah("banyak.", ...dariId(TI, "ti-ht2")),
    ),
    k(
      SUARA_I3,
      tambah("turus", ...TURUS_TI),
      tambah("menyalin", ...[0, 1, 2].map((r) => panah(`pa${r}`, 172, 77 + r * 22, 20, 0, W.merah, 2, { z: 6 }))),
      tambah("angka.", ...BANYAK_TI),
    ),
    k(
      SUARA_I4,
      hapus(0, "pa0", "pa1", "pa2"),
      sorotkan("jenis", ...NAMA_TI.map((o) => o.id)),
      tambah("barisnya", kotak("o0", 40, 66, 204, 22, undefined, W.hijau, { tebal: 3, rx: 0, z: 5 })),
      tambah("sendiri,", kotak("o1", 40, 88, 204, 22, undefined, "#2563EB", { tebal: 3, rx: 0, z: 5 }), kotak("o2", 40, 110, 204, 22, undefined, W.ungu, { tebal: 3, rx: 0, z: 5 })),
      tambah("tercampur.", emo("ok", 266, 110, E.benar, 20)),
    ),
  ],
};

/* ------------------------------ Table Fill: terapan ------------------------------ */
const SUARA_J1 = "Bima mengisi tabel jenis sepeda: sepeda gunung, sepeda lipat, dan sepeda balap.";
const SUARA_J2 = "Ia mencatat turus di tiap baris, lalu menulis angka banyaknya.";
const SUARA_J3 = "Cocok untuk membandingkan banyak jenis sekaligus, dalam satu pandangan.";
const SUARA_J4 = "Kurang cocok kalau jenisnya terlalu banyak sehingga tabelnya sulit ditulis.";
const TJ = tabel("tj", 66, 44, [72, 80, 56], 22, KEP, [["sepeda gunung", { turus: 8 }, "8"], ["sepeda lipat", { turus: 12 }, "12"], ["sepeda balap", { turus: 5 }, "5"]]);
const BARIS_TAMBAH = [0, 1, 2, 3].map((i) => kotak(`tx${i}`, 66, 132 + i * 11, 208, 11, W.krem, W.biru, { rx: 0, tebal: 1, z: 1 }));

export const ADEGAN_LUAR_ISI_TERAPAN: AdeganStory = {
  id: "luar-isi-terapan",
  judul: "Table Fill: terapan",
  sumber: "Metode global: Table Fill (terapan)",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_J1,
      tambah(0, judul("Jenis Sepeda"), ...halaman("hl", 150), ...tokoh("bm", 36, 184, "Bima")),
      tambah("tabel", ...kotakSaja(TJ), ...dariId(TJ, "tj-ht0", "tj-ht1", "tj-ht2")),
      tambah("gunung,", ...dariId(TJ, "tj-t00")),
      tambah("lipat,", ...dariId(TJ, "tj-t10")),
      tambah("balap.", ...dariId(TJ, "tj-t20")),
    ),
    k(
      SUARA_J2,
      tambah("turus", ...prefiks(TJ, "tj-u")),
      sorotkan("baris,", "tj-r0c1", "tj-r1c1", "tj-r2c1"),
      tambah("angka", ...dariId(TJ, "tj-t02", "tj-t12", "tj-t22")),
    ),
    k(
      SUARA_J3,
      redamkan(0, "tj-r0c1", "tj-r1c1", "tj-r2c1"),
      sorotkan("membandingkan", "tj-r2c2"),
      tambah("satu", teks("pd", 170, 160, "1 pandangan", 10, W.ungu)),
      tambah("pandangan.", emo("mt", 232, 164, E.mata, 20)),
    ),
    k(
      SUARA_J4,
      hapus(0, "pd", "mt"),
      tambah("jenisnya", ...BARIS_TAMBAH),
      tambah("banyak", teks("tb", 170, 190, "terlalu banyak", 9, W.merah)),
      tambah("sulit", emo("ps", 36, 142, E.pusing, 20), emo("xs", 266, 150, E.salah, 20)),
    ),
  ],
};

/* ------------------------------ Read and Ask: konsep ------------------------------ */
const SUARA_R1 = "Cara ketiga, Read and Ask, atau Baca dan Tanya.";
const SUARA_R2 = "Setelah tabel jadi, kita ajukan pertanyaan pada tabel itu.";
const SUARA_R3 = "Misalnya mana yang terbanyak, mana yang tersedikit, dan mana yang lebih dari sebuah bilangan.";
const SUARA_R4 = "Jawabannya kita cari pada kolom banyak, bukan pada kolom turus.";
const TR = tabel("tq", 30, 40, [64, 84, 56], 22, KEP, [["bel", { turus: 9 }, "9"], ["lampu", { turus: 14 }, "14"], ["rem", { turus: 6 }, "6"]]);

export const ADEGAN_LUAR_BACA: AdeganStory = {
  id: "luar-baca",
  judul: "Read and Ask: Baca dan Tanya",
  sumber: "Metode global: Read and Ask (konsep)",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Cara 3: Read and Ask"), ...halaman("hl", 150)),
      tambah("Read", emo("jr", 150, 104, "\u{1F64B}", 36)),
      tambah("Baca", teks("nm", 150, 140, "Baca dan Tanya", 13, W.ungu)),
    ),
    k(
      SUARA_R2,
      hapus(0, "jr", "nm"),
      tambah("tabel", ...kotakSaja(TR), ...dariId(TR, "tq-ht0", "tq-ht1", "tq-ht2"), ...dariId(TR, "tq-t00", "tq-t10", "tq-t20")),
      tambah("jadi,", ...prefiks(TR, "tq-u"), ...dariId(TR, "tq-t02", "tq-t12", "tq-t22")),
      tambah("pertanyaan", emo("tn", 266, 70, E.tanya, 26)),
      tambah("tabel@2", kotak("ot", 30, 40, 204, 88, undefined, W.ungu, { tebal: 2.6, rx: 0, z: 5 })),
    ),
    k(
      SUARA_R3,
      hapus(0, "ot", "tn"),
      tambah("terbanyak,", kotak("o1", 30, 84, 204, 22, undefined, W.hijau, { tebal: 3, rx: 0, z: 5 }), teks("lt", 266, 99, "terbanyak", 7, W.hijauTua)),
      tambah("tersedikit,", kotak("o2", 30, 106, 204, 22, undefined, W.merah, { tebal: 3, rx: 0, z: 5 }), teks("ls", 266, 121, "tersedikit", 7, W.merah)),
      tambah("lebih", teks("lm", 266, 77, "lebih dari ?", 7, W.ungu)),
      tambah("bilangan.", teks("tq2", 150, 160, "?", 22, W.tanya)),
    ),
    k(
      SUARA_R4,
      hapus(0, "o1", "o2", "lt", "ls", "lm", "tq2"),
      tambah("banyak,", kotak("kb", 178, 40, 56, 88, undefined, W.hijau, { tebal: 3, rx: 0, z: 5 })),
      tambah("bukan", emo("xs", 266, 84, E.salah, 20)),
      tambah("turus.", kotak("kt", 94, 40, 84, 88, undefined, W.merah, { tebal: 3, rx: 0, z: 5 })),
    ),
  ],
};

/* ------------------------------ Read and Ask: terapan ------------------------------ */
const SUARA_T1 = "Raka bertanya pada tabel: jenis apa yang paling sedikit, dan berapa banyaknya?";
const SUARA_T2 = "Ia membaca kolom banyak dan menemukan jawabannya pada baris terkecil.";
const SUARA_T3 = "Cocok untuk mengambil keputusan dari data.";
const SUARA_T4 = "Kurang cocok kalau pertanyaannya tidak ada hubungannya dengan isi tabel.";
const TT = tabel("tt", 70, 40, [64, 80, 56], 22, KEP, [["lampu", { turus: 8 }, "8"], ["bel", { turus: 12 }, "12"], ["rem", { turus: 5 }, "5"]]);

export const ADEGAN_LUAR_BACA_TERAPAN: AdeganStory = {
  id: "luar-baca-terapan",
  judul: "Read and Ask: terapan",
  sumber: "Metode global: Read and Ask (terapan)",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Tanya pada Tabel"), ...halaman("hl", 150), ...tokoh("rk", 30, 184, "Raka")),
      tambah("bertanya", emo("tn", 30, 144, E.tanya, 20)),
      tambah("tabel:", ...kotakSaja(TT), ...dariId(TT, "tt-ht0", "tt-ht1", "tt-ht2"), ...dariId(TT, "tt-t00", "tt-t10", "tt-t20"), ...prefiks(TT, "tt-u"), ...dariId(TT, "tt-t02", "tt-t12", "tt-t22")),
      tambah("sedikit,", emo("sd", 166, 150, E.lupa, 20)),
      tambah("banyaknya?", teks("qb", 242, 34, "?", 14, W.merah)),
    ),
    k(
      SUARA_T2,
      hapus(0, "sd", "qb"),
      tambah("kolom", kotak("kb", 214, 40, 56, 88, undefined, W.hijau, { tebal: 3, rx: 0, z: 5 })),
      tambah("menemukan", emo("sp", 150, 150, E.lupa, 20)),
      tambah("baris", kotak("br", 70, 106, 200, 22, undefined, W.hijau, { tebal: 3, rx: 0, z: 5 })),
      tambah("terkecil.", emo("ok", 266, 150, E.benar, 20)),
    ),
    k(
      SUARA_T3,
      hapus(0, "kb", "br", "sp", "tn"),
      tambah("Cocok", emo("ok2", 236, 150, E.benar, 20)),
      tambah("mengambil", emo("pk", 150, 152, E.perkakas, 20)),
      tambah("keputusan", teks("kp", 150, 176, "perbaiki rem", 10, W.hijauTua)),
      sorotkan("data.", "tt-r2c0", "tt-r2c2"),
    ),
    k(
      SUARA_T4,
      hapus(0, "ok", "ok2", "pk", "kp"),
      tambah("Kurang", emo("xs", 266, 150, E.salah, 20)),
      tambah("pertanyaannya", ...kartu("hg", 110, 134, 90, 22, "#FCE7F3", ["harga rem?"], 9)),
      tambah("hubungannya", panah("pq", 155, 134, 0, -22, W.merah, 2, { putus: true, z: 6 })),
      pudarkan("tabel.", "tt-h0", "tt-h1", "tt-h2"),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_S1 = "Tiga cara sudah kita lihat. Mana yang pas tergantung keadaan.";
const SUARA_S2 = "Ingin menghitung cepat, pakai Turus Berlima. Ingin menyusun data rapi, pakai Isi Tabel.";
const SUARA_S3 = "Ingin mengambil kesimpulan, pakai Baca dan Tanya. Apa pun caranya, periksa tabelnya dengan teliti.";
const SUARA_S4 = "Menurutmu, untuk menyajikan data kerusakan sepeda klub, cara mana yang paling pas?";
const KARTU_RINGKAS = ["#FEF3C7", "#DCFCE7", "#DBEAFE"];
const NAMA_RINGKAS: [string, string][] = [["Turus", "Berlima"], ["Isi", "Tabel"], ["Baca dan", "Tanya"]];
const RK = [0, 1, 2].flatMap((i) => kartu(`r${i}`, 18 + i * 94, 60, 88, 50, KARTU_RINGKAS[i], NAMA_RINGKAS[i], 9));
const RK_KECIL = [0, 1, 2].flatMap((i) => kartu(`r${i}`, 18 + i * 94, 146, 88, 40, KARTU_RINGKAS[i], NAMA_RINGKAS[i], 9));

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Ringkasan: tiga cara menyajikan data",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Tiga Cara"), teks("n3", 150, 40, "3 cara", 12, W.ungu)),
      tambah("lihat.", ...RK),
      tambah("Mana", emo("tq", 150, 150, E.tanya, 30)),
    ),
    k(
      SUARA_S2,
      hapus(0, "tq"),
      sorotkan("Turus", "r0-k"),
      tambah("cepat,", emo("cp", 62, 134, "⚡", 20)),
      redamkan("Isi", "r0-k"),
      sorotkan("Isi", "r1-k"),
      tambah("rapi,", emo("rp", 156, 134, E.benar, 20)),
    ),
    k(
      SUARA_S3,
      redamkan(0, "r1-k"),
      sorotkan("Baca", "r2-k"),
      tambah("periksa", emo("ls", 250, 134, E.lupa, 20)),
      tambah("teliti.", emo("ok", 150, 168, E.benar, 20)),
    ),
    k(
      SUARA_S4,
      bersih(0),
      tambah(0, judul("Cara Mana?"), ...RK_KECIL),
      tambah("data", ...kartu("tk", 20, 44, 120, 28, "#FDE68A", ["tabel kerusakan"], 9)),
      tambah("sepeda", ...sepeda("sp", 230, 100, 1.3)),
      tambah("klub,", emo("hm", 266, 60, E.helm, 22)),
      tambah("pas?", emo("qs", 150, 112, E.tanya, 30)),
    ),
  ],
};
