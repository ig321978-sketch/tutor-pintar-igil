/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 5 Bab 2 Sub-Bab E "Papan Bilangan Kak Lintang" (bilangan prima, saringan Eratosthenes, faktorisasi prima dengan pohon faktor,
 * KPK dan FPB dari faktorisasi prima, pembagian berulang), akhir cerita Pasar Kuliner Malam. Mengikuti rujukan resmi Bab 2 Sub-Bab E (hlm. 53-59).
 * Misi lanjutan "Misi Papan" (nomor misi berlanjut dari Simulasi). Data berbeda dari Story (papan satu sampai seratus, 12 dan 18, 24, 30 dan 45, 72) dan dari Infografis:
 * tugas memakai kios es dan teh, jadwal lampu, dan tabel bilangan pasar. Concrete memakai papan bilangan pasar (kartu dan lampion beremoji lama), Pictorial memakai diagram polos
 * (tabel bilangan, pohon faktor, tabel pembagian berulang), Abstract memakai kartu kata dan angka bercap pengelola. Jawaban benar dihitung dari logika-data.ts (lihat logika-cpa.ts).
 * Angka jawaban Tulis di kanvas per tahap: Concrete 2, 7, 3, 4; Pictorial 1, 6, 3, 5; Abstract 3, 6, 4, 5 (tidak kembar dalam satu tahap).
 * Diuji: scripts/uji-papan-k5b2e.mjs.
 */
import type { Cara, DasarSalah, Langkah, LangkahSalah, LangkahSoal, LBanyakPrima, LBerikut, LFaktor, LHapus, LKlaimPrima, LPrima, LRencana, LUlang, Rupa, SoalMisi } from "./logika-cpa";
import { URUT_METODE, instruksi, suaraTugas, ucapkan } from "./logika-cpa";

export { MISI_PAPAN_TEKS } from "./data-sim";

type S3 = [string, string, string];
const rencana = (r: number, pil?: S3): LRencana => ({ tipe: "rencana", r, ...(pil ? { pil } : {}) });
const prima = (pil: S3): LPrima => ({ tipe: "prima", pil });
const hapus = (batas: number, p: number, hasil: LHapus["hasil"], pil?: S3): LHapus => ({ tipe: "hapus", batas, p, hasil, ...(pil ? { pil } : {}) });
const banyakPrima = (batas: number): LBanyakPrima => ({ tipe: "banyakPrima", batas });
const berikut = (sesudah: number, batas: number): LBerikut => ({ tipe: "berikut", sesudah, batas });
const klaimPrima = (n: number): LKlaimPrima => ({ tipe: "klaimPrima", n });
const faktor = (n: number, hasil: LFaktor["hasil"], pil?: S3): LFaktor => ({ tipe: "faktor", n, hasil, ...(pil ? { pil } : {}) });
const ulang = (bil: number[], hasil: LUlang["hasil"], o: { ke?: number; klaim?: number; satuan?: string; nama?: string[]; pil?: S3 } = {}): LUlang => ({
  tipe: "ulang",
  bil,
  hasil,
  ...(o.ke !== undefined ? { ke: o.ke } : {}),
  ...(o.klaim !== undefined ? { klaim: o.klaim } : {}),
  ...(o.satuan ? { satuan: o.satuan } : {}),
  ...(o.nama ? { nama: o.nama } : {}),
  ...(o.pil ? { pil: o.pil } : {}),
});
const salah = (dasar: DasarSalah, tokoh: string, kataTokoh: string, jawabTokoh: string, alasan: S3, benar: number, betul = false, posisi?: number): LangkahSalah => ({
  tipe: "salah",
  dasar,
  tokoh,
  kataTokoh,
  jawabTokoh,
  alasan,
  benar,
  ...(betul ? { betul } : {}),
  ...(posisi !== undefined ? { posisi } : {}),
});

