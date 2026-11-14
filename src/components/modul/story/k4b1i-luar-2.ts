import type { AdeganStory, Aksi, Obj } from "./logika-story";
import { W, WARNA_PRIMA, coret, daftar, judul, kartu, kisiBilangan, tabel } from "./k4b1i-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k4b1i-bantu";

/* ------------------------------ 6. Divisibility: konsep ------------------------------ */
export const ADEGAN_LUAR_DV: AdeganStory = {
  id: "luar-dv",
  judul: "Divisibility (Keterbagian)",
  sumber: "Metode luar: Divisibility",
  latar: "#FEFCE8",
  ketukan: [
    k(
      "Metode ketiga, Divisibility atau Keterbagian. Faktor membagi habis bilangan: bila dibagi faktornya, sisanya nol. Kita menguji tanpa mendaftar semua pasangan.",
      bersih(0),
      tambah(0, judul("Divisibility")),
      tambah("Keterbagian.", ...kartu("dv1", 50, 34, 200, 28, W.krem, ["Keterbagian"], 9.6)),
      tambah("sisanya", ...kartu("dv2", 20, 80, 260, 30, W.hijauMuda, ["12 : 3 = 4 sisa 0: faktor"], 10)),
      tambah("menguji", ...kartu("dv3", 20, 124, 260, 30, W.merahMuda, ["12 : 5 = 2 sisa 2: bukan faktor"], 10)),
    ),
    k(
      "Beberapa ciri: habis dibagi dua bila satuannya genap. Habis dibagi lima bila satuannya nol atau lima. Habis dibagi sepuluh bila satuannya nol.",
      ...daftar("dc", "Ciri keterbagian", [
        { at: "dua", t: "dibagi 2: satuan 0, 2, 4, 6, 8", w: W.hijauMuda, u: 9.2 },
        { at: "lima@2", t: "dibagi 5: satuan 0 atau 5", w: W.krem, u: 9.4 },
        { at: "sepuluh", t: "dibagi 10: satuan 0", w: W.langit, u: 9.4 },
      ]),
    ),
    k(
      "Habis dibagi tiga bila jumlah angkanya habis dibagi tiga, begitu pula sembilan. Habis dibagi enam bila habis dibagi dua dan tiga.",
      ...daftar("dd", "Ciri lanjutan", [
        { at: "tiga", t: "dibagi 3: jumlah angka habis dibagi 3", w: W.hijauMuda, u: 8.8 },
        { at: "sembilan.", t: "dibagi 9: jumlah angka habis dibagi 9", w: W.krem, u: 8.8 },
        { at: "enam", t: "dibagi 6: habis dibagi 2 dan 3", w: W.pink, u: 9.4 },
      ]),
    ),
  ],
};

