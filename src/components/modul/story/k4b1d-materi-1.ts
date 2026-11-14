import type { AdeganStory } from "./logika-story";
import { W, angka, bagianKe, emo, judul, kartu, panah, papan, susunBagian, teks, KOMPOSISI_CONTOH, KOMPOSISI_LATIHAN } from "./k4b1d-gambar";
import { bersih, idx, k, sorotkan, tambah, ubah } from "./k4b1d-bantu";

/* ------------------------------ 1. Pembuka sub-bab D, pengalaman belajar, apersepsi (Panduan Guru hlm. 45) ------------------------------ */
const SUARA_P1 = "Subbab D membahas komposisi dan dekomposisi bilangan cacah sampai sepuluh ribu. Di Buku Siswa, bagian ini dimulai dengan satu bilangan yang terdiri atas empat angka.";
const SUARA_P2 = "Pengalaman belajar menurut panduan guru: setelah mempelajari subbab ini, murid mampu memahami komposisi dan dekomposisi bilangan cacah sampai sepuluh ribu dengan baik dan benar.";
const SUARA_P3 = "Apersepsi: nilai tempat adalah satu-satunya cara yang tepat untuk komposisi dan dekomposisi, karena murid sudah mengenal nilai tempat setiap angka pada bilangan empat angka. Papan flanel masih layak dipakai sebagai media.";
const SUARA_P4 = "Dua pertanyaan pemantik. Pertama, apa yang dimaksud dengan komposisi bilangan? Kedua, bagaimana untuk dekomposisi suatu bilangan? Jawabannya dicari sepanjang subbab ini.";

export const ADEGAN_PEMBUKA_D: AdeganStory = {
  id: "pembuka-d",
  judul: "Subbab D: pengalaman belajar, apersepsi, pertanyaan pemantik",
  sumber: "Panduan Guru hlm. 45",
  latar: "#FFF7ED",
  kutipan: [
    "D. Komposisi dan Dekomposisi Bilangan Cacah sampai 10.000",
    "Pengalaman Belajar",
    "Setelah mempelajari sub bab ini, diharapkan peserta didik mampu memahami komposisi dan dekomposisi bilangan cacah sampai 10.000 dengan baik dan benar.",
    "Apersepsi",
    "Nilai tempat merupakan satu-satunya cara yang tepat untuk diterapkan pada komposisi dan dekomposisi bilangan cacah sampai 10.000",
    "karena peserta didik sudah mengenal nilai tempat setiap angka pada sebarang bilangan cacah 4 angka.",
    "papan flanel masih layak digunakan sebagai medianya.",
    "Pertanyaan Esensi/Pemantik",
    "1. Apa yang dimaksud dengan komposisi bilangan?",
    "2. Bagaimana untuk dekomposisi suatu bilangan?",
  ],
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Subbab D")),
      tambah("komposisi", ...kartu("a", 20, 40, 260, 34, W.hijauMuda, ["Komposisi dan Dekomposisi"], 10)),
      tambah("sepuluh", ...kartu("b", 20, 86, 260, 34, W.langit, ["Bilangan Cacah sampai 10.000"], 10)),
      tambah("empat", ...kartu("c", 70, 134, 160, 30, W.emas, ["satu bilangan 4 angka"], 9)),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Pengalaman belajar")),
      tambah("murid", ...kartu("pb", 14, 36, 272, 84, W.hijauMuda, ["murid mampu memahami", "komposisi dan dekomposisi", "bilangan cacah sampai 10.000"], 9.6)),
      tambah(idx(SUARA_P2, "baik"), emo("pc", 150, 160, "✅", 30)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Apersepsi: nilai tempat")),
      tambah("nilai", ...papan("ap", 30, 38, 60)),
      tambah("angka", ...kartu("ar", 14, 98, 272, 30, W.krem, ["murid sudah kenal nilai tempat angka"], 9)),
      tambah("flanel", ...kartu("af", 14, 140, 272, 40, W.pink, ["papan flanel", "masih layak sebagai media"], 9.4)),
    ),
    k(
      SUARA_P4,
      bersih(0),
      tambah(0, judul("Pertanyaan pemantik")),
      tambah("Pertama,", ...kartu("q1", 14, 34, 272, 50, W.hijauMuda, ["1. apa yang dimaksud", "dengan komposisi bilangan?"], 9.6)),
      tambah("Kedua,", ...kartu("q2", 14, 96, 272, 50, W.langit, ["2. bagaimana untuk", "dekomposisi suatu bilangan?"], 9.6)),
      tambah("Jawabannya", emo("q3", 150, 182, "🔎", 24)),
    ),
  ],
};

