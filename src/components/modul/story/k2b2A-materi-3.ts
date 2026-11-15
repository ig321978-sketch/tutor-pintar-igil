import type { AdeganStory, Obj } from "./logika-story";
import { OWL, W, bagan, batangTabel, emo, jalur, judul, kartu, kerangkaTabel, kubusTabel, labelBaris, pusatPetak } from "./k2b2A-gambar";
import { bersih, hapus, hitungAksi, idx, ids, k, pilihKata, redamkan, sorotkan, tambah } from "./k2b2A-bantu";
import { JALUR_10_20, YJ } from "./k2b2A-materi-1";

const rentang = (dari: number, sampai: number, buat: (i: number) => Obj): Obj[] => Array.from({ length: sampai - dari }, (_, q) => buat(dari + q));

/* ------------------------------ 11. Memilih cara yang paling mudah ------------------------------ */
const SUARA_C1 = "Tidak ada cara yang paling betul. Pilihlah cara yang paling mudah untukmu.";
const SUARA_C2 = "Kalau bilangan tambahannya kecil, maju di jalur bilangan itu cepat. Contohnya empat belas ditambah tiga sama dengan tujuh belas.";
const SUARA_C3 = "Kalau ada sepuluh yang bisa dibentuk, pecah bilangannya. Contohnya tujuh ditambah delapan sama dengan lima belas.";
const SUARA_C4 = "Kalau satuannya jadi sepuluh, tukar dengan satu puluhan di tabel. Contohnya tiga belas ditambah tujuh sama dengan dua puluh.";
const SUARA_C5 = "Pilih cara yang kamu suka, lalu periksa dengan cara lain. Hasilnya harus sama.";
const KARTU_CARA = [
  { id: "c1", y: 34, warna: W.hijauMuda, judul: "Maju di jalur bilangan", hitung: "14 + 3 = 17" },
  { id: "c2", y: 82, warna: W.pink, judul: "Pecah jadi 10 dan sisa", hitung: "7 + 8 = 15" },
  { id: "c3", y: 130, warna: W.langit, judul: "Tabel: tukar 10 satuan", hitung: "13 + 7 = 20" },
];
const kartuCara = (i: number, dengan: boolean): Obj[] => kartu(KARTU_CARA[i].id, 14, KARTU_CARA[i].y, 272, 42, KARTU_CARA[i].warna, dengan ? [KARTU_CARA[i].judul, KARTU_CARA[i].hitung] : [KARTU_CARA[i].judul], 10);

export const ADEGAN_PILIH_CARA: AdeganStory = {
  id: "pilih-cara",
  judul: "Memilih cara yang paling mudah",
  sumber: "Materi: memilih cara yang mudah",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_C1, tambah(0, judul("Pilih cara yang mudah")), tambah(idx(SUARA_C1, "Pilihlah"), ...kartuCara(0, false), ...kartuCara(1, false), ...kartuCara(2, false))),
    k(SUARA_C2, hapus(0, "c1-k", "c1-t0"), tambah(0, ...kartuCara(0, true)), sorotkan(idx(SUARA_C2, "cepat."), "c1-k")),
    k(SUARA_C3, redamkan(0, "c1-k"), hapus(0, "c2-k", "c2-t0"), tambah(0, ...kartuCara(1, true)), sorotkan(idx(SUARA_C3, "pecah"), "c2-k")),
    k(SUARA_C4, redamkan(0, "c2-k"), hapus(0, "c3-k", "c3-t0"), tambah(0, ...kartuCara(2, true)), sorotkan(idx(SUARA_C4, "tabel"), "c3-k")),
    k(SUARA_C5, redamkan(0, "c3-k"), tambah(idx(SUARA_C5, "periksa"), emo("ok", 150, 192, "✅", 26))),
  ],
};

