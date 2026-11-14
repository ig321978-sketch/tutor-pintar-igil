import type { AdeganStory, Obj } from "./logika-story";
import { W, emo, judul, kartu, teks, venn } from "./k5b2e-gambar";
import { bersih, k, tambah, ubah } from "./k5b2e-bantu";

/* ------------------------------ 6. LCM-GCF Bridge: konsep ------------------------------ */
export const ADEGAN_LUAR_LGB: AdeganStory = {
  id: "luar-lgb",
  judul: "LCM-GCF Bridge: jembatan KPK dan FPB",
  sumber: "Metode luar: LCM-GCF Bridge",
  latar: "#FFFBEB",
  ketukan: [
    k(
      "Metode ketiga, LCM-GCF Bridge, jembatan KPK dan FPB. Untuk dua bilangan, hasil kali KPK dan FPB sama dengan hasil kali kedua bilangan itu.",
      tambah(0, judul("LCM-GCF Bridge")),
      tambah("Metode", teks("b1", 150, 66, "KPK × FPB = a × b", 20, W.hijau)),
      tambah("Untuk", emo("b2", 150, 130, "🌉", 44)),
      tambah("kedua", teks("b3", 150, 176, "a dan b: dua bilangan", 10, W.biru)),
    ),
    k(
      "Contoh dari apersepsi: delapan belas dan dua puluh empat punya FPB enam dan KPK tujuh puluh dua. Enam kali tujuh puluh dua sama dengan empat ratus tiga puluh dua, sama dengan delapan belas kali dua puluh empat.",
      bersih(0),
      tambah(0, judul("Contoh: 18 dan 24")),
      tambah("Contoh", teks("c0", 150, 46, "FPB = 6 dan KPK = 72", 12, W.biru)),
      tambah("Enam@2", teks("c1", 150, 88, "6 × 72 = 432", 18, W.hijau)),
      tambah("delapan@2", teks("c2", 150, 130, "18 × 24 = 432", 18, W.hijau)),
      tambah(36, emo("c3", 150, 176, "✅", 24)),
    ),
    k(
      "Jadi kalau FPB sudah ada, KPK dicari dengan membagi hasil kali kedua bilangan dengan FPB. Begitu pula FPB dapat dicari dari KPK.",
      bersih(0),
      tambah(0, judul("Jembatan dua arah")),
      tambah("KPK", teks("d1", 150, 70, "KPK = (a × b) ÷ FPB", 17, W.hijau)),
      tambah("Begitu", teks("d2", 150, 124, "FPB = (a × b) ÷ KPK", 17, W.merah)),
    ),
    k(
      "Peringatan: jembatan ini hanya berlaku untuk dua bilangan. Untuk dua puluh empat, tiga puluh enam, dan enam puluh, FPB kali KPK tidak sama dengan hasil kali ketiganya.",
      bersih(0),
      tambah(0, judul("Hanya untuk dua bilangan")),
      tambah("Peringatan:", emo("w0", 150, 62, "⚠", 28)),
      tambah("dua@2", teks("w1", 150, 100, "FPB × KPK = 12 × 360 = 4.320", 13, W.biru)),
      tambah("hasil", teks("w2", 150, 128, "24 × 36 × 60 = 51.840", 13, W.biru)),
      tambah("tidak", teks("w3", 150, 160, "4.320 ≠ 51.840", 15, W.merah)),
    ),
  ],
};

