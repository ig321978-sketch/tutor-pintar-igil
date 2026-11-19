/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 2 Bab 8 Sub-Bab B "Bintang Bu Maya" (diagram gambar), akhir cerita Pentas Seni Sekolah:
 * jenis tugas, kunci, pilihan, instruksi (tanpa digit), dan petunjuk salah. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-gambar-k2b8b.mjs.
 * Jawaban tidak hanya angka: memilih kata atau angka, mengetuk baris menurut banyaknya, menyusun langkah membaca, memilih diagram yang rapi, satu angka di kanvas,
 * dan satu kata atau bilangan pendek yang diucapkan. Semua kunci dihitung dari data diagram (bukan kunci tetap).
 */
import type { Cara } from "../lemari-k1b1a/logika";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";

export type Rupa = "benda" | "diagram" | "lambang";
export type Lambang = "bintang" | "lingkaran" | "hati" | "wajah";
export const URUT_LAMBANG: Lambang[] = ["bintang", "lingkaran", "hati", "wajah"];
export type Nama = "banyak" | "sedikit" | "lebih" | "kurang" | "sama" | "bintang" | "lingkaran" | "hati" | "wajah" | "kiri" | "kanan" | "judul" | "keterangan";
export const URUT_NAMA: Nama[] = ["banyak", "sedikit", "lebih", "kurang", "sama", "bintang", "lingkaran", "hati", "wajah", "kiri", "kanan", "judul", "keterangan"];
/** Tulisan tombol untuk tiap kata jawaban. */
export const LABEL_NAMA: Record<Nama, string> = {
  banyak: "banyak",
  sedikit: "sedikit",
  lebih: "lebih banyak",
  kurang: "lebih sedikit",
  sama: "sama banyak",
  bintang: "bintang",
  lingkaran: "lingkaran",
  hati: "hati",
  wajah: "wajah",
  kiri: "kiri",
  kanan: "kanan",
  judul: "judul",
  keterangan: "keterangan",
};
/** Warna tiap baris pada diagram (warna menandai jenis). */
export const WARNA_BARIS = ["#EF4444", "#FACC15", "#22C55E", "#3B82F6"] as const;

