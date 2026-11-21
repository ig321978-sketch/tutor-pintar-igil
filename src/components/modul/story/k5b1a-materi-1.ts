import type { AdeganStory } from "./logika-story";
import { E, G5, W, angka, emo, idTribun, judul, loket, panah, papanAngka, tabelKosong, tanah, teks, titik, tokoh, tribun } from "./k5b1a-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah } from "./k5b1a-bantu";

/*
 * Cerita orisinal IGIL "Tiket Tribun Bu Ningsih" (Kelas 5 Bab 1 Sub-Bab A, membaca dan menulis bilangan cacah sampai 100.000), awal cerita Hari Pertandingan di Stadion Kota.
 * Naskah suara dari naskah/story-naskah-k5b1a.md. Bagian ini: tiba di stadion, tabel tempat lima kolom, dan menulis serta membaca banyak penonton Tribun Utara (24.350).
 */

/* ------------------------------ 1. Stadion ------------------------------ */
const SUARA_S1 = "Pak Arif mengajak Bima, Citra, dan Fajar ke Stadion Kota pada hari pertandingan besar.";
const SUARA_S2 = "Di loket, Bu Ningsih menyobek tiket sambil mencatat banyak penonton di setiap tribun.";
const SUARA_S3 = "Papan besar stadion butuh angka yang benar, jadi Bu Ningsih meminta bantuan ketiganya.";

export const ADEGAN_STADION: AdeganStory = {
  id: "stadion",
  judul: "Tiba di Stadion Kota",
  sumber: "Materi: tiba di stadion",
  latar: "#E0F2FE",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Stadion Kota"), ...tanah("tn", 150)),
      tambah("Arif", ...tokoh("pa", 34, 184, "Pak Arif")),
      tambah("Bima,", ...tokoh("bm", 90, 184, "Bima")),
      tambah("Citra,", ...tokoh("ct", 146, 184, "Citra")),
      tambah("Fajar", ...tokoh("fj", 202, 184, "Fajar")),
      tambah("Stadion", ...tribun("tr", 60, 40, 180)),
      tambah("pertandingan", emo("bl", 150, 110, E.bola, 24, { z: 3 })),
    ),
    k(
      SUARA_S2,
      bersih(0),
      tambah(0, judul("Loket Tiket"), ...tanah("tn", 150), ...tokoh("bn", 70, 184, "Bu Ningsih")),
      tambah("loket,", ...loket("lk", 150, 76, 100, 70), teks("lkt", 200, 85, "LOKET", 8, W.putih, { z: 4 })),
      tambah("tiket", emo("tk", 200, 118, E.tiket, 20, { z: 3 })),
      tambah("mencatat", emo("ct", 264, 64, E.catat, 20)),
      tambah("tribun.", ...tribun("tr", 40, 40, 90), teks("trn", 85, 96, "tribun", 8.4, W.coklat)),
    ),
    k(
      SUARA_S3,
      bersih(0),
      tambah(0, judul("Papan Angka Stadion"), ...tanah("tn", 150)),
      tambah("Papan", ...papanAngka("pp", 60, 30, 180, 70)),
      tambah("angka", teks("tq", 150, 82, "?", 32, W.sorot, { z: 3 })),
      tambah("Ningsih", ...tokoh("bn", 34, 184, "Bu Ningsih")),
      tambah("ketiganya.", ...tokoh("bm", 100, 184, "Bima"), ...tokoh("ct", 156, 184, "Citra"), ...tokoh("fj", 212, 184, "Fajar")),
      tambah("meminta", emo("jp", 264, 124, E.jempol, 20)),
    ),
  ],
};

/* ------------------------------ 2. Tabel tempat lima kolom ------------------------------ */
const SUARA_T1 = "Bima menggambar tabel dengan lima kolom: satuan, puluhan, ratusan, ribuan, dan puluh ribuan.";
const SUARA_T2 = "Tiap angka duduk di satu kolom, dan kolomnya menentukan besarnya.";
const SUARA_T3 = "Kolom puluh ribuan ada paling kiri, sedangkan kolom satuan ada paling kanan.";

