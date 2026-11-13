import type { AdeganStory } from "./logika-story";
import { W, bajiLurus, bulat, emo, garis, judul, kartu, kotak, sedotan, segitiga, tabel, tandaSiku, tandaSisi, teks, titikSisi } from "./k5b7a-gambar";
import { bersih, k, tambah, warnai } from "./k5b7a-bantu";

/* ------------------------------ LA0. Empat metode luar Subbab A ------------------------------ */
export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Empat metode luar untuk membandingkan ciri-ciri segitiga",
  sumber: "Metode luar buku; contoh dari Buku Siswa hlm. 196–208",
  latar: "#EAF2FF",
  ketukan: [
    k(
      "Video ini membahas empat metode luar untuk Subbab A, yaitu cara tambahan di luar buku untuk membandingkan ciri-ciri segitiga.",
      tambah(0, judul("metode luar Subbab A")),
      tambah(4, emo("dunia", 80, 100, "🌐", 44), teks("l1", 80, 132, "metode luar", 9, W.merah)),
      tambah(7, emo("buku", 220, 100, "📘", 44), teks("l2", 220, 132, "Subbab A", 9)),
      tambah(11, garis("pa", 112, 100, 74, 0, W.hijau, 4, { gambar: true })),
    ),
    k(
      "Pertama, Triangle Inequality Theorem, menguji apakah tiga sisi bisa menjadi segitiga. Kedua, Angle Sum Property, memakai jumlah sudut seratus delapan puluh derajat.",
      bersih(0),
      tambah(0, judul("empat metode luar")),
      tambah(0, ...kartu("m1", 10, 34, 134, 66, "#FDE68A", ["Triangle Inequality", "Theorem", "syarat sisi"], 8.6)),
      tambah(11, ...kartu("m2", 156, 34, 134, 66, "#FBCFE8", ["Angle Sum", "Property", "jumlah sudut 180°"], 8.6)),
    ),
    k(
      "Ketiga, Side-Angle Classification, memberi nama segitiga dari sisi dan sudutnya. Keempat, Inclusive Triangle Hierarchy, menentukan segitiga mana termasuk golongan lain.",
      tambah(0, ...kartu("m3", 10, 112, 134, 66, "#BBF7D0", ["Side-Angle", "Classification", "nama dari sisi dan sudut"], 8.6)),
      tambah(10, ...kartu("m4", 156, 112, 134, 66, "#BFDBFE", ["Inclusive Triangle", "Hierarchy", "golongan bersarang"], 8.4)),
    ),
    k(
      "Tiap metode dipelajari dalam dua bagian, konsep lalu penerapan, memakai angka dari Buku Siswa seperti sedotan lima, enam, tujuh dan segitiga siku-siku sama kaki.",
      bersih(0),
      tambah(0, judul("konsep, lalu penerapan")),
      tambah("konsep", ...kartu("c1", 30, 44, 100, 46, W.krem, ["konsep", "cara kerja"], 10)),
      tambah("penerapan", garis("cp", 134, 67, 32, 0, W.hijau, 3, { gambar: true }), ...kartu("c2", 170, 44, 100, 46, W.hijauMuda, ["penerapan", "angka buku"], 10)),
      tambah("sedotan", emo("sd", 70, 140, "🥤", 30), teks("sdt", 70, 164, "sedotan 5, 6, 7", 8.6)),
      tambah("Siswa", emo("dr", 150, 140, "📐", 30), teks("drt", 150, 164, "sudut 180°", 8.6)),
      tambah("segitiga", emo("sg", 230, 140, "🔺", 30), teks("sgt", 230, 164, "sama kaki", 8.6)),
    ),
  ],
};

