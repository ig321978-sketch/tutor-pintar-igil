import type { AdeganStory, Obj } from "./logika-story";
import { OWL, W, benda, bingkai, emo, ikat, judul, kartu, kartuAngka, pusatSel, sebar, tangan, teks, type Titik } from "./k1b5a-gambar";
import { bersih, hapus, hitungAksi, k, redamkan, sorotkan, tambah, ubah, urutBilangan } from "./k1b5a-bantu";

/* ------------------------------ 1. Detektif bilangan ------------------------------ */
const SUARA_E1 = "Igil menjadi detektif bilangan. Ada bilangan misterius yang bersembunyi. Kita cari dari petunjuknya.";
const SUARA_E2 = "Petunjuk pertama. Bilangan ini datang tepat setelah empat belas.";
const SUARA_E3 = "Setelah empat belas ada lima belas. Jadi bilangan misterius adalah lima belas.";
const SUARA_E4 = "Petunjuk kedua. Bilangan ini datang tepat sebelum dua puluh.";
const SUARA_E5 = "Sebelum dua puluh ada sembilan belas. Jadi bilangan misterius adalah sembilan belas.";
const SUARA_E6 = "Petunjuk ketiga. Bilangan ini sepuluh ditambah dua. Sepuluh ditambah dua menjadi dua belas.";
const rantai = (kiri: string, kanan: string, arah: string, u = 26): Obj[] => [
  ...kartuAngka("ka", 40, 70, kiri, W.krem, 76, 50, u),
  teks("pn", 150, 104, arah, 22, W.biru),
  ...kartuAngka("kb", 184, 70, kanan, W.pink, 76, 50, u),
];

export const ADEGAN_DETEKTIF: AdeganStory = {
  id: "detektif",
  judul: "Detektif bilangan misterius",
  sumber: "Materi: detektif bilangan",
  latar: "#F5F3FF",
  ketukan: [
    k(SUARA_E1, tambah(0, judul("Detektif bilangan")), tambah("Igil", emo("ig", 70, 100, OWL, 46), emo("lp", 112, 118, "\u{1F50D}", 26)), tambah("misterius", teks("qq", 220, 118, "?", 50, W.ungu))),
    k(SUARA_E2, bersih(0), tambah(0, judul("Petunjuk pertama")), tambah("pertama.", ...rantai("14", "?", "→")), tambah("setelah", teks("pt", 150, 160, "setelah 14", 11, W.ungu))),
    k(SUARA_E3, ubah("lima", { id: "kb-t", isi: "15" }), ubah("lima", { id: "kb-k", warna: W.hijauMuda }), tambah("Jadi", emo("ok", 150, 190, "✅", 24))),
    k(SUARA_E4, bersih(0), tambah(0, judul("Petunjuk kedua")), tambah("kedua.", ...rantai("?", "20", "→")), tambah("sebelum", teks("pt", 150, 160, "sebelum 20", 11, W.ungu))),
    k(SUARA_E5, ubah("sembilan", { id: "ka-t", isi: "19" }), ubah("sembilan", { id: "ka-k", warna: W.hijauMuda }), tambah("Jadi", emo("ok", 150, 190, "✅", 24))),
    k(
      SUARA_E6,
      bersih(0),
      tambah(0, judul("Petunjuk ketiga")),
      tambah("ketiga.", ...rantai("10 + 2", "?", "=", 20)),
      ubah("menjadi", { id: "kb-t", isi: "12" }),
      ubah("menjadi", { id: "kb-k", warna: W.hijauMuda }),
      tambah("Bilangan", teks("pt", 150, 160, "sepuluh dan dua lagi", 10.6, W.ungu)),
    ),
  ],
};

