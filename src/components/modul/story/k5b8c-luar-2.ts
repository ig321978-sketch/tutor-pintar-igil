import type { AdeganStory } from "./logika-story";
import { W, barisTabel, batangGandaV, batangV, emo, garis, kartu, legenda, panah, sumbuV, tabel, teks, type GV } from "./k5b8c-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k5b8c-bantu";

/* ------------------------------ 6. Comparative Bar Analysis: konsep ------------------------------ */
const ENAM = ["1. mana yang tertinggi?", "2. mana yang terendah?", "3. berapa selisihnya?", "4. berapa jumlahnya?", "5. bagaimana urutannya?", "6. kapan naik dan turun?"];
const pertanyaan = (i: number, warna: string) => kartu(`q${i}`, 10 + (i % 2) * 146, 36 + Math.floor(i / 2) * 50, 134, 42, warna, [ENAM[i]], 8.2);

export const ADEGAN_LUAR_CBA: AdeganStory = {
  id: "luar-cba",
  judul: "Comparative Bar Analysis: enam pertanyaan analisis",
  sumber: "Metode luar · Comparative Bar Analysis",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Comparative Bar Analysis. Setelah membaca diagram, kita menganalisis dengan membandingkan batang. Ada enam pertanyaan pokok.",
      tambah(0, teks("jud", 150, 22, "Comparative Bar Analysis", 12, W.ungu)),
      tambah("menganalisis", emo("em", 150, 100, "🔍", 40)),
      tambah("enam", teks("en", 150, 150, "enam pertanyaan pokok", 10, W.hijau)),
    ),
    k(
      "Pertama dan kedua, mana batang tertinggi dan mana yang terendah? Cukup bandingkan tinggi batang.",
      hapus(0, "em", "en"),
      tambah("tertinggi", ...pertanyaan(0, W.mint)),
      tambah("terendah?", ...pertanyaan(1, W.mawar)),
    ),
    k(
      "Ketiga, berapa selisihnya? Kurangkan nilai tertinggi dengan nilai terendah.",
      tambah("selisihnya?", ...pertanyaan(2, W.krem)),
      sorotkan("Kurangkan", "q2-k"),
    ),
    k(
      "Keempat, berapa jumlahnya? Tambahkan nilai semua batang.",
      tambah("jumlahnya?", ...pertanyaan(3, W.langit)),
      sorotkan("Tambahkan", "q3-k"),
    ),
    k(
      "Kelima, bagaimana urutannya, dari terkecil atau dari terbesar? Keenam, kapan data naik dan kapan turun? Lihat batang yang berurutan.",
      tambah("urutannya,", ...pertanyaan(4, W.jeruk)),
      tambah("Keenam,", ...pertanyaan(5, W.mint)),
      sorotkan("berurutan.", "q5-k"),
    ),
  ],
};

/* ------------------------------ 7. Comparative Bar Analysis: terapan pada pengunjung perpustakaan ------------------------------ */
const HARI: [string, number][] = [
  ["Senin", 42],
  ["Selasa", 60],
  ["Rabu", 50],
  ["Kamis", 36],
  ["Jumat", 24],
  ["Sabtu", 48],
];
const URUT: [string, number][] = [...HARI].sort((a, b) => a[1] - b[1]);
const GP: GV = { x: 44, y: 130, w: 226, h: 84, maks: 60, langkah: 10 };

