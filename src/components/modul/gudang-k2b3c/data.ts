/**
 * Isi tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 2 Bab 3 Sub-Bab C "Gudang Mainan Pak Rudi" (bangun ruang),
 * akhir cerita Taman Bermain Sekolah. Data Story (bola, kardus, kaleng, dadu, topi pesta, kelereng, kotak pensil; enam permukaan kubus dan balok)
 * hanya dipakai di Mind-map dan Infografis. Simulasi dan CPA memakai benda dan angka lain, melanjutkan "Misi Gudang Mainan".
 * Diuji: scripts/uji-gudang-k2b3c.mjs.
 */
import type { Cara, Langkah, LangkahBS, LangkahCetak, LangkahHitung, LangkahNama, LangkahPilah, LangkahSalah, LangkahSoal, LangkahTabel, LangkahUrut, Metode, Rupa, SoalMisi, Tempat } from "./logika";
import { BENDA_SIM, instruksi, metodeLangkah } from "./logika";
import type { Bangun } from "./logika";

const tp = (id: string, kelompok: string, kunci: string, urutan?: number): Tempat => (urutan === undefined ? { id, kelompok, kunci } : { id, kelompok, kunci, urutan });

/* ------------------------------ Mind-map: rak mainan bernama (hanya poin pelajaran) ------------------------------ */
export const PUSAT_RAK = "Bangun ruang";
export const KELOMPOK_RAK: Record<string, { nama: string; letak: string; ikon: string; isi: string; garis: string; petunjuk: string }> = {
  masalah: { nama: "Masalah", letak: "Rak bawah", ikon: "\u{1F6A7}", isi: "#FDE68A", garis: "#A16207", petunjuk: "Papan ini kuning. Pasang di rak bawah, tempat masalah." },
  metode: { nama: "Penyelesaian", letak: "Rak tengah", ikon: "\u{1F4CB}", isi: "#BFDBFE", garis: "#1D4ED8", petunjuk: "Papan ini biru. Pasang di petak bernomor yang pas." },
  hasil: { nama: "Hasil", letak: "Rak atas", ikon: "\u{1F3C6}", isi: "#BBF7D0", garis: "#15803D", petunjuk: "Papan ini hijau. Pasang di rak atas, tempat hasil." },
};
export const TEMPAT_RAK: Tempat[] = [
  tp("rk-m1", "masalah", "Benda bercampur, rak belum jelas"),
  tp("rk-m2", "masalah", "Benda menggelinding dan roboh"),
  tp("rk-m3", "masalah", "Bentuk mirip sulit dibedakan"),
  tp("rk-p1", "metode", "Tanya: bisa diisi?", 1),
  tp("rk-p2", "metode", "Tanya: menggelinding?", 2),
  tp("rk-p3", "metode", "Kubus dan balok: datar semua", 3),
  tp("rk-p4", "metode", "Tabung, kerucut, bola: ada lengkung", 4),
  tp("rk-p5", "metode", "Tas Misteri: raba ciri", 5),
  tp("rk-p6", "metode", "Cetak Permukaan: bangun datar", 6),
  tp("rk-p7", "metode", "Pandangan Atas dan Samping", 7),
  tp("rk-h1", "hasil", "Bisa diisi: bangun ruang"),
  tp("rk-h2", "hasil", "Datar diam, lengkung menggelinding"),
  tp("rk-h3", "hasil", "Lima nama bangun ruang"),
  tp("rk-h4", "hasil", "Benda di rak yang tepat"),
];
export const PETUNJUK_URUT_RAK = "Warnanya sudah benar. Nomor papannya belum pas. Langkah mana yang lebih dulu?";
export const SUARA_RAK =
  "Ini rak mainan bernama. Rak bawah berisi masalah. Rak tengah punya tujuh papan bernomor berisi langkah yang berurutan, ikuti nomornya dari satu sampai tujuh. Rak atas berisi hasil. Ketuk papan, lalu ketuk tempat yang cocok.";

