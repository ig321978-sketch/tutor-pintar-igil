import type { AdeganStory } from "./logika-story";
import { W, barisId, barisPikto, emo, judul, jumlahBaris, kartu, kunciPikto, rangkaPikto, teks, type Pikto } from "./k4b6a-gambar";
import { bersih, hapus, idx, k, redamkan, sebar, sorotkan, tambah } from "./k4b6a-bantu";

/* ------------------------------ 5. Ayo Mengamati: benda di dalam kelas (Buku Siswa hlm. 180; Panduan Guru hlm. 220) ------------------------------ */
/** Banyak benda di kelas menurut Buku Siswa hlm. 180: 2 papan tulis, 1 jam dinding, 1 lemari, 8 hiasan dinding. */
export const KELAS = [2, 1, 1, 8];
export const PK: Pikto = {
  id: "kl",
  x: 22,
  y: 30,
  lw: 82,
  aw: 144,
  rh: 26,
  hh: 18,
  ik: 15,
  st: 17,
  ikon: [{ jenis: "kotak", warna: "#374151" }, { jenis: "emoji", e: "🕒" }, { jenis: "emoji", e: "🚪" }, { jenis: "emoji", e: "🖼" }],
  label: ["Papan Tulis", "Jam Dinding", "Lemari", "Hiasan Dinding"],
  kepala: ["Benda", "Banyak Benda"],
};
const SUARA_B1 = "Ayo mengamati. Informasi benda dalam kelas: dua papan tulis, satu jam dinding, satu lemari, dan delapan hiasan dinding. Semuanya disajikan dalam bentuk piktogram.";
const SUARA_B2 = "Pertanyaan buku: benda apakah yang paling banyak dan paling sedikit? Paling banyak adalah hiasan dinding, sebanyak delapan. Paling sedikit adalah jam dinding dan lemari.";
const SUARA_B3 = "Perhatikan, dua benda sama-sama paling sedikit, masing-masing satu, jadi keduanya disebut. Jumlah seluruh benda adalah dua ditambah satu ditambah satu ditambah delapan, hitungan kita sendiri, sama dengan dua belas.";
const SUARA_B4 = "Panduan guru berpesan, kegiatan ini boleh diganti sesuai kondisi kelas, supaya yang disajikan benar-benar benda di sekitar peserta didik. Interpretasi kelas empat hanya tiga: paling banyak, paling sedikit, dan jumlah keseluruhan.";

export const ADEGAN_KELAS: AdeganStory = {
  id: "benda-kelas",
  judul: "Ayo Mengamati: benda di dalam kelas",
  sumber: "Buku Siswa hlm. 180; Panduan Guru hlm. 220",
  latar: "#F0FDF4",
  kutipan: [
    "Ayo Mengamati",
    "Perhatikan data benda yang ada di dalam kelas berikut ini.",
    "Informasi benda dalam kelas: 2 papan tulis, 1 jam dinding, 1 lemari dan 8 hiasan",
    "dinding dapat disajikan dalam bentuk piktogram di bawah ini.",
    "Benda apakah yang paling",
    "banyak dan paling sedikit?",
    "hiasan dinding dan benda yang paling",
    "sedikit adalah jam dinding dan lemari",
    "Guru meminta peserta didik untuk menghitung banyak papan tulis, jam dinding,",
    "lemari dan hiasan dinding.",
    "Kegiatan ini dapat diganti disesuaikan kondisi di",
    "dalam kelas masing-masing guru",
    "Interpretasi untuk kelas IV materi piktogram hanya pada",
    "data paling banyak, data paling sedikit, jumlah data keseluruhan.",
  ],
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Benda di dalam kelas")),
      tambah("Informasi", rangkaPikto(PK)),
      tambah("dua", ...barisPikto(PK, 0, 2)),
      tambah(idx(SUARA_B1, "satu", 1), ...barisPikto(PK, 1, 1)),
      tambah(idx(SUARA_B1, "satu", 2), ...barisPikto(PK, 2, 1)),
      tambah("delapan", ...barisPikto(PK, 3, 8)),
    ),
    k(
      SUARA_B2,
      tambah("pertanyaan", ...kartu("pq", 22, 160, 256, 30, W.krem, ["paling banyak? paling sedikit?"], 9.2)),
      sorotkan("hiasan", ...barisId(PK, 3, 8)),
      tambah("sebanyak", jumlahBaris(PK, 3, 8)),
      redamkan(idx(SUARA_B2, "sedikit", 2), ...barisId(PK, 3, 8)),
      sorotkan("jam", ...barisId(PK, 1, 1), ...barisId(PK, 2, 1)),
      tambah("lemari.", jumlahBaris(PK, 1, 1), jumlahBaris(PK, 2, 1)),
    ),
    k(
      SUARA_B3,
      hapus(0, "pq-k", "pq-t0"),
      redamkan(0, ...barisId(PK, 1, 1), ...barisId(PK, 2, 1)),
      tambah("sama-sama", jumlahBaris(PK, 0, 2)),
      sorotkan("sama-sama", ...barisId(PK, 1, 1), ...barisId(PK, 2, 1)),
      tambah("seluruh", teks("jm", 150, 172, "2 + 1 + 1 + 8", 11, W.biru)),
      tambah(idx(SUARA_B3, "sama"), teks("jm2", 150, 190, "= 12 benda", 11, W.merah)),
    ),
    k(
      SUARA_B4,
      bersih(0),
      tambah(0, judul("Pesan panduan guru")),
      tambah("kegiatan", ...kartu("p1", 14, 34, 272, 40, W.hijauMuda, ["boleh diganti sesuai kondisi kelas", "benda di sekitar peserta didik"], 8.6)),
      tambah("banyak,", ...kartu("p2", 14, 88, 272, 28, W.langit, ["1. paling banyak"], 9.4)),
      tambah("sedikit,", ...kartu("p3", 14, 122, 272, 28, W.krem, ["2. paling sedikit"], 9.4)),
      tambah("keseluruhan.", ...kartu("p4", 14, 156, 272, 28, W.pink, ["3. jumlah keseluruhan"], 9.4)),
    ),
  ],
};

