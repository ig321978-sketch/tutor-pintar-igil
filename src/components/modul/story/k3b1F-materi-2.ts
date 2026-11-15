import type { AdeganStory } from "./logika-story";
import { W, anak, emo, idAnak, idKelompok, idKotakKel, idTakSama, judul, kartu, kelompokSemua, kelompokTakSama, rumus, teks } from "./k3b1F-gambar";
import { bersih, hapus, idx, k, redamkan, sorotkan, tambah } from "./k3b1F-bantu";

/* ------------------------------ 5. Sama banyak atau tidak ------------------------------ */
const SUARA_T1 = "Perkalian hanya dipakai bila tiap kelompok sama banyak. Lihat tiga piring ini. Coba perhatikan isi tiap piringnya.";
const SUARA_T2 = "Piring pertama berisi dua kue, piring kedua berisi tiga kue, dan piring ketiga berisi dua kue.";
const SUARA_T3 = "Isinya tidak sama banyak, jadi ini bukan perkalian. Kita hanya boleh memakai perkalian bila isinya sama.";
const SUARA_T4 = "Sekarang tiga piring berisi dua kue. Tiap piring sama banyak, jadi boleh dikali.";
const ISI_TAK_SAMA = [2, 3, 2];
const NOMOR_TAK_SAMA = ISI_TAK_SAMA.map((n, g) => teks(`tg-n${g}`, 26 + g * 86 + 38, 100, String(n), 13, W.merah));

export const ADEGAN_SAMA_ATAU_TIDAK: AdeganStory = {
  id: "sama-atau-tidak",
  judul: "Sama banyak atau tidak",
  sumber: "Materi: tiap kelompok sama banyak",
  latar: "#FFF1F2",
  ketukan: [
    k(SUARA_T1, tambah(0, judul("Sama banyak atau tidak?")), tambah(idx(SUARA_T1, "tiga"), ...kelompokTakSama(ISI_TAK_SAMA, "kue"))),
    k(
      SUARA_T2,
      tambah(idx(SUARA_T2, "pertama"), NOMOR_TAK_SAMA[0]),
      tambah(idx(SUARA_T2, "kedua"), NOMOR_TAK_SAMA[1]),
      tambah(idx(SUARA_T2, "ketiga"), NOMOR_TAK_SAMA[2]),
    ),
    k(SUARA_T3, tambah(idx(SUARA_T3, "tidak"), emo("tx", 150, 150, "❌", 32))),
    k(
      SUARA_T4,
      hapus(0, ...idTakSama(ISI_TAK_SAMA), ...NOMOR_TAK_SAMA.map((o) => o.id), "tx"),
      tambah(idx(SUARA_T4, "Sekarang"), ...kelompokSemua(3, 2, "kue", 56)),
      tambah(idx(SUARA_T4, "dikali."), rumus("eq", 140, "3 × 2 = 6"), emo("ok", 240, 140, "✅", 24)),
    ),
  ],
};

/* ------------------------------ 6. Mobil Wei: lima kali enam ------------------------------ */
const SUARA_M1 = "Wei punya mobil mainan. Ia menata mobilnya dalam lima kotak, dan tiap kotak berisi enam mobil.";
const SUARA_M2 = "Kita jumlahkan enam sebanyak lima kali. Enam tambah enam tambah enam tambah enam tambah enam sama dengan tiga puluh.";
const SUARA_M3 = "Penjumlahan berulang itu sama dengan lima kali enam. Lima kali enam sama dengan tiga puluh.";
const SUARA_M4 = "Jadi mobil Wei ada tiga puluh. Lima kotak, tiap kotak enam mobil. Itu hasil penjumlahan berulang yang ditulis dengan singkat.";
const SUARA_M5 = "Ingat, jumlah semuanya adalah banyak kelompok dikali isi tiap kelompok.";

export const ADEGAN_MOBIL_WEI: AdeganStory = {
  id: "mobil-wei",
  judul: "Mobil Wei: lima kali enam",
  sumber: "Materi: lima kali enam",
  latar: "#ECFEFF",
  ketukan: [
    k(SUARA_M1, tambah(0, judul("Mobil Wei")), tambah(idx(SUARA_M1, "Wei"), ...anak("wei", 30, 150)), tambah(idx(SUARA_M1, "kotak"), ...kelompokSemua(5, 6, "mobil"))),
    k(SUARA_M2, sorotkan(idx(SUARA_M2, "jumlahkan"), ...idKotakKel(0, 5)), tambah(idx(SUARA_M2, "sama"), rumus("ps", 150, "6 + 6 + 6 + 6 + 6 = 30", 11, W.ungu))),
    k(SUARA_M3, redamkan(0, ...idKotakKel(0, 5)), tambah(idx(SUARA_M3, "Lima", 2), rumus("eq", 176, "5 × 6 = 30"))),
    k(SUARA_M4, tambah(idx(SUARA_M4, "Jadi"), emo("ok", 250, 176, "✅", 24))),
    k(SUARA_M5, hapus(0, ...idAnak("wei"), "ps", "ok"), tambah(idx(SUARA_M5, "Ingat,"), ...kartu("ik", 30, 140, 240, 24, W.emas, ["banyak kelompok × isi = jumlah"], 10))),
  ],
};

