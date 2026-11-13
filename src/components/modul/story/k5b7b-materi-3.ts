import type { AdeganStory, Obj } from "./logika-story";
import { BENTUK, W, antara, bangun, centangBaris, huruf, jalur, kartu, kotak, panah, panelCiri, poli, rumusBangun, sama, tanda, teks, titikSudut } from "./k5b7b-gambar";
import type { JenisBangun } from "./k5b7b-gambar";
import { bersih, hapus, k, tambah } from "./k5b7b-bantu";

const KIRI = { cx: 62, cy: 102, s: 22 };
const PX = 118;
const PW = 172;

/** Satu baris rumus kecil: bangun asal, panah dengan keterangan, bangun hasil, pada tinggi cy. */
function barisRumus(id: string, cy: number, dari: JenisBangun, ke: JenisBangun, namaDari: string, namaKe: string, label: string): { dari: Obj[]; panah: Obj[]; ke: Obj[] } {
  return {
    dari: [bangun(`${id}a`, dari, 52, cy, 11, W.hijauMuda), teks(`${id}an`, 52, cy + 26, namaDari, 7.8)],
    panah: [panah(`${id}p`, 92, cy, 116, 0, W.ungu, 2.2), teks(`${id}l`, 150, cy - 9, label, 7.6, W.merah)],
    ke: [bangun(`${id}b`, ke, 248, cy, 11, W.krem), teks(`${id}bn`, 248, cy + 26, namaKe, 7.8)],
  };
}

/* ------------------------------ 9. Eksplorasi 7.2F persegi (hlm. 224–229) ------------------------------ */
const sqBentuk = () => [bangun("sq", "persegi", KIRI.cx, KIRI.cy, KIRI.s, W.hijauMuda), ...huruf("sqh", "persegi", KIRI.cx, KIRI.cy, KIRI.s)];
const sqCiri = panelCiri("sc", PX, 34, PW, ["sisi berhadapan sejajar", "semua sisi sama panjang", "semua sudut siku-siku", "4 sumbu simetri", "diagonal sama panjang, tegak lurus"], W.putih, 7.8);
const bkPanel = panelCiri("bp", PX, 38, PW, ["sisi sama panjang", "sudut berhadapan sama besar", "diagonal membagi dua, tegak lurus", "diagonal sumbu simetri"], W.krem, 7.8, 24, 6);
const ppPanel = panelCiri("pq", PX, 34, PW, ["sisi berhadapan sejajar", "sisi berhadapan sama panjang", "semua sudut siku-siku", "diagonal membagi dua sama panjang", "2 simetri lipat"], W.krem, 7.8);
const rBaris = [barisRumus("ra", 58, "jajar", "persegiPanjang", "jajargenjang", "persegi panjang", "tambah: satu sudut siku-siku"), barisRumus("rb", 134, "belahKetupat", "persegi", "belah ketupat", "persegi", "tambah: satu sudut siku-siku")];

