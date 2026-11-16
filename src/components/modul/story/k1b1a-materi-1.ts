import type { AdeganStory, Obj } from "./logika-story";
import { E, W, bicara, deretMainan, emo, garis, judul, kartu, kotak, lemari, orang, tata, teks, type Titik } from "./k1b1a-gambar";
import { bersih, hapus, hitungMainan, idx, k, redamkan, sorotkan, tambah, ubah } from "./k1b1a-bantu";

/*
 * Cerita orisinal IGIL "Merapikan Lemari Mainan Igil" (Kelas 1 Bab 1 Sub-Bab A, bilangan nol sampai sepuluh).
 * Tokoh: Igil (adik), Kaka, Abang, dan Mamah. Masalah: kamar Igil berantakan oleh mainan.
 * Penyelesaian: memisahkan mainan sejenis, menghitung satu per satu, lalu mencatat banyaknya dalam tabel.
 * Rujukan topik: kurikulum Kelas 1 Bab 1 Sub-Bab A (menghitung, membaca, dan menulis bilangan nol sampai sepuluh); tidak ada kalimat atau contoh yang diambil dari buku.
 */

const lantai = (): Obj => garis("lantai", 10, 172, 280, 0, W.coklat, 2.5);
/** Rak panjang tempat mainan yang sudah dihitung. */
const rak = (id: string): Obj[] => [kotak(id, 50, 144, 200, 30, "#F5D7A1", W.coklat, { rx: 3, tebal: 2, z: -1 }), garis(`${id}-p`, 50, 174, 200, 0, W.coklat, 3, { z: -1 })];
const idSemua = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}${i}`);

/* ------------------------------ 1. Kamar Igil berantakan ------------------------------ */
const SUARA_A1 = "Ini Igil. Ini kamar Igil. Wah, mainannya ada di mana-mana!";
const SUARA_A2 = "Mobil di sini. Boneka di sana. Bola menggelinding ke pojok. Aduh, Igil sampai tersandung!";
const SUARA_A3 = "Lalu Mamah datang. Mamah berkata, Igil, tolong rapikan mainanmu, ya. Simpan semuanya di lemari.";
const SUARA_A4 = "Igil mulai bekerja. Mainan dimasukkan sembarangan. Mainan bertumpuk tinggi, lalu jatuh lagi. Gubrak!";
const SUARA_A5 = "Igil duduk lemas. Mainannya banyak sekali. Igil bingung harus mulai dari mana.";

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
      sorotkan("Mobil", "ac0"),
      sorotkan("Boneka", "ac1"),
      ubah("menggelinding", { id: "ac2", x: 30, y: 62 }),
      ubah("tersandung!", { id: "ig", rot: 25 }),
      tambah("tersandung!", emo("pus", 40, 120, E.pusing, 18)),
    ),
    k(
      SUARA_A3,
      ubah(0, { id: "ig", rot: 0 }),
      hapus(0, "pus"),
      redamkan(0, "ac0", "ac1"),
      tambah("Mamah", ...orang("mm", 40, 100, E.mamah, "Mamah")),
      tambah("tolong", ...bicara("mmb", 62, 30, 146, "Igil, rapikan mainanmu, ya!")),
      sorotkan("lemari.", "lm-b"),
    ),
    k(
      SUARA_A4,
      hapus(0, "mm", "mm-n", "mmb-k", "mmb-t0"),
      redamkan(0, "lm-b"),
      ubah("dimasukkan", { id: "ac0", x: 250, y: 74 }, { id: "ac1", x: 236, y: 62 }, { id: "ac4", x: 264, y: 54 }),
      ubah("jatuh", { id: "ac0", x: 206, y: 168 }, { id: "ac1", x: 250, y: 168 }, { id: "ac4", x: 136, y: 168 }),
      tambah("Gubrak!", teks("gb", 150, 46, "Gubrak!", 16, W.merah)),
    ),
    k(
      SUARA_A5,
      hapus(0, "gb"),
      tambah("lemas.", emo("lel", 74, 138, E.lelah, 20)),
      tambah("bingung", emo("tny", 74, 112, E.tanya, 18)),
    ),
  ],
};

/* ------------------------------ 2. Kaka dan Abang datang ------------------------------ */
const SUARA_B1 = "Tiba-tiba pintu terbuka. Kaka dan Abang masuk ke kamar. Kenapa wajahmu sedih, Igil?";
const SUARA_B2 = "Igil menjawab pelan. Mainanku terlalu banyak. Aku tidak bisa merapikannya sendiri.";
const SUARA_B3 = "Kaka tersenyum. Tenang, kita kerjakan bertiga. Kita pisahkan dulu mainan yang sejenis.";
const SUARA_B4 = "Semua mobil dikumpulkan di sebelah kiri. Semua boneka di tengah. Semua bola di sebelah kanan.";
const SUARA_B5 = "Sekarang mainan sudah berkelompok. Kelihatan rapi, kan? Igil mulai tersenyum lagi.";

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
      tambah(0, judul("Kaka dan Abang datang"), lantai(), ...orang("ig", 150, 150, E.igil, "Igil"), emo("lel", 174, 126, E.lelah, 18)),
      tambah("Kaka", ...orang("kk", 50, 150, E.kaka, "Kaka")),
      tambah("Abang", ...orang("ab", 250, 150, E.abang, "Abang")),
      tambah("Kenapa", ...bicara("kkb", 14, 92, 110, "Kenapa sedih?")),
    ),
    k(
      SUARA_B2,
      hapus(0, "kkb-k", "kkb-t0"),
      tambah("Mainanku", ...bicara("igb", 80, 92, 140, "Aku tidak bisa sendiri...")),
      sorotkan("sendiri.", "lel"),
    ),
    k(
      SUARA_B3,
      bersih(0),
      tambah(0, judul("Pisahkan yang sejenis"), emo("kk2", 22, 50, E.kaka, 24)),
      tambah("Tenang,", ...bicara("kkb", 40, 32, 130, "Ayo, kita bertiga!")),
      tambah("pisahkan", ...deretMainan(E.mobil, "pm", ACAK_MOBIL), ...deretMainan(E.boneka, "pb", ACAK_BONEKA), ...deretMainan(E.bola, "pl", ACAK_BOLA)),
    ),
    k(
      SUARA_B4,
      tambah(0, kotak("al0", 14, 76, 84, 116, W.langit, W.biru, { rx: 8, z: -1 }), kotak("al1", 108, 76, 84, 116, W.pink, W.biru, { rx: 8, z: -1 }), kotak("al2", 202, 76, 84, 116, W.hijauMuda, W.biru, { rx: 8, z: -1 })),
      ubah("mobil", ...pindah("pm", KEL_MOBIL)),
      ubah("boneka", ...pindah("pb", KEL_BONEKA)),
      ubah("bola", ...pindah("pl", KEL_BOLA)),
    ),
    k(
      SUARA_B5,
      hapus(0, "kkb-k", "kkb-t0"),
      sorotkan("berkelompok.", "al0", "al1", "al2"),
      tambah("Igil", emo("ig2", 214, 52, E.igil, 24)),
      tambah("tersenyum", emo("sn", 244, 50, E.senang, 20)),
    ),
  ],
};

/* ------------------------------ 3. Menghitung mobil satu per satu ------------------------------ */
const SUARA_C1 = "Abang berkata, sekarang kita hitung. Mulai dari mobil-mobilan dulu, ya.";
const SUARA_C2 = "Igil cepat-cepat ikut menghitung. Satu, dua, tiga, empat, lima, enam, tujuh!";
const SUARA_C3 = "Abang tertawa. Tunggu dulu, Igil. Ada mobil yang tersentuh dua kali. Mobilnya tidak sampai tujuh.";
const SUARA_C4 = "Abang mengajari caranya. Tunjuk satu mobil, sebut satu angka. Jangan terburu-buru.";
const SUARA_C5 = "Ayo hitung lagi bersama Abang. Pelan-pelan. Satu, dua, tiga, empat, lima.";
const SUARA_C6 = "Setiap mobil disentuh satu kali saja. Tidak ada yang terlewat. Ada lima mobil.";
const SUARA_C7 = "Mobil yang sudah dihitung masuk ke rak pertama. Rak mobil sudah rapi.";
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
      tambah(0, judul("Menghitung mobil-mobilan"), ...orang("ab", 26, 178, E.abang, "Abang")),
      tambah("mobil-mobilan", ...deretMainan(E.mobil, "mb", PM, 24)),
    ),
    k(
      SUARA_C2,
      tambah(0, ...orang("ig", 274, 178, E.igil, "Igil")),
      ...SALAH.map(([m, dx], i) => tambah(idx(SUARA_C2, KATA7[i]), teks(`sx${i}`, PM[m].x + dx, 71, String(i + 1), 11, W.merah))),
    ),
    k(
      SUARA_C3,
      sorotkan("dua", "sx0", "sx1", "sx3", "sx4"),
      tambah("Tunggu", ...bicara("abb", 50, 138, 130, "Tunggu dulu, Igil!")),
      tambah("tujuh.", teks("x7", 220, 154, "❌", 16)),
    ),
    k(
      SUARA_C4,
      hapus(0, ...idSemua("sx", 7), "abb-k", "abb-t0", "x7"),
      tambah("Tunjuk", ...kartu("atr", 60, 138, 180, 24, W.krem, ["tunjuk satu, sebut satu"], 9.4)),
    ),
    k(SUARA_C5, ...hitungMainan(SUARA_C5, "mb", PM, 24, "Pelan-pelan.")),
    k(
      SUARA_C6,
      hapus(0, "atr-k", "atr-t0", "tg"),
      sorotkan("Setiap", ...idSemua("mb", 5)),
      tambah("lima", ...kartu("hs", 90, 138, 120, 26, W.emas, ["Ada 5 mobil"], 11)),
    ),
    k(
      SUARA_C7,
      hapus(0, ...idSemua("mbn", 5), "hs-k", "hs-t0"),
      tambah("rak", ...rak("rk")),
      ubah("masuk", ...PM.map((_, i) => ({ id: `mb${i}`, x: 74 + i * 38, y: 166, sorot: false }))),
      tambah("rapi.", emo("ok", 150, 112, E.benar, 26)),
    ),
  ],
};

/* ------------------------------ 4. Angka terakhir adalah banyaknya ------------------------------ */
const SUARA_D1 = "Sekarang giliran Kaka. Kaka menghitung boneka beruang. Satu, dua, tiga, empat.";
const SUARA_D2 = "Igil bertanya. Jadi, bonekanya ada berapa, Kak?";
const SUARA_D3 = "Kaka menjawab. Lihat angka terakhir yang kita sebut. Angka terakhirnya empat. Jadi, ada empat boneka.";
const SUARA_D4 = "Igil penasaran. Ia menghitung lagi dari kanan. Satu, dua, tiga, empat.";
const SUARA_D5 = "Hasilnya tetap empat. Dari kiri atau dari kanan, banyaknya sama saja.";
const SUARA_D6 = "Igil berseru. Aku tahu! Angka terakhir adalah banyaknya.";
const SUARA_D7 = "Boneka-boneka pun masuk ke rak kedua. Rak boneka juga sudah rapi.";
const PB = tata(4, 96);

export const ADEGAN_TERAKHIR: AdeganStory = {
  id: "angka-terakhir",
  judul: "Angka terakhir adalah banyaknya",
  sumber: "Materi: angka terakhir adalah banyaknya",
  latar: "#F0FDFA",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Menghitung boneka"), ...orang("kk", 26, 178, E.kaka, "Kaka")),
      tambah("boneka", ...deretMainan(E.boneka, "bk", PB, 24)),
      ...hitungMainan(SUARA_D1, "bk", PB, 24, "beruang."),
    ),
    k(
      SUARA_D2,
      tambah(0, ...orang("ig", 274, 178, E.igil, "Igil")),
      tambah("berapa,", ...bicara("igb", 130, 140, 110, "Ada berapa, Kak?")),
    ),
    k(
      SUARA_D3,
      hapus(0, "igb-k", "igb-t0", "tg"),
      ubah("terakhir", { id: "bkn0", op: 0.3 }, { id: "bkn1", op: 0.3 }, { id: "bkn2", op: 0.3 }),
      ubah("terakhirnya", { id: "bkn3", u: 18 }),
      sorotkan("terakhirnya", "bk3"),
      tambah(idx(SUARA_D3, "Jadi"), ...kartu("jw", 90, 138, 120, 26, W.emas, ["Ada 4 boneka"], 11)),
    ),
    k(
      SUARA_D4,
      hapus(0, ...idSemua("bkn", 4), "jw-k", "jw-t0"),
      redamkan(0, "bk3"),
      ...hitungMainan(SUARA_D4, "bk", PB, 24, "kanan.", [3, 2, 1, 0]),
    ),
    k(
      SUARA_D5,
      tambah("tetap", ...kartu("tp", 90, 138, 120, 26, W.emas, ["Tetap 4 boneka"], 11)),
      tambah("sama", emo("jp", 232, 154, E.jempol, 22)),
    ),
    k(
      SUARA_D6,
      hapus(0, "tg", "tp-k", "tp-t0", "jp"),
      tambah("tahu!", emo("sn", 274, 140, E.senang, 20)),
      tambah("terakhir", ...kartu("ing", 46, 136, 208, 30, W.hijauMuda, ["angka terakhir = banyaknya"], 10.5)),
    ),
    k(
      SUARA_D7,
      hapus(0, ...idSemua("bkn", 4), "ing-k", "ing-t0", "sn"),
      tambah("rak", ...rak("rk")),
      ubah("masuk", ...PB.map((_, i) => ({ id: `bk${i}`, x: 90 + i * 40, y: 166 }))),
      tambah("rapi.", emo("ok", 150, 112, E.benar, 26)),
    ),
  ],
};
