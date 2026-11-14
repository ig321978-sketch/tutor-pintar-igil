import type { AdeganStory } from "./logika-story";
import { W, barisNT, blok, emo, isiSel, judul, kartu, kepalaNT, panah, soalNT, teks } from "./k4b1f-gambar";
import { bersih, idx, k, tambah, ubah } from "./k4b1f-bantu";

export const NAMA_METODE = ["Standard Subtraction", "Borrowing", "Counting Up", "Compensation"];
export const NAMA_METODE_ID = ["Pengurangan Bersusun", "Meminjam", "Menghitung Naik", "Kompensasi"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.krem, W.pink];
export const IKON_METODE = ["🧮", "🤝", "🚶", "⚖️"];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number) => kartu("hd", 6, 24, 288, 22, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

/** Nomor kata terakhir dalam kalimat suara. */
const akhir = (suara: string): number => suara.split(/\s+/).filter(Boolean).length - 1;

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Bagaimana kita mengurangi bilangan sampai seribu dengan tepat? Guru di berbagai negara punya cara berbeda. Dalam video ini kita lihat empat metode dari luar, dengan angka-angka yang sudah kita pelajari.";
const SUARA_O2 = "Empat metode itu: Standard Subtraction, Borrowing, Counting Up, dan Compensation.";
const SUARA_O3 = "Nama dalam bahasa Indonesia: Pengurangan Bersusun, Meminjam, Menghitung Naik, dan Kompensasi. Metode keempat melengkapi tiga cara yang kita pelajari di kelas.";
const SUARA_O4 = "Semuanya menjawab satu pertanyaan: berapa selisih dua bilangan? Dengan menulis bersusun, membuka puluhan, melompat naik, atau menyesuaikan angka agar lebih bulat.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Empat metode dari luar untuk pengurangan",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Empat metode dari luar")),
      tambah("Bagaimana", ...kartu("po1", 40, 40, 220, 34, W.langit, ["pengurangan sampai 1.000"], 10.4)),
      tambah("tepat?", teks("pq", 80, 118, "?", 46, W.merah)),
      tambah("berbagai", emo("gl", 215, 110, "🌍", 36)),
      tambah("empat", ...kartu("pk4", 40, 146, 220, 30, W.emas, ["4 metode dari luar"], 10)),
    ),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Empat metode")),
      ...NAMA_METODE.map((m, i) => tambah(["Standard", "Borrowing,", "Counting", "Compensation."][i], ...kartu(`m${i}`, 12, 34 + i * 38, 276, 30, WARNA_METODE[i], [`${i + 1}. ${m}`], 9.6))),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Nama dalam bahasa Indonesia")),
      ...NAMA_METODE_ID.map((m, i) => tambah(idx(SUARA_O3, ["Bersusun", "Meminjam", "Naik", "Kompensasi"][i]), ...kartu(`n${i}`, 12, 34 + i * 38, 276, 30, WARNA_METODE[i], [`${i + 1}. ${m}`], 9.6))),
      tambah("melengkapi", emo("n4", 270, 20, "⭐", 18)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Satu pertanyaan, empat cara")),
      tambah("menulis", emo("i1", 45, 78, IKON_METODE[0], 32), teks("i1t", 45, 108, "tulis bersusun", 8, W.biru)),
      tambah("membuka", emo("i2", 112, 78, IKON_METODE[1], 32), teks("i2t", 112, 108, "buka puluhan", 8, W.biru)),
      tambah("melompat", emo("i3", 188, 78, IKON_METODE[2], 32), teks("i3t", 188, 108, "lompat naik", 8, W.biru)),
      tambah("menyesuaikan", emo("i4", 258, 78, IKON_METODE[3], 32), teks("i4t", 258, 108, "sesuaikan", 8, W.biru)),
      tambah("pertanyaan:", ...kartu("iq", 40, 134, 220, 30, W.emas, ["berapa selisih dua bilangan?"], 10)),
    ),
  ],
};

