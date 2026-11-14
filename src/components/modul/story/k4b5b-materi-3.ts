import type { AdeganStory, Obj } from "./logika-story";
import { BAHAN_ENAM, BENTUK_UK4, KUNCI_ENAM, KUNCI_LIMA, RUMAH_KUNCI, RUMAH_URAI, SEGIBANYAK_UK1, type Titik } from "./k4b5b-data";
import { W, beraturan, bentuk, bulat, emo, garis, golonganSudut, judul, kartu, keping, kotak, panah, poli, skala, sudutDalam, teks } from "./k4b5b-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k4b5b-bantu";

/* ------------------------------ 10. Uji Kompetensi 1 sampai 4 (Buku Siswa hlm. 174; Panduan Guru hlm. 202–203) ------------------------------ */
const KOLOM = [52, 150, 248];
const BARIS_Y = [44, 96, 148];
const HURUF = "abcdefghi".split("");
const S1 = 0.55;
const sel = (h: string): [number, number] => {
  const i = HURUF.indexOf(h);
  return [KOLOM[i % 3], BARIS_Y[Math.floor(i / 3)]];
};
const gambarUK1 = (): Obj[] =>
  HURUF.flatMap((h) => {
    const b = SEGIBANYAK_UK1[h];
    const [cx, cy] = sel(h);
    return [bentuk(`u1-${h}`, cx - (b.w * S1) / 2, cy - (b.h * S1) / 2, b, S1, W.putih, W.biru, { tebal: 1.3 }), teks(`u1-l${h}`, cx, cy + 27, `(${h})`, 7.4, W.hitam)];
  });
const warnai1 = (at: number, h: string, warna: string, op = 1) => ubah(at, { id: `u1-${h}`, warna, op });
const S4 = 1.4;
const SUDUT4 = sudutDalam(BENTUK_UK4.pts as Titik[]);
const WARNA_SUDUT: Record<string, string> = { lancip: "#2563EB", tumpul: "#DC2626", menjorok: "#9CA3AF", siku: "#16A34A" };
export const ADEGAN_UK_1: AdeganStory = {
  id: "uk-1",
  judul: "Uji Kompetensi 1 sampai 4",
  sumber: "Buku Siswa hlm. 174; Panduan Guru hlm. 202–203",
  latar: "#FFF7ED",
  kutipan: [
    "Kerjakan soal berikut dengan cermat dan salin jawaban pada buku kalian.",
    "Tentukan mana yang termasuk bangun segi banyak dan bukan segi",
    "tentukan mana yang termasuk bangun segi banyak beraturan dan bangun segi banyak tidak beraturan.",
    "Sebutkan ciri-ciri dari bangun segi banyak beraturan.",
    "Hitunglah jumlah sudut lancip dan sudut tumpul pada bangun segi",
    "masing-masing segi banyak; sedangkan",
    "gambar c, e, dan g bukan segi banyak",
    "Gambar b, f, dan I merupakan segi banyak beraturan",
    "gambar a, d, dan h bukan segi banyak beraturan",
    "Sisi-sisinya sama Panjang dan sudut-sudutnya memiliki ukuran",
    "yang sama",
  ],
  ketukan: [
    k(
      "Uji kompetensi: kerjakan dengan cermat dan salin jawaban pada buku. Nomor satu: dari sembilan gambar, tentukan mana segi banyak dan mana yang bukan.",
      tambah(0, judul("Uji Kompetensi 1")),
      tambah("sembilan", ...gambarUK1()),
    ),
    k(
      "Kunci: gambar a, b, d, f, h, dan i adalah segi banyak. Gambar c, e, dan g bukan, karena ada sisi yang melengkung.",
      warnai1(2, "a", "#BBF7D0"),
      warnai1(3, "b", "#BBF7D0"),
      warnai1(4, "d", "#BBF7D0"),
      warnai1(5, "f", "#BBF7D0"),
      warnai1(6, "h", "#BBF7D0"),
      warnai1(8, "i", "#BBF7D0"),
      warnai1(13, "c", "#FECACA"),
      warnai1(14, "e", "#FECACA"),
      warnai1(16, "g", "#FECACA"),
      tambah("melengkung.", teks("u1k", 150, 192, "hijau: segi banyak   merah: bukan", 7.6, W.coklat)),
    ),
    k(
      "Nomor dua: yang beraturan adalah b, f, dan i. Yang tidak beraturan adalah a, d, dan h.",
      warnai1(5, "b", "#BFDBFE"),
      warnai1(6, "f", "#BFDBFE"),
      warnai1(8, "i", "#BFDBFE"),
      warnai1(13, "a", "#FED7AA"),
      warnai1(14, "d", "#FED7AA"),
      warnai1(16, "h", "#FED7AA"),
      ubah("Nomor", { id: "u1k", isi: "biru: beraturan   oranye: tidak beraturan" }),
    ),
    k(
      "Nomor tiga: ciri segi banyak beraturan adalah sisi-sisinya sama panjang dan sudut-sudutnya sama besar.",
      bersih(0),
      tambah(0, judul("Segi banyak beraturan")),
      tambah("sisi-sisinya", bentuk("hx", 40, 52, SEGIBANYAK_UK1.b, 1.7, "#BFDBFE", W.biru, { tebal: 1.8 })),
      tambah("sisi-sisinya", ...kartu("hc1", 170, 52, 118, 36, W.langit, ["sisi-sisinya", "sama panjang"], 8.6)),
      tambah("sudut-sudutnya", ...kartu("hc2", 170, 104, 118, 36, W.hijauMuda, ["sudut-sudutnya", "sama besar"], 8.6)),
      tambah("sudut-sudutnya", teks("hc3", 150, 186, "contoh: segienam beraturan", 8, W.coklat)),
    ),
    k(
      "Nomor empat: pada segi banyak tak beraturan itu, kunci menyebut empat sudut lancip dan dua sudut tumpul. Hitungan mandiri sesuai; empat sudut lainnya menjorok ke dalam.",
      bersih(0),
      tambah(0, judul("Sudut lancip dan tumpul")),
      tambah("segi", bentuk("us", 68, 46, BENTUK_UK4, S4, "#F3F4F6", W.biru, { tebal: 1.6 })),
      tambah("lancip", ...(BENTUK_UK4.pts as Titik[]).flatMap(([x, y], i) => (golonganSudut(SUDUT4[i]) === "lancip" ? [bulat(`ul${i}`, 68 + x * S4, 46 + y * S4, 5, WARNA_SUDUT.lancip, W.putih, { tebal: 1 })] : []))),
      tambah("tumpul.", ...(BENTUK_UK4.pts as Titik[]).flatMap(([x, y], i) => (golonganSudut(SUDUT4[i]) === "tumpul" ? [bulat(`ut${i}`, 68 + x * S4, 46 + y * S4, 5, WARNA_SUDUT.tumpul, W.putih, { tebal: 1 })] : []))),
      tambah("menjorok", ...(BENTUK_UK4.pts as Titik[]).flatMap(([x, y], i) => (golonganSudut(SUDUT4[i]) === "menjorok" ? [bulat(`um${i}`, 68 + x * S4, 46 + y * S4, 5, WARNA_SUDUT.menjorok, W.putih, { tebal: 1 })] : []))),
      tambah("lancip", teks("uk1", 60, 156, "4 lancip", 8.6, WARNA_SUDUT.lancip)),
      tambah("tumpul.", teks("uk2", 150, 156, "2 tumpul", 8.6, WARNA_SUDUT.tumpul)),
      tambah("menjorok", teks("uk3", 240, 156, "4 menjorok", 8.6, "#6B7280")),
      tambah("menjorok", teks("uk4", 150, 182, "4 + 2 + 4 = 10 titik sudut", 8.4, W.coklat)),
    ),
  ],
};

