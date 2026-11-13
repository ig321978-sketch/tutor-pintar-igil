import type { AdeganStory } from "./logika-story";
import { W, batangH, batangV, emo, garis, kartu, sumbuH, sumbuV, teks, type GH, type GV } from "./k5b8c-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k5b8c-bantu";

/** Kartu metode pada peta empat metode: kotak berjudul dan satu baris keterangan. */
const metode = (id: string, x: number, y: number, nama: string[], ket: string, warna: string) => [...kartu(id, x, y, 134, 64, warna, nama, 7.2), teks(`${id}-s`, x + 67, y + 56, ket, 7, W.biru)];

/* ------------------------------ 1. Peta empat metode luar ------------------------------ */
export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Empat metode luar untuk diagram batang",
  sumber: "Metode luar · peta empat metode",
  latar: "#F5F3FF",
  ketukan: [
    k(
      "Video ini membahas empat metode luar untuk diagram batang. Tiap metode kita lihat konsepnya, lalu kita terapkan pada data dari buku.",
      tambah(0, teks("jud", 150, 26, "Empat Metode Luar", 15, W.ungu)),
      tambah("metode", emo("alat", 150, 76, "🧰", 34)),
      tambah("konsepnya", ...kartu("kn", 40, 100, 100, 44, W.krem, ["konsep"], 11)),
      tambah("terapkan", ...kartu("tr", 160, 100, 100, 44, W.mint, ["terapan"], 11)),
    ),
    k(
      "Metode pertama, Bar Chart Reading Protocol, membaca diagram dengan urutan langkah yang tetap, dari judul sampai jawaban.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Empat Metode Luar", 14, W.ungu)),
      tambah("pertama,", ...metode("m1", 10, 36, ["Bar Chart", "Reading Protocol"], "baca urut lima langkah", W.krem)),
      sorotkan("Bar", "m1-k"),
    ),
    k(
      "Metode kedua, Axis Scale Consistency, menjaga skala sumbu tetap jujur dan sama saat membandingkan.",
      tambah("kedua,", ...metode("m2", 156, 36, ["Axis Scale", "Consistency"], "skala jujur dan sama", W.mint)),
      sorotkan("Axis", "m2-k"),
      ubah("kedua,", { id: "m1-k", sorot: false }),
    ),
    k(
      "Metode ketiga, Comparative Bar Analysis, mengajukan pertanyaan tertinggi, terendah, selisih, jumlah, dan urutan.",
      tambah("ketiga,", ...metode("m3", 10, 106, ["Comparative", "Bar Analysis"], "tertinggi, selisih, urutan", W.langit)),
      sorotkan("Comparative", "m3-k"),
      ubah("ketiga,", { id: "m2-k", sorot: false }),
    ),
    k(
      "Metode keempat, Double Bar Merge Table, menggabung dua tabel menjadi satu tabel, lalu menjadi diagram batang ganda.",
      tambah("keempat,", ...metode("m4", 156, 106, ["Double Bar", "Merge Table"], "tabel gabungan, batang ganda", W.mawar)),
      sorotkan("Double", "m4-k"),
      ubah("keempat,", { id: "m3-k", sorot: false }),
    ),
    k(
      "Contoh datanya dari buku: kalori makanan, medali emas Sea Games, pengunjung perpustakaan, dan nilai ulangan Komang dan teman-temannya.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Data contoh dari buku", 13, W.ungu)),
      tambah("kalori", ...kartu("a1", 40, 38, 220, 30, W.krem, ["kalori makanan"], 10)),
      tambah("medali", ...kartu("a2", 40, 76, 220, 30, W.mint, ["medali emas Sea Games"], 10)),
      tambah("pengunjung", ...kartu("a3", 40, 114, 220, 30, W.langit, ["pengunjung perpustakaan"], 10)),
      tambah("nilai", ...kartu("a4", 40, 152, 220, 30, W.mawar, ["nilai ulangan Komang dkk"], 10)),
    ),
  ],
};

