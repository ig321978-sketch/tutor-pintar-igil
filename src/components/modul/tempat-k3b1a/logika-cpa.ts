/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 3 Bab 1 Sub-Bab A "Toples Permen Pak Joko" (bilangan tiga angka):
 * jenis tugas, kunci, pilihan, instruksi (tanpa digit), dan petunjuk salah. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-tempat-k3b1a.mjs.
 * Jawaban beragam: memilih bilangan, menulis satu angka (angka pada satu tempat, banyak balok, butir yang tersisa) di kanvas, dan mengucapkan satu kata
 * (nama tempat, satuan kemasan) atau bilangan pendek (nama bilangan). Kunci dihitung dari data (isi kemasan, banyak balok, bilangan), bukan kunci tetap.
 */
import type { Cara } from "../lemari-k1b1a/logika";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";

export type Rupa = "benda" | "diagram" | "lambang";
const kapital = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);
export const HURUF = ["A", "B", "C", "D", "E", "F"] as const;
export const huruf = (i: number): string => HURUF[i] ?? "?";

/* ------------------------------ Kata bilangan ------------------------------ */
const SAT = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"] as const;
/** Nama bilangan 0 sampai 999 dalam kata (tanpa digit): seratus, dua ratus lima, tujuh ratus enam belas. */
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

/* ------------------------------ Tempat dan isi ------------------------------ */
export const NAMA_TEMPAT = ["ratusan", "puluhan", "satuan"] as const;
export type Tempat = 0 | 1 | 2;
/** Banyak benda pada tiap tempat: ratusan (toples atau lempeng), puluhan (bungkus atau batang), satuan (butir atau kubus). */
export type Isi = { r: number; p: number; s: number };
/** Bilangan yang ditunjukkan isi (juga bila belum ditukar: tiap sepuluh satuan sama dengan satu puluhan). */
export const jumlahIsi = (i: Isi): number => i.r * 100 + i.p * 10 + i.s;
export const angkaDi = (n: number, t: Tempat): number => (t === 0 ? Math.floor(n / 100) : t === 1 ? Math.floor(n / 10) % 10 : n % 10);
export const isiDari = (n: number): Isi => ({ r: angkaDi(n, 0), p: angkaDi(n, 1), s: angkaDi(n, 2) });
export const banyakDi = (i: Isi, t: Tempat): number => (t === 0 ? i.r : t === 1 ? i.p : i.s);

/** Nama satuan kemasan menurut rupa: permen (benda dan lambang) atau balok polos (diagram). */
export const SATUAN_KEMASAN = {
  permen: ["toples", "bungkus", "butir"],
  balok: ["lempeng", "batang", "kubus"],
} as const;
export const satuanDi = (rupa: Rupa, t: Tempat): string => (rupa === "diagram" ? SATUAN_KEMASAN.balok[t] : SATUAN_KEMASAN.permen[t]);
export const namaBalok = (t: Tempat): string => SATUAN_KEMASAN.balok[t];

/**
 * Isi kemasan (hanya dasar Cari kesalahan, klik): toples, bungkus, dan butir lepas (atau lempeng, batang, kubus). Bilangannya dibaca dari kiri.
 */
export type LKem = { tipe: "kem"; isi: Isi };
/**
 * Metode IGIL "Tukar Sepuluh, Baca dari Kiri": butir lepas (atau kubus) sebanyak sebelas sampai sembilan belas, atau bungkus (atau batang) sebelas sampai enam belas, belum ditukar.
 * klik: bilangan seluruhnya; kanvas: butir (atau bungkus) yang tersisa setelah sepuluh ditukar; suara: sepuluh ditukar menjadi satu apa (bungkus atau toples).
 */
