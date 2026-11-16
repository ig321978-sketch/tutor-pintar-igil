import type { AdeganStory } from "./logika-story";
import { EKS, EKS_JAJAR, EKS_LAYANG, EKS_SEGITIGA_ATAS, EKS_SEGITIGA_BAWAH, W, dasarEks, emo, hurufEks, judul, kartu, lukis, potong, teks } from "./k5b5c-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah } from "./k5b5c-bantu";
import { OX, OY, S } from "./k5b5c-materi-1";
import { kutipanLokal } from "./kutipan-lokal";

const HURUF = hurufEks("h", OX, OY, S);

/* ------------------------------ 5. Cara Wei: jajargenjang dan segitiga (hlm. 158-159; Panduan Guru hlm. 230-231) ------------------------------ */
export const ADEGAN_CARA_KOMANG: AdeganStory = {
  id: "cara-komang",
  judul: "Cara Wei: jajargenjang dan segitiga",
  sumber: "Materi: cara Wei memecah bangun",
  latar: "#FDF2F8",
  kutipan: kutipanLokal("k5b5c-materi-2.ts:1"),
  ketukan: [
    k(
      "Cara Wei: bangun juga dibagi menjadi dua, yaitu jajargenjang dan segitiga. Garis pembaginya mendatar dari A ke C.",
      tambah(0, judul("Cara Wei", W.ungu)),
      tambah(0, ...dasarEks("e", OX, OY, S)),
      tambah("jajargenjang", lukis("kj", OX, OY, S, EKS_JAJAR, W.langit, W.oranye)),
      tambah("segitiga.", lukis("ks", OX, OY, S, EKS_SEGITIGA_BAWAH, W.krem, W.oranye)),
      tambah("mendatar", potong("pb", OX, OY, S, EKS.A, EKS.C, W.merah)),
      tambah(0, ...HURUF),
      tambah("menjadi", ...kartu("k2", 166, 40, 126, 30, W.hijauMuda, ["dibagi 2 bangun"], 9)),
    ),
    k(
      "Jajargenjang AEDC beralas lima dan tingginya dua. Luasnya alas kali tinggi, yaitu lima kali dua, sama dengan sepuluh satuan luas.",
      sorotkan(0, "kj"),
      tambah("beralas", ...kartu("ka", 166, 76, 126, 26, W.krem, ["alas AC = 5"], 8.8)),
      tambah("tingginya", potong("t1", OX, OY, S, EKS.E, [1, 2], W.hijau), ...kartu("kt", 166, 108, 126, 26, W.krem, ["tinggi 1 = 2"], 8.8)),
      tambah("Luasnya", teks("g1", 150, 150, "Luas jajargenjang = alas × tinggi", 8.8, W.biru)),
      tambah("yaitu", teks("g2", 150, 168, "= 5 × 2 = 10 satuan luas", 9.6, W.hijau)),
    ),
    k(
      "Segitiga ABC juga beralas lima dan tingginya dua, yaitu dari B tegak lurus ke garis AC. Luasnya setengah kali lima kali dua, sama dengan lima satuan luas.",
      redamkan(0, "kj"),
      hapus(0, "t1", "g1", "g2", "kt-k", "kt-t0"),
      sorotkan(0, "ks"),
      tambah("tingginya", potong("t2", OX, OY, S, EKS.B, [1, 2], W.hijau), ...kartu("kt2", 166, 108, 126, 26, W.krem, ["tinggi 2 = 2"], 8.8)),
      tambah("Luasnya", teks("g3", 150, 150, "Luas segitiga = ½ × alas × tinggi", 8.8, W.biru)),
      tambah("setengah", teks("g4", 150, 168, "= ½ × 5 × 2 = 5 satuan luas", 9.6, W.hijau)),
    ),
    k(
      "Jadi luas bangun gabungan adalah luas jajargenjang ditambah luas segitiga, yaitu sepuluh ditambah lima, sama dengan lima belas satuan luas.",
      redamkan(0, "ks"),
      hapus(0, "t2", "g3", "g4", "ka-k", "ka-t0", "kt2-k", "kt2-t0"),
      tambah("sepuluh", teks("n1", 76, 54, "10", 11, W.merah)),
      tambah("lima", teks("n2", 52, 100, "5", 11, W.merah)),
      tambah("ditambah", ...kartu("hs", 40, 140, 220, 38, W.emas, ["10 + 5 = 15 satuan luas"], 12)),
    ),
    k(
      "Hasilnya sama dengan cara Upe, yaitu lima belas satuan luas. Jadi cara Wei dan cara Upe sepakat: bangun yang sama boleh dipecah dengan cara berbeda, dan luasnya tetap sama.",
      hapus(0, "hs-k", "hs-t0", "n1", "n2", "pb"),
      tambah("Upe,", ...kartu("hy", 14, 134, 134, 30, W.hijauMuda, ["Upe: 10 + 5 = 15"], 9)),
      tambah("Wei", ...kartu("hk", 152, 134, 134, 30, W.pink, ["Wei: 10 + 5 = 15"], 9)),
      tambah("tetap", ...kartu("hz", 70, 172, 160, 22, W.emas, ["luas tetap sama"], 9.6)),
    ),
  ],
};

