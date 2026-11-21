import type { AdeganStory } from "./logika-story";
import { E, W, baki, bulat, deretKlepon, emo, judul, kartu, lantai, piring, teks, tokoh } from "./k5b2c-gambar";
import { bersih, k, tambah, ubah } from "./k5b2c-bantu";

/*
 * Cerita orisinal IGIL "Klepon Bu Wati" (Kelas 5 Bab 2 Sub-Bab C, faktor), lanjutan cerita Pasar Kuliner Malam.
 * Naskah suara dari naskah/story-naskah-k5b2c.md. Bagian ini: baki klepon, menata ke piring sama banyak, dan arti faktor.
 */

/* ------------------------------ 1. Baki ------------------------------ */
const SUARA_B1 = "Bu Wati datang membawa baki berisi dua belas klepon hijau yang masih hangat.";
const SUARA_B2 = "Ia ingin menata klepon itu ke beberapa piring kecil dengan isi yang sama banyak.";
const SUARA_B3 = "Tidak boleh ada klepon yang tersisa, dan Bima mulai mencoba menatanya.";

export const ADEGAN_BAKI: AdeganStory = {
  id: "baki",
  judul: "Baki Bu Wati",
  sumber: "Materi: baki klepon",
  latar: "#F1F5F9",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Baki Bu Wati"), ...lantai("lt", 150)),
      tambah("Wati", ...tokoh("bw", 40, 184, "Bu Wati")),
      tambah("baki", baki("bk", 84, 92, 124, 52)),
      tambah("dua", teks("n12", 146, 84, "12 klepon", 11, W.merah, { z: 3 })),
      tambah("klepon", ...deretKlepon("kl", 101, 110, 12, 6, 17, 18)),
      tambah("hangat", emo("up", 146, 64, E.uap, 18, { z: 3 })),
    ),
    k(
      SUARA_B2,
      tambah("piring", piring("pr0", 250, 76, 14), piring("pr1", 250, 106, 14), piring("pr2", 250, 136, 14)),
      tambah("sama", teks("sm", 250, 52, "isi sama banyak", 9, W.coklat, { z: 3 })),
    ),
    k(
      SUARA_B3,
      tambah("tersisa", teks("ts", 146, 62, "tanpa sisa", 10, W.merah, { z: 3 })),
      tambah("Bima", ...tokoh("bm", 250, 184, "Bima")),
      ubah("menatanya", { id: "kl5", x: 244, y: 76 }, { id: "kl11", x: 256, y: 76 }),
    ),
  ],
};

/* ------------------------------ 2. Piring ------------------------------ */
const SUARA_P1 = "Satu piring berisi dua belas, dua piring berisi enam, tiga piring berisi empat.";
const SUARA_P2 = "Empat piring berisi tiga, enam piring berisi dua, dan dua belas piring berisi satu.";
const SUARA_P3 = "Bima menuliskan semua bilangan itu, tanpa menulis bilangan yang sama dua kali.";

/** Satu baris: label "a piring", `a` piring bulat kecil sungguh sebanyak a, dan isi tiap piring. Id berawalan `${id}`. */
const baris = (id: string, y: number, a: number, step: number, x0: number) => ({
  label: teks(`${id}l`, 44, y + 4, `${a} piring`, 10, W.coklat, { z: 3 }),
  piring: Array.from({ length: a }, (_, j) => bulat(`${id}p${j}`, x0 + j * step, y, 5, W.putih, W.hijauTua, { tebal: 1.4, z: 2 })),
  isi: (b: number) => teks(`${id}i`, 240, y + 4, `isi ${b}`, 11, W.merah, { z: 3 }),
});
const R1 = [baris("a0", 58, 1, 17, 100), baris("a1", 94, 2, 17, 100), baris("a2", 130, 3, 17, 100)];
const R2 = [baris("b0", 52, 4, 17, 100), baris("b1", 94, 6, 17, 100), baris("b2", 136, 12, 11, 100)];

