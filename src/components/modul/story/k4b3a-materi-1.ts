import type { AdeganStory } from "./logika-story";
import { KELOMPOK_MEMBESAR, W, benda, emo, judul, kartu, kotak, teks } from "./k4b3a-gambar";
import { bersih, idx, k, sorotkan, tambah } from "./k4b3a-bantu";

/* ------------------------------ 1. Pembuka bab dan tujuan (Buku Siswa hlm. 85–86; Panduan Guru hlm. 121) ------------------------------ */
const SUARA_P1 = "Selamat datang di bab tiga, Pola Gambar dan Pola Bilangan. Buku membuka dengan tantangan: dapatkah kalian menentukan banyak kartu yang dibutuhkan untuk setiap tingkat berdasarkan pola yang sudah ada?";
const SUARA_P2 = "Bab ini memakai operasi bilangan cacah, yaitu penjumlahan dan pengurangan. Karena itu buku mengajak kita mengingat kembali penjumlahan dan pengurangan sebelum mulai mencari pola.";
const SUARA_P3 = "Tujuan pembelajaran di Buku Siswa ada empat: menemukan pola gambar membesar dan mengecil, membuat pola gambar membesar dan mengecil, menemukan pola bilangan membesar dan mengecil, lalu membuat pola bilangan membesar dan mengecil. Subbab A mengerjakan dua tujuan pertama.";
const SUARA_P4 = "Panduan guru merumuskan tujuan satu titik satu: mengidentifikasi pola gambar membesar dan mengecil, dan satu titik dua: mengembangkan pola gambar itu. Keduanya melibatkan penjumlahan dan pengurangan pada bilangan cacah sampai seratus.";
const SUARA_P5 = "Kata kunci bab ini ada dua: Pola Gambar dan Pola Bilangan. Subbab A berfokus pada pola gambar.";

const WARNA_KARTU = [W.oranye, W.kuning, W.biruMuda, W.merahTua];
const tumpukan = (): ReturnType<typeof kotak>[] => {
  const out: ReturnType<typeof kotak>[] = [];
  for (let r = 0; r < 3; r += 1) {
    const lebar = (r + 1) * 30 + r * 4;
    for (let c = 0; c <= r; c += 1) out.push(kotak(`pk${r}${c}`, 150 - lebar / 2 + c * 34, 38 + r * 26, 30, 20, WARNA_KARTU[(r + c) % 4], W.biru, { rx: 2 }));
  }
  return out;
};

