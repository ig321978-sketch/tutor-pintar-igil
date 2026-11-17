/**
 * Isi tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 8 Sub-Bab B "Cerita Kesukaan Anak Kampung",
 * akhir cerita Perpustakaan Keliling. Angka Story (lima, empat, dua, empat; jumlah lima belas; selisih tiga; sembilan dan sebelas) hanya dipakai
 * di Mind-map dan Infografis. Simulasi dan CPA memakai topik dan bilangan lain dan melanjutkan "Misi Papan Survei".
 * Diuji: scripts/uji-survei-k1b8b.mjs.
 */
import type { Cacat, Cara, Kegiatan, Langkah, LangkahDiagram, LangkahSalah, LangkahSoal, Metode, Rupa, SoalMisi, Tanya, Tempat } from "./logika";
import { instruksi, metodeLangkah } from "./logika";

const tp = (id: string, kelompok: string, kunci: string, urutan?: number): Tempat => (urutan === undefined ? { id, kelompok, kunci } : { id, kelompok, kunci, urutan });

/* ------------------------------ Mind-map: lembar centang (hanya poin pelajaran) ------------------------------ */
export const PUSAT_LEMBAR = "Mengenal diagram gambar";
export const KELOMPOK_LEMBAR: Record<string, { nama: string; letak: string; ikon: string; isi: string; garis: string; petunjuk: string }> = {
  masalah: { nama: "Masalah", letak: "Kepala lembar", ikon: "\u{1F4CB}", isi: "#FDE68A", garis: "#A16207", petunjuk: "Label ini kuning. Tempelkan di kepala lembar." },
  metode: { nama: "Penyelesaian", letak: "Baris bernomor", ikon: "\u{2705}", isi: "#BBF7D0", garis: "#15803D", petunjuk: "Label ini hijau. Tempelkan di baris yang nomornya pas." },
  hasil: { nama: "Hasil", letak: "Cap hasil", ikon: "\u{1F4CC}", isi: "#FBCFE8", garis: "#BE185D", petunjuk: "Label ini merah jambu. Tempelkan di cap hasil." },
};
export const TEMPAT_LEMBAR: Tempat[] = [
  tp("ms-1", "masalah", "Hanya bisa memilih satu jenis"),
  tp("ms-2", "masalah", "Salah pilih, anak kecewa"),
  tp("ms-3", "masalah", "Gambar renggang menipu mata"),
  tp("br-1", "metode", "Satu anak, satu jawaban", 1),
  tp("br-2", "metode", "Catat dengan lembar centang", 2),
  tp("br-3", "metode", "Isi tabel dari centang", 3),
  tp("br-4", "metode", "Diagram gambar yang rapat", 4),
  tp("br-5", "metode", "Diagram Balok", 5),
  tp("br-6", "metode", "Diagram Titik", 6),
  tp("br-7", "metode", "Diagram Batang", 7),
  tp("hs-1", "hasil", "Kolom tertinggi paling banyak"),
  tp("hs-2", "hasil", "Selisih: kurangi besar dengan kecil"),
  tp("hs-3", "hasil", "Jumlah semua: tambah semua kolom"),
  tp("hs-4", "hasil", "Keputusan dari membaca diagram"),
];
export const PETUNJUK_URUT_LEMBAR = "Warnanya sudah benar. Nomor barisnya belum pas. Langkah mana yang lebih dulu?";
export const SUARA_LEMBAR =
  "Ini lembar centang di papan jepit. Kepala lembar berisi masalah. Tujuh baris bernomor berisi langkah yang berurutan, ikuti nomornya dari awal sampai akhir. Cap di bawah berisi hasil. Ketuk label, lalu ketuk tempat yang cocok.";