/* ------------------------------ 7. LCM-GCF Bridge: penerapan ------------------------------ */
export const ADEGAN_LUAR_LGB_TERAPAN: AdeganStory = {
  id: "luar-lgb-terapan",
  judul: "LCM-GCF Bridge pada 72 dan 150, 45 dan 135, 96 dan 120, 36 dan 108",
  sumber: "Metode luar: LCM-GCF Bridge; Buku Siswa hlm. 57, 61",
  latar: "#FFFBEB",
  ketukan: [
    k(
      "Tujuh puluh dua dan seratus lima puluh punya FPB enam. Hasil kali kedua bilangan sepuluh ribu delapan ratus, dibagi enam, hasilnya KPK seribu delapan ratus.",
      tambah(0, judul("Jembatan: 72 dan 150")),
      tambah("FPB", teks("e0", 150, 50, "FPB = 6", 13, W.merah)),
      tambah("Hasil", teks("e1", 150, 94, "72 × 150 = 10.800", 17, W.biru)),
      tambah("dibagi", teks("e2", 150, 138, "10.800 ÷ 6 = 1.800", 17, W.hijau)),
      tambah("KPK", teks("e3", 150, 176, "KPK = 1.800", 13, W.hijau)),
    ),
    k(
      "Empat puluh lima dan seratus tiga puluh lima punya FPB empat puluh lima. Hasil kalinya enam ribu tujuh puluh lima, dibagi empat puluh lima, hasilnya KPK seratus tiga puluh lima.",
      bersih(0),
      tambah(0, judul("Jembatan: 45 dan 135")),
      tambah("FPB", teks("f0", 150, 50, "FPB = 45", 13, W.merah)),
      tambah("Hasil", teks("f1", 150, 94, "45 × 135 = 6.075", 17, W.biru)),
      tambah("dibagi", teks("f2", 150, 138, "6.075 ÷ 45 = 135", 17, W.hijau)),
      tambah("KPK", teks("f3", 150, 176, "KPK = 135", 13, W.hijau)),
    ),
    k(
      "Sembilan puluh enam dan seratus dua puluh punya FPB dua puluh empat. Hasil kalinya sebelas ribu lima ratus dua puluh, dibagi dua puluh empat, hasilnya KPK empat ratus delapan puluh.",
      bersih(0),
      tambah(0, judul("Jembatan: 96 dan 120")),
      tambah("FPB", teks("g0", 150, 50, "FPB = 24", 13, W.merah)),
      tambah("Hasil", teks("g1", 150, 94, "96 × 120 = 11.520", 17, W.biru)),
      tambah("dibagi", teks("g2", 150, 138, "11.520 ÷ 24 = 480", 17, W.hijau)),
      tambah("KPK", teks("g3", 150, 176, "KPK = 480", 13, W.hijau)),
    ),
    k(
      "Tiga puluh enam dan seratus delapan punya FPB tiga puluh enam. Hasil kalinya tiga ribu delapan ratus delapan puluh delapan, dibagi tiga puluh enam, KPK seratus delapan. Cocok dengan kunci Panduan Guru.",
      bersih(0),
      tambah(0, judul("Jembatan: 36 dan 108")),
      tambah("FPB", teks("h0", 150, 50, "FPB = 36", 13, W.merah)),
      tambah("Hasil", teks("h1", 150, 94, "36 × 108 = 3.888", 17, W.biru)),
      tambah("dibagi", teks("h2", 150, 138, "3.888 ÷ 36 = 108", 17, W.hijau)),
      tambah("Cocok", teks("h3", 150, 176, "KPK = 108", 13, W.hijau), emo("h4", 240, 176, "✅", 22)),
    ),
  ],
};

/* ------------------------------ 8. Prime Venn Diagram: konsep ------------------------------ */
export const VENN = { xa: 118, xb: 182, y: 100, r: 50 };
/** Kolom isi diagram: faktor hanya di kiri ("l"), di irisan ("t"), dan hanya di kanan ("r"). Id `${id}-l0`, `${id}-t0`, `${id}-r0`, dan seterusnya. */
const isi = (id: string, jenis: "l" | "t" | "r", daftar: number[], tata: [number, number][], warna: string = W.biru): Obj[] => daftar.map((n, i) => teks(`${id}-${jenis}${i}`, tata[i][0], tata[i][1], String(n), 12, warna));

