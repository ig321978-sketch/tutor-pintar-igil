/**
 * Isi tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 4 Sub-Bab C "Mainan untuk Festival",
 * akhir cerita Festival Mainan Kardus. Angka Story (kereta tiga segi empat, satu segitiga, empat lengkung; rumah; tangram perahu;
 * balok pola pohon; rumah lidi) hanya dipakai di Mind-map dan Infografis. Simulasi dan CPA memakai mainan dan bilangan lain
 * dan melanjutkan "Misi Festival" bagian satu sampai sepuluh. Diuji: scripts/uji-susun-k1b4c.mjs.
 */
import type { Bagian, Bentuk, Cara, Keping, Langkah, LangkahSoal, MainanSim, Pt, Rupa, SoalMisi, Tempat } from "./logika";
import { URUT_METODE, instruksi } from "./logika";

const tp = (id: string, kelompok: string, kunci: string, urutan?: number): Tempat => (urutan === undefined ? { id, kelompok, kunci } : { id, kelompok, kunci, urutan });

/** Gambar benda pada keping karton (kunci = jenis). */
export const EMOJI: Record<string, string> = {
  kardus: "\u{1F4E6}",
  cokelat: "\u{1F36B}",
  amplop: "\u{2709}\u{FE0F}",
  wafel: "\u{1F9C7}",
  kalender: "\u{1F4C5}",
  bendera: "\u{1F6A9}",
  keju: "\u{1F9C0}",
  pizza: "\u{1F355}",
  roda: "\u{1F6DE}",
  tutup: "\u{1F96B}",
  cd: "\u{1F4BF}",
  donat: "\u{1F369}",
};
/** Warna keping di Concrete (isi, garis). */
export const WARNA_BENDA: Record<string, [string, string]> = {
  kardus: ["#D6A15E", "#78350F"],
  cokelat: ["#A16207", "#451A03"],
  amplop: ["#F5F5F4", "#57534E"],
  wafel: ["#FCD34D", "#92400E"],
  kalender: ["#BBF7D0", "#15803D"],
  bendera: ["#FCA5A5", "#B91C1C"],
  keju: ["#FDE047", "#A16207"],
  pizza: ["#FDBA74", "#C2410C"],
  roda: ["#94A3B8", "#1F2937"],
  tutup: ["#CBD5E1", "#475569"],
  cd: ["#E0E7FF", "#4338CA"],
  donat: ["#F9A8D4", "#9D174D"],
};
/** Nama benda untuk pembaca layar. */
export const NAMA_BENDA: Record<string, string> = {
  kardus: "keping kardus",
  cokelat: "bungkus cokelat",
  amplop: "amplop",
  wafel: "wafel",
  kalender: "kalender meja",
  bendera: "bendera kecil",
  keju: "potongan keju",
  pizza: "potongan pizza",
  roda: "roda",
  tutup: "tutup kaleng",
  cd: "keping cakram",
  donat: "donat",
};
/** Balok pola di Concrete: segitiga = karton bendera, persegi = keping kardus. */
export const JENIS_BALOK = { segitiga: "bendera", persegi: "kardus" } as const;

