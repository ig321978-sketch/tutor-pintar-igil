import type { AdeganStory } from "./logika-story";
import { OWL, W, emo, judul, kartu, kartuAngka, papan, pilihan, teks, uraian } from "./k3b1B-gambar";
import { bersih, hapus, idx, k, redamkan, sorotkan, tambah, ubah } from "./k3b1B-bantu";

/* ------------------------------ 13. Empat langkah menentukan nilai tempat ------------------------------ */
const CA = papan("ca", "524", { y0: 44, h: 40, u: 26 });
const LANGKAH = ["1. letakkan di papan", "2. lihat tempat tiap angka", "3. kalikan dengan nilai tempat", "4. jumlahkan untuk mengecek"];
const WARNA_L = [W.hijauMuda, W.langit, W.krem, W.pink];
const rumus = (i: number, isi: string) => teks(`ca_e${i}`, CA.xPusat(i), 104, isi, 9, W.merah);
const SUARA_C1 = "Ada empat langkah untuk menentukan nilai tempat. Kita coba dengan sebuah bilangan tiga angka.";
const SUARA_C2 = "Langkah pertama, letakkan bilangan lima ratus dua puluh empat pada papan tiga tempat.";
const SUARA_C3 = "Langkah kedua, lihat tempat tiap angka. Lima di ratusan, dua di puluhan, empat di satuan.";
const SUARA_C4 = "Langkah ketiga, kalikan angka dengan nilai tempatnya. Lima kali seratus, dua kali sepuluh, empat kali satu.";
const SUARA_C5 = "Langkah keempat, jumlahkan nilainya untuk mengecek. Lima ratus tambah dua puluh tambah empat sama dengan lima ratus dua puluh empat.";

export const ADEGAN_CARA_LANGKAH: AdeganStory = {
  id: "cara-langkah",
  judul: "Empat langkah menentukan nilai tempat",
  sumber: "Materi: empat langkah nilai tempat",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_C1, tambah(0, judul("Empat langkah")), tambah("langkah", ...LANGKAH.flatMap((t, i) => kartu(`s${i + 1}`, 20, 34 + i * 40, 260, 32, WARNA_L[i], [t], 9.4)))),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Langkah 1"), ...CA.dasar),
      tambah("Langkah", ...kartu("st", 30, 118, 240, 26, W.hijauMuda, [LANGKAH[0]], 9.6)),
      tambah(idx(SUARA_C2, "lima"), CA.digit(0)),
      tambah(idx(SUARA_C2, "dua"), CA.digit(1)),
      tambah(idx(SUARA_C2, "empat"), CA.digit(2)),
    ),
    k(
      SUARA_C3,
      ubah(0, { id: "jud", isi: "Langkah 2" }, { id: "st-t0", isi: LANGKAH[1] }, { id: "st-k", warna: WARNA_L[1] }),
      sorotkan(idx(SUARA_C3, "Lima"), "ca_d0"),
      redamkan(idx(SUARA_C3, "dua"), "ca_d0"),
      sorotkan(idx(SUARA_C3, "dua"), "ca_d1"),
      redamkan(idx(SUARA_C3, "empat"), "ca_d1"),
      sorotkan(idx(SUARA_C3, "empat"), "ca_d2"),
    ),
    k(
      SUARA_C4,
      redamkan(0, "ca_d2"),
      ubah(0, { id: "jud", isi: "Langkah 3" }, { id: "st-t0", isi: LANGKAH[2] }, { id: "st-k", warna: WARNA_L[2] }),
      tambah(idx(SUARA_C4, "seratus"), rumus(0, "5 x 100 = 500")),
      tambah(idx(SUARA_C4, "sepuluh"), rumus(1, "2 x 10 = 20")),
      tambah(idx(SUARA_C4, "satu"), rumus(2, "4 x 1 = 4")),
    ),
    k(SUARA_C5, ubah(0, { id: "jud", isi: "Langkah 4" }, { id: "st-t0", isi: LANGKAH[3] }, { id: "st-k", warna: WARNA_L[3] }), tambah("tambah", uraian("ca", 172, "500 + 20 + 4 = 524", 13))),
  ],
};

/* ------------------------------ 14. Latihan 1: nilai sebuah angka ------------------------------ */
const LA = papan("la", "372", { y0: 44, h: 40, u: 26, nilaiY: 114 });
const SUARA_P1 = "Latihan satu. Perhatikan bilangan tiga ratus tujuh puluh dua.";
const SUARA_P2 = "Berapa nilai angka tujuh? Ketuk jawabannya. Tujuh, tujuh puluh, atau tujuh ratus?";
const SUARA_P3 = "Betul! Angka tujuh ada di puluhan, jadi nilainya tujuh puluh.";
const SUARA_P4 = "Hebat! Angka tiga ada di ratusan, jadi nilainya tiga ratus.";

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan 1: nilai sebuah angka",
  sumber: "Materi: latihan nilai angka",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_P1, tambah(0, judul("Latihan 1"), ...LA.dasar), tambah("tiga", LA.digit(0)), tambah("tujuh", LA.digit(1)), tambah(idx(SUARA_P1, "dua"), LA.digit(2))),
    k(SUARA_P2, tambah("Berapa", ...pilihan(132, ["7", "70", "700"])), sorotkan("tujuh?", "la_d1")),
    k(SUARA_P3, sorotkan("Betul!", "c2-k"), tambah("nilainya", LA.nilai(1))),
    k(SUARA_P4, redamkan(0, "c2-k", "la_d1"), sorotkan("Angka", "la_d0"), tambah("nilainya", LA.nilai(0)), tambah("Hebat!", emo("ok", 262, 26, "✅", 22))),
  ],
};

