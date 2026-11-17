import type { AdeganStory, Obj } from "./logika-story";
import { E, W, WARNA_IKAN, bulat, emo, garisBilangan, geserIkan, isiKantong, judul, kantongIkan, kartu, kawanan, orang, papanLabel, sekat, teks, tulisAngka, wadah } from "./k1b5a-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah } from "./k1b5a-bantu";

/* Lanjutan "Ikan Baru Datang": membaca dan menulis label belasan, memperkirakan ikan koki, lalu ikan neon sampai dua puluh. */

const S = 0.6;
const diSekat = (x: number, y: number, s: number, i: number) => {
  const c = sekat(x, y, i, s);
  return { x: c.x, y: c.y - 2 };
};
const isiWadah = (id: string, x: number, y: number, s: number, warna: string | readonly string[], dari: number, sampai: number): Obj[] =>
  kawanan(id, Array.from({ length: sampai - dari }, (_, k) => diSekat(x, y, s, dari + k)), warna, S);

/* ------------------------------ 4. Membaca dan menulis label ------------------------------ */
const SUARA_B1 = "Kaka menulis label akuarium. Lambangnya satu dan empat, dibaca empat belas.";
const SUARA_B2 = "Di bawahnya Kaka menulis nama bilangan, empat belas. Belasan dibaca nama satuannya, lalu kata belas.";
const SUARA_B3 = "Dua belas, tiga belas, sampai sembilan belas. Sebelas istimewa, sepuluh dan satu dibaca sebelas.";

export const ADEGAN_BACA_TULIS: AdeganStory = {
  id: "baca-tulis",
  judul: "Membaca dan menulis belasan",
  sumber: "Materi: lambang dan nama bilangan",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Menulis label"), ...orang("kk", 36, 170, E.kaka, "Kaka"), ...papanLabel("pl", 80, 34, 140, 120)),
      tambah("menulis", ...tulisAngka("tl", 116, 50, "14")),
      tambah("satu", teks("d1", 122, 108, "1", 11, W.hijau)),
      tambah("empat", teks("d4", 162, 108, "4", 11, W.hijau)),
      tambah("belas.", teks("lb", 150, 140, "14 dibaca empat belas", 9.4, W.ungu)),
    ),
    k(
      SUARA_B2,
      hapus(0, "d1", "d4"),
      tambah("nama", teks("nm", 150, 124, "empat belas", 14, W.biru)),
      sorotkan("Belasan", "nm"),
      sorotkan("satuannya,", "tl1"),
      tambah("satuannya,", teks("st", 262, 70, "4: empat", 9, W.hijau)),
      tambah("belas@3", teks("bl", 262, 92, "lalu belas", 9, W.ungu)),
    ),
    k(
      SUARA_B3,
      bersih(0),
      tambah(0, judul("Nama bilangan belasan"), ...orang("kk", 36, 170, E.kaka, "Kaka")),
      tambah("Dua", teks("r12", 100, 50, "12 dua belas", 10, W.biru)),
      tambah("tiga", teks("r13", 100, 74, "13 tiga belas", 10, W.biru)),
      tambah("sampai", teks("r00", 100, 98, ". . .", 10, W.biru)),
      tambah("sembilan", teks("r19", 100, 122, "19 sembilan belas", 10, W.biru)),
      tambah("Sebelas", ...kartu("sb", 176, 44, 110, 50, W.pink, ["11", "sebelas"], 12)),
      tambah("satu", teks("s10", 231, 112, "10 dan 1", 10, W.ungu)),
      sorotkan("sebelas@2", "sb-k"),
    ),
  ],
};

/* ------------------------------ 5. Perkiraan ikan koki ------------------------------ */
const SUARA_P1 = "Kantong kedua berisi ikan koki. Igil memperkirakan dulu, kira-kira sepuluh.";
const SUARA_P2 = "Lalu ikan dipindah satu per satu. Sepuluh sekat penuh, dan satu ikan di wadah kedua.";
const SUARA_P3 = "Sepuluh dan satu, sebelas. Perkiraan Igil dekat, dan hitungan membuktikan ada sebelas ikan koki.";
const KOKI = isiKantong(11, 32, 66, 4, 20, 15);
const K1 = { x: 150, y: 44, s: 26 };
const K2 = { x: 150, y: 114, s: 26 };
const geserKoki = (dari: number, sampai: number, w: { x: number; y: number; s: number }, sekatMulai = 0) =>
  Array.from({ length: sampai - dari }, (_, j) => {
    const p = diSekat(w.x, w.y, w.s, sekatMulai + j);
    return geserIkan(`kk${dari + j}`, p.x, p.y, S);
  }).flat();

