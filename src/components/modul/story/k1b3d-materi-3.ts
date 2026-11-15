import type { AdeganStory } from "./logika-story";
import { W, bulat, deretBilangan, emo, judul, kartu, kartuAngka, teks, type Titik } from "./k1b3d-gambar";
import { bersih, coretAksi, hapus, k, langkahDeret, rangkai, redamkan, sorotkan, tambah } from "./k1b3d-bantu";

const ANAK = "\u{1F9D2}";
const BOLA = "⚽";
const x = (v: number): number => 33 + 26 * (v - 1);
const WARNA_KEL = ["#F472B6", "#38BDF8", "#A3E635", "#FB923C", "#818CF8"];

/* ------------------------------ 1. Bola diberikan kepada Wei ------------------------------ */
const SUARA_E1 = "Cerita berikutnya. Kira punya sepuluh bola. Beberapa bola diberikan kepada Wei. Sisa bola Kira ada enam.";
const SUARA_E2 = "Berapa bola yang diberikan kepada Wei? Yang kita cari adalah yang pergi, bukan sisa.";
const SUARA_E3 = "Ketuk bola yang diberikan kepada Wei: satu, dua, tiga, empat.";
const SUARA_E4 = "Susun kalimatnya. Sepuluh dikurangi enam sama dengan empat. Empat bola diberikan kepada Wei.";
const SUARA_E5 = "Periksa dengan tambah. Enam ditambah empat sama dengan sepuluh. Jawabannya cocok!";
const TITIK_BOLA: Titik[] = Array.from({ length: 10 }, (_, i) => ({ x: 50 + (i % 5) * 50, y: i < 5 ? 58 : 92 }));

export const ADEGAN_BERI: AdeganStory = {
  id: "beri-bola",
  judul: "Bola diberikan kepada Wei",
  sumber: "Materi: bola diberikan kepada Wei",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_E1,
      tambah(0, judul("Bola Kira: 10 bola")),
      tambah("sepuluh", ...TITIK_BOLA.map((p, i) => emo(`bo${i}`, p.x, p.y, BOLA, 24))),
      tambah("Wei.", emo("wei", 262, 150, ANAK, 28), teks("weit", 262, 166, "Wei", 8.4)),
      sorotkan("enam.", "bo0", "bo1", "bo2", "bo3", "bo4", "bo5"),
    ),
    k(SUARA_E2, tambah("Berapa", ...kartu("eq", 50, 130, 160, 26, W.krem, ["yang dicari: yang pergi"], 10)), tambah("pergi,", emo("tn", 262, 120, "❓", 26))),
    k(SUARA_E3, hapus(0, "tn"), redamkan(0, "bo0", "bo1", "bo2", "bo3", "bo4", "bo5"), ...coretAksi(SUARA_E3, "bo", TITIK_BOLA, [6, 7, 8, 9], "Wei:")),
    k(SUARA_E4, ...rangkai(SUARA_E4, "es", 188, ["10", "−", "6", "=", "4"], ["Sepuluh", "dikurangi", "enam", "sama", "empat."], "kalimatnya.")),
    k(SUARA_E5, hapus(0, "eq-k", "eq-t0"), tambah("Enam", ...kartu("ec", 80, 130, 140, 26, W.hijauMuda, ["6 + 4 = 10"], 12)), tambah("cocok!", emo("ok", 262, 120, "✅", 26))),
  ],
};

/* ------------------------------ 2. Kurangi dua kali ------------------------------ */
const SUARA_D1 = "Malosi punya sembilan kelereng. Malosi memberi Kira dua kelereng. Malosi juga memberi Upe empat kelereng. Tinggal berapa kelereng Malosi?";
const SUARA_D2 = "Kita kurangi dua kali. Pertama, beri Kira dua kelereng. Ketuk dan coret satu, dua.";
const SUARA_D3 = "Sembilan dikurangi dua sama dengan tujuh. Sekarang Malosi punya tujuh kelereng.";
const SUARA_D4 = "Kedua, beri Upe empat kelereng. Ketuk dan coret satu, dua, tiga, empat.";
const SUARA_D5 = "Tujuh dikurangi empat sama dengan tiga. Sisa kelereng Malosi ada tiga.";
const SUARA_D6 = "Cara lain: gabungkan dulu dua dan empat menjadi enam. Lalu sembilan dikurangi enam sama dengan tiga. Hasilnya sama!";
const TITIK_KEL: Titik[] = Array.from({ length: 9 }, (_, i) => ({ x: i < 5 ? 50 + 50 * i : 75 + 50 * (i - 5), y: i < 5 ? 56 : 90 }));
const KELERENG = (i: number) => bulat(`kl${i}`, TITIK_KEL[i].x, TITIK_KEL[i].y, 10, WARNA_KEL[i % 5]);

