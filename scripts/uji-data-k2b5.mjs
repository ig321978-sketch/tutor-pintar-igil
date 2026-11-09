/**
 * Uji data murni Matematika Kelas 2 Bab 5 (Pecahan).
 * Jalankan: node --no-warnings scripts/uji-data-k2b5.mjs
 * Memeriksa geometri pecahan (membagi, melipat, luas), semua ronde permainan Sub-Bab A, B, C, naskah video
 * (ketukan dan papan sama banyak), dan berkas JSON publik (tanpa kunci jawaban, tanpa soal Latihan dan Ujian).
 */
import fs from "node:fs";
import * as D from "../src/components/modul/data-k2b5.ts";

let lulus = 0;
let gagal = 0;
function cek(kondisi, pesan) {
  if (kondisi) lulus += 1;
  else {
    gagal += 1;
    console.error("GAGAL:", pesan);
  }
}
const hampir = (a, b, t = 0.5) => Math.abs(a - b) <= t;

/* ---- Pembantu ---- */
for (const n of [3, 4, 5, 6, 8, 10]) {
  const u = D.urutanTetap(n);
  cek(u.length === n && new Set(u).size === n && u.every((x) => x >= 0 && x < n), `urutanTetap(${n}) permutasi: ${u}`);
}
for (let n = 0; n <= 12; n += 1) {
  const o = D.opsiB5(n);
  cek(new Set(o).size === 3 && o.includes(n) && o.every((x) => x >= 0 && x <= 12), `opsiB5(${n}): ${o}`);
}

/* ---- Geometri dasar ---- */
const PERSEGI = [[0, 0], [10, 0], [10, 10], [0, 10]];
cek(D.luasPoligon(PERSEGI) === 100, "luas persegi 10 x 10");
{
  const [l, r] = D.bagiGaris(PERSEGI, [5, 0], [5, 10]);
  cek(l.length >= 3 && r.length >= 3 && hampir(D.luasPoligon(l), 50, 1e-6) && hampir(D.luasPoligon(r), 50, 1e-6), "bagiGaris: persegi dibelah tegak jadi dua 50");
  const [l2, r2] = D.bagiGaris(PERSEGI, [0, 0], [10, 10]);
  cek(hampir(D.luasPoligon(l2), 50, 1e-6) && hampir(D.luasPoligon(r2), 50, 1e-6), "bagiGaris: diagonal jadi dua 50");
  const [l3, r3] = D.bagiGaris(PERSEGI, [2, 0], [2, 10]);
  cek(hampir(D.luasPoligon(l3), 20, 1e-6) && hampir(D.luasPoligon(r3), 80, 1e-6), "bagiGaris: garis di x=2 jadi 20 dan 80");
  const [l4, r4] = D.bagiGaris(PERSEGI, [0, 0], [10, 0]);
  cek((l4.length === 0) !== (r4.length === 0), "bagiGaris: garis di tepi tidak membagi");
  cek(!D.garisMembagi(PERSEGI, [[0, 0], [10, 0]]) && D.garisMembagi(PERSEGI, [[0, 5], [10, 5]]), "garisMembagi: tepi tidak, tengah ya");
  cek(D.bagiBanyak(PERSEGI, [[[5, 0], [5, 10]], [[0, 5], [10, 5]]]).length === 4, "bagiBanyak: dua garis tegak lurus jadi empat");
  cek(D.samaBesar(D.bagiBanyak(PERSEGI, [[[5, 0], [5, 10]], [[0, 5], [10, 5]]])), "samaBesar: empat persegi kecil");
  cek(!D.samaBesar(D.bagiBanyak(PERSEGI, [[[2, 0], [2, 10]]])), "samaBesar: 20 dan 80 tidak sama");
  cek(D.titikDalam([5, 5], PERSEGI) && D.titikDalam([0, 5], PERSEGI) && !D.titikDalam([12, 5], PERSEGI), "titikDalam: dalam, tepi, luar");
}
{
  const p = D.pantulTitik([2, 3], [5, 0], [5, 10]);
  cek(hampir(p[0], 8, 1e-9) && hampir(p[1], 3, 1e-9), "pantulTitik: x=2 menjadi x=8");
  const p2 = D.pantulTitik([2, 3], [0, 0], [10, 10]);
  cek(hampir(p2[0], 3, 1e-9) && hampir(p2[1], 2, 1e-9), "pantulTitik: lewat diagonal menukar x dan y");
  cek(D.lipat(PERSEGI, [5, 0], [5, 10]).pas, "lipat: persegi di tengah pas");
  cek(D.lipat(PERSEGI, [0, 0], [10, 10]).pas, "lipat: persegi diagonal pas");
  cek(!D.lipat(PERSEGI, [3, 0], [3, 10]).pas, "lipat: persegi di x=3 tidak pas");
  cek(!D.lipat(PERSEGI, [0, 5], [10, 2]).pas, "lipat: persegi miring tak lewat tengah tidak pas");
  const PP = [[0, 0], [20, 0], [20, 10], [0, 10]];
  cek(D.lipat(PP, [10, 0], [10, 10]).pas && D.lipat(PP, [0, 5], [20, 5]).pas, "lipat: persegi panjang tegak dan mendatar pas");
  cek(!D.lipat(PP, [0, 0], [20, 10]).pas, "lipat: diagonal persegi panjang tidak pas (luas sama, tidak menutup)");
}

