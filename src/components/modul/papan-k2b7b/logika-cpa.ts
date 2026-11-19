/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 2 Bab 7 Sub-Bab B "Pengumuman Bu Lia" (membandingkan dan mengurutkan bilangan), akhir cerita
 * Bank Sampah Sekolah: jenis tugas, kunci, pilihan, instruksi (tanpa digit), dan petunjuk salah. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-papan-k2b7b.mjs.
 * Jawaban tidak hanya angka: memilih kata atau tanda, mengetuk bilangan, menggeser kepik di tali, mengetuk kotak tabel seratus, mengurutkan kartu, memasang kartu angka,
 * satu angka di kanvas, dan satu kata atau bilangan pendek yang diucapkan. Semua kunci dihitung dari data (bukan kunci tetap).
 */
import type { Cara } from "../lemari-k1b1a/logika";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";

export type Rupa = "benda" | "diagram" | "lambang";
export type Nama = "besar" | "kecil" | "sama" | "lebih" | "kurang" | "maju" | "mundur";
export const URUT_NAMA: Nama[] = ["besar", "kecil", "sama", "lebih", "kurang", "maju", "mundur"];
/** Tulisan tombol untuk tiap kata jawaban. */
export const LABEL_NAMA: Record<Nama, string> = { besar: "lebih besar", kecil: "lebih kecil", sama: "sama", lebih: "lebih", kurang: "kurang", maju: "maju", mundur: "mundur" };
export const LAMBANG_NAMA: Record<"besar" | "kecil" | "sama", string> = { besar: ">", kecil: "<", sama: "=" };

const kapital = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);

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
export const puluhanDari = (n: number): number => Math.floor(n / 10);
export const satuanDari = (n: number): number => n % 10;
/** Bilangan yang lebih besar dari dua bilangan (sama bila sama). */
export const namaBanding = (a: number, b: number): "besar" | "kecil" | "sama" => (a > b ? "besar" : a < b ? "kecil" : "sama");

/* ------------------------------ Langkah ------------------------------ */
/** Angka di tempat puluhan atau satuan sebuah bilangan (klik, kanvas, suara). Angkanya tidak nol. */
export type LTempat = { tipe: "tempat"; n: number; tanya: "puluhan" | "satuan" };
/** Dua bilangan dibandingkan: klik = ketuk bilangan yang paling besar atau kecil, kanvas = angka puluhan bilangan yang lebih besar, suara = besar, kecil, atau sama. */
export type LBanding = { tipe: "banding"; a: number; b: number; cari: "besar" | "kecil" };
/** Memilih kata (lebih besar, lebih kecil, atau sama) untuk bilangan pertama terhadap bilangan kedua (klik dan suara). */
export type LTanda = { tipe: "tanda"; a: number; b: number };
/** Kepik di tali bergerak maju atau mundur beberapa langkah: ketuk bilangan tempat berhenti (klik). */
export type LGaris = { tipe: "garis"; dari: number; arah: "maju" | "mundur"; langkah: number };
/** Kepik pindah dari satu bilangan ke bilangan lain: kanvas = banyak langkah, klik dan suara = maju atau mundur. */
export type LLangkah = { tipe: "langkah"; dari: number; ke: number };
/** Susun bilangan dari yang paling kecil dengan mengetuk kartu (klik). */
export type LUrut = { tipe: "urut"; item: number[] };
/** Bilangan sasaran ada di urutan ke berapa bila diurutkan dari yang paling kecil (kanvas dan suara). `sasaran` = indeks pada `item`. */
export type LRank = { tipe: "rank"; item: number[]; sasaran: number };
/** Dua kartu angka dipasang di tempat puluhan dan satuan supaya terbentuk bilangan terbesar atau terkecil: klik = ketuk kartu puluhan, kanvas dan suara = angka puluhannya. */
export type LKartu = { tipe: "kartu"; a: number; b: number; target: "besar" | "kecil" };
/** Bilangan di antara dua penjepit yang berjarak satu bilangan kosong (klik). `pilihan` memuat bilangan yang diketuk. */
export type LAntara = { tipe: "antara"; kiri: number; kanan: number; pilihan: number[] };
/** Bilangan dibandingkan dengan patokan: lebih atau kurang (klik dan suara). */
export type LPatokan = { tipe: "patokan"; n: number; patokan: number };
/** Pada tabel seratus: dari kotak awal turun beberapa baris ke kotak tujuan: klik = ketuk kotak tujuan, kanvas dan suara = banyak baris. */
export type LTurun = { tipe: "turun"; dari: number; ke: number };
/** Teka-teki "aku k lebihnya (atau kurangnya) dari mulai": klik = pilih bilangannya, kanvas dan suara = angka satuan bilangan itu. */
export type LTeka = { tipe: "teka"; mulai: number; arah: "lebih" | "kurang"; k: number };
export type LangkahDasar = LTempat | LBanding | LTanda | LGaris | LLangkah | LUrut | LRank | LKartu | LAntara | LPatokan | LTurun | LTeka;
/** Klaim tokoh pada tugas Cari kesalahan. `katak`: bilangan yang dikatakan lebih besar ("a", "b", atau "sama"), atau bilangan tempat kepik berhenti. */
export type Klaim =
  | { jenis: "banding"; a: number; b: number; katak: "a" | "b" | "sama" }
  | { jenis: "garis"; dari: number; arah: "maju" | "mundur"; langkah: number; katak: number };
