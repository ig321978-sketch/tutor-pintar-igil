import type { AdeganStory } from "./logika-story";
import { CERITA, W, barisTabel, benda, bersusun, emo, judul, kaleng, kartu, teks } from "./k4b1h-gambar";
import { bersih, idx, k, sorotkan, tambah, ubah } from "./k4b1h-bantu";

/* ------------------------------ 8. Soal cerita a, b, e: dibagi sama banyak (Buku Siswa hlm. 47; Panduan Guru hlm. 67-69) ------------------------------ */
const SUARA_H1 = "Soal cerita a: Ayah mendapat satu kaleng berisi tiga puluh enam butir permen, dibagi sama banyak kepada Tono dan Tini. Tiga puluh enam dibagi dua hasilnya delapan belas, jadi Tini menerima delapan belas permen.";
const SUARA_H2 = "Soal b: Pak Bejo memanen enam puluh empat buah alpukat, dibagi sama rata kepada tiga tetangga dan juga untuk dirinya. Jadi pembaginya empat, bukan tiga.";
const SUARA_H3 = "Enam puluh empat dibagi empat hasilnya enam belas. Tiap tetangga menerima enam belas alpukat, cocok dengan kunci buku. Jebakannya, lupa menghitung Pak Bejo sendiri.";
const SUARA_H4 = "Soal e: Putu membeli lima puluh lima gantungan kunci, dibagikan sama banyak kepada Azizah, Karel, Slamet, Asep, dan Helen. Lima puluh lima dibagi lima hasilnya sebelas, jadi Asep mendapat sebelas.";
const SUARA_H5 = "Ketiga soal ini sama dengan permen Pak Wicak: satu jumlah besar dibagi sama banyak kepada beberapa orang, dan kuncinya cocok dengan hitungan mandiri.";

const [C_A, C_B, , , C_E] = CERITA;
const H3 = bersusun("cb", 20, 44, C_B[1], C_B[0]);
const NAMA_E = ["Azizah", "Karel", "Slamet", "Asep", "Helen"];

