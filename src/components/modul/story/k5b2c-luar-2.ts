import type { AdeganStory } from "./logika-story";
import { W, WARNA_PASANGAN, deret, emo, faktor, garis, judul, kartu, kisi, kurungDeret, sebar, teks } from "./k5b2c-gambar";
import { bersih, hapus, k, tambah } from "./k5b2c-bantu";

const pas = (id: string, y: number, a: number, b: number, n: number, warna: string, u = 15) => teks(id, 150, y, `${a} × ${b} = ${n}`, u, warna);

const xs8 = sebar(8, 30, 270);
const xs12 = sebar(12, 20, 280);
const c24 = deret("f24", xs8, 76, 12, faktor(24), 8.6);
const k24 = kurungDeret("f24", xs8, 76, 12, 8);
const c72 = deret("f72", xs12, 76, 10, faktor(72), 8);
const k72 = kurungDeret("f72", xs12, 76, 10, 12);

/* ------------------------------ 5. Factor Rainbow: penerapan ------------------------------ */
export const ADEGAN_LUAR_PELANGI_TERAPAN: AdeganStory = {
  id: "luar-pelangi-terapan",
  judul: "Factor Rainbow pada angka buku",
  sumber: "Metode luar: Factor Rainbow; Buku Siswa hlm. 46",
  latar: "#E0F2FE",
  ketukan: [
    k(
      "Terapkan pada dua puluh empat. Urutan faktornya satu, dua, tiga, empat, enam, delapan, dua belas, dan dua puluh empat.",
      tambah(0, judul("Pelangi faktor 24")),
      tambah(7, c24.slice(0, 2)),
      tambah(8, c24.slice(2, 4)),
      tambah(9, c24.slice(4, 6)),
      tambah(10, c24.slice(6, 8)),
      tambah(11, c24.slice(8, 10)),
      tambah(12, c24.slice(10, 12)),
      tambah(13, c24.slice(12, 14)),
      tambah(16, c24.slice(14, 16)),
    ),
    k(
      "Busur terluar menghubungkan satu dengan dua puluh empat. Lalu dua dengan dua belas, tiga dengan delapan, dan empat dengan enam. Semua faktor berpasangan, jadi daftarnya lengkap.",
      tambah(3, k24[0]),
      tambah(9, k24[1]),
      tambah(13, k24[2]),
      tambah(17, k24[3]),
      tambah(23, teks("lk", 150, 160, "8 faktor, 4 pasang, lengkap", 11, W.hijau)),
    ),
    k(
      "Sekarang tujuh puluh dua, Ayo Berlatih nomor empat. Faktornya dua belas: satu, dua, tiga, empat, enam, delapan, sembilan, dua belas, delapan belas, dua puluh empat, tiga puluh enam, dan tujuh puluh dua.",
      bersih(0),
      tambah(0, judul("Pelangi faktor 72")),
      tambah(4, teks("nb", 150, 36, "Ayo Berlatih nomor 4", 9, W.coklat)),
      tambah(11, c72.slice(0, 2)),
      tambah(12, c72.slice(2, 4)),
      tambah(13, c72.slice(4, 6)),
      tambah(14, c72.slice(6, 8)),
      tambah(15, c72.slice(8, 10)),
      tambah(16, c72.slice(10, 12)),
      tambah(17, c72.slice(12, 14)),
      tambah(18, c72.slice(14, 16)),
      tambah(20, c72.slice(16, 18)),
      tambah(22, c72.slice(18, 20)),
      tambah(25, c72.slice(20, 22)),
      tambah(29, c72.slice(22, 24)),
    ),
    k(
      "Enam busur muncul: satu dengan tujuh puluh dua, dua dengan tiga puluh enam, tiga dengan dua puluh empat, empat dengan delapan belas, enam dengan dua belas, dan delapan dengan sembilan.",
      tambah(3, k72[0]),
      tambah(8, k72[1]),
      tambah(13, k72[2]),
      tambah(18, k72[3]),
      tambah(22, k72[4]),
      tambah(27, k72[5]),
      tambah(29, teks("bb", 150, 176, "6 busur, 12 faktor, lengkap", 12, W.hijau)),
    ),
  ],
};