export const ADEGAN_LUAR_CBA_TERAPAN: AdeganStory = {
  id: "luar-cba-terapan",
  judul: "Comparative Bar Analysis pada pengunjung perpustakaan",
  sumber: "Metode luar · Comparative Bar Analysis, contoh Uji Kompetensi 1",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Terapkan pada pengunjung perpustakaan. Senin 42, Selasa 60, Rabu 50, Kamis 36, Jumat 24, Sabtu 48.",
      tambah(0, teks("jud", 150, 16, "Pengunjung Perpustakaan SD Pancasila", 9, W.ungu)),
      tambah("perpustakaan.", ...sumbuV("gp", GP)),
      ...HARI.map(([hari, n], i) => tambah(hari, ...batangV(`h${i}`, GP, i, 6, n, W.batang, hari))),
    ),
    k(
      "Tertinggi hari Selasa, 60. Terendah hari Jumat, 24. Selisihnya 60 dikurangi 24, yaitu 36.",
      sorotkan("Tertinggi", "h1-k"),
      tambah("Tertinggi", ...kartu("c1", 10, 152, 88, 40, W.mint, ["tertinggi", "Selasa 60"], 8.6)),
      sorotkan("Terendah", "h4-k"),
      tambah("Terendah", ...kartu("c2", 106, 152, 88, 40, W.mawar, ["terendah", "Jumat 24"], 8.6)),
      tambah("Selisihnya", ...kartu("c3", 202, 152, 88, 40, W.krem, ["selisih", "60 - 24 = 36"], 8.6)),
    ),
    k(
      "Jumlah seluruh pengunjung: 42 tambah 60 tambah 50 tambah 36 tambah 24 tambah 48, yaitu 260 orang.",
      bersih(0),
      tambah(0, teks("jud", 150, 26, "Jumlah pengunjung seminggu", 11, W.ungu)),
      tambah("42", teks("jm", 150, 90, "42 + 60 + 50 + 36 + 24 + 48 = 260", 11, W.ungu)),
      tambah("260", emo("or", 150, 138, "👥", 30), teks("jc", 150, 168, "hitungan tambahan, tidak ditanyakan buku", 7.6, W.biru)),
    ),
    k(
      "Urutan dari yang paling sedikit: Jumat, Kamis, Senin, Sabtu, Rabu, Selasa. Dari Kamis ke Jumat, pengunjung turun 12.",
      bersih(0),
      tambah(0, teks("jud", 150, 16, "Urutan dari yang paling sedikit", 9.6, W.ungu)),
      tambah("Urutan", ...sumbuV("gp", GP)),
      ...URUT.map(([hari, n], i) => tambah(hari, ...batangV(`u${i}`, GP, i, 6, n, W.batang, hari))),
      tambah("turun", teks("tk", 150, 160, "Kamis ke Jumat turun", 8.8, W.biru), teks("te", 150, 178, "36 - 24 = 12", 12, W.merah)),
    ),
  ],
};

/* ------------------------------ 8. Double Bar Merge Table: konsep ------------------------------ */
const GU: GV = { x: 90, y: 150, w: 120, h: 96, maks: 100, langkah: 25 };
const GR: GV = { x: 50, y: 150, w: 220, h: 90, maks: 100, langkah: 25 };

export const ADEGAN_LUAR_DBMT: AdeganStory = {
  id: "luar-dbmt",
  judul: "Double Bar Merge Table: tabel gabungan dan batang ganda",
  sumber: "Metode luar · Double Bar Merge Table",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Double Bar Merge Table. Dua data tentang hal yang sama bisa digabung. Caranya, mulai dari tabel gabungan.",
      tambah(0, teks("jud", 150, 22, "Double Bar Merge Table", 12, W.ungu)),
      tambah("Dua", ...kartu("a", 16, 40, 100, 38, W.langit, ["tabel data A"], 9), ...kartu("b", 16, 92, 100, 38, W.mawar, ["tabel data B"], 9)),
      tambah("digabung.", panah("p1", 118, 62, 44, 22, W.merah, 2, { gambar: true }), panah("p2", 118, 112, 44, -22, W.merah, 2, { gambar: true })),
      tambah("gabungan.", ...kartu("g", 166, 62, 118, 50, W.mint, ["tabel", "gabungan"], 10)),
    ),
    k(
      "Langkah pertama, tulis kategori yang sama di kolom pertama, lalu satu kolom nilai untuk tiap data.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Langkah 1: tabel gabungan", 11, W.ungu)),
      tambah("kategori", ...tabel("tb", 40, 40, [84, 68, 68], 22, [["Kategori", "Data A", "Data B"], ["kat. a", "...", "..."], ["kat. b", "...", "..."], ["kat. c", "...", "..."]], 8.6)),
      sorotkan("kolom", "tb-s00"),
      sorotkan("nilai", "tb-s01", "tb-s02"),
    ),
    k(
      "Langkah kedua, pilih satu skala yang cukup untuk nilai terbesar dari kedua kolom.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Langkah 2: satu skala", 11, W.ungu)),
      tambah("skala", ...sumbuV("gu", GU)),
      tambah("terbesar", garis("tg", 90, 54, 120, 0, W.merah, 1.4, { putus: true }), teks("tt", 216, 58, "nilai terbesar", 7.6, W.merah, { anchor: "start" })),
    ),
    k(
      "Langkah ketiga, gambar sepasang batang untuk tiap kategori, dan beri legenda warna agar pembaca tahu mana yang mana.",
      bersih(0),
      tambah(0, teks("jud", 150, 14, "Langkah 3: sepasang batang", 10, W.ungu)),
      tambah("ketiga,", ...sumbuV("gr", GR, false), ...[[60, 40], [30, 50], [80, 70]].flatMap(([a, b], i) => batangGandaV(`s${i}`, GR, i, 3, a, b, ["kat. a", "kat. b", "kat. c"][i], { angka: false }))),
      tambah("legenda", ...legenda("lg", 84, 22, "Data A", "Data B", 70)),
    ),
    k(
      "Syarat penggabungan: kategori sama, satuan sama, dan rentang nilai tidak terlalu jauh. Kalau ribuan melawan belasan, jangan digabung.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Syarat penggabungan", 12, W.ungu)),
      tambah("kategori", ...kartu("y1", 24, 38, 252, 28, W.mint, ["kategori sama"], 9.4), emo("e1", 262, 58, "✅", 14)),
      tambah("satuan", ...kartu("y2", 24, 72, 252, 28, W.mint, ["satuan sama"], 9.4), emo("e2", 262, 92, "✅", 14)),
      tambah("rentang", ...kartu("y3", 24, 106, 252, 28, W.mint, ["rentang nilai tidak terlalu jauh"], 9.4), emo("e3", 262, 126, "✅", 14)),
      tambah("ribuan", ...kartu("y4", 24, 148, 252, 28, W.mawar, ["ribuan lawan belasan: jangan digabung"], 9.4), emo("e4", 262, 168, "❌", 14)),
    ),
  ],
};