export const ADEGAN_CERITA_BAGI: AdeganStory = {
  id: "cerita-bagi",
  judul: "Soal cerita a, b, dan e: dibagi sama banyak",
  sumber: "Buku Siswa hlm. 47; Panduan Guru hlm. 67–69",
  latar: "#FFF7ED",
  kutipan: [
    "Kerjakan soal cerita berikut:",
    "Ayah mendapat hadiah satu kaleng permen yang berisi 36 butir permen.",
    "Berapa permen yang diterima Tini?",
    "Jadi, Tini memperoleh 18 permen",
    "Pak Bejo memanen 64 buah alpukat.",
    "Pak Bejo membagi sama rata hasil panennya kepada 3 tetangganya dan juga untuk dirinya.",
    "jumlah tetangga Pak Bejo dan dirinya = 4 keluarga.",
    "Jumlah masing-masing tetangga Pak Bejo menerima 16 buah alpukat",
    "Putu membeli 55 gantungan kunci khas Bali.",
    "kepada Azizah, Karel, Slamet, Asep, dan Helen dengan sama banyak.",
    "Berapa Asep mendapatkan gantungan kunci dari Putu?",
    "jadi, Asep menerima gantungan kunci dari Putu sebanyak 11 gantungan kunci.",
  ],
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Soal cerita a")),
      tambah("Ayah", ...kaleng("ka", 16, 56, 44, 52), teks("kat", 38, 88, "36", 15, W.putih)),
      tambah("Tono", ...kartu("ta", 84, 40, 96, 52, W.hijauMuda, ["Tono", "?"], 10)),
      tambah("Tini", ...kartu("ti", 190, 40, 96, 52, W.pink, ["Tini", "?"], 10)),
      tambah("dua", teks("kh", 150, 140, "36 : 2 = ?", 20, W.biru)),
      ubah("delapan", { id: "kh", isi: "36 : 2 = 18" }),
      ubah("delapan", { id: "ta-t1", isi: "18" }, { id: "ti-t1", isi: "18" }),
      sorotkan("Tini", "ti-k"),
    ),
    k(
      SUARA_H2,
      bersih(0),
      tambah(0, judul("Soal cerita b")),
      tambah("Pak", emo("al", 40, 66, "🥑", 30), teks("alt", 40, 86, "64 buah", 9, W.coklat)),
      tambah("tiga", ...[0, 1, 2].map((i) => emo(`tg${i}`, 100 + i * 52, 70, "🏠", 26)), ...[0, 1, 2].map((i) => teks(`tgt${i}`, 100 + i * 52, 88, `tetangga ${i + 1}`, 7.4, W.biru))),
      tambah("dirinya.", emo("pb", 262, 70, "👨", 26), teks("pbt", 262, 88, "Pak Bejo", 7.6, W.biru)),
      tambah("empat@2", ...kartu("pc", 20, 108, 260, 40, W.emas, ["3 tetangga + Pak Bejo = 4 bagian"], 9.6)),
      tambah("bukan", ...kartu("pd", 20, 158, 260, 32, W.merahMuda, ["pembagi 4, bukan 3"], 9.6)),
    ),
    k(
      SUARA_H3,
      bersih(0),
      tambah(0, judul("Soal b: 64 : 4")),
      tambah(0, ...H3.kerangka),
      tambah("hasilnya", ...H3.tahap.flat()),
      tambah("hasilnya", ...kartu("pe", 120, 40, 168, 40, W.emas, ["64 : 4 = 16", "kunci: 16"], 10)),
      tambah("Tiap", ...kartu("pf", 120, 94, 168, 36, W.hijauMuda, ["tiap tetangga: 16 alpukat"], 9)),
      tambah("Jebakannya,", ...kartu("pg", 120, 144, 168, 36, W.merahMuda, ["jebakan: lupa Pak Bejo"], 9)),
    ),
    k(
      SUARA_H4,
      bersih(0),
      tambah(0, judul("Soal cerita e")),
      tambah("Putu", emo("gk", 34, 160, "🔑", 26), teks("gkt", 34, 182, "55 buah", 8.6, W.coklat)),
      ...NAMA_E.map((n, i) => tambah(idx(SUARA_H4, n), ...kartu(`ge${i}`, 6 + i * 58, 36, 54, 52, [W.hijauMuda, W.langit, W.krem, W.pink, W.lavender][i], [n, "?"], 8.4))),
      tambah("dibagi", teks("gq", 160, 130, "55 : 5 = ?", 20, W.biru)),
      ubah("sebelas", { id: "gq", isi: "55 : 5 = 11" }),
      ubah("sebelas", ...NAMA_E.map((_, i) => ({ id: `ge${i}-t1`, isi: "11" }))),
      sorotkan("Asep", "ge3-k"),
    ),
    k(
      SUARA_H5,
      bersih(0),
      tambah(0, judul("Tiga soal, satu ide")),
      tambah("Ketiga", ...barisTabel("sh", 20, 36, [40, 130, 70], ["soal", "dibagi", "kunci"], 22, 8.8, true)),
      ...[C_A, C_B, C_E].map(([n, p, h], i) => tambah([idx(SUARA_H5, "ini"), idx(SUARA_H5, "jumlah"), idx(SUARA_H5, "kuncinya")][i], ...barisTabel(`sr${i}`, 20, 58 + i * 24, [40, 130, 70], [["a", "b", "e"][i], `${n} : ${p}`, String(h)], 24, 10))),
      tambah("cocok", emo("sc", 150, 170, "✅", 22)),
    ),
  ],
};

