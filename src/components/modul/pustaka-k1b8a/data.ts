/**
 * Isi tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 8 Sub-Bab A "Kotak Cerita Berantakan",
 * awal cerita Perpustakaan Keliling. Angka Story (kotak hewan enam, laut empat, roket lima, bunga tiga; semuanya delapan belas)
 * hanya dipakai di Mind-map dan Infografis. Simulasi dan CPA memakai benda dan bilangan lain dan melanjutkan "Misi Meja Pilah".
 * Banyak tiap jenis paling besar sembilan dan jumlah semuanya paling besar delapan belas.
 * Diuji: scripts/uji-pustaka-k1b8a.mjs.
 */
import type { BendaSim, Cara, Langkah, LangkahDasar, LangkahSalah, LangkahSoal, Rupa, SoalMisi, Tanya, Tempat } from "./logika";
import { instruksi, kata, metodeLangkah } from "./logika";

const tp = (id: string, kelompok: string, kunci: string, urutan?: number): Tempat => (urutan === undefined ? { id, kelompok, kunci } : { id, kelompok, kunci, urutan });

/* ------------------------------ Gambar benda ------------------------------ */
export type SetBenda = { id: string; nama: string[]; emoji: string[]; warna: string[] };
const WARNA_JENIS = ["#FCA5A5", "#FDE68A", "#BBF7D0", "#BFDBFE"];
/** Tujuh kumpulan benda untuk Concrete (emoji berwarna) dan untuk nama jenis di Abstract. Pictorial memakai bentuk polos dari BENTUK. */
export const SETS: Record<string, SetBenda> = {
  buah: { id: "buah", nama: ["apel", "pisang", "jeruk", "anggur"], emoji: ["\u{1F34E}", "\u{1F34C}", "\u{1F34A}", "\u{1F347}"], warna: WARNA_JENIS },
  serangga: { id: "serangga", nama: ["kupu-kupu", "lebah", "kumbang", "semut"], emoji: ["\u{1F98B}", "\u{1F41D}", "\u{1F41E}", "\u{1F41C}"], warna: WARNA_JENIS },
  stiker: { id: "stiker", nama: ["bintang", "bulan", "awan", "pelangi"], emoji: ["\u{2B50}", "\u{1F319}", "\u{2601}\u{FE0F}", "\u{1F308}"], warna: WARNA_JENIS },
  alat: { id: "alat", nama: ["pensil", "gunting", "klip", "pembatas"], emoji: ["\u{270F}\u{FE0F}", "\u{2702}\u{FE0F}", "\u{1F4CE}", "\u{1F516}"], warna: WARNA_JENIS },
  taman: { id: "taman", nama: ["mawar", "tulip", "matahari", "aster"], emoji: ["\u{1F339}", "\u{1F337}", "\u{1F33B}", "\u{1F33C}"], warna: WARNA_JENIS },
  kendaraan: { id: "kendaraan", nama: ["sepeda", "mobil", "bus", "perahu"], emoji: ["\u{1F6B2}", "\u{1F697}", "\u{1F68C}", "\u{26F5}"], warna: WARNA_JENIS },
  ternak: { id: "ternak", nama: ["sapi", "domba", "ayam", "bebek"], emoji: ["\u{1F404}", "\u{1F411}", "\u{1F413}", "\u{1F986}"], warna: WARNA_JENIS },
};
/** Pictorial: tiap jenis berupa satu bentuk polos (tanpa gambar benda). */
export const BENTUK = ["bulat", "kotak", "segitiga", "belah ketupat"] as const;
export const NAMA_BENDA_SET = (id: string): string[] => SETS[id].nama;
/** Nama jenis menurut rupa: benda dan lambang memakai nama benda, diagram memakai nama bentuk. */
export const namaJenis = (set: string, rupa: Rupa): string[] => (rupa === "diagram" ? [...BENTUK] : SETS[set].nama);

