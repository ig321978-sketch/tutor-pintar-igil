import type { AdeganStory } from "./logika-story";
import { W, blok, emo, judul, kartu, nilaiTokoh, susun, teks, tokoh } from "./k3b1D-gambar";
import { E, bersih, e, hapus, idx, k, redamkan, sorotkan, tambah, ubah } from "./k3b1D-bantu";

const cap = (isi: string) => teks("cp", 150, 198, isi, 10.5, W.merah);

/* ------------------------------ 9. Menyimpan: puluhan ------------------------------ */
const S8 = susun(48, 16);
const SUARA_E1 = "Sekarang puluhan. Ada satu simpanan, empat puluhan, dan satu puluhan.";
const SUARA_E2 = `${E(1)} ditambah ${e(4)} ditambah ${e(1)} sama dengan ${e(6)}.`;
const SUARA_E3 = `Jadi, ${e(48)} ditambah ${e(16)} sama dengan ${e(64)}.`;
const SUARA_E4 = `Periksa dengan perkiraan. ${E(48)} hampir ${e(50)}, dan ${e(16)} hampir ${e(20)}, jadi hasilnya sekitar ${e(70)}.`;
const SUARA_E5 = `${E(64)} dekat dengan ${e(70)}, jadi jawabannya masuk akal.`;

export const ADEGAN_SIMPAN_PULUHAN: AdeganStory = {
  id: "simpan-puluhan",
  judul: "Menyimpan: jumlahkan puluhan",
  sumber: "Materi: jumlahkan puluhan",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_E1,
      tambah(0, judul("Menyimpan: puluhan"), ...S8.kepala(), ...S8.atas(), ...S8.bawah(), S8.hSatuan(), S8.sim()),
      tambah(idx(SUARA_E1, "puluhan"), S8.sorT()),
    ),
    k(SUARA_E2, tambah(idx(SUARA_E2, "Satu"), S8.eqP()), tambah(idx(SUARA_E2, "enam"), S8.hPuluhan())),
    k(SUARA_E3, hapus(0, "ls-sor"), tambah(idx(SUARA_E3, "Jadi"), cap("48 + 16 = 64"))),
    k(SUARA_E4, tambah(idx(SUARA_E4, "hampir", 1), teks("pk", 150, 176, "50 + 20 = 70", 12, W.ungu))),
    k(SUARA_E5, tambah(idx(SUARA_E5, "masuk"), emo("ok", 232, 100, "✅", 28))),
  ],
};

/* ------------------------------ 10. Bunga Kira dan Wei ------------------------------ */
const S9 = susun(37, 25);
const SUARA_F1 = `Kira punya ${e(37)} bunga. Wei punya ${e(25)} bunga. Berapa jumlah bunga mereka?`;
const SUARA_F2 = `Satuan dahulu. ${E(7)} ditambah ${e(5)} sama dengan ${e(12)}. Tulis ${e(2)}, simpan ${e(1)}.`;
const SUARA_F3 = `Sekarang puluhan. ${E(1)} ditambah ${e(3)} ditambah ${e(2)} sama dengan ${e(6)}.`;
const SUARA_F4 = `Jadi, ${e(37)} ditambah ${e(25)} sama dengan ${e(62)}.`;
const SUARA_F5 = "Ingat, kalau satuan berjumlah sepuluh atau lebih, kita menyimpan satu puluhan.";

