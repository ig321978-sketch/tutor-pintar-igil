import type { AdeganStory, Obj } from "./logika-story";
import { W, bulat, busurJam, busurSudut, jam, judul, kartu, kaki, kotak, sudutDua, tabel, teks } from "./k5b6c-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k5b6c-bantu";

/* ------------------------------ 9. Jenis sudut lain: refleks, nol, lurus, penuh (hlm. 180-181) ------------------------------ */
export const ADEGAN_JENIS_LAIN: AdeganStory = {
  id: "jenis-lain",
  judul: "Sudut refleks, sudut nol, sudut lurus, dan sudut penuh",
  sumber: "Buku Siswa hlm. 180–181",
  latar: "#FDF4FF",
  kutipan: [
    "Tahukah kalian?",
    "Biasanya kita",
    "mengukur sudut bagian",
    "dalam",
    "Bagian sudut yang di luar juga disebut sudut dan ukurannya",
    "dapat kita ukur",
    "Sudut seperti pada Gambar 6.11 disebut sudut",
    "adalah sudut yang besarnya lebih dari 180",
    "dan kurang dari",
    "360",
    "Jenis sudut lainnya dapat dilihat pada penjelasan berikut",
    "Sudut nol",
    "Sudut yang besarnya 0",
    "Sudut lurus",
    "Sudut yang besarnya 180",
    "Sudut penuh",
    "Sudut yang besarnya 360",
  ],
  ketukan: [
    k(
      "Tahukah kalian? Biasanya kita mengukur sudut bagian dalam. Tetapi bagian sudut yang di luar juga disebut sudut, dan ukurannya dapat kita ukur.",
      tambah("Tahukah", judul("Tahukah kalian?")),
      tambah("Biasanya", ...sudutDua("jd", 95, 150, 80, 20, 140, W.biru, 2.6)),
      tambah("dalam.", busurSudut("jd", 95, 150, 26, 20, 140, W.hijau, { tebal: 2.6 }), teks("jd-m", 95, 118, "dalam", 9, W.hijau)),
      tambah("luar", busurSudut("jl", 95, 150, 40, 140, 380, W.merah, { tebal: 2.6, putus: true }), teks("jl-m", 105, 200, "luar", 9, W.merah)),
    ),
    k(
      "Sudut bagian luar itu disebut sudut refleks, yaitu sudut yang besarnya lebih dari seratus delapan puluh derajat dan kurang dari tiga ratus enam puluh derajat.",
      sorotkan("refleks,", "jl-w"),
      tambah("refleks,", ...kartu("rk", 190, 60, 104, 62, W.merahMuda, ["sudut refleks", "lebih dari 180°", "kurang dari 360°"], 8.6)),
    ),
    k(
      "Ada tiga jenis lain. Sudut nol besarnya nol derajat. Sudut lurus besarnya seratus delapan puluh derajat. Sudut penuh besarnya tiga ratus enam puluh derajat.",
      bersih(0),
      tambah(0, judul("tiga jenis sudut lainnya")),
      tambah("nol", ...sudutDua("jz", 30, 130, 44, 0, 0, W.biru, 2.6), kaki("jz-c", 30, 130, 44, 0, W.merah, 1.2), teks("jz-m", 50, 160, "sudut nol", 9, W.hijau), teks("jz-n", 50, 176, "0°", 10, W.merah)),
      tambah("lurus", ...sudutDua("jr", 150, 130, 44, 0, 180, W.biru, 2.6), busurSudut("jr", 150, 130, 16, 0, 180, W.hijau, { tebal: 2.2 }), teks("jr-m", 150, 160, "sudut lurus", 9, W.hijau), teks("jr-n", 150, 176, "180°", 10, W.merah)),
      tambah("penuh", bulat("jp-c", 250, 130, 24, "none", W.biru, { tebal: 2 }), kaki("jp-a", 250, 130, 24, 0, W.biru, 2.6), teks("jp-m", 250, 160, "sudut penuh", 9, W.hijau), teks("jp-n", 250, 176, "360°", 10, W.merah)),
    ),
    k(
      "Jadi sekarang ada tujuh jenis sudut. Urutannya dari yang terkecil: nol, lancip, siku-siku, tumpul, lurus, refleks, dan penuh.",
      bersih(0),
      tambah(0, judul("tujuh jenis sudut, dari kecil ke besar")),
      tambah("nol,", kotak("ga1", 20, 96, 65, 16, W.hijauMuda, W.biru, { rx: 0 }), kotak("ga2", 85, 96, 65, 16, W.langit, W.biru, { rx: 0 }), kotak("ga3", 150, 96, 130, 16, W.pink, W.biru, { rx: 0 }), teks("ga-0", 20, 88, "0°", 8.6, W.merah), teks("ga-90", 85, 88, "90°", 8.6, W.merah), teks("ga-180", 150, 88, "180°", 8.6, W.merah), teks("ga-360", 280, 88, "360°", 8.6, W.merah)),
      tambah("lancip,", teks("ga-l", 52, 128, "lancip", 8.6, W.hijau)),
      tambah("tumpul,", teks("ga-t", 118, 128, "tumpul", 8.6, W.hijau)),
      tambah("refleks,", teks("ga-r", 215, 128, "refleks", 8.6, W.hijau)),
      tambah("nol,", teks("ga-nol", 20, 150, "nol", 8.6, W.coklat)),
      tambah("siku-siku,", teks("ga-s", 85, 150, "siku-siku", 8.6, W.coklat)),
      tambah("lurus,", teks("ga-u", 150, 150, "lurus", 8.6, W.coklat)),
      tambah("penuh.", teks("ga-p", 280, 150, "penuh", 8.6, W.coklat)),
    ),
  ],
};

