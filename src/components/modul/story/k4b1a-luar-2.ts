import type { Aksi, AdeganStory } from "./logika-story";
import { W, TEMPAT, emo, judul, kartu, kartuAngka, panah, papanKepala, papanKolom, teks } from "./k4b1a-gambar";
import { bersih, idx, k, sorotkan, tambah } from "./k4b1a-bantu";
import { NAMA_METODE, WARNA_METODE, kepala } from "./k4b1a-luar-1";

/** Isi papan empat tempat (pojok kiri-atas baris angka (30, 80), lebar 240) bertahap: tiap kolom muncul pada kata ke-`n` yang sama dengan `kata`. */
const isiBertahap = (id: string, angka: string, suara: string, pemicu: [string, number][]): Aksi[] => pemicu.map(([kata, n], i) => tambah(idx(suara, kata, n), ...papanKolom(id, 30, 80, 240, i, angka[i], 30, 20)));

/* ------------------------------ 6. Zero as Placeholder: konsep ------------------------------ */
const SUARA_Z1 = "Metode ketiga, Zero as Placeholder, atau Nol Penjaga Tempat. Nol tidak disebut saat membaca, tetapi nol tetap harus ditulis supaya angka lain berada di kolom yang benar.";
const SUARA_Z2 = "Coba hapus dua nol dari tujuh ribu tiga. Yang tersisa hanya tujuh dan tiga, dan dibaca tujuh puluh tiga. Nilainya berubah jauh.";
const SUARA_Z3 = "Nol menjaga kolom ratusan dan puluhan tetap ada. Dengan begitu tujuh tetap di ribuan dan tiga tetap di satuan.";
const SUARA_Z4 = "Aturan membaca: nol dilewati, bukan dihapus. Aturan menulis: kolom yang tidak disebut diisi nol.";

export const ADEGAN_LUAR_NOL: AdeganStory = {
  id: "luar-nol",
  judul: "Zero as Placeholder: nol menjaga tempat",
  sumber: "Metode luar: Zero as Placeholder",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_Z1,
      tambah(0, judul("Zero as Placeholder")),
      tambah("ketiga,", kepala(2)),
      tambah("membaca", ...papanKepala("za", 30, 62, 240, TEMPAT, 8.4, 18)),
      tambah("membaca", ...papanKolom("za", 30, 80, 240, 0, "7", 30, 20), ...papanKolom("za", 30, 80, 240, 1, "0", 30, 20), ...papanKolom("za", 30, 80, 240, 2, "0", 30, 20), ...papanKolom("za", 30, 80, 240, 3, "3", 30, 20)),
      sorotkan("ditulis", "za-d1", "za-d2"),
      tambah("kolom", teks("zb", 150, 140, "7.003: nol dibaca? tidak. ditulis? ya", 9.4, W.merah)),
    ),
    k(
      SUARA_Z2,
      bersih(0),
      tambah(0, judul("Tanpa nol, nilainya berubah"), kepala(2)),
      tambah("hapus", teks("zc", 80, 92, "7.003", 28, W.biru)),
      tambah("tersisa", panah("zd", 130, 84, 40, 0, W.merah, 3), teks("ze", 230, 92, "73", 28, W.merah)),
      tambah("dibaca", teks("zf", 230, 116, "tujuh puluh tiga", 8.6, W.coklat)),
      tambah("berubah", emo("zg", 150, 160, "⚠", 26)),
    ),
    k(
      SUARA_Z3,
      bersih(0),
      tambah(0, judul("Nol menjaga tempat di 7.003"), kepala(2)),
      tambah(0, ...papanKepala("zh", 30, 62, 240, TEMPAT, 8.4, 18), ...[0, 1, 2, 3].flatMap((i) => papanKolom("zh", 30, 80, 240, i, "7003"[i], 30, 20))),
      sorotkan("menjaga", "zh-d1", "zh-d2"),
      tambah("tujuh", teks("zi", 60, 128, "7 di ribuan", 8.4, W.coklat)),
      tambah("tiga", teks("zj", 240, 128, "3 di satuan", 8.4, W.coklat)),
    ),
    k(
      SUARA_Z4,
      bersih(0),
      tambah(0, judul("Dua aturan untuk nol")),
      tambah("membaca:", ...kartu("zk", 14, 40, 272, 44, W.hijauMuda, ["membaca: nol dilewati,", "bukan dihapus"], 9.6)),
      tambah("menulis:", ...kartu("zl", 14, 100, 272, 44, W.langit, ["menulis: kolom yang tidak", "disebut diisi nol"], 9.6)),
    ),
  ],
};

