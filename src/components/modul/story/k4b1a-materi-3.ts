import type { AdeganStory } from "./logika-story";
import { LATIHAN_DUA, LATIHAN_SATU, LATIHAN_TIGA, TABEL_EMPAT, TEMPAT, W, barisTabel, emo, garis, judul, kartu, kotak, papanIsi, papanKepala, rb, teks } from "./k4b1a-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k4b1a-bantu";

/* ------------------------------ 9. Menulis angka menjadi nama bilangan (Buku Siswa hlm. 9) ------------------------------ */
const SUARA_N1 = "Sekarang arah sebaliknya: kita mengubah angka menjadi nama bilangan. Contoh pertama, angka empat, tiga, dua, dan tujuh pada ribuan, ratusan, puluhan, dan satuan.";
const SUARA_N2 = "Ribuan empat ditulis empat ribu. Ratusan tiga ditulis tiga ratus. Puluhan dua ditulis dua puluh. Satuan tujuh ditulis tujuh.";
const SUARA_N3 = "Sehingga nama bilangannya adalah empat ribu tiga ratus dua puluh tujuh.";
const SUARA_N4 = "Contoh kedua: angka satu, nol, dua, dan lima. Ribuan satu ditulis seribu, bukan satu ribu. Ratusan bernilai nol, jadi tidak dituliskan.";
const SUARA_N5 = "Puluhan dua ditulis dua puluh, satuan lima ditulis lima. Jadi nama bilangannya seribu dua puluh lima.";
const SUARA_N6 = "Aturan terakhir: jika ratusan, puluhan, dan satuan semuanya nol, bagian itu tidak dituliskan. Contohnya, dua ribu dibaca dua ribu saja.";
const SUARA_N7 = "Hati-hati menulis nama bilangan. Seribu ditulis dalam satu kata, bukan satu ribu. Puluhan dua ditulis dua puluh, jangan sampai angka dua terlewat.";

const NILAI_N = ["4.000", "300", "20", "7"];
const NAMA_N = ["empat ribu", "tiga ratus", "dua puluh", "tujuh"];

