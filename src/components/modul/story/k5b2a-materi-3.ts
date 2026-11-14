import type { AdeganStory, Obj } from "./logika-story";
import { W, emo, kartu, kelipatan, kisiAngka, panah, pusatSel, teks, judul } from "./k5b2a-gambar";
import { bersih, hapus, k, sebar, sorotkan, tambah, warnaiSel } from "./k5b2a-bantu";

/** Tabel 1 sampai 50 (Buku Siswa hlm. 35): 10 kolom, 5 baris. */
export const T50 = { x: 20, y: 38, cw: 26, ch: 22, kolom: 10, baris: 5 };
/** Tabel 1 sampai 100 (Buku Siswa hlm. 36 dan 37): 10 kolom, 10 baris. */
export const T100 = { x: 20, y: 30, cw: 22, ch: 16, kolom: 10, baris: 10 };
const kisi50 = (id: string) => kisiAngka(id, T50.x, T50.y, T50.cw, T50.ch, T50.kolom, T50.baris, [], W.karang, 8.6);
const kisi100 = (id: string) => kisiAngka(id, T100.x, T100.y, T100.cw, T100.ch, T100.kolom, T100.baris, [], W.karang, 7.6);
/** Panah pendek dari pusat sel a ke pusat sel b pada tabel 100 (dipendekkan agar tidak menutup angka). */
const lompatSel = (id: string, a: number, b: number, warna: string = W.merah): Obj => {
  const [ax, ay] = pusatSel(T100.x, T100.y, T100.cw, T100.ch, T100.kolom, a);
  const [bx, by] = pusatSel(T100.x, T100.y, T100.cw, T100.ch, T100.kolom, b);
  const sx = ax + (bx - ax) * 0.2;
  const sy = ay + (by - ay) * 0.2;
  const ex = ax + (bx - ax) * 0.8;
  const ey = ay + (by - ay) * 0.8;
  return panah(id, Number(sx.toFixed(2)), Number(sy.toFixed(2)), Number((ex - sx).toFixed(2)), Number((ey - sy).toFixed(2)), warna, 1.6);
};
/* ------------------------------ 8. Tabel 1 sampai 50 dan arti kelipatan 3 (Buku Siswa hlm. 35; Panduan Guru hlm. 50) ------------------------------ */
const SUARA_K2 = "Warnai tiga, enam, sembilan, dua belas, lima belas, dan seterusnya sampai empat puluh delapan. Ada enam belas bilangan kelipatan tiga di tabel ini.";
const POS_K2 = [1, 2, 3, 5, 7, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 13];

