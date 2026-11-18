import type { AdeganStory } from "./logika-story";
import { E, M, W, emo, garis, judul, kartu, kotak, kotakManik, lantai, lengkung, kurung, manik, sel, stan, teks, tokoh } from "./k2b4B-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah } from "./k2b4B-bantu";

/*
 * Cerita orisinal IGIL "Pita Hias Bu Mira" (Kelas 2 Bab 4 Sub-Bab B, pola), akhir cerita Pameran Kerajinan Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b4b.md. Bagian ini: manik tercecer, satuan pola, dan salah lanjut (Chacha terpeleset).
 */

/* ------------------------------ 1. Manik tercecer ------------------------------ */
const SUARA_1A = "Di meja pameran, benang kalung Bu Mira putus, dan manik-maniknya berhamburan ke mana-mana!";
const SUARA_1B = "Pita hias untuk stan depan harus selesai sebelum pameran dibuka hari Sabtu.";
const SUARA_1C = "Kalau urutannya salah, pita hias berantakan dan stan tampak tidak rapi.";
const SERAK = [
  { id: "mk0", x: 150, y: 134, c: M.merah },
  { id: "mk1", x: 176, y: 142, c: M.biru },
  { id: "mk2", x: 208, y: 138, c: M.jingga },
  { id: "mk3", x: 120, y: 144, c: M.hijau },
  { id: "mk4", x: 238, y: 144, c: M.kuning },
];

export const ADEGAN_MANIK_TERCECER: AdeganStory = {
  id: "manik-tercecer",
  judul: "Manik Bu Mira berhamburan",
  sumber: "Materi: manik tercecer",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_1A,
      tambah(0, judul("Manik Berhamburan"), lantai("lt", 150), ...stan("st", 14, 30, 150)),
      tambah(idx(SUARA_1A, "kalung"), ...kotakManik("km", 36, 82, 34, 20), garis("bn1", 82, 96, 30, 0, "#7C3AED", 2), garis("bn2", 122, 96, 22, 0, "#7C3AED", 2, { putus: true })),
      tambah(idx(SUARA_1A, "Mira"), ...tokoh("bm", 228, 150, "Bu Mira")),
      tambah(idx(SUARA_1A, "putus,"), emo("ps", 118, 84, E.tabrak, 18)),
      tambah(idx(SUARA_1A, "manik-maniknya"), manik("mk0", 90, 84, 5, M.merah), manik("mk1", 108, 86, 5, M.biru), manik("mk2", 126, 84, 5, M.jingga)),
      tambah(idx(SUARA_1A, "berhamburan"), ...SERAK.slice(3).map((s) => manik(s.id, s.x, s.y, 5, s.c))),
      ubah(idx(SUARA_1A, "berhamburan"), { id: "mk0", x: 150, y: 134 }, { id: "mk1", x: 176, y: 142 }, { id: "mk2", x: 208, y: 138 }),
    ),
    k(
      SUARA_1B,
      hapus(0, "ps", "bn2"),
      tambah(idx(SUARA_1B, "Pita"), kotak("pk", 20, 54, 140, 14, "#F1F5F9", "#64748B", { putus: true, z: 2 })),
      tambah(idx(SUARA_1B, "stan"), teks("pt", 90, 48, "pita hias", 8, W.ungu, { z: 3 })),
      tambah(idx(SUARA_1B, "selesai"), ...tokoh("bs", 40, 150, "Bu Sari"), emo("dt", 66, 134, E.daftar, 18)),
      tambah(idx(SUARA_1B, "Sabtu."), ...kartu("kl", 214, 30, 70, 28, W.krem, ["Sabtu"], 11), emo("kal", 206, 50, E.kalender, 16)),
    ),
    k(
      SUARA_1C,
      ubah(idx(SUARA_1C, "salah,"), { id: "pk", warna: "#FECACA", garis: "#DC2626" }),
      tambah(idx(SUARA_1C, "salah,"), emo("no", 90, 82, E.salah, 18)),
      hapus(idx(SUARA_1C, "berantakan"), "pt"),
      tambah(idx(SUARA_1C, "berantakan"), sel("br0", 36, 61, 11, M.biru, { rot: 12 }), sel("br1", 58, 63, 11, M.merah, { rot: -20 }), sel("br2", 78, 60, 11, M.merah, { rot: 25 }), sel("br3", 100, 63, 11, M.hijau, { rot: -8 })),
      tambah(idx(SUARA_1C, "rapi."), emo("cm", 150, 90, E.cemas, 20)),
    ),
  ],
};

/* ------------------------------ 2. Satuan pola ------------------------------ */
const SUARA_2A = "Bu Mira menunjukkan potongan pita yang masih utuh: merah, biru, merah, biru.";
const SUARA_2B = "Hal yang berulang dan teratur dinamakan pola.";
const SUARA_2C = "Susunan terkecil yang berulang disebut satuan pola. Di sini satuannya merah, biru.";
const PITA2 = [M.merah, M.biru, M.merah, M.biru];
const X2 = (i: number) => 64 + i * 46;

