/**
 * Isi tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 2 Bab 2 Sub-Bab B "Rak Seragam Diserbu", tengah cerita
 * Toko Seragam dan Alat Tulis Sekolah. Angka Story (tujuh belas topi dan dua belas dasi, sembilan belas penggaris terjual empat, dua belas kotak pensil
 * terjual delapan) hanya dipakai di Mind-map dan Infografis. Simulasi dan CPA memakai bilangan lain dan melanjutkan "Misi Meja Stok". Bilangan paling besar dua puluh.
 * Diuji: scripts/uji-stok-k2b2b.mjs.
 */
import type { Langkah, LangkahDasar, LangkahSalah, LangkahSoal, Rupa, SoalMisi, TanyaKeluarga, Tempat } from "./logika";
import { instruksi, kata, metodeLangkah } from "./logika";
import type { Cara } from "./logika";

const tp = (id: string, kelompok: string, kunci: string, urutan?: number): Tempat => (urutan === undefined ? { id, kelompok, kunci } : { id, kelompok, kunci, urutan });

/* ------------------------------ Gambar barang (Concrete) ------------------------------ */
export type SetBarang = { id: string; nama: string; emoji: string; warna: string };
/** Barang koperasi untuk Concrete (emoji berwarna). Pictorial memakai titik dan bingkai polos. */
export const SETS: Record<string, SetBarang> = {
  topi: { id: "topi", nama: "topi", emoji: "\u{1F9E2}", warna: "#FECACA" },
  baju: { id: "baju", nama: "baju olahraga", emoji: "\u{1F455}", warna: "#BFDBFE" },
  pensil: { id: "pensil", nama: "pensil", emoji: "\u{270F}\u{FE0F}", warna: "#FDE68A" },
  penggaris: { id: "penggaris", nama: "penggaris", emoji: "\u{1F4CF}", warna: "#BBF7D0" },
  tas: { id: "tas", nama: "tas", emoji: "\u{1F392}", warna: "#E9D5FF" },
  kaus: { id: "kaus", nama: "kaus kaki", emoji: "\u{1F9E6}", warna: "#FED7AA" },
  sepatu: { id: "sepatu", nama: "sepatu", emoji: "\u{1F45F}", warna: "#CFFAFE" },
};

/* ------------------------------ Mind-map: papan gabus kartu stok (hanya poin pelajaran) ------------------------------ */
export const PUSAT_PAPAN = "Berbagai cara pengurangan";
export const KELOMPOK_PAPAN: Record<string, { nama: string; letak: string; ikon: string; isi: string; garis: string; petunjuk: string }> = {
  masalah: { nama: "Masalah", letak: "Deret bawah", ikon: "\u{1F6A7}", isi: "#FDE68A", garis: "#A16207", petunjuk: "Kartu ini kuning. Paku di deret bawah, tempat masalah." },
  metode: { nama: "Penyelesaian", letak: "Deret tengah", ikon: "\u{1F4CB}", isi: "#BFDBFE", garis: "#1D4ED8", petunjuk: "Kartu ini biru. Paku di paku bernomor yang pas." },
  hasil: { nama: "Hasil", letak: "Deret atas", ikon: "\u{1F3C6}", isi: "#BBF7D0", garis: "#15803D", petunjuk: "Kartu ini hijau. Paku di deret atas, tempat hasil." },
};
export const TEMPAT_PAPAN: Tempat[] = [
  tp("pm-1", "masalah", "Selisih dihitung dengan menjumlahkan"),
  tp("pm-2", "masalah", "Bilangan kecil dibalik dengan yang besar"),
  tp("pm-3", "masalah", "Hasil tidak diperiksa lagi"),
  tp("pp-1", "metode", "Pasangkan satu-satu untuk mencari selisih", 1),
  tp("pp-2", "metode", "Mundur, bersusun, atau pasangan bilangan", 2),
  tp("pp-3", "metode", "Buka satu puluhan jika satuan kurang", 3),
  tp("pp-4", "metode", "Periksa dengan penjumlahan", 4),
  tp("pp-5", "metode", "Berpikir Penjumlahan", 5),
  tp("pp-6", "metode", "Keluarga Bilangan", 6),
  tp("pp-7", "metode", "Kurangi dari Sepuluh", 7),
  tp("ph-1", "hasil", "Selisih adalah beda banyaknya"),
  tp("ph-2", "hasil", "Hasil cocok dengan penjumlahan"),
  tp("ph-3", "hasil", "Satuan kurang berarti buka puluhan"),
  tp("ph-4", "hasil", "Cara dipilih sesuai bilangannya"),
];
export const PETUNJUK_URUT_PAPAN = "Warnanya sudah benar. Nomor pakunya belum pas. Langkah mana yang lebih dulu?";
export const SUARA_PAPAN =
  "Ini papan gabus koperasi. Deret bawah berisi masalah. Deret tengah punya tujuh paku bernomor berisi langkah yang berurutan, ikuti nomornya dari satu sampai tujuh. Deret atas berisi hasil. Ketuk kartu, lalu ketuk tempat yang cocok.";