/* ------------------------------ 2. Bar Chart Reading Protocol: konsep ------------------------------ */
const LANGKAH = ["1. Judul: data apa?", "2. Sumbu: kategori dan satuan", "3. Skala: satu garis berapa?", "4. Batang: tarik garis ke sumbu nilai", "5. Jawab dengan angka dan satuan"];
const baris = (i: number, warna: string, id = "ls") => kartu(`${id}${i}`, 20, 40 + i * 28, 260, 24, warna, [LANGKAH[i]], 9);

export const ADEGAN_LUAR_BCRP: AdeganStory = {
  id: "luar-bcrp",
  judul: "Bar Chart Reading Protocol: lima langkah membaca",
  sumber: "Metode luar · Bar Chart Reading Protocol",
  latar: "#FFFBEB",
  ketukan: [
    k(
      "Bar Chart Reading Protocol. Jangan langsung menebak. Bacalah diagram batang dengan lima langkah yang selalu sama.",
      tambah(0, teks("jud", 150, 22, "Bar Chart Reading Protocol", 11, W.ungu)),
      tambah("Jangan", emo("em", 150, 100, "📖", 40)),
      tambah("lima", teks("lm", 150, 150, "lima langkah tetap", 10, W.hijau)),
    ),
    k(
      "Langkah pertama, baca judul. Judul memberi tahu data apa yang sedang digambar.",
      hapus(0, "em", "lm"),
      tambah("pertama,", ...baris(0, W.krem)),
      sorotkan("judul.", "ls0-k"),
    ),
    k(
      "Langkah kedua, baca nama kedua sumbu dan satuannya. Satu sumbu berisi kategori, sumbu yang lain berisi nilai.",
      tambah("kedua,", ...baris(1, W.mint)),
      ubah("kedua,", { id: "ls0-k", sorot: false }),
      sorotkan("sumbu", "ls1-k"),
    ),
    k(
      "Langkah ketiga, cari skalanya: satu garis mewakili berapa. Langkah keempat, tarik garis dari ujung batang ke sumbu nilai.",
      tambah("ketiga,", ...baris(2, W.langit)),
      tambah("keempat,", ...baris(3, W.mawar)),
      ubah("ketiga,", { id: "ls1-k", sorot: false }),
      sorotkan("tarik", "ls3-k"),
    ),
    k(
      "Langkah kelima, jawab pertanyaan memakai angka yang sudah terbaca, dan tulis satuannya.",
      tambah("kelima,", ...baris(4, W.jeruk)),
      ubah("kelima,", { id: "ls3-k", sorot: false }),
      sorotkan("jawab", "ls4-k"),
    ),
  ],
};

/* ------------------------------ 3. Bar Chart Reading Protocol: terapan pada diagram kalori ------------------------------ */
const GK2: GH = { x: 84, y: 38, w: 190, h: 96, maks: 300, langkah: 100 };
const KALORI4: [string, number][] = [
  ["Nasi putih", 130],
  ["Daging ayam", 260],
  ["Tempe goreng", 240],
  ["Sayuran hijau", 60],
];
const halus = Array.from({ length: 14 }, (_, i) => (i + 1) * 20).filter((n) => n % 100 !== 0);

