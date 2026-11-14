import type { AdeganStory } from "./logika-story";
import { W, angka, bagianKe, barisTabel, emo, garis, judul, kartu, kotak, panah, papan, susunBagian, teks, URAI_CONTOH, URAI_LATIHAN, URAI_LETAK, URAI_NOL, rb, angkaDari } from "./k4b1d-gambar";
import { bersih, idx, k, sorotkan, tambah, ubah } from "./k4b1d-bantu";

/* ------------------------------ 5. Dekomposisi: Ayo Mengamati (Buku Siswa hlm. 26; Panduan Guru hlm. 47) ------------------------------ */
const SUARA_D1 = "Dekomposisi bilangan cacah sampai sepuluh ribu. Ayo Mengamati: kalian sudah mengenal nilai tempat. Misalkan bilangan enam ribu tujuh ratus delapan puluh sembilan.";
const SUARA_D2 = "Sembilan menempati nilai tempat satuan, delapan menempati puluhan, tujuh menempati ratusan, dan enam menempati ribuan. Buku menunjukkannya dengan garis dari tiap angka.";
const SUARA_D3 = "Panduan guru: guru memberi contoh bilangan empat angka, mengingatkan nilai tempat serta nilai angka pada tiap nilai tempat, misalnya enam di tempat ribuan bernilai enam ribu. Contoh lain boleh ditambah guru.";
const SUARA_D4 = "Diberikan bilangan enam ribu delapan ratus empat puluh sembilan. Tabelnya: ribuan enam, ratusan delapan, puluhan empat, satuan sembilan.";

/** Letak angka 6.789: kotak angka (kiri ke kanan: ribuan sampai satuan) dan baris label (satuan paling atas), seperti garis penunjuk di buku. */
const KOTAK_DIGIT = URAI_LETAK.map((d, i) => [kotak(`dg${i}-k`, 30 + i * 20, 50, 20, 22, W.putih, W.biru, { rx: 0, tebal: 1.2 }), teks(`dg${i}-t`, 40 + i * 20, 65.5, String(d), 11, W.biru)]);
const NAMA_TEMPAT_KECIL = ["ribuan", "ratusan", "puluhan", "satuan"];
const BARIS_LETAK = [90, 112, 134, 156];

export const ADEGAN_DEKOMPOSISI_AMATI: AdeganStory = {
  id: "dekomposisi-amati",
  judul: "Dekomposisi: Ayo Mengamati",
  sumber: "Buku Siswa hlm. 26; Panduan Guru hlm. 47",
  latar: "#F0FDF4",
  kutipan: [
    "Dekomposisi bilangan cacah sampai 10.000",
    "Ayo Mengamati",
    "Kalian sudah mengenal nilai tempat dari suatu bilangan.",
    "Misalkan bilangan 6.789.",
    "9 menempati nilai tempat satuan",
    "8 menempati nilai tempat puluhan",
    "7 menempati nilai tempat ratusan",
    "6 menempati nilai tempat ribuan",
    "Guru dapat memberikan contoh bilangan 4 angka dan mengingatkan kembali nilai tempat serta nilai dari angka pada setiap nilai tempat.",
    "Misalnya 6 menempati tempat ribuan maka nilainya 6.000.",
    "Guru dapat memberikan contoh yang lebih banyak terkait bilangan cacah 4 angka.",
    "Diberikan bilangan 6.849.",
    "Untuk melihat nilai tempat dari setiap angka pada bilangan 6.849 sebagai berikut.",
  ],
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Dekomposisi bilangan cacah"), teks("sb", 150, 36, "sampai 10.000", 9.4, W.coklat)),
      tambah(idx(SUARA_D1, "nilai"), teks("dc", 230, 69, "nilai tempat", 8.6, W.coklat)),
      tambah(idx(SUARA_D1, "Misalkan"), ...KOTAK_DIGIT.flat()),
      tambah(idx(SUARA_D1, "sembilan"), teks("dl", 230, 40, "bilangan 6.789", 9.6, W.merah)),
    ),
    k(
      SUARA_D2,
      ...[3, 2, 1, 0].map((c, r) =>
        tambah(
          idx(SUARA_D2, ["Sembilan", "delapan", "tujuh", "enam"][r]),
          garis(`dv${c}`, 40 + c * 20, 72, 0, BARIS_LETAK[r] - 72, W.biru, 1.4),
          garis(`dh${c}`, 40 + c * 20, BARIS_LETAK[r], 140 - (40 + c * 20), 0, W.biru, 1.4),
          ...kartu(`dk${c}`, 140, BARIS_LETAK[r] - 9, 150, 18, W.langit, [`${URAI_LETAK[c]} menempati nilai tempat ${NAMA_TEMPAT_KECIL[c]}`], 7.2),
        ),
      ),
    ),
    k(
      SUARA_D3,
      bersih(0),
      tambah(0, judul("Contoh dari guru")),
      tambah(idx(SUARA_D3, "misalnya"), ...kartu("gk", 14, 40, 272, 40, W.hijauMuda, ["angka 6 di tempat ribuan", "nilainya 6.000"], 9.6)),
      tambah(idx(SUARA_D3, "Contoh", 2), ...kartu("gl", 14, 100, 272, 40, W.krem, ["contoh bilangan 4 angka", "boleh ditambah guru"], 9.6)),
    ),
    k(
      SUARA_D4,
      bersih(0),
      tambah(0, judul("Tabel nilai tempat")),
      tambah(idx(SUARA_D4, "sembilan"), teks("db", 150, 40, "6.849", 14, W.merah)),
      tambah(idx(SUARA_D4, "Tabelnya:"), ...papan("dt", 30, 52, 60)),
      tambah(idx(SUARA_D4, "enam", 2), angka("dt", 30, 52, 60, 0, URAI_CONTOH[0])),
      tambah(idx(SUARA_D4, "delapan", 2), angka("dt", 30, 52, 60, 1, URAI_CONTOH[1])),
      tambah(idx(SUARA_D4, "empat", 2), angka("dt", 30, 52, 60, 2, URAI_CONTOH[2])),
      tambah(idx(SUARA_D4, "sembilan", 2), angka("dt", 30, 52, 60, 3, URAI_CONTOH[3])),
    ),
  ],
};