/* ------------------------------ Mind-map: rak kayu lipat (hanya poin pelajaran) ------------------------------ */
export const PUSAT_RAK = "Memilah benda dan membaca tabel";
export const KELOMPOK_RAK: Record<string, { nama: string; letak: string; ikon: string; isi: string; garis: string; petunjuk: string }> = {
  masalah: { nama: "Masalah", letak: "Rak bawah", ikon: "\u{1F6A7}", isi: "#FDE68A", garis: "#A16207", petunjuk: "Label ini kuning. Tempelkan di rak bawah, tempat masalah." },
  metode: { nama: "Penyelesaian", letak: "Rak tengah", ikon: "\u{1F4CB}", isi: "#BFDBFE", garis: "#1D4ED8", petunjuk: "Label ini biru. Tempelkan di petak bernomor yang pas." },
  hasil: { nama: "Hasil", letak: "Rak atas", ikon: "\u{1F3C6}", isi: "#BBF7D0", garis: "#15803D", petunjuk: "Label ini hijau. Tempelkan di rak atas, tempat hasil." },
};
export const TEMPAT_RAK: Tempat[] = [
  tp("rm-1", "masalah", "Benda bercampur"),
  tp("rm-2", "masalah", "Ada yang terhitung dua kali"),
  tp("rm-3", "masalah", "Banyak tiap jenis belum diketahui"),
  tp("rp-1", "metode", "Pilah menurut jenis", 1),
  tp("rp-2", "metode", "Lingkaran Pilah", 2),
  tp("rp-3", "metode", "Turus: lima dicoret miring", 3),
  tp("rp-4", "metode", "Tabel Frekuensi", 4),
  tp("rp-5", "metode", "Baca baris dan kolom", 5),
  tp("rp-6", "metode", "Pasangkan Satu-Satu", 6),
  tp("rp-7", "metode", "Jumlahkan semuanya", 7),
  tp("rh-1", "hasil", "Paling banyak"),
  tp("rh-2", "hasil", "Paling sedikit"),
  tp("rh-3", "hasil", "Sama banyak"),
  tp("rh-4", "hasil", "Selisih dan jumlah semua"),
];
export const PETUNJUK_URUT_RAK = "Warnanya sudah benar. Nomor petaknya belum pas. Langkah mana yang lebih dulu?";
export const SUARA_RAK =
  "Ini rak kayu lipat di bak mobil pustaka. Rak bawah berisi masalah. Rak tengah punya tujuh petak bernomor berisi langkah yang berurutan, ikuti nomornya dari satu sampai tujuh. Rak atas berisi hasil. Ketuk label, lalu ketuk tempat yang cocok.";

/* ------------------------------ Infografis: laci kartu peminjam ------------------------------ */
export const KOLOM_LACI = ["Banyak", "Turus", "Catatan"] as const;
export const BARIS_LACI: { ikon: string; nama: string; banyak: string; turus: string; catatan: string }[] = [
  { ikon: "\u{1F418}", nama: "Hewan", banyak: "6", turus: "||||/ |", catatan: "paling banyak" },
  { ikon: "\u{1F41F}", nama: "Laut", banyak: "4", turus: "||||", catatan: "kurang satu dari roket" },
  { ikon: "\u{1F680}", nama: "Roket", banyak: "5", turus: "||||/", catatan: "kurang satu dari hewan" },
  { ikon: "\u{1F338}", nama: "Bunga", banyak: "3", turus: "|||", catatan: "paling sedikit" },
  { ikon: "\u{1F4E6}", nama: "Semuanya", banyak: "18", turus: "||||/ | |||| ||||/ |||", catatan: "jumlah semua jenis" },
];
export const TEMPAT_LACI: Tempat[] = BARIS_LACI.flatMap((b, i) => [tp(`l${i}-banyak`, "banyak", b.banyak), tp(`l${i}-turus`, "turus", b.turus), tp(`l${i}-catatan`, "catatan", b.catatan)]);
export const KELOMPOK_LACI: Record<string, string> = {
  banyak: "Label ini banyak kotak. Tempelkan di kolom Banyak.",
  turus: "Label ini goresan turus. Tempelkan di kolom Turus.",
  catatan: "Label ini catatan hasil membandingkan. Tempelkan di kolom Catatan.",
};
export const SUARA_LACI = "Ini laci kartu peminjam di mobil pustaka, dari cerita kotak cerita berantakan. Tiap kartu satu jenis kotak. Tempelkan banyaknya, goresan turusnya, dan catatannya.";

/* ------------------------------ Simulasi: Misi Meja Pilah bagian satu ------------------------------ */
/** Benda di meja pilah (berbeda dari Story): pensil, gunting, klip. Pensil dan klip sama banyak. Sama dengan BENDA_SIM yang dipakai uji misi. */
export const SET_SIM = "alat";
export const JENIS_SIM = [0, 1, 2];
export const BENDA_SIM: readonly BendaSim[] = [
  ...[0, 1, 2, 3].map((n): BendaSim => ({ id: `p${n}`, jenis: 0 })),
  ...[0, 1].map((n): BendaSim => ({ id: `g${n}`, jenis: 1 })),
  ...[0, 1, 2, 3].map((n): BendaSim => ({ id: `k${n}`, jenis: 2 })),
];
/** Urutan benda di meja: bercampur. Indeks ke BENDA_SIM. */
export const URUT_MEJA = [4, 0, 7, 2, 5, 9, 1, 8, 3, 6];
export const MISI_MEJA =
  "Misi Meja Pilah bagian satu: pilah semua benda ke rak menurut jenisnya, hitung turus tiap rak, isi tabel lalu putar, dan bandingkan dua jenis. Urutannya bebas.";

