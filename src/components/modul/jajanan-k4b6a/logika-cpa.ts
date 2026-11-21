/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 6 Sub-Bab A "Piktogram Jajanan Bu Rini" (piktogram skala satu dan lebih dari satu):
 * jenis tugas, jawaban benar, pilihan, instruksi (tanpa digit), petunjuk salah, dan kartu data. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-jajanan-k4b6a.mjs.
 * Jawaban beragam: memilih (klik), menulis satu angka di kanvas, dan mengucapkan satu kata (rekam suara dengan pilihan ketuk). Jawaban benar dihitung dari data (logika-data.ts).
 * Empat metode tiap misi: IGIL "Hitung Ikon, Tabel ke Gambar, Urutkan dan Banding" (membaca keterangan dan menghitung ikon), Count the Icons (Hitung Ikon),
 * Table to Picture (Tabel ke Gambar), Rank and Compare (Urutkan dan Banding).
 */
import type { Cara } from "../lemari-k1b1a/logika";
import { ejaK4B6, kataBilK4B6 } from "../eja-k4b6";
import { banyakIkon, indeksMaks, indeksMin, jumlahData, jumlahIkon, namaDenganIkon, selisihData, selisihIkon, skalaTerbesar, type Pik } from "./logika-data";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";

export type Rupa = "benda" | "diagram" | "lambang";
export const kapital = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);

/** Nama bilangan dalam kata (tanpa digit). */
export const kataBil = (n: number): string => kataBilK4B6(n);
export const kata = kataBil;
/** Angka dan tanda menjadi ucapan tanpa digit: "4 ikon" menjadi "empat ikon". */
export const ucapkan = (t: string): string => ejaK4B6(t).replace(/\s+/g, " ").trim();

/* ------------------------------ Jenis tugas ------------------------------ */
/** Metode IGIL: membaca keterangan dan menghitung ikon. Klik = banyak yang diwakili satu ikon, kanvas = jumlah ikon seluruhnya, suara = nama baris yang punya `n` ikon. */
export type LIgil = { tipe: "igil"; p: Pik; n: number };
/** Count the Icons (Hitung Ikon): baris `i`. Klik = banyak data, kanvas = banyak data (satu digit), suara = nama baris yang datanya disebut. */
export type LHitung = { tipe: "hitung"; p: Pik; i: number };
/** Table to Picture (Tabel ke Gambar): data dari tabel digambar. Klik = keterangan terbesar yang habis membagi semua data, kanvas = banyak ikon baris `i`, suara = nama baris yang digambar dengan sekian ikon. */
export type LTabel = { tipe: "tabel"; p: Pik; i: number };
export type TanyaUrut = "terbanyak" | "tersedikit" | "selisih" | "jumlah";
/** Rank and Compare (Urutkan dan Banding): klik = menurut `tanya`, kanvas = selisih ikon baris `a` dan `b`, suara = nama baris terbanyak atau tersedikit. */
export type LUrut = { tipe: "urut"; p: Pik; a: number; b: number; tanya: TanyaUrut };
export type LangkahDasar = LIgil | LHitung | LTabel | LUrut;
/** Cari kesalahan: tokoh sudah menjawab dari `dasar` (klik). Anak menilai benar atau salah, memilih alasan, lalu menjawab sendiri. `jawabTokoh` adalah teks pilihan klik tokoh. */
export type LangkahSalah = {
  tipe: "salah";
  dasar: LHitung | LTabel | LUrut;
  tokoh: string;
  kataTokoh: string;
  jawabTokoh: string;
  alasan: [string, string, string];
  benar: number;
  keliru: string;
  betul?: boolean;
  /** Posisi alasan benar pada tampilan (0 sampai 2); bila kosong dihitung dari teks. */
  posisi?: number;
};
export type Langkah = LangkahDasar | LangkahSalah;
export type Metode = "igil" | "hitung" | "tabel" | "urut";
export const URUT_METODE: Metode[] = ["igil", "hitung", "tabel", "urut"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Hitung Ikon, Tabel ke Gambar, Urutkan dan Banding",
  hitung: "Count the Icons: Hitung Ikon",
  tabel: "Table to Picture: Tabel ke Gambar",
  urut: "Rank and Compare: Urutkan dan Banding",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F362}", hitung: "\u{1F522}", tabel: "\u{1F4CB}", urut: "\u{1F3C6}" };
