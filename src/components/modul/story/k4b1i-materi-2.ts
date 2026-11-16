import type { AdeganStory, Aksi } from "./logika-story";
import { W, barisTabel, busurSemua, deret, emo, hariBenda, isiKotak, judul, kartu, muncul, suku, tabel, teks } from "./k4b1i-gambar";
import { bersih, k, tambah, ubah } from "./k4b1i-bantu";

/* ------------------------------ 7. Kelipatan: kelereng Karel (Buku Siswa hlm. 50-51; Panduan Guru hlm. 73) ------------------------------ */
const KH = hariBenda("kh", 19, 30, 7, 2);
const KT = { bw: 30, gap: 8 };
const D_KAREL = deret("kt", 21, 112, ["2", "4", "6", "8", "10", "12", "14"], KT);
const B_KAREL = busurSemua("kt", 21, 112, ["+2", "+2", "+2", "+2", "+2", "+2"], { ...KT, tinggi: 10 });
export const ADEGAN_KELIPATAN_KAREL: AdeganStory = {
  id: "kelipatan-karel",
  judul: "Kelipatan dari bilangan cacah: kelereng Karel",
  sumber: "Materi: kelipatan dari kelereng Karel",
  latar: "#F0F9FF",
  kutipan: [
    "Karel setiap hari membeli 2 kelereng",
    "Karel menghitung bertambahnya jumlah kelereng dalam setiap harinya",
    "kelereng Karel bertambah 2 butir setiap harinya",
    "Kelereng Karel saat hari ke-4",
    "8 bisa dikatakan sebagai penjumlahan berulang dari 2 atau",
    "8 adalah hasil kali 4 dengan 2.",
    "8 disebut sebagai bilangan kelipatan dari 2",
    "2, 4, 6, 8, 10, 12 dan 14 merupakan bilangan kelipatan 2",
  ],
  ketukan: [
    k(
      "Sekarang kelipatan dari bilangan cacah. Perhatikan: Karel setiap hari membeli dua kelereng, dan menghitung jumlah kelerengnya tiap hari.",
      bersih(0),
      tambah(0, judul("Kelipatan: kelereng Karel")),
      tambah("Karel", ...KH),
      tambah("setiap", teks("khc", 150, 85, "Karel membeli 2 kelereng setiap hari", 9, W.coklat)),
    ),
    k(
      "Hari pertama dua kelereng, hari kedua dua tambah dua sama dengan empat, hari ketiga enam, hari keempat delapan, hari kelima sepuluh, keenam dua belas, ketujuh empat belas.",
      ...muncul(D_KAREL, B_KAREL, ["pertama", "kedua", "ketiga", "keempat", "kelima", "keenam", "ketujuh"], ["kedua", "ketiga", "keempat", "kelima", "keenam", "ketujuh"]),
    ),
    k(
      "Pada hari keempat Karel punya dua tambah dua tambah dua tambah dua, yaitu delapan. Jadi hari ketiga enam, hari keempat delapan.",
      ubah("keempat", { id: "kh-h3", warna: "#FEF08A" }, { id: "kt-b3", warna: "#FEF08A" }),
      tambah("yaitu", ...kartu("kk1", 20, 150, 260, 24, W.hijauMuda, ["2 + 2 + 2 + 2 = 8"], 10)),
      tambah("Jadi", ...kartu("kk2", 20, 178, 260, 20, W.krem, ["hari ke-3: 6 kelereng, hari ke-4: 8 kelereng"], 8.4)),
    ),
    k(
      "Delapan adalah penjumlahan berulang dari dua, atau hasil kali empat dengan dua, jadi kelipatan dua. Dua, empat, enam, delapan, sepuluh, dua belas, empat belas semuanya kelipatan dua.",
      bersih(0),
      tambah(0, judul("Kelipatan 2")),
      tambah("penjumlahan", ...kartu("kl1", 20, 40, 260, 30, W.krem, ["8 = 2 + 2 + 2 + 2"], 11)),
      tambah("hasil", ...kartu("kl2", 20, 80, 260, 30, W.krem, ["8 = 4 × 2"], 11)),
      tambah("jadi", ...kartu("kl3", 20, 120, 260, 28, W.hijauMuda, ["8 adalah kelipatan 2"], 10)),
      tambah("semuanya", ...kartu("kl4", 20, 156, 260, 30, W.pink, ["kelipatan 2: 2, 4, 6, 8, 10, 12, 14"], 9.4)),
    ),
  ],
};

