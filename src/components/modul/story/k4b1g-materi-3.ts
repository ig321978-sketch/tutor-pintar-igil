import type { AdeganStory, Aksi } from "./logika-story";
import { W, barisTabel, emo, judul, kartu, kelompok, kelompokAngka, sisi, susunHasil, susunSimpan, susunSoal, teks } from "./k4b1g-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah } from "./k4b1g-bantu";

/* ------------------------------ 9. Ayo Berlatih nomor 1 (Buku Siswa hlm. 43; Panduan Guru hlm. 62) ------------------------------ */
const SUARA_L1 = "Ayo Berlatih nomor satu: lima perkalian. Tiga puluh dua kali tiga, dua puluh empat kali dua, tiga puluh tujuh kali dua, lima puluh dua kali lima, empat puluh delapan kali tujuh.";
const SUARA_LA = "Soal a, tiga puluh dua kali tiga. Satuan: dua kali tiga sama dengan enam. Puluhan: tiga kali tiga sama dengan sembilan. Hasilnya sembilan puluh enam.";
const SUARA_LB = "Soal b, dua puluh empat kali dua. Satuan: empat kali dua sama dengan delapan. Puluhan: dua kali dua sama dengan empat. Hasilnya empat puluh delapan.";
const SUARA_LC = "Soal c, tiga puluh tujuh kali dua. Tujuh kali dua sama dengan empat belas: tulis empat, simpan satu. Tiga kali dua sama dengan enam, tambah satu, tujuh. Hasilnya tujuh puluh empat.";
const SUARA_LD = "Soal d, lima puluh dua kali lima. Dua kali lima sama dengan sepuluh: tulis nol, simpan satu. Lima kali lima sama dengan dua puluh lima, tambah satu, dua puluh enam. Hasilnya dua ratus enam puluh.";
const SUARA_LE = "Soal e, empat puluh delapan kali tujuh. Delapan kali tujuh sama dengan lima puluh enam: tulis enam, simpan lima. Empat kali tujuh sama dengan dua puluh delapan, tambah lima, tiga puluh tiga. Hasilnya tiga ratus tiga puluh enam.";
const SUARA_LK = "Kunci panduan guru: sembilan puluh enam, empat puluh delapan, tujuh puluh empat, dua ratus enam puluh, dan tiga ratus tiga puluh enam. Semuanya cocok dengan hitungan mandiri.";
const SUARA_LN = "Catatan video: hasil soal d dan e melewati seratus, padahal judul subbab sampai seratus. Jadi kata itu dibaca sebagai bilangan yang dikalikan, bukan hasilnya.";

const AT_KUNCI = [idx(SUARA_LK, "sembilan"), idx(SUARA_LK, "empat"), idx(SUARA_LK, "tujuh"), idx(SUARA_LK, "ratus"), idx(SUARA_LK, "ratus", 2)];
const SOAL = [
  { id: "la", huruf: "a", a: 32, b: 3, hasil: "96" },
  { id: "lb", huruf: "b", a: 24, b: 2, hasil: "48" },
  { id: "lc", huruf: "c", a: 37, b: 2, hasil: "74" },
  { id: "ld", huruf: "d", a: 52, b: 5, hasil: "260" },
  { id: "le", huruf: "e", a: 48, b: 7, hasil: "336" },
] as const;
const sk = (i: number) => {
  const s = SOAL[i];
  return { soal: susunSoal(s.id, 70, 70, s.a, s.b), hasil: susunHasil(s.id, 70, 70, s.hasil) };
};
/** Awal tiap soal: judul, soal bersusun, dan kartu hasil di akhir. */
const awal = (i: number): Aksi[] => {
  const s = SOAL[i];
  const g = sk(i).soal;
  return [bersih(0), tambah(0, judul(`Soal ${s.huruf}: ${s.a} × ${s.b}`)), tambah(0, g[0], g[1], g[3], g[2], g[4])];
};
const kartuHasil = (i: number, at: string | number) => tambah(at, ...kartu(`${SOAL[i].id}k`, 128, 124, 156, 28, W.emas, [`${SOAL[i].a} × ${SOAL[i].b} = ${SOAL[i].hasil}`], 11));
const baris = (id: string, y: number, isi: string, warna: string = W.biru) => sisi(id, 130, y, isi, 11, warna);

