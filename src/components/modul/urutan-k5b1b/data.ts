/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 5 Bab 1 Sub-Bab B "Urutan Tribun Pak Hasto" (membandingkan dari kiri, tanda, garis bilangan dengan patokan, dan urutan).
 * Misi lanjutan "Misi Urutan" (nomor misi berlanjut dari Simulasi). Data berbeda dari Story (empat tribun) dan dari Infografis: Concrete memakai papan tiket beremoji lama
 * (tiket musim, parkir, perlengkapan suporter), Pictorial memakai diagram polos (tiket blok, kursi, alat sorak), Abstract memakai kartu angka panitia (kios, catatan, gerbang).
 * Jawaban benar dihitung dari bilangan di papan (lihat logika-cpa.ts). Angka jawaban Tulis di kanvas per tahap: Concrete 4, 3, 1, 2; Pictorial 5, 4, 6, 3; Abstract 3, 4, 5, 2 (tidak kembar dalam satu tahap).
 * Abstract diakhiri Poin Penting dengan jembatan ke Sub-Bab C (Bu Lestari datang membawa bundel tiket). Diuji: scripts/uji-urutan-k5b1b.mjs.
 */
import type { Cara, DasarSalah, Langkah, LangkahSalah, LangkahSoal, Rupa, SoalMisi } from "./logika-cpa";
import { URUT_METODE, instruksi, ucapkan } from "./logika-cpa";

export { MISI_URUTAN_TEKS } from "./data-sim";

type S3 = [string, string, string];
const tanda = (p: string, a: number, b: number, pil?: S3): Langkah => ({ tipe: "tanda", p, a, b, ...(pil ? { pil } : {}) });
const banyak = (p: string, a: number): Langkah => ({ tipe: "banyakAngka", p, a });
const sebutTanda = (p: string, a: number, b: number): Langkah => ({ tipe: "sebutTanda", p, a, b });
const penentu = (p: string, a: number, b: number, pil?: S3): Langkah => ({ tipe: "penentu", p, a, b, ...(pil ? { pil } : {}) });
const kolomKe = (p: string, a: number, b: number): Langkah => ({ tipe: "kolomKe", p, a, b });
const mana = (p: string, a: number, b: number): Langkah => ({ tipe: "mana", p, a, b });
const ruas = (p: string, a: number, pil?: S3): Langkah => ({ tipe: "ruas", p, a, ...(pil ? { pil } : {}) });
const patKiri = (p: string, a: number): Langkah => ({ tipe: "patKiri", p, a });
const kanan = (p: string, t: number[]): Langkah => ({ tipe: "kanan", p, t });
const dekat = (p: string, a: number, pil?: S3): Langkah => ({ tipe: "dekat", p, a, ...(pil ? { pil } : {}) });
const urutKe = (p: string, a: number): Langkah => ({ tipe: "urutKe", p, a });
const sisi = (p: string, a: number, pat: number): Langkah => ({ tipe: "sisi", p, a, pat });
const salah = (dasar: Langkah, tokoh: string, kataTokoh: string, jawabTokoh: string, alasan: S3, benar: number, betul = false, posisi?: number): LangkahSalah => ({
  tipe: "salah",
  dasar: dasar as DasarSalah,
  tokoh,
  kataTokoh: ucapkan(kataTokoh),
  jawabTokoh,
  alasan,
  benar,
  ...(betul ? { betul } : {}),
  ...(posisi !== undefined ? { posisi } : {}),
});

/** Empat langkah satu misi, berurut metode: IGIL, Left First, Line It Up, Pick a Marker. */
const satuMisi =
  (rupa: Rupa) =>
  (nomor: number, cara: Cara, judul: string, cerita: string, isiMisi: [Langkah, Langkah, Langkah, Langkah]): SoalMisi => ({
    nomor,
    judul,
    cerita,
    cara,
    langkah: isiMisi.map((l, i): LangkahSoal => {
      const s = instruksi(l, rupa, cara, URUT_METODE[i]);
      return { metode: URUT_METODE[i], cara, judul: s, suara: s, langkah: l };
    }),
  });

