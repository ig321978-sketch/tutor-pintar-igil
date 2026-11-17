import type { AdeganStory } from "./logika-story";
import { E, W, angkaTabel, emo, judul, kartu, orang, sedotan, ikatSedotan, tabel, teks, kotak, type UkuranTabel } from "./k1b5c-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah } from "./k1b5c-bantu";
import { NAMA_METODE, WARNA_METODE, kepala } from "./k1b5c-luar-1";

/* Video metode global Sub-Bab C: Place Value Chart (Tabel Puluhan dan Satuan), Bundling Sticks (Ikat Sedotan), dan ringkasan. */

const TC: UkuranTabel = { x: 60, y: 56, w: 180, hk: 22, hb: 70 };

/* ------------------------------ 4. Place Value Chart: konsep ------------------------------ */
const SUARA_C1 = "Metode kedua, Place Value Chart, atau Tabel Puluhan dan Satuan. Ada dua kolom: puluhan di kiri, satuan di kanan.";
const SUARA_C2 = "Tulis banyak puluhan di kolom kiri, dan banyak satuan di kolom kanan.";
const SUARA_C3 = "Angka di kolom kiri artinya puluhan, angka di kolom kanan artinya satuan. Tempat menentukan artinya.";
const SUARA_C4 = "Bilangan sebelas: satu di puluhan, satu di satuan.";

export const ADEGAN_LUAR_TABEL: AdeganStory = {
  id: "luar-tabel",
  judul: "Place Value Chart: tabel puluhan dan satuan",
  sumber: "Metode global: Place Value Chart",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_C1,
      tambah("kedua,", ...kepala(1)),
      tambah("kolom:", ...tabel("tc", TC)),
      tambah(idx(SUARA_C1, "dua"), teks("kl", 150, 170, "2 kolom", 10, W.ungu)),
      sorotkan(idx(SUARA_C1, "kiri"), "tc-hl", "tc-bl"),
      sorotkan(idx(SUARA_C1, "kanan"), "tc-hr", "tc-br"),
    ),
    k(
      SUARA_C2,
      tambah("puluhan", teks("tp", 105, 98, "banyak puluhan", 9, W.merah)),
      tambah("satuan", teks("ts", 195, 98, "banyak satuan", 9, W.merah)),
    ),
    k(
      SUARA_C3,
      hapus(0, "tp", "ts"),
      tambah("kiri", angkaTabel("tc", TC, 0, "?", 26)),
      tambah(idx(SUARA_C3, "kanan"), angkaTabel("tc", TC, 1, "?", 26)),
      ubah("Tempat", { id: "kl", isi: "tempat menentukan arti" }),
    ),
    k(
      SUARA_C4,
      ubah("satu", { id: "tc-al", isi: "1" }),
      ubah(idx(SUARA_C4, "satu", 2), { id: "tc-ar", isi: "1" }),
      ubah("sebelas:", { id: "kl", isi: "bilangan 11", u: 11 }),
    ),
  ],
};

/* ------------------------------ 5. Place Value Chart: terapan ------------------------------ */
const SUARA_D1 = "Igil mengisi tabel untuk lima belas kerang. Satu puluhan, lima satuan.";
const SUARA_D2 = "Untuk delapan belas, satu di puluhan dan delapan di satuan.";
const SUARA_D3 = "Untuk sepuluh, satu di puluhan dan nol di satuan. Nol menjaga tempat satuan.";
const SUARA_D4 = "Tabel cepat dibaca dan ditulis, tetapi tidak menunjukkan bendanya. Cocok setelah kita paham ikatan.";

export const ADEGAN_LUAR_TABEL_TERAPAN: AdeganStory = {
  id: "luar-tabel-terapan",
  judul: "Place Value Chart: kerang lima belas, delapan belas, sepuluh",
  sumber: "Metode global: Place Value Chart, terapan",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, ...kepala(1), ...tabel("tc", TC)),
      tambah("Igil", ...orang("ig", 24, 182, E.igil, "Igil")),
      tambah("belas", teks("kl", 150, 170, "15 kerang", 10, W.ungu)),
      tambah(idx(SUARA_D1, "Satu"), angkaTabel("tc", TC, 0, "1", 26)),
      tambah(idx(SUARA_D1, "lima", 2), angkaTabel("tc", TC, 1, "5", 26)),
    ),
    k(
      SUARA_D2,
      ubah("belas,", { id: "kl", isi: "18 kerang" }),
      ubah(idx(SUARA_D2, "delapan", 2), { id: "tc-ar", isi: "8" }),
    ),
    k(
      SUARA_D3,
      ubah("sepuluh,", { id: "kl", isi: "10 kerang" }),
      ubah("nol", { id: "tc-ar", isi: "0" }),
      sorotkan(idx(SUARA_D3, "menjaga"), "tc-br"),
    ),
    k(
      SUARA_D4,
      hapus(0, "kl"),
      tambah("cepat", teks("kc", 105, 170, "cepat dibaca", 9, W.hijau)),
      tambah("menunjukkan", teks("kt", 200, 170, "tanpa benda", 9, W.merah)),
      tambah("Cocok", teks("kk", 150, 190, "cocok setelah paham ikatan", 9, W.ungu)),
    ),
  ],
};

