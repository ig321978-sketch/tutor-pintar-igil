import type { AdeganStory, Obj } from "./logika-story";
import { FX, FY, LAP, RUTE, W, emo, jalur, judul, kartu, kotak, lapangan, poligon, tabel, teks, ukuranLapangan } from "./k5b4a-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k5b4a-bantu";

/* ------------------------------ 1. Perimeter vs Area: konsep ------------------------------ */
export const ADEGAN_LUAR_AREA: AdeganStory = {
  id: "luar-area",
  judul: "Perimeter vs Area: membedakan keliling dan luas",
  sumber: "Metode luar: Perimeter vs Area",
  latar: "#FFFBEB",
  ketukan: [
    k(
      "Metode ketiga, Perimeter vs Area, membedakan keliling dan luas. Keliling adalah garis tepi, yaitu panjang jalur yang mengelilingi. Luas adalah isi permukaan di dalam tepi.",
      tambah(0, judul("Perimeter vs Area")),
      tambah("Keliling@2", poligon("a1", 20, 54, [[0, 0], [100, 0], [100, 60], [0, 60]], "none", W.merah, { tebal: 4 }), teks("a1t", 70, 134, "keliling = tepi", 9, W.merah)),
      tambah("Luas@2", poligon("a2", 180, 54, [[0, 0], [100, 0], [100, 60], [0, 60]], W.rumput, W.hijau, { tebal: 1.6 }), teks("a2t", 230, 134, "luas = isi", 9, W.hijau)),
    ),
    k(
      "Satuannya berbeda. Keliling memakai satuan panjang, seperti sentimeter dan meter. Luas memakai satuan persegi, seperti sentimeter persegi dan meter persegi.",
      bersih(0),
      tambah(0, judul("Satuan yang berbeda")),
      tambah("Keliling", ...kartu("u1", 14, 40, 130, 56, W.merahMuda, ["keliling", "satuan panjang", "cm, m"], 9)),
      tambah("Luas", ...kartu("u2", 156, 40, 130, 56, W.hijauMuda, ["luas", "satuan persegi", "cm², m²"], 9)),
      tambah("persegi,", teks("u3", 150, 130, "jangan tertukar", 10, W.ungu)),
    ),
    k(
      "Pertanyaan pemandu: kalau yang dicari pagar, tali, atau bingkai, itu keliling. Kalau yang dicari rumput, ubin, atau cat dinding, itu luas.",
      bersih(0),
      tambah(0, judul("Pertanyaan pemandu")),
      tambah("pagar,", emo("p1", 40, 76, "🏠", 28), teks("p1t", 40, 94, "pagar", 8.2, W.merah)),
      tambah("tali,", emo("p2", 84, 76, "🧵", 28), teks("p2t", 84, 94, "tali", 8.2, W.merah)),
      tambah("bingkai,", emo("p3", 128, 76, "🖼", 28), teks("p3t", 128, 94, "bingkai", 8.2, W.merah)),
      tambah("keliling.", ...kartu("pk", 22, 106, 124, 28, W.merahMuda, ["itu keliling"], 9.4)),
      tambah("rumput,", emo("p4", 180, 76, "🌱", 28), teks("p4t", 180, 94, "rumput", 8.2, W.hijau)),
      tambah("ubin,", emo("p5", 224, 76, "🧱", 28), teks("p5t", 224, 94, "ubin", 8.2, W.hijau)),
      tambah("dinding,", emo("p6", 268, 76, "🎨", 28), teks("p6t", 268, 94, "cat", 8.2, W.hijau)),
      tambah("luas.", ...kartu("pl", 160, 106, 124, 28, W.hijauMuda, ["itu luas"], 9.4)),
    ),
    k(
      "Kesalahan yang umum: orang menghitung keliling tetapi mengira sudah menghitung luas, atau sebaliknya. Karena itu tanyakan dulu, yang dihitung tepinya atau isinya?",
      bersih(0),
      tambah(0, judul("Tepinya atau isinya?")),
      tambah("Kesalahan", ...kartu("ks", 30, 40, 240, 40, W.merahMuda, ["keliling dikira luas", "luas dikira keliling"], 9.2), emo("kx", 270, 36, "❌", 20)),
      tambah("tanyakan", teks("kq", 150, 120, "?", 46, W.ungu)),
      tambah("tepinya", ...kartu("kt", 30, 146, 108, 30, W.krem, ["tepinya = keliling"], 8.6)),
      tambah("isinya?", ...kartu("ki", 162, 146, 108, 30, W.hijauMuda, ["isinya = luas"], 8.6)),
    ),
  ],
};

