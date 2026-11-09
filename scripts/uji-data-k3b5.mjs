// Uji data murni Matematika Kelas 3 Bab 5 (Penyajian Data dalam Tabel). Jalankan: node --no-warnings scripts/uji-data-k3b5.mjs
import * as D from "../src/components/modul/data-k3b5.ts";
import * as N from "../src/components/modul/naskah-k3b5.ts";

let lulus = 0;
let gagal = 0;
const cek = (nama, ok, info = "") => {
  if (ok) lulus += 1;
  else {
    gagal += 1;
    console.log(`GAGAL: ${nama} ${info}`);
  }
};
const unik = (daftar) => new Set(daftar).size === daftar.length;
const tiga = (nama, daftar) => cek(`${nama}: tiga ronde`, daftar.length === 3, `${daftar.length}`);

/* ---- Pembantu ---- */
for (let g = 0; g < 6; g += 1) cek(`urutanTetap(3, 2, ${g}) permutasi`, [...D.urutanTetap(3, 2, g)].sort().join() === "0,1,2");
for (let r = 0; r < 6; r += 1) cek(`urutTampil ronde ${r} berbeda dari kunci`, JSON.stringify(D.urutTampil(["a", "b", "c"], ["a", "b", "c"], r)) !== JSON.stringify(["a", "b", "c"]));
cek("jangkauan", D.jangkauan([3, 7, 5, 7, 2]) === 5 && D.jangkauan(D.DATA_ULANGAN) === 5);
cek("nilai terkecil/terbesar DATA_ULANGAN", D.nilaiTerkecil(D.DATA_ULANGAN) === 5 && D.nilaiTerbesar(D.DATA_ULANGAN) === 10);
cek("banyakNilai 9 dan 10 pada DATA_ULANGAN", D.banyakNilai(D.DATA_ULANGAN, 9) === 5 && D.banyakNilai(D.DATA_ULANGAN, 10) === 2);
cek("kelompokLima", D.kelompokLima(12).penuh === 2 && D.kelompokLima(12).sisa === 2 && D.kelompokLima(5).penuh === 1 && D.kelompokLima(5).sisa === 0);
cek("banyakHuruf STATISTIKA", D.banyakHuruf("STATISTIKA", "T") === 3 && D.banyakHuruf("STATISTIKA", "S") === 2 && D.banyakHuruf("STATISTIKA", "K") === 1 && D.jumlahHuruf("STATISTIKA") === 10);
cek("hurufPaling STATISTIKA", D.hurufPaling("STATISTIKA", "terbanyak").includes("T") && D.hurufPaling("STATISTIKA", "tersedikit").includes("K"));
cek("binBanyak / binTurus", D.binBanyak(3) === "sedikit" && D.binBanyak(5) === "sedang" && D.binBanyak(8) === "banyak" && D.binTurus(4) === "kecil" && D.binTurus(7) === "tengah" && D.binTurus(10) === "besar");
cek("hitungLebihKurang tabel nilai", D.hitungLebihKurang({ tabel: D.TABEL_NILAI_BUKU, jenis: "lebih", acuan: 7 }) === 12 && D.hitungLebihKurang({ tabel: D.TABEL_NILAI_BUKU, jenis: "kurang", acuan: 7 }) === 5);
cek("hitungNilaiBuku", D.hitungNilaiBuku({ jenis: "sama", acuan: 6 }) === 3 && D.hitungNilaiBuku({ jenis: "lebih", acuan: 7 }) === 12);

for (let n = 1; n <= 20; n += 1) for (let k = 0; k < 3; k += 1) {
  const o = D.opsiAngka(n, k);
  cek(`opsiAngka(${n},${k}) tiga berbeda memuat ${n}`, new Set(o).size === 3 && o.includes(n) && o.every((v) => v >= 0), JSON.stringify(o));
}