/* ------------------------------ Infografis: papan catatan ------------------------------ */
export const KOLOM_CATATAN = ["Benda", "Permukaan", "Ciri"] as const;
export const BARIS_CATATAN: { ikon: string; nama: string; benda: string; muka: string; ciri: string }[] = [
  { ikon: "\u{1F3B2}", nama: "Kubus", benda: "dadu", muka: "6 datar sama besar", ciri: "segi empat sama" },
  { ikon: "\u{270F}\u{FE0F}", nama: "Balok", benda: "kotak pensil", muka: "6 datar beda ukuran", ciri: "segi empat panjang" },
  { ikon: "\u{1F96B}", nama: "Tabung", benda: "kaleng", muka: "2 datar, 1 lengkung", ciri: "dua lingkaran" },
  { ikon: "\u{1F389}", nama: "Kerucut", benda: "topi pesta", muka: "1 datar, 1 lengkung", ciri: "ujungnya runcing" },
  { ikon: "\u{1F52E}", nama: "Bola", benda: "kelereng", muka: "lengkung saja", ciri: "tidak punya datar" },
];
export const TEMPAT_CATATAN: Tempat[] = BARIS_CATATAN.flatMap((b, i) => [tp(`c${i}-benda`, "benda", b.benda), tp(`c${i}-muka`, "muka", b.muka), tp(`c${i}-ciri`, "ciri", b.ciri)]);
export const KELOMPOK_CATATAN: Record<string, string> = {
  benda: "Label ini nama benda. Tempelkan di kolom Benda.",
  muka: "Label ini banyak permukaan. Tempelkan di kolom Permukaan.",
  ciri: "Label ini ciri khas. Tempelkan di kolom Ciri.",
};
export const SUARA_CATATAN = "Ini papan catatan Dika, dari cerita gudang mainan Pak Rudi. Tiap baris satu bangun ruang. Tempelkan bendanya, permukaannya, dan ciri khasnya.";

/* ------------------------------ Simulasi: Misi Gudang Mainan bagian satu ------------------------------ */
export const MISI_GUDANG =
  "Misi Gudang Mainan bagian satu: gelindingkan benda di papan lereng, tata benda ke rak datar atau wadah berpagar, lalu cetak permukaan benda di kertas. Urutannya bebas.";

/* ------------------------------ CPA: lanjutan Misi Gudang Mainan ------------------------------ */
const pil = (pasang: LangkahPilah["pasang"], isi: string[]): LangkahPilah => ({ tipe: "pilah", pasang, isi, metode: "igil" });
const nam = (metode: Metode, petunjuk: LangkahNama["petunjuk"], bangun: Bangun): LangkahNama => ({ tipe: "nama", petunjuk, bangun, metode });
const cet = (hasil: LangkahCetak["hasil"], pilihan: Bangun[]): LangkahCetak => ({ tipe: "cetakPilih", hasil, pilihan, metode: "cetak" });
const urt = (metode: Metode, langkah: LangkahUrut["langkah"]): LangkahUrut => ({ tipe: "urut", metode, langkah });
const bs = (bangun: Bangun, pernyataan: string, benar: boolean, keliru: string): LangkahBS => ({ tipe: "bs", metode: "pandang", bangun, pernyataan, benar, keliru });
const tab = (jenis: LangkahTabel["jenis"], baris: Bangun[]): LangkahTabel => ({ tipe: "tabel", metode: "pandang", jenis, baris });
const hit = (metode: Metode, kriteria: "ruang" | "gelinding" | "datarSaja", isi: string[]): LangkahHitung => ({ tipe: "hitung", dari: "daftar", metode, kriteria, isi });
const muka = (metode: Metode, bangun: Bangun, jenis: "datar" | "lengkung" | "semua"): LangkahHitung => ({ tipe: "hitung", dari: "muka", metode, bangun, jenis });
const salah = (metode: Metode, tampil: string[], tokoh: string, kataTokoh: string, alasan: [string, string, string], benar: number, keliru: string, betul = false): LangkahSalah => ({
  tipe: "salah",
  metode,
  tampil,
  tokoh,
  kataTokoh,
  alasan,
  benar,
  keliru,
  ...(betul ? { betul: true } : {}),
});