/* ------------------------------ Concrete: papan tiket beremoji ------------------------------ */
const C = satuMisi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Urutan 2: papan tiket", "Pak Hasto memasang papan tiket di pintu stadion. Periksa bilangannya.", [
    salah(
      tanda("tiket", 1, 0, ["lebih besar (>)", "sama dengan (=)", "lebih kecil (<)"]),
      "Fajar",
      "7.999 lebih besar karena 7 lebih besar daripada 1.",
      "lebih besar (>)",
      [
        "Angka pertama dari kiri selalu menentukan hasilnya, berapa pun banyak angka kedua bilangan.",
        "Bilangan dengan angka lebih banyak pasti lebih besar, jadi lima angka menang atas empat angka.",
        "Dua bilangan hanya boleh dibandingkan kalau keduanya punya banyak angka yang persis sama.",
      ],
      1,
      false,
      2,
    ),
    penentu("tiket", 2, 3, ["puluhan", "ratusan", "ribuan"]),
    ruas("tiket", 2, ["antara 50.000 dan 60.000", "antara 30.000 dan 40.000", "antara 40.000 dan 50.000"]),
    dekat("tiket", 2, ["60.000", "40.000", "50.000"]),
  ]),
  C(3, "kanvas", "Misi Urutan 3: catatan Citra", "Citra mencatat parkir stadion. Periksa catatannya, lalu tulis jawabanmu di kanvas.", [banyak("parkir", 1), kolomKe("parkir", 0, 3), patKiri("parkir", 2), urutKe("parkir", 2)]),
  C(4, "suara", "Misi Urutan 4: panggilan Pak Hasto", "Pak Hasto memanggil lewat pengeras suara. Jawab dengan suaramu.", [sebutTanda("suporter", 0, 3), mana("suporter", 3, 2), kanan("suporter", [0, 2, 1]), sisi("suporter", 1, 30000)]),
];

