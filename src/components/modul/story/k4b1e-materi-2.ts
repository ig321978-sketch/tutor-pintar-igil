import type { AdeganStory } from "./logika-story";
import { CONTOH, JAWAB_EMPAT_KANAN, LATIHAN_DUA, LATIHAN_EMPAT, W, angkaSel, barisTabel, bil, emo, garis, judul, kartu, kotak, ln, simpanSel, susunAwal, susunLangkah, teks } from "./k4b1e-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah } from "./k4b1e-bantu";

/* ------------------------------ 7. Panduan Guru: Ayo Mengamati (Panduan Guru hlm. 50) ------------------------------ */
const SUARA_G1 = "Panduan guru untuk Ayo Mengamati: guru meminta peserta didik memperhatikan masalah dan penyelesaiannya pada percakapan. Untuk cara susun panjang, guru sebaiknya mengulang dengan menuliskannya di papan tulis.";
const SUARA_G2 = "Untuk cara susun pendek, guru mengingatkan kembali materi nilai tempat. Melalui diskusi, guru dapat memberikan contoh yang lain.";
const SUARA_G3 = "Untuk susun panjang dengan menyimpan, guru mengingatkan kembali materi dekomposisi bilangan. Langkahnya dapat dijelaskan dengan contoh yang lain.";
const SUARA_G4 = "Untuk susun pendek dengan menyimpan, guru mengingatkan kembali nilai tempat. Contoh lain dalam video: dua ratus sembilan belas ditambah seratus tujuh belas sama dengan tiga ratus tiga puluh enam.";

export const ADEGAN_PANDUAN_AMATI: AdeganStory = {
  id: "panduan-amati",
  judul: "Panduan Guru untuk Ayo Mengamati",
  sumber: "Panduan Guru hlm. 50",
  latar: "#F5F3FF",
  kutipan: [
    "Aktivitas Pembelajaran",
    "Guru meminta peserta didik untuk memperhatikan masalah kontekstual",
    "dan penyelesaiannya pada percakapan. Pada percakapan dalam Buku Siswa",
    "terdapat penjelasan cara susun panjang, sebaiknya guru dapat mengulang",
    "dengan menuliskan pada papan tulis.",
    "Penjumlahan cara susun pendek, guru mengingatkan kembali pada peserta",
    "didik materi nilai tempat. Melalui metode diskusi, guru dapat memberikan",
    "contoh yang lain.",
    "Penjumlahan cara susun panjang dengan menyimpan, guru mengingatkan",
    "kembali materi dekomposisi bilangan.",
    "Penjumlahan cara susun pendek dengan menyimpan, guru mengingatkan",
  ],
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Panduan guru: Ayo Mengamati")),
      tambah("Untuk", ...barisTabel("pg0", 10, 32, [100, 180], ["cara", "yang dilakukan guru"], 24, 8.6, true)),
      tambah("memperhatikan", ...kartu("pgc", 10, 164, 280, 30, W.krem, ["murid memperhatikan masalah dan penyelesaian", "pada percakapan di buku"], 8.2)),
      tambah(idx(SUARA_G1, "susun"), ...barisTabel("pg1", 10, 56, [100, 180], ["susun panjang", "ulang di papan tulis"], 24, 8.6)),
    ),
    k(
      SUARA_G2,
      tambah("pendek,", ...barisTabel("pg2", 10, 80, [100, 180], ["susun pendek", "ingatkan nilai tempat + diskusi"], 24, 8.6)),
    ),
    k(
      SUARA_G3,
      tambah("panjang", ...barisTabel("pg3", 10, 104, [100, 180], ["panjang + simpan", "ingatkan dekomposisi + contoh lain"], 24, 8.6)),
    ),
    k(
      SUARA_G4,
      hapus(0, "pgc-k", "pgc-t0", "pgc-t1"),
      tambah("pendek", ...barisTabel("pg4", 10, 128, [100, 180], ["pendek + simpan", "ingatkan nilai tempat + contoh lain"], 24, 8.6)),
      tambah("contoh", ...kartu("pgd", 14, 160, 272, 34, W.emas, ["219 + 117 = 336 (contoh video)", "9 + 7 = 16, simpan 1; 1 + 1 + 1 = 3; 2 + 1 = 3"], 8.4)),
    ),
  ],
};