/* ------------------------------ 8. Mencoba: kelereng Slamet, kelipatan 3 (Buku Siswa hlm. 51; Panduan Guru hlm. 73) ------------------------------ */
const SH = hariBenda("sh", 19, 30, 7, 3);
const D_SLAMET = deret("ks", 21, 112, ["3", "?", "?", "?", "?", "?", "?"], KT);
const B_SLAMET = busurSemua("ks", 21, 112, ["+3", "+3", "+3", "+3", "+3", "+3"], { ...KT, tinggi: 10 });
export const ADEGAN_MENCOBA_SLAMET: AdeganStory = {
  id: "mencoba-slamet",
  judul: "Mencoba: kelereng Slamet dan kelipatan 3",
  sumber: "Materi: kelipatan 3 dari kelereng Slamet",
  latar: "#FEFCE8",
  kutipan: [
    "Lengkapilah kotak-kotak kosong pada gambar di bawah ini.",
    "3,6,9,12,15,18,21",
    "menstimulus peserta didik untuk mengingat perkalian suatu bilangan dengan bilangan asli",
    "mengamati pola bilang setelah dikalikan dengan bilangan asli",
  ],
  ketukan: [
    k(
      "Sekarang coba kamu. Slamet tiap hari mendapat tiga kelereng. Lengkapilah kotak kosong: hari pertama tiga, lalu tiga tambah tiga, dan seterusnya.",
      bersih(0),
      tambah(0, judul("Mencoba: kelereng Slamet")),
      tambah("Slamet", ...SH),
      tambah("Slamet", teks("shc", 150, 85, "Slamet mendapat 3 kelereng tiap hari", 9, W.coklat)),
      tambah("Lengkapilah", ...D_SLAMET),
    ),
    k(
      "Kotak yang kosong: tiga, enam, sembilan, dua belas, lima belas, delapan belas, dua puluh satu.",
      isiKotak(4, "ks", 1, "6"),
      isiKotak(5, "ks", 2, "9"),
      isiKotak(7, "ks", 3, "12"),
      isiKotak(9, "ks", 4, "15"),
      isiKotak(11, "ks", 5, "18"),
      isiKotak(14, "ks", 6, "21"),
    ),
    k(
      "Tiap hari bertambah tiga, jadi tiga, enam, sembilan, dua belas, lima belas, delapan belas, dua puluh satu semuanya kelipatan tiga.",
      ...B_SLAMET.map((b, i): Aksi => tambah(2 + i, ...b)),
      tambah("kelipatan", ...kartu("ks1", 20, 150, 260, 30, W.pink, ["kelipatan 3: 3, 6, 9, 12, 15, 18, 21"], 9.2)),
    ),
    k(
      "Ingat lagi perkalian dengan bilangan asli. Kelipatan dua adalah dua kali satu, dua kali dua, dua kali tiga. Kelipatan tiga adalah tiga kali satu, tiga kali dua, tiga kali tiga.",
      bersih(0),
      tambah(0, judul("Kelipatan dari perkalian")),
      tambah(11, ...kartu("m1", 12, 40, 88, 30, W.krem, ["2 × 1 = 2"], 9.6)),
      tambah(14, ...kartu("m2", 106, 40, 88, 30, W.krem, ["2 × 2 = 4"], 9.6)),
      tambah(17, ...kartu("m3", 200, 40, 88, 30, W.krem, ["2 × 3 = 6"], 9.6)),
      tambah(23, ...kartu("m4", 12, 90, 88, 30, W.langit, ["3 × 1 = 3"], 9.6)),
      tambah(26, ...kartu("m5", 106, 90, 88, 30, W.langit, ["3 × 2 = 6"], 9.6)),
      tambah(29, ...kartu("m6", 200, 90, 88, 30, W.langit, ["3 × 3 = 9"], 9.6)),
      tambah("bilangan", ...kartu("m7", 20, 142, 260, 30, W.hijauMuda, ["bilangan asli: 1, 2, 3, ..."], 9.6)),
    ),
  ],
};

