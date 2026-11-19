import type { AdeganStory, Obj } from "./logika-story";
import { E, W, alasPilah, alat, emo, garis, judul, kartu, kotak, lantai, panah, pindah, teks, tirai, tokoh, turus } from "./k2b8A-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k2b8A-bantu";

/*
 * Cerita orisinal IGIL "Alat Musik Pak Hendra" (Kelas 2 Bab 8 Sub-Bab A), video metode global.
 * Naskah suara dari naskah/story-naskah-k2b8a.md. Bagian ini: pembuka (tiga lembar catatan penata panggung), Sorting Mat (Alas Pilah), dan terapannya.
 */

export const NAMA_METODE = ["Sorting Mat", "Count by Fives", "Real Graph"] as const;
export const NAMA_METODE_ID = ["Alas Pilah", "Hitung Lima-Lima", "Diagram Benda Nyata"] as const;

const KUNING_KARTU = "#FEF3C7";

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Di balik tirai panggung, Nia menemukan tiga lembar catatan milik penata panggung zaman dulu.";
const SUARA_O2 = "Pak Hendra tersenyum. Itu cara mendata banyak benda dengan cepat dan tepat!";
const SUARA_O3 = "Tiga cara itu: Sorting Mat, Count by Fives, dan Real Graph.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Alas Pilah, Hitung Lima-Lima, dan Diagram Benda Nyata.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga lembar catatan penata panggung",
  sumber: "Metode global: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Lembar Catatan Tua"), ...lantai("lt", 150), ...tirai("tr", 150)),
      tambah("Nia", ...tokoh("ni", 44, 184, "Nia")),
      tambah("tiga", teks("n3", 150, 46, "3 lembar", 10, W.ungu)),
      tambah("lembar", ...[0, 1, 2].flatMap((i) => kartu(`c${i}`, 120 + i * 24, 62 + (i % 2) * 8, 30, 36, KUNING_KARTU, ["catatan"], 6))),
    ),
    k(
      SUARA_O2,
      tambah("Pak", ...tokoh("ph", 264, 184, "Pak Hendra")),
      ubah("tersenyum.", { id: "ph", isi: E.senyum }),
      sorotkan("cara", "c0-k", "c1-k", "c2-k"),
      tambah("benda", ...alat("bb0", 130, 122, "angklung"), ...alat("bb1", 150, 122, "gendang"), ...alat("bb2", 170, 122, "rebana")),
      tambah("tepat!", emo("ok", 100, 104, E.benar, 22)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara Pendataan"), teks("n3", 250, 40, "3 cara", 10, W.ungu)),
      tambah("Sorting", teks("m0", 150, 72, "1. Sorting Mat", 12, W.biru), ...alasPilah("mi", 20, 56, 52, 8, 3)),
      tambah("Count", teks("m1", 150, 122, "2. Count by Fives", 12, W.biru), ...turus("mt", 24, 108, 7, W.biru, 14, 4, 2)),
      tambah("Real", teks("m2", 150, 172, "3. Real Graph", 12, W.biru), garis("mg1", 24, 158, 40, 0, W.merah, 4), garis("mg2", 24, 166, 28, 0, W.merah, 4), garis("mg3", 24, 174, 18, 0, W.merah, 4)),
    ),
    k(
      SUARA_O4,
      tambah("Alas", teks("g0", 256, 72, "Alas Pilah", 9, W.ungu)),
      tambah("Hitung", teks("g1", 256, 122, "Hitung Lima-Lima", 9, W.ungu)),
      tambah("Diagram", teks("g2", 250, 172, "Diagram Benda Nyata", 9, W.ungu)),
    ),
  ],
};

/* ------------------------------ Sorting Mat: konsep ------------------------------ */
const SUARA_C1 = "Cara pertama, Sorting Mat, atau Alas Pilah.";
const SUARA_C2 = "Alas itu punya satu baris untuk tiap jenis benda, dengan nama jenis di ujung kiri.";
const SUARA_C3 = "Taruh tiap benda di baris jenisnya. Satu benda hanya boleh berada di satu baris.";
const SUARA_C4 = "Setelah semua benda terpilah, hitung tiap baris tanpa takut tercampur.";

/** Tiga jenis kostum di alas: topi tiga, selendang dua, sepatu dua. Id `i0`..`i6`. */
const KOSTUM: { e: string; baris: number }[] = [
  { e: E.topiPanggung, baris: 0 },
  { e: E.selendang, baris: 1 },
  { e: E.topiPanggung, baris: 0 },
  { e: E.sepatu, baris: 2 },
  { e: E.selendang, baris: 1 },
  { e: E.topiPanggung, baris: 0 },
  { e: E.sepatu, baris: 2 },
];
const ID_KOSTUM = KOSTUM.map((_, i) => `i${i}`);
const BARIS_KOSTUM = [72, 102, 132] as const;
const kostumDi = (letak: (i: number, baris: number, ke: number) => [number, number]): Obj[] => {
  const hitung = [0, 0, 0];
  return KOSTUM.map((o, i) => {
    const [x, y] = letak(i, o.baris, hitung[o.baris]);
    hitung[o.baris] += 1;
    return emo(`i${i}`, x, y, o.e, 16, { z: 3 });
  });
};
const KOSTUM_CAMPUR = kostumDi((i) => [100 + i * 25, 44]);
const KOSTUM_RAPI = kostumDi((_i, baris, ke) => [110 + ke * 25, BARIS_KOSTUM[baris]]);

