import type { AdeganStory, Obj } from "./logika-story";
import { W, bentuk, bulat, jalur, judul, kartu, kotak, teks, tabel, type NamaBangun } from "./k4b5a-gambar";
import { bersih, hapus, idx, k, redamkan, sorotkan, tambah, ubah } from "./k4b5a-bantu";

/* ------------------------------ 6. Geoboard: konsep ------------------------------ */
/** Papan paku 5 kali 5: titik asal paku (30, 44), jarak 22 piksel. Titik bangun karet dinyatakan sebagai nomor paku (kolom, baris). */
export const PAPAN = { x: 30, y: 44, kol: 5, bar: 5, jr: 22 };
export const KARET: Record<string, [number, number][]> = {
  segitigaA: [[0, 4], [4, 4], [2, 0]],
  segitigaB: [[0, 4], [4, 4], [4, 0]],
  segiempatA: [[0, 4], [4, 4], [4, 1], [1, 0]],
  persegipanjang: [[0, 1], [4, 1], [4, 3], [0, 3]],
  segilima: [[2, 0], [4, 2], [3, 4], [1, 4], [0, 2]],
  segienam: [[1, 0], [3, 0], [4, 2], [3, 4], [1, 4], [0, 2]],
};
const dKaret = (p: [number, number][]): string => `${p.map((t, i) => `${i === 0 ? "M" : "L"}${t[0] * PAPAN.jr} ${t[1] * PAPAN.jr}`).join(" ")} Z`;
const papan = (): Obj[] => {
  const out: Obj[] = [kotak("gb-bd", PAPAN.x - 10, PAPAN.y - 10, (PAPAN.kol - 1) * PAPAN.jr + 20, (PAPAN.bar - 1) * PAPAN.jr + 20, "#FDE68A", W.coklat, { rx: 4, tebal: 1.2 })];
  for (let r = 0; r < PAPAN.bar; r += 1) for (let c = 0; c < PAPAN.kol; c += 1) out.push(bulat(`gb-p${r}-${c}`, PAPAN.x + c * PAPAN.jr, PAPAN.y + r * PAPAN.jr, 1.7, W.coklat, undefined));
  return out;
};
const karet = (nama: string, warna: string = "none"): Obj => jalur(`gb@papan`, PAPAN.x, PAPAN.y, dKaret(KARET[nama]), warna, W.merah, { tebal: 2.6 });
const titikKaret = (nama: string): Obj[] => KARET[nama].map((t, i) => bulat(`gv${i}`, PAPAN.x + t[0] * PAPAN.jr, PAPAN.y + t[1] * PAPAN.jr, 3.6, W.merah, W.putih, { tebal: 1 }));
const idTitik = (nama: string): string[] => KARET[nama].map((_, i) => `gv${i}`);

const SUARA_G1 = "Metode ketiga, Geoboard, atau Papan Paku. Papan berisi paku yang berjarak sama. Karet gelang direntangkan di antara paku untuk membuat bangun datar.";
const SUARA_G2 = "Tiap paku yang disentuh karet menjadi titik sudut, dan tiap ruas karet menjadi sisi. Karet yang tertutup membentuk segi banyak.";
const SUARA_G3 = "Karet bisa diubah bentuknya. Geser satu paku, dan segitiga berubah menjadi segitiga lain, atau bahkan segiempat.";
const SUARA_G4 = "Keunggulannya, anak bisa membongkar dan memasang lagi, jadi mencoba bentuk dan menghitung ciri terasa seperti bermain.";

