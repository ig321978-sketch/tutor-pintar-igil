/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract K4 Bab 1 Sub-Bab C "Papan Dermaga Kak Tiara" (membandingkan dan mengurutkan bilangan sampai sepuluh ribu: dari kiri, tanda, garis bilangan, urutan kartu):
 * jenis tugas, jawaban benar, pilihan, instruksi (tanpa digit), dan petunjuk salah. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-dermaga-k4b1c.mjs.
 * Jawaban beragam: memilih tanda, tempat angka, bilangan, atau urutan (klik), menulis satu angka di kanvas, dan mengucapkan satu kata (kurang dari, lebih dari, ribuan, kiri, terkecil, dan sebagainya).
 * Jawaban benar dihitung dari data. Empat metode tiap misi: IGIL "Banding dari Kiri, Garis Bilangan, Urut Kartu", Left-to-Right Compare (Banding dari Kiri), Number Line (Garis Bilangan), Card Sort (Urut Kartu).
 */
import type { Cara } from "../lemari-k1b1a/logika";
import { ejaK4B1, kataBilK4B1 } from "../eja-k4b1";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";

export type Rupa = "benda" | "diagram" | "lambang";
const kapital = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);

/* ------------------------------ Bilangan dan kata ------------------------------ */
/** Nama bilangan 0 sampai 10.000 dalam kata (tanpa digit): seribu, empat ribu tiga ratus lima puluh delapan. */
export const kataBil = (n: number): string => kataBilK4B1(n);
export const kata = kataBil;
/** Bilangan dengan titik ribuan: 4358 menjadi "4.358". */
export const rb = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
/** Ubah teks berangka menjadi ucapan tanpa digit: "3.248, 3.482" menjadi kata, tanda tunggal "<" menjadi "kurang dari". */
export function ucapkan(t: string): string {
  const s = t.trim();
  if (s === "<") return "kurang dari";
  if (s === ">") return "lebih dari";
  if (s === "=") return "sama dengan";
  return ejaK4B1(s).replace(/\s+/g, " ").trim();
}
export const ORDINAL = ["pertama", "kedua", "ketiga", "keempat"] as const;

/* ------------------------------ Data ------------------------------ */
export type Arah = "naik" | "turun";
export type Ujung = "kecil" | "besar";
export type Tempat = "ribuan" | "ratusan" | "puluhan" | "satuan";
export const NAMA_TEMPAT: readonly Tempat[] = ["ribuan", "ratusan", "puluhan", "satuan"];
export type Tanda = "<" | ">" | "=";
export const NAMA_TANDA: Record<Tanda, string> = { "<": "kurang dari", ">": "lebih dari", "=": "sama dengan" };
/** Empat angka bilangan dari kiri: 4358 menjadi [4, 3, 5, 8]. */
export const angkaTempat = (n: number): number[] => String(n).padStart(4, "0").split("").map(Number);
/** Tempat (0 ribuan sampai 3 satuan) tempat angka berbeda pertama dari kiri, atau -1 bila sama. */
export const bedaPertama = (a: number, b: number): number => {
  const x = angkaTempat(a);
  const y = angkaTempat(b);
  return x.findIndex((v, i) => v !== y[i]);
};
export const tandaDari = (a: number, b: number): Tanda => (a < b ? "<" : a > b ? ">" : "=");
export const urutkan = (d: readonly number[], arah: Arah = "naik"): number[] => [...d].sort((a, b) => (arah === "naik" ? a - b : b - a));
export const teksUrut = (d: readonly number[], arah: Arah): string => urutkan(d, arah).map(rb).join(", ");
export const terkecil = (d: readonly number[]): number => Math.min(...d);
export const terbesar = (d: readonly number[]): number => Math.max(...d);
export const digitTempat = (n: number, t: Tempat): number => angkaTempat(n)[NAMA_TEMPAT.indexOf(t)];

