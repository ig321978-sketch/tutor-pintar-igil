import type { AdeganStory, Obj } from "./logika-story";
import { E, W, benda, emo, idBenda, judul, kartu, kotak, kotakIsi, lantai, panah, pindah, rakKayu, teks, tokoh } from "./k3b1F-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah } from "./k3b1F-bantu";

/*
 * Cerita orisinal IGIL "Telur Bu Mirna" (Kelas 3 Bab 1 Sub-Bab F, perkalian sampai seratus), Toko Kelontong Pak Joko.
 * Naskah suara dari naskah/story-naskah-k3b1f.md. Bagian ini: salah langkah menjumlah dua bilangan, susunan baris dan kolom, dan menukar urutan.
 */

/* ------------------------------ 4. Salah langkah: menjumlah dua bilangan ------------------------------ */
const SUARA_S1 = "Ada tiga kotak berisi enam telur. Raka berseru, tiga ditambah enam sembilan! Kalau salah, aku mengelap semua rak sendirian!";
const SUARA_S2 = "Salsa membuka kotak satu per satu: enam, dua belas, delapan belas. Telurnya delapan belas, bukan sembilan.";
const SUARA_S3 = "Perkalian menjumlah isi yang sama berulang sebanyak kotaknya, bukan menjumlah dua bilangan.";

const X_KD = [78, 129, 180] as const;
const KD = [0, 1, 2].flatMap((i) => kotakIsi(`kd${i}`, X_KD[i], 62, 6, 3, 12));