/* ------------------------------ 2. Latihan 1: isi kotak sepuluh ------------------------------ */
const SUARA_A1 = "Latihan satu. Ada delapan belas kelereng. Seret kelereng ke kotak sepuluh sampai penuh.";
const SUARA_A2 = "Satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh. Kotak sudah penuh.";
const SUARA_A3 = "Sisanya ada di luar kotak. Hitung sisanya. Satu, dua, tiga, empat, lima, enam, tujuh, delapan.";
const SUARA_A4 = "Sepuluh ditambah delapan menjadi delapan belas. Ada delapan belas kelereng. Hebat sekali!";
const S18 = sebar(18, 118, 188);
const posA2 = urutBilangan(SUARA_A2, 1, 10);
const KX = 85;
const KY = 30;

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan 1: isi kotak sepuluh",
  sumber: "Materi: latihan isi kotak sepuluh",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Latihan 1"), ...bingkai("lk", KX, KY)),
      tambah("kelereng.", ...S18.flatMap((p, i) => benda("kelereng", `ly${i}`, p.x, p.y, 7, i))),
      tambah("delapan", ...kartu("lt", 80, 88, 140, 20, W.krem, ["18 kelereng, kotak 10"], 9.2)),
      tambah("Seret", tangan(262, 100)),
    ),
    k(
      SUARA_A2,
      hapus(0, "tg", "lt-k", "lt-t0"),
      ...posA2.map((p, i) => ubah(p, { id: `ly${i}`, x: pusatSel(i, KX, KY).x, y: pusatSel(i, KX, KY).y })),
      tambah("penuh.", teks("lp", 150, 100, "kotak penuh: 10", 9.4, W.hijau)),
    ),
    k(
      SUARA_A3,
      hapus(0, "lp"),
      sorotkan("luar", ...Array.from({ length: 8 }, (_, i) => `ly${10 + i}`)),
      ...hitungAksi(SUARA_A3, "ly", S18, { setelah: "sisanya.", awal: 10, turun: 0, naik: 13 }),
    ),
    k(
      SUARA_A4,
      redamkan(0, ...Array.from({ length: 8 }, (_, i) => `ly${10 + i}`)),
      tambah("Sepuluh", ...kartu("lj", 80, 92, 140, 22, W.emas, ["10 + 8 = 18"], 11)),
      tambah("Hebat", emo("ok", 262, 62, "✅", 28)),
    ),
  ],
};

/* ------------------------------ 3. Latihan 2: ikat sepuluh sedotan ------------------------------ */
const SUARA_B1 = "Latihan dua. Ada enam belas sedotan. Pilih tepat sepuluh sedotan, lalu ikat.";
const SUARA_B2 = "Ketuk sedotan satu per satu sampai sepuluh. Satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh.";
const SUARA_B3 = "Tekan ikat. Sepuluh sedotan menjadi satu ikat. Sisanya kita pisahkan di sebelah kanan.";
const SUARA_B4 = "Sekarang hitung yang tidak diikat. Satu, dua, tiga, empat, lima, enam.";
const SUARA_B5 = "Sepuluh ditambah enam menjadi enam belas. Ada enam belas sedotan. Betul!";
const P16: Titik[] = Array.from({ length: 16 }, (_, i) => ({ x: 38 + (i % 8) * 32, y: 70 + Math.floor(i / 8) * 54 }));
const PIKAT: Titik[] = Array.from({ length: 16 }, (_, i) => (i < 10 ? { x: 44 + (i % 5) * 22, y: 70 + Math.floor(i / 5) * 34 } : { x: 190 + ((i - 10) % 3) * 34, y: 70 + Math.floor((i - 10) / 3) * 34 }));

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan 2: ikat sepuluh sedotan",
  sumber: "Materi: latihan ikat sepuluh",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Latihan 2")),
      tambah("sedotan,", ...P16.flatMap((p, i) => benda("sedotan", `sd${i}`, p.x, p.y, 7.4, i))),
      tambah("Ada", ...kartu("st", 80, 150, 140, 22, W.krem, ["16 sedotan, ikat 10"], 9.2)),
    ),
    k(SUARA_B2, hapus(0, "st-k", "st-t0"), ...hitungAksi(SUARA_B2, "sd", P16.slice(0, 10), { setelah: "sepuluh.", naik: 17, turun: 0 })),
    k(
      SUARA_B3,
      hapus(0, ...Array.from({ length: 10 }, (_, i) => `sdn${i}`)),
      tambah("ikat.", ikat("ik", 28, 50, 128, 80), ...kartu("it", 30, 150, 124, 22, W.merahMuda, ["10 sedotan = 1 ikat"], 8.6)),
      ...P16.map((_, i) => ubah(i < 10 ? "Sepuluh" : "kanan.", { id: `sd${i}`, x: PIKAT[i].x, y: PIKAT[i].y })),
    ),
    k(SUARA_B4, ...hitungAksi(SUARA_B4, "sd", PIKAT, { setelah: "diikat.", awal: 10, turun: 0, naik: 17 })),
    k(SUARA_B5, tambah("Sepuluh", ...kartu("sj", 170, 150, 124, 22, W.emas, ["10 + 6 = 16"], 10)), tambah("Betul!", emo("ok", 262, 186, "✅", 24))),
  ],
};

