/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 2 Bab 7 Sub-Bab B "Pengumuman Bu Lia" (membandingkan dan mengurutkan bilangan), akhir cerita Bank Sampah Sekolah.
 * Misi lanjutan "Misi Papan Pengumuman" (nomor misi berlanjut dari Simulasi). Jawaban tidak hanya angka: memilih kata atau tanda, mengetuk bilangan, kepik di tali, kotak tabel
 * seratus, mengurutkan kartu, memasang kartu angka, satu angka di kanvas, dan satu kata atau bilangan yang diucapkan.
 * Angka jawaban per tahap (tidak kembar dalam satu tahap): Concrete kanvas 6, 5, 7, 4 dan suara 8; Pictorial kanvas 7, 5, 9, 2 dan suara 8, 4; Abstract kanvas 4, 6, 8, 2 dan suara 3.
 * Ruang jawaban sempit (angka satu sampai sembilan): beberapa jawaban sama dengan angka pada data Story (empat, enam, tujuh, delapan), tetapi tidak kembar dalam satu tahap.
 * Diuji: scripts/uji-papan-k2b7b.mjs.
 */
import type { Cara, Klaim, Langkah, LangkahSalah, LangkahSoal, Rupa, SoalMisi } from "./logika-cpa";
import { URUT_METODE, instruksi } from "./logika-cpa";

export { MISI_PAPAN_TEKS } from "./data-sim";

const salah = (tokoh: string, klaim: Klaim, kataTokoh: string, alasan: [string, string, string], benar: number, keliru: string): LangkahSalah => ({ tipe: "salah", tokoh, klaim, kataTokoh, alasan, benar, keliru });

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

/* ------------------------------ Concrete: dinding gudang dengan tali jemuran, botol terikat, dan kepik ------------------------------ */
const C = kelompok("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Papan Pengumuman 2: tali jemuran gudang", "Bu Lia memasang tali jemuran berangka di dinding gudang. Bantu membandingkan dan menyusun bilangan.", [
    salah(
      "Chacha",
      { jenis: "banding", a: 39, b: 52, katak: "a" },
      "Tiga puluh sembilan lebih banyak, karena angka sembilan lebih besar daripada angka dua!",
      [
        "Chacha benar, angka sembilan lebih besar daripada angka dua.",
        "Lihat puluhannya dulu: lima puluhan lebih banyak daripada tiga puluhan, jadi lima puluh dua yang lebih banyak.",
        "Bilangan yang disebut lebih dulu pasti lebih banyak.",
      ],
      1,
      "Puluhan dilihat lebih dulu. Lima puluhan lebih banyak daripada tiga puluhan, jadi lima puluh dua yang lebih banyak, bukan tiga puluh sembilan.",
    ),
    { tipe: "garis", dari: 27, arah: "maju", langkah: 3 },
    { tipe: "patokan", n: 65, patokan: 50 },
    { tipe: "urut", item: [93, 38, 71, 25] },
  ]),
  C(3, "kanvas", "Misi Papan Pengumuman 3: catatan Dika", "Dika mencatat banyak botol di gudang. Hitung, lalu tulis jawabanmu di kanvas.", [
    { tipe: "tempat", n: 65, tanya: "puluhan" },
    { tipe: "langkah", dari: 32, ke: 37 },
    { tipe: "banding", a: 24, b: 71, cari: "besar" },
    { tipe: "rank", item: [52, 18, 87, 40, 63], sasaran: 4 },
  ]),
  C(4, "suara", "Misi Papan Pengumuman 4: panggilan Bu Lia", "Bu Lia memanggil dari papan pengumuman. Jawab dengan suaramu.", [
    { tipe: "banding", a: 46, b: 64, cari: "besar" },
    { tipe: "langkah", dari: 70, ke: 66 },
    { tipe: "patokan", n: 42, patokan: 50 },
    { tipe: "kartu", a: 3, b: 8, target: "besar" },
  ]),
];

/* ------------------------------ Pictorial: lembar catatan dengan batang puluhan, kotak satuan, garis bilangan, dan tabel seratus polos ------------------------------ */
const Pi = kelompok("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Papan Pengumuman 5: lembar catatan", "Nia menggambar lembar catatan polos untuk papan pengumuman. Periksa catatannya.", [
    salah(
      "Nia",
      { jenis: "garis", dari: 40, arah: "mundur", langkah: 2, katak: 42 },
      "Kepik di empat puluh mundur dua langkah, jadi sekarang di empat puluh dua.",
      [
        "Nia benar, dari empat puluh mundur dua langkah sampai di empat puluh dua.",
        "Mundur berarti ke kiri dan bilangannya berkurang, jadi berhenti di tiga puluh delapan.",
        "Mundur dua langkah tetap berada di empat puluh.",
      ],
      1,
      "Mundur berarti ke kiri, dan bilangannya berkurang. Dari empat puluh mundur dua langkah sampai di tiga puluh delapan, bukan empat puluh dua.",
    ),
    { tipe: "turun", dari: 23, ke: 53 },
    { tipe: "banding", a: 45, b: 54, cari: "kecil" },
    { tipe: "kartu", a: 4, b: 9, target: "kecil" },
  ]),
  Pi(6, "kanvas", "Misi Papan Pengumuman 6: lembar Dika", "Dika menyusun lembar yang lebih banyak. Hitung, lalu tulis jawabanmu di kanvas.", [
    { tipe: "teka", mulai: 54, arah: "lebih", k: 3 },
    { tipe: "turun", dari: 15, ke: 65 },
    { tipe: "banding", a: 19, b: 94, cari: "besar" },
    { tipe: "rank", item: [76, 29, 48, 91], sasaran: 2 },
  ]),
  Pi(7, "suara", "Misi Papan Pengumuman 7: lapor ke Bu Lia", "Nia melaporkan lembarnya kepada Bu Lia. Sebutkan jawabanmu.", [
    { tipe: "tempat", n: 38, tanya: "satuan" },
    { tipe: "langkah", dari: 45, ke: 49 },
    { tipe: "patokan", n: 57, patokan: 50 },
    { tipe: "rank", item: [22, 67, 35, 81, 50], sasaran: 1 },
  ]),
];

