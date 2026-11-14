import type { AdeganStory } from "./logika-story";
import { NILAI_TEMPAT, W, angkaTabel, emo, garis, judul, kartu, kotak, lambang, tabelTempat, teks } from "./k5b1a-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k5b1a-bantu";

/* ------------------------------ 9. Ayo Berlatih nomor 1: tiga harga pada gambar (Buku Siswa hlm. 8; Panduan Guru hlm. 24) ------------------------------ */
/** Tabel nilai tempat untuk 44.567 pada soal 1c. */
export const TB_C = { x: 20, y: 96, cw: 52, o: { ch: 30, u: 16 } };
const KOSONG5 = [["", "", "", "", ""]];
const angkaC = (j: number, d: string) => angkaTabel("bc", TB_C.x, TB_C.y, TB_C.cw, 0, j, d, TB_C.o);
const SUARA_B5 = "Gambar c, kotak pensil berlabel empat puluh empat ribu lima ratus enam puluh tujuh rupiah. Coba cermati. Nilai tempatnya: empat, empat, lima, enam, tujuh.";

export const ADEGAN_BERLATIH_1: AdeganStory = {
  id: "berlatih-satu",
  judul: "Latihan 1: menulis dan membaca tiga harga",
  sumber: "Materi: latihan menulis dan membaca harga",
  latar: "#FFF7ED",
  kutipan: [
    "Ayo Berlatih",
    "1. Tuliskan bilangan yang terdapat pada gambar di bawah ini serta",
    "cara membacanya",
    "Dibaca: ....................................",
    "Rp15.950,00",
    "Rp16.667,00",
    "Rp44.567,00",
    "Rp15.590,00",
    "a Dibaca: lima belas ribu lima ratus sembilan puluh.",
    "Dibaca: enam belas ribu enam ratus enam puluh",
    "Dibaca: empat puluh empat ribu lima ratus enam",
    "Rp16.667,00",
  ],
  ketukan: [
    k(
      "Sekarang berlatih. Tuliskan bilangan yang terdapat pada gambar, serta cara membacanya. Ada tiga gambar, yaitu gelang, gelas, dan kotak pensil, masing-masing dengan label harga.",
      tambah(0, judul("Latihan 1")),
      tambah("gelang,", emo("e1", 60, 90, "📿", 40), teks("e1t", 60, 112, "a: gelang", 9, W.biru)),
      tambah("gelas,", emo("e2", 150, 90, "🥤", 40), teks("e2t", 150, 112, "b: gelas", 9, W.biru)),
      tambah("kotak", emo("e3", 240, 90, "✏", 40), teks("e3t", 240, 112, "c: kotak pensil", 9, W.biru)),
      tambah("label", ...kartu("lq", 30, 140, 240, 34, W.krem, ["tulis harga dan cara membacanya"], 9.6)),
    ),
    k(
      "Gambar a, gelang. Labelnya lima belas ribu sembilan ratus lima puluh rupiah, tertulis seperti di layar.",
      bersih(0),
      tambah(0, judul("Gambar a: gelang")),
      tambah("Gambar", emo("ga", 150, 70, "📿", 40)),
      tambah("Labelnya", ...kartu("ka", 40, 90, 220, 34, W.hijauMuda, ["Rp15.950"], 12)),
      tambah("lima@1", teks("kb", 150, 146, "lima belas ribu sembilan ratus", 10, W.biru), teks("kc", 150, 162, "lima puluh", 10, W.biru)),
    ),
    k(
      "Perhatikan angka nol di satuan. Nol itu menjaga tempat, jadi harganya tetap lima belas ribu sembilan ratus lima puluh rupiah, tertulis seperti di layar.",
      hapus(0, "kb", "kc"),
      ubah(0, { id: "ka-k", op: 0.35 }, { id: "ka-t0", op: 0.35 }),
      tambah("Nol", ...kartu("kd", 40, 128, 220, 28, W.emas, ["nol di satuan menjaga tempat"], 10)),
      tambah("tetap", teks("ke", 150, 178, "lima belas ribu sembilan ratus lima puluh", 9.6, W.merah)),
    ),
    k(
      "Gambar b, gelas berlabel enam belas ribu enam ratus enam puluh tujuh rupiah. Cara membacanya enam belas ribu enam ratus enam puluh tujuh, dan itu cocok dengan labelnya.",
      bersih(0),
      tambah(0, judul("Gambar b: gelas")),
      tambah("Gambar", emo("gb", 150, 70, "🥤", 40)),
      tambah("label", ...kartu("kf", 40, 90, 220, 34, W.hijauMuda, ["Rp16.667"], 14)),
      tambah("Cara", teks("kg", 150, 146, "enam belas ribu enam ratus", 10, W.biru), teks("kh", 150, 162, "enam puluh tujuh", 10, W.biru)),
      tambah("cocok", teks("ki", 150, 184, "sudah cocok", 10, W.hijau)),
    ),
    k(
      SUARA_B5,
      bersih(0),
      tambah(0, judul("Gambar c: kotak pensil")),
      tambah("Gambar", emo("gc", 150, 62, "✏", 32)),
      tambah("berlabel", ...kartu("kj", 70, 72, 160, 20, W.krem, ["Rp44.567"], 11)),
      tambah(17, ...tabelTempat("bc", TB_C.x, TB_C.y, TB_C.cw, KOSONG5, TB_C.o)),
      tambah(19, angkaC(0, "4")),
      tambah(20, angkaC(1, "4")),
      tambah(21, angkaC(2, "5")),
      tambah(22, angkaC(3, "6")),
      tambah(23, angkaC(4, "7")),
    ),
  ],
};

