import type { AdeganStory, Obj } from "./logika-story";
import { TABEL_BESAR, TABEL_LATIHAN, W, angkaP, angkaS, batang, bilanganT, emo, isiTabel, judul, kartu, kubus, labelN, nilaiP, nilaiS, panah, pusatKubus, tabelNT, teks, titikBatangTabel, titikKubusTabel, titikKisi } from "./k2b1B-gambar";
import { bersih, gilir, hapus, hitungAksi, idBatangRentang, idKubus, idx, k, pilihDua, redamkan, sorotkan, tambah, ubah, urutNilai } from "./k2b1B-bantu";

const G = TABEL_BESAR;
const kubusTabel = (key: string, g: typeof G, dari: number, sampai: number): Obj[] => Array.from({ length: sampai - dari + 1 }, (_, q) => kubus(key, dari + q, titikKubusTabel(g, dari + q).x, titikKubusTabel(g, dari + q).y));
const batangTabel = (key: string, g: typeof G, dari: number, sampai: number): Obj[] => Array.from({ length: sampai - dari + 1 }, (_, q) => batang(key, dari + q, titikBatangTabel(g, dari + q).x, titikBatangTabel(g, dari + q).y)).flat();

/* ------------------------------ 4. Dua puluh delapan ------------------------------ */
const SUARA_D1 = "Sekarang Kira punya dua batang dan delapan kubus. Kita letakkan di tabel nilai tempat.";
const SUARA_D2 = "Dua batang berarti dua puluhan. Delapan kubus lepas berarti delapan satuan.";
const SUARA_D3 = "Kita isi tabelnya. Angka dua di kolom puluhan, angka delapan di kolom satuan.";
const SUARA_D4 = "Dua puluh delapan adalah dua puluhan dan delapan satuan.";
const SUARA_D5 = "Kita membaca bilangan dari kiri. Puluhan dulu, lalu satuan.";
const SUARA_D6 = "Ayo ucapkan lagi bersama Kira. Dua puluh delapan.";

export const ADEGAN_DUA_PULUH_DELAPAN: AdeganStory = {
  id: "dua-puluh-delapan",
  judul: "Dua puluh delapan di tabel nilai tempat",
  sumber: "Materi: dua puluhan dan delapan satuan",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_D1, tambah(0, judul("Bilangan Kira"), ...tabelNT("a", G)), tambah(idx(SUARA_D1, "batang"), ...batangTabel("a", G, 0, 1)), tambah(idx(SUARA_D1, "kubus"), ...kubusTabel("a", G, 0, 7))),
    k(SUARA_D2, sorotkan(0, ...idBatangRentang("a", 0, 1)), redamkan(idx(SUARA_D2, "Delapan"), ...idBatangRentang("a", 0, 1)), sorotkan(idx(SUARA_D2, "Delapan"), ...idKubus("a", 0, 7))),
    k(SUARA_D3, redamkan(0, ...idKubus("a", 0, 7)), tambah(idx(SUARA_D3, "dua"), angkaP("a", G, "2")), tambah(idx(SUARA_D3, "delapan"), angkaS("a", G, "8"))),
    k(SUARA_D4, tambah(0, bilanganT("a", G, "28")), sorotkan(idx(SUARA_D4, "dua", 2), "ta-p"), redamkan(idx(SUARA_D4, "delapan", 2), "ta-p"), sorotkan(idx(SUARA_D4, "delapan", 2), "ta-s")),
    k(SUARA_D5, redamkan(0, "ta-s"), tambah(idx(SUARA_D5, "kiri."), panah("ar", 100, 168, 100, 0, W.hijau, 2.2)), sorotkan(idx(SUARA_D5, "Puluhan"), "ta-p"), redamkan(idx(SUARA_D5, "lalu"), "ta-p"), sorotkan(idx(SUARA_D5, "lalu"), "ta-s")),
    k(SUARA_D6, redamkan(0, "ta-s"), tambah("ucapkan", emo("ucap", 262, 196, "\u{1F5E3}", 24))),
  ],
};