export const ADEGAN_TABEL: AdeganStory = {
  id: "tabel-tiga",
  judul: "Tabel 1 sampai 50 dan arti bilangan kelipatan 3",
  sumber: "Buku Siswa hlm. 35; Panduan Guru hlm. 50",
  latar: "#FFF7ED",
  kutipan: [
    "Salin tabel berikut di buku tugasmu, lalu warnai semua bilangan kelipatan 3 di tabel tersebut.",
    "Bilangan kelipatan 3 adalah bilangan bulat yang dikalikan dengan 3.",
    "Contohnya: 1 x 3, 2 x 3, 3 x 3, 4 x 3, dan seterusnya.",
    "0 yang diperoleh dari 0 x 3 bukan merupakan bilangan kelipatan 3.",
    "Selanjutnya, ajak peserta didik untuk menemukan bilangan kelipatan 3 pada tabel yang disediakan di buku siswa.",
    "Minta peserta didik untuk menyalin tabel tersebut, kemudian menandai bilangan-bilangan yang merupakan bilangan kelipatan 3.",
    "Jika masih tersedia waktu, kegiatan dapat dilanjutkan untuk mengerjakan soal pada bagian Ayo Berlatih.",
  ],
  ketukan: [
    k(
      "Setelah bermain, kita salin tabel satu sampai lima puluh di buku tugas, lalu warnai semua bilangan kelipatan tiga.",
      tambah(0, judul("Tabel 1 sampai 50")),
      tambah("salin", kisi50("tb")),
      tambah("warnai", teks("lb", 150, 172, "warnai kelipatan 3", 10, W.merah)),
    ),
    k(
      SUARA_K2,
      hapus(0, "lb"),
      ...warnaiSel("tb", W.karang, kelipatan(3, 50), POS_K2),
      tambah(15, teks("jm", 150, 172, "ada 16 bilangan kelipatan 3", 10, W.merah)),
    ),
    k(
      "Bilangan kelipatan tiga adalah bilangan bulat yang dikalikan dengan tiga. Contohnya satu kali tiga, dua kali tiga, tiga kali tiga, empat kali tiga, dan seterusnya.",
      bersih(0),
      tambah(0, judul("Kelipatan 3: bilangan bulat × 3")),
      tambah(5, ...kartu("rl", 20, 136, 260, 34, W.emas, ["kelipatan 3 = bilangan bulat × 3"], 10)),
      tambah(11, ...kartu("e1", 20, 36, 125, 34, W.krem, ["1 × 3 = 3"], 10.4)),
      tambah(14, ...kartu("e2", 155, 36, 125, 34, W.krem, ["2 × 3 = 6"], 10.4)),
      tambah(17, ...kartu("e3", 20, 82, 125, 34, W.krem, ["3 × 3 = 9"], 10.4)),
      tambah(20, ...kartu("e4", 155, 82, 125, 34, W.krem, ["4 × 3 = 12"], 10.4)),
    ),
    k(
      "Ingat, nol yang diperoleh dari nol kali tiga bukan merupakan bilangan kelipatan tiga.",
      bersih(0),
      tambah(0, judul("Nol bukan kelipatan")),
      tambah("nol@2", ...kartu("nl", 60, 50, 180, 40, W.krem, ["0 × 3 = 0"], 12)),
      tambah("bukan", emo("nx", 150, 124, "❌", 34), ...kartu("nb", 60, 140, 180, 34, W.merahMuda, ["0 bukan kelipatan 3"], 10)),
    ),
    k(
      "Panduan guru meminta peserta didik menyalin tabel dan menandai kelipatan tiga. Jika masih ada waktu, kita lanjut ke Ayo Berlatih.",
      bersih(0),
      tambah(0, judul("Lanjut ke Ayo Berlatih")),
      tambah("menyalin", emo("pn", 150, 84, "✏", 44)),
      tambah("tabel", ...kartu("sl", 40, 104, 220, 32, W.hijauMuda, ["salin tabel, tandai kelipatan 3"], 9.6)),
      tambah("Berlatih.", ...kartu("br", 40, 146, 220, 32, W.emas, ["Ayo Berlatih"], 11)),
    ),
  ],
};

/* ------------------------------ 9. Ayo Berlatih nomor 1: kelipatan 7 (Buku Siswa hlm. 35 dan 36; Panduan Guru hlm. 51) ------------------------------ */
const SUARA_B2 = "Kelipatan tujuh: tujuh, empat belas, dua puluh satu, dua puluh delapan, tiga puluh lima, empat puluh dua, empat puluh sembilan.";
const SUARA_B3 = "Lanjutkan: lima puluh enam, enam puluh tiga, tujuh puluh, tujuh puluh tujuh, delapan puluh empat, sembilan puluh satu, dan sembilan puluh delapan. Jadi ada empat belas kelipatan tujuh sampai seratus.";

export const ADEGAN_TUJUH: AdeganStory = {
  id: "berlatih-tujuh",
  judul: "Ayo Berlatih nomor 1: kelipatan 7 pada tabel 1 sampai 100",
  sumber: "Buku Siswa hlm. 35–36; Panduan Guru hlm. 51",
  latar: "#F5F3FF",
  kutipan: [
    "Ayo Berlatih",
    "1. Salin tabel berikut di buku tugas kalian, kemudian coba lingkarilah bilangan kelipatan yang sesuai dengan bilangan yang diminta.",
    "Bilangan Kelipatan 7",
    "Saat membahas bilangan kelipatan 7 dan 9 di kelas, arahkan peserta didik untuk memperhatikan tabel mereka.",
    "Tanyakan kepada peserta didik tentang hal-hal apa saja yang dapat diamati dari tabel tersebut.",
    "bilangan-bilangan kelipatan 7 seperti perpindahan kuda pada permainan catur, dll.",
  ],
  ketukan: [
    k(
      "Ayo Berlatih nomor satu: salin tabel satu sampai seratus, lalu lingkari bilangan kelipatan yang diminta, yaitu kelipatan tujuh dan kelipatan sembilan.",
      tambah(0, judul("Ayo Berlatih 1: tabel 1 sampai 100")),
      tambah("salin", kisi100("g7")),
      tambah("tujuh", teks("lb1", 270, 80, "kelipatan", 7.6, W.biru), teks("lb2", 270, 94, "7", 14, W.merah)),
      tambah("sembilan.", teks("lb3", 270, 112, "dan", 7.6, W.biru), teks("lb4", 270, 128, "9", 14, W.merah)),
    ),
    k(
      SUARA_B2,
      hapus(0, "lb3", "lb4"),
      ...warnaiSel("g7", W.karang, [7, 14, 21, 28, 35, 42, 49], [2, 4, 7, 10, 13, 16, 19]),
    ),
    k(
      SUARA_B3,
      ...warnaiSel("g7", W.karang, [56, 63, 70, 77, 84, 91, 98], [3, 6, 8, 11, 14, 17, 21]),
      tambah(25, teks("jm", 270, 150, "14 bilangan", 7.6, W.merah)),
    ),
    k(
      "Panduan guru menyebutkan, kelipatan tujuh seperti perpindahan kuda pada permainan catur: turun satu baris, geser tiga kotak ke kiri.",
      tambah("kuda", ...[[7, 14], [14, 21], [35, 42], [56, 63], [77, 84], [84, 91]].map(([a, b], i) => lompatSel(`ar${i}`, a, b))),
      tambah("kuda", emo("kd", 270, 190, "🐴", 22)),
      sorotkan("kuda", "g7-c7"),
    ),
  ],
};

