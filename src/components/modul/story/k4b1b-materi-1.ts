import type { AdeganStory } from "./logika-story";
import { NAMA_WARNA, W, WARNA_KARDUS, emo, judul, kardus, kisiKartu, kotak, kartu, panah, struk, teks } from "./k4b1b-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah } from "./k4b1b-bantu";

const idKartu = (id: string, n = 1): string[] => [`${id}-k`, ...Array.from({ length: n }, (_, i) => `${id}-t${i}`)];
/** Kardus dengan label hitam dulu; warna spidol diberikan kemudian lewat `ubah`. */
const kardusPolos = (id: string, x: number, y: number, w: number, h: number, i: number) => kardus(id, x, y, w, h, i).map((o) => (o.id.endsWith("-t") ? { ...o, warna: W.hitam } : o));

/* ------------------------------ 1. Pembuka Sub-Bab B dan Ayo Mengamati: struk belanja (Buku Siswa hlm. 12; Panduan Guru hlm. 35) ------------------------------ */
const SUARA_S1 = "Subbab B: Menentukan dan Menggunakan Nilai Tempat Bilangan Cacah sampai sepuluh ribu. Kita mulai dengan Ayo Mengamati: perhatikan gambar dengan cermat.";
const SUARA_S2 = "Gambarnya sehelai struk belanja. Tokonya Mini Mart di Jalan Ciliwung nomor tiga puluh sembilan, tanggal sembilan bulan sembilan tahun dua ribu dua puluh dua.";
const SUARA_S3 = "Barang yang dibeli makanan ringan satu buah, harganya dua ribu seratus lima puluh. Totalnya juga dua ribu seratus lima puluh rupiah.";
const SUARA_S4 = "Ingat ya: bilangan juga memiliki nilai tempat. Beberapa angka yang bergabung dalam bilangan memiliki nilai tempat masing-masing. Sebelum memahami lebih jauh, kita lakukan aktivitas berikut.";

const ST = struk("st", 20, 34);

export const ADEGAN_STRUK: AdeganStory = {
  id: "struk-belanja",
  judul: "Subbab B dan Ayo Mengamati: struk belanja",
  sumber: "Materi: nilai tempat dari struk",
  latar: "#F0F9FF",
  kutipan: [
    "B. Menentukan dan Menggunakan Nilai Tempat Bilangan Cacah sampai 10.000",
    "Ayo Mengamati",
    "Perhatikan gambar di bawah dengan cermat.",
    "Bilangan juga memiliki nilai tempat.",
    "Beberapa angka yang bergabung dalam bilangan memiliki nilai tempat masing-masing.",
    "Sebelum kalian memahami lebih jauh, Ayo kita lakukan aktivitas berikut.",
    "B. Nilai Tempat Bilangan Cacah",
  ],
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Subbab B: Nilai Tempat")),
      tambah("Menentukan", ...kartu("jb", 14, 30, 272, 40, W.langit, ["Menentukan dan Menggunakan Nilai Tempat", "Bilangan Cacah sampai"], 9)),
      tambah("sepuluh", teks("jr", 150, 112, "10.000", 26, W.merah)),
      tambah("Mengamati:", ...kartu("am", 30, 128, 240, 44, W.krem, ["Ayo Mengamati:", "perhatikan gambar dengan cermat"], 9.2), emo("lp", 150, 192, "🔍", 16)),
    ),
    k(
      SUARA_S2,
      bersih(0),
      tambah(0, judul("Ayo Mengamati: struk belanja")),
      tambah("struk", ST[0]),
      tambah("Mini", ST[1]),
      tambah("Jalan", ST[2], ...kartu("r1", 148, 44, 142, 40, W.hijauMuda, ["alamat toko", "Jl. Ciliwung No. 39"], 8.2)),
      tambah("tanggal", ST[3], ...kartu("r2", 148, 98, 142, 40, W.krem, ["tanggal dan jam", "9-9-2022, 15.45"], 8.2)),
    ),
    k(
      SUARA_S3,
      tambah("makanan", ST[4]),
      tambah("harganya", ST[5]),
      sorotkan("harganya", "st-t4"),
      tambah("Totalnya", ST[6]),
      sorotkan("Totalnya", "st-t5"),
      tambah("rupiah.", ST[7]),
      hapus("seratus@2", ...idKartu("r1", 2), ...idKartu("r2", 2)),
      tambah("seratus@2", ...kartu("r3", 148, 70, 142, 48, W.pink, ["total belanja", "Rp2.150"], 9.2)),
    ),
    k(
      SUARA_S4,
      hapus(0, ...idKartu("r3", 2)),
      tambah("bilangan", ...kartu("n1", 148, 34, 142, 40, W.langit, ["bilangan juga memiliki", "nilai tempat"], 8.4)),
      tambah("Beberapa", ...kartu("n2", 148, 82, 142, 50, W.hijauMuda, ["angka yang bergabung", "memiliki nilai tempat", "masing-masing"], 8)),
      tambah("Sebelum", ...kartu("n3", 148, 140, 142, 36, W.emas, ["ayo lakukan aktivitas"], 8.6)),
    ),
  ],
};

