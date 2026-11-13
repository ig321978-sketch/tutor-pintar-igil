import type { AdeganStory } from "./logika-story";
import { BAHAN, W, balon, emo, kotak, panah, susunKubus, teks } from "./k6b3a-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah } from "./k6b3a-bantu";

const P = (ox: number, oy: number, s = 18) => ({ s, ox, oy });
type Sel = [number, number, number][];

/** Matriks tinggi (baris j, kolom i) menjadi daftar sel kubus. */
export const dariTinggi = (H: number[][]): Sel => H.flatMap((baris, j) => baris.flatMap((t, i) => Array.from({ length: t }, (_, h) => [i, j, h] as [number, number, number])));
export const TANGGA = [[3, 2, 1], [2, 1, 0], [1, 0, 0]];
export const PIRAMIDA: Sel = [
  ...[0, 1, 2].flatMap((i) => [0, 1, 2].map((j) => [i, j, 0] as [number, number, number])),
  ...[0, 1].flatMap((i) => [0, 1].map((j) => [i, j, 1] as [number, number, number])),
  [0, 0, 2],
];
const warnaLapis = (n: number, s: [number, number, number]) => [BAHAN.biru, BAHAN.hijau, BAHAN.oranye][s[2]];
const idDi = (sel: Sel, ids: string[][], h: number) => sel.flatMap((s, n) => (s[2] === h ? ids[n] : []));

/* ------------------------------ LA0. Empat metode luar Sub-Bab A ------------------------------ */
const kartu = (id: string, x: number, y: number, warna: string, baris: string[], arti: string) => [
  kotak(`${id}-k`, x, y, 134, 70, warna, W.biru, { rx: 10 }),
  ...baris.map((b, i) => teks(`${id}-n${i}`, x + 67, y + 20 + i * 12, b, 8.8)),
  teks(`${id}-a`, x + 67, y + 24 + baris.length * 12, arti, 7, W.ungu),
];

export const ADEGAN_LUAR_A_PEMBUKA: AdeganStory = {
  id: "luara-pembuka",
  judul: "Empat metode luar untuk mengonstruksi dan mengurai",
  sumber: "Metode dari luar buku; contoh dari Buku Siswa hlm. 80–85",
  latar: "#EAF2FF",
  ketukan: [
    k(
      "Video ini membahas metode dari luar buku untuk Subbab A. Isinya membantu kita menghitung, memeriksa, dan membandingkan susunan kubus dengan lebih rapi.",
      tambah("metode", emo("dunia", 80, 100, "🌐", 44), teks("l1", 80, 132, "metode luar", 9, W.merah)),
      tambah("Subbab", emo("buku", 220, 100, "📘", 44), teks("l2", 220, 132, "Subbab A", 9)),
      tambah("rapi.", panah("pa", 112, 100, 74, 0, W.hijau, 4, { gambar: true })),
    ),
    k("Ada empat metode luar. Pertama, Layer Counting, menghitung kubus lapisan demi lapisan.", bersih(0), tambah(0, teks("jud", 150, 20, "Empat metode luar", 12, W.ungu)), tambah("Layer", kartu("m1", 10, 30, "#FDE68A", ["Layer", "Counting"], "hitung per lapisan"))),
    k("Kedua, Hidden Support Rule, aturan penyangga tersembunyi untuk kubus yang tidak tampak.", tambah("Hidden", kartu("m2", 156, 30, "#FBCFE8", ["Hidden", "Support Rule"], "ada kubus penyangga"))),
    k(
      "Ketiga, Rotational Equivalence Check, memeriksa dua susunan sama atau tidak lewat pemutaran. Keempat, Minimal Footprint Packing, menumpuk agar lantai terpakai sekecil mungkin.",
      tambah("Rotational", kartu("m3", 10, 112, "#BBF7D0", ["Rotational", "Equivalence Check"], "sama bila bisa diputar")),
      tambah("Minimal", kartu("m4", 156, 112, "#BFDBFE", ["Minimal Footprint", "Packing"], "jejak lantai terkecil")),
    ),
  ],
};

/* ------------------------------ LA1. Layer Counting: konsep ------------------------------ */
const T = dariTinggi(TANGGA);
const TS = susunKubus("t", P(100, 118), T, warnaLapis);

