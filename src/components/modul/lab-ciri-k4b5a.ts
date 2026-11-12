/**
 * Lab Ciri (Kelas 4 Bab 5, Sub-Bab A): logika murni. Satu alat, tiga tampilan.
 *  Paku   : papan paku 5 × 5 (koordinat bulat 0 sampai 4). Anak mengetuk paku untuk memasang karet, lalu menutupnya.
 *           Lab menolak paku segaris dan karet bersilang. Ciri DIHITUNG dari koordinat: kuadrat panjang sisi (sisi sama),
 *           hasil kali titik (sudut lancip, siku, tumpul), hasil kali silang (sisi sejajar, sudut ke dalam). Nama bangun
 *           ditentukan dari ciri itu, bukan ditulis tangan.
 *  Pilah  : kelompokkan bangun menurut sudut, sisi, atau beraturan. Segitiga didefinisikan oleh panjang sisi bulat; jenis
 *           sudut dihitung dengan membandingkan kuadrat sisi terpanjang dengan jumlah kuadrat dua sisi lain. Bangun pada
 *           pilahan beraturan didefinisikan oleh panjang sisi dan besar sudut (derajat bulat).
 *  Kenali : tentukan gambar mana yang segi banyak (tertutup, semua ruas lurus, paling sedikit tiga) dan beri nama menurut
 *           banyak sisinya.
 * Semua bilangan bulat. Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k4b5.mjs.
 */

export const UKURAN_PAPAN = 5;
export const MAKS_PAKU = 6;

export type Titik = { x: number; y: number };
export const titikPaku = (i: number): Titik => ({ x: i % UKURAN_PAPAN, y: Math.floor(i / UKURAN_PAPAN) });

const kurang = (a: Titik, b: Titik): Titik => ({ x: a.x - b.x, y: a.y - b.y });
const silang = (a: Titik, b: Titik): number => a.x * b.y - a.y * b.x;
const titikKali = (a: Titik, b: Titik): number => a.x * b.x + a.y * b.y;
const panjang2 = (a: Titik): number => a.x * a.x + a.y * a.y;
const arah = (a: Titik, b: Titik, c: Titik): number => Math.sign(silang(kurang(b, a), kurang(c, a)));
const diRuas = (a: Titik, b: Titik, c: Titik): boolean => Math.min(a.x, b.x) <= c.x && c.x <= Math.max(a.x, b.x) && Math.min(a.y, b.y) <= c.y && c.y <= Math.max(a.y, b.y);

/** Dua ruas garis bersentuhan atau berpotongan (uji orientasi bilangan bulat). */
export function ruasBertemu(p1: Titik, p2: Titik, q1: Titik, q2: Titik): boolean {
  const d1 = arah(q1, q2, p1);
  const d2 = arah(q1, q2, p2);
  const d3 = arah(p1, p2, q1);
  const d4 = arah(p1, p2, q2);
  if (d1 * d2 < 0 && d3 * d4 < 0) return true;
  if (d1 === 0 && diRuas(q1, q2, p1)) return true;
  if (d2 === 0 && diRuas(q1, q2, p2)) return true;
  if (d3 === 0 && diRuas(p1, p2, q1)) return true;
  if (d4 === 0 && diRuas(p1, p2, q2)) return true;
  return false;
}

export type JenisSudut = "lancip" | "siku" | "tumpul" | "ke dalam";

export type Bangun = {
  /** Id jenis untuk riwayat, misalnya "persegi", "segitiga-siku". */
  jenis: string;
  nama: string;
  sisi: number;
  /** Kuadrat panjang tiap sisi (sisi ke-i dari titik i ke titik i + 1). */
  panjang2: number[];
  sudut: JenisSudut[];
  siku: number;
  /** Banyak pasang sisi berhadapan yang sejajar (hanya segiempat; selain itu 0). */
  sejajar: number;
  cekung: boolean;
  beraturan: boolean;
  /** Ciri sisi segitiga. */
  ciriSisi?: "sama sisi" | "sama kaki" | "sembarang";
};

export type HasilPaku = { sah: true; bangun: Bangun } | { sah: false; alasan: "kurang" | "segaris" | "silang" };