/* ---- Concrete A ---- */
tiga("RONDE_URUT_CA", D.RONDE_URUT_CA);
D.RONDE_URUT_CA.forEach((ro, r) => cek(`RONDE_URUT_CA ${r + 1}`, ro.anak.length === 3 && unik(ro.anak.map(D.idAnak)) && unik(ro.anak.map((a) => a.n)) && (ro.dari === "kecil" || ro.dari === "besar") && !!D.BENDA_DATA[ro.benda]));
tiga("RONDE_PALING_CA", D.RONDE_PALING_CA);
D.RONDE_PALING_CA.forEach((ro, r) => cek(`RONDE_PALING_CA ${r + 1}`, ro.anak.length === 3 && unik(ro.anak.map((a) => a.n)) && ro.tanya.length === 2));
tiga("RONDE_SELISIH_CA", D.RONDE_SELISIH_CA);
D.RONDE_SELISIH_CA.forEach((ro, r) => cek(`RONDE_SELISIH_CA ${r + 1}`, ro.length === 2 && ro.every((s) => s.anak.length >= 3 && D.jangkauanAnak(s.anak) > 0)));
tiga("RONDE_JODOH_CA", D.RONDE_JODOH_CA);
D.RONDE_JODOH_CA.forEach((ro, r) => cek(`RONDE_JODOH_CA ${r + 1}`, ro.anak.length === 3 && unik(ro.anak.map((a) => a.n))));
tiga("RONDE_MEMORI_CA", D.RONDE_MEMORI_CA);
D.RONDE_MEMORI_CA.forEach((ro, r) => cek(`RONDE_MEMORI_CA ${r + 1}`, ro.n.length === 4 && unik(ro.n)));
tiga("RONDE_SEMUA_CA", D.RONDE_SEMUA_CA);
D.RONDE_SEMUA_CA.forEach((ro, r) => {
  const benar = ro.anak.filter((a) => D.cocokSyarat(ro.syarat, a.n)).length;
  cek(`RONDE_SEMUA_CA ${r + 1}`, ro.anak.length === 4 && benar >= 1 && benar <= 3, `${benar}`);
});
tiga("RONDE_PAPAN_CA", D.RONDE_PAPAN_CA);
D.RONDE_PAPAN_CA.forEach((ro, r) => cek(`RONDE_PAPAN_CA ${r + 1}`, ro.length === 2 && ro.every((s) => s.n >= 1 && s.n <= 99)));
tiga("RONDE_TOTAL_CA", D.RONDE_TOTAL_CA);
D.RONDE_TOTAL_CA.forEach((ro, r) => cek(`RONDE_TOTAL_CA ${r + 1}`, ro.length === 2 && ro.every((s) => D.jumlahAnak(s.anak) > 0)));
tiga("RONDE_PILAH_CA", D.RONDE_PILAH_CA);
D.RONDE_PILAH_CA.forEach((ro, r) => cek(`RONDE_PILAH_CA ${r + 1}`, ro.n.length === 6 && ["sedikit", "sedang", "banyak"].every((b) => ro.n.some((n) => D.binBanyak(n) === b))));
tiga("RONDE_BEDA_CA", D.RONDE_BEDA_CA);
D.RONDE_BEDA_CA.forEach((ro, r) => cek(`RONDE_BEDA_CA ${r + 1}`, ro.length === 2 && ro.every((s) => s.a.n !== s.b.n)));