export const ADEGAN_LUAR_A_LAPIS: AdeganStory = {
  id: "luara-lapis",
  judul: "Layer Counting: menghitung per lapisan",
  sumber: "Metode luar; contoh bangunan tangga",
  latar: "#FFF1D6",
  ketukan: [
    k(
      "Metode pertama: Layer Counting. Kita membagi susunan menjadi lapisan datar, menghitung tiap lapisan, lalu menjumlahkan semuanya.",
      tambah(0, teks("jud", 150, 22, "Layer Counting", 13, W.ungu)),
      tambah("membagi", TS.objs),
      tambah("lapisan", teks("l1", 235, 70, "lapisan bawah", 8.6, W.biru), teks("l2", 235, 90, "lapisan tengah", 8.6, W.hijau), teks("l3", 235, 110, "lapisan atas", 8.6, W.coklat)),
      tambah("menjumlahkan", teks("jm", 235, 150, "lalu dijumlahkan", 9, W.merah)),
    ),
    k(
      "Lapisan paling bawah memuat semua kubus yang menyentuh lantai. Di susunan tangga ini ada 6 kubus.",
      sorotkan("bawah", ...idDi(T, TS.ids, 0)),
      tambah("menyentuh", teks("c1", 235, 130, "bawah: 6 kubus", 11, W.biru)),
      hapus("menyentuh", "jm"),
      ubah("menyentuh", { id: "l1", sorot: true }),
    ),
    k(
      "Lapisan kedua hanya memuat kubus yang berdiri di atas lapisan pertama. Jumlahnya 3 kubus.",
      redamkan(0, ...idDi(T, TS.ids, 0), "l1"),
      sorotkan("kedua", ...idDi(T, TS.ids, 1)),
      ubah("kedua", { id: "l2", sorot: true }),
      tambah("Jumlahnya", teks("c2", 235, 146, "tengah: 3 kubus", 11, W.hijau)),
    ),
    k(
      "Lapisan ketiga tinggal 1 kubus. Jadi jumlah seluruhnya 6 tambah 3 tambah 1, yaitu 10 kubus.",
      redamkan(0, ...idDi(T, TS.ids, 1), "l2"),
      sorotkan("ketiga", ...idDi(T, TS.ids, 2)),
      ubah("ketiga", { id: "l3", sorot: true }),
      tambah("tinggal", teks("c3", 235, 162, "atas: 1 kubus", 11, W.coklat)),
      tambah("seluruhnya", teks("c4", 150, 186, "6 + 3 + 1 = 10 kubus", 14, W.biru, { garis: W.emas })),
    ),
    k(
      "Hasilnya dapat dicek dengan cara lain, yaitu menjumlahkan tinggi tiap kolom: 3, 2, 1, 2, 1, dan 1. Totalnya sama, 10.",
      bersih(0),
      tambah(0, TS.objs),
      tambah("tinggi", teks("tt", 235, 56, "tinggi tiap kolom", 8.6, W.ungu)),
      tambah("3,", teks("h1", 214, 78, "3", 14, W.merah), teks("h2", 236, 78, "2", 14, W.merah), teks("h3", 258, 78, "1", 14, W.merah)),
      tambah("2,", teks("h4", 214, 102, "2", 14, W.merah), teks("h5", 236, 102, "1", 14, W.merah)),
      tambah("1,@2", teks("h6", 214, 126, "1", 14, W.merah)),
      tambah("Totalnya", teks("tot", 235, 160, "3+2+1+2+1+1 = 10", 10, W.biru, { garis: W.emas })),
    ),
  ],
};

/* ------------------------------ LA2. Layer Counting: penerapan ------------------------------ */
const PIR = susunKubus("p", P(150, 128, 16), PIRAMIDA, warnaLapis);
const BAWAH6: Sel = [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0], [0, 2, 0], [1, 2, 0]];
const ATAS2: Sel = [[0, 0, 1], [1, 0, 1]];
const B6 = susunKubus("b", P(90, 120, 20), BAWAH6, BAHAN.oranye);
const A2 = susunKubus("a", P(90, 120, 20), ATAS2, BAHAN.kuning);