/* ------------------------------ 8. Ayo Berlatih nomor 1 (Buku Siswa hlm. 32; Panduan Guru hlm. 50) ------------------------------ */
const SUARA_H1 = "Ayo Berlatih nomor satu: gunakan cara susun panjang. Bagian a: tiga ratus tiga puluh tiga ditambah dua ratus lima. Uraikan masing-masing menjadi ratusan, puluhan, dan satuan.";
const SUARA_H2 = "Jumlahkan tiap nilai tempat: lima ratus ditambah tiga puluh ditambah delapan, sama dengan lima ratus tiga puluh delapan. Kunci Panduan Guru cocok dengan hitungan kita.";
const SUARA_H3 = "Bagian b: delapan ratus dua belas ditambah seratus enam belas. Uraikan menjadi delapan ratus ditambah sepuluh ditambah dua, dan seratus ditambah sepuluh ditambah enam.";
const SUARA_H4 = "Jumlahkan: sembilan ratus ditambah dua puluh ditambah delapan, sama dengan sembilan ratus dua puluh delapan. Tetapi kunci Panduan Guru menuliskan sembilan ratus dua puluh dua.";
const SUARA_H5 = "Periksa satuannya: dua ditambah enam sama dengan delapan, bukan dua. Kunci buku perlu dikoreksi.";
const SUARA_H6 = "Bagian c: lima ratus tujuh puluh enam ditambah seratus empat puluh delapan. Uraikan, lalu kelompokkan: enam ratus ditambah seratus ditambah sepuluh ditambah empat belas.";
const SUARA_H7 = "Lanjutkan: tujuh ratus ditambah sepuluh ditambah sepuluh ditambah empat, lalu tujuh ratus ditambah dua puluh ditambah empat. Hasilnya tujuh ratus dua puluh empat, sama dengan kunci buku.";

export const ADEGAN_BERLATIH_SATU: AdeganStory = {
  id: "berlatih-satu",
  judul: "Ayo Berlatih nomor 1: susun panjang",
  sumber: "Buku Siswa hlm. 32; Panduan Guru hlm. 50",
  latar: "#FFF7ED",
  kutipan: [
    "Ayo Berlatih",
    "1. Gunakan cara susun panjang untuk penjumlahan berikut!",
    "a. 333 = 300 + 30 + 3 b. 812 = 800 + 10 + 2",
    "205 = 200 + 0 + 5 + 116 = 100 + 10 + 6 +",
    "= 500 + 30 + 8 = 900 + 20 + 2",
    "= 538 = 922",
    "c. 576 = 500 + 70 + 6",
    "148 = 100 + 40 + 8 +",
    "= (500 + 100) + (70 + 40) + (6 + 8)",
    "= 600 + 100 + 10 + 14",
    "= 700 + 10 + 10 + 4",
    "= 700 + 20 + 4",
    "= 724",
  ],
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Berlatih 1: susun panjang")),
      tambah("Bagian", teks("ha", 12, 52, "a.", 9.6, W.ungu, { anchor: "start" })),
      tambah("tiga", bil("h1", 52, "333", 9.5, { x: 36 }), bil("h2", 66, "205 +", 9.5, { x: 36 })),
      tambah("Uraikan", ln("h3", 52, "= 300 + 30 + 3", 80), ln("h4", 66, "= 200 + 0 + 5 +", 80)),
    ),
    k(
      SUARA_H2,
      tambah("Jumlahkan", ln("h5", 84, "= 500 + 30 + 8", 80)),
      tambah(idx(SUARA_H2, "sama"), ln("h6", 98, "= 538", 80, 9.6, { warna: W.merah })),
      tambah("Kunci", ...kartu("hk", 170, 82, 116, 28, W.hijauMuda, ["kunci buku 538: cocok"], 8)),
    ),
    k(
      SUARA_H3,
      bersih(0),
      tambah(0, judul("Berlatih 1 bagian b")),
      tambah(0, teks("hb", 12, 52, "b.", 9.6, W.ungu, { anchor: "start" }), bil("i1", 52, "812", 9.5, { x: 36 }), bil("i2", 66, "116 +", 9.5, { x: 36 })),
      tambah("Uraikan", ln("i3", 52, "= 800 + 10 + 2", 80), ln("i4", 66, "= 100 + 10 + 6 +", 80)),
    ),
    k(
      SUARA_H4,
      tambah("Jumlahkan:", ln("i5", 84, "= 900 + 20 + 8", 80)),
      tambah(idx(SUARA_H4, "sama"), ln("i6", 98, "= 928", 80, 9.6, { warna: W.hijau })),
      tambah("Tetapi", ...kartu("ik", 170, 82, 116, 32, W.merahMuda, ["kunci buku: 922", "(keliru)"], 8.4)),
    ),
    k(
      SUARA_H5,
      tambah(0, teks("i7", 150, 140, "2 + 6 = 8", 11, W.merah)),
      tambah("Kunci", ...kartu("im", 40, 154, 220, 34, W.emas, ["catatan guru: kunci benar 928"], 9.4)),
      sorotkan("Kunci", "ik-k"),
    ),
    k(
      SUARA_H6,
      bersih(0),
      tambah(0, judul("Berlatih 1 bagian c")),
      tambah(0, teks("hc", 12, 50, "c.", 9.6, W.ungu, { anchor: "start" }), bil("j1", 50, "576", 9.5, { x: 36 }), bil("j2", 64, "148 +", 9.5, { x: 36 })),
      tambah("Uraikan,", ln("j3", 50, "= 500 + 70 + 6", 80), ln("j4", 64, "= 100 + 40 + 8 +", 80)),
      tambah("kelompokkan:", ln("j5", 82, "= (500 + 100) + (70 + 40) + (6 + 8)", 36), ln("j6", 98, "= 600 + 100 + 10 + 14", 36)),
    ),
    k(
      SUARA_H7,
      tambah("Lanjutkan:", ln("j7", 114, "= 700 + 10 + 10 + 4", 36)),
      tambah("lalu", ln("j8", 130, "= 700 + 20 + 4", 36)),
      tambah("Hasilnya", ln("j9", 146, "= 724", 36, 9.6, { warna: W.merah }), ...kartu("jk", 170, 138, 116, 28, W.hijauMuda, ["kunci buku 724: cocok"], 8)),
    ),
  ],
};

