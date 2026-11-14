import type { AdeganStory, Obj } from "./logika-story";
import { MISKON1, PENGAYAAN, UK4, UK4_DALAM, UK5, W, denahBingkai, denahLabel, denahRuang, denahTepi, emo, garis, jalur, judul, kartu, kotak, poligon, skala, teks } from "./k5b4e-gambar";
import type { Titik } from "./k5b4e-gambar";
import { bersih, k, tambah, ubah } from "./k5b4e-bantu";

const OX = 22;
const OY = 36;
const S = 11;
const PX = 234;
const baris = (id: string, y: number, isi: string, u = 9.6, warna: string = W.biru): Obj => teks(id, PX, y, isi, u, warna);
const ruang = (id: string, kode?: string[]): Obj[] => denahRuang(id, OX, OY, S, kode);
const tepi = (id: string, warna: string = W.merah, o: Partial<Obj> = {}): Obj => denahTepi(id, OX, OY, S, warna, 2.4, { z: 5, ...o });
/** Panjang sisi dinding terluar menurut denah: dua, empat, enam, dua, empat, empat, empat, empat, dua, dua, empat, empat, dua, empat. */
export const NILAI_SISI: Record<string, string> = { AB: "2", BC: "4", CD: "6", DE: "2", EF: "4", FG: "4", GH: "4", HI: "4", IJ: "2", JK: "2", KL: "4", LM: "4", MN: "2", NA: "4" };
const semuaLabel = (id: string, u = 6.6, warna: string = W.biru): Obj[] => Object.entries(NILAI_SISI).map(([n, v]) => denahLabel(`${id}-${n}`, OX, OY, S, n, v, u, warna));
const bentuk = (id: string, ox: number, oy: number, s: number, p: Titik[], warna: string, o: Partial<Obj> = {}): Obj => poligon(id, ox, oy, skala(p, s), warna, W.biru, { tebal: 2, ...o });
const bingkai = (id: string, ox: number, oy: number, s: number, x1: number, y1: number, w: number, h: number, warna: string = W.hijau, o: Partial<Obj> = {}): Obj => kotak(id, ox + x1 * s, oy + y1 * s, w * s, h * s, "none", warna, { rx: 0, tebal: 1.5, putus: true, ...o });

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Empat metode dari luar untuk keliling bangun gabungan",
  sumber: "Metode luar: pembuka; contoh Buku Siswa hlm. 125–130",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Bagaimana menghitung keliling bangun yang bentuknya gabungan? Guru di berbagai negara punya cara berbeda. Dalam video ini kita lihat empat metode dari luar.",
      tambah(0, judul("Empat metode dari luar")),
      tambah("bangun", ...ruang("pb")),
      tambah("Guru", emo("pg", 234, 100, "🌍", 40)),
      tambah("empat", teks("pq", 234, 140, "4 metode", 12, W.merah)),
    ),
    k(
      "Empat metode itu: Outer Path Only, Bounding Rectangle, Missing Length, dan Closed Path Balance.",
      bersih(0),
      tambah(0, judul("Empat metode")),
      tambah("Outer", ...kartu("m1", 20, 32, 260, 30, W.hijauMuda, ["1. Outer Path Only"], 9.6)),
      tambah("Bounding", ...kartu("m2", 20, 72, 260, 30, W.langit, ["2. Bounding Rectangle"], 9.6)),
      tambah("Missing", ...kartu("m3", 20, 112, 260, 30, W.krem, ["3. Missing Length"], 9.6)),
      tambah("Closed", ...kartu("m4", 20, 152, 260, 30, W.pink, ["4. Closed Path Balance"], 9.6)),
    ),
    k(
      "Semua metode bertumpu pada satu gagasan: keliling adalah jumlah panjang jalur terluar, satu putaran penuh sampai kembali ke titik awal.",
      bersih(0),
      tambah(0, judul("Satu gagasan yang sama")),
      tambah("keliling", ...ruang("pb")),
      tambah("jalur", denahTepi("pbt", OX, OY, S, W.merah, 3, { gambar: true, z: 5 })),
      tambah("kembali", teks("ps", PX, 100, "satu putaran", 11, W.merah), teks("ps2", PX, 116, "penuh", 11, W.merah), emo("ps3", PX, 150, "🔄", 28)),
    ),
    k(
      "Angkanya dari buku: denah rumah yang dindingnya mengelilingi bingkai dua belas kali dua belas, soal Uji Kompetensi, dan soal pengayaan gedung sekolah.",
      bersih(0),
      tambah(0, judul("Angka dari buku")),
      tambah("denah", ...kartu("a1", 20, 36, 260, 34, W.langit, ["denah rumah, bingkai 12 m × 12 m"], 9.4)),
      tambah("Uji", ...kartu("a2", 20, 82, 260, 34, W.hijauMuda, ["Uji Kompetensi nomor 4 dan 5"], 9.4)),
      tambah("pengayaan", ...kartu("a3", 20, 128, 260, 34, W.krem, ["gedung sekolah 24 m × 20 m"], 9.4)),
    ),
  ],
};