/* ------------------------------ CPA: lanjutan Misi Meja Pilah ------------------------------ */
const turus = (set: string, isi: number[], j: number, benih = 1): LangkahDasar => ({ tipe: "turus", set, isi, j, benih });
const lingk = (set: string, isi: number[], tanya: Tanya, benih = 1, lingkari?: "terbanyak" | "tersedikit"): LangkahDasar => ({ tipe: "lingkaran", set, isi, tanya, benih, ...(lingkari ? { lingkari } : {}) });
const pasang = (set: string, isi: [number, number], angka: boolean, benih = 1): LangkahDasar => ({ tipe: "pasang", set, isi, angka, benih });
const tabel = (set: string, isi: number[], tanya: Tanya, benih = 1, lingkari?: "terbanyak" | "tersedikit"): LangkahDasar => ({ tipe: "tabel", set, isi, tanya, benih, ...(lingkari ? { lingkari } : {}) });
const jml: Tanya = { t: "jumlah" };
const salah = (dasar: LangkahDasar, tokoh: string, kataTokoh: string, jawabTokoh: number | undefined, alasan: [string, string, string], benar: number, keliru: string): LangkahSalah => ({
  tipe: "salah",
  dasar,
  tokoh,
  kataTokoh,
  ...(jawabTokoh === undefined ? {} : { jawabTokoh }),
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
      const d = l.tipe === "salah" ? l.dasar : l;
      const s = instruksi(l, rupa, cara, namaJenis(d.set, rupa));
      return { metode: metodeLangkah(l), cara, judul: s, suara: s, langkah: l };
    }),
  });

const C = kelompok("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Meja Pilah 2: kotak tumpah lagi", "Jalan berlubang lagi, dan benda di bak mobil bercampur. Bantu Igil memilah dan menghitungnya.", [
    salah(
      turus("buah", [7, 3, 5], 0, 3),
      "Igil",
      "Aku hitung langsung dari tumpukan yang masih campur. Apel ada delapan!",
      8,
      [
        "Igil benar, menghitung langsung dari tumpukan campur itu cepat dan tepat.",
        "Tumpukan masih campur, jadi ada yang terhitung dua kali. Pilah dulu menurut jenis, baru hitung.",
        "Apel paling banyak karena ada banyak jenis lain di tumpukan.",
      ],
      1,
      "Menghitung langsung dari tumpukan yang bercampur membuat satu apel terhitung dua kali. Pilah dulu menurut jenis, baru hitung.",
    ),
    lingk("serangga", [4, 2, 3], { t: "tersedikit" }, 5),
    pasang("stiker", [9, 4], false, 2),
    tabel("alat", [5, 2, 4], jml, 7),
  ]),
  C(3, "kanvas", "Misi Meja Pilah 3: catatan Kaka", "Kaka mencatat benda di bak mobil. Beri tanda atau lingkari, lalu tulis jawabanmu.", [
    turus("taman", [9, 3, 2], 0, 4),
    lingk("kendaraan", [7, 3, 2], jml, 2, "terbanyak"),
    pasang("ternak", [7, 4], false, 6),
    tabel("buah", [8, 4, 1], jml, 3, "tersedikit"),
  ]),
  C(4, "suara", "Misi Meja Pilah 4: panggilan Pak Pos", "Pak Pos bertanya dari kursi mobil. Jawab dengan suaramu.", [
    turus("serangga", [8, 3, 4], 0, 5),
    lingk("stiker", [6, 5, 3], jml, 4),
    pasang("kendaraan", [9, 8], true, 1),
    tabel("taman", [9, 4, 3], jml, 6),
  ]),
];

const P = kelompok("diagram");
export const PICTORIAL: SoalMisi[] = [
  P(5, "klik", "Misi Meja Pilah 5: kertas label", "Abang menggambar kartu data di kertas label dengan bentuk polos.", [
    turus("buah", [8, 3, 2], 0, 2),
    lingk("serangga", [3, 1, 4], { t: "tersedikit" }, 3),
    pasang("stiker", [7, 5], false, 4),
    salah(
      tabel("alat", [5, 4, 3], jml, 5),
      "Kaka",
      "Garis ke samping ini disebut kolom.",
      undefined,
      [
        "Kaka benar, garis ke samping memang kolom.",
        "Garis ke samping adalah baris. Garis ke bawah baru kolom.",
        "Garis ke samping adalah judul tabel.",
      ],
      1,
      "Garis ke samping adalah baris, bukan kolom. Garis ke bawah baru disebut kolom.",
    ),
  ]),
  P(6, "kanvas", "Misi Meja Pilah 6: lembar Kaka", "Kaka menggambar lembar data dengan bentuk polos. Beri tanda atau lingkari, lalu tulis jawabanmu.", [
    turus("taman", [7, 2, 3], 0, 6),
    lingk("kendaraan", [5, 4, 2], jml, 5, "terbanyak"),
    pasang("ternak", [7, 2], false, 7),
    tabel("buah", [9, 5, 3], jml, 8, "tersedikit"),
  ]),
  P(7, "suara", "Misi Meja Pilah 7: lapor ke Mamah", "Abang melaporkan lembar data kepada Mamah. Sebutkan jawabanmu.", [
    turus("serangga", [9, 4, 2], 0, 9),
    lingk("stiker", [6, 5, 3], jml, 2),
    pasang("alat", [8, 6], true, 3),
    tabel("taman", [7, 6, 3], jml, 4),
  ]),
];

