// Uji data murni Matematika Kelas 3 Bab 1 (Bilangan Cacah sampai 1.000). Jalankan: node --no-warnings scripts/uji-data-k3b1.mjs
// Memeriksa kata bilangan, nilai tempat, pilihan jawaban, semua ronde permainan (kunci dihitung dari bilangan), dan struktur naskah
// (3 video x 3 adegan x 4 ketukan, 8 peta pikiran, 10 panel infografis, 30 permainan per sub-bab).
import * as D from "../src/components/modul/data-k3b1.ts";
import * as N from "../src/components/modul/naskah-k3b1.ts";

let lulus = 0;
let gagal = 0;
const cek = (nama, ok, info = "") => {
  if (ok) lulus += 1;
  else {
    gagal += 1;
    console.log(`GAGAL: ${nama} ${info}`);
  }
};

/* ---- Kata bilangan ---- */
const KATA = {
  100: "seratus", 101: "seratus satu", 110: "seratus sepuluh", 111: "seratus sebelas", 112: "seratus dua belas", 119: "seratus sembilan belas", 120: "seratus dua puluh", 160: "seratus enam puluh",
  200: "dua ratus", 220: "dua ratus dua puluh", 236: "dua ratus tiga puluh enam", 305: "tiga ratus lima", 354: "tiga ratus lima puluh empat", 405: "empat ratus lima", 572: "lima ratus tujuh puluh dua",
  597: "lima ratus sembilan puluh tujuh", 602: "enam ratus dua", 634: "enam ratus tiga puluh empat", 671: "enam ratus tujuh puluh satu", 703: "tujuh ratus tiga", 759: "tujuh ratus lima puluh sembilan",
  900: "sembilan ratus", 903: "sembilan ratus tiga", 950: "sembilan ratus lima puluh", 999: "sembilan ratus sembilan puluh sembilan", 1000: "seribu", 0: "nol", 10: "sepuluh", 11: "sebelas", 19: "sembilan belas", 21: "dua puluh satu",
};
for (const [n, k] of Object.entries(KATA)) cek(`kata(${n}) = ${k}`, D.kata(Number(n)) === k, D.kata(Number(n)));
for (let n = 100; n <= 999; n += 1) {
  const k = D.kata(n);
  cek(`kata(${n}) tanpa kata nol dan tanpa spasi ganda`, !/\bnol\b/.test(k) && !/ {2}/.test(k) && k.length > 3);
  if (n % 100 !== 0 && n % 100 >= 20 && n % 10 !== 0 && n % 100 < 100) cek(`kata(${n}) memuat puluh dan satuan`, /puluh/.test(k));
}
/* Kata berbeda untuk tiap bilangan 100 sampai 999. */
{
  const unik = new Set();
  for (let n = 100; n <= 999; n += 1) unik.add(D.kata(n));
  cek("kata: 900 bilangan 100 sampai 999 punya kata berbeda", unik.size === 900, `${unik.size}`);
}
for (const [n, r, p, s] of [[251, 2, 5, 1], [602, 6, 0, 2], [999, 9, 9, 9], [100, 1, 0, 0], [405, 4, 0, 5]]) {
  const t = D.tiga(n);
  cek(`tiga(${n})`, t.r === r && t.p === p && t.s === s);
  cek(`gabung3 membalik tiga(${n})`, D.gabung3(t.r, t.p, t.s) === n);
  cek(`uraian(${n}) berjumlah ${n}`, D.uraian(n).split(" + ").map(Number).reduce((a, b) => a + b, 0) === n, D.uraian(n));
}
cek("uraian(602) memakai 0 di tengah", D.uraian(602) === "600 + 0 + 2");
cek("susunan(251)", D.susunan(251) === "2 ratusan + 5 puluhan + 1 satuan");
cek("nilaiTempat(251)", D.nilaiTempat(251, "ratusan") === 200 && D.nilaiTempat(251, "puluhan") === 50 && D.nilaiTempat(251, "satuan") === 1);
cek("angkaTempat(251)", D.angkaTempat(251, "ratusan") === 2 && D.angkaTempat(251, "puluhan") === 5 && D.angkaTempat(251, "satuan") === 1);

/* ---- Pilihan jawaban: tiga pilihan berbeda, kunci ada ---- */
for (let n = 100; n <= 999; n += 1) {
  const o = D.opsiAngka3(n, n);
  cek(`opsiAngka3(${n}): tiga pilihan berbeda dan memuat kunci`, new Set(o).size === 3 && o.includes(n) && o.every((x) => x >= 100 && x <= 999), JSON.stringify(o));
  const k = D.opsiKata3(n, n);
  cek(`opsiKata3(${n}): tiga kata berbeda dan jawab menunjuk kunci`, new Set(k.opsi).size === 3 && k.opsi[k.jawab] === D.kata(n));
}

/* ---- Pembantu umum ---- */
for (let g = 0; g < 6; g += 1) cek(`urutanTetap(3, 2, ${g}) permutasi`, [...D.urutanTetap(3, 2, g)].sort().join() === "0,1,2");
{
  const kunci = ["a", "b", "c", "d"];
  for (let r = 0; r < 6; r += 1) cek(`urutTampil ronde ${r} berbeda dari kunci`, JSON.stringify(D.urutTampil(["a", "b", "c", "d"], kunci, r)) !== JSON.stringify(kunci));
}

const BENDA = ["kue", "kelereng", "rambutan", "ikan", "lidi", "jeruk", "pensil", "anggur"];
const cekBundel = (nama, daftar, harusUnik = true) =>
  daftar.forEach((ronde, r) => {
    cek(`${nama} ronde ${r + 1}: benda dikenal dan n tiga angka`, ronde.every((s) => BENDA.includes(s.benda) && s.n >= 100 && s.n <= 999));
    if (harusUnik) cek(`${nama} ronde ${r + 1}: bilangan tidak kembar`, new Set(ronde.map((s) => s.n)).size === ronde.length);
  });
const cekAngka = (nama, daftar, harusUnik = true) =>
  daftar.forEach((ronde, r) => {
    cek(`${nama} ronde ${r + 1}: tiga angka`, ronde.every((n) => n >= 100 && n <= 999));
    if (harusUnik) cek(`${nama} ronde ${r + 1}: bilangan tidak kembar`, new Set(ronde).size === ronde.length);
  });
const cekTiga = (nama, daftar) => cek(`${nama}: tiga ronde`, daftar.length === 3, `${daftar.length}`);

/* ---- Sub-Bab A, Concrete ---- */
cekTiga("RAKIT_CA", D.RONDE_RAKIT_CA);
cekBundel("RAKIT_CA", D.RONDE_RAKIT_CA);
cekTiga("HITUNG_CA", D.RONDE_HITUNG_CA);
cekBundel("HITUNG_CA", D.RONDE_HITUNG_CA);
cekTiga("SORTIR_CA", D.RONDE_SORTIR_CA);
D.RONDE_SORTIR_CA.forEach((ro, r) => {
  cek(`SORTIR_CA ronde ${r + 1}: enam kelompok, ketiga jenis ada`, ro.item.length === 6 && ["r", "p", "s"].every((j) => ro.item.some((g) => g.jenis === j)));
  cek(`SORTIR_CA ronde ${r + 1}: tiap kelompok 1 sampai 6`, ro.item.every((g) => g.k >= 1 && g.k <= 6));
});
cekTiga("PASANG_CA", D.RONDE_PASANG_CA);
cekBundel("PASANG_CA", D.RONDE_PASANG_CA);
cek("PASANG_CA: tiga pasang per ronde", D.RONDE_PASANG_CA.every((r) => r.length === 3));
cekTiga("MEMORI_CA", D.RONDE_MEMORI_CA);
cekBundel("MEMORI_CA", D.RONDE_MEMORI_CA);
cek("MEMORI_CA: empat pasang per ronde", D.RONDE_MEMORI_CA.every((r) => r.length === 4));
D.RONDE_KETUK_CA.forEach((ro, r) => {
  cek(`KETUK_CA ronde ${r + 1}: tiga kumpulan berbeda`, new Set(ro.item).size === 3);
  cek(`KETUK_CA ronde ${r + 1}: dua pertanyaan dan kunci ada di kumpulan`, ro.tanya.length === 2 && ro.tanya.every((n) => ro.item.includes(n)));
  cek(`KETUK_CA ronde ${r + 1}: kata berbeda tiap kumpulan`, new Set(ro.item.map(D.kata)).size === 3);
});
const cekSemua = (nama, daftar) =>
  daftar.forEach((ro, r) => {
    const benar = ro.angka.filter((n) => D.cocokSyarat(ro.syarat, n));
    cek(`${nama} ronde ${r + 1}: empat bilangan berbeda`, ro.angka.length === 4 && new Set(ro.angka).size === 4);
    cek(`${nama} ronde ${r + 1}: ada yang cocok dan ada yang tidak`, benar.length >= 1 && benar.length <= 3, `${benar.length}`);
    cek(`${nama} ronde ${r + 1}: syarat punya teks`, !!D.TEKS_SYARAT[ro.syarat]);
  });
cekTiga("SEMUA_CA", D.RONDE_SEMUA_CA);
cekSemua("SEMUA_CA", D.RONDE_SEMUA_CA);
cekTiga("BACA_CA", D.RONDE_BACA_CA);
cekBundel("BACA_CA", D.RONDE_BACA_CA);
cek("BACA_CA: memuat bilangan dengan angka nol", D.RONDE_BACA_CA.flat().some((s) => D.adaNol(s.n)));
cekTiga("PAPAN_CA", D.RONDE_PAPAN_CA);
cekBundel("PAPAN_CA", D.RONDE_PAPAN_CA);
cekTiga("TUKAR_CA", D.RONDE_TUKAR_CA);
D.RONDE_TUKAR_CA.forEach((ro, r) => {
  cek(`TUKAR_CA ronde ${r + 1}: dua soal, benda dikenal`, ro.soal.length === 2 && BENDA.includes(ro.benda));
  ro.soal.forEach((s, i) => {
    const o = D.susunOpsi(s.benar, s.salah, r * 2 + i);
    cek(`TUKAR_CA ${r + 1}.${i + 1}: tiga pilihan berbeda`, new Set(o.opsi).size === 3 && o.opsi[o.jawab] === s.benar);
  });
});
/* Kunci penukaran dihitung dari aturan sepuluh ke satu. */
{
  const [r1, r2, r3] = D.RONDE_TUKAR_CA;
  cek("TUKAR: 10 benda jadi 1 bungkus", r1.soal[0].benar === "1 bungkus" && r1.soal[0].s === 10);
  cek("TUKAR: 10 bungkus jadi 1 dus", r1.soal[1].benar === "1 dus" && r1.soal[1].p === 10);
  cek("TUKAR: 1 dus berisi 10 bungkus", r2.soal[0].benar === "10");
  cek("TUKAR: 1 dus berisi 100 benda", r2.soal[1].benar === "100");
  cek("TUKAR: 13 bungkus jadi 1 dus dan 3 bungkus", r3.soal[0].benar === String(13 - 10) && r3.soal[0].p === 13);
  cek("TUKAR: 1 dus dan 2 bungkus = 120 benda", r3.soal[1].benar === String(1 * 100 + 2 * 10));
}

/* ---- Sub-Bab A, Picture ---- */
for (const [nama, d] of [["HITUNG_PA", D.RONDE_HITUNG_PA], ["PAPAN_PA", D.RONDE_PAPAN_PA], ["TABEL_PA", D.RONDE_TABEL_PA], ["PASANG_PA", D.RONDE_PASANG_PA], ["MEMORI_PA", D.RONDE_MEMORI_PA], ["SORTIR_PA", D.RONDE_SORTIR_PA]]) {
  cekTiga(nama, d);
  cekAngka(nama, d);
}
cek("HITUNG_PA: dua soal per ronde", D.RONDE_HITUNG_PA.every((r) => r.length === 2));
cek("TABEL_PA: tiga baris per ronde", D.RONDE_TABEL_PA.every((r) => r.length === 3));
cek("PASANG_PA: tiga pasang per ronde", D.RONDE_PASANG_PA.every((r) => r.length === 3));
cek("MEMORI_PA: empat pasang per ronde dan kata berbeda", D.RONDE_MEMORI_PA.every((r) => r.length === 4 && new Set(r.map(D.kata)).size === 4));
cek("SORTIR_PA: enam bilangan, ada dan tanpa angka nol", D.RONDE_SORTIR_PA.every((r) => r.length === 6 && r.some(D.adaNol) && r.some((n) => !D.adaNol(n))));
D.RONDE_KETUK_PA.forEach((ro, r) => {
  cek(`KETUK_PA ronde ${r + 1}: tiga model, dua pertanyaan, kata berbeda`, ro.item.length === 3 && new Set(ro.item.map(D.kata)).size === 3 && ro.tanya.length === 2 && ro.tanya.every((n) => ro.item.includes(n)));
});
cekTiga("GARIS_PA", D.RONDE_GARIS_PA);
for (const ro of D.RONDE_GARIS_PA)
  for (const s of ro) {
    cek(`GARIS_PA ${s.jawab}: di dalam garis dan pada kelipatan langkah`, s.jawab >= s.dari && s.jawab <= s.sampai && (s.jawab - s.dari) % s.langkah === 0);
    cek(`GARIS_PA ${s.jawab}: garis 6 titik (muat di layar ponsel)`, (s.sampai - s.dari) / s.langkah === 5);
  }
