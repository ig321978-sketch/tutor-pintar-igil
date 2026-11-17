/**
 * Isi tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 6 Sub-Bab C "Tutup Pasar Malam",
 * akhir cerita Pasar Malam Kampung. Angka Story (kue cubit enam belas dimakan tiga, balon delapan belas lepas empat, mundur dari lima belas,
 * periksa dengan menambah, tujuh belas dikurangi lima) hanya dipakai di Mind-map dan Infografis. Simulasi dan CPA memakai dagangan dan
 * bilangan lain dan melanjutkan "Misi Pasar Malam". Diuji: scripts/uji-tutup-k1b6c.mjs.
 */
import type { Cara, DagangSim, Langkah, LangkahDasar, LangkahSoal, Metode, Rupa, SoalMisi, Tempat } from "./logika";
import { instruksi, kata, metodeLangkah } from "./logika";

const tp = (id: string, kelompok: string, kunci: string, urutan?: number): Tempat => (urutan === undefined ? { id, kelompok, kunci } : { id, kelompok, kunci, urutan });

/** Gambar benda dagangan (kunci = jenis). Hanya Concrete yang memakainya. */
export const EMOJI: Record<string, string> = {
  apel: "\u{1F34E}",
  permen: "\u{1F36C}",
  jagung: "\u{1F33D}",
  donat: "\u{1F369}",
  jeruk: "\u{1F34A}",
  pisang: "\u{1F34C}",
  roti: "\u{1F35E}",
  anggur: "\u{1F347}",
  eskrim: "\u{1F366}",
  lampion: "\u{1F3EE}",
  tiket: "\u{1F39F}",
  kelapa: "\u{1F965}",
};
/** Warna lingkaran di belakang benda (Concrete). */
export const WARNA_BENDA: Record<string, [string, string]> = {
  apel: ["#FECACA", "#B91C1C"],
  permen: ["#FBCFE8", "#BE185D"],
  jagung: ["#FEF08A", "#A16207"],
  donat: ["#FED7AA", "#C2410C"],
  jeruk: ["#FDE68A", "#B45309"],
  pisang: ["#FEF9C3", "#A16207"],
  roti: ["#FDE7C4", "#92400E"],
  anggur: ["#E9D5FF", "#7E22CE"],
  eskrim: ["#CFFAFE", "#0E7490"],
  lampion: ["#FECDD3", "#BE123C"],
  tiket: ["#DDD6FE", "#5B21B6"],
  kelapa: ["#D9F99D", "#4D7C0F"],
};
/** Nama benda untuk instruksi dan pembaca layar. */
export const NAMA_BENDA: Record<string, string> = {
  apel: "apel",
  permen: "permen",
  jagung: "jagung bakar",
  donat: "donat",
  jeruk: "jeruk",
  pisang: "pisang",
  roti: "roti",
  anggur: "anggur",
  eskrim: "es krim",
  lampion: "lampion",
  tiket: "karcis",
  kelapa: "kelapa muda",
};