/* ------------------------------ 10. Tantangan: sudut refleks dua cara (hlm. 181, Panduan Guru hlm. 265-266) ------------------------------ */
export const ADEGAN_TANTANGAN: AdeganStory = {
  id: "tantangan-refleks",
  judul: "Tantangan: mengukur sudut refleks dengan dua cara",
  sumber: "Buku Siswa hlm. 181; Panduan Guru hlm. 265–266",
  latar: "#FFF7ED",
  kutipan: [
    "Tantangan",
    "Berapa ukuran sudut berikut?",
    "Mengukur sudut",
    "dapat dilakukan",
    "dengan dua",
    "Cara Pertama",
    "pengukuran",
    "dilakukan secara bertahap",
    "buat garis bantu sehingga",
    "membentuk sudut lurus yang besarnya",
    "Hasil pengukuran bagian sudut yang kedua adalah 60",
    "Cara Kedua",
    "Pengukuran di atas menunjukkan besar",
  ],
  ketukan: [
    k(
      "Tantangan: berapa ukuran sudut refleks pada gambar? Mengukur sudut refleks bisa dilakukan dengan dua cara.",
      tambah("Tantangan:", judul("Tantangan: sudut refleks")),
      tambah("berapa", ...sudutDua("tc", 110, 150, 84, 0, 120, W.biru, 2.6), busurSudut("tc", 110, 150, 34, 120, 360, W.merah, { tebal: 2.6 })),
      tambah("ukuran", teks("tc-n", 110, 118, "?", 18, W.merah)),
      tambah("cara.", ...kartu("dc", 206, 70, 84, 32, W.krem, ["dua cara", "mengukurnya"], 8.8)),
    ),
    k(
      "Cara pertama, ukur bertahap. Buat garis bantu sehingga membentuk sudut lurus seratus delapan puluh derajat. Lalu ukur sisanya, hasilnya enam puluh derajat.",
      hapus(0, "dc-k", "dc-t0", "dc-t1"),
      tambah("garis", kaki("tg", 110, 150, 84, 180, W.hijau, 2, { putus: true })),
      tambah("lurus", busurSudut("ta", 110, 150, 20, 180, 360, W.hijau, { tebal: 2.2 }), teks("ta-n", 110, 182, "180°", 9, W.hijau)),
      tambah("sisanya,", busurSudut("tb", 110, 150, 20, 120, 180, W.ungu, { tebal: 2.2 }), teks("tb-n", 70, 126, "60°", 9, W.ungu)),
      tambah("Cara", ...kartu("c1", 206, 36, 88, 28, W.krem, ["Cara 1: bertahap"], 8.4)),
    ),
    k(
      "Jadi besar sudut refleks adalah seratus delapan puluh ditambah enam puluh, yaitu dua ratus empat puluh derajat.",
      ubah("derajat.", { id: "tc-n", isi: "240°", u: 12 }),
      tambah("ditambah", ...kartu("fm", 188, 80, 106, 40, W.hijauMuda, ["180° + 60° = 240°"], 9)),
    ),
    k(
      "Cara kedua, ukur dulu sudut dalamnya, hasilnya seratus dua puluh derajat. Satu putaran penuh tiga ratus enam puluh, jadi sudut refleks tiga ratus enam puluh kurang seratus dua puluh, yaitu dua ratus empat puluh.",
      bersih(0),
      tambah(0, judul("cara kedua: dari sudut dalam")),
      tambah("kedua,", ...sudutDua("tq", 110, 150, 84, 0, 120, W.biru, 2.6), busurSudut("td", 110, 150, 22, 0, 120, W.hijau, { tebal: 2.4 }), teks("td-n", 138, 130, "120°", 9, W.hijau)),
      tambah("putaran", busurSudut("tr", 110, 150, 36, 120, 360, W.merah, { tebal: 2.4, putus: true }), teks("tq-t", 68, 180, "satu putaran 360°", 8.6, W.coklat)),
      tambah("kurang", ...kartu("f2", 188, 70, 106, 40, W.pink, ["360° - 120° = 240°"], 8.6)),
    ),
    k(
      "Kedua cara memberi hasil yang sama, yaitu dua ratus empat puluh derajat. Kita boleh memilih cara yang paling kita pahami.",
      bersih(0),
      tambah(0, judul("dua cara, satu hasil")),
      tambah("Kedua", ...kartu("w1", 30, 40, 240, 44, W.hijauMuda, ["Cara 1: bertahap", "180° + 60° = 240°"], 9.6)),
      tambah("sama,", ...kartu("w2", 30, 100, 240, 44, W.pink, ["Cara 2: dari sudut dalam", "360° - 120° = 240°"], 9.6)),
      tambah("memilih", ...kartu("w3", 70, 160, 160, 30, W.emas, ["sudut refleks = 240°"], 9.6)),
    ),
  ],
};

