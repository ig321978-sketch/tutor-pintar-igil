import type { AdeganStory, Obj } from "./logika-story";
import { E, W, bengkel, deretSatuan, emo, garis, judul, kartu, orang, sedotan, sisi, teks } from "./k1b7B-gambar";
import { bersih, hapus, hitungUnit, idx, k, tambah, ubah } from "./k1b7B-bantu";

/* Video metode global Sub-Bab B "Papan Lantai Rumah Pohon": pembuka dan Unit Iteration (Mengulang Satuan). */

export const NAMA_METODE = ["Unit Iteration", "Estimate and Check", "Grid Measuring"];
export const NAMA_METODE_ID = ["Mengulang Satuan", "Kira-Kira lalu Periksa", "Ukur di Kotak-Kotak"];
export const WARNA_METODE = [W.hijauMuda, W.krem, W.pink];
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka ------------------------------ */
const SUARA_O1 = "Kakek Jaya menggantung selembar poster di bengkelnya. Isinya tiga cara mengukur untuk para tukang.";
const SUARA_O2 = "Igil bertanya, cara mana yang paling cepat untuk lantai kita?";
const SUARA_O3 = "Tiga cara itu: Unit Iteration, Estimate and Check, dan Grid Measuring.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Mengulang Satuan, Kira-Kira lalu Periksa, dan Ukur di Kotak-Kotak.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode global untuk mengukur panjang",
  sumber: "Metode global: pembuka",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Tiga cara mengukur")),
      tambah("Kakek", ...orang("kj", 252, 110, E.kakek, "Kakek Jaya")),
      tambah("poster", ...kartu("pos", 56, 76, 96, 50, W.krem, ["poster", "cara mengukur"], 9.4)),
      tambah("bengkelnya.", ...bengkel("bk", 30, 64, 150, 100)),
      ubah("tiga", { id: "pos-t1", isi: "3 cara mengukur" }),
      tambah("tukang.", emo("tg", 214, 74, E.tukang, 24), emo("pl", 208, 150, E.palu, 20)),
    ),
    k(
      SUARA_O2,
      tambah("Igil", ...orang("ig", 40, 176, E.igil, "Igil")),
      tambah("cepat", emo("tn", 150, 176, E.tanya, 28)),
      tambah("lantai", ...sisi("sd", 70, 140, 180, 12)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("3 metode global")),
      ...NAMA_METODE.map((m, i) => tambah(idx(SUARA_O3, ["Unit", "Estimate", "Grid"][i]), ...kartu(`m${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Nama dalam bahasa Indonesia")),
      ...NAMA_METODE_ID.map((m, i) => tambah(idx(SUARA_O4, ["Mengulang", "Kira-Kira", "Ukur"][i]), ...kartu(`n${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
    ),
  ],
};

/* ------------------------------ 2. Unit Iteration: konsep ------------------------------ */
const SUARA_A1 = "Cara pertama, Unit Iteration, atau Mengulang Satuan.";
const SUARA_A2 = "Pilih satu satuan, misalnya sepotong sedotan. Letakkan berulang dari ujung sampai ujung.";
const SUARA_A3 = "Rapat, tanpa celah, tanpa tumpukan, dan tidak miring.";
const SUARA_A4 = "Banyaknya satuan adalah panjang benda itu.";

export const ADEGAN_LUAR_ULANG: AdeganStory = {
  id: "luar-ulang",
  judul: "Unit Iteration: mengulang satuan",
  sumber: "Metode global: Unit Iteration",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_A1,
      tambah("pertama,", ...kepala(0)),
      tambah("Iteration,", ...sedotan("s0", 130, 90, 40)),
      tambah("Mengulang", teks("ls", 150, 126, "1 satuan", 11, W.merah)),
    ),
    k(
      SUARA_A2,
      hapus(0, "s0", "s0-r", "ls"),
      tambah("sepotong", ...sedotan("sx", 30, 150, 40)),
      tambah("Letakkan", ...sisi("sd", 30, 90, 240)),
      tambah("berulang", ...deretSatuan(sedotan, "s", 3, 30, 90, 40)),
      tambah("ujung@2", ...deretSatuan(sedotan, "s", 6, 30, 90, 40), teks("ud", 150, 126, "dari ujung sampai ujung", 8.6, W.biru)),
    ),
    k(
      SUARA_A3,
      hapus(0, "ud", "sx", "sx-r"),
      tambah("Rapat,", ...kartu("c0", 20, 126, 128, 22, W.hijauMuda, ["rapat"], 9)),
      tambah("celah,", ...kartu("c1", 152, 126, 128, 22, W.hijauMuda, ["tanpa celah"], 9)),
      tambah("tumpukan,", ...kartu("c2", 20, 156, 128, 22, W.langit, ["tanpa tumpukan"], 9)),
      tambah("miring.", ...kartu("c3", 152, 156, 128, 22, W.langit, ["tidak miring"], 9)),
    ),
    k(
      SUARA_A4,
      hapus(0, "c0-k", "c0-t0", "c1-k", "c1-t0", "c2-k", "c2-t0", "c3-k", "c3-t0"),
      tambah("Banyaknya", teks("n6", 150, 78, "6 satuan", 12, W.merah)),
      tambah("panjang", ...kartu("bn", 50, 140, 200, 28, W.krem, ["banyak satuan: panjang benda"], 9.4)),
    ),
  ],
};