/* ------------------------------ 2. Panduan Guru: pengalaman belajar, sarana, apersepsi, pemantik (Panduan Guru hlm. 35–36) ------------------------------ */
const SUARA_P1 = "Panduan guru menulis pengalaman belajar subbab ini: murid mampu membandingkan dan mengurutkan bilangan sampai sepuluh ribu. Catatan video: kalimat itu tampaknya terbawa dari subbab sesudahnya, sebab isi subbab B adalah nilai tempat.";
const SUARA_P2 = "Sarana dan media yang dibutuhkan: kardus atau wadah berbentuk kotak, kertas karton, gunting, dan spidol warna.";
const SUARA_P3 = "Apersepsi: guru menyiapkan barang kontekstual, misalnya kertas struk belanja yang memuat angka bilangan cacah empat angka. Guru juga dianjurkan menyiapkan contoh cerita lain, dan topik ini boleh melatih aspek psikomotor murid.";
const SUARA_P4 = "Pertanyaan pemantik: bisakah kalian menyebutkan harga yang tertera pada struk belanja? Lalu, bisakah kalian menyebutkan berapa ribuan, ratusan, puluhan, dan satuan uang yang harus dibayar? Pada struk tadi: dua ribu seratus lima puluh rupiah.";

export const ADEGAN_PANDUAN_AWAL: AdeganStory = {
  id: "panduan-awal",
  judul: "Panduan Guru: pengalaman belajar, apersepsi, pemantik",
  sumber: "Panduan Guru hlm. 35–36",
  latar: "#FFFBEB",
  kutipan: [
    "Pengalaman Belajar",
    "Setelah mempelajari sub bab ini, diharapkan peserta didik mampu membandingkan dan mengurut bilangan sampai angka 10.000.",
    "Kebutuhan Sarana Prasarana dan Media",
    "Kardus/wadah berbentuk kotak, kertas karton, gunting, spidol warna",
    "Apersepsi",
    "Guru telah menyediakan segala sesuatu yang terkait dengan cerita yang dirancang",
    "kertas struk belanja",
    "Guru dianjurkan mempersiapkan alternatif contoh cerita kontekstual yang lain",
    "Pada topik ini guru dapat mengeksplorasi aspek psikomotor peserta didik.",
    "Stimulus (Pemanasan)",
    "Pertanyaan Esensi/Pemantik",
    "Bisakah kalian menyebutkan harga yang tertera dalam struk belanja?",
    "bisakah kalian menyebutkan berapa ribu, berapa ratus, berapa puluh, dan berapa satuan uang yang harus dibayarkan?",
  ],
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Pengalaman belajar (Panduan Guru)")),
      tambah("murid", ...kartu("pe", 14, 30, 272, 50, W.hijauMuda, ["murid mampu membandingkan dan", "mengurutkan bilangan sampai 10.000"], 8.8)),
      tambah("Catatan", ...kartu("ct", 14, 98, 272, 70, W.emas, ["catatan video:", "kalimat itu terbawa dari subbab sesudahnya;", "isi subbab B adalah nilai tempat"], 8.8)),
      sorotkan("nilai", "ct-k"),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Sarana dan media")),
      tambah("kardus", ...kartu("sa1", 14, 36, 132, 50, W.krem, ["kardus atau wadah", "berbentuk kotak"], 8.6)),
      tambah("kertas", ...kartu("sa2", 154, 36, 132, 50, W.langit, ["kertas karton"], 9.2)),
      tambah("gunting,", ...kartu("sa3", 14, 100, 132, 50, W.pink, ["gunting"], 9.2)),
      tambah("spidol", ...kartu("sa4", 154, 100, 132, 50, W.hijauMuda, ["spidol warna"], 9.2)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Apersepsi")),
      tambah("kertas", emo("ap", 52, 74, "🧾", 34), teks("ap1", 52, 100, "kertas struk belanja", 8.2, W.biru)),
      tambah("angka", ...kartu("ap2", 108, 40, 180, 46, W.hijauMuda, ["bilangan cacah", "empat angka"], 9)),
      tambah("contoh", ...kartu("ap3", 14, 118, 272, 32, W.krem, ["siapkan contoh cerita kontekstual lain"], 8.8)),
      tambah("psikomotor", ...kartu("ap4", 14, 158, 272, 32, W.pink, ["melatih aspek psikomotor murid"], 8.8)),
    ),
    k(
      SUARA_P4,
      bersih(0),
      tambah(0, judul("Pertanyaan pemantik")),
      tambah("harga", ...kartu("pm1", 14, 30, 272, 38, W.hijauMuda, ["1. berapa harga yang tertera pada struk?"], 8.8)),
      tambah("Lalu,", ...kartu("pm2", 14, 76, 272, 50, W.langit, ["2. berapa ribuan, ratusan, puluhan,", "dan satuan uang yang dibayar?"], 8.8)),
      tambah("Pada", ...kartu("pm3", 14, 136, 272, 56, W.krem, ["contoh video: Rp2.150", "2 ribuan, 1 ratusan, 5 puluhan,", "0 satuan"], 8.6)),
    ),
  ],
};

