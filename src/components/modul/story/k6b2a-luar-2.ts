import type { AdeganStory, Obj } from "./logika-story";
import { W, emo, kartu, kotak, panah, teks } from "./k6b2a-gambar";
import { bersih, k, redamkan, sorotkan, tambah } from "./k6b2a-bantu";

/** Satu deret kotak kecil berisi bilangan, mulai di (x, y). Id kotak: `${id}${i}`. */
const chips = (id: string, x: number, y: number, nilai: string[], warna: string = W.krem): Obj[] =>
  nilai.flatMap((v, i) => [kotak(`${id}${i}`, x + i * 44, y, 38, 26, warna, W.biru, { rx: 6 }), teks(`${id}t${i}`, x + i * 44 + 19, y + 18, v, 11)]);

/** Tiga baris "kiri : kanan" untuk menunjukkan langkah mengubah rasio. */
const rasioBesar = (id: string, x: number, y: number, isi: string, warna: string = W.biru, u = 24): Obj => teks(id, x, y, isi, u, warna);

/** Bola berderet: merah atau biru, mulai di (x, y). */
const bola = (id: string, x: number, y: number, n: number, e: string, jarak = 22, u = 16): Obj[] => Array.from({ length: n }, (_, i) => emo(`${id}${i}`, x + i * jarak, y, e, u));

/** Kotak putus-putus pembungkus satu kelompok. */
const kelompok = (id: string, x: number, y: number, w: number, h: number, warna: string = W.hijau): Obj => kotak(id, x, y, w, h, "none", warna, { putus: true, rx: 8, tebal: 1.8 });

/* ------------------------------ LA5. GCF Simplify Ratio: konsep ------------------------------ */
export const ADEGAN_LUAR_A_FPB: AdeganStory = {
  id: "luara-fpb",
  judul: "GCF Simplify Ratio: konsep",
  sumber: "Metode luar 3: menyederhanakan dengan FPB",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Metode ketiga, GCF Simplify Ratio. GCF adalah faktor persekutuan terbesar, yang kita singkat FPB.",
      tambah(0, teks("jud", 150, 24, "GCF Simplify Ratio", 13, W.ungu)),
      tambah("GCF", kartu("g1", 30, 56, 100, 50, "#FEF9C3", ["GCF"], 16)),
      tambah("terbesar,", kartu("g2", 170, 56, 100, 50, "#DCFCE7", ["FPB"], 16), panah("g3", 134, 80, 32, 0, W.hijau, 3, { gambar: true })),
      tambah("FPB.", teks("g4", 150, 150, "faktor persekutuan terbesar", 11, W.hijau)),
    ),
    k(
      "Rasio paling sederhana diperoleh dengan membagi kedua suku dengan FPB. Contohnya sepuluh banding lima belas.",
      bersih(0),
      tambah(0, teks("c0", 150, 28, "bagi kedua suku dengan FPB", 11, W.ungu)),
      tambah("Contohnya", rasioBesar("c1", 150, 100, "10 : 15", W.biru, 40)),
    ),
    k(
      "Faktor dari sepuluh adalah satu, dua, lima, dan sepuluh. Faktor dari lima belas adalah satu, tiga, lima, dan lima belas.",
      bersih(0),
      tambah(0, teks("f0", 150, 26, "faktor dari tiap suku", 12, W.ungu)),
      tambah("Faktor", teks("fa", 40, 78, "10", 14, W.biru), chips("a", 66, 56, ["1", "2", "5", "10"])),
      tambah("Faktor@2", teks("fb", 40, 128, "15", 14, W.biru), chips("b", 66, 106, ["1", "3", "5", "15"])),
    ),
    k(
      "Faktor yang sama adalah satu dan lima. Yang terbesar adalah lima, jadi FPB dari sepuluh dan lima belas adalah lima.",
      sorotkan("sama", "a0", "a2", "b0", "b2"),
      redamkan("terbesar", "a0", "b0"),
      tambah("FPB", teks("fc", 150, 176, "FPB dari 10 dan 15 adalah 5", 12, W.hijau)),
    ),
    k(
      "Bagi kedua suku dengan lima. Sepuluh menjadi dua, dan lima belas menjadi tiga, sehingga rasionya dua banding tiga.",
      bersih(0),
      tambah(0, teks("h0", 150, 28, "bagi dengan 5", 12, W.ungu)),
      tambah("Sepuluh", rasioBesar("h1", 90, 100, "10 : 15", W.biru, 26)),
      tambah("menjadi", teks("h2", 150, 70, "dibagi 5", 10, W.merah), panah("h3", 135, 108, 30, 0, W.merah, 2.5, { gambar: true })),
      tambah("sehingga", rasioBesar("h4", 215, 100, "2 : 3", W.hijau, 26)),
    ),
    k(
      "Pemeriksaan: FPB dari dua dan tiga adalah satu. Kalau FPB hasilnya sudah satu, rasio tidak bisa disederhanakan lagi.",
      bersih(0),
      tambah(0, teks("p0", 150, 28, "periksa hasilnya", 12, W.ungu)),
      tambah("Pemeriksaan:", rasioBesar("p1", 150, 84, "2 : 3", W.hijau, 34)),
      tambah("FPB", teks("p2", 150, 120, "FPB dari 2 dan 3 adalah 1", 11, W.biru)),
      tambah("lagi.", emo("p3", 150, 170, "✅", 32)),
    ),
  ],
};

