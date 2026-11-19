/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 3 Bab 5 Sub-Bab A "Catatan Pak Hasan" (mengurutkan dan membandingkan data: urutan, data terkecil dan terbesar, jangkauan, turus dan banyak):
 * jenis tugas, jawaban benar, pilihan, instruksi (tanpa digit), dan petunjuk salah. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-papan-k3b5a.mjs.
 * Jawaban beragam: memilih urutan atau bilangan (klik), menulis satu angka di kanvas, dan mengucapkan satu kata (terkecil, terbesar, sama, berbeda) atau bilangan pendek.
 * Jawaban benar dihitung dari data. Empat metode tiap misi: IGIL "Urutkan, Cari Ujung, Kurangkan", Number Order Line (Garis Urutan), Range Check (Cek Jangkauan), Tally Count (Hitung Turus).
 */
import type { Cara } from "../lemari-k1b1a/logika";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";

export type Rupa = "benda" | "diagram" | "lambang";
const kapital = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);

/* ------------------------------ Kata bilangan ------------------------------ */
const SAT = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"] as const;
/** Nama bilangan 0 sampai 999 dalam kata (tanpa digit): seratus, dua puluh tiga, lima belas. */
export function kataBil(n: number): string {
  if (n < 0 || n > 999 || !Number.isInteger(n)) return String(n);
  if (n < 10) return SAT[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${SAT[n - 10]} belas`;
  if (n < 100) {
    const p = Math.floor(n / 10);
    const s = n % 10;
    return s === 0 ? `${SAT[p]} puluh` : `${SAT[p]} puluh ${SAT[s]}`;
  }
  const r = Math.floor(n / 100);
  const sisa = n % 100;
  const ratus = r === 1 ? "seratus" : `${SAT[r]} ratus`;
  return sisa === 0 ? ratus : `${ratus} ${kataBil(sisa)}`;
}
export const kata = kataBil;
/** Ubah teks berangka menjadi ucapan tanpa digit: "9 − 3 = 6" menjadi "sembilan dikurangi tiga sama dengan enam", "2 3 5" menjadi "dua tiga lima". */
export function ucapkan(t: string): string {
  return t
    .replace(/ [−-] /g, " dikurangi ")
    .replace(/ \+ /g, " ditambah ")
    .replace(/ = /g, " sama dengan ")
    .replace(/\d+/g, (d) => ` ${kataBil(Number(d))} `)
    .replace(/\s+/g, " ")
    .trim();
}
export const ORDINAL = ["pertama", "kedua", "ketiga", "keempat", "kelima", "keenam"] as const;

/* ------------------------------ Data ------------------------------ */
export type Arah = "naik" | "turun";
export type Ujung = "kecil" | "besar";
export type SisiGaris = "kiri" | "kanan";
/** Urutan data (naik = terkecil ke terbesar, turun = sebaliknya) tanpa mengubah data asli. */
export const urutkan = (d: readonly number[], arah: Arah = "naik"): number[] => [...d].sort((a, b) => (arah === "naik" ? a - b : b - a));
export const terkecil = (d: readonly number[]): number => Math.min(...d);
export const terbesar = (d: readonly number[]): number => Math.max(...d);
export const jangkauan = (d: readonly number[]): number => terbesar(d) - terkecil(d);
export const teksUrut = (d: readonly number[], arah: Arah): string => urutkan(d, arah).join(" ");
/** Banyak bundel lima penuh dan garis sisa pada turus berbanyak `n`. */
export const bundel = (n: number): number => Math.floor(n / 5);
export const sisaGaris = (n: number): number => n % 5;
export const HARI = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab"] as const;

/* ------------------------------ Jenis tugas ------------------------------ */
/** Mengurutkan data dari terkecil ke terbesar (naik) atau sebaliknya (turun); `ke` (mulai satu) = bilangan ke berapa dalam urutan yang ditanyakan. */
export type LUrut = { tipe: "urut"; benda: string; data: number[]; arah: Arah; ke: number };
/** Mencari data terkecil atau terbesar (klik dan kanvas); pada suara kartu yang ditandai ditanyakan terkecil atau terbesar. */
export type LUjung = { tipe: "ujung"; benda: string; data: number[]; cari: Ujung };
/** Jangkauan = data terbesar dikurangi data terkecil. */
export type LJangkau = { tipe: "jangkau"; benda: string; data: number[] };
/** Number Order Line: data pada garis bilangan nol sampai sembilan; membaca bilangan di titik paling kiri atau kanan, atau menghitung loncatan di antara keduanya. */
export type LGaris = { tipe: "garis"; benda: string; data: number[]; ujung: SisiGaris };
/** Range Check: data terkecil ditambah jangkauan yang dicatat dibandingkan dengan data terbesar. */
export type LCek = { tipe: "cek"; benda: string; kecil: number; besar: number; klaim: number };
/** Tally Count: turus dengan `banyak` garis (bundel lima = empat tegak dan satu miring). */
export type LTurus = { tipe: "turus"; benda: string; banyak: number };
export type LangkahDasar = LUrut | LUjung | LJangkau | LGaris | LCek | LTurus;
/** Cari kesalahan: tokoh sudah menjawab dari `dasar`. Anak menilai benar atau salah, memilih alasan, lalu menjawab sendiri. `jawabTokoh` memakai angka sebagai teks ("7"). */
export type LangkahSalah = {
  tipe: "salah";
  dasar: LUjung | LJangkau | LTurus;
  tokoh: string;
  kataTokoh: string;
  jawabTokoh: string;
  alasan: [string, string, string];
  benar: number;
  keliru: string;
  betul?: boolean;
};
export type Langkah = LangkahDasar | LangkahSalah;
export type Metode = "igil" | "garis" | "cek" | "turus";
export const URUT_METODE: Metode[] = ["igil", "garis", "cek", "turus"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Urutkan, Cari Ujung, Kurangkan",
  garis: "Number Order Line: Garis Urutan",
  cek: "Range Check: Cek Jangkauan",
  turus: "Tally Count: Hitung Turus",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F522}", garis: "\u{1F4CF}", cek: "\u{1F501}", turus: "\u{1F4DD}" };
const AWALAN: Record<Metode, string> = { igil: "Metode IGIL", garis: "Number Order Line", cek: "Range Check", turus: "Tally Count" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);

/** Data yang tampil pada gambar tugas (kosong untuk Range Check dan turus). */
export const dataTugas = (l: LangkahDasar): number[] => (l.tipe === "cek" || l.tipe === "turus" ? [] : l.data);

/** Angka hasil hitung tugas menurut caranya. Tugas urutan klik dan kata (terkecil, terbesar, sama, berbeda) tidak punya angka. */
export function angkaTugas(l: LangkahDasar, cara?: Cara): number | null {
  switch (l.tipe) {
    case "urut":
      return cara === "klik" ? null : (urutkan(l.data, l.arah)[l.ke - 1] ?? null);
    case "ujung":
      return cara === "suara" ? null : l.cari === "kecil" ? terkecil(l.data) : terbesar(l.data);
    case "jangkau":
      return jangkauan(l.data);
    case "garis":
      return cara === "kanvas" ? jangkauan(l.data) : l.ujung === "kiri" ? terkecil(l.data) : terbesar(l.data);
    case "cek":
      return cara === "klik" ? l.kecil + l.klaim : cara === "kanvas" ? l.besar - l.kecil : null;
    case "turus":
      return cara === "kanvas" ? bundel(l.banyak) : l.banyak;
  }
}

/* ------------------------------ Jawaban benar ------------------------------ */
export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: string };
const angka = (n: number): Kunci => ({ jenis: "angka", n });
const nama = (s: string): Kunci => ({ jenis: "nama", nama: s });

/** Jawaban benar tiap jenis tugas menurut caranya, dihitung dari data. */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  switch (l.tipe) {
    case "urut":
      return cara === "klik" ? nama(teksUrut(l.data, l.arah)) : angka(angkaTugas(l, cara) ?? 0);
    case "ujung":
      return cara === "suara" ? nama(l.cari === "kecil" ? "terkecil" : "terbesar") : angka(angkaTugas(l, cara) ?? 0);
    case "cek":
      return cara === "suara" ? nama(l.kecil + l.klaim === l.besar ? "sama" : "berbeda") : angka(angkaTugas(l, cara) ?? 0);
    default:
      return angka(angkaTugas(l, cara) ?? 0);
  }
}

/** Apakah tugas langsung siap dijawab? Semua tugas punya jawaban, kecuali Cari kesalahan yang memakai kegiatan lebih dulu. Tidak bergantung pada rupa. */
export function siapLangsung(l: Langkah, rupa: Rupa, cara: Cara): boolean {
  void rupa;
  if (l.tipe === "salah") return false;
  return kunciJawab(l, cara) !== null;
}

/* ------------------------------ Pilihan ------------------------------ */
/** Pengecoh khas untuk jawaban bilangan, menurut jenis tugas (kesalahan yang lazim). */
export function pengecoh(l: Langkah, cara: Cara, awal?: number): number[] {
  const d = dasarDari(l);
  const n = angkaTugas(d, cara === "suara" && d.tipe === "ujung" ? "klik" : cara) ?? 0;
  let khas: number[] = [];
  switch (d.tipe) {
    case "urut":
    case "ujung":
      khas = d.data.filter((x) => x !== n);
      break;
    case "jangkau":
      khas = [terbesar(d.data) + terkecil(d.data), terbesar(d.data), terkecil(d.data)];
      break;
    case "garis":
      khas = cara === "kanvas" ? [terbesar(d.data), terkecil(d.data), n + 1] : d.data.filter((x) => x !== n);
      break;
    case "cek":
      khas = cara === "kanvas" ? [d.kecil + d.klaim, d.besar, d.klaim] : [d.besar, d.klaim, d.kecil + d.klaim - 1];
      break;
    case "turus":
      khas = cara === "kanvas" ? [sisaGaris(d.banyak), bundel(d.banyak) + 1] : [d.banyak + bundel(d.banyak), bundel(d.banyak) + sisaGaris(d.banyak), d.banyak - 1];
      break;
  }
  const calon = [awal ?? -1, ...khas, n + 1, n - 1, n + 2, n - 2, n + 10];
  const hasil: number[] = [];
  for (const c of calon) if (Number.isInteger(c) && c >= 1 && c <= 99 && c !== n && !hasil.includes(c)) hasil.push(c);
  return hasil;
}
/** Sisipkan jawaban benar di tempat yang bukan pertama (deterministik). */
function sisipkan<T>(benar: T, lain: T[], geser: number): T[] {
  const p = 1 + (geser % lain.length);
  return [...lain.slice(0, p), benar, ...lain.slice(p)];
}
/** Bilangan dalam jawaban klik tokoh: "7" menjadi 7. */
const angkaDariTeks = (t: string): number => Number(/\d+/.exec(t)?.[0] ?? -1);
/** Dua urutan keliru untuk pilihan klik tugas urutan: arah kebalikan, urutan asli (belum diurutkan), atau dua bilangan bertukar. */
function urutanKeliru(l: LUrut): string[] {
  const benar = teksUrut(l.data, l.arah);
  const lawan = teksUrut(l.data, l.arah === "naik" ? "turun" : "naik");
  const asli = l.data.join(" ");
  const tukar = (() => {
    const b = urutkan(l.data, l.arah);
    [b[1], b[2]] = [b[2], b[1]];
    return b.join(" ");
  })();
  const hasil: string[] = [];
  for (const s of [lawan, asli, tukar]) if (s !== benar && !hasil.includes(s)) hasil.push(s);
  return hasil.slice(0, 2);
}

/** Tiga pilihan untuk tugas klik: jawaban benar tidak pernah di tombol pertama, dan jawaban tokoh (Cari kesalahan) selalu ikut. */
export function pilihanKlik(l: Langkah): string[] {
  const k = kunciJawab(l, "klik");
  if (!k) return [];
  const d = dasarDari(l);
  if (k.jenis === "nama") return d.tipe === "urut" ? sisipkan(k.nama, urutanKeliru(d), d.data[0] + d.ke) : [];
  const awal = l.tipe === "salah" ? angkaDariTeks(l.jawabTokoh) : undefined;
  const [a, b] = pengecoh(l, "klik", awal);
  return sisipkan(String(k.n), [String(a), String(b)], k.n);
}
/** Pilihan cadangan untuk tugas suara (kata atau bilangan dalam kata). */
export function pilihanSuara(l: Langkah, cara: Cara): string[] {
  const k = kunciJawab(l, cara);
  if (!k) return [];
  if (k.jenis === "angka") {
    const lain = pengecoh(l, cara).slice(0, 2);
    return sisipkan(kataBil(k.n), lain.map(kataBil), k.n);
  }
  const pasangan = k.nama === "terkecil" ? "terbesar" : k.nama === "terbesar" ? "terkecil" : k.nama === "sama" ? "berbeda" : "sama";
  return [pasangan, k.nama];
}
export const teksKunciPilihan = (k: Kunci): string => (k.jenis === "nama" ? k.nama : kataBil(k.n));
/** Teks pilihan klik yang benar (urutan atau bilangan). */
export function teksKunciKlik(l: Langkah): string | null {
  const k = kunciJawab(l, "klik");
  if (!k) return null;
  return k.jenis === "nama" ? k.nama : String(k.n);
}

/* ------------------------------ Kalimat ------------------------------ */
const sebut = (rupa: Rupa): string => (rupa === "lambang" ? "kartu" : "gambar");
const namaArah = (a: Arah): string => (a === "naik" ? "yang terkecil ke yang terbesar" : "yang terbesar ke yang terkecil");

export function kalimatKunci(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  const k = kunciJawab(d, cara);
  const n = k?.jenis === "angka" ? k.n : 0;
  switch (d.tipe) {
    case "urut":
      return cara === "klik" ? `Data diurutkan dari ${namaArah(d.arah)}: ${ucapkan(teksUrut(d.data, d.arah))}.` : `Setelah diurutkan dari ${namaArah(d.arah)}, bilangan ${ORDINAL[d.ke - 1]} adalah ${kataBil(n)}.`;
    case "ujung":
      return cara === "suara"
        ? d.cari === "kecil"
          ? "Kartu yang ditandai lebih kecil daripada semua data yang lain, jadi itu data terkecil."
          : "Kartu yang ditandai lebih besar daripada semua data yang lain, jadi itu data terbesar."
        : `Setelah diurutkan, data ${d.cari === "kecil" ? "terkecil ada di ujung kiri" : "terbesar ada di ujung kanan"}, yaitu ${kataBil(n)}.`;
    case "jangkau":
      return `Jangkauan sama dengan data terbesar dikurangi data terkecil, yaitu ${kataBil(terbesar(d.data))} dikurangi ${kataBil(terkecil(d.data))} sama dengan ${kataBil(n)}.`;
    case "garis":
      return cara === "kanvas"
        ? `Dari titik paling kiri di ${kataBil(terkecil(d.data))} sampai titik paling kanan di ${kataBil(terbesar(d.data))} ada ${kataBil(n)} petak loncatan, itulah jangkauannya.`
        : `Titik paling ${d.ujung} ada di bilangan ${kataBil(n)}, yaitu data ${d.ujung === "kiri" ? "terkecil" : "terbesar"}.`;
    case "cek":
      if (cara === "klik") return `Data terkecil ${kataBil(d.kecil)} ditambah jangkauan yang dicatat ${kataBil(d.klaim)} sama dengan ${kataBil(n)}.`;
      if (cara === "kanvas") return `Jangkauan yang sebenarnya adalah data terbesar dikurangi data terkecil: ${kataBil(d.besar)} dikurangi ${kataBil(d.kecil)} sama dengan ${kataBil(n)}.`;
      return d.kecil + d.klaim === d.besar ? "Hasilnya sama dengan data terbesar, jadi jangkauan yang dicatat benar." : "Hasilnya berbeda dari data terbesar, jadi jangkauan yang dicatat keliru dan harus dihitung ulang.";
    case "turus":
      return cara === "kanvas"
        ? `Satu bundel berisi lima garis, jadi ada ${kataBil(n)} bundel lima yang penuh.`
        : `${kapital(kataBil(bundel(d.banyak)))} bundel lima ditambah ${kataBil(sisaGaris(d.banyak))} garis: ${kataBil(bundel(d.banyak) * 5)} ditambah ${kataBil(sisaGaris(d.banyak))} sama dengan ${kataBil(d.banyak)}.`;
  }
}

/** Instruksi satu tugas (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const g = sebut(rupa);
  const aw = AWALAN[metode];
  const akhir = cara === "klik" ? "Pilih jawabannya." : cara === "kanvas" ? "Tulis satu angka di kanvas." : "Ucapkan bilangannya.";
  switch (l.tipe) {
    case "urut":
      return cara === "klik"
        ? `${aw}: lihat data pada ${g} ini. Urutkan data dari ${namaArah(l.arah)}. Pilih urutan yang benar.`
        : `${aw}: lihat data pada ${g} ini. Urutkan data dari ${namaArah(l.arah)}. Bilangan ${ORDINAL[l.ke - 1]} dalam urutan itu berapa? ${akhir}`;
    case "ujung":
      return cara === "suara"
        ? `${aw}: lihat data pada ${g} ini. Satu data diberi tanda. Apakah data yang ditandai itu data terkecil atau data terbesar? Ucapkan satu kata.`
        : `${aw}: lihat data pada ${g} ini. Berapa data ${l.cari === "kecil" ? "terkecil" : "terbesar"}? ${akhir}`;
    case "jangkau":
      return `${aw}: lihat data pada ${g} ini. Jangkauan adalah data terbesar dikurangi data terkecil. Berapa jangkauannya? ${akhir}`;
    case "garis":
      return cara === "kanvas"
        ? `${aw}: lihat garis urutan pada ${g} ini. Berapa petak loncatan dari titik paling kiri ke titik paling kanan? ${akhir}`
        : `${aw}: lihat garis urutan pada ${g} ini. Titik paling ${l.ujung} ada di bilangan berapa? ${akhir}`;
    case "cek":
      if (cara === "klik") return `${aw}: ${g} ini mencatat data terkecil, data terbesar, dan jangkauan. Tambahkan data terkecil dengan jangkauan yang dicatat. Berapa hasilnya? Pilih jawabannya.`;
      if (cara === "kanvas") return `${aw}: jangkauan yang dicatat pada ${g} ini belum tentu benar. Hitung jangkauan yang sebenarnya, yaitu data terbesar dikurangi data terkecil. Tulis satu angka di kanvas.`;
      return `${aw}: data terkecil ditambah jangkauan yang dicatat pada ${g} ini. Apakah hasilnya sama atau berbeda dengan data terbesar? Ucapkan satu kata.`;
    case "turus":
      return cara === "kanvas"
        ? `${aw}: lihat turus pada ${g} ini. Satu garis untuk satu data, dan garis kelima mencoret miring. Ada berapa bundel lima yang penuh? ${akhir}`
        : `${aw}: lihat turus pada ${g} ini. Satu garis untuk satu data, dan garis kelima mencoret miring. Berapa banyak datanya? ${akhir}`;
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "urut":
      return cara === "klik" ? "Urutan mana yang benar?" : `Bilangan ${ORDINAL[d.ke - 1]} berapa?`;
    case "ujung":
      return cara === "suara" ? "Terkecil atau terbesar?" : `Berapa data ${d.cari === "kecil" ? "terkecil" : "terbesar"}?`;
    case "jangkau":
      return "Berapa jangkauannya?";
    case "garis":
      return cara === "kanvas" ? "Berapa petak loncatannya?" : `Titik paling ${d.ujung} ada di bilangan berapa?`;
    case "cek":
      return cara === "klik" ? "Berapa hasil data terkecil ditambah jangkauan yang dicatat?" : cara === "kanvas" ? "Berapa jangkauan yang sebenarnya?" : "Sama atau berbeda dengan data terbesar?";
    case "turus":
      return cara === "kanvas" ? "Berapa bundel lima yang penuh?" : "Berapa banyak datanya?";
  }
}

/** Petunjuk saat jawaban salah: menunjuk kesalahannya (tanpa digit). `jawab`: kata atau bilangan yang dipilih atau diucapkan, atau angka yang ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number): string {
  if (l.tipe === "salah") {
    if (String(jawab) === l.jawabTokoh) return `Itu jawaban ${l.tokoh}${l.betul ? "" : " yang keliru"}. ${l.keliru}`;
    return petunjukSalah(l.dasar, cara, jawab);
  }
  switch (l.tipe) {
    case "urut":
      return cara === "klik"
        ? "Bandingkan semua bilangan, bukan hanya dua yang pertama. Mulailah dari ujung yang diminta, lalu lanjutkan sampai ujung satunya."
        : "Urutkan semua data lebih dulu, lalu hitung bilangan sesuai nomornya mulai dari ujung awal urutan.";
    case "ujung":
      return cara === "suara"
        ? "Setelah diurutkan, data terkecil ada di ujung kiri dan data terbesar di ujung kanan. Bandingkan kartu yang ditandai dengan semua data yang lain."
        : l.cari === "kecil"
          ? "Data terkecil ada di ujung kiri setelah diurutkan. Jangan hanya melihat data yang ditulis pertama, urutkan dulu."
          : "Data terbesar ada di ujung kanan setelah diurutkan. Bandingkan semua data, bukan hanya yang ditulis terakhir.";
    case "jangkau":
      return "Jangkauan adalah selisih, jadi data terbesar dikurangi data terkecil, bukan ditambah. Cari dulu kedua ujung data.";
    case "garis":
      return cara === "kanvas"
        ? "Hitung petak loncatan di antara kedua titik paling ujung, atau kurangkan data terbesar dengan data terkecil."
        : "Titik paling kiri adalah data terkecil dan titik paling kanan adalah data terbesar. Baca angka di bawah titiknya pada garis.";
    case "cek":
      return cara === "klik"
        ? "Tambahkan data terkecil dengan jangkauan yang dicatat, lalu pilih hasilnya."
        : cara === "kanvas"
          ? "Jangkauan yang sebenarnya adalah data terbesar dikurangi data terkecil."
          : "Bandingkan hasil data terkecil ditambah jangkauan dengan data terbesar. Bila sama ucapkan sama, bila tidak ucapkan berbeda.";
    case "turus":
      return cara === "kanvas"
        ? "Hitung hanya bundel yang penuh, yaitu empat garis tegak yang dicoret satu garis miring. Garis sisa tidak dihitung sebagai bundel."
        : "Satu bundel lima berisi lima garis: empat tegak dan satu miring. Hitung tiap bundel sebagai lima, lalu tambahkan garis sisanya.";
  }
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
/** Isi kartu kata untuk tahap Abstract (kata dan angka, tanpa emoji). */
export function barisKartu(l: LangkahDasar, cara?: Cara): string[] {
  switch (l.tipe) {
    case "urut":
      return [`data: ${l.data.join(", ")}`, `urutan: dari ${l.arah === "naik" ? "terkecil ke terbesar" : "terbesar ke terkecil"}`, cara === "klik" ? "urutan yang benar: ?" : `bilangan ${ORDINAL[l.ke - 1]}: ?`];
    case "ujung":
      return cara === "suara"
        ? [`data: ${l.data.join(", ")}`, `data yang ditandai: ${l.cari === "kecil" ? terkecil(l.data) : terbesar(l.data)}`, "kata: terkecil atau terbesar?"]
        : [`data: ${l.data.join(", ")}`, `cari data ${l.cari === "kecil" ? "terkecil" : "terbesar"}`, "jawaban: ?"];
    case "jangkau":
      return [`data: ${l.data.join(", ")}`, "jangkauan = data terbesar − data terkecil", "jangkauan: ?"];
    case "garis":
      return [`garis urutan: 0 sampai 9`, `titik pada garis: ${urutkan(l.data).join(", ")}`, cara === "kanvas" ? "petak loncatan kiri ke kanan: ?" : `titik paling ${l.ujung}: ?`];
    case "cek":
      return [
        `data terkecil: ${l.kecil}`,
        `data terbesar: ${l.besar}`,
        `jangkauan dicatat: ${l.klaim}`,
        cara === "klik" ? "terkecil + jangkauan dicatat = ?" : cara === "kanvas" ? "jangkauan sebenarnya: ?" : "hasilnya: sama atau berbeda?",
      ];
    case "turus":
      return [`benda: ${l.benda}`, cara === "kanvas" ? "bundel lima yang penuh: ?" : "banyak data: ?"];
  }
}
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);