/* ------------------------------ 6. Array Model: konsep ------------------------------ */
export const ADEGAN_LUAR_SUSUNAN: AdeganStory = {
  id: "luar-susunan",
  judul: "Array Model: susunan persegi panjang",
  sumber: "Metode luar: Array Model",
  latar: "#FEFCE8",
  ketukan: [
    k(
      "Metode ketiga, Array Model, yaitu model susunan persegi panjang. Bilangan dianggap sebagai luas, yaitu banyaknya petak.",
      tambah(0, judul("Array Model")),
      tambah("susunan", ...kisi("a3x4", 90, 36, 30, 3, 4, 12)),
      tambah("luas,", teks("al", 150, 152, "12 petak", 14, W.hijau)),
    ),
    k(
      "Setiap persegi panjang dengan luas dua belas petak menunjukkan sepasang faktor. Panjang dan lebarnya adalah faktor dari dua belas.",
      hapus(0, "al"),
      tambah("Panjang@2", teks("dp", 150, 33, "panjang 4", 10, W.merah)),
      tambah("lebarnya", teks("dl", 242, 86, "lebar 3", 10, W.biru)),
      tambah("faktor@2", teks("df", 150, 156, "3 dan 4 faktor dari 12", 12, W.hijau)),
    ),
    k(
      "Ada tiga susunan untuk dua belas petak: satu baris berisi dua belas petak, dua baris berisi enam petak, dan tiga baris berisi empat petak.",
      bersih(0),
      tambah(0, judul("Tiga susunan untuk 12 petak")),
      tambah(7, ...kisi("a1x12", 60, 40, 14, 1, 12, 12), teks("l1", 250, 52, "1 × 12", 11, W.oranye)),
      tambah(13, ...kisi("a2x6", 60, 76, 14, 2, 6, 12, W.jingga), teks("l2", 190, 94, "2 × 6", 11, W.biru)),
      tambah(19, ...kisi("a3x4", 60, 116, 14, 3, 4, 12, W.pink), teks("l3", 170, 142, "3 × 4", 11, W.pinkTua)),
    ),
    k(
      "Kalau susunan tidak bisa dibuat tanpa sisa, berarti bukan faktor. Dua belas petak dalam baris berisi lima petak: dua baris penuh, dan sisa dua petak. Jadi lima bukan faktor.",
      bersih(0),
      tambah(0, judul("Susunan yang bersisa", W.merah)),
      tambah(10, ...kisi("a3x5", 90, 36, 24, 3, 5, 12, W.merahPita)),
      tambah(15, teks("sx", 150, 134, "baris berisi 5 petak", 11, W.hitam)),
      tambah(18, teks("sy", 150, 154, "2 baris penuh", 11, W.hijau)),
      tambah(22, teks("sz", 150, 174, "12 : 5 = 2, sisa 2", 12, W.merah)),
      tambah(25, teks("sw", 150, 192, "5 bukan faktor 12", 11, W.merah)),
    ),
  ],
};