export const ADEGAN_DUA_KALI: AdeganStory = {
  id: "kurangi-dua-kali",
  judul: "Mengurangi dua kali",
  sumber: "Materi: mengurangi dua kali",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Kelereng Malosi")),
      tambah("sembilan", ...TITIK_KEL.map((_, i) => KELERENG(i))),
      tambah("Kira", ...kartu("dk", 20, 130, 110, 24, W.langit, ["ke Kira: 2"], 10)),
      tambah("Upe", ...kartu("du", 170, 130, 110, 24, W.pink, ["ke Upe: 4"], 10)),
    ),
    k(SUARA_D2, ...coretAksi(SUARA_D2, "kl", TITIK_KEL, [0, 1], "coret")),
    k(SUARA_D3, tambah("Sembilan", ...kartu("d1", 60, 162, 180, 26, W.hijauMuda, ["9 − 2 = 7"], 12))),
    k(SUARA_D4, hapus(0, "d1-k", "d1-t0"), ...coretAksi(SUARA_D4, "kl", TITIK_KEL, [2, 3, 4, 5], "coret")),
    k(SUARA_D5, tambah("Tujuh", ...kartu("d2", 60, 162, 180, 26, W.emas, ["7 − 4 = 3"], 12)), sorotkan("Sisa", "kl6", "kl7", "kl8")),
    k(SUARA_D6, hapus(0, "d2-k", "d2-t0"), tambah("gabungkan", ...kartu("d3", 20, 160, 120, 26, W.krem, ["2 + 4 = 6"], 11)), tambah("sembilan", ...kartu("d4", 160, 160, 120, 26, W.hijauMuda, ["9 − 6 = 3"], 11))),
  ],
};

/* ------------------------------ 3. Memeriksa jawaban ------------------------------ */
const SUARA_P1 = "Apakah soal cerita sudah selesai? Belum! Kita periksa dulu jawabannya, dengan cara lain.";
const SUARA_P2 = "Cara pertama, periksa dengan tambah. Sisa ditambah yang pergi harus sama dengan mula-mula. Enam ditambah dua sama dengan delapan. Cocok!";
const SUARA_P3 = "Cara kedua, mundur dari bilangan pertama. Mulai dari delapan, lalu mundur dua langkah: tujuh, enam.";
const SUARA_P4 = "Cara ketiga, ketuk titik di layar. Ada delapan titik. Coret dua titik merah: satu, dua. Tinggal enam titik biru.";
const SUARA_P5 = "Kalau semua cara memberi hasil yang sama, kita menjadi yakin. Jawabannya benar. Ucapkan bersama suara guru: enam burung.";