export const ADEGAN_LUAR_A_LAPIS_TERAPAN: AdeganStory = {
  id: "luara-lapis-terapan",
  judul: "Layer Counting dipakai pada soal buku",
  sumber: "Metode luar; Latihan 3.1 nomor 3 (Buku Siswa hlm. 84)",
  latar: "#FEF3C7",
  ketukan: [
    k(
      "Terapkan pada Latihan 3.1 nomor 3. Lapisan bawah ada 6 kubus, dan lapisan atas ada 2 kubus.",
      tambah(0, teks("jud", 150, 22, "Latihan 3.1, nomor 3", 12, W.ungu)),
      tambah("Lapisan", B6.objs, A2.objs),
      sorotkan("bawah", ...B6.semua),
      tambah("6", teks("n6", 245, 100, "bawah: 6", 11, W.biru)),
      redamkan("atas", ...B6.semua),
      sorotkan("atas", ...A2.semua),
      tambah("2", teks("n2", 245, 124, "atas: 2", 11, W.coklat)),
    ),
    k(
      "Jumlahkan lapisannya: 6 tambah 2 sama dengan 8 kubus. Hasil ini cocok dengan kunci jawaban dari Buku Panduan Guru.",
      redamkan(0, ...A2.semua),
      tambah("Jumlahkan", teks("s1", 245, 156, "6 + 2 = 8", 14, W.merah, { garis: W.emas })),
      tambah("kunci", emo("cek", 214, 182, "✅", 18), teks("kj", 252, 185, "kunci: 8", 9, W.hijau)),
    ),
    k(
      "Contoh baru: piramida bertingkat tiga. Lapisan bawah tersusun 3 kali 3, yaitu 9 kubus. Lapisan tengah 2 kali 2, yaitu 4 kubus. Lapisan atas 1 kubus.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "piramida tiga lapisan", 12, W.ungu)),
      tambah("piramida", PIR.objs),
      sorotkan("bawah", ...idDi(PIRAMIDA, PIR.ids, 0)),
      tambah("9", teks("p9", 250, 90, "bawah 3 x 3 = 9", 8.8, W.biru)),
      redamkan("tengah", ...idDi(PIRAMIDA, PIR.ids, 0)),
      sorotkan("tengah", ...idDi(PIRAMIDA, PIR.ids, 1)),
      tambah("4", teks("p4", 250, 112, "tengah 2 x 2 = 4", 8.8, W.hijau)),
      redamkan("atas", ...idDi(PIRAMIDA, PIR.ids, 1)),
      sorotkan("atas", ...idDi(PIRAMIDA, PIR.ids, 2)),
      tambah("1", teks("p1", 250, 134, "atas = 1", 8.8, W.coklat)),
    ),
    k(
      "Totalnya 9 tambah 4 tambah 1, yaitu 14 kubus. Aturan praktisnya: banyak kubus sama dengan jumlah luas alas tiap lapisan.",
      redamkan(0, ...idDi(PIRAMIDA, PIR.ids, 2)),
      tambah("Totalnya", teks("pt", 150, 188, "9 + 4 + 1 = 14 kubus", 14, W.biru, { garis: W.emas })),
      tambah("Aturan", teks("pa", 150, 198, "jumlahkan luas alas tiap lapisan", 8.6, W.ungu)),
    ),
    k(
      "Perpustakaan kontainer di Batu juga dapat dihitung begitu. Hitung kontainer pada tiap tingkat dari bawah, lalu jumlahkan semuanya.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "kontainer per tingkat", 12, W.ungu)),
      tambah("Perpustakaan", ...[0, 1, 2].map((r) => kotak(`kr${r}`, 70, 128 - r * 28, 160, 24, ["#BFDBFE", "#BBF7D0", "#FDE68A"][r], W.biru, { rx: 3 }))),
      tambah("tingkat", teks("k1", 150, 144, "tingkat bawah: ?", 10), teks("k2", 150, 116, "tingkat tengah: ?", 10), teks("k3", 150, 88, "tingkat atas: ?", 10)),
      tambah("jumlahkan", teks("k4", 150, 176, "jumlahkan semua tingkat", 11, W.merah)),
      tambah("semuanya.", balon("bl", 150, 160, ["bangunan nyata pun", "dihitung berlapis"], 130, "#FEF9C3")),
      hapus("semuanya.", "k4"),
    ),
  ],
};

export { warnaLapis };