/* ------------------------------ 9 dan 10. Ayo Berlatih nomor 2 (Buku Siswa hlm. 32–33; Panduan Guru hlm. 51) ------------------------------ */
const TX = 14;
const TY = 44;

/** Satu soal susun pendek: tabel awal, tiga langkah kolom pada kata pemicu, dan kartu hasil. */
function soalDua(p: string, bilangan: readonly number[], pemicu: { awal: string | number; sat: string | number; satH: string | number; pul: string | number; pulH: string | number; rat: string | number; ratH: string | number; hasil: string | number }, nama: string) {
  const L = [2, 1, 0].map((c) => susunLangkah(p, TX, TY, bilangan, c));
  const total = bilangan.reduce((s, v) => s + v, 0);
  return [
    tambah(pemicu.awal, ...susunAwal(p, TX, TY, bilangan), teks(`${p}-nm`, 214, 36, nama, 8.6, W.ungu, { anchor: "middle" })),
    tambah(pemicu.sat, L[0].label, L[0].eq),
    tambah(pemicu.satH, L[0].hasil, ...(L[0].simpan ? [L[0].simpan] : [])),
    tambah(pemicu.pul, L[1].label, L[1].eq),
    tambah(pemicu.pulH, L[1].hasil, ...(L[1].simpan ? [L[1].simpan] : [])),
    tambah(pemicu.rat, L[2].label, L[2].eq),
    tambah(pemicu.ratH, L[2].hasil),
    tambah(pemicu.hasil, ...kartu(`${p}-hs`, 40, 164, 220, 28, W.emas, [`${bilangan.join(" + ")} = ${total}`], 10.4)),
  ];
}

const SUARA_I1 = "Nomor dua, bagian a: tiga ratus tujuh puluh tiga ditambah dua ratus delapan. Satuan: tiga ditambah delapan jadi sebelas, simpan satu. Puluhan: satu, tujuh, nol, jadi delapan. Ratusan: tiga ditambah dua jadi lima. Hasilnya lima ratus delapan puluh satu.";
const SUARA_I2 = "Bagian b: dua ratus tujuh puluh tujuh ditambah seratus empat puluh enam. Satuan: tujuh ditambah enam jadi tiga belas. Puluhan: satu, tujuh, empat jadi dua belas. Ratusan: satu, dua, satu jadi empat. Hasilnya empat ratus dua puluh tiga.";
const SUARA_I3 = "Bagian c: enam ratus dua puluh tujuh ditambah sembilan puluh dua. Satuan: tujuh ditambah dua jadi sembilan. Puluhan: dua ditambah sembilan jadi sebelas, simpan satu. Ratusan: satu ditambah enam jadi tujuh. Hasilnya tujuh ratus sembilan belas.";
const SUARA_J1 = "Bagian d: dua ratus tiga puluh empat ditambah dua ratus tujuh puluh sembilan ditambah empat ratus empat puluh empat. Satuan: empat, sembilan, empat jadi tujuh belas. Puluhan: satu, tiga, tujuh, empat jadi lima belas. Hasilnya sembilan ratus lima puluh tujuh.";
const SUARA_J2 = "Bagian e: empat puluh sembilan ditambah seratus tujuh puluh delapan. Satuan: sembilan ditambah delapan jadi tujuh belas. Puluhan: satu, empat, tujuh jadi dua belas. Ratusan: satu ditambah satu jadi dua. Hasilnya dua ratus dua puluh tujuh.";
const SUARA_J3 = "Bagian f: enam ratus dua belas ditambah empat puluh delapan ditambah seratus lima puluh enam. Satuan: dua, delapan, enam jadi enam belas. Puluhan: satu, satu, empat, lima jadi sebelas. Ratusan jadi delapan. Hasilnya delapan ratus enam belas.";

