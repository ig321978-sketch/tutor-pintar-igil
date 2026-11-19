import type { AdeganStory, Obj } from "./logika-story";
import { E, W, bintang, bulat, emo, garis, judul, kartu, kertas, kotak, loket, panah, panggungDepan, papanLayar, selendang, teks, tokoh } from "./k2b8B-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k2b8B-bantu";

/*
 * Cerita orisinal IGIL "Bintang Bu Maya" (Kelas 2 Bab 8 Sub-Bab B), video metode global.
 * Naskah suara dari naskah/story-naskah-k2b8b.md. Bagian ini: pembuka (tiga kartu lipat di laci loket), Sticky Note Graph (Diagram Kertas Tempel), dan terapannya.
 */

export const NAMA_METODE = ["Sticky Note Graph", "Row Comparing", "Graph Detective"] as const;
export const NAMA_METODE_ID = ["Diagram Kertas Tempel", "Banding Baris", "Detektif Diagram"] as const;

const WARNA_KERTAS = ["#FCA5A5", "#FDE047", "#86EFAC", "#93C5FD"];
/** Tumpukan `n` kertas tempel `${id}0...` bertingkat ke atas dari dasar (xTengah, yDasar). */
const tumpuk = (id: string, xTengah: number, yDasar: number, n: number, warna: string): Obj[] =>
  Array.from({ length: n }, (_, i) => kertas(`${id}${i}`, xTengah - 5.5 + (i % 2) * 0.8, yDasar - 12 * (i + 1), warna, 11, i % 2 ? 4 : -3));
