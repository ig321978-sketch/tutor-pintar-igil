import type { AdeganStory, Aksi, Obj } from "./logika-story";
import { W, anakDi, emo, garis, judul, kartu, kartuAngka, labelTs, tangga } from "./k1b1c-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah, urutKata } from "./k1b1c-bantu";

const IGIL = "\u{1F989}";
const WARNA = [W.merahMuda, W.langit, W.hijauMuda, W.krem, W.pink];
const LEBAR: Record<number, number> = { 3: 70, 4: 58, 5: 48 };
const CELAH: Record<number, number> = { 3: 18, 4: 14, 5: 8 };
const TANAH = () => garis("tanah", 14, 152, 272, 0, W.hijau, 3);

/** Kotak bilangan ke-i dari n kotak sebaris; isi "?" berarti bilangan yang hilang. Id `${p}${i}-k` dan `${p}${i}-t`. */
const kotakBil = (p: string, n: number, i: number, isi: string, y = 66): Obj[] => {
  const w = LEBAR[n];
  const x0 = (300 - n * w - (n - 1) * CELAH[n]) / 2;
  return kartuAngka(`${p}${i}`, x0 + i * (w + CELAH[n]), y, isi, isi === "?" ? W.emas : WARNA[i % 5], w, 56, n === 3 ? 34 : n === 4 ? 30 : 26);
};
/** Aksi memunculkan semua kotak pada kata-kata pemicunya (`kata` dicari berurutan setelah kata `setelah`). */
const munculkan = (suara: string, p: string, isi: string[], kata: string[], setelah?: string): Aksi[] => urutKata(suara, kata, setelah).map((pos, i) => tambah(pos, kotakBil(p, isi.length, i, isi[i])));
/** Kotak yang hilang diisi jawaban. */
const isiJawab = (at: string | number, p: string, i: number, jawab: string): Aksi => ubah(at, { id: `${p}${i}-t`, isi: jawab, warna: W.hijau }, { id: `${p}${i}-k`, warna: W.hijauMuda });

/* ------------------------------ 1. Melengkapi urutan maju ------------------------------ */
const SUARA_P1 = "Kadang ada bilangan yang hilang dalam urutan. Lihat deretan ini: tiga, bilangan yang hilang, lima.";
const SUARA_P2 = "Cara melengkapinya, lihat bilangan di sebelahnya. Sesudah tiga datang empat, dan sebelum lima juga empat.";
const SUARA_P3 = "Jadi bilangan yang hilang adalah empat. Urutannya tiga, empat, lima.";
const SUARA_P4 = "Coba satu lagi. Urutan empat, lima, bilangan yang hilang, tujuh, delapan. Ayo, tebak dulu.";
const SUARA_P5 = "Betul, yang hilang adalah enam. Setelah lima datang enam, lalu tujuh, lalu delapan.";

export const ADEGAN_LENGKAPI_MAJU: AdeganStory = {
  id: "lengkapi-maju",
  judul: "Melengkapi urutan maju",
  sumber: "Materi: melengkapi urutan maju",
  latar: "#FDF4FF",
  ketukan: [
    k(SUARA_P1, tambah(0, judul("Bilangan yang hilang")), ...munculkan(SUARA_P1, "a", ["3", "?", "5"], ["tiga", "hilang", "lima"], "ini:")),
    k(
      SUARA_P2,
      sorotkan("sebelahnya,", "a0-k", "a2-k"),
      tambah("Sesudah", ...kartu("s1", 20, 138, 125, 28, W.hijauMuda, ["sesudah 3 itu 4"], 9.6)),
      tambah("sebelum", ...kartu("s2", 155, 138, 125, 28, W.langit, ["sebelum 5 itu 4"], 9.6)),
    ),
    k(SUARA_P3, isiJawab("empat.", "a", 1, "4"), tambah("Urutannya", emo("ok", 150, 192, "✅", 26))),
    k(
      SUARA_P4,
      bersih(0),
      tambah(0, judul("Coba satu lagi")),
      ...munculkan(SUARA_P4, "b", ["4", "5", "?", "7", "8"], ["empat", "lima", "hilang", "tujuh", "delapan"], "Urutan"),
      tambah("tebak", emo("mk", 150, 150, "\u{1F914}", 34)),
    ),
    k(SUARA_P5, isiJawab("enam.", "b", 2, "6"), tambah("Setelah", ...kartu("bk", 50, 156, 200, 28, W.krem, ["5, 6, 7, 8: urut maju"], 10))),
  ],
};