/* ------------------------------ 9. Latihan: kelipatan (Buku Siswa hlm. 52; Panduan Guru hlm. 74) ------------------------------ */
const D_K3 = deret("k3", 14, 70, ["3", "6", "9", "12", "15", "18"], { bw: 32, gap: 8 });
const D_K6 = deret("k6", 14, 70, ["6", "12", "18", "24", "30", "36", "42"], { bw: 32, gap: 8 });
const D_K5 = deret("k5", 14, 70, ["5", "10", "15", "20", "25", "30", "35"], { bw: 32, gap: 8 });
const AND = { bw: 50, gap: 30 };
const D_K4 = deret("k4", 45, 100, ["4", "8", "12"], AND);
const B_K4 = busurSemua("k4", 45, 100, ["+4", "+4"], { ...AND, tinggi: 12 });
export const ADEGAN_BERLATIH_KELIPATAN: AdeganStory = {
  id: "berlatih-kelipatan",
  judul: "Latihan: kelipatan 3, 6, 5, dan kartu Andi",
  sumber: "Materi: kelipatan 3, 6, 5, dan kartu Andi",
  latar: "#F0FDF4",
  kutipan: [
    "Tentukan kelipatan dari 3.",
    "Tuliskan bilangan-bilangan kelipatan 6 kurang dari 40.",
    "Tuliskan bilangan-bilangan kelipatan 5 yang lebih dari 17 dan kurang dari 35.",
    "Setiap 2 hari sekali Andi membeli kartu anime sebanyak 4 lembar",
    "Kelipatan dari 3 adalah 3,6,9,12,15,18,…",
    "Kelipatan 6 kurang dari 40 adalah 6,12,18,24,30,36",
    "Keliapan 5 lebih dari 17 kurang dari 35 adalah 20,25,30",
    "Banyak kartu anime Andi pada hari ke 6 adalah 12 kartu anime.",
  ],
  ketukan: [
    k(
      "Latihan satu: kelipatan tiga. Daftarnya: tiga, enam, sembilan, dua belas, lima belas, delapan belas, dan seterusnya. Titik tiga berarti dan seterusnya.",
      bersih(0),
      tambah(0, judul("Latihan 1: kelipatan 3")),
      tambah(5, ...suku(D_K3, 0)),
      tambah(6, ...suku(D_K3, 1)),
      tambah(7, ...suku(D_K3, 2)),
      tambah(9, ...suku(D_K3, 3)),
      tambah(11, ...suku(D_K3, 4)),
      tambah(13, ...suku(D_K3, 5)),
      tambah(15, teks("k3e", 262, 91, "…", 14, W.biru)),
      tambah("Titik", ...kartu("k3k", 20, 130, 260, 36, W.krem, ["… = dan seterusnya (tak berhingga)"], 9.4)),
    ),
    k(
      "Latihan dua: kelipatan enam kurang dari empat puluh. Enam, dua belas, delapan belas, dua puluh empat, tiga puluh, tiga puluh enam. Empat puluh dua sudah lewat.",
      bersih(0),
      tambah(0, judul("Latihan 2: kelipatan 6")),
      tambah(8, ...suku(D_K6, 0)),
      tambah(10, ...suku(D_K6, 1)),
      tambah(12, ...suku(D_K6, 2)),
      tambah(15, ...suku(D_K6, 3)),
      tambah(17, ...suku(D_K6, 4)),
      tambah(20, ...suku(D_K6, 5)),
      tambah(23, ...suku(D_K6, 6)),
      tambah("sudah", ...kartu("k6k", 60, 130, 180, 28, W.merahMuda, ["42 > 40"], 11)),
      ubah("sudah", { id: "k6-b6", warna: W.merahMuda, garis: W.merah }, { id: "k6-n6", warna: W.merah }),
    ),
    k(
      "Latihan tiga: kelipatan lima antara tujuh belas dan tiga puluh lima. Daftar: lima, sepuluh, lima belas, dua puluh, dua puluh lima, tiga puluh, tiga puluh lima. Jawabnya dua puluh, dua puluh lima, tiga puluh.",
      bersih(0),
      tambah(0, judul("Latihan 3: kelipatan 5")),
      tambah("antara", ...kartu("k5k", 20, 34, 260, 24, W.krem, ["lebih dari 17 dan kurang dari 35"], 9.2)),
      tambah(12, ...suku(D_K5, 0)),
      tambah(13, ...suku(D_K5, 1)),
      tambah(15, ...suku(D_K5, 2)),
      tambah(17, ...suku(D_K5, 3)),
      tambah(20, ...suku(D_K5, 4)),
      tambah(22, ...suku(D_K5, 5)),
      tambah(25, ...suku(D_K5, 6)),
      ...[0, 1, 2, 6].flatMap((i) => [ubah("Jawabnya", { id: `k5-b${i}`, warna: W.abu }, { id: `k5-n${i}`, warna: "#64748B" })]),
      ...[3, 4, 5].flatMap((i) => [ubah("Jawabnya", { id: `k5-b${i}`, warna: W.hijauMuda, garis: W.hijau }, { id: `k5-n${i}`, warna: W.hijau })]),
      tambah("Jawabnya", ...kartu("k5j", 60, 130, 180, 30, W.hijauMuda, ["20, 25, 30"], 11)),
    ),
    k(
      "Latihan empat: setiap dua hari sekali Andi membeli empat lembar kartu anime. Hari pertama empat, ketiga delapan, kelima dua belas. Jadi hari keenam dua belas kartu, hasil tiga kali membeli.",
      bersih(0),
      tambah(0, judul("Latihan 4: kartu Andi")),
      tambah(3, ...kartu("k4a", 20, 32, 260, 24, W.krem, ["tiap 2 hari: 4 lembar kartu"], 9.4)),
      tambah(14, ...suku(D_K4, 0), teks("k4c0", 70, 137, "hari 1", 8.6, W.coklat)),
      tambah(16, ...suku(D_K4, 1), ...B_K4[0], teks("k4c1", 150, 137, "hari 3", 8.6, W.coklat)),
      tambah(19, ...suku(D_K4, 2), ...B_K4[1], teks("k4c2", 230, 137, "hari 5", 8.6, W.coklat)),
      tambah(25, ...kartu("k4k", 20, 156, 260, 28, W.hijauMuda, ["sampai hari 6: 3 × 4 = 12 kartu"], 9.6)),
    ),
  ],
};