/* ------------------------------ 3. Aktivitas 2: alat, kelompok, empat kardus (Buku Siswa hlm. 13; Panduan Guru hlm. 36) ------------------------------ */
const SUARA_A1 = "Aktivitas dua: Nilai Tempat. Alat dan bahan: empat kardus bekas atau wadah berbentuk kotak, kertas karton, gunting, dan spidol warna.";
const SUARA_A2 = "Langkah satu: buat kelompok kerja tiga sampai lima orang. Kita bentuk kelompok heterogen, yaitu campuran teman dengan kemampuan berbeda, supaya kalian bergotong royong.";
const SUARA_A3 = "Langkah dua: beri label pada empat kardus, yaitu ribuan, ratusan, puluhan, dan satuan. Tulis dengan spidol berwarna biru, oranye, hijau, dan merah.";
const SUARA_A4 = "Langkah tiga: letakkan kardus berurutan dari kiri ke kanan, yaitu ribuan, ratusan, puluhan, lalu satuan. Kita boleh mengganti kardus dengan tempat lain yang mudah diperoleh.";

const KARDUS_X = [10, 83, 156, 229];

export const ADEGAN_AKTIVITAS_ALAT: AdeganStory = {
  id: "aktivitas-alat",
  judul: "Aktivitas 2: alat, kelompok, dan empat kardus",
  sumber: "Materi: alat dan kardus nilai tempat",
  latar: "#F0FDF4",
  kutipan: [
    "Aktivitas 2. Nilai Tempat",
    "Alat dan Bahan:",
    "4 Buah kardus bekas/wadah berbentuk kotak",
    "Kertas karton",
    "Gunting",
    "Spidol Warna",
    "Buatlah kelompok kerja yang terdiri dari 3-5 orang.",
    "dengan menggunakan spidol berwarna biru, orange, hijau, dan merah.",
    "Letakkan kardus ribuan, kardus ratusan, kardus puluhan, dan kardus satuan berurutan dari kiri ke kanan.",
    "Guru membentuk kelompok heterogen",
    "Kardus dapat diganti dengan tempat lain yang mudah diperoleh peserta didik.",
  ],
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Aktivitas 2: Nilai Tempat")),
      tambah("kardus", ...kartu("al1", 14, 34, 132, 56, W.krem, ["4 kardus bekas", "atau wadah kotak"], 8.8)),
      tambah("kertas", ...kartu("al2", 154, 34, 132, 56, W.langit, ["kertas karton"], 9.2)),
      tambah("gunting,", ...kartu("al3", 14, 104, 132, 56, W.pink, ["gunting"], 9.2)),
      tambah("spidol", ...kartu("al4", 154, 104, 132, 56, W.hijauMuda, ["spidol warna"], 9.2)),
    ),
    k(
      SUARA_A2,
      bersih(0),
      tambah(0, judul("Langkah 1: kelompok kerja")),
      tambah("kelompok", ...kartu("kl", 40, 32, 220, 36, W.langit, ["kelompok 3 sampai 5 orang"], 9.4)),
      tambah("heterogen,", ...kartu("kh", 40, 80, 220, 36, W.krem, ["heterogen: campuran kemampuan"], 9)),
      tambah("heterogen,", emo("o1", 60, 158, "👦", 30)),
      tambah("campuran", emo("o2", 112, 158, "👧", 30)),
      tambah("kemampuan", emo("o3", 164, 158, "🧒", 30)),
      tambah("bergotong", emo("o4", 216, 158, "🧑", 30), teks("kg", 150, 186, "bergotong royong", 9, W.hijau)),
    ),
    k(
      SUARA_A3,
      bersih(0),
      tambah(0, judul("Langkah 2: label dan warna spidol")),
      ...[0, 1, 2, 3].map((i) => tambah(idx(SUARA_A3, ["ribuan,", "ratusan,", "puluhan,", "satuan."][i].replace(/[.,]/g, "")), ...kardusPolos(`kd${i}`, KARDUS_X[i], 60, 62, 46, i))),
      ...[0, 1, 2, 3].map((i) => ubah(["biru", "oranye", "hijau", "merah"][i], { id: `kd${i}-t`, warna: WARNA_KARDUS[i] })),
      tambah("spidol", teks("sp", 150, 140, "label ditulis dengan spidol", 9, W.biru)),
      ...[0, 1, 2, 3].map((i) => tambah(["biru", "oranye", "hijau", "merah"][i], teks(`sw${i}`, KARDUS_X[i] + 31, 124, NAMA_WARNA[i], 8.6, WARNA_KARDUS[i]))),
    ),
    k(
      SUARA_A4,
      ...[0, 1, 2, 3].map((i) => tambah(["ribuan,", "ratusan,", "puluhan,", "lalu"][i].replace(/,/g, ""), teks(`no${i}`, KARDUS_X[i] + 31, 160, String(i + 1), 12, W.ungu))),
      tambah("kiri", panah("ur", 22, 176, 250, 0, W.ungu, 2)),
      tambah("kiri", teks("kk", 150, 196, "dari kiri ke kanan", 8.6, W.ungu)),
      tambah("mengganti", ...kartu("gt", 40, 30, 220, 24, W.emas, ["kardus boleh diganti wadah lain"], 8.4)),
    ),
  ],
};

