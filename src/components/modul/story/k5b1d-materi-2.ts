import type { AdeganStory } from "./logika-story";
import { W, emo, garis, judul, kartu, kotak, panah, tabel, teks } from "./k5b1d-gambar";
import { bersih, k, tambah, ubah } from "./k5b1d-bantu";

/* ------------------------------ 5. Eksplorasi 1.5 dan 1.6, Permasalahan 1: angpau (Buku Siswa hlm. 21 sampai 23) ------------------------------ */
export const ADEGAN_ANGPAU_1: AdeganStory = {
  id: "angpau-1",
  judul: "Eksplorasi 1.5 dan 1.6, Permasalahan 1: dua belas angpau",
  sumber: "Buku Siswa hlm. 21–23",
  latar: "#FEF2F2",
  kutipan: [
    "Ayo Berpikir Kreatif",
    "Adakah cara lain untuk menyelesaikan hitungan pada kegiatan Ayo Berlatih?",
    "Jika ada, bagaimana caranya? Tuliskan dalam buku tulismu.",
    "Perkalian dan Pembagian Bilangan Cacah Sampai 100.000",
    "Eksplorasi 1.5",
    "Yohana siswa keturunan Tionghoa.",
    "yaitu amplop yang berisi uang.",
    "Pada Imlek tahun ini, Yohana mendapat 12 angpau yang setiap amplopnya berisi Rp5.000,00.",
    "Berapakah jumlah uang yang diperoleh Yohana?",
    "Eksplorasi 1.6",
    "Memisahkan angka dari pengali pada nilai tempat",
    "2 × 5.000 = 10.000",
    "10 × 5.000 = 50.000",
    "60.000",
    "Cara 2. Cara bersusun",
    "Jadi, uang yang diperoleh Yohana adalah",
  ],
  ketukan: [
    k(
      "Ayo Berpikir Kreatif: adakah cara lain untuk hitungan Ayo Berlatih? Tuliskan di buku tulis. Lalu kita beralih ke perkalian dan pembagian.",
      tambah(0, judul("Ayo Berpikir Kreatif"), emo("bk", 150, 64, "💡", 30)),
      tambah("Tuliskan", ...kartu("kc", 30, 80, 240, 34, W.krem, ["cara lain? tulis di buku tulis"], 9.4)),
      tambah("beralih", ...kartu("kd", 30, 130, 240, 34, W.langit, ["berikutnya: perkalian dan pembagian"], 9.4)),
    ),
    k(
      "Eksplorasi satu titik lima. Yohana keturunan Tionghoa, dan tiap Imlek ia mendapat angpau, amplop berisi uang. Tahun ini dua belas angpau, tiap amplop lima ribu rupiah. Berapa jumlah uangnya?",
      bersih(0),
      tambah(0, judul("Eksplorasi 1.5: angpau")),
      tambah("amplop@1", emo("ap", 56, 96, "🧧", 40)),
      tambah("belas", ...kartu("a1", 110, 50, 170, 34, W.merahMuda, ["12 angpau"], 11)),
      tambah("ribu", ...kartu("a2", 110, 94, 170, 34, W.krem, ["Rp5.000 tiap amplop"], 10.4)),
      tambah("Berapa", teks("a3", 150, 168, "jumlah uang = ?", 13, W.merah)),
    ),
    k(
      "Kalimat matematikanya: dua belas kali lima ribu. Cara satu memisahkan pengali menurut nilai tempat: dua belas sama dengan dua ditambah sepuluh.",
      bersih(0),
      tambah(0, judul("Cara 1: pisahkan pengali"), teks("kl", 150, 54, "12 × 5.000 = ?", 16, W.hitam)),
      tambah("memisahkan", teks("pe", 150, 92, "12 = 2 + 10", 16, W.merah)),
    ),
    k(
      "Dua kali lima ribu sama dengan sepuluh ribu. Sepuluh kali lima ribu sama dengan lima puluh ribu. Jumlahkan keduanya, hasilnya enam puluh ribu.",
      tambah("Dua", teks("p1", 150, 126, "2 × 5.000 = 10.000", 11, W.biru)),
      tambah("Sepuluh@2", teks("p2", 150, 148, "10 × 5.000 = 50.000", 11, W.biru)),
      tambah("Jumlahkan", teks("p3", 150, 174, "10.000 + 50.000 = 60.000", 12, W.hijau)),
    ),
    k(
      "Cara dua memakai bersusun: lima ribu dikali dua belas. Lima ribu kali dua sama dengan sepuluh ribu, lima ribu kali sepuluh sama dengan lima puluh ribu, lalu dijumlahkan menjadi enam puluh ribu rupiah.",
      bersih(0),
      tambah(0, judul("Cara 2: bersusun")),
      tambah("bersusun:", teks("m1", 150, 54, "5.000", 14, W.biru, { anchor: "end" }), teks("m2", 96, 72, "×", 14, W.merah), teks("m3", 150, 72, "12", 14, W.biru, { anchor: "end" }), garis("m4", 88, 78, 66, 0, W.biru, 1.6)),
      tambah("sepuluh@1", teks("m5", 150, 98, "10.000", 14, W.biru, { anchor: "end" }), teks("m5n", 162, 98, "2 × 5.000", 8.6, W.coklat, { anchor: "start" })),
      tambah("sepuluh@2", teks("m6", 150, 116, "50.000", 14, W.biru, { anchor: "end" }), teks("m6n", 162, 116, "10 × 5.000", 8.6, W.coklat, { anchor: "start" })),
      tambah("dijumlahkan", teks("m7", 84, 116, "+", 14, W.merah), garis("m8", 88, 122, 66, 0, W.biru, 1.6), teks("m9", 150, 142, "60.000", 15, W.hijau, { anchor: "end" })),
      tambah("rupiah.", ...kartu("m10", 70, 156, 160, 34, W.hijauMuda, ["uang Yohana: Rp60.000"], 10)),
    ),
  ],
};

