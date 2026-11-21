import type { AdeganStory } from "./logika-story";
import { E, W, barPec, bulat, campur, emo, judul, kantong, kotak, panah, pecahan, tanah, teks, timbangan, tokoh } from "./k5b3a-gambar";
import { bersih, hapus, idx, k, tambah, warnai } from "./k5b3a-bantu";

/*
 * Cerita orisinal IGIL "Tiga Kantong Tepung Bu Ratna" (Kelas 5 Bab 3 Sub-Bab A, membandingkan dan mengurutkan pecahan), awal cerita Toko Roti Keliling.
 * Naskah suara dari naskah/story-naskah-k5b3a.md. Bagian ini: tiba di toko roti keliling, tiga kantong tepung berpecahan campuran, dan salah langkah Fajar (menunjuk pecahan yang tampak besar).
 */

/* ------------------------------ 1. Toko roti keliling ------------------------------ */
const SUARA_S1 = "Pak Arif mengajak Bima, Citra, dan Fajar ke Toko Roti Keliling di pojok taman.";
const SUARA_S2 = "Bu Ratna bercelemek merah muda dan menata tiga kantong tepung di atas timbangan.";
const SUARA_S3 = "Beliau ingin mengurutkan kantong dari yang paling berat.";

export const ADEGAN_TOKO: AdeganStory = {
  id: "toko",
  judul: "Toko Roti Keliling",
  sumber: "Materi: tiba di toko roti",
  latar: W.taman,
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Toko Roti Keliling"), ...tanah("tn", 150)),
      tambah("Arif", ...tokoh("pa", 34, 184, "Pak Arif")),
      tambah("Bima,", ...tokoh("bm", 90, 184, "Bima")),
      tambah("Citra,", ...tokoh("ct", 146, 184, "Citra")),
      tambah("Fajar", ...tokoh("fj", 202, 184, "Fajar")),
      tambah(
        "Toko",
        kotak("mb-at", 168, 56, 124, 14, W.pink, W.pinkTua, { rx: 2, tebal: 1.4, z: 2 }),
        kotak("mb-bd", 172, 70, 116, 58, W.putih, W.pinkTua, { rx: 3, tebal: 1.6, z: 0 }),
        kotak("mb-jd", 182, 80, 46, 26, W.langit, W.coklat, { rx: 2, tebal: 1.2, z: 1 }),
        teks("mb-tk", 230, 49, "TOKO ROTI KELILING", 8.4, W.pinkTua, { z: 3 }),
        emo("mb-rt", 258, 110, E.roti, 24, { z: 2 }),
        bulat("mb-r1", 200, 130, 9, "#475569", "#0F172A", { tebal: 1.4, z: 1 }),
        bulat("mb-r2", 262, 130, 9, "#475569", "#0F172A", { tebal: 1.4, z: 1 }),
      ),
      tambah("taman.", emo("ph", 36, 108, E.pohon, 38), teks("tm", 36, 134, "taman", 9, W.hijauTua)),
    ),
    k(
      SUARA_S2,
      bersih(0),
      tambah(0, judul("Meja Timbangan"), ...tanah("tn", 150)),
      tambah("Bu", ...tokoh("bu", 252, 184, "Bu Ratna")),
      tambah("menata", kotak("mj", 30, 118, 190, 8, W.coklat, W.papan, { rx: 2, z: 0 }), kotak("kk1", 40, 126, 6, 24, W.coklat, W.papan, { rx: 1, z: 0 }), kotak("kk2", 204, 126, 6, 24, W.coklat, W.papan, { rx: 1, z: 0 })),
      tambah("tiga", teks("t3", 125, 40, "3 kantong tepung", 10, W.pinkTua)),
      tambah(
        "kantong",
        ...kantong("ka", 81, 98),
        ...kantong("kb", 169, 94),
        ...kantong("kc", 48, 118),
        ...timbangan("tb", 125, 78),
      ),
      tambah("timbangan.", teks("tbl", 125, 138, "timbangan", 9, W.coklat)),
    ),
    k(
      SUARA_S3,
      tambah("ingin", emo("tq", 252, 134, E.pikir, 22)),
      tambah("mengurutkan", teks("ur", 125, 150, "urutkan: yang paling berat", 9.5, W.merah)),
      tambah("paling", panah("pa1", 100, 66, 50, 0, W.merah, 2.4)),
      tambah("berat.", emo("kt", 210, 96, E.kuat, 22)),
    ),
  ],
};

/* ------------------------------ 2. Pecahan campuran ------------------------------ */
const SUARA_C1 = "Berat kantong pertama dua bulat tiga per empat kilogram, kantong kedua tiga bulat satu per dua, dan kantong ketiga satu bulat tujuh per delapan.";
const SUARA_C2 = "Bentuk ini disebut pecahan campuran, karena terdiri atas bilangan bulat dan pecahan biasa.";
const SUARA_C3 = "Pecahan biasa hanya punya pembilang di atas dan penyebut di bawah, seperti tiga per empat.";

