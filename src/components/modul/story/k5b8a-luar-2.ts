import type { AdeganStory, Aksi } from "./logika-story";
import { KOL_FREK, W, barisFrek, emo, idBarisFrek, judul, kartu, kepalaFrek, teks } from "./k5b8a-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k5b8a-bantu";

/* ------------------------------ LB1. Frequency Table Construction: konsep ------------------------------ */
const TB = { x: 40, y: 34, h: 18, u: 8.4 };
const barisTb = (r: number, nama: string, n: number | null) => barisFrek("fc", TB.x, TB.y, r, nama, n, KOL_FREK, TB.h, TB.u);

export const ADEGAN_LUAR_TABEL: AdeganStory = {
  id: "luar-tabel",
  judul: "Frequency Table Construction: konsep",
  sumber: "Metode luar 3: menyusun tabel frekuensi",
  latar: "#ECFDF5",
  ketukan: [
    k(
      "Metode ketiga, Frequency Table Construction, cara menyusun tabel frekuensi. Langkah pertama, tulis semua kategori sekali saja di kolom pertama.",
      tambah(0, judul("Frequency Table Construction")),
      tambah("tabel", ...kepalaFrek("fc", TB.x, TB.y, ["Kategori", "Turus", "Frekuensi"], KOL_FREK, TB.h, TB.u)),
      tambah("kategori", ...barisTb(1, "kategori A", null), ...barisTb(2, "kategori B", null), ...barisTb(3, "kategori C", null)),
      tambah("sekali", teks("s1", 150, 124, "tiap kategori ditulis sekali saja", 10, W.hijau)),
    ),
    k(
      "Langkah kedua, isi kolom turus dengan goresan untuk setiap data. Langkah ketiga, tulis frekuensi, yaitu banyaknya goresan, di kolom ketiga.",
      hapus(0, ...idBarisFrek("fc", 1, null), ...idBarisFrek("fc", 2, null), ...idBarisFrek("fc", 3, null)),
      tambah("turus", ...barisTb(1, "kategori A", 5), ...barisTb(2, "kategori B", 3), ...barisTb(3, "kategori C", 2)),
      tambah("frekuensi,", teks("s2", 150, 146, "frekuensi: banyaknya goresan", 10, W.merah)),
    ),
    k(
      "Langkah keempat, jumlahkan semua frekuensi dan cocokkan dengan banyaknya data. Jumlah yang sama berarti tidak ada data yang terlewat atau terhitung dua kali.",
      tambah("jumlahkan", teks("s3", 150, 168, "5 + 3 + 2 = 10", 10.4, W.ungu)),
      tambah("cocokkan", teks("s4", 150, 186, "banyaknya data juga 10", 9.4, W.hijau)),
    ),
    k(
      "Ingat, bila setiap responden boleh memilih lebih dari satu, jumlah frekuensi boleh lebih besar dari jumlah responden, seperti pada data sayuran.",
      bersih(0),
      tambah(0, judul("satu pilihan atau lebih?")),
      tambah("satu,", ...kartu("i1", 14, 44, 124, 50, W.langit, ["satu pilihan", "jumlah sama"], 9.4)),
      tambah("lebih", ...kartu("i2", 162, 44, 124, 50, W.krem, ["banyak pilihan", "jumlah boleh lebih"], 9.4)),
      tambah("sayuran.", teks("i3", 150, 130, "contoh: data sayuran favorit", 10, W.ungu)),
    ),
  ],
};

/* ------------------------------ LB2. Frequency Table Construction: penerapan pada Tabel 8.5 ------------------------------ */
const NILAI: [string, number][] = [["40", 2], ["50", 1], ["60", 5], ["70", 6], ["80", 7], ["90", 3], ["100", 1]];
const KOL_N = [60, 100, 60];
const barisN = (r: number, n: number | null) => barisFrek("tn", 40, 34, r, NILAI[r - 1][0], n, KOL_N, 15, 7.8);
const isiN = (at: string | number, r: number): Aksi[] => [hapus(at, ...idBarisFrek("tn", r, null)), tambah(at, ...barisN(r, NILAI[r - 1][1]))];

