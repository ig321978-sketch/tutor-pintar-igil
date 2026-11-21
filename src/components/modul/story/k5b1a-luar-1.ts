import type { AdeganStory } from "./logika-story";
import { E, G5, W, angka, bulat, emo, judul, kolom, kotak, loket, tabelKosong, tanah, teks, tokoh } from "./k5b1a-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah } from "./k5b1a-bantu";

/*
 * Cerita orisinal IGIL "Tiket Tribun Bu Ningsih" (Kelas 5 Bab 1 Sub-Bab A), video metode global.
 * Naskah suara dari naskah/story-naskah-k5b1a.md. Bagian ini: pembuka (catatan penonton yang menumpuk), Fill the Slots (Isi Kotak Tempat) dan terapannya,
 * Guard the Zero (Jaga Nol) dan terapannya.
 */

export const NAMA_METODE = ["Fill the Slots", "Guard the Zero", "Read by Period"] as const;
export const NAMA_METODE_ID = ["Isi Kotak Tempat", "Jaga Nol", "Baca per Periode"] as const;

export const KP = { merah: "#FCA5A5", biru: "#BAE6FD", kapur: "#FEF9C3", hijau: "#86EFAC" };

/** Kolom ke-j tabel G5 muncul pada kata `kata` (kemunculan ke-n) dalam kalimat `suara`. */
const kolomKata = (id: string, suara: string, kata: string, j: number, n = 1) => tambah(idx(suara, kata, n), ...kolom(id, j, G5));

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Sore itu, di loket Bu Ningsih, catatan penonton menumpuk dan harus ditulis dengan benar.";
const SUARA_O2 = "Ada tiga cara supaya bilangan besar tidak salah tulis dan tidak salah baca.";
const SUARA_O3 = "Tiga cara itu: Fill the Slots, Guard the Zero, dan Read by Period.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Isi Kotak Tempat, Jaga Nol, dan Baca per Periode.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Catatan Bu Ningsih",
  sumber: "Metode global: pembuka",
  latar: "#E0F2FE",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Sore di Loket"), ...tanah("tn", 150)),
      tambah("loket", ...loket("lk", 170, 70, 100, 76), teks("lkt", 220, 79, "LOKET", 8, W.putih, { z: 4 })),
      tambah("Bu", ...tokoh("bn", 60, 184, "Bu Ningsih")),
      tambah("menumpuk", kotak("c1", 100, 134, 46, 8, W.putih, W.coklat, { rx: 1, tebal: 1.2, z: 1 }), kotak("c2", 104, 126, 46, 8, W.krem, W.coklat, { rx: 1, tebal: 1.2, z: 2 }), kotak("c3", 98, 118, 46, 8, W.putih, W.coklat, { rx: 1, tebal: 1.2, z: 3 })),
      tambah("catatan", teks("ct", 122, 108, "catatan penonton", 8, W.coklat)),
      tambah("benar.", emo("bn2", 220, 118, E.catat, 20, { z: 5 })),
    ),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga Cara"), ...tanah("tn", 150), teks("n3", 260, 40, "3 cara", 10, W.merah)),
      tambah("cara", ...[0, 1, 2].flatMap((i) => [kotak(`c${i}-k`, 20 + i * 92, 56, 80, 36, "#FDE68A", W.coklat, { rx: 4 }), teks(`c${i}-t`, 60 + i * 92, 79, "cara", 9, W.coklat)])),
      tambah("tidak", emo("x1", 60, 126, E.salah, 18), emo("x2", 240, 126, E.salah, 18)),
      tambah("baca.", emo("ok", 150, 126, E.benar, 22)),
    ),
    k(
      SUARA_O3,
      tambah("Fill", teks("m0", 120, 118, "1. Fill the Slots", 10, W.hijauTua), emo("i0", 40, 118, E.catat, 16)),
      tambah("Guard", teks("m1", 120, 138, "2. Guard the Zero", 10, W.hijauTua), emo("i1", 40, 138, E.kuat, 16)),
      tambah("Read", teks("m2", 120, 158, "3. Read by Period", 10, W.hijauTua), emo("i2", 40, 158, E.mata, 16)),
    ),
    k(
      SUARA_O4,
      hapus(0, "x1", "x2", "ok"),
      tambah("Nama", kotak("bk", 190, 100, 104, 70, "#14532D", W.putih, { rx: 6, tebal: 1, z: -1 })),
      tambah("Isi", teks("g0", 242, 118, "Isi Kotak Tempat", 8, W.sorot)),
      tambah("Jaga", teks("g1", 242, 138, "Jaga Nol", 9, W.sorot)),
      tambah("Baca", teks("g2", 242, 158, "Baca per Periode", 8, W.sorot)),
    ),
  ],
};

