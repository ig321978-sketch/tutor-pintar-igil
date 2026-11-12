/**
 * Lab Dua Garis (Kelas 3 Bab 4, Sub-Bab C): logika murni. Satu alat, dua bagian.
 *  Dua Garis : garis biru dan garis merah pada kertas berpetak 8 × 8. Arah tiap garis dipilih dari 0°, 45°, 90°, 135°.
 *              Garis biru selalu melalui titik tengah (4, 4). Garis merah digeser −3 sampai 3 petak. Hubungan dua garis
 *              DIHITUNG dari arahnya: sejajar bila arahnya sama, tegak lurus bila perkalian titik arahnya nol,
 *              selebihnya bukan keduanya. Dua garis yang berimpit bukan dua garis sejajar.
 *  Bangun    : ciri segitiga, persegi panjang, persegi, segilima, dan lingkaran, serta merakit bangun tertutup dari batang.
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k3b4.mjs.
 */

export type ArahGaris = 0 | 45 | 90 | 135;
export const ARAH: ArahGaris[] = [0, 45, 90, 135];
export const PETAK = 8;
export const KIRI_X = 1;
export const KANAN_X = 7;
export const MAKS_GESER = 3;
export const MAKS_BATANG = 8;

export type Relasi = "sejajar" | "tegak-lurus" | "bukan" | "berimpit";

/** Vektor arah dengan sumbu y ke atas. */
export function vektor(a: ArahGaris): [number, number] {
  return a === 0 ? [1, 0] : a === 45 ? [1, 1] : a === 90 ? [0, 1] : [-1, 1];
}

const silang = (u: [number, number], v: [number, number]) => u[0] * v[1] - u[1] * v[0];
const titikKali = (u: [number, number], v: [number, number]) => u[0] * v[0] + u[1] * v[1];

/** Titik yang dilalui garis biru, dan titik yang dilalui garis merah setelah digeser g petak. */
export const TITIK_BIRU: [number, number] = [4, 4];
export const titikMerah = (ar: ArahGaris, g: number): [number, number] => (ar === 90 ? [4 + g, 4] : [4, 4 + g]);

export function relasiGaris(ab: ArahGaris, ar: ArahGaris, g: number): Relasi {
  const s = silang(vektor(ab), vektor(ar));
  if (s === 0) return g === 0 ? "berimpit" : "sejajar";
  return titikKali(vektor(ab), vektor(ar)) === 0 ? "tegak-lurus" : "bukan";
}

/** Titik potong dua garis (tidak sejajar). null bila sejajar atau berimpit. */
export function titikPotong(ab: ArahGaris, ar: ArahGaris, g: number): [number, number] | null {
  const d1 = vektor(ab);
  const d2 = vektor(ar);
  const s = silang(d1, d2);
  if (s === 0) return null;
  const p1 = TITIK_BIRU;
  const p2 = titikMerah(ar, g);
  const t = silang([p2[0] - p1[0], p2[1] - p1[1]], d2) / s;
  return [p1[0] + t * d1[0], p1[1] + t * d1[1]];
}

/** Tinggi garis (sumbu y ke atas) di x tertentu. null untuk garis tegak (90°). */
export function tinggiDi(titik: [number, number], a: ArahGaris, x: number): number | null {
  if (a === 90) return null;
  const [dx, dy] = vektor(a);
  return titik[1] + (dy / dx) * (x - titik[0]);
}

/**
 * Selisih posisi garis merah dan biru di ujung kiri (x = 1) dan ujung kanan (x = 7), dalam petak, dengan tanda.
 * Dua garis tegak: selisih mendatar di y = 1 dan y = 7. Satu garis tegak dan satu tidak: null (garis bertemu).
 */
export function selisihUjung(ab: ArahGaris, ar: ArahGaris, g: number): { kiri: number; kanan: number } | null {
  const pm = titikMerah(ar, g);
  if (ab === 90 && ar === 90) return { kiri: pm[0] - TITIK_BIRU[0], kanan: pm[0] - TITIK_BIRU[0] };
  if (ab === 90 || ar === 90) return null;
  const b1 = tinggiDi(TITIK_BIRU, ab, KIRI_X) as number;
  const b2 = tinggiDi(TITIK_BIRU, ab, KANAN_X) as number;
  const m1 = tinggiDi(pm, ar, KIRI_X) as number;
  const m2 = tinggiDi(pm, ar, KANAN_X) as number;
  return { kiri: m1 - b1, kanan: m2 - b2 };
}

