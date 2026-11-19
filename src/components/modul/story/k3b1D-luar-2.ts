import type { AdeganStory, Obj } from "./logika-story";
import { W, bulat, busur, emo, garis, judul, kartu, panah, teks, tokoh } from "./k3b1D-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k3b1D-bantu";
import { ketukanCocok } from "./k3b1D-luar-1";

/*
 * Cerita orisinal IGIL "Pesanan Bu Tuti" (Kelas 3 Bab 1 Sub-Bab D), video metode global, bagian akhir.
 * Naskah suara dari naskah/story-naskah-k3b1d.md. Bagian ini: Number Bond (Pasangan Bilangan), Counting On (Menghitung Maju), terapannya, dan ringkasan.
 */

/** Diagram pasangan bilangan: lingkaran atas `${p}-a` dengan dua lingkaran bawah `${p}-b1` dan `${p}-b2`, dan dua garis. Pusat lingkaran atas (x, y). Tanpa teks. */
const bentukBond = (p: string, x: number, y: number): Obj[] => [
  garis(`${p}-l1`, x, y + 14, -40, 36, W.biru, 1.6, { z: 1 }),
  garis(`${p}-l2`, x, y + 14, 40, 36, W.biru, 1.6, { z: 1 }),
  bulat(`${p}-a`, x, y, 16, W.krem, W.biru, { z: 2 }),
  bulat(`${p}-b1`, x - 40, y + 54, 14, W.pink, W.biru, { z: 2 }),
  bulat(`${p}-b2`, x + 40, y + 54, 14, W.langit, W.biru, { z: 2 }),
];
/** Angka di dalam lingkaran diagram: `a` (atas), `b1`, `b2`. */
const angkaBond = (p: string, x: number, y: number, bagian: "a" | "b1" | "b2", isi: string): Obj =>
  teks(`${p}-${bagian}t`, bagian === "a" ? x : bagian === "b1" ? x - 40 : x + 40, (bagian === "a" ? y : y + 54) + 4, isi, 12, W.biru, { z: 3 });

/* ------------------------------ Number Bond: konsep ------------------------------ */
const SUARA_P1 = "Cara kedua, Number Bond, atau Pasangan Bilangan.";
const SUARA_P2 = "Sebuah bilangan dipecah menjadi dua bagian supaya mudah digenapkan ke puluhan.";
const SUARA_P3 = "Misalnya delapan dipecah jadi dua dan enam supaya tiga puluh delapan ditambah dua menjadi empat puluh.";
const SUARA_P4 = "Sisanya ditambahkan setelah itu.";

export const ADEGAN_LUAR_PASANGAN: AdeganStory = {
  id: "luar-pasangan",
  judul: "Number Bond: Pasangan Bilangan",
  sumber: "Metode global: Number Bond",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Pasangan Bilangan"), teks("nm", 150, 44, "Number Bond", 11, W.ungu)),
      tambah("Number", bulat("pb-a", 150, 80, 16, W.krem, W.biru, { z: 2 })),
      tambah("atau", garis("pb-l1", 150, 94, -40, 36, W.biru, 1.6, { z: 1 }), garis("pb-l2", 150, 94, 40, 36, W.biru, 1.6, { z: 1 })),
      tambah("Bilangan.", bulat("pb-b1", 110, 134, 14, W.pink, W.biru, { z: 2 }), bulat("pb-b2", 190, 134, 14, W.langit, W.biru, { z: 2 })),
    ),
    k(
      SUARA_P2,
      sorotkan("bilangan", "pb-a"),
      tambah("dipecah", emo("gt", 150, 168, "\u{2702}", 18)),
      tambah("dua", teks("n2", 150, 182, "2 bagian", 9, W.ungu)),
      tambah("digenapkan", teks("pk", 252, 82, "puluhan", 9, W.hijauTua)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Pecah Delapan"), ...bentukBond("pb", 90, 70)),
      tambah("delapan", angkaBond("pb", 90, 70, "a", "8")),
      tambah("dua", angkaBond("pb", 90, 70, "b1", "2")),
      tambah("enam", angkaBond("pb", 90, 70, "b2", "6")),
      tambah("tiga", teks("eq", 215, 100, "38 + 2", 13, W.biru)),
      ubah("menjadi", { id: "eq", isi: "38 + 2 = 40" }),
    ),
    k(
      SUARA_P4,
      tambah(0, teks("sa", 215, 130, "sisa", 9, W.ungu)),
      tambah("setelah", teks("e2", 215, 160, "40 + 6", 13, W.biru)),
      ubah("itu.", { id: "e2", isi: "40 + 6 = 46" }),
    ),
  ],
};

