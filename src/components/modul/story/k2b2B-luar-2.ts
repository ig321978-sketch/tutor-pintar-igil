import type { AdeganStory } from "./logika-story";
import { OWL, W, batangP, emo, idBatang, jambuKisi, judul, kartu, kotakPenerima, kubusP, labelN, rumus, slotJambu, slotKubus, teks } from "./k2b2B-gambar";
import { hapus, hapusKartu, ids, idx, k, pilihDua, pilihKata, redamkan, sorotkan, tambah, ubah, urutBilangan } from "./k2b2B-bantu";
import { NAMA_METODE_ID, WARNA_METODE, kepala } from "./k2b2B-luar-1";

/* ------------------------------ 4. Mengambil: konsep ------------------------------ */
const SUARA_A1 = "Metode kedua bernama Mengambil. Ambil sebagian dari semua jambu.";
const SUARA_A2 = "Malosi punya lima belas jambu. Ia ingin memberi empat jambu kepada Upe.";
const SUARA_A3 = "Ambil satu, dua, tiga, empat jambu dan pindahkan ke Upe.";
const SUARA_A4 = "Sisa jambu Malosi dihitung: ada sebelas.";
const SUARA_A5 = "Lima belas dikurangi empat sama dengan sebelas. Mengambil berarti kita lihat sisanya.";
const POS_A3 = urutBilangan(SUARA_A3, 1, 4, "Ambil");

export const ADEGAN_LUAR_AMBIL: AdeganStory = {
  id: "luar-ambil",
  judul: "Mengambil: lima belas jambu diberi empat",
  sumber: "Metode luar: Mengambil",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_A1, tambah(0, ...kepala(1)), tambah(idx(SUARA_A1, "semua"), ...jambuKisi("a", 0, 14))),
    k(SUARA_A2, tambah(idx(SUARA_A2, "punya"), labelN("a", 236, 66, "15", 22)), tambah(idx(SUARA_A2, "kepada"), ...kotakPenerima("Upe"), rumus("15 − 4 = ?", 180))),
    k(SUARA_A3, ...Array.from({ length: 4 }, (_, q) => ubah(POS_A3[q], { id: `ja${14 - q}`, x: slotJambu(q).x, y: slotJambu(q).y }))),
    k(SUARA_A4, sorotkan(idx(SUARA_A4, "ada"), ...ids("ja", 0, 10)), ubah(idx(SUARA_A4, "dihitung:"), { id: "n-a", isi: "11" })),
    k(SUARA_A5, redamkan(0, ...ids("ja", 0, 10)), ubah(idx(SUARA_A5, "sama"), { id: "rm", isi: "15 − 4 = 11" }), tambah(idx(SUARA_A5, "sisanya."), emo("ok", 262, 180, "✅", 22))),
  ],
};

/* ------------------------------ 5. Mengambil: terapan ------------------------------ */
const SUARA_B1 = "Coba lagi. Halim punya delapan belas jambu dan memberi enam jambu kepada Kira.";
const SUARA_B2 = "Berapa sisa jambu Halim? Ketuk jawaban yang benar.";
const SUARA_B3 = "Betul! Enam jambu pindah ke Kira, sisanya dua belas.";
const SUARA_B4 = "Delapan belas dikurangi enam sama dengan dua belas.";
const SUARA_B5 = "Kita periksa: dua belas ditambah enam sama dengan delapan belas.";