/* ------------------------------ 6. Eksplorasi 1.6, Permasalahan 2: pembagian angpau (Buku Siswa hlm. 22 sampai 23) ------------------------------ */
export const ADEGAN_ANGPAU_2: AdeganStory = {
  id: "angpau-2",
  judul: "Eksplorasi 1.6, Permasalahan 2: membagi enam puluh empat ribu rupiah",
  sumber: "Buku Siswa hlm. 22–23",
  latar: "#F5F3FF",
  kutipan: [
    "Permasalahan 2",
    "Orang tua Yohana mempunyai uang Rp64.000,00 dan meminta Yohana membagikannya kepada 4 anak yang tinggal di samping rumahnya.",
    "Berapakah uang yang diterima setiap anak?",
    "Tuliskan kalimat matematika dari permasalahan di atas.",
    "Ayo berhitunglah dengan cara yang pernah kamu pelajari sebelumnya.",
    "Ayo Berpikir Kritis",
    "Coba diskusikan dengan kelompokmu hal berikut ini.",
  ],
  ketukan: [
    k(
      "Permasalahan dua: orang tua Yohana punya uang enam puluh empat ribu rupiah dan meminta Yohana membagikannya kepada empat anak tetangga. Berapa uang yang diterima setiap anak?",
      tambah(0, judul("Permasalahan 2")),
      tambah("enam", ...kartu("b1", 90, 28, 120, 30, W.krem, ["Rp64.000"], 12)),
      tambah("empat@2", emo("c1", 60, 120, "🧒", 30), emo("c2", 120, 120, "🧒", 30), emo("c3", 180, 120, "🧒", 30), emo("c4", 240, 120, "🧒", 30)),
      tambah("Berapa", teks("b2", 150, 168, "tiap anak = ?", 13, W.merah)),
    ),
    k(
      "Kalimat matematikanya: enam puluh empat ribu dibagi empat. Buku meminta kita berhitung dengan cara yang pernah dipelajari sebelumnya, yaitu pembagian bersusun.",
      bersih(0),
      tambah(0, judul("Kalimat matematikanya")),
      tambah("Kalimat", teks("b3", 150, 78, "64.000 ÷ 4 = ?", 20, W.hitam)),
      tambah("pembagian", ...kartu("b4", 60, 108, 180, 34, W.langit, ["pembagian bersusun"], 10.4)),
    ),
    k(
      "Empat kali enam belas sama dengan enam puluh empat, jadi enam puluh empat ribu dibagi empat sama dengan enam belas ribu. Periksa dengan perkalian: enam belas ribu kali empat sama dengan enam puluh empat ribu.",
      bersih(0),
      tambah(0, judul("Pembagian bersusun"), teks("b5", 96, 126, "4", 16, W.biru), garis("b6", 108, 106, 0, 26, W.biru, 1.8), garis("b7", 108, 106, 82, 0, W.biru, 1.8), teks("b8", 150, 126, "64.000", 16, W.biru)),
      tambah("Empat", teks("b9", 150, 152, "4 × 16 = 64", 11, W.coklat)),
      tambah("belas@2", teks("b10", 150, 100, "16.000", 16, W.hijau)),
      tambah("Periksa", teks("b11", 150, 178, "16.000 × 4 = 64.000", 11, W.hijau)),
    ),
    k(
      "Ayo Berpikir Kritis: adakah cara lain untuk hitungan ini? Tuliskan caranya dan minta bantuan teman. Setiap anak menerima enam belas ribu rupiah.",
      bersih(0),
      tambah(0, judul("Ayo Berpikir Kritis"), emo("tk", 150, 66, "🤔", 30)),
      tambah("Tuliskan", ...kartu("kr", 30, 84, 240, 34, W.krem, ["cara lain? tulis di buku tulis"], 9.4)),
      tambah("Setiap", ...kartu("kj", 30, 132, 240, 34, W.hijauMuda, ["tiap anak: Rp16.000"], 10.4)),
    ),
  ],
};

