import type { AdeganStory, Obj } from "./logika-story";
import { E, W, deret, emo, judul, kotak, tanah, teks, tokoh } from "./k5b2a-gambar";
import { bersih, hapus, idx, k, redamkan, sorotkan, tambah } from "./k5b2a-bantu";
import { KP, kartuCara } from "./k5b2a-luar-1";

/*
 * Cerita orisinal IGIL "Lonceng Bu Marni" (Kelas 5 Bab 2 Sub-Bab A), video metode global.
 * Naskah suara dari naskah/story-naskah-k5b2a.md. Bagian ini: Times Check (Cek Kali), terapannya, dan ringkasan memilih cara yang pas.
 */

/** Pita sepanjang n dipotong tiap b: potongan penuh `${id}{i}` bertulis b, sisa `${id}s` (bila ada) berarsir, dan label panjang `${id}l`. Lebar total w mulai x0, tinggi 26 di y. */
const pitaPenuh = (id: string, n: number, b: number, x0: number, w: number, y: number): Obj[] => {
  const satu = w / n;
  const r = (v: number): number => Math.round(v * 10) / 10;
  return Array.from({ length: Math.floor(n / b) }, (_, i) => [
    kotak(`${id}${i}`, r(x0 + i * b * satu), y, r(b * satu), 26, i % 2 === 0 ? W.jingga : W.sorot, W.coklat, { rx: 3, tebal: 1.4, z: 1 }),
    teks(`${id}${i}t`, r(x0 + (i * b + b / 2) * satu), y + 18, String(b), 12, W.biru, { z: 3 }),
  ]).flat();
};
const pitaSisa = (id: string, n: number, b: number, x0: number, w: number, y: number): Obj[] => {
  const satu = w / n;
  const sisa = n % b;
  const r = (v: number): number => Math.round(v * 10) / 10;
  return [kotak(`${id}s`, r(x0 + (n - sisa) * satu), y, r(sisa * satu), 26, W.merahMuda, W.merah, { rx: 3, tebal: 1.6, putus: true, z: 1 })];
};
const idPita = (id: string, n: number, b: number): string[] => [...Array.from({ length: Math.floor(n / b) }, (_, i) => [`${id}${i}`, `${id}${i}t`]).flat(), ...(n % b > 0 ? [`${id}s`] : [])];

const KARTU = ["Lompat Hitung", "Warnai Tabel", "Cek Kali"];
const kartuTiga = (id: string, y: number, h: number, yTeks: number): Obj[] => KARTU.flatMap((n, i) => [kotak(`${id}${i}-k`, 8 + i * 98, y, 88, h, "#14532D", W.putih, { rx: 6, tebal: 1.4 }), teks(`${id}${i}-t`, 52 + i * 98, yTeks, n, 8.4, KP.kapur, { z: 2 })]);

/* ------------------------------ Times Check: konsep ------------------------------ */
const SUARA_V1 = "Cara ketiga, Times Check, atau Cek Kali.";
const SUARA_V2 = "Sebuah bilangan adalah kelipatan kalau ia sama dengan bilangan bulat dikali bilangan itu.";
const SUARA_V3 = "Cara memeriksanya: bagi bilangan itu, dan lihat apakah habis tanpa sisa.";
const SUARA_V4 = "Kalau bersisa, bilangan itu bukan kelipatan.";

