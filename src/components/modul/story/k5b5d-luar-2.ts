import type { AdeganStory, Obj } from "./logika-story";
import { W, barisTabel, baris, batang, emo, garis, kartu, kotak, teks } from "./k5b5d-gambar";
import { bersih, k, tambah, ubah } from "./k5b5d-bantu";

const jud = (isi: string, y = 20, u = 12): Obj => teks("jud", 150, y, isi, u, W.ungu);

const LEB = [60, 60, 66];
const baTabel = (id: string, y: number, isi: string[], warna: string, u = 8.4): Obj[] => barisTabel(id, 57, y, LEB, isi, warna, u, 18);
const kepalaTabel = (id: string, y: number, isi: string[]): Obj[] => baTabel(id, y, isi, W.biru).map((o) => (o.t === "teks" ? { ...o, warna: W.putih } : o));

/* ------------------------------ LB3. Fixed Area Minimize Perimeter: konsep ------------------------------ */
export const ADEGAN_LUAR_MIN: AdeganStory = {
  id: "luar5d-min",
  judul: "Fixed Area Minimize Perimeter: luas tetap, keliling terkecil",
  sumber: "Metode luar baru; kebalikan keliling tetap luas terbesar",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Fixed Area Minimize Perimeter adalah kebalikan metode sebelumnya: luasnya dibuat tetap, lalu kita mencari keliling yang terkecil. Berguna untuk menghemat kawat atau pagar.",
      tambah(0, jud("Fixed Area Minimize Perimeter", 22, 10.6)),
      tambah("luasnya", kartu("n1", 20, 44, 120, 50, W.muda, ["luas tetap"], 10)),
      tambah("keliling", kartu("n3", 160, 44, 120, 50, W.hijauMuda, ["keliling terkecil?"], 10)),
      tambah("menghemat", emo("n4", 150, 140, "🧵", 30), teks("n4t", 150, 166, "hemat kawat atau pagar", 9.4, W.ungu)),
    ),
    k(
      "Contoh: luas 225 sentimeter persegi. Cari semua pasangan panjang dan lebar yang hasil kalinya 225, lalu hitung kelilingnya.",
      bersih(0),
      tambah(0, jud("Luas tetap 225 cm²", 22)),
      tambah("Cari", teks("o1", 150, 42, "panjang x lebar = 225", 10, W.merah)),
      tambah("hitung", kepalaTabel("oh", 54, ["panjang", "lebar", "keliling"])),
    ),
    k(
      "Pasangan 1 dan 225 berkeliling 452. Pasangan 5 dan 45 berkeliling 100. Pasangan 9 dan 25 berkeliling 68.",
      tambah(1, baTabel("p1", 72, ["1", "225", "452"], W.merahMuda)),
      tambah(7, baTabel("p2", 90, ["5", "45", "100"], W.krem)),
      tambah(13, baTabel("p3", 108, ["9", "25", "68"], W.krem)),
    ),
    k(
      "Pasangan 15 dan 15 berkeliling 60. Inilah keliling terkecil, bentuknya persegi, dan sama dengan kawat 60 pada soal Bapak.",
      tambah("15", baTabel("p4", 126, ["15", "15", "60"], W.hijauMuda)),
      tambah("terkecil,", teks("o2", 150, 164, "keliling terkecil: 60", 10.4, W.hijau)),
    ),
    k(
      "Kesimpulan: untuk luas tetap, keliling paling pendek dicapai saat panjang sama dengan lebar. Jadi persegi paling hemat kawat.",
      bersih(0),
      tambah(0, jud("Kesimpulan", 22)),
      tambah("luas", kotak("q", 110, 56, 80, 80, W.hijauMuda, W.hijau, { tebal: 2.6 }), teks("qt", 150, 100, "persegi", 11, W.hijau)),
      tambah("hemat", teks("qh", 150, 166, "luas tetap, keliling terkecil", 10, W.ungu)),
    ),
  ],
};

/* ------------------------------ LB3t. Fixed Area Minimize Perimeter pada luas 200 (bentuk 1 buku) ------------------------------ */
const KEL200 = [
  ["20 x 10", 60],
  ["25 x 8", 66],
  ["40 x 5", 90],
  ["50 x 4", 108],
] as const;

