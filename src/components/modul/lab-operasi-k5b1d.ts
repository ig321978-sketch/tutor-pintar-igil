/**
 * Lab Operasi (Kelas 5 Bab 1, Sub-Bab D): logika murni. Satu alat, tiga tampilan.
 *  Perkiraan : bulatkan kedua bilangan ke ribuan terdekat, lalu hitung kasar. Lab menolak pembulatan yang salah
 *              (ke bawah atau ke atas yang keliru, ke puluh ribuan) dan hasil kasar yang salah.
 *  Bersusun  : bilangan ditulis sejajar di kolom nilai tempat. Anak mengisi hasil kolom dari satuan ke kiri. Lab
 *              menghitung simpanan (penjumlahan) dan pinjaman (pengurangan), menolak digit yang salah, dan menjelaskan
 *              simpanan atau pinjaman yang terlupa.
 *  Kali-Bagi : perkalian dipecah menjadi dua bagian lalu dijumlahkan; pembagian dibagi rata lalu dicek dengan perkalian.
 * Data dari Buku Siswa Kelas V Bab 1 (sama dengan data-k5b1.ts dan naskah, dicocokkan di uji). Semua bilangan bulat.
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k5b1.mjs.
 */

export const titik = (n: number): string => (n >= 1000 ? `${Math.floor(n / 1000)}.${String(n % 1000).padStart(3, "0")}` : String(n));
export type Op = "+" | "−";
const NAMA_OP: Record<Op, string> = { "+": "ditambah", "−": "dikurangi" };
const KOLOM = ["satuan", "puluhan", "ratusan", "ribuan", "puluh ribuan"];
export const NAMA_KOLOM = KOLOM;
const digit = (n: number, c: number): number => Math.floor(n / 10 ** c) % 10;
const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);

/* ------------------------------ Perkiraan ------------------------------ */

export type DataPerkiraan = { a: number; b: number; op: Op };
export const DATA_PERKIRAAN: DataPerkiraan[] = [
  { a: 38600, b: 21400, op: "+" },
  { a: 63500, b: 38600, op: "−" },
  { a: 57500, b: 22000, op: "+" },
];
/** Pembulatan ke ribuan terdekat; ratusan 5 atau lebih naik. */
export const bulatRibuan = (n: number): number => Math.floor((n + 500) / 1000) * 1000;
const bulatPuluhRibuan = (n: number): number => Math.floor((n + 5000) / 10000) * 10000;
export const kunciPerkiraan = (p: DataPerkiraan): string => `${p.a}${p.op === "+" ? "+" : "-"}${p.b}`;
export const hasilKasar = (p: DataPerkiraan): number => (p.op === "+" ? bulatRibuan(p.a) + bulatRibuan(p.b) : bulatRibuan(p.a) - bulatRibuan(p.b));
/** Tiga pilihan pembulatan: terdekat, ribuan lain, dan puluh ribuan. */
export function opsiBulat(n: number, ke: number): number[] {
  const dekat = bulatRibuan(n);
  const bawah = Math.floor(n / 1000) * 1000;
  const lain = dekat === bawah ? bawah + 1000 : bawah;
  return putar([dekat, lain, bulatPuluhRibuan(n)], ke);
}
/** Tiga pilihan hasil kasar. */
export function opsiKasar(p: DataPerkiraan, ke: number): number[] {
  const k = hasilKasar(p);
  const salah = p.op === "+" ? [k + 1000, k - 1000] : [bulatRibuan(p.a) + bulatRibuan(p.b), k + 1000];
  return putar([k, ...salah], ke);
}

/* ------------------------------ Bersusun ------------------------------ */

