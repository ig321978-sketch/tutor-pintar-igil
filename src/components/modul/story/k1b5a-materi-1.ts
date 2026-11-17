import type { AdeganStory, Obj } from "./logika-story";
import { E, W, WARNA_IKAN, emo, geserIkan, isiKantong, jaring, judul, kantongIkan, kartu, kawanan, kotak, orang, papanLabel, sekat, teks, wadah, type Titik } from "./k1b5a-gambar";
import { KATA_BILANGAN, hapus, idx, k, pindahHitung, sorotkan, tambah, ubah } from "./k1b5a-bantu";

/*
 * Cerita orisinal IGIL "Ikan Baru Datang" (Kelas 1 Bab 5 Sub-Bab A, bilangan sampai dua puluh), awal cerita Akuarium Ikan Hias Abang.
 * Masalah: kiriman ikan guppy berenang terus, hitungan Igil berubah-ubah, padahal tiap akuarium perlu label yang tepat.
 * Penyelesaian: satu ikan satu hitungan dengan jaring ke wadah bersekat sepuluh, sepuluh dulu lalu sisanya.
 */

const S = 0.6;
const GUPPY = Array.from({ length: 14 }, (_, i) => `g${i}`);
const pindahSemua = (ids: string[], pts: Titik[]) => ids.flatMap((id, i) => geserIkan(id, pts[i].x, pts[i].y, S));

/* ------------------------------ 1. Kiriman ikan datang ------------------------------ */
const SUARA_N1 = "Abang ingin membuka lapak ikan hias. Pagi ini guppy kiriman datang. Kata Mamah, jangan sampai pembeli kekurangan ikan!";
const SUARA_N2 = "Di kantong tertulis guppy empat belas. Igil buru-buru menghitung ikan yang berenang. Sekali dapat tiga belas, sekali lagi lima belas!";
const SUARA_N3 = "Kata Kaka, hitunganmu berubah terus, Igil! Kalau salah, pembeli kecewa. Abang butuh angka yang tepat untuk label.";
const POS_A = isiKantong(14, 210, 106, 4, 20, 13);
const POS_B = isiKantong(14, 216, 104, 4, 19, 14).reverse();
const POS_C = isiKantong(14, 212, 108, 4, 20, 12).map((p, i, a) => a[(i + 5) % a.length]);

export const ADEGAN_DATANG: AdeganStory = {
  id: "ikan-datang",
  judul: "Kiriman ikan datang",
  sumber: "Materi: masalah menghitung ikan",
  latar: "#ECFEFF",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Kiriman ikan datang")),
      tambah("Abang", ...orang("ab", 36, 64, E.abang, "Abang")),
      tambah("lapak", emo("lp", 92, 62, E.lapak, 26), teks("lpn", 92, 84, "lapak ikan", 8, W.coklat)),
      tambah("kiriman", ...kantongIkan("kt", 196, 92, 90, 66), ...kawanan("g", POS_A, WARNA_IKAN.guppy, S)),
      tambah("Mamah", ...orang("mm", 150, 124, E.mamah, "Mamah")),
    ),
    k(
      SUARA_N2,
      hapus(0, "lp", "lpn", "ab", "ab-n", "mm", "mm-n"),
      tambah("tertulis", ...kartu("tg", 200, 66, 82, 20, W.krem, ["guppy 14"], 9)),
      tambah("Igil", ...orang("ig", 40, 130, E.igil, "Igil")),
      ubah("berenang.", ...pindahSemua(GUPPY, POS_B)),
      tambah("tiga", ...kartu("c1", 70, 92, 70, 20, W.putih, ["dapat 13"], 9)),
      ubah("lagi", ...pindahSemua(GUPPY, POS_C)),
      tambah("lima", ...kartu("c2", 70, 118, 70, 20, W.putih, ["dapat 15"], 9)),
    ),
    k(
      SUARA_N3,
      ubah("hitunganmu", ...pindahSemua(GUPPY, POS_A)),
      tambah("terus,", teks("tq", 105, 156, "13 atau 15?", 10, W.merah)),
      tambah("Kaka,", ...orang("kk", 168, 132, E.kaka, "Kaka")),
      tambah("Abang", ...orang("ab", 150, 70, E.abang, "Abang")),
      tambah("tepat,", ...kartu("tp", 150, 172, 136, 20, W.emas, ["harus tepat"], 9)),
      tambah("label.", ...papanLabel("pl", 14, 168, 60, 26), teks("pln", 44, 188, "label?", 9, W.merah)),
    ),
  ],
};

/* ------------------------------ 2. Satu ikan, satu hitungan ------------------------------ */
const SUARA_S1 = "Kaka punya cara. Ikan dipindah satu per satu dengan jaring kecil ke wadah bersekat sepuluh.";
const SUARA_S2 = "Satu ikan pindah, satu hitungan. Satu, dua, tiga, empat, lima.";
const SUARA_S3 = "Enam, tujuh, delapan, sembilan, sepuluh. Ikan yang sudah pindah tidak dihitung lagi.";
const W2 = { x: 130, y: 70, s: 30 };
const DI_KANTONG = isiKantong(14, 28, 72, 4, 18, 16);

