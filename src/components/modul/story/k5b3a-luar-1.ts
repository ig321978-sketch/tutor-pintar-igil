import type { AdeganStory } from "./logika-story";
import { PITA, W, batang, emo, garis, garisBilangan, judul, kartu, kotak, pai, panah, penanda, teks } from "./k5b3a-gambar";
import { bersih, k, tambah } from "./k5b3a-bantu";

/** Garis bilangan 0 sampai 1 untuk metode garis bilangan dan patokan: titik 0 di x = 40, satu satuan 220 piksel. */
export const G01 = { x: 40, satuan: 220, y: 100 };
/** Garis bilangan 2 sampai 3 untuk pita Nisa: titik 2 di x = 30, satu satuan 230 piksel. */
export const G23 = { x: 30, satuan: 230, y: 100, awal: 2 };

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Empat metode dari luar untuk membandingkan dan mengurutkan pecahan",
  sumber: "Metode luar: pembuka; angka Buku Siswa hlm. 66–75",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Bagaimana kita membandingkan dan mengurutkan pecahan? Guru di berbagai negara punya cara berbeda. Dalam video ini kita lihat empat metode dari luar, memakai angka dari buku.",
      tambah(0, judul("Empat metode dari luar")),
      tambah("pecahan?", ...pai("pp", 62, 112, 32, 4, 1)),
      tambah("berbagai", emo("gl", 170, 104, "🌍", 50)),
      tambah("angka", teks("pa", 150, 176, "lompatan Yohana dan pita Nisa", 9.4, W.biru)),
    ),
    k(
      "Empat metode itu: Number Line Fractions, Equivalent Fractions, Mixed to Improper, dan Benchmark Half Comparison.",
      bersih(0),
      tambah(0, judul("Empat metode")),
      tambah("Number", ...kartu("m1", 12, 34, 276, 30, W.hijauMuda, ["1. Number Line Fractions"], 9.6)),
      tambah("Equivalent", ...kartu("m2", 12, 72, 276, 30, W.langit, ["2. Equivalent Fractions"], 9.6)),
      tambah("Mixed", ...kartu("m3", 12, 110, 276, 30, W.krem, ["3. Mixed to Improper"], 9.6)),
      tambah("Benchmark", ...kartu("m4", 12, 148, 276, 30, W.pink, ["4. Benchmark Half Comparison"], 9.6)),
    ),
    k(
      "Semuanya memegang satu gagasan: pecahan bisa dibandingkan kalau ditaruh pada ukuran yang sama, yaitu letak yang sama di garis, penyebut yang sama, atau patokan yang sama.",
      bersih(0),
      tambah(0, judul("Satu gagasan yang sama")),
      tambah("letak", emo("i1", 52, 80, "📏", 36), teks("i1t", 52, 112, "letak sama", 9, W.biru)),
      tambah("penyebut", emo("i2", 150, 80, "🔢", 36), teks("i2t", 150, 112, "penyebut sama", 9, W.biru)),
      tambah("patokan", emo("i3", 248, 80, "🎯", 36), teks("i3t", 248, 112, "patokan sama", 9, W.biru)),
      tambah("ukuran", ...kartu("ig", 50, 136, 200, 34, W.emas, ["pecahan sebanding"], 10)),
    ),
    k(
      "Angkanya dari buku: lompatan Yohana dua dan tiga per empat, tiga dan satu per dua, serta tujuh per delapan meter, juga pita Nisa dua dan dua per lima, dua dan satu per empat, serta dua dan satu per dua meter.",
      bersih(0),
      tambah(0, judul("Angka dari buku")),
      tambah("Yohana", ...kartu("a1", 14, 38, 272, 50, W.hijauMuda, ["lompatan Yohana", "2 3/4 m, 3 1/2 m, 7/8 m"], 9.6)),
      tambah("Nisa", ...kartu("a2", 14, 104, 272, 50, W.langit, ["pita Nisa", "2 2/5 m, 2 1/4 m, 2 1/2 m"], 9.6)),
    ),
  ],
};

/* ------------------------------ 2. Number Line Fractions: konsep ------------------------------ */
const garis01 = (id: string) => garisBilangan(id, G01.x, G01.y, G01.satuan, 1, 10);
const titik01 = (id: string, nilai: number, label: string, warna: string = W.merah, bawah = 14) => penanda(id, G01.x, G01.y, G01.satuan, nilai, label, warna, bawah, 9);

