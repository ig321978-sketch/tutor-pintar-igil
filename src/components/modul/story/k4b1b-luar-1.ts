import type { AdeganStory } from "./logika-story";
import { W, WARNA_CAKRAM, batangPuluhan, bulat, deretBatang, deretKubus, deretLempeng, deretSatuan, emo, isiTempat, judul, kartu, kepalaTempat, kotak, kubusRibuan, lempengRatusan, panah, selTempat, teks, tumpukCakram } from "./k4b1b-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah } from "./k4b1b-bantu";

export const NAMA_METODE = ["Place Value", "Dienes Trade", "Expanded Form", "Place Value Disks"];
export const NAMA_METODE_ID = ["Nilai Tempat", "Tukar Sepuluh", "Bentuk Uraian", "Cakram Nilai Tempat"];
const WARNA_METODE = [W.hijauMuda, W.langit, W.krem, W.pink];
const IKON_METODE = ["🔢", "🧱", "➕", "🔵"];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
const kepala = (i: number) => kartu("hd", 6, 26, 288, 24, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Bagaimana kita menentukan nilai setiap angka pada sebuah bilangan, misalnya angka dua pada dua ribu seratus lima puluh? Guru di berbagai negara punya cara berbeda. Kita akan melihat empat metode dari luar, dengan angka-angka yang tadi kita pakai.";
const SUARA_O2 = "Empat metode itu: Place Value, Dienes Trade, Expanded Form, dan Place Value Disks.";
const SUARA_O3 = "Nama dalam bahasa Indonesia: Nilai Tempat, Tukar Sepuluh, Bentuk Uraian, dan Cakram Nilai Tempat. Metode keempat adalah tambahan yang cocok dengan angka-angka kita.";
const SUARA_O4 = "Semuanya menjawab satu pertanyaan: setiap angka bernilai berapa? Dengan mengalikan angka dan nilai tempatnya, menukar sepuluh dengan satu, menguraikan menjadi penjumlahan, dan menghitung cakram pada papan.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Empat metode dari luar untuk nilai tempat",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Empat metode dari luar")),
      tambah("pada", teks("po", 150, 66, "2.150", 34, W.merah)),
      tambah("angka", teks("pq", 150, 100, "nilai angka 2 = ?", 11, W.coklat)),
      tambah("berbagai", emo("gl", 256, 176, "🌍", 30)),
      tambah("empat", ...kartu("pk4", 20, 130, 180, 32, W.emas, ["4 metode dari luar"], 9.6)),
    ),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Empat metode")),
      ...NAMA_METODE.map((m, i) => tambah([idx(SUARA_O2, "Place"), idx(SUARA_O2, "Dienes"), idx(SUARA_O2, "Expanded"), idx(SUARA_O2, "Place", 2)][i], ...kartu(`m${i}`, 12, 34 + i * 38, 276, 30, WARNA_METODE[i], [`${i + 1}. ${m}`], 9.6))),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Nama dalam bahasa Indonesia")),
      ...NAMA_METODE_ID.map((m, i) => tambah(idx(SUARA_O3, ["Nilai", "Tukar", "Bentuk", "Cakram"][i]), ...kartu(`n${i}`, 12, 34 + i * 38, 276, 30, WARNA_METODE[i], [`${i + 1}. ${i === 1 ? "Tukar Sepuluh (tukar 10 jadi 1)" : m}`], 9.6))),
      tambah("tambahan", emo("n4", 270, 180, "⭐", 20)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Satu pertanyaan, empat cara")),
      tambah("mengalikan", emo("i1", 45, 82, IKON_METODE[0], 32), teks("i1t", 45, 112, "angka × tempat", 8, W.biru)),
      tambah("menukar", emo("i2", 112, 82, IKON_METODE[1], 32), teks("i2t", 112, 112, "tukar 10 : 1", 8, W.biru)),
      tambah("menguraikan", emo("i3", 188, 82, IKON_METODE[2], 32), teks("i3t", 188, 112, "jumlah nilai", 8, W.biru)),
      tambah("menghitung", emo("i4", 258, 82, IKON_METODE[3], 32), teks("i4t", 258, 112, "hitung cakram", 8, W.biru)),
      tambah("pertanyaan:", ...kartu("iq", 40, 136, 220, 30, W.emas, ["setiap angka bernilai berapa?"], 9.6)),
    ),
  ],
};