/* ------------------------------ 6. Mainan Karel (Buku Siswa hlm. 181) ------------------------------ */
/** Mainan Karel menurut Buku Siswa hlm. 181: 6 mobil, 4 robot, 3 pesawat, 1 puzzle, 9 kelereng. */
export const KAREL = [6, 4, 3, 1, 9];
export const PKAREL: Pikto = {
  id: "kr",
  x: 14,
  y: 30,
  lw: 56,
  aw: 170,
  rh: 24,
  hh: 18,
  ik: 15,
  st: 18,
  ikon: [{ jenis: "emoji", e: "🚗" }, { jenis: "emoji", e: "🤖" }, { jenis: "emoji", e: "🛩" }, { jenis: "emoji", e: "🧩" }, { jenis: "bulat", warna: "#38BDF8" }],
  label: ["Mobil", "Robot", "Pesawat", "Puzzle", "Kelereng"],
  kepala: ["Mainan", "Banyak Mainan"],
};
const SUARA_C1 = "Bu guru bertanya, Karel, berapa banyak mainan di rumahmu? Karel menjawab, enam mobil, empat robot, tiga pesawat, satu puzzle, dan sembilan kelereng.";
const SUARA_C2 = "Perhatikan, tiap jenis mainan punya gambarnya sendiri, tetapi satu gambar tetap berarti satu mainan. Yang kita hitung adalah banyaknya gambar pada tiap baris.";
const SUARA_C3 = "Mainan Karel yang paling banyak adalah kelereng, sebanyak sembilan buah. Yang paling sedikit adalah puzzle, sebanyak satu buah.";
const SUARA_C4 = "Jumlah seluruh mainan Karel: enam ditambah empat ditambah tiga ditambah satu ditambah sembilan, sama dengan dua puluh tiga buah mainan. Hitungan buku ini benar.";
const SUARA_C5 = "Buku lalu meminta kalian memakai penyajian Aktivitas satu: alat tulis apa yang paling banyak dan paling sedikit, berapa jumlah seluruhnya, dan berapa buku tulis yang kalian bawa. Jawabannya tergantung isi tas kalian.";

