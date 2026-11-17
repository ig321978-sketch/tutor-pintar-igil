/**
 * Logika murni Kelas 1 Bab 5 Sub-Bab A "Ikan Baru Datang" (menghitung, membaca, dan menulis bilangan sampai dua puluh), awal cerita
 * Akuarium Ikan Hias Abang, untuk tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract. Tanpa React dan tanpa jaringan,
 * diuji di Node: scripts/uji-ikan-k1b5a.mjs. Tempel label dan cara menjawab memakai ulang Kelas 1 Bab 1 Sub-Bab A.
 */
import type { Cara } from "../lemari-k1b1a/logika";

export { acak, cocok, cocokKelompok, kelompokLabel, labelDari, IKON_CARA, NAMA_CARA, URUT_CARA, type Cara, type Label, type Tempat } from "../lemari-k1b1a/logika";

/* ------------------------------ Kata bilangan sampai dua puluh ------------------------------ */
const SATUAN = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"] as const;
/** Nama bilangan nol sampai dua puluh (tanpa digit). */
export function kata(n: number): string {
  if (n >= 0 && n <= 9) return SATUAN[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n >= 12 && n <= 19) return `${SATUAN[n - 10]} belas`;
  if (n === 20) return "dua puluh";
  return String(n);
}
/** Kalimat sepuluh dan sisanya, mis. "sepuluh dan enam". */
export const kataSepuluh = (n: number): string => (n < 10 ? kata(n) : n === 20 ? "sepuluh dan sepuluh" : `sepuluh dan ${kata(n - 10)}`);

export type Metode = "igil" | "bingkai" | "manik" | "toples";
export const URUT_METODE: Metode[] = ["igil", "bingkai", "manik", "toples"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: satu-satu, sepuluh dulu, lalu sisanya",
  bingkai: "Double Ten Frame: dua bingkai sepuluh",
  manik: "Rekenrek: manik hitung",
  toples: "Estimation Jar: toples tebakan",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F945}", bingkai: "\u{1F51F}", manik: "\u{1F9EE}", toples: "\u{1F36F}" };

export type Rupa = "benda" | "diagram" | "lambang";

/* ------------------------------ Langkah soal ------------------------------ */
export type Langkah =
  /** Metode IGIL: pindahkan ikan satu per satu dari kantong ke dua wadah bersekat sepuluh, lalu jawab banyaknya. */
  | { tipe: "jaring"; ikan: number; jenis: string }
  /** Double Ten Frame: dua bingkai sepuluh terisi. Jawab banyaknya (angka) atau pilih nama bilangannya (nama, tanpa jawaban angka). */
  | { tipe: "bingkai"; isi: number; jawab: "angka" | "nama"; jenis: string }
  /** Rekenrek: geser manik sampai sasaran (sepuluh di baris atas), lalu jawab manik baris bawah; atau manik sudah tergeser, jawab semuanya. */
  | { tipe: "manik"; sasaran: number; tanya: "bawah" | "semua" }
  /** Estimation Jar: pilih tebakan dulu, lalu hitung isi toples satu per satu. */
  | { tipe: "toples"; ikan: number; jenis: string; tebakan: number[] };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

/** Kunci tiap langkah, dihitung dari datanya. Null untuk memilih nama bilangan. */
export function kunciLangkah(l: Langkah): number | null {
  switch (l.tipe) {
    case "jaring":
      return l.ikan;
    case "bingkai":
      return l.jawab === "angka" ? l.isi : null;
    case "manik":
      return l.tanya === "bawah" ? l.sasaran - 10 : l.sasaran;
    case "toples":
      return l.ikan;
  }
}
export const angkaJawab = kunciLangkah;

/** Tiga pilihan banyaknya di sekitar kunci (nol sampai dua puluh). */
export function pilihanDari(l: Langkah): number[] {
  const k = kunciLangkah(l) ?? 0;
  const ada = [...new Set([k - 1, k, k + 1].filter((n) => n >= 0 && n <= 20))];
  for (let n = 0; ada.length < 3 && n <= 20; n += 1) if (!ada.includes(n)) ada.push(n);
  return ada.sort((p, q) => p - q);
}

