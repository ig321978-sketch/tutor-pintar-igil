import type { AdeganStory } from "./logika-story";
import { E, W, ban, bengkel, emo, jalan, judul, kartuBil, kartuHari, panah, papanTulis, pompa, teks, tokoh } from "./k3b5A-gambar";
import { hapus, k, sorotkan, tambah, ubah } from "./k3b5A-bantu";

/*
 * Cerita orisinal IGIL "Catatan Pak Hasan" (Kelas 3 Bab 5 Sub-Bab A, mengurutkan dan membandingkan data), awal cerita Bengkel Sepeda Pak Hasan.
 * Naskah suara dari naskah/story-naskah-k3b5a.md. Bagian ini: bengkel, papan catatan, mengurutkan data.
 */

/* ------------------------------ 1. Bengkel ------------------------------ */
const SUARA_B1 = "Sepulang sekolah Pak Joko mengajak Raka, Salsa, dan Bima ke Bengkel Sepeda Pak Hasan di tepi jalan kampung.";
const SUARA_B2 = "Pak Hasan, montir berseragam biru, sedang bingung memandang papan catatannya.";
const SUARA_B3 = "Ia ingin tahu hari apa bengkelnya paling ramai, dan meminta bantuan mereka.";

export const ADEGAN_BENGKEL: AdeganStory = {
  id: "bengkel",
  judul: "Bengkel Sepeda Pak Hasan",
  sumber: "Materi: bengkel sepeda",
  latar: "#E0F2FE",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Bengkel Sepeda Pak Hasan"), ...jalan("jl", 150)),
      tambah("Pak", ...tokoh("pj", 28, 184, "Pak Joko")),
      tambah("Raka,", ...tokoh("rk", 72, 184, "Raka")),
      tambah("Salsa,", ...tokoh("sl", 108, 184, "Salsa")),
      tambah("Bima", ...tokoh("bm", 144, 184, "Bima")),
      tambah("tepi", ...bengkel("bk", 170, 78, 118, 72)),
      tambah("kampung", ...ban("e1", 186, 134, 9), ...ban("e2", 208, 134, 9), ...pompa("pm", 232, 126)),
    ),
    k(
      SUARA_B2,
      tambah("Hasan,", ...tokoh("ph", 248, 184, "Pak Hasan")),
      tambah("bingung", emo("tq", 246, 144, E.tanya, 16)),
      sorotkan("papan", "ph-pk"),
    ),
    k(
      SUARA_B3,
      tambah("hari", teks("hr", 100, 62, "hari apa paling ramai?", 9, W.merah)),
      tambah("bantuan", emo("tg", 198, 168, E.tangan, 16)),
      sorotkan("mereka", "rk", "sl", "bm"),
    ),
  ],
};

/* ------------------------------ 2. Papan catatan ------------------------------ */
const SUARA_C1 = "Papan itu mencatat banyak sepeda yang datang selama enam hari.";
const SUARA_C2 = "Senin enam, Selasa sembilan, Rabu tiga, Kamis tujuh, Jumat lima, dan Sabtu delapan.";
const SUARA_C3 = "Kumpulan bilangan seperti ini disebut data.";
const WARNA_HARI = "#FEF3C7";

export const ADEGAN_CATATAN: AdeganStory = {
  id: "catatan",
  judul: "Papan catatan enam hari",
  sumber: "Materi: papan catatan",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Papan Catatan"), ...papanTulis("pt", 30, 28, 240, 118), ...tokoh("ph", 40, 184, "Pak Hasan")),
      tambah("banyak", teks("bs", 150, 46, "banyak sepeda tiap hari", 10, W.kapur)),
      tambah("enam", teks("n6", 150, 62, "6 hari", 13, W.kapurMerah)),
    ),
    k(
      SUARA_C2,
      tambah("Senin", ...kartuHari("h0", 48, 74, "Senin", 6, WARNA_HARI)),
      tambah("Selasa", ...kartuHari("h1", 120, 74, "Selasa", 9, WARNA_HARI)),
      tambah("Rabu", ...kartuHari("h2", 192, 74, "Rabu", 3, WARNA_HARI)),
      tambah("Kamis", ...kartuHari("h3", 48, 108, "Kamis", 7, WARNA_HARI)),
      tambah("Jumat", ...kartuHari("h4", 120, 108, "Jumat", 5, WARNA_HARI)),
      tambah("Sabtu", ...kartuHari("h5", 192, 108, "Sabtu", 8, WARNA_HARI)),
    ),
    k(
      SUARA_C3,
      sorotkan("Kumpulan", "h0-k", "h1-k", "h2-k", "h3-k", "h4-k", "h5-k"),
      hapus("seperti", "bs", "n6"),
      tambah("disebut", teks("dt", 190, 168, "DATA", 20, W.ungu)),
    ),
  ],
};

/* ------------------------------ 3. Mengurutkan ------------------------------ */
const SUARA_U1 = "Salsa menulis ulang data itu dari yang terkecil ke yang terbesar.";
const SUARA_U2 = "Urutannya tiga, lima, enam, tujuh, delapan, sembilan.";
const SUARA_U3 = "Setelah diurutkan, data terkecil dan data terbesar langsung tampak.";
const AWAL = [6, 9, 3, 7, 5, 8];
const URUT = [3, 5, 6, 7, 8, 9];
const xKartu = (i: number): number => 18 + i * 45;
/** Pindahkan kartu bilangan `n` ke tempat ke-`i` dalam urutan: kotak dan angkanya. */
const pindahKartu = (n: number, i: number) => [
  { id: `c${n}-k`, x: xKartu(i) },
  { id: `c${n}-t0`, x: xKartu(i) + 19 },
];

export const ADEGAN_URUT: AdeganStory = {
  id: "urut",
  judul: "Mengurutkan data",
  sumber: "Materi: mengurutkan data",
  latar: "#FEF3C7",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Mengurutkan Data"), ...papanTulis("pt", 8, 28, 284, 110), ...tokoh("sl", 40, 184, "Salsa")),
      tambah("menulis", emo("ct", 72, 166, E.catat, 16), ...AWAL.flatMap((n, i) => kartuBil(`c${n}`, xKartu(i), 62, n))),
      tambah("terkecil", teks("kc", 40, 128, "kecil", 9, W.kapur)),
      tambah("terbesar", teks("bs", 262, 128, "besar", 9, W.kapur), panah("ar", 40, 114, 222, 0, W.kapur, 2)),
    ),
    k(
      SUARA_U2,
      ubah("tiga,", ...pindahKartu(3, 0)),
      ubah("lima,", ...pindahKartu(5, 1)),
      ubah("enam,", ...pindahKartu(6, 2)),
      ubah("tujuh,", ...pindahKartu(7, 3)),
      ubah("delapan,", ...pindahKartu(8, 4)),
      ubah("sembilan", ...pindahKartu(9, 5)),
    ),
    k(
      SUARA_U3,
      ubah("terkecil", { id: "c3-k", warna: "#BFDBFE" }),
      ubah("terbesar", { id: "c9-k", warna: "#FECACA" }),
      tambah("tampak", emo("ma", 120, 168, E.mata, 18)),
      sorotkan("tampak", ...URUT.map((n) => `c${n}-k`)),
    ),
  ],
};
