import type { AdeganStory, Obj } from "./logika-story";
import { GX, OWL, SATUAN, W, emo, garis, hasil, judul, kartu, kotak, pilihan, teks, ukur, type Jenis, type Ukur } from "./k1b7B-gambar";
import { bersih, hapus, idx, k, redamkan, sorotkan, tambah, ukurAksi } from "./k1b7B-bantu";
import { WARNA_METODE, kepala } from "./k1b7B-luar-1";

/* ------------------------------ 4. Banding Panjang: konsep ------------------------------ */
/** Dua benda sejajar dari garis awal yang sama: tongkat Upe (delapan klip) dan tali Wei (lima klip). Satuan hanya muncul pada bagian yang lebih. */
export const BA_Y = 56;
export const BB_Y = 88;
export const BA_W = 192;
export const BB_W = 120;
export const EKS_Y = 124;
/** Satuan klip untuk bagian yang lebih, bernomor sesuai tempatnya pada deret klip dari garis awal (nomor 5 sampai 7), id `exu{i}`. */
const EKSTRA: Ukur = {
  p: "ex",
  jenis: "klip",
  n: 8,
  x0: GX,
  y: EKS_Y - 28,
  lebar: BA_W,
  bar: [],
  garisAwal: garis("exg", GX, 0, 0, 0),
  unit: (i) => kotak(`exu${i}`, GX + i * SATUAN.klip.w, EKS_Y, SATUAN.klip.w, SATUAN.klip.h, SATUAN.klip.warna, W.biru, { rx: 2, tebal: 1.2 }),
  units: [],
  pusat: Array.from({ length: 8 }, (_, i) => ({ x: GX + i * SATUAN.klip.w + SATUAN.klip.w / 2, y: EKS_Y + SATUAN.klip.h / 2 })),
};
const BENDA_A: Obj[] = [kotak("cab", GX, BA_Y, BA_W, 14, W.hijauMuda, W.biru, { rx: 3, tebal: 1.5 }), teks("cat", GX + BA_W / 2, BA_Y + 10, "tongkat Upe", 8.4)];
const BENDA_B: Obj[] = [kotak("cbb", GX, BB_Y, BB_W, 14, W.lavender, W.biru, { rx: 3, tebal: 1.5 }), teks("cbt", GX + BB_W / 2, BB_Y + 10, "tali Wei", 8.4)];
const GARIS_AWAL = garis("cg", GX, 50, 0, 56, W.merah, 1.8);

const SUARA_C1 = "Metode kedua bernama Banding Panjang. Dua benda ditaruh sejajar, mulai dari garis awal yang sama.";
const SUARA_C2 = "Lihat ujung kedua benda. Tali Wei berhenti di sini, sedangkan tongkat Upe masih terus.";
const SUARA_C3 = "Benda yang ujungnya lebih jauh dari garis awal adalah yang lebih panjang. Jadi tongkat Upe lebih panjang.";
const SUARA_C4 = "Mau tahu lebihnya berapa klip? Kita hitung bagian yang lebih. Satu, dua, tiga. Lebihnya tiga klip.";
const SUARA_C5 = "Metode ini cepat, karena kita membandingkan dulu sebelum menghitung.";

export const ADEGAN_LUAR_BANDING: AdeganStory = {
  id: "luar-banding",
  judul: "Banding Panjang: sejajarkan dari garis awal",
  sumber: "Metode luar: Banding Panjang",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_C1, tambah("kedua", ...kepala(1)), tambah("sejajar,", ...BENDA_A, ...BENDA_B), tambah("garis", GARIS_AWAL)),
    k(SUARA_C2, tambah("Tali", garis("cm", GX + BB_W, 50, 0, 56, W.hijau, 1.6, { putus: true })), tambah("sini,", teks("cmt", GX + BB_W, 120, "ujung tali", 8.4, W.hijau))),
    k(SUARA_C3, sorotkan("Jadi", "cab"), tambah("Benda", ...kartu("ck", 40, 172, 220, 22, W.hijauMuda, ["tongkat Upe lebih panjang"], 9.4))),
    k(
      SUARA_C4,
      hapus(0, "cmt", "ck-k", "ck-t0"),
      redamkan(0, "cab"),
      ...ukurAksi(SUARA_C4, EKSTRA, { awal: 5, sampai: 8, setelah: "lebih." }),
      tambah(idx(SUARA_C4, "klip", 2), teks("cs", 150, 168, "selisih: 3 klip", 11, W.coklat)),
    ),
    k(SUARA_C5, hapus(0, "tg"), tambah("Metode", ...kartu("cl", 14, 176, 272, 22, W.emas, ["bandingkan dulu, baru hitung"], 9.6))),
  ],
};