export const ADEGAN_KAREL: AdeganStory = {
  id: "mainan-karel",
  judul: "Mainan Karel: membaca, membandingkan, menjumlahkan",
  sumber: "Buku Siswa hlm. 181",
  latar: "#FFF7ED",
  kutipan: [
    "Bagus Karel, berapa banyak mainan di rumahmu?",
    "Banyak Bu. Terdapat 6 mobil, 4 robot, 3 pesawat,",
    "1 puzzle, dan 9 kelereng",
    "Informasi banyaknya mainan Karel dapat disajikan dalam piktogram sebagai",
    "berikut.",
    "Mainan Karel yang paling banyak adalah kelereng yaitu sebanyak 9 buah.",
    "Mainan Karel yang paling sedikit adalah puzzle yaitu sebanyak 1 buah.",
    "jumlah seluruh mainan Karel adalah 6 + 4 + 3 + 1 + 9 = 23 buah mainan.",
    "Berdasarkan penyajian Langkah 4 Aktivitas 1, jawablah pertanyaan berikut:",
    "a. Alat tulis apakah yang paling banyak?",
    "b. Alat tulis apakah yang paling sedikit?",
    "c. Berapa jumlah keseluruhan alat tulis yang terdapat dalam tas sekolah kalian?",
    "d. Berapakah buku tulis yang kalian bawa?",
  ],
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Mainan Karel")),
      tambah("bertanya,", emo("bu", 30, 192, "👩", 24)),
      tambah("Karel", rangkaPikto(PKAREL)),
      tambah("enam", ...barisPikto(PKAREL, 0, 6)),
      tambah("empat", ...barisPikto(PKAREL, 1, 4)),
      tambah("tiga", ...barisPikto(PKAREL, 2, 3)),
      tambah(idx(SUARA_C1, "satu"), ...barisPikto(PKAREL, 3, 1)),
      tambah("sembilan", ...barisPikto(PKAREL, 4, 9)),
    ),
    k(
      SUARA_C2,
      ...[0, 1, 2, 3, 4].map((i) => tambah(sebar(SUARA_C2, 5, idx(SUARA_C2, "hitung"))[i], jumlahBaris(PKAREL, i, KAREL[i]))),
      tambah("gambarnya", teks("kc", 150, 186, "1 gambar = 1 mainan", 10, W.merah)),
    ),
    k(
      SUARA_C3,
      hapus(0, "kc"),
      sorotkan("kelereng,", ...barisId(PKAREL, 4, 9)),
      tambah("sebanyak", teks("kb", 170, 182, "paling banyak: kelereng, 9", 9.4, W.hijau)),
      redamkan(idx(SUARA_C3, "sedikit"), ...barisId(PKAREL, 4, 9)),
      sorotkan("puzzle,", ...barisId(PKAREL, 3, 1)),
      tambah(idx(SUARA_C3, "satu"), teks("ks", 170, 196, "paling sedikit: puzzle, 1", 9.4, W.merah)),
    ),
    k(
      SUARA_C4,
      bersih(0),
      tambah(0, judul("Jumlah seluruh mainan")),
      tambah("enam", ...kartu("j1", 20, 34, 260, 26, W.hijauMuda, ["6 mobil"], 9.4)),
      tambah("empat", ...kartu("j2", 20, 64, 260, 26, W.langit, ["4 robot"], 9.4)),
      tambah("tiga", ...kartu("j3", 20, 94, 260, 26, W.krem, ["3 pesawat"], 9.4)),
      tambah(idx(SUARA_C4, "satu"), ...kartu("j4", 20, 124, 260, 26, W.pink, ["1 puzzle"], 9.4)),
      tambah("sembilan", ...kartu("j5", 20, 154, 260, 26, W.jingga, ["9 kelereng"], 9.4)),
      tambah("sama", teks("jt", 150, 197, "6 + 4 + 3 + 1 + 9 = 23", 12, W.merah)),
    ),
    k(
      SUARA_C5,
      bersih(0),
      tambah(0, judul("Giliran kalian: alat tulis")),
      tambah("paling", ...kartu("w1", 14, 34, 272, 28, W.hijauMuda, ["a. alat tulis apa yang paling banyak?"], 8.6)),
      tambah("sedikit", ...kartu("w2", 14, 68, 272, 28, W.langit, ["b. alat tulis apa yang paling sedikit?"], 8.6)),
      tambah("jumlah", ...kartu("w3", 14, 102, 272, 28, W.krem, ["c. berapa jumlah keseluruhan alat tulis?"], 8.6)),
      tambah("berapa@2", ...kartu("w4", 14, 136, 272, 28, W.pink, ["d. berapa buku tulis yang kalian bawa?"], 8.6)),
      tambah(idx(SUARA_C5, "tas"), emo("w5", 150, 192, "🎒", 22)),
    ),
  ],
};

