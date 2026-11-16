import type { AdeganStory, Obj } from "./logika-story";
import { W, balon, bulat, emo, hapus, k, panah, redamkan, sorotkan, tambah, teks, ubah } from "./kit/dasar";
import { LINTANG, NIKO, TALA, benda, rumput } from "./kit/dunia-k1";
import { APEL, LATAR_KEBUN, anak, idApel, penghitung } from "./o2k1a-bantu";

/** Video metode luar Sub-Bab A (bagian 1): pembuka dan cara "Tanda Satu-Satu" (konsep dan terapan). */

/** Deret `n` apel sebaris mulai di x0, jarak 34, baris di y = 176. Id a1..an. */
export const apelSebaris = (n: number, x0 = 110): Obj[] => Array.from({ length: n }, (_, i) => benda("a" + (i + 1), x0 + 34 * i, 176, APEL, 22));
/** Satu tanda merah (titik) di atas apel pada x. */
export const tanda = (id: string, x: number): Obj => bulat(id, x, 150, 4.5, W.merah, W.merah);
const idTanda = (n: number): string[] => Array.from({ length: n }, (_, i) => "tn" + (i + 1));
const bingkai = (id: string, x: number, y: number, w: number, h: number): Obj => ({ id, t: "kotak", x, y, w, h, warna: "none", garis: W.merah, rx: 8, tebal: 2 });

/* ------------------------------ Pembuka ------------------------------ */
export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "pembuka",
  judul: "Pembuka: kenapa diberi tanda",
  sumber: "Metode luar: pembuka",
  latar: LATAR_KEBUN,
  ketukan: [
    k(
      "Sebelumnya, Tala menghitung apel satu per satu.",
      tambah(0, rumput(150), ...anak(TALA), ...apelSebaris(5)),
      sorotkan(3, ...idApel(1, 5)),
      redamkan(6, ...idApel(1, 5)),
    ),
    k(
      "Lintang bertanya, kenapa harus diberi tanda?",
      tambah(0, ...anak(LINTANG), ...balon("bl", 4, 52, 112, ["Kenapa diberi tanda?"])),
      tambah(5, ...idTanda(5).map((id, i) => tanda(id, 110 + 34 * i))),
    ),
    k(
      "Tala menjawab. Supaya tidak terlewat atau dihitung dua kali.",
      hapus(0, "bl-k", "bl-t0"),
      tambah(0, ...balon("bt", 60, 52, 92, ["Jangan dua kali!"])),
      tambah(7, ...penghitung("2", 252, 8), tanda("tn3b", 190)),
      sorotkan(7, "a3"),
    ),
  ],
};

/* ------------------------------ Tanda Satu-Satu: konsep ------------------------------ */
export const ADEGAN_LUAR_TANDA: AdeganStory = {
  id: "tanda-konsep",
  judul: "Tanda Satu-Satu: konsep",
  sumber: "Metode luar: Tanda Satu-Satu",
  latar: LATAR_KEBUN,
  ketukan: [
    k("Cara pertama: Tanda Satu-Satu.", tambah(0, rumput(150), ...anak(TALA), ...apelSebaris(5)), tambah(2, teks("jd", 150, 22, "Tanda Satu-Satu", 13, W.ungu))),
    k("Sebut apel, beri tanda.", sorotkan(0, "a1"), tambah(3, tanda("tn1", 110))),
    k(
      "Satu, dua, tiga, empat, lima.",
      tambah(0, ...penghitung("1", 252, 8)),
      ...idApel(1, 5).map((id, i) => ubah(i, { id, sorot: true }, ...(i > 0 ? [{ id: "a" + i, sorot: false }] : []), { id: "cn-t", isi: String(i + 1) })),
      ...[2, 3, 4, 5].map((n) => tambah(n - 1, tanda("tn" + n, 110 + 34 * (n - 1)))),
    ),
    k("Tandanya lima. Apelnya juga lima.", redamkan(0, "a5"), tambah(0, bingkai("rt", 98, 142, 160, 16)), tambah(2, bingkai("ra", 98, 158, 160, 26))),
    k("Tanda menunjukkan apel yang sudah disebut.", sorotkan(2, ...idTanda(5))),
    k("Kalau ada yang belum bertanda, kita tahu.", tambah(0, emo("li", 60, 56, "\u{1F4A1}", 30))),
    k("Tidak ada apel yang terlewat.", hapus(0, "li"), tambah(2, emo("ok", 270, 120, "✅", 30))),
    k("Tala berkata, tanda membantu kita teliti.", tambah(0, ...balon("bt", 56, 56, 48, ["Teliti!"]))),
  ],
};

/* ------------------------------ Tanda Satu-Satu: terapan (Niko menghitung salah, Tala menolong) ------------------------------ */
const X6 = (i: number): number => 96 + 34 * i;

export const ADEGAN_LUAR_TANDA_TERAPAN: AdeganStory = {
  id: "tanda-terapan",
  judul: "Tanda Satu-Satu: apel yang belum bertanda",
  sumber: "Metode luar: terapan tanda",
  latar: LATAR_KEBUN,
  ketukan: [
    k(
      "Niko memberi tanda pada apel.",
      tambah(0, rumput(150), ...anak(NIKO), ...apelSebaris(6, 96)),
      tambah(3, ...idTanda(6).filter((_, i) => i !== 4).map((id) => tanda(id, X6(Number(id.slice(2)) - 1)))),
    ),
    k("Niko berseru, lima, selesai!", tambah(2, ...penghitung("5", 252, 8)), tambah(3, ...balon("bn", 108, 56, 56, ["Selesai!"]))),
    k("Tala berkata, hampir pas!", hapus(0, "bn-k", "bn-t0"), tambah(0, ...anak(TALA)), tambah(2, ...balon("bt", 56, 56, 62, ["Hampir pas!"]))),
    k("Tala menunjuk apel yang belum bertanda.", hapus(0, "bt-k", "bt-t0"), sorotkan(2, "a5"), tambah(2, panah("pn", X6(4), 124, 0, 20, W.merah, 3))),
    k("Niko memberi tanda pada apel itu.", tambah(3, tanda("tn5", X6(4))), hapus(3, "pn"), redamkan(4, "a5")),
    k("Niko menghitung ulang dari satu.", ubah(4, { id: "cn-t", isi: "1" })),
    k("Satu, dua, tiga, empat, lima, enam.", ...idApel(1, 6).map((id, i) => ubah(i, { id, sorot: true }, ...(i > 0 ? [{ id: "a" + i, sorot: false }] : []), { id: "cn-t", isi: String(i + 1) }))),
    k("Ada enam apel, enam tanda.", redamkan(0, "a6"), sorotkan(4, ...idTanda(6))),
  ],
};
