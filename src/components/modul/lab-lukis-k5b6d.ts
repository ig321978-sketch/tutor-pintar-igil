/**
 * Lab Lukis (Kelas 5 Bab 6, Sub-Bab D: Melukis Sudut): logika murni. Satu alat, tiga tampilan.
 *  Lukis  : lukis sudut berukuran tertentu dengan urutan Constructing Angles Protocol: titik sudut dan kaki pertama, pasang
 *           busur, tandai angka pada skala yang mulai dari nol di kaki pertama, lalu gambar kaki kedua.
 *  Cek    : ukur ulang hasil lukisan (Protractor Construction): cocok dengan target, atau meleset karena pusat busur tidak
 *           tepat, garis dasar tidak berimpit, atau salah memilih skala.
 *  Hubung : hubungkan mengukur dan melukis: pilih ukuran sudut yang menghasilkan jenis sudut yang diminta.
 * Data dari Buku Siswa Kelas V Bab 6 Sub-Bab D (30°, 75°, 110°, 52°, 140°, ukur ulang hasil lukisan). Menyentuh konsep sub-bab
 * sebelumnya: patokan siku-siku (A), titik sudut, kaki sudut, dan jenis sudut (B), busur dan skala (C).
 * Ukuran sudut ditulis dalam derajat bulat. Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k5b6.mjs.
 */

/** Ukuran target yang dilukis. Kaki pertama selalu ke kanan, jadi skala yang dipakai adalah skala dalam (nol di sisi kanan). */
export const DATA_LUKIS: number[] = [30, 75, 110, 52, 140];
/** Tiga angka pilihan untuk tanda: ukuran target, angka skala yang satunya (180 dikurangi target), dan target ditambah 10. */
export const opsiTanda = (target: number): number[] => [target, 180 - target, target + 10].sort((a, b) => a - b);
export const LANGKAH_LUKIS = ["Titik sudut dan kaki pertama", "Pasang busur", "Tandai angka", "Gambar kaki kedua"];

export type SebabCek = "pusat" | "dasar" | "skala";
export const SEBAB_CEK: SebabCek[] = ["pusat", "dasar", "skala"];
export const URAIAN_SEBAB: Record<SebabCek, string> = {
  pusat: "pusat busur tidak tepat di titik sudut",
  dasar: "garis dasar tidak berimpit dengan kaki pertama",
  skala: "salah memilih skala",
};
/** Empat hasil lukisan untuk diukur ulang. hasil: ukuran waktu diukur ulang. sebab: penyebab bila meleset. */
export type DataCek = { target: number; hasil: number; sebab: SebabCek | null; catatan: string };
export const DATA_CEK: DataCek[] = [
  { target: 75, hasil: 75, sebab: null, catatan: "busur terpasang rapi, pusat di titik sudut dan dasar berimpit dengan kaki pertama" },
  { target: 110, hasil: 70, sebab: "skala", catatan: "angka dibaca dari skala yang nolnya bukan di kaki pertama" },
  { target: 50, hasil: 60, sebab: "pusat", catatan: "pusat busur tampak bergeser dari titik sudut" },
  { target: 130, hasil: 120, sebab: "dasar", catatan: "garis dasar busur tampak miring dari kaki pertama" },
];

export type JenisHubung = "lancip" | "siku" | "tumpul";
export const jenisUkuran = (deg: number): JenisHubung => (deg < 90 ? "lancip" : deg === 90 ? "siku" : "tumpul");
export const SEBUT_JENIS: Record<JenisHubung, string> = { lancip: "sudut lancip", siku: "sudut siku-siku", tumpul: "sudut tumpul" };
export const RENTANG_JENIS: Record<JenisHubung, string> = { lancip: "kurang dari 90°", siku: "tepat 90°", tumpul: "lebih dari 90° dan kurang dari 180°" };
/** Tiga tugas: lukis sudut dengan jenis tertentu, pilih satu dari tiga ukuran. */
export type DataHubung = { jenis: JenisHubung; opsi: number[]; benar: number };
export const DATA_HUBUNG: DataHubung[] = [
  { jenis: "lancip", opsi: [40, 90, 150], benar: 40 },
  { jenis: "siku", opsi: [45, 90, 135], benar: 90 },
  { jenis: "tumpul", opsi: [60, 125, 90], benar: 125 },
];

export const idLukis = (i: number): string => `lukis:${i}`;
export const idCek = (i: number): string => `cek:${i}`;
export const idHubung = (i: number): string => `hubung:${i}`;

const catat = (daftar: string[], ...id: string[]): string[] => id.reduce((a, v) => (a.includes(v) ? a : [...a, v]), daftar);
const sah = (i: number, n: number): boolean => Number.isInteger(i) && i >= 0 && i < n;

/* ------------------------------ Keadaan ------------------------------ */

