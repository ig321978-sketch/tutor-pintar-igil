/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 2 Bab 5 Sub-Bab B "Bibit untuk Dua Petak" (setengah dari kumpulan benda), tengah cerita Kebun Sekolah.
 * Misi lanjutan "Misi Bedeng Bibit" (nomor misi berlanjut dari Simulasi). Benda dan bilangan berbeda dari Story (jagung, wortel, apel, terong, bunga, cabai, tomat).
 * Jawaban bukan hanya angka: mengurutkan langkah, memindahkan benda sampai neraca seimbang, menggandakan tumpukan, membagi satu-satu, satu angka (kanvas),
 * satu kata atau bilangan (suara).
 * Angka jawaban Tulis di kanvas per tahap: Concrete 5, 4, 3, 8; Pictorial 3, 4, 2, 6; Abstract 2, 8, 3, 4 (tidak kembar dalam satu tahap).
 * Diuji: scripts/uji-bibit-k2b5b.mjs.
 */
import type { Cara, Langkah, LangkahDasar, LangkahSalah, LangkahSoal, LBagi, LGiliran, LKali, LNeraca, Rupa, SoalMisi } from "./logika-cpa";
import { instruksi, metodeLangkah } from "./logika-cpa";

export { MISI_BIBIT_TEKS } from "./data-peta";

const bg = (total: number, benda?: string, pisah?: [number, number]): LBagi => ({ tipe: "bagi", total, ...(benda ? { benda } : {}), ...(pisah ? { pisah } : {}) });
const gl = (total: number, putaran: number, benda?: string): LGiliran => ({ tipe: "giliran", total, putaran, ...(benda ? { benda } : {}) });
const nr = (kiri: number, kanan: number, benda?: string): LNeraca => ({ tipe: "neraca", kiri, kanan, ...(benda ? { benda } : {}) });
const kl = (h: number, semula: number, benda?: string): LKali => ({ tipe: "kali", h, semula, ...(benda ? { benda } : {}) });
const salah = (dasar: LangkahDasar, tokoh: string, kataTokoh: string, jawabTokoh: string | undefined, alasan: [string, string, string], benar: number, keliru: string, betul = false): LangkahSalah => ({
  tipe: "salah",
  dasar,
  tokoh,
  kataTokoh,
  ...(jawabTokoh === undefined ? {} : { jawabTokoh }),
  alasan,
  benar,
  keliru,
  ...(betul ? { betul: true } : {}),
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

/* ------------------------------ Concrete: bedeng tanah dengan hasil kebun beremoji ------------------------------ */
const C = kelompok("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Bedeng Bibit 2: bedeng di sudut kebun", "Bu Sari menyiapkan hasil kebun di bedeng sudut. Bantu Chacha membaginya sama banyak.", [
    salah(
      bg(8, "bibit", [5, 3]),
      "Chacha",
      "Delapan bibit aku bagi jadi lima dan tiga. Lima adalah setengah dari delapan.",
      "5",
      [
        "Chacha benar, karena lima adalah bagian yang paling banyak.",
        "Dua bagian harus sama banyak. Lima dan tiga tidak sama, jadi lima bukan setengah. Setengah dari delapan adalah empat.",
        "Chacha benar, karena lima ditambah tiga sama dengan delapan.",
      ],
      1,
      "Chacha hanya melihat bagian yang lebih banyak. Setengah harus sama banyak: delapan dibagi dua sama banyak menjadi empat dan empat.",
    ),
    gl(6, 3, "tomat"),
    nr(7, 3, "wortel"),
    kl(3, 6, "jagung"),
  ]),
  C(3, "kanvas", "Misi Bedeng Bibit 3: catatan Dika", "Dika mencatat hasil bagi di papan nama tanaman. Hitung, lalu tulis jawabanmu di kanvas.", [bg(10, "apel"), gl(8, 2, "terong"), nr(7, 1, "cabai"), kl(4, 8, "bunga")]),
  C(4, "suara", "Misi Bedeng Bibit 4: panggilan Bu Sari", "Bu Sari memanggil dari pagar bambu. Jawab dengan suaramu.", [bg(6, "wortel"), gl(10, 4, "tomat"), nr(5, 5, "bunga"), kl(4, 10, "apel")]),
];

/* ------------------------------ Pictorial: kisi titik di kertas petak ------------------------------ */
const Pi = kelompok("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Bedeng Bibit 5: kisi titik", "Nia menggambar kisi titik untuk denah bedeng. Periksa dan bagi titiknya.", [
    salah(
      bg(7, undefined, [3, 3]),
      "Nia",
      "Tujuh titik aku bagi dua sama banyak, tiga dan tiga. Jadi setengah dari tujuh adalah tiga.",
      undefined,
      [
        "Nia benar, karena tiga dan tiga sama banyak.",
        "Nia hanya melihat dua bagian yang sama banyak. Masih tersisa satu titik, jadi tujuh tidak punya setengah utuh.",
        "Nia benar, karena tiga adalah bilangan yang kecil.",
      ],
      1,
      "Dua bagian tiga dan tiga memang sama banyak, tetapi masih tersisa satu titik yang tidak terbagi. Tujuh tidak habis dibagi dua sama banyak.",
    ),
    gl(8, 4),
    nr(9, 1),
    kl(2, 4),
  ]),
  Pi(6, "kanvas", "Misi Bedeng Bibit 6: lembar Dika", "Dika menggambar lembar titik. Hitung, lalu tulis jawabanmu di kanvas.", [bg(6), gl(10, 3), nr(6, 2), kl(3, 6)]),
  Pi(7, "suara", "Misi Bedeng Bibit 7: lapor ke Bu Sari", "Nia melaporkan lembar titiknya kepada Bu Sari. Sebutkan jawabanmu.", [bg(8), gl(6, 2), nr(6, 4), kl(5, 10)]),
];

