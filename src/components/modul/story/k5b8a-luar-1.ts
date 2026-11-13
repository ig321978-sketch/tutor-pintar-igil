import type { AdeganStory } from "./logika-story";
import { W, emo, judul, kartu, panah, teks, turus } from "./k5b8a-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k5b8a-bantu";

/* ------------------------------ LA0. Empat metode luar Subbab A ------------------------------ */
export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Empat metode luar untuk mengumpulkan data dan tabel frekuensi",
  sumber: "Metode luar buku; contoh dari Buku Siswa hlm. 235–247",
  latar: "#EAF2FF",
  ketukan: [
    k(
      "Video ini membahas empat metode luar untuk Subbab A, yaitu cara tambahan di luar buku untuk mengumpulkan data dan menyusun tabel frekuensi.",
      tambah("metode", emo("dunia", 80, 100, "🌐", 44), teks("l1", 80, 132, "metode luar", 9, W.merah)),
      tambah("Subbab", emo("buku", 220, 100, "📘", 44), teks("l2", 220, 132, "Subbab A", 9)),
      tambah("tambahan", panah("pa", 112, 100, 74, 0, W.hijau, 4, { gambar: true })),
    ),
    k(
      "Pertama, Data Collection Cycle, siklus lima langkah pengumpulan data. Kedua, Tally Mark Protocol, aturan menulis turus.",
      bersih(0),
      tambah(0, judul("Empat metode luar")),
      tambah("Pertama", ...kartu("m1", 10, 34, 134, 66, "#FDE68A", ["Data Collection", "Cycle", "siklus lima langkah"], 8.6)),
      tambah("Kedua", ...kartu("m2", 156, 34, 134, 66, "#FBCFE8", ["Tally Mark", "Protocol", "aturan menulis turus"], 8.6)),
    ),
    k(
      "Ketiga, Frequency Table Construction, cara menyusun tabel frekuensi. Keempat, Data-to-Decision Reading, cara membaca tabel untuk mengambil keputusan.",
      tambah("Ketiga", ...kartu("m3", 10, 112, 134, 66, "#BBF7D0", ["Frequency Table", "Construction", "menyusun tabel"], 8.6)),
      tambah("Keempat", ...kartu("m4", 156, 112, 134, 66, "#BFDBFE", ["Data-to-Decision", "Reading", "membaca untuk keputusan"], 8.2)),
    ),
    k(
      "Setiap metode kita pelajari dalam dua bagian, konsep lalu penerapan, dengan data buku seperti sayuran favorit, donat Anggi, dan nilai ulangan Mekarsari.",
      bersih(0),
      tambah(0, judul("konsep, lalu penerapan")),
      tambah("konsep", ...kartu("c1", 30, 44, 100, 46, W.krem, ["konsep", "cara kerja"], 10)),
      tambah("penerapan", panah("cp", 134, 67, 32, 0, W.hijau, 3, { gambar: true }), ...kartu("c2", 170, 44, 100, 46, "#DCFCE7", ["penerapan", "soal buku"], 10)),
      tambah("sayuran", emo("sy", 70, 140, "🥕", 30), teks("syt", 70, 164, "sayuran favorit", 8.6)),
      tambah("donat", emo("dn", 150, 140, "🍩", 30), teks("dnt", 150, 164, "donat Anggi", 8.6)),
      tambah("nilai", emo("nl", 230, 140, "📝", 30), teks("nlt", 230, 164, "nilai ulangan", 8.6)),
    ),
  ],
};

/* ------------------------------ LA1. Data Collection Cycle: konsep ------------------------------ */
const LANGKAH: [string, string][] = [
  ["1", "tanya"],
  ["2", "kumpulkan"],
  ["3", "catat"],
  ["4", "rekap"],
  ["5", "putuskan"],
];
const posLangkah = (i: number) => (i < 3 ? { x: 8 + i * 100, y: 34 } : { x: 58 + (i - 3) * 100, y: 100 });
const kartuLangkah = (i: number, warna: string, baris: string[]) => kartu(`ls${i}`, posLangkah(i).x, posLangkah(i).y, 84, 46, warna, [`${LANGKAH[i][0]}. ${LANGKAH[i][1]}`, ...baris], 8.6);

