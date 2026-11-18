/**
 * Logika murni Kelas 2 Bab 3 Sub-Bab B "Papan Puzzle yang Berantakan" (mengurai dan menyusun bangun datar), tengah cerita Taman Bermain Sekolah,
 * untuk tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-puzzle-k2b3b.mjs.
 * Jawaban bab ini tidak hanya angka: banyak keping (satu angka), nama bentuk, pilihan benar atau salah, urutan langkah, dan menyusun keping ke bayangan.
 */
import type { Cara } from "../lemari-k1b1a/logika";
import {
  HASIL_GABUNG,
  HASIL_LIPAT,
  NAMA_GABUNG,
  NAMA_JENIS,
  NAMA_LIPATAN,
  URUT_GABUNG,
  URUT_JENIS,
  banyakGabung,
  banyakUrai,
  gabung,
  jenisUrai,
  type Garis,
  type Gabung,
  type Jenis,
  type Lipatan,
  TANGRAM,
} from "./bentuk";

export { acak, cocok, cocokKelompok, kelompokLabel, labelDari, IKON_CARA, NAMA_CARA, URUT_CARA, type Cara, type Label, type Tempat } from "../lemari-k1b1a/logika";
export type { Garis, Gabung, Jenis, Lipatan } from "./bentuk";

const SATUAN = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"] as const;
/** Nama bilangan nol sampai sembilan (tanpa digit). */
export const kata = (n: number): string => (n >= 0 && n <= 9 ? SATUAN[n] : String(n));
const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

/* ------------------------------ Metode ------------------------------ */
export type Metode = "igil" | "blok" | "lipat" | "bayangan";
export const URUT_METODE: Metode[] = ["igil", "blok", "lipat", "bayangan"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Garis Urai, Hitung Keping",
  blok: "Pattern Blocks: Pola Blok",
  lipat: "Paper Folding: Lipat Kertas",
  bayangan: "Silhouette Puzzle: Teka-Teki Bayangan",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F9E9}", blok: "\u{1F9F1}", lipat: "\u{1F4C4}", bayangan: "\u{1F311}" };

export type Rupa = "benda" | "diagram" | "lambang";

/* ------------------------------ Langkah soal ------------------------------ */
/** Segi `n` beraturan diurai dengan garis dari satu pojok atau dari titik tengah. Jawab: banyak segitiga (satu angka). */
export type LangkahPola = { tipe: "pola"; n: number; dari: "pojok" | "pusat" };
/** Bangun diurai dengan garis tertentu. Jawab: nama keping hasil uraian. */
export type LangkahUraiNama = { tipe: "uraiNama"; n: number; garis: Garis };
/** Keping disusun menjadi satu bentuk. Jawab: nama bentuk hasil. */
export type LangkahGabungNama = { tipe: "gabungNama"; kind: Gabung };
/** Kumpulan keping. Jawab: banyak semua keping atau banyak keping berjenis tertentu. */
export type LangkahHitung = { tipe: "hitung"; keping: { jenis: Jenis; n: number }[]; tanya: "semua" | Jenis };
/** Kegiatan menyusun: ketuk keping lalu bayangan tempatnya sampai semua terisi. Tanpa angka jawaban. */
export type LangkahSusun = { tipe: "susun"; kind: Gabung };
/** Kegiatan mengurutkan langkah. Tanpa angka jawaban. */
export type LangkahUrut = { tipe: "urut"; metode?: Metode; judul: string; langkah: string[] };
/** Kertas persegi dilipat lalu digunting. Jawab: banyak keping atau nama keping. */
export type LangkahLipat = { tipe: "lipat"; lipatan: Lipatan; tanya: "banyak" | "nama" };
/** Bayangan ditutup keping. Jawab: banyak keping yang dipakai atau nama bentuk bayangan. */
export type LangkahBayangan = { tipe: "bayangan"; kind: Gabung; tanya: "banyak" | "nama" };
/** Gambar keping yang ditumpuk (hanya bahan Cari kesalahan). */
export type LangkahTumpuk = { tipe: "tumpuk" };
export type LangkahDasar = LangkahPola | LangkahUraiNama | LangkahGabungNama | LangkahHitung | LangkahSusun | LangkahUrut | LangkahLipat | LangkahBayangan | LangkahTumpuk;
/**
 * Cari kesalahan: seorang tokoh sudah menyatakan sesuatu tentang gambar `dasar`. Anak memutuskan benar atau salah, lalu memilih alasan yang benar dari tiga.
 * `betul`: tokoh sebenarnya benar. `benar`: nomor alasan yang tepat. Tanpa angka jawaban.
 */