/* ------------------------------ 11 dan 12. Ayo Berlatih (hlm. 182): jam analog ------------------------------ */
const POSISI_JAM = [38, 113, 188, 263];
const HURUF = ["a", "b", "c", "d"];

/** Empat jam sejajar. Id jam `${id}{a-d}`; label huruf `${id}{a-d}-h`. */
const barisJam = (id: string, waktu: [number, number][]): Obj[] =>
  waktu.flatMap(([j, m], i) => [...jam(`${id}${HURUF[i]}`, POSISI_JAM[i], 96, 32, j, m), teks(`${id}${HURUF[i]}-h`, POSISI_JAM[i], 52, HURUF[i], 10, W.ungu)]);
const labelWaktu = (id: string, i: number, teksWaktu: string): Obj => teks(`${id}${HURUF[i]}-wk`, POSISI_JAM[i], 146, `Pukul ${teksWaktu}`, 7.6, W.biru);
const hasilJam = (id: string, i: number, j: number, m: number, besar: number): Obj[] => [
  busurJam(`${id}${HURUF[i]}`, POSISI_JAM[i], 96, 15, j, m, W.merah, { tebal: 2.2 }),
  teks(`${id}${HURUF[i]}-n`, POSISI_JAM[i], 162, `${besar}°`, 10, W.merah),
];

const SOAL_1: [number, number][] = [[1, 0], [9, 0], [4, 0], [1, 30]];

