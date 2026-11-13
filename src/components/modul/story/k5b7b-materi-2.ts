import type { AdeganStory } from "./logika-story";
import { BENTUK, W, antara, bangun, centangBaris, huruf, idDari, ide, kartu, panah, panelCiri, poli, rumusBangun, sama, sejajar, siku, tanda, teks, titikSudut } from "./k5b7b-gambar";
import { bersih, hapus, k, tambah } from "./k5b7b-bantu";

const KIRI = { cx: 62, cy: 102, s: 22 };
const PX = 118;
const PW = 172;

/* ------------------------------ 5. Jajargenjang: ide Nisa, Komang, Asep, dan Yohana (hlm. 214–215) ------------------------------ */
const jMini = () => [bangun("jm", "jajar", 56, 104, 22, W.hijauMuda)];

export const ADEGAN_JAJAR_SIMPUL: AdeganStory = {
  id: "jajar-simpul",
  judul: "Jajargenjang: segi empat, trapesium, atau trapesium sama kaki?",
  sumber: "Buku Siswa hlm. 214–215; Buku Panduan Guru hlm. 321–322",
  latar: "#FDF2F8",
  kutipan: ["Apakah jajargenjang merupakan segi empat", "Bolehkah jajargenjang disebut trapesium", "Ide Nisa", "Jajargenjang termasuk segi empat karena memiliki", "Ide Komang", "Jajargenjang termasuk trapesium karena", "Ide Asep", "Jajargenjang tidak memiliki sumbu simetri", "Ide Yohana", "Sudut-sudut pada alas jajargenjang tidak sama"],
  ketukan: [
    k(
      "Apakah jajargenjang merupakan segi empat? Bolehkah disebut trapesium? Bolehkah disebut trapesium sama kaki?",
      tambah(0, teks("jud", 150, 22, "Jajargenjang itu apa?", 13, W.ungu)),
      tambah(0, jMini()),
      tambah(0, kartu("q1", 108, 36, 184, 34, W.putih, ["segi empat?"], 9)),
      tambah(5, kartu("q2", 108, 82, 184, 34, W.putih, ["trapesium?"], 9)),
      tambah(8, kartu("q3", 108, 128, 184, 34, W.putih, ["trapesium sama kaki?"], 9)),
    ),
    k(
      "Ide Nisa: jajargenjang termasuk segi empat karena memiliki empat sisi, dan sisi yang berhadapan sejajar. Ide Komang: jajargenjang termasuk trapesium, karena setidaknya sepasang sisinya sejajar dan kaki-kakinya juga sejajar.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Ide Nisa dan Komang", 13, W.ungu)),
      tambah(0, jMini()),
      tambah(0, ide("nn", 104, 32, 188, 58, "Nisa", ["jajargenjang termasuk segi empat:", "4 sisi, sisi berhadapan sejajar"], W.krem, 8)),
      tambah(15, ide("nk", 104, 100, 188, 58, "Komang", ["jajargenjang termasuk trapesium:", "kaki-kakinya juga sejajar"], W.muda, 8)),
    ),
    k(
      "Ide Asep: trapesium sama kaki punya satu sumbu simetri, jajargenjang tidak. Ide Yohana: sudut pada alasnya tidak sama besar.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Ide Asep dan Yohana", 13, W.ungu)),
      tambah(0, jMini()),
      tambah(0, ide("na", 104, 32, 188, 58, "Asep", ["trapesium sama kaki punya 1 sumbu", "simetri, jajargenjang tidak punya"], W.krem, 8)),
      tambah(11, ide("ny", 104, 100, 188, 58, "Yohana", ["sudut pada alas trapesium sama kaki", "sama besar, pada jajargenjang tidak"], W.muda, 8)),
    ),
    k(
      "Jadi kesimpulannya, jajargenjang adalah segi empat, juga trapesium, tetapi bukan trapesium sama kaki.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Kesimpulan", 13, W.ungu)),
      tambah(0, jMini()),
      tambah(4, kartu("s1", 108, 40, 184, 34, W.hijauMuda, ["jajargenjang: segi empat"], 8.6), tanda("c1", 98, 62, true, 15)),
      tambah(6, kartu("s2", 108, 86, 184, 34, W.hijauMuda, ["jajargenjang: trapesium"], 8.6), tanda("c2", 98, 108, true, 15)),
      tambah(9, kartu("s3", 108, 132, 184, 34, W.merahMuda, ["bukan trapesium sama kaki"], 8.6), tanda("c3", 98, 154, false, 15)),
    ),
  ],
};

