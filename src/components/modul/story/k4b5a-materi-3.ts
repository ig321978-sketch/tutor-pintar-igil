import type { AdeganStory } from "./logika-story";
import { W, bentuk, bulat, garis, judul, kartu, kotak, panah, sisiGaris, tandaSiku, teks, type NamaBangun } from "./k4b5a-gambar";
import { bersih, idx, k, tambah } from "./k4b5a-bantu";

/** Huruf titik sudut kecil berwarna merah di (x, y). */
const huruf = (id: string, x: number, y: number, isi: string) => teks(id, x, y, isi, 9, W.merah);
/** Empat tanda siku di sudut persegi panjang (x, y, w, h). */
const sikuEmpat = (id: string, x: number, y: number, w: number, h: number) => [
  tandaSiku(`${id}0`, x, y, [1, 0], [0, 1], 7),
  tandaSiku(`${id}1`, x + w, y, [-1, 0], [0, 1], 7),
  tandaSiku(`${id}2`, x + w, y + h, [-1, 0], [0, -1], 7),
  tandaSiku(`${id}3`, x, y + h, [1, 0], [0, -1], 7),
];

/* ------------------------------ 10. Aktivitas 4: jajargenjang, persegi panjang, belah ketupat, persegi (Buku Siswa hlm. 158–160; Panduan Guru hlm. 187–188) ------------------------------ */
const SUARA_J1 = "Aktivitas empat, sifat-sifat jajargenjang. Dalam kelompok, gambar jajargenjang ABCD, hitung sudut, titik sudut, dan sisinya, ukur sisinya, lalu cari sisi yang sejajar.";
const SUARA_J2 = "Hasilnya: empat sudut, empat sisi, dan dua pasang sisi sejajar, yaitu AB dengan DC, serta AD dengan BC. Kesimpulan guru: jajargenjang adalah segiempat dengan dua pasang sisi berhadapan sejajar.";
const SUARA_J3 = "Persegi panjang ABCD memiliki empat sisi dan empat sudut, dengan AB sejajar CD serta BC sejajar AD. Keempat sudutnya siku-siku. Panduan guru: persegi panjang adalah jajargenjang yang salah satu sudutnya siku-siku.";
const SUARA_J4 = "Belah ketupat ABCD juga punya empat sisi, empat sudut, dan dua pasang sisi sejajar. Keempat sisinya sama panjang. Panduan guru: belah ketupat adalah jajargenjang yang keempat sisinya sama panjang.";
const SUARA_J5 = "Persegi ABCD memiliki empat sisi sama panjang dan empat sudut siku-siku. Panduan guru: persegi adalah persegi panjang dengan empat sisi sama, sekaligus belah ketupat dengan satu sudut siku-siku.";