/* ------------------------------ 10. Ayo Berlatih nomor 2 dan 3 (Buku Siswa hlm. 9; Panduan Guru hlm. 24 sampai 25) ------------------------------ */
export const KIRI_BACA = [
  { a: "tiga belas ribu empat ratus", b: "lima puluh enam", n: 13456 },
  { a: "empat puluh ribu tiga ratus", b: "lima puluh", n: 40350 },
  { a: "delapan puluh delapan ribu", b: "sembilan ratus tujuh puluh enam", n: 88976 },
  { a: "dua puluh lima ribu tujuh ratus", b: "delapan puluh enam", n: 25786 },
  { a: "lima puluh empat ribu enam ratus", b: "tujuh puluh lima", n: 54675 },
];
/** Urutan bilangan di kolom kanan Buku Siswa hlm. 9. */
export const KANAN_ANGKA = [88976, 54675, 40350, 25786, 13456];
export const BARIS_Y = [30, 62, 94, 126, 158];
const kartuKiri = (i: number) => kartu(`kl${i}`, 6, BARIS_Y[i], 148, 28, W.hijauMuda, [KIRI_BACA[i].a, KIRI_BACA[i].b], 7.2);
const kartuKanan = (r: number) => kartu(`kr${r}`, 214, BARIS_Y[r], 80, 28, W.langit, [lambang(KANAN_ANGKA[r])], 10);
const WARNA_GARIS = [W.merah, W.hijau, W.ungu, W.coklat, W.biru];
/** Garis penghubung dari kartu kiri i ke kartu kanan di baris r. */
export const garisHubung = (i: number, r: number) => garis(`ln${i}`, 154, BARIS_Y[i] + 14, 60, BARIS_Y[r] - BARIS_Y[i], WARNA_GARIS[i], 1.8, { gambar: true });
const SUARA_D1 = "Latihan dua: hubungkan cara baca dengan bilangannya. Di kiri ada lima cara baca, dan di kanan ada lima bilangan.";
const SUARA_D2 =
  "Pasangan yang tepat: cara baca pertama berpasangan dengan angka paling bawah. Cara baca kedua dengan angka di tengah, yang ketiga dengan angka paling atas, yang keempat dengan angka keempat, dan yang kelima dengan angka kedua.";
