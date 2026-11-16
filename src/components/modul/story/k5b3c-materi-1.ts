import type { AdeganStory } from "./logika-story";
import { W, apel, emo, judul, kartu, kotak, rumus, sel, teks } from "./k5b3c-gambar";
import { bersih, k, tambah, ubah, warnai } from "./k5b3c-bantu";
import { kutipanLokal } from "./kutipan-lokal";

/** Himpunan apel Eksplorasi 3.3B menurut gambar Buku Siswa hlm. 94: Wei menerima tiga kolom kiri, Upe dua apel kolom paling kiri, sisa Kira kolom paling kanan. */
export const LUKAS = [0, 1, 2, 4, 5, 6];
export const YOHANA = [0, 4];
export const ASEP = [3, 7];
export const BIRU_MUDA = "#60A5FA";
const ap = (id: string, daftar: number[]): string[] => daftar.map((i) => `${id}-a${i}`);

/* ------------------------------ 1. Pembuka Sub-Bab C (Panduan Guru hlm. 107 sampai 108) ------------------------------ */
export const ADEGAN_PEMBUKA_C: AdeganStory = {
  id: "pembuka-c",
  judul: "Pembuka Sub-Bab C: Pengurangan Bilangan Pecahan",
  sumber: "Panduan Guru hlm. 107–108",
  latar: "#F0F9FF",
  kutipan: kutipanLokal("k5b3c-materi-1.ts:1"),
  ketukan: [
    k(
      "Sub-Bab C, Pengurangan Bilangan Pecahan, penutup Bab tiga. Menurut Buku Panduan Guru, peserta didik diharapkan dapat mengurangi pecahan berpenyebut sama, lalu pecahan berpenyebut berbeda.",
      tambah(0, judul("Sub-Bab C: penutup bab")),
      tambah("Pengurangan", ...kartu("c", 30, 32, 240, 32, W.langit, ["C. Pengurangan Bilangan Pecahan"], 10)),
      tambah("sama,", kotak("p1", 18, 78, 126, 74, W.hijauMuda, W.hijau, { rx: 8 }), teks("p1t", 81, 94, "penyebut sama", 9.4, W.hijau), ...rumus("p1r", 81, 126, "3/5 − 1/5", 12, W.biru, {}, false)),
      tambah("berbeda.", kotak("p2", 156, 78, 126, 74, W.krem, W.coklat, { rx: 8 }), teks("p2t", 219, 94, "penyebut berbeda", 9.4, W.coklat), ...rumus("p2r", 219, 126, "2/3 − 1/2", 12, W.biru, {}, false)),
    ),
    k(
      "Alat yang disiapkan: alat tulis, penggaris, dan kertas karton. Guru juga membagi peserta didik ke dalam kelompok untuk mengeksplorasi kegiatan dengan cara berbeda-beda, sesuai petunjuk buku siswa.",
      bersih(0),
      tambah(0, judul("Persiapan")),
      tambah("tulis,", emo("e1", 50, 86, "✏", 30)),
      tambah("penggaris,", emo("e2", 100, 86, "📏", 30)),
      tambah("karton.", ...kartu("e3", 140, 62, 130, 38, W.krem, ["kertas karton"], 9.4)),
      tambah("kelompok", emo("e4", 84, 158, "👥", 36), ...kartu("e5", 130, 134, 150, 46, W.hijauMuda, ["kelompok", "cara berbeda-beda"], 9)),
    ),
    k(
      "Pada apersepsi, peserta didik mengingat KPK, cara menyamakan penyebut, dan penjumlahan pecahan di subbab sebelumnya.",
      bersih(0),
      tambah(0, judul("Apersepsi")),
      tambah("KPK,", ...kartu("a1", 20, 44, 260, 34, W.langit, ["KPK"], 10)),
      tambah("menyamakan", ...kartu("a2", 20, 92, 260, 34, W.hijauMuda, ["menyamakan penyebut"], 10)),
      tambah("penjumlahan", ...kartu("a3", 20, 140, 260, 34, W.krem, ["penjumlahan pecahan"], 10)),
    ),
    k(
      "Gagasan kunci pemanasan: penjumlahan dan pengurangan punya konsep yang sama, yaitu pecahan harus sepenyebut lebih dulu.",
      bersih(0),
      tambah(0, judul("Pemanasan")),
      tambah("penjumlahan", ...rumus("r1", 150, 66, "1/5 + 2/5 = 3/5", 17)),
      tambah("pengurangan", ...rumus("r2", 150, 118, "3/5 − 2/5 = 1/5", 17)),
      tambah("sepenyebut", teks("ak", 150, 172, "sama-sama harus sepenyebut dulu", 9.4, W.merah)),
    ),
  ],
};