const AWALAN: Record<Metode, string> = { igil: "Metode IGIL", hitung: "Count the Icons", tabel: "Table to Picture", urut: "Rank and Compare" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);

/* ------------------------------ Jawaban benar ------------------------------ */
export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: string };
const angka = (n: number): Kunci => ({ jenis: "angka", n });
const nama = (s: string): Kunci => ({ jenis: "nama", nama: s });
const teksBanyak = (p: Pik, n: number): string => `${n} ${p.satuan}`;

/** Jawaban benar tiap jenis tugas menurut caranya, dihitung dari data. */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  switch (l.tipe) {
    case "igil":
      return cara === "klik" ? nama(teksBanyak(l.p, l.p.skala)) : cara === "kanvas" ? angka(jumlahIkon(l.p)) : nama(namaDenganIkon(l.p, l.n));
    case "hitung":
      return cara === "kanvas" ? angka(l.p.seri[l.i].banyak) : cara === "klik" ? nama(teksBanyak(l.p, l.p.seri[l.i].banyak)) : nama(l.p.seri[l.i].nama);
    case "tabel":
      return cara === "klik" ? nama(teksBanyak(l.p, skalaTerbesar(l.p.seri.map((s) => s.banyak)))) : cara === "kanvas" ? angka(banyakIkon(l.p, l.i)) : nama(l.p.seri[l.i].nama);
    case "urut": {
      if (cara === "kanvas") return angka(selisihIkon(l.p, l.a, l.b));
      if (cara === "suara") return nama(l.p.seri[l.tanya === "tersedikit" ? indeksMin(l.p) : indeksMaks(l.p)].nama);
      switch (l.tanya) {
        case "terbanyak":
          return nama(l.p.seri[indeksMaks(l.p)].nama);
        case "tersedikit":
          return nama(l.p.seri[indeksMin(l.p)].nama);
        case "selisih":
          return nama(teksBanyak(l.p, selisihData(l.p, l.a, l.b)));
        case "jumlah":
          return nama(teksBanyak(l.p, jumlahData(l.p)));
      }
    }
  }
}

/** Apakah tugas langsung siap dijawab? Semua tugas punya jawaban, kecuali Cari kesalahan yang memakai kegiatan lebih dulu. */
export function siapLangsung(l: Langkah, rupa: Rupa, cara: Cara): boolean {
  void rupa;
  if (l.tipe === "salah") return false;
  return kunciJawab(l, cara) !== null;
}

/* ------------------------------ Pilihan ------------------------------ */
/** Sisipkan jawaban benar di tempat yang bukan pertama (deterministik). */
function sisipkan<T>(benar: T, lain: T[], geser: number): T[] {
  const p = 1 + (geser % lain.length);
  return [...lain.slice(0, p), benar, ...lain.slice(p)];
}
const unik = <T,>(daftar: T[]): T[] => daftar.filter((x, i, a) => a.indexOf(x) === i);

/** Dua pilihan lain berupa angka bersatuan: salah paham umum (hanya ikon, lebih atau kurang satu keterangan). */
function angkaPilihan(benar: number, kandidat: number[], p: Pik, geser: number): string[] {
  const lain = unik(kandidat.filter((x) => x > 0 && x !== benar)).slice(0, 2);
  return sisipkan(teksBanyak(p, benar), lain.map((x) => teksBanyak(p, x)), geser);
}
const namaLain = (p: Pik, benar: string): string[] => p.seri.map((s) => s.nama).filter((n) => n !== benar).slice(0, 2);