export const ADEGAN_SIMPAN_CONTOH: AdeganStory = {
  id: "simpan-contoh",
  judul: "Bunga Kira dan Wei",
  sumber: "Materi: bunga Kira dan Wei",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_F1,
      tambah(0, judul("Bunga Kira dan Wei")),
      tambah(idx(SUARA_F1, "Kira"), ...tokoh("kira", 0)),
      tambah(idx(SUARA_F1, "tiga"), nilaiTokoh("kira", 0, 37)),
      tambah(idx(SUARA_F1, "Wei"), ...tokoh("wei", 1)),
      tambah(idx(SUARA_F1, "dua"), nilaiTokoh("wei", 1, 25)),
      tambah(idx(SUARA_F1, "Berapa"), teks("soal", 150, 82, "37 + 25 = ?", 18, W.ungu)),
    ),
    k(
      SUARA_F2,
      bersih(0),
      tambah(0, judul("Satuan lebih dulu"), ...S9.kepala(), ...S9.atas(), ...S9.bawah()),
      tambah(idx(SUARA_F2, "Satuan"), S9.sorS()),
      tambah(idx(SUARA_F2, "Tujuh"), S9.eqS()),
      tambah(idx(SUARA_F2, "Tulis"), S9.hSatuan()),
      tambah(idx(SUARA_F2, "simpan"), S9.sim()),
    ),
    k(SUARA_F3, hapus(0, "ls-sor"), tambah(idx(SUARA_F3, "puluhan"), S9.sorT()), tambah(idx(SUARA_F3, "Satu"), S9.eqP()), tambah(idx(SUARA_F3, "enam"), S9.hPuluhan())),
    k(SUARA_F4, hapus(0, "ls-sor"), tambah(idx(SUARA_F4, "Jadi"), cap("37 + 25 = 62"))),
    k(SUARA_F5, tambah(idx(SUARA_F5, "Ingat"), ...kartu("in", 168, 38, 124, 40, W.emas, ["satuan 10 atau lebih:", "simpan 1 puluhan"], 9))),
  ],
};

/* ------------------------------ 11. Susun panjang: menguraikan ------------------------------ */
const U1 = blok("a", 14, 34, 54);
const U2 = blok("b", 14, 112, 29);
const SUARA_G1 = "Cara kedua adalah susun panjang. Kita uraikan bilangan menjadi puluhan dan satuan.";
const SUARA_G2 = `Bilangan ${e(54)} diurai menjadi ${e(50)} ditambah ${e(4)}.`;
const SUARA_G3 = `Bilangan ${e(29)} diurai menjadi ${e(20)} ditambah ${e(9)}.`;
const SUARA_G4 = "Puluhan dikumpulkan dengan puluhan, dan satuan dikumpulkan dengan satuan.";
const SUARA_G5 = "Sekarang kita siap menjumlahkan puluhan dengan puluhan, lalu satuan dengan satuan.";
const idBlokP = (g: string, n: number) => Array.from({ length: n }, (_, i) => `bk-${g}-p${i + 1}`);
const idBlokS = (g: string, n: number) => Array.from({ length: n }, (_, i) => `bk-${g}-s${i + 1}`);

export const ADEGAN_PANJANG_URAI: AdeganStory = {
  id: "panjang-urai",
  judul: "Susun panjang: menguraikan bilangan",
  sumber: "Materi: susun panjang",
  latar: "#ECFEFF",
  ketukan: [
    k(SUARA_G1, tambah(0, judul("Susun panjang"), emo("pz", 150, 90, "\u{1F9E9}", 44)), tambah(idx(SUARA_G1, "uraikan"), ...kartu("up", 50, 130, 200, 34, W.emas, ["uraikan: puluhan dan satuan"], 11))),
    k(
      SUARA_G2,
      bersih(0),
      tambah(0, judul("Menguraikan bilangan")),
      tambah(idx(SUARA_G2, "Bilangan"), ...U1.batang(), ...U1.satuan(), U1.label()),
      tambah(idx(SUARA_G2, "diurai"), teks("up-a", 216, 64, "50 + 4 = 54", 14, W.hijau)),
    ),
    k(SUARA_G3, tambah(idx(SUARA_G3, "Bilangan"), ...U2.batang(), ...U2.satuan(), U2.label()), tambah(idx(SUARA_G3, "diurai"), teks("up-b", 216, 160, "20 + 9 = 29", 14, W.hijau))),
    k(SUARA_G4, tambah(idx(SUARA_G4, "Puluhan"), ...kartu("kp1", 170, 92, 124, 22, W.langit, ["puluhan dengan puluhan"], 9)), tambah(idx(SUARA_G4, "satuan"), ...kartu("kp2", 170, 118, 124, 22, W.pink, ["satuan dengan satuan"], 9))),
    k(
      SUARA_G5,
      sorotkan(idx(SUARA_G5, "puluhan"), ...idBlokP("a", 5), ...idBlokP("b", 2)),
      redamkan(idx(SUARA_G5, "lalu"), ...idBlokP("a", 5), ...idBlokP("b", 2)),
      sorotkan(idx(SUARA_G5, "satuan"), ...idBlokS("a", 4), ...idBlokS("b", 9)),
      ubah(idx(SUARA_G5, "siap"), { id: "kp1-k", warna: W.krem }),
    ),
  ],
};