export const ADEGAN_PEMBUKA: AdeganStory = {
  id: "pembuka-bab",
  judul: "Pembuka Bab 3: tantangan dan tujuan pembelajaran",
  sumber: "Buku Siswa hlm. 85–86; Panduan Guru hlm. 121",
  latar: "#FFF7ED",
  kutipan: [
    "Pola gambar dan pola bilangan menggunakan operasi bilangan cacah",
    "Dapatkah kalian menentukan banyak kartu yang dibutuhkan",
    "untuk setiap tingkat berdasarkan pola yang sudah ada?",
    "ayo ingat kembali operasi penjumlahan dan pengurangan pada bilangan.",
    "Tujuan Pembelajaran",
    "Setelah mempelajari bab ini kalian mampu:",
    "menemukan pola gambar membesar dan mengecil",
    "membuat pola gambar membesar dan mengecil",
    "menemukan pola bilangan membesar dan mengecil",
    "Kata Kunci",
    "Pola Gambar, Pola Bilangan",
    "1. Tujuan Pembelajaran",
    "Setelah mempelajari bab ini, peserta didik dapat:",
    "1.1 mengidentifikasi pola gambar membesar dan mengecil yang melibatkan",
    "1.2 mengembangkan pola gambar membesar dan mengecil yang melibatkan",
    "penjumlahan dan pengurangan pada bilangan cacah sampai 100",
  ],
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Bab 3: Pola Gambar dan Pola Bilangan")),
      tambah("kartu", ...tumpukan(), emo("pe", 40, 66, "🃏", 30)),
      tambah("setiap", teks("pq", 150, 130, "berapa kartu tiap tingkat?", 10, W.merah)),
      tambah("sudah", ...kartu("pr", 40, 148, 220, 30, W.emas, ["tebak dari pola yang ada"], 9.4)),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Ingat lagi: tambah dan kurang")),
      tambah("penjumlahan", ...kartu("pj", 14, 40, 128, 62, W.hijauMuda, ["penjumlahan"], 9.4), teks("pj2", 78, 124, "+", 22, W.hijau)),
      tambah("pengurangan", ...kartu("pg", 158, 40, 128, 62, W.merahMuda, ["pengurangan"], 9.4), teks("pg2", 222, 124, "−", 22, W.merah)),
      tambah("mengingat", emo("pb", 150, 134, "🧠", 30)),
      tambah("pola.", ...kartu("pp", 50, 152, 200, 30, W.emas, ["lalu mencari pola"], 9.4)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Tujuan pembelajaran (Buku Siswa)")),
      tambah(idx(SUARA_P3, "menemukan", 1), ...kartu("t1", 14, 32, 272, 30, W.hijauMuda, ["1. menemukan pola gambar membesar dan mengecil"], 8.2)),
      tambah(idx(SUARA_P3, "membuat", 1), ...kartu("t2", 14, 66, 272, 30, W.langit, ["2. membuat pola gambar membesar dan mengecil"], 8.2)),
      tambah(idx(SUARA_P3, "menemukan", 2), ...kartu("t3", 14, 100, 272, 30, W.krem, ["3. menemukan pola bilangan membesar dan mengecil"], 8.2, { op: 0.55 })),
      tambah(idx(SUARA_P3, "membuat", 2), ...kartu("t4", 14, 134, 272, 30, W.pink, ["4. membuat pola bilangan membesar dan mengecil"], 8.2, { op: 0.55 })),
      sorotkan("Subbab", "t1-k", "t2-k"),
    ),
    k(
      SUARA_P4,
      bersih(0),
      tambah(0, judul("Tujuan menurut Panduan Guru")),
      tambah("satu", ...kartu("g1", 14, 34, 272, 40, W.hijauMuda, ["1.1 mengidentifikasi pola gambar", "membesar dan mengecil"], 8.8)),
      tambah("mengembangkan", ...kartu("g2", 14, 82, 272, 40, W.langit, ["1.2 mengembangkan pola gambar", "membesar dan mengecil"], 8.8)),
      tambah("Keduanya", ...kartu("g3", 14, 132, 272, 40, W.emas, ["penjumlahan dan pengurangan", "bilangan cacah sampai 100"], 8.8)),
    ),
    k(
      SUARA_P5,
      bersih(0),
      tambah(0, judul("Kata kunci")),
      tambah("dua:", ...kartu("kk1", 20, 44, 120, 44, W.hijauMuda, ["Pola Gambar"], 10)),
      tambah("Bilangan", ...kartu("kk2", 160, 44, 120, 44, W.krem, ["Pola Bilangan"], 10, { op: 0.55 })),
      tambah("Subbab", ...kartu("kk3", 40, 112, 220, 40, W.emas, ["subbab A: pola gambar"], 10)),
      sorotkan("berfokus", "kk1-k"),
    ),
  ],
};

/* ------------------------------ 2. Peta konsep, gambaran umum, keterampilan, skema (Buku Siswa hlm. 86; Panduan Guru hlm. 122–123) ------------------------------ */
const SUARA_K1 = "Peta konsep bab ini dimulai dari Pola Gambar. Cabangnya ada dua: pola gambar membesar dan pola gambar mengecil.";
const SUARA_K2 = "Dari keduanya peta konsep menuju Pola Bilangan, yang juga bercabang menjadi pola bilangan membesar dan pola bilangan mengecil. Subbab A berhenti di bagian pola gambar.";
const SUARA_K3 = "Gambaran umum di panduan guru: murid menentukan banyak benda sesuai pola gambar yang diberikan, baik membesar maupun mengecil. Di akhir bab murid mengidentifikasi, meniru, dan mengembangkan pola gambar atau objek sederhana.";
const SUARA_K4 = "Keterampilan yang dilatih ada empat: menghitung, membaca, menulis, dan berkomunikasi. Skema pembelajaran memberi pola gambar lima jam pelajaran, dengan metode diskusi dan tanya jawab lewat dua aktivitas.";