export type LangkahSalah = { tipe: "salah"; tokoh: string; klaim: Klaim; kataTokoh: string; alasan: [string, string, string]; benar: number; keliru: string };
export type Langkah = LangkahDasar | LangkahSalah;

export type Metode = "igil" | "tabel" | "patokan" | "kartu";
export const URUT_METODE: Metode[] = ["igil", "tabel", "patokan", "kartu"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Lihat Puluhan, Lihat Satuan, Pilih Kata",
  tabel: "Hundred Chart: Tabel Seratus",
  patokan: "Benchmark Numbers: Bilangan Patokan",
  kartu: "Card Sort: Urut Kartu",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F441}", tabel: "\u{1F522}", patokan: "\u{1F6A9}", kartu: "\u{1F0CF}" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar | null => (l.tipe === "salah" ? null : l);

/* ------------------------------ Hitungan dari data ------------------------------ */
/** Bilangan tempat berhenti bila kepik maju atau mundur beberapa langkah. */
export const hasilGaris = (l: LGaris): number => (l.arah === "maju" ? l.dari + l.langkah : l.dari - l.langkah);
/** Bilangan jawaban teka-teki. */
export const hasilTeka = (l: LTeka): number => (l.arah === "lebih" ? l.mulai + l.k : l.mulai - l.k);
/** Bilangan tengah di antara dua penjepit. */
export const tengahAntara = (l: LAntara): number => l.kiri + 1;
/** Banyak baris turun pada tabel seratus. */
export const barisTurun = (l: LTurun): number => puluhanDari(l.ke) - puluhanDari(l.dari);
/** Bilangan yang terbentuk dari kartu angka: kartu pertama di tempat puluhan. */
export const bentukKartu = (puluhan: number, satuan: number): number => puluhan * 10 + satuan;
/** Angka kartu yang harus di tempat puluhan agar terbentuk bilangan terbesar atau terkecil. */
export const puluhanKartu = (l: LKartu): number => (l.target === "besar" ? Math.max(l.a, l.b) : Math.min(l.a, l.b));
/** Urutan ke berapa (mulai satu) bilangan sasaran bila diurutkan dari yang paling kecil. */
export const urutanKe = (l: LRank): number => [...l.item].sort((p, q) => p - q).findIndex((v) => v === l.item[l.sasaran]) + 1;
/** Urutan kartu yang benar (indeks pada `item`, paling kecil lebih dulu). */
export const urutanBenar = (item: readonly number[]): number[] => item.map((_, i) => i).sort((p, q) => item[p] - item[q]);
/** Urutan acak tetap (bukan urutan benar) untuk kartu. */
export function urutanKartu(item: readonly number[]): number[] {
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
  if (k.jenis === "banding") return k.katak === (k.a > k.b ? "a" : k.a < k.b ? "b" : "sama");
  return k.katak === (k.arah === "maju" ? k.dari + k.langkah : k.dari - k.langkah);
}

export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: Nama };

/** Angka di tempat yang ditanyakan. */
export const nilaiTempat = (l: LTempat): number => (l.tanya === "puluhan" ? puluhanDari(l.n) : satuanDari(l.n));
/** Nama jawaban tugas dengan jawaban kata. */
export function namaKunci(l: LBanding | LTanda | LLangkah | LPatokan): Nama {
  switch (l.tipe) {
    case "banding":
    case "tanda":
      return namaBanding(l.a, l.b);
    case "langkah":
      return l.ke > l.dari ? "maju" : "mundur";
    case "patokan":
      return l.n > l.patokan ? "lebih" : "kurang";
  }
}