export const ADEGAN_SEGIEMPAT_1: AdeganStory = {
  id: "segiempat-satu",
  judul: "Aktivitas 4: jajargenjang, persegi panjang, belah ketupat, persegi",
  sumber: "Buku Siswa hlm. 158–160; Panduan Guru hlm. 187–188",
  latar: "#FDF2F8",
  kutipan: [
    "3. Segiempat",
    "a. Jajargenjang",
    "Aktivitas 4. Sifat-Sifat Jajargenjang",
    "1. Bentuk kelompok yang beranggotakan 3-4 orang.",
    "3. Hitunglah ada berapa sudut !",
    "4. Hitunglah ada berapa titik sudut !",
    "5. Hitunglah ada berapa sisi!",
    "7. Sebutkan nama sisi-sisi yang sejajar !",
    "a. Pada jajargenjang ada berapa pasang sisi yang sejajar?",
    "Jajar genjang adalah",
    "segiempat yang memiliki dua pasang sisi berhadapan sejajar.",
    "dua pasang sisi yang sejajar, yakni AB//",
    "memiliki ukuran yang sama dan",
    "merupakan sudut siku-siku.",
    "Perhatikan belah ketupat berikut.",
    "sisi-sisi AB, BC, CD, dan AD memiliki panjang yang sama.",
    "Perhatikan persegi berikut.",
    "persegipanjang adalah jajargenjang yang salah satu",
    "sudutnya siku-siku",
    "belah ketupat adalah jajargenjang yang keempat sisinya sama panjang.",
    "persegi adalah persegipanjang yang keempat sisinya sama",
  ],
  ketukan: [
    k(
      SUARA_J1,
      tambah(0, judul("Aktivitas 4: jajargenjang")),
      tambah("jajargenjang", bentuk("jg", 96, 40, "jajar", W.pink, 1.5), huruf("hA", 117, 36, "A"), huruf("hB", 192, 36, "B"), huruf("hC", 174, 108, "C"), huruf("hD", 88, 108, "D")),
      tambah("hitung", ...kartu("j1", 20, 124, 260, 26, W.hijauMuda, ["hitung sudut, titik sudut, dan sisi"], 8.6)),
      tambah("ukur", ...kartu("j2", 20, 156, 260, 26, W.langit, ["ukur sisi, cari sisi yang sejajar"], 8.6)),
    ),
    k(
      SUARA_J2,
      bersih(0),
      tambah(0, judul("Sifat jajargenjang"), bentuk("jg", 20, 40, "jajar", W.pink, 1.5), huruf("hA", 41, 36, "A"), huruf("hB", 116, 36, "B"), huruf("hC", 98, 108, "C"), huruf("hD", 12, 108, "D")),
      tambah("Hasilnya:", ...kartu("r1", 140, 38, 150, 28, W.hijauMuda, ["4 sudut, 4 sisi"], 9)),
      tambah(idx(SUARA_J2, "AB"), sisiGaris("s0", 20, 40, "jajar", 0, W.merah, 1.5), sisiGaris("s2", 20, 40, "jajar", 2, W.merah, 1.5)),
      tambah(idx(SUARA_J2, "AD"), sisiGaris("s1", 20, 40, "jajar", 1, W.hijau, 1.5), sisiGaris("s3", 20, 40, "jajar", 3, W.hijau, 1.5), ...kartu("r2", 140, 72, 150, 28, W.krem, ["2 pasang sisi sejajar"], 9)),
      tambah("Kesimpulan", ...kartu("r3", 20, 128, 260, 50, W.emas, ["jajargenjang: segiempat dengan", "2 pasang sisi berhadapan sejajar"], 9)),
    ),
    k(
      SUARA_J3,
      bersih(0),
      tambah(0, judul("Persegi panjang"), bentuk("pp", 30, 40, "perpanjang", W.langit, 1.5), huruf("pD", 22, 36, "D"), huruf("pC", 122, 36, "C"), huruf("pB", 122, 106, "B"), huruf("pA", 22, 106, "A")),
      tambah(idx(SUARA_J3, "AB"), sisiGaris("q0", 30, 40, "perpanjang", 0, W.merah, 1.5), sisiGaris("q2", 30, 40, "perpanjang", 2, W.merah, 1.5), teks("qa", 215, 64, "AB sejajar CD", 8.6, W.merah)),
      tambah(idx(SUARA_J3, "BC"), sisiGaris("q1", 30, 40, "perpanjang", 1, W.hijau, 1.5), sisiGaris("q3", 30, 40, "perpanjang", 3, W.hijau, 1.5), teks("qb", 215, 84, "BC sejajar AD", 8.6, W.hijau)),
      tambah(idx(SUARA_J3, "siku-siku."), ...sikuEmpat("qs", 30, 40, 84, 54), teks("qc", 215, 104, "4 sudut siku-siku", 8.6, W.biru)),
      tambah("Panduan", ...kartu("q5", 20, 130, 260, 50, W.emas, ["persegi panjang: jajargenjang yang", "salah satu sudutnya siku-siku"], 9)),
    ),
    k(
      SUARA_J4,
      bersih(0),
      tambah(0, judul("Belah ketupat")),
      tambah("Belah", bentuk("bk", 40, 36, "belah", W.krem, 1.6), huruf("bA", 85, 32, "A"), huruf("bB", 138, 76, "B"), huruf("bC", 85, 118, "C"), huruf("bD", 30, 76, "D")),
      tambah(idx(SUARA_J4, "sejajar"), ...kartu("b1", 176, 40, 114, 28, W.hijauMuda, ["2 pasang sisi sejajar"], 8.4)),
      tambah("Keempat", ...[0, 1, 2, 3].map((i) => sisiGaris(`bs${i}`, 40, 36, "belah", i, W.merah, 1.6)), ...kartu("b2", 176, 76, 114, 28, W.pink, ["4 sisi sama panjang"], 8.4)),
      tambah("Panduan", ...kartu("b3", 20, 140, 260, 46, W.emas, ["belah ketupat: jajargenjang yang", "keempat sisinya sama panjang"], 9)),
    ),
    k(
      SUARA_J5,
      bersih(0),
      tambah(0, judul("Persegi")),
      tambah("Persegi", bentuk("ps", 40, 40, "persegi", W.hijauMuda, 1.5), huruf("sD", 32, 36, "D"), huruf("sC", 108, 36, "C"), huruf("sB", 108, 112, "B"), huruf("sA", 32, 112, "A")),
      tambah("sama", ...[0, 1, 2, 3].map((i) => sisiGaris(`ss${i}`, 40, 40, "persegi", i, W.merah, 1.5)), ...kartu("p1", 150, 40, 140, 28, W.pink, ["4 sisi sama panjang"], 8.4)),
      tambah(idx(SUARA_J5, "siku-siku."), ...sikuEmpat("ssk", 40, 40, 60, 60), ...kartu("p2", 150, 76, 140, 28, W.langit, ["4 sudut siku-siku"], 8.4)),
      tambah(idx(SUARA_J5, "sekaligus"), ...kartu("p3", 14, 134, 272, 54, W.emas, ["persegi panjang dengan 4 sisi sama", "belah ketupat dengan 1 sudut siku-siku"], 8.6)),
    ),
  ],
};

/* ------------------------------ 11. Aktivitas 5: layang-layang, trapesium, segiempat sembarang (Buku Siswa hlm. 161–163; Panduan Guru hlm. 188–190) ------------------------------ */
const SUARA_M1 = "Aktivitas lima, sifat-sifat layang-layang. Gambar layang-layang ABCD, hitung sudut, titik sudut, dan sisinya, ukur sisinya, lalu tarik kedua diagonal sampai berpotongan di titik O.";
const SUARA_M2 = "Hasil menurut kunci panduan guru: ada dua pasang sisi berdekatan sama panjang, yaitu AD sama dengan AB, dan CB sama dengan CD. Sudut di titik O adalah sembilan puluh derajat, dan OB sama panjang dengan OD.";
const SUARA_M3 = "Trapesium ABCD punya empat sisi, empat sudut, dan tepat sepasang sisi sejajar, yaitu AB sejajar CD. Panduan guru menekankan kata tepat: trapesium adalah segiempat yang memiliki tepat sepasang sisi sejajar.";
const SUARA_M4 = "Segiempat sembarang ABCD punya empat sisi, empat sudut, dan tidak ada sisi yang sama panjang. Panduan guru menambahkan: atau keempat sudutnya tidak ada yang sama besar.";
const LX = 116;
const LY = 34;
const diagonalLayang = [garis("dAC", LX + 36, LY, 0, 90, W.hitam, 1.6, { putus: true }), garis("dBD", LX + 6, LY + 36, 60, 0, W.hitam, 1.6, { putus: true })];

