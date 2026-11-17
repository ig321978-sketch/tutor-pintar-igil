/**
 * Logika murni Kelas 1 Bab 6 Sub-Bab B "Loket Karcis" (penjumlahan dengan hasil sampai dua puluh), cerita Pasar Malam Kampung, untuk tahap
 * Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-karcis-k1b6b.mjs.
 * Empat metode tiap kelompok soal: Metode IGIL (hitung maju dari bilangan sesudahnya, belasan ditambah satuan), Doubles Plus One (kembar tambah satu),
 * Part-Whole Model (bagan bagian dan keseluruhan), dan Number Line Jumps (lompat di garis bilangan). Kata bilangan memakai ulang Sub-Bab A Bab 5.
 */
import type { Cara } from "../lemari-k1b1a/logika";
import { kata } from "../ikan-k1b5a/logika";

export { acak, cocok, cocokKelompok, kelompokLabel, labelDari, IKON_CARA, NAMA_CARA, URUT_CARA, type Cara, type Label, type Tempat } from "../lemari-k1b1a/logika";
export { kata };

export type Metode = "igil" | "kembar" | "bagan" | "lompat";
export const URUT_METODE: Metode[] = ["igil", "kembar", "bagan", "lompat"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: hitung maju dan belasan",
  kembar: "Doubles Plus One: kembar tambah satu",
  bagan: "Part-Whole Model: bagan bagian dan keseluruhan",
  lompat: "Number Line Jumps: lompat di garis bilangan",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F3AB}", kembar: "\u{1F46F}", bagan: "\u{1F9E9}", lompat: "\u{1F438}" };

export type Rupa = "benda" | "diagram" | "lambang";

/* ------------------------------ Langkah soal ------------------------------ */
/** Hitung maju: mulai dari bilangan sesudah `a`, maju sebanyak `b`. */
export type LangkahMaju = { tipe: "maju"; a: number; b: number; jenis: string };
/** Belasan ditambah satuan: `a` belasan, satuannya ditambah `b` tanpa melewati sepuluh, puluhan tetap. */
export type LangkahBelasan = { tipe: "belasan"; a: number; b: number; jenis: string };
/** Kembar tambah satu: `a` dan `b` selisih satu. Dengan `kartu`: pilih dua kartu yang selisih satu (tanpa angka jawaban). */
export type LangkahKembar = { tipe: "kembar"; a: number; b: number; jenis: string; kartu?: number[] };
/** Bagan: pisahkan `b` supaya `a` menjadi sepuluh (a sembilan atau kurang, b melewati sepuluh). */
export type LangkahBagan = { tipe: "bagan"; a: number; b: number; jenis: string };
/** Lompat: dari `a` lompat menuju sepuluh dulu, lalu lompat sisanya. */
export type LangkahLompat = { tipe: "lompat"; a: number; b: number; jenis: string };
export type LangkahDasar = LangkahMaju | LangkahBelasan | LangkahKembar | LangkahBagan | LangkahLompat;
/** Cari kesalahan: tokoh sudah menjawab (salah); anak menilai, memilih alasan, lalu menjawab yang benar. */
export type LangkahSalah = { tipe: "salah"; dasar: LangkahDasar; tokoh: string; jawabTokoh: number; kataTokoh: string; alasan: [string, string, string]; benar: number; keliru: string };
export type Langkah = LangkahDasar | LangkahSalah;
export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);
/** Metode tiap langkah (Cari kesalahan memakai metode soal dasarnya). */
export const metodeLangkah = (l: Langkah): Metode => {
  const d = dasarDari(l);
  return d.tipe === "maju" || d.tipe === "belasan" ? "igil" : d.tipe;
};

export const puluhan = (n: number): number => Math.floor(n / 10);
export const satuan = (n: number): number => n % 10;
const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
/** Bilangan kembar pada dua bilangan yang selisih satu: yang lebih kecil. */
export const kembarDari = (l: { a: number; b: number }): number => Math.min(l.a, l.b);
/** Yang menggenapkan `a` menjadi sepuluh (bagan dan lompat) dan sisanya. */
export const kePuluh = (l: { a: number }): number => 10 - l.a;
export const sisaPuluh = (l: { a: number; b: number }): number => l.b - (10 - l.a);

/** Dua kartu yang selisih satu: nomor kartunya (kecil dulu), atau null bila tidak tunggal. */
export function pasanganKembar(kartu: readonly number[]): [number, number] | null {
  const hasil: [number, number][] = [];
  kartu.forEach((v, i) => kartu.forEach((w, j) => (j > i && Math.abs(v - w) === 1 ? hasil.push([i, j]) : undefined)));
  return hasil.length === 1 ? hasil[0] : null;
}

