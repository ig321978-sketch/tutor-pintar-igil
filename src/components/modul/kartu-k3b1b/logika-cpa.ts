/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 3 Bab 1 Sub-Bab B "Kartu Harga Bu Wati" (tempat angka), cerita Toko Kelontong Pak Joko:
 * jenis tugas, kunci, pilihan, instruksi (tanpa digit), dan petunjuk salah. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-kartu-k3b1b.mjs.
 * Jawaban tidak hanya angka: memilih angka, jumlah, bilangan, atau kata, memilih bentuk uraian dan tabel yang tepat, satu angka di kanvas,
 * dan satu kata atau bilangan pendek yang diucapkan. Semua kunci dihitung dari data bilangan tiga angka (bukan kunci tetap).
 */
import type { Cara } from "../lemari-k1b1a/logika";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";

export type Rupa = "benda" | "diagram" | "lambang";
/** Tempat angka: 0 ratusan, 1 puluhan, 2 satuan. */
export type Tempat = 0 | 1 | 2;
export const URUT_TEMPAT: Tempat[] = [0, 1, 2];
export const NAMA_TEMPAT = ["ratusan", "puluhan", "satuan"] as const;
/** Bobot tiap tempat: satu angka di tempat itu mewakili angka dikali bobotnya. */
export const BOBOT = [100, 10, 1] as const;
/** Warna tempat: ratusan hijau, puluhan biru, satuan merah. */
export const WARNA_TEMPAT = ["#22C55E", "#3B82F6", "#EF4444"] as const;
export const WARNA_TULIS = ["#166534", "#1D4ED8", "#B91C1C"] as const;

export type Nama = "ratusan" | "puluhan" | "satuan" | "nol" | "kosong" | "sama" | "berbeda";
export const URUT_NAMA: Nama[] = ["ratusan", "puluhan", "satuan", "nol", "kosong", "sama", "berbeda"];
/** Tulisan tombol untuk tiap kata jawaban. */
export const LABEL_NAMA: Record<Nama, string> = { ratusan: "ratusan", puluhan: "puluhan", satuan: "satuan", nol: "nol", kosong: "kosong", sama: "sama", berbeda: "berbeda" };