/* ------------------------------ 7. Ayo Berlatih nomor 1: harga buah (Buku Siswa hlm. 24; Panduan Guru hlm. 34) ------------------------------ */
const HARGA: [string, string][] = [
  ["Mangga", "23.500"],
  ["Jeruk", "17.000"],
  ["Kelengkeng", "34.000"],
  ["Buah naga", "15.000"],
  ["Alpukat", "32.000"],
];
const HG = tabel("hg", 35, 30, [110, 120], [["Buah", "Harga per bungkus"], ...HARGA], 20, 9);
const sel = (r: number, c: number) => HG.filter((o) => o.id === `hg-s${r}${c}` || o.id === `hg-t${r}${c}`);
const PERNYATAAN = [
  "a. Paling mahal: alpukat",
  "b. Urutan murah: jeruk, naga, mangga, kelengkeng, alpukat",
  "c. Paling murah: buah naga",
  "d. 2 buah naga lebih mahal dari 1 alpukat",
  "e. 3 jeruk sama dengan 1 kelengkeng",
];
const baris = (i: number) => teks(`pn${i}`, 8, 40 + i * 26, PERNYATAAN[i], i === 1 ? 6.8 : 7.8, W.biru, { anchor: "start" });
const chip = (i: number, benar: boolean) => [kotak(`ch${i}`, 236, 40 + i * 26 - 12, 54, 18, benar ? W.hijauMuda : W.merahMuda, W.biru, { rx: 6 }), teks(`cht${i}`, 263, 40 + i * 26 + 0.5, benar ? "Benar" : "Salah", 8.8, benar ? W.hijau : W.merah)];