/* ------------------------------ 9. Soal cerita c dan d: banyak kotak (Buku Siswa hlm. 47; Panduan Guru hlm. 68) ------------------------------ */
const SUARA_I1 = "Soal c dan d berbeda jenis. Ibu punya delapan puluh satu kue, tiap kotak berisi tiga kue. Yang ditanya bukan isi tiap kotak, melainkan banyak kotak yang harus disiapkan.";
const SUARA_I2 = "Delapan puluh satu dibagi tiga: delapan dibagi tiga dua, sisa dua. Turunkan satu menjadi dua puluh satu, dua puluh satu dibagi tiga tujuh. Hasilnya dua puluh tujuh kotak.";
const SUARA_I3 = "Soal d: peternak mendapat sembilan puluh enam butir telur, tiap kotak memuat delapan telur. Sembilan dibagi delapan satu, sisa satu. Turunkan enam menjadi enam belas, enam belas dibagi delapan dua. Hasilnya dua belas kotak.";
const SUARA_I4 = "Pembagi adalah isi tiap kotak, jadi hasil bagi menyatakan banyak kotak. Kunci buku dua puluh tujuh kotak dan dua belas kotak. Cek: dua puluh tujuh dikali tiga hasilnya delapan puluh satu, dua belas dikali delapan hasilnya sembilan puluh enam.";

const [, , C_C, C_D] = CERITA;
const IC = bersusun("ck", 20, 44, C_C[1], C_C[0]);
const ID = bersusun("cd", 20, 44, C_D[1], C_D[0]);

export const ADEGAN_CERITA_KOTAK: AdeganStory = {
  id: "cerita-kotak",
  judul: "Soal cerita c dan d: berapa kotak yang diperlukan",
  sumber: "Buku Siswa hlm. 47; Panduan Guru hlm. 68",
  latar: "#F0F9FF",
  kutipan: [
    "Ibu mempunyai sebanyak 81 kue yang akan diletakkan pada kotak kue.",
    "Setiap kotak kue berisi 3 kue.",
    "Berapa kotak yang harus disiapkan ibu ?",
    "jadi, kotak yang harus disiapkan ibu untuk meletakkan kue adalah 27 kotak.",
    "Peternak ayam petelur hari ini mendapatkan 96 butir telur.",
    "masing-masing kotak telur memuat 8 telur.",
    "Berapakah jumlah kotak telur yang diperlukan?",
    "jadi, jumlah kotak telur yang diperlukan adalah 12 kotak",
  ],
  ketukan: [
    k(
      SUARA_I1,
      tambah(0, judul("Soal cerita c")),
      tambah("Ibu", ...benda("ku", 22, 46, 81, 9, 7.4, 2.8, W.jingga), teks("kut", 54, 128, "81 kue", 9.6, W.coklat)),
      tambah("tiap", ...kartu("ib", 120, 40, 168, 36, W.hijauMuda, ["tiap kotak berisi 3 kue"], 9)),
      tambah("banyak", ...kartu("ic", 120, 90, 168, 40, W.emas, ["berapa kotak yang", "harus disiapkan?"], 9.6)),
      tambah("kotak@3", emo("id", 204, 164, "📦", 30)),
    ),
    k(
      SUARA_I2,
      bersih(0),
      tambah(0, judul("Soal c: 81 : 3")),
      tambah(0, ...IC.kerangka),
      tambah("delapan@2", ...IC.tahap[0], ...IC.tahap[1]),
      tambah("Turunkan", ...IC.tahap[2], ...kartu("i1", 120, 40, 168, 30, W.krem, ["8 : 3 = 2, sisa 2"], 9.4)),
      tambah("tujuh", ...IC.tahap[3], ...IC.tahap[4], ...IC.tahap[5], ...kartu("i2", 120, 80, 168, 30, W.langit, ["21 : 3 = 7"], 9.4)),
      tambah("Hasilnya", ...kartu("i3", 120, 120, 168, 40, W.emas, ["81 : 3 = 27", "27 kotak"], 10)),
    ),
    k(
      SUARA_I3,
      bersih(0),
      tambah(0, judul("Soal d: 96 : 8")),
      tambah(0, ...ID.kerangka),
      tambah("peternak", ...kartu("j0", 120, 34, 168, 30, W.hijauMuda, ["96 telur, tiap kotak 8"], 9)),
      tambah("Sembilan@2", ...ID.tahap[0], ...ID.tahap[1], ...kartu("j1", 120, 72, 168, 28, W.krem, ["9 : 8 = 1, sisa 1"], 9.4)),
      tambah("Turunkan", ...ID.tahap[2]),
      tambah(idx(SUARA_I3, "dua", 1), ...ID.tahap[3], ...ID.tahap[4], ...ID.tahap[5], ...kartu("j2", 120, 108, 168, 28, W.langit, ["16 : 8 = 2"], 9.4)),
      tambah("Hasilnya", ...kartu("j3", 120, 144, 168, 40, W.emas, ["96 : 8 = 12", "12 kotak"], 10)),
    ),
    k(
      SUARA_I4,
      bersih(0),
      tambah(0, judul("Pembagi: isi tiap kotak")),
      tambah("Pembagi", ...kartu("l1", 12, 34, 276, 34, W.langit, ["pembagi = isi tiap kotak", "hasil bagi = banyak kotak"], 9)),
      tambah("Kunci", ...kartu("l2", 12, 80, 276, 34, W.hijauMuda, ["kunci buku: 27 kotak dan 12 kotak"], 9.4)),
      tambah("Cek:", ...kartu("l3", 12, 126, 134, 40, W.krem, ["cek c:", "27 × 3 = 81"], 9.6)),
      tambah("dua@4", ...kartu("l4", 154, 126, 134, 40, W.krem, ["cek d:", "12 × 8 = 96"], 9.6)),
      tambah("sembilan", emo("lc", 150, 188, "✅", 16)),
    ),
  ],
};

