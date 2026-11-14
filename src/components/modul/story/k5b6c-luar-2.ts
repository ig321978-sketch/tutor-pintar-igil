import type { AdeganStory, Obj } from "./logika-story";
import { W, bulat, busurJam, busurSudut, garis, jam, judul, kartu, kaki, kipas, polar, sudutDua, teks } from "./k5b6c-gambar";
import { bersih, k, tambah } from "./k5b6c-bantu";

/* ------------------------------ LC5. Degree Measure: konsep ------------------------------ */
export const ADEGAN_LUAR_DERAJAT: AdeganStory = {
  id: "luar-derajat",
  judul: "Degree Measure: konsep",
  sumber: "Metode luar 3: derajat sebagai bagian dari satu putaran",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Metode ketiga, Degree Measure: besar sudut adalah seberapa jauh kaki sudut diputar, dan satu derajat adalah satu bagian dari tiga ratus enam puluh bagian satu putaran penuh.",
      tambah(0, judul("Degree Measure")),
      tambah("diputar,", bulat("dm-c", 90, 118, 46, W.putih, W.biru, { tebal: 2 }), kaki("dm-a", 90, 118, 46, 0, W.merah, 2.6)),
      tambah("derajat", ...kartu("dm1", 170, 70, 120, 34, W.krem, ["1° = 1/360 putaran"], 9.6)),
      tambah("penuh.", ...kartu("dm2", 170, 118, 120, 34, W.hijauMuda, ["1 putaran = 360°"], 9.6)),
    ),
    k(
      "Setengah putaran adalah seratus delapan puluh derajat, yaitu sudut lurus. Seperempat putaran adalah sembilan puluh derajat, yaitu sudut siku-siku.",
      bersih(0),
      tambah(0, judul("bagian dari satu putaran")),
      tambah("Setengah", bulat("h2-c", 80, 110, 40, W.putih, W.biru, { tebal: 1.6 }), kipas("h2", 80, 110, 40, 0, 180, W.langit), teks("h2-n", 80, 168, "1/2 putaran = 180°", 8.6, W.biru)),
      tambah("Seperempat", bulat("h1-c", 220, 110, 40, W.putih, W.biru, { tebal: 1.6 }), kipas("h1", 220, 110, 40, 0, 90, W.jingga), teks("h1-n", 220, 168, "1/4 putaran = 90°", 8.6, W.biru)),
    ),
    k(
      "Satu putaran penuh adalah tiga ratus enam puluh derajat, yaitu sudut penuh. Makin jauh kaki diputar, makin besar sudutnya.",
      bersih(0),
      tambah(0, judul("satu putaran penuh")),
      tambah("Satu", bulat("pp-c", 110, 112, 52, W.hijauMuda, W.biru, { tebal: 2 }), kaki("pp-a", 110, 112, 52, 0, W.merah, 2.6)),
      tambah("derajat,", teks("pp-n", 110, 118, "360°", 16, W.biru)),
      tambah("Makin", ...kartu("pp1", 190, 70, 100, 44, W.krem, ["makin jauh diputar", "makin besar sudut"], 8.6)),
    ),
    k(
      "Karena yang dihitung adalah putaran, panjang kaki tidak mengubah besar sudut. Itulah jawaban untuk salah paham di Panduan Guru tentang jarak ujung kaki.",
      bersih(0),
      tambah(0, judul("panjang kaki tidak mengubah sudut")),
      tambah("putaran,", ...sudutDua("dk1", 30, 150, 32, 5, 35, W.biru), busurSudut("dk1", 30, 150, 16, 5, 35, W.hijau, { tebal: 2.2 }), teks("dk1-n", 66, 148, "30°", 9, W.hijau)),
      tambah("panjang", ...sudutDua("dk2", 150, 150, 120, 5, 35, W.biru), busurSudut("dk2", 150, 150, 16, 5, 35, W.hijau, { tebal: 2.2 }), teks("dk2-n", 190, 148, "30°", 9, W.hijau)),
      tambah("jarak", teks("dk-s", 150, 190, "kaki berbeda panjang, sudut sama besar", 8.8, W.merah)),
    ),
  ],
};

