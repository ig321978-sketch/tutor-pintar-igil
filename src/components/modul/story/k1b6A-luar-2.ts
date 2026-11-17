import type { AdeganStory, Obj } from "./logika-story";
import { E, W, bulat, cubit, emo, garisBilangan, judul, kartu, kelereng, kisi, nampan, orang, panah, teks, xGaris, type Titik } from "./k1b6A-gambar";
import { NAMA_METODE, NAMA_METODE_ID, WARNA_METODE, kepala } from "./k1b6A-luar-1";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k1b6A-bantu";

/* Video metode global Sub-Bab A "Dua Nampan Kue": Number Line Difference, Equalizing, dan ringkasan. */

/* ------------------------------ 4. Number Line Difference: konsep ------------------------------ */
const GB = { x0: 46, y: 132, dari: 6, sampai: 12, jarak: 34 };
const gx = (n: number): number => xGaris(GB.x0, GB.dari, GB.jarak, n);
const garis1 = (): Obj[] => garisBilangan("gb", GB.x0, GB.y, GB.dari, GB.sampai, GB.jarak);
const lompat = (id: string, dari: number, ke: number, y = 116): Obj => panah(id, gx(dari) + 4, y, gx(ke) - 3, y);
const titikGaris = (id: string, n: number, warna: string): Obj => bulat(id, gx(n), GB.y, 5, warna, W.putih, { tebal: 1.4 });

const SUARA_G1 = "Metode kedua, Number Line Difference, atau Selisih di Garis Bilangan.";
const SUARA_G2 = "Tandai dua bilangan di garis. Selisihnya adalah banyak langkah dari bilangan kecil ke bilangan besar.";
const SUARA_G3 = "Dari delapan ke sebelas ada tiga langkah ke kanan.";
const SUARA_G4 = "Jadi selisih delapan dan sebelas adalah tiga.";

export const ADEGAN_LUAR_GARIS: AdeganStory = {
  id: "luar-garis",
  judul: "Number Line Difference: selisih di garis bilangan",
  sumber: "Metode global: Number Line Difference",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_G1,
      tambah("kedua,", ...kepala(1)),
      tambah("Number", ...garis1()),
      tambah("Selisih", teks("lk", 150, 96, "langkah di garis", 11, W.ungu)),
    ),
    k(
      SUARA_G2,
      hapus(0, "lk"),
      tambah("dua", teks("b2", 150, 76, "2 bilangan", 11, W.ungu)),
      tambah("garis.", titikGaris("sa", 7, W.biru), titikGaris("sb", 11, W.merah)),
      tambah("langkah", panah("sk", gx(7) + 4, 112, gx(11) - 4, 112, W.hijau, 2.4)),
      sorotkan("kecil", "sa"),
      sorotkan("besar.", "sb"),
    ),
    k(
      SUARA_G3,
      hapus(0, "sa", "sb", "sk", "b2"),
      tambah("delapan", titikGaris("ma", 8, W.biru)),
      tambah("sebelas", titikGaris("mb", 11, W.merah)),
      tambah("tiga", lompat("h1", 8, 9), lompat("h2", 9, 10), lompat("h3", 10, 11)),
      tambah("langkah", teks("lg", 150, 96, "3 langkah", 11, W.merah)),
    ),
    k(
      SUARA_G4,
      tambah("selisih", ...kartu("sd", 50, 52, 200, 26, W.emas, ["selisih 8 dan 11"], 11)),
      tambah("tiga.", teks("k3", 150, 176, "= 3", 24, W.merah)),
    ),
  ],
};

