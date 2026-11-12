/**
 * Dua definisi Mesin Bertahap Kelas 4 Bab 4, dijalankan mesin berstasiun mesin-bertahap-k3b1.ts.
 * Semua pertanyaan, kunci, dan pengecoh DIHITUNG dari kasusnya.
 *  - MESIN_LUAS   (A): Satuan → Hitung → Luas → Bandingkan     (bingkai foto, bangun kisi, lantai teras)
 *  - MESIN_VOLUME (B): Satuan → Hitung → Ubah → Bandingkan     (susu dalam gelas takar, bangun kubus, kolam kecil)
 * Pengecoh bersumber dari kesalahan umum: menjumlah baris dan kolom, menghitung tepi, menganggap bangun tak beraturan
 * sebagai persegi panjang, satuan panjang untuk luas, mengali 100 saja untuk m², menghitung satu lapisan saja,
 * dan 1 l = 100 ml. Teks pertanyaan dieja ejaK3 (bilangan sampai 9.999), jadi bilangan besar ditulis "60 ribu"
 * dan satuan ditulis dengan kata ("cm persegi"). Murni: tanpa React, tanpa jaringan. Hanya impor tipe.
 * Diuji di scripts/uji-lab-k4b4.mjs.
 */
import type { DefMesin, KasusMesin, LangkahMesin, StasiunDef } from "./mesin-bertahap-k3b1";

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);
const susunOpsi = (benar: string, salah: string[], idx: number): string[] => putar([benar, ...salah], idx % (1 + salah.length));
const duaPengecoh = (benar: string, calon: string[]): string[] => [...new Set(calon.filter((c) => c !== benar))].slice(0, 2);
const angkaPengecoh = (benar: number, calon: number[]): string[] => duaPengecoh(String(benar), calon.filter((v) => v >= 0 && v !== benar).map(String));
export const titikM = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
/** Bilangan untuk teks yang diucapkan: 10.000 ke atas ditulis "60 ribu" agar ejaK3 bisa mengejanya. */
export const ucapBil = (n: number): string => (n >= 10000 && n % 1000 === 0 ? `${n / 1000} ribu` : String(n));
const kapital = (t: string): string => `${t[0].toUpperCase()}${t.slice(1)}`;
const BANDING = ["sama", "lebih besar", "lebih kecil"];
const banding = (a: number, b: number): string => (a === b ? "sama" : a > b ? "lebih besar" : "lebih kecil");

/* ------------------------------ A: Mesin Luas ------------------------------ */

export type KasusLuas = {
  id: string;
  benda: string;
  /** Sisi persegi satuan: "cm" atau "m". */
  sisi: "cm" | "m";
  /** Banyak persegi di tiap baris (dari atas). */
  baris: number[];
  /** Pembanding: luas dalam cm², dengan namanya. */
  lawan: { nama: string; cm2: number };
};
export const KASUS_LUAS: KasusLuas[] = [
  { id: "bingkai", benda: "bingkai foto", sisi: "cm", baris: [4, 4, 4], lawan: { nama: "kartu 2 baris, tiap baris 6 persegi 1 cm", cm2: 12 } },
  { id: "bangun", benda: "bangun di kertas berpetak", sisi: "cm", baris: [4, 4, 3, 2], lawan: { nama: "persegi panjang 3 baris, tiap baris 4 persegi 1 cm", cm2: 12 } },
  { id: "teras", benda: "lantai teras", sisi: "m", baris: [3, 3], lawan: { nama: "karpet 60 ribu cm persegi", cm2: 60000 } },
];

export const STASIUN_LUAS: StasiunDef[] = [
  { id: "satuan", nama: "Satuan", ikon: "📏" },
  { id: "hitung", nama: "Hitung", ikon: "🔢" },
  { id: "luas", nama: "Luas", ikon: "🟧" },
  { id: "banding", nama: "Bandingkan", ikon: "⚖️" },
];