/* ------------------------------ LC6. Degree Measure: penerapan ------------------------------ */
const lingkaran = (id: string, x: number, y: number, r: number): Obj => bulat(id, x, y, r, W.putih, W.biru, { tebal: 1.8 });

export const ADEGAN_LUAR_DERAJAT_TERAPAN: AdeganStory = {
  id: "luar-derajat-terapan",
  judul: "Degree Measure: penerapan pada sudut refleks, kipas, dan siku-siku",
  sumber: "Metode luar 3: contoh Tantangan dan kipas Buku Siswa hlm. 176–181",
  latar: "#ECFEFF",
  ketukan: [
    k(
      "Terapkan pada sudut refleks tantangan. Sudut dalamnya seratus dua puluh derajat. Seratus dua puluh dari tiga ratus enam puluh adalah sepertiga putaran.",
      tambah(0, judul("sudut dalam: sepertiga putaran")),
      tambah("Terapkan", lingkaran("dt-c", 75, 115, 50)),
      tambah("dalamnya", kipas("dt1", 75, 115, 50, 0, 120, W.hijauMuda), teks("dt1-n", 85, 100, "120°", 10, W.biru)),
      tambah("sepertiga", ...kartu("dtf", 150, 80, 140, 40, W.krem, ["120/360 = 1/3 putaran"], 9.2)),
    ),
    k(
      "Sisa putaran adalah dua pertiga, yaitu tiga ratus enam puluh kurang seratus dua puluh, sama dengan dua ratus empat puluh derajat.",
      tambah("Sisa", kipas("dt2", 75, 115, 50, 120, 360, W.pink, { z: -1 }), teks("dt2-n", 48, 140, "240°", 10, W.merah)),
      tambah("kurang", ...kartu("dtg", 150, 130, 140, 40, W.pink, ["360 - 120 = 240", "240/360 = 2/3 putaran"], 9)),
    ),
    k(
      "Kipas tiga di buku terbuka seratus tiga puluh lima derajat. Seratus tiga puluh lima dari tiga ratus enam puluh adalah tiga perdelapan putaran.",
      bersih(0),
      tambah(0, judul("kipas 3: tiga perdelapan putaran")),
      tambah("Kipas", lingkaran("dp-c", 75, 115, 50)),
      tambah("terbuka", kipas("dp1", 75, 115, 50, 0, 135, W.hijauMuda), teks("dp1-n", 82, 100, "135°", 10, W.biru)),
      tambah("perdelapan", ...kartu("dpf", 150, 90, 140, 40, W.krem, ["135/360 = 3/8 putaran"], 9.2)),
    ),
    k(
      "Sudut siku-siku adalah seperempat putaran, yaitu tiga ratus enam puluh dibagi empat, sama dengan sembilan puluh derajat.",
      bersih(0),
      tambah(0, judul("siku-siku: seperempat putaran")),
      tambah("siku-siku", lingkaran("ds-c", 75, 115, 50), kipas("ds1", 75, 115, 50, 0, 90, W.jingga), teks("ds1-n", 90, 100, "90°", 10, W.biru)),
      tambah("dibagi", ...kartu("dsf", 150, 90, 140, 50, W.krem, ["360 ÷ 4 = 90", "1/4 putaran"], 9.6)),
    ),
    k(
      "Dengan Degree Measure, membandingkan sudut berarti membandingkan putaran. Kipas tiga memutar paling jauh, kipas empat paling sedikit.",
      bersih(0),
      tambah(0, judul("membandingkan putaran keempat kipas")),
      tambah("Degree", lingkaran("dq1-c", 38, 100, 26), kipas("dq1", 38, 100, 26, 0, 105, W.jingga), teks("dq1-n", 38, 148, "105°", 9, W.biru), teks("dq1-l", 38, 162, "Kipas 1", 8.4, W.biru)),
      tambah("membandingkan", lingkaran("dq2-c", 113, 100, 26), kipas("dq2", 113, 100, 26, 0, 130, W.langit), teks("dq2-n", 113, 148, "130°", 9, W.biru), teks("dq2-l", 113, 162, "Kipas 2", 8.4, W.biru)),
      tambah("tiga", lingkaran("dq3-c", 188, 100, 26), kipas("dq3", 188, 100, 26, 0, 135, W.hijauMuda), teks("dq3-n", 188, 148, "135°", 9, W.biru), teks("dq3-l", 188, 162, "Kipas 3", 8.4, W.biru)),
      tambah("empat", lingkaran("dq4-c", 263, 100, 26), kipas("dq4", 263, 100, 26, 0, 85, W.pink), teks("dq4-n", 263, 148, "85°", 9, W.biru), teks("dq4-l", 263, 162, "Kipas 4", 8.4, W.biru)),
    ),
  ],
};

