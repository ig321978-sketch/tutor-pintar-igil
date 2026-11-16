import type { AdeganStory } from "./logika-story";
import { W, bulat, emo, judul, kalimat, kartu, kolomSusun, susun, tabel, tabelNilaiTempat, teks } from "./k5b1d-gambar";
import { bersih, k, tambah, ubah } from "./k5b1d-bantu";
import { kutipanLokal } from "./kutipan-lokal";

/* ------------------------------ 1. Pembuka Sub-Bab D (Panduan Guru hlm. 32) ------------------------------ */
export const ADEGAN_PEMBUKA_D: AdeganStory = {
  id: "pembuka-d",
  judul: "Pembuka Sub-Bab D: operasi hitung pada bilangan cacah sampai 100.000",
  sumber: "Panduan Guru hlm. 32–33",
  latar: "#F0F9FF",
  kutipan: kutipanLokal("k5b1d-materi-1.ts:1"),
  ketukan: [
    k(
      "Sub-Bab D, operasi hitung pada bilangan cacah sampai seratus ribu, adalah penutup Bab satu. Peserta didik diharapkan dapat menjumlah, mengurang, mengalikan, membagi, dan memecahkan masalah.",
      tambah(0, judul("Sub-Bab D: penutup bab"), ...kartu("d0", 30, 28, 240, 26, W.langit, ["D. Operasi hitung sampai 100.000"], 9.2)),
      tambah("menjumlah", bulat("o1", 45, 92, 17, W.hijauMuda), teks("o1s", 45, 98.5, "+", 18, W.biru), teks("o1l", 45, 124, "jumlah", 8.6, W.biru)),
      tambah("mengurang,", bulat("o2", 115, 92, 17, W.merahMuda), teks("o2s", 115, 98.5, "−", 18, W.biru), teks("o2l", 115, 124, "kurang", 8.6, W.biru)),
      tambah("mengalikan,", bulat("o3", 185, 92, 17, W.krem), teks("o3s", 185, 98.5, "×", 18, W.biru), teks("o3l", 185, 124, "kali", 8.6, W.biru)),
      tambah("membagi,", bulat("o4", 255, 92, 17, W.pink), teks("o4s", 255, 98.5, "÷", 18, W.biru), teks("o4l", 255, 124, "bagi", 8.6, W.biru)),
      tambah("memecahkan", ...kartu("o5", 50, 148, 200, 34, W.jingga, ["pecahkan masalah"], 9.6)),
    ),
    k(
      "Alat yang disiapkan hanya alat tulis dan kertas. Guru membuka dengan bertanya: bagaimana operasi bilangan dilakukan di kelas empat, dan apa gunanya sehari-hari?",
      bersih(0),
      tambah(0, judul("Persiapan dan apersepsi")),
      tambah("tulis", emo("al1", 80, 80, "✏", 34), teks("al1t", 80, 100, "alat tulis", 8.6, W.biru)),
      tambah("kertas.", emo("al2", 150, 80, "📄", 34), teks("al2t", 150, 100, "kertas", 8.6, W.biru)),
      tambah("bertanya:", ...kartu("ap", 20, 120, 260, 44, W.krem, ["Kelas IV: bagaimana operasi bilangan?", "Apa gunanya sehari-hari?"], 9)),
      tambah("gunanya", emo("tn", 240, 80, "❓", 30)),
    ),
    k(
      "Pemanasan: guru mengajak mengulang nilai tempat, cara membaca, dan cara menulis bilangan. Misalnya lima puluh tujuh ribu lima ratus disusun menurut puluh ribuan, ribuan, ratusan, puluhan, dan satuan.",
      bersih(0),
      tambah(0, judul("Pemanasan: nilai tempat")),
      tambah("Misalnya", teks("cn", 150, 52, "57.500", 18, W.merah)),
      tambah("disusun", ...tabelNilaiTempat("nt", 6, 76, [["Bilangan", 57500]])),
    ),
    k(
      "Eksplorasi di sub-bab ini mencoba operasi bilangan sampai seratus ribu dengan berbagai cara. Di akhir, peserta didik berpikir kritis dan kreatif.",
      bersih(0),
      tambah(0, judul("Tujuan kegiatan")),
      tambah("mencoba", ...kartu("t1", 20, 34, 260, 34, W.hijauMuda, ["percobaan dan eksplorasi"], 9.4)),
      tambah("seratus", ...kartu("t2", 20, 80, 260, 34, W.langit, ["operasi bilangan sampai 100.000"], 9.4)),
      tambah("berpikir", ...kartu("t3", 20, 126, 260, 34, W.pink, ["berpikir kritis dan kreatif"], 9.4)),
    ),
  ],
};

