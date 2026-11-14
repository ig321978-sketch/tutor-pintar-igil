import type { AdeganStory } from "./logika-story";
import { W, emo, judul, kartu, kotak, panah, rangkaPikto, barisPikto, teks, type Pikto } from "./k4b6a-gambar";
import { bersih, idx, k, redamkan, sorotkan, tambah, ubah } from "./k4b6a-bantu";

/* ------------------------------ 1. Pembuka bab dan tujuan (Buku Siswa hlm. 177–178; Panduan Guru hlm. 215) ------------------------------ */
const TUJUAN = ["menampilkan data dalam diagram gambar (piktogram)", "menafsirkan data dari diagram gambar (piktogram)", "menampilkan data dalam diagram batang", "menafsirkan data dari diagram batang"];
const WARNA_TUJUAN = [W.hijauMuda, W.hijauMuda, W.langit, W.langit];
const chipTujuan = (i: number) => kartu(`tj${i}`, 10, 34 + i * 40, 280, 32, WARNA_TUJUAN[i], [`${i + 1}. ${TUJUAN[i]}`], 8.2);
const NOMOR_PG = ["1.1 menyajikan data dalam piktogram", "1.2 menginterpretasikan data dalam piktogram", "1.3 menyajikan data dalam diagram batang", "1.4 menginterpretasikan data dalam diagram batang"];
const chipPG = (i: number) => kartu(`pg${i}`, 10, 36 + i * 38, 280, 30, WARNA_TUJUAN[i], [NOMOR_PG[i]], 8.2);

const SUARA_P1 = "Selamat datang di bab enam, Piktogram dan Diagram Batang. Buku membuka bab dengan gambar dan pertanyaan: pernahkah kalian mengamati gambar seperti ini? Apa yang kalian pahami dari gambar tersebut?";
const SUARA_P2 = "Tujuan pembelajaran di Buku Siswa ada empat: menampilkan data dalam diagram gambar, menafsirkan data dari diagram gambar, menampilkan data dalam diagram batang, dan menafsirkan data dari diagram batang.";
const SUARA_P3 = "Diagram gambar itulah piktogram. Subbab A hanya mengerjakan dua tujuan pertama, yaitu menampilkan dan menafsirkan piktogram. Dua tujuan lainnya menunggu giliran di subbab berikutnya.";
const SUARA_P4 = "Buku panduan guru menomori tujuan itu: satu titik satu, menyajikan data dalam piktogram. Satu titik dua, menginterpretasikan data dalam piktogram. Satu titik tiga dan satu titik empat untuk diagram batang.";

export const ADEGAN_PEMBUKA: AdeganStory = {
  id: "pembuka-bab",
  judul: "Pembuka Bab 6: tujuan pembelajaran",
  sumber: "Buku Siswa hlm. 177–178; Panduan Guru hlm. 215",
  latar: "#FFF7ED",
  kutipan: [
    "Pernahkah kalian mengamati gambar seperti ini?",
    "Apa yang kalian pahami",
    "dari gambar tersebut?",
    "Setelah mempelajari bab ini kalian mampu:",
    "menampilkan data dalam bentuk",
    "diagram gambar (piktogram)",
    "menafsirkan data dari diagram gambar",
    "Setelah mempelajari bab ini, peserta didik diharapkan dapat:",
    "1.1 menyajikan data dalam bentuk piktogram",
    "1.2 menginterpretasikan data dalam bentuk piktogram",
    "1.3 menyajikan data dalam bentuk diagram batang",
  ],
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Bab 6: Piktogram")),
      tambah("Piktogram", ...kartu("jb", 30, 34, 240, 34, W.emas, ["Piktogram dan Diagram Batang"], 10.4)),
      tambah("pertanyaan:", emo("pq", 78, 120, "📊", 44), emo("pq2", 150, 120, "🔵", 34), emo("pq3", 215, 120, "🧍", 34)),
      tambah("pernahkah", ...kartu("pn", 20, 152, 260, 34, W.krem, ["Pernahkah kalian mengamati gambar seperti ini?"], 8.2)),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Tujuan pembelajaran")),
      tambah("menampilkan", chipTujuan(0)),
      tambah("menafsirkan", chipTujuan(1)),
      tambah("menampilkan@2", chipTujuan(2)),
      tambah("menafsirkan@2", chipTujuan(3)),
    ),
    k(
      SUARA_P3,
      sorotkan("hanya", "tj0-k", "tj1-k"),
      ubah("lainnya", { id: "tj2-k", op: 0.35 }, { id: "tj2-t0", op: 0.35 }, { id: "tj3-k", op: 0.35 }, { id: "tj3-t0", op: 0.35 }),
      tambah(idx(SUARA_P3, "piktogram", 2), teks("tj-t", 150, 196, "Subbab A: tujuan 1 dan 2", 8.6, W.merah)),
    ),
    k(
      SUARA_P4,
      bersih(0),
      tambah(0, judul("Tujuan menurut Panduan Guru")),
      tambah("satu", chipPG(0)),
      tambah("menginterpretasikan", chipPG(1)),
      tambah("tiga", chipPG(2)),
      tambah("empat", chipPG(3)),
    ),
  ],
};

