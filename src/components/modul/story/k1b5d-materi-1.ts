import type { AdeganStory, Aksi } from "./logika-story";
import { W, batang, emo, garis, judul, kartu, kelereng, teks, bulat, baris, type Titik } from "./k1b5d-gambar";
import { bersih, hapus, hitungMuncul, idx, k, pasangAksi, penghitung, redamkan, sorotkan, tambah, ubah, urutBil } from "./k1b5d-bantu";

const ANAK = "\u{1F9D2}";
const IGIL = "\u{1F989}";
const TANAH = () => garis("tanah", 14, 152, 272, 0, W.hijau, 3);
const TEMAN: [string, number, string][] = [["Malosi", 28, "Malosi,"], ["Kira", 74, "Kira,"], ["Upe", 120, "Upe,"], ["Wei", 166, "Wei,"], ["Halim", 212, "Halim"]];

/* ------------------------------ 1. Cerita kelereng Halim dan Upe ------------------------------ */
const SUARA_C1 = "Pagi ini Malosi, Kira, Upe, Wei, dan Halim ada di taman. Igil, si burung hantu, ikut melihat. Halim dan Upe punya kelereng.";
const SUARA_C2 = "Pertama, kelereng Halim. Kita hitung pelan-pelan: satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh, sebelas, dua belas, tiga belas, empat belas, lima belas. Halim punya lima belas kelereng.";
const SUARA_C3 = "Sekarang kelereng Upe. Kita hitung pelan-pelan juga: satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh, sebelas. Upe punya sebelas kelereng.";
const SUARA_C4 = "Kelereng siapa yang lebih banyak? Kelereng siapa yang lebih sedikit? Kita lihat bilangannya. Lima belas lebih besar dari sebelas.";
const SUARA_C5 = "Jadi kelereng Halim lebih banyak dari kelereng Upe. Dan kelereng Upe lebih sedikit dari kelereng Halim.";
const SUARA_C6 = "Ingat, ya. Hitung dulu satu per satu. Lalu bandingkan bilangannya. Bilangan yang lebih besar berarti lebih banyak.";
const HAL: Titik[] = baris(15, 76, 24, 18);
const UPE: Titik[] = baris(11, 138, 24, 18);

export const ADEGAN_CERITA: AdeganStory = {
  id: "cerita-kelereng",
  judul: "Kelereng Halim dan Upe",
  sumber: "Materi: cerita kelereng Halim dan Upe",
  latar: "#ECFCCB",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Di taman"), TANAH()),
      ...TEMAN.map(([nama, x, pemicu]) => tambah(pemicu, emo(`a-${nama}`, x, 184, ANAK, 26), teks(`n-${nama}`, x, 197, nama, 8.4))),
      tambah("Igil,", emo("a-Igil", 266, 184, IGIL, 26), teks("n-Igil", 266, 197, "Igil", 8.4, W.ungu)),
      tambah("kelereng.", kelereng("ke0", 90, 120, 9, 0), kelereng("ke1", 150, 110, 9, 1), kelereng("ke2", 210, 120, 9, 2)),
    ),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Kelereng Halim dan Upe"), teks("nh", 150, 46, "Halim", 10, W.ungu)),
      ...hitungMuncul(SUARA_C2, "h", HAL, (i, p) => kelereng(`h${i}`, p.x, p.y, 7, i), "pelanpelan"),
      tambah(idx(SUARA_C2, "kelereng", 2), teks("th", 150, 46, "Halim: 15 kelereng", 10, W.merah)),
      hapus(idx(SUARA_C2, "kelereng", 2), "nh"),
    ),
    k(
      SUARA_C3,
      tambah(0, teks("nu", 150, 108, "Upe", 10, W.ungu)),
      ...hitungMuncul(SUARA_C3, "u", UPE, (i, p) => kelereng(`u${i}`, p.x, p.y, 7, i + 2), "juga"),
      tambah(idx(SUARA_C3, "kelereng", 2), teks("tu", 150, 108, "Upe: 11 kelereng", 10, W.merah)),
      hapus(idx(SUARA_C3, "kelereng", 2), "nu"),
    ),
    k(
      SUARA_C4,
      tambah("banyak?", emo("t1", 275, 46, "\u{1F914}", 22)),
      tambah("bilangannya.", ...kartu("bd", 50, 164, 200, 28, W.krem, ["15 lebih besar dari 11"], 10)),
      sorotkan(idx(SUARA_C4, "belas"), "th"),
    ),
    k(
      SUARA_C5,
      hapus(0, "t1"),
      redamkan(0, "th"),
      sorotkan("banyak", ...HAL.map((_, i) => `h${i}`)),
      tambah("banyak", ...kartu("cb", 14, 164, 134, 28, W.hijauMuda, ["Halim: lebih banyak"], 9.4)),
      tambah("sedikit", ...kartu("cs", 152, 164, 134, 28, W.langit, ["Upe: lebih sedikit"], 9.4)),
      hapus("sedikit", "bd-k", "bd-t0"),
    ),
    k(
      SUARA_C6,
      bersih(0),
      tambah(0, judul("Ingat, ya")),
      tambah("Hitung", ...kartu("g1", 20, 40, 260, 34, W.hijauMuda, ["1. Hitung dulu satu per satu"], 10)),
      tambah("bandingkan", ...kartu("g2", 20, 84, 260, 34, W.langit, ["2. Bandingkan bilangannya"], 10)),
      tambah("besar", ...kartu("g3", 20, 128, 260, 34, W.emas, ["3. Yang besar, lebih banyak"], 10)),
    ),
  ],
};