/** Langkah-langkah yang diurutkan, ditulis menurut urutan benar. */
export const URUT_TAS: LangkahUrut["langkah"] = ["Raba permukaan benda di dalam tas", "Sebutkan ciri permukaannya", "Sebut nama bangun ruangnya"];
export const URUT_CETAK: LangkahUrut["langkah"] = ["Tekan satu permukaan pada bantalan tinta", "Cetak permukaan itu di kertas", "Lihat bangun datar hasil cetakannya"];
export const URUT_PANDANG: LangkahUrut["langkah"] = ["Lihat benda dari atas", "Lihat benda dari samping", "Cocokkan kedua bayangan dengan nama bangun ruang"];

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
  C(2, "klik", "Misi Gudang 2: rak untuk benda baru", "Pak Rudi menemukan benda-benda baru di sudut gudang. Bantu Chacha menatanya.", [
    salah(
      "igil",
      ["basket", "hadiah"],
      "Chacha",
      "Bola basket ini aku taruh di rak datar, di sebelah kotak hadiah. Bola itu akan diam saja.",
      [
        "Bola punya permukaan lengkung, jadi bola bisa menggelinding dan jatuh dari rak.",
        "Bola diam karena semua benda diam di rak datar.",
        "Bola tidak bisa menggelinding karena bola terlalu berat.",
      ],
      0,
      "Bola punya permukaan lengkung, jadi bisa menggelinding. Taruh bola di wadah berpagar, bukan di rak datar.",
    ),
    nam("tas", "tas", "tabung"),
    cet("persegi", ["kubus", "tabung", "bola"]),
    urt("pandang", URUT_PANDANG),
  ]),
  C(3, "kanvas", "Misi Gudang 3: catatan Dika", "Dika mencatat benda di gudang. Lihat bendanya, lalu tulis jawabanmu di kanvas.", [
    hit("igil", "ruang", ["esbatu", "bata", "kertas", "tisu", "eskrim", "basket", "hadiah", "cemara"]),
    muka("tas", "tabung", "datar"),
    muka("cetak", "kerucut", "datar"),
    hit("pandang", "datarSaja", ["esbatu", "dadu", "bata", "hadiah", "tisu", "eskrim", "basket"]),
  ]),
  C(4, "suara", "Misi Gudang 4: petunjuk Bu Sari", "Bu Sari memberi petunjuk dari balik rak. Sebutkan nama bangun ruangnya.", [
    nam("igil", "tanya", "bola"),
    nam("tas", "tas", "balok"),
    nam("cetak", "cetak", "kerucut"),
    nam("pandang", "pandang", "kubus"),
  ]),
];

const P = kelompok("diagram");
export const PICTORIAL: SoalMisi[] = [
  P(5, "klik", "Misi Gudang 5: model di papan", "Nia memasang model bangun ruang polos di papan gudang.", [
    pil("lengkung", ["esbatu", "tisu", "eskrim", "bata"]),
    salah(
      "tas",
      ["esbatu"],
      "Nia",
      "Semua permukaan model ini segi empat yang sama ukurannya. Jadi ini balok.",
      [
        "Segi empat yang sama ukurannya di semua permukaan berarti kubus, bukan balok.",
        "Balok punya semua permukaan segi empat yang sama ukurannya.",
        "Model ini punya permukaan lengkung, jadi bukan balok.",
      ],
      0,
      "Semua permukaan kubus berupa segi empat yang sama ukurannya. Balok punya segi empat yang ukurannya ada yang berbeda, jadi model ini kubus.",
    ),
    nam("cetak", "cetak", "tabung"),
    bs("bola", "Bola dari atas dan dari samping tampak sama, yaitu lingkaran.", true, "Bola tampak lingkaran dari arah mana pun, jadi pernyataan itu benar."),
  ]),
  P(6, "kanvas", "Misi Gudang 6: lembar Dika", "Dika menggambar lembar model polos. Lihat gambarnya, lalu tulis jawabanmu.", [
    hit("igil", "datarSaja", ["esbatu", "tisu", "bata", "eskrim", "dadu", "basket", "hadiah", "baterai"]),
    muka("tas", "tabung", "datar"),
    muka("cetak", "tabung", "lengkung"),
    hit("pandang", "ruang", ["esbatu", "bata", "tisu", "kertas", "eskrim", "basket", "tenis", "cemara"]),
  ]),
  P(7, "suara", "Misi Gudang 7: laporan Nia", "Nia melaporkan hasil model polos kepada Pak Rudi. Sebutkan nama bangun ruangnya.", [
    nam("igil", "tanya", "balok"),
    nam("tas", "tas", "tabung"),
    nam("cetak", "cetak", "kubus"),
    nam("pandang", "pandang", "kerucut"),
  ]),
];

