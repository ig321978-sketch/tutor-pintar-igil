import type { AdeganStory } from "./logika-story";
import { W, barisTabel, bata, bulatanL, busurSemua, daftar, deret, emo, isiKotak, judul, kaleng, kartu, kotak, muncul, segienam, suku, tabel, teks } from "./k4b3b-gambar";
import { bersih, k, tambah } from "./k4b3b-bantu";

/* ------------------------------ 6. Ayo Berlatih, Latihan 2: soal 1-3 (Buku Siswa hlm. 99; Panduan Guru hlm. 132) ------------------------------ */
const L1 = { bw: 36, gap: 12 };
const D_L1 = deret("l1", 36, 84, ["7", "19", "31", "43", "?"], L1);
const B_L1 = busurSemua("l1", 36, 84, ["+12", "+12", "+12", "+12"], L1);
const D_L2 = deret("l2", 36, 84, ["12", "27", "42", "?", "?"], L1);
const B_L2 = busurSemua("l2", 36, 84, ["+15", "+15", "+15", "+15"], L1);
const D_L3 = deret("l3", 36, 84, ["96", "85", "74", "63", "?"], L1);
const B_L3 = busurSemua("l3", 36, 84, ["−11", "−11", "−11", "−11"], L1);
export const ADEGAN_BERLATIH_1: AdeganStory = {
  id: "berlatih-1",
  judul: "Ayo Berlatih, Latihan 2: soal 1 sampai 3",
  sumber: "Buku Siswa hlm. 99; Panduan Guru hlm. 132",
  latar: "#FFF7ED",
  kutipan: [
    "Latihan 2",
    "Tentukan bilangan yang tepat sesuai pola bilangan yang diberikan",
    "7, 19 (7+12), 31 (19+12), 43 (31+12), 55 (43+12)",
    "12, 27 (12+15), 42 (27+15), 57 (42+15), 72 (57+15)",
    "96, 85 (96-11), 74 (85-11), 63 (74-11), 52 (63-11)",
  ],
  ketukan: [
    k(
      "Ayo berlatih, Latihan dua. Soal satu: tujuh, sembilan belas, tiga puluh satu, empat puluh tiga. Selisihnya dua belas, jadi bilangan berikutnya lima puluh lima.",
      bersih(0),
      tambah(0, judul("Soal 1")),
      ...muncul(D_L1, B_L1, ["tujuh,", "belas,", "satu@2", "tiga@2", null], ["Selisihnya", "dua@2", "belas@2", null]),
      tambah("berikutnya", ...suku(D_L1, 4), ...B_L1[3]),
      tambah("berikutnya", ...kartu("l1k", 70, 140, 160, 28, W.krem, ["beda tetap: +12"], 10)),
      isiKotak("lima@2", "l1", 4, "55"),
    ),
    k(
      "Soal dua: dua belas, dua puluh tujuh, empat puluh dua. Selisihnya lima belas, jadi bilangan berikutnya lima puluh tujuh, lalu tujuh puluh dua.",
      bersih(0),
      tambah(0, judul("Soal 2")),
      ...muncul(D_L2, B_L2, ["belas,", "tujuh,", "dua@4", null, null], ["Selisihnya", "lima", null, null]),
      tambah("berikutnya", ...suku(D_L2, 3), ...B_L2[2]),
      tambah("lalu", ...suku(D_L2, 4), ...B_L2[3]),
      tambah("berikutnya", ...kartu("l2k", 70, 140, 160, 28, W.krem, ["beda tetap: +15"], 10)),
      isiKotak("tujuh@2", "l2", 3, "57"),
      isiKotak("dua@5", "l2", 4, "72"),
    ),
    k(
      "Soal tiga: sembilan puluh enam, delapan puluh lima, tujuh puluh empat, enam puluh tiga. Selisihnya kurang sebelas, jadi bilangan berikutnya lima puluh dua. Pola ini mengecil.",
      bersih(0),
      tambah(0, judul("Soal 3", W.merah)),
      ...muncul(D_L3, B_L3, ["enam,", "lima,", "empat,", "tiga@2", null], ["Selisihnya", "kurang", "sebelas,", null]),
      tambah("berikutnya", ...suku(D_L3, 4), ...B_L3[3]),
      tambah("mengecil.", ...kartu("l3k", 70, 140, 160, 28, W.merahMuda, ["beda tetap: −11, mengecil"], 9.4)),
      isiKotak("dua.", "l3", 4, "52"),
    ),
  ],
};

