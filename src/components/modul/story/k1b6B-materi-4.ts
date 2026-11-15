import type { AdeganStory, Aksi, Obj } from "./logika-story";
import { OWL, W, bingkai, deret, emo, judul, kartu, kartuAngka, pusatSel, teks, type Titik } from "./k1b6B-gambar";
import { bersih, hapus, hitungAksi, k, redamkan, sorotkan, tambah, ubah } from "./k1b6B-bantu";

const baris = (n: number, y: number, x0 = 28, dx = 38): Titik[] => Array.from({ length: n }, (_, i) => ({ x: x0 + i * dx, y }));
const idr = (p: string, a: number, b: number): string[] => Array.from({ length: b - a }, (_, i) => `${p}${a + i}`);
/** Tiga kartu pilihan bilangan (id c1, c2, c3), pojok kiri-atas di tinggi `y`. */
const pilihan = (y: number, isi: string[]): Obj[] => isi.flatMap((t, i) => kartuAngka(`c${i + 1}`, [20, 110, 200][i], y, t, [W.hijauMuda, W.pink, W.langit][i], 80, 34, 18));

/* ------------------------------ 1. Pilih cara yang paling mudah ------------------------------ */
const SUARA_C1 = "Setiap soal boleh dikerjakan dengan cara yang paling mudah. Pilih cara yang menurutmu paling cepat dan benar.";
const SUARA_C2 = "Sembilan ditambah dua sama dengan sebelas. Bilangannya kecil, jadi cukup maju dua langkah.";
const SUARA_C3 = "Sembilan ditambah enam sama dengan lima belas. Sembilan hampir sepuluh, jadi kita genapkan sepuluh dulu.";
const SUARA_C4 = "Tujuh ditambah delapan sama dengan lima belas. Dua bilangan ini hampir kembar, jadi pakai penjumlahan berulang.";
const SUARA_C5 = "Dua belas ditambah lima sama dengan tujuh belas. Ada puluhan dan satuan, jadi pakai nilai tempat.";
const SUARA_C6 = "Semua cara itu benar. Pilih cara yang paling mudah untukmu, lalu periksa hasilnya.";
const kartuCara = (id: string, y: number, warna: string, a: string, b: string): Obj[] => kartu(id, 14, y, 272, 34, warna, [a, b], 9.4);

export const ADEGAN_PILIH: AdeganStory = {
  id: "pilih-cara",
  judul: "Memilih cara yang paling mudah",
  sumber: "Materi: memilih cara termudah",
  latar: "#F5F3FF",
  ketukan: [
    k(SUARA_C1, tambah(0, judul("Pilih cara termudah")), tambah("Setiap", emo("ow", 150, 108, OWL, 50)), tambah("cepat", teks("tx", 150, 160, "pilih yang paling mudah", 10, W.ungu))),
    k(SUARA_C2, hapus(0, "ow", "tx"), tambah("Sembilan", ...kartuCara("c1", 30, W.hijauMuda, "hitung maju", "9 + 2 = 11"))),
    k(SUARA_C3, tambah("Sembilan", ...kartuCara("c2", 68, W.langit, "genapkan 10", "9 + 6 = 15"))),
    k(SUARA_C4, tambah("Tujuh", ...kartuCara("c3", 106, W.pink, "hampir kembar", "7 + 8 = 15"))),
    k(SUARA_C5, tambah("Dua", ...kartuCara("c4", 144, W.krem, "nilai tempat", "12 + 5 = 17"))),
    k(SUARA_C6, bersih(0), tambah(0, judul("Semua cara benar")), tambah("Semua", emo("ow", 150, 108, OWL, 50)), tambah("Pilih", ...kartu("pz", 40, 140, 220, 30, W.emas, ["pilih yang paling mudah"], 10.6))),
  ],
};

/* ------------------------------ 2. Soal cerita ------------------------------ */
const SUARA_Q1 = "Dalam soal cerita ada kata yang memberi petunjuk. Kata jumlah, digabung, semuanya, dan datang lagi menandakan penjumlahan.";
const SUARA_Q2 = "Ada dua belas anak ayam di kandang. Datang lagi tiga anak ayam. Berapa semuanya?";
const SUARA_Q3 = "Datang lagi artinya digabung. Jadi kita jumlahkan. Dua belas ditambah tiga sama dengan lima belas.";
const SUARA_Q4 = "Kita boleh memilih cara apa saja. Dari dua belas, kita maju: tiga belas, empat belas, lima belas.";
const SUARA_Q5 = "Jawabannya lima belas anak ayam. Hebat! Kamu sudah bisa menyelesaikan soal cerita penjumlahan.";
const AYAM12: Titik[] = Array.from({ length: 12 }, (_, i) => ({ x: 34 + (i % 6) * 46, y: 64 + Math.floor(i / 6) * 30 }));
const AYAM3: Titik[] = Array.from({ length: 3 }, (_, i) => ({ x: 34 + i * 46, y: 124 }));
const ayam = (id: string, p: Titik): Obj => emo(id, p.x, p.y, "\u{1F425}", 18);

