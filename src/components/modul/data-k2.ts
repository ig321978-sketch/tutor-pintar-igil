/**
 * Data murni Matematika Kelas 2 Bab 1 (Ayo Membilang sampai dengan 50): nama bilangan, uraian nilai tempat,
 * dan semua ronde permainan Sub-Bab A (menghitung, membaca, menulis) dan Sub-Bab B (nilai tempat).
 * Tanpa React dan tanpa impor, supaya bisa diuji di Node (scripts/uji-data-k2.mjs).
 */

/* ------------------------------ Nama bilangan ----------------------------- */

const SATUAN = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];

/** Nama bilangan cacah 0 sampai 999 dalam huruf kecil. Contoh: 26 menjadi "dua puluh enam". */
export function namaBilangan(n: number): string {
  const x = Math.max(0, Math.min(999, Math.floor(n)));
  if (x < 10) return SATUAN[x];
  if (x === 10) return "sepuluh";
  if (x === 11) return "sebelas";
  if (x < 20) return `${SATUAN[x - 10]} belas`;
  if (x < 100) {
    const p = Math.floor(x / 10);
    const s = x % 10;
    return s === 0 ? `${SATUAN[p]} puluh` : `${SATUAN[p]} puluh ${SATUAN[s]}`;
  }
  const r = Math.floor(x / 100);
  const sisa = x % 100;
  const depan = r === 1 ? "seratus" : `${SATUAN[r]} ratus`;
  return sisa === 0 ? depan : `${depan} ${namaBilangan(sisa)}`;
}

/** Huruf pertama kapital, untuk judul dan tombol. */
export const NamaBilangan = (n: number) => {
  const k = namaBilangan(n);
  return k.charAt(0).toUpperCase() + k.slice(1);
};

/** Cara membaca per suku kata, seperti di buku (misalnya "dua-pu-luh e-nam"). */
export const sukuKata = (n: number): string => {
  const peta: Record<string, string> = {
    nol: "nol",
    satu: "sa-tu",
    dua: "dua",
    tiga: "ti-ga",
    empat: "em-pat",
    lima: "li-ma",
    enam: "e-nam",
    tujuh: "tu-juh",
    delapan: "de-la-pan",
    sembilan: "sem-bi-lan",
    sepuluh: "se-pu-luh",
    sebelas: "se-be-las",
    belas: "be-las",
    puluh: "pu-luh",
    seratus: "se-ra-tus",
    ratus: "ra-tus",
  };
  return namaBilangan(n)
    .split(" ")
    .map((k) => peta[k] ?? k)
    .join(" ");
};

/* ------------------------------ Nilai tempat ------------------------------ */

export const uraiK2 = (n: number) => ({ puluhan: Math.floor(n / 10), satuan: n % 10 });

/** Tiga pilihan di sekitar kunci. Urutan diputar menurut kunci supaya kunci tidak selalu di tengah. */
export function opsiSekitar(n: number, batas: [number, number] = [0, 50]): number[] {
  let mulai = n - 1;
  if (mulai < batas[0]) mulai = batas[0];
  if (mulai + 2 > batas[1]) mulai = batas[1] - 2;
  const dasar = [mulai, mulai + 1, mulai + 2];
  const putar = n % 3;
  return [...dasar.slice(putar), ...dasar.slice(0, putar)];
}

/** Semua cara menulis n sebagai p puluhan dan s satuan, dengan p dari n/10 turun sampai 0. */
export function semuaCara(n: number): { p: number; s: number }[] {
  const cara: { p: number; s: number }[] = [];
  for (let p = Math.floor(n / 10); p >= 0; p -= 1) cara.push({ p, s: n - p * 10 });
  return cara;
}

/* ====================================================================== */
/* SUB-BAB A. Menghitung, membaca, dan menulis bilangan sampai dengan 50.   */
/* ====================================================================== */

/** A1 Ikat Sepuluh Pensil: banyak pensil per ronde. Ikat berkali-kali sampai sisa kurang dari sepuluh. */
export const RONDE_IKAT_K2 = [23, 32, 41];