export const ADEGAN_LUAR_PV: AdeganStory = {
  id: "luar-pv",
  judul: "Prime Venn Diagram: faktor prima di dua lingkaran",
  sumber: "Metode luar: Prime Venn Diagram",
  latar: "#FDF2F8",
  ketukan: [
    k(
      "Metode keempat, Prime Venn Diagram, menaruh faktor prima dua bilangan dalam dua lingkaran yang beririsan. Prima yang sama masuk irisan, prima yang tidak sama tinggal di sisi masing-masing.",
      tambah(0, judul("Prime Venn Diagram")),
      tambah(12, ...venn("v", VENN.xa, VENN.xb, VENN.y, VENN.r)),
      tambah(14, teks("va", 96, 44, "bilangan A", 9, W.biru), teks("vb", 204, 44, "bilangan B", 9, W.coklat)),
      tambah(17, teks("vt", 150, 104, "sama", 9, W.merah)),
      tambah(23, teks("vl", 90, 104, "hanya A", 9, W.biru), teks("vr", 212, 104, "hanya B", 9, W.coklat)),
    ),
    k(
      "FPB adalah hasil kali isi irisan saja, karena itulah faktor persekutuan terbesar.",
      ubah("irisan", { id: "vt", sorot: true }),
      tambah("FPB", ...kartu("kf", 10, 160, 134, 34, W.merahMuda, ["FPB = hasil kali", "isi irisan saja"], 8.4)),
    ),
    k(
      "KPK adalah hasil kali semua isi diagram, dan isi irisan hanya dihitung sekali.",
      ubah("KPK", { id: "vt", sorot: false }),
      tambah("KPK", ...kartu("kk", 156, 160, 134, 34, W.hijauMuda, ["KPK = hasil kali semua", "isi (irisan sekali)"], 8.4)),
      ubah("irisan", { id: "va", warna: W.hijau }, { id: "vb", warna: W.hijau }),
    ),
    k(
      "Kelebihannya: FPB dan KPK terlihat sekaligus, dan pasangan prima sulit terlewat. Kekurangannya: butuh gambar, dan untuk tiga bilangan diagramnya lebih rumit.",
      bersih(0),
      tambah(0, judul("Kelebihan dan kekurangan")),
      tambah("Kelebihannya:", ...kartu("kl", 14, 40, 130, 60, W.hijauMuda, ["FPB dan KPK", "terlihat sekaligus,", "pasangan sulit terlewat"], 8.6), emo("kle", 79, 126, "👍", 26)),
      tambah("Kekurangannya:", ...kartu("kj", 156, 40, 130, 60, W.merahMuda, ["butuh gambar,", "untuk tiga bilangan", "lebih rumit"], 8.6), emo("kke", 221, 126, "🤔", 26)),
    ),
  ],
};

/* ------------------------------ 9. Prime Venn Diagram: penerapan ------------------------------ */
/** Isi diagram untuk uji: tiap pasangan bilangan, faktor kiri saja, irisan, dan kanan saja. */
export const VENN_DATA = {
  v1: { a: 72, b: 150, l: [2, 2, 3], t: [2, 3], r: [5, 5] },
  v2: { a: 36, b: 108, l: [] as number[], t: [2, 2, 3, 3], r: [3] },
  v3: { a: 50, b: 105, l: [2, 5], t: [5], r: [3, 7] },
};
const KIRI3: [number, number][] = [[84, 104], [102, 104], [120, 104]];
const TENGAH2: [number, number][] = [[150, 92], [150, 114]];
const TENGAH4: [number, number][] = [[142, 92], [158, 92], [142, 114], [158, 114]];
const KANAN2: [number, number][] = [[192, 104], [210, 104]];