/* ------------------------------ 11. Uji Kompetensi 5 sampai 13 (Buku Siswa hlm. 175; Panduan Guru hlm. 203–205) ------------------------------ */
const OKTA = KUNCI_ENAM.a;
const BINTANG = KUNCI_ENAM.c;
const DESA = beraturan(10, 28);
export const ADEGAN_UK_2: AdeganStory = {
  id: "uk-2",
  judul: "Uji Kompetensi 5 sampai 13",
  sumber: "Buku Siswa hlm. 175; Panduan Guru hlm. 203–205",
  latar: "#FDF4FF",
  kutipan: [
    "Buatlah bangun segi banyak dengan ketentuan sebagai berikut :",
    "Bangun segi banyak beraturan dengan 10 sisi",
    "Bangun segi banyak tak beraturan dengan 5 sisi",
    "Bangun segi banyak beraturan dengan 5 sudut lancip",
    "Bangun segi banyak tak beraturan dengan 3 sudut lancip dan 3 sudut tumpul",
    "Bangun segi banyak beraturan dengan 8 sisi",
    "Budi setiap pagi hari berolahraga lari mengelilingi taman kota yang berbentuk segienam beraturan.",
    "Jawab: 50 x 6 = 300; jadi jarak yang ditempuh 300 meter",
    "Sebutkan persamaan dan perbedaan ciri-ciri bangun A dan B tersebut",
    "Dapatkah dibuat segitiga siku-siku sekaligus sama kaki?",
    "Tidak dapat; karena bila hal itu terjadi berarti dalam segitiga jumlah",
    "Dapatkah segitiga tumpul sekaligus merupakan segitiga siku-siku?",
    "Mengapa jajargenjang tidak bisa dinamakan trapesium",
    "tepat sepasang sisi berhadapan sejajar",
    "Belah ketupat tidak memiliki ciri “memiliki tepat sepasang sisi sejajar”",
    "Buatlah minimal 4 bangun datar berbeda bentuknya",
    "Buatlah suatu bangun datar tertentu yang dapat diuraikan",
  ],
  ketukan: [
    k(
      "Nomor lima: buat segi banyak. A, beraturan dengan sepuluh sisi. B, tak beraturan dengan lima sisi. C, beraturan dengan lima sudut lancip. D, tak beraturan dengan tiga sudut lancip dan tiga sudut tumpul.",
      tambah(0, judul("Uji Kompetensi 5")),
      tambah(5, ...kartu("q51", 14, 34, 272, 28, W.langit, ["a. beraturan, 10 sisi"], 9)),
      tambah(10, ...kartu("q52", 14, 70, 272, 28, W.krem, ["b. tak beraturan, 5 sisi"], 9)),
      tambah(16, ...kartu("q53", 14, 106, 272, 28, W.hijauMuda, ["c. beraturan, 5 sudut lancip"], 9)),
      tambah(22, ...kartu("q54", 14, 142, 272, 28, W.pink, ["d. tak beraturan, 3 lancip dan 3 tumpul"], 8.4)),
    ),
    k(
      "Catatan guru: kunci a menggambar segi delapan, padahal soal meminta sepuluh sisi. Kunci c berbentuk bintang, sudutnya bergantian enam puluh tiga dan dua ratus dua puluh lima derajat, jadi tidak beraturan.",
      bersih(0),
      tambah(0, judul("Catatan guru: kunci nomor 5")),
      tambah("segi", bentuk("kk8", 18, 54, OKTA, 0.9, "#FECACA", W.merah, { tebal: 1.4 }), teks("kk8t", 46, 122, "kunci a: 8 sisi", 7.6, W.merah), emo("kk8x", 46, 142, "✖", 14, { warna: W.merah })),
      tambah("sepuluh", poli("kk10", 150, 82, DESA, "#BBF7D0", W.hijau, { tebal: 1.4 }), teks("kk10t", 150, 122, "soal a: 10 sisi", 7.6, W.hijau), emo("kk10x", 150, 142, "✔", 14, { warna: W.hijau })),
      tambah("bintang,", bentuk("kkb", 222, 54, BINTANG, 0.8, "#FEF08A", W.coklat, { tebal: 1.4 })),
      tambah("enam", teks("kkb1", 252, 138, "63°", 8.4, W.biru)),
      tambah("dua", teks("kkb2", 252, 150, "225°", 8.4, W.merah)),
      tambah("beraturan.", teks("kkb3", 252, 164, "tidak sama besar", 7, W.coklat)),
      tambah("beraturan.", teks("kkc", 150, 190, "kunci b dan d benar", 8.2, W.coklat)),
    ),
    k(
      "Nomor enam: Budi berlari mengelilingi taman segienam beraturan, tiap sisinya lima puluh meter. Jaraknya lima puluh kali enam sama dengan tiga ratus meter.",
      bersih(0),
      tambah(0, judul("Uji Kompetensi 6")),
      tambah("taman", poli("hx6", 80, 98, beraturan(6, 34), "#BBF7D0", W.hijau, { tebal: 1.6 })),
      tambah("lima", teks("hx6a", 80, 58, "50 m", 7.8, W.biru), teks("hx6b", 80, 148, "50 m", 7.8, W.biru)),
      tambah("segienam", ...kartu("hx6c", 150, 50, 138, 28, W.krem, ["6 sisi, tiap sisi 50 m"], 8.4)),
      tambah("Jaraknya", ...kartu("hx6d", 150, 90, 138, 28, W.hijauMuda, ["satu putaran: 6 kali 50"], 8.4)),
      tambah("tiga", ...kartu("hx6e", 150, 130, 138, 30, W.pink, ["50 × 6 = 300 meter"], 9.4)),
    ),
    k(
      "Nomor tujuh: bangun A tampak belah ketupat dan B layang-layang. Persamaannya empat sisi, empat sudut, diagonal berpotongan tegak lurus. Beda: semua sisi A sama panjang, sisi berdekatan B ada yang tidak sama.",
      bersih(0),
      tambah(0, judul("Uji Kompetensi 7")),
      tambah("bangun", poli("ba", 56, 86, [[0, -32], [22, 0], [0, 32], [-22, 0]], "#FECACA", W.merah, { tebal: 1.6 }), teks("bat", 56, 142, "A", 10, W.merah)),
      tambah("layang-layang.", poli("bb", 126, 86, [[0, -38], [21, -8], [0, 34], [-21, -8]], "#FEF08A", W.coklat, { tebal: 1.6 }), teks("bbt", 126, 142, "B", 10, W.coklat)),
      tambah("Persamaannya", ...kartu("pa", 170, 36, 120, 56, W.hijauMuda, ["sama:", "4 sisi, 4 sudut,", "diagonal tegak lurus"], 7.4)),
      tambah("Beda:", ...kartu("pb", 170, 100, 120, 56, W.krem, ["beda:", "A: semua sisi sama", "B: ada sisi tak sama"], 7.4)),
    ),
    k(
      "Nomor delapan: segitiga siku-siku sekaligus sama kaki dapat dibuat. Nomor sembilan: segitiga tumpul sekaligus siku-siku tidak dapat, karena jumlah sudut segitiga menjadi lebih dari seratus delapan puluh derajat.",
      bersih(0),
      tambah(0, judul("Uji Kompetensi 8 dan 9")),
      tambah("delapan:", poli("t8", 30, 56, [[0, 0], [0, 56], [56, 56]], "#BFDBFE", W.biru, { tebal: 1.6 }), teks("t8a", 58, 128, "90°, 45°, 45°", 7.8, W.hitam)),
      tambah("sama", teks("t8c", 58, 144, "siku-siku sama kaki: dapat", 7.4, W.hijau)),
      tambah("sembilan:", ...kartu("t9a", 124, 44, 164, 30, W.krem, ["tumpul + siku-siku?"], 8.6)),
      tambah("jumlah", ...kartu("t9b", 124, 84, 164, 30, W.merahMuda, ["90° + lebih dari 90° > 180°"], 8.2)),
      tambah("derajat.", ...kartu("t9c", 124, 124, 164, 26, W.pink, ["tidak dapat"], 9)),
    ),
    k(
      "Catatan guru: di kunci nomor sembilan tertulis seribu delapan ratus, padahal maksudnya seratus delapan puluh derajat; tanda derajatnya hilang.",
      hapus(0, "t9a-k", "t9a-t0", "t9b-k", "t9b-t0", "t9c-k", "t9c-t0"),
      tambah("tertulis", ...kartu("cg1", 124, 44, 164, 30, W.krem, ["kunci tertulis: 1800"], 9.2)),
      tambah("maksudnya", ...kartu("cg2", 124, 84, 164, 30, W.hijauMuda, ["maksudnya: 180°"], 9.4)),
    ),
    k(
      "Nomor sepuluh: jajargenjang bukan trapesium, sebab trapesium memiliki tepat sepasang sisi sejajar, sedangkan jajargenjang dua pasang. Nomor sebelas: belah ketupat juga bukan trapesium, sebab tidak memiliki tepat sepasang sisi sejajar.",
      bersih(0),
      tambah(0, judul("Uji Kompetensi 10 dan 11")),
      tambah("trapesium", poli("pt", 26, 52, [[12, 0], [48, 0], [60, 30], [0, 30]], "#FED7AA", W.coklat, { tebal: 1.4 }), garis("pt1", 38, 52, 36, 0, W.merah, 2.6), garis("pt2", 26, 82, 60, 0, W.merah, 2.6), teks("ptt", 56, 106, "trapesium", 7.6, W.biru), teks("ptu", 56, 118, "1 pasang", 7.6, W.merah)),
      tambah("sepasang", teks("ptv", 56, 130, "sejajar", 7.6, W.merah)),
      tambah("jajargenjang", poli("pj", 118, 52, [[15, 0], [60, 0], [45, 30], [0, 30]], "#FBCFE8", W.coklat, { tebal: 1.4 }), garis("pj1", 133, 52, 45, 0, W.merah, 2.6), garis("pj2", 118, 82, 45, 0, W.merah, 2.6), garis("pj3", 133, 52, -15, 30, W.biru, 2.6), garis("pj4", 178, 52, -15, 30, W.biru, 2.6), teks("pjt", 148, 106, "jajargenjang", 7.6, W.biru), teks("pju", 148, 118, "2 pasang", 7.6, W.merah)),
      tambah("belah", poli("pb", 214, 50, [[30, 0], [54, 22], [30, 44], [6, 22]], "#BBF7D0", W.coklat, { tebal: 1.4 }), garis("pb1", 244, 50, 24, 22, W.merah, 2.6), garis("pb2", 244, 94, -24, -22, W.merah, 2.6), garis("pb3", 268, 72, -24, 22, W.biru, 2.6), garis("pb4", 220, 72, 24, -22, W.biru, 2.6), teks("pbt", 244, 106, "belah ketupat", 7.6, W.biru), teks("pbu", 244, 118, "2 pasang", 7.6, W.merah)),
      tambah("tepat", teks("pbx", 150, 160, "trapesium: tepat 1 pasang", 8.4, W.coklat)),
    ),
    k(
      "Nomor dua belas dan tiga belas terbuka. Kunci memberi contoh orang-orangan dari segitiga, lingkaran, dan persegi panjang, serta sebuah jajargenjang yang dibagi menjadi beberapa bagian.",
      bersih(0),
      tambah(0, judul("Uji Kompetensi 12 dan 13")),
      tambah("orang-orangan", poli("or1", 60, 40, [[0, 14], [14, 14], [7, 0]], "#FAA61A", W.coklat), bulat("or2", 67, 66, 9, "#FDE68A", W.coklat), kotak("or3", 52, 76, 30, 34, "#93C5FD", W.coklat, { rx: 1 }), kotak("or4", 56, 110, 8, 26, "#93C5FD", W.coklat, { rx: 1 }), kotak("or5", 70, 110, 8, 26, "#93C5FD", W.coklat, { rx: 1 })),
      tambah("jajargenjang", poli("or6", 130, 62, [[30, 0], [140, 0], [110, 50], [0, 50]], "#FBCFE8", W.coklat), garis("or7", 186, 62, -30, 50, W.biru, 1.6), garis("or8", 186, 62, 40, 50, W.biru, 1.6), garis("or9", 226, 112, 30, -50, W.biru, 1.6)),
      tambah("terbuka.", ...kartu("or10", 40, 150, 220, 28, W.krem, ["jawaban terbuka: boleh banyak cara"], 9)),
    ),
  ],
};

