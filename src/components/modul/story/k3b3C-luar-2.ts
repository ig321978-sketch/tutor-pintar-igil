import type { AdeganStory } from "./logika-story";
import { E, W, bulat, emo, idTimbDigital, judul, karung, kartu, kotak, lantai, putarJarum, teks, timbDigital, timbDuduk, tokoh, panah } from "./k3b3C-gambar";
import { hapus, k, pudarkan, redamkan, sorotkan, tambah, ubah } from "./k3b3C-bantu";

/*
 * Cerita orisinal IGIL "Pakan Bu Lastri" (Kelas 3 Bab 3 Sub-Bab C), video metode global.
 * Naskah suara dari naskah/story-naskah-k3b3c.md. Bagian ini: Benchmark Weights (Berat Acuan), Zero Check (Cek Angka Nol), dan ringkasan.
 */

/* ------------------------------ Benchmark Weights (Berat Acuan): konsep ------------------------------ */
const SUARA_A1 = "Cara kedua, Benchmark Weights, atau Berat Acuan.";
const SUARA_A2 = "Kita hafalkan berat benda yang sudah dikenal: satu kantong gula beratnya satu kilogram.";
const SUARA_A3 = "Sebutir telur kira-kira lima puluh gram.";
const SUARA_A4 = "Dengan acuan, berat benda lain bisa diperkirakan sebelum ditimbang.";

export const ADEGAN_LUAR_ACUAN: AdeganStory = {
  id: "luar-acuan",
  judul: "Benchmark Weights: Berat Acuan",
  sumber: "Metode global: Benchmark Weights (konsep)",
  latar: "#E0F2FE",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Cara Kedua"), ...lantai("lt", 150), teks("nm", 150, 50, "Benchmark Weights", 14, W.biru)),
      tambah("Benchmark", kotak("kt", 124, 96, 52, 40, "#FDE68A", W.biru, { rx: 6 }), emo("gl", 150, 126, E.gula, 24)),
      tambah("Berat", teks("nm2", 150, 76, "Berat Acuan", 9, W.ungu)),
    ),
    k(
      SUARA_A2,
      hapus(0, "nm2"),
      tambah("kantong", teks("l1", 150, 88, "1 kantong gula", 9, W.coklat)),
      tambah("beratnya", panah("pa", 150, 142, 0, 10, W.merah, 2.4)),
      tambah("kilogram.", teks("l2", 150, 168, "1 kg", 14, W.hijauTua)),
    ),
    k(
      SUARA_A3,
      tambah("telur", emo("te", 224, 118, E.telur, 30)),
      tambah("lima", teks("t50", 224, 140, "50 g", 14, W.biru)),
      sorotkan("gram.", "t50"),
    ),
    k(
      SUARA_A4,
      sorotkan("acuan,", "kt"),
      tambah("benda", ...karung("kr", 40, 100, 30, 38)),
      tambah("diperkirakan", emo("tq", 55, 90, E.tanya, 20)),
      tambah("ditimbang.", panah("pk", 76, 122, 36, 0, W.merah, 2.4)),
    ),
  ],
};

/* ------------------------------ Benchmark Weights: terapan ------------------------------ */
const SUARA_AT1 = "Bima membandingkan sekarung pakan dengan sepuluh kantong gula.";
const SUARA_AT2 = "Karena sepuluh kantong gula beratnya sepuluh kilogram, karung itu kira-kira sepuluh kilogram.";
const SUARA_AT3 = "Lalu ia menimbangnya, dan hasilnya sebelas kilogram, hampir sama.";
const SUARA_AT4 = "Cocok kalau tidak ada timbangan, tetapi kurang cocok kalau butuh berat yang pas.";

const kantongGula = (): ReturnType<typeof kotak>[] => Array.from({ length: 10 }, (_, i) => kotak(`gk${i}`, 160 + (i % 5) * 16, 78 + Math.floor(i / 5) * 18, 14, 14, "#FDE68A", W.coklat, { rx: 3, tebal: 1 }));