/* ------------------------------ Mind-map: kincir ria dengan gondola (hanya poin pelajaran) ------------------------------ */
export const PUSAT_KINCIR = "Pengurangan sampai dua puluh";
export const KELOMPOK_KINCIR: Record<string, { nama: string; letak: string; ikon: string; isi: string; garis: string; petunjuk: string }> = {
  masalah: { nama: "Masalah", letak: "Loket naik kincir", ikon: "\u{1F3AB}", isi: "#FDE68A", garis: "#A16207", petunjuk: "Label ini kuning. Tempelkan di loket naik kincir." },
  metode: { nama: "Penyelesaian", letak: "Gondola bernomor", ikon: "\u{1F3A1}", isi: "#BFDBFE", garis: "#1D4ED8", petunjuk: "Label ini biru. Tempelkan di gondola yang nomornya pas." },
  hasil: { nama: "Hasil", letak: "Menara lampu", ikon: "\u{1F3EE}", isi: "#FBCFE8", garis: "#BE185D", petunjuk: "Label ini merah jambu. Tempelkan di menara lampu di dasar kincir." },
};
export const TEMPAT_KINCIR: Tempat[] = [
  tp("kp-1", "masalah", "Ada yang diambil"),
  tp("kp-2", "masalah", "Mencari sisanya"),
  tp("kp-3", "masalah", "Satuan kurang dari yang diambil"),
  tp("kg-1", "metode", "Hitung mundur di garis bilangan", 1),
  tp("kg-2", "metode", "Kurangi satuan, puluhan tetap", 2),
  tp("kg-3", "metode", "Periksa dengan menambah", 3),
  tp("kg-4", "metode", "Pikir Penjumlahan", 4),
  tp("kg-5", "metode", "Keluarga Kalimat", 5),
  tp("kg-6", "metode", "Kurangi Lewat Sepuluh", 6),
  tp("kg-7", "metode", "Pilih cara yang pas", 7),
  tp("kh-1", "hasil", "Sisa dihitung dengan benar"),
  tp("kh-2", "hasil", "Puluhan tetap, satuan berkurang"),
  tp("kh-3", "hasil", "Ditambah kembali jadi semula"),
  tp("kh-4", "hasil", "Tiap cara, hasilnya sama"),
];
export const PETUNJUK_URUT_KINCIR = "Warnanya sudah benar. Nomor gondolanya belum pas. Langkah mana yang lebih dulu?";
export const SUARA_KINCIR =
  "Ini kincir ria. Loket naik berisi masalah. Tujuh gondola bernomor berisi langkah yang berurutan, ikuti nomornya dari satu sampai tujuh. Menara lampu di dasar berisi hasil. Ketuk label, lalu ketuk tempat yang cocok.";

/* ------------------------------ Infografis: papan laporan berpenjepit ------------------------------ */
export const KOLOM_LAPORAN = ["Mula-mula", "Berubah", "Hasil"] as const;
export const BARIS_LAPORAN: { ikon: string; nama: string; semula: string; ubah: string; hasil: string }[] = [
  { ikon: "\u{1F9C1}", nama: "Kue cubit", semula: "16 kue", ubah: "dimakan 3", hasil: "sisa 13" },
  { ikon: "\u{1F388}", nama: "Balon di tiang", semula: "18 balon", ubah: "lepas 4", hasil: "sisa 14" },
  { ikon: "\u{1F4CF}", nama: "Garis bilangan", semula: "mulai 15", ubah: "mundur 3", hasil: "mendarat 12" },
  { ikon: "\u{2705}", nama: "Periksa kue", semula: "13 kue", ubah: "tambah 3", hasil: "kembali 16" },
  { ikon: "\u{1F914}", nama: "Pilih cara", semula: "17", ubah: "dikurangi 5", hasil: "hasil 12" },
];
export const TEMPAT_LAPORAN: Tempat[] = BARIS_LAPORAN.flatMap((b, i) => [tp(`p${i}-semula`, "semula", b.semula), tp(`p${i}-ubah`, "ubah", b.ubah), tp(`p${i}-hasil`, "hasil", b.hasil)]);
export const KELOMPOK_LAPORAN: Record<string, string> = {
  semula: "Label ini bilangan mula-mula. Tempelkan di kolom Mula-mula.",
  ubah: "Label ini yang berubah, diambil atau ditambah. Tempelkan di kolom Berubah.",
  hasil: "Label ini hasil akhirnya. Tempelkan di kolom Hasil.",
};
export const SUARA_LAPORAN =
  "Ini papan laporan Pak RT, dari cerita menutup pasar malam. Tiap baris satu hitungan. Tempelkan bilangan mula-mula, yang berubah, dan hasilnya.";

/* ------------------------------ Simulasi: Misi Pasar Malam, Meja Tutup Lapak ------------------------------ */
/** Dagangan di meja tutup lapak (berbeda dari Story). Sama dengan LAPAK_TUTUP_C di misi-bab6.ts. */
export const DAGANG_SIM: readonly DagangSim[] = [
  { id: "sosis", nama: "Sosis bakar", ikon: "\u{1F32D}", awal: 17, jual: 6 },
  { id: "jagung", nama: "Jagung rebus", ikon: "\u{1F33D}", awal: 15, jual: 9 },
  { id: "permen", nama: "Permen kapas", ikon: "\u{1F36C}", awal: 19, jual: 4 },
  { id: "donat", nama: "Donat gula", ikon: "\u{1F369}", awal: 12, jual: 8 },
];
export const MISI_TUTUP =
  "Misi Pasar Malam: laporkan sisa tiap lapak dengan cara mundur, kurangi satuan, atau lewat sepuluh, periksa dengan menambah, lalu tutup pasar malam.";

