import type { AdeganStory, Obj } from "./logika-story";
import { BAYAR_SLAMET, HARGA_SLAMET, URAIAN_10000, URAIAN_7300, W, bulat, deretUang, emo, garis, judul, kartu, rb, teks } from "./k4b1d-gambar";
import { bersih, idx, k, sorotkan, tambah } from "./k4b1d-bantu";

/** Uang ke-`i` (kotak dan nilainya) dari hasil deretUang, supaya uang muncul satu per satu mengikuti kata. */
const uangKe = (objs: Obj[], id: string, dari: number, sampai: number): Obj[] => objs.filter((o) => Array.from({ length: sampai - dari }, (_, j) => dari + j).some((i) => o.id === `${id}-k${i}` || o.id === `${id}-t${i}`));
/** Penjumlahan uraian uang tertulis sebagai "7.300 = 2.000 + 100 + ...". */
const tulisUraian = (total: number, nilai: readonly number[]): string => `${rb(total)} = ${nilai.map(rb).join(" + ")}`;

/* ------------------------------ 9. Ayo Berlatih nomor 2: uang Helen (Buku Siswa hlm. 28; Panduan Guru hlm. 48) ------------------------------ */
const SUARA_H1 = "Sekarang soal cerita: Helen membantu Ibu menjual makanan ringan di warung. Uang Helen: empat keping seratus rupiah, dua keping lima ratus rupiah, lima keping seribu rupiah, dan tujuh lembar dua ribu rupiah.";
const SUARA_H2 = "Slamet membeli makanan ringan seharga tujuh ribu tiga ratus rupiah, dan membayar dengan uang sepuluh ribu rupiah.";
const SUARA_H3 = "Soal a: uraikan uang tujuh ribu tiga ratus rupiah dengan pecahan uang Helen. Contoh pertama: tiga lembar dua ribu, satu keping seribu, dan tiga keping seratus.";
const SUARA_H4 = "Contoh kedua: dua lembar dua ribu, tiga keping seribu, dan tiga keping seratus. Jumlahnya tetap tujuh ribu tiga ratus.";
const SUARA_H5 = "Contoh ketiga memakai satu lembar dua ribu, lima keping seribu, dan tiga keping seratus. Lima keping seribu itu persis semua seribu milik Helen.";
const SUARA_H6 = "Soal b: uraikan uang sepuluh ribu rupiah. Contoh pertama: lima lembar dua ribu. Contoh kedua: tiga lembar dua ribu dan empat keping seribu.";
const SUARA_H7 = "Contoh ketiga: empat lembar dua ribu, satu keping seribu, dan dua keping lima ratus. Jumlahnya sepuluh ribu rupiah, dan semuanya ada dalam uang Helen.";
const SUARA_H8 = "Sekarang kita periksa. Sepuluh ribu rupiah ditulis dengan angka satu, titik, lalu tiga nol. Semua contoh sudah kita hitung ulang, dan hasilnya cocok.";

const A1 = deretUang("a1", 50, URAIAN_7300[0]);
const A2 = deretUang("a2", 50, URAIAN_7300[1]);
const A3 = deretUang("a3", 50, URAIAN_7300[2]);
const B1 = deretUang("b1", 42, URAIAN_10000[0]);
const B2 = deretUang("b2", 100, URAIAN_10000[1]);
const B3 = deretUang("b3", 158, URAIAN_10000[2]);