export const ADEGAN_LUAR_TABEL_TERAPAN: AdeganStory = {
  id: "luar-tabel-terapan",
  judul: "Frequency Table Construction: penerapan pada Tabel 8.5",
  sumber: "Metode luar 3: penerapan pada Ayo Berlatih hlm. 247",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Terapkan pada Tabel 8.5. Langkah satu: tulis nilai yang muncul sekali saja, yaitu 40, 50, 60, 70, 80, 90, dan 100. Itu tujuh kategori.",
      tambah(0, judul("Tabel 8.5 nilai ulangan")),
      tambah("Langkah", ...kepalaFrek("tn", 40, 34, ["Nilai", "Turus", "Frekuensi"], KOL_N, 15, 7.8)),
      ...NILAI.map(([nama], i): Aksi => tambah(i === 6 ? "100." : `${nama},`, ...barisN(i + 1, null))),
    ),
    k(
      "Langkah dua dan tiga: beri goresan untuk tiap nilai, lalu tulis frekuensinya: 2, 1, 5, 6, 7, 3, dan 1.",
      ...NILAI.flatMap(([, n], i): Aksi[] => isiN(i === 6 ? "1@2" : `${n},`, i + 1)),
    ),
    k(
      "Langkah empat: jumlah frekuensi 25 sama dengan banyaknya data, jadi tidak ada nilai yang terlewat atau terhitung dua kali.",
      tambah("jumlah", teks("tj", 150, 166, "2 + 1 + 5 + 6 + 7 + 3 + 1 = 25", 10, W.ungu)),
      tambah("banyaknya", teks("tj2", 150, 184, "banyaknya data: 25 nilai", 9.4, W.hijau)),
    ),
    k(
      "Bandingkan dengan Tabel 8.4 sayuran: jumlah frekuensinya 39, bukan 16, karena satu siswa boleh memilih sampai tiga sayuran. Jadi periksa dulu aturan pengisiannya.",
      bersih(0),
      tambah(0, judul("periksa aturan pengisian")),
      tambah("Tabel", ...kartu("pa", 14, 44, 126, 58, W.hijauMuda, ["Tabel 8.5", "25 data", "jumlah frekuensi 25"], 8.6)),
      tambah("sayuran:", ...kartu("pb", 160, 44, 126, 58, W.krem, ["Tabel 8.4", "16 siswa", "jumlah frekuensi 39"], 8.6)),
      tambah("tiga", teks("pc", 150, 136, "tiap siswa boleh sampai 3 pilihan", 9.6, W.merah)),
    ),
  ],
};

/* ------------------------------ LB3. Data-to-Decision Reading: konsep ------------------------------ */
export const ADEGAN_LUAR_KEPUTUSAN: AdeganStory = {
  id: "luar-keputusan",
  judul: "Data-to-Decision Reading: konsep",
  sumber: "Metode luar 4: membaca tabel untuk mengambil keputusan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Metode keempat, Data-to-Decision Reading, cara membaca tabel untuk mengambil keputusan. Ada empat pertanyaan yang kita ajukan pada tabel.",
      tambah(0, judul("Data-to-Decision Reading")),
      tambah("keempat,", ...kartu("q1", 14, 36, 126, 40, "#FDE68A", ["terbanyak?"], 9.6)),
      tambah("empat@2", ...kartu("q2", 160, 36, 126, 40, "#FBCFE8", ["tersedikit?"], 9.6)),
      tambah("pertanyaan", ...kartu("q3", 14, 88, 126, 40, "#BBF7D0", ["jumlah dan selisih?"], 9)),
      tambah("tabel.", ...kartu("q4", 160, 88, 126, 40, "#BFDBFE", ["keputusannya?"], 9.6)),
    ),
    k(
      "Pertanyaan satu dan dua: cari frekuensi terbesar untuk yang terbanyak, dan frekuensi terkecil untuk yang tersedikit.",
      sorotkan("satu", "q1-k"),
      sorotkan("dua:", "q2-k"),
      tambah("terbesar", teks("r1", 77, 150, "terbanyak: frekuensi terbesar", 8.4, W.hijau)),
      tambah("terkecil", teks("r2", 223, 150, "tersedikit: frekuensi terkecil", 8.4, W.merah)),
    ),
    k(
      "Pertanyaan tiga: jumlahkan frekuensi untuk total, dan kurangkan dua frekuensi untuk selisih. Pertanyaan empat: pilih keputusan yang didukung angka itu.",
      sorotkan("tiga:", "q3-k"),
      sorotkan("empat:", "q4-k"),
      tambah("jumlahkan", teks("r3", 77, 170, "total: jumlahkan frekuensi", 8.4, W.ungu)),
      tambah("pilih", teks("r4", 223, 170, "putuskan sesuai angka", 8.4, W.ungu)),
    ),
    k(
      "Perhatikan juga perubahan dari hari ke hari, bukan hanya jumlah akhir, seperti turunnya donat kacang dan naiknya donat cokelat pada catatan Anggi.",
      bersih(0),
      tambah(0, judul("lihat juga perubahannya")),
      tambah("turunnya", emo("tn", 80, 80, "📉", 40), teks("tnt", 80, 112, "donat kacang turun", 9, W.merah)),
      tambah("naiknya", emo("nk", 220, 80, "📈", 40), teks("nkt", 220, 112, "donat cokelat naik", 9, W.hijau)),
    ),
  ],
};

/* ------------------------------ LB4. Data-to-Decision Reading: penerapan pada donat Anggi ------------------------------ */
const DONAT: [string, number[]][] = [
  ["cokelat", [3, 4, 5, 5, 6, 7]],
  ["keju", [6, 4, 3, 4, 3, 5]],
  ["stroberi", [4, 6, 4, 5, 3, 4]],
  ["kacang", [4, 3, 2, 1, 0, 0]],
];
const jml = (a: number[]) => a.reduce((t, x) => t + x, 0);
const barisDonat = (i: number) => [
  teks(`dr${i}-n`, 14, 42 + i * 20 + 4, DONAT[i][0], 8.6, W.biru, { anchor: "start" }),
  ...DONAT[i][1].map((v, j) => teks(`dr${i}-v${j}`, 84 + j * 24, 42 + i * 20 + 4, String(v), 9.4)),
];
const hasilDonat = (i: number) => teks(`dr${i}-h`, 250, 42 + i * 20 + 4, String(jml(DONAT[i][1])), 11, W.merah);

