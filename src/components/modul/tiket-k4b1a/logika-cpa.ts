/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 1 Sub-Bab A "Loket Tiket Bu Maya" (membaca dan menulis bilangan sampai sepuluh ribu: empat tempat, membaca dari kiri, nol penjaga tempat):
 * jenis tugas, jawaban benar, pilihan, instruksi (tanpa digit), dan petunjuk salah. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-tiket-k4b1a.mjs.
 * Jawaban beragam: memilih tulisan atau bacaan bilangan (klik), menulis satu angka di kanvas, dan mengucapkan satu kata (nama tempat) atau bilangan pendek.
 * Jawaban benar dihitung dari data. Empat metode tiap misi: IGIL "Kartu Angka, Baca Per Bagian, Periksa Nol", Digit Cards (Kartu Angka), Chunk and Read (Baca Per Bagian), Zero Check (Periksa Nol).
 */
import type { Cara } from "../lemari-k1b1a/logika";
import { ejaK4B1, kataBilK4B1 } from "../eja-k4b1";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";

export type Rupa = "benda" | "diagram" | "lambang";
const kapital = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);

/* ------------------------------ Bilangan dan kata ------------------------------ */
/** Nama bilangan 0 sampai 10.000 dalam kata (tanpa digit): tiga ribu empat ratus enam. */
export const kataBil = (n: number): string => kataBilK4B1(n);
export const kata = kataBil;
/** Ubah teks berangka menjadi ucapan tanpa digit: "3.406" menjadi "tiga ribu empat ratus enam", "5 + 3 = 8" menjadi "lima ditambah tiga sama dengan delapan". */
export const ucapkan = (t: string): string => ejaK4B1(t).replace(/\s+/g, " ").trim();
/** Bilangan dengan titik ribuan: 3406 menjadi 3.406, 905 tetap 905. */
export const fmt = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
export const ORDINAL = ["pertama", "kedua", "ketiga", "keempat"] as const;

export type Tempat = "ribuan" | "ratusan" | "puluhan" | "satuan";
export const TEMPAT: readonly Tempat[] = ["ribuan", "ratusan", "puluhan", "satuan"];

/** Empat angka bilangan (ribuan sampai satuan); bilangan di bawah seribu diberi nol di depan (tidak dipakai untuk tugas tempat). */
export const empatAngka = (n: number): number[] => String(n).padStart(4, "0").split("").map(Number);
export const angkaDi = (n: number, t: Tempat): number => empatAngka(n)[TEMPAT.indexOf(t)];
export const banyakAngka = (n: number): number => String(n).length;
export const banyakNol = (n: number): number => [...String(n)].filter((c) => c === "0").length;
export const banyakBagian = (n: number): number => [...String(n)].filter((c) => c !== "0").length;
/** Letak angka nol pertama dari kiri (mulai satu), atau 0 bila tidak ada. */
export const letakNol = (n: number): number => String(n).indexOf("0") + 1;
/** Tempat angka nol pertama (bilangan empat angka). */
export const tempatNol = (n: number): Tempat => TEMPAT[String(n).indexOf("0") + (4 - String(n).length)];

/** Tulisan yang kehilangan angka nol: angka pertama, titik, lalu sisa angka tanpa nol (3406 menjadi 3.46). */
export function lupaNol(n: number): string {
  const d = [...String(n)];
  const sisa = d.slice(1).filter((c) => c !== "0").join("");
  return sisa ? `${d[0]}.${sisa}` : d[0];
}
/** Satu angka nol ditukar tempatnya dengan angka di sebelah kanannya (4052 menjadi 4502). Tanpa perubahan bila tidak ada nol yang bisa digeser. */
export function tukarNol(n: number): number {
  const d = [...String(n)];
  for (let i = 0; i < d.length - 1; i += 1) {
    if (d[i] === "0" && d[i + 1] !== "0") {
      [d[i], d[i + 1]] = [d[i + 1], d[i]];
      return Number(d.join(""));
    }
  }
  return n;
}
/** Bilangan tanpa angka nol (6070 menjadi 67). */
export const tanpaNol = (n: number): number => Number([...String(n)].filter((c) => c !== "0").join("") || "0");
/** Urutan angka dibalik (9061 menjadi 1609). */
export const balikAngka = (n: number): number => Number([...String(n)].reverse().join(""));