export const ADEGAN_SEGIEMPAT_2: AdeganStory = {
  id: "segiempat-dua",
  judul: "Aktivitas 5: layang-layang, trapesium, segiempat sembarang",
  sumber: "Buku Siswa hlm. 161–163; Panduan Guru hlm. 188–190",
  latar: "#F5F3FF",
  kutipan: [
    "f. Layang-layang",
    "Aktivitas 5. Sifat-sifat Layang-layang",
    "2. Buatlah gambar jajargenjang pada selembar kertas seperti gambar",
    "7. Tarik garis pada kedua diagonal layang-layang sampai berpotongan di titik",
    "O.",
    "8. Ukur sudut hasil perpotongan kedua diagonal tersebut.",
    "9. Ukur panjang OB dan OD.",
    "a. Berapa pasang sisi yang berdekatan sama panjang? Tuliskan.",
    "Jawab : dua pasang, yaitu AD=AB ; CB=CD",
    "Jawab : 90o (siku-siku)",
    "c. Apakah panjang OB dan OD sama?",
    "Jawab : ya",
    "layang-layang adalah segiempat yang memiliki dua pasang sisi",
    "Perhatikan trapesium berikut.",
    "tepat dua sisi yang sejajar atau tepat sepasang sisi",
    "sejajar, yakni AB//CD.",
    "ciri pokok trapesium",
    "adalah memiliki tepat sepasang sisi sejajar",
    "trapesium adalah segiempat yang memiliki tepat sepasang sisi sejajar.",
    "Perhatikan segiempat sembarang berikut.",
    "tidak terdapat pasangan sisi yang sama panjang.",
    "sisinya tidak ada yang sama panjang atau keempat sudutnya tidak ada yang",
    "sama besar",
  ],
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Aktivitas 5: layang-layang")),
      tambah(idx(SUARA_M1, "layang-layang", 2), bentuk("ly", LX, LY, "layang", W.krem, 1.5), huruf("lA", LX + 36, LY - 4, "A"), huruf("lB", LX + 74, LY + 40, "B"), huruf("lC", LX + 36, LY + 102, "C"), huruf("lD", LX + 0, LY + 40, "D")),
      tambah("hitung", ...kartu("m1", 4, 56, 100, 40, W.hijauMuda, ["hitung sudut,", "titik sudut, sisi"], 8.2)),
      tambah("ukur", ...kartu("m2", 196, 56, 100, 40, W.langit, ["ukur panjang", "tiap sisi"], 8.2)),
      tambah("tarik", ...diagonalLayang),
      tambah(idx(SUARA_M1, "O."), bulat("lO", LX + 36, LY + 36, 3.2, W.merah, W.putih, { tebal: 1 }), huruf("lt", LX + 46, LY + 32, "O")),
    ),
    k(
      SUARA_M2,
      tambah(idx(SUARA_M2, "AD"), sisiGaris("e0", LX, LY, "layang", 0, W.merah, 1.5), sisiGaris("e3", LX, LY, "layang", 3, W.merah, 1.5), teks("ea", 52, 160, "AD = AB", 9, W.merah)),
      tambah(idx(SUARA_M2, "CB"), sisiGaris("e1", LX, LY, "layang", 1, W.hijau, 1.5), sisiGaris("e2", LX, LY, "layang", 2, W.hijau, 1.5), teks("eb", 150, 160, "CB = CD", 9, W.hijau)),
      tambah(idx(SUARA_M2, "sembilan"), tandaSiku("eS", LX + 36, LY + 36, [0, -1], [1, 0], 8, W.merah), teks("e9", 172, 62, "90°", 9, W.merah)),
      tambah(idx(SUARA_M2, "OB"), teks("eo", 246, 160, "OB = OD", 9, W.biru)),
    ),
    k(
      SUARA_M3,
      bersih(0),
      tambah(0, judul("Trapesium")),
      tambah("Trapesium", bentuk("tr", 30, 40, "trapesium", W.langit, 1.6), huruf("tD", 46, 36, "D"), huruf("tC", 100, 36, "C"), huruf("tB", 128, 104, "B"), huruf("tA", 22, 104, "A")),
      tambah("tepat", ...kartu("t1", 170, 40, 120, 28, W.hijauMuda, ["tepat 1 pasang sejajar"], 8.4)),
      tambah(idx(SUARA_M3, "AB"), sisiGaris("tl0", 30, 40, "trapesium", 0, W.merah, 1.6), sisiGaris("tl2", 30, 40, "trapesium", 2, W.merah, 1.6), teks("tt", 232, 90, "AB sejajar CD", 8.6, W.merah)),
      tambah("Panduan", ...kartu("t2", 14, 132, 272, 50, W.emas, ["trapesium: segiempat dengan", "tepat sepasang sisi sejajar"], 9)),
    ),
    k(
      SUARA_M4,
      bersih(0),
      tambah(0, judul("Segiempat sembarang")),
      tambah("Segiempat", bentuk("sg", 28, 36, "segiempat", W.pink, 1.6), huruf("gA", 60, 32, "A"), huruf("gB", 130, 56, "B"), huruf("gC", 108, 118, "C"), huruf("gD", 20, 86, "D")),
      tambah("tidak", ...[0, 1, 2, 3].map((i) => sisiGaris(`gs${i}`, 28, 36, "segiempat", i, [W.merah, W.hijau, W.ungu, W.coklat][i], 1.6)), ...kartu("g1", 164, 44, 126, 40, W.merahMuda, ["tidak ada sisi", "yang sama panjang"], 8.4)),
      tambah("Panduan", ...kartu("g2", 14, 140, 272, 44, W.emas, ["atau 4 sudutnya tidak ada", "yang sama besar"], 9)),
    ),
  ],
};