const kataKe = (s: string, kata: string, n = 1) => idx(s, kata, n);
const lastIdx = (s: string): number => s.split(/\s+/).filter(Boolean).length - 1;

export const ADEGAN_BERLATIH_DUA_SATU: AdeganStory = {
  id: "berlatih-dua-satu",
  judul: "Ayo Berlatih nomor 2: bagian a sampai c",
  sumber: "Buku Siswa hlm. 32–33; Panduan Guru hlm. 51",
  latar: "#F0F9FF",
  kutipan: [
    "2. Gunakan cara susun pendek untuk penjumlahan berikut!",
    "a. 373 + 208 = ….. b. 277 + 146 = …..",
    "c. 627 + 92 = ….. d. 234 + 279 + 444 = …..",
    "Ratusan Puluhan Satuan",
    "Penjumlahan cara susun pendek, guru mengingatkan kembali pada peserta",
    "didik materi nilai tempat. Melalui metode diskusi, guru dapat memberikan",
  ],
  ketukan: [
    k(SUARA_I1, tambah(0, judul("Berlatih 2: susun pendek")), ...soalDua("ka", LATIHAN_DUA[0], { awal: "Bagian", sat: "Satuan:", satH: kataKe(SUARA_I1, "sebelas,"), pul: "Puluhan:", pulH: kataKe(SUARA_I1, "delapan", 3), rat: "Ratusan:", ratH: kataKe(SUARA_I1, "lima"), hasil: "Hasilnya" }, "bagian a")),
    k(SUARA_I2, bersih(0), tambah(0, judul("Berlatih 2: susun pendek")), ...soalDua("kb", LATIHAN_DUA[1], { awal: "Bagian", sat: "Satuan:", satH: kataKe(SUARA_I2, "tiga"), pul: "Puluhan:", pulH: kataKe(SUARA_I2, "dua", 2), rat: "Ratusan:", ratH: kataKe(SUARA_I2, "empat", 3), hasil: "Hasilnya" }, "bagian b")),
    k(SUARA_I3, bersih(0), tambah(0, judul("Berlatih 2: susun pendek")), ...soalDua("kc", LATIHAN_DUA[2], { awal: "Bagian", sat: "Satuan:", satH: kataKe(SUARA_I3, "sembilan"), pul: "Puluhan:", pulH: kataKe(SUARA_I3, "sebelas,"), rat: "Ratusan:", ratH: kataKe(SUARA_I3, "tujuh", 3), hasil: "Hasilnya" }, "bagian c")),
  ],
};

export const ADEGAN_BERLATIH_DUA_DUA: AdeganStory = {
  id: "berlatih-dua-dua",
  judul: "Ayo Berlatih nomor 2: bagian d sampai f",
  sumber: "Buku Siswa hlm. 32–33; Panduan Guru hlm. 51",
  latar: "#F0F9FF",
  kutipan: [
    "d. 234 + 279 + 444 = …..",
    "e. 49 + 178 = ….. f. 612 + 48 + 156 = …..",
    "2. Gunakan cara susun pendek untuk penjumlahan berikut!",
    "Ratusan Puluhan Satuan",
    "Penjumlahan cara susun pendek dengan menyimpan, guru mengingatkan",
    "kembali materi nilai tempat. Langkah penyelesaian cara susun pendek dapat",
  ],
  ketukan: [
    k(SUARA_J1, tambah(0, judul("Berlatih 2: susun pendek")), ...soalDua("kd", LATIHAN_DUA[3], { awal: "Bagian", sat: "Satuan:", satH: kataKe(SUARA_J1, "belas"), pul: "Puluhan:", pulH: kataKe(SUARA_J1, "belas", 2), rat: "Hasilnya", ratH: kataKe(SUARA_J1, "lima", 2), hasil: kataKe(SUARA_J1, "tujuh", 4) }, "bagian d")),
    k(SUARA_J2, bersih(0), tambah(0, judul("Berlatih 2: susun pendek")), ...soalDua("ke", LATIHAN_DUA[4], { awal: "Bagian", sat: "Satuan:", satH: kataKe(SUARA_J2, "belas"), pul: "Puluhan:", pulH: kataKe(SUARA_J2, "belas", 2), rat: "Ratusan:", ratH: kataKe(SUARA_J2, "dua", 2), hasil: "Hasilnya" }, "bagian e")),
    k(SUARA_J3, bersih(0), tambah(0, judul("Berlatih 2: susun pendek")), ...soalDua("kf", LATIHAN_DUA[5], { awal: "Bagian", sat: "Satuan:", satH: kataKe(SUARA_J3, "belas", 2), pul: "Puluhan:", pulH: kataKe(SUARA_J3, "sebelas"), rat: "Ratusan", ratH: kataKe(SUARA_J3, "delapan", 3), hasil: "Hasilnya" }, "bagian f")),
  ],
};