/* ------------------------------ Jenis tugas ------------------------------ */
/** Bu Maya mengucapkan sebuah bilangan; anak memilih tulisannya (klik). */
export type LTulis = { tipe: "tulis"; angka: number };
/** Sebuah bilangan tertulis; anak memilih cara membacanya (klik). */
export type LBaca = { tipe: "baca"; angka: number };
/** Angka di satu tempat: tulis di kanvas, atau ucapkan angkanya (suara). */
export type LTempat = { tipe: "tempat"; angka: number; tempat: Tempat };
/** Satu angka (urutan ke `urut` dari kiri, mulai nol) ditandai; tempat apa itu (klik atau suara). */
export type LNamaTempat = { tipe: "namaTempat"; angka: number; urut: number };
/** Digit Cards: klik = bilangan yang terbentuk dari kartu; kanvas = kartu ke berapa dari kiri yang bernol. */
export type LKartu = { tipe: "kartu"; angka: number };
/** Chunk and Read: klik atau suara = tempat yang dilewati karena nol; kanvas = banyak bagian yang disebut saat dibaca. */
export type LBagian = { tipe: "bagian"; angka: number };
/** Zero Check: klik = tulisan yang benar setelah nolnya hilang; kanvas = banyak angka nol; suara = banyak angka. */
export type LNol = { tipe: "nol"; angka: number };
export type LangkahDasar = LTulis | LBaca | LTempat | LNamaTempat | LKartu | LBagian | LNol;
/** Cari kesalahan: tokoh sudah menjawab dari `dasar`. Anak menilai benar atau salah, memilih alasan, lalu menjawab sendiri. `jawabTokoh` adalah teks pilihan klik tokoh. */
export type LangkahSalah = {
  tipe: "salah";
  dasar: LTulis | LBaca | LNol;
  tokoh: string;
  kataTokoh: string;
  jawabTokoh: string;
  alasan: [string, string, string];
  benar: number;
  keliru: string;
  betul?: boolean;
};
export type Langkah = LangkahDasar | LangkahSalah;
export type Metode = "igil" | "kartu" | "baca" | "nol";
export const URUT_METODE: Metode[] = ["igil", "kartu", "baca", "nol"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Kartu Angka, Baca Per Bagian, Periksa Nol",
  kartu: "Digit Cards: Kartu Angka",
  baca: "Chunk and Read: Baca Per Bagian",
  nol: "Zero Check: Periksa Nol",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F522}", kartu: "\u{1F0CF}", baca: "\u{1F5E3}", nol: "\u{1F50D}" };
const AWALAN: Record<Metode, string> = { igil: "Metode IGIL", kartu: "Digit Cards", baca: "Chunk and Read", nol: "Zero Check" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);

/* ------------------------------ Jawaban benar ------------------------------ */
export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: string };
const angka = (n: number): Kunci => ({ jenis: "angka", n });
const nama = (s: string): Kunci => ({ jenis: "nama", nama: s });

