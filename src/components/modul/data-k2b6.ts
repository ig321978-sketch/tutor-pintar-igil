/**
 * Data murni dan mesin pemeriksa Matematika Kelas 2 Bab 6 (Pengukuran: Berat dan Waktu).
 * Tanpa React dan tanpa impor nilai dari berkas lain, supaya bisa diuji langsung di Node (scripts/uji-data-k2b6.mjs).
 *
 * Sub-Bab A (Berat): semua kunci dihitung dari tabel berat (BERAT) dan berat satuan tidak baku (BERAT_SATUAN),
 * sehingga gambar neraca, kalimat, dan jawaban selalu sama. Sub-Bab B (Waktu): kunci dihitung dari jam 24, lama kegiatan,
 * dan bagian hari. Tidak ada acak: semua urutan tetap (aman untuk render server).
 */

export const Kapital = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Urutan tampil beberapa pilihan, tetap tanpa acak. */
export function urutanTetap(n: number, langkah = 3, geser = 0): number[] {
  const g = ((geser % n) + n) % n;
  const awal = (g * langkah) % n;
  return Array.from({ length: n }, (_, i) => (i + awal) % n);
}

/**
 * Urutan tampil benda yang harus diurutkan siswa. Berupa putaran tetap, dan dijamin berbeda dari urutan kunci
 * supaya jawaban tidak sudah tersusun saat permainan dibuka.
 */
export function urutTampil<T>(daftar: readonly T[], kunci: readonly T[], nomor: number): T[] {
  const n = daftar.length;
  for (let g = 0; g < n; g += 1) {
    const p = urutanTetap(n, 2, nomor + g).map((i) => daftar[i]);
    if (JSON.stringify(p) !== JSON.stringify(kunci)) return p;
  }
  return [...daftar].reverse();
}

/** Tiga pilihan angka dengan kunci di tempat yang berpindah-pindah. Selalu berbeda dan tidak negatif. */
export function opsiAngka(jawab: number, nomor: number): number[] {
  const semua = jawab <= 1 ? [jawab, jawab + 1, jawab + 2] : [jawab, jawab + 1, jawab - 1];
  return urutanTetap(3, 2, nomor).map((i) => semua[i]);
}

/** Tiga pilihan teks: satu benar dan dua pengecoh. Kembalikan pilihan dan nomor kuncinya. */
export function susunOpsi(benar: string, pengecoh: [string, string], nomor: number): { opsi: string[]; jawab: number } {
  const semua = [benar, pengecoh[0], pengecoh[1]];
  const opsi = urutanTetap(3, 2, nomor).map((i) => semua[i]);
  return { opsi, jawab: opsi.indexOf(benar) };
}

/* ====================================================================== */
/* SUB-BAB A. BERAT                                                         */
/* ====================================================================== */

export type BeratId =
  | "semangka" | "apel" | "jeruk" | "anggur" | "pisang" | "kelapa" | "mangga" | "pepaya" | "manggis" | "stroberi" | "tomat"
  | "wortel" | "kol" | "labu" | "terong"
  | "buku" | "pensil" | "penghapus" | "tas" | "penggaris" | "gunting" | "botol" | "bulu" | "boneka"
  | "kucing" | "kelinci" | "tikus" | "burung" | "kupu" | "anjing" | "gajah"
  | "sepeda" | "motor" | "truk";

/** Berat relatif benda (gram, pembulatan). Dipakai bersama untuk membandingkan dan mengukur dengan satuan tidak baku. */
export const BERAT: Record<BeratId, number> = {
  semangka: 1800, apel: 120, jeruk: 120, anggur: 5, pisang: 60, kelapa: 600, mangga: 240, pepaya: 480, manggis: 120, stroberi: 40, tomat: 120,
  wortel: 90, kol: 300, labu: 360, terong: 200,
  buku: 60, pensil: 10, penghapus: 20, tas: 120, penggaris: 16, gunting: 24, botol: 500, bulu: 1, boneka: 80,
  kucing: 3000, kelinci: 3000, tikus: 100, burung: 40, kupu: 1, anjing: 15000, gajah: 4000000,
  sepeda: 12000, motor: 90000, truk: 8000000,
};

export const NAMA: Record<BeratId, string> = {
  semangka: "semangka", apel: "apel", jeruk: "jeruk", anggur: "anggur", pisang: "pisang", kelapa: "kelapa", mangga: "mangga", pepaya: "pepaya",
  manggis: "manggis", stroberi: "stroberi", tomat: "tomat", wortel: "wortel", kol: "kol", labu: "labu", terong: "terong", buku: "buku",
  pensil: "pensil", penghapus: "penghapus", tas: "tas", penggaris: "penggaris", gunting: "gunting", botol: "botol air", bulu: "bulu",
  boneka: "boneka", kucing: "kucing", kelinci: "kelinci", tikus: "tikus", burung: "burung", kupu: "kupu-kupu", anjing: "anjing", gajah: "gajah",
  sepeda: "sepeda", motor: "sepeda motor", truk: "truk",
};

export type SatuanId = "bolaTenis" | "kelereng" | "koin" | "balok";
export const BERAT_SATUAN: Record<SatuanId, number> = { bolaTenis: 20, kelereng: 8, koin: 4, balok: 10 };
export const NAMA_SATUAN: Record<SatuanId, string> = { bolaTenis: "bola tenis", kelereng: "kelereng", koin: "koin", balok: "balok mainan" };

export type Rel = "lebih berat" | "lebih ringan" | "sama berat";
export const REL_SEMUA: Rel[] = ["lebih berat", "lebih ringan", "sama berat"];

/** Hubungan berat a terhadap b. */
export const relBerat = (a: number, b: number): Rel => (a > b ? "lebih berat" : a < b ? "lebih ringan" : "sama berat");
export const relBenda = (a: BeratId, b: BeratId): Rel => relBerat(BERAT[a], BERAT[b]);
export const LAWAN_REL: Record<Rel, Rel> = { "lebih berat": "lebih ringan", "lebih ringan": "lebih berat", "sama berat": "sama berat" };

/** Kalimat: "Apel lebih berat dari anggur." atau "Jeruk sama berat dengan tomat." */
export function kalimatRel(a: string, r: Rel, b: string): string {
  return r === "sama berat" ? `${Kapital(a)} sama berat dengan ${b}.` : `${Kapital(a)} ${r} dari ${b}.`;
}
export const kalimatBenda = (a: BeratId, b: BeratId) => kalimatRel(NAMA[a], relBenda(a, b), NAMA[b]);

/** Banyak satuan yang sama berat dengan benda, atau null bila tidak bulat. */
export function jumlahSatuan(b: BeratId, s: SatuanId): number | null {
  const n = BERAT[b] / BERAT_SATUAN[s];
  return Number.isInteger(n) && n >= 1 ? n : null;
}

/** Berapa kali berat a dibandingkan b, atau null bila tidak bulat. */
export function rasio(a: BeratId, b: BeratId): number | null {
  const n = BERAT[a] / BERAT[b];
  return Number.isInteger(n) && n >= 1 ? n : null;
}

