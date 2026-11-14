import type { AdeganStory } from "./logika-story";
import { W, emo, judul, kartu, labelSisi, penggaris, poligon, teks, titikSegitiga } from "./k5b4b-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k5b4b-bantu";

/** Panjang sisi hasil ukur (cm) segitiga sembarang pertama dan kedua (Panduan Guru hlm. 130–131). */
export const SEGITIGA_UKUR = { satu: { alas: 6, kanan: 3, kiri: 5 }, dua: { alas: 7, kanan: 4, kiri: 5 } };

/* ------------------------------ 3. Eksplorasi 4.2A: segitiga pertama, diukur sendiri (Buku Siswa hlm. 115; Panduan Guru hlm. 130 dan 131) ------------------------------ */
const T1 = titikSegitiga(6, 3, 5, 20);
const AX = 20;
const AY = 78;
const idKartu = (id: string, n: number): string[] => [`${id}-k`, ...Array.from({ length: n }, (_, i) => `${id}-t${i}`)];

export const ADEGAN_UKUR_SATU: AdeganStory = {
  id: "eks-a-ukur",
  judul: "Eksplorasi 4.2A: mengukur segitiga pertama",
  sumber: "Buku Siswa hlm. 115; Panduan Guru hlm. 130–131",
  latar: "#F0FDF4",
  kutipan: [
    "Eksplorasi 4.2A",
    "Ayo Menemukan",
    "Perhatikan bangun-bangun datar berikut. Coba, tentukan",
    "kelilingnya.",
    "kucoba mengukur",
    "menggunakan penggaris.",
    "Apakah sisi-sisinya sama panjang?",
    "Bangun apakah itu?",
    "Hitunglah kelilingnya.",
    "Keliling = 3 + 5 + 6 = 14",
    "Kelilingnya 14 cm.",
    "Segitiga sembarang",
    "Jika ada perbedaan hasil pengukuran panjang sisi-sisi segitiga oleh peserta didik, guru memeriksa cara mengukurnya,",
    "dan mengajak peserta didik menyepakati hasil pengukuran yang paling banyak diperoleh.",
  ],
  ketukan: [
    k(
      "Eksplorasi empat titik dua A, Ayo Menemukan. Perhatikan bangun-bangun datar berikut, lalu tentukan kelilingnya. Sisi segitiga pertama belum diberi angka, jadi kita ukur sendiri.",
      tambah(0, judul("Eksplorasi 4.2A: Ayo Menemukan")),
      tambah("Perhatikan", poligon("ta", AX, AY, T1, W.langit, W.biru, { tebal: 2.2 }), ...labelSisi("ta", AX, AY, T1, ["... cm", "... cm", "... cm"], 8.6, W.hitam, 15)),
      tambah("tentukan", ...kartu("tn", 172, 56, 112, 44, W.krem, ["tentukan", "kelilingnya"], 9.4)),
    ),
    k(
      "Aku coba mengukur menggunakan penggaris, kata anak di buku. Hasilnya tiga sentimeter, lima sentimeter, dan enam sentimeter.",
      tambah("mengukur", ...penggaris("pg", 172, 128, 6, 18)),
      ubah("tiga", { id: "ta-l1", isi: "3 cm", warna: W.merah }),
      ubah("lima", { id: "ta-l2", isi: "5 cm", warna: W.merah }),
      ubah("enam", { id: "ta-l0", isi: "6 cm", warna: W.merah }),
    ),
    k(
      "Apakah sisi-sisinya sama panjang? Tidak, ketiganya berbeda. Maka bangun ini adalah segitiga sembarang.",
      hapus(0, "pg-b", "pg-t"),
      tambah("Apakah", ...kartu("q1", 172, 34, 112, 40, W.langit, ["sisi sama panjang?"], 8.6)),
      tambah("Tidak,", ...kartu("q2", 172, 82, 112, 28, W.merahMuda, ["Tidak"], 9.4)),
      tambah("sembarang.", ...kartu("q3", 172, 118, 112, 32, W.hijauMuda, ["segitiga sembarang"], 8.8)),
    ),
    k(
      "Hitunglah kelilingnya. Jumlahkan ketiga sisi: tiga tambah lima tambah enam sama dengan empat belas.",
      hapus(0, ...idKartu("q1", 1), ...idKartu("q2", 1), ...idKartu("q3", 1), ...idKartu("tn", 2)),
      tambah("Hitunglah", ...kartu("hk", 164, 50, 128, 62, W.krem, ["Keliling"], 9.4)),
      tambah("enam", teks("hs", 228, 98, "3 + 5 + 6 = 14", 10.5, W.merah)),
    ),
    k(
      "Kelilingnya empat belas sentimeter. Kalau hasil ukur antaranak berbeda, guru memeriksa cara mengukurnya, lalu mengajak kelas menyepakati hasil yang paling banyak diperoleh.",
      ubah("Kelilingnya", { id: "ta", warna: W.hijauMuda }),
      tambah("sentimeter.", teks("kl", 228, 140, "keliling = 14 cm", 9.4, W.hijau)),
      tambah("berbeda,", emo("bg", 40, 186, "🤔", 20)),
      tambah("menyepakati", teks("sp", 160, 190, "sepakati hasil yang paling banyak", 8.4, W.coklat)),
    ),
  ],
};