/* ------------------------------ 5. Menghitung loncat sepuluh ------------------------------ */
const YR = (i: number) => 50 + i * 22;
const kubusLoncat = (): Obj[] => Array.from({ length: 4 }, (_, j) => kubus("a", j, titikKisi(j, 185, 62, 4, 18).x, titikKisi(j, 185, 62, 4, 18).y));
const pusatLoncat = (): { x: number; y: number }[] => pusatKubus(Array.from({ length: 4 }, (_, j) => titikKisi(j, 185, 62, 4, 18)));
const batangLoncat = (): Obj[] => [0, 1, 2].flatMap((i) => batang("a", i, 20, YR(i)));
const labelPuluh = (i: number): Obj => teks(`pl-a${i}`, 142, YR(i) + 9, String((i + 1) * 10), 11, W.merah);
const SUARA_L1 = "Upe mempunyai tiga batang dan empat kubus. Kita hitung banyaknya dengan cara loncat sepuluh.";
const SUARA_L2 = "Batang pertama, sepuluh. Batang kedua, dua puluh. Batang ketiga, tiga puluh.";
const SUARA_L3 = "Tiga puluh. Sekarang kita hitung kubus satu per satu. Tiga puluh satu, tiga puluh dua, tiga puluh tiga, tiga puluh empat.";
const SUARA_L4 = "Jadi, bilangannya tiga puluh empat. Tiga puluh empat adalah tiga puluhan dan empat satuan.";
const SUARA_L5 = "Cara ini cepat. Kita menghitung batangnya sepuluh-sepuluh, lalu kubusnya satu-satu.";
const SUARA_L6 = "Coba lagi. Ketuk batangnya satu per satu sambil menghitung loncat sepuluh.";
const posL2 = urutNilai(SUARA_L2, [10, 20, 30]);

export const ADEGAN_HITUNG_SEPULUH: AdeganStory = {
  id: "hitung-sepuluh",
  judul: "Menghitung loncat sepuluh",
  sumber: "Materi: menghitung sepuluh-sepuluh",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_L1, tambah(0, judul("Loncat sepuluh")), tambah(idx(SUARA_L1, "batang"), ...batangLoncat()), tambah(idx(SUARA_L1, "kubus"), ...kubusLoncat()), tambah(idx(SUARA_L1, "sepuluh"), teks("lg", 150, 196, "1 batang: 10 kubus", 8.4, W.ungu))),
    k(
      SUARA_L2,
      tambah(posL2[0], labelPuluh(0)),
      sorotkan(posL2[0], ...idBatangRentang("a", 0, 0)),
      tambah(posL2[1], labelPuluh(1)),
      redamkan(posL2[1], ...idBatangRentang("a", 0, 0)),
      sorotkan(posL2[1], ...idBatangRentang("a", 1, 1)),
      tambah(posL2[2], labelPuluh(2)),
      redamkan(posL2[2], ...idBatangRentang("a", 1, 1)),
      sorotkan(posL2[2], ...idBatangRentang("a", 2, 2)),
    ),
    k(SUARA_L3, redamkan(0, ...idBatangRentang("a", 2, 2)), ...hitungAksi(SUARA_L3, "bsa", pusatLoncat(), { dari: 31, setelah: "satu." })),
    k(SUARA_L4, tambah(idx(SUARA_L4, "bilangannya"), labelN("a", 233, 140, "34", 26)), sorotkan(idx(SUARA_L4, "puluhan"), ...idBatangRentang("a", 0, 2)), redamkan(idx(SUARA_L4, "satuan."), ...idBatangRentang("a", 0, 2)), sorotkan(idx(SUARA_L4, "satuan."), ...idKubus("a", 0, 3))),
    k(SUARA_L5, redamkan(0, ...idKubus("a", 0, 3)), tambah(idx(SUARA_L5, "cepat."), ...kartu("kc", 30, 150, 240, 36, W.emas, ["batang: loncat 10", "kubus: satu per satu"], 10))),
    k(SUARA_L6, ...gilir(SUARA_L6, [["Ketuk", idBatangRentang("a", 0, 0)], ["sambil", idBatangRentang("a", 1, 1)], ["loncat", idBatangRentang("a", 2, 2)]]), tambah("Coba", emo("tk", 262, 120, "\u{1F446}", 22))),
  ],
};

/* ------------------------------ 6. Nilai angka menurut letak ------------------------------ */
const SUARA_N1 = "Wei menulis bilangan dua puluh empat di tabel. Dua batang dan empat kubus.";
const SUARA_N2 = "Angka dua di tempat puluhan bernilai dua puluh.";
const SUARA_N3 = "Angka empat di tempat satuan bernilai empat.";
const SUARA_N4 = "Sekarang Wei menukar letaknya. Bilangannya menjadi empat puluh dua.";
const SUARA_N5 = "Angka empat di tempat puluhan bernilai empat puluh. Angka dua di tempat satuan bernilai dua.";
const SUARA_N6 = "Angkanya sama, tetapi letaknya berbeda, jadi nilainya berbeda. Dua puluh empat berbeda dengan empat puluh dua.";