/* ------------------------------ 10. Miskonsepsi, diferensiasi, dan catatan kunci (Panduan Guru hlm. 69) ------------------------------ */
const SUARA_J1 = "Miskonsepsi pertama di panduan guru: murid tidak membagikan benda sama rata. Karena itu aktivitas wadah mewajibkan tiap wadah sama banyak.";
const SUARA_J2 = "Kedua, pada bilangan yang memuat angka nol, murid lupa membagi nol di posisi puluhan, dengan teknik yang disebut porogapet. Soal buku tidak memuat angka nol, jadi ini perhatian tambahan.";
const SUARA_J3 = "Ketiga, istilah hasil bagi dan sisa bagi sering terbalik. Hasil bagi adalah jawaban di atas garis, sisa bagi adalah angka terakhir di bawah.";
const SUARA_J4 = "Diferensiasi untuk kecepatan tinggi: beri pembagian yang tidak habis dibagi, lalu tentukan hasil bagi dan sisa bagi. Contoh tambahan video: tujuh puluh lima dibagi enam, hasil bagi dua belas, sisa tiga.";
const SUARA_J5 = "Untuk kemampuan rendah: latihan berulang, penjelasan secara personal, dan mulai dari bilangan yang termudah, yaitu pembagian di bawah lima puluh.";
const SUARA_J6 = "Catatan video: kesepuluh kunci jawaban buku benar menurut hitungan mandiri. Buku belum punya soal bersisa, jadi contoh bersisa kita beri label tambahan video.";

const MK = bersusun("mk", 20, 44, 6, 75);