/** Kunci tiap tugas menurut caranya, dihitung dari data. Null bila tugas selesai lewat kegiatan (mengetuk, mengurutkan, memasang kartu, memilih alasan). */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  switch (l.tipe) {
    case "salah":
    case "garis":
    case "urut":
    case "antara":
      return null;
    case "tempat":
      return { jenis: "angka", n: nilaiTempat(l) };
    case "banding":
      return cara === "kanvas" ? { jenis: "angka", n: puluhanDari(Math.max(l.a, l.b)) } : cara === "suara" ? { jenis: "nama", nama: namaKunci(l) } : null;
    case "tanda":
      return cara === "kanvas" ? null : { jenis: "nama", nama: namaKunci(l) };
    case "langkah":
      return cara === "kanvas" ? { jenis: "angka", n: Math.abs(l.ke - l.dari) } : { jenis: "nama", nama: namaKunci(l) };
    case "rank":
      return { jenis: "angka", n: urutanKe(l) };
    case "kartu":
      return cara === "klik" ? null : { jenis: "angka", n: puluhanKartu(l) };
    case "patokan":
      return cara === "kanvas" ? null : { jenis: "nama", nama: namaKunci(l) };
    case "turun":
      return cara === "klik" ? null : { jenis: "angka", n: barisTurun(l) };
    case "teka":
      return cara === "klik" ? { jenis: "angka", n: hasilTeka(l) } : { jenis: "angka", n: satuanDari(hasilTeka(l)) };
  }
}

/**
 * Apakah tugas langsung siap dijawab (tanpa kegiatan lebih dulu)? Kanvas dan suara: ya (gambar sudah jadi). Klik: bila tugas punya jawaban pilihan
 * (tempat, tanda, langkah, patokan, rank, teka); tugas lain memakai kegiatan. Tidak bergantung pada rupa, sehingga tombol tidak macet pada lambang.
 */
export function siapLangsung(l: Langkah, _rupa: Rupa, cara: Cara): boolean {
  if (cara !== "klik") return true;
  return kunciJawab(l, cara) !== null;
}

/** Pilihan nama di sekitar kunci, selalu memuat kunci. */
export function pilihanNamaDari(nama: Nama): Nama[] {
  if (nama === "besar" || nama === "kecil" || nama === "sama") return ["besar", "kecil", "sama"];
  if (nama === "lebih" || nama === "kurang") return ["lebih", "kurang"];
  return ["maju", "mundur"];
}
/** Pilihan angka (empat) selalu memuat kunci, urut naik. Angka satu sampai sembilan: dalam satu sampai sembilan; dua angka: kunci, sepuluh lebih banyak atau kurang, dan sebelahnya. */
export function pilihanAngka(n: number): number[] {
  if (n <= 9) {
    const kandidat = [n - 2, n - 1, n + 1, n + 2, n + 3, n - 3, n + 4].filter((x) => x >= 1 && x <= 9 && x !== n);
    return [n, ...kandidat.slice(0, 3)].sort((a, b) => a - b);
  }
  const kandidat = [n + 10, n - 10, n + 1, n - 1, n + 11, n - 11, n + 2, n - 2].filter((x) => x >= 10 && x <= 99 && x !== n);
  return [n, ...kandidat.slice(0, 3)].sort((a, b) => a - b);
}
/** Pilihan bilangan untuk tugas Garis (empat): hasil benar, hasil bila awal ikut dihitung, hasil bila terlalu jauh, dan arah berlawanan. Urut naik. */
export function pilihanGaris(l: LGaris): number[] {
  const t = l.arah === "maju" ? 1 : -1;
  const semua = [l.dari + t * l.langkah, l.dari + t * (l.langkah - 1), l.dari + t * (l.langkah + 1), l.dari - t * l.langkah];
  return [...new Set(semua)].sort((a, b) => a - b);
}
/** Jendela tali (bilangan pertama dan terakhir yang digambar) untuk tugas yang memakai tali. */
export function jendelaTali(l: LGaris | LLangkah | LAntara): { dari: number; sampai: number } {
  if (l.tipe === "garis") {
    const h = hasilGaris(l);
    return { dari: Math.min(l.dari, h) - 2, sampai: Math.max(l.dari, h) + 2 };
  }
  if (l.tipe === "langkah") return { dari: Math.min(l.dari, l.ke) - 1, sampai: Math.max(l.dari, l.ke) + 1 };
  return { dari: l.kiri - 2, sampai: l.kanan + 2 };
}

