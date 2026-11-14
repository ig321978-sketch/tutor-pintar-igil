import type { AdeganStory, Obj } from "./logika-story";
import { PERSEGI_ABCD, PERSEGI_PANJANG_ABCD, S, W, bangunBerpetak, emo, kartu, kisi, kotak, panah, persegiPanjang, poli, teks } from "./k5b5b-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k5b5b-bantu";

/* ------------------------------ 1. Pembuka Sub-Bab B (hlm. 144; Panduan Guru hlm. 200-201) ------------------------------ */
export const ADEGAN_PEMBUKA_B: AdeganStory = {
  id: "pembuka-b",
  judul: "Pembuka Sub-Bab B: luas daerah bangun datar",
  sumber: "Buku Siswa hlm. 144; Buku Panduan Guru hlm. 200–201",
  latar: "#EEF2FF",
  kutipan: ["B. Luas Daerah Bangun Datar", "penemuan terbimbing terhadap cara menghitung luas daerah berbagai bangun datar", "Alat tulis: pulpen, pensil, penggaris, spidol, gunting, lem", "tangram", "tebak-tebakan perkalian bilangan-bilangan di bawah 10", "perkalian bilangan bulat dengan pecahan"],
  ketukan: [
    k(
      "Selamat datang di Sub-Bab B, luas daerah bangun datar. Di sub-bab sebelumnya kita menutup daerah dengan petak satuan. Sekarang kita menemukan cara menghitung luas tujuh bangun datar.",
      tambah(0, teks("jud", 150, 24, "Sub-Bab B: Luas Daerah", 12.5, W.ungu)),
      tambah("petak", ...bangunBerpetak("pk", 30, 64, 5, 3, persegiPanjang(5, 3), W.muda), teks("pkt", 80, 144, "ditutup petak satuan", 8.6, W.biru)),
      tambah("tujuh", teks("tj", 232, 112, "7", 46, W.merah), teks("tjt", 232, 136, "bangun datar", 9, W.ungu)),
    ),
    k(
      "Pengalaman belajarnya berupa penemuan terbimbing. Mula-mula persegi panjang. Lalu persegi, segitiga, jajargenjang, belah ketupat, dan layang-layang. Trapesium kita temukan dari jajargenjang.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Urutan penemuan", 12, W.ungu)),
      tambah("Mula-mula", ...kartu("pp", 8, 86, 100, 36, W.hijauMuda, ["persegi", "panjang"], 9)),
      tambah("persegi@2", ...kartu("c1", 168, 32, 124, 22, W.muda, ["persegi"], 8.6), panah("a1", 108, 104, 60, -61, W.biru, 1.4)),
      tambah("segitiga,", ...kartu("c2", 168, 59, 124, 22, W.muda, ["segitiga"], 8.6), panah("a2", 108, 104, 60, -34, W.biru, 1.4)),
      tambah("jajargenjang,", ...kartu("c3", 168, 86, 124, 22, W.krem, ["jajargenjang"], 8.6), panah("a3", 108, 104, 60, -7, W.biru, 1.4)),
      tambah("belah", ...kartu("c4", 168, 113, 124, 22, W.muda, ["belah ketupat"], 8.6), panah("a4", 108, 104, 60, 20, W.biru, 1.4)),
      tambah("layang-layang.", ...kartu("c5", 168, 140, 124, 22, W.muda, ["layang-layang"], 8.6), panah("a5", 108, 104, 60, 47, W.biru, 1.4)),
      tambah("Trapesium", ...kartu("c6", 168, 169, 124, 22, W.merahMuda, ["trapesium (dari jajargenjang)"], 8)),
    ),
    k(
      "Alat yang disiapkan: alat tulis, penggaris, spidol, gunting, dan lem. Ada juga kertas berpetak, kertas lipat atau origami, dan gambar bangun yang diperbesar, serta tangram model bangun.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Alat dan media", 13, W.ungu)),
      tambah("tulis,", emo("a1", 50, 82, "✏️", 30), teks("a1t", 50, 100, "alat tulis", 8.6)),
      tambah("penggaris,", emo("a2", 110, 82, "📏", 30), teks("a2t", 110, 100, "penggaris", 8.6)),
      tambah("gunting,", emo("a3", 170, 82, "✂️", 30), teks("a3t", 170, 100, "gunting", 8.6)),
      tambah("berpetak,", kisi("a4", 30, 126, 3, 2, W.biru), teks("a4t", 60, 182, "kertas berpetak", 8.6)),
      tambah("origami,", kotak("a5", 128, 126, 40, 40, W.jeruk, W.biru, { rx: 2 }), teks("a5t", 148, 182, "kertas lipat", 8.6)),
      tambah("tangram", emo("a6", 235, 156, "🧩", 32), teks("a6t", 235, 182, "tangram", 8.6)),
    ),
    k(
      "Pemanasan: tebak-tebakan perkalian bilangan di bawah 10. Misalnya, 7 kali 8 berapa? Jawabannya 56.",
      bersih(0),
      tambah(0, teks("jud", 150, 26, "Pemanasan", 13, W.ungu), ...kartu("pm", 30, 44, 240, 34, W.krem, ["tebak perkalian di bawah 10"], 9.4)),
      tambah("Misalnya,", teks("pq", 150, 124, "7 x 8 = ?", 30, W.biru)),
      tambah("Jawabannya", teks("pj", 150, 172, "7 x 8 = 56", 24, W.hijau)),
    ),
    k(
      "Guru juga mengingatkan separuh sebuah bilangan. Misalnya separuh dari 8 adalah 4. Cara ini kita pakai untuk segitiga, trapesium, belah ketupat, dan layang-layang.",
      bersih(0),
      tambah(0, teks("jud", 150, 26, "Separuh bilangan", 13, W.ungu)),
      tambah("separuh@2", teks("sp1", 150, 78, "separuh dari 8", 16, W.biru), teks("sp2", 150, 112, "8 : 2 = 4", 28, W.hijau)),
      tambah("Cara", ...kartu("sp3", 22, 134, 256, 54, W.langitMuda, ["dipakai pada segitiga, trapesium,", "belah ketupat, dan layang-layang"], 9)),
    ),
  ],
};