/* ------------------------------ 2. Place Value: konsep ------------------------------ */
const SUARA_N1 = "Metode pertama, Place Value, atau Nilai Tempat. Setiap tempat punya nilai: satuan satu, puluhan sepuluh, ratusan seratus, ribuan seribu.";
const SUARA_N2 = "Nilai tempat bertambah sepuluh kali lipat setiap bergeser satu tempat ke kiri. Satu, sepuluh, seratus, seribu.";
const SUARA_N3 = "Nilai sebuah angka adalah angka itu dikali nilai tempatnya. Angka lima di puluhan bernilai lima kali sepuluh, yaitu lima puluh.";
const SUARA_N4 = "Jadi ada dua langkah: cari tempat angka itu, lalu kalikan angka dengan nilai tempatnya. Nol di tempat mana pun selalu bernilai nol.";

const NILAI_TEKS = ["1.000", "100", "10", "1"];
const PUSAT_KOLOM = [57, 119, 181, 243];

export const ADEGAN_LUAR_NILAI: AdeganStory = {
  id: "luar-nilai",
  judul: "Place Value: angka kali nilai tempatnya",
  sumber: "Metode luar: Place Value",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Place Value")),
      tambah("pertama,", kepala(0)),
      tambah("tempat", ...kepalaTempat("nt", 26, 66, 62, 18, 9)),
      tambah(idx(SUARA_N1, "satuan"), ...selTempat("nt", 26, 84, 62, 3, "1", 28, 13, W.emas)),
      tambah(idx(SUARA_N1, "puluhan"), ...selTempat("nt", 26, 84, 62, 2, "10", 28, 13, W.emas)),
      tambah(idx(SUARA_N1, "ratusan"), ...selTempat("nt", 26, 84, 62, 1, "100", 28, 13, W.emas)),
      tambah(idx(SUARA_N1, "ribuan"), ...selTempat("nt", 26, 84, 62, 0, "1.000", 28, 13, W.emas)),
    ),
    k(
      SUARA_N2,
      ...[0, 1, 2].map((j) => {
        const i = 2 - j;
        return tambah(idx(SUARA_N2, ["sepuluh", "seratus", "seribu"][j], j === 0 ? 2 : 1), panah(`ar${i}`, PUSAT_KOLOM[i + 1] - 8, 128, -(PUSAT_KOLOM[i + 1] - PUSAT_KOLOM[i]) + 16, 0, W.ungu, 2), teks(`al${i}`, (PUSAT_KOLOM[i] + PUSAT_KOLOM[i + 1]) / 2, 146, "× 10", 9.4, W.ungu));
      }),
      tambah("kiri", teks("ak", 150, 172, "ke kiri: nilainya 10 kali", 8.6, W.coklat)),
    ),
    k(
      SUARA_N3,
      hapus(0, "ar0", "ar1", "ar2", "al0", "al1", "al2", "ak"),
      tambah("Angka", teks("rj", 150, 134, "angka × nilai tempat", 9.6, W.coklat)),
      tambah("lima@2", teks("rm", 150, 162, "5 × 10 = 50", 16, W.merah)),
      sorotkan("puluhan", "nt-d2"),
    ),
    k(
      SUARA_N4,
      hapus(0, "rj", "rm"),
      tambah("cari", ...kartu("lg1", 14, 130, 132, 36, W.langit, ["1. cari tempat angka"], 8.4)),
      tambah("kalikan", ...kartu("lg2", 154, 130, 132, 36, W.hijauMuda, ["2. angka × nilai tempat"], 8.4)),
      tambah("Nol", teks("nl", 150, 188, "0 × 100 = 0", 12, W.hijau)),
    ),
  ],
};