const CM2_PER_M2 = 10000;
const jumlah = (a: number[]): number => a.reduce((s, v) => s + v, 0);
const lambangLuas = (s: "cm" | "m"): string => (s === "cm" ? "cm²" : "m²");
const kataLuas = (s: "cm" | "m"): string => (s === "cm" ? "cm persegi" : "m persegi");

export function kasusMesinLuas(k: KasusLuas, idx: number): KasusMesin {
  const n = jumlah(k.baris);
  const persegiPanjang = k.baris.every((v) => v === k.baris[0]);
  const lebar = Math.max(...k.baris);
  const cm2 = k.sisi === "cm" ? n : n * CM2_PER_M2;
  const hasil = banding(cm2, k.lawan.cm2);
  const satuanSalah = k.sisi === "cm" ? "m²" : "cm²";
  const susun = persegiPanjang ? `${k.baris.length} baris, tiap baris ${k.baris[0]} persegi` : `baris berisi ${k.baris.join(", ")} persegi`;
  const langkah: LangkahMesin[] = [
    {
      stasiun: "satuan",
      tanya: `Satuan baku yang cocok untuk luas ${k.benda} adalah…`,
      opsi: susunOpsi(lambangLuas(k.sisi), [satuanSalah, k.sisi], idx),
      benar: lambangLuas(k.sisi),
      petunjuk: k.sisi === "cm" ? `Permukaan kecil memakai cm². Satuan cm hanya untuk panjang, bukan luas.` : `Permukaan besar seperti lantai memakai m². Satuan m hanya untuk panjang, bukan luas.`,
    },
    {
      stasiun: "hitung",
      tanya: `${kapital(k.benda)} tertutup persegi satuan bersisi 1 ${k.sisi}: ${susun}. Banyak persegi satuan…`,
      opsi: susunOpsi(String(n), angkaPengecoh(n, persegiPanjang ? [k.baris.length + k.baris[0], 2 * (k.baris.length + k.baris[0]), n + 1] : [k.baris.length * lebar, n - 1, n + 1]), idx + 1),
      benar: String(n),
      petunjuk: persegiPanjang
        ? `Ada ${k.baris.length} baris dan tiap baris ${k.baris[0]} persegi: ${k.baris.length} × ${k.baris[0]}. Jangan menjumlah baris dan kolom.`
        : `Bangun ini bukan persegi panjang. Jumlahkan isi tiap baris: ${k.baris.join(" + ")}.`,
    },
    {
      stasiun: "luas",
      tanya: `Tiap persegi bersisi 1 ${k.sisi}. Luas ${k.benda} adalah…`,
      opsi: susunOpsi(`${n} ${lambangLuas(k.sisi)}`, [`${n} ${k.sisi}`, `${n} ${satuanSalah}`], idx + 2),
      benar: `${n} ${lambangLuas(k.sisi)}`,
      petunjuk: `Satu persegi bersisi 1 ${k.sisi} luasnya 1 ${kataLuas(k.sisi)}. Jadi ${n} persegi = ${n} ${kataLuas(k.sisi)}.`,
    },
    {
      stasiun: "banding",
      tanya: `Luas ${k.benda} dibanding ${k.lawan.nama}…`,
      opsi: susunOpsi(hasil, BANDING.filter((b) => b !== hasil), idx),
      benar: hasil,
      petunjuk:
        k.sisi === "m"
          ? `Ubah dulu ke satuan yang sama: ${n} m persegi = ${n} × 10 ribu = ${ucapBil(cm2)} cm persegi.`
          : `Bandingkan banyak persegi satuan: ${n} dan ${k.lawan.cm2}. Bentuk boleh berbeda.`,
    },
  ];
  return {
    id: k.id,
    nama: k.benda,
    ringkas: `Luas ${k.benda} ${n} ${kataLuas(k.sisi)}, ${hasil === "sama" ? "sama dengan" : hasil} ${hasil === "sama" ? "" : "dari "}${k.lawan.nama}.`.replace(/  /g, " "),
    langkah,
  };
}

export const MESIN_LUAS: DefMesin = {
  id: "mesin-luas-k4b4",
  judul: "Mesin Luas",
  selesaiId: "mesin-luas",
  stasiun: STASIUN_LUAS,
  kasus: KASUS_LUAS.map(kasusMesinLuas),
};