export const ADEGAN_BERLATIH_1: AdeganStory = {
  id: "berlatih-jam-1",
  judul: "Ayo Berlatih nomor 1: mengukur sudut jarum jam",
  sumber: "Buku Siswa hlm. 182; Panduan Guru hlm. 267",
  latar: "#F0FDFA",
  kutipan: [
    "Ukurlah sudut terkecil yang dibentuk oleh jarum jam pendek",
    "dan panjang pada gambar berikut",
    "Pukul 01.00",
    "Besar sudut adalah",
    "Pukul 09.00",
    "Pukul 04.00",
    "Pukul 01.30",
    "Besar sudut adalah 30",
    "Besar sudut adalah 90",
    "Besar sudut adalah 120",
    "Besar sudut adalah 135",
  ],
  ketukan: [
    k(
      "Ayo Berlatih nomor satu. Ukur sudut terkecil yang dibentuk jarum jam pendek dan jarum jam panjang pada empat jam.",
      tambah("Ayo", judul("Ayo Berlatih 1: sudut jarum jam")),
      tambah("Ukur", ...barisJam("jm", SOAL_1)),
      tambah("empat", teks("kk", 150, 188, "jarum pendek (hijau), jarum panjang (merah)", 8, W.coklat)),
    ),
    k(
      "Jam a menunjukkan pukul satu. Jarum panjang di angka dua belas, jarum pendek di angka satu, dan sudut terkecilnya tiga puluh derajat.",
      tambah("Jam", labelWaktu("jm", 0, "01.00")),
      tambah("sudut", ...hasilJam("jm", 0, 1, 0, 30)),
    ),
    k(
      "Jam b pukul sembilan, sudut terkecilnya sembilan puluh derajat, yaitu sudut siku-siku. Jam c pukul empat, sudut terkecilnya seratus dua puluh derajat.",
      tambah("Jam", labelWaktu("jm", 1, "09.00")),
      tambah("derajat,", ...hasilJam("jm", 1, 9, 0, 90)),
      tambah("Jam@2", labelWaktu("jm", 2, "04.00")),
      tambah("derajat.", ...hasilJam("jm", 2, 4, 0, 120)),
    ),
    k(
      "Jam d pukul satu lewat tiga puluh menit. Jarum pendek berada di tengah angka satu dan dua, jarum panjang di angka enam, sehingga sudutnya seratus tiga puluh lima derajat.",
      tambah("Jam", labelWaktu("jm", 3, "01.30")),
      tambah("sehingga", ...hasilJam("jm", 3, 1, 30, 135)),
    ),
    k(
      "Hasil nomor satu: tiga puluh, sembilan puluh, seratus dua puluh, dan seratus tiga puluh lima derajat. Hasil ini cocok dengan kunci jawaban di Panduan Guru.",
      bersih(0),
      tambah(0, judul("hasil nomor 1")),
      tambah("Hasil", ...tabel("tj", 30, 34, [50, 110, 80], [["Jam", "Waktu", "Sudut"], ["a", "Pukul 01.00", "30°"], ["b", "Pukul 09.00", "90°"], ["c", "Pukul 04.00", "120°"], ["d", "Pukul 01.30", "135°"]], 22, 9.4)),
      tambah("kunci", teks("tj-ok", 150, 178, "cocok dengan kunci Panduan Guru ✓", 8.6, W.hijau)),
    ),
  ],
};

const SOAL_2: [number, number][] = [[10, 0], [15, 0], [7, 0], [4, 30]];

