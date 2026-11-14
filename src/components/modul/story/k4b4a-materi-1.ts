import type { AdeganStory } from "./logika-story";
import { W, emo, judul, kartu, kotak, panah, tabel, teks } from "./k4b4a-gambar";
import { bersih, idx, k, sorotkan, tambah, ubah } from "./k4b4a-bantu";

/* ------------------------------ 1. Pembuka bab dan tujuan (Buku Siswa hlm. 103–104; Panduan Guru hlm. 145) ------------------------------ */
const SUARA_P1 = "Selamat datang di bab empat, Pengukuran Luas dan Volume. Buku membuka dengan pertanyaan: jika kalian mengamati lantai, dinding, pintu, atau jendela minimarket, dapatkah luasnya ditentukan dengan satuan baku atau tidak baku?";
const SUARA_P2 = "Tujuan untuk luas di Buku Siswa ada dua: mengukur luas dan menduga luas, masing-masing dengan satuan baku dan tidak baku.";
const SUARA_P3 = "Panduan guru menomorinya: satu titik satu, mengukur luas, dan satu titik dua, mengestimasi luas, keduanya dengan satuan tidak baku dan satuan baku.";
const SUARA_P4 = "Subbab A mengerjakan dua tujuan ini. Tujuan tentang volume menunggu di subbab berikutnya. Kata kunci bab: luas dan volume.";

export const ADEGAN_PEMBUKA: AdeganStory = {
  id: "pembuka-bab",
  judul: "Pembuka Bab 4: tujuan pembelajaran",
  sumber: "Buku Siswa hlm. 103–104; Panduan Guru hlm. 145",
  latar: "#FFF7ED",
  kutipan: [
    "Ketika kalian ingin membeli minuman kemasan",
    "mengamati lantai, dinding, pintu, atau jendela minimarket",
    "kalian menentukan luasnya dengan satuan baku atau tidak baku?",
    "Tujuan Pembelajaran",
    "Setelah mempelajari bab ini kalian mampu:",
    "mengukur luas dengan satuan baku dan",
    "menduga luas dengan satuan baku dan",
    "Kata Kunci",
    "Setelah mempelajari bab ini, peserta didik dapat:",
    "1.1 mengukur luas menggunakan satuan tidak baku dan satuan baku",
    "1.2 mengestimasi luas menggunakan satuan tidak baku dan satuan baku",
  ],
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Bab 4: Pengukuran Luas dan Volume")),
      tambah("lantai,", ...kartu("pl", 14, 34, 130, 28, W.langit, ["lantai"], 9.4)),
      tambah("dinding,", ...kartu("pd", 156, 34, 130, 28, W.hijauMuda, ["dinding"], 9.4)),
      tambah("pintu,", ...kartu("pp", 14, 68, 130, 28, W.krem, ["pintu"], 9.4)),
      tambah("jendela", ...kartu("pj", 156, 68, 130, 28, W.pink, ["jendela"], 9.4)),
      tambah("luasnya", ...kartu("pq", 14, 108, 272, 34, W.emas, ["berapa luasnya? satuan baku", "atau tidak baku?"], 8.8)),
      tambah("minimarket,", emo("pm", 150, 178, "🏪", 30)),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Tujuan pembelajaran")),
      tambah("mengukur", ...kartu("tj1", 14, 36, 272, 44, W.hijauMuda, ["1. mengukur luas dengan", "satuan baku dan tidak baku"], 9)),
      tambah("menduga", ...kartu("tj2", 14, 90, 272, 44, W.langit, ["2. menduga luas dengan", "satuan baku dan tidak baku"], 9)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Tujuan menurut Panduan Guru")),
      tambah("satu", ...kartu("pg1", 14, 36, 272, 44, W.hijauMuda, ["1.1 mengukur luas", "satuan tidak baku dan baku"], 9)),
      tambah("mengestimasi", ...kartu("pg2", 14, 90, 272, 44, W.langit, ["1.2 mengestimasi luas", "satuan tidak baku dan baku"], 9)),
    ),
    k(
      SUARA_P4,
      bersih(0),
      tambah(0, judul("Subbab A: dua tujuan pertama")),
      tambah(0, ...kartu("pa1", 14, 34, 130, 40, W.hijauMuda, ["1.1 mengukur luas"], 9), ...kartu("pa2", 156, 34, 130, 40, W.hijauMuda, ["1.2 mengestimasi luas"], 9)),
      tambah("volume", ...kartu("pb", 14, 84, 272, 34, W.merahMuda, ["tujuan volume: subbab berikutnya"], 8.8, { op: 0.6 })),
      tambah("kunci", ...kartu("kk", 14, 134, 272, 34, W.krem, ["kata kunci: luas, volume"], 9.4)),
      sorotkan("kata", "pa1-k", "pa2-k"),
    ),
  ],
};