/** Urutan id dari paling ringan (atau paling berat). Hanya benar bila beratnya berbeda semua. */
export function urutBerat(ids: readonly BeratId[], dari: "ringan" | "berat"): BeratId[] {
  const s = [...ids].sort((x, y) => BERAT[x] - BERAT[y]);
  return dari === "ringan" ? s : s.reverse();
}
export const beratBerbeda = (ids: readonly BeratId[]) => new Set(ids.map((i) => BERAT[i])).size === ids.length;
export const palingBerat = (ids: readonly BeratId[]) => urutBerat(ids, "berat")[0];
export const palingRingan = (ids: readonly BeratId[]) => urutBerat(ids, "ringan")[0];

/* ------------------------------ Concrete A ------------------------------ */

type Pasang = [BeratId, BeratId];

/** A1 Angkat dengan Dua Tangan: tiga pasang per ronde, jawab hubungan tangan kiri terhadap tangan kanan. */
export const RONDE_TANGAN_A: Pasang[][] = [
  [["semangka", "apel"], ["jeruk", "anggur"], ["buku", "pensil"]],
  [["tas", "penggaris"], ["jeruk", "tomat"], ["botol", "gunting"]],
  [["kucing", "tikus"], ["kupu", "burung"], ["kelinci", "kucing"]],
  [["kol", "wortel"], ["labu", "kol"], ["terong", "tomat"]],
];

/** A2 Jungkat-Jungkit: satu pasang per ronde. */
export const RONDE_JUNGKAT_A: Pasang[] = [["apel", "anggur"], ["tas", "buku"], ["jeruk", "apel"], ["kelapa", "semangka"]];

/** A3 Gantungan Baju (tebak lalu buktikan): dua pasang per ronde. */
export const RONDE_GANTUNGAN_A: Pasang[][] = [
  [["botol", "pensil"], ["penghapus", "gunting"]],
  [["pepaya", "mangga"], ["manggis", "stroberi"]],
  [["kelinci", "burung"], ["bulu", "kupu"]],
];

/** A4 Urutkan: set benda, arah urutan. */
export type RondeUrut = { ids: BeratId[]; dari: "ringan" | "berat" };
export const RONDE_URUT_A: RondeUrut[] = [
  { ids: ["pisang", "semangka", "apel"], dari: "ringan" },
  { ids: ["buku", "tas", "pensil", "penggaris"], dari: "berat" },
  { ids: ["kucing", "tikus", "gajah", "anjing"], dari: "ringan" },
  { ids: ["truk", "sepeda", "motor"], dari: "berat" },
];

/** A5 Pilah ke Kotak: benda acuan dan enam benda. */
export type RondeSortirBerat = { acuan: BeratId; ids: BeratId[] };
export const RONDE_SORTIR_A: RondeSortirBerat[] = [
  { acuan: "apel", ids: ["semangka", "pisang", "kelapa", "anggur", "pepaya", "stroberi"] },
  { acuan: "buku", ids: ["tas", "pensil", "botol", "penggaris", "boneka", "penghapus"] },
  { acuan: "kucing", ids: ["anjing", "tikus", "burung", "gajah", "kupu", "sepeda"] },
];

/** A6 Timbang dengan Satuan: benda dan satuan. */
export type RondeTimbang = { benda: BeratId; satuan: SatuanId };
export const RONDE_TIMBANG_A: RondeTimbang[] = [
  { benda: "boneka", satuan: "bolaTenis" },
  { benda: "boneka", satuan: "kelereng" },
  { benda: "buku", satuan: "bolaTenis" },
  { benda: "gunting", satuan: "koin" },
];

/** A7 Berapa Satuan? (hitung dari gambar neraca). */
export const RONDE_HITUNG_A: RondeTimbang[][] = [
  [{ benda: "tas", satuan: "bolaTenis" }, { benda: "penggaris", satuan: "koin" }],
  [{ benda: "buku", satuan: "balok" }, { benda: "gunting", satuan: "koin" }],
  [{ benda: "boneka", satuan: "balok" }, { benda: "tas", satuan: "kelereng" }],
];

/** A8 Cari yang Paling Berat: set benda, dua soal (paling berat, paling ringan). */
export const RONDE_KETUK_A: BeratId[][] = [
  ["apel", "semangka", "anggur", "jeruk"],
  ["manggis", "stroberi", "pepaya", "mangga"],
  ["kucing", "tikus", "burung", "anjing", "kupu"],
  ["botol", "buku", "tas", "pensil", "penggaris"],
];

/** A9 Jodohkan Hasil Ukur: benda dengan hasil ukur satuan. */
export const RONDE_JODOH_A: RondeTimbang[][] = [
  [{ benda: "boneka", satuan: "bolaTenis" }, { benda: "gunting", satuan: "kelereng" }, { benda: "penggaris", satuan: "koin" }],
  [{ benda: "buku", satuan: "bolaTenis" }, { benda: "tas", satuan: "bolaTenis" }, { benda: "boneka", satuan: "balok" }],
  [{ benda: "gunting", satuan: "koin" }, { benda: "penggaris", satuan: "kelereng" }, { benda: "boneka", satuan: "koin" }],
];

/** A10 Susun Rak: tiga benda, paling berat di rak paling bawah. */
export const RONDE_RAK_A: BeratId[][] = [
  ["semangka", "apel", "anggur"],
  ["tas", "buku", "pensil"],
  ["pepaya", "mangga", "manggis"],
];
export const RAK_NAMA = ["Rak bawah", "Rak tengah", "Rak atas"];

/* ------------------------------ Picture A (balok berhuruf, titik, batang) ------------------------------ */

/** P1 Baca Neraca Balok: pasangan bobot (kiri, kanan) untuk huruf A-B, C-D, E-F. */
export const RONDE_BACA_A: [number, number][][] = [
  [[3, 1], [2, 5], [4, 4]],
  [[5, 2], [1, 1], [2, 6]],
  [[7, 3], [3, 8], [6, 6]],
];
export const HURUF_PASANG: [string, string][] = [["A", "B"], ["C", "D"], ["E", "F"]];

/** Hubungan dua balok berhuruf dari bobotnya. */
export const relHuruf = (ba: number, bb: number): Rel => relBerat(ba, bb);

/** Kalimat pernyataan dua balok: "Balok A lebih berat dari balok B." */
export function kalimatBalok(a: string, r: Rel, b: string): string {
  return r === "sama berat" ? `Balok ${a} sama berat dengan balok ${b}.` : `Balok ${a} ${r} dari balok ${b}.`;
}

/** Tiga pilihan pernyataan untuk dua balok berhuruf (kunci berpindah tempat). */
export function opsiBandingHuruf(a: string, b: string, ba: number, bb: number, nomor: number): { opsi: string[]; jawab: number } {
  const benar = ba > bb ? `Balok ${a} lebih berat` : ba < bb ? `Balok ${b} lebih berat` : "Sama berat";
  const semua = [`Balok ${a} lebih berat`, `Balok ${b} lebih berat`, "Sama berat"];
  return susunOpsi(benar, semua.filter((x) => x !== benar) as [string, string], nomor);
}

