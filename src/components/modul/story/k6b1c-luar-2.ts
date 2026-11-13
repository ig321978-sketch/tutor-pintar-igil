import type { AdeganStory } from "./logika-story";
import { W, arsir, barisTabel, kartu, kisi, kotak, panah, pecahan, tabel, teks } from "./k6b1c-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k6b1c-bantu";

/** Kisi 10 x 10 kecil dengan `kolom` kolom penuh dan `lepas` petak lepas pada kolom berikutnya. */
function kisiNilai(id: string, x: number, y: number, s: number, kolom: number, lepas: number) {
  const out = [...kisi(`${id}-g`, x, y, s, 10, 10)];
  if (kolom > 0) out.push(arsir(`${id}-a`, x, y, s, 10, 10, 0, 0, kolom, 10));
  if (lepas > 0) out.push(arsir(`${id}-b`, x, y, s, 10, 10, kolom, 0, 1, lepas, W.arsir2));
  return out;
}

/* ------------------------------ 1. Grid Tenths-Hundredths Link: konsep ------------------------------ */
export const ADEGAN_LUAR_C_KISI: AdeganStory = {
  id: "luarc-kisi",
  judul: "Grid Tenths-Hundredths Link: kisi seratus petak",
  sumber: "Metode luar · Grid Tenths-Hundredths Link",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Grid Tenths-Hundredths Link memakai persegi 10 kali 10 yang bernilai 1. Ada 100 petak, sehingga satu petak bernilai satu per seratus, yaitu 0,01.",
      tambah(0, teks("jud", 150, 22, "Persegi bernilai 1", 12, W.ungu)),
      tambah("persegi", kisi("g", 20, 34, 130, 10, 10)),
      tambah("100", teks("sk", 85, 190, "10 x 10 = 100 petak", 9)),
      tambah("petak,", arsir("pt", 20, 34, 130, 10, 10, 0, 0, 1, 1, W.merah)),
      tambah("satu", pecahan("pk", 214, 76, "1", "100", 18), teks("pk2", 214, 126, "= 0,01", 20, W.merah)),
    ),
    k(
      "Satu kolom berisi 10 petak. Jadi satu kolom bernilai 10 per 100, yaitu satu per sepuluh, atau 0,1.",
      ubah(0, { id: "pt", op: 0 }),
      hapus(0, "pk-a", "pk-g", "pk-b", "pk2"),
      tambah("kolom", arsir("kl", 20, 34, 130, 10, 10, 0, 0, 1, 10)),
      tambah("Jadi", pecahan("kk", 214, 76, "10", "100", 18), teks("kk2", 214, 126, "= 0,1", 20, W.hijau)),
    ),
    k(
      "Bilangan desimal dua angka dibaca sebagai petak. Angka pertama menghitung kolom penuh, dan angka kedua menghitung petak lepas.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Dua angka di belakang koma", 12, W.ungu)),
      tambah("pertama", kartu("a1", 20, 50, 120, 50, W.krem, ["angka pertama", "kolom penuh"], 9.4)),
      tambah("kedua", kartu("a2", 160, 50, 120, 50, W.langit, ["angka kedua", "petak lepas"], 9.4)),
    ),
    k(
      "Contoh 0,37: tiga kolom penuh dan tujuh petak lepas. Jumlahnya 37 petak dari 100, jadi 0,37 sama dengan 37 per 100.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "0,37 pada kisi", 12, W.ungu)),
      tambah("Contoh", ...kisiNilai("c", 20, 34, 130, 0, 0)),
      tambah("tiga", arsir("c3", 20, 34, 130, 10, 10, 0, 0, 3, 10)),
      tambah("tujuh", arsir("c7", 20, 34, 130, 10, 10, 3, 0, 1, 7, W.arsir2)),
      tambah("Jumlahnya", pecahan("c37", 214, 80, "37", "100", 20, W.hijau), teks("c37t", 214, 134, "= 0,37", 20, W.hijau)),
    ),
    k(
      "Angka 0 pada 0,30 berarti nol petak lepas. Hanya tiga kolom penuh yang diarsir, sehingga 0,3 sama dengan 0,30.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "0,3 sama dengan 0,30", 12, W.ungu)),
      tambah("Angka", ...kisiNilai("d", 20, 34, 130, 3, 0)),
      tambah("tiga", teks("d0", 214, 70, "0,30", 22, W.hijau)),
      tambah("sama", teks("d1", 214, 110, "= 0,3", 22, W.hijau), teks("d2", 214, 140, "luas arsiran sama", 8.6, W.merah)),
    ),
  ],
};