/* ------------------------------ 2. Eksplorasi 1.4: uang bakti sosial (Buku Siswa hlm. 17) ------------------------------ */
export const ADEGAN_BAKTI: AdeganStory = {
  id: "eks-14-cerita",
  judul: "Uang Kira untuk bakti sosial",
  sumber: "Materi: menjumlah uang bakti sosial",
  latar: "#FFF7ED",
  kutipan: kutipanLokal("k5b1d-materi-1.ts:2"),
  ketukan: [
    k(
      "Perhatikan cerita ini. SD Pancasila mengadakan bakti sosial di panti asuhan. Ibu memberi Kira uang lima puluh tujuh ribu lima ratus rupiah, dan Ayah dua puluh dua ribu rupiah.",
      tambah(0, judul("Uang bakti sosial"), ...kartu("bs", 14, 28, 272, 26, W.krem, ["Bakti sosial di panti asuhan SD Pancasila"], 8.8)),
      tambah("Ibu", emo("e1", 150, 168, "💰", 30), ...kartu("ib", 14, 70, 130, 56, W.merahMuda, ["Uang dari Ibu", "Rp57.500"], 9.6)),
      tambah("Ayah", ...kartu("ay", 156, 70, 130, 56, W.hijauMuda, ["Uang dari Ayah", "Rp22.000"], 9.6)),
    ),
    k(
      "Pertanyaannya: berapakah uang Kira untuk keperluan bakti sosial, dan bagaimana cara Kira mengetahui jumlahnya? Kalimat matematikanya menggabungkan dua uang, jadi berupa penjumlahan.",
      bersih(0),
      tambah(0, judul("Kalimat matematikanya")),
      tambah("Pertanyaannya:", teks("q1", 62, 96, "57.500", 15, W.merah)),
      tambah("menggabungkan", teks("q2", 124, 96, "+", 15, W.hitam), teks("q3", 188, 96, "22.000", 15, W.hijau)),
      tambah("penjumlahan.", teks("q4", 240, 96, "=", 15, W.hitam), teks("q5", 270, 96, "?", 15, W.merah)),
      tambah("jadi", ...kartu("gb", 40, 128, 220, 34, W.langit, ["gabung dua uang: penjumlahan"], 9.4)),
    ),
    k(
      "Coba kamu hitung: berapa jumlah uang dari Ibu dan Ayah? Ada dua cara: cara Halim yang menguraikan, dan cara Igil yang bersusun.",
      bersih(0),
      tambah(0, judul("Dua cara menghitung")),
      tambah("Coba", emo("tk", 150, 66, "🤔", 32)),
      tambah("Halim", ...kartu("cy", 14, 86, 130, 50, W.merahMuda, ["Cara Halim", "menguraikan"], 9.6)),
      tambah("Igil", ...kartu("cl", 156, 86, 130, 50, W.hijauMuda, ["Cara Igil", "bersusun"], 9.6)),
    ),
  ],
};

