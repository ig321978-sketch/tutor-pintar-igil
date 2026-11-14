import type { AdeganStory } from "./logika-story";
import { W, barisId, barisPikto, emo, judul, jumlahBaris, kartu, kunciPikto, rangkaPikto, teks, type Pikto } from "./k4b6a-gambar";
import { bersih, idx, k, redamkan, sorotkan, tambah } from "./k4b6a-bantu";

/* ------------------------------ 9. Ayo Berlatih nomor 1: piktogram kelereng (Buku Siswa hlm. 185; Panduan Guru hlm. 222) ------------------------------ */
/** Kelereng menurut Buku Siswa hlm. 185: Azizah 5, Karel 6, Putu 2, Slamet 8, Asep 5, Helen 4. Jumlah 30. */
export const NAMA_KELERENG = ["Azizah", "Karel", "Putu", "Slamet", "Asep", "Helen"];
export const KELERENG = [5, 6, 2, 8, 5, 4];
export const PKL: Pikto = {
  id: "kl",
  x: 40,
  y: 26,
  lw: 70,
  aw: 140,
  rh: 23,
  hh: 18,
  ik: 13,
  st: 16,
  ikon: { jenis: "bulat", warna: "#38BDF8" },
  label: NAMA_KELERENG,
  kepala: ["Nama", "Banyak Kelereng"],
};
const SUARA_L1 = "Ayo berlatih, soal satu. Data banyak kelereng yang dimiliki Slamet dan teman-temannya disajikan dalam tabel. Buatlah piktogram dengan gambar bulat yang menyatakan satu kelereng.";
const SUARA_L2 = "Datanya: Azizah lima, Karel enam, Putu dua, Slamet delapan, Asep lima, dan Helen empat.";
const SUARA_L3 = "Kunci jawaban di panduan guru memakai titik bulat untuk satu kelereng. Azizah lima titik, Karel enam, Putu dua, Slamet delapan, Asep lima, dan Helen empat titik.";
const SUARA_L4 = "Cocokkan dengan tabel: jumlah titik tiap baris sama dengan angkanya. Paling banyak Slamet, paling sedikit Putu. Jumlah semua kelereng, hitungan kita sendiri: lima, enam, dua, delapan, lima, empat, sama dengan tiga puluh.";