/* ------------------------------ 2. Grid Tenths-Hundredths Link: penerapan ------------------------------ */
export const ADEGAN_LUAR_C_KISI_TERAPAN: AdeganStory = {
  id: "luarc-kisi-terapan",
  judul: "Grid Tenths-Hundredths Link: penerapan",
  sumber: "Metode luar · penerapan pada 0,25 dan pecahan buku",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Terapan pada 0,25 dari Mengingat Kembali: dua kolom penuh dan lima petak lepas.",
      tambah(0, teks("jud", 150, 22, "0,25", 14, W.ungu)),
      tambah("dua", ...kisiNilai("p", 20, 34, 130, 2, 0)),
      tambah("lima", arsir("p5", 20, 34, 130, 10, 10, 2, 0, 1, 5, W.arsir2)),
    ),
    k(
      "Totalnya 25 petak dari 100, jadi 0,25 sama dengan 25 per 100, yang disederhanakan menjadi satu per empat.",
      tambah("Totalnya", pecahan("q1", 214, 76, "25", "100", 20, W.hijau), teks("q1t", 214, 126, "= 1/4", 20, W.hijau)),
    ),
    k(
      "Tiga perempat dari Latihan 1.3 berarti 75 petak: tujuh kolom penuh dan lima petak lepas. Jadi nilainya 0,75.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Latihan 1.3: 3/4 pada kisi", 12, W.ungu)),
      tambah("Tiga", ...kisiNilai("r", 20, 34, 130, 7, 5)),
      tambah("tujuh", pecahan("r1", 214, 80, "75", "100", 20, W.hijau), teks("r1t", 214, 134, "= 0,75", 20, W.hijau)),
    ),
    k(
      "Setengah menutup lima kolom penuh dan nol petak lepas, jadi 0,50. Seperlima menutup dua kolom penuh, jadi 0,20.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "1/2 dan 1/5", 14, W.ungu)),
      tambah("Setengah", ...kisiNilai("s", 14, 40, 124, 5, 0), teks("st", 76, 178, "1/2 = 0,50", 12, W.hijau)),
      tambah("Seperlima", ...kisiNilai("u", 162, 40, 124, 2, 0), teks("ut", 224, 178, "1/5 = 0,20", 12, W.hijau)),
    ),
  ],
};

/* ------------------------------ 3. Decimal Place-Value Chart: konsep ------------------------------ */
const KOL = [56, 56, 22, 76, 76];
export const ADEGAN_LUAR_C_TEMPAT: AdeganStory = {
  id: "luarc-tempat",
  judul: "Decimal Place-Value Chart: tabel nilai tempat",
  sumber: "Metode luar · Decimal Place-Value Chart",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Decimal Place-Value Chart adalah tabel kolom: puluhan, satuan, koma, persepuluhan, dan perseratusan. Tiap angka menempati tepat satu kolom.",
      tambah(0, teks("jud", 150, 22, "Tabel nilai tempat", 12, W.ungu)),
      tambah("puluhan", ...tabel("t", 10, 40, KOL, 28, [["Puluhan", "Satuan", ",", "Persepuluhan", "Perseratusan"]], 6.6)),
      tambah("koma", teks("tk", 150, 100, "koma memisahkan asli dan desimal", 9, W.merah)),
    ),
    k(
      "Tulis bilangannya angka demi angka dari kiri ke kanan. Kolom yang tidak terisi diisi nol, supaya angka tidak tertukar kolomnya.",
      tambah("Tulis", ...barisTabel("w", 10, 68, KOL, 28, ["0", "2", ",", "4", "9"], 11)),
      tambah("nol,", teks("tw", 150, 128, "kolom kosong diisi 0", 10, W.merah)),
    ),
    k(
      "Nilai sebuah angka adalah angka itu kali nilai kolomnya. Pada 2,49: angka 2 bernilai 2, angka 4 bernilai 0,4, dan angka 9 bernilai 0,09.",
      tambah("Pada", teks("v0", 150, 194, "2,49", 14, W.ungu)),
      sorotkan("angka@3", "w-s1"),
      tambah("bernilai@1", teks("v1", 66, 160, "2", 14, W.hijau)),
      sorotkan("angka@4", "w-s3"),
      tambah("bernilai@2", teks("v2", 168, 160, "0,4", 14, W.hijau)),
      sorotkan("angka@5", "w-s4"),
      tambah("bernilai@3", teks("v3", 248, 160, "0,09", 14, W.hijau)),
    ),
    k(
      "Jadi 2,49 sama dengan 2 ditambah 0,4 ditambah 0,09. Bentuk panjang ini mencegah kolom tertukar.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Bentuk panjang", 13, W.ungu)),
      tambah("Jadi", teks("bp", 150, 90, "2,49 = 2 + 0,4 + 0,09", 16, W.hijau)),
      tambah("Bentuk", teks("bp2", 150, 130, "jumlah nilai tiap kolom", 10)),
    ),
  ],
};

