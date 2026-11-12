/**
 * Lab Segitiga (Kelas 5 Bab 7, Sub-Bab A: Membandingkan Ciri-Ciri Segitiga): logika murni. Satu alat, tiga tampilan.
 *  Sedotan : tiga sedotan diuji pasangan demi pasangan, jumlah dua sisi harus lebih dari sisi ketiga
 *            (Triangle Inequality Theorem).
 *  Sudut   : dua sudut diketahui, sudut ketiga dicari dari jumlah tiga sudut dalam 180 derajat (Angle Sum Property),
 *            lalu jenis segitiga menurut sudut (Side-Angle Classification).
 *  Sisi    : sisi diimpitkan untuk menentukan sama kaki, sama sisi, atau sembarang, lalu hierarki inklusif:
 *            segitiga sama sisi juga sama kaki, tetapi sama kaki belum tentu sama sisi (Inclusive Triangle Hierarchy).
 * Data dari Buku Siswa Kelas V Bab 7 Sub-Bab A (Eksplorasi 7.1A sampai 7.1D: sedotan 5, 6, 7 dan 5, 4, 12, jumlah sudut 180).
 * Tidak menyentuh segi empat, sisi sejajar, atau diagonal (itu Sub-Bab B). Murni: tanpa React, tanpa jaringan, tanpa impor.
 * Diuji di scripts/uji-lab-k5b7.mjs.
 */

export const SIKU = 90;
export const JUMLAH_SUDUT = 180;
export type JenisSudut = "lancip" | "siku" | "tumpul";
export type JenisSisi = "sama-kaki" | "sama-sisi" | "sembarang";
export const JENIS_SUDUT: JenisSudut[] = ["lancip", "siku", "tumpul"];
export const JENIS_SISI: JenisSisi[] = ["sama-kaki", "sama-sisi", "sembarang"];
export const NAMA_JENIS_SISI: Record<JenisSisi, string> = { "sama-kaki": "sama kaki", "sama-sisi": "sama sisi", sembarang: "sembarang" };

export type DataSedotan = { nama: string; sisi: [number, number, number] };
export type DataSudut = { nama: string; p: number; q: number };
export type DataSisi = { nama: string; sisi: [number, number, number] };

export const DATA_SEDOTAN: DataSedotan[] = [
  { nama: "sedotan Asep 5, 6, dan 7", sisi: [5, 6, 7] },
  { nama: "sedotan Lukas 5, 4, dan 12", sisi: [5, 4, 12] },
  { nama: "sedotan Nisa 3, 4, dan 7", sisi: [3, 4, 7] },
  { nama: "sedotan Komang 6, 6, dan 6", sisi: [6, 6, 6] },
  { nama: "sedotan Yohana 4, 4, dan 9", sisi: [4, 4, 9] },
  { nama: "sedotan Sitti 7, 8, dan 10", sisi: [7, 8, 10] },
];
export const DATA_SUDUT: DataSudut[] = [
  { nama: "potongan kertas pertama", p: 50, q: 60 },
  { nama: "potongan kertas kedua", p: 40, q: 50 },
  { nama: "potongan kertas ketiga", p: 30, q: 40 },
  { nama: "potongan kertas keempat", p: 90, q: 90 },
  { nama: "potongan kertas kelima", p: 100, q: 100 },
  { nama: "potongan kertas keenam", p: 60, q: 60 },
];
export const DATA_SISI: DataSisi[] = [
  { nama: "hiasan atap", sisi: [5, 5, 8] },
  { nama: "hiasan gapura", sisi: [6, 6, 6] },
  { nama: "hiasan pagar", sisi: [4, 5, 7] },
  { nama: "hiasan pintu", sisi: [7, 4, 7] },
  { nama: "hiasan tangga", sisi: [9, 9, 9] },
  { nama: "hiasan menara", sisi: [10, 6, 9] },
];

export const idSedotan = (i: number): string => `sedotan:${i}`;
export const idSudut = (i: number): string => `sudut:${i}`;
export const idSisi = (i: number): string => `sisi:${i}`;
export const idHier = (i: number): string => `hier:${i}`;