/* ------------------------------ 2. Outer Path Only: konsep ------------------------------ */
export const ADEGAN_LUAR_OPO: AdeganStory = {
  id: "luar-opo",
  judul: "Outer Path Only: hanya jalur terluar",
  sumber: "Metode luar: Outer Path Only",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Metode pertama, Outer Path Only, artinya hanya jalur terluar yang dihitung. Bayangkan berjalan menyusuri dinding paling luar sampai kembali ke titik awal.",
      tambah(0, judul("Outer Path Only")),
      tambah("Metode", ...ruang("op")),
      tambah("jalur", denahTepi("opt", OX, OY, S, W.merah, 3, { gambar: true, z: 5 })),
      tambah("berjalan", emo("opj", PX, 100, "🚶", 36)),
    ),
    k(
      "Dinding di dalam, seperti sekat antar ruangan, boleh diabaikan. Sekat memisahkan ruangan, tetapi bukan bagian dari tepi bangun.",
      ubah(0, { id: "opj", op: 0 }),
      tambah("Dinding", ...kartu("o1", 170, 40, 124, 50, W.merahMuda, ["sekat di dalam:", "tidak dihitung"], 9), emo("o1e", 232, 112, "❌", 24)),
      tambah("tetapi", ...kartu("o2", 170, 130, 124, 50, W.hijauMuda, ["tepi luar:", "dihitung"], 9), emo("o2e", 150, 150, "✅", 18)),
    ),
    k(
      "Langkahnya tiga: tandai tepi luar, tulis panjang tiap sisi tepi, lalu jumlahkan. Sisi yang tersembunyi di dalam tidak ikut.",
      bersih(0),
      tambah(0, judul("Tiga langkah")),
      tambah("tandai", ...kartu("l1", 20, 34, 260, 34, W.langit, ["1. tandai tepi luar"], 9.6)),
      tambah("tulis", ...kartu("l2", 20, 80, 260, 34, W.hijauMuda, ["2. tulis panjang tiap sisi tepi"], 9.6)),
      tambah("jumlahkan.", ...kartu("l3", 20, 126, 260, 34, W.krem, ["3. jumlahkan semuanya"], 9.6)),
    ),
    k(
      "Kelebihannya, cepat dan sesuai definisi keliling. Kekurangannya, kita harus yakin mana tepi luar dan mana sekat, terutama pada bentuk yang rumit.",
      bersih(0),
      tambah(0, judul("Kelebihan dan kekurangan")),
      tambah("Kelebihannya,", ...kartu("kl", 14, 40, 130, 54, W.hijauMuda, ["cepat dan sesuai", "definisi keliling"], 9), emo("kle", 79, 120, "👍", 24)),
      tambah("Kekurangannya,", ...kartu("kk", 156, 40, 130, 54, W.merahMuda, ["harus yakin mana", "tepi luar, mana sekat"], 9), emo("kke", 221, 120, "🤔", 24)),
    ),
  ],
};

