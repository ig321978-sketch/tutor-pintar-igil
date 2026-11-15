import type { AdeganStory, Obj } from "./logika-story";
import { W, bulat, deretBilangan, emo, garis, judul, kartu, kelinci, teks } from "./k1b3c-gambar";
import { bersih, hapus, hitungMuncul, k, langkahDeret, rangkai, redamkan, sorotkan, tambah, ubah } from "./k1b3c-bantu";

const ANAK = "\u{1F9D2}";
const IGIL = "\u{1F989}";
const x = (v: number): number => 33 + 26 * (v - 1);

/* ------------------------------ 1. Kebalikan: maju dan mundur ------------------------------ */
const SUARA_B1 = "Penjumlahan dan pengurangan adalah kebalikan. Penjumlahan membuat kita maju. Pengurangan membuat kita mundur.";
const SUARA_B2 = "Mulai dari tiga. Tambah empat, kita maju empat langkah: empat, lima, enam, tujuh.";
const SUARA_B3 = "Kita berhenti di tujuh. Jadi tiga tambah empat sama dengan tujuh.";
const SUARA_B4 = "Sekarang dari tujuh, kita mundur empat langkah: enam, lima, empat, tiga.";
const SUARA_B5 = "Kita pulang ke tiga, tempat kita mulai tadi. Pengurangan mengantar kita pulang. Penjumlahan dan pengurangan saling berkebalikan.";

export const ADEGAN_KEBALIKAN: AdeganStory = {
  id: "kebalikan",
  judul: "Kebalikan: maju dan mundur",
  sumber: "Materi: kebalikan, maju dan mundur",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_B1,
      bersih(0),
      tambah(0, judul("Maju dan mundur")),
      tambah("Penjumlahan@2", ...kartu("ma", 14, 40, 132, 34, W.hijauMuda, ["tambah: maju"], 10)),
      tambah("maju.", emo("pm", 80, 118, "\u{27A1}\u{FE0F}", 34)),
      tambah("Pengurangan@2", ...kartu("mu", 154, 40, 132, 34, W.pink, ["kurang: mundur"], 10)),
      tambah("mundur.", emo("pn", 220, 118, "\u{2B05}\u{FE0F}", 34)),
    ),
    k(
      SUARA_B2,
      bersih(0),
      tambah(0, judul("Tiga tambah empat"), ...kartu("bq", 60, 36, 180, 26, W.krem, ["3 + 4 = ?"], 13), ...deretBilangan("ba", 112), emo("up", x(3), 108, "\u{1F430}", 20)),
      sorotkan("Mulai", "bak3"),
      ...langkahDeret(SUARA_B2, [4, 5, 6, 7], "ba", 112, "langkah:"),
    ),
    k(SUARA_B3, ubah("tujuh.", { id: "bq-t0", isi: "3 + 4 = 7" }), tambah("Jadi", emo("ok", 262, 56, "\u{2705}", 24))),
    k(SUARA_B4, redamkan(0, "bak7"), ubah("mundur", { id: "bq-t0", isi: "7 − 4 = ?" }), hapus("mundur", "ok"), ...langkahDeret(SUARA_B4, [6, 5, 4, 3], "ba", 112, "langkah:")),
    k(SUARA_B5, ubah("pulang", { id: "bq-t0", isi: "7 − 4 = 3" }), tambah("tempat", emo("ok", 262, 56, "\u{2705}", 24)), tambah("Penjumlahan", emo("kb", 150, 170, "\u{2194}\u{FE0F}", 30))),
  ],
};