/* ------------------------------ Jenis tugas ------------------------------ */
/** Metode IGIL: membandingkan dua bilangan empat angka (klik: tanda, kanvas: tempat ke berapa angka berbeda pertama, suara: kurang dari atau lebih dari). */
export type LBanding = { tipe: "banding"; benda: string; a: number; b: number };
/** Left-to-Right Compare: tempat angka berbeda pertama dari kiri (klik dan suara: nama tempat, kanvas: angkanya pada bilangan yang lebih besar). */
export type LKiri = { tipe: "kiri"; benda: string; a: number; b: number };
/** Number Line: dua titik pada garis bilangan sebelas tanda (dari `mulai`, tiap petak `langkah`) (klik: bilangan yang lebih besar atau kecil, kanvas: banyak petak di antara titik, suara: titik A di kiri atau kanan titik B). */
export type LGaris = { tipe: "garis"; benda: string; mulai: number; langkah: number; a: number; b: number; cari: Ujung };
/** Card Sort: kartu bilangan (klik: urutan, kanvas: angka di tempat tertentu pada bilangan terkecil atau terbesar, suara: kartu yang ditandai terkecil atau terbesar). */
export type LKartu = { tipe: "kartu"; benda: string; data: number[]; arah: Arah; cari: Ujung; tempat: Tempat };
export type LangkahDasar = LBanding | LKiri | LGaris | LKartu;
/** Cari kesalahan: tokoh sudah menjawab dari `dasar`. Anak menilai benar atau salah, memilih alasan, lalu menjawab sendiri. `jawabTokoh` memakai teks pilihan klik ("<", "puluhan", "3.248, 3.482"). */
export type LangkahSalah = {
  tipe: "salah";
  dasar: LBanding | LKiri | LKartu;
  tokoh: string;
  kataTokoh: string;
  jawabTokoh: string;
  alasan: [string, string, string];
  benar: number;
  keliru: string;
  betul?: boolean;
};
export type Langkah = LangkahDasar | LangkahSalah;
export type Metode = "igil" | "kiri" | "garis" | "kartu";
export const URUT_METODE: Metode[] = ["igil", "kiri", "garis", "kartu"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Banding dari Kiri, Garis Bilangan, Urut Kartu",
  kiri: "Left-to-Right Compare: Banding dari Kiri",
  garis: "Number Line: Garis Bilangan",
  kartu: "Card Sort: Urut Kartu",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F522}", kiri: "\u{1F448}", garis: "\u{1F4CF}", kartu: "\u{1F0CF}" };
const AWALAN: Record<Metode, string> = { igil: "Metode IGIL", kiri: "Left-to-Right Compare", garis: "Number Line", kartu: "Card Sort" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);

/** Letak titik pada garis (tanda ke-berapa, 0 sampai 10) dihitung dari data. */
export const tandaGaris = (l: LGaris, n: number): number => (n - l.mulai) / l.langkah;
/** Banyak petak loncatan antara dua titik pada garis. */
export const petakAntara = (l: LGaris): number => Math.abs(l.b - l.a) / l.langkah;
/** Bilangan ketiga untuk pilihan klik garis: di luar kedua titik. */
const pengecohGaris = (l: LGaris): number => (l.cari === "besar" ? Math.max(l.a, l.b) + l.langkah : Math.min(l.a, l.b) - l.langkah);

/* ------------------------------ Jawaban benar ------------------------------ */
export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: string };
const angka = (n: number): Kunci => ({ jenis: "angka", n });
const nama = (s: string): Kunci => ({ jenis: "nama", nama: s });

/** Jawaban benar tiap jenis tugas menurut caranya, dihitung dari data. */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  switch (l.tipe) {
    case "banding":
      return cara === "klik" ? nama(tandaDari(l.a, l.b)) : cara === "kanvas" ? angka(bedaPertama(l.a, l.b) + 1) : nama(NAMA_TANDA[tandaDari(l.a, l.b)]);
    case "kiri": {
      const i = bedaPertama(l.a, l.b);
      return cara === "kanvas" ? angka(angkaTempat(Math.max(l.a, l.b))[i]) : nama(NAMA_TEMPAT[i]);
    }
    case "garis":
      return cara === "klik" ? nama(rb(l.cari === "besar" ? Math.max(l.a, l.b) : Math.min(l.a, l.b))) : cara === "kanvas" ? angka(petakAntara(l)) : nama(l.a < l.b ? "kiri" : "kanan");
    case "kartu":
      return cara === "klik" ? nama(teksUrut(l.data, l.arah)) : cara === "kanvas" ? angka(digitTempat(l.cari === "kecil" ? terkecil(l.data) : terbesar(l.data), l.tempat)) : nama(l.cari === "kecil" ? "terkecil" : "terbesar");
  }
}