export type LTukar = { tipe: "tukar"; isi: Isi; dari: "butir" | "bungkus" };
/** Balok Dienes: lempeng, batang, kubus. klik: bilangan; kanvas: banyak balok di tempat `kanvas`; suara: banyak balok di tempat `suara` (bilangan pendek). */
export type LBalok = { tipe: "balok"; isi: Isi; kanvas: Tempat; suara: Tempat };
/** Tabel Tiga Tempat. klik: bilangan; kanvas: angka di tempat `kanvas`; suara: nama tempat pada kolom `suara` yang disorot. */
export type LTabel = { tipe: "tabel"; n: number; kanvas: Tempat; suara: Tempat };
/** Nama Bilangan. klik: bilangan dari namanya; kanvas: angka di tempat `kanvas` dari nama; suara: ucapkan nama dari bilangan yang tampak. */
export type LNama = { tipe: "nama"; n: number; kanvas: Tempat };
export type LangkahDasar = LKem | LTukar | LBalok | LTabel | LNama;
/** Cari kesalahan: tokoh sudah menjawab bilangan dari `dasar`. Anak menilai benar atau salah, memilih alasan, lalu menjawab sendiri. */
export type LangkahSalah = {
  tipe: "salah";
  dasar: LKem | LBalok | LNama;
  tokoh: string;
  kataTokoh: string;
  jawabTokoh: string;
  alasan: [string, string, string];
  benar: number;
  keliru: string;
  betul?: boolean;
};
export type Langkah = LangkahDasar | LangkahSalah;
export type Metode = "igil" | "balok" | "tabel" | "nama";
export const URUT_METODE: Metode[] = ["igil", "balok", "tabel", "nama"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Tukar Sepuluh, Baca dari Kiri",
  balok: "Dienes Blocks: Balok Dienes",
  tabel: "Place-Value Chart: Tabel Tiga Tempat",
  nama: "Number Names: Nama Bilangan",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F36C}", balok: "\u{1F9F1}", tabel: "\u{1F5C2}", nama: "\u{1F5E3}" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);

/* ------------------------------ Kunci ------------------------------ */
export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: string };
const angka = (n: number): Kunci => ({ jenis: "angka", n });
const nama = (s: string): Kunci => ({ jenis: "nama", nama: s });

/** Kunci tiap tugas menurut caranya, dihitung dari data. `rupa` hanya menentukan nama satuan kemasan pada tugas Tukar Sepuluh (suara). */
export function kunciJawab(l: Langkah, cara: Cara, rupa: Rupa = "benda"): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik", rupa);
  switch (l.tipe) {
    case "kem":
      return angka(jumlahIsi(l.isi));
    case "tukar":
      if (cara === "klik") return angka(jumlahIsi(l.isi));
      if (cara === "kanvas") return angka(l.dari === "butir" ? l.isi.s - 10 : l.isi.p - 10);
      return nama(satuanDi(rupa, l.dari === "butir" ? 1 : 0));
    case "balok":
      if (cara === "klik") return angka(jumlahIsi(l.isi));
      return angka(banyakDi(l.isi, cara === "kanvas" ? l.kanvas : l.suara));
    case "tabel":
      if (cara === "klik") return angka(l.n);
      if (cara === "kanvas") return angka(angkaDi(l.n, l.kanvas));
      return nama(NAMA_TEMPAT[l.suara]);
    case "nama":
      if (cara === "kanvas") return angka(angkaDi(l.n, l.kanvas));
      return angka(l.n);
  }
}

/** Apakah tugas langsung siap dijawab? Semua tugas punya kunci, kecuali Cari kesalahan yang memakai kegiatan lebih dulu. Tidak bergantung pada rupa. */
export function siapLangsung(l: Langkah, rupa: Rupa, cara: Cara): boolean {
  void rupa;
  if (l.tipe === "salah") return false;
  return kunciJawab(l, cara) !== null;
}

