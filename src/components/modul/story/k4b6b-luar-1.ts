import type { AdeganStory } from "./logika-story";
import { W, diagramMendatar, diagramTegak, emo, garis, judul, kartu, kotak, teks } from "./k4b6b-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k4b6b-bantu";

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Empat metode dari luar untuk membaca dan membuat diagram batang",
  sumber: "Metode luar: pembuka; angka Buku Siswa hlm. 187–194",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Bagaimana membaca dan membuat diagram batang dengan benar? Guru di berbagai negara punya cara berbeda. Dalam video ini kita lihat empat metode dari luar, memakai angka buku.",
      tambah(0, judul("Empat metode dari luar")),
      tambah("berbagai", emo("gl", 150, 100, "🌍", 56)),
      tambah("empat", ...kartu("pa", 40, 140, 220, 34, W.krem, ["diagram batang: baca dan buat"], 9.6)),
    ),
    k(
      "Empat metode itu: Bar Scale, Axis Labels, Compare Bars, dan Table to Bar.",
      bersih(0),
      tambah(0, judul("Empat metode")),
      tambah("Bar", ...kartu("m1", 12, 34, 276, 30, W.hijauMuda, ["1. Bar Scale"], 9.6)),
      tambah("Axis", ...kartu("m2", 12, 72, 276, 30, W.langit, ["2. Axis Labels"], 9.6)),
      tambah("Compare", ...kartu("m3", 12, 110, 276, 30, W.krem, ["3. Compare Bars"], 9.6)),
      tambah("Table", ...kartu("m4", 12, 148, 276, 30, W.pink, ["4. Table to Bar"], 9.6)),
    ),
    k(
      "Masing-masing menjawab satu pertanyaan: berapa nilai batang ini, apa yang diukur sumbunya, batang mana yang lebih besar, dan bagaimana membuat diagram dari tabel?",
      bersih(0),
      tambah(0, judul("Empat pertanyaan")),
      tambah("berapa", emo("i1", 45, 80, "📏", 34), teks("i1t", 45, 112, "berapa nilai?", 8.6, W.biru)),
      tambah("apa", emo("i2", 112, 80, "🏷", 34), teks("i2t", 112, 112, "apa diukur?", 8.6, W.biru)),
      tambah("batang@2", emo("i3", 188, 80, "⚖", 34), teks("i3t", 188, 112, "mana lebih?", 8.6, W.biru)),
      tambah("bagaimana", emo("i4", 255, 80, "📊", 34), teks("i4t", 255, 112, "cara buat?", 8.6, W.biru)),
    ),
    k(
      "Angkanya dari buku: ekstrakurikuler sembilan, lomba lima belas dan tiga, PORSENI delapan dan dua, benda di meja guru empat, satu, tiga, satu, dua, dan suku bangsa sepuluh, tujuh, tujuh.",
      bersih(0),
      tambah(0, judul("Angka dari buku")),
      tambah("ekstrakurikuler", ...kartu("a1", 20, 34, 260, 26, W.hijauMuda, ["ekstrakurikuler: sepak bola 9"], 9.6)),
      tambah("lomba", ...kartu("a2", 20, 68, 260, 26, W.merahMuda, ["lomba: matematika 15, puisi 3"], 9.6)),
      tambah("PORSENI", ...kartu("a3", 20, 102, 260, 26, W.krem, ["PORSENI: menyanyi 8, renang 2"], 9.6)),
      tambah("meja", ...kartu("a4", 20, 136, 260, 26, W.langit, ["meja guru: 4, 1, 3, 1, 2"], 9.6)),
      tambah("suku", ...kartu("a5", 20, 170, 260, 24, W.pink, ["suku bangsa: 10, 7, 7"], 9.6)),
    ),
  ],
};