/* ------------------------------ 10. Miskonsepsi dan diferensiasi (Panduan Guru hlm. 71, 74-75) ------------------------------ */
const MISKON = [
  "1. hasil bagi faktor: bilangan cacah, bukan desimal",
  "2. bedakan hasil bagi dan sisa bagi",
  "3. 1 dan bilangan itu sendiri juga faktor",
  "4. kelipatan: hasilnya tidak berhingga",
  "5. tulis 2, 4, 6, 8, … bukan 2, 4, 6",
];
const warnaM = [W.hijauMuda, W.krem, W.langit, W.pink, W.merahMuda];
export const ADEGAN_MISKONSEPSI: AdeganStory = {
  id: "miskonsepsi",
  judul: "Pesan guru: kesalahan yang sering terjadi",
  sumber: "Materi: kesalahan yang sering terjadi",
  latar: "#FFF7ED",
  kutipan: [
    "Miskonsepsi yang sering terjadi dalam faktor dan kelipatan",
    "Hindari membagi menjadi bilangan desimal",
    "Guru harus bisa membedakan hasil bagi dan sisa bagi",
    "Bilangan 1 dan dirinya sendiri juga merupakan faktor dari bilangan tersebut",
    "Kelipatan suatu bilangan itu hasilnya tidak berhingga",
    "titik tiga menyatakan dan seterusnya",
    "mengerjakan latihan tanpa bantuan",
    "Diskusi dan Drill",
    "ketua kelompok adalah peserta didik dengan tingkat kemampuan tinggi",
  ],
  ketukan: [
    k(
      "Hati-hati, ada lima kesalahan yang sering terjadi. Pertama, hasil bagi faktor harus bilangan cacah, bukan desimal. Kedua, bedakan hasil bagi dan sisa bagi.",
      bersih(0),
      tambah(0, judul("Lima miskonsepsi")),
      tambah("Pertama,", ...kartu("mk0", 12, 34, 276, 24, warnaM[0], [MISKON[0]], 8.4)),
      tambah("Kedua,", ...kartu("mk1", 12, 62, 276, 24, warnaM[1], [MISKON[1]], 8.8)),
    ),
    k(
      "Ketiga, satu dan bilangan itu sendiri juga faktor. Keempat, kelipatan tidak berhingga. Kelima, tulis kelipatan dua sebagai dua, empat, enam, delapan, titik tiga, bukan hanya dua, empat, enam.",
      tambah("Ketiga,", ...kartu("mk2", 12, 90, 276, 24, warnaM[2], [MISKON[2]], 8.8)),
      tambah("Keempat,", ...kartu("mk3", 12, 118, 276, 24, warnaM[3], [MISKON[3]], 8.8)),
      tambah("Kelima,", ...kartu("mk4", 12, 146, 276, 24, warnaM[4], [MISKON[4]], 8.8)),
    ),
    k(
      "Dalam kelompok, murid cepat belajar mengerjakan sendiri dan boleh dapat soal tambahan, guru mendampingi yang kesulitan. Kita pakai diskusi dan drill dalam kelompok beragam.",
      bersih(0),
      tambah(0, judul("Diferensiasi dan metode")),
      tambah("murid", ...kartu("df0", 12, 34, 276, 28, W.hijauMuda, ["cepat belajar: kerjakan sendiri, soal tambahan"], 8.8)),
      tambah("guru", ...kartu("df1", 12, 68, 276, 28, W.krem, ["guru mendampingi yang kesulitan"], 9.4)),
      tambah("diskusi", ...kartu("df2", 12, 102, 276, 28, W.langit, ["metode: diskusi dan drill"], 9.6)),
      tambah("beragam", ...kartu("df3", 12, 136, 276, 28, W.pink, ["kelompok beragam, ketua berkemampuan tinggi"], 8.8)),
    ),
  ],
};

