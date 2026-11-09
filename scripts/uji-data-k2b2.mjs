/**
 * Uji data murni Matematika Kelas 2 Bab 2 (Penjumlahan dan Pengurangan).
 * Jalankan: node --no-warnings scripts/uji-data-k2b2.mjs
 * Memeriksa semua ronde permainan (hitungan benar, dalam jangkauan sampai 20), logika bersusun,
 * bagan pasangan, soal cerita, naskah video (ketukan dan papan sama banyak), dan berkas JSON publik
 * (tidak boleh membawa kunci jawaban maupun soal Latihan dan Ujian).
 */
import fs from "node:fs";
import * as D from "../src/components/modul/data-k2b2.ts";
import * as N from "../src/components/modul/naskah-k2b2.ts";

let lulus = 0;
let gagal = 0;
function cek(kondisi, pesan) {
  if (kondisi) lulus += 1;
  else {
    gagal += 1;
    console.error("GAGAL:", pesan);
  }
}
const dalam = (n, lo = 0, hi = 20) => Number.isInteger(n) && n >= lo && n <= hi;

/* ---- Pembantu ---- */
cek(D.opsiB2(18).length === 3 && D.opsiB2(18).includes(18), "opsiB2 memuat kunci");
for (let n = 0; n <= 20; n += 1) {
  const o = D.opsiB2(n);
  cek(new Set(o).size === 3 && o.includes(n) && o.every((x) => dalam(x)), `opsiB2(${n}) tiga pilihan berbeda dalam jangkauan: ${o}`);
}
for (const n of [3, 4, 5, 8, 10]) {
  const u = D.urutanTetap(n);
  cek(u.length === n && new Set(u).size === n && u.every((x) => x >= 0 && x < n), `urutanTetap(${n}) permutasi: ${u}`);
}

/* ---- Sub-Bab A ---- */
for (const r of D.RONDE_PETIK_A) cek(dalam(r.a + r.b) && r.a >= 10 && r.b >= 2, `petik ${r.a}+${r.b}`);
for (const r of D.RONDE_GABUNG_A) {
  const s = D.susunTambah(r.a, r.b);
  cek(!s.pindah && s.hasil === r.a + r.b, `gabung ${r.a}+${r.b} tanpa pindah`);
  cek(D.satuanDari(r.a) + r.b <= 9, `gabung satuan <= 9 pada ${r.a}+${r.b}`);
}
for (const r of D.RONDE_PINDAH_A) {
  cek(D.satuanDari(r.a) + r.b === 10, `pindah ${r.a}+${r.b}: satuan genap sepuluh`);
  cek(r.a + r.b === 20, `pindah ${r.a}+${r.b} = 20`);
}
for (const r of D.RONDE_NERACA_A) {
  const k = D.bagianHilang(r);
  cek(k > 0 && k <= 9 && r.x + r.y === r.z + k && dalam(r.x + r.y), `neraca ${r.x}+${r.y}=${r.z}+${k}`);
}
for (const r of D.RONDE_LOMPAT_A) cek(r.a >= D.JALUR_A.dari && r.a + r.b <= D.JALUR_A.sampai, `lompat ${r.a}+${r.b} dalam jalur ${D.JALUR_A.dari}-${D.JALUR_A.sampai}`);
for (const r of D.RONDE_SUSUN_A) {
  const s = D.susunTambah(r.a, r.b);
  cek(s.hasil === r.a + r.b, `susun tambah ${r.a}+${r.b} = ${s.hasil}`);
  cek(s.satuanHasil >= 0 && s.satuanHasil <= 9 && dalam(s.hasil), `susun tambah ${r.a}+${r.b} satuan hasil satu angka`);
}
cek(D.susunTambah(14, 3).pindah === false && D.susunTambah(13, 7).pindah === true, "susun tambah: pindah hanya pada 13+7");
cek(D.susunTambah(13, 7).satuanHasil === 0 && D.susunTambah(13, 7).jumlahPuluhan === 2, "13+7: satuan 0, puluhan 2");
for (const r of D.RONDE_BAGAN_A) {
  const l = D.langkahBaganTambah(r.a, r.b);
  cek(l.length === 3, `bagan tambah ${r.a}+${r.b}: tiga langkah`);
  cek(l[2].jawab === r.a + r.b, `bagan tambah ${r.a}+${r.b}: hasil akhir`);
  cek(l[0].jawab + 10 === r.a, `bagan tambah ${r.a}+${r.b}: pisah`);
  cek(l.every((x) => dalam(x.jawab)), `bagan tambah ${r.a}+${r.b}: jawaban dalam jangkauan`);
}
for (const r of D.RONDE_CARA_A) {
  for (const c of ["maju", "susun", "pasang"]) {
    const t = D.langkahCaraTambah(c, r.a, r.b);
    cek(typeof t === "string" && t.length > 5 && t.includes(String(r.a + r.b)), `cara ${c} ${r.a}+${r.b} memuat hasil`);
  }
  const semua = ["maju", "susun", "pasang"].map((c) => D.langkahCaraTambah(c, r.a, r.b));
  cek(new Set(semua).size === 3, `cara ${r.a}+${r.b}: tiga langkah berbeda`);
}
for (const [i, ronde] of D.RONDE_KEMBAR_A.entries()) {
  cek(ronde.length === 4, `kembar ronde ${i + 1}: empat pasang`);
  const nilai = ronde.map(([p, q]) => {
    cek(p.a + p.b === q.a + q.b, `kembar ${p.a}+${p.b} sama dengan ${q.a}+${q.b}`);
    cek(!(p.a === q.a && p.b === q.b), `kembar: dua kalimat berbeda ${p.a}+${p.b}`);
    cek(dalam(p.a + p.b), `kembar: hasil dalam jangkauan ${p.a}+${p.b}`);
    return p.a + p.b;
  });
  cek(new Set(nilai).size === 4, `kembar ronde ${i + 1}: nilai tiap pasangan berbeda ${nilai}`);
}
cek(dalam(D.TULIS_A_RONDE1.a + D.TULIS_A_RONDE1.b, 10), "tulis A ronde 1");
for (const r of D.TULIS_A_PILIHAN) cek(dalam(r.a + r.b, 10), `tulis A pilihan ${r.a}+${r.b}`);

