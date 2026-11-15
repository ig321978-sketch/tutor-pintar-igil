import type { AdeganStory, Obj } from "./logika-story";
import { W, bulat, emo, judul, kartu, kelompok, kotak, teks, tulisAngka } from "./k1b2b-gambar";
import { bersih, hapus, hitungAksi, idx, k, sorotkan, tambah, ubah } from "./k1b2b-bantu";

/** Sepuluh jari: `jr0` sampai `jr9`; `n` jari pertama berwarna merah (terbuka), sisanya putih (tertutup). */
const JX = (i: number): number => (i < 5 ? 35 + i * 26 : 165 + (i - 5) * 26);
const PTS_JARI = Array.from({ length: 10 }, (_, i) => ({ x: JX(i), y: 100 }));
const jari = (n: number): Obj[] => PTS_JARI.map((p, i) => bulat(`jr${i}`, p.x, p.y, 10, i < n ? W.merah : W.putih, W.biru, { tebal: 1.5 }));
const buka = (at: string | number, dari: number, sampai: number) => ({ at, ubah: Array.from({ length: sampai - dari }, (_, q) => ({ id: `jr${dari + q}`, warna: W.merah })) });
const tutup = (at: string | number, dari: number, sampai: number) => ({ at, ubah: Array.from({ length: sampai - dari }, (_, q) => ({ id: `jr${dari + q}`, warna: W.putih })) });

/* ------------------------------ 1. Delapan jari dan dua jari ------------------------------ */
const SUARA_J1 = "Kira, Halim, dan Wei menunjukkan jari mereka. Kira membuka delapan jari.";
const SUARA_J2 = "Delapan jari terbuka. Satu, dua, tiga, empat, lima, enam, tujuh, delapan.";
const SUARA_J3 = "Dua jari lagi tertutup. Kita tidak mengangkat dua jari itu.";
const SUARA_J4 = "Semua jari ada sepuluh. Delapan ditambah dua sama dengan sepuluh.";
const SUARA_J5 = "Jari terbuka dan jari tertutup bisa berganti. Tujuh jari terbuka, tiga jari tertutup, jumlahnya tetap sepuluh. Tujuh tambah tiga sama dengan sepuluh.";
const SUARA_J7 = "Ingat, jari terbuka dan jari tertutup selalu berjumlah sepuluh. Itu pasangan sepuluh yang mudah dikenali.";
const SUARA_J6 = "Sekarang enam jari terbuka dan empat jari tertutup. Enam tambah empat juga sama dengan sepuluh.";

export const ADEGAN_JARI: AdeganStory = {
  id: "jari",
  judul: "Delapan jari dan dua jari",
  sumber: "Materi: jari terbuka dan tertutup",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_J1,
      tambah(0, judul("Jari tangan"), ...jari(0)),
      tambah("Kira,", emo("jk", 70, 176, "\u{1F9D2}", 26), teks("jkn", 70, 190, "Kira", 8.6)),
      tambah("Halim,", emo("jh", 150, 176, "\u{1F9D2}", 26), teks("jhn", 150, 190, "Halim", 8.6)),
      tambah("Wei", emo("jw", 230, 176, "\u{1F9D2}", 26), teks("jwn", 230, 190, "Wei", 8.6)),
      buka("delapan", 0, 8),
    ),
    k(SUARA_J2, hapus(0, "jk", "jkn", "jh", "jhn", "jw", "jwn"), ...hitungAksi(SUARA_J2, "jr", PTS_JARI.slice(0, 8), "terbuka.")),
    k(SUARA_J3, sorotkan("tertutup.", "jr8", "jr9"), tambah("tertutup.", teks("jt", 256, 132, "tertutup", 9.4, W.ungu))),
    k(SUARA_J4, tambah("Delapan", teks("js", 150, 188, "8 + 2 = 10", 26, W.hijau))),
    k(
      SUARA_J5,
      bersih(0),
      tambah(0, judul("Berganti"), ...jari(0)),
      buka("Tujuh", 0, 7),
      tambah(idx(SUARA_J5, "tambah"), teks("js", 150, 170, "7 + 3 = 10", 30, W.hijau)),
    ),
    k(SUARA_J6, tutup("empat", 6, 7), ubah("tambah", { id: "js", isi: "6 + 4 = 10" })),
    k(SUARA_J7, bersih(0), tambah(0, judul("Selalu sepuluh"), ...jari(0), teks("j10", 150, 160, "10", 34, W.merah)), buka("terbuka", 0, 5), tambah("tertutup", emo("jo", 150, 186, "\u{1F989}", 22))),
  ],
};