/* ------------------------------ Fill the Slots: konsep ------------------------------ */
const SUARA_I1 = "Cara pertama, Fill the Slots, atau Isi Kotak Tempat.";
const SUARA_I2 = "Kita menggambar kotak untuk satuan, puluhan, ratusan, ribuan, dan puluh ribuan, lalu mengisinya satu angka satu kotak.";
const SUARA_I3 = "Bilangan yang diucapkan kita pecah dulu menjadi bagian ribu, ratus, puluh, dan satuan.";
const SUARA_I4 = "Kotak yang tidak disebut harus diisi nol, supaya tidak ada tempat yang kosong.";

export const ADEGAN_LUAR_ISI: AdeganStory = {
  id: "luar-isi",
  judul: "Fill the Slots: Isi Kotak",
  sumber: "Metode global: Fill the Slots (konsep)",
  latar: "#E0F2FE",
  ketukan: [
    k(
      SUARA_I1,
      tambah(0, judul("Cara 1: Fill the Slots"), kotak("pt", 8, 32, 284, 120, "#1E293B", "#0F172A", { rx: 6, tebal: 1.4, z: -1 })),
      tambah("Fill", teks("nm", 150, 74, "Fill the Slots", 14, KP.merah, { z: 3 })),
      tambah("Isi", teks("ni", 150, 96, "Isi Kotak Tempat", 10, KP.kapur, { z: 3 })),
      tambah("Tempat.", emo("ik", 150, 134, E.catat, 24, { z: 3 })),
    ),
    k(
      SUARA_I2,
      bersih(0),
      tambah(0, judul("Menggambar Kotak"), ...tanah("tn", 150)),
      kolomKata("tb", SUARA_I2, "satuan", 4),
      kolomKata("tb", SUARA_I2, "puluhan", 3),
      kolomKata("tb", SUARA_I2, "ratusan", 2),
      kolomKata("tb", SUARA_I2, "ribuan", 1),
      kolomKata("tb", SUARA_I2, "puluh", 0),
      tambah("mengisinya", teks("sk", 150, 128, "1 angka = 1 kotak", 9, W.merah, { z: 3 })),
    ),
    k(
      SUARA_I3,
      hapus(0, "sk"),
      tambah("diucapkan", emo("mg", 40, 40, E.megafon, 22, { z: 3 })),
      tambah("ribu,", teks("b1", 98, 126, "ribu", 8.4, W.merah, { z: 3 })),
      tambah("ratus,", teks("b2", 150, 126, "ratus", 8.4, W.merah, { z: 3 })),
      tambah("puluh,", teks("b3", 202, 126, "puluh", 8.4, W.merah, { z: 3 })),
      tambah("satuan.", teks("b4", 254, 126, "satuan", 8.4, W.merah, { z: 3 })),
    ),
    k(
      SUARA_I4,
      hapus(0, "mg", "b1", "b2", "b3", "b4"),
      tambah("tidak", teks("td", 150, 128, "tidak disebut: isi 0", 9, W.merah, { z: 3 })),
      tambah("nol,", angka("tb", 3, "0", G5, W.merah), angka("tb", 4, "0", G5, W.merah)),
      sorotkan("nol,", "tb-c3", "tb-c4"),
      tambah("kosong.", emo("ok", 262, 142, E.benar, 20)),
    ),
  ],
};

/* ------------------------------ Fill the Slots: terapan ------------------------------ */
const SUARA_T1 = "Bima mendapat catatan: lima puluh dua ribu tiga ratus tujuh penonton.";
const SUARA_T2 = "Lima masuk puluh ribuan, dua masuk ribuan, tiga masuk ratusan, nol masuk puluhan, tujuh masuk satuan.";
const SUARA_T3 = "Cocok untuk menulis bilangan yang diucapkan, karena tiap bagian punya kotaknya sendiri.";
const SUARA_T4 = "Kurang cocok untuk bilangan yang sudah tertulis panjang, karena menggambar kotaknya memakan waktu.";

