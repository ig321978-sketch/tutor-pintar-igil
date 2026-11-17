import type { AdeganStory, Obj } from "./logika-story";
import { DUA, E, UKUR, WARNA_ISI, W, bentukDatar, emo, judul, kartu, keranjangAnyam, lencana, orang, slot, teks, type Bentuk } from "./k1b4b-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah } from "./k1b4b-bantu";
import { WARNA_METODE, kepala } from "./k1b4b-luar-1";

/* Video metode global Sub-Bab B "Teras Penuh Barang": Guess My Rule (Tebak Aturan), Odd One Out (Cari yang Beda), dan ringkasan. */

type Benda = { b: Bentuk; w: string; s: number };
const gambarBenda = (id: string, d: Benda, x: number, y: number, o: Partial<Obj> = {}): Obj => bentukDatar(id, d.b, WARNA_ISI[d.w], d.s, x, y, o);

/* ------------------------------ 4. Guess My Rule: konsep ------------------------------ */
const SUARA_C1 = "Metode kedua, Guess My Rule, atau Tebak Aturan. Satu orang memilah benda diam-diam.";
const SUARA_C2 = "Aturannya tidak diucapkan. Yang lain hanya melihat isi tiap keranjang.";
const SUARA_C4 = "Tebak Aturan cocok untuk melatih mata, tetapi sulit bila isi keranjangnya hanya sedikit.";
const SUARA_C3 = "Lalu yang lain menebak aturannya. Kalau tebakan cocok dengan semua isi keranjang, aturannya ketemu.";
const ISI_KIRI: Benda[] = [
  { b: "lengkung", w: "merah", s: 10 },
  { b: "lengkung", w: "biru", s: 12 },
  { b: "lengkung", w: "biru", s: 8 },
];
const ISI_KANAN: Benda[] = [
  { b: "segi empat", w: "biru", s: 10 },
  { b: "segi empat", w: "merah", s: 12 },
];
const ID_KONSEP = [...ISI_KIRI.map((_, i) => `pa${i}`), ...ISI_KANAN.map((_, i) => `pb${i}`)];

export const ADEGAN_LUAR_TEBAK: AdeganStory = {
  id: "luar-tebak",
  judul: "Guess My Rule: tebak aturannya",
  sumber: "Metode global: Guess My Rule",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_C1,
      tambah("kedua,", ...kepala(1)),
      tambah("Satu", ...orang("kk", 40, 80, E.kaka, "Kaka"), teks("so", 40, 106, "1 orang memilah", 9, W.ungu)),
      tambah("diam-diam.", emo("dm", 78, 76, E.diam, 16), ...keranjangAnyam("t-a", DUA[0], "?", W.krem), ...keranjangAnyam("t-b", DUA[1], "?", W.krem)),
    ),
    k(
      SUARA_C2,
      tambah("tidak", ...kartu("rh", 100, 56, 100, 20, W.lavender, ["aturan: rahasia"], 9.5)),
      tambah("melihat", ...orang("ig", 262, 80, E.igil, "Igil"), emo("mt", 234, 62, E.mata, 16)),
      tambah("isi", ...ISI_KIRI.map((d, i) => gambarBenda(`pa${i}`, d, slot(DUA[0], i).x, slot(DUA[0], i).y)), ...ISI_KANAN.map((d, i) => gambarBenda(`pb${i}`, d, slot(DUA[1], i).x, slot(DUA[1], i).y))),
    ),
    k(
      SUARA_C3,
      tambah("menebak", ...kartu("tb", 100, 82, 100, 20, W.krem, ["aturan: bentuk?"], 9.5)),
      sorotkan("cocok", ...ID_KONSEP),
      ubah("ketemu.", { id: "t-a-nm-t0", isi: "lengkung" }, { id: "t-b-nm-t0", isi: "segi empat" }, { id: "tb-t0", isi: "aturan: bentuk" }),
      tambah("ketemu.", emo("ok", 214, 92, E.benar, 18)),
    ),
    k(
      SUARA_C4,
      bersih(0),
      tambah(0, ...kepala(1)),
      tambah("cocok", emo("bc", 40, 84, "👍", 26), ...kartu("bk", 64, 66, 222, 38, W.hijauMuda, ["cocok: melatih mata"], 9.4)),
      tambah("tetapi", emo("bt", 40, 142, "🤔", 26), ...kartu("bl", 64, 124, 222, 38, W.merahMuda, ["sulit: isi keranjang sedikit"], 9.4)),
    ),
  ],
};

