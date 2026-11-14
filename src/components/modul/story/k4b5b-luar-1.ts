import type { AdeganStory, Obj } from "./logika-story";
import type { Titik } from "./k4b5b-data";
import { PAVING, RUMAH_URAI } from "./k4b5b-data";
import { RUMAH_ATAP, RUMAH_PERSEGI, W, emo, garis, judul, kartu, keping, poli, skala, tabel, tangram, teks } from "./k4b5b-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k4b5b-bantu";

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Empat metode dari luar untuk menyusun dan mengurai bangun datar",
  sumber: "Metode luar: pembuka; bangun dan angka Buku Siswa hlm. 166–173",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Bagaimana belajar menyusun dan mengurai bangun datar dengan benar? Guru di berbagai negara punya cara berbeda. Dalam video ini kita lihat empat metode dari luar, memakai bangun dan angka dari buku.",
      tambah(0, judul("Empat metode dari luar")),
      tambah("berbagai", emo("gl", 150, 100, "🌍", 56)),
      tambah("empat", ...kartu("pa", 30, 128, 240, 34, W.krem, ["menyusun dan mengurai bangun datar"], 9.2)),
    ),
    k(
      "Empat metode itu: Compose Shapes, Decompose Shapes, Tangram, dan Cut and Rearrange.",
      bersih(0),
      tambah(0, judul("Empat metode")),
      tambah("Compose", ...kartu("m1", 12, 34, 276, 30, W.hijauMuda, ["1. Compose Shapes"], 9.6)),
      tambah("Decompose", ...kartu("m2", 12, 72, 276, 30, W.langit, ["2. Decompose Shapes"], 9.6)),
      tambah("Tangram,", ...kartu("m3", 12, 110, 276, 30, W.krem, ["3. Tangram"], 9.6)),
      tambah("Cut", ...kartu("m4", 12, 148, 276, 30, W.pink, ["4. Cut and Rearrange"], 9.6)),
    ),
    k(
      "Masing-masing menjawab satu pertanyaan: bagaimana menggabungkan bangun, bagaimana mengurainya, bagaimana memakai tujuh keping tangram, dan bagaimana memotong lalu menyusun ulang?",
      bersih(0),
      tambah(0, judul("Empat pertanyaan")),
      tambah("menggabungkan", ...kartu("q1", 12, 34, 276, 30, W.hijauMuda, ["bagaimana menggabungkan bangun?"], 9)),
      tambah("mengurainya,", ...kartu("q2", 12, 72, 276, 30, W.langit, ["bagaimana mengurainya?"], 9)),
      tambah("tangram,", ...kartu("q3", 12, 110, 276, 30, W.krem, ["bagaimana memakai tujuh keping?"], 9)),
      tambah("memotong", ...kartu("q4", 12, 148, 276, 30, W.pink, ["bagaimana memotong lalu menyusun ulang?"], 8.4)),
    ),
  ],
};

/* Rumah kecil: persegi 4 x 4 dan segitiga beralas 4 (1 satuan = 12 piksel); gabungannya segilima. */
const RS = 12;
const RUMAH5: Titik[] = [[0, 4], [2, 2], [4, 4], [4, 8], [0, 8]];
const TRAP_KIRI: Titik[] = [[0, 4], [2, 2], [2, 8], [0, 8]];
const TRAP_KANAN: Titik[] = [[2, 2], [4, 4], [4, 8], [2, 8]];

