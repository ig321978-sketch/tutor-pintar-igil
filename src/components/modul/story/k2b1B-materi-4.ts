import type { Aksi, AdeganStory, Obj } from "./logika-story";
import { OWL, TABEL_LATIHAN, W, angkaP, angkaS, batang, batangPapan, emo, judul, kartu, kubus, kubusPapan, labelN, legenda, pilihBaris, tabelNT, teks, titikBatangTabel, titikKubusPapan, titikKubusTabel } from "./k2b1B-gambar";
import { bersih, hapus, idBatangRentang, idKubus, idx, k, pilihKata, redamkan, sorotkan, tambah } from "./k2b1B-bantu";

const L = TABEL_LATIHAN;
const batangTabel = (key: string, dari: number, sampai: number): Obj[] => Array.from({ length: sampai - dari + 1 }, (_, q) => batang(key, dari + q, titikBatangTabel(L, dari + q).x, titikBatangTabel(L, dari + q).y)).flat();
const kubusTabel = (key: string, dari: number, sampai: number): Obj[] => Array.from({ length: sampai - dari + 1 }, (_, q) => kubus(key, dari + q, titikKubusTabel(L, dari + q).x, titikKubusTabel(L, dari + q).y));
const hapusKartu = (at: string | number | undefined, n: number): Aksi => hapus(at, ...Array.from({ length: n }, (_, i) => [`c${i + 1}-k`, `c${i + 1}-t`]).flat());
const geser = (at: string | number | undefined, dari: number, sampai: number, kurang: number): Aksi => ({
  at,
  ubah: Array.from({ length: sampai - dari + 1 }, (_, q) => ({ id: `bsa${dari + q}`, x: titikKubusPapan(dari + q - kurang).x, y: titikKubusPapan(dari + q - kurang).y })),
});

/* ------------------------------ 13. Latihan 1: isi tabel dari batang ------------------------------ */
const SUARA_Q1 = "Latihan satu. Upe menata tiga batang dan lima kubus di tabel. Berapa puluhan dan berapa satuan?";
const SUARA_Q2 = "Pilih angka untuk kolom puluhan. Ketuk jawaban yang benar.";
const SUARA_Q3 = "Betul, ada tiga batang, jadi tiga puluhan. Sekarang pilih angka untuk kolom satuan.";
const SUARA_Q4 = "Ada lima kubus, jadi pilih angka lima. Tiga puluhan dan lima satuan membentuk tiga puluh lima. Hebat!";

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan satu: isi tabel dari batang",
  sumber: "Materi: latihan mengisi tabel",
  latar: "#FEF9C3",
  ketukan: [
    k(SUARA_Q1, tambah(0, judul("Latihan satu"), ...tabelNT("a", L)), tambah(idx(SUARA_Q1, "batang"), ...batangTabel("a", 0, 2)), tambah(idx(SUARA_Q1, "kubus"), ...kubusTabel("a", 0, 4))),
    k(SUARA_Q2, tambah(idx(SUARA_Q2, "Pilih"), ...pilihKata(156, ["2", "3", "4"]))),
    k(SUARA_Q3, sorotkan(idx(SUARA_Q3, "Betul,"), "c2-k"), tambah(idx(SUARA_Q3, "puluhan."), angkaP("a", L, "3")), hapusKartu(idx(SUARA_Q3, "Sekarang"), 3), tambah(idx(SUARA_Q3, "Sekarang"), ...pilihKata(156, ["4", "5", "6"]))),
    k(SUARA_Q4, sorotkan(idx(SUARA_Q4, "Ada"), "c2-k"), tambah(idx(SUARA_Q4, "lima", 2), angkaS("a", L, "5")), tambah(idx(SUARA_Q4, "Hebat!"), teks("ta-n", 150, 198, "35", 14, W.merah))),
  ],
};

/* ------------------------------ 14. Latihan 2: bilangan dari batang dan kubus ------------------------------ */
const SUARA_R1 = "Latihan dua. Halim punya empat batang dan tiga kubus lepas. Bilangan berapa itu?";
const SUARA_R2 = "Pilih bilangannya. Hati-hati, angka di kiri adalah puluhan.";
const SUARA_R3 = "Betul! Empat puluhan dan tiga satuan membentuk empat puluh tiga.";
const SUARA_R4 = "Kartu tiga puluh empat salah, karena angka tiga di kiri berarti tiga puluhan.";

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan dua: bilangan dari batang dan kubus",
  sumber: "Materi: latihan membaca bilangan",
  latar: "#FCE7F3",
  ketukan: [
    k(SUARA_R1, tambah(0, judul("Latihan dua")), tambah(idx(SUARA_R1, "batang"), ...Array.from({ length: 4 }, (_, i) => batangPapan("a", i)).flat()), tambah(idx(SUARA_R1, "kubus"), ...kubusPapan("a", 0, 2))),
    k(SUARA_R2, tambah(idx(SUARA_R2, "Pilih"), ...pilihKata(130, ["34", "43", "40"]))),
    k(SUARA_R3, sorotkan(idx(SUARA_R3, "Betul!"), "c2-k"), tambah(idx(SUARA_R3, "membentuk"), labelN("a", 215, 36, "43", 22))),
    k(SUARA_R4, redamkan(0, "c2-k"), sorotkan(idx(SUARA_R4, "Kartu"), "c1-k"), tambah(idx(SUARA_R4, "salah,"), emo("sl", 150, 186, "\u{1F914}", 26))),
  ],
};