/* ------------------------------ Mind-map: pita juri (hanya poin pelajaran) ------------------------------ */
export const PUSAT_PITA = "Menyusun bentuk";
export const KELOMPOK_PITA: Record<string, { nama: string; letak: string; ikon: string; isi: string; garis: string; petunjuk: string }> = {
  masalah: { nama: "Masalah", letak: "Papan klip juri", ikon: "\u{1F4CB}", isi: "#FECACA", garis: "#B91C1C", petunjuk: "Label ini merah muda. Tempelkan di papan klip juri." },
  metode: { nama: "Penyelesaian", letak: "Pita", ikon: "\u{1F397}\u{FE0F}", isi: "#BFDBFE", garis: "#1D4ED8", petunjuk: "Label ini biru. Tempelkan di pita yang nomornya pas." },
  hasil: { nama: "Hasil", letak: "Piala", ikon: "\u{1F3C6}", isi: "#FDE68A", garis: "#B45309", petunjuk: "Label ini kuning. Tempelkan di alas piala." },
};
export const TEMPAT_PITA: Tempat[] = [
  tp("kj-1", "masalah", "Bahan siap dirakit"),
  tp("kj-2", "masalah", "Juri tanya bentuknya"),
  tp("kj-3", "masalah", "Berapa bagiannya?"),
  tp("pt-1", "metode", "Gabung dua bentuk", 1),
  tp("pt-2", "metode", "Susun jadi mainan", 2),
  tp("pt-3", "metode", "Urai jadi bagian", 3),
  tp("pt-4", "metode", "Hitung tiap jenis", 4),
  tp("pt-5", "metode", "Tangram", 5),
  tp("pt-6", "metode", "Balok pola", 6),
  tp("pt-7", "metode", "Bentuk dari lidi", 7),
  tp("pl-1", "hasil", "Menyusun: bertambah"),
  tp("pl-2", "hasil", "Mengurai: berkurang"),
  tp("pl-3", "hasil", "Satu bentuk, dua cara"),
  tp("pl-4", "hasil", "Sebut bentuk penyusun"),
];
export const PETUNJUK_URUT_PITA = "Warnanya sudah benar. Nomor pitanya belum pas. Langkah mana yang lebih dulu?";
export const SUARA_PITA =
  "Ini meja juri festival. Papan klip berisi masalah. Pita bernomor berisi langkah yang berurutan, ikuti nomornya. Piala berisi hasil. Ketuk label, lalu ketuk tempat yang cocok.";

/* ------------------------------ Infografis: label gantung mainan ------------------------------ */
export const KOLOM_LABEL = ["Kalimat", "Banyak", "Diurai"] as const;
export const BARIS_LABEL: { jenis: string; nama: string; cara: string; kalimat: string; banyak: string; urai: string }[] = [
  { jenis: "kardus", nama: "Kereta", cara: "Metode IGIL", kalimat: "3 + 1 + 4 = 8", banyak: "8 bagian", urai: "8 − 4 = 4" },
  { jenis: "keju", nama: "Perahu", cara: "Tangram", kalimat: "2 + 1 + 1 = 4", banyak: "4 keping", urai: "lepas 4 keping" },
  { jenis: "bendera", nama: "Pohon", cara: "Balok pola", kalimat: "3 + 2 = 5", banyak: "5 balok", urai: "lepas 5 balok" },
  { jenis: "lidi", nama: "Rumah", cara: "Bentuk dari lidi", kalimat: "3 + 4 = 7", banyak: "7 lidi", urai: "7 − 3 = 4" },
];
export const EMOJI_LABEL: Record<string, string> = { kardus: "\u{1F682}", keju: "\u{26F5}", bendera: "\u{1F333}", lidi: "\u{1F3E0}" };
export const TEMPAT_LABEL: Tempat[] = BARIS_LABEL.flatMap((b, i) => [tp(`l${i}-kalimat`, "kalimat", b.kalimat), tp(`l${i}-banyak`, "banyak", b.banyak), tp(`l${i}-urai`, "urai", b.urai)]);
export const KELOMPOK_LABEL: Record<string, string> = {
  kalimat: "Label ini kalimat tambah saat menyusun. Tempelkan di kolom Kalimat.",
  banyak: "Label ini banyak bagian. Tempelkan di kolom Banyak.",
  urai: "Label ini terjadi saat mainan diurai. Tempelkan di kolom Diurai.",
};
export const SUARA_LABEL =
  "Ini label gantung mainan festival, berisi catatan dari cerita. Tiap baris satu mainan. Tempelkan kalimat tambahnya, banyak bagiannya, dan apa yang terjadi saat diurai.";

/* ------------------------------ Bagian mainan ------------------------------ */
const B = (bentuk: Bentuk, jenis: string, x: number, y: number, w: number, h: number, o: Partial<Bagian> = {}): Bagian => ({ bentuk, jenis, x, y, w, h, ...o });
/** Bagian kartu kata (rupa lambang): letak dihitung saat digambar. */
const kartu = (...daftar: [Bentuk, number][]): Bagian[] => daftar.flatMap(([b, n]) => Array.from({ length: n }, () => B(b, "kata", 0, 0, 0, 0)));

