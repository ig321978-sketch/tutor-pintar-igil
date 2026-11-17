/**
 * Isi tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 6 Sub-Bab B "Loket Karcis", cerita Pasar Malam Kampung.
 * Angka Story (karcis delapan dan tujuh, sembilan dan lima, tiga belas dan empat, sebelas dan lima, catatan lima belas, empat belas, tujuh belas)
 * hanya dipakai di Mind-map dan Infografis. Simulasi dan CPA memakai bilangan lain dan melanjutkan "Misi Loket Karcis" bagian satu sampai sepuluh.
 * Diuji: scripts/uji-karcis-k1b6b.mjs.
 */
import type { Cara, Langkah, LangkahDasar, LangkahSoal, RombonganSim, Rupa, SoalMisi, Tempat } from "./logika";
import { instruksi, kata, metodeLangkah } from "./logika";

const tp = (id: string, kelompok: string, kunci: string, urutan?: number): Tempat => (urutan === undefined ? { id, kelompok, kunci } : { id, kelompok, kunci, urutan });

/** Benda Concrete: gambar emoji, nama, dan warna latar kartu. Pictorial dan Abstract memakai jenis "titik" (tanpa gambar benda). */
export const EMOJI: Record<string, string> = {
  karcis: "\u{1F39F}\u{FE0F}",
  balon: "\u{1F388}",
  kue: "\u{1F9C1}",
  lampion: "\u{1F3EE}",
  permen: "\u{1F36C}",
};
export const NAMA_BENDA: Record<string, string> = { karcis: "karcis", balon: "balon", kue: "kue cubit", lampion: "lampion", permen: "permen" };
export const WARNA_BENDA: Record<string, [string, string]> = {
  karcis: ["#FEF08A", "#CA8A04"],
  balon: ["#FECACA", "#DC2626"],
  kue: ["#FBCFE8", "#BE185D"],
  lampion: ["#FED7AA", "#EA580C"],
  permen: ["#DDD6FE", "#7C3AED"],
};

/* ------------------------------ Mind-map: komidi putar (hanya poin pelajaran) ------------------------------ */
export const PUSAT_KOMIDI = "Menjumlah sampai dua puluh";
export const KELOMPOK_KOMIDI: Record<string, { nama: string; letak: string; ikon: string; isi: string; garis: string; petunjuk: string }> = {
  masalah: { nama: "Masalah", letak: "Papan di bawah atap", ikon: "\u{1F3AB}", isi: "#FDE68A", garis: "#A16207", petunjuk: "Label ini kuning. Tempelkan di papan masalah di bawah atap." },
  metode: { nama: "Penyelesaian", letak: "Tiang komidi", ikon: "\u{1F3A0}", isi: "#BFDBFE", garis: "#1D4ED8", petunjuk: "Label ini biru. Tempelkan di tiang yang nomornya pas." },
  hasil: { nama: "Hasil", letak: "Lantai komidi", ikon: "\u{2705}", isi: "#BBF7D0", garis: "#15803D", petunjuk: "Label ini hijau. Tempelkan di lantai komidi." },
};
export const TEMPAT_KOMIDI: Tempat[] = [
  tp("km-1", "masalah", "Dua bilangan digabung"),
  tp("km-2", "masalah", "Bilangan awal disebut dua kali"),
  tp("km-3", "masalah", "Cara mana yang paling pas?"),
  tp("tg-1", "metode", "Hitung maju dari sesudahnya", 1),
  tp("tg-2", "metode", "Genapkan sepuluh dulu", 2),
  tp("tg-3", "metode", "Belasan: tambah satuannya", 3),
  tp("tg-4", "metode", "Kembar tambah satu", 4),
  tp("tg-5", "metode", "Bagan bagian dan keseluruhan", 5),
  tp("tg-6", "metode", "Lompat di garis bilangan", 6),
  tp("tg-7", "metode", "Pilih cara yang pas", 7),
  tp("lt-1", "hasil", "Hasil sama, cara boleh beda"),
  tp("lt-2", "hasil", "Puluhan tetap, satuan bertambah"),
  tp("lt-3", "hasil", "Sepuluh dulu, sisanya menyusul"),
  tp("lt-4", "hasil", "Lompatan berakhir di jumlah"),
];
export const PETUNJUK_URUT_KOMIDI = "Warnanya sudah benar. Nomor tiangnya belum pas. Langkah mana yang lebih dulu?";
export const SUARA_KOMIDI =
  "Ini komidi putar. Papan di bawah atap berisi masalah. Tujuh tiang bernomor berisi langkah yang berurutan, ikuti nomornya dari kiri ke kanan. Lantai komidi berisi hasil. Ketuk label, lalu ketuk tempat yang cocok.";