/* ------------------------------ LC7. Clock Face Division: konsep ------------------------------ */
const jariJam = (id: string, x: number, y: number, r: number): Obj[] => Array.from({ length: 12 }, (_, i) => garis(`${id}-sp${i + 1}`, x, y, polar(0, 0, r, 90 - (i + 1) * 30)[0], polar(0, 0, r, 90 - (i + 1) * 30)[1], W.abu, 0.9));

export const ADEGAN_LUAR_MUKA_JAM: AdeganStory = {
  id: "luar-muka-jam",
  judul: "Clock Face Division: konsep",
  sumber: "Metode luar 4: muka jam dibagi dua belas ruas",
  latar: "#FFF1F2",
  ketukan: [
    k(
      "Metode keempat, Clock Face Division: muka jam adalah lingkaran tiga ratus enam puluh derajat yang dibagi menjadi dua belas bagian sama.",
      tambah(0, judul("Clock Face Division")),
      tambah("lingkaran", ...jam("cd", 100, 118, 58, 12, 0)),
      tambah("dibagi", ...jariJam("cd", 100, 118, 58)),
      tambah("sama.", ...kartu("cdf", 190, 84, 100, 40, W.krem, ["360° ÷ 12 = 30°"], 10)),
    ),
    k(
      "Jarak dari satu angka ke angka berikutnya selalu tiga puluh derajat. Jadi sudut antara dua jarum adalah banyaknya jarak dikali tiga puluh.",
      tambah("satu", busurSudut("cs", 100, 118, 36, 60, 90, W.merah, { tebal: 3 }), teks("cs-n", 108, 96, "30°", 9, W.merah)),
      tambah("banyaknya", ...kartu("cdg", 190, 130, 100, 44, W.hijauMuda, ["sudut =", "jarak × 30°"], 9.6)),
    ),
    k(
      "Hitung jaraknya dari angka jarum pendek ke angka jarum panjang. Pilih arah yang lebih dekat, karena yang ditanya adalah sudut terkecil.",
      bersih(0),
      tambah(0, judul("dua aturan hitung")),
      tambah("Hitung", ...kartu("a1", 20, 40, 260, 44, W.krem, ["1. hitung jarak dari jarum pendek", "ke jarum panjang"], 9.4)),
      tambah("Pilih", ...kartu("a2", 20, 98, 260, 44, W.langit, ["2. pilih arah yang lebih dekat", "(sudut terkecil)"], 9.4)),
      tambah("terkecil.", ...kartu("a3", 20, 156, 260, 30, W.hijauMuda, ["jarak paling banyak: 6 ruas = 180°"], 9)),
    ),
    k(
      "Jika jarum pendek berada di antara dua angka, seperti pada pukul setengah, jaraknya bergeser setengah ruas, yaitu lima belas derajat.",
      bersih(0),
      tambah(0, judul("jarum pendek di antara dua angka")),
      tambah("antara", ...jam("ch", 95, 118, 54, 4, 30)),
      tambah("setengah", teks("ch-wk", 95, 196, "Pukul 04.30", 8.6, W.biru)),
      tambah("bergeser", ...kartu("chf", 180, 70, 112, 36, W.pink, ["30° ÷ 2 = 15°"], 10)),
      tambah("ruas,", ...kartu("chg", 180, 118, 112, 44, W.krem, ["jarum pendek di 4,5", "jarum panjang di 6"], 8.8)),
    ),
  ],
};

/* ------------------------------ LC8. Clock Face Division: penerapan ------------------------------ */
const POSISI = [38, 113, 188, 263];
const HURUF = ["a", "b", "c", "d"];
const WAKTU: [number, number][] = [[10, 0], [15, 0], [7, 0], [4, 30]];
const TEKS_WAKTU = ["10.00", "15.00", "07.00", "04.30"];
const RUMUS = ["2 × 30° = 60°", "3 × 30° = 90°", "5 × 30° = 150°", "1,5 × 30° = 45°"];

