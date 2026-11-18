/**
 * Logika murni Kelas 2 Bab 3 Sub-Bab C "Gudang Mainan Pak Rudi" (bangun ruang), akhir cerita Taman Bermain Sekolah, untuk tahap
 * Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-gudang-k2b3c.mjs.
 * Jawaban bab ini tidak hanya angka: memilah (datar atau lengkung, bangun ruang atau bangun datar), memilih nama bangun, benar atau salah,
 * mengurutkan langkah, melengkapi tabel, menghitung (satu angka), dan menyebut nama bangun dengan suara.
 */
import type { Cara } from "../lemari-k1b1a/logika";

export { acak, cocok, cocokKelompok, kelompokLabel, labelDari, IKON_CARA, NAMA_CARA, URUT_CARA, type Cara, type Label, type Tempat } from "../lemari-k1b1a/logika";

/* ------------------------------ Nama dan fakta bangun ------------------------------ */
export type Bangun = "kubus" | "balok" | "tabung" | "kerucut" | "bola";
export const URUT_BANGUN: Bangun[] = ["kubus", "balok", "tabung", "kerucut", "bola"];
export type Datar = "segitiga" | "lingkaran" | "persegi" | "persegi panjang";

const SATUAN = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"] as const;
/** Nama bilangan nol sampai sembilan (tanpa digit). */
export const kata = (n: number): string => (n >= 0 && n <= 9 ? SATUAN[n] : String(n));
export const besar = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);

export type Fakta = {
  /** Banyak permukaan datar dan permukaan lengkung. */
  datar: number;
  lengkung: number;
  /** Bangun datar pada tampak atas dan tampak samping. */
  atas: Datar;
  samping: Datar;
  /** Hasil cetak permukaan datarnya (bentuk yang berbeda-beda), dan satu kalimat penjelas hasil cetak. */
  cetak: Datar[];
  cetakCiri: string;
  /** Dua ciri yang disebut saat meraba (tanpa digit). */
  ciri: [string, string];
};
export const FAKTA: Record<Bangun, Fakta> = {
  kubus: {
    datar: 6,
    lengkung: 0,
    atas: "persegi",
    samping: "persegi",
    cetak: ["persegi"],
    cetakCiri: "semua cetakannya sama besar",
    ciri: ["Semua permukaannya datar.", "Permukaannya segi empat yang sama ukurannya."],
  },
  balok: {
    datar: 6,
    lengkung: 0,
    atas: "persegi panjang",
    samping: "persegi panjang",
    cetak: ["persegi panjang"],
    cetakCiri: "cetakannya segi empat yang panjang dan tidak sama sisinya",
    ciri: ["Semua permukaannya datar.", "Permukaannya segi empat yang ukurannya ada yang berbeda."],
  },
  tabung: {
    datar: 2,
    lengkung: 1,
    atas: "lingkaran",
    samping: "persegi panjang",
    cetak: ["lingkaran", "lingkaran"],
    cetakCiri: "ada dua cetakan lingkaran yang sama besar",
    ciri: ["Ada permukaan datar berbentuk lingkaran di atas dan di bawah.", "Di sisinya ada permukaan lengkung."],
  },
  kerucut: {
    datar: 1,
    lengkung: 1,
    atas: "lingkaran",
    samping: "segitiga",
    cetak: ["lingkaran"],
    cetakCiri: "hanya ada satu cetakan lingkaran dan ujungnya meruncing",
    ciri: ["Ada satu permukaan datar berbentuk lingkaran.", "Ada permukaan lengkung yang meruncing ke atas."],
  },
  bola: {
    datar: 0,
    lengkung: 1,
    atas: "lingkaran",
    samping: "lingkaran",
    cetak: [],
    cetakCiri: "tidak ada cetakan karena tidak punya permukaan datar",
    ciri: ["Tidak ada permukaan datar.", "Seluruh permukaannya lengkung."],
  },
};
export const menggelinding = (b: Bangun): boolean => FAKTA[b].lengkung > 0;
export const datarSaja = (b: Bangun): boolean => FAKTA[b].lengkung === 0;
export const mukaSemua = (b: Bangun): number => FAKTA[b].datar + FAKTA[b].lengkung;

