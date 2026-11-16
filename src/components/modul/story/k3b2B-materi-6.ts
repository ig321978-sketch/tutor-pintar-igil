import type { AdeganStory } from "./logika-story";
import { OWL, W, emo, judul, kartu, kalimat, pilihan } from "./k3b2B-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah } from "./k3b2B-bantu";

/* ------------------------------ 17. Latihan 1: titik-titik di tengah ------------------------------ */
const SUARA_A1 = "Latihan satu. Lima puluh enam kurang titik-titik sama dengan dua puluh empat.";
const SUARA_A2 = "Berapa bilangan untuk titik-titik itu? Ketuk jawabannya. Delapan puluh, tiga puluh dua, atau tiga puluh?";
const SUARA_A3 = "Betul! Titik-titik di tengah, jadi kita kurangi. Lima puluh enam kurang dua puluh empat sama dengan tiga puluh dua.";
const SUARA_A4 = "Hati-hati. Delapan puluh muncul bila kita menambah, padahal seharusnya mengurangi.";

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan 1: titik-titik di tengah",
  sumber: "Materi: latihan titik-titik di tengah",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_A1, tambah(0, judul("Latihan 1")), tambah("Lima", kalimat("ks", 64, "56 − … = 24", 30))),
    k(SUARA_A2, tambah("Berapa", ...pilihan(94, ["80", "32", "30"]))),
    k(SUARA_A3, sorotkan("Betul!", "c2-k"), tambah("Lima", kalimat("hit", 160, "56 − 24 = 32", 24, W.merah)), ubah("tiga", { id: "ks", isi: "56 − 32 = 24" }), tambah("Betul!", emo("ok", 262, 160, "✅", 24))),
    k(SUARA_A4, redamkan(0, "c2-k"), sorotkan("Delapan", "c1-k")),
  ],
};

/* ------------------------------ 18. Latihan 2: titik-titik di depan ------------------------------ */
const SUARA_B1 = "Latihan dua. Titik-titik kurang dua puluh tiga sama dengan empat puluh dua.";
const SUARA_B2 = "Berapa bilangan awalnya? Ketuk jawabannya. Sembilan belas, lima puluh lima, atau enam puluh lima?";
const SUARA_B3 = "Betul! Titik-titik di depan, jadi kita tambahkan. Empat puluh dua tambah dua puluh tiga sama dengan enam puluh lima.";
const SUARA_B4 = "Hati-hati. Sembilan belas muncul bila kita mengurangi, padahal seharusnya menambah.";

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan 2: titik-titik di depan",
  sumber: "Materi: latihan titik-titik di depan",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_B1, tambah(0, judul("Latihan 2")), tambah("Titik-titik", kalimat("ks", 64, "… − 23 = 42", 30))),
    k(SUARA_B2, tambah("Berapa", ...pilihan(94, ["19", "55", "65"]))),
    k(SUARA_B3, sorotkan("Betul!", "c3-k"), tambah("Empat", kalimat("hit", 160, "42 + 23 = 65", 24, W.merah)), ubah("enam", { id: "ks", isi: "65 − 23 = 42" }), tambah("Betul!", emo("ok", 262, 160, "✅", 24))),
    k(SUARA_B4, redamkan(0, "c3-k"), sorotkan("Sembilan", "c1-k")),
  ],
};

/* ------------------------------ 19. Latihan 3: cerita bebek ------------------------------ */
const SUARA_C1 = "Latihan tiga. Halim punya tujuh puluh ekor bebek. Sebagian dijual, dan tersisa dua puluh lima ekor.";
const SUARA_C2 = "Berapa ekor bebek yang dijual? Ketuk jawabannya. Empat puluh lima, sembilan puluh lima, atau lima puluh lima?";
const SUARA_C3 = "Betul! Tujuh puluh kurang dua puluh lima sama dengan empat puluh lima.";
const SUARA_C4 = "Kita periksa. Tujuh puluh kurang empat puluh lima sama dengan dua puluh lima, jadi benar.";

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan 3: cerita bebek",
  sumber: "Materi: latihan cerita bebek",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Latihan 3"), emo("eh", 40, 56, "\u{1F466}", 28)),
      tambah("tujuh", emo("bb", 110, 56, "\u{1F986}", 30), emo("bc", 150, 56, "\u{1F986}", 30), kalimat("ks", 100, "70 − … = 25", 26)),
      tambah("tersisa", ...kartu("sr", 190, 34, 96, 28, W.hijauMuda, ["sisa: 25"], 11)),
    ),
    k(SUARA_C2, tambah("Berapa", ...pilihan(122, ["45", "95", "55"]))),
    k(SUARA_C3, sorotkan("Betul!", "c1-k"), hapus(0, "c2-k", "c2-t", "c3-k", "c3-t"), tambah("Tujuh", kalimat("hit", 176, "70 − 25 = 45", 22, W.merah))),
    k(SUARA_C4, redamkan(0, "c1-k"), tambah("periksa.", kalimat("per", 198, "70 − 45 = 25", 14), emo("ok", 262, 198, "✅", 20))),
  ],
};