/* ------------------------------ 3. Place Value: penerapan ------------------------------ */
const SUARA_NT1 = "Terapkan pada struk: dua ribu seratus lima puluh. Angka dua di ribuan bernilai dua kali seribu, yaitu dua ribu. Angka satu di ratusan bernilai satu kali seratus, yaitu seratus.";
const SUARA_NT2 = "Angka lima di puluhan bernilai lima kali sepuluh, yaitu lima puluh. Angka nol di satuan bernilai nol kali satu, yaitu nol.";
const SUARA_NT3 = "Sekarang bilangan lain: empat ribu enam ratus tujuh puluh lima. Angka enam di ratusan, jadi bernilai enam kali seratus, yaitu enam ratus.";
const SUARA_NT4 = "Delapan ribu empat ratus enam puluh tiga: angka enam di puluhan, jadi bernilai enam kali sepuluh, yaitu enam puluh.";
const SUARA_NT5 = "Dua bilangan lain: enam ribu tujuh ratus delapan puluh sembilan, angka enam di ribuan, bernilai enam ribu. Seribu dua ratus tiga puluh enam, angka enam di satuan, bernilai enam.";

export const ADEGAN_LUAR_NILAI_TERAPAN: AdeganStory = {
  id: "luar-nilai-terapan",
  judul: "Place Value pada angka-angka kita",
  sumber: "Metode luar: Place Value (penerapan)",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_NT1,
      tambah(0, kepala(0)),
      tambah("struk:", teks("bl", 150, 66, "2.150", 14, W.merah)),
      tambah("struk:", ...kepalaTempat("ti", 26, 74, 62, 16, 8.4)),
      tambah("struk:", ...isiTempat("ti", 26, 90, 62, [2, 1, 5, 0], 22, 12, W.putih)),
      sorotkan(idx(SUARA_NT1, "ribuan"), "ti-d0"),
      tambah("kali", teks("e1", 150, 134, "2 × 1.000 = 2.000", 11, W.hijau)),
      sorotkan(idx(SUARA_NT1, "ratusan"), "ti-d1"),
      tambah(idx(SUARA_NT1, "kali", 2), teks("e2", 150, 152, "1 × 100 = 100", 11, W.hijau)),
    ),
    k(
      SUARA_NT2,
      sorotkan(idx(SUARA_NT2, "puluhan"), "ti-d2"),
      tambah("kali", teks("e3", 150, 170, "5 × 10 = 50", 11, W.hijau)),
      sorotkan(idx(SUARA_NT2, "satuan"), "ti-d3"),
      tambah(idx(SUARA_NT2, "kali", 2), teks("e4", 150, 188, "0 × 1 = 0", 11, W.hijau)),
    ),
    k(
      SUARA_NT3,
      hapus(0, "bl", "e1", "e2", "e3", "e4"),
      ...[0, 1, 2, 3].flatMap((i) => [ubah(0, { id: `ti-dt${i}`, isi: String([4, 6, 7, 5][i]) }, { id: `ti-d${i}`, warna: W.putih, sorot: false })]),
      tambah(0, teks("bl", 150, 66, "4.675", 14, W.merah)),
      sorotkan(idx(SUARA_NT3, "ratusan"), "ti-d1"),
      tambah("kali", teks("e1", 150, 140, "6 × 100 = 600", 14, W.hijau)),
    ),
    k(
      SUARA_NT4,
      hapus(0, "bl", "e1"),
      ...[0, 1, 2, 3].map((i) => ubah(0, { id: `ti-dt${i}`, isi: String([8, 4, 6, 3][i]) }, { id: `ti-d${i}`, sorot: false })),
      tambah(0, teks("bl", 150, 66, "8.463", 14, W.merah)),
      sorotkan(idx(SUARA_NT4, "puluhan"), "ti-d2"),
      tambah("kali", teks("e1", 150, 140, "6 × 10 = 60", 14, W.hijau)),
    ),
    k(
      SUARA_NT5,
      hapus(0, "bl", "e1", "ti-d0", "ti-d1", "ti-d2", "ti-d3", "ti-dt0", "ti-dt1", "ti-dt2", "ti-dt3", "ti-h0", "ti-h1", "ti-h2", "ti-h3", "ti-ht0", "ti-ht1", "ti-ht2", "ti-ht3"),
      tambah("Dua", ...kartu("y1", 14, 56, 272, 54, W.hijauMuda, ["6.789: angka 6 di ribuan", "6 × 1.000 = 6.000"], 9.4)),
      tambah("Seribu", ...kartu("y2", 14, 120, 272, 54, W.langit, ["1.236: angka 6 di satuan", "6 × 1 = 6"], 9.4)),
    ),
  ],
};