/* ------------------------------ 6. Kesulitan yang bisa muncul dan diferensiasi (Panduan Guru hlm. 231) ------------------------------ */
export const ADEGAN_MISKONSEPSI: AdeganStory = {
  id: "kesulitan-bangun-gabungan",
  judul: "Hati-hati: kesalahan yang sering terjadi",
  sumber: "Materi: kesalahan umum bangun gabungan",
  latar: "#FFFBEB",
  kutipan: kutipanLokal("k5b5c-materi-2.ts:2"),
  ketukan: [
    k(
      "Hati-hati, ada dua kesalahan yang sering terjadi. Pertama, kita sulit mengenali bangun-bangun datar yang menyusun bangun gabungan.",
      tambah(0, judul("Hati-hati: mengenali bangun")),
      tambah("Hati-hati,", ...dasarEks("e", OX, OY, S)),
      tambah("Pertama,", ...kartu("m1", 166, 40, 126, 44, W.merahMuda, ["bangun penyusunnya", "yang mana, ya?"], 8.8)),
      tambah("menyusun", teks("qm", 94, 80, "?", 26, W.merah)),
    ),
    k(
      "Cara mengatasinya adalah coba-coba. Cobalah satu bangun datar pada salah satu sisi, lalu pikirkan bangun yang cocok untuk mengisi bagian sisanya.",
      hapus(0, "qm"),
      tambah("satu", lukis("mt1", OX, OY, S, EKS_LAYANG, W.langit, W.oranye)),
      tambah("sisanya.", lukis("mt2", OX, OY, S, EKS_SEGITIGA_ATAS, W.krem, W.oranye)),
      tambah("coba-coba.", ...kartu("m2", 166, 96, 126, 44, W.hijauMuda, ["coba satu bangun,", "isi sisanya"], 8.8)),
    ),
    k(
      "Kesalahan kedua, kita sulit menemukan unsur yang dibutuhkan, seperti alas dan tinggi segitiga, atau diagonal layang-layang, karena bangunnya bisa terbalik atau miring.",
      bersih(0),
      tambah(0, judul("Hati-hati: letak bangun")),
      tambah("kedua,", lukis("tb", 60, 60, 1, [[0, 0], [150, 0], [120, 70]], W.krem, W.oranye)),
      tambah("alas", teks("tb-a", 135, 54, "alas ada di atas", 9, W.merah)),
      tambah("tinggi", garis2("tb-h", 180, 60, 0, 70)),
      tambah("diagonal", teks("tb-d", 150, 150, "tinggi tetap tegak lurus ke alas", 9, W.hijau)),
    ),
    k(
      "Contohnya pada bangun tadi. Cara Upe dan cara Wei sama-sama memakai segitiga yang alasnya justru di atas, karena segitiganya terbalik.",
      bersih(0),
      tambah(0, judul("segitiga terbalik pada bangun tadi")),
      tambah(0, ...dasarEks("e", OX, OY, S)),
      tambah("Upe", lukis("ys", OX, OY, S, EKS_SEGITIGA_ATAS, W.krem, W.oranye)),
      tambah("Wei", lukis("ks", OX, OY, S, EKS_SEGITIGA_BAWAH, W.langit, W.oranye)),
      tambah("alasnya", ...kartu("m3", 166, 40, 126, 44, W.krem, ["alas segitiga EDC", "ada di atas"], 8.8)),
      tambah("terbalik.", ...kartu("m4", 166, 96, 126, 30, W.pink, ["perlu dicermati"], 8.8)),
    ),
    k(
      "Tantangan: gambarlah bangun gabungan buatanmu sendiri. Mulailah dari yang hanya terdiri dari dua bangun datar sederhana, lalu coba yang lebih rumit.",
      bersih(0),
      tambah(0, judul("Tantangan")),
      tambah("gambarlah", emo("kr", 232, 70, "💡", 34)),
      tambah("dua", lukis("at", 40, 94, 1, [[0, 0], [40, -34], [80, 0]], W.krem, W.oranye), lukis("pp", 40, 94, 1, [[0, 0], [80, 0], [80, 50], [0, 50]], W.langit, W.oranye)),
      tambah("sederhana,", ...kartu("m5", 40, 160, 220, 28, W.hijauMuda, ["mulai dari gabungan 2 bangun sederhana"], 8.8)),
    ),
  ],
};

