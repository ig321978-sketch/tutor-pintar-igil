import type { AdeganStory } from "./logika-story";
import { E, W, bulat, deretKlepon, deretOnde, emo, garis, judul, kartu, kotak, lantai, teks, tokoh } from "./k5b2c-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k5b2c-bantu";

/*
 * Cerita orisinal IGIL "Klepon Bu Wati" (Kelas 5 Bab 2 Sub-Bab C), lanjutan: faktor berpasangan, memeriksa lima lewat pembagian, dan jembatan ke Sub-Bab D.
 * Naskah suara dari naskah/story-naskah-k5b2c.md.
 */

/* ------------------------------ 7. Faktor berpasangan ------------------------------ */
const SUARA_A1 = "Faktor selalu berpasangan, dan hasil kali tiap pasangan adalah bilangan itu sendiri.";
const SUARA_A2 = "Faktor delapan belas adalah satu, dua, tiga, enam, sembilan, dan delapan belas.";
const SUARA_A3 = "Bima berhenti mencari ketika pasangan sudah bertemu di tengah.";

const KARTU18 = [1, 2, 3, 6, 9, 18];
const xKartu = (i: number): number => 12 + i * 46;

export const ADEGAN_PASANGAN: AdeganStory = {
  id: "pasangan",
  judul: "Faktor berpasangan",
  sumber: "Materi: faktor berpasangan",
  latar: "#F1F5F9",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Faktor berpasangan"), ...lantai("lt", 150), ...kartu("fa", 50, 40, 80, 40, W.daun, "faktor", 12), ...kartu("fb", 170, 40, 80, 40, W.kapur, "pasangannya", 10)),
      tambah("berpasangan", garis("lp", 130, 60, 40, 0, W.merah, 2.4, { z: 2 })),
      tambah("hasil", teks("hk", 150, 106, "hasil kali", 12, W.coklat, { z: 3 })),
      tambah("bilangan", teks("bi", 150, 130, "= bilangan itu sendiri", 11, W.merah, { z: 3 })),
    ),
    k(
      SUARA_A2,
      bersih(0),
      tambah(0, judul("Faktor berpasangan"), ...lantai("lt", 150), teks("fh", 150, 44, "Faktor 18", 13, W.merah, { z: 3 })),
      tambah("satu", ...kartu("h0", xKartu(0), 64, 40, 36, W.daun, String(KARTU18[0]), 14)),
      tambah("dua", ...kartu("h1", xKartu(1), 64, 40, 36, W.kapur, String(KARTU18[1]), 14)),
      tambah("tiga", ...kartu("h2", xKartu(2), 64, 40, 36, W.daun, String(KARTU18[2]), 14)),
      tambah("enam", ...kartu("h3", xKartu(3), 64, 40, 36, W.kapur, String(KARTU18[3]), 14)),
      tambah("sembilan", ...kartu("h4", xKartu(4), 64, 40, 36, W.daun, String(KARTU18[4]), 14)),
      tambah("belas@2", ...kartu("h5", xKartu(5), 64, 44, 36, W.kapur, String(KARTU18[5]), 14)),
    ),
    k(
      SUARA_A3,
      tambah(0, ...tokoh("bm", 260, 184, "Bima")),
      tambah(
        "pasangan",
        ...[0, 1, 2].flatMap((i) => {
          const yLine = 110 + i * 9;
          const x1 = xKartu(i) + 20;
          const x2 = xKartu(5 - i) + 20;
          return [garis(`br${i}`, x1, yLine, x2 - x1, 0, W.merah, 1.6, { z: 2 }), garis(`bs${i}a`, x1, 100, 0, yLine - 100, W.merah, 1.6, { z: 2 }), garis(`bs${i}b`, x2, 100, 0, yLine - 100, W.merah, 1.6, { z: 2 })];
        }),
      ),
      sorotkan("bertemu", "h2-k", "h3-k"),
      tambah("tengah", teks("tg", 120, 152, "bertemu di tengah", 10, W.merah, { z: 3 })),
    ),
  ],
};

/* ------------------------------ 8. Cek lima ------------------------------ */
const SUARA_L1 = "Fajar bertanya apakah lima faktor delapan belas.";
const SUARA_L2 = "Bima membagi delapan belas dengan lima, hasilnya tiga dan bersisa tiga.";
const SUARA_L3 = "Karena bersisa, lima bukan faktor, dan tiap bilangan harus diperiksa lewat pembagian.";

/** Isi piring ke-p pada pembagian delapan belas dengan lima: lima klepon bergaya dadu. */
const POLA_LIMA: [number, number][] = [
  [-10, -8],
  [10, -8],
  [0, 0],
  [-10, 8],
  [10, 8],
];

