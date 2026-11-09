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

/* ---- Struktur naskah ---- */
cek("META: Fase B, kelas 3, laju 0,70 dan nada 1", N.K3B1_META.phaseCode === "FASE_B" && N.K3B1_META.grade === 3 && N.K3B1_META.suaraLaju === 0.7 && N.K3B1_META.suaraNada === 1);
cek("META: kode bab k3-mat-bab1", N.K3B1_META.chapterId === "k3-mat-bab1");
cek("naskah: dua sub-bab A dan B", N.SUB_BAB_K3B1.map((s) => s.id).join() === "A,B");
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
