import type { AdeganStory } from "./logika-story";
import { W, balon, batang, bulat, dadu, emo, garis, kemeja, kotak, panah, rakBuku, roda, skala, teks } from "./k6b4a-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah } from "./k6b4a-bantu";

/* ------------------------------ 7. Rak buku dan teka-teki lemari (hlm. 108 dan 109) ------------------------------ */
const RAK = rakBuku("rk", 22, 58, [
  { warna: W.putih, n: 3 },
  { warna: "#EF4444", n: 6 },
  { warna: "#FDBA74", n: 1 },
]);
const SK7 = skala("s7", 30, 100, 240);
const penanda = (id: string, tick: number, warna: string, label: string) => [kotak(`${id}-b`, SK7.xs[tick] - 12, 142, 24, 17, warna, W.biru, { rx: 2 }), teks(`${id}-n`, SK7.xs[tick], 174, label, 9, W.merah), garis(`${id}-h`, SK7.xs[tick], 128, 0, 14, W.biru, 1.5, { putus: true, gambar: true })];

export const ADEGAN_RAK: AdeganStory = {
  id: "rak-lemari",
  judul: "Rak buku Dhien dan teka-teki lemari Ayah",
  sumber: "Buku Siswa hlm. 108–109; Buku Panduan Guru hlm. 121–122",
  latar: "#FDECD2",
  kutipan: ["Ada lebih dari satu jawaban yang benar", "memiliki 16 pakaian", "setidaknya 1 (satu) pakaian"],
  ketukan: [
    k(
      "Untuk memilih buku bacaan, Dhien melihat isi rak bukunya. Ada 3 buku putih, 6 buku merah, dan 1 buku kuning.",
      tambah("rak", RAK.objs[0]),
      tambah("putih", RAK.ids[0].map((id) => RAK.objs.find((o) => o.id === id)!), balon("g0", 41, 22, ["3", "Buku putih"], 44)),
      tambah("merah", RAK.ids[1].map((id) => RAK.objs.find((o) => o.id === id)!), balon("g1", 100, 22, ["6", "Buku merah"], 44)),
      tambah("kuning", RAK.ids[2].map((id) => RAK.objs.find((o) => o.id === id)!), balon("g2", 146, 22, ["1", "Buku kuning"], 44)),
    ),
    k("Dhien menaruh semua bukunya di lantai dan mengambil satu buku secara acak.", tambah("lantai", kotak("lantai", 0, 96, 300, 6, "#E7C9A5", "none", { z: -1, rx: 0 })), tambah("mengambil", emo("tangan", 100, 120, "👆", 24)), tambah("acak", teks("acak", 150, 118, "acak: tanpa memilih", 8.5, W.ungu)), sorotkan("acak", "rk-buku5")),
    k("Berapa semua bukunya? 3 ditambah 6 ditambah 1, hasilnya 10 buku.", hapus(0, "tangan", "acak"), tambah(3, teks("hit", 220, 66, "3", 14, W.merah)), ubah(5, { id: "hit", isi: "3 + 6" }), ubah(7, { id: "hit", isi: "3 + 6 + 1" }), tambah(9, teks("hasil", 220, 84, "= 10 buku", 11, W.merah))),
    k("Buku merah paling banyak, 6 buku dari 10. Jadi mengambil buku merah sangat mungkin.", tambah(0, SK7.semua), sorotkan("merah", ...RAK.ids[1]), tambah("sangat", penanda("pm", 3, "#EF4444", "6")), sorotkan("sangat", "s7-b3-k")),
    k("Buku putih ada 3, lebih sedikit dari merah, jadi mengambil buku putih mungkin. Buku kuning hanya 1, jadi kurang mungkin.", redamkan(0, ...RAK.ids[1], "s7-b3-k"), sorotkan("putih", ...RAK.ids[0]), tambah("mungkin,", penanda("pp", 2, W.putih, "3")), tambah("kuning", penanda("pk", 1, "#FDBA74", "1")), sorotkan("kuning", ...RAK.ids[2]), redamkan("kuning", ...RAK.ids[0])),
    k("Buku hitam tidak ada di rak, jumlahnya 0. Mengambil buku hitam tidak mungkin.", redamkan(0, ...RAK.ids[2]), tambah("hitam", penanda("ph", 0, W.hitam, "0")), sorotkan("tidak", "s7-b0-k")),
    k("Jadi, makin banyak jumlah sebuah warna dibanding warna lain, makin ke kanan letaknya di skala.", tambah("makin@1", panah("arah", 36, 188, 228, 0, W.merah, 3, { gambar: true })), tambah("kanan", teks("ak", 150, 200, "makin banyak, makin ke kanan", 8.5, W.merah))),
    k("Teka-teki berikutnya: bisakah kita menebak warna dan jumlah pakaian di lemari Ayah Dhien? Ada tiga petunjuk.", bersih(0), tambah(0, emo("lemari", 150, 70, "👕", 50), teks("jud", 150, 130, "Lemari pakaian Ayah Dhien", 11)), tambah("menebak", emo("q", 190, 56, "❓", 24)), tambah("tiga", teks("p1", 70, 168, "petunjuk 1", 9, W.ungu), teks("p2", 150, 168, "petunjuk 2", 9, W.ungu), teks("p3", 230, 168, "petunjuk 3", 9, W.ungu))),
    k(
      "Petunjuk pertama: skala peluang saat Ayah mengambil pakaian secara acak. Petunjuk kedua: Ayah punya 16 pakaian. Petunjuk ketiga: setidaknya ada 1 pakaian berwarna hitam.",
      bersih(0),
      tambah("pertama", kotak("a1", 6, 26, 140, 100, W.putih, W.ungu, { rx: 8 }), teks("a1t", 76, 40, "1. skala peluang", 8, W.ungu), garis("a1g", 18, 66, 116, 0, W.biru, 2), ...[0, 1, 2, 3, 4].map((i) => garis(`a1s${i}`, 18 + i * 29, 62, 0, 8, W.biru, 1.5)), kemeja("a1m0", 18, 76, "#F87171", { skala: 0.9 }), kemeja("a1m1", 47, 76, W.hitam, { skala: 0.9 }), kemeja("a1m2", 76, 76, "#3B82F6", { skala: 0.9 }), kemeja("a1m3", 105, 76, "#84CC16", { skala: 0.9 }), teks("a1n", 76, 118, "skala dari buku", 7.5)),
      tambah("kedua", kotak("a2", 152, 26, 70, 100, W.putih, W.ungu, { rx: 8 }), teks("a2t", 187, 40, "2. jumlah", 8, W.ungu)),
      tambah("16", teks("a2n", 187, 82, "16", 26, W.merah), teks("a2u", 187, 98, "pakaian", 8)),
      tambah("ketiga", kotak("a3", 228, 26, 66, 100, W.putih, W.ungu, { rx: 8 }), teks("a3t", 261, 40, "3. ada hitam", 8, W.ungu)),
      tambah("hitam", kemeja("a3m", 261, 58, W.hitam, { skala: 1.4 }), teks("a3n", 261, 112, "paling sedikit 1", 7.5)),
    ),
    k(
      "Ada lebih dari satu jawaban benar. Salah satunya: 2 pakaian hitam, 5 biru, dan 9 hijau, jadi 2 ditambah 5 ditambah 9 sama dengan 16. Pakaian merah tidak ada.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Salah satu jawaban yang cocok", 10, W.ungu), garis("dasar", 30, 150, 240, 0, W.biru, 2)),
      tambah("hitam", batang("bh", 70, 150, 30, 2 * 9, W.hitam), teks("bhn", 85, 130, "2", 11), teks("bhl", 85, 164, "hitam", 8)),
      tambah("biru", batang("bb", 130, 150, 30, 5 * 9, W.biruMuda), teks("bbn", 145, 100, "5", 11), teks("bbl", 145, 164, "biru", 8)),
      tambah("hijau", batang("bg", 190, 150, 30, 9 * 9, "#84CC16"), teks("bgn", 205, 56, "9", 11), teks("bgl", 205, 164, "hijau", 8)),
      tambah("sama", teks("jml", 150, 188, "2 + 5 + 9 = 16", 11, W.merah)),
      tambah("merah", teks("mr", 235, 130, "merah: 0", 9, W.merah)),
    ),
    k(
      "Karena itu, soal matematika boleh punya lebih dari satu jawaban yang benar. Contoh lain: 1 hitam, 4 biru, 11 hijau. Atau 3 hitam, 6 biru, 7 hijau. Yang penting cocok dengan petunjuk.",
      bersih(0),
      tambah(0, teks("jud", 150, 28, "Jawaban benar tidak harus satu", 11, W.ungu)),
      tambah("Contoh", kotak("j1", 20, 44, 260, 34, W.putih, W.hijau, { rx: 8 }), teks("j1t", 150, 66, "1 hitam + 4 biru + 11 hijau = 16", 10)),
      tambah("Atau", kotak("j2", 20, 88, 260, 34, W.putih, W.hijau, { rx: 8 }), teks("j2t", 150, 110, "3 hitam + 6 biru + 7 hijau = 16", 10)),
      tambah("cocok", emo("c1", 262, 66, "✅", 18), emo("c2", 262, 110, "✅", 18), teks("cc", 150, 150, "asal sesuai ketiga petunjuk", 10, W.hijau)),
    ),
  ],
};