/** P2 Urutan dari Beberapa Neraca: bobot rahasia dan diagram perbandingan yang ditampilkan. */
export type RondeUrutNeraca = { bobot: Record<string, number>; diagram: [string, string][]; dari: "ringan" | "berat" };
export const RONDE_URUTNERACA_A: RondeUrutNeraca[] = [
  { bobot: { A: 5, B: 3, C: 1 }, diagram: [["A", "B"], ["B", "C"]], dari: "ringan" },
  { bobot: { D: 2, E: 7, F: 4, G: 9 }, diagram: [["D", "F"], ["F", "E"], ["E", "G"]], dari: "ringan" },
  { bobot: { H: 6, I: 1, J: 3 }, diagram: [["H", "J"], ["J", "I"]], dari: "berat" },
];

/** Urutan huruf dari bobot. */
export const urutHuruf = (bobot: Record<string, number>, dari: "ringan" | "berat"): string[] => {
  const s = Object.keys(bobot).sort((a, b) => bobot[a] - bobot[b]);
  return dari === "ringan" ? s : s.reverse();
};
/** Diagram sah bila setiap pasangan memuat dua huruf berbeda bobot dan rantai menentukan urutan tunggal. */
export function rantaiMenentukan(r: RondeUrutNeraca): boolean {
  const huruf = Object.keys(r.bobot);
  if (new Set(huruf.map((h) => r.bobot[h])).size !== huruf.length) return false;
  const lebihBerat = (a: string, b: string) => r.bobot[a] > r.bobot[b];
  // Bangun urutan hanya dari diagram: urutkan topologis.
  const turun: Record<string, string[]> = {};
  const masuk: Record<string, number> = {};
  for (const h of huruf) {
    turun[h] = [];
    masuk[h] = 0;
  }
  for (const [a, b] of r.diagram) {
    const [berat, ringan] = lebihBerat(a, b) ? [a, b] : [b, a];
    turun[ringan].push(berat);
    masuk[berat] += 1;
  }
  const hasil: string[] = [];
  let antre = huruf.filter((h) => masuk[h] === 0);
  while (antre.length === 1) {
    const h = antre[0];
    hasil.push(h);
    antre = [];
    for (const berat of turun[h]) {
      masuk[berat] -= 1;
      if (masuk[berat] === 0) antre.push(berat);
    }
  }
  return hasil.length === huruf.length && sama(hasil, urutHuruf(r.bobot, "ringan"));
}
const sama = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

/** P3 Batang Berat: banyak satuan (tinggi batang) tiap huruf. */
export type BatangBerat = { id: string; n: number };
export const RONDE_BATANG_A: BatangBerat[][] = [
  [{ id: "A", n: 4 }, { id: "B", n: 7 }, { id: "C", n: 2 }, { id: "D", n: 5 }],
  [{ id: "E", n: 6 }, { id: "F", n: 3 }, { id: "G", n: 9 }],
  [{ id: "H", n: 8 }, { id: "I", n: 5 }, { id: "J", n: 1 }, { id: "K", n: 6 }],
];

/** P4 Hitung Titik, P5 Goresan, P9 Garis Angka, P10 Seimbangkan Bagan: banyak titik sama berat dengan satu balok. */
export const RONDE_TITIK_A: number[][] = [[3, 5], [4, 7], [6, 9]];
export const RONDE_GORESAN_A: number[][] = [[3, 5], [6, 8], [4, 9]];
export const RONDE_GARISANGKA_A: number[][] = [[2, 5, 8], [3, 6, 9], [4, 7, 10]];
export const RONDE_BAGAN_A: number[] = [4, 6, 9];

/** P6 Tabel hasil: baris (label, jawaban) dan kartu. */
export type TabelBaris = { label: string; jawab: string };
export type TabelRonde = { judul: string; kepala: [string, string]; baris: TabelBaris[]; kartu: string[] };
export const RONDE_TABEL_PA: TabelRonde[] = [
  {
    judul: "Tulis banyak titik",
    kepala: ["Balok", "Banyak titik"],
    baris: [{ label: "Balok A", jawab: "3" }, { label: "Balok B", jawab: "5" }, { label: "Balok C", jawab: "2" }, { label: "Balok D", jawab: "6" }],
    kartu: ["2", "3", "4", "5", "6", "7"],
  },
  {
    judul: "Tulis banyak titik, ronde dua",
    kepala: ["Balok", "Banyak titik"],
    baris: [{ label: "Balok E", jawab: "4" }, { label: "Balok F", jawab: "8" }, { label: "Balok G", jawab: "6" }, { label: "Balok H", jawab: "10" }],
    kartu: ["4", "6", "8", "10", "12", "14"],
  },
];

/** P7 dan P8: diagram neraca dengan huruf; bobot kiri dan kanan. */
export const RONDE_PASANGNERACA_A: [string, string, number, number][][] = [
  [["A", "B", 4, 2], ["C", "D", 3, 3], ["E", "F", 1, 5]],
  [["G", "H", 2, 6], ["I", "J", 5, 5], ["K", "L", 7, 1]],
  [["M", "N", 6, 3], ["O", "P", 2, 2], ["Q", "R", 3, 9]],
];
export const RONDE_SORTIRNERACA_A: [string, string, number, number][][] = [
  [["A", "B", 4, 2], ["C", "D", 3, 3], ["E", "F", 1, 5], ["G", "H", 6, 2], ["I", "J", 2, 2], ["K", "L", 3, 7]],
  [["A", "B", 5, 1], ["C", "D", 4, 4], ["E", "F", 2, 8], ["G", "H", 7, 3], ["I", "J", 1, 1], ["K", "L", 2, 6]],
  [["A", "B", 9, 4], ["C", "D", 6, 6], ["E", "F", 3, 5], ["G", "H", 8, 2], ["I", "J", 5, 5], ["K", "L", 1, 9]],
];

/* ------------------------------ Abstract A ------------------------------ */

export type KalimatIsian = { depan: string; belakang: string; opsi: string[]; benar: number };
/** Pasangan untuk kalimat lengkapi kata hubungan berat. */
export const RONDE_KALIMAT_QA: Pasang[][] = [
  [["semangka", "apel"], ["anggur", "jeruk"], ["jeruk", "tomat"]],
  [["kucing", "tikus"], ["buku", "tas"], ["kelinci", "kucing"]],
];
/** Opsi kata hubungan dengan urutan tetap, kunci berpindah tempat. */
export function kalimatIsian(a: BeratId, b: BeratId, nomor: number): KalimatIsian {
  const r = relBenda(a, b);
  const urut = urutanTetap(3, 2, nomor).map((i) => REL_SEMUA[i]);
  return { depan: Kapital(NAMA[a]), belakang: r === "sama berat" ? `dengan ${NAMA[b]}.` : `dari ${NAMA[b]}.`, opsi: urut, benar: urut.indexOf(r) };
}