export const ADEGAN_LUAR_BCRP_TERAPAN: AdeganStory = {
  id: "luar-bcrp-terapan",
  judul: "Bar Chart Reading Protocol pada diagram kalori",
  sumber: "Metode luar · Bar Chart Reading Protocol, contoh kalori makanan",
  latar: "#ECFEFF",
  ketukan: [
    k(
      "Terapkan pada diagram kalori makanan. Langkah pertama, judulnya Kandungan Kalori Per 100 Gram Makanan.",
      tambah(0, teks("jud", 150, 14, "Kandungan Kalori Per 100 Gram Makanan", 8.6, W.ungu), teks("bdg", 150, 28, "Langkah 1: baca judul", 9, W.hijau)),
      tambah("judulnya", emo("em", 150, 100, "🥗", 40)),
      sorotkan("judulnya", "jud"),
    ),
    k(
      "Langkah kedua, sumbu tegak berisi jenis makanan dan sumbu mendatar berisi kalori dalam kilokalori.",
      hapus(0, "em"),
      ubah(0, { id: "bdg", isi: "Langkah 2: baca sumbu" }, { id: "jud", sorot: false }),
      tambah("tegak", ...sumbuH("sk", GK2, false), teks("sy", 40, 26, "jenis", 6.8), teks("sy2", 40, 34, "makanan", 6.8)),
      tambah("mendatar", teks("sx", 180, 158, "kalori (kkal)", 7.6)),
    ),
    k(
      "Langkah ketiga, garis besarnya tiap seratus, yaitu nol, seratus, dua ratus, tiga ratus. Garis kecilnya tiap dua puluh.",
      ubah(0, { id: "bdg", isi: "Langkah 3: baca skala" }),
      tambah("nol,", ...[0, 100, 200, 300].map((n) => teks(`sn${n}`, 84 + (n / 300) * 190, 146, String(n), 6.8, W.merah))),
      tambah("kecilnya", ...halus.map((n) => garis(`gh${n}`, 84 + (n / 300) * 190, 36, 0, 98, W.abu, 0.5, { putus: true }))),
    ),
    k(
      "Langkah keempat, batang tempe goreng berujung dua garis kecil setelah dua ratus, yaitu 240.",
      ubah(0, { id: "bdg", isi: "Langkah 4: tarik garis ke sumbu" }),
      tambah("batang", ...KALORI4.flatMap(([nama, n], i) => batangH(`kb${i}`, GK2, i, 4, n, i === 2 ? W.batang2 : W.batang, nama))),
      sorotkan("tempe", "kb2-k"),
    ),
    k(
      "Langkah kelima, jawab: dalam 100 gram tempe goreng ada 240 kilokalori, lebih banyak daripada nasi putih yang 130.",
      ubah(0, { id: "bdg", isi: "Langkah 5: jawab dengan satuan" }),
      tambah("tempe", ...kartu("jw", 20, 164, 260, 32, W.mint, ["100 g tempe goreng: 240 kkal", "nasi putih: 130 kkal"], 8.6)),
    ),
  ],
};

/* ------------------------------ 4. Axis Scale Consistency: konsep ------------------------------ */
const GZ: GV = { x: 70, y: 150, w: 90, h: 90, maks: 60, langkah: 20 };

export const ADEGAN_LUAR_ASC: AdeganStory = {
  id: "luar-asc",
  judul: "Axis Scale Consistency: aturan skala sumbu",
  sumber: "Metode luar · Axis Scale Consistency",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Axis Scale Consistency. Skala sumbu adalah aturan berapa nilai untuk setiap garis. Aturan itu harus sama dan jujur.",
      tambah(0, teks("jud", 150, 22, "Axis Scale Consistency", 12, W.ungu)),
      tambah("Skala", ...kartu("s1", 40, 50, 220, 46, W.krem, ["skala sumbu", "satu garis = berapa nilai?"], 9.4)),
      tambah("sama", ...kartu("s2", 40, 108, 220, 40, W.mint, ["harus sama dan jujur"], 10)),
    ),
    k(
      "Aturan pertama, sumbu nilai mulai dari nol. Aturan kedua, jarak antargaris sama, misalnya tiap 20.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Aturan 1 dan 2", 12, W.ungu)),
      tambah("nilai", ...sumbuV("az", GZ), ...batangV("az", GZ, 0, 1, 40, W.batang, "contoh", { angka: false })),
      tambah("nol.", teks("n0", 190, 154, "mulai dari 0", 8, W.merah, { anchor: "start" })),
      tambah("tiap", teks("n20", 190, 110, "tiap 20", 8, W.hijau, { anchor: "start" })),
    ),
    k(
      "Aturan ketiga, garis kecil punya nilai sendiri. Jika garis besar 20 dan ada empat garis kecil, tiap garis kecil bernilai 4.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Aturan 3: garis kecil", 12, W.ungu)),
      tambah("ketiga,", garis("ax", 100, 160, 0, -120, W.biru, 1.6), teks("z20", 94, 163, "20", 8, W.biru, { anchor: "end" }), teks("z40", 94, 43, "40", 8, W.biru, { anchor: "end" })),
      tambah("empat", ...[24, 28, 32, 36].flatMap((n) => [garis(`zg${n}`, 100, 160 - (n - 20) * 6, 40, 0, W.abu, 1), teks(`zt${n}`, 94, 163 - (n - 20) * 6, String(n), 7, W.biru, { anchor: "end" })])),
      tambah("bernilai", teks("zs", 190, 100, "tiap garis kecil = 4", 9, W.hijau)),
      sorotkan("bernilai", "zg24"),
    ),
    k(
      "Aturan keempat, kalau dua diagram akan dibandingkan, skalanya harus sama. Tanpa itu, tinggi batang bisa menipu.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Aturan 4: dibandingkan", 12, W.ungu)),
      tambah("dua", ...kartu("b1", 20, 44, 120, 50, W.mawar, ["skala berbeda", "menipu"], 10), emo("x", 80, 124, "❌", 24)),
      tambah("harus", ...kartu("b2", 160, 44, 120, 50, W.mint, ["skala sama", "jujur"], 10), emo("ok", 220, 124, "✅", 24)),
    ),
  ],
};

