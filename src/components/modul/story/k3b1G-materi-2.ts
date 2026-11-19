import type { AdeganStory } from "./logika-story";
import { E, W, busurMundur, emo, garisBilangan, idTumpukan, judul, kartu, kotak, meja, panah, poligon, teks, tokoLatar, tokoh, tumpukan } from "./k3b1G-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k3b1G-bantu";
import { KR_X, empatKeranjang, idKadoDi, kadoDi, semuaKado } from "./k3b1G-materi-1";


/*
 * Cerita orisinal IGIL "Pesta Hari Jadi Toko" (Kelas 3 Bab 1 Sub-Bab G), akhir cerita Toko Kelontong Pak Joko.
 * Naskah suara dari naskah/story-naskah-k3b1g.md. Bagian ini: salah langkah dan taruhan Raka (mengurangi sekali saja), pengurangan berulang di garis bilangan, keluarga fakta.
 */

/* ------------------------------ 4. Salah kurang ------------------------------ */
const SUARA_D1 = "Raka berseru, dua puluh empat dibagi empat sama dengan dua puluh, tinggal kurangi empat! Kalau salah, aku membungkus ulang semua bingkisan!";
const SUARA_D2 = "Bima menunjukkan keranjang pertama saja. Empat bingkisan diambil, masih tersisa dua puluh.";
const SUARA_D3 = "Pembagian harus diteruskan sampai habis, dan tiap keranjang mendapat bagian yang sama banyak.";

export const ADEGAN_SALAH_KURANG: AdeganStory = {
  id: "salah-kurang",
  judul: "Raka mengurangi sekali saja",
  sumber: "Materi: salah langkah dan taruhan Raka",
  latar: "#FEF2F2",
  ketukan: [
    k(
      SUARA_D1,
      bersih(0),
      tambah(0, judul("Taruhan Raka"), ...tokoLatar("tk")),
      tambah("Raka", ...tokoh("rk", 40, 172, "Raka", 30)),
      tambah("dua", kotak("pp", 88, 40, 134, 56, W.putih, W.biru, { rx: 4, tebal: 2.4, z: 1 }), teks("pt", 155, 76, "24", 18, W.biru, { z: 2 })),
      ubah("dibagi", { id: "pt", isi: "24 :" }),
      ubah("empat@2", { id: "pt", isi: "24 : 4" }),
      ubah("sama", { id: "pt", isi: "24 : 4 =" }),
      ubah("dua@2", { id: "pt", isi: "24 : 4 = 20" }),
      tambah("kurangi", teks("kg", 155, 110, "24 - 4", 12, W.merah)),
      tambah("membungkus", emo("gl", 250, 152, E.gulung, 28)),
      tambah("bingkisan!", emo("h1", 214, 150, E.hadiah, 24), emo("h2", 282, 150, E.hadiah, 24)),
    ),
    k(
      SUARA_D2,
      bersih(0),
      tambah(0, judul("Satu Keranjang Saja"), ...tokoLatar("tk"), ...meja("mj", 96, 96, 108), ...tumpukan("bk", 114, 48, 6, 24, 10, 12), ...empatKeranjang()),
      tambah("Bima", ...tokoh("bm", 36, 182, "Bima", 24, "Bima", 7)),
      sorotkan("pertama", "kr0"),
      hapus("Empat", ...idTumpukan("bk", 4)),
      tambah("Empat", ...[0, 1, 2, 3].flatMap((j) => kadoDi(0, j)), teks("t4", KR_X(0) + 20, 118, "4", 12, W.merah)),
      tambah("masih", ...tokoh("rk", 262, 182, "Raka", 24, "Raka", 7)),
      tambah("dua", teks("t20", 236, 70, "20", 16, W.merah)),
    ),
    k(
      SUARA_D3,
      hapus(0, "t4", "t20"),
      hapus("diteruskan", ...idTumpukan("bk", 20, 4), ...idKadoDi(0, 0), ...idKadoDi(0, 1), ...idKadoDi(0, 2), ...idKadoDi(0, 3)),
      tambah("sampai", ...kartu("hb", 40, 54, 220, 22, W.krem, ["bagi terus sampai habis"], 10)),
      tambah("habis,", ...semuaKado(6)),
      tambah("sama", teks("sm", 150, 114, "sama banyak", 10, W.hijau)),
      tambah("banyak.", emo("ok", 150, 100, E.benar, 22), emo("kl", 262, 130, E.kilau, 20)),
    ),
  ],
};

/* ------------------------------ 5. Kurang berulang ------------------------------ */
const X0 = 24;
const SAT = 10;
const GY = 124;
const xv = (v: number): number => X0 + v * SAT;
const label = (v: number) => teks(`gl-l${v}`, xv(v), GY + 15, String(v), 9, W.biru);
const SUARA_E1 = "Salsa mengurangi empat berulang dari dua puluh empat: dua puluh, enam belas, dua belas, delapan, empat, nol.";
const SUARA_E2 = "Empat dikurangi sebanyak enam kali sampai habis. Jadi hasil baginya enam.";
const SUARA_E3 = "Pembagian adalah pengurangan berulang sampai habis.";
const BUSUR = [24, 20, 16, 12, 8, 4].map((v) => `gl-a${v}`);

