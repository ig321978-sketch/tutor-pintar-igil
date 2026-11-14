import type { AdeganStory } from "./logika-story";
import { W, barisUang, bingkai, emo, isiSel, judul, kartu, panah, satuUang, teks, type Grid } from "./k5b1c-gambar";
import { bersih, hapus, k, tambah } from "./k5b1c-bantu";

/** Tabel komposisi dua baris (banyak lembar dan nilai) seperti di Buku Siswa hlm. 16. */
export const G_KOMP: Grid = { x: 8, y: 34, labelW: 34, colW: 50, rowH: 22, headH: 16 };

/* ------------------------------ 5. Eksplorasi 1.3: uang Asep dan uang Lukas (Buku Siswa hlm. 15) ------------------------------ */
const kiri = (id: string, y: number, isi: string, o: { warna?: string } = {}) => teks(id, 14, y + 8, isi, 9, o.warna ?? W.biru, { anchor: "start" });

export const ADEGAN_EKS13: AdeganStory = {
  id: "eks-13-uang",
  judul: "Eksplorasi 1.3: uang Asep dan uang Lukas",
  sumber: "Buku Siswa hlm. 15",
  latar: "#FDF4FF",
  kutipan: [
    "Eksplorasi 1.3",
    "Uang Asep",
    "Asep mempunyai uang pecahan sepuluh ribuan sebanyak 3 lembar, seribuan sebanyak 8 lembar, dan seratusan sebanyak 6 lembar.",
    "Uang Lukas",
    "Lukas mempunyai uang pecahan sepuluh ribuan sebanyak 6 lembar, seribuan sebanyak 3 lembar, dan seratusan sebanyak 5 lembar.",
  ],
  ketukan: [
    k(
      "Eksplorasi satu titik tiga memakai uang Asep dan uang Lukas. Kita hitung dulu uang masing-masing.",
      tambah(0, judul("Eksplorasi 1.3")),
      tambah("Asep", emo("ea", 80, 92, "👦", 36), ...kartu("eak", 36, 106, 88, 28, W.langit, ["uang Asep"], 9.4)),
      tambah("Lukas", emo("el", 220, 92, "👦", 36), ...kartu("elk", 176, 106, 88, 28, W.pink, ["uang Lukas"], 9.4)),
    ),
    k(
      "Asep mempunyai uang pecahan sepuluh ribuan sebanyak tiga lembar, seribuan sebanyak delapan lembar, dan seratusan sebanyak enam lembar.",
      bersih(0),
      tambah(0, judul("Uang Asep")),
      tambah("sepuluh", kiri("tp", 52, "10.000: 3 lembar"), ...barisUang("ap", 130, 52, 3, "p")),
      tambah("seribuan", kiri("tr", 92, "1.000: 8 lembar"), ...barisUang("ar", 130, 92, 8, "r")),
      tambah("seratusan", kiri("ts", 132, "100: 6 lembar"), ...barisUang("as", 130, 132, 6, "s")),
    ),
    k(
      "Lukas mempunyai uang pecahan sepuluh ribuan sebanyak enam lembar, seribuan sebanyak tiga lembar, dan seratusan sebanyak lima lembar.",
      bersih(0),
      tambah(0, judul("Uang Lukas")),
      tambah("sepuluh", kiri("tp", 52, "10.000: 6 lembar"), ...barisUang("lp", 130, 52, 6, "p")),
      tambah("seribuan", kiri("tr", 92, "1.000: 3 lembar"), ...barisUang("lr", 130, 92, 3, "r")),
      tambah("seratusan", kiri("ts", 132, "100: 5 lembar"), ...barisUang("ls", 130, 132, 5, "s")),
    ),
    k(
      "Uang mereka berbeda, tetapi sama-sama ditulis dengan pecahan sepuluh ribuan, seribuan, dan seratusan.",
      bersih(0),
      tambah(0, judul("Dua kantong uang")),
      tambah("Uang", ...kartu("sa", 20, 50, 120, 58, W.langit, ["Asep", "3, 8, 6"], 10)),
      tambah("sama-sama", ...kartu("sl", 160, 50, 120, 58, W.pink, ["Lukas", "6, 3, 5"], 10)),
      tambah("seratusan", ...barisUang("sx", 76, 128, 1, "p"), ...barisUang("sy", 142, 128, 1, "r"), ...barisUang("sz", 208, 128, 1, "s")),
    ),
    k(
      "Pertanyaannya, bagaimana kita menyusun uang itu menjadi sebuah bilangan? Itu tugas kita di tabel nilai tempat.",
      bersih(0),
      tambah(0, judul("Dari uang menjadi bilangan")),
      tambah("uang", ...kartu("u1", 14, 66, 112, 46, W.krem, ["lembar dan keping", "uang"], 9)),
      tambah("sebuah", panah("ua", 130, 89, 40, 0, W.merah, 2.4), ...kartu("u2", 174, 66, 112, 46, W.hijauMuda, ["sebuah", "bilangan"], 9.4)),
      tambah("tabel", ...kartu("u3", 54, 130, 192, 36, W.langit, ["tabel nilai tempat"], 10)),
    ),
  ],
};