export const ADEGAN_NAMA: AdeganStory = {
  id: "nama-bilangan",
  judul: "Mengubah angka menjadi nama bilangan, termasuk nol",
  sumber: "Materi: nama bilangan dan nol",
  latar: "#FDF4FF",
  kutipan: [
    "Cara menulis bilangan 4.327 ke dalam nama bilangan",
    "Tentukan bilangan yang menunjukkan ribuan, yaitu 4, ditulis",
    "Tentukan bilangan yang menunjukkan satuan, yaitu 7, ditulis",
    "Sehingga nama bilangan tersebut adalah",
    "Cara menulis bilangan 1.025 ke dalam nama bilangan",
    "Tentukan bilangan yang menunjukkan ribuan, yaitu 1, ditulis",
    "Pada ratusan tertulis bilangan 0, maka bilangan ratusan tidak dituliskan",
    "Tentukan bilangan yang menunjukkan puluhan, yaitu , ditulis",
    "Tentukan bilangan yang menunjukkan satuan, yaitu 5, ditulis",
    "Jika pada ratusan, puluhan dan satuan tertulis bilangan 0 maka bilangan tersebut tidak dituliskan",
  ],
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Contoh pertama: 4.327")),
      tambah("Contoh", ...papanKepala("na", 30, 34, 240, TEMPAT, 8.4, 18)),
      tambah("empat,", ...papanIsi("na", 30, 52, 240, "4327", 34, 22)),
      tambah("satuan", teks("nb", 150, 146, "angka diubah menjadi nama bilangan", 9.4, W.coklat)),
    ),
    k(
      SUARA_N2,
      ...[0, 1, 2, 3].map((i) => tambah(["Ribuan", "Ratusan", "Puluhan", "Satuan"][i], teks(`nn${i}`, 60 + i * 60, 108, NAMA_N[i], 8.6, W.hijau), ...(i < 3 ? [teks(`nv${i}`, 60 + i * 60, 124, NILAI_N[i], 9, W.coklat)] : []))),
    ),
    k(
      SUARA_N3,
      bersih(0),
      tambah(0, judul("Nama bilangan 4.327")),
      tambah("Sehingga", ...kartu("nc", 20, 50, 260, 40, W.emas, ["Empat Ribu Tiga Ratus", "Dua Puluh Tujuh"], 10.6)),
      tambah("tujuh", teks("nd", 150, 124, "4.327", 24, W.merah)),
    ),
    k(
      SUARA_N4,
      bersih(0),
      tambah(0, judul("Contoh kedua: 1.025")),
      tambah(0, ...papanKepala("nf", 30, 34, 240, TEMPAT, 8.4, 18)),
      tambah("satu", ...papanIsi("nf", 30, 52, 240, "1025", 34, 22)),
      tambah("seribu,", ...kartu("ng", 20, 100, 260, 28, W.hijauMuda, ["ribuan 1: seribu (1.000), bukan satu ribu"], 8.6)),
      tambah("Ratusan", ...kartu("nh", 20, 136, 260, 28, W.krem, ["ratusan 0: tidak dituliskan"], 8.8)),
      sorotkan("Ratusan", "nf-d1"),
    ),
    k(
      SUARA_N5,
      bersih(0),
      tambah(0, judul("Nama bilangan 1.025")),
      tambah("Puluhan", ...kartu("ni", 8, 40, 66, 36, W.hijauMuda, ["seribu"], 9)),
      tambah("Puluhan", ...kartu("nj", 78, 40, 66, 36, W.putih, ["(nol)"], 9, { op: 0.5 })),
      tambah("dua", ...kartu("nk", 148, 40, 74, 36, W.langit, ["dua puluh", "(20)"], 8.4)),
      tambah("lima@2", ...kartu("nl", 226, 40, 66, 36, W.krem, ["lima"], 9)),
      tambah("Jadi", ...kartu("nm", 20, 100, 260, 36, W.emas, ["Seribu Dua Puluh Lima"], 12)),
      tambah("seribu", teks("nn", 150, 164, "1.025", 22, W.merah)),
    ),
    k(
      SUARA_N6,
      bersih(0),
      tambah(0, judul("Aturan untuk nol di belakang")),
      tambah("ratusan,", ...papanKepala("no", 30, 34, 240, TEMPAT, 8.4, 18), ...papanIsi("no", 30, 52, 240, "2000", 30, 20)),
      tambah("semuanya", ...kartu("np", 20, 98, 260, 28, W.langit, ["ratusan, puluhan, satuan semuanya nol"], 8.8)),
      tambah("tidak", teks("nq", 150, 142, "bagian itu tidak dituliskan", 9.4, W.merah)),
      tambah("Contohnya,", ...kartu("nr", 20, 156, 260, 30, W.emas, ["contoh: 2.000 = dua ribu"], 9)),
    ),
    k(
      SUARA_N7,
      bersih(0),
      tambah(0, judul("Hati-hati menulis nama bilangan", W.merah)),
      tambah("Seribu", ...kartu("ns1", 14, 34, 272, 34, W.hijauMuda, ["seribu ditulis satu kata (1.000)"], 9.4)),
      tambah("bukan", ...kartu("ns2", 14, 74, 272, 30, W.merahMuda, ["bukan: satu ribu"], 9.4)),
      tambah("Puluhan", ...kartu("ns3", 14, 112, 272, 34, W.langit, ["puluhan 2: dua puluh (20)"], 9.4)),
      tambah("terlewat.", ...kartu("ns4", 14, 152, 272, 30, W.emas, ["jangan sampai angka 2 terlewat"], 9.4)),
    ),
  ],
};