/* ------------------------------ 2. Perimeter vs Area: penerapan pada lapangan ------------------------------ */
export const ADEGAN_LUAR_AREA_TERAPAN: AdeganStory = {
  id: "luar-area-terapan",
  judul: "Perimeter vs Area pada lapangan sepak bola",
  sumber: "Metode luar: Perimeter vs Area; contoh lapangan Buku Siswa hlm. 113",
  latar: "#FFFBEB",
  ketukan: [
    k(
      "Lihat lapangan seratus meter kali lima puluh meter. Garis tepinya dipasangi pagar. Panjang pagar adalah keliling: seratus tambah lima puluh tambah seratus tambah lima puluh sama dengan tiga ratus meter.",
      tambah(0, judul("Keliling lapangan")),
      tambah("Lihat", ...lapangan("lp", FX, FY), ...ukuranLapangan("lp", FX, FY)),
      tambah("pagar", kotak("pg", FX - 4, FY - 4, LAP.pw + 8, LAP.ph + 8, "none", W.merah, { tebal: 3.2, rx: 1 })),
      tambah("seratus@2", teks("ke", 150, 182, "100 + 50 + 100 + 50 = 300 m", 10, W.merah)),
    ),
    k(
      "Sekarang isinya, yaitu rumput yang menutupi seluruh permukaan lapangan. Itu luas, dan ukurannya memakai satuan persegi, bukan satuan panjang.",
      hapus("Sekarang", "pg", "ke"),
      ubah(0, { id: "jud", isi: "Luas lapangan" }),
      ubah("rumput", { id: "lp-lp", warna: "#4ADE80" }),
      tambah("Itu@2", teks("li", 150, 182, "rumput = isi = luas", 10, W.hijau)),
      tambah("persegi,", teks("ls", 150, 196, "satuan persegi", 8.6, W.hijau)),
    ),
    k(
      "Dengan satuan persegi, luas lapangan seratus kali lima puluh sama dengan lima ribu meter persegi, sedangkan kelilingnya tiga ratus meter. Dua angka itu menjawab dua pertanyaan yang berbeda.",
      bersih(0),
      tambah(0, judul("Dua pertanyaan berbeda")),
      tambah("luas", ...kartu("lk", 14, 36, 272, 44, W.hijauMuda, ["Luas: 100 × 50 = 5000 m²", "(isi permukaan lapangan)"], 9.4)),
      tambah("kelilingnya", ...kartu("kl", 14, 92, 272, 44, W.merahMuda, ["Keliling: 100 + 50 + 100 + 50 = 300 m", "(panjang pagar di tepi)"], 9.4)),
      tambah("berbeda.", teks("lq", 150, 164, "dua angka, dua pertanyaan", 9.6, W.ungu)),
    ),
    k(
      "Ringkasnya, tiga ratus meter melingkari tepi, sedangkan lima ribu meter persegi mengisi bagian dalam. Keduanya tidak boleh dijumlahkan, sebab satuannya berbeda.",
      bersih(0),
      tambah(0, judul("Jangan dijumlahkan")),
      tambah("tiga", ...kartu("r1", 14, 40, 124, 52, W.merahMuda, ["300 m", "melingkari tepi"], 10)),
      tambah("lima", ...kartu("r2", 162, 40, 124, 52, W.hijauMuda, ["5000 m²", "mengisi dalam"], 10)),
      tambah("dijumlahkan,", emo("rx", 150, 130, "❌", 30), teks("rt", 150, 152, "satuannya berbeda", 9.4, W.ungu)),
    ),
  ],
};