/* ------------------------------ Simulasi: Misi Festival bagian satu, meja rakit mainan ------------------------------ */
/** Mainan berbeda dari Story: robot (enam bagian), mobil hias (lima), pesawat (enam). */
export const MAINAN_SIM: MainanSim[] = [
  {
    id: "robot",
    nama: "robot",
    bagian: [
      B("segitiga", "bendera", 150, 30, 40, 26),
      B("segiempat", "kardus", 150, 70, 64, 50),
      B("lengkung", "tutup", 136, 66, 14, 14),
      B("lengkung", "tutup", 164, 66, 14, 14),
      B("segiempat", "cokelat", 150, 128, 84, 62),
      B("segiempat", "kardus", 150, 168, 60, 14),
    ],
  },
  {
    id: "mobil",
    nama: "mobil hias",
    bagian: [
      B("segiempat", "kardus", 140, 78, 90, 40),
      B("segiempat", "wafel", 150, 120, 180, 44),
      B("segiempat", "amplop", 250, 126, 20, 24),
      B("lengkung", "roda", 100, 150, 34, 34),
      B("lengkung", "roda", 200, 150, 34, 34),
    ],
  },
  {
    id: "pesawat",
    nama: "pesawat",
    bagian: [
      B("segitiga", "keju", 140, 70, 50, 26),
      B("segitiga", "bendera", 78, 70, 30, 26),
      B("segiempat", "kalender", 140, 100, 150, 34),
      B("segitiga", "pizza", 230, 100, 34, 30, { putar: 90 }),
      B("lengkung", "cd", 256, 100, 14, 40),
      B("segiempat", "kardus", 140, 140, 70, 26, { miring: true }),
    ],
  },
];
export const MISI_RAKIT = "Misi Festival: rakit mainan di meja. Susun bagiannya, urai lagi, baca kalimat tambah dan kurang, lalu bawa ke panggung juri.";

/* ------------------------------ Satuan petak ------------------------------ */
const sq = (i: number, r: number): Pt[] => [[i, r], [i + 1, r], [i + 1, r + 1], [i, r + 1]];
const naik = (i: number, r: number): Pt[] => [[i, r + 1], [i + 0.5, r], [i + 1, r + 1]];
const turun = (i: number, r: number): Pt[] => [[i, r], [i + 1, r], [i + 0.5, r + 1]];
const kp = (jenis: string, ...titik: Pt[]): Keping => ({ jenis, titik });

