import type { AdeganStory } from "./logika-story";
import { W, anak, angkaPv, bilPv, blokPv, emo, idBlokPv, idKataPv, jumlahPv, judul, kartu, kataPv, kerangkaPv, nilaiPv } from "./k3b1A-gambar";
import { bersih, hapus, idx, k, redamkan, sorotkan, tambah } from "./k3b1A-bantu";

/* ------------------------------ 11. Bilangan dengan nol: tujuh ratus tiga ------------------------------ */
const SUARA_A1 = "Perhatikan bilangan tujuh ratus tiga. Ada tujuh lempeng, tidak ada batang, dan tiga kotak kecil.";
const SUARA_A2 = "Puluhannya nol, artinya tidak ada puluhan. Tidak ada puluhan yang dibaca.";
const SUARA_A3 = "Jadi bilangan ini dibaca tujuh ratus tiga. Bukan tujuh ratus nol tiga.";
const SUARA_A4 = "Nol di tengah tetap ditulis, tetapi tidak dibaca. Ia menjaga tempat puluhan.";
const SUARA_A5 = "Kita periksa dengan penjumlahan. Tujuh ratus ditambah nol ditambah tiga sama dengan tujuh ratus tiga.";

export const ADEGAN_NOL_703: AdeganStory = {
  id: "nol-703",
  judul: "Bilangan dengan nol: tujuh ratus tiga",
  sumber: "Materi: bilangan dengan nol",
  latar: "#FEF9C3",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, ...kerangkaPv()),
      tambah(idx(SUARA_A1, "bilangan"), bilPv(703)),
      tambah(idx(SUARA_A1, "tujuh", 2), ...blokPv(0, 7), angkaPv(0, 7)),
      tambah(idx(SUARA_A1, "batang,"), angkaPv(1, 0)),
      tambah(idx(SUARA_A1, "tiga", 2), ...blokPv(2, 3), angkaPv(2, 3)),
    ),
    k(SUARA_A2, sorotkan(idx(SUARA_A2, "Puluhannya"), "pv-hk1"), tambah(idx(SUARA_A2, "nol,"), nilaiPv(1, 0))),
    k(
      SUARA_A3,
      redamkan(0, "pv-hk1"),
      tambah(idx(SUARA_A3, "tujuh"), ...kataPv("tujuh ratus tiga"), nilaiPv(0, 700), nilaiPv(2, 3)),
      hapus(idx(SUARA_A3, "Bukan"), ...idBlokPv(0, 7), ...idBlokPv(2, 3)),
      tambah(idx(SUARA_A3, "Bukan"), ...kartu("sl", 20, 56, 260, 40, W.merahMuda, ["salah: tujuh ratus nol tiga", "nol tidak ikut dibaca"], 10), emo("sx", 36, 84, "❌", 18)),
    ),
    k(SUARA_A4, tambah(idx(SUARA_A4, "Nol"), ...kartu("nj", 30, 98, 240, 22, W.emas, ["nol tetap ditulis, tidak dibaca"], 10))),
    k(SUARA_A5, hapus(0, ...idKataPv), tambah(idx(SUARA_A5, "Tujuh"), ...jumlahPv("700 + 0 + 3 = 703"))),
  ],
};

/* ------------------------------ 12. Bilangan dengan nol: sembilan ratus ------------------------------ */
const SUARA_B1 = "Sekarang bilangan sembilan ratus. Ada sembilan lempeng, tanpa batang, dan tanpa kotak kecil.";
const SUARA_B2 = "Puluhan dan satuannya sama-sama nol. Jadi yang dibaca hanya ratusannya.";
const SUARA_B3 = "Sembilan ratusan dibaca sembilan ratus. Nol tidak perlu dibaca.";
const SUARA_B4 = "Ingat, nol berarti tidak ada. Nol tetap ditulis supaya setiap angka berada di tempatnya.";

export const ADEGAN_NOL_900: AdeganStory = {
  id: "nol-900",
  judul: "Bilangan dengan nol: sembilan ratus",
  sumber: "Materi: bilangan sembilan ratus",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, ...kerangkaPv()),
      tambah(idx(SUARA_B1, "bilangan"), bilPv(900)),
      tambah(idx(SUARA_B1, "sembilan", 2), ...blokPv(0, 9), angkaPv(0, 9)),
      tambah(idx(SUARA_B1, "batang,"), angkaPv(1, 0)),
      tambah(idx(SUARA_B1, "kotak"), angkaPv(2, 0)),
    ),
    k(
      SUARA_B2,
      sorotkan(idx(SUARA_B2, "Puluhan"), "pv-hk1"),
      tambah(idx(SUARA_B2, "Puluhan"), nilaiPv(1, 0)),
      redamkan(idx(SUARA_B2, "satuannya"), "pv-hk1"),
      sorotkan(idx(SUARA_B2, "satuannya"), "pv-hk2"),
      tambah(idx(SUARA_B2, "satuannya"), nilaiPv(2, 0)),
    ),
    k(
      SUARA_B3,
      redamkan(0, "pv-hk2"),
      sorotkan(idx(SUARA_B3, "Sembilan"), "pv-hk0"),
      tambah(idx(SUARA_B3, "ratus."), nilaiPv(0, 900)),
      tambah(idx(SUARA_B3, "sembilan", 2), ...kataPv("sembilan ratus")),
    ),
    k(SUARA_B4, redamkan(0, "pv-hk0"), hapus(0, ...idKataPv), tambah(idx(SUARA_B4, "Nol"), ...kartu("nl", 20, 172, 260, 24, W.emas, ["nol: tidak ada, tetap ditulis"], 10))),
  ],
};

