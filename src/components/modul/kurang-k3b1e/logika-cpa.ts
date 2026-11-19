/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 3 Bab 1 Sub-Bab E "Sisa Stok Pak Anto" (pengurangan sampai seratus):
 * jenis tugas, kunci, pilihan, instruksi (tanpa digit), dan petunjuk salah. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-kurang-k3b1e.mjs.
 * Jawaban tidak hanya angka: memilih hasil, kata (satuan, puluhan, pinjam, tanpa, tambah, kurang), menyusun langkah, satu angka di kanvas, dan satu kata atau bilangan pendek
 * yang diucapkan. Semua kunci dihitung dari dua bilangan (bukan kunci tetap).
 */
import type { Cara } from "../lemari-k1b1a/logika";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";

export type Rupa = "benda" | "diagram" | "lambang";
export type Nama = "satuan" | "puluhan" | "pinjam" | "tanpa" | "tambah" | "kurang";
export const URUT_NAMA: Nama[] = ["satuan", "puluhan", "pinjam", "tanpa", "tambah", "kurang"];
/** Tulisan tombol untuk tiap kata jawaban. */
export const LABEL_NAMA: Record<Nama, string> = {
  satuan: "satuan",
  puluhan: "puluhan",
  pinjam: "pinjam puluhan",
  tanpa: "tanpa pinjam",
  tambah: "tambah",
  kurang: "kurang",
};

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

/* ------------------------------ Hitungan dua bilangan ------------------------------ */
export const puluh = (n: number): number => Math.floor(n / 10);
export const sat = (n: number): number => n % 10;
export const hasilKurang = (a: number, b: number): number => a - b;
/** Satuan atas lebih kecil dari satuan bawah: perlu meminjam satu puluhan. */
export const perluPinjam = (a: number, b: number): boolean => sat(a) < sat(b);
/** Hasil bila satuan dibalik (satuan yang kecil dikurangkan dari yang besar), kesalahan umum. */
export const hasilBalik = (a: number, b: number): number => (puluh(a) - puluh(b)) * 10 + Math.abs(sat(a) - sat(b));
/** Hasil bila lupa menurunkan puluhan setelah meminjam, kesalahan umum. */
export const hasilLupa = (a: number, b: number): number => (puluh(a) - puluh(b)) * 10 + (sat(a) + 10 - sat(b));

/** Hitung naik dari b ke a: naik sampai puluhan penuh, naik puluhan, lalu naik satuan sampai a. */
export const naikSatuan1 = (a: number, b: number): number => (10 - sat(b)) % 10;
export const naikPuluh = (a: number, b: number): number => puluh(a) - puluh(b) - (sat(b) === 0 ? 0 : 1);
export const naikSatuan2 = (a: number, b: number): number => {
  void b;
  return sat(a);
};

/* ------------------------------ Langkah ------------------------------ */
type Dua = { a: number; b: number };
/** Hasil pengurangan a dikurangi b: klik = pilih hasil, kanvas dan suara hanya bila hasil satu angka. */
export type LHasil = { tipe: "hasil" } & Dua;
/** Cerita pengurangan: ada a benda, lalu b diambil atau terjual; berapa sisanya. */
export type LCerita = { tipe: "cerita"; benda: string; aksi: string } & Dua;
/** Angka satuan pada hasil. */
export type LSatuan = { tipe: "satuan" } & Dua;
/** Angka puluhan pada hasil. */
export type LPuluhan = { tipe: "puluhan" } & Dua;
/** Puluhan di atas tinggal berapa setelah meminjam satu puluhan. */
export type LSisaPuluh = { tipe: "sisapuluh" } & Dua;
/** Satuan di atas menjadi berapa setelah meminjam satu puluhan (klik). */
export type LSatuanJadi = { tipe: "satuanjadi" } & Dua;
/** Perlu meminjam puluhan atau tanpa pinjam (klik dan suara). */
export type LPinjam = { tipe: "pinjam" } & Dua;
/** Hitung naik dari b ke a: langkah satuan pertama, banyak puluhan, langkah satuan terakhir, atau jumlah semua langkah. */
export type LNaik = { tipe: "naik"; bagian: "satuan1" | "puluh" | "satuan2" | "total" } & Dua;
/** Mengurangi dimulai dari tempat mana (dulu = satuan) dan lanjut ke tempat mana (lalu = puluhan). */
export type LTempat = { tipe: "tempat"; tanya: "dulu" | "lalu" } & Dua;
/** Operasi untuk memeriksa pengurangan (tambah). */
export type LPeriksaOp = { tipe: "periksaop" } & Dua;
/** Hasil penjumlahan pemeriksa: hasil ditambah b sama dengan berapa (klik). */
export type LBalikJumlah = { tipe: "balikjumlah" } & Dua;
/** Susun langkah dengan mengetuk (klik): ragam susun atau pinjam. */
export type LUrut = { tipe: "urut"; ragam: "susun" | "pinjam" };
export type LangkahDasar = LHasil | LCerita | LSatuan | LPuluhan | LSisaPuluh | LSatuanJadi | LPinjam | LNaik | LTempat | LPeriksaOp | LBalikJumlah | LUrut;
/**
 * Klaim tokoh pada tugas Cari kesalahan: tokoh menyebut `hasil` untuk a dikurangi b. `balik`: tokoh membalik satuan, `lupa`: tokoh lupa menurunkan puluhan setelah meminjam,
 * `benar`: tokoh menjawab dengan langkah yang benar. Klaim benar bila hasilnya sama dengan a dikurangi b.
 */