/* ------------------------------ 4. Decimal Place-Value Chart: penerapan ------------------------------ */
export const ADEGAN_LUAR_C_TEMPAT_TERAPAN: AdeganStory = {
  id: "luarc-tempat-terapan",
  judul: "Decimal Place-Value Chart: penerapan",
  sumber: "Metode luar · penerapan pada jarak dan nilai gizi",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Terapan pada jarak Eksplorasi 1.6. Jarak 10,9 punya puluhan 1, satuan 0, dan persepuluhan 9.",
      tambah(0, teks("jud", 150, 22, "Eksplorasi 1.6: 10,9 dan 11,3", 12, W.ungu)),
      tambah("Terapan", ...tabel("t", 10, 40, KOL, 28, [["Puluhan", "Satuan", ",", "Persepuluhan", "Perseratusan"]], 6.6)),
      tambah("10,9", ...barisTabel("a", 10, 68, KOL, 28, ["1", "0", ",", "9", "0"], 11)),
    ),
    k(
      "Bentuk panjangnya, 10,9 sama dengan 10 ditambah 0 ditambah 0,9. Jarak 11,3 puluhan 1, satuan 1, persepuluhan 3.",
      tambah("Bentuk", teks("b1", 150, 126, "10,9 = 10 + 0 + 0,9", 12, W.hijau)),
      tambah("11,3", ...barisTabel("b", 10, 140, KOL, 28, ["1", "1", ",", "3", "0"], 11)),
    ),
    k(
      "Sama-sama punya puluhan 1, jadi bandingkan satuan. Satuan 0 lebih kecil dari 1, maka 10,9 lebih dekat daripada 11,3.",
      sorotkan("satuan", "a-s1", "b-s1"),
      tambah("lebih", teks("b2", 150, 196, "10,9 lebih dekat dari 11,3", 11, W.merah)),
    ),
    k(
      "Pada nilai gizi, karbohidrat 28,6 gram: puluhan 2, satuan 8, persepuluhan 6. Dibaca dua puluh delapan koma enam.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Karbohidrat 28,6 g", 12, W.ungu)),
      tambah("gram", ...tabel("t", 10, 40, KOL, 28, [["Puluhan", "Satuan", ",", "Persepuluhan", "Perseratusan"]], 6.6)),
      tambah("puluhan", ...barisTabel("c", 10, 68, KOL, 28, ["2", "8", ",", "6", "0"], 11)),
      tambah("Dibaca", teks("c1", 150, 130, "28,6 = 20 + 8 + 0,6", 14, W.hijau)),
    ),
  ],
};