/* ------------------------------ 2. Standard Subtraction: konsep ------------------------------ */
const SUARA_S1 = "Metode pertama, Standard Subtraction, atau Pengurangan Bersusun. Tulis dua bilangan bersusun ke bawah: satuan di bawah satuan, puluhan di bawah puluhan, ratusan di bawah ratusan.";
const SUARA_S2 = "Langkah pertama: mulai dari kolom satuan, paling kanan. Kurangkan angka atas dengan angka bawah. Langkah kedua: lanjut ke puluhan. Langkah ketiga: ratusan.";
const SUARA_S3 = "Bila angka atas cukup besar, langsung kurangkan. Contohnya dua ratus enam puluh lima dikurangi seratus tiga puluh dua: lima kurang dua sama dengan tiga, enam kurang tiga sama dengan tiga, dua kurang satu sama dengan satu.";
const SUARA_S4 = "Bila angka atas lebih kecil, kita perlu bantuan metode berikutnya. Standard Subtraction sendiri adalah kerangkanya: susun, mulai dari kanan, kurangkan tiap kolom, lalu tulis hasilnya.";

export const ADEGAN_LUAR_STANDAR: AdeganStory = {
  id: "luar-standar",
  judul: "Standard Subtraction: susun lalu kurangkan",
  sumber: "Metode luar: Standard Subtraction",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Standard Subtraction")),
      tambah("pertama,", kepala(0)),
      tambah("Tulis", ...kepalaNT("sa", 84, 62, 44, 15, 7.4)),
      tambah("bawah:", ...barisNT("sr0", 84, 77, ["2", "6", "5"], 44, 22, 12), ...barisNT("sr1", 84, 99, ["1", "3", "2"], 44, 22, 12), teks("sm", 224, 114, "−", 16, W.biru)),
      tambah("satuan@1", ...kartu("sk", 20, 150, 260, 28, W.krem, ["kolom sejajar sesuai nilai tempat"], 9.6)),
    ),
    k(
      SUARA_S2,
      bersih(0),
      tambah(0, judul("Mulai dari kanan")),
      tambah(0, ...kepalaNT("sa", 84, 40, 44, 15, 7.4), ...barisNT("sr0", 84, 55, ["2", "6", "5"], 44, 22, 12), ...barisNT("sr1", 84, 77, ["1", "3", "2"], 44, 22, 12)),
      tambah("pertama:", ...kartu("s1", 84 + 88 + 6, 122, 32, 22, W.emas, ["1"], 12), panah("sp1", 194, 118, 0, -12, W.merah, 2)),
      tambah("kedua:", ...kartu("s2", 84 + 44 + 6, 122, 32, 22, W.emas, ["2"], 12), panah("sp2", 150, 118, 0, -12, W.merah, 2)),
      tambah("ketiga:", ...kartu("s3", 84 + 6, 122, 32, 22, W.emas, ["3"], 12), panah("sp3", 106, 118, 0, -12, W.merah, 2)),
      tambah("ratusan.", teks("sq", 150, 170, "kanan ke kiri", 10.4, W.coklat)),
    ),
    k(
      SUARA_S3,
      bersih(0),
      tambah(0, judul("Angka atas cukup besar")),
      tambah(0, ...kepalaNT("sa", 84, 30, 44, 15, 7.4), ...barisNT("sr0", 84, 45, ["2", "6", "5"], 44, 22, 12), ...barisNT("sr1", 84, 67, ["1", "3", "2"], 44, 22, 12), ...barisNT("sr2", 84, 89, ["", "", ""], 44, 22, 12), teks("sm", 224, 85, "−", 16, W.biru)),
      tambah("Contohnya", teks("sc0", 150, 138, "265 − 132 = ?", 12, W.biru)),
      tambah(idx(SUARA_S3, "lima", 2), isiSel("sr2", 84, 89, 2, "3", 44, 22, 12)),
      tambah(idx(SUARA_S3, "enam", 2), isiSel("sr2", 84, 89, 1, "3", 44, 22, 12)),
      tambah(idx(SUARA_S3, "dua", 4), isiSel("sr2", 84, 89, 0, "1", 44, 22, 12)),
      tambah(akhir(SUARA_S3), teks("sc4", 150, 170, "265 − 132 = 133", 13, W.hijau)),
    ),
    k(
      SUARA_S4,
      bersih(0),
      tambah(0, judul("Kerangka metode")),
      tambah("susun,", ...kartu("sf1", 14, 36, 128, 30, W.hijauMuda, ["1. susun"], 10.4)),
      tambah("kanan,", ...kartu("sf2", 158, 36, 128, 30, W.langit, ["2. mulai dari kanan"], 10.4)),
      tambah("kurangkan", ...kartu("sf3", 14, 78, 128, 30, W.krem, ["3. kurangkan tiap kolom"], 9.6)),
      tambah("tulis", ...kartu("sf4", 158, 78, 128, 30, W.pink, ["4. tulis hasilnya"], 10.4)),
      tambah("lebih", ...kartu("sf5", 20, 128, 260, 40, W.merahMuda, ["angka atas lebih kecil:", "perlu meminjam"], 9.8)),
    ),
  ],
};

