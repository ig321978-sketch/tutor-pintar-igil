import type { AdeganStory } from "./logika-story";
import { W, bulat, emo, kotak, panah, teks } from "./k6b4a-gambar"
import { bersih, k, sorotkan, tambah } from "./k6b4a-bantu"
import { daduTitik } from "./k6b4b-gambar";

/* ------------------------------ LB5. Fair Game Equal Chance Principle: konsep ------------------------------ */
const mukaDadu = (warna: (n: number) => string, y = 70) => [1, 2, 3, 4, 5, 6].flatMap((n, i) => daduTitik(`d${n}`, 30 + i * 48, y, n, 36, warna(n)));
export const ADEGAN_LUAR_B_FAIR: AdeganStory = {
  id: "luarb-fair",
  judul: "Fair Game Equal Chance Principle: peluang tiap pemain sama",
  sumber: "Metode luar; contoh dari Buku Siswa hlm. 118–119",
  latar: "#EFF6FF",
  ketukan: [
    k("Metode ketiga: Fair Game Equal Chance Principle, prinsip permainan adil. Permainan adil bila peluang menang semua pemain sama.", tambah(0, teks("jud", 150, 28, "Fair Game Equal Chance Principle", 10.5, W.ungu)), tambah("adil", emo("adil", 150, 90, "⚖️", 44)), tambah("sama.", teks("s", 150, 150, "peluang semua pemain sama", 12, W.hijau))),
    k("Cara memeriksanya: daftar semua hasil yang mungkin, lalu hitung hasil yang membuat tiap pemain menang.", bersih(0), tambah("daftar", ...mukaDadu(() => W.putih)), tambah("hitung", teks("h1", 80, 130, "hasil menang A", 10, W.biruMuda), teks("h2", 220, 130, "hasil menang B", 10, W.salem)), tambah("menang.", teks("h3", 150, 176, "bandingkan banyaknya", 10, W.ungu))),
    k("Contoh: pemain A menang bila angka ganjil, pemain B bila angka genap. A menang pada 3 hasil dan B menang pada 3 hasil dari 6. Peluang sama, jadi adil.", bersih(0), tambah("ganjil,", ...mukaDadu((n) => (n % 2 === 1 ? "#BFDBFE" : "#FED7AA"))), tambah("3", teks("a", 80, 124, "A: 1, 3, 5  = 3 hasil", 9.5, W.biruMuda)), tambah("3@2", teks("b", 220, 124, "B: 2, 4, 6  = 3 hasil", 9.5, W.salem)), tambah("adil.", teks("c", 150, 170, "3 = 3  →  ADIL", 16, W.hijau))),
    k("Contoh lain: A menang bila muncul 6, B menang bila muncul 1 sampai 5. A hanya punya 1 hasil, B punya 5 hasil dari 6. Peluang berbeda, jadi kurang adil.", bersih(0), tambah("muncul", ...mukaDadu((n) => (n === 6 ? "#BFDBFE" : "#FED7AA"))), tambah("1@2", teks("a", 80, 124, "A: 6  = 1 hasil", 9.5, W.biruMuda)), tambah("5", teks("b", 220, 124, "B: 1–5  = 5 hasil", 9.5, W.salem)), tambah("kurang", teks("c", 150, 170, "1 ≠ 5  →  KURANG ADIL", 14, W.merah))),
    k("Cara memperbaiki: atur syarat menang supaya jumlah hasil menang sama, misalnya A menang pada 1, 2, 3 dan B menang pada 4, 5, 6.", bersih(0), tambah("atur", ...mukaDadu((n) => (n <= 3 ? "#BFDBFE" : "#FED7AA"))), tambah("1,", teks("a", 80, 124, "A: 1, 2, 3  = 3 hasil", 9.5, W.biruMuda)), tambah("4", teks("b", 220, 124, "B: 4, 5, 6  = 3 hasil", 9.5, W.salem)), tambah("sama,", teks("c", 150, 170, "3 = 3  →  ADIL", 16, W.hijau))),
    k("Syarat adil: total hasil sama untuk semua pemain dan hasil menangnya sama banyak. Kalau totalnya berbeda, bandingkan dengan rasio.", bersih(0), tambah("Syarat", kotak("s", 20, 40, 260, 110, W.putih, W.emas, { rx: 14, tebal: 3 }), teks("s1", 150, 70, "ADIL bila", 14, W.hijau)), tambah("total", teks("s2", 150, 96, "total hasil sama", 11)), tambah("menangnya", teks("s3", 150, 116, "hasil menang sama banyak", 11)), tambah("rasio.", teks("s4", 150, 140, "total beda → bandingkan rasio", 9.5, W.ungu))),
  ],
};