export type Pernyataan = { teks: string; benar: boolean; penjelasan: string };
export const RONDE_BENARSALAH_QA: Pernyataan[][] = [
  [
    { teks: "Semangka lebih berat dari apel.", benar: relBenda("semangka", "apel") === "lebih berat", penjelasan: "Semangka lebih besar dan lebih berat daripada apel." },
    { teks: "Posisi benda yang lebih berat ada lebih bawah pada timbangan jungkat-jungkit.", benar: true, penjelasan: "Sisi yang lebih berat turun, jadi bendanya ada lebih bawah." },
    { teks: "Anggur lebih berat dari jeruk.", benar: relBenda("anggur", "jeruk") === "lebih berat", penjelasan: "Anggur kecil dan ringan, jeruk lebih berat daripada anggur." },
    { teks: "Jeruk dan tomat yang sama berat membuat timbangan seimbang.", benar: true, penjelasan: "Benda yang sama berat membuat kedua sisi datar." },
    { teks: "Benda yang besar pasti lebih berat daripada benda yang kecil.", benar: false, penjelasan: "Bulu besar tetapi ringan, kerikil kecil tetapi bisa lebih berat. Kita perlu menimbang." },
  ],
  [
    { teks: "Berat 1 boneka sama dengan 4 bola tenis.", benar: jumlahSatuan("boneka", "bolaTenis") === 4, penjelasan: "Empat bola tenis membuat timbangan seimbang dengan satu boneka." },
    { teks: "Hasil mengukur berat tidak bergantung pada alat ukur yang dipakai.", benar: false, penjelasan: "Boneka sama dengan 4 bola tenis, tetapi sama dengan 10 kelereng. Hasilnya bergantung pada alat ukur." },
    { teks: "Alat ukur yang lebih ringan memerlukan lebih banyak buah untuk menyamai benda.", benar: true, penjelasan: "Kelereng lebih ringan daripada bola tenis, jadi dibutuhkan 10 kelereng, lebih banyak daripada 4 bola tenis." },
    { teks: "Kucing dewasa lebih ringan dari tikus.", benar: relBenda("kucing", "tikus") === "lebih ringan", penjelasan: "Kucing dewasa lebih berat daripada tikus." },
    { teks: "Kita dapat merasakan benda yang lebih berat dengan kedua tangan.", benar: true, penjelasan: "Dua tangan dapat membandingkan berat dua benda yang beratnya cukup berbeda." },
  ],
];

/** Q3 Susun kalimat: kata, pengecoh. */
export const RONDE_SUSUNKATA_QA: { kata: string[]; pengecoh: string }[] = [
  { kata: ["Semangka", "lebih", "berat", "dari", "apel"], pengecoh: "ringan" },
  { kata: ["Berat", "1", "boneka", "sama", "dengan", "4", "bola", "tenis"], pengecoh: "kelereng" },
  { kata: ["Benda", "yang", "lebih", "berat", "ada", "lebih", "bawah"], pengecoh: "atas" },
  { kata: ["Hasil", "pengukuran", "bergantung", "pada", "alat", "ukur"], pengecoh: "warna" },
];

/** Q4 Hitung: rantai perbandingan bahan. Tiap soal berisi prompt teks dan jawaban dihitung. */
export type SoalHitung = { teks: string; jawab: number; min: number; max: number; satuan: string; petunjuk: string };
export const RONDE_HITUNG_QA: SoalHitung[][] = [
  [
    { teks: "Berat 1 labu sama dengan 3 apel. Berat 2 labu sama dengan berapa apel?", jawab: 2 * (rasio("labu", "apel") ?? 0), min: 0, max: 12, satuan: "apel", petunjuk: "2 kali 3 apel, jadi 3 + 3." },
    { teks: "Berat 1 jeruk sama dengan 3 stroberi. Berat 3 jeruk sama dengan berapa stroberi?", jawab: 3 * (rasio("jeruk", "stroberi") ?? 0), min: 0, max: 12, satuan: "stroberi", petunjuk: "3 + 3 + 3 stroberi." },
  ],
  [
    { teks: "Berat 1 mangga sama dengan 2 manggis, dan 1 pepaya sama dengan 2 mangga. Berat 1 pepaya sama dengan berapa manggis?", jawab: (rasio("pepaya", "mangga") ?? 0) * (rasio("mangga", "manggis") ?? 0), min: 0, max: 12, satuan: "manggis", petunjuk: "2 mangga, tiap mangga 2 manggis." },
    { teks: "Berat 1 kelapa sama dengan 5 apel. Berat 2 kelapa sama dengan berapa apel?", jawab: 2 * (rasio("kelapa", "apel") ?? 0), min: 0, max: 12, satuan: "apel", petunjuk: "2 kali 5 apel." },
  ],
  [
    { teks: "Berat 1 semangka sama dengan 3 kelapa, dan 1 kelapa sama dengan 5 apel. Berat 1 semangka sama dengan berapa apel?", jawab: (rasio("semangka", "kelapa") ?? 0) * (rasio("kelapa", "apel") ?? 0), min: 0, max: 20, satuan: "apel", petunjuk: "3 kelapa, tiap kelapa 5 apel." },
    { teks: "Berat 1 pepaya sama dengan 4 apel. Berat 2 pepaya sama dengan berapa apel?", jawab: 2 * (rasio("pepaya", "apel") ?? 0), min: 0, max: 12, satuan: "apel", petunjuk: "4 + 4 apel." },
  ],
];

/** Q5 Tabel kelipatan. */
export const RONDE_TABEL_QA: TabelRonde[] = [
  {
    judul: "Jeruk dan stroberi",
    kepala: ["Banyak jeruk", "Banyak stroberi"],
    baris: [1, 2, 3, 4].map((n) => ({ label: `${n} jeruk`, jawab: String(n * (rasio("jeruk", "stroberi") ?? 0)) })),
    kartu: ["3", "6", "9", "12", "15", "18"],
  },
  {
    judul: "Kelapa dan apel",
    kepala: ["Banyak kelapa", "Banyak apel"],
    baris: [1, 2, 3, 4].map((n) => ({ label: `${n} kelapa`, jawab: String(n * (rasio("kelapa", "apel") ?? 0)) })),
    kartu: ["5", "10", "15", "20", "25", "30"],
  },
];

/** Q6 Pilih Bandingkan: A dan B diukur dengan satuan yang sama. */
export type SoalBandingAngka = { satuan: SatuanId; a: number; b: number };
export const RONDE_BANDINGANGKA_QA: SoalBandingAngka[][] = [
  [{ satuan: "kelereng", a: 5, b: 8 }, { satuan: "bolaTenis", a: 6, b: 3 }],
  [{ satuan: "koin", a: 9, b: 9 }, { satuan: "balok", a: 4, b: 7 }],
  [{ satuan: "kelereng", a: 12, b: 6 }, { satuan: "koin", a: 3, b: 10 }],
];
export const relAngka = (a: number, b: number): Rel => relBerat(a, b);

/** Q7 Detektif berat: petunjuk tertulis, tiga nama. Setiap nama diperiksa terhadap petunjuk. */
export type Klaim = { rel: "lebih berat" | "lebih ringan"; acuan: BeratId };
export type SoalDetektif = { klaim: Klaim[]; opsi: BeratId[]; jawab: BeratId };
export const RONDE_DETEKTIF_QA: SoalDetektif[] = [
  { klaim: [{ rel: "lebih berat", acuan: "apel" }, { rel: "lebih ringan", acuan: "semangka" }], opsi: ["anggur", "kelapa", "jeruk"], jawab: "kelapa" },
  { klaim: [{ rel: "lebih ringan", acuan: "kucing" }, { rel: "lebih berat", acuan: "burung" }], opsi: ["tikus", "gajah", "kupu"], jawab: "tikus" },
  { klaim: [{ rel: "lebih berat", acuan: "buku" }, { rel: "lebih ringan", acuan: "botol" }], opsi: ["pensil", "tas", "semangka"], jawab: "tas" },
  { klaim: [{ rel: "lebih ringan", acuan: "labu" }, { rel: "lebih berat", acuan: "tomat" }], opsi: ["terong", "semangka", "stroberi"], jawab: "terong" },
];
export const cocokKlaim = (b: BeratId, k: Klaim): boolean => relBenda(b, k.acuan) === k.rel;