/* ------------------------------ 2. Bar Scale: konsep ------------------------------ */
const EKS = diagramTegak(
  "bs",
  38,
  40,
  232,
  100,
  [
    { nama: "Sepak Bola", nilai: 9 },
    { nama: "Tari", nilai: 1 },
    { nama: "Menyanyi", nilai: 5 },
    { nama: "Catur", nilai: 2 },
    { nama: "Basket", nilai: 6 },
  ],
  10,
  1,
  { judulNilai: "Banyak Siswa", judulNama: "Ekstrakurikuler", ukuranNama: 6.6 },
);
export const ADEGAN_LUAR_BS: AdeganStory = {
  id: "luar-bs",
  judul: "Metode 1: Bar Scale (Skala Batang)",
  sumber: "Metode luar: Bar Scale; angka Buku Siswa hlm. 188",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Metode pertama, Bar Scale atau Skala Batang. Nilai sebuah batang dibaca di ujungnya: tarik garis datar dari ujung batang ke angka pada sumbu.",
      tambah(0, judul("Bar Scale"), ...EKS.sumbu, ...EKS.nama, ...EKS.batang.flat()),
      tambah("tarik", garis("bsp", 61.2, 50, -23.2, 0, W.merah, 1.6, { putus: true })),
      sorotkan("sumbu.", "bs-y9"),
      tambah("sumbu.", ...kartu("bc", 14, 174, 272, 22, W.hijauMuda, ["ujung batang ke sumbu: 9 siswa"], 9.2)),
    ),
    k(
      "Langkah pertama, periksa skalanya: naik satu-satu, dua-dua, atau sepuluh-sepuluh. Langkah kedua, baca garis yang tepat dengan ujung batang. Basket tepat di garis enam.",
      sorotkan("Basket", "bs-b4"),
      ubah("Basket", { id: "bs-y9", sorot: false }),
      tambah("Basket", garis("bsq", 246.8, 80, -208.8, 0, W.merah, 1.6, { putus: true })),
      sorotkan("enam.", "bs-y6"),
      ubah("pertama,", { id: "bc-t0", isi: "1. cek skala   2. baca garis yang tepat" }, { id: "bc-k", warna: W.krem }),
      ubah("Basket", { id: "bc-t0", isi: "basket: tepat di garis 6" }, { id: "bc-k", warna: W.langit }),
    ),
    k(
      "Bila ujung batang berada di antara dua garis, nilainya di tengah keduanya. Pada skala dua, di antara dua dan empat berarti tiga.",
      bersih(0),
      tambah(0, judul("Di antara dua garis")),
      tambah("Bila", garis("rl", 100, 40, 0, 120, W.hitam, 1.6), garis("rl0", 94, 150, 12, 0, W.hitam, 1.4), garis("rl2", 94, 110, 12, 0, W.hitam, 1.4), garis("rl4", 94, 70, 12, 0, W.hitam, 1.4)),
      tambah("antara", teks("rt0", 88, 152, "0", 8, W.hitam, { anchor: "end" }), teks("rt2", 88, 112, "2", 8, W.hitam, { anchor: "end" }), teks("rt4", 88, 72, "4", 8, W.hitam, { anchor: "end" })),
      tambah("ujung", kotak("rb", 130, 90, 40, 60, W.batang, W.biru, { rx: 0 })),
      tambah("tengah", garis("rp", 100, 90, 70, 0, W.merah, 1.6, { putus: true }), teks("rq", 88, 92, "?", 9, W.merah, { anchor: "end" })),
      tambah("tiga.", teks("rr", 220, 90, "(2 + 4) ÷ 2 = 3", 10, W.hitam)),
    ),
  ],
};