/* ------------------------------ LB6. Permainan adil pada soal Uji Kompetensi ------------------------------ */
const PASANG = Array.from({ length: 36 }, (_, i) => ({ a: Math.floor(i / 6) + 1, b: (i % 6) + 1 }));
const selPasang = (i: number, hijau: boolean) => {
  const { a, b } = PASANG[i];
  const x = 70 + (i % 6) * 26;
  const y = 44 + Math.floor(i / 6) * 22;
  return [kotak(`ps${i}`, x, y, 24, 20, hijau ? "#FECACA" : W.putih, W.biru, { rx: 3, tebal: 1 }), teks(`pst${i}`, x + 12, y + 14, `${a}${b}`, 8.5, W.biru)];
};

export const ADEGAN_LUAR_B_FAIR_TERAPAN: AdeganStory = {
  id: "luarb-fair-terapan",
  judul: "Memeriksa tiga skenario Uji Kompetensi",
  sumber: "Metode luar; skenario dari Buku Siswa hlm. 128 dan Buku Panduan Guru hlm. 133",
  latar: "#F5F3FF",
  ketukan: [
    k("Skenario 1: satu dadu angka 3 melawan satu dadu angka 6. Masing-masing punya 1 hasil dari 6, jadi permainannya adil.", tambah(0, teks("jud", 150, 24, "Skenario 1", 12, W.ungu)), tambah("angka", ...daduTitik("a", 80, 84, 3, 44, "#BFDBFE"), teks("an", 80, 122, "menang: angka 3", 8.5)), tambah("6.", ...daduTitik("b", 220, 84, 6, 44, "#FED7AA"), teks("bn", 220, 122, "menang: angka 6", 8.5)), tambah("jadi", teks("c", 150, 170, "1 dari 6 = 1 dari 6  →  ADIL", 12, W.hijau))),
    k("Skenario 3: angka 1 atau 3 melawan angka 5 atau 6. Masing-masing punya 2 hasil dari 6, jadi permainannya adil.", bersih(0), tambah(0, teks("jud", 150, 24, "Skenario 3", 12, W.ungu)), tambah("1", ...[1, 3].map((n, i) => daduTitik(`a${n}`, 54 + i * 44, 84, n, 36, "#BFDBFE")), teks("an", 76, 118, "menang: 1 atau 3", 8.5)), tambah("5", ...[5, 6].map((n, i) => daduTitik(`b${n}`, 202 + i * 44, 84, n, 36, "#FED7AA")), teks("bn", 246, 118, "menang: 5 atau 6", 8.5)), tambah("jadi", teks("c", 150, 170, "2 dari 6 = 2 dari 6  →  ADIL", 12, W.hijau))),
    k("Skenario 2: Pemain 1 memakai satu dadu angka 3, Pemain 2 memakai dua dadu dan menang bila ada angka 6. Daftar semua pasangan dua dadu: ada 36 pasangan.", bersih(0), tambah(0, teks("jud", 150, 24, "Skenario 2: semua pasangan dua dadu", 10, W.ungu)), tambah("36", ...PASANG.flatMap((_, i) => selPasang(i, false))), tambah("pasangan.", teks("n36", 40, 110, "6 × 6", 11, W.merah), teks("n36b", 40, 124, "= 36", 11, W.merah))),
    k("Pasangan yang memuat angka 6: ada 6 pasangan di baris keenam dan 6 pasangan di kolom keenam, tetapi pasangan 6 dan 6 terhitung dua kali, jadi 6 ditambah 6 dikurangi 1 sama dengan 11.", tambah("baris", ...[30, 31, 32, 33, 34, 35].flatMap((i) => selPasang(i, true))), tambah("kolom", ...[5, 11, 17, 23, 29].flatMap((i) => selPasang(i, true))), tambah("dua", teks("ds", 40, 156, "6 + 6 − 1 = 11", 11, W.merah))),
    k("Peluang Pemain 2: 11 dari 36. Peluang Pemain 1: 1 dari 6, yaitu 6 dari 36. Karena 11 lebih besar dari 6, permainan kurang adil dan Pemain 2 diuntungkan.", bersih(0), tambah("11", teks("a", 80, 60, "Pemain 2", 11, W.ungu), teks("a2", 80, 86, "11 dari 36", 16, W.merah)), tambah("6,", teks("b", 220, 60, "Pemain 1", 11, W.ungu), teks("b2", 220, 86, "1 dari 6", 14), teks("b3", 220, 108, "= 6 dari 36", 14, W.merah)), tambah("lebih", teks("bd", 150, 150, "11  >  6", 24, W.hijau)), tambah("kurang", teks("ka", 150, 184, "KURANG ADIL: Pemain 2 diuntungkan", 10, W.merah))),
    k("Cocok dengan jawaban Buku Panduan Guru: skenario 1 dan 3 adil, skenario 2 kurang adil.", bersih(0), tambah("skenario@1", kotak("r1", 20, 44, 260, 30, W.putih, W.hijau, { rx: 8 }), teks("r1t", 150, 64, "skenario 1: adil", 11, W.hijau)), tambah("3", kotak("r3", 20, 86, 260, 30, W.putih, W.hijau, { rx: 8 }), teks("r3t", 150, 106, "skenario 3: adil", 11, W.hijau)), tambah("2", kotak("r2", 20, 128, 260, 30, W.putih, W.merah, { rx: 8 }), teks("r2t", 150, 148, "skenario 2: kurang adil", 11, W.merah))),
  ],
};