const idTumpuk = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}${i}`);

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Di laci loket tiket, Nia menemukan tiga kartu lipat milik penjaga loket zaman dulu.";
const SUARA_O2 = "Bu Maya tersenyum. Itu cara membuat dan membaca diagram gambar dengan cepat dan tepat!";
const SUARA_O3 = "Tiga cara itu: Sticky Note Graph, Row Comparing, dan Graph Detective.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Diagram Kertas Tempel, Banding Baris, dan Detektif Diagram.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga kartu lipat di laci loket",
  sumber: "Metode global: pembuka",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_O1,
      bersih(0),
      tambah(0, judul("Laci Loket Tiket"), ...panggungDepan("dn")),
      tambah("tiket,", ...loket("lk", 90, 34, 100, 66)),
      tambah("laci", kotak("lc", 100, 112, 80, 26, "#E7C98A", W.coklat, { rx: 4, tebal: 2, z: 1 }), bulat("lh", 140, 125, 4, W.coklat, W.biru, { z: 2 })),
      tambah("Nia", ...tokoh("ni", 40, 172, "Nia")),
      tambah("tiga", teks("n3", 254, 58, "3 kartu", 10, W.ungu, { z: 2 })),
      tambah("kartu", ...[0, 1, 2].flatMap((i) => kartu(`c${i}`, 214 + i * 28, 66, 24, 34, W.krem, ["kartu"], 6.5))),
      ubah("dulu.", ...[0, 1, 2].map((i) => ({ id: `c${i}-k`, warna: "#FDE68A" }))),
    ),
    k(
      SUARA_O2,
      tambah("Maya", ...tokoh("bm", 262, 172, "Bu Maya")),
      tambah("tersenyum.", emo("sy", 232, 144, E.senyum, 20)),
      tambah("membuat", bintang("bt", 44, 112, 10, W.selMerah)),
      tambah("membaca", emo("kc", 84, 120, E.kaca, 22)),
      tambah("cepat", emo("kl", 150, 160, E.kilau, 20)),
      tambah("tepat!", emo("ok", 190, 160, E.benar, 20)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara Tadi"), ...panggungDepan("dn")),
      tambah("Tiga", teks("n3", 252, 44, "3 cara", 10, W.ungu, { z: 2 }), ...[0, 1, 2].map((i) => garis(`ul${i}`, 36, 78 + i * 46, 128, 0, W.ungu, 1.4, { z: 1 }))),
      tambah("Sticky", teks("m0", 100, 70, "1. Sticky Note Graph", 13, W.biru, { z: 2 }), emo("i0", 258, 68, E.catat, 22)),
      tambah("Row", teks("m1", 100, 116, "2. Row Comparing", 13, W.biru, { z: 2 }), emo("i1", 258, 114, "\u{2696}", 24)),
      tambah("Detective.", teks("m2", 100, 162, "3. Graph Detective", 13, W.biru, { z: 2 }), emo("i2", 258, 160, E.kaca, 22)),
    ),
    k(
      SUARA_O4,
      tambah("Diagram", teks("q0", 226, 90, "Diagram Kertas Tempel", 10, W.ungu, { z: 2 })),
      tambah("Banding", teks("q1", 226, 136, "Banding Baris", 10, W.ungu, { z: 2 })),
      tambah("Detektif", teks("q2", 226, 182, "Detektif Diagram", 10, W.ungu, { z: 2 })),
    ),
  ],
};

/* ------------------------------ Sticky Note Graph: konsep ------------------------------ */
const SUARA_C1 = "Cara pertama, Sticky Note Graph, atau Diagram Kertas Tempel.";
const SUARA_C2 = "Tiap anak menempel satu kertas kecil di lajur pilihannya.";
const SUARA_C3 = "Satu kertas berarti satu pilihan, jadi diagram terbentuk sendiri tanpa menggambar.";
const SUARA_C4 = "Kertasnya harus sama besar dan menempel rapat tanpa celah.";

export const ADEGAN_LUAR_TEMPEL: AdeganStory = {
  id: "luar-tempel",
  judul: "Sticky Note Graph: Diagram Kertas Tempel",
  sumber: "Metode global: Sticky Note Graph (konsep)",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_C1,
      bersih(0),
      tambah(0, judul("Cara Pertama"), ...panggungDepan("dn")),
      tambah("Sticky", ...kartu("nm", 50, 38, 200, 28, W.krem, ["Sticky Note Graph"], 13)),
      tambah("Diagram", teks("nid", 150, 100, "Diagram Kertas Tempel", 12, W.ungu, { z: 2 })),
      tambah("Tempel.", emo("ic", 150, 150, E.catat, 34), kertas("kx", 118, 128, "#FDE047", 14, -6), kertas("ky", 168, 130, "#93C5FD", 14, 5)),
    ),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Satu Kertas, Satu Anak"), ...panggungDepan("dn"), ...papanLayar("pl", 30, 36, 240, 110, 3, 1)),
      tambah("anak", ...tokoh("ch", 40, 172, "Chacha")),
      tambah("menempel", ...tumpuk("ta", 70, 146, 3, WARNA_KERTAS[0])),
      tambah("satu", teks("s1", 150, 160, "1 anak = 1 kertas", 9, W.coklat, { z: 2 })),
      tambah("lajur", teks("h0", 70, 50, "merah", 8, W.biru, { z: 2 }), teks("h1", 150, 50, "kuning", 8, W.biru, { z: 2 }), teks("h2", 230, 50, "hijau", 8, W.biru, { z: 2 }), ...tumpuk("tb", 150, 146, 2, WARNA_KERTAS[1]), ...tumpuk("tc", 230, 146, 4, WARNA_KERTAS[2])),
      tambah("pilihannya.", emo("ok", 262, 160, E.benar, 20)),
    ),
    k(
      SUARA_C3,
      hapus(0, "s1", "ok"),
      tambah("Satu", ...kartu("kk", 80, 156, 170, 18, W.krem, ["1 kertas = 1 pilihan"], 9)),
      sorotkan("pilihan,", ...idTumpuk("ta", 3), ...idTumpuk("tb", 2), ...idTumpuk("tc", 4)),
      tambah("diagram", panah("pn", 270, 140, 0, -70, W.ungu, 2.4)),
      tambah("sendiri", emo("kl", 262, 60, E.kilau, 18)),
      tambah("menggambar.", emo("x1", 36, 120, "\u{270F}", 22), emo("x2", 62, 120, E.salah, 18)),
    ),
    k(
      SUARA_C4,
      hapus(0, "kk-k", "kk-t0", "pn", "x1", "x2", "kl"),
      tambah("sama", teks("sb", 150, 160, "sama besar", 9, W.hijau, { z: 2 })),
      tambah("rapat", panah("pr", 100, 156, 100, 0, W.hijau, 2.2)),
      tambah("celah.", emo("ok", 262, 160, E.benar, 20), emo("ok2", 36, 120, E.benar, 20)),
    ),
  ],
};

/* ------------------------------ Sticky Note Graph: terapan ------------------------------ */
const SUARA_T1 = "Chacha bertanya warna selendang favorit kepada sepuluh penonton.";
const SUARA_T2 = "Setiap jawaban ditempeli satu kertas di lajur warnanya.";
const SUARA_T3 = "Cocok kalau datanya dikumpulkan langsung dari banyak orang.";
const SUARA_T4 = "Kurang cocok kalau datanya sudah ada di catatan, karena menempel lagi memakan waktu.";

export const ADEGAN_LUAR_TEMPEL_TERAPAN: AdeganStory = {
  id: "luar-tempel-terapan",
  judul: "Chacha bertanya warna favorit",
  sumber: "Metode global: Sticky Note Graph (terapan)",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_T1,
      bersih(0),
      tambah(0, judul("Warna Favorit"), ...panggungDepan("dn")),
      tambah("Chacha", ...tokoh("ch", 40, 172, "Chacha")),
      tambah("warna", ...selendang("s0", 36, 48, W.selMerah), ...selendang("s1", 36, 62, W.selKuning), ...selendang("s2", 36, 76, W.selHijau), ...selendang("s3", 36, 90, W.selBiru)),
      tambah("selendang", teks("sl", 62, 112, "selendang", 8, W.biru, { z: 2 })),
      tambah("sepuluh", teks("n10", 190, 126, "10 penonton", 10, W.ungu, { z: 2 }), ...[0, 1, 2, 3, 4].flatMap((i) => [emo(`pa${i}`, 130 + i * 28, 68, E.senyum, 18), emo(`pb${i}`, 130 + i * 28, 100, E.senyum, 18)])),
    ),
    k(
      SUARA_T2,
      bersih(0),
      tambah(0, judul("Satu Jawaban, Satu Kertas"), ...panggungDepan("dn"), ...papanLayar("pl", 24, 36, 252, 112, 4, 1)),
      tambah("jawaban", ...[0, 1, 2, 3].map((i) => teks(`h${i}`, 55 + i * 63, 50, ["merah", "kuning", "hijau", "biru"][i], 8, W.biru, { z: 2 }))),
      tambah("ditempeli", ...tumpuk("ta", 55, 146, 3, WARNA_KERTAS[0]), ...tumpuk("tb", 118, 146, 2, WARNA_KERTAS[1])),
      tambah("satu", teks("s1", 150, 162, "1 jawaban = 1 kertas", 9, W.coklat, { z: 2 })),
      tambah("lajur", ...tumpuk("tc", 181, 146, 2, WARNA_KERTAS[2]), ...tumpuk("td", 244, 146, 3, WARNA_KERTAS[3])),
      tambah("warnanya.", emo("ok", 262, 176, E.benar, 20)),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Kapan Cocok?"), ...panggungDepan("dn"), ...kartu("cc", 90, 36, 120, 24, W.hijauMuda, ["Cocok"], 12)),
      tambah("datanya", ...papanLayar("pl", 90, 74, 120, 56, 3, 1)),
      tambah("dikumpulkan", ...tumpuk("ta", 110, 130, 2, WARNA_KERTAS[0]), ...tumpuk("tb", 150, 130, 3, WARNA_KERTAS[1]), ...tumpuk("tc", 190, 130, 2, WARNA_KERTAS[2])),
      tambah("langsung", ...[0, 1, 2, 3, 4, 5].map((i) => emo(`pp${i}`, 36 + i * 46, 160, E.senyum, 18))),
      tambah("banyak", teks("by", 150, 148, "banyak orang", 9, W.hijau, { z: 2 })),
      tambah("orang.", emo("ok", 262, 100, E.benar, 24)),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?"), ...panggungDepan("dn"), ...kartu("kc", 80, 36, 140, 24, W.merahMuda, ["Kurang cocok"], 12)),
      tambah("datanya", ...kartu("ct", 90, 76, 120, 52, W.krem, ["catatan:", "merah 3, kuning 2", "hijau 4"], 8.5)),
      tambah("catatan,", emo("ic", 70, 108, E.catat, 24)),
      tambah("menempel", ...tumpuk("ta", 250, 150, 3, WARNA_KERTAS[0])),
      tambah("waktu.", emo("jm", 150, 158, "\u{23F3}", 24), emo("x1", 204, 158, E.salah, 22)),
    ),
  ],
};
