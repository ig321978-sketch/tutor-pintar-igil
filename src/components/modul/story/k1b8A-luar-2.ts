import type { AdeganStory, Obj } from "./logika-story";
import { E, W, emo, gs, judul, kartu, kotak, orang, pakPos, teks, turus } from "./k1b8A-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k1b8A-bantu";
import { NAMA_METODE, NAMA_METODE_ID, WARNA_METODE, kepala } from "./k1b8A-luar-1";

/* Video metode global Sub-Bab A: One-to-One Matching (Pasangkan Satu-Satu), Frequency Table (Tabel Frekuensi), dan ringkasan. */

const f = (n: number): number => Number(n.toFixed(1));

/* ------------------------------ 4. One-to-One Matching: konsep ------------------------------ */
const SUARA_P1 = "Cara kedua, One-to-One Matching, atau Pasangkan Satu-Satu.";
const SUARA_P2 = "Letakkan satu benda dari jenis pertama di samping satu benda dari jenis kedua.";
const SUARA_P3 = "Benda yang tidak punya pasangan menunjukkan selisihnya.";
const SUARA_P4 = "Cara ini bahkan tidak perlu menghitung sama sekali.";

const PX = (i: number): number => 52 + i * 32;
const PY_A = 78;
const PY_B = 128;

export const ADEGAN_LUAR_PASANG: AdeganStory = {
  id: "luar-pasang",
  judul: "One-to-One Matching: pasangkan satu-satu",
  sumber: "Metode global: One-to-One Matching",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, ...kepala(1)),
      tambah("One-to-One", emo("jb", 150, 112, E.jabat, 44)),
      tambah("Pasangkan", ...kartu("kp", 70, 148, 160, 30, W.putih, ["1 benda : 1 benda"], 13)),
    ),
    k(
      SUARA_P2,
      hapus(0, "jb", "kp-k", "kp-t0"),
      tambah("satu", ...Array.from({ length: 5 }, (_, i) => emo(`pa${i}`, PX(i), PY_A, E.bintang, 20))),
      sorotkan("satu", "pa0"),
      tambah("samping", ...Array.from({ length: 3 }, (_, i) => emo(`pb${i}`, PX(i), PY_B, E.hati, 20))),
      tambah("samping", ...kartu("k11", 204, 92, 86, 22, W.krem, ["1 : 1"], 11)),
      tambah("kedua.", gs("pr0", PX(0), PY_A + 12, PX(0), PY_B - 18, W.merah, 2.4, { gambar: true })),
    ),
    k(
      SUARA_P3,
      hapus(0, "k11-k", "k11-t0"),
      ubah(0, { id: "pa0", sorot: false }),
      tambah("tidak", gs("pr1", PX(1), PY_A + 12, PX(1), PY_B - 18, W.merah, 2.4, { gambar: true }), gs("pr2", PX(2), PY_A + 12, PX(2), PY_B - 18, W.merah, 2.4, { gambar: true })),
      sorotkan("pasangan.", "pa3", "pa4"),
      tambah("pasangan.", emo("q3", PX(3), 104, E.tanya, 18), emo("q4", PX(4), 104, E.tanya, 18)),
      tambah("selisihnya.", ...kartu("sl", 204, 150, 86, 22, W.pink, ["selisih"], 11)),
    ),
    k(
      SUARA_P4,
      hapus(0, "sl-k", "sl-t0", "q3", "q4"),
      ubah(0, { id: "pa3", sorot: false }, { id: "pa4", sorot: false }),
      tambah("tidak", emo("no", 250, 104, E.salah, 30)),
      tambah("menghitung", ...kartu("tm", 60, 160, 180, 24, W.hijauMuda, ["tanpa menghitung"], 10)),
    ),
  ],
};

/* ------------------------------ 5. One-to-One Matching: terapan ------------------------------ */
const SUARA_Q1 = "Kaka memasangkan lima pita merah dengan delapan pita biru.";
const SUARA_Q2 = "Tiga pita biru tidak punya pasangan, jadi pita biru lebih banyak tiga.";
const SUARA_Q3 = "Cocok untuk membandingkan dua jenis dan mencari selisihnya dengan cepat.";
const SUARA_Q4 = "Kurang cocok kalau jenisnya banyak, karena kita harus memasangkan berkali-kali.";

const QX = (i: number): number => 46 + i * 26;
const QY_M = 76;
const QY_B = 124;
const pita = (id: string, x: number, y: number, warna: string): Obj => kotak(id, f(x - 10), f(y - 6), 20, 12, warna, W.biru, { rx: 4, tebal: 1.4 });