/* ------------------------------ 2. Peta konsep, gambaran umum, keterampilan, skema (Buku Siswa hlm. 105; Panduan Guru hlm. 146–147) ------------------------------ */
const SUARA_K1 = "Peta konsep bab ini dimulai dari pengukuran luas dan volume, yang bercabang menjadi pengukuran luas dan pengukuran volume. Subbab A mengambil cabang pengukuran luas.";
const SUARA_K2 = "Cabang pengukuran luas terbagi dua: pengukuran luas menggunakan satuan tidak baku, dan pengukuran luas menggunakan satuan baku.";
const SUARA_K3 = "Gambaran umum di panduan guru: mengukur luas dengan benda sekitar berbentuk persegi atau persegi panjang, lalu dengan persegi satuan, sentimeter persegi, dan meter persegi, serta mengonversi satuan baku.";
const SUARA_K4 = "Keterampilan yang dilatih ada lima: menghitung, membaca, berkomunikasi, berpikir kritis, dan berpikir kreatif. Skema pembelajaran memberi topik A lima belas jam pelajaran.";

export const ADEGAN_PETA: AdeganStory = {
  id: "peta-konsep",
  judul: "Peta konsep, gambaran umum, dan skema pembelajaran",
  sumber: "Buku Siswa hlm. 105; Panduan Guru hlm. 146–147",
  latar: "#F0FDF4",
  kutipan: [
    "Peta Konsep",
    "Pengukuran luas menggunakan",
    "satuan tidak baku",
    "Pengukuran Luas dan Volume",
    "Pengukuran Volume",
    "2. Peta Konsep:",
    "3. Gambaran Umum Bab",
    "berbagai benda yang ada di sekitarnya yang berbentuk persegi maupun persegi panjang",
    "mengonversi dari satuan baku sentimeter persegi menjadi meter persegi atau",
    "4. Keterampilan yang Dilatih",
    "5. Berpikir kreatif",
    "5. Skema Pembelajaran",
    "Topik A:",
    "15 JP",
  ],
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Peta konsep")),
      tambah("pengukuran", ...kartu("ka", 60, 32, 180, 28, W.emas, ["Pengukuran Luas dan Volume"], 8.8)),
      tambah("bercabang", panah("kb1", 120, 62, -50, 22, W.biru, 1.6), panah("kb2", 180, 62, 50, 22, W.biru, 1.6)),
      tambah(idx(SUARA_K1, "luas", 2), ...kartu("kl", 10, 88, 130, 30, W.hijauMuda, ["Pengukuran Luas"], 9.4)),
      tambah(idx(SUARA_K1, "volume", 2), ...kartu("kv", 160, 88, 130, 30, W.pink, ["Pengukuran Volume"], 9.4)),
      sorotkan("Subbab", "kl-k"),
      ubah(idx(SUARA_K1, "cabang"), { id: "kv-k", op: 0.4 }, { id: "kv-t0", op: 0.4 }),
    ),
    k(
      SUARA_K2,
      bersih(0),
      tambah(0, judul("Cabang pengukuran luas")),
      tambah("pengukuran", ...kartu("lu", 80, 32, 140, 28, W.hijauMuda, ["Pengukuran Luas"], 9.4)),
      tambah("terbagi", panah("lb1", 130, 62, -52, 22, W.biru, 1.6), panah("lb2", 170, 62, 52, 22, W.biru, 1.6)),
      tambah("tidak", ...kartu("lt", 8, 88, 136, 36, W.langit, ["satuan tidak baku"], 9)),
      tambah(idx(SUARA_K2, "baku", 2), ...kartu("lk", 156, 88, 136, 36, W.krem, ["satuan baku"], 9)),
    ),
    k(
      SUARA_K3,
      bersih(0),
      tambah(0, judul("Gambaran umum bab")),
      tambah("benda", ...kartu("g1", 8, 32, 136, 40, W.langit, ["benda sekitar", "persegi atau persegi panjang"], 8.2)),
      tambah(idx(SUARA_K3, "persegi", 3), ...kartu("g2", 156, 32, 136, 40, W.hijauMuda, ["persegi satuan"], 8.8)),
      tambah("sentimeter", ...kartu("g3", 8, 84, 136, 40, W.krem, ["sentimeter persegi", "dan meter persegi"], 8.8)),
      tambah("mengonversi", ...kartu("g4", 156, 84, 136, 40, W.pink, ["konversi", "antar satuan baku"], 8.8)),
      tambah("serta", emo("gm", 150, 168, "📏", 30)),
    ),
    k(
      SUARA_K4,
      bersih(0),
      tambah(0, judul("Keterampilan dan skema")),
      tambah("menghitung,", ...kartu("s1", 8, 30, 90, 22, W.hijauMuda, ["menghitung"], 8.4)),
      tambah("membaca,", ...kartu("s2", 105, 30, 90, 22, W.langit, ["membaca"], 8.4)),
      tambah("berkomunikasi,", ...kartu("s3", 202, 30, 90, 22, W.krem, ["berkomunikasi"], 8.4)),
      tambah("kritis,", ...kartu("s4", 38, 58, 110, 22, W.pink, ["berpikir kritis"], 8.4)),
      tambah("kreatif.", ...kartu("s5", 154, 58, 110, 22, W.lavender, ["berpikir kreatif"], 8.4)),
      tambah("Skema", ...kartu("sk", 40, 96, 220, 40, W.emas, ["Skema pembelajaran", "Topik A: 15 JP"], 9)),
    ),
  ],
};