/* ------------------------------ Infografis: lembar stok berklip ------------------------------ */
export const KOLOM_LEMBAR = ["Awal", "Dikurangi", "Hasil"] as const;
export const BARIS_LEMBAR: { nama: string; awal: string; kurang: string; hasil: string }[] = [
  { nama: "Penggaris", awal: "19 penggaris", kurang: "4 terjual", hasil: "15 sisa" },
  { nama: "Kotak pensil warna", awal: "12 kotak", kurang: "8 terjual", hasil: "4 sisa" },
  { nama: "Topi dan dasi", awal: "17 topi", kurang: "12 dasi", hasil: "5 selisih" },
];
export const KUNCI_KOLOM = ["awal", "kurang", "hasil"] as const;
export const TEMPAT_LEMBAR: Tempat[] = BARIS_LEMBAR.flatMap((b, i) => KUNCI_KOLOM.map((kol) => tp(`s${i}-${kol}`, kol, b[kol])));
export const KELOMPOK_LEMBAR: Record<string, string> = {
  awal: "Label ini banyak barang di awal. Taruh di kolom Awal.",
  kurang: "Label ini yang dikurangkan, terjual atau dibandingkan. Taruh di kolom Dikurangi.",
  hasil: "Label ini hasil pengurangan. Taruh di kolom Hasil.",
};
export const SUARA_LEMBAR = "Ini lembar stok koperasi, dari cerita rak seragam diserbu. Tiap baris satu barang. Taruh banyak awalnya, yang dikurangkan, dan hasilnya di kolom yang pas.";

/* ------------------------------ Simulasi: Misi Meja Stok bagian satu ------------------------------ */
export const MISI_STOK =
  "Misi Meja Stok bagian satu: pasangkan barang untuk mencari selisih, kurangi stok, buka satu puluhan saat satuan tidak cukup, lalu periksa dengan penjumlahan. Urutannya bebas.";

/* ------------------------------ CPA: lanjutan Misi Meja Stok ------------------------------ */
const susun = (set: string, a: number, b: number, benih = 1): LangkahDasar => ({ tipe: "susun", set, a, b, benih });
const pikir = (set: string, a: number, b: number, benih = 1): LangkahDasar => ({ tipe: "pikir", set, a, b, benih });
const keluarga = (set: string, x: number, y: number, tanya: TanyaKeluarga, benih = 1): LangkahDasar => ({ tipe: "keluarga", set, x, y, tanya, benih });
const sepuluh = (set: string, a: number, b: number, benih = 1): LangkahDasar => ({ tipe: "sepuluh", set, a, b, benih });
const banding = (set: string, a: number, b: number, benih = 1): LangkahDasar => ({ tipe: "banding", set, a, b, benih });
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
      const s = instruksi(l, rupa, cara);
      return { metode: metodeLangkah(l), cara, judul: s, suara: s, langkah: l };
    }),
  });

const C = kelompok("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Meja Stok 2: rak baru dibuka", "Bu Sari membuka rak yang baru diisi. Bantu Chacha dan Dika mencocokkan stok.", [
    salah(
      susun("baju", 13, 6),
      "Chacha",
      "Baju olahraga tiga belas, enam sudah terjual. Tiga belas ditambah enam, jadi sisanya sembilan belas.",
      19,
      [
        "Chacha benar, baju yang terjual menambah isi rak.",
        "Baju yang terjual itu diambil dari rak, jadi dikurangkan, bukan ditambahkan.",
        "Sisa baju dihitung dari yang terjual saja.",
      ],
      1,
      "Baju yang terjual itu berkurang dari rak. Tiga belas dikurangi enam sama dengan tujuh.",
    ),
    pikir("topi", 17, 8),
    keluarga("pensil", 5, 13, "kalimat"),
    banding("penggaris", 16, 9),
  ]),
  C(3, "kanvas", "Misi Meja Stok 3: catatan Dika", "Dika mencatat stok di papan gabus. Ketuk dulu kegiatannya, lalu tulis jawabanmu.", [
    susun("tas", 12, 9),
    pikir("kaus", 19, 11),
    keluarga("sepatu", 9, 11, "kurang"),
    sepuluh("baju", 19, 9),
  ]),
  C(4, "suara", "Misi Meja Stok 4: panggilan Bu Sari", "Bu Sari bertanya dari balik kasir. Jawab dengan suaramu.", [
    susun("topi", 20, 4),
    pikir("pensil", 18, 5),
    keluarga("penggaris", 8, 11, "tambah"),
    sepuluh("tas", 11, 9),
  ]),
];