export const ADEGAN_LUAR_SIKLUS: AdeganStory = {
  id: "luar-siklus",
  judul: "Data Collection Cycle: konsep",
  sumber: "Metode luar 1: siklus pengumpulan data",
  latar: "#ECFDF5",
  ketukan: [
    k(
      "Metode pertama, Data Collection Cycle, siklus pengumpulan data. Siklus ini punya lima langkah yang berputar.",
      tambah(0, judul("Data Collection Cycle")),
      tambah("siklus", emo("rp", 150, 96, "🔄", 46)),
      tambah("lima", teks("lm", 150, 136, "lima langkah yang berputar", 10.4, W.ungu)),
    ),
    k(
      "Langkah satu, tanya: tentukan pertanyaan yang ingin dijawab, misalnya sayuran apa yang paling disukai. Langkah dua, kumpulkan: tanyai semua responden.",
      bersih(0),
      tambah(0, judul("langkah satu dan dua")),
      tambah("tanya:", ...kartuLangkah(0, "#FDE68A", ["pertanyaan"])),
      tambah("kumpulkan:", panah("lp1", 94, 57, 12, 0, W.hijau, 2.4, { gambar: true }), ...kartuLangkah(1, "#BBF7D0", ["semua responden"])),
    ),
    k(
      "Langkah tiga, catat: tulis jawaban dengan turus agar tidak ada yang terlewat. Langkah empat, rekap: hitung turus menjadi frekuensi dalam tabel.",
      tambah("catat:", panah("lp2", 194, 57, 12, 0, W.hijau, 2.4, { gambar: true }), ...kartuLangkah(2, "#BFDBFE", ["pakai turus"])),
      tambah("rekap:", panah("lp3", 250, 82, -142, 18, W.hijau, 2.4, { gambar: true }), ...kartuLangkah(3, "#FBCFE8", ["jadi frekuensi"])),
    ),
    k(
      "Langkah lima, putuskan: pakai hasil tabel untuk mengambil keputusan. Lalu siklus berputar lagi bila ada pertanyaan baru.",
      tambah("putuskan:", panah("lp4", 144, 123, 12, 0, W.hijau, 2.4, { gambar: true }), ...kartuLangkah(4, "#FED7AA", ["pakai hasilnya"])),
      tambah("berputar", emo("lp5", 150, 176, "🔄", 22), teks("lp6", 150, 192, "bila ada pertanyaan baru, ulangi", 9.6, W.ungu)),
    ),
  ],
};

/* ------------------------------ LA2. Data Collection Cycle: penerapan pada sayuran favorit ------------------------------ */
const SAYUR: [string, number][] = [["bayam", 7], ["kangkung", 6], ["wortel", 8], ["tomat", 6], ["buncis", 4], ["sawi", 5], ["kol", 3]];

