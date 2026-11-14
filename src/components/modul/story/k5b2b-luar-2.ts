import type { AdeganStory, Obj } from "./logika-story";
import { W, bulat, emo, garis, garisHari, judul, kartu, teks } from "./k5b2b-gambar";
import { bersih, k, sorotkan, tambah } from "./k5b2b-bantu";

/* ------------------------------ 6. Prime Factor Preview: konsep (pratinjau ringan) ------------------------------ */
export const ADEGAN_LUAR_PRIMA: AdeganStory = {
  id: "luar-prima",
  judul: "Prime Factor Preview: KPK dari faktor prima",
  sumber: "Metode luar: Prime Factor Preview",
  latar: "#FFFBEB",
  ketukan: [
    k(
      "Metode ketiga, Prime Factor Preview, pratinjau KPK dari faktor prima. Ini baru pengintip, bagian lengkapnya dipelajari nanti. Idenya, tiap bilangan dipecah menjadi perkalian bilangan yang tidak bisa dipecah lagi.",
      tambah(0, judul("Prime Factor Preview")),
      tambah("pengintip,", emo("pe", 150, 76, "👀", 34)),
      tambah("dipecah", teks("a1", 90, 138, "6 = 2 × 3", 16, W.hitam), teks("a2", 214, 138, "8 = 2 × 2 × 2", 14, W.hitam)),
    ),
    k(
      "Bilangan seperti dua, tiga, dan lima tidak bisa dipecah lagi. Namanya bilangan prima. Ia seperti batu bata pembangun bilangan yang lain.",
      bersih(0),
      tambah(0, judul("Bilangan prima: batu bata")),
      tambah("dua,", ...kartu("b2", 22, 54, 70, 56, W.hijauMuda, ["2"], 22)),
      tambah("tiga,", ...kartu("b3", 115, 54, 70, 56, W.langit, ["3"], 22)),
      tambah("lima", ...kartu("b5", 208, 54, 70, 56, W.krem, ["5"], 22)),
      tambah("batu", emo("bt", 150, 150, "🧱", 34)),
    ),
    k(
      "Enam sama dengan dua kali tiga. Delapan sama dengan dua kali dua kali dua. Untuk KPK, ambil tiap bilangan prima sebanyak kemunculan terbanyaknya.",
      bersih(0),
      tambah(0, judul("Pecah, lalu ambil terbanyak")),
      tambah("Enam", teks("c1", 150, 62, "6 = 2 × 3", 18, W.hitam)),
      tambah("Delapan", teks("c2", 150, 94, "8 = 2 × 2 × 2", 18, W.hitam)),
      tambah("ambil", ...kartu("c3", 30, 118, 240, 44, W.krem, ["ambil tiap bilangan prima", "sebanyak muncul terbanyak"], 9.6)),
    ),
    k(
      "Dua muncul tiga kali di delapan, tiga muncul sekali di enam. Jadi KPK enam dan delapan adalah dua kali dua kali dua kali tiga, yaitu dua puluh empat.",
      bersih(0),
      tambah(0, judul("Hasil: KPK 6 dan 8")),
      tambah("Dua", teks("d1", 150, 58, "2 muncul 3 kali di 8", 11, W.hijau), teks("d2", 150, 80, "3 muncul 1 kali di 6", 11, W.coklat)),
      tambah("Jadi", teks("d3", 150, 128, "2 × 2 × 2 × 3 = 24", 18, W.hitam)),
      tambah("empat.", teks("d4", 150, 168, "KPK 6 dan 8 = 24", 16, W.biru)),
    ),
  ],
};

