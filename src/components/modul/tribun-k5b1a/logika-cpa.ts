/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 5 Bab 1 Sub-Bab A "Tiket Tribun Bu Ningsih" (membaca dan menulis bilangan sampai seratus ribu):
 * jenis tugas, jawaban benar, pilihan, instruksi (tanpa digit), petunjuk salah, dan kartu data. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-tribun-k5b1a.mjs.
 * Jawaban beragam: memilih (klik; bilangan lima angka dipilih lewat klik), menulis SATU angka di kanvas, dan mengucapkan satu kata (rekam suara dengan pilihan ketuk).
 * Jawaban benar dihitung dari bilangan (logika-data.ts). Empat metode tiap misi: IGIL "Isi Kotak Tempat, Jaga Nol, Baca per Periode" (tempat angka),
 * Fill the Slots (Isi Kotak Tempat), Guard the Zero (Jaga Nol), Read by Period (Baca per Periode).
 */
import type { Cara } from "../lemari-k1b1a/logika";
import { ejaK5B1 } from "../eja-k5b1";
import {
  NAMA_KOLOM,
  angkaKolom,
  angkaPeriodeKiri,
  banyakAngka,
  banyakNol,
  kapital,
  kata,
  kolomDariAngka,
  kolomNol,
  lambang,
  namaKolom,
  sisipTitik,
} from "./logika-data";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";
export { kapital, kata } from "./logika-data";

export type Rupa = "benda" | "diagram" | "lambang";
/** Nama bilangan dalam kata (tanpa digit). */
export const kataBil = kata;
/** Angka dan tanda menjadi ucapan tanpa digit: "4 orang" menjadi "empat orang", "24.350" menjadi bilangan dengan kata. */
export const ucapkan = (t: string): string => ejaK5B1(t).replace(/\s+/g, " ").trim();

/* ------------------------------ Jenis tugas ------------------------------ */
/** Metode IGIL: tempat angka. Klik dan suara = kolom angka `d` (angka itu hanya muncul sekali pada bilangan), kanvas = banyak angka pada bilangan. */
export type LIgil = { tipe: "igil"; n: number; d: number; satuan: string };
/** Fill the Slots (Isi Kotak Tempat): bilangan diumumkan dengan kata. Klik = tulisan dengan angka, kanvas = angka di kolom `k`, suara = kolom angka itu. */
export type LIsi = { tipe: "isi"; n: number; k: number; satuan: string };
/** Guard the Zero (Jaga Nol): bilangan diumumkan dengan kata. Klik = tulisan dengan angka, kanvas = banyak nol penjaga, suara = kolom nol penjaga (tepat satu). */
export type LNol = { tipe: "nol"; n: number; satuan: string };
/** Read by Period (Baca per Periode). Klik titik = deret polos diberi titik, klik baca = bacaan, kanvas = banyak angka periode kiri, suara = kata di antara dua periode. */
export type LPeriode = { tipe: "periode"; n: number; satuan: string; mode: "titik" | "baca" };
export type LangkahDasar = LIgil | LIsi | LNol | LPeriode;
/** Cari kesalahan: tokoh sudah menjawab dari `dasar` (klik). Anak menilai benar atau salah, memilih alasan, lalu menjawab sendiri. `jawabTokoh` adalah teks pilihan klik tokoh. */
export type LangkahSalah = {
  tipe: "salah";
  dasar: LIsi | LNol | LPeriode;
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
export type Metode = "igil" | "isi" | "nol" | "periode";
export const URUT_METODE: Metode[] = ["igil", "isi", "nol", "periode"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Isi Kotak Tempat, Jaga Nol, Baca per Periode",
  isi: "Fill the Slots: Isi Kotak Tempat",
  nol: "Guard the Zero: Jaga Nol",
  periode: "Read by Period: Baca per Periode",
};
export const IKON_METODE: Record<Metode, string> = { igil: "⚽", isi: "\u{1F522}", nol: "⭕", periode: "\u{1F4E3}" };
const AWALAN: Record<Metode, string> = { igil: "Metode IGIL", isi: "Fill the Slots", nol: "Guard the Zero", periode: "Read by Period" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);

/* ------------------------------ Jawaban benar ------------------------------ */
export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: string };
const angka = (n: number): Kunci => ({ jenis: "angka", n });
const nama = (s: string): Kunci => ({ jenis: "nama", nama: s });
export const teksTulis = (n: number, satuan: string): string => `${lambang(n)} ${satuan}`;