export const ADEGAN_BERLATIH_1: AdeganStory = {
  id: "berlatih-satu",
  judul: "Ayo Berlatih nomor 1: piktogram kelereng",
  sumber: "Buku Siswa hlm. 185; Panduan Guru hlm. 222",
  latar: "#EFF6FF",
  kutipan: [
    "Ayo Berlatih",
    "Jawablah pertanyaan berikut dengan benar dan salinlah jawaban kalian pada",
    "buku tulis.",
    "1. Perhatikan data banyak kelereng yang dimiliki Slamet dan teman-temannya!",
    "Azizah",
    "Karel",
    "Putu",
    "Slamet",
    "Asep",
    "Helen",
    "Buatlah piktogram dengan menggunakan gambar",
    "yang menyatakan",
    "1 kelereng!",
    "Buatlah piktogram dengan menggunakan gambar • yang menyatakan 1",
    "kelereng!",
    "Jawab:",
    "Azizah • • • • •",
    "Slamet • • • • • • • •",
  ],
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Ayo Berlatih 1")),
      tambah("Ayo", ...kartu("q1", 20, 34, 260, 40, W.krem, ["Data banyak kelereng Slamet", "dan teman-temannya"], 9.2)),
      tambah("Buatlah", ...kartu("q2", 20, 86, 260, 40, W.hijauMuda, ["Buat piktogram dari data itu"], 9.4)),
      tambah("bulat", emo("q3", 90, 160, "🔵", 36)),
      tambah("satu@2", teks("q4", 190, 166, "= 1 kelereng", 11, W.merah)),
    ),
    k(
      SUARA_L2,
      bersih(0),
      tambah(0, judul("Data kelereng")),
      tambah("Datanya:", rangkaPikto({ ...PKL, kepala: ["Nama", "Banyak Kelereng"] })),
      ...NAMA_KELERENG.map((n, i) => tambah(idx(SUARA_L2, ["lima", "enam", "dua", "delapan", "lima", "empat"][i], i === 4 ? 2 : 1), teks(`dt${i}`, PKL.x + PKL.lw + PKL.aw / 2, PKL.y + PKL.hh + i * PKL.rh + PKL.rh / 2 + 3.6, String(KELERENG[i]), 10, W.merah))),
    ),
    k(
      SUARA_L3,
      bersih(0),
      tambah(0, judul("Kunci: piktogram kelereng")),
      tambah("Kunci", rangkaPikto({ ...PKL, kepala: ["Nama", "Banyak Kelereng"] })),
      ...NAMA_KELERENG.map((n, i) => tambah(idx(SUARA_L3, n, 1), ...barisPikto(PKL, i, KELERENG[i]))),
    ),
    k(
      SUARA_L4,
      ...KELERENG.map((n, i) => tambah(idx(SUARA_L4, ["lima", "enam", "dua", "delapan", "lima", "empat"][i], i === 4 ? 2 : 1), jumlahBaris(PKL, i, n))),
      sorotkan("Slamet,", ...barisId(PKL, 3, 8)),
      redamkan("Putu.", ...barisId(PKL, 3, 8)),
      sorotkan("Putu.", ...barisId(PKL, 2, 2)),
      tambah("sama@2", teks("lj", 150, 195, "5 + 6 + 2 + 8 + 5 + 4 = 30", 10.4, W.merah)),
    ),
  ],
};

/* ------------------------------ 10. Ayo Berlatih nomor 2: buku yang dipinjam (Buku Siswa hlm. 185; Panduan Guru hlm. 222) ------------------------------ */
/** Banyak kotak tiap hari menurut gambar Buku Siswa hlm. 185 (satu kotak menyatakan 1 buku); kunci Panduan Guru: Selasa 6, Kamis 3, Jumat 12, Sabtu 14, jumlah 56. */
export const HARI = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
export const BUKU = [12, 6, 9, 3, 12, 14];
export const PBUKU: Pikto = {
  id: "bk",
  x: 10,
  y: 28,
  lw: 54,
  aw: 218,
  rh: 22,
  hh: 16,
  ik: 12,
  st: 15,
  ikon: { jenis: "kotak", warna: "#E8735F" },
  label: HARI,
  kepala: ["Hari", "Banyak Buku"],
};
const SUARA_M1 = "Soal dua. Buku yang dipinjam dari perpustakaan sekolah setiap harinya disajikan dalam piktogram. Setiap kotak menyatakan satu buku. Mari kita hitung kotak pada tiap hari.";
const SUARA_M2 = "Hasil hitungan kotak: Senin dua belas buku, Selasa enam, Rabu sembilan, Kamis tiga, Jumat dua belas, dan Sabtu empat belas.";
const SUARA_M3 = "Soal a: hari paling banyak dipinjam adalah Sabtu. Soal b: hari Selasa dipinjam enam buku. Soal c: hari paling sedikit adalah Kamis.";
const SUARA_M4 = "Soal d: hari dengan empat belas buku adalah Sabtu. Soal e: buku pada hari Kamis dan Jumat, tiga ditambah dua belas, sama dengan lima belas buku.";
const SUARA_M5 = "Soal f: jumlah total selama seminggu. Kunci panduan guru: lima puluh enam buku. Hitungan mandiri kita: dua belas, enam, sembilan, tiga, dua belas, dan empat belas juga lima puluh enam. Kunci benar.";