export const ADEGAN_PERSEGI: AdeganStory = {
  id: "persegi",
  judul: "Eksplorasi 7.2F: persegi dibandingkan dengan belah ketupat dan persegi panjang",
  sumber: "Buku Siswa hlm. 224–229; Buku Panduan Guru hlm. 330–334",
  latar: "#F0FDF4",
  kutipan: ["Ayo Mengingat Kembali Persegi", "Semua sisinya", "Mempunyai 4", "Sudut-sudutnya", "Apakah sisi-sisi persegi sama panjang", "Apakah A = C", "Apakah diagonal-diagonal persegi", "Persegi adalah belah ketupat yang salah satu", "Persegi adalah persegi panjang yang sisi-sisi", "berurutan sama panjang"],
  ketukan: [
    k(
      "Eksplorasi 7.2F, mengingat kembali persegi. Cirinya: sisi berhadapan sejajar, semua sisi sama panjang, semua sudut siku-siku, empat sumbu simetri, dan diagonal sama panjang serta tegak lurus.",
      tambah(0, teks("jud", 150, 20, "Eksplorasi 7.2F", 12.5, W.ungu)),
      tambah(0, sqBentuk()),
      tambah(6, sqCiri[0]),
      tambah(9, sqCiri[1]),
      tambah(13, sqCiri[2]),
      tambah(16, sqCiri[3]),
      tambah(20, sqCiri[4]),
    ),
    k(
      "Bandingkan dengan belah ketupat. Sisi-sisi persegi sama panjang, ya. Sudut A sama dengan sudut C, dan sudut D sama dengan sudut B.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Ciri belah ketupat", 12.5, W.ungu)),
      tambah(0, sqBentuk(), bkPanel.flat()),
      tambah(6, ...(["AB", "BC", "CD", "DA"] as const).map((s, i) => sama(`s${i}`, "persegi", KIRI.cx, KIRI.cy, KIRI.s, s[0], s[1], 1, W.hijau))),
      tambah(8, centangBaris("w0", PX, 38, PW, 0, true, 24, 6)),
      tambah(10, titikSudut("t1", "persegi", KIRI.cx, KIRI.cy, KIRI.s, "A", W.merah), titikSudut("t3", "persegi", KIRI.cx, KIRI.cy, KIRI.s, "C", W.merah)),
      tambah(17, titikSudut("t4", "persegi", KIRI.cx, KIRI.cy, KIRI.s, "D", W.ungu), titikSudut("t2", "persegi", KIRI.cx, KIRI.cy, KIRI.s, "B", W.ungu)),
      tambah(20, centangBaris("w1", PX, 38, PW, 1, true, 24, 6)),
    ),
    k(
      "Diagonal persegi saling membagi dua sama panjang dan berpotongan tegak lurus. Diagonal persegi juga merupakan sumbu simetri. Jadi persegi dapat digolongkan sebagai belah ketupat.",
      tambah(2, antara("g1", "persegi", KIRI.cx, KIRI.cy, KIRI.s, "A", "C", W.ungu, 1.4, { putus: true }), antara("g2", "persegi", KIRI.cx, KIRI.cy, KIRI.s, "B", "D", W.ungu, 1.4, { putus: true })),
      tambah(10, centangBaris("w2", PX, 38, PW, 2, true, 24, 6)),
      tambah(16, centangBaris("w3", PX, 38, PW, 3, true, 24, 6)),
      tambah(18, kartu("bn", 20, 164, 260, 26, W.hijauMuda, ["persegi termasuk belah ketupat"], 9)),
    ),
    k(
      "Ingat, jajargenjang yang salah satu sudutnya siku-siku menjadi persegi panjang. Dengan cara yang sama, belah ketupat yang salah satu sudutnya siku-siku menjadi persegi.",
      bersih(0),
      tambah(1, rBaris[0].dari),
      tambah(7, rBaris[0].panah),
      tambah(8, rBaris[0].ke),
      tambah(14, rBaris[1].dari),
      tambah(17, rBaris[1].panah),
      tambah(21, rBaris[1].ke),
    ),
    k(
      "Sekarang bandingkan persegi dengan persegi panjang. Sisi berhadapan sama panjang dan sejajar, semua sudut siku-siku, diagonal saling membagi dua sama panjang, dan simetri lipat. Semua ada pada persegi, jadi persegi termasuk persegi panjang.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Ciri persegi panjang", 12.5, W.ungu)),
      tambah(0, sqBentuk()),
      tambah(7, ppPanel[0]),
      tambah(8, ppPanel[1]),
      tambah(10, centangBaris("x0", PX, 34, PW, 0)),
      tambah(11, centangBaris("x1", PX, 34, PW, 1)),
      tambah(12, ppPanel[2]),
      tambah(14, centangBaris("x2", PX, 34, PW, 2)),
      tambah(15, ppPanel[3]),
      tambah(20, centangBaris("x3", PX, 34, PW, 3)),
      tambah(22, ppPanel[4]),
      tambah(23, centangBaris("x4", PX, 34, PW, 4)),
      tambah(28, kartu("bq", 20, 170, 260, 24, W.hijauMuda, ["persegi termasuk persegi panjang"], 9)),
    ),
    k(
      "Agar persegi panjang menjadi persegi, ciri yang ditambahkan adalah sisi-sisi berurutan sama panjang. Jadi persegi adalah persegi panjang yang sisi-sisi berurutannya sama panjang.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Persegi", 13, W.ungu)),
      tambah(1, rumusBangun("rp", "persegiPanjang", "persegi", "persegi panjang", "persegi", ["tambah: sisi berurutan", "sama panjang"]).dari),
      tambah(8, rumusBangun("rp", "persegiPanjang", "persegi", "persegi panjang", "persegi", ["tambah: sisi berurutan", "sama panjang"]).panah),
      tambah(14, rumusBangun("rp", "persegiPanjang", "persegi", "persegi panjang", "persegi", ["tambah: sisi berurutan", "sama panjang"]).ke),
    ),
  ],
};