/* ------------------------------ LA6. GCF Simplify Ratio: penerapan ------------------------------ */
export const ADEGAN_LUAR_A_FPB_TERAPAN: AdeganStory = {
  id: "luara-fpb-terapan",
  judul: "GCF Simplify Ratio: penerapan pada kebun dan wahana",
  sumber: "Metode luar 3 pada kebun dan wahana",
  latar: "#ECFCCB",
  ketukan: [
    k(
      "Terapkan pada empat banding enam dari kebun sekolah. FPB dari empat dan enam adalah dua, sehingga hasilnya dua banding tiga.",
      tambah(0, teks("jud", 150, 24, "kebun sekolah", 12, W.ungu)),
      tambah("banding", rasioBesar("a1", 90, 90, "4 : 6", W.biru, 28)),
      tambah("FPB", teks("a2", 150, 130, "FPB dari 4 dan 6 adalah 2", 11, W.merah)),
      tambah("hasilnya", rasioBesar("a3", 215, 90, "= 2 : 3", W.hijau, 28)),
    ),
    k(
      "Rasio enam banding sembilan juga bisa disederhanakan. FPB dari enam dan sembilan adalah tiga, jadi hasilnya dua banding tiga.",
      bersih(0),
      tambah(0, teks("jud2", 150, 24, "contoh lain", 12, W.ungu)),
      tambah("banding", rasioBesar("b1", 90, 90, "6 : 9", W.biru, 28)),
      tambah("FPB", teks("b2", 150, 130, "FPB dari 6 dan 9 adalah 3", 11, W.merah)),
      tambah("hasilnya", rasioBesar("b3", 215, 90, "= 2 : 3", W.hijau, 28)),
    ),
    k(
      "Dari antrean wahana, rasio dua puluh empat banding delapan belas. FPB dari dua puluh empat dan delapan belas adalah enam, jadi hasilnya empat banding tiga.",
      bersih(0),
      tambah(0, teks("jud3", 150, 24, "antrean wahana", 12, W.ungu)),
      tambah("rasio", rasioBesar("c1", 80, 90, "24 : 18", W.biru, 26)),
      tambah("FPB", teks("c2", 150, 130, "FPB dari 24 dan 18 adalah 6", 11, W.merah)),
      tambah("hasilnya", rasioBesar("c3", 220, 90, "= 4 : 3", W.hijau, 26)),
    ),
    k(
      "Rasio dua belas banding delapan memakai FPB empat, hasilnya tiga banding dua.",
      bersih(0),
      tambah(0, teks("jud4", 150, 24, "12 banding 8", 12, W.ungu)),
      tambah("Rasio", rasioBesar("d1", 90, 90, "12 : 8", W.biru, 28)),
      tambah("FPB", teks("d2", 150, 130, "FPB dari 12 dan 8 adalah 4", 11, W.merah)),
      tambah("hasilnya", rasioBesar("d3", 215, 90, "= 3 : 2", W.hijau, 28)),
    ),
    k(
      "Hati-hati: kalau dua belas banding delapan hanya dibagi dua, hasilnya enam banding empat. Ini belum paling sederhana karena FPB dari enam dan empat masih dua.",
      bersih(0),
      tambah(0, teks("jud5", 150, 24, "jebakan: pembagi terlalu kecil", 11, W.merah)),
      tambah("kalau", rasioBesar("e1", 80, 80, "12 : 8", W.biru, 24)),
      tambah("dibagi", teks("e2", 150, 70, "dibagi 2", 10, W.merah), panah("e3", 125, 84, 50, 0, W.merah, 2.5, { gambar: true })),
      tambah("hasilnya", rasioBesar("e4", 220, 80, "6 : 4", W.merah, 24)),
      tambah("FPB", teks("e5", 150, 130, "FPB dari 6 dan 4 masih 2", 11, W.merah), emo("e6", 150, 170, "⚠", 30)),
    ),
    k(
      "Maka dibagi lagi dengan dua, dan kita sampai pada tiga banding dua juga. Memakai FPB sekali jalan lebih cepat.",
      bersih(0),
      tambah(0, teks("jud6", 150, 24, "dua langkah atau sekali jalan", 11, W.ungu)),
      tambah("dibagi", rasioBesar("f1", 80, 80, "6 : 4", W.biru, 24), teks("f2", 150, 70, "dibagi 2", 10, W.merah), panah("f3", 125, 84, 50, 0, W.merah, 2.5, { gambar: true })),
      tambah("tiga", rasioBesar("f4", 220, 80, "3 : 2", W.hijau, 24)),
      tambah("Memakai", teks("f5", 150, 140, "sekali jalan: 12 : 8 dibagi 4", 11, W.hijau), emo("f6", 150, 176, "⚡", 30)),
    ),
  ],
};

