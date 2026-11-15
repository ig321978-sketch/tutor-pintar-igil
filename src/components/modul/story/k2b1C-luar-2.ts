import type { AdeganStory, Obj } from "./logika-story";
import { EMO_BUAYA, W, angkaBlok, blok, emo, garis, idBlok, judul, kartu, namaBlok, teks, xKubus, BAR_DX } from "./k2b1C-gambar";
import { hapus, idx, k, pilihKata, redamkan, sorotkan, tambah, ubah } from "./k2b1C-bantu";
import { NAMA_METODE_ID, WARNA_METODE, kepala } from "./k2b1C-luar-1";

const ex = (isi: string, id = "ex", x = 150, y = 194, u = 16): Obj => teks(id, x, y, isi, u, W.merah);

/** Letak dua blok yang dipasangkan: blok atas (a) dan blok bawah (b), kiri sama. */
export const X_PASANG = 44;
export const Y_ATAS = 96;
export const Y_BAWAH = 172;
const garisBatang = (i: number): Obj => garis(`pr${i}`, X_PASANG + BAR_DX * i + 5, Y_ATAS + 2, 0, Y_BAWAH - 40 - 2 - (Y_ATAS + 2), W.hijau, 2.2);
const garisKubus = (p: number, i: number): Obj => garis(`qr${i}`, xKubus(X_PASANG, p, i) + 4.5, Y_ATAS - 40 + 9 + 2, 0, Y_BAWAH - 40 - 2 - (Y_ATAS - 40 + 9 + 2), W.hijau, 2.2);
const bagian = (key: string, p: number, s: number, dari: "-s" | "-p"): string[] => idBlok(key, p, s).filter((q) => q.includes(dari));

/* ------------------------------ 4. Pasangkan balok: konsep (dua puluh empat dan dua puluh sembilan) ------------------------------ */
const SUARA_B1 = "Cara kedua, Pasangkan Balok. Kita bandingkan dua puluh empat dan dua puluh sembilan.";
const SUARA_B2 = "Pertama, pasangkan batang puluhan satu demi satu.";
const SUARA_B3 = "Batang puluhan sudah berpasangan semua. Puluhannya sama, jadi kita lanjut ke satuan.";
const SUARA_B4 = "Sekarang pasangkan kubus satuan satu demi satu.";
const SUARA_B5 = "Ada lima kubus yang tidak punya pasangan. Kubus itu milik Halim.";
const SUARA_B6 = "Yang punya sisa itu lebih besar. Jadi dua puluh sembilan lebih besar daripada dua puluh empat.";

export const ADEGAN_LUAR_BALOK: AdeganStory = {
  id: "luar-balok",
  judul: "Pasangkan Balok: yang punya sisa lebih besar",
  sumber: "Metode luar: Pasangkan Balok",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, ...kepala(1)),
      tambah(idx(SUARA_B1, "dua"), namaBlok("a", X_PASANG, Y_ATAS, "Kira"), ...blok("a", 2, 4, X_PASANG, Y_ATAS)),
      tambah(idx(SUARA_B1, "empat"), angkaBlok("a", X_PASANG, Y_ATAS, "24")),
      tambah(idx(SUARA_B1, "dua", 2), namaBlok("b", X_PASANG, Y_BAWAH, "Halim"), ...blok("b", 2, 9, X_PASANG, Y_BAWAH)),
      tambah(idx(SUARA_B1, "sembilan"), angkaBlok("b", X_PASANG, Y_BAWAH, "29")),
    ),
    k(SUARA_B2, tambah(idx(SUARA_B2, "batang"), garisBatang(0)), tambah(idx(SUARA_B2, "puluhan"), garisBatang(1))),
    k(SUARA_B3, sorotkan(idx(SUARA_B3, "berpasangan"), "pr0", "pr1", ...bagian("a", 2, 4, "-p"), ...bagian("b", 2, 9, "-p"))),
    k(
      SUARA_B4,
      redamkan(0, "pr0", "pr1", ...bagian("a", 2, 4, "-p"), ...bagian("b", 2, 9, "-p")),
      tambah(idx(SUARA_B4, "kubus"), garisKubus(2, 0)),
      tambah(idx(SUARA_B4, "satuan"), garisKubus(2, 1)),
      tambah(idx(SUARA_B4, "satu"), garisKubus(2, 2)),
      tambah(idx(SUARA_B4, "demi"), garisKubus(2, 3)),
    ),
    k(SUARA_B5, sorotkan(idx(SUARA_B5, "kubus", 2), ...[4, 5, 6, 7, 8].map((i) => `bb-s${i}`))),
    k(SUARA_B6, redamkan(0, ...[4, 5, 6, 7, 8].map((i) => `bb-s${i}`)), tambah(idx(SUARA_B6, "Jadi"), ex("29 > 24"))),
  ],
};