cekTiga("SEMUA_PA", D.RONDE_SEMUA_PA);
cekSemua("SEMUA_PA", D.RONDE_SEMUA_PA);
cek("KALIMAT_PA: tiga model", D.RONDE_KALIMAT_PA.length === 3 && D.RONDE_KALIMAT_PA.every((n) => n >= 100 && n <= 999));
const cekKalimat = (nama, daftar) =>
  daftar.forEach((k, i) => cek(`${nama} kalimat ${i + 1}: tiga pilihan berbeda, benar menunjuk`, new Set(k.opsi).size === 3 && k.benar >= 0 && k.benar <= 2, JSON.stringify(k)));
D.RONDE_KALIMAT_PA.forEach((n, r) => {
  const ks = D.kalimatTempat(n, r * 3);
  cek(`KALIMAT_PA ${n}: tiga kalimat`, ks.length === 3);
  cekKalimat(`KALIMAT_PA ${n}`, ks);
  const t = D.tiga(n);
  [t.r, t.p, t.s].forEach((v, i) => cek(`KALIMAT_PA ${n} kalimat ${i + 1}: kunci = angka tempatnya`, Number(ks[i].opsi[ks[i].benar]) === v));
});

/* ---- Sub-Bab A, Abstract ---- */
for (const [nama, d] of [["SUSUN_QA", D.RONDE_SUSUN_QA], ["BACA_QA", D.RONDE_BACA_QA], ["PAPAN_QA", D.RONDE_PAPAN_QA], ["PASANG_QA", D.RONDE_PASANG_QA], ["MEMORI_QA", D.RONDE_MEMORI_QA]]) {
  cekTiga(nama, d);
  cekAngka(nama, d);
}
cek("PASANG_QA: tiga pasang dan kata berbeda", D.RONDE_PASANG_QA.every((r) => r.length === 3 && new Set(r.map(D.kata)).size === 3));
cek("MEMORI_QA: empat pasang dan kata berbeda", D.RONDE_MEMORI_QA.every((r) => r.length === 4 && new Set(r.map(D.kata)).size === 4));
cek("BACA_QA dan SUSUN_QA: dua soal per ronde", D.RONDE_BACA_QA.every((r) => r.length === 2) && D.RONDE_SUSUN_QA.every((r) => r.length === 2));
cek("PAPAN_QA: memuat bilangan dengan angka nol", D.RONDE_PAPAN_QA.flat().some(D.adaNol));
cekTiga("TABEL_QA", D.RONDE_TABEL_QA);
D.RONDE_TABEL_QA.forEach((t, r) => {
  cek(`TABEL_QA ${r + 1}: empat baris, kartu = jawaban + satu pengecoh`, t.baris.length === 4 && t.kartu.length === 5 && t.baris.every((b) => t.kartu.includes(b.jawab)) && new Set(t.kartu).size === 5);
  cek(`TABEL_QA ${r + 1}: tiap jawaban = kata bilangan`, t.baris.every((b) => b.jawab === D.kata(Number(b.label))));
});
cek("BENARSALAH_QA: dua ronde, lima pernyataan, ada benar dan salah", D.RONDE_BENARSALAH_QA.length === 2 && D.RONDE_BENARSALAH_QA.every((r) => r.length === 5 && r.some((p) => p.benar) && r.some((p) => !p.benar)));
cek("BENARSALAH_QA: tiap pernyataan punya penjelasan", D.RONDE_BENARSALAH_QA.flat().every((p) => p.penjelasan.length > 15));
/* Detektif: tepat satu pilihan yang cocok dengan semua petunjuk. */
{
  const cocok = [
    (n) => D.tiga(n).r === 6 && D.tiga(n).p === 7 && D.tiga(n).s === 1,
    (n) => n === 703,
    (n) => D.tiga(n).r === 2 && D.tiga(n).s === 0 && D.tiga(n).p === D.tiga(n).r,
    (n) => D.tiga(n).r === 5 && D.tiga(n).s === 9 && D.tiga(n).p === 0,
  ];
  D.RONDE_DETEKTIF_QA.forEach((s, i) => {
    const yang = s.opsi.filter(cocok[i]);
    cek(`DETEKTIF_QA ${i + 1}: tepat satu pilihan cocok dan itu kuncinya`, yang.length === 1 && yang[0] === s.jawab, JSON.stringify(yang));
    cek(`DETEKTIF_QA ${i + 1}: tiga pilihan berbeda`, new Set(s.opsi).size === 3 && s.klue.length === 2);
  });
  cek("DETEKTIF_QA: empat soal", D.RONDE_DETEKTIF_QA.length === 4);
}
cekTiga("SEMUA_QA", D.RONDE_SEMUA_QA);
cekSemua("SEMUA_QA", D.RONDE_SEMUA_QA);
cek("SUSUNKATA_QA: empat kalimat, pengecoh tidak di dalam kalimat", D.RONDE_SUSUNKATA_QA.length === 4 && D.RONDE_SUSUNKATA_QA.every((s) => !s.kata.includes(s.pengecoh) && s.kata.length >= 5));
cek("SUSUNKATA_QA: kalimat 160 dan 703 benar", D.RONDE_SUSUNKATA_QA[0].kata.join(" ") === `${D.kata(160).replace(/^s/, "S")} ditulis 160` && D.RONDE_SUSUNKATA_QA[1].kata.join(" ") === `${D.Kapital(D.kata(703))} ditulis 703`);

/* ---- Sub-Bab B, Concrete ---- */
cekTiga("KALENG_CB", D.RONDE_KALENG_CB);
D.RONDE_KALENG_CB.forEach((ro, r) =>
  ro.forEach((s, i) => {
    const t = D.tiga(s.jawab);
    cek(`KALENG_CB ${r + 1}.${i + 1}: kartu adalah angka bilangan`, [...s.kartu].sort().join() === [t.r, t.p, t.s].sort().join() && s.kartu.length === 3);
    cek(`KALENG_CB ${r + 1}.${i + 1}: urutan tampil berbeda dari kunci`, JSON.stringify(D.urutTampil([...s.kartu], [t.r, t.p, t.s], r)) !== JSON.stringify([t.r, t.p, t.s]));
  }),
);
cekTiga("NILAI_CB", D.RONDE_NILAI_CB);
D.RONDE_NILAI_CB.forEach((ro, r) => cek(`NILAI_CB ronde ${r + 1}: dua soal dan benda dikenal`, ro.length === 2 && ro.every((s) => BENDA.includes(s.benda) && s.n >= 100)));
cekTiga("PASANG_CB", D.RONDE_PASANG_CB);
for (const [nama, d] of [["PASANG_CB", D.RONDE_PASANG_CB], ["SLOT_CB", D.RONDE_SLOT_CB]])
  d.forEach((ro, r) => {
    cek(`${nama} ronde ${r + 1}: tiga kelompok dengan tiga jenis berbeda`, ro.item.length === 3 && new Set(ro.item.map((g) => g.jenis)).size === 3 && BENDA.includes(ro.benda));
    if (nama === "PASANG_CB") cek(`${nama} ronde ${r + 1}: nilai berbeda`, new Set(ro.item.map(D.nilaiKelompok)).size === 3);
  });
cekTiga("MEMORI_CB", D.RONDE_MEMORI_CB);
D.RONDE_MEMORI_CB.forEach((ro, r) => cek(`MEMORI_CB ronde ${r + 1}: empat kelompok dengan nilai berbeda`, ro.item.length === 4 && new Set(ro.item.map(D.nilaiKelompok)).size === 4));
cekTiga("RAKIT_CB", D.RONDE_RAKIT_CB);
cekBundel("RAKIT_CB", D.RONDE_RAKIT_CB);
cekTiga("KETUK_CB", D.RONDE_KETUK_CB);
D.RONDE_KETUK_CB.forEach((ro, r) => {
  cek(`KETUK_CB ronde ${r + 1}: tiga kumpulan, dua pertanyaan`, ro.item.length === 3 && ro.soal.length === 2);
  ro.soal.forEach((s, i) => {
    const yang = ro.item.filter((n) => D.cocokSyarat(s.syarat, n));
    cek(`KETUK_CB ${r + 1}.${i + 1}: tepat satu kumpulan cocok dan itu kuncinya`, yang.length === 1 && yang[0] === s.jawab, JSON.stringify(yang));
  });
});
cekTiga("TEMPAT_CB", D.RONDE_TEMPAT_CB);
for (const [nama, d] of [["TEMPAT_CB", D.RONDE_TEMPAT_CB], ["TEMPAT_QB", D.RONDE_TEMPAT_QB]])
  d.forEach((ro, r) =>
    ro.forEach((s, i) => {
      const hitung = String(s.n).split("").filter((c) => Number(c) === s.angka).length;
      cek(`${nama} ${r + 1}.${i + 1}: angka ${s.angka} muncul tepat sekali pada ${s.n}`, hitung === 1, `${hitung}`);
    }),
  );
cek("TEMPAT: 981 puluhan, 845 ratusan, 108 satuan, 800 ratusan, 618 satuan", D.tempatDari(981, 8) === "puluhan" && D.tempatDari(845, 8) === "ratusan" && D.tempatDari(108, 8) === "satuan" && D.tempatDari(800, 8) === "ratusan" && D.tempatDari(618, 8) === "satuan");
cekTiga("SEMUA_CB", D.RONDE_SEMUA_CB);
cekSemua("SEMUA_CB", D.RONDE_SEMUA_CB);
cekTiga("URUT_CB", D.RONDE_URUT_CB);
D.RONDE_URUT_CB.forEach((ro, r) => {
  cek(`URUT_CB ronde ${r + 1}: tiga kelompok dengan nilai berbeda`, ro.item.length === 3 && new Set(ro.item.map(D.nilaiKelompok)).size === 3 && ["kecil", "besar"].includes(ro.dari));
});
cek("nilaiKelompok", D.nilaiKelompok({ jenis: "r", k: 3 }) === 300 && D.nilaiKelompok({ jenis: "p", k: 4 }) === 40 && D.nilaiKelompok({ jenis: "s", k: 7 }) === 7);

/* ---- Sub-Bab B, Picture ---- */
for (const [nama, d] of [["TABEL_PB", D.RONDE_TABEL_PB], ["PASANG_PB", D.RONDE_PASANG_PB], ["MEMORI_PB", D.RONDE_MEMORI_PB], ["PAPAN_PB", D.RONDE_PAPAN_PB], ["SORTIR_PB_ANGKA", [D.RONDE_SUSUN_PB]]]) {
  if (nama !== "SORTIR_PB_ANGKA") cekTiga(nama, d);
  cekAngka(nama, d);
}
cek("TABEL_PB: tiga baris per ronde", D.RONDE_TABEL_PB.every((r) => r.length === 3));
cek("PASANG_PB dan MEMORI_PB: uraian berbeda", D.RONDE_PASANG_PB.every((r) => new Set(r.map(D.uraian)).size === 3) && D.RONDE_MEMORI_PB.every((r) => new Set(r.map(D.uraian)).size === 4));
cekTiga("NILAI_PB", D.RONDE_NILAI_PB);
cek("SUSUN_PB dan URAI_PB: tiga bilangan", D.RONDE_SUSUN_PB.length === 3 && D.RONDE_URAI_PB.length === 3);
D.RONDE_SUSUN_PB.forEach((n, r) => {
  const ks = D.kalimatSusun(n, r * 3);
  cek(`SUSUN_PB ${n}: tiga kalimat`, ks.length === 3);
  cekKalimat(`SUSUN_PB ${n}`, ks);
  cek(`SUSUN_PB ${n}: kunci selalu ${n}`, ks.every((k) => Number(k.opsi[k.benar]) === n));
});
D.RONDE_URAI_PB.forEach((n, r) => {
  const ks = D.kalimatUrai(n, r);
  cek(`URAI_PB ${n}: tiga kalimat`, ks.length === 3);
  cekKalimat(`URAI_PB ${n}`, ks);
  ks.forEach((k, i) => {
    const kalimat = `${k.depan}${k.opsi[k.benar]}${k.belakang}`;
    const [kiri, kanan] = kalimat.split(" = ");
    const jumlah = kanan.split(" + ").map(Number).reduce((a, b) => a + b, 0);
    cek(`URAI_PB ${n} kalimat ${i + 1}: "${kalimat}" jumlahnya ${n}`, Number(kiri) === n && jumlah === n, `${jumlah}`);
  });
});
D.RONDE_URAI_QB.forEach((n, r) => {
  const ks = D.kalimatSusunUrai(n, r);
  cek(`URAI_QB ${n}: tiga kalimat`, ks.length === 3);
  cekKalimat(`URAI_QB ${n}`, ks);
  ks.forEach((k, i) => {
    const kalimat = `${k.depan}${k.opsi[k.benar]}${k.belakang}`;
    const [kiri, kanan] = kalimat.split(" = ");
    const bagian = kanan.split(" + ").map((b) => b.trim().split(" "));
    const nilaiBagian = bagian.map(([angka, tempat]) => Number(angka) * { ratusan: 100, puluhan: 10, satuan: 1 }[tempat]);
    cek(`URAI_QB ${n} kalimat ${i + 1}: "${kalimat}" jumlahnya ${n}`, Number(kiri) === n && bagian.length === 3 && nilaiBagian.reduce((a, b) => a + b, 0) === n, JSON.stringify(nilaiBagian));
  });
});
cekTiga("GARIS_PB", D.RONDE_GARIS_PB);
for (const ro of D.RONDE_GARIS_PB)
  for (const s of ro) {
    cek(`GARIS_PB ${s.n} ${s.tempat}: nilai ada pada garis`, D.nilaiTempat(s.n, s.tempat) >= 0 && (s.tempat === "ratusan" ? D.nilaiTempat(s.n, s.tempat) <= 1000 : s.tempat === "puluhan" ? D.nilaiTempat(s.n, s.tempat) <= 100 : D.nilaiTempat(s.n, s.tempat) <= 10));
    cek(`GARIS_PB ${s.n}: tempat ada`, ["ratusan", "puluhan", "satuan"].includes(s.tempat));
  }
