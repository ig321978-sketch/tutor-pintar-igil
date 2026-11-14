import type { AdeganStory } from "./logika-story";
import { W, bangun, emo, isiTempat, judul, kardus, kartu, kartuAngka, kepalaTempat, selTempat, teks } from "./k4b1b-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah } from "./k4b1b-bantu";

const KARDUS_X = [10, 83, 156, 229];

/* ------------------------------ 5. Aktivitas 2: ambil kartu dari kardus (Buku Siswa hlm. 13–14; Panduan Guru hlm. 37) ------------------------------ */
const SUARA_M1 = "Langkah sembilan: ambil satu kartu dari setiap kardus dan susun menjadi bilangan empat angka. Langkah sepuluh: catat angka pada tiap kartu di buku tulis.";
const SUARA_M2 = "Contoh dari Panduan Guru: kartu tujuh dari kardus ribuan, kartu lima dari kardus ratusan, kartu nol dari kardus puluhan, dan kartu delapan dari kardus satuan.";
const SUARA_M3 = "Disusun, kartunya menjadi tujuh ribu lima ratus delapan. Kardus tadi dikatakan sebagai nilai tempat, jadi tujuh di ribuan, lima di ratusan, nol di puluhan, dan delapan di satuan.";
const SUARA_M4 = "Langkah sebelas: tentukan nilai tempat tiap angka dari kardusnya. Langkah dua belas bertanya: dapatkah keempat angka itu kamu nyatakan sebagai satu bilangan empat angka? Bisa, seperti tujuh ribu lima ratus delapan itu.";

export const ADEGAN_AMBIL: AdeganStory = {
  id: "aktivitas-ambil",
  judul: "Aktivitas 2: ambil kartu dari kardus",
  sumber: "Buku Siswa hlm. 13–14; Panduan Guru hlm. 37",
  latar: "#F5F3FF",
  kutipan: [
    "Ambil satu kartu bilangan dari masing-masing kardus dan susunlah menjadi bilangan empat angka.",
    "Catatlah di buku tulis kalian angka yang tertera pada kartu bilangan yang diperoleh dari setiap kardus.",
    "Tentukan nilai tempat dari setiap angka yang diperoleh dari masing-masing kardus.",
    "Jika keempat angka tersebut disusun menjadi bilangan 4 angka, dapatkan kalian menyatakan bilangan tersebut?",
    "kartu bilangan 7 dari kardus ribuan, kartu bilangan 5 dari kardus ratusan, kartu bilangan 0 dari kardus puluhan dan kartu bilangan 8 dari kardus satuan.",
    "kardus tadi dapat dikatakan sebagai nilai tempat.",
  ],
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Langkah 9 sampai 12")),
      ...[0, 1, 2, 3].map((i) => tambah("kardus", ...kardus(`kd${i}`, KARDUS_X[i], 100, 62, 46, i))),
      ...[0, 1, 2, 3].map((i) => tambah(["satu", "setiap", "susun", "menjadi"][i], ...kartuAngka(`ka${i}`, KARDUS_X[i] + 16, 54, 30, "?", W.putih, 14))),
      tambah("Langkah", teks("c9", 150, 176, "langkah 9: ambil satu kartu dari tiap kardus", 8.4, W.biru)),
      tambah("sepuluh", teks("c10", 150, 192, "langkah 10: catat angkanya di buku tulis", 8.4, W.hijau)),
    ),
    k(
      SUARA_M2,
      hapus(0, "c9", "c10"),
      tambah(0, teks("cg", 150, 180, "contoh Panduan Guru hlm. 37", 8.8, W.coklat)),
      ubah("tujuh", { id: "ka0-t", isi: "7" }),
      ubah("lima", { id: "ka1-t", isi: "5" }),
      ubah("nol", { id: "ka2-t", isi: "0" }),
      ubah("delapan", { id: "ka3-t", isi: "8" }),
      ...[0, 1, 2, 3].map((i) => sorotkan(["tujuh", "lima", "nol", "delapan"][i], `ka${i}-k`)),
    ),
    k(
      SUARA_M3,
      hapus(0, "cg"),
      tambah("kartunya", teks("bil", 150, 186, "7.508", 26, W.merah)),
      sorotkan(idx(SUARA_M3, "nilai"), "kd0-k", "kd1-k", "kd2-k", "kd3-k"),
    ),
    k(
      SUARA_M4,
      tambah("Langkah", teks("c11", 150, 36, "langkah 11: tentukan nilai tempat tiap angka", 8.4, W.biru)),
      tambah("dua", teks("c12", 150, 158, "langkah 12: bisa dinyatakan sebagai satu bilangan", 8.4, W.hijau)),
      tambah("Bisa,", emo("ok", 266, 186, "✅", 18)),
    ),
  ],
};

