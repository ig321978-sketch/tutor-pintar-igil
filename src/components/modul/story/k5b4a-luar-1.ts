import type { AdeganStory, Obj } from "./logika-story";
import { FX, FY, LAP, W, bingkai, emo, garis, jalur, judul, kartu, kotak, lapangan, poligon, tabel, teks, titikBangunDua, titikBangunSama, titikStart, ukuranLapangan } from "./k5b4a-gambar";
import { bersih, k, tambah, ubah } from "./k5b4a-bantu";

/** Persegi panjang kecil sebagai wakil bangun datar, pojok kiri-atas (x, y). */
const persegiPanjang = (id: string, x: number, y: number, w: number, h: number, warna: string = W.krem): Obj => poligon(id, x, y, [[0, 0], [w, 0], [w, h], [0, h]], warna, W.biru, { tebal: 2 });

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Empat metode dari luar untuk memahami keliling",
  sumber: "Metode luar: pembuka; contoh Buku Siswa hlm. 109–114",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Bagaimana kita memahami keliling bangun datar? Guru di berbagai negara punya cara berbeda. Dalam video ini kita lihat empat metode dari luar, memakai angka dari buku.",
      tambah(0, judul("Empat metode dari luar")),
      tambah("keliling", ...lapangan("pb", 30, 56, 140, 70), jalur("pbr", 30, 56, "M0 70 L140 70 L140 0 L0 0 L0 70", "none", W.biru, { tebal: 2.4, gambar: true })),
      tambah("berbagai", emo("gl", 232, 96, "🌍", 44)),
      tambah("angka", teks("pbt", 100, 150, "lapangan 100 m × 50 m", 8.8, W.biru)),
    ),
    k(
      "Empat metode itu: Path Length, Fencing Context, Perimeter vs Area, dan Closed Loop Test.",
      bersih(0),
      tambah(0, judul("Empat metode")),
      tambah("Path", ...kartu("m1", 12, 34, 276, 30, W.hijauMuda, ["1. Path Length"], 9.6)),
      tambah("Fencing", ...kartu("m2", 12, 72, 276, 30, W.langit, ["2. Fencing Context"], 9.6)),
      tambah("Perimeter", ...kartu("m3", 12, 110, 276, 30, W.krem, ["3. Perimeter vs Area"], 9.6)),
      tambah("Closed", ...kartu("m4", 12, 148, 276, 30, W.pink, ["4. Closed Loop Test"], 9.6)),
    ),
    k(
      "Semuanya memegang satu gagasan dari buku: keliling adalah jumlahan panjang sisi-sisi bangun datar, sama dengan panjang rute yang mengelilingi tepinya satu kali.",
      bersih(0),
      tambah(0, judul("Satu gagasan yang sama")),
      tambah("keliling", persegiPanjang("g", 80, 46, 140, 70, W.krem)),
      tambah("jumlahan", teks("ga", 150, 42, "a", 9, W.merah), teks("gb", 150, 130, "a", 9, W.merah), teks("gc", 72, 85, "b", 9, W.merah, { anchor: "end" }), teks("gd", 228, 85, "b", 9, W.merah, { anchor: "start" })),
      tambah("mengelilingi", jalur("gr", 80, 46, "M0 70 L140 70 L140 0 L0 0 L0 70", "none", W.merah, { tebal: 3, gambar: true })),
      tambah("kali.", ...kartu("gk", 40, 148, 220, 30, W.emas, ["keliling = jumlah semua sisi"], 9.6)),
    ),
    k(
      "Kita memakai angka dari buku: lapangan seratus meter kali lima puluh meter, bangun dengan empat sisi empat sentimeter, dan bangun dengan sisi lima, empat, lima, lima sentimeter.",
      bersih(0),
      tambah(0, judul("Angka dari buku")),
      tambah(5, ...kartu("a1", 14, 38, 272, 34, W.hijauMuda, ["lapangan: 100 m dan 50 m"], 9.4)),
      tambah(12, ...kartu("a2", 14, 84, 272, 34, W.langit, ["bangun pertama: 4, 4, 4, 4 cm"], 9.4)),
      tambah(19, ...kartu("a3", 14, 130, 272, 34, W.krem, ["bangun kedua: 5, 4, 5, 5 cm"], 9.4)),
    ),
  ],
};