export const ADEGAN_LUAR_PASANG_TERAPAN: AdeganStory = {
  id: "luar-pasang-terapan",
  judul: "Pasangkan satu-satu: pita merah dan biru",
  sumber: "Metode global: One-to-One Matching, terapan",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, ...kepala(1)),
      tambah("Kaka", ...orang("kk", 264, 176, E.kaka, "Kaka")),
      tambah("lima", teks("c5", 18, QY_M + 4, "5", 13, W.merah)),
      tambah("merah", ...Array.from({ length: 5 }, (_, i) => pita(`pm${i}`, QX(i), QY_M, "#EF4444"))),
      tambah("delapan", teks("c8", 18, QY_B + 4, "8", 13, W.biru)),
      tambah("biru.", ...Array.from({ length: 8 }, (_, i) => pita(`pn${i}`, QX(i), QY_B, "#3B82F6"))),
    ),
    k(
      SUARA_Q2,
      tambah("Tiga", ...Array.from({ length: 5 }, (_, i) => gs(`pr${i}`, QX(i), QY_M + 8, QX(i), QY_B - 8, W.hijau, 2.2, { gambar: true }))),
      sorotkan("tidak", "pn5", "pn6", "pn7"),
      tambah("pasangan,", teks("c3", 262, QY_B + 4, "3", 14, W.merah)),
      tambah("tiga@2", ...kartu("bl", 96, 152, 140, 20, W.merahMuda, ["biru lebih banyak 3"], 8.6)),
    ),
    k(
      SUARA_Q3,
      hapus(0, "bl-k", "bl-t0", "c3", "c5", "c8"),
      ubah(0, { id: "pn5", sorot: false }, { id: "pn6", sorot: false }, { id: "pn7", sorot: false }),
      tambah("Cocok", emo("ok", 262, 80, E.benar, 28)),
      tambah("dua", ...kartu("d2", 20, 150, 90, 20, W.krem, ["2 jenis"], 9.4)),
      tambah("cepat.", emo("kl", 262, 130, E.kilat, 28)),
    ),
    k(
      SUARA_Q4,
      bersih(0),
      tambah(0, ...kepala(1)),
      tambah("banyak,", ...[0, 1, 2, 3].flatMap((r) => Array.from({ length: 4 }, (_, s) => pita(`bm${r}${s}`, 44 + s * 34, 66 + r * 26, ["#EF4444", "#3B82F6", "#22C55E", "#FACC15"][r])))),
      tambah("memasangkan", ...[0, 1, 2].flatMap((r) => Array.from({ length: 4 }, (_, s) => gs(`bl${r}${s}`, 44 + s * 34, 66 + r * 26 + 7, 44 + ((s + r) % 4) * 34, 66 + (r + 1) * 26 - 7, W.merah, 1.6)))),
      tambah("berkali-kali.", emo("no", 232, 110, E.salah, 40)),
    ),
  ],
};

