/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 3 Sub-Bab B "Barisan Kursi Pak Gunawan" (pola bilangan), akhir cerita Orkestra Angklung Kampung Senandung:
 * jenis tugas, jawaban benar, pilihan, instruksi (tanpa digit), dan petunjuk salah. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-kursi-k4b3b.mjs.
 * Jawaban beragam: memilih aturan atau bilangan (klik), menulis satu angka di kanvas, dan mengucapkan satu kata (membesar, mengecil, beda, tambah, kurang) atau bilangan pendek.
 * Jawaban benar dihitung dari data. Empat metode tiap misi: IGIL "Rantai Loncat, Mesin Aturan, Tabel Urutan" (tugas mencari beda),
 * Jump Chain (Rantai Loncat), Rule Machine (Mesin Aturan), dan Position Table (Tabel Urutan).
 * Bilangan pada urutan ke-n dihitung lewat n kurang satu lompatan.
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

/** Nomor urutan dalam kata: 1 menjadi "pertama", 7 menjadi "ketujuh" (sampai 12). */
const URUTAN = ["", "pertama", "kedua", "ketiga", "keempat", "kelima", "keenam", "ketujuh", "kedelapan", "kesembilan", "kesepuluh", "kesebelas", "kedua belas"];
export const urut = (n: number): string => URUTAN[n] ?? `ke-${n}`;

/**
 * Ubah teks berangka menjadi ucapan tanpa digit: "+4" menjadi "tambah empat", "−6" menjadi "kurang enam", "27" menjadi "dua puluh tujuh".
 * Tanpa spasi sebelum tanda baca.
 */