export const ADEGAN_LUAR_ACUAN_TERAPAN: AdeganStory = {
  id: "luar-acuan-terapan",
  judul: "Benchmark Weights: karung dan gula",
  sumber: "Metode global: Benchmark Weights (terapan)",
  latar: "#DBEAFE",
  ketukan: [
    k(
      SUARA_AT1,
      tambah(0, judul("Karung dan Gula"), ...lantai("lt", 150), ...tokoh("bm", 150, 184, "Bima")),
      tambah("sekarung", ...karung("kr", 40, 104, 40, 46)),
      tambah("sepuluh", teks("n10", 200, 62, "10 kantong", 10, W.ungu)),
      tambah("kantong", ...kantongGula()),
    ),
    k(
      SUARA_AT2,
      tambah("beratnya", teks("k10", 200, 126, "10 kg", 12, W.biru)),
      tambah("karung", teks("kk", 60, 62, "sekitar 10 kg", 9, W.coklat)),
      sorotkan("kira", "kr"),
    ),
    k(
      SUARA_AT3,
      tambah("menimbangnya,", ...timbDigital("dg", 30, 66, "0", 58)),
      ubah("sebelas", { id: "dg-t", isi: "11 kg" }),
      tambah("sama.", emo("ok", 112, 100, E.benar, 22)),
    ),
    k(
      SUARA_AT4,
      pudarkan("tidak", ...idTimbDigital("dg")),
      tambah("kurang", emo("xs", 60, 98, E.salah, 20)),
      tambah("pas.", teks("bd", 190, 140, "11 kg, bukan 10 kg", 9, W.merah)),
    ),
  ],
};

/* ------------------------------ Zero Check (Cek Angka Nol): konsep ------------------------------ */
const SUARA_Z1 = "Cara ketiga, Zero Check, atau Cek Angka Nol.";
const SUARA_Z2 = "Sebelum menimbang, lihat dulu jarum atau layar: harus tepat di angka nol.";
const SUARA_Z3 = "Kalau belum nol, setel dulu dengan tombolnya.";
const SUARA_Z4 = "Baru benda diletakkan dan angkanya dibaca dengan teliti.";

export const ADEGAN_LUAR_CEK_NOL: AdeganStory = {
  id: "luar-cek-nol",
  judul: "Zero Check: Cek Angka Nol",
  sumber: "Metode global: Zero Check (konsep)",
  latar: "#DCFCE7",
  ketukan: [
    k(
      SUARA_Z1,
      tambah(0, judul("Cara Ketiga"), ...lantai("lt", 150), teks("nm", 150, 50, "Zero Check", 16, W.biru)),
      tambah("Zero", ...timbDuduk("td", 150, 104, 26, 1)),
      tambah("Cek", teks("nm2", 150, 63, "Cek Angka Nol", 9, W.ungu)),
      sorotkan("Nol.", "td-l0"),
    ),
    k(
      SUARA_Z2,
      sorotkan("jarum", "td-j"),
      tambah("layar:", ...timbDigital("dg", 212, 86, "0", 54)),
      sorotkan("nol.", "td-l0", "dg-t"),
    ),
    k(
      SUARA_Z3,
      ubah("belum", putarJarum("td", 26, 1)),
      tambah("setel", bulat("kn", 182, 124, 6, "#F59E0B", W.biru)),
      sorotkan("setel", "kn"),
      ubah("dulu", putarJarum("td", 26, 0)),
    ),
    k(
      SUARA_Z4,
      hapus(0, "nm", "nm2"),
      tambah("benda", ...karung("kr", 136, 36, 28, 30)),
      tambah("angkanya", teks("rd", 150, 156, "jarum: 4", 10, W.hijauTua)),
      ubah("angkanya", putarJarum("td", 26, 4)),
      tambah("teliti.", emo("ok", 250, 150, E.benar, 22)),
    ),
  ],
};

/* ------------------------------ Zero Check: terapan ------------------------------ */
const SUARA_ZT1 = "Salsa memeriksa timbangan digital, dan layarnya menunjukkan sepuluh gram.";
const SUARA_ZT2 = "Ia menekan tombol nol sampai layar menunjukkan nol.";
const SUARA_ZT3 = "Lalu ia menimbang pakan dan mendapat seratus lima puluh gram.";
const SUARA_ZT4 = "Cocok untuk semua timbangan, tetapi kurang praktis kalau timbangannya tidak punya tombol penyetel.";