/* ------------------------------ 10. Ayo Berlatih nomor 1 (Buku Siswa hlm. 10–11; Panduan Guru hlm. 33) ------------------------------ */
const SUARA_L1 = "Sekarang kita berlatih. Latihan pertama: tuliskan bilangan pada gambar di bawah ini serta cara membacanya. Ada empat gambar.";
const SUARA_L2 = "Gambar a: penghitung pada sepeda motor menunjukkan angka lima, nol, sembilan, satu. Dibaca lima ribu sembilan puluh satu.";
const SUARA_L3 = "Gambar b: puncak gunung bertuliskan mdpl, yaitu meter di atas permukaan laut. Dibaca empat ribu delapan ratus delapan puluh empat.";
const SUARA_L4 = "Gambar c: peta pulau bertuliskan kilometer persegi. Dibaca lima ribu tujuh ratus delapan puluh.";
const SUARA_L5 = "Gambar d: gambar rumah dan sekolah dengan bilangan di antaranya, tanpa satuan. Dibaca seribu dua ratus enam.";
const SUARA_L6 = "Perhatikan nol: pada lima ribu sembilan puluh satu ratusannya nol, pada lima ribu tujuh ratus delapan puluh satuannya nol, dan pada seribu dua ratus enam puluhannya nol. Semua nol itu tidak dibaca.";

const IKON_LATIHAN = ["🛵", "🏔", "🗺", "🏫"];

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "berlatih-satu",
  judul: "Latihan membaca bilangan: empat gambar",
  sumber: "Materi: latihan membaca bilangan",
  latar: "#EFF6FF",
  kutipan: [
    "Ayo Berlatih",
    "Kerjakan latihan berikut dengan cermat",
    "Tuliskan bilangan yang terdapat pada gambar di bawah ini serta cara membacanya.",
    "a. 5.091 dibaca lima ribu sembilan puluh satu",
    "b. 4.884 dibaca empat ribu delapan ratus delapan puluh empat",
    "c. 5.780 dibaca lima ribu tujuh ratus delapan puluh",
    "d. 1.206 dibaca seribu dua ratus enam",
  ],
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Latihan pertama")),
      tambah("tuliskan", ...kartu("p0", 14, 30, 272, 28, W.krem, ["tulis bilangan pada gambar + cara membacanya"], 8.8)),
      ...IKON_LATIHAN.map((e, i) => tambah("Ada", emo(`pi${i}`, 45 + i * 70, 118, e, 34))),
      tambah("empat", teks("pq", 150, 160, "a    b    c    d", 12, W.merah)),
    ),
    k(
      SUARA_L2,
      bersih(0),
      tambah(0, judul("Gambar a")),
      tambah("sepeda", emo("la", 56, 96, IKON_LATIHAN[0], 44)),
      tambah("lima,", ...kartu("lb", 100, 54, 100, 40, W.putih, ["5 0 9 1"], 16)),
      tambah("Dibaca", teks("lc", 150, 128, "5.091", 22, W.merah)),
      tambah("sembilan@2", ...kartu("ld", 20, 142, 260, 30, W.emas, [LATIHAN_SATU[0][1]], 9.6)),
    ),
    k(
      SUARA_L3,
      bersih(0),
      tambah(0, judul("Gambar b")),
      tambah("puncak", emo("lb1", 56, 96, IKON_LATIHAN[1], 44)),
      tambah("bertuliskan", ...kartu("lb2", 100, 54, 130, 40, W.putih, ["4.884 mdpl"], 15)),
      tambah("meter", teks("lb3", 178, 112, "mdpl: meter di atas permukaan laut", 8.4, W.coklat)),
      tambah("Dibaca", ...kartu("lb4", 10, 134, 280, 34, W.emas, [LATIHAN_SATU[1][1]], 8.6)),
    ),
    k(
      SUARA_L4,
      bersih(0),
      tambah(0, judul("Gambar c")),
      tambah("peta", emo("lc1", 56, 96, IKON_LATIHAN[2], 44)),
      tambah("bertuliskan", ...kartu("lc2", 100, 54, 130, 40, W.putih, ["5.780 km²"], 15)),
      tambah("kilometer", teks("lc3", 150, 112, "km²: kilometer persegi", 8.4, W.coklat)),
      tambah("Dibaca", ...kartu("lc4", 10, 134, 280, 34, W.emas, [LATIHAN_SATU[2][1]], 9.2)),
    ),
    k(
      SUARA_L5,
      bersih(0),
      tambah(0, judul("Gambar d")),
      tambah("rumah", emo("ld1", 50, 100, "🏠", 36), emo("ld2", 250, 100, "🏫", 36)),
      tambah("bilangan", garis("ld3", 80, 90, 140, 0, W.oranye, 3), kotak("ld4", 110, 70, 80, 36, W.putih, W.biru, { rx: 6 }), teks("ld5", 150, 94, "1.206", 15, W.biru)),
      tambah("tanpa", teks("ld6", 150, 128, "satuan tidak tertulis", 8.4, W.coklat)),
      tambah("Dibaca", ...kartu("ld7", 20, 142, 260, 30, W.emas, [LATIHAN_SATU[3][1]], 10)),
    ),
    k(
      SUARA_L6,
      bersih(0),
      tambah(0, judul("Nol tidak dibaca")),
      tambah("ratusannya", ...kartu("na1", 14, 34, 272, 32, W.hijauMuda, ["5.091: ratusan nol"], 9.6)),
      tambah("satuannya", ...kartu("na2", 14, 76, 272, 32, W.langit, ["5.780: satuan nol"], 9.6)),
      tambah("puluhannya", ...kartu("na3", 14, 118, 272, 32, W.krem, ["1.206: puluhan nol"], 9.6)),
      tambah("Semua", ...kartu("na4", 14, 158, 272, 28, W.emas, ["semua nol tidak dibaca"], 9.6)),
    ),
  ],
};