/* ------------------------------ 8. Latihan 4.1: dadu, bola, dan data bencana (hlm. 110 sampai 113) ------------------------------ */
const SK8 = skala("s8", 30, 24, 240);
const MUKA = ["2", "2", "3", "3", "3", "4"];
const MUKA_ID = (daftar: number[]): string[] => daftar.flatMap((i) => [`f${i}-k`, `f${i}-t`]);
const penandaAngka = (id: string, tick: number, y: number, isi: string, warna: string = W.putih) => [...dadu(id, SK8.xs[tick] - 9, y, isi, warna, 18)];

export const ADEGAN_LATIHAN: AdeganStory = {
  id: "latihan-41",
  judul: "Latihan 4.1: dadu, bola, dan data bencana",
  sumber: "Buku Siswa hlm. 110–113; Buku Panduan Guru hlm. 119–122",
  latar: "#E3F6F5",
  kutipan: ["Hasil melempar dadu 6 sisi dengan masing-masing sisi sebagai berikut: 2, 2, 3, 3, 3, 4", "Terdapat 15 bola dalam 1 tas", "Banyaknya Bencana Alam yang Terjadi"],
  ketukan: [
    k("Latihan 4.1 meminta kita membuat skala peluang dari berbagai benda. Pertama, dadu enam sisi dengan sisi 2, 2, 3, 3, 3, dan 4.", tambah(0, teks("jud", 150, 28, "Latihan 4.1: dadu 6 sisi", 12, W.ungu)), ...[16, 17, 18, 19, 20, 22].map((kata, i) => tambah(kata, dadu(`f${i}`, 24 + i * 42, 70, MUKA[i], W.putih, 30)))),
    k("Hitung dulu tiap angka. Angka 3 ada tiga kali, angka 2 ada dua kali, dan angka 4 hanya satu kali. Angka 1, 5, dan 6 tidak ada.", tambah("tiga", teks("c3", 150, 126, "angka 3: 3 kali", 10, W.merah)), tambah("dua", teks("c2", 150, 142, "angka 2: 2 kali", 10, W.salem)), tambah("hanya", teks("c4", 150, 158, "angka 4: 1 kali", 10, W.hijau)), tambah("tidak", teks("c0", 150, 176, "angka 1, 5, 6: tidak ada (0)", 9.5, W.biru)), sorotkan("tiga", ...MUKA_ID([2, 3, 4])), redamkan("dua", ...MUKA_ID([2, 3, 4])), sorotkan("dua", ...MUKA_ID([0, 1])), redamkan("hanya", ...MUKA_ID([0, 1])), sorotkan("hanya", ...MUKA_ID([5]))),
    k("Salah satu cara menempatkannya: angka 3 paling banyak, jadi mungkin. Angka 2 dan 4 lebih sedikit, jadi kurang mungkin. Angka 1, 5, dan 6 tidak mungkin.", bersih(0), tambah(0, SK8.semua), tambah("angka@1", penandaAngka("a3", 2, 70, "3")), tambah("angka@2", penandaAngka("a2", 1, 70, "2"), penandaAngka("a4", 1, 92, "4")), tambah("angka@3", penandaAngka("a1", 0, 70, "1"), penandaAngka("a5", 0, 92, "5"), penandaAngka("a6", 0, 114, "6")), tambah("tidak", teks("var", 150, 168, "jawaban boleh beragam, asal yang lebih banyak lebih ke kanan", 7.5, W.ungu))),
    k("Dadu delapan sisi dengan angka 1 sampai 8: tiap angka muncul sama banyak, jadi semua angka berada di tempat yang sama pada skala.", bersih(0), tambah(0, teks("jud", 150, 28, "Dadu 8 sisi: 1, 2, 3, 4, 5, 6, 7, 8", 11, W.ungu)), ...[1, 2, 3, 4, 5, 6, 7, 8].map((n, i) => tambah(0, dadu(`e${i}`, 22 + i * 33, 60, String(n), W.putih, 26))), tambah("sama", teks("s1", 150, 118, "tiap angka 1 kali  =  sama banyak", 10, W.merah)), tambah("tempat", ...[1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => panah(`sp${i}`, 35 + i * 33, 136, 0, 26, W.ungu, 1.8)), kotak("sm", 20, 168, 262, 24, "#DDD6FE", W.ungu, { rx: 8 }), teks("smt", 150, 184, "semua di satu tempat yang sama", 9.5))),
    k("Dadu delapan sisi yang semua sisinya angka 5: angka 5 pasti muncul. Angka lain tidak mungkin.", bersih(0), tambah(0, SK8.semua), ...[0, 1, 2, 3, 4, 5, 6, 7].map((i) => tambah(0, dadu(`g${i}`, 22 + i * 33, 70, "5", W.putih, 26))), tambah("pasti", ...dadu("lima", SK8.xs[4] - 12, 100, "5", "#BFDBFE", 24)), sorotkan("pasti", "s8-b4-k"), tambah("lain", ...[1, 2, 3, 4, 6, 7, 8].map((n, i) => dadu(`x${n}`, SK8.xs[0] - 8 + (i % 2) * 20, 94 + Math.floor(i / 2) * 20, String(n), "#FECACA", 16))), tambah("tidak", teks("tm", 60, 190, "tidak mungkin", 8.5, W.merah))),
    k("Soal bola: ada 15 bola dalam tas. Skala peluang menunjukkan bola hijau dan biru di tengah, bola merah lebih ke kanan. Tebak jumlah tiap warna.", bersih(0), tambah(0, SK8.semua, teks("jud", 150, 76, "15 bola dalam 1 tas", 10, W.ungu)), tambah("hijau", bulat("mh", SK8.xs[2] - 12, 98, 9, "#22C55E"), bulat("mb", SK8.xs[2] + 12, 98, 9, "#3B82F6")), tambah("merah", bulat("mm", SK8.xs[3], 98, 9, "#EF4444"), garis("mk", SK8.xs[3] + 14, 98, 40, 0, W.merah, 2, { gambar: true })), tambah("Tebak", teks("tb", 150, 150, "berapa bola merah, hijau, dan biru?", 10, W.merah), emo("tanya", 150, 176, "🤔", 22))),
    k(
      "Jawaban benarnya beragam, dan jumlahnya harus 15. Misalnya 7 merah, 4 hijau, 4 biru. Atau 8 merah, 3 hijau, 4 biru. Atau 9 merah, 3 hijau, 3 biru.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Banyak jawaban benar, jumlah tetap 15", 10, W.ungu)),
      tambah("Misalnya", kotak("o1", 20, 36, 260, 32, W.putih, W.hijau, { rx: 8 }), teks("o1t", 150, 57, "7 merah + 4 hijau + 4 biru = 15", 10)),
      tambah("Atau", kotak("o2", 20, 76, 260, 32, W.putih, W.hijau, { rx: 8 }), teks("o2t", 150, 97, "8 merah + 3 hijau + 4 biru = 15", 10)),
      tambah("Atau@2", kotak("o3", 20, 116, 260, 32, W.putih, W.hijau, { rx: 8 }), teks("o3t", 150, 137, "9 merah + 3 hijau + 3 biru = 15", 10)),
      tambah("jawaban", emo("c1", 264, 52, "✅", 16), emo("c2", 264, 92, "✅", 16), emo("c3", 264, 132, "✅", 16)),
    ),
    k("Tetapi 5 merah, 5 hijau, 5 biru salah, karena merah harus lebih banyak dari hijau dan biru. Tuliskan juga jawaban benar lainnya bersama teman sebangkumu.", bersih(0), tambah(0, kotak("sl", 20, 36, 260, 40, "#FEE2E2", W.merah, { rx: 8 }), teks("slt", 150, 62, "5 merah + 5 hijau + 5 biru", 11)), tambah("salah", emo("x", 150, 112, "❌", 36)), tambah("merah", teks("al", 150, 154, "merah harus paling banyak", 10, W.merah)), tambah("teman", emo("teman", 150, 186, "👥", 24))),
    k("Soal terakhir memakai data bencana alam di Sulawesi Tengah. Banjir 567, gempa bumi 556, tanah longsor 133, tsunami 0, dan gunung meletus 0.", bersih(0), tambah(0, teks("jud", 150, 22, "Bencana alam di Sulawesi Tengah (jumlah desa atau kelurahan)", 7.5), garis("db", 22, 164, 256, 0, W.biru, 2, { gambar: true })), tambah("Banjir", batang("db1", 38, 164, 30, 567 / 5, W.biruMuda), teks("db1n", 53, 164 - 567 / 5 - 4, "567", 9), teks("db1l", 53, 176, "banjir", 7)), tambah("gempa", batang("db2", 88, 164, 30, 556 / 5, W.salem), teks("db2n", 103, 164 - 556 / 5 - 4, "556", 9), teks("db2l", 103, 176, "gempa bumi", 7)), tambah("longsor", batang("db3", 138, 164, 30, 133 / 5, W.coklat), teks("db3n", 153, 164 - 133 / 5 - 4, "133", 9), teks("db3l", 153, 176, "longsor", 7)), tambah("tsunami", teks("db4n", 203, 160, "0", 9), teks("db4l", 203, 176, "tsunami", 7)), tambah("meletus", teks("db5n", 253, 160, "0", 9), teks("db5l", 253, 176, "gunung meletus", 6.5))),
    k("Dari data itu, tsunami dan gunung meletus bernilai 0, jadi tidak mungkin. Gempa bumi dan banjir paling banyak, jadi paling ke kanan. Tanah longsor ada di antaranya.", sorotkan("tsunami", "db4n", "db4l"), sorotkan("tsunami", "db5n", "db5l"), tambah("Gempa", teks("kk", 240, 64, "gempa bumi dan banjir:", 7.4, W.merah), teks("kk2", 240, 75, "paling ke kanan", 7.4, W.merah)), sorotkan("Gempa", "db1", "db2"), tambah("longsor", teks("km", 240, 96, "tanah longsor:", 7.4, W.coklat), teks("km2", 240, 107, "di antaranya", 7.4, W.coklat))),
    k("Pelajarannya: skala peluang dibuat dari jumlah. Jumlah nol di ujung kiri, jumlah yang lebih banyak makin ke kanan, dan kalau semuanya sama, kejadiannya pasti.", bersih(0), tambah(0, SK8.semua), tambah("nol", teks("n0", SK8.xs[0], 76, "0", 20, W.merah)), tambah("lebih", panah("lb", SK8.xs[1], 86, 120, 0, W.hijau, 3, { gambar: true }), teks("lbt", 150, 106, "makin banyak, makin ke kanan", 8.5, W.hijau)), tambah("semuanya", teks("sm", SK8.xs[4], 76, "semua", 12, W.biru), emo("pas", SK8.xs[4], 108, "✅", 20))),
  ],
};