/* ------------------------------ 5. Decimal Compare-and-Order: konsep ------------------------------ */
export const ADEGAN_LUAR_C_URUT: AdeganStory = {
  id: "luarc-urut",
  judul: "Decimal Compare-and-Order: samakan, bandingkan, urutkan",
  sumber: "Metode luar · Decimal Compare-and-Order",
  latar: "#FDF2F8",
  ketukan: [
    k(
      "Decimal Compare-and-Order punya tiga langkah. Pertama, samakan banyak angka di belakang koma dengan menambah nol di kanan.",
      tambah(0, teks("jud", 150, 22, "Langkah 1: samakan", 13, W.ungu)),
      tambah("Pertama", teks("s1", 80, 80, "2,9", 24)),
      tambah("menambah", teks("s2", 150, 80, "→", 22, W.merah), teks("s3", 220, 80, "2,90", 24, W.hijau)),
    ),
    k(
      "Nol di kanan tidak mengubah nilai, jadi 2,9 sama dengan 2,90. Tetapi nol di sebelah kiri angka mengubah nilai, seperti 0,05 dan 0,5.",
      tambah("Tetapi", teks("s4", 150, 130, "0,05 tidak sama dengan 0,5", 12, W.merah)),
    ),
    k(
      "Kedua, bandingkan dari kiri ke kanan. Berhenti di kolom pertama yang angkanya berbeda. Angka yang lebih besar menang.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Langkah 2: bandingkan dari kiri", 12, W.ungu)),
      tambah("kiri", panah("ap", 40, 80, 220, 0, W.biru, 2.5, { gambar: true })),
      tambah("Berhenti", teks("b1", 150, 120, "berhenti di angka pertama yang beda", 10, W.merah)),
      tambah("menang", teks("b2", 150, 150, "angka besar menang", 12, W.hijau)),
    ),
    k(
      "Ketiga, untuk mengurutkan, cari yang terkecil dan taruh paling kiri. Lalu cari yang terkecil dari sisanya, dan ulangi sampai habis.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Langkah 3: urutkan", 13, W.ungu)),
      tambah("Ketiga", kartu("u1", 30, 44, 240, 36, W.krem, ["cari terkecil, taruh di kiri"], 9.4)),
      tambah("Lalu", kartu("u2", 30, 92, 240, 36, W.mint, ["ulangi dengan sisanya"], 9.4)),
      tambah("habis", kartu("u3", 30, 140, 240, 36, W.langit, ["sampai semua terurut"], 9.4)),
    ),
    k(
      "Syarat tambahan: satuan ukuran harus sama dulu, misalnya miligram diubah ke gram sebelum membandingkan.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Satuan harus sama", 13, W.ungu)),
      tambah("miligram", kartu("mg", 30, 50, 100, 40, "#FEE2E2", ["miligram"], 11), kartu("gm", 170, 50, 100, 40, W.mint, ["gram"], 11)),
      tambah("diubah", panah("pm", 134, 70, 32, 0, W.hijau, 2.5, { gambar: true })),
    ),
  ],
};