/* ------------------------------ 11. Uji Kompetensi 1-2: nilai tempat (Buku Siswa hlm. 52-53; Panduan Guru hlm. 75-76) ------------------------------ */
const TAB_UK1 = tabel(
  "un",
  21,
  34,
  [50, 52, 52, 52, 52],
  [
    ["Bilangan", "Ribuan", "Ratusan", "Puluhan", "Satuan"],
    ["2.234", "2", "2", "3", "4"],
    ["7.034", "....", "....", "....", "...."],
    ["....", "8", "0", "3", "2"],
    ["7.905", "....", "....", "....", "...."],
    ["....", "8", "1", "1", "0"],
  ],
  17,
  8.4,
);
const isiUn = (at: string | number, r: number, c: number, nilai: string) => ubah(at, { id: `un-t${r}${c}`, isi: nilai, warna: W.hijau });
export const ADEGAN_UK_NILAI_TEMPAT: AdeganStory = {
  id: "uk-nilai-tempat",
  judul: "Latihan penutup: nilai tempat",
  sumber: "Materi: nilai tempat bilangan",
  latar: "#F5F3FF",
  kutipan: [
    "Uji Kompetensi",
    "Lengkapi tabel berikut dengan cermat.",
    "Dua ribu dua ratus tiga puluh empat",
    "Delapan ribu seratus sepuluh",
    "Tulis nilai tempat dari angka 5 dari bilangan berikut.",
    "Tujuh ribu tiga puluh empat",
    "Delapan ribu dua",
    "Tujuh Ribu Sembilan Ratus Lima",
  ],
  ketukan: [
    k(
      "Sekarang latihan penutup bab. Lengkapi tabel nilai tempat. Contoh: dua ribu dua ratus tiga puluh empat, yaitu dua, dua, tiga, empat.",
      bersih(0),
      tambah(0, judul("Latihan penutup bab (sampai 10.000)")),
      tambah("Lengkapi", ...barisTabel(TAB_UK1, "un", 0)),
      tambah("Contoh:", ...barisTabel(TAB_UK1, "un", 1)),
      tambah("Contoh:", ...barisTabel(TAB_UK1, "un", 2), ...barisTabel(TAB_UK1, "un", 3), ...barisTabel(TAB_UK1, "un", 4), ...barisTabel(TAB_UK1, "un", 5)),
    ),
    k(
      "Tujuh ribu tiga puluh empat: tujuh, nol, tiga, empat. Tujuh ribu sembilan ratus lima: tujuh, sembilan, nol, lima. Dua baris lain memberi angkanya: delapan, nol, tiga, dua dan delapan, satu, satu, nol.",
      isiUn(5, 2, 1, "7"),
      isiUn(6, 2, 2, "0"),
      isiUn(7, 2, 3, "3"),
      isiUn(8, 2, 4, "4"),
      isiUn(14, 4, 1, "7"),
      isiUn(15, 4, 2, "9"),
      isiUn(16, 4, 3, "0"),
      isiUn(17, 4, 4, "5"),
      isiUn(26, 3, 0, "8.032"),
      isiUn(31, 5, 0, "8.110"),
    ),
    k(
      "Baca dua baris tadi: delapan, nol, tiga, dua dibaca delapan ribu tiga puluh dua. Delapan, satu, satu, nol dibaca delapan ribu seratus sepuluh.",
      tambah("Baca", ...kartu("un1", 12, 144, 276, 24, W.hijauMuda, ["8, 0, 3, 2 dibaca 8.032"], 9.4)),
      tambah("Delapan@3", ...kartu("un2", 12, 172, 276, 24, W.hijauMuda, ["8, 1, 1, 0 dibaca 8.110"], 9.4)),
    ),
    k(
      "Berikutnya: nilai tempat angka lima. Empat ribu dua ratus tiga puluh lima: satuan. Empat ribu dua ratus lima puluh tiga: puluhan. Empat ribu lima ratus dua puluh tiga: ratusan.",
      bersih(0),
      tambah(0, judul("Nilai tempat angka 5")),
      tambah("satuan.", ...kartu("n1", 30, 44, 240, 32, W.krem, ["4.235: angka 5 satuan"], 10.4)),
      tambah("puluhan.", ...kartu("n2", 30, 92, 240, 32, W.krem, ["4.253: angka 5 puluhan"], 10.4)),
      tambah("ratusan.", ...kartu("n3", 30, 140, 240, 32, W.krem, ["4.523: angka 5 ratusan"], 10.4)),
    ),
  ],
};