/* ------------------------------ 7. Latihan 2: soal 4-5 (Buku Siswa hlm. 100; Panduan Guru hlm. 132) ------------------------------ */
const D_L4 = deret("l4", 36, 84, ["91", "77", "63", "?", "?"], L1);
const B_L4 = busurSemua("l4", 36, 84, ["−14", "−14", "−14", "−14"], L1);
const L5 = { bw: 32, gap: 8 };
const D_L5 = deret("l5", 34, 84, ["13", "22", "31", "?", "49", "?"], L5);
const B_L5 = busurSemua("l5", 34, 84, ["+9", "+9", "+9", "+9", "+9"], L5);
export const ADEGAN_BERLATIH_2: AdeganStory = {
  id: "berlatih-2",
  judul: "Latihan 2: soal 4 dan 5",
  sumber: "Buku Siswa hlm. 100; Panduan Guru hlm. 132",
  latar: "#FFFBEB",
  kutipan: ["91, 77 (91-14), 63 (77-14) , 49 (63-14), 35 (49-14)", "13, 22 (13+9), 31 (22+9), 40 (31+9), 49 (40+9), 58 (49+9)"],
  ketukan: [
    k(
      "Soal empat: sembilan puluh satu, tujuh puluh tujuh, enam puluh tiga. Selisihnya kurang empat belas, jadi dua kotak berikutnya empat puluh sembilan dan tiga puluh lima.",
      bersih(0),
      tambah(0, judul("Soal 4", W.merah)),
      ...muncul(D_L4, B_L4, ["satu,", "tujuh@2", "tiga.", null, null], ["Selisihnya", "kurang", "belas,", null]),
      tambah("berikutnya", ...suku(D_L4, 3), ...B_L4[3], ...suku(D_L4, 4)),
      isiKotak("sembilan@2", "l4", 3, "49"),
      isiKotak("lima", "l4", 4, "35"),
      tambah("kurang", ...kartu("l4k", 70, 140, 160, 28, W.merahMuda, ["beda tetap: −14"], 10)),
    ),
    k(
      "Soal lima punya kotak kosong di tengah: tiga belas, dua puluh dua, tiga puluh satu, kosong, empat puluh sembilan, kosong. Dari tiga puluh satu ke empat puluh sembilan naik delapan belas dalam dua langkah, jadi bedanya sembilan.",
      bersih(0),
      tambah(0, judul("Soal 5: kotak di tengah")),
      ...muncul(D_L5, B_L5, ["belas,", "dua@2", "satu,", "kosong@2", "sembilan,", "kosong@3"]),
      tambah("langkah,", ...kartu("l5k", 20, 132, 260, 28, W.krem, ["49 − 31 = 18, dua langkah, 18 ÷ 2 = 9"], 9.4)),
      tambah("bedanya", ...B_L5[0], ...B_L5[1]),
    ),
    k(
      "Kotak kosongnya empat puluh dan lima puluh delapan. Kunci Panduan Guru memberi urutan tiga belas, dua puluh dua, tiga puluh satu, empat puluh, empat puluh sembilan, lima puluh delapan.",
      isiKotak("empat", "l5", 3, "40"),
      isiKotak("delapan", "l5", 5, "58"),
      tambah("Kunci", ...B_L5[2], ...B_L5[3], ...B_L5[4]),
      tambah("Kunci", ...kartu("l5q", 20, 168, 260, 26, W.hijauMuda, ["kunci: 13, 22, 31, 40, 49, 58"], 9.6)),
    ),
  ],
};