/* ------------------------------ 3. Closed Loop Test: konsep ------------------------------ */
export const ADEGAN_LUAR_LOOP: AdeganStory = {
  id: "luar-loop",
  judul: "Closed Loop Test: uji jalur tertutup",
  sumber: "Metode luar: Closed Loop Test",
  latar: "#FAF5FF",
  ketukan: [
    k(
      "Metode keempat, Closed Loop Test, atau uji jalur tertutup. Sebelum menyebut sebuah rute sebagai keliling, ajukan dua pertanyaan uji.",
      tambah(0, judul("Closed Loop Test")),
      tambah("jalur", jalur("cl", 90, 50, "M0 70 L120 70 L120 0 L0 0 L0 70", "none", W.ungu, { tebal: 3.4, gambar: true }), emo("cr", 214, 100, "🔄", 30)),
      tambah("dua", teks("cq", 150, 160, "dua pertanyaan uji", 10, W.ungu)),
    ),
    k(
      "Pertanyaan pertama: apakah rute berhenti di titik awal? Pertanyaan kedua: apakah setiap sisi dilalui tepat satu kali? Kalau keduanya ya, rute itu adalah keliling.",
      bersih(0),
      tambah(0, judul("Dua pertanyaan uji")),
      tambah("pertama:", ...kartu("q1", 14, 36, 272, 34, W.langit, ["1. berhenti di titik awal?"], 9.4)),
      tambah("kedua:", ...kartu("q2", 14, 80, 272, 34, W.krem, ["2. tiap sisi dilalui tepat satu kali?"], 9.4)),
      tambah("keduanya", emo("y1", 262, 60, "✅", 18), emo("y2", 262, 104, "✅", 18)),
      tambah("keliling.", ...kartu("q3", 50, 130, 200, 32, W.emas, ["rute itu adalah keliling"], 9.6)),
    ),
    k(
      "Kalau salah satu jawabannya tidak, panjang rute tetap bisa dihitung, tetapi namanya bukan keliling. Itu hanya jarak tempuh.",
      bersih(0),
      tambah(0, judul("Salah satu tidak")),
      tambah("Kalau", ...kartu("n1", 14, 40, 272, 34, W.merahMuda, ["salah satu jawaban: tidak"], 9.4), emo("n1e", 262, 62, "❌", 18)),
      tambah("tetap", ...kartu("n2", 14, 86, 272, 34, W.krem, ["panjang rute tetap bisa dihitung"], 9.4)),
      tambah("bukan", ...kartu("n3", 14, 132, 272, 34, W.hijauMuda, ["tetapi itu jarak tempuh, bukan keliling"], 9)),
    ),
    k(
      "Kelebihannya, uji ini menangkap kesalahan umum, seperti bolak-balik atau lewat tengah. Kekurangannya, ia hanya menguji rute, belum menghitung panjangnya, jadi sisi tetap harus dijumlahkan.",
      bersih(0),
      tambah(0, judul("Kelebihan dan kekurangan")),
      tambah("Kelebihannya,", ...kartu("kl", 14, 36, 130, 56, W.hijauMuda, ["menangkap", "kesalahan umum:", "bolak-balik, tengah"], 8.4), emo("kle", 79, 114, "👍", 24)),
      tambah("Kekurangannya,", ...kartu("kk", 156, 36, 130, 56, W.merahMuda, ["hanya menguji rute,", "belum menghitung", "panjangnya"], 8.4)),
    ),
  ],
};