/* ---- Sub-Bab B ---- */
for (const r of D.RONDE_BERI_B) cek(dalam(r.a - r.b) && r.a - r.b >= 2 && r.b >= 2, `beri ${r.a}-${r.b}`);
for (const r of D.RONDE_SELISIH_B) cek(r.besar > r.kecil && dalam(r.besar) && r.besar - r.kecil >= 2, `selisih ${r.besar}-${r.kecil}`);
for (const r of D.RONDE_URAI_B) {
  const s = D.susunKurang(r.a, r.b);
  cek(s.hasil === r.a - r.b, `urai ${r.a}-${r.b} = ${s.hasil}`);
}
cek(D.perluUrai(12, 8) && D.perluUrai(13, 5) && !D.perluUrai(16, 4), "urai: 12-8 dan 13-5 perlu, 16-4 tidak");
for (const r of D.RONDE_TAMBAHPAS_B) cek(r.besar > r.kecil && dalam(r.besar) && r.besar - r.kecil <= 9, `tambah pas ${r.kecil} ke ${r.besar}`);
for (const r of D.RONDE_MUNDUR_B) cek(r.a <= D.JALUR_B.sampai && r.a - r.b >= D.JALUR_B.dari, `mundur ${r.a}-${r.b} dalam jalur ${D.JALUR_B.dari}-${D.JALUR_B.sampai}`);
for (const r of D.RONDE_SUSUN_B) {
  const s = D.susunKurang(r.a, r.b);
  cek(s.hasil === r.a - r.b, `susun kurang ${r.a}-${r.b} = ${s.hasil}`);
  cek(s.satuanHasil >= 0 && s.satuanHasil <= 9 && s.puluhanHasil >= 0, `susun kurang ${r.a}-${r.b} hasil bukan negatif`);
}
cek(D.susunKurang(14, 3).urai === false && D.susunKurang(13, 5).urai === true && D.susunKurang(13, 7).urai === true, "susun kurang: urai pada 13-5 dan 13-7");
cek(D.susunKurang(13, 5).satuanAtas === 13 && D.susunKurang(13, 5).puluhanAtas === 0, "13-5: satuan 13, puluhan 0");
cek(D.susunKurang(20, 6).urai && D.susunKurang(20, 6).hasil === 14, "20-6 urai dan hasil 14");
for (const r of D.RONDE_BAGAN_B) {
  const l = D.langkahBaganKurang(r.a, r.b);
  cek(l.length === 5, `bagan kurang ${r.a}-${r.b}: lima langkah`);
  cek(l[4].jawab === r.a - r.b, `bagan kurang ${r.a}-${r.b}: hasil`);
  cek(l[3].jawab >= 0, `bagan kurang ${r.a}-${r.b}: satuan tidak negatif`);
  cek(!D.perluUrai(r.a, r.b), `bagan kurang ${r.a}-${r.b}: tanpa urai`);
}
for (const [i, ronde] of D.RONDE_SORT_B.entries()) {
  cek(ronde.length === 5, `sort ronde ${i + 1}: lima kartu`);
  const perlu = ronde.filter((r) => D.perluUrai(r.a, r.b)).length;
  cek(perlu >= 2 && perlu <= 3, `sort ronde ${i + 1}: campuran perlu dan tidak (${perlu})`);
  for (const r of ronde) cek(r.a > r.b && dalam(r.a), `sort ${r.a}-${r.b}`);
}
for (const [x, y, z] of D.RONDE_KELUARGA_B) {
  cek(x + y === z && dalam(z) && x !== y, `keluarga ${x},${y},${z}`);
  const baris = D.barisKeluarga(x, y);
  cek(baris.length === 4, "keluarga: empat kalimat");
  for (const b of baris) {
    const a = b.teks.map((t, i) => (i === b.kosong ? String(b.jawab) : t));
    const kiri = a[1] === "+" ? Number(a[0]) + Number(a[2]) : Number(a[0]) - Number(a[2]);
    cek(kiri === Number(a[4]), `keluarga ${a.join(" ")}`);
    cek(b.kosong % 2 === 0 && b.teks[b.kosong] === "?", `keluarga: kosong di bilangan ${a.join(" ")}`);
  }
}
for (const [i, s] of D.RONDE_DETEKTIF_B.entries()) {
  cek(s.opsi.includes(s.jawab) && new Set(s.opsi).size === 3 && s.petunjuk.length === 2, `detektif B ${i + 1}: opsi memuat kunci`);
}
const d = D.RONDE_DETEKTIF_B;
cek(d[0].jawab - 5 === 12 && d[0].jawab < 20 && !(d[0].opsi.filter((o) => o - 5 === 12 && o < 20).length > 1), "detektif B1");
cek(Math.abs(d[1].jawab - 12) === 6 && d[1].jawab > 12 && d[1].opsi.filter((o) => Math.abs(o - 12) === 6 && o > 12).length === 1, "detektif B2");
cek(20 - d[2].jawab === 14 && d[2].jawab < 10 && d[2].opsi.filter((o) => 20 - o === 14 && o < 10).length === 1, "detektif B3");
cek(d[3].jawab + 8 === 19 && d[3].jawab < 12 && d[3].opsi.filter((o) => o + 8 === 19 && o < 12).length === 1, "detektif B4");