export const ADEGAN_BERLATIH_UANG: AdeganStory = {
  id: "berlatih-uang",
  judul: "Latihan soal cerita: uang Helen",
  sumber: "Materi: latihan uang Helen",
  latar: "#FFFBEB",
  kutipan: [
    "Helen membantu Ibu menjual makanan ringan di warung.",
    "Slamet membeli makanan ringan seharga Rp",
    "Slamet membayar dengan pecahan uang Rp",
    "Uraikan uang Rp. 7.300 dengan pecahan uang yang di miliki Helen.",
    "Uraikan uang Rp. 10.000 dengan pecahan uang yang di miliki Helen.",
    "contoh jawaban:",
    "7.300 = 2.000 + 2.000 + 2.000 + 1.000 + 100 + 100 + 100",
    "7.300 = 2.000 + 2.000 + 1.000 + 1.000 + 1.000 + 100 + 100 + 100",
    "= 2.000 + 1.000 + 1.000 + 1.000 + 1.000 + 1.000 + 100 + 100 + 100",
    "1.0000 = 2.000 + 2.000 + 2.000 + 2.000 + 2.000",
    "1.0000 = 2.000 + 2.000 + 2.000 + 1.000 + 1.000 + 1.000 + 1.000",
    "1.0000 = 2.000 + 2.000 + 2.000 + 2.000 + 1.000 + 500 + 500",
  ],
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Soal cerita: uang Helen")),
      tambah(idx(SUARA_H1, "seratus"), ...kartu("h1", 14, 32, 272, 22, W.jingga, ["4 keping uang Rp100"], 9)),
      tambah(idx(SUARA_H1, "ratus"), ...kartu("h2", 14, 58, 272, 22, W.krem, ["2 keping uang Rp500"], 9)),
      tambah(idx(SUARA_H1, "seribu"), ...kartu("h3", 14, 84, 272, 22, W.hijauMuda, ["5 keping uang Rp1.000"], 9)),
      tambah(idx(SUARA_H1, "ribu"), ...kartu("h4", 14, 110, 272, 22, W.langit, ["7 lembar uang Rp2.000"], 9)),
    ),
    k(
      SUARA_H2,
      tambah(idx(SUARA_H2, "tujuh"), ...kartu("sl1", 14, 142, 272, 22, W.pink, ["Slamet membeli seharga Rp7.300"], 9)),
      tambah(idx(SUARA_H2, "sepuluh"), ...kartu("sl2", 14, 168, 272, 22, W.lavender, ["Slamet membayar Rp10.000"], 9)),
    ),
    k(
      SUARA_H3,
      bersih(0),
      tambah(0, judul("Soal a: uraikan Rp7.300")),
      tambah(idx(SUARA_H3, "dua"), uangKe(A1, "a1", 0, 3)),
      tambah(idx(SUARA_H3, "seribu,"), uangKe(A1, "a1", 3, 4)),
      tambah(idx(SUARA_H3, "seratus."), uangKe(A1, "a1", 4, 7)),
      tambah(idx(SUARA_H3, "pertama:"), teks("a1e", 150, 100, tulisUraian(HARGA_SLAMET, URAIAN_7300[0]), 8.4, W.biru)),
    ),
    k(
      SUARA_H4,
      bersih(0),
      tambah(0, judul("Soal a: contoh kedua")),
      tambah(idx(SUARA_H4, "dua"), uangKe(A2, "a2", 0, 2)),
      tambah(idx(SUARA_H4, "seribu,"), uangKe(A2, "a2", 2, 5)),
      tambah(idx(SUARA_H4, "seratus."), uangKe(A2, "a2", 5, 8)),
      tambah(idx(SUARA_H4, "tetap"), teks("a2e", 150, 100, tulisUraian(HARGA_SLAMET, URAIAN_7300[1]), 7, W.biru)),
    ),
    k(
      SUARA_H5,
      bersih(0),
      tambah(0, judul("Soal a: contoh ketiga")),
      tambah(idx(SUARA_H5, "dua"), uangKe(A3, "a3", 0, 1)),
      tambah(idx(SUARA_H5, "seribu,"), uangKe(A3, "a3", 1, 6)),
      tambah(idx(SUARA_H5, "seratus."), uangKe(A3, "a3", 6, 9)),
      tambah(idx(SUARA_H5, "persis"), teks("a3e", 150, 100, tulisUraian(HARGA_SLAMET, URAIAN_7300[2]), 6.4, W.biru), ...kartu("a3k", 40, 128, 220, 28, W.krem, ["5 keping seribu: semua milik Helen"], 8.6)),
    ),
    k(
      SUARA_H6,
      bersih(0),
      tambah(0, judul("Soal b: uraikan Rp10.000")),
      tambah(idx(SUARA_H6, "pertama:"), B1, teks("b1e", 150, 78, tulisUraian(BAYAR_SLAMET, URAIAN_10000[0]), 8, W.biru)),
      tambah(idx(SUARA_H6, "kedua:"), B2, teks("b2e", 150, 136, tulisUraian(BAYAR_SLAMET, URAIAN_10000[1]), 7, W.biru)),
    ),
    k(
      SUARA_H7,
      tambah(idx(SUARA_H7, "ketiga:"), B3),
      tambah(idx(SUARA_H7, "sepuluh"), teks("b3e", 150, 192, tulisUraian(BAYAR_SLAMET, URAIAN_10000[2]), 7.4, W.biru)),
      tambah(idx(SUARA_H7, "semuanya"), emo("b3c", 278, 178, "💰", 22)),
    ),
    k(
      SUARA_H8,
      bersih(0),
      tambah(0, judul("Periksa penulisan")),
      tambah(idx(SUARA_H8, "ditulis"), ...kartu("c1", 14, 38, 272, 32, W.merahMuda, ["sepuluh ribu ditulis", "10.000"], 9.4)),
      tambah(idx(SUARA_H8, "titik,"), ...kartu("c2", 14, 84, 272, 32, W.hijauMuda, ["satu, titik,", "lalu tiga nol"], 9.4)),
      tambah(idx(SUARA_H8, "cocok."), ...kartu("c3", 14, 130, 272, 32, W.krem, ["semua contoh dihitung ulang: cocok"], 9)),
      sorotkan(idx(SUARA_H8, "Sepuluh"), "c1-k"),
    ),
  ],
};

