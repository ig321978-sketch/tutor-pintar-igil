import type { Aksi, AdeganStory } from "./logika-story";
import { OWL, W, emo, judul, kartu, kartuAngka, papan, pilihan, teks, uraian } from "./k3b1B-gambar";
import { hapus, idx, k, redamkan, sorotkan, tambah, ubah } from "./k3b1B-bantu";
import { NAMA_METODE_ID, kepala } from "./k3b1B-luar-1";

/* ------------------------------ 4. Kartu Angka Montessori: konsep ------------------------------ */
const KM = papan("km", "219", { y0: 112, h: 46, u: 30 });
const WARNA_KARTU = [W.hijauMuda, W.langit, W.merahMuda, W.krem, W.pink, W.lavender, W.hijauMuda, W.langit, W.merahMuda, W.krem];
const kd = (i: number) => kartuAngka(`kd${i}`, 10 + i * 28, 54, String(i), WARNA_KARTU[i], 24, 26, 14);
/** Pindahkan kartu `i` ke dalam kotak tempat `c`. */
const masuk = (at: string | number, i: number, c: number): Aksi => ({
  at,
  ubah: [
    { id: `kd${i}-k`, x: KM.xPusat(c) - 12, y: 122 },
    { id: `kd${i}-t`, x: KM.xPusat(c), y: 122 + 13 + 14 * 0.35 },
  ],
});
const SEMUA_KD = Array.from({ length: 10 }, (_, i) => [`kd${i}-k`, `kd${i}-t`]).flat();
const SUARA_M1 = "Metode kedua bernama Kartu Angka Montessori. Kita memakai kartu angka dan tiga kotak.";
const SUARA_M2 = "Ada sepuluh kartu angka, dari nol sampai sembilan. Tiap kotak boleh diisi satu kartu.";
const SUARA_M3 = "Malosi mengambil satu kartu untuk tiap kotak. Untuk ratusan terambil kartu dua.";
const SUARA_M4 = "Untuk puluhan terambil kartu satu. Untuk satuan terambil kartu sembilan.";
const SUARA_M5 = "Kartu dua di ratusan bernilai dua ratus. Kartu satu di puluhan bernilai sepuluh. Kartu sembilan di satuan bernilai sembilan.";
const SUARA_M6 = "Bilangan yang terbentuk adalah dua ratus sembilan belas.";

export const ADEGAN_LUAR_KARTU: AdeganStory = {
  id: "luar-kartu",
  judul: "Kartu Angka Montessori: kartu dan tiga kotak",
  sumber: "Metode luar: Kartu Angka Montessori",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_M1, tambah("kedua", ...kepala(1)), tambah("tiga", ...KM.dasar)),
    k(SUARA_M2, tambah("sepuluh", ...Array.from({ length: 10 }, (_, i) => kd(i)).flat(), teks("bk", 150, 98, "10 kartu: 0 sampai 9", 9.4, W.coklat))),
    k(SUARA_M3, sorotkan("ratusan", "kd2-k"), masuk(idx(SUARA_M3, "terambil"), 2, 0)),
    k(SUARA_M4, redamkan(0, "kd2-k"), sorotkan(idx(SUARA_M4, "satu"), "kd1-k"), masuk(idx(SUARA_M4, "terambil", 1), 1, 1), masuk(idx(SUARA_M4, "terambil", 2), 9, 2)),
    k(
      SUARA_M5,
      hapus(0, ...SEMUA_KD, "bk"),
      tambah(0, KM.digit(0), KM.digit(1), KM.digit(2)),
      tambah(idx(SUARA_M5, "ratus"), KM.nilai(0)),
      tambah(idx(SUARA_M5, "sepuluh"), KM.nilai(1)),
      tambah(idx(SUARA_M5, "sembilan", 2), KM.nilai(2)),
    ),
    k(SUARA_M6, tambah("terbentuk", KM.utuh(196, 20))),
  ],
};