/* ------------------------------ 2. Melengkapi urutan mundur ------------------------------ */
const SUARA_Q1 = "Urutan mundur juga bisa ada yang hilang. Lihat deretan ini: delapan, tujuh, bilangan yang hilang, lima.";
const SUARA_Q2 = "Pada urutan mundur, bilangannya makin kecil. Setelah tujuh datang enam, dan enam ada tepat di antara tujuh dan lima.";
const SUARA_Q3 = "Jadi bilangan yang hilang adalah enam. Urutannya delapan, tujuh, enam, lima.";
const SUARA_Q4 = "Satu lagi. Urutan lima, empat, bilangan yang hilang, dua, satu. Coba tebak sendiri.";
const SUARA_Q5 = "Betul, yang hilang adalah tiga. Setelah empat datang tiga, lalu dua, lalu satu.";

export const ADEGAN_LENGKAPI_MUNDUR: AdeganStory = {
  id: "lengkapi-mundur",
  judul: "Melengkapi urutan mundur",
  sumber: "Materi: melengkapi urutan mundur",
  latar: "#F0FDFA",
  ketukan: [
    k(SUARA_Q1, tambah(0, judul("Urutan mundur")), ...munculkan(SUARA_Q1, "c", ["8", "7", "?", "5"], ["delapan", "tujuh", "hilang", "lima"], "ini:")),
    k(
      SUARA_Q2,
      sorotkan("kecil.", "c1-k", "c3-k"),
      tambah("Setelah", ...kartu("q1", 20, 138, 125, 28, W.hijauMuda, ["setelah 7 itu 6"], 9.6)),
      tambah("tepat", ...kartu("q2", 155, 138, 125, 28, W.langit, ["6 di antara 7 dan 5"], 9.6)),
    ),
    k(SUARA_Q3, isiJawab("enam.", "c", 2, "6"), tambah("Urutannya", emo("ok", 150, 192, "✅", 26))),
    k(
      SUARA_Q4,
      bersih(0),
      tambah(0, judul("Coba lagi")),
      ...munculkan(SUARA_Q4, "d", ["5", "4", "?", "2", "1"], ["lima", "empat", "hilang", "dua", "satu"], "Urutan"),
      tambah("tebak", emo("mk", 150, 150, "\u{1F914}", 34)),
    ),
    k(SUARA_Q5, isiJawab("tiga.", "d", 2, "3"), tambah("Setelah", ...kartu("dk", 50, 156, 200, 28, W.krem, ["5, 4, 3, 2, 1: urut mundur"], 10))),
  ],
};

/* ------------------------------ 3. Latihan 1: urutan maju ------------------------------ */
const SUARA_L1 = "Latihan satu. Lengkapi urutan ini: lima, bilangan yang hilang, tujuh, delapan.";
const SUARA_L2 = "Jangan terburu-buru. Lihat bilangan di sebelahnya dulu, lalu pikirkan jawabannya. Pelan-pelan saja, tidak apa-apa kalau butuh waktu.";
const SUARA_L3 = "Setelah lima datang enam. Sebelum tujuh juga ada enam. Jadi yang hilang adalah enam.";
const SUARA_L4 = "Betul! Urutannya lima, enam, tujuh, delapan. Hebat sekali!";

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan 1: lengkapi urutan maju",
  sumber: "Materi: latihan urutan maju",
  latar: "#FFF1F2",
  ketukan: [
    k(SUARA_L1, tambah(0, judul("Latihan 1")), ...munculkan(SUARA_L1, "e", ["5", "?", "7", "8"], ["lima", "hilang", "tujuh", "delapan"], "ini:")),
    k(SUARA_L2, tambah("terburu-buru.", emo("kr", 150, 160, "\u{1F422}", 30)), tambah("sebelahnya", ...kartu("lt", 50, 130, 200, 22, W.langit, ["lihat bilangan tetangganya"], 9.4))),
    k(SUARA_L3, isiJawab("enam.", "e", 1, "6"), sorotkan("Sebelum", "e0-k", "e2-k")),
    k(SUARA_L4, tambah("Betul!", emo("ok", 60, 186, "✅", 32)), tambah("Hebat", emo("ow", 240, 186, IGIL, 32))),
  ],
};

