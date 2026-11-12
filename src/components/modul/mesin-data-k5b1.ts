/**
 * Definisi Mesin Bertahap Kelas 5 Bab 1 (Bilangan Cacah sampai 100.000), dijalankan mesin berstasiun
 * mesin-bertahap-k3b1.ts dan dieja ejaK5B1. Semua pertanyaan, kunci, dan pengecoh DIHITUNG dari bilangan kasus.
 *  - MESIN_TEMPAT (A): Tulis → Tempat → Nilai → Baca   (14.500, 87.986, 40.350)
 *    Tulis: kata menjadi angka (pengecoh: satu digit hilang, dua digit bertukar). Tempat: tempat satu digit
 *    (pengecoh: tempat tetangga). Nilai: nilai digit itu (pengecoh: digitnya saja, nilai di tempat tetangga).
 *    Baca: bacaan per periode (pengecoh: digit dibaca satu per satu, dua digit bertukar).
 *  - MESIN_BANDING (B): Sejajar → Penentu → Tanda → Urut   (78.897 dan 87.897, 56.560 dan 57.000, 40.200 dan 38.500)
 *    Sejajar: digit puluh ribuan (pengecoh: digit satuan, ribuan, tertukar). Penentu: tempat pertama dari kiri yang
 *    berbeda (pengecoh: satuan, tempat tetangga). Tanda: kalimat < > =. Urut: tiga bilangan naik atau turun
 *    (pengecoh: arah terbalik, diurutkan menurut satuan, urutan asal).
 *  - MESIN_URAIAN (C): Urai → Susun → Tukar → Cek   (38.600, 63.500, 45.600)
 *    Urai: bentuk panjang (pengecoh: digit bergeser satu tempat, digit saja). Susun: banyak kartu 1.000 (pengecoh:
 *    sepuluh kali, banyak kartu 10.000). Tukar: kartu 1.000 setelah menukar kartu 10.000 (pengecoh: hanya ditambah
 *    banyak yang ditukar, hanya sepuluh kali). Cek: total tetap (pengecoh: total berubah).
 *  - MESIN_OPERASI (D): Perkiraan → Kolom → Hasil → Cek   (57.500 + 22.000, 47.900 − 45.750, 64.000 ÷ 4)
 *    Perkiraan: bulatkan ke ribuan terdekat lalu hitung kasar (pengecoh: dibulatkan ke bawah, operasi tertukar). Kolom:
 *    berapa kali menyimpan atau meminjam (pengecoh: satu lebih banyak atau lebih sedikit). Hasil: hasil teliti (pengecoh:
 *    pinjaman terlupa, nol keliru). Cek: operasi kebalikan kembali ke bilangan semula.
 * Data dari Buku Siswa Kelas V Bab 1 (dicocokkan dengan data-k5b1.ts di uji). Murni: tanpa React, tanpa jaringan.
 * Hanya impor tipe. Diuji di scripts/uji-lab-k5b1.mjs.
 */
import type { DefMesin, KasusMesin, LangkahMesin, StasiunDef } from "./mesin-bertahap-k3b1";

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);
const susunOpsi = (benar: string, salah: string[], idx: number): string[] => putar([benar, ...salah], idx % (1 + salah.length));
const duaPengecoh = (benar: string, calon: string[]): string[] => [...new Set(calon.filter((c) => c !== benar))].slice(0, 2);
const angkaPengecoh = (benar: number, calon: number[]): string[] => duaPengecoh(String(benar), calon.filter((v) => v >= 0).map(String));

export const TEMPAT_M = ["ratus ribuan", "puluh ribuan", "ribuan", "ratusan", "puluhan", "satuan"];
const BOBOT_M = [100000, 10000, 1000, 100, 10, 1];
const ANGKA = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];

export const titikM = (n: number): string => (n >= 1000 ? `${Math.floor(n / 1000)}.${String(n % 1000).padStart(3, "0")}` : String(n));
const enam = (n: number): number[] => BOBOT_M.map((b) => Math.floor(n / b) % 10);
const dariEnam = (d: number[]): number => d.reduce((a, v, i) => a + v * BOBOT_M[i], 0);