/* ------------------------------ Pilihan ------------------------------ */
/** Pengecoh khas untuk bilangan `n`: angka nol dibuang, tempat tertukar, atau selisih sepuluh dan seratus. Berurut, tanpa kembar, 1 sampai 999. */
export function pengecoh(n: number, awal?: number): number[] {
  const r = angkaDi(n, 0);
  const p = angkaDi(n, 1);
  const s = angkaDi(n, 2);
  const buang = Number(String(n).replace(/0/g, "") || "0");
  const calon = [awal ?? -1, buang, r * 100 + s * 10 + p, p * 100 + r * 10 + s, s * 100 + p * 10 + r, n + 10, n - 10, n + 100, n - 100, n + 1, n - 1];
  const hasil: number[] = [];
  for (const c of calon) if (Number.isInteger(c) && c >= 1 && c <= 999 && c !== n && !hasil.includes(c)) hasil.push(c);
  return hasil;
}
/** Sisipkan jawaban benar di tempat yang bukan pertama (deterministik). */
function sisipkan(benar: string, lain: string[], geser: number): string[] {
  const p = 1 + (geser % lain.length);
  return [...lain.slice(0, p), benar, ...lain.slice(p)];
}
/** Tiga pilihan untuk tugas klik (bilangan): kunci tidak pernah di tombol pertama, dan jawaban tokoh (Cari kesalahan) selalu ikut. */
export function pilihanKlik(l: Langkah): string[] {
  const k = kunciJawab(l, "klik");
  if (!k || k.jenis !== "angka") return [];
  const awal = l.tipe === "salah" ? Number(l.jawabTokoh) : undefined;
  const [a, b] = pengecoh(k.n, awal);
  return sisipkan(String(k.n), [String(a), String(b)], k.n);
}
/** Pilihan cadangan untuk tugas suara (kata atau bilangan dalam kata). */
export function pilihanSuara(l: Langkah, cara: Cara, rupa: Rupa = "benda"): string[] {
  const k = kunciJawab(l, cara, rupa);
  if (!k) return [];
  const d = dasarDari(l);
  if (k.jenis === "angka") {
    const lain = d.tipe === "balok" || (d.tipe === "tukar" && cara === "kanvas") ? [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((x) => x !== k.n && Math.abs(x - k.n) <= 2).slice(0, 2) : pengecoh(k.n).slice(0, 2);
    return sisipkan(kataBil(k.n), lain.map(kataBil), k.n);
  }
  const semua: string[] = d.tipe === "tukar" ? [...(rupa === "diagram" ? SATUAN_KEMASAN.balok : SATUAN_KEMASAN.permen)] : [...NAMA_TEMPAT];
  return sisipkan(k.nama, semua.filter((x) => x !== k.nama), k.nama.length);
}
export const teksKunciPilihan = (k: Kunci): string => (k.jenis === "nama" ? k.nama : kataBil(k.n));

/* ------------------------------ Kalimat ------------------------------ */
const sebut = (rupa: Rupa): string => (rupa === "lambang" ? "kartu" : "gambar");
const namaIsi = (rupa: Rupa, isi: Isi): string => `${kataBil(isi.r)} ${satuanDi(rupa, 0)}, ${kataBil(isi.p)} ${satuanDi(rupa, 1)}, dan ${kataBil(isi.s)} ${satuanDi(rupa, 2)}`;
const bacaBilangan = (n: number): string => `${kataBil(angkaDi(n, 0))} di ratusan, ${kataBil(angkaDi(n, 1))} di puluhan, ${kataBil(angkaDi(n, 2))} di satuan, jadi ${kataBil(n)}`;

export function kalimatKunci(l: Langkah, cara: Cara, rupa: Rupa = "benda"): string {
  const d = dasarDari(l);
  const kunci = kunciJawab(l, cara, rupa);
  const n = kunci?.jenis === "angka" ? kunci.n : 0;
  switch (d.tipe) {
    case "kem":
      return `${kapital(namaIsi(rupa, d.isi))}. Baca dari kiri: ${bacaBilangan(n)}.`;
    case "tukar":
      if (cara === "klik") return `Sepuluh satuan ditukar menjadi satu puluhan, jadi seluruhnya ${kataBil(jumlahIsi(d.isi))}.`;
      if (cara === "kanvas") return d.dari === "butir" ? `Sepuluh ${satuanDi(rupa, 2)} ditukar menjadi satu ${satuanDi(rupa, 1)}, jadi ${satuanDi(rupa, 2)} lepas yang tersisa ada ${kataBil(n)}.` : `Sepuluh ${satuanDi(rupa, 1)} ditukar menjadi satu ${satuanDi(rupa, 0)}, jadi ${satuanDi(rupa, 1)} yang tersisa ada ${kataBil(n)}.`;
      return d.dari === "butir" ? `Sepuluh ${satuanDi(rupa, 2)} ditukar menjadi satu ${satuanDi(rupa, 1)}.` : `Sepuluh ${satuanDi(rupa, 1)} ditukar menjadi satu ${satuanDi(rupa, 0)}.`;
    case "balok":
      if (cara === "klik") return `${kapital(namaBlokKalimat(d.isi))}. Baca dari kiri: ${bacaBilangan(n)}.`;
      return `Ada ${kataBil(n)} ${namaBalok(cara === "kanvas" ? d.kanvas : d.suara)}, jadi angka di tempat ${NAMA_TEMPAT[cara === "kanvas" ? d.kanvas : d.suara]} adalah ${kataBil(n)}.`;
    case "tabel":
      if (cara === "klik") return `Tabel itu menunjukkan ${bacaBilangan(n)}.`;
      if (cara === "kanvas") return `Angka di tempat ${NAMA_TEMPAT[d.kanvas]} adalah ${kataBil(n)}.`;
      return `Kolom yang disorot adalah tempat ${NAMA_TEMPAT[d.suara]}.`;
    case "nama":
      if (cara === "kanvas") return `Dalam ${kataBil(d.n)}, angka di tempat ${NAMA_TEMPAT[d.kanvas]} adalah ${kataBil(n)}.`;
      return cara === "klik" ? `${kapital(kataBil(d.n))} ditulis dengan tiga angka: ${bacaBilangan(d.n)}.` : `Bilangan itu dibaca ${kataBil(d.n)}.`;
  }
}
const namaBlokKalimat = (i: Isi): string => `${kataBil(i.r)} lempeng, ${kataBil(i.p)} batang, dan ${kataBil(i.s)} kubus`;

/** Instruksi satu tugas (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const g = sebut(rupa);
  switch (l.tipe) {
    case "kem":
      return `Metode IGIL: lihat ${satuanDi(rupa, 0)}, ${satuanDi(rupa, 1)}, dan ${satuanDi(rupa, 2)} pada ${g} ini. Bilangan berapa yang ditunjukkan? Pilih bilangannya.`;
    case "tukar": {
      const [a, b, c] = [satuanDi(rupa, 0), satuanDi(rupa, 1), satuanDi(rupa, 2)];
      const kecil = l.dari === "butir" ? c : b;
      const besar = l.dari === "butir" ? b : a;
      if (cara === "klik") return `Metode IGIL: ${kecil} lepas pada ${g} ini bisa ditukar. Sepuluh ${kecil} ditukar menjadi satu ${besar}. Bilangan berapa seluruhnya? Pilih bilangannya.`;
      if (cara === "kanvas") return `Metode IGIL: ${kecil} lepas pada ${g} ini bisa ditukar. Setelah sepuluh ${kecil} ditukar menjadi satu ${besar}, berapa ${kecil} yang tersisa? Tulis satu angka di kanvas.`;
      return `Metode IGIL: ${kecil} pada ${g} ini cukup untuk ditukar. Sepuluh ${kecil} ditukar menjadi satu apa? Ucapkan satu kata.`;
    }
    case "balok":
      if (cara === "klik") return `Dienes Blocks: lihat balok pada ${g} ini. Bilangan berapa yang ditunjukkan? Pilih bilangannya.`;
      return `Dienes Blocks: lihat balok pada ${g} ini. Ada berapa ${namaBalok(cara === "kanvas" ? l.kanvas : l.suara)}? ${cara === "kanvas" ? "Tulis satu angka di kanvas." : "Ucapkan bilangannya."}`;
    case "tabel":
      if (cara === "klik") return `Place-Value Chart: lihat tabel tiga tempat pada ${g} ini. Bilangan berapa yang ditunjukkan? Pilih bilangannya.`;
      if (cara === "kanvas") return `Place-Value Chart: lihat tabel tiga tempat pada ${g} ini. Berapa angka di tempat ${NAMA_TEMPAT[l.kanvas]}? Tulis satu angka di kanvas.`;
      return `Place-Value Chart: lihat kolom yang disorot pada ${g} ini. Kolom itu tempat apa? Ucapkan namanya.`;
    case "nama":
      if (cara === "klik") return `Number Names: baca nama bilangan pada ${g} ini. Bilangan berapa yang dimaksud? Pilih bilangannya.`;
      if (cara === "kanvas") return `Number Names: baca nama bilangan pada ${g} ini. Berapa angka di tempat ${NAMA_TEMPAT[l.kanvas]}? Tulis satu angka di kanvas.`;
      return `Number Names: lihat bilangan pada ${g} ini. Bagaimana nama bilangannya? Ucapkan namanya.`;
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara, rupa: Rupa = "benda"): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "kem":
      return "Bilangan berapa yang ditunjukkan?";
    case "tukar": {
      const kecil = d.dari === "butir" ? satuanDi(rupa, 2) : satuanDi(rupa, 1);
      if (cara === "klik") return "Bilangan berapa seluruhnya?";
      if (cara === "kanvas") return `Berapa ${kecil} yang tersisa?`;
      return `Sepuluh ${kecil} ditukar menjadi satu apa?`;
    }
    case "balok":
      return cara === "klik" ? "Bilangan berapa yang ditunjukkan?" : `Ada berapa ${namaBalok(cara === "kanvas" ? d.kanvas : d.suara)}?`;
    case "tabel":
      return cara === "klik" ? "Bilangan berapa yang ditunjukkan?" : cara === "kanvas" ? `Berapa angka di tempat ${NAMA_TEMPAT[d.kanvas]}?` : "Kolom itu tempat apa?";
    case "nama":
      return cara === "klik" ? "Bilangan berapa yang dimaksud?" : cara === "kanvas" ? `Berapa angka di tempat ${NAMA_TEMPAT[d.kanvas]}?` : "Bagaimana nama bilangannya?";
  }
}

/** Petunjuk saat jawaban salah: menunjuk kesalahannya (tanpa digit). `jawab`: kata atau bilangan yang dipilih atau diucapkan, atau angka yang ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number, rupa: Rupa = "benda"): string {
  if (l.tipe === "salah") {
    if (String(jawab) === l.jawabTokoh) return `Itu jawaban ${l.tokoh}${l.betul ? "" : " yang keliru"}. ${l.keliru}`;
    return petunjukSalah(l.dasar, cara, jawab, rupa);
  }
  switch (l.tipe) {
    case "kem":
      return "Baca dari kiri: ratusan dulu, lalu puluhan, lalu satuan. Tempat yang kosong tetap diisi angka nol.";
    case "tukar":
      if (cara === "klik") return "Sepuluh yang lepas ditukar menjadi satu di tempat berikutnya. Bilangan seluruhnya tidak berubah karena penukaran.";
      if (cara === "kanvas") return "Tukar sepuluh dulu menjadi satu di tempat berikutnya. Yang tersisa adalah kelebihannya setelah sepuluh diambil.";
      return `Sepuluh yang lepas dimasukkan ke satu kemasan yang lebih besar. Sepuluh ${satuanDi(rupa, 2)} menjadi satu ${satuanDi(rupa, 1)}, sepuluh ${satuanDi(rupa, 1)} menjadi satu ${satuanDi(rupa, 0)}.`;
    case "balok":
      if (cara === "klik") return "Lempeng adalah ratusan, batang adalah puluhan, kubus adalah satuan. Hitung tiap jenis, lalu baca dari kiri dan jaga tempat yang kosong dengan nol.";
      return "Hitung hanya jenis balok yang ditanyakan. Lempeng adalah ratusan, batang adalah puluhan, dan kubus adalah satuan.";
    case "tabel":
      if (cara === "klik") return "Baca kolom dari kiri: ratusan, puluhan, lalu satuan. Kolom yang berisi nol tetap dihitung sebagai tempat.";
      if (cara === "kanvas") return "Cari kolom yang ditanyakan, lalu lihat angka di dalamnya. Dari kiri ke kanan: ratusan, puluhan, satuan.";
      return "Dari kiri ke kanan nama tempatnya ratusan, puluhan, lalu satuan. Lihat kolom yang disorot itu urutan ke berapa.";
    case "nama":
      if (cara === "klik") return "Kata ratus menunjukkan angka ratusan, kata puluh menunjukkan angka puluhan, dan angka di belakangnya satuan. Tempat yang tidak disebut diisi nol.";
      if (cara === "kanvas") return "Dengarkan kata ratus, puluh, dan angka satuannya. Cari tempat yang ditanyakan, lalu tulis angkanya.";
      return "Baca dari kiri: ratusan dulu, lalu puluhan, lalu satuan. Angka nol tidak diucapkan.";
  }
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
/** Isi kartu kata untuk tahap Abstract (kata dan angka). */
export function barisKartu(l: LangkahDasar, rupa: Rupa = "lambang"): string[] {
  switch (l.tipe) {
    case "kem":
    case "tukar":
      return [`${l.isi.r} ${satuanDi(rupa, 0)}`, `${l.isi.p} ${satuanDi(rupa, 1)}`, `${l.isi.s} ${satuanDi(rupa, 2)} lepas`];
    case "balok":
      return [`${l.isi.r} lempeng`, `${l.isi.p} batang`, `${l.isi.s} kubus`];
    case "tabel":
      return NAMA_TEMPAT.map((t, i) => `${t}: ${angkaDi(l.n, i as Tempat)}`);
    case "nama":
      return [kataBil(l.n)];
  }
}
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);
