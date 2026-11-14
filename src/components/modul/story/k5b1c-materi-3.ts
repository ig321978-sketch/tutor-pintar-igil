import type { AdeganStory } from "./logika-story";
import { W, bingkai, emo, isiSel, judul, kartu, kotak, teks, type Grid } from "./k5b1c-gambar";
import { bersih, hapus, k, tambah } from "./k5b1c-bantu";

/** Tabel empat cara uang Komang (Buku Siswa hlm. 17): label Cara 1 sampai Cara 4 dan lima kolom nilai tempat. */
export const G_CARA: Grid = { x: 8, y: 28, labelW: 34, colW: 50, rowH: 20, headH: 16 };
export const LABEL_CARA = ["Cara 1", "Cara 2", "Cara 3", "Cara 4"];
/** Empat cara membayar Rp45.600: banyak lembar sepuluh ribuan, lembar seribuan, dan keping seratusan. Dihitung dan diuji mandiri; buku dan Panduan Guru tidak memberi kunci. */
export const CARA_KOMANG: [number, number, number][] = [
  [4, 5, 6],
  [4, 4, 16],
  [3, 15, 6],
  [3, 14, 16],
];

const barisCara = (id: string, i: number): ReturnType<typeof isiSel>[] => {
  const [p, r, s] = CARA_KOMANG[i];
  return [isiSel(id, G_CARA, i, 0, String(p)), isiSel(id, G_CARA, i, 1, String(r)), isiSel(id, G_CARA, i, 2, String(s)), isiSel(id, G_CARA, i, 3, "0"), isiSel(id, G_CARA, i, 4, "0")];
};

/* ------------------------------ 9. Empat cara uang Komang (Buku Siswa hlm. 16 dan 17) ------------------------------ */
export const ADEGAN_CARA_KOMANG: AdeganStory = {
  id: "cara-komang",
  judul: "Empat cara uang Komang",
  sumber: "Buku Siswa hlm. 16 dan 17",
  latar: "#F5F3FF",
  kutipan: ["Puluh Ribuan Ribuan Ratusan Puluhan Satuan", "Cara 1", "Cara 2", "Cara 3", "Cara 4", "Komang membeli peralatan sekolah senilai Rp45.600,00."],
  ketukan: [
    k(
      "Ayo cari cara pertama. Komang tidak mungkin memakai lima lembar sepuluh ribuan, karena lima puluh ribu sudah lebih besar dari empat puluh lima ribu enam ratus. Jadi paling banyak empat lembar.",
      tambah(0, judul("Menemukan empat cara")),
      tambah("lima", ...kartu("c1", 14, 36, 128, 46, W.merahMuda, ["5 lembar 10.000", "jadi 50.000"], 9)),
      tambah("empat@2", ...kartu("c2", 158, 36, 128, 46, W.krem, ["harga", "Rp45.600"], 9.4)),
      tambah("lebih", teks("c3", 150, 106, "50.000 lebih besar dari 45.600", 9, W.merah)),
      tambah("Jadi", ...kartu("c4", 40, 126, 220, 40, W.hijauMuda, ["paling banyak", "4 lembar 10.000"], 9.4)),
    ),
    k(
      "Mulai dengan empat lembar sepuluh ribuan, nilainya empat puluh ribu. Sisanya lima ribu enam ratus.",
      bersih(0),
      tambah(0, judul("Menemukan empat cara")),
      tambah(0, bingkai("tc", G_CARA, 4, LABEL_CARA)),
      tambah("empat", isiSel("tc", G_CARA, 0, 0, "4")),
      tambah("nilainya", teks("e1", 150, 146, "4 lembar: 40.000", 9.4, W.coklat)),
      tambah("Sisanya", teks("e2", 150, 166, "sisa 5.600", 9.4, W.merah)),
    ),
    k(
      "Sisa lima ribu enam ratus bisa dibayar dengan lima lembar seribuan dan enam keping seratusan. Itulah Cara satu.",
      hapus("bisa", "e2"),
      tambah("lima@2", isiSel("tc", G_CARA, 0, 1, "5"), isiSel("tc", G_CARA, 0, 2, "6"), isiSel("tc", G_CARA, 0, 3, "0"), isiSel("tc", G_CARA, 0, 4, "0")),
      tambah("Itulah", { id: "e1", t: "teks", x: 150, y: 146, isi: "40.000 + 5.000 + 600 = 45.600", u: 9.4, warna: W.coklat }),
    ),
    k(
      "Masih dengan empat lembar sepuluh ribuan, sisanya bisa juga empat lembar seribuan dan enam belas keping seratusan. Itu Cara dua.",
      tambah("Masih", ...barisCara("tc", 1)),
      tambah("Itu", { id: "e1", t: "teks", x: 150, y: 146, isi: "40.000 + 4.000 + 1.600 = 45.600", u: 9.4, warna: W.coklat }),
    ),
    k(
      "Sekarang ganti: tiga lembar sepuluh ribuan, nilainya tiga puluh ribu, sisanya lima belas ribu enam ratus. Lima belas lembar seribuan dan enam keping seratusan, itu Cara tiga.",
      tambah("Sekarang", ...barisCara("tc", 2)),
      tambah("itu", { id: "e1", t: "teks", x: 150, y: 146, isi: "30.000 + 15.000 + 600 = 45.600", u: 9.4, warna: W.coklat }),
    ),
    k(
      "Cara empat: tiga lembar sepuluh ribuan, empat belas lembar seribuan, dan enam belas keping seratusan.",
      tambah("empat", ...barisCara("tc", 3)),
      tambah("seratusan", { id: "e1", t: "teks", x: 150, y: 146, isi: "30.000 + 14.000 + 1.600 = 45.600", u: 9.4, warna: W.coklat }),
    ),
    k(
      "Keempat cara memakai uang yang berbeda, tetapi semuanya tepat empat puluh lima ribu enam ratus rupiah, dan tidak ada yang melebihi uang Komang. Cara lain tidak ada.",
      tambah("semuanya", ...kartu("ok", 20, 158, 260, 34, W.hijauMuda, ["✓ semua tepat Rp45.600, tidak melebihi uang Komang"], 8.6)),
      hapus("Cara", "e1"),
      tambah("lain", emo("em", 150, 140, "🔎", 18)),
    ),
  ],
};