/* ------------------------------ 7. Prime Factor Preview: penerapan (3, 4, dan 5; angka buku) ------------------------------ */
export const ADEGAN_LUAR_PRIMA_TERAPAN: AdeganStory = {
  id: "luar-prima-terapan",
  judul: "Faktor prima: angka dari buku",
  sumber: "Metode luar: Prime Factor Preview; Panduan Guru hlm. 60",
  latar: "#FFFBEB",
  ketukan: [
    k(
      "Terapkan pada tiga, empat, dan lima dari buku. Tiga dan lima sudah prima, sedangkan empat sama dengan dua kali dua.",
      tambah(0, judul("KPK 3, 4, dan 5")),
      tambah("tiga", teks("e3", 60, 90, "3", 26, W.hijau)),
      tambah("empat", teks("e4", 150, 90, "4 = 2 × 2", 17, W.hitam)),
      tambah("lima", teks("e5", 240, 90, "5", 26, W.coklat)),
    ),
    k(
      "Ambil dua sebanyak dua kali dari empat, lalu ambil tiga, dan ambil lima. Kalikan semuanya.",
      tambah("Ambil", ...kartu("f1", 20, 120, 56, 40, W.hijauMuda, ["2", "2"], 10)),
      tambah("tiga,", ...kartu("f2", 90, 120, 56, 40, W.langit, ["3"], 14)),
      tambah("lima.", ...kartu("f3", 160, 120, 56, 40, W.krem, ["5"], 14)),
      tambah("Kalikan", teks("f4", 258, 146, "× semua", 10, W.merah)),
    ),
    k(
      "Hasilnya enam puluh, sama dengan KPK tiga, empat, dan lima pada kunci buku. Kita tidak perlu menulis daftar yang panjang.",
      bersih(0),
      tambah(0, judul("Hasil: enam puluh")),
      tambah("Hasilnya", teks("g1", 150, 66, "2 × 2 × 3 × 5 = 60", 20, W.hitam)),
      tambah("KPK", teks("g2", 150, 112, "KPK 3, 4, dan 5 = 60", 18, W.biru)),
      tambah("daftar", ...kartu("g3", 50, 130, 200, 40, W.hijauMuda, ["tanpa daftar panjang"], 10.4)),
    ),
    k(
      "Dengan cara yang sama untuk empat dan lima: dua kali dua kali lima menjadi dua puluh, sesuai contoh di buku. Ini baru pratinjau ringan, cara lengkapnya dibahas nanti.",
      bersih(0),
      tambah(0, judul("Empat dan lima juga")),
      tambah("kali@2", teks("h1", 150, 70, "2 × 2 × 5 = 20", 20, W.hitam)),
      tambah("buku.", teks("h2", 150, 112, "KPK 4 dan 5 = 20", 18, W.biru)),
      tambah("pratinjau", emo("h3", 150, 162, "👀", 30)),
    ),
  ],
};

/* ------------------------------ 8. Meeting Cycle: konsep (garis hari) ------------------------------ */
const X0 = 24;
const LANGKAH = 21;
const xHari = (d: number): number => X0 + d * LANGKAH;
const titikHari = (pre: string, hari: number[], y: number, warna: string): Obj[] => hari.map((d) => bulat(`${pre}${d}`, xHari(d), y, 5, warna, W.biru, { tebal: 1.2 }));