/* ------------------------------ 8. Latihan 2: soal cerita 6-8 (Buku Siswa hlm. 100; Panduan Guru hlm. 132-133) ------------------------------ */
const L6 = { bw: 40, gap: 12 };
const D_RAK = deret("rk", 26, 84, ["5", "9", "13", "17", "21"], L6);
const B_RAK = busurSemua("rk", 26, 84, ["+4", "+4", "+4", "+4"], L6);
const L7 = { bw: 30, gap: 6 };
const D_KURSI = deret("ku", 27, 84, ["20", "23", "26", "29", "32", "35", "38"], { ...L7, u: 10.4 });
const B_KURSI = busurSemua("ku", 27, 84, ["+3", "+3", "+3", "+3", "+3", "+3"], { ...L7, tinggi: 10 });
const TAB_TV = tabel(
  "tv",
  24,
  32,
  [70, 80],
  [
    ["Bulan", "Televisi"],
    ["Januari", "70"],
    ["Februari", "64"],
    ["Maret", "58"],
    ["April", "52"],
    ["Mei", "46"],
    ["Juni", "40"],
    ["Juli", "34"],
    ["Agustus", "28"],
  ],
  15,
  8.6,
);
export const ADEGAN_BERLATIH_CERITA: AdeganStory = {
  id: "berlatih-cerita",
  judul: "Latihan 2: soal cerita 6 sampai 8",
  sumber: "Buku Siswa hlm. 100; Panduan Guru hlm. 132–133",
  latar: "#F0FDFA",
  kutipan: [
    "Ali diberi tugas oleh guru untuk menata buku pada rak di perpustakaan.",
    "Banyak buku yang ditata oleh Ali pada rak kelima adalah 21 buah",
    "Di suatu gedung pertemuan terdapat 10 baris kursi",
    "Banyak kursi pada baris kelima adalah 32 kursi",
    "Banyak kursi pada baris ketujuh adalah 38 kursi",
    "Suatu pabrik elektronik memproduksi televisi selama setahun penuh",
    "Banyak televisi yang diproduksi pada bulan Juni adalah 40 buah",
    "Banyak televisi yang diproduksi pada bulan Agustus adalah 28 buah",
  ],
  ketukan: [
    k(
      "Soal enam: Ali menata lima buku di rak pertama, sembilan di rak kedua, tiga belas di rak ketiga. Selisihnya empat, jadi rak keempat tujuh belas dan rak kelima dua puluh satu buku.",
      bersih(0),
      tambah(0, judul("Soal 6: rak buku")),
      tambah("Ali", emo("rke", 150, 62, "📚", 24)),
      tambah("lima", ...suku(D_RAK, 0), teks("rkl0", 46, 126, "rak 1", 8, W.coklat)),
      tambah("sembilan", ...suku(D_RAK, 1), teks("rkl1", 98, 126, "rak 2", 8, W.coklat)),
      tambah("tiga", ...suku(D_RAK, 2), teks("rkl2", 150, 126, "rak 3", 8, W.coklat)),
      tambah("Selisihnya", ...B_RAK[0], ...B_RAK[1]),
      tambah("keempat", ...B_RAK[2], ...suku(D_RAK, 3), teks("rkl3", 202, 126, "rak 4", 8, W.coklat)),
      tambah("kelima", ...suku(D_RAK, 4), ...B_RAK[3], teks("rkl4", 254, 126, "rak 5", 8, W.coklat)),
    ),
    k(
      "Soal tujuh: gedung pertemuan punya sepuluh baris kursi. Baris pertama dua puluh kursi, baris kedua dua puluh tiga, baris ketiga dua puluh enam. Selisihnya tiga. Baris kelima tiga puluh dua kursi, baris ketujuh tiga puluh delapan kursi.",
      bersih(0),
      tambah(0, judul("Soal 7: baris kursi")),
      tambah("pertama", ...suku(D_KURSI, 0)),
      tambah("kedua", ...suku(D_KURSI, 1)),
      tambah("ketiga", ...suku(D_KURSI, 2)),
      tambah("Selisihnya", ...suku(D_KURSI, 3), ...suku(D_KURSI, 4), ...suku(D_KURSI, 5), ...suku(D_KURSI, 6), ...B_KURSI.flat()),
      tambah("Selisihnya", teks("kub", 150, 134, "baris ke-1 sampai ke-7", 9, W.coklat)),
      isiKotak("kelima", "ku", 4, "32"),
      isiKotak("ketujuh", "ku", 6, "38"),
      tambah("ketujuh", ...kartu("kuk", 40, 150, 220, 28, W.krem, ["baris 5: 32 kursi, baris 7: 38 kursi"], 9.4)),
    ),
    k(
      "Soal delapan: pabrik televisi memproduksi tujuh puluh buah pada Januari, enam puluh empat pada Februari, lima puluh delapan pada Maret, dan lima puluh dua pada April. Polanya mengecil enam setiap bulan.",
      bersih(0),
      tambah(0, judul("Soal 8: produksi televisi")),
      tambah("televisi", emo("tve", 238, 56, "📺", 30)),
      tambah("televisi", ...barisTabel(TAB_TV, "tv", 0)),
      tambah("Januari,", ...barisTabel(TAB_TV, "tv", 1)),
      tambah("Februari,", ...barisTabel(TAB_TV, "tv", 2)),
      tambah("Maret,", ...barisTabel(TAB_TV, "tv", 3)),
      tambah("April.", ...barisTabel(TAB_TV, "tv", 4)),
      tambah("mengecil", ...kartu("tvk", 190, 90, 100, 40, W.merahMuda, ["kurang 6", "tiap bulan"], 9.4)),
    ),
    k(
      "Lanjutkan: Mei empat puluh enam, Juni empat puluh, Juli tiga puluh empat, Agustus dua puluh delapan. Jadi Juni empat puluh buah dan Agustus dua puluh delapan buah.",
      tambah("Mei", ...barisTabel(TAB_TV, "tv", 5)),
      tambah("Juni", ...barisTabel(TAB_TV, "tv", 6)),
      tambah("Juli", ...barisTabel(TAB_TV, "tv", 7)),
      tambah("Agustus", ...barisTabel(TAB_TV, "tv", 8)),
      tambah("Jadi", ...kartu("tvl", 190, 142, 100, 40, W.hijauMuda, ["Juni: 40", "Agustus: 28"], 9.4)),
    ),
  ],
};

