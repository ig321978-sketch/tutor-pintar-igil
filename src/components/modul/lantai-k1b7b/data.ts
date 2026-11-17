/**
 * Isi tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract Kelas 1 Bab 7 Sub-Bab B "Papan Lantai Rumah Pohon",
 * akhir cerita Rumah Pohon Abang. Tanpa satuan baku (meter, sentimeter): hanya jengkal, tongkat kayu, sedotan, dan kotak pada kertas berpetak.
 * Angka Story (lima jengkal, empat jengkal bercelah, tiga tongkat, empat jengkal Mamah, perkiraan tiga dan hasil lima, enam kotak dan empat kotak,
 * tujuh sedotan, perkiraan enam dan hasil delapan, delapan kotak dan lima kotak) hanya dipakai di Mind-map dan Infografis.
 * Simulasi dan CPA memakai benda dan bilangan lain dan melanjutkan "Misi Papan Lantai".
 * Diuji: scripts/uji-lantai-k1b7b.mjs.
 */
import type { BendaSim, Cara, Langkah, LangkahDasar, LangkahSoal, Rupa, SoalMisi, Tempat, TanyaPetak } from "./logika";
import { instruksi, kata, metodeLangkah } from "./logika";

const tp = (id: string, kelompok: string, kunci: string, urutan?: number): Tempat => (urutan === undefined ? { id, kelompok, kunci } : { id, kelompok, kunci, urutan });

/* ------------------------------ Gambar benda (hanya Concrete) ------------------------------ */
export const EMOJI: Record<string, string> = {
  jengkal: "\u{270B}",
  tongkat: "\u{1F962}",
  sedotan: "\u{1F964}",
  tali: "\u{1F9F5}",
  pita: "\u{1F380}",
  dahan: "\u{1F333}",
  bangku: "\u{1FA91}",
  bata: "\u{1F9F1}",
};
/** Warna isi dan garis tiap benda atau satuan berwarna di Concrete. */
export const WARNA_BENDA: Record<string, [string, string]> = {
  jengkal: ["#FDBA74", "#9A3412"],
  tongkat: ["#D6A15E", "#78350F"],
  sedotan: ["#F9A8D4", "#BE185D"],
  tali: ["#FDE68A", "#A16207"],
  pita: ["#FCA5A5", "#B91C1C"],
  dahan: ["#86EFAC", "#15803D"],
  bangku: ["#E8B979", "#92400E"],
  bata: ["#FCA5A5", "#7F1D1D"],
};
export const NAMA_BENDA: Record<string, string> = {
  jengkal: "jengkal",
  tongkat: "tongkat kayu",
  sedotan: "sedotan",
  tali: "tali",
  pita: "pita",
  dahan: "dahan",
  bangku: "papan bangku",
  bata: "deretan bata",
};

/* ------------------------------ Mind-map: rumah pohon (hanya poin pelajaran) ------------------------------ */
export const PUSAT_RUMAH = "Mengukur panjang benda";
export const KELOMPOK_RUMAH: Record<string, { nama: string; letak: string; ikon: string; isi: string; garis: string; petunjuk: string }> = {
  masalah: { nama: "Masalah", letak: "Lantai rumah pohon", ikon: "\u{1F4CB}", isi: "#FDE68A", garis: "#A16207", petunjuk: "Label ini kuning. Tempelkan di lantai rumah pohon." },
  metode: { nama: "Penyelesaian", letak: "Dahan bernomor", ikon: "\u{1F333}", isi: "#BBF7D0", garis: "#15803D", petunjuk: "Label ini hijau. Tempelkan di dahan yang nomornya pas." },
  hasil: { nama: "Hasil", letak: "Bendera", ikon: "\u{1F6A9}", isi: "#FBCFE8", garis: "#BE185D", petunjuk: "Label ini merah jambu. Tempelkan di bendera rumah pohon." },
};
export const TEMPAT_RUMAH: Tempat[] = [
  tp("rm-1", "masalah", "Panjang belum diketahui"),
  tp("rm-2", "masalah", "Alat beda, hasil beda"),
  tp("rm-3", "masalah", "Pesanan harus tepat"),
  tp("dh-1", "metode", "Kira-Kira lalu Periksa", 1),
  tp("dh-2", "metode", "Mulai dari ujung", 2),
  tp("dh-3", "metode", "Mengulang Satuan", 3),
  tp("dh-4", "metode", "Rapat, tidak bertumpuk", 4),
  tp("dh-5", "metode", "Satu jenis alat ukur", 5),
  tp("dh-6", "metode", "Tulis angka dan nama alat", 6),
  tp("dh-7", "metode", "Ukur di Kotak-Kotak", 7),
  tp("bd-1", "hasil", "Alat panjang, angka sedikit"),
  tp("bd-2", "hasil", "Selisih perkiraan dan hasil"),
  tp("bd-3", "hasil", "Kotak lebih banyak, lebih panjang"),
  tp("bd-4", "hasil", "Papan terpasang rapat"),
];
export const PETUNJUK_URUT_RUMAH = "Warnanya sudah benar. Nomor dahannya belum pas. Langkah mana yang lebih dulu?";
export const SUARA_RUMAH =
  "Ini rumah pohon di dahan jambu. Lantainya berisi masalah. Tujuh dahan bernomor berisi langkah yang berurutan, ikuti nomornya dari awal sampai akhir. Bendera berisi hasil. Ketuk label, lalu ketuk tempat yang cocok.";

