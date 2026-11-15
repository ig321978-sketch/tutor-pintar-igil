import type { AdeganStory, Obj } from "./logika-story";
import { W, bulat, deretBilangan, emo, judul, kartu, kelinci, kotak, teks } from "./k1b3c-gambar";
import { bersih, hapus, hitungMuncul, k, langkahDeret, rangkai, sorotkan, tambah, ubah, urutKata } from "./k1b3c-bantu";

export const NAMA_METODE = ["Mengambil", "Hitung Mundur", "Kurang di Bingkai"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [NAMA_METODE[i]], 9.6);

const ANAK = "\u{1F9D2}";
const x = (v: number): number => 33 + 26 * (v - 1);
const silang = (id: string, px: number, py: number): Obj => emo(id, px, py, "\u{274C}", 24);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara punya cara lain untuk mengajarkan hubungan penjumlahan dan pengurangan. Di video ini kita lihat tiga cara itu.";
const SUARA_O2 = "Cara pertama bernama Mengambil. Cara kedua bernama Hitung Mundur. Cara ketiga bernama Kurang di Bingkai.";
const SUARA_O3 = "Mengambil membuat kita melihat benda yang pergi. Hitung Mundur membuat kita melihat langkah mundur. Kurang di Bingkai membuat kita melihat titik yang dikosongkan.";
const SUARA_O4 = "Ketiganya membantu kita melihat bahwa pengurangan adalah kebalikan dari penjumlahan. Semuanya kita lakukan dengan mengetuk di layar.";
const SUARA_O5 = "Kita akan mencoba tiap cara bersama Upe, Kira, Malosi, dan Wei, seperti kamu mencobanya di layar.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk hubungan tambah dan kurang",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Tiga metode dari luar")), tambah("negara", emo("gl", 150, 110, "\u{1F30D}", 50)), tambah("tiga", ...kartu("pk", 50, 140, 200, 32, W.emas, ["3 metode dari luar"], 11))),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga metode")),
      ...NAMA_METODE.map((m, i) => tambah([("Mengambil."), "Mundur.", "Bingkai."][i], ...kartu(`m${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Apa yang kita lihat?")),
      tambah("benda", ...kartu("n0", 20, 40, 260, 38, W.hijauMuda, ["benda yang pergi"], 11), emo("e0", 40, 66, "\u{1F9FA}", 20)),
      tambah("langkah", ...kartu("n1", 20, 88, 260, 38, W.langit, ["langkah mundur"], 11), emo("e1", 40, 114, "\u{1F463}", 20)),
      tambah("titik", ...kartu("n2", 20, 136, 260, 38, W.pink, ["titik yang dikosongkan"], 11), emo("e2", 40, 162, "\u{1F51F}", 20)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Kebalikan")),
      tambah("pengurangan", emo("i1", 60, 90, "\u{2796}", 40)),
      tambah("kebalikan", emo("i2", 150, 90, "\u{2194}\u{FE0F}", 40)),
      tambah("penjumlahan.", emo("i3", 240, 90, "\u{2795}", 40)),
      tambah("mengetuk", ...kartu("iq", 40, 124, 220, 36, W.emas, ["ketuk di layar"], 11)),
    ),
    k(
      SUARA_O5,
      bersih(0),
      tambah(0, judul("Dicoba di layar")),
      ...[["Upe", 45], ["Kira", 115], ["Malosi", 185], ["Wei", 255]].map(([nama, px]) => tambah(nama as string, emo(`o-${nama}`, px as number, 110, ANAK, 34), teks(`on-${nama}`, px as number, 130, nama as string, 8.6))),
      tambah("layar.", ...kartu("ot", 40, 150, 220, 30, W.krem, ["ketuk, seret, dan pilih"], 10)),
    ),
  ],
};

/* ------------------------------ 2. Mengambil: konsep ------------------------------ */
const SUARA_M1 = "Cara pertama, Mengambil. Ada tujuh kelinci di kandang. Kita ketuk kelinci yang diambil.";
const SUARA_M2 = "Ketuk tiga kelinci hitam. Satu, dua, tiga. Tiga kelinci itu diambil dan pergi dari kandang.";
const SUARA_M3 = "Yang tersisa ada empat. Jadi tujuh kurang tiga sama dengan empat.";
const SUARA_M4 = "Sekarang kembalikan tiga kelinci tadi. Empat tambah tiga sama dengan tujuh. Pengurangan dan penjumlahan saling berkebalikan.";
const G7 = (i: number) => ({ x: 30 + 40 * i, y: 104 });
const SEMUA7 = [0, 1, 2, 3, 4, 5, 6];
const pudar = (daftar: number[], op: number) => daftar.flatMap((i) => [{ id: `kl${i}`, op }, { id: `kl${i}d`, op }]);

export const ADEGAN_LUAR_AMBIL: AdeganStory = {
  id: "luar-ambil",
  judul: "Mengambil: ketuk benda yang pergi",
  sumber: "Metode luar: Mengambil",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_M1, tambah("pertama,", ...kepala(0)), tambah(0, kotak("kd", 14, 70, 272, 64, "#FEF3C7", W.coklat, { rx: 8 })), tambah("tujuh", ...SEMUA7.flatMap((i) => kelinci(`kl${i}`, G7(i).x, G7(i).y, i >= 4)))),
    k(SUARA_M2, ...hitungMuncul(SUARA_M2, "xh", [4, 5, 6].map(G7), (i, p) => silang(`xh${i}`, p.x, p.y), "hitam.", false)),
    k(SUARA_M3, ubah(0, ...pudar([4, 5, 6], 0.3)), ...rangkai(SUARA_M3, "ma", 170, ["7", "−", "3", "=", "4"], ["tujuh", "kurang", "tiga", "sama", "empat."], "empat.")),
    k(SUARA_M4, hapus(0, "xh0", "xh1", "xh2", "ma0", "ma1", "ma2", "ma3", "ma4"), ubah(0, ...pudar([4, 5, 6], 1)), ...rangkai(SUARA_M4, "mb", 170, ["4", "+", "3", "=", "7"], ["Empat", "tambah", "tiga", "sama", "tujuh."], "tadi."), tambah("berkebalikan.", emo("ok", 262, 170, "\u{2705}", 24))),
  ],
};

/* ------------------------------ 3. Mengambil: terapan ------------------------------ */
const SUARA_T1 = "Soal cerita: ada empat kepik di atas daun. Satu kepik terbang pergi. Tinggal berapa kepik?";
const SUARA_T2 = "Ketuk satu kepik yang terbang. Kepik itu diambil dari daun. Tinggal tiga kepik.";
const SUARA_T3 = "Empat kurang satu sama dengan tiga. Jadi tinggal tiga kepik di daun.";
const SUARA_T4 = "Periksa dengan kebalikan. Kembalikan satu kepik. Tiga tambah satu sama dengan empat. Cocok!";
const KP = (i: number) => ({ x: 60 + 60 * i, y: 100 });

export const ADEGAN_LUAR_AMBIL_TERAPAN: AdeganStory = {
  id: "luar-ambil-terapan",
  judul: "Mengambil: kepik di atas daun",
  sumber: "Metode luar: Mengambil, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_T1, tambah(0, ...kepala(0), kotak("dn", 30, 66, 240, 60, "#BBF7D0", W.hijau, { rx: 20 })), tambah("empat", ...[0, 1, 2, 3].map((i) => emo(`kp${i}`, KP(i).x, KP(i).y, "\u{1F41E}", 26))), tambah("berapa", emo("tn", 268, 160, "\u{2753}", 26))),
    k(SUARA_T2, hapus(0, "tn"), tambah("satu", silang("xk", KP(3).x, KP(3).y)), ubah("diambil", { id: "kp3", op: 0.3 }), tambah("Tinggal", ...kartu("tt", 60, 140, 180, 26, W.krem, ["tinggal 3 kepik"], 10))),
    k(SUARA_T3, hapus(0, "tt-k", "tt-t0"), ...rangkai(SUARA_T3, "tu", 166, ["4", "−", "1", "=", "3"], ["Empat", "kurang", "satu", "sama", "tiga."])),
    k(SUARA_T4, hapus(0, "xk"), ubah(0, { id: "kp3", op: 1 }), hapus(0, "tu0", "tu1", "tu2", "tu3", "tu4"), ...rangkai(SUARA_T4, "tv", 166, ["3", "+", "1", "=", "4"], ["Tiga", "tambah", "satu", "sama", "empat."], "kepik."), tambah("Cocok!", emo("ok", 262, 166, "\u{2705}", 26))),
  ],
};

/* ------------------------------ 4. Hitung Mundur: konsep ------------------------------ */
const SUARA_D1 = "Cara kedua, Hitung Mundur. Kita mulai dari bilangan awal, lalu mundur di deretan bilangan.";
const SUARA_D2 = "Mulai dari delapan. Kurang tiga, kita mundur tiga langkah: tujuh, enam, lima.";
const SUARA_D3 = "Kita berhenti di lima. Jadi delapan kurang tiga sama dengan lima.";
const SUARA_D4 = "Sekarang maju tiga langkah dari lima: enam, tujuh, delapan. Kita kembali ke delapan. Lima tambah tiga sama dengan delapan.";

export const ADEGAN_LUAR_MUNDUR: AdeganStory = {
  id: "luar-mundur",
  judul: "Hitung Mundur: mundur di deretan bilangan",
  sumber: "Metode luar: Hitung Mundur",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_D1, tambah("kedua,", ...kepala(1)), tambah("awal,", ...kartu("dq", 60, 56, 180, 26, W.krem, ["8 − 3 = ?"], 13)), tambah("deretan", ...deretBilangan("du", 112), emo("up", x(8), 108, "\u{1F430}", 20)), sorotkan("deretan", "duk8")),
    k(SUARA_D2, ...langkahDeret(SUARA_D2, [7, 6, 5], "du", 112, "langkah:")),
    k(SUARA_D3, ubah("lima.", { id: "dq-t0", isi: "8 − 3 = 5" }), tambah("Jadi", emo("ok", 262, 66, "\u{2705}", 24))),
    k(SUARA_D4, hapus(0, "ok"), ubah("maju", { id: "dq-t0", isi: "5 + 3 = ?" }), ...langkahDeret(SUARA_D4, [6, 7, 8], "du", 112, "lima:"), ubah(13, { id: "dq-t0", isi: "5 + 3 = 8" })),
  ],
};

/* ------------------------------ 5. Hitung Mundur: terapan ------------------------------ */
const SUARA_E1 = "Soal cerita: Upe punya sembilan kelereng. Empat kelereng menggelinding pergi. Tinggal berapa kelereng?";
const SUARA_E2 = "Mulai dari sembilan. Mundur empat langkah: delapan, tujuh, enam, lima.";
const SUARA_E3 = "Kita berhenti di lima. Sembilan kurang empat sama dengan lima. Tinggal lima kelereng.";
const SUARA_E4 = "Periksa dengan kebalikan. Lima tambah empat sama dengan sembilan. Cocok!";
const WARNA_KEL = ["#38BDF8", "#F472B6", "#A3E635", "#FB923C", "#818CF8"];
const posE2 = urutKata(SUARA_E2, ["delapan", "tujuh", "enam", "lima"], "langkah:");

export const ADEGAN_LUAR_MUNDUR_TERAPAN: AdeganStory = {
  id: "luar-mundur-terapan",
  judul: "Hitung Mundur: kelereng Upe",
  sumber: "Metode luar: Hitung Mundur, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_E1,
      tambah(0, ...kepala(1), ...deretBilangan("eu", 112), emo("up", x(9), 108, "\u{1F430}", 20)),
      tambah("sembilan", ...Array.from({ length: 9 }, (_, i) => bulat(`el${i}`, 30 + 30 * i, 80, 9, WARNA_KEL[i % 5]))),
      tambah("berapa", emo("tn", 268, 160, "\u{2753}", 26)),
    ),
    k(
      SUARA_E2,
      hapus(0, "tn"),
      sorotkan("Mulai", "euk9"),
      ...[8, 7, 6, 5].flatMap((v, i) => [ubah(posE2[i], { id: `el${v}`, op: 0.25 }, { id: "up", x: x(v), y: 108 }), sorotkan(posE2[i], `euk${v}`)]),
    ),
    k(SUARA_E3, tambah("Sembilan", ...kartu("et", 40, 144, 220, 26, W.krem, ["9 − 4 = 5"], 13)), tambah("Tinggal", emo("ok", 262, 156, "\u{2705}", 24))),
    k(SUARA_E4, hapus(0, "et-k", "et-t0"), ubah(0, ...[5, 6, 7, 8].map((i) => ({ id: `el${i}`, op: 1 }))), ...rangkai(SUARA_E4, "ev", 160, ["5", "+", "4", "=", "9"], ["Lima", "tambah", "empat", "sama", "sembilan."], "kebalikan.")),
  ],
};
