import type { AdeganStory } from "./logika-story";
import { E, W, ban, emo, garis, judul, kartuBil, kotak, panah, papanTulis, pompa, teks, tokoh } from "./k3b5A-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k3b5A-bantu";

/*
 * Cerita orisinal IGIL "Catatan Pak Hasan" (Kelas 3 Bab 5 Sub-Bab A, mengurutkan dan membandingkan data), awal cerita Bengkel Sepeda Pak Hasan.
 * Naskah suara dari naskah/story-naskah-k3b5a.md. Bagian ini: data terkecil dan terbesar, salah langkah Raka (menjumlahkan), jangkauan.
 */

const xKartu = (i: number): number => 18 + i * 45;
/** Data berurutan dengan hari asalnya (urut naik): bilangan dan hari. */
const BARIS: [number, string][] = [
  [3, "Rabu"],
  [5, "Jumat"],
  [6, "Senin"],
  [7, "Kamis"],
  [8, "Sabtu"],
  [9, "Selasa"],
];

/* ------------------------------ 4. Ujung: terkecil dan terbesar ------------------------------ */
const SUARA_J1 = "Data terkecil adalah tiga, yaitu hari Rabu.";
const SUARA_J2 = "Data terbesar adalah sembilan, yaitu hari Selasa.";
const SUARA_J3 = "Pak Hasan bertanya, seberapa jauh selisih hari paling sepi dan hari paling ramai?";

export const ADEGAN_UJUNG: AdeganStory = {
  id: "ujung",
  judul: "Data terkecil dan terbesar",
  sumber: "Materi: data terkecil dan terbesar",
  latar: "#E0E7FF",
  ketukan: [
    k(
      SUARA_J1,
      tambah(0, judul("Data Terkecil dan Terbesar"), ...papanTulis("pt", 8, 28, 284, 110), ...BARIS.flatMap(([n], i) => kartuBil(`c${n}`, xKartu(i), 64, n))),
      tambah("terkecil", teks("kt", 37, 128, "terkecil", 9, W.kapur)),
      ubah("tiga,", { id: "c3-k", warna: "#BFDBFE" }),
      tambah("Rabu.", teks("d3", 37, 58, "Rabu", 8, W.kapur)),
    ),
    k(
      SUARA_J2,
      tambah("terbesar", teks("kb", 262, 128, "terbesar", 9, W.kapur)),
      ubah("sembilan,", { id: "c9-k", warna: "#FECACA" }),
      tambah("Selasa.", teks("d9", 262, 58, "Selasa", 8, W.kapur)),
    ),
    k(
      SUARA_J3,
      tambah("Pak", ...tokoh("ph", 150, 184, "Pak Hasan")),
      tambah("bertanya,", emo("tq", 192, 160, E.tanya, 16)),
      tambah("selisih", panah("sp", 40, 114, 222, 0, W.kapurMerah, 2), teks("sq", 150, 127, "selisih = ?", 10, W.kapurMerah)),
      sorotkan("sepi", "c3-k"),
      sorotkan("ramai?", "c9-k"),
    ),
  ],
};

/* ------------------------------ 5. Salah langkah: menjumlahkan ------------------------------ */
const SUARA_S1 = "Selisih itu disebut jangkauan, yaitu data terbesar dikurangi data terkecil.";
const SUARA_S2 = "Raka berseru, sembilan ditambah tiga, jadi jangkauannya dua belas! Kalau salah, aku memompa semua ban!";
const SUARA_S3 = "Salsa menggeleng. Selisih berarti dikurangi, bukan ditambah.";

