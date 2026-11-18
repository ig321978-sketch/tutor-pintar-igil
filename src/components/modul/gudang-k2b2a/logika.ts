/**
 * Logika murni Kelas 2 Bab 2 Sub-Bab A "Kiriman dari Gudang" (penjumlahan sampai dua puluh), awal cerita Toko Seragam dan Alat Tulis Sekolah,
 * untuk tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-gudang-k2b2a.mjs.
 * Empat metode: Metode IGIL (Maju dari yang Besar), Make a Ten (Membuat Sepuluh), Doubles Plus One (Kembar Tambah Satu), dan Round and Adjust (Bulatkan Lalu Sesuaikan).
 * Bilangan, operan, dan hasil paling besar dua puluh.
 */
import type { Cara } from "../lemari-k1b1a/logika";

export { acak, cocok, cocokKelompok, kelompokLabel, labelDari, IKON_CARA, NAMA_CARA, URUT_CARA, type Cara, type Label, type Tempat } from "../lemari-k1b1a/logika";

export const BATAS = 20;

/* ------------------------------ Kata bilangan sampai dua puluh ------------------------------ */
const SATUAN = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
export function kata(n: number): string {
  if (n >= 0 && n <= 9) return SATUAN[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n >= 12 && n <= 19) return `${SATUAN[n - 10]} belas`;
  if (n === 20) return "dua puluh";
  return String(n);
}
export const besar = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);

export type Metode = "igil" | "sepuluh" | "kembar" | "bulat";
export const URUT_METODE: Metode[] = ["igil", "sepuluh", "kembar", "bulat"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Maju dari yang Besar",
  sepuluh: "Make a Ten: Membuat Sepuluh",
  kembar: "Doubles Plus One: Kembar Tambah Satu",
  bulat: "Round and Adjust: Bulatkan Lalu Sesuaikan",
};
/** Nama pendek bahasa Indonesia tiap cara (tombol pilihan cara termudah). */
export const NAMA_CARA_ID: Record<Metode, string> = {
  igil: "Maju dari yang Besar",
  sepuluh: "Membuat Sepuluh",
  kembar: "Kembar Tambah Satu",
  bulat: "Bulatkan Lalu Sesuaikan",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F449}", sepuluh: "\u{1F51F}", kembar: "\u{1F46F}", bulat: "\u{1F504}" };

export type Rupa = "benda" | "diagram" | "lambang";

/* ------------------------------ Langkah tugas ------------------------------ */
/** Metode IGIL: bilangan besar sudah diketahui, `kecil` benda disambung satu per satu. Jawab: besar tambah kecil. */
export type LangkahMaju = { tipe: "maju"; set: string; besar: number; kecil: number };
/** Make a Ten: kotak sepuluh petak berisi `a` benda (a = 7, 8, atau 9); `b` benda di tumpukan kedua melengkapi kotak jadi sepuluh, sisanya ditambahkan. Jawab: a tambah b. */
export type LangkahSepuluh = { tipe: "sepuluh"; set: string; a: number; b: number };
/** Doubles Plus One: dua baris benda, baris atas `x` dan baris bawah `x` tambah satu. Jawab: dua kali x tambah satu. */
export type LangkahKembar = { tipe: "kembar"; set: string; x: number };
/** Round and Adjust: `a` (8 atau 9) dibulatkan ke sepuluh dengan petak tambahan, lalu `b` ditambahkan dan petak tambahan dikurangi lagi. Jawab: a tambah b. */
export type LangkahBulat = { tipe: "bulat"; set: string; a: number; b: number };
export type LangkahDasar = LangkahMaju | LangkahSepuluh | LangkahKembar | LangkahBulat;
/**
 * Cari kesalahan: seorang tokoh sudah menjawab tugas `dasar`. Anak memutuskan benar atau salah, memilih alasan yang benar dari tiga,
 * lalu (bila jawaban tokoh salah) menjawab bilangan yang benar. `betul`: jawaban tokoh benar, jadi tugas selesai setelah memilih alasan (tanpa angka).
 */