export const ADEGAN_LUAR_KALI: AdeganStory = {
  id: "luar-kali",
  judul: "Times Check: Cek Kali",
  sumber: "Metode global: Times Check (konsep)",
  latar: W.malam,
  ketukan: [
    k(SUARA_V1, ...kartuCara(SUARA_V1, "3", "Times Check", "Cek Kali", "\u{2797}")),
    k(
      SUARA_V2,
      bersih(0),
      tambah(0, judul("Kelipatan = Hasil Kali"), ...tanah("tn", 150)),
      tambah("kelipatan", teks("f1", 150, 64, "kelipatan", 14, W.merah)),
      tambah("sama", teks("f2", 150, 94, "= bilangan bulat × bilangan itu", 11, W.biru)),
      tambah("dikali", teks("f3", 150, 130, "contoh: 3 × 9 = 27", 12, W.hijauTua)),
    ),
    k(
      SUARA_V3,
      bersih(0),
      tambah(0, judul("Cek dengan Bagi"), ...tanah("tn", 150)),
      tambah("bagi", teks("pl", 150, 62, "27 : 9", 14, W.biru), ...pitaPenuh("pt", 27, 9, 30, 240, 74)),
      tambah("lihat", teks("hb", 150, 128, "27 : 9 = 3", 14, W.hijauTua)),
      tambah("habis", emo("ok", 262, 128, E.benar, 22)),
      tambah("sisa.", teks("ts", 150, 150, "tanpa sisa", 10, W.hijauTua)),
    ),
    k(
      SUARA_V4,
      hapus(0, "pl", ...idPita("pt", 27, 9), "hb", "ok", "ts"),
      tambah("Kalau", teks("pl2", 150, 62, "29 : 9", 14, W.biru), ...pitaPenuh("pu", 29, 9, 30, 240, 74)),
      tambah("bersisa,", ...pitaSisa("pu", 29, 9, 30, 240, 74), teks("hb2", 150, 128, "29 : 9 = 3 sisa 2", 12, W.merah)),
      tambah("bukan", emo("xs", 262, 128, E.salah, 22), teks("bk", 150, 150, "bukan kelipatan", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ Times Check: terapan ------------------------------ */
const SUARA_W1 = "Fajar bertanya, apakah tiga puluh enam kelipatan sembilan?";
const SUARA_W2 = "Bima membagi tiga puluh enam dengan sembilan, dan hasilnya empat tanpa sisa.";
const SUARA_W3 = "Cocok untuk memeriksa satu bilangan, karena kita tidak perlu menulis daftar.";
const SUARA_W4 = "Kurang cocok untuk menulis daftar lengkap, karena setiap bilangan diperiksa satu per satu.";

export const ADEGAN_LUAR_KALI_TERAPAN: AdeganStory = {
  id: "luar-kali-terapan",
  judul: "Cek Kali: kapan cocok",
  sumber: "Metode global: Times Check (terapan)",
  latar: W.malam,
  ketukan: [
    k(
      SUARA_W1,
      tambah(0, judul("Fajar Bertanya"), ...tanah("tn", 150)),
      tambah("Fajar", ...tokoh("fj", 40, 184, "Fajar")),
      tambah("tiga", teks("n36", 120, 84, "36", 30, W.biru)),
      tambah("kelipatan", teks("kl", 200, 80, "kelipatan", 12, W.merah)),
      tambah("sembilan", teks("n9", 262, 84, "9 ?", 28, W.merah)),
    ),
    k(
      SUARA_W2,
      tambah("Bima", ...tokoh("bm", 110, 184, "Bima")),
      tambah("membagi", teks("pl", 150, 108, "36 : 9", 12, W.biru)),
      tambah("dengan", ...pitaPenuh("pw", 36, 9, 30, 240, 114)),
      tambah("empat", teks("hs", 205, 160, "36 : 9 = 4", 13, W.hijauTua)),
      tambah("tanpa", emo("ok", 262, 156, E.benar, 20)),
    ),
    k(
      SUARA_W3,
      bersih(0),
      tambah(0, judul("Satu Bilangan"), ...tanah("tn", 150)),
      tambah("Cocok", emo("ok", 262, 100, E.benar, 28)),
      tambah("satu", teks("sb", 130, 60, "memeriksa satu bilangan", 12, W.hijauTua)),
      tambah("tidak", teks("td", 130, 100, "cukup dibagi, tanpa daftar", 10, W.biru)),
    ),
    k(
      SUARA_W4,
      hapus(0, "ok", "sb", "td"),
      tambah("Kurang", emo("xs", 262, 100, E.salah, 28)),
      tambah("lengkap,", ...deret("dq", ["?", "?", "?", "?", "?", "?"], 20, 50, 46, 38, 24, W.putih, 14)),
      tambah("diperiksa", teks("ps", 150, 112, "diperiksa satu per satu", 11, W.merah)),
    ),
  ],
};

/* ------------------------------ Ringkasan: memilih cara yang pas ------------------------------ */
const SUARA_R1 = "Tiga cara sudah kita pelajari bersama Bu Marni, dan masing-masing punya saat yang tepat.";
const SUARA_R2 = "Daftar pendek, pakai Lompat Hitung. Daftar sampai seratus, pakai Warnai Tabel. Memeriksa satu bilangan, pakai Cek Kali.";
const SUARA_R3 = "Apa pun caranya, ingat bahwa nol bukan kelipatan dan daftar dimulai dari bilangan itu sendiri.";
const SUARA_R4 = "Menurutmu, untuk mengetahui apakah delapan puluh empat kelipatan tujuh, cara mana yang paling cepat?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Memilih cara yang pas",
  sumber: "Metode global: ringkasan",
  latar: W.malam,
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Tiga Cara"), ...tanah("tn", 150), teks("n3", 262, 44, "3 cara", 10, W.merah)),
      tambah("cara", ...kartuTiga("r", 60, 40, 84)),
      tambah("Marni,", ...tokoh("bu", 150, 184, "Bu Marni")),
    ),
    k(
      SUARA_R2,
      sorotkan(idx(SUARA_R2, "pendek"), "r0-k"),
      tambah(idx(SUARA_R2, "Lompat"), emo("ok1", 52, 118, E.benar, 20)),
      redamkan(idx(SUARA_R2, "Daftar", 2), "r0-k"),
      sorotkan(idx(SUARA_R2, "Daftar", 2), "r1-k"),
      tambah(idx(SUARA_R2, "seratus"), teks("s100", 150, 132, "sampai 100", 10, W.merah)),
      tambah(idx(SUARA_R2, "Warnai"), emo("ok2", 150, 112, E.benar, 20)),
      redamkan(idx(SUARA_R2, "Memeriksa"), "r1-k"),
      sorotkan(idx(SUARA_R2, "Memeriksa"), "r2-k"),
      tambah(idx(SUARA_R2, "Cek"), emo("ok3", 248, 118, E.benar, 20)),
    ),
    k(
      SUARA_R3,
      redamkan(0, "r2-k"),
      hapus(0, "ok1", "ok2", "ok3", "s100"),
      tambah("nol", teks("zr", 60, 134, "0", 26, W.merah), emo("zx", 96, 128, E.salah, 22)),
      tambah("dimulai", teks("mu", 210, 134, "mulai dari bilangan itu", 9, W.hijauTua)),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Pilih Cara yang Pas"), ...tanah("tn", 150)),
      tambah("delapan", teks("bl", 150, 66, "84 kelipatan 7?", 20, W.merah)),
      tambah("cara", ...kartuTiga("p", 92, 34, 113)),
      tambah("cepat?", teks("tq", 150, 160, "?", 26, W.merah), emo("ik", 262, 160, E.pikir, 22)),
    ),
  ],
};