/* ------------------------------ 9. Rekap beda dan diferensiasi (Panduan Guru hlm. 132-133) ------------------------------ */
const BEDA_LATIH = ["+12", "+15", "−11", "−14", "+9", "+4", "+3", "−6"];
const TAB_BEDA_1 = tabel("tb1", 20, 36, [50, 70], [["Soal", "Beda"], ...BEDA_LATIH.slice(0, 4).map((b, i) => [String(i + 1), b])], 17, 9);
const TAB_BEDA_2 = tabel("tb2", 160, 36, [50, 70], [["Soal", "Beda"], ...BEDA_LATIH.slice(4).map((b, i) => [String(i + 5), b])], 17, 9);
export const ADEGAN_REKAP_BEDA: AdeganStory = {
  id: "rekap-beda",
  judul: "Rekap beda dan diferensiasi",
  sumber: "Panduan Guru hlm. 132–133",
  latar: "#F5F3FF",
  kutipan: [
    "Selama proses pembelajaran sering terjadi adanya keberagaman",
    "Meningkatkan motivasi peserta didik.",
    "Menciptakan suasana belajar yang nyaman dan kreatif.",
    "Memilih model pembelajaran yang tepat.",
    "tutor sebaya",
    "minta mereka untuk membuat pola bilangan sendiri",
    "baik itu dalam bentuk soal bilangan biasa ataupun soal penerapan",
    "dalam kehidupan sehari-hari (kontekstual) beserta cara untuk menyelesaikannya",
    "guru dapat mendampingi dan memberikan latihan tambahan bagi peserta didik yang masih mengalami kesulitan",
  ],
  ketukan: [
    k(
      "Rekap delapan soal Ayo Berlatih: bedanya tambah dua belas, tambah lima belas, kurang sebelas, kurang empat belas, tambah sembilan, tambah empat, tambah tiga, dan kurang enam. Lima soal membesar, tiga soal mengecil.",
      bersih(0),
      tambah(0, judul("Beda tiap soal")),
      tambah(0, ...barisTabel(TAB_BEDA_1, "tb1", 0), ...barisTabel(TAB_BEDA_2, "tb2", 0)),
      tambah("dua", ...barisTabel(TAB_BEDA_1, "tb1", 1)),
      tambah("lima", ...barisTabel(TAB_BEDA_1, "tb1", 2)),
      tambah("sebelas,", ...barisTabel(TAB_BEDA_1, "tb1", 3)),
      tambah("empat", ...barisTabel(TAB_BEDA_1, "tb1", 4)),
      tambah("sembilan,", ...barisTabel(TAB_BEDA_2, "tb2", 1)),
      tambah("empat@2", ...barisTabel(TAB_BEDA_2, "tb2", 2)),
      tambah("tiga", ...barisTabel(TAB_BEDA_2, "tb2", 3)),
      tambah("enam.", ...barisTabel(TAB_BEDA_2, "tb2", 4)),
      tambah("Lima@2", ...kartu("tbm", 20, 132, 128, 30, W.hijauMuda, ["membesar: 5 soal"], 9.4)),
      tambah("mengecil.", ...kartu("tbn", 160, 132, 120, 30, W.merahMuda, ["mengecil: 3 soal"], 9.4)),
    ),
    k(
      "Panduan Guru tentang keberagaman murid: tingkatkan motivasi, ciptakan suasana belajar nyaman dan kreatif, pilih model pembelajaran yang tepat, lalu bentuk kelompok bervariasi dengan tutor sebaya.",
      ...daftar("dk", "Diferensiasi", [
        { at: "motivasi,", t: "1. tingkatkan motivasi murid", w: W.hijauMuda, u: 9.4 },
        { at: "suasana", t: "2. suasana belajar nyaman dan kreatif", w: W.krem, u: 9 },
        { at: "model", t: "3. pilih model pembelajaran yang tepat", w: W.langit, u: 9 },
        { at: "kelompok", t: "4. kelompok bervariasi, tutor sebaya", w: W.pink, u: 9 },
      ]),
    ),
    k(
      "Murid yang cepat belajar diminta membuat pola bilangan sendiri, soal biasa atau soal kehidupan sehari-hari, beserta cara menyelesaikannya. Guru mendampingi murid yang kesulitan dengan latihan tambahan.",
      ...daftar("dm", "Murid cepat dan murid kesulitan", [
        { at: "cepat", t: "cepat: buat pola bilangan sendiri", w: W.hijauMuda, u: 9.4 },
        { at: "sehari-hari,", t: "soal biasa atau soal sehari-hari + cara", w: W.krem, u: 8.8 },
        { at: "mendampingi", t: "guru mendampingi, latihan tambahan", w: W.langit, u: 9 },
      ]),
    ),
  ],
};