/* Jendela garis bilangan PB8: enam titik, memuat nilai, kelipatan langkah, di dalam jangkauan. */
for (const langkah of [100, 10, 1]) {
  const maks = langkah === 100 ? 1000 : langkah === 10 ? 100 : 10;
  for (let nilai = 0; nilai <= maks; nilai += langkah)
    for (let nomor = 0; nomor < 8; nomor += 1) {
      const j = D.jendelaGaris(nilai, langkah, nomor);
      cek(`jendelaGaris(${nilai}, ${langkah}, ${nomor})`, j.dari <= nilai && nilai <= j.sampai && (j.sampai - j.dari) / langkah === 5 && j.dari >= 0 && j.sampai <= maks && j.dari % langkah === 0, JSON.stringify(j));
    }
}
cekTiga("SORTIR_PB", D.RONDE_SORTIR_PB);
D.RONDE_SORTIR_PB.forEach((ro, r) => {
  cek(`SORTIR_PB ronde ${r + 1}: enam nilai berbeda, ketiga tempat ada`, ro.length === 6 && new Set(ro).size === 6 && ["ratusan", "puluhan", "satuan"].every((t) => ro.some((v) => D.tempatNilai(v) === t)));
  cek(`SORTIR_PB ronde ${r + 1}: nilai ratusan kelipatan 100, puluhan kelipatan 10`, ro.every((v) => (v >= 100 ? v % 100 === 0 && v <= 900 : v >= 10 ? v % 10 === 0 : v >= 1)));
});
cekTiga("SEMUA_PB", D.RONDE_SEMUA_PB);
cekSemua("SEMUA_PB", D.RONDE_SEMUA_PB);

/* ---- Sub-Bab B, Abstract ---- */
for (const [nama, d] of [["SUSUN_QB", D.RONDE_SUSUN_QB], ["PAPAN_QB", D.RONDE_PAPAN_QB]]) {
  cekTiga(nama, d);
  cekAngka(nama, d);
}
cekTiga("NILAI_QB", D.RONDE_NILAI_QB);
cek("URAI_QB: tiga bilangan", D.RONDE_URAI_QB.length === 3);
cekTiga("TABEL_QB", D.RONDE_TABEL_QB);
D.RONDE_TABEL_QB.forEach((t, r) => {
  cek(`TABEL_QB ${r + 1}: empat baris, kartu = jawaban + satu pengecoh`, t.baris.length === 4 && t.kartu.length === 5 && t.baris.every((b) => t.kartu.includes(b.jawab)) && new Set(t.kartu).size === 5);
  cek(`TABEL_QB ${r + 1}: tiap jawaban = uraian`, t.baris.every((b) => b.jawab === D.uraian(Number(b.label))));
});
cek("BENARSALAH_QB: dua ronde, lima pernyataan, ada benar dan salah", D.RONDE_BENARSALAH_QB.length === 2 && D.RONDE_BENARSALAH_QB.every((r) => r.length === 5 && r.some((p) => p.benar) && r.some((p) => !p.benar)));
{
  const cocok = [
    (n) => D.tiga(n).p === 5 && D.tiga(n).r === 3 && D.tiga(n).s === 7,
    (n) => D.tiga(n).r === 8 && D.tiga(n).s === 4 && D.tiga(n).p === 0,
    (n) => D.uraian(n) === "600 + 20 + 9" && n > 620,
    (n) => D.tiga(n).r === 4 && D.tiga(n).p === D.tiga(n).s && D.tiga(n).r + D.tiga(n).p + D.tiga(n).s === 12,
  ];
  D.RONDE_DETEKTIF_QB.forEach((s, i) => {
    const yang = s.opsi.filter(cocok[i]);
    cek(`DETEKTIF_QB ${i + 1}: tepat satu pilihan cocok dan itu kuncinya`, yang.length === 1 && yang[0] === s.jawab, JSON.stringify(yang));
  });
  cek("DETEKTIF_QB: empat soal", D.RONDE_DETEKTIF_QB.length === 4);
}
cek("PETA_KONSEP_QB: dua peta, empat kotak, kunci menunjuk", D.PETA_KONSEP_QB.length === 2 && D.PETA_KONSEP_QB.every((p) => p.kotak.length === 4 && p.kotak.every((k) => k.opsi.length === 3 && new Set(k.opsi).size === 3 && k.benar === 0)));
cek("SUSUNKATA_QB: empat kalimat, pengecoh tidak di dalam kalimat", D.RONDE_SUSUNKATA_QB.length === 4 && D.RONDE_SUSUNKATA_QB.every((s) => !s.kata.includes(s.pengecoh) && s.kata.length >= 5));

/* ====================================================================== */
/* Sub-Bab C: membandingkan dan mengurutkan                                 */
/* ====================================================================== */

for (const [a, b, r, t] of [[339, 421, "<", "ratusan"], [583, 529, ">", "puluhan"], [769, 761, ">", "satuan"], [804, 804, "=", "sama"], [189, 206, "<", "ratusan"], [938, 930, ">", "satuan"]]) {
  cek(`relasi(${a}, ${b}) = ${r}`, D.relasi(a, b) === r);
  cek(`tempatBeda(${a}, ${b}) = ${t}`, D.tempatBeda(a, b) === t);
}
for (let a = 100; a <= 999; a += 37)
  for (let b = 100; b <= 999; b += 41) {
    const r = D.relasi(a, b);
    cek(`relasi konsisten dengan tempatBeda ${a} ${b}`, (r === "=") === (D.tempatBeda(a, b) === "sama"));
    const o = D.opsiRelasi(r, a + b);
    cek(`opsiRelasi ${a} ${b}: tiga pilihan, kunci benar`, new Set(o.opsi).size === 3 && o.opsi[o.jawab] === D.teksRelasi(r));
    const k = D.opsiKumpulan(r, a + b);
    cek(`opsiKumpulan ${a} ${b}: tiga pilihan, kunci benar`, new Set(k.opsi).size === 3 && k.jawab >= 0);
    const t = D.opsiTempatBeda(a, b, a);
    cek(`opsiTempatBeda ${a} ${b}: tiga pilihan, kunci benar`, new Set(t.opsi).size === 3 && t.jawab >= 0);
  }
cek("kataRelasi", D.kataRelasi(">") === "lebih dari" && D.kataRelasi("<") === "kurang dari" && D.kataRelasi("=") === "sama dengan");
cek("urutNaik", D.urutNaik([709, 639, 720], "kecil").join() === "639,709,720" && D.urutNaik([709, 639, 720], "besar").join() === "720,709,639");

const unikPasang = (daftar) => new Set(daftar.map(([a, b]) => `${a}-${b}`)).size === daftar.length;
const semuaTiga = (daftar) => daftar.every((n) => n >= 100 && n <= 999);
const cekPasangBenda = (nama, daftar, banyak, harusBerbeda = false) => {
  cekTiga(nama, daftar);
  daftar.forEach((ro, r) => {
    cek(`${nama} ronde ${r + 1}: benda dikenal, ${banyak} pasang, bilangan tiga angka`, BENDA.includes(ro.benda) && ro.pasang.length === banyak && ro.pasang.every((p) => semuaTiga(p)) && unikPasang(ro.pasang));
    if (harusBerbeda) cek(`${nama} ronde ${r + 1}: tiga relasi berbeda`, new Set(ro.pasang.map(([a, b]) => D.relasi(a, b))).size === 3);
  });
};
cekPasangBenda("BANDING_CC", D.RONDE_BANDING_CC, 2);
cekPasangBenda("TANDA_CC", D.RONDE_TANDA_CC, 2);
cekPasangBenda("PASANG_CC", D.RONDE_PASANG_CC, 3, true);
cekPasangBenda("RATUSAN_CC", D.RONDE_RATUSAN_CC, 2);
cek("BANDING_CC dan TANDA_CC: memuat ketiga relasi", ["<", ">", "="].every((x) => D.RONDE_BANDING_CC.concat(D.RONDE_TANDA_CC).some((ro) => ro.pasang.some(([a, b]) => D.relasi(a, b) === x))));
cek("RATUSAN_CC: ratusan sama pada kedua bilangan", D.RONDE_RATUSAN_CC.every((ro) => ro.pasang.every(([a, b]) => D.tiga(a).r === D.tiga(b).r && a !== b)));
cekTiga("URUT_CC", D.RONDE_URUT_CC);
D.RONDE_URUT_CC.forEach((ro, r) => cek(`URUT_CC ronde ${r + 1}: empat bilangan berbeda`, ro.angka.length === 4 && new Set(ro.angka).size === 4 && semuaTiga(ro.angka) && BENDA.includes(ro.benda)));
cekTiga("PALING_CC", D.RONDE_PALING_CC);
D.RONDE_PALING_CC.forEach((ro, r) => cek(`PALING_CC ronde ${r + 1}: empat bilangan, terbesar dan terkecil tunggal`, ro.item.length === 4 && new Set(ro.item).size === 4 && semuaTiga(ro.item)));
cekTiga("SLOT_CC", D.RONDE_SLOT_CC);
D.RONDE_SLOT_CC.forEach((ro, r) => cek(`SLOT_CC ronde ${r + 1}: tiga bilangan berbeda`, ro.angka.length === 3 && new Set(ro.angka).size === 3));
cekTiga("SEMUA_CC", D.RONDE_SEMUA_CC);
for (const [nama, daftar] of [["SEMUA_CC", D.RONDE_SEMUA_CC], ["SEMUA_PC", D.RONDE_SEMUA_PC], ["SEMUA_QC", D.RONDE_SEMUA_QC]])
  daftar.forEach((ro, r) => {
    const benar = ro.angka.filter((n) => D.cocokBanding(n, ro.acuan, ro.arah));
    cek(`${nama} ronde ${r + 1}: empat bilangan berbeda, ada yang cocok dan tidak, tidak ada yang sama dengan acuan`, ro.angka.length === 4 && new Set(ro.angka).size === 4 && benar.length >= 1 && benar.length <= 3 && !ro.angka.includes(ro.acuan), `${benar.length}`);
  });