/* ---- Picture A ---- */
tiga("RONDE_BACA_PA", D.RONDE_BACA_PA);
D.RONDE_BACA_PA.forEach((ro, r) => cek(`RONDE_BACA_PA ${r + 1}`, ro.length === 2 && ro.every((n) => n >= 1)));
tiga("RONDE_URUT_PA", D.RONDE_URUT_PA);
D.RONDE_URUT_PA.forEach((ro, r) => cek(`RONDE_URUT_PA ${r + 1}`, ro.n.length === 3 && unik(ro.n)));
tiga("RONDE_PALING_PA", D.RONDE_PALING_PA);
D.RONDE_PALING_PA.forEach((ro, r) => cek(`RONDE_PALING_PA ${r + 1}`, ro.n.length === 3 && unik(ro.n) && ro.tanya.length === 2));
tiga("RONDE_JANGKAUAN_PA", D.RONDE_JANGKAUAN_PA);
D.RONDE_JANGKAUAN_PA.forEach((ro, r) => cek(`RONDE_JANGKAUAN_PA ${r + 1}`, ro.length === 2 && ro.every((a) => D.jangkauanAnak(a) > 0)));
tiga("RONDE_JODOH_PA", D.RONDE_JODOH_PA);
D.RONDE_JODOH_PA.forEach((ro, r) => cek(`RONDE_JODOH_PA ${r + 1}`, ro.length === 3 && unik(ro)));
tiga("RONDE_MEMORI_PA", D.RONDE_MEMORI_PA);
D.RONDE_MEMORI_PA.forEach((ro, r) => cek(`RONDE_MEMORI_PA ${r + 1}`, ro.length === 4 && unik(ro)));
tiga("RONDE_SEMUA_PA", D.RONDE_SEMUA_PA);
D.RONDE_SEMUA_PA.forEach((ro, r) => {
  const benar = ro.n.filter((n) => D.cocokSyarat(ro.syarat, n)).length;
  cek(`RONDE_SEMUA_PA ${r + 1}`, ro.n.length === 4 && benar >= 1 && benar <= 3, `${benar}`);
});
tiga("RONDE_PILAH_PA", D.RONDE_PILAH_PA);
D.RONDE_PILAH_PA.forEach((ro, r) => cek(`RONDE_PILAH_PA ${r + 1}`, ro.length === 6 && ["kecil", "tengah", "besar"].every((b) => ro.some((n) => D.binTurus(n) === b))));
tiga("RONDE_TERBANYAK_PA", D.RONDE_TERBANYAK_PA);
D.RONDE_TERBANYAK_PA.forEach((ro, r) => cek(`RONDE_TERBANYAK_PA ${r + 1}`, ro.length === 2 && ro.every((t) => unik(t.map((b) => b.nilai)) && unik(t.map((b) => b.banyak)))));
tiga("RONDE_LEBIH_PA", D.RONDE_LEBIH_PA);
D.RONDE_LEBIH_PA.forEach((ro, r) => cek(`RONDE_LEBIH_PA ${r + 1}`, ro.length === 2 && ro.every((s) => D.hitungLebihKurang(s) > 0)));

/* ---- Abstract A ---- */
tiga("RONDE_URUTNILAI_QA", D.RONDE_URUTNILAI_QA);
D.RONDE_URUTNILAI_QA.forEach((ro, r) => cek(`RONDE_URUTNILAI_QA ${r + 1}`, ro.nilai.length >= 4 && unik(ro.nilai)));
tiga("RONDE_MINMAX_QA", D.RONDE_MINMAX_QA);
D.RONDE_MINMAX_QA.forEach((ro, r) => cek(`RONDE_MINMAX_QA ${r + 1}`, ro.length === 2 && ro.every((s) => D.jawabMinMax(s) === (s.tanya === "terkecil" ? D.nilaiTerkecil(s.data) : D.nilaiTerbesar(s.data)))));
tiga("RONDE_JANGKAUAN_QA", D.RONDE_JANGKAUAN_QA);
D.RONDE_JANGKAUAN_QA.forEach((ro, r) => cek(`RONDE_JANGKAUAN_QA ${r + 1}`, ro.length === 2 && ro.every((d) => D.jangkauan(d) > 0)));
tiga("RONDE_BANYAKNILAI_QA", D.RONDE_BANYAKNILAI_QA);
D.RONDE_BANYAKNILAI_QA.forEach((ro, r) => cek(`RONDE_BANYAKNILAI_QA ${r + 1}`, ro.length === 2 && ro.every((s) => D.banyakNilai(s.data, s.nilai) === s.data.filter((x) => x === s.nilai).length)));
tiga("RONDE_KALIMAT_QA", D.RONDE_KALIMAT_QA);
D.RONDE_KALIMAT_QA.forEach((ro, r) => cek(`RONDE_KALIMAT_QA ${r + 1}`, ro.length === 3 && ro.every((k) => k.opsi.length === 3 && k.benar >= 0 && k.benar < 3)));
tiga("RONDE_JODOH_QA", D.RONDE_JODOH_QA);
D.RONDE_JODOH_QA.forEach((ro, r) => cek(`RONDE_JODOH_QA ${r + 1}`, ro.length === 3 && unik(ro.map((p) => p.kiri)) && unik(ro.map((p) => p.kanan))));
cek("RONDE_BENARSALAH_QA dua ronde", D.RONDE_BENARSALAH_QA.length === 2);
D.RONDE_BENARSALAH_QA.forEach((ro, r) => cek(`RONDE_BENARSALAH_QA ${r + 1}`, ro.length === 5 && ro.some((p) => p.benar) && ro.some((p) => !p.benar)));
cek("RONDE_DETEKTIF_QA empat soal", D.RONDE_DETEKTIF_QA.length === 4 && D.RONDE_DETEKTIF_QA.every((s) => s.klue.length === 2 && s.opsi.includes(s.jawab)));
cek("PETA_KONSEP_QA dua peta", D.PETA_KONSEP_QA.length === 2 && D.PETA_KONSEP_QA.every((p) => p.kotak.length === 4));
cek("RONDE_SUSUNKATA_QA empat kalimat", D.RONDE_SUSUNKATA_QA.length === 4 && D.RONDE_SUSUNKATA_QA.every((s) => s.kata.length >= 5 && !!s.pengecoh));