export const ADEGAN_LUAR_GARIS: AdeganStory = {
  id: "luar-garis",
  judul: "Number Line Fractions: pecahan di garis bilangan",
  sumber: "Metode luar: Number Line Fractions",
  latar: "#F5F3FF",
  ketukan: [
    k(
      "Metode pertama, Number Line Fractions, atau pecahan di garis bilangan. Gambarlah garis bilangan, tandai nol dan satu, lalu bagi sama panjang sesuai penyebut. Letak pecahan menunjukkan besarnya.",
      tambah(0, judul("Number Line Fractions")),
      tambah("Gambarlah", ...garis01("nl")),
      tambah("bagi", ...[1, 2, 3].map((i) => garis(`nq${i}`, G01.x + (i * G01.satuan) / 4, G01.y - 4, 0, 8, W.biru, 1.2)), teks("nb", 150, 140, "dibagi 4 sama panjang", 9.4, W.ungu)),
      tambah("Letak", ...titik01("nm", 3 / 4, "3/4")),
    ),
    k(
      "Langkahnya tiga. Tandai nol dan bilangan bulat yang dibutuhkan. Bagi tiap satuan sesuai penyebut. Letakkan titik pecahan, lalu bandingkan: yang lebih ke kanan lebih besar.",
      bersih(0),
      tambah(0, judul("Tiga langkah")),
      tambah("Tandai", ...kartu("l1", 14, 32, 272, 30, W.hijauMuda, ["1. tandai 0 dan bilangan bulat"], 9.4)),
      tambah("Bagi", ...kartu("l2", 14, 70, 272, 30, W.langit, ["2. bagi tiap satuan sesuai penyebut"], 9.4)),
      tambah("Letakkan", ...kartu("l3", 14, 108, 272, 30, W.krem, ["3. letakkan titik pecahan"], 9.4)),
      tambah("kanan", ...kartu("l4", 14, 146, 272, 30, W.pink, ["4. lebih ke kanan = lebih besar"], 9.4)),
    ),
    k(
      "Contoh kecil dari Mengingat Kembali: satu per dua dan satu per lima pada garis dari nol sampai satu. Satu per lima dekat nol, satu per dua di tengah, jadi satu per dua lebih besar.",
      bersih(0),
      tambah(0, judul("Satu per dua atau satu per lima?")),
      tambah(0, ...garis01("ct")),
      tambah("dua", ...titik01("c1_2", 1 / 2, "1/2")),
      tambah("lima", ...titik01("c1_5", 1 / 5, "1/5", W.biru)),
      tambah("jadi", ...kartu("ck", 80, 150, 140, 30, W.emas, ["1/2 > 1/5"], 12)),
    ),
    k(
      "Kelebihannya, urutan langsung terlihat dan pecahan campuran bisa ditempatkan di antara dua bilangan bulat. Kekurangannya, kalau penyebutnya besar, garis harus dibagi dengan teliti.",
      bersih(0),
      tambah(0, judul("Kelebihan dan kekurangan")),
      tambah("Kelebihannya,", ...kartu("kl", 14, 40, 130, 62, W.hijauMuda, ["urutan langsung", "terlihat, campuran", "mudah ditempatkan"], 8.6), emo("kle", 79, 128, "👍", 26)),
      tambah("Kekurangannya,", ...kartu("kk", 156, 40, 130, 62, W.merahMuda, ["penyebut besar:", "garis harus dibagi", "dengan teliti"], 8.6)),
    ),
  ],
};

/* ------------------------------ 3. Number Line Fractions: penerapan pada pita Nisa ------------------------------ */
const garis23 = (id: string) => garisBilangan(id, G23.x, G23.y, G23.satuan, 3, 10, G23.awal);
const titikPita = (indeks: number, bawah: number, warna: string) => {
  const c = PITA[indeks];
  const [bulatTanda] = penanda(`pt-m${indeks}`, G23.x, G23.y, G23.satuan, c.bulat + c.p / c.q, "", warna, bawah, 8.4, G23.awal);
  return [bulatTanda, teks(`pt-m${indeks}-n`, G23.x + (c.bulat + c.p / c.q - G23.awal) * G23.satuan, G23.y + bawah, `${c.bulat} ${c.p}/${c.q}`, 8.4, warna)];
};