/* ------------------------------ 5. Kartu Angka Montessori: terapan ------------------------------ */
const KT = papan("kt", "407", { y0: 72, h: 44, u: 28 });
const KARTU_T = [
  { id: "ka0", isi: "4", warna: W.hijauMuda },
  { id: "ka1", isi: "0", warna: W.langit },
  { id: "ka2", isi: "7", warna: W.merahMuda },
];
const ka = (i: number) => kartuAngka(KARTU_T[i].id, KT.xPusat(i) - 24, 77, KARTU_T[i].isi, KARTU_T[i].warna, 48, 34, 20);
const SUARA_P1 = "Terapkan Kartu Angka Montessori. Kita ambil kartu empat dari ratusan, kartu nol dari puluhan, dan kartu tujuh dari satuan.";
const SUARA_P2 = "Bilangan apa yang terbentuk? Ketuk jawabannya. Empat ratus tujuh, empat ratus tujuh puluh, atau empat puluh tujuh?";
const SUARA_P3 = "Betul! Kartu nol tetap dipasang di puluhan, jadi bilangannya empat ratus tujuh.";

export const ADEGAN_LUAR_KARTU_TERAPAN: AdeganStory = {
  id: "luar-kartu-terapan",
  judul: "Kartu Angka Montessori: kartu empat, nol, tujuh",
  sumber: "Metode luar: Kartu Angka Montessori, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_P1,
      tambah("Terapkan", ...kepala(1)),
      tambah("Kita", ...KT.dasar),
      tambah(idx(SUARA_P1, "empat"), ...ka(0)),
      tambah(idx(SUARA_P1, "nol"), ...ka(1)),
      tambah(idx(SUARA_P1, "tujuh"), ...ka(2)),
    ),
    k(SUARA_P2, tambah("Bilangan", ...pilihan(136, ["407", "470", "47"]))),
    k(
      SUARA_P3,
      sorotkan("Betul!", "c1-k"),
      hapus("Kartu", "ka0-k", "ka0-t", "ka1-k", "ka1-t", "ka2-k", "ka2-t"),
      tambah("Kartu", KT.digit(0), KT.digit(1), KT.digit(2)),
      tambah("bilangannya", KT.utuh(128, 16)),
    ),
  ],
};

/* ------------------------------ 6. Bentuk Uraian: konsep ------------------------------ */
const UR = papan("ur", "345", { y0: 72, h: 40, u: 26, nilaiY: 128 });
const SUARA_R1 = "Metode ketiga bernama Bentuk Uraian. Bilangan dituliskan sebagai jumlah nilai tiap tempatnya.";
const SUARA_R2 = "Lihat bilangan tiga ratus empat puluh lima.";
const SUARA_R3 = "Tiga di ratusan bernilai tiga ratus. Empat di puluhan bernilai empat puluh. Lima di satuan bernilai lima.";
const SUARA_R4 = "Sekarang kita tambahkan. Tiga ratus tambah empat puluh tambah lima sama dengan tiga ratus empat puluh lima.";
const SUARA_R5 = "Itulah bentuk uraian. Bilangan sama dengan jumlah nilai dari tiap tempat.";

export const ADEGAN_LUAR_URAIAN: AdeganStory = {
  id: "luar-uraian",
  judul: "Bentuk Uraian: jumlah nilai tiap tempat",
  sumber: "Metode luar: Bentuk Uraian",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_R1, tambah("ketiga", ...kepala(2)), tambah("Bilangan", ...UR.dasar)),
    k(SUARA_R2, tambah("tiga", UR.digit(0)), tambah("empat", UR.digit(1)), tambah("lima.", UR.digit(2))),
    k(
      SUARA_R3,
      sorotkan(idx(SUARA_R3, "Tiga"), "ur_d0"),
      tambah(idx(SUARA_R3, "ratus"), UR.nilai(0)),
      redamkan(idx(SUARA_R3, "Empat"), "ur_d0"),
      sorotkan(idx(SUARA_R3, "Empat"), "ur_d1"),
      tambah(idx(SUARA_R3, "puluh"), UR.nilai(1)),
      redamkan(idx(SUARA_R3, "Lima"), "ur_d1"),
      sorotkan(idx(SUARA_R3, "Lima"), "ur_d2"),
      tambah(idx(SUARA_R3, "lima", 2), UR.nilai(2)),
    ),
    k(SUARA_R4, redamkan(0, "ur_d2"), tambah(idx(SUARA_R4, "tambah"), uraian("ur", 160, "300 + 40 + 5 = 345", 15))),
    k(SUARA_R5, tambah("Itulah", ...kartu("bu", 50, 172, 200, 24, W.emas, ["bentuk uraian"], 11))),
  ],
};