/* ------------------------------ 12. Hubungan antar bangun datar (Buku Siswa hlm. 163–164; Panduan Guru hlm. 190–192) ------------------------------ */
/** Tujuh segiempat pada tabel hubungan (urutan kolom) dan enam ciri (urutan baris). Nilai diperiksa uji dari titik sudut bangun. */
export const KOLOM_SEGIEMPAT: NamaBangun[] = ["jajar", "perpanjang", "belah", "persegi", "layang", "trapesium", "segiempat"];
export const CIRI_SEGIEMPAT = ["4 sisi sama panjang", "4 sudut siku-siku", "2 pasang sisi sejajar", "1 pasang sisi sejajar", "diagonal tegak lurus", "2 pasang dekat sama"];
export const NILAI_CIRI: boolean[][] = [
  [false, false, true, true, false, false, false],
  [false, true, false, true, false, false, false],
  [true, true, true, true, false, false, false],
  [false, false, false, false, false, true, false],
  [false, false, true, true, true, false, false],
  [false, false, true, true, true, false, false],
];
const MX = 4;
const MY = 30;
const LW = 92;
const CW = 28;
const HH = 32;
const RH = 17;
const matriks = (): { kepala: ReturnType<typeof kotak>[]; baris: ReturnType<typeof kotak>[][] } => ({
  kepala: [kotak("mh", MX, MY, LW, HH, W.krem, W.biru, { rx: 0, tebal: 1 }), ...KOLOM_SEGIEMPAT.map((n, c) => kotak(`mk${c}`, MX + LW + c * CW, MY, CW, HH, W.krem, W.biru, { rx: 0, tebal: 1 }))],
  baris: CIRI_SEGIEMPAT.map((n, r) => [kotak(`ml${r}`, MX, MY + HH + r * RH, LW, RH, W.langit, W.biru, { rx: 0, tebal: 1 }), ...KOLOM_SEGIEMPAT.map((_, c) => kotak(`mc${r}-${c}`, MX + LW + c * CW, MY + HH + r * RH, CW, RH, W.putih, W.biru, { rx: 0, tebal: 1 }))]),
});
const SKALA_KOLOM: Record<string, number> = { jajar: 0.4, perpanjang: 0.4, belah: 0.42, persegi: 0.42, layang: 0.36, trapesium: 0.4, segiempat: 0.38 };
const bentukKolom = (c: number) => {
  const n = KOLOM_SEGIEMPAT[c];
  const s = SKALA_KOLOM[n];
  return bentuk(`mb${c}`, MX + LW + c * CW + 3, MY + 6, n, [W.pink, W.langit, W.krem, W.hijauMuda, W.jingga, W.lavender, W.merahMuda][c], s, { tebal: 1 });
};

const SUARA_N1 = "Buku membandingkan tujuh segiempat dalam satu tabel: jajargenjang, persegi panjang, belah ketupat, persegi, layang-layang, trapesium, dan segiempat sembarang. Barisnya ciri-ciri, seperti sisi sama panjang dan sisi sejajar.";
const SUARA_N2 = "Dari tabel, buku menyimpulkan: persegi panjang pasti merupakan jajargenjang. Persegi merupakan persegi panjang. Belah ketupat merupakan layang-layang, dan belah ketupat adalah jajargenjang yang sisi-sisinya sama panjang.";
const SUARA_N3 = "Belah ketupat dapat disebut layang-layang karena semua ciri layang-layang ada pada belah ketupat. Sebaliknya, layang-layang tidak dapat disebut belah ketupat, sebab tidak semua sisinya sama panjang.";
const SUARA_N4 = "Hubungannya seperti kotak dalam kotak. Persegi termasuk persegi panjang, dan persegi panjang termasuk jajargenjang. Persegi juga termasuk belah ketupat, dan belah ketupat termasuk layang-layang.";

