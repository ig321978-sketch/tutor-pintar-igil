import type { AdeganStory } from "./logika-story";
import { W, barisUang, bingkai, emo, isiSel, judul, kartu, panah, satuUang, teks } from "./k5b1c-gambar";
import { bersih, hapus, k, tambah } from "./k5b1c-bantu";
import { CARA_KOMANG, G_CARA, LABEL_CARA } from "./k5b1c-materi-3";

/** Teks rumus di tengah kanvas. */
const rumus = (id: string, y: number, isi: string, u = 10, warna: string = W.coklat) => teks(id, 150, y, isi, u, warna);
const kiri = (id: string, y: number, isi: string) => teks(id, 14, y + 8, isi, 9, W.biru, { anchor: "start" });

/* ------------------------------ 6. Standard Form Return: konsep ------------------------------ */
export const ADEGAN_LUAR_LAZIM: AdeganStory = {
  id: "luar-lazim",
  judul: "Metode luar 3: Standard Form Return",
  sumber: "Metode luar: Standard Form Return; angka uang Komang, Buku Siswa hlm. 16 dan 17",
  latar: "#FEFCE8",
  ketukan: [
    k(
      "Metode ketiga, Standard Form Return, atau kembali ke bentuk lazim. Setelah menguraikan atau menukar, kita periksa dengan menulis kembali bilangannya.",
      tambah(0, judul("Standard Form Return")),
      tambah("menguraikan", ...kartu("l1", 20, 56, 110, 46, W.krem, ["uraian", "atau tukaran"], 10)),
      tambah("kembali", panah("la", 134, 79, 32, 0, W.merah, 2.4), ...kartu("l2", 170, 56, 110, 46, W.hijauMuda, ["bentuk lazim", "satu bilangan"], 10)),
      tambah("periksa", emo("le", 150, 150, "🔍", 32)),
    ),
    k(
      "Contoh Cara tiga: tiga puluh ribu, lima belas ribu, dan enam ratus.",
      bersih(0),
      tambah(0, judul("Periksa Cara 3")),
      tambah("Cara", ...kartu("lc", 70, 40, 160, 30, W.pink, ["Cara 3: 3, 15, 6"], 10)),
      tambah("tiga", rumus("lr", 112, "30.000 + 15.000 + 600", 14, W.coklat)),
    ),
    k(
      "Tiga puluh ribu dan lima belas ribu menjadi empat puluh lima ribu. Ditambah enam ratus, hasilnya empat puluh lima ribu enam ratus.",
      tambah("menjadi", rumus("ls", 142, "45.000 + 600", 12, W.coklat)),
      tambah("hasilnya", rumus("lt", 170, "45.600", 20, W.hijau)),
    ),
    k(
      "Bilangan lazim ini sama dengan harga peralatan sekolah Komang. Jadi Cara tiga benar.",
      bersih(0),
      tambah(0, judul("Hasilnya cocok")),
      tambah("harga", ...kartu("lh", 50, 50, 200, 44, W.krem, ["harga Komang", "Rp45.600"], 11)),
      tambah("benar", emo("lv", 150, 140, "✅", 36)),
    ),
    k(
      "Cara memeriksa seperti ini berguna setiap kali kita menguraikan atau menukar bilangan.",
      tambah("menguraikan", ...kartu("lw", 40, 158, 220, 30, W.hijauMuda, ["uraikan atau tukar, lalu periksa"], 9.4)),
    ),
  ],
};