/* ------------------------------ 11. Ayo Berlatih nomor 2 dan 3 (Buku Siswa hlm. 11; Panduan Guru hlm. 33) ------------------------------ */
const SUARA_D1 = "Latihan kedua: Slamet membeli makanan ringan seharga tujuh ribu tiga ratus lima puluh rupiah. Uang Slamet sembilan ribu lima ratus rupiah, dan kembaliannya dua ribu seratus lima puluh rupiah.";
const SUARA_D2 = "Sekarang kita baca tiga bilangan itu. Tujuh ribu tiga ratus lima puluh, sembilan ribu lima ratus, dan dua ribu seratus lima puluh.";
const SUARA_D3 = "Mari kita periksa: harga ditambah kembalian harus sama dengan uang Slamet. Tujuh ribu tiga ratus lima puluh ditambah dua ribu seratus lima puluh sama dengan sembilan ribu lima ratus. Cocok.";
const SUARA_D4 = "Latihan ketiga: hubungkan bilangan dengan cara membacanya. Ada empat bilangan dan empat nama, urutannya diacak.";
const SUARA_D5 = "Kita hubungkan: dua ribu sembilan ratus tiga dihubungkan dengan bilangan pertama. Dua ribu seratus empat puluh lima dihubungkan dengan bilangan kedua.";
const SUARA_D6 = "Lalu enam ribu dua dihubungkan dengan bilangan ketiga, dan sembilan ribu empat puluh lima dengan bilangan keempat. Pada enam ribu dua, nol di ratusan dan puluhan tetap menjaga tempat.";