/* ------------------------------ Infografis: papan jepit Pak Pos ------------------------------ */
export const KOLOM_PAPAN = ["Bilangan", "Hasil", "Catatan"] as const;
export const BARIS_PAPAN: { ikon: string; nama: string; bilangan: string; hasil: string; catatan: string }[] = [
  { ikon: "\u{1F4CB}", nama: "Lembar centang", bilangan: "5, 4, 2, 4", hasil: "tabel jawaban", catatan: "satu anak, satu jawaban" },
  { ikon: "\u{2B50}", nama: "Bintang renggang", bilangan: "robot 4 bintang", hasil: "kolom tampak lebih tinggi", catatan: "rapat dari garis bawah" },
  { ikon: "\u{1F91D}", nama: "Sama banyak", bilangan: "robot 4, sirkus 4", hasil: "sama banyak", catatan: "kolom sama tinggi" },
  { ikon: "\u{2796}", nama: "Selisih", bilangan: "5 – 2 = 3", hasil: "lebih banyak 3", catatan: "kurangi besar dengan kecil" },
  { ikon: "\u{1F522}", nama: "Jumlah semua", bilangan: "5 + 4 + 2 + 4", hasil: "15 anak", catatan: "tambah semua kolom" },
];
export const TEMPAT_PAPAN: Tempat[] = BARIS_PAPAN.flatMap((b, i) => [tp(`p${i}-bilangan`, "bilangan", b.bilangan), tp(`p${i}-hasil`, "hasil", b.hasil), tp(`p${i}-catatan`, "catatan", b.catatan)]);
export const KELOMPOK_PAPAN: Record<string, string> = {
  bilangan: "Label ini bilangan dari tabel atau diagram. Tempelkan di kolom Bilangan.",
  hasil: "Label ini hasil atau kesimpulan. Tempelkan di kolom Hasil.",
  catatan: "Label ini catatan caranya. Tempelkan di kolom Catatan.",
};
export const SUARA_PAPAN = "Ini papan jepit Pak Pos, dari cerita survei. Tiap baris satu hal yang dicatat. Tempelkan bilangannya, hasilnya, dan catatannya.";

/* ------------------------------ Simulasi: Misi Papan Survei ------------------------------ */
export const MISI_SURVEI =
  "Misi Papan Survei: tanyai anak-anak di antrean satu per satu dan centang jawabannya, lihat tabelnya, buat diagram gambar yang rapat, bandingkan dua kolom, lalu kirim laporan survei kepada Pak Pos.";

/* ------------------------------ CPA: lanjutan Misi Papan Survei ------------------------------ */
const bn = (k: number): Tanya => ({ j: "banyak", k });
const sl = (a: number, b: number): Tanya => ({ j: "selisih", a, b });
const JUM: Tanya = { j: "jumlah" };
const pl = (arah: "banyak" | "sedikit"): Tanya => ({ j: "paling", arah });
const dg = (bentuk: Metode, topik: number, data: number[], tanya: Tanya, kegiatan: Kegiatan = "ketuk", cacat?: Cacat): LangkahDiagram => ({ tipe: "diagram", bentuk, topik, data, tanya, kegiatan, ...(cacat ? { cacat } : {}) });
const salah = (dasar: LangkahDiagram, tokoh: string, jawabTokoh: number, kataTokoh: string, alasan: [string, string, string], benar: number, keliru: string): LangkahSalah => ({
  tipe: "salah",
  dasar,
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
      const s = instruksi(l, rupa, cara);
      return { metode: metodeLangkah(l), cara, judul: s, suara: s, langkah: l };
    }),
  });