/* ------------------------------ 2. Pasangan sepuluh dengan bola ------------------------------ */
const BX = (i: number): number => 24 + 28 * i;
const bola = (): Obj[] => Array.from({ length: 10 }, (_, i) => bulat(`bo${i}`, BX(i), 100, 11, W.putih, W.biru, { tebal: 1.5 }));
const warna = (at: string | number, dari: number, sampai: number, w: string) => ({ at, ubah: Array.from({ length: sampai - dari }, (_, q) => ({ id: `bo${dari + q}`, warna: w })) });

const SUARA_S1 = "Wei punya sepuluh bola dalam satu baris. Sembilan bola berwarna merah dan satu bola berwarna biru.";
const SUARA_S2 = "Sembilan ditambah satu sama dengan sepuluh. Jadi sembilan dan satu adalah pasangan bilangan untuk sepuluh.";
const SUARA_S3 = "Apakah ada pasangan yang lain? Ada! Tujuh dan tiga. Tujuh bola merah dan tiga bola biru.";
const SUARA_S4 = "Enam dan empat juga pasangan sepuluh. Lima dan lima juga pasangan sepuluh.";
const SUARA_S5 = "Pasangan sepuluh bisa kita ingat. Sembilan dan satu, delapan dan dua, tujuh dan tiga, enam dan empat, lima dan lima.";
const SUARA_S6 = "Hebat! Kamu sudah menemukan banyak pasangan sepuluh. Sepuluh ada di mana-mana.";
const PS = ["9 + 1 = 10", "8 + 2 = 10", "7 + 3 = 10", "6 + 4 = 10", "5 + 5 = 10"];
const WP = [W.langit, W.hijauMuda, W.pink, W.krem, W.lavender];
const AT_PS = [idx(SUARA_S5, "sembilan"), idx(SUARA_S5, "delapan"), idx(SUARA_S5, "tujuh"), idx(SUARA_S5, "enam"), idx(SUARA_S5, "lima")];

export const ADEGAN_SEPULUH: AdeganStory = {
  id: "sepuluh",
  judul: "Pasangan bilangan untuk sepuluh",
  sumber: "Materi: pasangan sepuluh",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Bola Wei")),
      tambah("sepuluh", ...bola(), teks("b10", 150, 66, "10", 26, W.ungu)),
      warna("Sembilan", 0, 9, W.merah),
      warna("biru.", 9, 10, "#2563EB"),
    ),
    k(SUARA_S2, tambah("Sembilan", teks("ps", 150, 160, "9 + 1 = 10", 30, W.hijau))),
    k(SUARA_S3, warna("Tujuh", 7, 9, "#2563EB"), ubah("Tujuh", { id: "ps", isi: "7 + 3 = 10" })),
    k(SUARA_S4, warna("Enam", 6, 7, "#2563EB"), ubah("Enam", { id: "ps", isi: "6 + 4 = 10" }), warna("Lima", 5, 6, "#2563EB"), ubah("Lima", { id: "ps", isi: "5 + 5 = 10" })),
    k(SUARA_S5, bersih(0), tambah(0, judul("Pasangan sepuluh")), ...PS.map((t, i) => tambah(AT_PS[i], ...kartu(`pq${i}`, 70, 30 + i * 32, 160, 28, WP[i], [t], 12)))),
    k(SUARA_S6, bersih(0), tambah(0, judul("Hebat!"), emo("ow6", 150, 84, "\u{1F989}", 50)), tambah("sepuluh.", teks("s10", 150, 150, "10", 40, W.merah))),
  ],
};