export const ADEGAN_CAMPURAN: AdeganStory = {
  id: "campuran",
  judul: "Pecahan Campuran",
  sumber: "Materi: pecahan campuran dan biasa",
  latar: W.taman,
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Tiga Kantong Tepung"), ...tanah("tn", 150)),
      tambah("pertama", ...kantong("ka", 54, 118)),
      tambah(idx(SUARA_C1, "empat"), ...campur("ca", 54, 148, 2, 3, 4, 13)),
      tambah("kedua", ...kantong("kb", 150, 118)),
      tambah(idx(SUARA_C1, "dua", 2), ...campur("cb", 150, 148, 3, 1, 2, 13)),
      tambah("ketiga", ...kantong("kc", 246, 118)),
      tambah("delapan.", ...campur("cc", 246, 148, 1, 7, 8, 13)),
      tambah("kilogram,", teks("kg", 150, 192, "berat dalam kilogram", 9, W.coklat)),
    ),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Pecahan Campuran"), ...tanah("tn", 150)),
      tambah("campuran,", ...campur("z", 150, 80, 2, 3, 4, 26, W.merah)),
      tambah("bilangan", teks("tw", 100, 138, "bilangan bulat", 9.5, W.hijauTua), panah("p1", 112, 128, 22, -26, W.hijauTua, 2)),
      tambah(idx(SUARA_C2, "pecahan", 2), teks("tf", 204, 138, "pecahan biasa", 9.5, W.coklat), panah("p2", 192, 128, -20, -30, W.coklat, 2)),
    ),
    k(
      SUARA_C3,
      bersih(0),
      tambah(0, judul("Pecahan Biasa"), ...tanah("tn", 150), ...pecahan("bs", 100, 82, 3, 4, 26)),
      tambah("pembilang", teks("pb", 202, 62, "pembilang", 10, W.merah), panah("a1", 160, 62, -42, 12, W.merah, 2)),
      tambah("penyebut", teks("ps", 202, 104, "penyebut", 10, W.coklat), panah("a2", 160, 102, -42, -6, W.coklat, 2)),
      tambah("tiga", ...barPec("br", 60, 126, 160, 16, 4, 3)),
      tambah("empat.", teks("bt", 140, 158, "3 dari 4 bagian sama besar", 9.5, W.hijauTua)),
    ),
  ],
};

/* ------------------------------ 3. Salah langkah Fajar ------------------------------ */
const SUARA_F1 = "Fajar langsung menunjuk kantong ketiga, karena tujuh per delapan tampak paling besar.";
const SUARA_F2 = "Kalau aku salah, aku mengaduk adonan seember penuh sendirian, katanya sambil menepuk dada.";
const SUARA_F3 = "Bima tersenyum dan meminta Fajar menengok bilangan bulatnya lebih dulu.";

export const ADEGAN_SALAH: AdeganStory = {
  id: "salah",
  judul: "Fajar Menunjuk",
  sumber: "Materi: salah langkah Fajar",
  latar: W.taman,
  ketukan: [
    k(
      SUARA_F1,
      tambah(0, judul("Fajar Menunjuk"), ...tanah("tn", 150)),
      tambah("Fajar", ...tokoh("fj", 40, 184, "Fajar")),
      tambah("menunjuk", emo("tj", 68, 140, E.tunjuk, 22)),
      tambah("kantong", ...kantong("ka", 100, 128), ...kantong("kb", 150, 128), ...kantong("kc", 200, 128), ...campur("ca", 100, 152, 2, 3, 4, 13), ...campur("cb", 150, 152, 3, 1, 2, 13)),
      tambah("ketiga,", kotak("hl", 178, 78, 44, 76, undefined, W.merah, { rx: 6, tebal: 2.2, putus: true, z: 3 })),
      tambah("tujuh", ...campur("cc", 200, 152, 1, 7, 8, 13, W.merah)),
      tambah("besar.", teks("bs", 150, 74, "paling besar?", 11, W.merah)),
    ),
    k(
      SUARA_F2,
      tambah("salah,", kotak("bb", 40, 30, 220, 30, W.putih, W.pinkTua, { rx: 8, tebal: 1.6, z: 0 }), teks("bbt", 150, 50, "Kalau salah, aku aduk adonan!", 10, W.merah, { z: 3 })),
      tambah("adonan", kotak("em", 240, 100, 46, 30, W.abu, W.coklat, { rx: 6, tebal: 1.6, z: 1 }), teks("emt", 263, 120, "adonan", 9, W.coklat, { z: 3 })),
      tambah("seember", teks("sm", 263, 142, "seember", 9, W.coklat)),
      tambah("menepuk", emo("dd", 40, 138, E.kuat, 22)),
    ),
    k(
      SUARA_F3,
      hapus(0, "bb", "bbt", "em", "emt", "sm", "dd", "tj", "bs"),
      tambah("Bima", ...tokoh("bm", 262, 184, "Bima")),
      tambah("meminta", emo("bc", 236, 150, E.bicara, 18)),
      warnai("bilangan", W.merah, "ca-w", "cb-w", "cc-w"),
      tambah("lebih", teks("ld", 150, 62, "lihat bulatnya dulu", 10, W.merah)),
    ),
  ],
};