/* ------------------------------ 2. Path Length: konsep ------------------------------ */
export const ADEGAN_LUAR_PATH: AdeganStory = {
  id: "luar-path",
  judul: "Path Length: keliling sebagai panjang jalur",
  sumber: "Metode luar: Path Length",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Metode pertama, Path Length, atau keliling sebagai panjang jalur. Bayangkan berjalan mengelilingi tepi bangun sampai kembali ke titik awal. Jarak yang kamu tempuh adalah keliling.",
      tambah(0, judul("Path Length")),
      tambah("bangun", persegiPanjang("pl", 80, 52, 140, 70, W.krem), emo("jl", 84, 110, "🚶", 20)),
      tambah("mengelilingi", jalur("pr", 80, 52, "M0 70 L140 70 L140 0 L0 0 L0 70", "none", W.biru, { tebal: 3, gambar: true })),
      tambah(24, ...kartu("pk", 50, 148, 200, 30, W.emas, ["jarak tempuh satu putaran = keliling"], 9)),
    ),
    k(
      "Langkahnya tiga. Pilih titik awal. Susuri tepi satu putaran penuh. Berhenti di titik awal, lalu ukur panjang jalurnya.",
      bersih(0),
      tambah(0, judul("Tiga langkah")),
      tambah("Pilih", ...kartu("l1", 14, 36, 272, 32, W.hijauMuda, ["1. pilih titik awal"], 9.4)),
      tambah("Susuri", ...kartu("l2", 14, 78, 272, 32, W.langit, ["2. susuri tepi satu putaran penuh"], 9.4)),
      tambah("Berhenti", ...kartu("l3", 14, 120, 272, 32, W.krem, ["3. berhenti di titik awal, ukur jalurnya"], 9.4)),
    ),
    k(
      "Jalur harus menyusuri tepi luar, bukan memotong lewat tengah. Rute lewat tengah, seperti rute Yohana, tidak menghasilkan keliling.",
      bersih(0),
      tambah(0, judul("Tepi luar, bukan tengah")),
      tambah("tepi", persegiPanjang("pt", 80, 44, 140, 70, W.krem), jalur("ptr", 80, 44, "M0 70 L140 70 L140 0 L0 0 L0 70", "none", W.hijau, { tebal: 3, gambar: true }), emo("ok", 150, 150, "✅", 22), teks("okt", 150, 170, "menyusuri tepi", 8.8, W.hijau)),
      tambah("tengah,", garis("pm", 150, 44, 0, 70, W.merah, 3, { putus: true, gambar: true }), emo("no", 250, 150, "❌", 22), teks("not", 250, 170, "lewat tengah", 8.8, W.merah)),
    ),
    k(
      "Kelebihannya, mudah dibayangkan dan cocok untuk benda nyata seperti lapangan. Kekurangannya, kalau sisinya banyak, mudah ada sisi yang terlewat atau terhitung dua kali.",
      bersih(0),
      tambah(0, judul("Kelebihan dan kekurangan")),
      tambah("Kelebihannya,", ...kartu("kl", 14, 36, 130, 50, W.hijauMuda, ["mudah dibayangkan,", "cocok untuk", "benda nyata"], 8.6), emo("kle", 79, 108, "👍", 24)),
      tambah("Kekurangannya,", ...kartu("kk", 156, 36, 130, 50, W.merahMuda, ["sisi banyak:", "mudah terlewat", "atau terhitung dua kali"], 8.6)),
    ),
  ],
};

/* ------------------------------ 3. Path Length: penerapan pada lapangan ------------------------------ */
const SISI = [
  { id: "s1", x: FX, y: FY + LAP.ph, dx: LAP.pw, dy: 0, warna: W.merah },
  { id: "s2", x: FX + LAP.pw, y: FY + LAP.ph, dx: 0, dy: -LAP.ph, warna: W.ungu },
  { id: "s3", x: FX + LAP.pw, y: FY, dx: -LAP.pw, dy: 0, warna: W.coklat },
  { id: "s4", x: FX, y: FY, dx: 0, dy: LAP.ph, warna: W.biru },
];
const sisi = (i: number): Obj => garis(SISI[i].id, SISI[i].x, SISI[i].y, SISI[i].dx, SISI[i].dy, SISI[i].warna, 4, { gambar: true });
const hitung = (isi: string): Obj => teks("ct", 150, 182, isi, 12, W.merah);