/* ------------------------------ 2. Komposisi: Ayo Mengamati (Buku Siswa hlm. 24; Panduan Guru hlm. 46) ------------------------------ */
const SUARA_A1 = "Sekarang kita belajar komposisi bilangan cacah sampai sepuluh ribu. Coba amati: kalian sudah mengenal nilai tempat dari suatu bilangan.";
const SUARA_A2 = "Diberikan bilangan empat angka. Angka enam menempati nilai tempat ribuan, angka tiga menempati ratusan, angka empat menempati puluhan, dan angka delapan menempati satuan.";
const SUARA_A3 = "Bilangan berapakah yang terbentuk? Itulah pertanyaan kita. Ingat, komposisi berarti menyusun bilangan, dan dapat memakai nilai tempat.";

export const ADEGAN_KOMPOSISI_AMATI: AdeganStory = {
  id: "komposisi-amati",
  judul: "Komposisi: mari mengamati",
  sumber: "Materi: komposisi, mengamati nilai tempat",
  latar: "#F0FDF4",
  kutipan: [
    "Komposisi bilangan cacah sampai 10.000",
    "Ayo Mengamati",
    "Kalian sudah mengenal nilai tempat dari suatu bilangan.",
    "Diberikan suatu bilangan yang terdiri atas 4 angka yang tersusun:",
    "angka 6 menempati nilai tempat ribuan, angka 3 menempati nilai tempat ratusan, angka 4 menempati nilai tempat puluhan, angka 8 menempati nilai tempat satuan.",
    "Bilangan berapakah yang terbentuk?",
    "Guru memperjelas konsep komposisi dengan diawali nilai tempat.",
    "Komposisi bilangan berarti menyusun bilangan, dapat menggunakan nilai tempat.",
  ],
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Komposisi bilangan cacah"), teks("sb", 150, 36, "sampai 10.000", 9.4, W.coklat)),
      tambah("nilai", ...papan("kp", 30, 60, 60)),
      tambah("tempat", teks("kc", 150, 132, "nilai tempat: ribuan, ratusan, puluhan, satuan", 8.6, W.biru)),
    ),
    k(
      SUARA_A2,
      tambah(idx(SUARA_A2, "enam"), angka("kp", 30, 60, 60, 0, KOMPOSISI_CONTOH[0])),
      tambah(idx(SUARA_A2, "tiga"), angka("kp", 30, 60, 60, 1, KOMPOSISI_CONTOH[1])),
      tambah(idx(SUARA_A2, "empat", 2), angka("kp", 30, 60, 60, 2, KOMPOSISI_CONTOH[2])),
      tambah(idx(SUARA_A2, "delapan"), angka("kp", 30, 60, 60, 3, KOMPOSISI_CONTOH[3])),
    ),
    k(
      SUARA_A3,
      tambah("berapakah", teks("kq", 40, 168, "?", 40, W.merah)),
      tambah("komposisi", ...kartu("kb", 76, 146, 210, 40, W.emas, ["komposisi: menyusun bilangan", "dengan nilai tempat"], 8.8)),
    ),
  ],
};

/* ------------------------------ 3. Komposisi: nilai tiap angka dan bilangan yang terbentuk (Buku Siswa hlm. 25) ------------------------------ */
const SUARA_N1 = "Setiap angka punya nilai menurut tempatnya. Angka enam di tempat ribuan bernilai enam ribu, dan angka tiga di tempat ratusan bernilai tiga ratus.";
const SUARA_N2 = "Angka empat di tempat puluhan bernilai empat puluh, dan angka delapan di tempat satuan bernilai delapan.";
const SUARA_N3 = "Jadi bilangan yang terbentuk adalah enam ribuan, ditambah tiga ratusan, ditambah empat puluhan, ditambah delapan satuan, sama dengan enam ribu tiga ratus empat puluh delapan.";
const SUARA_N4 = "Bentuk lainnya: enam ribu ditambah tiga ratus ditambah empat puluh ditambah delapan sama dengan enam ribu tiga ratus empat puluh delapan.";
const SUARA_N5 = "Menyusun bilangan dari nilai tempat seperti ini disebut komposisi. Hasilnya selalu sama, sebab jumlah nilai tiap tempat adalah bilangan itu.";

const BAGIAN_NILAI = ["6 ribuan", "3 ratusan", "4 puluhan", "8 satuan"];
const SB_N = susunBagian("sb", 40, BAGIAN_NILAI);