/* ------------------------------ 12. Uji Kompetensi 3-6: hitungan (Buku Siswa hlm. 53; Panduan Guru hlm. 76-77) ------------------------------ */
/** Empat persamaan dalam kisi dua kali dua; muncul pada kata yang ditentukan. */
function empat(id: string, jud: string, eq: [string, string, string, string], at: (string | number)[], warna: string): Aksi[] {
  const pos: [number, number][] = [
    [12, 40],
    [154, 40],
    [12, 92],
    [154, 92],
  ];
  return [bersih(0), tambah(0, judul(jud)), ...eq.map((e, i) => tambah(at[i], ...kartu(`${id}${i}`, pos[i][0], pos[i][1], 134, 40, warna, [e], 9.4)))];
}
export const ADEGAN_UK_HITUNG: AdeganStory = {
  id: "uk-hitung",
  judul: "Latihan penutup: tambah, kurang, kali, bagi",
  sumber: "Materi: tambah, kurang, kali, bagi",
  latar: "#F0F9FF",
  kutipan: [
    "Hitung penjumlahan berikut!",
    "134 + 764",
    "Hitung pengurangan berikut!",
    "Tentukan hasil dari",
    "d. 674 + 142 + 213 = 1.029",
    "a. 712 – 324 = 388",
    "b. 523 – 145 = 378",
    "c. 612 – 389 = 223",
    "d. 881 – 458 = 423",
    "a. 21 × 4 = 84",
    "d. 45 × 5 = 225",
    "a. 96 : 3 = 32",
    "d. 70 : 5 = 14",
  ],
  ketukan: [
    k(
      "Mulai dari penjumlahan: delapan ratus sembilan puluh delapan, delapan ratus tiga puluh enam, tujuh ratus empat puluh satu, dan seribu dua puluh sembilan. Semua hasilnya cocok.",
      ...empat("hs", "Penjumlahan", ["134 + 764 = 898", "345 + 491 = 836", "222 + 519 = 741", "674 + 142 + 213 = 1.029"], [7, 12, 17, 22], W.hijauMuda),
    ),
    k(
      "Berikutnya kita kurangkan: tiga ratus delapan puluh delapan, tiga ratus tujuh puluh delapan, dua ratus dua puluh tiga, dan empat ratus dua puluh tiga.",
      ...empat("hk", "Pengurangan", ["712 − 324 = 388", "523 − 145 = 378", "612 − 389 = 223", "881 − 458 = 423"], [7, 12, 17, 23], W.merahMuda),
    ),
    k(
      "Lalu kita kalikan: delapan puluh empat, sembilan puluh enam, seratus tiga puluh dua, dan dua ratus dua puluh lima.",
      ...empat("hp", "Perkalian", ["21 × 4 = 84", "32 × 3 = 96", "22 × 6 = 132", "45 × 5 = 225"], [5, 8, 12, 18], W.krem),
    ),
    k(
      "Terakhir kita bagi: tiga puluh dua, dua puluh empat, dua puluh empat, dan empat belas. Semua benar.",
      ...empat("hb", "Pembagian", ["96 : 3 = 32", "72 : 3 = 24", "48 : 2 = 24", "70 : 5 = 14"], [5, 8, 11, 14], W.langit),
    ),
  ],
};