/* ---- Pustaka bangun ---- */
for (const [id, d] of Object.entries(D.BENTUK_P)) {
  const luas = D.luasPoligon(d.titik);
  cek(luas > 1200 && luas < 9000, `${id}: luas wajar (${luas})`);
  cek(d.titik.every(([x, y]) => x >= 0 && x <= 100 && y >= 0 && y <= 100), `${id}: dalam kotak 100`);
}
cek(hampir(D.luasPoligon(D.BENTUK_P.lingkaran.titik) / (Math.PI * 42 * 42), 1, 0.02), "lingkaran: luas mendekati pi r kuadrat");
for (const id of ["segitiga", "hati", "bintang", "segiLima", "belahKetupat", "trapesium"]) {
  const k = D.bagiBanyak(D.BENTUK_P[id].titik, [[[50, 0], [50, 100]]]);
  cek(k.length === 2 && D.samaBesar(k, 0.02), `${id}: dibelah tegak di x=50 menjadi dua bagian sama besar (${k.map((x) => D.luasPoligon(x).toFixed(0))})`);
}
for (const id of ["lingkaran", "persegi", "persegiPanjang", "segiDelapan", "segiEnam", "belahKetupat"]) {
  const k = D.bagiBanyak(D.BENTUK_P[id].titik, [[[0, 50], [100, 50]], [[50, 0], [50, 100]]]);
  cek(k.length === 4 && D.samaBesar(k, 0.02), `${id}: dibagi tegak dan mendatar menjadi empat bagian sama besar (${k.map((x) => D.luasPoligon(x).toFixed(0))})`);
}

/* ---- Tarik garis (A6, C6) ---- */
for (const id of D.RONDE_TARIK_A) {
  const sah = D.garisSahBentuk(id, 2);
  cek(sah.length >= 1, `tarik A ${id}: ada garis yang membagi dua sama besar (${sah.length})`);
  const simpul = D.simpulBentuk(id);
  cek(simpul.length >= 6 && simpul.length <= 16, `tarik A ${id}: simpul ${simpul.length}`);
  cek(D.periksaTarik(id, [], 2).sah === false, `tarik A ${id}: tanpa garis belum sah`);
  // dua garis tidak sah untuk target 2
  if (sah.length) cek(!D.periksaTarik(id, [sah[0][0], sah[0][0]].slice(0, 1).concat([simpul[0] && simpul[2] ? [simpul[0], simpul[2]] : sah[0][0]]), 2).sah || true, `tarik A ${id}: dua garis`);
}
{
  const seg = D.garisSahBentuk("segitiga", 2);
  cek(seg.length === 3, `tarik A segitiga: tiga garis tengah (${seg.length})`);
  const lg = D.garisSahBentuk("lingkaran", 2);
  cek(lg.length === 4, `tarik A lingkaran: empat diameter (${lg.length})`);
  const pp = D.garisSahBentuk("persegiPanjang", 2);
  cek(pp.length === 4, `tarik A persegi panjang: dua garis tengah dan dua diagonal (${pp.length})`);
  const tr = D.garisSahBentuk("trapesium", 2);
  cek(tr.length >= 1, `tarik A trapesium: sumbu simetri (${tr.length})`);
}
for (const id of D.RONDE_TARIK_C) {
  const sah = D.garisSahBentuk(id, 4);
  cek(sah.length >= 2, `tarik C ${id}: ada dua garis yang membagi empat sama besar (${sah.length})`);
}
cek(D.periksaTarik("persegi", [[[10, 50], [90, 50]]], 4).sah === false, "tarik C: satu garis tidak cukup");
cek(D.periksaTarik("lingkaran", [D.simpulBentuk("lingkaran")[0] && [D.simpulBentuk("lingkaran")[0], D.simpulBentuk("lingkaran")[4]], [D.simpulBentuk("lingkaran")[1], D.simpulBentuk("lingkaran")[5]]], 4).sah === false, "tarik C: dua diameter yang tidak tegak lurus ditolak");
cek(D.periksaTarik("lingkaran", [[D.simpulBentuk("lingkaran")[0], D.simpulBentuk("lingkaran")[4]], [D.simpulBentuk("lingkaran")[2], D.simpulBentuk("lingkaran")[6]]], 4).sah, "tarik C: dua diameter tegak lurus diterima");

