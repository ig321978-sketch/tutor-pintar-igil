/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 2 Bab 6 Sub-Bab B "Jadwal Lomba Bu Ratna" (waktu dan jam), akhir cerita Hari Olahraga Sekolah:
 * jenis tugas, kunci, pilihan, instruksi (tanpa digit), dan petunjuk salah. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-jadwal-k2b6b.mjs.
 * Jawaban tidak hanya angka: membaca jam analog atau digital, mencocokkan jam analog dan digital, memutar jarum pendek, menyebut bagian hari,
 * mengurutkan kegiatan, membandingkan lama kegiatan, menghitung selisih jam, satu angka di kanvas, dan satu kata atau bilangan yang diucapkan.
 * Semua kunci dihitung dari data (jam dua puluh empat), bukan kunci tetap. Jam yang dipakai selalu tepat (jarum panjang di dua belas).
 */
import type { Cara } from "../lemari-k1b1a/logika";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";

export type Rupa = "benda" | "diagram" | "lambang";
export type Bagian = "pagi" | "siang" | "sore" | "malam";
export const URUT_BAGIAN: Bagian[] = ["pagi", "siang", "sore", "malam"];
export type Nama = Bagian | "lama" | "sebentar" | "awal" | "akhir" | "jam" | "menit";
export const URUT_NAMA: Nama[] = ["pagi", "siang", "sore", "malam", "lama", "sebentar", "awal", "akhir", "jam", "menit"];

const kapital = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);