/* ------------------------------ 7. Zero as Placeholder: penerapan ------------------------------ */
const SUARA_Y1 = "Terapan pertama, tujuh ribu tiga. Ratusan dan puluhan tidak disebut, jadi keduanya diisi nol: tujuh, nol, nol, tiga.";
const SUARA_Y2 = "Terapan kedua, enam ribu lima ratus tujuh puluh. Satuan tidak disebut, jadi satuan diisi nol: enam, lima, tujuh, nol.";
const SUARA_Y3 = "Terapan ketiga, seribu dua puluh lima. Ratusan tidak disebut, jadi diisi nol: satu, nol, dua, lima.";
const SUARA_Y4 = "Terapan keempat dari latihan buku: enam ribu dua. Ratusan dan puluhan nol: enam, nol, nol, dua. Tanpa nol penjaga, tulisannya menjadi enam puluh dua.";

export const ADEGAN_LUAR_NOL_TERAPAN: AdeganStory = {
  id: "luar-nol-terapan",
  judul: "Zero as Placeholder: 7.003, 6.570, 1.025, 6.002",
  sumber: "Metode luar: Zero as Placeholder, BS hlm. 6–11",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_Y1,
      tambah(0, judul("Terapan: 7.003"), kepala(2)),
      tambah(0, ...papanKepala("ya", 30, 62, 240, TEMPAT, 8.4, 18)),
      ...isiBertahap("ya", "7003", SUARA_Y1, [["tujuh", 2], ["nol", 2], ["nol", 3], ["tiga", 2]]),
      sorotkan(idx(SUARA_Y1, "nol", 3), "ya-d1", "ya-d2"),
    ),
    k(
      SUARA_Y2,
      bersih(0),
      tambah(0, judul("Terapan: 6.570"), kepala(2)),
      tambah(0, ...papanKepala("yb", 30, 62, 240, TEMPAT, 8.4, 18)),
      ...isiBertahap("yb", "6570", SUARA_Y2, [["enam", 2], ["lima", 2], ["tujuh", 2], ["nol", 2]]),
      sorotkan(idx(SUARA_Y2, "nol", 2), "yb-d3"),
    ),
    k(
      SUARA_Y3,
      bersih(0),
      tambah(0, judul("Terapan: 1.025"), kepala(2)),
      tambah(0, ...papanKepala("yc", 30, 62, 240, TEMPAT, 8.4, 18)),
      ...isiBertahap("yc", "1025", SUARA_Y3, [["satu", 1], ["nol", 2], ["dua", 2], ["lima", 2]]),
      sorotkan(idx(SUARA_Y3, "nol", 2), "yc-d1"),
    ),
    k(
      SUARA_Y4,
      bersih(0),
      tambah(0, judul("Terapan: 6.002"), kepala(2)),
      tambah(0, ...papanKepala("yd", 30, 62, 240, TEMPAT, 8.4, 18)),
      ...isiBertahap("yd", "6002", SUARA_Y4, [["enam", 2], ["nol", 2], ["nol", 3], ["dua", 2]]),
      tambah("Tanpa", ...kartu("ye", 14, 128, 272, 44, W.merahMuda, ["tanpa nol penjaga: 62", "salah, dibaca enam puluh dua"], 9.4), emo("yf", 262, 170, "❌", 18)),
    ),
  ],
};

/* ------------------------------ 8. Say-Write-Show: konsep ------------------------------ */
const SUARA_U1 = "Metode keempat, Say-Write-Show, atau Ucap, Tulis, Tunjuk. Dua teman berpasangan dan melakukan tiga gerakan berurutan.";
const SUARA_U2 = "Gerakan pertama, ucap: satu teman menyebut nama bilangan dengan jelas. Gerakan kedua, tulis: teman lain menuliskannya dengan angka.";
const SUARA_U3 = "Gerakan ketiga, tunjuk: keduanya menata kartu angka sesuai tulisan. Bila ucapan, tulisan, dan kartu cocok, jawabannya benar. Bila tidak, mereka berdiskusi.";
const SUARA_U4 = "Lalu peran ditukar. Dengan begitu kedua teman sama-sama melatih membaca dan menulis bilangan, seperti kerja kelompok dengan kartu bilangan di buku.";