/* ------------------------------ LB7. Relative Likelihood Decision ------------------------------ */
const LANGKAH = ["hitung k dan n", "samakan total", "bandingkan", "pilih yang lebih besar", "ingat: belum pasti"];
export const ADEGAN_LUAR_B_KEPUTUSAN: AdeganStory = {
  id: "luarb-keputusan",
  judul: "Relative Likelihood Decision: memilih dengan peluang",
  sumber: "Metode luar; contoh dari Buku Siswa hlm. 122–123 dan Buku Panduan Guru hlm. 130",
  latar: "#FFFBEB",
  ketukan: [
    k("Metode keempat: Relative Likelihood Decision, keputusan berdasarkan kemungkinan relatif. Relatif berarti kita membandingkan dua pilihan.", tambah(0, teks("jud", 150, 28, "Relative Likelihood Decision", 11, W.ungu)), tambah("Relatif", emo("a", 80, 100, "🅰️", 40)), tambah("membandingkan", emo("b", 220, 100, "🅱️", 40), teks("vs", 150, 110, "lawan", 12, W.merah))),
    k("Idenya: bandingkan peluang kedua pilihan, lalu pilih yang peluangnya lebih besar. Itu keputusan terbaik berdasarkan bukti yang ada.", bersih(0), tambah("bandingkan", kotak("p1", 30, 50, 100, 50, W.putih, W.biru, { rx: 10 }), teks("p1t", 80, 80, "pilihan 1", 11)), tambah("kedua", kotak("p2", 170, 50, 100, 50, W.putih, W.biru, { rx: 10 }), teks("p2t", 220, 80, "pilihan 2", 11)), tambah("pilih", panah("pp", 150, 130, 0, -20, W.hijau, 4, { gambar: true }), teks("pl", 150, 160, "pilih yang lebih besar", 12, W.hijau))),
    k("Contoh Ibu Dhien: Kotak Hadiah Mantap punya 4 dari 7, Kotak Hadiah Spektakuler punya 3 dari 7. Pilih Mantap.", bersih(0), tambah("Mantap", kotak("m", 20, 44, 120, 60, "#BBF7D0", W.hijau, { rx: 10 }), teks("m1", 80, 68, "Mantap", 11), teks("m2", 80, 90, "4 dari 7", 16, W.hijau)), tambah("Spektakuler", kotak("s", 160, 44, 120, 60, W.putih, W.biru, { rx: 10 }), teks("s1", 220, 68, "Spektakuler", 10), teks("s2", 220, 90, "3 dari 7", 16)), tambah("Pilih", emo("ok", 80, 140, "✅", 30), teks("pm", 80, 176, "pilih Mantap", 10, W.hijau))),
    k("Tetapi keputusan terbaik tidak menjamin hasil. Di Mantap masih ada 3 bola yang bukan biru, jadi 3 dari 7 kali Ibu bisa saja tidak mendapat piring.", bersih(0), tambah("keputusan", teks("jud", 150, 28, "keputusan terbaik ≠ hasil pasti", 11, W.ungu)), tambah("Mantap", ...[0, 1, 2, 3, 4, 5, 6].map((i) => bulat(`b${i}`, 60 + i * 30, 90, 11, i < 4 ? "#3B82F6" : "#F59E0B"))), tambah("3", ...[4, 5, 6].map((i) => teks(`x${i}`, 60 + i * 30, 124, "bukan biru", 6.5, W.merah))), sorotkan("3", "b4", "b5", "b6"), tambah("kali", teks("t", 150, 170, "3 dari 7 kali: tidak dapat piring", 11, W.merah))),
    k("Keputusan yang baik dinilai dari alasannya, bukan hanya dari hasilnya. Kalau kita sudah memilih dengan benar tetapi kurang beruntung, keputusannya tetap baik.", bersih(0), tambah("alasannya,", emo("alasan", 80, 80, "🧠", 40), teks("a", 80, 116, "alasan yang benar", 9.5, W.hijau)), tambah("hasilnya.", emo("hasil", 220, 80, "🎲", 40), teks("h", 220, 116, "hasil bisa meleset", 9.5, W.merah)), tambah("tetap", kotak("t", 40, 140, 220, 34, "#BBF7D0", W.hijau, { rx: 12 }), teks("tt", 150, 162, "memilih benar = keputusan baik", 11, W.hijau))),
    k("Kalau dua pilihan sama besar, misalnya 3 dari 6 dan 1 dari 2, kita boleh memilih salah satu, atau memakai pertimbangan lain seperti biaya.", bersih(0), tambah("3", teks("a", 80, 70, "3 dari 6", 18, W.merah)), tambah("2,", teks("b", 220, 70, "1 dari 2", 18, W.merah)), tambah("sama", teks("eq", 150, 74, "=", 28, W.hijau)), tambah("memilih", teks("c", 150, 130, "boleh pilih salah satu", 12, W.ungu)), tambah("biaya.", emo("uang", 150, 168, "💰", 28))),
    k("Ringkasnya, langkah keputusan: hitung k dan n, samakan total, bandingkan, pilih yang lebih besar, dan ingat bahwa itu belum pasti.", bersih(0), ...LANGKAH.map((l, i) => tambah(["hitung", "samakan", "bandingkan,", "pilih", "ingat"][i], kotak(`l${i}`, 20, 30 + i * 34, 260, 28, ["#FDE68A", "#FBCFE8", "#BFDBFE", "#BBF7D0", "#FECACA"][i], W.biru, { rx: 10 }), teks(`ln${i}`, 34, 49 + i * 34, `${i + 1}. ${l}`, 10, W.biru, { anchor: "start" })))),
  ],
};

