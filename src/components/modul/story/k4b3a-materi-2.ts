import type { AdeganStory } from "./logika-story";
import { JERUK, JERUK_TABEL, KELOMPOK_MEMBESAR, KELOMPOK_MENGECIL, PERMEN_TABEL, W, barisTabel, benda, emo, judul, kartu, kotak, panah, teks } from "./k4b3a-gambar";
import { bersih, idx, k, sebar, sorotkan, tambah, ubah } from "./k4b3a-bantu";

const WARNA_KEL = [W.biruMuda, W.oranye, W.hijau, W.merahTua] as const;
const KOL_SEL = [58, 44, 44, 44, 44, 50];

/* ------------------------------ 5. Hitungan Aktivitas 1: selisih dan kumpulan keempat (Buku Siswa hlm. 88; Panduan Guru hlm. 126) ------------------------------ */
const SUARA_H1 = "Mari isi tabel hitungannya bersama. Kelompok satu: satu, dua, tiga kelereng, selisihnya selalu satu, sehingga kumpulan keempat berisi empat.";
const SUARA_H2 = "Kelompok dua: dua, empat, enam, selisihnya dua, jadi kumpulan keempat delapan. Kelompok tiga: satu, tiga, lima, selisihnya juga dua, jadi kumpulan keempat tujuh.";
const SUARA_H3 = "Kelompok empat: dua, lima, delapan, selisihnya tiga, jadi kumpulan keempat sebelas. Selisih kumpulan satu dan dua sama dengan selisih kumpulan dua dan tiga, jadi bedanya tetap.";
const SUARA_H4 = "Jawaban diskusi: polanya membesar, semakin ke kanan benda semakin banyak, sebab tiap kumpulan ditambah selisih yang sama. Kesimpulannya, pola gambar membesar bertambah dengan aturan yang tetap.";

/** Tabel hitungan Aktivitas 1: kelompok, kumpulan 1 sampai 4, selisih (hitungan mandiri). */
export const TABEL_AKTIVITAS_SATU: readonly (readonly string[])[] = KELOMPOK_MEMBESAR.map((b, i) => [String(i + 1), String(b[0]), String(b[1]), String(b[2]), String(b[2] + (b[2] - b[1])), String(b[1] - b[0])]);

export const ADEGAN_AKTIVITAS_SATU_HASIL: AdeganStory = {
  id: "aktivitas-satu-hasil",
  judul: "Hitungan Aktivitas 1: selisih dan kumpulan ke-4",
  sumber: "Materi: Selisih dan kumpulan ke-4",
  latar: "#EFF6FF",
  kutipan: [
    "Kumpulan-1",
    "Selisih/beda dengan",
    "kumpulan sebelumnya",
    "Bagaimana selisih/perbedaan banyaknya benda pada kumpulan ke-1",
    "dan ke-2, kumpulan ke-2 dan ke-3? apakah sama atau berbeda?",
    "Berapa benda yang dibutuhkan untuk kumpulan ke-4",
    "Semakin banyak atau semakin sedikit?",
    "Guru memberikan pemahaman bahwa pola gambar membesar artinya",
    "benda yang muncul setelahnya semakin banyak.",
  ],
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Hitungan tabel Aktivitas 1")),
      tambah(0, ...barisTabel("hk", 8, 30, KOL_SEL, ["kelompok", "kum. 1", "kum. 2", "kum. 3", "kum. 4", "selisih"], 20, 7.6, true)),
      tambah(idx(SUARA_H1, "Kelompok"), ...barisTabel("h0", 8, 50, KOL_SEL, [...TABEL_AKTIVITAS_SATU[0]], 20, 8.6)),
      tambah("selalu", teks("hn", 150, 164, "kum. 4 = kum. 3 + selisih", 9, W.coklat)),
    ),
    k(
      SUARA_H2,
      tambah(idx(SUARA_H2, "Kelompok", 1), ...barisTabel("h1", 8, 70, KOL_SEL, [...TABEL_AKTIVITAS_SATU[1]], 20, 8.6)),
      tambah(idx(SUARA_H2, "Kelompok", 2), ...barisTabel("h2", 8, 90, KOL_SEL, [...TABEL_AKTIVITAS_SATU[2]], 20, 8.6)),
      ubah("juga", { id: "hn", isi: "selisih dua dan dua: sama" }),
    ),
    k(
      SUARA_H3,
      tambah(idx(SUARA_H3, "Kelompok"), ...barisTabel("h3", 8, 110, KOL_SEL, [...TABEL_AKTIVITAS_SATU[3]], 20, 8.6)),
      ubah(idx(SUARA_H3, "selisih"), { id: "hn", isi: "selisih tiap kelompok: tetap" }),
      sorotkan("tetap.", ...[0, 1, 2, 3].map((r) => `h${r}-s5`)),
    ),
    k(
      SUARA_H4,
      bersih(0),
      tambah(0, judul("Kesimpulan Aktivitas 1")),
      tambah("polanya", ...kartu("hs1", 14, 34, 272, 34, W.hijauMuda, ["semakin ke kanan, benda semakin banyak"], 9)),
      tambah("sebab", ...kartu("hs2", 14, 76, 272, 34, W.langit, ["tiap kumpulan ditambah selisih yang sama"], 9)),
      tambah("Kesimpulannya,", ...kartu("hs3", 14, 118, 272, 44, W.emas, ["pola gambar membesar:", "bertambah dengan aturan tetap"], 9)),
    ),
  ],
};

