/**
 * Data Infografis (label kosong, jalur lonceng pasar) Kelas 5 Bab 2 Sub-Bab B "Dua Lonceng Pak Tarno": DUA kartu, tiap kartu satu layar tanpa gulir.
 * Data berasal dari Story (kontrak data bab): lonceng wedang Bu Marni tiap 4 menit, lonceng bakso Pak Tarno tiap 6 menit, bersama pada 12, 24, 36 menit (KPK 12),
 * jadwal belanja ke pasar induk tiap 4 dan 6 hari (bertemu lagi 12 hari, lalu 24 hari), dan tiga lonceng tiap 4, 5, dan 6 menit (KPK 60).
 * Kartu 1 = dua jalur lonceng sampai 36 menit: titik yang berbunyi bersama (12, 24, 36) dan KPK berupa sel kosong "?" yang diketuk.
 * Kartu 2 = jadwal belanja (jarak antar pertemuan, pertemuan kedua) dan tiga jalur lonceng sampai 60 menit (KPK tiga bilangan) dengan sel kosong "?".
 * Semua gambar dan hitungan dari logika-data.ts (digambar sungguh). Digital saja: suara dan kanvas hanya di CPA. Diuji: scripts/uji-jadwal-k5b2b.mjs.
 */
import { buatJalur, fmt, kelipatan, kpk, persekutuan } from "./logika-data";
import { ucapkan as ucap } from "./logika-cpa";

/** Ucapan tanpa digit yang diawali huruf kapital. */
const ucapkan = (t: string): string => {
  const u = ucap(t);
  return u.charAt(0).toUpperCase() + u.slice(1);
};

/** Data Story: jarak ulang tiap lonceng, dalam menit (dan hari untuk belanja). */
export const WEDANG = 4;
export const BAKSO = 6;
export const JAGUNG = 5;
export const BATAS_1 = 36;
export const BATAS_3 = 60;

export const J1 = buatJalur(BATAS_1, 280, 16, 262);
export const TIK_WEDANG = kelipatan(WEDANG, BATAS_1);
export const TIK_BAKSO = kelipatan(BAKSO, BATAS_1);
/** Titik yang berbunyi bersama sampai 36 menit (kelipatan persekutuan 4 dan 6). */
export const BERSAMA = persekutuan([WEDANG, BAKSO], BATAS_1);
export const KPK_DUA = kpk([WEDANG, BAKSO]);

/** Jalur kartu 2 bagian bawah: tiga lonceng sampai 60 menit. */
export const J3 = buatJalur(BATAS_3, 280, 26, 262);
export const TIGA = [WEDANG, JAGUNG, BAKSO];
export const TIK_TIGA = TIGA.map((a) => kelipatan(a, BATAS_3));
export const KPK_TIGA = kpk(TIGA);
/** Jalur belanja bagian atas kartu 2 (hari). */
export const JB = buatJalur(BATAS_1, 280, 20, 262);
export const BELANJA_LAGI = KPK_DUA;
export const BELANJA_BERIKUT = 2 * KPK_DUA;

export const SUARA_BERSAMA: Record<number, string> = Object.fromEntries(
  BERSAMA.map((n) => [n, ucapkan(`${fmt(n)} ada di jalur lonceng wedang dan juga di jalur lonceng bakso, jadi ${fmt(n)} kelipatan persekutuan 4 dan 6.`)]),
);
export const SUARA_KPK = ucapkan(`Dari ${BERSAMA.map(fmt).join(", ")} yang terkecil adalah ${KPK_DUA}. Itulah KPK, kelipatan persekutuan terkecil dari ${WEDANG} dan ${BAKSO}.`);
export const SUARA_JARAK = ucapkan(`Jadwal belanja bersama lagi sesudah ${BELANJA_LAGI} hari, sebanyak KPK ${WEDANG} dan ${BAKSO}.`);
export const SUARA_BERIKUT = ucapkan(`Pertemuan berikutnya pada hari ke ${BELANJA_BERIKUT}, dengan jarak yang sama, yaitu ${BELANJA_LAGI} hari.`);
export const SUARA_TIGA = ucapkan(`Tiga lonceng, tiap ${WEDANG}, ${JAGUNG}, dan ${BAKSO} menit, berbunyi bersama pertama kali pada menit ke ${KPK_TIGA}. KPK ${WEDANG}, ${JAGUNG}, dan ${BAKSO} adalah ${KPK_TIGA}.`);

export const JUDUL_INFO_1 = "Dua Lonceng Pak Tarno";
export const JUDUL_INFO_2 = "Belanja dan Tiga Lonceng";
export const PETUNJUK_INFO_1 = "Dua jalur lonceng sampai menit ketiga puluh enam. Ketuk tanda tanya di titik yang berbunyi bersama, lalu ketuk kotak KPK.";
export const PETUNJUK_INFO_2 = "Jadwal belanja dan tiga jalur lonceng. Ketuk tanda tanya di jarak, di hari berikutnya, dan di titik bersama tiga lonceng.";
export const SELESAI_INFO_1 = "Jalur lengkap! Titik bersama yang paling kecil adalah KPK.";
export const SELESAI_INFO_2 = "Kartu lengkap! Bertemu lagi selalu sesudah KPK, juga untuk tiga bilangan.";
export const IKON_JALUR = "\u{1F514}";