export const ADEGAN_LUAR_UCAP: AdeganStory = {
  id: "luar-ucap",
  judul: "Say-Write-Show: ucap, tulis, tunjuk",
  sumber: "Metode luar: Say-Write-Show",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Say-Write-Show")),
      tambah("keempat,", kepala(3)),
      tambah("berpasangan", emo("ua", 50, 100, "🗣", 36), teks("ua1", 50, 120, "ucap", 9.4, W.biru)),
      tambah("tiga", emo("ub", 150, 100, "✏", 36), teks("ub1", 150, 120, "tulis", 9.4, W.biru)),
      tambah("berurutan.", emo("uc", 250, 100, "👆", 36), teks("uc1", 250, 120, "tunjuk", 9.4, W.biru), panah("ud", 80, 96, 40, 0, W.biru, 2), panah("ue", 180, 96, 40, 0, W.biru, 2)),
    ),
    k(
      SUARA_U2,
      bersih(0),
      tambah(0, judul("Ucap dan tulis"), kepala(3)),
      tambah("pertama,", emo("uf", 40, 100, "🗣", 32), ...kartu("ug", 70, 66, 216, 40, W.krem, ["ucap: satu teman menyebut", "nama bilangan dengan jelas"], 8.8)),
      tambah("kedua,", emo("uh", 40, 156, "✏", 32), ...kartu("ui", 70, 122, 216, 40, W.langit, ["tulis: teman lain menulis", "bilangannya dengan angka"], 8.8)),
    ),
    k(
      SUARA_U3,
      bersih(0),
      tambah(0, judul("Tunjuk dan periksa"), kepala(3)),
      tambah("ketiga,", emo("uj", 40, 100, "👆", 32), ...kartu("uk", 70, 62, 216, 36, W.hijauMuda, ["tunjuk: tata kartu angka", "sesuai tulisan"], 8.8)),
      tambah("cocok,", ...kartu("ul", 20, 112, 126, 36, W.emas, ["ucapan = tulisan = kartu", "benar"], 8.4), emo("um", 156, 138, "✅", 20)),
      tambah("tidak,", ...kartu("un", 176, 112, 108, 36, W.merahMuda, ["tidak cocok:", "berdiskusi"], 8.4)),
    ),
    k(
      SUARA_U4,
      bersih(0),
      tambah(0, judul("Tukar peran"), kepala(3)),
      tambah("peran", emo("uo", 60, 110, "🧒", 38), emo("up", 240, 110, "👧", 38), panah("uq", 100, 96, 100, 0, W.biru, 2.4), panah("ur", 200, 118, -100, 0, W.biru, 2.4)),
      tambah("kerja", ...kartu("us", 40, 144, 220, 34, W.emas, ["bergantian ucap, tulis, tunjuk"], 9.4)),
    ),
  ],
};

/* ------------------------------ 9. Say-Write-Show: penerapan ------------------------------ */
const SUARA_V1 = "Terapan dengan nomor tiga di buku. Teman pertama mengucap: sembilan ribu empat puluh lima.";
const SUARA_V2 = "Teman kedua menulis: sembilan, nol, empat, lima. Tulisannya sama dengan bilangan yang diucapkan.";
const SUARA_V3 = "Keduanya menunjuk kartu angka sembilan, nol, empat, dan lima, lalu membaca kartu itu. Ucapan, tulisan, dan kartu cocok.";
const SUARA_V4 = "Giliran tukar: teman kedua mengucap enam ribu dua. Bila hanya menulis enam dua, kartu menunjukkan nol di ratusan dan puluhan hilang. Yang benar enam, nol, nol, dua.";