export const ADEGAN_KOMPOSISI_NILAI: AdeganStory = {
  id: "komposisi-nilai",
  judul: "Komposisi: nilai tiap angka dan bilangan 6.348",
  sumber: "Materi: nilai tiap angka dan bilangan",
  latar: "#FFF7ED",
  kutipan: [
    "Angka 6 menempati tempat ribuan, nilainya 6.000",
    "Angka 3 menempati tempat ratusan, nilainya 300",
    "Angka 4 menempati tempat puluhan, nilainya 40",
    "Angka 8 menempati tempat satuan, nilainya 8",
    "Jadi, bilangan yang terbentuk adalah",
    "6.000 + 300 + 40 + 8 = 6.348",
  ],
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Nilai tiap angka"), ...papan("kn", 30, 34, 60, KOMPOSISI_CONTOH)),
      tambah(idx(SUARA_N1, "enam"), panah("n0", 60, 74, 0, 10, W.merah, 2)),
      tambah(idx(SUARA_N1, "ribu"), teks("v0", 60, 100, "6.000", 10, W.merah)),
      tambah(idx(SUARA_N1, "tiga"), panah("n1", 120, 74, 0, 10, W.merah, 2)),
      tambah(idx(SUARA_N1, "ratus"), teks("v1", 120, 100, "300", 10, W.merah)),
    ),
    k(
      SUARA_N2,
      tambah(idx(SUARA_N2, "empat"), panah("n2", 180, 74, 0, 10, W.merah, 2)),
      tambah(idx(SUARA_N2, "puluh"), teks("v2", 180, 100, "40", 10, W.merah)),
      tambah(idx(SUARA_N2, "delapan"), panah("n3", 240, 74, 0, 10, W.merah, 2)),
      tambah(idx(SUARA_N2, "delapan", 2), teks("v3", 240, 100, "8", 10, W.merah)),
    ),
    k(
      SUARA_N3,
      bersih(0),
      tambah(0, judul("Bilangan yang terbentuk")),
      tambah(idx(SUARA_N3, "ribuan,"), bagianKe(SB_N, "sb", 0)),
      tambah(idx(SUARA_N3, "ratusan,"), bagianKe(SB_N, "sb", 1)),
      tambah(idx(SUARA_N3, "puluhan,"), bagianKe(SB_N, "sb", 2)),
      tambah(idx(SUARA_N3, "satuan,"), bagianKe(SB_N, "sb", 3)),
      tambah("sama", teks("hs", 150, 110, "= 6.348", 22, W.hijau)),
    ),
    k(
      SUARA_N4,
      tambah(idx(SUARA_N4, "enam"), teks("eq", 150, 150, "6.000 + 300 + 40 + 8 = 6.348", 11, W.biru)),
      sorotkan(idx(SUARA_N4, "sama"), "hs"),
    ),
    k(
      SUARA_N5,
      tambah("komposisi", ...kartu("kk", 20, 166, 260, 30, W.emas, ["komposisi = menyusun bilangan"], 9.6)),
      sorotkan("Hasilnya", "eq"),
    ),
  ],
};

/* ------------------------------ 4. Komposisi: Ayo Berlatih (Buku Siswa hlm. 25; Panduan Guru hlm. 46-47) ------------------------------ */
const SUARA_L1 = "Sekarang berlatih. Isilah titik-titik. Papan pertama berisi angka enam, empat, delapan, dan dua, dari ribuan sampai satuan.";
const SUARA_L2 = "Jawabannya: enam ribuan, empat ratusan, delapan puluhan, dua satuan, sama dengan enam ribu empat ratus delapan puluh dua.";
const SUARA_L3 = "Papan kedua berisi enam, nol, empat, dan nol. Jawabannya: enam ribuan, nol ratusan, empat puluhan, nol satuan, sama dengan enam ribu empat puluh.";
const SUARA_L4 = "Papan ketiga masih kosong, jadi kamu boleh mengisinya sendiri. Sebagai contoh, isilah empat, lima, tiga, nol, yaitu empat ribu lima ratus tiga puluh.";
const SUARA_L5 = "Periksa dengan hitungan mandiri: empat ribu ditambah lima ratus ditambah tiga puluh ditambah nol sama dengan empat ribu lima ratus tiga puluh, cocok dengan contoh.";

const kosong = ["… ribuan", "… ratusan", "… puluhan", "… satuan"];
const SB_L3 = susunBagian("ld", 84, ["6 ribuan", "0 ratusan", "4 puluhan", "0 satuan"]);
const SB_L4 = susunBagian("le", 84, ["4 ribuan", "5 ratusan", "3 puluhan", "0 satuan"]);