/* ------------------------------ 10. Eksplorasi 7.2G layang-layang (hlm. 229–232) ------------------------------ */
const LX = 108;
const LW = 184;
const lyBentuk = (cx = 56, cy = 102, s = 24) => [bangun("ly", "layang", cx, cy, s, W.hijauMuda), ...huruf("lyh", "layang", cx, cy, s)];
const lyCiri = panelCiri("lc", LX, 36, LW, ["2 pasang sisi berurutan sama panjang", "sepasang sudut sama besar", "diagonal berpotongan tegak lurus", "salah satu diagonal sumbu simetri"], W.putih, 7.4, 24, 6);
const LAY = BENTUK.layang.pts;

export const ADEGAN_LAYANG: AdeganStory = {
  id: "layang",
  judul: "Eksplorasi 7.2G: layang-layang dibandingkan dengan belah ketupat",
  sumber: "Buku Siswa hlm. 229–232; Buku Panduan Guru hlm. 335–338",
  latar: "#FEF2F2",
  kutipan: ["Ayo Mengingat Kembali Layang-Layang", "memiliki 2 pasang", "sisi berurutan sama", "Garis lipatan yang dihasilkan tersebut dinamakan sumbu simetri", "Layang-layang adalah segiempat yang salah satu", "diagonalnya merupakan sumbu simetri", "digolongkan sebagai layang-", "Belah ketupat adalah layang-layang yang semua", "diagonalnya merupakan sumbu simetri"],
  ketukan: [
    k(
      "Eksplorasi 7.2G, mengingat kembali layang-layang. Cirinya: dua pasang sisi berurutan sama panjang, sepasang sudut sama besar, diagonal berpotongan tegak lurus, dan salah satu diagonalnya sumbu simetri.",
      tambah(0, teks("jud", 150, 20, "Eksplorasi 7.2G", 12.5, W.ungu)),
      tambah(0, lyBentuk()),
      tambah(6, lyCiri[0], sama("m1", "layang", 56, 102, 24, "A", "D", 1, W.merah), sama("m2", "layang", 56, 102, 24, "D", "C", 1, W.merah), sama("m3", "layang", 56, 102, 24, "C", "B", 2, W.hijau), sama("m4", "layang", 56, 102, 24, "B", "A", 2, W.hijau)),
      tambah(12, lyCiri[1], titikSudut("m5", "layang", 56, 102, 24, "A", W.ungu), titikSudut("m6", "layang", 56, 102, 24, "C", W.ungu)),
      tambah(16, lyCiri[2]),
      tambah(21, lyCiri[3]),
    ),
    k(
      "Jika layang-layang dilipat menurut salah satu diagonalnya, kedua bagian tepat berimpit. Jadi layang-layang adalah segi empat yang salah satu diagonalnya merupakan sumbu simetri.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Dilipat menurut diagonal", 12.5, W.ungu)),
      tambah(0, bangun("kb", "layang", 150, 104, 34, W.putih), ...huruf("kbh", "layang", 150, 104, 34)),
      tambah(9, poli("kl", 150, 104, [LAY[0], LAY[1], LAY[3]], 34, W.muda, W.biru, { z: 1 }), poli("kr", 150, 104, [LAY[1], LAY[2], LAY[3]], 34, W.merahMuda, W.biru, { z: 1 })),
      tambah(7, antara("kd", "layang", 150, 104, 34, "D", "B", W.ungu, 2, { putus: true, z: 2 })),
      tambah(10, teks("ks", 150, 170, "garis lipatan = sumbu simetri", 9.6, W.ungu)),
      tambah(21, kartu("kj", 20, 176, 260, 20, W.krem, ["segi empat, satu diagonal sumbu simetri"], 8)),
    ),
    k(
      "Adakah bangun yang cirinya hampir mirip dengan layang-layang? Ada, yaitu belah ketupat. Apakah belah ketupat dapat digolongkan sebagai layang-layang?",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Mirip layang-layang?", 12.5, W.ungu)),
      tambah(0, bangun("ma", "layang", 66, 100, 22, W.hijauMuda), teks("man", 66, 148, "layang-layang", 8.6)),
      tambah(10, bangun("mb", "belahKetupat", 234, 100, 20, W.krem), teks("mbn", 234, 148, "belah ketupat", 8.6)),
      tambah(15, teks("mq", 150, 106, "?", 24, W.merah)),
    ),
    k(
      "Pertama, belah ketupat punya dua pasang sisi berurutan yang sama panjang. Kedua, ada sepasang sudut berhadapan yang sama besar, yaitu sudut A dengan B, dan sudut C dengan D.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Belah ketupat", 12.5, W.ungu)),
      tambah(0, bangun("bb", "belahKetupat", 150, 100, 32, W.hijauMuda), ...huruf("bbh", "belahKetupat", 150, 100, 32)),
      tambah(4, ...(["AC", "CB", "BD", "DA"] as const).map((s, i) => sama(`bs${i}`, "belahKetupat", 150, 100, 32, s[0], s[1], 1, W.hijau))),
      tambah(10, teks("bt", 150, 160, "4 sisi sama panjang", 9.6, W.hijau)),
      tambah(21, titikSudut("bd1", "belahKetupat", 150, 100, 32, "A", W.merah), titikSudut("bd2", "belahKetupat", 150, 100, 32, "B", W.merah)),
      tambah(26, titikSudut("bd3", "belahKetupat", 150, 100, 32, "C", W.ungu), titikSudut("bd4", "belahKetupat", 150, 100, 32, "D", W.ungu)),
    ),
    k(
      "Ketiga, diagonal belah ketupat berpotongan saling tegak lurus. Keempat, diagonal AB dan DC merupakan sumbu simetri. Jadi semua ciri layang-layang dimiliki belah ketupat.",
      hapus(0, "bt"),
      tambah(1, antara("dg1", "belahKetupat", 150, 100, 32, "A", "B", W.ungu, 1.6, { putus: true }), antara("dg2", "belahKetupat", 150, 100, 32, "C", "D", W.ungu, 1.6, { putus: true })),
      tambah(6, jalur("dsk", 150, 100, "M6 0 L6 -6 L0 -6", "none", W.merah, { tebal: 1.4 })),
      tambah(12, teks("dt", 150, 160, "AB dan DC: sumbu simetri", 9.6, W.ungu)),
      tambah(17, teks("dv", 150, 182, "✓ ✓ ✓ ✓", 13, W.hijau)),
    ),
    k(
      "Maka belah ketupat dapat digolongkan sebagai layang-layang. Ciri yang harus ditambahkan pada layang-layang agar menjadi belah ketupat adalah semua diagonalnya merupakan sumbu simetri.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Belah ketupat", 13, W.ungu)),
      tambah(1, rumusBangun("rl", "layang", "belahKetupat", "layang-layang", "belah ketupat", ["tambah: semua diagonal", "sumbu simetri"]).ke),
      tambah(6, rumusBangun("rl", "layang", "belahKetupat", "layang-layang", "belah ketupat", ["tambah: semua diagonal", "sumbu simetri"]).dari),
      tambah(17, rumusBangun("rl", "layang", "belahKetupat", "layang-layang", "belah ketupat", ["tambah: semua diagonal", "sumbu simetri"]).panah),
    ),
  ],
};