/* ------------------------------ 20. Empat langkah ------------------------------ */
const LANGKAH = [
  { e: "\u{1F4D6}", t: "1. baca kalimatnya", w: W.hijauMuda },
  { e: "\u{1F440}", t: "2. lihat bilangan dan titik-titik", w: W.langit },
  { e: "➕", t: "3. kurangkan atau tambahkan", w: W.krem },
  { e: "✅", t: "4. periksa hasilnya", w: W.pink },
];
const baris = (i: number) => [...kartu(`l${i}`, 50, 30 + i * 42, 236, 34, LANGKAH[i].w, [LANGKAH[i].t], 10), emo(`le${i}`, 30, 54 + i * 42, LANGKAH[i].e, 24)];
const SUARA_D1 = "Ini empat langkah untuk mengisi kalimat Matematika.";
const SUARA_D2 = "Langkah satu, baca kalimat Matematikanya dengan teliti.";
const SUARA_D3 = "Langkah dua, lihat bilangan yang sudah diketahui dan letak titik-titik.";
const SUARA_D4 = "Langkah tiga, kurangkan bila titik-titik di tengah, dan tambahkan bila titik-titik di depan.";
const SUARA_D5 = "Langkah empat, periksa hasilnya dengan mengurangkan lagi.";

export const ADEGAN_CARA_LANGKAH: AdeganStory = {
  id: "cara-langkah",
  judul: "Empat langkah mengisi kalimat",
  sumber: "Materi: empat langkah",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_D1, tambah(0, judul("Empat langkah"), emo("ow", 150, 120, OWL, 56))),
    k(SUARA_D2, hapus(0, "ow"), tambah("Langkah", ...baris(0))),
    k(SUARA_D3, tambah("Langkah", ...baris(1))),
    k(SUARA_D4, tambah("Langkah", ...baris(2))),
    k(SUARA_D5, tambah("Langkah", ...baris(3))),
  ],
};

/* ------------------------------ 21. Penutup ------------------------------ */
const SUARA_Z1 = "Mari kita ingat lagi. Bentuk pengurangan yang memuat titik-titik disebut kalimat Matematika.";
const SUARA_Z2 = "Titik-titik di tengah dicari dengan mengurangkan bilangan awal dan sisa.";
const SUARA_Z3 = "Titik-titik di depan dicari dengan menambahkan bilangan yang dikurangkan dan sisa.";
const SUARA_Z4 = "Jangan lupa memeriksa jawabanmu. Hebat sekali, anak-anak! Igil bangga padamu. Sampai jumpa!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: mari ingat lagi",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Mari ingat lagi")), tambah("pengurangan", ...kartu("p1", 14, 34, 272, 42, W.hijauMuda, ["kalimat Matematika:", "3 − … = 1"], 11))),
    k(SUARA_Z2, tambah("tengah", ...kartu("p2", 14, 84, 272, 42, W.langit, ["di tengah: awal − sisa", "80 − 45 = 35"], 11))),
    k(SUARA_Z3, tambah("depan", ...kartu("p3", 14, 134, 272, 42, W.krem, ["di depan: dikurangkan + sisa", "45 + 27 = 72"], 11))),
    k(SUARA_Z4, bersih(0), tambah(0, judul("Sampai jumpa!"), emo("sj", 150, 110, OWL, 56)), tambah("anak-anak!", emo("pa", 80, 150, "\u{1F389}", 30), emo("pb", 220, 150, "\u{1F389}", 30))),
  ],
};