export const ADEGAN_MISKONSEPSI: AdeganStory = {
  id: "miskonsepsi",
  judul: "Miskonsepsi, diferensiasi, dan catatan kunci buku",
  sumber: "Panduan Guru hlm. 69",
  latar: "#FDF2F8",
  kutipan: [
    "Miskonsepsi yang sering terjadi dalam operasi pembagian",
    "Peserta didik tidak membagikan benda sama rata.",
    "Peserta lupa tidak membagi angka 0 yang terletak di posisi puluhan.",
    "Istilah hasil bagi dan sisa bagi. Peserta didik sering terbalik menyebutkan.",
    "Diferensiasi",
    "berilah peserta didik masalah pembagian yang tidak habis dibagi.",
    "Arahkan peserta didik untuk menentukan hasil bagi dan sisa bagi.",
    "guru memberikan latihan secara berulang atau mengulangi penjelasan secara personal.",
    "dimulai dari dibawah 50.",
  ],
  ketukan: [
    k(
      SUARA_J1,
      tambah(0, judul("Miskonsepsi 1: tidak sama rata")),
      tambah("Miskonsepsi", ...kartu("m1", 12, 36, 276, 40, W.merahMuda, ["benda dibagikan tidak sama rata"], 9.6), emo("m1e", 270, 56, "⚠", 20)),
      tambah("aktivitas", ...kartu("m2", 12, 90, 276, 40, W.hijauMuda, ["aktivitas wadah: tiap wadah sama banyak"], 9.2)),
      tambah("wadah", ...[0, 1, 2].map((i) => emo(`mw${i}`, 70 + i * 80, 164, "📦", 28))),
    ),
    k(
      SUARA_J2,
      bersih(0),
      tambah(0, judul("Miskonsepsi 2: angka nol")),
      tambah("Kedua,", ...kartu("n1", 12, 36, 276, 40, W.merahMuda, ["lupa membagi 0 di posisi puluhan"], 9.4)),
      tambah("teknik", ...kartu("n2", 12, 88, 276, 34, W.krem, ["teknik porogapet"], 9.6)),
      tambah("Soal", ...kartu("n3", 12, 134, 276, 44, W.langit, ["soal buku tidak memuat angka 0", "(perhatian tambahan guru)"], 9)),
    ),
    k(
      SUARA_J3,
      bersih(0),
      tambah(0, judul("Miskonsepsi 3: hasil bagi dan sisa bagi")),
      tambah("Ketiga,", ...kartu("o1", 12, 36, 276, 40, W.merahMuda, ["istilah sering terbalik"], 9.6)),
      tambah("Hasil@2", ...kartu("o2", 12, 90, 134, 46, W.hijauMuda, ["hasil bagi:", "jawaban di atas garis"], 8.8)),
      tambah("sisa@2", ...kartu("o3", 154, 90, 134, 46, W.pink, ["sisa bagi:", "angka terakhir di bawah"], 8.8)),
    ),
    k(
      SUARA_J4,
      bersih(0),
      tambah(0, judul("Pengayaan: tidak habis dibagi")),
      tambah(0, ...MK.kerangka),
      tambah("Diferensiasi", ...kartu("p0", 120, 34, 168, 30, W.krem, ["contoh tambahan video"], 9)),
      tambah("tujuh", ...MK.tahap[0], ...MK.tahap[1], ...MK.tahap[2], ...kartu("p1", 120, 72, 168, 30, W.langit, ["75 : 6"], 10)),
      tambah("hasil@2", ...MK.tahap[3], ...MK.tahap[4]),
      tambah("sisa@2", ...MK.tahap[5], ...kartu("p2", 120, 112, 168, 44, W.emas, ["hasil bagi 12, sisa 3", "6 × 12 + 3 = 75"], 9.6)),
    ),
    k(
      SUARA_J5,
      bersih(0),
      tambah(0, judul("Untuk kemampuan rendah")),
      tambah("latihan", ...kartu("q1", 12, 36, 276, 34, W.hijauMuda, ["latihan berulang"], 9.6)),
      tambah("penjelasan", ...kartu("q2", 12, 80, 276, 34, W.langit, ["penjelasan secara personal"], 9.6)),
      tambah("mulai", ...kartu("q3", 12, 124, 276, 40, W.krem, ["mulai dari yang termudah:", "pembagian di bawah 50"], 9.2)),
    ),
    k(
      SUARA_J6,
      bersih(0),
      tambah(0, judul("Catatan kunci jawaban buku")),
      tambah("Catatan", ...kartu("r1", 12, 36, 276, 44, W.hijauMuda, ["10 kunci diperiksa:", "semua benar (5 + 5 = 10)"], 9.6)),
      tambah("Buku", ...kartu("r2", 12, 92, 276, 40, W.krem, ["buku belum punya soal bersisa"], 9.6)),
      tambah("label", ...kartu("r3", 12, 144, 276, 40, W.pink, ["contoh bersisa = tambahan video"], 9.6)),
    ),
  ],
};