/* ------------------------------ 6. Decimal Compare-and-Order: penerapan ------------------------------ */
export const ADEGAN_LUAR_C_URUT_TERAPAN: AdeganStory = {
  id: "luarc-urut-terapan",
  judul: "Decimal Compare-and-Order: penerapan",
  sumber: "Metode luar · penerapan pada 2,49 dan 2,9, lompat jauh, nilai gizi",
  latar: "#FDF2F8",
  ketukan: [
    k(
      "Terapan pada klaim 2,49 dan 2,9. Samakan jadi 2,49 dan 2,90. Satuannya sama, yaitu 2. Persepuluhan 4 lebih kecil dari 9, jadi 2,49 lebih kecil.",
      tambah(0, teks("jud", 150, 22, "2,49 dan 2,9", 14, W.ungu)),
      tambah("Samakan", teks("a1", 90, 70, "2,49", 24), teks("a2", 210, 70, "2,90", 24, W.hijau)),
      tambah("Persepuluhan", teks("a3", 150, 120, "4 lebih kecil dari 9", 13, W.merah)),
      tambah("kecil.", teks("a4", 150, 160, "2,49 lebih kecil", 16, W.hijau)),
    ),
    k(
      "Lompat jauh: 3,7, 2,9, dan 3,6, semuanya satu angka di belakang koma. Satuan 2 paling kecil. Lalu 6 lebih kecil dari 7. Urutan terkecil: 2,9, 3,6, 3,7.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Lompat jauh (meter)", 12, W.ungu)),
      tambah("3,7", teks("l1", 60, 70, "3,7", 20), teks("l2", 150, 70, "2,9", 20), teks("l3", 240, 70, "3,6", 20)),
      tambah("Urutan", teks("l4", 60, 140, "2,9", 20, W.hijau), teks("l5", 150, 140, "3,6", 20, W.hijau), teks("l6", 240, 140, "3,7", 20, W.hijau), teks("l7", 150, 170, "terkecil ke terbesar", 9)),
    ),
    k(
      "Nilai gizi: ubah 88,6 miligram menjadi 0,0886 gram, lalu samakan menjadi empat angka di belakang koma: 0,0886, 1,3000, 2,7000, 5,4000, dan 28,6000.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Nilai gizi, semua dalam gram", 12, W.ungu)),
      tambah("88,6", teks("zm", 150, 168, "88,6 mg = 0,0886 g", 11, W.merah)),
      tambah("ubah", ...barisTabel("z1", 60, 40, [110, 80], 22, ["natrium", "0,0886"], 9.4)),
      tambah("samakan", ...barisTabel("z2", 60, 62, [110, 80], 22, ["protein", "1,3000"], 9.4)),
      tambah("2,7000,", ...barisTabel("z3", 60, 84, [110, 80], 22, ["serat pangan", "2,7000"], 9.4)),
      tambah("5,4000,", ...barisTabel("z4", 60, 106, [110, 80], 22, ["lemak total", "5,4000"], 9.4)),
      tambah("28,6000", ...barisTabel("z5", 60, 128, [110, 80], 22, ["karbohidrat", "28,6000"], 9.4)),
    ),
    k(
      "Terkecil adalah 0,0886 milik natrium, lalu 1,3 protein, 2,7 serat pangan, 5,4 lemak total, dan 28,6 karbohidrat. Hasilnya sama dengan kunci Panduan Guru.",
      sorotkan("natrium", "z1-s0", "z1-s1"),
      sorotkan("karbohidrat", "z5-s0", "z5-s1"),
      tambah("Hasilnya", teks("zk", 150, 190, "urutan sama dengan kunci buku", 10, W.hijau)),
    ),
  ],
};

/* ------------------------------ 7. Ringkasan empat metode ------------------------------ */
const kartuRingkas = (id: string, y: number, nama: string, isi: string, warna: string) => [kotak(`${id}-k`, 14, y, 272, 38, warna, W.biru, { rx: 8 }), teks(`${id}-n`, 150, y + 15, nama, 8.4, W.ungu), teks(`${id}-i`, 150, y + 29, isi, 8.4)];

export const ADEGAN_LUAR_C_RINGKAS: AdeganStory = {
  id: "luarc-ringkas",
  judul: "Ringkasan empat metode luar",
  sumber: "Ringkasan metode luar",
  latar: "#F5F3FF",
  ketukan: [
    k(
      "Ringkasan. Equivalent Fraction to Tenths and Hundredths: cari pengali supaya penyebut menjadi 10 atau 100, lalu baca hasilnya sebagai desimal.",
      tambah(0, teks("jud", 150, 20, "Ringkasan empat metode", 12, W.ungu)),
      tambah("Equivalent", ...kartuRingkas("r1", 30, "Equivalent Fraction to Tenths and Hundredths", "penyebut jadi 10 atau 100", W.krem)),
    ),
    k(
      "Grid Tenths-Hundredths Link: satu kolom bernilai 0,1 dan satu petak bernilai 0,01, jadi angka desimal bisa dihitung sebagai petak.",
      tambah("Grid", ...kartuRingkas("r2", 74, "Grid Tenths-Hundredths Link", "kolom 0,1 dan petak 0,01", W.mint)),
    ),
    k(
      "Decimal Place-Value Chart: taruh tiap angka pada kolomnya dan jumlahkan nilai tiap kolom.",
      tambah("Decimal", ...kartuRingkas("r3", 118, "Decimal Place-Value Chart", "angka di kolom, jumlahkan nilainya", W.langit)),
    ),
    k(
      "Decimal Compare-and-Order: samakan angka di belakang koma, bandingkan dari kiri, lalu urutkan dari yang terkecil, dengan satuan ukuran yang sama.",
      tambah("Compare-and-Order:", ...kartuRingkas("r4", 162, "Decimal Compare-and-Order", "samakan, bandingkan, urutkan", W.mawar)),
    ),
  ],
};