export const ADEGAN_LUAR_MIN_TERAPAN: AdeganStory = {
  id: "luar5d-min-terapan",
  judul: "Fixed Area Minimize Perimeter: luas 200 dari buku",
  sumber: "Metode luar baru; penerapan pada luas 200 bentuk 1",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Terapkan pada luas 200 dari bentuk 1 di buku. Pasangan 20 dan 10 berkeliling 60. Pasangan 25 dan 8 juga berluas 200, tetapi kelilingnya 66.",
      tambah(0, jud("Luas tetap 200 (bentuk 1)", 22, 11)),
      tambah("Pasangan", kepalaTabel("lh", 40, ["panjang", "lebar", "keliling"])),
      tambah(10, baTabel("l1", 58, ["20", "10", "60"], W.hijauMuda)),
      tambah(16, baTabel("l2", 76, ["25", "8", "66"], W.krem)),
    ),
    k(
      "Pasangan 40 dan 5 berluas 200 dengan keliling 90, dan pasangan 50 dan 4 berkeliling 108. Makin pipih, makin panjang kelilingnya.",
      tambah(1, baTabel("l3", 94, ["40", "5", "90"], W.krem)),
      tambah(10, baTabel("l4", 112, ["50", "4", "108"], W.merahMuda)),
      tambah("pipih,", teks("lp", 150, 152, "makin pipih, makin panjang keliling", 9, W.merah)),
    ),
    k(
      "Persegi bersisi 14 luasnya 196, dan bersisi 15 luasnya 225. Jadi luas 200 tidak bisa menjadi persegi dengan sisi bilangan bulat.",
      bersih(0),
      tambah(0, jud("Mengapa bukan persegi?", 22)),
      tambah("14", teks("pq1", 150, 56, "14 x 14 = 196", 12, W.biru)),
      tambah("15", teks("pq2", 150, 84, "15 x 15 = 225", 12, W.biru)),
      tambah("Jadi", teks("pq3", 150, 118, "196 < 200 < 225", 13, W.merah), teks("pq4", 150, 146, "200 di antara dua persegi", 9.4, W.ungu)),
    ),
    k(
      "Ringkasnya, pada luas 200 keliling bernilai 60, 66, 90, dan 108, makin besar seiring bentuk makin pipih. Yang terkecil, 60, ada pada 20 kali 10.",
      bersih(0),
      tambah(0, jud("Keliling untuk luas 200", 18, 11)),
      tambah("keliling", KEL200.flatMap(([t, v], i) => [...batang(`kb${i}`, 28 + i * 66, 160, 44, Math.round((v / 108) * 100), i === 0 ? W.hijauMuda : W.krem, `${v}`), teks(`kt${i}`, 50 + i * 66, 174, t, 7.8, W.ungu)])),
      tambah("terkecil,", teks("kz", 150, 194, "terkecil: 60", 9, W.hijau)),
    ),
  ],
};