export type LangkahSalah = { tipe: "salah"; dasar: LangkahDasar; tokoh: string; kataTokoh: string; alasan: [string, string, string]; benar: number; keliru: string; betul?: boolean };
export type Langkah = LangkahDasar | LangkahSalah;
export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);
/** Metode yang dilatih sebuah langkah: Garis Urai (pola, uraian), Pola Blok (menghitung dan menyusun), Lipat Kertas, atau Teka-Teki Bayangan. */
export function metodeLangkah(l: Langkah): Metode {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "pola":
    case "uraiNama":
      return "igil";
    case "hitung":
    case "gabungNama":
    case "susun":
      return "blok";
    case "lipat":
      return "lipat";
    case "urut":
      return d.metode ?? "lipat";
    default:
      return "bayangan";
  }
}

/* ------------------------------ Kunci (dihitung dari data) ------------------------------ */
export type Jawaban = { jenis: "angka"; nilai: number } | { jenis: "nama"; nilai: Jenis } | null;

export function banyakPola(l: LangkahPola): number {
  return banyakUrai(l.n, l.dari);
}
export function banyakHitung(l: LangkahHitung): number {
  return l.tanya === "semua" ? l.keping.reduce((s, k) => s + k.n, 0) : l.keping.filter((k) => k.jenis === l.tanya).reduce((s, k) => s + k.n, 0);
}
export function jawaban(l: Langkah): Jawaban {
  switch (l.tipe) {
    case "pola":
      return { jenis: "angka", nilai: banyakPola(l) };
    case "uraiNama":
      return { jenis: "nama", nilai: jenisUrai(l.n, l.garis) };
    case "gabungNama":
      return { jenis: "nama", nilai: HASIL_GABUNG[l.kind] };
    case "hitung":
      return { jenis: "angka", nilai: banyakHitung(l) };
    case "lipat":
      return l.tanya === "banyak" ? { jenis: "angka", nilai: HASIL_LIPAT[l.lipatan].banyak } : { jenis: "nama", nilai: HASIL_LIPAT[l.lipatan].jenis };
    case "bayangan":
      return l.tanya === "banyak" ? { jenis: "angka", nilai: banyakGabung(l.kind) } : { jenis: "nama", nilai: HASIL_GABUNG[l.kind] };
    default:
      return null;
  }
}
export const kunciAngka = (l: Langkah): number | null => {
  const j = jawaban(l);
  return j && j.jenis === "angka" ? j.nilai : null;
};
export const kunciNama = (l: Langkah): Jenis | null => {
  const j = jawaban(l);
  return j && j.jenis === "nama" ? j.nilai : null;
};
/** Soal yang langsung siap dijawab (tanpa kegiatan lebih dulu). */
export const siapLangsung = (l: Langkah): boolean => jawaban(l) !== null;
/** Soal berupa kegiatan (menyusun, mengurutkan, atau Cari kesalahan) yang selesai sendiri tanpa angka atau nama jawaban. */
export const kegiatan = (l: Langkah): boolean => jawaban(l) === null;

/** Tiga pilihan angka di sekitar kunci, memuat angka pengecoh yang masuk akal (cara yang satunya, selisih satu). */
export function pilihanAngka(l: Langkah): number[] {
  const k = kunciAngka(l);
  if (k === null) return [];
  const d = dasarDari(l);
  const ada: number[] = [k];
  const calon: number[] = [];
  if (d.tipe === "pola") calon.push(banyakUrai(d.n, d.dari === "pojok" ? "pusat" : "pojok"));
  if (d.tipe === "hitung") calon.push(d.keping.length);
  calon.push(k + 1, k - 1, k + 2, k - 2);
  for (const c of calon) if (ada.length < 3 && c >= 1 && c <= 9 && !ada.includes(c)) ada.push(c);
  for (let n = 1; ada.length < 3 && n <= 9; n += 1) if (!ada.includes(n)) ada.push(n);
  return ada.sort((p, q) => p - q);
}
/** Empat pilihan nama bentuk: kunci dan tiga pengecoh tetap. Diurutkan menurut nama supaya kunci tidak selalu di tombol pertama. */
export function pilihanNama(l: Langkah): Jenis[] {
  const k = kunciNama(l);
  if (k === null) return [];
  const lain = URUT_JENIS.filter((j) => j !== k);
  const ambil = [lain[(URUT_JENIS.indexOf(k) + 1) % lain.length], lain[(URUT_JENIS.indexOf(k) + 2) % lain.length], lain[(URUT_JENIS.indexOf(k) + 3) % lain.length]];
  return [k, ...ambil].sort((a, b) => NAMA_JENIS[a].localeCompare(NAMA_JENIS[b]));
}