/* ------------------------------ 10. Uji Kompetensi 1-4: pola gambar (Buku Siswa hlm. 101; Panduan Guru hlm. 134) ------------------------------ */
const FIG_UK1 = [1, 2, 3, 4].map((n, i) => bulatanL(`u1${"abcd"[i]}`, [20, 68, 120, 184][i], 70, n, 12));
const FIG_UK2 = [1, 2, 3].map((n, i) => segienam(`u2${"abc"[i]}`, [36, 106, 176][i], 70, n, 10));
const FIG_UK3 = [kaleng("u3a", 55, 118, [1, 2, 3, 4], 12), kaleng("u3b", 130, 118, [1, 3, 4], 12), kaleng("u3c", 205, 118, [1, 2, 3], 12)];
const FIG_UK4 = [
  bata("u4a", 20, 70, [{ n: 4, g: 0 }, { n: 3, g: 0.5 }, { n: 4, g: 0 }, { n: 3, g: 0.5 }, { n: 4, g: 0 }], 12, 9),
  bata("u4b", 95, 70, [{ n: 1, g: 3 }, { n: 3, g: 0.5 }, { n: 4, g: 0 }, { n: 3, g: 0.5 }, { n: 4, g: 0 }], 12, 9),
  bata("u4c", 170, 70, [{ n: 0, g: 0 }, { n: 1, g: 0.5 }, { n: 4, g: 0 }, { n: 3, g: 0.5 }, { n: 4, g: 0 }], 12, 9),
];
const jawab = (id: string, x: number, isi: string) => [kotak(`${id}-k`, x, 76, 36, 30, W.hijauMuda, W.hijau, { rx: 6 }), teks(`${id}-v`, x + 18, 96, isi, 14, W.hijau)];
export const ADEGAN_UK_GAMBAR: AdeganStory = {
  id: "uk-gambar",
  judul: "Uji Kompetensi 1 sampai 4: pola gambar",
  sumber: "Buku Siswa hlm. 101; Panduan Guru hlm. 134",
  latar: "#FFF7ED",
  kutipan: [
    "Uji Kompetensi",
    "Tentukan banyak benda yang sesuai dengan pola gambar yang diberikan!",
    "Banyak benda selanjutnya sesuai pola gambar adalah 9",
    "Banyak benda selanjutnya sesuai pola gambar adalah 8",
    "Banyak benda selanjutnya sesuai pola gambar adalah 4",
  ],
  ketukan: [
    k(
      "Uji Kompetensi memuat sepuluh soal. Soal satu sampai empat memakai pola gambar. Soal satu: bulatan hijau satu, tiga, lima, tujuh. Bedanya dua, jadi gambar berikutnya sembilan bulatan.",
      bersih(0),
      tambah(0, judul("Soal 1: bulatan")),
      tambah("satu@3", ...FIG_UK1[0], teks("u1a-v", 26, 140, "1", 11, W.biru)),
      tambah("tiga,", ...FIG_UK1[1], teks("u1b-v", 80, 140, "3", 11, W.biru)),
      tambah("lima,", ...FIG_UK1[2], teks("u1c-v", 138, 140, "5", 11, W.biru)),
      tambah("tujuh.", ...FIG_UK1[3], teks("u1d-v", 208, 140, "7", 11, W.biru)),
      tambah("Bedanya", ...kartu("u1k", 60, 156, 120, 28, W.krem, ["beda tetap: +2"], 9.6)),
      tambah("sembilan", ...jawab("u1z", 252, "9")),
    ),
    k(
      "Soal dua: segi enam biru berjumlah dua, empat, enam. Naik dua demi dua, jadi gambar berikutnya delapan segi enam.",
      bersih(0),
      tambah(0, judul("Soal 2: segi enam")),
      tambah("dua@2", ...FIG_UK2[0], teks("u2a-v", 46, 140, "2", 11, W.biru)),
      tambah("empat,", ...FIG_UK2[1], teks("u2b-v", 125, 140, "4", 11, W.biru)),
      tambah("enam@2", ...FIG_UK2[2], teks("u2c-v", 200, 140, "6", 11, W.biru)),
      tambah("Naik", ...kartu("u2k", 60, 156, 120, 28, W.krem, ["beda tetap: +2"], 9.6)),
      tambah("delapan", ...jawab("u2z", 252, "8")),
    ),
    k(
      "Soal tiga: tumpukan kaleng berisi sepuluh, delapan, dan enam kaleng. Turunnya dua demi dua, jadi gambar berikutnya empat kaleng.",
      bersih(0),
      tambah(0, judul("Soal 3: kaleng", W.merah)),
      tambah("sepuluh,", ...FIG_UK3[0], teks("u3a-v", 55, 140, "10", 11, W.biru)),
      tambah("delapan,", ...FIG_UK3[1], teks("u3b-v", 130, 140, "8", 11, W.biru)),
      tambah("enam", ...FIG_UK3[2], teks("u3c-v", 205, 140, "6", 11, W.biru)),
      tambah("Turunnya", ...kartu("u3k", 60, 156, 120, 28, W.merahMuda, ["beda tetap: −2"], 9.6)),
      tambah("empat", ...jawab("u3z", 252, "4")),
    ),
    k(
      "Soal empat: tembok batu bata berisi delapan belas, lima belas, dan dua belas bata. Turunnya tiga demi tiga, jadi berikutnya sembilan bata. Kunci Panduan Guru: sembilan, delapan, empat, sembilan.",
      bersih(0),
      tambah(0, judul("Soal 4: batu bata", W.merah)),
      tambah("delapan", ...FIG_UK4[0], teks("u4a-v", 44, 140, "18", 11, W.biru)),
      tambah("lima", ...FIG_UK4[1], teks("u4b-v", 119, 140, "15", 11, W.biru)),
      tambah("dua", ...FIG_UK4[2], teks("u4c-v", 194, 140, "12", 11, W.biru)),
      tambah("Turunnya", ...kartu("u4k", 60, 156, 120, 28, W.merahMuda, ["beda tetap: −3"], 9.6)),
      tambah("sembilan", ...jawab("u4z", 252, "9")),
      tambah("Kunci", ...kartu("u4q", 190, 156, 100, 28, W.hijauMuda, ["kunci: 9, 8, 4, 9"], 8.8)),
    ),
  ],
};