export const ADEGAN_LUAR_AMBIL_TERAPAN: AdeganStory = {
  id: "luar-ambil-terapan",
  judul: "Mengambil: delapan belas jambu diberi enam",
  sumber: "Metode luar: Mengambil, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_B1, tambah(0, ...kepala(1), ...jambuKisi("a", 0, 17), labelN("a", 236, 66, "18", 22)), tambah(idx(SUARA_B1, "kepada"), ...kotakPenerima("Kira"), rumus("18 − 6 = ?", 198, 15))),
    k(SUARA_B2, tambah(idx(SUARA_B2, "Ketuk"), ...pilihKata(150, ["10", "12", "14"]))),
    k(
      SUARA_B3,
      sorotkan(idx(SUARA_B3, "Betul!"), "c2-k"),
      ...Array.from({ length: 6 }, (_, q) => ubah(idx(SUARA_B3, "pindah"), { id: `ja${17 - q}`, x: slotJambu(q).x, y: slotJambu(q).y })),
      hapusKartu(idx(SUARA_B3, "sisanya"), 3),
      ubah(idx(SUARA_B3, "sisanya"), { id: "n-a", isi: "12" }),
    ),
    k(SUARA_B4, ubah(idx(SUARA_B4, "sama"), { id: "rm", isi: "18 − 6 = 12" })),
    k(SUARA_B5, tambah(idx(SUARA_B5, "ditambah"), teks("m1", 150, 164, "12 + 6 = 18", 12, W.merah)), tambah(idx(SUARA_B5, "delapan"), emo("ok", 262, 198, "✅", 20))),
  ],
};

/* ------------------------------ 6. Meminjam: konsep ------------------------------ */
const SUARA_P1 = "Metode ketiga bernama Meminjam. Meminjam berarti membuka satu puluhan menjadi sepuluh satuan.";
const SUARA_P2 = "Tiga belas adalah satu puluhan dan tiga satuan. Kita ingin memberi lima satuan kepada Upe.";
const SUARA_P3 = "Tiga kurang dari lima, jadi satuannya belum cukup. Kita pinjam satu puluhan dari batang.";
const SUARA_P4 = "Satu batang dibuka menjadi sepuluh kubus. Sekarang ada tiga belas kubus lepas.";
const SUARA_P5 = "Beri lima kubus kepada Upe. Sisanya delapan kubus.";
const SUARA_P6 = "Tiga belas dikurangi lima sama dengan delapan.";

export const ADEGAN_LUAR_PINJAM: AdeganStory = {
  id: "luar-pinjam",
  judul: "Meminjam: tiga belas dikurangi lima",
  sumber: "Metode luar: Meminjam",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_P1, tambah(0, ...kepala(2)), tambah(idx(SUARA_P1, "membuka"), ...batangP("a", 0), ...kubusP("a", 0, 2), labelN("a", 236, 54, "13", 22), ...kartu("bk", 160, 70, 130, 22, W.krem, ["1 puluhan jadi 10 satuan"], 9))),
    k(SUARA_P2, tambah(idx(SUARA_P2, "kepada"), ...kotakPenerima("Upe"), rumus("13 − 5 = ?", 192, 15)), sorotkan(idx(SUARA_P2, "satu"), ...idBatang("a", 0)), redamkan(idx(SUARA_P2, "dan"), ...idBatang("a", 0))),
    k(SUARA_P3, tambah(idx(SUARA_P3, "Tiga"), ...kartu("tc", 60, 152, 180, 22, W.merahMuda, ["3 kurang dari 5"], 10)), sorotkan(idx(SUARA_P3, "pinjam"), ...idBatang("a", 0))),
    k(SUARA_P4, hapus(idx(SUARA_P4, "dibuka"), ...idBatang("a", 0)), tambah(idx(SUARA_P4, "dibuka"), ...kubusP("a", 3, 12)), hapus(idx(SUARA_P4, "Sekarang"), "tc-k", "tc-t0")),
    k(SUARA_P5, ...Array.from({ length: 5 }, (_, q) => ubah(idx(SUARA_P5, "Beri"), { id: `bsa${8 + q}`, x: slotKubus(q, false).x, y: slotKubus(q, false).y })), ubah(idx(SUARA_P5, "Sisanya"), { id: "n-a", isi: "8" }), sorotkan(idx(SUARA_P5, "delapan"), ...ids("bsa", 0, 7))),
    k(SUARA_P6, redamkan(0, ...ids("bsa", 0, 7)), ubah(idx(SUARA_P6, "sama"), { id: "rm", isi: "13 − 5 = 8" }), tambah(idx(SUARA_P6, "delapan."), emo("ok", 262, 192, "✅", 22))),
  ],
};