/* ------------------------------ Kalimat (tanpa digit) ------------------------------ */
const darinya = (d: "pojok" | "pusat") => (d === "pojok" ? "satu pojok" : "titik tengah");
/** Kalimat yang menjelaskan jawaban benar. */
export function kalimatKunci(l: LangkahDasar): string {
  switch (l.tipe) {
    case "pola":
      return l.dari === "pojok" ? `Dari satu pojok, banyak segitiga adalah banyak sisi dikurangi dua. Jadi ada ${kata(banyakPola(l))} segitiga.` : `Dari titik tengah, banyak segitiga sama dengan banyak sisi. Jadi ada ${kata(banyakPola(l))} segitiga.`;
    case "uraiNama":
      return `Keping hasil uraiannya berbentuk ${NAMA_JENIS[jenisUrai(l.n, l.garis)]}.`;
    case "gabungNama":
      return `Keping-keping itu menyusun ${NAMA_JENIS[HASIL_GABUNG[l.kind]]}.`;
    case "hitung":
      return `Banyak kepingnya ${kata(banyakHitung(l))}.`;
    case "susun":
      return "Semua keping sudah terpasang tanpa bertumpuk dan tanpa celah.";
    case "urut":
      return "Urutan langkahnya sudah benar.";
    case "lipat":
      return l.tanya === "banyak" ? `Hasil lipatan itu ada ${kata(HASIL_LIPAT[l.lipatan].banyak)} keping.` : `Kepingnya berbentuk ${NAMA_JENIS[HASIL_LIPAT[l.lipatan].jenis]}.`;
    case "bayangan":
      return l.tanya === "banyak" ? `Bayangan itu ditutup ${kata(banyakGabung(l.kind))} keping.` : `Bayangan itu berbentuk ${NAMA_JENIS[HASIL_GABUNG[l.kind]]}.`;
    case "tumpuk":
      return "Keping tidak boleh bertumpuk.";
  }
}

const AKHIR: Record<Cara, string> = { klik: "Lalu pilih jawabannya.", kanvas: "Lalu tulis angkanya di kanvas.", suara: "Lalu ucapkan jawabannya." };
const AKHIR_NAMA: Record<Cara, string> = { klik: "Lalu pilih namanya.", kanvas: "Lalu tulis angkanya di kanvas.", suara: "Lalu ucapkan namanya." };

/** Kalimat pertanyaan jawaban untuk soal yang punya jawaban. */
export function kalimatTanya(l: LangkahDasar): string {
  switch (l.tipe) {
    case "pola":
      return "Berapa banyak segitiga hasil uraian?";
    case "uraiNama":
      return "Keping hasil uraian itu bernama apa?";
    case "gabungNama":
      return "Keping-keping itu menyusun bentuk apa?";
    case "hitung":
      return l.tanya === "semua" ? "Berapa banyak semua keping?" : `Berapa banyak keping berbentuk ${NAMA_JENIS[l.tanya]}?`;
    case "lipat":
      return l.tanya === "banyak" ? "Berapa banyak keping hasil lipatan?" : "Keping hasil lipatan itu bernama apa?";
    case "bayangan":
      return l.tanya === "banyak" ? "Berapa banyak keping yang menutupi bayangan?" : "Bentuk bayangan itu bernama apa?";
    default:
      return "";
  }
}