/* ------------------------------ 6. Dekomposisi: uraian 6.849 (Buku Siswa hlm. 26) ------------------------------ */
const SUARA_U1 = "Berdasarkan tabel, angka enam di ribuan bernilai enam ribu, dan angka delapan di ratusan bernilai delapan ratus.";
const SUARA_U2 = "Angka empat di puluhan bernilai empat puluh, dan angka sembilan di satuan bernilai sembilan.";
const SUARA_U3 = "Jadi enam ribu delapan ratus empat puluh sembilan sama dengan enam ribuan ditambah delapan ratusan ditambah empat puluhan ditambah sembilan satuan.";
const SUARA_U4 = "Bentuk kedua di buku: enam ribu ditambah delapan ratus ditambah empat puluh ditambah sembilan.";
const SUARA_U5 = "Itulah dekomposisi bilangan: mengurai bilangan menjadi nilai tempat tiap angkanya. Arahnya kebalikan dari komposisi, yang menyusun.";

const SB_U = susunBagian("ub", 60, ["6 ribuan", "8 ratusan", "4 puluhan", "9 satuan"]);

export const ADEGAN_DEKOMPOSISI_URAIAN: AdeganStory = {
  id: "dekomposisi-uraian",
  judul: "Dekomposisi: uraian 6.849",
  sumber: "Buku Siswa hlm. 26",
  latar: "#FFF7ED",
  kutipan: [
    "Berdasarkan penjelasan di atas, diperoleh bahwa",
    "Angka 6 menempati tempat ribuan, nilainya 6.000",
    "Angka 8 menempati tempat ratusan, nilainya 800",
    "Angka 4 menempati tempat puluhan, nilainya 40",
    "Angka 9 menempati tempat satuan, nilainya 9",
    "6.849 = 6 ribuan + 8 ratusan +4 puluhan + 9 satuan",
    "6.849 = 6.000 + 800+ 40 + 9",
  ],
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Nilai tiap angka pada 6.849"), ...papan("uu", 30, 34, 60, URAI_CONTOH)),
      tambah(idx(SUARA_U1, "enam"), panah("u0", 60, 74, 0, 10, W.merah, 2)),
      tambah(idx(SUARA_U1, "ribu"), teks("w0", 60, 100, "6.000", 10, W.merah)),
      tambah(idx(SUARA_U1, "delapan"), panah("u1", 120, 74, 0, 10, W.merah, 2)),
      tambah(idx(SUARA_U1, "ratus"), teks("w1", 120, 100, "800", 10, W.merah)),
    ),
    k(
      SUARA_U2,
      tambah(idx(SUARA_U2, "empat"), panah("u2", 180, 74, 0, 10, W.merah, 2)),
      tambah(idx(SUARA_U2, "puluh"), teks("w2", 180, 100, "40", 10, W.merah)),
      tambah(idx(SUARA_U2, "sembilan"), panah("u3", 240, 74, 0, 10, W.merah, 2)),
      tambah(idx(SUARA_U2, "sembilan", 2), teks("w3", 240, 100, "9", 10, W.merah)),
    ),
    k(
      SUARA_U3,
      bersih(0),
      tambah(0, judul("Uraian dalam ribuan, ratusan, ...")),
      tambah(idx(SUARA_U3, "Jadi"), teks("ue", 150, 42, "6.849 =", 18, W.hijau)),
      tambah(idx(SUARA_U3, "ribuan"), bagianKe(SB_U, "ub", 0)),
      tambah(idx(SUARA_U3, "ratusan"), bagianKe(SB_U, "ub", 1)),
      tambah(idx(SUARA_U3, "puluhan"), bagianKe(SB_U, "ub", 2)),
      tambah(idx(SUARA_U3, "satuan."), bagianKe(SB_U, "ub", 3)),
    ),
    k(
      SUARA_U4,
      tambah(idx(SUARA_U4, "enam"), teks("uf", 150, 128, "6.849 = 6.000 + 800 + 40 + 9", 11.6, W.biru)),
      sorotkan(idx(SUARA_U4, "sembilan"), "uf"),
    ),
    k(
      SUARA_U5,
      bersih(0),
      tambah(0, judul("Urai dan susun")),
      tambah(0, teks("ka", 150, 48, "6.348", 20, W.hijau), teks("kb", 150, 160, "6.000 + 300 + 40 + 8", 13, W.biru)),
      tambah(idx(SUARA_U5, "mengurai"), panah("kd", 110, 66, 0, 66, W.merah, 2.4), teks("kdt", 62, 104, "dekomposisi: urai", 8.6, W.merah)),
      tambah(idx(SUARA_U5, "komposisi,"), panah("ks", 190, 132, 0, -66, W.hijau, 2.4), teks("kst", 245, 104, "komposisi: susun", 8.6, W.hijau)),
    ),
  ],
};