export const ADEGAN_LUAR_SIKLUS: AdeganStory = {
  id: "luar-siklus",
  judul: "Meeting Cycle: siklus bertemu",
  sumber: "Metode luar: Meeting Cycle",
  latar: "#F0F9FF",
  ketukan: [
    k(
      "Metode keempat, Meeting Cycle, siklus bertemu. Dua jadwal yang berulang akan bertemu lagi setelah sejumlah hari yang sama dengan KPK-nya. Mulai dari Nisa yang berlatih tiap tiga hari.",
      tambah(0, judul("Meeting Cycle")),
      tambah("jadwal", ...garisHari("gh", X0, 100, 12, LANGKAH)),
      tambah("Nisa", teks("ln", 150, 62, "Nisa: tiap 3 hari", 10, W.hijau), ...titikHari("gn", [3, 6, 9, 12], 84, W.hijauPita)),
    ),
    k(
      "Yohana berlatih tiap empat hari, jadi pada hari keempat, kedelapan, dan kedua belas.",
      tambah("Yohana", teks("ly", 150, 156, "Yohana: tiap 4 hari", 10, W.coklat), ...titikHari("gy", [4, 8, 12], 132, W.jingga)),
    ),
    k(
      "Hari pertama yang ditempati keduanya adalah hari kedua belas. Itulah satu siklus, dan panjang siklus sama dengan KPK tiga dan empat.",
      tambah("kedua@2", garis("gv", xHari(12), 80, 0, 54, W.merah, 2, { putus: true })),
      sorotkan("siklus,", "gn12", "gy12"),
      tambah("KPK", teks("gk", 150, 182, "KPK 3 dan 4 = 12", 14, W.biru)),
    ),
    k(
      "Setelah itu pola berulang: hari dua puluh empat, tiga puluh enam, dan seterusnya, selalu kelipatan dua belas.",
      tambah("pola", teks("gt", 150, 196, "bertemu lagi: hari 12, 24, 36, ...", 9.6, W.merah)),
    ),
  ],
};

/* ------------------------------ 9. Meeting Cycle: penerapan (tiga jadwal buku) ------------------------------ */
export const ADEGAN_LUAR_SIKLUS_TERAPAN: AdeganStory = {
  id: "luar-siklus-terapan",
  judul: "Siklus bertemu: jadwal dari buku",
  sumber: "Metode luar: Meeting Cycle; Buku Siswa hlm. 41–42; Panduan Guru hlm. 57 dan 60",
  latar: "#F0F9FF",
  ketukan: [
    k(
      "Nisa dan Yohana berlatih tiap tiga dan empat hari, jadi siklusnya dua belas hari. Mulai tanggal tiga Agustus, mereka bertemu lagi tanggal lima belas Agustus.",
      tambah(0, judul("Nisa dan Yohana")),
      tambah("siklusnya", teks("a1", 150, 60, "KPK 3 dan 4 = 12", 14, W.biru)),
      tambah("tanggal", teks("a2", 150, 100, "3 + 12 = 15", 22, W.hitam)),
      tambah("lima", ...kartu("a3", 60, 120, 180, 44, W.hijauMuda, ["3 Agustus + 12 hari", "= 15 Agustus"], 10.4)),
    ),
    k(
      "Asep dan Lukas berlatih tiap tiga dan lima hari, siklusnya lima belas hari. Mulai tanggal dua puluh Agustus, dua puluh ditambah lima belas sama dengan tiga puluh lima.",
      bersih(0),
      tambah(0, judul("Asep dan Lukas")),
      tambah("siklusnya", teks("b1", 150, 64, "KPK 3 dan 5 = 15", 14, W.biru)),
      tambah("dua", teks("b2", 150, 112, "20 + 15 = 35", 22, W.hitam)),
    ),
    k(
      "Agustus hanya sampai tanggal tiga puluh satu. Tiga puluh lima dikurangi tiga puluh satu sama dengan empat, jadi mereka bertemu tanggal empat September.",
      tambah("Agustus", teks("b3", 150, 144, "Agustus berakhir di tanggal 31", 10.4, W.merah)),
      tambah("dikurangi", teks("b4", 150, 168, "35 - 31 = 4", 18, W.biru)),
      tambah("September.", teks("b5", 150, 190, "4 September", 14, W.hijau)),
    ),
    k(
      "Dinda dan Amelia berlatih tiap lima dan dua hari, siklusnya sepuluh hari. Mulai empat belas Juli, mereka bertemu lagi tanggal dua puluh empat Juli.",
      bersih(0),
      tambah(0, judul("Dinda dan Amelia")),
      tambah("siklusnya", teks("c1", 150, 64, "KPK 2 dan 5 = 10", 14, W.biru)),
      tambah("Mulai", teks("c2", 150, 112, "14 + 10 = 24", 22, W.hitam)),
      tambah("Juli@2", ...kartu("c3", 60, 130, 180, 44, W.hijauMuda, ["14 Juli + 10 hari", "= 24 Juli"], 10.4)),
    ),
    k(
      "Tiga jadwal, tiga siklus: dua belas, lima belas, dan sepuluh hari. Masing-masing adalah KPK dari dua jarak hari latihan.",
      bersih(0),
      tambah(0, judul("Tiga jadwal, tiga siklus")),
      tambah("dua", ...kartu("t1", 20, 40, 260, 30, W.hijauMuda, ["3 dan 4 hari: siklus 12 hari"], 9.6)),
      tambah("lima", ...kartu("t2", 20, 82, 260, 30, W.langit, ["3 dan 5 hari: siklus 15 hari"], 9.6)),
      tambah("sepuluh", ...kartu("t3", 20, 124, 260, 30, W.krem, ["5 dan 2 hari: siklus 10 hari"], 9.6)),
      tambah("KPK", teks("t4", 150, 180, "siklus = KPK", 12, W.merah)),
    ),
  ],
};