/* ------------------------------ 6. Eksplorasi 7.2D persegi panjang (hlm. 216–218) ------------------------------ */
const ppCiri = panelCiri("pc", PX, 34, PW, ["sisi berhadapan sejajar", "sisi berhadapan sama panjang", "semua sudut siku-siku", "2 sumbu simetri", "diagonal membagi dua sama panjang"], W.putih, 7.8);
const jrCiri = panelCiri("jr", PX, 38, PW, ["merupakan segi empat", "sisi berhadapan sejajar", "sisi berhadapan sama panjang", "sudut berhadapan sama besar"], W.krem, 7.8, 24, 6);
const ppBentuk = () => [bangun("pp", "persegiPanjang", KIRI.cx, KIRI.cy, KIRI.s, W.hijauMuda), ...huruf("pph", "persegiPanjang", KIRI.cx, KIRI.cy, KIRI.s)];
const jjBentuk = () => [bangun("jj", "jajar", KIRI.cx, KIRI.cy, KIRI.s, W.hijauMuda), ...huruf("jjh", "jajar", KIRI.cx, KIRI.cy, KIRI.s)];
const ppSudut = ["A", "B", "C", "D"];

export const ADEGAN_PERSEGI_PANJANG: AdeganStory = {
  id: "persegi-panjang",
  judul: "Eksplorasi 7.2D: persegi panjang dibandingkan dengan jajargenjang",
  sumber: "Buku Siswa hlm. 216–218; Buku Panduan Guru hlm. 322–325",
  latar: "#ECFDF5",
  kutipan: ["Ayo Mengingat Kembali Persegi Panjang", "Sisi-sisi yang berhadapan sejajar", "Semua sudutnya siku-siku", "Mempunyai 2 sumbu simetri", "Ayo Membandingkan", "Apakah persegi panjang merupakan segi empat", "Apakah semua ciri-ciri jajargenjang dimiliki oleh", "persegi panjang dapat digolongkan sebagai", "persegi panjang memiliki sudut siku-siku, sedangkan"],
  ketukan: [
    k(
      "Eksplorasi 7.2D, mengingat kembali persegi panjang. Cirinya: sisi berhadapan sejajar dan sama panjang, semua sudutnya siku-siku, punya dua sumbu simetri, dan diagonalnya saling membagi dua sama panjang.",
      tambah(0, teks("jud", 150, 20, "Eksplorasi 7.2D", 12.5, W.ungu)),
      tambah(0, ppBentuk()),
      tambah(8, ppCiri[0]),
      tambah(11, ppCiri[1]),
      tambah(14, ppCiri[2]),
      tambah(17, ppCiri[3]),
      tambah(21, ppCiri[4]),
    ),
    k(
      "Sekarang bandingkan dengan jajargenjang. merupakan segi empat, sisi berhadapan sejajar dan sama panjang, serta sudut berhadapan sama besar.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Ciri jajargenjang", 12.5, W.ungu)),
      tambah(0, jjBentuk()),
      tambah(4, jrCiri[0]),
      tambah(7, jrCiri[1]),
      tambah(10, jrCiri[2]),
      tambah(14, jrCiri[3]),
    ),
    k(
      "Apakah persegi panjang juga memiliki semua ciri itu? Persegi panjang merupakan segi empat, jadi ciri pertama terpenuhi.",
      hapus(0, idDari(jjBentuk())),
      tambah(0, ppBentuk()),
      tambah(11, centangBaris("v0", PX, 38, PW, 0, true, 24, 6)),
    ),
    k(
      "Sisi AB sejajar DC, dan sisi AD sejajar BC. Sisi AB sama dengan DC, dan sisi AD sama dengan BC. Jadi ciri kedua dan ketiga terpenuhi.",
      tambah(2, sejajar("w1", "persegiPanjang", KIRI.cx, KIRI.cy, KIRI.s, "A", "B"), sejajar("w2", "persegiPanjang", KIRI.cx, KIRI.cy, KIRI.s, "D", "C")),
      tambah(7, sejajar("w3", "persegiPanjang", KIRI.cx, KIRI.cy, KIRI.s, "A", "D", W.merah), sejajar("w4", "persegiPanjang", KIRI.cx, KIRI.cy, KIRI.s, "B", "C", W.merah)),
      tambah(11, sama("x1", "persegiPanjang", KIRI.cx, KIRI.cy, KIRI.s, "A", "B", 1, W.hijau), sama("x2", "persegiPanjang", KIRI.cx, KIRI.cy, KIRI.s, "D", "C", 1, W.hijau)),
      tambah(17, sama("x3", "persegiPanjang", KIRI.cx, KIRI.cy, KIRI.s, "A", "D", 2, W.merah), sama("x4", "persegiPanjang", KIRI.cx, KIRI.cy, KIRI.s, "B", "C", 2, W.merah)),
      tambah(22, centangBaris("v1", PX, 38, PW, 1, true, 24, 6)),
      tambah(24, centangBaris("v2", PX, 38, PW, 2, true, 24, 6)),
    ),
    k(
      "Sudut A sama dengan sudut C, dan sudut D sama dengan sudut B, jadi ciri keempat terpenuhi. Semua ciri jajargenjang dimiliki persegi panjang, sehingga persegi panjang dapat digolongkan sebagai jajargenjang.",
      tambah(1, titikSudut("y1", "persegiPanjang", KIRI.cx, KIRI.cy, KIRI.s, "A", W.merah), titikSudut("y3", "persegiPanjang", KIRI.cx, KIRI.cy, KIRI.s, "C", W.merah)),
      tambah(8, titikSudut("y4", "persegiPanjang", KIRI.cx, KIRI.cy, KIRI.s, "D", W.ungu), titikSudut("y2", "persegiPanjang", KIRI.cx, KIRI.cy, KIRI.s, "B", W.ungu)),
      tambah(16, centangBaris("v3", PX, 38, PW, 3, true, 24, 6)),
      tambah(24, kartu("bn", 20, 164, 260, 26, W.hijauMuda, ["persegi panjang termasuk jajargenjang"], 9)),
    ),
    k(
      "Akan tetapi, persegi panjang memiliki sudut siku-siku, sedangkan jajargenjang tidak.",
      tambah(6, ...ppSudut.map((h) => siku(`z${h}`, "persegiPanjang", KIRI.cx, KIRI.cy, KIRI.s, h))),
      hapus(8, "bn-k", "bn-t0"),
      tambah(8, kartu("bt", 20, 164, 260, 26, W.krem, ["tambahan: semua sudutnya siku-siku"], 9)),
    ),
  ],
};