/* ------------------------------ 11. Uji Kompetensi 5-8: pola bilangan (Buku Siswa hlm. 101-102; Panduan Guru hlm. 134) ------------------------------ */
const U5 = { bw: 36, gap: 14 };
const U6 = { bw: 32, gap: 8 };
const D_U5 = deret("v5", 32, 84, ["5", "9", "13", "17", "?"], U5);
const B_U5 = busurSemua("v5", 32, 84, ["+4", "+4", "+4", "+4"], U5);
const D_U6 = deret("v6", 34, 84, ["6", "12", "?", "24", "?"], U6);
const B_U6 = busurSemua("v6", 34, 84, ["+6", "+6", "+6", "+6"], U6);
const D_U7 = deret("v7", 32, 84, ["34", "27", "20", "13", "?"], U5);
const B_U7 = busurSemua("v7", 32, 84, ["−7", "−7", "−7", "−7"], U5);
const D_U8 = deret("v8", 34, 84, ["40", "34", "?", "22", "16", "?"], U6);
const B_U8 = busurSemua("v8", 34, 84, ["−6", "−6", "−6", "−6", "−6"], U6);
export const ADEGAN_UK_BILANGAN: AdeganStory = {
  id: "uk-bilangan",
  judul: "Uji Kompetensi 5 sampai 8: pola bilangan",
  sumber: "Buku Siswa hlm. 101–102; Panduan Guru hlm. 134",
  latar: "#FFFBEB",
  kutipan: [
    "Tentukan bilangan yang tepat sesuai pola bilangan yang diberikan!",
    "5, 9(5+4), 13(9+4), 17(13+4), 21(17+4)",
    "6, 12(6+6), 18(12+6), 24(18+6), 30(24+6)",
    "34, 27(34-7), 20(27-7), 13(20-7), 6(13-7)",
    "40, 34(40-6), 28(34-6), 22(28-6), 16(22-6), 10(16-6)",
  ],
  ketukan: [
    k(
      "Soal lima: lima, sembilan, tiga belas, tujuh belas. Selisihnya empat, jadi bilangan berikutnya dua puluh satu.",
      bersih(0),
      tambah(0, judul("Soal 5")),
      ...muncul(D_U5, B_U5, ["lima@2", "sembilan,", "belas,", "belas@2", null], ["Selisihnya", "empat,", "jadi", null]),
      tambah("berikutnya", ...suku(D_U5, 4), ...B_U5[3]),
      tambah("berikutnya", ...kartu("v5k", 70, 140, 160, 28, W.krem, ["beda tetap: +4"], 10)),
      isiKotak("satu.", "v5", 4, "21"),
    ),
    k(
      "Soal enam: enam, dua belas, kosong, dua puluh empat, kosong. Dari enam ke dua belas selisihnya enam, jadi kotak kosong itu delapan belas dan tiga puluh. Dua kali lipat tidak cocok, sebab dua puluh empat berada di urutan keempat.",
      bersih(0),
      tambah(0, judul("Soal 6: kotak kosong")),
      ...muncul(D_U6, B_U6, ["enam@2", "belas,", "kosong,", "empat,", "kosong@2"]),
      tambah("selisihnya", ...B_U6[0], ...B_U6[1]),
      tambah("kosong@3", ...B_U6[2], ...B_U6[3]),
      isiKotak("delapan", "v6", 2, "18"),
      isiKotak("tiga", "v6", 4, "30"),
      tambah("lipat", ...kartu("v6k", 40, 140, 220, 28, W.krem, ["dikali 2? 6, 12, 24 ✖"], 9.6)),
    ),
    k(
      "Soal tujuh: tiga puluh empat, dua puluh tujuh, dua puluh, tiga belas. Selisihnya kurang tujuh, jadi bilangan berikutnya enam.",
      bersih(0),
      tambah(0, judul("Soal 7", W.merah)),
      ...muncul(D_U7, B_U7, ["empat,", "tujuh@2", "puluh@3", "belas.", null], ["Selisihnya", "kurang", "tujuh@3", null]),
      tambah("berikutnya", ...suku(D_U7, 4), ...B_U7[3]),
      tambah("berikutnya", ...kartu("v7k", 70, 140, 160, 28, W.merahMuda, ["beda tetap: −7"], 10)),
      isiKotak("enam.", "v7", 4, "6"),
    ),
    k(
      "Soal delapan: empat puluh, tiga puluh empat, kosong, dua puluh dua, enam belas, kosong. Selisihnya kurang enam, jadi dua kotak kosong itu dua puluh delapan dan sepuluh.",
      bersih(0),
      tambah(0, judul("Soal 8", W.merah)),
      ...muncul(D_U8, B_U8, ["puluh,", "empat@2", "kosong,", "dua@2", "belas,", "kosong@2"]),
      tambah("Selisihnya", ...B_U8[0], ...B_U8[1], ...B_U8[2], ...B_U8[3], ...B_U8[4]),
      isiKotak("delapan@2", "v8", 2, "28"),
      isiKotak("sepuluh.", "v8", 5, "10"),
      tambah("kurang", ...kartu("v8k", 70, 140, 160, 28, W.merahMuda, ["beda tetap: −6"], 10)),
    ),
  ],
};