/* ------------------------------ 11. Refleksi, miskonsepsi, dan diferensiasi (hlm. 233; Buku Panduan Guru hlm. 338–339) ------------------------------ */
const REFLEKSI = [
  ["6", "membandingkan trapesium dan jajargenjang"],
  ["7", "membandingkan persegi panjang dan jajargenjang"],
  ["8", "membandingkan belah ketupat dan jajargenjang"],
  ["9", "membandingkan persegi dengan belah ketupat, persegi panjang"],
  ["10", "membandingkan layang-layang dan belah ketupat"],
];
const barisRefleksi = (i: number): Obj[] => [
  kotak(`rf${i}-k`, 14, 34 + i * 30, 272, 26, W.putih, W.biru, { rx: 6, tebal: 1.2 }),
  teks(`rf${i}-n`, 28, 51 + i * 30, REFLEKSI[i][0], 9.4, W.merah),
  teks(`rf${i}-t`, 44, 51 + i * 30, REFLEKSI[i][1], 6.6, W.biru, { anchor: "start" }),
];

export const ADEGAN_REFLEKSI: AdeganStory = {
  id: "refleksi",
  judul: "Refleksi Sub-Bab B, miskonsepsi, dan diferensiasi",
  sumber: "Buku Siswa hlm. 233; Buku Panduan Guru hlm. 338–339, 343",
  latar: "#EEF2FF",
  kutipan: ["Aku bisa membandingkan ciri-ciri trapesium dan", "Aku bisa membandingkan ciri-ciri persegi panjang", "Aku bisa membandingkan ciri-ciri belah ketupat dan", "Aku bisa membandingkan ciri-ciri persegi dengan", "Aku bisa membandingkan ciri-ciri layang-layang dan", "Miskonsepsi", "terbolak-balik", "alat peraga individual"],
  ketukan: [
    k(
      "Setelah mempelajari Sub-Bab B, saatnya refleksi. Isilah tabel dengan tanda centang. Pernyataan nomor enam sampai sepuluh.",
      tambah(0, teks("jud", 150, 22, "Refleksi Sub-Bab B", 13, W.ungu)),
      tambah(11, barisRefleksi(0)),
      tambah(12, barisRefleksi(1)),
      tambah(13, barisRefleksi(2)),
      tambah(14, barisRefleksi(3)),
      tambah(15, barisRefleksi(4)),
    ),
    k(
      "Aku bisa membandingkan ciri-ciri trapesium, persegi panjang, belah ketupat, persegi, dan layang-layang dengan bangun lain.",
      tambah(4, tanda("rc0", 272, 52, true, 14)),
      tambah(5, tanda("rc1", 272, 82, true, 14)),
      tambah(7, tanda("rc2", 272, 112, true, 14)),
      tambah(9, tanda("rc3", 272, 142, true, 14)),
      tambah(11, tanda("rc4", 272, 172, true, 14)),
    ),
    k(
      "Buku Panduan Guru menyebut dua miskonsepsi. Pertama, siswa terbolak-balik: kalau semua ciri persegi panjang ada pada persegi, yang benar persegi termasuk persegi panjang, bukan sebaliknya.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Miskonsepsi pertama: terbolak-balik", 12, W.ungu)),
      tambah(12, bangun("ka", "persegiPanjang", 60, 92, 15, W.krem), teks("kat", 60, 124, "persegi panjang", 8.2)),
      tambah(16, bangun("kb", "persegi", 240, 92, 15, W.hijauMuda), teks("kbt", 240, 124, "persegi", 8.2)),
      tambah(20, panah("kp1", 214, 84, -126, 0, W.hijau, 2.2), teks("kp1t", 150, 76, "persegi termasuk PP ✓", 8.2, W.hijau)),
      tambah(23, panah("kp2", 98, 104, 110, 0, W.merah, 2.2), teks("kp2t", 150, 124, "terbalik ✗", 8.6, W.merah)),
    ),
    k(
      "Kedua, siswa sulit menyebutkan ciri tambahan. Agar jajargenjang menjadi persegi panjang, salah satu sudutnya harus siku-siku. Guru bisa memberi petunjuk atau alat peraga yang dapat diraba.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Miskonsepsi kedua: ciri tambahan", 12, W.ungu)),
      tambah(7, rumusBangun("rq", "jajar", "persegiPanjang", "jajargenjang", "persegi panjang", ["tambah: satu sudut", "siku-siku"]).dari),
      tambah(9, rumusBangun("rq", "jajar", "persegiPanjang", "jajargenjang", "persegi panjang", ["tambah: satu sudut", "siku-siku"]).ke),
      tambah(14, rumusBangun("rq", "jajar", "persegiPanjang", "jajargenjang", "persegi panjang", ["tambah: satu sudut", "siku-siku"]).panah),
      tambah(20, kartu("ap", 50, 150, 200, 34, W.krem, ["alat peraga individual", "yang bisa diraba langsung"], 8.6)),
    ),
  ],
};