/* ------------------------------ 6. Komposisi uang Asep (Buku Siswa hlm. 16) ------------------------------ */
export const ADEGAN_KOMPOSISI_ASEP: AdeganStory = {
  id: "komposisi-asep",
  judul: "Komposisi uang Asep",
  sumber: "Buku Siswa hlm. 16",
  latar: "#EFF6FF",
  kutipan: ["Komposisi Uang Asep", "Puluh Ribuan Ribuan Ratusan Puluhan Satuan", "Jadi, uang Asep terbentuk"],
  ketukan: [
    k(
      "Komposisi uang Asep. Tabel ini punya lima kolom nilai tempat: puluh ribuan, ribuan, ratusan, puluhan, dan satuan.",
      tambah(0, judul("Komposisi uang Asep")),
      tambah("tabel", bingkai("ta", G_KOMP, 2, ["banyak", "nilai"])),
      tambah("lima", teks("kl", 150, 112, "5 kolom nilai tempat", 8.6, W.hitam)),
    ),
    k(
      "Asep punya tiga lembar di kolom puluh ribuan, jadi kita tulis tiga. Nilainya tiga puluh ribu.",
      tambah("tiga", isiSel("ta", G_KOMP, 0, 0, "3")),
      tambah("Nilainya", isiSel("ta", G_KOMP, 1, 0, "30.000", 8.6, W.hijau)),
    ),
    k(
      "Seribuan ada delapan lembar. Tulis delapan di kolom ribuan, nilainya delapan ribu.",
      tambah("delapan", isiSel("ta", G_KOMP, 0, 1, "8")),
      tambah("nilainya", isiSel("ta", G_KOMP, 1, 1, "8.000", 8.6, W.hijau)),
    ),
    k(
      "Seratusan ada enam lembar. Tulis enam di kolom ratusan, nilainya enam ratus.",
      tambah("enam", isiSel("ta", G_KOMP, 0, 2, "6")),
      tambah("nilainya", isiSel("ta", G_KOMP, 1, 2, "600", 8.6, W.hijau)),
    ),
    k(
      "Asep tidak punya uang puluhan dan satuan. Karena itu kedua kolomnya diisi nol, dan nilainya juga nol.",
      tambah("puluhan", isiSel("ta", G_KOMP, 0, 3, "0"), isiSel("ta", G_KOMP, 1, 3, "0", 8.6, W.hijau)),
      tambah("satuan", isiSel("ta", G_KOMP, 0, 4, "0"), isiSel("ta", G_KOMP, 1, 4, "0", 8.6, W.hijau)),
    ),
    k(
      "Tiga puluh ribu, delapan ribu, dan enam ratus kita satukan. Jadi, uang Asep terbentuk tiga puluh delapan ribu enam ratus rupiah.",
      tambah("Tiga", teks("sm", 150, 122, "30.000 + 8.000 + 600 = 38.600", 9.4, W.coklat)),
      tambah("terbentuk", ...kartu("ha", 50, 138, 200, 40, W.hijauMuda, ["uang Asep: 38.600"], 11)),
    ),
  ],
};