/* ------------------------------ Infografis: catatan Kakek Jaya ------------------------------ */
export const KOLOM_CATATAN = ["Bilangan", "Hasil", "Catatan"] as const;
export const BARIS_CATATAN: { ikon: string; nama: string; bilangan: string; hasil: string; catatan: string }[] = [
  { ikon: "\u{270B}", nama: "Jengkal Igil", bilangan: "5 jengkal", hasil: "pesan 5 jengkal Igil", catatan: "rapat, tanpa celah" },
  { ikon: "\u{1F6AB}", nama: "Jengkal bercelah", bilangan: "4 jengkal", hasil: "salah: ada celah", catatan: "terlewat tidak terhitung" },
  { ikon: "\u{1F962}", nama: "Tongkat dan Mamah", bilangan: "3 tongkat, 4 jengkal", hasil: "angka lebih sedikit", catatan: "satu jenis alat ukur" },
  { ikon: "\u{1F50D}", nama: "Perkiraan dan hasil", bilangan: "kira-kira 3, hasil 5", hasil: "selisih 2 jengkal", catatan: "5 dikurangi 3" },
  { ikon: "\u{1F7E9}", nama: "Kertas berpetak", bilangan: "6 kotak dan 4 kotak", hasil: "6 lebih panjang", catatan: "mulai dari ujung kiri" },
];
export const TEMPAT_CATATAN: Tempat[] = BARIS_CATATAN.flatMap((b, i) => [tp(`c${i}-bilangan`, "bilangan", b.bilangan), tp(`c${i}-hasil`, "hasil", b.hasil), tp(`c${i}-catatan`, "catatan", b.catatan)]);
export const KELOMPOK_CATATAN: Record<string, string> = {
  bilangan: "Label ini bilangan hasil ukur atau perkiraan. Tempelkan di kolom Bilangan.",
  hasil: "Label ini hasil atau kesimpulan. Tempelkan di kolom Hasil.",
  catatan: "Label ini catatan caranya. Tempelkan di kolom Catatan.",
};
export const SUARA_CATATAN = "Ini catatan Kakek Jaya di papan jepit, dari cerita papan lantai. Tiap baris satu hal yang diukur. Tempelkan bilangannya, hasilnya, dan catatannya.";

/* ------------------------------ Simulasi: Misi Papan Lantai bagian satu ------------------------------ */
/** Benda di bengkel (berbeda dari Story), panjang dalam satuan sedotan (genap supaya tongkat kayu pas). Sama dengan di misi. */
export const BENDA_SIM: readonly BendaSim[] = [
  { id: "tali", nama: "Tali ayunan", ikon: "\u{1F9F5}", panjang: 12 },
  { id: "bangku", nama: "Papan bangku", ikon: "\u{1FA91}", panjang: 10 },
  { id: "pagar", nama: "Pagar mungil", ikon: "\u{1F9F1}", panjang: 4 },
  { id: "lantai", nama: "Sisi lantai baru", ikon: "\u{1F3E0}", panjang: 12 },
];
export const MISI_LANTAI =
  "Misi Papan Lantai: ukur benda dengan sedotan dan tongkat kayu, catat perkiraan lebih dulu, bandingkan dua pita di kertas berpetak, lalu pesan papan lantai rumah pohon.";