/* ------------------------------ 5. Number Line Difference: terapan ------------------------------ */
const GT = { x0: 46, y: 132, dari: 8, sampai: 14, jarak: 34 };
const tx = (n: number): number => xGaris(GT.x0, GT.dari, GT.jarak, n);
const SUARA_H1 = "Kaka mencari selisih balon biru sembilan dan balon merah tiga belas.";
const SUARA_H2 = "Dari sembilan melompat ke sepuluh, sebelas, dua belas, tiga belas. Empat langkah.";
const SUARA_H3 = "Cara ini cepat kalau kedua bilangan berdekatan.";
const SUARA_H4 = "Kalau jauh, langkahnya banyak dan mudah terlewat, jadi kurang cocok.";
const balon = (id: string, n: number, warna: string): Obj[] => [panah(`${id}-t`, tx(n), 98, tx(n), 124, W.abu, 1), bulat(id, tx(n), 88, 9, warna, W.biru, { tebal: 1.4 })];
const hop = (id: string, dari: number, ke: number): Obj => panah(id, tx(dari) + 4, 116, tx(ke) - 3, 116, W.hijau, 2.2);

export const ADEGAN_LUAR_GARIS_TERAPAN: AdeganStory = {
  id: "luar-garis-terapan",
  judul: "Number Line Difference: dua balon",
  sumber: "Metode global: Number Line Difference, terapan",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, ...kepala(1), ...garisBilangan("gb", GT.x0, GT.y, GT.dari, GT.sampai, GT.jarak)),
      tambah("Kaka", ...orang("kk", 26, 176, E.kaka, "Kaka")),
      tambah("biru", ...balon("bb", 9, "#60A5FA")),
      tambah("merah", ...balon("bm", 13, "#F87171")),
    ),
    k(
      SUARA_H2,
      tambah("melompat", bulat("mk", tx(9), GT.y, 5, W.hijau, W.putih, { tebal: 1.4 })),
      tambah("sepuluh,", hop("h1", 9, 10)),
      ubah("sepuluh,", { id: "mk", x: tx(10) }),
      tambah("sebelas,", hop("h2", 10, 11)),
      ubah("sebelas,", { id: "mk", x: tx(11) }),
      tambah(7, hop("h3", 11, 12)),
      ubah(7, { id: "mk", x: tx(12) }),
      tambah(9, hop("h4", 12, 13)),
      ubah(9, { id: "mk", x: tx(13) }),
      tambah("Empat", teks("l4", 150, 66, "4 langkah", 12, W.merah)),
    ),
    k(
      SUARA_H3,
      hapus(0, "l4"),
      tambah("cepat", emo("ok", 262, 170, E.benar, 24)),
      tambah("berdekatan.", ...kartu("dk", 40, 160, 190, 24, W.hijauMuda, ["cepat: bilangan dekat"], 9.6)),
    ),
    k(
      SUARA_H4,
      bersih(0),
      tambah(0, ...kepala(1), ...garisBilangan("gj", 20, 132, 0, 20, 13.5)),
      tambah("jauh,", bulat("ja", 20 + 2 * 13.5, 132, 4, W.biru, W.putih, { tebal: 1.2 }), bulat("jb", 20 + 19 * 13.5, 132, 4, W.merah, W.putih, { tebal: 1.2 })),
      tambah("langkahnya", panah("jl", 20 + 2 * 13.5 + 4, 116, 20 + 19 * 13.5 - 4, 116, W.hijau, 2.2)),
      tambah("banyak", teks("jt", 150, 100, "17 langkah", 11, W.merah)),
      tambah("terlewat,", emo("jq", 150, 176, E.pikir, 24)),
      tambah("kurang", ...kartu("jk", 190, 160, 100, 24, W.merahMuda, ["kurang cocok"], 9.6)),
    ),
  ],
};

/* ------------------------------ 6. Equalizing: konsep ------------------------------ */
const TA: Titik[] = kisi(5, 26, 74, 6, 18, 18);
const TB: Titik[] = kisi(9, 178, 74, 6, 18, 18);
const TAMBAH: Titik[] = kisi(9, 26, 74, 6, 18, 18).slice(5, 9);
const dua = (): Obj[] => [...nampan("na", 14, 60, 120, 46), ...nampan("nb", 166, 60, 120, 46), ...TA.map((p, i) => cubit(`a${i}`, p.x, p.y)), ...TB.map((p, i) => cubit(`b${i}`, p.x, p.y))];
const SUARA_Z1 = "Metode ketiga, Equalizing, atau Menyamakan. Tambahkan ke kumpulan yang sedikit sampai sama banyak.";
const SUARA_Z2 = "Banyak benda yang ditambahkan itulah selisihnya.";
const SUARA_Z3 = "Bisa juga mengambil dari yang banyak sampai sama dengan yang sedikit.";
const SUARA_Z4 = "Hasilnya sama saja, dan selisihnya tetap.";