/** Instruksi lengkap satu langkah (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat.`;
  const j = jawaban(l);
  const akhir = j && j.jenis === "nama" ? AKHIR_NAMA[cara] : AKHIR[cara];
  const lihat = rupa === "benda" ? "Lihat keping kayu di meja." : rupa === "diagram" ? "Lihat gambar keping polos di lembar." : "Baca kata dan lambang di lembar petunjuk.";
  switch (l.tipe) {
    case "pola":
      return `${lihat} Bangun ini punya ${kata(l.n)} sisi dan diurai dengan garis dari ${darinya(l.dari)}. Hitung banyak segitiga hasilnya. ${akhir}`;
    case "uraiNama":
      return `${lihat} Bangun ini diurai menjadi keping-keping. Perhatikan banyak sisi tiap keping. ${akhir}`;
    case "gabungNama":
      return `${lihat} Keping-keping ini disusun menjadi satu bentuk. Perhatikan banyak sisi bentuk baru. ${akhir}`;
    case "hitung":
      return `${lihat} ${l.tanya === "semua" ? "Hitung semua keping." : `Hitung hanya keping yang berbentuk ${NAMA_JENIS[l.tanya]}.`} ${akhir}`;
    case "susun":
      return `${lihat} Ketuk satu keping, lalu ketuk bayangan tempatnya. Pakai semua keping dan jangan bertumpuk.`;
    case "urut":
      return `${l.judul} Ketuk langkahnya sesuai urutan, mulai dari yang pertama.`;
    case "lipat":
      return `${lihat} Kertas persegi ${NAMA_LIPATAN[l.lipatan]}, lalu digunting sepanjang lipatan. ${l.tanya === "banyak" ? "Hitung banyak kepingnya." : "Perhatikan bentuk kepingnya."} ${akhir}`;
    case "bayangan":
      return `${lihat} Bayangan gelap ini ditutup oleh keping-keping. ${l.tanya === "banyak" ? "Hitung banyak keping yang dipakai." : "Perhatikan bentuk bayangannya."} ${akhir}`;
    case "tumpuk":
      return lihat;
  }
}

/* ------------------------------ Petunjuk saat salah (menunjuk kesalahannya, tanpa digit) ------------------------------ */
export function petunjukSalah(l: Langkah, jawab: number | string): string {
  if (l.tipe === "salah") return `Alasan itu belum tepat. ${l.keliru}`;
  switch (l.tipe) {
    case "pola": {
      const lain = banyakUrai(l.n, l.dari === "pojok" ? "pusat" : "pojok");
      if (jawab === lain) return "Itu hasil dari cara garis yang satunya. Lihat lagi dari mana garisnya ditarik.";
      return l.dari === "pojok" ? "Dari satu pojok, banyak segitiga adalah banyak sisi dikurangi dua. Hitung lagi." : "Dari titik tengah, banyak segitiga sama dengan banyak sisi. Hitung lagi.";
    }
    case "uraiNama":
    case "gabungNama":
      return "Hitung dulu banyak sisi bentuk itu: tiga sisi segitiga, empat sisi segi empat, lima sisi segi lima, enam sisi segi enam.";
    case "hitung":
      return l.tanya === "semua" ? "Hitung semua keping satu per satu, jangan ada yang terlewat." : "Hitung hanya keping yang bentuknya sama dengan yang ditanyakan.";
    case "lipat":
      return l.tanya === "banyak" ? "Tiap lipatan yang digunting membagi kertas jadi dua kali lebih banyak. Hitung lagi kepingnya." : "Lihat bentuk satu keping hasil guntingan. Hitung sisinya.";
    case "bayangan":
      return l.tanya === "banyak" ? "Lihat garis pertemuan keping di dalam bayangan. Hitung kepingnya satu per satu." : "Hitung banyak sisi bentuk bayangannya.";
    default:
      return "Coba lagi.";
  }
}