/* ------------------------------ Kalimat ------------------------------ */
const ARAH_KALIMAT: Record<"besar" | "kecil" | "sama", string> = { besar: "lebih besar dari", kecil: "lebih kecil dari", sama: "sama dengan" };

/** Kalimat yang menjelaskan jawaban benar (tanpa digit). */
export function kalimatKunci(l: Langkah, cara: Cara, rupa: Rupa = "benda"): string {
  void rupa;
  void cara;
  switch (l.tipe) {
    case "salah":
      return klaimBenar(l.klaim) ? `Jawaban ${l.tokoh} memang benar.` : `Jawaban ${l.tokoh} keliru.`;
    case "tempat":
      return `Bilangan ${kata(l.n)} punya ${kata(puluhanDari(l.n))} puluhan dan ${kata(satuanDari(l.n))} satuan, jadi angka di tempat ${l.tanya} adalah ${kata(nilaiTempat(l))}.`;
    case "banding": {
      const nm = namaBanding(l.a, l.b);
      if (nm === "sama") return "Kedua bilangan sama, jadi tidak ada yang lebih besar.";
      const besar = Math.max(l.a, l.b);
      const kecil = Math.min(l.a, l.b);
      const alasan = puluhanDari(besar) !== puluhanDari(kecil) ? "puluhannya lebih banyak" : "puluhannya sama dan satuannya lebih banyak";
      return `${kapital(kata(besar))} lebih besar dari ${kata(kecil)}, karena ${alasan}.`;
    }
    case "tanda":
      return `${kapital(kata(l.a))} ${ARAH_KALIMAT[namaBanding(l.a, l.b)]} ${kata(l.b)}.`;
    case "garis":
      return `Kepik ${l.arah} ${kata(l.langkah)} langkah dari ${kata(l.dari)} dan berhenti di ${kata(hasilGaris(l))}. Awalnya tidak dihitung.`;
    case "langkah":
      return `Dari ${kata(l.dari)} ke ${kata(l.ke)} kepik ${l.ke > l.dari ? "maju" : "mundur"} ${kata(Math.abs(l.ke - l.dari))} langkah.`;
    case "urut":
      return "Urutan yang benar dari yang paling kecil: lihat puluhannya dulu, lalu satuannya.";
    case "rank":
      return `Bilangan itu ada di urutan ${urutanKe(l) === 1 ? "pertama" : `ke${kata(urutanKe(l))}`} dari yang paling kecil.`;
    case "kartu":
      return `Bilangan ${l.target === "besar" ? "terbesar" : "terkecil"} didapat bila angka ${kata(puluhanKartu(l))} di tempat puluhan, jadi bilangannya ${kata(bentukKartu(puluhanKartu(l), l.a + l.b - puluhanKartu(l)))}.`;
    case "antara":
      return `${kapital(kata(tengahAntara(l)))} ada di antara ${kata(l.kiri)} dan ${kata(l.kanan)}.`;
    case "patokan":
      return namaKunci(l) === "lebih" ? `${kapital(kata(l.n))} lebih dari ${kata(l.patokan)}, jadi besar.` : `${kapital(kata(l.n))} kurang dari ${kata(l.patokan)}, jadi kecil.`;
    case "turun":
      return `Dari ${kata(l.dari)} turun ${kata(barisTurun(l))} baris sampai ${kata(l.ke)}. Tiap turun satu baris, bilangan bertambah sepuluh.`;
    case "teka": {
      const h = hasilTeka(l);
      return `${kapital(kata(l.k))} ${l.arah === "lebih" ? "lebihnya" : "kurangnya"} dari ${kata(l.mulai)} adalah ${kata(h)}, dan angka satuannya ${kata(satuanDari(h))}.`;
    }
  }
}

