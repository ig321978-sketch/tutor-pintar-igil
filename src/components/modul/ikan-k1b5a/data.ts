/**
 * Isi tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 5 Sub-Bab A "Ikan Baru Datang",
 * awal cerita Akuarium Ikan Hias Abang. Angka Story (empat belas guppy, sebelas koki, neon tujuh belas ditambah tiga menjadi dua puluh,
 * hitungan Igil tiga belas dan lima belas, tebakan sepuluh) hanya dipakai di Mind-map dan Infografis. Simulasi dan CPA memakai ikan dan
 * bilangan lain dan melanjutkan "Misi Lapak Ikan" bagian satu sampai sepuluh. Diuji: scripts/uji-ikan-k1b5a.mjs.
 */
import type { Cara, KantongSim, Langkah, LangkahSoal, Rupa, SoalMisi, Tempat } from "./logika";
import { URUT_METODE, instruksi, kata } from "./logika";

const tp = (id: string, kelompok: string, kunci: string, urutan?: number): Tempat => (urutan === undefined ? { id, kelompok, kunci } : { id, kelompok, kunci, urutan });

/** Gambar hewan air (kunci = jenis). */
export const EMOJI: Record<string, string> = {
  ikan: "\u{1F41F}",
  tropis: "\u{1F420}",
  buntal: "\u{1F421}",
  udang: "\u{1F990}",
  kepiting: "\u{1F980}",
  siput: "\u{1F40C}",
};
/** Warna lingkaran air di belakang hewan (Concrete). */
export const WARNA_BENDA: Record<string, [string, string]> = {
  ikan: ["#BFDBFE", "#1D4ED8"],
  tropis: ["#FDE68A", "#B45309"],
  buntal: ["#FED7AA", "#C2410C"],
  udang: ["#FBCFE8", "#BE185D"],
  kepiting: ["#FECACA", "#B91C1C"],
  siput: ["#D9F99D", "#4D7C0F"],
};
/** Nama hewan untuk pembaca layar. */
export const NAMA_BENDA: Record<string, string> = {
  ikan: "ikan mas",
  tropis: "ikan badut",
  buntal: "ikan buntal",
  udang: "udang hias",
  kepiting: "kepiting kecil",
  siput: "siput air",
};

/* ------------------------------ Mind-map: akuarium dengan gelembung bernomor (hanya poin pelajaran) ------------------------------ */
export const PUSAT_GELEMBUNG = "Menghitung sampai dua puluh";
export const KELOMPOK_GELEMBUNG: Record<string, { nama: string; letak: string; ikon: string; isi: string; garis: string; petunjuk: string }> = {
  masalah: { nama: "Masalah", letak: "Kantong plastik", ikon: "\u{1F6CD}\u{FE0F}", isi: "#FECACA", garis: "#B91C1C", petunjuk: "Label ini merah muda. Tempelkan di kantong plastik." },
  metode: { nama: "Penyelesaian", letak: "Gelembung", ikon: "\u{1F535}", isi: "#BAE6FD", garis: "#0369A1", petunjuk: "Label ini biru. Tempelkan di gelembung yang nomornya pas." },
  hasil: { nama: "Hasil", letak: "Tutup akuarium", ikon: "\u{1F4A1}", isi: "#FEF08A", garis: "#A16207", petunjuk: "Label ini kuning. Tempelkan di tutup akuarium berlampu." },
};
export const TEMPAT_GELEMBUNG: Tempat[] = [
  tp("kp-1", "masalah", "Benda terus bergerak"),
  tp("kp-2", "masalah", "Hitungan berbeda-beda"),
  tp("kp-3", "masalah", "Perlu lambang dan nama"),
  tp("gl-1", "metode", "Satu benda satu hitungan", 1),
  tp("gl-2", "metode", "Penuhi sepuluh dulu", 2),
  tp("gl-3", "metode", "Hitung lanjut sisanya", 3),
  tp("gl-4", "metode", "Tulis lambang dan nama", 4),
  tp("gl-5", "metode", "Dua bingkai sepuluh", 5),
  tp("gl-6", "metode", "Manik hitung", 6),
  tp("gl-7", "metode", "Toples tebakan", 7),
  tp("tt-1", "hasil", "Belasan: sepuluh dan sisa"),
  tp("tt-2", "hasil", "Sebelas nama istimewa"),
  tp("tt-3", "hasil", "Dua puluh: dua sepuluh"),
  tp("tt-4", "hasil", "Tebakan dibuktikan hitung"),
];
export const PETUNJUK_URUT_GELEMBUNG = "Warnanya sudah benar. Nomor gelembungnya belum pas. Langkah mana yang lebih dulu?";
export const SUARA_GELEMBUNG =
  "Ini akuarium dengan gelembung yang naik. Kantong plastik berisi masalah. Gelembung bernomor berisi langkah yang berurutan, ikuti nomornya dari bawah ke atas. Tutup akuarium berlampu berisi hasil. Ketuk label, lalu ketuk tempat yang cocok.";

