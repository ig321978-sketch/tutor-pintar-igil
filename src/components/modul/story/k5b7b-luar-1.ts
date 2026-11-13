import type { AdeganStory, Obj } from "./logika-story";
import { W, bangun, emo, kartu, kartuMetode, kotak, panah, rumusBangun, tanda, teks } from "./k5b7b-gambar";
import type { JenisBangun } from "./k5b7b-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k5b7b-bantu";

/* ------------------------------ LB0. Empat metode luar Sub-Bab B ------------------------------ */
export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luarb-pembuka",
  judul: "Empat metode luar untuk membandingkan segi empat",
  sumber: "Metode luar; empat cara membandingkan segi empat",
  latar: "#EEF2FF",
  ketukan: [
    k(
      "Video ini membahas metode luar untuk membandingkan segi empat. Metode ini membantu kita memilih definisi, menyusun tingkatan, membuat tabel perbandingan, dan menguji diagonal.",
      tambah(0, teks("jud", 150, 26, "Segi empat: metode luar", 12, W.ungu)),
      tambah(14, emo("e1", 50, 100, "📖", 36), teks("t1", 50, 124, "pilih definisi", 8.6, W.merah)),
      tambah(16, emo("e2", 120, 100, "🌳", 36), teks("t2", 120, 124, "susun tingkatan", 8.6)),
      tambah(18, emo("e3", 190, 100, "📊", 36), teks("t3", 190, 124, "tabel ciri", 8.6, W.hijau)),
      tambah(22, emo("e4", 255, 100, "🔍", 36), teks("t4", 255, 124, "uji diagonal", 8.6, W.ungu)),
    ),
    k(
      "Ada empat metode luar. Pertama, Inclusive Trapezoid Definition, yaitu memilih pengertian trapesium yang mencakup bangun dengan dua pasang sisi sejajar.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Empat metode luar", 12, W.ungu)),
      tambah(4, kartuMetode("m1", 10, 30, "#FDE68A", ["Inclusive Trapezoid", "Definition"], "pengertian inklusif")),
    ),
    k(
      "Kedua, Inclusive Quadrilateral Hierarchy, yaitu hierarki Van Hiele, menyusun segi empat sebagai tingkatan: bangun khusus memiliki semua ciri bangun umum.",
      tambah(2, kartuMetode("m2", 156, 30, "#FBCFE8", ["Inclusive Quadrilateral", "Hierarchy (Van Hiele)"], "tingkatan golongan")),
    ),
    k(
      "Ketiga, Property Comparison Matrix, yaitu tabel perbandingan ciri. Keempat, Diagonal Property Test, yaitu menguji bangun lewat diagonalnya.",
      tambah(2, kartuMetode("m3", 10, 112, "#BBF7D0", ["Property Comparison", "Matrix"], "tabel ciri")),
      tambah(10, kartuMetode("m4", 156, 112, "#BFDBFE", ["Diagonal Property", "Test"], "uji diagonal")),
    ),
  ],
};