export type DataBersusun = { a: number; b: number; op: Op };
export const DATA_BERSUSUN: DataBersusun[] = [
  { a: 32500, b: 13250, op: "+" },
  { a: 38600, b: 14500, op: "+" },
  { a: 47900, b: 45750, op: "−" },
  { a: 63500, b: 38600, op: "−" },
];
export const hasilBersusun = (d: DataBersusun): number => (d.op === "+" ? d.a + d.b : d.a - d.b);
export const kunciBersusun = (d: DataBersusun): string => `${d.a}${d.op === "+" ? "+" : "-"}${d.b}`;
/** Simpanan (+) atau pinjaman (−) yang masuk ke kolom c dari kolom kanannya. */
export function masukKolom(d: DataBersusun, c: number): number {
  const sisa = 10 ** c;
  return d.op === "+" ? Math.floor(((d.a % sisa) + (d.b % sisa)) / sisa) : d.a % sisa < d.b % sisa ? 1 : 0;
}
/** Digit hasil yang benar di kolom c dan apakah kolom itu menyimpan atau meminjam. */
export function kolomBenar(d: DataBersusun, c: number): { digit: number; keluar: number } {
  const da = digit(d.a, c);
  const db = digit(d.b, c);
  const masuk = masukKolom(d, c);
  if (d.op === "+") {
    const t = da + db + masuk;
    return { digit: t % 10, keluar: t >= 10 ? 1 : 0 };
  }
  const t = da - masuk;
  return t < db ? { digit: t + 10 - db, keluar: 1 } : { digit: t - db, keluar: 0 };
}
/** Banyak kolom yang menyimpan atau meminjam. */
export const banyakSimpanPinjam = (d: DataBersusun): number => [0, 1, 2, 3, 4].filter((c) => kolomBenar(d, c).keluar === 1).length;

/* ------------------------------ Kali-Bagi ------------------------------ */

export type LangkahKB = { tanya: string; benar: number; salah: [number, number]; petunjuk: string };
export type DataKB = { id: string; ket: string; kunci: string; langkah: LangkahKB[] };

function bangunKB(): DataKB[] {
  const kali = (a: number, b: number, petunjuk: string, salah: [number, number]): LangkahKB => ({ tanya: `${a} × ${titik(b)} = …`, benar: a * b, salah, petunjuk });
  return [
    {
      id: "kali",
      ket: "12 × 5.000",
      kunci: "kali:12x5000",
      langkah: [
        kali(10, 5000, "Sepuluh kali berarti menambah satu nol di belakang.", [10 + 5000, 10 * 5000 * 10]),
        kali(2, 5000, "Dua kali lima ribu. Hitung kelipatannya.", [2 * 5000 / 10, 2 * 5000 * 10]),
        { tanya: `${titik(10 * 5000)} + ${titik(2 * 5000)} = …`, benar: 10 * 5000 + 2 * 5000, salah: [(10 * 5000 + 2 * 5000) / 10, (10 * 5000 + 2 * 5000) * 10], petunjuk: "Jumlahkan kedua bagian: sepuluh kali dan dua kali." },
      ],
    },
    {
      id: "campur",
      ket: "2 × 23.500 + 17.000",
      kunci: "campur:2x23500+17000",
      langkah: [
        kali(2, 23500, "Dua kali dua puluh tiga ribu lima ratus.", [2 * 23500 / 10, 2 * 23500 * 10]),
        { tanya: `${titik(2 * 23500)} + ${titik(17000)} = …`, benar: 2 * 23500 + 17000, salah: [(2 * 23500 + 17000) / 10, (2 * 23500 + 17000) * 10], petunjuk: "Tambahkan harga jeruk pada hasil dua kali mangga." },
      ],
    },
    {
      id: "bagi64",
      ket: "64.000 ÷ 4",
      kunci: "bagi:64000d4",
      langkah: [
        { tanya: `${titik(64000)} ÷ 4 = …`, benar: 64000 / 4, salah: [64000 / 4 / 10, 64000 / 4 * 10], petunjuk: "Bagi rata untuk empat anak. Bagi dulu ribuannya." },
        { tanya: `Cek: 4 × ${titik(64000 / 4)} = …`, benar: 64000, salah: [6400, 640000], petunjuk: "Kali dengan pembagi harus kembali ke bilangan semula." },
      ],
    },
    {
      id: "bagi60",
      ket: "60.000 ÷ 12",
      kunci: "bagi:60000d12",
      langkah: [
        { tanya: `${titik(60000)} ÷ 12 = …`, benar: 60000 / 12, salah: [60000 / 12 / 10, 60000 / 12 * 10], petunjuk: "Bagi rata untuk dua belas angpau." },
        { tanya: `Cek: 12 × ${titik(60000 / 12)} = …`, benar: 60000, salah: [6000, 600000], petunjuk: "Kali dengan pembagi harus kembali ke bilangan semula." },
      ],
    },
  ];
}
export const DATA_KB: DataKB[] = bangunKB();
export const opsiKB = (i: number, ke: number): number[] => {
  const l = DATA_KB[i].langkah[ke];
  return putar([l.benar, ...l.salah], (i + ke) % 3);
};