/* ------------------------------ Abstract: panggung penutup dengan kartu kata dan lambang ------------------------------ */
const A = kelompok("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Papan Pengumuman 8: kartu pengumuman", "Kartu-kartu pengumuman hanya berisi kata dan lambang.", [
    salah(
      "Chacha",
      { jenis: "banding", a: 81, b: 78, katak: "b" },
      "Delapan puluh satu lebih kecil daripada tujuh puluh delapan, karena satuan satu itu kecil.",
      [
        "Chacha benar, satuan satu memang kecil.",
        "Puluhan dilihat dulu: delapan puluhan lebih banyak daripada tujuh puluhan, jadi delapan puluh satu lebih besar.",
        "Bilangan dengan angka satuan paling kecil selalu paling kecil.",
      ],
      1,
      "Puluhan dilihat lebih dulu. Delapan puluhan lebih banyak daripada tujuh puluhan, jadi delapan puluh satu lebih besar daripada tujuh puluh delapan.",
    ),
    { tipe: "antara", kiri: 63, kanan: 65, pilihan: [62, 64, 66, 60] },
    { tipe: "patokan", n: 48, patokan: 50 },
    { tipe: "urut", item: [57, 16, 82, 49] },
  ]),
  A(9, "kanvas", "Misi Papan Pengumuman 9: tulis di spanduk", "Chacha meminta kamu menulis jawaban di kanvas.", [
    { tipe: "tempat", n: 94, tanya: "satuan" },
    { tipe: "langkah", dari: 77, ke: 71 },
    { tipe: "banding", a: 44, b: 81, cari: "besar" },
    { tipe: "kartu", a: 2, b: 7, target: "kecil" },
  ]),
  A(10, "suara", "Misi Papan Pengumuman 10: pengumuman penutup", "Pengumuman terakhir untuk Bank Sampah. Bacakan jawabannya.", [
    { tipe: "tanda", a: 69, b: 96 },
    { tipe: "langkah", dari: 55, ke: 51 },
    { tipe: "patokan", n: 73, patokan: 50 },
    { tipe: "rank", item: [14, 72, 39, 60], sasaran: 3 },
  ]),
];

/** Mengubah angka dan tanda dalam teks menjadi kata (untuk suara tanpa digit). */
const SATUAN_KATA = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
export const jadiKata = (t: string): string =>
  t
    .replace(/>/g, " lebih besar dari ")
    .replace(/</g, " lebih kecil dari ")
    .replace(/=/g, " sama dengan ")
    .replace(/\d/g, (d) => SATUAN_KATA[Number(d)])
    .replace(/\s+/g, " ")
    .replace(/ ([.,])/g, "$1")
    .trim();

export const POIN_PENTING = [
  "Pada garis bilangan, bilangan di kanan lebih besar dan bilangan di kiri lebih kecil.",
  "Maju berarti bilangan bertambah, mundur berarti bilangan berkurang. Awalnya tidak dihitung.",
  "Membandingkan dua bilangan: lihat puluhannya dulu. Puluhan yang lebih banyak berarti bilangan lebih besar.",
  "Bila puluhannya sama, lihat satuannya. Satuan yang lebih banyak berarti bilangan lebih besar.",
  "Pakai kata lebih besar dari, lebih kecil dari, atau sama dengan, atau tanda > < =. Tanda terbuka ke arah bilangan yang lebih besar.",
  "Untuk mengurutkan, bandingkan puluhannya dulu, lalu susun dari yang paling kecil atau dari yang paling besar.",
  "Kartu angka: angka yang lebih besar di tempat puluhan membuat bilangan terbesar. Teka-teki bisa dipecahkan dengan berpikir mundur.",
];
/** Poin penting untuk suara (tanpa digit dan tanpa lambang). */
export const POIN_PENTING_SUARA = POIN_PENTING.map(jadiKata);

/** Perayaan akhir cerita bab dan pertanyaan penutup. */
export const PENUTUP_B = "Bank Sampah Sekolah resmi dibuka, dan semua tim bangga. Menurutmu, benda apa lagi yang bisa kita kumpulkan dan bandingkan?";

export const TEMA_PAPAN = {
  concrete: { ikon: "\u{1F9F7}", nama: "Concrete", cara: "Dinding gudang dengan tali jemuran: botol terikat, botol lepas, dan kepik untuk dibaca, digeser, dan disusun" },
  pictorial: { ikon: "\u{1F4CB}", nama: "Pictorial", cara: "Lembar catatan berkisi: batang puluhan, kotak satuan, garis bilangan, dan tabel seratus polos, tanpa gambar benda" },
  abstract: { ikon: "\u{1F3C6}", nama: "Abstract", cara: "Panggung penutup: kartu kata dan lambang saja, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_PAPAN, PICTORIAL as PICTORIAL_PAPAN, ABSTRACT as ABSTRACT_PAPAN };
