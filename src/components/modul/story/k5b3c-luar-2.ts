import type { AdeganStory } from "./logika-story";
import { W, apel, emo, judul, kartu, rumus, sel, silang, tabel, teks } from "./k5b3c-gambar";
import { LUKAS, YOHANA } from "./k5b3c-materi-1";
import { bersih, k, sorotkan, tambah, warnai } from "./k5b3c-bantu";

const BAR = { x: 40, y: 48, w: 222, h: 40 };

/* ------------------------------ 6. Residual Area Model: konsep ------------------------------ */
export const ADEGAN_LUAR_RAM: AdeganStory = {
  id: "luar-ram",
  judul: "Residual Area Model: model daerah sisa",
  sumber: "Metode luar: Residual Area Model",
  latar: "#FFFBEB",
  ketukan: [
    k(
      "Metode ketiga, Residual Area Model, artinya model daerah sisa. Gambar keseluruhan, arsir bagian yang diambil, lalu hitung daerah yang tersisa.",
      tambah(0, judul("Residual Area Model")),
      tambah("Gambar", ...sel("rm", BAR.x, BAR.y, BAR.w, BAR.h, 4, [], W.langit), teks("rt", 150, 112, "keseluruhan: 4 kotak", 9.6, W.biru)),
      warnai("arsir", W.langit, "rm-c0", "rm-c1", "rm-c2", "rm-c3"),
      tambah("diambil,", ...silang("rm", BAR.x, BAR.y, BAR.w, BAR.h, 4, [2, 3]), teks("ru", 150, 136, "diambil: 2 kotak (dicoret)", 9.6, W.merah)),
      sorotkan("tersisa.", "rm-c0", "rm-c1"),
      tambah("tersisa.", teks("rv", 150, 164, "daerah sisa: 2 kotak", 9.6, W.hijau)),
    ),
    k(
      "Bagi daerah menjadi potongan sama besar sesuai penyebut bersama. Arsir sebanyak pecahan pertama, lalu coret sebanyak pecahan kedua. Kotak yang tidak tercoret itulah sisanya.",
      bersih(0),
      tambah(0, judul("Arsir, coret, hitung sisa")),
      tambah("Bagi", ...sel("rn", BAR.x, BAR.y, BAR.w, BAR.h, 6, [], W.langit)),
      warnai("Arsir", W.langit, "rn-c0", "rn-c1", "rn-c2", "rn-c3"),
      tambah("coret", ...silang("rn", BAR.x, BAR.y, BAR.w, BAR.h, 6, [1, 2, 3])),
      tambah("sisanya.", ...rumus("rr", 150, 128, "4/6 − 3/6 = 1/6", 22)),
    ),
    k(
      "Kelebihannya terlihat jelas, cocok untuk pemula dan untuk memeriksa jawaban. Kekurangannya sulit digambar bila penyebut besar, misalnya empat puluh potongan.",
      bersih(0),
      tambah(0, judul("Kelebihan dan kekurangan")),
      tambah("Kelebihannya", ...kartu("kl", 14, 40, 130, 54, W.hijauMuda, ["terlihat jelas,", "cocok untuk pemula"], 9), emo("kle", 79, 120, "👍", 24)),
      tambah("Kekurangannya", ...kartu("kk", 156, 40, 130, 54, W.merahMuda, ["sulit digambar", "bila penyebut besar"], 9), emo("kke", 221, 120, "🤔", 24)),
    ),
    k(
      "Gambarnya bisa berupa kotak, batang, atau benda nyata seperti apel. Yang penting potongannya sama besar dan jumlahnya sesuai penyebut.",
      bersih(0),
      tambah(0, judul("Bentuk gambar boleh apa saja")),
      tambah("kotak,", ...sel("sh1", 20, 44, 70, 60, 3, [0], W.langit, true), teks("s1t", 55, 124, "kotak", 9.6, W.biru)),
      tambah("batang,", ...sel("sh2", 112, 60, 90, 24, 4, [0, 1], W.hijauMuda), teks("s2t", 157, 124, "batang", 9.6, W.biru)),
      tambah("apel.", ...apel("sh3", 222, 56, () => W.merah, 14, 5.5), teks("s3t", 243, 124, "apel", 9.6, W.biru)),
      tambah("Yang", teks("s4", 150, 164, "potongan harus sama besar", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ 7. Residual Area Model: penerapan ------------------------------ */
export const ADEGAN_LUAR_RAM_TERAPAN: AdeganStory = {
  id: "luar-ram-terapan",
  judul: "Residual Area Model pada kertas Yohana dan apel Asep",
  sumber: "Metode luar: Residual Area Model; Buku Siswa hlm. 98–99, 93–95",
  latar: "#FFFBEB",
  ketukan: [
    k(
      "Kertas Yohana: bagi kertas menjadi enam kotak, sebab KPK dari tiga dan dua adalah enam. Arsir empat kotak untuk dua per tiga.",
      tambah(0, judul("Kertas Yohana 1: arsir")),
      tambah("Kertas", ...sel("yk", BAR.x, BAR.y, BAR.w, BAR.h, 6, [], W.langit)),
      warnai("Arsir", W.langit, "yk-c0", "yk-c1", "yk-c2", "yk-c3"),
      tambah("dua@2", ...rumus("yr", 150, 130, "2/3 = 4/6", 22)),
    ),
    k(
      "Coret tiga kotak untuk satu per dua yang sudah dilukis. Tersisa satu kotak dari enam, jadi kekurangannya satu per enam.",
      bersih(0),
      tambah(0, judul("Kertas Yohana 2: coret")),
      tambah(0, ...sel("yk", BAR.x, BAR.y, BAR.w, BAR.h, 6, [0, 1, 2, 3], W.langit)),
      tambah("Coret", ...silang("yk", BAR.x, BAR.y, BAR.w, BAR.h, 6, [1, 2, 3])),
      sorotkan("Tersisa", "yk-c0"),
      tambah("jadi", ...rumus("yr", 150, 130, "4/6 − 3/6 = 1/6", 22)),
    ),
    k(
      "Apel Asep: delapan apel, enam diberikan kepada Lukas, dan dua apel diteruskan Lukas kepada Yohana. Apel Lukas yang tersisa tinggal empat dari delapan.",
      bersih(0),
      tambah(0, judul("Apel Asep: model daerah")),
      tambah("delapan", ...apel("ap", 80, 56, () => W.putih)),
      tambah("enam", teks("ak1", 150, 112, "hijau: ke Lukas (6)", 9, W.hijau)),
      tambah("dua", teks("ak2", 150, 128, "abu: diteruskan ke Yohana (2)", 9, W.coklat)),
      tambah("tinggal", teks("ak3", 150, 148, "tersisa: 4 dari 8", 10, W.hijau)),
    ),
    k(
      "Empat dari delapan apel sama dengan setengah. Cocok dengan hitungan enam per delapan dikurangi dua per delapan, yaitu empat per delapan.",
      bersih(0),
      tambah(0, judul("Setengah daerah tersisa")),
      tambah("Empat", ...apel("ap2", 80, 50, (i) => (YOHANA.includes(i) ? W.abu : LUKAS.includes(i) ? W.hijau : W.putih))),
      tambah("setengah.", teks("sg", 150, 100, "setengah daerah tersisa", 10, W.hijau)),
      tambah("Cocok", ...rumus("sr", 150, 144, "6/8 − 2/8 = 4/8 = 1/2", 19)),
    ),
  ],
};

/* ------------------------------ 8. Add-Up Check: konsep ------------------------------ */
export const ADEGAN_LUAR_AUP: AdeganStory = {
  id: "luar-aup",
  judul: "Add-Up Check: periksa pengurangan dengan penjumlahan balik",
  sumber: "Metode luar: Add-Up Check",
  latar: "#FDF2F8",
  ketukan: [
    k(
      "Metode keempat, Add-Up Check, yaitu memeriksa pengurangan dengan penjumlahan balik. Selisih ditambah pengurang harus kembali ke bilangan awal.",
      tambah(0, judul("Add-Up Check")),
      tambah("pengurangan", ...kartu("a1", 20, 38, 260, 34, W.langit, ["bilangan awal − pengurang = selisih"], 9.6)),
      tambah("penjumlahan", emo("a2", 150, 104, "🔁", 26)),
      tambah("Selisih", ...kartu("a3", 20, 120, 260, 34, W.hijauMuda, ["selisih + pengurang = bilangan awal"], 9.6)),
    ),
    k(
      "Contohnya lima per enam dikurangi satu per enam sama dengan empat per enam. Periksa: empat per enam ditambah satu per enam sama dengan lima per enam. Cocok, jadi benar.",
      bersih(0),
      tambah(0, judul("Contoh pemeriksaan")),
      tambah("Contohnya", ...rumus("c1", 150, 66, "5/6 − 1/6 = 4/6", 22)),
      tambah("Periksa:", ...rumus("c2", 150, 124, "4/6 + 1/6 = 5/6", 22)),
      tambah("Cocok,", emo("c3", 150, 180, "✅", 24)),
    ),
    k(
      "Bila hasil penjumlahan balik tidak sama dengan bilangan awal, ada yang salah. Kita hitung ulang, atau pernyataan soalnya memang salah.",
      bersih(0),
      tambah(0, judul("Kalau tidak cocok")),
      tambah("Bila", ...kartu("d1", 20, 40, 260, 36, W.hijauMuda, ["sama dengan bilangan awal: benar"], 9.6), emo("d1e", 150, 98, "✅", 20)),
      tambah("tidak", ...kartu("d2", 20, 118, 260, 36, W.merahMuda, ["tidak sama: ada yang salah"], 9.6), emo("d2e", 150, 176, "❌", 20)),
    ),
    k(
      "Kelebihannya menangkap salah hitung dan bagus untuk soal benar atau salah. Kekurangannya menambah satu langkah hitung.",
      bersih(0),
      tambah(0, judul("Kelebihan dan kekurangan")),
      tambah("Kelebihannya", ...kartu("kl", 14, 40, 130, 54, W.hijauMuda, ["menangkap salah", "hitung"], 9), emo("kle", 79, 120, "👍", 24)),
      tambah("Kekurangannya", ...kartu("kk", 156, 40, 130, 54, W.merahMuda, ["menambah satu", "langkah hitung"], 9), emo("kke", 221, 120, "🤔", 24)),
    ),
  ],
};

/* ------------------------------ 9. Add-Up Check: penerapan ------------------------------ */
export const ADEGAN_LUAR_AUP_TERAPAN: AdeganStory = {
  id: "luar-aup-terapan",
  judul: "Add-Up Check pada hasil Yohana, Asep, dan Uji Kompetensi",
  sumber: "Metode luar: Add-Up Check; Buku Siswa hlm. 98–99, 96–98, 104",
  latar: "#FDF2F8",
  ketukan: [
    k(
      "Periksa jawaban Yohana: satu per enam ditambah satu per dua. Satu per dua sama dengan tiga per enam, jadi jumlahnya empat per enam, yaitu dua per tiga. Cocok dengan kertas awal.",
      tambah(0, judul("Periksa jawaban Yohana")),
      tambah("Periksa", ...rumus("r", 150, 80, "1/6 + 1/2 = 1/6 + 3/6 = 4/6 = 2/3", 17)),
      tambah("Cocok", ...kartu("k", 50, 128, 200, 34, W.hijauMuda, ["sama dengan kertas awal 2/3"], 9.6), emo("e", 150, 184, "✅", 20)),
    ),
    k(
      "Periksa jarak Asep: tiga satu per tiga ditambah dua satu per tiga sama dengan lima dua per tiga kilometer, sesuai jarak ke sekolah. Cocok.",
      bersih(0),
      tambah(0, judul("Periksa jarak Asep")),
      tambah("Periksa", ...rumus("r", 150, 80, "3 1/3 + 2 1/3 = 5 2/3", 21)),
      tambah("sesuai", ...kartu("k", 50, 128, 200, 34, W.hijauMuda, ["sama dengan jarak 5 2/3 km"], 9.6), emo("e", 150, 184, "✅", 20)),
    ),
    k(
      "Uji Kompetensi enam: enam dikurangi tiga satu per delapan tertulis tiga tujuh per delapan. Periksa: tiga tujuh per delapan ditambah tiga satu per delapan sama dengan tujuh, bukan enam. Pernyataan salah.",
      bersih(0),
      tambah(0, judul("Uji Kompetensi 6")),
      tambah("Periksa:", ...rumus("r", 150, 80, "3 7/8 + 3 1/8 = 7", 22)),
      tambah("bukan", ...kartu("k", 50, 128, 200, 34, W.merahMuda, ["hasilnya 7, bukan 6: SALAH"], 9.6), emo("e", 150, 184, "❌", 20)),
    ),
    k(
      "Uji Kompetensi sepuluh: dua satu per tiga dikurangi satu lima per enam tertulis satu per tiga. Periksa: satu per tiga ditambah satu lima per enam sama dengan dua satu per enam, bukan dua satu per tiga. Salah.",
      bersih(0),
      tambah(0, judul("Uji Kompetensi 10")),
      tambah("Periksa:", ...rumus("r", 150, 80, "1/3 + 1 5/6 = 2/6 + 1 5/6 = 2 1/6", 17)),
      tambah("bukan", ...kartu("k", 50, 128, 200, 34, W.merahMuda, ["hasilnya 2 1/6, bukan 2 1/3: SALAH"], 9.6), emo("e", 150, 184, "❌", 20)),
    ),
  ],
};

/* ------------------------------ 10. Ringkasan ------------------------------ */
export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan empat metode luar",
  sumber: "Ringkasan metode luar",
  latar: "#F0F9FF",
  ketukan: [
    k(
      "Ringkasnya, empat metode. Like Denominator Subtract untuk penyebut sama, Common Denominator Subtract untuk penyebut berbeda.",
      tambah(0, judul("Ringkasan")),
      tambah("Like", ...kartu("r1", 14, 36, 272, 44, W.hijauMuda, ["Like Denominator Subtract", "penyebut sama"], 9.6)),
      tambah("Common", ...kartu("r2", 14, 92, 272, 44, W.langit, ["Common Denominator Subtract", "penyebut berbeda, lewat KPK"], 9.6)),
    ),
    k(
      "Residual Area Model memperlihatkan sisa lewat gambar, dan Add-Up Check memeriksa hasil dengan penjumlahan balik.",
      bersih(0),
      tambah(0, judul("Ringkasan")),
      tambah("Residual", ...kartu("r3", 14, 36, 272, 44, W.krem, ["Residual Area Model", "sisa terlihat lewat gambar"], 9.6)),
      tambah("Add-Up", ...kartu("r4", 14, 92, 272, 44, W.pink, ["Add-Up Check", "periksa dengan penjumlahan balik"], 9.6)),
    ),
    k(
      "Hasilnya dari buku: kertas Yohana satu per enam, jarak Asep tiga satu per tiga kilometer, tali Komang dua satu per enam meter, dan Uji Kompetensi tiga tujuh per empat puluh.",
      bersih(0),
      tambah(0, judul("Hasil dari buku")),
      tambah("kertas", ...tabel("hs", 30, 34, [150, 90], [["soal", "hasil"], ["kertas Yohana", "1/6"], ["jarak Asep", "3 1/3 km"], ["tali Komang", "2 1/6 m"], ["Uji Kompetensi 3", "7/40"]], 24, 8.6)),
    ),
    k(
      "Pilih metode sesuai soal, dan ingat: kita hanya boleh mengurangi potongan yang sama besar.",
      bersih(0),
      tambah(0, judul("Pesan penutup")),
      tambah("Pilih", emo("pl", 150, 70, "🎯", 40)),
      tambah("ingat:", ...kartu("pm", 30, 100, 240, 40, W.hijauMuda, ["kurangi hanya potongan", "yang sama besar"], 10)),
    ),
  ],
};
