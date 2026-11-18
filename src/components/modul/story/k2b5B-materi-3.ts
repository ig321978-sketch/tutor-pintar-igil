import type { AdeganStory } from "./logika-story";
import { E, W, bedeng, bibit, bulat, emo, judul, kartu, kotak, papan, rumput, teks, tempatPetak, tokoh, tunas } from "./k2b5B-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah } from "./k2b5B-bantu";
import { BD, slot } from "./k2b5B-materi-1";

/*
 * Cerita orisinal IGIL "Bibit untuk Dua Petak" (Kelas 2 Bab 5 Sub-Bab B, setengah dari kumpulan benda), tengah cerita Kebun Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b5b.md. Bagian ini: menggabung dua setengah, tiga pertanyaan Dika, dan penutup (jembatan ke Sub-Bab C).
 */

/* ------------------------------ 7. Gabung ------------------------------ */
const SUARA_7A = "Bu Sari bertanya. Kalau setengahnya empat bibit, berapa semuanya?";
const SUARA_7B = "Chacha menggabungkan dua tumpukan, masing-masing empat bibit. Semuanya delapan.";
const SUARA_7C = "Dua setengah digabung kembali menjadi seluruhnya.";
const TUMPUK_A = [
  { x: 60, y: 76 },
  { x: 80, y: 76 },
  { x: 60, y: 96 },
  { x: 80, y: 96 },
];
const TUMPUK_C = TUMPUK_A.map((p) => ({ x: p.x + 130, y: p.y }));

export const ADEGAN_GABUNG: AdeganStory = {
  id: "gabung",
  judul: "Dua setengah menjadi seluruhnya",
  sumber: "Materi: menggabung dua setengah",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_7A,
      tambah(0, judul("Setengah dan Seluruh", W.oranye), rumput("rm", 140)),
      tambah(idx(SUARA_7A, "Sari"), ...tokoh("bs", 252, 176, "Bu Sari")),
      tambah(idx(SUARA_7A, "empat"), ...TUMPUK_A.map((p, i) => tunas(`a${i}`, p.x, p.y, 7)), teks("ln1", 70, 124, "4", 15, W.merah), teks("sg", 70, 52, "setengah", 9, W.ungu)),
      tambah(idx(SUARA_7A, "berapa"), teks("sy", 190, 96, "?", 30, W.merah)),
      tambah(idx(SUARA_7A, "semuanya?"), emo("pk", 224, 150, E.pikir, 18)),
    ),
    k(
      SUARA_7B,
      hapus(0, "sy", "pk"),
      tambah(0, ...tokoh("ch", 40, 176, "Chacha")),
      tambah(idx(SUARA_7B, "dua"), ...TUMPUK_C.map((p, i) => tunas(`c${i}`, p.x, p.y, 7)), teks("tt", 150, 38, "2 tumpukan", 9.6, W.hijau), teks("ln2", 200, 124, "4", 15, W.merah)),
      ...TUMPUK_C.map((_, i) => ubah(idx(SUARA_7B, "delapan."), { id: `c${i}`, x: TUMPUK_A[i].x + 40 })),
      ubah(idx(SUARA_7B, "delapan."), { id: "ln1", x: 90, isi: "8" }),
      hapus(idx(SUARA_7B, "delapan."), "ln2"),
    ),
    k(
      SUARA_7C,
      hapus(0, "tt"),
      tambah(0, teks("d2", 150, 40, "2 setengah", 10.5, W.hijau)),
      tambah(idx(SUARA_7C, "digabung"), teks("fm", 150, 156, "4 + 4 = 8", 14, W.merah)),
      tambah(idx(SUARA_7C, "kembali"), kotak("ol", 46, 58, 86, 60, "none", W.merah, { rx: 8, putus: true, tebal: 2, z: 5 })),
      tambah(idx(SUARA_7C, "seluruhnya."), ...kartu("sl", 176, 70, 96, 28, W.hijauMuda, ["seluruhnya"], 10.5)),
    ),
  ],
};

/* ------------------------------ 8. Tiga pertanyaan ------------------------------ */
const SUARA_8A = "Dika menulis tiga pertanyaan di papan catatannya.";
const SUARA_8B = "Satu, dibagi menjadi dua bagian? Dua, sama banyak? Tiga, tidak ada yang tersisa?";
const SUARA_8C = "Kalau jawabannya ya semua, bagian itu adalah setengah.";
const MINI = { x: 204, y: 50, w: 86, h: 44 };
const sm = (sisi: 0 | 1, i: number) => tempatPetak(MINI.x, MINI.y, MINI.w, MINI.h, sisi, i);