/* ------------------------------ 4. Latihan 3: membaca dan memilih lambang ------------------------------ */
const SUARA_C1 = "Latihan tiga. Baca nama bilangan ini, dua belas. Lalu cari lambangnya di antara tiga kartu.";
const SUARA_C2 = "Ucapkan lagi mengikuti suara guru. Dua belas.";
const SUARA_C3 = "Dua belas ditulis dengan angka satu dan angka dua. Ketuk kartu dua belas.";
const SUARA_C4 = "Betul! Lambang dua belas adalah satu dan dua. Hebat sekali!";
const PILIH = ["12", "15", "20"];
const kartuPilih = (): Obj[] => PILIH.flatMap((t, i) => kartuAngka(`pl${i}`, 20 + i * 90, 110, t, [W.krem, W.langit, W.pink][i], 70, 50, 26));

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan 3: baca dan pilih lambang",
  sumber: "Materi: latihan membaca lambang",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_C1, tambah(0, judul("Latihan 3")), tambah("Baca", teks("nm", 150, 66, "dua belas", 24, W.ungu)), tambah("kartu.", ...kartuPilih())),
    k(SUARA_C2, tambah("Ucapkan", emo("uc", 150, 178, "\u{1F5E3}", 30)), sorotkan("Dua", "nm")),
    k(SUARA_C3, hapus(0, "uc"), redamkan(0, "nm"), tambah("Ketuk", tangan(55, 176)), sorotkan("Ketuk", "pl0-k")),
    k(SUARA_C4, hapus(0, "tg"), tambah("Betul!", emo("ok", 55, 178, "✅", 30)), tambah("Hebat", emo("ow", 245, 178, OWL, 34))),
  ],
};

/* ------------------------------ 5. Penutup ------------------------------ */
const SUARA_Z1 = "Mari kita ingat lagi. Menghitung benda: ketuk satu benda, sebut satu bilangan. Ayo kita ulangi bersama-sama.";
const SUARA_Z2 = "Isi kotak sepuluh dulu sampai penuh. Lalu hitung sisanya. Sepuluh ditambah sisa menjadi bilangan sebelas sampai dua puluh.";
const SUARA_Z3 = "Kita sudah belajar membaca nama bilangan dan menulis lambangnya, dari sebelas sampai dua puluh. Kamu pasti bisa melakukannya sendiri.";
const SUARA_Z4 = "Hebat sekali, anak-anak! Sampai jumpa di pelajaran berikutnya.";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: mari ingat lagi",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Mari ingat lagi")), tambah("ketuk", ...kartu("p1", 14, 34, 272, 34, W.hijauMuda, ["ketuk satu, sebut satu bilangan"], 9.6), emo("p1e", 276, 62, "\u{1F446}", 18))),
    k(SUARA_Z2, tambah("Isi", ...kartu("p2", 14, 78, 272, 34, W.langit, ["10 dulu, lalu sisanya"], 9.6)), tambah("Sepuluh@2", ...kartu("p3", 14, 122, 272, 34, W.krem, ["10 + sisa = 11 sampai 20"], 9.6))),
    k(SUARA_Z3, tambah("membaca", ...kartu("p4", 14, 166, 272, 28, W.pink, ["baca dan tulis: 11 sampai 20"], 9.6))),
    k(SUARA_Z4, bersih(0), tambah(0, judul("Sampai jumpa!"), emo("sj", 150, 110, OWL, 56)), tambah("anak-anak!", emo("pa", 80, 150, "\u{1F389}", 30), emo("pb", 220, 150, "\u{1F389}", 30))),
  ],
};