export const ADEGAN_SOAL_CERITA: AdeganStory = {
  id: "soal-cerita",
  judul: "Soal cerita penjumlahan",
  sumber: "Materi: soal cerita penjumlahan",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, judul("Kata petunjuk")),
      tambah("jumlah,", ...kartu("w1", 14, 40, 134, 30, W.hijauMuda, ["jumlah"], 11)),
      tambah("digabung,", ...kartu("w2", 156, 40, 134, 30, W.langit, ["digabung"], 11)),
      tambah("semuanya,", ...kartu("w3", 14, 84, 134, 30, W.pink, ["semuanya"], 11)),
      tambah("lagi", ...kartu("w4", 156, 84, 134, 30, W.krem, ["datang lagi"], 11)),
    ),
    k(
      SUARA_Q2,
      bersih(0),
      tambah(0, judul("Anak ayam di kandang")),
      tambah("Ada", ...AYAM12.map((p, i) => ayam(`ay${i}`, p)), ...kartu("aq", 30, 152, 240, 22, W.krem, ["12 anak ayam, datang lagi 3"], 9.4)),
      tambah("Datang", ...AYAM3.map((p, i) => ayam(`ay${12 + i}`, p))),
      tambah("Berapa", emo("tn", 262, 130, "❓", 26)),
    ),
    k(
      SUARA_Q3,
      hapus(0, "tn", "aq-k", "aq-t0"),
      sorotkan("digabung.", ...idr("ay", 0, 15)),
      tambah("Dua", ...kartu("qj", 60, 150, 180, 26, W.emas, ["12 + 3 = 15"], 11)),
    ),
    k(
      SUARA_Q4,
      redamkan(0, ...idr("ay", 0, 15)),
      hapus(0, "qj-k", "qj-t0"),
      tambah("maju:", ...kartu("qm", 40, 150, 220, 26, W.hijauMuda, ["12 → 13 → 14 → 15"], 11)),
    ),
    k(
      SUARA_Q5,
      tambah("Jawabannya", emo("ow", 262, 100, OWL, 30)),
      tambah("Hebat!", emo("ok", 262, 140, "✅", 26)),
      sorotkan("Kamu", ...idr("ay", 12, 15)),
    ),
  ],
};

/* ------------------------------ 3. Detektif hitung ------------------------------ */
const SUARA_D1 = "Igil menjadi detektif hitung. Ada anak yang bilang dua belas ditambah tiga jawabannya enam belas. Ayo kita periksa.";
const SUARA_D2 = "Langkah pertama: dua belas dipisah menjadi sepuluh dan dua. Langkah ini benar.";
const SUARA_D3 = "Langkah kedua: dua ditambah tiga sama dengan lima. Langkah ini juga benar.";
const SUARA_D4 = "Langkah ketiga: sepuluh ditambah lima. Anak itu menjawab enam belas, padahal sepuluh ditambah lima sama dengan lima belas.";
const SUARA_D5 = "Detektif Igil menemukan kesalahannya. Jawaban yang benar adalah lima belas. Hebat sekali!";
const langkah = (id: string, y: number, warna: string, a: string, b: string): Obj[] => kartu(id, 14, y, 272, 34, warna, [a, b], 9.4);

