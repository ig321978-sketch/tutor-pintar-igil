import type { AdeganStory } from "./logika-story";
import { BAHAN, W, balokIso, emo, kotak, panah, susunKubus, teks } from "./k6b3a-gambar";
import { bersih, k, redamkan, sorotkan, tambah } from "./k6b3a-bantu";

const P = (ox: number, oy: number, s = 20) => ({ s, ox, oy });
type Sel = [number, number, number][];

/* ------------------------------ 6. Latihan 3.1 nomor 1 sampai 4 (hlm. 83 dan 84; kunci Buku Panduan Guru hlm. 95) ------------------------------ */
const BAWAH6: Sel = [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0], [0, 2, 0], [1, 2, 0]];
const ATAS2: Sel = [[0, 0, 1], [1, 0, 1]];
const LIMA: Sel = [[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1], [0, 1, 1]];
const warnaLima = (n: number) => [BAHAN.ungu, BAHAN.kuning, BAHAN.hijau, BAHAN.merah, BAHAN.biru][n];

export const ADEGAN_LATIHAN31: AdeganStory = {
  id: "latihan-31",
  judul: "Latihan 3.1: menyusun dan menghitung",
  sumber: "Buku Siswa hlm. 83–84; Buku Panduan Guru hlm. 95",
  latar: "#FFFBEB",
  kutipan: ["Susunlah kubus untuk membentuk bangun berikut", "Berapa balok yang dibutuhkan untuk menyusun bangun ruang berikut", "Berapa kardus yang ada pada tumpukan tersebut", "Berapa kubus yang diperlukan"],
  ketukan: [
    k(
      "Latihan 3.1 nomor 1: susunlah kubus nyata untuk membentuk bangun-bangun yang tampak di buku. Mulailah dari yang paling kecil, lalu tambah satu kubus demi satu kubus.",
      tambah(0, teks("jud", 150, 22, "Latihan 3.1, nomor 1", 12, W.ungu)),
      tambah("kubus", susunKubus("a", P(50, 96), [[0, 0, 0]], BAHAN.oranye).objs, teks("ta", 50, 140, "1 kubus", 8.6)),
      tambah("kecil,", susunKubus("b", P(130, 96), [[0, 0, 0], [1, 0, 0]], BAHAN.oranye).objs, teks("tb", 140, 140, "2 kubus", 8.6)),
      tambah("tambah", panah("pa", 74, 84, 22, 0, W.hijau, 2.4, { gambar: true })),
      tambah("satu@2", susunKubus("c", P(226, 96), [[0, 0, 0], [1, 0, 0], [0, 1, 0]], BAHAN.oranye).objs, teks("tc", 232, 150, "3 kubus", 8.6)),
      tambah("kubus@3", teks("bk", 150, 190, "susun dengan kubus yang sesungguhnya", 9.6, W.hijau)),
    ),
    k(
      "Nomor 2: berapa balok yang dibutuhkan untuk menyusun bangun ruang? Gambar a tersusun dari 3 balok yang ditumpuk, dan gambar b juga 3 balok. Jadi jawabannya 3 dan 3.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Latihan 3.1, nomor 2", 12, W.ungu)),
      tambah("gambar", ...[0, 1, 2].flatMap((h) => balokIso(`s${h}`, P(76, 150, 17), 0, 0, h, 2, 1, 1, [BAHAN.biru, BAHAN.hijau, BAHAN.oranye][h])), teks("la", 76, 190, "a", 12, W.ungu)),
      sorotkan("3", ...["s0-a", "s1-a", "s2-a"]),
      tambah("juga", ...balokIso("t0", P(196, 140, 17), 0, 0, 0, 2, 1, 1, BAHAN.biru), ...balokIso("t1", P(196, 140, 17), 0, 1, 0, 2, 1, 1, BAHAN.hijau), ...balokIso("t2", P(196, 140, 17), 0, 0, 1, 2, 1, 1, BAHAN.oranye), teks("lb", 218, 190, "b", 12, W.ungu)),
      tambah("jawabannya", teks("jw", 150, 46, "3 balok dan 3 balok", 12, W.merah)),
    ),
    k(
      "Nomor 3: tumpukan kardus berbentuk kubus. Berapa kardus seluruhnya? Lapisan bawah ada 6 kubus, lapisan atas ada 2 kubus, jadi jumlahnya 8 kardus.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Latihan 3.1, nomor 3", 12, W.ungu)),
      tambah("tumpukan", ...susunKubus("b", P(110, 110, 22), BAWAH6, BAHAN.oranye).objs),
      tambah("Lapisan", ...susunKubus("t", P(110, 110, 22), ATAS2, BAHAN.kuning).objs),
      sorotkan("bawah", ...susunKubus("b", P(110, 110, 22), BAWAH6, BAHAN.oranye).semua),
      tambah("6", teks("n6", 240, 100, "bawah: 6", 11, W.merah)),
      redamkan("atas", ...susunKubus("b", P(110, 110, 22), BAWAH6, BAHAN.oranye).semua),
      tambah("2", teks("n2", 240, 124, "atas: 2", 11, W.merah)),
      tambah("8", teks("n8", 240, 156, "total: 8", 14, W.biru, { garis: W.emas })),
    ),
    k(
      "Nomor 4: tentukan cara menyusun kubus berwarna untuk membentuk bangun di buku. Berapa kubus yang diperlukan? Kita hitung satu per satu, hasilnya 5 kubus.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Latihan 3.1, nomor 4", 12, W.ungu)),
      tambah("kubus", ...susunKubus("m", P(150, 112, 26), LIMA, (n) => warnaLima(n)).objs),
      tambah("hitung", teks("hh", 150, 44, "hitung: 1, 2, 3, 4, 5", 11, W.merah)),
      tambah("hasilnya", teks("hs", 150, 192, "hasilnya 5 kubus", 15, W.biru, { garis: W.emas })),
    ),
  ],
};