/** Baris kata dan lambang untuk lembar petunjuk Abstract (tabel kata; angka sebagai lambang boleh). */
export function barisLambang(l: LangkahDasar): [string, string][] {
  switch (l.tipe) {
    case "pola":
      return [["Bangun", `segi ${kata(l.n)}`], ["Banyak sisi", String(l.n)], ["Garis dari", darinya(l.dari)], ["Banyak segitiga", "?"]];
    case "uraiNama":
      return [["Bangun", l.n === 4 ? "persegi" : `segi ${kata(l.n)}`], ["Garis", l.garis === "miring" ? "miring dari pojok ke pojok" : l.garis === "tengah" ? "lurus di tengah" : `dari ${darinya(l.garis === "pojok" ? "pojok" : "pusat")}`], ["Nama keping", "?"]];
    case "gabungNama":
      return [["Keping", NAMA_GABUNG[l.kind]], ["Bentuk baru", "?"]];
    case "hitung":
      return [...l.keping.map((k): [string, string] => [NAMA_JENIS[k.jenis], String(k.n)]), ["Ditanya", l.tanya === "semua" ? "semua keping" : NAMA_JENIS[l.tanya]], ["Banyak keping", "?"]];
    case "lipat":
      return [["Kertas persegi", NAMA_LIPATAN[l.lipatan]], [l.tanya === "banyak" ? "Banyak keping" : "Nama keping", "?"]];
    case "bayangan":
      return [["Penutup bayangan", NAMA_GABUNG[l.kind]], [l.tanya === "banyak" ? "Banyak keping" : "Nama bayangan", "?"]];
    case "urut":
      return [["Langkah", l.judul]];
    case "susun":
      return [["Susun", NAMA_GABUNG[l.kind]]];
    case "tumpuk":
      return [["Keping", "bertumpuk"]];
  }
}

/* ------------------------------ Simulasi Papan Puzzle ------------------------------ */
export type ModePuzzle = "urai" | "susun" | "tangram";
export type KeadaanPuzzle = {
  alat: "puzzle";
  mode: ModePuzzle;
  /** Bangun yang diurai (banyak sisi) dan garis yang dipakai. */
  n: number;
  garis: Garis;
  /** Uraian yang sudah dilihat, tiap kunci "n-garis". */
  uraiDilihat: string[];
  /** Bayangan yang sedang disusun, keping yang terpasang (nomor keping dan nomor tempat), dan bayangan yang sudah tuntas. */
  kind: Gabung;
  terpasang: { p: number; s: number }[];
  susunTuntas: Gabung[];
  /** Percobaan menumpuk keping (selalu ditolak). */
  tumpuk: number;
  /** Tempat tangram yang sudah terisi (id keping) dan persegi tuntas. */
  tangram: string[];
  /** Keping tangram yang sudah dipakai (id). */
  tangramPakai: string[];
  tangramTuntas: boolean;
};
/** Bangun untuk diurai di simulasi (berbeda dari Story): segi lima, persegi, dan segi enam. */
export const BANGUN_SIM = [5, 4, 6] as const;
/** Bayangan untuk disusun di simulasi (berbeda dari Story): enam segitiga, dua segitiga dan segi empat atas bawah, dan segitiga besar. */
export const BAYANGAN_SIM: Gabung[] = ["enamSegitiga", "atasBawah", "pendek"];
export const garisBoleh = (n: number): Garis[] => (n === 4 ? ["miring", "tengah", "pusat"] : ["pojok", "pusat"]);

export const awalPuzzle = (): KeadaanPuzzle => ({ alat: "puzzle", mode: "urai", n: 5, garis: "pojok", uraiDilihat: [], kind: BAYANGAN_SIM[0], terpasang: [], susunTuntas: [], tumpuk: 0, tangram: [], tangramPakai: [], tangramTuntas: false });
export const kunciUrai = (n: number, g: Garis): string => `${n}-${g}`;
export const pilihModePuzzle = (k: KeadaanPuzzle, mode: ModePuzzle): KeadaanPuzzle => ({ ...k, mode });
/** Pilih bangun; garis disesuaikan. Uraian yang tampil langsung tercatat sebagai sudah dilihat. */
export function pilihBangun(k: KeadaanPuzzle, n: number): KeadaanPuzzle {
  if (!(BANGUN_SIM as readonly number[]).includes(n)) return k;
  const g = garisBoleh(n).includes(k.garis) ? k.garis : garisBoleh(n)[0];
  return lihatUrai({ ...k, n, garis: g });
}
export function pilihGaris(k: KeadaanPuzzle, g: Garis): KeadaanPuzzle {
  if (!garisBoleh(k.n).includes(g)) return k;
  return lihatUrai({ ...k, garis: g });
}
export function lihatUrai(k: KeadaanPuzzle): KeadaanPuzzle {
  const key = kunciUrai(k.n, k.garis);
  return k.uraiDilihat.includes(key) ? k : { ...k, uraiDilihat: [...k.uraiDilihat, key] };
}
export const hasilUraiSim = (k: KeadaanPuzzle): { banyak: number; jenis: Jenis } => ({ banyak: banyakUrai(k.n, k.garis), jenis: jenisUrai(k.n, k.garis) });