/** Pilihan untuk tugas klik: jawaban benar tidak pernah di tombol pertama, dan jawaban tokoh (Cari kesalahan) selalu ikut. */
export function pilihanKlik(l: Langkah): string[] {
  const k = kunciJawab(l, "klik");
  if (!k || k.jenis !== "nama") return [];
  const d = dasarDari(l);
  let hasil: string[];
  switch (d.tipe) {
    case "igil":
      hasil = sisipkan(k.nama, [2, 5, 10, 1].filter((s) => s !== d.p.skala).slice(0, 2).map((s) => teksBanyak(d.p, s)), d.p.seri.length + d.p.skala);
      break;
    case "hitung": {
      const n = d.p.seri[d.i].banyak;
      hasil = angkaPilihan(n, [n / d.p.skala, n + d.p.skala, n - d.p.skala, n + 2 * d.p.skala], d.p, d.i + d.p.skala);
      break;
    }
    case "tabel": {
      const s = skalaTerbesar(d.p.seri.map((x) => x.banyak));
      hasil = sisipkan(k.nama, [10, 5, 2, 1].filter((x) => x !== s).slice(0, 2).map((x) => teksBanyak(d.p, x)), d.p.seri.length + s);
      break;
    }
    case "urut":
      if (d.tanya === "terbanyak" || d.tanya === "tersedikit") hasil = sisipkan(k.nama, namaLain(d.p, k.nama), d.a + d.b + d.p.skala);
      else if (d.tanya === "selisih") {
        const n = selisihData(d.p, d.a, d.b);
        hasil = angkaPilihan(n, [selisihIkon(d.p, d.a, d.b), n + d.p.skala, n - d.p.skala, n + 2 * d.p.skala], d.p, d.a + d.b);
      } else {
        const n = jumlahData(d.p);
        hasil = angkaPilihan(n, [jumlahIkon(d.p), n + d.p.skala, n - d.p.skala, n + 2 * d.p.skala], d.p, d.p.seri.length);
      }
      break;
  }
  if (l.tipe === "salah" && !hasil.includes(l.jawabTokoh)) {
    const ganti = hasil.map((x, i) => (x !== k.nama ? i : -1)).filter((i) => i >= 0).pop() ?? -1;
    hasil = hasil.map((x, i) => (i === ganti ? l.jawabTokoh : x));
  }
  return hasil;
}
/** Pilihan cadangan untuk tugas suara (nama baris). Jawaban benar tidak pernah di tempat pertama. */
export function pilihanSuara(l: Langkah, cara: Cara): string[] {
  if (cara !== "suara") return [];
  const k = kunciJawab(l, cara);
  if (!k || k.jenis !== "nama") return [];
  const d = dasarDari(l);
  return sisipkan(k.nama, namaLain(d.p, k.nama), d.p.seri.length + k.nama.length);
}
export const teksKunciPilihan = (k: Kunci): string => (k.jenis === "nama" ? k.nama : kataBil(k.n));
/** Teks pilihan klik yang benar. */
export function teksKunciKlik(l: Langkah): string | null {
  const k = kunciJawab(l, "klik");
  return k && k.jenis === "nama" ? k.nama : null;
}

/* ------------------------------ Kalimat ------------------------------ */
const sebut = (rupa: Rupa): string => (rupa === "lambang" ? "kartu" : rupa === "diagram" ? "diagram" : "papan data");
const barisNama = (p: Pik, i: number): string => p.seri[i].nama;