/* ------------------------------ 4. Closed Loop Test: uji empat rute lari ------------------------------ */
/** Mengecilkan semua angka dalam jalur dengan faktor f (lapangan 180 kali 90 menjadi lebih kecil). */
export const kecilkan = (d: string, f: number): string => d.replace(/-?\d+(?:\.\d+)?/g, (n) => (Number(n) * f).toFixed(1));
const FM = 0.5;
const SEL = [
  { id: "mn", x: 24, y: 34, nama: "Nisa", rute: RUTE.nisa, warna: W.merah },
  { id: "ml", x: 176, y: 34, nama: "Lukas", rute: RUTE.lukas, warna: W.ungu },
  { id: "my", x: 24, y: 114, nama: "Yohana", rute: RUTE.yohana, warna: W.coklat },
  { id: "ma", x: 176, y: 114, nama: "Asep", rute: RUTE.asep, warna: W.biru },
];
const mini = (i: number): Obj[] => [...lapangan(SEL[i].id, SEL[i].x, SEL[i].y, LAP.pw * FM, LAP.ph * FM), jalur(`${SEL[i].id}-r`, SEL[i].x, SEL[i].y, kecilkan(SEL[i].rute, FM), "none", SEL[i].warna, { tebal: 2, gambar: true }), bulat0(`${SEL[i].id}-st`, SEL[i].x, SEL[i].y + LAP.ph * FM)];
const bulat0 = (id: string, x: number, y: number): Obj => ({ id, t: "bulat", x, y, r: 3, warna: W.merah, garis: W.putih, tebal: 1 });
const vonis = (i: number, isi: string, warna: string): Obj => teks(`${SEL[i].id}-v`, SEL[i].x + (LAP.pw * FM) / 2, SEL[i].y + LAP.ph * FM + 13, isi, 7.8, warna);

export const ADEGAN_LUAR_LOOP_TERAPAN: AdeganStory = {
  id: "luar-loop-terapan",
  judul: "Closed Loop Test pada empat rute lari",
  sumber: "Metode luar: Closed Loop Test; rute Buku Siswa hlm. 110–111",
  latar: "#FAF5FF",
  ketukan: [
    k(
      "Uji rute Nisa. Ia berhenti di sudut seberang, bukan di titik awal, dan hanya memakai satu sisi. Dua pertanyaan dijawab tidak, jadi rute Nisa bukan keliling.",
      tambah(0, judul("Uji empat rute")),
      tambah("Nisa.", ...mini(0)),
      tambah("seberang,", vonis(0, "berhenti di titik awal? tidak", W.merah)),
      tambah("tidak,", teks("mn-v2", 24 + (LAP.pw * FM) / 2, 34 + LAP.ph * FM + 24, "Nisa: bukan keliling", 7.8, W.merah)),
    ),
    k(
      "Rute Lukas dan Yohana. Lukas hanya memakai satu sisi yang pendek. Yohana lewat tengah dan berhenti jauh dari titik awal. Keduanya gagal uji.",
      tambah("Lukas", ...mini(1)),
      tambah("sisi", vonis(1, "tiap sisi sekali? tidak", W.merah)),
      tambah("Yohana", ...mini(2)),
      tambah("jauh", vonis(2, "berhenti di titik awal? tidak", W.merah)),
      tambah("gagal", teks("ml-v2", 176 + (LAP.pw * FM) / 2, 34 + LAP.ph * FM + 24, "Lukas: bukan keliling", 7.8, W.merah), teks("my-v2", 24 + (LAP.pw * FM) / 2, 114 + LAP.ph * FM + 24, "Yohana: bukan keliling", 7.8, W.merah)),
    ),
    k(
      "Rute Asep. Ia berhenti di titik awal dan tiap sisi dilalui tepat satu kali. Dua jawaban ya, jadi rute Asep adalah keliling: seratus tambah lima puluh tambah seratus tambah lima puluh sama dengan tiga ratus meter.",
      tambah("Asep.", ...mini(3)),
      tambah("tepat", vonis(3, "dua jawaban: ya", W.hijau), emo("ma-ok", 176 + 14, 114 + LAP.ph * FM - 6, "✅", 14)),
      tambah("seratus", teks("ma-v2", 176 + (LAP.pw * FM) / 2, 114 + LAP.ph * FM + 24, "100 + 50 + 100 + 50 = 300", 7.8, W.biru)),
    ),
    k(
      "Hasilnya, keempat rute sama-sama tiga ratus meter, tetapi hanya rute Asep yang merupakan keliling lapangan. Panjang saja tidak cukup, bentuk rutenya juga harus tepat.",
      ubah("Hasilnya,", ...["mn", "ml", "my"].flatMap((id) => ["lp", "gt", "bt", "r", "st", "v", "v2"].map((b) => ({ id: `${id}-${b}`, op: 0.3 })))),
      tambah("keempat", teks("hk", 145, 60, "semua 300 m", 8.4, W.ungu)),
      tambah("hanya", teks("hn", 150, 196, "hanya Asep = keliling", 9.4, W.hijau)),
    ),
  ],
};