/* ------------------------------ 7. Ayo Berlatih: percobaan sedotan (hlm. 219) ------------------------------ */
const JD = { cx: 150, cy: 104, s: 30 };

export const ADEGAN_SEDOTAN: AdeganStory = {
  id: "sedotan",
  judul: "Ayo Berlatih: percobaan sedotan, jajargenjang menjadi persegi panjang",
  sumber: "Buku Siswa hlm. 219; Buku Panduan Guru hlm. 325–326",
  latar: "#FFFBEB",
  kutipan: ["Ayo Berlatih", "Bolehkah jajargenjang memiliki sudut siku-siku", "Guru kalian akan menyediakan", "2 pasang sedotan yang sama", "Ubah-ubahlah besar sudut pada", "Setelah menjadi sudut siku-siku", "Persegi panjang adalah", "jajargenjang yang salah satu sudutnya siku-siku"],
  ketukan: [
    k(
      "Ayo berlatih. Coba pikirkan pendapat Asep: bolehkah jajargenjang memiliki sudut siku-siku? Boleh.",
      tambah(0, teks("jud", 150, 22, "Ayo Berlatih", 13, W.ungu)),
      tambah(4, ide("as", 14, 34, 272, 48, "Asep", ["Bolehkah jajargenjang memiliki sudut siku-siku?"], W.krem, 8.6)),
      tambah(11, kartu("bl", 70, 96, 160, 32, W.hijauMuda, ["Boleh, mari dibuktikan"], 9.4)),
    ),
    k(
      "Guru menyediakan dua pasang sedotan yang sama panjang dan seutas tali. Rangkailah keempat sedotan menjadi jajargenjang.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Percobaan sedotan", 13, W.ungu)),
      tambah(3, antara("sAB", "jajar", JD.cx, JD.cy, JD.s, "A", "B", W.emas, 5), antara("sDC", "jajar", JD.cx, JD.cy, JD.s, "D", "C", W.emas, 5)),
      tambah(4, antara("sAD", "jajar", JD.cx, JD.cy, JD.s, "A", "D", W.ungu, 5), antara("sBC", "jajar", JD.cx, JD.cy, JD.s, "B", "C", W.ungu, 5)),
      tambah(9, poli("tali", JD.cx, JD.cy, BENTUK.jajar.pts, JD.s * 0.85, "none", W.merah, { putus: true, tebal: 1.2 })),
      tambah(9, teks("tl", 150, 172, "seutas tali di dalam sedotan", 9.4, W.merah)),
      tambah(15, teks("jt", 150, 188, "2 pasang sedotan, 4 sudut bisa berubah", 8.6, W.biru)),
    ),
    k(
      "Ubah-ubah besar sudut jajargenjang itu. Bisakah salah satu sudutnya menjadi sudut siku-siku? Bisa, jika sisinya ditegakkan.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Ubah besar sudutnya", 13, W.ungu)),
      tambah(0, poli("t1", 56, 98, BENTUK.jajar.pts, 16, W.krem, W.biru), teks("t1t", 56, 134, "miring", 8.6)),
      tambah(5, panah("pa1", 90, 98, 28, 0, W.ungu, 2), poli("t2", 150, 98, [[-1.5, 0.9], [1.2, 0.9], [1.5, -0.9], [-1.2, -0.9]], 16, W.krem, W.biru), teks("t2t", 150, 134, "agak miring", 8.6)),
      tambah(12, panah("pa2", 184, 98, 28, 0, W.ungu, 2), poli("t3", 244, 98, BENTUK.persegiPanjang.pts, 16, W.hijauMuda, W.biru), teks("t3t", 244, 134, "tegak", 8.6)),
    ),
    k(
      "Jika satu sudut menjadi siku-siku, sudut-sudut yang lain juga menjadi siku-siku. Bangun yang diperoleh adalah persegi panjang.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Hasil percobaan", 13, W.ungu)),
      tambah(0, bangun("pb", "persegiPanjang", 150, 100, 34, W.hijauMuda), ...huruf("pbh", "persegiPanjang", 150, 100, 34)),
      tambah(4, siku("pa", "persegiPanjang", 150, 100, 34, "A")),
      tambah(7, siku("pb2", "persegiPanjang", 150, 100, 34, "B")),
      tambah(8, siku("pc2", "persegiPanjang", 150, 100, 34, "C")),
      tambah(10, siku("pd", "persegiPanjang", 150, 100, 34, "D")),
      tambah(15, kartu("pk", 80, 160, 140, 26, W.krem, ["persegi panjang"], 9.6)),
    ),
    k(
      "Jadi persegi panjang dapat digolongkan sebagai jajargenjang karena semua ciri jajargenjang dimiliki persegi panjang. Persegi panjang adalah jajargenjang yang salah satu sudutnya siku-siku.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Jajargenjang dan persegi panjang", 12, W.ungu)),
      tambah(6, rumusBangun("rb", "jajar", "persegiPanjang", "jajargenjang", "persegi panjang", ["tambah: satu sudut", "siku-siku"]).dari),
      tambah(17, rumusBangun("rb", "jajar", "persegiPanjang", "jajargenjang", "persegi panjang", ["tambah: satu sudut", "siku-siku"]).panah),
      tambah(0, rumusBangun("rb", "jajar", "persegiPanjang", "jajargenjang", "persegi panjang", ["tambah: satu sudut", "siku-siku"]).ke),
    ),
  ],
};