/* ------------------------------ Keadaan ------------------------------ */

export type StateOperasiK5B1D = {
  perk: { data: number; ra: number | null; rb: number | null; kasar: boolean };
  susun: { data: number; isi: number[] };
  kb: { data: number; ke: number };
  pernah: string[];
  pesan: string;
};

export type AksiOperasiK5B1D =
  | { t: "P_DATA"; i: number }
  | { t: "P_BULAT"; w: "a" | "b"; v: number }
  | { t: "P_HASIL"; v: number }
  | { t: "P_ULANG" }
  | { t: "S_DATA"; i: number }
  | { t: "S_ISI"; d: number }
  | { t: "S_BATAL" }
  | { t: "S_ULANG" }
  | { t: "K_DATA"; i: number }
  | { t: "K_JAWAB"; v: number }
  | { t: "K_ULANG" }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

export const awalOperasiK5B1D = (): StateOperasiK5B1D => ({
  perk: { data: 0, ra: null, rb: null, kasar: false },
  susun: { data: 0, isi: [] },
  kb: { data: 0, ke: 0 },
  pernah: [],
  pesan: "",
});

const tambah = (daftar: string[], ...id: string[]): string[] => id.reduce((a, v) => (a.includes(v) ? a : [...a, v]), daftar);
const sah = (i: number, n: number): boolean => Number.isInteger(i) && i >= 0 && i < n;

export const perkAktif = (x: StateOperasiK5B1D): DataPerkiraan => DATA_PERKIRAAN[x.perk.data];
export const susunAktif = (x: StateOperasiK5B1D): DataBersusun => DATA_BERSUSUN[x.susun.data];
export const kbAktif = (x: StateOperasiK5B1D): DataKB => DATA_KB[x.kb.data];
/** Kolom yang sedang diisi (0 = satuan); 5 bila semua kolom sudah terisi. */
export const kolomSekarang = (x: StateOperasiK5B1D): number => x.susun.isi.length;
export const selesaiSusun = (x: StateOperasiK5B1D): boolean => x.susun.isi.length === 5;

function bulat(x: StateOperasiK5B1D, w: "a" | "b", v: number): StateOperasiK5B1D {
  const p = perkAktif(x);
  const n = w === "a" ? p.a : p.b;
  const ke = w === "a" ? 0 : 1;
  if (!opsiBulat(n, ke).includes(v)) return x;
  const dekat = bulatRibuan(n);
  if (v !== dekat) {
    const r = digit(n, 2);
    const arah = r >= 5 ? "atas" : "bawah";
    const itu = v === bulatPuluhRibuan(n) ? "Itu dibulatkan ke puluh ribuan. Bulatkan ke ribuan terdekat." : "Bulatkan ke ribuan terdekat.";
    return { ...x, pesan: `${itu} Lihat digit ratusan pada ${titik(n)}: ${r}. Bila 5 atau lebih, dibulatkan ke atas; bila kurang dari 5, ke bawah. Di sini dibulatkan ke ${arah}.` };
  }
  const perk = w === "a" ? { ...x.perk, ra: v } : { ...x.perk, rb: v };
  return { ...x, perk, pesan: `✅ ${titik(n)} dibulatkan ke ribuan terdekat menjadi ${titik(v)}.` };
}