/* ------------------------------ 12. Latihan 1: maju di jalur bilangan ------------------------------ */
const SUARA_L1 = "Latihan satu. Halim melompat di jalur bilangan. Dia mulai dari empat belas.";
const SUARA_L2 = "Halim maju tiga langkah. Satu, dua, tiga.";
const SUARA_L3 = "Pilih jawabannya. Empat belas ditambah tiga sama dengan berapa? Ketuk bilangan yang tepat.";
const SUARA_L4 = "Betul! Empat belas ditambah tiga sama dengan tujuh belas. Hebat!";

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan 1: maju di jalur bilangan",
  sumber: "Materi: latihan maju di jalur bilangan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_L1, tambah(0, judul("Latihan 1")), tambah(idx(SUARA_L1, "jalur"), ...jalur(JALUR_10_20, YJ)), sorotkan(idx(SUARA_L1, "empat"), "nl4-k"), tambah(idx(SUARA_L1, "belas."), emo("fg", pusatPetak(11, 4, YJ).x, 64, "\u{1F438}", 20))),
    k(SUARA_L2, ...hitungAksi(SUARA_L2, "nl", Array.from({ length: 4 }, (_, q) => pusatPetak(11, 4 + q, YJ)), { dari: 1, awal: 1, setelah: "langkah.", naik: 18, u: 10 })),
    k(SUARA_L3, redamkan(0, "nl4-k"), tambah(idx(SUARA_L3, "ditambah"), ...kartu("eq", 80, 112, 140, 24, W.krem, ["14 + 3 = ?"], 12)), tambah(idx(SUARA_L3, "jawabannya."), ...pilihKata(148, ["16", "17", "18"])), sorotkan(idx(SUARA_L3, "Ketuk"), "c2-k")),
    k(SUARA_L4, hapus(0, "eq-k", "eq-t0"), sorotkan(idx(SUARA_L4, "tujuh"), "nl7-k"), tambah(idx(SUARA_L4, "ditambah"), ...kartu("eq", 80, 112, 140, 24, W.emas, ["14 + 3 = 17"], 12)), tambah(idx(SUARA_L4, "Hebat!"), emo("ow", 150, 198, OWL, 18))),
  ],
};

/* ------------------------------ 13. Latihan 2: pecah jadi sepuluh dan sisa ------------------------------ */
const SUARA_D1 = "Latihan dua. Wei punya sebelas apel, lalu mendapat tujuh apel lagi. Berapa apel Wei sekarang?";
const SUARA_D2 = "Pecah sebelas jadi sepuluh dan satu. Satu ditambah tujuh sama dengan delapan.";
const SUARA_D3 = "Pilih jawabannya. Sepuluh ditambah delapan sama dengan berapa? Ketuk bilangan yang tepat.";
const SUARA_D4 = "Betul! Sepuluh ditambah delapan sama dengan delapan belas. Hebat!";

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan 2: pecah jadi sepuluh dan sisa",
  sumber: "Materi: latihan memecah bilangan",
  latar: "#F0FDFA",
  ketukan: [
    k(SUARA_D1, tambah(0, judul("Latihan 2")), tambah(idx(SUARA_D1, "apel"), emo("ap", 150, 92, "\u{1F34E}", 50)), tambah(idx(SUARA_D1, "Berapa"), ...kartu("eq", 80, 112, 140, 28, W.krem, ["11 + 7 = ?"], 14))),
    k(SUARA_D2, hapus(0, "ap"), tambah(idx(SUARA_D2, "sebelas"), ...bagan("bd", 150, 34, "11", "10", "1")), tambah(idx(SUARA_D2, "ditambah"), ...kartu("q1", 80, 146, 140, 24, W.hijauMuda, ["1 + 7 = 8"], 12))),
    k(SUARA_D3, hapus(0, "eq-k", "eq-t0", "q1-k", "q1-t0"), tambah(idx(SUARA_D3, "ditambah"), ...kartu("q2", 80, 104, 140, 24, W.krem, ["10 + 8 = ?"], 12)), tambah(idx(SUARA_D3, "jawabannya."), ...pilihKata(146, ["17", "18", "19"])), sorotkan(idx(SUARA_D3, "Ketuk"), "c2-k")),
    k(SUARA_D4, hapus(0, "c1-k", "c1-t", "c2-k", "c2-t", "c3-k", "c3-t", "q2-k", "q2-t0"), tambah(idx(SUARA_D4, "ditambah"), ...kartu("q2", 80, 104, 140, 24, W.emas, ["10 + 8 = 18"], 12)), tambah(idx(SUARA_D4, "sama"), ...kartu("eq", 80, 140, 140, 28, W.emas, ["11 + 7 = 18"], 14)), tambah(idx(SUARA_D4, "Hebat!"), emo("ow", 150, 198, OWL, 18))),
  ],
};

