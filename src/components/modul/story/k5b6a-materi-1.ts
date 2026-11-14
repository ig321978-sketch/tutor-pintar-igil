import type { AdeganStory, Obj } from "./logika-story";
import { W, bulat, emo, garis, judul, kartu, kotak, panah, poligon, tabel, teks } from "./k5b6a-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k5b6a-bantu";

/* ------------------------------ 1. Pembuka bab: tujuan dan kata kunci (hlm. 163 sampai 164) ------------------------------ */
const WARNA_BARIS = [W.krem, W.langit, W.hijauMuda, W.pink, W.jingga, W.merahMuda];
const baris = (i: number, isi: string): Obj[] => kartu(`r${i + 1}`, 14, 32 + i * 25, 272, 21, WARNA_BARIS[i], [isi], 8.4);
const KATA_KUNCI = ["sudut", "sudut siku-siku", "kaki sudut", "titik sudut", "sudut lancip", "sudut tumpul", "sudut lurus", "sudut nol", "sudut refleks", "busur", "derajat"];
const chip = (i: number): Obj[] => kartu(`ch${i}`, 12 + (i % 3) * 96, 34 + Math.floor(i / 3) * 34, 90, 26, WARNA_BARIS[i % 6], [KATA_KUNCI[i]], 8.2);
const idChip = (i: number): string[] => [`ch${i}-k`, `ch${i}-t0`];

export const ADEGAN_PEMBUKA: AdeganStory = {
  id: "pembuka-bab",
  judul: "Pembuka Bab 6: tujuan dan kata kunci",
  sumber: "Buku Siswa hlm. 163–164",
  latar: "#FFF7ED",
  kutipan: [
    "Pada bab ini kalian akan belajar lebih mendalam tentang sudut.",
    "Kalian akan menemukan sudut siku-siku di lingkungan sekitar,",
    "memahami bagian-bagian sudut, menyebutkan jenis-jenis",
    "derajat, membandingkan besar sudut, dan menggambar sudut dengan ukuran tertentu.",
    "Sudut, sudut siku-siku, kaki sudut, titik sudut, sudut lancip, sudut",
  ],
  ketukan: [
    k(
      "Selamat datang di bab enam, Sudut. Di bab ini kalian akan belajar lebih mendalam tentang sudut.",
      tambah(0, judul("Bab 6: Sudut")),
      tambah("bab", emo("sd", 150, 112, "📐", 56)),
      tambah("mendalam", ...kartu("bl", 40, 150, 220, 30, W.krem, ["belajar lebih mendalam tentang sudut"], 9)),
    ),
    k(
      "Ada enam tujuan. Pertama, menemukan sudut siku-siku di lingkungan sekitar. Kedua, memahami bagian-bagian sudut. Ketiga, menyebutkan jenis-jenis sudut.",
      bersih(0),
      tambah(0, judul("Tujuan Pembelajaran")),
      tambah("Pertama,", baris(0, "1. Menemukan sudut siku-siku di lingkungan sekitar")),
      tambah("Kedua,", baris(1, "2. Memahami bagian-bagian sudut")),
      tambah("Ketiga,", baris(2, "3. Menyebutkan jenis-jenis sudut")),
    ),
    k(
      "Keempat, mengukur besar sudut dengan busur derajat. Kelima, membandingkan besar sudut. Keenam, menggambar sudut dengan ukuran tertentu.",
      tambah("Keempat,", baris(3, "4. Mengukur besar sudut dengan busur derajat")),
      tambah("Kelima,", baris(4, "5. Membandingkan besar sudut")),
      tambah("Keenam,", baris(5, "6. Menggambar sudut dengan ukuran tertentu")),
    ),
    k(
      "Kata kuncinya ada sebelas. Sudut, sudut siku-siku, kaki sudut, titik sudut, sudut lancip, sudut tumpul, sudut lurus, sudut nol, sudut refleks, busur, dan derajat.",
      bersih(0),
      tambah(0, judul("Kata Kunci")),
      ...KATA_KUNCI.map((_, i) => tambah([4, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23][i], chip(i))),
    ),
    k(
      "Beberapa kata sudah kalian kenal, beberapa lagi masih asing. Tenang saja, satu per satu akan kita pelajari, dimulai dari sudut siku-siku.",
      ubah("Tenang", ...KATA_KUNCI.flatMap((_, i) => (i === 1 ? [] : idChip(i).map((id) => ({ id, op: 0.3 }))))),
      sorotkan("dimulai", ...idChip(1)),
      tambah("dimulai", teks("mulai", 150, 186, "kita mulai dari sini", 9.4, W.merah)),
    ),
  ],
};

/* ------------------------------ 2. Peta konsep (hlm. 164) ------------------------------ */
const cabang = (id: string, x: number, y: number, w: number, h: number, warna: string, b: string[]): Obj[] => kartu(id, x, y, w, h, warna, b, 8.2);