/* ------------------------------ 3. Bar Scale: penerapan pada lomba kelas IV ------------------------------ */
const LOMBA = diagramTegak(
  "bt",
  38,
  40,
  232,
  100,
  [
    { nama: "Matematika", nilai: 15 },
    { nama: "IPA", nilai: 6 },
    { nama: "B. Inggris", nilai: 11 },
    { nama: "Puisi", nilai: 3 },
    { nama: "Peng. Umum", nilai: 6 },
  ],
  16,
  2,
  { judulNilai: "Banyak Siswa", judulNama: "Lomba", ukuranNama: 6.2 },
);
export const ADEGAN_LUAR_BS_TERAPAN: AdeganStory = {
  id: "luar-bs-terapan",
  judul: "Bar Scale: membaca lomba kelas IV pada skala dua",
  sumber: "Metode luar: Bar Scale; angka Buku Siswa hlm. 191",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Terapan pada Ayo Berlatih nomor satu, lomba kelas empat. Skalanya naik dua-dua dari nol sampai enam belas. Batangnya kita baca dari ujung, tanpa melihat angkanya dulu.",
      tambah(0, judul("Skala naik dua-dua"), ...LOMBA.sumbu, ...LOMBA.nama),
      tambah("Batangnya", ...LOMBA.batang.map((b) => b[0])),
    ),
    k(
      "Batang IPA tepat di garis enam, jadi enam siswa. Bahasa Inggris di antara garis sepuluh dan dua belas, tengahnya sebelas siswa.",
      sorotkan("IPA", "bt-b1"),
      tambah("IPA", ...kartu("btc", 14, 174, 272, 22, W.hijauMuda, ["IPA: tepat di garis 6"], 9.2)),
      tambah("enam,", LOMBA.batang[1][1]),
      ubah("Bahasa", { id: "bt-b1", sorot: false }),
      sorotkan("Bahasa", "bt-b2"),
      ubah("tengahnya", { id: "btc-t0", isi: "B. Inggris: (10 + 12) ÷ 2 = 11" }, { id: "btc-k", warna: W.krem }),
      tambah("sebelas", LOMBA.batang[2][1]),
    ),
    k(
      "Matematika di antara garis empat belas dan enam belas. Tengahnya lima belas, jadi lima belas siswa.",
      ubah(0, { id: "bt-b2", sorot: false }),
      sorotkan("Matematika", "bt-b0"),
      ubah("Tengahnya", { id: "btc-t0", isi: "Matematika: (14 + 16) ÷ 2 = 15" }, { id: "btc-k", warna: W.langit }),
      tambah("lima@2", LOMBA.batang[0][1]),
    ),
    k(
      "Puisi di antara garis dua dan empat. Tengahnya tiga, jadi puisi tiga siswa, yang paling sedikit. Sisanya, Pengetahuan Umum, tepat di garis enam.",
      ubah(0, { id: "bt-b0", sorot: false }),
      sorotkan("Puisi", "bt-b3"),
      ubah("Tengahnya", { id: "btc-t0", isi: "Puisi: (2 + 4) ÷ 2 = 3" }, { id: "btc-k", warna: W.merahMuda }),
      tambah("tiga@2", LOMBA.batang[3][1]),
      tambah("Pengetahuan", LOMBA.batang[4][1]),
    ),
    k(
      "Cek akhir: jumlah kelima lomba, lima belas tambah enam tambah sebelas tambah tiga tambah enam sama dengan empat puluh satu siswa.",
      ubah(0, { id: "bt-b3", sorot: false }),
      ubah("Cek", { id: "btc-t0", isi: "15 + 6 + 11 + 3 + 6 = 41 siswa" }, { id: "btc-k", warna: W.hijauMuda }),
    ),
  ],
};

/* ------------------------------ 4. Axis Labels: konsep ------------------------------ */
const AL = diagramTegak(
  "al",
  38,
  40,
  232,
  100,
  [
    { nama: "Sepak Bola", nilai: 9 },
    { nama: "Tari", nilai: 1 },
    { nama: "Menyanyi", nilai: 5 },
    { nama: "Catur", nilai: 2 },
    { nama: "Basket", nilai: 6 },
  ],
  10,
  1,
  { judulNilai: "Banyak Siswa", judulNama: "Ekstrakurikuler", ukuranNama: 6.6 },
);
const AL_JUDUL = AL.sumbu.filter((o) => /-j[vn]$/.test(o.id));
const AL_POLOS = AL.sumbu.filter((o) => !/-j[vn]$/.test(o.id));
export const ADEGAN_LUAR_AL: AdeganStory = {
  id: "luar-al",
  judul: "Metode 2: Axis Labels (Label Sumbu)",
  sumber: "Metode luar: Axis Labels; angka Buku Siswa hlm. 188",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Metode kedua, Axis Labels atau Label Sumbu. Bayangkan diagram batang tanpa tulisan di sumbunya. Batang tertinggi menunjukkan sembilan, tetapi sembilan apa?",
      tambah(0, judul("Axis Labels"), ...AL_POLOS, ...AL.batang.flat()),
      tambah("tertinggi", teks("alq", 150, 76, "9 apa?", 14, W.merah)),
      sorotkan("sembilan,", "al-b0"),
    ),
    k(
      "Beri label pada tiap sumbu. Sumbu datar bertuliskan ekstrakurikuler, sumbu tegak bertuliskan banyak siswa, dan tiap batang diberi namanya.",
      { at: 0, hapus: ["alq"] },
      ubah(0, { id: "al-b0", sorot: false }),
      tambah("datar", AL_JUDUL[1], ...AL.nama),
      tambah("tegak", AL_JUDUL[0]),
    ),
    k(
      "Sekarang jelas: sembilan siswa mengikuti sepak bola. Label sumbu mengubah angka kosong menjadi informasi yang bermakna.",
      sorotkan("sembilan", "al-b0"),
      tambah("sembilan", ...kartu("alc", 14, 174, 272, 22, W.hijauMuda, ["9 siswa ikut sepak bola"], 9.6)),
    ),
    k(
      "Aturannya tiga: beri label sumbu kategori, beri label sumbu nilai lengkap dengan satuannya, dan beri judul diagram.",
      bersih(0),
      tambah(0, judul("Tiga aturan label")),
      tambah("kategori,", ...kartu("ar1", 14, 36, 272, 34, W.hijauMuda, ["1. label sumbu kategori"], 9.6)),
      tambah("nilai", ...kartu("ar2", 14, 80, 272, 34, W.krem, ["2. label sumbu nilai + satuan"], 9.6)),
      tambah("judul", ...kartu("ar3", 14, 124, 272, 34, W.langit, ["3. judul diagram"], 9.6)),
    ),
  ],
};