/** Periksa karet di papan paku dan hitung semua cirinya dari koordinat. */
export function periksaKaret(p: Titik[]): HasilPaku {
  const n = p.length;
  if (n < 3) return { sah: false, alasan: "kurang" };
  const ke = (i: number) => p[((i % n) + n) % n];
  // Tiga paku berurutan yang segaris: titik tengah bukan sudut (atau karet berbalik arah).
  for (let i = 0; i < n; i += 1) if (silang(kurang(ke(i), ke(i - 1)), kurang(ke(i + 1), ke(i))) === 0) return { sah: false, alasan: "segaris" };
  // Dua sisi yang tidak bersebelahan tidak boleh bertemu.
  for (let i = 0; i < n; i += 1)
    for (let j = i + 1; j < n; j += 1) {
      if (j === i + 1 || (i === 0 && j === n - 1)) continue;
      if (ruasBertemu(ke(i), ke(i + 1), ke(j), ke(j + 1))) return { sah: false, alasan: "silang" };
    }
  let luas2 = 0;
  for (let i = 0; i < n; i += 1) luas2 += silang(ke(i), ke(i + 1));
  const putar = Math.sign(luas2);
  const pj = Array.from({ length: n }, (_, i) => panjang2(kurang(ke(i + 1), ke(i))));
  const kaliTitik: number[] = [];
  const sudut: JenisSudut[] = Array.from({ length: n }, (_, i) => {
    const a = kurang(ke(i - 1), ke(i));
    const b = kurang(ke(i + 1), ke(i));
    kaliTitik.push(titikKali(a, b));
    if (Math.sign(silang(kurang(ke(i), ke(i - 1)), kurang(ke(i + 1), ke(i)))) !== putar) return "ke dalam";
    const d = titikKali(a, b);
    return d > 0 ? "lancip" : d === 0 ? "siku" : "tumpul";
  });
  const cekung = sudut.includes("ke dalam");
  const siku = sudut.filter((s) => s === "siku").length;
  const semuaSisiSama = pj.every((v) => v === pj[0]);
  const beraturan = !cekung && semuaSisiSama && kaliTitik.every((v) => v === kaliTitik[0]);
  let sejajar = 0;
  if (n === 4) for (const i of [0, 1]) if (silang(kurang(ke(i + 1), ke(i)), kurang(ke(i + 3), ke(i + 2))) === 0) sejajar += 1;
  const dasar = { sisi: n, panjang2: pj, sudut, siku, sejajar, cekung, beraturan };
  if (n === 3) {
    const beda = new Set(pj).size;
    const ciriSisi = beda === 1 ? "sama sisi" : beda === 2 ? "sama kaki" : "sembarang";
    const jenisS = sudut.includes("siku") ? "siku" : sudut.includes("tumpul") ? "tumpul" : "lancip";
    const nama = jenisS === "siku" ? "segitiga siku-siku" : `segitiga ${jenisS}`;
    return { sah: true, bangun: { ...dasar, jenis: `segitiga-${jenisS}`, nama, ciriSisi } };
  }
  if (n === 4) {
    let jenis: string;
    if (cekung) jenis = "segiempat";
    else if (sejajar === 2) jenis = siku === 4 && semuaSisiSama ? "persegi" : siku === 4 ? "persegi-panjang" : semuaSisiSama ? "belah-ketupat" : "jajargenjang";
    else if (sejajar === 1) jenis = "trapesium";
    else jenis = (pj[0] === pj[1] && pj[2] === pj[3]) || (pj[1] === pj[2] && pj[3] === pj[0]) ? "layang-layang" : "segiempat";
    const nama = jenis === "segiempat" ? "segiempat tak beraturan" : jenis.replace("-", " ").replace("layang layang", "layang-layang");
    return { sah: true, bangun: { ...dasar, jenis, nama } };
  }
  const jenis = n === 5 ? "segilima" : "segienam";
  return { sah: true, bangun: { ...dasar, jenis, nama: `${jenis} ${beraturan ? "beraturan" : "tak beraturan"}` } };
}

/* ------------------------------ Pilah ------------------------------ */

export type ModePilah = "sudut" | "sisi" | "beraturan";
export const MODE_PILAH: ModePilah[] = ["sudut", "sisi", "beraturan"];
export const NAMA_MODE: Record<ModePilah, string> = { sudut: "sudut", sisi: "sisi", beraturan: "beraturan atau tidak" };
export const KELOMPOK: Record<ModePilah, string[]> = {
  sudut: ["lancip", "siku-siku", "tumpul"],
  sisi: ["sama sisi", "sama kaki", "sembarang"],
  beraturan: ["beraturan", "tak beraturan"],
};

