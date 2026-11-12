/**
 * Lab Segi Empat (Kelas 5 Bab 7, Sub-Bab B: Membandingkan Ciri-Ciri Segi Empat): logika murni. Satu alat, tiga tampilan.
 *  Ciri   : enam ciri diperiksa satu per satu pada satu bangun, lalu bangun diberi nama yang paling tepat
 *           (Van Hiele Property Comparison: matriks ciri, jangan menghafal nama).
 *  Sejajar: uji sisi atas dengan garis tegak lurus ke alas, dan uji arah sisi kiri dengan sisi kanan. Trapesium punya
 *           setidaknya sepasang sisi sejajar, jadi jajargenjang juga trapesium (Inclusive Trapezoid Definition).
 *  Tangga : bangun naik tangga: persegi panjang dan belah ketupat termasuk jajargenjang, persegi di pusat, belah ketupat
 *           termasuk layang-layang (Inclusive Quadrilateral Hierarchy).
 * Data dari Buku Siswa Kelas V Bab 7 Sub-Bab B (Eksplorasi 7.2B sampai 7.2G: trapesium, jajargenjang, persegi panjang,
 * belah ketupat, persegi, layang-layang). Tidak memakai jumlah sudut segi empat (tidak ada di Materi). Murni: tanpa React,
 * tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k5b7.mjs.
 */

export type Bangun = "trapesium" | "jajargenjang" | "persegi-panjang" | "belah-ketupat" | "persegi" | "layang-layang";
export const BANGUN: Bangun[] = ["trapesium", "jajargenjang", "persegi-panjang", "belah-ketupat", "persegi", "layang-layang"];
export const NAMA_BANGUN: Record<Bangun, string> = {
  trapesium: "trapesium",
  jajargenjang: "jajargenjang",
  "persegi-panjang": "persegi panjang",
  "belah-ketupat": "belah ketupat",
  persegi: "persegi",
  "layang-layang": "layang-layang",
};

/** Enam ciri. Urutan tetap: indeks dipakai tabel di bawah. */
export const CIRI: string[] = [
  "Ada sepasang sisi sejajar atau lebih",
  "Dua pasang sisi berhadapan sejajar",
  "Empat sudut siku-siku",
  "Empat sisi sama panjang",
  "Dua pasang sisi berurutan sama panjang",
  "Diagonal saling tegak lurus",
];

/** Ciri yang dimiliki tiap bangun (urutan sama dengan CIRI). */
export const CIRI_BANGUN: Record<Bangun, boolean[]> = {
  trapesium: [true, false, false, false, false, false],
  jajargenjang: [true, true, false, false, false, false],
  "persegi-panjang": [true, true, true, false, false, false],
  "belah-ketupat": [true, true, false, true, true, true],
  persegi: [true, true, true, true, true, true],
  "layang-layang": [false, false, false, false, true, true],
};

/** Ciri penentu: bangun masuk golongan B bila memiliki semua ciri penentu B. */
export const DEFINISI: Record<Bangun, number[]> = {
  trapesium: [0],
  jajargenjang: [1],
  "persegi-panjang": [1, 2],
  "belah-ketupat": [1, 3],
  persegi: [1, 2, 3],
  "layang-layang": [4],
};

/** a termasuk golongan b bila a memiliki semua ciri penentu b. */
export const termasuk = (a: Bangun, b: Bangun): boolean => DEFINISI[b].every((k) => CIRI_BANGUN[a][k]);

/** Nama paling tepat dari ciri yang dimiliki: golongan yang memuat paling sedikit bangun (termasuk semua golongan lain yang cocok). */
export function namaTepat(ciri: boolean[]): Bangun | null {
  const cocok = BANGUN.filter((b) => DEFINISI[b].every((k) => ciri[k]));
  return cocok.find((a) => cocok.every((b) => a === b || termasuk(a, b))) ?? null;
}