export type BangunDef = { id: string; nama: string; sisi: number; sudut: number; siku: number; sama: string; ciri: string };
export const BANGUN_C: BangunDef[] = [
  { id: "segitiga", nama: "Segitiga", sisi: 3, sudut: 3, siku: 0, sama: "Panjang ketiga sisinya boleh berbeda.", ciri: "Dibatasi tiga ruas garis. Punya 3 sisi dan 3 sudut." },
  { id: "persegi-panjang", nama: "Persegi panjang", sisi: 4, sudut: 4, siku: 4, sama: "Sisi yang berhadapan sama panjang.", ciri: "Punya 4 sisi dan 4 sudut siku-siku." },
  { id: "persegi", nama: "Persegi", sisi: 4, sudut: 4, siku: 4, sama: "Keempat sisinya sama panjang.", ciri: "Punya 4 sisi sama panjang dan 4 sudut siku-siku." },
  { id: "segilima", nama: "Segilima", sisi: 5, sudut: 5, siku: 0, sama: "Panjang sisinya boleh berbeda.", ciri: "Dibatasi lima ruas garis. Punya 5 sisi dan 5 sudut." },
  { id: "lingkaran", nama: "Lingkaran", sisi: 0, sudut: 0, siku: 0, sama: "Tidak punya sisi lurus.", ciri: "Dibatasi garis lengkung. Tidak punya sudut." },
];
export const cariBangunC = (id: string): BangunDef => BANGUN_C.find((b) => b.id === id) ?? BANGUN_C[0];

/** Bangun dari n batang: tertutup bila n ≥ 3. */
export function namaRakit(n: number): string {
  if (n <= 0) return "Belum ada batang.";
  if (n === 1) return "Satu batang: hanya satu ruas garis.";
  if (n === 2) return "Dua batang: belum tertutup. Dua ruas garis tidak bisa membatasi bangun.";
  const nama: Record<number, string> = { 3: "Segitiga", 4: "Segiempat", 5: "Segilima", 6: "Segienam", 7: "Segitujuh", 8: "Segidelapan" };
  return `${nama[n]}: ${n} batang membatasi bangun tertutup, jadi ${n} sisi dan ${n} sudut.`;
}
export const rakitTertutup = (n: number): boolean => n >= 3;

export type TampilGaris = { lambang: boolean; jarak: boolean; pojok: boolean };
export type TampilBangun = { sisi: boolean; sudut: boolean; sama: boolean; siku: boolean };

export type StateGaris = {
  ab: ArahGaris;
  ar: ArahGaris;
  g: number;
  tampil: TampilGaris;
  bangun: string;
  tampilB: TampilBangun;
  rakit: number;
  /** Banyak batang (1 sampai 8) yang pernah dirakit. */
  pernahRakit: number[];
  pesan: string;
};

export type AksiGaris =
  | { t: "PUTAR"; garis: "biru" | "merah"; d: 45 | -45 }
  | { t: "GESER"; d: 1 | -1 }
  | { t: "TOGGLE"; rep: keyof TampilGaris }
  | { t: "BANGUN"; id: string }
  | { t: "TOGGLE_B"; rep: keyof TampilBangun }
  | { t: "RAKIT"; d: 1 | -1 }
  | { t: "RESET" };

/** Awal: garis biru mendatar, garis merah miring 45° melalui titik tengah. Bukan sejajar dan bukan tegak lurus. */
export const awalGaris = (): StateGaris => ({
  ab: 0,
  ar: 45,
  g: 0,
  tampil: { lambang: false, jarak: false, pojok: false },
  bangun: "segitiga",
  tampilB: { sisi: false, sudut: false, sama: false, siku: false },
  rakit: 0,
  pernahRakit: [],
  pesan: "",
});

const putar = (a: ArahGaris, d: 45 | -45): ArahGaris => ((((a + d) % 180) + 180) % 180) as ArahGaris;

export function langkahGaris(x: StateGaris, a: AksiGaris): StateGaris {
  switch (a.t) {
    case "PUTAR": {
      const y = a.garis === "biru" ? { ...x, ab: putar(x.ab, a.d) } : { ...x, ar: putar(x.ar, a.d) };
      return { ...y, pesan: "" };
    }
    case "GESER": {
      const g = x.g + a.d;
      if (g < -MAKS_GESER || g > MAKS_GESER) return { ...x, pesan: `Garis merah hanya bisa digeser sampai ${MAKS_GESER} petak.` };
      return { ...x, g, pesan: "" };
    }
    case "TOGGLE":
      return { ...x, tampil: { ...x.tampil, [a.rep]: !x.tampil[a.rep] }, pesan: "" };
    case "BANGUN":
      return BANGUN_C.some((b) => b.id === a.id) ? { ...x, bangun: a.id, pesan: "" } : x;
    case "TOGGLE_B":
      return { ...x, tampilB: { ...x.tampilB, [a.rep]: !x.tampilB[a.rep] }, pesan: "" };
    case "RAKIT": {
      const n = x.rakit + a.d;
      if (n < 0) return { ...x, pesan: "Tidak ada batang yang bisa diambil." };
      if (n > MAKS_BATANG) return { ...x, pesan: `Paling banyak ${MAKS_BATANG} batang.` };
      const pernahRakit = n >= 1 && !x.pernahRakit.includes(n) ? [...x.pernahRakit, n] : x.pernahRakit;
      return { ...x, rakit: n, pernahRakit, pesan: "" };
    }
    case "RESET":
      return awalGaris();
  }
}