/* ------------------------------ 12. Uji Kompetensi 14, 15, dan penilaian (Buku Siswa hlm. 176; Panduan Guru hlm. 205–210) ------------------------------ */
export const ADEGAN_UK_3: AdeganStory = {
  id: "uk-3",
  judul: "Uji Kompetensi 14, 15, dan penilaian",
  sumber: "Buku Siswa hlm. 176; Panduan Guru hlm. 205–210",
  latar: "#F0F9FF",
  kutipan: [
    "Perhatikan penyusunan beberapa bangun datar sehingga menjadi satu",
    "Susun beberapa bangun datar tersebut sehingga menjadi satu bangun",
    "datar yang berbeda dengan gambar tersebut.",
    "Perhatikan bangun datar yang telah diuraikan menjadi beberapa bangun",
    "Uraikan bangun datar tersebut sehingga menjadi beberapa bangun datar",
    "Tabel 5.2 Pedoman Penilaian Hasil Belajar",
    "Tabel 5.3 Penilaian Keterampilan",
    "Aspek yang Dinilai",
    "Menyusun atau mengurai",
  ],
  ketukan: [
    k(
      "Nomor empat belas: bangun-bangun terpisah ditunjuk panah menuju satu bangun. Susun menjadi bangun lain. Nomor lima belas sebaliknya: uraikan bangun yang sudah tersusun. Panduan Guru hanya mengulang soal, jawabannya terbuka.",
      tambah(0, judul("Uji Kompetensi 14 dan 15")),
      tambah("empat", ...kartu("n14", 14, 34, 136, 22, W.langit, ["14: susun jadi bangun lain"], 8.4)),
      tambah("bangun-bangun", poli("s1", 24, 70, [[0, 0], [24, 0], [12, 20]], "#FAA61A", W.putih), poli("s2", 62, 70, [[0, 0], [22, 0], [22, 22], [0, 22]], "#FFF200", W.coklat), poli("s3", 100, 70, [[8, 0], [30, 0], [22, 18], [0, 18]], "#ED008C", W.putih)),
      tambah("panah", panah("sa", 76, 104, 0, 22, W.merah, 2), emo("sq", 76, 148, "?", 24, { warna: W.biru })),
      tambah("lima", ...kartu("n15", 156, 34, 136, 22, W.hijauMuda, ["15: uraikan bangun"], 8.4)),
      tambah("uraikan", poli("u1", 178, 70, [[0, 0], [90, 0], [90, 40], [0, 40]], "#93C5FD", W.biru)),
      tambah("sebaliknya:", panah("ua", 224, 114, 0, 20, W.merah, 2)),
      tambah("sebaliknya:", poli("u2a", 184, 140, [[0, 0], [30, 0], [0, 24]], "#FAA61A", W.putih), poli("u2b", 222, 140, [[0, 0], [22, 0], [22, 22], [0, 22]], "#FFF200", W.coklat), poli("u2c", 252, 140, [[8, 0], [30, 0], [22, 18], [0, 18]], "#ED008C", W.putih)),
      tambah("terbuka.", teks("n16", 150, 190, "jawaban terbuka", 8.6, W.coklat)),
    ),
    k(
      "Rubrik pengetahuan Tabel lima titik dua memuat lima belas butir. Sepuluh butir bernilai lima, jadi lima puluh. Lima butir bernilai sepuluh, jadi lima puluh. Jumlahnya seratus.",
      bersih(0),
      tambah(0, judul("Rubrik pengetahuan: 15 butir")),
      tambah(10, ...kartu("rb1", 14, 36, 272, 26, W.langit, ["10 butir bernilai 5"], 9)),
      tambah(14, ...kartu("rb2", 80, 68, 140, 22, W.krem, ["10 × 5 = 50"], 9.6)),
      tambah(17, ...kartu("rb3", 14, 98, 272, 26, W.hijauMuda, ["5 butir bernilai 10"], 9)),
      tambah(21, ...kartu("rb4", 80, 130, 140, 22, W.krem, ["5 × 10 = 50"], 9.6)),
      tambah(24, ...kartu("rb5", 60, 162, 180, 28, W.pink, ["50 + 50 = 100"], 10.4)),
    ),
    k(
      "Skor tiap butir bertingkat: nol bila tidak menjawab, tiga bila sebagian benar, dan lima atau sepuluh bila semua benar. Butir lima memberi dua koma lima untuk tiap pertanyaan.",
      bersih(0),
      tambah(0, judul("Penskoran tiap butir")),
      tambah("nol", ...kartu("sk1", 14, 38, 86, 44, W.merahMuda, ["skor 0", "tidak menjawab"], 8)),
      tambah("tiga", ...kartu("sk2", 107, 38, 86, 44, W.krem, ["skor 3", "sebagian benar"], 8)),
      tambah("lima", ...kartu("sk3", 200, 38, 86, 44, W.hijauMuda, ["skor 5 atau 10", "semua benar"], 7.6)),
      tambah(19, ...kartu("sk4", 40, 108, 220, 28, W.langit, ["butir 5: tiap pertanyaan 2,5"], 9)),
      tambah(22, ...kartu("sk5", 90, 146, 120, 26, W.pink, ["4 × 2,5 = 10"], 9.6)),
    ),
    k(
      "Penilaian keterampilan, Tabel lima titik tiga, menilai tiga aspek: menyusun, mengurai, dan menyusun atau mengurai lebih dari satu cara, masing-masing empat kriteria. Nilai sama dengan jumlah skor dibagi dua belas, dikali seratus.",
      bersih(0),
      tambah(0, judul("Penilaian keterampilan")),
      tambah("menyusun,", ...kartu("kt1", 14, 34, 86, 40, W.langit, ["aspek 1", "menyusun"], 8.2)),
      tambah("mengurai,", ...kartu("kt2", 107, 34, 86, 40, W.krem, ["aspek 2", "mengurai"], 8.2)),
      tambah("atau", ...kartu("kt3", 200, 34, 86, 40, W.hijauMuda, ["aspek 3", "lebih dari 1 cara"], 7.2)),
      tambah("empat", ...kartu("kt4", 90, 86, 120, 24, W.pink, ["3 × 4 = 12 skor"], 9)),
      tambah("dikali", ...kartu("kt5", 50, 124, 200, 30, W.krem, ["Nk = n / 12 × 100"], 10.4)),
    ),
  ],
};

