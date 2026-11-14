import type { AdeganStory, Obj } from "./logika-story";
import { PETAK_TAMU, W, emo, judul, kartu, kisi, kotak, panah, petakPenuh, poligon, sel, teks } from "./k5b5a-gambar";
import { bersih, k, tambah, ubah } from "./k5b5a-bantu";

/** Petak persegi panjang dengan garis kisi di atasnya. */
const larik = (id: string, x: number, y: number, kol: number, baris: number, s: number, warna: string): Obj[] => [...petakPenuh(id, x, y, kol, baris, s, warna), kisi(`${id}-ks`, x, y, kol, baris, s, W.biru, { tebal: 0.8 })];
const SU = 16;
const TX = 30;
const TY = 40;
const kerangka = (id: string, x: number, y: number, s: number): Obj[] => [poligon(`${id}-o`, x, y, [[0, 0], [s, 0], [s, s], [3 * s, s], [3 * s, 5 * s], [0, 5 * s]], "none", W.biru, { tebal: 2 }), kotak(`${id}-km`, x + s, y, 2 * s, s, W.pink, W.biru, { rx: 0, tebal: 1.2 })];
const barisTamu = (id: string, x: number, y: number, s: number, r: number, warna: string): Obj[] => PETAK_TAMU.filter(([, rr]) => rr === r).map(([c]) => sel(`${id}-${r}-${c}`, x + c * s, y + r * s, s, warna));

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Empat metode dari luar untuk memahami luas",
  sumber: "Metode luar: pembuka; contoh Buku Siswa hlm. 133–143",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Berapa banyak ubin untuk menutup lantai ruang tamu? Guru di berbagai negara punya cara berbeda untuk menjawabnya. Dalam video ini kita lihat empat metode dari luar.",
      tambah(0, judul("Empat metode dari luar")),
      tambah("lantai", ...kerangka("pb", 40, 44, 16), teks("pbt", 64, 142, "ruang tamu", 8.8, W.biru)),
      tambah("ubin", teks("pq", 190, 90, "berapa ubin?", 13, W.merah)),
      tambah("empat", emo("gl", 190, 140, "🌍", 34)),
    ),
    k(
      "Empat metode itu: Unit Square Covering, Array Model, Area Conservation yang di buku disebut cara Yohana, dan Grid Estimation of Partial Squares.",
      bersih(0),
      tambah(0, judul("Empat metode")),
      tambah("Unit", ...kartu("m1", 12, 34, 276, 30, W.hijauMuda, ["1. Unit Square Covering"], 9.4)),
      tambah("Array", ...kartu("m2", 12, 72, 276, 30, W.langit, ["2. Array Model"], 9.4)),
      tambah("Area", ...kartu("m3", 12, 110, 276, 30, W.krem, ["3. Area Conservation (cara Yohana)"], 9.4)),
      tambah("Grid", ...kartu("m4", 12, 148, 276, 30, W.pink, ["4. Grid Estimation of Partial Squares"], 9.4)),
    ),
    k(
      "Semua metode memegang satu gagasan dari buku: luas adalah banyaknya satuan luas yang menutup daerah dengan rapat, tanpa celah dan tanpa tumpang tindih.",
      bersih(0),
      tambah(0, judul("Satu gagasan yang sama")),
      tambah("satuan", ...petakPenuh("g", 90, 46, 4, 3, 30, W.emas), kisi("gk", 90, 46, 4, 3, 30, W.biru)),
      tambah("rapat,", teks("gt1", 150, 150, "tanpa celah", 10, W.hijau)),
      tambah("tumpang", teks("gt2", 150, 170, "tanpa tumpang tindih", 10, W.hijau)),
    ),
    k(
      "Kita memakai angka dari buku: ruang tamu, kamar tidur, dapur, kamar mandi, dan bangun A sampai G pada kertas berpetak.",
      bersih(0),
      tambah(0, judul("Angka dari buku")),
      tambah("ruang", ...kartu("a1", 14, 36, 128, 30, W.langit, ["ruang tamu 13 m²"], 9)),
      tambah("kamar", ...kartu("a2", 158, 36, 128, 30, W.hijauMuda, ["kamar tidur 9 m²"], 9)),
      tambah("dapur,", ...kartu("a3", 14, 76, 128, 30, W.krem, ["dapur 6 m²"], 9)),
      tambah("mandi,", ...kartu("a4", 158, 76, 128, 30, W.pink, ["kamar mandi 2 m²"], 9)),
      tambah("bangun", ...kartu("a5", 40, 116, 220, 30, W.jingga, ["bangun A sampai G"], 9.4)),
    ),
  ],
};