/* ------------------------------ 2. Peta konsep, gambaran umum, dan skema (Buku Siswa hlm. 178; Panduan Guru hlm. 216–217) ------------------------------ */
const kotakPeta = (id: string, x: number, y: number, w: number, warna: string, isi: string) => kartu(id, x, y, w, 24, warna, [isi], 8.2);
const KETERAMPILAN = ["menyajikan data", "menganalisis data", "menginterpretasi data"];
const chipTerampil = (i: number) => kartu(`kt${i}`, 40, 34 + i * 36, 220, 28, [W.hijauMuda, W.langit, W.krem][i], [`${i + 1}. ${KETERAMPILAN[i]}`], 9.4);
const JP_SUBBAB = [
  { h: "A", nama: "piktogram", jp: 10, w: W.hijauMuda },
  { h: "B", nama: "diagram batang", jp: 5, w: W.langit },
];
const barJP = (i: number) => {
  const s = JP_SUBBAB[i];
  const y = 54 + i * 44;
  const w = s.jp * 14;
  return [teks(`sh${i}`, 22, y + 17, s.h, 12, W.biru), kotak(`sb${i}`, 38, y, w, 26, s.w, W.biru, { rx: 4 }), teks(`sj${i}`, 38 + w / 2, y + 17, `${s.jp} JP`, 9.4, W.biru), teks(`sn${i}`, 38 + w + 6, y + 17, s.nama, 8, W.biru, { anchor: "start" })];
};

const SUARA_K1 = "Peta konsep bab ini: penyajian data punya dua bentuk, tabel dan diagram. Tabel dianalisis dan diinterpretasi. Diagram punya dua jenis, diagram gambar atau piktogram, dan diagram batang.";
const SUARA_K2 = "Panduan guru menjelaskan gambaran umum bab: peserta didik belajar menyajikan, menganalisis, dan menginterpretasi data, dengan skala satu satuan. Manfaatnya, membaca data jadi lebih mudah.";
const SUARA_K3 = "Keterampilan yang dilatih ada tiga: menyajikan data, menganalisis data, dan menginterpretasi data. Kata kunci bab ini hanya dua, yaitu piktogram dan diagram batang.";
const SUARA_K4 = "Skema pembelajaran memberi sepuluh jam pelajaran untuk subbab A, piktogram, dan lima jam pelajaran untuk subbab B, diagram batang. Jadi piktogram mendapat waktu dua kali lebih panjang.";

