import type { AdeganStory, Obj } from "./logika-story";
import { EMO, W, bendaDi, emo, judul, kartu, kotak, namaG, jumlahG, pasang, pusatBenda, teks, titikBaris, titikPetak } from "./k2b2C-gambar";
import { bersih, hapus, hitungAksi, idx, k, redamkan, sorotkan, tambah, ubah } from "./k2b2C-bantu";

const ex = (isi: string, id = "ex", x = 150, y = 132, u = 16): Obj => teks(id, x, y, isi, u, W.merah);

/* ------------------------------ 1. Burung hijau dan burung merah ------------------------------ */
export const X_BURUNG = 70;
export const DX_BURUNG = 30;
export const Y_BURUNG_A = 76;
export const Y_BURUNG_B = 132;
const ptsHijau = titikBaris(4, X_BURUNG, Y_BURUNG_A, DX_BURUNG);
const ptsMerah = titikBaris(5, X_BURUNG, Y_BURUNG_B, DX_BURUNG);
const SUARA_B1 = "Ada burung hijau dan burung merah di dahan. Ayo kita lihat mereka.";
const SUARA_B2 = "Burung hijau ada empat ekor. Burung merah ada lima ekor.";
const SUARA_B3 = "Sekarang kita pasangkan burungnya satu-satu. Hijau pertama dengan merah pertama, dan seterusnya sampai habis.";
const SUARA_B4 = "Ada satu burung merah yang tidak punya pasangan.";
const SUARA_B5 = "Jadi burung hijau satu kurangnya dari burung merah. Burung merah satu lebihnya dari burung hijau.";

export const ADEGAN_BURUNG: AdeganStory = {
  id: "burung-dahan",
  judul: "Burung hijau dan burung merah di dahan",
  sumber: "Materi: lebihnya dan kurangnya",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Burung di dahan")),
      tambah(idx(SUARA_B1, "hijau"), kotak("sa", 8, 46, 284, 40, W.hijauMuda, W.hijau, { rx: 8 }), namaG("a", 14, 70, "Hijau")),
      tambah(idx(SUARA_B1, "merah"), kotak("sb", 8, 102, 284, 40, W.merahMuda, W.merah, { rx: 8 }), namaG("b", 14, 126, "Merah")),
    ),
    k(SUARA_B2, tambah(idx(SUARA_B2, "empat"), ...bendaDi("a", EMO.burung, ptsHijau, 20), jumlahG("a", 262, 72, "4")), tambah(idx(SUARA_B2, "lima"), ...bendaDi("b", EMO.burung, ptsMerah, 20), jumlahG("b", 262, 128, "5"))),
    k(
      SUARA_B3,
      tambah(idx(SUARA_B3, "pasangkan"), pasang(0, X_BURUNG, Y_BURUNG_A + 4, Y_BURUNG_B - 18)),
      tambah(idx(SUARA_B3, "burungnya"), pasang(1, X_BURUNG + DX_BURUNG, Y_BURUNG_A + 4, Y_BURUNG_B - 18)),
      tambah(idx(SUARA_B3, "satu-satu"), pasang(2, X_BURUNG + 2 * DX_BURUNG, Y_BURUNG_A + 4, Y_BURUNG_B - 18)),
      tambah(idx(SUARA_B3, "seterusnya"), pasang(3, X_BURUNG + 3 * DX_BURUNG, Y_BURUNG_A + 4, Y_BURUNG_B - 18)),
    ),
    k(SUARA_B4, sorotkan(idx(SUARA_B4, "tidak"), "eb4")),
    k(SUARA_B5, redamkan(0, "eb4"), tambah(idx(SUARA_B5, "kurangnya"), ...kartu("kk", 20, 152, 260, 20, W.hijauMuda, ["burung hijau 1 kurangnya"], 9.4)), tambah(idx(SUARA_B5, "lebihnya"), ...kartu("kl", 20, 176, 260, 20, W.merahMuda, ["burung merah 1 lebihnya"], 9.4))),
  ],
};