/* ------------------------------ Benda berwarna (Concrete) dan kata (Abstract) ------------------------------ */
export type Benda = { id: string; nama: string; emoji: string; warna: string; bangun?: Bangun; datar?: Datar };
/** Benda untuk CPA dan Simulasi. Bangun ruang punya `bangun`; benda tipis (bangun datar) punya `datar`. Tanpa ZWJ, paling tinggi U+1FA95. */
export const BENDA: Benda[] = [
  { id: "esbatu", nama: "es batu", emoji: "\u{1F9CA}", warna: "#BAE6FD", bangun: "kubus" },
  { id: "dadu", nama: "dadu", emoji: "\u{1F3B2}", warna: "#FECACA", bangun: "kubus" },
  { id: "bata", nama: "bata", emoji: "\u{1F9F1}", warna: "#FDBA74", bangun: "balok" },
  { id: "hadiah", nama: "kotak hadiah", emoji: "\u{1F381}", warna: "#FBCFE8", bangun: "balok" },
  { id: "tisu", nama: "tisu gulung", emoji: "\u{1F9FB}", warna: "#E9D5FF", bangun: "tabung" },
  { id: "baterai", nama: "baterai", emoji: "\u{1F50B}", warna: "#BBF7D0", bangun: "tabung" },
  { id: "eskrim", nama: "es krim", emoji: "\u{1F366}", warna: "#FDE68A", bangun: "kerucut" },
  { id: "cemara", nama: "pohon cemara", emoji: "\u{1F384}", warna: "#86EFAC", bangun: "kerucut" },
  { id: "basket", nama: "bola basket", emoji: "\u{1F3C0}", warna: "#FDBA74", bangun: "bola" },
  { id: "tenis", nama: "bola tenis", emoji: "\u{1F3BE}", warna: "#D9F99D", bangun: "bola" },
  { id: "kertas", nama: "kertas", emoji: "\u{1F4C4}", warna: "#F1F5F9", datar: "persegi panjang" },
  { id: "bendera", nama: "bendera", emoji: "\u{1F6A9}", warna: "#FECACA", datar: "segitiga" },
  { id: "cakram", nama: "cakram", emoji: "\u{1F4BF}", warna: "#E0E7FF", datar: "lingkaran" },
  { id: "ubin", nama: "ubin", emoji: "\u{1F7E8}", warna: "#FEF08A", datar: "persegi" },
];
export const bendaDari = (id: string): Benda => BENDA.find((b) => b.id === id) ?? BENDA[0];
export const bisaDiisi = (id: string): boolean => bendaDari(id).bangun !== undefined;
export const gelindingBenda = (id: string): boolean => {
  const b = bendaDari(id).bangun;
  return b !== undefined && menggelinding(b);
};
export const datarSajaBenda = (id: string): boolean => {
  const b = bendaDari(id).bangun;
  return b !== undefined && datarSaja(b);
};

/* ------------------------------ Metode ------------------------------ */
export type Metode = "igil" | "tas" | "cetak" | "pandang";
export const URUT_METODE: Metode[] = ["igil", "tas", "cetak", "pandang"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Tanya Bisa Diisi, Tanya Menggelinding",
  tas: "Mystery Bag: Tas Misteri",
  cetak: "Face Printing: Cetak Permukaan",
  pandang: "Top and Side Views: Pandangan Atas dan Samping",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F4E6}", tas: "\u{1F45C}", cetak: "\u{1F5A8}\u{FE0F}", pandang: "\u{1F441}\u{FE0F}" };

export type Rupa = "benda" | "diagram" | "lambang";