export const ADEGAN_PETA: AdeganStory = {
  id: "peta-konsep",
  judul: "Peta konsep, gambaran umum, dan skema pembelajaran",
  sumber: "Buku Siswa hlm. 178; Panduan Guru hlm. 216–217",
  latar: "#F0FDF4",
  kutipan: [
    "Peta Konsep",
    "Penyajian Data",
    "Menganalisis dan",
    "Diagram Gambar",
    "Kata Kunci",
    "Piktogram,",
    "3. Gambaran Umum Bab",
    "peserta didik akan belajar menyajikan, menganalisis dan",
    "menginterpretasi piktogram dan diagram batang",
    "menyajikan data dengan skala satu satuan",
    "mempermudah peserta didik dalam membaca data",
    "4. Keterampilan yang Dilatih",
    "1. Menyajikan data",
    "3. Menginterpretasi data",
    "Tabel 6.1 Skema Pembelajaran",
    "10 JP",
    "5 JP",
  ],
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Peta konsep")),
      tambah("peta", kotakPeta("pa", 90, 30, 120, W.emas, "Penyajian Data")),
      tambah("bentuk,", panah("pb1", 150, 56, -60, 22, W.biru, 1.6), panah("pb2", 150, 56, 60, 22, W.biru, 1.6), teks("pl", 150, 70, "bentuk", 7.6, W.coklat)),
      tambah("tabel", kotakPeta("pt", 20, 84, 100, W.hijauMuda, "Tabel")),
      tambah("diagram.", kotakPeta("pd", 180, 84, 100, W.langit, "Diagram")),
      tambah("dianalisis", teks("pt2", 70, 124, "dianalisis dan", 7.6, W.biru), teks("pt3", 70, 135, "diinterpretasi", 7.6, W.biru)),
      tambah("jenis,", panah("pc1", 230, 108, -40, 28, W.biru, 1.6), panah("pc2", 230, 108, 40, 28, W.biru, 1.6)),
      tambah("piktogram,", kotakPeta("pg", 112, 138, 100, W.pink, "Diagram gambar")),
      tambah("batang.", kotakPeta("pbt", 202, 138, 90, W.jingga, "Diagram batang")),
    ),
    k(
      SUARA_K2,
      bersih(0),
      tambah(0, judul("Gambaran umum bab")),
      tambah("menyajikan,", ...kartu("g1", 14, 34, 272, 28, W.hijauMuda, ["menyajikan data"], 9.4)),
      tambah("menganalisis,", ...kartu("g2", 14, 68, 272, 28, W.langit, ["menganalisis data"], 9.4)),
      tambah("menginterpretasi", ...kartu("g3", 14, 102, 272, 28, W.krem, ["menginterpretasi data"], 9.4)),
      tambah("skala", ...kartu("g4", 14, 136, 272, 28, W.pink, ["dengan skala satu satuan"], 9.4)),
      tambah("membaca", emo("gm", 150, 192, "📖", 22)),
    ),
    k(SUARA_K3, bersih(0), tambah(0, judul("Keterampilan dan kata kunci")), tambah("menyajikan", chipTerampil(0)), tambah("menganalisis", chipTerampil(1)), tambah("menginterpretasi", chipTerampil(2)), tambah("kunci", ...kartu("kc", 40, 150, 220, 30, W.emas, ["kata kunci: piktogram, diagram batang"], 8.6))),
    k(SUARA_K4, bersih(0), tambah(0, judul("Skema pembelajaran: waktu")), tambah("sepuluh", ...barJP(0)), tambah("lima", ...barJP(1)), tambah("dua", teks("dk", 150, 170, "A mendapat waktu dua kali B", 9, W.merah)), sorotkan("piktogram", "sb0")),
  ],
};