/* ------------------------------ 7. Mobil Wei: enam kali lima ------------------------------ */
const SUARA_N1 = "Sekarang Wei menyusun mobil yang sama menjadi enam kotak. Tiap kotak berisi lima mobil.";
const SUARA_N2 = "Jumlah mobilnya tetap sama. Lima tambah lima tambah lima tambah lima tambah lima tambah lima sama dengan tiga puluh.";
const SUARA_N3 = "Ditulis dengan perkalian, enam kali lima sama dengan tiga puluh.";
const SUARA_N4 = "Susunan kotaknya berbeda, tetapi jumlah mobilnya sama, yaitu tiga puluh. Mobilnya tetap mobil yang tadi.";

export const ADEGAN_MOBIL_BALIK: AdeganStory = {
  id: "mobil-balik",
  judul: "Mobil Wei: enam kali lima",
  sumber: "Materi: enam kali lima",
  latar: "#F5F3FF",
  ketukan: [
    k(SUARA_N1, tambah(0, judul("Enam kotak, lima mobil")), tambah(idx(SUARA_N1, "enam"), ...kelompokSemua(6, 5, "mobil"))),
    k(SUARA_N2, tambah(idx(SUARA_N2, "sama", 2), rumus("ps", 158, "5 + 5 + 5 + 5 + 5 + 5 = 30", 11, W.ungu))),
    k(SUARA_N3, tambah(idx(SUARA_N3, "enam"), rumus("eq", 184, "6 × 5 = 30"))),
    k(SUARA_N4, sorotkan(idx(SUARA_N4, "berbeda,"), ...idKotakKel(0, 6))),
  ],
};

/* ------------------------------ 8. Tukar tempat ------------------------------ */
const SUARA_X1 = "Mari kita bandingkan dua perkalian tadi. Lima kali enam sama dengan tiga puluh.";
const SUARA_X2 = "Sekarang enam kali lima juga sama dengan tiga puluh.";
const SUARA_X3 = "Hasilnya sama. Jadi lima kali enam sama dengan enam kali lima.";
const SUARA_X4 = "Bilangan pada perkalian boleh ditukar tempatnya, hasilnya tetap sama. Kita boleh memilih urutan yang lebih mudah dihitung.";
const SUARA_X5 = "Lima kotak berisi enam mobil berbeda dengan enam kotak berisi lima mobil, tetapi jumlahnya sama.";

export const ADEGAN_TUKAR_TEMPAT: AdeganStory = {
  id: "tukar-tempat",
  judul: "Tukar tempat",
  sumber: "Materi: tukar tempat",
  latar: "#FDF4FF",
  ketukan: [
    k(SUARA_X1, tambah(0, judul("Tukar tempat")), tambah(idx(SUARA_X1, "bandingkan"), ...kelompokSemua(5, 6, "mobil")), tambah(idx(SUARA_X1, "Lima"), rumus("eq", 176, "5 × 6 = 30"))),
    k(SUARA_X2, hapus(idx(SUARA_X2, "Sekarang"), ...idKelompok(5, 6)), tambah(idx(SUARA_X2, "enam"), ...kelompokSemua(6, 5, "mobil"), rumus("eq", 184, "6 × 5 = 30"))),
    k(SUARA_X3, tambah(idx(SUARA_X3, "Jadi"), rumus("tk", 158, "5 × 6 = 6 × 5", 12, W.ungu))),
    k(SUARA_X4, sorotkan(idx(SUARA_X4, "ditukar"), ...idKotakKel(0, 6)), tambah(idx(SUARA_X4, "ditukar"), emo("sw", 262, 180, "\u{1F504}", 24))),
    k(
      SUARA_X5,
      bersih(0),
      tambah(0, judul("Dibaca berbeda, hasil sama")),
      tambah(idx(SUARA_X5, "Lima"), ...kartu("kl", 14, 56, 132, 70, W.langit, ["5 × 6 = 30", "lima kotak", "isi enam"], 11)),
      tambah(idx(SUARA_X5, "enam", 2), ...kartu("kr", 154, 56, 132, 70, W.pink, ["6 × 5 = 30", "enam kotak", "isi lima"], 11)),
      tambah(idx(SUARA_X5, "jumlahnya"), emo("sm", 150, 160, "✅", 28)),
    ),
  ],
};