export const ADEGAN_LUAR_PATH_TERAPAN: AdeganStory = {
  id: "luar-path-terapan",
  judul: "Path Length pada lapangan sepak bola",
  sumber: "Metode luar: Path Length; contoh lapangan Buku Siswa hlm. 113",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Terapkan pada lapangan sepak bola. Asep mulai dari titik start di pojok kiri bawah. Ukurannya seratus meter kali lima puluh meter.",
      tambah(0, judul("Menyusuri lapangan")),
      tambah("lapangan", ...lapangan("lp", FX, FY), ...titikStart("lp", FX, FY)),
      tambah("Ukurannya", ...ukuranLapangan("lp", FX, FY)),
      tambah("Asep", emo("rn", FX + 10, FY + LAP.ph - 8, "🏃", 16), hitung("jalur: 0 m")),
    ),
    k(
      "Sisi bawah seratus meter. Hitungan jalur sekarang seratus.",
      tambah("bawah", sisi(0)),
      ubah("sekarang", { id: "ct", isi: "100" }),
    ),
    k(
      "Sisi kanan lima puluh meter, hitungan seratus lima puluh. Sisi atas seratus meter, hitungan dua ratus lima puluh.",
      tambah("kanan", sisi(1)),
      ubah("hitungan", { id: "ct", isi: "100 + 50 = 150" }),
      tambah("atas", sisi(2)),
      ubah("dua", { id: "ct", isi: "150 + 100 = 250" }),
    ),
    k(
      "Sisi kiri lima puluh meter, hitungan tiga ratus. Asep kembali ke titik start. Panjang jalur satu putaran, tiga ratus meter, adalah keliling lapangan.",
      tambah("kiri", sisi(3)),
      ubah("hitungan", { id: "ct", isi: "250 + 50 = 300" }),
      ubah("kembali", { id: "rn", x: FX + 10, y: FY + LAP.ph - 8 }),
      tambah("keliling", teks("kh", 150, 196, "keliling lapangan = 300 m", 9, W.hijau)),
    ),
  ],
};

/* ------------------------------ 4. Fencing Context: konsep ------------------------------ */
export const ADEGAN_LUAR_FENCING: AdeganStory = {
  id: "luar-fencing",
  judul: "Fencing Context: konteks pagar dan bingkai",
  sumber: "Metode luar: Fencing Context",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Metode kedua, Fencing Context, atau konteks pagar dan bingkai. Keliling dipahami sebagai panjang bahan yang harus mengitari sebuah bangun.",
      tambah(0, judul("Fencing Context")),
      tambah("pagar", kotak("fk", 30, 56, 110, 76, "none", W.coklat, { putus: true, tebal: 2.6 }), emo("fh", 85, 108, "🏠", 40)),
      tambah("bingkai", ...bingkai("fb", 170, 56, 110, 76, 10)),
      tambah("mengitari", teks("fz", 150, 160, "bahan mengitari tepi", 9.6, W.ungu)),
    ),
    k(
      "Pagar kebun, bingkai foto, pita hiasan, dan tali pembatas semuanya mengitari tepi. Panjang bahan yang dibutuhkan sama dengan kelilingnya.",
      bersih(0),
      tambah(0, judul("Bahan yang mengitari")),
      tambah("Pagar", emo("e1", 50, 80, "🏠", 34), teks("e1t", 50, 104, "pagar", 8.8, W.biru)),
      tambah("bingkai", emo("e2", 120, 80, "🖼", 34), teks("e2t", 120, 104, "bingkai", 8.8, W.biru)),
      tambah("pita", emo("e3", 190, 80, "🎀", 34), teks("e3t", 190, 104, "pita", 8.8, W.biru)),
      tambah("tali", emo("e4", 255, 80, "🧵", 34), teks("e4t", 255, 104, "tali", 8.8, W.biru)),
      tambah("kelilingnya.", ...kartu("ez", 40, 132, 220, 32, W.emas, ["panjang bahan = keliling"], 9.6)),
    ),
    k(
      "Cara kerjanya: tanya dulu, berapa panjang bahan yang mengelilingi tepi? Ukur tiap sisi, lalu jumlahkan semuanya.",
      bersih(0),
      tambah(0, judul("Cara kerja")),
      tambah("tanya", ...kartu("w1", 14, 36, 272, 32, W.langit, ["1. berapa panjang bahan di tepi?"], 9.4)),
      tambah("Ukur", ...kartu("w2", 14, 78, 272, 32, W.hijauMuda, ["2. ukur tiap sisi"], 9.4)),
      tambah("jumlahkan", ...kartu("w3", 14, 120, 272, 32, W.krem, ["3. jumlahkan semua panjang sisi"], 9.4)),
    ),
    k(
      "Kelebihannya, siswa langsung melihat gunanya keliling dalam hidup. Kekurangannya, orang mudah mengira bahan yang dibeli menutupi isi, padahal hanya mengitari tepi.",
      bersih(0),
      tambah(0, judul("Kelebihan dan kekurangan")),
      tambah("Kelebihannya,", ...kartu("kl", 14, 36, 130, 50, W.hijauMuda, ["tahu gunanya", "keliling dalam", "hidup nyata"], 8.6), emo("kle", 79, 108, "👍", 24)),
      tambah("Kekurangannya,", ...kartu("kk", 156, 36, 130, 50, W.merahMuda, ["dikira menutupi", "isi, padahal", "hanya mengitari tepi"], 8.6)),
    ),
  ],
};