export const ADEGAN_LUAR_PV_TERAPAN: AdeganStory = {
  id: "luar-pv-terapan",
  judul: "Prime Venn Diagram pada 72 dan 150, 36 dan 108, 50 dan 105",
  sumber: "Metode luar: Prime Venn Diagram; Buku Siswa hlm. 56–57; Panduan Guru hlm. 82",
  latar: "#FDF2F8",
  ketukan: [
    k(
      "Tujuh puluh dua dan seratus lima puluh. Di irisan ada dua dan tiga. Di sisi kiri tersisa dua, dua, tiga, dan di sisi kanan lima, lima.",
      tambah(0, judul("Venn: 72 dan 150"), ...venn("v1", VENN.xa, VENN.xb, VENN.y, VENN.r), teks("v1-A", 96, 44, "72", 11, W.biru), teks("v1-B", 204, 44, "150", 11, W.coklat)),
      tambah(10, teks("v1-t0", TENGAH2[0][0], TENGAH2[0][1], "2", 12, W.merah)),
      tambah(12, teks("v1-t1", TENGAH2[1][0], TENGAH2[1][1], "3", 12, W.merah)),
      tambah(17, teks("v1-l0", KIRI3[0][0], KIRI3[0][1], "2", 12, W.biru)),
      tambah(18, teks("v1-l1", KIRI3[1][0], KIRI3[1][1], "2", 12, W.biru)),
      tambah(19, teks("v1-l2", KIRI3[2][0], KIRI3[2][1], "3", 12, W.biru)),
      tambah(24, teks("v1-r0", KANAN2[0][0], KANAN2[0][1], "5", 12, W.coklat)),
      tambah(25, teks("v1-r1", KANAN2[1][0], KANAN2[1][1], "5", 12, W.coklat)),
    ),
    k(
      "FPB: kalikan isi irisan, dua kali tiga sama dengan enam. KPK: kalikan semuanya, dua, tiga, dua, dua, tiga, lima, lima, yaitu seribu delapan ratus.",
      tambah("FPB:", teks("v1-fpb", 150, 172, "FPB = 2 × 3 = 6", 10, W.merah)),
      tambah("KPK:", teks("v1-kpk", 150, 190, "KPK = 2 × 3 × 2 × 2 × 3 × 5 × 5 = 1.800", 8.8, W.hijau)),
    ),
    k(
      "Soal tambahan Panduan Guru: tiga puluh enam dan seratus delapan. Irisan berisi dua, dua, tiga, tiga, dan sisi kanan hanya tersisa satu tiga. FPB tiga puluh enam, KPK seratus delapan.",
      bersih(0),
      tambah(0, judul("Venn: 36 dan 108"), ...venn("v2", VENN.xa, VENN.xb, VENN.y, VENN.r), teks("v2-A", 96, 44, "36", 11, W.biru), teks("v2-B", 204, 44, "108", 11, W.coklat), teks("v2-kosong", 90, 104, "kosong", 8.6, W.abu)),
      tambah("Irisan", ...isi("v2", "t", VENN_DATA.v2.t, TENGAH4, W.merah)),
      tambah("kanan", ...isi("v2", "r", VENN_DATA.v2.r, [[200, 104]], W.coklat)),
      tambah("FPB", teks("v2-fpb", 150, 172, "FPB = 2 × 2 × 3 × 3 = 36", 10, W.merah)),
      tambah("KPK", teks("v2-kpk", 150, 190, "KPK = 2 × 2 × 3 × 3 × 3 = 108", 9.6, W.hijau)),
    ),
    k(
      "Lima puluh dan seratus lima: irisan hanya lima. Sisi kiri tersisa dua dan lima, sisi kanan tiga dan tujuh. FPB lima, KPK seribu lima puluh.",
      bersih(0),
      tambah(0, judul("Venn: 50 dan 105"), ...venn("v3", VENN.xa, VENN.xb, VENN.y, VENN.r), teks("v3-A", 96, 44, "50", 11, W.biru), teks("v3-B", 204, 44, "105", 11, W.coklat)),
      tambah("irisan", ...isi("v3", "t", VENN_DATA.v3.t, [[150, 104]], W.merah)),
      tambah("kiri", ...isi("v3", "l", VENN_DATA.v3.l, [[96, 104], [114, 104]], W.biru)),
      tambah("kanan", ...isi("v3", "r", VENN_DATA.v3.r, KANAN2, W.coklat)),
      tambah("FPB", teks("v3-fpb", 150, 172, "FPB = 5", 10, W.merah)),
      tambah("KPK", teks("v3-kpk", 150, 190, "KPK = 5 × 2 × 5 × 3 × 7 = 1.050", 9.6, W.hijau)),
    ),
  ],
};