export const ADEGAN_PETA: AdeganStory = {
  id: "peta-konsep",
  judul: "Peta konsep, gambaran umum, dan skema pembelajaran",
  sumber: "Buku Siswa hlm. 86; Panduan Guru hlm. 122–123",
  latar: "#F0FDF4",
  kutipan: [
    "Peta Konsep",
    "Pola gambar membesar",
    "Pola gambar mengecil",
    "Pola bilangan membesar",
    "2. Peta Konsep",
    "3. Gambaran Umum Bab",
    "untuk menentukan banyak benda sesuai pola gambar yang diberikan baik itu",
    "mengidentifikasi, meniru,",
    "4. Keterampilan yang Dilatih",
    "4. Berkomunikasi",
    "5. Skema Pembelajaran",
    "5 JP",
    "Metode Diskusi dan Tanya Jawab",
    "Aktivitas 2.",
  ],
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Peta konsep")),
      tambah("Gambar.", ...kartu("pg", 90, 30, 120, 26, W.emas, ["Pola Gambar"], 9.6)),
      tambah("Cabangnya", ...kartu("kb1", 20, 84, 120, 40, W.hijauMuda, ["pola gambar", "membesar"], 8.8)),
      tambah("mengecil.", ...kartu("kb2", 160, 84, 120, 40, W.langit, ["pola gambar", "mengecil"], 8.8)),
      tambah("dua:", { id: "kp1", t: "panah", x: 120, y: 58, x2: -50, y2: 24, warna: W.biru, tebal: 1.6 }, { id: "kp2", t: "panah", x: 180, y: 58, x2: 50, y2: 24, warna: W.biru, tebal: 1.6 }),
    ),
    k(
      SUARA_K2,
      tambah("Pola", ...kartu("kq", 90, 138, 120, 26, W.krem, ["Pola Bilangan"], 9.6, { op: 0.6 })),
      tambah("bercabang", teks("kr", 215, 182, "membesar dan mengecil", 8.8, W.coklat, { op: 0.6 })),
      tambah("Subbab", ...kartu("ks", 8, 168, 130, 26, W.emas, ["subbab A: pola gambar"], 8.2)),
      sorotkan("berhenti", "kb1-k", "kb2-k", "pg-k"),
    ),
    k(
      SUARA_K3,
      bersih(0),
      tambah(0, judul("Gambaran umum bab")),
      tambah("menentukan", ...kartu("gu1", 14, 32, 272, 34, W.hijauMuda, ["menentukan banyak benda sesuai pola gambar"], 8.8)),
      tambah("membesar", ...kartu("gu2", 14, 72, 130, 30, W.langit, ["pola membesar"], 9)),
      tambah("mengecil.", ...kartu("gu3", 156, 72, 130, 30, W.krem, ["pola mengecil"], 9)),
      tambah("mengidentifikasi,", ...kartu("gu4", 14, 112, 272, 44, W.pink, ["akhir bab: mengidentifikasi,", "meniru, mengembangkan pola gambar"], 8.8)),
      tambah("sederhana.", emo("gu5", 150, 184, "🎨", 26)),
    ),
    k(
      SUARA_K4,
      bersih(0),
      tambah(0, judul("Keterampilan dan skema")),
      tambah("menghitung,", ...kartu("s1", 8, 30, 66, 22, W.hijauMuda, ["menghitung"], 7.6)),
      tambah("membaca,", ...kartu("s2", 80, 30, 66, 22, W.langit, ["membaca"], 7.6)),
      tambah("menulis,", ...kartu("s3", 152, 30, 66, 22, W.krem, ["menulis"], 7.6)),
      tambah("berkomunikasi.", ...kartu("s4", 224, 30, 70, 22, W.pink, ["komunikasi"], 7.6)),
      tambah("Skema", ...kartu("sk", 30, 70, 240, 40, W.emas, ["Pola Gambar: 5 JP", "metode diskusi dan tanya jawab"], 8.8)),
      tambah("aktivitas.", ...kartu("sa", 30, 120, 114, 28, W.hijauMuda, ["Aktivitas 1: membesar"], 7.8), ...kartu("sb", 156, 120, 114, 28, W.langit, ["Aktivitas 2: mengecil"], 7.8)),
    ),
  ],
};

