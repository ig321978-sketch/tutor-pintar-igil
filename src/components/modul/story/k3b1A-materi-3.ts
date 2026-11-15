import type { AdeganStory } from "./logika-story";
import { W, anak, angkaPv, bilPv, blokPv, emo, idKataPv, jumlahPv, judul, kartu, kartuAngka, kataPv, kerangkaPv, nilaiPv } from "./k3b1A-gambar";
import { bersih, hapus, idx, k, redamkan, sorotkan, tambah } from "./k3b1A-bantu";

/* ------------------------------ 8. Membaca seratus enam puluh ------------------------------ */
const SUARA_A1 = "Kita taruh bilangan seratus enam puluh di papan. Ratusan satu, puluhan enam, satuan nol.";
const SUARA_A2 = "Baca dari kiri. Ratusan satu dibaca seratus.";
const SUARA_A3 = "Sekarang puluhan. Puluhan enam dibaca enam puluh.";
const SUARA_A4 = "Satuan nol tidak dibaca. Nol berarti tidak ada kotak kecil.";
const SUARA_A5 = "Jadi bilangan ini dibaca seratus enam puluh. Satuan yang nol tidak ikut dibaca.";
const SUARA_A6 = "Lengkapnya, seratus ditambah enam puluh sama dengan seratus enam puluh.";

export const ADEGAN_BACA_160: AdeganStory = {
  id: "baca-160",
  judul: "Membaca bilangan seratus enam puluh",
  sumber: "Materi: membaca 160",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, ...kerangkaPv()),
      tambah(idx(SUARA_A1, "seratus"), bilPv(160)),
      tambah(idx(SUARA_A1, "Ratusan"), ...blokPv(0, 1), angkaPv(0, 1)),
      tambah(idx(SUARA_A1, "puluhan,"), ...blokPv(1, 6), angkaPv(1, 6)),
      tambah(idx(SUARA_A1, "nol."), angkaPv(2, 0)),
    ),
    k(SUARA_A2, sorotkan(idx(SUARA_A2, "Ratusan"), "pv-hk0"), tambah(idx(SUARA_A2, "seratus."), nilaiPv(0, 100))),
    k(SUARA_A3, redamkan(0, "pv-hk0"), sorotkan(idx(SUARA_A3, "Puluhan"), "pv-hk1"), tambah(idx(SUARA_A3, "puluh."), nilaiPv(1, 60))),
    k(SUARA_A4, redamkan(0, "pv-hk1"), sorotkan(idx(SUARA_A4, "Satuan"), "pv-hk2"), tambah(idx(SUARA_A4, "Nol"), nilaiPv(2, 0))),
    k(SUARA_A5, redamkan(0, "pv-hk2"), tambah(idx(SUARA_A5, "seratus"), ...kataPv("seratus enam puluh"))),
    k(SUARA_A6, hapus(0, ...idKataPv), tambah(idx(SUARA_A6, "seratus"), ...jumlahPv("100 + 60 = 160"))),
  ],
};

/* ------------------------------ 9. Jarak ke sekolah: enam ratus tujuh puluh satu ------------------------------ */
const SUARA_B1 = "Wei berjalan kaki ke sekolah. Jarak ke sekolah adalah enam ratus tujuh puluh satu meter.";
const SUARA_B2 = "Kita taruh bilangan itu di papan. Ratusan enam, puluhan tujuh, satuan satu.";
const SUARA_B3 = "Ratusan enam dibaca enam ratus. Puluhan tujuh dibaca tujuh puluh.";
const SUARA_B4 = "Satuan satu dibaca satu. Lalu kita gabungkan ketiganya.";
const SUARA_B5 = "Jadi bilangan ini dibaca enam ratus tujuh puluh satu.";
const SUARA_B6 = "Kita periksa dengan penjumlahan. Enam ratus ditambah tujuh puluh ditambah satu sama dengan enam ratus tujuh puluh satu.";

