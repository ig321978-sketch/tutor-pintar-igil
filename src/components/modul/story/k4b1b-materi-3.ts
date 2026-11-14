import type { AdeganStory } from "./logika-story";
import { W, barisTabel, emo, judul, kartu, kepalaTempat, selTempat, teks } from "./k4b1b-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah } from "./k4b1b-bantu";

/* ------------------------------ 9. Ayo Berlatih nomor 3: Slamet membeli kue (Buku Siswa hlm. 15; Panduan Guru hlm. 37–38) ------------------------------ */
const SUARA_T1 = "Sekarang soal cerita: Azizah membantu Ibu menjual kue. Slamet membeli kue seharga tujuh ribu tiga ratus lima puluh rupiah, dan membayar dengan uang sembilan ribu lima ratus rupiah. Sisa uangnya dua ribu seratus lima puluh rupiah.";
const SUARA_T2 = "Soal a, bilangan tujuh ribu tiga ratus lima puluh. Angka tujuh di ribuan, angka tiga di ratusan, angka lima di puluhan, dan angka nol di satuan.";
const SUARA_T3 = "Soal b, bilangan sembilan ribu lima ratus. Angka sembilan di ribuan, angka lima di ratusan, dan angka nol di puluhan maupun di satuan.";
const SUARA_T4 = "Soal c, dua ribu seratus lima puluh, sama dengan struk: dua di ribuan, satu di ratusan, lima di puluhan, nol di satuan. Hitung: sembilan ribu lima ratus dikurangi tujuh ribu tiga ratus lima puluh, hasilnya dua ribu seratus lima puluh.";

/** Tabel satu soal: kepala, bilangan besar, lalu satu angka per nama tempat yang disebut dalam kalimat. */
const tabelSoal = (suara: string, bilangan: string, angka: (string | number)[], perlu: string[]) => [
  tambah(0, ...kepalaTempat("sl", 26, 66, 62, 18, 9)),
  tambah(0, teks("sb", 150, 52, bilangan, 20, W.merah)),
  ...angka.map((a, i) => tambah(idx(suara, perlu[i]), ...selTempat("sl", 26, 84, 62, i, a, 28, 14, W.emas))),
];

export const ADEGAN_LATIH_TIGA: AdeganStory = {
  id: "berlatih-tiga",
  judul: "Soal cerita: Slamet membeli kue",
  sumber: "Materi: soal cerita Slamet membeli kue",
  latar: "#FDF2F8",
  kutipan: [
    "Azizah membantu Ibu menjual kue buatan Ibu ke temannya.",
    "Slamet membeli kue seharga Rp7.350,00.",
    "Slamet mempunyai pecahan uang Rp9.500,00 di saku bajunya.",
    "sisa uangnya sebesar Rp2.150,00.",
    "Tentukan nilai tempat dari 7.350",
    "Tentukan nilai tempat dari 9.500",
    "Tentukan nilai tempat dari 2.150",
    "Angka 7 menempati nilai tempat ribuan",
    "Angka 9 menempati nilai tempat ribuan",
    "Angka 2 menempati nilai tempat ribuan",
  ],
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Soal cerita: Slamet membeli kue")),
      tambah("menjual", emo("ke", 36, 80, "🧁", 34)),
      tambah("seharga", ...kartu("hg", 70, 34, 216, 36, W.hijauMuda, ["harga kue: Rp7.350,00"], 10)),
      tambah("membayar", ...kartu("um", 70, 78, 216, 36, W.langit, ["uang Slamet: Rp9.500,00"], 10)),
      tambah("Sisa", ...kartu("ss", 70, 122, 216, 36, W.krem, ["sisa uang: Rp2.150,00"], 10)),
    ),
    k(
      SUARA_T2,
      bersih(0),
      tambah(0, judul("Soal a: 7.350")),
      ...tabelSoal(SUARA_T2, "7.350", [7, 3, 5, 0], ["ribuan", "ratusan", "puluhan", "satuan"]),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Soal b: 9.500")),
      ...tabelSoal(SUARA_T3, "9.500", [9, 5, 0, 0], ["ribuan", "ratusan", "puluhan", "satuan"]),
      tambah("maupun", ...kartu("nn", 40, 130, 220, 30, W.pink, ["dua nol: di puluhan dan di satuan"], 9)),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Soal c: 2.150")),
      ...tabelSoal(SUARA_T4, "2.150", [2, 1, 5, 0], ["ribuan", "ratusan", "puluhan", "satuan"]),
      tambah("Hitung:", ...kartu("hm", 30, 130, 240, 36, W.hijauMuda, ["9.500 − 7.350 = 2.150"], 12)),
      tambah("hasilnya", emo("ok", 150, 190, "✅", 18)),
    ),
  ],
};