/* ------------------------------ CPA: lanjutan Misi Pasar Malam ------------------------------ */
const L = (tipe: Metode, a: number, b: number, jenis = "titik"): Langkah => ({ tipe, a, b, jenis });
const salah = (dasar: Langkah, tokoh: string, jawabTokoh: number, kataTokoh: string, alasan: [string, string, string], benar: number, keliru: string): Langkah => ({
  tipe: "salah",
  dasar: dasar as LangkahDasar,
  tokoh,
  jawabTokoh,
  kataTokoh,
  alasan,
  benar,
  keliru,
});

const kelompok =
  (rupa: Rupa) =>
  (nomor: number, cara: Cara, judul: string, cerita: string, isi: [Langkah, Langkah, Langkah, Langkah]): SoalMisi => ({
    nomor,
    judul,
    cerita,
    cara,
    langkah: isi.map((l): LangkahSoal => {
      const dasar = l.tipe === "salah" ? l.dasar : l;
      const s = instruksi(l, rupa, cara, NAMA_BENDA[dasar.jenis] ?? "benda");
      return { metode: metodeLangkah(l), cara, judul: s, suara: s, langkah: l };
    }),
  });

const C = kelompok("benda");
export const CONCRETE: SoalMisi[] = [
  C(1, "klik", "Misi Pasar Malam 2: tiang balon", "Malam hampir habis. Pak RT meminta laporan sisa dagangan. Bantu Igil menghitungnya.", [
    salah(
      L("igil", 14, 3, "apel"),
      "Igil",
      17,
      "Empat belas apel, dimakan tiga. Tiga ditambah empat belas, jadi tujuh belas!",
      ["Igil benar, tiga ditambah empat belas memang tujuh belas.", "Dimakan berarti berkurang, jadi dikurangi, bukan ditambah. Sisanya lebih kecil dari empat belas.", "Puluhan ikut hilang, jadi sisanya harus kurang dari sepuluh."],
      1,
      "Igil menambah, padahal apel yang dimakan berarti berkurang. Kurangi satuannya saja: empat dikurangi tiga.",
    ),
    L("pikir", 19, 9, "permen"),
    L("keluarga", 14, 5, "jagung"),
    L("lewat", 15, 8, "donat"),
  ]),
  C(2, "kanvas", "Misi Pasar Malam 3: catatan Kaka", "Kaka mencatat sisa dagangan di tiap lapak. Lingkari yang masih tersisa, lalu tulis jawabanmu.", [
    L("igil", 17, 2, "jeruk"),
    L("pikir", 11, 8, "pisang"),
    L("keluarga", 15, 9, "roti"),
    L("lewat", 13, 9, "anggur"),
  ]),
  C(3, "suara", "Misi Pasar Malam 4: panggilan Abang", "Abang memanggil dari ujung tiang balon. Jawab dengan suaramu.", [
    L("igil", 18, 1, "eskrim"),
    L("pikir", 17, 9, "lampion"),
    L("keluarga", 11, 6, "tiket"),
    L("lewat", 11, 9, "kelapa"),
  ]),
];

const P = kelompok("diagram");
export const PICTORIAL: SoalMisi[] = [
  P(1, "klik", "Misi Pasar Malam 5: peta lampion", "Abang menggambar peta pasar malam dengan titik polos. Bantu Kaka menghitung sisanya.", [
    salah(
      L("igil", 18, 7),
      "Kaka",
      1,
      "Satuannya delapan dikurangi tujuh sama dengan satu. Puluhannya nol, jadi jawabanku satu.",
      ["Kaka benar, delapan dikurangi tujuh memang satu.", "Puluhannya tetap satu, tidak jadi nol. Sisanya satu puluhan dan satu satuan.", "Puluhan harus dikurangi dulu sebelum satuan."],
      1,
      "Kaka lupa puluhannya. Puluhan tetap satu, jadi sisanya satu puluhan dan satu satuan.",
    ),
    L("pikir", 20, 7),
    L("keluarga", 13, 6),
    L("lewat", 14, 8),
  ]),
  P(2, "kanvas", "Misi Pasar Malam 6: catatan peta", "Kaka menandai titik-titik di peta. Lingkari yang tersisa, lalu tulis jawabanmu.", [
    L("igil", 16, 1),
    L("pikir", 12, 9),
    L("keluarga", 13, 8),
    L("lewat", 16, 8),
  ]),
  P(3, "suara", "Misi Pasar Malam 7: lapor lewat peta", "Abang melapor lewat peta bertitik lampion. Sebutkan jawabanmu.", [
    L("igil", 15, 5),
    L("pikir", 11, 9),
    L("keluarga", 11, 7),
    L("lewat", 13, 4),
  ]),
];