/* ------------------------------ 5. Banding Panjang: terapan ------------------------------ */
export const TIGA = [
  { id: "da", nama: "pita A", y: 56, lebar: 144, warna: W.merahMuda },
  { id: "db", nama: "pita B", y: 90, lebar: 216, warna: W.hijauMuda },
  { id: "dc", nama: "pita C", y: 124, lebar: 168, warna: W.lavender },
];
const benda3 = (): Obj[] => TIGA.flatMap((b) => [kotak(`${b.id}b`, GX, b.y, b.lebar, 14, b.warna, W.biru, { rx: 3, tebal: 1.5 }), teks(`${b.id}t`, GX + b.lebar / 2, b.y + 10, b.nama, 8.4)]);
const SUARA_D1 = "Terapkan pada tiga pita. Semuanya mulai dari garis awal yang sama.";
const SUARA_D2 = "Mana yang paling panjang? Lihat ujung yang paling jauh. Ketuk hurufnya.";
const SUARA_D3 = "Betul! Ujung pita B paling jauh dari garis awal. Pita B paling panjang.";
const SUARA_D4 = "Sekarang cari yang paling pendek. Ujungnya paling dekat dengan garis awal. Itu pita A.";

export const ADEGAN_LUAR_BANDING_TERAPAN: AdeganStory = {
  id: "luar-banding-terapan",
  judul: "Banding Panjang: tiga pita",
  sumber: "Metode luar: Banding Panjang, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_D1, tambah("Terapkan", ...kepala(1)), tambah("tiga", ...benda3()), tambah("garis", garis("dg", GX, 50, 0, 94, W.merah, 1.8))),
    k(SUARA_D2, tambah("Mana", ...pilihan(154, ["A", "B", "C"], 18))),
    k(SUARA_D3, sorotkan("Betul!", "c2-k"), sorotkan("paling@2", "dbb")),
    k(SUARA_D4, redamkan(0, "c2-k", "dbb"), sorotkan("pendek.", "c1-k", "dab")),
  ],
};

/* ------------------------------ 6. Satuan Tak Baku: konsep ------------------------------ */
const MEJA_S = ukur("fa", "sedotan", 6, GX, 54, "meja Upe", W.krem);
const MEJA_J = ukur("fb", "jepit", 15, GX, 112, "meja Upe", W.krem);
const SAMPEL5: Jenis[] = ["klip", "stik", "kotak", "sedotan", "jepit"];
const SUARA_E1 = "Metode ketiga bernama Satuan Tak Baku. Kita boleh memakai benda kecil apa saja di layar sebagai satuan.";
const SUARA_E2 = "Meja Upe diukur dengan sedotan. Hasilnya enam sedotan.";
const SUARA_E3 = "Meja yang sama diukur dengan jepit. Hasilnya lima belas jepit.";
const SUARA_E4 = "Satuannya tidak baku, jadi hasilnya berbeda. Karena itu, nama satuannya harus selalu ditulis.";
const SUARA_E5 = "Kalau ingin membandingkan, pakailah satuan tak baku yang sama.";
const PUSAT5 = [40, 100, 150, 205, 262];

export const ADEGAN_LUAR_SATUAN: AdeganStory = {
  id: "luar-satuan",
  judul: "Satuan Tak Baku: pakai satuan apa saja",
  sumber: "Metode luar: Satuan Tak Baku",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_E1,
      tambah("ketiga", ...kepala(2)),
      ...SAMPEL5.map((j, i) =>
        tambah(["klip", "stik", "kotak", "sedotan", "jepit"][i] === "klip" ? "kecil" : "layar", kotak(`fs${i}`, PUSAT5[i] - SATUAN[j].w / 2, 96, SATUAN[j].w, SATUAN[j].h, SATUAN[j].warna, W.biru, { rx: 2, tebal: 1.2 }), teks(`fn${i}`, PUSAT5[i], 130, j, 9, W.ungu)),
      ),
    ),
    k(SUARA_E2, ...[0, 1, 2, 3, 4].map((i) => hapus(0, `fs${i}`, `fn${i}`)), tambah(0, ...MEJA_S.bar, MEJA_S.garisAwal, ...MEJA_S.units), tambah("enam", hasil("fa", "sedotan", 6, 150, 102, 12))),
    k(SUARA_E3, tambah(0, ...MEJA_J.bar, MEJA_J.garisAwal), tambah("jepit.", ...MEJA_J.units), tambah("belas", hasil("fb", "jepit", 15, 150, 172, 12))),
    k(SUARA_E4, tambah("Karena", ...kartu("ek", 14, 180, 272, 20, W.emas, ["satuan beda, hasil beda; tulis namanya"], 9))),
    k(SUARA_E5, hapus(0, "ek-k", "ek-t0"), tambah("Kalau", ...kartu("el", 14, 180, 272, 20, W.hijauMuda, ["bandingkan: satuan sama"], 9.4))),
  ],
};