function puluhM(n: number): string {
  if (n < 10) return ANGKA[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${ANGKA[n - 10]} belas`;
  return n % 10 === 0 ? `${ANGKA[Math.floor(n / 10)]} puluh` : `${ANGKA[Math.floor(n / 10)]} puluh ${ANGKA[n % 10]}`;
}
function ratusM(n: number): string {
  const r = Math.floor(n / 100);
  const s = n % 100;
  const bag = [r === 0 ? "" : r === 1 ? "seratus" : `${ANGKA[r]} ratus`, s === 0 ? "" : puluhM(s)];
  return bag.filter(Boolean).join(" ");
}
/** Bacaan 1 sampai 100.000 per periode. */
export function bacaM(n: number): string {
  const rb = Math.floor(n / 1000);
  const bag = [rb === 0 ? "" : rb === 1 ? "seribu" : `${ratusM(rb)} ribu`, ratusM(n % 1000)];
  return bag.filter(Boolean).join(" ");
}
export const bacaDigitM = (n: number): string => String(n).split("").map((c) => ANGKA[Number(c)]).join(" ");
/** Ribuan dan ratusan bertukar. */
export const tukarM = (n: number): number => {
  const d = enam(n);
  [d[2], d[3]] = [d[3], d[2]];
  return dariEnam(d);
};

/* ------------------------------ A: Mesin Nilai Tempat ------------------------------ */

export type KasusTempat = { id: string; n: number; tempat: string };
export const KASUS_TEMPAT: KasusTempat[] = [
  { id: "14500", n: 14500, tempat: "puluh ribuan" },
  { id: "87986", n: 87986, tempat: "ribuan" },
  { id: "40350", n: 40350, tempat: "ratusan" },
];

export const STASIUN_TEMPAT: StasiunDef[] = [
  { id: "tulis", nama: "Tulis", ikon: "✍️" },
  { id: "tempat", nama: "Tempat", ikon: "📍" },
  { id: "nilai", nama: "Nilai", ikon: "💎" },
  { id: "baca", nama: "Baca", ikon: "🗣️" },
];

export function kasusMesinTempat(k: KasusTempat, idx: number): KasusMesin {
  const t = TEMPAT_M.indexOf(k.tempat);
  const d = enam(k.n)[t];
  const nilai = d * BOBOT_M[t];
  const tetangga = [TEMPAT_M[t - 1], TEMPAT_M[t + 1]].filter(Boolean) as string[];
  const nilaiSalah = [d, nilai * 10, nilai / 10].filter((v) => Number.isInteger(v) && v <= 100000).map(titikM);
  const langkah: LangkahMesin[] = [
    {
      stasiun: "tulis",
      tanya: `Bilangan ${bacaM(k.n)} ditulis dengan angka …`,
      opsi: susunOpsi(titikM(k.n), duaPengecoh(titikM(k.n), [titikM(Math.floor(k.n / 10)), titikM(tukarM(k.n))]), idx),
      benar: titikM(k.n),
      petunjuk: "Tulis digit tiap tempat dari kiri. Nol tetap ditulis agar tempat tidak bergeser.",
    },
    {
      stasiun: "tempat",
      tanya: `Pada ${titikM(k.n)}, digit ${d} ada di tempat …`,
      opsi: susunOpsi(k.tempat, duaPengecoh(k.tempat, tetangga), idx + 1),
      benar: k.tempat,
      petunjuk: "Hitung tempat dari kanan: satuan, puluhan, ratusan, ribuan, puluh ribuan.",
    },
    {
      stasiun: "nilai",
      tanya: `Digit ${d} di tempat ${k.tempat} bernilai …`,
      opsi: susunOpsi(titikM(nilai), duaPengecoh(titikM(nilai), nilaiSalah), idx + 2),
      benar: titikM(nilai),
      petunjuk: `Satu di tempat ${k.tempat} bernilai ${titikM(BOBOT_M[t])}. Jangan hanya menyebut digitnya.`,
    },
    {
      stasiun: "baca",
      tanya: `${titikM(k.n)} dibaca …`,
      opsi: susunOpsi(bacaM(k.n), duaPengecoh(bacaM(k.n), [bacaDigitM(k.n), bacaM(tukarM(k.n))]), idx + 3),
      benar: bacaM(k.n),
      petunjuk: "Kelompokkan tiga digit dari kanan. Baca bagian kiri dengan kata ribu, lalu bagian kanan.",
    },
  ];
  return {
    id: k.id,
    nama: `Bilangan ${titikM(k.n)}`,
    ringkas: `${titikM(k.n)} dibaca ${bacaM(k.n)}. Digit ${d} di tempat ${k.tempat} bernilai ${titikM(nilai)}.`,
    langkah,
  };
}

export const MESIN_TEMPAT: DefMesin = {
  id: "mesin-tempat-k5b1",
  judul: "Mesin Nilai Tempat",
  selesaiId: "mesin-tempat",
  stasiun: STASIUN_TEMPAT,
  kasus: KASUS_TEMPAT.map(kasusMesinTempat),
};

/* ------------------------------ B: Mesin Banding ------------------------------ */

export type KasusBanding = { id: string; angka: number[]; arah: "naik" | "turun" };
/** Dua bilangan pertama dibandingkan; ketiganya diurutkan. */
export const KASUS_BANDING: KasusBanding[] = [
  { id: "78897", angka: [78897, 87897, 56475], arah: "turun" },
  { id: "56560", angka: [56560, 57000, 65750], arah: "naik" },
  { id: "40200", angka: [40200, 38500, 39999], arah: "naik" },
];

export const STASIUN_BANDING: StasiunDef[] = [
  { id: "sejajar", nama: "Sejajar", ikon: "📏" },
  { id: "penentu", nama: "Penentu", ikon: "🔍" },
  { id: "tanda", nama: "Tanda", ikon: "⚖️" },
  { id: "urut", nama: "Urut", ikon: "📶" },
];

export function kasusMesinBanding(k: KasusBanding, idx: number): KasusMesin {
  const [a, b] = k.angka;
  const da = enam(a);
  const db = enam(b);
  // Tempat 1 (puluh ribuan) sampai 5 (satuan) pada tabel enam tempat.
  let p = 1;
  while (p < 5 && da[p] === db[p]) p += 1;
  const tanda = a < b ? "<" : a > b ? ">" : "=";
  const pasang = (i: number) => `${da[i]} dan ${db[i]}`;
  const naik = [...k.angka].sort((x, y) => x - y);
  const benarUrut = k.arah === "naik" ? naik : [...naik].reverse();
  const teks = (d: number[]) => d.map(titikM).join(", ");
  const bySatuan = [...k.angka].sort((x, y) => (k.arah === "naik" ? (x % 10) - (y % 10) : (y % 10) - (x % 10)));
  const langkah: LangkahMesin[] = [
    {
      stasiun: "sejajar",
      tanya: `Tulis ${titikM(a)} dan ${titikM(b)} sejajar. Digit puluh ribuan keduanya …`,
      opsi: susunOpsi(pasang(1), duaPengecoh(pasang(1), [pasang(5), pasang(2), `${db[1]} dan ${da[1]}`]), idx),
      benar: pasang(1),
      petunjuk: "Tulis kedua bilangan rata kanan agar tempatnya sejajar. Tempat terbesar ada di kiri.",
    },
    {
      stasiun: "penentu",
      tanya: `Pada ${titikM(a)} dan ${titikM(b)}, tempat pertama dari kiri yang digitnya berbeda …`,
      opsi: susunOpsi(TEMPAT_M[p], duaPengecoh(TEMPAT_M[p], ["satuan", TEMPAT_M[p + 1] ?? "puluhan", TEMPAT_M[p - 1]]), idx + 1),
      benar: TEMPAT_M[p],
      petunjuk: "Mulai dari puluh ribuan. Bila digitnya sama, geser satu tempat ke kanan sampai ketemu yang berbeda.",
    },
    {
      stasiun: "tanda",
      tanya: `${titikM(a)} … ${titikM(b)}`,
      opsi: susunOpsi(`${titikM(a)} ${tanda} ${titikM(b)}`, duaPengecoh(`${titikM(a)} ${tanda} ${titikM(b)}`, ["<", ">", "="].map((t) => `${titikM(a)} ${t} ${titikM(b)}`)), idx + 2),
      benar: `${titikM(a)} ${tanda} ${titikM(b)}`,
      petunjuk: `Lihat digit penentunya di ${TEMPAT_M[p]}: ${da[p]} dan ${db[p]}. Digit penentu yang lebih kecil milik bilangan yang lebih kecil.`,
    },
    {
      stasiun: "urut",
      tanya: `Urutkan ${k.arah}: ${teks(k.angka)}.`,
      opsi: susunOpsi(teks(benarUrut), duaPengecoh(teks(benarUrut), [teks([...benarUrut].reverse()), teks(bySatuan), teks(k.angka), teks([benarUrut[1], benarUrut[0], benarUrut[2]])]), idx + 3),
      benar: teks(benarUrut),
      petunjuk: k.arah === "naik" ? "Urut naik dimulai dari yang terkecil. Bandingkan tiap pasangan dari kiri." : "Urut turun dimulai dari yang terbesar. Bandingkan tiap pasangan dari kiri.",
    },
  ];
  return {
    id: k.id,
    nama: `Bilangan ${titikM(a)} dan ${titikM(b)}`,
    ringkas: `${titikM(a)} ${tanda} ${titikM(b)}, penentunya di ${TEMPAT_M[p]}. Urut ${k.arah}: ${teks(benarUrut)}.`,
    langkah,
  };
}

export const MESIN_BANDING: DefMesin = {
  id: "mesin-banding-k5b1",
  judul: "Mesin Banding",
  selesaiId: "mesin-banding",
  stasiun: STASIUN_BANDING,
  kasus: KASUS_BANDING.map(kasusMesinBanding),
};

/* ------------------------------ C: Mesin Uraian ------------------------------ */

export type KasusUraian = { id: string; n: number; tukar: number };
export const KASUS_URAIAN: KasusUraian[] = [
  { id: "38600", n: 38600, tukar: 1 },
  { id: "63500", n: 63500, tukar: 1 },
  { id: "45600", n: 45600, tukar: 2 },
];

export const STASIUN_URAIAN: StasiunDef[] = [
  { id: "urai", nama: "Urai", ikon: "🔍" },
  { id: "susun", nama: "Susun", ikon: "🧱" },
  { id: "tukar", nama: "Tukar", ikon: "🔄" },
  { id: "cek", nama: "Cek", ikon: "✅" },
];

export function kasusMesinUraian(k: KasusUraian, idx: number): KasusMesin {
  const d = enam(k.n);
  const pr = d[1];
  const rb = d[2];
  const r = d[3];
  const bentuk = [pr * 10000, rb * 1000, r * 100].filter((v) => v > 0).map(titikM).join(" + ");
  const geser = [pr * 1000, rb * 100, r * 10].filter((v) => v > 0).map(titikM).join(" + ");
  const digitSaja = [pr, rb, r].join(" + ");
  const ribuanBaru = rb + 10 * k.tukar;
  const lebih = k.tukar * 10000;
  const tetap = `tetap ${titikM(k.n)}`;
  const langkah: LangkahMesin[] = [
    {
      stasiun: "urai",
      tanya: `Bentuk panjang ${titikM(k.n)} adalah …`,
      opsi: susunOpsi(bentuk, duaPengecoh(bentuk, [geser, digitSaja]), idx),
      benar: bentuk,
      petunjuk: "Tulis satu suku untuk tiap digit: digit dikali nilai tempatnya. Jangan hanya menulis digitnya.",
    },
    {
      stasiun: "susun",
      tanya: `${pr} kartu 10.000 dan ${r} kartu 100 dipakai untuk ${titikM(k.n)}. Kartu 1.000 yang diperlukan …`,
      opsi: susunOpsi(String(rb), angkaPengecoh(rb, [rb * 10, pr]), idx + 1),
      benar: String(rb),
      petunjuk: "Ambil digit di tempat ribuan. Banyak kartu 1.000 sama dengan digit ribuan.",
    },
    {
      stasiun: "tukar",
      tanya: `${titikM(k.n)} disusun dari ${pr} kartu 10.000, ${rb} kartu 1.000, dan ${r} kartu 100. Bila ${k.tukar} kartu 10.000 ditukar kartu 1.000, kartu 1.000 menjadi …`,
      opsi: susunOpsi(String(ribuanBaru), angkaPengecoh(ribuanBaru, [rb + k.tukar, 10 * k.tukar]), idx + 2),
      benar: String(ribuanBaru),
      petunjuk: "Satu kartu 10.000 ditukar sepuluh kartu 1.000. Tambahkan ke kartu 1.000 yang sudah ada.",
    },
    {
      stasiun: "cek",
      tanya: `Setelah ${k.tukar} kartu 10.000 ditukar, total uang …`,
      opsi: susunOpsi(tetap, duaPengecoh(tetap, [`menjadi ${titikM(k.n + lebih)}`, `menjadi ${titikM(k.n - lebih)}`]), idx + 3),
      benar: tetap,
      petunjuk: "Menukar kartu hanya mengganti bentuknya. Nilai uangnya sama.",
    },
  ];
  return {
    id: k.id,
    nama: `Uang ${titikM(k.n)}`,
    ringkas: `${titikM(k.n)} sama dengan ${bentuk}. Setelah ${k.tukar} kartu 10.000 ditukar, kartu 1.000 menjadi ${ribuanBaru}. Total tetap ${titikM(k.n)}.`,
    langkah,
  };
}

export const MESIN_URAIAN: DefMesin = {
  id: "mesin-uraian-k5b1",
  judul: "Mesin Uraian",
  selesaiId: "mesin-uraian",
  stasiun: STASIUN_URAIAN,
  kasus: KASUS_URAIAN.map(kasusMesinUraian),
};

/* ------------------------------ D: Mesin Operasi ------------------------------ */

export type OpMesin = "+" | "−" | "÷";
export type KasusOperasi = { id: string; a: number; b: number; op: OpMesin };
export const KASUS_OPERASI: KasusOperasi[] = [
  { id: "tambah", a: 57500, b: 22000, op: "+" },
  { id: "kurang", a: 47900, b: 45750, op: "−" },
  { id: "bagi", a: 64000, b: 4, op: "÷" },
];

export const STASIUN_OPERASI: StasiunDef[] = [
  { id: "perkiraan", nama: "Perkiraan", ikon: "🎯" },
  { id: "kolom", nama: "Kolom", ikon: "📐" },
  { id: "hasil", nama: "Hasil", ikon: "🧮" },
  { id: "cek", nama: "Cek", ikon: "🔁" },
];

const bulat1000 = (n: number): number => Math.floor((n + 500) / 1000) * 1000;
const bulat10000 = (n: number): number => Math.floor((n + 5000) / 10000) * 10000;
const lantai1000 = (n: number): number => Math.floor(n / 1000) * 1000;
/** Banyak kolom yang menyimpan (+) atau meminjam (−), dihitung per kolom dari satuan. */
function banyakKolom(a: number, b: number, op: "+" | "−"): number {
  let n = 0;
  let sisa = 0;
  for (let c = 0; c < 5; c += 1) {
    const da = Math.floor(a / 10 ** c) % 10;
    const db = Math.floor(b / 10 ** c) % 10;
    if (op === "+") {
      const t = da + db + sisa;
      sisa = t >= 10 ? 1 : 0;
    } else {
      const t = da - sisa;
      sisa = t < db ? 1 : 0;
    }
    n += sisa;
  }
  return n;
}
/** Hasil pengurangan tanpa meminjam: tiap kolom dikurangi terbalik (besar dikurangi kecil). */
function tanpaPinjam(a: number, b: number): number {
  let h = 0;
  for (let c = 4; c >= 0; c -= 1) h = h * 10 + Math.abs((Math.floor(a / 10 ** c) % 10) - (Math.floor(b / 10 ** c) % 10));
  return h;
}

export function kasusMesinOperasi(k: KasusOperasi, idx: number): KasusMesin {
  let langkah: LangkahMesin[];
  let ringkas: string;
  if (k.op === "÷") {
    const q = k.a / k.b;
    const dekat = bulat10000(k.a);
    const kasar = dekat / k.b;
    const ribuan = k.a / 1000;
    const qr = ribuan / k.b;
    langkah = [
      {
        stasiun: "perkiraan",
        tanya: `${titikM(k.a)} ÷ ${k.b}: ${titikM(k.a)} dekat dengan ${titikM(dekat)}. ${titikM(dekat)} ÷ ${k.b} kira-kira …`,
        opsi: susunOpsi(titikM(kasar), duaPengecoh(titikM(kasar), [titikM(kasar / 10), titikM(kasar * 10)]), idx),
        benar: titikM(kasar),
        petunjuk: "Bagi bilangan bulatnya dulu. Hasil kasar harus dekat dengan hasil teliti.",
      },
      {
        stasiun: "kolom",
        tanya: `${ribuan} ribuan dibagi ${k.b}. ${ribuan} ÷ ${k.b} = …`,
        opsi: susunOpsi(String(qr), angkaPengecoh(qr, [qr * 10, qr - 1]), idx + 1),
        benar: String(qr),
        petunjuk: `Bagi dulu ${ribuan} dengan ${k.b}. Hasilnya menjadi jumlah ribuan.`,
      },
      {
        stasiun: "hasil",
        tanya: `${titikM(k.a)} ÷ ${k.b} = …`,
        opsi: susunOpsi(titikM(q), duaPengecoh(titikM(q), [titikM(q / 10), titikM(q * 10)]), idx + 2),
        benar: titikM(q),
        petunjuk: "Bagi rata. Tulis hasilnya dengan nilai tempat yang benar.",
      },
      {
        stasiun: "cek",
        tanya: `Cek: ${k.b} × ${titikM(q)} = …`,
        opsi: susunOpsi(titikM(k.a), duaPengecoh(titikM(k.a), [titikM(k.b + q), titikM(k.a * 10)]), idx + 3),
        benar: titikM(k.a),
        petunjuk: "Hasil bagi dikali pembagi harus kembali ke bilangan semula.",
      },
    ];
    ringkas = `${titikM(k.a)} ÷ ${k.b} = ${titikM(q)}. Perkiraan ${titikM(kasar)}, dekat dengan hasilnya. Cek: ${k.b} × ${titikM(q)} = ${titikM(k.a)}.`;
  } else {
    const op = k.op;
    const ra = bulat1000(k.a);
    const rb = bulat1000(k.b);
    const kasar = op === "+" ? ra + rb : ra - rb;
    const r = op === "+" ? k.a + k.b : k.a - k.b;
    const n = banyakKolom(k.a, k.b, op);
    const salahKasar = op === "+" ? [lantai1000(k.a) + lantai1000(k.b), kasar + 1000] : [ra + rb, kasar + 1000];
    const salahHasil = op === "+" ? [r + 1000, r - 1000] : [tanpaPinjam(k.a, k.b), k.a + k.b];
    const salahCek = op === "+" ? [r + k.b, k.a - 1000] : [k.b - r, k.a + 1000];
    const simpanKata = op === "+" ? "menyimpan" : "meminjam";
    langkah = [
      {
        stasiun: "perkiraan",
        tanya: `Perkiraan ${titikM(k.a)} ${op} ${titikM(k.b)}, dibulatkan ke ribuan terdekat, kira-kira …`,
        opsi: susunOpsi(titikM(kasar), duaPengecoh(titikM(kasar), salahKasar.map(titikM)), idx),
        benar: titikM(kasar),
        petunjuk: "Bulatkan tiap bilangan ke ribuan terdekat dulu, lalu hitung bilangan yang sudah bulat.",
      },
      {
        stasiun: "kolom",
        tanya: `Pada ${titikM(k.a)} ${op} ${titikM(k.b)} bersusun, berapa kali perlu ${simpanKata}?`,
        opsi: susunOpsi(String(n), angkaPengecoh(n, [n + 1, n === 0 ? 2 : n - 1, n + 2]), idx + 1),
        benar: String(n),
        petunjuk: `Kerjakan dari kolom satuan ke kiri. Hitung kolom yang ${op === "+" ? "jumlahnya 10 atau lebih" : "digit atasnya lebih kecil dari digit bawahnya"}.`,
      },
      {
        stasiun: "hasil",
        tanya: `${titikM(k.a)} ${op} ${titikM(k.b)} = …`,
        opsi: susunOpsi(titikM(r), duaPengecoh(titikM(r), salahHasil.map(titikM)), idx + 2),
        benar: titikM(r),
        petunjuk: op === "+" ? "Jumlahkan per kolom dan jangan lupa simpanan." : "Kurangkan per kolom dan jangan lupa pinjaman.",
      },
      {
        stasiun: "cek",
        tanya: `Cek: ${titikM(r)} ${op === "+" ? "−" : "+"} ${titikM(k.b)} = …`,
        opsi: susunOpsi(titikM(k.a), duaPengecoh(titikM(k.a), salahCek.map(titikM)), idx + 3),
        benar: titikM(k.a),
        petunjuk: "Operasi kebalikannya harus kembali ke bilangan semula.",
      },
    ];
    ringkas = `${titikM(k.a)} ${op} ${titikM(k.b)} = ${titikM(r)}. Perkiraan ${titikM(kasar)}, dekat dengan hasilnya. Perlu ${simpanKata} ${n} kali. Cek: ${titikM(r)} ${op === "+" ? "−" : "+"} ${titikM(k.b)} = ${titikM(k.a)}.`;
  }
  return { id: k.id, nama: `${titikM(k.a)} ${k.op} ${titikM(k.b)}`, ringkas, langkah };
}

export const MESIN_OPERASI: DefMesin = {
  id: "mesin-operasi-k5b1",
  judul: "Mesin Operasi",
  selesaiId: "mesin-operasi",
  stasiun: STASIUN_OPERASI,
  kasus: KASUS_OPERASI.map(kasusMesinOperasi),
};

export const SEMUA_MESIN_K5B1 = [MESIN_TEMPAT, MESIN_BANDING, MESIN_URAIAN, MESIN_OPERASI];