function garis2(id: string, x: number, y: number, dx: number, dy: number) {
  return { id, t: "garis" as const, x, y, x2: dx, y2: dy, warna: W.hijau, tebal: 1.8, putus: true };
}

/* ------------------------------ 7. Penguatan akhir dan Refleksi 13 dan 14 (Panduan Guru hlm. 231-232; Buku Siswa hlm. 161) ------------------------------ */
export const ADEGAN_PENGUATAN: AdeganStory = {
  id: "penguatan-refleksi",
  judul: "Penguatan: empat langkah dan renungan",
  sumber: "Materi: rangkuman langkah dan renungan",
  latar: "#F0FDF4",
  kutipan: kutipanLokal("k5b5c-materi-2.ts:3"),
  ketukan: [
    k(
      "Mari kita kuatkan lagi cara menghitung luas daerah bangun gabungan. Ada empat langkah yang perlu kamu ingat.",
      tambah(0, judul("penguatan: empat langkah")),
      tambah("menghitung", emo("pg", 150, 100, "🧩", 50)),
    ),
    k(
      "Langkah pertama, pecah bangun gabungan menjadi bangun yang rumusnya sudah kita kenal. Langkah kedua, cari ukuran yang belum diketahui, seperti alas, tinggi, atau diagonal.",
      hapus(0, "pg"),
      tambah("pertama,", ...kartu("p1", 20, 36, 260, 34, W.hijauMuda, ["1. pecah menjadi bangun yang dikenal"], 8.8)),
      tambah("kedua,", ...kartu("p2", 20, 80, 260, 34, W.langit, ["2. cari ukuran yang belum diketahui"], 8.8)),
    ),
    k(
      "Langkah ketiga, hitung luas tiap bangun penyusun. Langkah keempat, jumlahkan semua luasnya.",
      tambah("ketiga,", ...kartu("p3", 20, 124, 260, 34, W.krem, ["3. hitung luas tiap bangun penyusun"], 8.8)),
      tambah("keempat,", ...kartu("p4", 20, 166, 260, 30, W.pink, ["4. jumlahkan semua luasnya"], 8.8)),
    ),
    k(
      "Terakhir, renungkan dua pertanyaan ini. Apakah kamu bisa memecah bangun gabungan menjadi bangun-bangun penyusunnya? Apakah kamu bisa menemukan cara menghitung luasnya?",
      bersih(0),
      tambah(0, judul("Renungan")),
      tambah("memecah", ...kartu("r13", 14, 32, 272, 58, W.putih, ["Bisakah aku memecah bangun gabungan", "menjadi bangun-bangun penyusunnya?"], 8.4)),
      tambah("menemukan", ...kartu("r14", 14, 98, 272, 58, W.putih, ["Bisakah aku menemukan cara menghitung", "luas daerah bangun gabungan?"], 8.4)),
    ),
    k(
      "Kalau jawabanmu masih belum, tidak apa-apa. Ulangi kegiatan tadi dengan tenang sebelum melanjutkan, dan jangan ragu untuk bertanya kepada gurumu.",
      tambah("belum,", ...kartu("ul", 40, 166, 200, 28, W.krem, ["masih belum? ulangi kegiatannya"], 8.8)),
      tambah("bertanya", emo("tn", 268, 182, "🙋", 22)),
    ),
  ],
};