export type DataSejajar = { nama: string; sebut: string; titik: [[number, number], [number, number], [number, number], [number, number]]; tambahan: string };
/** Titik: kiri bawah, kanan bawah, kanan atas, kiri atas. Alas datar di y = 0. */
export const DATA_SEJAJAR: DataSejajar[] = [
  { nama: "trapesium biasa", sebut: "trapesium", titik: [[0, 0], [8, 0], [6, 3], [1, 3]], tambahan: "" },
  { nama: "trapesium siku-siku", sebut: "trapesium", titik: [[0, 0], [7, 0], [4, 3], [0, 3]], tambahan: "Ada sudut siku-siku, jadi ini trapesium siku-siku." },
  { nama: "trapesium sama kaki", sebut: "trapesium", titik: [[0, 0], [8, 0], [6, 3], [2, 3]], tambahan: "Kakinya sama panjang dan bangunnya punya simetri lipat, jadi ini trapesium sama kaki." },
  { nama: "jajargenjang", sebut: "jajargenjang", titik: [[0, 0], [6, 0], [8, 3], [2, 3]], tambahan: "Dua pasang sisinya sejajar, jadi jajargenjang juga trapesium." },
  { nama: "persegi panjang", sebut: "persegi panjang", titik: [[0, 0], [6, 0], [6, 3], [0, 3]], tambahan: "Dua pasang sisinya sejajar, jadi persegi panjang juga trapesium." },
  { nama: "segi empat sembarang", sebut: "segi empat", titik: [[0, 0], [6, 0], [4, 3], [1, 4]], tambahan: "Tidak ada sisi yang sejajar, jadi bukan trapesium." },
];
/** Tinggi ujung kiri dan kanan sisi atas diukur tegak lurus dari alas. */
export const tinggiAtas = (d: DataSejajar): [number, number] => [d.titik[3][1] - d.titik[0][1], d.titik[2][1] - d.titik[1][1]];
export const atasSejajar = (d: DataSejajar): boolean => {
  const [a, b] = tinggiAtas(d);
  return a === b;
};
/** Sisi kiri (dari kiri bawah ke kiri atas) dan sisi kanan (dari kanan bawah ke kanan atas): pergeseran dan kenaikan. */
export const arahKiri = (d: DataSejajar): [number, number] => [d.titik[3][0] - d.titik[0][0], d.titik[3][1] - d.titik[0][1]];
export const arahKanan = (d: DataSejajar): [number, number] => [d.titik[2][0] - d.titik[1][0], d.titik[2][1] - d.titik[1][1]];
export const kiriSejajar = (d: DataSejajar): boolean => {
  const [a, b] = arahKiri(d);
  const [c, e] = arahKanan(d);
  return a * e === b * c;
};
export const banyakSejajar = (d: DataSejajar): number => (atasSejajar(d) ? 1 : 0) + (kiriSejajar(d) ? 1 : 0);
export const adalahTrapesium = (d: DataSejajar): boolean => banyakSejajar(d) >= 1;

export type DataTangga = { a: Bangun; b: Bangun };
export const DATA_TANGGA: DataTangga[] = [
  { a: "jajargenjang", b: "trapesium" },
  { a: "persegi-panjang", b: "jajargenjang" },
  { a: "belah-ketupat", b: "jajargenjang" },
  { a: "persegi", b: "persegi-panjang" },
  { a: "persegi", b: "belah-ketupat" },
  { a: "belah-ketupat", b: "layang-layang" },
  { a: "trapesium", b: "jajargenjang" },
  { a: "persegi-panjang", b: "belah-ketupat" },
  { a: "layang-layang", b: "belah-ketupat" },
  { a: "persegi", b: "trapesium" },
];

export const idCiri = (i: number): string => `ciri:${i}`;
export const idSejajar = (i: number): string => `sejajar:${i}`;
export const idTangga = (i: number): string => `tangga:${i}`;

const catat = (daftar: string[], ...id: string[]): string[] => id.reduce((a, v) => (a.includes(v) ? a : [...a, v]), daftar);
const sah = (i: number, n: number): boolean => Number.isInteger(i) && i >= 0 && i < n;
const kecil = (t: string): string => `${t[0].toLowerCase()}${t.slice(1)}`;
const geser = (dx: number): string => (dx === 0 ? "tidak bergeser" : `bergeser ${Math.abs(dx)} ke ${dx > 0 ? "kanan" : "kiri"}`);

/* ------------------------------ Keadaan ------------------------------ */

export type StateSegiempatK5B7B = {
  ciri: { data: number; periksa: number[] };
  sejajar: { data: number; atas: boolean; kiri: boolean };
  tangga: { data: number };
  pernah: string[];
  pesan: string;
};

export type AksiSegiempatK5B7B =
  | { t: "C_DATA"; i: number }
  | { t: "C_PERIKSA"; k: number }
  | { t: "C_NAMA"; jawab: string }
  | { t: "J_DATA"; i: number }
  | { t: "J_ATAS" }
  | { t: "J_KIRI" }
  | { t: "J_JAWAB"; jawab: string }
  | { t: "T_DATA"; i: number }
  | { t: "T_JAWAB"; jawab: string }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

