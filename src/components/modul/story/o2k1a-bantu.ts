import type { Aksi, KetukanStory, Obj } from "./logika-story";
import { W, bulat, emo, garis, gambarTokoh, hapus, k, kotak, tambah, teks, ubah, type Tokoh } from "./kit/dasar";
import { BENDA, IGIL, benda, keranjang, lambang, pohon } from "./kit/dunia-k1";

/**
 * Perlengkapan adegan Opsi 2 Kelas 1 Bab 1 Sub-Bab A (Apel di Keranjang): letak benda tetap, penghitung, cincin, kartu kalimat kunci,
 * dan model jalur tulis lambang. Semua adegan o2k1a-materi-* dan o2k1a-luar-* memakai berkas ini.
 */

export const LATAR_KEBUN = "#E0F2FE";
export const LATAR_TERANG = "#FFF7ED";
export const APEL = BENDA.apel;
export const U_APEL = 18;

/* ------------------------------ Keranjang dan apel ------------------------------ */
/** Keranjang kebun (pojok kiri-atas). Badan: y + 6 sampai y + h. Apel di keranjang berpusat di badan ini. */
export const KR = { x: 170, y: 104, w: 100, h: 48 } as const;
/** Tempat apel ke-(i + 1) di keranjang: dua baris, lima di tiap baris (baris bawah terisi dulu). */
export const slotKr = (i: number): [number, number] => [183 + (i % 5) * 19, i < 5 ? 146 : 129];
export const keranjangKebun = (): Obj[] => keranjang("kr", KR.x, KR.y, KR.w, KR.h);

/** Sepuluh tempat apel tersebar di rumput (jarak antarapel paling sedikit 30). */
export const SEBAR: ReadonlyArray<readonly [number, number]> = [
  [22, 170], [64, 167], [106, 173], [148, 168], [36, 191], [80, 194], [122, 191], [176, 184], [218, 172], [258, 190],
];
const URUT_SEBAR = [0, 5, 2, 7, 4, 1, 8, 3, 6, 9];
export const posSebar = (i: number): readonly [number, number] => SEBAR[URUT_SEBAR[i]];
/** `n` apel tersebar di rumput, id a1..an. */
export const apelSebar = (n: number): Obj[] => Array.from({ length: n }, (_, i) => benda(`a${i + 1}`, posSebar(i)[0], posSebar(i)[1], APEL, U_APEL));
export const idApel = (dari: number, sampai: number): string[] => Array.from({ length: Math.max(0, sampai - dari + 1) }, (_, i) => `a${dari + i}`);

/** Memasukkan apel id a{i} ke keranjang pada kata nomor `kata`, sambil menyebut bilangan `urut` (penghitung ikut berubah). */
export const masuk = (kata: number, i: number, urut: number): Aksi => ubah(kata, { id: `a${i}`, x: slotKr(urut - 1)[0], y: slotKr(urut - 1)[1] }, { id: "cn-t", isi: String(urut) });

/** Sorot bergilir: pada kata ke-(mulai + i) sorot ids[i] dan redam ids[i - 1]. */
export const sorotBergilir = (ids: string[], mulai = 0): Aksi[] =>
  ids.map((id, i) => ubah(mulai + i, { id, sorot: true }, ...(i > 0 ? [{ id: ids[i - 1], sorot: false }] : [])));

/* ------------------------------ Tokoh dan pohon ------------------------------ */
export const POS_ANAK = { lintang: 34, tala: 86, niko: 138 } as const;
export const CY = 96;
/** Tokoh anak berpusat di (cx, cy). Bawaan: letak tetap di kiri kanvas. */
export const anak = (t: Tokoh, cx?: number, cy = CY): Obj[] => gambarTokoh(t, cx ?? POS_ANAK[t.slug as keyof typeof POS_ANAK], cy);
/** Pohon beringin dengan Igil di tajuknya (kanan atas). */
export const beringin = (): Obj[] => [...pohon("br", 262, 98, 1), ...gambarTokoh(IGIL, 262, 24)];

/* ------------------------------ Penghitung, cincin, tanda tanya ------------------------------ */
/** Kotak lambang kecil yang berganti tiap kali bilangan disebut. Id cn-k dan cn-t. */
export const penghitung = (angka: string, x = 8, y = 8): Obj[] => lambang("cn", x, y, angka, 36, 36, 24);
export const idPenghitung = ["cn-k", "cn-t"];
/** Bingkai merah melingkari sekumpulan benda sekaligus. */
export const cincin = (id: string, x: number, y: number, w: number, h: number): Obj => kotak(id, x, y, w, h, "none", W.merah, { rx: 12, tebal: 2.5 });
export const tandaTanya = (id = "qm", x = 205, y = 86): Obj => emo(id, x, y, "❓", 34);
/** Hitung mundur visual: tiga titik kuning (hapus satu per satu). */
export const titikMundur = (x = 212, y = 40): Obj[] => [0, 1, 2].map((i) => bulat(`jd${i + 1}`, x + i * 20, y, 7, W.emas, W.biru));
export const idTitikMundur = ["jd1", "jd2", "jd3"];