/* ------------------------------ CPA: lanjutan Misi Papan Lantai ------------------------------ */
const taruh = (panjang: number, k: number, satuan: string, benda: string): Langkah => ({ tipe: "taruh", panjang, k, satuan, benda, mode: "taruh" });
const pindah = (panjang: number, satuan: string, benda: string): Langkah => ({ tipe: "taruh", panjang, k: 1, satuan, benda, mode: "pindah" });
const kira = (panjang: number, perkiraan: number, satuan: string, benda: string): Langkah => ({ tipe: "taruh", panjang, k: 1, satuan, benda, mode: "taruh", kira: perkiraan });
const petak = (a: number, b: number, tanya: TanyaPetak): Langkah => ({ tipe: "petak", a, b, tanya });
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
  C(2, "klik", "Misi Papan Lantai 2: kayu di bengkel", "Kakek Jaya menjajarkan papan, tali, dan dahan di bengkel. Bantu Igil mengukurnya.", [
    salah(
      { tipe: "taruh", panjang: 6, k: 1, satuan: "jengkal", benda: "bangku", mode: "taruh", celah: 2 },
      "Igil",
      5,
      "Lima jengkal! Aku menghitung semua jengkal yang kutaruh.",
      [
        "Jengkal harus rapat tanpa celah. Ada satu tempat yang terlewat, jadi hasilnya lebih dari lima.",
        "Igil benar, tiap jengkal yang ditaruh dihitung satu.",
        "Benda tidak perlu diukur sampai ke ujung.",
      ],
      0,
      "Igil menaruh jengkal dengan celah di tengah. Tempat yang terlewat tidak terhitung, jadi hasilnya kurang satu.",
    ),
    pindah(9, "sedotan", "tali"),
    kira(11, 8, "jengkal", "dahan"),
    petak(5, 9, "panjang"),
  ]),
  C(3, "kanvas", "Misi Papan Lantai 3: catatan Kaka", "Kaka mencatat hasil ukur di bengkel. Beri tanda atau lingkari, lalu tulis jawabanmu.", [
    taruh(8, 2, "tongkat", "pita"),
    pindah(7, "jengkal", "tali"),
    kira(10, 12, "sedotan", "bata"),
    petak(11, 7, "pendek"),
  ]),
  C(4, "suara", "Misi Papan Lantai 4: panggilan Mamah", "Mamah bertanya dari bawah pohon jambu. Jawab dengan suaramu.", [
    taruh(12, 1, "sedotan", "pita"),
    pindah(10, "tongkat", "bangku"),
    kira(5, 6, "jengkal", "dahan"),
    petak(11, 3, "hitung"),
  ]),
];

const P = kelompok("diagram");
export const PICTORIAL: SoalMisi[] = [
  P(5, "klik", "Misi Papan Lantai 5: denah berpetak", "Abang menggambar denah rumah pohon di kertas berpetak. Hitung dengan kotak polos.", [
    taruh(10, 2, "polos", "polos"),
    pindah(4, "polos", "polos"),
    kira(12, 9, "polos", "polos"),
    salah(
      { tipe: "petak", a: 7, b: 3, tanya: "hitung", lewat: true },
      "Kaka",
      6,
      "Kotak yang kuwarnai enam, jadi pitanya enam kotak.",
      [
        "Kotak pertama di ujung kiri juga tertutup pita, jadi harus ikut dihitung.",
        "Kaka benar, kotak berwarna saja yang dihitung.",
        "Hitungan boleh mulai dari kotak mana saja.",
      ],
      0,
      "Kaka melewatkan kotak pertama di ujung kiri, jadi hasilnya kurang satu kotak.",
    ),
  ]),
  P(6, "kanvas", "Misi Papan Lantai 6: kertas Kaka", "Kaka menggambar denah dengan kotak dan garis polos. Beri tanda atau lingkari, lalu tulis jawabanmu.", [
    taruh(8, 1, "polos", "polos"),
    pindah(11, "polos", "polos"),
    kira(6, 5, "polos", "polos"),
    petak(6, 10, "panjang"),
  ]),
  P(7, "suara", "Misi Papan Lantai 7: lapor ke Kakek Jaya", "Abang melaporkan hasil denah kepada Kakek Jaya. Sebutkan jawabanmu.", [
    taruh(12, 2, "polos", "polos"),
    pindah(2, "polos", "polos"),
    kira(11, 2, "polos", "polos"),
    petak(12, 4, "hitung"),
  ]),
];