/* ------------------------------ LB1. Inclusive Trapezoid Definition: konsep ------------------------------ */
export const ADEGAN_LUAR_TRAPESIUM: AdeganStory = {
  id: "luarb-trapesium",
  judul: "Inclusive Trapezoid Definition: setidaknya sepasang sisi sejajar",
  sumber: "Metode luar; definisi inklusif dan eksklusif trapesium",
  latar: "#FFF4DD",
  ketukan: [
    k(
      "Inclusive Trapezoid Definition artinya trapesium didefinisikan secara inklusif: segi empat dengan setidaknya sepasang sisi sejajar. Bangun dengan dua pasang sisi sejajar ikut termasuk.",
      tambah(0, teks("jud", 150, 22, "Inclusive Trapezoid Definition", 11, W.ungu)),
      tambah(12, kartu("i1", 60, 36, 180, 36, W.hijauMuda, ["setidaknya sepasang", "sisi sejajar"], 8.8)),
      tambah(12, bangun("i2", "sembarang", 80, 118, 20, W.putih), teks("i2t", 80, 156, "1 pasang sejajar", 8.4, W.biru)),
      tambah(17, bangun("i3", "jajar", 220, 118, 20, W.putih), teks("i3t", 220, 156, "2 pasang sejajar", 8.4, W.biru)),
      tambah(22, tanda("i4", 80, 182, true, 16), tanda("i5", 220, 182, true, 16)),
    ),
    k(
      "Lawannya adalah definisi eksklusif: tepat sepasang sisi sejajar. Pada definisi ini jajargenjang tidak termasuk trapesium, karena ia punya dua pasang sisi sejajar.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Definisi eksklusif", 12.5, W.ungu)),
      tambah(4, kartu("x1", 60, 36, 180, 36, W.merahMuda, ["tepat sepasang", "sisi sejajar"], 8.8)),
      tambah(4, bangun("x2", "sembarang", 80, 118, 20, W.putih), teks("x2t", 80, 156, "1 pasang sejajar", 8.4, W.biru), tanda("x4", 80, 182, true, 16)),
      tambah(11, bangun("x3", "jajar", 220, 118, 20, W.putih), teks("x3t", 220, 156, "2 pasang sejajar", 8.4, W.biru), tanda("x5", 220, 182, false, 16)),
    ),
    k(
      "Cara memakainya: hitung dulu berapa pasang sisi yang sejajar. Satu pasang atau lebih berarti trapesium menurut definisi inklusif.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Cara memakai", 12.5, W.ungu)),
      tambah(2, kartu("c1", 20, 36, 260, 32, W.krem, ["1. hitung pasangan sisi sejajar"], 9)),
      tambah(9, kartu("c2", 20, 78, 260, 32, W.muda, ["2. ada 1 pasang atau lebih?"], 9)),
      tambah(13, kartu("c3", 20, 120, 260, 32, W.hijauMuda, ["3. ya: termasuk trapesium"], 9)),
    ),
    k(
      "Buku ini memilih definisi inklusif, supaya hubungan antarbangun lebih rapi dan wawasan lebih luas.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Pilihan buku", 12.5, W.ungu)),
      tambah(3, kartu("p1", 20, 44, 260, 40, W.hijauMuda, ["definisi inklusif", "setidaknya sepasang sisi sejajar"], 9)),
      tambah(3, tanda("p2", 150, 118, true, 24)),
      tambah(8, teks("p3", 150, 152, "hubungan antarbangun lebih rapi", 9.6, W.hijau)),
    ),
  ],
};

/* ------------------------------ LB2. Inclusive Trapezoid Definition: enam bangun dihitung ------------------------------ */
const ENAM: Array<{ b: JenisBangun; nama: string; n: number }> = [
  { b: "sembarang", nama: "trapesium", n: 1 },
  { b: "jajar", nama: "jajargenjang", n: 2 },
  { b: "persegiPanjang", nama: "persegi panjang", n: 2 },
  { b: "belahKetupat", nama: "belah ketupat", n: 2 },
  { b: "persegi", nama: "persegi", n: 2 },
  { b: "layang", nama: "layang-layang", n: 0 },
];
const POS = [
  { x: 50, y: 62 },
  { x: 150, y: 62 },
  { x: 250, y: 62 },
  { x: 50, y: 134 },
  { x: 150, y: 134 },
  { x: 250, y: 134 },
];
const sel = (i: number): Obj[] => [bangun(`s${i}`, ENAM[i].b, POS[i].x, POS[i].y, 13, W.putih), teks(`s${i}n`, POS[i].x, POS[i].y + 28, ENAM[i].nama, 7.8)];
const cacah = (i: number): Obj => teks(`s${i}c`, POS[i].x, POS[i].y + 39, `${ENAM[i].n} pasang`, 8.2, W.merah);

