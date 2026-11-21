import type { AdeganStory } from "./logika-story";
import { E, F20, F8, W, emo, garis, judul, kardus, kartu, kartuFaktor, kue, kotak, lantai, papanTulis, teks, tokoh } from "./k5b2d-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k5b2d-bantu";

/*
 * Cerita orisinal IGIL "Kotak Bingkisan Pak Joko" (Kelas 5 Bab 2 Sub-Bab D), Pasar Kuliner Malam.
 * Naskah suara dari naskah/story-naskah-k5b2d.md. Bagian ini: membagi kue ke enam kotak, FPB delapan dan dua puluh, dan penutup (Kak Lintang datang).
 */

/* ------------------------------ 7. Bagi ke enam kotak ------------------------------ */
const SUARA_BAGI1 = "Bima membagi dua puluh empat klepon ke enam kotak, hasilnya empat klepon tiap kotak.";
const SUARA_BAGI2 = "Delapan belas onde-onde dibagi ke enam kotak, hasilnya tiga onde-onde tiap kotak.";
const SUARA_BAGI3 = "Setiap kotak berisi empat klepon dan tiga onde-onde, dan semua kue habis terpakai.";

const X_KOTAK = (i: number): number => 14 + i * 47;
const KOTAK6 = Array.from({ length: 6 }, (_, i) => kardus(`bx${i}`, X_KOTAK(i), 66, 40, 46)).flat();
const ID_KOTAK6 = Array.from({ length: 6 }, (_, i) => [`bx${i}`, `bx${i}-p`]).flat();
const KLEPON6 = Array.from({ length: 6 }, (_, i) => [0, 1, 2, 3].map((j) => kue(`kp${i}${j}`, X_KOTAK(i) + 14 + (j % 2) * 12, 78 + Math.floor(j / 2) * 10, "klepon"))).flat();
const ONDE6 = Array.from({ length: 6 }, (_, i) => [0, 1, 2].map((j) => kue(`oe${i}${j}`, X_KOTAK(i) + 10 + j * 10, 102, "onde"))).flat();