export type StateLukisK5B6D = {
  lukis: { data: number; langkah: 0 | 1 | 2 | 3 | 4; tanda: number | null; hasil: number | null };
  cek: { data: number; putusan: "meleset" | null };
  hubung: { data: number };
  pernah: string[];
  pesan: string;
};

export type AksiLukisK5B6D =
  | { t: "L_DATA"; i: number }
  | { t: "L_TITIK" }
  | { t: "L_BUSUR" }
  | { t: "L_TANDA"; nilai: number }
  | { t: "L_KAKI" }
  | { t: "L_ULANG" }
  | { t: "C_DATA"; i: number }
  | { t: "C_PUTUS"; putusan: string }
  | { t: "C_SEBAB"; sebab: string }
  | { t: "H_DATA"; i: number }
  | { t: "H_UKURAN"; nilai: number }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

const awalLukis = (i: number): StateLukisK5B6D["lukis"] => ({ data: i, langkah: 0, tanda: null, hasil: null });

export const awalLukisK5B6D = (): StateLukisK5B6D => ({
  lukis: awalLukis(0),
  cek: { data: 0, putusan: null },
  hubung: { data: 0 },
  pernah: [],
  pesan: "",
});

export const targetLukis = (x: StateLukisK5B6D): number => DATA_LUKIS[x.lukis.data];
export const dataCek = (x: StateLukisK5B6D): DataCek => DATA_CEK[x.cek.data];
export const dataHubung = (x: StateLukisK5B6D): DataHubung => DATA_HUBUNG[x.hubung.data];

function titik(x: StateLukisK5B6D): StateLukisK5B6D {
  if (x.lukis.langkah !== 0) return x;
  return { ...x, lukis: { ...x.lukis, langkah: 1 }, pesan: "✅ Titik sudut dan kaki pertama sudah dibuat. Sekarang pasang busur: pusat di titik sudut, dasar berimpit dengan kaki pertama." };
}

function busur(x: StateLukisK5B6D): StateLukisK5B6D {
  if (x.lukis.langkah === 0) return { ...x, pesan: "Buat titik sudut dan kaki pertama dulu, baru pasang busur." };
  if (x.lukis.langkah !== 1) return x;
  return { ...x, lukis: { ...x.lukis, langkah: 2 }, pesan: `✅ Busur terpasang. Beri tanda angka ${targetLukis(x)}° pada skala yang mulai dari nol di kaki pertama.` };
}

function tanda(x: StateLukisK5B6D, nilai: number): StateLukisK5B6D {
  if (!opsiTanda(targetLukis(x)).includes(nilai)) return x;
  if (x.lukis.langkah < 2) return { ...x, pesan: "Pasang busur dulu, baru beri tanda angka." };
  if (x.lukis.langkah !== 2) return x;
  return { ...x, lukis: { ...x.lukis, langkah: 3, tanda: nilai }, pesan: `Tanda dibuat di angka ${nilai}. Sekarang gambar kaki kedua dari titik sudut melalui tanda itu.` };
}

function kaki(x: StateLukisK5B6D): StateLukisK5B6D {
  if (x.lukis.langkah < 3 || x.lukis.tanda === null) return { ...x, pesan: "Beri tanda angka dulu, baru gambar kaki kedua." };
  if (x.lukis.langkah !== 3) return x;
  const target = targetLukis(x);
  const hasil = x.lukis.tanda;
  const baru = { ...x.lukis, langkah: 4 as const, hasil };
  if (hasil === target) {
    return { ...x, lukis: baru, pernah: catat(x.pernah, idLukis(x.lukis.data)), pesan: `✅ Sudut ${target}° selesai dilukis: titik sudut dan kaki pertama, busur, tanda ${target}, lalu kaki kedua.` };
  }
  const sebab = hasil === 180 - target ? ` Angka ${hasil} dibaca dari skala yang satunya, yang nolnya bukan di kaki pertama.` : " Tanda tidak dibuat di angka target.";
  return { ...x, lukis: baru, pesan: `Sudut yang terlukis ${hasil}°, bukan ${target}°.${sebab} Ulangi dari awal.` };
}

function putusCek(x: StateLukisK5B6D, putusan: string): StateLukisK5B6D {
  if (putusan !== "cocok" && putusan !== "meleset") return x;
  const d = dataCek(x);
  const sama = d.hasil === d.target;
  if (putusan === "cocok") {
    if (sama) return { ...x, pernah: catat(x.pernah, idCek(x.cek.data)), pesan: `✅ Hasil ukur ulang ${d.hasil}° sama dengan target ${d.target}°. Lukisannya cocok, karena ${d.catatan}.` };
    return { ...x, cek: { ...x.cek, putusan: null }, pesan: `Hasil ukur ulang ${d.hasil}° tidak sama dengan target ${d.target}°, jadi belum cocok.` };
  }
  if (sama) return { ...x, cek: { ...x.cek, putusan: null }, pesan: `Hasil ukur ulang ${d.hasil}° sama dengan target ${d.target}°, jadi lukisannya cocok.` };
  return { ...x, cek: { ...x.cek, putusan: "meleset" }, pesan: `Betul, meleset: hasil ukur ulang ${d.hasil}° bukan ${d.target}°. Apa sebabnya? Perhatikan catatan: ${d.catatan}.` };
}