export const ADEGAN_LUAR_ALAS: AdeganStory = {
  id: "luar-alas",
  judul: "Sorting Mat: Alas Pilah",
  sumber: "Metode global: Sorting Mat (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Cara 1: Sorting Mat")),
      tambah("Sorting", ...alasPilah("al", 30, 50, 240, 30, 3)),
      tambah("Alas", teks("nm", 150, 162, "Alas Pilah", 13, W.ungu)),
    ),
    k(
      SUARA_C2,
      hapus(0, "nm"),
      tambah("satu", teks("n1", 150, 40, "1 baris = 1 jenis", 10, W.ungu), kotak("hb", 32, 51, 236, 28, undefined, W.merah, { rx: 4, tebal: 2.4, z: 5 })),
      tambah("nama", teks("b0", 66, 69, "Topi", 8.4, W.ungu), teks("b1", 66, 99, "Selendang", 8.4, W.ungu), teks("b2", 66, 129, "Sepatu", 8.4, W.ungu)),
      tambah("kiri.", teks("kr", 66, 160, "ujung kiri", 9, W.merah)),
    ),
    k(
      SUARA_C3,
      hapus(0, "n1", "hb"),
      tambah("benda", ...KOSTUM_CAMPUR),
      ubah("jenisnya.", ...pindah(KOSTUM_RAPI)),
      tambah("Satu", teks("s1", 215, 160, "1 benda = 1 baris", 10, W.merah)),
      tambah("baris.@2", emo("ok", 250, 100, E.benar, 22)),
    ),
    k(
      SUARA_C4,
      sorotkan("terpilah,", ...ID_KOSTUM),
      tambah("hitung", teks("h0", 240, 75, "3", 12, W.merah), teks("h1", 240, 105, "2", 12, W.merah), teks("h2", 240, 135, "2", 12, W.merah)),
      tambah("tanpa", emo("tk", 150, 160, E.senyum, 20)),
    ),
  ],
};

/* ------------------------------ Sorting Mat: terapan ------------------------------ */
const SUARA_T1 = "Chacha memilah perlengkapan di alas: topi enam, selendang tiga, dan sepatu lima.";
const SUARA_T2 = "Tiap baris dihitung satu per satu, lalu bilangannya ditulis di ujung kanan.";
const SUARA_T3 = "Cocok kalau bendanya campur aduk dan harus dipilah dulu.";
const SUARA_T4 = "Kurang cocok kalau bendanya sudah rapi per jenis, karena memilah lagi jadi sia-sia.";

const BARIS_T = [59, 89, 119] as const;
const deret = (id: string, e: string, n: number, y: number): Obj[] => Array.from({ length: n }, (_, i) => emo(`${id}${i}`, 100 + i * 18, y + 5, e, 14, { z: 3 }));

export const ADEGAN_LUAR_ALAS_TERAPAN: AdeganStory = {
  id: "luar-alas-terapan",
  judul: "Sorting Mat: alas perlengkapan Chacha",
  sumber: "Metode global: Sorting Mat (terapan)",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Alas Perlengkapan"), ...alasPilah("al", 40, 44, 220, 30, 3), ...tokoh("ch", 36, 184, "Chacha")),
      tambah("topi", teks("b0", 66, 62, "Topi", 8.4, W.ungu), ...deret("tp", E.topiPanggung, 6, BARIS_T[0])),
      tambah("enam,", teks("n6", 246, 63, "6", 12, W.merah)),
      tambah("selendang", teks("b1", 66, 92, "Selendang", 8.4, W.ungu), ...deret("sl", E.selendang, 3, BARIS_T[1])),
      tambah("tiga,", teks("n3", 246, 93, "3", 12, W.merah)),
      tambah("sepatu", teks("b2", 66, 122, "Sepatu", 8.4, W.ungu), ...deret("sp", E.sepatu, 5, BARIS_T[2])),
      tambah("lima.", teks("n5", 246, 123, "5", 12, W.merah)),
    ),
    k(
      SUARA_T2,
      tambah("dihitung", ...[1, 2, 3, 4, 5, 6].map((i) => teks(`c${i}`, 100 + (i - 1) * 18, 41, String(i), 8, W.merah))),
      sorotkan("ditulis", "n6", "n3", "n5"),
      tambah("ujung", panah("pa", 200, 59, 30, 0, W.merah, 2), panah("pb", 156, 89, 74, 0, W.merah, 2), panah("pc", 182, 119, 48, 0, W.merah, 2)),
      tambah("kanan.", emo("ok", 280, 90, E.benar, 20)),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Kapan Cocok?"), ...lantai("lt", 150)),
      tambah("Cocok", emo("ok", 262, 56, E.benar, 28)),
      tambah("bendanya", ...kartu("cc", 50, 34, 200, 24, W.hijauMuda, ["benda campur aduk"], 9)),
      tambah(
        "campur",
        ...[E.topiPanggung, E.selendang, E.sepatu, E.sepatu, E.topiPanggung, E.selendang, E.topiPanggung, E.sepatu, E.selendang].map((e, i) => emo(`cm${i}`, 70 + ((i * 47) % 150), 96 + ((i * 29) % 44), e, 18, { z: 3 })),
      ),
      tambah("dipilah", teks("dp", 150, 168, "dipilah dulu", 11, W.hijau)),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?"), ...lantai("lt", 150)),
      tambah("Kurang", emo("xs", 262, 56, E.salah, 28)),
      tambah("rapi", ...deret("rt", E.topiPanggung, 4, 74), ...deret("rs", E.selendang, 4, 100), ...deret("rp", E.sepatu, 4, 126)),
      tambah("memilah", teks("ml", 150, 54, "memilah lagi", 11, W.merah)),
      tambah("sia-sia.", teks("sa", 150, 168, "sia-sia", 12, W.merah), emo("pz", 232, 160, E.pusing, 20)),
    ),
  ],
};

