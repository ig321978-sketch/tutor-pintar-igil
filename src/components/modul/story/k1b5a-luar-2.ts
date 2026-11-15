import type { AdeganStory, Obj } from "./logika-story";
import { OWL, W, benda, bingkai, duaBingkai, emo, judul, kartu, pusatSel, sebar, teks, titikBingkai, titikDua, type Titik } from "./k1b5a-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah, urutBilangan } from "./k1b5a-bantu";
import { WARNA_METODE, kepala } from "./k1b5a-luar-1";

/* ------------------------------ 4. Sepuluh dan Satuan: konsep ------------------------------ */
const SUARA_C1 = "Metode kedua bernama Sepuluh dan Satuan. Kita pecah bilangan sebelas sampai dua puluh menjadi sepuluh dan sisanya.";
const SUARA_C2 = "Pilih bilangan empat belas. Sepuluh adalah satu kotak yang penuh.";
const SUARA_C3 = "Sisanya ada empat, di luar kotak. Kita tidak perlu menghitung kotak yang penuh lagi.";
const SUARA_C4 = "Jadi empat belas sama dengan sepuluh dan empat lagi.";
const SUARA_C5 = "Dengan metode ini, kita memecah bilangan menjadi sepuluh dan sisanya. Ucapkan lagi mengikuti suara guru.";
const SX = 85;
const SY = 56;

export const ADEGAN_LUAR_SEPULUH: AdeganStory = {
  id: "luar-sepuluh",
  judul: "Sepuluh dan Satuan: pecah menjadi sepuluh dan sisa",
  sumber: "Metode luar: Sepuluh dan Satuan",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_C1, tambah("kedua", ...kepala(1)), tambah("sebelas", ...kartu("lc", 50, 90, 200, 28, W.krem, ["11 sampai 20: 10 + sisa"], 10)), tambah("sepuluh@2", emo("lp", 150, 160, "\u{1F51F}", 30))),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, ...kepala(1), ...bingkai("sf", SX, SY)),
      tambah("empat", teks("b14", 262, 92, "14", 24, W.merah)),
      tambah("Sepuluh", ...titikBingkai("sf", SX, SY, 10)),
    ),
    k(
      SUARA_C3,
      tambah("Sisanya", ...Array.from({ length: 4 }, (_, i) => ({ id: `ss-t${i}`, t: "bulat" as const, x: 100 + i * 28, y: 140, r: 9, warna: W.biru, garis: W.biru, tebal: 1 }))),
      tambah("empat,", teks("sa", 156, 170, "sisa 4", 11, W.biru)),
    ),
    k(SUARA_C4, tambah("Jadi", ...kartu("lj", 60, 174, 180, 22, W.emas, ["14 = 10 + 4"], 11)), sorotkan("sepuluh", ...Array.from({ length: 10 }, (_, i) => `sf-c${i}`))),
    k(SUARA_C5, hapus(0, "lj-k", "lj-t0"), redamkan(0, ...Array.from({ length: 10 }, (_, i) => `sf-c${i}`)), tambah("memecah", ...kartu("lm", 60, 174, 180, 22, W.hijauMuda, ["10 + sisa"], 11)), tambah("Ucapkan", emo("ucap", 36, 120, "\u{1F5E3}", 26))),
  ],
};

/* ------------------------------ 5. Sepuluh dan Satuan: terapan ------------------------------ */
const SUARA_D1 = "Terapkan pada enam belas balon. Isi dulu kotak dengan sepuluh balon.";
const SUARA_D2 = "Seret sepuluh balon ke kotak, satu petak satu balon. Kotak penuh berisi sepuluh.";
const SUARA_D3 = "Sisanya ada enam balon di luar kotak. Sepuluh ditambah enam menjadi enam belas.";
const SUARA_D4 = "Hebat! Dengan cara ini, kita tidak perlu menghitung ulang dari satu.";
const S16 = sebar(16, 130, 180);
const IDBL = Array.from({ length: 16 }, (_, i) => i);
const pindah = (at: string | number, i: number, p: Titik) => [ubah(at, { id: `bl${i}`, x: p.x, y: p.y - 4 }), ubah(at, { id: `bl${i}-x`, x: p.x, y: p.y + 2.5 })];