/* ------------------------------ 3. Eksplorasi 1.4: Cara Halim dan Cara Igil (Buku Siswa hlm. 18) ------------------------------ */
const LJ = tabelNilaiTempat("lj", 6, 91, [["Jumlah", 79500]], false);
export const ADEGAN_CARA: AdeganStory = {
  id: "eks-14-cara",
  judul: "Cara Halim dan cara Igil",
  sumber: "Materi: menjumlah dengan dua cara",
  latar: "#F0FDF4",
  kutipan: kutipanLokal("k5b1d-materi-1.ts:3"),
  ketukan: [
    k(
      "Cara Halim menguraikan bilangan menurut nilai tempat. Lima puluh tujuh ribu lima ratus sama dengan lima puluh ribu ditambah tujuh ribu ditambah lima ratus.",
      tambah(0, judul("Cara Halim: uraikan"), teks("ly", 150, 40, "Uang dari Ibu", 8.8, W.biru)),
      tambah("Lima", teks("u1", 150, 58, "57.500 = 50.000 + 7.000 + 500 + 0 + 0", 9.4, W.merah)),
    ),
    k(
      "Uang dari Ayah dua puluh dua ribu sama dengan dua puluh ribu ditambah dua ribu. Dua uraian itu kini dijumlahkan menurut nilai tempat yang sama.",
      tambah(0, teks("la", 150, 84, "Uang dari Ayah", 8.8, W.biru)),
      tambah("dua@1", teks("u2", 150, 102, "22.000 = 20.000 + 2.000 + 0 + 0 + 0", 9.4, W.hijau)),
      tambah("dijumlahkan", teks("lj", 150, 128, "jumlahkan tiap nilai tempat", 8.8, W.coklat)),
    ),
    k(
      "Puluh ribuan lima puluh ribu ditambah dua puluh ribu, ribuan tujuh ribu ditambah dua ribu, ratusan lima ratus. Jadi tujuh puluh sembilan ribu lima ratus.",
      bersih(0),
      tambah(0, judul("Cara Halim: jumlahkan")),
      tambah("Puluh", teks("j1", 150, 52, "(50.000 + 20.000) + (7.000 + 2.000) + (500 + 0) = 79.500", 7.6, W.merah)),
      tambah("ratusan", teks("j2", 150, 90, "70.000 + 9.000 + 500 = 79.500", 11, W.hijau)),
      tambah("Jadi", ...kartu("jh", 60, 118, 180, 40, W.krem, ["Rp79.500", "uang Kira"], 11)),
    ),
    k(
      "Cara Igil memakai bersusun pendek. Angka disusun lurus menurut kolom nilai tempat. Ibu lima, tujuh, lima, nol, nol, dan Ayah dua, dua, nol, nol, nol.",
      bersih(0),
      tambah(0, judul("Cara Igil: bersusun pendek")),
      tambah("disusun", ...tabelNilaiTempat("lk", 6, 40, [["Ibu", 57500], ["Ayah", 22000]])),
    ),
    k(
      "Jumlahkan dari kanan. Satuan nol, puluhan nol, ratusan lima, ribuan tujuh ditambah dua sembilan, puluh ribuan lima ditambah dua tujuh. Hasilnya tujuh puluh sembilan ribu lima ratus.",
      tambah("Jumlahkan", ...LJ.filter((o) => o.t === "kotak" || o.id === "lj-t00")),
      tambah("Satuan", ...LJ.filter((o) => o.id === "lj-t05")),
      tambah("puluhan", ...LJ.filter((o) => o.id === "lj-t04")),
      tambah("ratusan", ...LJ.filter((o) => o.id === "lj-t03")),
      tambah("ribuan@1", ...LJ.filter((o) => o.id === "lj-t02")),
      tambah("ribuan@2", ...LJ.filter((o) => o.id === "lj-t01")),
      tambah("Hasilnya", teks("lj-cap", 150, 135, "79.500", 22, W.hijau), ...kartu("lj-n", 70, 150, 160, 34, W.krem, ["57.500 + 22.000 = 79.500"], 9.6)),
    ),
  ],
};