/* ------------------------------ 12. Uji Kompetensi dan pengayaan (hlm. 234; Buku Panduan Guru hlm. 339–343) ------------------------------ */
const KUNCI_UK = [false, false, true, true, false, true, true, false, false, true];
const chip = (i: number): Obj[] => {
  const x = 15 + (i % 5) * 55;
  const y = 32 + Math.floor(i / 5) * 34;
  return [kotak(`ch${i}-k`, x, y, 50, 28, W.putih, W.biru, { rx: 6, tebal: 1.2 }), teks(`ch${i}-n`, x + 14, y + 19, String(i + 1), 10, W.biru)];
};
const jawab = (i: number): Obj => {
  const x = 15 + (i % 5) * 55;
  const y = 32 + Math.floor(i / 5) * 34;
  return teks(`aw${i}`, x + 36, y + 19, KUNCI_UK[i] ? "B" : "S", 10.4, KUNCI_UK[i] ? W.hijau : W.merah);
};
const semuaChip = Array.from({ length: 10 }, (_, i) => chip(i)).flat();

export const ADEGAN_UJI: AdeganStory = {
  id: "uji",
  judul: "Uji Kompetensi, kunci jawaban, dan soal pengayaan",
  sumber: "Buku Siswa hlm. 234; Buku Panduan Guru hlm. 339–343",
  latar: "#FFFBEB",
  kutipan: ["Uji Kompetensi", "Benar atau salahkah pernyataan-pernyataan berikut ini", "Aku dapat membuat bentuk segitiga", "5 cm, 7 cm, dan 1 cm", "Besar tiga sudut dalam segitiga jika", "Segitiga sama sisi juga dapat digolongkan", "Jajargenjang merupakan trapesium sama", "Persegi panjang adalah jajargenjang yang", "Belah ketupat dapat digolongkan sebagai", "Persegi tidak dapat disebut persegi panjang", "Persegi bukan belah ketupat", "Salah satu diagonal pada layang-layang", "Soal Pengayaan", "Memiliki 2 sudut yang besarnya", "Jajargenjang", "Trapesium sama kaki"],
  ketukan: [
    k(
      "Uji Kompetensi berisi sepuluh pernyataan benar atau salah. Setiap jawaban yang tepat mendapat skor satu.",
      tambah(0, teks("jud", 150, 20, "Uji Kompetensi", 12.5, W.ungu)),
      tambah(3, semuaChip),
      tambah(13, teks("sk", 150, 124, "skor: 10 x 1 = 10", 11, W.merah)),
      tambah(13, teks("lg", 150, 146, "B = benar    S = salah", 9.4, W.biru)),
    ),
    k(
      "Nomor satu: segitiga dari ruas garis 5 sentimeter, 7 sentimeter, dan 1 sentimeter. Karena 5 ditambah 1 sama dengan 6, yang kurang dari 7, segitiga tidak dapat dibentuk. Jawabannya salah.",
      hapus(0, "sk", "lg"),
      tambah(6, teks("n1a", 150, 124, "5 cm, 7 cm, 1 cm", 10.4, W.biru)),
      tambah(14, teks("n1b", 150, 144, "5 + 1 = 6", 11, W.merah)),
      tambah(20, teks("n1c", 150, 164, "6 < 7", 11, W.merah)),
      tambah(28, jawab(0)),
    ),
    k(
      "Nomor dua: semua sudut pada segitiga siku-siku adalah sudut siku-siku. Salah, hanya satu sudutnya. Nomor tiga: jumlah ketiga sudut segitiga adalah 180 derajat. Benar.",
      hapus(0, "n1a", "n1b", "n1c"),
      tambah(10, jawab(1)),
      tambah(11, teks("n2a", 150, 130, "segitiga siku-siku: 1 sudut siku-siku", 9, W.merah)),
      tambah(21, teks("n3a", 150, 156, "jumlah tiga sudut segitiga: 180°", 9.6, W.hijau)),
      tambah(23, jawab(2)),
    ),
    k(
      "Nomor empat: segitiga sama sisi juga termasuk segitiga sama kaki. Benar. Nomor lima: jajargenjang adalah trapesium sama kaki. Salah, karena sudut alasnya tidak sama besar.",
      hapus(0, "n2a", "n3a"),
      tambah(6, teks("n4a", 150, 130, "sama sisi termasuk sama kaki", 9.6, W.hijau)),
      tambah(10, jawab(3)),
      tambah(18, jawab(4)),
      tambah(20, teks("n5a", 150, 156, "jajargenjang: sudut alas tidak sama besar", 9, W.merah)),
    ),
    k(
      "Nomor enam: persegi panjang adalah jajargenjang yang salah satu sudutnya siku-siku. Benar. Nomor tujuh: belah ketupat dapat digolongkan sebagai jajargenjang dan juga layang-layang. Benar.",
      hapus(0, "n4a", "n5a"),
      tambah(5, teks("n6a", 150, 130, "persegi panjang: jajargenjang bersudut siku", 9, W.hijau)),
      tambah(11, jawab(5)),
      tambah(19, teks("n7a", 150, 156, "belah ketupat: jajargenjang dan layang-layang", 9, W.hijau)),
      tambah(23, jawab(6)),
    ),
    k(
      "Nomor delapan: persegi tidak dapat disebut persegi panjang. Salah. Nomor sembilan: persegi bukan belah ketupat. Salah. Nomor sepuluh: salah satu diagonal layang-layang merupakan sumbu simetri. Benar.",
      hapus(0, "n6a", "n7a"),
      tambah(7, teks("n8a", 150, 126, "persegi termasuk persegi panjang", 9.4, W.merah)),
      tambah(8, jawab(7)),
      tambah(14, teks("n9a", 150, 146, "persegi termasuk belah ketupat", 9.4, W.merah)),
      tambah(15, jawab(8)),
      tambah(24, teks("n10a", 150, 166, "layang-layang: satu diagonal sumbu simetri", 9, W.hijau)),
      tambah(25, jawab(9)),
    ),
    k(
      "Pengayaan nomor satu: bangun bersisi tiga dengan dua sudut 45 derajat. Karena 45 ditambah 45 sama dengan 90, sudut ketiganya 90 derajat. Jadi segitiga lancip salah, sama kaki benar, siku-siku sama kaki benar.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Pengayaan 1", 12.5, W.ungu)),
      tambah(3, poli("sg", 62, 104, [[-1.2, 0.9], [1.2, 0.9], [-1.2, -1.5]], 26, W.hijauMuda, W.biru)),
      tambah(8, teks("ga", 74, 122, "45°", 8.4, W.merah), teks("gb", 38, 86, "45°", 8.4, W.merah)),
      tambah(12, teks("e1", 205, 52, "45 + 45 = 90", 11, W.biru)),
      tambah(18, teks("gc", 47, 118, "90°", 8.4, W.merah), jalur("sk1", 30.8, 127.4, "M6 0 L6 -6 L0 -6", "none", W.merah, { tebal: 1.4 })),
      tambah(24, panelCiri("pg", PX, 70, PW, ["i. segitiga lancip"], W.putih, 7.8)[0], centangBaris("pc0", PX, 70, PW, 0, false)),
      tambah(26, panelCiri("ph", PX, 97, PW, ["ii. segitiga sama kaki"], W.putih, 7.8)[0], centangBaris("pc1", PX, 70, PW, 1, true)),
      tambah(30, panelCiri("pi", PX, 124, PW, ["iii. siku-siku sama kaki"], W.putih, 7.8)[0], centangBaris("pc2", PX, 70, PW, 2, true)),
    ),
    k(
      "Pengayaan nomor dua: bangun bersisi empat dengan setidaknya sepasang sisi sejajar dan sepasang sisi sama panjang. Jajargenjang benar, layang-layang salah, trapesium sama kaki benar.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Pengayaan 2", 12.5, W.ungu)),
      tambah(7, ...panelCiri("qa", 20, 30, 260, ["setidaknya sepasang sisi sejajar"], W.krem, 8)[0]),
      tambah(12, ...panelCiri("qb", 20, 56, 260, ["setidaknya sepasang sisi sama panjang"], W.krem, 8)[0]),
      tambah(16, bangun("qj", "jajar", 50, 116, 15, W.hijauMuda), teks("qjt", 50, 148, "jajargenjang", 8.2), tanda("qjc", 50, 176, true, 16)),
      tambah(18, bangun("ql", "layang", 150, 116, 15, W.merahMuda), teks("qlt", 150, 148, "layang-layang", 8.2), tanda("qlc", 150, 176, false, 16)),
      tambah(20, bangun("qs", "samaKaki", 250, 116, 15, W.hijauMuda), teks("qst", 250, 148, "trapesium sama kaki", 8.2), tanda("qsc", 250, 176, true, 16)),
    ),
  ],
};

