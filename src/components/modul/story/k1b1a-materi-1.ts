import type { AdeganStory, Obj } from "./logika-story";
import { E, W, bicara, wajah, deretMainan, emo, garis, judul, kartu, kotak, lemari, orang, tata, teks, type Titik } from "./k1b1a-gambar";
import { hapus, hitungMainan, idx, k, sorotkan, tambah, ubah } from "./k1b1a-bantu";

/*
 * Cerita orisinal IGIL "Merapikan Lemari Mainan Igil" (Kelas 1 Bab 1 Sub-Bab A, bilangan nol sampai sepuluh), versi padat sekitar tiga menit tanpa latihan.
 * Tokoh: Igil (adik), Kaka, Abang, dan Mamah. Masalah: kamar Igil berantakan oleh mainan.
 * Penyelesaian: memisahkan mainan sejenis, menghitung satu per satu, lalu mencatat banyaknya dalam tabel.
 * Rujukan topik: kurikulum Kelas 1 Bab 1 Sub-Bab A (menghitung, membaca, dan menulis bilangan nol sampai sepuluh); tidak ada kalimat atau contoh yang diambil dari buku.
 */

const lantai = (): Obj => garis("lantai", 10, 172, 280, 0, W.coklat, 2.5);
const idSemua = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}${i}`);

/* ------------------------------ 1. Kamar Igil berantakan ------------------------------ */
const SUARA_A1 = "Ini kamar Igil. Wah, mainannya berserakan di mana-mana!";
const SUARA_A2 = "Mamah berkata, Igil, tolong rapikan mainanmu, ya.";
const SUARA_A3 = "Igil memasukkan mainan sembarangan. Gubrak! Mainan jatuh lagi. Igil bingung.";

/** Mainan berserakan: mobil, boneka, bola, dinosaurus, robot, yoyo. */
const BERSERAKAN: [string, number, number][] = [
  [E.mobil, 92, 156],
  [E.boneka, 150, 122],
  [E.bola, 118, 84],
  [E.dino, 182, 158],
  [E.robot, 96, 118],
  [E.yoyo, 168, 82],
];

export const ADEGAN_KAMAR: AdeganStory = {
  id: "kamar-berantakan",
  judul: "Kamar Igil berantakan",
  sumber: "Materi: masalah mainan berantakan",
  latar: "#FEF3C7",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Kamar Igil"), lantai(), ...orang("ig", 40, 156, E.igil, "Igil")),
      tambah("kamar", ...lemari("lm", 214, 40, 74, 120, 3)),
      tambah("Wah,", ...BERSERAKAN.map(([e, x, y], i) => emo(`ac${i}`, x, y, e, 22))),
    ),
    k(
      SUARA_A2,
      tambah(0, ...orang("mm", 40, 100, E.mamah, "Mamah")),
      tambah("tolong", ...bicara("mmb", 62, 30, 146, "Igil, rapikan mainanmu, ya!")),
      sorotkan("mainanmu,", "lm-b"),
    ),
    k(
      SUARA_A3,
      hapus(0, "mm", "mm-n", "mmb-k", "mmb-t0"),
      ubah("memasukkan", { id: "ac0", x: 250, y: 74, sorot: false }, { id: "ac1", x: 236, y: 62 }, { id: "ac4", x: 264, y: 54 }, { id: "lm-b", sorot: false }),
      tambah("Gubrak!", teks("gb", 150, 46, "Gubrak!", 16, W.merah)),
      ubah("jatuh", { id: "ac0", x: 206, y: 168 }, { id: "ac1", x: 250, y: 168 }, { id: "ac4", x: 136, y: 168 }),
      tambah("bingung.", emo("lel", 74, 138, E.lelah, 20), emo("tny", 74, 112, E.tanya, 18)),
    ),
  ],
};

/* ------------------------------ 2. Kaka dan Abang membantu memisahkan ------------------------------ */
const SUARA_B1 = "Kaka dan Abang datang membantu. Kata Kaka, kita pisahkan dulu mainan yang sejenis.";
const SUARA_B2 = "Mobil di kiri. Boneka di tengah. Bola di kanan.";
const SUARA_B3 = "Sekarang mainan berkelompok dan mudah dihitung.";

const ACAK_MOBIL: Titik[] = [{ x: 60, y: 96 }, { x: 204, y: 150 }, { x: 132, y: 178 }, { x: 254, y: 100 }, { x: 96, y: 146 }];
const ACAK_BONEKA: Titik[] = [{ x: 154, y: 104 }, { x: 40, y: 176 }, { x: 236, y: 184 }, { x: 196, y: 82 }];
const ACAK_BOLA: Titik[] = [{ x: 112, y: 92 }, { x: 274, y: 146 }, { x: 168, y: 140 }];
const KEL_MOBIL: Titik[] = [{ x: 40, y: 100 }, { x: 72, y: 100 }, { x: 40, y: 136 }, { x: 72, y: 136 }, { x: 56, y: 172 }];
const KEL_BONEKA: Titik[] = [{ x: 134, y: 104 }, { x: 166, y: 104 }, { x: 134, y: 146 }, { x: 166, y: 146 }];
const KEL_BOLA: Titik[] = [{ x: 228, y: 104 }, { x: 260, y: 104 }, { x: 244, y: 146 }];
const pindah = (id: string, pts: Titik[]) => pts.map((p, i) => ({ id: `${id}${i}`, x: p.x, y: p.y }));

export const ADEGAN_DIBANTU: AdeganStory = {
  id: "dibantu",
  judul: "Kaka dan Abang datang membantu",
  sumber: "Materi: memisahkan mainan sejenis",
  latar: "#EEF2FF",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Pisahkan yang sejenis"), ...wajah("kk2", 22, 50, E.kaka, 24, true)),
      tambah("Abang", emo("ab2", 278, 50, E.abang, 24)),
      tambah("Kata", ...bicara("kkb", 40, 32, 150, "Pisahkan yang sejenis!")),
      tambah("pisahkan", ...deretMainan(E.mobil, "pm", ACAK_MOBIL), ...deretMainan(E.boneka, "pb", ACAK_BONEKA), ...deretMainan(E.bola, "pl", ACAK_BOLA)),
    ),
    k(
      SUARA_B2,
      tambah(0, kotak("al0", 14, 76, 84, 116, W.langit, W.biru, { rx: 8, z: -1 }), kotak("al1", 108, 76, 84, 116, W.pink, W.biru, { rx: 8, z: -1 }), kotak("al2", 202, 76, 84, 116, W.hijauMuda, W.biru, { rx: 8, z: -1 })),
      ubah("Mobil", ...pindah("pm", KEL_MOBIL)),
      ubah("Boneka", ...pindah("pb", KEL_BONEKA)),
      ubah("Bola", ...pindah("pl", KEL_BOLA)),
    ),
    k(
      SUARA_B3,
      hapus(0, "kkb-k", "kkb-t0"),
      sorotkan("berkelompok", "al0", "al1", "al2"),
      tambah("mudah", emo("ig2", 214, 52, E.igil, 24), emo("sn", 244, 50, E.senang, 20)),
    ),
  ],
};

/* ------------------------------ 3. Menghitung mobil satu per satu ------------------------------ */
const SUARA_C1 = "Igil menghitung mobil terburu-buru. Satu, dua, tiga, empat, lima, enam, tujuh!";
const SUARA_C2 = "Salah! Ada mobil yang tersentuh dua kali. Kata Abang, tunjuk satu mobil, sebut satu angka.";
const SUARA_C3 = "Ayo hitung pelan-pelan. Satu, dua, tiga, empat, lima. Ada lima mobil.";
const PM = tata(5, 96);
/** Hitungan Igil yang tergesa: tiap kata jatuh pada mobil ini (mobil pertama dan ketiga tersentuh dua kali). */
const SALAH: [number, number][] = [[0, -8], [0, 8], [1, 0], [2, -8], [2, 8], [3, 0], [4, 0]];
const KATA7 = ["satu", "dua", "tiga", "empat", "lima", "enam", "tujuh!"];

export const ADEGAN_HITUNG_MOBIL: AdeganStory = {
  id: "hitung-mobil",
  judul: "Menghitung mobil satu per satu",
  sumber: "Materi: tunjuk satu, sebut satu angka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Menghitung mobil-mobilan"), ...orang("ab", 26, 178, E.abang, "Abang"), ...orang("ig", 274, 178, E.igil, "Igil"), ...deretMainan(E.mobil, "mb", PM, 24)),
      ...SALAH.map(([m, dx], i) => tambah(idx(SUARA_C1, KATA7[i]), teks(`sx${i}`, PM[m].x + dx, 71, String(i + 1), 11, W.merah))),
    ),
    k(
      SUARA_C2,
      tambah("Salah!", teks("x7", 220, 154, "❌", 16)),
      sorotkan("dua", "sx0", "sx1", "sx3", "sx4"),
      hapus("tunjuk", ...idSemua("sx", 7), "x7"),
      tambah("tunjuk", ...kartu("atr", 60, 138, 180, 24, W.krem, ["tunjuk satu, sebut satu"], 9.4)),
    ),
    k(
      SUARA_C3,
      ...hitungMainan(SUARA_C3, "mb", PM, 24, "pelan-pelan."),
      hapus(idx(SUARA_C3, "Ada"), "atr-k", "atr-t0", "tg"),
      tambah(idx(SUARA_C3, "Ada"), ...kartu("hs", 90, 138, 120, 26, W.emas, ["Ada 5 mobil"], 11)),
    ),
  ],
};

/* ------------------------------ 4. Angka terakhir adalah banyaknya ------------------------------ */
const SUARA_D1 = "Kaka menghitung boneka. Satu, dua, tiga, empat.";
const SUARA_D2 = "Angka terakhir yang disebut adalah empat. Jadi, ada empat boneka.";
const SUARA_D3 = "Dihitung dari kanan pun hasilnya tetap empat. Angka terakhir adalah banyaknya.";
const PB = tata(4, 96);

export const ADEGAN_TERAKHIR: AdeganStory = {
  id: "angka-terakhir",
  judul: "Angka terakhir adalah banyaknya",
  sumber: "Materi: angka terakhir adalah banyaknya",
  latar: "#F0FDFA",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Menghitung boneka"), ...orang("kk", 26, 178, E.kaka, "Kaka"), ...deretMainan(E.boneka, "bk", PB, 24)),
      ...hitungMainan(SUARA_D1, "bk", PB, 24, "boneka."),
    ),
    k(
      SUARA_D2,
      hapus(0, "tg"),
      ubah("terakhir", { id: "bkn0", op: 0.3 }, { id: "bkn1", op: 0.3 }, { id: "bkn2", op: 0.3 }, { id: "bkn3", u: 18 }),
      sorotkan("terakhir", "bk3"),
      tambah(idx(SUARA_D2, "Jadi"), ...kartu("jw", 90, 138, 120, 26, W.emas, ["Ada 4 boneka"], 11)),
    ),
    k(
      SUARA_D3,
      hapus(0, "jw-k", "jw-t0"),
      ubah("kanan", { id: "bkn0", isi: "4", op: 1, u: 18 }, { id: "bkn1", isi: "3", op: 1 }, { id: "bkn2", isi: "2", op: 1 }, { id: "bkn3", isi: "1", u: 11 }, { id: "bk3", sorot: false }),
      sorotkan("kanan", "bk0"),
      tambah("tetap", ...kartu("tp", 90, 132, 120, 26, W.emas, ["Tetap 4 boneka"], 11)),
      tambah("banyaknya.", ...kartu("ing", 46, 166, 208, 26, W.hijauMuda, ["angka terakhir = banyaknya"], 10.5)),
    ),
  ],
};