/* ------------------------------ 2. Compose Shapes: konsep ------------------------------ */
export const ADEGAN_LUAR_CS: AdeganStory = {
  id: "luar-cs",
  judul: "Compose Shapes (Susun Bangun): gabungkan jadi satu",
  sumber: "Metode luar: Compose Shapes (Susun Bangun)",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Metode pertama, Compose Shapes atau Susun Bangun. Gabungkan dua bangun sederhana atau lebih menjadi satu bangun baru, tanpa celah dan tanpa tumpang tindih.",
      tambah(0, judul("Compose Shapes: Susun Bangun")),
      tambah("dua", poli("cs-b", 40, 44, skala(RUMAH_PERSEGI, RS), "#FFF200", W.coklat, { tebal: 1.2 }), poli("cs-a", 40, 14, skala(RUMAH_ATAP, RS), "#FAA61A", W.coklat, { tebal: 1.2 })),
      ubah("satu", { id: "cs-a", y: 44 }),
      tambah("dua", ...kartu("cs1", 130, 40, 156, 26, W.langit, ["dua bangun atau lebih"], 8.6)),
      tambah("baru,", ...kartu("cs2", 130, 76, 156, 26, W.hijauMuda, ["satu bangun baru"], 8.6)),
      tambah("tanpa", ...kartu("cs3", 130, 112, 156, 26, W.krem, ["tanpa celah, tanpa tumpuk"], 8.4)),
    ),
    k(
      "Hitung sisinya. Segitiga punya tiga sisi, persegi empat sisi. Saat digabung, satu sisi bersama hilang di kedua bangun, jadi tinggal lima sisi.",
      hapus(0, "cs1-k", "cs1-t0", "cs2-k", "cs2-t0", "cs3-k", "cs3-t0"),
      tambah("Segitiga", ...kartu("cs4", 130, 40, 156, 26, W.langit, ["segitiga: 3 sisi"], 8.8)),
      tambah("persegi", ...kartu("cs5", 130, 76, 156, 26, W.krem, ["persegi: 4 sisi"], 8.8)),
      tambah("digabung,", ...kartu("cs6", 130, 112, 156, 30, W.pink, ["3 + 4 − 2 = 5 sisi"], 9.6)),
      tambah("lima", teks("cs7", 150, 168, "segilima: bentuk rumah", 8.6, W.coklat)),
    ),
    k(
      "Mulai dari dua bangun, lalu tambah bangun ketiga dan seterusnya. Selalu periksa: tidak ada celah dan tidak ada yang bertumpuk.",
      hapus(0, "cs4-k", "cs4-t0", "cs5-k", "cs5-t0", "cs6-k", "cs6-t0", "cs7"),
      tambah("dua", ...kartu("cs8", 130, 40, 156, 26, W.langit, ["mulai dari 2 bangun"], 8.8)),
      tambah("ketiga", ...kartu("cs9", 130, 76, 156, 26, W.krem, ["lalu bangun ketiga, dst."], 8.8)),
      tambah("celah", ...kartu("cs10", 130, 112, 156, 26, W.hijauMuda, ["✔ tidak ada celah"], 8.8)),
      tambah("bertumpuk.", ...kartu("cs11", 130, 148, 156, 26, W.hijauMuda, ["✔ tidak ada yang bertumpuk"], 8.2)),
    ),
    k(
      "Cara ini cocok untuk membuat bentuk baru. Persegi dan segitiga menjadi rumah, dan bangun gabungannya punya nama sendiri, yaitu segilima.",
      hapus(0, "cs8-k", "cs8-t0", "cs9-k", "cs9-t0", "cs10-k", "cs10-t0", "cs11-k", "cs11-t0"),
      tambah("Persegi", ...kartu("cs12", 130, 40, 156, 26, W.krem, ["persegi + segitiga"], 8.8)),
      tambah("rumah,", ...kartu("cs13", 130, 76, 156, 26, W.hijauMuda, ["jadi bentuk rumah"], 8.8)),
      tambah("segilima.", ...kartu("cs14", 130, 112, 156, 26, W.pink, ["nama gabungannya: segilima"], 8.2)),
    ),
  ],
};

