/**
 * Isi tahap Concrete, Pictorial, dan Abstract Kelas 5 Bab 2 Sub-Bab B "Dua Lonceng Pak Tarno" (daftar kelipatan, kelipatan persekutuan, KPK, jadwal berulang, KPK tiga bilangan).
 * Misi lanjutan "Misi Jadwal" (nomor misi berlanjut dari Simulasi). Data berbeda dari Story (lonceng empat dan enam menit, belanja empat dan enam hari, tiga lonceng empat, lima, enam menit)
 * dan dari Infografis: Concrete memakai papan jadwal beremoji lama (kembang api, ronda, lampu simpang), Pictorial memakai tabel bilangan dan daftar polos (tukang parkir, kios es, lampu tenda),
 * Abstract memakai kartu jadwal pengelola pasar (catatan lonceng, jadwal belanja, lonceng gerbang). Jawaban benar dihitung dari bilangan tugas (lihat logika-cpa.ts).
 * Angka jawaban Tulis di kanvas per tahap: Concrete 6, 3, 2, 4; Pictorial 8, 6, 3, 5; Abstract 9, 3, 7, 2 (tidak kembar dalam satu tahap).
 * Abstract diakhiri Poin Penting dengan jembatan ke Sub-Bab C (Bu Wati datang membawa baki klepon). Diuji: scripts/uji-jadwal-k5b2b.mjs.
 */
import type { Cara, DasarSalah, Langkah, LangkahDasar, LangkahSalah, LangkahSoal, Rupa, SoalMisi, Tipe } from "./logika-cpa";
import { URUT_METODE, instruksi, ucapkan } from "./logika-cpa";

export { MISI_JADWAL_TEKS } from "./data-sim";