export const ADEGAN_BERLATIH_2: AdeganStory = {
  id: "berlatih-dua",
  judul: "Ayo Berlatih nomor 2: buku yang dipinjam",
  sumber: "Buku Siswa hlm. 185; Panduan Guru hlm. 222",
  latar: "#FFF7ED",
  kutipan: [
    "2. Banyaknya buku yang dipinjam dari perpustakaan sekolah setiap harinya",
    "disajikan pada piktogram berikut.",
    "menyatakan 1 buku",
    "a. Hari apakah buku yang paling banyak dipinjam siswa?",
    "b. Pada hari Selasa, berapa buku yang dipinjam siswa?",
    "c. Hari apakah buku yang paling sedikit dipinjam siswa?",
    "d. Pada hari apakah buku yang dipinjam siswa sebanyak 14?",
    "e. Berapa banyak buku yang dipinjam siswa pada hari Kamis dan Jumat?",
    "f. Berapa jumlah total buku yang dipinjam siswa selama satu minggu?",
    "Berdasarkan penyajian piktogram maka diperoleh:",
    "a. Hari apakah buku yang paling banyak dipinjam siswa? Sabtu",
    "b. Pada hari Selasa, berapa buku yang dipinjam siswa? 6 Buku",
    "c. Hari apakah buku yang paling sedikit dipinjam siswa? Kamis",
    "d. Pada hari apakah buku yang dipinjam siswa sebanyak 14? Sabtu",
    "buku + 12 buku = 15 buku",
    "56",
  ],
  ketukan: [
    k(SUARA_M1, tambah(0, judul("Buku dipinjam per hari")), tambah("Soal", rangkaPikto(PBUKU)), tambah("kotak", ...kunciPikto(PBUKU, 6, { jenis: "kotak", warna: "#E8735F" }, "menyatakan 1 buku"))),
    k(
      SUARA_M2,
      ...HARI.map((h, i) => tambah(h, ...barisPikto(PBUKU, i, BUKU[i]), jumlahBaris(PBUKU, i, BUKU[i]))),
    ),
    k(
      SUARA_M3,
      bersih(0),
      tambah(0, judul("Soal a, b, dan c")),
      tambah(idx(SUARA_M3, "Soal", 1), ...kartu("a1", 14, 34, 272, 34, W.hijauMuda, ["a. paling banyak: Sabtu (14 kotak)"], 9)),
      tambah(idx(SUARA_M3, "Soal", 2), ...kartu("a2", 14, 76, 272, 34, W.langit, ["b. hari Selasa: 6 buku"], 9)),
      tambah(idx(SUARA_M3, "Soal", 3), ...kartu("a3", 14, 118, 272, 34, W.krem, ["c. paling sedikit: Kamis (3 kotak)"], 9)),
      tambah("Kamis.", emo("a4", 150, 184, "📚", 24)),
    ),
    k(
      SUARA_M4,
      bersih(0),
      tambah(0, judul("Soal d dan e")),
      tambah(idx(SUARA_M4, "Soal", 1), ...kartu("d1", 14, 34, 272, 34, W.hijauMuda, ["d. 14 buku: hari Sabtu"], 9)),
      tambah(idx(SUARA_M4, "Soal", 2), ...kartu("d2", 14, 76, 272, 34, W.langit, ["e. Kamis dan Jumat"], 9)),
      tambah("tiga", teks("d3", 150, 140, "3 + 12 = 15", 13, W.merah)),
      tambah("lima", teks("d4", 150, 164, "15 buku", 11, W.hijau)),
    ),
    k(
      SUARA_M5,
      bersih(0),
      tambah(0, judul("Soal f: jumlah seminggu")),
      tambah("Kunci", ...kartu("f1", 40, 32, 220, 30, W.krem, ["kunci buku: 56 buku"], 10)),
      tambah("mandiri", teks("f2", 150, 100, "12 + 6 + 9 + 3 + 12 + 14", 11, W.biru)),
      tambah("juga", teks("f3", 150, 124, "= 56", 13, W.merah)),
      tambah("benar.", emo("f4", 150, 168, "✅", 26)),
    ),
  ],
};

