import type { AdeganStory } from "./logika-story";
import { W, bandingBatang, emo, garis, kontinum, kotak, letakPenunjuk, panah, penunjuk, skala, tasBola, teks } from "./k6b4a-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah } from "./k6b4a-bantu";

/* ------------------------------ L1. Dari buku ke metode luar ------------------------------ */
const kartuMetode = (id: string, x: number, y: number, warna: string, nama: string[], arti: string) => [kotak(`${id}-k`, x, y, 134, 66, warna, W.biru, { rx: 10 }), ...nama.map((n, i) => teks(`${id}-n${i}`, x + 67, y + 18 + i * 12, n, 8.6)), teks(`${id}-a`, x + 67, y + 18 + nama.length * 12 + 6, arti, 7, W.ungu)];

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Dari buku ke metode luar",
  sumber: "Metode dari luar buku; contoh dari Buku Siswa hlm. 104–114",
  latar: "#EAF2FF",
  ketukan: [
    k("Video ini berbeda dari video materi. Di sini kita belajar metode dari luar buku, yang memperdalam skala peluang.", tambah("materi", emo("buku", 80, 100, "📘", 44), teks("bk", 80, 132, "video materi", 9)), tambah("metode", emo("dunia", 220, 100, "🌐", 44), teks("lr", 220, 132, "metode luar", 9, W.merah)), tambah("memperdalam", panah("ar", 190, 100, -76, 0, W.hijau, 4, { gambar: true })), tambah("skala", teks("sk", 150, 176, "skala peluang jadi lebih dalam", 10, W.hijau))),
    k("Ada empat metode luar. Pertama, Likelihood Spectrum Scale, skala kemungkinan bertingkat.", bersih(0), tambah(0, teks("jud", 150, 22, "Empat metode luar", 12, W.ungu)), tambah("Likelihood", kartuMetode("m1", 12, 34, "#FDE68A", ["Likelihood", "Spectrum Scale"], "skala bertingkat"))),
    k("Kedua, Impossible-Certain Continuum, garis dari mustahil sampai pasti. Ketiga, Qualitative Probability Language, bahasa peluang sehari-hari.", tambah("Impossible-Certain", kartuMetode("m2", 154, 34, "#FBCFE8", ["Impossible-Certain", "Continuum"], "mustahil sampai pasti")), tambah("Qualitative", kartuMetode("m3", 12, 108, "#BBF7D0", ["Qualitative", "Probability Language"], "bahasa peluang"))),
    k("Keempat, Experimental Relative Frequency, peluang dari hasil percobaan. Semuanya memakai contoh dan angka dari buku Dhien.", tambah("Experimental", kartuMetode("m4", 154, 108, "#BFDBFE", ["Experimental", "Relative Frequency"], "hasil percobaan")), tambah("Semuanya", emo("dhien", 150, 100, "👧", 24))),
  ],
};

/* ------------------------------ L2. Likelihood Spectrum Scale: konsep ------------------------------ */
const BARIS_ATURAN = [
  ["k = 0", "Tidak mungkin", "#FECACA"],
  ["2 × k kurang dari n", "Kurang mungkin", "#FED7AA"],
  ["2 × k sama dengan n", "Mungkin", "#D9F99D"],
  ["2 × k lebih dari n (k belum sama dengan n)", "Sangat mungkin", "#A5F3FC"],
  ["k = n", "Pasti", "#BFDBFE"],
];
const barisAturan = (i: number) => [kotak(`ar${i}`, 10, 34 + i * 30, 170, 26, W.putih, W.biru, { rx: 6 }), teks(`ar${i}t`, 18, 51 + i * 30, BARIS_ATURAN[i][0], 7.4, W.biru, { anchor: "start" }), panah(`ar${i}p`, 184, 47 + i * 30, 14, 0, W.biru, 2), kotak(`ar${i}h`, 202, 34 + i * 30, 88, 26, BARIS_ATURAN[i][2], W.biru, { rx: 6 }), teks(`ar${i}n`, 246, 51 + i * 30, BARIS_ATURAN[i][1], 8)];
const BATANG_LSS = bandingBatang("bb", 60, 170, 12, 10, "2 × k", "n");
const SB = skala("sb", 30, 28, 240);
const SA = skala("sa", 30, 108, 240);
const CONTOH_TAS = [..."rrrrrrbbbb"].map((c) => (c === "r" ? "#EF4444" : "#3B82F6"));