/* ------------------------------ LA1. Triangle Inequality Theorem: konsep ------------------------------ */
export const ADEGAN_LUAR_KETAKSAMAAN: AdeganStory = {
  id: "luar-ketaksamaan",
  judul: "Triangle Inequality Theorem: konsep",
  sumber: "Metode luar 1: syarat tiga sisi membentuk segitiga",
  latar: "#ECFDF5",
  ketukan: [
    k(
      "Metode pertama, Triangle Inequality Theorem: tiga sisi hanya bisa menjadi segitiga jika dua sisi terpendek bersama lebih panjang dari sisi terpanjang.",
      tambah(2, judul("Triangle Inequality Theorem")),
      tambah(12, kotak("p1", 40, 86, 70, 18, W.jingga, W.biru, { rx: 3 }), teks("p1t", 75, 98, "pendek", 8.6), kotak("p2", 110, 86, 70, 18, W.langit, W.biru, { rx: 3 }), teks("p2t", 145, 98, "pendek", 8.6)),
      tambah(16, teks("lb1", 245, 90, "harus lebih", 9, W.merah), teks("lb2", 245, 103, "panjang dari", 9, W.merah)),
      tambah(19, kotak("tp", 40, 44, 140, 18, W.hijauMuda, W.biru, { rx: 3 }), teks("tpt", 110, 56, "terpanjang", 8.6), teks("lb3", 245, 116, "terpanjang", 9, W.merah)),
    ),
    k(
      "Langkahnya tiga. Satu, urutkan sisi dari yang terpendek. Dua, jumlahkan dua sisi terpendek. Tiga, bandingkan hasilnya dengan sisi terpanjang.",
      bersih(0),
      tambah(0, judul("tiga langkah")),
      tambah(2, ...kartu("s1", 30, 34, 240, 40, W.krem, ["1. urutkan sisi", "dari yang terpendek"], 9.2)),
      tambah(8, ...kartu("s2", 30, 84, 240, 40, W.langit, ["2. jumlahkan dua", "sisi terpendek"], 9.2)),
      tambah(13, ...kartu("s3", 30, 134, 240, 40, W.hijauMuda, ["3. bandingkan dengan", "sisi terpanjang"], 9.2)),
    ),
    k(
      "Jika jumlahnya lebih besar, segitiga bisa dibuat. Jika sama atau lebih kecil, segitiga tidak bisa dibuat.",
      bersih(0),
      tambah(0, judul("hasil perbandingan")),
      tambah(0, ...kartu("h1", 20, 44, 260, 50, W.hijauMuda, ["jumlah lebih besar", "segitiga bisa dibuat"], 10)),
      tambah(7, ...kartu("h2", 20, 110, 260, 50, W.merahMuda, ["sama atau lebih kecil", "segitiga tidak bisa dibuat"], 10)),
    ),
    k(
      "Alasannya, dua sisi pendek harus saling bertemu di atas sisi terpanjang. Bila jumlahnya sama, keduanya hanya rebah di atas sisi terpanjang.",
      bersih(0),
      tambah(0, judul("mengapa sama pun gagal")),
      tambah(1, segitiga("ok", 30, 140, titikSisi(5, 6, 7, 12), W.hijauMuda), teks("okt", 72, 160, "bisa", 9, W.hijau)),
      tambah(11, garis("fb", 170, 150, 90, 0, W.abu, 3), garis("fa", 170, 140, 60, 0, W.merah, 4), garis("fc", 230, 140, 30, 0, W.biru, 4), teks("fq", 215, 172, "10 + 5 = 15", 9.4, W.merah), teks("fr", 215, 186, "rebah, tidak jadi segitiga", 8, W.merah)),
    ),
  ],
};

/* ------------------------------ LA2. Triangle Inequality Theorem: penerapan ------------------------------ */
const KOL_UJI = [24, 64, 72, 56, 54];
const BARIS_UJI: Record<number, string[]> = {
  1: ["1", "5, 6, 7", "5+6=11", "7", "bisa"],
  2: ["2", "4, 6, 6", "4+6=10", "6", "bisa"],
  3: ["3", "5, 4, 12", "4+5=9", "12", "tidak"],
  4: ["4", "10, 5, 15", "5+10=15", "15", "tidak"],
  5: ["5", "5, 12, 13", "5+12=17", "13", "bisa"],
};
const barisUji = (r: number) => tabel(`lt${r}`, 15, 54 + (r - 1) * 20, KOL_UJI, [BARIS_UJI[r]], 20, 7.8, W.putih);