const A = kelompok("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Papan Lantai 8: papan tulis bendera", "Pesanan papan lantai hanya berisi kata dan angka.", [
    salah(
      taruh(6, 2, "polos", "polos"),
      "Igil",
      12,
      "Alat ukurnya lebih panjang, jadi angkanya lebih banyak: dua belas.",
      [
        "Alat ukur lebih panjang menutupi benda dengan angka lebih sedikit, bukan lebih banyak.",
        "Igil benar, alat panjang berarti angka banyak.",
        "Alat ukur tidak memengaruhi angka hasil.",
      ],
      0,
      "Igil mengira alat lebih panjang membuat angka lebih banyak. Padahal alat lebih panjang, angkanya lebih sedikit.",
    ),
    pindah(6, "polos", "polos"),
    kira(9, 7, "polos", "polos"),
    petak(9, 12, "panjang"),
  ]),
  A(9, "kanvas", "Misi Papan Lantai 9: tulis di bendera", "Kaka meminta Igil menulis angka di kanvas.", [taruh(7, 1, "polos", "polos"), pindah(12, "polos", "polos"), kira(4, 5, "polos", "polos"), petak(8, 11, "pendek")]),
  A(10, "suara", "Misi Papan Lantai 10: rumah pohon selesai", "Rumah pohon hampir selesai. Bacakan jawaban terakhir untuk Abang.", [taruh(8, 2, "polos", "polos"), pindah(11, "polos", "polos"), kira(12, 3, "polos", "polos"), petak(10, 5, "hitung")]),
];

export const POIN_PENTING = [
  "Mulai dari ujung benda. Satuan ditaruh rapat, tanpa celah, tidak bertumpuk, dan tidak miring.",
  "Pakai satu jenis alat ukur sampai selesai. Tulis angka dan nama alatnya, misalnya 5 jengkal.",
  "Alat ukur lebih panjang, angkanya lebih sedikit. Alat lebih pendek, angkanya lebih banyak.",
  "Perkirakan dulu, lalu periksa. Selisih perkiraan dan hasil: 5 dikurangi 3 sama dengan 2.",
  "Di kertas berpetak, hitung kotak dari ujung kiri tanpa terlewat. Kotak lebih banyak, pita lebih panjang.",
];
/** Poin penting untuk suara (tanpa digit). */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => p.replace(/\d+/g, (d) => kata(Number(d))));

export const PERAYAAN = "Rumah pohon Abang selesai! Papan lantai terpasang rapat dan bendera dikibarkan. Cerita Rumah Pohon Abang selesai.";
export const PERAYAAN_SUARA = "Rumah pohon Abang selesai! Papan lantai terpasang rapat dan bendera dikibarkan. Cerita Rumah Pohon Abang selesai. Hebat!";

export const TEMA_TAHAP = {
  concrete: { ikon: "\u{1F528}", nama: "Concrete", cara: "Kayu dan satuan di lantai rumah pohon: taruh, geser, dan ucapkan" },
  pictorial: { ikon: "\u{1F5FA}", nama: "Pictorial", cara: "Kotak dan pita polos di kertas berpetak: tandai, ketuk, dan ucapkan" },
  abstract: { ikon: "\u{1F6A9}", nama: "Abstract", cara: "Kata dan angka saja: pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_LANTAI, PICTORIAL as PICTORIAL_LANTAI, ABSTRACT as ABSTRACT_LANTAI, TEMA_TAHAP as TEMA_LANTAI };
