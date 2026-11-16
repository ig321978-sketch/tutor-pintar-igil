import type { AdeganStory } from "./logika-story";
import { W, balon, emo, hapus, k, panah, sorotkan, tambah, ubah } from "./kit/dasar";
import { BENDA, LINTANG, NIKO, TALA, benda, pohon, rumput } from "./kit/dunia-k1";
import { APEL, LATAR_KEBUN, U_APEL, anak, beringin, idApel, idPenghitung, keranjangKebun, ketukanTuang, masuk, penghitung, posSebar, slotKr } from "./o2k1a-bantu";

/** Video materi Sub-Bab A (bagian 1): kampung bersiap, aturan Igil, dan kesalahan Niko yang dibetulkan Tala. */

/* ------------------------------ Tiba di kebun ------------------------------ */
// Letak apel di tajuk pohon apel (pusat tajuk sekitar (240, 78)).
const GANTUNG: [number, number][] = [[222, 62], [240, 54], [258, 64], [214, 82], [232, 76], [250, 82], [268, 84], [224, 100], [242, 98], [260, 100]];

export const ADEGAN_TIBA: AdeganStory = {
  id: "tiba",
  judul: "Kampung bersiap dan apel di kebun Nenek",
  sumber: "Materi: kampung bersiap, kebun Nenek",
  latar: LATAR_KEBUN,
  ketukan: [
    k(
      "Sebelumnya, Kampung Cemara bersiap untuk Pesta Panen.",
      tambah(0, rumput(150)),
      tambah(1, emo("rm1", 28, 44, "\u{1F3E0}", 24), emo("rm2", 66, 50, "\u{1F3E0}", 24)),
      tambah(5, emo("pt", 110, 44, "\u{1F389}", 26)),
    ),
    k(
      "Lintang cucu Nenek. Nenek punya kebun apel.",
      tambah(0, ...anak(LINTANG)),
      tambah(4, ...pohon("ap", 240, 148, 1.3)),
      tambah(5, ...GANTUNG.map(([x, y], i) => benda(`a${i + 1}`, x, y, APEL, U_APEL))),
    ),
    k(
      "Angin datang. Apel jatuh di rumput.",
      tambah(0, emo("an", 170, 66, "\u{1F4A8}", 26)),
      ubah(3, ...Array.from({ length: 10 }, (_, i) => ({ id: `a${i + 1}`, x: posSebar(i)[0], y: posSebar(i)[1] }))),
    ),
    k("Niko dan Tala datang membantu.", hapus(0, "an"), tambah(0, ...anak(NIKO), ...anak(TALA))),
    k(
      "Kata Nenek, tolong kumpulkan apelnya.",
      hapus(0, "tk-lintang-lb", "tk-niko-lb", "tk-tala-lb"),
      tambah(1, emo("bc", 122, 56, "\u{1F4AC}", 28)),
    ),
    k("Apelnya untuk kue Pesta Panen.", tambah(3, emo("ku", 190, 56, BENDA.kue, 28))),
  ],
};

/* ------------------------------ Aturan Igil ------------------------------ */
export const ADEGAN_ATURAN: AdeganStory = {
  id: "aturan",
  judul: "Aturan Igil",
  sumber: "Materi: aturan Igil",
  latar: LATAR_KEBUN,
  ketukan: [
    k(
      "Dari pohon beringin, Igil menyapa.",
      tambah(0, rumput(150), ...anak(LINTANG), ...anak(TALA), ...anak(NIKO)),
      tambah(2, ...beringin()),
    ),
    k(
      "Igil punya aturan. Satu per satu, pelan-pelan.",
      ubah(0, { id: "tk-igil", sorot: true }),
      tambah(3, ...balon("bi", 150, 34, 76, ["Satu per satu"])),
    ),
    k(
      "Niko bertanya, boleh cepat-cepat?",
      hapus(0, "bi-k", "bi-t0"),
      ubah(0, { id: "tk-igil", sorot: false }),
      tambah(2, ...balon("bn", 108, 56, 72, ["Cepat-cepat?"])),
    ),
    k(
      "Igil menjawab, coba saja, kita lihat.",
      hapus(0, "bn-k", "bn-t0"),
      tambah(2, ...balon("bj", 150, 34, 66, ["Coba saja!"])),
      sorotkan(2, "tk-igil"),
    ),
  ],
};

/* ------------------------------ Niko buru-buru: satu kesalahan, dibetulkan Tala ------------------------------ */
const BARIS: [number, number][] = [[30, 186], [72, 186], [114, 186], [156, 186]];

export const ADEGAN_NIKO_SALAH: AdeganStory = {
  id: "niko-salah",
  judul: "Niko buru-buru lalu Tala menunjuk",
  sumber: "Materi: Niko salah, Tala betul",
  latar: LATAR_KEBUN,
  ketukan: [
    k(
      "Niko buru-buru memasukkan apel.",
      tambah(0, rumput(150), ...anak(NIKO), ...keranjangKebun(), ...BARIS.map(([x, y], i) => benda(`a${i + 1}`, x, y, APEL, U_APEL))),
    ),
    // Satu kesalahan saja: apel ketiga terlewat, jadi Niko berhenti di tiga padahal ada empat apel.
    k(
      "Satu, dua, tiga. Tiga!",
      tambah(0, ...penghitung("1")),
      masuk(0, 1, 1),
      masuk(1, 2, 2),
      ubah(2, { id: "a4", x: slotKr(2)[0], y: slotKr(2)[1] }, { id: "cn-t", isi: "3" }),
      sorotkan(3, "a3"),
    ),
    k("Tala menunjuk apel yang terlewat.", tambah(0, ...anak(TALA)), tambah(2, panah("pn", 114, 146, 0, 20, W.merah, 3))),
    k("Tala berkata, hampir pas!", hapus(0, "pn"), tambah(2, ...balon("bt", 56, 56, 62, ["Hampir pas!"]))),
    k(
      "Tala mengulang dari awal.",
      hapus(0, "bt-k", "bt-t0", ...idPenghitung),
      ubah(0, ...[1, 2, 4].map((n) => ({ id: `a${n}`, x: BARIS[n - 1][0], y: BARIS[n - 1][1] })), { id: "a3", sorot: false }),
    ),
    k("Satu, dua, tiga, empat.", tambah(0, ...penghitung("1")), ...idApel(1, 4).map((_, i) => masuk(i, i + 1, i + 1))),
    k("Sekarang pas. Ada empat apel.", sorotkan(0, "kr-bd", "kr-tp"), tambah(2, emo("sn", 150, 66, "\u{1F60A}", 34))),
    ketukanTuang(idApel(1, 4), [...idPenghitung, "sn"]),
  ],
};