/* ------------------------------ Langkah soal ------------------------------ */
/** Memilah benda ke dua kotak: "ruang" = bangun ruang atau bangun datar (bisa diisi atau tidak), "lengkung" = hanya permukaan datar atau ada permukaan lengkung. */
export type LangkahPilah = { tipe: "pilah"; pasang: "ruang" | "lengkung"; isi: string[]; metode: Metode };
/** Memilih nama bangun dari petunjuk (tas, cetak, pandang, atau pertanyaan bisa diisi dan menggelinding). Jawab: nama bangun. */
export type LangkahNama = { tipe: "nama"; petunjuk: "tas" | "cetak" | "pandang" | "tanya"; bangun: Bangun; metode: Metode };
/** Memilih benda yang menghasilkan bangun datar tertentu bila permukaannya dicetak. */
export type LangkahCetak = { tipe: "cetakPilih"; hasil: Datar; pilihan: Bangun[]; metode: Metode };
/** Mengurutkan tiga langkah. `langkah` ditulis menurut urutan yang benar. */
export type LangkahUrut = { tipe: "urut"; metode: Metode; langkah: [string, string, string] };
/** Pernyataan benar atau salah. `keliru`: penjelasan bila jawabannya salah. */
export type LangkahBS = { tipe: "bs"; metode: Metode; bangun: Bangun; pernyataan: string; benar: boolean; keliru: string };
/** Melengkapi tabel: banyak permukaan datar (atau lengkung) tiap bangun. */
export type LangkahTabel = { tipe: "tabel"; metode: Metode; jenis: "datar" | "lengkung"; baris: Bangun[] };
/** Menghitung (satu angka): banyak benda dalam daftar yang memenuhi kriteria, atau banyak permukaan sebuah bangun. */
export type LangkahHitungDaftar = { tipe: "hitung"; dari: "daftar"; metode: Metode; kriteria: "ruang" | "gelinding" | "datarSaja"; isi: string[] };
export type LangkahHitungMuka = { tipe: "hitung"; dari: "muka"; metode: Metode; bangun: Bangun; jenis: "datar" | "lengkung" | "semua" };
export type LangkahHitung = LangkahHitungDaftar | LangkahHitungMuka;
export type LangkahDasar = LangkahPilah | LangkahNama | LangkahCetak | LangkahUrut | LangkahBS | LangkahTabel | LangkahHitung;
/**
 * Cari kesalahan: seorang tokoh sudah menjawab. Anak memutuskan benar atau salah, lalu memilih alasan yang tepat dari tiga.
 * `betul`: tokoh sebenarnya benar. `tampil`: benda yang digambar. `kata`: apa yang dikatakan tokoh.
 */
export type LangkahSalah = {
  tipe: "salah";
  metode: Metode;
  tampil: string[];
  tokoh: string;
  kataTokoh: string;
  alasan: [string, string, string];
  benar: number;
  keliru: string;
  betul?: boolean;
};
export type Langkah = LangkahDasar | LangkahSalah;

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const metodeLangkah = (l: Langkah): Metode => l.metode;

/* ------------------------------ Kunci, dihitung dari data ------------------------------ */
const cocokKriteria = (k: LangkahHitungDaftar["kriteria"], id: string): boolean => (k === "ruang" ? bisaDiisi(id) : k === "gelinding" ? gelindingBenda(id) : datarSajaBenda(id));
/** Kotak benar tiap benda pada soal memilah: 0 = kotak pertama (bangun ruang atau datar saja), 1 = kotak kedua (bangun datar atau ada lengkung). */
export function kotakBenar(pasang: LangkahPilah["pasang"], id: string): 0 | 1 {
  if (pasang === "ruang") return bisaDiisi(id) ? 0 : 1;
  return datarSajaBenda(id) ? 0 : 1;
}
export const NAMA_KOTAK: Record<LangkahPilah["pasang"], [string, string]> = { ruang: ["bangun ruang", "bangun datar"], lengkung: ["datar saja", "ada lengkung"] };

/** Cetak: bangun mana yang menghasilkan `hasil` bila satu permukaannya dicetak. Pilihan soal dibuat agar hanya satu yang cocok. */
export const bisaCetak = (b: Bangun, hasil: Datar): boolean => FAKTA[b].cetak.includes(hasil);

export function jumlahHitung(l: LangkahHitung): number {
  if (l.dari === "daftar") return l.isi.filter((id) => cocokKriteria(l.kriteria, id)).length;
  const f = FAKTA[l.bangun];
  return l.jenis === "datar" ? f.datar : l.jenis === "lengkung" ? f.lengkung : f.datar + f.lengkung;
}
/** Jawaban angka (hanya soal hitung), atau null. */
export const angkaJawab = (l: Langkah): number | null => (l.tipe === "hitung" ? jumlahHitung(l) : null);
/** Jawaban berupa nama bangun (soal nama, dan soal cetak yang memilih benda), atau null. */
export function namaJawab(l: Langkah): Bangun | null {
  if (l.tipe === "nama") return l.bangun;
  if (l.tipe === "cetakPilih") return l.pilihan.find((b) => bisaCetak(b, l.hasil)) ?? null;
  return null;
}
/** Soal yang dijawab dengan menyebut atau memilih nama bangun. */
export const jawabNama = (l: Langkah): boolean => namaJawab(l) !== null;

