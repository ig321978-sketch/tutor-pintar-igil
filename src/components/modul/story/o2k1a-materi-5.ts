import type { AdeganStory } from "./logika-story";
import { balon, emo, hapus, k, sorotkan, tambah } from "./kit/dasar";
import { KALIMAT_KUNCI_1A, LINTANG, NIKO, TALA, rumput } from "./kit/dunia-k1";
import { LATAR_KEBUN, anak, aksiKunci, apelSebar, beringin, cincin, idKunci, idPenghitung, keranjangKebun, masuk, penghitung } from "./o2k1a-bantu";

/** Video materi Sub-Bab A (bagian 5): penutup. Ketiga anak mengumpulkan ulang apel dan menghitung sampai sepuluh dengan pelan-pelan. */
export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: sepuluh apel untuk kue",
  sumber: "Materi: penutup apel di keranjang",
  latar: LATAR_KEBUN,
  ketukan: [
    k("Ayo kumpulkan apelnya lagi.", tambah(0, rumput(150), ...anak(LINTANG), ...anak(TALA), ...anak(NIKO), ...keranjangKebun(), ...apelSebar(10))),
    k("Niko berkata, satu per satu, pelan-pelan!", tambah(2, ...balon("bn", 108, 56, 66, ["Pelan-pelan!"]))),
    k("Satu, dua, tiga, empat, lima.", hapus(0, "bn-k", "bn-t0"), tambah(0, ...penghitung("1")), ...[1, 2, 3, 4, 5].map((n) => masuk(n - 1, n, n))),
    k("Enam, tujuh, delapan, sembilan, sepuluh.", ...[6, 7, 8, 9, 10].map((n, i) => masuk(i, n, n))),
    k("Nenek berkata, sepuluh apel, cukup untuk kue!", tambah(2, cincin("rg", 174, 112, 94, 40)), tambah(3, emo("sn", 212, 70, "\u{1F60A}", 34))),
    k("Tala menunjuk satu per satu, lalu tersenyum.", hapus(0, ...idPenghitung), tambah(1, ...balon("bt", 56, 56, 48, ["Teliti!"]))),
    k(KALIMAT_KUNCI_1A, hapus(0, "bt-k", "bt-t0"), tambah(0, ...beringin()), sorotkan(0, "tk-igil"), ...aksiKunci()),
    k("Selanjutnya, Nenek menyiapkan makan sore.", hapus(0, ...idKunci), tambah(2, emo("mk1", 90, 50, "\u{1F37D}\u{FE0F}", 34), emo("mk2", 130, 50, "\u{1F35E}", 30))),
  ],
};