export const ADEGAN_KOMPOSISI_BERLATIH: AdeganStory = {
  id: "komposisi-berlatih",
  judul: "Komposisi: latihan",
  sumber: "Materi: latihan komposisi",
  latar: "#EFF6FF",
  kutipan: [
    "Ayo Berlatih",
    "Isilah titik-titik dibawah ini.",
    "Ribuan Ratusan Puluhan Satuan",
    "6.482",
    "6.040",
    "4.530",
  ],
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Latihan: isi titik-titik"), ...papan("l1", 30, 30, 60)),
      tambah(idx(SUARA_L1, "enam"), angka("l1", 30, 30, 60, 0, KOMPOSISI_LATIHAN[0][0])),
      tambah(idx(SUARA_L1, "empat"), angka("l1", 30, 30, 60, 1, KOMPOSISI_LATIHAN[0][1])),
      tambah(idx(SUARA_L1, "delapan"), angka("l1", 30, 30, 60, 2, KOMPOSISI_LATIHAN[0][2])),
      tambah(idx(SUARA_L1, "dua"), angka("l1", 30, 30, 60, 3, KOMPOSISI_LATIHAN[0][3])),
      tambah("ribuan", ...susunBagian("lb", 84, kosong)),
      tambah("satuan.", teks("lh", 150, 138, "= …", 18, W.merah)),
    ),
    k(
      SUARA_L2,
      ubah(idx(SUARA_L2, "ribuan,"), { id: "lb0-t0", isi: "6 ribuan" }),
      ubah(idx(SUARA_L2, "ratusan,"), { id: "lb1-t0", isi: "4 ratusan" }),
      ubah(idx(SUARA_L2, "puluhan,"), { id: "lb2-t0", isi: "8 puluhan" }),
      ubah(idx(SUARA_L2, "satuan,"), { id: "lb3-t0", isi: "2 satuan" }),
      ubah(idx(SUARA_L2, "sama"), { id: "lh", isi: "= 6.482", warna: W.hijau }),
    ),
    k(
      SUARA_L3,
      bersih(0),
      tambah(0, judul("Papan kedua"), ...papan("l2", 30, 30, 60)),
      tambah(idx(SUARA_L3, "enam"), angka("l2", 30, 30, 60, 0, KOMPOSISI_LATIHAN[1][0])),
      tambah(idx(SUARA_L3, "nol"), angka("l2", 30, 30, 60, 1, KOMPOSISI_LATIHAN[1][1])),
      tambah(idx(SUARA_L3, "empat"), angka("l2", 30, 30, 60, 2, KOMPOSISI_LATIHAN[1][2])),
      tambah(idx(SUARA_L3, "nol", 2), angka("l2", 30, 30, 60, 3, KOMPOSISI_LATIHAN[1][3])),
      tambah(idx(SUARA_L3, "ribuan,"), bagianKe(SB_L3, "ld", 0)),
      tambah(idx(SUARA_L3, "ratusan,"), bagianKe(SB_L3, "ld", 1)),
      tambah(idx(SUARA_L3, "puluhan,"), bagianKe(SB_L3, "ld", 2)),
      tambah(idx(SUARA_L3, "satuan,"), bagianKe(SB_L3, "ld", 3)),
      tambah(idx(SUARA_L3, "sama"), teks("lh3", 150, 138, "= 6.040", 18, W.hijau)),
    ),
    k(
      SUARA_L4,
      bersih(0),
      tambah(0, judul("Papan ketiga"), ...papan("l3", 30, 30, 60)),
      tambah(idx(SUARA_L4, "empat"), angka("l3", 30, 30, 60, 0, KOMPOSISI_LATIHAN[2][0])),
      tambah(idx(SUARA_L4, "lima"), angka("l3", 30, 30, 60, 1, KOMPOSISI_LATIHAN[2][1])),
      tambah(idx(SUARA_L4, "tiga"), angka("l3", 30, 30, 60, 2, KOMPOSISI_LATIHAN[2][2])),
      tambah(idx(SUARA_L4, "nol"), angka("l3", 30, 30, 60, 3, KOMPOSISI_LATIHAN[2][3])),
      tambah(idx(SUARA_L4, "yaitu"), ...SB_L4),
      tambah(idx(SUARA_L4, "puluh"), teks("lh4", 150, 138, "= 4.530", 18, W.hijau)),
    ),
    k(
      SUARA_L5,
      tambah(idx(SUARA_L5, "empat"), teks("lq", 150, 168, "4.000 + 500 + 30 + 0 = 4.530", 11, W.biru)),
      tambah(idx(SUARA_L5, "cocok"), emo("lr", 270, 170, "✅", 22)),
    ),
  ],
};
