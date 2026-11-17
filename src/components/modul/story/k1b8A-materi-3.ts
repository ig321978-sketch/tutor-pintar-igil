import type { AdeganStory } from "./logika-story";
import { BANYAK, E, JENIS, URUT_JENIS, W, WK, emo, jam, judul, kapur, kartu, kotakCerita, mobil, orang, pakPos, papan, rak, tanah, tengahPetak } from "./k1b8A-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k1b8A-bantu";

/*
 * Cerita orisinal IGIL "Kotak Cerita Berantakan" (Kelas 1 Bab 8 Sub-Bab A). Naskah suara dari naskah/story-naskah-k1b8a.md.
 * Bagian ini: jumlah semuanya dan penutup yang menjembatani ke Sub-Bab B.
 */

/* ------------------------------ 8. Jumlah semuanya ------------------------------ */
const SUARA_J1 = "Pak Pos bertanya lagi, semuanya ada berapa kotak?";
const SUARA_J2 = "Enam tambah empat sama dengan sepuluh. Sepuluh tambah lima sama dengan lima belas. Lima belas tambah tiga sama dengan delapan belas.";
const SUARA_J3 = "Delapan belas kotak, dan laporan selesai sebelum pukul empat!";

const BARIS_Y = [56, 86, 116, 146];
/** Letak tiap bagian kalimat penjumlahan di papan: lambang ke-s pada baris ke-b. */
const KX = [46, 80, 114, 148, 190];
const KY = [68, 108, 148];

export const ADEGAN_JUMLAH: AdeganStory = {
  id: "jumlah",
  judul: "Jumlah semuanya",
  sumber: "Materi: jumlah semua, jumlah berjalan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_J1,
      tambah(0, judul("Jumlah semuanya"), papan("pj", 18, 28, 212, 156)),
      tambah("Pak", ...pakPos("pp", 264, 110)),
      tambah("bertanya", emo("tn", 264, 76, E.tanya, 24)),
      tambah("semuanya", ...URUT_JENIS.flatMap((j, i) => [emo(`lb${i}`, 44, BARIS_Y[i] + 14, JENIS[j].e, 17), kapur(`ns${i}`, 150, BARIS_Y[i] + 15, String(BANYAK[j]), 14, { warna: WK.kapurKuning })])),
    ),
    k(
      SUARA_J2,
      hapus(0, ...URUT_JENIS.flatMap((_, i) => [`lb${i}`, `ns${i}`])),
      ...[
        [0, "6", 0], [1, "+", 1], [2, "4", 2], [3, "=", 3], [5, "10", 4],
        [6, "10", 0], [7, "+", 1], [8, "5", 2], [9, "=", 3], [11, "15", 4],
        [13, "15", 0], [15, "+", 1], [16, "3", 2], [17, "=", 3], [19, "18", 4],
      ].map(([at, isi, s], n) => tambah(at as number, kapur(`kj${n}`, KX[s as number], KY[Math.floor(n / 5)], isi as string, 15, { warna: n % 5 === 4 ? WK.kapurKuning : WK.kapur }))),
    ),
    k(
      SUARA_J3,
      bersih(0),
      tambah(0, judul("Laporan selesai"), tanah("tn", 120)),
      tambah("Delapan", ...kartu("k18", 70, 32, 160, 40, W.emas, ["18 kotak"], 18)),
      tambah("laporan", ...kartu("lp", 70, 80, 160, 22, W.hijauMuda, ["Laporan: selesai"], 9.4)),
      tambah("pukul", ...jam("jm", 70, 154, 20)),
      tambah("empat!", ...kartu("j4", 100, 142, 56, 18, W.krem, ["jam 4"], 9)),
      tambah("empat!", ...pakPos("pp", 220, 160), emo("jp", 252, 150, E.jempol, 24)),
    ),
  ],
};

/* ------------------------------ 9. Penutup: jembatan ke Sub-Bab B ------------------------------ */
const SUARA_N1 = "Mobil pustaka dibuka, dan rak yang rapi menyambut anak-anak kampung.";
const SUARA_N2 = "Kaka merangkum. Pilah menurut jenis, hitung dengan turus, tulis di tabel, lalu bandingkan.";
const SUARA_N3 = "Pak Pos berbisik. Bagaimana cara tahu cerita mana yang paling disukai anak-anak? Terima kasih, Igil, Kaka, Abang, dan Mamah!";

const RX = 14;
const RW = 152;

export const ADEGAN_PENUTUP_A: AdeganStory = {
  id: "penutup",
  judul: "Mobil pustaka dibuka",
  sumber: "Materi: penutup dan jembatan ke Sub-Bab B",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Mobil pustaka dibuka"), tanah("tn", 150)),
      tambah("Mobil", ...mobil("mb", 176, 100)),
      ubah("dibuka,", { id: "mb-t", y: 92 }),
      tambah("rak", ...rak("rk", RX, 64, RW, 70, 4)),
      tambah("rapi", ...URUT_JENIS.flatMap((j, i) => Array.from({ length: 3 }, (_, s) => kotakCerita(`rr${i}${s}`, tengahPetak(RX, RW, 4, i) - 10 + 10 * s, 112, j, 10)).flat())),
      tambah("rapi", ...URUT_JENIS.map((j, i) => emo(`re${i}`, tengahPetak(RX, RW, 4, i), 88, JENIS[j].e, 15))),
      tambah("anak-anak", emo("a1", 30, 176, E.anak, 22), emo("a2", 62, 176, E.anak, 22), emo("a3", 94, 176, E.anak, 22)),
    ),
    k(
      SUARA_N2,
      bersih(0),
      tambah(0, judul("Ringkasan")),
      tambah("Kaka", ...orang("kk", 262, 150, E.kaka, "Kaka")),
      tambah("Pilah", ...kartu("r1", 20, 30, 200, 26, W.hijauMuda, ["1. Pilah menurut jenis"], 10)),
      tambah("hitung", ...kartu("r2", 20, 64, 200, 26, W.langit, ["2. Hitung dengan turus"], 10)),
      tambah("tulis", ...kartu("r3", 20, 98, 200, 26, W.krem, ["3. Tulis di tabel"], 10)),
      tambah("bandingkan.", ...kartu("r4", 20, 132, 200, 26, W.pink, ["4. Bandingkan"], 10)),
    ),
    k(
      SUARA_N3,
      bersih(0),
      tambah(0, judul("Cerita kesukaan"), tanah("tn", 130)),
      tambah("Pak", ...pakPos("pp", 150, 96)),
      tambah("berbisik.", emo("bb", 190, 90, "\u{1F92B}", 20)),
      tambah("cerita", ...kartu("cq", 60, 32, 180, 22, W.putih, ["cerita mana paling disukai?"], 9)),
      tambah("Igil,", ...orang("ig", 54, 176, E.igil, "Igil"), emo("l1", 54, 150, E.lambai, 18)),
      tambah("Kaka,", ...orang("kk", 118, 176, E.kaka, "Kaka"), emo("l2", 118, 150, E.lambai, 18)),
      tambah("Abang,", ...orang("ab", 182, 176, E.abang, "Abang"), emo("l3", 182, 150, E.lambai, 18)),
      tambah("Mamah!", ...orang("mm", 246, 176, E.mamah, "Mamah"), emo("l4", 246, 150, E.lambai, 18)),
    ),
  ],
};