/** Kalimat pembenaran setelah jawaban benar (diawali huruf kapital, tanpa menyebut gambar, kisi, atau kotak). */
export function kalimatKunci(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "igil":
      return cara === "klik" ? `Satu ikon mewakili ${d.p.skala} ${d.p.satuan}.` : cara === "kanvas" ? `Ikon seluruhnya ada ${jumlahIkon(d.p)}.` : `Baris dengan ${d.n} ikon adalah ${namaDenganIkon(d.p, d.n)}.`;
    case "hitung": {
      const s = d.p.seri[d.i];
      const n = banyakIkon(d.p, d.i);
      return cara === "suara" ? `Yang terjual ${s.banyak} ${d.p.satuan} adalah ${s.nama}, karena ${n} kali ${d.p.skala} sama dengan ${s.banyak}.` : `${kapital(s.nama)} punya ${n} ikon, dan ${n} kali ${d.p.skala} sama dengan ${s.banyak} ${d.p.satuan}.`;
    }
    case "tabel": {
      const s = d.p.seri[d.i];
      const n = banyakIkon(d.p, d.i);
      if (cara === "klik") return `Satu ikon sama dengan ${skalaTerbesar(d.p.seri.map((x) => x.banyak))} ${d.p.satuan}: semua data habis dibagi dan ikonnya paling sedikit.`;
      return cara === "kanvas" ? `Untuk ${s.nama}, ${s.banyak} dibagi ${d.p.skala} sama dengan ${n} ikon.` : `Banyak data ${s.nama} dibagi ${d.p.skala} sama dengan ${n} ikon.`;
    }
    case "urut": {
      const mx = barisNama(d.p, indeksMaks(d.p));
      const mn = barisNama(d.p, indeksMin(d.p));
      if (cara === "kanvas") return `Selisihnya ${selisihIkon(d.p, d.a, d.b)} ikon.`;
      if (cara === "suara" ? d.tanya !== "tersedikit" : d.tanya === "terbanyak") return `${kapital(mx)} punya ikon paling banyak, jadi datanya paling banyak.`;
      if (cara === "suara" || d.tanya === "tersedikit") return `${kapital(mn)} punya ikon paling sedikit, jadi datanya paling sedikit.`;
      if (d.tanya === "selisih") return `Selisihnya ${selisihIkon(d.p, d.a, d.b)} ikon, dan ${selisihIkon(d.p, d.a, d.b)} kali ${d.p.skala} sama dengan ${selisihData(d.p, d.a, d.b)} ${d.p.satuan}.`;
      return `Jumlah ikon ${jumlahIkon(d.p)}, dan ${jumlahIkon(d.p)} kali ${d.p.skala} sama dengan ${jumlahData(d.p)} ${d.p.satuan}.`;
    }
  }
}