/* ------------------------------ 3. Panduan Guru: pengalaman belajar, sarana, apersepsi, pemanasan (Panduan Guru hlm. 124–125) ------------------------------ */
const SUARA_G1 = "Pengalaman belajar di panduan guru: pola gambar ada dua jenis. Pola gambar membesar melibatkan penjumlahan bilangan cacah, dan pola gambar mengecil melibatkan pengurangan bilangan cacah.";
const SUARA_G2 = "Konsep pola gambar punya banyak manfaat dalam kehidupan sehari-hari. Murid akan menyadari bahwa di dunia ini ada pola, dan ilmuwan memanfaatkannya untuk memprediksi fenomena alam seperti gempa bumi dan angin topan.";
const SUARA_G3 = "Perlengkapan: alat tulis, kertas, dan batu kerikil atau kelereng. Apersepsi: guru meminta murid mengamati gambar awal bab, lalu menanyakan pengalaman bermain kartu yang ditumpuk rapi menjadi bentuk berpola.";
const SUARA_G4 = "Guru juga mengingatkan penjumlahan dan pengurangan bilangan cacah. Pemanasan: guru menggambar deret kumpulan gambar berpola di papan tulis dan menanyakan apakah murid menemukan polanya. Jawabannya belum perlu dibenarkan.";

export const ADEGAN_PANDUAN_AWAL: AdeganStory = {
  id: "panduan-awal",
  judul: "Panduan Guru: pengalaman belajar dan pemanasan",
  sumber: "Panduan Guru hlm. 124–125",
  latar: "#FFFBEB",
  kutipan: [
    "6. Panduan Pembelajaran",
    "A. Pola Gambar",
    "Pengalaman Belajar",
    "pola gambar membesar (melibatkan operasi penjumlahan bilangan cacah)",
    "memprediksi fenomena alam seperti gempa bumi, angin topan",
    "Kebutuhan Sarana Prasarana dan Media",
    "1. Alat tulis",
    "3. Batu kerikil/kelereng",
    "Apersepsi",
    "Apakah kalian pernah bermain kartu",
    "Stimulus (Pemanasan)",
    "Guru menggambar di papan tulis berupa deret kumpulan gambar",
    "Guru tidak perlu memberikan jawaban yang benar",
  ],
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Pengalaman belajar: dua jenis pola")),
      tambah("membesar", ...kartu("pe1", 10, 36, 136, 62, W.hijauMuda, ["pola gambar", "membesar:", "penjumlahan"], 8.8), teks("pe1b", 78, 118, "+", 22, W.hijau)),
      tambah("mengecil", ...kartu("pe2", 154, 36, 136, 62, W.merahMuda, ["pola gambar", "mengecil:", "pengurangan"], 8.8), teks("pe2b", 222, 118, "−", 22, W.merah)),
      tambah("cacah,", teks("pe3", 150, 160, "bilangan cacah", 9.4, W.coklat)),
    ),
    k(
      SUARA_G2,
      bersih(0),
      tambah(0, judul("Manfaat konsep pola")),
      tambah("manfaat", ...kartu("pm1", 14, 32, 272, 30, W.krem, ["banyak manfaat dalam kehidupan sehari-hari"], 8.4)),
      tambah(idx(SUARA_G2, "pola", 2), emo("pm2", 60, 98, "🌍", 34)),
      tambah("ilmuwan", ...kartu("pm3", 100, 78, 186, 38, W.langit, ["ilmuwan memprediksi", "fenomena alam"], 8.6)),
      tambah("gempa", teks("pm4", 100, 148, "gempa bumi", 9, W.coklat), teks("pm5", 200, 148, "angin topan", 9, W.coklat)),
    ),
    k(
      SUARA_G3,
      bersih(0),
      tambah(0, judul("Sarana dan apersepsi")),
      tambah("alat", ...kartu("sr1", 10, 30, 86, 26, W.langit, ["alat tulis"], 8.4)),
      tambah("kertas,", ...kartu("sr2", 107, 30, 86, 26, W.krem, ["kertas"], 8.4)),
      tambah("kerikil", ...kartu("sr3", 204, 30, 86, 26, W.hijauMuda, ["kerikil/kelereng"], 8.4)),
      tambah("Apersepsi:", ...kartu("sr4", 10, 70, 280, 34, W.emas, ["amati gambar awal bab, bentuk berpola"], 8.6)),
      tambah("kartu", emo("sr5", 150, 150, "🃏", 32)),
      tambah("ditumpuk", teks("sr6", 150, 184, "kartu ditumpuk rapi jadi bentuk berpola", 8.4, W.biru)),
    ),
    k(
      SUARA_G4,
      bersih(0),
      tambah(0, judul("Pemanasan di papan tulis")),
      tambah("menggambar", kotak("pw", 20, 30, 260, 96, "#166534", W.coklat, { rx: 4, tebal: 3 })),
      tambah("kumpulan", ...benda("pw1", 56, 62, 1, 1, 9, 4, W.putih, W.putih), ...benda("pw2", 110, 62, 2, 2, 9, 4, W.putih, W.putih), ...benda("pw3", 170, 62, 3, 3, 9, 4, W.putih, W.putih)),
      tambah("menanyakan", teks("pw4", 240, 76, "?", 22, W.emas)),
      tambah("polanya.", teks("pw5", 150, 112, "contoh deret gambar di papan tulis", 8, W.putih)),
      tambah("Jawabannya", ...kartu("pw6", 40, 140, 220, 34, W.krem, ["jawaban belum perlu dibenarkan"], 8.8)),
    ),
  ],
};