/* ------------------------------ 10. Ringkasan ------------------------------ */
export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan empat metode mencari KPK",
  sumber: "Ringkasan metode luar",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Ringkasan empat metode mencari KPK. Satu, daftar kelipatan bersama: tulis, lalu cocokkan. Dua, irisan: KPK adalah anggota terkecil irisan.",
      tambah(0, judul("Ringkasan")),
      tambah("Satu,", ...kartu("r1", 14, 34, 272, 38, W.hijauMuda, ["1. Common Multiples List", "tulis daftar lalu cocokkan"], 9)),
      tambah("Dua,", ...kartu("r2", 14, 82, 272, 38, W.langit, ["2. LCM Concept", "KPK = anggota terkecil irisan"], 9)),
    ),
    k(
      "Tiga, faktor prima: ambil tiap bilangan prima sebanyak kemunculan terbanyak. Empat, siklus bertemu: panjang siklus sama dengan KPK.",
      tambah("Tiga,", ...kartu("r3", 14, 130, 272, 38, W.krem, ["3. Prime Factor Preview", "ambil prima sebanyak terbanyak"], 9)),
      tambah("Empat,", ...kartu("r4", 14, 176, 272, 22, W.pink, ["4. Meeting Cycle: siklus = KPK"], 8.6)),
    ),
    k(
      "Semua metode memberi jawaban yang sama. Empat dan lima menjadi dua puluh, enam dan delapan menjadi dua puluh empat, tiga, empat, dan lima menjadi enam puluh.",
      bersih(0),
      tambah(0, judul("Jawabannya selalu sama")),
      tambah("Empat", teks("s1", 150, 62, "KPK 4 dan 5 = 20", 18, W.biru)),
      tambah("enam", teks("s2", 150, 104, "KPK 6 dan 8 = 24", 18, W.biru)),
      tambah("tiga,", teks("s3", 150, 146, "KPK 3, 4, dan 5 = 60", 18, W.biru)),
    ),
    k(
      "Pilih metode yang pas: daftar untuk bilangan kecil, irisan untuk melihat gambaran, faktor prima untuk bilangan besar, siklus untuk soal jadwal. Video materi dan metode luar saling melengkapi.",
      bersih(0),
      tambah(0, judul("Pilih yang pas")),
      tambah("daftar", ...kartu("u1", 14, 34, 128, 40, W.hijauMuda, ["daftar:", "bilangan kecil"], 9)),
      tambah("irisan", ...kartu("u2", 158, 34, 128, 40, W.langit, ["irisan:", "melihat gambaran"], 9)),
      tambah("faktor", ...kartu("u3", 14, 90, 128, 40, W.krem, ["faktor prima:", "bilangan besar"], 9)),
      tambah("siklus", ...kartu("u4", 158, 90, 128, 40, W.pink, ["siklus:", "soal jadwal"], 9)),
      tambah("melengkapi.", emo("u5", 150, 170, "🧩", 28)),
    ),
  ],
};