/* ------------------------------ 6. Contoh 2.150 (Buku Siswa hlm. 14) ------------------------------ */
const SUARA_C1 = "Contoh di buku, dari struk tadi: bilangan dua ribu seratus lima puluh, terdiri atas empat angka, yaitu dua, satu, lima, dan nol.";
const SUARA_C2 = "Angka dua menempati nilai tempat ribuan. Angka satu menempati nilai tempat ratusan.";
const SUARA_C3 = "Angka lima menempati nilai tempat puluhan. Angka nol menempati nilai tempat satuan. Jadi tabelnya berisi dua, satu, lima, dan nol dari kiri ke kanan.";
const SUARA_C4 = "Pak guru bertanya: setelah melakukan aktivitas, apakah kalian sudah paham nilai tempat? Kerjakan mandiri sesuai harga di struk belanja. Murid menjawab: baik, Pak.";
const SUARA_C5 = "Tambahan video: nilai tiap angka. Angka dua di ribuan bernilai dua ribu, angka satu di ratusan bernilai seratus, angka lima di puluhan bernilai lima puluh, dan angka nol di satuan bernilai nol.";

export const ADEGAN_CONTOH: AdeganStory = {
  id: "contoh-2150",
  judul: "Contoh dari struk: 2.150",
  sumber: "Buku Siswa hlm. 14",
  latar: "#FFFBEB",
  kutipan: [
    "2.150 dibaca : dua ribu seratus lima puluh",
    "Angka 2 menempati nilai tempat “ribuan”",
    "Angka 1 menempati nilai tempat “ratusan”",
    "Angka 5 menempati nilai tempat “puluhan”",
    "Angka 0 menempati nilai tempat “satuan”",
    "Penulisan nilai tempat ribuan, ratusan, puluhan dan satuan.",
    "Nah, setelah melakukan aktivitas apakah kalian sudah paham dengan nilai tempat?",
    "Ayo, kerjakan secara mandiri untuk mencari nilai tempat sesuai dengan harga struk belanja di atas.",
    "Baik Pak",
  ],
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Contoh: bilangan pada struk")),
      tambah("bilangan", teks("bs", 150, 64, "2.150", 34, W.merah)),
      tambah("ribu", teks("bc", 150, 92, "dibaca: dua ribu seratus lima puluh", 9.4, W.biru)),
      tambah("empat", teks("ea", 150, 118, "empat angka:", 9, W.coklat)),
      ...[2, 1, 5, 0].map((a, i) => tambah([idx(SUARA_C1, "dua", 2), idx(SUARA_C1, "satu"), idx(SUARA_C1, "lima", 2), idx(SUARA_C1, "nol")][i], ...kartuAngka(`an${i}`, 60 + i * 50, 130, 30, a, W.krem, 14))),
    ),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Tabel nilai tempat 2.150")),
      tambah(0, ...kepalaTempat("tb", 26, 70, 62, 18, 9)),
      tambah("ribuan.", ...selTempat("tb", 26, 88, 62, 0, 2, 26, 14, W.emas)),
      tambah("ratusan.", ...selTempat("tb", 26, 88, 62, 1, 1, 26, 14, W.emas)),
      tambah(0, teks("tbx", 150, 56, "2.150", 18, W.merah)),
    ),
    k(
      SUARA_C3,
      tambah("puluhan.", ...selTempat("tb", 26, 88, 62, 2, 5, 26, 14, W.emas)),
      tambah("satuan.", ...selTempat("tb", 26, 88, 62, 3, 0, 26, 14, W.emas)),
      tambah("Jadi", ...kartu("ur", 40, 130, 220, 40, W.hijauMuda, ["dari kiri ke kanan:", "2, 1, 5, 0"], 9.4)),
      ubah("Jadi", { id: "tbx", warna: W.hijau }),
    ),
    k(
      SUARA_C4,
      bersih(0),
      tambah(0, judul("Pak guru dan murid")),
      tambah("Pak", emo("gr", 34, 100, "👨", 34)),
      tambah("setelah", ...kartu("gb", 66, 34, 220, 66, W.langit, ["setelah beraktivitas, apakah kalian", "sudah paham nilai tempat?", "kerjakan mandiri sesuai harga struk"], 8.4)),
      tambah("Murid", emo("mr", 266, 156, "🧒", 34), ...kartu("jw", 140, 134, 90, 30, W.krem, ["Baik Pak"], 9.4)),
    ),
    k(
      SUARA_C5,
      bersih(0),
      tambah(0, judul("Nilai tiap angka (tambahan video)")),
      tambah(0, ...kepalaTempat("nv", 26, 36, 62, 18, 9)),
      tambah(0, ...isiTempat("nv", 26, 54, 62, [2, 1, 5, 0], 24, 14, W.putih)),
      tambah(idx(SUARA_C5, "ribu"), ...selTempat("nw", 26, 86, 62, 0, "2.000", 24, 12, W.emas)),
      tambah(idx(SUARA_C5, "seratus"), ...selTempat("nw", 26, 86, 62, 1, "100", 24, 12, W.emas)),
      tambah(idx(SUARA_C5, "puluh"), ...selTempat("nw", 26, 86, 62, 2, "50", 24, 12, W.emas)),
      tambah(idx(SUARA_C5, "nol", 2), ...selTempat("nw", 26, 86, 62, 3, "0", 24, 12, W.emas)),
      tambah("Tambahan", ...kartu("tv", 30, 140, 240, 30, W.emas, ["angka × nilai tempatnya"], 9.4)),
    ),
  ],
};

