import type { AdeganStory } from "./logika-story";
import { E, W, deretEmo, emo, garis, judul, kartu, kotak, orang, pan, tabelPS, teks } from "./k1b6C-gambar";
import { hapus, idx, k, sorotkan, tambah, ubah } from "./k1b6C-bantu";

/*
 * Cerita orisinal IGIL "Tutup Pasar Malam" (Kelas 1 Bab 6 Sub-Bab C). Bagian ini: balon lepas di lapak balon (satuan dikurangi, puluhan tetap),
 * memeriksa hasil dengan menambah, dan memilih cara.
 */

/* ------------------------------ 4. Balon lepas ------------------------------ */
const SUARA_B1 = "Di lapak balon, delapan belas balon diikat di tiang. Tiba-tiba empat balon lepas dan terbang ke langit malam.";
const SUARA_B2 = "Satuannya dikurangi: delapan dikurangi empat sama dengan empat. Puluhannya tetap satu.";
const SUARA_B3 = "Sisa empat belas balon. Pak RT berseru, balonnya ikut pulang sendiri!";
const LEPAS = [14, 15, 16, 17];

export const ADEGAN_BALON: AdeganStory = {
  id: "balon",
  judul: "Balon lepas ke langit malam",
  sumber: "Materi: satuan dikurangi, puluhan tetap",
  latar: "#E0E7FF",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Lapak balon")),
      tambah(idx(SUARA_B1, "belas"), ...deretEmo(E.balon, "bl", 18, 30, 74, 20, 22, 6, 16), ...kartu("b18", 160, 90, 110, 20, W.langit, ["18 balon"], 10)),
      tambah(idx(SUARA_B1, "tiang"), garis("tg", 80, 60, 0, 120, W.coklat, 4, { z: -1 })),
      tambah(idx(SUARA_B1, "empat"), ...kartu("b4", 160, 118, 110, 20, W.merahMuda, ["4 lepas"], 10)),
      ubah(idx(SUARA_B1, "lepas"), ...LEPAS.map((i, j) => ({ id: `bl${i}`, x: 190 + j * 20, y: 54 }))),
      ubah(idx(SUARA_B1, "terbang"), ...LEPAS.map((i, j) => ({ id: `bl${i}`, x: 190 + j * 20, y: 36 }))),
      tambah(idx(SUARA_B1, "langit"), emo("s0", 180, 28, E.bintang, 12), emo("s1", 270, 40, E.bintang, 12), emo("s2", 232, 22, E.bintang, 12)),
    ),
    k(
      SUARA_B2,
      hapus(0, "b18-k", "b18-t0", "b4-k", "b4-t0"),
      tambah(0, ...tabelPS("tb", 160, 84, "1", "8")),
      tambah(idx(SUARA_B2, "delapan"), ...kartu("sk", 160, 62, 120, 20, W.krem, ["8 – 4 = 4"], 11)),
      ubah(idx(SUARA_B2, "sama"), { id: "tb-s", isi: "4" }),
      sorotkan(idx(SUARA_B2, "Puluhannya"), "tb-kp"),
    ),
    k(
      SUARA_B3,
      hapus(0, "sk-k", "sk-t0"),
      sorotkan(idx(SUARA_B3, "Sisa"), "tb-ks"),
      tambah(idx(SUARA_B3, "belas"), ...kartu("hs", 160, 140, 120, 20, W.hijauMuda, ["18 – 4 = 14"], 11)),
      tambah(idx(SUARA_B3, "Pak"), ...orang("pr", 262, 172, E.pakRT, "Pak RT")),
      tambah(idx(SUARA_B3, "balonnya"), ...kartu("bc", 20, 150, 130, 20, W.krem, ["Ikut pulang sendiri!"], 9)),
    ),
  ],
};

/* ------------------------------ 5. Periksa dengan menambah ------------------------------ */
const SUARA_C1 = "Mamah minta hasilnya diperiksa dengan menambah. Tiga belas ditambah tiga sama dengan enam belas.";
const SUARA_C2 = "Cocok dengan jumlah semula. Empat belas ditambah empat sama dengan delapan belas, juga cocok.";
const SUARA_C3 = "Kalau hasil pengurangan ditambah yang diambil kembali ke jumlah semula, hitungannya benar.";