/* ------------------------------ 10. Kunci Panduan Guru nomor 4 (Panduan Guru hlm. 38) ------------------------------ */
const SUARA_N1 = "Sekarang salin tabel ini, lalu lengkapi dengan bilangan. Perhatikan, tiap bilangan terdiri atas empat angka, dari ribuan sampai satuan.";
const SUARA_N2 = "Bilangan pertama enam ribu seratus sembilan puluh dua. Angka enam di ribuan, satu di ratusan, sembilan di puluhan, dan dua di satuan.";
const SUARA_N3 = "Bilangan kedua dua ribu sembilan ratus sepuluh. Bilangan ketiga empat ribu seratus dua puluh delapan.";
const SUARA_N4 = "Bilangan keempat sembilan ribu dua ratus tujuh belas. Periksa: tiap baris punya empat angka, dan membaca dari kiri ke kanan mengembalikan lambang bilangannya. Semua baris cocok.";

const KOL = [16, 64, 50, 50, 50, 50];
const BARIS: [number, string, number[]][] = [
  [1, "6.192", [6, 1, 9, 2]],
  [2, "2.910", [2, 9, 1, 0]],
  [3, "4.128", [4, 1, 2, 8]],
  [4, "9.217", [9, 2, 1, 7]],
];
const baris = (i: number) => barisTabel(`r${i}`, 10, 58 + i * 24, KOL, [String(BARIS[i][0]), BARIS[i][1], ...BARIS[i][2].map(String)], 22, 10);

export const ADEGAN_KUNCI_EMPAT: AdeganStory = {
  id: "kunci-empat",
  judul: "Melengkapi tabel bilangan",
  sumber: "Materi: tabel bilangan",
  latar: "#F0FDF4",
  kutipan: [
    "Salin tabel berikut lalu lengkapilah dengan bilangan!",
    "No Lambang Bilangan Ribuan Ratusan Puluhan Satuan",
    "6.192",
    "2.910",
    "4.128",
    "9.217",
  ],
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Melengkapi tabel")),
      tambah("salin", ...kartu("q", 14, 32, 272, 46, W.langit, ["4. salin tabel, lalu lengkapi", "dengan bilangan"], 9.4)),
      tambah("Perhatikan,", ...kartu("ct", 14, 92, 272, 76, W.emas, ["tiap bilangan terdiri atas", "4 angka, dari ribuan", "sampai satuan"], 9)),
      sorotkan("satuan.", "ct-k"),
    ),
    k(
      SUARA_N2,
      bersih(0),
      tambah(0, judul("Tabel bilangan")),
      tambah(0, ...barisTabel("kh", 10, 34, KOL, ["No", "Lambang", "Ribuan", "Ratusan", "Puluhan", "Satuan"], 22, 7, true)),
      tambah("pertama", ...baris(0)),
      sorotkan(idx(SUARA_N2, "ribuan"), "r0-s2"),
      sorotkan(idx(SUARA_N2, "ratusan"), "r0-s3"),
      sorotkan(idx(SUARA_N2, "puluhan"), "r0-s4"),
      sorotkan(idx(SUARA_N2, "satuan"), "r0-s5"),
    ),
    k(
      SUARA_N3,
      tambah("kedua", ...baris(1)),
      tambah("ketiga", ...baris(2)),
    ),
    k(
      SUARA_N4,
      tambah("keempat", ...baris(3)),
      tambah("Periksa:", ...kartu("ok", 40, 168, 220, 26, W.hijauMuda, ["tiap baris: 4 angka, kiri ke kanan"], 8.6)),
      tambah("Semua", emo("yy", 266, 188, "✅", 18)),
    ),
  ],
};