/* ------------------------------ 2. Masalah Upe (Buku Siswa hlm. 91) ------------------------------ */
export const ADEGAN_MASALAH_YOHANA: AdeganStory = {
  id: "masalah-yohana",
  judul: "Masalah Upe dan syarat pengurangan pecahan",
  sumber: "Materi: masalah Upe dan syarat",
  latar: "#FFF7ED",
  kutipan: kutipanLokal("k5b3c-materi-1.ts:2"),
  ketukan: [
    k(
      "Sekarang kita belajar mengurangkan pecahan. Perhatikan Masalah Upe. Upe punya tugas melukis dua per tiga bagian dari kertas gambar yang diberikan gurunya.",
      tambah(0, judul("Masalah Upe")),
      tambah("melukis", ...sel("kt", 40, 34, 80, 108, 3, [0, 1], W.langit, true), teks("ktt", 80, 160, "kertas gambar", 9, W.biru)),
      tambah("dua", ...rumus("r", 205, 90, "2/3", 22, W.biru, {}, false), teks("rt", 205, 128, "harus dilukis", 9.4, W.biru)),
    ),
    k(
      "Ia baru mengerjakan satu per dua bagian kertas. Coba kamu pikirkan, berapakah kekurangan kertas yang belum dilukis oleh Upe?",
      bersih(0),
      tambah(0, judul("Masalah Upe")),
      tambah(0, ...sel("kt", 40, 34, 80, 108, 3, [0, 1], W.langit, true), teks("ktt", 80, 160, "kertas gambar", 9, W.biru)),
      tambah("satu", ...rumus("r", 205, 86, "2/3 − 1/2", 16, W.biru, {}, false)),
      tambah("kekurangan", teks("tn", 205, 148, "?", 36, W.merah)),
    ),
    k(
      "Ingat syarat penting ini. Pengurangan pecahan hanya bisa dilakukan bila penyebutnya sudah sama. Kalau belum sama, samakan dahulu.",
      bersih(0),
      tambah(0, judul("Syarat pengurangan")),
      tambah("syarat", ...kartu("sy", 40, 30, 220, 28, W.krem, ["penyebutnya harus sama"], 10)),
      tambah("Pengurangan", kotak("b1", 18, 72, 126, 70, W.merahMuda, W.merah, { rx: 8 }), teks("b1t", 81, 88, "penyebut beda", 9.4, W.merah), ...rumus("b1r", 81, 120, "2/3 − 1/2", 12, W.biru, {}, false)),
      tambah("belum", emo("b1e", 81, 168, "❌", 24)),
      tambah("samakan", kotak("b2", 156, 72, 126, 70, W.hijauMuda, W.hijau, { rx: 8 }), teks("b2t", 219, 88, "penyebut sama", 9.4, W.hijau), ...rumus("b2r", 219, 120, "4/6 − 3/6", 12, W.biru, {}, false), emo("b2e", 219, 168, "✅", 24)),
    ),
    k(
      "Jika penyebut sudah sama, kurangkan pembilangnya. Karena itu kita belajar dalam dua bagian: pengurangan berpenyebut sama, lalu berpenyebut berbeda. Masalah Upe kita buka lagi nanti.",
      bersih(0),
      tambah(0, judul("Dua bagian pelajaran")),
      tambah("bagian", ...kartu("d1", 20, 36, 260, 38, W.langit, ["1. Pengurangan berpenyebut sama"], 10)),
      tambah("lalu", ...kartu("d2", 20, 86, 260, 38, W.krem, ["2. Pengurangan berpenyebut berbeda"], 10)),
      tambah("Masalah", ...kartu("d3", 50, 138, 200, 34, W.pink, ["Masalah Upe: nanti"], 10)),
    ),
  ],
};