/* ------------------------------ 7. Ayo Berlatih nomor 1 (Buku Siswa hlm. 14–15; Panduan Guru hlm. 37) ------------------------------ */
const SUARA_L1 = "Ayo Berlatih nomor satu: tuliskan bilangan empat angka dan letakkan setiap angka sesuai nilai tempatnya. Soal a: tabel berisi tujuh, delapan, satu, dan dua.";
const SUARA_L2 = "Jawaban a menurut Panduan Guru adalah tujuh ribu delapan ratus dua belas. Angka tujuh di ribuan, delapan di ratusan, satu di puluhan, dan dua di satuan.";
const SUARA_L3 = "Soal b: angka sembilan ada di ratusan, tiga angka lain bebas. Contoh dari Panduan Guru: enam ribu sembilan ratus dua puluh tiga, tujuh ribu sembilan ratus dua puluh dua, dan lima ribu sembilan ratus.";
const SUARA_L4 = "Soal c: angka satu ada di satuan, tiga angka lain bebas. Contoh jawaban: lima ribu seratus enam puluh satu, tujuh ribu seratus sebelas, dan delapan ribu dua ratus tiga puluh satu.";
const SUARA_L5 = "Periksa mandiri: kelima contoh b memuat sembilan di ratusan, dan kelima contoh c memuat satu di satuan, jadi semuanya benar. Contoh b lainnya delapan ribu sembilan ratus dua puluh dan seribu sembilan ratus tiga puluh empat.";

const CONTOH_B = ["6.923", "7.922", "8.920", "5.900", "1.934"];
const CONTOH_C = ["5.161", "7.111", "8.231", "1.211", "3.191"];

