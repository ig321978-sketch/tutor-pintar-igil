import type { AdeganStory, Aksi } from "./logika-story";
import { W, balon, emo, gambarTokoh, hapus, k, kartu, kotak, redamkan, sorotkan, tambah, teks, ubah } from "./kit/dasar";
import { IGIL, KALIMAT_KUNCI_1A, NIKO, benda, rumput } from "./kit/dunia-k1";
import { APEL, LATAR_TERANG, MODEL_TULIS, U_APEL, WARNA_JALUR, aksiKunci, anak, bingkaiSepuluh, cincin, idBenda, idBingkai, idKunci, keNampan, keRumput, nampan, penghitung, posSebar } from "./o2k1a-bantu";

/**
 * Video Sub-Bab A (bagian 5): puncak dan penutup. Satu soal memakai keempat langkah: isi nampan sepuluh (ISI), Niko menunjuk tiap apel (TUNJUK),
 * menggesernya ke nampan (GESER), lalu menulis label sepuluh (TULIS). Niko berhenti sendiri saat tergesa; Igil mengangguk dan mengucapkan kalimat kunci.
 */

const NAMA_LANGKAH = ["TUNJUK", "GESER", "ISI", "TULIS"];
const legenda = () => NAMA_LANGKAH.flatMap((n, i) => kartu("lg" + (i + 1), 8 + 68 * i, 4, 62, 18, "#DBEAFE", [n], 8));
const awalApel = (i: number): [number, number] => [posSebar(i - 1)[0], posSebar(i - 1)[1] - 22];
const mini = (d: string): string => d.replace(/-?\d+(?:\.\d+)?/g, (n) => String(Number(n) / 2));

/** Apel i ditunjuk jari lalu digeser ke petak i pada kata nomor `kata`, sambil menyebut bilangan i. */
const tunjukGeser = (kata: number, i: number): Aksi[] => [
  ubah(kata, { id: "jn", x: awalApel(i)[0], y: awalApel(i)[1] }, { id: "a" + i, sorot: true }, { id: "cn-t", isi: String(i) }, ...(i > 1 && i !== 6 ? [{ id: "a" + (i - 1), sorot: false }] : [])),
  keNampan(kata, i),
];

export const ADEGAN_PUNCAK: AdeganStory = {
  id: "puncak",
  judul: "Puncak: sepuluh apel, empat langkah",
  sumber: "Cerita: puncak, Niko menahan diri",
  latar: LATAR_TERANG,
  ketukan: [
    k(
      "Ayo isi Bingkai Sepuluh itu.",
      tambah(
        0,
        rumput(150),
        nampan(),
        ...bingkaiSepuluh(),
        ...anak(NIKO, 30, 112),
        ...gambarTokoh(IGIL, 270, 40),
        ...Array.from({ length: 10 }, (_, i) => benda("a" + (i + 1), posSebar(i)[0], posSebar(i)[1], APEL, U_APEL)),
        ...legenda(),
        ...penghitung("0", 8, 26),
      ),
      tambah(2, teks("bs", 150, 150, "Bingkai Sepuluh", 10, W.ungu)),
    ),
    k(
      "Niko cepat. Satu, dua, tiga.",
      ...[1, 2, 3].flatMap((n) => [keNampan(n + 1, n), ubah(n + 1, { id: "cn-t", isi: String(n) })]),
    ),
    k(
      "Niko berhenti sendiri. Eh! Satu per satu, pelan-pelan!",
      tambah(3, ...balon("be", 4, 72, 40, ["Eh!"])),
      hapus(4, "be-k", "be-t0"),
      tambah(4, ...balon("bp", 4, 72, 66, ["Pelan-pelan!"])),
      keRumput(5, 1),
      keRumput(5, 2),
      keRumput(5, 3),
      ubah(5, { id: "cn-t", isi: "0" }),
    ),
    k(
      "Igil mengangguk. " + KALIMAT_KUNCI_1A,
      hapus(0, "bp-k", "bp-t0", "cn-k", "cn-t"),
      ubah(0, { id: "tk-igil", sorot: true, rot: -15 }),
      ubah(2, { id: "tk-igil", rot: 0 }),
      ...aksiKunci(2, 26),
    ),
    k(
      "Niko menunjuk, lalu menggeser. Satu, dua, tiga, empat, lima.",
      hapus(0, ...idKunci),
      ubah(0, { id: "tk-igil", sorot: false }),
      tambah(1, emo("jn", awalApel(1)[0], awalApel(1)[1], "\u{1F446}", 22)),
      tambah(4, ...penghitung("1", 8, 26)),
      ...[1, 2, 3, 4, 5].flatMap((n) => tunjukGeser(3 + n, n)),
    ),
    k("Enam, tujuh, delapan, sembilan, sepuluh.", ubah(0, { id: "a5", sorot: false }), ...[6, 7, 8, 9, 10].flatMap((n, i) => tunjukGeser(i, n))),
    k(
      "Nampan penuh. Satu petak, satu apel.",
      hapus(0, "jn"),
      redamkan(0, ...idBenda("a", 10)),
      sorotkan(3, ...idBingkai),
      sorotkan(5, ...idBenda("a", 10)),
    ),
    k(
      "Niko menulis label. Satu, lalu nol.",
      hapus(0, "bs"),
      redamkan(0, ...idBingkai, ...idBenda("a", 10)),
      tambah(0, kotak("bp2", 110, 142, 80, 58, W.putih, W.coklat, { rx: 8, tebal: 1.8 }), emo("jr", 100, 172, "\u{1F446}", 26)),
      tambah(3, { id: "jl-1-0", t: "jalur", x: 118, y: 150, d: mini(MODEL_TULIS["1"][0]), warna: "none", garis: WARNA_JALUR[0], tebal: 6, gambar: true, sorot: true }),
      ubah(5, { id: "jl-1-0", sorot: false }),
      tambah(5, { id: "jl-0-0", t: "jalur", x: 152, y: 150, d: mini(MODEL_TULIS["0"][0]), warna: "none", garis: WARNA_JALUR[1], tebal: 6, gambar: true, sorot: true }),
    ),
    k(
      "Igil berkata, tunjuk, geser, isi, tulis!",
      sorotkan(0, "tk-igil"),
      sorotkan(2, "lg1-k"),
      sorotkan(3, "lg2-k"),
      sorotkan(4, "lg3-k"),
      sorotkan(5, "lg4-k"),
    ),
    k(
      "Nenek berkata, sepuluh apel, cukup untuk kue!",
      ubah(0, { id: "tk-igil", sorot: false }),
      tambah(2, cincin("rg", 49, 46, 202, 98)),
      tambah(3, emo("ku", 232, 176, "\u{1F370}", 32), emo("sn", 64, 176, "\u{1F60A}", 30)),
    ),
    k("Selanjutnya, Nenek menyiapkan makan sore.", hapus(0, "rg", "ku", "sn"), tambah(2, emo("mk1", 60, 190, "\u{1F37D}\u{FE0F}", 30), emo("mk2", 240, 190, "\u{1F35E}", 30))),
  ],
};
