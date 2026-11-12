/**
 * Definisi Mesin Bertahap Kelas 5 Bab 6 (Sudut), dijalankan mesin berstasiun mesin-bertahap-k3b1.ts dan dieja ejaK5B6.
 * Semua pertanyaan, kunci, dan pengecoh DIHITUNG dari ukuran pojok tiap kasus (ukuran hanya dipakai untuk menimbang, tidak
 * pernah ditulis di layar).
 *  - MESIN_POJOK (A): Temukan → Patokan → Banding → Putuskan   (kasus Bingkai Foto, Pintu Lemari, Papan Meja)
 *    Temukan  : banyak pojok yang berimpit dengan patokan siku-siku.
 *    Patokan  : banyak pojok yang tidak berimpit.
 *    Banding  : jenis pojok yang tidak berimpit (lancip atau tumpul).
 *    Putuskan : pakai pojok itu atau ganti.
 * Data dari Buku Siswa Kelas V Bab 6 Sub-Bab A (pojok bingkai, penggaris siku, patokan lipatan).
 *  - MESIN_SUDUT (B): Tunjuk → Banding → Jenis → Jam   (kasus Jam Dinding, Gunting, Kipas Lipat)
 *    Tunjuk : nama bagian sudut (titik sudut, kaki sudut, daerah sudut).
 *    Banding: sudut lebih sempit, sama besar, atau lebih lebar dari patokan siku-siku.
 *    Jenis  : lancip, siku-siku, atau tumpul.
 *    Jam    : jenis sudut antara dua jarum jam pada pukul bulat.
 * Data dari Buku Siswa Kelas V Bab 6 Sub-Bab B (jam, gunting, kipas, Tabel 6.3).
 *  - MESIN_BUSUR (C): Pasang → Skala → Baca → Jenis   (kasus Kipas Pakarena, Jarum Jam, Lipatan Kertas)
 *    Pasang: banyak langkah menggeser busur sampai pusatnya di titik sudut.
 *    Skala : skala yang mulai dari nol di sisi kaki pertama.
 *    Baca  : ukuran sudut dari angka pada skala yang benar.
 *    Jenis : nama sudut menurut ukurannya, nol sampai penuh.
 * Data dari Buku Siswa Kelas V Bab 6 Sub-Bab C (kipas Pakarena 125°, jam pukul satu, lipatan siku-siku, sudut lurus dan releks).
 * Murni: tanpa React, tanpa jaringan. Hanya impor tipe. Diuji di scripts/uji-lab-k5b6.mjs.
 */
import type { DefMesin, KasusMesin, LangkahMesin, StasiunDef } from "./mesin-bertahap-k3b1";

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);
const susunOpsi = (benar: string, salah: string[], idx: number): string[] => putar([benar, ...salah], idx % (1 + salah.length));
/** Dua pengecoh pertama dari kandidat: bulat tak negatif, unik, bukan benar. Bila kurang, dilengkapi benar + 1, benar + 2. */
function pengecoh(benar: number, kandidat: number[]): number[] {
  const hasil: number[] = [];
  for (const n of [...kandidat, benar + 1, benar + 2]) {
    if (hasil.length < 2 && n >= 0 && n !== benar && !hasil.includes(n)) hasil.push(n);
  }
  return hasil;
}

const SIKU = 90;
const URUT = ["pertama", "kedua", "ketiga", "keempat"];
const JENIS = (deg: number): "lancip" | "siku-siku" | "tumpul" => (deg < SIKU ? "lancip" : deg === SIKU ? "siku-siku" : "tumpul");

/* ------------------------------ A: Mesin Pojok ------------------------------ */

/** pojok: ukuran tiap pojok (derajat). banding: pojok yang tidak siku yang dibandingkan. putuskan: pojok yang diputuskan dipakai atau diganti. */
export type KasusPojok = { id: string; nama: string; konteks: string; pojok: number[]; banding: number; putuskan: number };
export const KASUS_POJOK: KasusPojok[] = [
  { id: "bingkai", nama: "Bingkai Foto", konteks: "Pak Tukang memeriksa keempat pojok kayu bingkai foto", pojok: [90, 90, 90, 50], banding: 3, putuskan: 0 },
  { id: "lemari", nama: "Pintu Lemari", konteks: "Pak Tukang memeriksa keempat pojok papan pintu lemari", pojok: [90, 90, 60, 120], banding: 3, putuskan: 2 },
  { id: "meja", nama: "Papan Meja", konteks: "Pak Tukang memeriksa keempat pojok papan meja", pojok: [60, 120, 60, 120], banding: 0, putuskan: 1 },
];