/* ------------------------------ 13. Menulis tiga ratus lima puluh empat ------------------------------ */
const SUARA_C1 = "Sekarang kebalikannya. Upe mendengar kata bilangan, lalu menulis lambangnya. Kata bilangannya tiga ratus lima puluh empat.";
const SUARA_C2 = "Tentukan angka ratusan dulu. Tiga ratus berarti angka tiga di tempat ratusan.";
const SUARA_C3 = "Lima puluh berarti angka lima di tempat puluhan.";
const SUARA_C4 = "Empat berarti angka empat di tempat satuan.";
const SUARA_C5 = "Gabungkan angka dari kiri ke kanan. Lambang bilangannya adalah angka tiga, angka lima, lalu angka empat.";
const SUARA_C6 = "Kita periksa dengan penjumlahan. Tiga ratus ditambah lima puluh ditambah empat sama dengan tiga ratus lima puluh empat.";

export const ADEGAN_TULIS_354: AdeganStory = {
  id: "tulis-354",
  judul: "Menulis lambang: tiga ratus lima puluh empat",
  sumber: "Materi: menulis lambang 354",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_C1, tambah(0, ...kerangkaPv()), tambah(idx(SUARA_C1, "tiga"), ...kataPv("tiga ratus lima puluh empat"))),
    k(SUARA_C2, sorotkan(idx(SUARA_C2, "ratusan"), "pv-hk0"), tambah(idx(SUARA_C2, "ratus"), nilaiPv(0, 300)), tambah(idx(SUARA_C2, "tiga", 2), angkaPv(0, 3))),
    k(SUARA_C3, redamkan(0, "pv-hk0"), sorotkan(idx(SUARA_C3, "Lima"), "pv-hk1"), tambah(idx(SUARA_C3, "puluh"), nilaiPv(1, 50)), tambah(idx(SUARA_C3, "lima", 2), angkaPv(1, 5))),
    k(SUARA_C4, redamkan(0, "pv-hk1"), sorotkan(idx(SUARA_C4, "Empat"), "pv-hk2"), tambah(idx(SUARA_C4, "empat", 2), angkaPv(2, 4)), tambah(idx(SUARA_C4, "satuan."), nilaiPv(2, 4))),
    k(SUARA_C5, redamkan(0, "pv-hk2"), tambah(idx(SUARA_C5, "Lambang"), bilPv(354))),
    k(SUARA_C6, hapus(0, ...idKataPv), tambah(idx(SUARA_C6, "Tiga"), ...jumlahPv("300 + 50 + 4 = 354"))),
  ],
};

/* ------------------------------ 14. Menulis lima ratus tujuh puluh dua ------------------------------ */
const SUARA_D1 = "Kira berjalan kaki ke taman kota. Jaraknya lima ratus tujuh puluh dua meter. Bagaimana menulis lambang bilangannya?";
const SUARA_D2 = "Dengarkan kata bilangannya. Lima ratus, lima di ratusan. Tujuh puluh, tujuh di puluhan. Dua, dua di satuan.";
const SUARA_D3 = "Susun angka dari kiri ke kanan: lima, tujuh, dua. Itulah lambang bilangannya.";
const SUARA_D4 = "Kita periksa. Lima ratus ditambah tujuh puluh ditambah dua sama dengan lima ratus tujuh puluh dua.";

export const ADEGAN_TULIS_572: AdeganStory = {
  id: "tulis-572",
  judul: "Jarak ke taman: lima ratus tujuh puluh dua",
  sumber: "Materi: menulis lambang 572",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Jalan ke taman kota")),
      tambah(idx(SUARA_D1, "Kira"), ...anak("kira", 50, 84)),
      tambah(idx(SUARA_D1, "Jaraknya"), ...kartu("tm", 100, 70, 180, 40, W.emas, ["lima ratus tujuh puluh dua", "meter"], 10)),
      tambah(idx(SUARA_D1, "Bagaimana"), emo("tq", 150, 160, "❓", 28)),
    ),
    k(
      SUARA_D2,
      bersih(0),
      tambah(0, ...kerangkaPv(), ...kataPv("lima ratus tujuh puluh dua")),
      tambah(idx(SUARA_D2, "ratus,"), nilaiPv(0, 500)),
      tambah(idx(SUARA_D2, "ratusan."), angkaPv(0, 5)),
      tambah(idx(SUARA_D2, "puluh,"), nilaiPv(1, 70)),
      tambah(idx(SUARA_D2, "puluhan."), angkaPv(1, 7)),
      tambah(idx(SUARA_D2, "Dua,"), nilaiPv(2, 2)),
      tambah(idx(SUARA_D2, "satuan."), angkaPv(2, 2)),
    ),
    k(SUARA_D3, tambah(idx(SUARA_D3, "Itulah"), bilPv(572))),
    k(SUARA_D4, hapus(0, ...idKataPv), tambah(idx(SUARA_D4, "Lima"), ...jumlahPv("500 + 70 + 2 = 572"))),
  ],
};