function hasil(x: StateOperasiK5B1D, v: number): StateOperasiK5B1D {
  const p = perkAktif(x);
  if (x.perk.ra === null || x.perk.rb === null) return { ...x, pesan: "Bulatkan dulu kedua bilangan ke ribuan terdekat." };
  if (!opsiKasar(p, 0).includes(v)) return x;
  const ra = x.perk.ra;
  const rb = x.perk.rb;
  const k = hasilKasar(p);
  if (v !== k) return { ...x, pesan: `Hitung lagi dari bilangan yang sudah dibulatkan: ${titik(ra)} ${p.op} ${titik(rb)}.` };
  return {
    ...x,
    perk: { ...x.perk, kasar: true },
    pernah: tambah(x.pernah, `perkiraan:${kunciPerkiraan(p)}`),
    pesan: `✅ ${titik(ra)} ${p.op} ${titik(rb)} = ${titik(k)}. Perkiraannya sekitar ${titik(k)}.`,
  };
}

function isiKolom(x: StateOperasiK5B1D, d: number): StateOperasiK5B1D {
  if (!Number.isInteger(d) || d < 0 || d > 9) return x;
  const b = susunAktif(x);
  const c = kolomSekarang(x);
  if (c >= 5) return { ...x, pesan: "Semua kolom sudah terisi. Tekan Ulangi untuk mencoba lagi." };
  const benar = kolomBenar(b, c);
  const da = digit(b.a, c);
  const db = digit(b.b, c);
  const masuk = masukKolom(b, c);
  const nama = NAMA_KOLOM[c];
  if (d !== benar.digit) {
    if (b.op === "+" && masuk === 1 && d === (da + db) % 10)
      return { ...x, pernah: tambah(x.pernah, "lupa-simpan"), pesan: `Jangan lupa simpanan 1 dari kolom ${NAMA_KOLOM[c - 1]}. Tambahkan ${da} + ${db} dengan simpanan 1.` };
    if (b.op === "−") {
      const lupa = d === Math.abs(da - db) || (masuk === 1 && d === (da - db + 10) % 10);
      if (lupa) {
        const pesan = masuk === 1
          ? `Kolom ${nama} sudah dipinjam 1 oleh kolom kanannya. Kurangi dulu digit atas ${da} dengan 1, baru dikurangi digit bawah ${db}.`
          : `Digit atas ${da} lebih kecil dari ${db}. Pinjam 1 dari kolom kirinya, jadi atasnya ditambah 10. Jangan dikurangi terbalik.`;
        return { ...x, pernah: tambah(x.pernah, "lupa-pinjam"), pesan };
      }
    }
    const lengkap = b.op === "+" ? (masuk === 1 ? ` dan simpanan ${masuk}` : "") : masuk === 1 ? " dengan pinjaman 1" : "";
    return { ...x, pesan: `Belum tepat. Hitung lagi kolom ${nama}: ${da} ${b.op} ${db}${lengkap}.` };
  }
  const isi = [...x.susun.isi, d];
  const y = { ...x, susun: { ...x.susun, isi } };
  if (isi.length < 5) {
    let info = "";
    if (b.op === "+") info = benar.keluar === 1 ? `${da} + ${db}${masuk ? " + 1" : ""} = ${da + db + masuk}. Tulis ${d}, simpan 1 ke kolom ${NAMA_KOLOM[c + 1]}.` : `${da} + ${db}${masuk ? " + 1" : ""} = ${d}.`;
    else info = benar.keluar === 1 ? `Atas lebih kecil dari ${db}. Pinjam 1 dari kolom ${NAMA_KOLOM[c + 1]}, jadi atasnya ${da + 10 - masuk}: ${da + 10 - masuk} − ${db} = ${d}.` : `${da - masuk} − ${db} = ${d}.`;
    return { ...y, pesan: `✅ Kolom ${nama}: ${info}` };
  }
  const r = hasilBersusun(b);
  const kasar = `perkiraan:${kunciBersusun(b)}`;
  const ketemu = DATA_PERKIRAAN.find((p) => kunciPerkiraan(p) === kunciBersusun(b));
  const dekat = ketemu && x.pernah.includes(kasar) ? ` Perkiraannya ${titik(hasilKasar(ketemu))}, jadi hasil ${titik(r)} masuk akal.` : "";
  return { ...y, pernah: tambah(x.pernah, `bersusun:${kunciBersusun(b)}`), pesan: `✅ Tepat! ${titik(b.a)} ${b.op} ${titik(b.b)} = ${titik(r)}.${dekat}` };
}