export const STASIUN_POJOK: StasiunDef[] = [
  { id: "temukan", nama: "Temukan", ikon: "🕵️" },
  { id: "patokan", nama: "Patokan", ikon: "📄" },
  { id: "banding", nama: "Banding", ikon: "⚖️" },
  { id: "putuskan", nama: "Putuskan", ikon: "✅" },
];

/** Banyak pojok yang berimpit dengan patokan siku-siku. */
export const banyakSiku = (pojok: number[]): number => pojok.filter((d) => d === SIKU).length;
export const letakPojok = (deg: number): "berimpit dengan" | "masuk ke dalam" | "keluar dari" => (deg === SIKU ? "berimpit dengan" : deg < SIKU ? "masuk ke dalam" : "keluar dari");

export function kasusMesinPojok(c: KasusPojok, idx: number): KasusMesin {
  const n = c.pojok.length;
  const s = banyakSiku(c.pojok);
  const bd = c.pojok[c.banding];
  const pt = c.pojok[c.putuskan];
  const jenisB = JENIS(bd);
  const jenisSalah = (["lancip", "siku-siku", "tumpul"] as const).filter((j) => j !== jenisB);
  const keputusanBenar = pt === SIKU ? "pakai pojok itu" : `ganti, pojok itu ${JENIS(pt)}`;
  const keputusanSemua = ["pakai pojok itu", "ganti, pojok itu lancip", "ganti, pojok itu tumpul"];
  const langkah: LangkahMesin[] = [
    {
      stasiun: "temukan",
      tanya: `${c.konteks}. Patokan siku-siku ditempel satu per satu pada keempat pojok. Banyak pojok yang berimpit dengan patokan adalah …`,
      opsi: susunOpsi(`${s} pojok`, pengecoh(s, [n - s, n]).map((v) => `${v} pojok`), idx),
      benar: `${s} pojok`,
      petunjuk: "Yang dihitung hanya pojok yang sisinya berimpit rapi dengan patokan. Pojok yang ada celahnya tidak ikut dihitung.",
    },
    {
      stasiun: "patokan",
      tanya: `Dari keempat pojok ${c.nama.toLowerCase()}, banyak pojok yang tidak berimpit dengan patokan adalah …`,
      opsi: susunOpsi(`${n - s} pojok`, pengecoh(n - s, [s, n]).map((v) => `${v} pojok`), idx + 1),
      benar: `${n - s} pojok`,
      petunjuk: "Pojok yang berimpit dengan patokan itu siku-siku. Sisanya tidak berimpit, jadi bukan siku-siku.",
    },
    {
      stasiun: "banding",
      tanya: `Pojok ${URUT[c.banding]} tidak berimpit dengan patokan. Sisinya ${letakPojok(bd)} patokan. Pojok itu termasuk …`,
      opsi: susunOpsi(jenisB, [...jenisSalah], idx + 2),
      benar: jenisB,
      petunjuk: "Sisi yang masuk ke dalam patokan berarti lebih sempit, yaitu lancip. Sisi yang keluar dari patokan berarti lebih lebar, yaitu tumpul. Berimpit berarti siku-siku.",
    },
    {
      stasiun: "putuskan",
      tanya: `Bingkai harus tepat siku-siku. Sisi pojok ${URUT[c.putuskan]} ${letakPojok(pt)} patokan. Keputusan Pak Tukang …`,
      opsi: susunOpsi(keputusanBenar, keputusanSemua.filter((o) => o !== keputusanBenar), idx + 3),
      benar: keputusanBenar,
      petunjuk: "Pojok yang berimpit dengan patokan boleh dipakai. Pojok yang masuk ke dalam atau keluar dari patokan harus diganti.",
    },
  ];
  return {
    id: c.id,
    nama: c.nama,
    ringkas: `Dari ${n} pojok, ${s} pojok berimpit dengan patokan siku-siku dan ${n - s} pojok tidak berimpit. Pojok ${URUT[c.banding]} ${letakPojok(bd)} patokan, jadi ${jenisB}. Pojok ${URUT[c.putuskan]}: ${keputusanBenar}.`,
    langkah,
  };
}

