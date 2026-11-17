import type { AdeganStory } from "./logika-story";
import { E, W, bingkai, busur, deretKarcis, emo, garisAngka, idDeret, judul, kartu, kotak, karcis, orang, pagar, barisAnak, loket, teks, titikBil, titikSel } from "./k1b6B-gambar";
import { hapus, k, sorotkan, tambah, ubah, urutBilangan } from "./k1b6B-bantu";

/*
 * Cerita orisinal IGIL "Loket Karcis" (Kelas 1 Bab 6 Sub-Bab B, penjumlahan dengan hasil sampai dua puluh), cerita Pasar Malam Kampung.
 * Naskah suara dari naskah/story-naskah-k1b6b.md. Bagian ini: antrean di loket, hitung maju (salah langkah), dan genapkan sepuluh.
 */

/** Id kartu `kartu()` (kotak dan satu baris teks). */
const kid = (id: string): string[] => [`${id}-k`, `${id}-t0`];
const ORANG = (id: string): string[] => [id, `${id}-n`];

/* ------------------------------ 1. Antrean di loket ------------------------------ */
const SUARA_A1 = "Antrean di loket karcis memanjang sampai ke pagar. Abang menjual karcis, Igil membantu menghitung.";
const SUARA_A2 = "Rombongan pertama membeli delapan karcis, rombongan kedua tujuh karcis.";
const SUARA_A3 = "Kata Pak RT, hitung yang benar! Komidi putar hanya boleh dinaiki sebanyak karcis yang terjual.";
const [A2_8, A2_7] = urutBilangan(SUARA_A2, [8, 7]);
const ANTRE = ["q0", "q1", "q2", "q3", "q4"];
const PAGAR = ["pg0", "pg1", "pg2", "pg-p"];

export const ADEGAN_ANTRE: AdeganStory = {
  id: "antre",
  judul: "Antrean di loket karcis",
  sumber: "Materi: antrean dan masalah karcis",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Antrean di loket karcis")),
      tambah("loket", ...loket("lk", 8, 40)),
      tambah("memanjang", ...barisAnak("q", 5, 120, 150, 26)),
      tambah("pagar", ...pagar("pg", 262, 134)),
      tambah("Abang", ...orang("ab", 36, 112, E.abang, "Abang")),
      tambah("Igil", ...orang("ig", 80, 112, E.igil, "Igil")),
    ),
    k(
      SUARA_A2,
      hapus(0, ...ANTRE, ...PAGAR, ...ORANG("ab"), ...ORANG("ig")),
      tambah("pertama", emo("r1", 112, 76, E.anak, 22), teks("r1-n", 112, 90, "pertama", 7.5, W.ungu)),
      tambah(A2_8, ...deretKarcis("a", 8, 128, 66, 13.5), teks("a-n", 262, 82, "8", 20, W.merah)),
      tambah("kedua", emo("r2", 112, 126, E.anak, 22), teks("r2-n", 112, 140, "kedua", 7.5, W.ungu)),
      tambah(A2_7, ...deretKarcis("b", 7, 128, 116, 13.5), teks("b-n", 262, 132, "7", 20, W.merah)),
    ),
    k(
      SUARA_A3,
      hapus(0, "r1", "r1-n", "r2", "r2-n", ...idDeret("a", 0, 7), ...idDeret("b", 0, 6), "a-n", "b-n"),
      tambah("Pak", ...orang("pr", 60, 160, E.pakRT, "Pak RT")),
      tambah("hitung", ...kartu("bl", 20, 106, 112, 22, W.krem, ["hitung yang benar!"], 9)),
      tambah("Komidi", emo("kp", 228, 90, E.komidi, 44)),
      tambah("karcis", ...kartu("tj", 150, 140, 140, 24, W.hijauMuda, ["karcis terjual: 8 dan 7"], 9.4)),
    ),
  ],
};