/* ------------------------------ 5. Guess My Rule: terapan ------------------------------ */
const SUARA_D1 = "Kaka memilah bahan diam-diam. Keranjang kiri berisi empat barang, keranjang kanan berisi tiga barang.";
const SUARA_D2 = "Igil menebak, apakah aturannya warna? Bukan, karena di keranjang kiri ada merah dan ada biru.";
const SUARA_D3 = "Apakah aturannya ukuran? Bukan juga, karena di kiri ada yang besar dan ada yang kecil.";
const SUARA_D4 = "Igil melihat lagi. Semua barang di kiri punya tiga sisi lurus dan tiga sudut.";
const SUARA_D5 = "Jadi aturannya bentuk, yaitu segitiga dan bukan segitiga. Kaka bilang, benar sekali!";
/** Keranjang kiri: empat segitiga (warna dan ukuran campur). Keranjang kanan: tiga bukan segitiga. */
const KIRI: Benda[] = [
  { b: "segitiga", w: "merah", s: UKUR.besar },
  { b: "segitiga", w: "biru", s: UKUR.kecil },
  { b: "segitiga", w: "merah", s: UKUR.kecil },
  { b: "segitiga", w: "biru", s: UKUR.besar },
];
const KANAN: Benda[] = [
  { b: "lengkung", w: "biru", s: UKUR.besar },
  { b: "segi empat", w: "merah", s: UKUR.kecil },
  { b: "lengkung", w: "merah", s: UKUR.kecil },
];
const ID_KIRI = KIRI.map((_, i) => `ga${i}`);
const ID_KANAN = KANAN.map((_, i) => `gb${i}`);
const kiriYang = (f: (d: Benda) => boolean) => KIRI.map((d, i) => (f(d) ? ID_KIRI[i] : "")).filter(Boolean);

export const ADEGAN_LUAR_TEBAK_TERAPAN: AdeganStory = {
  id: "luar-tebak-terapan",
  judul: "Guess My Rule: keranjang Kaka",
  sumber: "Metode global: Guess My Rule, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, ...kepala(1), ...orang("kk", 30, 80, E.kaka, "Kaka"), emo("dm", 68, 76, E.diam, 16)),
      tambah("kiri", ...keranjangAnyam("g-kiri", DUA[0], "kiri", W.krem), ...KIRI.map((d, i) => gambarBenda(ID_KIRI[i], d, slot(DUA[0], i).x, slot(DUA[0], i).y))),
      tambah("empat", ...lencana("g-kiri", DUA[0], 4)),
      tambah("kanan", ...keranjangAnyam("g-kanan", DUA[1], "kanan", W.krem), ...KANAN.map((d, i) => gambarBenda(ID_KANAN[i], d, slot(DUA[1], i).x, slot(DUA[1], i).y))),
      tambah("tiga", ...lencana("g-kanan", DUA[1], 3)),
    ),
    k(
      SUARA_D2,
      tambah("Igil", ...orang("ig", 270, 80, E.igil, "Igil")),
      tambah("warna?", ...kartu("q1", 100, 58, 100, 20, W.krem, ["warna?"], 10)),
      tambah("Bukan,", emo("x1", 212, 68, E.salah, 16)),
      sorotkan("merah", ...kiriYang((d) => d.w === "merah")),
      sorotkan("biru.", ...kiriYang((d) => d.w === "biru")),
    ),
    k(
      SUARA_D3,
      redamkan(0, ...ID_KIRI),
      hapus(0, "q1-k", "q1-t0", "x1"),
      tambah("ukuran?", ...kartu("q2", 100, 58, 100, 20, W.krem, ["ukuran?"], 10)),
      tambah("Bukan", emo("x2", 212, 68, E.salah, 16)),
      sorotkan("besar", ...kiriYang((d) => d.s === UKUR.besar)),
    ),
    k(
      SUARA_D4,
      redamkan(0, ...ID_KIRI),
      hapus(0, "q2-k", "q2-t0", "x2"),
      sorotkan("Semua", ...ID_KIRI),
      tambah("tiga", ...kartu("q3", 80, 58, 140, 20, W.hijauMuda, ["3 sisi lurus, 3 sudut"], 9.5)),
    ),
    k(
      SUARA_D5,
      hapus("bentuk,", "q3-k", "q3-t0"),
      tambah("bentuk,", ...kartu("q4", 90, 58, 120, 20, W.emas, ["aturan: bentuk"], 10)),
      ubah("segitiga", { id: "g-kiri-nm-t0", isi: "segitiga" }),
      ubah("bukan", { id: "g-kanan-nm-t0", isi: "bukan segitiga" }),
      ubah("benar", { id: "dm", isi: E.benar }),
    ),
  ],
};