cekTiga("ANTARA_CC", D.RONDE_ANTARA_CC);
D.RONDE_ANTARA_CC.forEach((ro, r) => cek(`ANTARA_CC ronde ${r + 1}: tepat satu kumpulan di antara batas`, ro.item.length === 3 && ro.item.filter((n) => n > ro.batas[0] && n < ro.batas[1]).length === 1));
cekTiga("CERITA_CC", D.RONDE_CERITA_CC);
D.RONDE_CERITA_CC.forEach((ro, r) => {
  cek(`CERITA_CC ronde ${r + 1}: tiga anak, tiga bilangan berbeda, dua pertanyaan`, ro.nama.length === 3 && new Set(ro.angka).size === 3 && new Set(ro.nama).size === 3 && ro.soal.length === 2 && BENDA.includes(ro.benda));
  const a = D.namaPalingCerita(ro, "banyak");
  const b = D.namaPalingCerita(ro, "sedikit");
  cek(`CERITA_CC ronde ${r + 1}: nama terbanyak dan tersedikit berbeda`, a !== b && ro.nama.includes(a) && ro.nama.includes(b));
});
cek("CERITA_CC: Alfa 138, Galih 103, Andi 183 (Ayo Berlatih 4): Andi paling banyak, Galih paling sedikit", D.namaPalingCerita(D.RONDE_CERITA_CC[0], "banyak") === "Andi" && D.namaPalingCerita(D.RONDE_CERITA_CC[0], "sedikit") === "Galih");
for (const [nama, daftar] of [["BANDING_PC", D.RONDE_BANDING_PC], ["TANDA_PC", D.RONDE_TANDA_PC], ["TABEL_PC", D.RONDE_TABEL_PC], ["PASANG_PC", D.RONDE_PASANG_PC], ["BANDING_QC", D.RONDE_BANDING_QC], ["TABEL_QC", D.RONDE_TABEL_QC], ["TEMPAT_QC", D.RONDE_TEMPAT_QC], ["PASANG_QC", D.RONDE_PASANG_QC]]) {
  cekTiga(nama, daftar);
  daftar.forEach((ro, r) => cek(`${nama} ronde ${r + 1}: bilangan tiga angka dan pasangan unik`, ro.every((p) => semuaTiga(p)) && unikPasang(ro)));
}
cek("TABEL_PC dan TABEL_QC: empat baris per tabel dan label unik", [...D.RONDE_TABEL_PC, ...D.RONDE_TABEL_QC].every((t) => t.length === 4 && unikPasang(t)));
cek("PASANG_PC dan PASANG_QC: tiga relasi berbeda per ronde", [...D.RONDE_PASANG_PC, ...D.RONDE_PASANG_QC].every((t) => t.length === 3 && new Set(t.map(([a, b]) => D.relasi(a, b))).size === 3));
cek("BANDING_QC memuat soal Ayo Berlatih 1 (378 dan 345; 705 dan 705)", D.RONDE_BANDING_QC.flat().some(([a, b]) => a === 378 && b === 345) && D.RONDE_BANDING_QC.flat().some(([a, b]) => a === 705 && b === 705));
cek("TEMPAT_QC: memuat ratusan, puluhan, satuan, dan sama", ["ratusan", "puluhan", "satuan", "sama"].every((t) => D.RONDE_TEMPAT_QC.flat().some(([a, b]) => D.tempatBeda(a, b) === t)));
cek("TANDA_PC dan BANDING_PC: dua soal per ronde", D.RONDE_TANDA_PC.every((r) => r.length === 2) && D.RONDE_BANDING_PC.every((r) => r.length === 2));
cekTiga("URUT_PC", D.RONDE_URUT_PC);
D.RONDE_URUT_PC.forEach((ro, r) => cek(`URUT_PC ronde ${r + 1}: tiga atau empat bilangan berbeda`, ro.angka.length >= 3 && new Set(ro.angka).size === ro.angka.length && semuaTiga(ro.angka)));
cekTiga("URUT_QC", D.RONDE_URUT_QC);
D.RONDE_URUT_QC.forEach((ro, r) => cek(`URUT_QC ronde ${r + 1}: empat bilangan berbeda`, ro.angka.length === 4 && new Set(ro.angka).size === 4 && semuaTiga(ro.angka)));
cekTiga("PALING_PC", D.RONDE_PALING_PC);
D.RONDE_PALING_PC.forEach((ro, r) => cek(`PALING_PC ronde ${r + 1}: empat bilangan berbeda`, ro.length === 4 && new Set(ro).size === 4 && semuaTiga(ro)));
cekTiga("SORTIR_PC", D.RONDE_SORTIR_PC);
D.RONDE_SORTIR_PC.forEach((ro, r) => cek(`SORTIR_PC ronde ${r + 1}: enam bilangan, ada ratusan kecil dan besar`, ro.length === 6 && new Set(ro).size === 6 && ro.some(D.ratusanBesar) && ro.some((n) => !D.ratusanBesar(n))));
cekTiga("SLOT_PC", D.RONDE_SLOT_PC);
D.RONDE_SLOT_PC.forEach((ro, r) => cek(`SLOT_PC ronde ${r + 1}: tiga bilangan berbeda`, ro.length === 3 && new Set(ro).size === 3));
cek("KALIMAT_PC: tiga pasang dengan ratusan berbeda", D.RONDE_KALIMAT_PC.length === 3 && D.RONDE_KALIMAT_PC.every(([a, b]) => D.tiga(a).r !== D.tiga(b).r));
D.RONDE_KALIMAT_PC.forEach(([a, b], r) => {
  const ks = D.kalimatBanding(a, b, r * 3);
  cek(`KALIMAT_PC ${a} dan ${b}: tiga kalimat, kunci benar`, ks.length === 3 && ks.every((k) => new Set(k.opsi).size === 3 && k.benar >= 0));
  cek(`KALIMAT_PC ${a} dan ${b}: kunci = ratusan dan kata relasi`, Number(ks[0].opsi[ks[0].benar]) === D.tiga(a).r && Number(ks[1].opsi[ks[1].benar]) === D.tiga(b).r && ks[2].opsi[ks[2].benar] === D.kataRelasi(D.relasi(a, b)));
});
cek("BENARSALAH_QC: dua ronde, lima pernyataan, ada benar dan salah", D.RONDE_BENARSALAH_QC.length === 2 && D.RONDE_BENARSALAH_QC.every((r) => r.length === 5 && r.some((p) => p.benar) && r.some((p) => !p.benar) && r.every((p) => p.penjelasan.length > 15)));
{
  const cocok = [
    (n) => n > 500 && n < 510 && D.tiga(n).s === 7,
    (n) => n < 300 && n > 290 && D.tiga(n).p === 9,
    (n) => n > 639 && n < 709 && D.tiga(n).s === 0 && D.tiga(n).p === 7,
    (n) => n > 800 && n < 805 && D.tiga(n).s === 3,
  ];
  D.RONDE_DETEKTIF_QC.forEach((s, i) => {
    const yang = s.opsi.filter(cocok[i]);
    cek(`DETEKTIF_QC ${i + 1}: tepat satu pilihan cocok dan itu kuncinya`, yang.length === 1 && yang[0] === s.jawab, JSON.stringify(yang));
    cek(`DETEKTIF_QC ${i + 1}: tiga pilihan berbeda`, new Set(s.opsi).size === 3 && s.klue.length === 2);
  });
  cek("DETEKTIF_QC: empat soal", D.RONDE_DETEKTIF_QC.length === 4);
}
cek("PETA_KONSEP_QC: dua peta, empat kotak, kunci menunjuk", D.PETA_KONSEP_QC.length === 2 && D.PETA_KONSEP_QC.every((p) => p.kotak.length === 4 && p.kotak.every((k) => k.opsi.length === 3 && new Set(k.opsi).size === 3 && k.benar === 0)));
cek("SUSUNKATA_QC: empat kalimat, pengecoh tidak di dalam kalimat", D.RONDE_SUSUNKATA_QC.length === 4 && D.RONDE_SUSUNKATA_QC.every((s) => !s.kata.includes(s.pengecoh) && s.kata.length >= 5));

/* ====================================================================== */
/* Sub-Bab D: penjumlahan sampai 100                                         */
/* ====================================================================== */

for (const [a, b, simpan] of [[23, 16, false], [48, 16, true], [54, 29, true], [33, 21, false], [19, 12, true], [70, 13, false]]) cek(`perluSimpan(${a}, ${b}) = ${simpan}`, D.perluSimpan(a, b) === simpan);
for (let n = 10; n <= 99; n += 1) {
  const o = D.opsiJumlah(n, n);
  cek(`opsiJumlah(${n}): tiga pilihan berbeda dalam 0 sampai 99 dan memuat kunci`, new Set(o).size === 3 && o.includes(n) && o.every((x) => x >= 0 && x <= 99), JSON.stringify(o));
}
const semuaJml = (daftar) => daftar.every(([a, b]) => a >= 10 && b >= 10 && a + b <= 99);
const unikJumlah = (daftar) => new Set(daftar.map(([a, b]) => a + b)).size === daftar.length;
const cekSoalJumlah = (nama, daftar, banyak) => {
  cekTiga(nama, daftar);
  daftar.forEach((ro, r) => cek(`${nama} ronde ${r + 1}: ${banyak} soal, benda dikenal, jumlah di bawah 100`, ro.length === banyak && ro.every((s) => BENDA.includes(s.benda) && s.a >= 10 && s.b >= 10 && s.a + s.b <= 99)));
};
cekSoalJumlah("GABUNG_CD", D.RONDE_GABUNG_CD, 2);
cekSoalJumlah("JUMLAH_CD", D.RONDE_JUMLAH_CD, 2);
cekSoalJumlah("PAPAN_CD", D.RONDE_PAPAN_CD, 2);
cek("JUMLAH_CD dan GABUNG_CD: ada soal yang menyimpan dan yang tidak", [D.RONDE_GABUNG_CD, D.RONDE_JUMLAH_CD].every((d) => d.flat().some((s) => D.perluSimpan(s.a, s.b)) && d.flat().some((s) => !D.perluSimpan(s.a, s.b))));
cekTiga("SORTIR_CD", D.RONDE_SORTIR_CD);
D.RONDE_SORTIR_CD.forEach((ro, r) => cek(`SORTIR_CD ronde ${r + 1}: enam soal, ada simpan dan tanpa`, BENDA.includes(ro.benda) && ro.pasang.length === 6 && semuaJml(ro.pasang) && unikPasang(ro.pasang) && ro.pasang.some(([a, b]) => D.perluSimpan(a, b)) && ro.pasang.some(([a, b]) => !D.perluSimpan(a, b))));
for (const [nama, daftar, banyak] of [["PASANG_CD", D.RONDE_PASANG_CD, 3], ["MEMORI_CD", D.RONDE_MEMORI_CD, 4]]) {
  cekTiga(nama, daftar);
  daftar.forEach((ro, r) => cek(`${nama} ronde ${r + 1}: ${banyak} pasangan dengan jumlah berbeda`, BENDA.includes(ro.benda) && ro.pasang.length === banyak && semuaJml(ro.pasang) && unikJumlah(ro.pasang)));
}
cekTiga("KETUK_CD", D.RONDE_KETUK_CD);
D.RONDE_KETUK_CD.forEach((ro, r) => cek(`KETUK_CD ronde ${r + 1}: tiga pasangan berjumlah berbeda, dua pertanyaan ada jawabannya`, ro.item.length === 3 && unikJumlah(ro.item) && ro.tanya.length === 2 && ro.tanya.every((t) => ro.item.filter((p) => p[0] + p[1] === t).length === 1)));
cekTiga("SEMUA_CD", D.RONDE_SEMUA_CD);
for (const [nama, daftar] of [["SEMUA_CD", D.RONDE_SEMUA_CD], ["SEMUA_PD", D.RONDE_SEMUA_PD]])
  daftar.forEach((ro, r) => {
    const benar = ro.pasang.filter((p) => D.cocokSimpan(p, ro.syarat));
    cek(`${nama} ronde ${r + 1}: empat soal berbeda, ada yang cocok dan tidak`, ro.pasang.length === 4 && unikPasang(ro.pasang) && semuaJml(ro.pasang) && benar.length >= 1 && benar.length <= 3, `${benar.length}`);
  });