export const ADEGAN_LUAR_KEPUTUSAN_TERAPAN: AdeganStory = {
  id: "luar-keputusan-terapan",
  judul: "Data-to-Decision Reading: penerapan pada donat Anggi",
  sumber: "Metode luar 4: penerapan pada Tabel 8.1 hlm. 237",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Terapkan pada donat Anggi. Jumlahkan tiap rasa selama enam hari. Cokelat: 3 ditambah 4 ditambah 5 ditambah 5 ditambah 6 ditambah 7 adalah 30.",
      tambah(0, judul("donat Anggi, enam hari")),
      tambah("Terapkan", ...[0, 1, 2, 3].flatMap(barisDonat)),
      tambah("Cokelat:", teks("sc", 150, 136, "3 + 4 + 5 + 5 + 6 + 7 = 30", 8.8, W.ungu), hasilDonat(0)),
    ),
    k(
      "Keju: 6 ditambah 4 ditambah 3 ditambah 4 ditambah 3 ditambah 5 adalah 25. Stroberi: 4 ditambah 6 ditambah 4 ditambah 5 ditambah 3 ditambah 4 adalah 26.",
      tambah("Keju:", teks("sk", 150, 150, "6 + 4 + 3 + 4 + 3 + 5 = 25", 8.8, W.ungu), hasilDonat(1)),
      tambah("Stroberi:", teks("ss", 150, 164, "4 + 6 + 4 + 5 + 3 + 4 = 26", 8.8, W.ungu), hasilDonat(2)),
    ),
    k(
      "Kacang: 4 ditambah 3 ditambah 2 ditambah 1 ditambah 0 ditambah 0 adalah 10. Jumlah keempat rasa, 30, 25, 26, dan 10, adalah 91.",
      tambah("Kacang:", teks("sn", 150, 178, "4 + 3 + 2 + 1 + 0 + 0 = 10", 8.8, W.ungu), hasilDonat(3)),
      tambah("Jumlah", teks("st", 150, 192, "30 + 25 + 26 + 10 = 91", 9.4, W.hijau)),
    ),
    k(
      "Terbanyak: cokelat 30. Tersedikit: kacang 10. Selisih keduanya 20. Keputusan Anggi sesuai data: tambah cokelat, hentikan kacang.",
      hapus(0, "sc", "sk", "ss", "sn", "st"),
      sorotkan("Terbanyak:", "dr0-h", "dr0-n"),
      sorotkan("Tersedikit:", "dr3-h", "dr3-n"),
      tambah("Selisih", teks("sl", 150, 150, "30 - 10 = 20", 10.4, W.merah)),
      tambah("Keputusan", ...kartu("kd", 40, 164, 220, 26, W.hijauMuda, ["tambah cokelat, hentikan kacang"], 8.8)),
    ),
  ],
};

/* ------------------------------ LB5. Ringkasan empat metode luar Subbab A ------------------------------ */
export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan empat metode luar Subbab A",
  sumber: "Ringkasan metode luar Subbab A",
  latar: "#EAF2FF",
  ketukan: [
    k(
      "Ringkasan empat metode luar Subbab A. Data Collection Cycle: tanya, kumpulkan, catat, rekap, lalu putuskan.",
      tambah(0, judul("Ringkasan metode luar")),
      tambah("Data", ...kartu("rg1", 10, 34, 134, 66, "#FDE68A", ["Data Collection", "Cycle", "tanya sampai putuskan"], 8.6)),
    ),
    k(
      "Tally Mark Protocol: satu data satu goresan, empat tegak dan satu miring, lalu hitung meloncat lima.",
      tambah("Tally", ...kartu("rg2", 156, 34, 134, 66, "#FBCFE8", ["Tally Mark", "Protocol", "kelompok lima"], 8.6)),
    ),
    k(
      "Frequency Table Construction: kategori ditulis sekali, lalu turus, frekuensi, dan cocokkan jumlahnya dengan banyaknya data.",
      tambah("Frequency", ...kartu("rg3", 10, 112, 134, 66, "#BBF7D0", ["Frequency Table", "Construction", "cocokkan jumlahnya"], 8.6)),
    ),
    k(
      "Data-to-Decision Reading: cari terbanyak dan tersedikit, hitung jumlah dan selisih, lalu ambil keputusan. Berikutnya kita menuju Subbab B.",
      tambah("Data-to-Decision", ...kartu("rg4", 156, 112, 134, 66, "#BFDBFE", ["Data-to-Decision", "Reading", "dari tabel ke keputusan"], 8.2)),
      tambah("Berikutnya", teks("rg5", 150, 196, "lanjut ke Subbab B", 9.4, W.ungu)),
    ),
  ],
};