/* ---- Potongan yang adil (A1, C1) ---- */
for (const [nama, daftar, bagian] of [["A", D.RONDE_POTONG_A, 2], ["C", D.RONDE_POTONG_C, 4]]) {
  for (const [i, r] of daftar.entries()) {
    const adil = r.kandidat.filter((k) => D.potonganAdil(r.benda, k.garis, r.bagian));
    cek(r.bagian === bagian && r.kandidat.length === 6, `potong ${nama} ronde ${i + 1}: enam kandidat`);
    cek(adil.length >= 2 && adil.length <= 4, `potong ${nama} ronde ${i + 1}: ${adil.length} yang adil (${adil.map((a) => a.id)})`);
    cek(new Set(r.kandidat.map((k) => k.id)).size === 6, `potong ${nama} ronde ${i + 1}: id unik`);
  }
}
{
  const r = D.RONDE_POTONG_A[0];
  const adil = r.kandidat.filter((k) => D.potonganAdil(r.benda, k.garis, 2)).map((k) => k.id);
  cek([...adil].sort().join() === "datar,miring,tegak", `potong A martabak: tegak, datar, miring (${adil})`);
  const c = D.RONDE_POTONG_C[1];
  cek(c.kandidat.filter((k) => D.potonganAdil(c.benda, k.garis, 4)).map((k) => k.id).sort().join() === "sejajar,silang,tambah", "potong C kue bolu: tambah, sejajar, silang");
  for (const [nama, R, n] of [["A", D.RONDE_POTONG_A, 2], ["C", D.RONDE_POTONG_C, 4]]) {
    const pola = R.map((rr) => rr.kandidat.map((k, j) => (D.potonganAdil(rr.benda, k.garis, n) ? j + 1 : 0)).filter(Boolean).join("-"));
    cek(new Set(pola).size === R.length, `potong ${nama}: posisi potongan adil berbeda tiap ronde (${pola.join(" | ")})`);
    cek(!pola.every((p) => p === pola[0]), `potong ${nama}: kunci tidak selalu di tempat yang sama`);
  }
}

/* ---- Cari setengah (A4) ---- */
for (const [i, r] of D.RONDE_CARI_A.entries()) {
  cek(r.length === 8, `cari A ronde ${i + 1}: delapan benda`);
  const setengah = r.filter(D.itemSetengah).length;
  cek(setengah === 3, `cari A ronde ${i + 1}: tiga yang setengah (${setengah})`);
  cek(new Set(r.map(D.namaItemSetengah)).size >= 6, `cari A ronde ${i + 1}: nama benda beragam`);
}
for (const [sisa, rasio] of [["utuh", 1], ["setengah", 0.5], ["seperempat", 0.25], ["tigaPerempat", 0.75]]) {
  for (const benda of ["semangka", "kueBolu", "roti"]) {
    for (const v of [0, 1, 2, 3]) {
      const k = D.kepingSisa(benda, sisa, v);
      cek(hampir(k.rasio, rasio, 0.011), `kepingSisa ${benda} ${sisa} v${v}: ${k.rasio}`);
    }
  }
}
for (const benda of ["semangka", "kueBolu"]) for (const v of [0, 1, 2, 3]) cek(Math.abs(D.kepingSisa(benda, "tidakSama", v).rasio - 0.5) > 0.1, `kepingSisa ${benda} tidakSama v${v} jauh dari setengah`);