export type LangkahSalah = { tipe: "salah"; dasar: LangkahDasar; tokoh: string; jawabTokoh?: number; kataTokoh: string; alasan: [string, string, string]; benar: number; keliru: string; betul?: boolean };
/** Memilih cara termudah: dua bilangan `a` dan `b` ditampilkan, anak memilih satu dari tiga cara. Selesai tanpa angka. `benar` adalah cara paling mudah. */
export type LangkahBanding = { tipe: "banding"; set: string; a: number; b: number; pilihan: [Metode, Metode, Metode]; benar: Metode; alasan: string; petunjuk: Partial<Record<Metode, string>> };
export type Langkah = LangkahDasar | LangkahSalah | LangkahBanding;

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar | null => (l.tipe === "salah" ? l.dasar : l.tipe === "banding" ? null : l);
export function metodeLangkah(l: Langkah): Metode {
  if (l.tipe === "banding") return l.benar;
  const d = l.tipe === "salah" ? l.dasar : l;
  return d.tipe === "maju" ? "igil" : d.tipe === "sepuluh" ? "sepuluh" : d.tipe === "kembar" ? "kembar" : "bulat";
}

/* ------------------------------ Hitungan ------------------------------ */
export const puluhan = (n: number): number => Math.floor(n / 10);
export const satuan = (n: number): number => n % 10;
/** Banyak yang diambil untuk melengkapi `a` sampai sepuluh. */
export const kurangSepuluh = (a: number): number => 10 - a;

/** Jumlah yang benar (dihitung dari datanya). */
export function jumlahLangkah(l: Langkah): number {
  switch (l.tipe) {
    case "salah":
      return jumlahLangkah(l.dasar);
    case "maju":
      return l.besar + l.kecil;
    case "sepuluh":
    case "bulat":
      return l.a + l.b;
    case "kembar":
      return 2 * l.x + 1;
    case "banding":
      return l.a + l.b;
  }
}
export const kunciLangkah = jumlahLangkah;
/** Angka yang harus dijawab, atau null bila tugas selesai tanpa angka (memilih cara termudah, atau jawaban tokoh yang sudah benar). */
export const angkaJawab = (l: Langkah): number | null => (l.tipe === "banding" || (l.tipe === "salah" && l.betul) ? null : jumlahLangkah(l));

/** Tiga pilihan di sekitar jumlah (satu sampai dua puluh), memuat jawaban tokoh bila ada. */
export function pilihanDari(l: Langkah): number[] {
  const k = jumlahLangkah(l);
  const ada: number[] = [k];
  if (l.tipe === "salah" && l.jawabTokoh !== undefined && !ada.includes(l.jawabTokoh)) ada.push(l.jawabTokoh);
  for (const c of [k + 1, k - 1, k + 2, k - 2, k + 10, k - 10, k + 3, k - 3]) if (ada.length < 3 && c >= 1 && c <= BATAS && !ada.includes(c)) ada.push(c);
  return ada.sort((p, q) => p - q);
}

/* ------------------------------ Kalimat untuk jawaban dan petunjuk (tanpa digit) ------------------------------ */
/** Kalimat yang menjelaskan jawaban benar. */
export function kalimatKunci(l: LangkahDasar): string {
  const n = jumlahLangkah(l);
  switch (l.tipe) {
    case "maju":
      return `Dari ${kata(l.besar)} dilanjutkan ${kata(l.kecil)} hitungan, jadi semuanya ${kata(n)}.`;
    case "sepuluh": {
      const ambil = kurangSepuluh(l.a);
      return `${besar(kata(l.a))} butuh ${kata(ambil)} lagi supaya sepuluh. Ambil ${kata(ambil)} dari ${kata(l.b)}, tinggal ${kata(l.b - ambil)}. Sepuluh ditambah ${kata(l.b - ambil)} sama dengan ${kata(n)}.`;
    }
    case "kembar":
      return `Kembarnya ${kata(l.x)} ditambah ${kata(l.x)} sama dengan ${kata(2 * l.x)}. Lalu ditambah satu menjadi ${kata(n)}.`;
    case "bulat": {
      const tambah = kurangSepuluh(l.a);
      return `${besar(kata(l.a))} dibulatkan menjadi sepuluh. Sepuluh ditambah ${kata(l.b)} sama dengan ${kata(10 + l.b)}. Tadi ditambah ${kata(tambah)}, jadi dikurangi ${kata(tambah)}, hasilnya ${kata(n)}.`;
    }
  }
}