/* ------------------------------ LB8. Ringkasan metode luar Sub-Bab B ------------------------------ */
const RINGKAS = [
  ["Buku", "bandingkan jumlah, tulis k dari n, pilih kotak", "#FDE68A"],
  ["Favorable-to-Total Ratio", "k dari n: untung lawan semua hasil", "#FEF3C7"],
  ["Comparative Probability Ratio", "samakan total, lalu bandingkan", "#FBCFE8"],
  ["Fair Game Equal Chance Principle", "adil bila peluang tiap pemain sama", "#BBF7D0"],
  ["Relative Likelihood Decision", "pilih yang lebih besar, ingat belum pasti", "#BFDBFE"],
];
const barisR = (i: number) => [kotak(`rg${i}`, 8, 28 + i * 31, 284, 27, RINGKAS[i][2], W.biru, { rx: 8 }), teks(`rg${i}a`, 16, 40 + i * 31, RINGKAS[i][0], 7.6, W.biru, { anchor: "start" }), teks(`rg${i}b`, 16, 51 + i * 31, RINGKAS[i][1], 6.8, W.ungu, { anchor: "start" })];
export const ADEGAN_LUAR_B_RINGKAS: AdeganStory = {
  id: "luarb-ringkas",
  judul: "Ringkasan: buku dan empat metode luar Sub-Bab B",
  sumber: "Ringkasan Sub-Bab B",
  latar: "#FDF4FF",
  ketukan: [
    k("Mari ringkas. Buku membandingkan jumlah, menulis k dari n, dan memilih kotak dengan peluang terbesar.", tambah(0, teks("jud", 150, 18, "Ringkasan", 11, W.ungu)), tambah("Buku", barisR(0))),
    k("Favorable-to-Total Ratio menulis peluang sebagai hasil menguntungkan dari semua hasil.", tambah("Favorable-to-Total", barisR(1))),
    k("Comparative Probability Ratio menyamakan total sebelum membandingkan dua peluang.", tambah("Comparative", barisR(2))),
    k("Fair Game Equal Chance Principle menilai adil dari banyaknya hasil menang tiap pemain.", tambah("Fair", barisR(3))),
    k("Relative Likelihood Decision memilih yang peluangnya lebih besar, sambil ingat bahwa belum pasti.", tambah("Relative", barisR(4))),
    k("Semua metode bertemu di satu pesan: bandingkan peluang dengan adil, putuskan dengan bijak, dan ingat peluang besar belum pasti. Bab 4 Peluang selesai.", bersih(0), tambah("Bab", teks("bb", 150, 24, "Bab 4 Peluang", 11, W.ungu)), tambah("bandingkan", emo("timbang", 150, 70, "⚖️", 44)), tambah("putuskan", teks("p", 150, 126, "putuskan dengan bijak", 12, W.hijau)), tambah("belum", teks("q", 150, 152, "peluang besar belum pasti", 12, W.merah)), tambah("selesai.", emo("bintang", 150, 188, "🌟", 28))),
  ],
};