/** A2 Hitung Tas di Loker: banyak tas. Baris pertama 1 sampai 10, baris kedua 11 sampai 20, dan seterusnya. */
export const RONDE_LOKER_K2 = [18, 26, 37];

/** A3 Susun Balok: banyak balok. Satu susun penuh berisi sepuluh. */
export const RONDE_SUSUN_K2 = [14, 22, 31];

/** A4 Tebak Isi Kantong: banyak kelereng. */
export const RONDE_TEBAK_K2 = [18, 27, 35];

/** A5 Warnai Lima Bingkai Sepuluh. */
export const RONDE_BINGKAI_K2 = [26, 38, 47];

/** A6 Tarik Garis Berurutan: bilangan awal dan akhir tiap ronde. Letak titik dibuat tetap dan tidak berpotongan. */
export const RONDE_GARIS_K2: { dari: number; sampai: number }[] = [
  { dari: 20, sampai: 35 },
  { dari: 31, sampai: 42 },
  { dari: 38, sampai: 50 },
];

/** A7 Jalur Bilangan: arah, bilangan pertama pada jalur, dan bilangan yang disembunyikan. */
export const RONDE_JALUR_K2: { arah: "maju" | "mundur"; awal: number; akhir: number; sembunyi: number[] }[] = [
  { arah: "maju", awal: 20, akhir: 30, sembunyi: [22, 25, 28] },
  { arah: "mundur", awal: 30, akhir: 20, sembunyi: [29, 26, 23, 21] },
  { arah: "maju", awal: 41, akhir: 50, sembunyi: [43, 47, 49] },
];

/** A8 Jodohkan Lambang dan Nama: empat bilangan per ronde. */
export const RONDE_JODOH_K2 = [
  [21, 25, 29, 30],
  [31, 36, 40, 44],
  [27, 38, 45, 50],
];

/** A9 Detektif Bilangan Misterius. */
export type SoalDetektifK2 = { petunjuk: string[]; opsi: number[]; jawab: number; salah: string };
export const RONDE_DETEKTIF_K2: SoalDetektifK2[] = [
  {
    petunjuk: ["Aku datang tepat setelah 24.", "Aku lebih kecil dari 26."],
    opsi: [24, 25, 26],
    jawab: 25,
    salah: "Hitung maju satu dari dua puluh empat. Bilangan itu juga lebih kecil dari dua puluh enam.",
  },
  {
    petunjuk: ["Aku sama dengan 20 + 8.", "Namaku dua puluh delapan."],
    opsi: [18, 28, 82],
    jawab: 28,
    salah: "Dua puluh ditambah delapan. Dua puluh itu dua puluhan, jadi angka puluhannya 2 dan angka satuannya 8.",
  },
  {
    petunjuk: ["Aku berada di antara 38 dan 40.", "Aku sama dengan 30 + 9."],
    opsi: [37, 39, 41],
    jawab: 39,
    salah: "Di antara tiga puluh delapan dan empat puluh hanya ada satu bilangan. Itu juga tiga puluh ditambah sembilan.",
  },
  {
    petunjuk: ["Namaku empat puluh tujuh.", "Tulislah lambangku: puluhan dulu, lalu satuan."],
    opsi: [37, 47, 74],
    jawab: 47,
    salah: "Empat puluh tujuh ditulis 4 untuk empat puluhan, lalu 7 untuk tujuh satuan. Hati-hati, 74 dibaca tujuh puluh empat.",
  },
];

/** A10 Kanvas: ronde 1 bilangan tetap, ronde 2 anak memilih salah satu. */
export const TULIS_A_RONDE1 = 26;
export const TULIS_A_PILIHAN = [31, 38, 45];

/* ====================================================================== */
/* SUB-BAB B. Nilai tempat.                                                */
/* ====================================================================== */

/** B1 Papan Nilai Tempat: bilangan yang harus dibuat dengan batang puluhan dan kubus satuan. */
export const RONDE_PAPAN_K2 = [14, 27, 35, 48];