/* ------------------------------ 11. Ayo Berpikir: siswa tiap kelas dengan skala 4 (Buku Siswa hlm. 186; Panduan Guru hlm. 223) ------------------------------ */
/** Gambar siswa tiap kelas menurut Buku Siswa hlm. 186 (satu gambar menyatakan 4 siswa): I 6, II 6, III 7, IV 8, V 5, VI 7. Jumlah 39 gambar, 156 siswa. */
export const GAMBAR_KELAS = [6, 6, 7, 8, 5, 7];
export const NAMA_KELAS = ["I", "II", "III", "IV", "V", "VI"];
export const PS: Pikto = {
  id: "ks",
  x: 16,
  y: 28,
  lw: 40,
  aw: 170,
  rh: 22,
  hh: 16,
  ik: 16,
  st: 20,
  ikon: { jenis: "emoji", e: "👤" },
  label: NAMA_KELAS,
  kepala: ["Kelas", "Banyak Siswa"],
};
const SUARA_N1 = "Ayo berpikir. Banyak siswa tiap kelas disajikan dalam piktogram, dari kelas satu, dua, tiga, empat, lima, sampai enam. Perhatikan keterangannya: satu gambar siswa menyatakan empat siswa, bukan satu.";
const SUARA_N2 = "Soal a dan b. Kelas yang siswanya paling sedikit adalah kelas lima, karena hanya lima gambar. Paling banyak adalah kelas empat, dengan delapan gambar.";
const SUARA_N3 = "Soal c: banyak siswa kelas empat. Ada delapan gambar, satu gambar menyatakan empat siswa, jadi delapan kali empat sama dengan tiga puluh dua siswa.";
const SUARA_N4 = "Soal d: kelas dengan dua puluh empat siswa. Enam gambar kali empat sama dengan dua puluh empat, jadi kelas satu dan kelas dua, karena keduanya punya enam gambar.";
const SUARA_N5 = "Soal e: seluruh siswa. Jumlah gambarnya tiga puluh sembilan, dan tiga puluh sembilan kali empat sama dengan seratus lima puluh enam siswa. Kunci benar, dan hitungan baris demi baris juga sama.";