const catat = (daftar: string[], ...id: string[]): string[] => id.reduce((a, v) => (a.includes(v) ? a : [...a, v]), daftar);
const sah = (i: number, n: number): boolean => Number.isInteger(i) && i >= 0 && i < n;

/* ------------------------------ Hitungan murni ------------------------------ */

/** Pasangan uji ke-k: dua sisi yang dijumlahkan dan sisi ketiga sebagai lawannya. k = 0: a+b lawan c, 1: a+c lawan b, 2: b+c lawan a. */
export function ujiPasangan(sisi: [number, number, number], k: number): { dua: [number, number]; lawan: number; jumlah: number; lolos: boolean } {
  const [a, b, c] = sisi;
  const dua: [number, number] = k === 0 ? [a, b] : k === 1 ? [a, c] : [b, c];
  const lawan = k === 0 ? c : k === 1 ? b : a;
  const jumlah = dua[0] + dua[1];
  return { dua, lawan, jumlah, lolos: jumlah > lawan };
}
export const bisaSegitiga = (sisi: [number, number, number]): boolean => [0, 1, 2].every((k) => ujiPasangan(sisi, k).lolos);
export const banyakLolos = (sisi: [number, number, number]): number => [0, 1, 2].filter((k) => ujiPasangan(sisi, k).lolos).length;

export const sudutKetiga = (p: number, q: number): number => JUMLAH_SUDUT - p - q;
export const sudutBisa = (p: number, q: number): boolean => sudutKetiga(p, q) > 0;
export function jenisSudut(p: number, q: number): JenisSudut | null {
  const r = sudutKetiga(p, q);
  if (r <= 0) return null;
  const terbesar = Math.max(p, q, r);
  return terbesar > SIKU ? "tumpul" : terbesar === SIKU ? "siku" : "lancip";
}

/** Banyak pasangan sisi yang sama panjang: 3 sama sisi, 1 sama kaki, 0 sembarang. */
export function pasanganSama(sisi: [number, number, number]): number {
  const [a, b, c] = sisi;
  return (a === b ? 1 : 0) + (a === c ? 1 : 0) + (b === c ? 1 : 0);
}
export const jenisSisi = (sisi: [number, number, number]): JenisSisi => {
  const n = pasanganSama(sisi);
  return n === 3 ? "sama-sisi" : n === 1 ? "sama-kaki" : "sembarang";
};
export const simetriLipat = (j: JenisSisi): number => (j === "sama-sisi" ? 3 : j === "sama-kaki" ? 1 : 0);
/** Pasangan sisi yang diimpitkan pada langkah ke-k: 0: a dan b, 1: a dan c, 2: b dan c. */
export const pasanganImpit = (sisi: [number, number, number], k: number): [number, number] => (k === 0 ? [sisi[0], sisi[1]] : k === 1 ? [sisi[0], sisi[2]] : [sisi[1], sisi[2]]);

export type Hierarki = { tanya: string; jawab: "ya" | "tidak" };
export function hierarki(j: JenisSisi): Hierarki {
  if (j === "sama-sisi") return { tanya: "Apakah segitiga sama sisi ini juga termasuk sama kaki?", jawab: "ya" };
  if (j === "sama-kaki") return { tanya: "Apakah segitiga sama kaki ini pasti sama sisi?", jawab: "tidak" };
  return { tanya: "Apakah segitiga sembarang ini termasuk sama kaki?", jawab: "tidak" };
}

/* ------------------------------ Keadaan ------------------------------ */

export type StateSegitigaK5B7A = {
  sedotan: { data: number; uji: number[] };
  sudut: { data: number; hitung: boolean };
  sisi: { data: number; impit: number[] };
  pernah: string[];
  pesan: string;
};

export type AksiSegitigaK5B7A =
  | { t: "S_DATA"; i: number }
  | { t: "S_UJI"; k: number }
  | { t: "S_JAWAB"; jawab: string }
  | { t: "U_DATA"; i: number }
  | { t: "U_HITUNG" }
  | { t: "U_JAWAB"; jawab: string }
  | { t: "I_DATA"; i: number }
  | { t: "I_IMPIT"; k: number }
  | { t: "I_JAWAB"; jawab: string }
  | { t: "I_HIER"; jawab: string }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