/* ------------------------------ 3. Latihan 1: pensil Kira dan Malosi ------------------------------ */
const SUARA_L1 = "Latihan satu. Kira punya empat pensil dan Malosi punya tiga pensil. Berapa semua pensil mereka?";
const SUARA_L2 = "Kita mulai dari empat, lalu maju sebanyak pensil Malosi. Lima, enam, tujuh.";
const SUARA_L3 = "Jumlahnya tujuh pensil. Empat tambah tiga sama dengan tujuh.";
const SUARA_L3B = "Kita boleh menukar urutannya. Tiga tambah empat, hasilnya tetap tujuh.";
const SUARA_L4 = "Ketuk jawaban yang benar. Pilihannya enam, tujuh, atau delapan. Tujuh yang benar. Hebat sekali!";

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan 1: pensil Kira dan Malosi",
  sumber: "Materi: latihan menjumlahkan",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Latihan 1")),
      tambah("empat", teks("lk", 30, 44, "Kira", 9.4, W.ungu, { anchor: "start" }), ...kelompok("pensil", "pk", 4, 66, 78, 36, 11)),
      tambah("tiga", teks("lm", 30, 104, "Malosi", 9.4, W.ungu, { anchor: "start" }), ...kelompok("pensil", "pm", 3, 128, 78, 36, 11)),
    ),
    k(
      SUARA_L2,
      sorotkan("empat,", "pk0", "pk1", "pk2", "pk3"),
      ...["lima,", "enam,", "tujuh."].map((kata, i) => tambah(kata, teks(`lq${i}`, 78 + i * 36, 108, String(5 + i), 12, W.merah))),
    ),
    k(SUARA_L3, tambah("tujuh", teks("lj", 150, 186, "4 + 3 = 7", 22, W.hijau))),
    k(SUARA_L3B, ubah(0, { id: "lj", x: 80, u: 17 }), tambah("Tiga", teks("lj2", 220, 186, "3 + 4 = 7", 17, W.hijau))),
    k(
      SUARA_L4,
      bersih(0),
      tambah(0, judul("Ketuk jawabannya")),
      tambah("enam,", ...kartu("o6", 30, 70, 60, 50, W.langit, ["6"], 24)),
      tambah("tujuh,", ...kartu("o7", 120, 70, 60, 50, W.langit, ["7"], 24)),
      tambah("delapan.", ...kartu("o8", 210, 70, 60, 50, W.langit, ["8"], 24)),
      sorotkan(idx(SUARA_L4, "benar", 2), "o7-k"),
      tambah("Hebat", emo("ow", 150, 160, "\u{1F989}", 40)),
    ),
  ],
};

