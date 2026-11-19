/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 3 Bab 1 Sub-Bab C "Karung Pak Dodi" (membandingkan dan mengurutkan bilangan sampai 1.000):
 * jenis tugas, kunci, pilihan, instruksi (tanpa digit), dan petunjuk salah. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-urut-k3b1c.mjs.
 * Jawaban tidak hanya angka: memilih tanda atau kata, memilih kartu, mengetuk kartu menurut urutan, satu angka di kanvas, dan satu kata atau bilangan pendek yang diucapkan.
 * Semua kunci dihitung dari data bilangan (bukan kunci tetap).
 */
import type { Cara } from "../lemari-k1b1a/logika";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";

export type Rupa = "benda" | "diagram" | "lambang";
export type Nama = "lebih" | "kurang" | "sama" | "ratusan" | "puluhan" | "satuan" | "naik" | "turun" | "kiri" | "kanan";
export const URUT_NAMA: Nama[] = ["lebih", "kurang", "sama", "ratusan", "puluhan", "satuan", "naik", "turun", "kiri", "kanan"];
/** Tulisan tombol untuk tiap kata jawaban (tanda boleh tampil sebagai lambang). */
export const LABEL_NAMA: Record<Nama, string> = {
  lebih: "lebih besar >",
  kurang: "lebih kecil <",
  sama: "sama dengan =",
  ratusan: "ratusan",
  puluhan: "puluhan",
  satuan: "satuan",
  naik: "urutan naik",
  turun: "urutan turun",
  kiri: "kiri",
  kanan: "kanan",
};
export type Tanda = "<" | ">" | "=";

/* ------------------------------ Bilangan ------------------------------ */
export type Tempat = 0 | 1 | 2;
export const NAMA_TEMPAT: Nama[] = ["ratusan", "puluhan", "satuan"];
/** Angka pada tempat 0 (ratusan), 1 (puluhan), atau 2 (satuan) pada bilangan tiga angka. */
export const angkaTempat = (n: number, t: Tempat): number => (t === 0 ? Math.floor(n / 100) : t === 1 ? Math.floor(n / 10) % 10 : n % 10);
/** Tempat pertama dari kiri yang angkanya berbeda; -1 bila kedua bilangan sama. */
export const tempatPenentu = (a: number, b: number): number => ([0, 1, 2] as Tempat[]).find((t) => angkaTempat(a, t) !== angkaTempat(b, t)) ?? -1;
export const namaBanding = (a: number, b: number): "lebih" | "kurang" | "sama" => (a > b ? "lebih" : a < b ? "kurang" : "sama");
export const tandaDari = (a: number, b: number): Tanda => (a > b ? ">" : a < b ? "<" : "=");
/** Indeks bilangan terbesar atau terkecil (pertama bila ada yang sama). */
export const indeksEkstrem = (angka: number[], cari: "besar" | "kecil"): number =>
  angka.reduce((t, v, i) => (cari === "besar" ? (v > angka[t] ? i : t) : v < angka[t] ? i : t), 0);
/** Indeks kartu menurut urutan naik (terkecil dulu) atau turun (terbesar dulu). */
export const urutanIndeks = (angka: number[], arah: "naik" | "turun"): number[] =>
  angka.map((_, i) => i).sort((p, q) => (arah === "naik" ? angka[p] - angka[q] : angka[q] - angka[p]) || p - q);
/** Urutan ke berapa (mulai satu) kartu ke-i bila diurutkan naik. */
export const urutanKe = (angka: number[], i: number): number => urutanIndeks(angka, "naik").indexOf(i) + 1;
/** Apakah deretan bilangan sudah berurutan naik, turun, atau tidak keduanya. */
export const arahDeret = (angka: number[]): "naik" | "turun" | null =>
  angka.every((v, i) => i === 0 || v > angka[i - 1]) ? "naik" : angka.every((v, i) => i === 0 || v < angka[i - 1]) ? "turun" : null;
/** Urutan acak tetap (bukan urutan benar) bagi sejumlah kartu. */
export function acakTetap(n: number, benar: number[]): number[] {
  const dasar = Array.from({ length: n }, (_, i) => i);
  for (let geser = 1; geser < n + 3; geser += 1) {
    const kandidat = dasar.map((i) => (i * 2 + geser) % n);
    if (new Set(kandidat).size === n && kandidat.some((v, i) => v !== benar[i])) return kandidat;
  }
  return dasar.map((i) => (i + 1) % n);
}