export type KeadaanGaris = {
  alat: "garis";
  ab: ArahGaris;
  ar: ArahGaris;
  g: number;
  relasi: Relasi;
  lambang: boolean;
  jarak: boolean;
  pojok: boolean;
  /** Selisih petak di ujung kiri dan kanan (dengan tanda), atau null bila garis bertemu. */
  kiri: number | null;
  kanan: number | null;
  bangun: string;
  sisiTampil: boolean;
  sudutTampil: boolean;
  samaTampil: boolean;
  sikuTampil: boolean;
  rakit: number;
  pernahRakit: number[];
};

export function keadaanGaris(x: StateGaris): KeadaanGaris {
  const s = selisihUjung(x.ab, x.ar, x.g);
  return {
    alat: "garis",
    ab: x.ab,
    ar: x.ar,
    g: x.g,
    relasi: relasiGaris(x.ab, x.ar, x.g),
    lambang: x.tampil.lambang,
    jarak: x.tampil.jarak,
    pojok: x.tampil.pojok,
    kiri: s ? s.kiri : null,
    kanan: s ? s.kanan : null,
    bangun: x.bangun,
    sisiTampil: x.tampilB.sisi,
    sudutTampil: x.tampilB.sudut,
    samaTampil: x.tampilB.sama,
    sikuTampil: x.tampilB.siku,
    rakit: x.rakit,
    pernahRakit: x.pernahRakit,
  };
}

/** Lambang untuk pasangan garis berhuruf: AB ⊥ CD, AB // CD, atau tanpa lambang. */
export function lambangRelasi(r: Relasi): string {
  return r === "tegak-lurus" ? "⊥" : r === "sejajar" ? "//" : "";
}

export function ceritaRelasi(x: StateGaris): string {
  const r = relasiGaris(x.ab, x.ar, x.g);
  const s = selisihUjung(x.ab, x.ar, x.g);
  if (r === "berimpit") return "Kedua garis berimpit, jadi hanya terlihat satu garis. Dua garis yang berimpit bukan dua garis sejajar. Geser garis merah.";
  if (r === "tegak-lurus") return "Kedua garis bertemu pada sudut siku-siku, jadi tegak lurus. Pertemuannya diberi tanda kotak kecil. AB ⊥ CD.";
  if (r === "sejajar") return `Kedua garis jaraknya selalu sama, ${Math.abs(x.g)} petak di mana saja, dan tidak pernah bertemu, jadi sejajar. AB // CD.`;
  if (s === null) return "Kedua garis bertemu, tetapi tidak membentuk sudut siku-siku. Jadi tidak tegak lurus dan tidak sejajar.";
  const berlawanan = Math.abs(s.kiri) === Math.abs(s.kanan);
  return `Di ujung kiri garis merah ${ketKedudukan(s.kiri)}, di ujung kanan ${ketKedudukan(s.kanan)}. ${berlawanan ? "Kedudukannya berlawanan, jadi kedua garis bersilang." : "Jaraknya berbeda."} Garis ini bukan sejajar dan tidak tegak lurus.`;
}

/** "3 petak di atas garis biru", "berimpit dengan garis biru". */
export const ketKedudukan = (v: number): string => (v === 0 ? "berimpit dengan garis biru" : `${Math.abs(v)} petak di ${v > 0 ? "atas" : "bawah"} garis biru`);

/** Keterangan jarak di ujung kiri dan kanan untuk tampilan Jarak petak. */
export function teksJarak(x: StateGaris): string {
  const s = selisihUjung(x.ab, x.ar, x.g);
  const r = relasiGaris(x.ab, x.ar, x.g);
  if (s === null) return "Garis bertemu, jadi jarak di kedua ujung tidak dibandingkan.";
  if (r === "berimpit") return "Kedua garis berimpit: jaraknya 0 di mana saja.";
  if (r === "sejajar") return `Jarak di ujung kiri: ${Math.abs(s.kiri)} petak. Di ujung kanan: ${Math.abs(s.kanan)} petak. Jaraknya sama.`;
  return `Ujung kiri: garis merah ${ketKedudukan(s.kiri)}. Ujung kanan: garis merah ${ketKedudukan(s.kanan)}.`;
}

export function ucapGaris(x: StateGaris): string {
  return ceritaRelasi(x).replace(" AB ⊥ CD.", "").replace(" AB // CD.", "");
}

export function ucapBangun(x: StateGaris): string {
  const b = cariBangunC(x.bangun);
  return `${b.nama}. ${b.ciri}`;
}