/* ------------------------------ 10. Ayo Berlatih nomor 1: kelipatan 9 (Buku Siswa hlm. 37; Panduan Guru hlm. 51) ------------------------------ */
const SUARA_S1 = "Sekarang kelipatan sembilan: sembilan, delapan belas, dua puluh tujuh, tiga puluh enam, empat puluh lima, lima puluh empat, enam puluh tiga, tujuh puluh dua, dan delapan puluh satu.";
const SUARA_S2 =
  "Kunci di panduan guru berhenti di delapan puluh satu. Padahal sembilan puluh dan sembilan puluh sembilan juga kelipatan sembilan, sebab sembilan kali sepuluh adalah sembilan puluh dan sembilan kali sebelas adalah sembilan puluh sembilan.";
const SUARA_S4 = "Panduan guru: kelipatan sembilan membentuk formasi diagonal. Tiap turun satu baris, bilangannya bergeser satu kotak ke kiri.";
export const KUNCI_9_BUKU = [9, 18, 27, 36, 45, 54, 63, 72, 81];

export const ADEGAN_SEMBILAN: AdeganStory = {
  id: "berlatih-sembilan",
  judul: "Ayo Berlatih nomor 1: kelipatan 9 pada tabel 1 sampai 100",
  sumber: "Buku Siswa hlm. 37; Panduan Guru hlm. 51",
  latar: "#FEF2F2",
  kutipan: [
    "Bilangan Kelipatan 9",
    "Saat membahas bilangan kelipatan 7 dan 9 di kelas, arahkan peserta didik untuk memperhatikan tabel mereka.",
    "bilangan-bilangan kelipatan 9 membentuk formasi diagonal,",
    "Coba gali kemungkinan-kemungkinan dan kreativitas lain yang mungkin muncul dari peserta didik.",
    "Beberapa hal atau kemungkinan yang ditemukan oleh peserta didik adalah",
  ],
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Bilangan Kelipatan 9")),
      tambah(0, kisi100("g9")),
      tambah(0, teks("lb1", 270, 80, "kelipatan", 7.6, W.biru), teks("lb2", 270, 94, "9", 14, W.merah)),
      ...warnaiSel("g9", W.karang, KUNCI_9_BUKU, [3, 5, 8, 11, 14, 17, 20, 23, 27]),
    ),
    k(
      SUARA_S2,
      sorotkan("berhenti", "g9-c81"),
      ...warnaiSel("g9", W.hijau, [90, 99], [11, 15]),
      tambah(25, teks("q1", 272, 120, "9 × 10 = 90", 8, W.hijau)),
      tambah(32, teks("q2", 272, 136, "9 × 11 = 99", 8, W.hijau)),
    ),
    k(
      "Jadi ada sebelas bilangan kelipatan sembilan sampai seratus, bukan sembilan. Itu hitungan mandiri kita sebagai catatan guru.",
      tambah("sebelas", teks("jm", 272, 160, "11 bilangan", 8, W.merah)),
      tambah("catatan", teks("ct", 272, 176, "catatan guru", 7.6, W.ungu)),
    ),
    k(
      SUARA_S4,
      ...[0, 1, 2, 3, 4, 5, 6, 7].map((i) => tambah(sebar(SUARA_S4, 8, 4)[i], lompatSel(`da${i}`, KUNCI_9_BUKU[i], KUNCI_9_BUKU[i + 1]))),
    ),
  ],
};