/** Urutan nama di kolom kanan Buku Siswa hlm. 11 (diacak): indeks ke LATIHAN_TIGA. */
const URUT_KANAN = [3, 0, 1, 2];

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "berlatih-dua-tiga",
  judul: "Latihan membaca dan menghubungkan bilangan",
  sumber: "Materi: membaca dan menghubungkan",
  latar: "#F0FDF4",
  kutipan: [
    "Helen membantu Ibu menjual makanan ringan di warung.",
    "Slamet membeli makanan ringan seharga Rp7.350,00.",
    "Slamet mempunyai pecahan uang Rp9.500,00.",
    "mendapatkan kembalian sebesar Rp2.150,00.",
    "Hubungkan antara bilangan dengan cara membacanya.",
    "Coba kalian baca bilangan 7.350! dibaca tujuh ribu tiga ratus lima puluh",
    "Coba kalian baca bilangan 2.150! dibaca dua ribu seratus lima puluh",
    "2.903 terhubung dengan dua ribu sembilan ratus tiga",
    "2.145 terhubung dengan dua ribu seratus empat puluh lima",
    "6.002 terhubung dengan enam ribu dua",
    "9.045 terhubung dengan sembilan ribu empat puluh lima",
  ],
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Slamet di warung")),
      tambah("Slamet", emo("sl", 40, 96, "🧒", 36)),
      tambah("seharga", ...kartu("d1", 76, 34, 210, 30, W.hijauMuda, [`harga makanan: Rp${rb(LATIHAN_DUA[0][0])}`], 9.4)),
      tambah("Uang", ...kartu("d2", 76, 74, 210, 30, W.langit, [`uang Slamet: Rp${rb(LATIHAN_DUA[1][0])}`], 9.4)),
      tambah("kembaliannya", ...kartu("d3", 76, 114, 210, 30, W.krem, [`kembalian: Rp${rb(LATIHAN_DUA[2][0])}`], 9.4)),
    ),
    k(
      SUARA_D2,
      bersih(0),
      tambah(0, judul("Cara membaca tiga bilangan")),
      tambah("tujuh", ...kartu("e1", 14, 34, 272, 38, W.hijauMuda, ["7.350 dibaca:", LATIHAN_DUA[0][1]], 8.8)),
      tambah("sembilan", ...kartu("e2", 14, 80, 272, 38, W.langit, ["9.500 dibaca:", LATIHAN_DUA[1][1]], 8.8)),
      tambah("dua", ...kartu("e3", 14, 126, 272, 38, W.krem, ["2.150 dibaca:", LATIHAN_DUA[2][1]], 8.8)),
    ),
    k(
      SUARA_D3,
      bersih(0),
      tambah(0, judul("Kita periksa hitungannya", W.hijau)),
      tambah("harga", teks("f1", 150, 56, "harga + kembalian = uang Slamet", 9.4, W.coklat)),
      tambah("Tujuh", teks("f2", 150, 98, "7.350 + 2.150 = 9.500", 17, W.merah)),
      tambah("Cocok.", emo("f3", 150, 150, "✅", 34)),
    ),
    k(
      SUARA_D4,
      bersih(0),
      tambah(0, judul("Hubungkan bilangan dan namanya")),
      tambah("bilangan", ...LATIHAN_TIGA.flatMap(([n], i) => kartu(`kl${i}`, 14, 32 + i * 40, 76, 32, W.hijauMuda, [rb(n)], 12))),
      tambah("nama", ...URUT_KANAN.flatMap((j, i) => kartu(`kr${i}`, 130, 32 + i * 40, 160, 32, W.langit, [LATIHAN_TIGA[j][1]], 7.8))),
    ),
    k(
      SUARA_D5,
      tambah("pertama.", garis("gk0", 90, 48, 40, 40, W.merah, 2.4)),
      tambah("kedua.", garis("gk1", 90, 88, 40, 40, W.merah, 2.4)),
    ),
    k(
      SUARA_D6,
      tambah("ketiga,", garis("gk2", 90, 128, 40, 40, W.merah, 2.4)),
      tambah("keempat.", garis("gk3", 90, 168, 40, -120, W.merah, 2.4)),
      tambah("nol", teks("gnote", 150, 196, "6.002: nol di ratusan dan puluhan tetap ditulis", 8, W.coklat)),
    ),
  ],
};