/* ------------------------------ 2. Hitung maju (salah langkah) ------------------------------ */
const SUARA_M1 = "Igil mulai dari delapan, lalu maju tujuh kali: delapan, sembilan, sepuluh, sebelas, dua belas, tiga belas, empat belas. Empat belas karcis!";
const SUARA_M2 = "Kaka menggeleng. Delapan sudah ada di kepalamu, jangan disebut lagi. Hitungan maju dimulai dari bilangan sesudahnya.";
const SUARA_M3 = "Sembilan, sepuluh, sebelas, dua belas, tiga belas, empat belas, lima belas. Delapan ditambah tujuh sama dengan lima belas.";
const [M1_8a, M1_7, M1_8b, M1_9, M1_10, M1_11, M1_12, M1_13, M1_14, M1_14b] = urutBilangan(SUARA_M1, [8, 7, 8, 9, 10, 11, 12, 13, 14, 14]);
const M1_LIST = [M1_9, M1_10, M1_11, M1_12, M1_13, M1_14];
const [M3_9, M3_10, M3_11, M3_12, M3_13, M3_14, M3_15, M3_8, M3_7, M3_15b] = urutBilangan(SUARA_M3, [9, 10, 11, 12, 13, 14, 15, 8, 7, 15]);
const M3_LIST = [M3_9, M3_10, M3_11, M3_12, M3_13, M3_14, M3_15];
const YA = 116;
const YG = 128;

export const ADEGAN_MAJU: AdeganStory = {
  id: "hitung-maju",
  judul: "Hitung maju dimulai dari bilangan sesudahnya",
  sumber: "Materi: hitung maju dan salah langkah",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Igil menghitung maju"), ...garisAngka("gb", YG)),
      tambah(0, ...orang("ig", 36, 58, E.igil, "Igil")),
      tambah(M1_8a, ...kartu("mu", 72, 34, 76, 20, W.hijauMuda, ["mulai: 8"], 9.4), titikBil("d8", 8, YA)),
      tambah(M1_7, ...kartu("ma", 156, 34, 84, 20, W.krem, ["maju 7 kali"], 9.4)),
      ubah(M1_8b, { id: "d8", sorot: true }),
      ...[9, 10, 11, 12, 13, 14].map((n, i) => tambah(M1_LIST[i], titikBil(`d${n}`, n, YA, W.oranye))),
      tambah(M1_14b, teks("h14", 150, 176, "14 karcis!", 16, W.merah)),
    ),
    k(
      SUARA_M2,
      hapus(0, ...kid("mu"), ...kid("ma"), ...ORANG("ig")),
      tambah("Kaka", ...orang("kk", 36, 58, E.kaka, "Kaka")),
      tambah("Delapan", ...kartu("kp", 74, 34, 150, 22, W.merahMuda, ["8 sudah ada di kepala"], 9.4)),
      tambah("jangan", emo("sx", 245, 104, E.salah, 16)),
      ubah("jangan", { id: "d8", sorot: false }),
      tambah("sesudahnya", ...kartu("sd", 74, 62, 104, 22, W.hijauMuda, ["mulai dari 9"], 9.4)),
    ),
    k(
      SUARA_M3,
      hapus(0, ...kid("kp"), ...kid("sd"), "sx", "h14", ...[9, 10, 11, 12, 13, 14].map((n) => `d${n}`)),
      ...[9, 10, 11, 12, 13, 14, 15].flatMap((n, i) => [tambah(M3_LIST[i], busur(`l${n}`, n - 1, n, YA, i % 2 ? W.ungu : W.merah, 9), titikBil(`e${n}`, n, YA, W.oranye))]),
      tambah(M3_8, ...kartu("pj", 74, 34, 150, 22, W.krem, ["8 + 7 = 15"], 11)),
      tambah(M3_7, teks("h7", 150, 176, "7 lompatan", 12, W.ungu)),
      tambah(M3_15b, emo("ok", 245, 104, E.benar, 18)),
    ),
  ],
};