/* ------------------------------ 6. Odd One Out: konsep ------------------------------ */
const SUARA_E1 = "Metode ketiga, Odd One Out, atau Cari yang Beda. Ada empat benda, tiga sama dan satu berbeda.";
const SUARA_E2 = "Cari benda yang berbeda, lalu tunjuk benda itu dengan jari.";
const SUARA_E4 = "Cari yang Beda cocok untuk benda yang sedikit, tetapi kurang cocok untuk memilah banyak benda.";
const SUARA_E3 = "Lalu sebut cirinya yang berbeda. Bedanya bisa pada bentuk, warna, atau ukuran.";
const X4 = [75, 125, 175, 225];
const EMPAT: Benda[] = [
  { b: "segitiga", w: "biru", s: 14 },
  { b: "segitiga", w: "biru", s: 14 },
  { b: "segitiga", w: "merah", s: 14 },
  { b: "segitiga", w: "biru", s: 14 },
];

export const ADEGAN_LUAR_BEDA: AdeganStory = {
  id: "luar-beda",
  judul: "Odd One Out: cari yang beda",
  sumber: "Metode global: Odd One Out",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_E1,
      tambah("ketiga,", ...kepala(2)),
      tambah("empat", ...EMPAT.map((d, i) => gambarBenda(`ob${i}`, d, X4[i], 92)), teks("h4", 80, 150, "4 benda", 10)),
      tambah("tiga@2", teks("h3", 150, 150, "3 sama", 10, W.biru)),
      tambah("satu", teks("h1", 220, 150, "1 beda", 10, W.merah)),
    ),
    k(SUARA_E2, sorotkan("berbeda,", "ob2"), tambah("tunjuk", emo("tg", 175, 124, "\u{1F446}", 18))),
    k(
      SUARA_E3,
      tambah("sebut", teks("sb", 150, 64, "beda warna: merah", 10, W.merah)),
      tambah("bentuk,", ...kartu("ch0", 20, 168, 80, 20, W.krem, ["bentuk"], 9.5)),
      tambah("warna,", ...kartu("ch1", 110, 168, 80, 20, W.merahMuda, ["warna"], 9.5)),
      tambah("ukuran.", ...kartu("ch2", 200, 168, 80, 20, W.lavender, ["ukuran"], 9.5)),
    ),
    k(
      SUARA_E4,
      bersih(0),
      tambah(0, ...kepala(2)),
      tambah("cocok", emo("bc", 40, 84, "👍", 26), ...kartu("bk", 64, 66, 222, 38, W.hijauMuda, ["cocok: benda sedikit"], 9.4)),
      tambah("tetapi", emo("bt", 40, 142, "🐢", 26), ...kartu("bl", 64, 124, 222, 38, W.merahMuda, ["kurang cocok: benda banyak"], 9.4)),
    ),
  ],
};

/* ------------------------------ 7. Odd One Out: terapan tiga putaran ------------------------------ */
const SUARA_F1 = "Putaran pertama. Ada tiga tutup kaleng lengkung dan satu karton segitiga, semuanya biru.";
const SUARA_F2 = "Yang beda adalah karton segitiga. Cirinya yang berbeda adalah bentuk.";
const SUARA_F3 = "Putaran kedua. Ada empat sisi kardus segi empat, tiga kecil dan satu besar.";
const SUARA_F4 = "Yang beda adalah kardus yang besar. Cirinya yang berbeda adalah ukuran.";
const SUARA_F5 = "Putaran ketiga. Ada empat lengkung kecil, tiga merah dan satu biru.";
const SUARA_F6 = "Yang beda adalah lengkung biru. Cirinya yang berbeda adalah warna.";
const PUTARAN: Benda[][] = [
  [
    { b: "lengkung", w: "biru", s: 12 },
    { b: "lengkung", w: "biru", s: 12 },
    { b: "lengkung", w: "biru", s: 12 },
    { b: "segitiga", w: "biru", s: 12 },
  ],
  [
    { b: "segi empat", w: "merah", s: 9 },
    { b: "segi empat", w: "merah", s: 16 },
    { b: "segi empat", w: "merah", s: 9 },
    { b: "segi empat", w: "merah", s: 9 },
  ],
  [
    { b: "lengkung", w: "merah", s: 9 },
    { b: "lengkung", w: "merah", s: 9 },
    { b: "lengkung", w: "merah", s: 9 },
    { b: "lengkung", w: "biru", s: 9 },
  ],
];
/** Letak benda yang beda di tiap putaran. */
export const BEDA_PUTARAN = [3, 1, 3];
const putaran = (r: number, pilih: number[]): Obj[] => pilih.map((i) => gambarBenda(`o${r}${i}`, PUTARAN[r][i], X4[i], 96));
const idPutaran = (r: number) => [0, 1, 2, 3].map((i) => `o${r}${i}`);
const hapusPutaran = (r: number, ...lain: string[]) => hapus(0, ...idPutaran(r), ...lain, "jw-k", "jw-t0");