/* ------------------------------ 4. Aktivitas 2: kartu bilangan (Buku Siswa hlm. 13; Panduan Guru hlm. 36–37) ------------------------------ */
const SUARA_K1 = "Langkah empat: siapkan kertas karton, lalu buat kotak berukuran sepuluh sentimeter kali sepuluh sentimeter sebanyak empat puluh kotak. Mari lihat contoh terlebih dahulu.";
const SUARA_K2 = "Langkah lima: tulis angka nol sampai sembilan pada tiap kotak. Satu paket berisi sepuluh kartu, ada empat paket, jadi empat kali sepuluh sama dengan empat puluh kartu.";
const SUARA_K3 = "Langkah enam dan tujuh: gunting menjadi kartu bilangan, sehingga ada empat paket. Paket satu bertulisan biru, paket dua oranye, paket tiga hijau, dan paket empat merah.";
const SUARA_K4 = "Langkah delapan: masukkan tiap paket ke kardus yang sesuai warna tulisannya, dan pastikan semua kardus terisi kartu bilangan. Biru ke ribuan, oranye ke ratusan, hijau ke puluhan, merah ke satuan.";

const LATAR_PAKET = [W.langit, W.jingga, W.hijauMuda, W.merahMuda];
const GRID = kisiKartu("kt", 10, 56, 10, 4, 22, 22);