/* ------------------------------ 3. Standard Subtraction: penerapan dengan angka buku ------------------------------ */
const SUARA_T1 = "Coba hitung enam ratus tiga puluh tiga dikurangi dua ratus sebelas. Satuan tiga kurang satu sama dengan dua, puluhan tiga kurang satu sama dengan dua, ratusan enam kurang dua sama dengan empat. Hasilnya empat ratus dua puluh dua.";
const SUARA_T2 = "Soal berikutnya: delapan ratus tujuh puluh sembilan dikurangi empat ratus tiga puluh enam. Satuan sembilan kurang enam sama dengan tiga, puluhan tujuh kurang tiga sama dengan empat, ratusan delapan kurang empat sama dengan empat. Hasilnya empat ratus empat puluh tiga.";
const SUARA_T3 = "Soal dengan angka atas lebih kecil: lima ratus tujuh puluh tiga dikurangi dua ratus enam puluh delapan. Tiga kurang delapan tidak bisa, jadi di sini metode ini perlu bantuan meminjam. Hasil akhirnya tiga ratus lima.";
const SUARA_T4 = "Kita periksa hasilnya: empat ratus dua puluh dua, empat ratus empat puluh tiga, dan tiga ratus lima. Semuanya benar. Standard Subtraction cukup untuk soal yang tidak perlu mengambil.";

const TS1 = soalNT("ta", 633, 211);
const TS2 = soalNT("ta", 879, 436);
const TS3 = soalNT("ta", 573, 268);

export const ADEGAN_LUAR_STANDAR_TERAPAN: AdeganStory = {
  id: "luar-standar-terapan",
  judul: "Standard Subtraction pada soal latihan",
  sumber: "Metode luar: Standard Subtraction",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Standard Subtraction: 633 − 211")),
      tambah("Coba", ...TS1.dasar),
      tambah(idx(SUARA_T1, "sama", 1), TS1.hasil(2)),
      tambah(idx(SUARA_T1, "sama", 2), TS1.hasil(1)),
      tambah(idx(SUARA_T1, "sama", 3), TS1.hasil(0)),
      tambah("Hasilnya", TS1.persamaan(160)),
    ),
    k(
      SUARA_T2,
      bersih(0),
      tambah(0, judul("Standard Subtraction: 879 − 436")),
      tambah("Soal", ...TS2.dasar),
      tambah(idx(SUARA_T2, "sama", 1), TS2.hasil(2)),
      tambah(idx(SUARA_T2, "sama", 2), TS2.hasil(1)),
      tambah(idx(SUARA_T2, "sama", 3), TS2.hasil(0)),
      tambah("Hasilnya", TS2.persamaan(160)),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Angka atas lebih kecil")),
      tambah("Soal", ...TS3.dasar),
      tambah(idx(SUARA_T3, "tiga", 2), teks("tx", 258, 90, "3 < 8", 11, W.merah)),
      tambah("tidak", ...kartu("tk", 20, 150, 260, 26, W.merahMuda, ["perlu meminjam dulu"], 10)),
      tambah("Hasil", TS3.persamaan(194)),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Periksa hasilnya")),
      tambah("Periksa", ...[["633 − 211", "422"], ["879 − 436", "443"], ["573 − 268", "305"]].flatMap(([s, h], i) => [...kartu(`tp${i}`, 20, 34 + i * 38, 260, 30, W.hijauMuda, [`${s} = ${h}`], 12)])),
      tambah("cukup", ...kartu("tq", 20, 150, 260, 36, W.emas, ["tanpa mengambil: cukup", "Standard Subtraction"], 9.8)),
    ),
  ],
};