/** Jawaban benar tiap jenis tugas menurut caranya, dihitung dari data. Null bila jenis itu tidak dipakai pada cara tersebut. */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  switch (l.tipe) {
    case "tulis":
      return cara === "klik" ? nama(fmt(l.angka)) : null;
    case "baca":
      return cara === "klik" ? nama(kataBil(l.angka)) : null;
    case "tempat":
      return angka(angkaDi(l.angka, l.tempat));
    case "namaTempat":
      return nama(TEMPAT[l.urut]);
    case "kartu":
      return cara === "klik" ? nama(fmt(l.angka)) : cara === "kanvas" ? angka(letakNol(l.angka)) : null;
    case "bagian":
      return cara === "kanvas" ? angka(banyakBagian(l.angka)) : nama(tempatNol(l.angka));
    case "nol":
      return cara === "klik" ? nama(fmt(l.angka)) : cara === "kanvas" ? angka(banyakNol(l.angka)) : angka(banyakAngka(l.angka));
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
const unik = <T,>(daftar: T[], buang: T[]): T[] => daftar.filter((x, i, a) => !buang.includes(x) && a.indexOf(x) === i);
/** Dua nama tempat selain `benar` (ribuan hanya bila perlu). */
const tempatLain = (benar: string, geser: number): string[] => {
  const calon = TEMPAT.filter((t) => t !== benar);
  const dua = [calon[geser % 3], calon[(geser + 1) % 3]];
  return dua;
};

/** Dua tulisan keliru untuk bilangan `n`: nol hilang, nol bergeser, atau satu nol tambahan. */
function tulisanKeliru(n: number, awal?: string): string[] {
  const calon = [awal ?? "", lupaNol(n), fmt(tukarNol(n)), fmt(n * 10), fmt(balikAngka(n))].filter((x) => x !== "");
  return unik(calon, [fmt(n)]).slice(0, 2);
}
/** Dua bacaan keliru: nol terbaca sebagai angka lain, tempat tergeser, atau tempat hilang. */
function bacaanKeliru(n: number, awal?: string): string[] {
  const calon = [awal ?? "", kataBil(tanpaNol(n)), kataBil(tukarNol(n)), kataBil(Math.floor(n / 10)), kataBil(balikAngka(n))].filter((x) => x !== "");
  return unik(calon, [kataBil(n)]).slice(0, 2);
}

/** Tiga pilihan untuk tugas klik: jawaban benar tidak pernah di tombol pertama, dan jawaban tokoh (Cari kesalahan) selalu ikut. */
export function pilihanKlik(l: Langkah): string[] {
  const k = kunciJawab(l, "klik");
  if (!k || k.jenis !== "nama") return [];
  const d = dasarDari(l);
  const awal = l.tipe === "salah" && l.jawabTokoh !== k.nama ? l.jawabTokoh : undefined;
  let lain: string[] = [];
  switch (d.tipe) {
    case "tulis":
      lain = tulisanKeliru(d.angka, awal);
      break;
    case "baca":
      lain = bacaanKeliru(d.angka, awal);
      break;
    case "kartu":
      lain = unik([lupaNol(d.angka), fmt(balikAngka(d.angka)), fmt(tukarNol(d.angka))], [k.nama]).slice(0, 2);
      break;
    case "nol":
      lain = unik([fmt(tukarNol(d.angka)), fmt(d.angka * 10), fmt(balikAngka(d.angka))], [k.nama, lupaNol(d.angka)]).slice(0, 2);
      break;
    case "bagian":
    case "namaTempat":
      lain = tempatLain(k.nama, d.angka);
      break;
    default:
      return [];
  }
  return sisipkan(k.nama, lain, d.angka);
}
/** Pilihan cadangan untuk tugas suara (kata atau bilangan dalam kata). */
export function pilihanSuara(l: Langkah, cara: Cara): string[] {
  const k = kunciJawab(l, cara);
  if (!k) return [];
  const d = dasarDari(l);
  if (k.jenis === "nama") return sisipkan(k.nama, tempatLain(k.nama, d.angka), d.angka);
  const lain = unik([k.n + 1, k.n - 1, k.n + 2, k.n - 2], [k.n]).filter((x) => x >= 0 && x <= 9).slice(0, 2);
  return sisipkan(kataBil(k.n), lain.map(kataBil), k.n);
}
export const teksKunciPilihan = (k: Kunci): string => (k.jenis === "nama" ? k.nama : kataBil(k.n));
/** Teks pilihan klik yang benar. */
export function teksKunciKlik(l: Langkah): string | null {
  const k = kunciJawab(l, "klik");
  return k && k.jenis === "nama" ? k.nama : null;
}

/* ------------------------------ Kalimat ------------------------------ */
const sebut = (rupa: Rupa): string => (rupa === "lambang" ? "kartu" : "gambar");

export function kalimatKunci(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "tulis":
      return `${kapital(kataBil(d.angka))} ditulis ${fmt(d.angka)}: tiap angka diletakkan di tempatnya dan tempat yang tidak disebut diisi nol.`;
    case "baca":
      return `${fmt(d.angka)} dibaca ${kataBil(d.angka)}: dibaca dari ribuan, dan angka nol tidak disebut.`;
    case "tempat":
      return `Pada ${fmt(d.angka)}, angka di tempat ${d.tempat} adalah ${kataBil(angkaDi(d.angka, d.tempat))}.`;
    case "namaTempat":
      return `Angka ${ORDINAL[d.urut]} dari kiri pada ${fmt(d.angka)} ada di tempat ${TEMPAT[d.urut]}.`;
    case "kartu":
      return cara === "klik"
        ? `Kartu disusun dari kiri: ${[...String(d.angka)].join(", ")}. Hasilnya ${fmt(d.angka)}, dibaca ${kataBil(d.angka)}.`
        : `Kartu nol ada di urutan ${ORDINAL[letakNol(d.angka) - 1]} dari kiri, yaitu di tempat ${tempatNol(d.angka)}.`;
    case "bagian":
      return cara === "kanvas"
        ? `${fmt(d.angka)} dibaca ${kataBil(d.angka)}: ada ${kataBil(banyakBagian(d.angka))} bagian yang disebut, dan bagian bernol dilewati.`
        : `Tempat ${tempatNol(d.angka)} berisi nol, jadi tidak disebut saat membaca ${fmt(d.angka)}, tetapi tempatnya tetap dihitung.`;
    case "nol":
      return cara === "klik"
        ? `${kapital(kataBil(d.angka))} ditulis ${fmt(d.angka)}. Tulisan yang nolnya hilang, ${lupaNol(d.angka)}, punya lebih sedikit angka.`
        : cara === "kanvas"
          ? `Pada ${fmt(d.angka)} ada ${kataBil(banyakNol(d.angka))} angka nol, dan tiap nol menjaga tempatnya.`
          : `${fmt(d.angka)} terdiri atas ${kataBil(banyakAngka(d.angka))} angka, dihitung dari kiri sampai satuan.`;
  }
}