const SUARA_D3 = "Kita periksa: kelima pasangan cocok. Contohnya, delapan puluh delapan ribu sembilan ratus tujuh puluh enam adalah angka paling atas di deretan kanan.";

/** Tabel soal 3: tiga kolom (bilangan, dibaca, tempat angka tujuh) dan tiga baris. */
export const KOLOM3 = [
  { x: 10, w: 70 },
  { x: 80, w: 140 },
  { x: 220, w: 70 },
];
export const BARIS3_Y = [50, 90, 130];
const sel3 = (i: number, j: number, warna: string) => kotak(`s3-c${i}${j}`, KOLOM3[j].x, BARIS3_Y[i], KOLOM3[j].w, 40, warna, W.biru, { rx: 0, tebal: 1 });
const TABEL3 = [
  ...["Bilangan", "Dibaca", "Tempat angka 7"].flatMap((h, j) => [kotak(`s3-h${j}`, KOLOM3[j].x, 30, KOLOM3[j].w, 20, W.biru, W.biru, { rx: 0, tebal: 1 }), teks(`s3-ht${j}`, KOLOM3[j].x + KOLOM3[j].w / 2, 43.5, h, 7.6, W.putih)]),
  ...[0, 1, 2].flatMap((i) => [0, 1, 2].map((j) => sel3(i, j, W.krem))),
];
const angka3 = (i: number, isi: string) => teks(`s3-t${i}0`, 45, BARIS3_Y[i] + 25, isi, 11, W.merah);
const baca3 = (i: number, a: string, b: string) => [teks(`s3-t${i}1`, 150, BARIS3_Y[i] + 17, a, 6.8, W.biru), teks(`s3-t${i}1b`, 150, BARIS3_Y[i] + 29, b, 6.8, W.biru)];
const tempat3 = (i: number, a: string, b?: string) => (b === undefined ? [teks(`s3-t${i}2`, 255, BARIS3_Y[i] + 24, a, 9, W.merah)] : [teks(`s3-t${i}2`, 255, BARIS3_Y[i] + 18, a, 7.6, W.merah), teks(`s3-t${i}2b`, 255, BARIS3_Y[i] + 30, b, 7.6, W.merah)]);
const SUARA_T1 = "Latihan tiga melengkapi tabel. Pada baris pertama, bilangan delapan puluh tujuh ribu sembilan ratus delapan puluh enam punya angka tujuh di ribuan.";
const SUARA_T2 = "Baris kedua: lima puluh enam ribu tujuh ratus delapan puluh enam, dengan angka tujuh di ratusan.";
const SUARA_T3 = "Baris ketiga bebas, asal angka tujuh ada di puluh ribuan dan satuan. Contoh buatan sendiri: tujuh puluh tiga ribu empat ratus lima puluh tujuh.";