/** Banyak permukaan pada sel tabel baris ke-i. */
export const isiSel = (l: LangkahTabel, i: number): number => (l.jenis === "datar" ? FAKTA[l.baris[i]].datar : FAKTA[l.baris[i]].lengkung);

/** Urutan tombol langkah yang diputar tetap (bukan acak), tidak pernah sama dengan urutan benar. */
export const urutTampilUrut = (n: number): number[] => (n === 3 ? [2, 0, 1] : [...Array(n).keys()]);
/** Pilihan angka untuk cadangan ketuk pada soal hitung: kunci dan dua pengecoh di sekitarnya (0 sampai 9). */
export function pilihanAngka(l: Langkah): number[] {
  const k = angkaJawab(l) ?? 0;
  const ada = [k];
  for (const c of [k + 1, k - 1, k + 2, k - 2]) if (ada.length < 3 && c >= 0 && c <= 9 && !ada.includes(c)) ada.push(c);
  return ada.sort((p, q) => p - q);
}

/* ------------------------------ Pengenal ucapan nama bangun ------------------------------ */
const RAGAM_BANGUN: Record<Bangun, string[]> = {
  kubus: ["kubus", "kubuss", "kubes", "kubas", "cubus", "kubos", "kubuz"],
  balok: ["balok", "baloq", "balog", "ballok", "barok", "baluk", "balock"],
  tabung: ["tabung", "tabun", "tabong", "tabungg", "tabuang", "tabunk"],
  kerucut: ["kerucut", "krucut", "kerucuk", "kerukut", "kerucud", "gerucut", "kerukat", "krukut"],
  bola: ["bola", "bolla", "bolo", "bolah"],
};
const jarak = (a: string, b: string): number => {
  const d: number[][] = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 0; j <= b.length; j += 1) d[0][j] = j;
  for (let i = 1; i <= a.length; i += 1) for (let j = 1; j <= b.length; j += 1) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
};
/** Nama bangun yang terdengar dalam teks (urut kemunculan, tanpa kembar). Mengenali ragam ucapan dan salah dengar satu huruf untuk kata yang panjang (tabung, kerucut); "bangun kubus" dan "itu kerucut" juga diterima. */
export function bangunDariUcapan(teks: string): Bangun[] {
  const t = teks
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
  const hasil: Bangun[] = [];
  for (const w of t.split(" ").filter(Boolean)) {
    for (const b of URUT_BANGUN) {
      const cocokPersis = RAGAM_BANGUN[b].includes(w);
      const mirip = w.length >= 6 && b.length >= 6 && w[0] === b[0] && jarak(w, b) <= 1;
      if ((cocokPersis || mirip) && !hasil.includes(b)) hasil.push(b);
    }
  }
  return hasil;
}

/* ------------------------------ Kalimat untuk Abstract dan jawaban ------------------------------ */
export const kalimatBangun = (b: Bangun): string => {
  const f = FAKTA[b];
  const datar = f.datar === 0 ? "tidak punya permukaan datar" : `punya ${kata(f.datar)} permukaan datar`;
  const lengkung = f.lengkung === 0 ? "tidak punya permukaan lengkung" : `punya ${kata(f.lengkung)} permukaan lengkung`;
  return `${besar(b)} ${datar} dan ${lengkung}.`;
};
const sebutDatar = (b: Bangun): string => `${FAKTA[b].atas} dari atas dan ${FAKTA[b].samping} dari samping`;