/* ------------------------------ 13. Uji Kompetensi 7, 8, 14, 15: faktor dan kelipatan (Buku Siswa hlm. 54; Panduan Guru hlm. 77) ------------------------------ */
const D_U7 = deret("k7", 17, 70, ["3", "6", "9", "12", "15", "18", "21", "24", "27"], { bw: 26, gap: 4, u: 10 });
const D_U8A = deret("fd", 55, 52, ["1", "3", "9", "27"], { bw: 40, gap: 12 });
const D_U8B = deret("fe", 17, 128, ["1", "2", "4", "13", "26", "52"], { bw: 36, gap: 10 });
const D_U14 = deret("k14", 26, 80, ["8", "12", "16", "20", "24"], { bw: 40, gap: 12 });
const D_LAMPU = deret("m15", 25, 100, ["18.10", "18.12", "18.14", "18.16"], { bw: 52, gap: 14, u: 9.6 });
export const ADEGAN_UK_FAKTOR_KELIPATAN: AdeganStory = {
  id: "uk-faktor-kelipatan",
  judul: "Latihan penutup: faktor dan kelipatan",
  sumber: "Materi: faktor dan kelipatan, latihan akhir",
  latar: "#FDF2F8",
  kutipan: [
    "Tentukan nilai kelipatan 3 yang kurang dari 30!",
    "Tentukan faktor dari:",
    "Tentukan nilai kelipatan 4 yang lebih dari 7 dan kurang dari 25!",
    "Lampu warna merah berkedip setiap 2 menit",
    "pada pukul 18.10 WIB",
    "3, 6, 9, 12, 15, 18, 21, 24, 27",
    "Faktor dari 27 adalah 1, 3, 9, 27",
    "Faktor dari 52 adalah 1, 2, 4, 13, 26, 52",
    "8, 12, 16, 20, 24",
    "18.10, 18.12, 18.14, 18.16 dan seterusnya",
  ],
  ketukan: [
    k(
      "Coba tentukan kelipatan tiga kurang dari tiga puluh. Tiga, enam, sembilan, dan seterusnya sampai dua puluh tujuh.",
      bersih(0),
      tambah(0, judul("Kelipatan 3 kurang dari 30")),
      tambah("kelipatan", ...kartu("u7", 20, 34, 260, 24, W.krem, ["kelipatan 3, kurang dari 30"], 9.4)),
      tambah(8, ...suku(D_U7, 0)),
      tambah(9, ...suku(D_U7, 1)),
      tambah(10, ...suku(D_U7, 2)),
      tambah(12, ...suku(D_U7, 3), ...suku(D_U7, 4), ...suku(D_U7, 5), ...suku(D_U7, 6), ...suku(D_U7, 7)),
      tambah(16, ...suku(D_U7, 8)),
    ),
    k(
      "Berikutnya: faktor dua puluh tujuh adalah satu, tiga, sembilan, dua puluh tujuh. Faktor lima puluh dua adalah satu, dua, empat, tiga belas, dua puluh enam, lima puluh dua.",
      bersih(0),
      tambah(0, judul("Faktor 27 dan 52")),
      tambah("Faktor", teks("fd-c", 150, 44, "faktor 27", 8.6, W.coklat), ...D_U8A),
      tambah("Faktor@2", teks("fe-c", 150, 120, "faktor 52", 8.6, W.coklat), ...D_U8B),
    ),
    k(
      "Sekarang kita tentukan kelipatan empat yang lebih dari tujuh dan kurang dari dua puluh lima, yaitu delapan, dua belas, enam belas, dua puluh, dua puluh empat.",
      bersih(0),
      tambah(0, judul("Kelipatan 4 dari 7 sampai 25")),
      tambah("lebih", ...kartu("u14", 20, 34, 260, 24, W.krem, ["lebih dari 7 dan kurang dari 25"], 9.2)),
      tambah(16, ...suku(D_U14, 0)),
      tambah(18, ...suku(D_U14, 1)),
      tambah(20, ...suku(D_U14, 2)),
      tambah(22, ...suku(D_U14, 3)),
      tambah(25, ...suku(D_U14, 4)),
    ),
    k(
      "Perhatikan cerita ini: lampu merah berkedip setiap dua menit. Helen melihatnya pukul delapan belas sepuluh WIB. Kapan lampu berkedip lagi?",
      bersih(0),
      tambah(0, judul("Lampu merah berkedip")),
      tambah("lampu", emo("lp", 40, 62, "🚨", 30)),
      tambah("setiap", ...kartu("lq", 80, 34, 200, 28, W.krem, ["berkedip tiap 2 menit"], 9.6)),
      tambah("Helen", ...kartu("lr", 20, 70, 260, 22, W.langit, ["Helen melihat: pukul 18.10 WIB"], 9.2)),
      tambah("pukul", ...suku(D_LAMPU, 0)),
    ),
    k(
      "Daftarnya pukul delapan belas sepuluh, dua belas, empat belas, enam belas, dan seterusnya. Jadi berikutnya menit kedua belas.",
      tambah("dua", ...suku(D_LAMPU, 1), teks("mp0", 90, 96, "+2", 9, W.hijau)),
      tambah("empat", ...suku(D_LAMPU, 2), teks("mp1", 156, 96, "+2", 9, W.hijau)),
      tambah("enam", ...suku(D_LAMPU, 3), teks("mp2", 222, 96, "+2", 9, W.hijau)),
      tambah("seterusnya.", teks("mpe", 280, 119, "…", 14, W.biru)),
      tambah("berikutnya", ...kartu("lm", 20, 150, 260, 30, W.hijauMuda, ["berikutnya: menit ke-12 (pukul 18.12)"], 9.2)),
    ),
  ],
};