export const ADEGAN_BERLATIH_SATU: AdeganStory = {
  id: "berlatih-satu",
  judul: "Ayo Berlatih nomor 1: lima perkalian",
  sumber: "Buku Siswa hlm. 43; Panduan Guru hlm. 62",
  latar: "#EEF2FF",
  kutipan: [
    "Ayo Berlatih",
    "Salin dan kerjakan soal berikut pada buku tulis kalian.",
    "Selesaikan perkalian berikut dengan cara susun panjang atau cara pendek!",
    "32 × 3 = ...",
    "24 × 2 = ...",
    "37 × 2 = ...",
    "52 × 5 = ...",
    "48 × 7 = ...",
    "32 × 3 = 96",
    "24 × 2 = 48",
    "37 × 2 = 74",
    "52 × 5 = 260",
    "48 × 7 = 336",
  ],
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Ayo Berlatih nomor 1")),
      tambah("Tiga", sisi("q0", 60, 54, "a. 32 × 3 = ...", 13)),
      tambah(idx(SUARA_L1, "empat"), sisi("q1", 60, 80, "b. 24 × 2 = ...", 13)),
      tambah("tujuh", sisi("q2", 60, 106, "c. 37 × 2 = ...", 13)),
      tambah(idx(SUARA_L1, "lima", 2), sisi("q3", 60, 132, "d. 52 × 5 = ...", 13)),
      tambah("delapan", sisi("q4", 60, 158, "e. 48 × 7 = ...", 13)),
    ),
    k(
      SUARA_LA,
      ...awal(0),
      tambah("Satuan:", baris("la1", 70, "2 × 3 = 6")),
      tambah("Puluhan:", baris("la2", 92, "3 × 3 = 9")),
      tambah(idx(SUARA_LA, "enam"), sk(0).hasil[1]),
      tambah("sembilan", sk(0).hasil[0]),
      kartuHasil(0, "Hasilnya"),
    ),
    k(
      SUARA_LB,
      ...awal(1),
      tambah("Satuan:", baris("lb1", 70, "4 × 2 = 8")),
      tambah("Puluhan:", baris("lb2", 92, "2 × 2 = 4")),
      tambah("delapan", sk(1).hasil[1]),
      tambah(idx(SUARA_LB, "empat", 3), sk(1).hasil[0]),
      kartuHasil(1, "Hasilnya"),
    ),
    k(
      SUARA_LC,
      ...awal(2),
      tambah(idx(SUARA_LC, "tujuh", 2), baris("lc1", 64, "7 × 2 = 14")),
      tambah("tulis", sk(2).hasil[1]),
      tambah("simpan", susunSimpan("lc", 70, 70, "1")),
      tambah(idx(SUARA_LC, "tiga", 2), baris("lc2", 86, "3 × 2 = 6")),
      tambah("tambah", baris("lc3", 108, "6 + 1 = 7", W.merah)),
      tambah(idx(SUARA_LC, "tujuh", 3), sk(2).hasil[0]),
      kartuHasil(2, "Hasilnya"),
    ),
    k(
      SUARA_LD,
      ...awal(3),
      tambah(idx(SUARA_LD, "Dua", 2), baris("ld1", 64, "2 × 5 = 10")),
      tambah("nol,", sk(3).hasil[2]),
      tambah("simpan", susunSimpan("ld", 70, 70, "1")),
      tambah(idx(SUARA_LD, "Lima", 4), baris("ld2", 86, "5 × 5 = 25")),
      tambah("tambah", baris("ld3", 108, "25 + 1 = 26", W.merah)),
      tambah(idx(SUARA_LD, "enam"), sk(3).hasil[1]),
      tambah("Hasilnya", sk(3).hasil[0]),
      kartuHasil(3, "ratus"),
    ),
    k(
      SUARA_LE,
      ...awal(4),
      tambah(idx(SUARA_LE, "Delapan", 2), baris("le1", 64, "8 × 7 = 56")),
      tambah("tulis", sk(4).hasil[2]),
      tambah("simpan", susunSimpan("le", 70, 70, "5")),
      tambah(idx(SUARA_LE, "Empat", 2), baris("le2", 86, "4 × 7 = 28")),
      tambah("tambah", baris("le3", 108, "28 + 5 = 33", W.merah)),
      tambah(idx(SUARA_LE, "tiga", 2), sk(4).hasil[1]),
      tambah("Hasilnya", sk(4).hasil[0]),
      kartuHasil(4, "ratus"),
    ),
    k(
      SUARA_LK,
      bersih(0),
      tambah(0, judul("Kunci nomor 1")),
      ...SOAL.map((s, i) => tambah(AT_KUNCI[i], teks(`kk${i}h`, 40, 54 + i * 24, `${s.huruf}.`, 13, W.biru, { anchor: "start" }), sisi(`kk${i}`, 62, 54 + i * 24, `${s.a} × ${s.b} = ${s.hasil}`, 13, W.hijau), emo(`kk${i}e`, 240, 52 + i * 24, "✅", 16))),
    ),
    k(
      SUARA_LN,
      sorotkan("Catatan", "kk3", "kk4"),
      tambah("seratus,", ...kartu("lnk", 40, 170, 220, 26, W.merahMuda, ["260 dan 336 lebih dari 100"], 9.6)),
    ),
  ],
};