/* ------------------------------ 3. Eksplorasi 3.3A: Masalah Wei (Buku Siswa hlm. 91 sampai 93) ------------------------------ */
export const ADEGAN_EKS_3A: AdeganStory = {
  id: "eks-3a",
  judul: "Pengurangan pecahan berpenyebut sama",
  sumber: "Materi: penyebut sama, kertas Wei",
  latar: "#F0FDF4",
  kutipan: kutipanLokal("k5b3c-materi-1.ts:3"),
  ketukan: [
    k(
      "Sekarang pecahan yang penyebutnya sama. Masalah Wei: tugasnya sama dengan Upe, melukis dua per tiga kertas, dan ia sudah mengerjakan satu per tiga bagian kertas. Berapa yang belum dilukis?",
      tambah(0, judul("Penyebut sama: Masalah Wei")),
      tambah("Masalah", ...kartu("lk", 100, 130, 100, 30, W.langit, ["Wei"], 11)),
      tambah("melukis", ...rumus("r", 150, 80, "2/3 − 1/3", 24, W.biru, {}, false)),
      tambah("sudah", teks("tn", 150, 178, "kurangnya berapa?", 10, W.merah)),
    ),
    k(
      "Kita ikuti cara Halim. Langkah pertama, arsir dua per tiga bagian kertas yang harus dilukis. Kertas dibagi menjadi tiga kotak sama besar, dan dua kotak diarsir.",
      bersih(0),
      tambah(0, judul("Cara Halim 1: yang harus dilukis")),
      tambah("Kertas", ...sel("k1", 40, 34, 62, 120, 3, [], W.langit, true), teks("k1t", 71, 168, "harus dilukis", 8.6, W.biru)),
      warnai("dua@2", W.langit, "k1-c0", "k1-c1"),
      tambah("arsir", ...rumus("r", 180, 90, "2/3", 24, W.biru, {}, false)),
      tambah("diarsir.", teks("n", 220, 140, "3 kotak, 2 diarsir", 9.4, W.biru)),
    ),
    k(
      "Langkah kedua, arsir satu per tiga bagian kertas yang sudah dilukis. Satu kotak saja diarsir. Coba lihat, dari dua kotak yang harus dilukis, satu sudah selesai, sehingga tersisa satu kotak.",
      bersih(0),
      tambah(0, judul("Cara Halim 2: yang sudah dilukis")),
      tambah(0, ...sel("k1", 40, 34, 62, 120, 3, [0, 1], W.langit, true), teks("k1t", 71, 168, "harus dilukis", 8.6, W.biru)),
      tambah("Satu", ...sel("k2", 150, 34, 62, 120, 3, [0], W.hijau, true), teks("k2t", 181, 168, "sudah dilukis", 8.6, W.biru)),
      tambah("tersisa", teks("ts", 254, 92, "tersisa", 9.4, W.merah), teks("ts2", 254, 106, "1 kotak", 9.4, W.merah)),
      ubah("tersisa", { id: "k1-c1", sorot: true }),
    ),
    k(
      "Cara Kira memakai kalimat matematika: yang belum dilukis sama dengan yang harus dilukis dikurangi yang sudah dilukis. Dua per tiga dikurangi satu per tiga sama dengan satu per tiga. Penyebut tetap, hanya pembilang dikurangi.",
      bersih(0),
      tambah(0, judul("Cara Kira")),
      tambah("kalimat", ...kartu("ka", 20, 30, 260, 34, W.krem, ["belum = harus dilukis − sudah dilukis"], 9.4)),
      tambah("Dua", ...rumus("r", 150, 112, "2/3 − 1/3 = 1/3", 20)),
      tambah("Penyebut", teks("pt", 150, 164, "penyebut tetap, pembilang dikurangi", 9.4, W.merah)),
    ),
  ],
};