/* ------------------------------ 11. Ayo Berlatih nomor 3 dan 4 (Buku Siswa hlm. 33; Panduan Guru hlm. 52) ------------------------------ */
const SUARA_K1 = "Nomor tiga: pakai cara yang menurut kalian mudah. Bagian a: tiga ratus tiga puluh tiga ditambah lima ratus sembilan belas sama dengan delapan ratus lima puluh dua. Cocok dengan kunci.";
const SUARA_K2 = "Bagian b: empat ratus dua puluh sembilan ditambah sembilan belas sama dengan empat ratus empat puluh delapan. Bagian c: delapan ratus dua puluh satu ditambah sembilan puluh delapan sama dengan sembilan ratus sembilan belas.";
const SUARA_K3 = "Bagian d: tujuh ratus ditambah seratus tiga puluh sembilan sama dengan delapan ratus tiga puluh sembilan. Bagian e: enam ratus dua puluh satu ditambah tiga puluh tujuh ditambah seratus dua puluh delapan sama dengan tujuh ratus delapan puluh enam.";
const SUARA_K4 = "Nomor empat: tarik garis ke jawaban yang sesuai. Bagian a: enam ratus dua puluh sembilan ditambah seratus dua puluh tiga, hasilnya tujuh ratus lima puluh dua.";
const SUARA_K5 = "Bagian b: tiga ratus tujuh puluh tujuh ditambah tiga ratus tiga puluh ditambah dua puluh sembilan, hasilnya tujuh ratus tiga puluh enam. Bagian c: empat ratus dua puluh tiga ditambah tiga ratus sembilan puluh, hasilnya delapan ratus tiga belas.";
const SUARA_K6 = "Bagian d: tiga puluh sembilan ditambah delapan ratus dua puluh satu, hasilnya delapan ratus enam puluh. Bagian e: enam ratus sembilan puluh ditambah lima puluh enam ditambah dua ratus delapan belas, hasilnya sembilan ratus enam puluh empat.";

const HURUF = ["a", "b", "c", "d", "e"];
/** Baris jawaban nomor 3 pada kolom kiri: huruf, persamaan lengkap, dan centang. */
const baris3 = (i: number, y: number) => {
  const b = [[333, 519], [429, 19], [821, 98], [700, 139], [621, 37, 128]][i];
  return [teks(`n3l${i}`, 16, y, `${HURUF[i]}.`, 10, W.ungu, { anchor: "start" }), teks(`n3e${i}`, 40, y, `${b.join(" + ")} = ${b.reduce((s, v) => s + v, 0)}`, 11, W.hitam, { anchor: "start" }), emo(`n3c${i}`, 262, y + 1, "✅", 14)];
};
const KIRI_Y = [36, 68, 100, 132, 164];
/** Kolom soal (kiri) dan kolom jawaban (kanan) nomor 4. */
const kolom4 = () => [
  ...LATIHAN_EMPAT.flatMap((b, i) => [kotak(`n4a${i}`, 6, KIRI_Y[i], 128, 22, W.langit, W.biru, { rx: 10 }), teks(`n4s${i}`, 70, KIRI_Y[i] + 15, `${HURUF[i]}. ${b.join(" + ")} =`, 8.6, W.biru)]),
  ...JAWAB_EMPAT_KANAN.flatMap((v, j) => [kotak(`n4r${j}`, 212, KIRI_Y[j], 80, 22, W.hijauMuda, W.hijau, { rx: 10 }), teks(`n4v${j}`, 252, KIRI_Y[j] + 15, String(v), 10, W.hijau)]),
];
/** Garis soal i ke jawaban kanan yang sesuai: `n4g{i}`, dari tepi kanan kotak soal ke tepi kiri kotak jawaban. */
const garis4 = (i: number) => {
  const j = JAWAB_EMPAT_KANAN.indexOf(LATIHAN_EMPAT[i].reduce((s, v) => s + v, 0) as (typeof JAWAB_EMPAT_KANAN)[number]);
  return garis(`n4g${i}`, 134, KIRI_Y[i] + 11, 78, KIRI_Y[j] - KIRI_Y[i], W.ungu, 2, { gambar: true });
};

