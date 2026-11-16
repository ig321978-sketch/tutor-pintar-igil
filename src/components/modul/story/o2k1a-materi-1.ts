import type { AdeganStory, Aksi } from "./logika-story";
import { W, balon, emo, hapus, k, panah, sorotkan, tambah, ubah } from "./kit/dasar";
import { KALIMAT_KUNCI_1A, LINTANG, NIKO, TALA, benda, pohon, rumput } from "./kit/dunia-k1";
import { APEL, LATAR_KEBUN, U_APEL, aksiKunci, anak, beringin, idPenghitung, judulLangkah, keranjangKebun, penghitung, posSebar, slotKr } from "./o2k1a-bantu";

/**
 * Video Sub-Bab A (bagian 1): kampung bersiap; langkah TUNJUK (Niko melompati satu apel, Tala menunjuk, kalimat kunci).
 * Buku besar apel: sepuluh apel kebun (a1..a10). Sesudah tiba: a5..a10 di keranjang, a1..a4 di rumput.
 */

const JARI = "\u{1F446}";
/** Apel a1..a4 di rumput (urutan dari kiri ke kanan) dan apel a5..a10 di keranjang. */
const rumputKiri = (i: number): readonly [number, number] => posSebar(i - 1);
const apelKeranjang = (n: number) => benda("a" + n, slotKr(n - 5)[0], slotKr(n - 5)[1], APEL, U_APEL);
const jariDi = (i: number): { id: string; x: number; y: number } => ({ id: "jn", x: rumputKiri(i)[0], y: rumputKiri(i)[1] - 22 });

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
      tambah(5, ...GANTUNG.map(([x, y], i) => benda("a" + (i + 1), x, y, APEL, U_APEL))),
    ),
    k(
      "Angin datang. Apel jatuh di rumput.",
      tambah(0, emo("an", 170, 66, "\u{1F4A8}", 26)),
      ubah(3, ...Array.from({ length: 10 }, (_, i) => ({ id: "a" + (i + 1), x: posSebar(i)[0], y: posSebar(i)[1] }))),
    ),
    k("Niko dan Tala datang membantu.", hapus(0, "an"), tambah(0, ...anak(NIKO), ...anak(TALA))),
    k(
      "Kata Nenek, tolong kumpulkan apelnya.",
      hapus(0, "tk-lintang-lb", "tk-niko-lb", "tk-tala-lb"),
      hapus(1, "ap-bt", "ap-tj"),
      tambah(1, emo("bc", 122, 56, "\u{1F4AC}", 28)),
      tambah(2, ...keranjangKebun()),
      ubah(4, ...[5, 6, 7, 8, 9, 10].map((n) => ({ id: "a" + n, x: slotKr(n - 5)[0], y: slotKr(n - 5)[1] }))),
    ),
  ],
};

/* ------------------------------ TUNJUK: Niko melompati satu apel, Tala menunjuk, Igil mengucapkan kalimat kunci ------------------------------ */
/** Jari Niko menunjuk apel `urut` (a1..a4) sambil menyebut bilangan; apel yang ditunjuk disorot bergantian. Tidak ada apel yang berpindah. */
const tunjuk = (kata: number, i: number, bilangan: string, sebelum: number | null): Aksi[] => [
  ubah(kata, { ...jariDi(i) }, { id: "a" + i, sorot: true }, { id: "cn-t", isi: bilangan }, ...(sebelum === null ? [] : [{ id: "a" + sebelum, sorot: false }])),
];

export const ADEGAN_NIKO_SALAH: AdeganStory = {
  id: "niko-salah",
  judul: "Tunjuk: Niko melompati satu apel",
  sumber: "Metode: tunjuk dan sebut satu per satu",
  latar: LATAR_KEBUN,
  ketukan: [
    k(
      "Niko bertanya, boleh cepat-cepat?",
      tambah(0, rumput(150), ...anak(NIKO), ...keranjangKebun(), ...[5, 6, 7, 8, 9, 10].map(apelKeranjang), ...[1, 2, 3, 4].map((n) => benda("a" + n, rumputKiri(n)[0], rumputKiri(n)[1], APEL, U_APEL)), judulLangkah("TUNJUK", 196, 16)),
      tambah(1, ...beringin()),
      tambah(2, ...balon("bn", 108, 56, 72, ["Cepat-cepat?"])),
    ),
    k(
      "Igil menjawab, coba saja, kita lihat.",
      hapus(0, "bn-k", "bn-t0"),
      sorotkan(0, "tk-igil"),
      tambah(2, ...balon("bj", 150, 34, 66, ["Coba saja!"])),
    ),
    k("Niko buru-buru menghitung apel.", hapus(0, "bj-k", "bj-t0"), ubah(0, { id: "tk-igil", sorot: false }), tambah(1, emo("jn", jariDi(1).x, jariDi(1).y, JARI, 22))),
    // Satu salah hitung nyata: jari Niko melompati a3, jadi ia berkata tiga padahal empat apel.
    k(
      "Satu, dua, tiga. Tiga!",
      tambah(0, ...penghitung("1")),
      ...tunjuk(0, 1, "1", null),
      ...tunjuk(1, 2, "2", 1),
      ...tunjuk(2, 4, "3", 2),
      ubah(3, { id: "a4", sorot: false }, { id: "a3", sorot: true }),
    ),
    k("Tala menunjuk apel yang lupa dihitung.", tambah(0, ...anak(TALA)), tambah(2, panah("pn", rumputKiri(3)[0], rumputKiri(3)[1] - 24, 0, 16, W.merah, 3))),
    k("Tala berkata, hampir pas!", hapus(0, "pn"), tambah(2, ...balon("bt", 56, 56, 62, ["Hampir pas!"]))),
    k(
      "Niko menunjuk lagi. Satu, dua, tiga, empat.",
      hapus(0, "bt-k", "bt-t0", ...idPenghitung),
      ubah(0, { id: "a3", sorot: false }),
      tambah(3, ...penghitung("1")),
      ...tunjuk(3, 1, "1", null),
      ...tunjuk(4, 2, "2", 1),
      ...tunjuk(5, 3, "3", 2),
      ...tunjuk(6, 4, "4", 3),
    ),
    k(
      "Igil berkata begini. " + KALIMAT_KUNCI_1A,
      hapus(0, ...idPenghitung, "jn"),
      ubah(0, { id: "a4", sorot: false }),
      sorotkan(0, "tk-igil"),
      ...aksiKunci(3),
    ),
    k(
      "Yang terakhir empat. Itu untuk semua apel.",
      hapus(0, "kn-k", "kn-t0", "kn-t1", "kn-t2", "kn-t3"),
      tambah(0, ...penghitung("4")),
      ubah(0, { id: "tk-igil", sorot: false }),
      sorotkan(5, "a1", "a2", "a3", "a4"),
    ),
  ],
};