export const ADEGAN_PETA: AdeganStory = {
  id: "peta-konsep",
  judul: "Peta konsep bab Sudut",
  sumber: "Buku Siswa hlm. 164",
  latar: "#F5F3FF",
  kutipan: ["Peta Konsep", "Melukis Sudut", "Sudut Siku-Siku", "Pengertian"],
  ketukan: [
    k(
      "Ini peta konsep bab enam. Di tengah ada kata sudut. Dari sana tumbuh empat cabang: sudut siku-siku, pengertian sudut, mengukur dan membandingkan sudut, dan melukis sudut.",
      tambah(0, judul("Peta Konsep")),
      tambah("tengah", ...kartu("pu", 110, 86, 80, 30, W.emas, ["Sudut"], 11)),
      tambah("siku-siku", garis("ga", 130, 86, -62, -26, W.biru, 1.6, { gambar: true }), ...cabang("ca", 10, 34, 112, 26, W.hijauMuda, ["Sudut Siku-Siku"])),
      tambah("pengertian", garis("gb", 170, 86, 62, -26, W.biru, 1.6, { gambar: true }), ...cabang("cb", 178, 34, 112, 26, W.langit, ["Pengertian Sudut"])),
      tambah("mengukur", garis("gc", 130, 116, -62, 34, W.biru, 1.6, { gambar: true }), ...cabang("cc", 10, 150, 112, 34, W.krem, ["Mengukur dan", "Membandingkan Sudut"])),
      tambah("melukis", garis("gd", 170, 116, 62, 34, W.biru, 1.6, { gambar: true }), ...cabang("cd", 178, 150, 112, 26, W.pink, ["Melukis Sudut"])),
    ),
    k(
      "Cabang pertama, sudut siku-siku, punya dua anak cabang. Yaitu menemukan sudut siku-siku di lingkungan sekitar, dan mengidentifikasi sudut siku-siku.",
      bersih(0),
      tambah(0, judul("Cabang pertama")),
      tambah("pertama,", ...cabang("ca", 80, 34, 140, 28, W.hijauMuda, ["Sudut Siku-Siku"])),
      tambah("menemukan", garis("g1", 120, 62, -50, 36, W.biru, 1.6, { gambar: true }), ...cabang("l1", 14, 98, 134, 44, W.krem, ["Menemukan Sudut Siku-", "Siku di Lingkungan Sekitar"])),
      tambah("mengidentifikasi", garis("g2", 180, 62, 50, 36, W.biru, 1.6, { gambar: true }), ...cabang("l2", 152, 98, 134, 44, W.langit, ["Mengidentifikasi", "Sudut Siku-Siku"])),
    ),
    k(
      "Tiga cabang yang lain menyusul di subbab berikutnya. Jadi, sekarang kita fokus ke cabang pertama saja.",
      bersih(0),
      tambah(0, judul("Satu cabang dulu")),
      ...[0, 1, 2, 3].map((i) => tambah(0, teks(`hr${i}`, 43 + i * 72, 78, "ABCD"[i], 12, i === 0 ? W.hijau : W.biru))),
      tambah(0, ...kartu("s0", 10, 86, 66, 50, W.hijauMuda, ["Sudut", "Siku-Siku"], 7.6)),
      tambah(0, ...kartu("s1", 82, 86, 66, 50, W.langit, ["Pengertian", "Sudut"], 7.6)),
      tambah(0, ...kartu("s2", 154, 86, 66, 50, W.krem, ["Mengukur dan", "Membandingkan", "Sudut"], 7.6)),
      tambah(0, ...kartu("s3", 226, 86, 66, 50, W.pink, ["Melukis", "Sudut"], 7.6)),
      ubah("menyusul", ...["s1", "s2", "s3"].flatMap((p) => [`${p}-k`, `${p}-t0`, `${p}-t1`, ...(p === "s2" ? [`${p}-t2`] : [])].map((id) => ({ id, op: 0.4 })))),
      sorotkan("fokus", "s0-k", "s0-t0", "s0-t1"),
    ),
    k(
      "Kata sudut di tengah peta konsep menyatukan semuanya. Mulai dari menemukan sudut siku-siku, sampai nanti kita belajar bagian, jenis, ukuran, dan cara melukisnya.",
      bersih(0),
      tambah(0, judul("Satu bab, satu alur")),
      tambah("tengah", ...kartu("pu", 100, 40, 100, 30, W.emas, ["Sudut"], 11)),
      tambah("menemukan", panah("a1", 150, 72, 0, 22, W.hijau, 2.4, { gambar: true }), ...kartu("al1", 70, 96, 160, 28, W.hijauMuda, ["menemukan siku-siku"], 9)),
      tambah("nanti", panah("a2", 150, 126, 0, 22, W.biru, 2.4, { gambar: true }), ...kartu("al2", 70, 150, 160, 28, W.langit, ["bagian, jenis, ukuran, melukis"], 8.6)),
    ),
  ],
};