/* ------------------------------ 2. Unit Square Covering: konsep ------------------------------ */
export const ADEGAN_LUAR_USC: AdeganStory = {
  id: "luar-usc",
  judul: "Unit Square Covering: menutup dengan persegi satuan",
  sumber: "Metode luar: Unit Square Covering",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Metode pertama, Unit Square Covering, artinya menutup daerah dengan persegi satuan. Ambil satu persegi berukuran satu satuan, lalu tutupkan ke seluruh daerah.",
      tambah(0, judul("Unit Square Covering")),
      tambah("persegi", sel("us", 30, 70, 40, W.emas, { tebal: 2 }), teks("ust", 50, 130, "1 satuan luas", 8.6, W.biru)),
      tambah("tutupkan", panah("ua", 76, 90, 40, 0, W.biru, 2.4, { gambar: true })),
      tambah("seluruh", poligon("ud", 124, 56, [[0, 0], [150, 0], [150, 80], [0, 80]], W.langit, W.biru, { putus: true }), teks("udt", 199, 100, "daerah yang diukur", 9, W.biru)),
    ),
    k(
      "Aturannya ada dua. Petak harus rapat tanpa celah, dan petak tidak boleh bertumpuk. Kalau melanggar, hitungannya tidak bisa dipercaya.",
      bersih(0),
      tambah(0, judul("Dua aturan menutup")),
      tambah("rapat", ...[0, 1, 2].map((i) => sel(`ok${i}`, 26 + i * 22, 56, 22, W.emas)), teks("okt", 59, 100, "pas", 10, W.hijau), emo("oke", 59, 124, "✅", 18)),
      tambah("celah,", ...[0, 1, 2].map((i) => sel(`ce${i}`, 118 + i * 28, 56, 22, W.emas)), teks("cet", 160, 100, "ada celah", 10, W.merah), emo("cee", 160, 124, "❌", 18)),
      tambah("bertumpuk.", ...[0, 1, 2].map((i) => sel(`tu${i}`, 220 + i * 14, 56, 22, W.emas)), teks("tut", 245, 100, "bertumpuk", 10, W.merah), emo("tue", 245, 124, "❌", 18)),
    ),
    k(
      "Setelah tertutup rapat, luas sama dengan banyaknya petak. Enam petak berarti enam satuan luas. Tidak perlu menghafal apa pun.",
      bersih(0),
      tambah(0, judul("Banyak petak = luas")),
      tambah("tertutup", ...larik("t", 90, 50, 3, 2, 30, W.emas)),
      tambah("Enam", teks("tb", 150, 130, "6 petak", 13, W.biru)),
      tambah("berarti", teks("tl", 150, 156, "= 6 satuan luas", 13, W.hijau)),
    ),
    k(
      "Kelebihannya, anak kecil pun bisa memakainya tanpa hafalan. Kekurangannya, lama dan melelahkan kalau daerahnya sangat besar, seperti Alun-Alun Utara.",
      bersih(0),
      tambah(0, judul("Kelebihan dan kekurangan")),
      tambah("Kelebihannya,", ...kartu("kl", 14, 34, 130, 44, W.hijauMuda, ["mudah dan", "tanpa hafalan"], 9.2), emo("kle", 79, 100, "👍", 24)),
      tambah("Kekurangannya,", ...kartu("kk", 156, 34, 130, 44, W.merahMuda, ["lama kalau", "daerah besar"], 9.2)),
      tambah("Alun-Alun", kotak("al", 160, 92, 120, 58, W.krem, W.coklat, { rx: 2 }), kisi("alk", 160, 92, 20, 10, 6, W.abu, { tebal: 0.4 }), teks("alt", 220, 170, "Alun-Alun: berapa petak?", 8, W.coklat)),
    ),
  ],
};

/* ------------------------------ 3. Unit Square Covering: penerapan pada ruang tamu ------------------------------ */
const hitungan = (isi: string): Obj => teks("ct", 220, 100, isi, 18, W.merah);