/* ------------------------------ 12. Ayo Berlatih nomor 4, miskonsepsi, diferensiasi (Buku Siswa hlm. 12; Panduan Guru hlm. 33–35) ------------------------------ */
const SUARA_E1 = "Latihan terakhir: ambil kartu bilangan dengan empat angka berbeda dari nol sampai sembilan. Susun beberapa bilangan yang mungkin, lalu isi tabel: bilangan empat angka, ditulis, dan nama bilangan.";
const SUARA_E2 = "Perhatikan contoh pertama: kartu empat, enam, delapan, nol, dibaca empat ribu enam ratus delapan puluh.";
const SUARA_E3 = "Contoh kedua: kartu tujuh, dua, nol, satu, dibaca tujuh ribu dua ratus satu.";
const SUARA_E4 = "Contoh ketiga diawali nol: kartu nol, enam, sembilan, empat. Nol di depan tidak membuatnya bilangan ribuan, hanya enam ratus sembilan puluh empat.";
const SUARA_E5 = "Hati-hati, syaratnya empat angka berbeda. Kartu delapan, delapan, delapan, delapan tidak boleh, karena angkanya berulang. Pilih empat kartu yang angkanya tidak sama.";
const SUARA_E6 = "Hati-hati, kesalahan yang sering terjadi: nol pada ratusan atau puluhan terlupa ditulis. Karena itu nol harus dijaga di tempatnya.";
const SUARA_E7 = "Bagi kalian yang cepat belajar, kerjakan latihan tanpa bantuan dan boleh mencoba soal tambahan. Bagi yang masih kesulitan, guru akan mendampingi. Kita belajar lewat diskusi dan tanya jawab.";
const SUARA_E8 = "Untuk kerja kelompok, ketua dipilih dari teman yang paling mahir, anggotanya teman yang lain. Bila semua sama mahir, kita bekerja sama lewat diskusi.";