/* ------------------------------ 15. Latihan 2: menyusun bilangan ------------------------------ */
const KL = [
  ["lk0", "400", W.hijauMuda],
  ["lk1", "30", W.langit],
  ["lk2", "9", W.merahMuda],
] as const;
const lk = (i: number) => kartuAngka(KL[i][0], 20 + i * 88, 34, KL[i][1], KL[i][2], 84, 34, 20);
const SUARA_Q1 = "Latihan dua. Susunlah empat ratus, tiga puluh, dan sembilan.";
const SUARA_Q2 = "Bilangan apa yang tersusun? Ketuk jawabannya. Tiga ratus empat puluh sembilan, empat ratus tiga puluh sembilan, atau sembilan ratus tiga puluh empat?";
const SUARA_Q3 = "Betul! Empat ratus ditaruh di ratusan, tiga puluh di puluhan, dan sembilan di satuan.";
const SUARA_Q4 = "Jadi empat ratus, tiga puluh, dan sembilan menjadi empat ratus tiga puluh sembilan.";

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan 2: menyusun bilangan",
  sumber: "Materi: latihan menyusun bilangan",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_Q1, tambah(0, judul("Latihan 2")), tambah("empat", ...lk(0)), tambah("tiga", ...lk(1)), tambah("sembilan.", ...lk(2))),
    k(SUARA_Q2, tambah("Bilangan", ...pilihan(88, ["349", "439", "934"]))),
    k(SUARA_Q3, sorotkan("Betul!", "c2-k"), tambah("ditaruh", uraian("lb", 152, "400 + 30 + 9 = 439", 14))),
    k(SUARA_Q4, tambah("menjadi", teks("lb_n", 150, 186, "439", 20, W.merah)), tambah("Jadi", emo("ok", 262, 186, "✅", 22))),
  ],
};

/* ------------------------------ 16. Latihan 3: peran nol pada tabel ------------------------------ */
const LC = papan("lc", "608", { y0: 44, h: 40, u: 26 });
const SUARA_R1 = "Latihan tiga. Isi tabel untuk bilangan enam ratus delapan.";
const SUARA_R2 = "Angka apa yang harus diisi di tempat puluhan? Ketuk jawabannya. Nol, enam, atau delapan?";
const SUARA_R3 = "Betul! Tidak ada puluhan, jadi angkanya nol. Nol menjaga tempat puluhan.";
const SUARA_R4 = "Nol tetap harus dipasang di sana. Tanpa nol, enam ratus delapan menjadi enam puluh delapan.";

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan 3: peran nol pada tabel",
  sumber: "Materi: latihan peran nol",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Latihan 3"), ...LC.dasar),
      tambah("enam", LC.digit(0)),
      tambah("ratus", { ...LC.digit(1), isi: "?" }),
      tambah("delapan.", LC.digit(2), LC.utuh(106, 16)),
    ),
    k(SUARA_R2, tambah("Angka", ...pilihan(122, ["0", "6", "8"])), sorotkan("puluhan?", "lc_c1")),
    k(SUARA_R3, sorotkan("Betul!", "c1-k"), ubah(idx(SUARA_R3, "nol"), { id: "lc_d1", isi: "0" }), redamkan(idx(SUARA_R3, "nol"), "lc_c1")),
    k(
      SUARA_R4,
      redamkan(0, "c1-k"),
      hapus(0, "c2-k", "c2-t", "c3-k", "c3-t"),
      tambah("Tanpa", ...kartu("lg", 40, 168, 220, 28, W.pink, ["tanpa nol: 68"], 11)),
    ),
  ],
};

/* ------------------------------ 17. Penutup ------------------------------ */
const SUARA_Z1 = "Mari kita ingat lagi. Bilangan tiga angka punya tiga tempat, yaitu ratusan, puluhan, dan satuan.";
const SUARA_Z2 = "Nilai sebuah angka bergantung pada tempatnya. Angka enam bisa bernilai enam ratus, enam puluh, atau enam.";
const SUARA_Z3 = "Kita bisa menyusun bilangan dari ratusan, puluhan, dan satuan. Kita juga bisa mengurai bilangan menjadi tiga bagian.";
const SUARA_Z4 = "Nol menjaga tempat, dan tabel diisi dengan angka. Hebat sekali, anak-anak! Igil bangga padamu. Sampai jumpa!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: mari ingat lagi",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Mari ingat lagi")), tambah("tiga@2", ...kartu("p1", 14, 34, 272, 40, W.hijauMuda, ["tiga tempat pada papan:", "ratusan, puluhan, satuan"], 9.4))),
    k(SUARA_Z2, tambah("Angka", ...kartu("p2", 14, 84, 272, 44, W.langit, ["6 di ratusan = 600", "6 di puluhan = 60, 6 di satuan = 6"], 8.6))),
    k(SUARA_Z3, tambah("menyusun", ...kartu("p3", 14, 138, 272, 44, W.krem, ["menyusun dan mengurai bilangan,", "tabel diisi dengan angka"], 8.8))),
    k(SUARA_Z4, bersih(0), tambah(0, judul("Sampai jumpa!"), emo("sj", 150, 110, OWL, 56)), tambah("anak-anak!", emo("pa", 80, 150, "\u{1F389}", 30), emo("pb", 220, 150, "\u{1F389}", 30))),
  ],
};