/* ------------------------------ 2. Jangan menebak: tersebar dan rapat ------------------------------ */
const SUARA_H1 = "Hati-hati! Kumpulan yang tersebar bisa kelihatan lebih banyak. Lihat dua kumpulan kelereng ini. Kumpulan merah muda tersebar, kumpulan biru rapat.";
const SUARA_H2 = "Menurutmu, mana yang lebih banyak? Jangan menebak dari kelihatannya saja. Kita hitung dulu satu per satu.";
const SUARA_H3 = "Hitung kumpulan yang tersebar: satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh, sebelas, dua belas. Ada dua belas.";
const SUARA_H4 = "Sekarang hitung kumpulan yang rapat: satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh, sebelas, dua belas. Ada dua belas juga.";
const SUARA_H5 = "Dua belas dan dua belas. Dua kumpulan ini sama banyak, walaupun yang satu tersebar dan yang lain rapat.";
const SEBAR: Titik[] = [...baris(6, 66, 36, 44), ...baris(6, 94, 36, 44)];
const RAPAT: Titik[] = [...baris(6, 148, 112, 15), ...baris(6, 176, 112, 15)];
const PINK = "#F472B6";
const BIRU_M = "#38BDF8";

export const ADEGAN_KATA_TELITI: AdeganStory = {
  id: "jangan-menebak",
  judul: "Jangan menebak, hitung dulu",
  sumber: "Materi: hitung teliti, jangan menebak",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Jangan menebak!")),
      tambah("tersebar@2", ...SEBAR.map((p, i) => kelereng(`as${i}`, p.x, p.y, 7, 1, { warna: PINK })), teks("ta", 150, 42, "tersebar", 9.4, W.ungu)),
      tambah("biru", ...RAPAT.map((p, i) => kelereng(`br${i}`, p.x, p.y, 7, 0, { warna: BIRU_M })), teks("tb", 150, 122, "rapat", 9.4, W.ungu)),
    ),
    k(SUARA_H2, tambah("Menurutmu,", emo("q1", 40, 118, "\u{1F914}", 24)), tambah("menebak", ...kartu("mq", 200, 120, 90, 22, W.krem, ["tebakan saja"], 9))),
    k(
      SUARA_H3,
      hapus(0, "q1", "mq-k", "mq-t0"),
      ...hitungMuncul(SUARA_H3, "an", SEBAR, () => [], "tersebar", true, 1, 12),
      ubah(idx(SUARA_H3, "belas", 2), { id: "ta", isi: "tersebar: 12", warna: W.merah }),
    ),
    k(SUARA_H4, ...hitungMuncul(SUARA_H4, "bn", RAPAT, () => [], "rapat", true, 1, 11), ubah(idx(SUARA_H4, "belas", 2), { id: "tb", isi: "rapat: 12", warna: W.merah })),
    k(SUARA_H5, tambah("sama", ...kartu("sm", 206, 146, 84, 36, W.hijauMuda, ["sama", "banyak"], 10)), tambah("banyak,", emo("ok", 60, 168, "✅", 26))),
  ],
};

/* ------------------------------ 3. Memasangkan satu-satu ------------------------------ */
const SUARA_P1 = "Ada cara lain untuk membandingkan, yaitu memasangkan satu-satu. Di layar ada titik merah dan titik biru.";
const SUARA_P2 = "Ketuk satu titik merah, lalu satu titik biru. Mereka jadi pasangan. Kita pasangkan satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh, sebelas.";
const SUARA_P3 = "Lihat! Titik biru sudah habis, tetapi titik merah masih punya sisa. Kita hitung sisanya: satu, dua, tiga.";
const SUARA_P4 = "Titik merah punya sisa tiga. Jadi titik merah lebih banyak tiga daripada titik biru. Titik biru lebih sedikit.";
const SUARA_P5 = "Kita periksa dengan angka. Titik merah ada empat belas. Titik biru ada sebelas. Empat belas lebih banyak dari sebelas. Lebihnya tiga.";
const MERAH: Titik[] = baris(14, 72, 22, 19.5);
const BIRUP: Titik[] = baris(11, 122, 22, 19.5);
const sorotPasang = (suara: string): Aksi[] => urutBil(suara, 1, 11, "pasangkan").flatMap((p, i) => [ubah(p, { id: `pm${i}`, sorot: true }, { id: `pb${i}`, sorot: true })]);