const A = kelompok("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(1, "klik", "Misi Pasar Malam 8: langit kembang api", "Langit malam hanya berisi kata dan angka. Selesaikan, lalu pilih jawabannya.", [
    L("igil", 19, 4),
    salah(
      L("pikir", 15, 8),
      "Abang",
      6,
      "Aku mencari berapa ditambah delapan sama dengan lima belas. Enam ditambah delapan, jadi jawabanku enam.",
      ["Abang benar, enam dan delapan cocok dengan lima belas.", "Enam ditambah delapan hanya empat belas, bukan lima belas. Masih kurang satu.", "Yang dicari delapan ditambah lima belas."],
      1,
      "Enam ditambah delapan hanya empat belas, belum sampai lima belas. Periksa dengan menambah dulu.",
    ),
    L("keluarga", 13, 9),
    L("lewat", 12, 9),
  ]),
  A(2, "kanvas", "Misi Pasar Malam 9: tulis di langit", "Kaka meminta Igil menulis angka di kanvas.", [L("igil", 16, 6), L("pikir", 19, 6), L("keluarga", 13, 7), L("lewat", 13, 8)]),
  A(3, "suara", "Misi Pasar Malam 10: laporan terakhir", "Laporan terakhir pasar malam. Bacakan jawaban untuk Pak RT.", [L("igil", 15, 4), L("pikir", 20, 8), L("keluarga", 17, 8), L("lewat", 12, 4)]),
];

/** Urutan langkah Kurangi Lewat Sepuluh (Abstract, mengurutkan langkah): kunci urutan benar. */
export const LANGKAH_LEWAT = ["Kurangi dulu sampai sepuluh", "Kurangi sisanya dari sepuluh", "Periksa dengan menambah"] as const;

export const POIN_PENTING = [
  "Kurangi satuannya dulu, puluhannya tetap. 19 – 4 = 15.",
  "Mundur di garis bilangan sebanyak yang diambil. 18 mundur 3 sampai 15.",
  "Pikir Penjumlahan: 9 + ? = 20, jadi 20 – 9 = 11.",
  "Keluarga Kalimat: 6 + 7 = 13, jadi 13 – 6 = 7.",
  "Kurangi Lewat Sepuluh: 15 – 8, kurangi 5 sampai 10, lalu 3 lagi, sisa 7.",
  "Periksa hasil pengurangan dengan menambah: 11 + 9 = 20.",
];
/** Poin penting untuk suara (tanpa digit dan tanpa lambang). */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) =>
  p
    .replace(/ – /g, " dikurangi ")
    .replace(/ \+ /g, " ditambah ")
    .replace(/ = /g, " sama dengan ")
    .replace(/\?/g, "berapa")
    .replace(/\d+/g, (d) => kata(Number(d))),
);

export const PERAYAAN = "Pasar malam resmi ditutup! Semua sisa dagangan sudah dilaporkan. Cerita Pasar Malam Kampung selesai.";
export const PERAYAAN_SUARA = "Pasar malam resmi ditutup! Semua sisa dagangan sudah dilaporkan. Cerita Pasar Malam Kampung selesai. Hebat!";

export const TEMA_TAHAP = {
  concrete: { ikon: "\u{1F388}", nama: "Concrete", cara: "Benda di tiang balon: ketuk, isi, dan ucapkan" },
  pictorial: { ikon: "\u{1F5FA}\u{FE0F}", nama: "Pictorial", cara: "Titik dan bingkai polos di peta lampion: tandai, isi, dan ucapkan" },
  abstract: { ikon: "\u{1F386}", nama: "Abstract", cara: "Kata dan angka di langit kembang api: pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_TUTUP, PICTORIAL as PICTORIAL_TUTUP, ABSTRACT as ABSTRACT_TUTUP, TEMA_TAHAP as TEMA_TUTUP };