/* ------------------------------ 4. Ayo Berdiskusi dan Ayo Berlatih: ayam taliwang (Buku Siswa hlm. 19 sampai 20) ------------------------------ */
const SP = susun("sp", 108, 62, "+", 32500, 13250);
const SQ = susun("sq", 108, 62, "−", 47900, 45750);
export const ADEGAN_LUKAS: AdeganStory = {
  id: "berlatih-lukas",
  judul: "Latihan: ayam taliwang dan plencing kangkung",
  sumber: "Materi: menjumlah dan mengurang uang",
  latar: "#FFFBEB",
  kutipan: kutipanLokal("k5b1d-materi-1.ts:4"),
  ketukan: [
    k(
      "Mari berdiskusi: cerita tadi penjumlahan. Bagaimana jika pengurangan? Lalu coba latihan ini: Igil di Lombok makan ayam taliwang tiga puluh dua ribu lima ratus dan plencing kangkung tiga belas ribu dua ratus lima puluh.",
      tambah(0, judul("Berdiskusi dan latihan"), emo("dk", 40, 66, "💬", 30)),
      tambah("pengurangan?", ...kartu("dq", 70, 44, 216, 32, W.langit, ["pengurangan: caranya sama?"], 9)),
      tambah("ayam", emo("ay", 40, 126, "🍗", 28)),
      tambah("ayam", ...tabel("mn", 70, 92, [110, 106], [["Menu", "Harga (Rp)"], ["Ayam Taliwang", "32.500"], ["Plencing Kangkung", "13.250"]], 18, 8.4)),
    ),
    k(
      "Pertanyaan satu: uang Igil empat puluh tujuh ribu sembilan ratus rupiah. Apakah bersisa? Pertanyaan dua: kalimat matematikanya tiga puluh dua ribu lima ratus ditambah tiga belas ribu dua ratus lima puluh.",
      bersih(0),
      tambah(0, judul("Dua pertanyaan pertama")),
      tambah("empat", ...kartu("uu", 60, 32, 180, 36, W.krem, ["Uang Igil Rp47.900"], 10.4)),
      tambah("Pertanyaan@2", kalimat("ks", 150, 112, 32500, "+", 13250, undefined, 14, W.hitam), teks("ks2", 150, 134, "= ?", 14, W.merah)),
    ),
    k(
      "Pertanyaan tiga memakai bersusun pendek. Satuan nol tambah nol, nol. Puluhan nol tambah lima, lima. Ratusan lima tambah dua, tujuh. Ribuan dua tambah tiga, lima. Puluh ribuan tiga tambah satu, empat.",
      bersih(0),
      tambah(0, judul("Bersusun pendek")),
      tambah(0, ...[...SP.atas, ...SP.bawah, ...SP.alat]),
      tambah("Satuan", ...kolomSusun(SP, 0), teks("st", 232, 78, "0 + 0 = 0", 10, W.merah)),
      tambah("Puluhan", ...kolomSusun(SP, 1)),
      ubah("Puluhan", { id: "st", isi: "0 + 5 = 5" }),
      tambah("Ratusan", ...kolomSusun(SP, 2)),
      ubah("Ratusan", { id: "st", isi: "5 + 2 = 7" }),
      tambah("Ribuan@1", ...kolomSusun(SP, 3)),
      ubah("Ribuan@1", { id: "st", isi: "2 + 3 = 5" }),
      tambah("Ribuan@2", ...kolomSusun(SP, 4)),
      ubah("Ribuan@2", { id: "st", isi: "3 + 1 = 4" }),
    ),
    k(
      "Jumlahnya empat puluh lima ribu tujuh ratus lima puluh rupiah. Uang Igil empat puluh tujuh ribu sembilan ratus, jadi uangnya bersisa. Berapa sisanya?",
      tambah("Jumlahnya", kalimat("kt", 232, 130, 32500, "+", 13250, 45750, 6.6, W.hijau)),
      tambah("bersisa.", teks("ds", 232, 150, "47.900 > 45.750", 7.6, W.hitam), teks("ds2", 232, 168, "bersisa", 11, W.merah)),
    ),
    k(
      "Uang Igil empat puluh tujuh ribu sembilan ratus diuraikan menurut nilai tempat, begitu pula yang dibayarkan, empat puluh lima ribu tujuh ratus lima puluh. Lalu kedua uraian dikurangkan.",
      bersih(0),
      tambah(0, judul("Susun panjang")),
      tambah("Uang", teks("w1", 150, 56, "47.900 = 40.000 + 7.000 + 900 + 0 + 0", 9.4, W.hijau)),
      tambah("dibayarkan,", teks("w2", 150, 84, "45.750 = 40.000 + 5.000 + 700 + 50 + 0", 9.4, W.merah)),
      tambah("dikurangkan.", ...kartu("w3", 50, 112, 200, 34, W.krem, ["kurangkan kedua uraian"], 9.6)),
    ),
    k(
      "Hitung dari kanan. Satuan nol kurang nol, nol. Puluhan nol kurang lima tidak cukup, pinjam satu ratusan, sepuluh kurang lima, lima. Ratusan tinggal delapan kurang tujuh, satu. Ribuan dua. Sisanya dua ribu seratus lima puluh rupiah.",
      bersih(0),
      tambah(0, judul("Kurangkan tiap kolom")),
      tambah(0, ...[...SQ.atas, ...SQ.bawah, ...SQ.alat]),
      tambah("Satuan", ...kolomSusun(SQ, 0), teks("sk", 232, 78, "0 − 0 = 0", 10, W.merah)),
      tambah("Puluhan", ...kolomSusun(SQ, 1)),
      ubah("Puluhan", { id: "sk", isi: "10 − 5 = 5" }),
      tambah("Ratusan@2", ...kolomSusun(SQ, 2)),
      ubah("Ratusan@2", { id: "sk", isi: "8 − 7 = 1" }),
      tambah("Ribuan", ...kolomSusun(SQ, 3), ...kolomSusun(SQ, 4)),
      ubah("Ribuan", { id: "sk", isi: "7 − 5 = 2" }),
      tambah("Sisa", kalimat("kq", 232, 130, 47900, "−", 45750, 2150, 6.6, W.hijau)),
    ),
  ],
};