/* ------------------------------ 6. Ayo Mengamati: jeruk 2, 4, 6 dan tabel sampai kumpulan 7 (Buku Siswa hlm. 89–90; Panduan Guru hlm. 126) ------------------------------ */
const SUARA_J1 = "Ayo Mengamati. Di papan tulis ada jeruk: dua jeruk, empat jeruk, lalu enam jeruk. Bu guru bertanya, dapatkah kalian menentukan banyak jeruk selanjutnya sesuai pola tersebut?";
const SUARA_J2 = "Untuk menjawabnya, ingat kembali penjumlahan dan pengurangan bilangan cacah. Kumpulan satu berisi dua jeruk, kumpulan dua empat jeruk, kumpulan tiga enam jeruk. Jadi untuk kumpulan berikutnya tinggal menambahkan dua jeruk.";
const SUARA_J3 = "Murid bertanya: jadi banyak jeruk pada kumpulan ke tujuh adalah dua dijumlahkan sebanyak tujuh kali, atau empat belas, ya Bu? Bu guru menjawab: betul sekali, bisa memakai tabel.";
const SUARA_J4 = "Tabelnya: kumpulan satu dua, kumpulan dua empat, lalu enam, delapan, sepuluh, dua belas, dan kumpulan tujuh empat belas. Setiap baris sama dengan baris sebelumnya ditambah dua.";
const SUARA_J5 = "Ingat, pola gambar membesar berarti benda yang muncul setelahnya semakin banyak. Sekarang coba kamu cari contoh lain, dan berpikir cara menentukan polanya dari gambar.";

/** Kotak kumpulan jeruk: `n` jeruk dua baris dalam kotak (bx, by) lebar bw. Id `${id}-o{i}`. */
const jerukDalam = (id: string, bx: number, bw: number, n: number, op = 1) => {
  const kol = n / 2;
  const x0 = bx + bw / 2 - ((kol - 1) * 15) / 2;
  return benda(id, x0, 63, n, kol, 15, 5.5, W.oranye, W.coklat, { op });
};