/* ------------------------------ 7. Standard Form Return: penerapan ------------------------------ */
export const ADEGAN_LUAR_LAZIM_TERAPAN: AdeganStory = {
  id: "luar-lazim-terapan",
  judul: "Standard Form Return pada Cara 2, uang Asep, dan tabel Lukas",
  sumber: "Metode luar: Standard Form Return, penerapan; angka Buku Siswa hlm. 15 sampai 17",
  latar: "#FEFCE8",
  ketukan: [
    k(
      "Periksa Cara dua: empat puluh ribu, empat ribu, dan seribu enam ratus.",
      tambah(0, judul("Periksa Cara 2")),
      tambah("Periksa", ...kartu("pa", 70, 40, 160, 30, W.hijauMuda, ["Cara 2: 4, 4, 16"], 10)),
      tambah("empat", rumus("pr", 112, "40.000 + 4.000 + 1.600", 14, W.coklat)),
    ),
    k(
      "Empat puluh ribu dan empat ribu menjadi empat puluh empat ribu. Ditambah seribu enam ratus, hasilnya empat puluh lima ribu enam ratus. Cocok juga.",
      tambah("menjadi", rumus("pu", 142, "44.000 + 1.600", 12, W.coklat)),
      tambah("hasilnya", rumus("pv", 170, "45.600", 20, W.hijau)),
    ),
    k(
      "Sekarang periksa uang Asep. Tiga puluh ribu, delapan ribu, dan enam ratus kembali menjadi tiga puluh delapan ribu enam ratus.",
      bersih(0),
      tambah(0, judul("Periksa uang Asep")),
      tambah("Tiga", rumus("pw", 80, "30.000 + 8.000 + 600", 14, W.coklat)),
      tambah("kembali", rumus("px", 126, "38.600", 24, W.hijau)),
      tambah("kembali", ...kartu("py", 60, 150, 180, 34, W.hijauMuda, ["sama dengan bilangan Asep"], 9.6)),
    ),
    k(
      "Metode ini juga menemukan kesalahan tabel Lukas di buku. Tiga puluh ribu, tiga ribu, dan lima ratus menjadi tiga puluh tiga ribu lima ratus, bukan enam puluh tiga ribu lima ratus.",
      bersih(0),
      tambah(0, judul("Periksa tabel Lukas", W.merah)),
      tambah("Tiga", ...kartu("q1", 30, 40, 240, 34, W.merahMuda, ["tabel di buku: 3 di puluh ribuan"], 9.4)),
      tambah("Tiga", rumus("q2", 100, "30.000 + 3.000 + 500", 12, W.coklat)),
      tambah("menjadi", rumus("q3", 128, "33.500", 18, W.merah)),
      tambah("enam", ...kartu("q4", 30, 146, 240, 34, W.hijauMuda, ["cerita Lukas: 63.500"], 10)),
    ),
  ],
};

/* ------------------------------ 8. Money Composition: konsep ------------------------------ */
const labelBaris = (awal: string, p: number, r: number, s: number) => [kiri(`${awal}tp`, 52, `10.000: ${p} lembar`), kiri(`${awal}tr`, 92, `1.000: ${r} lembar`), kiri(`${awal}ts`, 132, `100: ${s} keping`)];

export const ADEGAN_LUAR_UANG: AdeganStory = {
  id: "luar-uang",
  judul: "Metode luar 4: Money Composition",
  sumber: "Metode luar: Money Composition; uang Asep dan Lukas, Buku Siswa hlm. 15 dan 16",
  latar: "#FDF2F8",
  ketukan: [
    k(
      "Metode keempat, Money Composition, atau menyusun dari uang. Mulai dari pecahan terbesar, ambil sebanyak yang dibutuhkan, lalu lanjut ke pecahan yang lebih kecil.",
      tambah(0, judul("Money Composition")),
      tambah("terbesar", satuUang("ma", 40, 54, "p"), ...kartu("mak", 16, 68, 76, 36, W.lembarP, ["terbesar"], 9)),
      tambah("lanjut", panah("mp1", 96, 86, 20, 0, W.merah, 2.2), satuUang("mb", 142, 54, "r"), ...kartu("mbk", 120, 68, 76, 36, W.lembarR, ["lanjut"], 9)),
      tambah("kecil", panah("mp2", 200, 86, 20, 0, W.merah, 2.2), satuUang("mc", 246, 54, "s"), ...kartu("mck", 224, 68, 64, 36, W.keping, ["kecil"], 9)),
      tambah("kecil", emo("me", 150, 150, "💵", 32)),
    ),
    k(
      "Contoh uang Asep: tiga lembar sepuluh ribuan, delapan lembar seribuan, enam keping seratusan. Susun uangnya dari yang terbesar.",
      bersih(0),
      tambah(0, judul("Uang Asep disusun")),
      tambah("tiga", ...labelBaris("x", 3, 8, 6)),
      tambah("tiga", ...barisUang("xp", 130, 52, 3, "p")),
      tambah("delapan", ...barisUang("xr", 130, 92, 8, "r")),
      tambah("enam", ...barisUang("xs", 130, 132, 6, "s")),
    ),
    k(
      "Nilainya dihitung dari pecahan terbesar: tiga puluh ribu, lalu delapan ribu, lalu enam ratus. Jadi tiga puluh delapan ribu enam ratus.",
      bersih(0),
      tambah(0, judul("Nilai dari yang terbesar")),
      tambah("tiga", ...kartu("v1", 30, 40, 240, 30, W.lembarP, ["3 lembar 10.000 = 30.000"], 9.4)),
      tambah("delapan", ...kartu("v2", 30, 80, 240, 30, W.lembarR, ["8 lembar 1.000 = 8.000"], 9.4)),
      tambah("enam", ...kartu("v3", 30, 120, 240, 30, W.keping, ["6 keping 100 = 600"], 9.4)),
      tambah("Jadi", rumus("v4", 176, "jumlah 38.600", 14, W.hijau)),
    ),
    k(
      "Uang Lukas disusun dengan cara yang sama: enam lembar, tiga lembar, dan lima keping, sehingga bernilai enam puluh tiga ribu lima ratus.",
      bersih(0),
      tambah(0, judul("Uang Lukas disusun")),
      tambah("enam", ...kartu("w1", 30, 40, 240, 30, W.lembarP, ["6 lembar 10.000 = 60.000"], 9.4)),
      tambah("tiga", ...kartu("w2", 30, 80, 240, 30, W.lembarR, ["3 lembar 1.000 = 3.000"], 9.4)),
      tambah("lima", ...kartu("w3", 30, 120, 240, 30, W.keping, ["5 keping 100 = 500"], 9.4)),
      tambah("bernilai", rumus("w4", 176, "jumlah 63.500", 14, W.hijau)),
    ),
    k(
      "Metode ini cocok saat uang yang tersedia terbatas, seperti uang Komang, karena kita tahu apa yang bisa diambil lebih dulu.",
      bersih(0),
      tambah(0, judul("Cocok untuk uang terbatas")),
      tambah("terbatas", emo("ut", 150, 80, "💰", 36)),
      tambah("Komang", ...kartu("uk", 40, 100, 220, 44, W.krem, ["uang Komang terbatas", "ambil dari yang terbesar"], 10)),
    ),
  ],
};