export const ADEGAN_LUAR_LSS: AdeganStory = {
  id: "luar-lss",
  judul: "Likelihood Spectrum Scale: aturan separuh",
  sumber: "Metode luar; contoh dari Buku Siswa hlm. 108",
  latar: "#FFF1D6",
  ketukan: [
    k("Metode pertama: Likelihood Spectrum Scale. Ini skala kemungkinan yang dipakai di prakiraan cuaca, penilaian risiko, dan laporan ilmiah.", tambah(0, teks("jud", 150, 30, "Likelihood Spectrum Scale", 13, W.ungu)), tambah("cuaca", emo("cuaca", 60, 100, "⛅", 38), teks("cu", 60, 128, "prakiraan cuaca", 8)), tambah("risiko", emo("risiko", 150, 100, "⚠️", 38), teks("rs", 150, 128, "penilaian risiko", 8)), tambah("ilmiah", emo("ilmu", 240, 100, "🔬", 38), teks("il", 240, 128, "laporan ilmiah", 8))),
    k("Idenya sederhana: ubah kata-kata menjadi tingkat yang berurutan, dan beri aturan supaya semua orang menempatkan kejadian di tempat yang sama.", bersih(0), tambah("kata-kata", teks("w1", 60, 40, "mungkin", 11), teks("w2", 150, 40, "agak mungkin", 11), teks("w3", 240, 40, "hampir pasti", 11)), tambah("tingkat", ...[0, 1, 2, 3, 4].map((i) => kotak(`t${i}`, 70 + i * 32, 130 - i * 10, 28, 20 + i * 10, ["#FECACA", "#FED7AA", "#D9F99D", "#A5F3FC", "#BFDBFE"][i], W.biru, { rx: 2 })), panah("tp", 150, 62, 0, 30, W.biru, 3, { gambar: true })), tambah("aturan", emo("aturan", 36, 150, "📏", 30)), tambah("semua", emo("orang", 262, 150, "👥", 30))),
    k("Aturan separuh untuk skala lima tangga. Langkah satu: hitung kejadian yang cocok. Langkah dua: hitung semua yang ada.", bersih(0), tambah(0, tasBola("ts", 28, 78, CONTOH_TAS), teks("jud", 150, 28, "Tas: 6 bola merah dan 4 bola biru", 10)), sorotkan("cocok", ...[0, 1, 2, 3, 4, 5].map((i) => `ts-b${i}`)), tambah("cocok", teks("kk", 220, 80, "k = 6", 20, W.merah), teks("kt", 220, 94, "yang cocok (merah)", 7.5)), redamkan("semua", ...[0, 1, 2, 3, 4, 5].map((i) => `ts-b${i}`)), sorotkan("semua", ...[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => `ts-b${i}`)), tambah("semua", teks("nn", 220, 130, "n = 10", 20, W.biru), teks("nt", 220, 144, "semua yang ada", 7.5))),
    k("Langkah tiga: bandingkan dua kali k dengan n. Kalau k nol, tidak mungkin. Kalau k sama dengan n, pasti.", bersih(0), tambah(0, teks("jud", 150, 22, "Langkah 3: bandingkan 2 × k dengan n", 9.5, W.ungu)), tambah("tidak", barisAturan(0)), tambah("pasti", barisAturan(4))),
    k("Kalau dua kali k kurang dari n, kurang mungkin. Kalau sama dengan n, mungkin. Kalau lebih dari n, tetapi k belum sama dengan n, sangat mungkin.", tambah(7, barisAturan(1)), tambah(13, barisAturan(2)), tambah(24, barisAturan(3))),
    k("Contoh: 6 bola merah dari 10 bola. Dua kali 6 sama dengan 12. Angka 12 lebih dari 10, jadi sangat mungkin.", bersih(0), tambah(0, teks("jud", 150, 24, "k = 6 dan n = 10", 11, W.ungu)), tambah(5, BATANG_LSS.slice(3)), tambah(12, BATANG_LSS.slice(0, 3)), tambah(19, teks("hs", 232, 100, "sangat", 14, W.merah), teks("hs2", 232, 116, "mungkin", 14, W.merah))),
    k("Perhatikan: aturan separuh membandingkan dengan semua bola. Buku membandingkan dengan warna lain, sehingga buku putih 3 dari 10 ditaruh di mungkin. Aturan separuh menaruhnya di kurang mungkin.", bersih(0), tambah(0, SB.semua, SA.semua, teks("lb", 16, 20, "BUKU", 8, W.ungu, { anchor: "start" }), teks("la", 16, 100, "ATURAN SEPARUH", 8, W.ungu, { anchor: "start" })), tambah("Buku", kotak("pb", SB.xs[2] - 11, 62, 22, 16, W.putih, W.biru, { rx: 2 }), teks("pbt", SB.xs[2], 88, "putih 3 dari 10", 8, W.merah)), tambah("Aturan@2", kotak("pa", SA.xs[1] - 11, 142, 22, 16, W.putih, W.biru, { rx: 2 }), teks("pat", SA.xs[1], 168, "putih 3 dari 10", 8, W.merah))),
    k("Keduanya boleh dipakai, asal kita konsisten dan menyebut aturan yang dipakai. Itulah gunanya metode: menolong dua orang sepakat.", bersih(0), tambah("konsisten", emo("a", 80, 100, "👦", 40), emo("b", 220, 100, "👧", 40)), tambah("menyebut", teks("ar", 150, 52, "aturan yang sama", 12, W.ungu)), tambah("sepakat", emo("salam", 150, 100, "🤝", 36), teks("sp", 150, 160, "sepakat di tempat yang sama", 10, W.hijau))),
  ],
};

