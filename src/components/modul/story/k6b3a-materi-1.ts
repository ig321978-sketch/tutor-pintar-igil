import type { AdeganStory } from "./logika-story";
import { BAHAN, W, bulat, emo, fortDepan, garis, jalur, kotak, panah, susunKubus, teks } from "./k6b3a-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah } from "./k6b3a-bantu";

/* ------------------------------ 1. Tigor, Tenri, dan Fort Rotterdam ------------------------------ */
const batuBata = (id: string, x: number, y: number, baris: number, kolom: number) =>
  Array.from({ length: baris }, (_, r) => Array.from({ length: kolom }, (_, c) => kotak(`${id}${r}${c}`, x + c * 36 + (r % 2) * 18, y - r * 18, 34, 16, "#FCA5A5", W.merah, { rx: 1, tebal: 1 }))).flat();

export const ADEGAN_PEMBUKA: AdeganStory = {
  id: "pembuka-fort",
  judul: "Tigor, Tenri, dan Fort Rotterdam",
  sumber: "Materi: pembuka bab Kubus dan Balok",
  latar: "#F0F9FF",
  ketukan: [
    k(
      "Anak-anak, kita mulai bab tiga tentang kubus dan balok. Tigor dan Tenri sedang libur kenaikan kelas di Makassar, dan mereka mengunjungi sebuah bangunan tua bernama Fort Rotterdam.",
      tambah(0, teks("jud", 150, 22, "Bab 3 Kubus dan Balok", 12, W.ungu)),
      tambah("Tigor", emo("tigor", 40, 120, "🧒", 34), teks("tg", 40, 140, "Tigor", 8)),
      tambah("Tenri", emo("tenri", 40, 175, "👧", 34), teks("tn", 40, 195, "Tenri", 8)),
      tambah("Fort", fortDepan("fort", 100, 76, 170, 70, 34), teks("fj", 185, 58, "Fort Rotterdam", 11, W.coklat)),
    ),
    k(
      "Perhatikan bangunannya. Badannya tersusun dari balok, dan atapnya berbentuk prisma segitiga. Bangunan sebesar itu ternyata dibuat dari bangun ruang yang lebih sederhana.",
      bersih(0),
      tambah("Perhatikan", fortDepan("fort", 60, 62, 180, 78, 36), teks("fj", 150, 24, "Fort Rotterdam", 13, W.coklat)),
      tambah("balok,", teks("tb", 150, 168, "badan: balok", 10, W.hijau)),
      sorotkan("balok,", "fort-b"),
      tambah("prisma", teks("tp", 150, 52, "atap: prisma segitiga", 10, W.merah)),
      redamkan("prisma", "fort-b"),
      sorotkan("prisma", "fort-t"),
      tambah("sederhana.", teks("sd", 150, 190, "dari bangun ruang sederhana", 10, W.ungu)),
    ),
    k(
      "Di kelas lima kalian sudah belajar bahwa bangun datar dapat tersusun dari bangun datar lain. Bangun ruang pun bisa digabungkan menjadi bangun ruang yang berbeda. Rasanya seperti bermain balok mainan di rumah.",
      bersih(0),
      tambah("bangun", teks("kj", 80, 30, "bangun datar", 11, W.ungu), kotak("pers", 52, 52, 36, 36, "#BFDBFE"), jalur("segi", 92, 88, "M0 0 L16 -36 L32 0 Z", "#FDE68A", W.biru), teks("rmh", 80, 118, "tersusun jadi rumah", 8)),
      tambah("ruang", teks("rj", 220, 30, "bangun ruang", 11, W.ungu), kotak("bal", 190, 56, 54, 32, "#FDE68A", W.coklat), jalur("pri", 190, 56, "M0 0 L27 -26 L54 0 Z", "#B45309", W.coklat), teks("rfr", 220, 118, "balok + prisma", 8)),
      tambah("digabungkan", panah("pn", 108, 150, 84, 0, W.hijau, 3, { gambar: true }), teks("pnt", 150, 176, "digabung atau diuraikan", 10, W.hijau)),
    ),
    k(
      "Tembok benteng itu pun tersusun dari banyak batu bata. Bila tembok dibongkar, yang tersisa tumpukan batu bata. Menyusun dan menguraikan adalah dua gerakan yang saling berlawanan.",
      bersih(0),
      tambah("Tembok", ...batuBata("bt", 56, 120, 4, 5), teks("tt", 150, 34, "tembok dari batu bata", 10, W.coklat)),
      tambah("dibongkar,", ...[0, 1, 2, 3, 4, 5].map((i) => kotak(`tp${i}`, 64 + i * 34, 178, 30, 14, "#FCA5A5", W.merah, { rx: 1, tebal: 1 }))),
      sorotkan("tumpukan", "tp0", "tp1", "tp2", "tp3", "tp4", "tp5"),
      tambah("Menyusun", teks("ms", 70, 164, "menyusun", 9, W.hijau)),
      tambah("menguraikan", teks("mu", 232, 164, "menguraikan", 9, W.merah)),
    ),
    k(
      "Jadi pertanyaan kita di sub-bab ini begini. Berapa banyak kubus yang dipakai untuk membangun sebuah bangunan, termasuk kubus yang tidak kelihatan? Mari kita cari tahu bersama.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Berapa kubus yang dipakai?", 12, W.ungu)),
      tambah("Berapa", ...susunKubus("q", { s: 22, ox: 150, oy: 120 }, [[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1]], BAHAN.biru).objs),
      tambah("termasuk", teks("tq", 150, 176, "termasuk yang tak kelihatan?", 10, W.merah)),
      tambah("cari", emo("cr", 40, 70, "🔎", 28)),
    ),
  ],
};