/* ------------------------------ 7. Divisibility: penerapan ------------------------------ */
export const KOLOM_UJI = [0, 2, 3, 5, 6, 9];
const TAB_UJI = tabel(
  "dt",
  24,
  34,
  [52, 40, 40, 40, 40, 40],
  [
    ["Bilangan", "÷ 2", "÷ 3", "÷ 5", "÷ 6", "÷ 9"],
    ["24", "ya", "ya", "tidak", "ya", "tidak"],
    ["25", "tidak", "tidak", "ya", "tidak", "tidak"],
    ["27", "tidak", "ya", "tidak", "tidak", "ya"],
    ["52", "ya", "tidak", "tidak", "tidak", "tidak"],
  ],
  17,
  8.2,
);
const selUji = (r: number, c: number): Obj[] => TAB_UJI.filter((o) => o.id === `dt-s${r}${c}` || o.id === `dt-t${r}${c}`);
/** Satu baris pengujian: `label` memunculkan bilangannya, `sel` pasangan [kolom, kata] untuk jawaban ya atau tidak, lalu kartu hitung jumlah angka. */
type KasusDV = { r: number; suara: string; label: number | string; sel: [number, number | string][]; jumlah: string; jumlahAt: number | string };
function ketukanDV(c: KasusDV) {
  const aksi: Aksi[] = [];
  if (c.r === 1) aksi.push(bersih(0), tambah(0, judul("Menguji dengan ciri keterbagian")), tambah(0, ...[0, 1, 2, 3, 4, 5].flatMap((i) => selUji(0, i))));
  else aksi.push(hapus(0, `dj${c.r - 1}-k`, `dj${c.r - 1}-t0`));
  aksi.push(tambah(c.label, ...selUji(c.r, 0)));
  for (const [kol, at] of c.sel) aksi.push(tambah(at, ...selUji(c.r, kol)));
  aksi.push(tambah(c.jumlahAt, ...kartu(`dj${c.r}`, 40, 134, 220, 28, W.krem, [c.jumlah], 10)));
  return k(c.suara, ...aksi);
}
export const ADEGAN_LUAR_DV_TERAPAN: AdeganStory = {
  id: "luar-dv-terapan",
  judul: "Divisibility diterapkan pada angka buku",
  sumber: "Metode luar: Divisibility pada soal Buku Siswa",
  latar: "#FEFCE8",
  ketukan: [
    ketukanDV({
      r: 1,
      suara: "Uji dua puluh empat. Satuannya empat, genap, jadi habis dibagi dua. Dua tambah empat sama dengan enam, habis dibagi tiga, jadi juga enam. Bukan lima, bukan sembilan.",
      label: 3,
      sel: [[1, 10], [2, 19], [4, 22], [3, 24], [5, 26]],
      jumlah: "jumlah angka 24: 2 + 4 = 6",
      jumlahAt: 16,
    }),
    ketukanDV({
      r: 2,
      suara: "Dua puluh lima: satuannya lima, jadi habis dibagi lima. Dua tambah lima sama dengan tujuh, bukan kelipatan tiga atau sembilan. Satuan ganjil, jadi bukan dua dan bukan enam.",
      label: 2,
      sel: [[3, 8], [2, 17], [5, 19], [1, 24], [4, 27]],
      jumlah: "jumlah angka 25: 2 + 5 = 7",
      jumlahAt: 14,
    }),
    ketukanDV({
      r: 3,
      suara: "Dua puluh tujuh: dua tambah tujuh sama dengan sembilan. Sembilan habis dibagi tiga dan sembilan, jadi dua puluh tujuh habis dibagi tiga dan sembilan. Satuannya tujuh: bukan dua, lima, atau enam.",
      label: 2,
      sel: [[2, 12], [5, 14], [1, 27], [3, 28], [4, 30]],
      jumlah: "jumlah angka 27: 2 + 7 = 9",
      jumlahAt: 8,
    }),
    ketukanDV({
      r: 4,
      suara: "Lima puluh dua: satuannya dua, genap, jadi habis dibagi dua. Lima tambah dua sama dengan tujuh, bukan kelipatan tiga, enam, atau sembilan. Satuan bukan nol atau lima, jadi bukan lima.",
      label: 2,
      sel: [[1, 9], [2, 18], [4, 19], [5, 21], [3, 29]],
      jumlah: "jumlah angka 52: 5 + 2 = 7",
      jumlahAt: 15,
    }),
  ],
};