/* ------------------------------ Infografis: lembar karcis ------------------------------ */
export const KOLOM_KARCIS = ["Bilangan", "Cara", "Hasil"] as const;
export const BARIS_KARCIS: { ikon: string; nama: string; bilangan: string; cara: string; hasil: string }[] = [
  { ikon: "\u{1F9D2}", nama: "Rombongan", bilangan: "8 dan 7", cara: "hitung maju dari 9", hasil: "15 karcis" },
  { ikon: "\u{1F408}", nama: "Genapkan sepuluh", bilangan: "9 dan 5", cara: "ambil 1, genap 10", hasil: "14 karcis" },
  { ikon: "\u{1F3AA}", nama: "Belasan", bilangan: "13 dan 4", cara: "satuan 3 + 4 = 7", hasil: "17 anak" },
  { ikon: "\u{2753}", nama: "Pilih cara", bilangan: "11 dan 5", cara: "satuan atau maju", hasil: "16 karcis" },
  { ikon: "\u{1F4DD}", nama: "Salah langkah", bilangan: "mulai dari 8", cara: "jangan sebut 8 lagi", hasil: "bukan 14, tetapi 15" },
];
export const TEMPAT_KARCIS: Tempat[] = BARIS_KARCIS.flatMap((b, i) => [tp(`k${i}-bilangan`, "bilangan", b.bilangan), tp(`k${i}-cara`, "cara", b.cara), tp(`k${i}-hasil`, "hasil", b.hasil)]);
export const KELOMPOK_KARCIS: Record<string, string> = {
  bilangan: "Label ini dua bilangan yang digabung. Tempelkan di kolom Bilangan.",
  cara: "Label ini cara menghitungnya. Tempelkan di kolom Cara.",
  hasil: "Label ini hasil penjumlahannya. Tempelkan di kolom Hasil.",
};
export const SUARA_KARCIS =
  "Ini lembar karcis, dari cerita loket karcis. Tiap baris satu penjumlahan. Tempelkan bilangannya, caranya, dan hasilnya.";

/* ------------------------------ Simulasi: Loket Karcis ------------------------------ */
/** Rombongan di loket (berbeda dari Story); yang terakhir diatur sendiri oleh anak. Sama dengan JUMLAH_ROMBONGAN_B di misi (tiga yang tetap). */
export const ROMBONGAN_SIM: readonly RombonganSim[] = [
  { id: "merah", nama: "Rombongan merah", ikon: "\u{1F9D2}", a: 9, b: 6 },
  { id: "hijau", nama: "Rombongan hijau", ikon: "\u{1F9D3}", a: 12, b: 5 },
  { id: "kuning", nama: "Rombongan kuning", ikon: "\u{1F466}", a: 8, b: 5 },
  { id: "sendiri", nama: "Rombongan buatanmu", ikon: "\u{2728}", a: 7, b: 5 },
];
export const JUMLAH_ROMBONGAN = ROMBONGAN_SIM.length - 1;
export const MISI_KARCIS =
  "Misi Loket Karcis: hitung jumlah karcis tiap rombongan dengan hitung maju, genapkan sepuluh, atau belasan tambah satuan, lalu catat di papan.";