export const ADEGAN_AMATI_JERUK: AdeganStory = {
  id: "amati-jeruk",
  judul: "Ayo Mengamati: jeruk dan tabel sampai kumpulan ke-7",
  sumber: "Materi: Jeruk dan tabel kumpulan ke-7",
  latar: "#FFF7ED",
  kutipan: [
    "Ayo Mengamati",
    "Dapatkah kalian menentukan banyak jeruk selanjutnya sesuai pola tersebut?",
    "Agar dapat menjawab pertanyaan tersebut, ingatlah kembali materi",
    "penjumlahan dan pengurangan bilangan cacah yang sudah kalian pelajari",
    "bagaimana bentuk kumpulan yang ke 7?",
    "Pada gambar terlihat jelas, kelompok pertama berisi",
    "tinggal menambahkan",
    "2 buah jeruk sesuai pola tersebut.",
    "Jadi banyak jeruk pada kumpulan ke 7 adalah",
    "2 + 2 + 2 + 2 + 2 + 2 + 2 atau 14 ya Bu??",
    "Betul sekali, bisa menggunakan",
    "Kumpulan 7",
    "12 + 2",
    "Ajak peserta didik untuk berpikir bagaimana menentukan pola sesuai pola",
    "Guru dapat memberikan contoh lain dari pola gambar yang membesar.",
  ],
  ketukan: [
    k(
      SUARA_J1,
      tambah(0, judul("Ayo Mengamati: jeruk di papan tulis")),
      tambah("papan", kotak("jp", 20, 30, 260, 82, "#14532D", W.coklat, { rx: 4, tebal: 3 })),
      tambah(idx(SUARA_J1, "dua"), ...benda("j1", 60, 56, 2, 1, 16, 6, W.oranye, W.coklat)),
      tambah("empat", ...benda("j2", 112, 56, 4, 2, 16, 6, W.oranye, W.coklat)),
      tambah("enam", ...benda("j3", 170, 56, 6, 3, 16, 6, W.oranye, W.coklat)),
      tambah("bertanya,", teks("jq", 245, 76, "?", 24, W.emas)),
      tambah("selanjutnya", ...kartu("jc", 30, 126, 240, 40, W.langit, ["berapa jeruk selanjutnya", "sesuai pola?"], 9)),
    ),
    k(
      SUARA_J2,
      bersih(0),
      tambah(0, judul("Kumpulan jeruk bertambah dua")),
      tambah("satu", kotak("jb1", 14, 50, 32, 42, W.putih, W.biru, { putus: true }), ...jerukDalam("jr1", 14, 32, 2)),
      tambah(idx(SUARA_J2, "dua", 2), kotak("jb2", 66, 50, 48, 42, W.putih, W.biru, { putus: true }), ...jerukDalam("jr2", 66, 48, 4)),
      tambah(idx(SUARA_J2, "tiga"), kotak("jb3", 132, 50, 64, 42, W.putih, W.biru, { putus: true }), ...jerukDalam("jr3", 132, 64, 6)),
      tambah("berikutnya", kotak("jb4", 214, 50, 72, 42, W.putih, W.biru, { putus: true, op: 0.6 }), ...jerukDalam("jr4", 214, 72, 8, 0.4)),
      tambah("menambahkan", teks("jt1", 56, 44, "+2", 9, W.merah), teks("jt2", 123, 44, "+2", 9, W.merah), teks("jt3", 205, 44, "+2", 9, W.merah)),
      tambah("kumpulan", teks("jl1", 30, 108, "kumpulan 1", 7.6, W.biru), teks("jl2", 90, 108, "kumpulan 2", 7.6, W.biru), teks("jl3", 164, 108, "kumpulan 3", 7.6, W.biru), teks("jl4", 250, 108, "kumpulan 4: ?", 7.6, W.merah)),
      tambah("tinggal", ...kartu("jk", 40, 128, 220, 34, W.krem, ["tinggal menambahkan 2 jeruk"], 9.4)),
    ),
    k(
      SUARA_J3,
      bersih(0),
      tambah(0, judul("Kumpulan ke tujuh")),
      tambah("Murid", emo("jm", 40, 50, "👧", 30), ...kartu("jm2", 66, 34, 220, 30, W.krem, ["kumpulan ke 7: berapa jeruk, ya Bu?"], 8.4)),
      tambah("sebanyak", ...Array.from({ length: 7 }, (_, i) => benda(`jp${i}`, 32 + i * 36, 90, 2, 1, 14, 5, W.oranye, W.coklat)).flat()),
      tambah("empat", teks("je", 150, 134, "2 + 2 + 2 + 2 + 2 + 2 + 2 = 14", 10, W.hijau)),
      tambah("tabel.", ...kartu("jt", 60, 148, 180, 30, W.langit, ["Bu guru: bisa memakai tabel"], 8.6)),
    ),
    k(
      SUARA_J4,
      bersih(0),
      tambah(0, judul("Tabel jeruk sampai kumpulan 7")),
      tambah(0, ...barisTabel("tb0", 40, 28, [76, 64, 84], ["Kumpulan", "Banyak", "Uraian"], 15, 8, true)),
      ...JERUK_TABEL.map((n, i) => {
        const pemicu = [idx(SUARA_J4, "satu"), idx(SUARA_J4, "kumpulan", 2), idx(SUARA_J4, "enam"), idx(SUARA_J4, "delapan"), idx(SUARA_J4, "sepuluh"), idx(SUARA_J4, "dua", 3), idx(SUARA_J4, "kumpulan", 3)][i];
        return tambah(pemicu, ...barisTabel(`tb${i + 1}`, 40, 43 + i * 15, [76, 64, 84], [`Kumpulan ${i + 1}`, String(n), i === 0 ? "2" : `${JERUK_TABEL[i - 1]} + 2`], 15, 8));
      }),
      tambah("Setiap", ...kartu("tbk", 40, 154, 224, 30, W.emas, ["tiap baris = baris sebelumnya + 2"], 8.8)),
    ),
    k(
      SUARA_J5,
      bersih(0),
      tambah(0, judul("Pesan penting")),
      tambah("pola", ...kartu("jg1", 14, 34, 272, 38, W.hijauMuda, ["pola gambar membesar:", "benda setelahnya semakin banyak"], 8.8)),
      tambah("contoh", ...kartu("jg2", 14, 80, 272, 30, W.langit, ["cari contoh lain sendiri"], 9)),
      tambah("berpikir", ...kartu("jg3", 14, 118, 272, 34, W.krem, ["berpikir cara menentukan pola"], 9)),
      tambah(idx(SUARA_J5, "gambar", 2), emo("jg4", 150, 180, "🤔", 26)),
    ),
  ],
};