/* ------------------------------ 7. Satuan Tak Baku: terapan ------------------------------ */
const TONGKAT_W = ukur("ga", "klip", 10, GX, 56, "tongkat Wei", W.hijauMuda);
const TONGKAT_H = ukur("gb", "stik", 5, GX, 118, "tongkat Halim", W.pink);
const SUARA_F1 = "Tongkat Wei diukur dengan klip, hasilnya sepuluh klip. Tongkat Halim diukur dengan stik, hasilnya lima stik.";
const SUARA_F2 = "Mana yang lebih panjang? Sepuluh lebih dari lima, tetapi satuannya berbeda. Hati-hati!";
const SUARA_F3 = "Kita periksa dengan garis awal yang sama. Ujung kedua tongkat sejajar. Keduanya sama panjang!";
const SUARA_F4 = "Jadi, kita tidak boleh membandingkan angka kalau satuannya berbeda.";

export const ADEGAN_LUAR_SATUAN_TERAPAN: AdeganStory = {
  id: "luar-satuan-terapan",
  judul: "Satuan Tak Baku: klip dan stik",
  sumber: "Metode luar: Satuan Tak Baku, terapan",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_F1,
      tambah("Tongkat", ...kepala(2), ...TONGKAT_W.bar, TONGKAT_W.garisAwal, ...TONGKAT_W.units),
      tambah("sepuluh", hasil("ga", "klip", 10, 150, 112, 12)),
      tambah("Tongkat@2", ...TONGKAT_H.bar, TONGKAT_H.garisAwal, ...TONGKAT_H.units),
      tambah("lima", hasil("gb", "stik", 5, 150, 172, 12)),
    ),
    k(SUARA_F2, sorotkan("Mana", "gah", "gbh"), tambah("Hati-hati!", emo("tq", 268, 100, "❓", 24))),
    k(SUARA_F3, redamkan(0, "gah", "gbh"), hapus(0, "tq"), tambah("garis", garis("gs", GX + 240, 50, 0, 116, W.hijau, 1.6, { putus: true })), tambah("sama", teks("gst", GX + 240, 142, "sama", 9.4, W.hijau))),
    k(SUARA_F4, tambah("Jadi,", ...kartu("fk", 14, 180, 272, 20, W.emas, ["satuan beda: jangan bandingkan angka"], 9))),
  ],
};

/* ------------------------------ 8. Ringkasan ------------------------------ */
const SUARA_G1 = "Mari kita ingat tiga metode dari luar. Metode pertama, Ulangi Satuan Panjang. Ulangi satu satuan sampai ujung benda.";
const SUARA_G2 = "Metode kedua, Banding Panjang. Sejajarkan benda dari garis awal, lalu lihat ujungnya.";
const SUARA_G3 = "Metode ketiga, Satuan Tak Baku. Pakai satuan apa saja, tetapi harus sama, dan tulis namanya.";
const SUARA_G4 = "Hebat sekali, anak-anak! Sampai jumpa di pelajaran berikutnya.";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Ringkasan metode luar",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_G1, tambah(0, judul("Ringkasan")), tambah("pertama,", ...kartu("r0", 14, 36, 272, 34, WARNA_METODE[0], ["Ulangi Satuan Panjang:", "ulangi satuan sampai ujung"], 9))),
    k(SUARA_G2, tambah("kedua,", ...kartu("r1", 14, 80, 272, 34, WARNA_METODE[1], ["Banding Panjang:", "sejajarkan dari garis awal"], 9))),
    k(SUARA_G3, tambah("ketiga,", ...kartu("r2", 14, 124, 272, 34, WARNA_METODE[2], ["Satuan Tak Baku:", "satuan sama, tulis namanya"], 9))),
    k(SUARA_G4, bersih(0), tambah(0, judul("Sampai jumpa!"), emo("sj", 150, 100, OWL, 50), teks("sk", 150, 186, "tiga metode dari luar", 10, W.ungu)), tambah("anak-anak!", emo("pa", 80, 150, "\u{1F389}", 30), emo("pb", 220, 150, "\u{1F389}", 30))),
  ],
};