export const ADEGAN_PERIKSA: AdeganStory = {
  id: "periksa",
  judul: "Periksa hasil dengan menambah",
  sumber: "Materi: periksa dengan menambah",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Periksa dengan menambah")),
      tambah(idx(SUARA_C1, "Mamah"), ...orang("mm", 262, 172, E.mamah, "Mamah")),
      tambah(idx(SUARA_C1, "hasilnya"), ...kartu("p1", 14, 44, 134, 24, W.krem, ["16 – 3 = 13"], 11)),
      tambah(idx(SUARA_C1, "diperiksa"), pan("pa", 81, 70, 0, 20)),
      tambah(idx(SUARA_C1, "Tiga"), ...kartu("p2", 14, 92, 134, 24, W.hijauMuda, ["13 + 3 = 16"], 11)),
      tambah(idx(SUARA_C1, "enam"), emo("c1", 132, 104, E.benar, 18)),
    ),
    k(
      SUARA_C2,
      sorotkan(idx(SUARA_C2, "Cocok"), "p2-k"),
      tambah(idx(SUARA_C2, "Empat"), ...kartu("p3", 152, 44, 134, 24, W.krem, ["18 – 4 = 14"], 11), pan("pb", 219, 70, 0, 20)),
      tambah(idx(SUARA_C2, "ditambah"), ...kartu("p4", 152, 92, 134, 24, W.hijauMuda, ["14 + 4 = 18"], 11)),
      tambah(idx(SUARA_C2, "juga"), emo("c2", 270, 104, E.benar, 18)),
    ),
    k(
      SUARA_C3,
      tambah(idx(SUARA_C3, "Kalau"), ...kartu("rg", 14, 136, 220, 22, W.emas, ["hasil + diambil = semula"], 10)),
      tambah(idx(SUARA_C3, "benar"), emo("jp", 262, 136, E.jempol, 26)),
    ),
  ],
};

/* ------------------------------ 6. Pilih cara ------------------------------ */
const SUARA_D1 = "Mamah bertanya lagi. Untuk tujuh belas dikurangi lima, kamu pilih cara apa dan kenapa?";
const SUARA_D2 = "Kata Kaka, belasan dikurangi satuan, kurangi satuannya saja. Tujuh dikurangi lima sama dengan dua, jadi dua belas.";
const SUARA_D3 = "Kata Abang, lima kecil, mundur saja juga bisa. Alasannya jelas, hasilnya sama.";
const MINI = [12, 13, 14, 15, 16, 17];
const xMini = (n: number): number => 170 + (n - 12) * 20;

export const ADEGAN_PILIH: AdeganStory = {
  id: "pilih-cara",
  judul: "Pilih cara yang mana",
  sumber: "Materi: pilih cara dan alasan",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Pilih cara yang mana?")),
      tambah(idx(SUARA_D1, "Mamah"), ...orang("mm", 150, 178, E.mamah, "Mamah")),
      tambah(idx(SUARA_D1, "tujuh"), ...kartu("kt", 80, 34, 140, 24, W.krem, ["17 – 5 = ?"], 12)),
      tambah(idx(SUARA_D1, "pilih"), kotak("c1", 14, 76, 132, 70, W.langit, W.biru, { rx: 8, tebal: 1.6 }), kotak("c2", 154, 76, 132, 70, W.pink, W.biru, { rx: 8, tebal: 1.6 }), teks("c1t", 80, 90, "cara 1", 9.4), teks("c2t", 220, 90, "cara 2", 9.4)),
      tambah(idx(SUARA_D1, "kenapa"), teks("tn", 150, 160, "kenapa?", 11, W.merah)),
    ),
    k(
      SUARA_D2,
      hapus(0, "tn"),
      tambah(idx(SUARA_D2, "Kaka"), ...orang("kk", 262, 178, E.kaka, "Kaka")),
      ubah(idx(SUARA_D2, "belasan"), { id: "c1t", isi: "cara 1: satuan" }),
      tambah(idx(SUARA_D2, "Tujuh"), ...tabelPS("tb", 24, 98, "1", "7")),
      tambah(idx(SUARA_D2, "lima"), teks("ks", 80, 164, "7 – 5 = 2", 12)),
      ubah(idx(SUARA_D2, "dua", 1), { id: "tb-s", isi: "2" }),
      tambah(idx(SUARA_D2, "belas"), teks("r1", 80, 184, "hasil 12", 11, W.hijau)),
    ),
    k(
      SUARA_D3,
      hapus(0, "ks", "r1"),
      tambah(idx(SUARA_D3, "Abang"), ...orang("ab", 40, 178, E.abang, "Abang")),
      ubah(idx(SUARA_D3, "mundur"), { id: "c2t", isi: "cara 2: mundur" }),
      tambah(
        idx(SUARA_D3, "mundur"),
        garis("mg", 164, 126, 112, 0, W.biru, 2),
        ...MINI.flatMap((n) => [garis(`mg-g${n}`, xMini(n), 122, 0, 8, W.biru, 1.4), teks(`mg-a${n}`, xMini(n), 141, String(n), 8)]),
        pan("ma", 270, 112, -100, 0),
      ),
      tambah(idx(SUARA_D3, "hasilnya"), ...kartu("hl", 90, 148, 120, 20, W.hijauMuda, ["17 – 5 = 12"], 11)),
    ),
  ],
};
