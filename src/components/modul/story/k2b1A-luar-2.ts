import type { AdeganStory } from "./logika-story";
import { OWL, W, emo, garisDasar, jalur, judul, kartu, loncat, pusatPetak, tandaG } from "./k2b1A-gambar";
import { bersih, hitungAksi, idx, k, pilihKata, redamkan, sorotkan, tambah, urutNilai } from "./k2b1A-bantu";
import { kepala } from "./k2b1A-luar-1";

/* ------------------------------ 6. Garis Bilangan: konsep ------------------------------ */
const SUARA_E1 = "Metode ketiga bernama Garis Bilangan. Bilangan berbaris dari kecil ke besar pada sebuah garis.";
const SUARA_E2 = "Pada garis ini ada dua puluh, tiga puluh, empat puluh, dan lima puluh. Jaraknya sama, selalu sepuluh.";
const SUARA_E3 = "Kita meloncat dari dua puluh ke tiga puluh. Satu loncatan, naik sepuluh.";
const SUARA_E4 = "Loncat lagi dari tiga puluh ke empat puluh. Naik sepuluh lagi.";
const SUARA_E5 = "Loncat sekali lagi dari empat puluh ke lima puluh. Jadi tiap loncatan naik sepuluh.";

export const ADEGAN_LUAR_GARIS: AdeganStory = {
  id: "luar-garis",
  judul: "Garis Bilangan: meloncat sepuluh",
  sumber: "Metode luar: Garis Bilangan",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_E1, tambah("ketiga", ...kepala(2)), tambah(idx(SUARA_E1, "sebuah"), garisDasar())),
    k(
      SUARA_E2,
      ...urutNilai(SUARA_E2, [20, 30, 40, 50]).map((p, q) => tambah(p, tandaG(q, String(20 + q * 10)))),
      tambah(idx(SUARA_E2, "selalu"), ...kartu("jr", 100, 150, 100, 26, W.krem, ["jarak: 10"], 11)),
    ),
    k(SUARA_E3, tambah(idx(SUARA_E3, "ke"), ...loncat(0, "+10")), sorotkan(idx(SUARA_E3, "loncatan,"), "jp0")),
    k(SUARA_E4, redamkan(0, "jp0"), tambah(idx(SUARA_E4, "ke"), ...loncat(1, "+10")), sorotkan(idx(SUARA_E4, "Naik"), "jp1")),
    k(SUARA_E5, redamkan(0, "jp1"), tambah(idx(SUARA_E5, "ke"), ...loncat(2, "+10")), sorotkan(idx(SUARA_E5, "Jadi"), "jp0", "jp1", "jp2")),
  ],
};

/* ------------------------------ 7. Garis Bilangan: terapan ------------------------------ */
const YJ = 80;
const SUARA_F1 = "Terapkan pada bilangan tiga puluh tujuh. Ini jalur bilangan dari tiga puluh sampai empat puluh.";
const SUARA_F2 = "Kita mulai dari tiga puluh. Maju satu, dua, tiga, empat, lima, enam, tujuh.";
const SUARA_F3 = "Kita sampai di tiga puluh tujuh. Jadi tiga puluh tujuh itu tiga puluh, lalu maju tujuh.";
const SUARA_F4 = "Pilih jawabannya. Maju satu langkah lagi dari tiga puluh tujuh. Sampai di bilangan berapa?";
const SUARA_F5 = "Betul! Satu langkah dari tiga puluh tujuh adalah tiga puluh delapan. Hebat!";
const JALUR_30_40 = Array.from({ length: 11 }, (_, i) => 30 + i);

export const ADEGAN_LUAR_GARIS_TERAPAN: AdeganStory = {
  id: "luar-garis-terapan",
  judul: "Garis Bilangan: mencari tiga puluh tujuh",
  sumber: "Metode luar: Garis Bilangan, terapan",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_F1, tambah("Terapkan", ...kepala(2)), tambah(idx(SUARA_F1, "jalur"), ...jalur(JALUR_30_40, YJ))),
    k(
      SUARA_F2,
      sorotkan(idx(SUARA_F2, "tiga"), "nl0-k"),
      ...hitungAksi(SUARA_F2, "nl", Array.from({ length: 8 }, (_, i) => pusatPetak(11, i, YJ)), { dari: 1, awal: 1, setelah: "Maju", naik: 18, u: 10 }),
    ),
    k(SUARA_F3, redamkan(0, "nl0-k"), sorotkan(idx(SUARA_F3, "tiga"), "nl7-k"), tambah(idx(SUARA_F3, "lalu"), emo("ow", 150, 150, OWL, 30))),
    k(SUARA_F4, redamkan(0, "nl7-k"), tambah(idx(SUARA_F4, "jawabannya."), ...pilihKata(140, ["36", "38", "39"])), sorotkan(idx(SUARA_F4, "Sampai"), "c2-k")),
    k(SUARA_F5, sorotkan(idx(SUARA_F5, "tiga", 2), "nl8-k"), tambah(idx(SUARA_F5, "Hebat!"), emo("ok", 262, 190, "✅", 20))),
  ],
};

/* ------------------------------ 8. Ringkasan ------------------------------ */
const SUARA_R1 = "Mari kita ingat tiga metode dari luar. Metode pertama, Bingkai Sepuluh. Bingkai penuh berarti sepuluh.";
const SUARA_R2 = "Metode kedua, Hitung Sepuluh-Sepuluh. Kita meloncat sepuluh demi sepuluh, lalu lanjut satu per satu.";
const SUARA_R3 = "Metode ketiga, Garis Bilangan. Bilangan berbaris pada garis, dan kita bisa meloncat sepuluh.";
const SUARA_R4 = "Tiga metode ini membantu kita menghitung bilangan yang banyak dengan cepat dan tepat. Sampai jumpa!";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Metode luar: ringkasan",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_R1, tambah(0, judul("Ingat tiga metode")), tambah("pertama,", ...kartu("r1", 14, 34, 272, 44, W.hijauMuda, ["Bingkai Sepuluh", "bingkai penuh: 10"], 10))),
    k(SUARA_R2, tambah("kedua,", ...kartu("r2", 14, 86, 272, 44, W.langit, ["Hitung Sepuluh-Sepuluh", "loncat 10, lalu satu-satu"], 10))),
    k(SUARA_R3, tambah("ketiga,", ...kartu("r3", 14, 138, 272, 44, W.pink, ["Garis Bilangan", "meloncat 10 pada garis"], 10))),
    k(SUARA_R4, bersih(0), tambah(0, judul("Sampai jumpa lagi!"), emo("sj", 150, 100, "\u{1F44B}", 56)), tambah("Sampai", emo("pa", 60, 160, OWL, 30), emo("pb", 240, 160, OWL, 30))),
  ],
};