/** Kalimat yang menjelaskan jawaban benar (tanpa digit). */
export function kalimatKunci(l: Langkah): string {
  switch (l.tipe) {
    case "pilah":
      return l.pasang === "ruang" ? "Benda yang bisa diisi adalah bangun ruang. Benda tipis tidak bisa diisi, jadi bangun datar." : "Benda dengan permukaan datar saja diam di rak datar. Benda yang punya permukaan lengkung bisa menggelinding.";
    case "nama": {
      const b = l.bangun;
      return l.petunjuk === "pandang" ? `${besar(b)}: ${sebutDatar(b)}.` : `Bangun ruang itu adalah ${b}. ${kalimatBangun(b)}`;
    }
    case "cetakPilih":
      return `${besar(namaJawab(l) as Bangun)} punya permukaan datar yang bila dicetak menjadi ${l.hasil}.`;
    case "urut":
      return `Urutannya: ${l.langkah.join(", lalu ")}.`;
    case "bs":
      return l.benar ? l.pernyataan : l.keliru;
    case "tabel":
      return l.baris.map((b) => `${besar(b)} punya ${kata(l.jenis === "datar" ? FAKTA[b].datar : FAKTA[b].lengkung)} permukaan ${l.jenis}`).join(". ") + ".";
    case "hitung":
      return l.dari === "muka" ? `${kalimatBangun(l.bangun)} Jadi jawabannya ${kata(jumlahHitung(l))}.` : `Ada ${kata(jumlahHitung(l))} benda yang cocok.`;
    case "salah":
      return l.alasan[l.benar];
  }
}

/* ------------------------------ Instruksi (templat, tanpa digit) ------------------------------ */
const AKHIR: Record<Cara, string> = { klik: "Lalu pilih jawabannya.", kanvas: "Lalu tulis angkanya di kanvas.", suara: "Lalu sebutkan jawabannya." };
const NAMA_KRITERIA: Record<LangkahHitungDaftar["kriteria"], string> = { ruang: "bisa diisi", gelinding: "bisa menggelinding", datarSaja: "hanya punya permukaan datar" };

/** Kalimat pertanyaan untuk soal hitung. */
export function kalimatTanya(l: LangkahHitung): string {
  if (l.dari === "daftar") return `Berapa benda yang ${NAMA_KRITERIA[l.kriteria]}?`;
  return l.jenis === "semua" ? `Berapa semua permukaan ${l.bangun}?` : `Berapa permukaan ${l.jenis} pada ${l.bangun}?`;
}