export const ADEGAN_LUAR_USC_TERAPAN: AdeganStory = {
  id: "luar-usc-terapan",
  judul: "Unit Square Covering pada ruang tamu",
  sumber: "Metode luar: Unit Square Covering; contoh ruang tamu Buku Siswa hlm. 139–140",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Terapkan pada ruang tamu. Ukuran satu petak adalah satu meter kali satu meter, sama dengan satu ubin. Ruang tamu masih kosong, siap ditutup petak.",
      tambah(0, judul("Menutup ruang tamu")),
      tambah("Terapkan", ...kerangka("ut", TX, TY, SU), teks("utt", TX + 24, TY + 5 * SU + 14, "ruang tamu", 8.4, W.biru)),
      tambah("petak", sel("sp", 170, 56, SU, W.emas, { tebal: 1.6 }), teks("spt", 238, 68, "1 m × 1 m", 9, W.biru)),
      tambah("kosong,", ...kartu("tt", 150, 120, 138, 30, W.krem, ["total petak:"], 9), hitungan("0")),
    ),
    k(
      "Mulai dari baris atas. Baris pertama hanya satu petak, jadi total satu.",
      tambah("pertama", barisTamu("ut", TX, TY, SU, 0, W.emas)),
      ubah("total", { id: "ct", isi: "1" }),
    ),
    k(
      "Baris kedua tiga petak, total empat. Baris ketiga tiga petak, total tujuh.",
      tambah("kedua", barisTamu("ut", TX, TY, SU, 1, W.hijauMuda)),
      ubah("empat.", { id: "ct", isi: "4" }),
      tambah("ketiga", barisTamu("ut", TX, TY, SU, 2, W.langit)),
      ubah("tujuh.", { id: "ct", isi: "7" }),
    ),
    k(
      "Baris keempat, total sepuluh. Baris kelima, total tiga belas.",
      tambah("keempat,", barisTamu("ut", TX, TY, SU, 3, W.hijauMuda)),
      ubah("sepuluh.", { id: "ct", isi: "10" }),
      tambah("kelima,", barisTamu("ut", TX, TY, SU, 4, W.langit)),
      ubah("belas.", { id: "ct", isi: "13" }),
    ),
    k(
      "Tidak ada celah dan tidak ada yang bertumpuk. Jadi luas ruang tamu tiga belas satuan luas, sama persis dengan hitungan di buku.",
      tambah("celah", ...kartu("fk", 150, 160, 138, 34, W.hijauMuda, ["luas = 13 satuan luas"], 9.4)),
      tambah("sama", emo("fe", 100, 184, "✅", 18)),
    ),
  ],
};

/* ------------------------------ 4. Array Model: konsep ------------------------------ */
export const ADEGAN_LUAR_ARRAY: AdeganStory = {
  id: "luar-array",
  judul: "Array Model: baris dan kolom",
  sumber: "Metode luar: Array Model",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Metode kedua, Array Model, menyusun satuan luas dalam baris dan kolom yang rapi, seperti barisan kursi di aula sekolah.",
      tambah(0, judul("Array Model")),
      tambah("menyusun", ...larik("ar", 70, 50, 4, 3, 30, W.langit)),
      tambah("baris", teks("arb", 44, 66, "baris", 9, W.merah)),
      tambah("kolom", teks("ark", 130, 150, "kolom", 9, W.hijau)),
    ),
    k(
      "Tidak perlu menghitung satu per satu. Cukup kalikan banyak baris dengan banyak kolom. Tiga baris dan empat kolom menghasilkan dua belas petak.",
      ubah("Cukup", ...[0, 1, 2, 3].map((c) => ({ id: `ar-0-${c}`, warna: W.emas }))),
      tambah("Tiga", teks("a3", 220, 70, "3 baris", 11, W.merah)),
      tambah("empat", teks("a4", 220, 98, "4 kolom", 11, W.hijau)),
      tambah("menghasilkan", ...kartu("ah", 180, 120, 108, 28, W.krem, ["3 × 4 = 12"], 11)),
    ),
    k(
      "Syaratnya, daerahnya persegi panjang penuh. Kalau ada bagian yang menonjol, hitung dulu bagian persegi panjangnya, lalu tambahkan sisanya.",
      bersih(0),
      tambah(0, judul("Syarat Array Model")),
      tambah("persegi", ...[0, 1, 2, 3].flatMap((r) => [0, 1, 2].map((c) => sel(`sy-${r}-${c}`, 60 + c * 22, 44 + r * 22, 22, W.langit)))),
      tambah("menonjol,", sel("sy-t", 38, 44, 22, W.emas, { tebal: 1.6 }), teks("syt", 200, 60, "satu petak menonjol", 8.8, W.merah)),
      tambah("tambahkan", ...kartu("sk", 140, 100, 150, 40, W.krem, ["3 × 4 = 12", "ditambah 1 sisa"], 9.4)),
    ),
    k(
      "Keuntungannya, jauh lebih cepat dari menghitung satu per satu. Cocok untuk lantai, kebun, atau papan yang berbentuk persegi panjang.",
      bersih(0),
      tambah(0, judul("Cepat dan rapi")),
      tambah("satu", ...kartu("l1", 14, 40, 128, 50, W.merahMuda, ["menghitung satu", "per satu: 12 langkah"], 9)),
      tambah("Cocok", ...kartu("l2", 158, 40, 128, 50, W.hijauMuda, ["baris kali kolom:", "1 langkah"], 9)),
      tambah("lantai,", emo("e1", 60, 130, "🏠", 30), emo("e2", 150, 130, "🌱", 30), emo("e3", 240, 130, "📋", 30)),
    ),
  ],
};