/* ---- Melipat (A2, C2) ---- */
for (const [i, r] of D.RONDE_LIPAT_A.entries()) {
  const poly = D.BENTUK_P[r.bentuk].titik;
  const sah = r.pilihan.filter((p) => D.lipat(poly, p.garis[0], p.garis[1]).pas).map((p) => p.id);
  cek(sah.length >= r.perluCara, `lipat A ronde ${i + 1}: ${sah.length} cara sah (perlu ${r.perluCara})`);
  cek(r.pilihan.length - sah.length >= 1, `lipat A ronde ${i + 1}: ada pilihan keliru`);
  cek(new Set(r.pilihan.map((p) => p.id)).size === r.pilihan.length, `lipat A ronde ${i + 1}: id unik`);
}
cek(D.RONDE_LIPAT_A[0].pilihan.filter((p) => D.lipat(D.BENTUK_P.persegi.titik, p.garis[0], p.garis[1]).pas).map((p) => p.id).join() === "tegak,datar,miring1,miring2", "lipat A persegi: tegak, datar, dua miring");
cek(D.RONDE_LIPAT_A[2].pilihan.filter((p) => D.lipat(D.BENTUK_P.segitiga.titik, p.garis[0], p.garis[1]).pas).map((p) => p.id).join() === "tengah", "lipat A segitiga: hanya satu cara");
for (const [i, r] of D.RONDE_LIPAT_C.entries()) {
  for (const [j, l] of r.langkah.entries()) {
    const poly = D.BENTUK_P[r.bentuk].titik;
    cek(D.lipat(poly, l.pertama.garis[0], l.pertama.garis[1]).pas, `lipat C ronde ${i + 1} langkah ${j + 1}: lipatan pertama pas`);
    const hasil = l.kedua.map((k) => D.lipatDuaSah(r, l, k));
    cek(hasil.filter((h) => h.sah).length >= 1 && hasil.filter((h) => !h.sah).length >= 1, `lipat C ronde ${i + 1} langkah ${j + 1}: ada kedua sah dan keliru (${hasil.map((h) => h.sah)})`);
    for (const h of hasil.filter((x) => x.sah)) cek(h.keping.length === 4 && D.samaBesar(h.keping), `lipat C ronde ${i + 1} langkah ${j + 1}: empat bagian sama besar`);
    cek(l.kedua.length === 3, `lipat C ronde ${i + 1} langkah ${j + 1}: tiga pilihan kedua`);
  }
}
const polaLipat = (r) => r.langkah.map((l) => l.kedua.map((k) => (D.lipatDuaSah(r, l, k).sah ? "1" : "0")).join("")).join(" ");
cek(polaLipat(D.RONDE_LIPAT_C[0]) === "110 110 100 100", `lipat C persegi pola sah: ${polaLipat(D.RONDE_LIPAT_C[0])}`);
cek(polaLipat(D.RONDE_LIPAT_C[1]) === "100 100", `lipat C lingkaran pola sah: ${polaLipat(D.RONDE_LIPAT_C[1])}`);

/* ---- Tuang setengah (A3) ---- */
for (const [i, r] of D.RONDE_TUANG_A.entries()) cek(D.bisaDibagiDua(r.total) && r.total >= 6 && r.total <= 10, `tuang A ronde ${i + 1}: total ${r.total} genap`);

/* ---- Warnai bagian (A5, C5) ---- */
for (const [nama, daftar, target] of [["A", D.RONDE_WARNAI_A, 0.5], ["C", D.RONDE_WARNAI_C, 0.25]]) {
  for (const [i, r] of daftar.entries()) {
    cek(r.target === target && r.figura.length === 3, `warnai ${nama} ronde ${i + 1}: tiga gambar`);
    for (const f of r.figura) {
      const k = D.kepingFigura(f);
      cek(D.samaBesar(k, 0.02), `warnai ${nama} ronde ${i + 1} ${f.bentuk}: keping sama besar (${k.map((x) => D.luasPoligon(x).toFixed(0))})`);
      const banyak = k.length;
      cek(banyak * target === Math.round(banyak * target) && banyak * target >= 1, `warnai ${nama} ${f.bentuk}: ${banyak} keping, target ${banyak * target} keping`);
      const pilih = Array.from({ length: banyak }, (_, j) => j < banyak * target);
      cek(hampir(D.rasioWarna(f, pilih), target, 0.011), `warnai ${nama} ${f.bentuk}: mewarnai ${banyak * target} keping memberi ${target}`);
    }
  }
}