type S3 = [string, string, string];
type Opsi = { c?: number; n?: number; pil?: S3 };
const t = (tipe: Tipe, s: string, a: number, b: number, w: number, o: Opsi = {}): LangkahDasar => ({ tipe, s, a, b, w, ...o });
const salah = (dasar: LangkahDasar, tokoh: string, kataTokoh: string, jawabTokoh: string, alasan: S3, benar: number, betul = false, posisi?: number): LangkahSalah => ({
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

/** Empat langkah satu misi, berurut metode: IGIL, List Both, Spot the Match, Meet Again. */
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

/* ------------------------------ Concrete: papan jadwal beremoji ------------------------------ */
const C = satuMisi("benda");
export const CONCRETE: SoalMisi[] = [
  C(2, "klik", "Misi Jadwal 2: kembang api", "Pak Tarno memasang kembang api di atas pasar. Periksa papan jadwalnya.", [
    salah(
      t("kpk", "api", 6, 8, 48, { pil: ["48", "24", "14"] }),
      "Fajar",
      "KPK 6 dan 8 adalah 48, karena 6 kali 8.",
      "48",
      [
        "Ada kelipatan persekutuan yang lebih kecil daripada hasil kali, dan itulah KPK-nya.",
        "Hasil kali kedua bilangan selalu menjadi KPK, jadi tidak perlu menulis daftar kelipatan sama sekali.",
        "KPK selalu sama dengan bilangan yang lebih besar, jadi cukup memilih bilangan yang paling besar saja.",
      ],
      0,
      false,
      2,
    ),
    t("persekutuan", "api", 3, 5, 30, { pil: ["10", "9", "15"] }),
    t("terkecil", "api", 4, 10, 40, { pil: ["40", "20", "30"] }),
    t("bertemu", "api", 5, 8, 48, { pil: ["13 detik lagi", "80 detik lagi", "40 detik lagi"] }),
  ]),
  C(3, "kanvas", "Misi Jadwal 3: ronda malam", "Bima mencatat jadwal ronda pos pasar. Periksa papannya, lalu tulis jawabanmu di kanvas.", [
    t("kpkSatu", "ronda", 2, 3, 12),
    t("banyakSama", "ronda", 3, 4, 36),
    t("kelipatanKe", "ronda", 7, 2, 24),
    t("kaliBertemu", "ronda", 3, 6, 24),
  ]),
  C(4, "suara", "Misi Jadwal 4: lampu simpang", "Pak Arif memantau lampu simpang di dekat pasar. Jawab dengan suaramu.", [
    t("klaimKpk", "lampu", 3, 7, 21, { n: 21 }),
    t("adaDi", "lampu", 2, 5, 20, { n: 10 }),
    t("klaimSama", "lampu", 6, 9, 36, { n: 24 }),
    t("klaimWaktu", "lampu", 8, 10, 80, { n: 80 }),
  ]),
];

/* ------------------------------ Pictorial: tabel bilangan dan daftar polos ------------------------------ */
const Pi = satuMisi("diagram");
export const PICTORIAL: SoalMisi[] = [
  Pi(5, "klik", "Misi Jadwal 5: tukang parkir", "Citra menggambar diagram giliran tukang parkir pasar. Periksa diagramnya.", [
    t("kpk", "parkir", 2, 4, 20, { c: 5, pil: ["10", "40", "20"] }),
    salah(
      t("persekutuan", "parkir", 5, 6, 30, { pil: ["12", "30", "10"] }),
      "Bima",
      "30 adalah kelipatan persekutuan 5 dan 6.",
      "30",
      [
        "Tiga puluh ada di daftar kelipatan lima dan juga di daftar kelipatan enam.",
        "Tiga puluh hanya kelipatan lima, jadi bilangan itu tidak termasuk kelipatan persekutuan.",
        "Kelipatan persekutuan harus lebih kecil daripada kedua bilangan yang dibandingkan.",
      ],
      0,
      true,
      0,
    ),
    t("terkecil", "parkir", 6, 9, 36, { pil: ["36", "27", "18"] }),
    t("bertemu", "parkir", 6, 10, 30, { pil: ["60 hari lagi", "30 hari lagi", "16 hari lagi"] }),
  ]),
  Pi(6, "kanvas", "Misi Jadwal 6: kios es", "Bima menggambar diagram pengisian es di kios. Periksa diagramnya, lalu tulis jawabanmu di kanvas.", [
    t("kpkSatu", "kios", 4, 8, 16),
    t("banyakSama", "kios", 2, 8, 48),
    t("kelipatanKe", "kios", 5, 3, 30),
    t("kaliBertemu", "kios", 2, 5, 50),
  ]),
  Pi(7, "suara", "Misi Jadwal 7: lampu tenda", "Citra melaporkan lampu tenda kepada Pak Arif. Sebutkan jawabanmu.", [
    t("klaimKpk", "tenda", 5, 7, 40, { n: 30 }),
    t("adaDi", "tenda", 3, 8, 24, { n: 16 }),
    t("klaimSama", "tenda", 6, 15, 30, { n: 30 }),
    t("klaimWaktu", "tenda", 3, 10, 40, { n: 20 }),
  ]),
];

/* ------------------------------ Abstract: kartu jadwal pengelola pasar ------------------------------ */
const A = satuMisi("lambang");
export const ABSTRACT: SoalMisi[] = [
  A(8, "klik", "Misi Jadwal 8: catatan lonceng", "Catatan pengelola pasar hanya berisi kata dan angka.", [
    t("kpk", "catatan", 9, 12, 72, { pil: ["108", "36", "18"] }),
    t("persekutuan", "catatan", 6, 16, 48, { pil: ["36", "32", "48"] }),
    t("terkecil", "catatan", 10, 15, 60, { pil: ["60", "30", "45"] }),
    salah(
      t("bertemu", "catatan", 8, 12, 48, { pil: ["4 menit lagi", "24 menit lagi", "96 menit lagi"] }),
      "Citra",
      "Lonceng bersama lagi 4 menit kemudian, karena 4 membagi 8 dan 12.",
      "4 menit lagi",
      [
        "Empat membagi kedua bilangan, tetapi pertemuan terjadi pada kelipatan, bukan pada pembagi.",
        "Jarak sampai bertemu lagi harus lebih kecil daripada kedua jarak ulang, jadi empat sudah tepat.",
        "Bertemu lagi terjadi sesudah jarak yang sama dengan jumlah kedua jarak ulang.",
      ],
      0,
      false,
      1,
    ),
  ]),
  A(9, "kanvas", "Misi Jadwal 9: jadwal belanja", "Pak Tarno meminta kamu menulis jawaban di kanvas.", [
    t("kpkSatu", "belanja", 3, 9, 18),
    t("banyakSama", "belanja", 4, 10, 60),
    t("kelipatanKe", "belanja", 3, 7, 21),
    t("kaliBertemu", "belanja", 15, 20, 120),
  ]),
  A(10, "suara", "Misi Jadwal 10: laporan gerbang", "Laporan akhir lonceng gerbang untuk Pak Arif. Ucapkan jawabannya.", [
    t("klaimKpk", "gerbang", 9, 15, 45, { n: 45 }),
    t("adaDi", "gerbang", 6, 9, 36, { n: 24 }),
    t("klaimSama", "gerbang", 12, 18, 54, { n: 54 }),
    t("klaimWaktu", "gerbang", 6, 8, 72, { n: 72 }),
  ]),
];

export const POIN_PENTING = [
  "Kelipatan persekutuan adalah bilangan yang muncul di semua daftar kelipatan.",
  "KPK adalah kelipatan persekutuan yang paling kecil, dan bilangan semula membaginya tanpa sisa.",
  "Hasil kali dua bilangan belum tentu KPK, karena sering ada kelipatan persekutuan yang lebih kecil.",
  "Jadwal berulang bertemu lagi sesudah KPK, lalu sesudah KPK berikutnya, dengan jarak yang sama.",
  "Untuk tiga bilangan, tulis tiga daftar dan ambil bilangan terkecil yang ada di ketiganya.",
  "Daftar Keduanya, Cari yang Sama, dan Bertemu Lagi membantu mencari KPK dengan teliti.",
];
/** Poin penting untuk suara (tanpa digit): angka dan tanda menjadi kata. */
export const POIN_PENTING_SUARA = POIN_PENTING.map((p) => ucapkan(p));

/** Jembatan ke Sub-Bab C (diucapkan setelah Poin Penting): tamu berikutnya datang dengan masalah baru. */
export const PENUTUP_B =
  "Bu Wati, penjual klepon, datang membawa baki berisi dua belas klepon. Ia ingin menata klepon itu ke piring-piring kecil dengan isi yang sama banyak dan tanpa sisa. Menurutmu, bisa berapa piring? Ayo kita bantu di Sub-Bab berikutnya!";

export const TEMA_JADWAL = {
  concrete: { ikon: "\u{1F514}", nama: "Concrete", cara: "Papan jadwal pasar malam: kembang api, ronda, dan lampu beremoji yang berulang, dicari bilangan yang sama di dua daftar kelipatan" },
  pictorial: { ikon: "\u{1F4D0}", nama: "Pictorial", cara: "Kertas jadwal pasar: tabel bilangan dan daftar polos yang dibaca, dilingkari, dan dicari bilangan yang sama" },
  abstract: { ikon: "\u{1F4DC}", nama: "Abstract", cara: "Lembar jadwal pengelola pasar: kartu kata dan angka bercap, pilih, tulis, dan ucapkan" },
} as const;

/* Nama yang dipakai pemasang di IgilModulePlayer. */
export { CONCRETE as CONCRETE_JADWAL, PICTORIAL as PICTORIAL_JADWAL, ABSTRACT as ABSTRACT_JADWAL };