export const ADEGAN_LUAR_GARIS_TERAPAN: AdeganStory = {
  id: "luar-garis-terapan",
  judul: "Number Line Fractions pada pita Nisa",
  sumber: "Metode luar: Number Line Fractions; pita Nisa Buku Siswa hlm. 75",
  latar: "#F5F3FF",
  ketukan: [
    k(
      "Terapkan pada pita Nisa. Karena bulatnya sama, yaitu dua, kita cukup memperbesar bagian antara dua dan tiga pada garis bilangan.",
      tambah(0, judul("Pita Nisa pada garis bilangan")),
      tambah("Karena", ...garis23("pt")),
      tambah("memperbesar", teks("pz", 150, 150, "perbesar bagian dari 2 sampai 3", 9.4, W.ungu)),
    ),
    k(
      "Dua dan satu per empat berada seperempat jalan dari dua menuju tiga, jadi letaknya dekat dengan dua.",
      tambah("seperempat", ...titikPita(1, 14, W.merah)),
    ),
    k(
      "Dua dan dua per lima lebih ke kanan, hampir di tengah. Dua dan satu per dua tepat di tengah antara dua dan tiga.",
      tambah("lima", ...titikPita(0, 28, W.hijau)),
      tambah("tepat", ...titikPita(2, 14, W.biru)),
    ),
    k(
      "Baca dari kiri ke kanan: dua dan satu per empat, dua dan dua per lima, lalu dua dan satu per dua. Itu urutan pita Nisa dari yang terpendek.",
      tambah(9, teks("o1", G23.x + (2.25 - 2) * G23.satuan, G23.y - 22, "1", 12, W.merah)),
      tambah(14, teks("o2", G23.x + (2.4 - 2) * G23.satuan, G23.y - 22, "2", 12, W.hijau)),
      tambah(20, teks("o3", G23.x + (2.5 - 2) * G23.satuan, G23.y - 22, "3", 12, W.biru)),
      tambah("terpendek.", ...kartu("ot", 40, 166, 220, 28, W.emas, ["dari terpendek: 1, 2, 3"], 9.8)),
    ),
  ],
};

/* ------------------------------ 4. Equivalent Fractions: konsep ------------------------------ */
export const ADEGAN_LUAR_SENILAI: AdeganStory = {
  id: "luar-senilai",
  judul: "Equivalent Fractions: pecahan senilai",
  sumber: "Metode luar: Equivalent Fractions",
  latar: "#F0F9FF",
  ketukan: [
    k(
      "Metode kedua, Equivalent Fractions, atau pecahan senilai. Pecahan yang tulisannya beda tetapi menunjukkan bagian yang sama. Satu per dua sama dengan dua per empat, juga empat per delapan.",
      tambah(0, judul("Equivalent Fractions")),
      tambah("Satu", ...batang("e2", 20, 40, 140, 26, 2, 1), teks("f2", 200, 59, "1/2", 14, W.biru)),
      tambah("empat,", ...batang("e4", 20, 84, 140, 26, 4, 2), teks("f4", 200, 103, "2/4", 14, W.biru)),
      tambah("delapan.", ...batang("e8", 20, 128, 140, 26, 8, 4), teks("f8", 200, 147, "4/8", 14, W.biru)),
      tambah("juga", teks("fe", 150, 184, "1/2 = 2/4 = 4/8", 14, W.merah)),
    ),
    k(
      "Aturannya: kalikan pembilang dan penyebut dengan bilangan yang sama, bukan hanya penyebutnya. Nilai pecahan tidak berubah, hanya cara menulisnya.",
      bersih(0),
      tambah(0, judul("Kalikan atas dan bawah")),
      tambah("kalikan", teks("a1", 56, 92, "3/4", 26, W.biru), panah("ap", 96, 88, 108, 0, W.biru, 2.4, { gambar: true }), teks("a2", 244, 92, "6/8", 26, W.biru), teks("ax", 150, 74, "× 2 pada atas dan bawah", 9.4, W.merah)),
      tambah("bukan", ...kartu("sl", 40, 116, 220, 32, W.merahMuda, ["bukan: 3/4 → 3/8 (hanya penyebut)"], 9)),
      tambah("tidak", ...kartu("bn", 70, 158, 160, 30, W.hijauMuda, ["nilainya tetap sama"], 9.6)),
    ),
    k(
      "Kegunaan utamanya: menyamakan penyebut. Dengan penyebut sama, dua pecahan bisa dibandingkan lewat pembilangnya saja.",
      bersih(0),
      tambah(0, judul("Menyamakan penyebut")),
      tambah("Kegunaan", teks("b1", 150, 62, "3/4 dan 5/8", 20, W.biru)),
      tambah(6, teks("b2", 150, 108, "6/8 dan 5/8", 20, W.biru)),
      tambah("pembilangnya", ...kartu("b3", 80, 132, 140, 34, W.emas, ["6 lebih besar dari 5"], 9.6)),
    ),
    k(
      "Kekurangannya, kita harus mencari penyebut bersama lebih dulu, misalnya dengan KPK. Kalau penyebutnya banyak, langkahnya bertambah.",
      bersih(0),
      tambah(0, judul("Kekurangan metode ini")),
      tambah("Kekurangannya,", ...kartu("c1", 20, 40, 260, 34, W.merahMuda, ["cari penyebut bersama dulu"], 9.8)),
      tambah("KPK.", ...kartu("c2", 20, 84, 260, 34, W.krem, ["misalnya dengan KPK"], 9.8)),
      tambah("banyak,", ...kartu("c3", 20, 128, 260, 34, W.pink, ["penyebut banyak: langkah bertambah"], 9.8)),
    ),
  ],
};

