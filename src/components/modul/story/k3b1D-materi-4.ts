import type { AdeganStory } from "./logika-story";
import { W, judul, kartu, nilaiTokoh, susun, teks, tokoh } from "./k3b1D-gambar";
import { E, bersih, e, hapus, idx, k, tambah, ubah } from "./k3b1D-bantu";

const cap = (isi: string) => teks("cp", 150, 198, isi, 10.5, W.merah);

/* ------------------------------ 12. Susun panjang: menjumlahkan ------------------------------ */
const SUARA_H1 = `Jumlahkan puluhannya dahulu. ${E(50)} ditambah ${e(20)} sama dengan ${e(70)}.`;
const SUARA_H2 = `Lalu satuannya. ${E(4)} ditambah ${e(9)} sama dengan ${e(13)}.`;
const SUARA_H3 = `${E(13)} diurai menjadi ${e(10)} ditambah ${e(3)}.`;
const SUARA_H4 = `Terakhir, ${e(70)} ditambah ${e(13)} sama dengan ${e(83)}.`;
const SUARA_H5 = `Jadi, ${e(54)} ditambah ${e(29)} sama dengan ${e(83)}.`;

export const ADEGAN_PANJANG_JUMLAH: AdeganStory = {
  id: "panjang-jumlah",
  judul: "Susun panjang: menjumlahkan",
  sumber: "Materi: susun panjang",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_H1, tambah(0, judul("Menjumlahkan hasil uraian"), teks("soal", 150, 44, "54 + 29 = ?", 14, W.ungu)), tambah(idx(SUARA_H1, "Jumlahkan"), teks("pj-1", 150, 84, "50 + 20 = 70", 18, W.biru))),
    k(SUARA_H2, tambah(idx(SUARA_H2, "satuannya."), teks("pj-2", 150, 116, "4 + 9 = 13", 18, W.biru))),
    k(SUARA_H3, tambah(idx(SUARA_H3, "diurai"), teks("pj-3", 150, 148, "10 + 3 = 13", 18, W.biru))),
    k(SUARA_H4, tambah(idx(SUARA_H4, "Terakhir"), teks("pj-4", 150, 180, "70 + 13 = 83", 18, W.merah))),
    k(SUARA_H5, ubah(idx(SUARA_H5, "Jadi"), { id: "soal", isi: "54 + 29 = 83" }, { id: "pj-4", warna: W.hijau })),
  ],
};

/* ------------------------------ 13. Susun pendek untuk soal yang sama ------------------------------ */
const S12 = susun(54, 29);
const SUARA_I1 = `Sekarang kita periksa dengan susun pendek. Susun ${e(54)} dan ${e(29)} ke bawah.`;
const SUARA_I2 = `Satuan: ${e(4)} ditambah ${e(9)} sama dengan ${e(13)}. Tulis ${e(3)}, simpan ${e(1)}.`;
const SUARA_I3 = `Puluhan: ${e(1)} ditambah ${e(5)} ditambah ${e(2)} sama dengan ${e(8)}.`;
const SUARA_I4 = `Hasilnya ${e(83)}, sama dengan hasil susun panjang. Dua cara, satu jawaban.`;

export const ADEGAN_PANJANG_SAMA: AdeganStory = {
  id: "panjang-sama",
  judul: "Dua cara, hasilnya sama",
  sumber: "Materi: susun pendek dan susun panjang",
  latar: "#FEFCE8",
  ketukan: [
    k(SUARA_I1, tambah(0, judul("Periksa dengan susun pendek"), ...S12.kepala()), tambah(idx(SUARA_I1, "Susun", 2), ...S12.atas()), tambah(idx(SUARA_I1, "dan"), ...S12.bawah())),
    k(SUARA_I2, tambah(idx(SUARA_I2, "Satuan:"), S12.sorS()), tambah(idx(SUARA_I2, "Empat"), S12.eqS()), tambah(idx(SUARA_I2, "Tulis"), S12.hSatuan()), tambah(idx(SUARA_I2, "simpan"), S12.sim())),
    k(SUARA_I3, hapus(0, "ls-sor"), tambah(idx(SUARA_I3, "Puluhan:"), S12.sorT()), tambah(idx(SUARA_I3, "Satu"), S12.eqP()), tambah(idx(SUARA_I3, "delapan."), S12.hPuluhan())),
    k(SUARA_I4, hapus(0, "ls-sor"), tambah(idx(SUARA_I4, "Hasilnya"), cap("54 + 29 = 83")), tambah(idx(SUARA_I4, "susun"), ...kartu("sm", 168, 38, 124, 40, W.emas, ["susun panjang:", "hasilnya 83"], 9))),
  ],
};

