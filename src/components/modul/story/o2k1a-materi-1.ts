import type { AdeganStory } from "./logika-story";
import { W, balon, emo, hapus, k, panah, sorotkan, tambah, ubah } from "./kit/dasar";
import { KALIMAT_KUNCI_1A, LINTANG, NIKO, TALA, benda, pohon, rumput } from "./kit/dunia-k1";
import { APEL, LATAR_KEBUN, U_APEL, aksiKunci, anak, beringin, cincin, idApel, idKunci, idPenghitung, keranjangKebun, ketukanTuang, masuk, penghitung, posSebar, slotKr } from "./o2k1a-bantu";

/** Video Sub-Bab A (bagian 1): kampung bersiap; langkah TUNJUK (Niko buru-buru, Tala menunjuk, kalimat kunci). */

/* ------------------------------ Tiba di kebun ------------------------------ */
// Letak apel di tajuk pohon apel (pusat tajuk sekitar (240, 78)).
const GANTUNG: [number, number][] = [[222, 62], [240, 54], [258, 64], [214, 82], [232, 76], [250, 82], [268, 84], [224, 100], [242, 98], [260, 100]];

export const ADEGAN_TIBA: AdeganStory = {
  id: "tiba",
  judul: "Kampung bersiap dan apel di kebun Nenek",
  sumber: "Cerita: kampung bersiap, kebun Nenek",
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
  ],
};

/* ------------------------------ TUNJUK: Niko buru-buru, Tala menunjuk, Igil mengucapkan kalimat kunci ------------------------------ */
const BARIS: [number, number][] = [[30, 186], [72, 186], [114, 186], [156, 186]];

export const ADEGAN_NIKO_SALAH: AdeganStory = {
  id: "niko-salah",
  judul: "Tunjuk: Niko buru-buru lalu Tala menunjuk",
  sumber: "Metode: tunjuk dan sebut satu per satu",
  latar: LATAR_KEBUN,
  ketukan: [
    k(
      "Niko bertanya, boleh cepat-cepat?",
      tambah(0, rumput(150), ...anak(NIKO)),
      tambah(1, ...beringin()),
      tambah(2, ...balon("bn", 108, 56, 72, ["Cepat-cepat?"])),
    ),
    k(
      "Igil menjawab, coba saja, kita lihat.",
      hapus(0, "bn-k", "bn-t0"),
      sorotkan(0, "tk-igil"),
      tambah(2, ...balon("bj", 150, 34, 66, ["Coba saja!"])),
    ),
    k(
      "Niko buru-buru memasukkan apel.",
      hapus(0, "bj-k", "bj-t0"),
      ubah(0, { id: "tk-igil", sorot: false }),
      tambah(1, ...keranjangKebun(), ...BARIS.map(([x, y], i) => benda(`a${i + 1}`, x, y, APEL, U_APEL))),
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
    k("Tala menunjuk apel yang lupa dihitung.", tambah(0, ...anak(TALA)), tambah(2, panah("pn", 114, 146, 0, 20, W.merah, 3))),
    k("Tala berkata, hampir pas!", hapus(0, "pn"), tambah(2, ...balon("bt", 56, 56, 62, ["Hampir pas!"]))),
    k(
      "Niko mengulang dari awal. Satu, dua, tiga, empat.",
      hapus(0, "bt-k", "bt-t0", ...idPenghitung),
      ubah(0, ...[1, 2, 4].map((n) => ({ id: `a${n}`, x: BARIS[n - 1][0], y: BARIS[n - 1][1] })), { id: "a3", sorot: false }),
      tambah(4, ...penghitung("1")),
      ...idApel(1, 4).map((_, i) => masuk(4 + i, i + 1, i + 1)),
    ),
    k(
      `Igil berkata begini. ${KALIMAT_KUNCI_1A}`,
      hapus(0, ...idPenghitung),
      sorotkan(0, "tk-igil"),
      ...aksiKunci(3),
    ),
    k(
      "Yang terakhir empat. Itu untuk semua apel.",
      hapus(0, ...idKunci),
      tambah(0, ...penghitung("4")),
      ubah(0, { id: "tk-igil", sorot: false }),
      tambah(3, cincin("rg", 176, 130, 72, 26)),
      sorotkan(5, ...idApel(1, 4)),
    ),
    ketukanTuang(idApel(1, 4), [...idPenghitung, "rg"]),
  ],
};