export type Klaim = { jenis: "balik" | "lupa" | "benar" } & Dua & { hasil: number };
export type LangkahSalah = { tipe: "salah"; tokoh: string; klaim: Klaim; kataTokoh: string; alasan: [string, string, string]; benar: number; keliru: string };
export type Langkah = LangkahDasar | LangkahSalah;

export type Metode = "igil" | "susun" | "naik" | "pinjam";
export const URUT_METODE: Metode[] = ["igil", "susun", "naik", "pinjam"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Satuan Dulu, Pinjam Puluhan",
  susun: "Standard Subtraction: Pengurangan Bersusun",
  naik: "Counting Up: Menghitung Naik",
  pinjam: "Regrouping: Pinjam Puluhan",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F441}", susun: "\u{1F4DD}", naik: "\u{1F4C8}", pinjam: "\u{1F4E6}" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar | null => (l.tipe === "salah" ? null : l);

/** Langkah pengurangan bersusun dan pinjam (urutan benar, empat langkah tiap ragam). */
export const LANGKAH_URUT: Record<"susun" | "pinjam", readonly string[]> = {
  susun: ["Susun lurus", "Kurangi satuan", "Kurangi puluhan", "Periksa dengan tambah"],
  pinjam: ["Satuan atas kecil", "Pinjam satu puluhan", "Satuan jadi sepuluh lebih", "Kurangi seperti biasa"],
};
export const urutanBenar = (): number[] => [0, 1, 2, 3];

/** Urutan acak tetap (bukan urutan benar) bagi sejumlah kartu. */
export function acakTetap(n: number, benar: number[]): number[] {
  const dasar = Array.from({ length: n }, (_, i) => i);
  for (let geser = 1; geser < n + 3; geser += 1) {
    const kandidat = dasar.map((i) => (i * 2 + geser) % n);
    if (new Set(kandidat).size === n && kandidat.some((v, i) => v !== benar[i])) return kandidat;
  }
  return dasar.map((i) => (i + 1) % n);
}

/** Klaim tokoh benar? */
export const klaimBenar = (k: Klaim): boolean => k.hasil === k.a - k.b;

export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: Nama };

/** Kunci tiap tugas menurut caranya, dihitung dari dua bilangan. Null bila tugas selesai lewat kegiatan (menyusun langkah, memilih alasan). */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  void cara;
  switch (l.tipe) {
    case "salah":
    case "urut":
      return null;
    case "hasil":
    case "cerita":
      return { jenis: "angka", n: hasilKurang(l.a, l.b) };
    case "satuan":
      return { jenis: "angka", n: sat(hasilKurang(l.a, l.b)) };
    case "puluhan":
      return { jenis: "angka", n: puluh(hasilKurang(l.a, l.b)) };
    case "sisapuluh":
      return { jenis: "angka", n: puluh(l.a) - 1 };
    case "satuanjadi":
      return { jenis: "angka", n: 10 + sat(l.a) };
    case "pinjam":
      return { jenis: "nama", nama: perluPinjam(l.a, l.b) ? "pinjam" : "tanpa" };
    case "naik":
      return {
        jenis: "angka",
        n: l.bagian === "satuan1" ? naikSatuan1(l.a, l.b) : l.bagian === "puluh" ? naikPuluh(l.a, l.b) : l.bagian === "satuan2" ? naikSatuan2(l.a, l.b) : hasilKurang(l.a, l.b),
      };
    case "tempat":
      return { jenis: "nama", nama: l.tanya === "dulu" ? "satuan" : "puluhan" };
    case "periksaop":
      return { jenis: "nama", nama: "tambah" };
    case "balikjumlah":
      return { jenis: "angka", n: l.a };
  }
}