/* ------------------------------ 14. Tiga bilangan ------------------------------ */
const SUARA_J1 = `Bagaimana menjumlahkan tiga bilangan? Misalnya ${e(23)}, ${e(30)}, dan ${e(12)}.`;
const SUARA_J2 = `Jumlahkan dua bilangan dahulu. ${E(23)} ditambah ${e(30)} sama dengan ${e(53)}.`;
const SUARA_J3 = `Lalu tambahkan bilangan ketiga. ${E(53)} ditambah ${e(12)} sama dengan ${e(65)}.`;
const SUARA_J4 = `Jadi, jumlah ketiga bilangan itu adalah ${e(65)}. Kita menjumlahkan dua bilangan, lalu satu bilangan lagi.`;

export const ADEGAN_TIGA_BILANGAN: AdeganStory = {
  id: "tiga-bilangan",
  judul: "Menjumlahkan tiga bilangan",
  sumber: "Materi: tiga bilangan",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_J1, tambah(0, judul("Tiga bilangan")), tambah(idx(SUARA_J1, "Misalnya"), teks("soal", 150, 60, "23 + 30 + 12 = ?", 20, W.ungu))),
    k(SUARA_J2, tambah(idx(SUARA_J2, "dua"), teks("tg-1", 150, 100, "23 + 30 = 53", 18, W.biru))),
    k(SUARA_J3, tambah(idx(SUARA_J3, "tambahkan"), teks("tg-2", 150, 134, "53 + 12 = 65", 18, W.biru))),
    k(SUARA_J4, ubah(idx(SUARA_J4, "Jadi"), { id: "soal", isi: "23 + 30 + 12 = 65" }), tambah(idx(SUARA_J4, "Kita"), ...kartu("tgk", 50, 154, 200, 30, W.emas, ["dua dahulu, lalu satu lagi"], 11))),
  ],
};

/* ------------------------------ 15. Soal cerita ------------------------------ */
const S14 = susun(36, 27);
const SUARA_K1 = `Kira memetik ${e(36)} jeruk. Wei memetik ${e(27)} jeruk. Berapa jumlah jeruk yang mereka petik?`;
const SUARA_K2 = `Soal cerita meminta jumlah seluruhnya, jadi kita memakai penjumlahan. ${E(36)} ditambah ${e(27)}.`;
const SUARA_K3 = `Satuan: ${e(6)} ditambah ${e(7)} sama dengan ${e(13)}. Tulis ${e(3)}, simpan ${e(1)}.`;
const SUARA_K4 = `Puluhan: ${e(1)} ditambah ${e(3)} ditambah ${e(2)} sama dengan ${e(6)}.`;
const SUARA_K5 = `Jadi, jumlah jeruk yang mereka petik adalah ${e(63)}.`;
const SUARA_K6 = `Jawaban soal cerita ditulis lengkap dengan satuannya, yaitu ${e(63)} jeruk.`;

export const ADEGAN_SOAL_CERITA: AdeganStory = {
  id: "soal-cerita",
  judul: "Soal cerita: jeruk Kira dan Wei",
  sumber: "Materi: soal cerita penjumlahan",
  latar: "#F7FEE7",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Jeruk Kira dan Wei")),
      tambah(idx(SUARA_K1, "Kira"), ...tokoh("kira", 0)),
      tambah(idx(SUARA_K1, "tiga"), nilaiTokoh("kira", 0, 36)),
      tambah(idx(SUARA_K1, "Wei"), ...tokoh("wei", 1)),
      tambah(idx(SUARA_K1, "dua"), nilaiTokoh("wei", 1, 27)),
      tambah(idx(SUARA_K1, "Berapa"), teks("soal", 150, 82, "36 + 27 = ?", 18, W.ungu)),
    ),
    k(SUARA_K2, tambah(idx(SUARA_K2, "jumlah"), ...kartu("sc", 50, 150, 200, 30, W.emas, ["jumlah seluruhnya: tambah"], 11))),
    k(
      SUARA_K3,
      bersih(0),
      tambah(0, judul("Menjumlahkan satuan"), ...S14.kepala(), ...S14.atas(), ...S14.bawah()),
      tambah(idx(SUARA_K3, "Satuan:"), S14.sorS()),
      tambah(idx(SUARA_K3, "Enam"), S14.eqS()),
      tambah(idx(SUARA_K3, "Tulis"), S14.hSatuan()),
      tambah(idx(SUARA_K3, "simpan"), S14.sim()),
    ),
    k(SUARA_K4, hapus(0, "ls-sor"), tambah(idx(SUARA_K4, "Puluhan:"), S14.sorT()), tambah(idx(SUARA_K4, "Satu"), S14.eqP()), tambah(idx(SUARA_K4, "enam."), S14.hPuluhan())),
    k(SUARA_K5, hapus(0, "ls-sor"), tambah(idx(SUARA_K5, "Jadi"), cap("36 + 27 = 63"))),
    k(SUARA_K6, tambah(idx(SUARA_K6, "yaitu"), ...kartu("jw", 168, 38, 124, 36, W.emas, ["jawaban:", "63 jeruk"], 9))),
  ],
};