/* ------------------------------ Kata bilangan ------------------------------ */
const SATUAN = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
const kataDuaAngka = (n: number): string => {
  if (n < 10) return SATUAN[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${SATUAN[n - 10]} belas`;
  return `${SATUAN[Math.floor(n / 10)]} puluh${n % 10 ? ` ${SATUAN[n % 10]}` : ""}`;
};
/** Bilangan nol sampai sembilan ratus sembilan puluh sembilan dalam kata (tanpa digit); seribu untuk 1000. */
export function kata(n: number): string {
  if (n === 1000) return "seribu";
  if (n < 100) return kataDuaAngka(n);
  const r = Math.floor(n / 100);
  const sisa = n % 100;
  return `${r === 1 ? "seratus" : `${SATUAN[r]} ratus`}${sisa ? ` ${kataDuaAngka(sisa)}` : ""}`;
}

/* ------------------------------ Langkah ------------------------------ */
/** Dua bilangan A dan B dibandingkan: klik dan suara = lebih, kurang, atau sama (A terhadap B); kanvas = angka pada tempat penentu di bilangan yang lebih besar. */
export type LBanding = { tipe: "banding"; a: number; b: number };
/** Tempat pertama (dari ratusan) yang berbeda: klik dan suara = ratusan, puluhan, satuan, atau sama; kanvas = angka pada tempat itu di bilangan yang lebih kecil. */
export type LTempat = { tipe: "tempat"; a: number; b: number };
/** Bilangan paling besar atau paling kecil di antara beberapa kartu: klik = ketuk kartunya, kanvas = angka ratusan bilangan itu, suara = nomor kartunya. */
export type LEkstrem = { tipe: "ekstrem"; angka: number[]; cari: "besar" | "kecil" };
/** Ketuk kartu satu per satu menurut urutan naik atau turun (klik). */
export type LUrut = { tipe: "urut"; angka: number[]; arah: "naik" | "turun" };
/** Kartu ke-i ada di urutan ke berapa bila diurutkan dari yang terkecil. */
export type LRank = { tipe: "rank"; angka: number[]; i: number };
/** Deretan kartu dari kiri ke kanan: urutannya naik atau turun (klik dan suara). */
export type LArah = { tipe: "arah"; angka: number[] };
/** Titik pada garis bilangan bertanda awal, awal+100, awal+200, awal+300: angka ratusan di sebelah kiri titik (klik, kanvas, suara). */
export type LGaris = { tipe: "garis"; awal: number; n: number };
/** Titik P dan titik Q pada garis bilangan: P ada di sebelah kiri atau kanan Q (klik dan suara). */
export type LLetak = { tipe: "letak"; awal: number; p: number; q: number };
export type LangkahDasar = LBanding | LTempat | LEkstrem | LUrut | LRank | LArah | LGaris | LLetak;
/**
 * Klaim tokoh pada tugas Cari kesalahan. `satuan`: tokoh membandingkan dari satuan dan bilang yang `katak` (a atau b) lebih besar.
 * `tanda`: tokoh menulis tanda antara A dan B. `urutan`: tokoh menyusun `susunan` (bilangan) dan bilang itu urutan `arah`.
 */
export type Klaim =
  | { jenis: "satuan"; a: number; b: number; katak: "a" | "b" }
  | { jenis: "tanda"; a: number; b: number; tanda: Tanda }
  | { jenis: "urutan"; susunan: number[]; arah: "naik" | "turun" };
export type LangkahSalah = { tipe: "salah"; tokoh: string; klaim: Klaim; kataTokoh: string; alasan: [string, string, string]; benar: number; keliru: string };
export type Langkah = LangkahDasar | LangkahSalah;

export type Metode = "igil" | "tempat" | "garis" | "urut";
export const URUT_METODE: Metode[] = ["igil", "tempat", "garis", "urut"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Ratusan Dulu, Lalu Turun",
  tempat: "Compare Placewise: Banding per Tempat",
  garis: "Number Line: Garis Bilangan Ratusan",
  urut: "Ordering: Mengurutkan",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F522}", tempat: "\u{2696}", garis: "\u{1F4CF}", urut: "\u{1F4F6}" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar | null => (l.tipe === "salah" ? null : l);

/** Klaim tokoh benar? */
export function klaimBenar(k: Klaim): boolean {
  if (k.jenis === "satuan") return k.katak === (k.a > k.b ? "a" : "b");
  if (k.jenis === "tanda") return k.tanda === tandaDari(k.a, k.b);
  return arahDeret(k.susunan) === k.arah;
}

/** Letak P terhadap Q pada garis. */
export const letakDari = (p: number, q: number): "kiri" | "kanan" => (p < q ? "kiri" : "kanan");

export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: Nama } | { jenis: "kartu"; i: number };

/** Kunci tiap tugas menurut caranya, dihitung dari data. Null bila tugas selesai lewat kegiatan (mengetuk kartu, memilih alasan). */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  switch (l.tipe) {
    case "salah":
    case "urut":
      return null;
    case "banding": {
      if (cara !== "kanvas") return { jenis: "nama", nama: namaBanding(l.a, l.b) };
      const t = tempatPenentu(l.a, l.b) as Tempat;
      return { jenis: "angka", n: angkaTempat(Math.max(l.a, l.b), t) };
    }
    case "tempat": {
      const t = tempatPenentu(l.a, l.b);
      if (cara !== "kanvas") return { jenis: "nama", nama: t < 0 ? "sama" : NAMA_TEMPAT[t] };
      return { jenis: "angka", n: angkaTempat(Math.min(l.a, l.b), t as Tempat) };
    }
    case "ekstrem": {
      const i = indeksEkstrem(l.angka, l.cari);
      return cara === "klik" ? { jenis: "kartu", i } : cara === "kanvas" ? { jenis: "angka", n: angkaTempat(l.angka[i], 0) } : { jenis: "angka", n: i + 1 };
    }
    case "rank":
      return { jenis: "angka", n: urutanKe(l.angka, l.i) };
    case "arah":
      return { jenis: "nama", nama: arahDeret(l.angka) === "turun" ? "turun" : "naik" };
    case "garis":
      return { jenis: "angka", n: Math.floor(l.n / 100) };
    case "letak":
      return { jenis: "nama", nama: letakDari(l.p, l.q) };
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
  if (nama === "lebih" || nama === "kurang" || nama === "sama") return ["lebih", "kurang", "sama"];
  if (nama === "ratusan" || nama === "puluhan" || nama === "satuan") return ["ratusan", "puluhan", "satuan", "sama"];
  if (nama === "naik" || nama === "turun") return ["naik", "turun"];
  return ["kiri", "kanan"];
}
/** Pilihan angka (empat) selalu memuat kunci, urut naik, dalam satu sampai sembilan. */
export function pilihanAngka(n: number): number[] {
  const kandidat = [n - 2, n - 1, n + 1, n + 2, n + 3, n - 3, n + 4].filter((x) => x >= 1 && x <= 9 && x !== n);
  return [n, ...kandidat.slice(0, 3)].sort((a, b) => a - b);
}
/** Tulisan tombol pilihan angka: pada tugas garis, angka ratusan ditulis sebagai ratusan penuh (mis. 4 menjadi 400). */
export const labelAngka = (l: Langkah, n: number): string => (l.tipe === "garis" ? `${n}00` : String(n));

/* ------------------------------ Kalimat ------------------------------ */
/** Kalimat yang menjelaskan jawaban benar (tanpa digit). */
export function kalimatKunci(l: Langkah, cara: Cara, rupa: Rupa = "benda"): string {
  void rupa;
  void cara;
  switch (l.tipe) {
    case "salah":
      return klaimBenar(l.klaim) ? `Jawaban ${l.tokoh} memang benar.` : `Jawaban ${l.tokoh} keliru.`;
    case "banding": {
      const t = tempatPenentu(l.a, l.b);
      if (t < 0) return "Semua tempat sama, jadi kedua bilangan sama besar. Tandanya sama dengan.";
      const sebut = namaBanding(l.a, l.b) === "lebih" ? "A lebih besar dari B" : "A lebih kecil dari B";
      return `Tempat ${NAMA_TEMPAT[t]} yang pertama berbeda: ${kata(angkaTempat(l.a, t as Tempat))} dan ${kata(angkaTempat(l.b, t as Tempat))}. Jadi ${sebut}.`;
    }
    case "tempat": {
      const t = tempatPenentu(l.a, l.b);
      return t < 0 ? "Semua tempat sama, jadi tidak ada tempat yang menentukan." : `Bandingkan dari kiri: tempat ${NAMA_TEMPAT[t]} yang pertama berbeda, yaitu ${kata(angkaTempat(l.a, t as Tempat))} dan ${kata(angkaTempat(l.b, t as Tempat))}.`;
    }
    case "ekstrem": {
      const i = indeksEkstrem(l.angka, l.cari);
      return l.cari === "besar" ? `Kartu nomor ${kata(i + 1)} paling besar. Ratusannya ${kata(angkaTempat(l.angka[i], 0))}.` : `Kartu nomor ${kata(i + 1)} paling kecil. Ratusannya ${kata(angkaTempat(l.angka[i], 0))}.`;
    }
    case "urut":
      return l.arah === "naik" ? "Urutan naik: dari bilangan yang terkecil sampai yang terbesar." : "Urutan turun: dari bilangan yang terbesar sampai yang terkecil.";
    case "rank":
      return `Kartu bertanda tanya ada di urutan ke${kata(urutanKe(l.angka, l.i))} dari yang terkecil.`;
    case "arah":
      return arahDeret(l.angka) === "turun" ? "Bilangan makin ke kanan makin kecil, jadi urutannya turun." : "Bilangan makin ke kanan makin besar, jadi urutannya naik.";
    case "garis":
      return `Titik berada di antara ${kata(Math.floor(l.n / 100) * 100)} dan ${kata(Math.floor(l.n / 100) * 100 + 100)}, jadi ratusan di sebelah kirinya ${kata(Math.floor(l.n / 100))}.`;
    case "letak":
      return letakDari(l.p, l.q) === "kiri" ? "Titik P ada di sebelah kiri titik Q, jadi bilangan P lebih kecil." : "Titik P ada di sebelah kanan titik Q, jadi bilangan P lebih besar.";
  }
}

/** Instruksi satu tugas (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  const aksi = cara === "kanvas" ? "Tulis satu angka di kanvas." : cara === "suara" ? "Ucapkan satu bilangan." : "Pilih jawabannya.";
  const lihat = rupa === "benda" ? "Lihat tumpukan benda di bak truk." : rupa === "diagram" ? "Lihat balok pada papan." : "Lihat kartu angka di papan kapur.";
  const lihatGaris = rupa === "benda" ? "Lihat rak penanda di halaman toko." : rupa === "diagram" ? "Lihat garis bilangan polos." : "Lihat tabel garis bilangan.";
  switch (l.tipe) {
    case "salah":
      return `${l.tokoh} sudah menjawab tentang ${l.klaim.jenis === "satuan" ? "dua bilangan yang dibandingkan dari satuan" : l.klaim.jenis === "tanda" ? "tanda di antara dua bilangan" : "urutan beberapa bilangan"}. Apakah jawabannya benar? Pilih alasan yang tepat.`;
    case "banding":
      return cara === "kanvas"
        ? `${lihat} Bandingkan A dengan B mulai dari ratusan sampai ketemu tempat yang berbeda. Tulis satu angka pada tempat itu di bilangan yang lebih besar.`
        : cara === "suara"
          ? `${lihat} Bandingkan A dengan B. Ucapkan lebih, kurang, atau sama.`
          : `${lihat} Bandingkan A dengan B. Pilih tanda yang tepat.`;
    case "tempat":
      return cara === "kanvas"
        ? `${lihat} Cari tempat pertama yang berbeda, dari kiri. Tulis satu angka pada tempat itu di bilangan yang lebih kecil.`
        : cara === "suara"
          ? `${lihat} Bandingkan dari kiri. Tempat mana yang pertama berbeda? Ucapkan ratusan, puluhan, satuan, atau sama.`
          : `${lihat} Bandingkan dari kiri. Tempat mana yang pertama berbeda? Pilih jawabannya.`;
    case "ekstrem": {
      const kata2 = l.cari === "besar" ? "paling besar" : "paling kecil";
      return cara === "klik"
        ? `${lihat} Ketuk kartu yang bilangannya ${kata2}.`
        : cara === "kanvas"
          ? `${lihat} Cari bilangan yang ${kata2}. Tulis satu angka ratusannya di kanvas.`
          : `${lihat} Bilangan yang ${kata2} ada di kartu nomor berapa? Ucapkan satu bilangan.`;
    }
    case "urut":
      return `${lihat} Ketuk kartu satu per satu, mulai dari bilangan yang paling ${l.arah === "naik" ? "kecil" : "besar"}.`;
    case "rank":
      return `${lihat} Urutkan kartu dari yang terkecil. Kartu bertanda tanya ada di urutan ke berapa? ${aksi}`;
    case "arah":
      return cara === "suara" ? `${lihat} Baca kartu dari kiri ke kanan. Urutannya naik atau turun? Ucapkan naik, atau turun.` : `${lihat} Baca kartu dari kiri ke kanan. Urutannya naik atau turun? Pilih jawabannya.`;
    case "garis":
      return `${lihatGaris} Titik ditandai di antara dua ratusan. Angka ratusan di sebelah kiri titik itu berapa? ${aksi}`;
    case "letak":
      return cara === "suara"
        ? `${lihatGaris} Titik P ada di sebelah mana dari titik Q? Ucapkan kiri, atau kanan.`
        : `${lihatGaris} Titik P ada di sebelah mana dari titik Q? Pilih jawabannya.`;
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  if (cara === "kanvas") return "Tulis jawabannya sebagai satu angka.";
  if (cara === "suara") return l.tipe === "ekstrem" || l.tipe === "rank" || l.tipe === "garis" ? "Ucapkan jawabannya." : "Ucapkan satu kata.";
  return "Pilih jawaban yang tepat.";
}

/* ------------------------------ Petunjuk salah ------------------------------ */
/** Petunjuk saat ketukan pada tugas Urut belum benar. */
export function petunjukKetuk(l: LUrut): string {
  return l.arah === "naik" ? "Kartu itu belum yang paling kecil. Bandingkan ratusannya dulu, lalu puluhan, lalu satuan." : "Kartu itu belum yang paling besar. Bandingkan ratusannya dulu, lalu puluhan, lalu satuan.";
}

/** Petunjuk saat jawaban angka atau kata salah: menunjuk kesalahannya (tanpa digit). `jawab`: kata yang dipilih atau diucapkan, atau angka yang ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number, rupa: Rupa = "benda"): string {
  void rupa;
  if (l.tipe === "salah") return `Lihat lagi. ${l.keliru}`;
  if (typeof jawab === "number") {
    const k = kunciJawab(l, cara);
    const kurang = k?.jenis === "angka" && jawab < k.n;
    const arah = kurang ? "Jawabanmu masih terlalu kecil." : "Jawabanmu terlalu besar.";
    switch (l.tipe) {
      case "banding":
        return `Mulai dari ratusan. Bila sama, lanjut ke puluhan, lalu satuan. Ambil angka pada tempat pertama yang berbeda, di bilangan yang lebih besar. ${arah}`;
      case "tempat":
        return `Bandingkan dari kiri sampai ketemu tempat yang berbeda, lalu ambil angkanya di bilangan yang lebih kecil. ${arah}`;
      case "ekstrem":
        return "Cari dulu bilangan yang paling besar atau paling kecil, mulai dari ratusannya, lalu baca angka ratusannya atau nomor kartunya.";
      case "rank":
        return `Urutkan dulu kartu dari yang terkecil, baru hitung urutannya. ${kurang ? "Urutanmu terlalu depan." : "Urutanmu terlalu belakang."}`;
      case "garis":
        return `Cari dua tanda ratusan yang mengapit titik. Angka ratusan yang di sebelah kiri titik adalah jawabannya. ${arah}`;
      default:
        return "Periksa lagi dengan teliti.";
    }
  }
  switch (l.tipe) {
    case "banding":
      return "Bandingkan dari ratusan, lalu puluhan, lalu satuan. Tempat pertama yang berbeda menentukan: angka yang lebih besar berarti bilangan yang lebih besar. Mulut tanda menghadap bilangan yang lebih besar.";
    case "tempat":
      return "Mulai dari ratusan. Bila ratusannya sama, lihat puluhan. Bila puluhan juga sama, barulah lihat satuan. Tempat pertama yang berbeda adalah jawabannya.";
    case "ekstrem":
      return "Bandingkan ratusannya dulu, lalu puluhan, lalu satuan, untuk menemukan bilangan yang paling besar atau paling kecil.";
    case "arah":
      return "Baca dari kiri ke kanan. Kalau bilangan makin besar, urutannya naik. Kalau makin kecil, urutannya turun.";
    case "letak":
      return "Pada garis bilangan, makin ke kanan makin besar dan makin ke kiri makin kecil. Lihat titik mana yang lebih ke kanan.";
    default:
      return "Periksa lagi dengan teliti.";
  }
}