/* ------------------------------ 2. Empat kata kunci ------------------------------ */
const POS_KUNCI = [
  { id: "kj", x: 14, y: 34, warna: W.hijauMuda, isi: "lebihnya" },
  { id: "kk", x: 156, y: 34, warna: W.pink, isi: "kurangnya" },
  { id: "ks", x: 14, y: 76, warna: W.langit, isi: "selisih" },
  { id: "kt", x: 156, y: 76, warna: W.krem, isi: "jumlah" },
];
const kunci = (i: number): Obj[] => kartu(POS_KUNCI[i].id, POS_KUNCI[i].x, POS_KUNCI[i].y, 130, 34, POS_KUNCI[i].warna, [POS_KUNCI[i].isi], 11);
const SUARA_K1 = "Soal cerita punya kata kunci. Kata kunci membantu kita memilih tambah atau kurang.";
const SUARA_K2 = "Ada empat kata kunci: lebihnya, kurangnya, selisih, dan jumlah.";
const SUARA_K3 = "Kata jumlah berarti semua digabung. Burung hijau empat, burung merah lima. Empat ditambah lima sama dengan sembilan, jadi kita tambah.";
const SUARA_K4 = "Kata selisih berarti beda banyaknya. Lima dikurangi empat sama dengan satu. Jadi kita kurangi.";
const SUARA_K5 = "Kata lebihnya dan kurangnya perlu dibaca pelan-pelan. Kita lihat dulu siapa yang dicari.";

export const ADEGAN_KATA_KUNCI: AdeganStory = {
  id: "kata-kunci",
  judul: "Empat kata kunci soal cerita",
  sumber: "Materi: kata kunci soal cerita",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Kata kunci"), emo("kc", 150, 100, "\u{1F50E}", 44)),
      tambah(idx(SUARA_K1, "tambah"), ...kartu("tb", 30, 134, 110, 34, W.hijauMuda, ["tambah (+)"], 12)),
      tambah(idx(SUARA_K1, "kurang"), ...kartu("kr", 160, 134, 110, 34, W.pink, ["kurang (−)"], 12)),
    ),
    k(SUARA_K2, bersih(0), tambah(0, judul("Empat kata kunci")), tambah(idx(SUARA_K2, "lebihnya"), ...kunci(0)), tambah(idx(SUARA_K2, "kurangnya"), ...kunci(1)), tambah(idx(SUARA_K2, "selisih"), ...kunci(2)), tambah(idx(SUARA_K2, "jumlah"), ...kunci(3))),
    k(SUARA_K3, sorotkan(idx(SUARA_K3, "jumlah"), "kt-k"), tambah(idx(SUARA_K3, "sembilan"), ex("4 + 5 = 9")), tambah(idx(SUARA_K3, "jadi"), ...kartu("tb", 90, 152, 120, 30, W.hijauMuda, ["tambah (+)"], 12))),
    k(SUARA_K4, redamkan(0, "kt-k"), sorotkan(idx(SUARA_K4, "selisih"), "ks-k"), ubah(idx(SUARA_K4, "Lima"), { id: "ex", isi: "5 − 4 = 1" }), hapus(idx(SUARA_K4, "Jadi"), "tb-k", "tb-t0"), tambah(idx(SUARA_K4, "Jadi"), ...kartu("kr", 90, 152, 120, 30, W.pink, ["kurang (−)"], 12))),
    k(SUARA_K5, redamkan(0, "ks-k"), hapus(0, "ex", "kr-k", "kr-t0"), sorotkan(idx(SUARA_K5, "lebihnya"), "kj-k"), sorotkan(idx(SUARA_K5, "kurangnya"), "kk-k"), tambah(idx(SUARA_K5, "siapa"), ...kartu("sd", 40, 140, 220, 32, W.krem, ["siapa yang dicari?"], 12))),
  ],
};

/* ------------------------------ 3. Donat Kira ------------------------------ */
export const ptsDonatKira = titikPetak(12, 6, 70, 70, 26, 34);
const SUARA_D1 = "Kira punya donat di atas piring. Kita hitung: satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh, sebelas, dua belas.";
const SUARA_D2 = "Jadi donat Kira ada dua belas buah.";
const SUARA_D3 = "Malosi punya lima donat kurangnya dari donat Kira.";
const SUARA_D4 = "Pertanyaan pertama, berapa donat milik Malosi? Pertanyaan kedua, berapa jumlah donat mereka berdua?";