export const awalSegiempatK5B7B = (): StateSegiempatK5B7B => ({
  ciri: { data: 0, periksa: [] },
  sejajar: { data: 0, atas: false, kiri: false },
  tangga: { data: 0 },
  pernah: [],
  pesan: "",
});

export const bangunCiri = (x: StateSegiempatK5B7B): Bangun => BANGUN[x.ciri.data];
export const dataSejajar = (x: StateSegiempatK5B7B): DataSejajar => DATA_SEJAJAR[x.sejajar.data];
export const dataTangga = (x: StateSegiempatK5B7B): DataTangga => DATA_TANGGA[x.tangga.data];

function periksaCiri(x: StateSegiempatK5B7B, k: number): StateSegiempatK5B7B {
  if (!sah(k, CIRI.length)) return x;
  const b = bangunCiri(x);
  const punya = CIRI_BANGUN[b][k];
  const periksa = x.ciri.periksa.includes(k) ? x.ciri.periksa : [...x.ciri.periksa, k];
  return { ...x, ciri: { ...x.ciri, periksa }, pesan: `${CIRI[k]}: ${punya ? "ya, dimiliki" : "tidak dimiliki"} ${NAMA_BANGUN[b]}.` };
}

function namaiBangun(x: StateSegiempatK5B7B, jawab: string): StateSegiempatK5B7B {
  if (!(BANGUN as string[]).includes(jawab)) return x;
  if (x.ciri.periksa.length < CIRI.length) return { ...x, pesan: "Periksa dulu keenam ciri, baru beri nama bangunnya." };
  const b = bangunCiri(x);
  const benar = namaTepat(CIRI_BANGUN[b]);
  if (jawab === benar) {
    const juga = BANGUN.filter((o) => o !== b && termasuk(b, o)).map((o) => NAMA_BANGUN[o]);
    const tambah = juga.length > 0 ? ` Bangun ini juga termasuk ${juga.join(", ")}.` : " Bangun ini tidak termasuk golongan bangun lain di sini.";
    return { ...x, pernah: catat(x.pernah, idCiri(x.ciri.data)), pesan: `✅ Nama yang paling tepat: ${NAMA_BANGUN[b]}.${tambah}` };
  }
  return { ...x, pesan: "Lihat ciri yang dimiliki. Nama yang paling tepat adalah golongan yang cirinya paling lengkap cocok dengan bangun ini." };
}

function ujiAtas(x: StateSegiempatK5B7B): StateSegiempatK5B7B {
  const d = dataSejajar(x);
  const [a, b] = tinggiAtas(d);
  return {
    ...x,
    sejajar: { ...x.sejajar, atas: true },
    pesan: a === b ? `Garis tegak lurus dari kedua ujung sisi atas ke alas panjangnya ${a} dan ${b}. Jaraknya sama, jadi sisi atas sejajar dengan alas.` : `Garis tegak lurus dari kedua ujung sisi atas ke alas panjangnya ${a} dan ${b}. Jaraknya berbeda, jadi sisi atas tidak sejajar dengan alas.`,
  };
}

function ujiKiri(x: StateSegiempatK5B7B): StateSegiempatK5B7B {
  const d = dataSejajar(x);
  const [a, b] = arahKiri(d);
  const [c, e] = arahKanan(d);
  const awal = `Sisi kiri naik ${b} dan ${geser(a)}. Sisi kanan naik ${e} dan ${geser(c)}.`;
  return { ...x, sejajar: { ...x.sejajar, kiri: true }, pesan: kiriSejajar(d) ? `${awal} Arahnya sama, jadi sisi kiri sejajar dengan sisi kanan.` : `${awal} Arahnya berbeda, jadi sisi kiri tidak sejajar dengan sisi kanan.` };
}