/* ------------------------------ 10. Ayo Berlatih nomor 2 a sampai c (Buku Siswa hlm. 43; Panduan Guru hlm. 62–63) ------------------------------ */
const SUARA_E1 = "Soal cerita dua a: Asep punya dua belas ayam, tiap ayam menghabiskan tiga mangkok makanan sehari. Dua belas kali tiga sama dengan tiga puluh enam mangkok.";
const SUARA_E2 = "Soal b: dua rak buku, setiap rak berisi empat puluh lima buku. Dua kali empat puluh lima sama dengan sembilan puluh buku.";
const SUARA_E3 = "Soal c: empat belas baju seragam, tiap baju tujuh kancing. Empat belas kali tujuh sama dengan sembilan puluh delapan kancing. Cara panjang memeriksa: tujuh puluh tambah dua puluh delapan.";
const SUARA_E4 = "Tiga kunci panduan guru cocok dengan hitungan mandiri: tiga puluh enam, sembilan puluh, dan sembilan puluh delapan.";

export const ADEGAN_BERLATIH_DUA_A: AdeganStory = {
  id: "berlatih-dua-a",
  judul: "Ayo Berlatih nomor 2: soal cerita a sampai c",
  sumber: "Buku Siswa hlm. 43; Panduan Guru hlm. 62–63",
  latar: "#F0FDFA",
  kutipan: [
    "Kerjakan soal cerita berikut!",
    "Asep memiliki 12 ayam, setiap ayam dalam satu hari menghabiskan 3",
    "Berapa mangkok makanan yang harus disediakan Asep setiap harinya?",
    "Perpustakaan SD Pelangi memiliki 2 rak buku, setiap rak berisi 45 buku.",
    "Ibu sedang memasang kancing pada 14 baju seragam.",
    "Setiap baju membutuhkan 7 kancing.",
    "12 x 3 = 36",
    "Jadi, dalam sehari Asep harus menyediakan 36 mangkok makanan",
    "2 x 45 = 90",
    "Jadi, jumlah keseluruhan buku dalam perpustakaan SD Pelangi adalah 90 buku",
    "14 x 7 = 98",
    "Jadi, jumlah kancing yang harus disiapkan Ibu untuk seluruh baju seragam adalah 98 kancing",
  ],
  ketukan: [
    k(
      SUARA_E1,
      tambah(0, judul("2 a: ayam Asep")),
      tambah("Asep", ...kelompok("ay", 22, 34, 12, 3, 6, 40, 30, 3, W.jingga, W.hijauMuda)),
      tambah("tiap", teks("ayt", 150, 124, "12 ayam × 3 mangkok", 10, W.biru)),
      tambah("sama", teks("ayh", 150, 150, "12 × 3 = 36 mangkok", 13, W.hijau)),
    ),
    k(
      SUARA_E2,
      bersih(0),
      tambah(0, judul("2 b: rak buku")),
      tambah("rak", ...kelompokAngka("rk", 40, 40, 2, 2, 100, 50, "45 buku", W.langit, 11)),
      tambah("setiap", teks("rkt", 150, 124, "2 rak × 45 buku", 11, W.biru)),
      tambah("sama", teks("rkh", 150, 152, "2 × 45 = 90 buku", 13, W.hijau)),
    ),
    k(
      SUARA_E3,
      bersih(0),
      tambah(0, judul("2 c: kancing baju")),
      tambah("baju", ...kelompok("kc", 8, 34, 14, 7, 7, 38, 30, 4, W.biruMuda, W.krem)),
      tambah("tiap", teks("kct", 150, 118, "14 baju × 7 kancing", 10, W.biru)),
      tambah("sama", teks("kch", 150, 142, "14 × 7 = 98 kancing", 13, W.hijau)),
      tambah("Cara", teks("kcp", 150, 168, "70 + 28 = 98", 12, W.merah)),
    ),
    k(
      SUARA_E4,
      bersih(0),
      tambah(0, judul("Kunci cocok")),
      tambah("Tiga", ...barisTabel("tb0", 20, 36, [50, 120, 90], ["soal", "hitungan", "kunci"], 24, 9, true)),
      tambah("tiga@2", ...barisTabel("tb1", 20, 60, [50, 120, 90], ["2 a", "12 × 3", "36"], 24, 10)),
      tambah("sembilan", ...barisTabel("tb2", 20, 84, [50, 120, 90], ["2 b", "2 × 45", "90"], 24, 10)),
      tambah("delapan", ...barisTabel("tb3", 20, 108, [50, 120, 90], ["2 c", "14 × 7", "98"], 24, 10)),
    ),
  ],
};