const A = kelompok("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Meja Pilah 8: papan data kapur", "Papan data di mobil pustaka hanya berisi kata dan angka.", [
    turus("buah", [9, 2, 4], 0, 1),
    lingk("serangga", [8, 3, 2], { t: "terbanyak" }, 2),
    pasang("stiker", [6, 2], false, 3),
    salah(
      tabel("kendaraan", [9, 5, 3], jml, 4),
      "Igil",
      "Jumlah semuanya cukup dari dua jenis saja.",
      14,
      [
        "Igil benar, jumlah semuanya cukup dari dua jenis.",
        "Jumlah semuanya menjumlahkan semua jenis di tabel, tidak ada yang terlewat.",
        "Jumlah semuanya adalah jenis yang paling banyak.",
      ],
      1,
      "Jumlah semuanya harus memuat semua jenis. Dua jenis saja membuat satu jenis terlewat.",
    ),
  ]),
  A(9, "kanvas", "Misi Meja Pilah 9: tulis di papan", "Kaka meminta Igil menulis jawaban di kanvas.", [
    turus("taman", [7, 5, 2], 0, 5),
    lingk("kendaraan", [7, 3, 2], jml, 6),
    pasang("ternak", [8, 3], false, 7),
    tabel("buah", [8, 4, 1], jml, 8),
  ]),
  A(10, "suara", "Misi Meja Pilah 10: lapor kepada Pak Pos", "Laporan terakhir untuk Pak Pos. Bacakan jawabannya.", [
    turus("serangga", [2, 5, 4], 0, 9),
    lingk("stiker", [6, 5, 3], jml, 3),
    pasang("alat", [8, 7], true, 4),
    tabel("taman", [9, 4, 3], jml, 5),
  ]),
];

export const POIN_PENTING = [
  "Pilah dulu menurut jenis, baru hitung. Yang sejenis berkumpul, jadi tidak ada yang terlewat atau terhitung dua kali.",
  "Turus: satu benda, satu goresan. Setiap 5 goresan dicoret miring.",
  "Tabel punya judul, baris ke samping, dan kolom ke bawah. Tabel boleh menurun atau mendatar, isinya sama.",
  "Paling banyak, paling sedikit, dan sama banyak dibaca dari angka di tabel.",
  "Selisih: pasangkan satu-satu, benda yang tidak punya pasangan adalah selisihnya.",
  "Jumlah semuanya: jumlahkan semua jenis, jangan ada yang terlewat.",
];
/** Poin penting untuk suara (tanpa digit). */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => p.replace(/\d+/g, (d) => kata(Number(d))));

export const JEMBATAN = "Rak sudah rapi dan laporan selesai. Anak-anak kampung ingin tahu cerita mana yang paling disukai. Ayo lanjut ke Sub-Bab B untuk membuat diagram gambar.";
export const JEMBATAN_SUARA = "Rak sudah rapi dan laporan selesai. Anak-anak kampung ingin tahu cerita mana yang paling disukai. Ayo lanjut ke Sub-Bab B untuk membuat diagram gambar. Hebat!";

export const TEMA_TAHAP = {
  concrete: { ikon: "\u{1F69A}", nama: "Concrete", cara: "Lantai bak mobil pustaka: pilah benda berwarna, hitung turus, baca tabel" },
  pictorial: { ikon: "\u{1F4C4}", nama: "Pictorial", cara: "Kertas label putih: bentuk polos untuk dipilah, dihitung, dan dibaca" },
  abstract: { ikon: "\u{270F}\u{FE0F}", nama: "Abstract", cara: "Papan data kapur: kata dan angka saja, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_PUSTAKA, PICTORIAL as PICTORIAL_PUSTAKA, ABSTRACT as ABSTRACT_PUSTAKA, TEMA_TAHAP as TEMA_PUSTAKA, MISI_MEJA as MISI_MEJA_PUSTAKA };