/* ------------------------------ 7. Aktivitas 2: penyajian piktogram dengan skala (Buku Siswa hlm. 182; Panduan Guru hlm. 220–221) ------------------------------ */
const SUARA_D1 = "Aktivitas dua, penyajian piktogram dengan skala. Perlengkapannya adalah bunga di halaman sekolah. Panduan guru mengajak peserta didik belajar di luar kelas, dalam kelompok yang sama seperti Aktivitas satu.";
const SUARA_D2 = "Langkahnya: perhatikan warna bunga di halaman sekolah atau depan kelas, catat warna dan banyaknya, lalu gambar tabel dua kolom, warna bunga dan banyak bunga.";
const SUARA_D3 = "Langkah empat: isi kolom satu dengan warna, misalnya putih, merah, dan kuning, lalu gambar bunga di kolom dua sebanyak bunga yang ada. Gambar bunga harus sama untuk setiap baris.";
const SUARA_D4 = "Tambahkan satu baris terakhir dan tulis: gambar bunga menyatakan satu bunga. Baris ini adalah keterangan, dan skalanya satu gambar untuk satu bunga.";
const SUARA_D5 = "Panduan guru menegaskan, gambar bunga harus sama, dan satu gambar bunga menyatakan banyaknya satu bunga. Setelah itu salah satu kelompok menyajikan piktogram dari data yang mereka peroleh.";
const PD: Pikto = { id: "bg", x: 26, y: 40, lw: 100, aw: 148, rh: 28, hh: 20, ik: 17, st: 22, ikon: { jenis: "emoji", e: "🌸" }, label: ["Putih", "Merah", "Kuning"], kepala: ["Warna Bunga", "Banyak Bunga"] };

export const ADEGAN_AKTIVITAS2: AdeganStory = {
  id: "aktivitas-dua",
  judul: "Aktivitas 2: piktogram dengan skala",
  sumber: "Buku Siswa hlm. 182; Panduan Guru hlm. 220–221",
  latar: "#FDF2F8",
  kutipan: [
    "Aktivitas 2. Penyajian Piktogram dengan skala",
    "Bunga di halaman sekolah",
    "1. Perhatikanlah warna-warna bunga yang terdapat di halaman sekolah/",
    "depan kelas",
    "2. Catatlah warna-warna bunga dan banyaknya bunga sesuai warna",
    "3. Gambarlah tabel dengan dua kolom, kolom 1 menyatakan warna bunga",
    "dan kolom 2 menyatakan banyak bunga.",
    "(catatan: gambar bunga harus sama).",
    "Tambahkan satu baris terakhir dan tulislah “gambar bunga menyatakan 1",
    "bunga”",
    "Gambar bunga menyatakan 1 bunga",
    "Guru mengajak peserta didik untuk belajar di luar kelas",
    "Guru menjelaskan",
    "bahwa satu gambar bunga menyatakan banyaknya satu bunga.",
  ],
  ketukan: [
    k(SUARA_D1, tambah(0, judul("Aktivitas 2: bunga")), tambah("Aktivitas", ...kartu("h1", 40, 34, 220, 30, W.emas, ["Aktivitas 2: skala"], 10.4)), tambah("bunga", emo("h2", 70, 110, "🌸", 36), emo("h3", 150, 110, "🌼", 36), emo("h4", 230, 110, "🌺", 36)), tambah("luar", ...kartu("h5", 30, 140, 240, 30, W.hijauMuda, ["belajar di luar kelas"], 9.4)), tambah("kelompok", ...kartu("h6", 30, 176, 240, 24, W.krem, ["kelompok yang sama"], 9))),
    k(
      SUARA_D2,
      bersih(0),
      tambah(0, judul("Langkah 1 sampai 3")),
      tambah("perhatikan", ...kartu("m1", 14, 32, 272, 28, W.hijauMuda, ["1. perhatikan warna bunga"], 9)),
      tambah("catat", ...kartu("m2", 14, 66, 272, 28, W.langit, ["2. catat warna dan banyaknya"], 9)),
      tambah("tabel", ...kartu("m3", 14, 100, 272, 28, W.krem, ["3. gambar tabel dua kolom"], 9)),
      tambah(idx(SUARA_D2, "warna", 3), teks("m4", 70, 156, "Warna Bunga", 9.4, W.coklat), teks("m5", 220, 156, "Banyak Bunga", 9.4, W.coklat)),
    ),
    k(
      SUARA_D3,
      bersih(0),
      tambah(0, judul("Langkah 4: isi tabel")),
      tambah("isi", rangkaPikto(PD)),
      tambah("putih,", ...barisPikto(PD, 0, 4)),
      tambah("merah,", ...barisPikto(PD, 1, 2)),
      tambah("kuning,", ...barisPikto(PD, 2, 3)),
      tambah("sama", teks("dc", 150, 186, "(contoh gambar; isi sesuai bunga kalian)", 8, W.merah)),
    ),
    k(
      SUARA_D4,
      hapus(0, "dc"),
      tambah("baris", ...kunciPikto(PD, 3, { jenis: "emoji", e: "🌸" }, "menyatakan 1 bunga")),
      sorotkan("keterangan,", "bg-kk"),
      tambah("skalanya", teks("dd", 150, 190, "skala: 1 gambar untuk 1 bunga", 9.4, W.merah)),
    ),
    k(
      SUARA_D5,
      bersih(0),
      tambah(0, judul("Pesan panduan guru")),
      tambah("sama,", ...kartu("n1", 14, 34, 272, 30, W.hijauMuda, ["gambar bunga harus sama"], 9.4)),
      tambah("satu@2", ...kartu("n2", 14, 72, 272, 30, W.langit, ["1 gambar bunga = 1 bunga"], 9.4)),
      tambah("kelompok", ...kartu("n3", 14, 110, 272, 30, W.krem, ["satu kelompok menyajikan piktogramnya"], 9)),
      tambah("data", emo("n4", 150, 178, "🌼", 28)),
    ),
  ],
};