/* ------------------------------ 11. Ayo Berlatih nomor 2 dan 3: kelipatan 6 dan 8 (Buku Siswa hlm. 37; Panduan Guru hlm. 51) ------------------------------ */
const SUARA_E1 = "Nomor dua: tuliskan paling sedikit lima bilangan kelipatan enam. Kita tulis enam, dua belas, delapan belas, dua puluh empat, dan tiga puluh.";
const SUARA_E2 =
  "Kunci di panduan guru menulis dua belas, delapan belas, dua puluh empat, tiga puluh, tiga puluh enam, empat puluh dua, empat puluh delapan. Catatannya, peserta didik tidak harus mulai dari bilangan yang paling kecil.";
const SUARA_E3 = "Nomor tiga: paling sedikit lima bilangan kelipatan delapan. Kita tulis delapan, enam belas, dua puluh empat, tiga puluh dua, dan empat puluh.";
const SUARA_E4 = "Kunci panduan guru: delapan, enam belas, dua puluh empat, tiga puluh dua, empat puluh, empat puluh delapan, lima puluh enam. Jadi kuncinya cocok dengan hitungan kita.";
const kotakAngka = (id: string, i: number, n: number, y: number, warna: string, w: number, jarak: number, x0: number): Obj[] => [
  { id: `${id}-b${i}`, t: "kotak", x: x0 + i * jarak, y, w, h: 36, warna, garis: W.biru, rx: 7, tebal: 1.5 },
  teks(`${id}-a${i}`, x0 + i * jarak + w / 2, y + 23, String(n), 12, W.biru),
];
const deret = (id: string, y: number, angka: number[], warna: string, posisi: number[], w = 48, jarak = 56, x0 = 14) => angka.map((n, i) => tambah(posisi[i], ...kotakAngka(id, i, n, y, warna, w, jarak, x0)));

export const ADEGAN_ENAM_DELAPAN: AdeganStory = {
  id: "berlatih-enam-delapan",
  judul: "Ayo Berlatih nomor 2 dan 3: kelipatan 6 dan kelipatan 8",
  sumber: "Buku Siswa hlm. 37; Panduan Guru hlm. 51",
  latar: "#ECFEFF",
  kutipan: [
    "2. Coba kalian tuliskan minimal 5 bilangan kelipatan 6.",
    "3. Coba kalian tuliskan minimal 5 bilangan kelipatan 8.",
    "Bilangan kelipatan 6",
    "Bilangan kelipatan 8",
    "Catatan: untuk nomor 2",
    "bilangan yang paling",
  ],
  ketukan: [
    k(
      SUARA_E1,
      tambah(0, judul("Nomor 2: kelipatan 6")),
      ...deret("e6", 76, [6, 12, 18, 24, 30], W.pink, [11, 13, 15, 18, 21]),
      tambah("tulis", teks("lb", 150, 150, "paling sedikit 5 bilangan", 10, W.merah)),
    ),
    k(
      SUARA_E2,
      bersih(0),
      tambah(0, judul("Kunci Panduan Guru: nomor 2")),
      ...deret("kc", 54, [12, 18, 24, 30, 36, 42, 48], W.krem, [3, 6, 9, 11, 14, 17, 20], 34, 40, 10),
      tambah("Catatannya,", ...kartu("ct", 14, 112, 272, 44, W.hijauMuda, ["tidak harus mulai dari", "bilangan yang paling kecil"], 9.6)),
    ),
    k(
      SUARA_E3,
      bersih(0),
      tambah(0, judul("Nomor 3: kelipatan 8")),
      ...deret("e8", 76, [8, 16, 24, 32, 40], W.langit, [10, 12, 15, 18, 21]),
      tambah("tulis", teks("lb", 150, 150, "paling sedikit 5 bilangan", 10, W.merah)),
    ),
    k(
      SUARA_E4,
      bersih(0),
      tambah(0, judul("Kunci Panduan Guru: nomor 3")),
      ...deret("k8", 54, [8, 16, 24, 32, 40, 48, 56], W.krem, [3, 5, 8, 11, 13, 16, 19], 34, 40, 10),
      tambah("cocok", ...kartu("ck", 40, 120, 220, 34, W.hijauMuda, ["kunci cocok dengan hitungan kita"], 9.6)),
    ),
  ],
};