export const ADEGAN_DONAT_KIRA: AdeganStory = {
  id: "donat-kira",
  judul: "Donat Kira dan donat Malosi",
  sumber: "Materi: contoh soal cerita donat",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Donat di atas piring")),
      tambah(idx(SUARA_D1, "Kira"), namaG("a", 8, 90, "Kira")),
      tambah(idx(SUARA_D1, "piring"), ...bendaDi("a", EMO.donat, ptsDonatKira)),
      ...hitungAksi(SUARA_D1, "ea", pusatBenda(ptsDonatKira), { setelah: "hitung" }),
    ),
    k(SUARA_D2, tambah(idx(SUARA_D2, "dua"), jumlahG("a", 262, 90, "12"))),
    k(SUARA_D3, tambah(idx(SUARA_D3, "Malosi"), ...kartu("mk", 20, 122, 260, 26, W.krem, ["Malosi: 5 kurangnya dari Kira"], 10))),
    k(
      SUARA_D4,
      tambah(idx(SUARA_D4, "pertama"), ...kartu("qa", 14, 160, 134, 30, W.hijauMuda, ["a. donat Malosi?"], 10)),
      tambah(idx(SUARA_D4, "kedua"), ...kartu("qb", 152, 160, 134, 30, W.langit, ["b. jumlah donat?"], 10)),
    ),
  ],
};

/* ------------------------------ 4. Empat langkah ------------------------------ */
const LANGKAH = ["1. Diketahui", "2. Ditanya", "3. Solusi", "4. Kesimpulan"];
const WARNA_LANGKAH = [W.hijauMuda, W.langit, W.krem, W.pink];
const langkah = (i: number): Obj[] => kartu(`lg${i}`, 10, 34 + i * 40, 120, 32, WARNA_LANGKAH[i], [LANGKAH[i]], 10.4);
const SUARA_L1 = "Soal cerita kita selesaikan dengan empat langkah berurutan.";
const SUARA_L2 = "Langkah pertama, diketahui. Langkah kedua, ditanya. Langkah ketiga, solusi. Langkah keempat, kesimpulan.";
const SUARA_L3 = "Diketahui berarti apa yang sudah kita tahu. Kira punya dua belas donat. Donat Malosi lima kurangnya.";
const SUARA_L4 = "Ditanya berarti apa yang harus dicari. Kita cari donat Malosi, lalu jumlah donat mereka berdua.";
const SUARA_L5 = "Langkah solusi dan kesimpulan kita kerjakan sebentar lagi.";

export const ADEGAN_EMPAT_LANGKAH: AdeganStory = {
  id: "empat-langkah",
  judul: "Empat langkah menyelesaikan soal cerita",
  sumber: "Materi: empat langkah penyelesaian",
  latar: "#F5F3FF",
  ketukan: [
    k(SUARA_L1, tambah(0, judul("Empat langkah"), emo("nt", 150, 110, "\u{1F4DD}", 46))),
    k(
      SUARA_L2,
      hapus(0, "nt"),
      tambah(idx(SUARA_L2, "diketahui"), ...langkah(0)),
      tambah(idx(SUARA_L2, "ditanya"), ...langkah(1)),
      tambah(idx(SUARA_L2, "solusi"), ...langkah(2)),
      tambah(idx(SUARA_L2, "kesimpulan"), ...langkah(3)),
    ),
    k(SUARA_L3, sorotkan(idx(SUARA_L3, "Diketahui"), "lg0-k"), tambah(idx(SUARA_L3, "dua"), ...kartu("fa", 138, 34, 154, 32, W.putih, ["Kira 12, Malosi 5 kurang"], 8.6))),
    k(SUARA_L4, redamkan(0, "lg0-k"), sorotkan(idx(SUARA_L4, "Ditanya"), "lg1-k"), tambah(idx(SUARA_L4, "donat"), ...kartu("fb", 138, 74, 154, 32, W.putih, ["Donat Malosi? Jumlah?"], 8.6))),
    k(SUARA_L5, redamkan(0, "lg1-k"), sorotkan(idx(SUARA_L5, "solusi"), "lg2-k"), sorotkan(idx(SUARA_L5, "kesimpulan"), "lg3-k")),
  ],
};