/* ---- Concrete B ---- */
tiga("RONDE_KELOMPOK_CB", D.RONDE_KELOMPOK_CB);
D.RONDE_KELOMPOK_CB.forEach((ro, r) => cek(`RONDE_KELOMPOK_CB ${r + 1}`, ro.length === 2 && ro.every((s) => s.n >= 5)));
tiga("RONDE_LIDI_CB", D.RONDE_LIDI_CB);
tiga("RONDE_URUTLIDI_CB", D.RONDE_URUTLIDI_CB);
D.RONDE_URUTLIDI_CB.forEach((ro, r) => cek(`RONDE_URUTLIDI_CB ${r + 1}`, ro.n.length === 3 && unik(ro.n)));
tiga("RONDE_MANIKMERAH_CB", D.RONDE_MANIKMERAH_CB);
D.RONDE_MANIKMERAH_CB.forEach((ro, r) => cek(`RONDE_MANIKMERAH_CB ${r + 1}`, ro.length === 2 && ro.every((d) => d.length === 10 && D.banyakManik(d, "m") >= 1)));
tiga("RONDE_SORTIR_CB", D.RONDE_SORTIR_CB);
D.RONDE_SORTIR_CB.forEach((d, r) => cek(`RONDE_SORTIR_CB ${r + 1}`, d.length === 9 && ["m", "b", "h"].every((w) => d.includes(w))));
tiga("RONDE_PALINGMANIK_CB", D.RONDE_PALINGMANIK_CB);
D.RONDE_PALINGMANIK_CB.forEach((ro, r) => cek(`RONDE_PALINGMANIK_CB ${r + 1}`, ro.anggota.length === 3 && unik(ro.anggota.map((a) => a.n))));
tiga("RONDE_PAPAN_CB", D.RONDE_PAPAN_CB);
tiga("RONDE_JODOH_CB", D.RONDE_JODOH_CB);
D.RONDE_JODOH_CB.forEach((ro, r) => cek(`RONDE_JODOH_CB ${r + 1}`, ro.length === 3 && unik(ro)));
tiga("RONDE_TOTALMANIK_CB", D.RONDE_TOTALMANIK_CB);
tiga("RONDE_MEMORI_CB", D.RONDE_MEMORI_CB);
D.RONDE_MEMORI_CB.forEach((ro, r) => cek(`RONDE_MEMORI_CB ${r + 1}`, ro.length === 4 && unik(ro)));