/* ------------------------------ 11. Ayo Berlatih nomor 2 d dan e (Buku Siswa hlm. 43; Panduan Guru hlm. 63–64) ------------------------------ */
const SUARA_F1 = "Soal d: Azizah punya dua puluh satu kucing, dan tiap kucing berkaki empat. Dua puluh satu kali empat sama dengan delapan puluh empat kaki.";
const SUARA_F2 = "Soal e di Buku Siswa menyebut tiap kelas mengirim tiga belas siswa, tetapi tidak menyebut berapa banyak kelas yang ikut.";
const SUARA_F3 = "Panduan guru menambahkan: ada enam kelas yang ikut lomba. Dengan enam kelas, tiga belas kali enam sama dengan tujuh puluh delapan siswa.";
const SUARA_F4 = "Catatan: kunci tujuh puluh delapan hanya berlaku bila ada enam kelas. Guru perlu membacakan banyak kelasnya, atau soal diberi kalimat enam kelas.";

export const ADEGAN_BERLATIH_DUA_B: AdeganStory = {
  id: "berlatih-dua-b",
  judul: "Ayo Berlatih nomor 2: soal cerita d dan e",
  sumber: "Buku Siswa hlm. 43; Panduan Guru hlm. 63–64",
  latar: "#FFF7ED",
  kutipan: [
    "Azizah sangat menyukai kucing",
    "Berapakah jumlah kaki keseluruhan kucing Azizah?",
    "SD Anggrek mengirimkan siswa-siswinya mengikuti lomba di tingkat",
    "Setiap tingkat kelas diwajibkan mengirimkan 13 siswa",
    "Berapa keseluruhan siswa yang dikirim SD Anggrek untuk mengikuti lomba di tingkat kecamatan?",
    "kucing Azizah = 21 ekor",
    "setiap kucing memiliki 4 kaki",
    "21 x 4 = 84",
    "Terdapat 6 kelas yang dikutkan lomba.",
    "13 x 6 = 78",
    "Jadi, jumlah keseluruhan siswa SD Anggrek yang mengikuti lomba adalah 78 siswa",
  ],
  ketukan: [
    k(
      SUARA_F1,
      tambah(0, judul("2 d: kaki kucing Azizah")),
      tambah("Azizah", ...kelompok("kd", 8, 34, 21, 4, 7, 38, 22, 2, W.hitam, W.krem)),
      tambah("tiap", teks("kdt", 150, 126, "21 kucing × 4 kaki", 10, W.biru)),
      tambah("sama", teks("kdh", 150, 150, "21 × 4 = 84 kaki", 13, W.hijau)),
    ),
    k(
      SUARA_F2,
      bersih(0),
      tambah(0, judul("2 e: lomba SD Anggrek")),
      tambah("tiap", ...kartu("e1", 20, 36, 120, 46, W.langit, ["tiap kelas", "13 siswa"], 9.6)),
      tambah("tidak", ...kartu("e2", 160, 36, 120, 46, W.merahMuda, ["banyak kelas", "tidak ditulis"], 9.6)),
      tambah("banyak", teks("eq", 150, 150, "?", 46, W.merah)),
    ),
    k(
      SUARA_F3,
      hapus("Panduan", "eq"),
      ubah("menambahkan:", { id: "e2-t0", isi: "banyak kelas" }, { id: "e2-t1", isi: "6 kelas (Panduan Guru)" }),
      tambah(idx(SUARA_F3, "kelas"), ...kelompokAngka("ks", 14, 96, 6, 6, 42, 28, "13", W.langit, 10)),
      tambah("sama", teks("ksh", 150, 156, "13 × 6 = 78 siswa", 13, W.hijau)),
    ),
    k(
      SUARA_F4,
      bersih(0),
      tambah(0, judul("Catatan soal e")),
      tambah("kunci", ...kartu("f1", 14, 40, 272, 44, W.emas, ["kunci 78 hanya berlaku", "bila ada 6 kelas"], 9.6)),
      tambah("Guru", ...kartu("f2", 14, 100, 272, 44, W.hijauMuda, ["saran: guru membacakan banyak kelas", "atau soal diberi kalimat 6 kelas"], 9)),
      tambah("perlu", emo("f3", 150, 184, "📝", 24)),
    ),
  ],
};