/* ------------------------------ 4. Aktivitas 1: pola gambar membesar (Buku Siswa hlm. 87–88; Panduan Guru hlm. 125–126) ------------------------------ */
const SUARA_AK1 = "Subbab A dibuka dengan rak buku. Bintang di atasnya berjumlah satu, tiga, lalu lima. Tahukah kalian? Susunan gambar yang ditata dapat membentuk sebuah pola tertentu.";
const SUARA_AK2 = "Aktivitas satu, pola gambar membesar. Alat dan bahan: kelereng atau batu kerikil, alat tulis, dan kertas. Buatlah empat kelompok beranggotakan lima sampai enam orang.";
const SUARA_AK3 = "Langkah dua: susun kelereng menjadi tiga kumpulan sesuai tabel. Kelompok satu: satu, dua, tiga kelereng. Kelompok dua: dua, empat, enam. Kelompok tiga: satu, tiga, lima. Kelompok empat: dua, lima, delapan.";
const SUARA_AK4 = "Panduan guru: bagi kelas menjadi empat kelompok heterogen. Tiap kelompok mendapat permasalahan pola gambar membesar yang berbeda, dan memakai alat peraga. Guru bertanya, dapatkah murid menemukan polanya dan banyak benda setelahnya?";
const SUARA_AK5 = "Langkah tiga sampai enam: hitung banyak benda serta selisihnya dalam tabel, temukan pola lewat diskusi, jawab lima pertanyaan, lalu presentasikan di depan kelas. Kelompok lain boleh bertanya.";

const X_KUM = [92, 160, 232] as const;
const Y_KEL = [38, 74, 110, 146] as const;
const WARNA_KEL = [W.biruMuda, W.oranye, W.hijau, W.merahTua] as const;