/* ------------------------------ 14. Uji Kompetensi 9-13: soal cerita (Buku Siswa hlm. 54; Panduan Guru hlm. 77) ------------------------------ */
export const ADEGAN_UK_CERITA: AdeganStory = {
  id: "uk-cerita",
  judul: "Latihan penutup: soal cerita",
  sumber: "Materi: soal cerita campuran",
  latar: "#F0FDF4",
  kutipan: [
    "Keseluruhan siswa yang mengikuti lomba adalah 256 siswa",
    "179 siswa diantaranya adalah siswa laki-laki",
    "Slamet mendapat hadiah 36 kelereng dari kakaknya",
    "Azizah ingin membagi sama rata gantungan kunci buat 5 temannya dan Azizah sendiri",
    "Terdapat 24 botol air mineral dalam satu karton",
    "Pak guru membeli 3 pak permen",
    "256 – 179 = 77 siswa perempuan",
    "36 + 111 – 54 = 93 kelereng",
    "(128 + 76) : 6 = 34 gantungan",
    "24 x 8 = 192 botol air",
    "(3 x 30) : 5 = 90 : 5 = 18",
  ],
  ketukan: [
    k(
      "Cerita pertama: lomba diikuti dua ratus lima puluh enam siswa, seratus tujuh puluh sembilan di antaranya laki-laki. Perempuan: dua ratus lima puluh enam kurang seratus tujuh puluh sembilan, yaitu tujuh puluh tujuh.",
      bersih(0),
      tambah(0, judul("Cerita lomba matematika")),
      tambah(9, ...kartu("c91", 20, 36, 260, 28, W.krem, ["256 siswa ikut lomba"], 10)),
      tambah(16, ...kartu("c92", 20, 72, 260, 28, W.langit, ["179 siswa laki-laki"], 10)),
      tambah(23, ...kartu("c93", 20, 112, 260, 32, W.hijauMuda, ["256 − 179 = 77"], 11)),
      tambah(31, ...kartu("c94", 20, 152, 260, 28, W.pink, ["77 siswa perempuan"], 10)),
    ),
    k(
      "Cerita kedua: Slamet punya seratus sebelas kelereng, dapat tiga puluh enam dari kakak, lalu memberi lima puluh empat kepada Asep. Seratus empat puluh tujuh kurang lima puluh empat, jadi sembilan puluh tiga.",
      bersih(0),
      tambah(0, judul("Cerita kelereng Slamet")),
      tambah("kakak,", ...kartu("c101", 20, 36, 260, 30, W.hijauMuda, ["111 + 36 = 147"], 11)),
      tambah("Asep.", ...kartu("c102", 20, 76, 260, 30, W.merahMuda, ["memberi 54 kepada Asep"], 10)),
      tambah("kurang", ...kartu("c103", 20, 116, 260, 30, W.krem, ["147 − 54 = 93"], 11)),
      tambah("tiga@2", ...kartu("c104", 20, 156, 260, 28, W.pink, ["sekarang 93 kelereng"], 10)),
    ),
    k(
      "Cerita ketiga: seratus dua puluh delapan ditambah tujuh puluh enam sama dengan dua ratus empat. Dibagi enam orang, Azizah dan lima teman, hasilnya tiga puluh empat.",
      bersih(0),
      tambah(0, judul("Cerita gantungan")),
      tambah("ditambah", ...kartu("c111", 20, 36, 260, 30, W.hijauMuda, ["128 + 76 = 204"], 11)),
      tambah("Azizah", ...kartu("c112", 20, 76, 260, 30, W.krem, ["6 orang: Azizah + 5 teman"], 10)),
      tambah("hasilnya", ...kartu("c113", 20, 116, 260, 30, W.langit, ["204 : 6 = 34"], 11)),
      tambah("empat@2", ...kartu("c114", 20, 156, 260, 28, W.pink, ["tiap orang 34 gantungan"], 10)),
    ),
    k(
      "Cerita keempat adalah: dua puluh empat botol kali delapan karton sama dengan seratus sembilan puluh dua. Cerita kelima adalah: tiga kali tiga puluh sama dengan sembilan puluh, dibagi lima, masing-masing delapan belas.",
      bersih(0),
      tambah(0, judul("Cerita botol dan permen")),
      tambah(15, ...kartu("c121", 20, 36, 260, 30, W.hijauMuda, ["24 × 8 = 192"], 11)),
      tambah(22, ...kartu("c131", 20, 84, 260, 30, W.krem, ["3 × 30 = 90"], 11)),
      tambah(26, ...kartu("c132", 20, 124, 260, 30, W.langit, ["90 : 5 = 18"], 11)),
      tambah(31, ...kartu("c133", 20, 160, 260, 28, W.pink, ["tiap siswa 18 permen"], 10)),
    ),
  ],
};