/* ------------------------------ 5. Ringkasan ------------------------------ */
export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan empat metode dari luar",
  sumber: "Ringkasan metode luar",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Mari ringkas. Path Length menyusuri tepi satu putaran. Fencing Context melihat keliling sebagai panjang bahan pagar atau bingkai. Perimeter vs Area membedakan tepi dari isi. Closed Loop Test memeriksa rute yang kembali ke titik awal.",
      tambah(0, judul("Ringkasan empat metode")),
      tambah("Path", ...kartu("r1", 12, 32, 276, 34, W.hijauMuda, ["Path Length: susuri tepi satu putaran"], 8.6)),
      tambah("Fencing", ...kartu("r2", 12, 72, 276, 34, W.langit, ["Fencing Context: panjang bahan pagar, bingkai"], 8.6)),
      tambah("Perimeter", ...kartu("r3", 12, 112, 276, 34, W.krem, ["Perimeter vs Area: tepi lawan isi"], 8.6)),
      tambah("Closed", ...kartu("r4", 12, 152, 276, 34, W.pink, ["Closed Loop Test: rute kembali ke titik awal"], 8.6)),
    ),
    k(
      "Memilih metode: untuk benda nyata, pakai Path Length atau Fencing Context. Kalau bingung antara keliling dan luas, pakai Perimeter vs Area. Untuk memeriksa sebuah rute, pakai Closed Loop Test.",
      bersih(0),
      tambah(0, judul("Memilih metode")),
      tambah("benda", ...kartu("p1", 12, 36, 276, 34, W.hijauMuda, ["benda nyata → Path Length / Fencing Context"], 8.6)),
      tambah("bingung", ...kartu("p2", 12, 80, 276, 34, W.krem, ["bingung keliling atau luas → Perimeter vs Area"], 8.6)),
      tambah("memeriksa", ...kartu("p3", 12, 124, 276, 34, W.pink, ["memeriksa rute → Closed Loop Test"], 8.6)),
    ),
    k(
      "Semua hasil cocok dengan buku. Lapangan tiga ratus meter, bangun pertama enam belas sentimeter, dan bangun kedua sembilan belas sentimeter.",
      bersih(0),
      tambah(0, judul("Cocok dengan buku")),
      tambah("Lapangan", ...tabel("kn", 22, 50, [86, 86, 86], [["Lapangan", "Bangun pertama", "Bangun kedua"], ["300 m", "16 cm", "19 cm"]], 28, 8.4)),
      tambah("Semua", teks("kc", 150, 126, "sisi: 100, 50, 100, 50 | 4, 4, 4, 4 | 5, 4, 5, 5", 7.6, W.ungu)),
    ),
    k(
      "Apa pun metodenya, keliling adalah jumlahan panjang sisi-sisi bangun datar. Pilih cara yang cocok, lalu periksa dengan cara lain. Selamat belajar.",
      bersih(0),
      tambah(0, judul("Satu gagasan, banyak cara")),
      tambah("keliling", poligon("fz", 90, 44, [[0, 0], [120, 0], [120, 60], [0, 60]], W.krem, W.merah, { tebal: 3 })),
      tambah("Pilih", ...kartu("fa", 30, 130, 240, 34, W.emas, ["pilih cara, lalu periksa dengan cara lain"], 9)),
      tambah("belajar.", emo("fy", 150, 192, "🎉", 18)),
    ),
  ],
};