/** Pilihan nama bilangan untuk bingkai: nama yang benar, tetangganya, dan nama satuannya saja (lupa sepuluh). */
export function pilihanNama(n: number): number[] {
  const lain = n >= 20 ? n - 1 : n + 1;
  const satuan = n > 10 && n < 20 ? n - 10 : n === 20 ? 2 : n >= 1 ? n - 1 : 2;
  return [...new Set([n, lain, satuan])].sort((p, q) => p - q);
}

/** Tebakan yang paling dekat dengan banyak sebenarnya (indeks), atau -1 bila ada dua yang sama dekat. */
export function tebakanDekat(tebakan: readonly number[], n: number): number {
  const jarak = tebakan.map((t) => Math.abs(t - n));
  const m = Math.min(...jarak);
  const di = jarak.flatMap((j, i) => (j === m ? [i] : []));
  return di.length === 1 ? di[0] : -1;
}

/** Keadaan rekenrek: banyak manik tergeser di baris atas dan bawah setelah manik ke-i diketuk. */
export function geserManik(tergeser: number, i: number): number {
  return i < tergeser ? i : i + 1;
}

/* ------------------------------ Instruksi (templat, tanpa digit) ------------------------------ */
const AKHIR: Record<Cara, string> = { klik: "Lalu pilih banyaknya.", kanvas: "Lalu tulis angkanya di kanvas.", suara: "Lalu ucapkan banyaknya." };

export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  const akhir = AKHIR[cara];
  switch (l.tipe) {
    case "jaring":
      if (rupa === "lambang") return cara === "kanvas" ? `Hitung lanjut kartu kata. Beri satu tanda pada tiap kartu yang dihitung. ${akhir}` : `Ketuk kartu kata berurutan, satu kartu satu hitungan. ${akhir}`;
      if (cara === "kanvas") return `Wadah pertama sudah penuh, isinya sepuluh. Beri satu tanda pada tiap ${rupa === "benda" ? "ikan" : "titik"} di kantong. ${akhir}`;
      return `Ketuk ${rupa === "benda" ? "ikan" : "titik"} di kantong satu per satu. Penuhi sepuluh sekat dulu, lalu wadah kedua. ${akhir}`;
    case "bingkai":
      if (l.jawab === "nama") return cara === "kanvas" ? "Baca dua bingkai sepuluh, lalu lingkari nama bilangannya." : "Baca dua bingkai sepuluh, lalu pilih nama bilangannya.";
      if (rupa === "lambang") return `Baca kartunya: sepuluh dan sisanya. ${akhir}`;
      return `Ketuk bingkai yang penuh dulu, lalu ketuk tiap isi bingkai kedua sambil hitung lanjut. ${akhir}`;
    case "manik":
      if (l.tanya === "semua") {
        if (rupa === "lambang") return `Baca kartunya: sepuluh dan sisanya. ${akhir}`;
        return `Baris atas sudah sepuluh. Lingkari manik yang tergeser di baris bawah. ${akhir}`;
      }
      if (rupa === "lambang") return `Pecah ${kata(l.sasaran)} menjadi sepuluh dan sisanya. Berapa sisanya? ${cara === "klik" ? "Pilih jawabannya." : cara === "kanvas" ? "Tulis angkanya." : "Ucapkan jawabannya."}`;
      return `Geser manik sampai ${kata(l.sasaran)}. Penuhi baris atas dulu. Berapa manik di baris bawah? ${cara === "klik" ? "Pilih jawabannya." : "Ucapkan jawabannya."}`;
    case "toples":
      if (rupa === "lambang") return `Pilih tebakan yang paling dekat dengan hasil hitung. Lalu ${cara === "kanvas" ? "tulis lambang bilangannya." : cara === "suara" ? "ucapkan bilangannya." : "pilih lambang bilangannya."}`;
      if (cara === "kanvas") return `Tebak dulu banyaknya. Lalu beri satu tanda pada tiap ${rupa === "benda" ? "isi toples" : "titik"}. ${akhir}`;
      return `Tebak dulu banyaknya. Lalu ketuk tiap ${rupa === "benda" ? "isi toples" : "titik"} untuk membuktikan. ${akhir}`;
  }
}