/* ------------------------------ 3. Unit Iteration: terapan pada tali pegangan ------------------------------ */
const SUARA_B1 = "Abang mengukur tali pegangan dengan potongan sedotan yang sama. Satu, dua, tiga, empat, lima, enam, tujuh sedotan.";
const SUARA_B2 = "Panjang tali pegangan adalah tujuh sedotan.";
const SUARA_B3 = "Cocok untuk benda lurus yang tidak terlalu panjang.";
const SUARA_B4 = "Kurang cocok untuk benda sangat panjang, karena lama dan mudah salah hitung.";

export const ADEGAN_LUAR_ULANG_TERAPAN: AdeganStory = {
  id: "luar-ulang-terapan",
  judul: "Unit Iteration: tali pegangan diukur sedotan",
  sumber: "Metode global: Unit Iteration, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, ...kepala(0)),
      tambah("Abang", ...orang("ab", 262, 150, E.abang, "Abang")),
      tambah("tali", garis("tl", 30, 100, 238, 0, W.coklat, 4, { gambar: true }), teks("lt", 80, 74, "tali pegangan", 9.4, W.coklat)),
      ...hitungUnit(SUARA_B1, sedotan, "s", 7, 30, 100, 34, { setelah: "sama.", u: 9 }),
      tambah("sedotan.@2", teks("hs", 150, 150, "7 sedotan", 14, W.merah)),
    ),
    k(
      SUARA_B2,
      tambah("Panjang", ...kartu("pj", 50, 164, 200, 26, W.krem, ["tali pegangan: 7 sedotan"], 10)),
    ),
    k(
      SUARA_B3,
      hapus(0, "pj-k", "pj-t0", "hs"),
      tambah("Cocok", ...kartu("cc", 40, 132, 220, 30, W.hijauMuda, ["cocok: benda lurus"], 10.5), emo("ok", 276, 148, E.benar, 18)),
      tambah("panjang.", teks("tt", 150, 182, "yang tidak terlalu panjang", 8.6, W.biru)),
    ),
    k(
      SUARA_B4,
      hapus(0, "tt"),
      tambah("Kurang", ...kartu("kc", 40, 168, 220, 26, W.merahMuda, ["kurang cocok: sangat panjang"], 10)),
      tambah("lama", emo("jm", 276, 178, E.jam, 18)),
    ),
  ],
};