/* ------------------------------ 6. Bundling Sticks: konsep ------------------------------ */
const SUARA_E1 = "Metode ketiga, Bundling Sticks, atau Ikat Sedotan. Sedotan diikat tiap sepuluh dengan karet.";
const SUARA_E2 = "Satu ikat sepuluh sedotan adalah satu puluhan. Sedotan yang lepas adalah satuan.";
const SUARA_E3 = "Kita hitung ikatannya dulu, lalu sedotan yang lepas.";
const SUARA_E4 = "Bila sedotan lepas sudah sepuluh, ikat lagi menjadi satu puluhan.";
const IKAT = ikatSedotan("ik", 60, 62);
const KARET_IKAT = IKAT[10];
/** Sedotan lepas ke-i (0 sampai 9) di kanan. */
const lepas = (i: number) => sedotan(`sl${i}`, 200 + i * 8, 62, i + 3);

export const ADEGAN_LUAR_IKAT: AdeganStory = {
  id: "luar-ikat",
  judul: "Bundling Sticks: ikat sedotan",
  sumber: "Metode global: Bundling Sticks",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_E1,
      tambah("ketiga,", ...kepala(2)),
      tambah(idx(SUARA_E1, "Sedotan", 2), ...IKAT.slice(0, 10)),
      tambah("sepuluh", teks("ti", 80, 128, "tiap 10 diikat", 9, W.merah)),
      tambah("karet.", KARET_IKAT),
    ),
    k(
      SUARA_E2,
      ubah("Satu", { id: "ti", isi: "1 ikat: 10 sedotan" }),
      tambah("puluhan.", teks("tp", 80, 146, "1 puluhan", 10, W.merah)),
      tambah("lepas", lepas(0), lepas(1), lepas(2)),
      tambah(idx(SUARA_E2, "satuan."), teks("sl", 210, 128, "satuan", 10, W.ungu)),
    ),
    k(
      SUARA_E3,
      hapus(0, "ti"),
      sorotkan("ikatannya", "ik"),
      tambah("ikatannya", teks("k3a", 80, 170, "hitung ikatan dulu", 9.4, W.merah)),
      sorotkan("lepas.", "sl0", "sl1", "sl2"),
      tambah("lalu", teks("k3b", 220, 170, "lalu yang lepas", 9.4, W.ungu)),
    ),
    k(
      SUARA_E4,
      hapus(0, "k3a", "k3b", "tp"),
      tambah("sudah", ...Array.from({ length: 7 }, (_, i) => lepas(i + 3))),
      ubah("sepuluh,", { id: "sl", isi: "10 lepas" }),
      tambah("ikat", kotak("kz", 196, 73, 86, 12, "none", "#DC2626", { rx: 6, tebal: 2.4, z: 2 })),
      tambah("puluhan.", teks("tq", 238, 146, "jadi 1 puluhan", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ 7. Bundling Sticks: terapan ------------------------------ */
const SUARA_F1 = "Abang mengikat tujuh belas sedotan. Satu ikat dan tujuh sedotan lepas.";
const SUARA_F2 = "Igil menambah tiga sedotan. Tujuh lepas ditambah tiga menjadi sepuluh, jadi diikat satu ikatan baru.";
const SUARA_F3 = "Sekarang ada dua ikat dan tidak ada yang lepas. Dua puluhan, nol satuan, yaitu dua puluh.";
const SUARA_F4 = "Ikat Sedotan paling jelas menunjukkan kapan harus mengikat. Tetapi butuh banyak sedotan dan karet.";
const IKAT_A = ikatSedotan("ia", 60, 62);
const IKAT_B = ikatSedotan("ib", 170, 62);

export const ADEGAN_LUAR_IKAT_TERAPAN: AdeganStory = {
  id: "luar-ikat-terapan",
  judul: "Bundling Sticks: tujuh belas sedotan jadi dua puluh",
  sumber: "Metode global: Bundling Sticks, terapan",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_F1,
      tambah(0, ...kepala(2)),
      tambah("Abang", ...orang("ab", 24, 182, E.abang, "Abang")),
      tambah("belas", teks("js", 150, 150, "17 sedotan", 10, W.ungu)),
      tambah("Satu", ...IKAT_A, teks("f1", 80, 128, "1 ikat", 9.4, W.merah)),
      tambah("lepas.", ...Array.from({ length: 7 }, (_, i) => lepas(i)), teks("f7", 230, 128, "7 lepas", 9.4, W.merah)),
    ),
    k(
      SUARA_F2,
      tambah("Igil", ...orang("ig", 276, 182, E.igil, "Igil")),
      tambah("tiga", ...Array.from({ length: 3 }, (_, i) => lepas(i + 7)), teks("t3", 230, 110, "tambah 3", 9.4, W.hijau)),
      tambah("sepuluh,", teks("t10", 230, 150, "7 dan 3 jadi 10", 9, W.merah)),
      tambah("ikatan", kotak("kz", 196, 73, 86, 12, "none", "#DC2626", { rx: 6, tebal: 2.4, z: 2 })),
    ),
    k(
      SUARA_F3,
      bersih(0),
      tambah(0, ...kepala(2)),
      tambah("dua", ...IKAT_A, ...IKAT_B),
      tambah("ikat", teks("g2", 80, 128, "2 ikat", 9.4, W.merah)),
      tambah(idx(SUARA_F3, "puluhan,"), teks("gp", 80, 150, "2 puluhan", 10, W.merah)),
      tambah("nol", teks("gs", 190, 150, "0 satuan", 10, W.ungu)),
      tambah(idx(SUARA_F3, "puluh"), teks("g20", 250, 110, "20", 24, W.merah)),
    ),
    k(
      SUARA_F4,
      bersih(0),
      tambah(0, ...kepala(2)),
      tambah("paling", ...kartu("ja", 20, 62, 260, 30, W.hijauMuda, ["paling jelas: kapan harus mengikat"], 9)),
      tambah("Tetapi", ...kartu("jb", 20, 108, 260, 30, W.pink, ["tetapi butuh banyak sedotan dan karet"], 9)),
    ),
  ],
};

/* ------------------------------ 8. Ringkasan ------------------------------ */
const SUARA_Z1 = "Kita sudah melihat tiga metode global. Mana yang cocok untuk papan persediaan Abang? Itu tergantung masalahnya.";
const SUARA_Z2 = "Balok Puluhan cocok untuk membandingkan banyaknya. Tabel Puluhan dan Satuan cocok untuk mencatat dengan cepat.";
const SUARA_Z3 = "Ikat Sedotan cocok untuk melihat kapan sepuluh terkumpul. Ketiganya sama: puluhan dulu, lalu satuan.";
const SUARA_Z4 = "Menurutmu, kalau pembeli ingin catatan cepat, alat mana yang kamu pakai?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode global",
  sumber: "Ringkasan metode global",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_Z1,
      tambah(0, judul("Ringkasan")),
      tambah("tiga", emo("rk", 150, 76, E.bintang, 40), ...kartu("rt", 60, 98, 180, 26, W.emas, ["3 metode global"], 10)),
      tambah("papan", teks("mm", 150, 150, "papan persediaan", 10, W.ungu)),
      tambah("Abang?", ...orang("ab", 150, 182, E.abang, "Abang")),
    ),
    k(
      SUARA_Z2,
      bersih(0),
      tambah(0, judul("Ringkasan")),
      tambah("Balok", ...kartu("r0", 14, 32, 272, 40, WARNA_METODE[0], [NAMA_METODE[0], "membandingkan banyaknya"], 9)),
      tambah("Tabel", ...kartu("r1", 14, 78, 272, 40, WARNA_METODE[1], [NAMA_METODE[1], "mencatat dengan cepat"], 9)),
    ),
    k(SUARA_Z3, tambah("Ikat", ...kartu("r2", 14, 124, 272, 40, WARNA_METODE[2], [NAMA_METODE[2], "melihat kapan 10 terkumpul"], 9))),
    k(
      SUARA_Z4,
      tambah("pembeli", ...orang("pb", 30, 182, E.pembeli, "pembeli")),
      sorotkan("cepat,", "r1-k"),
      tambah("alat", teks("aq", 150, 190, "alat mana?", 10, W.merah)),
    ),
  ],
};