/* ------------------------------ LA7. Equal-Group Picture: konsep ------------------------------ */
export const ADEGAN_LUAR_A_BANDING: AdeganStory = {
  id: "luara-banding",
  judul: "Equal-Group Picture: konsep",
  sumber: "Metode luar 4: gambar kelompok yang sama",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Metode keempat, Equal-Group Picture. Rasio digambar sebagai kelompok yang sama besar, supaya kita bisa melihat arti FPB.",
      tambah(0, teks("jud", 150, 24, "Equal-Group Picture", 13, W.ungu)),
      tambah("kelompok", kelompok("g1", 24, 56, 110, 70), kelompok("g2", 166, 56, 110, 70, W.biru)),
      tambah("sama", teks("g3", 150, 156, "kelompok yang sama besar", 11, W.hijau)),
    ),
    k(
      "Contohnya empat bola merah dan enam bola biru. Rasio merah terhadap biru adalah empat banding enam.",
      bersih(0),
      tambah(0, teks("c0", 150, 26, "bola merah dan bola biru", 11, W.ungu)),
      tambah("merah", ...bola("rm", 40, 74, 4, "🔴", 30, 22), teks("rmt", 100, 96, "4 merah", 9, W.merah)),
      tambah("biru", ...bola("bl", 40, 128, 6, "🔵", 30, 22), teks("blt", 130, 150, "6 biru", 9, W.biru)),
      tambah("empat@2", teks("c1", 150, 190, "4 : 6", 22, W.biru)),
    ),
    k(
      "Sekarang kelompokkan menjadi kelompok yang sama. Ternyata bisa dibuat dua kelompok, dan tiap kelompok berisi dua bola merah serta tiga bola biru.",
      bersih(0),
      tambah(0, teks("k0", 150, 26, "dua kelompok yang sama", 11, W.ungu)),
      tambah("kelompokkan", kelompok("k1", 20, 44, 124, 100), kelompok("k2", 156, 44, 124, 100, W.biru)),
      tambah("dua", ...bola("ka", 40, 72, 2, "🔴", 30, 22), ...bola("kb", 176, 72, 2, "🔴", 30, 22)),
      tambah("tiga", ...bola("kc", 34, 112, 3, "🔵", 28, 22), ...bola("kd", 170, 112, 3, "🔵", 28, 22)),
      tambah("tiap", teks("k3", 150, 176, "tiap kelompok: 2 merah, 3 biru", 10, W.hijau)),
    ),
    k(
      "Banyak kelompok yang sama itu dua, dan dua itu persis FPB dari empat dan enam. Jadi FPB sama dengan banyak kelompok yang bisa dibuat.",
      bersih(0),
      tambah(0, teks("m0", 150, 26, "FPB dan kelompok", 12, W.ungu)),
      tambah("kelompok", kelompok("m1", 20, 44, 124, 60), kelompok("m2", 156, 44, 124, 60, W.biru), teks("m1t", 82, 80, "kelompok 1", 10, W.hijau), teks("m2t", 218, 80, "kelompok 2", 10, W.biru)),
      tambah("FPB", teks("m3", 150, 134, "FPB dari 4 dan 6 adalah 2", 12, W.merah)),
      tambah("Jadi", teks("m4", 150, 166, "FPB = banyak kelompok", 13, W.ungu), emo("m5", 150, 194, "🧮", 20)),
    ),
    k(
      "Isi satu kelompok adalah hasil penyederhanaan, yaitu dua banding tiga. Kalau gambar dimulai dari satu kelompok saja, kita langsung melihat rasio paling sederhana.",
      bersih(0),
      tambah(0, teks("n0", 150, 26, "isi satu kelompok", 12, W.ungu)),
      tambah("kelompok", kelompok("n1", 70, 44, 160, 76)),
      tambah("dua", ...bola("na", 100, 76, 2, "🔴", 30, 24)),
      tambah("tiga", ...bola("nb", 94, 104, 3, "🔵", 28, 24)),
      tambah("rasio", teks("n2", 150, 158, "2 : 3", 30, W.hijau)),
    ),
    k(
      "Kalau satu kelompok masih bisa dibagi lagi menjadi kelompok yang sama, berarti FPB belum dipakai seluruhnya. Pada dua banding tiga, kelompok tidak bisa dibagi lagi, jadi rasionya sudah paling sederhana.",
      bersih(0),
      tambah(0, teks("o0", 150, 26, "kapan berhenti?", 12, W.ungu)),
      tambah("masih", teks("o1", 80, 80, "4 : 6", 24, W.merah), teks("o1t", 80, 100, "masih bisa dibagi", 8.4, W.merah)),
      tambah("Pada", teks("o2", 220, 80, "2 : 3", 24, W.hijau), teks("o2t", 220, 100, "tidak bisa dibagi lagi", 8.4, W.hijau)),
      tambah("paling", emo("o3", 220, 150, "✅", 34)),
    ),
  ],
};