export const ADEGAN_LUAR_TRAPESIUM_TERAPAN: AdeganStory = {
  id: "luarb-trapesium-terapan",
  judul: "Menghitung pasangan sisi sejajar pada enam bangun",
  sumber: "Metode luar; enam segi empat Buku Siswa hlm. 209–232",
  latar: "#FFFBEB",
  ketukan: [
    k(
      "Hitung pasangan sisi sejajar pada enam bangun. Trapesium 1 pasang, jajargenjang 2, persegi panjang 2, belah ketupat 2, persegi 2, dan layang-layang 0.",
      tambah(0, teks("jud", 150, 18, "Pasangan sisi sejajar", 11, W.ungu)),
      tambah(7, sel(0)),
      tambah(8, cacah(0)),
      tambah(10, sel(1)),
      tambah(11, cacah(1)),
      tambah(12, sel(2)),
      tambah(14, cacah(2)),
      tambah(15, sel(3)),
      tambah(17, cacah(3)),
      tambah(18, sel(4)),
      tambah(19, cacah(4)),
      tambah(21, sel(5)),
      tambah(22, cacah(5)),
    ),
    k(
      "Menurut definisi inklusif, bangun dengan 1 pasang atau lebih adalah trapesium. Jadi 5 dari 6 bangun itu termasuk trapesium.",
      tambah(11, ...[0, 1, 2, 3, 4].map((i) => tanda(`ok${i}`, POS[i].x + 28, POS[i].y - 24, true, 14)), tanda("ok5", POS[5].x + 28, POS[5].y - 24, false, 14)),
      tambah(12, teks("tot", 150, 196, "5 dari 6 bangun termasuk trapesium", 9.4, W.hijau)),
    ),
    k(
      "Menurut definisi eksklusif, hanya bangun dengan tepat 1 pasang yang termasuk. Jadi hanya 1 dari 6 bangun, yaitu trapesium sendiri.",
      ubah(0, ...[1, 2, 3, 4, 5].flatMap((i) => [{ id: `s${i}`, op: 0.3 }, { id: `ok${i}`, op: 0.3 }])),
      hapus(8, "tot"),
      tambah(8, teks("tot2", 150, 196, "1 dari 6 bangun termasuk trapesium", 9.4, W.merah)),
      sorotkan(10, "s0"),
    ),
    k(
      "Selisihnya 5 dikurangi 1 sama dengan 4 bangun: jajargenjang, persegi panjang, belah ketupat, dan persegi. Merekalah yang berpindah golongan.",
      ubah(0, ...[1, 2, 3, 4].flatMap((i) => [{ id: `s${i}`, op: 1 }, { id: `ok${i}`, op: 1 }])),
      hapus(0, "tot2"),
      tambah(1, teks("sel", 150, 196, "5 - 1 = 4 bangun berpindah golongan", 9.6, W.biru)),
      sorotkan(8, "s1", "s2", "s3", "s4"),
    ),
  ],
};

/* ------------------------------ LB3. Inclusive Quadrilateral Hierarchy: konsep ------------------------------ */
const NODE_W = 100;
const simpul = (id: string, x: number, y: number, isi: string, warna: string, w = NODE_W): Obj[] => kartu(id, x, y, w, 22, warna, [isi], 8);