/* ------------------------------ Number Bond: terapan ------------------------------ */
const SUARA_Q1 = "Salsa menghitung tiga puluh delapan ditambah dua puluh tujuh. Ia memecah dua puluh tujuh menjadi dua dan dua puluh lima.";
const SUARA_Q2 = "Tiga puluh delapan ditambah dua jadi empat puluh, lalu ditambah dua puluh lima menjadi enam puluh lima.";
const SUARA_Q3 = "Cocok kalau salah satu bilangan hampir menggenapi puluhan.";
const SUARA_Q4 = "Kurang cocok kalau kedua bilangan jauh dari puluhan, karena pecahannya malah banyak.";

export const ADEGAN_LUAR_PASANGAN_TERAPAN: AdeganStory = {
  id: "luar-pasangan-terapan",
  judul: "Pasangan Bilangan dalam pemakaian",
  sumber: "Metode global: Number Bond, terapan",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, judul("Salsa Memecah"), ...tokoh("sl", 44, 184, "Salsa")),
      tambah("tiga", teks("q", 190, 44, "38 + 27", 13, W.biru)),
      tambah("memecah", ...bentukBond("pb", 190, 70), angkaBond("pb", 190, 70, "a", "27")),
      tambah("menjadi", angkaBond("pb", 190, 70, "b1", "2")),
      tambah("lima.", angkaBond("pb", 190, 70, "b2", "25")),
    ),
    k(
      SUARA_Q2,
      tambah("Tiga", teks("e1", 150, 160, "38 + 2", 11, W.biru)),
      ubah("empat", { id: "e1", isi: "38 + 2 = 40" }),
      tambah("lalu", teks("e2", 150, 178, "40 + 25", 11, W.biru)),
      ubah("menjadi", { id: "e2", isi: "40 + 25 = 65" }),
    ),
    ketukanCocok(SUARA_Q3, true, "Cocok", ["1 bilangan hampir puluhan", "contoh: 38 hampir 40"], "tinggal tambah sisanya", "hampir"),
    ketukanCocok(SUARA_Q4, false, "Kurang cocok", ["2 bilangan jauh dari puluhan", "pecahan jadi banyak"], "lebih rumit dari bersusun", "karena"),
  ],
};

/* ------------------------------ Counting On: konsep ------------------------------ */
const SUARA_M1 = "Cara ketiga, Counting On, atau Menghitung Maju.";
const SUARA_M2 = "Mulai dari bilangan yang lebih besar, lalu hitung maju sebanyak bilangan yang lebih kecil.";
const SUARA_M3 = "Maju bisa dilakukan per sepuluh dulu, baru per satu.";
const SUARA_M4 = "Kita berhenti di bilangan terakhir, itulah jumlahnya.";

