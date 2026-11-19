/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 3 Bab 2 Sub-Bab B "Botol Air Pak Darto" (kalimat Matematika pengurangan), akhir cerita Perkemahan Akhir Pekan.
 * Misi lanjutan "Misi Pos Persediaan" (nomor misi berlanjut dari Simulasi). Bilangan berbeda dari Story (90, 35, 55, 40, 28, 68, 100, 45, 60, 27, 72, 80, 32, 48).
 * Concrete memakai benda beremoji perkemahan (botol, biskuit, kaleng, apel, roti; krat sepuluh) di rak kayu pos jaga dan garis tali,
 * Pictorial memakai bagan batang polos, segitiga keluarga fakta polos, dan garis bilangan polos di kertas milimeter, Abstract memakai kartu kata dan angka di lembar catatan jaga.
 * Jawaban beragam: memilih bilangan, menulis satu angka di kanvas (bilangan yang belum diketahui atau satu angkanya, langkah naik, lompatan puluhan, satuan),
 * dan mengucapkan satu kata (tambah, kurang, mundur) atau bilangan pendek. Kunci dihitung dari data.
 * Angka jawaban Tulis di kanvas per tahap: Concrete 6, 7, 3, 9; Pictorial 4, 6, 9, 3; Abstract 8, 7, 2, 1 (tidak kembar dalam satu tahap).
 * Diuji: scripts/uji-botol-k3b2b.mjs.
 */
import type { Benda, Cara, Langkah, LangkahSalah, LangkahSoal, LFakta, LGaris, LKalimat, LNaik, LPeriksa, Rupa, SoalMisi } from "./logika-cpa";
import { URUT_METODE, instruksi, kataBil } from "./logika-cpa";

export { MISI_PERSEDIAAN_TEKS } from "./data-sim";

const kal = (awal: number, kurang: number, sisa: number, hilang: "kurang" | "awal", benda: Benda, kanvas: LKalimat["kanvas"], suara: LKalimat["suara"] = "hilang"): LKalimat => ({ tipe: "kalimat", awal, kurang, sisa, hilang, benda, kanvas, suara });
const per = (awal: number, kurang: number, sisa: number, benda: Benda, kanvas: LPeriksa["kanvas"], suara: LPeriksa["suara"]): LPeriksa => ({ tipe: "periksa", awal, kurang, sisa, benda, kanvas, suara });
const fak = (awal: number, b1: number, b2: number, hilang: LFakta["hilang"], benda: Benda, kanvas: LFakta["kanvas"], suara: LFakta["suara"] = "hilang"): LFakta => ({ tipe: "fakta", awal, b1, b2, hilang, benda, kanvas, suara });
const naik = (awal: number, sisa: number, benda: Benda, kanvas: LNaik["kanvas"]): LNaik => ({ tipe: "naik", awal, sisa, benda, kanvas, suara: "jarak" });
const gar = (awal: number, kurang: number, benda: Benda, kanvas: LGaris["kanvas"], suara: LGaris["suara"] = "sisa"): LGaris => ({ tipe: "garis", awal, kurang, benda, kanvas, suara });
const salah = (dasar: LKalimat, tokoh: string, kataTokoh: string, jawabTokoh: string, alasan: [string, string, string], benar: number, keliru: string, betul = false): LangkahSalah => ({
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

/** Empat langkah satu misi, berurut metode: IGIL, Fact Family, Counting Up, Number Line. */
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

/* ------------------------------ Concrete: rak kayu pos jaga dengan benda beremoji ------------------------------ */
const C = satuMisi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Pos Persediaan 2: catatan rak pos", "Pak Darto mencatat persediaan di rak pos jaga. Hitung benda di rak, lalu cari bilangan yang belum diketahui dengan cara yang tepat.", [
    salah(
      kal(37, 14, 23, "awal", "botol", "satuan"),
      "Raka",
      `Banyak botol mula-mula belum diketahui. Kalimatnya titik-titik dikurangi ${kataBil(14)} sama dengan ${kataBil(23)}. Aku kurangkan saja: ${kataBil(23)} dikurangi ${kataBil(14)}, jadi ${kataBil(9)}.`,
      "9",
      [
        "Raka benar, selisih kedua bilangan itu pasti jawabannya.",
        "Raka keliru: botol yang dibagikan dan botol yang tersisa dulunya satu tumpukan, jadi harus ditambahkan, bukan dikurangkan.",
        "Raka keliru karena bilangan awal harus lebih kecil daripada sisa.",
      ],
      1,
      `Raka mengurangkan dua bilangan yang seharusnya digabung. Bilangan awal dicari dengan menambah: ${kataBil(14)} tambah ${kataBil(23)} sama dengan ${kataBil(37)}.`,
    ),
    fak(64, 26, 38, "b1", "biskuit", "satuan", "operasi"),
    naik(70, 46, "kaleng", "langkah"),
    gar(84, 37, "apel", "satuan", "sisa"),
  ]),
  C(3, "kanvas", "Misi Pos Persediaan 3: catatan Salsa", "Salsa mencatat persediaan di pos jaga. Periksa bendanya, lalu tulis jawabanmu di kanvas.", [
    kal(52, 6, 46, "kurang", "roti", "hilang"),
    fak(71, 34, 37, "awal", "botol", "puluhan"),
    naik(50, 37, "biskuit", "langkah"),
    gar(76, 29, "kaleng", "satuan"),
  ]),
  C(4, "suara", "Misi Pos Persediaan 4: panggilan Pak Darto", "Pak Darto memanggil dari pos jaga. Jawab dengan suaramu.", [
    kal(53, 19, 34, "awal", "apel", "satuan", "operasi"),
    fak(91, 38, 53, "b2", "roti", "satuan", "hilang"),
    naik(70, 57, "botol", "langkah"),
    gar(65, 26, "biskuit", "puluh", "arah"),
  ]),
];

