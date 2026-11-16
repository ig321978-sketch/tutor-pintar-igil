import type { Aksi, AdeganStory } from "./logika-story";
import { W, balon, eja, emo, hapus, k, kotak, panah, redamkan, sorotkan, tambah, ubah } from "./kit/dasar";
import { KALIMAT_KUNCI_1A, LINTANG, NIKO, TALA, benda, idKumpul, kumpulBenda, lambang, rumput } from "./kit/dunia-k1";
import { APEL, LATAR_KEBUN, LATAR_TERANG, U_APEL, anak, aksiKunci, apelSebar, beringin, cincin, idApel, idPenghitung, keranjangKebun, ketukanTuang, masuk, penghitung, posSebar, slotKr, tandaTanya } from "./o2k1a-bantu";

/** Video materi Sub-Bab A (bagian 2): menghitung, kardinalitas, membaca lambang satu sampai sepuluh, dan nol (angin datang lagi). */

const huruf1 = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

/* ------------------------------ Tala menghitung lima apel ------------------------------ */
export const ADEGAN_HITUNG_LIMA: AdeganStory = {
  id: "hitung-lima",
  judul: "Menghitung satu per satu sampai yang terakhir",
  sumber: "Materi: hitung lima apel",
  latar: LATAR_KEBUN,
  ketukan: [
    k("Sekarang Tala menghitung. Pelan-pelan.", tambah(0, rumput(150), ...anak(TALA), ...keranjangKebun(), ...apelSebar(5))),
    k("Satu, dua, tiga, empat, lima.", tambah(0, ...penghitung("1")), ...idApel(1, 5).map((_, i) => masuk(i, i + 1, i + 1))),
    k("Yang terakhir disebut adalah lima.", sorotkan(1, "a5")),
    k(
      "Igil berkata, lima itu untuk semua apel ini.",
      tambah(0, ...beringin()),
      tambah(5, cincin("rg", 174, 128, 94, 24)),
      sorotkan(5, "a1", "a2", "a3", "a4"),
    ),
    k("Ada berapa apel di keranjang?", hapus(0, ...idPenghitung), tambah(1, tandaTanya())),
    k("Ada lima apel di keranjang.", hapus(0, "qm"), tambah(1, ...penghitung("5"))),
    ketukanTuang(idApel(1, 5), [...idPenghitung, "rg"]),
  ],
};

/* ------------------------------ Lintang menghitung tujuh apel (singkat) dan kalimat kunci ------------------------------ */
export const ADEGAN_HITUNG_TUJUH: AdeganStory = {
  id: "hitung-tujuh",
  judul: "Tujuh apel dan kalimat kunci",
  sumber: "Materi: hitung tujuh apel",
  latar: LATAR_KEBUN,
  ketukan: [
    k("Giliran Lintang menghitung apel.", tambah(0, rumput(150), ...anak(LINTANG), ...keranjangKebun(), ...apelSebar(7))),
    k("Satu, dua, tiga, empat, lima, enam, tujuh.", tambah(0, ...penghitung("1")), ...idApel(1, 7).map((_, i) => masuk(i, i + 1, i + 1))),
    k("Lintang bertanya, kenapa yang terakhir?", tambah(2, ...balon("bl", 4, 56, 88, ["Kenapa terakhir?"])), sorotkan(4, "a7")),
    k("" + KALIMAT_KUNCI_1A, hapus(0, "bl-k", "bl-t0", ...idPenghitung), tambah(0, ...beringin()), sorotkan(0, "tk-igil"), ...aksiKunci(), tambah(7, cincin("rg", 174, 112, 94, 40))),
  ],
};

/* ------------------------------ Membaca lambang: satu lambang dengan bendanya ------------------------------ */
const aksiBaca = (n: number, prev: number | null, awal: string[] = []): Aksi[] => {
  const apel = kumpulBenda("b", n, 118, 92, APEL, 5, 34, 28).map((o) => ({ ...o, sorot: true }));
  const lama = prev === null ? awal : [...idKumpul("b", 1, prev), "lb-k", "lb-t"];
  return [
    ...(lama.length ? [hapus(0, ...lama)] : []),
    tambah(0, ...apel),
    ubah("Lambangnya", ...idKumpul("b", 1, n).map((id) => ({ id, sorot: false }))),
    tambah("Lambangnya", ...lambang("lb", 16, 64, String(n), 76, 76, 52).map((o) => ({ ...o, sorot: true }))),
  ];
};
const ketukanBaca = (n: number, prev: number | null, awal: string[] = []) => k(`${huruf1(eja(n))} apel. Lambangnya ${eja(n)}.`, ...aksiBaca(n, prev, awal));