/** Kunci tiap langkah, dihitung dari datanya. Null untuk memilih dua kartu kembar (tanpa angka jawaban). */
export function kunciLangkah(l: Langkah): number | null {
  if (l.tipe === "salah") return kunciLangkah(l.dasar);
  if (l.tipe === "kembar" && l.kartu) return null;
  return l.a + l.b;
}
export const angkaJawab = kunciLangkah;

/** Tiga pilihan jawaban di sekitar kunci (nol sampai dua puluh), memuat jawaban tokoh bila Cari kesalahan. */
export function pilihanDari(l: Langkah): number[] {
  const k = kunciLangkah(l) ?? 0;
  const d = dasarDari(l);
  const calon: number[] = l.tipe === "salah" ? [l.jawabTokoh] : [];
  calon.push(k - 1, k + 1, d.a, k + 2, d.b);
  const ada: number[] = [k];
  for (const c of calon) if (ada.length < 3 && c >= 0 && c <= 20 && !ada.includes(c)) ada.push(c);
  for (let n = 0; ada.length < 3 && n <= 20; n += 1) if (!ada.includes(n)) ada.push(n);
  return ada.sort((p, q) => p - q);
}

/** Tiga pilihan di sekitar `n` (n harus ada), semuanya paling kecil `min`. */
const sekitar = (n: number, min = 0): number[] => (n - 1 >= min ? [n - 1, n, n + 1] : [n, n + 1, n + 2]);
/** Hitung maju: mulai dari bilangan berapa (yang benar: sesudah `a`). */
export const opsiMulai = (l: { a: number }): number[] => [l.a, l.a + 1, l.a + 2];
/** Belasan: jumlah satuannya. */
export const opsiSatuan = (l: { a: number; b: number }): number[] => sekitar(satuan(l.a) + l.b, 1);
/** Kembar: hasil kembarnya (dua kali bilangan yang lebih kecil). */
export const opsiKembar = (l: { a: number; b: number }): number[] => sekitar(2 * kembarDari(l), 1);
/** Bagan dan lompat: yang menggenapkan sepuluh. */
export const opsiPisah = (l: { a: number }): number[] => sekitar(kePuluh(l), 1);
/** Bagan dan lompat: sisanya setelah sepuluh. */
export const opsiSisa = (l: { a: number; b: number }): number[] => sekitar(sisaPuluh(l), 1);
/** Tiga kartu langkah bagan menurut urutan yang benar. */
export const kartuBagan = (l: { a: number; b: number }): string[] => [`${l.a} + ${kePuluh(l)} = 10`, `sisanya ${sisaPuluh(l)}`, `10 + ${sisaPuluh(l)} = ?`];

/** Kalimat penjumlahan dua bilangan dengan caranya (tanpa digit). */
export function kalimatJumlah(l: LangkahDasar): string {
  const k = l.a + l.b;
  switch (l.tipe) {
    case "maju":
      return `Mulai dari ${kata(l.a + 1)}, maju ${kata(l.b)} langkah sampai ${kata(k)}.`;
    case "belasan":
      return `Satuannya ${kata(satuan(l.a))} ditambah ${kata(l.b)} sama dengan ${kata(satuan(l.a) + l.b)}. Puluhannya tetap, jadi ${kata(k)}.`;
    case "kembar":
      return l.kartu ? `${besar(kata(l.a))} dan ${kata(l.b)} selisih satu, jadi cocok untuk kembar tambah satu.` : `Kembar ${kata(kembarDari(l))} ditambah ${kata(kembarDari(l))} sama dengan ${kata(2 * kembarDari(l))}, tambah satu jadi ${kata(k)}.`;
    case "bagan":
      return `${besar(kata(l.a))} ditambah ${kata(kePuluh(l))} sama dengan sepuluh, sisanya ${kata(sisaPuluh(l))}, jadi ${kata(k)}.`;
    case "lompat":
      return `Dari ${kata(l.a)} lompat ${kata(kePuluh(l))} menuju sepuluh, lalu lompat ${kata(sisaPuluh(l))} lagi, mendarat di ${kata(k)}.`;
  }
}

/* ------------------------------ Instruksi (templat, tanpa digit) ------------------------------ */
const AKHIR: Record<Cara, string> = { klik: "Lalu pilih jawabannya.", kanvas: "Lalu tulis angkanya di kanvas.", suara: "Lalu ucapkan jawabannya." };
const BENDA: Record<Rupa, string> = { benda: "karcis", diagram: "titik", lambang: "bilangan" };