const C = kelompok("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Papan Survei 2: antrean di mobil pustaka", "Anak-anak kampung antre memilih. Bantu Pak Pos memeriksa catatannya dengan benda di lantai mobil.", [
    salah(
      dg("igil", 0, [5, 6, 3, 2], JUM, "ketuk", { j: "dobel", k: 1 }),
      "Igil",
      17,
      "Semua gambar yang kulihat kuhitung satu per satu.",
      [
        "Satu anak hanya boleh satu jawaban. Satu gambar kelebihan, jadi centang gandanya tidak ikut dihitung.",
        "Igil benar, semua gambar harus dihitung walau ada yang ganda.",
        "Banyak anak tidak perlu sama dengan banyak centang.",
      ],
      0,
      "Satu anak mencentang dua jawaban, jadi ada satu gambar kelebihan. Gambar ganda itu tidak boleh ikut dihitung.",
    ),
    dg("balok", 1, [7, 2, 6, 3], bn(0), "susun"),
    dg("titik", 2, [8, 2, 3, 1], sl(0, 1)),
    dg("batang", 3, [6, 2, 4, 1], JUM),
  ]),
  C(3, "kanvas", "Misi Papan Survei 3: catatan Kaka", "Kaka mencatat pilihan anak-anak. Beri tanda atau lingkari, lalu tulis jawabanmu.", [
    dg("igil", 4, [3, 8, 1, 2], bn(1)),
    dg("balok", 0, [4, 1, 6, 1], JUM),
    dg("titik", 1, [5, 6, 2, 3], sl(0, 1)),
    dg("batang", 2, [3, 8, 1, 5], pl("banyak")),
  ]),
  C(4, "suara", "Misi Papan Survei 4: panggilan Mamah", "Mamah bertanya dari halaman. Jawab dengan suaramu.", [
    dg("igil", 3, [5, 1, 7, 1], JUM),
    dg("balok", 4, [4, 2, 1, 3], JUM),
    dg("titik", 0, [7, 2, 8, 1], JUM),
    dg("batang", 1, [1, 2, 9, 4], bn(2)),
  ]),
];

const P = kelompok("diagram");
export const PICTORIAL: SoalMisi[] = [
  P(5, "klik", "Misi Papan Survei 5: kertas diagram", "Abang menggambar diagram di kertas putih. Hitung dengan gambar polos.", [
    salah(
      dg("igil", 0, [7, 6, 3, 1], bn(1), "ketuk", { j: "renggang", k: 1, tinggi: 8 }),
      "Igil",
      8,
      "Kolom ayam setinggi angka delapan di samping, jadi ada delapan gambar.",
      [
        "Gambarnya direnggangkan, jadi kolom tampak tinggi. Yang dihitung banyak gambarnya, bukan tinggi kolomnya.",
        "Igil benar, tinggi kolom sama dengan banyak gambar walau renggang.",
        "Angka di samping tidak perlu dibaca.",
      ],
      0,
      "Igil membaca tinggi kolom, padahal gambarnya direnggangkan. Hitung banyak gambarnya satu per satu.",
    ),
    dg("balok", 1, [6, 3, 7, 1], JUM, "susun"),
    dg("titik", 2, [6, 5, 2, 3], sl(0, 1)),
    dg("batang", 3, [2, 9, 3, 1], bn(1)),
  ]),
  P(6, "kanvas", "Misi Papan Survei 6: kertas Kaka", "Kaka menggambar kolom dan batang polos. Beri tanda atau lingkari, lalu tulis jawabanmu.", [
    dg("igil", 4, [3, 4, 5, 2], JUM),
    dg("balok", 0, [2, 5, 7, 1], bn(2)),
    dg("titik", 1, [4, 7, 1, 3], pl("sedikit")),
    dg("batang", 2, [3, 2, 6, 1], JUM),
  ]),
  P(7, "suara", "Misi Papan Survei 7: laporan untuk Pak Pos", "Abang melaporkan hasil diagram kepada Pak Pos. Sebutkan jawabanmu.", [
    dg("igil", 3, [9, 3, 1, 2], sl(0, 2)),
    dg("balok", 4, [3, 2, 1, 4], JUM),
    dg("titik", 0, [6, 2, 8, 2], JUM),
    dg("batang", 1, [2, 6, 4, 1], JUM),
  ]),
];