/* ------------------------------ Kata bilangan ------------------------------ */
const SATUAN = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
const PULUHAN = ["", "", "dua puluh", "tiga puluh", "empat puluh", "lima puluh"];
/** Bilangan nol sampai lima puluh sembilan dalam kata (tanpa digit). */
export function kata(n: number): string {
  if (n < 10) return SATUAN[n] ?? String(n);
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${SATUAN[n - 10]} belas`;
  if (n < 60) return `${PULUHAN[Math.floor(n / 10)]}${n % 10 ? ` ${SATUAN[n % 10]}` : ""}`;
  return String(n);
}

/* ------------------------------ Jam ------------------------------ */
const dua = (n: number): string => String(n).padStart(2, "0");
/** Jam dua belas (1 sampai 12) dari jam dua puluh empat. */
export const jam12 = (h24: number): number => ((h24 + 11) % 12) + 1;
/** Bagian hari: pagi 5-10, siang 11-14, sore 15-17, malam 18-4. */
export const bagianHari = (h24: number): Bagian => (h24 >= 5 && h24 <= 10 ? "pagi" : h24 >= 11 && h24 <= 14 ? "siang" : h24 >= 15 && h24 <= 17 ? "sore" : "malam");
/** Tulisan jam digital "HH.00". */
export const tulisDigital = (h24: number): string => `${dua(h24)}.00`;
/** Pukul dalam kata, mis. "pukul tujuh malam". */
export const kataPukul = (h24: number): string => `pukul ${kata(jam12(h24))} ${bagianHari(h24)}`;
/** Pukul dengan angka untuk gambar, mis. "pukul 7 malam". */
export const angkaPukul = (h24: number): string => `pukul ${jam12(h24)} ${bagianHari(h24)}`;
/** Sudut jarum pendek (derajat) pada jam dinding. */
export const sudutPendek = (h12: number): number => 30 * (h12 % 12);

export type Keg = { nama: string; emoji: string; h: number };
export type Dur = { nama: string; emoji: string; menit: number };
/** Lama dalam kata (tanpa digit): "lima belas menit", "satu jam". */
export const lamaKata = (menit: number): string => (menit % 60 === 0 ? `${kata(menit / 60)} jam` : `${kata(menit)} menit`);
/** Lama untuk gambar: "15 menit", "1 jam". */
export const lamaAngka = (menit: number): string => (menit % 60 === 0 ? `${menit / 60} jam` : `${menit} menit`);
/** Banyak kotak batang (satu kotak = satu jam; kurang dari satu jam tetap setengah kotak). */
export const kotakBatang = (menit: number): number => menit / 60;

/* ------------------------------ Langkah ------------------------------ */
/** Membaca jam: klik (pilih angka), kanvas (tulis satu angka, jam satu sampai sembilan), suara (ucapkan bilangan). */
export type LBaca = { tipe: "baca"; h: number; tampil: "analog" | "digital" };
/** Banyak jam dari jam mulai sampai jam selesai (jam dua puluh empat). */
export type LSelisih = { tipe: "selisih"; mulai: number; selesai: number };
/** Kegiatan yang ditanyakan ada di urutan ke berapa bila diurutkan dari yang paling awal (kanvas). `item` tampil tidak berurutan. */
export type LRank = { tipe: "rank"; item: Keg[]; sasaran: number };
/** Batang kotak jam: banyak kotak seluruhnya, atau selisih banyak kotak dua batang (kanvas). */
export type LKotak = { tipe: "kotak"; jenis: "hitung"; n: number } | { tipe: "kotak"; jenis: "beda"; a: number; b: number };
/** Menyebut bagian hari dari sebuah jam (klik dan suara). */
export type LBagian = { tipe: "bagian"; h: number };
/** Kegiatan pertama lebih awal atau lebih akhir daripada kegiatan kedua (suara). */
export type LAwal = { tipe: "awal"; a: Keg; b: Keg };
/** Kegiatan pertama lebih lama atau lebih sebentar daripada kegiatan kedua (suara). */
export type LLama = { tipe: "lama"; a: Dur; b: Dur };
/** Jarum pendek atau panjang menunjukkan jam atau menit (suara). */
export type LJarum = { tipe: "jarum"; yang: "pendek" | "panjang" };
/** Ketuk jam yang sama dengan jam yang ditunjuk (analog ke digital, digital ke analog, atau kata ke digital). `pilihan` memuat jam dua puluh empat. */
export type LCocok = { tipe: "cocok"; h: number; pilihan: number[] };
/** Urutkan kegiatan dari yang paling awal dengan mengetuk kartu. */
export type LUrut = { tipe: "urut"; item: Keg[] };
/** Putar jarum pendek sampai jam menunjukkan pukul tertentu. */
export type LSet = { tipe: "set"; h: number };
/** Ketuk kegiatan yang lebih lama (dua batang). */
export type LBanding = { tipe: "banding"; a: Dur; b: Dur };
export type LangkahDasar = LBaca | LSelisih | LRank | LKotak | LBagian | LAwal | LLama | LJarum | LCocok | LUrut | LSet | LBanding;
/** Klaim tokoh pada tugas Cari kesalahan. */
export type Klaim =
  | { jenis: "baca"; h: number; katak: number; tampil: "analog" | "digital" }
  | { jenis: "bagian"; h: number; katak: Bagian }
  | { jenis: "lama"; a: Dur; b: Dur; katak: "a" | "b" };
export type LangkahSalah = { tipe: "salah"; tokoh: string; klaim: Klaim; kataTokoh: string; alasan: [string, string, string]; benar: number; keliru: string };
export type Langkah = LangkahDasar | LangkahSalah;

export type Metode = "igil" | "garis" | "jalur" | "batang";
export const URUT_METODE: Metode[] = ["igil", "garis", "jalur", "batang"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Lihat Pendek, Lihat Panjang, Sebut Pukul",
  garis: "Day Timeline: Garis Waktu Hari",
  jalur: "Hour Track: Jalur Jam",
  batang: "Duration Bars: Batang Lama Kegiatan",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F551}", garis: "\u{1F305}", jalur: "\u{1F3C3}", batang: "\u{1F4CA}" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar | null => (l.tipe === "salah" ? null : l);

/* ------------------------------ Hitungan dari data ------------------------------ */
/** Urutan ke berapa (mulai satu) kegiatan sasaran bila diurutkan dari yang paling awal. */
export const urutanKe = (l: LRank): number => [...l.item].sort((p, q) => p.h - q.h).findIndex((k) => k.nama === l.item[l.sasaran].nama) + 1;
/** Urutan kartu yang benar (indeks pada `item`, paling awal lebih dulu). */
export const urutanBenar = (item: readonly Keg[]): number[] => item.map((_, i) => i).sort((p, q) => item[p].h - item[q].h);
/** Urutan acak tetap (bukan urutan benar) untuk kartu. */
export function urutanKartu(item: readonly Keg[]): number[] {
  const n = item.length;
  const benar = urutanBenar(item);
  const dasar = Array.from({ length: n }, (_, i) => i);
  for (let geser = 1; geser < n; geser += 1) {
    const kandidat = dasar.map((i) => (i * 2 + geser) % n);
    if (new Set(kandidat).size === n && kandidat.some((v, i) => v !== benar[i])) return kandidat;
  }
  return dasar.map((i) => (i + 1) % n);
}
/** Klaim tokoh benar? */
export function klaimBenar(k: Klaim): boolean {
  if (k.jenis === "baca") return k.katak === jam12(k.h);
  if (k.jenis === "bagian") return k.katak === bagianHari(k.h);
  return (k.katak === "a") === k.a.menit > k.b.menit;
}

export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: Nama };

/** Banyak jam dari jam mulai sampai jam selesai. */
export const nilaiSelisih = (l: LSelisih): number => l.selesai - l.mulai;
/** Jawaban angka tugas Kotak. */
export const nilaiKotak = (l: LKotak): number => (l.jenis === "hitung" ? l.n : Math.abs(l.a - l.b));
/** Nama jawaban tugas suara. */
export function namaKunci(l: LAwal | LLama | LJarum | LBagian): Nama {
  switch (l.tipe) {
    case "awal":
      return l.a.h < l.b.h ? "awal" : "akhir";
    case "lama":
      return l.a.menit > l.b.menit ? "lama" : "sebentar";
    case "jarum":
      return l.yang === "pendek" ? "jam" : "menit";
    case "bagian":
      return bagianHari(l.h);
  }
}

/** Kunci tiap tugas menurut caranya, dihitung dari data. Null bila tugas selesai lewat kegiatan (mengetuk, memutar, mengurutkan, memilih alasan). */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  switch (l.tipe) {
    case "salah":
    case "cocok":
    case "urut":
    case "set":
    case "banding":
      return null;
    case "baca":
      return { jenis: "angka", n: jam12(l.h) };
    case "selisih":
      return { jenis: "angka", n: nilaiSelisih(l) };
    case "rank":
      return cara === "kanvas" ? { jenis: "angka", n: urutanKe(l) } : null;
    case "kotak":
      return cara === "kanvas" ? { jenis: "angka", n: nilaiKotak(l) } : null;
    case "bagian":
      return cara === "kanvas" ? null : { jenis: "nama", nama: namaKunci(l) };
    case "awal":
    case "lama":
    case "jarum":
      return cara === "suara" ? { jenis: "nama", nama: namaKunci(l) } : null;
  }
}

/**
 * Apakah tugas langsung siap dijawab (tanpa kegiatan lebih dulu)? Kanvas dan suara: ya (gambar sudah jadi). Klik: bila tugas punya jawaban pilihan
 * (membaca jam, selisih jam, bagian hari); tugas lain memakai kegiatan. Tidak bergantung pada rupa, sehingga tombol tidak macet pada lambang.
 */
export function siapLangsung(l: Langkah, _rupa: Rupa, cara: Cara): boolean {
  if (cara !== "klik") return true;
  return kunciJawab(l, cara) !== null;
}

/** Pilihan nama di sekitar kunci, selalu memuat kunci. */
export function pilihanNamaDari(nama: Nama): Nama[] {
  if (nama === "pagi" || nama === "siang" || nama === "sore" || nama === "malam") return URUT_BAGIAN;
  if (nama === "lama" || nama === "sebentar") return ["lama", "sebentar"];
  if (nama === "awal" || nama === "akhir") return ["awal", "akhir"];
  return ["jam", "menit"];
}
/** Pilihan angka di sekitar kunci (empat), selalu memuat kunci, urut naik, dalam satu sampai dua belas. */
export function pilihanAngka(n: number): number[] {
  const kandidat = [n - 2, n - 1, n + 1, n + 2, n + 3, n - 3, n + 4].filter((x) => x >= 1 && x <= 12 && x !== n);
  return [n, ...kandidat.slice(0, 3)].sort((a, b) => a - b);
}

/* ------------------------------ Kalimat ------------------------------ */
/** Kalimat yang menjelaskan jawaban benar. */
export function kalimatKunci(l: Langkah, cara: Cara, rupa: Rupa = "benda"): string {
  void rupa;
  switch (l.tipe) {
    case "salah":
      return klaimBenar(l.klaim) ? `Jawaban ${l.tokoh} memang benar.` : `Jawaban ${l.tokoh} keliru.`;
    case "baca":
      return l.tampil === "digital"
        ? `Jam digital memakai dua puluh empat jam: ${kataPukul(l.h)}, jadi dibaca pukul ${kata(jam12(l.h))} dengan jam dua belas.`
        : `Jarum panjang di angka dua belas berarti pukul tepat, dan jarum pendek di angka ${kata(jam12(l.h))}, jadi pukul ${kata(jam12(l.h))}.`;
    case "selisih":
      return `Dari ${kataPukul(l.mulai)} sampai ${kataPukul(l.selesai)} ada ${kata(nilaiSelisih(l))} jam.`;
    case "rank":
      return `Kegiatan itu ada di urutan ${urutanKe(l) === 1 ? "pertama" : `ke${kata(urutanKe(l))}`} dari yang paling awal.`;
    case "kotak":
      return l.jenis === "hitung" ? `Satu kotak satu jam, ada ${kata(l.n)} kotak, jadi ${kata(l.n)} jam.` : `Selisih kedua batang ${kata(Math.abs(l.a - l.b))} kotak, jadi ${kata(Math.abs(l.a - l.b))} jam.`;
    case "bagian":
      return `${kapital(kataPukul(l.h))} termasuk ${bagianHari(l.h)}.`;
    case "awal":
      return namaKunci(l) === "awal" ? "Jamnya lebih kecil dalam satu hari, jadi kegiatan pertama lebih awal." : "Jamnya lebih besar dalam satu hari, jadi kegiatan pertama lebih akhir.";
    case "lama":
      return namaKunci(l) === "lama" ? "Batangnya lebih panjang, jadi kegiatan pertama lebih lama." : "Batangnya lebih pendek, jadi kegiatan pertama lebih sebentar.";
    case "jarum":
      return l.yang === "pendek" ? "Jarum pendek menunjukkan jam." : "Jarum panjang menunjukkan menit.";
    case "cocok":
      return `${kapital(kataPukul(l.h))} ditulis ${kata(jam12(l.h))} pada jam dinding, dan pada jam digital dengan dua puluh empat jam.`;
    case "urut":
      return "Urutan yang benar dari yang paling awal: lihat bagian hari dan jamnya.";
    case "set":
      return `Jarum pendek di angka ${kata(jam12(l.h))} dan jarum panjang di dua belas, jadi pukul ${kata(jam12(l.h))} tepat.`;
    case "banding":
      return l.a.menit > l.b.menit ? `${kapital(l.a.nama)} lebih lama daripada ${l.b.nama}.` : `${kapital(l.b.nama)} lebih lama daripada ${l.a.nama}.`;
  }
  return cara === "klik" ? "" : "";
}

/** Instruksi satu tugas (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  const aksi = cara === "kanvas" ? "Tulis satu angka di kanvas." : cara === "suara" ? "Ucapkan satu bilangan." : "Pilih jawabannya.";
  const aksiKata = cara === "suara" ? "Ucapkan satu kata." : "Pilih jawabannya.";
  switch (l.tipe) {
    case "salah":
      return `${l.tokoh} sudah menjawab tentang ${l.klaim.jenis === "baca" ? "membaca jam" : l.klaim.jenis === "bagian" ? "bagian hari" : "lama kegiatan"}. Apakah jawabannya benar? Pilih alasan yang tepat.`;
    case "baca":
      return l.tampil === "analog"
        ? `${rupa === "benda" ? "Lihat jam dinding di lapangan." : "Lihat muka jam."} Pukul berapa jam itu? ${aksi}`
        : `Baca jam digital pada kartu. Pukul berapa kalau dibaca dengan jam dua belas? ${aksi}`;
    case "selisih":
      return rupa === "benda"
        ? `Kegiatan mulai pada jam dinding pertama dan selesai pada jam dinding kedua. Berapa jam kegiatan itu berlangsung? ${aksi}`
        : rupa === "diagram"
          ? `Jalur jam menunjukkan jam mulai dan jam selesai sebuah kegiatan. Berapa jam kegiatan itu berlangsung? ${aksi}`
          : `Kartu menuliskan jam mulai dan jam selesai sebuah kegiatan. Berapa jam kegiatan itu berlangsung? ${aksi}`;
    case "rank":
      return `Kegiatan acara ditulis tidak berurutan. Urutkan dari yang paling awal. Kegiatan yang bertanda tanya ada di urutan ke berapa? ${aksi}`;
    case "kotak":
      return l.jenis === "hitung"
        ? `Batang menunjukkan lama sebuah kegiatan, dan satu kotak berarti satu jam. Berapa kotak seluruhnya? ${aksi}`
        : `Dua batang menunjukkan lama dua kegiatan, dan satu kotak berarti satu jam. Berapa kotak selisih kedua batang? ${aksi}`;
    case "bagian":
      return `Waktu pada kartu termasuk pagi, siang, sore, atau malam? ${aksiKata}`;
    case "awal":
      return "Dua kegiatan punya jam masing-masing. Kegiatan pertama lebih awal atau lebih akhir daripada kegiatan kedua? Ucapkan awal, atau akhir.";
    case "lama":
      return "Dua batang menunjukkan lama dua kegiatan. Kegiatan pertama lebih lama atau lebih sebentar daripada kegiatan kedua? Ucapkan lama, atau sebentar.";
    case "jarum":
      return l.yang === "pendek" ? "Jarum pendek pada jam menunjukkan apa, jam atau menit? Ucapkan satu kata." : "Jarum panjang pada jam menunjukkan apa, jam atau menit? Ucapkan satu kata.";
    case "cocok":
      return rupa === "benda"
        ? "Jam dinding di lapangan menunjukkan sebuah waktu. Ketuk kartu jam digital yang menunjukkan waktu yang sama."
        : rupa === "diagram"
          ? "Jam digital menunjukkan sebuah waktu. Ketuk muka jam yang menunjukkan jam yang sama."
          : "Kartu menuliskan sebuah waktu dengan kata. Ketuk jam digital dua puluh empat jam yang menunjukkan waktu yang sama.";
    case "urut":
      return "Susun kegiatan dari yang paling awal sampai yang paling akhir. Ketuk kartu dari yang paling awal.";
    case "set":
      return `Putar jarum pendek sampai jam menunjukkan pukul ${kata(jam12(l.h))} tepat, lalu tekan Periksa.`;
    case "banding":
      return "Dua batang menunjukkan lama dua kegiatan. Ketuk kegiatan yang lebih lama.";
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  if (cara === "kanvas") return "Tulis jawabannya sebagai satu angka.";
  if (cara === "suara") return l.tipe === "baca" || l.tipe === "selisih" ? "Ucapkan jawabannya." : "Ucapkan satu kata.";
  return "Pilih jawaban yang tepat.";
}

/* ------------------------------ Petunjuk salah ------------------------------ */
/** Petunjuk saat jam yang diketuk atau diputar belum benar. */
export function petunjukCocok(l: LCocok, pilih: number): string {
  if (jam12(pilih) === jam12(l.h)) return "Jam dua belasnya sudah sama, tetapi jam dua puluh empatnya belum. Lihat bagian harinya, pagi atau sore.";
  return "Jamnya belum sama. Lihat jarum pendek: ia menunjukkan jam. Bandingkan dengan dua angka pertama pada jam digital.";
}
export function petunjukSet(l: LSet, sekarang: number): string {
  const sasaran = jam12(l.h);
  if (sekarang === sasaran) return "Sudah pas.";
  return jam12(sekarang + 1) === sasaran ? "Tinggal satu jam lagi. Putar jarum pendek satu kali." : `Jarum pendek masih di angka ${kata(sekarang)}. Putar sampai di angka ${kata(sasaran)}.`;
}
/** Petunjuk saat langkah yang diketuk belum waktunya (tugas Urut). */
export const petunjukUrut = (l: LUrut, ketuk: number, sudah: number[]): string => {
  const benar = urutanBenar(l.item);
  const ini = l.item[ketuk];
  const harus = l.item[benar[sudah.length]];
  return `${ini.nama} belum waktunya. Lihat jam dan bagian harinya: ${harus.nama} lebih awal daripada ${ini.nama}.`;
};
export const petunjukBanding = (): string => "Bandingkan panjang kedua batang. Batang yang lebih panjang berarti kegiatan yang lebih lama.";

/** Petunjuk saat jawaban angka atau kata salah: menunjuk kesalahannya (tanpa digit). `jawab`: kata yang dipilih atau diucapkan, atau angka yang ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number, rupa: Rupa = "benda"): string {
  void rupa;
  if (l.tipe === "salah") return `Lihat lagi. ${l.keliru}`;
  if (typeof jawab === "number") {
    const k = kunciJawab(l, cara);
    const kurang = k?.jenis === "angka" && jawab < k.n;
    switch (l.tipe) {
      case "baca":
        return jawab === 12 && k?.jenis === "angka" && k.n !== 12
          ? "Jarum panjang di angka dua belas hanya berarti pukul tepat. Untuk tahu jamnya, lihat jarum pendek."
          : "Jarum pendek menunjukkan jam. Lihat jarum pendeknya sedang di angka berapa, atau baca dua angka pertama pada jam digital dengan jam dua belas.";
      case "selisih":
        return `Hitung berapa jam jarum pendek bergerak dari jam mulai sampai jam selesai. ${kurang ? "Jawabanmu masih kurang." : "Jawabanmu terlalu banyak."}`;
      case "rank":
        return `Urutkan dulu kegiatan dari jam yang paling kecil ke yang paling besar, baru hitung urutannya. ${kurang ? "Urutanmu terlalu depan." : "Urutanmu terlalu belakang."}`;
      case "kotak":
        return l.jenis === "hitung" ? "Satu kotak berarti satu jam. Hitung semua kotak pada batang satu per satu." : "Hitung kotak tiap batang, lalu kurangkan yang lebih besar dengan yang lebih kecil.";
      default:
        return "Periksa lagi gambarnya dengan teliti.";
    }
  }
  const nm = l.tipe === "bagian" || l.tipe === "awal" || l.tipe === "lama" || l.tipe === "jarum" ? namaKunci(l) : null;
  if (l.tipe === "bagian") return `${kapital(kataPukul(l.h))} termasuk ${nm}. Bagian hari: pagi sampai menjelang siang, siang, sore, lalu malam.`;
  if (l.tipe === "awal") return "Jam yang lebih kecil dalam satu hari berarti lebih awal. Bandingkan kedua jam dan bagian harinya.";
  if (l.tipe === "lama") return "Bandingkan panjang kedua batang. Batang yang lebih panjang berarti lebih lama.";
  if (l.tipe === "jarum") return jawab === "menit" ? "Jarum pendek menunjukkan jam. Jarum yang menunjukkan menit adalah jarum panjang." : "Jarum panjang menunjukkan menit. Jarum yang menunjukkan jam adalah jarum pendek.";
  return "Periksa lagi dengan teliti.";
}