function jawabSejajar(x: StateSegiempatK5B7B, jawab: string): StateSegiempatK5B7B {
  if (jawab !== "ya" && jawab !== "tidak") return x;
  if (!x.sejajar.atas || !x.sejajar.kiri) return { ...x, pesan: "Uji dulu sisi atas dan sisi kiri dengan sisi kanan, baru putuskan." };
  const d = dataSejajar(x);
  const trap = adalahTrapesium(d);
  if ((jawab === "ya") === trap) {
    return { ...x, pernah: catat(x.pernah, idSejajar(x.sejajar.data)), pesan: `✅ ${d.nama}: ada ${banyakSejajar(d)} pasang sisi sejajar. ${trap ? "Setidaknya sepasang sejajar, jadi termasuk trapesium." : ""} ${d.tambahan}`.replace(/\s{2,}/g, " ").trim() };
  }
  return { ...x, pesan: trap ? "Trapesium cukup punya setidaknya sepasang sisi sejajar. Bangun ini punya, jadi termasuk trapesium." : "Tidak ada sepasang sisi yang sejajar. Itu berarti bukan trapesium." };
}

function jawabTangga(x: StateSegiempatK5B7B, jawab: string): StateSegiempatK5B7B {
  if (jawab !== "ya" && jawab !== "tidak") return x;
  const d = dataTangga(x);
  const ya = termasuk(d.a, d.b);
  if ((jawab === "ya") === ya) {
    const penentu = DEFINISI[d.b].map((k) => kecil(CIRI[k])).join(" dan ");
    const hilang = DEFINISI[d.b].find((k) => !CIRI_BANGUN[d.a][k]);
    const pesan = ya
      ? `✅ ${NAMA_BANGUN[d.a]} punya semua ciri ${NAMA_BANGUN[d.b]}: ${penentu}. Jadi ${NAMA_BANGUN[d.a]} termasuk ${NAMA_BANGUN[d.b]}.`
      : `✅ ${NAMA_BANGUN[d.a]} tidak punya ciri ${kecil(CIRI[hilang ?? 0])}, jadi bukan ${NAMA_BANGUN[d.b]}. Hubungannya tidak berlaku sebaliknya.`;
    return { ...x, pernah: catat(x.pernah, idTangga(x.tangga.data)), pesan };
  }
  return { ...x, pesan: ya ? `Periksa ciri penentu ${NAMA_BANGUN[d.b]}. Apakah ${NAMA_BANGUN[d.a]} memilikinya semua?` : `Periksa ciri penentu ${NAMA_BANGUN[d.b]}. Adakah ciri yang tidak dimiliki ${NAMA_BANGUN[d.a]}?` };
}

export function langkahSegiempatK5B7B(x: StateSegiempatK5B7B, a: AksiSegiempatK5B7B): StateSegiempatK5B7B {
  switch (a.t) {
    case "C_DATA":
      return sah(a.i, BANGUN.length) ? { ...x, ciri: { data: a.i, periksa: [] }, pesan: "" } : x;
    case "C_PERIKSA":
      return periksaCiri(x, a.k);
    case "C_NAMA":
      return namaiBangun(x, a.jawab);
    case "J_DATA":
      return sah(a.i, DATA_SEJAJAR.length) ? { ...x, sejajar: { data: a.i, atas: false, kiri: false }, pesan: "" } : x;
    case "J_ATAS":
      return ujiAtas(x);
    case "J_KIRI":
      return ujiKiri(x);
    case "J_JAWAB":
      return jawabSejajar(x, a.jawab);
    case "T_DATA":
      return sah(a.i, DATA_TANGGA.length) ? { ...x, tangga: { data: a.i }, pesan: "" } : x;
    case "T_JAWAB":
      return jawabTangga(x, a.jawab);
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalSegiempatK5B7B();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanSegiempatK5B7B = { alat: "segiempat"; pernah: string[] };
export const keadaanSegiempatK5B7B = (x: StateSegiempatK5B7B): KeadaanSegiempatK5B7B => ({ alat: "segiempat", pernah: x.pernah });

export const ucapCiriK5B7B = (x: StateSegiempatK5B7B): string => `Periksa keenam ciri ${NAMA_BANGUN[bangunCiri(x)]}, lalu beri nama yang paling tepat. Sudah diperiksa ${x.ciri.periksa.length} dari ${CIRI.length}.`;
export const ucapSejajarK5B7B = (x: StateSegiempatK5B7B): string => `Uji ${dataSejajar(x).nama}: sisi atas dengan alas, lalu sisi kiri dengan sisi kanan. Apakah bangun ini trapesium?`;
export const ucapTanggaK5B7B = (x: StateSegiempatK5B7B): string => {
  const d = dataTangga(x);
  return `Apakah ${NAMA_BANGUN[d.a]} termasuk ${NAMA_BANGUN[d.b]}?`;
};
