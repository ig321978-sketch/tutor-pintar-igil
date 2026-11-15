import type { AdeganStory } from "./logika-story";
import { hasil, judul, meja, tanda } from "./k2b5B-gambar";
import { bersihMeja, duaTempat, geser, idx, k, mejaSekaligus, pindah, redamBenda, sorotkan, tambah, ubah, type Langkah } from "./k2b5B-bantu";

/** Langkah bergantian kiri, kanan, kiri, kanan, ... : kata "kiri" ke-j dan "kanan" ke-j dalam suara memicu benda meja ke-(2j-2) dan ke-(2j-1). */
export const gantian = (suara: string, banyak: number): Langkah[] =>
  Array.from({ length: banyak }, (_, n) => {
    const kiri = n % 2 === 0;
    return { at: idx(suara, kiri ? "kiri" : "kanan", Math.floor(n / 2) + 1), n, ke: kiri ? ("pa" as const) : ("pb" as const) };
  });

/* ------------------------------ 4. Halim dan enam ikan ------------------------------ */
const SUARA_C1 = "Halim punya enam ikan di akuarium. Ia ingin menaruh ikan itu ke dua tempat.";
const SUARA_C2 = "Dua tempat itu kita sebut kiri dan kanan. Kita masukkan ikan satu demi satu, bergantian.";
const SUARA_C3 = "Satu ikan ke kiri, satu ikan ke kanan, satu lagi ke kiri, satu lagi ke kanan, satu lagi ke kiri, satu lagi ke kanan.";
const SUARA_C4 = "Meja sudah kosong. Kiri berisi tiga ikan, kanan juga berisi tiga ikan, jadi keduanya sama banyak.";
const SUARA_C5 = "Jadi setengah dari enam ikan adalah tiga ikan.";

export const ADEGAN_IKAN_ENAM: AdeganStory = {
  id: "ikan-enam",
  judul: "Setengah dari enam ikan",
  sumber: "Materi: setengah dari enam ikan",
  latar: "#ECFEFF",
  ketukan: [
    k(SUARA_C1, tambah(0, judul("Ikan Halim"), meja()), mejaSekaligus(idx(SUARA_C1, "enam"), 6, "ikan")),
    k(SUARA_C2, duaTempat(idx(SUARA_C2, "kiri"), "Kiri", "Kanan")),
    k(SUARA_C3, ...pindah("ikan", 6, gantian(SUARA_C3, 6))),
    k(SUARA_C4, bersihMeja(idx(SUARA_C4, "kosong")), redamBenda(idx(SUARA_C4, "Kiri"), "pa", 3, "ikan"), redamBenda(idx(SUARA_C4, "kanan"), "pb", 3, "ikan"), tambah(idx(SUARA_C4, "keduanya"), tanda(true))),
    k(SUARA_C5, tambah(idx(SUARA_C5, "setengah"), ...hasil("hs", "setengah dari 6 = 3"))),
  ],
};

/* ------------------------------ 5. Empat dan dua bukan setengah ------------------------------ */
const SUARA_D1 = "Sekarang Halim punya enam ikan lagi. Kita coba membagi dengan cara lain.";
const SUARA_D2 = "Ia memasukkan empat ikan ke kiri, dan dua ikan ke kanan.";
const SUARA_D3 = "Kiri dan kanan tidak sama banyak. Kiri lebih banyak daripada kanan.";
const SUARA_D4 = "Jadi empat ikan dan dua ikan itu bukan setengah dari enam ikan.";
const SUARA_D5 = "Supaya jadi setengah, kita pindahkan satu dari kiri ke kanan. Sekarang kiri tiga ikan dan kanan tiga ikan.";

