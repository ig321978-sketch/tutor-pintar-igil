import type { AdeganStory, Obj } from "./logika-story";
import { KOMPOSISI_CONTOH, KOMPOSISI_LATIHAN, W, angka, emo, judul, kartu, kotak, panah, papan, teks } from "./k4b1d-gambar";
import { bersih, idx, k, sorotkan, tambah, ubah } from "./k4b1d-bantu";

export const NAMA_METODE = ["Composition", "Decomposition", "Flexible Grouping", "Number Bonds"];
export const NAMA_METODE_ID = ["Komposisi Bilangan", "Dekomposisi Bilangan", "Pengelompokan Fleksibel", "Ikatan Bilangan"];
const WARNA_METODE = [W.hijauMuda, W.langit, W.krem, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 24, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

/** Kartu nilai (mis. "6.000") di bawah kolom ke-`c` papan yang berpojok (10, y) dengan lebar kolom 70; tengah kolom 45, 115, 185, 255. */
const kartuNilai = (id: string, c: number, y: number, isi: string, h = 36): Obj[] => kartu(`${id}${c}`, 14 + c * 70, y, 62, h, [W.langit, W.hijauMuda, W.krem, W.pink][c], [isi], 10);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Bagaimana cara menyusun dan mengurai bilangan empat angka? Di video ini ada empat cara lain. Kita pakai dua bilangan, yaitu enam ribu tiga ratus empat puluh delapan dan enam ribu delapan ratus empat puluh sembilan.";
const SUARA_O2 = "Cara pertama bernama Composition, atau Komposisi Bilangan: menyusun bilangan dari bagian nilai tempatnya. Cara kedua bernama Decomposition, atau Dekomposisi Bilangan: mengurai bilangan menjadi bagian yang lebih kecil.";
const SUARA_O3 = "Cara ketiga bernama Flexible Grouping, atau Pengelompokan Fleksibel: satu ratusan bisa menjadi sepuluh puluhan. Cara keempat bernama Number Bonds, atau Ikatan Bilangan: bilangan utuh dan bagiannya saling terikat.";
const SUARA_O4 = "Tiap cara dijelaskan konsepnya lebih dulu, lalu dipakai pada contoh soal. Pilih cara yang paling cocok dengan soalnya.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Empat cara dari luar untuk menyusun dan mengurai bilangan",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Empat cara dari luar")),
      tambah(idx(SUARA_O1, "enam"), teks("po1", 80, 88, "6.348", 30, W.hijau)),
      tambah(idx(SUARA_O1, "enam", 2), teks("po2", 220, 88, "6.849", 30, W.merah)),
      tambah(idx(SUARA_O1, "empat", 2), ...kartu("po3", 40, 130, 220, 30, W.emas, ["4 cara lain"], 9.6)),
    ),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Cara pertama dan kedua")),
      tambah(idx(SUARA_O2, "Composition,"), ...kartu("m0", 14, 30, 272, 34, WARNA_METODE[0], [`1. ${NAMA_METODE[0]}`, NAMA_METODE_ID[0]], 9.6)),
      tambah(idx(SUARA_O2, "Decomposition,"), ...kartu("m1", 14, 68, 272, 34, WARNA_METODE[1], [`2. ${NAMA_METODE[1]}`, NAMA_METODE_ID[1]], 9.6)),
    ),
    k(
      SUARA_O3,
      tambah(idx(SUARA_O3, "Grouping,"), ...kartu("m2", 14, 106, 200, 34, WARNA_METODE[2], [`3. ${NAMA_METODE[2]}`, NAMA_METODE_ID[2]], 9)),
      tambah(idx(SUARA_O3, "sepuluh"), teks("n2a", 252, 120, "1 ratusan", 8.4, W.coklat), teks("n2b", 252, 132, "= 10 puluhan", 8.4, W.coklat)),
      tambah(idx(SUARA_O3, "Bonds,"), ...kartu("m3", 14, 144, 272, 34, WARNA_METODE[3], [`4. ${NAMA_METODE[3]}`, NAMA_METODE_ID[3]], 9.6)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Konsep lalu penerapan")),
      tambah("konsepnya", ...kartu("q1", 14, 50, 110, 50, W.hijauMuda, ["1. konsep", "cara kerja"], 10)),
      tambah("dipakai", panah("q2", 130, 75, 40, 0, W.biru, 2.4), ...kartu("q3", 176, 50, 110, 50, W.langit, ["2. penerapan", "contoh soal"], 10)),
      tambah("Pilih", ...kartu("q4", 40, 126, 220, 34, W.emas, ["pilih cara yang cocok dengan soal"], 9.6)),
    ),
  ],
};