/* ------------------------------ B: Mesin Volume ------------------------------ */

export type KasusVolume =
  | { id: "susu"; jenis: "cair"; benda: string; tuang: number; takar: number; lawanMl: number; lawanNama: string }
  | { id: "kubus"; jenis: "pejal"; benda: string; baris: number; kolom: number; lapisan: number; lawanMl: number; lawanNama: string }
  | { id: "kolam"; jenis: "besar"; benda: string; baris: number; kolom: number; lapisan: number; lawanMl: number; lawanNama: string };

export const KASUS_VOLUME: KasusVolume[] = [
  { id: "susu", jenis: "cair", benda: "susu di gelas takar", tuang: 10, takar: 100, lawanMl: 900, lawanNama: "botol berisi 900 ml" },
  { id: "kubus", jenis: "pejal", benda: "bangun kubus satuan", baris: 3, kolom: 4, lapisan: 2, lawanMl: 9, lawanNama: "bangun 9 cm kubik" },
  { id: "kolam", jenis: "besar", benda: "kolam kecil", baris: 2, kolom: 2, lapisan: 1, lawanMl: 4000000, lawanNama: "4000 l air" },
];

export const STASIUN_VOLUME: StasiunDef[] = [
  { id: "satuan", nama: "Satuan", ikon: "🧴" },
  { id: "hitung", nama: "Hitung", ikon: "🔢" },
  { id: "ubah", nama: "Ubah", ikon: "🔄" },
  { id: "banding", nama: "Bandingkan", ikon: "⚖️" },
];

const ML_PER_L = 1000;
const L_PER_M3 = 1000;