export const ADEGAN_LUAR_KETAKSAMAAN_TERAPAN: AdeganStory = {
  id: "luar-ketaksamaan-terapan",
  judul: "Triangle Inequality Theorem: penerapan pada sedotan Buku Siswa",
  sumber: "Metode luar 1: penerapan pada percobaan sedotan hlm. 196 dan Uji Kompetensi hlm. 234",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Terapkan pada lima kelompok sedotan Buku Siswa. Nomor satu: lima, enam, tujuh. Dua sisi terpendek lima tambah enam sebelas, lebih dari tujuh, jadi bisa.",
      tambah(0, judul("lima kelompok sedotan")),
      tambah(0, ...tabel("lt0", 15, 34, KOL_UJI, [["No", "a, b, c", "dua terpendek", "terpanjang", "hasil"]], 20, 7.8)),
      tambah(7, ...barisUji(1)),
      warnai(22, W.hijau, "lt1-t04"),
    ),
    k(
      "Nomor dua: empat, enam, enam. Empat tambah enam sepuluh, lebih dari enam, bisa. Nomor tiga: lima, empat, dua belas. Empat tambah lima hanya sembilan, kurang dari dua belas, tidak bisa.",
      tambah(0, ...barisUji(2)),
      warnai(12, W.hijau, "lt2-t04"),
      tambah(13, ...barisUji(3)),
      warnai(29, W.merah, "lt3-t04"),
    ),
    k(
      "Nomor empat: sepuluh, lima, lima belas. Lima tambah sepuluh sama dengan lima belas, belum lebih, jadi tidak bisa. Nomor lima: lima, dua belas, tiga belas. Lima tambah dua belas tujuh belas, lebih dari tiga belas, bisa.",
      tambah(0, ...barisUji(4)),
      warnai(17, W.merah, "lt4-t04"),
      tambah(18, ...barisUji(5)),
      warnai(35, W.hijau, "lt5-t04"),
    ),
    k(
      "Terapkan pada Uji Kompetensi satu: lima, tujuh, dan satu sentimeter. Dua sisi terpendek: satu tambah lima sama dengan enam. Enam tidak melebihi tujuh, jadi tidak bisa.",
      bersih(0),
      tambah(0, judul("Uji Kompetensi 1: 5, 7, dan 1")),
      tambah(6, teks("lc", 26, 69, "c", 9), ...sedotan("sc", 44, 62, 7, W.hijauMuda, 11)),
      tambah(13, teks("la", 26, 105, "a + b", 8.6), ...sedotan("sa", 44, 98, 1, W.langit, 11), ...sedotan("sb", 55, 98, 5, W.jingga, 11)),
      tambah(18, teks("e6", 210, 105, "1 + 5 = 6", 10, W.ungu), teks("e7", 210, 69, "c = 7", 10, W.ungu)),
      tambah(20, teks("lb", 150, 140, "6 tidak melebihi 7", 10, W.merah)),
      tambah(24, ...kartu("tb", 90, 154, 120, 26, W.merahMuda, ["tidak bisa"], 10)),
    ),
    k(
      "Jadi dari lima kelompok, tiga bisa dan dua tidak. Cukup memeriksa satu perbandingan: dua sisi terpendek terhadap sisi terpanjang.",
      bersih(0),
      tambah(0, judul("hasil lima kelompok")),
      tambah(0, ...[1, 2, 3, 4, 5].flatMap((n, i) => [bulat(`n${n}`, 50 + i * 50, 80, 15, W.abu), teks(`nt${n}`, 50 + i * 50, 84, String(n), 11)])),
      warnai(5, W.hijauMuda, "n1", "n2", "n5"),
      tambah(5, teks("lb1", 50, 116, "bisa", 8.6, W.hijau), teks("lb2", 100, 116, "bisa", 8.6, W.hijau), teks("lb5", 250, 116, "bisa", 8.6, W.hijau)),
      warnai(7, W.merahMuda, "n3", "n4"),
      tambah(7, teks("lb3", 150, 116, "tidak", 8.6, W.merah), teks("lb4", 200, 116, "tidak", 8.6, W.merah)),
      tambah(12, ...kartu("cp", 30, 140, 240, 40, W.krem, ["cukup satu perbandingan:", "dua terpendek lawan terpanjang"], 9)),
    ),
  ],
};