/* ------------------------------ 4. Latihan 2: urutan mundur ------------------------------ */
const SUARA_M1 = "Latihan dua. Lengkapi urutan mundur: sembilan, delapan, bilangan yang hilang, enam.";
const SUARA_M2 = "Ingat, pada hitungan mundur bilangannya makin kecil. Setelah delapan, bilangan apa yang datang? Pikirkan dulu sebelum menjawab.";
const SUARA_M3 = "Setelah delapan datang tujuh. Tujuh ada di antara delapan dan enam. Jadi yang hilang adalah tujuh.";
const SUARA_M4 = "Betul! Urutannya sembilan, delapan, tujuh, enam. Kamu hebat! Terus berlatih, ya.";

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan 2: lengkapi urutan mundur",
  sumber: "Materi: latihan urutan mundur",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_M1, tambah(0, judul("Latihan 2")), ...munculkan(SUARA_M1, "f", ["9", "8", "?", "6"], ["sembilan", "delapan", "hilang", "enam"], "mundur:")),
    k(SUARA_M2, tambah("makin", emo("pk", 150, 160, "⬅️", 30)), tambah("apa", emo("tn", 244, 130, "❓", 26))),
    k(SUARA_M3, hapus(0, "tn"), isiJawab("tujuh.", "f", 2, "7"), sorotkan("antara", "f1-k", "f3-k")),
    k(SUARA_M4, tambah("Betul!", emo("ok", 60, 186, "✅", 32)), tambah("hebat!", emo("ow", 240, 186, IGIL, 32))),
  ],
};

/* ------------------------------ 5. Latihan 3: tangga ------------------------------ */
const SUARA_N1 = "Latihan tiga. Upe berdiri di anak tangga enam. Kalau Upe naik satu anak tangga, Upe berdiri di anak tangga berapa?";
const SUARA_N2 = "Upe naik satu anak tangga. Sekarang Upe berdiri di anak tangga tujuh.";
const SUARA_N3 = "Sekarang Upe turun, kembali ke enam, lalu turun satu anak tangga lagi. Upe berdiri di anak tangga lima.";
const SUARA_N4 = "Betul! Sesudah enam adalah tujuh, dan sebelum enam adalah lima. Hebat!";
const SEMUA = Array.from({ length: 10 }, (_, i) => labelTs(i + 1));

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan 3: naik dan turun satu anak tangga",
  sumber: "Materi: latihan naik dan turun",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Latihan 3"), TANAH(), ...tangga(), ...SEMUA, anakDi(6)),
      sorotkan("enam.", "ts5"),
      tambah("berapa?", ...kartu("qq", 60, 164, 180, 26, W.langit, ["Naik satu: anak tangga ?"], 9.4)),
    ),
    k(SUARA_N2, ubah("naik", { id: "up", x: 33 + 26 * 6, y: 150 - 70 - 2 }), ubah("tujuh.", { id: "qq-t0", isi: "Naik satu: anak tangga 7" }, { id: "qq-k", warna: W.emas }), sorotkan("tujuh.", "ts6")),
    k(
      SUARA_N3,
      ubah("kembali", { id: "up", x: 33 + 26 * 5, y: 150 - 60 - 2 }),
      ubah("lima.", { id: "up", x: 33 + 26 * 4, y: 150 - 50 - 2 }),
      ubah("lima.", { id: "qq-t0", isi: "Turun satu: anak tangga 5" }, { id: "qq-k", warna: W.hijauMuda }),
      sorotkan("lima.", "ts4"),
    ),
    k(SUARA_N4, tambah("Betul!", emo("ok", 40, 184, "✅", 30)), tambah("Hebat!", emo("ow", 262, 184, IGIL, 30))),
  ],
};

/* ------------------------------ 6. Penutup ------------------------------ */
const SUARA_Z1 = "Mari kita ingat lagi. Menghitung maju: mulai dari bilangan kecil, lalu naik terus sampai sepuluh.";
const SUARA_Z2 = "Menghitung mundur: mulai dari bilangan besar, lalu turun terus sampai satu. Bilangannya makin kecil.";
const SUARA_Z3 = "Kita juga bisa melengkapi bilangan yang hilang, dengan melihat bilangan di kiri dan di kanannya. Kamu pasti bisa!";
const SUARA_Z4 = "Hebat sekali, anak-anak! Sampai jumpa di pelajaran berikutnya. Jangan lupa berlatih menghitung maju dan mundur di rumah.";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: mari ingat lagi",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Mari ingat lagi")), tambah("maju:", ...kartu("z1", 14, 34, 272, 34, W.hijauMuda, ["maju: kecil ke besar, 1 sampai 10"], 9.6), emo("z1e", 270, 60, "⬆️", 18))),
    k(SUARA_Z2, tambah("mundur:", ...kartu("z2", 14, 78, 272, 34, W.langit, ["mundur: besar ke kecil, 10 sampai 1"], 9.6), emo("z2e", 270, 104, "⬇️", 18))),
    k(SUARA_Z3, tambah("melengkapi", ...kartu("z3", 14, 122, 272, 34, W.pink, ["lengkapi: lihat kiri dan kanan"], 9.6))),
    k(SUARA_Z4, bersih(0), tambah(0, judul("Sampai jumpa!"), emo("sj", 150, 110, IGIL, 56)), tambah("anak-anak!", emo("pa", 80, 150, "\u{1F389}", 30), emo("pb", 220, 150, "\u{1F389}", 30))),
  ],
};