/** Instruksi lengkap satu langkah (suara dan judul soal), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah ${l.tokoh} benar? Putuskan dulu, lalu pilih alasan yang tepat.`;
  const lihat = rupa === "lambang" ? "Bacalah" : "Lihatlah";
  switch (l.tipe) {
    case "pilah":
      return l.pasang === "ruang"
        ? `${lihat} semua benda. Tanyakan: bisa diisi atau tidak? Pilah ke kotak bangun ruang atau bangun datar.`
        : `${lihat} semua benda. Tanyakan: ada permukaan lengkung atau tidak? Pilah ke kotak datar saja atau kotak ada lengkung.`;
    case "nama": {
      const awal = l.petunjuk === "tas" ? "Tas misteri berisi satu bangun ruang. Baca cirinya." : l.petunjuk === "cetak" ? "Benda ini dicetak pada kertas. Perhatikan hasil cetakannya." : l.petunjuk === "pandang" ? "Perhatikan benda dari atas dan dari samping." : "Jawab dua pertanyaan: bisa diisi, dan bisa menggelinding. Perhatikan juga permukaannya.";
      return `${awal} Nama bangun ruangnya apa? ${AKHIR[cara === "kanvas" ? "klik" : cara]}`;
    }
    case "cetakPilih":
      return `Satu permukaan dicetak dan hasilnya ${l.hasil}. ${lihat} ketiga benda: benda mana yang punya permukaan seperti itu? Ketuk bendanya.`;
    case "urut":
      return "Urutkan langkah dari yang pertama. Ketuk langkahnya satu per satu.";
    case "bs":
      return `${lihat} gambarnya. Apakah pernyataan itu benar atau salah?`;
    case "tabel":
      return `Lengkapi tabel: berapa permukaan ${l.jenis} pada tiap bangun ruang? Pilih angka di tiap baris.`;
    case "hitung":
      return `${l.dari === "daftar" ? `${lihat} semua benda. ${kalimatTanya(l)}` : `${lihat} bangunnya. ${kalimatTanya(l)}`} ${AKHIR[cara]}`;
  }
}

/* ------------------------------ Petunjuk saat jawaban salah (menunjuk kesalahannya, tanpa digit) ------------------------------ */
export function petunjukPilah(pasang: LangkahPilah["pasang"], id: string): string {
  const b = bendaDari(id);
  if (pasang === "ruang") return b.bangun ? `${besar(b.nama)} bisa diisi, jadi itu bangun ruang.` : `${besar(b.nama)} tipis dan tidak punya ruang di dalam, jadi itu bangun datar.`;
  return datarSajaBenda(id) ? `${besar(b.nama)} hanya punya permukaan datar, jadi tidak menggelinding.` : `${besar(b.nama)} punya permukaan lengkung, jadi bisa menggelinding.`;
}
export function petunjukNama(l: LangkahNama | LangkahCetak, pilih: Bangun): string {
  const benar = namaJawab(l) as Bangun;
  if (l.tipe === "cetakPilih") return pilih === benar ? "" : `${besar(pilih)} tidak punya permukaan datar berbentuk ${l.hasil}. Perhatikan permukaan datarnya.`;
  const f = FAKTA[benar];
  const p = FAKTA[pilih];
  if (l.petunjuk === "pandang") return `Tampak ${pilih} dari atas ${p.atas} dan dari samping ${p.samping}, bukan seperti gambar. Cocokkan kedua bayangannya.`;
  if (l.petunjuk === "cetak") return `Cetakan ${pilih} tidak seperti itu. Lihat bentuk dan banyak cetakannya.`;
  return f.datar === p.datar && f.lengkung === p.lengkung ? "Cirinya mirip, tetapi ada satu ciri yang berbeda. Baca cirinya sekali lagi." : p.lengkung > 0 !== f.lengkung > 0 ? (f.lengkung > 0 ? "Bangun itu tidak punya permukaan lengkung, padahal ciri yang disebut ada yang lengkung." : "Bangun itu punya permukaan lengkung, padahal semua permukaan yang disebut datar.") : "Banyak permukaan datarnya tidak cocok dengan ciri yang disebut.";
}
export function petunjukHitung(l: LangkahHitung, m: number): string {
  const k = jumlahHitung(l);
  if (l.dari === "daftar") return m > k ? "Itu terlalu banyak. Periksa benda satu per satu, hanya yang cocok yang dihitung." : "Itu terlalu sedikit. Periksa lagi semua benda, jangan ada yang terlewat.";
  return m > k ? "Itu terlalu banyak. Hitung permukaannya satu per satu." : "Itu terlalu sedikit. Hitung permukaannya satu per satu, jangan ada yang terlewat.";
}
export function petunjukSalah(l: Langkah, m: number | string): string {
  if (l.tipe === "hitung") return petunjukHitung(l, Number(m));
  if (l.tipe === "nama" || l.tipe === "cetakPilih") return petunjukNama(l, m as Bangun);
  if (l.tipe === "salah") return l.keliru;
  return "Periksa lagi dengan teliti.";
}

/* ------------------------------ Simulasi Gudang Mainan ------------------------------ */
/** Benda di gudang (berbeda dari Story): es batu, bata, baterai, es krim, bola tenis, kotak hadiah. */
export const BENDA_SIM: readonly string[] = ["esbatu", "bata", "baterai", "eskrim", "tenis", "hadiah"];
export type ModeGudang = "lereng" | "rak" | "cetak";
export type Rak = "datar" | "pagar";
export type KeadaanGudang = {
  alat: "gudang";
  mode: ModeGudang;
  /** Benda yang dipilih (nomor dalam BENDA_SIM) atau -1. */
  pilih: number;
  /** Benda yang sudah dilepas di lereng (tanpa kembar), dan banyak lepasan. */
  lepas: number[];
  lepasTotal: number;
  /** Banyak benda berbeda yang menggelinding dan yang diam di lereng. */
  guling: number;
  diam: number;
  /** Penempatan di rak: nomor benda ke rak yang benar (tanpa kembar), dan banyak salah rak. */
  rak: Record<number, Rak>;
  rakSalah: number;
  /** Benda yang permukaannya sudah dicetak, dan apakah pernah muncul cetakan lingkaran. */
  cetak: number[];
  cetakLingkaran: boolean;
};
export const awalGudang = (): KeadaanGudang => ({ alat: "gudang", mode: "lereng", pilih: -1, lepas: [], lepasTotal: 0, guling: 0, diam: 0, rak: {}, rakSalah: 0, cetak: [], cetakLingkaran: false });
export const pilihModeGudang = (k: KeadaanGudang, mode: ModeGudang): KeadaanGudang => ({ ...k, mode, pilih: -1 });
export const mulaiLagiGudang = (): KeadaanGudang => awalGudang();
export const bangunSim = (i: number): Bangun => bendaDari(BENDA_SIM[i]).bangun as Bangun;