/* ------------------------------ 11. Miskonsepsi (Panduan Guru hlm. 39) ------------------------------ */
const SUARA_X1 = "Hati-hati, kesalahan yang sering terjadi: membaca bilangan sesuai nilai tempatnya. Misalnya dua ribu tiga ratus empat puluh lima dibaca dua ribuan tiga ratusan empat puluhan lima.";
const SUARA_X2 = "Seharusnya dibaca dua ribu tiga ratus empat puluh lima, tanpa imbuhan an pada tiap tempat.";
const SUARA_X3 = "Kesalahan kedua ada di tabel. Untuk bilangan seribu dua ratus tiga puluh empat, jangan kamu tuliskan nilainya: seribu, dua ratus, tiga puluh, dan empat.";
const SUARA_X4 = "Seharusnya tabel diisi angkanya saja: satu, dua, tiga, dan empat. Nilai tempat sudah ditunjukkan oleh kolomnya.";

export const ADEGAN_MISKONSEPSI: AdeganStory = {
  id: "miskonsepsi",
  judul: "Hati-hati: membaca dan mengisi tabel nilai tempat",
  sumber: "Materi: kesalahan yang sering terjadi",
  latar: "#FEF2F2",
  kutipan: [
    "Miskonsepsi pada materi nilai tempat adalah",
    "Peserta didik terkadang membaca bilangan sesuai dengan nilai tempatnya.",
    "Misal: 2.345 dibaca dua ribuan tiga ratusan empat puluhan lima.",
    "Seharusnya dua ribu tiga ratus empat puluh lima.",
    "peserta didik masih menuliskan nilainya, misalnya",
    "1.234 1.000 200 30 4",
    "seharusnya:",
  ],
  ketukan: [
    k(
      SUARA_X1,
      tambah(0, judul("Hati-hati 1: cara membaca")),
      tambah("Misalnya", teks("bx", 150, 54, "2.345", 30, W.merah)),
      tambah("dibaca", ...kartu("sl", 14, 76, 272, 50, W.merahMuda, ["dibaca: dua ribuan tiga ratusan", "empat puluhan lima"], 9.2)),
      tambah("dibaca", emo("sx", 150, 154, "❌", 26)),
    ),
    k(
      SUARA_X2,
      hapus(0, "sx"),
      tambah("dibaca", ...kartu("bn", 14, 134, 272, 50, W.hijauMuda, ["dibaca: dua ribu tiga ratus", "empat puluh lima"], 9.2)),
      tambah("imbuhan", emo("sy", 150, 196, "✅", 14)),
    ),
    k(
      SUARA_X3,
      bersih(0),
      tambah(0, judul("Hati-hati 2: isi tabel")),
      tambah("bilangan", teks("tb", 150, 52, "1.234", 22, W.merah)),
      tambah(0, ...kepalaTempat("sl", 26, 66, 62, 18, 9)),
      tambah(idx(SUARA_X3, "seribu", 2), ...selTempat("sl", 26, 84, 62, 0, "1.000", 28, 12, W.merahMuda)),
      tambah(idx(SUARA_X3, "ratus", 2), ...selTempat("sl", 26, 84, 62, 1, "200", 28, 12, W.merahMuda)),
      tambah(idx(SUARA_X3, "puluh", 2), ...selTempat("sl", 26, 84, 62, 2, "30", 28, 12, W.merahMuda)),
      tambah(idx(SUARA_X3, "empat", 2), ...selTempat("sl", 26, 84, 62, 3, "4", 28, 12, W.merahMuda), emo("sz", 150, 150, "❌", 26)),
    ),
    k(
      SUARA_X4,
      hapus(0, "sz"),
      ...[1, 2, 3, 4].map((a, i) => ubah(idx(SUARA_X4, ["satu", "dua", "tiga", "empat"][i]), { id: `sl-dt${i}`, isi: String(a) }, { id: `sl-d${i}`, warna: W.hijauMuda })),
      tambah("Nilai", ...kartu("ky", 30, 134, 240, 36, W.hijauMuda, ["angkanya saja, nilai dari kolomnya"], 9.2)),
    ),
  ],
};