/* ------------------------------ 10. Peran guru dan respons peserta didik (Panduan Guru hlm. 30 dan 31) ------------------------------ */
const kolom = (id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[]) => kartu(id, x, y, w, h, warna, baris, 7.2, { rx: 4 });

export const ADEGAN_PERAN: AdeganStory = {
  id: "peran-guru",
  judul: "Peran guru, respons, dan antisipasi",
  sumber: "Panduan Guru hlm. 30 dan 31",
  latar: "#FFFBEB",
  kutipan: [
    "Tabel 1.4 Peran Guru dan Respons Peserta Didik terhadap Pembelajaran",
    "Guru menyampaikan tujuan dan instruksi dengan jelas terkait kegiatan eksplorasi yang dilakukan, yaitu komposisi dan dekomposisi bilangan sampai 100.000.",
    "Peserta didik dengan tingkat pemahaman yang baik akan dapat melakukan komposisi dan dekomposisi uang yang diberikan guru.",
    "Mungkin ada peserta didik yang hanya mampu melakukan komposisi dan dekomposisi dengan satu cara.",
    "Mungkin akan ada peserta didik yang tidak dapat melakukan komposisi.",
    "Guru menjadi fasilitator.",
    "Jika masih ada yang belum tepat, berikan bimbingan kepada kelompok tersebut.",
    "Akhir Pembelajaran",
    "Berikan kesempatan kepada peserta didik untuk mempresentasikan hasil kerjanya.",
    "Peserta didik mengerjakan latihan.",
  ],
  ketukan: [
    k(
      "Tujuan kegiatan ini: memberikan komposisi dan dekomposisi sampai seratus ribu lewat percobaan dan eksplorasi. Di akhir, peserta didik menyampaikan kesimpulan tentang komposisi uang.",
      tambah(0, judul("Tujuan Eksplorasi 1.3")),
      tambah("komposisi", ...kartu("t1", 24, 44, 252, 52, W.hijauMuda, ["komposisi dan dekomposisi", "sampai 100.000"], 10.4)),
      tambah("percobaan", ...kartu("t2", 24, 106, 252, 36, W.krem, ["lewat percobaan dan eksplorasi"], 9.4)),
      tambah("kesimpulan", ...kartu("t3", 24, 150, 252, 36, W.pink, ["kesimpulan tentang komposisi uang"], 9.4)),
    ),
    k(
      "Tabel peran guru punya tiga kolom: peran guru, kemungkinan respons peserta didik, dan antisipasi guru.",
      bersih(0),
      tambah(0, judul("Tabel 1.4: 3 kolom")),
      tambah("peran", ...kolom("hp", 8, 28, 88, 26, W.langit, ["Peran guru"])),
      tambah("respons", ...kolom("hr", 100, 28, 94, 26, W.hijauMuda, ["Kemungkinan respons", "peserta didik"])),
      tambah("antisipasi", ...kolom("ha", 198, 28, 94, 26, W.pink, ["Antisipasi guru"])),
      tambah("peran", ...kolom("pg", 8, 58, 88, 130, W.langit, ["Guru", "menyampaikan", "tujuan dan", "instruksi jelas:", "komposisi dan", "dekomposisi", "sampai 100.000"])),
    ),
    k(
      "Respons pertama: peserta didik yang paham bisa menyusun dan menguraikan uang dari guru. Antisipasi guru: menjadi fasilitator, berkeliling, dan memeriksa hasil tiap kelompok.",
      tambah("Respons", ...kolom("r1", 100, 58, 94, 40, W.hijauMuda, ["paham: bisa susun", "dan uraikan uang"])),
      tambah("Antisipasi", ...kolom("a1", 198, 58, 94, 40, W.pink, ["jadi fasilitator,", "berkeliling, periksa"])),
    ),
    k(
      "Respons kedua: mungkin ada peserta didik yang hanya mampu dengan satu cara. Antisipasinya, guru menunjukkan hasil pekerjaan teman-temannya.",
      tambah("Respons", ...kolom("r2", 100, 102, 94, 40, W.krem, ["hanya mampu dengan", "1 cara"])),
      tambah("Antisipasinya", ...kolom("a2", 198, 102, 94, 40, W.krem, ["tunjukkan hasil", "teman-temannya"])),
    ),
    k(
      "Respons ketiga: mungkin ada peserta didik yang tidak dapat menyusun uang sama sekali. Antisipasinya, guru memberi bimbingan kepada kelompok itu.",
      tambah("Respons", ...kolom("r3", 100, 146, 94, 40, W.merahMuda, ["tidak dapat", "menyusun uang"])),
      tambah("Antisipasinya", ...kolom("a3", 198, 146, 94, 40, W.merahMuda, ["beri bimbingan", "kepada kelompok itu"])),
    ),
    k(
      "Di akhir pembelajaran, peserta didik mempresentasikan hasil kerjanya, menyimpulkan cara menyusun dan menguraikan bilangan dengan pecahan uang atau cara lain, lalu mengerjakan latihan.",
      bersih(0),
      tambah(0, judul("Akhir pembelajaran")),
      tambah("mempresentasikan", ...kartu("z1", 24, 40, 252, 36, W.langit, ["a. presentasikan hasil kerja"], 9.4)),
      tambah("menyimpulkan", ...kartu("z2", 24, 84, 252, 44, W.hijauMuda, ["b. simpulkan cara komposisi dan", "dekomposisi dengan pecahan uang"], 9)),
      tambah("latihan", ...kartu("z3", 24, 136, 252, 36, W.pink, ["c. kerjakan latihan"], 9.4)),
    ),
  ],
};