/* ------------------------------ 8. Sieve of Eratosthenes: konsep ------------------------------ */
const KISI = (id: string): Obj[] => kisiBilangan(id, 30, 34, 8, 40, 30, 26);
const GENAP = Array.from({ length: 19 }, (_, i) => 4 + 2 * i);
const KELIPATAN_3_BARU = [9, 15, 21, 27, 33, 39];
export const PRIMA_40 = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37];
const kartuKisi = (id: string, isi: string, warna: string = W.krem): Obj[] => kartu(id, 30, 172, 240, 24, warna, [isi], 8.8);
export const ADEGAN_LUAR_SV: AdeganStory = {
  id: "luar-sv",
  judul: "Sieve of Eratosthenes (Saringan Eratosthenes)",
  sumber: "Metode luar: Sieve of Eratosthenes",
  latar: "#F5F3FF",
  ketukan: [
    k(
      "Metode keempat, Sieve of Eratosthenes atau Saringan Eratosthenes. Tulis bilangan satu sampai empat puluh. Satu hanya punya satu faktor, bukan prima, jadi dicoret.",
      bersih(0),
      tambah(0, judul("Sieve of Eratosthenes")),
      tambah(9, ...KISI("sv")),
      tambah(20, ...kartuKisi("svc", "prima: tepat dua faktor, 1 dan dirinya", W.pink)),
      coret(22, "sv", [1]),
    ),
    k(
      "Ambil bilangan terkecil yang belum dicoret, yaitu dua. Biarkan dua, coret semua kelipatannya: empat, enam, delapan, dan seterusnya sampai empat puluh.",
      coret(9, "sv", [2], "prima"),
      ubah(12, { id: "svc-t0", isi: "coret semua kelipatan 2" }),
      coret(13, "sv", GENAP),
    ),
    k(
      "Berikutnya tiga. Biarkan tiga, coret kelipatan tiga yang tersisa: sembilan, lima belas, dua puluh satu, dua puluh tujuh, tiga puluh tiga, tiga puluh sembilan.",
      coret(3, "sv", [3], "prima"),
      ubah(8, { id: "svc-t0", isi: "coret kelipatan 3 yang tersisa" }),
      coret(8, "sv", KELIPATAN_3_BARU),
    ),
    k(
      "Lima: coret dua puluh lima dan tiga puluh lima. Tujuh tidak punya kelipatan baru sampai empat puluh. Sisanya dua belas bilangan prima.",
      coret(0, "sv", [5], "prima"),
      coret(8, "sv", [25, 35]),
      coret(9, "sv", [7], "prima"),
      coret(17, "sv", [11, 13, 17, 19, 23, 29, 31, 37], "prima"),
      ubah(21, { id: "svc-t0", isi: "12 bilangan prima sampai 40", warna: "#166534" }, { id: "svc-k", warna: WARNA_PRIMA }),
    ),
  ],
};

/* ------------------------------ 9. Sieve of Eratosthenes: penerapan ------------------------------ */
const SOROT_3 = [3, 6, 9, 12, 15, 18, 21, 24, 27];
export const SOROT_BUKU = { sw1: SOROT_3, sw2: [8, 12, 16, 20, 24], sw3: [20, 25, 30] };
export const ADEGAN_LUAR_SV_TERAPAN: AdeganStory = {
  id: "luar-sv-terapan",
  judul: "Sieve of Eratosthenes diterapkan pada angka buku",
  sumber: "Metode luar: Sieve pada soal Buku Siswa",
  latar: "#F5F3FF",
  ketukan: [
    k(
      "Pakai kisi untuk soal tujuh: kelipatan tiga yang kurang dari tiga puluh. Sorot tiga, enam, sembilan, dan seterusnya sampai dua puluh tujuh; tiga puluh tidak ikut.",
      bersih(0),
      tambah(0, judul("Soal 7: kelipatan 3 < 30")),
      tambah(1, ...KISI("sw")),
      coret(13, "sw", [3], "sorot"),
      coret(14, "sw", [6], "sorot"),
      coret(15, "sw", [9], "sorot"),
      coret(21, "sw", [12, 15, 18, 21, 24, 27], "sorot"),
      tambah(25, ...kartuKisi("swc", "jawab: 3, 6, 9, ..., 27", W.hijauMuda)),
    ),
    k(
      "Soal empat belas: kelipatan empat lebih dari tujuh dan kurang dari dua puluh lima. Sorot delapan, dua belas, enam belas, dua puluh, dan dua puluh empat.",
      bersih(0),
      tambah(0, judul("Soal 14: kelipatan 4, 7 sampai 25")),
      tambah(0, ...KISI("sw")),
      coret(14, "sw", SOROT_BUKU.sw2, "sorot"),
      tambah(14, ...kartuKisi("swc", "jawab: 8, 12, 16, 20, 24", W.hijauMuda)),
    ),
    k(
      "Latihan tiga: kelipatan lima lebih dari tujuh belas dan kurang dari tiga puluh lima. Sorot dua puluh, dua puluh lima, dan tiga puluh.",
      bersih(0),
      tambah(0, judul("Latihan 3: kelipatan 5, 17 sampai 35")),
      tambah(0, ...KISI("sw")),
      coret(14, "sw", SOROT_BUKU.sw3, "sorot"),
      tambah(14, ...kartuKisi("swc", "jawab: 20, 25, 30", W.hijauMuda)),
    ),
    k(
      "Kisi juga menjawab faktor. Dua puluh lima kena coret kelipatan lima, jadi bukan prima; faktornya satu, lima, dua puluh lima. Tiga belas tidak tercoret, prima, faktornya hanya satu dan tiga belas.",
      bersih(0),
      tambah(0, judul("Setelah disaring")),
      tambah(0, ...KISI("sw")),
      coret(0, "sw", [1, ...GENAP, ...KELIPATAN_3_BARU, 25, 35]),
      coret(0, "sw", PRIMA_40, "prima"),
      coret(6, "sw", [25], "sorot"),
      tambah(11, ...kartuKisi("swc", "25: 1, 5, 25 (bukan prima)", W.merahMuda)),
      coret(20, "sw", [13], "sorot"),
      ubah(20, { id: "swc-t0", isi: "13: hanya 1 dan 13 (prima)" }, { id: "swc-k", warna: W.hijauMuda }),
    ),
  ],
};