/* ---- Sub-Bab C ---- */
for (const r of D.RONDE_BURUNG_C) {
  cek(r.m > r.h && dalam(r.h + r.m), `burung ${r.h},${r.m}`);
  for (const k of D.URUTAN_KATA) {
    const j = D.jawabKataBurung(k, r);
    cek(dalam(j, 1), `burung ${k} ${r.h},${r.m} = ${j}`);
    cek(D.tanyaKataBurung(k, r).length > 10, `burung tanya ${k}`);
  }
  cek(D.jawabKataBurung("jumlah", r) === r.h + r.m && D.jawabKataBurung("selisih", r) === r.m - r.h, `burung ${r.h},${r.m}: jumlah dan selisih`);
}
for (const r of [...D.RONDE_DONAT_C, ...D.RONDE_MODEL_C]) {
  const b = D.bilanganPembanding(r);
  cek(b >= 1 && dalam(b) && dalam(D.jumlahBanding(r)), `banding ${r.acuan}-${r.pembanding}: b=${b}, jumlah=${D.jumlahBanding(r)}`);
  cek(r.jenis === "lebih" ? b > r.a : b < r.a, `banding ${r.acuan}: arah ${r.jenis}`);
}
cek(D.bilanganPembanding(D.RONDE_DONAT_C[0]) === 7 && D.jumlahBanding(D.RONDE_DONAT_C[0]) === 19, "donat Tika-Malosi: 7 dan 19 (buku hlm. 55)");
for (const r of D.RONDE_JERUK_C) cek(dalam(D.jerukSemula(r)) && D.jerukSemula(r) - r.diberi === r.sisa, `jeruk ${r.diberi}/${r.sisa}`);
cek(D.jerukSemula(D.RONDE_JERUK_C[0]) === 16, "jeruk Halim 16 (buku hlm. 56)");
for (const t of D.RONDE_BONEKA_C) {
  const jumlah = t[0] + t[1] + t[2];
  cek(dalam(jumlah, 15), `boneka ${t} jumlah ${jumlah}`);
  cek(D.pasanganSepuluh(t) !== null || t.join() === "5,7,8", `boneka ${t}: ada pasangan sepuluh (kecuali buku)`);
}
cek(D.RONDE_BONEKA_C[0].reduce((a, b) => a + b, 0) === 20, "boneka 5+7+8 = 20 (buku hlm. 56)");
for (const [i, s] of D.RONDE_ALUR_C.entries()) {
  cek(s.langkah.length === 4 && s.langkah.map((l) => l.nama).join() === "Diketahui,Ditanya,Solusi,Kesimpulan", `alur ${i + 1}: empat langkah berurutan`);
  const u = D.URUTAN_KARTU_ALUR[i];
  cek(u.length === 4 && new Set(u).size === 4 && u.join() !== "0,1,2,3", `alur ${i + 1}: kartu teracak`);
}
for (const [i, s] of D.RONDE_PANAH_C.entries()) {
  const h = D.hasilPanah(s);
  cek(s.mulai >= s.dari && s.mulai <= s.sampai && h >= s.dari && h <= s.sampai, `panah ${i + 1}: mulai dan hasil dalam jalur`);
  cek(s.sampai - s.dari + 1 <= 16, `panah ${i + 1}: jalur tidak lebih dari 16 kotak`);
}
cek(D.hasilPanah(D.RONDE_PANAH_C[0]) === 19 && D.hasilPanah(D.RONDE_PANAH_C[1]) === 12 && D.hasilPanah(D.RONDE_PANAH_C[2]) === 16, "panah: 19, 12, 16");
cek(D.RONDE_KATA_C.length === 2 && D.RONDE_KATA_C.every((r) => r.length === 4 && r.some((k) => k.tanda === "+") && r.some((k) => k.tanda === "−")), "kata kunci: dua ronde campuran tambah dan kurang");
for (const r of D.RONDE_KATA_C) for (const k of r) cek(k.teks.includes(k.sorot) || k.teks.toLowerCase().includes(k.sorot.toLowerCase()), `kata kunci: sorot "${k.sorot}" ada di kalimat`);
for (const [i, s] of D.RONDE_LAPORAN_C.entries()) {
  cek(s.langkah.length === 4, `laporan ${i + 1}: empat langkah`);
  for (const l of s.langkah) cek(l.opsi.length === 3 && l.benar === 0 && new Set(l.opsi).size === 3, `laporan ${i + 1} ${l.nama}: tiga opsi, kunci pertama`);
  cek(s.langkah[3].opsi[0].includes(String(s.hasil)), `laporan ${i + 1}: kesimpulan memuat hasil ${s.hasil}`);
  cek(s.langkah[2].opsi[0].includes(String(s.hasil)), `laporan ${i + 1}: solusi memuat hasil ${s.hasil}`);
  cek(dalam(s.hasil, 1), `laporan ${i + 1}: hasil dalam jangkauan`);
}
cek(D.RONDE_LAPORAN_C[0].hasil === 13 - 6 && D.RONDE_LAPORAN_C[1].hasil === 8 + 6 + 4 && D.RONDE_LAPORAN_C[2].hasil === 11 - 3, "laporan: 7, 18, 8");
for (const o of D.RONDE_LAPORAN_C[0].langkah[2].opsi.slice(1)) cek(o !== "13 − 6 = 7", "laporan: distraktor berbeda dari kunci");
cek(D.putarOpsi(5, 3) === 2, "putarOpsi");