/* ------------------------------ 8. Warna kesukaan dan definisi piktogram (Buku Siswa hlm. 183–184; Panduan Guru hlm. 221) ------------------------------ */
/** Warna kesukaan siswa menurut Buku Siswa hlm. 183: ungu 4, kuning 2, hitam 1, merah 5 (satu gambar menyatakan 1 siswa). */
export const WARNA = [4, 2, 1, 5];
export const PW: Pikto = {
  id: "wk",
  x: 40,
  y: 30,
  lw: 70,
  aw: 128,
  rh: 28,
  hh: 18,
  ik: 18,
  st: 24,
  ikon: { jenis: "emoji", e: "👤" },
  label: ["Ungu", "Kuning", "Hitam", "Merah"],
  kepala: ["Warna", "Banyak Siswa"],
};
const SUARA_E1 = "Ayo mengamati piktogram warna kesukaan siswa. Ada empat warna: ungu, kuning, hitam, dan merah. Di bawah tabel ada keterangan: satu gambar siswa menyatakan satu siswa.";
const SUARA_E2 = "Berapa siswa yang menyukai warna hitam? Hanya ada satu gambar, jadi satu siswa. Warna apa yang paling banyak disukai? Merah, karena jumlahnya lima gambar.";
const SUARA_E3 = "Sekarang hitung semuanya: ungu empat siswa, kuning dua, hitam satu, merah lima. Jumlahnya empat ditambah dua ditambah satu ditambah lima, sama dengan dua belas siswa.";
const SUARA_E4 = "Buku kembali ke piktogram bunga kalian: warna bunga apa yang paling banyak dan paling sedikit, berapa jumlah seluruh bunga, dan berapa bunga yang berwarna merah. Jawabannya dari data kelompok kalian.";
const SUARA_E5 = "Inilah definisinya. Piktogram adalah diagram yang menggunakan gambar sebagai jumlah setiap kategori. Piktogram disebut juga diagram gambar.";
const SUARA_E6 = "Pada Aktivitas satu, tiap alat digambar sesuai bendanya. Pada Aktivitas dua, gambarnya sama dan mewakili satu bunga. Membaca piktogram berarti memperhatikan banyaknya gambar.";