/* ------------------------------ Instruksi (templat, tanpa digit) ------------------------------ */
const AKHIR: Record<Cara, string> = { klik: "Lalu pilih jawabannya.", kanvas: "Lalu tulis angkanya di kanvas.", suara: "Lalu ucapkan jawabannya." };

/** Pictorial menyebut titik (tanpa nama benda). */
export function sesuaikan(t: string, rupa: Rupa): string {
  if (rupa !== "diagram") return t;
  return t.replace(/\bbenda\b/g, "titik").replace(/\bBenda\b/g, "Titik");
}

export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  return sesuaikan(instruksiMentah(l, rupa, cara), rupa);
}

function instruksiMentah(l: Langkah, rupa: Rupa, cara: Cara): string {
  const akhir = AKHIR[cara];
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat${l.betul ? "." : ", lalu pilih jawaban yang benar."}`;
  if (l.tipe === "banding") return rupa === "lambang" ? "Bacalah dua bilangan yang akan dijumlahkan. Cara mana yang paling mudah? Ketuk namanya." : rupa === "diagram" ? "Lihat dua bilangan yang akan dijumlahkan. Cara mana yang paling mudah? Ketuk namanya." : "Lihat dua bagian benda yang akan dijumlahkan. Cara mana yang paling mudah? Ketuk namanya.";
  switch (l.tipe) {
    case "maju":
      if (rupa === "lambang") return `Bacalah bilangan yang sudah diketahui, lalu hitung maju sebanyak bilangan kedua. Berapa jumlahnya? ${akhir}`;
      if (cara === "klik") return `Bilangan yang besar sudah diketahui. Ketuk tiap benda kecil, lalu lanjutkan hitungan dari bilangan besar itu. Berapa jumlahnya? ${akhir}`;
      if (cara === "kanvas") return `Bilangan yang besar sudah diketahui. Beri tanda pada tiap benda kecil, lalu lanjutkan hitungan dari bilangan besar itu. Berapa jumlahnya? ${akhir}`;
      return `Bilangan yang besar sudah diketahui. Lanjutkan hitungan dari bilangan besar itu untuk benda kecilnya. Berapa jumlahnya? ${akhir}`;
    case "sepuluh":
      if (rupa === "lambang") return `Bacalah bilangan pertama dan bilangan kedua. Lengkapi bilangan pertama sampai sepuluh dengan mengambil dari bilangan kedua. Berapa jumlahnya? ${akhir}`;
      if (cara === "klik") return `Ketuk tiap benda di tumpukan kedua untuk melengkapi kotak sampai sepuluh. Sisanya tinggal ditambahkan. Berapa jumlahnya? ${akhir}`;
      if (cara === "kanvas") return `Lihat kotak yang belum penuh. Beri tanda pada tiap petak yang masih kosong. Berapa jumlah semua benda? ${akhir}`;
      return `Lihat kotak yang belum penuh dan tumpukan kedua. Lengkapi kotak sampai sepuluh, lalu tambahkan sisanya. Berapa jumlahnya? ${akhir}`;
    case "kembar":
      if (rupa === "lambang") return `Bacalah dua bilangan yang hanya berbeda satu. Ambil kembarnya, lalu tambah satu. Berapa jumlahnya? ${akhir}`;
      if (cara === "klik") return `Ketuk tiap benda di baris bawah untuk memasangkannya dengan baris atas. Benda yang berpasangan menjadi kembar. Berapa jumlahnya? ${akhir}`;
      if (cara === "kanvas") return `Lihat dua baris benda. Beri tanda pada benda yang tidak punya pasangan kembar. Berapa jumlahnya? ${akhir}`;
      return `Lihat dua baris benda yang hanya berbeda satu. Ambil kembarnya, lalu tambah satu. Berapa jumlahnya? ${akhir}`;
    case "bulat":
      if (rupa === "lambang") return `Bacalah bilangan yang hampir sepuluh. Bulatkan menjadi sepuluh, jumlahkan, lalu sesuaikan. Berapa jumlahnya? ${akhir}`;
      if (cara === "klik") return `Bulatkan dulu: ketuk tiap petak putus-putus sampai kotak penuh. Lalu ketuk tiap benda di tumpukan kedua, dan ketuk lagi petak tambahan untuk menyesuaikan. Berapa jumlahnya? ${akhir}`;
      if (cara === "kanvas") return `Lihat petak tambahan yang membulatkan kotak menjadi sepuluh. Beri tanda pada tiap petak tambahan yang harus dikurangi lagi. Berapa jumlahnya? ${akhir}`;
      return `Lihat kotak yang dibulatkan menjadi sepuluh. Jumlahkan, lalu sesuaikan dengan mengurangi petak tambahan. Berapa jumlahnya? ${akhir}`;
  }
}

export const kalimatTanya = (): string => "Berapa jumlahnya?";

/* ------------------------------ Petunjuk saat jawaban bilangan salah (menunjuk kesalahannya, tanpa digit) ------------------------------ */
export function petunjukSalah(l: Langkah, m: number, rupa?: Rupa): string {
  if (l.tipe === "salah") {
    if (l.jawabTokoh !== undefined && m === l.jawabTokoh) return `Itu jawaban ${l.tokoh} yang keliru. ${l.keliru}`;
    return petunjukSalah(l.dasar, m, rupa);
  }
  if (l.tipe === "banding") return "Pilih salah satu cara dengan mengetuk namanya.";
  const k = jumlahLangkah(l);
  const lebih = m > k;
  const lambang = rupa === "lambang";
  switch (l.tipe) {
    case "maju":
      return m === l.besar
        ? lambang ? "Itu bilangan awal saja. Lanjutkan hitungan sebanyak bilangan kedua." : "Itu bilangan awal saja. Lanjutkan hitungan satu untuk tiap benda kecil."
        : lebih
          ? lambang ? "Bilangan awal tidak dihitung lagi. Lanjutkan sesudah bilangan itu, sebanyak bilangan kedua." : "Bilangan awal tidak dihitung lagi. Lanjutkan sesudah bilangan itu, satu untuk tiap benda kecil."
          : lambang ? "Satu hitungan masih terlewat. Lanjutkan hitungan sebanyak bilangan kedua." : "Masih ada benda kecil yang belum disambung. Lanjutkan satu untuk tiap benda kecil.";
    case "sepuluh":
      return lambang
        ? lebih ? "Ada hitungan yang terpakai dua kali. Bilangan yang diambil untuk melengkapi sepuluh tidak dihitung lagi." : "Masih ada hitungan yang terlewat. Lengkapi sepuluh dulu, lalu tambahkan sisanya."
        : lebih ? "Ada benda yang terhitung dua kali. Benda yang diambil untuk melengkapi sepuluh tidak dihitung lagi." : "Masih ada benda yang belum terhitung. Lengkapi sepuluh dulu, lalu tambahkan sisanya.";
    case "kembar":
      return m === 2 * l.x ? "Itu kembarnya saja. Jangan lupa tambah satu." : lebih ? "Terlalu banyak. Ambil kembar dari bilangan yang kecil, lalu tambah satu saja." : "Masih kurang. Kembarnya dijumlahkan dulu, lalu tambah satu.";
    case "bulat":
      return m === 10 + l.b ? "Itu hasil setelah dibulatkan. Jangan lupa menyesuaikan: kurangi sebanyak yang tadi ditambahkan." : lebih ? "Masih ada yang belum disesuaikan. Kurangi sebanyak yang tadi ditambahkan." : "Dikurangi terlalu banyak. Kurangi sebanyak yang tadi ditambahkan saja.";
  }
}

/** Petunjuk saat salah memilih cara termudah. */
export function petunjukBanding(l: LangkahBanding, pilih: Metode): string {
  return l.petunjuk[pilih] ?? "Cara itu bisa dipakai, tetapi ada cara yang lebih cocok untuk bilangan ini. Coba cara yang lain.";
}

/* ------------------------------ Simulasi Kardus Kiriman ------------------------------ */
export type ModeKardus = "gabung" | "jalur" | "pasangan" | "tabel" | "tukar";
export type TugasKardus = { a: number; b: number };
export const jumlahTugas = (t: TugasKardus): number => t.a + t.b;
export const besarTugas = (t: TugasKardus): number => Math.max(t.a, t.b);
export const kecilTugas = (t: TugasKardus): number => Math.min(t.a, t.b);
/** Satuan kedua bilangan berjumlah sepuluh atau lebih: sepuluh satuan harus ditukar menjadi satu puluhan. */
export const perluTukar = (t: TugasKardus): boolean => satuan(t.a) + satuan(t.b) >= 10;

export type KeadaanGudang = {
  alat: "gudang";
  mode: ModeKardus;
  /** Nomor tugas yang sedang di meja. */
  tugas: number;
  /** Nomor tugas yang kardusnya sudah digabung. */
  digabung: number[];
  /** Langkah maju di jalur bilangan untuk tugas sekarang (0 sampai bilangan kecil). */
  posisi: number;
  /** Tugas yang dihitung maju sampai berhenti di jumlahnya. */
  jalurTuntas: number[];
  /** Tahap bagan pasangan untuk tugas sekarang: 0 belum, 1 dipecah, 2 bagian dijumlahkan, 3 dijumlahkan dengan sepuluhnya. */
  pecah: number;
  pasanganTuntas: number[];
  /** Tahap tabel bersusun untuk tugas sekarang: 0 kosong, 1 tersusun, 2 satuan dijumlahkan, 3 puluhan dijumlahkan. */
  tabelTahap: number;
  tabelTuntas: number[];
  /** Tugas yang sepuluh satuannya sudah ditukar menjadi satu puluhan. */
  tukarTuntas: number[];
};

export const awalGudang = (): KeadaanGudang => ({ alat: "gudang", mode: "gabung", tugas: 0, digabung: [], posisi: 0, jalurTuntas: [], pecah: 0, pasanganTuntas: [], tabelTahap: 0, tabelTuntas: [], tukarTuntas: [] });

const tambahSekali = (daftar: number[], i: number): number[] => (daftar.includes(i) ? daftar : [...daftar, i]);

export const pilihModeKardus = (k: KeadaanGudang, mode: ModeKardus): KeadaanGudang => ({ ...k, mode });
/** Ganti tugas di meja; langkah yang sedang berjalan dimulai lagi, yang sudah tuntas tetap tercatat. */
export const pilihTugas = (k: KeadaanGudang, i: number): KeadaanGudang => (i === k.tugas ? k : { ...k, tugas: i, posisi: 0, pecah: 0, tabelTahap: 0 });
export const gabungKardus = (k: KeadaanGudang): KeadaanGudang => ({ ...k, digabung: tambahSekali(k.digabung, k.tugas) });
/** Maju satu langkah di jalur bilangan, mulai dari bilangan yang besar. Berhenti setelah semua benda kecil dihitung. */
export function majuSatu(k: KeadaanGudang, t: TugasKardus): KeadaanGudang {
  if (k.posisi >= kecilTugas(t)) return k;
  const posisi = k.posisi + 1;
  return { ...k, posisi, jalurTuntas: posisi === kecilTugas(t) ? tambahSekali(k.jalurTuntas, k.tugas) : k.jalurTuntas };
}
export const mulaiLagiJalur = (k: KeadaanGudang): KeadaanGudang => ({ ...k, posisi: 0 });
/** Bagan pasangan: pecah bilangan yang besar, jumlahkan bagian yang kecil, lalu jumlahkan dengan sepuluhnya. */
export function pecahLanjut(k: KeadaanGudang): KeadaanGudang {
  if (k.pecah >= 3) return k;
  const pecah = k.pecah + 1;
  return { ...k, pecah, pasanganTuntas: pecah === 3 ? tambahSekali(k.pasanganTuntas, k.tugas) : k.pasanganTuntas };
}
export const mulaiLagiPasangan = (k: KeadaanGudang): KeadaanGudang => ({ ...k, pecah: 0 });
/** Tabel puluhan dan satuan: susun, jumlahkan satuan, lalu jumlahkan puluhan. */
export function tabelLanjut(k: KeadaanGudang): KeadaanGudang {
  if (k.tabelTahap >= 3) return k;
  const tabelTahap = k.tabelTahap + 1;
  return { ...k, tabelTahap, tabelTuntas: tabelTahap === 3 ? tambahSekali(k.tabelTuntas, k.tugas) : k.tabelTuntas };
}
export const mulaiLagiTabel = (k: KeadaanGudang): KeadaanGudang => ({ ...k, tabelTahap: 0 });
/** Tukar sepuluh satuan menjadi satu puluhan. Hanya bila tugas sekarang memang punya sepuluh satuan; bila tidak, tidak berubah. */
export const tukarSepuluh = (k: KeadaanGudang, t: TugasKardus): KeadaanGudang => (perluTukar(t) ? { ...k, tukarTuntas: tambahSekali(k.tukarTuntas, k.tugas) } : k);
/** Banyak tugas yang sudah dihitung dengan paling sedikit dua cara berbeda (maju, pasangan, atau tabel), hasilnya sama. */
export const tugasDuaCara = (k: KeadaanGudang): number[] => [0, 1, 2, 3, 4, 5].filter((i) => [k.jalurTuntas, k.pasanganTuntas, k.tabelTuntas].filter((d) => d.includes(i)).length >= 2);

/** Kalimat keadaan untuk suara (tanpa digit). */
export function kalimatKardus(k: KeadaanGudang, t: TugasKardus): string {
  const jumlah = jumlahTugas(t);
  const bs = besarTugas(t);
  const kc = kecilTugas(t);
  switch (k.mode) {
    case "gabung":
      return k.digabung.includes(k.tugas) ? `Dua kardus sudah digabung. ${besar(kata(t.a))} ditambah ${kata(t.b)} sama dengan ${kata(jumlah)}.` : `Ada dua kardus, isinya ${kata(t.a)} dan ${kata(t.b)}. Ketuk gabungkan.`;
    case "jalur":
      return k.posisi === 0 ? `Mulai dari bilangan yang besar, yaitu ${kata(bs)}. Ketuk maju.` : k.posisi >= kc ? `Berhenti di ${kata(jumlah)}. ${besar(kata(bs))} ditambah ${kata(kc)} sama dengan ${kata(jumlah)}.` : `Sekarang di ${kata(bs + k.posisi)}.`;
    case "pasangan": {
      const sisa = satuan(bs);
      return k.pecah === 0
        ? `Pecah ${kata(bs)} menjadi sepuluh dan ${kata(sisa)}. Ketuk pecah.`
        : k.pecah === 1
          ? `${besar(kata(bs))} dipecah menjadi sepuluh dan ${kata(sisa)}. Sekarang jumlahkan bagian yang kecil.`
          : k.pecah === 2
            ? `${besar(kata(sisa))} ditambah ${kata(kc)} sama dengan ${kata(sisa + kc)}. Sekarang jumlahkan dengan sepuluhnya.`
            : `Sepuluh ditambah ${kata(sisa + kc)} sama dengan ${kata(jumlah)}.`;
    }
    case "tabel":
      return k.tabelTahap === 0
        ? "Tabel masih kosong. Ketuk susun, satuan lurus dengan satuan."
        : k.tabelTahap === 1
          ? "Kedua bilangan sudah tersusun. Jumlahkan satuannya dulu."
          : k.tabelTahap === 2
            ? `Satuannya ${perluTukar(t) ? `sepuluh. Tukar sepuluh satuan menjadi satu puluhan.` : `${kata(satuan(t.a) + satuan(t.b))}. Sekarang jumlahkan puluhannya.`}`
            : `Hasilnya ${kata(jumlah)}.`;
    case "tukar":
      return perluTukar(t)
        ? k.tukarTuntas.includes(k.tugas)
          ? "Sepuluh satuan sudah ditukar menjadi satu puluhan. Satuannya jadi nol, puluhannya bertambah satu."
          : "Satuannya berjumlah sepuluh. Ketuk tukar untuk mengganti sepuluh satuan dengan satu puluhan."
        : "Tugas ini satuannya belum sampai sepuluh. Pilih tugas yang satuannya penuh.";
  }
}