export const ADEGAN_LUAR_SEPULUH_TERAPAN: AdeganStory = {
  id: "luar-sepuluh-terapan",
  judul: "Sepuluh dan Satuan: enam belas balon",
  sumber: "Metode luar: Sepuluh dan Satuan, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_D1,
      tambah("Terapkan", ...kepala(1), ...bingkai("tf", SX, SY)),
      tambah("balon.", ...S16.flatMap((p, i) => benda("balon", `bl${i}`, p.x, p.y, 8, i))),
      tambah("sepuluh", teks("tn", 150, 122, "16 balon, kotak 10", 9, W.ungu)),
    ),
    k(
      SUARA_D2,
      hapus(0, "tn"),
      ...IDBL.slice(0, 10).flatMap((i) => pindah("Seret", i, pusatSel(i, SX, SY))),
      tambah("penuh", teks("tp", 150, 122, "kotak penuh: 10", 9.4, W.hijau)),
    ),
    k(
      SUARA_D3,
      hapus(0, "tp"),
      sorotkan("Sisanya", ...IDBL.slice(10).map((i) => `bl${i}`)),
      tambah("Sepuluh", ...kartu("dj", 80, 114, 140, 22, W.emas, ["10 + 6 = 16"], 11)),
    ),
    k(SUARA_D4, bersih(0), tambah(0, judul("Sepuluh dulu, lalu sisa"), emo("ow", 150, 100, OWL, 44)), tambah("cara", ...kartu("dk", 40, 140, 220, 32, W.hijauMuda, ["10 dulu, lalu sisanya"], 10))),
  ],
};

/* ------------------------------ 6. Dua Bingkai Sepuluh: konsep ------------------------------ */
const SUARA_E1 = "Metode ketiga bernama Dua Bingkai Sepuluh. Kita memakai dua bingkai, dan tiap bingkai punya sepuluh petak.";
const SUARA_E2 = "Bingkai pertama kita isi sampai penuh, yaitu sepuluh titik merah.";
const SUARA_E3 = "Sisanya masuk ke bingkai kedua. Misalnya lima titik biru.";
const SUARA_E4 = "Titik seluruhnya lima belas. Kita tidak perlu menghitung satu per satu. Satu bingkai penuh dan lima titik lagi.";
const SUARA_E5 = "Bingkai kedua juga bisa penuh. Dua bingkai penuh adalah dua puluh.";
const LB1 = (isi: string): Obj => teks("bt1", 79, 128, isi, 9.4, W.biru);
const LB2 = (isi: string): Obj => teks("bt2", 221, 128, isi, 9.4, W.biru);

export const ADEGAN_LUAR_BINGKAI: AdeganStory = {
  id: "luar-bingkai",
  judul: "Dua Bingkai Sepuluh: dua bingkai berisi titik",
  sumber: "Metode luar: Dua Bingkai Sepuluh",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_E1, tambah("ketiga", ...kepala(2)), tambah("bingkai,", ...duaBingkai("bb", 56)), tambah("sepuluh", LB1("10 petak"), LB2("10 petak"))),
    k(SUARA_E2, tambah("penuh,", ...titikDua("bb", 56, 10))),
    k(SUARA_E3, tambah("lima", ...titikDua("bb", 56, 15, 10))),
    k(SUARA_E4, tambah("seluruhnya", teks("b15", 150, 168, "15", 30, W.merah)), sorotkan("bingkai", ...Array.from({ length: 10 }, (_, i) => `bba-c${i}`))),
    k(SUARA_E5, redamkan(0, ...Array.from({ length: 10 }, (_, i) => `bba-c${i}`)), tambah("Bingkai", ...titikDua("bb", 56, 20, 15)), ubah("Dua@2", { id: "b15", isi: "20" })),
  ],
};