/* ------------------------------ L3. Likelihood Spectrum Scale diterapkan ------------------------------ */
const TABEL = [
  ["buku merah", "6 dari 10", "2 × 6 = 12 > 10", "sangat mungkin", "#A5F3FC"],
  ["buku putih", "3 dari 10", "2 × 3 = 6 < 10", "kurang mungkin", "#FED7AA"],
  ["buku kuning", "1 dari 10", "2 × 1 = 2 < 10", "kurang mungkin", "#FED7AA"],
  ["buku hijau", "0 dari 10", "k = 0", "tidak mungkin", "#FECACA"],
  ["koin gambar", "1 dari 2", "2 × 1 = 2 = 2", "mungkin", "#D9F99D"],
  ["dadu: angka 3", "3 dari 6", "2 × 3 = 6 = 6", "mungkin", "#D9F99D"],
  ["dadu: angka 2", "2 dari 6", "2 × 2 = 4 < 6", "kurang mungkin", "#FED7AA"],
  ["dadu 8 sisi: semua 5", "8 dari 8", "k = n", "pasti", "#BFDBFE"],
];
const barisTabel = (i: number) => {
  const y = 38 + i * 19;
  const [a, b, c, d, w] = TABEL[i];
  return [kotak(`rw${i}`, 6, y, 288, 17, W.putih, W.abu, { rx: 4, tebal: 1 }), teks(`rw${i}a`, 10, y + 12, a, 7, W.biru, { anchor: "start" }), teks(`rw${i}b`, 100, y + 12, b, 7, W.biru, { anchor: "start" }), teks(`rw${i}c`, 148, y + 12, c, 6.6, W.merah, { anchor: "start" }), kotak(`rw${i}d`, 226, y + 1, 66, 15, w, "none", { rx: 7 }), teks(`rw${i}e`, 259, y + 11.5, d, 6.2)];
};
export const ADEGAN_LUAR_LSS_TERAPAN: AdeganStory = {
  id: "luar-lss-terapan",
  judul: "Aturan separuh diterapkan pada contoh buku",
  sumber: "Metode luar; angka dari Buku Siswa hlm. 108 dan 110",
  latar: "#F0FDF4",
  ketukan: [
    k("Terapkan pada rak buku Dhien: 3 buku putih, 6 buku merah, 1 buku kuning, jumlahnya 10 buku.", tambah(0, teks("jud", 150, 22, "Aturan separuh pada contoh buku", 11, W.ungu), teks("h1", 10, 34, "benda", 7, W.ungu, { anchor: "start" }), teks("h2", 100, 34, "k dari n", 7, W.ungu, { anchor: "start" }), teks("h3", 148, 34, "2 × k lawan n", 7, W.ungu, { anchor: "start" }), teks("h4", 259, 34, "tangga", 7, W.ungu)), tambah("putih", emo("rak", 150, 130, "📚", 40)), tambah("jumlahnya", teks("jm", 150, 168, "3 + 6 + 1 = 10 buku", 11, W.merah))),
    k("Merah: k sama dengan 6. Dua kali 6 sama dengan 12, lebih dari 10, jadi sangat mungkin.", hapus(0, "rak", "jm"), tambah(0, barisTabel(0))),
    k("Putih: k sama dengan 3. Dua kali 3 sama dengan 6, kurang dari 10, jadi kurang mungkin. Kuning: k sama dengan 1, dua kali 1 sama dengan 2, juga kurang mungkin.", tambah(0, barisTabel(1)), tambah("Kuning", barisTabel(2))),
    k("Hijau: tidak ada buku hijau, jadi k sama dengan 0 dan kejadiannya tidak mungkin.", tambah(0, barisTabel(3))),
    k("Koin dua sisi, sisi gambar: k sama dengan 1 dan n sama dengan 2. Dua kali 1 sama dengan 2, sama dengan n, jadi mungkin.", tambah(0, barisTabel(4))),
    k("Dadu enam sisi dari Latihan 4.1: angka 3 muncul 3 kali, dua kali 3 sama dengan 6, sama dengan 6, jadi mungkin. Angka 2 muncul 2 kali, dua kali 2 sama dengan 4, kurang dari 6, jadi kurang mungkin.", ubah("Latihan", { id: "jud", isi: "Aturan separuh: contoh buku dan Latihan 4.1" }), tambah("3", barisTabel(5)), tambah("Angka@2", barisTabel(6))),
    k("Dadu delapan sisi yang semua sisinya angka 5: k sama dengan 8 dan n sama dengan 8, jadi pasti.", tambah(0, barisTabel(7))),
    k("Dengan satu aturan yang sama, siapa pun akan menaruh kejadian di tempat yang sama. Itu kekuatan Likelihood Spectrum Scale.", sorotkan("siapa", ...TABEL.flatMap((_, i) => [`rw${i}d`])), tambah("kekuatan", emo("bintang", 150, 198, "⭐", 14))),
  ],
};