/* ------------------------------ 13. Soal pengayaan (Panduan Guru hlm. 212–213) ------------------------------ */
const SK = 0.8;
export const ADEGAN_PENGAYAAN: AdeganStory = {
  id: "pengayaan",
  judul: "Soal pengayaan 1 sampai 5",
  sumber: "Panduan Guru hlm. 212–213",
  latar: "#FEFCE8",
  kutipan: [
    "Salah satu bentuk segitiga sama kaki adalah segitiga siku-siku sama kaki.",
    "Dapatkah dibentuk segitiga siku-siku sama sisi",
    "Dapat. Penjelasannya melalui gambar berikut.",
    "Dapatkah jajar genjang juga dinamakan trapesium? Jelaskan!",
    "Tidak dapat, karena jajar genjang cirinya memiliki dua pasang sisi",
    "Dapatkah belah ketupat dinamakan juga sebagai layang-layang? Jelaskan!",
    "karena belah ketupat jangankan memiliki dua pasang sisi berdekatan",
    "tetapi memiliki 4 pasang sisi berdekatan sama panjang.",
    "Buatlah sebuah bangun datar menarik yang tersusun (komposisi) atas",
    "Buatlah 5 bangun datar berbeda yang diperoleh dengan menguraikan",
    "(dekomposisi) dari bangun datar berikut.",
  ],
  ketukan: [
    k(
      "Soal pengayaan satu: salah satu bentuk segitiga sama kaki adalah segitiga siku-siku sama kaki. Dapatkah dibentuk segitiga siku-siku sama sisi? Kunci menjawab dapat, dengan gambar segitiga siku-siku sama kaki.",
      tambah(0, judul("Pengayaan 1")),
      tambah("segitiga", poli("pg1", 40, 56, [[0, 0], [0, 80], [80, 80]], "#B45309", W.hitam, { tebal: 1.4 })),
      tambah("siku-siku@2", teks("pg1a", 36, 150, "90°", 8, W.hitam)),
      tambah("sama@2", ...kartu("pg1b", 156, 50, 134, 30, W.krem, ["soal: siku-siku", "sama sisi?"], 8.4)),
      tambah("Kunci", ...kartu("pg1c", 156, 92, 134, 30, W.hijauMuda, ["kunci: dapat"], 9.4)),
      tambah("gambar", teks("pg1d", 80, 160, "gambar kunci: sama kaki", 7.4, W.coklat)),
    ),
    k(
      "Hitungan mandiri: segitiga sama sisi memiliki tiga sudut enam puluh derajat, tidak ada yang sembilan puluh. Jadi jawabannya tidak dapat. Gambar kunci itu hanya segitiga siku-siku sama kaki.",
      hapus(0, "pg1a", "pg1b-k", "pg1b-t0", "pg1b-t1", "pg1c-k", "pg1c-t0", "pg1d"),
      tambah("sama@1", poli("pg2", 180, 56, [[0, 69], [80, 69], [40, 0]], "#BFDBFE", W.biru, { tebal: 1.4 }), teks("pg2a", 176, 134, "60°", 8, W.biru), teks("pg2b", 264, 134, "60°", 8, W.biru), teks("pg2c", 220, 52, "60°", 8, W.biru)),
      tambah("sembilan", ...kartu("pg2d", 156, 150, 134, 26, W.merahMuda, ["tidak ada sudut 90°"], 8.6)),
      tambah("tidak", ...kartu("pg2e", 14, 168, 120, 26, W.pink, ["jadi: tidak dapat"], 9)),
    ),
    k(
      "Soal dua: jajargenjang tidak dapat dinamakan trapesium, karena trapesium memiliki tepat sepasang sisi sejajar. Soal tiga: belah ketupat dapat dinamakan layang-layang, karena punya empat pasang sisi berdekatan sama panjang.",
      bersih(0),
      tambah(0, judul("Pengayaan 2 dan 3")),
      tambah("jajargenjang", ...kartu("p21", 14, 34, 272, 28, W.krem, ["jajargenjang: 2 pasang sisi sejajar"], 9)),
      tambah("trapesium", ...kartu("p22", 14, 68, 272, 28, W.langit, ["trapesium: tepat 1 pasang"], 9)),
      tambah("tidak", ...kartu("p23", 80, 102, 140, 22, W.merahMuda, ["tidak dapat"], 9)),
      tambah("belah", ...kartu("p31", 14, 130, 272, 28, W.hijauMuda, ["belah ketupat: 4 pasang sisi berdekatan sama"], 8.2)),
      tambah("dapat@2", ...kartu("p32", 80, 164, 140, 22, W.pink, ["dapat: layang-layang"], 8.6)),
    ),
    k(
      "Soal empat: susun bangun yang menarik dari tujuh bangun yang diberikan. Kunci menyusunnya menjadi sebuah rumah dengan cerobong.",
      bersih(0),
      tambah(0, judul("Pengayaan 4: komposisi")),
      tambah("tujuh", ...BAHAN_ENAM.map((p, i) => keping(`bh${i}`, 6, 60, p, 0.3))),
      tambah("rumah", ...RUMAH_KUNCI.map((p, i) => keping(`rk${i}`, 150, 34, p, SK))),
      tambah("cerobong.", teks("rkt", 222, 186, "rumah dengan cerobong", 8.4, W.coklat)),
    ),
    k(
      "Soal lima: buat lima bangun berbeda dengan menguraikan gambar rumah itu. Kunci memberi lima bangun: dua segitiga dan tiga segiempat.",
      bersih(0),
      tambah(0, judul("Pengayaan 5: dekomposisi")),
      tambah("rumah", poli("ru", 8, 36, skala(RUMAH_URAI, 0.6), "#E5E7EB", W.hitam, { tebal: 1.4 })),
      tambah("Kunci", ...KUNCI_LIMA.map((p, i) => keping(`kl${i}`, 150, 70, p, 0.38))),
      tambah("segitiga", teks("klt", 220, 188, "2 segitiga, 3 segiempat", 8.2, W.coklat)),
    ),
  ],
};