/** Instruksi satu tugas (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const g = sebut(rupa);
  const aw = AWALAN[metode];
  const tulis = "Tulis satu angka di kanvas.";
  switch (l.tipe) {
    case "igil":
      return cara === "klik"
        ? `${aw}: lihat ${g} ini. Setiap ikon mewakili banyak yang sama. Baca keterangannya, lalu pilih berapa ${l.p.satuan} yang diwakili satu ikon.`
        : cara === "kanvas"
          ? `${aw}: lihat ${g} ini. Berapa ikon seluruhnya pada semua baris? ${tulis}`
          : `${aw}: lihat ${g} ini. Baris mana yang punya ${kata(l.n)} ikon? Ucapkan namanya.`;
    case "hitung":
      return cara === "klik"
        ? `${aw}: lihat ${g} ini. Hitung ikon ${barisNama(l.p, l.i)}, lalu kalikan dengan keterangan. Berapa ${l.p.satuan} yang tercatat? Pilih jawabannya.`
        : cara === "kanvas"
          ? `${aw}: lihat ${g} ini. Berapa ${l.p.satuan} yang tercatat untuk ${barisNama(l.p, l.i)}? ${tulis}`
          : `${aw}: lihat ${g} ini. Satu baris mencatat ${kata(l.p.seri[l.i].banyak)} ${l.p.satuan}. Baris mana itu? Ucapkan namanya.`;
    case "tabel":
      return cara === "klik"
        ? `${aw}: lihat ${g} ini. Data akan dituliskan dengan ikon. Pilih banyak ${l.p.satuan} yang diwakili satu ikon, yang paling besar dan membuat semua data habis dibagi.`
        : cara === "kanvas"
          ? `${aw}: lihat ${g} ini. Satu ikon mewakili ${kata(l.p.skala)} ${l.p.satuan}. Berapa ikon untuk ${barisNama(l.p, l.i)}? ${tulis}`
          : `${aw}: lihat ${g} ini. Satu ikon mewakili ${kata(l.p.skala)} ${l.p.satuan}. Baris mana yang memerlukan ${kata(banyakIkon(l.p, l.i))} ikon? Ucapkan namanya.`;
    case "urut":
      if (cara === "kanvas") return `${aw}: lihat ${g} ini. Berapa selisih ikon ${barisNama(l.p, l.a)} dan ${barisNama(l.p, l.b)}? ${tulis}`;
      if (cara === "suara") return `${aw}: lihat ${g} ini. Baris mana yang punya ikon ${l.tanya === "tersedikit" ? "paling sedikit" : "paling banyak"}? Ucapkan namanya.`;
      return l.tanya === "terbanyak"
        ? `${aw}: lihat ${g} ini. Pilih baris yang punya ikon paling banyak.`
        : l.tanya === "tersedikit"
          ? `${aw}: lihat ${g} ini. Pilih baris yang punya ikon paling sedikit.`
          : l.tanya === "selisih"
            ? `${aw}: lihat ${g} ini. Berapa selisih ${barisNama(l.p, l.a)} dan ${barisNama(l.p, l.b)}, dalam ${l.p.satuan}? Pilih jawabannya.`
            : `${aw}: lihat ${g} ini. Berapa ${l.p.satuan} seluruhnya? Pilih jawabannya.`;
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "igil":
      return cara === "klik" ? "Satu ikon mewakili berapa?" : cara === "kanvas" ? "Berapa ikon seluruhnya?" : `Baris mana yang punya ${kata(d.n)} ikon?`;
    case "hitung":
      return cara === "suara" ? "Baris mana itu?" : `Berapa ${d.p.satuan} ${barisNama(d.p, d.i)}?`;
    case "tabel":
      return cara === "klik" ? "Satu ikon mewakili berapa?" : cara === "kanvas" ? `Berapa ikon untuk ${barisNama(d.p, d.i)}?` : "Baris mana yang memerlukan ikon sebanyak itu?";
    case "urut":
      return cara === "kanvas" ? "Berapa selisih ikonnya?" : cara === "suara" || d.tanya === "terbanyak" || d.tanya === "tersedikit" ? "Baris mana yang dimaksud?" : d.tanya === "selisih" ? "Berapa selisihnya?" : "Berapa jumlahnya?";
  }
}

/** Petunjuk saat jawaban salah: menunjuk kesalahannya tanpa menyebut jawaban (tanpa digit, tanpa menyebut gambar atau kisi). `jawab`: pilihan atau kata yang diucapkan, atau angka yang ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number): string {
  if (l.tipe === "salah") {
    if (String(jawab) === l.jawabTokoh) return `Itu jawaban ${l.tokoh}${l.betul ? "" : " yang keliru"}. ${l.keliru}`;
    return petunjukSalah(l.dasar, cara, jawab);
  }
  switch (l.tipe) {
    case "igil":
      return cara === "klik"
        ? "Baca keterangan lebih dulu: ia memberi tahu berapa banyak yang diwakili satu ikon."
        : cara === "kanvas"
          ? "Hitung ikon pada tiap baris satu per satu, lalu jumlahkan semuanya."
          : "Hitung ikon pada tiap baris, lalu cari baris yang banyak ikonnya cocok.";
    case "hitung":
      return cara === "klik" || cara === "kanvas"
        ? "Hitung ikon pada baris itu, lalu kalikan dengan banyak yang diwakili satu ikon."
        : "Hitung ikon tiap baris dan kalikan dengan keterangan, lalu cari yang hasilnya cocok.";
    case "tabel":
      return cara === "klik"
        ? "Coba bagi tiap data dengan pilihan itu: semua data harus habis dibagi, dan pilih yang paling besar."
        : cara === "kanvas"
          ? "Bagi banyak data baris itu dengan banyak yang diwakili satu ikon."
          : "Bagi banyak data tiap baris dengan keterangan, lalu cari yang hasilnya cocok.";
    case "urut":
      return cara === "kanvas"
        ? "Hitung ikon kedua baris itu, lalu kurangkan yang banyak dengan yang sedikit."
        : cara === "suara" || l.tanya === "terbanyak" || l.tanya === "tersedikit"
          ? "Bandingkan banyak ikon tiap baris dengan teliti, karena keterangannya sama untuk semua baris."
          : l.tanya === "selisih"
            ? "Kurangkan ikon kedua baris dulu, lalu kalikan dengan banyak yang diwakili satu ikon."
            : "Jumlahkan semua ikon dulu, lalu kalikan dengan banyak yang diwakili satu ikon.";
  }
}

/* ------------------------------ Kartu data (Abstract) ------------------------------ */
const ket = (p: Pik, tanya = false): string => `keterangan: 1 ikon = ${tanya ? "?" : p.skala} ${p.satuan}`;
const baIkon = (p: Pik): string[] => p.seri.map((s, i) => `${s.nama}: ${banyakIkon(p, i)} ikon`);
const baData = (p: Pik): string[] => p.seri.map((s) => `${s.nama}: ${s.banyak} ${p.satuan}`);