/* ------------------------------ 4. Dienes Trade: konsep ------------------------------ */
const SUARA_D1 = "Metode kedua, Dienes Trade, atau Tukar Sepuluh. Ada kubus kecil untuk satuan, batang untuk puluhan, lempeng untuk ratusan, dan kubus besar untuk ribuan.";
const SUARA_D2 = "Aturannya sederhana: sepuluh kubus satuan ditukar dengan satu batang puluhan. Sepuluh batang puluhan ditukar dengan satu lempeng ratusan.";
const SUARA_D3 = "Sepuluh lempeng ratusan ditukar dengan satu kubus besar ribuan. Setiap pertukaran selalu sepuluh untuk satu, itulah sebabnya nilai tempat naik sepuluh kali lipat.";
const SUARA_D4 = "Jadi bilangan dibangun dari balok, dan banyak balok tiap jenis adalah angka di tempat itu. Tidak boleh tersisa sepuluh balok sejenis, karena harus ditukar.";

export const ADEGAN_LUAR_TUKAR: AdeganStory = {
  id: "luar-tukar",
  judul: "Dienes Trade: sepuluh ditukar satu",
  sumber: "Metode luar: Dienes Trade",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Dienes Trade")),
      tambah("kedua,", kepala(1)),
      tambah("kubus", kotak("bs-a", 36, 84, 8, 8, W.hijauMuda, W.hijau, { rx: 1 }), teks("bs-l", 40, 128, "satuan", 8.6, W.biru), teks("bs-v", 40, 142, "1", 9.6, W.merah)),
      tambah("batang", batangPuluhan("bs-b", 106, 66), teks("bb-l", 110, 128, "puluhan", 8.6, W.biru), teks("bb-v", 110, 142, "10", 9.6, W.merah)),
      tambah("lempeng", lempengRatusan("bs-c", 164, 76), teks("bc-l", 179, 128, "ratusan", 8.6, W.biru), teks("bc-v", 179, 142, "100", 9.6, W.merah)),
      tambah(idx(SUARA_D1, "kubus", 2), kubusRibuan("bs-d", 236, 70), teks("bd-l", 254, 128, "ribuan", 8.6, W.biru), teks("bd-v", 254, 142, "1.000", 9.6, W.merah)),
    ),
    k(
      SUARA_D2,
      bersih(0),
      tambah(0, judul("Aturan pertukaran")),
      tambah(0, ...kartu("hd", 6, 26, 288, 20, W.langit, ["Dienes Trade · Tukar Sepuluh"], 8.4)),
      tambah("sepuluh", ...deretSatuan("ts", 14, 64, 10)),
      tambah("ditukar", panah("p1", 120, 68, 26, 0, W.ungu, 2.2)),
      tambah("batang", batangPuluhan("tb", 156, 52)),
      tambah(idx(SUARA_D2, "Sepuluh", 2), ...deretBatang("tu", 14, 104, 10)),
      tambah(idx(SUARA_D2, "ditukar", 2), panah("p2", 130, 124, 26, 0, W.ungu, 2.2)),
      tambah("lempeng", lempengRatusan("tl", 164, 104)),
    ),
    k(
      SUARA_D3,
      bersih(0),
      tambah(0, judul("Sepuluh ditukar satu")),
      tambah(0, ...kartu("hd", 6, 26, 288, 20, W.langit, ["Dienes Trade · Tukar Sepuluh"], 8.4)),
      tambah("Sepuluh", ...Array.from({ length: 10 }, (_, i) => kotak(`tx-l${i}`, 14 + i * 21, 66, 18, 18, W.krem, W.oranye, { rx: 2, tebal: 1.2 }))),
      tambah("ditukar", panah("p3", 225, 76, 18, 0, W.ungu, 2.2)),
      tambah("kubus", kotak("tx-k", 246, 62, 36, 36, W.merahMuda, W.merah, { rx: 2, tebal: 1.6 })),
      tambah("pertukaran", ...kartu("k1", 14, 118, 272, 28, W.krem, ["setiap pertukaran: 10 untuk 1"], 9)),
      tambah("naik", ...kartu("k2", 14, 154, 272, 28, W.hijauMuda, ["nilai tempat naik 10 kali lipat"], 9)),
    ),
    k(
      SUARA_D4,
      bersih(0),
      tambah(0, judul("Bilangan dari balok")),
      tambah(0, ...kartu("hd", 6, 26, 288, 20, W.langit, ["Dienes Trade · Tukar Sepuluh"], 8.4)),
      tambah("banyak", ...kartu("a1", 14, 60, 272, 40, W.hijauMuda, ["banyak balok tiap jenis", "= angka di tempat itu"], 9)),
      tambah("Tidak", ...kartu("a2", 14, 112, 272, 40, W.pink, ["tersisa 10 balok sejenis?", "tukar dengan 1 balok di kirinya"], 9)),
    ),
  ],
};