/** Apakah tugas langsung siap dijawab? Semua tugas punya jawaban, kecuali Cari kesalahan yang memakai kegiatan lebih dulu. Tidak bergantung pada rupa. */
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
/** Dua urutan keliru untuk pilihan klik tugas kartu: arah kebalikan, urutan asli (belum diurutkan), atau dua bilangan bertukar. */
function urutanKeliru(l: LKartu): string[] {
  const benar = teksUrut(l.data, l.arah);
  const lawan = teksUrut(l.data, l.arah === "naik" ? "turun" : "naik");
  const asli = l.data.map(rb).join(", ");
  const tukar = (() => {
    const b = urutkan(l.data, l.arah);
    [b[1], b[2]] = [b[2], b[1]];
    return b.map(rb).join(", ");
  })();
  const hasil: string[] = [];
  for (const s of [lawan, asli, tukar]) if (s !== benar && !hasil.includes(s)) hasil.push(s);
  return hasil.slice(0, 2);
}

/** Tiga pilihan untuk tugas klik: jawaban benar tidak pernah di tombol pertama, dan jawaban tokoh (Cari kesalahan) selalu ikut. */
export function pilihanKlik(l: Langkah): string[] {
  const k = kunciJawab(l, "klik");
  if (!k || k.jenis !== "nama") return [];
  const d = dasarDari(l);
  let pil: string[];
  switch (d.tipe) {
    case "banding":
      /* Tiga tanda: urutan tetap menurut jawaban benar, yang benar di tempat kedua atau ketiga. */
      pil = k.nama === "<" ? [">", "=", "<"] : k.nama === ">" ? ["<", ">", "="] : [">", "=", "<"];
      break;
    case "kiri": {
      const lain = NAMA_TEMPAT.filter((t) => t !== k.nama).slice(-2);
      pil = sisipkan(k.nama, [...lain], k.nama.length);
      break;
    }
    case "garis": {
      const lain = d.cari === "besar" ? [Math.min(d.a, d.b), pengecohGaris(d)] : [Math.max(d.a, d.b), pengecohGaris(d)];
      pil = sisipkan(k.nama, lain.map(rb), d.a + d.b);
      break;
    }
    case "kartu":
      pil = sisipkan(k.nama, urutanKeliru(d), d.data[0] + d.data[1]);
      break;
  }
  if (l.tipe === "salah" && !pil.includes(l.jawabTokoh)) {
    const ganti = pil.findIndex((x) => x !== k.nama);
    pil = pil.map((x, q) => (q === ganti ? l.jawabTokoh : x));
  }
  return pil;
}
/** Pilihan cadangan untuk tugas suara (kata): dua kata, atau tiga nama tempat angka. */
export function pilihanSuara(l: Langkah, cara: Cara): string[] {
  const k = kunciJawab(l, cara);
  if (!k || k.jenis !== "nama") return [];
  const d = dasarDari(l);
  if (d.tipe === "kiri") {
    const lain = NAMA_TEMPAT.filter((t) => t !== k.nama).slice(-2);
    return sisipkan(k.nama, [...lain], k.nama.length);
  }
  /* Membandingkan dua bilangan: tiga kata (kurang dari, sama dengan, lebih dari), jawaban benar tidak di tempat pertama. */
  if (d.tipe === "banding") return k.nama === "kurang dari" ? ["lebih dari", "kurang dari", "sama dengan"] : k.nama === "lebih dari" ? ["kurang dari", "lebih dari", "sama dengan"] : ["lebih dari", "sama dengan", "kurang dari"];
  const pasangan = k.nama === "kurang dari" ? "lebih dari" : k.nama === "lebih dari" ? "kurang dari" : k.nama === "sama dengan" ? "lebih dari" : k.nama === "kiri" ? "kanan" : k.nama === "kanan" ? "kiri" : k.nama === "terkecil" ? "terbesar" : "terkecil";
  return [pasangan, k.nama];
}
export const teksKunciPilihan = (k: Kunci): string => (k.jenis === "nama" ? k.nama : kataBil(k.n));
/** Teks pilihan klik yang benar (tanda, tempat, bilangan, atau urutan). */
export function teksKunciKlik(l: Langkah): string | null {
  const k = kunciJawab(l, "klik");
  if (!k) return null;
  return k.jenis === "nama" ? k.nama : String(k.n);
}