const A = kelompok("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Gudang 8: spanduk Taman Dibuka", "Spanduk Taman Dibuka hanya berisi kata dan lambang.", [
    salah(
      "igil",
      ["kertas"],
      "Dika",
      "Selembar kertas gambar itu bangun ruang karena bisa dipegang.",
      [
        "Kertas tipis tidak punya ruang di dalam yang bisa diisi, jadi itu bangun datar.",
        "Semua benda yang bisa dipegang adalah bangun ruang.",
        "Kertas bisa diisi dengan banyak mainan.",
      ],
      0,
      "Bisa dipegang tidak berarti bangun ruang. Bangun ruang harus bisa diisi, dan kertas tipis tidak bisa diisi, jadi kertas adalah bangun datar.",
    ),
    nam("tas", "tas", "kerucut"),
    salah(
      "cetak",
      ["esbatu", "bata"],
      "Chacha",
      "Kubus dan balok berpermukaan datar semua, jadi bila dicetak hasilnya segi empat.",
      [
        "Betul. Semua permukaan kubus dan balok datar dan berbentuk segi empat, jadi cetakannya segi empat.",
        "Salah. Kubus dan balok punya permukaan lengkung yang tidak bisa dicetak.",
        "Salah. Hasil cetak kubus dan balok selalu lingkaran.",
      ],
      0,
      "Chacha benar. Permukaan datar kubus dan balok berbentuk segi empat, jadi cetakannya segi empat.",
      true,
    ),
    tab("datar", ["tabung", "kerucut", "bola"]),
  ]),
  A(9, "kanvas", "Misi Gudang 9: tulis di spanduk", "Chacha meminta kamu menulis jawaban di kanvas.", [
    hit("igil", "gelinding", ["basket", "tenis", "baterai", "eskrim", "esbatu", "bata", "kertas", "ubin"]),
    muka("tas", "kerucut", "semua"),
    muka("cetak", "bola", "lengkung"),
    hit("pandang", "ruang", ["dadu", "kertas", "tisu", "bata", "tenis", "eskrim", "hadiah", "cemara"]),
  ]),
  A(10, "suara", "Misi Gudang 10: sambutan Pak Rudi", "Sambutan terakhir untuk Taman Dibuka. Sebutkan nama bangun ruangnya.", [
    nam("igil", "tanya", "kerucut"),
    nam("tas", "tas", "bola"),
    nam("cetak", "cetak", "tabung"),
    nam("pandang", "pandang", "balok"),
  ]),
];

export const POIN_PENTING = [
  "Bangun ruang bisa diisi. Bangun datar tipis dan tidak bisa diisi.",
  "Permukaan datar menahan benda supaya diam. Permukaan lengkung membuat benda menggelinding.",
  "Kubus dan balok punya permukaan datar semua. Kubus: segi empat yang sama ukurannya. Balok: segi empat yang ukurannya ada yang berbeda.",
  "Tabung dan kerucut punya permukaan datar dan lengkung. Bola hanya punya permukaan lengkung.",
  "Tas Misteri: raba ciri permukaan. Cetak Permukaan: hasil cetak adalah bangun datar. Pandangan Atas dan Samping: lihat dari dua arah.",
  "Cari bangun ruang di sekitarmu: tanya dulu bisa diisi atau tidak, lalu lihat permukaannya.",
];
/** Poin penting untuk suara (tanpa digit). */
export const POIN_PENTING_SUARA = POIN_PENTING;

/** Perayaan akhir cerita bab (Abstract). */
export const PERAYAAN = "Taman Dibuka! Petak ubin sudah rapi, papan puzzle terpasang lengkap, dan semua mainan diam di rak yang tepat. Hebat, kamu sudah mengenal bangun ruang!";
export const PERAYAAN_SUARA = "Taman Dibuka! Petak ubin sudah rapi, papan puzzle terpasang lengkap, dan semua mainan diam di rak yang tepat. Hebat, kamu sudah mengenal bangun ruang!";
/** Penutup bab: tidak ada jembatan ke Sub-Bab berikutnya, hanya ucapan selamat. */
export const PENUTUP_BAB = "Kamu telah menyelesaikan Bab tiga: Bentuk di Sekitar Kita. Terima kasih, Chacha, Dika, Nia, Bu Sari, dan Pak Rudi!";

export const TEMA_TAHAP = {
  concrete: { ikon: "\u{1F4E6}", nama: "Concrete", cara: "Rak dan lereng gudang: benda berwarna untuk dipilah, dicetak, dan disebut namanya" },
  pictorial: { ikon: "\u{1F4D0}", nama: "Pictorial", cara: "Papan model: bangun ruang polos, hasil cetak, dan pandangan atas dan samping" },
  abstract: { ikon: "\u{1F389}", nama: "Abstract", cara: "Spanduk Taman Dibuka: kata dan lambang saja, pilih, tulis, dan ucapkan" },
} as const;

/** Benda Simulasi (nomor dalam BENDA_SIM). */
export { BENDA_SIM };

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_GUDANG, PICTORIAL as PICTORIAL_GUDANG, ABSTRACT as ABSTRACT_GUDANG, TEMA_TAHAP as TEMA_GUDANG };
