import type { AdeganStory } from "./logika-story";
import { W, bingkai, emo, garis, judul, kartu, kotak, panah, penandaSiku, poligon, tabel, teks, titikPenggaris, type Titik } from "./k5b6a-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k5b6a-bantu";

/* ------------------------------ 1. Bingkai foto dan penggaris siku-siku (hlm. 166; Panduan Guru hlm. 252 sampai 253) ------------------------------ */
/** Empat pojok bingkai luar (titik mutlak, searah jarum jam dari kiri-atas). */
export const POJOK_BINGKAI: Titik[] = [[80, 50], [220, 50], [220, 150], [80, 150]];
const tandaBingkai = (i: number) => penandaSiku(`bs${i}`, POJOK_BINGKAI, i, 10);

export const ADEGAN_BINGKAI: AdeganStory = {
  id: "bingkai-siku",
  judul: "Subbab A: bingkai foto dan penggaris siku-siku",
  sumber: "Buku Siswa hlm. 166; Panduan Guru hlm. 252–253",
  latar: "#FFF1F2",
  kutipan: [
    "A. Sudut Siku-Siku",
    "Pernahkah kalian memperhatikan bingkai foto yang kalian temui di",
    "Pojok bingkai pada Gambar 6.2 membentuk sudut siku-siku.",
    "Bagaimana cara tukang",
    "menggunakan penggaris siku-siku untuk memastikan bahwa pojok",
    "Gambar 6.3 Penggaris Siku-Siku",
    "busur belum dikenalkan di awal bab",
    "Jika sesi tanya jawab dirasa cukup, kenalkan peserta didik",
    "Alat tersebut berupa lipatan kertas yang cara membuatnya ada pada Eksplorasi 6.1.",
  ],
  ketukan: [
    k(
      "Subbab A, Sudut Siku-Siku. Pernahkah kalian memperhatikan bingkai foto yang kalian temui di rumah atau di sekolah?",
      tambah(0, judul("A. Sudut Siku-Siku")),
      tambah("bingkai", ...bingkai("bf", 80, 50, 140, 100)),
      tambah("foto", emo("ft", 150, 112, "🌄", 44)),
      tambah("rumah", teks("rm", 95, 176, "di rumah", 9.4, W.coklat)),
      tambah("sekolah?", teks("sk", 205, 176, "di sekolah", 9.4, W.coklat)),
    ),
    k(
      "Pojok bingkai pada Gambar enam titik dua membentuk sudut siku-siku. Lihat tanda merah di keempat pojoknya.",
      tambah(0, teks("gm", 150, 196, "Gambar 6.2", 8.4, W.ungu)),
      tambah("sudut", tandaBingkai(0), tandaBingkai(1)),
      tambah("merah", tandaBingkai(2), tandaBingkai(3)),
    ),
    k(
      "Pertanyaannya, bagaimana cara tukang kayu memastikan pojok bingkai yang mereka buat sudah membentuk sudut siku-siku?",
      bersih(0),
      tambah(0, judul("Bagaimana caranya?")),
      tambah("tukang", emo("tk", 70, 110, "🧑", 48), emo("pk", 110, 124, "🔨", 26)),
      tambah("memastikan", ...kartu("bt", 150, 56, 138, 50, W.krem, ["Sudah siku-siku", "belum, ya?"], 9.6)),
      tambah("pojok", ...bingkai("bf", 168, 120, 90, 64)),
    ),
    k(
      "Para pembuat bingkai foto menggunakan penggaris siku-siku untuk memastikan bahwa pojok bingkai yang dibuat sudah membentuk sudut siku-siku.",
      bersih(0),
      tambah(0, judul("Penggaris siku-siku")),
      tambah(0, ...bingkai("bf", 80, 50, 140, 100)),
      tambah("penggaris", poligon("pg", 200, 190, titikPenggaris(50, 40), W.jingga, W.coklat), teks("pgt", 235, 196, "penggaris siku-siku", 8.4, W.coklat)),
      ubah("pojok", { id: "pg", x: 80, y: 150 }),
      tambah("sudah", tandaBingkai(3)),
      tambah("membentuk", teks("ok", 150, 38, "pas di pojok: siku-siku", 9.6, W.hijau)),
    ),
    k(
      "Panduan guru menyarankan, sebelum membahas penggaris siku-siku, beri kesempatan kalian menjawab dulu. Mungkin ada yang menjawab memakai busur, padahal busur belum dikenalkan di awal bab.",
      bersih(0),
      tambah(0, judul("Tanya jawab dulu")),
      tambah("kesempatan", ...kartu("jw", 20, 44, 120, 40, W.krem, ["Jawaban kalian?"], 9.6)),
      tambah("memakai", emo("bs", 200, 80, "📏", 40), teks("bsx", 200, 118, "pakai busur?", 9.4, W.merah)),
      tambah("padahal", teks("sx", 250, 76, "✗", 28, W.merah), ...kartu("bl", 40, 140, 220, 34, W.merahMuda, ["busur belum dikenalkan di awal bab"], 8.8)),
    ),
    k(
      "Jika tanya jawab sudah cukup, kenalkan penggaris siku-siku. Lalu tekankan bahwa kita bisa membuat alat sederhana yang fungsinya sama, yaitu lipatan kertas.",
      bersih(0),
      tambah(0, judul("Alat sederhana")),
      tambah("penggaris", emo("pk", 70, 100, "📐", 54), teks("pkt", 70, 140, "penggaris siku-siku", 8.8, W.coklat)),
      tambah("sama,", panah("pn", 112, 96, 66, 0, W.hijau, 3, { gambar: true }), teks("sm", 145, 84, "fungsi sama", 9, W.hijau)),
      tambah("lipatan", emo("kr", 240, 100, "📄", 54), teks("krt", 240, 140, "lipatan kertas", 8.8, W.biru)),
      sorotkan("kertas.", "kr"),
    ),
  ],
};

