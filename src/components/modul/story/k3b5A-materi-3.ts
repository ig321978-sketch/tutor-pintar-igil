import type { AdeganStory } from "./logika-story";
import { E, W, ban, emo, garis, idTurusMiring, idTurusTegak, jalan, judul, kotak, papanTulis, pompa, teks, tokoh, turus } from "./k3b5A-gambar";
import { k, sorotkan, tambah, ubah } from "./k3b5A-bantu";

/*
 * Cerita orisinal IGIL "Catatan Pak Hasan" (Kelas 3 Bab 5 Sub-Bab A, mengurutkan dan membandingkan data), awal cerita Bengkel Sepeda Pak Hasan.
 * Naskah suara dari naskah/story-naskah-k3b5a.md. Bagian ini: turus, banyak data dari turus, penutup (jembatan ke Sub-Bab B).
 */

/** Turus ban bocor berbanyak delapan: satu bundel (empat tegak dan satu miring) dan tiga garis tegak, pada papan tulis. */
const TR = turus("tr", 110, 64, 8, { jarak: 10, tinggi: 44 });
const dari = (ids: string[]) => TR.filter((o) => ids.includes(o.id));
const TEGAK_AWAL = idTurusTegak("tr", 0, 1);
const TEGAK_BUNDEL = idTurusTegak("tr", 2, 3);
const MIRING = idTurusMiring("tr", 0, 0);
const TEGAK_SISA = idTurusTegak("tr", 4, 6);

/* ------------------------------ 7. Turus ------------------------------ */
const SUARA_T1 = "Pak Hasan lalu mencatat jenis kerusakan sepeda dengan garis tegak, yang disebut turus.";
const SUARA_T2 = "Satu garis untuk satu sepeda, dan garis kelima mencoret miring.";
const SUARA_T3 = "Bima menghitung turus ban bocor, dan jumlahnya delapan.";

export const ADEGAN_TURUS: AdeganStory = {
  id: "turus",
  judul: "Turus: satu garis satu data",
  sumber: "Materi: turus",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Turus"), ...papanTulis("pt", 20, 28, 260, 118), ...tokoh("ph", 40, 184, "Pak Hasan")),
      tambah("jenis", teks("bb", 70, 50, "ban bocor", 11, W.kapur)),
      tambah("garis", ...dari(TEGAK_AWAL.slice(0, 1))),
      tambah("tegak,", ...dari(TEGAK_AWAL.slice(1))),
      tambah("turus.", teks("ts", 232, 50, "turus", 14, W.kapurMerah)),
    ),
    k(
      SUARA_T2,
      tambah("garis", ...dari(TEGAK_BUNDEL.slice(0, 1))),
      tambah("satu@2", ...dari(TEGAK_BUNDEL.slice(1)), teks("s1", 150, 128, "1 garis = 1 sepeda", 10, W.kapur)),
      tambah("kelima", ...dari(MIRING)),
      sorotkan("miring.", ...MIRING),
    ),
    k(
      SUARA_T3,
      tambah("Bima", ...tokoh("bm", 264, 184, "Bima")),
      tambah("menghitung", ...dari(TEGAK_SISA.slice(0, 1))),
      tambah("turus", ...dari(TEGAK_SISA.slice(1, 2))),
      tambah("bocor,", ...dari(TEGAK_SISA.slice(2))),
      tambah("delapan.", teks("n8", 232, 100, "8", 36, W.kapurMerah)),
    ),
  ],
};

/* ------------------------------ 8. Banyak data ------------------------------ */
const SUARA_N1 = "Salsa menuliskan angka delapan di samping turus itu.";
const SUARA_N2 = "Itulah banyak sepeda dengan ban bocor.";
const SUARA_N3 = "Turus membantu kita menghitung tanpa lupa dan tanpa terhitung dua kali.";