/* ------------------------------ 7. Dua Bingkai Sepuluh: terapan ------------------------------ */
const SUARA_F1 = "Terapkan dengan mewarnai titik di dua bingkai. Ketuk petak untuk mewarnainya, sebanyak tiga belas.";
const SUARA_F2 = "Ketuk petak pelan-pelan. Satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh. Bingkai pertama penuh.";
const SUARA_F3 = "Lanjut ke bingkai kedua. Sebelas, dua belas, tiga belas.";
const SUARA_F4 = "Bingkai pertama penuh, bingkai kedua berisi tiga. Sepuluh ditambah tiga menjadi tiga belas.";
const posF2 = urutBilangan(SUARA_F2, 1, 10, "pelan-pelan.");
const posF3 = urutBilangan(SUARA_F3, 11, 13, "kedua.");
const CNT = (isi: string): Obj => teks("cnt", 150, 170, isi, 24, W.merah);

export const ADEGAN_LUAR_BINGKAI_TERAPAN: AdeganStory = {
  id: "luar-bingkai-terapan",
  judul: "Dua Bingkai Sepuluh: warnai tiga belas petak",
  sumber: "Metode luar: Dua Bingkai Sepuluh, terapan",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_F1, tambah("Terapkan", ...kepala(2), ...duaBingkai("fw", 56)), tambah("sebanyak", ...kartu("fk", 70, 124, 160, 22, W.krem, ["warnai 13 petak"], 10))),
    k(SUARA_F2, hapus(0, "fk-k", "fk-t0"), tambah(0, CNT("0")), ...posF2.flatMap((p, i) => [tambah(p, ...titikDua("fw", 56, i + 1, i)), ubah(p, { id: "cnt", isi: String(i + 1) })])),
    k(SUARA_F3, ...posF3.flatMap((p, i) => [tambah(p, ...titikDua("fw", 56, 11 + i, 10 + i)), ubah(p, { id: "cnt", isi: String(11 + i) })])),
    k(SUARA_F4, hapus(0, "cnt"), tambah("Sepuluh", ...kartu("fj", 70, 140, 160, 28, W.emas, ["10 + 3 = 13"], 12)), tambah("Bingkai", emo("ok", 262, 186, "✅", 26))),
  ],
};

/* ------------------------------ 8. Ringkasan ------------------------------ */
const SUARA_G1 = "Mari kita ringkas tiga metode dari luar. Semuanya membantu kita menghitung benda sampai dua puluh.";
const SUARA_G2 = "Hitung sampai dua puluh: kita terus menghitung satu per satu, melewati sepuluh.";
const SUARA_G3 = "Sepuluh dan Satuan: kita pecah bilangan menjadi sepuluh dan sisanya.";
const SUARA_G4 = "Dua Bingkai Sepuluh: bingkai pertama penuh, bingkai kedua berisi sisanya. Semua cara ini benar. Pilih yang paling cocok untukmu.";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Metode luar: ringkasan",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_G1, tambah(0, judul("Ringkasan")), tambah("Semuanya", emo("ig", 70, 100, OWL, 44)), tambah("sampai", ...kartu("rg", 120, 74, 160, 40, W.emas, ["benda sampai 20"], 11))),
    k(SUARA_G2, tambah("Hitung", ...kartu("r1", 14, 122, 272, 24, WARNA_METODE[0], ["1. terus hitung, lewati 10"], 9.4))),
    k(SUARA_G3, tambah("Sepuluh", ...kartu("r2", 14, 150, 272, 24, WARNA_METODE[1], ["2. pecah: 10 + sisa"], 9.4))),
    k(SUARA_G4, tambah("Dua", ...kartu("r3", 14, 178, 272, 20, WARNA_METODE[2], ["3. dua bingkai, titik"], 9.4))),
  ],
};