/* ------------------------------ Pictorial: kertas milimeter dengan bagan batang, segitiga, dan garis bilangan polos ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Pos Persediaan 5: bagan Bima", "Bima menggambar bagan persediaan di kertas milimeter. Periksa gambarnya.", [
    salah(
      kal(83, 54, 29, "kurang", "botol", "satuan"),
      "Bima",
      `Bilangan awal ${kataBil(83)} dan sisa ${kataBil(29)}. Bilangan yang dikurangkan adalah ${kataBil(83)} dikurangi ${kataBil(29)}, jadi ${kataBil(54)}.`,
      "54",
      [
        "Bima keliru: bilangan yang dikurangkan harus dicari dengan menambah awal dan sisa.",
        "Bima keliru karena awal tidak boleh dikurangi sisa.",
        "Bima benar: bilangan yang dikurangkan dicari dengan bilangan awal dikurangi dengan sisa.",
      ],
      2,
      `Jawaban Bima benar. Bilangan yang dikurangkan memang dicari dengan awal dikurangi sisa, dan bila diperiksa, ${kataBil(83)} dikurangi ${kataBil(54)} sama dengan ${kataBil(29)}.`,
      true,
    ),
    fak(76, 47, 29, "b1", "biskuit", "satuan"),
    naik(70, 36, "kaleng", "langkah"),
    gar(92, 56, "apel", "satuan"),
  ]),
  Pi(6, "kanvas", "Misi Pos Persediaan 6: segitiga Salsa", "Salsa menyusun keluarga bilangan dan garis bilangan. Periksa gambarnya, lalu tulis jawabanmu di kanvas.", [
    kal(64, 25, 39, "awal", "roti", "satuan"),
    fak(62, 56, 6, "b2", "botol", "hilang"),
    naik(70, 41, "biskuit", "langkah"),
    gar(87, 34, "kaleng", "puluh"),
  ]),
  Pi(7, "suara", "Misi Pos Persediaan 7: lapor ke Pak Darto", "Bima melaporkan gambarnya kepada Pak Darto. Sebutkan jawabanmu.", [
    per(79, 33, 46, "apel", "satuan", "hasil"),
    fak(85, 39, 46, "b1", "roti", "satuan", "operasi"),
    naik(50, 21, "botol", "langkah"),
    gar(75, 31, "biskuit", "satuan", "sisa"),
  ]),
];

/* ------------------------------ Abstract: lembar catatan jaga dengan kartu kata dan angka ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Pos Persediaan 8: lembar catatan", "Lembar catatan jaga hanya berisi kata dan angka.", [
    salah(
      kal(57, 23, 34, "awal", "kaleng", "satuan"),
      "Raka",
      `Kalimatnya titik-titik dikurangi ${kataBil(23)} sama dengan ${kataBil(34)}. Dua bilangan itu kukurangkan: ${kataBil(34)} dikurangi ${kataBil(23)}, jadi ${kataBil(11)}.`,
      "11",
      [
        "Raka benar, bilangan yang belum diketahui selalu dicari dengan mengurangkan.",
        "Raka keliru karena sisa tidak boleh dipakai untuk mencari bilangan awal.",
        "Raka keliru: bilangan awal dicari dengan menambah bilangan yang dikurangkan dan sisa.",
      ],
      2,
      `Raka salah memilih operasi. Bilangan awal harus lebih besar daripada keduanya, yaitu ${kataBil(23)} tambah ${kataBil(34)} sama dengan ${kataBil(57)}.`,
    ),
    fak(88, 49, 39, "b2", "apel", "satuan"),
    naik(30, 17, "roti", "langkah"),
    gar(98, 52, "botol", "satuan"),
  ]),
  A(9, "kanvas", "Misi Pos Persediaan 9: tulis di lembar", "Salsa meminta kamu menulis jawaban di kanvas.", [
    per(63, 25, 38, "kaleng", "satuan", "hasil"),
    fak(57, 24, 33, "awal", "biskuit", "satuan"),
    naik(50, 26, "botol", "puluh"),
    gar(94, 41, "apel", "satuan"),
  ]),
  A(10, "suara", "Misi Pos Persediaan 10: laporan akhir", "Laporan akhir persediaan untuk Pak Darto. Bacakan jawabannya.", [
    kal(74, 43, 31, "kurang", "roti", "satuan", "hilang"),
    fak(96, 52, 44, "awal", "kaleng", "satuan", "operasi"),
    naik(30, 14, "apel", "langkah"),
    gar(93, 26, "botol", "puluh", "arah"),
  ]),
];

export const POIN_PENTING = [
  "Kalimat Matematika pengurangan boleh memuat titik-titik untuk bilangan yang belum diketahui.",
  "Bilangan yang dikurangkan dicari dengan bilangan awal dikurangi sisa.",
  "Bilangan awal dicari dengan menambahkan bilangan yang dikurangkan dan sisa.",
  "Bagan batang menunjukkan bilangan awal di atas dan dua bagian di bawahnya.",
  "Hasil diperiksa dengan mengurangkan lagi: awal dikurangi yang dikurangkan harus sama dengan sisa.",
  "Bila hanya bilangan awal yang diketahui, ada banyak kemungkinan pasangan yang dikurangkan dan sisa, misalnya untuk 100.",
  "Keluarga Fakta, Menghitung Naik, dan Garis Bilangan membantu mencari bilangan yang belum diketahui.",
];
/** Poin penting untuk suara (tanpa digit). */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => p.replace(/\d+/g, (d) => kataBil(Number(d))));

/** Penutup akhir cerita bab (Sub-Bab B). */
export const PENUTUP_B = "Api unggun menyala, dan perkemahan akhir pekan berakhir dengan gembira. Terima kasih, Raka, Salsa, Bima, Pak Joko, Kak Rina, dan Pak Darto!";

export const TEMA_BOTOL = {
  concrete: { ikon: "\u{1F37C}", nama: "Concrete", cara: "Rak kayu pos jaga: benda beremoji perkemahan, krat sepuluh, dan garis tali" },
  pictorial: { ikon: "\u{1F4D0}", nama: "Pictorial", cara: "Kertas milimeter: bagan batang polos, segitiga keluarga, dan garis bilangan" },
  abstract: { ikon: "\u{1F4DD}", nama: "Abstract", cara: "Lembar catatan jaga: kartu kata dan angka, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_BOTOL, PICTORIAL as PICTORIAL_BOTOL, ABSTRACT as ABSTRACT_BOTOL };