/* ------------------------------ 5. Dienes Trade: penerapan ------------------------------ */
const SUARA_DT1 = "Bangun dua ribu seratus lima puluh: dua kubus ribuan, satu lempeng ratusan, lima batang puluhan, dan tanpa kubus satuan.";
const SUARA_DT2 = "Bilangan yang sama bisa ditulis sebagai dua ratus lima belas batang puluhan, karena dua ribu seratus lima puluh sama dengan dua ratus lima belas kali sepuluh.";
const SUARA_DT3 = "Sekarang tukar: sepuluh batang menjadi satu lempeng, jadi dua puluh satu lempeng dan sisa lima batang. Sepuluh lempeng menjadi satu kubus, jadi dua kubus dan sisa satu lempeng.";
const SUARA_DT4 = "Untuk sembilan ribu lima ratus: ada sembilan puluh lima lempeng ratusan. Tukar tiap sepuluh lempeng dengan satu kubus, hasilnya sembilan kubus ribuan dan sisa lima lempeng ratusan.";

export const ADEGAN_LUAR_TUKAR_TERAPAN: AdeganStory = {
  id: "luar-tukar-terapan",
  judul: "Dienes Trade pada angka-angka kita",
  sumber: "Metode luar: Dienes Trade (penerapan)",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_DT1,
      tambah(0, kepala(1)),
      tambah("Bangun", teks("bl", 150, 66, "2.150", 14, W.merah)),
      tambah("kubus", ...deretKubus("ta", 14, 76, 2), teks("ta-n", 54, 128, "2 kubus", 8.4, W.biru)),
      tambah("lempeng", ...deretLempeng("tb", 110, 82, 1), teks("tb-n", 125, 128, "1 lempeng", 8.4, W.biru)),
      tambah("batang", ...deretBatang("tc", 166, 72, 5), teks("tc-n", 193, 128, "5 batang", 8.4, W.biru)),
      tambah("tanpa", teks("td-n", 254, 100, "0 satuan", 8.4, W.biru)),
    ),
    k(
      SUARA_DT2,
      tambah("sebagai", ...kartu("dp", 30, 142, 240, 28, W.krem, ["215 batang puluhan"], 10)),
      tambah(idx(SUARA_DT2, "kali"), teks("dq", 150, 190, "215 × 10 = 2.150", 13, W.hijau)),
    ),
    k(
      SUARA_DT3,
      bersih(0),
      tambah(0, judul("Menukar kembali")),
      tambah(0, ...kartu("hd", 6, 26, 288, 20, W.langit, ["Dienes Trade · Tukar Sepuluh"], 8.4)),
      tambah("tukar:", teks("g1", 150, 74, "215 puluhan", 12, W.biru), teks("gx", 150, 186, "tukar 10 : 1", 9, W.coklat)),
      tambah(idx(SUARA_DT3, "puluh"), panah("q1", 150, 82, 0, 14, W.ungu, 2), teks("g2", 150, 114, "21 ratusan + 5 puluhan", 12, W.biru)),
      tambah(idx(SUARA_DT3, "Sepuluh", 2), panah("q2", 150, 122, 0, 14, W.ungu, 2), teks("g3", 150, 154, "2 ribuan + 1 ratusan + 5 puluhan", 11, W.hijau)),
    ),
    k(
      SUARA_DT4,
      bersih(0),
      tambah(0, judul("Menukar 9.500")),
      tambah(0, ...kartu("hd", 6, 26, 288, 20, W.langit, ["Dienes Trade · Tukar Sepuluh"], 8.4)),
      tambah("ada", ...kartu("u1", 40, 60, 220, 30, W.krem, ["95 lempeng ratusan"], 10)),
      tambah("Tukar", panah("q3", 150, 94, 0, 22, W.ungu, 2), teks("q3t", 200, 108, "tukar 10 : 1", 9, W.coklat)),
      tambah("hasilnya", ...kartu("u2", 30, 124, 240, 34, W.hijauMuda, ["9 kubus ribuan + 5 lempeng ratusan"], 9.4)),
    ),
  ],
};