/* ------------------------------ 3. Panduan Guru: pengalaman belajar, perlengkapan, apersepsi, pemanasan (Panduan Guru hlm. 148–149) ------------------------------ */
const SUARA_G1 = "Pengalaman belajar subbab A di panduan guru ada tiga: mengukur luas dengan satuan tidak baku, dengan satuan baku, dan mengonversi antar satuan baku.";
const SUARA_G2 = "Perlengkapan: karton besar dan kecil, uang kertas mainan, kertas origami, buku tulis, gunting, dan lem.";
const SUARA_G3 = "Apersepsi: satuan luas tidak baku belum dibakukan, jadi hasil ukurnya berbeda-beda walaupun bendanya sama. Satuan luas baku sudah dibakukan secara internasional.";
const SUARA_G4 = "Pemanasan: bagaimana menentukan luas lantai kelas? Jika lantainya keramik, hitung keramik yang menutupinya tanpa celah. Bagaimana jika ukuran keramiknya berbeda? Apakah banyaknya sama? Guru tidak perlu menjawabnya dulu.";

/** Lantai keramik: kol kali bar petak berukuran s, pojok kiri-atas (x, y). */
const lantai = (id: string, x: number, y: number, kol: number, bar: number, s: number, warna: string) =>
  Array.from({ length: kol * bar }, (_, n) => kotak(`${id}-${n}`, x + (n % kol) * s, y + Math.floor(n / kol) * s, s, s, warna, W.coklat, { rx: 0, tebal: 0.8 }));