/* ------------------------------ 3. Genapkan sepuluh (kucing di atas karcis) ------------------------------ */
const SUARA_G1 = "Seekor kucing melompat ke meja dan duduk di atas karcis. Igil berseru, kucingnya ikut membeli!";
const SUARA_G2 = "Abang mencoba cara baru untuk sembilan karcis dan lima karcis. Ambil satu dari lima untuk menggenapkan sembilan menjadi sepuluh.";
const SUARA_G3 = "Sepuluh ditambah empat sisanya sama dengan empat belas. Cara ini cepat kalau satu bilangan hampir sepuluh.";
const [G2_9a, G2_5a, G2_1, G2_5b, G2_9b, G2_10] = urutBilangan(SUARA_G2, [9, 5, 1, 5, 9, 10]);
const [G3_10a, G3_4a, G3_14, G3_1] = urutBilangan(SUARA_G3, [10, 4, 14, 1, 10]);
const BF = { x: 24, y: 56 };
const SEL9 = titikSel(BF.x, BF.y, 9, 18, 13);
const TUMPUK = [0, 1, 2, 3].map((i) => karcis(`t${i}`, 118 + (i % 2) * 3, 113 - i * 4, 14));

export const ADEGAN_GENAP: AdeganStory = {
  id: "genap-sepuluh",
  judul: "Genapkan sepuluh dulu",
  sumber: "Materi: genapkan sepuluh dan kucing di loket",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Kucing di atas karcis")),
      tambah(0, kotak("mj", 20, 122, 260, 9, W.coklat, W.biru, { rx: 2, tebal: 1.6 }), kotak("mj-k1", 40, 131, 5, 30, W.coklat, W.biru, { tebal: 1.2 }), kotak("mj-k2", 255, 131, 5, 30, W.coklat, W.biru, { tebal: 1.2 })),
      tambah("kucing", emo("kc", 36, 152, E.kucing, 28)),
      ubah("melompat", { id: "kc", x: 70, y: 100 }),
      tambah("meja", ...TUMPUK),
      ubah("duduk", { id: "kc", x: 125, y: 99 }),
      tambah("Igil", ...orang("ig", 250, 112, E.igil, "Igil")),
      tambah("berseru,", ...kartu("bs", 178, 52, 112, 22, W.krem, ["kucing ikut membeli!"], 9)),
    ),
    k(
      SUARA_G2,
      hapus(0, "mj", "mj-k1", "mj-k2", "kc", ...TUMPUK.map((t) => t.id), ...ORANG("ig"), ...kid("bs")),
      ubah(0, { id: "jud", isi: "Genapkan sepuluh dulu" }),
      tambah("Abang", ...orang("ab", 40, 150, E.abang, "Abang")),
      tambah(G2_9a, ...bingkai("bf", BF.x, BF.y, 9), teks("l9", 69, 50, "9", 12, W.merah)),
      tambah(G2_5a, ...deretKarcis("g", 5, 150, 70, 15, 12), teks("l5", 187, 60, "5", 12, W.merah)),
      tambah(G2_1, teks("l1", 156, 62, "1", 12, W.hijau)),
      sorotkan(G2_1, "g0"),
      ubah(G2_5b, { id: "l5", sorot: true }),
      ubah("menggenapkan", { id: "g0", x: SEL9.x, y: SEL9.y, sorot: false }),
      ubah(G2_9b, { id: "l5", sorot: false }),
      ubah(G2_10, { id: "l9", isi: "10" }),
      tambah(G2_10, ...kartu("eq", 100, 120, 100, 24, W.hijauMuda, ["9 + 1 = 10"], 11)),
    ),
    k(
      SUARA_G3,
      hapus(0, ...kid("eq"), "l1"),
      sorotkan(G3_10a, ...idDeret("bfk", 0, 8), "g0"),
      ubah(G3_4a, { id: "l5", isi: "4" }),
      sorotkan(G3_4a, "g1", "g2", "g3", "g4"),
      tambah(G3_14, ...kartu("e2", 100, 120, 100, 24, W.hijauMuda, ["10 + 4 = 14"], 11)),
      tambah(G3_1, ...kartu("hs", 80, 148, 150, 22, W.krem, ["1 bilangan hampir 10"], 9.4)),
    ),
  ],
};