/** Jawaban benar tiap jenis tugas menurut caranya, dihitung dari bilangan. */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  switch (l.tipe) {
    case "igil":
      return cara === "kanvas" ? angka(banyakAngka(l.n)) : nama(namaKolom(kolomDariAngka(l.n, l.d)));
    case "isi":
      return cara === "klik" ? nama(teksTulis(l.n, l.satuan)) : cara === "kanvas" ? angka(angkaKolom(l.n, l.k)) : nama(namaKolom(l.k));
    case "nol":
      return cara === "klik" ? nama(teksTulis(l.n, l.satuan)) : cara === "kanvas" ? angka(banyakNol(l.n)) : nama(namaKolom(kolomNol(l.n)[0]));
    case "periode":
      return cara === "klik" ? nama(l.mode === "titik" ? teksTulis(l.n, l.satuan) : kata(l.n)) : cara === "kanvas" ? angka(angkaPeriodeKiri(l.n)) : nama("ribu");
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

/** Bilangan pengecoh: salah paham umum (angka tertukar, nol hilang, nol bertambah). `utama` menentukan jenis yang didahulukan. */
export function bilanganPengecoh(n: number, utama: "tukar" | "nol"): number[] {
  const s = String(n);
  const tukar: number[] = [];
  for (let i = 0; i + 1 < s.length; i += 1) if (s[i] !== s[i + 1]) tukar.push(Number(`${s.slice(0, i)}${s[i + 1]}${s[i]}${s.slice(i + 2)}`));
  const nol: number[] = [];
  const posNol = Array.from(s, (c, i) => (c === "0" ? i : -1)).filter((i) => i >= 0);
  for (const i of [...posNol].reverse()) nol.push(Number(`${s.slice(0, i)}${s.slice(i + 1)}`));
  const tambah = [n * 10];
  // Cadangan bila bilangan terlalu sedikit variasinya (mis. seratus ribu): bilangan dekat yang masih sah.
  const dekat = [n + 1000, n - 1000, n + 100];
  const urut = utama === "nol" ? [...nol, ...tukar, ...tambah, ...dekat] : [...tukar, ...nol, ...tambah, ...dekat];
  const sah = unik(urut).filter((x) => x > 0 && x !== n && x <= 999999);
  return [...sah.filter((x) => x <= 100000), ...sah.filter((x) => x > 100000)];
}

/** Titik pemisah di tempat yang salah (selain tiga angka dari kanan) atau tanpa titik. */
export function titikPengecoh(n: number): string[] {
  const s = String(n);
  const benar = s.length - 3;
  const salah = Array.from({ length: s.length - 1 }, (_, i) => i + 1).filter((p) => p !== benar);
  return salah.map((p) => sisipTitik(s, p));
}

/** Nama kolom yang ada pada bilangan itu (satuan sampai kolom angka pertama), paling banyak lima. */
const namaKolomAda = (n: number): string[] => NAMA_KOLOM.slice(0, Math.min(banyakAngka(n), 5));

/** Pilihan untuk tugas klik: jawaban benar tidak pernah di tombol pertama, dan jawaban tokoh (Cari kesalahan) selalu ikut. */
export function pilihanKlik(l: Langkah): string[] {
  const k = kunciJawab(l, "klik");
  if (!k || k.jenis !== "nama") return [];
  const d = dasarDari(l);
  let hasil: string[];
  switch (d.tipe) {
    case "igil": {
      const lain = namaKolomAda(d.n).filter((x) => x !== k.nama);
      hasil = sisipkan(k.nama, [...lain.slice(d.d % 2), ...lain.slice(0, d.d % 2)].slice(0, 2), d.d + d.n);
      break;
    }
    case "isi":
      hasil = sisipkan(k.nama, bilanganPengecoh(d.n, "tukar").slice(0, 2).map((x) => teksTulis(x, d.satuan)), d.n + d.k);
      break;
    case "nol":
      hasil = sisipkan(k.nama, bilanganPengecoh(d.n, "nol").slice(0, 2).map((x) => teksTulis(x, d.satuan)), d.n);
      break;
    case "periode":
      hasil =
        d.mode === "titik"
          ? sisipkan(k.nama, titikPengecoh(d.n).slice(0, 2).map((x) => `${x} ${d.satuan}`), d.n)
          : sisipkan(k.nama, bilanganPengecoh(d.n, "tukar").slice(0, 2).map((x) => kata(x)), d.n);
      break;
  }
  if (l.tipe === "salah" && !hasil.includes(l.jawabTokoh)) {
    const ganti = hasil.map((x, i) => (x !== k.nama ? i : -1)).filter((i) => i >= 0).pop() ?? -1;
    hasil = hasil.map((x, i) => (i === ganti ? l.jawabTokoh : x));
  }
  return hasil;
}
/** Pilihan cadangan untuk tugas suara (nama kolom atau kata). Jawaban benar tidak pernah di tempat pertama. */
export function pilihanSuara(l: Langkah, cara: Cara): string[] {
  if (cara !== "suara") return [];
  const k = kunciJawab(l, cara);
  if (!k || k.jenis !== "nama") return [];
  const d = dasarDari(l);
  if (d.tipe === "periode") return sisipkan(k.nama, ["ratus", "puluh"], d.n);
  const lain = namaKolomAda(d.n)
    .filter((x) => x !== k.nama && x !== "puluh ribuan")
    .concat(["ribuan", "ratusan", "puluhan"].filter((x) => x !== k.nama))
    .filter((x, i, a) => a.indexOf(x) === i && x !== k.nama)
    .slice(0, 2);
  return sisipkan(k.nama, lain, d.n + k.nama.length);
}
export const teksKunciPilihan = (k: Kunci): string => (k.jenis === "nama" ? k.nama : kata(k.n));
/** Teks pilihan klik yang benar. */
export function teksKunciKlik(l: Langkah): string | null {
  const k = kunciJawab(l, "klik");
  return k && k.jenis === "nama" ? k.nama : null;
}

/* ------------------------------ Kalimat ------------------------------ */
const sebut = (rupa: Rupa): string => (rupa === "lambang" ? "kartu" : rupa === "diagram" ? "tabel tempat" : "papan angka");

/** Kalimat pembenaran setelah jawaban benar (diawali huruf kapital, tanpa menyebut gambar, kisi, atau kotak). */
export function kalimatKunci(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "igil":
      return cara === "kanvas" ? `Bilangan itu terdiri dari ${kata(banyakAngka(d.n))} angka.` : `Angka ${kata(d.d)} berada di kolom ${namaKolom(kolomDariAngka(d.n, d.d))}.`;
    case "isi":
      return cara === "klik" ? `${kapital(kata(d.n))} ditulis ${lambang(d.n)}.` : cara === "kanvas" ? `Pada kolom ${namaKolom(d.k)} ada angka ${kata(angkaKolom(d.n, d.k))}.` : `Angka ${kata(angkaKolom(d.n, d.k))} berada di kolom ${namaKolom(d.k)}.`;
    case "nol":
      return cara === "klik"
        ? `${kapital(kata(d.n))} ditulis ${lambang(d.n)}, dengan nol penjaga pada tempat yang tidak disebut.`
        : cara === "kanvas"
          ? `Ada ${kata(banyakNol(d.n))} nol penjaga, sehingga semua kolom tetap terisi.`
          : `Nol penjaga berada di kolom ${namaKolom(kolomNol(d.n)[0])}.`;
    case "periode":
      return cara === "klik"
        ? d.mode === "titik"
          ? `Titik pemisah dipasang tiga angka dari kanan, sehingga tulisannya ${lambang(d.n)}.`
          : `Bacaannya ${kata(d.n)}: periode kiri disambung kata ribu, lalu periode kanan dibaca.`
        : cara === "kanvas"
          ? `Periode kiri terdiri dari ${kata(angkaPeriodeKiri(d.n))} angka.`
          : "Periode kiri dibaca dan disambung kata ribu, lalu periode kanan dibaca.";
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
        ? `${aw}: lihat ${g} ini. Angka ${kata(l.d)} berada di kolom apa? Pilih jawabannya.`
        : cara === "kanvas"
          ? `${aw}: lihat ${g} ini. Berapa banyak angka pada bilangan itu? ${tulis}`
          : `${aw}: lihat ${g} ini. Angka ${kata(l.d)} berada di kolom apa? Ucapkan nama kolomnya.`;
    case "isi": {
      const umum = `${aw}: pengumuman menyebut ${kata(l.n)} ${l.satuan}.`;
      return cara === "klik"
        ? `${umum} Pilih tulisannya dengan angka.`
        : cara === "kanvas"
          ? `${umum} Berapa angka di kolom ${namaKolom(l.k)}? ${tulis}`
          : `${umum} Angka ${kata(angkaKolom(l.n, l.k))} berada di kolom apa? Ucapkan nama kolomnya.`;
    }
    case "nol": {
      const umum = `${aw}: pengumuman menyebut ${kata(l.n)} ${l.satuan}.`;
      return cara === "klik"
        ? `${umum} Perhatikan tempat yang tidak disebut, lalu pilih tulisannya dengan angka.`
        : cara === "kanvas"
          ? `${umum} Berapa nol penjaga yang harus ditulis? ${tulis}`
          : `${umum} Nol penjaga berada di kolom apa? Ucapkan nama kolomnya.`;
    }
    case "periode":
      return cara === "klik"
        ? l.mode === "titik"
          ? `${aw}: lihat ${g} ini. Angka-angkanya belum diberi titik pemisah. Pilih tulisan dengan titik pemisah yang benar.`
          : `${aw}: lihat ${g} ini. Bilangan itu dibaca per periode. Pilih bacaan yang benar.`
        : cara === "kanvas"
          ? `${aw}: lihat ${g} ini. Berapa angka pada periode kiri, yaitu bagian di sebelah kiri titik pemisah? ${tulis}`
          : `${aw}: lihat ${g} ini. Periode kiri dan periode kanan dibaca bergantian. Kata apa yang diucapkan di antara keduanya? Ucapkan kata itu.`;
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "igil":
      return cara === "kanvas" ? "Berapa banyak angka pada bilangan itu?" : `Angka ${kata(d.d)} berada di kolom apa?`;
    case "isi":
      return cara === "klik" ? "Bagaimana tulisannya dengan angka?" : cara === "kanvas" ? `Berapa angka di kolom ${namaKolom(d.k)}?` : `Angka ${kata(angkaKolom(d.n, d.k))} berada di kolom apa?`;
    case "nol":
      return cara === "klik" ? "Bagaimana tulisannya dengan angka?" : cara === "kanvas" ? "Berapa banyak nol penjaga?" : "Nol penjaga berada di kolom apa?";
    case "periode":
      return cara === "klik" ? (d.mode === "titik" ? "Bagaimana tulisan dengan titik pemisah?" : "Bagaimana bacaannya?") : cara === "kanvas" ? "Berapa angka pada periode kiri?" : "Kata apa yang diucapkan di antara dua periode?";
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
      return cara === "kanvas" ? "Hitung semua angka pada bilangan itu satu per satu." : "Mulailah dari angka paling kanan, lalu geser ke kiri satu kolom demi satu kolom.";
    case "isi":
      return cara === "klik"
        ? "Pecah bilangan yang diumumkan menjadi bagian ribu, ratus, puluh, dan satuan, lalu isi kolomnya satu per satu."
        : cara === "kanvas"
          ? "Pecah bilangan yang diumumkan lebih dulu, lalu cari angka pada kolom yang ditanya."
          : "Cari angka itu pada bilangan yang diumumkan, lalu telusuri kolomnya dari kanan.";
    case "nol":
      return cara === "klik"
        ? "Periksa tempat yang tidak disebut pada pengumuman: tiap kolom harus tetap terisi."
        : cara === "kanvas"
          ? "Hitung kolom yang tidak disebut pada pengumuman itu."
          : "Cari kolom yang tidak disebut pada pengumuman itu.";
    case "periode":
      return cara === "klik"
        ? l.mode === "titik"
          ? "Titik pemisah dipasang tiap tiga angka, dihitung dari kanan."
          : "Baca periode kiri lebih dulu, sambung dengan kata penghubungnya, lalu baca periode kanan."
        : cara === "kanvas"
          ? "Hitung angka di sebelah kiri titik pemisah."
          : "Ingat bagaimana periode kiri disambung ketika bilangan itu dibaca.";
  }
}