export const ADEGAN_BERLATIH_TIGA_EMPAT: AdeganStory = {
  id: "berlatih-tiga-empat",
  judul: "Ayo Berlatih nomor 3 dan 4",
  sumber: "Buku Siswa hlm. 33; Panduan Guru hlm. 52",
  latar: "#FEFCE8",
  kutipan: [
    "3. Gunakan cara yang menurut kalian mudah untuk menyelesaikan operasi",
    "penjumlahan berikut!",
    "a. 333 + 519 = ……",
    "b. 429 +19 = …….",
    "c. 821 + 98 = ……",
    "d. 700 + 139 = ……",
    "e. 621 + 37 + 128 = …….",
    "4. Tariklah garis dengan jawaban yang sesuai!",
    "813",
    "736",
    "860",
    "964",
    "752",
    "377 + 330 + 29 =",
    "423 + 390 =",
    "39 + 821 =",
    "690 + 56 + 218 =",
    "629 + 123 =",
  ],
  ketukan: [
    k(SUARA_K1, tambah(0, judul("Berlatih 3: pilih cara yang mudah")), tambah("Bagian", ...baris3(0, KIRI_Y[0] + 14).slice(0, 2)), tambah("Cocok", baris3(0, KIRI_Y[0] + 14)[2])),
    k(SUARA_K2, tambah("Bagian", ...baris3(1, KIRI_Y[1] + 14).slice(0, 2)), tambah(idx(SUARA_K2, "delapan"), baris3(1, KIRI_Y[1] + 14)[2]), tambah(idx(SUARA_K2, "c:"), ...baris3(2, KIRI_Y[2] + 14).slice(0, 2)), tambah(lastIdx(SUARA_K2), baris3(2, KIRI_Y[2] + 14)[2])),
    k(SUARA_K3, tambah("Bagian", ...baris3(3, KIRI_Y[3] + 14).slice(0, 2)), tambah(idx(SUARA_K3, "delapan"), baris3(3, KIRI_Y[3] + 14)[2]), tambah(idx(SUARA_K3, "e:"), ...baris3(4, KIRI_Y[4] + 14).slice(0, 2)), tambah(lastIdx(SUARA_K3), baris3(4, KIRI_Y[4] + 14)[2])),
    k(SUARA_K4, bersih(0), tambah(0, judul("Berlatih 4: tarik garis")), tambah("Nomor", ...kolom4()), tambah("hasilnya", garis4(0))),
    k(SUARA_K5, tambah("hasilnya", garis4(1)), tambah(idx(SUARA_K5, "hasilnya", 2), garis4(2))),
    k(SUARA_K6, tambah("hasilnya", garis4(3)), tambah(idx(SUARA_K6, "hasilnya", 2), garis4(4))),
  ],
};

/* ------------------------------ 12. Ayo Berlatih nomor 5: soal cerita (Buku Siswa hlm. 34; Panduan Guru hlm. 52–53) ------------------------------ */
const SUARA_L1 = "Soal cerita a: kebun A menghasilkan tiga ratus dua puluh delapan buah kelapa sawit, kebun B lima ratus tujuh puluh sembilan buah. Jawab: tiga ratus dua puluh delapan ditambah lima ratus tujuh puluh sembilan sama dengan sembilan ratus tujuh buah.";
const SUARA_L2 = "Soal b: tiga kolam ikan lele milik Pak Rahmad, Pak Sudi, dan Pak Jaya. Jawab: seratus tujuh belas ditambah seratus lima ditambah dua ratus empat puluh dua sama dengan empat ratus enam puluh empat ikan.";
const SUARA_L3 = "Soal c: SD Pelangi mengirim siswa ke tiga lomba. Jawab: seratus dua puluh satu ditambah dua puluh sembilan ditambah sembilan puluh delapan sama dengan dua ratus empat puluh delapan siswa.";
const SUARA_L4 = "Soal d: Helen punya stiker kartun, bunga, dan boneka. Jawab: seratus sebelas ditambah tujuh puluh tujuh ditambah delapan puluh sembilan sama dengan dua ratus tujuh puluh tujuh stiker.";
const SUARA_L5 = "Keempat kunci cocok dengan hitungan mandiri. Soal cerita ini ada di halaman tiga puluh empat Buku Siswa.";