/* ------------------------------ 14. Latihan 3: tukar di tabel ------------------------------ */
const SUARA_E1 = "Latihan tiga. Igil menjumlahkan enam belas dan empat di tabel nilai tempat. Satu batang dan enam kubus, lalu empat kubus.";
const SUARA_E2 = "Satuannya, enam ditambah empat sama dengan sepuluh. Sepuluh satuan kita tukar dengan satu puluhan.";
const SUARA_E3 = "Pilih jawabannya. Enam belas ditambah empat sama dengan berapa? Ketuk bilangan yang tepat.";
const SUARA_E4 = "Betul! Dua puluhan dan nol satuan, yaitu dua puluh. Hebat!";

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan 3: tukar di tabel",
  sumber: "Materi: latihan menukar sepuluh satuan",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_E1,
      tambah(0, judul("Latihan 3")),
      tambah(idx(SUARA_E1, "tabel"), ...kerangkaTabel(3)),
      tambah(idx(SUARA_E1, "batang"), labelBaris(0, "16"), ...[0].map((i) => batangTabel(0, i)), ...rentang(0, 6, (i) => kubusTabel(0, i))),
      tambah(idx(SUARA_E1, "empat", 2), labelBaris(1, "4"), ...rentang(0, 4, (i) => kubusTabel(1, i))),
    ),
    k(
      SUARA_E2,
      tambah(idx(SUARA_E2, "sepuluh."), ...rentang(0, 10, (i) => kubusTabel(2, i, W.merahMuda)), batangTabel(2, 0), ...kartu("q1", 80, 172, 140, 26, W.krem, ["6 + 4 = 10"], 12)),
      hapus(idx(SUARA_E2, "tukar"), ...ids("tb2s", 0, 9)),
      tambah(idx(SUARA_E2, "puluhan."), batangTabel(2, 1)),
    ),
    k(SUARA_E3, bersih(0), tambah(0, judul("Latihan 3")), tambah(idx(SUARA_E3, "ditambah"), ...kartu("eq", 80, 60, 140, 28, W.krem, ["16 + 4 = ?"], 14)), tambah(idx(SUARA_E3, "jawabannya."), ...pilihKata(110, ["10", "19", "20"])), sorotkan(idx(SUARA_E3, "Ketuk"), "c3-k")),
    k(SUARA_E4, hapus(0, "eq-k", "eq-t0"), tambah(idx(SUARA_E4, "Dua"), ...kartu("pn", 70, 56, 160, 26, W.krem, ["2 puluhan dan 0 satuan"], 11)), tambah(idx(SUARA_E4, "yaitu"), ...kartu("eq", 70, 150, 160, 28, W.emas, ["16 + 4 = 20"], 14)), tambah(idx(SUARA_E4, "Hebat!"), emo("ow", 150, 198, OWL, 18))),
  ],
};

/* ------------------------------ 15. Penutup ------------------------------ */
const SUARA_Z1 = "Mari kita ingat lagi. Ada tiga cara menjumlahkan bilangan sampai dua puluh.";
const SUARA_Z2 = "Cara pertama, maju di jalur bilangan. Mulai dari bilangan pertama, lalu maju sebanyak bilangan kedua.";
const SUARA_Z3 = "Cara kedua, pecah bilangan jadi sepuluh dan sisa, lalu jumlahkan sisanya.";
const SUARA_Z4 = "Cara ketiga, tabel nilai tempat. Kalau satuannya sepuluh, tukar dengan satu puluhan.";
const SUARA_Z5 = "Periksa hasilnya dengan pengurangan. Hebat sekali, anak-anak! Sampai jumpa di pelajaran berikutnya.";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: mari ingat lagi",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Mari ingat lagi")), tambah(idx(SUARA_Z1, "Ada"), ...kartu("p0", 14, 30, 272, 36, W.emas, ["tiga cara menjumlahkan", "bilangan sampai 20"], 9.2))),
    k(SUARA_Z2, tambah(idx(SUARA_Z2, "pertama,"), ...kartu("p1", 14, 72, 272, 36, W.hijauMuda, ["maju di jalur bilangan:", "mulai dari bilangan pertama"], 9.2))),
    k(SUARA_Z3, tambah(idx(SUARA_Z3, "kedua,"), ...kartu("p2", 14, 114, 272, 36, W.pink, ["pecah jadi 10 dan sisa:", "jumlahkan sisanya dulu"], 9.2))),
    k(SUARA_Z4, tambah(idx(SUARA_Z4, "ketiga,"), ...kartu("p3", 14, 156, 272, 36, W.langit, ["tabel nilai tempat:", "10 satuan tukar 1 puluhan"], 9.2))),
    k(SUARA_Z5, bersih(0), tambah(0, judul("Sampai jumpa!"), emo("sj", 150, 110, OWL, 56)), tambah(idx(SUARA_Z5, "anak-anak!"), emo("pa", 80, 150, "\u{1F389}", 30), emo("pb", 220, 150, "\u{1F389}", 30))),
  ],
};