export const ADEGAN_BERLATIH_2: AdeganStory = {
  id: "berlatih-jam-2",
  judul: "Ayo Berlatih nomor 2: sudut terkecil pada empat waktu",
  sumber: "Buku Siswa hlm. 182; Panduan Guru hlm. 267–268",
  latar: "#FFFBEB",
  kutipan: [
    "Tentukan besar sudut terkecil yang dibentuk oleh jarum pendek",
    "dan jarum panjang pada jam saat menunjukkan pukul",
    "10.00",
    "15.00",
    "07.00",
    "04.30",
    "Besar sudut terkecil yang dibentuk",
    "oleh dua jarum jam adalah 60",
    "oleh dua jarum jam adalah 90",
    "oleh dua jarum jam adalah 150",
    "oleh dua jarum jam adalah 45",
  ],
  ketukan: [
    k(
      "Nomor dua, tentukan besar sudut terkecil yang dibentuk jarum jam pada pukul sepuluh, lima belas, tujuh, dan empat tiga puluh.",
      tambah("Nomor", judul("Ayo Berlatih 2: sudut terkecil")),
      tambah("sepuluh,", ...barisJam("jn", SOAL_2), labelWaktu("jn", 0, "10.00")),
      tambah("belas,", labelWaktu("jn", 1, "15.00")),
      tambah("tujuh,", labelWaktu("jn", 2, "07.00")),
      tambah("tiga", labelWaktu("jn", 3, "04.30")),
    ),
    k(
      "Pukul sepuluh, sudut terkecilnya enam puluh derajat. Pukul lima belas, yaitu pukul tiga sore, jarum pendek di angka tiga, sehingga sudutnya sembilan puluh derajat.",
      tambah("enam", ...hasilJam("jn", 0, 10, 0, 60)),
      tambah("sore,", teks("jn-s", 188, 188, "15.00 = pukul 3 sore", 8.2, W.coklat)),
      tambah("sehingga", ...hasilJam("jn", 1, 15, 0, 90)),
    ),
    k(
      "Pukul tujuh, sudut terkecilnya seratus lima puluh derajat. Pukul empat tiga puluh, sudut terkecilnya empat puluh lima derajat.",
      tambah("seratus", ...hasilJam("jn", 2, 7, 0, 150)),
      tambah("empat@2", ...hasilJam("jn", 3, 4, 30, 45)),
    ),
    k(
      "Pukul empat tiga puluh agak istimewa. Jarum pendek tidak tepat di angka empat, tetapi sudah di tengah antara angka empat dan lima, jadi sudutnya empat puluh lima derajat.",
      bersih(0),
      tambah(0, judul("pukul 04.30 diperbesar")),
      tambah("istimewa.", ...jam("jz", 105, 112, 66, 4, 30), teks("jz-wk", 105, 196, "Pukul 04.30", 8.6, W.biru)),
      tambah("tengah", ...kartu("jz-c1", 190, 60, 100, 44, W.hijauMuda, ["jarum pendek di", "tengah angka 4 dan 5"], 8.2)),
      tambah("sudutnya", busurJam("jz", 105, 112, 24, 4, 30, W.merah, { tebal: 2.4 }), teks("jz-n", 117, 143, "45°", 10, W.merah)),
    ),
    k(
      "Kunci Panduan Guru: enam puluh, sembilan puluh, seratus lima puluh, dan empat puluh lima derajat. Hasil kita sama dengan kunci itu.",
      bersih(0),
      tambah(0, judul("hasil nomor 2")),
      tambah("Kunci", ...tabel("tn", 30, 34, [50, 110, 80], [["Jam", "Waktu", "Sudut"], ["a", "Pukul 10.00", "60°"], ["b", "Pukul 15.00", "90°"], ["c", "Pukul 07.00", "150°"], ["d", "Pukul 04.30", "45°"]], 22, 9.4)),
      tambah("sama", teks("tn-ok", 150, 178, "sama dengan kunci Panduan Guru ✓", 8.6, W.hijau)),
    ),
  ],
};