export function ucapkan(t: string): string {
  return t
    .replace(/(^|[\s(])\+(\d+)/g, (_m, a: string, b: string) => `${a} tambah ${kataBil(Number(b))} `)
    .replace(/(^|[\s(])[−-](\d+)/g, (_m, a: string, b: string) => `${a} kurang ${kataBil(Number(b))} `)
    .replace(/\d+/g, (d) => ` ${kataBil(Number(d))} `)
    .replace(/\s+([.,!?;:])/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

/* ------------------------------ Pola bilangan ------------------------------ */
export type Arah = "naik" | "turun";
/** Suku ke-n (n mulai dari 1) pola dengan suku pertama `a`, beda `d`: n kurang satu lompatan dari suku pertama. */
export const sukuKe = (a: number, d: number, arah: Arah, n: number): number => a + (arah === "naik" ? 1 : -1) * d * (n - 1);
/** Banyak lompatan dari urutan pertama ke urutan ke-n: satu kurang dari nomor urutan. */
export const lompatanKe = (n: number): number => n - 1;
/** Pola `banyak` suku pertama. */
export const polaSuku = (a: number, d: number, arah: Arah, banyak: number): number[] => Array.from({ length: banyak }, (_, i) => sukuKe(a, d, arah, i + 1));
/** Aturan pola sebagai tulisan: "+4" atau "−4" (tanda kurang yang sebenarnya). */
export const aturanTeks = (d: number, arah: Arah): string => `${arah === "naik" ? "+" : "−"}${d}`;
/** Jenis pola menurut beda: beda tambah membesar, beda kurang mengecil (bukan menurut besar kecilnya bilangan). */
export const jenisPola = (arah: Arah): "membesar" | "mengecil" => (arah === "naik" ? "membesar" : "mengecil");
export const operasiDari = (arah: Arah): "tambah" | "kurang" => (arah === "naik" ? "tambah" : "kurang");
/** Hasil memakai aturan sebanyak `kali` kali pada bilangan `a`. */
export const hasilMesin = (a: number, d: number, arah: Arah, kali: number): number => a + (arah === "naik" ? 1 : -1) * d * kali;
/** Isi `banyak` bilangan menjadi baris-baris berisi paling banyak `kolom` benda: jumlah semua baris selalu sama dengan `banyak`. */
export const susunBaris = (banyak: number, kolom: number): number[] => {
  const baris: number[] = [];
  for (let sisa = Math.max(0, banyak); sisa > 0; sisa -= kolom) baris.push(Math.min(kolom, sisa));
  return baris;
};

/* ------------------------------ Jenis tugas ------------------------------ */
type Pil = [string, string, string];
type Pola = { benda: string; a: number; d: number; arah: Arah };
/** Cari beda (IGIL): tiga bilangan pertama pola. Klik: pilih aturan (+4 atau −4), kanvas: satu angka beda. */
export type LBeda = { tipe: "beda"; pil?: Pil } & Pola;
/** Rantai Loncat (Jump Chain): tiga bilangan pertama, cari bilangan berikutnya. Klik: pilih bilangan, kanvas: satu angka (bilangan 1 sampai 9), suara: bilangan. */
export type LRantai = { tipe: "rantai"; pil?: Pil } & Pola;
/** Mesin Aturan (Rule Machine): masuk `a`, aturan beda `d`, dipakai `kali` kali. Klik: pilih hasil, kanvas: satu angka hasil, suara: bilangan hasil atau kata aturan (tambah atau kurang) bila `operasi`. */
export type LMesin = { tipe: "mesin"; kali: number; operasi?: boolean; pil?: Pil } & Pola;
/** Tabel Urutan (Position Table): bilangan pada urutan ke-`n`. Klik: pilih bilangan, kanvas: banyak lompatan (n kurang satu), suara: bilangan. */
export type LTabel = { tipe: "tabel"; n: number; pil?: Pil } & Pola;
/** Sebut kata (IGIL, suara): satu kata dari arti pola. */
export type KataSebut = "membesar" | "mengecil" | "beda";
export type LSebut = { tipe: "sebut"; kata: KataSebut } & Pola;
export type LangkahDasar = LBeda | LRantai | LMesin | LTabel | LSebut;
/** Cari kesalahan: tokoh sudah menjawab dari `dasar`. Anak memutuskan benar atau salah, memilih alasan, lalu menjawab sendiri. `jawabTokoh` adalah salah satu pilihan klik. */
export type LangkahSalah = {
  tipe: "salah";
  dasar: LBeda | LRantai | LMesin | LTabel;
  tokoh: string;
  kataTokoh: string;
  jawabTokoh: string;
  alasan: [string, string, string];
  benar: number;
  betul?: boolean;
};
export type Langkah = LangkahDasar | LangkahSalah;
export type Metode = "igil" | "rantai" | "mesin" | "tabel";
export const URUT_METODE: Metode[] = ["igil", "rantai", "mesin", "tabel"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Rantai Loncat, Mesin Aturan, Tabel Urutan",
  rantai: "Jump Chain: Rantai Loncat",
  mesin: "Rule Machine: Mesin Aturan",
  tabel: "Position Table: Tabel Urutan",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F9EE}", rantai: "\u{1F517}", mesin: "\u{1F527}", tabel: "\u{1F4CB}" };
const AWALAN: Record<Metode, string> = { igil: "Metode IGIL", rantai: "Jump Chain", mesin: "Rule Machine", tabel: "Position Table" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);

/** Tiga bilangan pertama pola yang ditunjukkan tiap tugas. */
export const tigaPertama = (d: Pola): number[] => polaSuku(d.a, d.d, d.arah, 3);
/** Bilangan yang ditanyakan atau dihasilkan tugas (jawaban benar dalam bentuk bilangan). */
export function hasilTugas(d: LangkahDasar): number {
  switch (d.tipe) {
    case "beda":
    case "sebut":
      return d.d;
    case "rantai":
      return sukuKe(d.a, d.d, d.arah, 4);
    case "mesin":
      return hasilMesin(d.a, d.d, d.arah, d.kali);
    case "tabel":
      return sukuKe(d.a, d.d, d.arah, d.n);
  }
}

/* ------------------------------ Jawaban benar ------------------------------ */
export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: string };
const angka = (n: number): Kunci => ({ jenis: "angka", n });
const nama = (s: string): Kunci => ({ jenis: "nama", nama: s });

/** Jawaban benar tiap jenis tugas menurut caranya, dihitung dari data. Mengembalikan null untuk kombinasi yang tidak dipakai. */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  switch (l.tipe) {
    case "beda":
      return cara === "klik" ? nama(aturanTeks(l.d, l.arah)) : cara === "kanvas" ? angka(l.d) : null;
    case "rantai":
      return cara === "klik" ? nama(String(hasilTugas(l))) : angka(hasilTugas(l));
    case "mesin":
      if (cara === "klik") return nama(String(hasilTugas(l)));
      if (cara === "kanvas") return angka(hasilTugas(l));
      return l.operasi ? nama(operasiDari(l.arah)) : angka(hasilTugas(l));
    case "tabel":
      return cara === "klik" ? nama(String(hasilTugas(l))) : cara === "kanvas" ? angka(lompatanKe(l.n)) : angka(hasilTugas(l));
    case "sebut":
      return nama(l.kata);
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

/**
 * Pengecoh bilangan untuk jawaban suara: kesalahan yang lazim (lompatan kelebihan atau kekurangan satu, memakai bilangan terakhir, aturan sebaliknya), lalu bilangan di dekatnya.
 * Hanya bilangan 1 sampai 99 yang berbeda dari jawaban benar.
 */
export function pengecoh(l: Langkah, cara: Cara): number[] {
  const d = dasarDari(l);
  const k = kunciJawab(d, cara);
  const n = k?.jenis === "angka" ? k.n : 0;
  const t = d.arah === "naik" ? 1 : -1;
  let calon: number[] = [];
  if (d.tipe === "rantai") calon = [sukuKe(d.a, d.d, d.arah, 3), sukuKe(d.a, d.d, d.arah, 5), n + 1, n - 1, n + 2, n - 2];
  else if (d.tipe === "mesin") calon = [hasilMesin(d.a, d.d, d.arah, d.kali - 1), hasilMesin(d.a, d.d, d.arah, d.kali + 1), d.a - t * d.d * d.kali, n + 1, n - 1, n + 2];
  else if (d.tipe === "tabel") calon = cara === "kanvas" ? [d.n, d.n - 2, d.n + 1, d.n - 3] : [sukuKe(d.a, d.d, d.arah, d.n + 1), sukuKe(d.a, d.d, d.arah, d.n - 1), d.a - t * d.d * (d.n - 1), n + 1, n - 1];
  else calon = [n + 1, n - 1, n + 2, n - 2];
  const hasil: number[] = [];
  for (const c of calon) if (Number.isInteger(c) && c >= 1 && c <= 99 && c !== n && !hasil.includes(c)) hasil.push(c);
  return hasil;
}

/** Pilihan klik: tiga pilihan dari data tugas (jawaban benar tidak pernah di tombol pertama, dan jawaban tokoh pada Cari kesalahan selalu ikut). */
export function pilihanKlik(l: Langkah): string[] {
  const d = dasarDari(l);
  if (d.tipe === "sebut") return [];
  return d.pil ? [...d.pil] : [];
}
const KATA_LAIN: Record<string, string[]> = {
  membesar: ["mengecil", "tetap", "berhenti"],
  mengecil: ["membesar", "tetap", "berhenti"],
  beda: ["jumlah", "hasil", "urutan"],
  tambah: ["kurang", "kali", "bagi"],
  kurang: ["tambah", "kali", "bagi"],
};
/** Pilihan cadangan untuk tugas suara (kata atau bilangan dalam kata). */
export function pilihanSuara(l: Langkah, cara: Cara): string[] {
  const k = kunciJawab(l, cara);
  if (!k) return [];
  if (k.jenis === "angka") {
    const lain = pengecoh(l, cara).slice(0, 2);
    return sisipkan(kataBil(k.n), lain.map(kataBil), k.n);
  }
  return sisipkan(k.nama, (KATA_LAIN[k.nama] ?? ["tetap", "berhenti"]).slice(0, 2), k.nama.length);
}
export const teksKunciPilihan = (k: Kunci): string => (k.jenis === "nama" ? k.nama : kataBil(k.n));
/** Teks pilihan klik yang benar (aturan atau bilangan). */
export function teksKunciKlik(l: Langkah): string | null {
  const k = kunciJawab(l, "klik");
  if (!k) return null;
  return k.jenis === "nama" ? k.nama : String(k.n);
}

/* ------------------------------ Kalimat ------------------------------ */
const sebutBidang = (rupa: Rupa): string => (rupa === "lambang" ? "kartu" : rupa === "benda" ? "papan kursi" : "kertas titik");

/** Awal tiap kalimat berhuruf kapital (kata bilangan dieja huruf kecil di tengah teks). */
const kapKal = (t: string): string => t.replace(/(^|[.?!]\s+)([a-z])/g, (_m, a: string, b: string) => a + b.toUpperCase());
const daftarBil = (xs: number[]): string => xs.join(", ");

export function kalimatKunci(l: Langkah, cara: Cara): string {
  return kapKal(ucapkan(kalimatKunciMentah(l, cara)));
}

function kalimatKunciMentah(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  const gerak = d.arah === "naik" ? "bertambah" : "berkurang";
  const ubahKe = d.arah === "naik" ? "ditambah" : "dikurangi";
  switch (d.tipe) {
    case "beda":
      return cara === "kanvas"
        ? `Dari ${d.a} ke ${sukuKe(d.a, d.d, d.arah, 2)} ${gerak} ${d.d}, jadi beda tiap dua bilangan berurutan adalah ${d.d}.`
        : `Dari ${d.a} ke ${sukuKe(d.a, d.d, d.arah, 2)} ${gerak} ${d.d}, jadi aturan pola ini ${aturanTeks(d.d, d.arah)}.`;
    case "rantai":
      return `Bedanya ${aturanTeks(d.d, d.arah)}, jadi bilangan berikutnya adalah ${sukuKe(d.a, d.d, d.arah, 3)} ${ubahKe} ${d.d} sama dengan ${hasilTugas(d)}.`;
    case "mesin":
      if (cara === "suara" && d.operasi) return `Bilangan yang keluar ${d.arah === "naik" ? "lebih besar" : "lebih kecil"} dari bilangan yang masuk, jadi aturan mesin adalah ${operasiDari(d.arah)}.`;
      return `Mesin beraturan ${aturanTeks(d.d, d.arah)} dipakai ${d.kali} kali: ${daftarBil(polaSuku(d.a, d.d, d.arah, d.kali + 1))}, jadi yang keluar ${hasilTugas(d)}.`;
    case "tabel":
      return cara === "kanvas"
        ? `Dari urutan pertama ke urutan ${urut(d.n)} ada ${lompatanKe(d.n)} lompatan, yaitu satu kurang dari nomor urutannya.`
        : `Dari urutan pertama ke urutan ${urut(d.n)} ada ${lompatanKe(d.n)} lompatan, jadi ${d.a} ${ubahKe} ${d.d} sebanyak ${lompatanKe(d.n)} kali sama dengan ${hasilTugas(d)}.`;
    case "sebut":
      return d.kata === "membesar"
        ? "Pola dengan beda tambah disebut pola membesar."
        : d.kata === "mengecil"
          ? "Pola dengan beda kurang disebut pola mengecil."
          : "Selisih tetap antara dua bilangan yang berurutan disebut beda.";
  }
}

/** Instruksi satu tugas (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  return kapKal(ucapkan(instruksiMentah(l, rupa, cara, metode)));
}

function instruksiMentah(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const g = sebutBidang(rupa);
  const aw = AWALAN[metode];
  const akhir = cara === "klik" ? "Pilih jawabannya." : cara === "kanvas" ? "Tulis satu angka di kanvas." : "Ucapkan bilangannya.";
  switch (l.tipe) {
    case "beda":
      return cara === "klik"
        ? `${aw}: lihat tiga bilangan pertama pada ${g} ini. Aturan pola ini yang mana? ${akhir}`
        : `${aw}: lihat tiga bilangan pertama pada ${g} ini. Berapa beda tiap dua bilangan yang berurutan? ${akhir}`;
    case "rantai":
      return `${aw}: tarik rantai loncat dari tiga bilangan pertama pada ${g} ini. Bilangan berikutnya berapa? ${akhir}`;
    case "mesin":
      if (cara === "suara" && l.operasi) return `${aw}: mesin mengubah ${l.a} menjadi ${hasilTugas(l)} setelah dipakai ${l.kali} kali pada ${g} ini. Aturan mesinnya tambah atau kurang? Ucapkan satu kata.`;
      return `${aw}: masukkan ${l.a} ke mesin beraturan ${aturanTeks(l.d, l.arah)} pada ${g} ini, dipakai ${l.kali} kali. Keluar berapa? ${akhir}`;
    case "tabel":
      return cara === "kanvas"
        ? `${aw}: lihat tabel urutan pada ${g} ini. Dari urutan pertama ke urutan ${urut(l.n)} ada berapa lompatan? ${akhir}`
        : `${aw}: lihat tabel urutan pada ${g} ini. Bilangan pada urutan ${urut(l.n)} berapa? ${akhir}`;
    case "sebut":
      return l.kata === "membesar"
        ? `${aw}: lihat pola pada ${g} ini. Pola ini membesar atau mengecil? Ucapkan satu kata.`
        : l.kata === "mengecil"
          ? `${aw}: lihat pola pada ${g} ini. Pola ini membesar atau mengecil? Ucapkan satu kata.`
          : `${aw}: lihat pola pada ${g} ini. Selisih tetap antara dua bilangan yang berurutan disebut apa? Ucapkan satu kata.`;
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  return kapKal(ucapkan(kalimatTanyaMentah(d, cara)));
}
function kalimatTanyaMentah(d: LangkahDasar, cara: Cara): string {
  switch (d.tipe) {
    case "beda":
      return cara === "klik" ? "Aturan pola ini yang mana?" : "Berapa beda tiap dua bilangan yang berurutan?";
    case "rantai":
      return "Bilangan berikutnya berapa?";
    case "mesin":
      if (cara === "suara" && d.operasi) return "Aturan mesin tambah atau kurang?";
      return `Mesin beraturan ${aturanTeks(d.d, d.arah)} dipakai ${d.kali} kali. Keluar berapa?`;
    case "tabel":
      return cara === "kanvas" ? `Dari urutan pertama ke urutan ${urut(d.n)} ada berapa lompatan?` : `Bilangan pada urutan ${urut(d.n)} berapa?`;
    case "sebut":
      return d.kata === "beda" ? "Selisih tetap itu disebut apa?" : "Pola ini membesar atau mengecil?";
  }
}

/** Petunjuk saat jawaban salah: mengarahkan tanpa menyebut hasil benar (tanpa digit). `jawab`: kata, bilangan, atau aturan yang dipilih atau diucapkan, atau angka yang ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number): string {
  if (l.tipe === "salah") {
    if (String(jawab) === l.jawabTokoh) return `Itu jawaban ${l.tokoh}${l.betul ? "" : " yang keliru"}. Pikirkan lagi apa yang ${l.tokoh} lakukan.`;
    return petunjukSalah(l.dasar, cara, jawab);
  }
  switch (l.tipe) {
    case "beda":
      return cara === "klik"
        ? "Beda dihitung dari dua bilangan yang berurutan, bukan dari bilangan yang berjauhan. Periksa juga apakah bilangannya makin besar atau makin kecil."
        : "Hitung selisih dua bilangan yang berurutan, bukan dua bilangan yang berjauhan. Periksa lagi pasangan berikutnya.";
    case "rantai":
      return "Hitung dulu beda dari dua bilangan yang berurutan. Lalu lanjutkan satu loncatan dari bilangan yang terakhir.";
    case "mesin":
      if (cara === "suara" && l.operasi) return "Bandingkan bilangan yang masuk dengan bilangan yang keluar: makin besar atau makin kecil? Dari situ tentukan aturannya.";
      return "Mesin memakai aturan yang sama pada tiap bilangan. Pakai aturannya satu kali, lalu masukkan hasilnya lagi sebanyak yang diminta.";
    case "tabel":
      return cara === "kanvas"
        ? "Lompatan dihitung dari urutan pertama. Banyaknya satu kurang dari nomor urutan yang ditanyakan."
        : "Dari urutan pertama ke urutan yang ditanyakan, banyak lompatan satu kurang dari nomor urutannya. Hitung lompatannya dulu, lalu pakai bedanya.";
    case "sebut":
      return l.kata === "beda"
        ? "Perhatikan selisih yang sama pada setiap pasangan bilangan berurutan. Ucapkan namanya."
        : "Perhatikan aturan polanya: tambah atau kurang. Pola dengan beda tambah dan beda kurang punya nama yang berlawanan.";
  }
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
const sebutPola = (d: LangkahDasar): string => `pola: ${daftarBil(tigaPertama(d))}`;
/** Isi kartu kata untuk tahap Abstract (kata dan angka, tanpa emoji). Baris terakhir selalu berakhir pada hal yang dicari. Baris pertama dan terakhir juga menjadi keterangan gambar Concrete dan Pictorial. */
export function barisKartu(l: LangkahDasar, cara?: Cara): string[] {
  const pil = (x?: Pil) => `pilihan: ${x?.join(", ") ?? ""}`;
  switch (l.tipe) {
    case "beda":
      return [sebutPola(l), cara === "klik" ? pil(l.pil) : "beda dari dua bilangan berurutan", cara === "klik" ? "aturan pola: ?" : "beda: ?"];
    case "rantai":
      return [sebutPola(l), cara === "klik" ? pil(l.pil) : "lanjutkan dengan beda yang sama", "bilangan berikutnya: ?"];
    case "mesin":
      if (cara === "suara" && l.operasi) return [`masuk: ${l.a}`, `dipakai ${l.kali} kali, keluar: ${hasilTugas(l)}`, "aturan mesin: ?"];
      return [`masuk: ${l.a}`, cara === "klik" ? pil(l.pil) : `aturan mesin: ${aturanTeks(l.d, l.arah)}, dipakai ${l.kali} kali`, "keluar: ?"];
    case "tabel":
      return [
        `urutan: 1, 2, 3, ${l.n}`,
        `bilangan: ${daftarBil(tigaPertama(l))}, ?`,
        ...(cara === "klik" ? [pil(l.pil)] : []),
        cara === "kanvas" ? `lompatan ke urutan ${urut(l.n)}: ?` : `bilangan urutan ${urut(l.n)}: ?`,
      ];
    case "sebut":
      return [sebutPola(l), l.kata === "beda" ? "selisih tetap tiap pasangan" : l.arah === "naik" ? "beda: tambah" : "beda: kurang", "kata yang dicari: ?"];
  }
}
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);