export const ADEGAN_AKTIVITAS_SATU: AdeganStory = {
  id: "aktivitas-satu",
  judul: "Aktivitas 1: pola gambar membesar",
  sumber: "Buku Siswa hlm. 87–88; Panduan Guru hlm. 125–126",
  latar: "#F0F9FF",
  kutipan: [
    "A. Pola Gambar",
    "Tahukah kalian? Susunan gambar yang ditata",
    "dapat membentuk sebuah pola tertentu",
    "1. Pola Gambar Membesar",
    "Aktivitas 1",
    "Alat dan Bahan: Kelereng/batu kerikil, alat tulis, kertas",
    "Buatlah 4 kelompok beranggotakan 5-6 orang.",
    "Susunlah kelereng/batu kerikil menjadi 3 kumpulan sesuai tabel berikut.",
    "Setiap kelompok menghitung banyaknya benda serta selisihnya dari setiap",
    "Temukan pola gambar masing-masing dengan berdiskusi sesama anggota",
    "Mintalah bantuan guru jika dibutuhkan.",
    "Bagaimana pola yang terbentuk dari pola gambar yang diberikan?",
    "Berapa benda yang dibutuhkan untuk kumpulan ke-4 yang sesuai pola",
    "Semakin banyak atau semakin sedikit?",
    "Apa yang kalian dapat simpulkan?",
    "Presentasikan hasil diskusi kelompok di depan kelas.",
    "Guru membagi peserta didik menjadi 4 kelompok yang heterogen",
    "terkait pola gambar membesar yang berbeda-beda.",
    "Dapatkah menemukan pola gambar",
  ],
  ketukan: [
    k(
      SUARA_AK1,
      tambah(0, judul("Subbab A: rak buku dan bintang")),
      tambah("rak", kotak("rk", 30, 96, 130, 60, W.emas, W.coklat, { rx: 3, tebal: 2 }), teks("rkt", 95, 130, "rak buku", 9, W.coklat)),
      tambah("Bintang", ...benda("bt1", 190, 50, 1, 1, 14, 5, W.emas, W.coklat), ...benda("bt2", 190, 76, 3, 3, 14, 5, W.hijau, W.coklat), ...benda("bt3", 190, 102, 5, 5, 14, 5, W.biruMuda, W.coklat)),
      tambah("tiga,", teks("bn1", 175, 54, "1", 9, W.biru), teks("bn3", 175, 80, "3", 9, W.biru), teks("bn5", 175, 106, "5", 9, W.biru)),
      tambah("Tahukah", ...kartu("bp", 20, 160, 260, 32, W.langit, ["susunan gambar yang ditata", "membentuk sebuah pola"], 8.2)),
    ),
    k(
      SUARA_AK2,
      bersih(0),
      tambah(0, judul("Aktivitas 1: pola gambar membesar")),
      tambah("kelereng", ...benda("al1", 60, 56, 3, 3, 14, 5, W.biruMuda, W.biru), teks("al1t", 80, 82, "kelereng", 8.4, W.biru)),
      tambah(idx(SUARA_AK2, "alat", 2), emo("al2", 150, 66, "✏", 26), teks("al2t", 150, 86, "alat tulis", 8.4, W.biru)),
      tambah("kertas.", emo("al3", 230, 66, "📄", 26), teks("al3t", 230, 86, "kertas", 8.4, W.biru)),
      tambah("empat", ...kartu("al4", 30, 108, 240, 40, W.emas, ["4 kelompok, tiap kelompok", "5 sampai 6 orang"], 9)),
    ),
    k(
      SUARA_AK3,
      bersih(0),
      tambah(0, judul("Tabel kumpulan kelereng")),
      tambah(0, ...["Kumpulan 1", "Kumpulan 2", "Kumpulan 3"].map((t, i) => teks(`ah${i}`, X_KUM[i] + 10, 30, t, 7.6, W.coklat))),
      ...[0, 1, 2, 3].map((g) => tambah(idx(SUARA_AK3, "Kelompok", g + 1), teks(`ak${g}`, 8, Y_KEL[g] + 4, `kelompok ${g + 1}`, 8, W.biru, { anchor: "start" }))),
      ...KELOMPOK_MEMBESAR.flatMap((baris, g) => baris.map((n, i) => tambah(idx(SUARA_AK3, "Kelompok", g + 1) + 2 + i, ...benda(`k${g}${i}`, X_KUM[i], Y_KEL[g], n, 3, 8, 3.3, WARNA_KEL[g], W.coklat)))),
    ),
    k(
      SUARA_AK4,
      bersih(0),
      tambah(0, judul("Peran guru dalam Aktivitas 1")),
      tambah("empat", ...kartu("ag1", 14, 32, 272, 30, W.hijauMuda, ["4 kelompok heterogen"], 9)),
      tambah("berbeda,", ...kartu("ag2", 14, 68, 272, 30, W.langit, ["tiap kelompok: permasalahan yang berbeda"], 8.6)),
      tambah("peraga.", ...kartu("ag3", 14, 104, 272, 30, W.krem, ["memakai alat peraga"], 9)),
      tambah("bertanya,", ...kartu("ag4", 14, 140, 272, 40, W.emas, ["dapatkah menemukan pola dan", "banyak benda setelahnya?"], 8.8)),
    ),
    k(
      SUARA_AK5,
      bersih(0),
      tambah(0, judul("Langkah 3 sampai 6")),
      tambah("hitung", ...kartu("al5", 14, 30, 272, 26, W.hijauMuda, ["3. hitung benda dan selisih dalam tabel"], 8.6)),
      tambah("temukan", ...kartu("al6", 14, 60, 272, 26, W.langit, ["4. temukan pola lewat diskusi"], 8.6)),
      tambah("jawab", ...kartu("al7", 14, 90, 272, 26, W.krem, ["5. jawab pertanyaan a sampai e"], 8.6)),
      tambah("presentasikan", ...kartu("al8", 14, 120, 272, 26, W.pink, ["6. presentasi di depan kelas"], 8.6)),
      tambah("Kelompok", emo("al9", 150, 172, "🙋", 26)),
    ),
  ],
};