/* ------------------------------ Kartu data (Abstract) ------------------------------ */
/** Tempat angka pengumuman yang disebut: kata saja. */
const dibaca = (n: number, satuan: string): string => `dibaca: ${kata(n)} ${satuan}`;

/** Isi kartu data untuk tahap Abstract (kata dan angka, tanpa emoji dan tanpa gambar). */
export function barisKartu(l: LangkahDasar, cara?: Cara): string[] {
  switch (l.tipe) {
    case "igil":
      return cara === "kanvas" ? [`bilangan: ${teksTulis(l.n, l.satuan)}`, "banyak angka: ?"] : [`bilangan: ${teksTulis(l.n, l.satuan)}`, `angka: ${l.d}`, "kolom angka itu: ?"];
    case "isi":
      return cara === "klik"
        ? [dibaca(l.n, l.satuan), "ditulis dengan angka: ?"]
        : cara === "kanvas"
          ? [dibaca(l.n, l.satuan), `kolom: ${namaKolom(l.k)}`, "angka di kolom itu: ?"]
          : [dibaca(l.n, l.satuan), `angka: ${angkaKolom(l.n, l.k)}`, "kolom angka itu: ?"];
    case "nol":
      return cara === "klik"
        ? [dibaca(l.n, l.satuan), "tempat yang tidak disebut: tetap terisi", "ditulis dengan angka: ?"]
        : cara === "kanvas"
          ? [dibaca(l.n, l.satuan), "banyak nol penjaga: ?"]
          : [dibaca(l.n, l.satuan), "kolom nol penjaga: ?"];
    case "periode":
      return cara === "klik"
        ? l.mode === "titik"
          ? [`deret angka: ${l.n}`, "dengan titik pemisah: ?"]
          : [`bilangan: ${teksTulis(l.n, l.satuan)}`, "dibaca: ?"]
        : cara === "kanvas"
          ? [`bilangan: ${teksTulis(l.n, l.satuan)}`, "banyak angka periode kiri: ?"]
          : [`bilangan: ${teksTulis(l.n, l.satuan)}`, "kata di antara dua periode: ?"];
  }
}
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);