export const ADEGAN_BAGI: AdeganStory = {
  id: "bagi",
  judul: "Bima membagi ke enam kotak",
  sumber: "Materi: bagi sama rata ke enam kotak",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_BAGI1,
      tambah(0, judul("Isi Enam Kotak"), ...lantai("lt", 150)),
      tambah("Bima", ...tokoh("bi", 40, 184, "Bima")),
      tambah("klepon", teks("t24", 150, 52, "24 klepon", 9.5, W.hijauTua)),
      tambah("enam", ...KOTAK6),
      tambah("hasilnya", ...KLEPON6, teks("h24", 150, 126, "24 : 6 = 4", 10.5, W.biru)),
    ),
    k(
      SUARA_BAGI2,
      tambah("Delapan", teks("t18", 150, 140, "18 onde-onde", 9.5, W.onde)),
      tambah("hasilnya", ...ONDE6),
      ubah("tiga", { id: "t18", isi: "18 : 6 = 3 onde-onde" }),
    ),
    k(
      SUARA_BAGI3,
      sorotkan("Setiap", ...ID_KOTAK6),
      ubah("empat", { id: "h24", isi: "tiap kotak: 4 klepon" }),
      ubah("tiga", { id: "t18", isi: "dan 3 onde-onde" }),
      tambah("habis", emo("ok", 258, 140, E.benar, 20), teks("sh", 200, 168, "semua kue habis", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ 8. Delapan dan dua puluh ------------------------------ */
const SUARA_UJI1 = "Pak Arif menguji dengan bilangan lain: delapan dan dua puluh.";
const SUARA_UJI2 = "Faktor delapan: satu, dua, empat, delapan. Faktor dua puluh: satu, dua, empat, lima, sepuluh, dua puluh.";
const SUARA_UJI3 = "Faktor yang sama adalah satu, dua, dan empat, jadi FPB-nya empat.";

const BARIS_8 = F8.map((f, i) => kartuFaktor(`u${f}`, 14 + i * 25, 56, f, W.krem));
const BARIS_20 = F20.map((f, i) => kartuFaktor(`v${f}`, 14 + i * 25, 98, f, "#DBEAFE"));

export const ADEGAN_DELAPAN_DUA_PULUH: AdeganStory = {
  id: "delapan-dua-puluh",
  judul: "Pak Arif menguji bilangan lain",
  sumber: "Materi: FPB delapan dan dua puluh",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_UJI1,
      tambah(0, judul("Pak Arif Menguji"), ...lantai("lt", 150)),
      tambah("Arif", ...tokoh("pa", 266, 184, "Pak Arif")),
      tambah("delapan", ...kartu("k8", 30, 56, 80, 60, W.krem, ["8"], 34)),
      tambah("dua", ...kartu("k20", 130, 56, 100, 60, "#DBEAFE", ["20"], 34)),
    ),
    k(
      SUARA_UJI2,
      bersih(0),
      tambah(0, judul("Faktor 8 dan 20"), ...lantai("lt", 150), papanTulis("pn", 6, 28, 288, 114), ...tokoh("pa", 266, 184, "Pak Arif")),
      tambah("Faktor", teks("l8", 14, 50, "Faktor 8", 9, W.kapur, { anchor: "start", z: 2 })),
      ...BARIS_8.map((c, i) => tambah([2, 3, 4, 5][i], ...c)),
      tambah("Faktor@2", teks("l20", 14, 92, "Faktor 20", 9, W.kapur, { anchor: "start", z: 2 })),
      ...BARIS_20.map((c, i) => tambah([9, 10, 11, 12, 13, 14][i], ...c)),
    ),
    k(
      SUARA_UJI3,
      sorotkan("satu", "u1-k", "v1-k"),
      sorotkan("dua", "u2-k", "v2-k"),
      sorotkan("empat", "u4-k", "v4-k"),
      tambah("FPB-nya", teks("fp", 150, 136, "FPB = 4", 11, W.kapur, { z: 2 }), emo("ok", 230, 134, E.benar, 16)),
    ),
  ],
};

/* ------------------------------ 9. Penutup: Kak Lintang datang ------------------------------ */
const SUARA_PENUTUP1 = "Kak Lintang, pembuat papan nama, datang membawa papan besar bertuliskan bilangan satu sampai seratus.";
const SUARA_PENUTUP2 = "Ia ingin menandai bilangan istimewa yang hanya punya dua faktor.";
const SUARA_PENUTUP3 = "Menurutmu, bilangan apa saja yang istimewa itu? Terima kasih, Bima, Citra, Fajar, Pak Arif, dan Pak Joko!";

const GARIS_PAPAN = [
  ...Array.from({ length: 9 }, (_, i) => garis(`gv${i}`, 113 + i * 17, 34, 0, 100, "#94A3B8", 0.8, { z: 1 })),
  ...Array.from({ length: 9 }, (_, j) => garis(`gh${j}`, 96, 44 + j * 10, 170, 0, "#94A3B8", 0.8, { z: 1 })),
];
const sel = (id: string, n: number, warna: string) => [kotak(`pm${n}`, 96 + (n - 1) * 17, 34, 17, 10, warna, W.coklat, { rx: 1, tebal: 1, z: 2 }), teks(`pt${n}`, 104.5 + (n - 1) * 17, 41.8, String(n), 7, W.biru, { z: 3 })].map((o) => ({ ...o, id: o.id.replace(/\d+$/, "") + id }));

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Kak Lintang datang membawa papan",
  sumber: "Materi: jembatan ke bilangan prima",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_PENUTUP1,
      tambah(0, judul("Papan Kak Lintang"), ...lantai("lt", 150)),
      tambah("Lintang", ...tokoh("kl", 40, 184, "Kak Lintang")),
      tambah("papan@2", kotak("bd", 96, 34, 170, 100, "#FFFFFF", W.kayuTua, { rx: 3, tebal: 2.4, z: 0 }), ...GARIS_PAPAN),
      tambah("satu", teks("b1", 104.5, 41.8, "1", 7, W.biru, { z: 3 })),
      tambah("seratus", teks("b100", 257, 132, "100", 7, W.biru, { z: 3 }), teks("bl", 180, 150, "1 sampai 100", 10, W.coklat)),
    ),
    k(
      SUARA_PENUTUP2,
      tambah("menandai", ...sel("a", 2, "#FDE68A"), ...sel("b", 3, "#FDE68A")),
      tambah("istimewa", ...sel("c", 5, "#FDE68A"), ...sel("d", 7, "#FDE68A")),
      tambah("dua", teks("hf", 200, 168, "hanya 2 faktor", 9.5, W.merah)),
    ),
    k(
      SUARA_PENUTUP3,
      bersih(0),
      tambah(0, judul("Bilangan Istimewa?"), ...lantai("lt", 150), ...kartu("qk", 100, 44, 100, 74, W.krem, ["?"], 44)),
      tambah("Menurutmu", emo("h1", 70, 80, E.hadiah, 22), emo("h2", 230, 80, E.kilau, 22)),
      tambah("Terima", ...tokoh("kl", 275, 184, "Kak Lintang")),
      tambah("Bima", ...tokoh("bi", 25, 184, "Bima")),
      tambah("Citra", ...tokoh("ci", 75, 184, "Citra")),
      tambah("Fajar", ...tokoh("fa", 125, 184, "Fajar")),
      tambah("Arif", ...tokoh("pa", 175, 184, "Pak Arif")),
      tambah("Joko", ...tokoh("pj", 225, 184, "Pak Joko")),
    ),
  ],
};