/* Pencipta soal cerita */
for (const [i, p] of D.AWAL_CERITA.entries()) {
  const c = D.cerita(p);
  cek(c.valid, `pencipta awal ${i + 1} valid`);
  cek(p.jenis === "tambah" ? c.hasil === p.n + p.m : c.hasil === p.n - p.m, `pencipta awal ${i + 1}: hasil`);
  cek(dalam(c.hasil, 1), `pencipta awal ${i + 1}: hasil 1 sampai 20`);
  cek(c.teks.includes(p.tokohB) && c.solusi.includes(String(c.hasil)) && c.jadi.includes(String(c.hasil)), `pencipta awal ${i + 1}: teks lengkap`);
}
cek(!D.cerita({ jenis: "tambah", tokohA: "Tika", tokohB: "Kira", benda: "donat", n: 15, m: 9 }).valid, "pencipta: 15+9 melebihi 20 tidak valid");
cek(!D.cerita({ jenis: "kurang", tokohA: "Tika", tokohB: "Kira", benda: "donat", n: 5, m: 5 }).valid, "pencipta: 5-5 tidak valid");
cek(!D.cerita({ jenis: "kurang", tokohA: "Tika", tokohB: "Tika", benda: "donat", n: 9, m: 3 }).valid, "pencipta: tokoh sama tidak valid");
let semuaSah = true;
for (let n = D.BATAS_CERITA.n[0]; n <= D.BATAS_CERITA.n[1]; n += 1)
  for (let m = D.BATAS_CERITA.m[0]; m <= D.BATAS_CERITA.m[1]; m += 1)
    for (const jenis of ["tambah", "kurang"]) {
      const c = D.cerita({ jenis, tokohA: "Tika", tokohB: "Kira", benda: "donat", n, m });
      if (c.valid && (c.hasil < 1 || c.hasil > 20)) semuaSah = false;
    }