export const ADEGAN_LUAR_ISI_TERAPAN: AdeganStory = {
  id: "luar-isi-terapan",
  judul: "Isi Kotak: kapan cocok",
  sumber: "Metode global: Fill the Slots (terapan)",
  latar: "#E0F2FE",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Catatan Bima"), ...tanah("tn", 150), ...tabelKosong("tb", G5)),
      tambah("Bima", ...tokoh("bm", 40, 184, "Bima")),
      tambah("lima", teks("bl", 150, 40, "52.307", 16, W.merah, { z: 3 })),
      tambah("penonton.", emo("ct", 262, 140, E.catat, 20)),
    ),
    k(
      SUARA_T2,
      hapus(0, "ct"),
      tambah(idx(SUARA_T2, "Lima"), angka("tb", 0, "5")),
      tambah(idx(SUARA_T2, "dua"), angka("tb", 1, "2")),
      tambah(idx(SUARA_T2, "tiga"), angka("tb", 2, "3")),
      tambah(idx(SUARA_T2, "nol"), angka("tb", 3, "0")),
      tambah(idx(SUARA_T2, "tujuh"), angka("tb", 4, "7")),
    ),
    k(
      SUARA_T3,
      tambah("Cocok", emo("ok", 262, 138, E.benar, 22, { z: 3 })),
      tambah("diucapkan,", teks("jd", 150, 132, "menulis dari ucapan", 9, W.hijauTua, { z: 3 })),
      sorotkan("kotaknya", "tb-c0", "tb-c1", "tb-c2", "tb-c3", "tb-c4"),
    ),
    k(
      SUARA_T4,
      hapus(0, "ok", "jd"),
      tambah("Kurang", emo("xs", 262, 138, E.salah, 22, { z: 3 })),
      tambah("tertulis", teks("tp", 150, 132, "sudah tertulis panjang", 9, W.merah, { z: 3 })),
      tambah("waktu.", emo("wk", 200, 160, E.pikir, 20, { z: 3 })),
    ),
  ],
};

/* ------------------------------ Guard the Zero: konsep ------------------------------ */
const SUARA_N1 = "Cara kedua, Guard the Zero, atau Jaga Nol.";
const SUARA_N2 = "Nol bukan angka kosong; ia menjaga supaya angka lain tetap berada di kolom yang benar.";
const SUARA_N3 = "Setiap kali ada kolom yang tidak disebut, kita menaruh nol di sana, lalu menghitung banyak angkanya.";
const SUARA_N4 = "Banyak angka harus sama dengan banyak kolom, sehingga tidak ada nol yang hilang.";

export const ADEGAN_LUAR_NOL: AdeganStory = {
  id: "luar-nol",
  judul: "Guard the Zero: Jaga Nol",
  sumber: "Metode global: Guard the Zero (konsep)",
  latar: "#E0F2FE",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Cara 2: Guard the Zero"), kotak("pt", 8, 32, 284, 120, "#1E293B", "#0F172A", { rx: 6, tebal: 1.4, z: -1 })),
      tambah("Guard", teks("nm", 150, 74, "Guard the Zero", 14, KP.merah, { z: 3 })),
      tambah("Jaga", teks("ni", 150, 96, "Jaga Nol", 10, KP.kapur, { z: 3 })),
      tambah("Nol.", bulat("zb", 150, 128, 14, "#FDE68A", "#F59E0B", { tebal: 2, z: 3 }), teks("z0", 150, 135, "0", 20, W.merah, { z: 4 })),
    ),
    k(
      SUARA_N2,
      bersih(0),
      tambah(0, judul("Nol Penjaga"), ...tanah("tn", 150), ...tabelKosong("tb", G5)),
      tambah("Nol", teks("z1", 254, 124, "0 bukan kosong", 8.4, W.merah, { z: 3 })),
      tambah("angka@2", angka("tb", 2, "5", G5, W.biru)),
      tambah("menjaga", angka("tb", 3, "0", G5, W.merah), angka("tb", 4, "0", G5, W.merah)),
      sorotkan("menjaga", "tb-c3", "tb-c4"),
      tambah("benar.", teks("pj", 150, 142, "nol menjaga angka lain", 9, W.hijauTua, { z: 3 })),
    ),
    k(
      SUARA_N3,
      hapus(0, "z1", "pj", "tb-t2", "tb-t3", "tb-t4"),
      tambah("tidak", teks("td", 150, 128, "tidak disebut: isi 0", 9, W.merah, { z: 3 })),
      tambah(idx(SUARA_N3, "nol"), angka("tb", 1, "0", G5, W.merah), angka("tb", 3, "0", G5, W.merah), angka("tb", 4, "0", G5, W.merah)),
      tambah("angkanya.", angka("tb", 0, "4", G5), angka("tb", 2, "5", G5)),
    ),
    k(
      SUARA_N4,
      hapus(0, "td"),
      tambah("Banyak", teks("sm", 150, 130, "5 angka = 5 kolom", 10, W.hijauTua, { z: 3 })),
      tambah("hilang.", emo("ok", 262, 142, E.benar, 22, { z: 3 })),
    ),
  ],
};