/** Instruksi satu tugas (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  const aksi = cara === "kanvas" ? "Tulis satu angka di kanvas." : cara === "suara" ? "Ucapkan satu bilangan." : "Pilih jawabannya.";
  const gambarPapan = rupa === "benda" ? "Lihat ikatan botol dan botol lepas pada papan." : rupa === "diagram" ? "Lihat batang puluhan dan kotak satuan." : "Lihat kartu bilangan.";
  switch (l.tipe) {
    case "salah":
      return `${l.tokoh} sudah menjawab tentang ${l.klaim.jenis === "banding" ? "membandingkan dua bilangan" : "melompat di garis bilangan"}. Apakah jawabannya benar? Pilih alasan yang tepat.`;
    case "tempat":
      return `${gambarPapan} Berapa angka di tempat ${l.tanya}? ${aksi}`;
    case "banding":
      return cara === "klik"
        ? `Lihat dua papan bilangan. Ketuk bilangan yang paling ${l.cari}.`
        : cara === "kanvas"
          ? "Lihat dua papan bilangan. Bilangan mana yang lebih besar? Tulis satu angka puluhan dari bilangan itu."
          : "Lihat dua papan bilangan. Bilangan pertama lebih besar atau lebih kecil daripada bilangan kedua? Ucapkan besar, kecil, atau sama.";
    case "tanda":
      return cara === "suara"
        ? "Dua bilangan ditulis berdampingan. Bilangan pertama lebih besar, lebih kecil, atau sama dengan bilangan kedua? Ucapkan besar, kecil, atau sama."
        : "Dua bilangan ditulis berdampingan. Pilih kata yang tepat untuk bilangan pertama terhadap bilangan kedua.";
    case "garis":
      return `${rupa === "lambang" ? "Kartu menuliskan" : rupa === "benda" ? "Kepik berdiri pada penjepit di tali jemuran." : "Titik berdiri pada garis bilangan."} Bergerak ${l.arah} ${kata(l.langkah)} langkah, lalu berhenti. Ketuk bilangan tempat berhenti.`;
    case "langkah":
      return cara === "kanvas"
        ? "Kepik pindah dari bilangan pertama ke bilangan kedua pada tali. Berapa langkah yang dilompatinya? Tulis satu angka di kanvas."
        : cara === "suara"
          ? "Kepik pindah dari bilangan pertama ke bilangan kedua. Kepik maju atau mundur? Ucapkan maju, atau mundur."
          : "Kepik pindah dari bilangan pertama ke bilangan kedua pada tali. Pilih kata yang tepat: maju atau mundur.";
    case "urut":
      return "Susun bilangan dari yang paling kecil sampai yang paling besar. Ketuk kartu dari yang paling kecil.";
    case "rank":
      return `Bilangan ditulis tidak berurutan. Urutkan dari yang paling kecil. Bilangan bertanda tanya ada di urutan ke berapa? ${aksi}`;
    case "kartu":
      return cara === "klik"
        ? `Dua kartu angka akan dipasang di tempat puluhan dan satuan. Ketuk kartu yang dipasang di tempat puluhan supaya terbentuk bilangan ${l.target === "besar" ? "terbesar" : "terkecil"}.`
        : `Dua kartu angka dipasang supaya terbentuk bilangan ${l.target === "besar" ? "terbesar" : "terkecil"}. Angka mana yang ada di tempat puluhan? ${aksi}`;
    case "antara":
      return rupa === "lambang" ? "Dua bilangan berjarak satu bilangan kosong. Ketuk bilangan yang ada di antara keduanya." : "Dua penjepit berjarak satu bilangan kosong pada tali. Ketuk bilangan yang ada di antara keduanya.";
    case "patokan":
      return cara === "suara"
        ? `Bandingkan bilangan pada gambar dengan patokan ${kata(l.patokan)}. Lebih atau kurang dari patokan? Ucapkan lebih, atau kurang.`
        : `Bandingkan bilangan pada gambar dengan patokan ${kata(l.patokan)}. Lebih atau kurang dari patokan? Pilih jawabannya.`;
    case "turun":
      return cara === "klik"
        ? `Pada tabel seratus, kotak awal ditandai. Turun ${kata(barisTurun(l))} baris dari kotak itu. Ketuk kotak tempat berhenti.`
        : `Pada tabel seratus, kotak awal dan kotak tujuan ditandai. Berapa baris turunnya? ${aksi}`;
    case "teka":
      return cara === "klik"
        ? "Baca teka-teki pada gambar. Pilih bilangan yang cocok dengan teka-teki itu."
        : `Baca teka-teki pada gambar. Berapa angka satuan dari bilangan itu? ${aksi}`;
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  if (cara === "kanvas") return "Tulis jawabannya sebagai satu angka.";
  if (cara === "suara") return l.tipe === "tempat" || l.tipe === "rank" || l.tipe === "kartu" || l.tipe === "teka" || l.tipe === "turun" ? "Ucapkan jawabannya." : "Ucapkan satu kata.";
  return "Pilih jawaban yang tepat.";
}

/* ------------------------------ Petunjuk salah ------------------------------ */
/** Petunjuk saat bilangan yang diketuk pada tugas Banding, Garis, atau Antara belum benar. */
export function petunjukKetuk(l: LBanding | LGaris | LAntara | LTurun): string {
  switch (l.tipe) {
    case "banding":
      return "Lihat puluhannya dulu. Puluhan yang lebih banyak berarti bilangan lebih besar. Bila puluhannya sama, lihat satuannya.";
    case "garis":
      return "Awalnya tidak dihitung. Langkah pertama menuju bilangan di sebelahnya. Maju ke kanan, mundur ke kiri.";
    case "antara":
      return "Bilangan di antara dua bilangan ada tepat di tengah keduanya, lebih besar dari yang kiri dan lebih kecil dari yang kanan.";
    case "turun":
      return "Turun satu baris menambah sepuluh. Angka satuannya tetap, hanya puluhannya yang bertambah.";
  }
}
/** Petunjuk saat langkah yang diketuk belum waktunya (tugas Urut). */
export const petunjukUrut = (l: LUrut, ketuk: number, sudah: number[]): string => {
  const benar = urutanBenar(l.item);
  const harus = l.item[benar[sudah.length]];
  return `${kapital(kata(l.item[ketuk]))} belum yang paling kecil. Lihat puluhannya dulu: ${kata(harus)} lebih kecil.`;
};
/** Petunjuk saat kartu angka dipasang belum tepat. */
export const petunjukKartu = (l: LKartu): string =>
  l.target === "besar" ? "Bilangan terbesar didapat bila angka yang lebih besar ada di tempat puluhan." : "Bilangan terkecil didapat bila angka yang lebih kecil ada di tempat puluhan.";