/* ------------------------------ Infografis: label di kaca akuarium ------------------------------ */
export const KOLOM_LABEL = ["Sepuluh dan sisa", "Banyak", "Nama bilangan", "Catatan hitung"] as const;
export const BARIS_LABEL: { jenis: string; nama: string; sepuluh: number; sisa: number; banyak: number; catatan: string }[] = [
  { jenis: "tropis", nama: "Guppy", sepuluh: 10, sisa: 4, banyak: 14, catatan: "13, lalu 15" },
  { jenis: "ikan", nama: "Koki", sepuluh: 10, sisa: 1, banyak: 11, catatan: "tebak 10" },
  { jenis: "ikan", nama: "Neon", sepuluh: 10, sisa: 10, banyak: 20, catatan: "17, lalu 3" },
];
export const TEMPAT_LABEL: Tempat[] = BARIS_LABEL.flatMap((b, i) => [
  tp(`l${i}-sepuluh`, "sepuluh", `${b.sepuluh} dan ${b.sisa}`),
  tp(`l${i}-banyak`, "banyak", String(b.banyak)),
  tp(`l${i}-nama`, "nama", kata(b.banyak)),
  tp(`l${i}-catatan`, "catatan", b.catatan),
]);
export const KELOMPOK_LABEL: Record<string, string> = {
  sepuluh: "Label ini sepuluh dan sisanya. Tempelkan di kolom Sepuluh dan sisa.",
  banyak: "Label ini lambang bilangan. Tempelkan di kolom Banyak.",
  nama: "Label ini nama bilangan. Tempelkan di kolom Nama bilangan.",
  catatan: "Label ini catatan saat menghitung. Tempelkan di kolom Catatan hitung.",
};
export const SUARA_LABEL =
  "Ini label di kaca akuarium, berisi catatan dari cerita. Tiap baris satu jenis ikan. Tempelkan sepuluh dan sisanya, lambang bilangan, nama bilangan, dan catatan hitungnya.";

/* ------------------------------ Simulasi: Misi Lapak Ikan bagian satu, wadah sekat sepuluh ------------------------------ */
/** Ikan berbeda dari Story: cupang dua belas, molly enam belas, buntal sembilan belas. */
export const KANTONG_SIM: KantongSim[] = [
  { id: "cupang", nama: "ikan cupang", jenis: "tropis", total: 12 },
  { id: "molly", nama: "ikan molly", jenis: "ikan", total: 16 },
  { id: "buntal", nama: "ikan buntal", jenis: "buntal", total: 19 },
];
export const MISI_IKAN = "Misi Lapak Ikan: tebak dulu, pindahkan ikan satu per satu ke wadah bersekat sepuluh, lalu pasang label angka dan nama.";

/* ------------------------------ CPA: lanjutan Misi Lapak Ikan ------------------------------ */
const jaring = (ikan: number, jenis = "titik"): Langkah => ({ tipe: "jaring", ikan, jenis });
const bingkai = (isi: number, jawab: "angka" | "nama", jenis = "titik"): Langkah => ({ tipe: "bingkai", isi, jawab, jenis });
const manik = (sasaran: number, tanya: "bawah" | "semua"): Langkah => ({ tipe: "manik", sasaran, tanya });
const toples = (ikan: number, tebakan: number[], jenis = "titik"): Langkah => ({ tipe: "toples", ikan, jenis, tebakan });

const kelompok =
  (rupa: Rupa) =>
  (nomor: number, cara: Cara, judul: string, cerita: string, isi: [Langkah, Langkah, Langkah, Langkah]): SoalMisi => ({
    nomor,
    judul,
    cerita,
    cara,
    langkah: isi.map((l, i): LangkahSoal => {
      const s = instruksi(l, rupa, cara);
      return { metode: URUT_METODE[i], cara, judul: s, suara: s, langkah: l };
    }),
  });