/* ------------------------------ 3. Outer Path Only: penerapan pada denah dan soal nomor 4 ------------------------------ */
export const ADEGAN_LUAR_OPO_TERAPAN: AdeganStory = {
  id: "luar-opo-terapan",
  judul: "Outer Path Only pada denah rumah dan soal nomor 4",
  sumber: "Metode luar: Outer Path Only; denah Buku Siswa hlm. 126; Uji Kompetensi hlm. 130",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Terapkan pada denah rumah. Kalau keliling tiap ruangan dijumlahkan, hasilnya seratus empat meter. Sekat antar ruangan ikut terhitung, bahkan dua kali.",
      tambah(0, judul("Denah: semua ruangan")),
      tambah("Terapkan", ...ruang("ot")),
      tambah("ruangan", teks("ot1", PX, 70, "16 + 12 + 24 +", 9.6, W.merah), teks("ot2", PX, 86, "20 + 16 + 16", 9.6, W.merah)),
      tambah("seratus", teks("ot3", PX, 112, "104 m", 16, W.merah), emo("ot4", PX, 148, "❌", 26)),
    ),
    k(
      "Dengan Outer Path Only, hanya empat belas sisi tepi yang dijumlahkan. Panjangnya dua, empat, enam, dua, empat, empat, empat, empat, dua, dua, empat, empat, dua, empat.",
      bersih(0),
      tambah(0, judul("Denah: hanya tepi luar")),
      tambah(0, ...ruang("ot"), tepi("ott")),
      tambah("Dengan", ...semuaLabel("ol")),
      tambah("empat@2", teks("ot5", PX, 100, "14 sisi tepi", 10, W.merah)),
    ),
    k(
      "Jumlahnya empat puluh delapan meter. Selisihnya, seratus empat dikurangi empat puluh delapan sama dengan lima puluh enam, yaitu dua kali panjang sekat yang terhitung ganda.",
      tambah("Jumlahnya", teks("ot6", PX, 126, "jalur luar: 48 m", 10.4, W.hijau)),
      tambah("Selisihnya,", teks("ot7", PX, 150, "104 − 48 = 56", 11, W.merah)),
      tambah("dua", teks("ot8", PX, 168, "= 2 × 28 m sekat", 9.4, W.coklat)),
    ),
    k(
      "Terapkan juga pada soal nomor empat: garis putus-putus di dalam bangun tidak ikut. Tepi luarnya dua belas, enam belas, dua belas, dua belas, dan dua puluh, jadi tujuh puluh dua sentimeter.",
      bersih(0),
      tambah(0, judul("Soal nomor 4: tepi luar")),
      tambah("soal", bentuk("t4", 20, 96, 5.2, UK4, W.krem, { z: 1 })),
      tambah("putus-putus", garis("t4d", 20 + UK4_DALAM[0][0] * 5.2, 96, 16 * 5.2, 0, W.merah, 1.6, { putus: true, z: 6 }), emo("t4x", 70, 82, "❌", 16)),
      tambah("Tepi", baris("t4a", 70, "tepi luar saja:", 9.4, W.hijau)),
      tambah("jadi", baris("t4b", 94, "12 + 16 + 12 + 12 + 20 = 72", 8.8), baris("t4c", 120, "72 cm", 16, W.hijau)),
    ),
  ],
};

/* ------------------------------ 4. Bounding Rectangle: konsep ------------------------------ */
const B1X = 20;
const B1Y = 58;
const B1S = 7;
export const ADEGAN_LUAR_BR: AdeganStory = {
  id: "luar-br",
  judul: "Bounding Rectangle: membungkus dengan persegi panjang",
  sumber: "Metode luar: Bounding Rectangle",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Metode kedua, Bounding Rectangle, membungkus bangun gabungan dengan persegi panjang terkecil yang melingkupinya. Inilah ide Komang di buku.",
      tambah(0, judul("Bounding Rectangle")),
      tambah("Metode", bentuk("br", B1X, B1Y, B1S, MISKON1, W.jingga)),
      tambah("persegi", bingkai("brb", B1X, B1Y, B1S, 0, 0, 20, 12)),
      tambah("Komang", teks("brk", 232, 110, "ide Komang", 10, W.hijau)),
    ),
    k(
      "Lalu geser sisi-sisi bangun ke tepi bingkai. Sisi mendatar bersama-sama selebar bingkai, dan sisi tegak bersama-sama setinggi bingkai.",
      ubah(0, { id: "brk", op: 0 }),
      tambah("geser", garis("g1", B1X + 10 * B1S, B1Y + 3 * B1S, 0, -3 * B1S, W.biru, 2.4, { z: 6 }), garis("g2", B1X + 13 * B1S, B1Y + 6 * B1S, 0, -6 * B1S, W.biru, 2.4, { z: 6 }), garis("g3", B1X + 16 * B1S, B1Y + 9 * B1S, 0, -9 * B1S, W.biru, 2.4, { z: 6 })),
      tambah("mendatar", teks("br1", 160, 150, "lebar bingkai", 9, W.hijau)),
      tambah("tegak", teks("br2", 160, 166, "tinggi bingkai", 9, W.hijau)),
    ),
    k(
      "Jadi keliling bangun sama dengan keliling bingkai: dua kali lebar ditambah dua kali tinggi. Cukup dua ukuran saja yang diperlukan.",
      bersih(0),
      tambah(0, judul("Keliling = keliling bingkai")),
      tambah("keliling", kotak("br3", 80, 46, 140, 84, W.hijauMuda, W.hijau, { rx: 0, tebal: 2.4, putus: true }), teks("br3a", 150, 42, "lebar", 9.6, W.hijau), teks("br3b", 238, 90, "tinggi", 9.6, W.hijau)),
      tambah("dua@2", teks("br3c", 150, 160, "K = 2 × (lebar + tinggi)", 12, W.merah)),
    ),
    k(
      "Syaratnya, lekukan hanya boleh berada di pojok, tanpa bagian yang menjorok keluar. Kalau ada, keliling bangun lebih panjang dari keliling bingkai.",
      bersih(0),
      tambah(0, judul("Syarat metode")),
      tambah("lekukan", bentuk("s1", 18, 44, 5.4, UK5, W.hijauMuda), bingkai("s1b", 18, 44, 5.4, 0, 0, 11, 12), emo("s1e", 48, 128, "✅", 22), teks("s1t", 48, 160, "lekukan di pojok", 8.4, W.hijau)),
      tambah("Kalau", bentuk("s2", 168, 44, 3.6, PENGAYAAN, W.merahMuda), bingkai("s2b", 168, 44, 3.6, 0, 0, 24, 20), emo("s2e", 210, 128, "❌", 22), teks("s2t", 210, 160, "ada yang menjorok", 8.4, W.merah)),
    ),
  ],
};