/* ------------------------------ 12. Miskonsepsi dan diferensiasi (Panduan Guru hlm. 64–65) ------------------------------ */
const SUARA_G1 = "Miskonsepsi pertama: murid salah memahami konsep perkalian. Menurut panduan guru, tiga kali dua ditulis dua tambah dua tambah dua, bukan tiga tambah tiga.";
const SUARA_G2 = "Cara membacanya: tiga kelompok yang masing-masing berisi dua. Seperti dua belas kotak berisi empat donat tadi, yang dijumlahkan sebagai empat sebanyak dua belas kali.";
const SUARA_G3 = "Aturan ini tidak selalu diikuti buku sendiri. Cara bersusun menaruh bilangan dua angka di atas, misalnya dua belas kali delapan untuk delapan pak berisi dua belas, dan soal e ditulis tiga belas kali enam untuk enam kelas.";
const SUARA_G4 = "Miskonsepsi kedua: teknik menyusun, murid salah paham angka mana yang disimpan. Contohnya tujuh kali dua empat belas: yang ditulis empat, yang disimpan satu, bukan sebaliknya.";
const SUARA_G5 = "Diferensiasi: murid cepat mengerjakan latihan tanpa bantuan dan boleh diberi soal tambahan, murid sedang dan tinggi mendapat pengayaan. Murid yang kesulitan didampingi, dengan latihan berulang dimulai dari perkalian tanpa menyimpan.";