/** Isi kartu data untuk tahap Abstract (kata dan angka, tanpa emoji dan tanpa gambar). */
export function barisKartu(l: LangkahDasar, cara?: Cara): string[] {
  switch (l.tipe) {
    case "igil":
      return cara === "kanvas"
        ? [...baIkon(l.p), "ikon seluruhnya: ?"]
        : cara === "suara"
          ? [...baIkon(l.p), `baris dengan ${l.n} ikon: ?`]
          : [`${l.p.seri[0].nama}: ${banyakIkon(l.p, 0)} ikon`, `${l.p.seri[0].nama}: ${l.p.seri[0].banyak} ${l.p.satuan}`, ket(l.p, true)];
    case "hitung":
      return cara === "suara"
        ? [ket(l.p), ...baIkon(l.p), `terjual ${l.p.seri[l.i].banyak} ${l.p.satuan}: ?`]
        : [ket(l.p), `${l.p.seri[l.i].nama}: ${banyakIkon(l.p, l.i)} ikon`, `${l.p.seri[l.i].nama}: ? ${l.p.satuan}`];
    case "tabel":
      return cara === "klik"
        ? [...baData(l.p), ket(l.p, true)]
        : cara === "kanvas"
          ? [ket(l.p), ...baData(l.p), `ikon ${l.p.seri[l.i].nama}: ?`]
          : [ket(l.p), ...baData(l.p), `${banyakIkon(l.p, l.i)} ikon: ?`];
    case "urut":
      if (cara === "kanvas") return [`${l.p.seri[l.a].nama}: ${banyakIkon(l.p, l.a)} ikon`, `${l.p.seri[l.b].nama}: ${banyakIkon(l.p, l.b)} ikon`, "selisih ikon: ?"];
      if (cara === "suara") return [ket(l.p), ...baIkon(l.p), `ikon ${l.tanya === "tersedikit" ? "paling sedikit" : "paling banyak"}: ?`];
      return l.tanya === "terbanyak"
        ? [ket(l.p), ...baIkon(l.p), "ikon paling banyak: ?"]
        : l.tanya === "tersedikit"
          ? [ket(l.p), ...baIkon(l.p), "ikon paling sedikit: ?"]
          : l.tanya === "selisih"
            ? [ket(l.p), `${l.p.seri[l.a].nama}: ${banyakIkon(l.p, l.a)} ikon`, `${l.p.seri[l.b].nama}: ${banyakIkon(l.p, l.b)} ikon`, `selisih ${l.p.satuan}: ?`]
            : [ket(l.p), ...baIkon(l.p), `jumlah ${l.p.satuan}: ?`];
  }
}
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);