/** Bangun untuk Pilah: panjang sisi (cm) dan, untuk pilahan beraturan, besar sudut (derajat) di tiap titik. */
export type BangunPilah = { id: string; sisi: number[]; sudut?: number[] };
export const PILAH: Record<ModePilah, BangunPilah[]> = {
  sudut: [
    { id: "t345", sisi: [3, 4, 5] },
    { id: "t444", sisi: [4, 4, 4] },
    { id: "t357", sisi: [3, 5, 7] },
    { id: "t566", sisi: [5, 6, 6] },
    { id: "t6810", sisi: [6, 8, 10] },
    { id: "t558", sisi: [5, 5, 8] },
  ],
  sisi: [
    { id: "s444", sisi: [4, 4, 4] },
    { id: "s556", sisi: [5, 5, 6] },
    { id: "s456", sisi: [4, 5, 6] },
    { id: "s666", sisi: [6, 6, 6] },
    { id: "s345", sisi: [3, 4, 5] },
    { id: "s558", sisi: [5, 5, 8] },
  ],
  beraturan: [
    { id: "b-persegi", sisi: [4, 4, 4, 4], sudut: [90, 90, 90, 90] },
    { id: "b-belah", sisi: [4, 4, 4, 4], sudut: [60, 120, 60, 120] },
    { id: "b-segitiga", sisi: [4, 4, 4], sudut: [60, 60, 60] },
    { id: "b-pp", sisi: [5, 3, 5, 3], sudut: [90, 90, 90, 90] },
    { id: "b-segienam", sisi: [3, 3, 3, 3, 3, 3], sudut: [120, 120, 120, 120, 120, 120] },
    { id: "b-jajar", sisi: [5, 3, 5, 3], sudut: [60, 120, 60, 120] },
  ],
};

/** Jenis sudut segitiga dari panjang sisi: kuadrat sisi terpanjang dibanding jumlah kuadrat dua sisi lainnya. */
export function sudutSegitiga(s: number[]): "lancip" | "siku-siku" | "tumpul" {
  const [a, b, c] = [...s].sort((p, q) => p - q);
  const kiri = c * c;
  const kanan = a * a + b * b;
  return kiri === kanan ? "siku-siku" : kiri > kanan ? "tumpul" : "lancip";
}
export function sisiSegitiga(s: number[]): "sama sisi" | "sama kaki" | "sembarang" {
  const beda = new Set(s).size;
  return beda === 1 ? "sama sisi" : beda === 2 ? "sama kaki" : "sembarang";
}
export const beraturanPilah = (b: BangunPilah): boolean => b.sisi.every((v) => v === b.sisi[0]) && !!b.sudut && b.sudut.every((v) => v === b.sudut![0]);
/** Kelompok yang benar untuk bangun b pada mode m. */
export function kelompokBenar(m: ModePilah, b: BangunPilah): string {
  if (m === "sudut") return sudutSegitiga(b.sisi);
  if (m === "sisi") return sisiSegitiga(b.sisi);
  return beraturanPilah(b) ? "beraturan" : "tak beraturan";
}

/* ------------------------------ Kenali ------------------------------ */

/** Gambar Kenali: titik-titik jalur dan jenis tiap ruas (ruas ke-i dari titik i ke titik i + 1). */
export type GambarKenali = { id: string; titik: [number, number][]; lengkung: boolean[] };
export const KENALI: GambarKenali[] = [
  { id: "k-tiga", titik: [[0, 4], [2, 0], [4, 4], [0, 4]], lengkung: [false, false, false] },
  { id: "k-lingkaran", titik: [[0, 2], [4, 2], [0, 2]], lengkung: [true, true] },
  { id: "k-lima", titik: [[0, 2], [2, 0], [4, 2], [4, 4], [0, 4], [0, 2]], lengkung: [false, false, false, false, false] },
  { id: "k-terbuka", titik: [[0, 4], [1, 0], [3, 4], [4, 0]], lengkung: [false, false, false] },
  { id: "k-empat", titik: [[1, 1], [4, 1], [3, 3], [0, 3], [1, 1]], lengkung: [false, false, false, false] },
  { id: "k-setengah", titik: [[0, 1], [4, 1], [0, 1]], lengkung: [false, true] },
  { id: "k-enam", titik: [[1, 0], [3, 0], [4, 2], [3, 4], [1, 4], [0, 2], [1, 0]], lengkung: [false, false, false, false, false, false] },
];
export const KELOMPOK_KENALI = ["bukan", "3", "4", "5", "6"];
export const NAMA_KENALI: Record<string, string> = { bukan: "bukan segi banyak", "3": "segitiga", "4": "segiempat", "5": "segilima", "6": "segienam" };