/* ------------------------------ 9. Double Bar Merge Table: terapan pada nilai ulangan ------------------------------ */
const NILAI: [string, number, number][] = [
  ["Lukas", 65, 80],
  ["Nisa", 70, 85],
  ["Komang", 50, 90],
  ["Asep", 90, 75],
  ["Yohana", 85, 80],
  ["Robert", 90, 65],
];
const GN: GV = { x: 40, y: 150, w: 232, h: 100, maks: 100, langkah: 25 };

export const ADEGAN_LUAR_DBMT_TERAPAN: AdeganStory = {
  id: "luar-dbmt-terapan",
  judul: "Double Bar Merge Table pada nilai ulangan",
  sumber: "Metode luar · Double Bar Merge Table, contoh Latihan nilai ulangan",
  latar: "#F0F9FF",
  ketukan: [
    k(
      "Terapkan pada nilai ulangan. Nama anak adalah kategori, nilai ulangan ke-1 dan ke-2 adalah dua kolom nilainya.",
      tambah(0, teks("jud", 150, 16, "Nilai ulangan Matematika", 10, W.ungu)),
      tambah("Nama", ...tabel("nl", 40, 24, [76, 72, 72], 19, [["Nama", "Ulangan ke-1", "Ulangan ke-2"]], 7.4)),
      tambah("kategori,", ...NILAI.flatMap(([nama, a, b], i) => barisTabel(`nl${i}`, 40, 43 + i * 19, [76, 72, 72], 19, [nama, String(a), String(b)], 8))),
      sorotkan("ke-1", "nl-s01"),
      sorotkan("ke-2", "nl-s02"),
    ),
    k(
      "Nilai terbesar adalah 90, jadi skala nol sampai 100 cukup untuk kedua kolom.",
      bersih(0),
      tambah(0, teks("jud", 150, 14, "Satu skala: 0 sampai 100", 10, W.ungu)),
      tambah("terbesar", ...sumbuV("gn", GN), garis("tz", 40, 150 - 90, 232, 0, W.merah, 1.4, { putus: true }), teks("tx", 160, 44, "nilai terbesar: 90", 8, W.merah)),
      tambah("kedua", ...legenda("lg", 70, 20, "Ulangan ke-1", "Ulangan ke-2", 74)),
    ),
    k(
      "Gambar sepasang batang untuk Lukas sampai Robert, biru untuk ulangan pertama dan merah muda untuk ulangan kedua.",
      tambah("Gambar", ...NILAI.slice(0, 3).flatMap(([nama, a, b], i) => batangGandaV(`n${i}`, GN, i, 6, a, b, nama))),
      tambah("Robert,", ...NILAI.slice(3).flatMap(([nama, a, b], i) => batangGandaV(`n${i + 3}`, GN, i + 3, 6, a, b, nama))),
      sorotkan("biru", "n0a-k", "n1a-k", "n2a-k", "n3a-k", "n4a-k", "n5a-k"),
    ),
    k(
      "Selisihnya terbaca dari pasangan batang: Komang naik 40, Lukas dan Nisa naik 15, Yohana turun 5, Asep turun 15, Robert turun 25.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Selisih tiap anak", 12, W.ungu)),
      tambah("Komang", ...kartu("d3", 106, 34, 88, 50, W.mint, ["Komang naik 40", "90 - 50 = 40"], 8.2)),
      tambah("Lukas", ...kartu("d1", 10, 34, 88, 50, W.mint, ["Lukas naik 15", "80 - 65 = 15"], 8.2)),
      tambah("Nisa", ...kartu("d2", 202, 34, 88, 50, W.mint, ["Nisa naik 15", "85 - 70 = 15"], 8.2)),
      tambah("Yohana", ...kartu("d5", 10, 98, 88, 50, W.mawar, ["Yohana turun 5", "85 - 80 = 5"], 8.2)),
      tambah("Asep", ...kartu("d4", 106, 98, 88, 50, W.mawar, ["Asep turun 15", "90 - 75 = 15"], 8.2)),
      tambah("Robert", ...kartu("d6", 202, 98, 88, 50, W.mawar, ["Robert turun 25", "90 - 65 = 25"], 8.2)),
    ),
  ],
};