/**
 * Apakah tugas langsung siap dijawab (tanpa kegiatan lebih dulu)? Kanvas dan suara: ya. Klik: bila tugas punya jawaban pilihan;
 * tugas lain memakai kegiatan. Tidak bergantung pada rupa, sehingga tombol tidak macet pada lambang.
 */
export function siapLangsung(l: Langkah, _rupa: Rupa, cara: Cara): boolean {
  if (cara !== "klik") return true;
  return kunciJawab(l, cara) !== null;
}

/** Pilihan nama di sekitar kunci, selalu memuat kunci. */
export function pilihanNamaDari(nama: Nama): Nama[] {
  if (nama === "satuan" || nama === "puluhan") return ["satuan", "puluhan"];
  if (nama === "pinjam" || nama === "tanpa") return ["pinjam", "tanpa"];
  return ["tambah", "kurang"];
}

/** Pilihan angka (empat) selalu memuat kunci, urut naik, semua unik. `penggoda`: kesalahan umum yang diutamakan sebagai pengecoh. */
export function pilihanAngka(n: number, penggoda: number[] = [], batas?: [number, number]): number[] {
  const batasAtas = batas ? batas[1] : n <= 9 ? 9 : 99;
  const batasBawah = batas ? batas[0] : n <= 9 ? 0 : 10;
  const kandidat = [...penggoda, n + 10, n - 10, n + 1, n - 1, n + 2, n - 2, n + 3, n - 3, n + 4, n - 4].filter((x) => x >= batasBawah && x <= batasAtas && x !== n);
  const unik = [...new Set(kandidat)];
  return [n, ...unik.slice(0, 3)].sort((p, q) => p - q);
}
/** Pilihan angka untuk satu tugas: pengecoh dari kesalahan umum (lupa meminjam, salah meminjam, membalik satuan). */
export function pilihanAngkaTugas(l: Langkah, n: number): number[] {
  if (l.tipe === "hasil" || l.tipe === "cerita") return pilihanAngka(n, [n + 10, n >= 10 ? n - 10 : n + 1, hasilBalik(l.a, l.b), hasilLupa(l.a, l.b)].filter((x) => x !== n && x >= 0 && x <= 99 && (n >= 10 ? x >= 10 : x <= 9)));
  if (l.tipe === "satuanjadi") return pilihanAngka(n, [sat(l.a), n + 1, n - 1, n + 10].filter((x) => x >= 1 && x <= 19), [1, 19]);
  return pilihanAngka(n);
}

/* ------------------------------ Kalimat ------------------------------ */
const kk = (a: number, b: number): string => `${kata(a)} dikurangi ${kata(b)}`;