export const tertutup = (g: GambarKenali): boolean => {
  const a = g.titik[0];
  const b = g.titik[g.titik.length - 1];
  return a[0] === b[0] && a[1] === b[1];
};
/** Segi banyak: tertutup, semua ruas lurus, paling sedikit tiga ruas. Kelompoknya banyak sisi, atau "bukan". */
export function kelompokKenali(g: GambarKenali): string {
  const ruas = g.titik.length - 1;
  if (!tertutup(g) || g.lengkung.some(Boolean) || ruas < 3) return "bukan";
  return String(ruas);
}

/* ------------------------------ Keadaan ------------------------------ */

export type Pilahan = { letak: (string | null)[]; dipilih: number | null };
const pilahanKosong = (n: number): Pilahan => ({ letak: Array.from({ length: n }, () => null), dipilih: null });

export type StateCiriK4B5A = {
  paku: number[];
  mode: number;
  pilah: Pilahan;
  kenali: Pilahan;
  pernah: string[];
  pesan: string;
};

export type AksiCiriK4B5A =
  | { t: "P_PAKU"; i: number }
  | { t: "P_HAPUS" }
  | { t: "P_BERSIH" }
  | { t: "P_CEK" }
  | { t: "S_MODE"; m: number }
  | { t: "S_PILIH"; i: number }
  | { t: "S_KE"; k: string }
  | { t: "S_ULANG" }
  | { t: "S_CEK" }
  | { t: "K_PILIH"; i: number }
  | { t: "K_KE"; k: string }
  | { t: "K_ULANG" }
  | { t: "K_CEK" }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

export const awalCiriK4B5A = (): StateCiriK4B5A => ({
  paku: [],
  mode: 0,
  pilah: pilahanKosong(PILAH.sudut.length),
  kenali: pilahanKosong(KENALI.length),
  pernah: [],
  pesan: "",
});

const tambah = (daftar: string[], id: string): string[] => (daftar.includes(id) ? daftar : [...daftar, id]);
const kapital = (t: string): string => `${t[0].toUpperCase()}${t.slice(1)}`;
export const modeAktif = (x: StateCiriK4B5A): ModePilah => MODE_PILAH[x.mode];

const PERIKSA_GAGAL: Record<"kurang" | "segaris" | "silang", string> = {
  kurang: "Karet belum menjadi bangun. Pasang karet di paling sedikit 3 paku.",
  segaris: "Ada 3 paku segaris. Paku di tengahnya bukan sudut, jadi karet itu bukan bangun yang kamu maksud. Geser salah satu paku.",
  silang: "Karet bersilang. Segi banyak dibatasi ruas garis yang tidak saling memotong. Ubah urutan pakunya.",
};

/** Kalimat ciri bangun, dihitung dari hasil periksa. */
export function kalimatCiri(b: Bangun): string {
  const bagian = [`${b.sisi} sisi dan ${b.sisi} sudut`];
  if (b.sisi === 3 && b.ciriSisi) bagian.push(`sisinya ${b.ciriSisi}`);
  if (b.sisi > 3 && b.panjang2.every((v) => v === b.panjang2[0])) bagian.push("semua sisi sama panjang");
  bagian.push(b.siku === 0 ? "tidak ada sudut siku-siku" : `${b.siku} sudut siku-siku`);
  if (b.sudut.includes("tumpul")) bagian.push(`${b.sudut.filter((s) => s === "tumpul").length} sudut tumpul`);
  if (b.cekung) bagian.push("ada sudut yang menjorok ke dalam");
  if (b.sisi === 4 && !b.cekung) bagian.push(b.sejajar === 0 ? "tidak ada sisi sejajar" : `${b.sejajar} pasang sisi sejajar`);
  return bagian.join(", ");
}