/* ------------------------------ Pictorial: diagram polos ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Urutan 5: diagram Bima", "Bima menggambar diagram tiket tiap blok. Periksa diagramnya.", [
    tanda("musim", 2, 3, ["sama dengan (=)", "lebih kecil (<)", "lebih besar (>)"]),
    salah(
      penentu("musim", 0, 1, ["ribuan", "ratusan", "puluhan"]),
      "Citra",
      "Dua angka pertama sama, jadi penentunya di ratusan, tempat 2 dan 0 berbeda.",
      "ratusan",
      [
        "Penentunya harus selalu kolom paling kiri, apa pun angka yang tertulis pada kedua bilangan.",
        "Angka yang sama digeser dari kiri, dan ratusan adalah tempat pertama yang berbeda di sini.",
        "Penentu hanyalah kolom yang angkanya paling besar pada salah satu dari kedua bilangan itu.",
      ],
      1,
      true,
      0,
    ),
    ruas("musim", 1, ["antara 40.000 dan 50.000", "antara 60.000 dan 70.000", "antara 50.000 dan 60.000"]),
    dekat("musim", 0, ["50.000", "60.000", "70.000"]),
  ]),
  Pi(6, "kanvas", "Misi Urutan 6: diagram kursi", "Bima membuat diagram kursi tiap tribun. Periksa diagramnya, lalu tulis jawabanmu di kanvas.", [banyak("kursi", 0), kolomKe("kursi", 0, 1), patKiri("kursi", 0), urutKe("kursi", 0)]),
  Pi(7, "suara", "Misi Urutan 7: lapor ke Pak Arif", "Bima melaporkan diagramnya kepada Pak Arif. Sebutkan jawabanmu.", [sebutTanda("sorak", 3, 1), mana("sorak", 1, 2), kanan("sorak", [0, 1, 2]), sisi("sorak", 0, 50000)]),
];

/* ------------------------------ Abstract: kartu angka panitia ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Urutan 8: kartu panitia", "Kartu panitia stadion hanya berisi kata dan angka.", [
    tanda("kios", 0, 1, ["lebih kecil (<)", "lebih besar (>)", "sama dengan (=)"]),
    penentu("kios", 2, 3, ["ratusan", "puluhan", "satuan"]),
    ruas("kios", 2, ["antara 10.000 dan 20.000", "antara 20.000 dan 30.000", "antara 30.000 dan 40.000"]),
    salah(
      dekat("kios", 4, ["40.000", "30.000", "20.000"]),
      "Fajar",
      "31.800 paling dekat dengan 40.000, karena 8 itu besar.",
      "40.000",
      [
        "Selisih ke tiga puluh ribu hanya seribu delapan ratus, lebih kecil daripada ke empat puluh ribu.",
        "Patokan yang lebih besar selalu lebih dekat karena angkanya lebih besar daripada bilangan itu.",
        "Bilangan hanya boleh dibandingkan dengan patokan yang banyak angkanya sama dengan bilangan itu.",
      ],
      0,
      false,
      1,
    ),
  ]),
  A(9, "kanvas", "Misi Urutan 9: tulis di kartu", "Citra meminta kamu menulis jawaban di kanvas.", [banyak("catatan", 0), kolomKe("catatan", 1, 2), patKiri("catatan", 1), urutKe("catatan", 3)]),
  A(10, "suara", "Misi Urutan 10: laporan akhir", "Laporan akhir gerbang stadion untuk Pak Hasto. Ucapkan jawabannya.", [sebutTanda("gerbang", 0, 2), mana("gerbang", 0, 1), kanan("gerbang", [3, 4, 0]), sisi("gerbang", 2, 20000)]),
];

export const POIN_PENTING = [
  "Bandingkan banyak angkanya dulu: bilangan yang angkanya lebih banyak pasti lebih besar.",
  "Kalau banyak angkanya sama, bandingkan dari kiri dan geser ke kanan sampai angkanya berbeda.",
  "Tanda lebih besar, lebih kecil, dan sama dengan menyatakan hasil membandingkan, dan mulutnya terbuka ke bilangan yang lebih besar.",
  "Urutan naik dari yang paling kecil ke yang paling besar, dan urutan turun sebaliknya.",
  "Pada garis bilangan, makin ke kanan makin besar, dan patokan seperti 10.000 membantu meletakkan bilangan.",
  "Kiri Dulu, Letakkan di Garis, dan Pilih Patokan membantu membandingkan dan mengurutkan dengan teliti.",
];
/** Poin penting untuk suara (tanpa digit): angka dan tanda menjadi kata. */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => ucapkan(p));

/** Jembatan ke Sub-Bab C (diucapkan setelah Poin Penting): tamu berikutnya datang dengan masalah baru. */
export const PENUTUP_B =
  "Bu Lestari, bendahara klub, datang membawa bundel tiket dan kotak kas. Ia ingin menyusun tiket Tribun Utara dari bundel kardus, dus, pak, dan ikat. Menurutmu, adakah lebih dari satu cara menyusunnya? Ayo kita bantu di Sub-Bab berikutnya!";

export const TEMA_URUTAN = {
  concrete: { ikon: "\u{1F3AB}", nama: "Concrete", cara: "Papan tiket stadion: kartu bilangan beremoji yang dibandingkan, diletakkan di garis, dan diurutkan" },
  pictorial: { ikon: "\u{1F4D0}", nama: "Pictorial", cara: "Kertas garis bilangan: papan kolom dan garis berpatokan polos yang dibaca dan digambar" },
  abstract: { ikon: "\u{1F4DC}", nama: "Abstract", cara: "Lembar angka panitia stadion: kartu kata dan angka bercap, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_URUTAN, PICTORIAL as PICTORIAL_URUTAN, ABSTRACT as ABSTRACT_URUTAN };