/* ------------------------------ 7. Meminjam: terapan ------------------------------ */
const SUARA_Q1 = "Coba pada enam belas dikurangi sembilan. Enam belas adalah satu puluhan dan enam satuan.";
const SUARA_Q2 = "Enam kurang dari sembilan. Apa yang perlu dibuka? Ketuk jawabannya.";
const SUARA_Q3 = "Betul! Satu puluhan dibuka menjadi sepuluh satuan, jadi ada enam belas kubus lepas.";
const SUARA_Q4 = "Beri sembilan kubus kepada Upe. Sisanya tujuh kubus.";
const SUARA_Q5 = "Enam belas dikurangi sembilan sama dengan tujuh. Hebat!";

export const ADEGAN_LUAR_PINJAM_TERAPAN: AdeganStory = {
  id: "luar-pinjam-terapan",
  judul: "Meminjam: enam belas dikurangi sembilan",
  sumber: "Metode luar: Meminjam, terapan",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_Q1, tambah(0, ...kepala(2), ...batangP("a", 0), ...kubusP("a", 0, 5), labelN("a", 236, 54, "16", 22), rumus("16 − 9 = ?", 198, 15)), tambah(idx(SUARA_Q1, "Enam", 2), ...kotakPenerima("Upe"))),
    k(SUARA_Q2, tambah(idx(SUARA_Q2, "Apa"), ...pilihDua(150, ["Satu puluhan", "Satu satuan"]))),
    k(
      SUARA_Q3,
      sorotkan(idx(SUARA_Q3, "Betul!"), "c1-k"),
      hapusKartu(idx(SUARA_Q3, "dibuka"), 2),
      hapus(idx(SUARA_Q3, "dibuka"), ...idBatang("a", 0)),
      tambah(idx(SUARA_Q3, "dibuka"), ...kubusP("a", 6, 15), ...kartu("bk", 160, 70, 130, 22, W.krem, ["1 puluhan jadi 10 satuan"], 9)),
    ),
    k(SUARA_Q4, ...Array.from({ length: 9 }, (_, q) => ubah(idx(SUARA_Q4, "Beri"), { id: `bsa${7 + q}`, x: slotKubus(q, false).x, y: slotKubus(q, false).y })), ubah(idx(SUARA_Q4, "Sisanya"), { id: "n-a", isi: "7" })),
    k(SUARA_Q5, ubah(idx(SUARA_Q5, "sama"), { id: "rm", isi: "16 − 9 = 7" }), tambah(idx(SUARA_Q5, "Hebat!"), emo("ok", 262, 168, "✅", 22))),
  ],
};

/* ------------------------------ 8. Ringkasan ------------------------------ */
const SUARA_R1 = "Mari kita ingat lagi tiga metode dari luar.";
const SUARA_R2 = "Menghitung Naik: mulai dari bilangan kecil, naik sampai bilangan besar. Banyak langkahnya adalah selisihnya.";
const SUARA_R3 = "Mengambil: ambil sebagian dari kumpulan, lalu hitung sisanya.";
const SUARA_R4 = "Meminjam: buka satu puluhan menjadi sepuluh satuan kalau satuannya tidak cukup.";
const SUARA_R5 = "Pilih cara yang paling mudah untukmu. Terima kasih, sampai jumpa!";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Ringkasan: tiga metode luar",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_R1, tambah(0, judul("Ringkasan tiga metode")), tambah(idx(SUARA_R1, "ingat"), emo("ib", 150, 110, "\u{1F4DD}", 44))),
    k(SUARA_R2, hapus(0, "ib"), tambah(idx(SUARA_R2, "mulai"), ...kartu("r0", 14, 30, 272, 40, WARNA_METODE[0], [NAMA_METODE_ID[0], "naik; banyak langkah = selisih"], 9.2))),
    k(SUARA_R3, tambah(idx(SUARA_R3, "ambil"), ...kartu("r1", 14, 78, 272, 40, WARNA_METODE[1], [NAMA_METODE_ID[1], "ambil sebagian; hitung sisanya"], 9.2))),
    k(SUARA_R4, tambah(idx(SUARA_R4, "buka"), ...kartu("r2", 14, 126, 272, 40, WARNA_METODE[2], [NAMA_METODE_ID[2], "buka 1 puluhan jadi 10 satuan"], 9.2))),
    k(SUARA_R5, tambah(idx(SUARA_R5, "Terima"), emo("ow", 150, 190, OWL, 30))),
  ],
};