/* ------------------------------ 3. Sudut di sekitar kita (hlm. 164 dan 165) ------------------------------ */
const sudutL = (id: string, x: number, y: number, dx: number, dy: number): Obj[] => [
  garis(`${id}-a`, x, y, dx, 0, W.merah, 3, { gambar: true }),
  garis(`${id}-b`, x, y, 0, dy, W.merah, 3, { gambar: true }),
];

export const ADEGAN_SEKITAR: AdeganStory = {
  id: "sekitar-kita",
  judul: "Sudut di sekitar kita",
  sumber: "Buku Siswa hlm. 164–165",
  latar: "#ECFEFF",
  kutipan: [
    "Sudut di Sekitar Kita",
    "Kalian mungkin sering mengatakan",
    "pojokan permukaan meja",
    "tersebut adalah contoh sudut dalam kehidupan sehari-hari",
    "Gambar 6.1 Contoh Sudut dalam Kehidupan Sehari-Hari",
    "pada benda di sekitar kalian?",
    "Ayo, coba temukan sebanyak mungkin.",
  ],
  ketukan: [
    k(
      "Sekarang bagian Sudut di Sekitar Kita. Kalian mungkin sering mengatakan pojokan permukaan meja atau pojokan buku.",
      tambah(0, judul("Sudut di Sekitar Kita")),
      tambah("pojokan", kotak("mj", 24, 56, 124, 76, W.kayu, W.coklat, { rx: 2, tebal: 2 }), teks("mjt", 86, 152, "permukaan meja", 9, W.coklat)),
      tambah("meja", bulat("mp", 24, 56, 5, W.merah, W.merah)),
      tambah("pojokan@2", kotak("bk", 188, 62, 84, 64, W.langit, W.biru, { rx: 2, tebal: 2 }), teks("bkt", 230, 152, "buku", 9, W.biru)),
      tambah("buku.", bulat("bp", 188, 62, 5, W.merah, W.merah)),
    ),
    k(
      "Gambar enam titik satu di buku memperlihatkan sebuah meja dan setumpuk buku. Pojokan keduanya adalah contoh sudut dalam kehidupan sehari-hari.",
      tambah(0, teks("gb", 150, 176, "Gambar 6.1", 8.4, W.ungu)),
      tambah("Pojokan", ...sudutL("m", 24, 56, 30, 24)),
      tambah("contoh", ...sudutL("n", 188, 62, 30, 24), teks("cs", 150, 194, "contoh sudut dalam kehidupan sehari-hari", 8.4, W.hijau)),
    ),
    k(
      "Dapatkah kalian menemukan sudut pada benda di sekitar kalian? Ayo, coba temukan sebanyak mungkin.",
      bersih(0),
      tambah(0, judul("Temukan sudut di sekitarmu")),
      tambah("benda", emo("e1", 50, 80, "🚪", 34), emo("e2", 120, 80, "📚", 34), emo("e3", 190, 80, "🖼", 34), emo("e4", 255, 80, "📱", 34)),
      tambah("sekitar", teks("q", 150, 130, "?", 40, W.merah)),
      tambah("temukan", ...kartu("tm", 50, 150, 200, 30, W.hijauMuda, ["temukan sebanyak mungkin"], 9.6)),
    ),
    k(
      "Sebelum mencari, ingat dulu bahwa pojokan adalah contoh sudut. Siapkan mata detektifmu, karena sebentar lagi kita berburu sudut siku-siku di sekitar kelas.",
      bersih(0),
      tambah(0, judul("Siap berburu sudut")),
      tambah("pojokan", emo("mt", 150, 96, "👀", 52)),
      tambah("detektifmu,", ...kartu("sb", 50, 124, 200, 30, W.krem, ["siap jadi detektif sudut"], 9.6)),
      tambah("kelas.", emo("kl", 150, 184, "🏫", 24)),
    ),
  ],
};

/* ------------------------------ 4. Ayo Mengingat Kembali dan gambaran bab (hlm. 165; Panduan Guru hlm. 249, 250, 252) ------------------------------ */
const segiLima = Array.from({ length: 5 }, (_, i): [number, number] => [15 * Math.sin((2 * Math.PI * i) / 5), -15 * Math.cos((2 * Math.PI * i) / 5)]);