/* ------------------------------ 13. Refleksi 4 dan 5, diferensiasi, dan penutup (hlm. 187, Panduan Guru hlm. 267) ------------------------------ */
export const ADEGAN_REFLEKSI_C: AdeganStory = {
  id: "refleksi-penutup",
  judul: "Refleksi pernyataan 4 dan 5, diferensiasi, dan penutup",
  sumber: "Buku Siswa hlm. 187; Panduan Guru hlm. 267",
  latar: "#F0F9FF",
  kutipan: [
    "Setelah mempelajari materi terkait sudut, isilah tabel berikut sesuai",
    "dengan pemahaman kalian",
    "Berilah tanda centang",
    "Aku dapat mengukur besar sudut dengan",
    "menggunakan busur derajat",
    "Aku dapat membandingkan besar sudut",
    "pertanyaan releksi nomor 4 dan 5",
    "peserta didik dengan kecepatan belajar tinggi",
    "mengerjakan latihan tanpa bantuan",
    "mendampingi peserta didik yang mengalami kesulitan",
  ],
  ketukan: [
    k(
      "Bagian akhir adalah refleksi. Buku Siswa meminta kita mengisi tabel dengan tanda centang. Pernyataan empat: aku dapat mengukur besar sudut dengan menggunakan busur derajat.",
      tambah("Bagian", judul("Refleksi: beri tanda centang")),
      tambah("empat:", ...kartu("p4", 10, 40, 280, 52, W.krem, ["4. Aku dapat mengukur besar sudut", "dengan menggunakan busur derajat"], 9.4)),
      tambah("dapat", kotak("y4", 190, 100, 40, 20, W.putih, W.biru, { rx: 3 }), teks("y4-t", 202, 114, "Ya", 9, W.biru), kotak("n4", 240, 100, 40, 20, W.putih, W.biru, { rx: 3 }), teks("n4-t", 260, 114, "Tidak", 8.4, W.biru)),
      tambah("derajat.", teks("y4-c", 219, 116, "✓", 12, W.hijau)),
    ),
    k(
      "Pernyataan lima: aku dapat membandingkan besar sudut. Jika masih ragu, ulangi mengukur kipas dan jam sampai kita yakin.",
      tambah("lima:", ...kartu("p5", 10, 132, 280, 34, W.langit, ["5. Aku dapat membandingkan besar sudut"], 9.4)),
      tambah("dapat", kotak("y5", 190, 172, 40, 20, W.putih, W.biru, { rx: 3 }), teks("y5-t", 202, 186, "Ya", 9, W.biru), kotak("n5", 240, 172, 40, 20, W.putih, W.biru, { rx: 3 }), teks("n5-t", 260, 186, "Tidak", 8.4, W.biru)),
      tambah("ragu,", teks("rg", 80, 186, "ragu? ulangi mengukur", 8.2, W.merah)),
      tambah("yakin.", teks("y5-c", 219, 188, "✓", 12, W.hijau)),
    ),
    k(
      "Panduan Guru juga menyarankan diferensiasi. Murid yang cepat belajar mengerjakan latihan tanpa bantuan, sementara guru mendampingi murid yang masih kesulitan.",
      bersih(0),
      tambah(0, judul("diferensiasi")),
      tambah("cepat", ...kartu("df1", 20, 40, 260, 54, W.hijauMuda, ["murid yang cepat belajar", "mengerjakan latihan tanpa bantuan"], 9.4)),
      tambah("guru", ...kartu("df2", 20, 112, 260, 54, W.pink, ["guru mendampingi murid", "yang masih mengalami kesulitan"], 9.4)),
    ),
    k(
      "Sebagai penutup, empat hal yang perlu diingat: busur derajat mengukur sudut, satuannya derajat, kaki yang berimpit dengan garis dasar menunjuk nol, dan sudut dibandingkan lewat angka derajatnya.",
      bersih(0),
      tambah(0, judul("empat hal yang diingat")),
      tambah("busur", ...kartu("e1", 12, 36, 134, 56, W.krem, ["alat ukur:", "busur derajat"], 9.4)),
      tambah("satuannya", ...kartu("e2", 154, 36, 134, 56, W.langit, ["satuan:", "derajat (°)"], 9.4)),
      tambah("berimpit", ...kartu("e3", 12, 104, 134, 56, W.hijauMuda, ["kaki berimpit garis", "dasar menunjuk 0°"], 9)),
      tambah("dibandingkan", ...kartu("e4", 154, 104, 134, 56, W.pink, ["membandingkan sudut", "= membandingkan derajat"], 9)),
    ),
  ],
};