export const ADEGAN_BUAH: AdeganStory = {
  id: "berlatih-buah",
  judul: "Ayo Berlatih 1: harga buah di toko Zafran",
  sumber: "Buku Siswa hlm. 24; Panduan Guru hlm. 34",
  latar: "#FFF7ED",
  kutipan: [
    "Toko Zafran menjual beberapa jenis buah, di antaranya mangga, alpukat, jeruk, buah naga, dan kelengkeng.",
    "Harga satu bungkus mangga Rp23.500,00",
    "harga satu bungkus jeruk Rp17.000,00",
    "harga satu bungkus kelengkeng Rp34.000,00",
    "harga satu bungkus buah naga Rp15.000,00",
    "dan harga satu bungkus alpukat Rp32.000,00",
    "Harga buah paling mahal yaitu alpukat.",
    "Harga buah yang paling murah yaitu buah naga.",
    "Harga dua bungkus buah naga lebih mahal daripada satu bungkus alpukat.",
    "Harga tiga bungkus jeruk sama dengan harga satu bungkus kelengkeng.",
    "Pilihlah pernyataan yang sesuai dengan isi teks di atas dengan memberikan tanda centang",
  ],
  ketukan: [
    k(
      "Ayo Berlatih nomor satu dan dua memakai satu teks. Toko Zafran menjual mangga, alpukat, jeruk, buah naga, dan kelengkeng. Harga satu bungkus mangga dua puluh tiga ribu lima ratus, jeruk tujuh belas ribu.",
      tambah(0, judul("Toko Zafran: harga satu bungkus")),
      tambah("menjual", ...HG.filter((o) => o.id.startsWith("hg-s") && !o.id.endsWith("1")), ...HG.filter((o) => /^hg-t\d0$/.test(o.id)), ...HG.filter((o) => o.id === "hg-s01" || o.id === "hg-t01")),
      tambah("mangga@2", ...sel(1, 1)),
      tambah("jeruk@2", ...sel(2, 1)),
    ),
    k(
      "Lalu kelengkeng tiga puluh empat ribu rupiah, buah naga lima belas ribu, dan alpukat tiga puluh dua ribu. Nomor satu menilai pernyataan benar atau salah.",
      tambah("kelengkeng", ...sel(3, 1)),
      tambah("naga", ...sel(4, 1)),
      tambah("alpukat", ...sel(5, 1)),
      tambah("nomor", ...kartu("hn", 30, 160, 240, 30, W.langit, ["nomor 1: benar atau salah?"], 9.6)),
    ),
    k(
      "Pernyataan a salah: kelengkeng tiga puluh empat ribu lebih mahal daripada alpukat tiga puluh dua ribu. Pernyataan b salah, sebab buah naga lebih murah daripada jeruk. Pernyataan c benar: buah naga paling murah.",
      bersih(0),
      tambah(0, judul("Soal 1: benar atau salah")),
      tambah("Pernyataan@1", baris(0)),
      tambah("salah:", ...chip(0, false)),
      tambah("kelengkeng", teks("bk", 150, 176, "34.000 > 32.000", 9.6, W.hitam)),
      tambah("Pernyataan@2", baris(1)),
      tambah("salah@2", ...chip(1, false)),
      ubah("sebab", { id: "bk", isi: "15.000 < 17.000" }),
      tambah("Pernyataan@3", baris(2)),
      tambah("benar:", ...chip(2, true)),
    ),
    k(
      "Pernyataan d salah: dua bungkus buah naga tiga puluh ribu, lebih murah daripada alpukat tiga puluh dua ribu. Pernyataan e salah: tiga bungkus jeruk lima puluh satu ribu, bukan tiga puluh empat ribu. Kunci cocok.",
      tambah("Pernyataan@1", baris(3)),
      ubah("Pernyataan@1", { id: "bk", isi: "30.000 < 32.000" }),
      tambah("salah:", ...chip(3, false)),
      tambah("Pernyataan@2", baris(4)),
      ubah("Pernyataan@2", { id: "bk", isi: "51.000 > 34.000" }),
      tambah("salah@2", ...chip(4, false)),
      tambah("Kunci", teks("kn", 150, 194, "kunci: salah, salah, benar, salah, salah", 9, W.hijau)),
    ),
  ],
};

/* ------------------------------ 8. Ayo Berlatih nomor 2: memasangkan Kolom A dan Kolom B (Buku Siswa hlm. 25; Panduan Guru hlm. 35) ------------------------------ */
const KOLOM_B = ["Rp49.000", "Rp121.500", "Rp47.000", "Rp64.000", "Rp23.000", "Rp4.000"];
const yChip = (i: number) => 24 + i * 29;
const chipB = (i: number) => [kotak(`cb${i}`, 234, yChip(i), 58, 20, W.langit, W.biru, { rx: 6 }), teks(`cbt${i}`, 263, yChip(i) + 13.4, KOLOM_B[i], 8.2, W.biru)];
const yBaris = (i: number) => 34 + i * 29;
const PASANGAN: { label: string; hitung: string; ke: number; ukuran?: number }[] = [
  { label: "Yohana: 2 mangga + 1 jeruk", hitung: "2 × 23.500 + 17.000 = 64.000", ke: 3 },
  { label: "Nisa: Rp100.000, beli 2 mangga + 2 naga", hitung: "100.000 − (47.000 + 30.000) = 23.000", ke: 4 },
  { label: "Yohana: termurah + termahal", hitung: "15.000 + 34.000 = 49.000", ke: 0 },
  { label: "Komang: satu bungkus tiap buah", hitung: "23.500 + 17.000 + 34.000 + 15.000 + 32.000 = 121.500", ke: 1, ukuran: 6.9 },
  { label: "Lukas 2 naga, Nisa 1 kelengkeng", hitung: "34.000 − 30.000 = 4.000", ke: 5 },
  { label: "Ibu: 100.000 untuk 2 anak; tiap anak 1 jeruk + 2 naga", hitung: "17.000 + 30.000 = 47.000", ke: 2 },
];
const pasang = (i: number) => {
  const p = PASANGAN[i];
  return [teks(`pl${i}`, 8, yBaris(i), p.label, 6.8, W.coklat, { anchor: "start" }), teks(`ph${i}`, 8, yBaris(i) + 11, p.hitung, p.ukuran ?? 7.8, W.biru, { anchor: "start" })];
};
const garisPasang = (i: number) => panah(`pg${i}`, 223, yBaris(i) + 8, 9, yChip(PASANGAN[i].ke) + 10 - (yBaris(i) + 8), W.merah, 1.4);