/* ------------------------------ 7. Dekomposisi dengan nol: 6.035 (Buku Siswa hlm. 27; Panduan Guru hlm. 45) ------------------------------ */
const SUARA_Z1 = "Anak di buku bertanya: bagaimana halnya dengan dekomposisi dari bilangan enam ribu tiga puluh lima?";
const SUARA_Z2 = "Tabelnya: ribuan enam, ratusan nol, puluhan tiga, satuan lima. Tempat ratusan berisi nol, artinya tidak ada ratusan.";
const SUARA_Z3 = "Dalam bentuk panjang: enam ribuan ditambah nol ratusan ditambah tiga puluhan ditambah lima satuan, sama dengan enam ribu tiga puluh lima.";
const SUARA_Z4 = "Bentuk kedua di buku: enam ribu ditambah nol nol nol ditambah tiga puluh ditambah lima.";
const SUARA_Z5 = "Panduan guru mengatur penulisannya: ratusan nol ditulis tiga nol, puluhan nol ditulis dua nol, dan satuan nol ditulis satu nol.";
const SUARA_Z6 = "Catatan video: tiga nol itu hanya cara menulis. Nilainya tetap nol, jadi enam ribu ditambah nol ditambah tiga puluh ditambah lima tetap sama dengan enam ribu tiga puluh lima.";

const SB_Z = susunBagian("zb", 76, ["6 ribuan", "0 ratusan", "3 puluhan", "5 satuan"]);