export const ADEGAN_SATUAN_POLA: AdeganStory = {
  id: "satuan-pola",
  judul: "Pola dan satuan pola",
  sumber: "Materi: pola dan satuan pola",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_2A,
      bersih(0),
      tambah(0, judul("Pita Utuh"), lantai("lt", 150)),
      tambah(idx(SUARA_2A, "Bu"), ...tokoh("bm", 262, 156, "Bu Mira")),
      tambah(idx(SUARA_2A, "pita"), kotak("pb", 36, 52, 192, 44, "#FFFFFF", "#7C3AED", { rx: 6, tebal: 2, z: 0 })),
      tambah(idx(SUARA_2A, "merah,"), sel("p0", X2(0), 74, 34, PITA2[0])),
      tambah(idx(SUARA_2A, "biru,"), sel("p1", X2(1), 74, 34, PITA2[1])),
      tambah(idx(SUARA_2A, "merah,", 2), sel("p2", X2(2), 74, 34, PITA2[2])),
      tambah(idx(SUARA_2A, "biru."), sel("p3", X2(3), 74, 34, PITA2[3])),
    ),
    k(
      SUARA_2B,
      tambah(idx(SUARA_2B, "berulang"), lengkung("lg0", X2(0) - 17, 46, X2(2) - X2(0)), lengkung("lg1", X2(2) - 17, 46, X2(2) - X2(0))),
      tambah(idx(SUARA_2B, "teratur"), emo("ul", 240, 80, E.ulang, 16)),
      tambah(idx(SUARA_2B, "pola."), ...kartu("lp", 70, 118, 100, 26, W.hijauMuda, ["pola"], 12)),
    ),
    k(
      SUARA_2C,
      hapus(0, "ul"),
      tambah(idx(SUARA_2C, "terkecil"), kurung("kr", X2(0) - 17, 98, X2(1) - X2(0) + 34)),
      hapus(idx(SUARA_2C, "satuan"), "lp-k", "lp-t0"),
      tambah(idx(SUARA_2C, "satuan"), ...kartu("ls", 70, 118, 130, 26, W.krem, ["satuan pola"], 11)),
      sorotkan(idx(SUARA_2C, "merah,"), "p0"),
      sorotkan(idx(SUARA_2C, "biru."), "p1"),
    ),
  ],
};

/* ------------------------------ 3. Salah lanjut (salah langkah, momen lucu) ------------------------------ */
const SUARA_3A = "Nia membacakan potongan berikutnya: jingga, jingga, biru, jingga, jingga, biru, jingga, jingga.";
const SUARA_3B = "Chacha melihat dua manik terakhir sama, jadi ia memasang jingga. Pasti jingga!";
const SUARA_3C = "Dika menggeleng. Chacha, lihat dari awal! Satuannya jingga, jingga, biru, jadi yang berikutnya biru. Manik di tangan Chacha menggelinding, dan ia terpeleset sambil mengejarnya!";
const J8 = [M.jingga, M.jingga, M.biru, M.jingga, M.jingga, M.biru, M.jingga, M.jingga];
const XR = (i: number) => 26 + i * 29;

export const ADEGAN_SALAH_LANJUT: AdeganStory = {
  id: "salah-lanjut",
  judul: "Chacha salah melanjutkan",
  sumber: "Materi: melanjutkan pola",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_3A,
      bersih(0),
      tambah(0, judul("Lanjutkan Polanya"), lantai("lt", 150), ...tokoh("ni", 40, 168, "Nia")),
      tambah(idx(SUARA_3A, "potongan"), garis("rb", 8, 72, 284, 0, "#7C3AED", 1.6, { z: 0 })),
      ...J8.map((c, i) => tambah(4 + i, manik(`r${i}`, XR(i), 72, 11, c))),
    ),
    k(
      SUARA_3B,
      tambah(idx(SUARA_3B, "Chacha"), ...tokoh("ch", 88, 150, "Chacha")),
      sorotkan(idx(SUARA_3B, "dua"), "r6", "r7"),
      tambah(idx(SUARA_3B, "dua"), teks("d2", 192, 104, "2 manik sama", 8.6, W.merah)),
      tambah(idx(SUARA_3B, "memasang"), manik("mh", 118, 140, 8, M.jingga, { z: 4 })),
      tambah(idx(SUARA_3B, "Pasti"), emo("no", 140, 130, E.salah, 18)),
    ),
    k(
      SUARA_3C,
      hapus(0, "d2", "no"),
      ubah(0, { id: "r6", sorot: false }, { id: "r7", sorot: false }),
      tambah(idx(SUARA_3C, "Dika"), ...tokoh("dk", 252, 168, "Dika")),
      tambah(idx(SUARA_3C, "awal!"), kurung("kr", XR(0) - 13, 86, XR(2) - XR(0) + 26)),
      tambah(idx(SUARA_3C, "biru.", 2), ...kartu("kb", 170, 112, 76, 24, W.langit, ["berikutnya biru"], 8.6)),
      ubah(idx(SUARA_3C, "menggelinding,"), { id: "mh", x: 186, y: 178 }),
      ubah(idx(SUARA_3C, "terpeleset"), { id: "ch", rot: -70, y: 162 }),
      tambah(idx(SUARA_3C, "terpeleset"), emo("bp", 118, 152, E.bintangPutar, 20)),
    ),
  ],
};