/* ------------------------------ 10. Ringkasan empat metode luar ------------------------------ */
export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan empat metode luar diagram batang",
  sumber: "Ringkasan metode luar diagram batang",
  latar: "#F5F3FF",
  ketukan: [
    k(
      "Ringkasan. Pertama, Bar Chart Reading Protocol: baca judul, sumbu, skala, dan batang, lalu jawab dengan satuan.",
      tambah(0, teks("jud", 150, 22, "Ringkasan Empat Metode", 13, W.ungu)),
      tambah("Pertama,", ...kartu("r1", 16, 38, 268, 30, W.krem, ["Bar Chart Reading Protocol: baca lima langkah"], 8.2)),
    ),
    k(
      "Kedua, Axis Scale Consistency: skala mulai dari nol, jaraknya sama, dan harus sama saat membandingkan.",
      tambah("Kedua,", ...kartu("r2", 16, 76, 268, 30, W.mint, ["Axis Scale Consistency: skala jujur dan sama"], 8.2)),
    ),
    k(
      "Ketiga, Comparative Bar Analysis: tanyakan tertinggi, terendah, selisih, jumlah, urutan, serta naik dan turun.",
      tambah("Ketiga,", ...kartu("r3", 16, 114, 268, 30, W.langit, ["Comparative Bar Analysis: enam pertanyaan"], 8.2)),
    ),
    k(
      "Keempat, Double Bar Merge Table: tabel gabungan, satu skala, sepasang batang, dan legenda warna.",
      tambah("Keempat,", ...kartu("r4", 16, 152, 268, 30, W.mawar, ["Double Bar Merge Table: tabel gabungan, batang ganda"], 8.2)),
    ),
    k(
      "Dengan keempat metode ini, diagram batang tegak, mendatar, dan ganda bisa kita baca dan buat dengan teliti.",
      bersih(0),
      tambah(0, teks("jud", 150, 26, "Diagram batang dengan teliti", 12, W.ungu)),
      tambah("tegak,", ...[3, 5, 4].flatMap((n, i) => batangV(`z${i}`, { x: 30, y: 130, w: 80, h: 70, maks: 6, langkah: 2 }, i, 3, n, W.batang, "", { angka: false }))),
      tambah("mendatar,", ...[50, 30, 42].map((w, i) => ({ id: `y${i}`, t: "kotak" as const, x: 130, y: 70 + i * 22, w, h: 14, warna: W.batang2, garis: W.biru, rx: 1, tebal: 1 }))),
      tambah("ganda", ...batangGandaV("zg", { x: 214, y: 130, w: 70, h: 70, maks: 6, langkah: 2 }, 0, 1, 4, 3, "", { angka: false })),
      tambah("teliti.", emo("bin", 150, 170, "🌟", 26)),
    ),
  ],
};