/* ------------------------------ 3. Pengalaman belajar, sarana, apersepsi, dan pertanyaan pemantik (Panduan Guru hlm. 217–218) ------------------------------ */
const SUARA_S1 = "Panduan guru memulai dengan pengalaman belajar: setelah mempelajari subbab ini, peserta didik mampu menyajikan, menganalisis, dan menginterpretasi data dalam piktogram dengan skala satu satuan.";
const SUARA_S2 = "Sarana yang dibutuhkan sederhana, yaitu benda-benda yang dapat dihitung di lingkungan siswa, misalnya jam dinding, papan tulis, meja guru, lemari, atau gambar di dinding kelas.";
const SUARA_S3 = "Apersepsi: piktogram disebut juga diagram gambar, yaitu penyajian data yang memakai gambar untuk menunjukkan banyak data. Yang perlu diperhatikan, satu gambar menyatakan berapa banyak datanya.";
const SUARA_S4 = "Tiga pertanyaan pemantik: apakah piktogram itu, bagaimana menyajikan piktogram, dan bagaimana menganalisis serta menginterpretasikan piktogram?";
const SUARA_S5 = "Analisis dan interpretasi berarti menentukan data terbesar, yaitu paling banyak, data terkecil, yaitu paling sedikit, dan jumlah seluruh data. Itulah tiga hal yang kita latih di kelas empat.";

export const ADEGAN_PEMANASAN: AdeganStory = {
  id: "pemanasan",
  judul: "Pengalaman belajar, sarana, apersepsi, dan pemantik",
  sumber: "Panduan Guru hlm. 217–218",
  latar: "#FFFBEB",
  kutipan: [
    "Pengalaman Belajar",
    "Sebelum memasuki materi mengenai piktogram, guru diharapkan",
    "menyajikan, menganalisis dan menginterpretasi data dalam piktogram",
    "(skala satu satuan)",
    "Kebutuhan Sarana Prasarana dan Media",
    "Benda-benda yang dapat dihitung di lingkungan siswa",
    "Apersepsi",
    "Piktogram disebut juga dengan diagram gambar.",
    "menggunakan gambar untuk menunjukkan",
    "banyak data",
    "gambar menyatakan berapa banyak datanya",
    "Pertanyaan Esensi/Pemantik:",
    "1. Apakah piktogram?",
    "2. Bagaimana menyajikan piktogram",
    "data terbesar adalah data paling banyak dan data terkecil adalah data",
    "paling sedikit",
  ],
  ketukan: [
    k(SUARA_S1, tambah(0, judul("Pengalaman belajar")), tambah("pengalaman", ...kartu("e1", 20, 34, 260, 34, W.hijauMuda, ["menyajikan data dalam piktogram"], 8.8)), tambah("menganalisis,", ...kartu("e2", 20, 76, 260, 34, W.langit, ["menganalisis data piktogram"], 8.8)), tambah("menginterpretasi", ...kartu("e3", 20, 118, 260, 34, W.krem, ["menginterpretasi data piktogram"], 8.8)), tambah("skala", ...kartu("e4", 60, 160, 180, 28, W.emas, ["skala satu satuan"], 9.2))),
    k(
      SUARA_S2,
      bersih(0),
      tambah(0, judul("Sarana: benda yang dapat dihitung")),
      tambah("jam", emo("s1", 50, 90, "🕒", 34), teks("s1t", 50, 112, "jam dinding", 7.6, W.biru)),
      tambah("papan", emo("s2", 125, 90, "🖼", 34), teks("s2t", 125, 112, "papan tulis", 7.6, W.biru)),
      tambah("lemari,", emo("s3", 200, 90, "🚪", 34), teks("s3t", 200, 112, "lemari", 7.6, W.biru)),
      tambah(idx(SUARA_S2, "dinding", 2), emo("s4", 262, 90, "🖼", 34), teks("s4t", 262, 112, "gambar dinding", 7.6, W.biru)),
      tambah("meja", ...kartu("s5", 40, 140, 220, 32, W.krem, ["bisa dihitung, bisa dijadikan data"], 8.6)),
    ),
    k(
      SUARA_S3,
      bersih(0),
      tambah(0, judul("Apersepsi")),
      tambah("piktogram", ...kartu("a1", 14, 34, 120, 40, W.pink, ["piktogram"], 11)),
      tambah("juga", teks("a2", 150, 60, "=", 22, W.merah)),
      tambah("diagram", ...kartu("a3", 166, 34, 120, 40, W.hijauMuda, ["diagram gambar"], 10)),
      tambah("gambar", emo("a4", 60, 120, "🔵", 30), emo("a5", 100, 120, "🔵", 30), emo("a6", 140, 120, "🔵", 30)),
      tambah("berapa", ...kartu("a7", 40, 152, 220, 34, W.emas, ["satu gambar menyatakan berapa?"], 9.4)),
    ),
    k(
      SUARA_S4,
      bersih(0),
      tambah(0, judul("Tiga pertanyaan pemantik")),
      tambah("apakah", ...kartu("q1", 20, 36, 260, 32, W.hijauMuda, ["1. Apakah piktogram?"], 9.4)),
      tambah("bagaimana", ...kartu("q2", 20, 78, 260, 32, W.langit, ["2. Bagaimana menyajikan piktogram?"], 9.4)),
      tambah("serta", ...kartu("q3", 20, 120, 260, 32, W.krem, ["3. Bagaimana menganalisis dan menginterpretasikannya?"], 8.4)),
    ),
    k(
      SUARA_S5,
      bersih(0),
      tambah(0, judul("Tiga hal yang dilatih")),
      tambah("terbesar,", ...kartu("t1", 20, 34, 260, 34, W.hijauMuda, ["data terbesar = paling banyak"], 9.4)),
      tambah("terkecil,", ...kartu("t2", 20, 76, 260, 34, W.langit, ["data terkecil = paling sedikit"], 9.4)),
      tambah("jumlah", ...kartu("t3", 20, 118, 260, 34, W.krem, ["jumlah seluruh data"], 9.4)),
      tambah("kelas", emo("t4", 150, 184, "⭐", 24)),
    ),
  ],
};