/** Petunjuk saat jawaban angka atau kata salah: menunjuk kesalahannya (tanpa digit). `jawab`: kata yang dipilih atau diucapkan, atau angka yang ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number, rupa: Rupa = "benda"): string {
  void rupa;
  if (l.tipe === "salah") return `Lihat lagi. ${l.keliru}`;
  if (typeof jawab === "number") {
    const k = kunciJawab(l, cara);
    const kurang = k?.jenis === "angka" && jawab < k.n;
    switch (l.tipe) {
      case "tempat":
        return `Puluhan ada di sebelah kiri dan satuan di sebelah kanan. Lihat tempat ${l.tanya}. ${kurang ? "Jawabanmu masih kurang." : "Jawabanmu terlalu banyak."}`;
      case "banding":
        return "Cari dulu bilangan yang lebih besar: lihat puluhannya dulu. Lalu tulis angka puluhan dari bilangan itu.";
      case "langkah":
        return `Hitung loncatannya satu per satu. Awalnya tidak dihitung. ${kurang ? "Jawabanmu masih kurang." : "Jawabanmu terlalu banyak."}`;
      case "rank":
        return `Urutkan dulu bilangan dari yang paling kecil, baru hitung urutannya. ${kurang ? "Urutanmu terlalu depan." : "Urutanmu terlalu belakang."}`;
      case "kartu":
        return petunjukKartu(l);
      case "turun":
        return "Hitung berapa baris dari kotak awal ke kotak tujuan. Tiap baris menambah sepuluh.";
      case "teka":
        return `Cari dulu bilangannya: ${l.arah === "lebih" ? "maju" : "mundur"} dari ${kata(l.mulai)} sebanyak ${kata(l.k)} langkah. Lalu lihat angka satuannya.`;
      default:
        return "Periksa lagi gambarnya dengan teliti.";
    }
  }
  if (l.tipe === "banding" || l.tipe === "tanda") return "Lihat puluhannya dulu. Puluhan yang lebih banyak berarti bilangan lebih besar. Bila puluhannya sama, lihat satuannya.";
  if (l.tipe === "langkah") return jawab === "mundur" ? "Bilangan kedua lebih besar, jadi kepik bergerak ke kanan. Itu maju." : "Bilangan kedua lebih kecil, jadi kepik bergerak ke kiri. Itu mundur.";
  if (l.tipe === "patokan") return `Bandingkan dengan patokan ${kata(l.patokan)}. Lebih dari patokan berarti besar, kurang dari patokan berarti kecil.`;
  return "Periksa lagi dengan teliti.";
}