/* ------------------------------ 9. Money Composition: penerapan pada batas uang Komang ------------------------------ */
export const ADEGAN_LUAR_UANG_TERAPAN: AdeganStory = {
  id: "luar-uang-terapan",
  judul: "Money Composition pada uang Komang",
  sumber: "Metode luar: Money Composition, penerapan; angka Buku Siswa hlm. 16 dan 17",
  latar: "#FDF2F8",
  ketukan: [
    k(
      "Sekarang bayar empat puluh lima ribu enam ratus dengan uang Komang. Mulai dari sepuluh ribuan: lima lembar berarti lima puluh ribu, terlalu banyak. Jadi ambil empat lembar, empat puluh ribu.",
      tambah(0, judul("Bayar Rp45.600")),
      tambah("sepuluh", ...kartu("o1", 16, 36, 268, 30, W.lembarP, ["mulai dari 10.000"], 9.4)),
      tambah("lima", ...kartu("o2", 16, 76, 268, 30, W.merahMuda, ["5 lembar: 50.000, terlalu banyak"], 9.4)),
      tambah("empat@2", ...kartu("o3", 16, 116, 268, 30, W.hijauMuda, ["4 lembar: 40.000, boleh"], 9.4)),
    ),
    k(
      "Sisanya lima ribu enam ratus. Seribuan Komang ada lima belas lembar, jadi ambil lima lembar.",
      bersih(0),
      tambah(0, judul("Sisa dibayar seribuan")),
      tambah("Sisanya", ...kartu("o4", 16, 40, 268, 30, W.krem, ["sisa 5.600"], 10)),
      tambah("Seribuan", ...kartu("o5", 16, 82, 268, 30, W.lembarR, ["1.000: ada 15 lembar"], 9.4)),
      tambah("ambil", ...kartu("o6", 16, 124, 268, 30, W.hijauMuda, ["ambil 5 lembar"], 9.4)),
    ),
    k(
      "Sisa enam ratus, ambil enam keping seratusan. Selesai, itulah Cara satu.",
      tambah("Sisa", ...kartu("o7", 16, 160, 268, 30, W.keping, ["sisa 600 = 6 keping 100"], 9.4)),
      hapus("ambil", "o4-k", "o4-t0"),
    ),
    k(
      "Batas uang Komang penting. Misalnya setelah empat lembar sepuluh ribuan, kalau hanya tiga lembar seribuan, sisanya dua ribu enam ratus harus dibayar dengan dua puluh enam keping seratusan. Komang hanya punya enam belas keping, jadi tidak bisa.",
      bersih(0),
      tambah(0, judul("Batas uang Komang", W.merah)),
      tambah("Misalnya", ...kartu("b1", 16, 36, 268, 28, W.hijauMuda, ["4 lembar 10.000"], 9)),
      tambah("tiga", ...kartu("b2", 16, 70, 268, 28, W.lembarR, ["3 lembar 1.000, sisa 2.600"], 9)),
      tambah("dua@2", ...kartu("b3", 16, 104, 268, 28, W.keping, ["perlu 26 keping 100"], 9)),
      tambah("enam@2", ...kartu("b4", 16, 138, 268, 28, W.merahMuda, ["Komang hanya punya 16 keping"], 9)),
      tambah("bisa", emo("b5", 150, 190, "🚫", 16)),
    ),
    k(
      "Dengan memeriksa batas ini, hanya ada empat cara, dan keempatnya sudah kita temukan.",
      bersih(0),
      tambah(0, judul("Hanya ada 4 cara")),
      tambah("empat", bingkai("ot", G_CARA, 4, LABEL_CARA)),
      ...[0, 1, 2, 3].map((i) => tambah("keempatnya", ...CARA_KOMANG[i].map((v, j) => isiSel("ot", G_CARA, i, j, String(v))), isiSel("ot", G_CARA, i, 3, "0"), isiSel("ot", G_CARA, i, 4, "0"))),
      tambah("temukan", ...kartu("og", 60, 148, 180, 34, W.hijauMuda, ["semua tepat Rp45.600"], 10)),
    ),
  ],
};