/* ------------------------------ CPA: lanjutan Misi Festival ------------------------------ */
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
  C(1, "klik", "Misi Festival 2: robot kardus", "Pagi hari festival. Abang merakit robot dari keping karton. Bantu Igil mengurai dan menghitung.", [
    {
      tipe: "urai",
      nama: "robot",
      tanya: "semua",
      bagian: [
        B("segitiga", "bendera", 150, 34, 36, 24),
        B("segiempat", "kardus", 150, 66, 50, 36),
        B("segiempat", "cokelat", 150, 116, 70, 56),
        B("segiempat", "amplop", 94, 106, 34, 16),
        B("segiempat", "amplop", 206, 106, 34, 16),
        B("lengkung", "roda", 128, 160, 26, 26),
        B("lengkung", "roda", 172, 160, 26, 26),
      ],
    },
    { tipe: "gabung", keping: [kp("kardus", [0, 0], [2, 0], [2, 2], [0, 2]), kp("cokelat", [2, 0], [4, 0], [4, 2], [2, 2])], gabung: [[0, 0], [4, 0], [4, 2], [0, 2]], tempel: "sisi tegak ditempel" },
    { tipe: "balok", nama: "kereta pawai", tanya: "semua", isi: [], slot: [0, 1, 2, 3].flatMap((i) => [sq(i, 1), naik(i, 0)]) },
    { tipe: "lidi", nama: "dua segitiga", bangun: [[[1, 3], [2, 1], [3, 3]], [[2, 1], [4, 1], [3, 3]]] },
  ]),
  C(2, "kanvas", "Misi Festival 3: mobil hias", "Kaka menghias mobil karton untuk pawai. Beri tanda dan tulis jawabanmu.", [
    {
      tipe: "urai",
      nama: "mobil hias",
      tanya: "lengkung",
      bagian: [
        B("segiempat", "kardus", 130, 70, 70, 40),
        B("segiempat", "wafel", 150, 110, 150, 40),
        B("segitiga", "bendera", 240, 106, 24, 20),
        B("lengkung", "roda", 105, 144, 30, 30),
        B("lengkung", "roda", 195, 144, 30, 30),
      ],
    },
    { tipe: "gabung", keping: [kp("bendera", [2, 0], [3, 2], [1, 2]), kp("kardus", [1, 2], [3, 2], [4, 4], [0, 4])], gabung: [[2, 0], [4, 4], [0, 4]], tempel: "segitiga di puncak" },
    { tipe: "balok", nama: "gapura", tanya: "segitiga", isi: [], slot: [sq(0, 1), sq(1, 1), sq(2, 1), naik(0, 0), naik(1, 0), naik(2, 0), turun(1, 2)] },
    { tipe: "lidi", nama: "tiga segitiga", bangun: [[[0, 3], [0.8, 1], [1.6, 3]], [[2.2, 3], [3, 1], [3.8, 3]], [[4.4, 3], [5.2, 1], [6, 3]]] },
  ]),
  C(3, "suara", "Misi Festival 4: menara panggung", "Mamah bertanya lewat telepon tentang hiasan panggung. Jawab dengan suaramu.", [
    {
      tipe: "urai",
      nama: "menara",
      tanya: { lepas: "segiempat" },
      bagian: [
        B("segitiga", "bendera", 150, 34, 40, 26),
        B("segiempat", "kardus", 150, 64, 50, 30),
        B("segiempat", "cokelat", 150, 96, 60, 30),
        B("segiempat", "kardus", 150, 128, 70, 30),
        B("segiempat", "wafel", 150, 160, 80, 30),
      ],
    },
    { tipe: "keping", nama: "ikan tangram", tanya: "semua", keping: [kp("kardus", [2, 0], [4, 2], [2, 4], [0, 2]), kp("bendera", [4, 2], [5.5, 0.8], [5.5, 3.2]), kp("keju", [1, 1], [2, 0], [0.6, -0.4])] },
    { tipe: "balok", nama: "kupu-kupu", tanya: "semua", isi: [], slot: [sq(1, 0), sq(1, 1), sq(1, 2), [[0, 0], [1, 0], [1, 1]], [[2, 0], [3, 0], [2, 1]], [[1, 2], [1, 3], [0, 3]]] },
    { tipe: "lidi", nama: "tiga segi empat berjajar", bangun: [0, 1, 2].map((i): Pt[] => [[0.75 + i * 1.5, 1], [2.25 + i * 1.5, 1], [2.25 + i * 1.5, 2.5], [0.75 + i * 1.5, 2.5]]) },
  ]),
];