/* ------------------------------ 14. Refleksi, interaksi orang tua, dan sumber bacaan (Buku Siswa hlm. 176; Panduan Guru hlm. 211, 213–214) ------------------------------ */
export const ADEGAN_PENUTUP_B: AdeganStory = {
  id: "penutup-b",
  judul: "Refleksi, interaksi orang tua, dan penutup bab",
  sumber: "Buku Siswa hlm. 176; Panduan Guru hlm. 211, 213–214",
  latar: "#F5F3FF",
  kutipan: [
    "Pada bab ini, kalian sudah mempelajari materi bangun datar meliputi segitiga,",
    "segiempat dan beberapa segibanyak lainnya.",
    "Masih adakah bagian yang terasa sulit?",
    "diskusikanlah dengan temanmu.",
    "Apakah manfaat yang kalian peroleh",
    "Apa yang saya sukai dari kegiatan pembelajaran ini?",
    "Kapan atau pada bagian mana saya merasa kreatif ketika mengajar",
    "Pada langkah ke berapa peserta didik paling belajar banyak?",
    "Guru setiap semester mengadakan rapat dengan orang tua peserta didik",
    "Guru dapat membuat grup komunitas untuk setiap kelas dengan para",
    "Setiap diakhir bab terdapat pengayaan dengan memanfaatkan teknologi",
    "Guru menyediakan waktu setiap minggu untuk diskusi dengan orang tua",
    "Guru mengadakan seminar atau layanan konsultasi tiap bulan",
    "https://sumber.belajar.kemdikbud.go.id",
  ],
  ketukan: [
    k(
      "Refleksi di Buku Siswa: kalian sudah mempelajari segitiga, segiempat, dan segi banyak lainnya. Masih adakah yang sulit? Diskusikan dengan teman atau minta bantuan guru. Apa manfaat yang kalian peroleh?",
      tambah(0, judul("Refleksi bab")),
      tambah("segitiga,", ...kartu("rf1", 14, 34, 272, 26, W.langit, ["sudah belajar segitiga, segiempat, segi banyak"], 8.4)),
      tambah("sulit?", ...kartu("rf2", 14, 68, 272, 26, W.krem, ["adakah bagian yang masih sulit?"], 9)),
      tambah("Diskusikan", ...kartu("rf3", 14, 102, 272, 26, W.hijauMuda, ["diskusikan dengan teman atau guru"], 9)),
      tambah("manfaat", ...kartu("rf4", 14, 136, 272, 26, W.pink, ["apa manfaat mempelajari bangun datar?"], 9)),
    ),
    k(
      "Panduan Guru memberi sepuluh pertanyaan refleksi diri guru, misalnya apa yang saya sukai, kapan saya merasa kreatif, dan pada langkah ke berapa peserta didik paling banyak belajar.",
      bersih(0),
      tambah(0, judul("Refleksi diri guru: 10 pertanyaan")),
      tambah("sepuluh", ...kartu("rg1", 14, 36, 272, 28, W.langit, ["10 pertanyaan refleksi"], 9.6)),
      tambah("sukai,", ...kartu("rg2", 14, 72, 272, 24, W.krem, ["apa yang saya sukai?"], 8.6)),
      tambah("kreatif,", ...kartu("rg3", 14, 104, 272, 24, W.hijauMuda, ["kapan saya merasa kreatif?"], 8.6)),
      tambah("langkah", ...kartu("rg4", 14, 136, 272, 24, W.pink, ["langkah ke berapa siswa paling banyak belajar?"], 8)),
    ),
    k(
      "Interaksi dengan orang tua ada enam: rapat tiap semester, grup kelas, pengayaan lewat barcode, diskusi tiap minggu, kunjungan untuk siswa yang kesulitan, dan seminar atau konsultasi tiap bulan.",
      bersih(0),
      tambah(0, judul("Interaksi dengan orang tua: 6 cara")),
      tambah("rapat", ...kartu("io1", 14, 34, 132, 26, W.langit, ["rapat tiap semester"], 8.4)),
      tambah("grup", ...kartu("io2", 154, 34, 132, 26, W.krem, ["grup komunitas kelas"], 8.4)),
      tambah("barcode,", ...kartu("io3", 14, 68, 132, 26, W.hijauMuda, ["pengayaan lewat barcode"], 8.4)),
      tambah("diskusi", ...kartu("io4", 154, 68, 132, 26, W.pink, ["diskusi tiap minggu"], 8.4)),
      tambah("kunjungan", ...kartu("io5", 14, 102, 132, 26, W.jingga, ["kunjungan ke rumah"], 8.4)),
      tambah("seminar", ...kartu("io6", 154, 102, 132, 26, W.merahMuda, ["seminar atau konsultasi"], 8.4)),
      tambah("bulan.", teks("io7", 150, 152, "6 cara semuanya", 8.6, W.coklat)),
    ),
    k(
      "Sumber bacaan siswa: Buku Siswa Matematika Kelas IV dan situs sumber belajar Kemendikbud. Komposisi menyusun beberapa bangun menjadi satu, dekomposisi mengurai satu bangun menjadi beberapa.",
      bersih(0),
      tambah(0, judul("Sumber bacaan dan rangkuman")),
      tambah("Buku", ...kartu("sb1", 14, 34, 272, 24, W.krem, ["Buku Siswa Matematika Kelas IV"], 8.6)),
      tambah("situs", ...kartu("sb2", 14, 64, 272, 24, W.langit, ["sumber.belajar.kemdikbud.go.id"], 8.4)),
      tambah("Komposisi", ...kartu("sb3", 14, 100, 130, 40, W.hijauMuda, ["komposisi", "menyusun jadi satu"], 8.4)),
      tambah("dekomposisi", ...kartu("sb4", 156, 100, 130, 40, W.pink, ["dekomposisi", "mengurai jadi beberapa"], 8.2)),
      tambah("beberapa.", emo("sb5", 150, 176, "🏠", 22)),
    ),
  ],
};