export const ADEGAN_LATIH_SATU: AdeganStory = {
  id: "berlatih-satu",
  judul: "Ayo Berlatih nomor 1: letakkan angka pada tempatnya",
  sumber: "Buku Siswa hlm. 14–15; Panduan Guru hlm. 37",
  latar: "#F0F9FF",
  kutipan: [
    "Ayo Berlatih",
    "Tuliskan bilangan yang terdiri atas 4 angka dan letakkan setiap angka sesuai nilai tempatnya.",
    "Coba kalian tuliskan bilangan yang terdiri atas 4 angka dan letakkan masing-masing angka sesuai nilai tempatnya.",
    "a. 7.812",
    "Kemungkinan jawaban peserta didik: 6.923; 7.922; 8.920; 5.900 atau 1.934, dst",
    "kemungkinan jawaban peserta didik: 5.161; 7.111; 8.231; 1.211 atau 3.191, dst.",
  ],
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Ayo Berlatih nomor 1a")),
      tambah("tuliskan", teks("bl", 150, 54, "......", 16, W.biru)),
      tambah("tabel", ...kepalaTempat("t", 26, 70, 62, 18, 9)),
      tambah(idx(SUARA_L1, "tujuh"), ...selTempat("t", 26, 88, 62, 0, 7, 26, 14)),
      tambah(idx(SUARA_L1, "delapan"), ...selTempat("t", 26, 88, 62, 1, 8, 26, 14)),
      tambah(idx(SUARA_L1, "satu", 2), ...selTempat("t", 26, 88, 62, 2, 1, 26, 14)),
      tambah(idx(SUARA_L1, "dua"), ...selTempat("t", 26, 88, 62, 3, 2, 26, 14)),
    ),
    k(
      SUARA_L2,
      tambah("tujuh", ...kartu("jw", 40, 136, 220, 30, W.hijauMuda, ["jawaban a: 7.812"], 9.8)),
      ubah("tujuh", { id: "bl", isi: "7.812", warna: W.merah }),
      sorotkan(idx(SUARA_L2, "ribuan"), "t-d0"),
      sorotkan(idx(SUARA_L2, "ratusan"), "t-d1"),
      sorotkan(idx(SUARA_L2, "puluhan"), "t-d2"),
      sorotkan(idx(SUARA_L2, "satuan"), "t-d3"),
    ),
    k(
      SUARA_L3,
      bersih(0),
      tambah(0, judul("Nomor 1b: angka 9 di ratusan")),
      tambah(0, ...kepalaTempat("u", 26, 34, 62, 18, 9)),
      tambah(0, ...isiTempat("u", 26, 52, 62, ["...", 9, "...", "..."], 24, 12, W.putih)),
      ubah(0, { id: "u-d1", warna: W.emas }),
      tambah("enam", ...kartu("b1", 14, 100, 84, 34, W.hijauMuda, ["6.923"], 11)),
      tambah("tujuh", ...kartu("b2", 108, 100, 84, 34, W.langit, ["7.922"], 11)),
      tambah("lima", ...kartu("b3", 202, 100, 84, 34, W.krem, ["5.900"], 11)),
      tambah("Contoh", teks("bk", 150, 154, "contoh jawaban Panduan Guru", 9, W.coklat)),
    ),
    k(
      SUARA_L4,
      bersih(0),
      tambah(0, judul("Nomor 1c: angka 1 di satuan")),
      tambah(0, ...kepalaTempat("u", 26, 34, 62, 18, 9)),
      tambah(0, ...isiTempat("u", 26, 52, 62, ["...", "...", "...", 1], 24, 12, W.putih)),
      ubah(0, { id: "u-d3", warna: W.emas }),
      tambah("lima", ...kartu("c1", 14, 100, 84, 34, W.hijauMuda, ["5.161"], 11)),
      tambah("tujuh", ...kartu("c2", 108, 100, 84, 34, W.langit, ["7.111"], 11)),
      tambah("delapan", ...kartu("c3", 202, 100, 84, 34, W.krem, ["8.231"], 11)),
      tambah("Contoh", teks("ck", 150, 154, "contoh jawaban Panduan Guru", 9, W.coklat)),
    ),
    k(
      SUARA_L5,
      bersih(0),
      tambah(0, judul("Periksa: letak angka 9 dan angka 1")),
      tambah(0, teks("hb", 74, 38, "contoh b: ratusan 9", 8.8, W.hijau), teks("hc", 226, 38, "contoh c: satuan 1", 8.8, W.hijau)),
      ...CONTOH_B.map((n, i) => tambah(idx(SUARA_L5, "kelima"), teks(`pb${i}`, 66, 62 + i * 24, n, 13, W.biru), emo(`yb${i}`, 108, 62 + i * 24, "✅", 12))),
      ...CONTOH_C.map((n, i) => tambah(idx(SUARA_L5, "kelima", 2), teks(`pc${i}`, 218, 62 + i * 24, n, 13, W.biru), emo(`yc${i}`, 260, 62 + i * 24, "✅", 12))),
      sorotkan(idx(SUARA_L5, "lainnya"), "pb2", "pb4"),
    ),
  ],
};

/* ------------------------------ 8. Ayo Berlatih nomor 2: tempat angka 6 (Buku Siswa hlm. 15; Panduan Guru hlm. 37) ------------------------------ */
const SUARA_D1 = "Nomor dua: tulis nilai tempat dari angka enam pada empat bilangan. Bilangan pertama delapan ribu empat ratus enam puluh tiga sudah dijawab di buku: puluhan.";
const SUARA_D2 = "Bilangan kedua empat ribu enam ratus tujuh puluh lima. Angka enam ada di urutan kedua dari kiri, yaitu ratusan.";
const SUARA_D3 = "Bilangan ketiga enam ribu tujuh ratus delapan puluh sembilan. Angka enam berada paling kiri, jadi ribuan.";
const SUARA_D4 = "Bilangan keempat seribu dua ratus tiga puluh enam. Angka enam berada paling kanan, jadi satuan.";
const SUARA_D5 = "Kunci Panduan Guru: puluhan, ratusan, ribuan, dan satuan, sesuai hitungan kita. Tambahan video: angka enam yang sama bernilai enam puluh, enam ratus, enam ribu, atau enam.";