export const ADEGAN_HUBUNGAN: AdeganStory = {
  id: "hubungan-bangun",
  judul: "Hubungan antar bangun datar segiempat",
  sumber: "Buku Siswa hlm. 163–164; Panduan Guru hlm. 190–192",
  latar: "#EFF6FF",
  kutipan: [
    "g. Hubungan Bangun Datar",
    "Jika telah memperhatikan ciri-ciri setiap bangun datar segiempat, dapat dibuat",
    "perbandingan sifat-sifat bangun datar dalam bentuk tabel sebagai berikut :",
    "Memiliki 4 sisi",
    "Keempat",
    "sisinya memilki",
    "Memiliki 2 pasang sisi berdekatan sama panjang",
    "Berdasarkan tabel di atas, kalian dapat menentukan hubungan setiap dua",
    "bangun datar segiempat.",
    "1. Persegi panjang pasti merupakan Jajargenjang.",
    "2. Persegi panjang dapat juga disebut Jajargenjang.",
    "4. Belah ketupat merupakan layang-layang",
    "5. Persegi merupakan persegi panjang",
    "6. Belah ketupat merupakan jajargenjang yang sisi-sisinya sama panjang.",
    "Belah ketupat dapat dikatakan sebagai bangun layang-layang; karena",
    "semua ciri pada layang-layang ada pada belah ketupat.",
    "Sebaliknya layang-",
    "layang tidak dapat dikatakan sebagai belah ketupat",
    "“semua",
    "sisi berdekatan sama panjang”",
    "Carilah pasangan bangun lainnya yang",
  ],
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Tabel hubungan segiempat")),
      tambah("tabel:", matriks().kepala, ...KOLOM_SEGIEMPAT.map((_, c) => bentukKolom(c))),
      tambah("Barisnya", ...matriks().baris.flat()),
      tambah("sama", ...CIRI_SEGIEMPAT.map((n, r) => teks(`mt${r}`, MX + LW / 2, MY + HH + r * RH + 12, n, 6.6, W.biru))),
      tambah("sejajar.", ...NILAI_CIRI.flatMap((baris, r) => baris.map((v, c) => teks(`mv${r}-${c}`, MX + LW + c * CW + CW / 2, MY + HH + r * RH + 12.5, v ? "✓" : "–", 9, v ? W.hijau : W.merah)))),
    ),
    k(
      SUARA_N2,
      bersih(0),
      tambah(0, judul("Kesimpulan tabel")),
      tambah("persegi@1", ...kartu("n1", 10, 32, 280, 30, W.hijauMuda, ["persegi panjang pasti jajargenjang"], 9)),
      tambah(idx(SUARA_N2, "persegi", 2), ...kartu("n2", 10, 68, 280, 30, W.langit, ["persegi merupakan persegi panjang"], 9)),
      tambah(idx(SUARA_N2, "Belah"), ...kartu("n3", 10, 104, 280, 30, W.krem, ["belah ketupat merupakan layang-layang"], 9)),
      tambah("jajargenjang@2", ...kartu("n4", 10, 140, 280, 44, W.pink, ["belah ketupat: jajargenjang yang", "sisi-sisinya sama panjang"], 9)),
    ),
    k(
      SUARA_N3,
      bersih(0),
      tambah(0, judul("Belah ketupat dan layang-layang")),
      tambah(idx(SUARA_N3, "Belah"), bentuk("zb", 24, 44, "belah", W.krem, 1.1), bentuk("zl", 226, 38, "layang", W.hijauMuda, 1)),
      tambah("semua", panah("z1", 94, 66, 120, 0, W.hijau, 2.4), teks("z1t", 154, 56, "boleh", 9.4, W.hijau)),
      tambah("Sebaliknya,", panah("z2", 214, 96, -120, 0, W.merah, 2.4), teks("z2t", 154, 112, "tidak boleh", 9.4, W.merah)),
      tambah("sisinya", ...kartu("z3", 14, 130, 272, 50, W.emas, ["layang-layang tidak punya ciri", "semua sisi berdekatan sama panjang"], 8.6)),
    ),
    k(
      SUARA_N4,
      bersih(0),
      tambah(0, judul("Kotak dalam kotak")),
      tambah("Persegi", ...kartu("y1", 6, 34, 84, 26, W.hijauMuda, ["persegi"], 8.6), panah("y1a", 92, 47, 14, 0, W.biru, 1.6), ...kartu("y2", 108, 34, 84, 26, W.langit, ["persegi panjang"], 8.2), panah("y2a", 194, 47, 14, 0, W.biru, 1.6), ...kartu("y3", 210, 34, 84, 26, W.pink, ["jajargenjang"], 8.2)),
      tambah(idx(SUARA_N4, "belah"), ...kartu("y4", 6, 90, 84, 26, W.hijauMuda, ["persegi"], 8.6), panah("y4a", 92, 103, 14, 0, W.biru, 1.6), ...kartu("y5", 108, 90, 84, 26, W.krem, ["belah ketupat"], 8.2)),
      tambah("layang-layang.", panah("y5a", 194, 103, 14, 0, W.biru, 1.6), ...kartu("y6", 210, 90, 84, 26, W.jingga, ["layang-layang"], 8.2)),
      tambah("Hubungannya", teks("yk", 150, 150, "termasuk berarti punya semua ciri", 8.6, W.coklat)),
    ),
  ],
};