/* ------------------------------ 2. Eksplorasi 5.2A: persegi panjang (hlm. 144-145; Panduan Guru hlm. 201-204) ------------------------------ */
const kolomTabel = (id: string, y: number, isi: string, o: Partial<Obj> = {}): Obj => teks(id, 172, y, isi, 9.4, W.biru, { anchor: "start", ...o });
const tabelPP = (): Obj[] => [kotak("tb-k", 160, 40, 132, 118, W.putih, W.biru, { rx: 8 }), teks("tb-j", 226, 56, "Hitungan", 9.4, W.ungu)];

export const ADEGAN_PERSEGI_PANJANG: AdeganStory = {
  id: "persegi-panjang",
  judul: "Eksplorasi 5.2A: luas persegi panjang",
  sumber: "Buku Siswa hlm. 144–145; Buku Panduan Guru hlm. 201–204",
  latar: "#F0FDF4",
  kutipan: ["Ayo Menemukan Luas Daerah Persegi Panjang", "Temukan cara menghitung luas daerahnya", "Hitunglah panjang, lebar, dan luas daerah setiap kotak di atas", "Luas = panjang", "Apa yang kalian temukan?", "Guru meminta peserta didik mencermati hubungan antara"],
  ketukan: [
    k(
      "Eksplorasi 5.2A, menemukan luas daerah persegi panjang. Buku menampilkan empat persegi panjang, A, B, C, dan D, pada kertas berpetak. Kita diminta menghitung panjang, lebar, dan luasnya.",
      tambah(0, teks("jud", 150, 24, "Eksplorasi 5.2A", 13, W.ungu)),
      tambah("empat", ...PERSEGI_PANJANG_ABCD.flatMap(([p, l], i) => {
        const pos: [number, number][] = [[20, 52], [110, 52], [20, 112], [130, 112]];
        const [x, y] = pos[i];
        const nama = "ABCD"[i];
        return [...bangunBerpetak(`r${i}`, x, y, p, l, persegiPanjang(p, l), W.hijauMuda), teks(`r${i}n`, x + (p * S) / 2, y - 4, nama, 10, W.ungu)];
      })),
    ),
    k(
      "Persegi panjang A panjangnya 2 satuan dan lebarnya 1 satuan. Dengan membilang petak, luasnya 2 satuan luas. Hitungannya 2 kali 1 sama dengan 2.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Persegi panjang A", 13, W.ungu), ...tabelPP()),
      tambah("panjangnya", ...bangunBerpetak("a", 20, 84, 2, 1, persegiPanjang(2, 1), W.hijauMuda), teks("at", 40, 78, "panjang 2 satuan", 8.6), teks("al", 40, 112, "lebar 1 satuan", 8.6)),
      tambah("luasnya", teks("alu", 40, 140, "luas 2 satuan luas", 8.6, W.hijau)),
      tambah("Hitungannya", kolomTabel("tA", 78, "A: 2 x 1 = 2")),
    ),
    k(
      "Persegi panjang B panjangnya 5 satuan dan lebarnya 2 satuan. Dengan membilang petak, luasnya 10 satuan luas. Hitungannya 5 kali 2 sama dengan 10.",
      hapus(0, "a-bg", "a-g", "at", "al", "alu"),
      tambah(0, teks("jud2", 150, 24, "Persegi panjang B", 13, W.ungu)),
      hapus(0, "jud"),
      tambah("panjangnya", ...bangunBerpetak("b", 20, 80, 5, 2, persegiPanjang(5, 2), W.hijauMuda), teks("bt", 70, 74, "panjang 5 satuan", 8.6), teks("bl", 70, 132, "lebar 2 satuan", 8.6)),
      tambah("luasnya", teks("blu", 70, 150, "luas 10 satuan luas", 8.6, W.hijau)),
      tambah("Hitungannya", kolomTabel("tB", 100, "B: 5 x 2 = 10")),
    ),
    k(
      "Persegi panjang C panjangnya 4 satuan dan lebarnya 3 satuan, jadi luasnya 12 satuan luas. Hitungannya 4 kali 3 sama dengan 12.",
      hapus(0, "b-bg", "b-g", "bt", "bl", "blu", "jud2"),
      tambah(0, teks("jud3", 150, 24, "Persegi panjang C", 13, W.ungu)),
      tambah("panjangnya", ...bangunBerpetak("c", 20, 76, 4, 3, persegiPanjang(4, 3), W.hijauMuda), teks("ct", 60, 70, "panjang 4 satuan", 8.6), teks("cl", 60, 150, "lebar 3 satuan", 8.6)),
      tambah("luasnya", teks("clu", 60, 168, "luas 12 satuan luas", 8.6, W.hijau)),
      tambah("Hitungannya", kolomTabel("tC", 122, "C: 4 x 3 = 12")),
    ),
    k(
      "Persegi panjang D panjangnya 2 satuan dan lebarnya 3 satuan, jadi luasnya 6 satuan luas. Hitungannya 2 kali 3 sama dengan 6.",
      hapus(0, "c-bg", "c-g", "ct", "cl", "clu", "jud3"),
      tambah(0, teks("jud4", 150, 24, "Persegi panjang D", 13, W.ungu)),
      tambah("panjangnya", ...bangunBerpetak("d", 20, 76, 2, 3, persegiPanjang(2, 3), W.hijauMuda), teks("dt", 40, 70, "panjang 2 satuan", 8.6), teks("dl", 40, 150, "lebar 3 satuan", 8.6)),
      tambah("luasnya", teks("dlu", 60, 168, "luas 6 satuan luas", 8.6, W.hijau)),
      tambah("Hitungannya", kolomTabel("tD", 144, "D: 2 x 3 = 6")),
    ),
    k(
      "Sekarang amati kolom hitungan. Selalu ada dua bilangan yang dikalikan: dua kali satu, lima kali dua, empat kali tiga, dan dua kali tiga. Dua bilangan itu panjang dan lebar.",
      hapus(0, "d-bg", "d-g", "dt", "dl", "dlu", "jud4"),
      tambah(0, teks("jud5", 150, 24, "Pola perkalian", 13, W.ungu)),
      sorotkan("Selalu", "tA", "tB", "tC", "tD"),
      tambah("panjang", ...kartu("pol", 12, 70, 130, 70, W.krem, ["bilangan pertama:", "panjang", "bilangan kedua: lebar"], 9)),
    ),
    k(
      "Apa yang kita temukan? Luas daerah persegi panjang sama dengan panjang kali lebar. Untuk mendapat luas, kalikan panjang dan lebarnya.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Yang kita temukan", 13, W.ungu)),
      tambah("persegi", ...bangunBerpetak("g", 80, 56, 6, 3, persegiPanjang(6, 3), W.hijauMuda), teks("gp", 140, 50, "panjang", 9.4, W.merah), teks("gl", 72, 90, "lebar", 9.4, W.merah, { anchor: "end" })),
      tambah("Untuk", ...kartu("gr", 40, 130, 220, 44, W.krem, ["Luas = panjang x lebar"], 14)),
    ),
    k(
      "Di akhir kegiatan, guru memperkuat cara ini lewat tanya jawab. Bila murid kesulitan, cermati dua baris perkalian A dan B, lalu terapkan pada C dan D.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Penguatan guru", 13, W.ungu), ...tabelPP()),
      tambah("Bila", kolomTabel("tA", 78, "A: 2 x 1 = 2"), kolomTabel("tB", 100, "B: 5 x 2 = 10")),
      tambah("terapkan", kolomTabel("tC", 122, "C: 4 x 3 = 12", { warna: W.hijau }), kolomTabel("tD", 144, "D: 2 x 3 = 6", { warna: W.hijau })),
      tambah("tanya", ...kartu("tj", 12, 70, 134, 56, W.merahMuda, ["tanya jawab", "penguatan", "dari guru"], 9)),
    ),
  ],
};

