import type { AdeganStory } from "./logika-story";
import { E, W, barisTabel, emo, judul, kartu, kerangkaTabel, kotak, lantai, simpul, tali, teks, tokoh } from "./k5b2e-gambar";
import { NAMA_METODE, NAMA_METODE_ID } from "./k5b2e-luar-1";
import { bersih, hapus, k, sorotkan, tambah, warnai } from "./k5b2e-bantu";

/*
 * Cerita orisinal IGIL "Papan Bilangan Kak Lintang" (Kelas 5 Bab 2 Sub-Bab E), akhir cerita Pasar Kuliner Malam.
 * Video kedua: tiga metode global (Sieve It, Factor Tree, Divide Down), terpisah dari video materi.
 * Naskah suara dari naskah/story-naskah-k5b2e.md. Bagian ini: Factor Tree (konsep dan terapan Bima), Divide Down (konsep dan terapan Fajar), dan ringkasan.
 */

/* ------------------------------ Factor Tree: konsep ------------------------------ */
const SUARA_POHON1 = "Cara kedua, Factor Tree, atau Pohon Faktor.";
const SUARA_POHON2 = "Kita memecah bilangan menjadi dua faktor, lalu memecah lagi sampai semua ujungnya prima.";
const SUARA_POHON3 = "Bilangan prima yang ada di ujung adalah faktorisasi prima, dan hasil kalinya adalah bilangan semula.";
const SUARA_POHON4 = "Bentuk pohonnya boleh berbeda, tetapi daun primanya selalu sama.";

export const ADEGAN_LUAR_POHON: AdeganStory = {
  id: "luar-pohon",
  judul: "Cara kedua: pohon faktor",
  sumber: "Metode global: Factor Tree, konsep",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_POHON1,
      tambah(0, judul("Factor Tree"), ...lantai("lt", 156), ...tokoh("kl", 262, 184, "Kak Lintang")),
      tambah("kedua", emo("tg", 40, 74, E.pohon, 26), teks("n1", 40, 96, "cara 2", 9, W.coklat)),
      tambah("Factor", ...kartu("m", 70, 44, 190, 64, "#DCFCE7", [NAMA_METODE[1], NAMA_METODE_ID[1]], 12)),
      tambah("Pohon", emo("sa", 150, 130, E.kilau, 16)),
    ),
    k(
      SUARA_POHON2,
      bersih(0),
      tambah(0, judul("Memecah Sampai Prima"), ...lantai("lt", 156), ...tokoh("kl", 262, 184, "Kak Lintang")),
      tambah("bilangan", ...simpul("r", 150, 44, 20, false)),
      tambah("dua", tali("ta", 150, 44, 118, 80), tali("tb", 150, 44, 182, 80), ...simpul("a", 118, 80, 2, true), ...simpul("b", 182, 80, 10, false)),
      tambah("lagi", tali("tc", 182, 80, 160, 116), tali("td", 182, 80, 204, 116), ...simpul("c", 160, 116, 2, true), ...simpul("d", 204, 116, 5, true)),
      sorotkan("prima", "a", "c", "d"),
    ),
    k(
      SUARA_POHON3,
      sorotkan("ujung", "a", "c", "d"),
      tambah("faktorisasi", teks("rm", 150, 152, "2 × 2 × 5", 12, W.merahTua)),
      tambah("hasil", teks("rn", 150, 168, "= 20", 12, W.merah)),
      sorotkan("semula", "r"),
    ),
    k(
      SUARA_POHON4,
      bersih(0),
      tambah(0, judul("Bentuk Boleh Berbeda"), ...lantai("lt", 156), ...tokoh("kl", 262, 184, "Kak Lintang")),
      tambah("pohonnya", ...simpul("ar", 75, 44, 20, false), tali("ata", 75, 44, 50, 80), tali("atb", 75, 44, 100, 80), ...simpul("aa", 50, 80, 2, true), ...simpul("ab", 100, 80, 10, false), tali("atc", 100, 80, 85, 116), tali("atd", 100, 80, 115, 116), ...simpul("ac", 85, 116, 2, true), ...simpul("ad", 115, 116, 5, true)),
      tambah("berbeda,", ...simpul("br", 225, 44, 20, false), tali("bta", 225, 44, 200, 80), tali("btb", 225, 44, 250, 80), ...simpul("ba", 200, 80, 4, false), ...simpul("bb", 250, 80, 5, true), tali("btc", 200, 80, 185, 116), tali("btd", 200, 80, 215, 116), ...simpul("bc", 185, 116, 2, true), ...simpul("bd", 215, 116, 2, true)),
      sorotkan("daun", "aa", "ac", "ad", "bb", "bc", "bd"),
      tambah("sama", teks("ds", 150, 150, "daun: 2, 2, 5", 11, W.hijauTua)),
    ),
  ],
};