/* ------------------------------ 6. Place Value Disks: konsep ------------------------------ */
const SUARA_C1 = "Metode keempat, Place Value Disks, atau Cakram Nilai Tempat. Kita memakai cakram bertanda seribu, seratus, sepuluh, dan satu.";
const SUARA_C2 = "Papan nilai tempat punya empat kolom. Letakkan satu cakram untuk setiap hitungan di tempat itu, jadi banyak cakram dalam sebuah kolom sama dengan angkanya.";
const SUARA_C3 = "Kolom yang angkanya nol dibiarkan kosong. Dan bila sebuah kolom terisi sepuluh cakram, ganti dengan satu cakram di kolom sebelah kirinya.";
const SUARA_C4 = "Berbeda dari Tukar Sepuluh yang memakai balok, cakram bernilai tertulis. Jadi kita dapat menjumlahkan nilai cakram untuk memeriksa bilangannya.";

const papan = () => [...kepalaTempat("pp", 26, 46, 62, 16, 8.4), ...PUSAT_KOLOM.map((_, i) => kotak(`pk${i}`, 26 + i * 62, 62, 62, 124, W.putih, W.biru, { rx: 0, tebal: 1.2 })), ...PUSAT_KOLOM.map((x, i) => teks(`pv${i}`, x, 76, NILAI_TEKS[i], 8.4, W.coklat))];

export const ADEGAN_LUAR_CAKRAM: AdeganStory = {
  id: "luar-cakram",
  judul: "Place Value Disks: cakram bertanda nilai",
  sumber: "Metode luar: Place Value Disks",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Place Value Disks")),
      tambah("keempat,", kepala(3)),
      ...[0, 1, 2, 3].map((i) => tambah(idx(SUARA_C1, ["seribu", "seratus", "sepuluh", "satu"][i]), bulat(`cb${i}`, 45 + i * 70, 100, 24, WARNA_CAKRAM[i], W.biru, { tebal: 1.4 }), teks(`cl${i}`, 45 + i * 70, 104, NILAI_TEKS[i], i === 0 ? 10 : 12, W.putih, { garis: W.hitam }))),
      tambah("Kita", teks("ck", 150, 154, "cakram bertanda nilai tempatnya", 9, W.coklat)),
    ),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Papan nilai tempat")),
      tambah("papan", ...papan()),
      tambah("Letakkan", bulat("d1", PUSAT_KOLOM[2], 166, 9, WARNA_CAKRAM[2], W.biru, { tebal: 1.2 })),
      tambah("angkanya.", teks("ct", 150, 198, "1 cakram = 1 hitungan", 8.6, W.hijau)),
    ),
    k(
      SUARA_C3,
      hapus(0, "d1", "ct"),
      tambah("nol", teks("kk", PUSAT_KOLOM[3], 130, "kosong", 8.6, W.merah)),
      tambah("terisi", ...tumpukCakram("tk", PUSAT_KOLOM[2], 182, 10, 4.5, 2)),
      tambah("ganti", panah("pg", 170, 150, -38, 22, W.ungu, 2), bulat("tg", PUSAT_KOLOM[1], 176, 9, WARNA_CAKRAM[1], W.biru, { tebal: 1.2 })),
      tambah("ganti", teks("pt", 119, 128, "10 cakram = 1", 8.2, W.ungu)),
    ),
    k(
      SUARA_C4,
      bersih(0),
      tambah(0, judul("Balok dan cakram")),
      tambah("balok,", ...kartu("w1", 14, 34, 272, 44, W.langit, ["Tukar Sepuluh: balok", "nilai dari bentuk dan ukuran"], 9.4)),
      tambah("cakram", ...kartu("w2", 14, 90, 272, 44, W.pink, ["Cakram: nilai tertulis di cakram", "bisa dijumlahkan"], 9.4)),
      tambah("menjumlahkan", teks("w3", 150, 164, "1.000 + 100 + 10 + 1 = 1.111", 12, W.hijau)),
    ),
  ],
};