/* ------------------------------ 4. Aktivitas 1: penyajian piktogram (Buku Siswa hlm. 179–180; Panduan Guru hlm. 219) ------------------------------ */
const SUARA_A1 = "Subbab A dibuka dengan pertanyaan Ibu: kalau ibu punya beberapa benda yang dapat dihitung, bagaimana cara menyajikannya? Jawabannya ada di Aktivitas satu, penyajian piktogram.";
const SUARA_A2 = "Alat dan bahannya adalah alat tulis dalam tas sekolah. Langkahnya: buat kelompok tiga sampai empat anak, keluarkan alat tulis dari tas, lalu catat semua benda dan jumlahnya.";
const SUARA_A3 = "Langkah empat: gambar tabel dengan dua kolom. Kolom satu menyatakan alat tulis atau benda, dan kolom dua menyatakan banyaknya.";
const SUARA_A4 = "Langkah lima: isi kolom satu dengan semua alat tulis dalam tas, misalnya buku paket dan buku tulis, lalu kolom dua digambar sebagai sketsa sebanyak jumlah benda itu.";
const SUARA_A5 = "Panduan guru menambahkan: guru membentuk kelompok heterogen berdasarkan karakteristik dan keberagaman peserta didik, lalu memberi contoh mengisi beberapa baris tabel.";
const PA1: Pikto = { id: "al", x: 24, y: 46, lw: 120, aw: 132, rh: 28, hh: 20, ik: 17, st: 22, ikon: { jenis: "emoji", e: "📘" }, label: ["Buku Paket", "Buku Tulis", "dan lainnya"], kepala: ["Nama Alat Tulis (Benda)", "Banyaknya"] };