function jawabKB(x: StateOperasiK5B1D, v: number): StateOperasiK5B1D {
  const d = kbAktif(x);
  if (x.kb.ke >= d.langkah.length) return { ...x, pesan: "Soal ini sudah selesai. Pilih soal lain atau ulangi." };
  const l = d.langkah[x.kb.ke];
  if (!opsiKB(x.kb.data, x.kb.ke).includes(v)) return x;
  if (v !== l.benar) return { ...x, pesan: l.petunjuk };
  const ke = x.kb.ke + 1;
  const selesai = ke === d.langkah.length;
  return {
    ...x,
    kb: { ...x.kb, ke },
    pernah: selesai ? tambah(x.pernah, d.kunci) : x.pernah,
    pesan: `✅ ${l.tanya.replace("…", titik(l.benar))}${selesai ? ` Selesai: ${d.ket} benar.` : ""}`,
  };
}

export function langkahOperasiK5B1D(x: StateOperasiK5B1D, a: AksiOperasiK5B1D): StateOperasiK5B1D {
  switch (a.t) {
    case "P_DATA":
      return sah(a.i, DATA_PERKIRAAN.length) ? { ...x, perk: { data: a.i, ra: null, rb: null, kasar: false }, pesan: "" } : x;
    case "P_BULAT":
      return bulat(x, a.w, a.v);
    case "P_HASIL":
      return hasil(x, a.v);
    case "P_ULANG":
      return { ...x, perk: { ...x.perk, ra: null, rb: null, kasar: false }, pesan: "" };
    case "S_DATA":
      return sah(a.i, DATA_BERSUSUN.length) ? { ...x, susun: { data: a.i, isi: [] }, pesan: "" } : x;
    case "S_ISI":
      return isiKolom(x, a.d);
    case "S_BATAL":
      return { ...x, susun: { ...x.susun, isi: x.susun.isi.slice(0, -1) }, pesan: "" };
    case "S_ULANG":
      return { ...x, susun: { ...x.susun, isi: [] }, pesan: "" };
    case "K_DATA":
      return sah(a.i, DATA_KB.length) ? { ...x, kb: { data: a.i, ke: 0 }, pesan: "" } : x;
    case "K_JAWAB":
      return jawabKB(x, a.v);
    case "K_ULANG":
      return { ...x, kb: { ...x.kb, ke: 0 }, pesan: "" };
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalOperasiK5B1D();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanOperasiK5B1D = { alat: "operasi"; pernah: string[] };
export const keadaanOperasiK5B1D = (x: StateOperasiK5B1D): KeadaanOperasiK5B1D => ({ alat: "operasi", pernah: x.pernah });

export const ucapPerkiraanK5B1D = (x: StateOperasiK5B1D): string => {
  const p = perkAktif(x);
  return `Perkiraan dulu untuk ${titik(p.a)} ${p.op} ${titik(p.b)}. Bulatkan kedua bilangan ke ribuan terdekat, lalu hitung kasar.`;
};
export const ucapBersusunK5B1D = (x: StateOperasiK5B1D): string => {
  const b = susunAktif(x);
  const c = kolomSekarang(x);
  const sekarang = c >= 5 ? "Semua kolom sudah terisi." : `Sekarang kolom ${NAMA_KOLOM[c]}.`;
  return `${titik(b.a)} ${NAMA_OP[b.op]} ${titik(b.b)}. Tulis sejajar, lalu isi hasil tiap kolom mulai dari satuan. ${sekarang}`;
};
export const ucapKaliBagiK5B1D = (x: StateOperasiK5B1D): string => {
  const d = kbAktif(x);
  return `Soal ${d.ket}. Jawab satu langkah demi satu langkah. Sekarang langkah ${Math.min(x.kb.ke + 1, d.langkah.length)} dari ${d.langkah.length}.`;
};