/* ------------------------------ 4. Latihan 2: kembar atau bukan ------------------------------ */
const SUARA_D1 = "Latihan dua. Kembar atau bukan? Pertama, tiga tambah tiga.";
const SUARA_D2 = "Dua bilangannya sama, jadi kembar. Jumlahnya enam.";
const SUARA_D3 = "Sekarang, dua tambah lima. Apakah kembar? Pikirkan dulu.";
const SUARA_D4 = "Dua dan lima berbeda, jadi bukan kembar. Jumlahnya tujuh.";
const SUARA_D6 = "Ingat, bilangan kembar selalu punya dua bilangan yang sama.";
const SUARA_D5 = "Terakhir, empat tambah empat. Kembar! Jumlahnya delapan. Hebat sekali!";

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan 2: kembar atau bukan",
  sumber: "Materi: latihan bilangan kembar",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_D1, tambah(0, judul("Latihan 2")), tambah("Pertama,", teks("d1", 150, 110, "3 + 3", 48, W.ungu))),
    k(SUARA_D2, ubah("Jumlahnya", { id: "d1", isi: "3 + 3 = 6", warna: W.hijau, u: 40 }), tambah("kembar.", ...kartu("dk", 80, 140, 140, 30, W.hijauMuda, ["kembar"], 12))),
    k(SUARA_D3, bersih(0), tambah(0, judul("Latihan 2")), tambah("dua", teks("d2", 150, 110, "2 + 5", 48, W.ungu))),
    k(SUARA_D4, ubah("Jumlahnya", { id: "d2", isi: "2 + 5 = 7", warna: W.hijau, u: 40 }), tambah("bukan", ...kartu("db", 80, 140, 140, 30, W.pink, ["bukan kembar"], 12))),
    k(SUARA_D5, bersih(0), tambah(0, judul("Hebat!")), tambah("empat", teks("d3", 150, 100, "4 + 4 = 8", 40, W.hijau)), tambah("Kembar!", ...kartu("dl", 80, 130, 140, 30, W.hijauMuda, ["kembar"], 12)), tambah("Hebat", emo("ow", 150, 184, "\u{1F989}", 30))),
    k(SUARA_D6, bersih(0), tambah(0, judul("Ingat!")), tambah("kembar", ...kartu("dz1", 20, 40, 80, 40, W.hijauMuda, ["3 + 3"], 14), ...kartu("dz2", 110, 40, 80, 40, W.hijauMuda, ["4 + 4"], 14), ...kartu("dz3", 200, 40, 80, 40, W.hijauMuda, ["5 + 5"], 14)), tambah("sama.", emo("ow", 150, 130, "\u{1F989}", 44))),
  ],
};

/* ------------------------------ 5. Latihan 3: sepuluh jari dan kalimat sendiri ------------------------------ */
const SUARA_E1 = "Latihan tiga. Tujuh jari terbuka dan tiga jari tertutup. Berapa semua jari?";
const SUARA_E2 = "Tujuh tambah tiga sama dengan sepuluh. Susun kalimat ini di layar, lalu ucapkan bersama suara guru.";
const SUARA_E3 = "Sekarang buat kalimat penjumlahanmu sendiri. Ketuk dua kartu bilangan, jumlahnya paling banyak sepuluh.";
const SUARA_E4 = "Misalnya enam tambah dua sama dengan delapan. Atau lima tambah empat sama dengan sembilan. Semuanya benar.";
const SUARA_E5 = "Hebat sekali! Kamu sudah pandai menyusun kalimat penjumlahan.";

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan 3: sepuluh jari dan kalimat sendiri",
  sumber: "Materi: latihan kalimat penjumlahan",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_E1, tambah(0, judul("Latihan 3"), ...jari(0)), buka("Tujuh", 0, 7), tambah("Berapa", emo("eq", 150, 160, "\u{2753}", 34))),
    k(
      SUARA_E2,
      bersih(0),
      tambah(0, judul("Susun kalimatnya"), teks("ek", 150, 70, "7 + 3 =", 34, W.hijau, { anchor: "end", x: 200 })),
      tambah("sepuluh", ...tulisAngka("w", 206, 54, "10", 1), teks("tl", 232, 122, "ditulis: 10", 9.4, W.ungu)),
      tambah("ucapkan", emo("eu", 150, 160, "\u{1F4AC}", 36)),
    ),
    k(
      SUARA_E3,
      bersih(0),
      tambah(0, judul("Kalimatku sendiri")),
      tambah("dua", ...kartu("kx", 40, 40, 60, 40, W.krem, ["?"], 20), teks("kt", 124, 66, "+", 28, W.hijau), ...kartu("ky", 150, 40, 60, 40, W.krem, ["?"], 20)),
      tambah("kartu", ...Array.from({ length: 9 }, (_, i) => kartu(`ch${i}`, 18 + i * 30, 110, 26, 32, W.langit, [String(i + 1)], 13)).flat()),
      tambah("sepuluh.", teks("e10", 250, 66, "10", 22, W.merah)),
    ),
    k(
      SUARA_E4,
      bersih(0),
      tambah(0, judul("Contoh kalimat")),
      tambah("Misalnya", teks("c1", 150, 80, "6 + 2 = 8", 32, W.hijau)),
      tambah("Atau", teks("c2", 150, 140, "5 + 4 = 9", 32, W.hijau)),
    ),
    k(SUARA_E5, bersih(0), tambah(0, judul("Hebat sekali!"), emo("ow", 150, 90, "\u{1F989}", 54)), tambah("pandai", ...kartu("eh", 60, 124, 180, 34, W.emas, ["kalimat penjumlahan"], 11))),
  ],
};