/* ------------------------------ 8. Eksplorasi 7.2E belah ketupat (hlm. 220–223) ------------------------------ */
const bkBentuk = () => [bangun("bk", "belahKetupat", KIRI.cx, KIRI.cy, KIRI.s, W.hijauMuda), ...huruf("bkh", "belahKetupat", KIRI.cx, KIRI.cy, KIRI.s)];
const bkCiri = panelCiri("bc", PX, 34, PW, ["sisi berhadapan sejajar", "sisi berhadapan sama panjang", "sudut berhadapan sama besar", "2 sumbu simetri: diagonalnya", "diagonal: membagi dua, tegak lurus"], W.putih, 7.8);

export const ADEGAN_BELAH_KETUPAT: AdeganStory = {
  id: "belah-ketupat",
  judul: "Eksplorasi 7.2E: belah ketupat dibandingkan dengan jajargenjang",
  sumber: "Buku Siswa hlm. 220–223; Buku Panduan Guru hlm. 326–330",
  latar: "#FFF1F2",
  kutipan: ["Ayo Mengingat Kembali Belah Ketupat", "Sisi-sisi yang berhadapan sama panjang", "Sudut yang berhadapan sama", "saling membagi dua", "Apakah belah ketupat merupakan", "Apakah AC sejajar DB", "Apakah AD = BC", "Ayo Berpikir Kritis", "apakah sembarang jajargenjang boleh", "Belah ketupat adalah jajargenjang dengan sisi-sisi"],
  ketukan: [
    k(
      "Eksplorasi 7.2E, mengingat kembali belah ketupat. Cirinya: sisi berhadapan sejajar dan sama panjang, sudut berhadapan sama besar, dua sumbu simetri yaitu diagonalnya, dan diagonal saling membagi dua sama panjang serta tegak lurus.",
      tambah(0, teks("jud", 150, 20, "Eksplorasi 7.2E", 12.5, W.ungu)),
      tambah(0, bkBentuk()),
      tambah(7, bkCiri[0]),
      tambah(10, bkCiri[1]),
      tambah(13, bkCiri[2]),
      tambah(17, bkCiri[3]),
      tambah(21, antara("dg1", "belahKetupat", KIRI.cx, KIRI.cy, KIRI.s, "A", "B", W.ungu, 1.4, { putus: true }), antara("dg2", "belahKetupat", KIRI.cx, KIRI.cy, KIRI.s, "C", "D", W.ungu, 1.4, { putus: true })),
      tambah(23, bkCiri[4]),
    ),
    k(
      "Bandingkan dengan jajargenjang: apakah belah ketupat memiliki semua ciri jajargenjang? Belah ketupat merupakan segi empat, dan sisi AC sejajar DB, sisi AD sejajar BC.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Ciri jajargenjang", 12.5, W.ungu)),
      tambah(0, bkBentuk()),
      tambah(0, jrBaris()),
      tambah(14, centangBaris("u0", PX, 38, PW, 0, true, 24, 6)),
      tambah(18, sejajar("p1", "belahKetupat", KIRI.cx, KIRI.cy, KIRI.s, "A", "C"), sejajar("p2", "belahKetupat", KIRI.cx, KIRI.cy, KIRI.s, "D", "B")),
      tambah(22, sejajar("p3", "belahKetupat", KIRI.cx, KIRI.cy, KIRI.s, "A", "D", W.merah), sejajar("p4", "belahKetupat", KIRI.cx, KIRI.cy, KIRI.s, "C", "B", W.merah), centangBaris("u1", PX, 38, PW, 1, true, 24, 6)),
    ),
    k(
      "Sisi AC sama dengan DB, dan sisi AD sama dengan BC. Sudut A sama dengan sudut B, dan sudut C sama dengan sudut D. Jadi semua ciri jajargenjang dimiliki belah ketupat.",
      tambah(2, ...(["AC", "CB", "BD", "DA"] as const).map((s, i) => sama(`q${i}`, "belahKetupat", KIRI.cx, KIRI.cy, KIRI.s, s[0], s[1], 1, W.hijau)), centangBaris("u2", PX, 38, PW, 2, true, 24, 6)),
      tambah(12, titikSudut("r1", "belahKetupat", KIRI.cx, KIRI.cy, KIRI.s, "A", W.merah, 2.6), titikSudut("r2", "belahKetupat", KIRI.cx, KIRI.cy, KIRI.s, "B", W.merah, 2.6)),
      tambah(19, titikSudut("r3", "belahKetupat", KIRI.cx, KIRI.cy, KIRI.s, "C", W.ungu, 2.6), titikSudut("r4", "belahKetupat", KIRI.cx, KIRI.cy, KIRI.s, "D", W.ungu, 2.6)),
      tambah(23, centangBaris("u3", PX, 38, PW, 3, true, 24, 6)),
      tambah(25, kartu("bn", 20, 164, 260, 26, W.hijauMuda, ["belah ketupat termasuk jajargenjang"], 9)),
    ),
    k(
      "Ayo berpikir kritis. Asep bertanya, kalau belah ketupat boleh disebut jajargenjang, apakah sembarang jajargenjang boleh disebut belah ketupat?",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Ayo Berpikir Kritis", 13, W.ungu)),
      tambah(3, ide("as", 14, 30, 272, 50, "Asep", ["Kalau belah ketupat boleh disebut jajargenjang,", "apakah sembarang jajargenjang boleh disebut belah ketupat?"], W.krem, 7.4)),
      tambah(6, bangun("ab1", "belahKetupat", 56, 128, 14, W.hijauMuda), teks("ab1t", 56, 158, "belah ketupat", 8.2)),
      tambah(13, bangun("ab2", "jajar", 244, 128, 14, W.hijauMuda), teks("ab2t", 244, 158, "jajargenjang", 8.2)),
      tambah(8, panah("ar1", 96, 118, 110, 0, W.hijau, 2.2), teks("ar1t", 150, 111, "boleh ✓", 8.4, W.hijau)),
      tambah(14, panah("ar2", 204, 140, -110, 0, W.merah, 2.2), teks("ar2t", 150, 156, "belum tentu?", 8.4, W.merah)),
    ),
    k(
      "Jika dibalik, belum tentu semua ciri belah ketupat ada pada jajargenjang. Jajargenjang tidak harus memiliki empat sisi sama panjang, dan diagonalnya tidak harus berpotongan tegak lurus. Jadi sembarang jajargenjang bukan belah ketupat.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Jika dibalik", 13, W.ungu)),
      tambah(0, bangun("db", "jajar", 62, 90, 20, W.hijauMuda), ...huruf("dbh", "jajar", 62, 90, 20)),
      tambah(11, ...panelCiri("dk", PX, 44, PW, ["4 sisi sama panjang: tidak harus"], W.putih, 7.8)[0], tanda("dx0", PX + PW - 9, 59, false, 12)),
      tambah(19, ...panelCiri("dl", PX, 74, PW, ["diagonal tegak lurus: tidak harus"], W.putih, 7.8)[0], tanda("dx1", PX + PW - 9, 89, false, 12)),
      tambah(26, kartu("dn", 30, 144, 240, 32, W.merahMuda, ["sembarang jajargenjang", "bukan belah ketupat"], 8.6)),
    ),
    k(
      "Belah ketupat adalah jajargenjang dengan sisi-sisi berurutan sama panjang.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Belah ketupat", 13, W.ungu)),
      tambah(0, rumusBangun("bq", "jajar", "belahKetupat", "jajargenjang", "belah ketupat", ["tambah: sisi berurutan", "sama panjang"]).ke),
      tambah(3, rumusBangun("bq", "jajar", "belahKetupat", "jajargenjang", "belah ketupat", ["tambah: sisi berurutan", "sama panjang"]).dari),
      tambah(5, rumusBangun("bq", "jajar", "belahKetupat", "jajargenjang", "belah ketupat", ["tambah: sisi berurutan", "sama panjang"]).panah),
    ),
  ],
};

function jrBaris() {
  return panelCiri("jr", PX, 38, PW, ["merupakan segi empat", "sisi berhadapan sejajar", "sisi berhadapan sama panjang", "sudut berhadapan sama besar"], W.krem, 7.8, 24, 6).flat();
}