export function pilihBayangan(k: KeadaanPuzzle, kind: Gabung): KeadaanPuzzle {
  if (!BAYANGAN_SIM.includes(kind)) return k;
  return { ...k, kind, terpasang: [] };
}
/** Pasang keping nomor `p` ke tempat nomor `s`: hanya bila jenisnya sama, tempat kosong, dan keping belum terpakai. */
export function pasangKeping(k: KeadaanPuzzle, p: number, s: number): { k: KeadaanPuzzle; ok: boolean } {
  const kp = gabung(k.kind, 0, 0, 1).keping;
  if (p < 0 || s < 0 || p >= kp.length || s >= kp.length) return { k, ok: false };
  if (k.terpasang.some((x) => x.p === p || x.s === s)) return { k, ok: false };
  if (kp[p].jenis !== kp[s].jenis) return { k, ok: false };
  const terpasang = [...k.terpasang, { p, s }];
  const tuntas = terpasang.length === kp.length;
  return { k: { ...k, terpasang, susunTuntas: tuntas && !k.susunTuntas.includes(k.kind) ? [...k.susunTuntas, k.kind] : k.susunTuntas }, ok: true };
}
export const ulangSusun = (k: KeadaanPuzzle): KeadaanPuzzle => ({ ...k, terpasang: [] });
/** Mencoba menumpuk keping: selalu ditolak, tetapi dicatat. */
export const cobaTumpuk = (k: KeadaanPuzzle): KeadaanPuzzle => ({ ...k, tumpuk: k.tumpuk + 1 });

/** Pasang keping tangram `id` ke tempat berkeping `slot`: hanya bila ukuran dan bentuknya sama (nama kepingnya sama). */
export function pasangTangram(k: KeadaanPuzzle, id: string, slot: string): { k: KeadaanPuzzle; ok: boolean } {
  const a = TANGRAM.find((t) => t.id === id);
  const b = TANGRAM.find((t) => t.id === slot);
  if (!a || !b || k.tangram.includes(slot) || k.tangramPakai.includes(id) || a.nama !== b.nama) return { k, ok: false };
  const tangram = [...k.tangram, slot];
  return { k: { ...k, tangram, tangramPakai: [...k.tangramPakai, id], tangramTuntas: tangram.length === TANGRAM.length }, ok: true };
}
export const ulangTangram = (k: KeadaanPuzzle): KeadaanPuzzle => ({ ...k, tangram: [], tangramPakai: [] });

/** Kalimat keadaan untuk suara (tanpa digit). */
export function kalimatPuzzle(k: KeadaanPuzzle): string {
  if (k.mode === "urai") {
    const h = hasilUraiSim(k);
    return `${besar(k.n === 4 ? "persegi" : `segi ${kata(k.n)}`)} diurai dengan garis ${k.garis === "pusat" ? "dari titik tengah" : k.garis === "pojok" ? "dari satu pojok" : k.garis === "miring" ? "miring" : "lurus di tengah"}: ada ${kata(h.banyak)} keping ${NAMA_JENIS[h.jenis]}.`;
  }
  if (k.mode === "susun") {
    const total = banyakGabung(k.kind);
    if (k.terpasang.length === total) return `Bayangan penuh. Semua keping terpasang tanpa bertumpuk, jadi ${NAMA_JENIS[HASIL_GABUNG[k.kind]]}.`;
    return k.terpasang.length === 0 ? "Ketuk satu keping, lalu ketuk bayangan tempatnya." : `Sudah ${kata(k.terpasang.length)} keping terpasang. Pasang sisanya.`;
  }
  return k.tangramTuntas ? "Ketujuh keping tangram sudah mengisi persegi besar." : `Sudah ${kata(k.tangram.length)} keping tangram terpasang. Ketuk keping, lalu ketuk tempatnya.`;
}
export { URUT_GABUNG };