/** Empat langkah satu misi, berurut metode: IGIL, Sieve It, Factor Tree, Divide Down. */
const satuMisi =
  (rupa: Rupa) =>
  (nomor: number, cara: Cara, judul: string, cerita: string, isiMisi: [Langkah, Langkah, Langkah, Langkah]): SoalMisi => ({
    nomor,
    judul,
    cerita,
    cara,
    langkah: isiMisi.map((l, i): LangkahSoal => ({ metode: URUT_METODE[i], cara, judul: instruksi(l, rupa, cara, URUT_METODE[i]), suara: suaraTugas(l, rupa, cara, URUT_METODE[i]), langkah: l })),
  });

/* ------------------------------ Concrete: papan bilangan pasar beremoji ------------------------------ */
const C = satuMisi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Papan 2: papan Kak Lintang", "Kak Lintang menggantung papan bilangan di tenda pasar. Periksa papannya.", [
    rencana(0),
    salah(
      prima(["9", "13", "15"]),
      "Fajar",
      "9 itu bilangan prima, karena ganjil.",
      "9",
      ["9 habis dibagi 3, jadi punya faktor 1, 3, dan 9.", "Semua bilangan ganjil pasti prima, jadi 9 memang bilangan prima.", "Bilangan prima adalah bilangan yang habis dibagi dua tanpa sisa."],
      0,
      false,
      1,
    ),
    faktor(20, "daun", ["2 × 10", "2 × 2 × 5", "4 × 5"]),
    ulang([8, 20], "kpk", { satuan: "menit", nama: ["Kios es", "Kios teh"], pil: ["160 menit", "40 menit", "20 menit"] }),
  ]),
  C(3, "kanvas", "Misi Papan 3: catatan Citra", "Citra mencatat di papan bilangan. Periksa papannya, lalu tulis jawabanmu di kanvas.", [
    rencana(1),
    hapus(40, 5, "banyak"),
    faktor(28, "banyak"),
    ulang([14, 15], "banyak"),
  ]),
  C(4, "suara", "Misi Papan 4: panggilan Pak Arif", "Pak Arif memanggil lewat pengeras suara. Jawab dengan suaramu.", [
    rencana(2),
    berikut(7, 40),
    faktor(63, "terbesar"),
    ulang([6, 10, 15], "terakhir"),
  ]),
];