cek(semuaSah, "pencipta: semua pilihan valid menghasilkan 1 sampai 20");

/* ---- Naskah ---- */
const kalimatDari = (t) => (t.match(/[^.!?]+[.!?]+/g) ?? [t]).map((k) => k.trim()).filter(Boolean);
cek(N.SUB_BAB_K2B2.length === 3, "tiga sub-bab");
cek(N.K2B2_META.suaraLaju === 0.7 && N.K2B2_META.suaraNada === 1, "suara: laju 0,70 dan nada 1");
for (const s of N.SUB_BAB_K2B2) {
  cek(s.videos.length === 3, `${s.id}: tiga video`);
  for (const v of s.videos) {
    cek(v.adegan.length >= 2 && v.adegan.length <= 4, `${v.id}: dua sampai empat adegan`);
    for (const a of v.adegan) {
      cek(a.ketukan.length === a.papan.length, `${a.id}: ketukan (${a.ketukan.length}) dan papan (${a.papan.length}) sama banyak`);
      cek(a.ketukan.every((k) => k.length <= 190 && k.length >= 12), `${a.id}: tiap ketukan 12 sampai 190 huruf`);
      cek(a.papan.every((p) => p.length <= 30 && p.length >= 4), `${a.id}: papan judul 4 sampai 30 huruf`);
      cek(!a.ketukan.some((k) => /[+=]|\d\s*[−-]\s*\d/.test(k) && !/\d+,/.test(k) && /\s[+=−]\s/.test(k)), `${a.id}: ketukan memakai kata, bukan lambang + atau −`);
      cek(a.ketukan.every((k) => kalimatDari(k).length >= 1), `${a.id}: ketukan terbaca sebagai kalimat`);
    }
  }
  cek(s.mindMaps.length === 8 && s.mindMaps.every((m, i) => m.stepNumber === i + 1 && m.stepDesc.length > 150 && m.stepTitle.startsWith(`${i + 1}. `)), `${s.id}: delapan langkah peta pikiran dengan uraian`);
  cek(s.mindMaps.every((m, i) => (i === 0 ? true : m.flowFrom === s.mindMaps[i - 1].flowTo)), `${s.id}: alur peta pikiran bersambung`);
  cek(s.infografis.length === 10 && s.infografis.every((p) => p.suara.length > 80 && p.countWord && p.judul), `${s.id}: sepuluh panel infografis`);
  cek(s.games.length === 10, `${s.id}: sepuluh permainan`);
  cek(s.games.filter((g) => g.stage === "Concrete").length === 4 && s.games.filter((g) => g.stage === "Picture").length === 3 && s.games.filter((g) => g.stage === "Abstract").length === 3, `${s.id}: 4 Concrete, 3 Picture, 3 Abstract`);
  cek(new Set(s.games.map((g) => g.gameType)).size === 10, `${s.id}: sepuluh jenis permainan berbeda`);
  cek(new Set(s.games.map((g) => g.title)).size === 10, `${s.id}: sepuluh judul berbeda`);
  cek(s.poin.length === 5 && s.refleksi.length === 4 && s.rumah.length > 60, `${s.id}: poin penting, refleksi, rumah`);
  cek(s.silabus.teksSuara.length > 200 && s.silabus.cp.length > 100 && s.silabus.referensi.includes("Bab 2"), `${s.id}: silabus lengkap`);
  for (const g of s.games) {
    cek(g.mechanicDescription.length > 80 && g.objective.length > 30 && g.voiceGuide.length > 15, `${s.id} ${g.title}: deskripsi lengkap`);
    if (g.stage === "Concrete") cek(typeof g.emoji === "string" && Number.isInteger(g.targetCount), `${s.id} ${g.title}: Concrete memuat emoji dan targetCount`);
    if (g.stage === "Picture") cek(typeof g.diagramType === "string" && Number.isInteger(g.numberA), `${s.id} ${g.title}: Picture memuat diagramType`);
    if (g.stage === "Abstract") cek(!!g.symbolLarge && !!g.wordLarge && !!g.mathNotation, `${s.id} ${g.title}: Abstract memuat lambang`);
  }
  /* Batas Concrete dan Picture: tidak ada emoji benda di naskah Picture. */
  for (const g of s.games.filter((x) => x.stage === "Picture")) {
    cek(!/\p{Extended_Pictographic}/u.test(g.title + g.objective + g.mechanicDescription), `${s.id} ${g.title}: naskah Picture tanpa emoji benda`);
  }
}
const semuaJudulGame = N.SUB_BAB_K2B2.flatMap((s) => s.games.map((g) => g.title));
cek(semuaJudulGame.length === 30, "tiga puluh permainan seluruhnya");
cek(N.semuaAdegan().length === 25, `dua puluh lima adegan video (ada ${N.semuaAdegan().length})`);

/* ---- JSON publik (bila sudah dibangkitkan) ---- */
if (fs.existsSync("src/data/kelas2-bab2.json")) {
  const teks = fs.readFileSync("src/data/kelas2-bab2.json", "utf8");
  cek(!/"correct_index"|"correctAnswer"|"explanation"/.test(teks), "JSON publik tanpa kunci jawaban");
  const j = JSON.parse(teks);
  cek(j.chapter_id === "k2-mat-bab2" && j.phase_code === "FASE_A" && j.grade === 2, "JSON: chapter_id, phase_code, grade");
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
  cek(!/rupiah|Rp\s?\d|kurs/i.test(teks), "JSON: tanpa nilai tukar rupiah");
} else {
  console.log("(JSON publik belum dibangkitkan, bagian ini dilewati)");
}

console.log(`\nData Kelas 2 Bab 2: ${lulus} lulus, ${gagal} gagal`);
process.exit(gagal ? 1 : 0);