/* ------------------------------ 5. Pasangkan balok: penerapan (empat puluh satu dan tiga puluh delapan) ------------------------------ */
const SUARA_C1 = "Ayo coba lagi. Wei punya empat puluh satu permen. Halim punya tiga puluh delapan permen.";
const SUARA_C2 = "Sekarang pasangkan batang puluhannya satu demi satu.";
const SUARA_C3 = "Batang puluhan Wei masih punya sisa satu.";
const SUARA_C4 = "Jadi kita tidak perlu memasangkan kubus satuan. Empat puluh satu lebih besar daripada tiga puluh delapan.";

export const ADEGAN_LUAR_BALOK_TERAPAN: AdeganStory = {
  id: "luar-balok-terapan",
  judul: "Pasangkan Balok: coba sendiri",
  sumber: "Metode luar: Pasangkan Balok, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, ...kepala(1)),
      tambah(idx(SUARA_C1, "Wei"), namaBlok("a", X_PASANG, Y_ATAS, "Wei")),
      tambah(idx(SUARA_C1, "punya"), ...blok("a", 4, 1, X_PASANG, Y_ATAS)),
      tambah(idx(SUARA_C1, "satu"), angkaBlok("a", X_PASANG, Y_ATAS, "41")),
      tambah(idx(SUARA_C1, "Halim"), namaBlok("b", X_PASANG, Y_BAWAH, "Halim")),
      tambah(idx(SUARA_C1, "punya", 2), ...blok("b", 3, 8, X_PASANG, Y_BAWAH)),
      tambah(idx(SUARA_C1, "delapan"), angkaBlok("b", X_PASANG, Y_BAWAH, "38")),
    ),
    k(SUARA_C2, tambah(idx(SUARA_C2, "pasangkan"), garisBatang(0)), tambah(idx(SUARA_C2, "batang"), garisBatang(1)), tambah(idx(SUARA_C2, "puluhannya"), garisBatang(2))),
    k(SUARA_C3, redamkan(0, "pr0"), sorotkan(idx(SUARA_C3, "sisa"), "ba-p3")),
    k(SUARA_C4, redamkan(0, "ba-p3"), tambah(idx(SUARA_C4, "Empat"), ex("41 > 38"))),
  ],
};

/* ------------------------------ 6. Mulut buaya: konsep ------------------------------ */
const SUARA_Z1 = "Cara ketiga, Mulut Buaya. Ini cara mengingat tanda lebih besar dan lebih kecil.";
const SUARA_Z2 = "Mulut buaya selalu terbuka ke bilangan yang lebih besar. Buaya itu lapar, jadi dia memilih yang lebih banyak.";
const SUARA_Z3 = "Tiga puluh dua lebih besar daripada dua puluh enam. Mulut buaya menghadap ke tiga puluh dua.";
const SUARA_Z4 = "Sekarang dua puluh enam lebih kecil daripada tiga puluh dua. Mulut buaya tetap menghadap ke tiga puluh dua.";
const SUARA_Z5 = "Kalau kedua bilangan sama, buaya tidak tahu mau makan yang mana. Mulutnya tertutup: dua puluh enam sama dengan dua puluh enam.";

export const ADEGAN_LUAR_BUAYA: AdeganStory = {
  id: "luar-buaya",
  judul: "Mulut Buaya: terbuka ke yang lebih besar",
  sumber: "Metode luar: Mulut Buaya",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_Z1, tambah(0, ...kepala(2)), tambah(idx(SUARA_Z1, "Mulut"), emo("bu", 150, 130, EMO_BUAYA, 60))),
    k(SUARA_Z2, ubah(idx(SUARA_Z2, "terbuka"), { id: "bu", x: 105, y: 172, u: 44 }), tambah(idx(SUARA_Z2, "terbuka"), teks("sg", 150, 118, ">", 60, W.merah)), tambah(idx(SUARA_Z2, "Buaya"), emo("lp", 262, 90, "\u{1F37D}", 30))),
    k(SUARA_Z3, hapus(0, "sg", "lp"), tambah(0, ex("32 > 26", "ex", 150, 108, 32)), sorotkan(idx(SUARA_Z3, "menghadap"), "bu")),
    k(SUARA_Z4, ubah(idx(SUARA_Z4, "lebih"), { id: "ex", isi: "26 < 32" }, { id: "bu", x: 195 })),
    k(SUARA_Z5, redamkan(0, "bu"), ubah(idx(SUARA_Z5, "Mulutnya"), { id: "ex", isi: "26 = 26" }, { id: "bu", x: 150 })),
  ],
};