/* ------------------------------ 7. Array Model: penerapan ------------------------------ */
export const ADEGAN_LUAR_SUSUNAN_TERAPAN: AdeganStory = {
  id: "luar-susunan-terapan",
  judul: "Array Model pada angka buku",
  sumber: "Metode luar: Array Model; Buku Siswa hlm. 44–46",
  latar: "#FFFBEB",
  ketukan: [
    k(
      "Terapkan pada delapan belas petak, Eksplorasi dua titik tiga B. Tiga susunan: satu baris delapan belas petak, dua baris sembilan petak, dan tiga baris enam petak.",
      tambah(0, judul("Eksplorasi 2.3B: 18 petak")),
      tambah(12, ...kisi("b1x18", 42, 48, 12, 1, 18, 18), teks("m1", 150, 42, "1 × 18", 10, W.oranye)),
      tambah(17, ...kisi("b2x9", 42, 74, 12, 2, 9, 18, W.jingga), teks("m2", 190, 92, "2 × 9", 11, W.biru)),
      tambah(22, ...kisi("b3x6", 42, 114, 12, 3, 6, 18, W.pink), teks("m3", 160, 134, "3 × 6", 11, W.pinkTua)),
    ),
    k(
      "Panjang dan lebar semua susunan itu adalah faktor delapan belas: satu, dua, tiga, enam, sembilan, dan delapan belas.",
      tambah("faktor", teks("ml", 150, 178, "faktor 18: 1, 2, 3, 6, 9, 18", 12, W.hijau)),
    ),
    k(
      "Pada tiga puluh enam ada susunan istimewa: enam baris, enam petak tiap baris. Bentuknya persegi, panjang dan lebarnya sama, jadi hanya menyumbang satu faktor.",
      bersih(0),
      tambah(0, judul("Susunan istimewa: 36 petak")),
      tambah(5, ...kisi("b6x6", 102, 34, 16, 6, 6, 36, W.hijauPita)),
      tambah(7, teks("s1", 52, 86, "6 baris", 10, W.biru)),
      tambah(9, teks("s2", 150, 150, "6 petak tiap baris", 10, W.hitam)),
      tambah(14, teks("s3", 150, 170, "persegi: 6 × 6 = 36", 12, W.hijau)),
      tambah(22, teks("s4", 150, 190, "6 hanya dihitung 1 faktor", 10, W.ungu)),
    ),
    k(
      "Jadi tiga puluh enam petak bisa disusun menjadi lima macam persegi panjang: satu kali tiga puluh enam, dua kali delapan belas, tiga kali dua belas, empat kali sembilan, dan enam kali enam. Lima susunan menghasilkan sembilan faktor.",
      bersih(0),
      tambah(0, judul("Susunan lain untuk 36 petak")),
      tambah(12, pas("t1", 48, 1, 36, 36, WARNA_PASANGAN[0])),
      tambah(17, pas("t2", 74, 2, 18, 36, WARNA_PASANGAN[1])),
      tambah(21, pas("t3", 100, 3, 12, 36, WARNA_PASANGAN[2])),
      tambah(25, pas("t4", 126, 4, 9, 36, WARNA_PASANGAN[3])),
      tambah(29, pas("t5", 152, 6, 6, 36, WARNA_PASANGAN[4])),
      tambah(32, teks("sm", 150, 182, "5 susunan, 9 faktor", 13, W.hijau)),
    ),
  ],
};

/* ------------------------------ 8. Trial Division Ladder: konsep ------------------------------ */
const rel = (i: number): string => `lg${i}`;
const tangga = () => [
  garis("lr1", 96, 34, 0, 150, W.coklat, 3, { gambar: true }),
  garis("lr2", 204, 34, 0, 150, W.coklat, 3, { gambar: true }),
  ...[0, 1, 2, 3, 4].map((i) => garis(rel(i), 96, 60 + 26 * i, 108, 0, W.coklat, 2)),
];
export const ADEGAN_LUAR_TANGGA: AdeganStory = {
  id: "luar-tangga",
  judul: "Trial Division Ladder: tangga uji bagi",
  sumber: "Metode luar: Trial Division Ladder",
  latar: "#F5F3FF",
  ketukan: [
    k(
      "Metode keempat, Trial Division Ladder, atau tangga uji bagi. Kita menguji bilangan satu, dua, tiga, dan seterusnya, satu per satu, apakah membagi habis.",
      tambah(0, judul("Trial Division Ladder")),
      tambah("tangga", tangga()),
      tambah(12, teks("u1", 150, 55, "uji 1", 12, W.oranye)),
      tambah(13, teks("u2", 150, 81, "uji 2", 12, W.biru)),
      tambah(14, teks("u3", 150, 107, "uji 3", 12, W.pinkTua)),
      tambah(16, teks("u4", 150, 133, "...", 14, W.coklat)),
    ),
    k(
      "Setiap kali habis dibagi, kita langsung dapat dua faktor sekaligus: pembagi itu dan hasil baginya. Untuk dua belas: satu dan dua belas, dua dan enam, tiga dan empat.",
      bersih(0),
      tambah(0, judul("Menguji 12 dengan tangga")),
      tambah(18, teks("e1", 100, 60, "12 : 1 = 12", 14, W.oranye), teks("f1", 225, 60, "1 dan 12", 11, W.oranye)),
      tambah(22, teks("e2", 100, 90, "12 : 2 = 6", 14, W.biru), teks("f2", 225, 90, "2 dan 6", 11, W.biru)),
      tambah(25, teks("e3", 100, 120, "12 : 3 = 4", 14, W.pinkTua), teks("f3", 225, 120, "3 dan 4", 11, W.pinkTua)),
    ),
    k(
      "Kapan berhenti? Saat pembagi yang diuji sudah lebih besar daripada hasil baginya. Pada dua belas, setelah tiga, hasil baginya empat. Empat sudah muncul, jadi kita berhenti.",
      tambah(20, teks("e4", 100, 150, "12 : 4 = 3", 14, W.coklat), teks("f4", 225, 150, "sudah ada", 10, W.merah)),
      tambah(25, emo("st", 150, 186, "🛑", 28)),
    ),
    k(
      "Keuntungannya, kita tidak perlu menguji sampai bilangan itu sendiri. Cukup sampai pembagi bertemu pasangannya, dan tidak ada faktor yang terlewat.",
      bersih(0),
      tambah(0, judul("Mengapa tangga ini hemat?")),
      tambah("menguji", ...kartu("h1", 30, 44, 240, 40, W.hijauMuda, ["tidak perlu menguji", "sampai bilangan itu sendiri"], 10)),
      tambah("Cukup", ...kartu("h2", 30, 100, 240, 40, W.langit, ["berhenti saat pembagi", "bertemu pasangannya"], 10)),
      tambah("terlewat.", teks("h3", 150, 170, "tak ada faktor terlewat", 11, W.hijau)),
    ),
  ],
};

