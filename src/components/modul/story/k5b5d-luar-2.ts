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
  sumber: "Metode luar: Fixed Area Minimize Perimeter",
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
      "Contoh: luas dua ratus dua puluh lima sentimeter persegi. Cari semua pasangan panjang dan lebar yang hasil kalinya dua ratus dua puluh lima, lalu hitung kelilingnya.",
      bersih(0),
      tambah(0, jud("Luas tetap 225 cm²", 22)),
      tambah("Cari", teks("o1", 150, 42, "panjang x lebar = 225", 10, W.merah)),
      tambah("hitung", kepalaTabel("oh", 54, ["panjang", "lebar", "keliling"])),
    ),
    k(
      "Pasangan satu dan dua ratus dua puluh lima berkeliling empat ratus lima puluh dua. Pasangan lima dan empat puluh lima berkeliling seratus. Pasangan sembilan dan dua puluh lima berkeliling enam puluh delapan.",
      tambah("berkeliling@1", baTabel("p1", 72, ["1", "225", "452"], W.merahMuda)),
      tambah("berkeliling@2", baTabel("p2", 90, ["5", "45", "100"], W.krem)),
      tambah("berkeliling@3", baTabel("p3", 108, ["9", "25", "68"], W.krem)),
    ),
    k(
      "Pasangan lima belas dan lima belas berkeliling enam puluh. Inilah keliling terkecil, bentuknya persegi, dan sama dengan kawat enam puluh pada soal Bapak.",
      tambah("lima", baTabel("p4", 126, ["15", "15", "60"], W.hijauMuda)),
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
  judul: "Fixed Area Minimize Perimeter: luas 200 pada bentuk pertama",
  sumber: "Metode luar: Minimize Perimeter, penerapan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Terapkan pada luas dua ratus dari bentuk pertama. Pasangan dua puluh dan sepuluh berkeliling enam puluh. Pasangan dua puluh lima dan delapan juga berluas dua ratus, tetapi kelilingnya enam puluh enam.",
      tambah(0, jud("Luas tetap 200", 22, 11)),
      tambah("Pasangan", kepalaTabel("lh", 40, ["panjang", "lebar", "keliling"])),
      tambah("berkeliling", baTabel("l1", 58, ["20", "10", "60"], W.hijauMuda)),
      tambah("juga", baTabel("l2", 76, ["25", "8", "66"], W.krem)),
    ),
    k(
      "Pasangan empat puluh dan lima berluas dua ratus dengan keliling sembilan puluh, dan pasangan lima puluh dan empat berkeliling seratus delapan. Makin pipih, makin panjang kelilingnya.",
      tambah("berluas", baTabel("l3", 94, ["40", "5", "90"], W.krem)),
      tambah("pasangan@2", baTabel("l4", 112, ["50", "4", "108"], W.merahMuda)),
      tambah("pipih,", teks("lp", 150, 152, "makin pipih, makin panjang keliling", 9, W.merah)),
    ),
    k(
      "Persegi bersisi empat belas luasnya seratus sembilan puluh enam, dan bersisi lima belas luasnya dua ratus dua puluh lima. Jadi luas dua ratus tidak bisa menjadi persegi dengan sisi bilangan bulat.",
      bersih(0),
      tambah(0, jud("Mengapa bukan persegi?", 22)),
      tambah("empat", teks("pq1", 150, 56, "14 x 14 = 196", 12, W.biru)),
      tambah("lima", teks("pq2", 150, 84, "15 x 15 = 225", 12, W.biru)),
      tambah("Jadi", teks("pq3", 150, 118, "196 < 200 < 225", 13, W.merah), teks("pq4", 150, 146, "200 di antara dua persegi", 9.4, W.ungu)),
    ),
    k(
      "Ringkasnya, pada luas dua ratus keliling bernilai enam puluh, enam puluh enam, sembilan puluh, dan seratus delapan, makin besar seiring bentuk makin pipih. Yang terkecil, enam puluh, ada pada dua puluh kali sepuluh.",
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
  sumber: "Metode luar: Squareness Ratio",
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
      "Rasio dapat ditulis sebagai perbandingan sederhana. Untuk lima dan dua puluh lima menjadi satu banding lima, dan untuk sepuluh dan dua puluh menjadi satu banding dua.",
      bersih(0),
      tambah(0, jud("Perbandingan sederhana", 22)),
      tambah("lima", baris("s1", 40, 40, 220, "5 : 25 → 1 : 5", W.merahMuda, 9.4, 22)),
      tambah("sepuluh", baris("s2", 40, 68, 220, "10 : 20 → 1 : 2", W.krem, 9.4, 22)),
    ),
    k(
      "Untuk dua belas dan delapan belas menjadi dua banding tiga. Untuk lima belas dan lima belas menjadi satu banding satu.",
      tambah("dua", baris("s3", 40, 96, 220, "12 : 18 → 2 : 3", W.krem, 9.4, 22)),
      tambah("lima", baris("s4", 40, 124, 220, "15 : 15 → 1 : 1", W.hijauMuda, 9.4, 22)),
    ),
    k(
      "Rasio tidak bergantung pada urutan: dua puluh dan sepuluh punya rasio sama dengan sepuluh dan dua puluh, yaitu satu banding dua, atau lima puluh persen.",
      bersih(0),
      tambah(0, jud("Urutan tidak berpengaruh", 22)),
      tambah("dua", baris("u1", 40, 50, 220, "20 x 10: rasio 1 : 2", W.krem, 9.4, 24)),
      tambah("sepuluh@2", baris("u2", 40, 86, 220, "10 x 20: rasio 1 : 2", W.krem, 9.4, 24)),
      tambah("lima", teks("u3", 150, 142, "sama: 50%", 13, W.hijau)),
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
  sumber: "Metode luar: Squareness Ratio, penerapan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Hitung rasio keempat bentuk berkeliling enam puluh. Bentuk lima kali dua puluh lima: lebar lima dibagi panjang dua puluh lima sama dengan dua puluh persen. Bentuk sepuluh kali dua puluh: lima puluh persen.",
      tambah(0, jud("Rasio bentuk berkeliling 60", 22, 11)),
      tambah("lima", baris("h1", 40, 46, 220, "5 x 25 → rasio 20%", W.merahMuda, 9.4, 24)),
      tambah("sepuluh", baris("h2", 40, 78, 220, "10 x 20 → rasio 50%", W.krem, 9.4, 24)),
    ),
    k(
      "Bentuk dua belas kali delapan belas: dua belas dibagi delapan belas sekitar enam puluh tujuh persen. Bentuk lima belas kali lima belas: seratus persen.",
      tambah("dua", baris("h3", 40, 110, 220, "12 x 18 → rasio 67%", W.krem, 9.4, 24)),
      tambah("lima", baris("h4", 40, 142, 220, "15 x 15 → rasio 100%", W.hijauMuda, 9.4, 24)),
    ),
    k(
      "Sekarang bandingkan dengan luasnya. Rasio dua puluh persen luasnya seratus dua puluh lima, rasio lima puluh persen luasnya dua ratus, rasio enam puluh tujuh persen luasnya dua ratus enam belas, dan rasio seratus persen luasnya dua ratus dua puluh lima.",
      bersih(0),
      tambah(0, jud("Rasio dan luas (cm²)", 20, 11)),
      ...RASIO.map(([, , r, l], i) => tambah(`Rasio@${i + 1}`, [...batang(`rb${i}`, 28 + i * 66, 168, 44, Math.round((l / 225) * 110), W.muda, `${l}`), teks(`rt${i}`, 50 + i * 66, 182, `${r}%`, 8.6, W.ungu)])),
    ),
    k(
      "Polanya jelas: makin besar rasio kepersegian, makin besar luasnya, padahal keliling tetap enam puluh. Rasio seratus persen memberi luas maksimum, yaitu dua ratus dua puluh lima.",
      ubah("seratus", { id: "rb3", warna: W.hijauMuda }),
      tambah("padahal", teks("rk", 150, 40, "keliling tetap 60", 9.4, W.merah)),
      tambah("maksimum,", teks("rm", 150, 196, "rasio 100%: luas maksimum", 8.8, W.hijau)),
    ),
  ],
};