function cekPaku(x: StateCiriK4B5A): StateCiriK4B5A {
  const h = periksaKaret(x.paku.map(titikPaku));
  if (!h.sah) return { ...x, pernah: h.alasan === "kurang" ? x.pernah : tambah(x.pernah, h.alasan), pesan: PERIKSA_GAGAL[h.alasan] };
  const b = h.bangun;
  return { ...x, pernah: tambah(x.pernah, `paku:${b.jenis}`), pesan: `✅ ${kapital(b.nama)}: ${kalimatCiri(b)}.` };
}

function ketukPaku(x: StateCiriK4B5A, i: number): StateCiriK4B5A {
  if (!Number.isInteger(i) || i < 0 || i >= UKURAN_PAPAN * UKURAN_PAPAN) return x;
  const ada = x.paku.indexOf(i);
  if (ada === x.paku.length - 1 && ada >= 0) return { ...x, paku: x.paku.slice(0, -1), pesan: "" };
  if (ada === 0 && x.paku.length >= 3) return cekPaku(x);
  if (ada >= 0) return { ...x, pesan: "Paku itu sudah dipakai karet. Ketuk paku lain, atau ketuk paku pertama untuk menutup karet." };
  if (x.paku.length >= MAKS_PAKU) return { ...x, pesan: `Paling banyak ${MAKS_PAKU} paku. Ketuk paku pertama untuk menutup karet.` };
  return { ...x, paku: [...x.paku, i], pesan: "" };
}

type Sortir = { panjang: number; kelompok: string[]; benar: (i: number) => string };
const sortirPilah = (x: StateCiriK4B5A): Sortir => {
  const m = modeAktif(x);
  return { panjang: PILAH[m].length, kelompok: KELOMPOK[m], benar: (i) => kelompokBenar(m, PILAH[m][i]) };
};
const sortirKenali: Sortir = { panjang: KENALI.length, kelompok: KELOMPOK_KENALI, benar: (i) => kelompokKenali(KENALI[i]) };

const pilih = (p: Pilahan, s: Sortir, i: number): Pilahan | null => (!Number.isInteger(i) || i < 0 || i >= s.panjang ? null : { ...p, dipilih: p.dipilih === i ? null : i });
const taruhKe = (p: Pilahan, s: Sortir, k: string): Pilahan | "belum" | null => {
  if (!s.kelompok.includes(k)) return null;
  if (p.dipilih === null) return "belum";
  return { letak: p.letak.map((v, j) => (j === p.dipilih ? k : v)), dipilih: null };
};
const salahLetak = (p: Pilahan, s: Sortir): number => p.letak.filter((v, i) => v !== s.benar(i)).length;

const PETUNJUK_PILAH: Record<ModePilah, string> = {
  sudut: "Lihat sudut terbesar tiap segitiga: lebih kecil dari pojok buku, sama, atau lebih besar?",
  sisi: "Bandingkan panjang ketiga sisinya: sama semua, dua sama, atau beda semua?",
  beraturan: "Beraturan berarti semua sisi sama panjang DAN semua sudut sama besar.",
};

function cekPilah(x: StateCiriK4B5A): StateCiriK4B5A {
  const s = sortirPilah(x);
  const m = modeAktif(x);
  const kosong = x.pilah.letak.filter((v) => v === null).length;
  if (kosong > 0) return { ...x, pesan: `Masih ${kosong} bangun belum masuk kelompok.` };
  const salah = salahLetak(x.pilah, s);
  if (salah > 0) return { ...x, pesan: `Ada ${salah} bangun di kelompok yang belum tepat. ${PETUNJUK_PILAH[m]}` };
  const isi = s.kelompok.map((k) => `${x.pilah.letak.filter((v) => v === k).length} ${k}`).join(", ");
  return { ...x, pernah: tambah(x.pernah, `pilah:${m}`), pesan: `✅ Semua bangun tepat dipilah menurut ${NAMA_MODE[m]}: ${isi}.` };
}