export const ADEGAN_DETEKTIF: AdeganStory = {
  id: "detektif",
  judul: "Detektif hitung",
  sumber: "Materi: detektif hitung",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Detektif hitung")),
      tambah("Igil", ...kartu("dc", 14, 34, 272, 30, W.krem, ["12 + 3 = 16?"], 14), emo("ig", 36, 58, OWL, 24)),
      tambah("periksa.", emo("lp", 262, 58, "\u{1F50D}", 22)),
    ),
    k(SUARA_D2, tambah("pertama:", ...langkah("d1", 70, W.hijauMuda, "Langkah 1", "12 = 10 + 2")), sorotkan("benar.", "d1-k")),
    k(SUARA_D3, redamkan(0, "d1-k"), tambah("kedua:", ...langkah("d2", 106, W.hijauMuda, "Langkah 2", "2 + 3 = 5")), sorotkan("benar.", "d2-k")),
    k(
      SUARA_D4,
      redamkan(0, "d2-k"),
      tambah("ketiga:", ...langkah("d3", 142, W.merahMuda, "Langkah 3", "10 + 5 = 16?")),
      ubah("padahal", { id: "d3-k", sorot: true }),
      ubah("belas.@2", { id: "d3-t1", isi: "10 + 5 = 15" }),
      ubah("belas.@2", { id: "d3-k", warna: W.hijauMuda }),
    ),
    k(
      SUARA_D5,
      redamkan(0, "d3-k"),
      ubah("benar", { id: "dc-t0", isi: "12 + 3 = 15" }),
      ubah("benar", { id: "dc-k", warna: W.emas }),
      tambah("Hebat", emo("ok", 262, 190, "✅", 26)),
    ),
  ],
};

/* ------------------------------ 4. Latihan 1: menghitung maju ------------------------------ */
const SUARA_A1 = "Latihan satu. Halim punya delapan donat, lalu dapat empat donat lagi. Berapa jumlahnya?";
const SUARA_A2 = "Hitung maju dari delapan. Sembilan, sepuluh, sebelas, dua belas.";
const SUARA_A3 = "Bilangan terakhir adalah dua belas. Pilih jawaban yang benar. Ketuk bilangan yang tepat.";
const SUARA_A4 = "Betul! Delapan ditambah empat sama dengan dua belas. Hebat sekali!";
const LA8 = baris(8, 60, 30, 34);
const LB4 = baris(4, 112, 30, 34);

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan 1: menghitung maju",
  sumber: "Materi: latihan menghitung maju",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Latihan 1")),
      tambah("delapan", ...deret("donat", "a", LA8, 8)),
      tambah("empat", ...deret("donat", "b", LB4, 8)),
      tambah("Berapa", ...kartu("lq", 60, 26, 180, 20, W.krem, ["8 + 4 = ?"], 10.6)),
    ),
    k(SUARA_A2, ...hitungAksi(SUARA_A2, "b", LB4, { dari: 9 })),
    k(
      SUARA_A3,
      hapus(0, "tg"),
      sorotkan("terakhir", "b3", "bn3"),
      tambah("Pilih", ...pilihan(150, ["11", "12", "13"])),
      tambah("Ketuk", emo("tj", 150, 198, "\u{1F446}", 20)),
    ),
    k(
      SUARA_A4,
      hapus(0, "tj"),
      sorotkan("Betul!", "c2-k"),
      ubah("Delapan", { id: "lq-t0", isi: "8 + 4 = 12" }),
      ubah("Delapan", { id: "lq-k", warna: W.emas }),
      tambah("Hebat", emo("ok", 262, 124, "✅", 26)),
    ),
  ],
};

/* ------------------------------ 5. Latihan 2: genapkan sepuluh ------------------------------ */
const SUARA_B1 = "Latihan dua. Ada sembilan balon di kotak sepuluh dan empat balon di luar. Genapkan sepuluh dulu.";
const SUARA_B2 = "Seret satu balon dari luar ke petak yang kosong. Sembilan ditambah satu menjadi sepuluh.";
const SUARA_B3 = "Sisa balon ada tiga. Sepuluh ditambah tiga menjadi tiga belas.";
const SUARA_B4 = "Jadi sembilan ditambah empat sama dengan tiga belas. Betul! Hebat sekali!";
const KX = 85;
const KY = 34;
const RB = 6.5;
const BALON_LUAR = baris(4, 140, 70, 60);
const pindahBalon = (at: string | number, id: string, p: Titik): Aksi => ({ at, ubah: [{ id, x: p.x, y: p.y }, { id: `${id}-x`, x: p.x, y: p.y + RB * 0.9 }] });

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan 2: genapkan sepuluh",
  sumber: "Materi: latihan genapkan sepuluh",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Latihan 2"), ...bingkai("lb", KX, KY)),
      tambah("sembilan", ...deret("balon", "o", Array.from({ length: 9 }, (_, i) => pusatSel(i, KX, KY)), RB)),
      tambah("empat", ...deret("balon", "p", BALON_LUAR, RB, {})),
      tambah("kotak", ...kartu("lp", 60, 92, 180, 20, W.krem, ["kotak sepuluh: 10 petak"], 8.8)),
    ),
    k(
      SUARA_B2,
      hapus(0, "lp-k", "lp-t0"),
      ubah("Seret", { id: "lb-c9", warna: "#FECACA" }),
      pindahBalon("kosong.", "p0", pusatSel(9, KX, KY)),
      tambah("Sembilan", ...kartu("lj", 60, 96, 180, 22, W.emas, ["9 + 1 = 10"], 11)),
    ),
    k(
      SUARA_B3,
      ubah(0, ...Array.from({ length: 10 }, (_, i) => ({ id: `lb-c${i}`, warna: "#FEF08A" }))),
      sorotkan("tiga.", "p1", "p2", "p3"),
      tambah("Sepuluh", ...kartu("ls", 40, 174, 220, 20, W.hijauMuda, ["10 + 3 = 13"], 10)),
    ),
    k(
      SUARA_B4,
      redamkan(0, "p1", "p2", "p3"),
      hapus(0, "lj-k", "lj-t0"),
      tambah("Jadi", ...kartu("lz", 60, 96, 180, 24, W.emas, ["9 + 4 = 13"], 11)),
      tambah("Betul!", emo("ok", 262, 190, "✅", 26)),
    ),
  ],
};