const P = kelompok("diagram");
export const PICTORIAL: SoalMisi[] = [
  P(5, "klik", "Misi Meja Stok 5: kertas cetak biru", "Nia menggambar rak dengan bingkai dan titik polos.", [
    salah(
      susun("topi", 17, 9),
      "Nia",
      "Tujuh kurang dari sembilan, jadi aku balik: sembilan dikurangi tujuh sama dengan dua.",
      2,
      [
        "Nia benar, bilangan kecil boleh dibalik dengan bilangan besar.",
        "Satuan tujuh tidak cukup. Buka satu puluhan jadi sepuluh satuan, baru kurangi sembilan.",
        "Puluhan harus dikurangi lebih dulu daripada satuan.",
      ],
      1,
      "Satuan yang kecil tidak boleh dibalik dengan yang besar. Buka satu puluhan, lalu tujuh belas dikurangi sembilan sama dengan delapan.",
    ),
    pikir("topi", 20, 13),
    keluarga("topi", 7, 12, "kalimat"),
    banding("topi", 17, 2),
  ]),
  P(6, "kanvas", "Misi Meja Stok 6: lembar Nia", "Nia mengisi lembar stok. Ketuk dulu kegiatannya, lalu tulis jawabanmu.", [
    susun("topi", 15, 6),
    pikir("topi", 18, 7),
    keluarga("topi", 3, 16, "kurang"),
    sepuluh("topi", 12, 9),
  ]),
  P(7, "suara", "Misi Meja Stok 7: lapor ke Bu Sari", "Nia melaporkan lembar stok kepada Bu Sari. Sebutkan jawabanmu.", [
    susun("topi", 20, 7),
    pikir("topi", 12, 11),
    keluarga("topi", 9, 11, "tambah"),
    sepuluh("topi", 19, 9),
  ]),
];

const A = kelompok("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Meja Stok 8: slip stok", "Slip stok koperasi hanya berisi kata dan angka.", [
    salah(
      susun("topi", 18, 9),
      "Chacha",
      "Delapan belas dikurangi sembilan sama dengan delapan.",
      8,
      [
        "Chacha benar, delapan memang hasil pengurangannya.",
        "Delapan ditambah sembilan sama dengan tujuh belas, bukan delapan belas, jadi hasilnya belum cocok saat diperiksa.",
        "Sembilan dikurangi delapan sama dengan satu, jadi hasilnya satu.",
      ],
      1,
      "Saat diperiksa, delapan ditambah sembilan sama dengan tujuh belas, bukan delapan belas. Jawaban yang benar adalah sembilan.",
    ),
    pikir("topi", 16, 13),
    keluarga("topi", 6, 10, "kalimat"),
    banding("topi", 19, 9),
  ]),
  A(9, "kanvas", "Misi Meja Stok 9: tulis di slip", "Dika meminta Chacha menulis jawaban di kanvas.", [
    susun("topi", 16, 5),
    pikir("topi", 20, 2),
    keluarga("topi", 7, 10, "kurang"),
    sepuluh("topi", 17, 9),
  ]),
  A(10, "suara", "Misi Meja Stok 10: lapor terakhir", "Laporan terakhir untuk Bu Sari. Bacakan jawabannya.", [
    susun("topi", 20, 3),
    pikir("topi", 14, 13),
    keluarga("topi", 2, 17, "kurang2"),
    sepuluh("topi", 16, 9),
  ]),
];

export const POIN_PENTING = [
  "Selisih berarti beda banyaknya. Pasangkan satu-satu: yang tidak berpasangan adalah selisihnya.",
  "Mengurangi sampai 20 bisa dengan mundur, bersusun puluhan dan satuan, atau pasangan bilangan.",
  "Kalau satuan atas kurang, buka satu puluhan menjadi sepuluh satuan. Bilangan kecil tidak boleh dibalik dengan bilangan besar.",
  "Periksa pengurangan dengan penjumlahan: 13 − 6 = 7 karena 7 + 6 = 13.",
  "Think Addition (Berpikir Penjumlahan): 16 − 9 = ? sama dengan 9 + ? = 16.",
  "Fact Family (Keluarga Bilangan): tiga bilangan membentuk dua penjumlahan dan dua pengurangan.",
  "Subtract from Ten (Kurangi dari Sepuluh): 14 − 8, sepuluh dikurangi 8 sama dengan 2, lalu 2 + 4 = 6.",
];
/** Poin penting untuk suara (tanpa digit dan tanpa lambang). */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) =>
  p
    .replace(/\d+/g, (d) => kata(Number(d)))
    .replace(/ = /g, " sama dengan ")
    .replace(/ − /g, " dikurangi ")
    .replace(/ \+ /g, " ditambah ")
    .replace(/\?/g, "berapa"),
);

export const JEMBATAN = "Kartu stok cocok dengan isi rak dan topi merah putih sudah kembali. Besok ada pesanan besar untuk pembukaan koperasi. Ayo lanjut ke Sub-Bab C untuk membuat cerita hitungan.";
export const JEMBATAN_SUARA = `${JEMBATAN} Hebat!`;

export const TEMA_STOK = {
  concrete: { ikon: "\u{1F4CC}", nama: "Concrete", cara: "Papan gabus koperasi: kartu stok berpaku, barang berwarna, dan ikat sepuluh" },
  pictorial: { ikon: "\u{1F4D0}", nama: "Pictorial", cara: "Kertas cetak biru: bingkai, titik, dan jalur polos" },
  abstract: { ikon: "\u{1F9FE}", nama: "Abstract", cara: "Slip stok berklip: kata dan angka saja" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_STOK, PICTORIAL as PICTORIAL_STOK, ABSTRACT as ABSTRACT_STOK };