/* ------------------------------ 15. Latihan 3: tukar sepuluh satuan ------------------------------ */
const SUARA_S1 = "Latihan tiga. Wei punya dua batang dan lima belas kubus lepas. Nilainya tiga puluh lima.";
const SUARA_S2 = "Tukar sepuluh kubus dengan satu batang. Lalu pilih cara menulis yang paling ringkas.";
const SUARA_S3 = "Betul! Sekarang ada tiga batang dan lima kubus lepas, jadi tiga puluhan dan lima satuan.";
const SUARA_S4 = "Nilainya tetap tiga puluh lima. Yang berubah hanya bentuknya.";
const PIL_S = ["2 puluhan dan 15 satuan", "3 puluhan dan 5 satuan", "3 puluhan dan 15 satuan"];

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan tiga: tukar sepuluh satuan",
  sumber: "Materi: latihan menukar satuan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_S1, tambah(0, judul("Latihan tiga"), ...legenda()), tambah(idx(SUARA_S1, "batang"), ...batangPapan("a", 0), ...batangPapan("a", 1)), tambah(idx(SUARA_S1, "kubus"), ...kubusPapan("a", 0, 14), teks("lb15", 215, 92, "15", 12, W.merah)), tambah(idx(SUARA_S1, "Nilainya"), labelN("a", 215, 36, "35", 22))),
    k(
      SUARA_S2,
      hapus(idx(SUARA_S2, "satu"), ...idKubus("a", 0, 9)),
      tambah(idx(SUARA_S2, "satu"), ...batangPapan("a", 2)),
      geser(idx(SUARA_S2, "satu"), 10, 14, 10),
      tambah(idx(SUARA_S2, "pilih"), ...pilihBaris(104, PIL_S)),
    ),
    k(SUARA_S3, sorotkan(idx(SUARA_S3, "Betul!"), "c2-k"), sorotkan(idx(SUARA_S3, "tiga"), ...idBatangRentang("a", 0, 2)), redamkan(idx(SUARA_S3, "dan"), ...idBatangRentang("a", 0, 2)), sorotkan(idx(SUARA_S3, "lima"), ...idKubus("a", 10, 14))),
    k(SUARA_S4, redamkan(0, ...idKubus("a", 10, 14)), sorotkan(idx(SUARA_S4, "Nilainya"), "n-a"), tambah(idx(SUARA_S4, "berubah"), emo("ok", 262, 196, "✅", 20))),
  ],
};

/* ------------------------------ 16. Penutup ------------------------------ */
const SUARA_Z1 = "Mari kita ingat lagi. Sepuluh kubus yang disusun menjadi satu batang disebut satu puluhan. Kubus yang tersisa disebut satuan.";
const SUARA_Z2 = "Dalam tabel nilai tempat, angka di kiri adalah puluhan dan angka di kanan adalah satuan.";
const SUARA_Z3 = "Letak angka menentukan nilainya. Dua puluh empat berbeda dengan empat puluh dua.";
const SUARA_Z4 = "Sepuluh satuan bisa ditukar dengan satu puluhan, dan nilainya tetap. Cara yang paling ringkas punya satuan kurang dari sepuluh.";
const SUARA_Z5 = "Hebat sekali, anak-anak! Sampai jumpa di pelajaran berikutnya.";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: mari ingat lagi",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Mari ingat lagi")), tambah("Sepuluh", ...kartu("p1", 14, 30, 272, 36, W.hijauMuda, ["10 kubus disusun: 1 puluhan", "kubus sisanya: satuan"], 9.2))),
    k(SUARA_Z2, tambah("Dalam", ...kartu("p2", 14, 72, 272, 36, W.krem, ["tabel nilai tempat:", "kiri puluhan, kanan satuan"], 9.2))),
    k(SUARA_Z3, tambah("Letak", ...kartu("p3", 14, 114, 272, 36, W.langit, ["letak menentukan nilai:", "24 berbeda dari 42"], 9.2))),
    k(SUARA_Z4, tambah("Sepuluh", ...kartu("p4", 14, 156, 272, 36, W.pink, ["tukar 10 satuan, nilai tetap;", "paling ringkas: satuan kurang dari 10"], 9.2))),
    k(SUARA_Z5, bersih(0), tambah(0, judul("Sampai jumpa!"), emo("sj", 150, 110, OWL, 56)), tambah("anak-anak!", emo("pa", 80, 150, "\u{1F389}", 30), emo("pb", 220, 150, "\u{1F389}", 30))),
  ],
};