/* ------------------------------ 6. Latihan 3: nilai tempat ------------------------------ */
const SUARA_E1 = "Latihan tiga. Berapa empat belas ditambah lima? Pakai nilai tempat, satuan dengan satuan dulu.";
const SUARA_E2 = "Satuan dulu. Empat ditambah lima sama dengan sembilan. Puluhannya tetap satu.";
const SUARA_E3 = "Satu puluhan dan sembilan satuan adalah sembilan belas. Ketuk jawaban yang benar.";
const SUARA_E4 = "Betul! Empat belas ditambah lima sama dengan sembilan belas. Hebat sekali!";

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan 3: nilai tempat",
  sumber: "Materi: latihan nilai tempat",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_E1, tambah(0, judul("Latihan 3")), tambah("Berapa", ...kartu("lq", 50, 40, 200, 44, W.krem, ["14 + 5 = ?"], 22))),
    k(SUARA_E2, tambah("Empat", ...kartu("ln", 50, 100, 200, 26, W.langit, ["4 + 5 = 9"], 12)), sorotkan("tetap", "lq-k")),
    k(SUARA_E3, redamkan(0, "lq-k"), tambah("Satu", ...pilihan(146, ["17", "19", "20"])), tambah("Ketuk", emo("tj", 150, 198, "\u{1F446}", 20))),
    k(
      SUARA_E4,
      hapus(0, "tj"),
      sorotkan("Betul!", "c2-k"),
      ubah("sembilan", { id: "lq-t0", isi: "14 + 5 = 19" }),
      ubah("sembilan", { id: "lq-k", warna: W.emas }),
      tambah("Hebat", emo("ok", 262, 120, "✅", 26)),
    ),
  ],
};

/* ------------------------------ 7. Penutup ------------------------------ */
const SUARA_Z1 = "Mari kita ingat lagi. Cara pertama, menghitung maju: mulai dari bilangan yang besar, lalu maju.";
const SUARA_Z2 = "Cara kedua, genapkan sepuluh: isi dulu kotak sepuluh sampai penuh, lalu tambahkan sisanya.";
const SUARA_Z3 = "Cara lain adalah penjumlahan berulang, pasangan bilangan, dan nilai tempat. Pilih cara yang paling mudah untukmu.";
const SUARA_Z4 = "Hebat sekali, anak-anak! Sampai jumpa di pelajaran berikutnya.";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: mari ingat lagi",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Mari ingat lagi")), tambah("pertama,", ...kartu("p1", 14, 34, 272, 34, W.hijauMuda, ["maju dari bilangan yang besar"], 9.6), emo("p1e", 276, 62, "\u{1F446}", 18))),
    k(SUARA_Z2, tambah("kedua,", ...kartu("p2", 14, 78, 272, 34, W.langit, ["isi 10 dulu, lalu sisanya"], 9.6))),
    k(SUARA_Z3, tambah("lain", ...kartu("p3", 14, 122, 272, 34, W.krem, ["kembar, pasangan, nilai tempat"], 9.6)), tambah("Pilih", ...kartu("p4", 14, 166, 272, 28, W.pink, ["pilih cara yang paling mudah"], 9.6))),
    k(SUARA_Z4, bersih(0), tambah(0, judul("Sampai jumpa!"), emo("sj", 150, 110, OWL, 56)), tambah("anak-anak!", emo("pa", 80, 150, "\u{1F389}", 30), emo("pb", 220, 150, "\u{1F389}", 30))),
  ],
};