export const ADEGAN_WARNA: AdeganStory = {
  id: "warna-kesukaan",
  judul: "Warna kesukaan siswa dan definisi piktogram",
  sumber: "Buku Siswa hlm. 183–184; Panduan Guru hlm. 221",
  latar: "#FAF5FF",
  kutipan: [
    "Perhatikan piktogram warna kesukaan siswa berikut. Berapa",
    "siswa yang menyukai warna hitam?",
    "menyatakan 1 siswa",
    "pada piktogram berarti",
    "siswa yang menyukai warna hitam adalah 1 siswa",
    "Warna apakah yang paling banyak disukai?",
    "Warna merah Bu, karena jumlahnya 5 gambar",
    "banyak siswa menyukai warna ungu adalah 4 siswa (karena ada 4",
    "banyak siswa menyukai warna merah adalah 5 siswa (karena ada 5",
    "Banyak keseluruhan siswa yang menyukai warna ungu, kuning, hitam dan",
    "merah adalah 4 + 2 + 1 + 5 = 12 siswa.",
    "a. Warna bunga apakah yang paling banyak?",
    "d. Berapa bunga yang berwarna merah?",
    "Piktogram, yaitu diagram yang menggunakan gambar untuk memberikan",
    "informasi jumlah kategori/item.",
    "Piktogram adalah diagram yang menggunakan gambar sebagai jumlah setiap",
    "kategori. Piktogram disebut juga diagram gambar.",
    "Membaca piktogram memperhatikan banyaknya gambar",
  ],
  ketukan: [
    k(
      SUARA_E1,
      tambah(0, judul("Warna kesukaan siswa")),
      tambah("piktogram", rangkaPikto(PW)),
      tambah("ungu,", ...barisPikto(PW, 0, 4)),
      tambah("kuning,", ...barisPikto(PW, 1, 2)),
      tambah("hitam,", ...barisPikto(PW, 2, 1)),
      tambah("merah.", ...barisPikto(PW, 3, 5)),
      tambah("keterangan:", ...kunciPikto(PW, 4, { jenis: "emoji", e: "👤" }, "menyatakan 1 siswa")),
    ),
    k(
      SUARA_E2,
      sorotkan("hitam?", ...barisId(PW, 2, 1)),
      tambah("satu@2", jumlahBaris(PW, 2, 1)),
      redamkan(idx(SUARA_E2, "warna", 2), ...barisId(PW, 2, 1)),
      sorotkan("Merah,", ...barisId(PW, 3, 5)),
      tambah("lima", jumlahBaris(PW, 3, 5)),
    ),
    k(
      SUARA_E3,
      redamkan(0, ...barisId(PW, 3, 5)),
      tambah("ungu", jumlahBaris(PW, 0, 4)),
      tambah("kuning", jumlahBaris(PW, 1, 2)),
      tambah("hitam", jumlahBaris(PW, 2, 1)),
      tambah("merah", jumlahBaris(PW, 3, 5)),
      tambah("Jumlahnya", teks("wj", 150, 188, "4 + 2 + 1 + 5 = 12 siswa", 11, W.merah)),
    ),
    k(
      SUARA_E4,
      bersih(0),
      tambah(0, judul("Giliran kalian: bunga")),
      tambah("paling", ...kartu("z1", 14, 34, 272, 28, W.hijauMuda, ["a. warna bunga paling banyak?"], 8.8)),
      tambah("sedikit", ...kartu("z2", 14, 68, 272, 28, W.langit, ["b. warna bunga paling sedikit?"], 8.8)),
      tambah("jumlah", ...kartu("z3", 14, 102, 272, 28, W.krem, ["c. jumlah seluruh bunga?"], 8.8)),
      tambah("merah", ...kartu("z4", 14, 136, 272, 28, W.pink, ["d. berapa bunga yang berwarna merah?"], 8.8)),
      tambah("kelompok", emo("z5", 150, 192, "🌸", 22)),
    ),
    k(
      SUARA_E5,
      bersih(0),
      tambah(0, judul("Definisi piktogram")),
      tambah("Inilah", ...kartu("df", 14, 34, 272, 70, W.emas, ["Piktogram adalah diagram yang", "menggunakan gambar sebagai", "jumlah setiap kategori"], 9.6)),
      tambah("juga", ...kartu("dg", 40, 122, 220, 34, W.hijauMuda, ["Piktogram = diagram gambar"], 10)),
      tambah(idx(SUARA_E5, "gambar", 2), emo("dh", 150, 184, "📊", 24)),
    ),
    k(
      SUARA_E6,
      bersih(0),
      tambah(0, judul("Dua aktivitas, satu ide")),
      tambah("satu", ...kartu("y1", 14, 34, 130, 60, W.hijauMuda, ["Aktivitas 1", "gambar sesuai benda"], 8.8), emo("y1e", 40, 124, "📘", 22), emo("y1f", 78, 124, "✏", 22), emo("y1g", 112, 124, "🎒", 22)),
      tambah("dua@1", ...kartu("y2", 156, 34, 130, 60, W.pink, ["Aktivitas 2", "gambar sama, 1 bunga"], 8.8), emo("y2e", 178, 124, "🌸", 22), emo("y2f", 214, 124, "🌸", 22), emo("y2g", 250, 124, "🌸", 22)),
      tambah("Membaca", ...kartu("y3", 40, 150, 220, 34, W.emas, ["hitung banyaknya gambar"], 9.6)),
    ),
  ],
};