export const ADEGAN_PASANGKAN: AdeganStory = {
  id: "pasangkan",
  judul: "Memasangkan satu-satu",
  sumber: "Materi: memasangkan satu-satu",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Pasangkan satu-satu")),
      tambah("merah", ...MERAH.map((p, i) => bulat(`pm${i}`, p.x, p.y, 7, W.merah, W.biru))),
      tambah("biru", ...BIRUP.map((p, i) => bulat(`pb${i}`, p.x, p.y, 7, "#38BDF8", W.biru))),
    ),
    k(SUARA_P2, ...pasangAksi(SUARA_P2, "pp", MERAH, BIRUP, 11, "pasangkan"), ...sorotPasang(SUARA_P2), ...penghitung(SUARA_P2, "pct", 150, 168, 1, 11, "pasangkan"), tambah("Ketuk", emo("tg", 40, 160,"\u{1F446}", 26))),
    k(
      SUARA_P3,
      hapus(0, "tg", "pct"),
      sorotkan("sisa.", "pm11", "pm12", "pm13"),
      ...hitungMuncul(SUARA_P3, "ps", MERAH.slice(11), () => [], "sisanya", true, 1, 13, 9),
    ),
    k(SUARA_P4, tambah("sisa", ...kartu("pk", 40, 150, 220, 30, W.emas, ["merah lebih banyak 3"], 10.4)), tambah("sedikit.", emo("pt", 150, 192, "\u{1F535}", 14))),
    k(SUARA_P5, hapus(0, "pk-k", "pk-t0", "pt"), tambah("Empat", ...kartu("pn", 30, 150, 240, 30, W.krem, ["14 lebih banyak dari 11"], 10.4)), tambah("Lebihnya", teks("pl", 150, 196, "lebihnya 3", 10, W.merah))),
  ],
};

/* ------------------------------ 4. Kata pembanding ------------------------------ */
const SUARA_K1 = "Ada tiga kata untuk membandingkan dua kumpulan. Lebih banyak, lebih sedikit, dan sama banyak.";
const SUARA_K2 = "Lebih banyak. Lima belas kelereng lebih banyak dari sebelas kelereng. Itu kumpulan yang bilangannya lebih besar.";
const SUARA_K3 = "Lebih sedikit. Sebelas kelereng lebih sedikit dari lima belas kelereng. Itu kumpulan yang bilangannya lebih kecil.";
const SUARA_K4 = "Sama banyak. Dua belas kelereng dan dua belas kelereng sama banyak. Kalau dipasangkan, tidak ada sisa.";
const SUARA_K5 = "Jadi, lebih banyak, lebih sedikit, dan sama banyak. Tiga kata ini kita pakai untuk membandingkan dua kumpulan.";
const KARTU_KATA = (i: number, isi: string, warna: string) => kartu(`kw${i}`, 14, 28 + i * 30, 272, 24, warna, [isi], 10);
const BAR = (a: number, b: number, wa: string, wb: string) => [
  batang("ba", 14, 128, a, wa),
  teks("bat", 206 + (a - 15) * 12, 141, `${a} kelereng`, 9, W.merah, { anchor: "start" }),
  batang("bb", 14, 154, b, wb),
  teks("bbt", 158 + (b - 11) * 12, 167, `${b} kelereng`, 9, W.merah, { anchor: "start" }),
];

export const ADEGAN_KATA: AdeganStory = {
  id: "kata-pembanding",
  judul: "Kata untuk membandingkan",
  sumber: "Materi: kata untuk membandingkan",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Kata pembanding")),
      tambah(idx(SUARA_K1, "Lebih", 1), ...KARTU_KATA(0, "lebih banyak", W.hijauMuda)),
      tambah(idx(SUARA_K1, "lebih", 2), ...KARTU_KATA(1, "lebih sedikit", W.langit)),
      tambah(idx(SUARA_K1, "sama"), ...KARTU_KATA(2, "sama banyak", W.pink)),
    ),
    k(SUARA_K2, sorotkan(0, "kw0-k"), tambah("Lima", ...BAR(15, 11, "#4ADE80", "#CBD5E1"))),
    k(SUARA_K3, redamkan(0, "kw0-k"), sorotkan(0, "kw1-k"), ubah("Sebelas", { id: "ba", warna: "#CBD5E1" }, { id: "bb", warna: "#60A5FA" })),
    k(SUARA_K4, redamkan(0, "kw1-k"), sorotkan(0, "kw2-k"), hapus(0, "ba", "bat", "bb", "bbt"), tambah("Dua", ...BAR(12, 12, "#F472B6", "#F472B6").map((o) => (o.id === "bat" ? { ...o, x: 14 + 12 * 12 + 8, isi: "12 kelereng" } : o.id === "bbt" ? { ...o, x: 14 + 12 * 12 + 8, isi: "12 kelereng" } : o))), tambah("sisa.", emo("ok", 262, 100, "✅", 22))),
    k(SUARA_K5, hapus(0, "ok"), sorotkan(0, "kw0-k", "kw1-k", "kw2-k"), tambah("Tiga", emo("ig", 262, 100, IGIL, 30))),
  ],
};