/* ------------------------------ CPA: lanjutan Misi Loket Karcis ------------------------------ */
const maju = (a: number, b: number, jenis = "titik"): Langkah => ({ tipe: "maju", a, b, jenis });
const belasan = (a: number, b: number, jenis = "titik"): Langkah => ({ tipe: "belasan", a, b, jenis });
const kembar = (a: number, b: number, jenis = "titik"): Langkah => ({ tipe: "kembar", a, b, jenis });
const kembarPilih = (a: number, b: number, kartu: number[], jenis = "titik"): Langkah => ({ tipe: "kembar", a, b, jenis, kartu });
const bagan = (a: number, b: number, jenis = "titik"): Langkah => ({ tipe: "bagan", a, b, jenis });
const lompat = (a: number, b: number, jenis = "titik"): Langkah => ({ tipe: "lompat", a, b, jenis });
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
      const s = instruksi(l, rupa, cara);
      return { metode: metodeLangkah(l), cara, judul: s, suara: s, langkah: l };
    }),
  });

const C = kelompok("benda");
export const CONCRETE: SoalMisi[] = [
  C(1, "klik", "Misi Loket Karcis 2: tikar pandan", "Abang menggelar tikar pandan di depan loket. Karcis dan jajanan disusun di atasnya.", [
    salah(
      maju(4, 6, "karcis"),
      "Igil",
      9,
      "Empat, lima, enam, tujuh, delapan, sembilan. Hasilnya sembilan.",
      ["Igil benar, bilangan awal harus ikut disebut.", "Empat ikut disebut lagi. Hitung maju dimulai dari bilangan sesudahnya.", "Hitung maju harus diulang dari awal."],
      1,
      "Igil menyebut empat lagi. Hitung maju dimulai dari lima, jadi hasilnya sepuluh.",
    ),
    kembarPilih(5, 6, [5, 6, 9, 12], "kue"),
    bagan(8, 4, "balon"),
    lompat(9, 6, "lampion"),
  ]),
  C(2, "kanvas", "Misi Loket Karcis 3: catatan Kaka", "Kaka mencatat hitungan di atas tikar. Beri tanda atau tulis jawabanmu di kanvas.", [
    maju(3, 5, "permen"),
    kembarPilih(7, 8, [7, 3, 8, 12], "karcis"),
    bagan(6, 5, "kue"),
    lompat(9, 4, "balon"),
  ]),
  C(3, "suara", "Misi Loket Karcis 4: panggilan Pak RT", "Pak RT memanggil dari komidi putar. Jawab dengan suaramu.", [
    belasan(12, 6, "lampion"),
    kembar(3, 4, "permen"),
    bagan(7, 9, "karcis"),
    lompat(6, 8, "kue"),
  ]),
];

const P = kelompok("diagram");
export const PICTORIAL: SoalMisi[] = [
  P(1, "klik", "Misi Loket Karcis 5: denah arena", "Abang menggambar denah arena pasar malam dengan kotak dan titik polos.", [
    maju(3, 6),
    kembarPilih(4, 5, [4, 5, 10, 13]),
    salah(
      bagan(9, 7),
      "Abang",
      17,
      "Sembilan ditambah satu sepuluh. Sepuluh ditambah tujuh sama dengan tujuh belas.",
      ["Abang benar, sisanya tujuh.", "Satu sudah diambil dari tujuh, jadi sisanya tinggal enam.", "Sepuluh harus ditambah semua yang tadi diambil."],
      1,
      "Satu sudah diambil dari tujuh. Sisanya enam, jadi sepuluh ditambah enam sama dengan enam belas.",
    ),
    lompat(7, 4),
  ]),
  P(2, "kanvas", "Misi Loket Karcis 6: jalan di denah", "Kaka menandai jalan di denah. Lingkari atau tulis jawabanmu di kanvas.", [
    belasan(13, 5),
    kembarPilih(11, 12, [6, 11, 12, 2]),
    bagan(8, 5),
    lompat(6, 9),
  ]),
  P(3, "suara", "Misi Loket Karcis 7: lapor lewat toa", "Abang melapor lewat pengeras suara arena. Sebutkan jawabanmu.", [
    maju(6, 4),
    kembar(9, 10),
    bagan(8, 4),
    lompat(6, 8),
  ]),
];