/* ------------------------------ LB4. Squareness Ratio: konsep ------------------------------ */
export const ADEGAN_LUAR_RASIO: AdeganStory = {
  id: "luar5d-rasio",
  judul: "Squareness Ratio: seberapa dekat dengan persegi",
  sumber: "Metode luar baru; rasio kepersegian persegi panjang",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Squareness Ratio artinya rasio kepersegian. Caranya membagi sisi yang pendek dengan sisi yang panjang, dinyatakan dalam persen. Hasilnya antara nol dan seratus persen.",
      tambah(0, jud("Squareness Ratio", 22)),
      tambah("membagi", teks("r1", 150, 56, "sisi pendek : sisi panjang", 10, W.biru)),
      tambah("persen.", garis("rs", 40, 120, 220, 0, W.biru, 2.6), garis("rs0", 40, 114, 0, 12, W.biru, 2), garis("rs1", 260, 114, 0, 12, W.biru, 2), teks("rs0t", 40, 140, "0%", 9.4), teks("rs1t", 260, 140, "100%", 9.4)),
      tambah("antara", teks("r2", 150, 172, "makin ke kanan, makin mirip persegi", 9, W.ungu)),
    ),
    k(
      "Persegi punya rasio seratus persen, karena kedua sisinya sama. Kerangka yang sangat pipih punya rasio kecil, mendekati nol.",
      bersih(0),
      tambah(0, jud("Dua ujung skala", 22)),
      tambah("Persegi", kotak("rq", 40, 56, 60, 60, W.hijauMuda, W.hijau, { tebal: 2.4 }), teks("rqt", 70, 136, "15 : 15 → 100%", 8.6, W.hijau)),
      tambah("pipih", kotak("rp", 150, 76, 120, 20, W.merahMuda, W.merah, { tebal: 2.4 }), teks("rpt", 210, 136, "5 : 25 → 20%", 8.6, W.merah)),
    ),
    k(
      "Rasio dapat ditulis sebagai perbandingan sederhana. Untuk 5 dan 25 menjadi 1 banding 5, untuk 10 dan 20 menjadi 1 banding 2, untuk 12 dan 18 menjadi 2 banding 3, dan untuk 15 dan 15 menjadi 1 banding 1.",
      bersih(0),
      tambah(0, jud("Perbandingan sederhana", 22)),
      tambah("5", baris("s1", 40, 40, 220, "5 : 25 → 1 : 5", W.merahMuda, 9.4, 22)),
      tambah("10", baris("s2", 40, 68, 220, "10 : 20 → 1 : 2", W.krem, 9.4, 22)),
      tambah("12", baris("s3", 40, 96, 220, "12 : 18 → 2 : 3", W.krem, 9.4, 22)),
      tambah("15", baris("s4", 40, 124, 220, "15 : 15 → 1 : 1", W.hijauMuda, 9.4, 22)),
    ),
    k(
      "Rasio tidak bergantung pada urutan: 20 dan 10 punya rasio sama dengan 10 dan 20, yaitu 1 banding 2, atau 50 persen.",
      bersih(0),
      tambah(0, jud("Urutan tidak berpengaruh", 22)),
      tambah("20", baris("u1", 40, 50, 220, "20 x 10: rasio 1 : 2", W.krem, 9.4, 24)),
      tambah("10", baris("u2", 40, 86, 220, "10 x 20: rasio 1 : 2", W.krem, 9.4, 24)),
      tambah("50", teks("u3", 150, 142, "sama: 50%", 13, W.hijau)),
    ),
  ],
};

/* ------------------------------ LB4t. Squareness Ratio pada empat bentuk berkeliling 60 ------------------------------ */
const RASIO: [number, number, number, number][] = [
  [5, 25, 20, 125],
  [10, 20, 50, 200],
  [12, 18, 67, 216],
  [15, 15, 100, 225],
];

export const ADEGAN_LUAR_RASIO_TERAPAN: AdeganStory = {
  id: "luar5d-rasio-terapan",
  judul: "Squareness Ratio: rasio dan luas pada keliling 60",
  sumber: "Metode luar baru; penerapan pada empat bentuk buku",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Hitung rasio keempat bentuk berkeliling 60. Bentuk 5 kali 25: lebar 5 dibagi panjang 25 sama dengan 20 persen. Bentuk 10 kali 20: 50 persen.",
      tambah(0, jud("Rasio bentuk berkeliling 60", 22, 11)),
      tambah("5", baris("h1", 40, 46, 220, "5 x 25 → rasio 20%", W.merahMuda, 9.4, 24)),
      tambah("10", baris("h2", 40, 78, 220, "10 x 20 → rasio 50%", W.krem, 9.4, 24)),
    ),
    k(
      "Bentuk 12 kali 18: 12 dibagi 18 sekitar 67 persen. Bentuk 15 kali 15: 100 persen.",
      tambah("12", baris("h3", 40, 110, 220, "12 x 18 → rasio 67%", W.krem, 9.4, 24)),
      tambah("15", baris("h4", 40, 142, 220, "15 x 15 → rasio 100%", W.hijauMuda, 9.4, 24)),
    ),
    k(
      "Sekarang bandingkan dengan luasnya. Rasio 20 persen luasnya 125, rasio 50 persen luasnya 200, rasio 67 persen luasnya 216, dan rasio 100 persen luasnya 225.",
      bersih(0),
      tambah(0, jud("Rasio dan luas (cm²)", 20, 11)),
      ...RASIO.map(([, , r, l], i) => tambah(`${r}`, [...batang(`rb${i}`, 28 + i * 66, 168, 44, Math.round((l / 225) * 110), W.muda, `${l}`), teks(`rt${i}`, 50 + i * 66, 182, `${r}%`, 8.6, W.ungu)])),
    ),
    k(
      "Polanya jelas: makin besar rasio kepersegian, makin besar luasnya, padahal keliling tetap 60. Rasio 100 persen memberi luas maksimum, yaitu 225.",
      ubah("100", { id: "rb3", warna: W.hijauMuda }),
      tambah("padahal", teks("rk", 150, 40, "keliling tetap 60", 9.4, W.merah)),
      tambah("maksimum,", teks("rm", 150, 196, "rasio 100%: luas maksimum", 8.8, W.hijau)),
    ),
  ],
};