export const ADEGAN_LUAR_HIERARKI: AdeganStory = {
  id: "luarb-hierarki",
  judul: "Inclusive Quadrilateral Hierarchy (Van Hiele): segi empat sebagai tingkatan",
  sumber: "Metode luar; hierarki golongan segi empat model Van Hiele",
  latar: "#F0F9FF",
  ketukan: [
    k(
      "Inclusive Quadrilateral Hierarchy, atau hierarki Van Hiele, menyusun segi empat sebagai tingkatan. Bangun yang lebih khusus memiliki semua ciri bangun di atasnya, ditambah satu atau lebih ciri baru.",
      tambah(0, teks("jud", 150, 20, "Hierarki segi empat", 12, W.ungu)),
      tambah(8, kartu("h1", 50, 34, 200, 30, W.ungMuda, ["umum: ciri sedikit"], 9)),
      tambah(12, panah("ha", 150, 70, 0, 26, W.ungu, 2)),
      tambah(16, kartu("h2", 50, 100, 200, 30, W.hijauMuda, ["khusus: ciri lebih banyak"], 9)),
      tambah(22, teks("h3", 150, 152, "ditambah ciri baru", 10.4, W.merah)),
    ),
    k(
      "Panah dibaca termasuk. Persegi termasuk belah ketupat, belah ketupat termasuk jajargenjang, dan jajargenjang termasuk trapesium.",
      bersih(0),
      tambah(3, simpul("v4", 100, 156, "persegi", W.krem)),
      tambah(5, simpul("v3", 100, 114, "belah ketupat", W.hijauMuda), panah("va3", 150, 156, 0, -20, W.ungu, 1.8)),
      tambah(10, simpul("v2", 100, 72, "jajargenjang", W.muda), panah("va2", 150, 114, 0, -20, W.ungu, 1.8)),
      tambah(14, simpul("v1", 100, 30, "trapesium", W.ungMuda), panah("va1", 150, 72, 0, -20, W.ungu, 1.8)),
    ),
    k(
      "Persegi juga termasuk persegi panjang, dan belah ketupat juga termasuk layang-layang. Karena itu hierarki ini berbentuk jaring, bukan satu tangga lurus.",
      tambah(3, ...simpul("v5", 6, 114, "persegi panjang", W.hijauMuda, 86), panah("va5", 110, 156, -61, -20, W.ungu, 1.8), panah("va6", 49, 114, 61, -20, W.ungu, 1.8)),
      tambah(9, ...simpul("v6", 206, 72, "layang-layang", W.merahMuda, 86), panah("va7", 190, 114, 59, -20, W.merah, 1.8)),
      tambah(16, teks("v7", 150, 194, "jaring, bukan tangga lurus", 9.4, W.merah)),
    ),
    k(
      "Kunci memakainya: untuk turun satu tingkat, tambahkan satu ciri. Untuk naik, lepaskan ciri tambahan itu.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Turun dan naik", 12, W.ungu)),
      tambah(3, kartu("t1", 20, 40, 120, 60, W.hijauMuda, ["turun", "tambah 1 ciri"], 9.4), panah("t2", 80, 108, 0, 40, W.hijau, 2.4)),
      tambah(10, kartu("t3", 160, 40, 120, 60, W.krem, ["naik", "lepas ciri tambahan"], 9.4), panah("t4", 220, 148, 0, -40, W.merah, 2.4)),
    ),
  ],
};