export const awalSegitigaK5B7A = (): StateSegitigaK5B7A => ({
  sedotan: { data: 0, uji: [] },
  sudut: { data: 0, hitung: false },
  sisi: { data: 0, impit: [] },
  pernah: [],
  pesan: "",
});

export const dataSedotan = (x: StateSegitigaK5B7A): DataSedotan => DATA_SEDOTAN[x.sedotan.data];
export const dataSudut = (x: StateSegitigaK5B7A): DataSudut => DATA_SUDUT[x.sudut.data];
export const dataSisi = (x: StateSegitigaK5B7A): DataSisi => DATA_SISI[x.sisi.data];

function ujiSedotan(x: StateSegitigaK5B7A, k: number): StateSegitigaK5B7A {
  if (!sah(k, 3)) return x;
  const u = ujiPasangan(dataSedotan(x).sisi, k);
  const uji = x.sedotan.uji.includes(k) ? x.sedotan.uji : [...x.sedotan.uji, k];
  const pesan = u.lolos
    ? `${u.dua[0]} + ${u.dua[1]} = ${u.jumlah}, lebih dari ${u.lawan}. Pasangan ini lolos.`
    : u.jumlah === u.lawan
      ? `${u.dua[0]} + ${u.dua[1]} = ${u.jumlah}, sama dengan ${u.lawan}. Kedua sedotan hanya menjadi garis lurus. Pasangan ini gagal.`
      : `${u.dua[0]} + ${u.dua[1]} = ${u.jumlah}, kurang dari ${u.lawan}. Kedua sedotan tidak sampai menutup. Pasangan ini gagal.`;
  return { ...x, sedotan: { ...x.sedotan, uji }, pesan };
}

function jawabSedotan(x: StateSegitigaK5B7A, jawab: string): StateSegitigaK5B7A {
  if (jawab !== "bisa" && jawab !== "tidak") return x;
  if (x.sedotan.uji.length < 3) return { ...x, pesan: "Uji dulu ketiga pasangan sisi, baru putuskan." };
  const d = dataSedotan(x);
  const bisa = bisaSegitiga(d.sisi);
  if ((jawab === "bisa") === bisa) {
    return {
      ...x,
      pernah: catat(x.pernah, idSedotan(x.sedotan.data)),
      pesan: bisa
        ? `✅ ${d.nama}: ketiga pasangan lolos, jadi bisa menjadi segitiga.`
        : `✅ ${d.nama}: ada pasangan yang gagal, jadi tidak bisa menjadi segitiga. Satu saja gagal sudah cukup.`,
    };
  }
  return { ...x, pesan: bisa ? "Ketiga pasangan lolos uji. Sedotan itu bisa menutup menjadi segitiga." : "Ada pasangan yang gagal. Satu pasangan gagal berarti sedotan tidak bisa menutup." };
}

function hitungSudut(x: StateSegitigaK5B7A): StateSegitigaK5B7A {
  const d = dataSudut(x);
  const r = sudutKetiga(d.p, d.q);
  const pesan =
    r > 0
      ? `Sudut ketiga = ${JUMLAH_SUDUT}° − ${d.p}° − ${d.q}° = ${r}°.`
      : r === 0
        ? `${JUMLAH_SUDUT}° − ${d.p}° − ${d.q}° = 0°. Tidak ada sisa untuk sudut ketiga.`
        : `Kedua sudut itu sudah ${d.p + d.q}°, lebih dari ${JUMLAH_SUDUT}°. Tidak ada sisa untuk sudut ketiga.`;
  return { ...x, sudut: { ...x.sudut, hitung: true }, pesan };
}