/* ------------------------------ Kalimat ------------------------------ */
const sebut = (rupa: Rupa): string => (rupa === "lambang" ? "kartu" : "gambar");
const namaArah = (a: Arah): string => (a === "naik" ? "yang terkecil ke yang terbesar" : "yang terbesar ke yang terkecil");
const sebutUjung = (u: Ujung): string => (u === "kecil" ? "terkecil" : "terbesar");

export function kalimatKunci(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  const k = kunciJawab(d, cara);
  const n = k?.jenis === "angka" ? k.n : 0;
  switch (d.tipe) {
    case "banding": {
      const i = bedaPertama(d.a, d.b);
      if (i < 0) return "Ribuan, ratusan, puluhan, dan satuan semuanya sama, jadi kedua bilangan sama besar dan tandanya sama dengan.";
      const x = angkaTempat(d.a)[i];
      const y = angkaTempat(d.b)[i];
      const dasar = `Dari kiri, angka berbeda pertama ada di tempat ${NAMA_TEMPAT[i]}: ${kataBil(x)} dan ${kataBil(y)}.`;
      return cara === "kanvas" ? `${dasar} Itu tempat ${ORDINAL[i]} dari kiri.` : `${dasar} Jadi bilangan pertama ${NAMA_TANDA[tandaDari(d.a, d.b)]} bilangan kedua.`;
    }
    case "kiri": {
      const i = bedaPertama(d.a, d.b);
      return cara === "kanvas"
        ? `Angka berbeda pertama ada di tempat ${NAMA_TEMPAT[i]}. Pada bilangan yang lebih besar, angkanya ${kataBil(n)}.`
        : `Ribuan, ratusan, dan seterusnya dibandingkan dari kiri. Angka berbeda pertama ada di tempat ${NAMA_TEMPAT[i]}.`;
    }
    case "garis":
      return cara === "kanvas"
        ? `Dari titik pertama ke titik kedua ada ${kataBil(n)} petak loncatan.`
        : cara === "klik"
          ? `Bilangan yang lebih ${d.cari === "besar" ? "besar" : "kecil"} ada di titik yang lebih ke ${d.cari === "besar" ? "kanan" : "kiri"}, yaitu ${kataBil(d.cari === "besar" ? Math.max(d.a, d.b) : Math.min(d.a, d.b))}.`
          : `Titik A ada di sebelah ${d.a < d.b ? "kiri" : "kanan"} titik B, karena bilangan di titik A ${d.a < d.b ? "lebih kecil" : "lebih besar"}.`;
    case "kartu":
      return cara === "klik"
        ? `Kartu diurutkan dari ${namaArah(d.arah)}: ${ucapkan(teksUrut(d.data, d.arah))}.`
        : cara === "kanvas"
          ? `Bilangan ${sebutUjung(d.cari)} adalah ${kataBil(d.cari === "kecil" ? terkecil(d.data) : terbesar(d.data))}. Angka di tempat ${d.tempat} adalah ${kataBil(n)}.`
          : d.cari === "kecil"
            ? "Kartu yang ditandai lebih kecil daripada semua kartu yang lain, jadi itu bilangan terkecil."
            : "Kartu yang ditandai lebih besar daripada semua kartu yang lain, jadi itu bilangan terbesar.";
  }
}