export const ADEGAN_MENGINGAT: AdeganStory = {
  id: "mengingat-kembali",
  judul: "Ayo Mengingat Kembali dan gambaran bab",
  sumber: "Buku Siswa hlm. 165; Panduan Guru hlm. 249, 250, 252",
  latar: "#FFFBEB",
  kutipan: [
    "Ayo Mengingat Kembali",
    "Di kelas IV, kalian sudah pernah belajar tentang bangun datar,",
    "Tabel 6.1 Bangun Datar dan Banyaknya Sudut",
    "untuk menentukan banyaknya sudut yang dimiliki oleh bangun datar tertentu",
    "Mengapa harus dimulai dari sudut siku-siku?",
    "mudah mengenali sudut yang lebih kecil dan lebih besar dari sudut siku-siku",
    "Skema Pembelajaran",
    "Menemukan sudut siku-siku di lingkungan sekitar",
  ],
  ketukan: [
    k(
      "Sebelum mulai, ayo mengingat kembali. Di kelas empat kalian sudah belajar bangun datar. Salin tabel berikut di buku tugas, lalu lengkapi nama bangun datar dan banyaknya sudut.",
      tambah(0, judul("Tabel 6.1")),
      tambah(0, ...tabel("tb", 8, 34, [28, 86, 92, 78], [["No.", "Gambar", "Nama Bangun", "Banyak Sudut"], ["1", "", "…", "…"], ["2", "", "…", "…"], ["3", "", "…", "…"]], 36, 8.4)),
      tambah("kelas", poligon("b1", 79, 88, [[-28, -12], [28, -12], [28, 12], [-28, 12]], W.langit), poligon("b2", 79, 124, [[-20, -12], [32, -12], [20, 12], [-32, 12]], W.hijauMuda), poligon("b3", 79, 160, segiLima, W.krem)),
    ),
    k(
      "Gambar pertama adalah persegi panjang dan punya empat sudut. Gambar kedua jajar genjang, juga empat sudut. Gambar ketiga segi lima, dengan lima sudut.",
      ubah(3, { id: "tb-t12", isi: "Persegi Panjang" }),
      ubah(7, { id: "tb-t13", isi: "4" }),
      ubah(11, { id: "tb-t22", isi: "Jajar Genjang" }),
      ubah(14, { id: "tb-t23", isi: "4" }),
      ubah(18, { id: "tb-t32", isi: "Segi Lima" }),
      ubah(21, { id: "tb-t33", isi: "5" }),
    ),
    k(
      "Panduan guru menyarankan, saat memulai pelajaran sudut, guru meminta kalian menentukan banyaknya sudut pada bangun datar tertentu, seperti pada bagian ini.",
      bersih(0),
      tambah(0, judul("Apersepsi")),
      tambah("Panduan", emo("gr", 52, 96, "🧑", 40)),
      tambah("meminta", ...kartu("bb", 92, 54, 190, 50, W.krem, ["Tentukan banyaknya sudut", "pada bangun datar ini!"], 9)),
      tambah("bangun", poligon("c1", 120, 130, [[0, 0], [44, 0], [44, 28], [0, 28]], W.langit), poligon("c2", 190, 130, [[0, 0], [40, 0], [28, 28], [-12, 28]], W.hijauMuda)),
    ),
    k(
      "Mengapa belajar sudut dimulai dari sudut siku-siku? Menurut panduan guru, sudut siku-siku membantu kalian lebih mudah mengenali sudut yang lebih kecil dan lebih besar darinya.",
      bersih(0),
      tambah(0, judul("Mengapa dimulai dari siku-siku?")),
      tambah("siku-siku?", garis("pa", 110, 150, 90, 0, W.hijau, 4, { gambar: true }), garis("pb", 110, 150, 0, -80, W.hijau, 4, { gambar: true }), teks("pt", 160, 176, "patokan: sudut siku-siku", 9, W.hijau)),
      tambah("kecil", garis("ka", 110, 150, 51, -73, W.ungu, 3, { putus: true }), teks("kt", 186, 92, "lebih kecil", 9, W.ungu)),
      tambah("besar", garis("kb", 110, 150, -46, -66, W.merah, 3, { putus: true }), teks("bt", 52, 92, "lebih besar", 9, W.merah)),
    ),
    k(
      "Rencananya ada empat subbab, masing-masing empat jam pelajaran. Subbab A bertujuan menemukan sudut siku-siku di lingkungan sekitar.",
      bersih(0),
      tambah(0, judul("Skema Pembelajaran")),
      ...["A", "B", "C", "D"].map((h, i) => tambah(["Rencananya", "empat", "masing-masing", "pelajaran."][i], ...kartu(`sk${i}`, 12 + i * 72, 50, 66, 52, [W.hijauMuda, W.langit, W.krem, W.pink][i], [`Subbab ${h}`, "4 JP"], 8.6))),
      tambah("bertujuan", ...kartu("tj", 20, 124, 260, 40, W.hijauMuda, ["Subbab A: menemukan sudut", "siku-siku di lingkungan sekitar"], 9)),
      sorotkan("Subbab@2", "sk0-k"),
    ),
  ],
};