const P = kelompok("diagram");
export const PICTORIAL: SoalMisi[] = [
  P(1, "klik", "Misi Festival 5: gambar rancangan", "Abang menggambar rancangan mainan dengan garis saja.", [
    {
      tipe: "urai",
      nama: "pesawat",
      tanya: "semua",
      bagian: [
        B("segiempat", "pola", 140, 100, 120, 30),
        B("segiempat", "pola", 140, 68, 36, 30),
        B("segiempat", "pola", 140, 132, 36, 30),
        B("segitiga", "pola", 214, 100, 30, 28, { putar: 90 }),
        B("segitiga", "pola", 66, 84, 26, 30),
        B("lengkung", "pola", 246, 100, 16, 30),
        B("lengkung", "pola", 140, 166, 22, 22),
      ],
    },
    { tipe: "gabung", keping: [kp("pola", [0, 2], [1, 0], [2, 2]), kp("pola", [1, 0], [3, 0], [2, 2]), kp("pola", [2, 2], [3, 0], [4, 2])], gabung: [[0, 2], [1, 0], [3, 0], [4, 2]], tempel: "berjajar, sisi miring bertemu" },
    { tipe: "balok", nama: "jembatan", tanya: "semua", isi: [], slot: [0, 1, 2, 3, 4].flatMap((i) => [sq(i, 1), naik(i, 0)]) },
    { tipe: "lidi", nama: "dua segi empat", bangun: [[[0.5, 1], [2.5, 1], [2.5, 3], [0.5, 3]], [[3.5, 1], [5.5, 1], [5.5, 3], [3.5, 3]]] },
  ]),
  P(2, "kanvas", "Misi Festival 6: lembar pola", "Igil menandai pola mainan di lembar rancangan.", [
    {
      tipe: "urai",
      nama: "truk",
      tanya: "segitiga",
      bagian: [
        B("segiempat", "pola", 120, 100, 110, 44),
        B("segiempat", "pola", 120, 64, 60, 28),
        B("segiempat", "pola", 204, 104, 46, 36),
        B("segitiga", "pola", 204, 72, 22, 26),
        B("lengkung", "pola", 85, 138, 28, 28),
        B("lengkung", "pola", 140, 138, 28, 28),
        B("lengkung", "pola", 204, 138, 28, 28),
      ],
    },
    { tipe: "gabung", keping: [kp("pola", [1, 2], [2, 0], [3, 2]), kp("pola", [0, 4], [1, 2], [2, 4]), kp("pola", [1, 2], [3, 2], [4, 4], [2, 4])], gabung: [[2, 0], [4, 4], [0, 4]], tempel: "tiga keping" },
    { tipe: "balok", nama: "benteng", tanya: "persegi", isi: [], slot: [sq(0, 1), sq(1, 1), sq(2, 1), sq(0, 2), sq(1, 2), sq(2, 2), naik(0, 0), naik(2, 0)] },
    { tipe: "lidi", nama: "dua segitiga", bangun: [[[3, 0.5], [4.5, 2], [1.5, 2]], [[1.5, 2], [4.5, 2], [3, 3.5]]] },
  ]),
  P(3, "suara", "Misi Festival 7: lapor ke juri", "Juri ingin tahu bentuk penyusun mainan. Sebutkan jawabanmu.", [
    {
      tipe: "urai",
      nama: "kapal",
      tanya: { lepas: "lengkung" },
      bagian: [
        B("segiempat", "pola", 150, 140, 140, 30, { miring: true }),
        B("segiempat", "pola", 130, 108, 60, 30),
        B("segitiga", "pola", 190, 96, 34, 44),
        B("segitiga", "pola", 130, 78, 20, 26),
        B("lengkung", "pola", 100, 140, 18, 18),
        B("lengkung", "pola", 200, 140, 18, 18),
      ],
    },
    {
      tipe: "keping",
      nama: "rumah tangram",
      tanya: "segitiga",
      keping: [kp("pola", [0, 2], [2, 0], [4, 2]), kp("pola", [0, 2], [2, 2], [2, 4], [0, 4]),kp("pola", [2, 2], [4, 2], [4, 4], [2, 4]), kp("pola", [-1.6, 4], [-0.4, 4], [-1, 2.6]), kp("pola", [4.4, 4], [5.6, 4], [5, 2.6]), kp("pola", [3, -0.4], [3.6, -0.4], [3.6, 0.6], [3, 0.6])],
    },
    { tipe: "balok", nama: "kios", tanya: "sisa", isi: [0, 1, 2, 3, 4], slot: [sq(0, 1), sq(1, 1), sq(2, 1), sq(3, 1), naik(0, 0), naik(1, 0), naik(2, 0)] },
    { tipe: "lidi", nama: "rumah dua kamar", bangun: [[[1, 2], [2.5, 2], [2.5, 3.5], [1, 3.5]], [[2.5, 2], [4, 2], [4, 3.5], [2.5, 3.5]], [[1, 2], [1.75, 0.6], [2.5, 2]]] },
  ]),
];