export const ADEGAN_BERLATIH_2: AdeganStory = {
  id: "berlatih-dua-tiga",
  judul: "Latihan 2 dan 3: menghubungkan cara baca dan melengkapi tabel",
  sumber: "Materi: latihan menghubungkan dan tabel",
  latar: "#F5F3FF",
  kutipan: [
    "2. Hubungkan cara baca bilangan berikut ini dengan bilangannya.",
    "Tiga belas ribu empat ratus",
    "lima puluh enam",
    "88.976",
    "54.675",
    "40.350",
    "25.786",
    "13.456",
    "3. Lengkapilah tabel berikut.",
    "Bilangan Dibaca Nilai Tempat dari Bilangan",
    "87.986",
    "Lima puluh enam ribu",
    "Puluh ribuan dan satuan",
    "Delapan puluh tujuh ribu",
    "sembilan ratus delapan puluh enam",
    "ribuan",
    "ratusan",
    "(...) bebas sesuai",
    "Lima puluh enam ribu tujuh",
    "ratus depalan puluh enam",
  ],
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Latihan 2: hubungkan")),
      tambah("kiri", ...[0, 1, 2, 3, 4].flatMap((i) => kartuKiri(i))),
      tambah("kanan", ...[0, 1, 2, 3, 4].flatMap((r) => kartuKanan(r))),
    ),
    k(
      SUARA_D2,
      tambah(10, garisHubung(0, 4)),
      tambah(17, garisHubung(1, 2)),
      tambah(23, garisHubung(2, 0)),
      tambah(28, garisHubung(3, 3)),
      tambah(34, garisHubung(4, 1)),
    ),
    k(
      SUARA_D3,
      sorotkan("Contohnya,", "kl2-k", "kr0-k"),
      ubah("paling", { id: "ln2", tebal: 3.2 }),
    ),
    k(
      SUARA_T1,
      bersih(0),
      tambah(0, judul("Latihan 3: lengkapi tabel")),
      tambah("Latihan", ...TABEL3),
      tambah(7, angka3(0, "87.986")),
      tambah(16, ...baca3(0, "delapan puluh tujuh ribu", "sembilan ratus delapan puluh enam")),
      tambah(21, ...tempat3(0, "ribuan")),
    ),
    k(
      SUARA_T2,
      tambah(2, angka3(1, "56.786")),
      tambah(10, ...baca3(1, "lima puluh enam ribu", "tujuh ratus delapan puluh enam")),
      tambah(15, ...tempat3(1, "ratusan")),
    ),
    k(
      SUARA_T3,
      tambah(11, ...tempat3(2, "puluh ribuan", "dan satuan")),
      tambah(14, angka3(2, "73.457")),
      tambah(23, ...baca3(2, "tujuh puluh tiga ribu", "empat ratus lima puluh tujuh")),
    ),
  ],
};

/* ------------------------------ 11. Penutup menurut panduan guru: miskonsepsi, diferensiasi, peran guru, refleksi ------------------------------ */
const SUARA_P1 =
  "Hati-hati, ini kesalahan yang sering terjadi: belum paham memisahkan satuan, puluhan, ribuan, dan puluh ribuan, lalu membaca bilangan terlepas dari nilai tempatnya karena sudah terbiasa memakainya sehari-hari.";