/** B2 Mesin Tukar: keadaan awal dan tujuan (puluhan, satuan). Nilai bilangan selalu tetap. */
export const RONDE_TUKAR_K2: { awal: [number, number]; tujuan: [number, number] }[] = [
  { awal: [0, 26], tujuan: [2, 6] },
  { awal: [2, 6], tujuan: [1, 16] },
  { awal: [1, 24], tujuan: [3, 4] },
];

/** B3 Pesanan Toko Kelereng: banyak kelereng yang dipesan. Kantong penuh berisi sepuluh. */
export const RONDE_TOKO_K2 = [23, 38, 41];

/** B4 Hitung Loncat Sepuluh: banyak rak telur penuh (sepuluh) dan telur lepas. */
export const RONDE_RAK_K2: { rak: number; lepas: number }[] = [
  { rak: 3, lepas: 4 },
  { rak: 4, lepas: 2 },
  { rak: 2, lepas: 7 },
];

/** B5 Isi Tabel dari Batang dan Titik. */
export const RONDE_TABEL_K2 = [26, 38, 45];

/** B6 Tempatkan di Garis Bilangan: bilangan yang dicari. */
export const RONDE_GARISB_K2 = [34, 27, 48];

/** B7 Pilih Semua Cara yang Benar: bilangan dan tiap kandidat (p puluhan, s satuan) beserta benar atau tidak. */
export type KandidatK2 = { p: number; s: number };
export type RondeCaraK2 = { n: number; kandidat: KandidatK2[] };
export const RONDE_CARA_K2: RondeCaraK2[] = [
  { n: 46, kandidat: [{ p: 4, s: 6 }, { p: 3, s: 16 }, { p: 2, s: 16 }, { p: 0, s: 46 }] },
  { n: 35, kandidat: [{ p: 2, s: 15 }, { p: 3, s: 5 }, { p: 2, s: 5 }, { p: 1, s: 25 }] },
  { n: 28, kandidat: [{ p: 1, s: 8 }, { p: 2, s: 8 }, { p: 1, s: 18 }, { p: 0, s: 28 }] },
];

/** B8 Isi Titik-Titik: bilangan dari "n = ... puluhan + ... satuan". */
export const RONDE_TITIK_K2 = [24, 26, 32, 35];

/** B9 Urutkan Kartu Nilai Tempat: tiga atau empat kartu (p puluhan dan s satuan), diurutkan dari yang terkecil. */
export const RONDE_URUT_K2: KandidatK2[][] = [
  [{ p: 3, s: 2 }, { p: 2, s: 15 }, { p: 1, s: 9 }],
  [{ p: 4, s: 1 }, { p: 2, s: 23 }, { p: 3, s: 9 }],
  [{ p: 1, s: 28 }, { p: 3, s: 4 }, { p: 2, s: 7 }, { p: 4, s: 0 }],
];

/** B10 Kanvas: ronde 1 bilangan tetap, ronde 2 anak memilih salah satu. */
export const TULIS_B_RONDE1 = { p: 2, s: 6 };
export const TULIS_B_PILIHAN = [35, 43, 48];

export const nilaiKandidat = (k: KandidatK2) => k.p * 10 + k.s;

/* ====================================================================== */
/* SUB-BAB C. Membandingkan dua bilangan atau lebih.                       */
/* ====================================================================== */

export type JenisBanding = "kiri" | "kanan" | "sama";

/** Sisi mana yang lebih besar: "kiri" bila a lebih besar, "kanan" bila b lebih besar, "sama" bila nilainya sama. */
export const bandingkan = (a: number, b: number): JenisBanding => (a > b ? "kiri" : a < b ? "kanan" : "sama");

/** Tanda lebih besar, lebih kecil, atau sama dengan antara a dan b. */
export const tandaBanding = (a: number, b: number): ">" | "<" | "=" => (a > b ? ">" : a < b ? "<" : "=");

/** Kata untuk tanda, dibacakan Suara Guru: bukan simbolnya. */
export const kataBanding = (a: number, b: number): string => (a > b ? "lebih besar dari" : a < b ? "lebih kecil dari" : "sama dengan");