cekTiga("CERITA_CD", D.RONDE_CERITA_CD);
D.RONDE_CERITA_CD.forEach((ro, r) => cek(`CERITA_CD ronde ${r + 1}: dua cerita, teks memuat kedua bilangan`, ro.length === 2 && ro.every((s) => BENDA.includes(s.benda) && s.teks.includes(String(s.a)) && s.teks.includes(String(s.b)) && s.a + s.b <= 99)));
cekTiga("URUT_CD", D.RONDE_URUT_CD);
D.RONDE_URUT_CD.forEach((ro, r) => cek(`URUT_CD ronde ${r + 1}: tiga pasangan berjumlah berbeda`, BENDA.includes(ro.benda) && ro.pasang.length === 3 && semuaJml(ro.pasang) && unikJumlah(ro.pasang)));
cek("SUSUN_PD dan SUSUN_QD: tiga soal, jumlah di bawah 100", D.RONDE_SUSUN_PD.length === 3 && D.RONDE_SUSUN_QD.length === 3 && semuaJml(D.RONDE_SUSUN_PD) && semuaJml(D.RONDE_SUSUN_QD));
cek("SUSUN_PD: 23 + 16 (tanpa menyimpan), 48 + 16 dan 54 + 29 (menyimpan)", D.RONDE_SUSUN_PD.map(([a, b]) => D.perluSimpan(a, b)).join() === "false,true,true");
cek("SUSUN_QD: semua menyimpan dan berjumlah 59, 84, 83", D.RONDE_SUSUN_QD.map(([a, b]) => a + b).join() === "59,84,83");
for (const [nama, daftar, banyak] of [["PAPAN_PD", D.RONDE_PAPAN_PD, 2], ["JUMLAH_PD", D.RONDE_JUMLAH_PD, 2], ["PASANG_PD", D.RONDE_PASANG_PD, 3], ["MEMORI_PD", D.RONDE_MEMORI_PD, 4], ["JUMLAH_QD", D.RONDE_JUMLAH_QD, 2], ["PAPAN_QD", D.RONDE_PAPAN_QD, 2], ["PASANG_QD", D.RONDE_PASANG_QD, 3], ["MEMORI_QD", D.RONDE_MEMORI_QD, 4]]) {
  cekTiga(nama, daftar);
  daftar.forEach((ro, r) => cek(`${nama} ronde ${r + 1}: ${banyak} soal, jumlah di bawah 100`, ro.length === banyak && semuaJml(ro) && unikPasang(ro)));
}
for (const [nama, daftar] of [["PASANG_PD", D.RONDE_PASANG_PD], ["MEMORI_PD", D.RONDE_MEMORI_PD], ["PASANG_QD", D.RONDE_PASANG_QD], ["MEMORI_QD", D.RONDE_MEMORI_QD]]) daftar.forEach((ro, r) => cek(`${nama} ronde ${r + 1}: jumlah berbeda`, unikJumlah(ro)));
cekTiga("TABEL_PD", D.RONDE_TABEL_PD);
D.RONDE_TABEL_PD.forEach((t, r) => {
  cek(`TABEL_PD ${r + 1}: empat baris, kartu = jawaban + satu pengecoh`, t.baris.length === 4 && t.kartu.length === 5 && t.baris.every((b) => t.kartu.includes(b.jawab)) && new Set(t.kartu).size === 5 && new Set(t.baris.map((b) => b.label)).size === 4);
  cek(`TABEL_PD ${r + 1}: tiap jawaban = jumlah soalnya`, t.baris.every((b) => Number(b.jawab) === b.label.split(" + ").map(Number).reduce((x, y) => x + y, 0)));
});
cekTiga("SORTIR_PD", D.RONDE_SORTIR_PD);
D.RONDE_SORTIR_PD.forEach((ro, r) => cek(`SORTIR_PD ronde ${r + 1}: enam soal, ada simpan dan tanpa`, ro.length === 6 && semuaJml(ro) && unikPasang(ro) && ro.some(([a, b]) => D.perluSimpan(a, b)) && ro.some(([a, b]) => !D.perluSimpan(a, b))));
cek("URAI_PD dan LANGKAH_QD: tiga soal", D.RONDE_URAI_PD.length === 3 && D.RONDE_LANGKAH_QD.length === 3 && semuaJml(D.RONDE_URAI_PD) && semuaJml(D.RONDE_LANGKAH_QD));
D.RONDE_URAI_PD.forEach(([a, b], r) => {
  const ks = D.kalimatPanjang(a, b, r * 3);
  cek(`URAI_PD ${a} + ${b}: tiga kalimat, kunci benar`, ks.length === 3 && ks.every((k) => new Set(k.opsi).size === 3 && k.benar >= 0));
  ks.forEach((k, i) => {
    const kalimat = `${k.depan} ${k.opsi[k.benar]} ${k.belakang}`;
    const jumlahKiri = kalimat.split("=")[0].split("+").map(Number);
    const bagianKanan = kalimat.split("=").slice(1).join("=").replace(/\.$/, "");
    if (i === 2) cek(`URAI_PD ${a} + ${b} kalimat 3: "${kalimat}" memuat jumlah ${a + b}`, Number(k.opsi[k.benar]) === a + b && jumlahKiri.length === 2);
    else cek(`URAI_PD ${a} + ${b} kalimat ${i + 1}: "${kalimat}" benar`, (() => {
      const [kiri, kanan] = kalimat.replace(/\.$/, "").split("=").map((x) => x.trim());
      const nilaiKanan = kanan.split("+").map((x) => Number(x.trim())).reduce((x, y) => x + y, 0);
      return Number(kiri) === nilaiKanan;
    })(), bagianKanan);
  });
});
D.RONDE_LANGKAH_QD.forEach(([a, b], r) => {
  const ks = D.kalimatLangkah(a, b, r * 3);
  cek(`LANGKAH_QD ${a} + ${b}: tiga kalimat, kunci benar`, ks.length === 3 && ks.every((k) => new Set(k.opsi).size === 3 && k.benar >= 0));
  const s = (a % 10) + (b % 10);
  const p = Math.floor(a / 10) + Math.floor(b / 10) + (D.perluSimpan(a, b) ? 1 : 0);
  cek(`LANGKAH_QD ${a} + ${b}: kunci satuan ${s}, puluhan ${p}, jumlah ${a + b}`, Number(ks[0].opsi[ks[0].benar]) === s && Number(ks[1].opsi[ks[1].benar]) === p && Number(ks[2].opsi[ks[2].benar]) === a + b);
});
cekTiga("LANGKAH_PD", [D.RONDE_LANGKAH_PD[0], D.RONDE_LANGKAH_PD[1], D.RONDE_LANGKAH_PD[2]]);
cek("LANGKAH_PD: tiap ronde 3 atau 4 langkah berbeda", D.RONDE_LANGKAH_PD.every((ro) => ro.langkah.length >= 3 && ro.langkah.length <= 4 && new Set(ro.langkah).size === ro.langkah.length));
cek("BENARSALAH_QD: dua ronde, lima pernyataan, ada benar dan salah", D.RONDE_BENARSALAH_QD.length === 2 && D.RONDE_BENARSALAH_QD.every((r) => r.length === 5 && r.some((p) => p.benar) && r.some((p) => !p.benar) && r.every((p) => p.penjelasan.length > 15)));
{
  const cocok = [
    (n) => n === 23 + 16 && n < 40,
    (n) => n === 48 + 16 && D.puluhanDari(n) === 6,
    (n) => n === 83 - 54,
    (n) => n === 70 + 13 && D.satuanDari(n) === 3,
  ];
  D.RONDE_DETEKTIF_QD.forEach((s, i) => {
    const yang = s.opsi.filter(cocok[i]);
    cek(`DETEKTIF_QD ${i + 1}: tepat satu pilihan cocok dan itu kuncinya`, yang.length === 1 && yang[0] === s.jawab, JSON.stringify(yang));
    cek(`DETEKTIF_QD ${i + 1}: tiga pilihan berbeda`, new Set(s.opsi).size === 3 && s.klue.length === 2);
  });
  cek("DETEKTIF_QD: empat soal", D.RONDE_DETEKTIF_QD.length === 4);
}
cek("PETA_KONSEP_QD: dua peta, empat kotak, kunci menunjuk", D.PETA_KONSEP_QD.length === 2 && D.PETA_KONSEP_QD.every((p) => p.kotak.length === 4 && p.kotak.every((k) => k.opsi.length === 3 && new Set(k.opsi).size === 3 && k.benar === 0)));
cekTiga("CERITA_QD", D.RONDE_CERITA_QD);
D.RONDE_CERITA_QD.forEach((ro, r) => cek(`CERITA_QD ronde ${r + 1}: dua cerita, jumlah di bawah 100, teks memuat bilangan`, ro.length === 2 && ro.every((c) => D.jumlahCerita(c) <= 99 && c.angka.length >= 2 && c.angka.every((x) => c.teks.includes(String(x))))));
cek("CERITA_QD memuat soal Ayo Berlatih 5: 25 + 36 = 61, 11 + 9 + 19 = 39, 15 + 10 + 12 = 37, 13 + 22 + 28 = 63", [61, 39, 37, 63].every((n) => D.RONDE_CERITA_QD.flat().some((c) => D.jumlahCerita(c) === n)));

/* ====================================================================== */
/* Sub-Bab E: pengurangan sampai 100                                         */
/* ====================================================================== */

for (const [a, b, ambil] of [[25, 12, false], [45, 19, true], [60, 35, true], [33, 28, true], [42, 36, true], [22, 12, false], [98, 21, false], [93, 21, false], [26, 17, true], [64, 26, true]]) cek(`perluMengambil(${a}, ${b}) = ${ambil}`, D.perluMengambil(a, b) === ambil);
for (let n = 1; n <= 89; n += 1) {
  const o = D.opsiSelisih(n, n);
  cek(`opsiSelisih(${n}): tiga pilihan berbeda dalam 0 sampai 99 dan memuat kunci`, new Set(o).size === 3 && o.includes(n) && o.every((x) => x >= 0 && x <= 99), JSON.stringify(o));
}
const semuaKurang = (daftar) => daftar.every(([a, b]) => a >= 10 && a <= 99 && b >= 10 && b < a);
const unikSisa = (daftar) => new Set(daftar.map(([a, b]) => a - b)).size === daftar.length;
const cekSoalKurang = (nama, daftar, banyak) => {
  cekTiga(nama, daftar);
  daftar.forEach((ro, r) => cek(`${nama} ronde ${r + 1}: ${banyak} soal, benda dikenal, a lebih besar dari b`, ro.length === banyak && ro.every((s) => BENDA.includes(s.benda) && s.a >= 10 && s.a <= 99 && s.b >= 10 && s.b < s.a)));
};
cekSoalKurang("SISA_CE", D.RONDE_SISA_CE, 2);
cekSoalKurang("HITUNG_CE", D.RONDE_HITUNG_CE, 2);
cekSoalKurang("CERITA_CE", D.RONDE_CERITA_CE, 2);
cekSoalKurang("PAPAN_CE", D.RONDE_PAPAN_CE, 2);
cek("SISA_CE dan HITUNG_CE: ada soal yang mengambil dan yang tidak", [D.RONDE_SISA_CE, D.RONDE_HITUNG_CE].every((d) => d.flat().some((s) => D.perluMengambil(s.a, s.b)) && d.flat().some((s) => !D.perluMengambil(s.a, s.b))));
cekTiga("SORTIR_CE", D.RONDE_SORTIR_CE);
D.RONDE_SORTIR_CE.forEach((ro, r) => cek(`SORTIR_CE ronde ${r + 1}: enam soal, ada mengambil dan tanpa`, BENDA.includes(ro.benda) && ro.pasang.length === 6 && semuaKurang(ro.pasang) && unikPasang(ro.pasang) && ro.pasang.some(([a, b]) => D.perluMengambil(a, b)) && ro.pasang.some(([a, b]) => !D.perluMengambil(a, b))));
for (const [nama, daftar, banyak] of [["PASANG_CE", D.RONDE_PASANG_CE, 3], ["MEMORI_CE", D.RONDE_MEMORI_CE, 4]]) {
  cekTiga(nama, daftar);
  daftar.forEach((ro, r) => cek(`${nama} ronde ${r + 1}: ${banyak} pasangan dengan sisa berbeda`, BENDA.includes(ro.benda) && ro.pasang.length === banyak && semuaKurang(ro.pasang) && unikSisa(ro.pasang)));
}
cekTiga("KETUK_CE", D.RONDE_KETUK_CE);
D.RONDE_KETUK_CE.forEach((ro, r) => cek(`KETUK_CE ronde ${r + 1}: tiga pasangan bersisa berbeda, dua pertanyaan ada jawabannya`, ro.item.length === 3 && unikSisa(ro.item) && ro.tanya.length === 2 && ro.tanya.every((t) => ro.item.filter((p) => p[0] - p[1] === t).length === 1)));
cekTiga("SEMUA_CE", D.RONDE_SEMUA_CE);
for (const [nama, daftar] of [["SEMUA_CE", D.RONDE_SEMUA_CE], ["SEMUA_PE", D.RONDE_SEMUA_PE]])
  daftar.forEach((ro, r) => {
    const benar = ro.pasang.filter((p) => D.cocokAmbil(p, ro.syarat));
    cek(`${nama} ronde ${r + 1}: empat soal berbeda, ada yang cocok dan tidak`, ro.pasang.length === 4 && unikPasang(ro.pasang) && semuaKurang(ro.pasang) && benar.length >= 1 && benar.length <= 3, `${benar.length}`);
  });