export const ADEGAN_BACA_671: AdeganStory = {
  id: "baca-671",
  judul: "Jarak ke sekolah Wei",
  sumber: "Materi: membaca 671",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_B1, tambah(0, judul("Jalan ke sekolah")), tambah(idx(SUARA_B1, "Wei"), ...anak("wei", 50, 84)), tambah(idx(SUARA_B1, "enam"), ...kartu("jr", 110, 72, 160, 36, W.emas, ["671 meter"], 13))),
    k(
      SUARA_B2,
      bersih(0),
      tambah(0, ...kerangkaPv()),
      tambah(idx(SUARA_B2, "bilangan"), bilPv(671)),
      tambah(idx(SUARA_B2, "Ratusan"), ...blokPv(0, 6), angkaPv(0, 6)),
      tambah(idx(SUARA_B2, "puluhan"), ...blokPv(1, 7), angkaPv(1, 7)),
      tambah(idx(SUARA_B2, "satuan"), ...blokPv(2, 1), angkaPv(2, 1)),
    ),
    k(
      SUARA_B3,
      sorotkan(idx(SUARA_B3, "Ratusan"), "pv-hk0"),
      tambah(idx(SUARA_B3, "ratus."), nilaiPv(0, 600)),
      redamkan(idx(SUARA_B3, "Puluhan"), "pv-hk0"),
      sorotkan(idx(SUARA_B3, "Puluhan"), "pv-hk1"),
      tambah(idx(SUARA_B3, "puluh."), nilaiPv(1, 70)),
    ),
    k(SUARA_B4, redamkan(0, "pv-hk1"), sorotkan(idx(SUARA_B4, "Satuan"), "pv-hk2"), tambah(idx(SUARA_B4, "dibaca"), nilaiPv(2, 1))),
    k(SUARA_B5, redamkan(0, "pv-hk2"), tambah(idx(SUARA_B5, "enam"), ...kataPv("enam ratus tujuh puluh satu"))),
    k(SUARA_B6, hapus(0, ...idKataPv), tambah(idx(SUARA_B6, "Enam"), ...jumlahPv("600 + 70 + 1 = 671"))),
  ],
};

/* ------------------------------ 10. Papan petunjuk: tujuh ratus lima puluh sembilan ------------------------------ */
const SUARA_C1 = "Di jalan ada papan petunjuk menuju taman. Di papan itu tertulis tujuh ratus lima puluh sembilan meter.";
const SUARA_C2 = "Kira menyusun kartu angka tujuh, lima, dan sembilan dari kiri ke kanan.";
const SUARA_C3 = "Kartu tujuh di tempat ratusan, kartu lima di tempat puluhan, dan kartu sembilan di tempat satuan.";
const SUARA_C4 = "Tujuh ratusan dibaca tujuh ratus. Lima puluhan dibaca lima puluh. Sembilan satuan dibaca sembilan.";
const SUARA_C5 = "Jadi bilangan ini dibaca tujuh ratus lima puluh sembilan.";
const SUARA_C6 = "Kita periksa dengan penjumlahan. Tujuh ratus ditambah lima puluh ditambah sembilan sama dengan tujuh ratus lima puluh sembilan.";
const KARTU_ANGKA = (i: number, d: string, warna: string) => kartuAngka(`ka${i}`, 62 + i * 70, 70, d, warna, 52, 52, 28);

export const ADEGAN_BACA_759: AdeganStory = {
  id: "baca-759",
  judul: "Papan petunjuk 759",
  sumber: "Materi: membaca 759",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Papan petunjuk")),
      tambah(idx(SUARA_C1, "papan"), emo("pp", 150, 62, "\u{1F68F}", 28)),
      tambah(idx(SUARA_C1, "tertulis"), ...kartu("pt", 70, 92, 160, 36, W.emas, ["759 meter"], 13)),
    ),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Susun kartu angka")),
      tambah(idx(SUARA_C2, "tujuh,"), ...KARTU_ANGKA(0, "7", W.hijauMuda)),
      tambah(idx(SUARA_C2, "lima,"), ...KARTU_ANGKA(1, "5", W.langit)),
      tambah(idx(SUARA_C2, "sembilan"), ...KARTU_ANGKA(2, "9", W.merahMuda)),
    ),
    k(
      SUARA_C3,
      bersih(0),
      tambah(0, ...kerangkaPv()),
      tambah(idx(SUARA_C3, "ratusan,"), bilPv(759), angkaPv(0, 7)),
      tambah(idx(SUARA_C3, "puluhan,"), angkaPv(1, 5)),
      tambah(idx(SUARA_C3, "satuan."), angkaPv(2, 9)),
    ),
    k(
      SUARA_C4,
      sorotkan(idx(SUARA_C4, "Tujuh"), "pv-hk0"),
      tambah(idx(SUARA_C4, "ratus."), nilaiPv(0, 700)),
      redamkan(idx(SUARA_C4, "Lima"), "pv-hk0"),
      sorotkan(idx(SUARA_C4, "Lima"), "pv-hk1"),
      tambah(idx(SUARA_C4, "puluh."), nilaiPv(1, 50)),
      redamkan(idx(SUARA_C4, "Sembilan"), "pv-hk1"),
      sorotkan(idx(SUARA_C4, "Sembilan"), "pv-hk2"),
      tambah(idx(SUARA_C4, "sembilan", 2), nilaiPv(2, 9)),
    ),
    k(SUARA_C5, redamkan(0, "pv-hk2"), tambah(idx(SUARA_C5, "tujuh"), ...kataPv("tujuh ratus lima puluh sembilan"))),
    k(SUARA_C6, hapus(0, ...idKataPv), tambah(idx(SUARA_C6, "Tujuh"), ...jumlahPv("700 + 50 + 9 = 759"))),
  ],
};