/* ------------------------------ 3. Compose Shapes: penerapan pada Aktivitas 6 ------------------------------ */
const TS = 9;
const TX = 196;
const TY = 52;
const LANGKAH: { no: string; keping: string; terpakai: string; pecahan: number[] }[] = [
  { no: "3", keping: "2", terpakai: "2", pecahan: [1, 2] },
  { no: "4", keping: "2", terpakai: "4", pecahan: [4, 5] },
  { no: "5", keping: "2", terpakai: "6", pecahan: [3, 6] },
  { no: "6", keping: "1", terpakai: "7", pecahan: [7] },
];
const CT = tabel("ct", 8, 40, [52, 44, 60], [["Langkah", "Keping", "Terpakai"], ...LANGKAH.map((l) => [l.no, l.keping, l.terpakai])], 20, 8);
const selTabel = (r: number, c: number): Obj[] => CT.filter((o) => o.id === `ct-s${r}${c}` || o.id === `ct-t${r}${c}`);
export const ADEGAN_LUAR_CS_TERAPAN: AdeganStory = {
  id: "luar-cs-terapan",
  judul: "Compose Shapes diterapkan pada Aktivitas 6",
  sumber: "Metode luar: Compose Shapes pada Aktivitas 6, Buku Siswa hlm. 167–168",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Terapkan pada Aktivitas enam. Tujuh keping tangram disusun bertahap: langkah tiga memakai dua keping, langkah empat dua keping, langkah lima dua keping, dan langkah enam satu keping.",
      tambah(0, judul("Menyusun bertahap")),
      tambah("Terapkan", ...selTabel(0, 0), ...selTabel(0, 1)),
      tambah("tiga", ...selTabel(1, 0), ...selTabel(1, 1), ...LANGKAH[0].pecahan.map((n) => tangram("ct-g", n, TX, TY, TS))),
      tambah("empat", ...selTabel(2, 0), ...selTabel(2, 1), ...LANGKAH[1].pecahan.map((n) => tangram("ct-g", n, TX, TY, TS))),
      tambah("lima", ...selTabel(3, 0), ...selTabel(3, 1), ...LANGKAH[2].pecahan.map((n) => tangram("ct-g", n, TX, TY, TS))),
      tambah("enam@2", ...selTabel(4, 0), ...selTabel(4, 1), ...LANGKAH[3].pecahan.map((n) => tangram("ct-g", n, TX, TY, TS))),
    ),
    k(
      "Jumlah keping yang sudah dipakai: dua, lalu empat, enam, dan akhirnya tujuh. Dua tambah dua tambah dua tambah satu sama dengan tujuh.",
      tambah("dua,", ...selTabel(0, 2), ...selTabel(1, 2)),
      tambah("empat,", ...selTabel(2, 2)),
      tambah("enam,", ...selTabel(3, 2)),
      tambah("tujuh.", ...selTabel(4, 2)),
      tambah("Dua", ...kartu("ct-e", 8, 150, 152, 28, W.krem, ["2 + 2 + 2 + 1 = 7"], 9.6)),
    ),
    k(
      "Hasil akhirnya persegi. Jumlah sisi ketujuh keping: tiga, tiga, empat, empat, tiga, tiga, tiga, jadi dua puluh tiga. Setelah disusun, tinggal empat sisi persegi.",
      hapus(0, ...CT.map((o) => o.id), "ct-e-k", "ct-e-t0"),
      tambah("persegi.", ...kartu("ct-f", 8, 40, 164, 28, W.hijauMuda, ["hasil: 1 persegi"], 9.2)),
      tambah("tiga,", ...kartu("ct-g1", 8, 78, 164, 30, W.krem, ["3 + 3 + 4 + 4 + 3 + 3 + 3 = 23 sisi"], 7.4)),
      tambah("disusun,", ...kartu("ct-g2", 8, 118, 164, 28, W.pink, ["setelah disusun: 4 sisi"], 9)),
    ),
    k(
      "Catatan: kata langkah pertama dan langkah ketiga di buku bergantian. Gunakan nomor keping, bukan nomor langkah, agar tidak keliru.",
      tambah("Catatan:", ...kartu("ct-n", 8, 154, 164, 26, W.merahMuda, ["pakai nomor keping, bukan langkah"], 7.6)),
    ),
  ],
};