export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  const akhir = AKHIR[cara];
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu pilih jawaban yang benar.`;
  switch (l.tipe) {
    case "maju":
      return rupa === "lambang" ? `Hitung maju: pilih bilangan awal hitungan, lalu tekan Maju satu. ${akhir}` : `Hitung maju: pilih bilangan awal hitungan, lalu ketuk ${BENDA[rupa]} yang ditambahkan satu per satu. ${akhir}`;
    case "belasan":
      return `Jumlahkan satuannya dulu, puluhannya tetap. Pilih jawaban tiap langkah. ${akhir}`;
    case "kembar":
      if (l.kartu) return cara === "kanvas" ? "Lingkari dua kartu yang bisa dihitung dengan kembar tambah satu." : "Ketuk dua kartu yang bisa dihitung dengan kembar tambah satu.";
      return `Cari bilangan kembarnya, lalu tambahkan satu. ${akhir}`;
    case "bagan":
      return `Pisahkan satu bilangan supaya jadi sepuluh, lalu susun langkahnya berurutan. ${akhir}`;
    case "lompat":
      return rupa === "benda" ? `Bantu katak melompat menuju sepuluh dulu, lalu lompat lagi. ${akhir}` : `Lompat menuju sepuluh dulu, lalu lompat lagi. ${akhir}`;
  }
}

/* ------------------------------ Petunjuk saat jawaban bilangan salah (menunjuk kesalahannya, tanpa digit) ------------------------------ */
export function petunjukSalah(l: Langkah, m: number): string {
  if (l.tipe === "salah") {
    if (m === l.jawabTokoh) return `Itu jawaban ${l.tokoh} yang keliru. ${l.keliru}`;
    return petunjukSalah(l.dasar, m);
  }
  const k = l.a + l.b;
  switch (l.tipe) {
    case "maju":
      if (m === k - 1) return "Bilangan awal ikut disebut, jadi kurang satu. Hitung maju dimulai dari bilangan sesudahnya.";
      return m < k ? "Maju belum cukup. Hitung maju lagi sampai semua yang ditambahkan terhitung." : "Maju terlalu jauh. Berhenti setelah semua yang ditambahkan terhitung.";
    case "belasan":
      if (m === satuan(l.a) + l.b) return "Itu baru jumlah satuannya. Gabungkan dengan puluhannya yang tetap.";
      return m < k ? "Puluhannya ikut dihitung. Jumlahkan satuannya, lalu gabungkan dengan puluhannya." : "Puluhannya tetap, tidak ikut bertambah. Jumlahkan satuannya saja.";
    case "kembar":
      if (m === 2 * kembarDari(l)) return "Itu hasil kembarnya saja. Tambahkan satu lagi.";
      return m < k ? "Hitung kembar dari bilangan yang lebih kecil, lalu tambahkan satu." : "Terlalu banyak. Kembar dulu, lalu tambah satu saja.";
    case "bagan":
      if (m === 10) return "Itu baru sepuluhnya. Tambahkan sisanya.";
      return m < k ? "Sisanya belum ditambahkan semua. Tambahkan sisanya pada sepuluh." : "Terlalu banyak. Sepuluh ditambah sisanya saja.";
    case "lompat":
      if (m === 10) return "Itu baru lompatan pertama. Lompat lagi sebanyak sisanya.";
      return m < k ? "Lompatan kedua belum cukup jauh. Lompat sebanyak sisanya dari sepuluh." : "Lompatan terlalu jauh. Lompat sebanyak sisanya saja dari sepuluh.";
  }
}

/* ------------------------------ Simulasi Loket Karcis ------------------------------ */
export type CaraHitung = "maju" | "genap" | "belasan";
export const URUT_CARA_HITUNG: CaraHitung[] = ["maju", "genap", "belasan"];
export const NAMA_CARA_HITUNG: Record<CaraHitung, string> = { maju: "Hitung maju", genap: "Genapkan sepuluh", belasan: "Belasan tambah satuan" };
export type RombonganSim = { id: string; nama: string; ikon: string; a: number; b: number };
export type KeadaanKarcis = {
  alat: "karcis";
  /** Rombongan yang sedang dihitung (yang terakhir: rombongan buatan sendiri). */
  pilih: number;
  cara: CaraHitung;
  /** Langkah yang sudah dijalankan pada hitungan sekarang. */
  langkah: number;
  /** Cara yang sudah selesai dicatat di papan tiap rombongan. */
  catat: CaraHitung[][];
  /** Dua bilangan rombongan buatan sendiri. */
  sendiri: { a: number; b: number };
};

export const awalKarcis = (r: readonly RombonganSim[]): KeadaanKarcis => ({ alat: "karcis", pilih: 0, cara: "maju", langkah: 0, catat: r.map(() => []), sendiri: { a: 7, b: 5 } });

/** Dua bilangan rombongan terpilih. */
export const bilanganRombongan = (k: KeadaanKarcis, r: readonly RombonganSim[]): { a: number; b: number } => (k.pilih === r.length - 1 ? k.sendiri : { a: r[k.pilih].a, b: r[k.pilih].b });
/** Cara yang bisa dipakai: genapkan sepuluh bila bilangan pertama hampir sepuluh dan jumlahnya melewati sepuluh; belasan bila tidak melewati sepuluh. */
export const bisaCara = (cara: CaraHitung, a: number, b: number): boolean =>
  cara === "maju" ? a + b <= 20 : cara === "genap" ? a >= 7 && a <= 9 && a + b > 10 : a >= 11 && satuan(a) + b <= 9;
export const totalLangkah = (cara: CaraHitung, b: number): number => (cara === "maju" ? b : 2);

export const pilihRombongan = (k: KeadaanKarcis, i: number): KeadaanKarcis => ({ ...k, pilih: i, langkah: 0 });
export const gantiCara = (k: KeadaanKarcis, cara: CaraHitung): KeadaanKarcis => ({ ...k, cara, langkah: 0 });
export const ulangHitung = (k: KeadaanKarcis): KeadaanKarcis => ({ ...k, langkah: 0 });
/** Ubah satu bilangan rombongan buatan sendiri (a satu sampai sembilan belas, b satu sampai sembilan, jumlah paling besar dua puluh). Catatan rombongan itu dikosongkan. */
export function ubahSendiri(k: KeadaanKarcis, kunci: "a" | "b", selisih: number): KeadaanKarcis {
  const baru = { ...k.sendiri, [kunci]: k.sendiri[kunci] + selisih };
  if (baru.a < 1 || baru.a > 19 || baru.b < 1 || baru.b > 9 || baru.a + baru.b > 20) return k;
  const catat = k.catat.map((c, i) => (i === k.catat.length - 1 ? [] : c));
  return { ...k, sendiri: baru, catat, langkah: 0 };
}
/** Jalankan satu langkah hitungan. Saat langkah terakhir selesai, caranya tercatat di papan rombongan itu. */
export function langkahBerikut(k: KeadaanKarcis, r: readonly RombonganSim[]): KeadaanKarcis {
  const { a, b } = bilanganRombongan(k, r);
  if (!bisaCara(k.cara, a, b) || k.langkah >= totalLangkah(k.cara, b)) return k;
  const langkah = k.langkah + 1;
  if (langkah < totalLangkah(k.cara, b)) return { ...k, langkah };
  const catat = k.catat.map((c, i) => (i === k.pilih && !c.includes(k.cara) ? [...c, k.cara] : c));
  return { ...k, langkah, catat };
}
export const hitunganSelesai = (k: KeadaanKarcis, r: readonly RombonganSim[]): boolean => {
  const { a, b } = bilanganRombongan(k, r);
  return bisaCara(k.cara, a, b) && k.langkah >= totalLangkah(k.cara, b);
};

/** Kalimat keadaan untuk suara (tanpa digit). */
export function kalimatKarcis(k: KeadaanKarcis, r: readonly RombonganSim[]): string {
  const { a, b } = bilanganRombongan(k, r);
  const nama = r[k.pilih].nama;
  if (!bisaCara(k.cara, a, b)) return k.cara === "genap" ? "Genapkan sepuluh cocok bila bilangan pertama hampir sepuluh dan jumlahnya melewati sepuluh. Pilih cara lain." : k.cara === "belasan" ? "Belasan tambah satuan cocok bila bilangan pertama belasan dan satuannya tidak melewati sepuluh. Pilih cara lain." : "Jumlahnya melebihi dua puluh.";
  if (k.langkah === 0) return `${nama}: ${kata(a)} karcis ditambah ${kata(b)} karcis. Tekan Langkah berikutnya.`;
  const k2 = a + b;
  if (k.cara === "maju") return k.langkah >= b ? `Maju ${kata(b)} langkah, hasilnya ${kata(k2)}. Tercatat di papan.` : `Maju ${kata(k.langkah)} langkah, sekarang ${kata(a + k.langkah)}.`;
  if (k.cara === "genap") return k.langkah === 1 ? `Ambil ${kata(10 - a)} dari ${kata(b)} supaya ${kata(a)} menjadi sepuluh. Sisanya ${kata(b - (10 - a))}.` : `Sepuluh ditambah ${kata(b - (10 - a))} sama dengan ${kata(k2)}. Tercatat di papan.`;
  return k.langkah === 1 ? `Satuannya ${kata(satuan(a))} ditambah ${kata(b)} sama dengan ${kata(satuan(a) + b)}. Puluhannya tetap satu.` : `Puluhan satu dan satuan ${kata(satuan(a) + b)} menjadi ${kata(k2)}. Tercatat di papan.`;
}