const MK = susunSoal("mk", 70, 70, 37, 2);
const MKH = susunHasil("mk", 70, 70, "74");

export const ADEGAN_MISKONSEPSI: AdeganStory = {
  id: "miskonsepsi",
  judul: "Miskonsepsi perkalian dan diferensiasi",
  sumber: "Panduan Guru hlm. 64–65",
  latar: "#FEF2F2",
  kutipan: [
    "Miskonsepsi",
    "Miskonsepsi yang sering terjadi dalam operasi perkalian, yaitu",
    "Peserta didik masih banyak salah memahami konsep perkalian.",
    "3 x 2 = 2 + 2 + 2 (benar)",
    "3 x 2 = 3 + 3 (salah)",
    "Teknik menyusun, peserta didik salah paham yang mana yang disimpan",
    "Diferensiasi",
    "Bagi peserta didik yang kecepatan belajarnya tinggi (advanced), minta",
    "mereka mengerjakan latihan tanpa bantuan.",
    "guru dapat memberikan pengayaan.",
    "Peserta didik yang memiliki kemampuan matematika rendah, guru",
    "memberikan latihan secara berulang atau mengulangi penjelasan",
    "Berikan perkalian bilangan yang tidak menyimpan",
  ],
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Miskonsepsi perkalian")),
      tambah("tiga", ...kartu("mc1", 14, 34, 272, 36, W.hijauMuda, ["3 kali 2 ditulis 2 + 2 + 2  (benar)"], 9.4)),
      tambah("bukan", ...kartu("mc2", 14, 82, 272, 36, W.merahMuda, ["3 kali 2 ditulis 3 + 3  (salah)"], 9.4)),
    ),
    k(
      SUARA_G2,
      tambah("Cara", ...kartu("mc3", 14, 130, 272, 40, W.langit, ["3 kelompok, tiap kelompok 2", "12 kotak × 4 donat: 4 sebanyak 12 kali"], 8.6)),
      sorotkan("Cara", "mc1-k"),
    ),
    k(
      SUARA_G3,
      bersih(0),
      tambah(0, judul("Urutan di buku tidak selalu sama")),
      tambah("Cara", ...kartu("o1", 14, 34, 272, 40, W.krem, ["8 pak × 12 batang, bersusun: 12 × 8"], 9.2)),
      tambah("soal", ...kartu("o2", 14, 86, 272, 40, W.krem, ["6 kelas × 13 siswa, ditulis: 13 × 6"], 9.2)),
      tambah("kelas.", ...kartu("o3", 14, 140, 272, 40, W.merahMuda, ["hasil tetap sama, hanya urutannya berbeda"], 9.2)),
    ),
    k(
      SUARA_G4,
      bersih(0),
      tambah(0, judul("Miskonsepsi: yang disimpan")),
      tambah("teknik", ...MK),
      tambah(0, sisi("mkn", 130, 52, "contoh: soal 1 c, 37 × 2", 9, W.coklat)),
      tambah("empat", sisi("mk1", 130, 88, "7 × 2 = 14", 11, W.biru)),
      tambah("ditulis", MKH[1], sisi("mk2", 130, 110, "ditulis: 4", 10, W.hijau)),
      tambah(idx(SUARA_G4, "disimpan", 2), susunSimpan("mk", 70, 70, "1"), sisi("mk3", 130, 130, "disimpan: 1", 10, W.merah)),
    ),
    k(
      SUARA_G5,
      bersih(0),
      tambah(0, judul("Diferensiasi")),
      tambah("cepat", ...kartu("df1", 14, 34, 272, 60, W.hijauMuda, ["cepat, sedang, tinggi:", "latihan tanpa bantuan, soal tambahan,", "pengayaan"], 9)),
      tambah("kesulitan", ...kartu("df2", 14, 108, 272, 60, W.krem, ["rendah: didampingi guru,", "latihan berulang atau penjelasan personal,", "mulai dari perkalian tanpa menyimpan"], 9)),
    ),
  ],
};