/* ------------------------------ 4. Decompose Shapes: konsep ------------------------------ */
export const ADEGAN_LUAR_DS: AdeganStory = {
  id: "luar-ds",
  judul: "Decompose Shapes (Urai Bangun): pecah jadi bagian",
  sumber: "Metode luar: Decompose Shapes (Urai Bangun)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      "Metode kedua, Decompose Shapes atau Urai Bangun. Pecah satu bangun yang rumit menjadi beberapa bangun sederhana yang sudah dikenal, dengan garis bantu.",
      tambah(0, judul("Decompose Shapes: Urai Bangun")),
      tambah("satu", poli("ds-p", 40, 36, skala(RUMAH5, 14), "#E5E7EB", W.hitam, { tebal: 1.4 })),
      tambah("beberapa", garis("ds-g", 40, 92, 56, 0, W.merah, 2, { putus: true, z: 5 })),
      tambah("sederhana", poli("ds-a", 40, 36, skala(RUMAH_ATAP, 14), "#FAA61A", W.coklat, { tebal: 1.2 }), poli("ds-b", 40, 36, skala(RUMAH_PERSEGI, 14), "#FFF200", W.coklat, { tebal: 1.2 })),
      hapus("sederhana", "ds-p"),
      tambah("rumit", ...kartu("ds1", 130, 40, 156, 26, W.langit, ["1 bangun yang rumit"], 8.6)),
      tambah("garis", ...kartu("ds2", 130, 76, 156, 26, W.pink, ["garis bantu"], 8.6)),
      tambah("sederhana", ...kartu("ds3", 130, 112, 156, 26, W.hijauMuda, ["beberapa bangun sederhana"], 8.6)),
    ),
    k(
      "Langkahnya: gambar garis bantu, namai tiap bagian, lalu hitung banyaknya tiap jenis. Jumlah semua jenis harus sama dengan banyak keping.",
      hapus(0, "ds1-k", "ds1-t0", "ds2-k", "ds2-t0", "ds3-k", "ds3-t0"),
      tambah("gambar", ...kartu("ds4", 130, 40, 156, 26, W.krem, ["1. gambar garis bantu"], 8.6)),
      tambah("namai", ...kartu("ds5", 130, 76, 156, 26, W.langit, ["2. namai tiap bagian"], 8.6)),
      tambah("hitung", ...kartu("ds6", 130, 112, 156, 26, W.hijauMuda, ["3. hitung tiap jenis"], 8.6)),
      tambah("Jumlah", ...kartu("ds7", 130, 148, 156, 30, W.pink, ["jumlah jenis", "sama dengan keping"], 8)),
    ),
    k(
      "Satu bangun dapat diurai dengan lebih dari satu cara. Cara pertama: segitiga dan persegi. Cara kedua: dua trapesium. Dua cara, tetapi sama-sama dua bagian.",
      bersih(0),
      tambah(0, judul("Urai dengan lebih dari satu cara")),
      tambah("pertama:", poli("dc1a", 36, 44, skala(RUMAH_ATAP, 14), "#FAA61A", W.coklat, { tebal: 1.2 }), poli("dc1b", 36, 44, skala(RUMAH_PERSEGI, 14), "#FFF200", W.coklat, { tebal: 1.2 }), teks("dc1t", 64, 170, "segitiga + persegi", 8, W.biru)),
      tambah("trapesium.", poli("dc2a", 176, 44, skala(TRAP_KIRI, 14), "#93C5FD", W.biru, { tebal: 1.2 }), poli("dc2b", 176, 44, skala(TRAP_KANAN, 14), "#86EFAC", W.hijau, { tebal: 1.2 }), teks("dc2t", 204, 170, "2 trapesium", 8, W.biru)),
      tambah("sama-sama", teks("dc3", 150, 192, "sama-sama 2 bagian", 8.4, W.coklat)),
    ),
    k(
      "Cara ini cocok saat bangunnya rumit, seperti rumah bercerobong pada soal pengayaan. Garis bantu membuatnya mudah dihitung bagian demi bagian.",
      bersih(0),
      tambah(0, judul("Urai bangun yang rumit")),
      tambah("rumit,", poli("du-r", 16, 36, skala(RUMAH_URAI, 0.62), "#E5E7EB", W.hitam, { tebal: 1.4 })),
      tambah("Garis", garis("du-g", 48, 101, 95, 0, W.merah, 2, { putus: true })),
      tambah("bercerobong", ...kartu("du1", 170, 44, 118, 30, W.langit, ["rumah bercerobong", "(pengayaan 5)"], 7.6)),
      tambah("mudah", ...kartu("du2", 170, 90, 118, 30, W.hijauMuda, ["bagian demi bagian"], 8)),
    ),
  ],
};

