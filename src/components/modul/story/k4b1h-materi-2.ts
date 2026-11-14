import type { AdeganStory } from "./logika-story";
import { KUNCI_LATIHAN, LATIHAN, W, barisTabel, bersusun, emo, judul, kartu, panah, teks } from "./k4b1h-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah } from "./k4b1h-bantu";

/** Id semua benda sebuah kartu: kotak dan baris teksnya (`jumlah` baris). */
const idKartu = (id: string, jumlah = 2): string[] => [`${id}-k`, ...Array.from({ length: jumlah }, (_, i) => `${id}-t${i}`)];

/* ------------------------------ 5. Pembagian bersusun: bentuk dan nama (Buku Siswa hlm. 45-46) ------------------------------ */
const SUARA_E1 = "Sekarang kita kenalan dengan pembagian bersusun. Empat puluh delapan permen akan dibagikan kepada empat anak, dan dituliskan dalam bentuk susun.";
const SUARA_E2 = "Tiga bagian punya nama. Yang dibagi adalah empat puluh delapan, pembagi adalah empat, dan hasil bagi ditulis di atas garis, sebagai jawabannya.";
const SUARA_E3 = "Aturannya: pembagian bersusun dilakukan dari nilai tempat yang terbesar, yaitu dari puluhan ke satuan. Pada empat puluh delapan, puluhannya empat dan satuannya delapan.";

const E = bersusun("es", 40, 66, 4, 48);

export const ADEGAN_SUSUN_ISTILAH: AdeganStory = {
  id: "susun-istilah",
  judul: "Pembagian bersusun: bentuk dan nama tiap bagian",
  sumber: "Materi: pembagian bersusun",
  latar: "#F5F3FF",
  kutipan: [
    "Pembagian dengan cara pembagian bersusun",
    "Ayo kita dapat menyelesaikan permasalahan tersebut dengan menggunakan pembagian bersusun.!",
    "48 buah permen akan dibagikan kepada 4 anak dituliskan dalam bentuk",
    "Hasil bagi",
    "Yang dibagi",
    "Pembagi",
    "Operasi pembagian bersusun terhadap suatu bilangan, dilakukan dari nilai tempat yang terbesar (puluhan ke satuan).",
  ],
  ketukan: [
    k(
      SUARA_E1,
      tambah(0, judul("Pembagian bersusun")),
      tambah("Empat", ...kartu("ep", 150, 40, 140, 36, W.hijauMuda, ["48 permen, 4 anak"], 9.6)),
      tambah("dituliskan", ...E.kerangka, teks("eh", 112, 62, "...", 13, W.merah)),
      tambah("susun.", teks("ek", 220, 120, "48 : 4", 18, W.biru)),
    ),
    k(
      SUARA_E2,
      hapus(0, "ek", ...idKartu("ep", 1)),
      tambah("Yang", ...kartu("e1", 160, 92, 124, 28, W.langit, ["yang dibagi: 48"], 9), panah("e1p", 160, 104, -60, -28, W.biru, 1.6)),
      sorotkan("Yang", "es-n1", "es-n2"),
      tambah("pembagi", ...kartu("e2", 160, 138, 124, 28, W.hijauMuda, ["pembagi: 4"], 9), panah("e2p", 160, 152, -108, -64, W.hijau, 1.6)),
      sorotkan("pembagi", "es-p"),
      tambah("hasil", ...kartu("e3", 160, 40, 124, 28, W.pink, ["hasil bagi: di atas"], 9), panah("e3p", 160, 54, -34, 8, W.merah, 1.6)),
    ),
    k(
      SUARA_E3,
      bersih(0),
      tambah(0, judul("Dari puluhan ke satuan")),
      tambah("dilakukan", ...E.kerangka),
      tambah("puluhan", ...kartu("e4", 150, 44, 140, 40, W.langit, ["4 puluhan", "(40)"], 9.4)),
      sorotkan("puluhan", "es-n1"),
      tambah("satuan.", ...kartu("e5", 150, 100, 140, 40, W.krem, ["8 satuan", "(8)"], 9.4)),
      sorotkan("satuannya", "es-n2"),
    ),
  ],
};

/* ------------------------------ 6. Langkah pembagian bersusun 48 : 4 (Buku Siswa hlm. 46) ------------------------------ */
const SUARA_F1 = "Langkah satu: empat dibagi empat sama dengan satu. Letakkan satu pada hasil bagi, di atas angka empat.";
const SUARA_F2 = "Langkah dua: satu kali empat sama dengan empat. Letakkan empat di bawah yang dibagi, lalu kurangkan, empat dikurangi empat hasilnya nol. Turunkan delapan ke satuan.";
const SUARA_F3 = "Langkah tiga: delapan dibagi empat sama dengan dua. Letakkan dua pada hasil bagi. Dua kali empat sama dengan delapan, kurangkan, delapan dikurangi delapan hasilnya nol, itu sisa pembagian.";
const SUARA_F4 = "Karena sisa pembagiannya nol, masing-masing anak mendapat dua belas permen. Itu sama dengan isi tiap wadah pada kegiatan tadi, empat wadah, tiap wadah dua belas.";