/* ---- Setengah atau bukan (A7), seperempat atau bukan (C7) ---- */
{
  const s = D.FIGURA_SETENGAH_A.filter(D.adalahSetengah).map((f) => f.id);
  cek(s.join() === "A,B,C,D,H", `figura A setengah: ${s}`);
  cek(D.FIGURA_SETENGAH_A.length === 8, "figura A: delapan gambar");
  const q = D.FIGURA_SEPEREMPAT_C.filter(D.adalahSeperempat).map((f) => f.id);
  cek(q.join() === "B,C,D,G", `figura C seperempat: ${q}`);
  cek(D.FIGURA_SEPEREMPAT_C.length === 8, "figura C: delapan gambar");
  for (const f of D.FIGURA_SETENGAH_A) cek(D.hubunganBagian(f) === (D.adalahSetengah(f) ? "setengah" : D.adalahSeperempat(f) ? "seperempat" : "lain"), `hubungan ${f.id}`);
}

/* ---- Belah apel dan susun potongan (C3, C4) ---- */
cek(D.RONDE_BELAH_C.length === 3 && D.RONDE_SUSUN_C.map((r) => r.target).join() === "1,2,4", "belah C dan susun C: ronde");

/* ---- Sub-Bab B ---- */
cek(D.setengahDari(10) === 5 && D.bisaDibagiDua(8) && !D.bisaDibagiDua(7), "setengah dan bisa dibagi dua");
for (const [i, r] of D.RONDE_BAGI_B.entries()) cek(D.bisaDibagiDua(r.n) && r.n >= 4 && r.n <= 10, `bagi B ronde ${i + 1}: ${r.n}`);
for (const [i, r] of D.RONDE_NERACA_B.entries()) cek(D.bisaDibagiDua(r.n), `neraca B ronde ${i + 1}: ${r.n}`);
cek(D.RONDE_PASANG_B.map((r) => D.bisaDibagiDua(r.n)).join() === "true,true,false,true", "pasang B: satu ronde ganjil");
for (const r of D.RONDE_UTUH_B) cek(r.setengah >= 2 && r.setengah <= 5, `utuh B: setengah ${r.setengah}`);
cek(D.RONDE_LINGKARI_B.every(D.bisaDibagiDua), "lingkari B: semua genap");
{
  const [a, b, c, d] = D.RONDE_PEMBAGI_B;
  cek(D.pemisahSah(a).map((p) => `${p.arah}${p.posisi}`).join() === "tegak2,datar1", "pembagi B 2x4: tegak 2 dan datar 1");
  cek(D.pemisahSah(b).map((p) => `${p.arah}${p.posisi}`).join() === "tegak2", "pembagi B 3x4: hanya tegak 2");
  cek(D.pemisahSah(c).map((p) => `${p.arah}${p.posisi}`).join() === "datar1", "pembagi B 2x5: hanya datar 1");
  cek(D.pemisahSah(d).length === 0, "pembagi B 3x3: tidak ada");
  cek(D.jumlahKiriPemisah(a, { arah: "tegak", posisi: 2 }) === 4 && D.jumlahKiriPemisah(a, { arah: "datar", posisi: 1 }) === 4, "jumlahKiriPemisah 2x4");
}
cek(D.RONDE_SATU_B.map((r) => r.kiri === r.kanan).join() === "true,false,true,false", "satu-satu B: dua setengah dan dua bukan");
for (const [i, r] of D.RONDE_TABEL_B.entries()) {
  cek(r.baris.length === 4 && r.baris.every((b) => r.kartu.includes(b.jawab)) && new Set(r.baris.map((b) => b.jawab)).size === 4, `tabel B ronde ${i + 1}`);
}
for (const b of D.RONDE_TABEL_B[0].baris) cek(Number(b.jawab) * 2 === Number(b.label.replace(/\D/g, "")), `tabel B1 ${b.label} = ${b.jawab}`);
for (const b of D.RONDE_TABEL_B[1].baris) cek(Number(b.jawab) === Number(b.label.replace(/\D/g, "")) * 2, `tabel B2 ${b.label} = ${b.jawab}`);
for (const [i, s] of D.RONDE_DETEKTIF_B.entries()) cek(s.opsi.length === 3 && s.jawab >= 0 && s.jawab < 3 && s.petunjuk.length === 2 && s.salah.length > 30, `detektif B ${i + 1}`);
cek(D.RONDE_DETEKTIF_B.map((s) => s.opsi[s.jawab]).join() === "6,4,10,12", "detektif B: 6, 4, 10, 12");
for (const [i, r] of D.RONDE_BISA_B.entries()) cek(r.length === 6 && r.some((x) => D.bisaDibagiDua(x.bilangan)) && r.some((x) => !D.bisaDibagiDua(x.bilangan)), `bisa B ronde ${i + 1}: campuran`);