/** Kalimat yang menjelaskan jawaban benar (tanpa digit). */
export function kalimatKunci(l: Langkah, cara: Cara, rupa: Rupa = "benda"): string {
  void rupa;
  void cara;
  switch (l.tipe) {
    case "salah":
      return klaimBenar(l.klaim) ? `Jawaban ${l.tokoh} memang benar.` : `Jawaban ${l.tokoh} keliru.`;
    case "hasil":
    case "cerita":
      return `${kk(l.a, l.b)} sama dengan ${kata(hasilKurang(l.a, l.b))}.`;
    case "satuan":
      return `Hasilnya ${kata(hasilKurang(l.a, l.b))}, jadi angka satuannya ${kata(sat(hasilKurang(l.a, l.b)))}.`;
    case "puluhan":
      return `Hasilnya ${kata(hasilKurang(l.a, l.b))}, jadi angka puluhannya ${kata(puluh(hasilKurang(l.a, l.b)))}.`;
    case "sisapuluh":
      return `Setelah meminjam satu puluhan, puluhan di atas tinggal ${kata(puluh(l.a) - 1)}.`;
    case "satuanjadi":
      return `Satu puluhan menjadi sepuluh satuan, jadi satuan di atas menjadi ${kata(10 + sat(l.a))}.`;
    case "pinjam":
      return perluPinjam(l.a, l.b)
        ? `Satuan ${kata(sat(l.a))} lebih kecil dari satuan ${kata(sat(l.b))}, jadi perlu meminjam satu puluhan.`
        : `Satuan ${kata(sat(l.a))} cukup dikurangi satuan ${kata(sat(l.b))}, jadi tanpa pinjam.`;
    case "naik": {
      if (l.bagian === "satuan1") return `Dari ${kata(l.b)} naik ${kata(naikSatuan1(l.a, l.b))} sampai puluhan penuh berikutnya.`;
      if (l.bagian === "puluh") return `Dari puluhan penuh naik ${kata(naikPuluh(l.a, l.b))} puluhan sampai puluhan penuh di depan ${kata(l.a)}.`;
      if (l.bagian === "satuan2") return `Dari puluhan penuh terdekat naik ${kata(naikSatuan2(l.a, l.b))} lagi sampai ${kata(l.a)}.`;
      return `Semua langkah naik dijumlah, hasilnya ${kata(hasilKurang(l.a, l.b))}, yaitu selisih ${kata(l.a)} dan ${kata(l.b)}.`;
    }
    case "tempat":
      return l.tanya === "dulu" ? "Pengurangan bersusun dimulai dari satuan." : "Setelah satuan selesai, kita lanjut mengurangi puluhan.";
    case "periksaop":
      return "Pengurangan diperiksa dengan penjumlahan: hasil ditambah bilangan yang dikurangkan harus kembali ke bilangan awal.";
    case "balikjumlah":
      return `${kata(hasilKurang(l.a, l.b))} ditambah ${kata(l.b)} sama dengan ${kata(l.a)}, kembali ke bilangan awal.`;
    case "urut":
      return l.ragam === "susun" ? "Urutan pengurangan bersusun: susun lurus, kurangi satuan, kurangi puluhan, lalu periksa dengan tambah." : "Urutan meminjam: satuan atas kecil, pinjam satu puluhan, satuan jadi sepuluh lebih, lalu kurangi seperti biasa.";
  }
}

