/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 3 Bab 3 Sub-Bab D "Bandul Dokter Hana" (hubungan kilogram, ons, dan gram), akhir cerita Kebun Binatang Mini.
 * Misi lanjutan "Misi Meja Bandul" (nomor misi berlanjut dari Simulasi). Berat berbeda dari Story (1.200, 3.000, 2.000, 1.250, 2.300, 1.400, 3.700, 5.000, 2.200, 2.800, 2.500, 3.800).
 * Concrete memakai benda beremoji kebun binatang (wortel, apel, jagung, telur, kaleng, karung) dan bandul logam di meja periksa dokter hewan,
 * Pictorial memakai bandul logam polos, tabel tempat angka, garis bilangan ganda, dan potongan seribu gram di kertas biru pucat, Abstract memakai kartu kata dan angka di rekam medis hewan.
 * Jawaban beragam: memilih ukuran bersatuan, menulis satu angka di kanvas (angka tempat atau banyak kilogram, ons, atau lompatan), dan mengucapkan satu kata (kali, bagi, gram, kilogram) atau bilangan pendek.
 * Kunci dihitung dari data. Angka jawaban Tulis di kanvas per tahap: Concrete 6, 7, 5, 8; Pictorial 4, 3, 7, 6; Abstract 4, 7, 5, 8 (tidak kembar dalam satu tahap).
 * Diuji: scripts/uji-bandul-k3b3d.mjs.
 */
import type { Benda, Cara, Langkah, LangkahSalah, LangkahSoal, LBandul, LGabung, LGaris, LOns, LPecah, LTabel, LUbah, Rupa, SetBandul, SoalMisi } from "./logika-cpa";
import { URUT_METODE, instruksi, kataBil } from "./logika-cpa";

export { MISI_BANDUL_TEKS } from "./data-sim";

const ub = (arah: LUbah["arah"], kg: number, g: number, benda: Benda, kanvas: LUbah["kanvas"], suara: LUbah["suara"] = "operasi"): LUbah => ({ tipe: "ubah", arah, kg, g, benda, kanvas, suara });
const gb = (op: LGabung["op"], a: number, b: number, benda: Benda, kanvas: LGabung["kanvas"], suara: LGabung["suara"] = "operasi"): LGabung => ({ tipe: "gabung", op, a, b, benda, kanvas, suara });
const bd = (set: SetBandul, benda: Benda, kanvas: LBandul["kanvas"], suara: LBandul["suara"] = "satuOns"): LBandul => ({ tipe: "bandul", set, benda, kanvas, suara });
const on = (arah: LOns["arah"], n: number, benda: Benda, kanvas: LOns["kanvas"]): LOns => ({ tipe: "ons", arah, n, benda, kanvas, suara: "hasil" });
const tb = (kg: number, g: number, benda: Benda, kanvas: LTabel["kanvas"], suara: LTabel["suara"] = "kg"): LTabel => ({ tipe: "tabel", kg, g, benda, kanvas, suara });
const gr = (arah: LGaris["arah"], kg: number, setengah: boolean, benda: Benda, kanvas: LGaris["kanvas"], suara: LGaris["suara"] = "hasil"): LGaris => ({ tipe: "garis", arah, kg, setengah, benda, kanvas, suara });
const pc = (total: number, benda: Benda, kanvas: LPecah["kanvas"], suara: LPecah["suara"] = "hasil"): LPecah => ({ tipe: "pecah", total, benda, kanvas, suara });
const salah = (dasar: LUbah, tokoh: string, kataTokoh: string, jawabTokoh: string, alasan: [string, string, string], benar: number, keliru: string, betul = false): LangkahSalah => ({
  tipe: "salah",
  dasar,
  tokoh,
  kataTokoh,
  jawabTokoh,
  alasan,
  benar,
  keliru,
  ...(betul ? { betul: true } : {}),
});

/** Empat langkah satu misi, berurut metode: IGIL, Place Value Chart, Double Number Line, Chunking. */
const satuMisi =
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