export const ADEGAN_SALAH_JANGKAUAN: AdeganStory = {
  id: "salah-jangkauan",
  judul: "Jangkauan: dikurangi, bukan ditambah",
  sumber: "Materi: salah langkah jangkauan",
  latar: "#FEE2E2",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Jangkauan"), ...papanTulis("pt", 20, 28, 260, 100)),
      tambah("jangkauan,", teks("jk", 150, 56, "jangkauan", 16, W.kapurMerah)),
      tambah("terbesar", teks("tb", 84, 98, "terbesar", 13, W.kapur)),
      tambah("dikurangi", teks("mn", 150, 98, "−", 20, W.kapur)),
      tambah("terkecil.", teks("tk", 216, 98, "terkecil", 13, W.kapur)),
    ),
    k(
      SUARA_S2,
      bersih(0),
      tambah(0, judul("Kata Raka"), ...tokoh("rk", 44, 184, "Raka"), ...pompa("pm", 66, 158)),
      tambah("sembilan", ...kartuBil("a9", 70, 54, 9)),
      tambah("ditambah", teks("pl", 120, 82, "+", 22, W.merah)),
      tambah("tiga,", ...kartuBil("a3", 134, 54, 3)),
      tambah("jadi", teks("sm", 184, 82, "=", 22, W.biru)),
      tambah("dua", ...kartuBil("a12", 200, 54, 12, "#FFFFFF", 52, 40)),
      tambah("memompa", ...ban("b1", 250, 164, 12), ...ban("b2", 276, 164, 12), ...ban("b3", 263, 142, 12)),
    ),
    k(
      SUARA_S3,
      tambah("Salsa", ...tokoh("sl", 130, 184, "Salsa")),
      tambah("menggeleng.", emo("gl", 162, 166, E.gelengan, 18)),
      tambah("dikurangi,", teks("mn2", 120, 128, "−", 24, W.hijau)),
      tambah("bukan", emo("xp", 120, 100, E.salah, 16)),
      tambah("ditambah.", emo("x12", 226, 108, E.salah, 16)),
    ),
  ],
};

/* ------------------------------ 6. Jangkauan ------------------------------ */
const SUARA_K1 = "Sembilan dikurangi tiga sama dengan enam.";
const SUARA_K2 = "Jadi jangkauan data itu enam, artinya hari paling ramai enam sepeda lebih banyak daripada hari paling sepi.";
const SUARA_K3 = "Raka cemberut dan mengambil pompa, karena taruhan tetap taruhan.";
/** Satu tumpukan kotak setinggi `n` mulai dari dasar y = 140 pada x; kotak di atas `batas` berwarna merah. */
const tumpuk = (id: string, x: number, n: number, batas: number) =>
  Array.from({ length: n }, (_, i) => kotak(`${id}${i}`, x, 140 - (i + 1) * 10, 24, 9, i < batas ? "#93C5FD" : "#FCA5A5", W.biru, { rx: 2, tebal: 1.1 }));

export const ADEGAN_JANGKAUAN: AdeganStory = {
  id: "jangkauan",
  judul: "Hitung jangkauan",
  sumber: "Materi: hitung jangkauan",
  latar: "#DCFCE7",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Jangkauan"), ...papanTulis("pt", 20, 28, 260, 100), ...tokoh("sl", 40, 184, "Salsa")),
      tambah("Sembilan", teks("e9", 80, 90, "9", 32, W.kapur)),
      tambah("dikurangi", teks("emn", 120, 90, "−", 32, W.kapurMerah)),
      tambah("tiga", teks("e3", 160, 90, "3", 32, W.kapur)),
      tambah("sama", teks("eq", 200, 90, "=", 32, W.kapur)),
      tambah("enam.", teks("e6", 240, 90, "6", 32, W.kapurMerah)),
    ),
    k(
      SUARA_K2,
      bersih(0),
      tambah(0, judul("Dua Tumpukan Sepeda"), ...tumpuk("r", 90, 3, 3), teks("lr", 102, 152, "Rabu", 9, W.biru), teks("nr", 102, 105, "3", 12, W.biru)),
      tambah("ramai", ...tumpuk("s", 130, 9, 3), teks("ls", 142, 152, "Selasa", 9, W.biru), teks("ns", 142, 44, "9", 12, W.biru)),
      tambah("enam", teks("j6", 205, 82, "6 lebih", 12, W.merah)),
      tambah("lebih", garis("br", 170, 50, 0, 60, W.merah, 2.4)),
    ),
    k(
      SUARA_K3,
      tambah("Raka", ...tokoh("rk", 240, 184, "Raka")),
      tambah("cemberut", emo("cm", 266, 166, E.cemberut, 16)),
      tambah("pompa,", ...pompa("pm", 212, 158)),
      tambah("taruhan", teks("tr", 225, 120, "taruhan!", 10, W.merah)),
    ),
  ],
};