/* ------------------------------ 13. Ayo Berpikir (Buku Siswa hlm. 165; Panduan Guru hlm. 192) ------------------------------ */
const SUARA_Y1 = "Ayo Berpikir satu: bolehkah belah ketupat disebut juga layang-layang? Kunci panduan guru: boleh, sebab semua ciri layang-layang ada pada belah ketupat.";
const SUARA_Y2 = "Nomor dua: mengapa trapesium tidak boleh disebut jajargenjang? Karena jajargenjang punya dua pasang sisi berhadapan sejajar, sedangkan trapesium hanya tepat sepasang.";
const SUARA_Y3 = "Nomor empat: mengapa jajargenjang tidak boleh disebut layang-layang? Karena ada ciri layang-layang yang tidak dimiliki jajargenjang, yaitu diagonal yang berpotongan tegak lurus.";
const SUARA_Y4 = "Nomor tiga: apakah diagonal berpotongan tegak lurus dimiliki trapesium? Kunci buku: tidak. Catatan guru: itu tidak berlaku untuk semua trapesium. Trapesium sama kaki dengan alas empat, atas dua, dan tinggi tiga punya diagonal tegak lurus.";

export const ADEGAN_BERPIKIR: AdeganStory = {
  id: "ayo-berpikir",
  judul: "Ayo Berpikir: boleh atau tidak?",
  sumber: "Buku Siswa hlm. 165; Panduan Guru hlm. 192",
  latar: "#FFF7ED",
  kutipan: [
    "Ayo Berpikir",
    "1. Bolehkah belah ketupat disebut juga sebagai layang-layang? Jelaskan!",
    "2. Mengapa trapesium tidak boleh disebut sebagai jajargenjang? Jelaskan!",
    "3. Perhatikan kalimat berikut: “Diagonal-diagonalnya berpotongan tegak",
    "lurus”. Apakah ciri-ciri tersebut dimiliki oleh trapesium? Jelaskan!",
    "4. Mengapa jajargenjang tidak boleh disebut layang-layang? Jelaskan!",
    "Guru dapat melatih berpikir kritis peserta didik dengan mengajukan pertanyaan",
    "(Jawab: boleh; sebab semua ciri pada layang-layang ada pada belah ketupat)",
    "(Jawab: karena ada ciri pada jajargenjang yang tidak dimiliki trapesium",
    "yaitu “sisi-sisi yang berhadapan sejajar).",
    "(Jawab: tidak; karena pada trapesium diagonal-diagonalnya berpotongan",
    "tetapi tidak tegak lurus).",
    "(Jawab: karena ada ciri layang-layang yang tidak dimiliki jajargenjang yakni",
    "“diagonal-diagonalnya berpotongan tegak lurus”.",
  ],
  ketukan: [
    k(
      SUARA_Y1,
      tambah(0, judul("Ayo Berpikir 1")),
      tambah("belah", bentuk("ya", 24, 50, "belah", W.krem, 1.2), teks("yat", 58, 120, "belah ketupat", 8.6, W.biru)),
      tambah(idx(SUARA_Y1, "layang-layang"), bentuk("yb", 232, 44, "layang", W.hijauMuda, 1), teks("ybt", 254, 120, "layang-layang", 8.6, W.biru)),
      tambah("boleh,", panah("yp", 100, 80, 120, 0, W.hijau, 2.4), teks("ypt", 160, 70, "boleh", 9.4, W.hijau)),
      tambah("sebab", ...kartu("yk", 14, 136, 272, 50, W.emas, ["semua ciri layang-layang", "ada pada belah ketupat"], 9)),
    ),
    k(
      SUARA_Y2,
      bersih(0),
      tambah(0, judul("Ayo Berpikir 2")),
      tambah("trapesium", bentuk("t", 20, 54, "trapesium", W.langit, 1.4)),
      tambah(idx(SUARA_Y2, "jajargenjang"), bentuk("j", 176, 54, "jajar", W.pink, 1.4)),
      tambah(idx(SUARA_Y2, "dua", 2), sisiGaris("j0", 176, 54, "jajar", 0, W.merah, 1.4), sisiGaris("j2", 176, 54, "jajar", 2, W.merah, 1.4), sisiGaris("j1", 176, 54, "jajar", 1, W.hijau, 1.4), sisiGaris("j3", 176, 54, "jajar", 3, W.hijau, 1.4), teks("jt", 218, 118, "2 pasang sejajar", 7.6, W.biru)),
      tambah("sepasang.", sisiGaris("t0", 20, 54, "trapesium", 0, W.merah, 1.4), sisiGaris("t2", 20, 54, "trapesium", 2, W.merah, 1.4), teks("tt", 60, 118, "1 pasang sejajar", 7.6, W.biru)),
      tambah("hanya", ...kartu("yk", 40, 140, 220, 30, W.emas, ["trapesium bukan jajargenjang"], 9)),
    ),
    k(
      SUARA_Y3,
      bersih(0),
      tambah(0, judul("Ayo Berpikir 4")),
      tambah("jajargenjang", bentuk("j", 20, 50, "jajar", W.pink, 1.3), teks("jn", 59, 126, "jajargenjang", 8.6, W.biru)),
      tambah(idx(SUARA_Y3, "layang-layang", 2), bentuk("l", 200, 40, "layang", W.hijauMuda, 1), teks("ln", 224, 126, "layang-layang", 8.6, W.biru)),
      tambah("diagonal", garis("jd1", 38.2, 50, 41.6, 46.8, W.hitam, 1.6, { putus: true }), garis("jd2", 98, 50, -78, 46.8, W.hitam, 1.6, { putus: true }), garis("ld1", 224, 40, 0, 60, W.hitam, 1.6, { putus: true }), garis("ld2", 244, 64, -40, 0, W.hitam, 1.6, { putus: true })),
      tambah("tegak", tandaSiku("lx", 224, 64, [0, -1], [1, 0], 6, W.merah), teks("jx", 59, 146, "bukan tegak lurus", 8.2, W.merah), teks("lx2", 224, 146, "tegak lurus", 8.2, W.hijau)),
    ),
    k(
      SUARA_Y4,
      bersih(0),
      tambah(0, judul("Ayo Berpikir 3")),
      tambah("trapesium?", bentuk("c", 30, 44, "trapesium-sama-kaki", W.langit, 1.1)),
      tambah("tidak.", ...kartu("yk", 176, 40, 114, 40, W.merahMuda, ["kunci buku:", "tidak tegak lurus"], 8.4)),
      tambah(idx(SUARA_Y4, "alas"), teks("ca", 83, 140, "alas 4", 9, W.biru), teks("cb", 83, 40, "atas 2", 9, W.biru), teks("cc", 152, 90, "tinggi 3", 9, W.biru)),
      tambah(idx(SUARA_Y4, "diagonal", 2), garis("cd1", 30, 123, 79, -79, W.hitam, 1.6, { putus: true }), garis("cd2", 135.6, 123, -79, -79, W.hitam, 1.6, { putus: true }), tandaSiku("cx", 82.8, 70.4, [0.707, -0.707], [-0.707, -0.707], 7, W.merah)),
      tambah("Catatan", ...kartu("cg", 176, 100, 114, 56, W.hijauMuda, ["contoh ini:", "diagonalnya", "tegak lurus"], 8.4)),
    ),
  ],
};