export const ADEGAN_LUAR_PAPAN: AdeganStory = {
  id: "luar-papan",
  judul: "Geoboard: bangun dari karet di papan paku",
  sumber: "Metode luar: Geoboard",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Geoboard")),
      tambah("ketiga,", ...kartu("g1", 150, 38, 140, 28, W.krem, ["Geoboard"], 10.4)),
      tambah(idx(SUARA_G1, "Papan"), ...kartu("g2", 150, 72, 140, 24, W.hijauMuda, ["Papan Paku"], 9)),
      tambah("berisi", ...papan()),
      tambah("Karet", karet("segitigaA")),
    ),
    k(
      SUARA_G2,
      tambah("titik", ...titikKaret("segitigaA")),
      tambah("paku", ...kartu("g3", 150, 106, 140, 26, W.langit, ["paku = titik sudut"], 8.6)),
      tambah("ruas", ...kartu("g4", 150, 138, 140, 26, W.pink, ["ruas karet = sisi"], 8.6)),
      tambah("tertutup", ...kartu("g5", 150, 170, 140, 26, W.emas, ["karet tertutup = segi banyak"], 8)),
    ),
    k(
      SUARA_G3,
      hapus(0, ...idTitik("segitigaA"), "g3-k", "g3-t0", "g4-k", "g4-t0", "g5-k", "g5-t0"),
      ubah("Geser", { id: "gb@papan", d: dKaret(KARET.segitigaB) }),
      tambah("Geser", ...titikKaret("segitigaB")),
      hapus("segitiga@2", ...idTitik("segitigaB")),
      ubah("segitiga@2", { id: "gb@papan", d: dKaret(KARET.segitigaA) }),
      tambah("segitiga@2", ...titikKaret("segitigaA")),
      hapus("segiempat.", ...idTitik("segitigaA")),
      ubah("segiempat.", { id: "gb@papan", d: dKaret(KARET.segiempatA) }),
      tambah("segiempat.", ...titikKaret("segiempatA")),
    ),
    k(
      SUARA_G4,
      bersih(0),
      tambah(0, judul("Kelebihan Geoboard")),
      tambah("membongkar", ...kartu("e1", 20, 34, 260, 34, W.hijauMuda, ["bongkar dan pasang lagi karetnya"], 8.6)),
      tambah("mencoba", ...kartu("e2", 20, 78, 260, 34, W.langit, ["mencoba bentuk, menghitung ciri"], 8.6)),
      tambah("bermain.", ...kartu("e3", 20, 122, 260, 34, W.emas, ["belajar terasa seperti bermain"], 8.6)),
    ),
  ],
};

/* ------------------------------ 7. Geoboard: penerapan seperti Aktivitas 1 (Buku Siswa hlm. 143–144) ------------------------------ */
const SUARA_T1 = "Terapkan seperti Aktivitas satu. Karet pada tiga paku membentuk segitiga: tiga titik sudut dan tiga sisi.";
const SUARA_T2 = "Empat paku membentuk segiempat, misalnya persegi panjang: empat titik sudut dan empat sisi.";
const SUARA_T3 = "Lima paku membentuk segilima, dengan lima sisi. Enam paku membentuk segienam, dengan enam sisi.";
const SUARA_T4 = "Polanya sama dengan tabel buku: banyak sudut sama dengan banyak sisi, dan sama dengan banyak paku yang dipakai.";
export const TABEL_PAKU = [
  { paku: 3, nama: "segitiga", sisi: 3 },
  { paku: 4, nama: "segiempat", sisi: 4 },
  { paku: 5, nama: "segilima", sisi: 5 },
  { paku: 6, nama: "segienam", sisi: 6 },
];