/* ------------------------------ L4. Impossible-Certain Continuum: konsep ------------------------------ */
const KX = 30;
const KW = 240;
const KONT = kontinum("kt", KX, 86, KW, 24);

export const ADEGAN_LUAR_KONTINUM: AdeganStory = {
  id: "luar-kontinum",
  judul: "Impossible-Certain Continuum: garis tanpa kotak",
  sumber: "Metode luar; Buku Panduan Guru hlm. 118",
  latar: "#FDF2F8",
  ketukan: [
    k("Metode kedua: Impossible-Certain Continuum. Kontinum berarti garis yang bersambung, tanpa kotak pemisah.", tambah(0, teks("jud", 150, 34, "Impossible-Certain Continuum", 12, W.ungu)), tambah("garis", KONT), tambah("tanpa", teks("tp", 150, 140, "bersambung, tanpa kotak pemisah", 10, W.merah))),
    k("Dua ujungnya dikunci. Ujung kiri adalah mustahil, yaitu nol yang cocok. Ujung kanan adalah pasti, yaitu semuanya cocok.", tambah("kiri", garis("pinkiri", KX, 76, 0, 44, W.biru, 3), teks("tkiri", 46, 134, "mustahil", 10, W.merah), teks("tkiri2", 46, 148, "0 yang cocok", 8)), tambah("kanan", garis("pinkanan", KX + KW, 76, 0, 44, W.biru, 3), teks("tkanan", 254, 134, "pasti", 10, W.biru), teks("tkanan2", 254, 148, "semua cocok", 8))),
    k("Kejadian lain berada di antara dua ujung. Makin banyak yang cocok, makin ke kanan penunjuknya.", hapus(0, "tp"), tambah("antara", penunjuk("pn", KX, KW, 84, 2, 10), teks("pnt", letakPenunjuk(KX, KW, 2, 10), 70, "2 dari 10", 9, W.merah)), ubah("banyak", { id: "pn", x: letakPenunjuk(KX, KW, 5, 10) }, { id: "pnt", x: letakPenunjuk(KX, KW, 5, 10), isi: "5 dari 10" }), ubah("kanan", { id: "pn", x: letakPenunjuk(KX, KW, 8, 10) }, { id: "pnt", x: letakPenunjuk(KX, KW, 8, 10), isi: "8 dari 10" })),
    k("Bedanya dengan lima tangga: penunjuk boleh berhenti di mana saja. Jadi 6 dari 10 dan 7 dari 10 punya tempat yang berbeda.", hapus(0, "pn", "pnt"), tambah("berhenti", penunjuk("p6", KX, KW, 84, 6, 10, W.merah), teks("p6t", letakPenunjuk(KX, KW, 6, 10), 70, "6 dari 10", 9, W.merah)), tambah("7", penunjuk("p7", KX, KW, 84, 7, 10, W.hijau), teks("p7t", letakPenunjuk(KX, KW, 7, 10) + 14, 70, "7 dari 10", 9, W.hijau)), tambah("berbeda", teks("bd", 150, 176, "tempat berbeda, tidak harus satu kotak", 9.5, W.ungu))),
    k("Buku Panduan Guru juga menyebut kategori boleh ditambah atau dikurangi. Yang wajib hanya titik pasti dan titik tidak mungkin di kedua ujung.", bersih(0), tambah(0, KONT, garis("pinkiri", KX, 76, 0, 44, W.biru, 3), garis("pinkanan", KX + KW, 76, 0, 44, W.biru, 3)), tambah("ditambah", ...[1, 2, 3, 4, 5, 6, 7].map((i) => garis(`tk${i}`, KX + (KW * i) / 8, 76, 0, 44, W.biru, 1.5, { putus: true }))), hapus("dikurangi", "tk1", "tk3", "tk5", "tk7"), sorotkan("wajib", "pinkiri", "pinkanan"), tambah("titik@2", teks("wj", 150, 150, "yang wajib: dua ujung", 10, W.merah))),
  ],
};