function sebabCek(x: StateLukisK5B6D, sebab: string): StateLukisK5B6D {
  if (!(SEBAB_CEK as string[]).includes(sebab)) return x;
  if (x.cek.putusan !== "meleset") return { ...x, pesan: "Putuskan dulu, cocok atau meleset." };
  const d = dataCek(x);
  if (sebab === d.sebab) {
    return { ...x, pernah: catat(x.pernah, idCek(x.cek.data)), pesan: `✅ Sebabnya ${URAIAN_SEBAB[sebab]}. Hasil ukur ulang ${d.hasil}° bukan ${d.target}°, jadi lukisan diulang dengan busur yang dipasang benar.` };
  }
  return { ...x, pesan: `Bukan karena ${URAIAN_SEBAB[sebab as SebabCek]}. Lihat lagi catatan: ${d.catatan}.` };
}

function ukuranHubung(x: StateLukisK5B6D, nilai: number): StateLukisK5B6D {
  const d = dataHubung(x);
  if (!d.opsi.includes(nilai)) return x;
  const j = jenisUkuran(nilai);
  if (j === d.jenis) {
    return { ...x, pernah: catat(x.pernah, idHubung(x.hubung.data)), pesan: `✅ ${nilai}° adalah ${SEBUT_JENIS[j]}, yaitu ukuran ${RENTANG_JENIS[j]}. Sudut ${nilai}° bisa dilukis dengan busur.` };
  }
  return { ...x, pesan: `${nilai}° adalah ${SEBUT_JENIS[j]}, yaitu ukuran ${RENTANG_JENIS[j]}, bukan ${SEBUT_JENIS[d.jenis]}. ${SEBUT_JENIS[d.jenis][0].toUpperCase()}${SEBUT_JENIS[d.jenis].slice(1)} adalah ukuran ${RENTANG_JENIS[d.jenis]}.` };
}

export function langkahLukisK5B6D(x: StateLukisK5B6D, a: AksiLukisK5B6D): StateLukisK5B6D {
  switch (a.t) {
    case "L_DATA":
      return sah(a.i, DATA_LUKIS.length) ? { ...x, lukis: awalLukis(a.i), pesan: "" } : x;
    case "L_TITIK":
      return titik(x);
    case "L_BUSUR":
      return busur(x);
    case "L_TANDA":
      return tanda(x, a.nilai);
    case "L_KAKI":
      return kaki(x);
    case "L_ULANG":
      return { ...x, lukis: awalLukis(x.lukis.data), pesan: "" };
    case "C_DATA":
      return sah(a.i, DATA_CEK.length) ? { ...x, cek: { data: a.i, putusan: null }, pesan: "" } : x;
    case "C_PUTUS":
      return putusCek(x, a.putusan);
    case "C_SEBAB":
      return sebabCek(x, a.sebab);
    case "H_DATA":
      return sah(a.i, DATA_HUBUNG.length) ? { ...x, hubung: { data: a.i }, pesan: "" } : x;
    case "H_UKURAN":
      return ukuranHubung(x, a.nilai);
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalLukisK5B6D();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanLukisK5B6D = { alat: "lukis"; pernah: string[] };
export const keadaanLukisK5B6D = (x: StateLukisK5B6D): KeadaanLukisK5B6D => ({ alat: "lukis", pernah: x.pernah });

export const ucapLukisK5B6D = (x: StateLukisK5B6D): string => {
  const t = targetLukis(x);
  const l = x.lukis.langkah;
  if (l === 0) return `Lukis sudut ${t}°. Mulai dengan membuat titik sudut dan kaki pertama.`;
  if (l === 1) return "Pasang busur: pusat di titik sudut, dasar berimpit dengan kaki pertama.";
  if (l === 2) return `Beri tanda angka ${t}° pada skala yang mulai dari nol di kaki pertama.`;
  if (l === 3) return "Gambar kaki kedua dari titik sudut melalui tanda.";
  return `Sudut yang terlukis ${x.lukis.hasil}°. Target ${t}°.`;
};
export const ucapCekK5B6D = (x: StateLukisK5B6D): string => {
  const d = dataCek(x);
  return `Target ${d.target}°. Hasil ukur ulang ${d.hasil}°. Catatan: ${d.catatan}. Putuskan, cocok atau meleset.`;
};
export const ucapHubungK5B6D = (x: StateLukisK5B6D): string => `Pilih ukuran yang menghasilkan ${SEBUT_JENIS[dataHubung(x).jenis]}.`;