export const ADEGAN_KURANG_BERULANG: AdeganStory = {
  id: "kurang-berulang",
  judul: "Mengurangi empat berulang",
  sumber: "Materi: pembagian sebagai pengurangan berulang",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_E1,
      bersih(0),
      tambah(0, judul("Pengurangan Berulang"), ...tokoLatar("tk"), ...garisBilangan("gl", X0, GY, SAT, 24, 4, 9, [-1]), ...tokoh("sl", 36, 182, "Salsa", 24, "Salsa", 7)),
      tambah(2, teks("kk", 150, 62, "dikurangi 4 tiap lompatan", 9.5, W.coklat)),
      tambah(7, label(24), { id: "pt", t: "bulat", x: xv(24), y: GY, r: 4, warna: W.merah, garis: W.putih, tebal: 1, z: 3 }),
      tambah(8, label(20), busurMundur("gl", X0, GY, SAT, 24, 4)),
      ubah(8, { id: "pt", x: xv(20) }),
      tambah(10, label(16), busurMundur("gl", X0, GY, SAT, 20, 4)),
      ubah(10, { id: "pt", x: xv(16) }),
      tambah(12, label(12), busurMundur("gl", X0, GY, SAT, 16, 4)),
      ubah(12, { id: "pt", x: xv(12) }),
      tambah(14, label(8), busurMundur("gl", X0, GY, SAT, 12, 4)),
      ubah(14, { id: "pt", x: xv(8) }),
      tambah(15, label(4), busurMundur("gl", X0, GY, SAT, 8, 4)),
      ubah(15, { id: "pt", x: xv(4) }),
      tambah(16, label(0), busurMundur("gl", X0, GY, SAT, 4, 4)),
      ubah(16, { id: "pt", x: xv(0) }),
    ),
    k(
      SUARA_E2,
      ubah(0, ...BUSUR.map((id) => ({ id, tebal: 2.6 }))),
      tambah("enam", teks("c6", 150, 86, "6 kali", 18, W.merah)),
      sorotkan("habis.", "pt"),
      tambah("Jadi", ...kartu("hs", 80, 150, 140, 20, W.krem, ["hasil bagi = 6"], 10)),
      tambah("enam.", emo("ok", 262, 104, E.benar, 22)),
    ),
    k(
      SUARA_E3,
      hapus(0, "hs-k", "hs-t0", "ok"),
      tambah("Pembagian", ...kartu("rg", 40, 150, 220, 20, W.hijauMuda, ["Pembagian = pengurangan berulang"], 10)),
      tambah("habis.", emo("lp", 262, 104, E.lampu, 24)),
    ),
  ],
};

/* ------------------------------ 6. Keluarga fakta ------------------------------ */
const SUARA_F1 = "Bima menyusun keluarga fakta: empat kali enam sama dengan dua puluh empat.";
const SUARA_F2 = "Dari situ lahir dua pembagian: dua puluh empat dibagi empat sama dengan enam, dan dua puluh empat dibagi enam sama dengan empat.";
const SUARA_F3 = "Perkalian dan pembagian saling berkaitan, jadi pembagian bisa diperiksa dengan perkalian.";

export const ADEGAN_KELUARGA_FAKTA: AdeganStory = {
  id: "keluarga-fakta",
  judul: "Bima menyusun keluarga fakta",
  sumber: "Materi: kaitan perkalian dan pembagian",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_F1,
      bersih(0),
      tambah(0, judul("Kaitan Kali dan Bagi"), ...tokoLatar("tk"), ...tokoh("bm", 36, 182, "Bima", 24, "Bima", 7)),
      tambah("keluarga", poligon("rm", [[150, 44], [96, 114], [204, 114]], W.krem, W.biru, { z: 1 })),
      tambah(4, teks("fb", 122, 106, "4", 18, W.biru, { z: 2 })),
      tambah(6, teks("fc", 178, 106, "6", 18, W.biru, { z: 2 })),
      tambah(9, teks("fa", 150, 82, "24", 22, W.merah, { z: 2 })),
      tambah(11, teks("eq", 150, 136, "4 × 6 = 24", 14, W.ungu)),
    ),
    k(
      SUARA_F2,
      hapus(0, "eq"),
      tambah("dua", teks("d2", 150, 136, "2 pembagian", 11, W.ungu)),
      tambah(12, ...kartu("k1", 24, 146, 124, 20, W.hijauMuda, ["24 : 4 = 6"], 10)),
      tambah(21, ...kartu("k2", 152, 146, 124, 20, W.hijauMuda, ["24 : 6 = 4"], 10)),
    ),
    k(
      SUARA_F3,
      hapus(0, "d2", "k1-k", "k1-t0", "k2-k", "k2-t0"),
      tambah("Perkalian", ...kartu("m1", 16, 144, 56, 18, W.biruMuda, ["4 × 6"], 9), ...kartu("m2", 76, 144, 56, 18, W.biruMuda, ["6 × 4"], 9)),
      tambah("pembagian", ...kartu("b1", 172, 144, 56, 18, W.hijauMuda, ["24 : 4"], 9), ...kartu("b2", 232, 144, 56, 18, W.hijauMuda, ["24 : 6"], 9)),
      tambah("berkaitan,", panah("pa", 134, 153, 36, 0, W.ungu, 2.4)),
      tambah("diperiksa", emo("kc", 150, 122, E.kaca, 22)),
      tambah("perkalian.", emo("ok", 262, 104, E.benar, 22)),
    ),
  ],
};