export const ADEGAN_PANDUAN_AWAL: AdeganStory = {
  id: "panduan-awal",
  judul: "Panduan Guru: pengalaman belajar dan pemanasan",
  sumber: "Panduan Guru hlm. 148–149",
  latar: "#FFFBEB",
  kutipan: [
    "A. Pengukuran Luas",
    "a. Mengukur luas dengan satuan tidak baku.",
    "b. Mengukur luas dengan satuan baku.",
    "c. Mengonversi antara satuan baku.",
    "Kebutuhan Sarana Prasarana dan Media",
    "1. Kertas karton besar dan kecil",
    "2. Uang kertas mainan",
    "Apersepsi",
    "Satuan luas tidak baku adalah",
    "satuan luas yang belum dibakukan",
    "Stimulus (Pemanasan)",
    "bagaimana menentukan luas permukaan lantai kelas?",
    "bagaimana jika ukuran keramiknya berbeda?",
    "Guru tidak perlu memberikan jawaban yang benar",
  ],
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Subbab A: Pengukuran Luas")),
      tambah("tidak", ...kartu("pe1", 10, 32, 280, 30, W.hijauMuda, ["a. mengukur luas, satuan tidak baku"], 8.8)),
      tambah(idx(SUARA_G1, "baku", 2), ...kartu("pe2", 10, 70, 280, 30, W.langit, ["b. mengukur luas, satuan baku"], 8.8)),
      tambah("mengonversi", ...kartu("pe3", 10, 108, 280, 30, W.krem, ["c. mengonversi antar satuan baku"], 8.8)),
    ),
    k(
      SUARA_G2,
      bersih(0),
      tambah(0, judul("Perlengkapan")),
      tambah("karton", ...kartu("pf1", 10, 32, 136, 28, W.langit, ["karton besar dan kecil"], 8.4)),
      tambah("uang", ...kartu("pf2", 154, 32, 136, 28, W.hijauMuda, ["uang kertas mainan"], 8.4)),
      tambah("origami,", ...kartu("pf3", 10, 66, 136, 28, W.pink, ["kertas origami"], 8.4)),
      tambah("buku", ...kartu("pf4", 154, 66, 136, 28, W.krem, ["buku tulis"], 8.4)),
      tambah("gunting,", ...kartu("pf5", 10, 100, 136, 28, W.lavender, ["gunting"], 8.4)),
      tambah("lem.", ...kartu("pf6", 154, 100, 136, 28, W.jingga, ["lem"], 8.4)),
    ),
    k(
      SUARA_G3,
      bersih(0),
      tambah(0, judul("Apersepsi")),
      tambah("tidak", ...kartu("ap1", 10, 32, 136, 56, W.langit, ["satuan luas", "tidak baku:", "belum dibakukan"], 8.6)),
      tambah("berbeda-beda", teks("ap1b", 78, 104, "hasil berbeda-beda", 8, W.merah)),
      tambah("Satuan@2", ...kartu("ap2", 154, 32, 136, 56, W.hijauMuda, ["satuan luas", "baku:", "dibakukan"], 8.6)),
      tambah("internasional.", teks("ap2b", 222, 104, "standar internasional", 8, W.hijau)),
    ),
    k(
      SUARA_G4,
      bersih(0),
      tambah(0, judul("Pemanasan: lantai kelas")),
      tambah("lantai?", ...lantai("lt1", 14, 40, 6, 4, 16, W.jingga), teks("lt1t", 62, 124, "keramik besar", 8.6, W.coklat)),
      tambah("keramik,", teks("lq", 150, 150, "hitung keramik yang menutupi lantai", 8.4, W.biru)),
      tambah("berbeda?", ...lantai("lt2", 158, 40, 12, 8, 8, W.langit), teks("lt2t", 206, 124, "keramik kecil", 8.6, W.biru)),
      tambah("sama?", teks("lq2", 150, 176, "luas sama? banyaknya sama?", 9, W.merah)),
    ),
  ],
};

/* ------------------------------ 4. Aktivitas 1: Konsep Luas (Buku Siswa hlm. 105–106; Panduan Guru hlm. 149–150) ------------------------------ */
const SUARA_AK1 = "Aktivitas satu, Konsep Luas. Buat kelompok tiga sampai empat orang. Kertas origami, buku tulis, dan uang kertas mainan dipakai menutupi karton kecil dan besar.";
const SUARA_AK2 = "Langkah dua sampai empat: letakkan kertas origami pada karton kecil sampai menutupinya tanpa celah. Ulangi dengan buku tulis, lalu uang kertas mainan.";
const SUARA_AK3 = "Langkah lima dan enam: ulangi pada karton besar, hitung banyaknya tiap benda, lalu catat dalam tabel. Isinya hasil kelompok sendiri, jadi tidak ada kunci angka.";
const SUARA_AK4 = "Langkah tujuh: bandingkan banyaknya origami, buku tulis, dan uang kertas pada karton kecil, lalu karton besar. Apakah sama? Kelompok menulis kesimpulan.";
const SUARA_AK5 = "Panduan guru menekankan: satuan harus menutupi seluruh karton tanpa celah, dan satuan yang dipilih harus seragam. Terakhir, hasil dipresentasikan.";