export const ADEGAN_PASANGAN: AdeganStory = {
  id: "berlatih-pasangan",
  judul: "Ayo Berlatih 2: memasangkan Kolom A dengan Kolom B",
  sumber: "Buku Siswa hlm. 25; Panduan Guru hlm. 35",
  latar: "#F0FDFA",
  kutipan: [
    "Pasangkan pernyataan di Kolom A dan pernyataan di Kolom B secara tepat, dengan cara memberi garis.",
    "Yohana membeli dua bungkus mangga dan satu bungkus jeruk.",
    "Nisa mempunyai uang Rp100.000,00 dan ia membeli dua bungkus mangga dan dua bungkus buah naga.",
    "Yohana hendak membeli buah dengan harga termurah dan harga termahal.",
    "Komang membeli buah mangga, alpukat, kelengkeng, jeruk, dan buah naga masing-masing satu bungkus.",
    "Lukas membeli dua bungkus buah naga dan Nisa membeli satu bungkus kelengkeng.",
    "Berapakah selisih uang yang harus dibayarkan?",
    "Ibu mempunyai uang Rp100.000,00 dan dibagikan sama rata pada kedua anaknya.",
    "Rp49.000,00",
    "Rp121.500,00",
    "Rp47.000,00",
    "Rp64.000,00",
    "Rp23.000,00",
    "Rp4.000,00",
  ],
  ketukan: [
    k(
      "Nomor dua memasangkan Kolom A dengan Kolom B. Kolom B berisi enam harga: empat puluh sembilan ribu, seratus dua puluh satu ribu lima ratus, empat puluh tujuh ribu, enam puluh empat ribu, dua puluh tiga ribu, empat ribu.",
      tambah(0, judul("Ayo Berlatih 2: pasangkan")),
      tambah("sembilan", ...chipB(0)),
      tambah("seratus", ...chipB(1)),
      tambah("tujuh", ...chipB(2)),
      tambah("enam@2", ...chipB(3)),
      tambah("tiga", ...chipB(4)),
      tambah(37, ...chipB(5)),
    ),
    k(
      "Yohana membeli dua mangga dan satu jeruk: empat puluh tujuh ribu ditambah tujuh belas ribu sama dengan enam puluh empat ribu. Nisa punya seratus ribu, membeli dua mangga dan dua buah naga, sisanya dua puluh tiga ribu.",
      tambah("Yohana", ...pasang(0)),
      tambah("sama", garisPasang(0)),
      tambah("Nisa", ...pasang(1)),
      tambah("sisanya", garisPasang(1)),
    ),
    k(
      "Yohana membeli termurah dan termahal: lima belas ribu ditambah tiga puluh empat ribu, empat puluh sembilan ribu. Komang membeli satu bungkus tiap buah, jumlahnya seratus dua puluh satu ribu lima ratus.",
      tambah("Yohana", ...pasang(2)),
      tambah("sembilan", garisPasang(2)),
      tambah("Komang", ...pasang(3)),
      tambah("jumlahnya", garisPasang(3)),
    ),
    k(
      "Lukas membeli dua buah naga dan Nisa satu kelengkeng, selisihnya empat ribu. Ibu membagi seratus ribu untuk dua anak; tiap anak membayar satu jeruk dan dua buah naga, empat puluh tujuh ribu. Semua cocok dengan kunci.",
      tambah("Lukas", ...pasang(4)),
      tambah("selisihnya", garisPasang(4)),
      tambah("Ibu", ...pasang(5)),
      tambah("tiap", garisPasang(5)),
      ubah("Semua", { id: "jud", isi: "Semua pasangan cocok dengan kunci" }),
    ),
  ],
};