/* ------------------------------ 9. Trial Division Ladder: penerapan ------------------------------ */
/** Baris uji bagi 96 : d = q (dengan sisa bila tidak habis). Dua kolom: d = 1 sampai 5 di kiri, d = 6 sampai 10 di kanan. */
const uji = (d: number): ReturnType<typeof teks> => {
  const q = Math.floor(96 / d);
  const sisa = 96 % d;
  const kolom = d <= 5 ? 82 : 214;
  const y = 50 + ((d - 1) % 5) * 20;
  return teks(`ug${d}`, kolom, y, sisa === 0 ? `96 : ${d} = ${q}` : `96 : ${d} = ${q}, sisa ${sisa}`, 9.4, sisa === 0 ? W.hijau : W.merah);
};
export const ADEGAN_LUAR_TANGGA_TERAPAN: AdeganStory = {
  id: "luar-tangga-terapan",
  judul: "Trial Division Ladder pada angka buku",
  sumber: "Metode luar: Trial Division Ladder; Buku Siswa hlm. 46",
  latar: "#EDE9FE",
  ketukan: [
    k(
      "Terapkan pada sembilan puluh enam, Ayo Berlatih nomor lima. Uji satu: habis, hasilnya sembilan puluh enam. Uji dua: habis, hasilnya empat puluh delapan. Uji tiga: habis, hasilnya tiga puluh dua.",
      tambah(0, judul("Tangga uji bagi: 96")),
      tambah(5, teks("nb", 150, 34, "Ayo Berlatih nomor 5", 9, W.coklat)),
      tambah(10, uji(1)),
      tambah(17, uji(2)),
      tambah(24, uji(3)),
    ),
    k(
      "Uji empat: habis, hasilnya dua puluh empat. Uji lima: tidak habis, sisa satu. Uji enam: habis, hasilnya enam belas.",
      tambah(1, uji(4)),
      tambah(8, uji(5)),
      tambah(14, uji(6)),
    ),
    k(
      "Uji tujuh: tidak habis, sisa lima. Uji delapan: habis, hasilnya dua belas. Uji sembilan: tidak habis, sisa enam.",
      tambah(1, uji(7)),
      tambah(7, uji(8)),
      tambah(13, uji(9)),
    ),
    k(
      "Uji sepuluh: tidak habis, sisa enam, dan hasil baginya sudah di bawah sepuluh. Pembagi sudah melewati pasangannya, jadi tangga berhenti.",
      tambah(1, uji(10)),
      tambah(18, emo("st", 150, 156, "🛑", 22)),
    ),
    k(
      "Kumpulkan semua pembagi yang habis dan hasil baginya: satu, dua, tiga, empat, enam, delapan, dua belas, enam belas, dua puluh empat, tiga puluh dua, empat puluh delapan, dan sembilan puluh enam. Semuanya cocok dengan kunci buku.",
      hapus(0, "st"),
      tambah(9, teks("fl", 150, 148, "faktor 96: 1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 96", 9.4, W.hijau)),
      tambah("Semuanya", ...kartu("kn", 5, 160, 290, 36, W.hijauMuda, ["kunci buku 96: 1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 96", "benar"], 7.4)),
    ),
  ],
};