/* ------------------------------ Concrete: meja periksa dokter hewan dengan benda beremoji dan bandul ------------------------------ */
const C = satuMisi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Meja Bandul 2: catatan meja periksa", "Dokter Hana mencatat berat pakan di meja periksa. Lihat benda dan bandulnya, lalu ubah satuan beratnya dengan cara yang tepat.", [
    salah(
      ub("kg-g", 4, 0, "wortel", "ribu"),
      "Raka",
      `Empat kilogram dikali seratus, jadi empat ratus gram. Kalau salah, aku menyikat semua kandang kelinci!`,
      "400 g",
      [
        "Raka benar, satu kilogram sama dengan seratus gram.",
        "Raka keliru: satu kilogram sama dengan seribu gram, jadi empat kilogram dikali seribu.",
        "Raka keliru karena kilogram tidak bisa diubah ke gram.",
      ],
      1,
      `Raka mengalikan dengan seratus. Satu kilogram sama dengan seribu gram, jadi ${kataBil(4)} kali seribu sama dengan ${kataBil(4000)} gram.`,
    ),
    tb(2, 350, "apel", "puluh", "nGram"),
    gr("kg-g", 6, false, "jagung", "lompat", "atas"),
    pc(7800, "telur", "potong", "hasil"),
  ]),
  C(3, "kanvas", "Misi Meja Bandul 3: catatan Salsa", "Salsa mencatat berat pakan di meja periksa. Periksa bendanya, lalu tulis jawabanmu di kanvas.", [
    bd([0, 1, 0, 1, 1], "kaleng", "ratus", "satuOns"),
    tb(3, 470, "karung", "puluh", "kg"),
    gr("kg-g", 4, true, "wortel", "ratus", "hasil"),
    pc(8340, "telur", "potong", "hasil"),
  ]),
  C(4, "suara", "Misi Meja Bandul 4: panggilan Dokter Hana", "Dokter Hana memanggil dari ruang periksa. Jawab dengan suaramu.", [
    ub("g-kg", 5, 600, "apel", "kg", "operasi"),
    tb(4, 250, "jagung", "ratus", "kg"),
    gr("kg-g", 7, false, "kaleng", "lompat", "bawah"),
    pc(6700, "karung", "potong", "hasil"),
  ]),
];