export const ADEGAN_AKTIVITAS_SATU: AdeganStory = {
  id: "aktivitas-satu",
  judul: "Aktivitas 1: Konsep Luas",
  sumber: "Buku Siswa hlm. 105–106; Panduan Guru hlm. 149–150",
  latar: "#F0F9FF",
  kutipan: [
    "Aktivitas 1 : Konsep Luas",
    "Kertas origami",
    "Uang kertas mainan",
    "Kertas karton kecil dan besar",
    "Buatlah kelompok yang beranggotakan 3-4 orang",
    "sehingga menutupi kertas karton kecil tanpa celah",
    "Ulangi langkah 2 sampai 4 pada kertas karton besar.",
    "Catatlah",
    "dalam tabel berikut.",
    "Banyaknya Uang",
    "Bandingkan banyaknya kertas origami, buku tulis, dan uang kertas",
    "Tulis kesimpulan yang kalian peroleh dari hasil aktivitas tersebut.",
    "Presentasikan hasil diskusi kelompok di depan kelas.",
    "harus menutupi semua kertas karton tanpa celah.",
    "harus seragam.",
  ],
  ketukan: [
    k(
      SUARA_AK1,
      tambah(0, judul("Aktivitas 1: Konsep Luas")),
      tambah("kelompok", emo("ag", 150, 66, "👥", 30)),
      tambah("origami,", ...kartu("a1", 10, 90, 86, 26, W.pink, ["kertas origami"], 8)),
      tambah("buku", ...kartu("a2", 107, 90, 86, 26, W.krem, ["buku tulis"], 8)),
      tambah("mainan", ...kartu("a3", 204, 90, 86, 26, W.hijauMuda, ["uang mainan"], 8)),
      tambah("karton", ...kartu("a4", 40, 130, 220, 34, W.jingga, ["karton kecil dan karton besar"], 9)),
    ),
    k(
      SUARA_AK2,
      bersih(0),
      tambah(0, judul("Menutupi karton kecil")),
      tambah("origami", kotak("ka", 20, 40, 100, 70, W.jingga, W.coklat), ...[0, 1, 2, 3, 4, 5].map((n) => kotak(`ko${n}`, 20 + (n % 3) * 33.3, 40 + Math.floor(n / 3) * 35, 33.3, 35, W.pink, W.biru, { rx: 0, tebal: 0.8 }))),
      tambah("buku", kotak("kb", 180, 40, 100, 70, W.jingga, W.coklat), ...[0, 1].map((n) => kotak(`kbu${n}`, 180 + n * 50, 40, 50, 70, W.krem, W.biru, { rx: 0, tebal: 0.8 }))),
      tambah("uang", teks("kt1", 70, 128, "origami", 8.6, W.biru), teks("kt2", 230, 128, "buku tulis", 8.6, W.biru)),
      tambah("celah.", teks("kt3", 150, 168, "tanpa celah", 10, W.hijau)),
    ),
    k(
      SUARA_AK3,
      bersih(0),
      tambah(0, judul("Hasil dicatat dalam tabel")),
      tambah("karton", ...tabel("tb", 10, 36, [58, 70, 70, 82], [["Karton", "Origami", "Buku tulis", "Uang mainan"], ["Kecil", "?", "?", "?"], ["Besar", "?", "?", "?"]], 22, 8.4)),
      tambah("catat", emo("ta", 150, 130, "📝", 30)),
      tambah("sendiri,", teks("tc", 150, 166, "isi tabel = hasil kelompok", 9, W.merah)),
    ),
    k(
      SUARA_AK4,
      bersih(0),
      tambah(0, judul("Bandingkan dan simpulkan")),
      tambah("karton", ...kartu("pb1", 10, 36, 136, 38, W.langit, ["karton kecil:", "banyaknya sama?"], 8.8)),
      tambah("besar.", ...kartu("pb2", 154, 36, 136, 38, W.hijauMuda, ["karton besar:", "banyaknya sama?"], 8.8)),
      tambah("sama?", emo("pb3", 150, 110, "🤔", 30)),
      tambah("kesimpulan.", ...kartu("pb4", 40, 130, 220, 34, W.emas, ["tulis kesimpulan kelompok"], 9)),
    ),
    k(
      SUARA_AK5,
      bersih(0),
      tambah(0, judul("Pesan untuk guru")),
      tambah("seluruh", ...kartu("pc1", 10, 34, 136, 56, W.hijauMuda, ["menutupi seluruh", "karton:", "tanpa celah"], 8.6)),
      tambah("seragam.", ...kartu("pc2", 154, 34, 136, 56, W.langit, ["satuan yang dipilih", "harus seragam"], 8.6)),
      tambah("Terakhir,", ...kartu("pc3", 40, 108, 220, 32, W.krem, ["presentasi hasil di depan kelas"], 9)),
      sorotkan("tanpa", "pc1-k"),
    ),
  ],
};