/* ------------------------------ 10. Ringkasan ------------------------------ */
export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan empat metode dari luar",
  sumber: "Ringkasan metode luar; Buku Siswa hlm. 48–54",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Ringkasnya. Factor Pairs menemukan semua faktor lewat pasangan. Skip Counting Multiples menemukan kelipatan lewat lompatan tetap. Divisibility menguji cepat apakah bilangan habis dibagi. Sieve of Eratosthenes menyaring kelipatan untuk menemukan bilangan prima.",
      ...daftar("rk", "Empat metode", [
        { at: "Pairs", t: "Factor Pairs: semua faktor", w: W.hijauMuda, u: 9.6 },
        { at: "Multiples", t: "Skip Counting: kelipatan", w: W.langit, u: 9.6 },
        { at: "Divisibility", t: "Divisibility: uji habis dibagi", w: W.krem, u: 9.6 },
        { at: "Sieve", t: "Sieve: saring bilangan prima", w: W.pink, u: 9.6 },
      ]),
    ),
    k(
      "Satu bilangan, empat cara. Untuk dua puluh empat: pasangan memberi delapan faktor, lompat enam sampai dua puluh empat, uji dua dan tiga berhasil, dan saringan mencoretnya, jadi bukan prima.",
      bersih(0),
      tambah(0, judul("Satu bilangan, empat cara: 24")),
      tambah("pasangan", ...kartu("rs1", 14, 36, 272, 30, W.hijauMuda, ["pasangan: 1×24, 2×12, 3×8, 4×6"], 9.2)),
      tambah("lompat", ...kartu("rs2", 14, 76, 272, 30, W.langit, ["lompat 6: 6, 12, 18, 24"], 9.6)),
      tambah("uji", ...kartu("rs3", 14, 116, 272, 30, W.krem, ["uji: habis dibagi 2 dan 3"], 9.6)),
      tambah("saringan", ...kartu("rs4", 14, 156, 272, 30, W.pink, ["saringan: dicoret, bukan prima"], 9.6)),
    ),
    k(
      "Tidak ada metode terbaik. Pilih sesuai pertanyaan: semua faktor, kelipatan berderet, uji cepat, atau bilangan prima. Keempatnya bersandar pada pembagian dan perkalian.",
      bersih(0),
      tambah(0, judul("Pilih sesuai pertanyaan")),
      tambah("faktor,", ...kartu("rt1", 14, 40, 130, 40, W.hijauMuda, ["semua faktor", "pasangan"], 9)),
      tambah("kelipatan", ...kartu("rt2", 156, 40, 130, 40, W.langit, ["kelipatan", "lompat"], 9)),
      tambah("uji", ...kartu("rt3", 14, 92, 130, 40, W.krem, ["uji cepat", "keterbagian"], 9)),
      tambah("prima.", ...kartu("rt4", 156, 92, 130, 40, W.pink, ["bilangan prima", "saringan"], 9)),
      tambah("pembagian", ...kartu("rt5", 30, 148, 240, 34, W.merahMuda, ["dasar yang sama: pembagian", "dan perkalian"], 9.4)),
    ),
  ],
};