/* ------------------------------ 2. Eksplorasi 6.1, membuat alat (hlm. 167 sampai 168; Panduan Guru hlm. 253 sampai 254) ------------------------------ */
/** Kertas yang sudah dilipat dua kali: titik sudut kiri-bawah (0, 0) bersiku-siku, dua tepi lain dari lipatan. */
export const KERTAS_LIPAT: Titik[] = [[0, 0], [66, 0], [70, -26], [58, -50], [0, -56]];
const PENANDA_KERTAS = (id: string, x: number, y: number, dx = 0) => penandaSiku(id, KERTAS_LIPAT.map(([a, b]): Titik => [a + x + dx, b + y]), 0, 11);

export const ADEGAN_EKSPLORASI_ALAT: AdeganStory = {
  id: "eksplorasi-alat",
  judul: "Eksplorasi 6.1: membuat alat dari kertas lipat",
  sumber: "Buku Siswa hlm. 167–168; Panduan Guru hlm. 253–254",
  latar: "#F0F9FF",
  kutipan: [
    "Eksplorasi 6.1",
    "Menjadi Detektif Sudut",
    "menemukan sebanyak mungkin",
    "Setiap kelompok",
    "beranggotakan 3 orang.",
    "Ambil sehelai kertas, lalu lipatlah seperti pada gambar berikut.",
    "kemudian lipat mendatar.",
    "Lipat secara",
    "Sudut yang terbentuk",
    "Gambar 6.4 Cara Membuat Sudut Siku-Siku dari Selembar Kertas",
    "Guru membentuk kelompok terlebih dahulu sebelum",
    "Berikan penguatan kembali bahwa fungsi alat ini mirip dengan penggaris",
    "Pastikan setiap kelompok sudah membuat alat dengan benar.",
    "Tujuan eksplorasi ini adalah untuk menemukan sudut siku-siku",
  ],
  ketukan: [
    k(
      "Eksplorasi enam titik satu, Menjadi Detektif Sudut. Kita bermain peran menjadi detektif, dengan tugas menemukan sebanyak mungkin sudut di sekitar kita.",
      tambah(0, judul("Eksplorasi 6.1")),
      tambah("Menjadi", emo("dt", 150, 100, "🕵", 60)),
      tambah("detektif,", ...kartu("dj", 50, 130, 200, 30, W.krem, ["Menjadi Detektif Sudut"], 10)),
      tambah("menemukan", teks("sb", 150, 182, "temukan sebanyak mungkin sudut", 8.8, W.hijau)),
    ),
    k(
      "Setelah itu, tentukan apakah sudut yang kita temukan siku-siku atau bukan. Permainan dilakukan berkelompok, dan setiap kelompok beranggotakan tiga orang.",
      bersih(0),
      tambah(0, judul("Satu kelompok tiga orang")),
      tambah("tentukan", ...kartu("pr", 40, 34, 220, 30, W.hijauMuda, ["siku-siku atau bukan?"], 10)),
      tambah("kelompok", emo("o1", 80, 120, "🧒", 40), emo("o2", 150, 120, "👧", 40), emo("o3", 220, 120, "👦", 40)),
      tambah("tiga", teks("n3", 150, 172, "3 orang", 11, W.merah)),
    ),
    k(
      "Guru membentuk kelompok terlebih dahulu. Setelah itu, setiap kelompok membuat alat sederhana untuk menentukan suatu sudut siku-siku atau bukan.",
      bersih(0),
      tambah(0, judul("Persiapan guru")),
      tambah("Guru", emo("gu", 50, 90, "🧑", 44)),
      tambah("kelompok", ...kartu("k1", 100, 50, 80, 30, W.krem, ["Kelompok 1"], 9), ...kartu("k2", 190, 50, 80, 30, W.langit, ["Kelompok 2"], 9), ...kartu("k3", 100, 92, 80, 30, W.pink, ["Kelompok 3"], 9), ...kartu("k4", 190, 92, 80, 30, W.jingga, ["Kelompok 4"], 9)),
      tambah("alat", ...kartu("al", 70, 142, 160, 34, W.hijauMuda, ["membuat alat sederhana"], 9.6)),
    ),
    k(
      "Langkah pertama, ambil sehelai kertas yang bentuknya bebas. Lalu lipat kertas itu mendatar.",
      bersih(0),
      tambah(0, judul("Lipat kertas: langkah 1")),
      tambah("kertas", poligon("sh", 85, 52, [[0, 0], [130, 6], [124, 96], [4, 90]], W.putih, W.biru)),
      tambah("mendatar.", garis("fl", 75, 98, 150, 0, W.merah, 2.4, { putus: true, gambar: true }), panah("fa", 150, 66, 0, 26, W.merah, 2.6, { gambar: true }), teks("ft", 150, 188, "lipat mendatar", 9.4, W.merah)),
    ),
    k(
      "Langkah kedua, lipat lagi secara vertikal. Sudut yang terbentuk dari kegiatan melipat kertas, yang berwarna merah, adalah sudut siku-siku.",
      bersih(0),
      tambah(0, judul("Lipat kertas: langkah 2")),
      tambah(0, poligon("lp", 60, 120, [[0, 0], [132, 0], [136, -26], [124, -50], [0, -56]], W.putih)),
      tambah("vertikal.", garis("fv", 66, 58, 0, 70, W.merah, 2.4, { putus: true, gambar: true }), panah("fb", 20, 90, 40, 0, W.merah, 2.6, { gambar: true })),
      tambah("terbentuk", poligon("lt", 160, 150, KERTAS_LIPAT, W.putih), teks("lh", 190, 172, "hasil lipatan", 8.8, W.biru)),
      tambah("merah,", PENANDA_KERTAS("pm", 160, 150)),
      tambah("siku-siku.", teks("ss", 238, 130, "sudut siku-siku", 9.4, W.merah)),
    ),
    k(
      "Alat ini fungsinya mirip dengan penggaris siku-siku. Panduan guru menekankan, pastikan setiap kelompok sudah membuat alat dengan benar.",
      bersih(0),
      tambah(0, judul("Mirip penggaris siku-siku")),
      tambah("penggaris", poligon("pg", 36, 130, titikPenggaris(60, 52), W.jingga, W.coklat), teks("pgt", 70, 150, "penggaris siku-siku", 8.4, W.coklat)),
      tambah("mirip", teks("sm", 150, 100, "mirip", 10, W.hijau)),
      tambah("alat", poligon("lt", 190, 130, KERTAS_LIPAT, W.putih), PENANDA_KERTAS("pm", 190, 130), teks("lt2", 224, 150, "lipatan kertas", 8.4, W.biru)),
      tambah("benar.", teks("bn", 150, 186, "periksa tiap kelompok: alat sudah benar?", 8.6, W.merah)),
    ),
    k(
      "Kertasnya boleh berbentuk bebas. Setelah alat jadi, ajak kelompok bereksplorasi di sekitar kelas atau di luar kelas, dengan tetap menjaga ketertiban agar tidak mengganggu kelas lain.",
      bersih(0),
      tambah(0, judul("Saatnya bereksplorasi")),
      tambah("bebas.", poligon("sh", 20, 100, [[0, 0], [60, 4], [56, 44], [2, 40]], W.putih)),
      tambah("kelompok", panah("pn", 90, 80, 40, 0, W.hijau, 3, { gambar: true })),
      tambah("sekitar", emo("sc", 170, 70, "🏫", 40), teks("sct", 170, 108, "dalam kelas", 8.8, W.biru)),
      tambah("luar", emo("lk", 250, 70, "🌳", 40), teks("lkt", 250, 108, "luar kelas", 8.8, W.hijau)),
      tambah("ketertiban", ...kartu("kt", 40, 140, 220, 34, W.krem, ["jaga ketertiban, jangan", "mengganggu kelas lain"], 8.8)),
    ),
  ],
};