export function kasusMesinVolume(k: KasusVolume, idx: number): KasusMesin {
  let langkah: LangkahMesin[];
  let ringkas: string;
  if (k.jenis === "cair") {
    const ml = k.tuang * k.takar;
    const l = ml / ML_PER_L;
    const hasil = banding(ml, k.lawanMl);
    langkah = [
      { stasiun: "satuan", tanya: `Satuan baku untuk volume ${k.benda} adalah…`, opsi: susunOpsi("ml", ["cm²", "m²"], idx), benar: "ml", petunjuk: "Cairan diukur dengan ml atau liter. cm² dan m² satuan luas." },
      {
        stasiun: "hitung",
        tanya: `Gelas takar diisi ${k.tuang} gelas kecil, tiap gelas ${k.takar} ml. Isinya … ml`,
        opsi: susunOpsi(String(ml), angkaPengecoh(ml, [k.tuang + k.takar, k.takar, ml + k.takar]), idx + 1),
        benar: String(ml),
        petunjuk: `${k.tuang} kali dituang, tiap kali ${k.takar} ml: ${k.tuang} × ${k.takar}.`,
      },
      {
        stasiun: "ubah",
        tanya: `${ml} ml = … l`,
        opsi: susunOpsi(String(l), angkaPengecoh(l, [l * 10, l * 100, ml / 100]), idx + 2),
        benar: String(l),
        petunjuk: "1 l = 1000 ml, bukan 100 ml.",
      },
      {
        stasiun: "banding",
        tanya: `Volume ${k.benda} dibanding ${k.lawanNama}…`,
        opsi: susunOpsi(hasil, BANDING.filter((b) => b !== hasil), idx),
        benar: hasil,
        petunjuk: `Bandingkan dalam ml: ${ml} ml dan ${k.lawanMl} ml.`,
      },
    ];
    ringkas = `${k.benda} ${ml} ml = ${l} liter, ${hasil} dari ${k.lawanNama}.`;
  } else if (k.jenis === "pejal") {
    const satu = k.baris * k.kolom;
    const v = satu * k.lapisan;
    const hasil = banding(v, k.lawanMl);
    langkah = [
      { stasiun: "satuan", tanya: `Satuan baku untuk volume ${k.benda} yang kecil adalah…`, opsi: susunOpsi("cm³", ["cm²", "m³"], idx), benar: "cm³", petunjuk: "Benda pejal kecil diukur dengan cm kubik. cm persegi satuan luas, m kubik untuk benda besar." },
      {
        stasiun: "hitung",
        tanya: `Alas ${k.baris} baris, tiap baris ${k.kolom} kubus, ada ${k.lapisan} lapisan. Banyak kubus satuan…`,
        opsi: susunOpsi(String(v), angkaPengecoh(v, [satu, k.baris + k.kolom + k.lapisan, v + 1]), idx + 1),
        benar: String(v),
        petunjuk: `Satu lapisan ${k.baris} × ${k.kolom} = ${satu} kubus. Hitung semua lapisan, bukan satu saja.`,
      },
      {
        stasiun: "ubah",
        tanya: `Volume ${v} cm kubik sama dengan … ml`,
        opsi: susunOpsi(String(v), angkaPengecoh(v, [v * 10, v * 100]), idx + 2),
        benar: String(v),
        petunjuk: "1 cm kubik = 1 ml, jadi bilangannya tetap.",
      },
      {
        stasiun: "banding",
        tanya: `Volume ${k.benda} dibanding ${k.lawanNama}…`,
        opsi: susunOpsi(hasil, BANDING.filter((b) => b !== hasil), idx),
        benar: hasil,
        petunjuk: `Bandingkan banyak kubus satuan: ${v} dan ${k.lawanMl}.`,
      },
    ];
    ringkas = `${k.benda} ${v} cm kubik = ${v} ml, ${hasil} dari ${k.lawanNama}.`;
  } else {
    const m3 = k.baris * k.kolom * k.lapisan;
    const l = m3 * L_PER_M3;
    const hasil = banding(l * ML_PER_L, k.lawanMl);
    langkah = [
      { stasiun: "satuan", tanya: `Satuan baku untuk volume ${k.benda} yang besar adalah…`, opsi: susunOpsi("m³", ["m²", "cm³"], idx), benar: "m³", petunjuk: "Ruang besar diukur dengan m kubik. m persegi satuan luas, cm kubik terlalu kecil." },
      {
        stasiun: "hitung",
        tanya: `${kapital(k.benda)} diisi kubus bersisi 1 m: alas ${k.baris} baris, tiap baris ${k.kolom} kubus, ${k.lapisan} lapisan. Banyak kubus…`,
        opsi: susunOpsi(String(m3), angkaPengecoh(m3, [k.baris + k.kolom, m3 + 2, m3 * 2]), idx + 1),
        benar: String(m3),
        petunjuk: `Satu lapisan ${k.baris} × ${k.kolom}. Ada ${k.lapisan} lapisan.`,
      },
      {
        stasiun: "ubah",
        tanya: `${m3} m kubik = … l`,
        opsi: susunOpsi(String(l), angkaPengecoh(l, [m3 * 100, m3 * 10]), idx + 2),
        benar: String(l),
        petunjuk: `1 m kubik = 1000 l. Jadi ${m3} × 1000.`,
      },
      {
        stasiun: "banding",
        tanya: `Volume ${k.benda} dibanding ${k.lawanNama}…`,
        opsi: susunOpsi(hasil, BANDING.filter((b) => b !== hasil), idx),
        benar: hasil,
        petunjuk: `Ubah ke liter dulu: ${m3} m kubik = ${l} l.`,
      },
    ];
    ringkas = `${k.benda} ${m3} m kubik = ${l} liter, ${hasil === "sama" ? "sama dengan" : `${hasil} dari`} ${k.lawanNama}.`;
  }
  return { id: k.id, nama: k.benda, ringkas: kapital(ringkas.replace(/sama dari/, "sama dengan")), langkah };
}

export const MESIN_VOLUME: DefMesin = {
  id: "mesin-volume-k4b4",
  judul: "Mesin Volume",
  selesaiId: "mesin-volume",
  stasiun: STASIUN_VOLUME,
  kasus: KASUS_VOLUME.map(kasusMesinVolume),
};

export const SEMUA_MESIN_K4B4 = [MESIN_LUAS, MESIN_VOLUME];