/* ------------------------------ 2. Keluarga lain: kaos di tali ------------------------------ */
const SUARA_J1 = "Ibu menjemur kaos di tali. Ada tiga kaos kuning dan dua kaos merah muda.";
const SUARA_J2 = "Tiga ditambah dua sama dengan lima. Dua ditambah tiga juga sama dengan lima.";
const SUARA_J3 = "Sekarang ketuk dua kaos merah muda supaya diambil. Satu, dua. Tinggal tiga kaos kuning.";
const SUARA_J4 = "Lima kurang dua sama dengan tiga. Itu kalimat pengurangan yang pertama.";
const SUARA_J5 = "Sekarang ketuk tiga kaos kuning supaya diambil. Satu, dua, tiga. Tinggal dua kaos. Lima kurang tiga sama dengan dua.";
const kaos = (id: string, px: number, py: number, warna: string, o: Partial<Obj> = {}): Obj[] => [emo(id, px, py, "\u{1F455}", 24, o), bulat(`${id}d`, px, py + 10, 4.5, warna, undefined, o)];
const KUNING = [0, 1, 2].map((i) => ({ x: 60 + 40 * i, y: 94 }));
const MUDA = [0, 1].map((i) => ({ x: 180 + 40 * i, y: 94 }));

export const ADEGAN_KAOS: AdeganStory = {
  id: "kaos-jemuran",
  judul: "Keluarga lain: tiga, dua, lima",
  sumber: "Materi: kaos di tali jemuran",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_J1,
      bersih(0),
      tambah(0, judul("Kaos di tali jemuran")),
      tambah("tali.", garis("tl", 30, 68, 240, 0, W.coklat, 2)),
      tambah("kuning", ...KUNING.flatMap((p, i) => kaos(`ky${i}`, p.x, p.y, "#FACC15"))),
      tambah("muda.", ...MUDA.flatMap((p, i) => kaos(`km${i}`, p.x, p.y, "#F472B6"))),
    ),
    k(
      SUARA_J2,
      ...rangkai(SUARA_J2, "ka", 142, ["3", "+", "2", "=", "5"], ["Tiga", "ditambah", "dua", "sama", "lima."]),
      ...rangkai(SUARA_J2, "kb", 174, ["2", "+", "3", "=", "5"], ["Dua", "ditambah", "tiga", "sama", "lima."], "lima"),
    ),
    k(
      SUARA_J3,
      hapus(0, ...["ka", "kb"].flatMap((p) => [0, 1, 2, 3, 4].map((i) => `${p}${i}`))),
      ...hitungMuncul(SUARA_J3, "xp", MUDA, (i, p) => emo(`xp${i}`, p.x, p.y, "\u{274C}", 24), "diambil.", false),
      tambah("Tinggal", ...kartu("kt", 60, 130, 180, 26, W.krem, ["tinggal 3 kaos kuning"], 10)),
    ),
    k(
      SUARA_J4,
      hapus(0, "kt-k", "kt-t0"),
      ubah(0, ...[0, 1].flatMap((i) => [{ id: `km${i}`, op: 0.3 }, { id: `km${i}d`, op: 0.3 }])),
      ...rangkai(SUARA_J4, "kc", 160, ["5", "−", "2", "=", "3"], ["Lima", "kurang", "dua", "sama", "tiga."]),
    ),
    k(
      SUARA_J5,
      hapus(0, "xp0", "xp1", "kc0", "kc1", "kc2", "kc3", "kc4"),
      ubah(0, ...[0, 1].flatMap((i) => [{ id: `km${i}`, op: 1 }, { id: `km${i}d`, op: 1 }])),
      ...hitungMuncul(SUARA_J5, "xk", KUNING, (i, p) => emo(`xk${i}`, p.x, p.y, "\u{274C}", 24), "diambil.", false),
      ...rangkai(SUARA_J5, "kd", 160, ["5", "−", "3", "=", "2"], ["Lima", "kurang", "tiga", "sama", "dua."], "Tinggal"),
    ),
  ],
};

/* ------------------------------ 3. Tukar tempat: hanya untuk penjumlahan ------------------------------ */
const SUARA_X1 = "Penjumlahan boleh bertukar tempat. Empat ditambah tiga sama dengan tiga ditambah empat. Hasilnya sama-sama tujuh.";
const SUARA_X2 = "Pengurangan tidak boleh bertukar tempat. Tujuh kurang tiga sama dengan empat.";
const SUARA_X3 = "Tiga kelinci tidak bisa diambil tujuh. Kelinci tidak cukup! Jadi pengurangan tidak bisa bertukar tempat.";
const SUARA_X4 = "Jadi ingat, penjumlahan boleh bertukar. Pengurangan tidak boleh bertukar. Mulailah pengurangan dari bilangan yang paling besar.";