/* ------------------------------ LB4. Inclusive Quadrilateral Hierarchy: turun tingkat dengan satu ciri ------------------------------ */
function barisSumbu(id: string, cy: number, dari: JenisBangun, ke: JenisBangun, namaDari: string, namaKe: string, label: string[], nd: number, nk: number): { dari: Obj[]; panah: Obj[]; ke: Obj[] } {
  return {
    dari: [bangun(`${id}a`, dari, 52, cy, 12, W.hijauMuda), teks(`${id}an`, 52, cy + 28, namaDari, 7.8), teks(`${id}ac`, 52, cy + 39, `${nd} sumbu`, 8, W.merah)],
    panah: [panah(`${id}p`, 92, cy, 116, 0, W.ungu, 2.2), ...label.map((b, i) => teks(`${id}l${i}`, 150, cy - 16 + i * 10, b, 7.8, W.merah))],
    ke: [bangun(`${id}b`, ke, 248, cy, 12, W.krem), teks(`${id}bn`, 248, cy + 28, namaKe, 7.8), teks(`${id}bc`, 248, cy + 39, `${nk} sumbu`, 8, W.merah)],
  };
}
const R1 = rumusBangun("a1", "jajar", "persegiPanjang", "jajargenjang", "persegi panjang", ["tambah: sudut 90°"], 17);
const R2 = rumusBangun("a2", "jajar", "belahKetupat", "jajargenjang", "belah ketupat", ["tambah: sisi berurutan", "sama panjang"], 17);
const R3a = barisSumbu("a3", 60, "belahKetupat", "persegi", "belah ketupat", "persegi", ["tambah: sudut 90°"], 2, 4);
const R3b = barisSumbu("a4", 140, "persegiPanjang", "persegi", "persegi panjang", "persegi", ["tambah: sisi berurutan", "sama panjang"], 2, 4);
const BATANG: Array<[string, number]> = [["jajargenjang", 0], ["layang-layang", 1], ["belah ketupat", 2], ["persegi panjang", 2], ["persegi", 4]];
const batang = (i: number): Obj[] => [
  teks(`bt${i}n`, 112, 56 + i * 26, BATANG[i][0], 8.4, W.biru, { anchor: "end" }),
  kotak(`bt${i}k`, 120, 44 + i * 26, Math.max(2, BATANG[i][1] * 34), 16, i === 4 ? W.emas : W.hijauMuda, W.biru, { rx: 3, tebal: 1.2 }),
  teks(`bt${i}c`, 120 + BATANG[i][1] * 34 + 8, 56 + i * 26, String(BATANG[i][1]), 10, W.merah, { anchor: "start" }),
];

export const ADEGAN_LUAR_HIERARKI_TERAPAN: AdeganStory = {
  id: "luarb-hierarki-terapan",
  judul: "Turun tingkat dengan satu ciri, sumbu simetri bertambah",
  sumber: "Metode luar; sudut 90° dan sumbu simetri, Buku Siswa hlm. 216–232",
  latar: "#F5F3FF",
  ketukan: [
    k(
      "Mulai dari jajargenjang, yang punya 0 sumbu simetri. Tambahkan satu sudut 90 derajat, jadilah persegi panjang dengan 2 sumbu simetri.",
      tambah(0, teks("jud", 150, 22, "Jajargenjang ke persegi panjang", 11.5, W.ungu)),
      tambah(2, R1.dari, teks("c1", 52, 150, "0 sumbu simetri", 8, W.merah)),
      tambah(10, R1.panah),
      tambah(14, R1.ke, teks("c2", 248, 150, "2 sumbu simetri", 8, W.merah)),
    ),
    k(
      "Atau mulai lagi dari jajargenjang, lalu tambahkan sisi berurutan sama panjang. Hasilnya belah ketupat, juga dengan 2 sumbu simetri.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Jajargenjang ke belah ketupat", 11.5, W.ungu)),
      tambah(4, R2.dari, teks("d1", 52, 150, "0 sumbu simetri", 8, W.merah)),
      tambah(8, R2.panah),
      tambah(12, R2.ke, teks("d2", 248, 150, "2 sumbu simetri", 8, W.merah)),
    ),
    k(
      "Tambahkan sudut 90 derajat pada belah ketupat, atau sisi berurutan sama panjang pada persegi panjang. Keduanya sampai di persegi, yang punya 4 sumbu simetri.",
      bersih(0),
      tambah(0, teks("jud", 150, 18, "Dua jalan menuju persegi", 11.5, W.ungu)),
      tambah(2, R3a.panah),
      tambah(5, R3a.dari),
      tambah(13, R3a.ke),
      tambah(8, R3b.panah),
      tambah(12, R3b.dari),
      tambah(18, R3b.ke),
    ),
    k(
      "Makin ke bawah ciri makin banyak, dan sumbu simetri bertambah: dari 0, menjadi 2, lalu 4. Layang-layang paling sedikit punya 1 sumbu, sedangkan belah ketupat punya 2.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Banyak sumbu simetri", 12, W.ungu)),
      tambah(11, batang(0)),
      tambah(13, batang(3), batang(2)),
      tambah(15, batang(4)),
      tambah(20, batang(1)),
    ),
  ],
};