/* ------------------------------ 10. Miskonsepsi, diferensiasi, metode, rangkuman (Panduan Guru hlm. 48) ------------------------------ */
const SUARA_M1 = "Hati-hati, kesalahan yang sering terjadi: murid masih bingung antara menyusun, yaitu komposisi, dan mengurai, yaitu dekomposisi.";
const SUARA_M2 = "Cara membedakannya: komposisi dimulai dari bagian lalu menyusun bilangan, dekomposisi dimulai dari bilangan lalu mengurai menjadi bagian.";
const SUARA_M3 = "Belajar sesuai kemampuan: murid yang cepat belajar, atau advanced, mengerjakan latihan tanpa bantuan dan boleh mendapat soal tambahan, sementara guru mendampingi teman yang kesulitan.";
const SUARA_M4 = "Di subbab ini kita belajar lewat diskusi dan tanya jawab, yang mengutamakan hasil karya murid bersama kelompoknya.";
const SUARA_M5 = "Kelompok dibentuk menurut karakteristik atau keberagaman murid. Ketua kelompok adalah murid berkemampuan tinggi, dengan anggota berkemampuan sedang atau kurang. Bila kelas tidak punya murid berkemampuan tinggi, semua anggota bekerja sama lewat diskusi dan tanya jawab.";
const SUARA_M6 = "Rangkuman subbab D: komposisi menyusun bilangan dari nilai tempat, dekomposisi mengurai bilangan menjadi nilai tempat, dan nol tetap menjaga tempatnya.";