/* ------------------------------ 7. Soal tantangan Pak Hasan dan refleksi (hlm. 84 dan 85; kunci Buku Panduan Guru hlm. 95) ------------------------------ */
export const ADEGAN_PAK_HASAN: AdeganStory = {
  id: "pak-hasan",
  judul: "Soal tantangan: kardus Pak Hasan",
  sumber: "Buku Siswa hlm. 84–85; Buku Panduan Guru hlm. 95",
  latar: "#F0F9FF",
  kutipan: ["Pak Hasan adalah pemilik toko sembako", "Pak Hasan perlu meminimalkan luas lantai yang digunakan", "Apakah saya dapat mengonstruksi bangun ruang dari beberapa kubus", "Apakah saya dapat mengurai bangun ruang menjadi beberapa kubus"],
  ketukan: [
    k(
      "Latihan 3.1 nomor 5: Pak Hasan punya 30 kardus berukuran 20 sentimeter, 30 sentimeter, dan 50 sentimeter. Gudangnya 3 meter kali 3 meter, dengan tinggi 3,1 meter.",
      tambah(0, teks("jud", 150, 22, "Latihan 3.1, nomor 5", 12, W.ungu)),
      tambah("Pak", emo("pak", 40, 70, "👨", 34), teks("pk", 40, 90, "Pak Hasan", 8)),
      tambah("30", teks("n30", 40, 120, "30 kardus", 10, W.merah)),
      tambah("berukuran", ...balokIso("kd", P(142, 114, 8), 0, 0, 0, 2, 3, 5, BAHAN.oranye), teks("d1", 110, 150, "20 cm", 8.4), teks("d2", 176, 150, "30 cm", 8.4), teks("d3", 202, 90, "50 cm", 8.4, W.merah)),
      tambah("Gudangnya", kotak("gd", 214, 70, 74, 60, "#E0F2FE", W.biru, { rx: 3, putus: true }), teks("g1", 251, 94, "gudang", 8.4), teks("g2", 251, 108, "3 m kali 3 m", 7.4), teks("g3", 251, 122, "tinggi 3,1 m", 7.4, W.merah)),
    ),
    k(
      "Pak Hasan ingin lantai tetap lega, jadi luas lantai yang terpakai harus sekecil mungkin. Karena itu kardus ditumpuk tinggi, dengan rusuk terpanjang, yaitu 50 sentimeter, sebagai sisi tegak.",
      bersih(0),
      tambah("lega,", kotak("lt", 30, 150, 240, 30, "#E5E7EB", W.hitam, { rx: 3 }), teks("ltt", 150, 170, "lantai gudang", 9)),
      tambah("sekecil", kotak("kl", 126, 150, 48, 30, "#FDE68A", W.merah, { rx: 2, tebal: 2 }), teks("klt", 150, 193, "alas sekecil mungkin", 9, W.merah)),
      tambah("ditumpuk", ...balokIso("kd", P(150, 140, 8), 0, 0, 0, 2, 3, 5, BAHAN.oranye)),
      tambah("rusuk", panah("ph", 196, 148, 0, -42, W.merah, 3, { gambar: true }), teks("hp", 222, 130, "50 cm", 10, W.merah)),
      tambah("tegak.", teks("tg", 150, 46, "rusuk terpanjang jadi tinggi", 10.4, W.hijau)),
    ),
    k(
      "Tinggi gudang 3,1 meter sama dengan 310 sentimeter. Karena tiap kardus tegak setinggi 50 sentimeter, muat 6 kardus pada setiap tumpukan, sebab 6 kali 50 sama dengan 300.",
      bersih(0),
      tambah("Tinggi", kotak("gd", 70, 30, 60, 156, "#E0F2FE", W.biru, { rx: 3, putus: true }), teks("tgd", 100, 20, "tinggi 3,1 m = 310 cm", 8.6)),
      tambah("muat", ...[0, 1, 2, 3, 4, 5].map((i) => kotak(`kk${i}`, 82, 162 - i * 24, 36, 24, "#FDBA74", W.coklat, { rx: 1, tebal: 1.2 }))),
      tambah("setiap", teks("sc", 190, 92, "tiap kardus 50 cm", 10)),
      tambah("sebab", teks("hh", 190, 122, "6 kali 50 = 300 cm", 11, W.merah)),
      tambah("300.", teks("ok", 190, 150, "300 ≤ 310: muat", 10, W.hijau)),
    ),
    k(
      "Jumlah kardus ada 30. Karena tiap tumpukan berisi 6 kardus, kita perlu 30 dibagi 6, yaitu 5 tumpukan.",
      bersih(0),
      tambah("Jumlah", teks("a1", 150, 26, "30 kardus", 13, W.biru)),
      tambah("berisi", ...[0, 1, 2, 3, 4, 5].map((i) => kotak(`s0-${i}`, 30, 160 - i * 14, 40, 14, "#FDBA74", W.coklat, { rx: 1, tebal: 1 }))),
      tambah("tumpukan@2", ...[1, 2, 3, 4].flatMap((t) => [0, 1, 2, 3, 4, 5].map((i) => kotak(`s${t}-${i}`, 30 + t * 50, 160 - i * 14, 40, 14, "#FDBA74", W.coklat, { rx: 1, tebal: 1 })))),
      tambah("6", teks("a2", 150, 46, "tiap tumpukan: 6 kardus", 10, W.merah)),
      tambah("yaitu", teks("a3", 150, 188, "30 : 6 = 5 tumpukan", 14, W.hijau, { garis: W.emas })),
    ),
    k(
      "Alas setiap tumpukan berukuran 20 kali 30 sentimeter, yaitu 600 sentimeter persegi. Untuk 5 tumpukan, luasnya 3.000 sentimeter persegi, atau 0,3 meter persegi.",
      bersih(0),
      tambah("Alas", kotak("al", 100, 38, 100, 60, "#FDE68A", W.coklat, { rx: 2 }), teks("a1", 150, 66, "20 cm kali 30 cm", 9), teks("a2", 150, 82, "600 cm²", 12, W.merah)),
      ...[0, 1, 2, 3, 4].map((i) => tambah("tumpukan", kotak(`ft${i}`, 24 + i * 52, 122, 46, 30, "#FDE68A", W.coklat, { rx: 2 }))),
      tambah("luasnya", teks("a3", 150, 172, "5 x 600 = 3.000 cm²", 13, W.merah)),
      tambah("meter", teks("a4", 150, 194, "3.000 cm² = 0,3 m²", 12, W.hijau, { garis: W.emas })),
    ),
    k(
      "Refleksi subbab A: apakah aku dapat mengonstruksi bangun ruang dari beberapa kubus, dan apakah aku dapat menguraikan bangun ruang menjadi beberapa kubus?",
      bersih(0),
      tambah("Refleksi", teks("jud", 150, 24, "Ayo berefleksi", 13, W.ungu)),
      tambah("mengonstruksi", ...susunKubus("a", P(70, 120, 18), [[0, 0, 0], [1, 0, 0], [0, 0, 1]], BAHAN.biru).objs, teks("t1", 70, 160, "kubus-kubus", 9), panah("p1", 116, 112, 44, 0, W.hijau, 3, { gambar: true })),
      tambah("bangun", ...susunKubus("b", P(220, 120, 18), [[0, 0, 0], [1, 0, 0], [0, 0, 1]], BAHAN.merah).objs, teks("t2", 220, 160, "bangun ruang", 9)),
      tambah("menguraikan", panah("p2", 160, 128, -44, 0, W.merah, 3, { gambar: true }), teks("t3", 150, 190, "susun dan urai, dua arah", 10, W.ungu)),
    ),
  ],
};