/* ------------------------------ 5. Equivalent Fractions: penerapan pada lompatan Yohana ------------------------------ */
const bar = (id: string, y: number, pembilang: number, warna: string) => kotak(id, 30, y, pembilang * 6, 20, warna, W.biru, { rx: 4 });

export const ADEGAN_LUAR_SENILAI_TERAPAN: AdeganStory = {
  id: "luar-senilai-terapan",
  judul: "Equivalent Fractions pada lompatan Yohana",
  sumber: "Metode luar: Equivalent Fractions; lompatan Yohana Buku Siswa hlm. 71–73",
  latar: "#F0F9FF",
  ketukan: [
    k(
      "Terapkan pada lompatan Yohana, yang sudah berbentuk sebelas per empat, tujuh per dua, dan tujuh per delapan. Penyebutnya berbeda, KPK-nya delapan, jadi semuanya diubah ke per delapan.",
      tambah(0, judul("Lompatan Yohana")),
      tambah("sebelas", ...kartu("y1", 10, 40, 86, 34, W.hijauMuda, ["11/4"], 14)),
      tambah("tujuh", ...kartu("y2", 107, 40, 86, 34, W.langit, ["7/2"], 14)),
      tambah("tujuh@2", ...kartu("y3", 204, 40, 86, 34, W.krem, ["7/8"], 14)),
      tambah("KPK-nya", ...kartu("yk", 70, 100, 160, 34, W.emas, ["KPK 4, 2, 8 = 8"], 11)),
    ),
    k(
      "Sebelas per empat dikali dua atas dan bawah menjadi dua puluh dua per delapan. Tujuh per dua dikali empat menjadi dua puluh delapan per delapan.",
      bersih(0),
      tambah(0, judul("Ubah ke per delapan")),
      tambah("Sebelas", teks("z1", 120, 66, "11/4 = 22/8", 17, W.biru), teks("zx1", 244, 66, "× 2", 11, W.merah)),
      tambah("Tujuh", teks("z2", 120, 112, "7/2 = 28/8", 17, W.biru), teks("zx2", 244, 112, "× 4", 11, W.merah)),
    ),
    k(
      "Tujuh per delapan sudah per delapan. Sekarang bandingkan pembilangnya: tujuh, dua puluh dua, dan dua puluh delapan. Yang terbesar dua puluh delapan.",
      bersih(0),
      tambah(0, judul("Bandingkan pembilangnya")),
      tambah(9, bar("p7", 44, 7, W.krem), teks("l7", 32 + 7 * 6, 58, "7/8", 11, W.biru, { anchor: "start" })),
      tambah(10, bar("p22", 84, 22, W.langit), teks("l22", 34 + 22 * 6, 98, "22/8", 11, W.biru, { anchor: "start" })),
      tambah(14, bar("p28", 124, 28, W.hijauMuda), teks("l28", 34 + 28 * 6, 138, "28/8", 11, W.biru, { anchor: "start" })),
      tambah("terbesar", teks("tb", 150, 178, "terbesar: 28", 12, W.merah)),
    ),
    k(
      "Jadi urutan dari terbesar: dua puluh delapan per delapan, dua puluh dua per delapan, lalu tujuh per delapan. Itu tiga dan satu per dua meter, dua dan tiga per empat meter, lalu tujuh per delapan meter.",
      bersih(0),
      tambah(0, judul("Urutan dari terbesar")),
      tambah("Jadi", ...kartu("w1", 40, 38, 240, 34, W.hijauMuda, ["28/8 = 3 1/2 m"], 11), emo("wm1", 20, 62, "🥇", 22)),
      tambah(9, ...kartu("w2", 40, 82, 240, 34, W.langit, ["22/8 = 2 3/4 m"], 11), emo("wm2", 20, 106, "🥈", 22)),
      tambah(14, ...kartu("w3", 40, 126, 240, 34, W.krem, ["7/8 m"], 11), emo("wm3", 20, 150, "🥉", 22)),
    ),
  ],
};