/* ------------------------------ 14. Ayo Berlatih, miskonsepsi, diferensiasi, refleksi (Buku Siswa hlm. 165 dan 176; Panduan Guru hlm. 192–194) ------------------------------ */
export const KUNCI_KALIMAT = [
  ["a", "2 sisi sama panjang", "sama kaki"],
  ["b", "1 sudut siku-siku", "siku-siku"],
  ["c", "3 sisi tidak ada yang sama", "sembarang"],
  ["d", "1 sudut tumpul", "tumpul"],
  ["e", "3 sudut lancip", "lancip"],
  ["f", "2 pasang sisi sejajar", "jajargenjang"],
  ["g", "tepat sepasang sisi sejajar", "trapesium"],
];
const SUARA_Z1 = "Ayo Berlatih nomor satu meminta melengkapi tujuh kalimat. Kuncinya: sama kaki, siku-siku, sembarang, tumpul, lancip, jajargenjang, dan trapesium.";
const SUARA_Z2 = "Nomor dua: ciri jajargenjang menurut kunci: empat sisi, empat sudut, sisi berhadapan sejajar dan sama panjang, sudut berhadapan sama besar, diagonal saling membagi.";
const SUARA_Z3 = "Kunci nomor tiga menulis trapesium memiliki tepat sepasang sisi sama panjang. Itu keliru. Yang benar, tepat sepasang sisi sejajar, sebab trapesium bisa saja tidak punya dua sisi sama panjang.";
const SUARA_Z4 = "Nomor empat dan lima: jajargenjang A dan trapesium B. Persamaannya, keduanya punya empat sisi dan empat sudut. Bedanya, di A sisi berhadapan sama panjang dan sudut berhadapan sama besar, di B tidak.";
const SUARA_Z5 = "Miskonsepsi pertama: lupa kata tepat pada trapesium. Kedua: enggan menerima persegi sebagai belah ketupat. Panduan guru juga menulis persegi merupakan trapesium, padahal persegi punya dua pasang sisi sejajar.";
const SUARA_Z6 = "Diferensiasi: temukan ciri lain tiap bangun dan selidiki apakah hubungan bangun tetap berlaku. Refleksi di buku: masih ingat, adakah bagian yang sulit, dan apa manfaat belajar bangun datar?";
const CIRI_JAJAR = ["4 sisi dan 4 sudut", "sisi berhadapan sejajar", "sisi berhadapan sama panjang", "sudut berhadapan sama besar", "diagonal saling membagi"];