/* ------------------------------ Pictorial: kertas biru pucat dengan bandul polos, tabel, garis ganda, dan potongan ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Meja Bandul 5: gambar Bima", "Bima menggambar berat pakan di kertas biru. Periksa gambarnya.", [
    salah(
      ub("g-kg", 6, 0, "apel", "kg"),
      "Bima",
      `Enam ribu gram, tiap seribu gram menjadi satu kilogram, jadi enam kilogram.`,
      "6 kg",
      [
        "Bima keliru: gram diubah ke kilogram dengan dikalikan seribu.",
        "Bima keliru karena enam ribu gram sama dengan enam puluh kilogram.",
        "Bima benar: tiap seribu gram sama dengan satu kilogram, jadi enam ribu gram sama dengan enam kilogram.",
      ],
      2,
      `Jawaban Bima benar. Enam ribu gram dipecah menjadi enam potongan seribu gram, dan bila diperiksa, ${kataBil(6)} kilogram dikali seribu sama dengan ${kataBil(6000)} gram.`,
      true,
    ),
    tb(5, 180, "wortel", "ratus", "kg"),
    gr("g-kg", 3, true, "jagung", "ratus", "hasil"),
    pc(9250, "telur", "potong", "hasil"),
  ]),
  Pi(6, "kanvas", "Misi Meja Bandul 6: tabel Salsa", "Salsa menyusun tabel dan garis di kertas biru. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [
    gb("tambah", 1700, 2400, "kaleng", "kg", "operasi"),
    tb(6, 830, "karung", "puluh", "kg"),
    gr("kg-g", 7, false, "apel", "lompat", "hasil"),
    pc(5620, "wortel", "ratus", "hasil"),
  ]),
  Pi(7, "suara", "Misi Meja Bandul 7: lapor ke Dokter Hana", "Bima melaporkan gambarnya kepada Dokter Hana. Sebutkan jawabanmu.", [
    on("kg-ons", 3, "telur", "puluh"),
    tb(7, 450, "jagung", "ratus", "nKg"),
    gr("g-kg", 8, false, "kaleng", "lompat", "hasil"),
    pc(4730, "apel", "potong", "hasil"),
  ]),
];

/* ------------------------------ Abstract: rekam medis hewan dengan kartu kata dan angka ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Meja Bandul 8: rekam medis", "Rekam medis hewan hanya berisi kata dan angka.", [
    salah(
      ub("g-kg", 2, 400, "jagung", "kg"),
      "Salsa",
      `Dua ribu empat ratus gram sama dengan dua puluh empat kilogram.`,
      "24 kg",
      [
        "Salsa keliru: dua ribu empat ratus gram dipecah menjadi dua kilogram dan empat ratus gram.",
        "Salsa benar, gram selalu dibagi seratus untuk menjadi kilogram.",
        "Salsa keliru karena gram tidak boleh diubah ke kilogram.",
      ],
      0,
      `Salsa membagi dengan seratus. Ambil tiap seribu gram sebagai satu kilogram: dua ribu empat ratus gram sama dengan dua kilogram empat ratus gram.`,
    ),
    tb(3, 950, "wortel", "ratus", "kg"),
    gr("kg-g", 8, false, "karung", "lompat", "hasil"),
    pc(4910, "kaleng", "potong", "hasil"),
  ]),
  A(9, "kanvas", "Misi Meja Bandul 9: tulis di rekam medis", "Salsa meminta kamu menulis jawaban di kanvas.", [
    gb("kurang", 7100, 2600, "telur", "kg", "operasi"),
    tb(2, 760, "apel", "ratus", "kg"),
    gr("g-kg", 1, true, "jagung", "ratus", "hasil"),
    pc(3280, "wortel", "puluh", "hasil"),
  ]),
  A(10, "suara", "Misi Meja Bandul 10: laporan akhir", "Laporan akhir berat pakan untuk Dokter Hana. Bacakan jawabannya.", [
    on("ons-g", 6, "kaleng", "ratus"),
    tb(9, 120, "karung", "puluh", "nGram"),
    gr("kg-g", 4, false, "telur", "lompat", "atas"),
    pc(9700, "apel", "potong", "hasil"),
  ]),
];

export const POIN_PENTING = [
  "Timbangan kodok memakai lima bandul: setengah ons, satu ons, dua ons, setengah kilogram, dan satu kilogram.",
  "Berat benda sama dengan jumlah berat bandul yang membuat timbangan seimbang.",
  "1 kilogram sama dengan 1.000 gram dan sama dengan 10 ons, sedangkan 1 ons sama dengan 100 gram.",
  "Kilogram diubah ke gram dengan dikalikan 1.000.",
  "Gram diubah ke kilogram dengan mengambil tiap 1.000 gram sebagai 1 kilogram, misalnya 1.753 gram menjadi 1 kilogram 753 gram.",
  "Berat dijumlahkan atau dikurangkan setelah satuannya sama, misalnya diubah ke gram dulu.",
  "Tabel Tempat Angka, Garis Bilangan Ganda, dan Pecah Seribu-Seribu membantu mengubah satuan berat.",
];
/** Poin penting untuk suara (tanpa digit): angka dengan titik ribuan dibaca utuh. */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => p.replace(/\d[\d.]*\d|\d/g, (d) => kataBil(Number(d.replace(/\./g, "")))));

/** Penutup akhir cerita bab (Sub-Bab D). */
export const PENUTUP_D = "Semua hewan di Kebun Binatang Mini sudah mendapat kandang dan pakan yang pas. Terima kasih, Raka, Salsa, Bima, Pak Joko, Kak Tari, Pak Wayan, Bu Lastri, dan Dokter Hana!";

export const TEMA_BANDUL = {
  concrete: { ikon: "\u{2696}\u{FE0F}", nama: "Concrete", cara: "Meja periksa dokter hewan: benda beremoji kebun binatang, bandul logam, dan timbangan kodok" },
  pictorial: { ikon: "\u{1F4D0}", nama: "Pictorial", cara: "Kertas biru pucat: bandul logam polos, tabel tempat angka, garis bilangan ganda, dan potongan seribu gram" },
  abstract: { ikon: "\u{1F43E}", nama: "Abstract", cara: "Rekam medis hewan: kartu kata dan angka, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_BANDUL, PICTORIAL as PICTORIAL_BANDUL, ABSTRACT as ABSTRACT_BANDUL };