const sudutTabel = (id: string, angka: number[], enam: number) => [...kepalaTempat(id, 26, 128, 62, 16, 8.6), ...isiTempat(id, 26, 144, 62, angka, 22, 13, W.putih)].map((o) => (o.id === `${id}-d${enam}` ? { ...o, warna: W.emas } : o));

export const ADEGAN_LATIH_DUA: AdeganStory = {
  id: "berlatih-dua",
  judul: "Ayo Berlatih nomor 2: tempat angka 6",
  sumber: "Buku Siswa hlm. 15; Panduan Guru hlm. 37",
  latar: "#FFF7ED",
  kutipan: [
    "Tulis nilai tempat dari angka 6 dari bilangan berikut.",
    "Puluhan",
    "8.463",
    "4.675",
    "6.789",
    "1.236",
    "Tulis nilai tempat dari angka 6 dari bilangan berikut!",
    "a. puluhan b. ratusan c. ribuan d. satuan",
  ],
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Nomor 2: tempat angka 6")),
      tambah("Bilangan", ...bangun("bg", "segitiga", 150, 76, "8.463")),
      tambah("delapan", ...sudutTabel("t", [8, 4, 6, 3], 2)),
      tambah("puluhan.", teks("jb", 150, 190, "Puluhan", 11, W.merah)),
    ),
    k(
      SUARA_D2,
      hapus(0, "bg-s", "bg-t", "jb"),
      tambah(0, ...bangun("bg", "lingkaran", 150, 76, "4.675")),
      ...[4, 6, 7, 5].map((a, i) => ubah(0, { id: `t-dt${i}`, isi: String(a) })),
      ubah(0, { id: "t-d2", warna: W.putih }, { id: "t-d1", warna: W.emas }),
      tambah("ratusan.", teks("jb", 150, 190, "Ratusan", 11, W.merah)),
    ),
    k(
      SUARA_D3,
      hapus(0, "bg-s", "bg-t", "jb"),
      tambah(0, ...bangun("bg", "belah", 150, 76, "6.789")),
      ...[6, 7, 8, 9].map((a, i) => ubah(0, { id: `t-dt${i}`, isi: String(a) })),
      ubah(0, { id: "t-d1", warna: W.putih }, { id: "t-d0", warna: W.emas }),
      tambah("ribuan.", teks("jb", 150, 190, "Ribuan", 11, W.merah)),
    ),
    k(
      SUARA_D4,
      hapus(0, "bg-s", "bg-t", "jb"),
      tambah(0, ...bangun("bg", "segilima", 150, 76, "1.236")),
      ...[1, 2, 3, 6].map((a, i) => ubah(0, { id: `t-dt${i}`, isi: String(a) })),
      ubah(0, { id: "t-d0", warna: W.putih }, { id: "t-d3", warna: W.emas }),
      tambah("satuan.", teks("jb", 150, 190, "Satuan", 11, W.merah)),
    ),
    k(
      SUARA_D5,
      bersih(0),
      tambah(0, judul("Kunci dan nilai angka 6")),
      tambah(0, ...[["bilangan", "angka 6 di", "bernilai"]].flatMap((r) => barisTabelD("kh", 34, r, true))),
      ...[
        ["8.463", "puluhan", "60"],
        ["4.675", "ratusan", "600"],
        ["6.789", "ribuan", "6.000"],
        ["1.236", "satuan", "6"],
      ].map((r, i) => tambah([idx(SUARA_D5, "puluhan"), idx(SUARA_D5, "ratusan"), idx(SUARA_D5, "ribuan"), idx(SUARA_D5, "satuan")][i], ...barisTabelD(`kr${i}`, 58 + i * 24, r, false))),
      tambah("Tambahan", ...kartu("tv", 40, 164, 220, 26, W.emas, ["tambahan video: nilai angka 6"], 8.8)),
    ),
  ],
};

/** Satu baris tabel tiga kolom (bilangan, tempat, nilai) untuk kunci nomor 2. */
function barisTabelD(id: string, y: number, isi: string[], kepala: boolean) {
  const kol = [100, 100, 80];
  let px = 10;
  return isi.flatMap((s, c) => {
    const x = px;
    px += kol[c];
    return [
      { id: `${id}-s${c}`, t: "kotak" as const, x, y, w: kol[c], h: 22, warna: kepala ? W.krem : W.putih, garis: W.biru, rx: 0, tebal: 1 },
      { id: `${id}-t${c}`, t: "teks" as const, x: x + kol[c] / 2, y: y + 15, isi: s, u: 9.4, warna: kepala || c === 0 ? W.biru : W.hijau },
    ];
  });
}