export const ADEGAN_LUAR_SAMAKAN: AdeganStory = {
  id: "luar-samakan",
  judul: "Equalizing: menyamakan",
  sumber: "Metode global: Equalizing",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_Z1,
      tambah("ketiga,", ...kepala(2)),
      tambah("kumpulan", ...dua()),
      sorotkan("sedikit", "na"),
      tambah("sama", ...kartu("sm", 96, 122, 108, 22, W.emas, ["sama banyak"], 10)),
    ),
    k(
      SUARA_Z2,
      tambah("ditambahkan", ...TAMBAH.map((p, i) => cubit(`t${i}`, p.x, p.y, 1, { warna: "#86EFAC" }))),
      sorotkan("itulah", "t0", "t1", "t2", "t3"),
      tambah("selisihnya.", teks("se", 150, 170, "yang ditambah = selisih", 11, W.merah)),
    ),
    k(
      SUARA_Z3,
      bersih(0),
      tambah(0, ...kepala(2), ...dua()),
      tambah("mengambil", ...kartu("am", 85, 122, 130, 22, W.pink, ["ambil dari yang banyak"], 8.6)),
      ubah("banyak", ...[5, 6, 7, 8].map((i) => ({ id: `b${i}`, y: 54 }))),
      tambah("sedikit.", emo("ok", 150, 176, E.benar, 22)),
    ),
    k(
      SUARA_Z4,
      bersih(0),
      tambah(0, ...kepala(2)),
      tambah("Hasilnya", ...kartu("z1", 20, 56, 260, 30, W.hijauMuda, ["tambah: sama banyak"], 10.4)),
      tambah("sama", ...kartu("z2", 20, 100, 260, 30, W.pink, ["ambil: sama banyak"], 10.4)),
      tambah("tetap.", ...kartu("z3", 60, 144, 180, 30, W.emas, ["selisih tetap sama"], 10.4)),
    ),
  ],
};

/* ------------------------------ 7. Equalizing: terapan pada kelereng ------------------------------ */
const SUARA_R1 = "Igil punya empat belas kelereng dan Abang sepuluh kelereng.";
const SUARA_R2 = "Abang menambah satu, dua, tiga, empat kelereng sampai sama, empat belas.";
const SUARA_R3 = "Empat kelereng yang ditambahkan adalah selisihnya.";
const SUARA_R4 = "Cocok untuk benda yang bisa dipindah. Kurang cocok kalau yang ada hanya angka.";
const KI: Titik[] = kisi(14, 26, 80, 7, 16, 16);
const KA: Titik[] = kisi(14, 172, 80, 7, 16, 16);
const BARU: Titik[] = KA.slice(10, 14);