export const MESIN_POJOK: DefMesin = {
  id: "mesin-pojok-k5b6",
  judul: "Mesin Pojok",
  selesaiId: "mesin-pojok",
  stasiun: STASIUN_POJOK,
  kasus: KASUS_POJOK.map(kasusMesinPojok),
};

/* ------------------------------ B: Mesin Sudut ------------------------------ */

const KATA_JAM = ["dua belas", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas"];
const NAMA_BAGIAN = ["titik sudut", "kaki sudut", "daerah sudut"] as const;
/** Sudut terkecil antara jarum pendek dan jarum panjang pada pukul bulat (derajat, hanya untuk menimbang). */
const sudutJam = (jam: number): number => Math.min(30 * jam, 360 - 30 * jam);
const RELASI = (deg: number): "lebih sempit" | "sama besar" | "lebih lebar" => (deg < SIKU ? "lebih sempit" : deg === SIKU ? "sama besar" : "lebih lebar");

/**
 * bagian: uraian sebuah bagian benda dan namanya. deg: ukuran sudut benda (hanya untuk menimbang, tidak ditulis).
 * pukul: pukul bulat pada jam dinding.
 */
export type KasusSudut = {
  id: string;
  nama: string;
  konteks: string;
  bagian: { uraian: string; nama: (typeof NAMA_BAGIAN)[number] };
  deg: number;
  pukul: number;
};
export const KASUS_SUDUT: KasusSudut[] = [
  { id: "jam", nama: "Jam Dinding", konteks: "Yohana mengamati sebuah jam dinding", bagian: { uraian: "titik pusat tempat kedua jarum bertemu", nama: "titik sudut" }, deg: 60, pukul: 8 },
  { id: "gunting", nama: "Gunting", konteks: "Yohana membuka sebuah gunting", bagian: { uraian: "salah satu bilah gunting", nama: "kaki sudut" }, deg: 130, pukul: 3 },
  { id: "kipas", nama: "Kipas Lipat", konteks: "Yohana membuka sebuah kipas lipat", bagian: { uraian: "daerah kipas di antara dua tulang terluar", nama: "daerah sudut" }, deg: 90, pukul: 2 },
];

export const STASIUN_SUDUT: StasiunDef[] = [
  { id: "tunjuk", nama: "Tunjuk", ikon: "👆" },
  { id: "banding", nama: "Banding", ikon: "⚖️" },
  { id: "jenis", nama: "Jenis", ikon: "📐" },
  { id: "jam", nama: "Jam", ikon: "🕐" },
];

const hurufAwal = (t: string): string => `${t[0].toUpperCase()}${t.slice(1)}`;

export function kasusMesinSudut(c: KasusSudut, idx: number): KasusMesin {
  const rel = RELASI(c.deg);
  const jenis = JENIS(c.deg);
  const jenisSalah = (["lancip", "siku-siku", "tumpul"] as const).filter((j) => j !== jenis);
  const relSemua = ["lebih sempit", "sama besar", "lebih lebar"];
  const jJam = JENIS(sudutJam(c.pukul));
  const jJamSalah = (["lancip", "siku-siku", "tumpul"] as const).filter((j) => j !== jJam);
  const langkah: LangkahMesin[] = [
    {
      stasiun: "tunjuk",
      tanya: `${c.konteks}. ${hurufAwal(c.bagian.uraian)} adalah bagian dari sudut. Bagian itu disebut …`,
      opsi: susunOpsi(c.bagian.nama, NAMA_BAGIAN.filter((n) => n !== c.bagian.nama), idx),
      benar: c.bagian.nama,
      petunjuk: "Titik sudut adalah titik tempat dua garis bertemu. Kaki sudut adalah salah satu dari dua garis itu. Daerah sudut adalah daerah di antara kedua kaki.",
    },
    {
      stasiun: "banding",
      tanya: `Patokan siku-siku ditempelkan pada sudut ${c.nama.toLowerCase()}. Kaki sudut kedua ${letakPojok(c.deg)} patokan. Dibandingkan dengan patokan, sudut itu …`,
      opsi: susunOpsi(rel, relSemua.filter((o) => o !== rel), idx + 1),
      benar: rel,
      petunjuk: "Kaki yang masuk ke dalam patokan berarti lebih sempit. Kaki yang keluar dari patokan berarti lebih lebar. Kaki yang berimpit berarti sama besar.",
    },
    {
      stasiun: "jenis",
      tanya: `Sudut yang ${rel} dari patokan siku-siku disebut sudut …`,
      opsi: susunOpsi(jenis, [...jenisSalah], idx + 2),
      benar: jenis,
      petunjuk: "Lebih sempit dari siku-siku disebut lancip. Sama besar disebut siku-siku. Lebih lebar disebut tumpul.",
    },
    {
      stasiun: "jam",
      tanya: `Jam dinding menunjukkan pukul ${KATA_JAM[c.pukul]}. Jarum pendek menunjuk angka ${KATA_JAM[c.pukul]} dan jarum panjang menunjuk angka dua belas. Sudut antara kedua jarum termasuk …`,
      opsi: susunOpsi(jJam, [...jJamSalah], idx + 3),
      benar: jJam,
      petunjuk: "Bandingkan sudut antara kedua jarum dengan patokan siku-siku. Pukul tiga tepat siku-siku.",
    },
  ];
  return {
    id: c.id,
    nama: c.nama,
    ringkas: `${hurufAwal(c.bagian.uraian)} disebut ${c.bagian.nama}. Sudut ${c.nama.toLowerCase()} ${rel} dari patokan, jadi ${jenis}. Pukul ${KATA_JAM[c.pukul]}, sudut antara kedua jarum ${jJam}.`,
    langkah,
  };
}

export const MESIN_SUDUT: DefMesin = {
  id: "mesin-sudut-k5b6",
  judul: "Mesin Sudut",
  selesaiId: "mesin-sudut",
  stasiun: STASIUN_SUDUT,
  kasus: KASUS_SUDUT.map(kasusMesinSudut),
};

/* ------------------------------ C: Mesin Busur ------------------------------ */

const URUT_UKURAN = ["sudut nol", "sudut lancip", "sudut siku-siku", "sudut tumpul", "sudut lurus", "sudut releks", "sudut penuh"] as const;
const UKURAN_DARI = (deg: number): (typeof URUT_UKURAN)[number] =>
  deg === 0 ? "sudut nol" : deg < 90 ? "sudut lancip" : deg === 90 ? "sudut siku-siku" : deg < 180 ? "sudut tumpul" : deg === 180 ? "sudut lurus" : deg < 360 ? "sudut releks" : "sudut penuh";
/** Skala luar mulai dari nol di sisi kiri, skala dalam mulai dari nol di sisi kanan. */
const SKALA_SISI = (sisi: "kiri" | "kanan"): "luar" | "dalam" => (sisi === "kiri" ? "luar" : "dalam");
const URAIAN_SKALA_M = "Skala luar mulai dari nol di sisi kiri dan skala dalam mulai dari nol di sisi kanan.";
function pengecohPositif(benar: number, kandidat: number[]): number[] {
  const hasil: number[] = [];
  for (const n of [...kandidat, benar + 2, benar + 3]) {
    if (hasil.length < 2 && n > 0 && n !== benar && !hasil.includes(n)) hasil.push(n);
  }
  return hasil;
}

/**
 * geser: pusat busur berada sekian langkah di kanan titik sudut. sisi: tempat kaki pertama. deg: ukuran sudut yang dibaca.
 * jenisDeg: ukuran sudut lain untuk dinamai.
 */
export type KasusBusur = { id: string; nama: string; konteks: string; geser: number; sisi: "kiri" | "kanan"; deg: number; jenisDeg: number };
export const KASUS_BUSUR: KasusBusur[] = [
  { id: "kipas", nama: "Kipas Pakarena", konteks: "Sitti mengukur sudut kipas Pakarena", geser: 2, sisi: "kanan", deg: 125, jenisDeg: 125 },
  { id: "jam", nama: "Jarum Jam", konteks: "Sitti mengukur sudut jarum jam pukul satu", geser: 1, sisi: "kiri", deg: 30, jenisDeg: 180 },
  { id: "lipatan", nama: "Lipatan Kertas", konteks: "Sitti mengukur sudut lipatan kertas siku-siku", geser: 3, sisi: "kanan", deg: 90, jenisDeg: 270 },
];

export const STASIUN_BUSUR: StasiunDef[] = [
  { id: "pasang", nama: "Pasang", ikon: "📐" },
  { id: "skala", nama: "Skala", ikon: "🔢" },
  { id: "baca", nama: "Baca", ikon: "👁️" },
  { id: "jenis", nama: "Jenis", ikon: "⭐" },
];

export function kasusMesinBusur(c: KasusBusur, idx: number): KasusMesin {
  const skala = SKALA_SISI(c.sisi);
  const luar = c.sisi === "kiri" ? c.deg : 180 - c.deg;
  const dalam = c.sisi === "kiri" ? 180 - c.deg : c.deg;
  const nama = UKURAN_DARI(c.jenisDeg);
  const pos = URUT_UKURAN.indexOf(nama);
  const salahUkuran = [URUT_UKURAN[pos - 1] ?? URUT_UKURAN[pos + 2], URUT_UKURAN[pos + 1] ?? URUT_UKURAN[pos - 2]];
  const salahBaca = pengecohPositif(c.deg, [180 - c.deg, c.deg + 10, c.deg - 10]);
  const langkah: LangkahMesin[] = [
    {
      stasiun: "pasang",
      tanya: `${c.konteks}. Pusat busur berada ${c.geser} langkah di kanan titik sudut. Agar pusatnya tepat di titik sudut, busur digeser ke kiri sebanyak … langkah.`,
      opsi: susunOpsi(`${c.geser} langkah`, pengecohPositif(c.geser, [c.geser + 1, c.geser - 1]).map((n) => `${n} langkah`), idx),
      benar: `${c.geser} langkah`,
      petunjuk: "Pusat busur harus tepat di titik sudut. Geser sebanyak jarak pusat busur dari titik sudut, ke arah titik sudut.",
    },
    {
      stasiun: "skala",
      tanya: `${URAIAN_SKALA_M} Kaki pertama sudut ada di sisi ${c.sisi}. Skala yang dipakai adalah …`,
      opsi: susunOpsi(`skala ${skala}`, [skala === "luar" ? "skala dalam" : "skala luar", "skala mana saja"], idx + 1),
      benar: `skala ${skala}`,
      petunjuk: "Pilih skala yang mulai dari nol di sisi kaki pertama, supaya angka dibaca dari nol di kaki pertama.",
    },
    {
      stasiun: "baca",
      tanya: `Kaki pertama ada di sisi ${c.sisi}. Kaki kedua menunjuk angka ${luar} pada skala luar dan angka ${dalam} pada skala dalam. Ukuran sudut adalah …`,
      opsi: susunOpsi(`${c.deg}°`, salahBaca.map((n) => `${n}°`), idx + 2),
      benar: `${c.deg}°`,
      petunjuk: `Baca pada skala ${skala}, karena skala itu mulai dari nol di sisi ${c.sisi}, tempat kaki pertama. Angka pada skala yang satunya adalah 180 dikurangi ukuran sudut.`,
    },
    {
      stasiun: "jenis",
      tanya: `Sudut yang ukurannya ${c.jenisDeg}° termasuk …`,
      opsi: susunOpsi(nama, [...salahUkuran], idx + 3),
      benar: nama,
      petunjuk: "Nol: tepat 0°. Lancip: kurang dari 90°. Siku-siku: 90°. Tumpul: lebih dari 90° dan kurang dari 180°. Lurus: 180°. Releks: lebih dari 180° dan kurang dari 360°. Penuh: 360°.",
    },
  ];
  return {
    id: c.id,
    nama: c.nama,
    ringkas: `Busur digeser ${c.geser} langkah ke kiri. Kaki pertama di sisi ${c.sisi}, jadi skala ${skala}. Ukuran sudut ${c.deg}°. Ukuran ${c.jenisDeg}° adalah ${nama}.`,
    langkah,
  };
}

export const MESIN_BUSUR: DefMesin = {
  id: "mesin-busur-k5b6",
  judul: "Mesin Busur",
  selesaiId: "mesin-busur",
  stasiun: STASIUN_BUSUR,
  kasus: KASUS_BUSUR.map(kasusMesinBusur),
};

export const SEMUA_MESIN_K5B6 = [MESIN_POJOK, MESIN_SUDUT, MESIN_BUSUR];