function jawabSudut(x: StateSegitigaK5B7A, jawab: string): StateSegitigaK5B7A {
  if (jawab !== "bukan" && !(JENIS_SUDUT as string[]).includes(jawab)) return x;
  if (!x.sudut.hitung) return { ...x, pesan: "Hitung dulu sudut ketiganya, baru tentukan." };
  const d = dataSudut(x);
  const benar = jenisSudut(d.p, d.q) ?? "bukan";
  if (jawab === benar) {
    const r = sudutKetiga(d.p, d.q);
    const pesan =
      benar === "bukan"
        ? `✅ ${d.nama}: tidak ada sisa sudut, jadi bukan segitiga. Dalam satu segitiga tidak ada dua sudut siku-siku dan tidak ada dua sudut tumpul.`
        : benar === "siku"
          ? `✅ ${d.nama}: sudutnya ${d.p}°, ${d.q}°, dan ${r}°. Ada satu sudut siku-siku, jadi segitiga siku-siku.`
          : benar === "tumpul"
            ? `✅ ${d.nama}: sudutnya ${d.p}°, ${d.q}°, dan ${r}°. Ada satu sudut tumpul, jadi segitiga tumpul.`
            : `✅ ${d.nama}: sudutnya ${d.p}°, ${d.q}°, dan ${r}°. Ketiganya lancip, jadi segitiga lancip.`;
    return { ...x, pernah: catat(x.pernah, idSudut(x.sudut.data)), pesan };
  }
  if (benar === "bukan") return { ...x, pesan: "Sudut ketiganya tidak ada, karena dua sudut itu sudah menghabiskan 180°. Itu bukan segitiga." };
  if (jawab === "bukan") return { ...x, pesan: "Sudut ketiganya ada dan hasilnya lebih dari nol. Itu segitiga. Tentukan jenisnya dari sudut terbesar." };
  return { ...x, pesan: "Lihat sudut yang paling besar dari ketiganya. Lebih kecil dari patokan siku-siku berarti lancip, sama dengan patokan siku-siku, lebih besar berarti tumpul." };
}

function impit(x: StateSegitigaK5B7A, k: number): StateSegitigaK5B7A {
  if (!sah(k, 3)) return x;
  const [u, v] = pasanganImpit(dataSisi(x).sisi, k);
  const imp = x.sisi.impit.includes(k) ? x.sisi.impit : [...x.sisi.impit, k];
  return { ...x, sisi: { ...x.sisi, impit: imp }, pesan: u === v ? `Sisi ${u} dan sisi ${v} berimpit rapi. Panjangnya sama.` : `Sisi ${u} dan sisi ${v} tidak berimpit. Panjangnya berbeda.` };
}

function jawabJenisSisi(x: StateSegitigaK5B7A, jawab: string): StateSegitigaK5B7A {
  if (!(JENIS_SISI as string[]).includes(jawab)) return x;
  if (x.sisi.impit.length < 3) return { ...x, pesan: "Impitkan dulu ketiga pasangan sisi, baru tentukan jenisnya." };
  const d = dataSisi(x);
  const benar = jenisSisi(d.sisi);
  if (jawab === benar) {
    const tambah =
      benar === "sama-sisi"
        ? `Ketiga sisi sama panjang, tiap sudut ${JUMLAH_SUDUT}° ÷ 3 = ${JUMLAH_SUDUT / 3}°. Ada ${simetriLipat(benar)} simetri lipat.`
        : benar === "sama-kaki"
          ? `Dua sisi sama panjang, dan sudut di depan kedua kaki itu juga sama besar. Ada ${simetriLipat(benar)} simetri lipat.`
          : "Semua sisi berbeda, dan segitiga ini tidak punya simetri lipat.";
    return { ...x, pernah: catat(x.pernah, idSisi(x.sisi.data)), pesan: `✅ ${d.nama}: segitiga ${NAMA_JENIS_SISI[benar]}. ${tambah}` };
  }
  const n = pasanganSama(d.sisi);
  const hint = n === 3 ? "Ketiga sisi berimpit semua." : n === 1 ? "Hanya satu pasang sisi yang berimpit." : "Tidak ada pasangan sisi yang berimpit.";
  return { ...x, pesan: `${hint} Hitung pasangan yang berimpit, lalu tentukan jenisnya.` };
}