const A = kelompok("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Papan Survei 8: papan kapur spanduk", "Catatan untuk spanduk Perpustakaan Keliling hanya berisi kata dan angka.", [
    salah(
      dg("igil", 1, [9, 2, 3, 1], sl(0, 1)),
      "Abang",
      11,
      "Apel sembilan dan jeruk dua, jadi selisihnya sebelas.",
      [
        "Selisih adalah beda dua bilangan, jadi bilangan yang besar dikurangi yang kecil. Sebelas itu jumlahnya.",
        "Abang benar, selisih adalah dua bilangan ditambahkan.",
        "Selisih sama dengan bilangan yang paling besar.",
      ],
      0,
      "Abang menjumlahkan dua kolom, padahal selisih adalah bilangan besar dikurangi bilangan kecil.",
    ),
    dg("balok", 0, [5, 6, 3, 2], JUM),
    dg("titik", 2, [2, 6, 3, 1], bn(1)),
    dg("batang", 3, [6, 5, 2, 3], sl(0, 1)),
  ]),
  A(9, "kanvas", "Misi Papan Survei 9: tulis di spanduk", "Kaka meminta Igil menulis angka di kanvas.", [
    dg("igil", 4, [3, 2, 6, 1], JUM),
    dg("balok", 1, [4, 2, 1, 3], JUM),
    dg("titik", 0, [3, 8, 1, 5], pl("banyak")),
    dg("batang", 2, [6, 3, 7, 1], JUM),
  ]),
  A(10, "suara", "Misi Papan Survei 10: spanduk selesai", "Spanduk hampir selesai. Bacakan jawaban terakhir untuk Pak Pos.", [
    dg("igil", 3, [1, 2, 9, 4], bn(2)),
    dg("balok", 4, [5, 1, 7, 1], JUM),
    dg("titik", 2, [9, 3, 1, 2], sl(0, 2)),
    dg("batang", 1, [7, 2, 8, 1], JUM),
  ]),
];

export const POIN_PENTING = [
  "Tanya satu anak satu jawaban, lalu catat dengan lembar centang. Satu anak hanya satu centang.",
  "Hitung centang ke dalam tabel. Jumlah semua harus sama dengan banyak anak yang ditanya.",
  "Diagram gambar: gambar sama besar, rapat, dan mulai dari garis bawah. Yang dihitung banyak gambarnya, bukan tinggi kolomnya.",
  "Kolom paling tinggi paling banyak, paling pendek paling sedikit, sama tinggi sama banyak. Selisih: kurangi yang besar dengan yang kecil.",
  "Jumlah semua: tambah semua kolom. Beri judul dan nama pada tiap kolom, lalu pilih diagram balok, titik, atau batang sesuai datanya.",
];
/** Poin penting untuk suara (tanpa digit). */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => p);

export const PERAYAAN = "Hebat! Dinosaurus dipesan, laporan survei lengkap, dan spanduk Perpustakaan Keliling dikibarkan. Cerita Perpustakaan Keliling selesai.";
export const PERAYAAN_SUARA = "Hebat! Dinosaurus dipesan, laporan survei lengkap, dan spanduk Perpustakaan Keliling dikibarkan. Cerita Perpustakaan Keliling selesai. Sampai jumpa di bab berikutnya!";

export const TEMA_TAHAP = {
  concrete: { ikon: "\u{1F69A}", nama: "Concrete", cara: "Benda bergambar di lantai mobil pustaka: susun, ketuk, dan ucapkan" },
  pictorial: { ikon: "\u{1F4CB}", nama: "Pictorial", cara: "Diagram polos di kertas putih: tandai, ketuk, dan ucapkan" },
  abstract: { ikon: "\u{1F389}", nama: "Abstract", cara: "Kata dan angka saja: pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_SURVEI, PICTORIAL as PICTORIAL_SURVEI, ABSTRACT as ABSTRACT_SURVEI, TEMA_TAHAP as TEMA_SURVEI };