export const ADEGAN_BERPIKIR: AdeganStory = {
  id: "ayo-berpikir",
  judul: "Ayo Berpikir: siswa tiap kelas",
  sumber: "Buku Siswa hlm. 186; Panduan Guru hlm. 223",
  latar: "#F5F3FF",
  kutipan: [
    "Ayo Berpikir",
    "Salinlah jawaban kalian pada buku tulis.",
    "Diberikan data siswa untuk masing-masing kelas disajikan dalam piktogram",
    "berikut.",
    "menyatakan 4 siswa",
    "a. Kelas berapakah yang siswanya paling sedikit?",
    "b. Kelas berapakah yang siswanya paling banyak?",
    "c. Berapa banyak siswa kelas IV?",
    "d. Kelas berapakah yang siswanya 24 siswa?",
    "e. Berapa banyak semua siswa seluruh kelas?",
    "a. Kelas berapakah yang siswanya paling sedikit? kelas V",
    "b. Kelas berapakah yang siswanya paling banyak? kelas IV",
    "terdapat 8 gambar siswa, satu gambar siswa",
    "menyatakan 4 siswa sehingga banyak siswa kelas IV adalah 8 x 4 = 32 siswa",
    "kelas I dan kelas II, karena",
    "terdapat 6 gambar siswa sehingga 6 x 4 = 24 siswa",
    "39 x 4 = 156 siswa",
  ],
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Ayo Berpikir: skala empat")),
      tambah("siswa", rangkaPikto(PS)),
      ...GAMBAR_KELAS.map((n, i) => tambah(idx(SUARA_N1, ["satu", "dua", "tiga", "empat", "lima", "enam"][i], 1), ...barisPikto(PS, i, n))),
      tambah("keterangannya:", ...kunciPikto(PS, 6, { jenis: "emoji", e: "👤" }, "menyatakan 4 siswa")),
    ),
    k(
      SUARA_N2,
      sorotkan("lima,", ...barisId(PS, 4, 5)),
      tambah("hanya", jumlahBaris(PS, 4, 5)),
      redamkan(idx(SUARA_N2, "Paling", 2), ...barisId(PS, 4, 5)),
      sorotkan("empat,", ...barisId(PS, 3, 8)),
      tambah("delapan", jumlahBaris(PS, 3, 8)),
    ),
    k(
      SUARA_N3,
      redamkan(0, ...barisId(PS, 3, 8)),
      sorotkan("kelas", ...barisId(PS, 3, 8)),
      tambah("kali", teks("n3", 266, PS.y + PS.hh + 3 * PS.rh + PS.rh / 2 + 3.4, "8×4=32", 9.4, W.merah)),
    ),
    k(
      SUARA_N4,
      redamkan(0, ...barisId(PS, 3, 8)),
      sorotkan("kelas", ...barisId(PS, 0, 6), ...barisId(PS, 1, 6)),
      tambah("Enam", jumlahBaris(PS, 0, 6), jumlahBaris(PS, 1, 6)),
      tambah("kali", teks("n40", 266, PS.y + PS.hh + PS.rh / 2 + 3.4, "6×4=24", 9.4, W.merah), teks("n41", 266, PS.y + PS.hh + PS.rh + PS.rh / 2 + 3.4, "6×4=24", 9.4, W.merah)),
    ),
    k(
      SUARA_N5,
      bersih(0),
      tambah(0, judul("Soal e: seluruh siswa")),
      tambah("Jumlah", ...kartu("e1", 20, 34, 260, 30, W.hijauMuda, ["6+6+7+8+5+7 = 39 gambar"], 9.6)),
      tambah("kali", ...kartu("e2", 20, 72, 260, 30, W.langit, ["39 × 4 = 156 siswa"], 10)),
      tambah("Kunci", ...kartu("e3", 20, 110, 260, 30, W.krem, ["kunci buku: 156 (benar)"], 9.6)),
      tambah("baris", ...kartu("e4", 20, 148, 260, 40, W.pink, ["24+24+28+32+20+28", "= 156 siswa juga"], 9.2)),
    ),
  ],
};