/** Banyak jeruk pada tiga kumpulan di gambar hlm. 89 sama dengan awal tabel hlm. 90 (dipakai uji). */
export const JERUK_GAMBAR = JERUK;

/* ------------------------------ 7. Aktivitas 2: pola gambar mengecil (Buku Siswa hlm. 91–92; Panduan Guru hlm. 126–127) ------------------------------ */
const SUARA_B1 = "Pola gambar mengecil. Bu guru mengingatkan, pada pola membesar semakin ke kanan benda semakin banyak. Tahukah kalian bahwa pola gambar juga ada yang mengecil?";
const SUARA_B2 = "Aktivitas dua memakai kelereng atau batu kerikil, pensil, dan kertas. Langkahnya serupa: empat kelompok beranggotakan lima sampai enam orang, tiga kumpulan sesuai tabel, hitung benda dan selisihnya, temukan pola, diskusi, lalu presentasi.";
const SUARA_B3 = "Tabel kumpulan kelereng menurun. Kelompok satu: empat, tiga, dua. Kelompok dua: enam, empat, dua. Kelompok tiga: tujuh, lima, tiga. Kelompok empat: delapan, enam, empat.";
const SUARA_B4 = "Selisih tiap kumpulan: kelompok satu berkurang satu, kelompok dua, tiga, dan empat berkurang dua. Sekarang hitungan kita. Kumpulan keempat: satu, nol, satu, dan dua kelereng.";
const SUARA_B5 = "Kesimpulannya: semakin ke kanan benda semakin sedikit, selisihnya tetap, dan banyak benda selanjutnya diperoleh dengan mengurangi selisih itu. Sekarang coba kamu cari contoh lain pola gambar mengecil.";