/* ------------------------------ 6. Penutup ------------------------------ */
const SUARA_P1 = "Mari kita ingat lagi. Dua bagian digabung, lalu kita cari jumlahnya. Tandanya tambah dan sama dengan.";
const SUARA_P2 = "Pasangan bilangan boleh ditukar tempat. Kita juga bisa maju dari bilangan pertama.";
const SUARA_P3 = "Bilangan kembar punya dua bilangan yang sama. Pasangan sepuluh, misalnya sembilan dan satu, atau delapan dan dua.";
const SUARA_PR = "Sesudah ini, kerjakan latihan di layar. Ketuk benda, seret ke kotak, lalu ucapkan jumlahnya bersama suara guru.";
const SUARA_P4 = "Hebat sekali, anak-anak! Sampai jumpa di pelajaran berikutnya.";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: mari ingat lagi",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_P1, tambah(0, judul("Mari ingat lagi")), tambah("digabung,", ...kartu("p1", 14, 34, 272, 34, W.hijauMuda, ["gabungkan dua bagian"], 9.6)), tambah("jumlahnya.", ...kartu("p2", 14, 78, 272, 34, W.emas, ["cari jumlahnya"], 9.6)), tambah("Tandanya", ...kartu("p3", 14, 122, 272, 34, W.langit, ["+ tambah, = sama dengan"], 9.6))),
    k(SUARA_P2, bersih(0), tambah(0, judul("Dua cara")), tambah("Pasangan", ...kartu("q1", 14, 40, 272, 44, W.pink, ["2 + 3 = 5", "3 + 2 = 5"], 10)), tambah("maju", ...kartu("q2", 14, 100, 272, 44, W.krem, ["mulai dari bilangan pertama", "lalu maju"], 10))),
    k(SUARA_P3, bersih(0), tambah(0, judul("Kembar dan sepuluh")), tambah("kembar", ...kartu("r1", 14, 40, 272, 36, W.hijauMuda, ["kembar: 4 + 4 = 8"], 10.5)), tambah("sepuluh,", ...kartu("r2", 14, 88, 272, 36, W.langit, ["9 + 1 = 10"], 10.5)), tambah("delapan", ...kartu("r3", 14, 136, 272, 36, W.lavender, ["8 + 2 = 10"], 10.5))),
    k(
      SUARA_PR,
      bersih(0),
      tambah(0, judul("Latihan di layar")),
      tambah("benda,", ...kelompok("apel", "pa", 3, 80, 40, 30, 11)),
      tambah("kotak,", kotak("pb", 150, 70, 120, 56, W.krem, W.coklat, { rx: 6, tebal: 1.8 })),
      tambah("seret", emo("ps1", 134, 104, "\u{1F449}", 26)),
      tambah("jumlahnya", emo("pu", 210, 160, "\u{1F4AC}", 32)),
    ),
    k(SUARA_P4, bersih(0), tambah(0, judul("Sampai jumpa!"), emo("sj", 150, 110, "\u{1F989}", 56)), tambah("anak-anak!", emo("pc", 80, 150, "\u{1F389}", 30), emo("pd", 220, 150, "\u{1F389}", 30))),
  ],
};