/* ------------------------------ Pictorial: diagram polos ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Papan 5: diagram Bima", "Bima menggambar diagram untuk pengelola pasar. Periksa diagramnya.", [
    rencana(5),
    hapus(35, 3, "pilih", ["29", "33", "35"]),
    salah(
      faktor(42, "daun", ["6 × 7", "2 × 3 × 7", "2 × 21"]),
      "Citra",
      "42 = 2 × 3 × 7.",
      "2 × 3 × 7",
      ["Semua ujungnya prima dan hasil kalinya kembali ke bilangan awal.", "Ujung pohon boleh bilangan apa saja, yang penting hasil kalinya 42.", "Faktorisasi prima harus memuat 6, karena 6 adalah faktor 42."],
      0,
      true,
      0,
    ),
    ulang([10, 14], "fpb", { pil: ["70", "2", "1"] }),
  ]),
  Pi(6, "kanvas", "Misi Papan 6: tabel Fajar", "Fajar mengisi tabel yang lebih lengkap. Periksa diagramnya, lalu tulis jawabanmu di kanvas.", [
    rencana(3),
    banyakPrima(14),
    faktor(60, "beda"),
    ulang([15, 25], "pembagiKe", { ke: 2 }),
  ]),
  Pi(7, "suara", "Misi Papan 7: lapor ke Kak Lintang", "Bima melaporkan diagramnya kepada Kak Lintang. Sebutkan jawabanmu.", [
    rencana(4),
    klaimPrima(39),
    faktor(52, "terbesar"),
    ulang([4, 6, 10], "klaim", { klaim: 60 }),
  ]),
];

/* ------------------------------ Abstract: kartu kata dan angka bercap pengelola ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Papan 8: lembar pengelola", "Lembar pengelola pasar hanya berisi kata dan angka.", [
    rencana(3),
    prima(["39", "31", "51"]),
    faktor(40, "daun", ["2 × 4 × 5", "2 × 2 × 2 × 5", "4 × 10"]),
    salah(
      ulang([21, 22], "fpb", { pil: ["0", "1", "462"] }),
      "Fajar",
      "FPB 21 dan 22 adalah 0.",
      "0",
      ["FPB adalah faktor terbesar yang sama, jadi tidak mungkin nol.", "Dua bilangan yang berbeda selalu punya FPB nol karena tidak sama.", "FPB selalu sama dengan hasil kali kedua bilangan itu."],
      0,
      false,
      2,
    ),
  ]),
  A(9, "kanvas", "Misi Papan 9: tulis di lembar", "Kak Lintang meminta kamu menulis jawaban di kanvas.", [
    rencana(5),
    hapus(49, 7, "banyak"),
    faktor(84, "banyak"),
    ulang([16, 20], "banyak"),
  ]),
  A(10, "suara", "Misi Papan 10: laporan akhir", "Laporan akhir Pasar Kuliner Malam untuk pengelola. Ucapkan jawabannya.", [
    rencana(1),
    berikut(13, 40),
    faktor(66, "terbesar"),
    ulang([8, 14], "klaim", { klaim: 112 }),
  ]),
];

export const POIN_PENTING = [
  "Bilangan prima hanya bisa dibagi satu dan bilangan itu sendiri; satu bukan bilangan prima, dan dua adalah prima yang terkecil.",
  "Saringan Eratosthenes: hapus 1, ambil prima berikutnya dan hapus kelipatannya, ulangi; yang tersisa prima, ada 25 sampai 100.",
  "Faktorisasi prima menulis bilangan sebagai hasil kali prima, misalnya 12 = 2 × 2 × 3; pohon faktor memecahnya sampai semua ujungnya prima.",
  "KPK dari faktorisasi prima: prima yang berpasangan ditulis sekali, ditambah prima yang tidak berpasangan, lalu semuanya dikalikan.",
  "FPB dari faktorisasi prima: kalikan hanya prima yang berpasangan, dan FPB-nya 1 bila tidak ada yang berpasangan.",
  "Pembagian berulang: bagi dengan prima sampai semuanya 1; KPK hasil kali semua pembagi, FPB hasil kali pembagi yang membagi semua bilangan.",
  "KPK dan FPB dua bilangan maupun tiga bilangan dicari dengan cara yang sama.",
];
/** Poin penting untuk suara (tanpa digit): angka dan tanda menjadi kata. */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => ucapkan(p));

/** Perayaan akhir cerita bab (diucapkan setelah Poin Penting): kelima tamu dan semua tokoh hadir. */
export const PENUTUP_E =
  "Bu Marni, Pak Tarno, Bu Wati, Pak Joko, Kak Lintang, Pak Arif, Bima, Citra, dan Fajar merayakan Pasar Kuliner Malam. Lampu gantung menyala, spanduk terpasang, lonceng berbunyi, kotak bingkisan dibagikan, dan balon naik ke langit. Terima kasih sudah belajar bersama, sampai jumpa di bab berikutnya!";

export const TEMA_PAPAN = {
  concrete: { ikon: "\u{1F3EE}", nama: "Concrete", cara: "Papan bilangan pasar: kartu bilangan dan lampion yang dilihat, disaring, dan dipecah" },
  pictorial: { ikon: "\u{1F4D0}", nama: "Pictorial", cara: "Kertas pohon dan tabel bilangan: diagram polos yang dibaca" },
  abstract: { ikon: "\u{1F4DC}", nama: "Abstract", cara: "Lembar pengelola Pasar Kuliner Malam: kartu kata dan angka bercap, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_PAPAN, PICTORIAL as PICTORIAL_PAPAN, ABSTRACT as ABSTRACT_PAPAN };