export const ADEGAN_LUAR_PAPAN_TERAPAN: AdeganStory = {
  id: "luar-papan-terapan",
  judul: "Geoboard: tiga, empat, lima, enam paku",
  sumber: "Metode luar: Geoboard; Buku Siswa hlm. 143–144",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Geoboard: 3 paku")),
      tambah(0, ...papan()),
      tambah("tiga", karet("segitigaA")),
      tambah("titik", ...titikKaret("segitigaA")),
      tambah("sisi.", ...kartu("t1", 150, 70, 140, 40, W.hijauMuda, ["3 paku", "3 sudut, 3 sisi"], 9)),
    ),
    k(
      SUARA_T2,
      hapus(0, ...idTitik("segitigaA")),
      ubah(0, { id: "jud", isi: "Geoboard: 4 paku" }),
      ubah("segiempat,", { id: "gb@papan", d: dKaret(KARET.persegipanjang) }),
      tambah("segiempat,", ...titikKaret("persegipanjang")),
      ubah(idx(SUARA_T2, "empat", 2), { id: "t1-t0", isi: "4 paku" }, { id: "t1-t1", isi: "4 sudut, 4 sisi" }),
    ),
    k(
      SUARA_T3,
      hapus(0, ...idTitik("persegipanjang")),
      ubah(idx(SUARA_T3, "segilima"), { id: "jud", isi: "Geoboard: 5 paku" }, { id: "gb@papan", d: dKaret(KARET.segilima) }),
      tambah(idx(SUARA_T3, "segilima"), ...titikKaret("segilima")),
      ubah(idx(SUARA_T3, "lima", 2), { id: "t1-t0", isi: "5 paku" }, { id: "t1-t1", isi: "5 sudut, 5 sisi" }),
      hapus(idx(SUARA_T3, "segienam"), ...idTitik("segilima")),
      ubah(idx(SUARA_T3, "segienam"), { id: "jud", isi: "Geoboard: 6 paku" }, { id: "gb@papan", d: dKaret(KARET.segienam) }),
      tambah(idx(SUARA_T3, "segienam"), ...titikKaret("segienam")),
      ubah(idx(SUARA_T3, "enam", 2), { id: "t1-t0", isi: "6 paku" }, { id: "t1-t1", isi: "6 sudut, 6 sisi" }),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Pola dari tabel buku")),
      tambah("tabel", ...tabel("tp", 30, 34, [80, 80, 80], [["paku", "sudut", "sisi"]], 22, 9)),
      ...TABEL_PAKU.map((r, i) => tambah([idx(SUARA_T4, "sudut"), idx(SUARA_T4, "sisi"), idx(SUARA_T4, "paku"), idx(SUARA_T4, "dipakai")][i], ...tabel(`tq${i}`, 30, 56 + i * 24, [80, 80, 80], [[String(r.paku), String(r.paku), String(r.sisi)]], 24, 10))),
      tambah(idx(SUARA_T4, "yang"), ...kartu("tk", 30, 156, 240, 28, W.emas, ["paku = sudut = sisi"], 9.4)),
    ),
  ],
};

/* ------------------------------ 8. Property Matrix: konsep ------------------------------ */
/** Kolom dan baris matriks kecil. Nilai tiap sel dihitung ulang dari titik sudut bangun oleh uji. */
export const MX_KOLOM: NamaBangun[] = ["persegi", "belah", "layang"];
export const MX_BARIS = ["4 sisi", "semua sisi sama", "diagonal tegak lurus"];
export const MX_NILAI = [
  [true, true, true],
  [true, true, false],
  [true, true, true],
];
type Matriks = { x: number; y: number; lw: number; cw: number; hh: number; rh: number; kolom: NamaBangun[]; baris: string[]; nilai: boolean[][]; skala: number };
const WARNA_KOLOM: Record<string, string> = { persegi: W.hijauMuda, belah: W.krem, layang: W.pink, jajar: W.langit, trapesium: W.lavender };
function kepalaMatriks(id: string, m: Matriks): Obj[] {
  const out: Obj[] = [kotak(`${id}-h`, m.x, m.y, m.lw, m.hh, W.krem, W.biru, { rx: 0, tebal: 1 })];
  m.kolom.forEach((n, c) => {
    out.push(kotak(`${id}-k${c}`, m.x + m.lw + c * m.cw, m.y, m.cw, m.hh, W.krem, W.biru, { rx: 0, tebal: 1 }));
    out.push(bentuk(`${id}-s${c}`, m.x + m.lw + c * m.cw + m.cw / 2 - 12, m.y + 4, n, WARNA_KOLOM[n] ?? W.krem, m.skala, { tebal: 1 }));
  });
  return out;
}
const labelBaris = (id: string, m: Matriks): Obj[] =>
  m.baris.flatMap((b, r) => [kotak(`${id}-l${r}`, m.x, m.y + m.hh + r * m.rh, m.lw, m.rh, W.langit, W.biru, { rx: 0, tebal: 1 }), teks(`${id}-lt${r}`, m.x + m.lw / 2, m.y + m.hh + r * m.rh + m.rh / 2 + 2.6, b, 7.4, W.biru)]);