/* ------------------------------ 11. Rangkuman subbab C (Panduan Guru hlm. 31, Akhir Pembelajaran) ------------------------------ */
export const ADEGAN_RANGKUM: AdeganStory = {
  id: "rangkum-c",
  judul: "Rangkuman subbab C",
  sumber: "Buku Siswa hlm. 15 sampai 17; Panduan Guru hlm. 31",
  latar: "#F0F9FF",
  kutipan: ["Ajak peserta didik untuk menyimpulkan cara melakukan komposisi dan dekomposisi bilangan dengan menggunakan pecahan uang atau dengan menggunakan cara lain."],
  ketukan: [
    k(
      "Kita rangkum. Komposisi: banyak lembar dan keping uang kita tulis di tabel nilai tempat, lalu nilai tiap kolom dikumpulkan menjadi satu bilangan.",
      tambah(0, judul("Rangkuman subbab C")),
      tambah("Komposisi", ...kartu("q1", 20, 44, 260, 56, W.hijauMuda, ["komposisi:", "lembar dan keping menjadi 1 bilangan"], 10)),
      tambah("tabel", emo("q2", 150, 150, "💰", 32)),
    ),
    k(
      "Contohnya uang Asep: tiga, delapan, enam menjadi tiga puluh delapan ribu enam ratus. Uang Lukas: enam, tiga, lima menjadi enam puluh tiga ribu lima ratus.",
      bersih(0),
      tambah(0, judul("Komposisi: dua contoh")),
      tambah("Asep", ...kartu("q3", 20, 44, 260, 44, W.langit, ["Asep: 3, 8, 6 menjadi 38.600"], 10)),
      tambah("Lukas", ...kartu("q4", 20, 104, 260, 44, W.pink, ["Lukas: 6, 3, 5 menjadi 63.500"], 10)),
    ),
    k(
      "Dekomposisi: dari satu bilangan kita cari lembar dan kepingnya. Harga empat puluh lima ribu enam ratus bisa diuraikan dengan empat cara berbeda.",
      bersih(0),
      tambah(0, judul("Dekomposisi: satu contoh")),
      tambah("Harga", teks("q5", 150, 90, "45.600", 30, W.hijau)),
      tambah("diuraikan", ...kartu("q6", 50, 112, 200, 44, W.krem, ["bisa diuraikan", "dengan 4 cara berbeda"], 10)),
    ),
    k(
      "Keduanya memakai nilai tempat: puluh ribuan, ribuan, ratusan, puluhan, dan satuan. Nilai tiap tempat dihitung dari banyaknya lembar atau keping uang.",
      bersih(0),
      tambah(0, judul("Nilai tempat")),
      ...["Puluh Ribuan", "Ribuan", "Ratusan", "Puluhan", "Satuan"].map((nama, j) => tambah(["puluh", "ribuan,", "ratusan,", "puluhan,", "satuan."][j], ...kartu(`nt${j}`, 8 + j * 57, 66, 54, 40, W.langit, [nama], 6.6))),
      tambah("dihitung", teks("q7", 150, 142, "nilai tiap tempat dari banyak uang", 9, W.ungu)),
    ),
    k(
      "Pecahan uang hanyalah satu alat. Cara lain juga boleh dipakai selama hasilnya tetap benar.",
      bersih(0),
      tambah(0, judul("Satu alat, banyak cara")),
      tambah("alat", ...kartu("q8", 40, 52, 220, 40, W.hijauMuda, ["pecahan uang: satu alat"], 10.4)),
      tambah("Cara", ...kartu("q9", 40, 108, 220, 40, W.krem, ["cara lain: boleh, hasil tetap benar"], 9.4)),
    ),
  ],
};