/* ------------------------------ 4. Borrowing: konsep ------------------------------ */
const SUARA_B1 = "Metode kedua, Borrowing, atau Meminjam. Bila angka atas lebih kecil daripada angka bawah, kita meminjam satu dari kolom di sebelah kirinya. Di kelas kita, tindakan ini disebut mengambil.";
const SUARA_B2 = "Satu puluhan bernilai sepuluh satuan. Jadi satu batang puluhan dibuka menjadi sepuluh kotak satuan. Dua ratus empat puluh satu menjadi dua ratus, tiga puluh, dan sebelas satuan.";
const SUARA_B3 = "Sekarang satuannya sebelas, cukup untuk dikurangi sembilan: sebelas kurang sembilan sama dengan dua. Puluhan tinggal tiga, kurang dua sama dengan satu. Ratusan dua kurang satu sama dengan satu. Hasilnya seratus dua belas.";
const SUARA_B4 = "Bila puluhan juga tidak cukup, pinjam lagi dari ratusan. Satu ratusan dibuka menjadi sepuluh puluhan. Meminjam dua kali dilakukan bergantian, mulai dari kanan.";

export const ADEGAN_LUAR_PINJAM: AdeganStory = {
  id: "luar-pinjam",
  judul: "Borrowing: membuka puluhan",
  sumber: "Metode luar: Borrowing",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Borrowing")),
      tambah("kedua,", kepala(1)),
      tambah("lebih", teks("bp1", 150, 74, "241 − 129", 14, W.biru), teks("bp2", 150, 98, "1 < 9: satuan tidak cukup", 10.4, W.merah)),
      tambah("meminjam", ...kartu("bp3", 30, 112, 240, 30, W.krem, ["pinjam 1 dari kolom kiri"], 10.4), panah("bp4", 150, 160, -80, 0, W.merah, 2)),
      tambah("mengambil.", ...kartu("bp5", 40, 168, 220, 26, W.emas, ["di kelas: mengambil"], 10.4)),
    ),
    k(
      SUARA_B2,
      bersih(0),
      tambah(0, judul("Satu puluhan jadi sepuluh satuan")),
      tambah("Satu@1", ...blok("bk", 78, 48, 2, 4, 1, 1.0), teks("bk1", 150, 82, "241", 12, W.biru)),
      tambah("batang", ...kartu("bk2", 20, 92, 260, 22, W.krem, ["1 puluhan = 10 satuan"], 10.4)),
      ubah("dibuka", { id: "bk-p3", warna: W.emas }),
      tambah("sepuluh@2", ...blok("bl", 78, 148, 2, 3, 11, 1.0), teks("bl1", 150, 134, "241 = 200 + 30 + 11", 10.4, W.ungu)),
    ),
    k(
      SUARA_B3,
      bersih(0),
      tambah(0, judul("Kurangkan tiap kolom")),
      tambah("Sekarang", teks("bq1", 150, 46, "11 − 9 = 2", 13, W.hijau)),
      tambah("Puluhan", teks("bq2", 150, 76, "3 − 2 = 1", 13, W.hijau)),
      tambah("Ratusan", teks("bq3", 150, 106, "2 − 1 = 1", 13, W.hijau)),
      tambah("Hasilnya", ...kartu("bq4", 40, 128, 220, 40, W.emas, ["241 − 129 = 112"], 14)),
    ),
    k(
      SUARA_B4,
      bersih(0),
      tambah(0, judul("Pinjam lagi dari ratusan")),
      tambah("puluhan", ...blok("br", 78, 56, 1, 0, 0, 1.0), teks("br1", 150, 54, "1 ratusan", 10, W.biru)),
      tambah("sepuluh", panah("br2", 150, 82, 0, 22, W.merah, 2.4), ...blok("bs", 22, 112, 0, 10, 0, 1.0), teks("br3", 150, 146, "10 puluhan", 10, W.biru)),
      tambah("dua@1", ...kartu("br4", 30, 160, 240, 28, W.krem, ["pinjam bergantian, dari kanan"], 10)),
    ),
  ],
};