/* ------------------------------ LA8. Equal-Group Picture: penerapan ------------------------------ */
export const ADEGAN_LUAR_A_BANDING_TERAPAN: AdeganStory = {
  id: "luara-banding-terapan",
  judul: "Equal-Group Picture: penerapan pada bibit dan wahana",
  sumber: "Metode luar 4 pada bibit dan wahana",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Terapkan pada bibit di toko. Ada dua puluh bibit mangga dan dua belas bibit jambu. Kita gambar kelompok yang sama.",
      tambah(0, teks("jud", 150, 24, "bibit mangga dan jambu", 12, W.ungu)),
      tambah("mangga", ...kartu("pa", 20, 50, 120, 70, "#FED7AA", ["20 bibit", "mangga"], 11), emo("pae", 80, 160, "🥭", 32)),
      tambah("jambu", ...kartu("pb", 160, 50, 120, 70, "#DCFCE7", ["12 bibit", "jambu"], 11), emo("pbe", 220, 160, "🍐", 32)),
    ),
    k(
      "FPB dari dua puluh dan dua belas adalah empat. Berarti bisa dibuat empat kelompok yang sama.",
      bersih(0),
      tambah(0, teks("a0", 150, 24, "FPB dari 20 dan 12 adalah 4", 12, W.ungu)),
      tambah("empat", kelompok("q1", 20, 44, 124, 62), kelompok("q2", 156, 44, 124, 62, W.biru), kelompok("q3", 20, 116, 124, 62, W.merah), kelompok("q4", 156, 116, 124, 62, W.coklat)),
      tambah("kelompok", teks("a1", 150, 196, "4 kelompok yang sama", 11, W.hijau)),
    ),
    k(
      "Tiap kelompok berisi lima bibit mangga dan tiga bibit jambu, karena dua puluh dibagi empat adalah lima, dan dua belas dibagi empat adalah tiga.",
      bersih(0),
      tambah(0, teks("b0", 150, 24, "isi tiap kelompok", 12, W.ungu)),
      tambah("Tiap", kelompok("r1", 20, 44, 124, 62), kelompok("r2", 156, 44, 124, 62, W.biru), kelompok("r3", 20, 116, 124, 62, W.merah), kelompok("r4", 156, 116, 124, 62, W.coklat)),
      tambah("lima", ...["r1", "r2", "r3", "r4"].map((id, i) => teks(`${id}m`, 82 + (i % 2) * 136, 72 + Math.floor(i / 2) * 72, "5 mangga", 10, W.coklat))),
      tambah("tiga", ...["r1", "r2", "r3", "r4"].map((id, i) => teks(`${id}j`, 82 + (i % 2) * 136, 90 + Math.floor(i / 2) * 72, "3 jambu", 10, W.hijau))),
    ),
    k(
      "Jadi rasio mangga terhadap jambu paling sederhana adalah lima banding tiga. Dibaca, setiap lima bibit mangga ada tiga bibit jambu.",
      bersih(0),
      tambah(0, teks("c0", 150, 28, "hasil penyederhanaan", 12, W.ungu)),
      tambah("Jadi", teks("c1", 150, 80, "20 : 12  =  5 : 3", 22, W.hijau)),
      tambah("Dibaca,", teks("c2", 150, 128, "setiap 5 mangga ada 3 jambu", 12, W.biru)),
      tambah("jambu", emo("c3", 150, 176, "✅", 30)),
    ),
    k(
      "Sekarang antrean wahana. Roller coaster dua puluh empat dan komidi putar delapan belas. FPB-nya enam, maka ada enam kelompok yang sama.",
      bersih(0),
      tambah(0, teks("d0", 150, 24, "antrean wahana", 12, W.ungu)),
      tambah("Roller", ...kartu("d1", 20, 40, 120, 40, "#FCA5A5", ["roller coaster", "24"], 10), ...kartu("d2", 160, 40, 120, 40, "#93C5FD", ["komidi putar", "18"], 10)),
      tambah("FPB-nya", teks("d3", 150, 104, "FPB dari 24 dan 18 adalah 6", 11, W.merah)),
      tambah("enam@2", ...[0, 1, 2, 3, 4, 5].map((i) => kelompok(`dk${i}`, 26 + i * 44, 124, 40, 40, W.hijau))),
    ),
    k(
      "Tiap kelompok berisi empat pengunjung roller coaster dan tiga pengunjung komidi putar, jadi rasionya empat banding tiga.",
      bersih(0),
      tambah(0, teks("e0", 150, 24, "isi tiap kelompok", 12, W.ungu)),
      tambah("Tiap", ...[0, 1, 2, 3, 4, 5].map((i) => kelompok(`ek${i}`, 26 + i * 44, 44, 40, 70, W.hijau))),
      tambah("empat", ...[0, 1, 2, 3, 4, 5].map((i) => teks(`ekr${i}`, 46 + i * 44, 76, "4", 14, W.merah))),
      tambah("tiga", ...[0, 1, 2, 3, 4, 5].map((i) => teks(`ekb${i}`, 46 + i * 44, 100, "3", 14, W.biru))),
      tambah("rasionya", teks("e1", 150, 156, "24 : 18  =  4 : 3", 20, W.hijau)),
    ),
    k(
      "Terakhir, di kebun ada empat pucuk merah dan enam cemara, jadi dua kelompok sama, masing-masing dua pucuk merah dan tiga cemara. Rasio paling sederhananya dua banding tiga.",
      bersih(0),
      tambah(0, teks("f0", 150, 24, "kebun sekolah", 12, W.ungu)),
      tambah("kelompok", kelompok("f1", 20, 40, 124, 82), kelompok("f2", 156, 40, 124, 82, W.biru)),
      tambah("dua@2", ...["f1", "f2"].map((id, i) => teks(`${id}p`, 82 + i * 136, 72, "2 pucuk merah", 10, W.merah))),
      tambah("tiga", ...["f1", "f2"].map((id, i) => teks(`${id}c`, 82 + i * 136, 98, "3 cemara", 10, W.hijau))),
      tambah("sederhananya", teks("f3", 150, 166, "4 : 6  =  2 : 3", 22, W.hijau)),
    ),
  ],
};