export const ADEGAN_DEKOMPOSISI_NOL: AdeganStory = {
  id: "dekomposisi-nol",
  judul: "Dekomposisi dengan nol: 6.035",
  sumber: "Buku Siswa hlm. 27; Panduan Guru hlm. 45",
  latar: "#EFF6FF",
  kutipan: [
    "Bagaimana halnya dengan dekomposisi dari bilangan 6.035?",
    "6 Ribuan",
    "0 Ratusan",
    "3 Puluhan",
    "5 Satuan",
    "Bilangan 6.035, dapat dinyatkan dalam bentuk berikut.",
    "6.035 = 6 ribuan + 0 ratusan + 3 puluhan + 5 satuan",
    "= 6.000 + 000 + 30 + 5",
    "Angka pada nilai tempat ratusan sama dengan 0 dekomposisinya ditulis 000",
    "Angka pada nilai tempat puluhan sama dengan 0 dekomposisinya ditulis 00,",
    "Angka pada nilai tempat satuan sama dengan 0 dekomposisinya ditulis 0",
  ],
  ketukan: [
    k(
      SUARA_Z1,
      tambah(0, judul("Dekomposisi dengan nol")),
      tambah("bagaimana", teks("zq", 236, 110, "?", 56, W.merah)),
      tambah(idx(SUARA_Z1, "lima?"), teks("zb0", 100, 110, "6.035", 36, W.biru)),
    ),
    k(
      SUARA_Z2,
      bersih(0),
      tambah(0, judul("Tabel 6.035"), ...papan("zn", 30, 40, 60)),
      tambah(idx(SUARA_Z2, "enam"), angka("zn", 30, 40, 60, 0, URAI_NOL[0])),
      tambah(idx(SUARA_Z2, "nol"), angka("zn", 30, 40, 60, 1, URAI_NOL[1])),
      tambah(idx(SUARA_Z2, "tiga"), angka("zn", 30, 40, 60, 2, URAI_NOL[2])),
      tambah(idx(SUARA_Z2, "lima"), angka("zn", 30, 40, 60, 3, URAI_NOL[3])),
      ubah(idx(SUARA_Z2, "nol", 2), { id: "zn-d1", warna: W.merahMuda }),
      tambah(idx(SUARA_Z2, "artinya"), ...kartu("zk", 40, 108, 220, 30, W.krem, ["0 ratusan: tidak ada ratusan"], 9.4)),
    ),
    k(
      SUARA_Z3,
      bersih(0),
      tambah(0, judul("Bentuk panjang")),
      tambah(idx(SUARA_Z3, "ribuan"), bagianKe(SB_Z, "zb", 0)),
      tambah(idx(SUARA_Z3, "ratusan"), bagianKe(SB_Z, "zb", 1)),
      tambah(idx(SUARA_Z3, "puluhan"), bagianKe(SB_Z, "zb", 2)),
      tambah(idx(SUARA_Z3, "satuan,"), bagianKe(SB_Z, "zb", 3)),
      tambah(idx(SUARA_Z3, "sama"), teks("zh", 150, 128, "= 6.035", 22, W.hijau)),
    ),
    k(
      SUARA_Z4,
      tambah(idx(SUARA_Z4, "enam"), teks("zg", 150, 172, "6.000 + 000 + 30 + 5", 13, W.biru)),
      sorotkan(idx(SUARA_Z4, "nol"), "zg"),
    ),
    k(
      SUARA_Z5,
      bersih(0),
      tambah(0, judul("Penulisan nol (Panduan Guru)")),
      tambah("ratusan", ...kartu("zr", 30, 40, 240, 30, W.hijauMuda, ["ratusan 0 ditulis 000"], 10)),
      tambah("puluhan", ...kartu("zp", 30, 82, 240, 30, W.krem, ["puluhan 0 ditulis 00"], 10)),
      tambah("satuan", ...kartu("zs", 30, 124, 240, 30, W.pink, ["satuan 0 ditulis 0"], 10)),
    ),
    k(
      SUARA_Z6,
      bersih(0),
      tambah(0, judul("Catatan: nol tetap nol")),
      tambah("tiga", ...kartu("zc", 20, 38, 260, 32, W.merahMuda, ["000 hanya cara menulis", "nilainya tetap nol"], 9.4)),
      tambah("enam", teks("zi", 150, 120, "6.000 + 0 + 30 + 5 = 6.035", 12.5, W.biru)),
      tambah("sama", emo("zj", 150, 170, "✅", 26)),
    ),
  ],
};

/* ------------------------------ 8. Dekomposisi: Ayo Berlatih nomor 1 (Buku Siswa hlm. 27-28; Panduan Guru hlm. 47) ------------------------------ */
const SUARA_B1 = "Ayo Berlatih nomor satu: isilah titik-titik dengan benar. Bilangan pertama, enam ribu empat ratus delapan puluh dua, sudah diisi sebagai contoh di buku.";
const SUARA_B2 = "Tujuh ribu dua puluh. Tujuh ribuan, nol ratusan, dua puluhan, nol satuan.";
const SUARA_B3 = "Dua ribu satu. Dua ribuan, nol ratusan, nol puluhan, satu satuan.";
const SUARA_B4 = "Tujuh ribu. Tujuh ribuan, sedangkan ratusan, puluhan, dan satuan semuanya nol.";
const SUARA_B5 = "Sembilan ribu sembilan ratus sembilan puluh sembilan. Semua tempat berisi sembilan, jadi sembilan ribuan, sembilan ratusan, sembilan puluhan, dan sembilan satuan.";
const SUARA_B6 = "Periksa dengan menjumlahkan nilai tiap tempat. Sembilan ribu ditambah sembilan ratus ditambah sembilan puluh ditambah sembilan sama dengan sembilan ribu sembilan ratus sembilan puluh sembilan.";