const selMatriks = (id: string, m: Matriks, r: number): Obj[] => m.kolom.map((_, c) => kotak(`${id}-c${r}-${c}`, m.x + m.lw + c * m.cw, m.y + m.hh + r * m.rh, m.cw, m.rh, W.putih, W.biru, { rx: 0, tebal: 1 }));
const nilaiBaris = (id: string, m: Matriks, r: number): Obj[] => m.kolom.map((_, c) => teks(`${id}-v${r}-${c}`, m.x + m.lw + c * m.cw + m.cw / 2, m.y + m.hh + r * m.rh + m.rh / 2 + 3.2, m.nilai[r][c] ? "✓" : "–", 9.4, m.nilai[r][c] ? W.hijau : W.merah));
const MA: Matriks = { x: 12, y: 62, lw: 100, cw: 58, hh: 30, rh: 22, kolom: MX_KOLOM, baris: MX_BARIS, nilai: MX_NILAI, skala: 0.42 };
const idSel = (id: string, m: Matriks, r: number, c: number) => `${id}-c${r}-${c}`;

const SUARA_X1 = "Metode keempat, Property Matrix, atau Matriks Ciri. Bangun ditata sebagai kolom, ciri sebagai baris, dan tiap sel diisi ya atau tidak.";
const SUARA_X2 = "Membaca per baris menunjukkan bangun mana yang punya ciri itu. Membaca per kolom menunjukkan semua ciri milik satu bangun.";
const SUARA_X3 = "Membandingkan dua kolom memberi hubungan. Jika semua centang belah ketupat juga dicentang pada persegi, maka persegi termasuk belah ketupat.";
const SUARA_X4 = "Satu ciri yang berbeda sudah cukup untuk menolak hubungan itu, dan matriks langsung menunjukkan ciri penolaknya.";

export const ADEGAN_LUAR_MATRIKS: AdeganStory = {
  id: "luar-matriks",
  judul: "Property Matrix: bandingkan ciri dalam satu tabel",
  sumber: "Metode luar: Property Matrix",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_X1,
      tambah(0, judul("Property Matrix")),
      tambah("keempat,", ...kartu("m1", 12, 28, 140, 26, W.pink, ["Property Matrix"], 9.4)),
      tambah("Matriks", ...kartu("m2", 158, 28, 130, 26, W.krem, ["Matriks Ciri"], 9.4)),
      tambah("kolom,", ...kepalaMatriks("mx", MA)),
      tambah("baris,", ...labelBaris("mx", MA)),
      tambah("sel", ...MA.baris.flatMap((_, r) => selMatriks("mx", MA, r)), ...MA.baris.flatMap((_, r) => nilaiBaris("mx", MA, r))),
    ),
    k(
      SUARA_X2,
      sorotkan("baris", ...MA.kolom.map((_, c) => idSel("mx", MA, 1, c))),
      sorotkan("kolom", ...MA.baris.map((_, r) => idSel("mx", MA, r, 2))),
      tambah("kolom", ...kartu("b1", 12, 166, 276, 28, W.emas, ["baris: siapa punya ciri; kolom: semua ciri satu bangun"], 7.8)),
    ),
    k(
      SUARA_X3,
      hapus(0, "b1-k", "b1-t0"),
      redamkan(0, ...MA.kolom.map((_, c) => idSel("mx", MA, 1, c)), idSel("mx", MA, 0, 2), idSel("mx", MA, 2, 2)),
      sorotkan("Membandingkan", ...MA.baris.flatMap((_, r) => [idSel("mx", MA, r, 0), idSel("mx", MA, r, 1)])),
      tambah("maka", ...kartu("b2", 12, 166, 276, 28, W.hijauMuda, ["centang belah ketupat ada pada persegi: persegi termasuk belah ketupat"], 6.8)),
    ),
    k(
      SUARA_X4,
      hapus(0, "b2-k", "b2-t0"),
      redamkan(0, ...MA.baris.flatMap((_, r) => [idSel("mx", MA, r, 0), idSel("mx", MA, r, 1)])),
      ubah("Satu", { id: idSel("mx", MA, 1, 2), warna: W.merahMuda }),
      sorotkan("menolak", idSel("mx", MA, 1, 2)),
      tambah("penolaknya.", teks("b3", 150, 176, "sel – menolak: layang-layang tidak punya sisi sama", 7.6, W.merah)),
    ),
  ],
};