export function pilihBenda(k: KeadaanGudang, i: number): KeadaanGudang {
  if (i < 0 || i >= BENDA_SIM.length) return k;
  return { ...k, pilih: k.pilih === i ? -1 : i };
}
/** Lepas benda yang dipilih di lereng: menggelinding bila punya permukaan lengkung, diam bila datar saja. */
export function lepasDiLereng(k: KeadaanGudang): { k: KeadaanGudang; gelinding: boolean | null } {
  if (k.pilih < 0) return { k, gelinding: null };
  const g = menggelinding(bangunSim(k.pilih));
  const baru = !k.lepas.includes(k.pilih);
  return { k: { ...k, lepas: baru ? [...k.lepas, k.pilih] : k.lepas, lepasTotal: k.lepasTotal + 1, guling: k.guling + (baru && g ? 1 : 0), diam: k.diam + (baru && !g ? 1 : 0) }, gelinding: g };
}
/** Rak yang benar untuk sebuah benda: rak datar (ditumpuk) bila datar saja, wadah berpagar bila menggelinding. */
export const rakBenar = (i: number): Rak => (menggelinding(bangunSim(i)) ? "pagar" : "datar");
/** Taruh benda yang dipilih di rak. Salah rak: benda tidak masuk dan salah dicatat. */
export function taruhDiRak(k: KeadaanGudang, rak: Rak): { k: KeadaanGudang; ok: boolean | null } {
  if (k.pilih < 0) return { k, ok: null };
  if (k.rak[k.pilih] !== undefined) return { k, ok: null };
  if (rakBenar(k.pilih) !== rak) return { k: { ...k, rakSalah: k.rakSalah + 1 }, ok: false };
  return { k: { ...k, rak: { ...k.rak, [k.pilih]: rak }, pilih: -1 }, ok: true };
}
export const banyakRak = (k: KeadaanGudang): number => Object.keys(k.rak).length;
export const hasilCetak = (i: number): Datar[] => FAKTA[bangunSim(i)].cetak;
/** Cetak satu permukaan benda yang dipilih. */
export function cetakPermukaan(k: KeadaanGudang): { k: KeadaanGudang; hasil: Datar | null } | null {
  if (k.pilih < 0) return null;
  const h = hasilCetak(k.pilih);
  const baru: KeadaanGudang = { ...k, cetak: k.cetak.includes(k.pilih) ? k.cetak : [...k.cetak, k.pilih], cetakLingkaran: k.cetakLingkaran || h.includes("lingkaran") };
  return { k: baru, hasil: h.length ? h[0] : null };
}

/** Kalimat keadaan untuk suara (tanpa digit). */
export function kalimatGudang(k: KeadaanGudang): string {
  const nama = k.pilih >= 0 ? bendaDari(BENDA_SIM[k.pilih]).nama : "";
  if (k.mode === "lereng") {
    if (k.pilih < 0) return "Ketuk satu benda, lalu lepaskan di papan lereng.";
    return `${besar(nama)} dipilih. Lepaskan di papan lereng dan lihat, menggelinding atau diam.`;
  }
  if (k.mode === "rak") {
    if (k.pilih < 0) return banyakRak(k) >= BENDA_SIM.length ? "Semua mainan sudah di rak yang tepat." : "Ketuk satu benda, lalu ketuk rak datar atau wadah berpagar.";
    return `${besar(nama)} dipilih. Taruh di rak datar atau di wadah berpagar.`;
  }
  if (k.pilih < 0) return "Ketuk satu benda, lalu cetak permukaannya di kertas.";
  return `${besar(nama)} dipilih. Cetak satu permukaannya dan lihat bangun datarnya.`;
}