/* ------------------------------ 2. Composition: konsep ------------------------------ */
const SUARA_C1 = "Composition berarti menyusun. Bilangan dibangun dari bagian-bagiannya, seperti menumpuk kartu yang bernilai tempat.";
const SUARA_C2 = "Ambil kartu enam ribu, tiga ratus, empat puluh, dan delapan.";
const SUARA_C3 = "Geser tiap kartu ke tempatnya. Nol di belakang kartu tertutup oleh angka kartu berikutnya, sehingga tinggal angka paling depan.";
const SUARA_C4 = "Hasilnya bilangan enam ribu tiga ratus empat puluh delapan. Komposisi selesai ketika semua bagian sudah masuk ke tempatnya.";

const NILAI_KARTU = ["6.000", "300", "40", "8"];

export const ADEGAN_LUAR_KOMPOSISI: AdeganStory = {
  id: "luar-komposisi",
  judul: "Composition: menyusun dari kartu nilai",
  sumber: "Metode luar: Composition",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Composition"), kepala(0)),
      ...["menumpuk", "kartu", "bernilai", "tempat."].map((kata, i) => tambah(idx(SUARA_C1, kata), kotak(`ct${i}`, 90 + i * 14, 70 + i * 12, 100, 44, [W.langit, W.hijauMuda, W.krem, W.pink][i], W.biru, { rx: 6 }))),
      tambah(idx(SUARA_C1, "tempat."), teks("cu", 150, 190, "kartu bernilai tempat", 9, W.coklat)),
    ),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Composition: ambil kartu"), kepala(0)),
      tambah(idx(SUARA_C2, "enam"), kartuNilai("ck", 0, 70, NILAI_KARTU[0], 44)),
      tambah(idx(SUARA_C2, "tiga"), kartuNilai("ck", 1, 70, NILAI_KARTU[1], 44)),
      tambah(idx(SUARA_C2, "empat"), kartuNilai("ck", 2, 70, NILAI_KARTU[2], 44)),
      tambah(idx(SUARA_C2, "delapan"), kartuNilai("ck", 3, 70, NILAI_KARTU[3], 44)),
    ),
    k(
      SUARA_C3,
      tambah(idx(SUARA_C3, "Geser"), ...[0, 1, 2, 3].map((c) => panah(`cg${c}`, 45 + c * 70, 116, 0, 14, W.biru, 2)), ...papan("cp", 10, 134, 70)),
      tambah(idx(SUARA_C3, "tinggal"), ...[0, 1, 2, 3].map((c) => angka("cp", 10, 134, 70, c, KOMPOSISI_CONTOH[c]))),
    ),
    k(
      SUARA_C4,
      tambah(idx(SUARA_C4, "Hasilnya"), teks("ch", 150, 196, "= 6.348", 20, W.hijau)),
      sorotkan(idx(SUARA_C4, "Komposisi"), "cp-d0", "cp-d1", "cp-d2", "cp-d3"),
    ),
  ],
};

/* ------------------------------ 3. Composition: penerapan pada angka buku ------------------------------ */
const SUARA_CT1 = "Sekarang kita pakai pada soal latihan. Papan pertama berisi enam, empat, delapan, dua, jadi kartunya enam ribu, empat ratus, delapan puluh, dan dua.";
const SUARA_CT2 = "Susun kartunya, hasilnya bilangan enam ribu empat ratus delapan puluh dua.";
const SUARA_CT3 = "Papan kedua berisi enam, nol, empat, nol. Kartu nol tidak perlu diambil, jadi cukup kartu enam ribu dan empat puluh. Hasilnya enam ribu empat puluh.";
const SUARA_CT4 = "Contoh lain: empat ribu, lima ratus, tiga puluh, tanpa satuan, menjadi empat ribu lima ratus tiga puluh.";