/* ------------------------------ 7. Place Value Disks: penerapan ------------------------------ */
const SUARA_CT1 = "Letakkan cakram untuk dua ribu seratus lima puluh: dua cakram seribu, satu cakram seratus, lima cakram sepuluh, dan kolom satuan kosong. Totalnya delapan cakram.";
const SUARA_CT2 = "Periksa dengan menjumlah nilai cakram: seribu ditambah seribu ditambah seratus, lalu lima kali sepuluh. Jumlahnya dua ribu seratus lima puluh.";
const SUARA_CT3 = "Untuk tujuh ribu tiga ratus lima puluh perlu lima belas cakram, dan untuk sembilan ribu lima ratus perlu empat belas cakram.";
const SUARA_CT4 = "Terakhir: pada delapan ribu empat ratus enam puluh tiga, ada enam cakram sepuluh, jadi bernilai enam puluh. Pada empat ribu enam ratus tujuh puluh lima, ada enam cakram seratus, jadi bernilai enam ratus.";

export const ADEGAN_LUAR_CAKRAM_TERAPAN: AdeganStory = {
  id: "luar-cakram-terapan",
  judul: "Place Value Disks pada angka-angka kita",
  sumber: "Metode luar: Place Value Disks (penerapan)",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_CT1,
      tambah(0, ...papan()),
      tambah("Letakkan", teks("bl", 40, 198, "2.150", 14, W.merah)),
      tambah(idx(SUARA_CT1, "seribu"), ...tumpukCakram("c0", PUSAT_KOLOM[0], 180, 2, 5, 0)),
      tambah(idx(SUARA_CT1, "seratus", 2), ...tumpukCakram("c1", PUSAT_KOLOM[1], 180, 1, 5, 1)),
      tambah(idx(SUARA_CT1, "sepuluh"), ...tumpukCakram("c2", PUSAT_KOLOM[2], 180, 5, 5, 2)),
      tambah("kosong.", teks("kk", PUSAT_KOLOM[3], 130, "kosong", 8.6, W.merah)),
      tambah("Totalnya", teks("tt", 230, 198, "total: 8 cakram", 9.4, W.hijau)),
    ),
    k(
      SUARA_CT2,
      hapus(0, "bl", "tt"),
      tambah(idx(SUARA_CT2, "ditambah"), teks("eq", 150, 190, "1.000 + 1.000 + 100 + 50 = 2.150", 10.5, W.hijau)),
      sorotkan(idx(SUARA_CT2, "seribu"), "c0-o0", "c0-o1"),
      sorotkan(idx(SUARA_CT2, "seratus"), "c1-o0"),
    ),
    k(
      SUARA_CT3,
      bersih(0),
      tambah(0, judul("Banyak cakram tiap bilangan")),
      tambah(0, ...kepalaTempat("rk", 100, 40, 36, 18, 6.8)),
      tambah(0, teks("rk-h", 150, 150, "banyak cakram = jumlah angkanya", 9, W.coklat)),
      tambah("tujuh", teks("ra-l", 52, 79, "7.350", 12, W.biru), ...isiTempat("ra", 100, 62, 36, ["7", "3", "5", "0"], 26, 12, W.putih), teks("ra-n", 270, 79, "15 cakram", 9, W.hijau)),
      tambah("sembilan", teks("rb-l", 52, 111, "9.500", 12, W.biru), ...isiTempat("rb", 100, 94, 36, ["9", "5", "0", "0"], 26, 12, W.putih), teks("rb-n", 270, 111, "14 cakram", 9, W.hijau)),
    ),
    k(
      SUARA_CT4,
      bersih(0),
      tambah(0, judul("Angka 6 pada dua bilangan")),
      tambah(0, ...kartu("hd", 6, 26, 288, 24, W.pink, ["Place Value Disks · Cakram Nilai Tempat"], 8.8)),
      tambah("delapan", ...kartu("s1", 14, 64, 272, 46, W.hijauMuda, ["8.463: 6 cakram sepuluh", "6 × 10 = 60"], 9.4)),
      tambah(idx(SUARA_CT4, "Pada", 2), ...kartu("s2", 14, 122, 272, 46, W.langit, ["4.675: 6 cakram seratus", "6 × 100 = 600"], 9.4)),
    ),
  ],
};