/* ------------------------------ Nenek menuang apel ke dapur ------------------------------ */
export const dapur = (): Obj => emo("dp", 212, 78, "\u{1F3E0}", 30);
export const APEL_HIJAU = "\u{1F34F}";
/** Satu ketukan: Nenek menuang apel (ids) ke dapur, keranjang kosong lagi. `ekstra` = benda lain yang ikut dihapus (penghitung, cincin). */
export const ketukanTuang = (ids: string[], ekstra: string[] = []): KetukanStory =>
  k("Nenek menuang apel ke dapur. Keranjang kosong lagi.", tambah(1, dapur()), hapus(4, ...ids, ...ekstra));

/* ------------------------------ Kalimat kunci ------------------------------ */
export const BARIS_KUNCI = ["Hitung satu", "per satu,", "yang terakhir", "adalah banyaknya."];
/** Kartu kalimat kunci di kiri atas; baris muncul mengikuti kata (kata ke-0, 2, 4, 6). */
export const aksiKunci = (): Aksi[] => [
  tambah(0, kotak("kn-k", 8, 8, 150, 70, W.krem, W.emas, { rx: 10, tebal: 2.5 }), teks("kn-t0", 83, 28, BARIS_KUNCI[0], 11)),
  tambah(2, teks("kn-t1", 83, 42, BARIS_KUNCI[1], 11)),
  tambah(4, teks("kn-t2", 83, 56, BARIS_KUNCI[2], 11)),
  tambah(6, teks("kn-t3", 83, 70, BARIS_KUNCI[3], 11)),
];
export const idKunci = ["kn-k", "kn-t0", "kn-t1", "kn-t2", "kn-t3"];

/* ------------------------------ Model jalur tulis lambang ------------------------------ */
/**
 * Jalur tulis tiap lambang pada bingkai 56 x 90 (pojok kiri-atas di (0, 0)). Tiap elemen adalah satu goresan berurutan.
 * Hanya perintah M, L, C (koordinat mutlak) supaya pemeriksa kanvas dapat membaca pasangan x dan y.
 */
export const MODEL_TULIS: Record<string, string[]> = {
  "0": ["M28 2 C8 2 4 24 4 46 C4 68 8 90 28 90 C48 90 52 68 52 46 C52 24 48 2 28 2"],
  "1": ["M28 2 L28 90"],
  "2": ["M8 20 C10 -4 50 -4 52 22", "M52 22 C54 44 22 64 4 90", "M4 90 L54 90"],
  "3": ["M6 14 C12 -2 50 -2 50 22 C50 38 34 44 22 44", "M22 44 C38 44 54 50 54 68 C54 88 30 94 4 78"],
  "4": ["M40 2 L4 62", "M4 62 L54 62", "M40 2 L40 90"],
  "5": ["M50 2 L12 2", "M12 2 L8 42", "M8 42 C22 32 54 36 54 62 C54 90 20 96 4 78"],
  "6": ["M44 4 C16 12 4 44 4 66", "M4 66 C4 92 52 92 52 66 C52 44 14 44 4 66"],
  "7": ["M4 4 L52 4", "M52 4 L22 90"],
  "8": ["M28 4 C8 4 6 36 28 46", "M28 46 C50 54 52 90 28 90 C6 90 4 54 28 46", "M28 46 C50 38 48 4 28 4"],
  "9": ["M26 3 C2 3 2 44 26 44 C50 44 50 3 26 3", "M44 24 L44 90"],
};
export const WARNA_JALUR = ["#DC2626", "#7C3AED", "#2563EB"];
/** Pojok kiri-atas bingkai: satu angka di (OX1, OY); sepuluh memakai dua bingkai (OX10 dan OX10 + 64). */
export const OY = 42;
export const OX1 = 166;
export const OX10 = 134;
export const awalJalur = (angka: string): [number, number] => {
  const m = MODEL_TULIS[angka][0].match(/^M(-?[\d.]+) (-?[\d.]+)/);
  return [Number(m?.[1]), Number(m?.[2])];
};
/** Goresan ke-i dari lambang `angka`, tergambar bertahap. Id jl-{angka}-{i}. */
export const jalurSegmen = (angka: string, i: number, ox: number): Obj => ({
  id: `jl-${angka}-${i}`,
  t: "jalur",
  x: ox,
  y: OY,
  d: MODEL_TULIS[angka][i],
  warna: "none",
  garis: WARNA_JALUR[i % WARNA_JALUR.length],
  tebal: 6,
  gambar: true,
});
export const idJalur = (angka: string): string[] => MODEL_TULIS[angka].map((_, i) => `jl-${angka}-${i}`);
/** Papan tulis putih dengan dua garis bantu (atas dan bawah lambang). */
export const panelTulis = (): Obj[] => [
  kotak("pn", 96, 26, 196, 130, W.putih, W.biru, { rx: 8, tebal: 1.8 }),
  garis("gt", 104, OY, 180, 0, W.abu, 1, { putus: true }),
  garis("gb", 104, OY + 90, 180, 0, W.abu, 1, { putus: true }),
];
/** Kartu model lambang di kiri papan tulis. Id lb-k dan lb-t. */
export const modelLambang = (angka: string): Obj[] => lambang("lb", 12, 44, angka, 64, 64, 42);
/** Titik hijau awal goresan di bingkai berpojok (ox, OY). */
export const titikMulai = (angka: string, ox: number): Obj => {
  const [sx, sy] = awalJalur(angka);
  return bulat("st", ox + sx, OY + sy, 5, W.hijau, W.biru, { sorot: true });
};