/* ------------------------------ 12. Miskonsepsi dan diferensiasi (Panduan Guru hlm. 31) ------------------------------ */
export const ADEGAN_MISKONSEPSI: AdeganStory = {
  id: "miskonsepsi-diferensiasi",
  judul: "Miskonsepsi dan diferensiasi",
  sumber: "Panduan Guru hlm. 31",
  latar: "#FEF2F2",
  kutipan: [
    "Miskonsepsi",
    "Kesalahan yang sering terjadi adalah peserta didik jarang menggunakan permasalahan kontekstual untuk menyelesaikan masalah.",
    "Kemungkinan peserta didik kurang memahami soal cerita yang disajikan",
    "Diferensiasi",
    "Bagi peserta didik dengan kecepatan belajar tinggi (advanced), minta mereka mengerjakan eksplorasi tanpa bantuan,",
    "serta mampu menggunakan berbagai cara untuk menentukan komposisi dan dekomposisi bilangan.",
  ],
  ketukan: [
    k(
      "Miskonsepsi. Kesalahan yang sering terjadi: peserta didik jarang memakai permasalahan kontekstual untuk menyelesaikan masalah.",
      tambah(0, judul("Miskonsepsi", W.merah)),
      tambah("Miskonsepsi", emo("m1", 150, 76, "⚠", 32)),
      tambah("jarang", ...kartu("m2", 24, 96, 252, 44, W.merahMuda, ["jarang memakai soal", "kontekstual"], 10.4)),
    ),
    k(
      "Kemungkinan sebabnya, peserta didik kurang memahami soal cerita, karena kemampuan menerapkan konsep dalam kehidupan sehari-hari masih terbatas.",
      tambah("kurang", ...kartu("m3", 24, 148, 252, 40, W.krem, ["kurang paham soal cerita", "penerapan sehari-hari terbatas"], 8.8)),
    ),
    k(
      "Contohnya cerita Asep, Lukas, dan Komang di buku: ketiganya soal kontekstual tentang uang.",
      bersih(0),
      tambah(0, judul("Soal kontekstual di buku")),
      tambah("Asep", emo("n1", 50, 70, "💵", 28), ...kartu("n1k", 14, 84, 80, 34, W.langit, ["Asep"], 10)),
      tambah("Lukas", emo("n2", 150, 70, "💵", 28), ...kartu("n2k", 110, 84, 80, 34, W.pink, ["Lukas"], 10)),
      tambah("Komang", emo("n3", 250, 70, "💵", 28), ...kartu("n3k", 206, 84, 80, 34, W.hijauMuda, ["Komang"], 10)),
    ),
    k(
      "Diferensiasi. Bagi peserta didik dengan kecepatan belajar tinggi, minta mereka mengerjakan eksplorasi tanpa bantuan.",
      bersih(0),
      tambah(0, judul("Diferensiasi", W.hijau)),
      tambah("Diferensiasi", emo("d1", 150, 76, "🚀", 32)),
      tambah("tanpa", ...kartu("d2", 24, 96, 252, 44, W.hijauMuda, ["eksplorasi", "tanpa bantuan"], 10.4)),
    ),
    k(
      "Mereka juga diminta mampu memakai berbagai cara untuk menentukan komposisi dan dekomposisi bilangan, seperti empat cara uang Komang tadi.",
      tambah("berbagai", ...kartu("d3", 24, 148, 252, 40, W.krem, ["berbagai cara, seperti", "4 cara uang Komang"], 9.4)),
    ),
  ],
};