export const ADEGAN_PERIKSA: AdeganStory = {
  id: "periksa",
  judul: "Memeriksa jawaban dengan cara lain",
  sumber: "Materi: memeriksa jawaban",
  latar: "#FFF1F2",
  ketukan: [
    k(SUARA_P1, tambah(0, judul("Periksa jawabanmu"), emo("lp", 262, 50, "\u{1F50D}", 30)), tambah("Belum!", ...kartu("e1", 14, 30, 220, 24, W.krem, ["8 − 2 = 6"], 11))),
    k(SUARA_P2, tambah("tambah.", ...kartu("e2", 14, 58, 220, 24, W.hijauMuda, ["periksa: 6 + 2 = 8"], 10)), tambah("Cocok!", emo("ok", 262, 78, "✅", 26))),
    k(
      SUARA_P3,
      tambah("pertama.", ...deretBilangan("pr", 112), emo("up", x(8), 108, ANAK, 20)),
      sorotkan("delapan,", "prk8"),
      ...langkahDeret(SUARA_P3, [7, 6], "pr", 112, "langkah:"),
    ),
    k(
      SUARA_P4,
      bersih(0),
      tambah(0, judul("Ketuk titik di layar")),
      ...Array.from({ length: 8 }, (_, i) => tambah("delapan", bulat(`dt${i}`, 36 + 30 * i, 150, 9, i < 6 ? "#60A5FA" : "#F87171"))),
      ...coretAksi(SUARA_P4, "dt", Array.from({ length: 8 }, (_, i) => ({ x: 36 + 30 * i, y: 150 })), [6, 7], "merah:"),
      tambah("Tinggal", teks("dr", 150, 192, "8 − 2 = 6", 12, W.merah)),
    ),
    k(SUARA_P5, tambah("yakin.", ...kartu("yk", 60, 100, 180, 26, W.emas, ["Yakin: 6 burung"], 11)), tambah("Jawabannya", emo("ok", 150, 78, "✅", 30))),
  ],
};

/* ------------------------------ 4. Menyusun cerita di layar ------------------------------ */
const SUARA_U1 = "Sekarang giliranmu menyusun cerita di layar. Upe punya stoples berisi kue. Pilih bilangan dengan mengetuk angka.";
const SUARA_U2 = "Ketuk angka mula-mula. Ketuk sembilan. Di stoples ada sembilan kue.";
const SUARA_U3 = "Ketuk angka kue yang dimakan. Ketuk empat. Coret satu, dua, tiga, empat.";
const SUARA_U4 = "Sekarang susun kalimat kurangnya dari kartu: sembilan, tanda kurang, empat, tanda sama dengan, lima.";
const SUARA_U5 = "Lalu susun kalimat jawabannya. Sisa kue ada lima buah. Ketuk tombol suara untuk mendengar ceritamu.";
const UBIN = [3, 4, 5, 6, 9];
const TITIK_KUE: Titik[] = Array.from({ length: 9 }, (_, i) => ({ x: 41 + (i % 5) * 22, y: 52 + Math.floor(i / 5) * 22 }));

export const ADEGAN_SUSUN: AdeganStory = {
  id: "susun-cerita",
  judul: "Menyusun soal cerita di layar",
  sumber: "Materi: menyusun cerita di layar",
  latar: "#ECFEFF",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Susun ceritamu di layar")),
      tambah("stoples", ...kartu("j1", 20, 34, 120, 70, W.langit, [], 9)),
      tambah("Upe", emo("up", 210, 76, ANAK, 28), teks("un", 210, 92, "Upe", 8.4)),
    ),
    k(
      SUARA_U2,
      tambah(0, ...UBIN.flatMap((v, i) => kartuAngka(`n${v}`, 26 + 52 * i, 128, String(v), W.krem, 40, 34, 20))),
      sorotkan("sembilan.", "n9-k"),
      tambah("kue.", ...TITIK_KUE.map((p, i) => bulat(`kue${i}`, p.x, p.y, 8, "#FBBF24", W.coklat))),
    ),
    k(SUARA_U3, redamkan(0, "n9-k"), sorotkan("empat.", "n4-k"), ...coretAksi(SUARA_U3, "kue", TITIK_KUE, [0, 1, 2, 3], "Coret")),
    k(
      SUARA_U4,
      hapus(0, ...UBIN.flatMap((v) => [`n${v}-k`, `n${v}-t`])),
      ...rangkai(SUARA_U4, "su", 160, ["9", "−", "4", "=", "5"], ["sembilan,", "kurang,", "empat,", "sama", "lima."], "kartu:"),
    ),
    k(SUARA_U5, tambah("jawabannya.", ...kartu("sj", 40, 176, 220, 24, W.emas, ["Sisa kue ada 5 buah."], 10)), tambah("suara", emo("sg", 262, 130, "\u{1F50A}", 24))),
  ],
};