/* ------------------------------ 7. Mulut buaya: penerapan ------------------------------ */
const SUARA_Y1 = "Ayo beri makan buaya. Pilih tanda yang tepat untuk sembilan belas dan dua puluh satu.";
const SUARA_Y2 = "Dua puluh satu lebih besar daripada sembilan belas. Jadi mulut buaya terbuka ke dua puluh satu.";
const SUARA_Y3 = "Alasannya, dua puluh satu punya dua puluhan. Sembilan belas hanya punya satu puluhan.";
const SUARA_Y4 = "Satu lagi. Empat puluh satu dan empat puluh satu. Tanda apa yang kita pilih?";
const SUARA_Y5 = "Kedua bilangan sama. Jadi kita memakai tanda sama dengan.";

export const ADEGAN_LUAR_BUAYA_TERAPAN: AdeganStory = {
  id: "luar-buaya-terapan",
  judul: "Mulut Buaya: beri makan buaya",
  sumber: "Metode luar: Mulut Buaya, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_Y1, tambah(0, ...kepala(2)), tambah(idx(SUARA_Y1, "makan"), ex("19 ? 21", "ex", 150, 96, 30)), tambah(idx(SUARA_Y1, "Pilih"), ...pilihKata(136, [">", "<", "="], 22))),
    k(SUARA_Y2, sorotkan(idx(SUARA_Y2, "lebih"), "c2-k", "c2-t"), ubah(idx(SUARA_Y2, "lebih"), { id: "ex", isi: "19 < 21" }), tambah(idx(SUARA_Y2, "terbuka"), emo("bu", 192, 126, EMO_BUAYA, 26))),
    k(SUARA_Y3, sorotkan(idx(SUARA_Y3, "dua", 2), "bu")),
    k(SUARA_Y4, hapus(0, "bu"), redamkan(0, "c2-k", "c2-t"), ubah(idx(SUARA_Y4, "Empat"), { id: "ex", isi: "41 ? 41" })),
    k(SUARA_Y5, sorotkan(idx(SUARA_Y5, "sama"), "c3-k", "c3-t"), ubah(idx(SUARA_Y5, "Jadi"), { id: "ex", isi: "41 = 41" })),
  ],
};

/* ------------------------------ 8. Ringkasan ------------------------------ */
const SUARA_R1 = "Kita sudah melihat tiga cara untuk membandingkan bilangan.";
const SUARA_R2 = "Garis Bilangan: yang ada di kanan lebih besar.";
const SUARA_R3 = "Pasangkan Balok: yang punya sisa lebih besar.";
const SUARA_R4 = "Mulut Buaya: mulut terbuka ke bilangan yang lebih besar.";
const SUARA_R5 = "Cara mana pun yang kamu pilih, ingat tetap puluhan dulu, baru satuan. Sampai jumpa!";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode luar",
  sumber: "Ringkasan: tiga metode luar",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Tiga cara")),
      tambah(idx(SUARA_R1, "tiga"), ...kartu("rk0", 20, 40, 260, 38, WARNA_METODE[0], [NAMA_METODE_ID[0]], 11), ...kartu("rk1", 20, 88, 260, 38, WARNA_METODE[1], [NAMA_METODE_ID[1]], 11), ...kartu("rk2", 20, 136, 260, 38, WARNA_METODE[2], [NAMA_METODE_ID[2]], 11)),
    ),
    k(SUARA_R2, sorotkan(idx(SUARA_R2, "kanan"), "rk0-k", "rk0-t0")),
    k(SUARA_R3, redamkan(0, "rk0-k", "rk0-t0"), sorotkan(idx(SUARA_R3, "sisa"), "rk1-k", "rk1-t0")),
    k(SUARA_R4, redamkan(0, "rk1-k", "rk1-t0"), sorotkan(idx(SUARA_R4, "terbuka"), "rk2-k", "rk2-t0")),
    k(SUARA_R5, redamkan(0, "rk2-k", "rk2-t0"), tambah(idx(SUARA_R5, "puluhan"), ...kartu("pn", 40, 176, 220, 22, W.krem, ["puluhan dulu, baru satuan"], 9.6))),
  ],
};