const cerita = (p: string, nama: string, baris: string[], bilangan: readonly number[], satuan: string) => {
  const total = bilangan.reduce((s, v) => s + v, 0);
  return {
    kartuDiketahui: kartu(`${p}d`, 14, 32, 272, 18 + baris.length * 13, W.hijauMuda, baris, 9),
    jawab: [teks(`${p}j`, 150, 118, `${bilangan.join(" + ")} = ${total}`, 13, W.merah), ...kartu(`${p}k`, 40, 138, 220, 34, W.emas, [`jadi ${total} ${satuan}`], 10)],
    nama,
  };
};
const C1 = cerita("ca", "Soal cerita a: kelapa sawit", ["diketahui:", "kebun A 328 buah", "kebun B 579 buah"], [328, 579], "buah kelapa sawit");
const C2 = cerita("cb", "Soal cerita b: ikan lele", ["diketahui:", "Pak Rahmad 117 ikan, Pak Sudi 105 ikan", "Pak Jaya 242 ikan"], [117, 105, 242], "ikan lele");
const C3 = cerita("cc", "Soal cerita c: lomba SD Pelangi", ["diketahui:", "matematika 121 siswa, bahasa inggris 29 siswa", "sains 98 siswa"], [121, 29, 98], "siswa");
const C4 = cerita("cd", "Soal cerita d: stiker Helen", ["diketahui:", "kartun 111, bunga 77, boneka 89 stiker"], [111, 77, 89], "stiker");

export const ADEGAN_BERLATIH_LIMA: AdeganStory = {
  id: "berlatih-lima",
  judul: "Ayo Berlatih nomor 5: soal cerita",
  sumber: "Buku Siswa hlm. 34; Panduan Guru hlm. 52–53",
  latar: "#F0FDF4",
  kutipan: [
    "5. Kerjakan soal cerita berikut!",
    "a. Seorang petani kelapa sawit mempunyai beberapa kebun. Kebun A",
    "menghasilkan 328 buah, kebun B menghasilkan 579 buah. Berapakah",
    "b. Pak Rahmad memiliki 117 ikan lele, Pak Sudi memiliki 105 ikan lele dan",
    "Pak Jaya memiliki 242 ikan lele. Semua ikan lele dipanen dari kolam dan",
    "c. SD Pelangi mengirimkan 121 siswa mengikuti lomba matematika, 29",
    "siswa mengikuti lomba bahasa inggris dan 98 siswa mengikuti lomba",
    "d. Helen mempunyai 111 stiker gambar kartun, 77 stiker gambar bunga",
    "dan 89 stiker boneka. Berapa jumlah stiker Helen seluruhnya?",
    "jawab: 328 + 579 = 907",
    "jawab: 117 + 105 + 242 = 464",
    "jawab: 121 + 29 + 98 = 248",
    "jawab: 111 + 77 + 89 = 277",
  ],
  ketukan: [
    k(SUARA_L1, tambah(0, judul(C1.nama)), tambah("kebun", ...C1.kartuDiketahui), tambah("Jawab:", C1.jawab[0]), tambah(idx(SUARA_L1, "sembilan", 2), ...C1.jawab.slice(1))),
    k(SUARA_L2, bersih(0), tambah(0, judul(C2.nama)), tambah("tiga", ...C2.kartuDiketahui), tambah("Jawab:", C2.jawab[0]), tambah(idx(SUARA_L2, "ikan", 2), ...C2.jawab.slice(1))),
    k(SUARA_L3, bersih(0), tambah(0, judul(C3.nama)), tambah("SD", ...C3.kartuDiketahui), tambah("Jawab:", C3.jawab[0]), tambah(idx(SUARA_L3, "siswa", 2), ...C3.jawab.slice(1))),
    k(SUARA_L4, bersih(0), tambah(0, judul(C4.nama)), tambah("Helen", ...C4.kartuDiketahui), tambah("Jawab:", C4.jawab[0]), tambah(idx(SUARA_L4, "stiker", 2), ...C4.jawab.slice(1))),
    k(
      SUARA_L5,
      bersih(0),
      tambah(0, judul("Kunci soal cerita")),
      tambah("Keempat", ...barisTabel("kr0", 14, 32, [40, 150, 78], ["soal", "penjumlahan", "kunci"], 20, 8.6, true)),
      ...[["a", "328 + 579", "907"], ["b", "117 + 105 + 242", "464"], ["c", "121 + 29 + 98", "248"], ["d", "111 + 77 + 89", "277"]].map((r, i) => tambah(0, ...barisTabel(`kr${i + 1}`, 14, 52 + i * 22, [40, 150, 78], r, 22, 9))),
      tambah("halaman", ...kartu("kh5", 14, 146, 272, 40, W.krem, ["Buku Siswa hlm. 34 (bagian atas)", "kunci: Panduan Guru hlm. 52–53"], 9)),
    ),
  ],
};