function cekKenali(x: StateCiriK4B5A): StateCiriK4B5A {
  const kosong = x.kenali.letak.filter((v) => v === null).length;
  if (kosong > 0) return { ...x, pesan: `Masih ${kosong} gambar belum masuk kelompok.` };
  const salah = salahLetak(x.kenali, sortirKenali);
  if (salah > 0) return { ...x, pesan: `Ada ${salah} gambar di kelompok yang belum tepat. Segi banyak harus tertutup, semua ruasnya lurus, dan namanya mengikuti banyak sisi.` };
  const segi = KENALI.filter((g) => kelompokKenali(g) !== "bukan").length;
  return { ...x, pernah: tambah(x.pernah, "kenali"), pesan: `✅ Tepat! Ada ${segi} segi banyak dan ${KENALI.length - segi} gambar bukan segi banyak. Garis lengkung atau terbuka bukan segi banyak.` };
}

export function langkahCiriK4B5A(x: StateCiriK4B5A, a: AksiCiriK4B5A): StateCiriK4B5A {
  switch (a.t) {
    case "P_PAKU":
      return ketukPaku(x, a.i);
    case "P_HAPUS":
      return { ...x, paku: x.paku.slice(0, -1), pesan: "" };
    case "P_BERSIH":
      return { ...x, paku: [], pesan: "" };
    case "P_CEK":
      return cekPaku(x);
    case "S_MODE": {
      if (!Number.isInteger(a.m) || a.m < 0 || a.m >= MODE_PILAH.length) return x;
      return { ...x, mode: a.m, pilah: pilahanKosong(PILAH[MODE_PILAH[a.m]].length), pesan: "" };
    }
    case "S_PILIH": {
      const p = pilih(x.pilah, sortirPilah(x), a.i);
      return p ? { ...x, pilah: p, pesan: "" } : x;
    }
    case "S_KE": {
      const p = taruhKe(x.pilah, sortirPilah(x), a.k);
      if (p === null) return x;
      if (p === "belum") return { ...x, pesan: "Ketuk satu bangun dulu, lalu ketuk kelompoknya." };
      return { ...x, pilah: p, pesan: "" };
    }
    case "S_ULANG":
      return { ...x, pilah: pilahanKosong(x.pilah.letak.length), pesan: "" };
    case "S_CEK":
      return cekPilah(x);
    case "K_PILIH": {
      const p = pilih(x.kenali, sortirKenali, a.i);
      return p ? { ...x, kenali: p, pesan: "" } : x;
    }
    case "K_KE": {
      const p = taruhKe(x.kenali, sortirKenali, a.k);
      if (p === null) return x;
      if (p === "belum") return { ...x, pesan: "Ketuk satu gambar dulu, lalu ketuk kelompoknya." };
      return { ...x, kenali: p, pesan: "" };
    }
    case "K_ULANG":
      return { ...x, kenali: pilahanKosong(KENALI.length), pesan: "" };
    case "K_CEK":
      return cekKenali(x);
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalCiriK4B5A();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanCiriK4B5A = { alat: "ciri"; pernah: string[] };
export const keadaanCiriK4B5A = (x: StateCiriK4B5A): KeadaanCiriK4B5A => ({ alat: "ciri", pernah: x.pernah });

export const ucapPakuK4B5A = (x: StateCiriK4B5A): string =>
  `Papan paku ${UKURAN_PAPAN} baris, tiap baris ${UKURAN_PAPAN} paku. Karet sudah melewati ${x.paku.length} paku. Ketuk paku untuk memasang karet, lalu ketuk paku pertama untuk menutupnya.`;
export const ucapPilahK4B5A = (x: StateCiriK4B5A): string => {
  const m = modeAktif(x);
  const sudah = x.pilah.letak.filter((v) => v !== null).length;
  return `Pilah menurut ${NAMA_MODE[m]}. Kelompoknya: ${KELOMPOK[m].join(", ")}. Sudah ${sudah} dari ${x.pilah.letak.length} bangun. Ketuk bangun, lalu ketuk kelompoknya.`;
};
export const ucapKenaliK4B5A = (x: StateCiriK4B5A): string => {
  const sudah = x.kenali.letak.filter((v) => v !== null).length;
  return `Segi banyak adalah bangun tertutup yang dibatasi paling sedikit 3 ruas garis lurus. Sudah ${sudah} dari ${KENALI.length} gambar. Ketuk gambar, lalu ketuk kelompoknya.`;
};