export const ADEGAN_TIGA_TANYA: AdeganStory = {
  id: "tiga-tanya",
  judul: "Tiga pertanyaan Dika",
  sumber: "Materi: tiga pertanyaan",
  latar: "#F8FAFC",
  ketukan: [
    k(
      SUARA_8A,
      tambah(0, judul("Papan Catatan Dika"), ...papan("pc", 14, 30, 176, 100)),
      tambah(idx(SUARA_8A, "Dika"), ...tokoh("dk", 250, 176, "Dika")),
      tambah(idx(SUARA_8A, "tiga"), teks("tj", 102, 50, "3 pertanyaan", 10, W.merah)),
      tambah(idx(SUARA_8A, "papan"), emo("dl", 170, 122, E.daftar, 14)),
      tambah(idx(SUARA_8A, "catatannya."), emo("ps", 24, 122, "\u{270F}\u{FE0F}", 14)),
    ),
    k(
      SUARA_8B,
      tambah(idx(SUARA_8B, "Satu,"), teks("q1", 24, 74, "1. dibagi 2 bagian?", 9, W.biru, { anchor: "start" })),
      sorotkan(idx(SUARA_8B, "dua"), "q1"),
      tambah(idx(SUARA_8B, "Dua,"), teks("q2", 24, 92, "2. sama banyak?", 9, W.biru, { anchor: "start" })),
      tambah(idx(SUARA_8B, "Tiga,"), teks("q3", 24, 110, "3. tidak ada sisa?", 9, W.biru, { anchor: "start" })),
    ),
    k(
      SUARA_8C,
      tambah(idx(SUARA_8C, "jawabannya"), emo("v1", 164, 72, E.benar, 12), emo("v2", 164, 90, E.benar, 12), emo("v3", 164, 108, E.benar, 12)),
      tambah(idx(SUARA_8C, "semua,"), ...bedeng("bm", MINI.x, MINI.y, MINI.w, MINI.h, false), ...[0, 1, 2].flatMap((i) => [tunas(`ml${i}`, sm(0, i).x, sm(0, i).y, 3.6), tunas(`mr${i}`, sm(1, i).x, sm(1, i).y, 3.6)])),
      tambah(idx(SUARA_8C, "bagian"), teks("sb", 247, 112, "sama banyak", 8, W.hijau)),
      tambah(idx(SUARA_8C, "setengah."), teks("st", 247, 128, "setengah", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ 9. Penutup (jembatan ke Sub-Bab C) ------------------------------ */
const SUARA_9A = "Dua petak penuh bibit cabai, dan Bu Wati tersenyum puas.";
const SUARA_9B = "Dika merangkum. Bagi satu-satu sampai habis, lalu lihat apakah kedua bagian sama banyak.";
const SUARA_9C =
  "Dari kejauhan, Pak Joko datang membawa satu labu besar. Menurutmu, kalau labu itu dibagi untuk empat orang, setiap orang mendapat berapa bagian? Terima kasih, Chacha, Dika, Nia, Bu Sari, dan Bu Wati!";

export const ADEGAN_PENUTUP_B: AdeganStory = {
  id: "penutup",
  judul: "Dua petak penuh dan tamu baru",
  sumber: "Materi: penutup dan jembatan",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_9A,
      tambah(0, judul("Dua Petak Penuh"), rumput("rm", 118), ...bedeng("bd", BD.x, BD.y, BD.w, BD.h), teks("d2", 150, 50, "2 petak", 9.6, W.hijau)),
      tambah(idx(SUARA_9A, "penuh"), ...[0, 1, 2, 3].map((i) => bibit(`u${i}`, slot(0, i).x, slot(0, i).y))),
      tambah(idx(SUARA_9A, "cabai,"), ...[0, 1, 2, 3].map((i) => bibit(`v${i}`, slot(1, i).x, slot(1, i).y))),
      tambah(idx(SUARA_9A, "Wati"), ...tokoh("bw", 250, 172, "Bu Wati")),
      tambah(idx(SUARA_9A, "tersenyum"), emo("sn", 222, 150, E.senyum, 18)),
      tambah(idx(SUARA_9A, "puas."), emo("kl", 150, 134, E.kilau, 18)),
    ),
    k(
      SUARA_9B,
      hapus(0, "sn", "kl"),
      tambah(0, ...tokoh("dk", 40, 176, "Dika")),
      tambah(idx(SUARA_9B, "merangkum."), ...kartu("rg", 72, 134, 170, 40, W.krem, ["bagi 1 - 1 sampai habis", "lalu periksa: sama banyak?"], 8.6)),
      sorotkan(idx(SUARA_9B, "habis,"), "rg-k"),
      sorotkan(idx(SUARA_9B, "kedua"), "bd-l", "bd-r"),
      tambah(idx(SUARA_9B, "banyak."), emo("ok", 150, 100, E.benar, 20)),
    ),
    k(
      SUARA_9C,
      bersih(0),
      tambah(0, judul("Sampai Jumpa!", W.ungu), rumput("rm", 118)),
      tambah(idx(SUARA_9C, "Pak"), ...tokoh("pj", 70, 128, "Pak Joko")),
      tambah(idx(SUARA_9C, "satu"), teks("l1", 150, 96, "1 labu", 10, W.merah)),
      tambah(idx(SUARA_9C, "labu"), bulat("lb", 150, 124, 18, "#F97316", "#9A3412", { z: 2 }), kotak("lbt", 147, 104, 6, 6, "#15803D", "#14532D", { rx: 1, z: 3 })),
      tambah(idx(SUARA_9C, "empat"), teks("o4", 236, 96, "4 orang", 10, W.biru)),
      tambah(idx(SUARA_9C, "berapa"), emo("qm", 236, 126, E.tanya, 22)),
      hapus(idx(SUARA_9C, "Terima"), "pj", "pj-n", "pj-km", "pj-b0", "pj-b1", "l1", "lb", "lbt", "o4", "qm"),
      tambah(idx(SUARA_9C, "Chacha,"), ...tokoh("ch", 30, 172, "Chacha"), emo("w1", 30, 138, E.lambai, 16)),
      tambah(idx(SUARA_9C, "Dika,"), ...tokoh("dk", 90, 172, "Dika"), emo("w2", 90, 138, E.lambai, 16)),
      tambah(idx(SUARA_9C, "Nia,"), ...tokoh("ni", 150, 172, "Nia"), emo("w3", 150, 138, E.lambai, 16)),
      tambah(idx(SUARA_9C, "Sari,"), ...tokoh("bs", 210, 172, "Bu Sari"), emo("w4", 210, 138, E.lambai, 16)),
      tambah(idx(SUARA_9C, "Wati"), ...tokoh("bw", 268, 172, "Bu Wati"), emo("w5", 268, 138, E.lambai, 16)),
    ),
  ],
};