export const ADEGAN_LUAR_CEK_NOL_TERAPAN: AdeganStory = {
  id: "luar-cek-nol-terapan",
  judul: "Zero Check: layar digital",
  sumber: "Metode global: Zero Check (terapan)",
  latar: "#FEF9C3",
  ketukan: [
    k(
      SUARA_ZT1,
      tambah(0, judul("Layar Belum Nol", W.merah), ...lantai("lt", 150), ...tokoh("sl", 60, 184, "Salsa")),
      tambah("timbangan", ...timbDigital("dg", 120, 96, "0", 72)),
      sorotkan("layarnya", "dg-s"),
      ubah("sepuluh", { id: "dg-t", isi: "10 g" }),
    ),
    k(
      SUARA_ZT2,
      sorotkan("menekan", "dg-s"),
      tambah("tombol", kotak("tb", 206, 104, 22, 14, "#F59E0B", W.biru, { rx: 4 }), teks("tbt", 217, 115, "0", 8, W.biru)),
      ubah("nol@2", { id: "dg-t", isi: "0" }),
    ),
    k(
      SUARA_ZT3,
      tambah("pakan", emo("pk", 156, 92, E.mangkuk, 22)),
      ubah("seratus", { id: "dg-t", isi: "150 g" }),
    ),
    k(
      SUARA_ZT4,
      tambah("semua", emo("ok", 262, 60, E.benar, 24)),
      hapus("tidak", "tb", "tbt"),
      tambah("punya", emo("tq", 230, 104, E.tanya, 24)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_R1 = "Tiga cara sudah kita lihat. Mana yang pas tergantung keadaan.";
const SUARA_R2 = "Ingin memperkirakan cepat, pakai Mengangkat dan Merasakan. Tidak ada timbangan, pakai Berat Acuan.";
const SUARA_R3 = "Ingin hasil yang pas, selalu pakai Cek Angka Nol. Apa pun caranya, hasilnya ditulis dengan gram atau kilogram.";
const SUARA_R4 = "Menurutmu, untuk timbangan yang jarumnya belum di nol, cara mana yang harus dipakai lebih dulu?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Ringkasan: tiga cara",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Tiga Cara"), ...lantai("lt", 150), teks("n3", 150, 40, "3 cara", 10, W.ungu), ...kartu("r0", 12, 52, 88, 46, "#BBF7D0", ["Mengangkat dan", "Merasakan"], 8.5)),
      tambah("sudah", ...kartu("r1", 106, 52, 88, 46, "#FDE68A", ["Berat", "Acuan"], 8.5)),
      tambah("lihat.", ...kartu("r2", 200, 52, 88, 46, "#BFDBFE", ["Cek", "Angka Nol"], 8.5), teks("z0", 275, 64, "0", 10, W.merah)),
      tambah("tergantung", emo("tq", 150, 140, E.tanya, 24)),
    ),
    k(
      SUARA_R2,
      sorotkan("memperkirakan", "r0-k"),
      tambah("Mengangkat", emo("tn", 56, 134, E.tangan, 26)),
      redamkan("Tidak", "r0-k"),
      sorotkan("Tidak", "r1-k"),
      tambah("Acuan.", emo("gl", 150, 168, E.gula, 22)),
    ),
    k(
      SUARA_R3,
      redamkan("Ingin", "r1-k"),
      sorotkan("Cek", "r2-k"),
      tambah("Nol.", emo("ok", 244, 134, E.benar, 24)),
      tambah("ditulis", teks("sg", 100, 188, "g", 14, W.biru)),
      tambah("kilogram.", teks("kg", 200, 188, "kg", 14, W.biru)),
    ),
    k(
      SUARA_R4,
      hapus(0, "r0-k", "r0-t0", "r0-t1", "r1-k", "r1-t0", "r1-t1", "r2-k", "r2-t0", "r2-t1", "n3", "z0", "tq", "tn", "gl", "ok", "sg", "kg"),
      tambah("timbangan", ...timbDuduk("td", 150, 100, 24, 1)),
      tambah("belum", teks("n1", 150, 152, "jarum: 1", 10, W.merah)),
      sorotkan("nol,", "td-l0"),
      tambah("mana", emo("tq2", 232, 100, E.tanya, 30)),
    ),
  ],
};