export const ADEGAN_AKTIVITAS1: AdeganStory = {
  id: "aktivitas-satu",
  judul: "Aktivitas 1: penyajian piktogram",
  sumber: "Buku Siswa hlm. 179–180; Panduan Guru hlm. 219",
  latar: "#FFF7ED",
  kutipan: [
    "A. Piktogram",
    "Kalau ibu punya",
    "beberapa benda",
    "yang dapat dihitung,",
    "bagaimana cara",
    "menyajikannya?",
    "Aktivitas 1. Penyajian Piktogram",
    "Alat tulis (benda) dalam tas sekolah",
    "1. Buatlah kelompok dengan jumlah anggota kelompok 3 – 4 anak.",
    "2. Keluarkan alat tulis (benda) dari tas sekolah",
    "3. Catat semua benda yang ada dan tulis berapa jumlahnya",
    "4. Gambarlah tabel dengan dua kolom, kolom 1 menyatakan alat tulis (benda)",
    "dan kolom 2 menyatakan banyaknya",
    "Buku Paket",
    "Buku Tulis",
    "sebanyak jumlah alat tulis",
    "Guru membentuk kelompok heterogen (berdasarkan karakteristik dan",
    "keberagaman peserta didik)",
    "Guru memberikan contoh cara mengisi beberapa bagian pada tabel",
  ],
  ketukan: [
    k(SUARA_A1, tambah(0, judul("A. Piktogram")), tambah("pertanyaan", emo("ib", 60, 90, "👩", 44)), tambah("beberapa", ...kartu("ib2", 100, 50, 180, 70, W.langit, ["Kalau ibu punya beberapa", "benda yang dapat dihitung,", "bagaimana menyajikannya?"], 8.6)), tambah("Aktivitas", ...kartu("ib3", 40, 140, 220, 34, W.emas, ["Aktivitas 1: penyajian piktogram"], 9.2))),
    k(
      SUARA_A2,
      bersih(0),
      tambah(0, judul("Aktivitas 1: langkah")),
      tambah("alat", emo("l0", 40, 78, "🎒", 34), emo("l0b", 80, 78, "✏", 28)),
      tambah("kelompok", ...kartu("l1", 110, 40, 180, 30, W.hijauMuda, ["1. kelompok 3 – 4 anak"], 8.6)),
      tambah("keluarkan", ...kartu("l2", 110, 78, 180, 30, W.langit, ["2. keluarkan alat tulis"], 8.6)),
      tambah("catat", ...kartu("l3", 110, 116, 180, 30, W.krem, ["3. catat benda dan jumlahnya"], 8.6)),
      tambah("jumlahnya.", emo("l4", 150, 184, "📝", 24)),
    ),
    k(
      SUARA_A3,
      bersih(0),
      tambah(0, judul("Langkah 4: tabel dua kolom")),
      tambah("gambar", rangkaPikto({ ...PA1, label: [] }), kotak("al-b", 24, 66, 252, 84, W.putih, W.biru, { rx: 0, tebal: 1 })),
      sorotkan("kolom", "al-hk"),
      redamkan("benda,", "al-hk"),
      sorotkan("banyaknya.", "al-hv"),
    ),
    k(
      SUARA_A4,
      bersih(0),
      tambah(0, judul("Langkah 5: isi tabel")),
      tambah(0, rangkaPikto(PA1)),
      tambah("buku", ...barisPikto(PA1, 0, 3)),
      tambah(idx(SUARA_A4, "tulis", 2), ...barisPikto(PA1, 1, 2)),
      tambah("sketsa", teks("ct", 150, 186, "gambar sketsa sebanyak bendanya (contoh)", 8, W.merah)),
    ),
    k(
      SUARA_A5,
      bersih(0),
      tambah(0, judul("Peran guru")),
      tambah("kelompok", emo("g1", 60, 80, "🧑", 30), emo("g2", 100, 80, "👦", 30), emo("g3", 140, 80, "👧", 30), emo("g4", 180, 80, "🧒", 30)),
      tambah("heterogen", ...kartu("gh", 30, 108, 240, 28, W.hijauMuda, ["kelompok heterogen"], 9.4)),
      tambah("karakteristik", teks("gk", 150, 154, "karakteristik dan keberagaman peserta didik", 8, W.biru)),
      tambah("contoh", ...kartu("gc", 30, 164, 240, 28, W.krem, ["guru memberi contoh mengisi baris tabel"], 8.4)),
    ),
  ],
};