/* ------------------------------ 13. Miskonsepsi dan diferensiasi (Panduan Guru hlm. 54) ------------------------------ */
const SUARA_M1 = "Miskonsepsi: penjumlahan dua bilangan sering dimulai dari angka terdepan, padahal seharusnya dimulai dari nilai tempat satuan. Contoh video: seratus delapan puluh sembilan ditambah dua ratus empat puluh lima.";
const SUARA_M2 = "Jika dimulai dari ratusan, satu ditambah dua sama dengan tiga. Tetapi simpanan dari puluhan membuat ratusan menjadi empat. Dimulai dari satuan, hasil tiap kolom tidak perlu diubah lagi.";
const SUARA_M3 = "Diferensiasi: peserta didik yang cepat mengerjakan Latihan tanpa bantuan dan boleh diberi soal tambahan. Pada saat yang sama, guru mendampingi peserta didik yang mengalami kesulitan.";
const SUARA_M4 = "Metode yang disarankan adalah Diskusi dan Drill. Kelompok dibentuk dari keberagaman peserta didik; ketua berkemampuan tinggi, anggota sedang atau kurang. Bila tidak ada yang tinggi, anggota bekerja sama lewat diskusi.";

export const ADEGAN_MISKONSEPSI: AdeganStory = {
  id: "miskonsepsi",
  judul: "Miskonsepsi dan diferensiasi",
  sumber: "Panduan Guru hlm. 54 (bagian atas)",
  latar: "#FDF2F8",
  kutipan: [
    "Miskonsepsi",
    "Miskonsepsi yang sering terjadi dalam operasi penjumlahan, yaitu",
    "penjumlahan dua bilangan dimulai dari angka terdepan seharusnya dimulai dari angka",
    "dengan nilai tempat satuan.",
    "Diferensiasi",
    "Bagi peserta didik yang kecepatan belajarnya tinggi (advanced), minta",
    "mereka mengerjakan Latihan tanpa bantuan. Guru juga dapat memberikan",
    "soal-soal tambahan. Pada saat yang sama, guru dapat mendampingi",
    "peserta didik yang mengalami kesulitan.",
    "disarankan untuk sub bab ini adalah Diskusi dan Drill, yang mengutamakan",
    "Metode pembelajaran yang",
    "kemampuan tinggi dengan anggota kelompok tingkat kemampuan sedang",
  ],
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Miskonsepsi: mulai dari mana?")),
      tambah("Miskonsepsi:", ...kartu("mk", 14, 28, 272, 28, W.merahMuda, ["keliru: mulai dari angka terdepan"], 9.2)),
      tambah("Contoh", ...susunAwal("ms", 14, 74, CONTOH.jeruk), teks("msl", 200, 66, "contoh video: 189 + 245", 8.6, W.hitam)),
      tambah("satuan.", ...kartu("mb", 150, 82, 136, 28, W.hijauMuda, ["benar: mulai dari satuan"], 8.4)),
    ),
    k(
      SUARA_M2,
      tambah("ratusan,", teks("ms-w", 150, 132, "1 + 2 = 3", 10, W.merah), angkaSel("ms", 14, 74, 2, 0, "3", 11, W.merah)),
      tambah("Tetapi", simpanSel("ms", 14, 74, 0, "1")),
      ubah(idx(SUARA_M2, "empat"), { id: "ms-d20", isi: "4", warna: W.hijau }),
      tambah("satuan,", simpanSel("ms", 14, 74, 1, "1"), angkaSel("ms", 14, 74, 2, 1, "3", 11, W.hijau), angkaSel("ms", 14, 74, 2, 2, "4", 11, W.hijau), teks("ms-b", 150, 160, "dari satuan: tidak ada yang diubah", 8.6, W.hijau)),
    ),
    k(
      SUARA_M3,
      bersih(0),
      tambah(0, judul("Diferensiasi")),
      tambah("peserta", ...kartu("df1", 14, 34, 272, 50, W.hijauMuda, ["cepat (advanced):", "Latihan tanpa bantuan, soal tambahan"], 9.2)),
      tambah("guru", ...kartu("df2", 14, 98, 272, 50, W.langit, ["yang kesulitan:", "didampingi guru"], 9.2)),
    ),
    k(
      SUARA_M4,
      bersih(0),
      tambah(0, judul("Metode dan kelompok")),
      tambah("Metode", ...kartu("kl1", 14, 30, 272, 32, W.emas, ["metode: Diskusi dan Drill"], 9.6)),
      tambah("Kelompok", ...kartu("kl2", 14, 72, 272, 44, W.hijauMuda, ["kelompok dari keberagaman peserta didik", "ketua tinggi; anggota sedang atau kurang"], 8.8)),
      tambah("Bila", ...kartu("kl3", 14, 126, 272, 44, W.langit, ["tanpa peserta berkemampuan tinggi:", "semua anggota bekerja sama lewat diskusi"], 8.8)),
    ),
  ],
};