export type AlasanBanding = "puluhan" | "satuan" | "sama";

/** Apa yang menentukan: puluhan bila puluhannya beda, satuan bila puluhannya sama, sama bila kedua angka sama. */
export function alasanBanding(a: number, b: number): AlasanBanding {
  const x = uraiK2(a);
  const y = uraiK2(b);
  if (x.puluhan !== y.puluhan) return "puluhan";
  if (x.satuan !== y.satuan) return "satuan";
  return "sama";
}

/** C1 Hitung Stoples Kira: banyak permen, dua tokoh penebak, dan tebakannya. */
export type RondeStoplesK2 = { n: number; tokoh: [string, string]; tebakan: [number, number] };
export const RONDE_STOPLES_K2: RondeStoplesK2[] = [
  { n: 26, tokoh: ["Malosi", "Halim"], tebakan: [20, 30] },
  { n: 38, tokoh: ["Tika", "Lili"], tebakan: [38, 45] },
  { n: 43, tokoh: ["Kira", "Upe"], tebakan: [30, 40] },
];

/** C2 Pasangkan Satu-Satu: dua bilangan per ronde (kiri, kanan). */
export const RONDE_PASANG_K2: [number, number][] = [
  [26, 32],
  [24, 29],
  [41, 38],
];

/** C3 Neraca Dua Piring: piring yang tetap, isinya, dan tujuan untuk piring yang lain. */
export type RondeNeracaK2 = { tetap: "kiri" | "kanan"; p: number; s: number; tujuan: "besar" | "kecil" | "sama" };
export const RONDE_NERACA_K2: RondeNeracaK2[] = [
  { tetap: "kanan", p: 2, s: 8, tujuan: "besar" },
  { tetap: "kiri", p: 3, s: 5, tujuan: "kecil" },
  { tetap: "kiri", p: 3, s: 4, tujuan: "sama" },
];

/** C4 Susun di Rak Kelereng: empat bilangan dan arah urutan. */
export type RondeRakKelerengK2 = { isi: number[]; arah: "kecil" | "besar" };
export const RONDE_RAKKELERENG_K2: RondeRakKelerengK2[] = [
  { isi: [23, 20, 34, 45], arah: "kecil" },
  { isi: [34, 45, 32, 37], arah: "besar" },
  { isi: [24, 45, 44, 32], arah: "kecil" },
];

/** Urutan indeks yang benar untuk satu ronde urut: dari paling kecil atau dari paling besar. */
export function urutanBenar(isi: number[], arah: "kecil" | "besar"): number[] {
  return isi
    .map((_, i) => i)
    .sort((a, b) => (arah === "kecil" ? isi[a] - isi[b] : isi[b] - isi[a]));
}

/** P5 Banding di Tabel Nilai Tempat: dua bilangan per ronde (kiri, kanan). */
export const RONDE_TABELBANDING_K2: [number, number][] = [
  [26, 32],
  [24, 29],
  [44, 34],
  [38, 35],
];

/** P6 Jarak di Jalur Bilangan: tebakan pertama, tebakan kedua, hitungan, dan nama penebak. */
export type RondeJarakK2 = { dari: number; sampai: number; n: number; tokoh: [string, string] };
export const RONDE_JARAK_K2: RondeJarakK2[] = [
  { dari: 20, sampai: 30, n: 26, tokoh: ["Malosi", "Halim"] },
  { dari: 30, sampai: 40, n: 34, tokoh: ["Tika", "Lili"] },
  { dari: 40, sampai: 50, n: 45, tokoh: ["Kira", "Upe"] },
];