/* ------------------------------ 13. Refleksi nomor 6 dan 7 (Buku Siswa hlm. 26; Panduan Guru hlm. 31) ------------------------------ */
export const ADEGAN_REFLEKSI: AdeganStory = {
  id: "refleksi-c",
  judul: "Refleksi nomor 6 dan 7",
  sumber: "Buku Siswa hlm. 26; Panduan Guru hlm. 31",
  latar: "#FDF2F8",
  kutipan: [
    "Releksi",
    "Guru dapat menutup pembelajaran dengan meminta peserta didik melakukan",
    "Aku dapat menyusun/komposisi bilangan cacah sampai 100.000.",
    "Aku dapat menguraikan/dekomposisi bilangan cacah sampai 100.000.",
    "Berilah tanda centang (√) pada kolom yang sesuai.",
  ],
  ketukan: [
    k(
      "Refleksi. Guru menutup pembelajaran dengan meminta peserta didik merefleksikan apa yang sudah dipelajari.",
      tambah(0, judul("Refleksi")),
      tambah("Refleksi", emo("f1", 150, 80, "🤔", 38)),
      tambah("menutup", ...kartu("f2", 40, 110, 220, 40, W.hijauMuda, ["guru menutup pembelajaran", "dengan Refleksi"], 9.4)),
    ),
    k(
      "Di Buku Siswa, Refleksi memuat delapan pernyataan. Dua yang milik subbab C adalah nomor enam dan nomor tujuh.",
      bersih(0),
      tambah(0, judul("Refleksi: 8 pernyataan")),
      ...[1, 2, 3, 4, 5, 6, 7, 8].map((n) => tambah(n === 1 ? "delapan" : n === 6 ? "enam" : n === 7 ? "tujuh" : "pernyataan", kotak(`rb${n}`, 22 + (n - 1) * 32, 70, 26, 26, n === 6 || n === 7 ? W.emas : W.abu, W.biru, { rx: 4 }), teks(`rt${n}`, 35 + (n - 1) * 32, 87, String(n), 10, W.biru))),
      tambah("tujuh", teks("rl", 150, 128, "nomor 6 dan 7 untuk subbab C", 9.4, W.ungu)),
    ),
    k(
      "Nomor enam: Aku dapat menyusun, atau komposisi, bilangan cacah sampai seratus ribu.",
      bersih(0),
      tambah(0, judul("Refleksi nomor 6")),
      tambah("Nomor", ...kartu("n6", 16, 56, 268, 56, W.hijauMuda, ["Aku dapat menyusun/komposisi", "bilangan cacah sampai 100.000."], 9.6)),
      tambah("komposisi", emo("n6e", 150, 144, "💰", 30)),
    ),
    k(
      "Nomor tujuh: Aku dapat menguraikan, atau dekomposisi, bilangan cacah sampai seratus ribu.",
      bersih(0),
      tambah(0, judul("Refleksi nomor 7")),
      tambah("Nomor", ...kartu("n7", 16, 56, 268, 56, W.pink, ["Aku dapat menguraikan/dekomposisi", "bilangan cacah sampai 100.000."], 9.6)),
      tambah("dekomposisi", emo("n7e", 150, 144, "🧩", 30)),
    ),
    k(
      "Jawab Ya bila kamu sudah bisa membuktikannya dengan uang Asep, Lukas, dan Komang. Jika belum, ulangi tabel nilai tempatnya sampai lancar.",
      bersih(0),
      tambah(0, judul("Jawab dengan jujur")),
      tambah("Ya", ...kartu("y1", 30, 60, 110, 44, W.hijauMuda, ["Ya", "sudah bisa"], 10)),
      tambah("belum", ...kartu("y2", 160, 60, 110, 44, W.merahMuda, ["Tidak", "ulangi dulu"], 10)),
      tambah("tabel", ...kartu("y3", 50, 128, 200, 40, W.langit, ["ulangi tabel nilai tempat"], 9.6)),
    ),
  ],
};