export const ADEGAN_CEK_LIMA: AdeganStory = {
  id: "cek-lima",
  judul: "Cek apakah lima faktor",
  sumber: "Materi: cek dengan pembagian",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Cek apakah lima faktor"), ...lantai("lt", 150), ...tokoh("fj", 40, 184, "Fajar")),
      tambah("apakah", kotak("bb", 84, 40, 196, 56, W.putih, W.biru, { rx: 10, tebal: 1.6, z: 1 })),
      tambah("lima", teks("qf", 182, 74, "Apakah 5 faktor 18?", 12, W.biru, { z: 3 })),
      tambah("belas", emo("qq", 262, 118, E.tanya, 20, { z: 3 })),
    ),
    k(
      SUARA_L2,
      bersih(0),
      tambah(0, judul("Bima membagi"), ...lantai("lt", 150), ...tokoh("bm", 268, 184, "Bima"), teks("hb", 150, 44, "18 : 5", 16, W.biru, { z: 3 })),
      tambah(
        "lima",
        ...[60, 112, 164].flatMap((cx, p) => [bulat(`pc${p}`, cx, 100, 22, W.putih, W.hijauTua, { tebal: 1.8, z: 1 }), ...POLA_LIMA.map(([dx, dy], j) => emo(`kc${p}${j}`, cx + dx, 104 + dy, E.klepon, 12, { z: 3 }))]),
      ),
      ubah("hasilnya", { id: "hb", isi: "18 : 5 = 3" }),
      tambah(
        "bersisa",
        kotak("ts", 198, 84, 44, 32, "#FEE2E2", W.merah, { rx: 6, tebal: 1.6, putus: true, z: 1 }),
        emo("tk0", 208, 104, E.klepon, 12, { z: 3 }),
        emo("tk1", 220, 104, E.klepon, 12, { z: 3 }),
        emo("tk2", 232, 104, E.klepon, 12, { z: 3 }),
        teks("ss", 150, 146, "sisa 3", 13, W.merah, { z: 3 }),
      ),
    ),
    k(
      SUARA_L3,
      bersih(0),
      tambah(0, judul("Cek dengan pembagian"), ...lantai("lt", 150)),
      tambah("bersisa", teks("bq", 150, 52, "ada sisa", 14, W.merah, { z: 3 })),
      tambah("bukan", teks("bf", 150, 84, "5 bukan faktor 18", 13, W.biru, { z: 3 }), emo("xx", 270, 80, E.salah, 22, { z: 3 })),
      tambah("diperiksa", teks("cb", 150, 118, "tiap bilangan dicek dengan bagi", 9.5, W.coklat, { z: 3 })),
      tambah("pembagian", emo("cr", 150, 152, E.cari, 24, { z: 3 })),
    ),
  ],
};

/* ------------------------------ 9. Penutup: Pak Joko datang ------------------------------ */
const SUARA_J1 = "Pak Joko, pengemas bingkisan, datang membawa dua puluh empat klepon dan delapan belas onde-onde.";
const SUARA_J2 = "Ia ingin mengisi kotak-kotak bingkisan dengan klepon dan onde-onde yang sama banyaknya.";
const SUARA_J3 = "Menurutmu, berapa kotak yang bisa dibuat? Terima kasih, Bima, Citra, Fajar, Pak Arif, dan Bu Wati!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Pak Joko datang",
  sumber: "Materi: jembatan ke Sub-Bab D",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_J1,
      tambah(0, judul("Pak Joko datang"), ...lantai("lt", 150), ...tokoh("pj", 40, 184, "Pak Joko")),
      tambah("pengemas", emo("hd", 50, 128, E.hadiah, 22, { z: 3 })),
      tambah("dua", teks("l24", 138, 56, "24 klepon", 10, W.merah, { z: 3 }), ...deretKlepon("kl", 96, 76, 24, 6, 15, 15, 12)),
      tambah("delapan", teks("l18", 232, 56, "18 onde-onde", 10, W.merah, { z: 3 }), ...deretOnde("od", 204, 78, 18, 6, 12, 12, 4.6)),
    ),
    k(
      SUARA_J2,
      tambah("kotak-kotak", ...kartu("bx0", 96, 128, 40, 22, "#D6A25E", "kotak", 9, W.kayuTua), ...kartu("bx1", 146, 128, 40, 22, "#D6A25E", "kotak", 9, W.kayuTua), ...kartu("bx2", 196, 128, 40, 22, "#D6A25E", "kotak", 9, W.kayuTua)),
      tambah("onde-onde", emo("hd2", 262, 134, E.hadiah, 20, { z: 3 })),
      tambah("sama", teks("is", 166, 166, "isi sama banyak", 10, W.coklat, { z: 3 })),
    ),
    k(
      SUARA_J3,
      bersih(0),
      tambah(0, judul("Terima kasih!"), ...lantai("lt", 150)),
      tambah("berapa", teks("qq", 150, 64, "?", 34, W.merah, { z: 3 })),
      tambah("kotak", teks("bk", 150, 100, "berapa kotak?", 12, W.biru, { z: 3 })),
      tambah("Terima", ...tokoh("pj", 24, 184, "Pak Joko")),
      tambah("Bima", ...tokoh("bm", 74, 184, "Bima")),
      tambah("Citra", ...tokoh("ct", 124, 184, "Citra")),
      tambah("Fajar", ...tokoh("fj", 174, 184, "Fajar")),
      tambah("Arif", ...tokoh("pa", 224, 184, "Pak Arif")),
      tambah("Wati", ...tokoh("bw", 274, 184, "Bu Wati")),
    ),
  ],
};