/** Q9 Urutkan dari angka: hasil ukur satuan sama. */
export type RondeUrutAngka = { satuan: SatuanId; ids: BeratId[]; dari: "ringan" | "berat" };
export const RONDE_URUTANGKA_QA: RondeUrutAngka[] = [
  { satuan: "koin", ids: ["gunting", "buku", "penggaris"], dari: "ringan" },
  { satuan: "koin", ids: ["tas", "boneka", "buku", "penggaris"], dari: "berat" },
  { satuan: "kelereng", ids: ["boneka", "tas", "gunting", "penggaris"], dari: "ringan" },
];

/** Q10 Ketuk semua pernyataan benar. */
export type SoalPernyataanSemua = { teks: string; item: { id: string; teks: string; benar: boolean }[] };
export const RONDE_KETUKSEMUA_QA: SoalPernyataanSemua[] = [
  {
    teks: "Ketuk semua pernyataan yang benar tentang timbangan jungkat-jungkit.",
    item: [
      { id: "a", teks: "Sisi yang lebih berat berada lebih bawah.", benar: true },
      { id: "b", teks: "Sisi yang lebih ringan berada lebih atas.", benar: true },
      { id: "c", teks: "Dua benda sama berat membuat timbangan miring.", benar: false },
      { id: "d", teks: "Dua benda sama berat membuat timbangan seimbang.", benar: true },
      { id: "e", teks: "Benda yang lebih ringan membuat sisinya turun.", benar: false },
    ],
  },
  {
    teks: "Ketuk semua pernyataan yang benar tentang mengukur dengan satuan tidak baku.",
    item: [
      { id: "a", teks: "Kelereng, koin, dan balok mainan dapat dipakai sebagai alat ukur.", benar: true },
      { id: "b", teks: "Benda kecil berukuran sama dipakai agar hitungan adil.", benar: true },
      { id: "c", teks: "Boneka sama dengan 4 bola tenis dan juga 10 kelereng.", benar: jumlahSatuan("boneka", "bolaTenis") === 4 && jumlahSatuan("boneka", "kelereng") === 10 },
      { id: "d", teks: "Alat ukur apa pun selalu memberi bilangan yang sama.", benar: false },
      { id: "e", teks: "Satuan yang lebih ringan memerlukan jumlah yang lebih banyak.", benar: true },
    ],
  },
  {
    teks: "Ketuk semua pernyataan yang benar tentang membandingkan berat.",
    item: [
      { id: "a", teks: "Benda yang paling berat lebih berat dari semua benda lain.", benar: true },
      { id: "b", teks: "Benda yang paling ringan lebih ringan dari semua benda lain.", benar: true },
      { id: "c", teks: "Benda yang lebih besar selalu lebih berat.", benar: false },
      { id: "d", teks: "Kita dapat mengurutkan benda dari paling ringan sampai paling berat.", benar: true },
      { id: "e", teks: "Dua benda yang sama berat tidak dapat dibandingkan.", benar: false },
    ],
  },
];

export type KotakPeta = { label: string; opsi: string[]; benar: number };
export const PETA_KONSEP_A: { pusat: string; kotak: KotakPeta[] }[] = [
  {
    pusat: "Membandingkan berat",
    kotak: [
      { label: "Membandingkan berat adalah", opsi: ["mencari benda yang lebih berat, lebih ringan, atau sama berat", "menghitung banyak benda", "mengukur panjang benda"], benar: 0 },
      { label: "Alat yang dipakai", opsi: ["timbangan jungkat-jungkit, gantungan baju, dan kedua tangan", "penggaris dan meteran", "jam dinding dan kalender"], benar: 0 },
      { label: "Kata hubungan", opsi: ["lebih berat, lebih ringan, sama berat, paling berat, paling ringan", "lebih tinggi, lebih rendah, sama tinggi", "lebih lama, lebih sebentar"], benar: 0 },
      { label: "Menurutku, sisi yang lebih berat", opsi: ["turun dan berada lebih bawah", "naik dan berada lebih atas", "tetap datar"], benar: 0 },
    ],
  },
  {
    pusat: "Satuan tidak baku",
    kotak: [
      { label: "Satuan tidak baku adalah", opsi: ["benda kecil berukuran sama yang dipakai untuk mengukur", "satuan resmi seperti kilogram", "nama alat timbangan"], benar: 0 },
      { label: "Contoh", opsi: ["kelereng, koin, bola tenis, dan balok mainan", "meter dan sentimeter", "jam dan menit"], benar: 0 },
      { label: "Boneka sama dengan 4 bola tenis, dan juga 10 kelereng karena", opsi: ["kelereng lebih ringan daripada bola tenis", "kelereng lebih berat daripada bola tenis", "boneka berubah beratnya"], benar: 0 },
      { label: "Menurutku, hasil ukur bergantung pada", opsi: ["benda yang dipakai sebagai alat ukur", "warna benda yang diukur", "nama anak yang menimbang"], benar: 0 },
    ],
  },
];

/* ====================================================================== */
/* SUB-BAB B. WAKTU                                                         */
/* ====================================================================== */

export type BagianHari = "pagi" | "siang" | "sore" | "malam";
export const BAGIAN_HARI: BagianHari[] = ["pagi", "siang", "sore", "malam"];

/** Jam 24 ke bagian hari: pagi 4-10, siang 11-14, sore 15-17, malam 18-23 dan 0-3. */
export function bagianHari(jam24: number): BagianHari {
  if (jam24 >= 4 && jam24 <= 10) return "pagi";
  if (jam24 >= 11 && jam24 <= 14) return "siang";
  if (jam24 >= 15 && jam24 <= 17) return "sore";
  return "malam";
}
/** Jam 12 pada muka jam (1 sampai 12). */
export const jam12 = (jam24: number): number => ((jam24 + 11) % 12) + 1;
export const digital = (jam24: number): string => `${String(jam24).padStart(2, "0")}.00`;
export const sebutPukul = (jam24: number): string => `pukul ${jam12(jam24)} ${bagianHari(jam24)}`;
/** Sudut jarum pendek (derajat dari atas, searah jarum jam) pada pukul tepat. */
export const sudutJam = (jam24: number): number => (jam12(jam24) % 12) * 30;
export const selisihJam = (mulai: number, selesai: number): number => selesai - mulai;

export type KegiatanId =
  | "bangun" | "sarapan" | "sekolah" | "olahraga" | "mandiPagi" | "kantin" | "pulang" | "bermain" | "bermainBola" | "mandiSore"
  | "makanMalam" | "belajarMalam" | "sikatGigi" | "tidur" | "menyisir" | "cuciTangan";