/* ---- Picture B ---- */
tiga("RONDE_TURUS_PB", D.RONDE_TURUS_PB);
tiga("RONDE_PILIHTURUS_PB", D.RONDE_PILIHTURUS_PB);
D.RONDE_PILIHTURUS_PB.forEach((ro, r) => cek(`RONDE_PILIHTURUS_PB ${r + 1}`, ro.n.length === 3 && unik(ro.n) && ro.tanya.every((n) => ro.n.includes(n))));
tiga("RONDE_TABELHURUF_PB", D.RONDE_TABELHURUF_PB);
tiga("RONDE_ISITABEL_PB", D.RONDE_ISITABEL_PB);
D.RONDE_ISITABEL_PB.forEach((ro, r) => cek(`RONDE_ISITABEL_PB ${r + 1}`, ro.tabel.baris.length === 3 && ro.tabel.kartu.length === 4 && unik(ro.tabel.baris.map((b) => b.jawab))));
tiga("RONDE_URUTHURUF_PB", D.RONDE_URUTHURUF_PB);
D.RONDE_URUTHURUF_PB.forEach((ro, r) => cek(`RONDE_URUTHURUF_PB ${r + 1}`, unik(ro.huruf.map((h) => D.banyakHuruf(ro.kata, h)))));
tiga("RONDE_BEDA_PB", D.RONDE_BEDA_PB);
tiga("RONDE_JUMLAH_PB", D.RONDE_JUMLAH_PB);
tiga("RONDE_KELOMPOK_PB", D.RONDE_KELOMPOK_PB);
tiga("RONDE_SEMUA_PB", D.RONDE_SEMUA_PB);
D.RONDE_SEMUA_PB.forEach((ro, r) => {
  const benar = ro.huruf.filter((h) => D.cocokSyarat(ro.syarat, D.banyakHuruf(ro.kata, h))).length;
  cek(`RONDE_SEMUA_PB ${r + 1}`, ro.huruf.length === 4 && benar >= 1 && benar <= 3, `${benar}`);
});
tiga("RONDE_NILAIBUKU_PB", D.RONDE_NILAIBUKU_PB);

/* ---- Abstract B ---- */
tiga("RONDE_TABEL_QB", D.RONDE_TABEL_QB);
D.RONDE_TABEL_QB.forEach((ro, r) => cek(`RONDE_TABEL_QB ${r + 1}`, ro.length === 2 && ro.every((s) => D.jawabTabelQB(s) > 0)));
tiga("RONDE_LEBIH_QB", D.RONDE_LEBIH_QB);
tiga("RONDE_KURANG_QB", D.RONDE_KURANG_QB);
tiga("RONDE_HURUFKATA_QB", D.RONDE_HURUFKATA_QB);
tiga("RONDE_URUTHURUF_QB", D.RONDE_URUTHURUF_QB);
D.RONDE_URUTHURUF_QB.forEach((ro, r) => cek(`RONDE_URUTHURUF_QB ${r + 1}`, unik(ro.huruf.map((h) => D.banyakHuruf(ro.kata, h)))));
tiga("RONDE_KALIMAT_QB", D.RONDE_KALIMAT_QB);
tiga("RONDE_JODOH_QB", D.RONDE_JODOH_QB);
cek("RONDE_BENARSALAH_QB dua ronde", D.RONDE_BENARSALAH_QB.length === 2);
cek("RONDE_DETEKTIF_QB empat soal", D.RONDE_DETEKTIF_QB.length === 4);
cek("RONDE_SUSUNKATA_QB empat kalimat", D.RONDE_SUSUNKATA_QB.length === 4);

/* ---- Naskah ---- */
cek("meta", N.K3B5_META.chapterId === "k3-mat-bab5" && N.K3B5_META.phaseCode === "FASE_B" && N.K3B5_META.grade === 3 && N.K3B5_META.suaraLaju === 0.7 && N.K3B5_META.suaraNada === 1);
cek("SUB_BAB_K3B5 dua sub-bab", N.SUB_BAB_K3B5.length === 2 && N.SUB_BAB_K3B5.map((s) => s.id).join() === "A,B");
for (const s of N.SUB_BAB_K3B5) {
  cek(`naskah ${s.id}: 30 permainan`, s.games.length === 30);
  cek(`naskah ${s.id}: 10 Concrete/Picture/Abstract`, s.games.filter((g) => g.stage === "Concrete").length === 10 && s.games.filter((g) => g.stage === "Picture").length === 10 && s.games.filter((g) => g.stage === "Abstract").length === 10);
  cek(`naskah ${s.id}: 3 video × 3 adegan × 4 ketukan`, s.videos.length === 3 && s.videos.every((v) => v.adegan.length === 3 && v.adegan.every((a) => a.ketukan.length === 4 && a.papan.length === 4)));
  cek(`naskah ${s.id}: 8 peta dan 10 infografis`, s.mindMaps.length === 8 && s.infografis.length === 10);
  cek(`naskah ${s.id}: 5 poin penting`, s.poin.length === 5);
}

console.log(`\nUji data Kelas 3 Bab 5: ${lulus} lulus, ${gagal} gagal.`);
if (gagal > 0) process.exit(1);