export const ADEGAN_SATU_SATU: AdeganStory = {
  id: "satu-satu",
  judul: "Satu ikan, satu hitungan",
  sumber: "Materi: menghitung satu per satu",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Satu ikan, satu hitungan"), ...kantongIkan("kt", 14, 58, 84, 80), ...kawanan("g", DI_KANTONG, WARNA_IKAN.guppy, S)),
      tambah("Kaka", ...orang("kk", 40, 168, E.kaka, "Kaka")),
      tambah("satu", ...kartu("cr", 110, 162, 176, 22, W.krem, ["1 ikan, 1 hitungan"], 9.4)),
      tambah("jaring", ...jaring("jr", 112, 50)),
      tambah("wadah", ...wadah("w", W2.x, W2.y, W2.s)),
      tambah("sepuluh.", teks("ws", 205, 58, "10 sekat", 9, W.biru)),
    ),
    k(
      SUARA_S2,
      sorotkan("pindah,", "cr-k"),
      ...pindahHitung({ suara: SUARA_S2, kata: KATA_BILANGAN.slice(0, 5), setelah: "hitungan.", ikan: GUPPY.slice(0, 5), wx: W2.x, wy: W2.y, s: W2.s, idAngka: "wn", jaring: "jr" }),
    ),
    k(
      SUARA_S3,
      ...pindahHitung({ suara: SUARA_S3, kata: KATA_BILANGAN.slice(5, 10), ikan: GUPPY.slice(5, 10), wx: W2.x, wy: W2.y, s: W2.s, sekatMulai: 5, angkaMulai: 6, idAngka: "wn", jaring: "jr" }),
      sorotkan("lagi.", "w-b"),
      tambah("lagi.", emo("ok", 292, 60, E.benar, 10)),
    ),
  ],
};

/* ------------------------------ 3. Sepuluh dulu, lalu sisanya ------------------------------ */
const SUARA_T1 = "Sepuluh sekat sudah penuh. Igil mau menghitung ulang dari satu! Tunggu, kata Kaka, wadah penuh pasti sepuluh.";
const SUARA_T2 = "Sisa ikan masuk wadah kedua. Satu, dua, tiga, empat. Ada empat ikan.";
const SUARA_T3 = "Sepuluh dan empat menjadi empat belas. Cocok dengan tulisan penjual! Igil tertawa malu.";
const W1 = { x: 18, y: 48, s: 25 };
const WB = { x: 160, y: 48, s: 25 };
const SISA = isiKantong(4, 134, 138, 2, 22, 14);
const penuh = (id: string, x: number, y: number, s: number, warna: string | readonly string[], n = 10): Obj[] =>
  kawanan(id, Array.from({ length: n }, (_, i) => ({ x: sekat(x, y, i, s).x, y: sekat(x, y, i, s).y - 2 })), warna, S);

export const ADEGAN_SEPULUH: AdeganStory = {
  id: "sepuluh-dulu",
  judul: "Sepuluh dulu, lalu sisanya",
  sumber: "Materi: sepuluh dan sisanya",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Sepuluh dulu"), ...wadah("w1", W1.x, W1.y, W1.s), ...penuh("g", W1.x, W1.y, W1.s, WARNA_IKAN.guppy)),
      tambah(0, ...kantongIkan("kt", 116, 124, 68, 40), ...kawanan("s", SISA, WARNA_IKAN.guppy.slice(1), S)),
      tambah("penuh.", teks("p10", 80, 120, "10", 16, W.merah)),
      tambah("satu", teks("u1", 80, 150, "dari 1?", 10, W.merah)),
      tambah("ulang", teks("ul", 80, 186, "jangan hitung ulang", 8.4, W.merah)),
      sorotkan("pasti", "w1-b"),
    ),
    k(
      SUARA_T2,
      tambah("kedua.", ...wadah("w2", WB.x, WB.y, WB.s)),
      ...pindahHitung({ suara: SUARA_T2, kata: KATA_BILANGAN.slice(0, 4), setelah: "kedua.", ikan: ["s0", "s1", "s2", "s3"], wx: WB.x, wy: WB.y, s: WB.s, idAngka: "sn" }),
      tambah(idx(SUARA_T2, "Ada"), teks("p4", 222, 120, "4", 16, W.merah)),
    ),
    k(
      SUARA_T3,
      hapus(0, "kt", "kt-ik", "ul", "u1"),
      sorotkan("Sepuluh", "p10"),
      sorotkan("empat", "p4"),
      tambah("menjadi", teks("dn", 151, 120, "dan", 10, W.biru)),
      tambah("belas.", teks("hs", 151, 152, "14", 22, W.merah), teks("hsn", 151, 170, "empat belas", 10, W.biru)),
      tambah("penjual.", ...kartu("tg", 200, 178, 82, 20, W.krem, ["guppy 14"], 9), emo("ok", 291, 188, E.benar, 10)),
    ),
  ],
};