/* ------------------------------ Kata bilangan ------------------------------ */
const SATUAN = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
const PULUHAN = ["", "", "dua puluh", "tiga puluh", "empat puluh", "lima puluh", "enam puluh", "tujuh puluh", "delapan puluh", "sembilan puluh"];
/** Bilangan nol sampai seratus dalam kata (tanpa digit). */
export function kata(n: number): string {
  if (n < 10) return SATUAN[n] ?? String(n);
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${SATUAN[n - 10]} belas`;
  if (n < 100) return `${PULUHAN[Math.floor(n / 10)]}${n % 10 ? ` ${SATUAN[n % 10]}` : ""}`;
  if (n === 100) return "seratus";
  return String(n);
}

/* ------------------------------ Data diagram ------------------------------ */
/** Satu baris diagram: nama jenis, banyak gambar, dan (hanya Concrete) benda beremoji sebagai gambar. */
export type Baris = { nama: string; n: number; ikon?: string };
export type Diagram = { judul: string; ket: string; baris: Baris[]; lambang: Lambang };

/** Baris ke-i diketahui banyaknya. */
export const banyakBaris = (d: Diagram, i: number): number => d.baris[i].n;
/** Indeks baris menurut banyaknya (paling banyak lebih dulu bila `dari` "banyak"). Banyak yang sama dipecah menurut urutan semula. */
export const urutanBaris = (d: Diagram, dari: "banyak" | "sedikit"): number[] =>
  d.baris
    .map((_, i) => i)
    .sort((p, q) => (dari === "banyak" ? d.baris[q].n - d.baris[p].n : d.baris[p].n - d.baris[q].n) || p - q);
/** Urutan ke berapa (mulai satu) baris ke-i bila diurutkan dari yang paling banyak. */
export const urutanKe = (d: Diagram, i: number): number => urutanBaris(d, "banyak").indexOf(i) + 1;
/** Indeks baris paling panjang atau paling pendek (pertama bila ada yang sama). */
export const barisEkstrem = (d: Diagram, cari: "panjang" | "pendek"): number => urutanBaris(d, cari === "panjang" ? "banyak" : "sedikit")[0];
export const namaBanding = (a: number, b: number): "lebih" | "kurang" | "sama" => (a > b ? "lebih" : a < b ? "kurang" : "sama");
/** Urutan acak tetap (bukan urutan benar) bagi sejumlah kartu. */
export function acakTetap(n: number, benar: number[]): number[] {
  const dasar = Array.from({ length: n }, (_, i) => i);
  for (let geser = 1; geser < n + 3; geser += 1) {
    const kandidat = dasar.map((i) => (i * 2 + geser) % n);
    if (new Set(kandidat).size === n && kandidat.some((v, i) => v !== benar[i])) return kandidat;
  }
  return dasar.map((i) => (i + 1) % n);
}

/* ------------------------------ Langkah ------------------------------ */
/** Banyak gambar pada baris ke-i (klik dan suara = pilih atau ucapkan bilangannya, kanvas = tulis). */
export type LBaca = { tipe: "baca"; dg: Diagram; i: number };
/** Baris paling panjang atau paling pendek: kanvas = banyak gambar pada baris itu, klik dan suara = banyak atau sedikit. */
export type LEkstrem = { tipe: "ekstrem"; dg: Diagram; cari: "panjang" | "pendek" };
/** Dua baris dibandingkan (baris a terhadap baris b): kanvas = lebihnya (angka), klik dan suara = lebih, kurang, atau sama. */
export type LBanding = { tipe: "banding"; dg: Diagram; a: number; b: number };
/** Banyak gambar yang harus ditambah pada baris a supaya sama panjang dengan baris b (baris a lebih pendek). */
export type LTambah = { tipe: "tambah"; dg: Diagram; a: number; b: number };
/** Jumlah banyak gambar pada baris-baris yang ditandai. */
export type LJumlah = { tipe: "jumlah"; dg: Diagram; idx: number[] };
/** Baris ke-i ada di urutan ke berapa bila diurutkan dari yang paling banyak. */
export type LRank = { tipe: "rank"; dg: Diagram; i: number };
/** Ketuk baris satu per satu menurut banyaknya (klik). */
export type LUrut = { tipe: "urut"; dg: Diagram; dari: "banyak" | "sedikit" };
/** Susun langkah membaca diagram gambar dengan mengetuk (klik). */
export type LUrutBaca = { tipe: "urutbaca"; dg: Diagram };
/** Pilih diagram yang rapi (semua gambar sama bentuk, ukuran, dan jarak) di antara tiga (klik). `benar` = indeks diagram yang rapi. */
export type LRapi = { tipe: "rapi"; banyak: number; benar: number; lambang: Lambang };
/** Gambar pada baris berbentuk apa (klik dan suara). */
export type LLambang = { tipe: "lambang"; lambang: Lambang; banyak: number };
/** Bagian diagram yang ditandai: judul atau keterangan (klik dan suara). */
export type LBagian = { tipe: "bagian"; dg: Diagram; sorot: "judul" | "keterangan" };
/** Letak: nama jenis di sebelah kiri, gambar berjajar ke kanan (klik dan suara). */
export type LLetak = { tipe: "letak"; dg: Diagram; tanya: "nama" | "gambar" };
export type LangkahDasar = LBaca | LEkstrem | LBanding | LTambah | LJumlah | LRank | LUrut | LUrutBaca | LRapi | LLambang | LBagian | LLetak;
/**
 * Klaim tokoh pada tugas Cari kesalahan. `ukuran`: baris gambar besar (`besar` gambar) dan baris gambar kecil (`kecil` gambar), tokoh bilang yang `katak` paling banyak.
 * `selisih`: tokoh bilang baris `lebih` (a atau b) yang lebih banyak. `jumlah`: tokoh menyebut jumlah dua baris.
 */
export type Klaim =
  | { jenis: "ukuran"; besar: number; kecil: number; katak: "besar" | "kecil" }
  | { jenis: "selisih"; dg: Diagram; a: number; b: number; lebih: "a" | "b" }
  | { jenis: "jumlah"; dg: Diagram; a: number; b: number; jumlah: number };
export type LangkahSalah = { tipe: "salah"; tokoh: string; klaim: Klaim; kataTokoh: string; alasan: [string, string, string]; benar: number; keliru: string };
export type Langkah = LangkahDasar | LangkahSalah;

export type Metode = "igil" | "tempel" | "banding" | "detektif";
export const URUT_METODE: Metode[] = ["igil", "tempel", "banding", "detektif"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Satu Gambar, Satu Benda, Baca Urut",
  tempel: "Sticky Note Graph: Diagram Kertas Tempel",
  banding: "Row Comparing: Banding Baris",
  detektif: "Graph Detective: Detektif Diagram",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F441}", tempel: "\u{1F4DD}", banding: "\u{2696}", detektif: "\u{1F50D}" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar | null => (l.tipe === "salah" ? null : l);

/** Langkah membaca diagram gambar (urutan benar). */
export const LANGKAH_BACA = ["Baca judul", "Baca keterangan", "Baca nama jenis", "Hitung gambar"] as const;
export const urutanBaca = (): number[] => [0, 1, 2, 3];

/* ------------------------------ Hitungan dari data ------------------------------ */
export const jumlahBaris = (d: Diagram, idx: number[]): number => idx.reduce((t, i) => t + d.baris[i].n, 0);
export const selisihBaris = (d: Diagram, a: number, b: number): number => Math.abs(d.baris[a].n - d.baris[b].n);
export const tambahBaris = (l: LTambah): number => l.dg.baris[l.b].n - l.dg.baris[l.a].n;
/** Klaim tokoh benar? */
export function klaimBenar(k: Klaim): boolean {
  if (k.jenis === "ukuran") return k.katak === (k.besar > k.kecil ? "besar" : "kecil");
  if (k.jenis === "selisih") return k.lebih === (k.dg.baris[k.a].n > k.dg.baris[k.b].n ? "a" : "b");
  return k.jumlah === k.dg.baris[k.a].n + k.dg.baris[k.b].n;
}

export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: Nama };

/** Kunci tiap tugas menurut caranya, dihitung dari data. Null bila tugas selesai lewat kegiatan (mengetuk, menyusun, memilih diagram, memilih alasan). */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  switch (l.tipe) {
    case "salah":
    case "urut":
    case "urutbaca":
    case "rapi":
      return null;
    case "baca":
      return { jenis: "angka", n: banyakBaris(l.dg, l.i) };
    case "ekstrem":
      return cara === "kanvas" ? { jenis: "angka", n: banyakBaris(l.dg, barisEkstrem(l.dg, l.cari)) } : { jenis: "nama", nama: l.cari === "panjang" ? "banyak" : "sedikit" };
    case "banding":
      return cara === "kanvas" ? { jenis: "angka", n: selisihBaris(l.dg, l.a, l.b) } : { jenis: "nama", nama: namaBanding(banyakBaris(l.dg, l.a), banyakBaris(l.dg, l.b)) };
    case "tambah":
      return { jenis: "angka", n: tambahBaris(l) };
    case "jumlah":
      return { jenis: "angka", n: jumlahBaris(l.dg, l.idx) };
    case "rank":
      return { jenis: "angka", n: urutanKe(l.dg, l.i) };
    case "lambang":
      return { jenis: "nama", nama: l.lambang };
    case "bagian":
      return { jenis: "nama", nama: l.sorot };
    case "letak":
      return { jenis: "nama", nama: l.tanya === "nama" ? "kiri" : "kanan" };
  }
}

/**
 * Apakah tugas langsung siap dijawab (tanpa kegiatan lebih dulu)? Kanvas dan suara: ya (gambar sudah jadi). Klik: bila tugas punya jawaban pilihan;
 * tugas lain memakai kegiatan. Tidak bergantung pada rupa, sehingga tombol tidak macet pada lambang.
 */
export function siapLangsung(l: Langkah, _rupa: Rupa, cara: Cara): boolean {
  if (cara !== "klik") return true;
  return kunciJawab(l, cara) !== null;
}

/** Pilihan nama di sekitar kunci, selalu memuat kunci. */
export function pilihanNamaDari(nama: Nama): Nama[] {
  if (nama === "banyak" || nama === "sedikit") return ["banyak", "sedikit"];
  if (nama === "lebih" || nama === "kurang" || nama === "sama") return ["lebih", "kurang", "sama"];
  if (nama === "kiri" || nama === "kanan") return ["kiri", "kanan"];
  if (nama === "judul" || nama === "keterangan") return ["judul", "keterangan"];
  return ["bintang", "lingkaran", "hati", "wajah"];
}
/** Pilihan angka (empat) selalu memuat kunci, urut naik. Angka satu sampai sembilan: dalam satu sampai sembilan; dua angka: kunci dan sekitarnya. */
export function pilihanAngka(n: number): number[] {
  if (n <= 9) {
    const kandidat = [n - 2, n - 1, n + 1, n + 2, n + 3, n - 3, n + 4].filter((x) => x >= 1 && x <= 9 && x !== n);
    return [n, ...kandidat.slice(0, 3)].sort((a, b) => a - b);
  }
  const kandidat = [n + 10, n - 10, n + 1, n - 1, n + 11, n - 11, n + 2, n - 2].filter((x) => x >= 10 && x <= 99 && x !== n);
  return [n, ...kandidat.slice(0, 3)].sort((a, b) => a - b);
}

/* ------------------------------ Kalimat ------------------------------ */
const nm = (d: Diagram, i: number): string => d.baris[i].nama.toLowerCase();

/** Kalimat yang menjelaskan jawaban benar (tanpa digit). */
export function kalimatKunci(l: Langkah, cara: Cara, rupa: Rupa = "benda"): string {
  void rupa;
  void cara;
  switch (l.tipe) {
    case "salah":
      return klaimBenar(l.klaim) ? `Jawaban ${l.tokoh} memang benar.` : `Jawaban ${l.tokoh} keliru.`;
    case "baca":
      return `Baris ${nm(l.dg, l.i)} punya ${kata(banyakBaris(l.dg, l.i))} gambar. Satu gambar mewakili satu, jadi banyaknya ${kata(banyakBaris(l.dg, l.i))}.`;
    case "ekstrem": {
      const i = barisEkstrem(l.dg, l.cari);
      return l.cari === "panjang"
        ? `Baris ${nm(l.dg, i)} paling panjang dengan ${kata(banyakBaris(l.dg, i))} gambar, jadi datanya paling banyak.`
        : `Baris ${nm(l.dg, i)} paling pendek dengan ${kata(banyakBaris(l.dg, i))} gambar, jadi datanya paling sedikit.`;
    }
    case "banding": {
      const a = banyakBaris(l.dg, l.a);
      const b = banyakBaris(l.dg, l.b);
      if (a === b) return `Baris ${nm(l.dg, l.a)} dan baris ${nm(l.dg, l.b)} sama panjang, jadi sama banyak.`;
      return a > b
        ? `Baris ${nm(l.dg, l.a)} ${kata(a - b)} lebihnya dari baris ${nm(l.dg, l.b)}.`
        : `Baris ${nm(l.dg, l.a)} ${kata(b - a)} kurangnya dari baris ${nm(l.dg, l.b)}.`;
    }
    case "tambah":
      return `Baris ${nm(l.dg, l.a)} perlu ditambah ${kata(tambahBaris(l))} gambar supaya sama panjang dengan baris ${nm(l.dg, l.b)}.`;
    case "jumlah":
      return `${l.idx.map((i) => kata(banyakBaris(l.dg, i))).join(" ditambah ")} sama dengan ${kata(jumlahBaris(l.dg, l.idx))}.`;
    case "rank":
      return `Baris ${nm(l.dg, l.i)} ada di urutan ${urutanKe(l.dg, l.i) === 1 ? "pertama" : `ke${kata(urutanKe(l.dg, l.i))}`} dari yang paling banyak.`;
    case "urut":
      return l.dari === "banyak" ? "Urutan dari yang paling banyak: baris yang paling panjang lebih dulu." : "Urutan dari yang paling sedikit: baris yang paling pendek lebih dulu.";
    case "urutbaca":
      return "Urutan membaca: judul, keterangan, nama jenis, lalu hitung gambar.";
    case "rapi":
      return "Diagram yang rapi memakai gambar yang sama bentuk, sama ukuran, dan sama jaraknya.";
    case "lambang":
      return `Gambar pada baris itu berbentuk ${l.lambang}.`;
    case "bagian":
      return l.sorot === "judul" ? "Bagian itu adalah judul, yang menyebut isi diagram." : "Bagian itu adalah keterangan, yang menyebut arti satu gambar.";
    case "letak":
      return l.tanya === "nama" ? "Nama jenis ditulis di kolom sebelah kiri." : "Gambar berjajar ke arah kanan, mulai dari sebelah nama jenis.";
  }
}

/** Instruksi satu tugas (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  const aksi = cara === "kanvas" ? "Tulis satu angka di kanvas." : cara === "suara" ? "Ucapkan satu bilangan." : "Pilih jawabannya.";
  const lihat = rupa === "benda" ? "Lihat diagram gambar di papan loket." : rupa === "diagram" ? "Lihat diagram gambar di papan layar." : "Lihat tabel kata.";
  switch (l.tipe) {
    case "salah":
      return `${l.tokoh} sudah menjawab tentang ${l.klaim.jenis === "ukuran" ? "gambar besar dan gambar kecil" : l.klaim.jenis === "selisih" ? "lebihnya dua baris" : "jumlah dua baris"}. Apakah jawabannya benar? Pilih alasan yang tepat.`;
    case "baca":
      return `${lihat} Baris yang ditandai punya berapa gambar? ${aksi}`;
    case "ekstrem":
      return cara === "kanvas"
        ? `${lihat} Cari baris yang paling ${l.cari}. Berapa gambar pada baris itu? Tulis satu angka di kanvas.`
        : cara === "suara"
          ? `${lihat} Baris yang paling ${l.cari} berarti datanya banyak atau sedikit? Ucapkan banyak, atau sedikit.`
          : `${lihat} Baris yang paling ${l.cari} berarti datanya banyak atau sedikit? Pilih jawabannya.`;
    case "banding":
      return cara === "kanvas"
        ? `${lihat} Dua baris ditandai. Berapa lebihnya? Tulis satu angka di kanvas.`
        : cara === "suara"
          ? `${lihat} Baris pertama dibanding baris kedua: lebih, kurang, atau sama? Ucapkan lebih, kurang, atau sama.`
          : `${lihat} Baris pertama dibanding baris kedua: lebih, kurang, atau sama? Pilih kata yang tepat.`;
    case "tambah":
      return `${lihat} Baris pertama lebih pendek daripada baris kedua. Berapa gambar yang harus ditambah supaya sama panjang? ${aksi}`;
    case "jumlah":
      return `${lihat} Tambahkan banyak gambar pada baris-baris yang ditandai. Berapa jumlahnya? ${aksi}`;
    case "rank":
      return `${lihat} Urutkan baris dari yang paling banyak. Baris yang ditandai ada di urutan ke berapa? ${aksi}`;
    case "urut":
      return `${lihat} Ketuk nama baris satu per satu, mulai dari yang paling ${l.dari === "banyak" ? "banyak" : "sedikit"}.`;
    case "urutbaca":
      return "Susun langkah membaca diagram gambar. Ketuk langkah pertama sampai terakhir secara berurutan.";
    case "rapi":
      return "Tiga diagram memakai gambar yang berbeda. Ketuk diagram yang rapi: semua gambar sama bentuk, sama ukuran, dan sama jarak.";
    case "lambang":
      return cara === "suara" ? "Lihat baris gambar. Gambar itu berbentuk apa? Ucapkan bintang, lingkaran, hati, atau wajah." : "Lihat baris gambar. Gambar itu berbentuk apa? Pilih jawabannya.";
    case "bagian":
      return cara === "suara"
        ? `${lihat} Bagian yang ditandai disebut apa? Ucapkan judul, atau keterangan.`
        : `${lihat} Bagian yang ditandai disebut apa? Pilih kata yang tepat.`;
    case "letak":
      return cara === "suara"
        ? l.tanya === "nama"
          ? `${lihat} Nama jenis ditulis di sebelah mana? Ucapkan kiri, atau kanan.`
          : `${lihat} Gambar berjajar ke arah mana dari nama jenis? Ucapkan kiri, atau kanan.`
        : l.tanya === "nama"
          ? `${lihat} Nama jenis ditulis di sebelah mana? Pilih jawabannya.`
          : `${lihat} Gambar berjajar ke arah mana dari nama jenis? Pilih jawabannya.`;
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  if (cara === "kanvas") return "Tulis jawabannya sebagai satu angka.";
  if (cara === "suara") return l.tipe === "baca" || l.tipe === "tambah" || l.tipe === "jumlah" || l.tipe === "rank" ? "Ucapkan jawabannya." : "Ucapkan satu kata.";
  return "Pilih jawaban yang tepat.";
}

/* ------------------------------ Petunjuk salah ------------------------------ */
/** Petunjuk saat ketukan pada tugas Urut, Urut baca, atau Rapi belum benar. */
export function petunjukKetuk(l: LUrut | LUrutBaca | LRapi): string {
  switch (l.tipe) {
    case "urut":
      return l.dari === "banyak" ? "Baris itu belum yang paling banyak. Cari baris yang paling panjang dulu, lalu yang berikutnya." : "Baris itu belum yang paling sedikit. Cari baris yang paling pendek dulu, lalu yang berikutnya.";
    case "urutbaca":
      return "Mulai dari judul, lalu keterangan, lalu nama jenis, dan terakhir hitung gambar dari kiri ke kanan.";
    case "rapi":
      return "Semua gambar dalam satu diagram harus sama bentuk, sama ukuran, dan jaraknya sama. Cari diagram yang gambarnya seragam.";
  }
}

/** Petunjuk saat jawaban angka atau kata salah: menunjuk kesalahannya (tanpa digit). `jawab`: kata yang dipilih atau diucapkan, atau angka yang ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number, rupa: Rupa = "benda"): string {
  void rupa;
  if (l.tipe === "salah") return `Lihat lagi. ${l.keliru}`;
  if (typeof jawab === "number") {
    const k = kunciJawab(l, cara);
    const kurang = k?.jenis === "angka" && jawab < k.n;
    const arah = kurang ? "Jawabanmu masih kurang." : "Jawabanmu terlalu banyak.";
    switch (l.tipe) {
      case "baca":
        return `Hitung gambar pada baris yang ditandai satu per satu dari kiri ke kanan. ${arah}`;
      case "ekstrem":
        return "Cari dulu baris yang paling panjang atau paling pendek, lalu hitung gambar pada baris itu satu per satu.";
      case "banding":
        return "Lebihnya adalah selisih banyak gambar dua baris. Hitung gambar tiap baris, lalu cari selisihnya.";
      case "tambah":
        return `Hitung gambar pada kedua baris, lalu cari berapa gambar yang kurang pada baris pertama. ${arah}`;
      case "jumlah":
        return `Hitung gambar tiap baris yang ditandai, lalu tambahkan. ${arah}`;
      case "rank":
        return `Urutkan dulu baris dari yang paling banyak, baru hitung urutannya. ${kurang ? "Urutanmu terlalu depan." : "Urutanmu terlalu belakang."}`;
      default:
        return "Periksa lagi gambarnya dengan teliti.";
    }
  }
  switch (l.tipe) {
    case "ekstrem":
      return "Baris yang paling panjang berarti datanya paling banyak. Baris yang paling pendek berarti datanya paling sedikit.";
    case "banding":
      return "Bandingkan panjang dua baris dari garis yang sama. Yang lebih panjang lebih banyak, yang lebih pendek lebih sedikit, dan yang sama panjang sama banyak.";
    case "lambang":
      return "Lihat bentuk gambar pada baris. Bintang punya ujung runcing, lingkaran bulat, hati berlekuk di atas, dan wajah punya mata dan senyum.";
    case "bagian":
      return "Judul menyebut isi diagram dan ada di atas. Keterangan menyebut arti satu gambar dan ada di bawah.";
    case "letak":
      return "Nama jenis ditulis di kolom kiri, dan gambar berjajar ke kanan tanpa celah.";
    default:
      return "Periksa lagi dengan teliti.";
  }
}