export const ADEGAN_LUAR_SIKLUS_TERAPAN: AdeganStory = {
  id: "luar-siklus-terapan",
  judul: "Data Collection Cycle: penerapan pada sayuran favorit",
  sumber: "Metode luar 1: penerapan pada Eksplorasi 8.1A",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Terapkan pada sayuran favorit di Eksplorasi 8.1A. Tanya: sayuran apa yang paling disukai siswa kelas V? Kumpulkan: tanyai enam belas siswa, paling banyak tiga pilihan.",
      tambah(0, judul("Eksplorasi 8.1A: sayuran favorit")),
      tambah("Tanya:", ...kartu("a1", 14, 44, 126, 50, "#FDE68A", ["1. tanya", "sayuran apa favorit?"], 8.6)),
      tambah("Kumpulkan:", ...kartu("a2", 160, 44, 126, 50, "#BBF7D0", ["2. kumpulkan", "16 siswa, maks. 3 pilihan"], 8.2)),
    ),
    k(
      "Catat: setiap pilihan satu turus. Rekap: bayam 7, kangkung 6, wortel 8, tomat 6, buncis 4, sawi 5, dan kol 3.",
      tambah("Catat:", ...kartu("a3", 14, 104, 126, 30, "#BFDBFE", ["3. catat: turus"], 8.6)),
      tambah("Rekap:", ...kartu("a4", 160, 104, 126, 30, "#FBCFE8", ["4. rekap: frekuensi"], 8.6)),
      ...SAYUR.map(([n, v], i) => tambah(`${n}`, teks(`sy${i}`, 28 + (i % 4) * 66, 156 + Math.floor(i / 4) * 16, `${n} ${v}`, 9, W.hijau))),
    ),
    k(
      "Periksa: jumlahnya 39 pilihan, bukan 16, sebab satu siswa boleh memilih sampai tiga jenis sayuran.",
      hapus(0, "a1-k", "a1-t0", "a1-t1", "a2-k", "a2-t0", "a2-t1", "a3-k", "a3-t0", "a4-k", "a4-t0"),
      tambah("Periksa:", teks("ek", 150, 54, "7 + 6 + 8 + 6 + 4 + 5 + 3 = 39", 11, W.ungu)),
      tambah("bukan", teks("ek2", 150, 86, "39 pilihan, bukan 16 siswa", 10, W.merah)),
    ),
    k(
      "Putuskan: wortel paling banyak dipilih, jadi sebagai contoh keputusan, wortel layak didahulukan.",
      sorotkan("wortel", "sy2"),
      tambah("Putuskan:", ...kartu("a5", 60, 108, 180, 34, "#FED7AA", ["5. putuskan: dahulukan wortel"], 9)),
    ),
  ],
};

/* ------------------------------ LA3. Tally Mark Protocol: konsep ------------------------------ */
export const ADEGAN_LUAR_TURUS: AdeganStory = {
  id: "luar-turus",
  judul: "Tally Mark Protocol: konsep",
  sumber: "Metode luar 2: aturan menulis turus",
  latar: "#FDF2F8",
  ketukan: [
    k(
      "Metode kedua, Tally Mark Protocol, aturan menulis turus. Aturan pertama: setiap data langsung diberi satu goresan, lalu data itu ditandai sudah dicatat.",
      tambah(0, judul("Tally Mark Protocol")),
      tambah("Aturan", ...kartu("d0", 30, 44, 56, 26, W.krem, ["data"], 8.6), ...kartu("d1", 98, 44, 56, 26, W.krem, ["data"], 8.6), ...kartu("d2", 166, 44, 56, 26, W.krem, ["data"], 8.6)),
      tambah("goresan,", ...turus("tm", 60, 96, 3, 26, W.hitam)),
      tambah("ditandai", teks("td", 150, 150, "tiap data dicatat, lalu dicoret", 10, W.hijau)),
    ),
    k(
      "Aturan kedua: empat goresan tegak, goresan kelima miring menutup kelompok. Jadi satu kelompok selalu bernilai 5.",
      bersih(0),
      tambah(0, judul("aturan kedua: kelompok lima")),
      tambah("empat", ...turus("tk", 118, 44, 5, 44, W.hitam)),
      tambah("5.", teks("k5", 150, 126, "satu kelompok bernilai 5", 11, W.ungu)),
    ),
    k(
      "Aturan ketiga: hitung meloncat lima. Untuk 12 goresan, ada 2 kelompok 5 dan sisa 2, jadi 5 ditambah 5 ditambah 2 adalah 12.",
      bersih(0),
      tambah(0, judul("aturan ketiga: loncat lima")),
      tambah("goresan,", ...turus("tc", 100, 44, 12, 40, W.hitam)),
      tambah("kelompok", teks("kt1", 100, 112, "2 kelompok 5", 9.6, W.hijau), teks("kt2", 200, 112, "sisa 2", 9.6, W.merah)),
      tambah("jadi", teks("kt3", 150, 150, "5 + 5 + 2 = 12", 12, W.ungu)),
    ),
    k(
      "Aturan keempat: jangan menghitung ulang dari awal. Cukup baca kelompok lima, lalu tambahkan sisanya.",
      bersih(0),
      tambah(0, judul("aturan keempat")),
      tambah("jangan", ...kartu("n1", 20, 50, 120, 56, W.merahMuda, ["jangan hitung", "ulang dari awal"], 9.4)),
      tambah("Cukup", ...kartu("n2", 160, 50, 120, 56, W.hijauMuda, ["baca kelompok", "lima, tambah sisa"], 9.4)),
    ),
  ],
};