export const ADEGAN_LUAR_MAJU: AdeganStory = {
  id: "luar-maju",
  judul: "Counting On: Menghitung Maju",
  sumber: "Metode global: Counting On",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Menghitung Maju"), teks("nm", 150, 44, "Counting On", 11, W.ungu)),
      tambah("Counting", garis("gb", 30, 120, 240, 0, W.biru, 2.4, { z: 1 }), bulat("d0", 40, 120, 4, W.merah, W.biru, { z: 2 })),
      tambah("atau", busur("h1", 40, 100, 116, 22), busur("h2", 100, 160, 116, 22)),
      tambah("Maju.", bulat("d1", 100, 120, 3, W.merah, W.biru, { z: 2 }), bulat("d2", 160, 120, 4, W.hijau, W.biru, { z: 2 })),
    ),
    k(
      SUARA_M2,
      bersih(0),
      tambah(0, judul("Mulai dari Besar"), ...kartu("kb", 20, 70, 100, 50, W.hijauMuda, ["lebih besar", "mulai di sini"], 10)),
      tambah("maju", panah("pn", 126, 95, 48, 0, W.merah, 2.4, { z: 2 })),
      tambah("kecil.", ...kartu("kc", 180, 70, 100, 50, W.pink, ["lebih kecil", "banyak lompat"], 10)),
    ),
    k(
      SUARA_M3,
      bersih(0),
      tambah(0, judul("Sepuluh dan Satu"), garis("gb", 30, 130, 240, 0, W.biru, 2.4, { z: 1 }), bulat("d0", 40, 130, 4, W.merah, W.biru, { z: 2 })),
      tambah("sepuluh", busur("b1", 40, 80, 126, 30), teks("p1", 60, 92, "+10", 10, W.merah), busur("b2", 80, 120, 126, 30), teks("p2", 100, 92, "+10", 10, W.merah)),
      tambah("satu.", busur("s1", 120, 132, 126, 10), teks("q1", 126, 108, "+1", 7, W.hijauTua), busur("s2", 132, 144, 126, 10), teks("q2", 138, 118, "+1", 7, W.hijauTua), busur("s3", 144, 156, 126, 10), teks("q3", 150, 108, "+1", 7, W.hijauTua), bulat("de", 156, 130, 4, W.hijau, W.biru, { z: 2 })),
    ),
    k(
      SUARA_M4,
      sorotkan("berhenti", "de"),
      tambah("terakhir,", emo("fl", 156, 100, "\u{1F6A9}", 20)),
      tambah("jumlahnya.", teks("jm", 156, 156, "jumlah", 10, W.hijauTua)),
    ),
  ],
};

/* ------------------------------ Counting On: terapan ------------------------------ */
const SUARA_N1 = "Bima menghitung lima puluh empat ditambah dua puluh tiga. Mulai dari lima puluh empat maju dua puluh jadi tujuh puluh empat.";
const SUARA_N2 = "Lalu maju tiga lagi: tujuh puluh lima, tujuh puluh enam, tujuh puluh tujuh.";
const SUARA_N3 = "Cocok kalau salah satu bilangan kecil dan mudah dihitung maju.";
const SUARA_N4 = "Kurang cocok kalau kedua bilangan besar, karena lompatan terlalu banyak.";

/** Titik pada garis bilangan 50 sampai 80: x = 30 + 8 (v - 50). */
const hx = (v: number): number => 30 + 8 * (v - 50);