/* ------------------------------ 3. Memeriksa sudut dan mencatat hasil (hlm. 168 sampai 169; Panduan Guru hlm. 254 sampai 255) ------------------------------ */
const BUKU = { x: 150, y: 60, w: 100, h: 70 };

export const ADEGAN_EKSPLORASI_PERIKSA: AdeganStory = {
  id: "eksplorasi-periksa",
  judul: "Eksplorasi 6.1: memeriksa sudut dan mencatat temuan",
  sumber: "Buku Siswa hlm. 168–169; Panduan Guru hlm. 254–255",
  latar: "#FEFCE8",
  kutipan: [
    "Temukan sudut-sudut yang ada di sekitar kalian.",
    "Periksa sudut",
    "tersebut menggunakan lipatan kertas yang sudah kalian buat.",
    "Apakah sudut yang kalian temukan termasuk sudut",
    "Gambar 6.5 Memeriksa Sudut yang Ditemukan, Termasuk Sudut Siku-Siku atau Bukan",
    "Setelah itu, catat hasil temuan kalian pada tabel.",
    "Tabel 6.2 Hasil Temuan Detektif Sudut",
    "Apakah Termasuk Sudut Siku-Siku?",
    "Catatan : kalian dapat menambah baris pada tabel sesuai kebutuhan.",
    "harus berimpit dengan kaki",
    "sebagai fasilitator",
    "memeriksa hasil dan perkembangan kerja",
  ],
  ketukan: [
    k(
      "Sekarang temukan sudut-sudut di sekitar kalian, lalu periksa dengan lipatan kertas tadi. Apakah sudut yang kalian temukan termasuk sudut siku-siku?",
      tambah(0, judul("Periksa dengan lipatan kertas")),
      tambah("sudut-sudut", kotak("bk", BUKU.x, BUKU.y, BUKU.w, BUKU.h, W.langit, W.biru, { rx: 0, tebal: 2 }), teks("bkt", 200, 104, "buku", 10, W.biru)),
      tambah("lipatan", poligon("kp", 30, 190, KERTAS_LIPAT, W.putih), PENANDA_KERTAS("pm", 30, 190)),
      ubah("Apakah", { id: "kp", x: 150, y: 130 }, { id: "pm", x: 150, y: 130 }),
    ),
    k(
      "Perhatikan caranya. Salah satu sisi pojok kertas harus berimpit dengan sisi pojok benda yang diperiksa. Kalau kedua sisi pas, itu sudut siku-siku.",
      tambah("sisi", garis("e1", 150, 130, 100, 0, W.hijau, 3.4, { gambar: true })),
      tambah("kedua", garis("e2", 150, 130, 0, -70, W.hijau, 3.4, { gambar: true })),
      tambah("pas,", teks("ya", 100, 156, "pas: siku-siku", 9.8, W.hijau)),
    ),
    k(
      "Selama kegiatan, guru berkeliling sebagai fasilitator. Guru memeriksa hasil dan perkembangan kerja tiap kelompok, dan membimbing kelompok yang belum tepat memakai alatnya.",
      bersih(0),
      tambah(0, judul("Peran guru: fasilitator")),
      tambah("guru", emo("gu", 50, 90, "🧑", 44), emo("lp", 92, 80, "🔍", 26)),
      tambah("kelompok", emo("o1", 170, 90, "🧒", 34), emo("o2", 215, 90, "👧", 34), emo("o3", 260, 90, "👦", 34)),
      tambah("membimbing", panah("pn", 100, 130, 70, 0, W.hijau, 3, { gambar: true }), ...kartu("bm", 60, 150, 180, 30, W.hijauMuda, ["bimbing yang belum tepat"], 9.2)),
    ),
    k(
      "Lalu catat hasil temuan kalian pada tabel enam titik dua, Hasil Temuan Detektif Sudut. Ada kolom nomor, nama benda, dan apakah termasuk sudut siku-siku, ya atau tidak.",
      bersih(0),
      tambah(0, judul("Tabel 6.2 Hasil Temuan Detektif Sudut")),
      tambah("tabel", ...tabel("tt", 20, 44, [34, 130, 58, 58], [["No.", "Nama Benda", "Ya", "Tidak"], ["1", "", "", ""], ["2", "", "", ""], ["…", "", "", ""]], 24, 9)),
      tambah("apakah", teks("ap", 240, 41, "Termasuk Sudut Siku-Siku?", 6.4, W.ungu)),
    ),
    k(
      "Isi tabel ini bebas sesuai temuan kalian. Sebagai contoh buatan kita sendiri, pojok buku dan pojok bingkai termasuk sudut siku-siku, sedangkan puncak atap segitiga bukan.",
      tambah("buku", teks("n1", 119, 83, "pojok buku", 8.6), teks("c1", 213, 87, "✓", 11, W.hijau)),
      tambah("bingkai", teks("n2", 119, 107, "pojok bingkai", 8.6), teks("c2", 213, 111, "✓", 11, W.hijau)),
      tambah("puncak", teks("n3", 119, 131, "puncak atap segitiga", 8.6), teks("c3", 271, 135, "✓", 11, W.hijau)),
      tambah("sendiri,", teks("nt", 150, 174, "contoh isian buatan sendiri, bukan dari buku", 8.6, W.hijau)),
    ),
    k(
      "Catatan di buku, tabel boleh ditambah barisnya sesuai kebutuhan. Setelah itu, kelompok menyampaikan hasil diskusi dan menanggapi. Tidak semua kelompok harus menjadi presenter.",
      bersih(0),
      tambah(0, judul("Setelah mencatat")),
      tambah("tabel", ...kartu("tb", 30, 40, 240, 34, W.krem, ["tabel boleh ditambah barisnya"], 9.4)),
      tambah("kelompok", emo("pr", 80, 120, "🗣", 34), ...kartu("hs", 110, 100, 160, 36, W.langit, ["sampaikan hasil diskusi"], 9.2)),
      tambah("presenter.", ...kartu("tn", 40, 150, 220, 34, W.hijauMuda, ["sebagian kelompok boleh menanggapi saja"], 8.8)),
    ),
  ],
};