/* ------------------------------ 5. Decompose Shapes: penerapan pada motif paving ------------------------------ */
const JENIS_PV = ["segitiga", "trapesium", "jajargenjang", "trapesium", "persegi panjang", "segitiga", "persegi", "segitiga", "trapesium", "segitiga"];
const WARNA_PV: Record<string, string> = { segitiga: "#0066B3", trapesium: "#FAA61A", jajargenjang: "#ED008C", persegi: "#FFF200", "persegi panjang": "#8B5CF6" };
const TURUS = [
  ["segitiga", "||||", "4"],
  ["trapesium", "|||", "3"],
  ["jajargenjang", "|", "1"],
  ["persegi", "|", "1"],
  ["persegi panjang", "|", "1"],
];
const TT = tabel("tu", 150, 36, [62, 40, 26], [["Jenis", "Turus", "Jml"], ...TURUS], 18, 6.2);
const selTu = (r: number): Obj[] => TT.filter((o) => new RegExp(`^tu-[st]${r}\\d$`).test(o.id));
export const ADEGAN_LUAR_DS_TERAPAN: AdeganStory = {
  id: "luar-ds-terapan",
  judul: "Decompose Shapes diterapkan pada motif paving",
  sumber: "Metode luar: Decompose Shapes pada motif paving, Buku Siswa hlm. 173",
  latar: "#F0F9FF",
  ketukan: [
    k(
      "Terapkan pada motif paving di Ayo Berlatih dua. Motif ini sudah diurai oleh garis putih menjadi sepuluh keping.",
      tambah(0, judul("Urai motif paving")),
      tambah("paving", ...PAVING.map((p, i) => keping(`dp-p${i}`, 8, 40, p, 0.95))),
      tambah("sepuluh", ...kartu("dp1", 152, 60, 136, 40, W.hijauMuda, ["10 keping", "dari garis putih"], 8.8)),
    ),
    k(
      "Catat tiap jenis dengan turus: segitiga siku-siku empat, trapesium tiga, jajargenjang satu, persegi satu, dan persegi panjang satu.",
      hapus(0, "dp1-k", "dp1-t0", "dp1-t1"),
      ...PAVING.map((_, i) => ubah("turus:", { id: `dp-p${i}`, warna: WARNA_PV[JENIS_PV[i]] })),
      tambah("Catat", ...selTu(0)),
      tambah("segitiga", ...selTu(1)),
      tambah("trapesium", ...selTu(2)),
      tambah("jajargenjang", ...selTu(3)),
      tambah("persegi", ...selTu(4)),
      tambah("panjang", ...selTu(5)),
    ),
    k(
      "Periksa: empat tambah tiga tambah satu tambah satu tambah satu sama dengan sepuluh, tepat sama dengan banyak keping pada gambar.",
      tambah("Periksa:", ...kartu("dp2", 152, 150, 136, 28, W.krem, ["4 + 3 + 1 + 1 + 1 = 10"], 8.6)),
      sorotkan("sepuluh,", ...PAVING.map((_, i) => `dp-p${i}`)),
      tambah("gambar.", teks("dp3", 80, 176, "10 keping terhitung semua", 8.4, W.coklat)),
    ),
    k(
      "Catatan: Panduan Guru tidak memberi kunci soal paving. Cocokkan hitunganmu dengan teman, lalu lingkari bangun yang menyusun motif.",
      hapus(0, ...TT.map((o) => o.id), "dp2-k", "dp2-t0", "dp3"),
      tambah("Catatan:", ...kartu("dp4", 152, 44, 136, 34, W.merahMuda, ["tanpa kunci", "di Panduan Guru"], 8)),
      tambah("Cocokkan", ...kartu("dp5", 152, 90, 136, 34, W.krem, ["cocokkan hitungan", "dengan teman"], 8)),
      tambah("lingkari", ...kartu("dp6", 152, 136, 136, 34, W.hijauMuda, ["lalu lingkari bangun", "penyusun motif"], 8)),
    ),
  ],
};