/* ------------------------------ Factor Tree: terapan Bima ------------------------------ */
const SUARA_POHONT1 = "Bima membuat pohon faktor dua puluh empat: dua belas dan dua, lalu dua belas menjadi dua dan enam.";
const SUARA_POHONT2 = "Daunnya dua, dua, dua, tiga, jadi faktorisasinya dua kali dua kali dua kali tiga.";
const SUARA_POHONT3 = "Cocok untuk bilangan besar, karena kita memecah satu langkah pada satu waktu.";
const SUARA_POHONT4 = "Kurang cocok kalau kita ingin cepat untuk bilangan kecil, karena menggambar pohonnya lebih lama.";

export const ADEGAN_LUAR_POHON_TERAPAN: AdeganStory = {
  id: "luar-pohon-terapan",
  judul: "Bima membuat pohon faktor",
  sumber: "Metode global: Factor Tree, terapan Bima",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_POHONT1,
      tambah(0, judul("Pohon Faktor 24"), ...lantai("lt", 164), ...tokoh("bi", 262, 184, "Bima")),
      tambah("pohon", ...simpul("r", 150, 38, 24, false)),
      tambah(7, tali("t1", 150, 38, 112, 74), ...simpul("u", 112, 74, 12, false)),
      tambah(10, tali("t2", 150, 38, 188, 74), ...simpul("v", 188, 74, 2, true)),
      tambah(15, tali("t3", 112, 74, 86, 110), ...simpul("w", 86, 110, 2, true)),
      tambah(17, tali("t4", 112, 74, 138, 110), ...simpul("x", 138, 110, 6, false)),
    ),
    k(
      SUARA_POHONT2,
      tambah(1, tali("t5", 138, 110, 112, 146), ...simpul("y", 112, 146, 2, true)),
      tambah(4, tali("t6", 138, 110, 164, 146), ...simpul("z", 164, 146, 3, true)),
      tambah(6, teks("rm", 236, 96, "24 =", 9, W.merahTua)),
      ...[
        [7, "24 = 2"],
        [9, "24 = 2 × 2"],
        [11, "24 = 2 × 2 × 2"],
        [13, "24 = 2 × 2 × 2 × 3"],
      ].map(([at, isi]) => ({ at: at as number, ubah: [{ id: "rm", isi: isi as string }] })),
    ),
    k(
      SUARA_POHONT3,
      tambah("Cocok", emo("ok", 262, 50, E.benar, 20), teks("lb", 262, 74, "cocok", 12, W.hijauTua)),
      sorotkan("langkah", "r", "u", "x"),
      tambah("waktu", emo("jm", 262, 118, E.jam, 22)),
    ),
    k(
      SUARA_POHONT4,
      bersih(0),
      tambah(0, judul("Bilangan Kecil"), ...lantai("lt", 164), ...tokoh("bi", 262, 184, "Bima")),
      tambah("Kurang", emo("x1", 150, 44, E.salah, 20), teks("kc", 150, 66, "kurang cocok", 12, W.merah)),
      tambah("bilangan", ...kartu("kk", 14, 82, 110, 40, "#FEF9C3", ["bilangan kecil", "6 = 2 × 3"], 10)),
      tambah("menggambar", ...simpul("s0", 190, 96, 6, false), tali("s1t", 190, 96, 170, 130), tali("s2t", 190, 96, 210, 130), ...simpul("s1", 170, 130, 2, true), ...simpul("s2", 210, 130, 3, true)),
      tambah("lama", emo("jm", 66, 146, E.jam, 20), teks("ll", 66, 160, "lebih lama", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ Divide Down: konsep ------------------------------ */
const SUARA_BAGI1 = "Cara ketiga, Divide Down, atau Bagi Berulang.";
const SUARA_BAGI2 = "Kita menulis dua bilangan berdampingan, lalu membaginya dengan bilangan prima terkecil yang bisa.";
const SUARA_BAGI3 = "Kalau hanya satu bilangan yang habis, bilangan satunya ditulis ulang apa adanya.";
const SUARA_BAGI4 = "Kita berhenti ketika semuanya sudah menjadi satu.";

/** Kerangka tabel pembagian dengan dua kolom bilangan: pembagi di x 40, bilangan di x 86 dan 130, baris di y 68, 88, 108, 128. */
const tabelDua = (a: number, b: number) => [...kerangkaTabel("kt", 40, 40, 140, 150), teks("hp", 40, 44, "pembagi", 9, W.oranye), teks("h0", 86, 44, String(a), 11, W.biru), teks("h1", 130, 44, String(b), 11, W.biru)];
export const ADEGAN_LUAR_BAGI: AdeganStory = {
  id: "luar-bagi",
  judul: "Cara ketiga: bagi berulang",
  sumber: "Metode global: Divide Down, konsep",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_BAGI1,
      tambah(0, judul("Divide Down"), ...lantai("lt", 156), ...tokoh("kl", 262, 184, "Kak Lintang")),
      tambah("ketiga", emo("tg", 40, 74, "\u{2797}", 26), teks("n1", 40, 96, "cara 3", 9, W.coklat)),
      tambah("Divide", ...kartu("m", 70, 44, 190, 64, "#FEF9C3", [NAMA_METODE[2], NAMA_METODE_ID[2]], 12)),
      tambah("Bagi", emo("sa", 150, 130, E.kilau, 16)),
    ),
    k(
      SUARA_BAGI2,
      bersih(0),
      tambah(0, judul("Dua Bilangan Berdampingan"), ...lantai("lt", 160), ...tokoh("kl", 262, 184, "Kak Lintang")),
      tambah("bilangan", ...tabelDua(20, 28)),
      tambah("membaginya", ...barisTabel("r0", 40, 68, 2, [10, 14])),
      tambah("prima", teks("pt", 226, 84, "prima terkecil", 9, W.hijauTua)),
      sorotkan("terkecil", "r0-p"),
    ),
    k(
      SUARA_BAGI3,
      bersih(0),
      tambah(0, judul("Yang Tidak Habis Ditulis"), ...lantai("lt", 160), ...tokoh("kl", 262, 184, "Kak Lintang"), ...tabelDua(10, 15)),
      tambah("habis,", ...barisTabel("r0", 40, 68, 2, [5, 15])),
      sorotkan("ditulis", "r0-c1", "h1"),
      tambah("adanya", teks("ad", 226, 84, "15 tetap 15", 9, W.merah)),
    ),
    k(
      SUARA_BAGI4,
      tambah("berhenti", ...barisTabel("r1", 40, 88, 3, [5, 5])),
      tambah("ketika", ...barisTabel("r2", 40, 108, 5, [1, 1])),
      warnai("satu", W.hijauTua, "r2-c0", "r2-c1"),
      tambah("satu", emo("ok", 182, 110, E.benar, 18)),
    ),
  ],
};

/* ------------------------------ Divide Down: terapan Fajar ------------------------------ */
const SUARA_BAGIT1 = "Fajar membagi tiga puluh dan empat puluh lima dengan prima: dua, tiga, tiga, lalu lima.";
const SUARA_BAGIT2 = "Hasil kali semua pembaginya adalah KPK, yaitu sembilan puluh.";
const SUARA_BAGIT3 = "Cocok untuk KPK dua atau tiga bilangan sekaligus, karena langkahnya rapi dalam satu tabel.";
const SUARA_BAGIT4 = "Kurang cocok kalau kita lupa menulis ulang bilangan yang tidak habis dibagi.";

export const ADEGAN_LUAR_BAGI_TERAPAN: AdeganStory = {
  id: "luar-bagi-terapan",
  judul: "Fajar membagi dengan prima",
  sumber: "Metode global: Divide Down, terapan Fajar",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_BAGIT1,
      tambah(0, judul("Fajar Membagi dengan Prima"), ...lantai("lt", 160), ...tokoh("fa", 262, 184, "Fajar")),
      tambah("membagi", ...kerangkaTabel("kt", 40, 40, 140, 150), teks("hp", 40, 44, "pembagi", 9, W.oranye)),
      tambah("puluh", teks("h0", 86, 44, "30", 11, W.biru)),
      tambah("lima", teks("h1", 130, 44, "45", 11, W.biru)),
      tambah(10, ...barisTabel("r0", 40, 68, 2, [15, 45])),
      tambah(11, ...barisTabel("r1", 40, 88, 3, [5, 15])),
      tambah(12, ...barisTabel("r2", 40, 108, 3, [5, 5])),
      tambah(14, ...barisTabel("r3", 40, 128, 5, [1, 1])),
    ),
    k(
      SUARA_BAGIT2,
      tambah("kali", teks("e1", 226, 62, "2 × 3 × 3 × 5", 10, W.biru)),
      tambah("KPK", teks("e2", 226, 78, "KPK", 11, W.merah)),
      tambah("sembilan", teks("e3", 226, 98, "= 90", 14, W.merah)),
    ),
    k(
      SUARA_BAGIT3,
      bersih(0),
      tambah(0, judul("Tiga Bilangan Sekaligus"), ...lantai("lt", 160), ...tokoh("fa", 262, 184, "Fajar")),
      tambah("KPK", ...kerangkaTabel("kt", 30, 40, 140, 170), teks("hp", 30, 44, "pembagi", 9, W.oranye)),
      tambah("tiga", teks("h0", 76, 44, "6", 11, W.biru), teks("h1", 120, 44, "10", 11, W.biru), teks("h2", 164, 44, "15", 11, W.biru)),
      tambah("langkahnya", ...barisTabel("r0", 30, 68, 2, [3, 5, 15]), ...barisTabel("r1", 30, 88, 3, [1, 5, 5]), ...barisTabel("r2", 30, 108, 5, [1, 1, 1])),
      tambah("rapi", emo("ok", 232, 100, E.benar, 22), teks("rp", 232, 122, "rapi", 11, W.hijauTua)),
    ),
    k(
      SUARA_BAGIT4,
      bersih(0),
      tambah(0, judul("Lupa Menulis Ulang"), ...lantai("lt", 160), ...tokoh("fa", 262, 184, "Fajar")),
      tambah("Kurang", emo("x1", 232, 56, E.salah, 22), teks("kc", 232, 78, "kurang cocok", 10, W.merah)),
      tambah("lupa", ...kerangkaTabel("kt", 40, 40, 140, 150), teks("hp", 40, 44, "pembagi", 9, W.oranye), teks("h0", 86, 44, "30", 11, W.biru), teks("h1", 130, 44, "45", 11, W.biru), teks("r0-p", 40, 68, "2", 11, W.oranye), teks("r0-c0", 86, 68, "15", 11, W.biru)),
      tambah("ulang", kotak("hl", 116, 56, 28, 16, "#FEE2E2", W.merah, { rx: 3, tebal: 1.4, putus: true }), teks("hl-t", 130, 68, "?", 11, W.merah)),
      tambah("tidak", teks("ms", 232, 100, "45 hilang", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_RINGKAS1 = "Tiga cara sudah kita pelajari bersama Kak Lintang, dan masing-masing punya saat yang tepat.";
const SUARA_RINGKAS2 = "Mencari prima, pakai Saring. Memecah bilangan, pakai Pohon Faktor. KPK dan FPB banyak bilangan, pakai Bagi Berulang.";
const SUARA_RINGKAS3 = "Apa pun caranya, bilangan satu bukan prima dan semua pembagi harus prima.";
const SUARA_RINGKAS4 = "Menurutmu, untuk faktorisasi prima dari tujuh puluh dua, cara mana yang paling cepat?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Tiga cara dan saatnya",
  sumber: "Ringkasan metode global: tiga cara",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_RINGKAS1,
      tambah(0, judul("Tiga Cara Bersama"), ...lantai("lt", 156)),
      tambah("Tiga", ...[0, 1, 2].flatMap((i) => kartu(`c${i + 1}`, [8, 107, 206][i], 44, 86, 40, ["#DBEAFE", "#DCFCE7", "#FEF9C3"][i], [NAMA_METODE[i], NAMA_METODE_ID[i]], 8.4))),
      tambah("Lintang", ...tokoh("kl", 150, 184, "Kak Lintang")),
      tambah("saat", teks("n1", 51, 38, "1", 10, W.coklat), teks("n2", 150, 38, "2", 10, W.coklat), teks("n3", 249, 38, "3", 10, W.coklat)),
    ),
    k(
      SUARA_RINGKAS2,
      tambah("Mencari", teks("g1", 150, 106, "mencari prima: Saring", 10, W.biru)),
      tambah("Memecah", teks("g2", 150, 122, "memecah: Pohon Faktor", 10, W.biru)),
      tambah("KPK", teks("g3", 150, 138, "KPK dan FPB: Bagi Berulang", 10, W.biru)),
    ),
    k(
      SUARA_RINGKAS3,
      hapus(0, "g1", "g2", "g3"),
      tambah("satu", ...kartu("w1", 14, 100, 128, 28, "#FEE2E2", ["1 bukan prima"], 10), emo("x1", 40, 150, E.salah, 20)),
      tambah("pembagi", ...kartu("w2", 158, 100, 128, 28, "#DCFCE7", ["pembagi = prima"], 10), emo("x2", 260, 150, E.benar, 20)),
    ),
    k(
      SUARA_RINGKAS4,
      hapus(0, "w1-k", "w1-t0", "w2-k", "w2-t0", "x1", "x2"),
      tambah("faktorisasi", teks("q", 150, 122, "72 = ?", 22, W.ungu)),
      sorotkan("cara", "c1-k", "c2-k", "c3-k"),
      tambah("cepat", emo("pk", 150, 144, E.pikir, 20)),
    ),
  ],
};