export const ADEGAN_LUAR_SAMAKAN_TERAPAN: AdeganStory = {
  id: "luar-samakan-terapan",
  judul: "Equalizing: kelereng Igil dan Abang",
  sumber: "Metode global: Equalizing, terapan",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, ...kepala(2), ...nampan("ni", 14, 66, 128, 50), ...nampan("nb", 160, 66, 128, 50)),
      tambah("Igil", ...orang("ig", 30, 164, E.igil, "Igil")),
      tambah("belas", ...kelereng("ki", KI, "#38BDF8"), teks("m14", 78, 58, "14", 12, W.biru)),
      tambah("Abang", ...orang("ab", 270, 164, E.abang, "Abang")),
      tambah("sepuluh", ...kelereng("ka", KA.slice(0, 10), "#F472B6"), teks("m10", 224, 58, "10", 12, W.merah)),
    ),
    k(
      SUARA_R2,
      tambah(2, bulat("n0", BARU[0].x, BARU[0].y, 5, "#4ADE80", W.biru, { tebal: 1.2 }), teks("c1", BARU[0].x, 112, "1", 9, W.hijau)),
      tambah(3, bulat("n1", BARU[1].x, BARU[1].y, 5, "#4ADE80", W.biru, { tebal: 1.2 }), teks("c2", BARU[1].x, 112, "2", 9, W.hijau)),
      tambah(4, bulat("n2", BARU[2].x, BARU[2].y, 5, "#4ADE80", W.biru, { tebal: 1.2 }), teks("c3", BARU[2].x, 112, "3", 9, W.hijau)),
      tambah(5, bulat("n3", BARU[3].x, BARU[3].y, 5, "#4ADE80", W.biru, { tebal: 1.2 }), teks("c4", BARU[3].x, 112, "4", 9, W.hijau)),
      tambah(10, teks("m14b", 224, 140, "sama: 14", 12, W.hijau)),
    ),
    k(
      SUARA_R3,
      hapus(0, "c1", "c2", "c3", "c4"),
      sorotkan("kelereng", "n0", "n1", "n2", "n3"),
      tambah("ditambahkan", ...kartu("sk", 80, 140, 90, 24, W.emas, ["selisih = 4"], 11)),
    ),
    k(
      SUARA_R4,
      hapus(0, "sk-k", "sk-t0", "m14b", "ig", "ig-n", "ab", "ab-n"),
      tambah("Cocok", emo("ok", 20, 142, E.benar, 20), ...kartu("cc", 40, 132, 220, 24, W.hijauMuda, ["benda nyata: cocok"], 9.6)),
      tambah("Kurang", emo("sl", 20, 172, E.salah, 20), ...kartu("kc", 40, 162, 220, 24, W.merahMuda, ["hanya angka: kurang cocok"], 9.6)),
    ),
  ],
};

/* ------------------------------ 8. Ringkasan ------------------------------ */
const SUARA_Y1 = "Kita sudah melihat tiga metode. Mana yang paling pas? Itu tergantung masalahnya.";
const SUARA_Y2 = "Kalau dua bilangan berdekatan, pakai garis bilangan. Kalau ingin terlihat jelas, pakai batang.";
const SUARA_Y3 = "Kalau bendanya nyata dan bisa dipindah, pakai Menyamakan.";
const SUARA_Y4 = "Menurutmu, untuk membandingkan bilangan tiga dan lima belas, kamu pilih yang mana?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode global",
  sumber: "Ringkasan metode global",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_Y1,
      tambah(0, judul("Ringkasan")),
      tambah("tiga", emo("rk", 150, 80, E.bintang, 40), ...kartu("rt", 60, 100, 180, 26, W.emas, ["3 metode global"], 10)),
      tambah("pas?", teks("rq", 150, 154, "mana yang pas?", 11, W.ungu)),
      tambah("tergantung", teks("rm", 150, 178, "tergantung masalahnya", 10, W.biru)),
    ),
    k(
      SUARA_Y2,
      bersih(0),
      tambah(0, judul("Ringkasan")),
      tambah("dua", ...kartu("r1", 14, 38, 272, 44, WARNA_METODE[1], [NAMA_METODE[1], "2 bilangan berdekatan"], 9.4)),
      tambah("batang.", ...kartu("r0", 14, 90, 272, 44, WARNA_METODE[0], [NAMA_METODE[0], "ingin terlihat jelas"], 9.4)),
    ),
    k(
      SUARA_Y3,
      tambah("bendanya", ...kartu("r2", 14, 142, 272, 44, WARNA_METODE[2], [NAMA_METODE[2], "benda nyata, bisa dipindah"], 9.4)),
    ),
    k(
      SUARA_Y4,
      bersih(0),
      tambah(0, judul("Pilih yang mana?")),
      tambah("tiga", teks("p3", 90, 66, "3", 30, W.merah)),
      tambah(5, teks("pd", 150, 64, "dan", 12, W.biru)),
      tambah("lima", teks("p15", 210, 66, "15", 30, W.merah)),
      tambah("pilih", ...NAMA_METODE.map((_, i) => kartu(`q${i}`, 40, 84 + i * 38, 220, 34, WARNA_METODE[i], [NAMA_METODE[i], NAMA_METODE_ID[i]], 8.6)).flat()),
    ),
  ],
};