/* ------------------------------ 2. Tujuan, pertanyaan pemantik, peta konsep, mengingat kembali (administratif, tidak diputar) ------------------------------ */
const kartuTujuan = (id: string, y: number, nomor: string, baris: string[]) => [
  kotak(`${id}-k`, 14, y, 272, 44, "#FEF9C3", W.biru, { rx: 10 }),
  bulat(`${id}-n`, 34, y + 22, 11, W.biru, W.biru),
  teks(`${id}-nt`, 34, y + 26, nomor, 11, W.putih),
  ...baris.map((b, i) => teks(`${id}-b${i}`, 160, y + 18 + i * 12, b, 8.6)),
];
const LAMPAU = [
  ["balok", "12 rusuk", 36],
  ["prisma segitiga", "5 sisi", 70],
  ["limas segi empat", "5 titik sudut", 104],
] as const;

export const ADEGAN_TUJUAN: AdeganStory = {
  id: "tujuan-ingat",
  judul: "Tujuan bab, peta konsep, dan mengingat kembali",
  sumber: "Materi: tujuan, peta konsep, mengingat",
  latar: "#FFFBEA",
  ketukan: [
    k("Tujuan pertama bab ini: menentukan hasil menyusun dan mengurai kubus, balok, dan gabungannya.", tambah(0, teks("jud", 150, 22, "Tujuan pembelajaran Bab 3", 11, W.ungu)), tambah("pertama", kartuTujuan("t1", 34, "1", ["menyusun dan mengurai", "kubus, balok, dan gabungannya"]))),
    k("Tujuan kedua: menyusun bangun ruang berdasarkan model dua dimensinya, dan sebaliknya.", tambah("kedua", kartuTujuan("t2", 84, "2", ["menyusun bangun ruang dari", "model dua dimensi, dan sebaliknya"]))),
    k("Tujuan ketiga: memakai sistem berpetak untuk menyatakan lokasi, jalur, serta jarak horizontal dan vertikal.", tambah("ketiga", kartuTujuan("t3", 134, "3", ["sistem berpetak: lokasi, jalur,", "jarak horizontal dan vertikal"]))),
    k(
      "Ada empat pertanyaan pemantik. Apakah bangun ruang dapat digabungkan dan dipisahkan? Apakah terlihat sama dari semua arah? Mengapa ada petak pada peta?",
      bersih(0),
      tambah(0, teks("pj", 150, 22, "Pertanyaan pemantik", 12, W.ungu)),
      tambah("digabungkan", kotak("q1", 20, 40, 260, 26, W.putih, W.biru, { rx: 8 }), teks("q1t", 150, 57, "dapat digabungkan dan dipisahkan?", 9)),
      tambah("sama", kotak("q2", 20, 74, 260, 26, W.putih, W.biru, { rx: 8 }), teks("q2t", 150, 91, "sama dari semua arah?", 9)),
      tambah("petak", kotak("q3", 20, 108, 260, 26, W.putih, W.biru, { rx: 8 }), teks("q3t", 150, 125, "mengapa ada petak pada peta?", 9)),
      tambah("peta@2", emo("tanya", 150, 170, "🤔", 30)),
    ),
    k(
      "Peta konsep Bab 3 punya tiga cabang: mengonstruksi dan mengurai, visualisasi spasial, dan lokasi. Kita mulai dari cabang pertama.",
      bersih(0),
      tambah("Peta", kotak("pk", 90, 24, 120, 34, "#DDD6FE", W.ungu, { rx: 10 }), teks("pkt", 150, 46, "Kubus dan Balok", 11, W.ungu)),
      tambah("mengonstruksi", garis("g1", 120, 58, -60, 40, W.biru, 1.6, { gambar: true }), kotak("c1", 20, 100, 82, 46, "#FEF08A", W.biru, { rx: 8 }), teks("c1a", 61, 118, "A. Mengonstruksi", 7.2), teks("c1b", 61, 130, "dan Mengurai", 7.2)),
      tambah("visualisasi", garis("g2", 150, 58, 0, 42, W.biru, 1.6, { gambar: true }), kotak("c2", 109, 100, 82, 46, "#BBF7D0", W.biru, { rx: 8 }), teks("c2a", 150, 118, "B. Visualisasi", 7.2), teks("c2b", 150, 130, "Spasial", 7.2)),
      tambah("lokasi,", garis("g3", 180, 58, 60, 40, W.biru, 1.6, { gambar: true }), kotak("c3", 198, 100, 82, 46, "#BFDBFE", W.biru, { rx: 8 }), teks("c3a", 239, 124, "C. Lokasi", 8)),
      ubah("pertama.", { id: "c1", garis: W.merah, tebal: 3 }),
    ),
    k(
      "Mengingat kembali: balok punya 12 rusuk, prisma segitiga punya 5 sisi, dan limas segi empat punya 5 titik sudut.",
      bersih(0),
      tambah(0, teks("mj", 150, 22, "Ayo mengingat kembali", 12, W.ungu)),
      ...LAMPAU.map(([nama, , y], i) => tambah(["balok", "prisma", "limas"][i], teks(`n${i}`, 40, y + 28, nama, 10, W.hitam, { anchor: "start" }), teks(`v${i}`, 190, y + 28, "", 1))),
      ubah("12", { id: "v0", isi: "12 rusuk", u: 11, warna: W.merah }),
      ubah("5", { id: "v1", isi: "5 sisi", u: 11, warna: W.merah }),
      ubah("5@2", { id: "v2", isi: "5 titik sudut", u: 11, warna: W.merah }),
    ),
    k(
      "Bola, tabung, dan kerucut dapat digelindingkan. Kubus, balok, prisma, dan tabung dapat ditumpuk. Adakah bangun ruang yang semua sisinya sama? Kubus.",
      bersih(0),
      tambah("Bola,", emo("bo", 54, 70, "⚽", 30), teks("bot", 54, 96, "bola", 8), emo("tb", 150, 70, "🥫", 30), teks("tbt", 150, 96, "tabung", 8), emo("kr", 246, 70, "🔺", 30), teks("krt", 246, 96, "kerucut", 8)),
      tambah("digelindingkan.", panah("gl", 54, 112, 192, 0, W.hijau, 3, { gambar: true }), teks("glt", 150, 130, "menggelinding", 9, W.hijau)),
      tambah("ditumpuk.", kotak("tu1", 110, 148, 30, 22, "#FDBA74"), kotak("tu2", 110, 126, 30, 22, "#93C5FD"), kotak("tu3", 160, 148, 30, 22, "#FDBA74"), teks("tut", 150, 188, "dapat ditumpuk", 9, W.hijau)),
      hapus("ditumpuk.", "gl", "glt"),
      tambah("sisinya", teks("kb", 150, 162, "kubus: semua sisi persegi sama", 9.4, W.merah)),
    ),
  ],
};