export const ADEGAN_TUKAR: AdeganStory = {
  id: "tukar-tempat",
  judul: "Tukar tempat: hanya penjumlahan",
  sumber: "Materi: tukar tempat",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_X1,
      bersih(0),
      tambah(0, judul("Boleh bertukar tempat?")),
      tambah("sama", ...kartu("tk1", 14, 40, 110, 36, W.hijauMuda, ["4 + 3 = 7"], 13)),
      tambah("tiga@2", emo("tkp", 150, 66, "\u{2194}\u{FE0F}", 28)),
      tambah("tujuh.", ...kartu("tk2", 176, 40, 110, 36, W.hijauMuda, ["3 + 4 = 7"], 13)),
    ),
    k(SUARA_X2, tambah("Tujuh", ...kartu("tk3", 60, 100, 180, 36, W.pink, ["7 − 3 = 4"], 13)), tambah("tidak", emo("tx", 262, 128, "\u{274C}", 24))),
    k(
      SUARA_X3,
      tambah("Tiga", ...[0, 1, 2].flatMap((i) => kelinci(`tr${i}`, 90 + 30 * i, 178, false))),
      tambah("cukup!", ...kartu("tc", 190, 160, 100, 26, W.merahMuda, ["tidak cukup!"], 9.4)),
    ),
    k(
      SUARA_X4,
      bersih(0),
      tambah(0, judul("Ingat!")),
      tambah("penjumlahan", ...kartu("g1", 20, 44, 260, 36, W.hijauMuda, ["tambah: boleh bertukar"], 10.4)),
      tambah("Pengurangan", ...kartu("g2", 20, 96, 260, 36, W.pink, ["kurang: tidak boleh bertukar"], 10.4)),
      tambah("Mulailah", emo("ow", 150, 182, IGIL, 28)),
    ),
  ],
};

/* ------------------------------ 4. Memeriksa pengurangan dengan penjumlahan ------------------------------ */
const SUARA_P1 = "Kira mengerjakan satu soal. Sembilan kurang empat sama dengan lima. Benarkah jawaban Kira?";
const SUARA_P2 = "Mari periksa dengan penjumlahan. Mulai dari hasilnya, yaitu lima. Lalu tambahkan bilangan yang diambil, yaitu empat.";
const SUARA_P3 = "Lima ditambah empat sama dengan sembilan. Hasilnya kembali ke bilangan awal.";
const SUARA_P4 = "Cocok! Berarti jawaban Kira benar. Penjumlahan membantu kita memeriksa pengurangan.";

export const ADEGAN_PERIKSA_KURANG: AdeganStory = {
  id: "periksa-kurang",
  judul: "Memeriksa pengurangan",
  sumber: "Materi: memeriksa pengurangan",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_P1,
      bersih(0),
      tambah(0, judul("Periksa pengurangan"), emo("kr", 40, 66, ANAK, 26)),
      ...rangkai(SUARA_P1, "pa", 76, ["9", "−", "4", "=", "5"], ["Sembilan", "kurang", "empat", "sama", "lima."], "soal."),
      tambah("Benarkah", emo("tn", 262, 76, "\u{2753}", 26)),
    ),
    k(
      SUARA_P2,
      tambah("lima.", ...kartu("pm", 20, 104, 110, 28, W.krem, ["mulai: 5"], 10)),
      tambah("empat.", ...kartu("pn", 170, 104, 110, 28, W.hijauMuda, ["tambah: 4"], 10)),
    ),
    k(SUARA_P3, ...rangkai(SUARA_P3, "pb", 166, ["5", "+", "4", "=", "9"], ["Lima", "ditambah", "empat", "sama", "sembilan."])),
    k(SUARA_P4, hapus("Cocok!", "tn"), tambah("Cocok!", emo("ok", 262, 166, "\u{2705}", 28)), tambah("Berarti", emo("ow", 40, 166, IGIL, 26))),
  ],
};