export const ADEGAN_MISKONSEPSI: AdeganStory = {
  id: "miskonsepsi-diferensiasi",
  judul: "Hati-hati, belajar bersama, dan rangkuman",
  sumber: "Materi: pesan guru dan rangkuman",
  latar: "#F0FDF4",
  kutipan: [
    "Miskonsepsi",
    "peserta didik masih bingung antara Menyusun (komposisi) dan mengurai (dekomposisi)",
    "Diferensiasi",
    "Bagi peserta didik yang kecepatan belajarnya tinggi (advanced), minta mereka mengerjakan latihan tanpa bantuan.",
    "Guru juga dapat memberikan soal-soal tambahan.",
    "guru dapat mendampingi peserta didik yang mengalami kesulitan.",
    "Metode pembelajaran yang disarankan untuk sub bab ini adalah Diskusi dan Tanya Jawab",
    "yang mengutamakan pada produk hasil karya peserta didik bersama kelompoknya.",
    "Pembentukan kelompok dapat berdasarkan pada karakteristik atau keberagaman peserta didik",
    "ditentukan ketua kelompok adalah peserta didik dengan tingkat kemampuan tinggi dengan anggota kelompok tingkat kemampuan sedang atau kurang.",
    "Apabila karakteristik peserta didik di sekolah/kelas tidak terdapat peserta didik dengan kemampuan tinggi, maka melalui metode diskusi dan tanya jawab semua anggota kelompok dapat bekerja sama untuk menyelesaikan tugas/proyek yang diberikan oleh guru.",
  ],
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Hati-hati")),
      tambah(idx(SUARA_M1, "menyusun,"), ...kartu("m1", 14, 44, 120, 44, W.hijauMuda, ["menyusun", "= komposisi"], 9.6)),
      tambah(idx(SUARA_M1, "bingung"), teks("mq", 150, 76, "?", 34, W.merah)),
      tambah(idx(SUARA_M1, "mengurai,"), ...kartu("m2", 166, 44, 120, 44, W.langit, ["mengurai", "= dekomposisi"], 9.6)),
    ),
    k(
      SUARA_M2,
      tambah(idx(SUARA_M2, "komposisi"), ...kartu("m3", 14, 110, 272, 30, W.hijauMuda, ["komposisi: bagian → bilangan"], 9.6)),
      tambah(idx(SUARA_M2, "dekomposisi"), ...kartu("m4", 14, 150, 272, 30, W.langit, ["dekomposisi: bilangan → bagian"], 9.6)),
    ),
    k(
      SUARA_M3,
      bersih(0),
      tambah(0, judul("Sesuai kemampuan")),
      tambah(idx(SUARA_M3, "cepat"), ...kartu("d1", 10, 40, 135, 70, W.hijauMuda, ["cepat belajar", "(advanced):", "latihan mandiri", "dan soal tambahan"], 8.4)),
      tambah(idx(SUARA_M3, "kesulitan."), ...kartu("d2", 155, 40, 135, 70, W.krem, ["murid yang", "kesulitan:", "didampingi guru"], 8.8)),
    ),
    k(
      SUARA_M4,
      bersih(0),
      tambah(0, judul("Cara belajar kita")),
      tambah(idx(SUARA_M4, "diskusi"), ...kartu("e1", 20, 44, 260, 44, W.emas, ["Diskusi dan Tanya Jawab"], 12)),
      tambah(idx(SUARA_M4, "hasil"), ...kartu("e2", 20, 104, 260, 40, W.langit, ["hasil karya murid", "bersama kelompoknya"], 9.6)),
    ),
    k(
      SUARA_M5,
      bersih(0),
      tambah(0, judul("Kelompok belajar")),
      tambah(idx(SUARA_M5, "Ketua"), ...[0, 1, 2].map((i) => garis(`kg${i}`, 150, 62, -90 + i * 90, 52, W.biru, 1.6)), bulat("kt", 150, 62, 22, W.emas), teks("ktt", 150, 65, "ketua", 9, W.biru)),
      tambah(idx(SUARA_M5, "anggota"), ...[0, 1, 2].flatMap((i) => [bulat(`ka${i}`, 60 + i * 90, 114, 18, W.hijauMuda), teks(`kat${i}`, 60 + i * 90, 117, "anggota", 7.6, W.biru)])),
      tambah(idx(SUARA_M5, "tinggi,"), teks("kn1", 150, 152, "ketua: kemampuan tinggi", 8.6, W.hijau)),
      tambah(idx(SUARA_M5, "kurang."), teks("kn2", 150, 165, "anggota: sedang atau kurang", 8.6, W.coklat)),
      tambah(idx(SUARA_M5, "Bila"), teks("kn3", 150, 180, "bila tak ada murid berkemampuan tinggi:", 8.6, W.merah)),
      tambah(idx(SUARA_M5, "diskusi"), teks("kn4", 150, 193, "semua anggota bekerja sama", 8.6, W.merah)),
    ),
    k(
      SUARA_M6,
      bersih(0),
      tambah(0, judul("Rangkuman subbab D")),
      tambah(idx(SUARA_M6, "komposisi"), ...kartu("r1", 14, 36, 272, 40, W.hijauMuda, ["komposisi: menyusun", "6.000 + 300 + 40 + 8 → 6.348"], 9)),
      tambah(idx(SUARA_M6, "dekomposisi"), ...kartu("r2", 14, 86, 272, 40, W.langit, ["dekomposisi: mengurai", "6.849 → 6.000 + 800 + 40 + 9"], 9)),
      tambah(idx(SUARA_M6, "nol"), ...kartu("r3", 14, 136, 272, 40, W.krem, ["nol menjaga tempat", "6.035 → 6.000 + 0 + 30 + 5"], 9)),
    ),
  ],
};