const jamKecil = (i: number): Obj[] => [...jam(`cj${HURUF[i]}`, POSISI[i], 96, 32, WAKTU[i][0], WAKTU[i][1]), teks(`cj${HURUF[i]}-h`, POSISI[i], 52, HURUF[i], 10, W.ungu), teks(`cj${HURUF[i]}-wk`, POSISI[i], 146, `Pukul ${TEKS_WAKTU[i]}`, 7.6, W.biru)];
const rumusJam = (i: number): Obj[] => [busurJam(`cj${HURUF[i]}`, POSISI[i], 96, 15, WAKTU[i][0], WAKTU[i][1], W.merah, { tebal: 2.2 }), teks(`cj${HURUF[i]}-m`, POSISI[i], 166, RUMUS[i], 7.4, W.merah)];

export const ADEGAN_LUAR_MUKA_JAM_TERAPAN: AdeganStory = {
  id: "luar-muka-jam-terapan",
  judul: "Clock Face Division: penerapan pada Ayo Berlatih nomor 2",
  sumber: "Metode luar 4: contoh Ayo Berlatih Buku Siswa hlm. 182",
  latar: "#FFFBEB",
  ketukan: [
    k(
      "Terapkan pada Ayo Berlatih nomor dua. Pukul sepuluh, jarum pendek di angka sepuluh dan jarum panjang di angka dua belas. Jaraknya dua ruas, jadi enam puluh derajat.",
      tambah("Terapkan", judul("jam dihitung per ruas"), ...jamKecil(0), ...jamKecil(1), ...jamKecil(2), ...jamKecil(3)),
      tambah("Jaraknya", ...rumusJam(0)),
    ),
    k(
      "Pukul lima belas, jarum pendek di angka tiga. Jaraknya tiga ruas, jadi sembilan puluh derajat. Pukul tujuh, jaraknya lima ruas, jadi seratus lima puluh derajat.",
      tambah("Jaraknya", ...rumusJam(1)),
      tambah("Jaraknya@2", ...rumusJam(2)),
    ),
    k(
      "Pukul tujuh bisa dihitung dari dua arah: lima ruas atau tujuh ruas. Kita ambil yang terkecil, yaitu lima ruas, sehingga seratus lima puluh derajat dan bukan dua ratus sepuluh.",
      bersih(0),
      tambah(0, judul("pukul 07.00: dua arah")),
      tambah("Pukul", ...jam("ck", 100, 112, 50, 7, 0)),
      tambah("lima", busurJam("ck", 100, 112, 26, 7, 0, W.hijau, { tebal: 2.6 }), teks("ck-m", 228, 90, "5 × 30° = 150°", 8.6, W.hijau)),
      tambah("tujuh@2", busurSudut("cl", 100, 112, 36, -120, 90, W.abu, { tebal: 2.2, putus: true }), teks("cl-m", 228, 110, "7 × 30° = 210°", 8.6, W.coklat)),
      tambah("terkecil,", ...kartu("cp", 168, 126, 124, 40, W.hijauMuda, ["ambil yang terkecil:", "150°"], 9)),
    ),
    k(
      "Pukul empat tiga puluh: jarum panjang di angka enam, jarum pendek di tengah angka empat dan lima. Jaraknya satu setengah ruas, jadi empat puluh lima derajat.",
      bersih(0),
      tambah(0, judul("pukul 04.30: satu setengah ruas")),
      tambah("Pukul", ...jam("cm", 100, 112, 50, 4, 30)),
      tambah("tengah", ...kartu("cm1", 176, 52, 116, 38, W.krem, ["jarum pendek di 4,5", "jarum panjang di 6"], 8.6)),
      tambah("setengah", busurJam("cm", 100, 112, 26, 4, 30, W.merah, { tebal: 2.6 }), teks("cm-m", 234, 120, "1,5 × 30° = 45°", 8.6, W.merah)),
    ),
    k(
      "Pukul satu tiga puluh juga sama. Jarum pendek di satu setengah, jarum panjang di enam, jaraknya empat setengah ruas, sehingga seratus tiga puluh lima derajat.",
      bersih(0),
      tambah(0, judul("pukul 01.30: empat setengah ruas")),
      tambah("Pukul", ...jam("cn", 100, 112, 50, 1, 30), teks("cn-wk", 100, 190, "Pukul 01.30", 8.6, W.biru)),
      tambah("setengah", ...kartu("cn1", 176, 52, 116, 38, W.krem, ["jarum pendek di 1,5", "jarum panjang di 6"], 8.6)),
      tambah("sehingga", busurJam("cn", 100, 112, 26, 1, 30, W.merah, { tebal: 2.6 }), teks("cn-m", 234, 120, "4,5 × 30° = 135°", 8.4, W.merah)),
    ),
  ],
};