/** Instruksi satu tugas (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const g = sebut(rupa);
  const aw = AWALAN[metode];
  switch (l.tipe) {
    case "banding":
      return cara === "klik"
        ? `${aw}: lihat dua bilangan pada ${g} ini. Bandingkan dari tempat paling kiri. Pilih tanda yang tepat untuk bilangan pertama dan bilangan kedua.`
        : cara === "kanvas"
          ? `${aw}: lihat dua bilangan pada ${g} ini. Bandingkan dari kiri. Angka berbeda pertama ada di tempat ke berapa dari kiri? Tulis satu angka di kanvas.`
          : `${aw}: lihat dua bilangan pada ${g} ini. Apakah bilangan pertama kurang dari, sama dengan, atau lebih dari bilangan kedua? Ucapkan jawabannya.`;
    case "kiri":
      return cara === "kanvas"
        ? `${aw}: lihat dua bilangan pada ${g} ini. Mulai dari tempat paling kiri. Angka berbeda pertama pada bilangan yang lebih besar adalah angka berapa? Tulis satu angka di kanvas.`
        : `${aw}: lihat dua bilangan pada ${g} ini. Mulai dari tempat paling kiri. Angka berbeda pertama ada di tempat apa? ${cara === "klik" ? "Pilih jawabannya." : "Ucapkan nama tempatnya."}`;
    case "garis":
      return cara === "klik"
        ? `${aw}: lihat garis bilangan pada ${g} ini. Dua bilangan ditandai pada garis. Pilih bilangan yang lebih ${l.cari === "besar" ? "besar" : "kecil"}.`
        : cara === "kanvas"
          ? `${aw}: lihat garis bilangan pada ${g} ini. Ada berapa petak loncatan dari titik pertama ke titik kedua? Tulis satu angka di kanvas.`
          : `${aw}: lihat garis bilangan pada ${g} ini. Titik A ada di sebelah kiri atau di sebelah kanan titik B? Ucapkan satu kata.`;
    case "kartu":
      return cara === "klik"
        ? `${aw}: lihat kartu bilangan pada ${g} ini. Urutkan kartu dari ${namaArah(l.arah)}. Pilih urutan yang benar.`
        : cara === "kanvas"
          ? `${aw}: lihat kartu bilangan pada ${g} ini. Cari bilangan ${sebutUjung(l.cari)}. Angka di tempat ${l.tempat} pada bilangan itu adalah angka berapa? Tulis satu angka di kanvas.`
          : `${aw}: lihat kartu bilangan pada ${g} ini. Satu kartu diberi tanda. Apakah bilangan pada kartu yang ditandai itu terkecil atau terbesar? Ucapkan satu kata.`;
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "banding":
      return cara === "klik" ? "Tanda mana yang tepat?" : cara === "kanvas" ? "Angka berbeda pertama di tempat ke berapa dari kiri?" : "Kurang dari, sama dengan, atau lebih dari?";
    case "kiri":
      return cara === "kanvas" ? "Angka berbeda pertama pada bilangan yang lebih besar adalah berapa?" : "Angka berbeda pertama ada di tempat apa?";
    case "garis":
      return cara === "klik" ? `Bilangan mana yang lebih ${d.cari === "besar" ? "besar" : "kecil"}?` : cara === "kanvas" ? "Berapa petak loncatannya?" : "Titik A di kiri atau kanan titik B?";
    case "kartu":
      return cara === "klik" ? "Urutan mana yang benar?" : cara === "kanvas" ? `Angka di tempat ${d.tempat} berapa?` : "Terkecil atau terbesar?";
  }
}

/** Petunjuk saat jawaban salah: menunjuk kesalahannya (tanpa digit). `jawab`: kata atau teks yang dipilih atau diucapkan, atau angka yang ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number): string {
  if (l.tipe === "salah") {
    if (String(jawab) === l.jawabTokoh) return `Itu jawaban ${l.tokoh}${l.betul ? "" : " yang keliru"}. ${l.keliru}`;
    return petunjukSalah(l.dasar, cara, jawab);
  }
  switch (l.tipe) {
    case "banding":
      return cara === "klik"
        ? "Bandingkan dari tempat paling kiri, bukan dari kanan. Cari angka berbeda pertama, lalu lihat bilangan mana yang angkanya lebih besar di tempat itu. Bila semua tempat angkanya sama, kedua bilangan sama besar."
        : cara === "kanvas"
          ? "Tempat paling kiri adalah tempat pertama. Hitung dari kiri sampai ketemu angka yang berbeda: ribuan, ratusan, puluhan, satuan."
          : "Cari angka berbeda pertama dari kiri. Bila angka bilangan pertama lebih kecil di tempat itu, bilangan pertama kurang dari bilangan kedua. Bila lebih besar, lebih dari. Bila tidak ada angka yang berbeda, sama dengan.";
    case "kiri":
      return cara === "kanvas"
        ? "Cari dulu tempat angka berbeda pertama dari kiri, lalu baca angka di tempat itu pada bilangan yang lebih besar."
        : "Mulai dari ribuan, lalu ratusan, puluhan, dan satuan. Tempat yang dicari adalah tempat paling kiri yang angkanya berbeda.";
    case "garis":
      return cara === "klik"
        ? "Bilangan yang lebih ke kanan lebih besar dan bilangan yang lebih ke kiri lebih kecil. Lihat letak kedua titik pada garis."
        : cara === "kanvas"
          ? "Hitung petak loncatan di antara kedua titik, mulai dari titik pertama sampai titik kedua."
          : "Titik yang bilangannya lebih kecil ada di sebelah kiri. Bandingkan bilangan titik A dengan bilangan titik B.";
    case "kartu":
      return cara === "klik"
        ? "Bandingkan semua bilangan dari tempat paling kiri. Urutan naik dimulai dari yang terkecil di kiri, urutan turun dimulai dari yang terbesar di kiri."
        : cara === "kanvas"
          ? "Cari dulu bilangan yang diminta dengan membandingkan dari kiri, lalu baca angka di tempat yang ditanyakan."
          : "Bandingkan kartu yang ditandai dengan semua kartu lain dari tempat paling kiri. Bila lebih kecil dari semua, itu terkecil. Bila lebih besar dari semua, itu terbesar.";
  }
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
/** Isi kartu kata untuk tahap Abstract (kata dan angka, tanpa emoji). */
export function barisKartu(l: LangkahDasar, cara?: Cara): string[] {
  switch (l.tipe) {
    case "banding":
      return [`bilangan pertama: ${rb(l.a)}`, `bilangan kedua: ${rb(l.b)}`, cara === "klik" ? "tanda yang tepat: ?" : cara === "kanvas" ? "angka berbeda pertama di tempat ke: ?" : "pertama dibanding kedua: kurang dari, sama dengan, atau lebih dari?"];
    case "kiri":
      return [`bilangan pertama: ${rb(l.a)}`, `bilangan kedua: ${rb(l.b)}`, cara === "kanvas" ? "angka berbeda pertama pada bilangan yang lebih besar: ?" : "angka berbeda pertama di tempat: ?"];
    case "garis":
      return [
        `garis bilangan: ${rb(l.mulai)} sampai ${rb(l.mulai + 10 * l.langkah)}`,
        `tiap petak: ${rb(l.langkah)}`,
        `titik A: ${rb(l.a)}`,
        `titik B: ${rb(l.b)}`,
        cara === "klik" ? `bilangan yang lebih ${l.cari === "besar" ? "besar" : "kecil"}: ?` : cara === "kanvas" ? "petak loncatan dari A ke B: ?" : "titik A di kiri atau kanan titik B?",
      ];
    case "kartu":
      return [
        `kartu: ${l.data.map(rb).join(", ")}`,
        cara === "klik" ? `urutan dari ${l.arah === "naik" ? "terkecil ke terbesar" : "terbesar ke terkecil"}: ?` : cara === "kanvas" ? `angka di tempat ${l.tempat} pada bilangan ${sebutUjung(l.cari)}: ?` : `kartu yang ditandai: ${rb(l.cari === "kecil" ? terkecil(l.data) : terbesar(l.data))}`,
        cara === "suara" ? "kata: terkecil atau terbesar?" : "jawaban: ?",
      ];
  }
}
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);