/* ------------------------------ Simulasi Wadah Sekat Sepuluh ------------------------------ */
export type KantongSim = { id: string; nama: string; jenis: string; total: number };
/** Pilihan tebakan di simulasi (sama untuk tiap kantong). */
export const TEBAKAN_SIM = [5, 10, 15, 20] as const;
export type KeadaanIkan = {
  alat: "ikan";
  /** Kantong yang sedang dibuka. */
  pilih: string;
  /** Ikan yang sudah dipindah ke wadah bersekat, per kantong. */
  pindah: Record<string, number>;
  tebak: Record<string, number | null>;
  /** Label angka dan label nama yang dipasang (bilangan yang dimaksud), per kantong. */
  angka: Record<string, number | null>;
  nama: Record<string, number | null>;
  /** Kantong yang pernah dikembalikan ikannya. */
  ulang: string[];
};
const rekam = <T,>(ks: readonly KantongSim[], v: T): Record<string, T> => Object.fromEntries(ks.map((x) => [x.id, v]));
export const awalIkan = (ks: readonly KantongSim[]): KeadaanIkan => ({
  alat: "ikan",
  pilih: ks[0].id,
  pindah: rekam(ks, 0),
  tebak: rekam<number | null>(ks, null),
  angka: rekam<number | null>(ks, null),
  nama: rekam<number | null>(ks, null),
  ulang: [],
});
const totalDari = (ks: readonly KantongSim[], id: string): number => ks.find((x) => x.id === id)?.total ?? 0;
export const pilihKantong = (k: KeadaanIkan, id: string): KeadaanIkan => ({ ...k, pilih: id });
export const tebakIkan = (k: KeadaanIkan, n: number): KeadaanIkan => ({ ...k, tebak: { ...k.tebak, [k.pilih]: n } });
/** Pindahkan satu ikan dengan jaring dari kantong ke sekat berikutnya. */
export function jaringSatu(k: KeadaanIkan, ks: readonly KantongSim[]): KeadaanIkan {
  const p = k.pindah[k.pilih];
  if (p >= totalDari(ks, k.pilih)) return k;
  return { ...k, pindah: { ...k.pindah, [k.pilih]: p + 1 } };
}
/** Kembalikan satu ikan dari wadah ke kantong. */
export function kembalikanSatu(k: KeadaanIkan): KeadaanIkan {
  const p = k.pindah[k.pilih];
  if (p <= 0) return k;
  return { ...k, pindah: { ...k.pindah, [k.pilih]: p - 1 }, ulang: k.ulang.includes(k.pilih) ? k.ulang : [...k.ulang, k.pilih] };
}
export const pasangAngka = (k: KeadaanIkan, n: number): KeadaanIkan => ({ ...k, angka: { ...k.angka, [k.pilih]: n } });
export const pasangNama = (k: KeadaanIkan, n: number): KeadaanIkan => ({ ...k, nama: { ...k.nama, [k.pilih]: n } });
export const sisaKantong = (k: KeadaanIkan, ks: readonly KantongSim[], id = k.pilih): number => totalDari(ks, id) - k.pindah[id];
export const sudahDihitung = (k: KeadaanIkan, ks: readonly KantongSim[], id = k.pilih): boolean => sisaKantong(k, ks, id) === 0;
export const labelTepat = (k: KeadaanIkan, ks: readonly KantongSim[]): number =>
  ks.filter((x) => k.pindah[x.id] === x.total && k.angka[x.id] === x.total && k.nama[x.id] === x.total).length;

/** Kalimat keadaan untuk suara (tanpa digit). */
export function kalimatIkan(k: KeadaanIkan, ks: readonly KantongSim[]): string {
  const x = ks.find((y) => y.id === k.pilih) ?? ks[0];
  const p = k.pindah[x.id];
  const sisa = x.total - p;
  const wadah = p === 0 ? "Wadah masih kosong." : p < 10 ? `Di wadah ada ${kata(p)}.` : p === 10 ? "Wadah pertama penuh, sepuluh." : `Di wadah ada ${kataSepuluh(p)}, jadi ${kata(p)}.`;
  return `${x.nama.charAt(0).toUpperCase()}${x.nama.slice(1)}. ${wadah} ${sisa === 0 ? "Kantong sudah kosong." : "Kantong masih berisi ikan."}`;
}