/* ------------------------------ 5. Memeriksa penjumlahan dengan pengurangan ------------------------------ */
const SUARA_Q1 = "Sekarang Upe mengerjakan penjumlahan. Tiga ditambah lima sama dengan delapan. Benarkah jawaban Upe?";
const SUARA_Q2 = "Kita periksa dengan pengurangan. Mulai dari delapan, lalu ambil lima. Delapan kurang lima sama dengan tiga.";
const SUARA_Q3 = "Hasilnya tiga, sama dengan bilangan pertama tadi. Cocok! Jawaban Upe benar.";
const SUARA_Q4 = "Kita bisa memeriksa dengan cara lain. Delapan kurang tiga sama dengan lima. Hasilnya sama dengan bilangan kedua.";

export const ADEGAN_PERIKSA_TAMBAH: AdeganStory = {
  id: "periksa-tambah",
  judul: "Memeriksa penjumlahan",
  sumber: "Materi: memeriksa penjumlahan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_Q1,
      bersih(0),
      tambah(0, judul("Periksa penjumlahan"), emo("up", 40, 66, ANAK, 26)),
      ...rangkai(SUARA_Q1, "ua", 76, ["3", "+", "5", "=", "8"], ["Tiga", "ditambah", "lima", "sama", "delapan."], "penjumlahan."),
      tambah("Benarkah", emo("tn", 262, 76, "\u{2753}", 26)),
    ),
    k(SUARA_Q2, ...rangkai(SUARA_Q2, "ub", 120, ["8", "−", "5", "=", "3"], ["Delapan", "kurang", "lima", "sama", "tiga."], "ambil")),
    k(SUARA_Q3, sorotkan("Hasilnya", "ua0"), sorotkan("tiga,", "ub4"), hapus("Cocok!", "tn"), tambah("Cocok!", emo("ok", 262, 120, "\u{2705}", 28))),
    k(SUARA_Q4, ...rangkai(SUARA_Q4, "uc", 164, ["8", "−", "3", "=", "5"], ["Delapan", "kurang", "tiga", "sama", "lima."], "lain."), sorotkan("kedua.", "ua2")),
  ],
};

/* ------------------------------ 6. Mencari bilangan yang hilang ------------------------------ */
const SUARA_H1 = "Wei melihat papan soal di layar. Ada soal: enam ditambah berapa sama dengan sembilan.";
const SUARA_H2 = "Wei berpikir: pengurangan adalah kebalikan dari penjumlahan. Jadi Wei menghitung sembilan kurang enam.";
const SUARA_H3 = "Sembilan kurang enam sama dengan tiga. Jadi angka yang hilang adalah tiga.";
const SUARA_H4 = "Wei memeriksa. Enam ditambah tiga sama dengan sembilan. Cocok! Angka yang hilang memang tiga.";
const SUARA_H5 = "Sekarang soal yang lain: berapa kurang lima sama dengan dua? Pakai kebalikan, dua tambah lima sama dengan tujuh.";
const SUARA_H6 = "Jadi, untuk mencari angka yang hilang, balik dulu kalimatnya. Tambah menjadi kurang, dan kurang menjadi tambah.";

export const ADEGAN_HILANG: AdeganStory = {
  id: "cari-hilang",
  judul: "Mencari bilangan yang hilang",
  sumber: "Materi: mencari bilangan yang hilang",
  latar: "#ECFEFF",
  ketukan: [
    k(
      SUARA_H1,
      bersih(0),
      tambah(0, judul("Cari yang hilang"), emo("we", 40, 44, ANAK, 24)),
      ...rangkai(SUARA_H1, "wa", 76, ["6", "+", "?", "=", "9"], ["enam", "ditambah", "berapa", "sama", "sembilan."], "Ada"),
    ),
    k(SUARA_H2, tambah("sembilan", ...kartu("wb", 60, 100, 180, 28, W.krem, ["9 − 6 = ?"], 13))),
    k(SUARA_H3, ubah("tiga", { id: "wb-t0", isi: "9 − 6 = 3" }), ubah("tiga@2", { id: "wa2", isi: "3", warna: W.hijau })),
    k(SUARA_H4, ...rangkai(SUARA_H4, "wc", 160, ["6", "+", "3", "=", "9"], ["Enam", "ditambah", "tiga", "sama", "sembilan."], "memeriksa."), tambah("Cocok!", emo("ok", 262, 160, "\u{2705}", 28))),
    k(
      SUARA_H5,
      bersih(0),
      tambah(0, judul("Soal yang lain")),
      ...rangkai(SUARA_H5, "wd", 70, ["?", "−", "5", "=", "2"], ["berapa", "kurang", "lima", "sama", "dua?"], "lain:"),
      ...rangkai(SUARA_H5, "we", 130, ["2", "+", "5", "=", "7"], ["dua", "tambah", "lima", "sama", "tujuh."], "kebalikan,"),
    ),
    k(
      SUARA_H6,
      bersih(0),
      tambah(0, judul("Balik kalimatnya")),
      tambah("Tambah", ...kartu("bl1", 20, 44, 260, 36, W.hijauMuda, ["tambah jadi kurang"], 11)),
      tambah("dan", ...kartu("bl2", 20, 96, 260, 36, W.pink, ["kurang jadi tambah"], 11)),
      tambah("balik", emo("bl3", 150, 176, "\u{1F504}", 32)),
    ),
  ],
};