export const ADEGAN_PIRING: AdeganStory = {
  id: "piring",
  judul: "Menata ke piring",
  sumber: "Materi: tiap cara menata",
  latar: "#F1F5F9",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Menata ke piring"), R1[0].label, ...R1[0].piring),
      tambah("belas", R1[0].isi(12)),
      tambah("piring@2", R1[1].label, ...R1[1].piring),
      tambah("enam", R1[1].isi(6)),
      tambah("piring@3", R1[2].label, ...R1[2].piring),
      tambah("empat", R1[2].isi(4)),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Menata ke piring"), R2[0].label, ...R2[0].piring),
      tambah("tiga", R2[0].isi(3)),
      tambah("piring@2", R2[1].label, ...R2[1].piring),
      tambah("dua", R2[1].isi(2)),
      tambah("belas", R2[2].label),
      tambah("piring@3", ...R2[2].piring),
      tambah("satu", R2[2].isi(1)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Bima mencatat"), ...lantai("lt", 150), ...tokoh("bm", 40, 184, "Bima")),
      tambah(
        "bilangan",
        ...[1, 2, 3, 4, 6, 12].flatMap((f, i) => kartu(`f${i}`, 12 + i * 46, 64, 40, 34, i % 2 === 0 ? W.daun : W.kapur, String(f), 14, W.biru)),
      ),
      tambah("tanpa", teks("kb", 150, 126, "tanpa kembar", 11, W.coklat, { z: 3 })),
      tambah("kali", emo("ok", 150, 146, E.benar, 16, { z: 3 })),
    ),
  ],
};

/* ------------------------------ 3. Arti faktor ------------------------------ */
const SUARA_F1 = "Bilangan cacah yang membagi dua belas tanpa sisa disebut faktor dari dua belas.";
const SUARA_F2 = "Faktor dua belas adalah satu, dua, tiga, empat, enam, dan dua belas.";
const SUARA_F3 = "Enam faktor itu semuanya membuat penataan klepon rapi tanpa sisa.";

export const ADEGAN_FAKTOR: AdeganStory = {
  id: "faktor",
  judul: "Arti faktor",
  sumber: "Materi: arti faktor",
  latar: "#F1F5F9",
  ketukan: [
    k(
      SUARA_F1,
      tambah(0, judul("Arti faktor"), ...lantai("lt", 150), baki("df", 20, 34, 260, 90)),
      tambah("membagi", teks("d1", 150, 62, "bilangan cacah yang membagi 12", 10.5, W.biru, { z: 3 })),
      tambah("sisa", teks("d2", 150, 86, "tanpa sisa", 11, W.merah, { z: 3 })),
      tambah("faktor", teks("d3", 150, 110, "= faktor dari 12", 13, W.hijauTua, { z: 3 })),
      tambah("belas@2", emo("ok", 150, 146, E.benar, 16, { z: 3 })),
    ),
    k(
      SUARA_F2,
      bersih(0),
      tambah(0, judul("Arti faktor"), ...lantai("lt", 150), teks("fj", 150, 46, "Faktor 12", 13, W.merah, { z: 3 })),
      tambah("satu", ...kartu("f0", 12, 70, 40, 36, W.daun, "1", 14)),
      tambah("dua@2", ...kartu("f1", 58, 70, 40, 36, W.kapur, "2", 14)),
      tambah("tiga", ...kartu("f2", 104, 70, 40, 36, W.daun, "3", 14)),
      tambah("empat", ...kartu("f3", 150, 70, 40, 36, W.kapur, "4", 14)),
      tambah("enam", ...kartu("f4", 196, 70, 40, 36, W.daun, "6", 14)),
      tambah("belas@2", ...kartu("f5", 242, 70, 46, 36, W.kapur, "12", 14)),
    ),
    k(
      SUARA_F3,
      tambah(0, teks("n6", 150, 134, "6 faktor", 14, W.merah, { z: 3 })),
      tambah("klepon", emo("k1", 110, 162, E.klepon, 16, { z: 3 }), emo("k2", 150, 162, E.klepon, 16, { z: 3 }), emo("k3", 190, 162, E.klepon, 16, { z: 3 })),
      tambah("sisa", emo("ok", 150, 186, E.benar, 14, { z: 3 })),
    ),
  ],
};