export const ADEGAN_PERKIRAAN: AdeganStory = {
  id: "perkiraan",
  judul: "Perkirakan dulu, lalu hitung",
  sumber: "Materi: memperkirakan dan membuktikan",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Ikan koki")),
      tambah("Kantong", ...kantongIkan("kt", 16, 52, 96, 72), ...kawanan("kk", KOKI, WARNA_IKAN.koki, S)),
      tambah("Igil", ...orang("ig", 36, 176, E.igil, "Igil")),
      tambah("memperkirakan", ...kartu("pk", 8, 132, 80, 20, W.putih, ["kira-kira ..."], 9)),
      ubah("sepuluh.", { id: "pk-t0", isi: "kira-kira 10" }),
    ),
    k(
      SUARA_P2,
      tambah("dipindah", ...wadah("w1", K1.x, K1.y, K1.s), ...wadah("w2", K2.x, K2.y, K2.s)),
      ubah("satu", ...geserKoki(0, 5, K1)),
      ubah("Sepuluh", ...geserKoki(5, 10, K1, 5)),
      tambah("penuh,", teks("p10", 128, 76, "10", 12, W.merah)),
      ubah("satu@3", ...geserKoki(10, 11, K2)),
      tambah("satu@3", teks("p1", 128, 146, "1", 12, W.merah)),
      sorotkan("kedua.", "w2-b"),
    ),
    k(
      SUARA_P3,
      hapus(0, "kt", "kt-ik"),
      sorotkan("Sepuluh", "p10"),
      sorotkan("satu,", "p1"),
      tambah("sebelas.", teks("hs", 64, 100, "11", 24, W.merah)),
      tambah("dekat,", emo("ok", 98, 142, E.benar, 12)),
      tambah("membuktikan", ...kartu("lk", 150, 178, 130, 20, W.emas, ["11 sebelas"], 9.4)),
    ),
  ],
};

/* ------------------------------ 6. Ikan neon sampai dua puluh ------------------------------ */
const SUARA_D1 = "Ikan neon dihitung dengan cara yang sama. Wadah pertama penuh sepuluh, wadah kedua berisi tujuh. Ada tujuh belas.";
const SUARA_D2 = "Lalu kantong kedua datang membawa tiga ikan neon lagi. Delapan belas, sembilan belas, dua puluh.";
const SUARA_D3 = "Dua wadah sepuluh penuh, jadi dua puluh. Kaka menulis label dua puluh.";
const N1 = { x: 18, y: 46, s: 25 };
const N2 = { x: 160, y: 46, s: 25 };
const xGaris = (n: number): number => 30 + (n - 10) * 24;
const BARU = [{ x: 138, y: 112 }, { x: 160, y: 112 }, { x: 149, y: 122 }];

export const ADEGAN_DUA_PULUH: AdeganStory = {
  id: "dua-puluh",
  judul: "Ikan neon sampai dua puluh",
  sumber: "Materi: bilangan dua puluh",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Ikan neon"), ...wadah("w1", N1.x, N1.y, N1.s), ...wadah("w2", N2.x, N2.y, N2.s)),
      tambah("penuh", ...isiWadah("n", N1.x, N1.y, N1.s, WARNA_IKAN.neon, 0, 10)),
      tambah("sepuluh,", teks("p10", 80, 116, "10", 14, W.merah)),
      tambah("berisi", ...isiWadah("m", N2.x, N2.y, N2.s, WARNA_IKAN.neon, 0, 7)),
      tambah("tujuh.", teks("p7", 222, 116, "7", 14, W.merah)),
      tambah("belas.", ...garisBilangan("gb", 30, 160, 10, 20, 24), bulat("mk", xGaris(17), 160, 5, W.merah, W.biru, { tebal: 1.4, z: 2 }), teks("h17", 151, 138, "10 dan 7, 17", 10, W.ungu)),
    ),
    k(
      SUARA_D2,
      hapus(0, "h17"),
      tambah("kantong", ...kantongIkan("kt", 124, 100, 52, 32), ...kawanan("b", BARU, WARNA_IKAN.neon, S)),
      tambah("tiga", teks("p3", 150, 145, "3 lagi", 9, W.ungu)),
      ...["Delapan", "sembilan", "puluh."].map((at, j) => {
        const p = diSekat(N2.x, N2.y, N2.s, 7 + j);
        return ubah(at, ...geserIkan(`b${j}`, p.x, p.y, S), { id: "mk", x: xGaris(18 + j) });
      }),
      ubah("puluh.", { id: "p7", isi: "10" }),
    ),
    k(
      SUARA_D3,
      hapus(0, "kt", "kt-ik", "p3"),
      sorotkan("Dua", "w1-b", "w2-b"),
      tambah("Dua", teks("w2n", 151, 116, "2 wadah", 9, W.biru)),
      sorotkan("sepuluh", "p10", "p7"),
      tambah(idx(SUARA_D3, "puluh,"), teks("h20", 151, 140, "20", 18, W.merah)),
      tambah("Kaka", ...orang("kk", 36, 136, E.kaka, "Kaka")),
      tambah("label", ...kartu("lb", 196, 126, 92, 22, W.emas, ["20 dua puluh"], 9)),
    ),
  ],
};