export const ADEGAN_BACA_SATU_LIMA: AdeganStory = {
  id: "baca-1-5",
  judul: "Membaca lambang satu sampai lima",
  sumber: "Materi: baca lambang satu sampai lima",
  latar: LATAR_TERANG,
  ketukan: [
    k(
      "Lambang bilangan adalah tulisan angkanya.",
      tambah(0, kotak("pp", 14, 56, 272, 88, "#FFFFFF", "#1C01A5", { rx: 10 })),
      tambah(4, ...lambang("lx1", 30, 70, "2", 60, 60, 40), ...lambang("lx2", 120, 70, "5", 60, 60, 40), ...lambang("lx3", 210, 70, "8", 60, 60, 40)),
    ),
    ketukanBaca(1, null, ["pp", "lx1-k", "lx1-t", "lx2-k", "lx2-t", "lx3-k", "lx3-t"]),
    ketukanBaca(2, 1),
    ketukanBaca(3, 2),
    ketukanBaca(4, 3),
    ketukanBaca(5, 4),
  ],
};

export const ADEGAN_BACA_ENAM_SEPULUH: AdeganStory = {
  id: "baca-6-10",
  judul: "Membaca lambang enam sampai sepuluh",
  sumber: "Materi: baca lambang enam sampai sepuluh",
  latar: LATAR_TERANG,
  ketukan: [
    ketukanBaca(6, null),
    ketukanBaca(7, 6),
    ketukanBaca(8, 7),
    ketukanBaca(9, 8),
    ketukanBaca(10, 9),
    k("Kita belajar sampai sepuluh.", tambah(0, cincin("rg", 104, 62, 170, 74)), redamkan(0, ...idKumpul("b", 1, 10))),
  ],
};

/* ------------------------------ Nol: angin datang lagi, keranjang terguling dan kosong ------------------------------ */
export const ADEGAN_NOL: AdeganStory = {
  id: "nol",
  judul: "Nol: angin membuat keranjang kosong",
  sumber: "Materi: angin dan keranjang kosong",
  latar: LATAR_KEBUN,
  ketukan: [
    k(
      "Angin datang lagi, kencang sekali.",
      tambah(0, rumput(150), ...anak(LINTANG), ...anak(TALA), ...anak(NIKO), ...keranjangKebun(), ...Array.from({ length: 7 }, (_, i) => benda(`a${i + 1}`, slotKr(i)[0], slotKr(i)[1], APEL, U_APEL))),
      tambah(0, emo("an", 150, 66, "\u{1F4A8}", 30)),
    ),
    k(
      "Keranjang terguling. Apel jatuh di rumput.",
      ubah(1, { id: "kr-tp", y: 148 }, { id: "kr-bd", y: 106 }),
      ubah(3, ...idApel(1, 7).map((id, i) => ({ id, x: posSebar(i)[0], y: posSebar(i)[1] }))),
    ),
    k(
      "Angin juga menjatuhkan apel lain.",
      tambah(1, ...[8, 9, 10].map((n) => benda(`a${n}`, posSebar(n - 1)[0], 20, APEL, U_APEL))),
      ubah(3, ...[8, 9, 10].map((n) => ({ id: `a${n}`, x: posSebar(n - 1)[0], y: posSebar(n - 1)[1] }))),
      hapus(4, "an"),
    ),
    k("Keranjangnya kosong. Tidak ada apel.", sorotkan(2, "kr-bd", "kr-tp")),
    k("Ada berapa apel di keranjang?", redamkan(0, "kr-bd", "kr-tp"), tambah(1, tandaTanya())),
    k("Tidak ada. Banyaknya adalah nol.", hapus(0, "qm"), tambah(4, ...lambang("lb", 110, 28, "0", 56, 52, 40))),
    k("Dibaca nol. Nol artinya tidak ada apa-apa.", sorotkan(0, "lb-k", "lb-t"), tambah(3, panah("pn", 166, 80, 40, 22, W.merah, 3))),
  ],
};