/* ------------------------------ 4. Eksplorasi 4.2A: segitiga kedua (Buku Siswa hlm. 115; Panduan Guru hlm. 131; Tabel 4.4) ------------------------------ */
const T2 = titikSegitiga(7, 4, 5, 18);

export const ADEGAN_UKUR_DUA: AdeganStory = {
  id: "eks-a-dua",
  judul: "Eksplorasi 4.2A: segitiga kedua dan Tabel 4.4",
  sumber: "Buku Siswa hlm. 115; Panduan Guru hlm. 130–131",
  latar: "#F0FDF4",
  kutipan: [
    "Perhatikan panjang sisi-sisi bangun di",
    "samping. Bangun apakah itu?",
    "Segitiga sembarang",
    "Keliling = 7 + 4 + 5 = 16",
    "Kelilingnya 16 cm.",
    "Sepertinya sama dengan",
    "bangun sebelumnya.",
    "Tabel 4.4 Peran Guru dan Prediksi Respons Peserta Didik pada Eksplorasi 4.2A",
    "Guru menampilkan",
    "gambar segitiga di depan",
    "kelas dan meminta peserta",
    "didik mengamati gambar",
    "tersebut di buku siswa, lalu",
    "menanyakan jenis segitiga",
    "tersebut.",
    "Guru meminta peserta",
    "didik menghitung keliling",
    "segitiga jika panjang sisi-",
    "sisinya telah diketahui.",
    "Guru mengarahkan",
    "peserta didik untuk",
    "menyimpulkan cara",
    "menghitung keliling",
    "segitiga sembarang.",
  ],
  ketukan: [
    k(
      "Segitiga kedua sudah diberi ukuran: lima, empat, dan tujuh sentimeter. Bangun apakah itu? Tidak ada sisi yang sama panjang, jadi ini juga segitiga sembarang.",
      tambah(0, judul("Segitiga kedua")),
      tambah("Segitiga", poligon("tb", 20, 74, T2, W.krem, W.biru, { tebal: 2.2 })),
      tambah("lima,", ...labelSisi("tb", 20, 74, T2, ["", "", "5 cm"], 8.6, W.merah, 15)),
      tambah("empat,", ...labelSisi("tb", 20, 74, T2, ["", "4 cm", ""], 8.6, W.merah, 15)),
      tambah("tujuh", ...labelSisi("tb", 20, 74, T2, ["7 cm", "", ""], 8.6, W.merah, 15)),
      tambah("Bangun", ...kartu("b1", 172, 50, 114, 40, W.langit, ["bangun apakah itu?"], 8.6)),
      tambah("sembarang.", ...kartu("b2", 172, 100, 114, 32, W.hijauMuda, ["segitiga sembarang"], 8.8)),
    ),
    k(
      "Hitung kelilingnya. Tujuh tambah empat tambah lima sama dengan enam belas. Jadi kelilingnya enam belas sentimeter.",
      hapus(0, "b1-k", "b1-t0", "b2-k", "b2-t0"),
      tambah("Tujuh", teks("hs", 228, 80, "7 + 4 + 5 = 16", 11, W.merah)),
      tambah("kelilingnya@2", teks("kl", 228, 112, "keliling = 16 cm", 9.4, W.hijau)),
      ubah("kelilingnya@2", { id: "tb", warna: W.hijauMuda }),
    ),
    k(
      "Seorang anak di buku berkata, sepertinya sama dengan bangun sebelumnya. Memang sama caranya: dua-duanya tinggal menjumlahkan tiga sisi.",
      bersih(0),
      tambah(0, judul("Dua segitiga, satu cara")),
      tambah("Seorang", poligon("s1", 20, 64, titikSegitiga(6, 3, 5, 12), W.langit), poligon("s2", 158, 58, titikSegitiga(7, 4, 5, 12), W.krem)),
      tambah("sebelumnya.", teks("r1", 56, 122, "3 + 5 + 6 = 14", 9.4, W.merah), teks("r2", 200, 122, "7 + 4 + 5 = 16", 9.4, W.merah)),
      tambah("menjumlahkan", ...kartu("cr", 50, 146, 200, 34, W.hijauMuda, ["sama caranya: jumlahkan 3 sisi"], 8.8)),
    ),
    k(
      "Alur Tabel empat titik empat di Panduan Guru: guru menampilkan gambar dan menanyakan jenis segitiga, peserta didik mengukur sisi, lalu menghitung keliling, dan terakhir bersama-sama menyimpulkan.",
      bersih(0),
      tambah(0, judul("Alur Tabel 4.4")),
      tambah("menampilkan", ...kartu("f1", 30, 30, 240, 32, W.langit, ["1. tampilkan gambar, tanya jenis"], 8.8)),
      tambah("mengukur", ...kartu("f2", 30, 68, 240, 32, W.hijauMuda, ["2. ukur sisi-sisinya"], 8.8)),
      tambah("menghitung", ...kartu("f3", 30, 106, 240, 32, W.krem, ["3. hitung keliling"], 8.8)),
      tambah("menyimpulkan.", ...kartu("f4", 30, 144, 240, 32, W.pink, ["4. simpulkan cara menghitung"], 8.8)),
    ),
  ],
};