/* ------------------------------ 5. Bounding Rectangle: penerapan ------------------------------ */
const NOTCH: [number, number, number, number][] = [[-2, 8, 0, 12], [-2, 0, 0, 4], [6, 10, 10, 12], [6, 0, 10, 2]];
const notchSel = (id: string, i: number): Obj => {
  const [x1, y1, x2, y2] = NOTCH[i];
  const px = OX + (x1 + 2) * S;
  const py = OY + (12 - y2) * S;
  return kotak(id, px, py, (x2 - x1) * S, (y2 - y1) * S, W.merahMuda, W.merah, { rx: 0, tebal: 1, z: 2, op: 0.8 });
};
export const ADEGAN_LUAR_BR_TERAPAN: AdeganStory = {
  id: "luar-br-terapan",
  judul: "Bounding Rectangle pada denah, soal nomor 5, dan soal pengayaan",
  sumber: "Metode luar: Bounding Rectangle; Buku Siswa hlm. 126 dan 130",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Denah rumah: bingkainya persegi dua belas kali dua belas, dan keempat pojoknya terpotong. Maka keliling denah sama dengan keliling bingkai.",
      tambah(0, judul("Denah dan bingkainya")),
      tambah("Denah", ...ruang("bt"), tepi("btt", W.biru)),
      tambah("bingkainya", denahBingkai("btb", OX, OY, S, W.hijau, { z: 7 })),
      tambah("pojoknya", notchSel("n0", 0), notchSel("n1", 1), notchSel("n2", 2), notchSel("n3", 3)),
    ),
    k(
      "Empat kali dua belas sama dengan empat puluh delapan meter, tanpa mengukur empat belas sisi. Hasilnya cocok dengan Cara Asep.",
      tambah("Empat", baris("b1", 90, "4 × 12 = 48 m", 14, W.merah)),
      tambah("Hasilnya", emo("b2", PX, 124, "✅", 26), teks("b3", PX, 150, "sama dengan 14 sisi", 8.6, W.hijau)),
    ),
    k(
      "Soal nomor lima: bingkainya sebelas kali dua belas. Dua kali dua belas ditambah dua kali sebelas sama dengan empat puluh enam sentimeter.",
      bersih(0),
      tambah(0, judul("Soal nomor 5")),
      tambah("Soal", bentuk("e1", 24, 40, 11, UK5, W.hijauMuda), bingkai("e1b", 24, 40, 11, 0, 0, 11, 12)),
      tambah("sebelas", baris("e2", 90, "11 × 12", 11)),
      tambah("Dua", baris("e3", 116, "(2 × 12) + (2 × 11) = 46", 9)),
      tambah("empat", baris("e4", 140, "46 cm", 16, W.hijau)),
    ),
    k(
      "Soal pengayaan: bingkai dua puluh empat kali dua puluh memberi delapan puluh delapan meter. Tetapi gedung punya bagian menjorok, yaitu kaki tiga meter, jadi bingkai saja belum cukup.",
      bersih(0),
      tambah(0, judul("Pengayaan: gedung sekolah")),
      tambah("pengayaan", bentuk("p1", 14, 44, 6, PENGAYAAN, W.langit), bingkai("p1b", 14, 44, 6, 0, 0, 24, 20)),
      tambah("memberi", baris("p2", 66, "2 × (24 + 20) = 88", 9.6)),
      tambah("menjorok,", jalur("p3", 14 + 12 * 6, 44 + 17 * 6, "M0 0 L18 0 L18 18 L0 18 Z", W.merahMuda, W.merah, { tebal: 1.6, z: 6, op: 0.85 }), baris("p4", 90, "kaki menjorok: 3 m", 9.4, W.merah)),
    ),
    k(
      "Tambahkan dua kali tiga untuk bagian yang menjorok. Delapan puluh delapan ditambah enam sama dengan sembilan puluh empat meter, sama dengan kunci buku.",
      tambah("Tambahkan", baris("p5", 116, "88 + 2 × 3 = 94", 11)),
      tambah("sembilan", baris("p6", 140, "94 m", 18, W.hijau)),
    ),
  ],
};