export const ADEGAN_LUAR_KOMPOSISI_TERAPAN: AdeganStory = {
  id: "luar-komposisi-terapan",
  judul: "Composition pada angka latihan",
  sumber: "Metode luar: Composition (contoh soal)",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_CT1,
      tambah(0, judul("Composition: papan pertama"), kepala(0), ...papan("tp", 10, 56, 70)),
      tambah(idx(SUARA_CT1, "enam,"), angka("tp", 10, 56, 70, 0, KOMPOSISI_LATIHAN[0][0])),
      tambah(idx(SUARA_CT1, "empat,"), angka("tp", 10, 56, 70, 1, KOMPOSISI_LATIHAN[0][1])),
      tambah(idx(SUARA_CT1, "delapan,"), angka("tp", 10, 56, 70, 2, KOMPOSISI_LATIHAN[0][2])),
      tambah(idx(SUARA_CT1, "dua,"), angka("tp", 10, 56, 70, 3, KOMPOSISI_LATIHAN[0][3])),
      tambah(idx(SUARA_CT1, "enam", 2), kartuNilai("tc", 0, 110, "6.000")),
      tambah(idx(SUARA_CT1, "ratus,"), kartuNilai("tc", 1, 110, "400")),
      tambah(idx(SUARA_CT1, "puluh,"), kartuNilai("tc", 2, 110, "80")),
      tambah(idx(SUARA_CT1, "dua", 2), kartuNilai("tc", 3, 110, "2")),
    ),
    k(
      SUARA_CT2,
      tambah(idx(SUARA_CT2, "hasilnya"), teks("th", 150, 186, "= 6.482", 22, W.hijau)),
      sorotkan(idx(SUARA_CT2, "Susun"), "tc0-k", "tc1-k", "tc2-k", "tc3-k"),
    ),
    k(
      SUARA_CT3,
      bersih(0),
      tambah(0, judul("Composition: papan kedua"), kepala(0), ...papan("uq", 10, 56, 70)),
      tambah(idx(SUARA_CT3, "enam"), angka("uq", 10, 56, 70, 0, KOMPOSISI_LATIHAN[1][0])),
      tambah(idx(SUARA_CT3, "nol"), angka("uq", 10, 56, 70, 1, KOMPOSISI_LATIHAN[1][1])),
      tambah(idx(SUARA_CT3, "empat"), angka("uq", 10, 56, 70, 2, KOMPOSISI_LATIHAN[1][2])),
      tambah(idx(SUARA_CT3, "nol", 2), angka("uq", 10, 56, 70, 3, KOMPOSISI_LATIHAN[1][3])),
      tambah(idx(SUARA_CT3, "tidak"), teks("un", 150, 124, "kartu nol tidak perlu diambil", 8.8, W.coklat)),
      tambah(idx(SUARA_CT3, "enam", 2), kartuNilai("uc", 0, 134, "6.000", 30)),
      tambah(idx(SUARA_CT3, "puluh."), kartuNilai("uc", 2, 134, "40", 30)),
      tambah(idx(SUARA_CT3, "Hasilnya"), teks("uh", 150, 190, "= 6.040", 20, W.hijau)),
    ),
    k(
      SUARA_CT4,
      bersih(0),
      tambah(0, judul("Composition: contoh lain"), kepala(0), ...papan("vp", 10, 56, 70, KOMPOSISI_LATIHAN[2])),
      tambah(idx(SUARA_CT4, "ribu,"), kartuNilai("vc", 0, 110, "4.000")),
      tambah(idx(SUARA_CT4, "ratus,"), kartuNilai("vc", 1, 110, "500")),
      tambah(idx(SUARA_CT4, "puluh,"), kartuNilai("vc", 2, 110, "30")),
      tambah(idx(SUARA_CT4, "menjadi"), teks("vh", 150, 176, "= 4.530", 22, W.hijau)),
    ),
  ],
};

/* ------------------------------ 4. Decomposition: konsep ------------------------------ */
const SUARA_D1 = "Decomposition berarti mengurai. Mulai dari bilangan utuh, lalu kupas satu angka demi satu angka dari kiri.";
const SUARA_D2 = "Kupas angka paling kiri: enam di ribuan bernilai enam ribu, dan sisanya delapan ratus empat puluh sembilan.";
const SUARA_D3 = "Kupas lagi: delapan ratus, sisanya empat puluh sembilan.";
const SUARA_D4 = "Kupas terakhir: empat puluh, sisanya sembilan. Habis diurai: enam ribu ditambah delapan ratus ditambah empat puluh ditambah sembilan.";