/* ------------------------------ 7. Memilih tanda tambah atau kurang ------------------------------ */
const SUARA_G1 = "Kadang tandanya hilang. Kita harus memilih tanda tambah atau tanda kurang. Perhatikan soal ini: empat, tanda hilang, empat, sama dengan delapan.";
const SUARA_G2 = "Dari empat menjadi delapan, hasilnya bertambah. Jadi tandanya adalah tanda tambah. Ketuk tanda tambah di layar.";
const SUARA_G3 = "Soal berikutnya: tujuh, tanda hilang, tiga, sama dengan empat.";
const SUARA_G4 = "Dari tujuh menjadi empat, hasilnya berkurang. Jadi tandanya adalah tanda kurang. Ketuk tanda kurang di layar.";
const SUARA_G5 = "Ingat, kalau hasilnya bertambah, pakai tanda tambah. Kalau hasilnya berkurang, pakai tanda kurang.";
const BARIS_T = (id: string, y: number, isi: string[], pemicu: string[]) => isi.map((s, i) => tambah(pemicu[i], teks(`${id}${i}`, 150 + (i - 2) * 28, y, s, 22, i === 1 ? W.biru : W.merah)));
const TOMBOL = () => [...kartu("bp", 40, 112, 90, 34, W.hijauMuda, ["+ tambah"], 11), ...kartu("bm", 170, 112, 90, 34, W.pink, ["− kurang"], 11)];

export const ADEGAN_TANDA: AdeganStory = {
  id: "pilih-tanda",
  judul: "Memilih tanda tambah atau kurang",
  sumber: "Materi: memilih tanda",
  latar: "#FFFBEB",
  ketukan: [
    k(SUARA_G1, bersih(0), tambah(0, judul("Pilih tandanya")), ...BARIS_T("ta", 76, ["4", "○", "4", "=", "8"], ["empat", "hilang@2", "empat@2", "sama", "delapan."])),
    k(SUARA_G2, tambah("Jadi", ...TOMBOL()), sorotkan("Ketuk", "bp-k"), ubah("layar.", { id: "ta1", isi: "+" })),
    k(SUARA_G3, bersih(0), tambah(0, judul("Pilih tandanya"), ...TOMBOL()), ...BARIS_T("tb", 76, ["7", "○", "3", "=", "4"], ["tujuh,", "hilang,", "tiga,", "sama", "empat."])),
    k(SUARA_G4, sorotkan("Ketuk", "bm-k"), ubah("layar.", { id: "tb1", isi: "−" })),
    k(
      SUARA_G5,
      bersih(0),
      tambah(0, judul("Ingat tandanya")),
      tambah("bertambah,", ...kartu("i1", 20, 44, 260, 40, W.hijauMuda, ["bertambah: pakai +"], 11)),
      tambah("berkurang,", ...kartu("i2", 20, 100, 260, 40, W.pink, ["berkurang: pakai −"], 11)),
      tambah("kurang.", emo("ow", 150, 184, IGIL, 28)),
    ),
  ],
};