const X_KUM = [92, 160, 232] as const;
const Y_KEL = [38, 74, 110, 146] as const;

/** Tabel hitungan Aktivitas 2: kelompok, kumpulan 1 sampai 4, selisih (hitungan mandiri). */
export const TABEL_AKTIVITAS_DUA: readonly (readonly string[])[] = KELOMPOK_MENGECIL.map((b, i) => [String(i + 1), String(b[0]), String(b[1]), String(b[2]), String(b[2] - (b[1] - b[2])), `−${b[0] - b[1]}`]);

export const ADEGAN_AKTIVITAS_DUA: AdeganStory = {
  id: "aktivitas-dua",
  judul: "Aktivitas 2: pola gambar mengecil",
  sumber: "Materi: Pola gambar mengecil",
  latar: "#F5F3FF",
  kutipan: [
    "2. Pola Gambar Mengecil",
    "Pada materi sebelumnya, kita sudah mempelajari materi pola",
    "gambar membesar, artinya semakin ke kanan maka jumlah",
    "Tahukah kalian bahwa pola gambar juga ada yang mengecil?",
    "Aktivitas 2",
    "Alat dan Bahan: Kelereng/batu kerikil, pensil, kertas",
    "Buatlah 4 kelompok beranggotakan 5-6 orang.",
    "Susunlah kelereng/batu kerikil menjadi 3 kumpulan sesuai tabel berikut.",
    "Setiap kelompok menghitung banyaknya benda serta selisihnya, dari setiap",
    "Apa yang dapat kalian simpulkan?",
    "Presentasikan hasil diskusi kelompok didepan kelas.",
    "terkait pola gambar mengecil yang berbeda-beda.",
    "Dapatkah menemukan pola gambar",
    "Guru dapat memberikan contoh lain dari pola gambar yang mengecil.",
  ],
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Pola gambar juga bisa mengecil")),
      tambah("Bu", emo("bg", 40, 66, "👩", 30)),
      tambah("membesar", ...kartu("b1", 70, 36, 216, 34, W.hijauMuda, ["membesar: semakin ke kanan", "benda semakin banyak"], 8.4), panah("b1a", 90, 84, 150, 0, W.hijau, 2.2)),
      tambah(idx(SUARA_B1, "mengecil", 2), ...kartu("b2", 70, 100, 216, 34, W.merahMuda, ["mengecil: semakin ke kanan", "benda semakin sedikit?"], 8.4), panah("b2a", 90, 148, 150, 0, W.merah, 2.2)),
    ),
    k(
      SUARA_B2,
      bersih(0),
      tambah(0, judul("Aktivitas 2: bahan dan langkah")),
      tambah("kelereng", ...kartu("c1", 10, 30, 280, 26, W.langit, ["kelereng/batu kerikil, pensil, kertas"], 8.6)),
      tambah("empat", ...kartu("c2", 10, 62, 280, 26, W.hijauMuda, ["4 kelompok, tiap kelompok 5 sampai 6 orang"], 8.4)),
      tambah("tiga", ...kartu("c3", 10, 94, 280, 26, W.krem, ["3 kumpulan sesuai tabel"], 8.6)),
      tambah("hitung", ...kartu("c4", 10, 126, 280, 26, W.pink, ["hitung benda dan selisihnya, temukan pola"], 8.4)),
      tambah("presentasi.", ...kartu("c5", 10, 158, 280, 26, W.emas, ["diskusi, lalu presentasi"], 8.6)),
    ),
    k(
      SUARA_B3,
      bersih(0),
      tambah(0, judul("Tabel kumpulan kelereng menurun")),
      tambah(0, ...["Kumpulan 1", "Kumpulan 2", "Kumpulan 3"].map((t, i) => teks(`dh${i}`, X_KUM[i] + 10, 30, t, 7.6, W.coklat))),
      ...[0, 1, 2, 3].map((g) => tambah(idx(SUARA_B3, "Kelompok", g + 1), teks(`dk${g}`, 8, Y_KEL[g] + 4, `kelompok ${g + 1}`, 8, W.biru, { anchor: "start" }))),
      ...KELOMPOK_MENGECIL.flatMap((baris, g) => baris.map((n, i) => tambah(idx(SUARA_B3, "Kelompok", g + 1) + 2 + i, ...benda(`d${g}${i}`, X_KUM[i], Y_KEL[g], n, 3, 8, 3.3, WARNA_KEL[g], W.coklat)))),
    ),
    k(
      SUARA_B4,
      bersih(0),
      tambah(0, judul("Hitungan Aktivitas 2")),
      tambah(0, ...barisTabel("dt", 8, 30, KOL_SEL, ["kelompok", "kum. 1", "kum. 2", "kum. 3", "kum. 4", "selisih"], 20, 7.6, true)),
      ...[0, 1, 2, 3].map((r) => tambah(sebar(SUARA_B4, 4, 2)[r], ...barisTabel(`dr${r}`, 8, 50 + r * 20, KOL_SEL, [...TABEL_AKTIVITAS_DUA[r]], 20, 8.6))),
      tambah("hitungan", teks("dn", 150, 160, "kum. 4 = kum. 3 − selisih", 9, W.coklat)),
      tambah("nol,", teks("dn2", 150, 178, "kelompok 2: kum. 4 habis (0)", 8.6, W.merah)),
    ),
    k(
      SUARA_B5,
      bersih(0),
      tambah(0, judul("Kesimpulan Aktivitas 2")),
      tambah("semakin", ...kartu("ds1", 14, 34, 272, 34, W.merahMuda, ["semakin ke kanan, benda semakin sedikit"], 9)),
      tambah("selisihnya", ...kartu("ds2", 14, 76, 272, 34, W.langit, ["selisihnya tetap"], 9)),
      tambah("mengurangi", ...kartu("ds3", 14, 118, 272, 34, W.emas, ["benda selanjutnya = benda sekarang − selisih"], 8.8)),
      tambah("contoh", emo("ds4", 150, 182, "💡", 24)),
    ),
  ],
};