export const ADEGAN_BANYAK: AdeganStory = {
  id: "banyak",
  judul: "Banyak data dari turus",
  sumber: "Materi: banyak data",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Banyak Data"), ...papanTulis("pt", 20, 28, 260, 118), ...tokoh("sl", 40, 184, "Salsa"), teks("bb", 70, 50, "ban bocor", 11, W.kapur), ...TR),
      tambah("menuliskan", emo("ct", 72, 166, E.catat, 16)),
      tambah("angka", teks("n8", 232, 100, "8", 36, W.kapurMerah)),
    ),
    k(
      SUARA_N2,
      tambah("banyak", teks("bk", 232, 56, "banyak", 12, W.kapur)),
      sorotkan("sepeda", "n8"),
      tambah("bocor.", emo("ok", 232, 132, E.benar, 20)),
    ),
    k(
      SUARA_N3,
      tambah("Turus", ...tokoh("bm", 264, 184, "Bima")),
      tambah("menghitung", emo("jr", 118, 126, E.jari, 16)),
      tambah("tanpa", teks("tl", 66, 128, "tanpa lupa", 10, W.kapur)),
      tambah("dua", teks("dk", 190, 128, "2 kali", 10, W.kapurMerah), emo("xk", 214, 128, E.salah, 14)),
    ),
  ],
};

/* ------------------------------ 9. Penutup ------------------------------ */
const SUARA_P1 = "Raka memompa semua ban sepeda sambil menggerutu, dan ban-ban pun terisi penuh.";
const SUARA_P2 = "Besok Bu Wulan, ketua klub sepeda, akan datang membawa papan tabel.";
const SUARA_P3 = "Menurutmu, bagaimana cara menyusun turus dan banyaknya supaya rapi di satu tempat? Terima kasih, Raka, Salsa, Bima, Pak Joko, dan Pak Hasan!";
/** Ban menggembung: jari-jari ban, pelek, dan pusat dibesarkan. */
const gembung = (id: string) => [
  { id, r: 14 },
  { id: `${id}-i`, r: 8.7 },
  { id: `${id}-c`, r: 2.2 },
];

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Besok, Bu Wulan datang",
  sumber: "Materi: penutup dan jembatan",
  latar: "#E0F2FE",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Ban Terisi Penuh"), ...jalan("jl", 150), ...tokoh("rk", 30, 184, "Raka"), ...pompa("pm", 54, 156)),
      tambah("menggerutu,", emo("cm", 70, 166, E.cemberut, 16)),
      tambah("ban", ...ban("p1", 130, 126, 8), ...ban("p2", 170, 126, 8), ...ban("p3", 210, 126, 8)),
      ubah("terisi", ...gembung("p1"), ...gembung("p2"), ...gembung("p3")),
    ),
    k(
      SUARA_P2,
      tambah("Wulan,", ...tokoh("bw", 268, 122, "Bu Wulan", 22)),
      tambah("papan", kotak("tb", 188, 44, 90, 50, W.putih, W.biru, { rx: 3, z: 1 }), garis("tb1", 188, 61, 90, 0, W.biru, 1, { z: 2 }), garis("tb2", 188, 78, 90, 0, W.biru, 1, { z: 2 }), garis("tb3", 218, 44, 0, 50, W.biru, 1, { z: 2 })),
      tambah("tabel.", teks("tt", 233, 40, "tabel", 9, W.ungu)),
    ),
    k(
      SUARA_P3,
      tambah("Menurutmu,", teks("tq", 130, 52, "?", 36, W.merah)),
      tambah("turus", ...turus("q", 56, 66, 8, { jarak: 6, tinggi: 20, warna: W.biru, miring: W.merah, tebal: 2 })),
      tambah("banyaknya", teks("bn", 80, 100, "8", 14, W.biru)),
      tambah("satu", teks("n1", 132, 100, "1 tempat", 11, W.ungu)),
      tambah("Salsa,", ...tokoh("sl", 70, 184, "Salsa")),
      tambah("Bima,", ...tokoh("bm", 108, 184, "Bima")),
      tambah("Joko,", ...tokoh("pj", 150, 184, "Pak Joko")),
      tambah("Hasan!", ...tokoh("ph", 204, 184, "Pak Hasan"), emo("lb", 238, 150, E.lambai, 18)),
    ),
  ],
};