const F = bersusun("bl", 20, 50, 4, 48);

export const ADEGAN_SUSUN_LANGKAH: AdeganStory = {
  id: "susun-langkah",
  judul: "Tiga langkah pembagian bersusun 48 dibagi 4",
  sumber: "Materi: langkah pembagian bersusun",
  latar: "#FFF7ED",
  kutipan: [
    "4 : 4 = 1.",
    "1 × 4 = 4.",
    "Kurangkan 4 dengan 4 hasilnya 0.",
    "Turunkan 8 pada nilai tempat satuan",
    "8 : 4 = 2. Letakkan 2 pada",
    "Kemudian 2 × 4 = 8. Letakkan 8 di bawah",
    "(sisa pembagian)",
    "Karena sisa pembagiannya adalah 0, jadi masing-masing anak mendapatkan 12 buah permen",
  ],
  ketukan: [
    k(
      SUARA_F1,
      tambah(0, judul("Langkah 1: bagi puluhan")),
      tambah(0, ...F.kerangka),
      tambah("empat", ...kartu("sc", 112, 34, 176, 38, W.langit, ["langkah 1:", "4 : 4 = 1"], 9.6)),
      tambah("Letakkan", ...F.tahap[0]),
      sorotkan("empat", "bl-n1"),
    ),
    k(
      SUARA_F2,
      ubah(0, { id: "jud", isi: "Langkah 2: kali, kurang, turunkan" }),
      tambah("satu", ...kartu("sd", 112, 78, 176, 44, W.hijauMuda, ["langkah 2: 1 × 4 = 4", "4 − 4 = 0, turunkan 8"], 9)),
      tambah("Letakkan", ...F.tahap[1]),
      tambah("Turunkan", ...F.tahap[2]),
    ),
    k(
      SUARA_F3,
      ubah(0, { id: "jud", isi: "Langkah 3: bagi satuan" }),
      tambah("delapan", ...kartu("se", 112, 128, 176, 44, W.krem, ["langkah 3: 8 : 4 = 2", "2 × 4 = 8; 8 − 8 = 0"], 9)),
      tambah("Letakkan", ...F.tahap[3]),
      tambah("kurangkan,", ...F.tahap[4]),
      tambah("sisa", ...F.tahap[5]),
    ),
    k(
      SUARA_F4,
      hapus(0, ...idKartu("sc"), ...idKartu("sd"), ...idKartu("se")),
      ubah(0, { id: "jud", isi: "Hasil: 12 permen tiap anak" }),
      tambah("Karena", ...kartu("sh", 112, 52, 176, 40, W.emas, ["sisa 0, tiap anak", "12 permen"], 10)),
      tambah("Itu", ...kartu("si", 112, 104, 176, 46, W.hijauMuda, ["wadah tadi:", "4 wadah, tiap wadah 12"], 9.2)),
      sorotkan("dua", "bl-q1", "bl-q2"),
    ),
  ],
};

/* ------------------------------ 7. Ayo Berlatih nomor 1 (Buku Siswa hlm. 47; Panduan Guru hlm. 67) ------------------------------ */
const SUARA_G1 = "Sekarang giliran kamu berlatih, hitung dengan pembagian bersusun. Soal a sampai e adalah dua puluh empat dibagi dua, sembilan puluh enam dibagi tiga, sembilan puluh enam dibagi enam, tujuh puluh dua dibagi tiga, dan tujuh puluh lima dibagi lima.";
const SUARA_G2 = "Soal a lewat bersusun: dua dibagi dua satu, empat dibagi dua dua. Hasilnya dua belas, dan itu benar.";
const SUARA_G3 = "Soal b dengan cara yang sama: sembilan dibagi tiga tiga, enam dibagi tiga dua. Hasilnya tiga puluh dua, dan itu juga benar.";
const SUARA_G4 = "Soal c berbeda: sembilan dibagi enam satu, sisa tiga. Turunkan enam menjadi tiga puluh enam, lalu tiga puluh enam dibagi enam enam. Hasilnya enam belas.";
const SUARA_G5 = "Menurunkan sisa puluhan seperti ini perlu kamu perhatikan baik-baik, karena nanti sering dipakai. Soal d, tujuh puluh dua dibagi tiga, hasilnya dua puluh empat. Soal e, tujuh puluh lima dibagi lima, hasilnya lima belas.";
const SUARA_G6 = "Mari kita periksa hasilnya: dua belas, tiga puluh dua, enam belas, dua puluh empat, dan lima belas. Semuanya cocok, karena hasil dikali pembagi kembali ke bilangan awal.";

const SOAL = LATIHAN.map(([n, p]) => `${n} : ${p}`);
const HURUF = ["a", "b", "c", "d", "e"];
const KOL_G = [34, 100, 70, 80];
const GA = bersusun("ga", 24, 44, 2, 24);
const GB = bersusun("gb", 24, 44, 3, 96);
const GC = bersusun("gc", 24, 44, 6, 96);
const GD = bersusun("gd", 24, 68, 3, 72);
const GE = bersusun("ge", 170, 68, 5, 75);