/* ------------------------------ Tabel frekuensi (bantu) ------------------------------ */
const LEBAR_FREK = [58, 62, 36];
const TINGGI_FREK = 17;
const KOLOM_X = (x: number, c: number): number => x + LEBAR_FREK.slice(0, c).reduce((a, b) => a + b, 0);
/** Rangka tabel frekuensi: kepala `${id}-h0..2` (kotak dan teks `...t`) dan sel kosong `${id}-r{r}a|b|c`. */
const rangkaFrek = (id: string, x: number, y: number, baris: number): Obj[] => [
  ...["Jenis", "Goresan", "Banyak"].flatMap((nama, c) => [
    kotak(`${id}-h${c}`, KOLOM_X(x, c), y, LEBAR_FREK[c], TINGGI_FREK, W.lavender, W.biru, { rx: 1, tebal: 1.4 }),
    teks(`${id}-h${c}t`, f(KOLOM_X(x, c) + LEBAR_FREK[c] / 2), f(y + TINGGI_FREK / 2 + 3), nama, 8, W.biru),
  ]),
  ...Array.from({ length: baris }, (_, r) => [0, 1, 2].map((c) => kotak(`${id}-r${r}${"abc"[c]}`, KOLOM_X(x, c), y + TINGGI_FREK * (r + 1), LEBAR_FREK[c], TINGGI_FREK, W.putih, W.biru, { rx: 1, tebal: 1.2 }))).flat(),
];
const namaFrek = (id: string, x: number, y: number, nama: string[]): Obj[] => nama.map((n, r) => teks(`${id}-r${r}at`, f(x + LEBAR_FREK[0] / 2), f(y + TINGGI_FREK * (r + 1) + TINGGI_FREK / 2 + 3), n, 8.4, W.biru));
const goresanFrek = (id: string, x: number, y: number, r: number, n: number): Obj[] => turus(`${id}-g${r}`, x + LEBAR_FREK[0] + 8, y + TINGGI_FREK * (r + 1) + 1.5, n, W.merah);
const banyakFrek = (id: string, x: number, y: number, r: number, n: number): Obj => teks(`${id}-r${r}ct`, f(KOLOM_X(x, 2) + LEBAR_FREK[2] / 2), f(y + TINGGI_FREK * (r + 1) + TINGGI_FREK / 2 + 3.5), String(n), 10, W.merah);
const idGoresan = (id: string, r: number, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}-g${r}${i}`);

/* ------------------------------ 6. Frequency Table: konsep ------------------------------ */
const SUARA_T1 = "Cara ketiga, Frequency Table, atau Tabel Frekuensi.";
const SUARA_T2 = "Frekuensi artinya seberapa sering sesuatu muncul.";
const SUARA_T3 = "Tulis nama jenis di tabel, lalu beri satu goresan setiap ada yang muncul.";
const SUARA_T4 = "Setelah selesai, hitung goresannya dan tulis banyaknya di kolom sebelahnya.";

const TFX = 40;
const TFY = 62;
const NAMA_FREK = ["Jenis A", "Jenis B", "Jenis C"];
const GORESAN_FREK = [4, 2, 3];

export const ADEGAN_LUAR_TABEL: AdeganStory = {
  id: "luar-tabel",
  judul: "Frequency Table: tabel frekuensi",
  sumber: "Metode global: Frequency Table",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, ...kepala(2)),
      tambah("Frequency", emo("gf", 250, 100, "\u{1F4CA}", 34)),
      tambah("Tabel", ...rangkaFrek("ft", TFX, TFY, 3)),
    ),
    k(
      SUARA_T2,
      hapus("seberapa", "gf"),
      tambah("seberapa", ...kartu("fr", 206, 62, 88, 44, W.putih, ["frekuensi =", "seberapa sering"], 8)),
      tambah("muncul.", emo("lp", 250, 150, E.lampu, 28)),
    ),
    k(
      SUARA_T3,
      hapus(0, "fr-k", "fr-t0", "fr-t1", "lp"),
      tambah("nama", ...namaFrek("ft", TFX, TFY, NAMA_FREK)),
      tambah("satu", ...kartu("sg", 206, 62, 88, 36, W.krem, ["1 muncul", "= 1 goresan"], 8.6)),
      tambah("goresan", ...goresanFrek("ft", TFX, TFY, 0, GORESAN_FREK[0])),
      tambah("setiap", ...goresanFrek("ft", TFX, TFY, 1, GORESAN_FREK[1])),
      tambah("ada", ...goresanFrek("ft", TFX, TFY, 2, GORESAN_FREK[2])),
    ),
    k(
      SUARA_T4,
      hapus(0, "sg-k", "sg-t0", "sg-t1"),
      sorotkan("hitung", ...[0, 1, 2].flatMap((r) => idGoresan("ft", r, GORESAN_FREK[r]))),
      tambah("banyaknya", ...GORESAN_FREK.map((n, r) => banyakFrek("ft", TFX, TFY, r, n))),
      sorotkan("kolom", "ft-h2", "ft-r0c", "ft-r1c", "ft-r2c"),
    ),
  ],
};

/* ------------------------------ 7. Frequency Table: terapan ------------------------------ */
const SUARA_U1 = "Pak Pos mencatat peminjam sepekan. Senin empat anak, Selasa dua anak, Rabu enam anak, Kamis tiga anak.";
const SUARA_U2 = "Rabu paling banyak, dan semuanya lima belas anak.";
const SUARA_U3 = "Cocok kalau jenisnya banyak dan hasilnya perlu disimpan untuk dibaca lagi.";
const SUARA_U4 = "Kurang cocok kalau hanya dua jenis, karena memasangkan langsung lebih cepat.";

const UX = 24;
const UY = 54;
const HARI = ["Senin", "Selasa", "Rabu", "Kamis"];
const PEMINJAM = [4, 2, 6, 3];

export const ADEGAN_LUAR_TABEL_TERAPAN: AdeganStory = {
  id: "luar-tabel-terapan",
  judul: "Tabel frekuensi: peminjam sepekan",
  sumber: "Metode global: Frequency Table, terapan",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, ...kepala(2)),
      tambah("Pak", ...pakPos("pp", 252, 112)),
      tambah("mencatat", ...rangkaFrek("fu", UX, UY, 4)),
      ...HARI.flatMap((h, r) => [
        tambah(["Senin", "Selasa", "Rabu", "Kamis"][r], ...namaFrek("fu", UX, UY, HARI).filter((o) => o.id === `fu-r${r}at`)),
        tambah(["empat", "dua", "enam", "tiga"][r], ...goresanFrek("fu", UX, UY, r, PEMINJAM[r]), banyakFrek("fu", UX, UY, r, PEMINJAM[r])),
      ]),
    ),
    k(
      SUARA_U2,
      sorotkan("banyak,", "fu-r2a", "fu-r2b", "fu-r2c"),
      tambah("lima", ...kartu("sm", 192, 150, 100, 36, W.krem, ["semuanya", "15 anak"], 9.4)),
    ),
    k(
      SUARA_U3,
      hapus(0, "sm-k", "sm-t0", "sm-t1"),
      ubah(0, { id: "fu-r2a", sorot: false }, { id: "fu-r2b", sorot: false }, { id: "fu-r2c", sorot: false }),
      tambah("Cocok", emo("ok", 262, 76, E.benar, 28)),
      tambah("disimpan", ...kartu("ds", 160, 150, 128, 22, W.hijauMuda, ["banyak jenis, disimpan"], 8.4)),
      tambah("lagi.", emo("kal", 100, 176, E.kalender, 22)),
    ),
    k(
      SUARA_U4,
      bersih(0),
      tambah(0, ...kepala(2)),
      tambah("Kurang", emo("no", 262, 70, E.salah, 30)),
      tambah("dua", ...Array.from({ length: 4 }, (_, i) => emo(`ua${i}`, 60 + i * 32, 84, E.bintang, 20)), ...Array.from({ length: 2 }, (_, i) => emo(`ub${i}`, 60 + i * 32, 134, E.hati, 20)), ...kartu("d2", 200, 100, 86, 22, W.krem, ["2 jenis"], 10)),
      tambah("memasangkan", gs("up0", 60, 96, 60, 122, W.merah, 2.2), gs("up1", 92, 96, 92, 122, W.merah, 2.2)),
      tambah("cepat.", emo("kl", 250, 150, E.kilat, 28)),
    ),
  ],
};

/* ------------------------------ 8. Ringkasan ------------------------------ */
const SUARA_R1 = "Kita sudah melihat tiga cara. Mana yang pas? Itu tergantung bendanya.";
const SUARA_R2 = "Benda masih berantakan dan bisa dipindah, mulai dengan Lingkaran Pilah. Hanya dua jenis dan ingin tahu selisih, pakai Pasangkan Satu-Satu.";
const SUARA_R3 = "Banyak jenis dan perlu catatan, pakai Tabel Frekuensi. Apa pun caranya, jangan sampai ada yang terlewat atau terhitung dua kali.";
const SUARA_R4 = "Menurutmu, untuk mencatat siapa yang meminjam setiap hari selama sebulan, kamu pilih cara yang mana?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Ringkasan: memilih cara menurut bendanya",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Mana yang pas?")),
      tambah("tiga", teks("t3", 150, 52, "3 cara", 14, W.ungu)),
      ...NAMA_METODE_ID.map((n, i) => tambah(["cara.", "Mana", "Itu"][i], ...kartu(`r${i}`, 20, 64 + i * 42, 260, 34, WARNA_METODE[i], [`${i + 1}. ${NAMA_METODE[i]}`], 10))),
      tambah("bendanya.", emo("qq", 262, 40, E.tanya, 26)),
    ),
    k(
      SUARA_R2,
      bersih(0),
      tambah(0, judul("Pilih cara menurut benda")),
      tambah("dipindah,", ...kartu("q0", 10, 40, 280, 36, WARNA_METODE[0], ["berantakan, bisa dipindah:", "Lingkaran Pilah"], 8.6)),
      tambah("selisih,", ...kartu("q1", 10, 96, 280, 46, WARNA_METODE[1], ["2 jenis, ingin tahu selisih:", "Pasangkan Satu-Satu (1:1)"], 8.6)),
    ),
    k(
      SUARA_R3,
      tambah("Frekuensi.", ...kartu("q2", 10, 152, 280, 36, WARNA_METODE[2], ["banyak jenis, perlu catatan:", "Tabel Frekuensi"], 8.6)),
      tambah("terlewat", emo("tl", 262, 30, E.benar, 20), teks("tlt", 202, 34, "jangan terlewat", 8, W.hijau)),
      tambah("dua", teks("dk", 150, 34, "2 kali", 8, W.merah)),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Pilih satu cara")),
      tambah("sebulan,", emo("kal", 150, 76, E.kalender, 40)),
      tambah("cara", ...NAMA_METODE_ID.map((n, i) => kartu(`pc${i}`, 20 + i * 90, 110, 84, 36, WARNA_METODE[i], n.split(" ").slice(0, 2), 8.2)).flat()),
      tambah("mana?", emo("qq", 150, 176, E.tanya, 30)),
    ),
  ],
};