/* ------------------------------ 8. Ayo Mengamati: permen 9, 7, 5 dan tabel sampai kumpulan 5 (Buku Siswa hlm. 92–93; Panduan Guru hlm. 127) ------------------------------ */
const SUARA_M1 = "Ayo Mengamati. Ada tiga kumpulan permen lolipop yang semakin sedikit: kumpulan satu sembilan, kumpulan dua tujuh, kumpulan tiga lima. Bagaimana bentuk kumpulan kelima, dan bagaimana cara menentukannya?";
const SUARA_M2 = "Caranya sama dengan tabel jeruk, tetapi dikurangi. Kumpulan satu sembilan. Kumpulan dua sembilan dikurangi dua, jadi tujuh. Kumpulan tiga lima, kumpulan empat tiga, dan kumpulan lima satu.";
const SUARA_M3 = "Hasil analisis: banyak permen pada kumpulan kelima hanya satu. Jumlah permen tiap kumpulan semakin lama semakin sedikit, atau mengecil. Jadi ada dua tipe pola gambar, yaitu membesar dan mengecil.";

export const ADEGAN_AMATI_PERMEN: AdeganStory = {
  id: "amati-permen",
  judul: "Ayo Mengamati: permen dan tabel sampai kumpulan ke-5",
  sumber: "Materi: Permen dan tabel kumpulan ke-5",
  latar: "#FDF2F8",
  kutipan: [
    "Kumpulan 1",
    "Di dalam gambar hanya ada 3 kumpulan permen yang semakin",
    "bagaimana bentuk kumpulan yang ke-5 ?",
    "Bagaimana cara menentukannya?",
    "Banyak Permen",
    "Uraian",
    "Berdasarkan hasil analisis pada tabel tersebut, tampak terlihat bahwa banyak",
    "permen yang ada pada kumpulan ke-5 ada sebanyak 1 buah.",
    "semakin lama semakin sedikit atau mengecil.",
    "pola gambar mempunyai dua tipe",
    "pola gambar mengecil (benda yang muncul setelahnya semakin sedikit)",
  ],
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Ayo Mengamati: permen lolipop")),
      tambah("sembilan", kotak("mb1", 14, 38, 76, 54, W.putih, W.biru, { putus: true }), ...benda("mp1", 28, 52, 9, 3, 15, 5, W.merahTua, W.coklat), teks("ml1", 52, 106, "kumpulan 1", 8, W.biru)),
      tambah("tujuh,", kotak("mb2", 112, 38, 76, 54, W.putih, W.biru, { putus: true }), ...benda("mp2", 126, 52, 7, 3, 15, 5, W.merahTua, W.coklat), teks("ml2", 150, 106, "kumpulan 2", 8, W.biru)),
      tambah(idx(SUARA_M1, "lima"), kotak("mb3", 210, 38, 76, 54, W.putih, W.biru, { putus: true }), ...benda("mp3", 224, 52, 5, 3, 15, 5, W.merahTua, W.coklat), teks("ml3", 248, 106, "kumpulan 3", 8, W.biru)),
      tambah("kelima,", ...kartu("mq", 30, 124, 240, 44, W.emas, ["kumpulan ke-5?", "bagaimana cara menentukannya?"], 9.4)),
    ),
    k(
      SUARA_M2,
      bersih(0),
      tambah(0, judul("Tabel permen sampai kumpulan 5")),
      tambah(0, ...barisTabel("pt0", 30, 28, [80, 90, 90], ["Kumpulan", "Banyak permen", "Uraian"], 18, 8, true)),
      ...PERMEN_TABEL.map((n, i) => {
        const pemicu = [idx(SUARA_M2, "sembilan"), idx(SUARA_M2, "dikurangi", 2), idx(SUARA_M2, "kumpulan", 3), idx(SUARA_M2, "kumpulan", 4), idx(SUARA_M2, "kumpulan", 5)][i];
        return tambah(pemicu, ...barisTabel(`pt${i + 1}`, 30, 46 + i * 18, [80, 90, 90], [String(i + 1), String(n), i === 0 ? "9" : `${PERMEN_TABEL[i - 1]} − 2`], 18, 8.6));
      }),
      tambah("Caranya", teks("pc", 150, 160, "setiap kumpulan: dikurangi 2", 9.4, W.merah)),
    ),
    k(
      SUARA_M3,
      bersih(0),
      tambah(0, judul("Permen semakin sedikit")),
      ...PERMEN_TABEL.map((n, i) => tambah(["hasil", "kelima", "Jumlah", "sedikit,", "mengecil."][i], ...benda(`pr${i}`, 20, 38 + i * 16, n, 9, 11, 4.2, W.merahTua, W.coklat), teks(`prt${i}`, 140, 41 + i * 16, `${n}`, 8.4, W.biru, { anchor: "start" }))),
      tambah("tipe", ...kartu("pm1", 176, 40, 114, 40, W.hijauMuda, ["tipe 1:", "pola membesar"], 8.4)),
      tambah("mengecil.@2", ...kartu("pm2", 176, 90, 114, 40, W.merahMuda, ["tipe 2:", "pola mengecil"], 8.4)),
    ),
  ],
};