export const ADEGAN_NILAI_LETAK: AdeganStory = {
  id: "nilai-letak",
  judul: "Nilai angka menurut letaknya",
  sumber: "Materi: nilai angka menurut letak",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Nilai menurut letak"), ...tabelNT("a", G)),
      tambah(idx(SUARA_N1, "dua"), angkaP("a", G, "2"), angkaS("a", G, "4"), bilanganT("a", G, "24")),
      tambah(idx(SUARA_N1, "batang"), ...batangTabel("a", G, 0, 1)),
      tambah(idx(SUARA_N1, "kubus"), ...kubusTabel("a", G, 0, 3)),
    ),
    k(SUARA_N2, sorotkan(idx(SUARA_N2, "Angka"), "ta-p"), tambah(idx(SUARA_N2, "bernilai"), nilaiP("a", G, "20"))),
    k(SUARA_N3, redamkan(0, "ta-p"), sorotkan(idx(SUARA_N3, "Angka"), "ta-s"), tambah(idx(SUARA_N3, "bernilai"), nilaiS("a", G, "4"))),
    k(
      SUARA_N4,
      redamkan(0, "ta-s"),
      tambah(idx(SUARA_N4, "menukar"), ...batangTabel("a", G, 2, 3)),
      hapus(idx(SUARA_N4, "menukar"), ...idKubus("a", 2, 3)),
      ubah(idx(SUARA_N4, "Bilangannya"), { id: "ta-p", isi: "4" }, { id: "ta-s", isi: "2" }, { id: "ta-vp", isi: "40" }, { id: "ta-vs", isi: "2" }, { id: "ta-n", isi: "42" }),
    ),
    k(SUARA_N5, sorotkan(idx(SUARA_N5, "Angka", 1), "ta-vp"), redamkan(idx(SUARA_N5, "Angka", 2), "ta-vp"), sorotkan(idx(SUARA_N5, "Angka", 2), "ta-vs")),
    k(SUARA_N6, redamkan(0, "ta-vs"), hapus(idx(SUARA_N6, "Dua"), "ta-n"), tambah(idx(SUARA_N6, "Dua"), ...kartu("kl", 40, 166, 220, 26, W.emas, ["24 berbeda dari 42"], 12))),
  ],
};

/* ------------------------------ 7. Berapa puluhan, berapa satuan? ------------------------------ */
const L = TABEL_LATIHAN;
const SUARA_P1 = "Igil menulis bilangan tiga puluh tujuh di tabel. Angka tiga di kiri dan angka tujuh di kanan.";
const SUARA_P2 = "Berapa puluhan dan berapa satuan? Ketuk jawaban yang benar.";
const SUARA_P3 = "Betul! Tiga puluh tujuh adalah tiga puluhan dan tujuh satuan.";
const SUARA_P4 = "Sekarang giliran Halim. Ia punya empat batang dan lima kubus lepas.";
const SUARA_P5 = "Kita isi tabelnya. Angka empat di kolom puluhan dan angka lima di kolom satuan.";
const SUARA_P6 = "Empat puluh lima adalah empat puluhan dan lima satuan. Hebat, Halim!";

export const ADEGAN_BACA: AdeganStory = {
  id: "baca-puluhan-satuan",
  judul: "Berapa puluhan, berapa satuan?",
  sumber: "Materi: membaca angka kiri dan kanan",
  latar: "#F5F3FF",
  ketukan: [
    k(SUARA_P1, tambah(0, judul("Bilangan Igil"), ...tabelNT("a", L)), tambah(idx(SUARA_P1, "tiga"), angkaP("a", L, "3")), tambah(idx(SUARA_P1, "tujuh", 2), angkaS("a", L, "7")), tambah(idx(SUARA_P1, "tujuh"), bilanganT("a", L, "37"))),
    k(SUARA_P2, hapus(0, "ta-n"), tambah(idx(SUARA_P2, "Berapa"), ...pilihDua(156, ["3 puluhan 7 satuan", "7 puluhan 3 satuan"]))),
    k(SUARA_P3, sorotkan(idx(SUARA_P3, "Betul!"), "c1-k"), tambah(idx(SUARA_P3, "adalah"), ...isiTabel("a", L, 3, 7))),
    k(SUARA_P4, bersih(0), tambah(0, judul("Bilangan Halim"), ...tabelNT("b", L)), tambah(idx(SUARA_P4, "batang"), ...batangTabel("b", L, 0, 3)), tambah(idx(SUARA_P4, "kubus"), ...kubusTabel("b", L, 0, 4))),
    k(SUARA_P5, tambah(idx(SUARA_P5, "empat"), angkaP("b", L, "4")), tambah(idx(SUARA_P5, "lima"), angkaS("b", L, "5"))),
    k(SUARA_P6, tambah(0, bilanganT("b", L, "45")), tambah("Hebat,", emo("ok", 262, 196, "✅", 22))),
  ],
};