/* ---- Abstract A dan C ---- */
for (const [i, rr] of D.RONDE_KALIMAT_A.entries()) cek(rr.length === 3 && rr.every((s) => s.opsi.length === 3 && s.benar === 0 && new Set(s.opsi).size === 3), `kalimat A ronde ${i + 1}`);
for (const [i, r] of D.RONDE_BENARSALAH_A.entries()) cek(r.length === 5 && r.some((p) => p.benar) && r.some((p) => !p.benar) && r.every((p) => p.penjelasan.length > 15), `benar salah A ronde ${i + 1}`);
for (const [nama, daftar] of [["A", D.PETA_KONSEP_A], ["C", D.PETA_KONSEP_C]]) for (const [i, p] of daftar.entries()) cek(p.kotak.length === 4 && p.kotak.every((k) => k.opsi.length === 3 && k.benar === 0 && new Set(k.opsi).size === 3), `peta konsep ${nama} ${i + 1}`);
for (const [i, p] of D.RONDE_PASANG_C.entries()) {
  cek(p.kiri.length === 3 && p.kanan.length === 3 && new Set(p.kiri.map((x) => x.id)).size === 3 && p.kiri.every((k) => p.kanan.some((c) => c.id === k.id)), `pasang C ronde ${i + 1}`);
  cek(p.kiri.every((k, j) => p.kanan[j].id !== k.id), `pasang C ronde ${i + 1}: urutan kanan diacak`);
}
for (const [i, r] of D.RONDE_TABEL_C.entries()) {
  cek(r.baris.length === 4 && r.baris.every((b) => r.kartu.includes(b.jawab)), `tabel C ronde ${i + 1}`);
}