/** Instruksi satu tugas (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const g = sebut(rupa);
  const aw = AWALAN[metode];
  const akhir = cara === "klik" ? "Pilih jawabannya." : cara === "kanvas" ? "Tulis satu angka di kanvas." : "Ucapkan jawabannya.";
  switch (l.tipe) {
    case "tulis":
      return `${aw}: Bu Maya mengucapkan ${kataBil(l.angka)}. Lihat ${g} ini. Bilangan mana yang ia ucapkan? Pilih tulisannya.`;
    case "baca":
      return `${aw}: lihat bilangan pada ${g} ini. Bagaimana bilangan itu dibaca? Pilih bacaannya.`;
    case "tempat":
      return cara === "kanvas"
        ? `${aw}: lihat bilangan pada ${g} ini. Berapa angka di tempat ${l.tempat}? Tulis satu angka di kanvas.`
        : `${aw}: lihat bilangan pada ${g} ini. Berapa angka di tempat ${l.tempat}? Ucapkan angkanya.`;
    case "namaTempat":
      return `${aw}: lihat bilangan pada ${g} ini. Angka ${ORDINAL[l.urut]} dari kiri diberi tanda. Angka itu ada di tempat apa? ${cara === "klik" ? "Pilih jawabannya." : "Ucapkan satu kata."}`;
    case "kartu":
      return cara === "klik"
        ? `${aw}: kartu angka pada ${g} ini disusun dari kiri, ribuan lebih dulu. Bilangan apa yang terbentuk? Pilih jawabannya.`
        : `${aw}: kartu angka pada ${g} ini disusun dari kiri, ribuan lebih dulu. Kartu ke berapa dari kiri yang bernol? Tulis satu angka di kanvas.`;
    case "bagian":
      return cara === "kanvas"
        ? `${aw}: bilangan pada ${g} ini dibaca per bagian dari kiri, dan bagian bernol dilewati. Ada berapa bagian yang disebut? Tulis satu angka di kanvas.`
        : `${aw}: bilangan pada ${g} ini dibaca per bagian dari kiri, dan satu bagian dilewati karena berisi nol. Tempat apa yang dilewati? ${cara === "klik" ? "Pilih jawabannya." : "Ucapkan satu kata."}`;
    case "nol":
      return cara === "klik"
        ? `${aw}: Bu Maya mengucapkan ${kataBil(l.angka)}, tetapi Satria menulis tanpa satu nol pada ${g} ini. Periksa angkanya. ${akhir}`
        : cara === "kanvas"
          ? `${aw}: lihat bilangan pada ${g} ini. Ada berapa angka nol pada bilangan itu? ${akhir}`
          : `${aw}: lihat bilangan pada ${g} ini. Ada berapa angka pada bilangan itu? ${akhir}`;
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "tulis":
      return "Tulisan mana yang benar?";
    case "baca":
      return "Bagaimana bilangan itu dibaca?";
    case "tempat":
      return `Berapa angka di tempat ${d.tempat}?`;
    case "namaTempat":
      return "Angka itu ada di tempat apa?";
    case "kartu":
      return cara === "klik" ? "Bilangan apa yang terbentuk?" : "Kartu ke berapa dari kiri yang bernol?";
    case "bagian":
      return cara === "kanvas" ? "Ada berapa bagian yang disebut?" : "Tempat apa yang dilewati?";
    case "nol":
      return cara === "klik" ? "Tulisan mana yang benar setelah nolnya diperiksa?" : cara === "kanvas" ? "Ada berapa angka nol?" : "Ada berapa angka pada bilangan itu?";
  }
}

/** Petunjuk saat jawaban salah: menunjuk kesalahannya (tanpa digit). `jawab`: kata atau bilangan yang dipilih atau diucapkan, atau angka yang ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number): string {
  if (l.tipe === "salah") {
    if (String(jawab) === l.jawabTokoh) return `Itu jawaban ${l.tokoh}${l.betul ? "" : " yang keliru"}. ${l.keliru}`;
    return petunjukSalah(l.dasar, cara, jawab);
  }
  switch (l.tipe) {
    case "tulis":
      return "Baca dari ribuan dan perhatikan tempat yang tidak disebut. Tempat itu harus diisi nol, dan tulisan bilangan empat angka punya empat angka.";
    case "baca":
      return "Bacalah dari kiri, dimulai dari ribuan. Angka nol tidak disebut, tetapi tempatnya tetap dihitung.";
    case "tempat":
      return cara === "kanvas"
        ? "Baca bilangan dari kiri: ribuan, ratusan, puluhan, lalu satuan. Tulis angka yang berada di tempat yang ditanyakan."
        : "Cocokkan tempat yang ditanyakan dengan urutan dari kiri: ribuan, ratusan, puluhan, lalu satuan. Ucapkan angka di tempat itu.";
    case "namaTempat":
      return "Hitung dari kiri: angka pertama ada di ribuan, lalu ratusan, puluhan, dan satuan.";
    case "kartu":
      return cara === "klik"
        ? "Susun kartu dari kiri dengan urutan yang sama, tanpa menghilangkan atau menukar satu kartu pun, termasuk kartu nol."
        : "Hitung kartu dari kiri, mulai dari kartu pertama. Cari kartu yang bertuliskan angka nol.";
    case "bagian":
      return cara === "kanvas"
        ? "Hitung hanya bagian yang berisi angka selain nol, karena bagian bernol tidak disebut."
        : "Cari tempat yang berisi angka nol. Tempat itu dilewati saat dibaca, tetapi tetap dihitung.";
    case "nol":
      return cara === "klik"
        ? "Periksa jumlah angka pada tulisan Satria dan bandingkan dengan ucapan Bu Maya. Tempat yang kosong harus diisi nol."
        : cara === "kanvas"
          ? "Hitung semua angka nol pada bilangan itu, yang di tengah maupun di ujung kanan."
          : "Hitung semua angka pada bilangan itu dari kiri sampai satuan, termasuk angka nol.";
  }
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
/** Isi kartu kata untuk tahap Abstract (kata dan angka, tanpa emoji). */
export function barisKartu(l: LangkahDasar, cara?: Cara): string[] {
  switch (l.tipe) {
    case "tulis":
      return [`ucapan: ${kataBil(l.angka)}`, "tulisan yang benar: ?"];
    case "baca":
      return [`bilangan: ${fmt(l.angka)}`, "cara baca: ?"];
    case "tempat":
      return [`bilangan: ${fmt(l.angka)}`, `tempat: ${l.tempat}`, "angkanya: ?"];
    case "namaTempat":
      return [`bilangan: ${fmt(l.angka)}`, `angka yang ditandai: ${ORDINAL[l.urut]} dari kiri`, "tempatnya: ?"];
    case "kartu":
      return [`kartu dari kiri: ${[...String(l.angka)].join(", ")}`, cara === "klik" ? "bilangan yang terbentuk: ?" : "kartu bernol ke berapa dari kiri: ?"];
    case "bagian":
      return [`bilangan: ${fmt(l.angka)}`, "dibaca per bagian dari kiri", cara === "kanvas" ? "banyak bagian yang disebut: ?" : "tempat yang dilewati: ?"];
    case "nol":
      return cara === "klik"
        ? [`ucapan: ${kataBil(l.angka)}`, `tulisan Satria: ${lupaNol(l.angka)}`, "tulisan yang benar: ?"]
        : [`bilangan: ${fmt(l.angka)}`, cara === "kanvas" ? "banyak angka nol: ?" : "banyak angka: ?"];
  }
}
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);