/* ------------------------------ 3. Perpustakaan kontainer ------------------------------ */
const KONTAINER_WARNA = ["#F87171", "#60A5FA", "#FBBF24", "#34D399"];
const blokKontainer = (id: string, x: number, y: number, n: number, w = 34, h = 18) => Array.from({ length: n }, (_, i) => kotak(`${id}${i}`, x + i * w, y, w - 2, h, KONTAINER_WARNA[i % 4], W.hitam, { rx: 1, tebal: 1 }));

export const ADEGAN_KONTAINER: AdeganStory = {
  id: "kontainer",
  judul: "Perpustakaan dari kontainer bekas",
  sumber: "Materi: perpustakaan kontainer",
  latar: "#F5F3FF",
  ketukan: [
    k(
      "Sekarang kita belajar mengonstruksi dan mengurai. Di Batu, Malang, ada sebuah perpustakaan yang terbuat dari kontainer bekas. Bayangkan, gedungnya tersusun dari kotak-kotak besar yang ukurannya sama.",
      tambah(0, teks("jud", 150, 22, "A. Mengonstruksi dan Mengurai", 11, W.ungu)),
      tambah("Batu,", teks("bt", 150, 48, "Perpustakaan Amin, Batu, Malang", 9, W.hitam)),
      tambah("perpustakaan", blokKontainer("a", 70, 130, 4), blokKontainer("b", 104, 112, 3), blokKontainer("c", 70, 94, 2)),
      tambah("kontainer", teks("kt", 150, 172, "dibangun dari kontainer bekas", 10, W.merah)),
    ),
    k(
      "Dapatkah kalian memperkirakan berapa kontainer yang dipakai? Caranya, hitung kotak demi kotak, lapisan demi lapisan, dari bawah ke atas. Kita tidak boleh melompat, supaya tidak ada yang terlewat.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "berapa kontainer?", 12, W.ungu)),
      tambah("kotak", blokKontainer("a", 70, 130, 4), blokKontainer("b", 104, 112, 3), blokKontainer("c", 70, 94, 2)),
      sorotkan("kotak", "a0", "a1", "a2", "a3"),
      tambah("lapisan", teks("l1", 36, 144, "bawah", 7.6)),
      sorotkan("lapisan@2", "b0", "b1", "b2"),
      tambah("atas.", teks("q", 150, 182, "dihitung satu per satu: ?", 12, W.merah)),
    ),
    k(
      "Di beberapa kota ada juga hotel dari susunan kontainer bekas, misalnya Royal Caravan Hotel di Trawas, Mojokerto.",
      bersih(0),
      tambah(0, ...blokKontainer("h1", 54, 138, 5), ...blokKontainer("h2", 54, 120, 5), ...blokKontainer("h3", 88, 102, 3)),
      tambah("hotel", teks("ht", 150, 60, "hotel dari kontainer", 12, W.ungu)),
      tambah("Royal", kotak("pl", 82, 160, 136, 22, W.putih, W.biru, { rx: 6 }), teks("plt", 150, 175, "Royal Caravan Hotel", 9)),
      tambah("Mojokerto.", teks("mj", 150, 198, "Trawas, Mojokerto", 8.6, W.hitam)),
    ),
    k(
      "Mengapa memakai kontainer? Alasan pertama, mendaur ulang kontainer yang biasanya menjadi limbah. Alasan kedua, membangunnya lebih singkat daripada bangunan biasa. Dua alasan itu membuat kontainer bekas banyak dipilih arsitek.",
      bersih(0),
      tambah("Mengapa", teks("mg", 150, 32, "mengapa kontainer?", 12, W.ungu)),
      tambah("pertama,", kotak("al1", 24, 54, 120, 80, "#DCFCE7", W.hijau, { rx: 10 }), emo("re", 84, 90, "♻", 30), teks("al1t", 84, 118, "daur ulang limbah", 9, W.hijau)),
      tambah("kedua,", kotak("al2", 156, 54, 120, 80, "#FEF3C7", W.emas, { rx: 10 }), emo("jm", 216, 90, "⏱", 30), teks("al2t", 216, 118, "waktu lebih singkat", 9, W.coklat)),
      tambah("daripada", teks("kv", 150, 170, "dibanding bangunan konvensional", 9.4, W.hitam)),
    ),
    k(
      "Sekarang kita masuk ke Latihan bersama. Kalian berperan sebagai arsitek yang merancang bangunan dari susunan kontainer. Bentuk bangunan apa saja yang bisa dihasilkan?",
      bersih(0),
      tambah(0, teks("jud", 150, 28, "Latihan bersama", 13, W.ungu)),
      tambah("arsitek", emo("ars", 60, 90, "👷", 36), teks("art", 60, 116, "kita jadi arsitek", 8)),
      tambah("susunan", ...blokKontainer("s1", 130, 110, 4, 34, 18), ...blokKontainer("s2", 130, 92, 2, 34, 18)),
      tambah("Bentuk", teks("q", 210, 70, "bentuk apa saja?", 11, W.merah)),
      tambah("dihasilkan?", panah("pa", 100, 100, 24, 0, W.hijau, 3, { gambar: true })),
    ),
  ],
};