const kol = (suara: string, kata: string, j: number, n = 1) => tambah(idx(suara, kata, n), ...tabelKosong("tb", G5).filter((o) => o.id.endsWith(`-h${j}`) || o.id.endsWith(`-ht${j}`) || o.id.endsWith(`-c${j}`)));

export const ADEGAN_TEMPAT: AdeganStory = {
  id: "tempat",
  judul: "Tabel lima kolom",
  sumber: "Materi: tabel tempat",
  latar: "#E0F2FE",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Tabel Tempat"), ...tanah("tn", 150)),
      tambah("Bima", ...tokoh("bm", 40, 184, "Bima")),
      tambah("lima", teks("n5", 150, 40, "5 kolom", 10, W.merah)),
      kol(SUARA_T1, "satuan", 4),
      kol(SUARA_T1, "puluhan", 3),
      kol(SUARA_T1, "ratusan", 2),
      kol(SUARA_T1, "ribuan", 1),
      kol(SUARA_T1, "puluh", 0),
    ),
    k(
      SUARA_T2,
      tambah("angka", angka("tb", 3, "7", G5, W.merah)),
      sorotkan("satu", "tb-c3"),
      tambah("satu", teks("s1", 150, 124, "1 angka = 1 kolom", 9, W.merah, { z: 3 })),
      tambah("menentukan", emo("lp", 270, 132, E.lampu, 20)),
      tambah("besarnya.", teks("bs", 150, 140, "kolom menentukan besar", 8.4, W.coklat, { z: 3 })),
    ),
    k(
      SUARA_T3,
      hapus(0, "tb-t3", "s1", "bs", "lp"),
      tambah("kiri,", teks("kr", 46, 126, "paling kiri", 8.4, W.merah, { z: 3 }), panah("pk", 46, 120, 0, -12, W.merah, 1.8)),
      sorotkan("kiri,", "tb-c0"),
      tambah("kanan.", teks("kn", 254, 126, "paling kanan", 8.4, W.merah, { z: 3 }), panah("pn", 254, 120, 0, -12, W.merah, 1.8)),
      sorotkan("kanan.", "tb-c4"),
    ),
  ],
};

/* ------------------------------ 3. Menulis dan membaca 24.350 ------------------------------ */
const SUARA_U1 = "Tribun Utara dihuni dua puluh empat ribu tiga ratus lima puluh penonton.";
const SUARA_U2 = "Bima mengisi tabel dari kiri: dua di puluh ribuan, empat di ribuan, tiga di ratusan.";
const SUARA_U3 = "Lima masuk puluhan dan nol masuk satuan, sehingga tulisannya memakai titik setelah ribuan.";

export const ADEGAN_TULIS_BACA: AdeganStory = {
  id: "tulis-baca",
  judul: "Menulis dan membaca",
  sumber: "Materi: menulis dan membaca",
  latar: "#E0F2FE",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Tribun Utara"), ...tanah("tn", 150), ...tabelKosong("tb", G5)),
      tambah("Tribun", ...tribun("tr", 100, 114, 100)),
      tambah("dua", teks("bl", 150, 40, "24.350", 16, W.merah, { z: 3 })),
      tambah("penonton.", emo("bo", 262, 140, E.bola, 20)),
    ),
    k(
      SUARA_U2,
      hapus(0, ...idTribun("tr"), "bo"),
      tambah("Bima", ...tokoh("bm", 40, 184, "Bima")),
      tambah(idx(SUARA_U2, "dua"), angka("tb", 0, "2")),
      tambah(idx(SUARA_U2, "empat"), angka("tb", 1, "4")),
      tambah(idx(SUARA_U2, "tiga"), angka("tb", 2, "3")),
    ),
    k(
      SUARA_U3,
      tambah(idx(SUARA_U3, "Lima"), angka("tb", 3, "5")),
      tambah(idx(SUARA_U3, "nol"), angka("tb", 4, "0")),
      tambah("titik", titik("tk", 2, G5), teks("tkn", 124, 128, "titik", 8.4, W.merah, { z: 3 })),
      sorotkan("ribuan.", "tb-c1"),
    ),
  ],
};