const A = kelompok("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(1, "klik", "Misi Loket Karcis 8: layar kasir", "Layar kasir hanya menampilkan kata dan angka.", [
    salah(
      belasan(14, 5),
      "Kaka",
      18,
      "Empat belas ditambah lima sama dengan delapan belas.",
      ["Kaka benar, lima ditambah empat belas delapan belas.", "Empat ditambah lima sama dengan sembilan, bukan delapan. Puluhannya tetap satu.", "Puluhannya harus ikut bertambah."],
      1,
      "Satuannya empat ditambah lima sama dengan sembilan, puluhannya tetap satu, jadi sembilan belas.",
    ),
    kembarPilih(9, 10, [3, 9, 10, 16]),
    bagan(9, 3),
    lompat(7, 9),
  ]),
  A(2, "kanvas", "Misi Loket Karcis 9: tulis di struk", "Kaka meminta Igil menulis hasil di struk kasir.", [maju(4, 5), kembarPilih(14, 15, [2, 14, 15, 8]), bagan(8, 6), lompat(6, 9)]),
  A(3, "suara", "Misi Loket Karcis 10: kasir siap tutup", "Kasir hampir ditutup. Bacakan jawaban terakhir untuk Mamah.", [belasan(15, 3), kembar(3, 4), bagan(9, 4), lompat(6, 5)]),
];

export const POIN_PENTING = [
  "Hitung maju dimulai dari bilangan sesudahnya. 4 + 6: sebut 5, 6, 7, 8, 9, 10.",
  "Hampir sepuluh? Genapkan sepuluh dulu, lalu tambahkan sisanya. 8 + 5: 8 + 2 = 10, 10 + 3 = 13.",
  "Belasan ditambah satuan: tambahkan satuannya, puluhannya tetap. 12 + 6 = 18.",
  "Kembar tambah satu: 3 + 3 = 6, lalu 6 + 1 = 7.",
  "Bagan dan garis bilangan: pisah atau lompat menuju sepuluh dulu, lalu sisanya.",
];
/** Poin penting untuk suara (tanpa digit). */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) =>
  p
    .replace(/(\d+) \+ (\d+) = (\d+)/g, (_m, x: string, y: string, z: string) => `${kata(Number(x))} ditambah ${kata(Number(y))} sama dengan ${kata(Number(z))}`)
    .replace(/(\d+) \+ (\d+)/g, (_m, x: string, y: string) => `${kata(Number(x))} ditambah ${kata(Number(y))}`)
    .replace(/\d+/g, (d) => kata(Number(d))),
);

export const TEMA_TAHAP = {
  concrete: { ikon: "\u{1F39F}\u{FE0F}", nama: "Concrete", cara: "Karcis dan jajanan di tikar: ketuk, pindahkan, dan ucapkan" },
  pictorial: { ikon: "\u{1F5FA}\u{FE0F}", nama: "Pictorial", cara: "Titik, kotak, dan garis polos di denah: tandai, pilih, dan ucapkan" },
  abstract: { ikon: "\u{1F9FE}", nama: "Abstract", cara: "Kata dan angka saja di layar kasir: pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_KARCIS, PICTORIAL as PICTORIAL_KARCIS, ABSTRACT as ABSTRACT_KARCIS, TEMA_TAHAP as TEMA_KARCIS };