/* ------------------------------ 9. Property Matrix: penerapan belah ketupat dan layang-layang (Panduan Guru hlm. 191) ------------------------------ */
export const MT_KOLOM: NamaBangun[] = ["belah", "layang"];
export const MT_BARIS = ["4 sisi", "2 pasang dekat sama", "diagonal tegak lurus", "semua sisi sama", "2 pasang sisi sejajar"];
export const MT_NILAI = [
  [true, true],
  [true, true],
  [true, true],
  [true, false],
  [true, false],
];
const MB: Matriks = { x: 20, y: 34, lw: 110, cw: 80, hh: 30, rh: 22, kolom: MT_KOLOM, baris: MT_BARIS, nilai: MT_NILAI, skala: 0.45 };
export const MU_KOLOM: NamaBangun[] = ["jajar", "trapesium"];
export const MU_BARIS = ["2 pasang sisi sejajar", "tepat 1 pasang sejajar"];
export const MU_NILAI = [
  [true, false],
  [false, true],
];
const MC: Matriks = { x: 20, y: 40, lw: 110, cw: 80, hh: 30, rh: 26, kolom: MU_KOLOM, baris: MU_BARIS, nilai: MU_NILAI, skala: 0.45 };
const SUARA_Y1 = "Terapkan pada belah ketupat dan layang-layang dari buku. Ciri layang-layang: empat sisi, dua pasang sisi berdekatan sama panjang, dan diagonal berpotongan tegak lurus.";
const SUARA_Y2 = "Cek belah ketupat: keempat sisinya ada, dua pasang sisi berdekatan sama panjang, dan diagonalnya tegak lurus. Semua ada, jadi belah ketupat adalah layang-layang.";
const SUARA_Y3 = "Balikkan. Ciri belah ketupat yang tidak ada pada layang-layang: semua sisi sama panjang dan dua pasang sisi sejajar. Maka layang-layang bukan belah ketupat.";
const SUARA_Y4 = "Dengan cara sama, trapesium bukan jajargenjang: jajargenjang punya dua pasang sisi sejajar, trapesium hanya tepat sepasang. Matriks langsung menunjukkan sel yang berbeda.";