const C = kelompok("benda");
export const CONCRETE: SoalMisi[] = [
  C(1, "klik", "Misi Lapak Ikan 2: kiriman pagi", "Kiriman hewan air datang lagi. Bantu Igil menghitung isinya.", [
    jaring(16, "ikan"),
    bingkai(16, "nama", "udang"),
    manik(18, "bawah"),
    toples(12, [5, 10, 20], "siput"),
  ]),
  C(2, "kanvas", "Misi Lapak Ikan 3: catatan Kaka", "Kaka mencatat isi tiap wadah. Beri tanda, lalu tulis jawabanmu.", [
    jaring(19, "tropis"),
    bingkai(19, "nama", "kepiting"),
    manik(18, "semua"),
    toples(7, [5, 10, 15], "ikan"),
  ]),
  C(3, "suara", "Misi Lapak Ikan 4: telepon penjual", "Penjual ikan menelepon Abang dan bertanya banyaknya. Jawab dengan suaramu.", [
    jaring(9, "udang"),
    bingkai(10, "angka", "tropis"),
    manik(12, "bawah"),
    toples(6, [5, 10, 15], "kepiting"),
  ]),
];

const P = kelompok("diagram");
export const PICTORIAL: SoalMisi[] = [
  P(1, "klik", "Misi Lapak Ikan 5: gambar titik", "Abang menggambar tiap ikan sebagai titik supaya cepat dihitung.", [jaring(18), bingkai(18, "nama"), manik(19, "bawah"), toples(5, [5, 10, 15])]),
  P(2, "kanvas", "Misi Lapak Ikan 6: pola jaring", "Kaka menandai titik di pola jaring. Beri tanda, lalu tulis jawabanmu.", [jaring(12), bingkai(12, "nama"), manik(16, "semua"), toples(4, [5, 10, 15])]),
  P(3, "suara", "Misi Lapak Ikan 7: lapor ke Mamah", "Abang melaporkan hitungannya kepada Mamah. Sebutkan jawabanmu.", [jaring(10), bingkai(19, "angka"), manik(11, "bawah"), toples(8, [5, 10, 15])]),
];

const A = kelompok("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(1, "klik", "Misi Lapak Ikan 8: kartu label", "Kaka menulis label akuarium dengan kata dan angka saja.", [jaring(19), bingkai(16, "nama"), manik(16, "bawah"), toples(12, [5, 10, 20])]),
  A(2, "kanvas", "Misi Lapak Ikan 9: tulis label", "Kaka meminta Igil menulis lambang bilangan di kanvas.", [jaring(9), bingkai(18, "nama"), manik(18, "semua"), toples(4, [5, 10, 15])]),
  A(3, "suara", "Misi Lapak Ikan 10: semua label siap", "Semua label hampir siap. Bacakan jawaban terakhir untuk Abang.", [jaring(8), bingkai(16, "angka"), manik(12, "bawah"), toples(5, [1, 8, 15])]),
];

export const POIN_PENTING = [
  "Satu benda, satu hitungan. Pindahkan atau tandai satu per satu supaya tidak terhitung dua kali.",
  "Penuhi sepuluh dulu, lalu hitung sisanya. 10 dan 6 menjadi 16.",
  "Belasan dibaca nama satuannya lalu belas: 16 dibaca enam belas. 11 dibaca sebelas.",
  "20 adalah dua sepuluh penuh, dibaca dua puluh.",
  "Perkirakan dulu, lalu buktikan dengan menghitung.",
];
/** Poin penting untuk suara (tanpa digit). */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => p.replace(/\d+/g, (d) => kata(Number(d))));

export const TEMA_TAHAP = {
  concrete: { ikon: "\u{1F420}", nama: "Concrete", cara: "Ikan dan hewan air: ketuk, tandai, dan ucapkan" },
  pictorial: { ikon: "\u{1F9F6}", nama: "Pictorial", cara: "Titik di pola jaring: ketuk, tandai, dan ucapkan" },
  abstract: { ikon: "\u{1F4A7}", nama: "Abstract", cara: "Kata dan angka saja: ketuk, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_IKAN, PICTORIAL as PICTORIAL_IKAN, ABSTRACT as ABSTRACT_IKAN, TEMA_TAHAP as TEMA_IKAN };