export const ADEGAN_SALAH_JUMLAH: AdeganStory = {
  id: "salah-jumlah",
  judul: "Salah menjumlah dua bilangan",
  sumber: "Materi: salah langkah, jumlah bukan kali",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Jumlah atau Kali?"), ...lantai("lt", 150)),
      tambah("tiga", teks("n3", 150, 52, "3 kotak", 10, W.ungu)),
      tambah("kotak", ...KD),
      tambah("enam", teks("n6", 150, 108, "6 telur", 10, W.merah)),
      tambah("Raka", ...tokoh("rk", 40, 184, "Raka")),
      tambah("ditambah", teks("rj", 70, 124, "3 + 6", 12, W.merah)),
      tambah("sembilan!", teks("rh", 70, 138, "= 9 ?", 12, W.merah)),
      tambah("rak", ...rakKayu("rr", 236, 92, 52, 50, 2), emo("db", 262, 86, E.debu, 18)),
    ),
    k(
      SUARA_S2,
      hapus(0, "n6"),
      tambah("Salsa", ...tokoh("sl", 250, 184, "Salsa")),
      tambah("satu", teks("sp", 150, 128, "1 per 1", 10, W.ungu)),
      sorotkan("enam,", "kd0"),
      tambah("enam,", teks("c0", 99, 108, "6", 12, W.merah)),
      sorotkan("dua", "kd1"),
      tambah("dua", teks("c1", 150, 108, "12", 12, W.merah)),
      sorotkan("belas@2", "kd2"),
      tambah("belas@2", teks("c2", 201, 108, "18", 12, W.merah)),
      tambah("Telurnya", teks("ts", 150, 158, "18 telur", 15, W.hijau)),
      tambah("bukan", emo("xs", 100, 136, E.salah, 18)),
    ),
    k(
      SUARA_S3,
      bersih(0),
      tambah(0, judul("Kali = Jumlah Berulang"), ...lantai("lt", 150), ...tokoh("sl", 40, 184, "Salsa")),
      tambah("Perkalian", teks("ka", 150, 62, "3 × 6 = 6 + 6 + 6", 17, W.hijau)),
      tambah("sebanyak", teks("kb", 150, 80, "isi sama, 3 kali", 9, W.ungu)),
      tambah("bukan", teks("kc", 150, 114, "3 + 6", 17, W.merah), emo("xk", 205, 112, E.salah, 20)),
      tambah("dua", teks("kd", 150, 134, "2 bilangan", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ 5. Baris dan kolom ------------------------------ */
const SUARA_B1 = "Bu Mirna menyusun botol kecap di rak: tiga baris, tiap baris tujuh botol.";
const SUARA_B2 = "Hitung per baris: tujuh, empat belas, dua puluh satu. Susunan itu ditulis tiga kali tujuh.";
const SUARA_B3 = "Botolnya ada dua puluh satu tersusun rapi dalam baris dan kolom.";

/** Dua puluh satu botol kecap pada rak tiga tingkat: baris r (0-2), kolom c (0-6). Id `bt{r}_{c}` dan `bt{r}_{c}-n`. */
const BOTOL_Y = [68, 108, 148] as const;
const botolRak = (r: number, c: number): Obj[] => benda(`bt${r}_${c}`, 86 + c * 22, BOTOL_Y[r], "botol", 4.4);
const SEMUA_BOTOL = [0, 1, 2].flatMap((r) => Array.from({ length: 7 }, (_, c) => botolRak(r, c)).flat());
const idBaris = (r: number): string[] => Array.from({ length: 7 }, (_, c) => idBenda(`bt${r}_${c}`, "botol")).flat();
const SEMUA_ID_BOTOL = [0, 1, 2].flatMap(idBaris);

export const ADEGAN_BARIS_KOLOM: AdeganStory = {
  id: "baris-kolom",
  judul: "Botol kecap di rak",
  sumber: "Materi: susunan baris dan kolom",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Susunan di Rak"), ...lantai("lt", 164)),
      tambah("Bu", ...tokoh("bu", 30, 184, "Bu Mirna")),
      tambah("rak:", ...rakKayu("rk", 70, 40, 180, 120, 3)),
      tambah("tiga", teks("n3", 278, 132, "3 baris", 9, W.ungu)),
      tambah("tujuh", ...SEMUA_BOTOL),
      tambah("botol.", teks("n7", 190, 34, "7 botol", 9, W.merah)),
    ),
    k(
      SUARA_B2,
      sorotkan("tujuh,", ...idBaris(0)),
      tambah("tujuh,", teks("c0", 272, 72, "7", 12, W.merah)),
      sorotkan("belas,", ...idBaris(1)),
      tambah("belas,", teks("c1", 272, 112, "14", 12, W.merah)),
      sorotkan("satu.", ...idBaris(2)),
      tambah("satu.", teks("c2", 272, 152, "21", 12, W.merah)),
      tambah("ditulis", teks("ft", 150, 183, "3 × 7", 16, W.biru)),
    ),
    k(
      SUARA_B3,
      redamkan("Botolnya", ...SEMUA_ID_BOTOL),
      ubah("dua", { id: "ft", isi: "3 × 7 = 21" }),
      sorotkan("rapi", ...SEMUA_ID_BOTOL),
      tambah("baris", teks("lb", 38, 68, "baris", 9, W.merah), panah("pb", 54, 66, 12, 0, W.merah, 2)),
      tambah("kolom.", teks("lk", 90, 32, "kolom", 9, W.hijau), panah("pk", 90, 36, 0, 12, W.hijau, 2)),
    ),
  ],
};

/* ------------------------------ 6. Tukar urutan ------------------------------ */
const SUARA_U1 = "Bima memutar rak botol. Sekarang ada tujuh baris, tiap baris tiga botol.";
const SUARA_U2 = "Jumlah botolnya tetap sama: tiga kali tujuh sama dengan tujuh kali tiga, yaitu dua puluh satu.";
const SUARA_U3 = "Urutan bilangan pada perkalian boleh ditukar, hasilnya tidak berubah.";

/** Dua puluh satu botol: tiga baris tujuh kolom (awal), lalu diputar menjadi tujuh baris tiga kolom. Id `gb0`..`gb20`. */
const SEL = 13;
const letakTiga = (i: number): [number, number] => [150 + ((i % 7) - 3) * SEL, 95 + (Math.floor(i / 7) - 1) * SEL];
const letakTujuh = (i: number): [number, number] => [150 + ((i % 3) - 1) * SEL, 95 + (Math.floor(i / 3) - 3) * SEL];
const gbTiga = (): Obj[] => Array.from({ length: 21 }, (_, i) => benda(`gb${i}`, letakTiga(i)[0], letakTiga(i)[1], "botol", 4.4)).flat();
const gbTujuh = (): Obj[] => Array.from({ length: 21 }, (_, i) => benda(`gb${i}`, letakTujuh(i)[0], letakTujuh(i)[1], "botol", 4.4)).flat();

export const ADEGAN_TUKAR_URUTAN: AdeganStory = {
  id: "tukar-urutan",
  judul: "Rak botol diputar",
  sumber: "Materi: menukar urutan perkalian",
  latar: "#FAF5FF",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Rak Diputar"), ...lantai("lt", 164)),
      tambah("Bima", ...tokoh("bm", 40, 184, "Bima")),
      tambah("rak", ...gbTiga()),
      tambah("memutar", emo("pt", 250, 150, E.putar, 24)),
      ubah("Sekarang", ...pindah(gbTujuh())),
      tambah("tujuh", teks("n7", 232, 95, "7 baris", 10, W.merah)),
      tambah("tiga", teks("n3", 68, 95, "3 botol", 10, W.hijau)),
    ),
    k(
      SUARA_U2,
      bersih(0),
      tambah(0, judul("Hasil Tetap Sama"), ...kartu("ka", 24, 58, 100, 40, W.krem, ["3 × 7"], 20), ...kartu("kb", 176, 58, 100, 40, W.krem, ["7 × 3"], 20)),
      tambah("sama@2", teks("sm", 150, 86, "=", 26, W.merah)),
      tambah("dua", teks("h1", 74, 126, "= 21", 20, W.hijau), teks("h2", 226, 126, "= 21", 20, W.hijau)),
      tambah("satu.", ...tokoh("bm", 150, 184, "Bima")),
    ),
    k(
      SUARA_U3,
      bersih(0),
      tambah(0, judul("Boleh Ditukar"), kotak("fb", 60, 44, 180, 56, W.krem, W.coklat, { rx: 8, tebal: 1.6, z: -1 }), teks("u3", 100, 84, "3", 32, W.merah), teks("ux", 150, 84, "×", 24, W.biru), teks("u7", 200, 84, "7", 32, W.hijau)),
      tambah("boleh", emo("ts", 150, 124, E.tukar, 28)),
      ubah("ditukar,", { id: "u3", isi: "7", warna: W.hijau }, { id: "u7", isi: "3", warna: W.merah }),
      tambah("hasilnya", teks("hs", 150, 160, "hasil tetap 21", 13, W.hijau)),
      tambah("tidak", emo("ok", 262, 160, E.benar, 24)),
    ),
  ],
};