/* ------------------------------ 7. Komposisi uang Lukas (Buku Siswa hlm. 16) ------------------------------ */
export const ADEGAN_KOMPOSISI_LUKAS: AdeganStory = {
  id: "komposisi-lukas",
  judul: "Komposisi uang Lukas",
  sumber: "Buku Siswa hlm. 16",
  latar: "#FFF1F2",
  kutipan: ["Komposisi Uang Lukas", "Jadi, uang Lukas terbentuk"],
  ketukan: [
    k(
      "Sekarang komposisi uang Lukas. Di buku tabelnya sudah terisi tiga di kolom puluh ribuan, dan tiga ribu di kolom ribuan.",
      tambah(0, judul("Komposisi uang Lukas")),
      tambah(0, bingkai("tl", G_KOMP, 2, ["banyak", "nilai"])),
      tambah("tiga", isiSel("tl", G_KOMP, 0, 0, "3", 9, W.merah)),
      tambah("ribu", isiSel("tl", G_KOMP, 1, 1, "3.000", 8.6, W.hijau)),
    ),
    k(
      "Tetapi cerita Lukas mengatakan enam lembar di kolom puluh ribuan. Jadi angka tiga itu tidak cocok. Seharusnya enam.",
      hapus("Jadi", "tl-v0-0"),
      tambah("Seharusnya", isiSel("tl", G_KOMP, 0, 0, "6", 9, W.hijau)),
      tambah("Seharusnya", teks("cat", 150, 114, "buku menulis 3, seharusnya 6", 8.6, W.merah)),
    ),
    k(
      "Nilainya enam puluh ribu. Lalu ribuan: tiga lembar, nilainya tiga ribu, sama dengan yang tertulis di buku.",
      tambah("Nilainya", isiSel("tl", G_KOMP, 1, 0, "60.000", 8.6, W.hijau)),
      tambah("tiga", isiSel("tl", G_KOMP, 0, 1, "3")),
    ),
    k(
      "Ratusan ada lima lembar, nilainya lima ratus. Puluhan dan satuan tidak ada, jadi nol.",
      tambah("lima", isiSel("tl", G_KOMP, 0, 2, "5"), isiSel("tl", G_KOMP, 1, 2, "500", 8.6, W.hijau)),
      tambah("Puluhan", isiSel("tl", G_KOMP, 0, 3, "0"), isiSel("tl", G_KOMP, 1, 3, "0", 8.6, W.hijau), isiSel("tl", G_KOMP, 0, 4, "0"), isiSel("tl", G_KOMP, 1, 4, "0", 8.6, W.hijau)),
      hapus("Puluhan", "cat"),
    ),
    k(
      "Enam puluh ribu, tiga ribu, dan lima ratus kita satukan. Jadi, uang Lukas terbentuk enam puluh tiga ribu lima ratus rupiah.",
      tambah("Enam", teks("sm", 150, 122, "60.000 + 3.000 + 500 = 63.500", 9.4, W.coklat)),
      tambah("terbentuk", ...kartu("hl", 50, 138, 200, 40, W.pink, ["uang Lukas: 63.500"], 11)),
    ),
    k(
      "Dari tabel yang sama kita dapat dua bilangan: tiga puluh delapan ribu enam ratus untuk Asep, dan enam puluh tiga ribu lima ratus untuk Lukas. Inilah komposisi: menyusun uang menjadi bilangan.",
      bersih(0),
      tambah(0, judul("2 bilangan dari uang")),
      tambah("Asep", ...kartu("k1", 20, 50, 120, 56, W.langit, ["Asep", "38.600"], 11)),
      tambah("Lukas", ...kartu("k2", 160, 50, 120, 56, W.pink, ["Lukas", "63.500"], 11)),
      tambah("komposisi", emo("k3", 150, 148, "💰", 30)),
      tambah("menyusun", teks("k4", 150, 184, "uang menjadi bilangan", 9.4, W.ungu)),
    ),
  ],
};