export const ADEGAN_LUAR_MAJU_TERAPAN: AdeganStory = {
  id: "luar-maju-terapan",
  judul: "Menghitung Maju dalam pemakaian",
  sumber: "Metode global: Counting On, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Bima Menghitung"), ...tokoh("bm", 44, 184, "Bima"), garis("gb", 30, 110, 240, 0, W.biru, 2.4, { z: 1 })),
      tambah("lima", bulat("d54", hx(54), 110, 4, W.merah, W.biru, { z: 2 }), teks("v54", hx(54), 94, "54", 10, W.merah)),
      tambah("dua", teks("q", 150, 44, "54 + 23", 13, W.biru)),
      tambah("maju", busur("h20", hx(54), hx(74), 106, 34), teks("p20", 142, 62, "+20", 10, W.hijauTua)),
      tambah("tujuh", bulat("d74", hx(74), 110, 4, W.hijau, W.biru, { z: 2 }), teks("v74", hx(74), 134, "74", 10, W.hijauTua)),
    ),
    k(
      SUARA_N2,
      tambah("tiga", teks("p3", 234, 70, "+3", 10, W.hijauTua)),
      tambah("lima,", busur("m1", hx(74), hx(75), 106, 8), bulat("d75", hx(75), 110, 3, W.merah, W.biru, { z: 2 }), teks("v75", hx(75), 94, "75", 8, W.merah)),
      tambah("enam,", busur("m2", hx(75), hx(76), 106, 8), bulat("d76", hx(76), 110, 3, W.merah, W.biru, { z: 2 }), teks("v76", hx(76), 134, "76", 8, W.merah)),
      tambah("tujuh@3", busur("m3", hx(76), hx(77), 106, 8), bulat("d77", hx(77), 110, 3, W.merah, W.biru, { z: 2 }), teks("v77", hx(77), 94, "77", 8, W.merah)),
    ),
    ketukanCocok(SUARA_N3, true, "Cocok", ["1 bilangan kecil", "mudah dihitung maju"], "lompatannya sedikit", "mudah"),
    ketukanCocok(SUARA_N4, false, "Kurang cocok", ["2 bilangan besar", "lompatan terlalu banyak"], "lebih baik bersusun", "karena"),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_R1 = "Tiga cara sudah kita lihat. Mana yang pas tergantung bilangannya.";
const SUARA_R2 = "Bilangan biasa, pakai Penjumlahan Bersusun. Hampir menggenapi puluhan, pakai Pasangan Bilangan.";
const SUARA_R3 = "Salah satu bilangan kecil, pakai Menghitung Maju. Apa pun caranya, periksa dengan menukar urutan.";
const SUARA_R4 = "Menurutmu, untuk menjumlah enam puluh lima dan dua puluh sembilan, cara mana yang kamu pilih?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara menjumlah",
  sumber: "Metode global: ringkasan",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Tiga Cara Menjumlah"), teks("n3", 150, 46, "3 cara", 10, W.ungu)),
      tambah("kita", ...kartu("r0", 10, 70, 86, 56, "#DCFCE7", ["Penjumlahan", "Bersusun"], 9), ...kartu("r1", 107, 70, 86, 56, "#FCE7F3", ["Pasangan", "Bilangan"], 9), ...kartu("r2", 204, 70, 86, 56, "#DBEAFE", ["Menghitung", "Maju"], 9)),
      tambah("tergantung", teks("tq", 150, 170, "mana yang pas?", 11, W.merah)),
    ),
    k(
      SUARA_R2,
      tambah("biasa,", teks("e0", 53, 148, "bilangan biasa", 8, W.hijauTua)),
      sorotkan("Penjumlahan", "r0-k"),
      ubah("Hampir", { id: "r0-k", sorot: false }),
      tambah("puluhan,", teks("e1", 150, 148, "hampir puluhan", 8, W.ungu)),
      sorotkan("Pasangan", "r1-k"),
    ),
    k(
      SUARA_R3,
      ubah(0, { id: "r1-k", sorot: false }),
      tambah("kecil,", teks("e2", 247, 148, "1 bilangan kecil", 8, W.biru)),
      sorotkan("Menghitung", "r2-k"),
      tambah("periksa", teks("pk", 150, 186, "periksa: tukar urutan", 9, W.hijauTua)),
    ),
    k(
      SUARA_R4,
      ubah(0, { id: "r2-k", sorot: false }),
      hapus(0, "tq"),
      ubah("enam", { id: "n3", isi: "65 + 29", u: 18 }),
      tambah("cara", teks("z0", 53, 138, "?", 14, W.merah), teks("z1", 150, 138, "?", 14, W.merah), teks("z2", 247, 138, "?", 14, W.merah)),
    ),
  ],
};