export const ADEGAN_BUKAN_SETENGAH: AdeganStory = {
  id: "bukan-setengah",
  judul: "Bagian tidak sama banyak bukan setengah",
  sumber: "Materi: bukan setengah",
  latar: "#FEF2F2",
  ketukan: [
    k(SUARA_D1, tambah(0, judul("Empat dan dua"), meja()), mejaSekaligus(idx(SUARA_D1, "enam"), 6, "ikan")),
    k(
      SUARA_D2,
      duaTempat(0, "Kiri", "Kanan"),
      ...pindah("ikan", 6, [
        { at: idx(SUARA_D2, "kiri"), n: 0, ke: "pa" },
        { at: idx(SUARA_D2, "kiri"), n: 1, ke: "pa" },
        { at: idx(SUARA_D2, "kiri"), n: 2, ke: "pa" },
        { at: idx(SUARA_D2, "kiri"), n: 3, ke: "pa" },
        { at: idx(SUARA_D2, "kanan"), n: 4, ke: "pb" },
        { at: idx(SUARA_D2, "kanan"), n: 5, ke: "pb" },
      ]),
    ),
    k(SUARA_D3, bersihMeja(0), redamBenda(0, "pa", 4, "ikan"), redamBenda(0, "pb", 2, "ikan"), tambah(idx(SUARA_D3, "tidak"), tanda(false))),
    k(SUARA_D4, sorotkan(idx(SUARA_D4, "bukan"), "pa-jml", "pb-jml")),
    k(
      SUARA_D5,
      ...geser(idx(SUARA_D5, "kanan", 1), "ikan", 6, "pa", 3, "pb", 2, 3, 3),
      ubah(idx(SUARA_D5, "Sekarang"), { id: "tanda", isi: "✅" }, { id: "pa-jml", sorot: false }, { id: "pb-jml", sorot: false }),
    ),
  ],
};

/* ------------------------------ 6. Kira dan delapan bintang ------------------------------ */
const SUARA_E1 = "Kira punya delapan bintang. Ia ingin membagi bintangnya menjadi dua bagian sama banyak.";
const SUARA_E2 = "Kita bagi ke dua tempat: kiri, kanan, kiri, kanan, kiri, kanan, kiri, kanan.";
const SUARA_E3 = "Sekarang meja kosong. Kiri berisi empat bintang dan kanan berisi empat bintang.";
const SUARA_E4 = "Keduanya sama banyak, jadi setengah dari delapan bintang adalah empat bintang.";

export const ADEGAN_BINTANG_DELAPAN: AdeganStory = {
  id: "bintang-delapan",
  judul: "Setengah dari delapan bintang",
  sumber: "Materi: setengah dari delapan bintang",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_E1, tambah(0, judul("Bintang Kira"), meja()), mejaSekaligus(idx(SUARA_E1, "delapan"), 8, "bintang")),
    k(SUARA_E2, duaTempat(idx(SUARA_E2, "tempat"), "Kiri", "Kanan"), ...pindah("bintang", 8, gantian(SUARA_E2, 8))),
    k(SUARA_E3, bersihMeja(idx(SUARA_E3, "kosong")), redamBenda(idx(SUARA_E3, "Kiri"), "pa", 4, "bintang"), redamBenda(idx(SUARA_E3, "kanan"), "pb", 4, "bintang")),
    k(SUARA_E4, tambah(idx(SUARA_E4, "Keduanya"), tanda(true)), tambah(idx(SUARA_E4, "setengah"), ...hasil("hs", "setengah dari 8 = 4"))),
  ],
};

/* ------------------------------ 7. Igil dan sepuluh kartu ------------------------------ */
const SUARA_F1 = "Igil punya sepuluh kartu di atas meja.";
const SUARA_F2 = "Igil ingin tahu setengah dari sepuluh kartu. Kita bagi kartu itu ke dua tempat.";
const SUARA_F3 = "Kiri, kanan, kiri, kanan, kiri, kanan, kiri, kanan, kiri, kanan.";
const SUARA_F4 = "Meja sudah kosong. Kiri berisi lima kartu, kanan juga berisi lima kartu, jadi keduanya sama banyak.";
const SUARA_F5 = "Jadi setengah dari sepuluh kartu adalah lima kartu.";

export const ADEGAN_KARTU_SEPULUH: AdeganStory = {
  id: "kartu-sepuluh",
  judul: "Setengah dari sepuluh kartu",
  sumber: "Materi: setengah dari sepuluh kartu",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_F1, tambah(0, judul("Kartu Igil"), meja()), mejaSekaligus(idx(SUARA_F1, "sepuluh"), 10, "kartu")),
    k(SUARA_F2, duaTempat(idx(SUARA_F2, "tempat"), "Kiri", "Kanan")),
    k(SUARA_F3, ...pindah("kartu", 10, gantian(SUARA_F3, 10))),
    k(SUARA_F4, bersihMeja(idx(SUARA_F4, "kosong")), redamBenda(idx(SUARA_F4, "Kiri"), "pa", 5, "kartu"), redamBenda(idx(SUARA_F4, "kanan"), "pb", 5, "kartu"), tambah(idx(SUARA_F4, "keduanya"), tanda(true))),
    k(SUARA_F5, tambah(idx(SUARA_F5, "setengah"), ...hasil("hs", "setengah dari 10 = 5"))),
  ],
};