export type Kegiatan = { id: KegiatanId; nama: string; jam24: number; menit: number };
/** Jam 24 kegiatan (acuan buku: sarapan 6 pagi, sekolah 7 pagi, kantin 12 siang, bermain 4 sore, tidur 9 malam) dan lamanya dalam menit. */
export const KEGIATAN: Record<KegiatanId, Kegiatan> = {
  bangun: { id: "bangun", nama: "bangun tidur", jam24: 5, menit: 10 },
  sarapan: { id: "sarapan", nama: "sarapan", jam24: 6, menit: 20 },
  sekolah: { id: "sekolah", nama: "belajar di sekolah", jam24: 7, menit: 300 },
  olahraga: { id: "olahraga", nama: "berolahraga", jam24: 6, menit: 60 },
  mandiPagi: { id: "mandiPagi", nama: "mandi pagi", jam24: 7, menit: 15 },
  kantin: { id: "kantin", nama: "makan di kantin", jam24: 12, menit: 30 },
  pulang: { id: "pulang", nama: "pulang sekolah", jam24: 13, menit: 30 },
  bermain: { id: "bermain", nama: "bermain bersama adik", jam24: 16, menit: 90 },
  bermainBola: { id: "bermainBola", nama: "bermain bola", jam24: 16, menit: 60 },
  mandiSore: { id: "mandiSore", nama: "mandi sore", jam24: 17, menit: 15 },
  makanMalam: { id: "makanMalam", nama: "makan malam", jam24: 19, menit: 30 },
  belajarMalam: { id: "belajarMalam", nama: "belajar di rumah", jam24: 19, menit: 60 },
  sikatGigi: { id: "sikatGigi", nama: "menyikat gigi", jam24: 20, menit: 3 },
  tidur: { id: "tidur", nama: "tidur malam", jam24: 21, menit: 480 },
  menyisir: { id: "menyisir", nama: "menyisir rambut", jam24: 6, menit: 5 },
  cuciTangan: { id: "cuciTangan", nama: "mencuci tangan", jam24: 12, menit: 1 },
};
export const ikat = (ids: readonly KegiatanId[]) => ids.map((i) => KEGIATAN[i]);

/** Tiap himpunan harus punya jam 12 yang berbeda supaya muka jam dapat dijodohkan tanpa ragu. */
export const jam12Berbeda = (ids: readonly KegiatanId[]) => new Set(ids.map((i) => jam12(KEGIATAN[i].jam24))).size === ids.length;

/* ------------------------------ Concrete B ------------------------------ */

/** B1 Pukul Berapa? tiga muka jam per ronde (jam 24 yang dibaca sebagai jam 12). */
export const RONDE_BACAJAM_B: number[][] = [[6, 7, 12], [5, 9, 4], [1, 8, 11], [2, 10, 3]];
/** Tiga pilihan pukul untuk satu muka jam: kunci ditambah dua pengecoh tetangga. */
export function pilihanPukul(jam: number, nomor: number): number[] {
  const j = jam12(jam);
  const semua = [j, jam12(j + 1), jam12(j + 11)];
  return urutanTetap(3, 2, nomor).map((i) => semua[i]);
}

/** B2 Putar Jarum dan P2 Gambar Jarum: tugas pukul. */
export const RONDE_PUTAR_B: KegiatanId[][] = [["sarapan", "sekolah", "kantin"], ["olahraga", "bermain", "tidur"], ["bangun", "makanMalam", "sikatGigi"], ["mandiSore", "belajarMalam", "pulang"]];
export const RONDE_GAMBARJARUM_PB: number[][] = [[9, 3, 6], [4, 11, 2], [8, 1, 12]];

/** Lama kegiatan dalam kata: "15 menit", "1 jam", "5 jam". */
export function lamaTeks(menit: number): string {
  if (menit < 60) return `${menit} menit`;
  if (menit % 60 === 0) return `${menit / 60} jam`;
  return `${Math.floor(menit / 60)} jam ${menit % 60} menit`;
}

/** B3 Sortir Kegiatan: enam kegiatan, empat bagian hari. */
export const RONDE_SORTIR_B: KegiatanId[][] = [
  ["sarapan", "kantin", "bermain", "tidur", "sekolah", "makanMalam"],
  ["bangun", "pulang", "mandiSore", "belajarMalam", "olahraga", "sikatGigi"],
  ["menyisir", "cuciTangan", "bermainBola", "tidur", "mandiPagi", "makanMalam"],
];

/** B4 Jodohkan Kegiatan dan Jam: empat kegiatan dengan jam 12 berbeda. */
export const RONDE_JODOH_B: KegiatanId[][] = [
  ["sarapan", "sekolah", "kantin", "bermain"],
  ["bangun", "belajarMalam", "tidur", "kantin"],
  ["olahraga", "bermainBola", "makanMalam", "sikatGigi"],
];

/** B5 Mana Lebih Lama: dua pasang kegiatan per ronde, tanya lebih lama atau lebih sebentar. */
export type PasangLama = { a: KegiatanId; b: KegiatanId; tanya: "lama" | "sebentar" };
export const RONDE_LAMA_B: PasangLama[][] = [
  [{ a: "menyisir", b: "mandiPagi", tanya: "lama" }, { a: "tidur", b: "sikatGigi", tanya: "sebentar" }],
  [{ a: "sekolah", b: "sarapan", tanya: "lama" }, { a: "cuciTangan", b: "bermainBola", tanya: "sebentar" }],
  [{ a: "olahraga", b: "mandiPagi", tanya: "lama" }, { a: "makanMalam", b: "belajarMalam", tanya: "sebentar" }],
  [{ a: "bermain", b: "bermainBola", tanya: "lama" }, { a: "bangun", b: "kantin", tanya: "sebentar" }],
];
export const lebihLama = (p: PasangLama): KegiatanId => {
  const x = KEGIATAN[p.a].menit;
  const y = KEGIATAN[p.b].menit;
  if (p.tanya === "lama") return x > y ? p.a : p.b;
  return x < y ? p.a : p.b;
};

/** B6 Urutkan Hariku: empat kegiatan, urut menurut jam 24. */
export const RONDE_URUT_B: KegiatanId[][] = [
  ["bangun", "sarapan", "sekolah", "kantin"],
  ["sekolah", "kantin", "bermain", "tidur"],
  ["olahraga", "mandiSore", "makanMalam", "tidur"],
];
export const urutKegiatan = (ids: readonly KegiatanId[]): KegiatanId[] => [...ids].sort((x, y) => KEGIATAN[x].jam24 - KEGIATAN[y].jam24);

/** B7 Garis Waktu: empat kegiatan, satu di tiap bagian hari. */
export const RONDE_GARIS_B: KegiatanId[][] = [
  ["sarapan", "kantin", "bermain", "tidur"],
  ["olahraga", "kantin", "mandiSore", "belajarMalam"],
  ["sekolah", "pulang", "bermainBola", "sikatGigi"],
];

/** B8 Memori: empat pasang kegiatan dan muka jam. */
export const RONDE_MEMORI_B: KegiatanId[][] = [
  ["sarapan", "sekolah", "kantin", "tidur"],
  ["bangun", "bermain", "makanMalam", "sikatGigi"],
  ["olahraga", "bermainBola", "tidur", "kantin"],
];