/* ------------------------------ 10. Ringkasan ------------------------------ */
export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan empat metode dari luar",
  sumber: "Ringkasan metode luar; angka Buku Siswa hlm. 15 sampai 17",
  latar: "#F5F3FF",
  ketukan: [
    k(
      "Ringkasan: satu bilangan, empat sudut pandang. Expanded Form menguraikan bilangan menjadi nilai tiap angka. Flexible Grouping menukar antar tempat nilai.",
      tambah(0, judul("Ringkasan: 1 bilangan, 4 sudut pandang")),
      tambah("Expanded", ...kartu("r1", 16, 40, 268, 40, W.hijauMuda, ["Expanded Form", "uraikan nilai tiap angka"], 9.4)),
      tambah("Flexible", ...kartu("r2", 16, 92, 268, 40, W.langit, ["Flexible Grouping", "tukar antar tempat nilai"], 9.4)),
    ),
    k(
      "Standard Form Return mengumpulkan kembali nilainya untuk memeriksa. Money Composition menyusun dari uang, mulai dari pecahan terbesar.",
      tambah("Standard", ...kartu("r3", 16, 144, 268, 40, W.krem, ["Standard Form Return", "kumpulkan kembali, periksa"], 9.4)),
      hapus("Money", "r1-k", "r1-t0", "r1-t1"),
      tambah("Money", ...kartu("r4", 16, 40, 268, 40, W.pink, ["Money Composition", "susun dari uang terbesar"], 9.4)),
    ),
    k(
      "Uang Asep tiga puluh delapan ribu enam ratus, uang Lukas enam puluh tiga ribu lima ratus, dan Komang punya empat cara untuk empat puluh lima ribu enam ratus.",
      bersih(0),
      tambah(0, judul("Angka dari buku")),
      tambah("Asep", ...kartu("s1", 16, 50, 84, 52, W.langit, ["Asep", "38.600"], 10)),
      tambah("Lukas", ...kartu("s2", 108, 50, 84, 52, W.pink, ["Lukas", "63.500"], 10)),
      tambah("Komang", ...kartu("s3", 200, 50, 84, 52, W.hijauMuda, ["Komang", "45.600"], 10)),
      tambah("empat", teks("s4", 150, 134, "4 cara untuk uang Komang", 9.4, W.ungu)),
    ),
    k(
      "Pilih metode sesuai soal: uraikan untuk membaca nilai, tukar untuk mencari cara lain, periksa kembali untuk memastikan, dan susun dari uang bila uangnya terbatas.",
      bersih(0),
      tambah(0, judul("Pilih sesuai soal")),
      tambah("uraikan", ...kartu("y1", 16, 40, 128, 40, W.hijauMuda, ["uraikan", "baca nilai"], 9.4)),
      tambah("tukar", ...kartu("y2", 156, 40, 128, 40, W.langit, ["tukar", "cari cara lain"], 9.4)),
      tambah("periksa", ...kartu("y3", 16, 92, 128, 40, W.krem, ["periksa kembali", "pastikan"], 9.4)),
      tambah("susun", ...kartu("y4", 156, 92, 128, 40, W.pink, ["susun dari uang", "uang terbatas"], 9.4)),
    ),
    k(
      "Catatan buku: tabel Lukas menulis tiga di kolom puluh ribuan, seharusnya enam. Metode periksa kembali tadi menunjukkan kesalahan itu.",
      bersih(0),
      tambah(0, judul("Catatan buku", W.merah)),
      tambah("tabel", ...kartu("t1", 30, 50, 240, 44, W.merahMuda, ["tabel Lukas: 3 puluh ribuan", "seharusnya 6"], 10)),
      tambah("periksa", emo("t2", 150, 134, "🔍", 34)),
    ),
  ],
};