/* ------------------------------ 10. Ringkasan ------------------------------ */
export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan empat metode luar",
  sumber: "Ringkasan metode luar",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Ringkasannya: Factor Tree memecah bilangan sampai prima, Prime Exponent Rules menulis prima dengan pangkat, LCM-GCF Bridge menghubungkan KPK dan FPB, dan Prime Venn Diagram menampilkan keduanya sekaligus.",
      tambah(0, judul("Ringkasan empat metode")),
      tambah("Factor", ...kartu("r1", 14, 32, 272, 34, W.hijauMuda, ["Factor Tree: pecah sampai prima"], 9.2)),
      tambah("Prime@1", ...kartu("r2", 14, 74, 272, 34, W.langit, ["Prime Exponent Rules: prima dengan pangkat"], 9.2)),
      tambah("LCM-GCF", ...kartu("r3", 14, 116, 272, 34, W.krem, ["LCM-GCF Bridge: KPK dan FPB terhubung"], 9.2)),
      tambah("Prime@2", ...kartu("r4", 14, 158, 272, 34, W.pink, ["Prime Venn Diagram: keduanya sekaligus"], 9.2)),
    ),
    k(
      "Semuanya memakai gagasan buku yang sama: faktorisasi prima, pasangan prima ditulis sekali, dan prima yang tidak berpasangan tetap ikut di KPK.",
      bersih(0),
      tambah(0, judul("Gagasan yang sama dengan buku")),
      tambah("faktorisasi", ...kartu("s1", 20, 36, 260, 34, W.langit, ["1. faktorisasi prima"], 10)),
      tambah("pasangan", ...kartu("s2", 20, 82, 260, 34, W.hijauMuda, ["2. pasangan prima ditulis sekali"], 10)),
      tambah("tidak", ...kartu("s3", 20, 128, 260, 34, W.krem, ["3. prima tanpa pasangan ikut di KPK"], 10)),
    ),
    k(
      "Pilih sesuai soal: bilangan besar cocok dengan pangkat, bila FPB sudah diketahui pakai jembatan, dan untuk memahami konsep, diagram Venn paling jelas.",
      bersih(0),
      tambah(0, judul("Memilih metode")),
      tambah("besar", emo("t1", 40, 66, "🔢", 26), ...kartu("t2", 70, 44, 216, 36, W.langit, ["bilangan besar: pangkat"], 9.6)),
      tambah("jembatan,", emo("t3", 40, 116, "🌉", 26), ...kartu("t4", 70, 94, 216, 36, W.krem, ["FPB sudah ada: jembatan"], 9.6)),
      tambah("Venn", emo("t5", 40, 166, "⭕", 26), ...kartu("t6", 70, 144, 216, 36, W.pink, ["memahami konsep: diagram Venn"], 9.6)),
    ),
    k(
      "Apa pun metodenya, cek hasilnya: KPK harus habis dibagi kedua bilangan, dan kedua bilangan harus habis dibagi FPB.",
      bersih(0),
      tambah(0, judul("Cek hasil: 72 dan 150")),
      tambah("KPK", teks("z1", 150, 56, "1.800 ÷ 72 = 25", 15, W.hijau), teks("z2", 150, 86, "1.800 ÷ 150 = 12", 15, W.hijau)),
      tambah("kedua@2", teks("z3", 150, 126, "72 ÷ 6 = 12", 15, W.merah), teks("z4", 150, 156, "150 ÷ 6 = 25", 15, W.merah)),
    ),
  ],
};