/* ------------------------------ LA3. Angle Sum Property: konsep ------------------------------ */
export const ADEGAN_LUAR_JUMLAH: AdeganStory = {
  id: "luar-jumlah",
  judul: "Angle Sum Property: konsep",
  sumber: "Metode luar 2: jumlah sudut segitiga seratus delapan puluh derajat",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Metode kedua, Angle Sum Property: ketiga sudut dalam segitiga selalu berjumlah seratus delapan puluh derajat.",
      tambah(2, judul("Angle Sum Property")),
      tambah(5, ...bajiLurus("bj", 150, 130, [55, 60, 65], ["x", "y", "z"], [W.merah, W.hijau, W.ungu])),
      tambah(11, teks("eq", 150, 176, "x + y + z = 180°", 11, W.ungu)),
    ),
    k(
      "Gunakan untuk mencari sudut yang hilang: seratus delapan puluh dikurang dua sudut yang diketahui sama dengan sudut ketiga.",
      bersih(0),
      tambah(0, judul("mencari sudut yang hilang")),
      tambah(6, ...kartu("fm", 20, 50, 260, 50, W.krem, ["sudut ketiga =", "180° - sudut pertama - sudut kedua"], 9.4)),
    ),
    k(
      "Gunakan juga untuk segitiga yang sudutnya sama: bagi sisa derajat dengan banyak sudut yang sama.",
      bersih(0),
      tambah(0, judul("sudut yang sama besar")),
      tambah(0, ...kartu("sa", 20, 40, 260, 40, W.langit, ["sisa = 180° - sudut lain"], 10)),
      tambah(7, ...kartu("sb", 20, 96, 260, 40, W.hijauMuda, ["tiap sudut sama = sisa dibagi banyaknya"], 9.4)),
    ),
    k(
      "Aturan penolak: dua sudut siku-siku sudah berjumlah tepat seratus delapan puluh, sisanya nol, sedangkan dua sudut tumpul melebihinya. Keduanya mustahil dalam satu segitiga.",
      bersih(0),
      tambah(0, judul("aturan penolak")),
      tambah(2, ...kartu("r1", 20, 36, 260, 44, W.merahMuda, ["2 sudut siku-siku", "90° + 90° = 180°, sisa 0°"], 9.4)),
      tambah(13, ...kartu("r2", 20, 92, 260, 44, W.merahMuda, ["2 sudut tumpul", "lebih dari 180°"], 9.4)),
      tambah(19, teks("ms", 150, 164, "mustahil dalam satu segitiga", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ LA4. Angle Sum Property: penerapan ------------------------------ */
export const ADEGAN_LUAR_JUMLAH_TERAPAN: AdeganStory = {
  id: "luar-jumlah-terapan",
  judul: "Angle Sum Property: penerapan pada segitiga Buku Siswa",
  sumber: "Metode luar 2: penerapan pada hlm. 205–206 dan soal pengayaan Panduan Guru",
  latar: "#FFFBEB",
  ketukan: [
    k(
      "Segitiga siku-siku sama kaki: satu sudut sembilan puluh. Sisa seratus delapan puluh dikurang sembilan puluh sama dengan sembilan puluh, dibagi dua kaki, masing-masing empat puluh lima derajat.",
      tambah(0, judul("siku-siku sama kaki")),
      tambah(4, segitiga("sg", 20, 150, [[0, 0], [70, 0], [0, -70]], W.langit), tandaSiku("sk", 20, 150, 10, 1, -1), tandaSisi("ta", 20, 150, 20, 80), tandaSisi("tb", 20, 150, 90, 150)),
      tambah(15, teks("q1", 215, 60, "180 - 90 = 90", 10, W.biru)),
      tambah(19, teks("q2", 215, 86, "90 ÷ 2 = 45", 10, W.ungu)),
      tambah(22, teks("q3", 215, 112, "45° tiap kaki", 10, W.hijau)),
    ),
    k(
      "Segitiga sama sisi: tiga sudut sama. Seratus delapan puluh dibagi tiga, enam puluh derajat tiap sudut. Periksa: enam puluh tambah enam puluh tambah enam puluh, seratus delapan puluh.",
      bersih(0),
      tambah(0, judul("sama sisi")),
      tambah(0, segitiga("sg", 20, 150, [[0, 0], [80, 0], [40, -69.3]], W.krem), tandaSisi("t1", 20, 150, 100, 150), tandaSisi("t2", 100, 150, 60, 80.7), tandaSisi("t3", 20, 150, 60, 80.7)),
      tambah(9, teks("q1", 215, 70, "180 ÷ 3 = 60", 10, W.biru)),
      tambah(16, teks("q2", 215, 98, "60 + 60 + 60 = 180", 10, W.hijau)),
    ),
    k(
      "Soal pengayaan: dua sudut empat puluh lima derajat. Empat puluh lima tambah empat puluh lima sama dengan sembilan puluh. Sudut ketiga seratus delapan puluh dikurang sembilan puluh, yaitu sembilan puluh derajat.",
      bersih(0),
      tambah(0, judul("soal pengayaan")),
      tambah(8, teks("q1", 150, 60, "45 + 45 = 90", 11, W.biru)),
      tambah(19, teks("q2", 150, 90, "180 - 90 = 90", 11, W.ungu)),
      tambah(27, teks("q3", 150, 122, "sudut ketiga 90°", 11, W.merah), teks("q4", 150, 146, "siku-siku sama kaki", 10, W.hijau)),
    ),
    k(
      "Uji dua sudut siku-siku: sembilan puluh tambah sembilan puluh sama dengan seratus delapan puluh. Sisa untuk sudut ketiga nol derajat, jadi segitiga tidak ada.",
      bersih(0),
      tambah(0, judul("uji dua sudut siku-siku")),
      tambah(3, teks("q1", 150, 62, "90 + 90 = 180", 11, W.biru)),
      tambah(14, teks("q2", 150, 92, "180 - 180 = 0", 11, W.ungu)),
      tambah(21, teks("q3", 150, 126, "sudut ketiga: 0°", 11, W.merah), teks("q4", 150, 148, "segitiga tidak ada", 10, W.merah)),
    ),
  ],
};