/* ------------------------------ 12. Penutup subbab: miskonsepsi, diferensiasi, refleksi, catatan buku ------------------------------ */
const SUARA_T1 = "Panduan guru mencatat miskonsepsi: piktogram disebut juga diagram gambar. Ada anak yang mengira piktogram bukan diagram gambar. Padahal keduanya adalah satu hal yang sama.";
const SUARA_T2 = "Untuk diferensiasi, model yang disarankan adalah Project Based Learning, yang mengutamakan produk hasil karya kelompok. Bila kelas belum memungkinkan, guru boleh memakai metode diskusi.";
const SUARA_T3 = "Refleksi: adakah bagian yang masih dirasa sulit? Bila ada, diskusikan dengan teman, minta bantuan guru, dan perbanyak latihan soal. Kalian sudah bisa menentukan data paling banyak dan paling sedikit.";
const SUARA_T4 = "Catatan dari memeriksa buku: semua kunci subbab ini benar. Tetapi panduan guru menyebut skala hanya satu satuan, padahal Ayo Berpikir memakai satu gambar untuk empat siswa.";
const SUARA_T5 = "Ringkasan subbab A: piktogram memakai gambar untuk menyatakan banyak data. Baca keterangan, hitung gambar, lalu tentukan paling banyak, paling sedikit, dan jumlahnya.";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup-subbab",
  judul: "Miskonsepsi, diferensiasi, refleksi, dan catatan buku",
  sumber: "Panduan Guru hlm. 223; Buku Siswa hlm. 194",
  latar: "#FFF7ED",
  kutipan: [
    "Miskonsepsi",
    "Piktogram disebut juga diagram gambar. Miskonsepsi yang biasa terjadi",
    "adalah piktogram bukan diagram gambar",
    "Diferensiasi",
    "Model pembelajaran",
    "yang disarankan untuk sub bab piktogram adalah Project Based Learning,",
    "yang mengutamakan pada produk hasil karya peserta didik bersama",
    "guru dapat menerapkan metode diskusi dengan melibatkan peserta didik dalam menyajikan data dalam bentuk",
    "Refleksi",
    "Adakah bagian yang masih",
    "dirasa sulit?",
    "diskusikanlah dengan teman kalian",
    "Perbanyaklah",
    "mengerjakan latihan soal.",
    "Kalian juga telah dapat menentukan data paling banyak dan paling sedikit",
  ],
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Miskonsepsi")),
      tambah("Piktogram", ...kartu("x1", 14, 34, 120, 36, W.pink, ["piktogram"], 10.4)),
      tambah("diagram", ...kartu("x2", 166, 34, 120, 36, W.hijauMuda, ["diagram gambar"], 10)),
      tambah("mengira", teks("x3", 150, 58, "≠", 20, W.merah)),
      tambah("Padahal", ...kartu("x4", 30, 100, 240, 36, W.krem, ["piktogram = diagram gambar"], 10.4)),
      tambah("sama.", emo("x5", 150, 172, "✅", 26)),
    ),
    k(
      SUARA_T2,
      bersih(0),
      tambah(0, judul("Diferensiasi")),
      tambah("Project", ...kartu("y1", 14, 34, 272, 40, W.hijauMuda, ["Project Based Learning", "produk hasil karya kelompok"], 9)),
      tambah("kelompok.", ...kartu("y2", 14, 84, 272, 30, W.langit, ["ketua kelompok: kemampuan tinggi"], 8.8)),
      tambah("metode", ...kartu("y3", 14, 124, 272, 30, W.krem, ["bila perlu: metode diskusi"], 8.8)),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Refleksi")),
      tambah("adakah", ...kartu("r1", 14, 34, 272, 30, W.hijauMuda, ["adakah bagian yang masih sulit?"], 9)),
      tambah("diskusikan", ...kartu("r2", 14, 72, 272, 30, W.langit, ["diskusikan dengan teman"], 9)),
      tambah("guru,", ...kartu("r3", 14, 110, 272, 30, W.krem, ["minta bantuan guru"], 9)),
      tambah("perbanyak", ...kartu("r4", 14, 148, 272, 30, W.pink, ["perbanyak latihan soal"], 9)),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Catatan dari buku")),
      tambah("kunci", ...kartu("c1", 14, 34, 272, 34, W.hijauMuda, ["semua kunci subbab ini benar"], 9)),
      tambah("hanya", ...kartu("c2", 14, 76, 272, 44, W.krem, ["Panduan Guru: skala hanya satu satuan"], 8.6)),
      tambah("empat", ...kartu("c3", 14, 130, 272, 44, W.pink, ["Ayo Berpikir: satu gambar = 4 siswa"], 8.6)),
    ),
    k(
      SUARA_T5,
      bersih(0),
      tambah(0, judul("Ringkasan subbab A")),
      tambah("memakai", ...kartu("z1", 14, 34, 272, 28, W.hijauMuda, ["gambar menyatakan banyak data"], 9)),
      tambah("keterangan,", ...kartu("z2", 14, 68, 272, 28, W.langit, ["1. baca keterangan"], 9)),
      tambah("hitung", ...kartu("z3", 14, 102, 272, 28, W.krem, ["2. hitung gambar"], 9)),
      tambah("tentukan", ...kartu("z4", 14, 136, 272, 28, W.pink, ["3. paling banyak, paling sedikit, jumlah"], 8.4)),
      tambah("jumlahnya.", emo("z5", 150, 190, "🌟", 22)),
    ),
  ],
};