/* ------------------------------ 12. Penutup: refleksi, kesimpulan, dan catatan guru (Panduan Guru hlm. 50 dan 51; Buku Siswa hlm. 60) ------------------------------ */
export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup-guru",
  judul: "Penutup subbab A: refleksi nomor 1, kesimpulan, dan catatan guru",
  sumber: "Panduan Guru hlm. 50–51; Buku Siswa hlm. 60",
  latar: "#FDF4FF",
  kutipan: [
    "Aku dapat menentukan kelipatan suatu bilangan.",
    "Berilah tanda centang",
    "Tutup pembelajaran dengan meminta siswa melakukan releksi atas materi yang sudah mereka pelajari dengan menjawab pertanyaan releksi nomor 1 pada tabel releksi di buku siswa.",
    "Permainan dilakukan selama 1 jam pelajaran.",
    "Harapannya, peserta didik dapat menyebutkan kesimpulan tentang kelipatan suatu bilangan.",
  ],
  ketukan: [
    k(
      "Panduan guru menutup dengan refleksi nomor satu: aku dapat menentukan kelipatan suatu bilangan. Peserta didik menjawab ya atau tidak dengan tanda centang.",
      tambah(0, judul("Refleksi nomor 1")),
      tambah("refleksi", ...kartu("rf", 14, 36, 272, 50, W.langit, ["Aku dapat menentukan", "kelipatan suatu bilangan."], 10)),
      tambah("ya", ...kartu("ya", 50, 106, 80, 34, W.hijauMuda, ["Ya"], 11)),
      tambah("tidak", ...kartu("td", 170, 106, 80, 34, W.merahMuda, ["Tidak"], 11)),
      tambah("centang.", emo("cg", 90, 168, "✔", 28)),
    ),
    k(
      "Kesimpulan subbab A: kelipatan suatu bilangan diperoleh dengan mengalikannya dengan bilangan bulat satu, dua, tiga, dan seterusnya, atau menambahkannya secara bertahap. Nol tidak dihitung.",
      bersih(0),
      tambah(0, judul("Kesimpulan subbab A")),
      tambah("mengalikannya", ...kartu("s1", 14, 34, 272, 36, W.hijauMuda, ["dikali 1, 2, 3, dan seterusnya"], 9.8)),
      tambah("menambahkannya", ...kartu("s2", 14, 80, 272, 36, W.langit, ["ditambah bertahap: 3, 6, 9, ..."], 9.8)),
      tambah("Nol", ...kartu("s3", 14, 126, 272, 36, W.merahMuda, ["nol tidak dihitung"], 9.8)),
    ),
    k(
      "Rangkuman kegiatan subbab A: tepuk bilangan kelipatan tiga, tabel satu sampai lima puluh, tabel satu sampai seratus untuk tujuh dan sembilan, serta kelipatan enam dan delapan.",
      bersih(0),
      tambah(0, judul("Rangkuman kegiatan")),
      tambah("tepuk", ...kartu("r1", 14, 34, 130, 40, W.krem, ["tepuk", "kelipatan 3"], 9.6)),
      tambah("tabel@1", ...kartu("r2", 156, 34, 130, 40, W.langit, ["tabel", "1 sampai 50"], 9.6)),
      tambah("seratus", ...kartu("r3", 14, 86, 130, 40, W.pink, ["tabel 1 sampai 100", "kelipatan 7 dan 9"], 9)),
      tambah("enam", ...kartu("r4", 156, 86, 130, 40, W.hijauMuda, ["kelipatan 6", "dan 8"], 9.6)),
    ),
    k(
      "Catatan guru: kunci kelipatan sembilan belum memuat sembilan puluh dan sembilan puluh sembilan, dan aturan tepuk di langkah enam berbeda dari cerita Asep, jadi dua hal ini perlu diluruskan di kelas.",
      bersih(0),
      tambah(0, judul("Dua catatan untuk guru")),
      tambah("kunci", ...kartu("n1", 14, 34, 272, 50, W.merahMuda, ["kunci kelipatan 9: sampai 81", "seharusnya sampai 99"], 9.6)),
      tambah("aturan", ...kartu("n2", 14, 96, 272, 50, W.emas, ["langkah 6 menyebut bilangan,", "cerita Asep memakai tepuk"], 9.6)),
      tambah("diluruskan", emo("lr", 150, 178, "📝", 24)),
    ),
  ],
};