/* ------------------------------ 12. Diferensiasi dan metode yang disarankan (Panduan Guru hlm. 39) ------------------------------ */
const SUARA_F1 = "Pesan belajar: kalau kamu cepat belajar, kerjakan latihan tanpa bantuan dan boleh mencoba soal tambahan, sementara guru mendampingi teman yang mengalami kesulitan.";
const SUARA_F2 = "Subbab ini kita pelajari dengan Diskusi dan Tanya Jawab, yang mengutamakan produk hasil karya kalian bersama kelompoknya.";
const SUARA_F3 = "Kelompok dibentuk menurut keberagaman. Ketua kelompok adalah teman berkemampuan tinggi, anggotanya berkemampuan sedang atau kurang. Bila tidak ada yang berkemampuan tinggi, semua anggota bekerja sama lewat diskusi dan tanya jawab.";

export const ADEGAN_DIFERENSIASI: AdeganStory = {
  id: "diferensiasi",
  judul: "Pesan belajar dan metode kelompok",
  sumber: "Materi: belajar bersama kelompok",
  latar: "#F5F3FF",
  kutipan: [
    "Diferensiasi",
    "Bagi peserta didik yang kecepatan belajarnya tinggi (advanced), minta mereka mengerjakan Latihan tanpa bantuan.",
    "Guru juga dapat memberikan soal-soal tambahan.",
    "guru dapat mendampingi peserta didik yang mengalami kesulitan.",
    "Metode pembelajaran yang disarankan untuk subbab ini adalah Diskusi dan Tanya Jawab",
    "yang mengutamakan pada produk hasil karya peserta didik bersama kelompoknya.",
    "ditentukan ketua kelompok adalah peserta didik dengan tingkat kemampuan tinggi dengan anggota kelompok tingkat kemampuan sedang atau kurang.",
    "Apabila karakteristik peserta didik di sekolah/kelas tidak terdapat peserta didik dengan kemampuan tinggi",
  ],
  ketukan: [
    k(
      SUARA_F1,
      tambah(0, judul("Pesan belajar")),
      tambah("cepat", emo("rk", 60, 62, "🚀", 30), ...kartu("d1", 14, 78, 132, 70, W.hijauMuda, ["cepat belajar:", "latihan tanpa bantuan", "dan soal tambahan"], 8.2)),
      tambah("mendampingi", emo("hd", 240, 62, "🤝", 30), ...kartu("d2", 154, 78, 132, 70, W.langit, ["guru mendampingi", "murid yang", "mengalami kesulitan"], 8.2)),
    ),
    k(
      SUARA_F2,
      bersih(0),
      tambah(0, judul("Belajar dengan diskusi")),
      tambah("Diskusi", emo("dk", 150, 66, "💬", 30), ...kartu("m1", 40, 80, 220, 36, W.krem, ["Diskusi dan Tanya Jawab"], 11)),
      tambah("produk", ...kartu("m2", 14, 132, 272, 40, W.hijauMuda, ["produk hasil karya kalian", "bersama kelompoknya"], 9)),
    ),
    k(
      SUARA_F3,
      bersih(0),
      tambah(0, judul("Membentuk kelompok")),
      tambah("Kelompok", ...kartu("g1", 14, 28, 272, 30, W.langit, ["menurut keberagaman murid"], 9)),
      tambah("Ketua", ...kartu("g2", 14, 66, 272, 30, W.hijauMuda, ["ketua: kemampuan tinggi"], 9)),
      tambah("anggotanya", ...kartu("g3", 14, 104, 272, 30, W.krem, ["anggota: kemampuan sedang atau kurang"], 9)),
      tambah("Bila", ...kartu("g4", 14, 142, 272, 44, W.pink, ["bila tidak ada murid berkemampuan tinggi:", "semua anggota bekerja sama"], 8.8)),
    ),
  ],
};

