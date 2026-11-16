import type { AdeganStory } from "./logika-story";
import { balon, emo, hapus, k, tambah, ubah } from "./kit/dasar";
import { LINTANG, NIKO, TALA, rumput } from "./kit/dunia-k1";
import { LATAR_KEBUN, anak, apelSebar, beringin, cincin, idPenghitung, keranjangKebun, masuk, penghitung } from "./o2k1a-bantu";

/** Video Sub-Bab A (bagian 5): puncak dan penutup. Niko menahan diri, ketiga anak menghitung sepuluh apel satu per satu. */
export const ADEGAN_PUNCAK: AdeganStory = {
  id: "puncak",
  judul: "Puncak: sepuluh apel untuk kue",
  sumber: "Cerita: puncak, Niko menahan diri",
  latar: LATAR_KEBUN,
  ketukan: [
    k("Ayo kumpulkan apelnya lagi.", tambah(0, rumput(150), ...anak(LINTANG), ...anak(TALA), ...anak(NIKO), ...keranjangKebun(), ...apelSebar(10))),
    k("Niko ingin menghitung cepat-cepat.", tambah(2, ...balon("bn", 108, 56, 72, ["Cepat-cepat?"]))),
    k(
      "Igil menjawab begini. Coba saja, kita lihat. Tadi cepat-cepat ada yang lupa dihitung.",
      hapus(0, "bn-k", "bn-t0"),
      tambah(0, ...beringin()),
      ubah(0, { id: "tk-igil", sorot: true }),
      tambah(3, ...balon("bi", 150, 34, 66, ["Coba saja!"])),
    ),
    k(
      "Niko berkata, satu per satu, pelan-pelan!",
      hapus(0, "bi-k", "bi-t0"),
      ubah(0, { id: "tk-igil", sorot: false }),
      tambah(2, ...balon("bp", 108, 56, 72, ["Pelan-pelan!"])),
    ),
    k("Satu, dua, tiga, empat, lima.", hapus(0, "bp-k", "bp-t0"), tambah(0, ...penghitung("1")), ...[1, 2, 3, 4, 5].map((n) => masuk(n - 1, n, n))),
    k("Enam, tujuh, delapan, sembilan, sepuluh.", ...[6, 7, 8, 9, 10].map((n, i) => masuk(i, n, n))),
    k("Nenek berkata, sepuluh apel, cukup untuk kue!", tambah(2, cincin("rg", 174, 112, 94, 40)), tambah(3, emo("sn", 212, 70, "\u{1F60A}", 34), emo("ku", 122, 56, "\u{1F370}", 30))),
    k("Selanjutnya, Nenek menyiapkan makan sore.", hapus(0, ...idPenghitung, "rg", "ku"), tambah(2, emo("mk1", 90, 50, "\u{1F37D}\u{FE0F}", 34), emo("mk2", 130, 50, "\u{1F35E}", 30))),
  ],
};