/* ------------------------------ Guard the Zero: terapan ------------------------------ */
const SUARA_Z1 = "Citra menulis empat puluh ribu lima ratus, dan ia memeriksa kolom ribuan, puluhan, serta satuan yang tidak disebut.";
const SUARA_Z2 = "Jadi tulisannya empat, nol, lima, nol, nol, yaitu lima angka dengan tiga nol penjaga.";
const SUARA_Z3 = "Cocok untuk bilangan yang banyak nolnya, karena mudah memeriksa tempat yang tidak disebut.";
const SUARA_Z4 = "Kurang cocok kalau bilangannya tanpa nol, karena pemeriksaan itu terasa berlebihan.";

export const ADEGAN_LUAR_NOL_TERAPAN: AdeganStory = {
  id: "luar-nol-terapan",
  judul: "Jaga Nol: kapan cocok",
  sumber: "Metode global: Guard the Zero (terapan)",
  latar: "#E0F2FE",
  ketukan: [
    k(
      SUARA_Z1,
      tambah(0, judul("Catatan Citra"), ...tanah("tn", 150), ...tabelKosong("tb", G5)),
      tambah("Citra", ...tokoh("ct", 40, 184, "Citra")),
      tambah("menulis", teks("bl", 150, 40, "40.500", 16, W.merah, { z: 3 })),
      tambah(idx(SUARA_Z1, "empat"), angka("tb", 0, "4")),
      tambah(idx(SUARA_Z1, "lima"), angka("tb", 2, "5")),
      sorotkan(idx(SUARA_Z1, "ribuan"), "tb-c1"),
      sorotkan(idx(SUARA_Z1, "puluhan"), "tb-c3"),
      sorotkan(idx(SUARA_Z1, "satuan"), "tb-c4"),
    ),
    k(
      SUARA_Z2,
      tambah(idx(SUARA_Z2, "nol", 1), angka("tb", 1, "0", G5, W.merah)),
      tambah(idx(SUARA_Z2, "nol", 2), angka("tb", 3, "0", G5, W.merah)),
      tambah(idx(SUARA_Z2, "nol", 3), angka("tb", 4, "0", G5, W.merah)),
      tambah("angka", teks("a5", 90, 128, "5 angka", 9, W.hijauTua, { z: 3 })),
      tambah("tiga", teks("n3", 212, 128, "3 nol penjaga", 9, W.merah, { z: 3 })),
    ),
    k(
      SUARA_Z3,
      tambah("Cocok", emo("ok", 262, 142, E.benar, 22, { z: 3 })),
      tambah("nolnya,", teks("bn", 150, 146, "banyak nol", 9, W.hijauTua, { z: 3 })),
      tambah("memeriksa", emo("mt", 224, 160, E.mata, 20, { z: 3 })),
    ),
    k(
      SUARA_Z4,
      hapus(0, "ok", "bn", "mt", "n3", "a5"),
      ubah(0, { id: "bl", isi: "12.345" }, { id: "tb-t0", isi: "1", warna: W.biru }, { id: "tb-t1", isi: "2", warna: W.biru }, { id: "tb-t2", isi: "3", warna: W.biru }, { id: "tb-t3", isi: "4", warna: W.biru }, { id: "tb-t4", isi: "5", warna: W.biru }),
      tambah("Kurang", emo("xs", 262, 142, E.salah, 22, { z: 3 })),
      tambah("tanpa", teks("tn0", 150, 146, "tanpa nol", 9, W.merah, { z: 3 })),
      tambah("berlebihan.", emo("pk", 224, 160, E.pikir, 20, { z: 3 })),
    ),
  ],
};