/* ------------------------------ LB5. Ringkasan ------------------------------ */
export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar5d-ringkas",
  judul: "Ringkasan empat metode luar keliling dan luas",
  sumber: "Ringkasan metode luar",
  latar: "#EEF2FF",
  ketukan: [
    k(
      "Inilah ringkasan metode luar untuk hubungan keliling dan luas. Empat metode saling melengkapi, dan semuanya memakai angka dari kerangka kawat tadi.",
      tambah(0, jud("Ringkasan empat metode", 22, 12)),
      tambah("Empat", emo("rg", 150, 100, "🧰", 44)),
      tambah("kawat", teks("rg2", 150, 150, "kawat 60 cm", 9.4, W.ungu)),
    ),
    k(
      "Isoperimetric Relationship menunjukkan keliling sama belum tentu luas sama, dari seratus dua puluh lima sampai dua ratus dua puluh lima. Fixed Perimeter Maximize Area menemukan puncaknya pada lima belas kali lima belas.",
      bersih(0),
      tambah(0, jud("Keliling sama dan puncak", 22, 12)),
      tambah("Isoperimetric", kartu("rk1", 15, 44, 270, 46, W.krem, ["Isoperimetric Relationship", "keliling sama · 125 sampai 225"], 8.8)),
      tambah("Fixed", kartu("rk2", 15, 104, 270, 46, W.merahMuda, ["Fixed Perimeter Maximize Area", "puncak pada 15 x 15"], 8.8)),
    ),
    k(
      "Fixed Area Minimize Perimeter menunjukkan luas dua ratus dua puluh lima paling hemat kawat pada persegi, dengan keliling enam puluh. Squareness Ratio menilai kedekatan dengan persegi: seratus persen berarti persegi.",
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