/* ------------------------------ LA9. Ringkasan empat metode ------------------------------ */
export const ADEGAN_LUAR_A_RINGKAS: AdeganStory = {
  id: "luara-ringkas",
  judul: "Ringkasan empat metode luar konsep rasio",
  sumber: "Ringkasan metode luar",
  latar: "#F5F3FF",
  ketukan: [
    k(
      "Ringkasan empat metode luar. Part-to-Part Ratio Language: ucapkan kalimat setiap a ada b.",
      tambah(0, teks("jud", 150, 22, "Ringkasan", 13, W.ungu)),
      tambah("Part-to-Part", kartu("r1", 14, 36, 272, 32, "#FDE68A", ["Part-to-Part: setiap a ada b"], 9.6)),
    ),
    k(
      "Ordered-Ratio Protocol: yang disebut lebih dulu ada di kiri, dan urutan tidak boleh tertukar.",
      tambah("Ordered-Ratio", kartu("r2", 14, 74, 272, 32, "#FBCFE8", ["Ordered-Ratio: a : b bukan b : a"], 9.6)),
    ),
    k(
      "GCF Simplify Ratio: bagi kedua suku dengan FPB sampai FPB hasilnya satu.",
      tambah("GCF", kartu("r3", 14, 112, 272, 32, "#BBF7D0", ["GCF Simplify: bagi dengan FPB, sampai 1"], 9.6)),
    ),
    k(
      "Equal-Group Picture: gambar kelompok yang sama, dan banyak kelompok itulah FPB-nya.",
      tambah("Equal-Group", kartu("r4", 14, 150, 272, 32, "#BFDBFE", ["Equal-Group: banyak kelompok = FPB"], 9.6)),
    ),
    k(
      "Keempat cara ini saling melengkapi, jadi pakailah yang paling membantumu. Sekarang kamu siap menulis, membaca, dan menyederhanakan rasio dengan benar.",
      bersih(0),
      tambah(0, teks("z0", 150, 40, "siap memakai rasio", 15, W.ungu)),
      tambah("saling", emo("z1", 90, 110, "🧩", 40), teks("z1t", 90, 134, "empat cara", 10)),
      tambah("siap", emo("z2", 210, 110, "✅", 40), teks("z2t", 210, 134, "rasio benar", 10)),
      tambah("menyederhanakan", teks("z3", 150, 180, "tulis, baca, sederhanakan", 13, W.hijau)),
    ),
  ],
};