/* ------------------------------ 9. Ayo Mencoba: percobaan roda putar (hlm. 113 dan 114) ------------------------------ */
const JURING9 = ["#FACC15", "#FACC15", "#FACC15", "#FACC15", "#EF4444", "#EF4444", "#3B82F6", "#22C55E"];
const SK9 = skala("s9", 30, 24, 240);
const BARIS_TABEL = ["Percobaan 1", "Percobaan 2", "Percobaan 3", "Percobaan 4", "Percobaan 5"];

export const ADEGAN_RODA: AdeganStory = {
  id: "percobaan-roda",
  judul: "Ayo Mencoba: percobaan dengan roda putar",
  sumber: "Buku Siswa hlm. 113–114; Buku Panduan Guru hlm. 123–124",
  latar: "#F3E8FF",
  kutipan: ["Percobaan Skala Peluang dengan Roda Putar", "Klip kertas atau karet gelang", "Catat hasilnya dalam tabel"],
  ketukan: [
    k("Ayo Mencoba: percobaan skala peluang dengan roda putar. Kalian bermain bersama satu atau dua teman.", tambah(0, roda("rd", 100, 108, 64, JURING9)), tambah("bermain", emo("tim", 232, 100, "👥", 38)), tambah("roda@1", teks("jud", 150, 24, "Roda putar buatan sendiri", 11, W.ungu))),
    k("Langkah pertama, siapkan lembar roda putar, klip kertas atau karet gelang, dan pensil atau pena.", bersih(0), tambah("lembar", emo("kertas", 60, 90, "📄", 36), teks("l1", 60, 124, "lembar roda putar", 8)), tambah("klip", emo("klip", 150, 90, "📎", 36), teks("l2", 150, 124, "klip kertas / karet gelang", 8)), tambah("pensil", emo("pensil", 240, 90, "✏️", 36), teks("l3", 240, 124, "pensil atau pena", 8))),
    k("Roda putar akan memilih satu warna secara acak dari warna yang ada di papan permainan. Pada contoh ini, warna kuning paling luas.", bersih(0), tambah(0, roda("rd", 120, 106, 66, JURING9)), tambah("acak", panah("jarum", 120, 20, 0, 26, W.biru, 4, { gambar: true })), tambah("kuning", teks("ky", 232, 64, "kuning", 12, "#B45309"), panah("pk", 214, 70, -52, 20, "#B45309", 2.5, { gambar: true })), tambah("luas", teks("lu", 232, 84, "paling luas", 9, "#B45309"))),
    k("Langkah kedua, sebelum memutar, buat dulu skala peluangnya. Warna apa yang paling mungkin terpilih, dan warna apa yang kurang mungkin?", bersih(0), tambah(0, SK9.semua), tambah("paling", ...[["#FACC15", 3], ["#EF4444", 2], ["#3B82F6", 1], ["#22C55E", 1]].map(([w, t], i) => bulat(`pm${i}`, SK9.xs[t as number] + (i === 3 ? 16 : 0), 96, 11, w as string))), sorotkan("paling", "pm0"), tambah("kurang", teks("ps", 150, 130, "prediksi dibuat SEBELUM memutar", 9.5, W.ungu)), sorotkan("kurang", "pm2", "pm3")),
    k("Langkah ketiga, lihat cara memutar klip kertas di gambar buku. Klip diletakkan di pusat roda, ditahan ujung pensil, lalu disentil.", bersih(0), tambah(0, roda("rd", 110, 106, 62, JURING9), kotak("kl", 106, 102, 8, 18, "#9CA3AF", W.biru, { rx: 2 }), garis("pn", 110, 106, 0, -70, "#0EA5E9", 4)), tambah("pensil", emo("tangan", 220, 130, "🤚", 30)), tambah("sentil", teks("snt", 220, 80, "sentil klip", 10, W.merah)), ubah("sentil", { id: "kl", rot: 540 })),
    k("Langkah keempat, bergantian memutar dan catat hasilnya dalam tabel. Misalnya hasilnya kuning, merah, kuning, kuning, dan biru.", bersih(0), tambah(0, ...BARIS_TABEL.map((b, i) => [kotak(`tb${i}`, 40, 34 + i * 26, 80, 24, "#DBEAFE", W.biru, { rx: 2 }), teks(`tbn${i}`, 80, 50 + i * 26, b, 8.5), kotak(`th${i}`, 120, 34 + i * 26, 120, 24, W.putih, W.biru, { rx: 2 })]).flat(), teks("tj", 180, 24, "Hasil roda putar", 9, W.ungu)), tambah("kuning", bulat("h0", 180, 46, 8, "#FACC15"), teks("h0t", 205, 50, "kuning", 8)), tambah("merah,", bulat("h1", 180, 72, 8, "#EF4444"), teks("h1t", 205, 76, "merah", 8)), tambah("kuning@2", bulat("h2", 180, 98, 8, "#FACC15"), teks("h2t", 205, 102, "kuning", 8)), tambah("kuning@3", bulat("h3", 180, 124, 8, "#FACC15"), teks("h3t", 205, 128, "kuning", 8)), tambah("biru", bulat("h4", 180, 150, 8, "#3B82F6"), teks("h4t", 205, 154, "biru", 8)), tambah("Misalnya", teks("cat", 150, 186, "(contoh catatan, bukan data buku)", 7.5, W.ungu))),
    k("Langkah kelima, bandingkan hasil percobaan dengan skala peluangmu. Apakah hasil dan prediksimu sama atau berbeda? Diskusikan alasannya.", bersih(0), tambah(0, teks("p", 78, 30, "prediksi", 10, W.ungu), teks("h", 222, 30, "hasil", 10, W.ungu), kotak("pk", 20, 40, 116, 80, W.putih, W.ungu, { rx: 8 }), kotak("hk", 164, 40, 116, 80, W.putih, W.ungu, { rx: 8 })), tambah("prediksi", teks("pp1", 78, 66, "kuning paling mungkin", 8), teks("pp2", 78, 82, "merah di tengah", 8), teks("pp3", 78, 98, "biru, hijau kurang", 8)), tambah("hasil", teks("hh1", 222, 62, "kuning 3 kali", 8.5), teks("hh2", 222, 76, "merah 1 kali", 8.5), teks("hh3", 222, 90, "biru 1 kali", 8.5), teks("hh4", 222, 104, "hijau 0 kali", 8.5)), tambah("sama", teks("eq", 150, 84, "=?", 24, W.merah)), tambah("alasannya", emo("diskusi", 150, 164, "💬", 28))),
    k("Langkah keenam, kalau percobaan ditambah, apakah hasil dan prediksimu akan lebih sesuai dengan peluang? Buku mengajak kita mencoba dan membuktikannya.", bersih(0), tambah(0, teks("jud", 150, 24, "Misalnya diputar 20 kali (contoh)", 9.5, W.ungu), garis("d", 40, 160, 220, 0, W.biru, 2, { gambar: true })), tambah("percobaan", batang("w1", 60, 160, 28, 5 * 9, "#FACC15"), teks("w1n", 74, 160 - 45 - 4, "kuning", 7)), tambah("ditambah", batang("w2", 110, 160, 28, 5 * 6, "#EF4444"), teks("w2n", 124, 160 - 30 - 4, "merah", 7)), ubah("ditambah", { id: "w1", y: 160 - 9 * 9, h: 9 * 9 }, { id: "w1n", y: 160 - 81 - 4 }), tambah("lebih", batang("w3", 160, 160, 28, 3 * 6, "#3B82F6"), batang("w4", 210, 160, 28, 3 * 6, "#22C55E")), tambah("membuktikannya", teks("bk", 150, 186, "lebih banyak percobaan, kuning paling banyak", 8.5, W.hijau))),
    k("Buku Panduan Guru menyimpulkan: peluang adalah prediksi terbaik berdasarkan data yang ada, tetapi hasil nyata belum tentu selalu sama dengan prediksi.", bersih(0), tambah(0, kotak("kes", 18, 40, 264, 100, W.putih, W.emas, { rx: 14, tebal: 3 })), tambah("peluang", teks("k1", 150, 68, "PELUANG", 18, W.biru)), tambah("prediksi", teks("k2", 150, 90, "= prediksi terbaik dari data", 10)), tambah("belum", teks("k3", 150, 114, "hasil nyata belum tentu sama", 10, W.merah)), tambah("tentu", teks("k4", 150, 128, "dengan prediksi", 10, W.merah))),
    k("Karena itu peluang tetap berguna. Dengan belajar peluang, kita bisa membuat prediksi yang mendasar. Sub-Bab A selesai, berikutnya kita membandingkan peluang dua kejadian.", bersih(0), tambah(0, SK9.semua), tambah("berguna", emo("ok", 150, 100, "👍", 30)), tambah("prediksi", teks("pd", 150, 134, "prediksi yang mendasar", 10, W.hijau)), tambah("berikutnya", panah("nx", 230, 170, 40, 0, W.ungu, 3, { gambar: true }), teks("bb", 200, 190, "Sub-Bab B: membandingkan peluang", 8.5, W.ungu))),
  ],
};