/* ------------------------------ 10. Ringkasan ------------------------------ */
export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan empat metode luar",
  sumber: "Ringkasan metode luar: Factor Pairs, Factor Rainbow, Array Model, Trial Division Ladder",
  latar: "#FFF1F2",
  ketukan: [
    k(
      "Ringkasannya. Factor Pairs menulis pasangan kali. Factor Rainbow menggambar busur penghubung. Array Model menyusun persegi panjang. Trial Division Ladder menguji pembagi berurutan.",
      tambah(0, judul("Ringkasan empat metode")),
      tambah("Pairs", ...kartu("r1", 20, 32, 260, 34, W.hijauMuda, ["Factor Pairs: pasangan kali"], 9.4)),
      tambah("Rainbow", ...kartu("r2", 20, 72, 260, 34, W.langit, ["Factor Rainbow: busur penghubung"], 9.4)),
      tambah("Array", ...kartu("r3", 20, 112, 260, 34, W.krem, ["Array Model: persegi panjang"], 9.4)),
      tambah("Trial", ...kartu("r4", 20, 152, 260, 34, W.pink, ["Trial Division Ladder: uji pembagi"], 9.4)),
    ),
    k(
      "Keempatnya menghasilkan faktor yang sama. Contohnya dua puluh empat: satu, dua, tiga, empat, enam, delapan, dua belas, dan dua puluh empat, jadi delapan faktor.",
      bersih(0),
      tambah(0, judul("Hasil yang sama")),
      tambah("sama.", ...kartu("rs", 20, 36, 260, 56, W.hijauMuda, ["pasangan, pelangi, susunan, tangga", "semuanya menghasilkan faktor yang sama"], 9.4)),
      tambah("Contohnya", teks("fl", 150, 130, "faktor 24: 1, 2, 3, 4, 6, 8, 12, 24", 12, W.hijau)),
      tambah(21, teks("d8", 150, 164, "8 faktor", 14, W.biru)),
    ),
    k(
      "Untuk memeriksa jawaban, gabungkan dua cara. Tangga uji bagi dipakai untuk mencari, dan busur pelangi untuk memeriksa kelengkapan. Kunci buku pun bisa diperiksa dengan cara ini.",
      bersih(0),
      tambah(0, judul("Gabungkan dua cara")),
      tambah("Tangga", ...kartu("c1", 30, 36, 240, 36, W.langit, ["1. mencari: tangga uji bagi"], 10)),
      tambah("busur", ...kartu("c2", 30, 84, 240, 36, W.hijauMuda, ["2. memeriksa: busur pelangi"], 10)),
      tambah("Kunci", ...kartu("c3", 30, 132, 240, 36, W.krem, ["kunci buku pun bisa diperiksa"], 10)),
    ),
    k(
      "Dengan begitu, kesalahan di kunci langsung ketahuan. Enam yang terlewat pada tiga puluh enam, dan empat yang salah masuk pada lima puluh empat. Metode mana pun pilihanmu, hasilnya harus sama.",
      bersih(0),
      tambah(0, judul("Kesalahan kunci ketahuan", W.merah)),
      tambah(7, ...kartu("e1", 20, 40, 260, 46, W.merahMuda, ["36: angka 6 terlewat", "kunci buku 36: 1, 2, 3, 4, 9, 12, 18, 36"], 9.4)),
      tambah(14, ...kartu("e2", 20, 96, 260, 46, W.merahMuda, ["54: angka 4 salah masuk", "kunci buku 54: 1, 2, 3, 4, 9, 18, 27, 54"], 9.4)),
      tambah(23, ...kartu("e3", 40, 152, 220, 34, W.hijauMuda, ["metode apa pun: hasil sama"], 10)),
    ),
  ],
};