/** Instruksi satu tugas (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  const aksi = cara === "kanvas" ? "Tulis satu angka di kanvas." : cara === "suara" ? "Ucapkan satu bilangan." : "Pilih jawabannya.";
  const lihat = rupa === "benda" ? "Lihat rak mi." : rupa === "diagram" ? "Lihat diagram balok." : "Lihat susunan angka.";
  const aksiKata = cara === "suara" ? "Ucapkan satu kata." : "Pilih jawabannya.";
  switch (l.tipe) {
    case "salah":
      return `${l.tokoh} sudah menjawab ${kk(l.klaim.a, l.klaim.b)}. Apakah jawabannya benar? Pilih alasan yang tepat.`;
    case "hasil":
      return `${lihat} ${kk(l.a, l.b)} sama dengan berapa? ${aksi}`;
    case "cerita":
      return `Ada ${kata(l.a)} ${l.benda}, ${l.aksi} ${kata(l.b)}. Berapa sisanya? ${aksi}`;
    case "satuan":
      return `${lihat} ${kk(l.a, l.b)}. Berapa angka satuan pada hasilnya? ${aksi}`;
    case "puluhan":
      return `${lihat} ${kk(l.a, l.b)}. Berapa angka puluhan pada hasilnya? ${aksi}`;
    case "sisapuluh":
      return `${lihat} Pada ${kk(l.a, l.b)}, satuan ${kata(sat(l.a))} lebih kecil dari satuan ${kata(sat(l.b))}, jadi pinjam satu puluhan. Puluhan di atas tinggal berapa? ${aksi}`;
    case "satuanjadi":
      return `${lihat} Pada ${kk(l.a, l.b)}, satu puluhan dipinjam. Satuan di atas menjadi berapa? Pilih jawabannya.`;
    case "pinjam":
      return cara === "suara"
        ? `${lihat} Pada ${kk(l.a, l.b)}, apakah perlu meminjam satu puluhan? Ucapkan pinjam, atau tanpa.`
        : `${lihat} Pada ${kk(l.a, l.b)}, apakah perlu meminjam satu puluhan? Pilih pinjam puluhan, atau tanpa pinjam.`;
    case "naik":
      if (l.bagian === "satuan1") return `${lihat} Hitung naik dari ${kata(l.b)} ke ${kata(l.a)}. Dari ${kata(l.b)} naik berapa sampai puluhan penuh berikutnya? ${aksi}`;
      if (l.bagian === "puluh") return `${lihat} Hitung naik dari ${kata(l.b)} ke ${kata(l.a)}. Dari puluhan penuh itu naik berapa puluhan sampai puluhan penuh di depan ${kata(l.a)}? ${aksi}`;
      if (l.bagian === "satuan2") return `${lihat} Hitung naik dari ${kata(l.b)} ke ${kata(l.a)}. Dari puluhan penuh terdekat naik berapa lagi sampai ${kata(l.a)}? ${aksi}`;
      return `${lihat} Hitung naik dari ${kata(l.b)} sampai ${kata(l.a)}. Jumlah semua langkah naik adalah berapa? ${aksi}`;
    case "tempat":
      return l.tanya === "dulu"
        ? `${lihat} Pada pengurangan bersusun, kita mulai mengurangi dari tempat mana, satuan atau puluhan? ${aksiKata}`
        : `${lihat} Setelah satuan selesai, kita lanjut mengurangi tempat mana, satuan atau puluhan? ${aksiKata}`;
    case "periksaop":
      return `${lihat} Untuk memeriksa hasil ${kk(l.a, l.b)}, kita memakai operasi apa, tambah atau kurang? ${aksiKata}`;
    case "balikjumlah":
      return `${lihat} Hasil ${kk(l.a, l.b)} adalah ${kata(hasilKurang(l.a, l.b))}. Periksa: ${kata(hasilKurang(l.a, l.b))} ditambah ${kata(l.b)} sama dengan berapa? Pilih jawabannya.`;
    case "urut":
      return l.ragam === "susun" ? "Susun langkah pengurangan bersusun. Ketuk langkah pertama sampai terakhir secara berurutan." : "Susun langkah meminjam satu puluhan. Ketuk langkah pertama sampai terakhir secara berurutan.";
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  if (cara === "kanvas") return "Tulis jawabannya sebagai satu angka.";
  if (cara === "suara") return kunciJawab(l, cara)?.jenis === "angka" ? "Ucapkan jawabannya." : "Ucapkan satu kata.";
  return "Pilih jawaban yang tepat.";
}

/* ------------------------------ Petunjuk salah ------------------------------ */
/** Petunjuk saat ketukan pada tugas Urut belum benar. */
export function petunjukKetuk(l: LUrut): string {
  return l.ragam === "susun"
    ? "Mulai dengan menyusun lurus, lalu kurangi satuan, kurangi puluhan, dan terakhir periksa dengan tambah."
    : "Mulai dari satuan atas yang kecil, lalu pinjam satu puluhan, satuan jadi sepuluh lebih, dan terakhir kurangi seperti biasa.";
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
      case "hasil":
      case "cerita":
        if (perluPinjam(l.a, l.b) && jawab === hasilLupa(l.a, l.b)) return "Setelah meminjam satu puluhan, puluhan di atas harus dikurangi satu. Periksa lagi puluhannya.";
        if (perluPinjam(l.a, l.b) && jawab === hasilBalik(l.a, l.b)) return "Satuan yang kecil tidak boleh dibalik. Pinjam satu puluhan supaya satuan atas cukup dikurangi.";
        return `Kurangi satuan dulu, lalu puluhan. Bila satuan atas kecil, pinjam satu puluhan. ${arah}`;
      case "satuan":
        return `Kurangi dulu satuan atas dengan satuan bawah. Bila satuan atas kecil, pinjam satu puluhan dulu. ${arah}`;
      case "puluhan":
        return `Kurangi puluhan setelah satuan. Bila tadi meminjam, puluhan atas sudah berkurang satu. ${arah}`;
      case "sisapuluh":
        return "Satu puluhan dipinjam, jadi puluhan di atas berkurang satu. Kurangi puluhan atas dengan satu.";
      case "satuanjadi":
        return "Satu puluhan sama dengan sepuluh satuan. Tambahkan sepuluh ke satuan di atas.";
      case "naik":
        return "Hitung naik dari bilangan kecil ke bilangan besar. Naik dulu sampai puluhan penuh, lalu naik puluhan, lalu naik satuan sisanya.";
      case "balikjumlah":
        return "Hasil ditambah bilangan yang dikurangkan harus kembali ke bilangan awal. Tambahkan satuan dulu, lalu puluhan.";
      default:
        return "Periksa lagi dengan teliti.";
    }
  }
  switch (l.tipe) {
    case "pinjam":
      return "Bandingkan satuan atas dengan satuan bawah. Bila satuan atas lebih kecil, kita meminjam satu puluhan. Bila cukup, tanpa pinjam.";
    case "tempat":
      return "Pengurangan bersusun dimulai dari satuan. Setelah itu baru puluhan.";
    case "periksaop":
      return "Pengurangan diperiksa dengan penjumlahan: hasil ditambah bilangan yang dikurangkan harus sama dengan bilangan awal.";
    default:
      return "Periksa lagi dengan teliti.";
  }
}