/* ------------------------------ LA4. Tally Mark Protocol: penerapan pada nilai ulangan Mekarsari ------------------------------ */
const NILAI_TURUS: [string, number][] = [["80", 7], ["70", 6], ["60", 5], ["90", 3], ["40", 2], ["50", 1], ["100", 1]];
const barisN = (i: number) => [teks(`nt${i}-n`, 30, 40 + i * 17 + 4, `nilai ${NILAI_TURUS[i][0]}`, 8.6, W.biru, { anchor: "start" }), ...turus(`nt${i}-t`, 100, 40 + i * 17 - 5, NILAI_TURUS[i][1], 13, W.hitam), teks(`nt${i}-f`, 190, 40 + i * 17 + 4, String(NILAI_TURUS[i][1]), 10, W.merah)];

export const ADEGAN_LUAR_TURUS_TERAPAN: AdeganStory = {
  id: "luar-turus-terapan",
  judul: "Tally Mark Protocol: penerapan pada nilai ulangan Mekarsari",
  sumber: "Metode luar 2: penerapan pada Ayo Berlatih hlm. 247",
  latar: "#FFF1F2",
  ketukan: [
    k(
      "Terapkan pada nilai ulangan Mekarsari. Nilai 80 muncul 7 kali, jadi tulis 7 goresan: satu kelompok 5 dan sisa 2.",
      tambah(0, judul("turus nilai ulangan")),
      tambah("80", ...barisN(0)),
      tambah("kelompok", teks("e7", 250, 44, "5 + 2 = 7", 9.6, W.ungu)),
    ),
    k(
      "Nilai 70 muncul 6 kali, yaitu satu kelompok 5 dan sisa 1. Nilai 60 muncul 5 kali, tepat satu kelompok penuh.",
      tambah("70", ...barisN(1)),
      tambah("kelompok", teks("e6", 250, 61, "5 + 1 = 6", 9.6, W.ungu)),
      tambah("60", ...barisN(2)),
    ),
    k(
      "Nilai 90 muncul 3 kali, nilai 40 muncul 2 kali, nilai 50 muncul 1 kali, dan nilai 100 muncul 1 kali, semuanya kurang dari satu kelompok.",
      tambah("90", ...barisN(3)),
      tambah("40", ...barisN(4)),
      tambah("50", ...barisN(5)),
      tambah("100", ...barisN(6)),
    ),
    k(
      "Hitung meloncat lima: nilai 80, 70, dan 60 masing-masing punya 1 kelompok, jadi 5 ditambah 5 ditambah 5 adalah 15. Sisa goresan 10, jadi totalnya 25.",
      hapus(0, "e7", "e6"),
      tambah("jadi", teks("h1", 250, 60, "5 + 5 + 5 = 15", 9, W.ungu)),
      tambah("Sisa", teks("h2", 250, 82, "15 + 10 = 25", 9.6, W.hijau)),
    ),
  ],
};