/* ------------------------------ 5. Eksplorasi 4.2A: menggeneralisasi (Buku Siswa hlm. 115; Panduan Guru hlm. 131 dan 132) ------------------------------ */
const T3 = titikSegitiga(6, 3, 5, 20);
const GX = 100;
const GY = 56;

export const ADEGAN_UMUM_SEMBARANG: AdeganStory = {
  id: "eks-a-umum",
  judul: "Eksplorasi 4.2A: rumus keliling segitiga sembarang",
  sumber: "Buku Siswa hlm. 115; Panduan Guru hlm. 131–132",
  latar: "#F0FDF4",
  kutipan: [
    "Perhatikan sisi-sisi bangun di samping.",
    "Jika panjang sisi-sisinya ditulis",
    "panjang sisi 1, panjang sisi 2, dan panjang sisi 3,",
    "bagaimana cara menghitung kelilingnya?",
    "Apakah dengan menjumlahkan panjang sisi-sisinya?",
    "Keliling = panjang sisi 1 + panjang sisi 2 + panjang sisi 3",
    "Jika peserta didik kebingungan karena belum mengenal variabel,",
    "guru menjajarkan gambar",
    "3 segitiga sembarang",
    "yang dihitung kelilingnya",
    "oleh peserta didik, lalu",
    "menunjukkan pola",
    "hitungannya di papan tulis.",
    "Pada segitiga sembarang, keliling dihitung dengan cara",
    "menjumlahkan ketiga panjang sisinya.",
    "Keliling = panjang sisi ke-1 + panjang sisi ke-2 + panjang sisi ke-3",
    "Jika peserta didik keliru",
    "menyimpulkan, guru",
    "mengoreksinya.",
  ],
  ketukan: [
    k(
      "Sekarang segitiga ketiga tanpa angka. Sisinya ditulis panjang sisi satu, panjang sisi dua, dan panjang sisi tiga. Bagaimana cara menghitung kelilingnya?",
      tambah(0, judul("Segitiga tanpa angka")),
      tambah("Sekarang", poligon("tc", GX, GY, T3, W.langit, W.biru, { tebal: 2.2 })),
      tambah("satu,", ...labelSisi("tc", GX, GY, T3, ["", "", "sisi 1"], 8.6, W.merah, 22)),
      tambah("dua,", ...labelSisi("tc", GX, GY, T3, ["sisi 2", "", ""], 8.6, W.merah, 22)),
      tambah(16, ...labelSisi("tc", GX, GY, T3, ["", "sisi 3", ""], 8.6, W.merah, 22)),
      tambah("Bagaimana", ...kartu("kq", 70, 150, 160, 30, W.krem, ["Keliling = ... + ... + ..."], 9)),
    ),
    k(
      "Apakah dengan menjumlahkan panjang sisi-sisinya? Ya. Keliling sama dengan panjang sisi satu, ditambah panjang sisi dua, ditambah panjang sisi tiga.",
      hapus(0, ...idKartu("kq", 1)),
      ubah("menjumlahkan", { id: "tc", warna: W.emas }),
      tambah("Keliling", kotak3("fm", 30, 142, 240, 54), teks("fm1", 150, 160, "Keliling = panjang sisi 1", 8.6, W.biru)),
      tambah("dua,", teks("fm2", 150, 173, "+ panjang sisi 2", 8.6, W.biru)),
      tambah("tiga.", teks("fm3", 150, 186, "+ panjang sisi 3", 8.6, W.biru)),
    ),
    k(
      "Kalau peserta didik kebingungan karena belum mengenal variabel, guru menjajarkan gambar tiga segitiga sembarang yang sudah dihitung, lalu menunjukkan pola hitungannya di papan tulis.",
      bersih(0),
      tambah(0, judul("Menjajarkan tiga segitiga")),
      tambah("menjajarkan", poligon("j1", 14, 56, titikSegitiga(6, 3, 5, 12), W.langit), poligon("j2", 108, 52, titikSegitiga(7, 4, 5, 12), W.krem), poligon("j3", 214, 56, titikSegitiga(6, 3, 5, 12), W.hijauMuda)),
      tambah("dihitung,", teks("h1", 50, 112, "3 + 5 + 6 = 14", 8.6, W.merah), teks("h2", 150, 112, "7 + 4 + 5 = 16", 8.6, W.merah)),
      tambah("pola", teks("h3", 250, 112, "sisi + sisi + sisi", 8, W.merah)),
      tambah("papan", ...kartu("pl", 50, 138, 200, 34, W.hijauMuda, ["pola: jumlahkan ketiga sisi"], 8.8)),
    ),
    k(
      "Kesimpulan dalam Panduan Guru: pada segitiga sembarang, keliling dihitung dengan cara menjumlahkan ketiga panjang sisinya. Kalau murid keliru menyimpulkan, guru mengoreksinya.",
      bersih(0),
      tambah(0, judul("Kesimpulan segitiga sembarang")),
      tambah("menjumlahkan", ...kartu("ks", 20, 34, 260, 50, W.krem, ["Keliling = sisi 1 + sisi 2 + sisi 3"], 10.5)),
      tambah("ketiga", poligon("tk", 108, 104, titikSegitiga(6, 3, 5, 14), W.langit)),
      tambah("keliru", emo("kw", 250, 130, "⚠", 24)),
      tambah("mengoreksinya.", teks("gk", 150, 178, "guru mengoreksi bila keliru", 8.6, W.merah)),
    ),
  ],
};

/** Kotak latar kecil untuk rumus. */
function kotak3(id: string, x: number, y: number, w: number, h: number) {
  return kartu(id, x, y, w, h, W.krem, [], 8.6)[0];
}