const A = kelompok("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(1, "klik", "Misi Festival 8: kartu juri", "Juri menulis bagian mainan di kartu kecil, tanpa gambar.", [
    { tipe: "urai", nama: "istana", tanya: "semua", bagian: kartu(["segiempat", 4], ["segitiga", 3], ["lengkung", 2]) },
    { tipe: "gabung", keping: [kp("kata", [0, 0], [2, 0], [2, 2], [0, 2]), kp("kata", [0, 2], [2, 2], [2, 4], [0, 4])], gabung: [[0, 0], [2, 0], [2, 4], [0, 4]], tempel: "satu di atas yang lain" },
    { tipe: "balok", nama: "tenda", tanya: "semua", isi: [], slot: [sq(0, 1), sq(1, 1), naik(0, 0), naik(1, 0)] },
    { tipe: "lidi", nama: "tiga segi empat berjajar", bangun: [0, 1, 2].map((i): Pt[] => [[i, 1], [i + 1, 1], [i + 1, 2], [i, 2]]) },
  ]),
  A(2, "kanvas", "Misi Festival 9: catatan juri", "Juri meminta Igil menulis jawabannya di kanvas.", [
    { tipe: "urai", nama: "gerobak", tanya: { lepas: "lengkung" }, bagian: kartu(["segiempat", 2], ["lengkung", 3]) },
    { tipe: "gabung", keping: [kp("kata", [2, 0], [3, 2], [1, 2]), kp("kata", [1, 2], [3, 2], [4, 4], [0, 4])], gabung: [[2, 0], [4, 4], [0, 4]], tempel: "segitiga di puncak" },
    { tipe: "balok", nama: "bintang", tanya: "semua", isi: [], slot: [sq(0, 1), sq(1, 1), naik(0, 0), naik(1, 0), turun(0, 2), turun(1, 2), [[0, 1], [0, 2], [-0.8, 1.5]], [[2, 1], [2.8, 1.5], [2, 2]]] },
    { tipe: "lidi", nama: "dua segitiga", bangun: [[[0, 2], [1, 0], [2, 2]], [[3, 2], [4, 0], [5, 2]]] },
  ]),
  A(3, "suara", "Misi Festival 10: pita juara", "Pertanyaan terakhir sebelum juri memberi pita. Bacakan jawabanmu.", [
    { tipe: "urai", nama: "bianglala", tanya: { lepas: "segitiga" }, bagian: kartu(["segiempat", 4], ["segitiga", 3], ["lengkung", 3]) },
    { tipe: "keping", nama: "kucing tangram", tanya: "segitiga", keping: [kp("kata", [0, 0], [1, 0], [0, 1]), kp("kata", ...sq(0, 1)), kp("kata", [1, 1], [2, 1], [1, 2]), kp("kata", [0, 2], [2, 2], [2.5, 3], [0.5, 3]), kp("kata", [2, 2], [3, 2], [3, 3]), kp("kata", ...sq(3, 0))] },
    { tipe: "balok", nama: "kios", tanya: "sisa", isi: [0, 1, 2, 3, 4, 5], slot: [sq(0, 1), sq(1, 1), sq(2, 1), sq(3, 1), naik(0, 0), naik(1, 0), naik(2, 0)] },
    { tipe: "lidi", nama: "dua segitiga", bangun: [[[1, 3], [2, 1], [3, 3]], [[2, 1], [4, 1], [3, 3]]] },
  ]),
];

export const POIN_PENTING = [
  "Menyusun berarti menggabung bentuk menjadi bangun baru. Banyak bagiannya bertambah.",
  "Mengurai berarti memisah bangun menjadi bagian-bagiannya. Banyak bagiannya berkurang.",
  "Dua segitiga yang sama bisa disusun menjadi segi empat atau segitiga besar.",
  "Sebut jenis dan banyak bagian penyusunnya, misalnya 2 segi empat + 1 segitiga = 3 bagian.",
  "Membuat bentuk dari lidi: segitiga perlu 3 lidi, segi empat perlu 4 lidi. Sisi bersama cukup 1 lidi.",
];
const KATA_ANGKA: Record<string, string> = { "1": "satu", "2": "dua", "3": "tiga", "4": "empat" };
/** Poin penting untuk suara (tanpa digit). */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => p.replace(/ \+ /g, " tambah ").replace(/ = /g, " sama dengan ").replace(/\d/g, (d) => KATA_ANGKA[d] ?? d));
export const PERAYAAN = "Festival Mainan Kardus selesai! Semua bahan bekas dari gudang kini menjadi mainan, dan juri memberi pita.";
export const PERAYAAN_SUARA = "Festival Mainan Kardus selesai! Semua bahan bekas dari gudang kini menjadi mainan, dan juri memberi pita. Hebat!";

export const TEMA_TAHAP = {
  concrete: { ikon: "\u{1F6E0}\u{FE0F}", nama: "Concrete", cara: "Keping karton: ketuk, tandai, dan ucapkan" },
  pictorial: { ikon: "\u{1F4D0}", nama: "Pictorial", cara: "Bangun polos: ketuk, tandai, dan ucapkan" },
  abstract: { ikon: "\u{1F3C6}", nama: "Abstract", cara: "Kata dan angka saja: ketuk, tulis, dan ucapkan" },
} as const;