export const ADEGAN_LUAR_UCAP_TERAPAN: AdeganStory = {
  id: "luar-ucap-terapan",
  judul: "Say-Write-Show: 9.045 dan 6.002",
  sumber: "Metode luar: Say-Write-Show, BS hlm. 11",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_V1,
      tambah(0, judul("Terapan: 9.045"), kepala(3)),
      tambah("pertama", emo("va", 40, 100, "🧒", 38)),
      tambah("mengucap:", emo("vb", 80, 80, "🗣", 24), ...kartu("vc", 100, 70, 186, 44, W.krem, ["Sembilan ribu", "empat puluh lima"], 10.4)),
    ),
    k(
      SUARA_V2,
      bersih(0),
      tambah(0, judul("Teman kedua menulis"), kepala(3)),
      tambah("kedua", emo("vd", 40, 100, "👧", 38)),
      tambah("menulis:", ...kartu("ve", 90, 66, 190, 50, W.putih, ["9.045"], 22)),
      tambah("sama", ...kartu("vf", 40, 130, 220, 30, W.emas, ["tulisan sama dengan ucapan"], 9.6)),
    ),
    k(
      SUARA_V3,
      bersih(0),
      tambah(0, judul("Menunjuk kartu angka"), kepala(3)),
      tambah("sembilan", ...kartuAngka("vg0", 44, 70, "9", W.krem, 40, 50, 26)),
      tambah("nol,", ...kartuAngka("vg1", 100, 70, "0", W.hijauMuda, 40, 50, 26)),
      tambah("empat,", ...kartuAngka("vg2", 156, 70, "4", W.langit, 40, 50, 26)),
      tambah("lima,", ...kartuAngka("vg3", 212, 70, "5", W.pink, 40, 50, 26)),
      tambah("cocok.", emo("vh", 150, 160, "✅", 30)),
    ),
    k(
      SUARA_V4,
      bersih(0),
      tambah(0, judul("Tukar: 6.002"), kepala(3)),
      tambah("mengucap", ...kartu("vi", 40, 60, 220, 26, W.krem, ["ucap: enam ribu dua"], 9.6)),
      tambah("hanya", ...kartu("vj", 14, 96, 128, 44, W.merahMuda, ["ditulis 6 2", "kartu: 62"], 9.2), emo("vk", 130, 156, "❌", 20)),
      tambah("Yang", ...kartu("vl", 158, 96, 128, 44, W.hijauMuda, ["ditulis 6 0 0 2", "kartu: 6.002"], 9.2), emo("vm", 274, 156, "✅", 20)),
    ),
  ],
};

/* ------------------------------ 10. Ringkasan ------------------------------ */
const SUARA_R1 = "Ringkasan empat metode. Dienes Blocks membangun bilangan dari balok peti, dus, bungkus, dan benda lepas.";
const SUARA_R2 = "Place-Value Chart menaruh angka di kolom ribuan, ratusan, puluhan, dan satuan. Zero as Placeholder menjaga nol supaya kolom tidak bergeser.";
const SUARA_R3 = "Say-Write-Show melatih ucap, tulis, dan tunjuk bergantian bersama teman.";
const SUARA_R4 = "Keempatnya menuju hasil yang sama: membaca dan menulis bilangan empat angka dengan benar. Pilih yang cocok untukmu, lalu periksa lagi dengan kartu angka.";

const CONTOH_RINGKAS = ["3.286", "2.634", "7.003", "9.045"];
const BARIS_RINGKAS = ["balok peti, dus, bungkus, benda", "angka di kolom papan", "nol menjaga tempat", "ucap, tulis, tunjuk"];

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan empat metode dari luar",
  sumber: "Ringkasan metode luar",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Ringkasan empat metode")),
      tambah("Dienes", ...kartu("r0", 10, 34, 280, 30, WARNA_METODE[0], [`${NAMA_METODE[0]}: ${BARIS_RINGKAS[0]}`], 8.6)),
    ),
    k(
      SUARA_R2,
      tambah("Place-Value", ...kartu("r1", 10, 72, 280, 30, WARNA_METODE[1], [`${NAMA_METODE[1]}: ${BARIS_RINGKAS[1]}`], 8.6)),
      tambah("Zero", ...kartu("r2", 10, 110, 280, 30, WARNA_METODE[2], [`${NAMA_METODE[2]}: ${BARIS_RINGKAS[2]}`], 8.6)),
    ),
    k(
      SUARA_R3,
      tambah("Say-Write-Show", ...kartu("r3", 10, 148, 280, 30, WARNA_METODE[3], [`${NAMA_METODE[3]}: ${BARIS_RINGKAS[3]}`], 8.6)),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Satu tujuan")),
      tambah("Keempatnya", ...CONTOH_RINGKAS.map((c, i) => kartu(`rc${i}`, 14 + (i % 2) * 140, 34 + Math.floor(i / 2) * 44, 130, 36, WARNA_METODE[i], [c], 16)).flat()),
      tambah("membaca", ...kartu("rd", 30, 130, 240, 30, W.emas, ["membaca dan menulis bilangan empat angka"], 9)),
      tambah("kartu", emo("re", 150, 186, "✅", 22)),
    ),
  ],
};