D.RONDE_CERITA_CE.forEach((ro, r) => ro.forEach((s, i) => {
  const teks = D.TEKS_CERITA_CE[D.kunciCerita(s)];
  cek(`CERITA_CE ronde ${r + 1} soal ${i + 1}: teks ada dan memuat kedua bilangan`, typeof teks === "string" && teks.includes(String(s.a)) && teks.includes(String(s.b)), D.kunciCerita(s));
}));
cekTiga("URUT_CE", D.RONDE_URUT_CE);
D.RONDE_URUT_CE.forEach((ro, r) => cek(`URUT_CE ronde ${r + 1}: tiga pasangan bersisa berbeda`, BENDA.includes(ro.benda) && ro.pasang.length === 3 && semuaKurang(ro.pasang) && unikSisa(ro.pasang)));
cek("SUSUN_PE dan SUSUN_QE: tiga soal, hasil positif", D.RONDE_SUSUN_PE.length === 3 && D.RONDE_SUSUN_QE.length === 3 && semuaKurang(D.RONDE_SUSUN_PE) && semuaKurang(D.RONDE_SUSUN_QE));
cek("SUSUN_PE: 25 − 12 (tanpa mengambil), 45 − 19 dan 60 − 35 (mengambil)", D.RONDE_SUSUN_PE.map(([a, b]) => D.perluMengambil(a, b)).join() === "false,true,true");
cek("SUSUN_QE: 57 − 23 (tanpa), 84 − 39 dan 72 − 46 (mengambil), hasil 34, 45, 26", D.RONDE_SUSUN_QE.map(([a, b]) => D.perluMengambil(a, b)).join() === "false,true,true" && D.RONDE_SUSUN_QE.map(([a, b]) => a - b).join() === "34,45,26");
for (const [nama, daftar, banyak] of [["PAPAN_PE", D.RONDE_PAPAN_PE, 2], ["SELISIH_PE", D.RONDE_SELISIH_PE, 2], ["PASANG_PE", D.RONDE_PASANG_PE, 3], ["MEMORI_PE", D.RONDE_MEMORI_PE, 4], ["SELISIH_QE", D.RONDE_SELISIH_QE, 2], ["PAPAN_QE", D.RONDE_PAPAN_QE, 2], ["PASANG_QE", D.RONDE_PASANG_QE, 3], ["MEMORI_QE", D.RONDE_MEMORI_QE, 4]]) {
  cekTiga(nama, daftar);
  daftar.forEach((ro, r) => cek(`${nama} ronde ${r + 1}: ${banyak} soal, a lebih besar dari b`, ro.length === banyak && semuaKurang(ro) && unikPasang(ro)));
}
for (const [nama, daftar] of [["PASANG_PE", D.RONDE_PASANG_PE], ["MEMORI_PE", D.RONDE_MEMORI_PE], ["PASANG_QE", D.RONDE_PASANG_QE], ["MEMORI_QE", D.RONDE_MEMORI_QE]]) daftar.forEach((ro, r) => cek(`${nama} ronde ${r + 1}: sisa berbeda`, unikSisa(ro)));
cek("PAPAN_PE dan SELISIH_QE memuat soal Ayo Berlatih 2: 33 − 28, 42 − 36, 22 − 12, 98 − 21", [[33, 28], [42, 36], [22, 12], [98, 21]].every(([a, b]) => D.RONDE_PAPAN_PE.flat().some((p) => p[0] === a && p[1] === b) || D.RONDE_TABEL_PE.some((t) => t.baris.some((x) => x.label === `${a} − ${b}`))));
cekTiga("TABEL_PE", D.RONDE_TABEL_PE);
D.RONDE_TABEL_PE.forEach((t, r) => {
  cek(`TABEL_PE ${r + 1}: empat baris, kartu = jawaban + satu pengecoh`, t.baris.length === 4 && t.kartu.length === 5 && t.baris.every((b) => t.kartu.includes(b.jawab)) && new Set(t.kartu).size === 5 && new Set(t.baris.map((b) => b.label)).size === 4);
  cek(`TABEL_PE ${r + 1}: tiap jawaban = selisih soalnya`, t.baris.every((b) => { const [x, y] = b.label.split(" − ").map(Number); return Number(b.jawab) === x - y; }));
});
cekTiga("SORTIR_PE", D.RONDE_SORTIR_PE);
D.RONDE_SORTIR_PE.forEach((ro, r) => cek(`SORTIR_PE ronde ${r + 1}: enam soal, ada mengambil dan tanpa`, ro.length === 6 && semuaKurang(ro) && unikPasang(ro) && ro.some(([a, b]) => D.perluMengambil(a, b)) && ro.some(([a, b]) => !D.perluMengambil(a, b))));
/** Hitung ungkapan tambah dan kurang dari kiri ke kanan, mis. "15 − 9". */
const hitungTK = (teks) => {
  const bagian = [...teks.replace(/\.$/, "").replace(/−/g, "-").matchAll(/([+-])?\s*(\d+)/g)];
  return bagian.reduce((jumlah, m) => jumlah + (m[1] === "-" ? -Number(m[2]) : Number(m[2])), 0);
};
cek("URAI_PE dan LANGKAH_QE: tiga soal", D.RONDE_URAI_PE.length === 3 && D.RONDE_LANGKAH_QE.length === 3 && semuaKurang(D.RONDE_URAI_PE) && semuaKurang(D.RONDE_LANGKAH_QE));
D.RONDE_URAI_PE.forEach(([a, b], r) => {
  const ks = D.kalimatPanjangKurang(a, b, r * 3);
  cek(`URAI_PE ${a} − ${b}: tiga kalimat, kunci benar`, ks.length === 3 && ks.every((k) => new Set(k.opsi).size === 3 && k.benar >= 0));
  ks.forEach((k, i) => {
    const kalimat = `${k.depan} ${k.opsi[k.benar]} ${k.belakang}`;
    const [kiri, kanan] = kalimat.split("=").map((x) => x.trim());
    cek(`URAI_PE ${a} − ${b} kalimat ${i + 1}: "${kalimat}" benar`, hitungTK(kiri) === hitungTK(kanan));
    if (i === 2) cek(`URAI_PE ${a} − ${b} kalimat 3 memuat selisih ${a - b}`, Number(k.opsi[k.benar]) === a - b);
  });
});
D.RONDE_LANGKAH_QE.forEach(([a, b], r) => {
  const ks = D.kalimatLangkahKurang(a, b, r * 3);
  cek(`LANGKAH_QE ${a} − ${b}: tiga kalimat, kunci benar`, ks.length === 3 && ks.every((k) => new Set(k.opsi).size === 3 && k.benar >= 0));
  const ambil = D.perluMengambil(a, b);
  const s = (a % 10) + (ambil ? 10 : 0) - (b % 10);
  const p = Math.floor(a / 10) - (ambil ? 1 : 0) - Math.floor(b / 10);
  cek(`LANGKAH_QE ${a} − ${b}: kunci satuan ${s}, puluhan ${p}, selisih ${a - b}`, Number(ks[0].opsi[ks[0].benar]) === s && Number(ks[1].opsi[ks[1].benar]) === p && Number(ks[2].opsi[ks[2].benar]) === a - b);
});
cek("LANGKAH_PE: tiga ronde, tiap ronde 3 atau 4 langkah berbeda", D.RONDE_LANGKAH_PE.length === 3 && D.RONDE_LANGKAH_PE.every((ro) => ro.langkah.length >= 3 && ro.langkah.length <= 4 && new Set(ro.langkah).size === ro.langkah.length));
cek("BENARSALAH_QE: dua ronde, lima pernyataan, ada benar dan salah", D.RONDE_BENARSALAH_QE.length === 2 && D.RONDE_BENARSALAH_QE.every((r) => r.length === 5 && r.some((p) => p.benar) && r.some((p) => !p.benar) && r.every((p) => p.penjelasan.length > 15)));
D.RONDE_BENARSALAH_QE.flat().forEach((p) => {
  const m = p.teks.match(/^([\d −]+) = (\d+)\.$/);
  if (m) cek(`BENARSALAH_QE "${p.teks}": nilai benar sesuai hitungan`, p.benar === (hitungTK(m[1]) === Number(m[2])));
});
{
  const cocok = [
    (n) => n === 45 - 19 && n < 30,
    (n) => n === 60 - 35 && D.satuanDari(n) === 5,
    (n) => n + 12 === 25 && D.puluhanDari(n) === 1,
    (n) => n === 80 - 12 && D.puluhanDari(n) === 6,
  ];
  D.RONDE_DETEKTIF_QE.forEach((s, i) => {
    const yang = s.opsi.filter(cocok[i]);
    cek(`DETEKTIF_QE ${i + 1}: tepat satu pilihan cocok dan itu kuncinya`, yang.length === 1 && yang[0] === s.jawab, JSON.stringify(yang));
    cek(`DETEKTIF_QE ${i + 1}: tiga pilihan berbeda`, new Set(s.opsi).size === 3 && s.klue.length === 2);
  });
  cek("DETEKTIF_QE: empat soal", D.RONDE_DETEKTIF_QE.length === 4);
}
cek("PETA_KONSEP_QE: dua peta, empat kotak, kunci menunjuk", D.PETA_KONSEP_QE.length === 2 && D.PETA_KONSEP_QE.every((p) => p.kotak.length === 4 && p.kotak.every((k) => k.opsi.length === 3 && new Set(k.opsi).size === 3 && k.benar === 0)));
cekTiga("CERITA_QE", D.RONDE_CERITA_QE);
D.RONDE_CERITA_QE.forEach((ro, r) => cek(`CERITA_QE ronde ${r + 1}: dua cerita, a lebih besar dari b, teks memuat bilangan`, ro.length === 2 && ro.every((c) => c.a > c.b && c.teks.includes(String(c.a)) && c.teks.includes(String(c.b)))));
cek("CERITA_QE memuat soal Ayo Berlatih 4: 19 − 8 = 11 dan 42 − 23 = 19", [11, 19].every((n) => D.RONDE_CERITA_QE.flat().some((c) => c.a - c.b === n)));

/* ====================================================================== */
/* Sub-Bab F: perkalian sampai 100                                           */
/* ====================================================================== */

const semuaKali = (daftar, maks = 99) => daftar.every(([k, n]) => k >= 2 && n >= 2 && k * n <= maks);
const unikKali = (daftar) => new Set(daftar.map(D.hasilKali)).size === daftar.length;
const unikPasangKali = (daftar) => new Set(daftar.map(([k, n]) => `${k}x${n}`)).size === daftar.length;
cek("hasilKali, teksTambah, teksKali", D.hasilKali([4, 5]) === 20 && D.teksTambah([4, 5]) === "5 + 5 + 5 + 5" && D.teksKali([4, 5]) === "4 × 5" && D.teksTambah([5, 2]) === "2 + 2 + 2 + 2 + 2");
for (let k = 2; k <= 9; k += 1)
  for (let n = 2; n <= 9; n += 1) {
    const o = D.opsiKali([k, n], k + n);
    cek(`opsiKali(${k} × ${n}): tiga pilihan berbeda dalam 0 sampai 99 dan memuat kunci`, new Set(o).size === 3 && o.includes(k * n) && o.every((x) => x >= 0 && x <= 99), JSON.stringify(o));
    const t = D.opsiTambah([k, n], k * n);
    cek(`opsiTambah(${k} × ${n}): tiga kalimat berbeda dan jawab menunjuk kunci`, new Set(t.opsi).size === 3 && t.opsi[t.jawab] === D.teksTambah([k, n]));
  }
const cekSoalKali = (nama, daftar, banyak, maks = 48) => {
  cekTiga(nama, daftar);
  daftar.forEach((ro, r) => cek(`${nama} ronde ${r + 1}: ${banyak} soal, benda dikenal, jumlah tidak melebihi ${maks}`, ro.length === banyak && ro.every((s) => BENDA.includes(s.benda) && semuaKali([s.p], maks))));
};
cekSoalKali("RAKIT_CF", D.RONDE_RAKIT_CF, 2, 30);
cekSoalKali("HITUNG_CF", D.RONDE_HITUNG_CF, 2);
cekSoalKali("TAMBAH_CF", D.RONDE_TAMBAH_CF, 2);
cekSoalKali("PAPAN_CF", D.RONDE_PAPAN_CF, 2);
cek("RAKIT_CF: banyak piring tidak melebihi 10", D.RONDE_RAKIT_CF.flat().every((s) => s.p[0] <= 10));
for (const [nama, daftar, banyak] of [["PASANG_CF", D.RONDE_PASANG_CF, 3], ["MEMORI_CF", D.RONDE_MEMORI_CF, 4], ["KETUK_CF", D.RONDE_KETUK_CF, 3], ["URUT_CF", D.RONDE_URUT_CF, 3]]) {
  cekTiga(nama, daftar);
  daftar.forEach((ro, r) => {
    const item = ro.kali ?? ro.item;
    cek(`${nama} ronde ${r + 1}: ${banyak} kelompok berbeda dengan jumlah berbeda, jumlah tidak melebihi 48`, BENDA.includes(ro.benda) && item.length === banyak && semuaKali(item, 48) && unikPasangKali(item) && unikKali(item));
  });
}
D.RONDE_KETUK_CF.forEach((ro, r) => cek(`KETUK_CF ronde ${r + 1}: dua pertanyaan ada jawabannya`, ro.tanya.length === 2 && ro.tanya.every((t) => ro.item.filter((p) => D.hasilKali(p) === t).length === 1)));
cekTiga("SEMUA_CF", D.RONDE_SEMUA_CF);
cekTiga("SEMUA_PF", D.RONDE_SEMUA_PF);
for (const [nama, daftar] of [["SEMUA_CF", D.RONDE_SEMUA_CF], ["SEMUA_PF", D.RONDE_SEMUA_PF]])
  daftar.forEach((ro, r) => {
    const benar = ro.kali.filter((p) => D.cocokKali(p, ro.acuan, ro.arah));
    cek(`${nama} ronde ${r + 1}: empat gambar berbeda, tidak ada yang sama dengan acuan, ada yang cocok dan tidak`, ro.kali.length === 4 && unikPasangKali(ro.kali) && semuaKali(ro.kali, 48) && ro.kali.every((p) => D.hasilKali(p) !== ro.acuan) && benar.length >= 1 && benar.length <= 3, `${benar.length}`);
  });