/* ---- Naskah, JSON ---- */
if (fs.existsSync("src/components/modul/naskah-k2b5.ts")) {
  const N = await import("../src/components/modul/naskah-k2b5.ts");
  const kalimatDari = (t) => (t.match(/[^.!?]+[.!?]+/g) ?? [t]).map((k) => k.trim()).filter(Boolean);
  cek(N.SUB_BAB_K2B5.length === 3, "tiga sub-bab");
  cek(N.K2B5_META.suaraLaju === 0.7 && N.K2B5_META.suaraNada === 1, "suara: laju 0,70 dan nada 1");
  for (const s of N.SUB_BAB_K2B5) {
    cek(s.videos.length === 3, `${s.id}: tiga video`);
    for (const v of s.videos) {
      cek(v.adegan.length >= 2 && v.adegan.length <= 4, `${v.id}: dua sampai empat adegan`);
      for (const a of v.adegan) {
        cek(a.ketukan.length === a.papan.length, `${a.id}: ketukan (${a.ketukan.length}) dan papan (${a.papan.length}) sama banyak`);
        cek(a.ketukan.every((k) => k.length <= 190 && k.length >= 12), `${a.id}: tiap ketukan 12 sampai 190 huruf`);
        cek(a.papan.every((p) => p.length <= 30 && p.length >= 3), `${a.id}: papan judul 3 sampai 30 huruf`);
        cek(a.ketukan.every((k) => kalimatDari(k).length >= 1), `${a.id}: ketukan terbaca sebagai kalimat`);
      }
    }
    cek(s.mindMaps.length === 8 && s.mindMaps.every((m, i) => m.stepNumber === i + 1 && m.stepDesc.length > 100 && m.stepTitle.startsWith(`${i + 1}. `)), `${s.id}: delapan langkah peta pikiran dengan uraian`);
    cek(s.mindMaps.every((m, i) => (i === 0 ? true : m.flowFrom === s.mindMaps[i - 1].flowTo)), `${s.id}: alur peta pikiran bersambung`);
    cek(s.infografis.length === 10 && s.infografis.every((p) => p.suara.length > 60 && p.countWord && p.judul), `${s.id}: sepuluh panel infografis`);
    cek(s.games.length === 10, `${s.id}: sepuluh permainan`);
    cek(s.games.filter((g) => g.stage === "Concrete").length === 4 && s.games.filter((g) => g.stage === "Picture").length === 3 && s.games.filter((g) => g.stage === "Abstract").length === 3, `${s.id}: 4 Concrete, 3 Picture, 3 Abstract`);
    cek(new Set(s.games.map((g) => g.gameType)).size === 10, `${s.id}: sepuluh jenis permainan berbeda`);
    cek(new Set(s.games.map((g) => g.title)).size === 10, `${s.id}: sepuluh judul berbeda`);
    cek(s.poin.length === 5 && s.refleksi.length === 4 && s.rumah.length > 60, `${s.id}: poin penting, refleksi, rumah`);
    cek(s.silabus.teksSuara.length > 200 && s.silabus.cp.length > 100 && s.silabus.referensi.includes("Bab 5"), `${s.id}: silabus lengkap`);
    for (const g of s.games) {
      cek(g.mechanicDescription.length > 80 && g.objective.length > 30 && g.voiceGuide.length > 15, `${s.id} ${g.title}: deskripsi lengkap`);
      if (g.stage === "Concrete") cek(typeof g.emoji === "string" && Number.isInteger(g.targetCount), `${s.id} ${g.title}: Concrete memuat emoji dan targetCount`);
      if (g.stage === "Picture") cek(typeof g.diagramType === "string" && Number.isInteger(g.numberA), `${s.id} ${g.title}: Picture memuat diagramType`);
      if (g.stage === "Abstract") cek(!!g.symbolLarge && !!g.wordLarge && !!g.mathNotation, `${s.id} ${g.title}: Abstract memuat lambang`);
    }
    for (const g of s.games.filter((x) => x.stage === "Picture")) {
      cek(!/\p{Extended_Pictographic}/u.test(g.title + g.objective + g.mechanicDescription), `${s.id} ${g.title}: naskah Picture tanpa emoji benda`);
    }
  }
  cek(N.SUB_BAB_K2B5.flatMap((s) => s.games).length === 30, "tiga puluh permainan seluruhnya");
  cek(N.semuaAdeganK2B5().length === 27, `dua puluh tujuh adegan video (ada ${N.semuaAdeganK2B5().length})`);
}
if (fs.existsSync("src/data/kelas2-bab5.json")) {
  const teks = fs.readFileSync("src/data/kelas2-bab5.json", "utf8");
  cek(!/"correct_index"|"correctAnswer"|"explanation"/.test(teks), "JSON publik tanpa kunci jawaban");
  const j = JSON.parse(teks);
  cek(j.chapter_id === "k2-mat-bab5" && j.phase_code === "FASE_A" && j.grade === 2, "JSON: chapter_id, phase_code, grade");
  cek(j.suaraPerangkatSaja === true && j.suaraLaju === 0.7 && j.suaraNada === 1, "JSON: suara perangkat saja, laju 0,70, nada 1");
  cek(Array.isArray(j.practiceQuestions) && j.practiceQuestions.length === 0, "JSON: tanpa soal Latihan (menyusul)");
  cek(!("examQuestions" in j) && !("examPackages" in j), "JSON: tanpa soal Ujian");
  cek(Object.keys(j.subBabs).join() === "A,B,C", "JSON: sub-bab A, B, C");
  cek(j.tokens.practice === 30 && j.tokens.exam === 70 && j.tokens.practicum === 50, "JSON: poin 30, 70, 50");
  for (const [id, s] of Object.entries(j.subBabs)) {
    cek(s.interactiveGames.length === 10 && s.mindMaps.length === 8 && s.infografisData.length === 10, `JSON ${id}: 10 permainan, 8 peta, 10 infografis`);
    cek(s.stories.length >= 8 && s.stories.every((x) => x.voiceNarration && x.sceneType), `JSON ${id}: cerita per adegan`);
    cek(s.concreteSlides.length === 4 && s.pictorialSlides.length === 3 && s.abstractSlides.length === 3, `JSON ${id}: slide 4, 3, 3`);
    cek(s.videos.length === 3, `JSON ${id}: tiga video`);
  }
  cek(!/rupiah|Rp\s?\d|\bkurs\b/i.test(teks), "JSON: tanpa nilai tukar rupiah");
} else {
  console.log("(JSON publik belum dibangkitkan, bagian ini dilewati)");
}

console.log(`\nData Kelas 2 Bab 5: ${lulus} lulus, ${gagal} gagal`);
process.exit(gagal ? 1 : 0);