/* ------------------------------ 5. Fencing Context: penerapan bingkai dan pagar ------------------------------ */
export const ADEGAN_LUAR_FENCING_TERAPAN: AdeganStory = {
  id: "luar-fencing-terapan",
  judul: "Fencing Context pada bingkai dan pagar lapangan",
  sumber: "Metode luar: Fencing Context; contoh Buku Siswa hlm. 113–114",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Bingkai pertama berbentuk bangun bersisi empat, setiap sisinya empat sentimeter. Kayu yang dibutuhkan: empat tambah empat tambah empat tambah empat, enam belas sentimeter.",
      tambah(0, judul("Bingkai pertama")),
      tambah("Bingkai", poligon("bs", 20, 44, titikBangunSama(12), W.krem, W.coklat, { tebal: 4 })),
      tambah("setiap", teks("s1", 96, 62, "4 cm", 8.4, W.merah, { anchor: "start" }), teks("s2", 96, 106, "4 cm", 8.4, W.merah, { anchor: "start" }), teks("s3", 24, 112, "4 cm", 8.4, W.merah, { anchor: "end" }), teks("s4", 24, 62, "4 cm", 8.4, W.merah, { anchor: "end" })),
      tambah("Kayu", teks("se", 220, 80, "4 + 4 + 4 + 4 = 16", 10, W.biru, { anchor: "middle" })),
      tambah("enam", teks("sh", 220, 104, "kayu 16 cm", 10, W.hijau)),
    ),
    k(
      "Bingkai kedua punya sisi lima, empat, lima, dan lima sentimeter. Kayu yang dibutuhkan sembilan belas sentimeter.",
      bersih(0),
      tambah(0, judul("Bingkai kedua")),
      tambah("Bingkai", poligon("bd", 24, 52, titikBangunDua(12), W.krem, W.coklat, { tebal: 4 })),
      tambah("lima,", teks("t1", 54, 46, "4 cm", 8.4, W.merah), teks("t2", 54, 128, "5 cm", 8.4, W.merah), teks("t3", 30, 92, "5 cm", 8.4, W.merah, { anchor: "end" }), teks("t4", 98, 92, "5 cm", 8.4, W.merah, { anchor: "start" })),
      tambah("Kayu", teks("te", 210, 80, "5 + 4 + 5 + 5 = 19", 10, W.biru)),
      tambah("sembilan", teks("th", 210, 104, "kayu 19 cm", 10, W.hijau)),
    ),
    k(
      "Sekarang pagar lapangan. Pagar mengitari seluruh tepian, jadi panjang pagar seratus tambah lima puluh tambah seratus tambah lima puluh, yaitu tiga ratus meter.",
      bersih(0),
      tambah(0, judul("Pagar lapangan")),
      tambah("lapangan.", ...lapangan("lp", FX, FY), ...ukuranLapangan("lp", FX, FY)),
      tambah("mengitari", kotak("pg", FX - 4, FY - 4, LAP.pw + 8, LAP.ph + 8, "none", W.coklat, { putus: true, tebal: 3, rx: 1 })),
      tambah("seratus", teks("pe", 150, 182, "100 + 50 + 100 + 50 = 300", 10.4, W.biru)),
    ),
    k(
      "Perhatikan satuannya panjang: sentimeter untuk kayu, meter untuk pagar. Bahan yang dibeli hanya mengitari tepi, bukan menutupi isi.",
      bersih(0),
      tambah(0, judul("Bahan yang dibeli")),
      tambah(3, ...tabel("fk0", 30, 40, [110, 80, 50], [["Benda", "Panjang bahan", "Satuan"]], 24, 8.2, W.krem)),
      tambah(5, ...tabel("fk1", 30, 64, [110, 80, 50], [["Bingkai pertama", "16", "cm"]], 24, 8.2, W.putih)),
      tambah(5, ...tabel("fk2", 30, 88, [110, 80, 50], [["Bingkai kedua", "19", "cm"]], 24, 8.2, W.putih)),
      tambah(8, ...tabel("fk3", 30, 112, [110, 80, 50], [["Pagar lapangan", "300", "m"]], 24, 8.2, W.putih)),
      tambah("menutupi", teks("fz", 150, 160, "hanya mengitari tepi, bukan isi", 9.4, W.ungu)),
    ),
  ],
};