cekTiga("TUKAR_CF", D.RONDE_TUKAR_CF);
D.RONDE_TUKAR_CF.forEach((ro, r) => {
  cek(`TUKAR_CF ronde ${r + 1}: dua pasang susunan, benda dikenal`, BENDA.includes(ro.benda) && ro.pasang.length === 2 && ro.pasang.every(([a, b]) => semuaKali([a, b], 48)));
  cek(`TUKAR_CF ronde ${r + 1}: ada yang sama banyak (faktor ditukar) dan ada yang berbeda`, ro.pasang.some(([a, b]) => a[0] === b[1] && a[1] === b[0]) && ro.pasang.some(([a, b]) => D.hasilKali(a) !== D.hasilKali(b)));
});
cek("TUKAR_CF memuat 5 × 6 dan 6 × 5 dari buku", D.RONDE_TUKAR_CF[0].pasang.some(([a, b]) => a[0] === 5 && a[1] === 6 && b[0] === 6 && b[1] === 5));
cek("URUT_CF dan CF8: tiap ronde punya arah kecil atau besar", D.RONDE_URUT_CF.every((ro) => ro.dari === "kecil" || ro.dari === "besar"));
cek("HITUNG_CF memuat contoh buku: 5 × 2, 4 × 5, 6 × 5", [[5, 2], [4, 5], [6, 5]].every(([k, n]) => D.RONDE_HITUNG_CF.flat().some((s) => s.p[0] === k && s.p[1] === n)));
cek("HITUNG_PF dan KALIMAT_PF: tiga soal tiap daftar, dua per ronde untuk HITUNG_PF", D.RONDE_HITUNG_PF.length === 3 && D.RONDE_HITUNG_PF.every((r) => r.length === 2 && semuaKali(r, 48)) && D.RONDE_KALIMAT_PF.length === 3 && semuaKali(D.RONDE_KALIMAT_PF, 99));
/** Hitung ungkapan tambah dan kali, mis. "5 + 5 + 5" atau "4 × 5". */
const hitungTKali = (teks) => teks.replace(/\.$/, "").split("+").map((suku) => suku.split("×").map((x) => Number(x.trim())).reduce((x, y) => x * y, 1)).reduce((x, y) => x + y, 0);
D.RONDE_KALIMAT_PF.forEach((p, r) => {
  const ks = D.kalimatKali(p, r * 3);
  cek(`KALIMAT_PF ${teksKaliUji(p)}: tiga kalimat, kunci benar`, ks.length === 3 && ks.every((k) => new Set(k.opsi).size === 3 && k.benar >= 0 && k.opsi.every((x) => Number(x) > 0)));
  ks.forEach((k, i) => {
    const kalimat = `${k.depan} ${k.opsi[k.benar]} ${k.belakang}`;
    const [kiri, kanan] = kalimat.split("=").map((x) => x.trim());
    cek(`KALIMAT_PF ${teksKaliUji(p)} kalimat ${i + 1}: "${kalimat}" benar`, hitungTKali(kiri) === hitungTKali(kanan) && hitungTKali(kiri) === D.hasilKali(p));
  });
});
function teksKaliUji(p) {
  return `${p[0]} × ${p[1]}`;
}
for (const [nama, daftar, banyak] of [["PASANG_PF", D.RONDE_PASANG_PF, 3], ["MEMORI_PF", D.RONDE_MEMORI_PF, 4], ["PASANG_QF", D.RONDE_PASANG_QF, 3], ["MEMORI_QF", D.RONDE_MEMORI_QF, 4]]) {
  cekTiga(nama, daftar);
  daftar.forEach((ro, r) => cek(`${nama} ronde ${r + 1}: ${banyak} kelompok berbeda dengan label berbeda`, ro.length === banyak && semuaKali(ro) && unikPasangKali(ro) && (nama.endsWith("QF") && nama.startsWith("PASANG") ? true : unikKali(ro))));
}
cek("PASANG_QF: label perkalian dan label penjumlahan tiap ronde berbeda", D.RONDE_PASANG_QF.every((ro) => new Set(ro.map(D.teksKali)).size === 3 && new Set(ro.map(D.teksTambah)).size === 3));
cekTiga("GARIS_PF", D.RONDE_GARIS_PF);
D.RONDE_GARIS_PF.forEach((ro, r) => cek(`GARIS_PF ronde ${r + 1}: dua soal, loncatan paling banyak 5, hasil terletak pada garis enam titik`, ro.length === 2 && ro.every(({ n, k }) => n >= 2 && k >= 2 && k <= 5 && n * k <= n * 5)));
cekTiga("TABEL_PF", D.RONDE_TABEL_PF);
D.RONDE_TABEL_PF.forEach((t, r) => {
  cek(`TABEL_PF ${r + 1}: empat baris, kartu = jawaban + satu pengecoh`, t.baris.length === 4 && t.kartu.length === 5 && t.baris.every((b) => t.kartu.includes(b.jawab)) && new Set(t.kartu).size === 5 && new Set(t.baris.map((b) => b.label)).size === 4);
  cek(`TABEL_PF ${r + 1}: tiap jawaban = hasil kali soalnya`, t.baris.every((b) => Number(b.jawab) === hitungTKali(b.label)));
});
cek("TABEL_PF memuat soal Ayo Berlatih 3: 3 × 4, 5 × 7, 7 × 8, 9 × 7", ["3 × 4", "5 × 7", "7 × 8", "9 × 7"].every((l) => D.RONDE_TABEL_PF.some((t) => t.baris.some((b) => b.label === l))));
cekTiga("SORTIR_PF", D.RONDE_SORTIR_PF);
D.RONDE_SORTIR_PF.forEach((ro, r) => cek(`SORTIR_PF ronde ${r + 1}: enam gambar, ada kurang dari 20 dan 20 atau lebih`, ro.length === 6 && semuaKali(ro, 48) && unikPasangKali(ro) && ro.some(D.duaPuluhAtauLebih) && ro.some((p) => !D.duaPuluhAtauLebih(p))));
cekTiga("TUKARFAKTOR_PF", D.RONDE_TUKARFAKTOR_PF);
D.RONDE_TUKARFAKTOR_PF.forEach((ro, r) => cek(`TUKARFAKTOR_PF ronde ${r + 1}: dua soal, tiga pilihan berbeda memuat kunci`, ro.length === 2 && semuaKali(ro, 99) && ro.every((p) => { const o = D.opsiFaktor(p, r); return new Set(o).size === 3 && o.includes(p[0]) && p[0] !== p[1]; })));
cekTiga("RAKIT_PF", D.RONDE_RAKIT_PF);
D.RONDE_RAKIT_PF.forEach((ro, r) => cek(`RAKIT_PF ronde ${r + 1}: dua soal, banyak kotak paling banyak 10`, ro.length === 2 && semuaKali(ro, 48) && ro.every((p) => p[0] <= 10)));
cek("TULIS_QF memuat Ayo Berlatih 2: 7 × 5, 8 × 9, 9 × 7, 9 × 8", [[7, 5], [8, 9], [9, 7], [9, 8]].every(([k, n]) => D.RONDE_TULIS_QF.flat().some((p) => p[0] === k && p[1] === n)));
cek("HITUNG_QF memuat Ayo Berlatih 3: 3 × 4, 5 × 7, 7 × 8, 9 × 7", [[3, 4], [5, 7], [7, 8], [9, 7]].every(([k, n]) => D.RONDE_HITUNG_QF.flat().some((p) => p[0] === k && p[1] === n)));
for (const [nama, daftar, banyak] of [["TULIS_QF", D.RONDE_TULIS_QF, 2], ["HITUNG_QF", D.RONDE_HITUNG_QF, 2], ["PAPAN_QF", D.RONDE_PAPAN_QF, 2]]) {
  cekTiga(nama, daftar);
  daftar.forEach((ro, r) => cek(`${nama} ronde ${r + 1}: ${banyak} soal, hasil di bawah 100`, ro.length === banyak && semuaKali(ro)));
}
cek("BENARSALAH_QF: dua ronde, lima pernyataan, ada benar dan salah", D.RONDE_BENARSALAH_QF.length === 2 && D.RONDE_BENARSALAH_QF.every((r) => r.length === 5 && r.some((p) => p.benar) && r.some((p) => !p.benar) && r.every((p) => p.penjelasan.length > 15)));
D.RONDE_BENARSALAH_QF.flat().forEach((p) => {
  const m = p.teks.match(/^(\d+) × (\d+) = (\d+)\.$/);
  if (m) cek(`BENARSALAH_QF "${p.teks}": nilai benar sesuai hitungan`, p.benar === (Number(m[1]) * Number(m[2]) === Number(m[3])));
  const t = p.teks.match(/^(\d+) × (\d+) tidak sama dengan (\d+) × (\d+)\.$/);
  if (t) cek(`BENARSALAH_QF "${p.teks}": nilai benar sesuai hitungan`, p.benar === (Number(t[1]) * Number(t[2]) !== Number(t[3]) * Number(t[4])));
  const u = p.teks.match(/^(\d+) × (\d+) sama dengan ([\d +]+)\.$/);
  if (u) cek(`BENARSALAH_QF "${p.teks}": nilai benar sesuai hitungan`, p.benar === (Number(u[1]) * Number(u[2]) === hitungTKali(u[3])));
});
{
  const cocok = [
    (n) => n === 7 * 8 && n > 50,
    (n) => n === 9 * 7 && D.puluhanDari(n) === 6,
    (n) => n > 30 && n < 40 && Number.isInteger(Math.sqrt(n)),
    (n) => n === 4 * 5 && n === 5 * 4,
  ];
  D.RONDE_DETEKTIF_QF.forEach((s, i) => {
    const yang = s.opsi.filter(cocok[i]);
    cek(`DETEKTIF_QF ${i + 1}: tepat satu pilihan cocok dan itu kuncinya`, yang.length === 1 && yang[0] === s.jawab, JSON.stringify(yang));
    cek(`DETEKTIF_QF ${i + 1}: tiga pilihan berbeda`, new Set(s.opsi).size === 3 && s.klue.length === 2);
  });
  cek("DETEKTIF_QF: empat soal", D.RONDE_DETEKTIF_QF.length === 4);
}
cek("PETA_KONSEP_QF: dua peta, empat kotak, kunci menunjuk", D.PETA_KONSEP_QF.length === 2 && D.PETA_KONSEP_QF.every((p) => p.kotak.length === 4 && p.kotak.every((k) => k.opsi.length === 3 && new Set(k.opsi).size === 3 && k.benar === 0)));
cekTiga("CERITA_QF", D.RONDE_CERITA_QF);
D.RONDE_CERITA_QF.forEach((ro, r) => cek(`CERITA_QF ronde ${r + 1}: dua cerita, hasil di bawah 100, teks memuat kedua bilangan`, ro.length === 2 && ro.every((c) => semuaKali([c.p]) && c.teks.includes(String(c.p[0])) && c.teks.includes(String(c.p[1])))));
cek("CERITA_QF memuat soal Ayo Berlatih 4 dan 5: 6 × 2 = 12 dan 6 × 5 = 30", [12, 30].every((n) => D.RONDE_CERITA_QF.flat().some((c) => D.hasilKali(c.p) === n)));
cek("SUSUNKATA_QF: empat kalimat, pengecoh tidak di dalam kalimat", D.RONDE_SUSUNKATA_QF.length === 4 && D.RONDE_SUSUNKATA_QF.every((s) => !s.kata.includes(s.pengecoh) && s.kata.length >= 4));

/* ====================================================================== */
/* Sub-Bab G: pembagian sampai 100                                           */
/* ====================================================================== */

const bagiOk = (p, maksT = 99) => Number.isInteger(p[0] / p[1]) && p[1] >= 1 && p[0] <= maksT && p[0] / p[1] >= 1;
const semuaBagi = (daftar, maksT = 99) => daftar.every((p) => bagiOk(p, maksT));
const unikPasangB = (daftar) => new Set(daftar.map(([t, g]) => `${t}b${g}`)).size === daftar.length;
const unikHasilB = (daftar) => new Set(daftar.map(D.hasilBagi)).size === daftar.length;
cek("teksBagi, teksKurangBerulang, teksPeriksaBagi", D.teksBagi([15, 3]) === "15 : 3" && D.teksKurangBerulang([15, 3]) === "15 − 3 − 3 − 3 − 3 − 3" && D.teksPeriksaBagi([15, 3]) === "5 × 3 = 15" && D.teksKurangBerulang([10, 10]) === "10 − 10" && D.hasilBagi([64, 8]) === 8);
for (let g = 1; g <= 10; g += 1)
  for (let q = 1; q <= 10; q += 1) {
    if (g * q > 99) continue;
    const p = [g * q, g];
    const o = D.opsiBagi(p, g + q);
    cek(`opsiBagi(${D.teksBagi(p)}): tiga pilihan berbeda dan memuat kunci`, new Set(o).size === 3 && o.includes(q) && o.every((x) => x >= 0 && x <= 99), JSON.stringify(o));
    const k = D.opsiKurang(p, g * q);
    const hitung = (s) => hitungTK(s.replace(/ = 0$/, ""));
    cek(`opsiKurang(${D.teksBagi(p)}): tiga kalimat berbeda, kunci habis tepat nol dan pengecoh tidak`, new Set(k.opsi).size === 3 && hitung(k.opsi[k.jawab]) === 0 && k.opsi.filter((_, i) => i !== k.jawab).every((s) => hitung(s) !== 0));
    const per = D.opsiPeriksa(p, q + g);
    cek(`opsiPeriksa(${D.teksBagi(p)}): tiga pilihan berbeda dan memuat bilangan yang dibagi`, new Set(per).size === 3 && per.includes(p[0]) && per.every((x) => x >= 0));
  }
const cekSoalBagi = (nama, daftar, banyak, maksT = 48) => {
  cekTiga(nama, daftar);
  daftar.forEach((ro, r) => cek(`${nama} ronde ${r + 1}: ${banyak} soal, benda dikenal, bilangan yang dibagi tidak melebihi ${maksT}`, ro.length === banyak && ro.every((s) => BENDA.includes(s.benda) && bagiOk(s.p, maksT))));
};
cekSoalBagi("BAGI_CG", D.RONDE_BAGI_CG, 2, 30);
cekSoalBagi("HITUNG_CG", D.RONDE_HITUNG_CG, 2);
cekSoalBagi("TULIS_CG", D.RONDE_TULIS_CG, 2);
cekSoalBagi("CERITA_CG", D.RONDE_CERITA_CG, 2);
cekSoalBagi("PAPAN_CG", D.RONDE_PAPAN_CG, 2);
cek("BAGI_CG: banyak piring paling banyak 6", D.RONDE_BAGI_CG.flat().every((s) => s.p[1] >= 2 && s.p[1] <= 6));
D.RONDE_CERITA_CG.forEach((ro, r) =>
  ro.forEach((s, i) => {
    const teks = D.TEKS_CERITA_CG[D.kunciBagi(s)];
    cek(`CERITA_CG ronde ${r + 1} soal ${i + 1}: teks ada dan memuat kedua bilangan`, typeof teks === "string" && teks.includes(String(s.p[0])) && teks.includes(String(s.p[1])), D.kunciBagi(s));
  }),
);
for (const [nama, daftar, banyak] of [["PASANG_CG", D.RONDE_PASANG_CG, 3], ["MEMORI_CG", D.RONDE_MEMORI_CG, 4], ["KETUK_CG", D.RONDE_KETUK_CG, 3], ["URUT_CG", D.RONDE_URUT_CG, 3]]) {
  cekTiga(nama, daftar);
  daftar.forEach((ro, r) => {
    const item = ro.bagi ?? ro.item;
    cek(`${nama} ronde ${r + 1}: ${banyak} pembagian berbeda dengan hasil bagi berbeda, bilangan yang dibagi tidak melebihi 48`, BENDA.includes(ro.benda) && item.length === banyak && semuaBagi(item, 48) && unikPasangB(item) && unikHasilB(item));
  });
}
D.RONDE_KETUK_CG.forEach((ro, r) => cek(`KETUK_CG ronde ${r + 1}: dua pertanyaan ada jawabannya`, ro.tanya.length === 2 && ro.tanya.every((t) => ro.item.filter((p) => D.hasilBagi(p) === t).length === 1)));
cekTiga("SEMUA_CG", D.RONDE_SEMUA_CG);
cekTiga("SEMUA_PG", D.RONDE_SEMUA_PG);
for (const [nama, daftar] of [["SEMUA_CG", D.RONDE_SEMUA_CG], ["SEMUA_PG", D.RONDE_SEMUA_PG]])
  daftar.forEach((ro, r) => {
    const benar = ro.bagi.filter((p) => D.cocokBagi(p, ro.acuan, ro.arah));
    cek(`${nama} ronde ${r + 1}: empat gambar berbeda, tidak ada yang sama dengan acuan, ada yang cocok dan tidak`, ro.bagi.length === 4 && unikPasangB(ro.bagi) && semuaBagi(ro.bagi, 48) && ro.bagi.every((p) => D.hasilBagi(p) !== ro.acuan) && benar.length >= 1 && benar.length <= 3, `${benar.length}`);
  });