/* ------------------------------ 5. Axis Labels: penerapan pada bunga di taman ------------------------------ */
const BUNGA = diagramMendatar(
  "at",
  56,
  36,
  210,
  120,
  [
    { nama: "anggrek", nilai: 7 },
    { nama: "melati", nilai: 8 },
    { nama: "matahari", nilai: 3 },
    { nama: "sepatu", nilai: 4 },
    { nama: "kertas", nilai: 9 },
    { nama: "mawar", nilai: 5 },
  ],
  10,
  1,
  { judulNama: "Bunga", judulNilai: "Banyaknya Bunga", ukuranNama: 6.8 },
);
export const ADEGAN_LUAR_AL_TERAPAN: AdeganStory = {
  id: "luar-al-terapan",
  judul: "Axis Labels: bunga di taman bermain sekolah",
  sumber: "Metode luar: Axis Labels; angka Buku Siswa hlm. 192",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Terapan pada Ayo Berlatih nomor dua, diagram mendatar. Sumbu tegak diberi label bunga dan berisi nama enam bunga. Sumbu datar diberi label banyaknya bunga, dari nol sampai sepuluh.",
      tambah(0, judul("Diagram mendatar berlabel")),
      tambah("Sumbu", ...BUNGA.sumbu.filter((o) => /-j[n]$/.test(o.id))),
      tambah("nama", ...BUNGA.nama),
      tambah("datar@2", ...BUNGA.sumbu.filter((o) => !/-jn$/.test(o.id))),
    ),
    k(
      "Dengan label banyaknya bunga, batang kertas yang berakhir di angka sembilan terbaca jelas: sembilan bunga kertas. Mawar lima, melati delapan.",
      tambah("kertas", ...BUNGA.batang[4]),
      sorotkan("kertas", "at-b4"),
      tambah("sembilan", ...BUNGA.batang.filter((_, i) => i !== 4).flat()),
      tambah("sembilan", ...kartu("atc", 14, 178, 272, 20, W.hijauMuda, ["9 bunga kertas"], 9)),
    ),
    k(
      "Perhatikan, peran sumbu bertukar. Pada diagram tegak, nilai ada di sumbu tegak dan kita lihat tinggi. Pada diagram mendatar, nilai ada di sumbu datar dan kita lihat lebar.",
      bersih(0),
      tambah(0, judul("Peran sumbu bertukar")),
      tambah("tegak,", ...kartu("pt1", 14, 40, 272, 44, W.hijauMuda, ["diagram tegak", "nilai di sumbu tegak: lihat tinggi"], 9.2)),
      tambah("mendatar,", ...kartu("pt2", 14, 100, 272, 44, W.krem, ["diagram mendatar", "nilai di sumbu datar: lihat lebar"], 9.2)),
    ),
    k(
      "Singkatnya, label sumbu menjawab dua pertanyaan: apa yang dibandingkan, dan dalam satuan apa nilainya dihitung. Dua jawaban itu harus selalu tertulis.",
      bersih(0),
      tambah(0, judul("Dua pertanyaan label")),
      tambah("apa", ...kartu("pu1", 14, 40, 272, 40, W.langit, ["apa yang dibandingkan?", "contoh: jenis bunga"], 9.2)),
      tambah("satuan", ...kartu("pu2", 14, 96, 272, 40, W.krem, ["satuan nilainya?", "contoh: banyaknya bunga"], 9.2)),
    ),
  ],
};