/** Tahap bersusun muncul bertahap pada kata-kata pemicu `at` (satu pemicu per kelompok tahap). */
const bertahap = (s: ReturnType<typeof bersusun>, kelompok: number[][], at: (number | string)[]) => kelompok.map((idxs, i) => tambah(at[i], ...idxs.flatMap((j) => s.tahap[j])));

export const ADEGAN_BERLATIH_SATU: AdeganStory = {
  id: "berlatih-satu",
  judul: "Latihan pembagian bersusun: soal a sampai e",
  sumber: "Materi: latihan pembagian bersusun",
  latar: "#F0FDF4",
  kutipan: [
    "Ayo Berlatih",
    "Kerjakan soal berikut pada buku tulis kalian.",
    "Dengan menggunakan pembagian bersusun hitunglah",
    "a. 24 : 2 = 12",
    "b. 96 : 3 = 32",
    "c. 96 : 6 = 16",
    "d. 72 : 3 = 24",
    "e. 75 : 5 = 15",
  ],
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Latihan bersusun")),
      tambah(0, ...barisTabel("gh", 8, 30, KOL_G, ["", "soal", "hasil", ""], 20, 8.4, true)),
      ...SOAL.map((s, i) => tambah([idx(SUARA_G1, "dua"), idx(SUARA_G1, "sembilan", 1), idx(SUARA_G1, "sembilan", 2), idx(SUARA_G1, "tujuh", 1), idx(SUARA_G1, "tujuh", 2)][i], ...barisTabel(`gr${i}`, 8, 50 + i * 22, KOL_G, [HURUF[i], s, "...", ""], 22, 10))),
    ),
    k(
      SUARA_G2,
      bersih(0),
      tambah(0, judul("Soal a: 24 : 2")),
      tambah(0, ...GA.kerangka),
      ...bertahap(GA, [[0, 1], [2], [3, 4, 5]], [idx(SUARA_G2, "satu"), idx(SUARA_G2, "empat"), idx(SUARA_G2, "dua", 4)]),
      tambah("Hasilnya", ...kartu("ga9", 150, 60, 138, 40, W.emas, ["24 : 2 = 12", "hasil: 12"], 10)),
    ),
    k(
      SUARA_G3,
      bersih(0),
      tambah(0, judul("Soal b: 96 : 3")),
      tambah(0, ...GB.kerangka),
      ...bertahap(GB, [[0, 1], [2], [3, 4, 5]], [idx(SUARA_G3, "tiga", 2), idx(SUARA_G3, "enam"), idx(SUARA_G3, "dua")]),
      tambah("Hasilnya", ...kartu("gb9", 150, 60, 138, 40, W.emas, ["96 : 3 = 32", "hasil: 32"], 10)),
    ),
    k(
      SUARA_G4,
      bersih(0),
      tambah(0, judul("Soal c: sisa puluhan diturunkan")),
      tambah(0, ...GC.kerangka),
      ...bertahap(GC, [[0, 1], [2], [3, 4, 5]], [idx(SUARA_G4, "satu"), "Turunkan", idx(SUARA_G4, "enam", 6)]),
      tambah("tiga@2", ...kartu("gc8", 150, 44, 138, 40, W.krem, ["9 : 6 = 1, sisa 3", "36 : 6 = 6"], 9.4)),
      tambah("Hasilnya", ...kartu("gc9", 150, 100, 138, 40, W.emas, ["96 : 6 = 16", "hasil: 16"], 10)),
    ),
    k(
      SUARA_G5,
      bersih(0),
      tambah(0, judul("Soal d dan e: sisa diturunkan")),
      tambah("perhatikan", ...kartu("gx", 12, 28, 276, 26, W.krem, ["sisa puluhan diturunkan dulu"], 8.6)),
      tambah("Soal", ...GD.kerangka, ...GD.tahap.flat(), ...kartu("gd9", 20, 164, 100, 26, W.emas, ["d: 72 : 3 = 24"], 9)),
      tambah("Soal@2", ...GE.kerangka, ...GE.tahap.flat(), ...kartu("ge9", 168, 164, 100, 26, W.emas, ["e: 75 : 5 = 15"], 9)),
    ),
    k(
      SUARA_G6,
      bersih(0),
      tambah(0, judul("Periksa: hasil dikali pembagi")),
      tambah(0, ...barisTabel("kh", 12, 30, [34, 76, 56, 110], ["", "soal", "hasil", "cek kali"], 20, 8.4, true)),
      ...LATIHAN.map(([n, p], i) => tambah([idx(SUARA_G6, "belas", 1), idx(SUARA_G6, "dua", 2), idx(SUARA_G6, "belas", 2), idx(SUARA_G6, "empat"), idx(SUARA_G6, "belas", 3)][i], ...barisTabel(`kr${i}`, 12, 50 + i * 22, [34, 76, 56, 110], [HURUF[i], `${n} : ${p}`, String(KUNCI_LATIHAN[i]), `${KUNCI_LATIHAN[i]} × ${p} = ${n}`], 22, 9.6))),
      tambah("Semuanya", emo("kc", 150, 190, "✅", 16)),
    ),
  ],
};