export const ADEGAN_AKTIVITAS_KARTU: AdeganStory = {
  id: "aktivitas-kartu",
  judul: "Aktivitas 2: empat paket kartu bilangan",
  sumber: "Materi: kartu bilangan",
  latar: "#FFF7ED",
  kutipan: [
    "Siapkan kertas karton, buatlah kotak-kotak berukuran 10 cm x 10 cm sebanyak 40 kotak.",
    "Tuliskan angka 0, 1, … sampai 9 pada setiap kotak dengan warna spidol yang berbeda.",
    "Guntinglah menjadi kartu bilangan.",
    "Kalian telah mempunyai 4 paket kartu bilangan.",
    "Paket kartu bilangan 1 dengan tulisan berwarna biru.",
    "Paket kartu bilangan 2 dengan tulisan berwarna orange.",
    "Paket kartu bilangan 3 dengan tulisan berwarna hijau.",
    "Paket kartu bilangan 4 dengan tulisan berwarna merah.",
    "Masukkan setiap paket kartu bilangan ke dalam 4 kardus yang tersedia sesuai warna tulisannya.",
    "Pastikan semua kardus terisi oleh kartu bilangan.",
    "Guru dapat memberikan contoh terlebih dahulu.",
  ],
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Langkah 4: kotak kartu")),
      tambah("sepuluh", ...kartu("uk", 14, 28, 272, 20, W.krem, ["setiap kotak 10 cm × 10 cm"], 8.4)),
      tambah("empat@2", ...GRID),
      tambah("empat@2", teks("jk", 150, 160, "40 kotak", 14, W.merah)),
      tambah("contoh", teks("cx", 150, 184, "lihat contoh dahulu", 8.2, W.coklat)),
    ),
    k(
      SUARA_K2,
      hapus(0, ...idKartu("uk"), "cx"),
      ...GRID.map((o, i) => ubah(idx(SUARA_K2, "nol"), { id: o.id, warna: LATAR_PAKET[Math.floor(i / 10)] })),
      ...Array.from({ length: 40 }, (_, i) => tambah(idx(SUARA_K2, "sembilan"), teks(`kd${i}`, 10 + (i % 10) * 22 + 11, 56 + Math.floor(i / 10) * 22 + 15, String(i % 10), 11, W.biru))),
      tambah("tiap", teks("pk", 150, 182, "1 paket = 10 kartu (0 sampai 9)", 8.6, W.hijau)),
      ubah("jadi", { id: "jk", isi: "4 × 10 = 40 kartu" }),
    ),
    k(
      SUARA_K3,
      hapus(0, "pk"),
      ...[0, 1, 2, 3].map((i) => tambah(["satu", "dua", "tiga", "empat@2"][i], teks(`pt${i}`, 258, 76 + i * 22, `${NAMA_WARNA[i]}`, 8.6, WARNA_KARDUS[i]))),
      ...[0, 1, 2, 3].map((i) => ubah(["satu", "dua", "tiga", "empat@2"][i], ...Array.from({ length: 10 }, (_, j) => ({ id: `kd${i * 10 + j}`, warna: WARNA_KARDUS[i] })))),
      ...[0, 1, 2, 3].map((i) => tambah(["satu", "dua", "tiga", "empat@2"][i], teks(`pn${i}`, 258, 64 + i * 22, `paket ${i + 1}`, 7.2, W.hitam))),
    ),
    k(
      SUARA_K4,
      bersih(0),
      tambah(0, judul("Langkah 8: paket masuk kardus")),
      ...[0, 1, 2, 3].map((i) => tambah(["Biru", "oranye", "hijau", "merah"][i], ...kardus(`kk${i}`, KARDUS_X[i], 96, 62, 50, i), ...kartuTumpuk(i))),
      tambah("pastikan", ...kartu("ps", 40, 168, 220, 24, W.emas, ["semua kardus harus terisi kartu"], 8.6)),
    ),
  ],
};

/** Dua kartu kecil bertulisan warna paket yang mencuat dari kardus ke-i. */
function kartuTumpuk(i: number) {
  return [kotak(`kg${i}a`, KARDUS_X[i] + 14, 70, 22, 22, W.putih, WARNA_KARDUS[i], { rx: 2, tebal: 1.6 }), kotak(`kg${i}b`, KARDUS_X[i] + 26, 76, 22, 22, W.putih, WARNA_KARDUS[i], { rx: 2, tebal: 1.6 })];
}