/* ------------------------------ Abstract: lembar tabel dengan kata dan bilangan ------------------------------ */
const A = kelompok("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Bedeng Bibit 8: lembar tabel", "Lembar tabel hanya berisi kata dan bilangan.", [
    salah(
      bg(9, undefined, [4, 4]),
      "Chacha",
      "Sembilan tidak bisa dibagi dua sama banyak tanpa memecah benda.",
      undefined,
      [
        "Chacha benar, karena sembilan dibagi satu-satu menyisakan satu benda yang tidak punya pasangan.",
        "Chacha salah, karena sembilan adalah bilangan yang besar.",
        "Chacha salah, karena empat dan empat sama banyak.",
      ],
      0,
      "Sembilan dibagi satu-satu menjadi empat dan empat, lalu masih tersisa satu. Karena benda tidak boleh dipecah, Chacha benar.",
      true,
    ),
    gl(10, 2),
    nr(5, 1),
    kl(4, 8),
  ]),
  A(9, "kanvas", "Misi Bedeng Bibit 9: tulis di lembar", "Chacha meminta kamu menulis jawaban di kanvas.", [bg(4), gl(10, 1), nr(7, 1), kl(2, 4)]),
  A(10, "suara", "Misi Bedeng Bibit 10: pengumuman Bu Sari", "Pengumuman untuk semua penyiram. Bacakan jawabannya.", [bg(10), gl(8, 3), nr(4, 4), kl(3, 7)]),
];

export const POIN_PENTING = [
  "Setengah dari kumpulan benda adalah satu dari dua bagian yang sama banyak.",
  "Bagi satu-satu sampai habis, lalu hitung benda di satu bagian.",
  "Kalau dua bagian tidak sama banyak, itu bukan setengah.",
  "Setengah dari empat adalah dua, dari enam tiga, dari delapan empat, dan dari sepuluh lima.",
  "Bilangan ganjil tersisa satu, jadi tidak punya setengah utuh bila benda tidak dipecah.",
  "Dua kali setengahnya sama dengan seluruhnya, dan dua setengah digabung kembali menjadi seluruhnya.",
];
/** Poin penting untuk suara (tanpa digit). */
export const POIN_PENTING_SUARA = POIN_PENTING;

/** Penutup tahap Abstract Sub-Bab B: jembatan ke Sub-Bab C. */
export const PENUTUP_B = "Dua petak sudah terisi sama banyak. Sebentar lagi Pak Joko datang membawa satu labu besar yang harus dibagi untuk empat orang. Ayo lanjut ke Sub-Bab berikutnya!";

export const TEMA_BIBIT = {
  concrete: { ikon: "\u{1F331}", nama: "Concrete", cara: "Bedeng tanah: hasil kebun beremoji untuk dibagi satu-satu, diseimbangkan, dan digandakan" },
  pictorial: { ikon: "\u{1F4D0}", nama: "Pictorial", cara: "Kisi titik: titik polos untuk dibagi, dipindahkan, dan dibandingkan" },
  abstract: { ikon: "\u{1F4DD}", nama: "Abstract", cara: "Lembar tabel: kata dan bilangan saja, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_BIBIT, PICTORIAL as PICTORIAL_BIBIT, ABSTRACT as ABSTRACT_BIBIT };