/* ------------------------------ Kata bilangan ------------------------------ */
const SATUAN = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
const PULUHAN = ["", "", "dua puluh", "tiga puluh", "empat puluh", "lima puluh", "enam puluh", "tujuh puluh", "delapan puluh", "sembilan puluh"];
/** Bilangan nol sampai 999 dalam kata (tanpa digit). */
export function kata(n: number): string {
  if (n < 10) return SATUAN[n] ?? String(n);
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${SATUAN[n - 10]} belas`;
  if (n < 100) return `${PULUHAN[Math.floor(n / 10)]}${n % 10 ? ` ${SATUAN[n % 10]}` : ""}`;
  const h = Math.floor(n / 100);
  const sisa = n % 100;
  const depan = h === 1 ? "seratus" : `${SATUAN[h]} ratus`;
  return sisa === 0 ? depan : `${depan} ${kata(sisa)}`;
}

/* ------------------------------ Hitungan tempat angka ------------------------------ */
/** Angka (0 sampai 9) di tempat t pada bilangan tiga angka n. */
export const angkaDi = (n: number, t: Tempat): number => Math.floor(n / BOBOT[t]) % 10;
/** Tiga angka bilangan n: [ratusan, puluhan, satuan]. */
export const angkaTiga = (n: number): [number, number, number] => [angkaDi(n, 0), angkaDi(n, 1), angkaDi(n, 2)];
/** Jumlah yang diwakili angka di tempat t. */
export const jumlahDi = (n: number, t: Tempat): number => angkaDi(n, t) * BOBOT[t];
/** Bilangan dari banyak kartu seratus, sepuluh, dan satu. */
export const bilanganDari = (h: number, p: number, s: number): number => h * 100 + p * 10 + s;
/** Berapa kali angka d muncul pada bilangan n. */
export const banyakMuncul = (n: number, d: number): number => angkaTiga(n).filter((x) => x === d).length;
/** Tempat pertama (paling kiri) tempat angka d muncul pada n, atau -1. */
export const tempatKiri = (n: number, d: number): number => angkaTiga(n).indexOf(d);
/** Tempat angka d bila hanya muncul satu kali pada n. */
export const tempatTunggal = (n: number, d: number): Tempat => tempatKiri(n, d) as Tempat;
/** Nama benda pada tempat t menurut rupanya: kartu (benda), balok (diagram). */
export const NAMA_KARTU = ["kartu seratus", "kartu sepuluh", "kartu satu"] as const;
export const NAMA_BALOK = ["lempeng", "batang", "kotak kecil"] as const;

/* ------------------------------ Langkah ------------------------------ */
/** Angka di tempat t pada bilangan n (kanvas, klik, dan suara = angka). */
export type LTempat = { tipe: "tempat"; n: number; t: Tempat; ik?: string };
/** Angka di tempat t mewakili berapa (klik dan suara = jumlah). */
export type LMewakili = { tipe: "mewakili"; n: number; t: Tempat; ik?: string };
/** Banyak kartu (benda) atau balok (diagram) pada tempat t (kanvas, klik, dan suara = angka). */
export type LBanyak = { tipe: "banyak"; n: number; t: Tempat; ik?: string };
/** Kartu atau balok disusun menjadi bilangan (klik = pilih bilangan). */
export type LSusun = { tipe: "susun"; h: number; p: number; s: number; ik?: string };
/** Pilih bentuk uraian yang tepat untuk bilangan n (klik). */
export type LUraian = { tipe: "uraian"; n: number; ik?: string };
/** Lengkapi bentuk uraian: angka di tempat t hilang (kanvas, klik, dan suara = angka). */
export type LIsi = { tipe: "isi"; n: number; t: Tempat; ik?: string };
/** Pilih tabel tiga tempat yang diisi dengan angka yang benar (klik). */
export type LTabel = { tipe: "tabel"; n: number; ik?: string };
/** Tempat t tidak punya kartu: apa yang ditulis di tempat itu (klik dan suara = nol). */
export type LNol = { tipe: "nol"; n: number; t: Tempat; ik?: string };
/** Angka d ada di tempat apa (klik dan suara = nama tempat); angka d hanya satu kali pada n. */
export type LDi = { tipe: "di"; n: number; d: number; ik?: string };
/** Angka d muncul dua kali pada n: kanvas = berapa kali muncul, klik dan suara = tempat yang mewakili jumlah lebih besar. */
export type LDua = { tipe: "dua"; n: number; d: number; ik?: string };
/** Dua bilangan memakai angka yang sama: sama atau berbeda (klik dan suara). */
export type LBeda = { tipe: "beda"; a: number; b: number; ik?: string };
export type LangkahDasar = LTempat | LMewakili | LBanyak | LSusun | LUraian | LIsi | LTabel | LNol | LDi | LDua | LBeda;
/**
 * Klaim tokoh pada tugas Cari kesalahan. `mewakili`: tokoh bilang angka di tempat t pada n mewakili `katak`.
 * `uraian`: tokoh menulis bentuk uraian n sebagai tiga bagian. `tabel`: tokoh mengisi tabel tiga tempat dengan tiga bilangan.
 */
export type Klaim =
  | { jenis: "mewakili"; n: number; t: Tempat; katak: number }
  | { jenis: "uraian"; n: number; bagian: [number, number, number] }
  | { jenis: "tabel"; n: number; isi: [number, number, number] };
export type LangkahSalah = { tipe: "salah"; tokoh: string; klaim: Klaim; kataTokoh: string; alasan: [string, string, string]; benar: number; keliru: string; ik?: string };
export type Langkah = LangkahDasar | LangkahSalah;

export type Metode = "igil" | "tempat" | "kartu" | "uraian";
export const URUT_METODE: Metode[] = ["igil", "tempat", "kartu", "uraian"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Lihat Tempat, Sebut Jumlahnya",
  tempat: "Place Value: Tempat Angka",
  kartu: "Montessori Cards: Kartu Angka Montessori",
  uraian: "Expanded Form: Bentuk Uraian",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F441}", tempat: "\u{1F4CD}", kartu: "\u{1F4DD}", uraian: "\u{2795}" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar | null => (l.tipe === "salah" ? null : l);

/** Klaim tokoh benar? */
export function klaimBenar(k: Klaim): boolean {
  if (k.jenis === "mewakili") return k.katak === jumlahDi(k.n, k.t);
  const [h, p, s] = angkaTiga(k.n);
  if (k.jenis === "uraian") return k.bagian[0] === h * 100 && k.bagian[1] === p * 10 && k.bagian[2] === s;
  return k.isi[0] === h && k.isi[1] === p && k.isi[2] === s;
}

/* ------------------------------ Kunci ------------------------------ */
export type Kunci = { jenis: "angka"; n: number } | { jenis: "jumlah"; n: number } | { jenis: "bilangan"; n: number } | { jenis: "nama"; nama: Nama };

/** Kunci tiap tugas menurut caranya, dihitung dari data. Null bila tugas selesai lewat pilihan khusus (Cari kesalahan, bentuk uraian, tabel). */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  switch (l.tipe) {
    case "salah":
    case "uraian":
    case "tabel":
      return null;
    case "tempat":
      return { jenis: "angka", n: angkaDi(l.n, l.t) };
    case "mewakili":
      return { jenis: "jumlah", n: jumlahDi(l.n, l.t) };
    case "banyak":
      return { jenis: "angka", n: angkaDi(l.n, l.t) };
    case "susun":
      return { jenis: "bilangan", n: bilanganDari(l.h, l.p, l.s) };
    case "isi":
      return { jenis: "angka", n: angkaDi(l.n, l.t) };
    case "nol":
      return { jenis: "nama", nama: "nol" };
    case "di":
      return { jenis: "nama", nama: NAMA_TEMPAT[tempatKiri(l.n, l.d)] };
    case "dua":
      return cara === "kanvas" ? { jenis: "angka", n: banyakMuncul(l.n, l.d) } : { jenis: "nama", nama: NAMA_TEMPAT[tempatKiri(l.n, l.d)] };
    case "beda":
      return { jenis: "nama", nama: l.a === l.b ? "sama" : "berbeda" };
  }
}

/**
 * Apakah tugas langsung siap dijawab (tanpa kegiatan lebih dulu)? Kanvas dan suara: ya (gambar sudah jadi). Klik: bila tugas punya jawaban pilihan;
 * tugas lain memakai pilihan khusus. Tidak bergantung pada rupa, sehingga tombol tidak macet pada lambang.
 */
export function siapLangsung(l: Langkah, _rupa: Rupa, cara: Cara): boolean {
  if (cara !== "klik") return true;
  return kunciJawab(l, cara) !== null;
}

/* ------------------------------ Pilihan ------------------------------ */
/** Pilihan nama di sekitar kunci, selalu memuat kunci. */
export function pilihanNamaDari(nama: Nama): Nama[] {
  if (nama === "ratusan" || nama === "puluhan" || nama === "satuan") return ["ratusan", "puluhan", "satuan"];
  if (nama === "nol" || nama === "kosong") return ["nol", "kosong"];
  return ["sama", "berbeda"];
}
/** Pilihan angka (empat) selalu memuat kunci dan berada dalam satu sampai sembilan, urut naik. */
export function pilihanAngka(n: number): number[] {
  const kandidat = [n - 2, n - 1, n + 1, n + 2, n + 3, n - 3, n + 4].filter((x) => x >= 1 && x <= 9 && x !== n);
  return [n, ...kandidat.slice(0, 3)].sort((a, b) => a - b);
}
/** Pilihan jumlah untuk angka d: d sendiri, sepuluh kalinya, dan seratus kalinya (tiga pilihan, urut naik). */
export function pilihanJumlah(n: number): number[] {
  const d = String(n).replace(/0+$/, "");
  const dasar = Number(d || "0");
  return [dasar, dasar * 10, dasar * 100].sort((a, b) => a - b);
}
/** Pilihan bilangan (empat) memuat bilangan benar dan susunan yang sering keliru, urut naik. */
export function pilihanBilangan(n: number): number[] {
  const [h, p, s] = angkaTiga(n);
  const tanpaNol = Number(`${h}${p}${s}`.replace(/0/g, "") || "0");
  const kandidat = [tanpaNol, h * 100 + s * 10 + p, p * 100 + h * 10 + s, s * 100 + p * 10 + h, h * 10 + p, n + 10, n - 10, n + 100, n - 100].filter((x) => x > 0 && x !== n);
  const unik: number[] = [];
  for (const x of kandidat) if (!unik.includes(x) && x !== n) unik.push(x);
  return [n, ...unik.slice(0, 3)].sort((a, b) => a - b);
}
/** Bentuk uraian tiga pilihan untuk bilangan n: `benar` = indeks yang tepat (diputar dari n supaya tidak selalu di tempat yang sama). */
export function opsiUraian(n: number): { opsi: string[]; benar: number } {
  const [h, p, s] = angkaTiga(n);
  const tepat = `${h * 100} + ${p * 10} + ${s}`;
  const calon = [`${h} + ${p} + ${s}`, `${p * 100} + ${h * 10} + ${s}`, `${h * 100} + ${s * 10} + ${p}`, `${h * 10} + ${p * 10} + ${s}`];
  const salah: string[] = [];
  for (const c of calon) if (c !== tepat && !salah.includes(c)) salah.push(c);
  const geser = 1 + (n % 2);
  const opsi = [...salah.slice(0, geser), tepat, ...salah.slice(geser, 2)];
  return { opsi, benar: opsi.indexOf(tepat) };
}
/** Tabel tiga pilihan untuk bilangan n (tiga isian tiap tabel): `benar` = indeks yang tepat. Salah satu tabel diisi jumlah (bukan angka). */
export function opsiTabel(n: number): { opsi: [number, number, number][]; benar: number } {
  const [h, p, s] = angkaTiga(n);
  const tepat: [number, number, number] = [h, p, s];
  const calon: [number, number, number][] = [[h * 100, p * 10, s], [s, p, h], [p, h, s], [h, s, p]];
  const salah: [number, number, number][] = [];
  for (const c of calon) if (c.join() !== tepat.join() && !salah.some((x) => x.join() === c.join())) salah.push(c);
  const geser = 1 + (n % 2);
  const opsi = [...salah.slice(0, geser), tepat, ...salah.slice(geser, 2)];
  return { opsi, benar: opsi.findIndex((x) => x.join() === tepat.join()) };
}
/** Urutan acak tetap (bukan urutan benar) bagi sejumlah pilihan. */
export function acakTetap(n: number, benar: number[]): number[] {
  const dasar = Array.from({ length: n }, (_, i) => i);
  for (let geser = 1; geser < n + 3; geser += 1) {
    const kandidat = dasar.map((i) => (i * 2 + geser) % n);
    if (new Set(kandidat).size === n && kandidat.some((v, i) => v !== benar[i])) return kandidat;
  }
  return dasar.map((i) => (i + 1) % n);
}

/* ------------------------------ Kalimat ------------------------------ */
const bendaTempat = (t: Tempat, rupa: Rupa): string => (rupa === "benda" ? NAMA_KARTU[t] : rupa === "diagram" ? NAMA_BALOK[t] : NAMA_TEMPAT[t]);

/** Kalimat yang menjelaskan jawaban benar (tanpa digit). */
export function kalimatKunci(l: Langkah, cara: Cara, rupa: Rupa = "benda"): string {
  switch (l.tipe) {
    case "salah":
      return klaimBenar(l.klaim) ? `Jawaban ${l.tokoh} memang benar.` : `Jawaban ${l.tokoh} keliru.`;
    case "tempat":
      return `Angka di tempat ${NAMA_TEMPAT[l.t]} adalah ${kata(angkaDi(l.n, l.t))}.`;
    case "mewakili":
      return `Angka ${kata(angkaDi(l.n, l.t))} ada di tempat ${NAMA_TEMPAT[l.t]}, jadi mewakili ${kata(jumlahDi(l.n, l.t))}.`;
    case "banyak":
      return `Ada ${kata(angkaDi(l.n, l.t))} ${bendaTempat(l.t, rupa)}, jadi angka di tempat ${NAMA_TEMPAT[l.t]} adalah ${kata(angkaDi(l.n, l.t))}.`;
    case "susun": {
      const n = bilanganDari(l.h, l.p, l.s);
      return `${kata(l.h)} ratusan, ${kata(l.p)} puluhan, dan ${kata(l.s)} satuan tersusun menjadi ${kata(n)}.`;
    }
    case "uraian": {
      const [h, p, s] = angkaTiga(l.n);
      return `Bentuk uraian ${kata(l.n)} adalah ${kata(h * 100)} ditambah ${kata(p * 10)} ditambah ${kata(s)}.`;
    }
    case "isi":
      return `Angka yang hilang adalah ${kata(angkaDi(l.n, l.t))}, supaya bentuk uraian sama dengan ${kata(l.n)}.`;
    case "tabel": {
      const [h, p, s] = angkaTiga(l.n);
      return `Tabel diisi dengan angka tiap tempat: ${kata(h)}, ${kata(p)}, dan ${kata(s)}.`;
    }
    case "nol":
      return `Tempat ${NAMA_TEMPAT[l.t]} tidak punya kartu, jadi diisi nol supaya angka lain tetap berada di tempatnya.`;
    case "di":
      return `Angka ${kata(l.d)} ada di tempat ${NAMA_TEMPAT[tempatKiri(l.n, l.d)]}.`;
    case "dua": {
      const t = tempatKiri(l.n, l.d) as Tempat;
      return cara === "kanvas"
        ? `Angka ${kata(l.d)} muncul ${kata(banyakMuncul(l.n, l.d))} kali pada bilangan itu.`
        : `Angka ${kata(l.d)} di tempat ${NAMA_TEMPAT[t]} mewakili ${kata(l.d * BOBOT[t])}, jumlah yang paling besar.`;
    }
    case "beda":
      return l.a === l.b ? "Angkanya sama dan tempatnya sama, jadi bilangannya sama." : "Angkanya sama, tetapi tempatnya berbeda, jadi bilangannya berbeda.";
  }
}

/** Instruksi satu tugas (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  const aksi = cara === "kanvas" ? "Tulis satu angka di kanvas." : cara === "suara" ? "Ucapkan jawabannya." : "Pilih jawabannya.";
  const lihat = rupa === "benda" ? "Lihat label dan kartu di meja Bu Wati." : rupa === "diagram" ? "Lihat tabel tiga tempat dan balok." : "Lihat tabel kata.";
  switch (l.tipe) {
    case "salah":
      return `${l.tokoh} sudah menjawab tentang ${l.klaim.jenis === "mewakili" ? "jumlah yang diwakili sebuah angka" : l.klaim.jenis === "uraian" ? "bentuk uraian sebuah bilangan" : "isi tabel tiga tempat"}. Apakah jawabannya benar? Pilih alasan yang tepat.`;
    case "tempat":
      return `${lihat} Angka apa yang ada di tempat ${NAMA_TEMPAT[l.t]}? ${aksi}`;
    case "mewakili":
      return `${lihat} Angka yang ditandai ada di tempat ${NAMA_TEMPAT[l.t]}. Angka itu mewakili berapa? ${cara === "suara" ? "Ucapkan jumlahnya." : "Pilih jumlahnya."}`;
    case "banyak":
      return rupa === "lambang"
        ? `${lihat} Berapa angka di tempat ${NAMA_TEMPAT[l.t]}? ${aksi}`
        : `${lihat} Ada berapa ${bendaTempat(l.t, rupa)} pada tempat ${NAMA_TEMPAT[l.t]}? ${aksi}`;
    case "susun":
      return rupa === "lambang"
        ? `${lihat} Tabel kata menyebut ratusan, puluhan, dan satuan. Bilangan apa yang tersusun? Pilih bilangannya.`
        : `${lihat} ${rupa === "benda" ? "Kartu" : "Balok"} di tiap tempat disusun menjadi satu bilangan. Bilangan apa yang tersusun? Pilih bilangannya.`;
    case "uraian":
      return `${lihat} Pilih bentuk uraian yang tepat untuk bilangan itu.`;
    case "isi":
      return `${lihat} Bentuk uraian bilangan itu belum lengkap. Angka berapa yang hilang pada bagian bertanda tanya? ${aksi}`;
    case "tabel":
      return `${lihat} Pilih tabel yang diisi dengan benar. Tabel diisi dengan angka, bukan dengan jumlahnya.`;
    case "nol":
      return cara === "suara"
        ? `${lihat} Tempat ${NAMA_TEMPAT[l.t]} tidak punya ${rupa === "lambang" ? "isi" : rupa === "benda" ? "kartu" : "balok"} sama sekali. Apa yang harus ditulis di tempat itu? Ucapkan nol, atau kosong.`
        : `${lihat} Tempat ${NAMA_TEMPAT[l.t]} tidak punya ${rupa === "lambang" ? "isi" : rupa === "benda" ? "kartu" : "balok"} sama sekali. Apa yang harus ditulis di tempat itu? Pilih jawabannya.`;
    case "di":
      return cara === "suara"
        ? `${lihat} Angka ${kata(l.d)} ada di tempat apa? Ucapkan ratusan, puluhan, atau satuan.`
        : `${lihat} Angka ${kata(l.d)} ada di tempat apa? Pilih jawabannya.`;
    case "dua":
      return cara === "kanvas"
        ? `${lihat} Angka ${kata(l.d)} ditandai di bilangan itu. Berapa kali angka itu muncul? Tulis satu angka di kanvas.`
        : cara === "suara"
          ? `${lihat} Angka ${kata(l.d)} muncul dua kali. Di tempat mana angka itu mewakili jumlah yang paling besar? Ucapkan ratusan, puluhan, atau satuan.`
          : `${lihat} Angka ${kata(l.d)} muncul dua kali. Di tempat mana angka itu mewakili jumlah yang paling besar? Pilih jawabannya.`;
    case "beda":
      return cara === "suara"
        ? `${lihat} Dua label memakai angka yang sama. Bilangannya sama atau berbeda? Ucapkan sama, atau berbeda.`
        : `${lihat} Dua label memakai angka yang sama. Bilangannya sama atau berbeda? Pilih jawabannya.`;
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  if (cara === "kanvas") return "Tulis jawabannya sebagai satu angka.";
  if (cara === "suara") return l.tipe === "mewakili" ? "Ucapkan jumlahnya." : l.tipe === "tempat" || l.tipe === "banyak" || l.tipe === "isi" ? "Ucapkan angkanya." : "Ucapkan satu kata.";
  return "Pilih jawaban yang tepat.";
}

/* ------------------------------ Petunjuk salah ------------------------------ */
/** Petunjuk saat pilihan bentuk uraian atau tabel belum benar. */
export function petunjukKetuk(l: LUraian | LTabel): string {
  return l.tipe === "uraian"
    ? "Bentuk uraian menjumlahkan jumlah yang diwakili tiap angka: ratusan, puluhan, lalu satuan. Setiap bagian memakai angka pada tempatnya, dan nol tetap ditulis."
    : "Tabel hanya diisi satu angka di tiap tempat, dari ratusan ke satuan. Angka tidak boleh diganti dengan jumlah yang diwakilinya, dan urutannya tidak boleh terbalik.";
}

/** Petunjuk saat jawaban salah: menunjuk kesalahannya (tanpa digit). `jawab`: kata yang dipilih atau diucapkan, atau angka yang dipilih atau ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number, rupa: Rupa = "benda"): string {
  void rupa;
  if (l.tipe === "salah") return `Lihat lagi. ${l.keliru}`;
  if (l.tipe === "uraian" || l.tipe === "tabel") return petunjukKetuk(l);
  if (typeof jawab === "number") {
    const k = kunciJawab(l, cara);
    const kurang = k !== null && (k.jenis === "angka" || k.jenis === "jumlah" || k.jenis === "bilangan") && jawab < k.n;
    const arah = kurang ? "Jawabanmu masih kurang." : "Jawabanmu terlalu besar.";
    switch (l.tipe) {
      case "tempat":
        return `Baca bilangan dari kiri: ratusan, lalu puluhan, lalu satuan. Cari angka di tempat yang ditanyakan. ${arah}`;
      case "mewakili":
        return `Jumlah yang diwakili sebuah angka bergantung pada tempatnya: di ratusan angka itu dikali seratus, di puluhan dikali sepuluh, di satuan angka itu sendiri. ${arah}`;
      case "banyak":
        return `Hitung ${rupa === "benda" ? "kartu" : rupa === "diagram" ? "balok" : "isi"} pada tempat yang ditanyakan satu per satu. ${arah}`;
      case "susun":
        return "Susun dari ratusan, lalu puluhan, lalu satuan. Tempat yang tidak punya isi tetap ditulis nol.";
      case "isi":
        return `Bentuk uraian menjumlahkan ratusan, puluhan, dan satuan. Bandingkan bagian yang kosong dengan angka pada tempat yang sama. ${arah}`;
      case "dua":
        return "Cari angka yang ditandai pada tiap tempat, lalu hitung berapa kali muncul.";
      default:
        return "Periksa lagi dengan teliti.";
    }
  }
  switch (l.tipe) {
    case "nol":
      return "Tempat yang tidak punya isi tetap harus ditulis nol, supaya angka lain tetap berada di tempatnya. Tempat tidak boleh dikosongkan.";
    case "di":
      return "Baca bilangan dari kiri: tempat pertama ratusan, tempat tengah puluhan, dan tempat terakhir satuan.";
    case "dua":
      return "Angka yang sama mewakili jumlah yang lebih besar bila ada di tempat yang lebih kiri. Ratusan lebih besar daripada puluhan, dan puluhan lebih besar daripada satuan.";
    case "beda":
      return "Bandingkan tempat tiap angka pada dua label. Bila angkanya sama tetapi tempatnya berbeda, bilangannya berbeda.";
    default:
      return "Periksa lagi dengan teliti.";
  }
}