export const ADEGAN_BERLATIH_CIRI: AdeganStory = {
  id: "berlatih-ciri",
  judul: "Ayo Berlatih ciri bangun, miskonsepsi, dan refleksi",
  sumber: "Buku Siswa hlm. 165 dan 176; Panduan Guru hlm. 192–194",
  latar: "#FEFCE8",
  kutipan: [
    "Ayo Berlatih",
    "1. Lengkapi kalimat berikut sehingga menjadi kalimat yang benar!",
    "a. Segitiga yang memiliki 2 sisi sama panjang dinamakan segitiga ….",
    "g. Segiempat yang tepat memiliki sepasang sisi sejajar dinamakan ….",
    "2. Sebutkan ciri-ciri dari jajargenjang !",
    "3. Sebutkan ciri-ciri dari trapesium?",
    "Sebutkan persamaan ciri-ciri yang dimiliki oleh kedua bangun tersebut !",
    "5. Sebutkan perbedaan ciri-ciri yang dimiliki oleh bangun A dan bangun B !",
    "a. Segitiga yang memiliki 2 sisi sama panjang dinamakan segitiga sama",
    "kaki.",
    "• Diagonal-diagonalnya merupakan garis bagi satu sama lain.",
    "• Sisi-sisi berhadapan sama Panjang.",
    "• Sudut-sudut berhadapan sama besar.",
    "• Memiliki tepat sepasang sisi sama Panjang.",
    "Bangun A sisi yang berhadapan sama panjang, sedangkan bangun B",
    "Miskonsepsi",
    "Kesalahan konsep yang mungkin terjadi pada peserta didik antara lain:",
    "kata “tepat”",
    "dimiliki belah ketupat, dimiliki oleh persegi; tetapi masih enggan untuk",
    "Diferensiasi",
    "Temukan ciri-ciri lain yang belum pernah dibahas untuk masing-masing",
    "Refleksi",
    "Apakah kalian masih ingat?",
    "Masih adakah bagian yang terasa sulit?",
    "Apakah manfaat yang kalian peroleh",
    "persegi merupakan trapesium yang semua sisi berdekatan sama",
  ],
  ketukan: [
    k(
      SUARA_Z1,
      tambah(0, judul("Ayo Berlatih 1")),
      ...KUNCI_KALIMAT.map((r, i) => tambah([idx(SUARA_Z1, "sama"), idx(SUARA_Z1, "siku-siku"), idx(SUARA_Z1, "sembarang"), idx(SUARA_Z1, "tumpul"), idx(SUARA_Z1, "lancip"), idx(SUARA_Z1, "jajargenjang"), idx(SUARA_Z1, "trapesium")][i], ...kartu(`z${i}`, 10, 28 + i * 23, 280, 20, [W.hijauMuda, W.langit][i % 2], [`${r[0]}. ${r[1]} → ${r[2]}`], 7.8))),
    ),
    k(
      SUARA_Z2,
      bersih(0),
      tambah(0, judul("Ciri jajargenjang menurut kunci")),
      ...CIRI_JAJAR.map((c, i) => tambah([idx(SUARA_Z2, "empat"), idx(SUARA_Z2, "sejajar"), idx(SUARA_Z2, "panjang,"), idx(SUARA_Z2, "sudut", 2), idx(SUARA_Z2, "diagonal")][i], ...kartu(`ci${i}`, 14, 32 + i * 30, 272, 26, [W.hijauMuda, W.langit, W.krem, W.pink, W.jingga][i], [`• ${c}`], 8.8))),
    ),
    k(
      SUARA_Z3,
      bersih(0),
      tambah(0, judul("Kunci nomor 3 keliru")),
      tambah("trapesium", bentuk("kt", 20, 54, "trapesium-siku", W.langit, 1.6), teks("ktn", 65, 124, "trapesium", 8.6, W.biru)),
      tambah("keliru.", ...kartu("kb", 150, 44, 140, 40, W.merahMuda, ["kunci: sisi sama panjang", "✗"], 8.2)),
      tambah("sejajar,", sisiGaris("ks0", 20, 54, "trapesium-siku", 0, W.hijau, 1.6), sisiGaris("ks2", 20, 54, "trapesium-siku", 2, W.hijau, 1.6), ...kartu("kc", 150, 92, 140, 40, W.hijauMuda, ["yang benar: sisi sejajar", "✓"], 8.2)),
      tambah("tidak", teks("kd", 150, 160, "kaki kiri dan kaki kanan tidak sama panjang", 8.2, W.coklat)),
    ),
    k(
      SUARA_Z4,
      bersih(0),
      tambah(0, judul("Ayo Berlatih 4 dan 5")),
      tambah("jajargenjang", bentuk("za", 28, 40, "jajar", W.pink, 1.1), teks("zat", 61, 100, "A", 10, W.biru)),
      tambah("trapesium", bentuk("zb", 190, 40, "trapesium", W.langit, 1.1), teks("zbt", 220, 100, "B", 10, W.biru)),
      tambah("Persamaannya,", ...kartu("zp", 14, 112, 272, 30, W.hijauMuda, ["sama: 4 sisi dan 4 sudut"], 8.6)),
      tambah("Bedanya,", ...kartu("zq", 14, 148, 272, 38, W.krem, ["beda: di A sisi dan sudut berhadapan", "sama, di B tidak"], 8.2)),
    ),
    k(
      SUARA_Z5,
      bersih(0),
      tambah(0, judul("Miskonsepsi")),
      tambah("pertama:", ...kartu("mp", 14, 32, 272, 36, W.merahMuda, ["1. lupa kata tepat pada trapesium"], 8.6)),
      tambah("kedua:", ...kartu("mq", 14, 76, 272, 36, W.langit, ["2. enggan menerima persegi sebagai belah ketupat"], 8.2)),
      tambah("menulis", ...kartu("mr", 14, 120, 272, 38, W.krem, ["panduan guru: persegi trapesium?", "persegi punya 2 pasang sejajar"], 8.2)),
    ),
    k(
      SUARA_Z6,
      bersih(0),
      tambah(0, judul("Diferensiasi dan refleksi")),
      tambah("temukan", ...kartu("df1", 14, 32, 272, 30, W.hijauMuda, ["cari ciri lain tiap bangun"], 8.6)),
      tambah("selidiki", ...kartu("df2", 14, 68, 272, 30, W.langit, ["uji: apakah hubungan bangun tetap berlaku?"], 8.6)),
      tambah("masih", ...kartu("rf1", 14, 112, 272, 30, W.krem, ["refleksi: apakah kalian masih ingat?"], 8.6)),
      tambah("sulit,", ...kartu("rf2", 14, 148, 272, 30, W.pink, ["bagian yang sulit: diskusikan dengan teman"], 8.6)),
      tambah("manfaat", teks("rf3", 150, 196, "manfaat belajar bangun datar?", 8.6, W.coklat)),
    ),
  ],
};