const KOLOM_E = [62, 50, 176];
export const ADEGAN_LATIHAN_EMPAT: AdeganStory = {
  id: "berlatih-empat",
  judul: "Latihan terakhir, kesalahan umum, dan kerja kelompok",
  sumber: "Materi: latihan terakhir dan pesan guru",
  latar: "#FFF7ED",
  kutipan: [
    "Ambil kartu bilangan dengan 4 angka yang berbeda dari 0, 1, … sampai 9.",
    "Susunlah 4 bilangan yang mungkin dapat terbentuk.",
    "Tuliskan dalam tabel seperti di bawah ini.",
    "Tabel berikut merupakan kemungkinan jawaban peserta didik dan masih ada kemungkinan yang lain.",
    "bila terdapat angka nol terambil pada kotak ribuan maka dapat dijelaskan bukan termasuk bilangan ribuan",
    "misalnya 0036 maka dapat dijelaskan hanya sebagai bilangan puluhan dan satuan saja, yaitu tiga puluh enam.",
    "Miskonsepsi",
    "kesalahan bila terdapat 0 (nol) pada nilai tempat ratusan atau puluhan.",
    "Diferensiasi",
    "Bagi peserta didik yang kecepatan belajarnya tinggi (advanced), minta mereka mengerjakan Latihan tanpa bantuan.",
    "Guru juga dapat memberikan soal-soal tambahan.",
    "Metode pembelajaran yang disarankan untuk sub bab ini adalah Diskusi dan Tanya Jawab",
    "ditentukan ketua kelompok adalah peserta didik dengan tingkat kemampuan tinggi dengan anggota kelompok tingkat kemampuan sedang atau kurang.",
    "Apabila karakteristik peserta didik di sekolah/kelas tidak terdapat peserta didik dengan kemampuan tinggi",
  ],
  ketukan: [
    k(
      SUARA_E1,
      tambah(0, judul("Tabel kartu bilangan")),
      tambah("ambil", ...kartu("kk", 14, 26, 272, 22, W.krem, ["4 angka berbeda dari 0 sampai 9"], 8.6)),
      tambah("tabel:", ...barisTabel("rh", 6, 56 - 0, KOLOM_E, ["Bilangan 4 angka", "Ditulis", "Nama bilangan"], 15, 6.4, true)),
    ),
    k(
      SUARA_E2,
      bersih(0),
      tambah(0, judul("Contoh pengisian tabel")),
      tambah(0, ...barisTabel("rh", 6, 34, KOLOM_E, ["Bilangan 4 angka", "Ditulis", "Nama bilangan"], 15, 6.4, true)),
      tambah("contoh", ...[0].flatMap((i) => barisTabel(`r${i}`, 6, 49, KOLOM_E, [TABEL_EMPAT[i][0].split("").join(" "), rb(TABEL_EMPAT[i][1]), TABEL_EMPAT[i][2]], 15, 6.4))),
    ),
    k(
      SUARA_E3,
      tambah("kedua:", ...barisTabel("r1", 6, 64, KOLOM_E, [TABEL_EMPAT[3][0].split("").join(" "), rb(TABEL_EMPAT[3][1]), TABEL_EMPAT[3][2]], 15, 6.4)),
    ),
    k(
      SUARA_E4,
      tambah("ketiga", ...barisTabel("r2", 6, 79, KOLOM_E, [TABEL_EMPAT[4][0].split("").join(" "), rb(TABEL_EMPAT[4][1]), TABEL_EMPAT[4][2]], 15, 6.4)),
      tambah("ribuan,", ...kartu("nx", 14, 150, 272, 30, W.emas, ["0 di depan: bukan bilangan ribuan"], 9.4)),
    ),
    k(
      SUARA_E5,
      hapus(0, "nx-k", "nx-t0"),
      tambah("Kartu", ...kartu("ny", 14, 150, 272, 36, W.merahMuda, ["8 8 8 8: angka berulang,", "tidak memenuhi syarat berbeda"], 8.4)),
      tambah("berulang,", emo("nz", 262, 140, "❌", 18)),
    ),
    k(
      SUARA_E6,
      bersih(0),
      tambah(0, judul("Hati-hati: kesalahan yang sering terjadi")),
      tambah("kesalahan", ...kartu("m1", 14, 40, 272, 44, W.merahMuda, ["kesalahan bila ada 0", "pada ratusan atau puluhan"], 9.4)),
      tambah("nol@2", ...kartu("m2", 14, 100, 272, 44, W.hijauMuda, ["0 tidak dibaca,", "tetapi harus dijaga tempatnya"], 9.4)),
    ),
    k(
      SUARA_E7,
      bersih(0),
      tambah(0, judul("Belajar sesuai kemampuan")),
      tambah("cepat", ...kartu("df1", 14, 34, 272, 44, W.hijauMuda, ["cepat belajar: latihan tanpa bantuan,", "boleh diberi soal tambahan"], 8.8)),
      tambah("guru", ...kartu("df2", 14, 88, 272, 34, W.langit, ["guru mendampingi yang kesulitan"], 9)),
      tambah("diskusi", ...kartu("df3", 14, 132, 272, 34, W.emas, ["belajar: diskusi dan tanya jawab"], 9)),
    ),
    k(
      SUARA_E8,
      bersih(0),
      tambah(0, judul("Pembentukan kelompok")),
      tambah("ketua", ...kartu("kg1", 14, 34, 272, 40, W.hijauMuda, ["ketua: teman yang paling mahir", "anggota: teman yang lain"], 9)),
      tambah("Bila", ...kartu("kg2", 14, 86, 272, 40, W.krem, ["bila semua sama mahir:", "bekerja sama lewat diskusi"], 9)),
      tambah("kelompok", emo("kg3", 150, 168, "👥", 26)),
    ),
  ],
};