/** P7 Tukar Dulu, Baru Banding: dua tabel, tabel yang satuannya harus ditukar dulu, lalu dibandingkan. */
export type RondeTukarBandingK2 = { kiri: { p: number; s: number }; kanan: { p: number; s: number }; ubah: "kiri" | "kanan" };
export const RONDE_TUKARBANDING_K2: RondeTukarBandingK2[] = [
  { kiri: { p: 2, s: 3 }, kanan: { p: 1, s: 14 }, ubah: "kanan" },
  { kiri: { p: 3, s: 5 }, kanan: { p: 2, s: 12 }, ubah: "kanan" },
  { kiri: { p: 1, s: 15 }, kanan: { p: 2, s: 8 }, ubah: "kiri" },
  { kiri: { p: 3, s: 3 }, kanan: { p: 2, s: 13 }, ubah: "kanan" },
];

/** Bentuk ringkas (puluhan paling banyak, satuan kurang dari sepuluh) dari p puluhan dan s satuan. */
export const ringkasK2 = (p: number, s: number) => uraiK2(p * 10 + s);

/** A8 Buaya Lapar: pasangan bilangan per ronde (kiri, kanan). Memuat jebakan 19 dan 21 serta pasangan yang sama. */
export const RONDE_BUAYA_K2: [number, number][] = [
  [26, 32],
  [45, 38],
  [19, 21],
  [24, 29],
  [41, 41],
];

/** A9 Duel Kartu Angka: dua kartu, bilangan Igil, dan tujuan menyusun bilangan siswa. */
export type RondeDuelK2 = { kartu: [number, number]; igil: number; tujuan: "besar" | "kecil" | "sama" };
export const RONDE_DUEL_K2: RondeDuelK2[] = [
  { kartu: [3, 4], igil: 35, tujuan: "besar" },
  { kartu: [1, 5], igil: 31, tujuan: "besar" },
  { kartu: [2, 4], igil: 42, tujuan: "sama" },
  { kartu: [2, 5], igil: 30, tujuan: "kecil" },
];

/** Dua cara menyusun dua kartu: [puluhan, satuan]. */
export const susunanKartu = (k: [number, number]): [number, number][] => [
  [k[0], k[1]],
  [k[1], k[0]],
];

/** Apakah susunan memenuhi tujuan terhadap bilangan Igil. */
export function memenuhiDuel(susunan: number, igil: number, tujuan: "besar" | "kecil" | "sama"): boolean {
  return tujuan === "besar" ? susunan > igil : tujuan === "kecil" ? susunan < igil : susunan === igil;
}

/** A10 Teka-teki Kartu: tokoh yang diketahui, tokoh yang kurang dari dia, dan tokoh yang lebih dari tokoh kedua. */
export type RondeTekaK2 = {
  diketahui: { nama: string; nilai: number };
  kurang: { nama: string; selisih: number };
  lebih: { nama: string; selisih: number };
};
export const RONDE_TEKA_K2: RondeTekaK2[] = [
  { diketahui: { nama: "Kira", nilai: 34 }, kurang: { nama: "Lili", selisih: 2 }, lebih: { nama: "Malosi", selisih: 3 } },
  { diketahui: { nama: "Tika", nilai: 41 }, kurang: { nama: "Dodi", selisih: 5 }, lebih: { nama: "Nia", selisih: 7 } },
];

/** Nilai tiga tokoh teka-teki: diketahui, yang kurang (diketahui dikurangi selisih), dan yang lebih (kurang ditambah selisih). */
export function nilaiTeka(r: RondeTekaK2) {
  const diketahui = r.diketahui.nilai;
  const kurang = diketahui - r.kurang.selisih;
  const lebih = kurang + r.lebih.selisih;
  return { diketahui, kurang, lebih };
}

/** Kartu angka untuk bagian terakhir teka-teki: pilih dua kartu untuk bilangan paling besar dan paling kecil. */
export const KARTU_TEKA_K2 = [1, 2, 3, 4];

/** Bilangan dua angka terbesar dan terkecil yang bisa dibuat dari dua kartu berbeda. */
export function besarKecilKartu(kartu: number[]) {
  const nilai: number[] = [];
  for (const a of kartu) for (const b of kartu) if (a !== b) nilai.push(a * 10 + b);
  return { besar: Math.max(...nilai), kecil: Math.min(...nilai) };
}