/* ------------------------------ 4. Eksplorasi 3.3B: apel Kira (Buku Siswa hlm. 93 sampai 95) ------------------------------ */
export const ADEGAN_EKS_3B: AdeganStory = {
  id: "eks-3b",
  judul: "Pengurangan sepenyebut: delapan apel Kira",
  sumber: "Materi: penyebut sama, apel Kira",
  latar: "#FEF2F2",
  kutipan: kutipanLokal("k5b3c-materi-1.ts:4"),
  ketukan: [
    k(
      "Masalah berikutnya tentang apel Kira. Kira punya delapan buah apel dan membagikan enam buah apelnya kepada Wei. Selanjutnya Wei membagikan dua buah apelnya kepada Upe.",
      tambah(0, judul("Masalah Kira: delapan apel")),
      tambah("delapan", ...apel("ap", 80, 66, () => W.merah), teks("at", 110, 44, "8 apel milik Kira", 9.4, W.coklat)),
      warnai("enam", W.hijau, ...ap("ap", LUKAS)),
      tambah("enam", teks("l1", 110, 124, "hijau: ke Wei", 9, W.hijau)),
      warnai("dua", BIRU_MUDA, ...ap("ap", YOHANA)),
      tambah("dua", teks("l2", 110, 140, "biru: ke Upe", 9, W.biru)),
    ),
    k(
      "Pertanyaannya, pecahan berapa yang menyatakan sisa apel? Ikuti cara Halim, langkah satu: arsir apel yang diberikan Kira kepada Wei. Enam dari delapan apel, jadi enam per delapan.",
      bersih(0),
      tambah(0, judul("Cara Halim 1: apel Wei")),
      tambah("Cara", ...apel("ap", 40, 66, (i) => (LUKAS.includes(i) ? W.hijau : W.putih))),
      tambah("Enam", ...rumus("r", 220, 84, "6/8", 24, W.biru, {}, false), teks("rt", 220, 126, "diberikan Kira", 9, W.biru)),
    ),
    k(
      "Langkah dua: arsir apel Wei yang diberikan kepada Upe. Dua dari delapan apel, jadi dua per delapan.",
      bersih(0),
      tambah(0, judul("Cara Halim 2: apel Upe")),
      tambah(0, ...apel("ap", 40, 66, (i) => (YOHANA.includes(i) ? BIRU_MUDA : LUKAS.includes(i) ? W.hijau : W.putih))),
      tambah("Dua", ...rumus("r", 220, 84, "2/8", 24, W.biru, {}, false), teks("rt", 220, 126, "diberikan Wei", 9, W.biru)),
    ),
    k(
      "Langkah tiga: sisa apel Wei dari seluruh apel. Penyebutnya sama, jadi enam dikurangi dua sama dengan empat. Sisa apel Wei empat per delapan, atau setengah.",
      bersih(0),
      tambah(0, judul("Cara Halim 3: sisa apel Wei")),
      tambah(0, ...apel("ap", 80, 56, (i) => (YOHANA.includes(i) ? W.abu : LUKAS.includes(i) ? W.hijau : W.putih))),
      tambah("sisa", teks("sl", 150, 108, "sisa apel Wei: 4 dari 8", 9.4, W.hijau)),
      tambah("Penyebutnya", ...rumus("r", 150, 150, "6/8 − 2/8 = 4/8 = 1/2", 17)),
    ),
    k(
      "Hati-hati, tanyakan dulu sisa apel siapa. Yang kita hitung tadi sisa apel Wei. Sisa apel Kira sendiri delapan dikurangi enam, yaitu dua per delapan.",
      bersih(0),
      tambah(0, judul("Hati-hati: sisa siapa?")),
      tambah("siapa", kotak("c1", 14, 32, 130, 68, W.merahMuda, W.merah, { rx: 8 }), teks("c1t", 79, 48, "yang ditanya: sisa Kira", 8, W.merah)),
      tambah("Wei", kotak("c2", 156, 32, 130, 68, W.hijauMuda, W.hijau, { rx: 8 }), teks("c2t", 221, 48, "yang dihitung: sisa Wei", 8, W.hijau), ...rumus("c2r", 221, 80, "6/8 − 2/8 = 4/8", 11)),
      tambah("Sisa@3", ...apel("ap", 80, 128, (i) => (ASEP.includes(i) ? W.emas : W.abu))),
      tambah("delapan", ...rumus("c1r", 79, 80, "8/8 − 6/8 = 2/8", 11)),
    ),
  ],
};