/* ------------------------------ LC9. Ringkasan empat metode ------------------------------ */
export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan empat metode luar Subbab C",
  sumber: "Ringkasan metode luar Subbab C",
  latar: "#F5F3FF",
  ketukan: [
    k(
      "Ringkasan empat metode luar. Protractor Reading Protocol: pusat, nol, skala, cek. Benchmark Angles: taksir dulu dengan patokan nol, sembilan puluh, seratus delapan puluh, dan tiga ratus enam puluh.",
      tambah(0, judul("ringkasan empat metode")),
      tambah("Protractor", ...kartu("r1", 10, 34, 134, 66, "#FDE68A", ["Protractor Reading", "Protocol", "Pusat, Nol,", "Skala, Cek"], 8.4)),
      tambah("Benchmark", ...kartu("r2", 156, 34, 134, 66, "#FBCFE8", ["Benchmark Angles", "taksir dengan patokan", "0°, 90°, 180°, 360°"], 8.4)),
    ),
    k(
      "Degree Measure: sudut adalah putaran, dan satu derajat sama dengan satu per tiga ratus enam puluh putaran. Clock Face Division: tiap ruas jam tiga puluh derajat, hitung ruasnya lalu kalikan.",
      tambah("Degree", ...kartu("r3", 10, 112, 134, 66, "#BBF7D0", ["Degree Measure", "sudut = putaran", "1° = 1/360 putaran"], 8.4)),
      tambah("Clock", ...kartu("r4", 156, 112, 134, 66, "#BFDBFE", ["Clock Face Division", "satu ruas = 30°", "jumlah ruas × 30°"], 8.4)),
    ),
    k(
      "Kapan dipakai? Protokol saat membaca busur, Benchmark untuk menaksir dan memeriksa, Degree Measure untuk memahami besar sudut, dan Clock Face Division khusus soal jam.",
      bersih(0),
      tambah(0, judul("kapan dipakai?")),
      tambah("Protokol", ...kartu("w1", 20, 34, 260, 28, W.krem, ["Protokol: saat membaca busur"], 9)),
      tambah("Benchmark", ...kartu("w2", 20, 70, 260, 28, W.pink, ["Benchmark: menaksir dan memeriksa"], 9)),
      tambah("Degree", ...kartu("w3", 20, 106, 260, 28, W.hijauMuda, ["Degree Measure: memahami besar sudut"], 9)),
      tambah("khusus", ...kartu("w4", 20, 142, 260, 28, W.langit, ["Clock Face Division: soal jam"], 9)),
    ),
    k(
      "Semua metode itu mengarah ke hasil yang sama dengan buku, misalnya kipas tiga seratus tiga puluh lima derajat, sudut refleks dua ratus empat puluh, dan jam setengah lima empat puluh lima derajat.",
      bersih(0),
      tambah(0, judul("hasilnya sama dengan buku")),
      tambah("kipas", ...kartu("z1", 12, 60, 86, 70, W.hijauMuda, ["Kipas 3", "135°"], 11)),
      tambah("refleks", ...kartu("z2", 107, 60, 86, 70, W.pink, ["sudut refleks", "240°"], 10)),
      tambah("setengah", ...kartu("z3", 202, 60, 86, 70, W.langit, ["pukul 04.30", "45°"], 11)),
      tambah("derajat.", teks("z-ok", 150, 160, "empat metode, satu jawaban ✓", 10, W.hijau)),
    ),
  ],
};