/** B9 Berapa Jam: mulai dan selesai (jam 24). */
export type SoalSelisih = { mulai: number; selesai: number; kegiatan: string };
export const RONDE_SELISIH_B: SoalSelisih[][] = [
  [{ mulai: 6, selesai: 7, kegiatan: "Kira berolahraga" }, { mulai: 7, selesai: 12, kegiatan: "Tika dan teman belajar di sekolah" }],
  [{ mulai: 12, selesai: 16, kegiatan: "Halim menunggu waktu bermain" }, { mulai: 16, selesai: 19, kegiatan: "Malosi bermain dan membantu ibu" }],
  [{ mulai: 5, selesai: 9, kegiatan: "Upe bersiap dan berangkat" }, { mulai: 19, selesai: 21, kegiatan: "Lili belajar dan bersiap tidur" }],
];

/** B10 Temukan Jam: empat muka jam di dinding, dua soal per ronde. */
export const RONDE_TEMUKANJAM_B: number[][] = [[3, 6, 9, 12], [2, 5, 8, 11], [1, 4, 7, 10]];

/* ------------------------------ Picture B ------------------------------ */

export const RONDE_BACAJAM_PB: number[][] = [[6, 9, 12], [4, 7, 10], [1, 3, 8]];
export const RONDE_DIGITAL_PB: number[][] = [[2, 6, 9, 12], [1, 4, 7, 11], [3, 5, 8, 10]];

/** P3 Batang Lama: lama kegiatan (jam) tiap huruf, tanya terlama. */
export type BatangLama = { id: string; jam: number };
export const RONDE_BATANGLAMA_PB: BatangLama[][] = [
  [{ id: "A", jam: 2 }, { id: "B", jam: 5 }, { id: "C", jam: 1 }],
  [{ id: "D", jam: 3 }, { id: "E", jam: 6 }, { id: "F", jam: 4 }, { id: "G", jam: 2 }],
  [{ id: "H", jam: 1 }, { id: "I", jam: 7 }, { id: "J", jam: 3 }],
];

/** P5 Urutkan Jam: empat jam 24 per ronde (tiap jam 12 berbeda). */
export const RONDE_URUTJAM_PB: number[][] = [[17, 6, 12, 21], [7, 15, 5, 20], [11, 4, 16, 19]];
/** P6 Sortir ke bagian hari: enam jam 24 per ronde. */
export const RONDE_SORTIRJAM_PB: number[][] = [[5, 12, 16, 21, 8, 14], [6, 13, 17, 19, 9, 11], [7, 12, 15, 20, 4, 18]];
/** P7 Hitung blok jam dan P9 Tally jam: pasangan mulai dan selesai. */
export const RONDE_BLOK_PB: [number, number][][] = [[[6, 8], [9, 13]], [[7, 11], [14, 15]], [[5, 11], [16, 19]]];
export const RONDE_TALLYJAM_PB: [number, number][][] = [[[6, 9], [12, 14]], [[7, 10], [14, 21]], [[5, 8], [13, 18]]];
/** P10 Garis jam: tiga jam 12 per ronde. */
export const RONDE_GARISJAM_PB: number[][] = [[2, 6, 11], [3, 8, 12], [1, 5, 9]];
/** P8 Tabel jam dan bagian hari. */
export const RONDE_TABEL_PB: TabelRonde[] = [
  {
    judul: "Bagian hari menurut jam",
    kepala: ["Jam", "Bagian hari"],
    baris: [6, 12, 16, 21].map((j) => ({ label: digital(j), jawab: bagianHari(j) })),
    kartu: ["pagi", "siang", "sore", "malam"],
  },
  {
    judul: "Bagian hari menurut jam, ronde dua",
    kepala: ["Jam", "Bagian hari"],
    baris: [7, 13, 17, 19].map((j) => ({ label: digital(j), jawab: bagianHari(j) })),
    kartu: ["pagi", "siang", "sore", "malam"],
  },
];

/* ------------------------------ Abstract B ------------------------------ */