/* ------------------------------ 5. Axis Scale Consistency: terapan pada siswa laki-laki dan perempuan ------------------------------ */
const GAL: GV = { x: 40, y: 140, w: 90, h: 80, maks: 30, langkah: 10 };
const GAR: GV = { x: 170, y: 140, w: 90, h: 80, maks: 18, langkah: 6 };
const GAL2: GV = { x: 40, y: 140, w: 90, h: 80, maks: 18, langkah: 6 };

export const ADEGAN_LUAR_ASC_TERAPAN: AdeganStory = {
  id: "luar-asc-terapan",
  judul: "Axis Scale Consistency pada siswa laki-laki dan perempuan",
  sumber: "Metode luar · Axis Scale Consistency, contoh Eksplorasi 8.3D",
  latar: "#FDF4FF",
  ketukan: [
    k(
      "Contoh dari Eksplorasi 8.3D. Laki-laki tahun 2019 sebanyak 16, perempuan tahun 2020 juga sebanyak 16.",
      tambah(0, teks("jud", 150, 16, "Eksplorasi 8.3D", 11, W.ungu)),
      tambah("Laki-laki", teks("tl", 85, 32, "Laki-laki", 8, W.batang), ...sumbuV("ga", GAL), ...batangV("la", GAL, 1, 3, 16, W.batang, "2019")),
      tambah("perempuan", teks("tp", 215, 32, "Perempuan", 8, W.batang2), ...sumbuV("gb", GAR), ...batangV("pa", GAR, 1, 3, 16, W.batang2, "2020")),
    ),
    k(
      "Tetapi diagram laki-laki berskala sampai 30, diagram perempuan sampai 18. Karena skala beda, dua nilai yang sama tampak berbeda tinggi.",
      sorotkan("skala", "ga-a30", "gb-a18"),
      tambah("berbeda", teks("bd", 150, 176, "nilai sama, tinggi tampak berbeda", 8.8, W.merah)),
    ),
    k(
      "Jadi samakan skalanya, nol sampai 18, pada kedua diagram. Sekarang dua batang 16 sama tinggi.",
      bersih(0),
      tambah(0, teks("jud", 150, 16, "Skala disamakan: 0 sampai 18", 10.5, W.ungu)),
      tambah("samakan", teks("tl", 85, 32, "Laki-laki", 8, W.batang), ...sumbuV("ga", GAL2), ...batangV("la", GAL2, 1, 3, 16, W.batang, "2019")),
      tambah("kedua", teks("tp", 215, 32, "Perempuan", 8, W.batang2), ...sumbuV("gb", GAR), ...batangV("pa", GAR, 1, 3, 16, W.batang2, "2020")),
      tambah("sama@2", emo("ok", 150, 194, "✅", 16)),
    ),
    k(
      "Hasilnya adil, sebab skala konsisten dan perbandingan menjadi jujur.",
      tambah("adil,", teks("hs", 150, 171, "skala sama, perbandingan jujur", 9.4, W.hijau)),
      sorotkan("konsisten", "la-k", "pa-k"),
    ),
  ],
};