const SUARA_P5 = "Ringkasnya, lima nilai tempat dari kiri ke kanan adalah puluh ribuan, ribuan, ratusan, puluhan, dan satuan. Menulis bilangan berarti mengisi angka di tiap tempat, membaca berarti menyebutnya.";
export const TB_RINGKAS = { x: 20, y: 40, cw: 52, o: { ch: 30, u: 9 } };
const barisRefleksi = (i: number) => [
  kotak(`rf${i}`, 10, 52 + i * 38, 280, 32, W.putih, W.biru, { rx: 6 }),
  teks(`rf${i}t`, 18, 72 + i * 38, ["Apakah aku dapat membaca?", "Apakah aku dapat menuliskan?", "Apakah aku dapat menentukan nilai tempat?"][i], 9, W.biru, { anchor: "start" }),
];

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup-guru",
  judul: "Penutup: hati-hati, tantangan, renungan, dan ringkasan",
  sumber: "Materi: penutup, tantangan, dan ringkasan",
  latar: "#FFF1F2",
  kutipan: [
    "Saat membaca dan menuliskan bilangan 100.000 dan nilai tempatnya,",
    "kemungkinan peserta didik belum memahami konsep memisahkan bilangan",
    "satuan, puluhan, ribuan, dan puluh ribuan.",
    "Bagi peserta didik dengan kecepatan belajar tinggi (advanced), minta mereka",
    "mengerjakan Ayo Berpikir Kritis dan Ayo Berpikir Kreatif, atau mengerjakan",
    "latihan tanpa bantuan.",
    "Guru menjadi fasilitator.",
    "Berikan kesempatan kepada setiap peserta didik untuk menyampaikan hasil",
    "diskusi dan menanggapi.",
    "Soal dapat dikerjakan di sekolah atau dijadikan PR.",
    "Aku dapat membaca bilangan cacah",
    "Aku dapat menuliskan bilangan cacah",
    "Aku dapat menentukan nilai tempat",
    "Berilah tanda centang",
    "100.000.",
  ],
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Hati-hati")),
      tambah("satuan,", ...kartu("m1", 8, 36, 138, 28, W.emas, ["satuan"], 9.6)),
      tambah("puluhan,", ...kartu("m2", 154, 36, 138, 28, W.hijauMuda, ["puluhan"], 9.6)),
      tambah("ribuan,", ...kartu("m3", 8, 72, 138, 28, W.langit, ["ribuan"], 9.6)),
      tambah("puluh@2", ...kartu("m4", 154, 72, 138, 28, W.pink, ["puluh ribuan"], 9.6)),
      tambah("terlepas", ...kartu("m5", 20, 120, 260, 30, W.merahMuda, ["salah: baca tanpa nilai tempat"], 9.6)),
      tambah("sehari-hari.", emo("m6", 150, 184, "🤔", 28)),
    ),
    k(
      "Tantangan: bagi yang belajar cepat, coba kerjakan berpikir kritis dan berpikir kreatif, atau kerjakan latihan tanpa bantuan, sementara guru mendampingi teman yang masih mengalami kesulitan.",
      bersih(0),
      tambah(0, judul("Tantangan")),
      tambah("cepat", ...kartu("d1", 14, 36, 272, 40, W.hijauMuda, ["belajar cepat:", "berpikir kritis dan kreatif"], 9)),
      tambah("tanpa", ...kartu("d2", 14, 86, 272, 28, W.langit, ["latihan tanpa bantuan"], 9.6)),
      tambah("mendampingi", ...kartu("d3", 14, 124, 272, 40, W.krem, ["guru mendampingi", "yang mengalami kesulitan"], 9)),
    ),
    k(
      "Selama berdiskusi, bekerjalah bersama teman, dan guru akan berkeliling membimbing. Hasil diskusi kalian dipresentasikan, lalu latihan dikerjakan di sekolah atau menjadi pekerjaan rumah.",
      bersih(0),
      tambah(0, judul("Cara bekerja")),
      tambah("berkeliling", ...kartu("p1", 14, 34, 272, 28, W.hijauMuda, ["guru berkeliling dan membimbing"], 9.6)),
      tambah("Hasil", ...kartu("p2", 14, 70, 272, 28, W.langit, ["hasil diskusi dipresentasikan"], 9.6)),
      tambah("latihan", ...kartu("p3", 14, 106, 272, 28, W.krem, ["Latihan di sekolah atau PR"], 9.6)),
      tambah("rumah.", emo("p4", 150, 178, "🏫", 30)),
    ),
    k(
      "Sekarang renungkan tiga pertanyaan untuk dirimu sendiri: apakah aku dapat membaca, apakah aku dapat menuliskan, dan apakah aku dapat menentukan nilai tempat bilangan cacah sampai seratus ribu?",
      bersih(0),
      tambah(0, judul("Renungan: tiga pertanyaan")),
      tambah("tiga", teks("rh", 150, 42, "bilangan cacah sampai 100.000", 9, W.biru)),
      tambah("membaca,", ...barisRefleksi(0)),
      tambah("menuliskan,", ...barisRefleksi(1)),
      tambah("menentukan", ...barisRefleksi(2)),
    ),
    k(
      SUARA_P5,
      bersih(0),
      tambah(0, judul("Ringkasan subbab A")),
      tambah("lima", ...tabelTempat("rk", TB_RINGKAS.x, TB_RINGKAS.y, TB_RINGKAS.cw, [NILAI_TEMPAT.map((n) => lambang(n))], TB_RINGKAS.o)),
      tambah("Menulis", ...kartu("rm", 14, 112, 272, 30, W.hijauMuda, ["menulis: isi angka di tiap tempat"], 9.6)),
      tambah("membaca", ...kartu("rn", 14, 150, 272, 30, W.langit, ["membaca: sebut nilainya"], 9.6)),
    ),
  ],
};