export const ADEGAN_LUAR_BEDA_TERAPAN: AdeganStory = {
  id: "luar-beda-terapan",
  judul: "Odd One Out: tiga putaran",
  sumber: "Metode global: Odd One Out, terapan",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_F1,
      tambah(0, ...kepala(2), teks("pt", 150, 64, "putaran 1", 10, W.ungu)),
      tambah("tiga", ...putaran(0, [0, 1, 2]), teks("t0", 100, 140, "3 lengkung", 10)),
      tambah("satu", ...putaran(0, [3]), teks("t1", 210, 140, "1 segitiga", 10)),
    ),
    k(SUARA_F2, sorotkan("segitiga.", "o03"), tambah("bentuk.", ...kartu("jw", 90, 156, 120, 22, W.emas, ["beda: bentuk"], 10))),
    k(
      SUARA_F3,
      hapusPutaran(0, "t0", "t1"),
      ubah(0, { id: "pt", isi: "putaran 2" }),
      tambah("empat", ...putaran(1, [0, 1, 2, 3]), teks("t0", 75, 140, "4 kardus", 10)),
      tambah("tiga", teks("t1", 150, 140, "3 kecil", 10)),
      tambah("satu", teks("t2", 225, 140, "1 besar", 10)),
    ),
    k(SUARA_F4, sorotkan("besar.", "o11"), tambah("ukuran.", ...kartu("jw", 90, 156, 120, 22, W.emas, ["beda: ukuran"], 10))),
    k(
      SUARA_F5,
      hapusPutaran(1, "t0", "t1", "t2"),
      ubah(0, { id: "pt", isi: "putaran 3" }),
      tambah("empat", ...putaran(2, [0, 1, 2, 3]), teks("t0", 75, 140, "4 lengkung", 10)),
      tambah("tiga@2", teks("t1", 150, 140, "3 merah", 10)),
      tambah("satu", teks("t2", 225, 140, "1 biru", 10)),
    ),
    k(SUARA_F6, sorotkan("biru.", "o23"), tambah("warna.", ...kartu("jw", 90, 156, 120, 22, W.emas, ["beda: warna"], 10))),
  ],
};

/* ------------------------------ 8. Ringkasan ------------------------------ */
const SUARA_R1 = "Kalau kamu sudah punya satu aturan, pakai Attribute Sort atau Pilah Ciri.";
const SUARA_R2 = "Kalau orang lain sudah memilah dan kamu ingin tahu aturannya, pakai Guess My Rule atau Tebak Aturan.";
const SUARA_R3 = "Kalau hanya satu benda yang tidak cocok, pakai Odd One Out atau Cari yang Beda.";
const SUARA_R4 = "Sampai jumpa! Besok bahan di keranjang dirakit menjadi mainan untuk festival.";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode",
  sumber: "Metode global: ringkasan",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_R1, tambah(0, judul("Ringkasan")), tambah("satu", ...kartu("r0", 14, 30, 272, 44, WARNA_METODE[0], ["Attribute Sort · Pilah Ciri", "sudah punya 1 aturan"], 9.5))),
    k(SUARA_R2, tambah("tahu", ...kartu("r1", 14, 80, 272, 44, WARNA_METODE[1], ["Guess My Rule · Tebak Aturan", "ingin tahu aturan orang lain"], 9.5))),
    k(SUARA_R3, tambah("satu", ...kartu("r2", 14, 130, 272, 44, WARNA_METODE[2], ["Odd One Out · Cari yang Beda", "hanya 1 benda tidak cocok"], 9.5))),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Sampai jumpa!")),
      tambah(
        "Besok",
        ...orang("ig", 45, 110, E.igil, "Igil"),
        ...orang("kk", 115, 110, E.kaka, "Kaka"),
        ...orang("ab", 185, 110, E.abang, "Abang"),
        ...orang("mm", 255, 110, E.mamah, "Mamah"),
      ),
      tambah("keranjang", emo("kj", 150, 60, E.keranjang, 30)),
      tambah("festival.", emo("td", 150, 160, E.tenda, 30), teks("fs", 150, 188, "besok: merakit mainan", 10, W.ungu)),
    ),
  ],
};