const KOL_TABEL = [60, 45, 45, 45, 45];
const PUSAT_KOL = [60, 112.5, 157.5, 202.5, 247.5];
const BARIS_Y = (i: number) => 48 + i * 18;
/** Baris tabel nomor 1 ke-`i` hanya dengan bilangan di kolom pertama. */
const labelBaris = (i: number) => barisTabel(`tr${i}`, 30, BARIS_Y(i), KOL_TABEL, [rb(angkaDari(URAI_LATIHAN[i])), "", "", "", ""], 18, 9);
/** Angka kolom ke-`c` (0 = ribuan) pada baris ke-`i`. */
const selBaris = (i: number, c: number) => teks(`tr${i}-t${c + 1}`, PUSAT_KOL[c + 1], BARIS_Y(i) + 12.3, String(URAI_LATIHAN[i][c]), 9, W.hijau);
const KEPALA = () => barisTabel("th", 30, 30, KOL_TABEL, ["Bilangan", "Ribuan", "Ratusan", "Puluhan", "Satuan"], 18, 7.4, true);

export const ADEGAN_BERLATIH_SATU: AdeganStory = {
  id: "berlatih-satu",
  judul: "Dekomposisi: Ayo Berlatih nomor 1",
  sumber: "Buku Siswa hlm. 27–28; Panduan Guru hlm. 47",
  latar: "#F0FDF4",
  kutipan: [
    "Ayo Berlatih",
    "Salin dan jawablah soal berikut pada buku tulis kalian.",
    "1. Isilah titik-titik berikut dengan benar.",
    "6.482",
    "7.020",
    "2.001",
    "7.000",
    "9.999",
    "1. Isilah titik-titik dibawah ini.",
  ],
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Ayo Berlatih nomor 1"), ...KEPALA()),
      tambah(idx(SUARA_B1, "Bilangan"), ...labelBaris(0)),
      tambah(idx(SUARA_B1, "contoh"), ...[0, 1, 2, 3].map((c) => selBaris(0, c))),
    ),
    k(
      SUARA_B2,
      tambah(0, ...labelBaris(1)),
      tambah(idx(SUARA_B2, "ribuan,"), selBaris(1, 0)),
      tambah(idx(SUARA_B2, "ratusan,"), selBaris(1, 1)),
      tambah(idx(SUARA_B2, "puluhan,"), selBaris(1, 2)),
      tambah(idx(SUARA_B2, "satuan."), selBaris(1, 3)),
    ),
    k(
      SUARA_B3,
      tambah(0, ...labelBaris(2)),
      tambah(idx(SUARA_B3, "ribuan,"), selBaris(2, 0)),
      tambah(idx(SUARA_B3, "ratusan,"), selBaris(2, 1)),
      tambah(idx(SUARA_B3, "puluhan,"), selBaris(2, 2)),
      tambah(idx(SUARA_B3, "satuan."), selBaris(2, 3)),
    ),
    k(
      SUARA_B4,
      tambah(0, ...labelBaris(3)),
      tambah(idx(SUARA_B4, "ribuan,"), selBaris(3, 0)),
      tambah(idx(SUARA_B4, "semuanya"), selBaris(3, 1), selBaris(3, 2), selBaris(3, 3)),
    ),
    k(
      SUARA_B5,
      tambah(0, ...labelBaris(4)),
      tambah(idx(SUARA_B5, "ribuan,"), selBaris(4, 0)),
      tambah(idx(SUARA_B5, "ratusan,"), selBaris(4, 1)),
      tambah(idx(SUARA_B5, "puluhan,"), selBaris(4, 2)),
      tambah(idx(SUARA_B5, "satuan."), selBaris(4, 3)),
    ),
    k(
      SUARA_B6,
      tambah(idx(SUARA_B6, "Sembilan"), teks("bq", 150, 168, "9.000 + 900 + 90 + 9 = 9.999", 12, W.biru)),
      tambah(idx(SUARA_B6, "sama"), emo("br", 270, 170, "✅", 22)),
    ),
  ],
};