export const ADEGAN_LUAR_MATRIKS_TERAPAN: AdeganStory = {
  id: "luar-matriks-terapan",
  judul: "Property Matrix: belah ketupat dan layang-layang",
  sumber: "Metode luar: Property Matrix; Panduan Guru hlm. 191",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_Y1,
      tambah(0, judul("Belah ketupat dan layang-layang")),
      tambah("belah", ...kepalaMatriks("my", MB)),
      tambah("Ciri", ...[0, 1, 2].flatMap((r) => [...labelBaris("my", MB).filter((o) => o.id === `my-l${r}` || o.id === `my-lt${r}`), ...selMatriks("my", MB, r)])),
      tambah(idx(SUARA_Y1, "tegak"), ...[0, 1, 2].map((r) => teks(`my-v${r}-1`, MB.x + MB.lw + MB.cw * 1.5, MB.y + MB.hh + r * MB.rh + MB.rh / 2 + 3.2, "✓", 9.4, W.hijau))),
    ),
    k(
      SUARA_Y2,
      tambah("belah", ...[0, 1, 2].map((r) => teks(`my-v${r}-0`, MB.x + MB.lw + MB.cw * 0.5, MB.y + MB.hh + r * MB.rh + MB.rh / 2 + 3.2, "✓", 9.4, W.hijau))),
      tambah("Semua", ...kartu("y1", 20, 138, 260, 34, W.hijauMuda, ["semua ciri layang-layang ada", "pada belah ketupat"], 8.4)),
    ),
    k(
      SUARA_Y3,
      hapus(0, "y1-k", "y1-t0", "y1-t1"),
      tambah("semua", ...[3, 4].flatMap((r) => [...labelBaris("my", MB).filter((o) => o.id === `my-l${r}` || o.id === `my-lt${r}`), ...selMatriks("my", MB, r)])),
      tambah(idx(SUARA_Y3, "sejajar"), ...[3, 4].flatMap((r) => nilaiBaris("my", MB, r))),
      tambah("Maka", ...kartu("y2", 20, 178, 260, 20, W.merahMuda, ["layang-layang bukan belah ketupat"], 8.4)),
    ),
    k(
      SUARA_Y4,
      bersih(0),
      tambah(0, judul("Trapesium dan jajargenjang")),
      tambah("trapesium", ...kepalaMatriks("mz", MC)),
      tambah("jajargenjang", ...labelBaris("mz", MC), ...MC.baris.flatMap((_, r) => selMatriks("mz", MC, r))),
      tambah("tepat", ...MC.baris.flatMap((_, r) => nilaiBaris("mz", MC, r))),
      tambah("langsung", ...kartu("z1", 20, 130, 260, 34, W.emas, ["satu sel berbeda sudah cukup", "trapesium bukan jajargenjang"], 8.4)),
    ),
  ],
};

/* ------------------------------ 10. Ringkasan metode luar ------------------------------ */
const SUARA_R1 = "Ringkasannya, empat metode dari luar. van Hiele Level nol dan satu: dari mengenali bentuk naik ke menyebut ciri.";
const SUARA_R2 = "Attribute Sort: memilah bangun dengan pertanyaan ya atau tidak sampai ciri tiap bangun jelas. Geoboard: membuat bangun dengan karet pada paku, lalu menghitung sisi dan sudutnya.";
const SUARA_R3 = "Property Matrix: membandingkan ciri banyak bangun dalam satu tabel untuk melihat hubungan, seperti belah ketupat dan layang-layang.";
const SUARA_R4 = "Semua metode tetap kembali ke ciri yang sama di buku: sisi, sudut, sisi sejajar, dan diagonal. Pilih yang paling cocok dengan kelasmu.";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan empat metode dari luar",
  sumber: "Ringkasan metode luar",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Ringkasan")),
      tambah("van", ...kartu("r1", 12, 34, 276, 34, W.hijauMuda, ["van Hiele Level 0-1: bentuk → ciri"], 8.6)),
    ),
    k(
      SUARA_R2,
      tambah("Attribute", ...kartu("r2", 12, 74, 276, 34, W.langit, ["Attribute Sort: pilah ya atau tidak"], 8.6)),
      tambah("Geoboard:", ...kartu("r3", 12, 114, 276, 34, W.krem, ["Geoboard: karet pada paku"], 8.6)),
    ),
    k(
      SUARA_R3,
      tambah("Property", ...kartu("r4", 12, 154, 276, 34, W.pink, ["Property Matrix: bandingkan dalam tabel"], 8.6)),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Kembali ke ciri di buku")),
      tambah("sisi,", ...kartu("f1", 20, 34, 128, 30, W.hijauMuda, ["sisi"], 9.4)),
      tambah("sudut,", ...kartu("f2", 152, 34, 128, 30, W.langit, ["sudut"], 9.4)),
      tambah("sejajar,", ...kartu("f3", 20, 72, 128, 30, W.krem, ["sisi sejajar"], 9.4)),
      tambah("diagonal.", ...kartu("f4", 152, 72, 128, 30, W.pink, ["diagonal"], 9.4)),
      tambah("Pilih", ...kartu("f5", 20, 124, 260, 34, W.emas, ["pilih metode yang cocok"], 9.4)),
    ),
  ],
};