/* ------------------------------ 7. Bentuk Uraian: terapan ------------------------------ */
const UT = papan("ut", "528", { y0: 70, h: 40, u: 26, nilaiY: 124 });
const SUARA_W1 = "Terapkan Bentuk Uraian pada bilangan lima ratus dua puluh delapan.";
const SUARA_W2 = "Nilai lima ratus dan dua puluh sudah ada. Berapa nilai yang kurang? Ketuk jawabannya. Delapan, delapan puluh, atau delapan ratus?";
const SUARA_W3 = "Betul! Angka delapan ada di satuan, jadi nilainya delapan.";
const SUARA_W4 = "Jadi lima ratus tambah dua puluh tambah delapan sama dengan lima ratus dua puluh delapan.";

export const ADEGAN_LUAR_URAIAN_TERAPAN: AdeganStory = {
  id: "luar-uraian-terapan",
  judul: "Bentuk Uraian: bilangan lima ratus dua puluh delapan",
  sumber: "Metode luar: Bentuk Uraian, terapan",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_W1,
      tambah("Terapkan", ...kepala(2)),
      tambah("pada", ...UT.dasar),
      tambah("lima", UT.digit(0), UT.nilai(0)),
      tambah("dua", UT.digit(1), UT.nilai(1)),
      tambah("delapan.", UT.digit(2), uraian("ut", 144, "500 + 20 + ?", 13)),
    ),
    k(SUARA_W2, tambah("Berapa", ...pilihan(154, ["8", "80", "800"]))),
    k(SUARA_W3, sorotkan("Betul!", "c1-k"), tambah("nilainya", UT.nilai(2)), ubah("nilainya", { id: "ut_u", isi: "500 + 20 + 8 = 528" })),
    k(SUARA_W4, redamkan(0, "c1-k"), tambah("Jadi", emo("ok", 262, 62, "✅", 22))),
  ],
};

/* ------------------------------ 8. Ringkasan ------------------------------ */
const SUARA_Y1 = "Mari kita ingat tiga metode dari luar tadi.";
const SUARA_Y2 = "Nilai Tempat. Nilai sebuah angka bergantung pada tempatnya.";
const SUARA_Y3 = "Kartu Angka Montessori. Ambil satu kartu untuk tiap kotak, lalu susun bilangannya.";
const SUARA_Y4 = "Bentuk Uraian. Bilangan sama dengan jumlah nilai tiap tempat. Sampai jumpa!";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Metode luar: ringkasan",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Y1, tambah(0, judul("Ringkasan"), emo("ow", 150, 110, OWL, 50))),
    k(SUARA_Y2, hapus(0, "ow"), tambah("Nilai", ...kartu("r0", 14, 40, 272, 44, W.hijauMuda, [`1. ${NAMA_METODE_ID[0]}`, "nilai bergantung tempat"], 10))),
    k(SUARA_Y3, tambah("Kartu", ...kartu("r1", 14, 94, 272, 44, W.langit, [`2. ${NAMA_METODE_ID[1]}`, "satu kartu tiap kotak"], 10))),
    k(SUARA_Y4, tambah("Bentuk", ...kartu("r2", 14, 148, 272, 44, W.pink, [`3. ${NAMA_METODE_ID[2]}`, "jumlah nilai tiap tempat"], 10))),
  ],
};