/* ------------------------------ 5. Borrowing: penerapan dengan angka buku ------------------------------ */
const SUARA_C1 = "Dua kali meminjam: dua ratus lima puluh tiga dikurangi seratus tujuh puluh enam. Tiga kurang dari enam, pinjam: tiga belas dikurangi enam sama dengan tujuh. Puluhan tinggal empat, pinjam lagi: empat belas dikurangi tujuh sama dengan tujuh.";
const SUARA_C2 = "Ratusan tinggal satu, dikurangi satu sama dengan nol. Hasilnya tujuh puluh tujuh. Periksa dengan penjumlahan: tujuh puluh tujuh ditambah seratus tujuh puluh enam kembali ke dua ratus lima puluh tiga.";
const SUARA_C3 = "Satu kali meminjam: enam ratus dua puluh tiga dikurangi dua ratus sembilan puluh dua. Satuan cukup. Puluhan dua kurang dari sembilan, pinjam: dua belas dikurangi sembilan sama dengan tiga. Ratusan tinggal lima, dikurangi dua sama dengan tiga.";
const SUARA_C4 = "Dua kali meminjam lagi: tiga ratus empat puluh empat dikurangi dua ratus tujuh puluh sembilan. Empat belas dikurangi sembilan sama dengan lima, tiga belas dikurangi tujuh sama dengan enam, dua kurang dua sama dengan nol. Hasilnya enam puluh lima.";

const TB1 = soalNT("tb", 253, 176);
const TB2 = soalNT("tc", 623, 292);
const TB3 = soalNT("td", 344, 279);

export const ADEGAN_LUAR_PINJAM_TERAPAN: AdeganStory = {
  id: "luar-pinjam-terapan",
  judul: "Borrowing pada soal latihan",
  sumber: "Metode luar: Borrowing",
  latar: "#DBEAFE",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Borrowing: 253 − 176")),
      tambah("Dua", ...TB1.dasar),
      tambah("pinjam:", ...TB1.tanda(2)),
      tambah(idx(SUARA_C1, "sama", 1), TB1.hasil(2)),
      tambah("lagi:", ...TB1.tanda(1), ...TB1.tanda(0)),
      tambah(akhir(SUARA_C1), TB1.hasil(1)),
    ),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Ratusan dan pemeriksaan")),
      tambah(0, ...TB1.dasar, ...TB1.tanda(0), ...TB1.tanda(1), ...TB1.tanda(2), TB1.hasil(2), TB1.hasil(1)),
      tambah("Ratusan", TB1.hasil(0)),
      tambah("Hasilnya", TB1.persamaan(158)),
      tambah("Periksa", ...kartu("tcc", 30, 168, 240, 26, W.krem, ["periksa: 77 + 176 = 253"], 10.4)),
    ),
    k(
      SUARA_C3,
      bersih(0),
      tambah(0, judul("Borrowing: 623 − 292")),
      tambah("Satu", ...TB2.dasar),
      tambah("cukup.", TB2.hasil(2)),
      tambah("pinjam:", ...TB2.tanda(1), ...TB2.tanda(0)),
      tambah(idx(SUARA_C3, "tiga", 2), TB2.hasil(1)),
      tambah(akhir(SUARA_C3), TB2.hasil(0)),
      tambah("Ratusan", TB2.persamaan(158)),
    ),
    k(
      SUARA_C4,
      bersih(0),
      tambah(0, judul("Borrowing: 344 − 279")),
      tambah("Dua", ...TB3.dasar),
      tambah(idx(SUARA_C4, "empat", 3), ...TB3.tanda(2), TB3.hasil(2)),
      tambah(idx(SUARA_C4, "tiga", 2), ...TB3.tanda(1), ...TB3.tanda(0), TB3.hasil(1)),
      tambah("nol,", TB3.hasil(0)),
      tambah("Hasilnya", TB3.persamaan(158)),
    ),
  ],
};