/* ------------------------------ L5. Kontinum diterapkan: mengubah isi tas ------------------------------ */
const WARNA_R = "#EF4444";
const WARNA_B = "#3B82F6";
const AWAL_TAS = [WARNA_R, WARNA_R, WARNA_R, WARNA_R, WARNA_B, WARNA_B, WARNA_B, WARNA_B, WARNA_B, WARNA_B];
const KONT2 = kontinum("k2", KX, 150, KW, 18);
const ganti = (i: number, warna: string) => ({ id: `tb-b${i}`, warna });
const geser = (kk: number, isi: string) => [{ id: "pt", x: letakPenunjuk(KX, KW, kk, 10) }, { id: "ptt", isi }];

export const ADEGAN_LUAR_TAS: AdeganStory = {
  id: "luar-kontinum-tas",
  judul: "Menggeser penunjuk dengan mengganti bola",
  sumber: "Metode luar; angka bola dari Buku Siswa hlm. 108",
  latar: "#F5F3FF",
  ketukan: [
    k("Bayangkan tas berisi 10 bola. Ada 4 bola merah. Penunjuk ada di 4 dari 10.", tambah(0, tasBola("tb", 28, 58, AWAL_TAS), KONT2, teks("lm", KX, 184, "mustahil", 8, W.merah, { anchor: "start" }), teks("lp", KX + KW, 184, "pasti", 8, W.biru, { anchor: "end" })), tambah(12, penunjuk("pt", KX, KW, 148, 4, 10), teks("ptt", 218, 78, "4 dari 10", 14, W.merah)), tambah("merah", teks("kt", 218, 94, "bola merah", 8))),
    k("Ganti satu bola biru menjadi merah. Sekarang 5 dari 10, penunjuk bergeser ke kanan.", ubah("merah", ganti(4, WARNA_R), { id: "tb-b4", sorot: true }), ubah("Sekarang", ...geser(5, "5 dari 10"))),
    k("Terus ganti: 6, 7, 8, lalu 9 bola merah dari 10.", ubah(2, ganti(5, WARNA_R), ...geser(6, "6 dari 10")), ubah(3, ganti(6, WARNA_R), ...geser(7, "7 dari 10")), ubah(4, ganti(7, WARNA_R), ...geser(8, "8 dari 10")), ubah(6, ganti(8, WARNA_R), ...geser(9, "9 dari 10")), redamkan(0, "tb-b4")),
    k("Kalau 9 dari 10, apakah sudah pasti? Belum. Masih ada satu bola biru yang bisa terambil.", sorotkan("biru", "tb-b9"), tambah("Belum", teks("bp", 218, 118, "belum pasti!", 12, W.merah))),
    k("Baru ketika 10 dari 10 bola merah, penunjuk sampai di ujung kanan, dan kejadiannya pasti.", hapus(0, "bp"), ubah(0, { id: "tb-b9", sorot: false }), ubah("10@1", ganti(9, WARNA_R), ...geser(10, "10 dari 10")), tambah("pasti", teks("ps", 218, 118, "PASTI", 16, W.biru))),
    k("Sekarang kebalikannya. Ganti bola merah menjadi biru satu per satu sampai 0 dari 10. Penunjuk sampai di ujung kiri, yaitu mustahil.", hapus(0, "ps"), ubah(3, ganti(9, WARNA_B), ganti(8, WARNA_B), ganti(7, WARNA_B), ...geser(7, "7 dari 10")), ubah(7, ...[6, 5, 4, 3].map((i) => ganti(i, WARNA_B)), ...geser(3, "3 dari 10")), ubah(11, ...[2, 1, 0].map((i) => ganti(i, WARNA_B)), ...geser(0, "0 dari 10")), tambah("mustahil", teks("mh", 218, 118, "MUSTAHIL", 14, W.merah))),
    k("Jadi pasti dan mustahil bisa dibuat dengan mengubah isi tas. Itulah cara menghidupkan kontinum.", hapus(0, "mh"), tambah("mengubah", teks("rk", 150, 28, "ubah isi tas, penunjuk ikut bergerak", 10, W.ungu)), tambah("menghidupkan", emo("api", 262, 56, "✨", 22))),
  ],
};