/** Q1 Isi kalimat waktu. */
export const RONDE_KALIMAT_QB: KalimatIsian[][] = [
  [
    { depan: "Tika sarapan pukul 6", belakang: ".", opsi: ["pagi", "siang", "malam"], benar: 0 },
    { depan: "Tika dan teman makan di kantin pukul 12", belakang: ".", opsi: ["sore", "siang", "pagi"], benar: 1 },
    { depan: "Tika tidur sejak pukul 9", belakang: ".", opsi: ["malam", "siang", "pagi"], benar: 0 },
  ],
  [
    { depan: "Berolahraga membutuhkan waktu 60 menit dan mandi 15 menit, jadi berolahraga lebih", belakang: "dari mandi.", opsi: ["sebentar", "cepat", "lama"], benar: 2 },
    { depan: "Mencuci tangan membutuhkan 1 menit dan bermain bola 60 menit, jadi mencuci tangan lebih", belakang: "dari bermain bola.", opsi: ["sebentar", "lama", "panjang"], benar: 0 },
    { depan: "Tika bermain bersama adik pukul 4", belakang: ".", opsi: ["pagi", "malam", "sore"], benar: 2 },
  ],
];
export const RONDE_BENARSALAH_QB: Pernyataan[][] = [
  [
    { teks: "Jarum pendek jam menunjukkan jam.", benar: true, penjelasan: "Jarum pendek menunjuk jam, jarum panjang menunjuk menit." },
    { teks: "Jarum panjang di angka 12 dan jarum pendek di angka 5 menunjukkan pukul 5 tepat.", benar: true, penjelasan: "Jarum panjang di 12 berarti tepat. Jarum pendek di 5 berarti jam 5." },
    { teks: "Jarum panjang menunjukkan jam.", benar: false, penjelasan: "Jarum panjang menunjukkan menit." },
    { teks: "Pukul 6 pagi termasuk bagian hari pagi.", benar: bagianHari(6) === "pagi", penjelasan: "Pukul 6 ada di pagi hari." },
    { teks: "Tidur malam lebih sebentar dari menyikat gigi.", benar: KEGIATAN.tidur.menit < KEGIATAN.sikatGigi.menit, penjelasan: "Tidur malam jauh lebih lama daripada menyikat gigi." },
  ],
  [
    { teks: "Jam digital 05.00 sama dengan pukul 5 tepat.", benar: true, penjelasan: "Angka 05 adalah jam dan 00 adalah menit." },
    { teks: "Belajar di sekolah lebih lama dari sarapan.", benar: KEGIATAN.sekolah.menit > KEGIATAN.sarapan.menit, penjelasan: "Belajar di sekolah lima jam, sarapan dua puluh menit." },
    { teks: "Pukul 12 siang termasuk bagian hari malam.", benar: bagianHari(12) === "malam", penjelasan: "Pukul 12 siang ada di siang hari." },
    { teks: "Mencuci tangan lebih lama dari bermain bola.", benar: KEGIATAN.cuciTangan.menit > KEGIATAN.bermainBola.menit, penjelasan: "Mencuci tangan hanya sekitar satu menit." },
    { teks: "Kegiatan sehari-hari dapat diurutkan menurut waktunya.", benar: true, penjelasan: "Dari pagi, siang, sore, sampai malam." },
  ],
];
export const RONDE_SUSUNKATA_QB: { kata: string[]; pengecoh: string }[] = [
  { kata: ["Jarum", "pendek", "menunjukkan", "jam"], pengecoh: "menit" },
  { kata: ["Tika", "sarapan", "pukul", "6", "pagi"], pengecoh: "malam" },
  { kata: ["Berolahraga", "lebih", "lama", "dari", "mandi"], pengecoh: "sebentar" },
  { kata: ["Tika", "tidur", "sejak", "pukul", "9", "malam"], pengecoh: "siang" },
];
export const RONDE_HITUNG_QB: SoalHitung[][] = [
  [
    { teks: "Kira berolahraga mulai pukul 6 sampai pukul 7. Berapa jam Kira berolahraga?", jawab: selisihJam(6, 7), min: 0, max: 8, satuan: "jam", petunjuk: "Dari 6 ke 7 maju satu jam." },
    { teks: "Tika belajar mulai pukul 7 sampai pukul 12. Berapa jam Tika belajar?", jawab: selisihJam(7, 12), min: 0, max: 8, satuan: "jam", petunjuk: "Hitung 8, 9, 10, 11, 12." },
  ],
  [
    { teks: "Halim bermain mulai pukul 4 sampai pukul 6 sore. Berapa jam Halim bermain?", jawab: selisihJam(16, 18), min: 0, max: 8, satuan: "jam", petunjuk: "Dari 4 ke 6 maju dua jam." },
    { teks: "Malosi tidur dari pukul 9 malam sampai pukul 5 pagi. Berapa jam?", jawab: selisihJam(21, 29), min: 0, max: 12, satuan: "jam", petunjuk: "9, 10, 11, 12, 1, 2, 3, 4, 5: hitung 8 kali." },
  ],
  [
    { teks: "Pukul 8 pagi sampai pukul 11 pagi. Berapa jam?", jawab: selisihJam(8, 11), min: 0, max: 8, satuan: "jam", petunjuk: "Maju tiga jam." },
    { teks: "Pukul 1 siang sampai pukul 4 sore. Berapa jam?", jawab: selisihJam(13, 16), min: 0, max: 8, satuan: "jam", petunjuk: "Maju tiga jam." },
  ],
];
export const RONDE_TABEL_QB: TabelRonde[] = [
  {
    judul: "Kegiatan dan bagian hari",
    kepala: ["Kegiatan", "Bagian hari"],
    baris: (["sarapan", "kantin", "bermain", "tidur"] as KegiatanId[]).map((k) => ({ label: KEGIATAN[k].nama, jawab: bagianHari(KEGIATAN[k].jam24) })),
    kartu: ["pagi", "siang", "sore", "malam"],
  },
  {
    judul: "Kegiatan dan bagian hari, ronde dua",
    kepala: ["Kegiatan", "Bagian hari"],
    baris: (["olahraga", "pulang", "mandiSore", "makanMalam"] as KegiatanId[]).map((k) => ({ label: KEGIATAN[k].nama, jawab: bagianHari(KEGIATAN[k].jam24) })),
    kartu: ["pagi", "siang", "sore", "malam"],
  },
];
/** Q6 Pilih bagian hari dari jam digital. */
export const RONDE_PILIHBAGIAN_QB: number[][] = [[7, 12, 16], [5, 13, 19], [9, 14, 21]];
export type SoalDetektifWaktu = { petunjuk: string[]; opsi: string[]; jawab: number; salah: string };
export const RONDE_DETEKTIF_QB: SoalDetektifWaktu[] = [
  { petunjuk: ["Aku terjadi di pagi hari.", "Jarum pendek jam ada di angka 6."], opsi: ["sarapan", "tidur malam", "bermain sore"], jawab: 0, salah: "Sarapan pukul 6 pagi. Tidur malam dan bermain sore tidak terjadi pukul 6 pagi." },
  { petunjuk: ["Aku terjadi setelah pulang sekolah.", "Aku terjadi sekitar pukul 4 sore."], opsi: ["belajar di sekolah", "bermain bersama adik", "bangun tidur"], jawab: 1, salah: "Bermain bersama adik pukul 4 sore. Belajar di sekolah dan bangun tidur terjadi di pagi hari." },
  { petunjuk: ["Aku dilakukan paling lama.", "Aku terjadi di malam hari."], opsi: ["menyikat gigi", "tidur malam", "makan malam"], jawab: 1, salah: "Tidur malam berlangsung sekitar delapan jam, paling lama." },
  { petunjuk: ["Aku lebih sebentar dari mandi.", "Aku dilakukan di pagi hari."], opsi: ["menyisir rambut", "belajar di sekolah", "berolahraga"], jawab: 0, salah: "Menyisir rambut hanya sekitar lima menit, lebih sebentar dari mandi." },
];
export const PETA_KONSEP_B: { pusat: string; kotak: KotakPeta[] }[] = [
  {
    pusat: "Membaca jam",
    kotak: [
      { label: "Jarum pendek menunjukkan", opsi: ["jam", "menit", "detik"], benar: 0 },
      { label: "Jarum panjang menunjukkan", opsi: ["menit", "jam", "hari"], benar: 0 },
      { label: "Pukul 5 tepat", opsi: ["jarum pendek di 5 dan jarum panjang di 12", "jarum pendek di 12 dan jarum panjang di 5", "kedua jarum di 5"], benar: 0 },
      { label: "Menurutku, untuk membaca jam kita", opsi: ["melihat jarum pendek dulu, lalu jarum panjang", "menebak angka yang paling besar", "menghitung semua angka"], benar: 0 },
    ],
  },
  {
    pusat: "Waktu kegiatan",
    kotak: [
      { label: "Bagian hari", opsi: ["pagi, siang, sore, dan malam", "satu, dua, tiga, dan empat", "merah, biru, kuning, dan hijau"], benar: 0 },
      { label: "Kegiatan yang lebih lama", opsi: ["tidur malam daripada menyikat gigi", "mencuci tangan daripada bermain bola", "menyisir daripada mandi"], benar: 0 },
      { label: "Kata untuk membandingkan waktu", opsi: ["lebih lama dan lebih sebentar", "lebih tinggi dan lebih rendah", "lebih berat dan lebih ringan"], benar: 0 },
      { label: "Menurutku, mengurutkan kegiatan membantu kita", opsi: ["mengatur hari dengan tertib", "melupakan jadwal", "menunda belajar"], benar: 0 },
    ],
  },
];
/** Q9 Urutkan jam digital: jam 24 per ronde. */
export const RONDE_URUTDIGITAL_QB: number[][] = [[17, 6, 12, 21], [20, 5, 15, 9], [14, 4, 18, 8]];
/** Q10 Ketuk semua waktu pagi: enam jam 24 per ronde. */
export type SoalKetukBagian = { bagian: BagianHari; jam: number[] };
export const RONDE_KETUKBAGIAN_QB: SoalKetukBagian[] = [
  { bagian: "pagi", jam: [5, 12, 7, 16, 9, 21] },
  { bagian: "malam", jam: [19, 6, 13, 21, 15, 8] },
  { bagian: "sore", jam: [16, 7, 17, 12, 20, 15] },
];