export const ADEGAN_LUAR_DEKOMPOSISI: AdeganStory = {
  id: "luar-dekomposisi",
  judul: "Decomposition: mengupas angka dari kiri",
  sumber: "Metode luar: Decomposition",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Decomposition"), kepala(1)),
      tambah("bilangan", teks("da", 150, 100, "6.849", 40, W.biru)),
      tambah("kupas", emo("db0", 240, 70, "✂", 26)),
    ),
    k(
      SUARA_D2,
      ubah(idx(SUARA_D2, "enam"), { id: "da", y: 76, u: 22 }),
      tambah(idx(SUARA_D2, "ribu"), teks("dk", 150, 130, "6.000 + 849", 24, W.merah)),
    ),
    k(SUARA_D3, ubah(idx(SUARA_D3, "delapan"), { id: "dk", isi: "6.000 + 800 + 49" })),
    k(
      SUARA_D4,
      ubah(idx(SUARA_D4, "puluh"), { id: "dk", isi: "6.000 + 800 + 40 + 9", u: 21 }),
      sorotkan(idx(SUARA_D4, "Habis"), "dk"),
    ),
  ],
};

/* ------------------------------ 5. Decomposition: penerapan pada angka buku ------------------------------ */
const SUARA_DT1 = "Sekarang kita pakai bilangan enam ribu tiga puluh lima. Kupas enam ribu, sisanya tiga puluh lima.";
const SUARA_DT2 = "Tidak ada ratusan, jadi ratusan dilewati. Kupas tiga puluh, sisanya lima.";
const SUARA_DT3 = "Bilangan tujuh ribu dua puluh. Kupas tujuh ribu, ratusan nol, lalu dua puluh, satuan nol. Hasilnya tujuh ribu ditambah dua puluh.";
const SUARA_DT4 = "Dua ribu satu menjadi dua ribu ditambah satu. Tujuh ribu tinggal tujuh ribu, tanpa bagian lain.";
const SUARA_DT5 = "Sembilan ribu sembilan ratus sembilan puluh sembilan menjadi sembilan ribu, sembilan ratus, sembilan puluh, dan sembilan.";

export const ADEGAN_LUAR_DEKOMPOSISI_TERAPAN: AdeganStory = {
  id: "luar-dekomposisi-terapan",
  judul: "Decomposition pada bilangan latihan",
  sumber: "Metode luar: Decomposition (contoh soal)",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_DT1,
      tambah(0, judul("Decomposition: 6.035"), kepala(1)),
      tambah(idx(SUARA_DT1, "bilangan"), teks("ea", 150, 86, "6.035", 28, W.biru)),
      tambah(idx(SUARA_DT1, "Kupas"), teks("eb", 150, 134, "6.000 + 35", 24, W.merah)),
    ),
    k(
      SUARA_DT2,
      ubah(idx(SUARA_DT2, "tiga"), { id: "eb", isi: "6.000 + 30 + 5", u: 22 }),
      tambah(idx(SUARA_DT2, "dilewati."), ...kartu("ec", 20, 150, 260, 34, W.krem, ["nol ratusan dilewati;", "boleh ditulis 000"], 8.8)),
    ),
    k(
      SUARA_DT3,
      bersih(0),
      tambah(0, judul("Decomposition: 7.020"), kepala(1)),
      tambah(idx(SUARA_DT3, "tujuh"), teks("fa", 150, 86, "7.020", 28, W.biru)),
      tambah(idx(SUARA_DT3, "ratusan"), teks("fb", 150, 134, "7.000 + 20", 24, W.merah)),
      tambah(idx(SUARA_DT3, "Hasilnya"), emo("fc", 150, 176, "✅", 24)),
    ),
    k(
      SUARA_DT4,
      bersih(0),
      tambah(0, judul("Decomposition: dua bilangan lagi"), kepala(1)),
      tambah(idx(SUARA_DT4, "ditambah"), teks("ga", 150, 78, "2.001 = 2.000 + 1", 15, W.biru)),
      tambah(idx(SUARA_DT4, "tinggal"), teks("gb", 150, 116, "7.000 = 7.000", 15, W.biru)),
    ),
    k(SUARA_DT5, tambah(idx(SUARA_DT5, "menjadi"), teks("gc", 150, 160, "9.999 = 9.000 + 900 + 90 + 9", 12.4, W.merah))),
  ],
};