/* ------------------------------ 8. Ayo Berdiskusi: uang Komang (Buku Siswa hlm. 16) ------------------------------ */
export const ADEGAN_DISKUSI_KOMANG: AdeganStory = {
  id: "diskusi-komang",
  judul: "Ayo Berdiskusi: uang Komang",
  sumber: "Buku Siswa hlm. 16 dan 17",
  latar: "#F0FDFA",
  kutipan: [
    "Ayo Berdiskusi",
    "Komang membeli peralatan sekolah senilai Rp45.600,00.",
    "Jika Komang mempunyai uang pecahan sepuluh ribuan sebanyak 5 lembar, seribuan sebanyak 15 lembar, dan seratusan sebanyak 16 keping;",
    "berapakah komposisi uang yang dapat Komang lakukan untuk membayar?",
    "Gambar 1.6 Uang Komang",
    "Cara 1",
    "Cara 4",
  ],
  ketukan: [
    k(
      "Ayo Berdiskusi. Komang membeli peralatan sekolah senilai empat puluh lima ribu enam ratus rupiah.",
      tambah(0, judul("Ayo Berdiskusi")),
      tambah("Komang", emo("dk", 150, 84, "🎒", 36)),
      tambah("senilai", ...kartu("dh", 70, 104, 160, 44, W.krem, ["harga Rp45.600"], 12)),
    ),
    k(
      "Komang punya lima lembar sepuluh ribuan, lima belas lembar seribuan, dan enam belas keping seratusan.",
      bersih(0),
      tambah(0, judul("Uang Komang")),
      tambah("lima", satuUang("dp", 38, 44, "p"), ...kartu("dp2", 14, 58, 84, 56, W.lembarP, ["10.000", "5 lembar"], 9)),
      tambah("seribuan", satuUang("dr", 142, 44, "r"), ...kartu("dr2", 108, 58, 84, 56, W.lembarR, ["1.000", "15 lembar"], 9)),
      tambah("seratusan", satuUang("ds", 246, 44, "s"), ...kartu("ds2", 202, 58, 84, 56, W.keping, ["100", "16 keping"], 9)),
    ),
    k(
      "Pertanyaannya, berapa komposisi uang yang dapat Komang pakai untuk membayar tepat empat puluh lima ribu enam ratus rupiah?",
      tambah("Pertanyaannya", emo("dq", 150, 148, "❓", 30)),
      tambah("tepat", ...kartu("dt", 56, 156, 188, 34, W.krem, ["bayar tepat Rp45.600"], 10)),
    ),
    k(
      "Buku menyediakan tabel dengan empat baris, yaitu Cara satu sampai Cara empat. Jadi buku mengharapkan empat cara berbeda.",
      bersih(0),
      tambah(0, judul("Tabel Cara 1 sampai Cara 4")),
      tambah("Cara", ...kartu("c1", 30, 50, 100, 38, W.langit, ["Cara 1"], 10)),
      tambah("sampai", ...kartu("c2", 170, 50, 100, 38, W.hijauMuda, ["Cara 2"], 10)),
      tambah("Cara@2", ...kartu("c3", 30, 100, 100, 38, W.pink, ["Cara 3"], 10)),
      tambah("empat@2", ...kartu("c4", 170, 100, 100, 38, W.krem, ["Cara 4"], 10)),
      tambah("berbeda", teks("c5", 150, 166, "4 cara berbeda", 11, W.ungu)),
    ),
    k(
      "Buku tidak memberi kunci untuk keempat cara ini, dan Buku Panduan Guru juga tidak. Jadi kita temukan sendiri pada adegan berikutnya.",
      bersih(0),
      tambah(0, judul("Kunci tidak tersedia")),
      tambah("kunci", ...kartu("kk", 30, 56, 240, 46, W.merahMuda, ["buku dan Panduan Guru", "tidak memberi kunci"], 10)),
      tambah("temukan", emo("kf", 150, 140, "🔎", 34)),
    ),
  ],
};