function jawabHier(x: StateSegitigaK5B7A, jawab: string): StateSegitigaK5B7A {
  if (jawab !== "ya" && jawab !== "tidak") return x;
  const i = x.sisi.data;
  if (!x.pernah.includes(idSisi(i))) return { ...x, pesan: "Tentukan dulu jenis segitiga menurut sisinya." };
  const j = jenisSisi(DATA_SISI[i].sisi);
  const h = hierarki(j);
  if (jawab === h.jawab) {
    const alasan =
      j === "sama-sisi"
        ? "Semua ciri sama kaki dimiliki segitiga sama sisi, jadi segitiga sama sisi juga digolongkan sama kaki. Tetapi sama kaki belum tentu sama sisi."
        : j === "sama-kaki"
          ? "Sama kaki hanya butuh dua sisi sama. Ketiga sisinya belum tentu sama, jadi belum tentu sama sisi."
          : "Segitiga sembarang tidak punya dua sisi sama panjang, jadi bukan sama kaki.";
    return { ...x, pernah: catat(x.pernah, idHier(i)), pesan: `✅ ${alasan}` };
  }
  return { ...x, pesan: j === "sama-sisi" ? "Periksa ciri sama kaki: dua sisi sama panjang. Apakah segitiga sama sisi memilikinya?" : j === "sama-kaki" ? "Sama kaki cukup dua sisi sama. Apakah itu menjamin ketiganya sama?" : "Periksa: adakah dua sisi yang sama panjang pada segitiga sembarang?" };
}

export function langkahSegitigaK5B7A(x: StateSegitigaK5B7A, a: AksiSegitigaK5B7A): StateSegitigaK5B7A {
  switch (a.t) {
    case "S_DATA":
      return sah(a.i, DATA_SEDOTAN.length) ? { ...x, sedotan: { data: a.i, uji: [] }, pesan: "" } : x;
    case "S_UJI":
      return ujiSedotan(x, a.k);
    case "S_JAWAB":
      return jawabSedotan(x, a.jawab);
    case "U_DATA":
      return sah(a.i, DATA_SUDUT.length) ? { ...x, sudut: { data: a.i, hitung: false }, pesan: "" } : x;
    case "U_HITUNG":
      return hitungSudut(x);
    case "U_JAWAB":
      return jawabSudut(x, a.jawab);
    case "I_DATA":
      return sah(a.i, DATA_SISI.length) ? { ...x, sisi: { data: a.i, impit: [] }, pesan: "" } : x;
    case "I_IMPIT":
      return impit(x, a.k);
    case "I_JAWAB":
      return jawabJenisSisi(x, a.jawab);
    case "I_HIER":
      return jawabHier(x, a.jawab);
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalSegitigaK5B7A();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanSegitigaK5B7A = { alat: "segitiga"; pernah: string[] };
export const keadaanSegitigaK5B7A = (x: StateSegitigaK5B7A): KeadaanSegitigaK5B7A => ({ alat: "segitiga", pernah: x.pernah });

export const ucapSedotanK5B7A = (x: StateSegitigaK5B7A): string => {
  const d = dataSedotan(x);
  return `Ini ${d.nama}. Uji tiga pasangan: jumlah dua sisi harus lebih dari sisi ketiga. Sudah diuji ${x.sedotan.uji.length} dari 3.`;
};
export const ucapSudutK5B7A = (x: StateSegitigaK5B7A): string => {
  const d = dataSudut(x);
  return `${d.nama} punya dua sudut, ${d.p}° dan ${d.q}°. Jumlah tiga sudut dalam segitiga selalu ${JUMLAH_SUDUT}°. Cari sudut ketiga.`;
};
export const ucapSisiK5B7A = (x: StateSegitigaK5B7A): string => {
  const d = dataSisi(x);
  return `${d.nama} punya sisi ${d.sisi[0]}, ${d.sisi[1]}, dan ${d.sisi[2]}. Impitkan sisinya, lalu tentukan jenisnya. Sudah diimpit ${x.sisi.impit.length} dari 3.`;
};