/* ------------------------------ 3. Eksplorasi 5.2B: persegi (hlm. 145-147; Panduan Guru hlm. 204-207) ------------------------------ */
const kolomPersegi = (id: string, y: number, isi: string, o: Partial<Obj> = {}): Obj => teks(id, 196, y, isi, 9.4, W.biru, { anchor: "start", ...o });

export const ADEGAN_PERSEGI: AdeganStory = {
  id: "persegi",
  judul: "Eksplorasi 5.2B: luas persegi",
  sumber: "Buku Siswa hlm. 145–147; Buku Panduan Guru hlm. 204–207",
  latar: "#FEFCE8",
  kutipan: ["Ayo Menemukan Luas Daerah Persegi", "Apa nama bangun datar di atas", "Pada persegi, apakah panjang dan lebarnya", "Luas = sisi", "sisi-sisinya"],
  ketukan: [
    k(
      "Eksplorasi 5.2B, menemukan luas daerah persegi. Kita sudah tahu luas persegi panjang. Sekarang perhatikan empat persegi, A sampai D, lalu hitung panjang, lebar, dan luasnya.",
      tambah(0, teks("jud", 150, 24, "Eksplorasi 5.2B", 13, W.ungu)),
      tambah("empat", ...PERSEGI_ABCD.flatMap((n, i) => {
        const xs = [20, 52, 108, 188];
        const x = xs[i];
        const y = 160 - n * S;
        return [...bangunBerpetak(`q${i}`, x, y, n, n, persegiPanjang(n, n), W.hijauMuda), teks(`q${i}n`, x + (n * S) / 2, 176, "ABCD"[i], 10, W.ungu)];
      })),
    ),
    k(
      "Persegi A berukuran 1 kali 1, luasnya 1 satuan luas. Persegi B berukuran 2 kali 2, luasnya 4 satuan luas.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Persegi A dan B", 13, W.ungu)),
      tambah("Persegi", ...bangunBerpetak("a", 30, 120, 1, 1, persegiPanjang(1, 1), W.hijauMuda), teks("an", 40, 152, "A", 10, W.ungu), kolomPersegi("ta", 86, "A: 1 x 1 = 1")),
      tambah("Persegi@2", ...bangunBerpetak("b", 80, 100, 2, 2, persegiPanjang(2, 2), W.hijauMuda), teks("bn", 100, 152, "B", 10, W.ungu), kolomPersegi("tb", 108, "B: 2 x 2 = 4")),
    ),
    k(
      "Persegi C berukuran 3 kali 3, luasnya 9 satuan luas. Persegi D berukuran 4 kali 4, luasnya 16 satuan luas.",
      hapus(0, "a-bg", "a-g", "an", "b-bg", "b-g", "bn"),
      tambah(0, ...bangunBerpetak("c", 12, 100, 3, 3, persegiPanjang(3, 3), W.hijauMuda), teks("cn", 42, 176, "C", 10, W.ungu)),
      tambah("Persegi@2", ...bangunBerpetak("d", 90, 80, 4, 4, persegiPanjang(4, 4), W.hijauMuda), teks("dn", 130, 176, "D", 10, W.ungu)),
      tambah("luasnya", kolomPersegi("tc", 130, "C: 3 x 3 = 9")),
      tambah("luasnya@2", kolomPersegi("td", 152, "D: 4 x 4 = 16")),
    ),
    k(
      "Pada persegi, panjang dan lebarnya sama. Jika keduanya kita sebut sisi, luas persegi sama dengan sisi kali sisi.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Panjang sama dengan lebar", 12.5, W.ungu)),
      tambah("panjang", ...bangunBerpetak("e", 90, 54, 4, 4, persegiPanjang(4, 4), W.hijauMuda), teks("es", 130, 48, "sisi", 9.4, W.merah)),
      tambah("keduanya", teks("el", 82, 98, "sisi", 9.4, W.merah, { anchor: "end" })),
      tambah("sama@2", ...kartu("er", 50, 148, 200, 36, W.krem, ["Luas = sisi x sisi"], 13)),
    ),
    k(
      "Seperti pada persegi panjang, luas persegi dihitung dengan mengalikan sisi-sisinya. Bedanya, panjang dan lebar persegi sama. Guru memperkuatnya lewat tanya jawab.",
      bersih(0),
      tambah(0, teks("jud", 150, 24, "Persegi dan persegi panjang", 12, W.ungu)),
      tambah("persegi", ...kartu("f1", 16, 44, 128, 70, W.hijauMuda, ["persegi panjang", "panjang x lebar"], 9.4), poli("f1b", 40, 120, persegiPanjang(3, 2), W.putih)),
      tambah("Bedanya,", ...kartu("f2", 156, 44, 128, 70, W.krem, ["persegi", "sisi x sisi"], 9.4), poli("f2b", 190, 120, persegiPanjang(2, 2), W.putih)),
      tambah("tanya", teks("ftj", 150, 196, "tanya jawab penguatan", 8.6, W.ungu)),
    ),
  ],
};