/* ------------------------------ LB5. Ringkasan ------------------------------ */
export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar5d-ringkas",
  judul: "Ringkasan empat metode luar keliling dan luas",
  sumber: "Ringkasan metode luar; empat metode dan angka dari buku",
  latar: "#EEF2FF",
  ketukan: [
    k(
      "Ringkasan metode luar untuk hubungan keliling dan luas. Empat metode saling melengkapi, dan semuanya memakai angka dari Eksplorasi 5.4.",
      tambah(0, jud("Ringkasan empat metode", 22, 12)),
      tambah("Empat", emo("rg", 150, 100, "🧰", 44)),
      tambah("Eksplorasi", teks("rg2", 150, 150, "Eksplorasi 5.4", 9.4, W.ungu)),
    ),
    k(
      "Isoperimetric Relationship menunjukkan keliling sama belum tentu luas sama, dari 125 sampai 225. Fixed Perimeter Maximize Area menemukan puncaknya pada 15 kali 15.",
      bersih(0),
      tambah(0, jud("Keliling sama dan puncak", 22, 12)),
      tambah("Isoperimetric", kartu("rk1", 15, 44, 270, 46, W.krem, ["Isoperimetric Relationship", "keliling sama · 125 sampai 225"], 8.8)),
      tambah("Fixed", kartu("rk2", 15, 104, 270, 46, W.merahMuda, ["Fixed Perimeter Maximize Area", "puncak pada 15 x 15"], 8.8)),
    ),
    k(
      "Fixed Area Minimize Perimeter menunjukkan luas 225 paling hemat kawat 60 pada persegi. Squareness Ratio menilai kedekatan dengan persegi: 100 persen berarti persegi.",
      bersih(0),
      tambah(0, jud("Hemat dan mirip persegi", 22, 12)),
      tambah("Fixed", kartu("rk3", 15, 44, 270, 46, W.hijauMuda, ["Fixed Area Minimize Perimeter", "luas 225 · keliling 60"], 8.8)),
      tambah("Squareness", kartu("rk4", 15, 104, 270, 46, W.muda, ["Squareness Ratio", "100% berarti persegi"], 8.8)),
    ),
    k(
      "Gunakan bersama: periksa luas tiap bentuk, cari puncaknya, hemat keliling untuk luas tertentu, dan nilai kepersegiannya. Semoga membantu memahami hubungan keliling dan luas!",
      bersih(0),
      tambah(0, jud("Pakai bersama", 22, 12)),
      tambah("periksa", baris("pb1", 40, 40, 220, "1. periksa luas tiap bentuk", W.putih, 9, 24)),
      tambah("cari", baris("pb2", 40, 72, 220, "2. cari puncaknya", W.putih, 9, 24)),
      tambah("hemat", baris("pb3", 40, 104, 220, "3. hemat keliling untuk luas tertentu", W.putih, 9, 24)),
      tambah("nilai", baris("pb4", 40, 136, 220, "4. nilai kepersegiannya", W.hijauMuda, 9, 24)),
    ),
  ],
};