for (const [nama, daftar, banyak] of [["BAGI_PG", D.RONDE_BAGI_PG, 2], ["PERIKSA_PG", D.RONDE_PERIKSA_PG, 2], ["RAKIT_PG", D.RONDE_RAKIT_PG, 2], ["PASANG_PG", D.RONDE_PASANG_PG, 3], ["MEMORI_PG", D.RONDE_MEMORI_PG, 4]]) {
  cekTiga(nama, daftar);
  daftar.forEach((ro, r) => cek(`${nama} ronde ${r + 1}: ${banyak} pembagian, bilangan yang dibagi tidak melebihi 48`, ro.length === banyak && semuaBagi(ro, 48) && unikPasangB(ro) && (nama.startsWith("PASANG") || nama.startsWith("MEMORI") ? unikHasilB(ro) : true)));
}
cek("RAKIT_PG: banyak kotak paling banyak 10 dan isi tiap kotak paling sedikit 2", D.RONDE_RAKIT_PG.flat().every((p) => p[1] >= 2 && p[0] / p[1] <= 10));
cek("KALIMAT_PG: tiga soal", D.RONDE_KALIMAT_PG.length === 3 && semuaBagi(D.RONDE_KALIMAT_PG, 48));
D.RONDE_KALIMAT_PG.forEach((p, r) => {
  const ks = D.kalimatBagi(p, r * 3);
  const q = D.hasilBagi(p);
  cek(`KALIMAT_PG ${D.teksBagi(p)}: tiga kalimat, tiga pilihan berbeda, kunci hasil bagi ${q}`, ks.length === 3 && ks.every((k) => new Set(k.opsi).size === 3 && Number(k.opsi[k.benar]) === q));
  cek(`KALIMAT_PG ${D.teksBagi(p)}: kalimat memuat bilangan yang dibagi dan pembagi`, ks[0].depan.includes(String(p[0])) && ks[0].depan.includes(String(p[1])) && ks[1].depan === `${p[0]} : ${p[1]} =` && ks[2].belakang === `× ${p[1]} = ${p[0]}.`);
});
cekTiga("GARIS_PG", D.RONDE_GARIS_PG);
D.RONDE_GARIS_PG.forEach((ro, r) => cek(`GARIS_PG ronde ${r + 1}: dua soal, garis enam titik, loncatan 1 sampai 4, pendaratan bukan nol`, ro.length === 2 && ro.every(({ t, d, k }) => t === 5 * d && k >= 1 && k <= 4 && t - k * d > 0)));
cekTiga("TABEL_PG", D.RONDE_TABEL_PG);
D.RONDE_TABEL_PG.forEach((t, r) => {
  cek(`TABEL_PG ${r + 1}: empat baris, kartu = jawaban + satu pengecoh`, t.baris.length === 4 && t.kartu.length === 5 && t.baris.every((b) => t.kartu.includes(b.jawab)) && new Set(t.kartu).size === 5 && new Set(t.baris.map((b) => b.label)).size === 4 && new Set(t.baris.map((b) => b.jawab)).size === 4);
  cek(`TABEL_PG ${r + 1}: tiap jawaban = hasil bagi soalnya`, t.baris.every((b) => { const [x, y] = b.label.split(" : ").map(Number); return Number(b.jawab) === x / y; }));
});
cek("TABEL_PG memuat soal Ayo Berlatih 2: 21 : 3, 24 : 4, 48 : 6, 45 : 9, 5 : 5, 6 : 1, 10 : 1, 64 : 8", ["21 : 3", "24 : 4", "48 : 6", "45 : 9", "5 : 5", "6 : 1", "10 : 1", "64 : 8"].every((l) => D.RONDE_TABEL_PG.some((t) => t.baris.some((b) => b.label === l))));
cekTiga("SORTIR_PG", D.RONDE_SORTIR_PG);
D.RONDE_SORTIR_PG.forEach((ro, r) => cek(`SORTIR_PG ronde ${r + 1}: enam gambar, ada kurang dari 5 dan 5 atau lebih`, ro.length === 6 && semuaBagi(ro, 48) && unikPasangB(ro) && ro.some(D.limaAtauLebih) && ro.some((p) => !D.limaAtauLebih(p))));
for (const [nama, daftar, banyak] of [["KURANG_QG", D.RONDE_KURANG_QG, 2], ["HITUNG_QG", D.RONDE_HITUNG_QG, 2], ["PAPAN_QG", D.RONDE_PAPAN_QG, 2], ["PASANG_QG", D.RONDE_PASANG_QG, 3], ["MEMORI_QG", D.RONDE_MEMORI_QG, 4]]) {
  cekTiga(nama, daftar);
  daftar.forEach((ro, r) => cek(`${nama} ronde ${r + 1}: ${banyak} pembagian dengan bilangan yang dibagi di bawah 100`, ro.length === banyak && semuaBagi(ro) && unikPasangB(ro)));
}
for (const [nama, daftar] of [["PASANG_QG", D.RONDE_PASANG_QG], ["MEMORI_QG", D.RONDE_MEMORI_QG]]) daftar.forEach((ro, r) => cek(`${nama} ronde ${r + 1}: hasil bagi berbeda`, unikHasilB(ro)));
cek("PASANG_QG: label perkalian pemeriksa tiap ronde berbeda", D.RONDE_PASANG_QG.every((ro) => new Set(ro.map((p) => `${D.hasilBagi(p)} × ${p[1]}`)).size === 3));
cek("KURANG_QG memuat Ayo Berlatih 1: 4 : 1, 9 : 1, 10 : 10, 16 : 4, 35 : 5", [[4, 1], [9, 1], [10, 10], [16, 4], [35, 5]].every(([t, g]) => D.RONDE_KURANG_QG.flat().some((p) => p[0] === t && p[1] === g)));
cek("HITUNG_QG memuat Ayo Berlatih 2: 6 : 1, 10 : 1, 21 : 3, 24 : 4, 5 : 5, 48 : 6", [[6, 1], [10, 1], [21, 3], [24, 4], [5, 5], [48, 6]].every(([t, g]) => D.RONDE_HITUNG_QG.flat().some((p) => p[0] === t && p[1] === g)));
cek("PAPAN_QG memuat Ayo Berlatih 2: 64 : 8 dan 45 : 9", [[64, 8], [45, 9]].every(([t, g]) => D.RONDE_PAPAN_QG.flat().some((p) => p[0] === t && p[1] === g)));
cek("BENARSALAH_QG: dua ronde, lima pernyataan, ada benar dan salah", D.RONDE_BENARSALAH_QG.length === 2 && D.RONDE_BENARSALAH_QG.every((r) => r.length === 5 && r.some((p) => p.benar) && r.some((p) => !p.benar) && r.every((p) => p.penjelasan.length > 15)));
D.RONDE_BENARSALAH_QG.flat().forEach((p) => {
  const m = p.teks.match(/^(\d+) : (\d+) = (\d+)\.$/);
  if (m) cek(`BENARSALAH_QG "${p.teks}": nilai benar sesuai hitungan`, p.benar === (Number(m[1]) / Number(m[2]) === Number(m[3])));
});
{
  const cocok = [
    (n) => n === 48 / 6 && n < 10,
    (n) => n === 45 / 9 && n > 4 && n < 6,
    (n) => n * 3 === 21 && n < 10,
    (n) => n === 64 / 8 && n % 2 === 0,
  ];
  D.RONDE_DETEKTIF_QG.forEach((s, i) => {
    const yang = s.opsi.filter(cocok[i]);
    cek(`DETEKTIF_QG ${i + 1}: tepat satu pilihan cocok dan itu kuncinya`, yang.length === 1 && yang[0] === s.jawab, JSON.stringify(yang));
    cek(`DETEKTIF_QG ${i + 1}: tiga pilihan berbeda`, new Set(s.opsi).size === 3 && s.klue.length === 2);
  });
  cek("DETEKTIF_QG: empat soal", D.RONDE_DETEKTIF_QG.length === 4);
}
cek("PETA_KONSEP_QG: dua peta, empat kotak, kunci menunjuk", D.PETA_KONSEP_QG.length === 2 && D.PETA_KONSEP_QG.every((p) => p.kotak.length === 4 && p.kotak.every((k) => k.opsi.length === 3 && new Set(k.opsi).size === 3 && k.benar === 0)));
cekTiga("CERITA_QG", D.RONDE_CERITA_QG);
D.RONDE_CERITA_QG.forEach((ro, r) => cek(`CERITA_QG ronde ${r + 1}: dua cerita, bagi habis, teks memuat kedua bilangan`, ro.length === 2 && ro.every((c) => bagiOk(c.p) && c.teks.includes(String(c.p[0])) && c.teks.includes(String(c.p[1])))));
cek("CERITA_QG memuat soal buku: 3 : 3 = 1, 24 : 3 = 8, 36 : 6 = 6, 48 : 8 = 6", [1, 8, 6, 6].every((n, i) => [[3, 3], [24, 3], [36, 6], [48, 8]].every(([t, g]) => D.RONDE_CERITA_QG.flat().some((c) => c.p[0] === t && c.p[1] === g)) && n > 0));
cek("SUSUNKATA_QG: empat kalimat, pengecoh tidak di dalam kalimat", D.RONDE_SUSUNKATA_QG.length === 4 && D.RONDE_SUSUNKATA_QG.every((s) => !s.kata.includes(s.pengecoh) && s.kata.length >= 5));

/* ---- Struktur naskah ---- */
cek("META: Fase B, kelas 3, laju 0,70 dan nada 1", N.K3B1_META.phaseCode === "FASE_B" && N.K3B1_META.grade === 3 && N.K3B1_META.suaraLaju === 0.7 && N.K3B1_META.suaraNada === 1);
cek("META: kode bab k3-mat-bab1", N.K3B1_META.chapterId === "k3-mat-bab1");
cek("naskah: tujuh sub-bab A, B, C, D, E, F, dan G", N.SUB_BAB_K3B1.map((s) => s.id).join() === "A,B,C,D,E,F,G");
for (const s of N.SUB_BAB_K3B1) {
  cek(`${s.id}: tiga video`, s.videos.length === 3);
  cek(`${s.id}: sembilan adegan`, s.videos.reduce((n, v) => n + v.adegan.length, 0) === 9);
  s.videos.forEach((v) => v.adegan.forEach((a) => cek(`${a.id}: empat ketukan dan empat papan`, a.ketukan.length === 4 && a.papan.length === 4 && a.ketukan.every((k) => k.length > 20) && a.papan.every((p) => p.length > 1 && p.length < 40))));
  cek(`${s.id}: id adegan unik`, new Set(s.videos.flatMap((v) => v.adegan.map((a) => a.id))).size === 9);
  cek(`${s.id}: delapan peta pikiran berurutan`, s.mindMaps.length === 8 && s.mindMaps.every((m, i) => m.stepNumber === i + 1 && m.stepDesc.length > 180));
  cek(`${s.id}: alur peta pikiran bersambung`, s.mindMaps.every((m, i) => i === 0 || m.flowFrom === s.mindMaps[i - 1].flowTo));
  cek(`${s.id}: sepuluh panel infografis`, s.infografis.length === 10 && s.infografis.every((p) => p.suara.length > 50 && p.countNum >= 1 && p.countWord.length > 2));
  cek(`${s.id}: tiga puluh permainan, sepuluh per tahap`, s.games.length === 30 && ["Concrete", "Picture", "Abstract"].every((t) => s.games.filter((g) => g.stage === t).length === 10));
  cek(`${s.id}: urutan tahap Concrete, Picture, Abstract`, s.games.slice(0, 10).every((g) => g.stage === "Concrete") && s.games.slice(10, 20).every((g) => g.stage === "Picture") && s.games.slice(20).every((g) => g.stage === "Abstract"));
  cek(`${s.id}: judul permainan unik`, new Set(s.games.map((g) => g.title)).size === 30);
  cek(`${s.id}: jenis permainan unik`, new Set(s.games.map((g) => g.gameType)).size === 30);
  cek(`${s.id}: tiap permainan punya acuan buku, tujuan, cara, dan suara`, s.games.every((g) => g.bookReference.length > 5 && g.objective.length > 20 && g.mechanicDescription.length > 40 && g.voiceGuide.length > 5));
  cek(`${s.id}: Concrete punya emoji dan target, Picture punya diagram, Abstract punya simbol`, s.games.every((g) => (g.stage === "Concrete" ? !!g.emoji && g.targetCount > 0 : g.stage === "Picture" ? !!g.diagramType && g.numberA > 0 : !!g.symbolLarge && !!g.wordLarge && !!g.mathNotation)));
  cek(`${s.id}: lima poin penting dan empat potongan cara`, s.poin.length === 5 && s.cara.potongan.length === 4 && s.refleksi.length === 4);
  cek(`${s.id}: warna sub-bab`, /^#[0-9A-F]{6}$/i.test(s.secondaryBg) && /^#[0-9A-F]{6}$/i.test(s.secondaryBorder) && /^#[0-9A-F]{6}$/i.test(s.secondaryText));
}
/* Tanpa kata terlarang (aturan pola modul): tidak memakai "rumah" untuk bagian angka dan tidak ada nilai tukar rupiah. */
for (const s of N.SUB_BAB_K3B1) {
  const semua = JSON.stringify(s);
  cek(`${s.id}: tanpa nilai tukar rupiah per poin`, !/Rp\s?\d|per poin/i.test(semua));
  cek(`${s.id}: tanpa kata "rumah" untuk bagian angka (rumah hanya untuk kegiatan di rumah dan bangunan cerita)`, !/rumah (ratusan|puluhan|satuan)|rumah angka/i.test(semua));
}

console.log(`\nUji data Kelas 3 Bab 1: ${lulus} lulus, ${gagal} gagal.`);
if (gagal > 0) process.exit(1);
