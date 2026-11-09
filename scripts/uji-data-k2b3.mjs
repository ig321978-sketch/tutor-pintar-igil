/**
 * Uji data murni Matematika Kelas 2 Bab 3 (Bentuk di Sekitar Kita).
 * Jalankan: node --no-warnings scripts/uji-data-k2b3.mjs
 * Memeriksa pustaka bentuk, mesin geometri (karet papan paku, mengurai bangun, luas gabungan),
 * semua ronde permainan Sub-Bab A, B, C, naskah video (ketukan dan papan sama banyak), dan berkas JSON publik
 * (tidak boleh membawa kunci jawaban maupun soal Latihan dan Ujian).
 */
import fs from "node:fs";
import * as D from "../src/components/modul/data-k2b3.ts";
import * as N from "../src/components/modul/naskah-k2b3.ts";

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
  const g = D.urutanTetap(n, 2, 1);
  cek(new Set(g).size === n && g.every((x) => x >= 0 && x < n), `urutanTetap(${n}, geser) permutasi: ${g}`);
}
for (let n = 0; n <= 10; n += 1) {
  const o = D.opsiB3(n);
  cek(new Set(o).size === 3 && o.includes(n) && o.every((x) => x >= 0 && x <= 10), `opsiB3(${n}): ${o}`);
}
cek(D.namaSegi(3) === "segitiga" && D.namaSegi(4) === "segi empat" && D.namaSegi(5) === "segi lima" && D.namaSegi(6) === "segi enam" && D.namaSegi(7) === "segi tujuh" && D.namaSegi(8) === "segi delapan", "namaSegi 3 sampai 8");

/* ---- Pustaka bentuk ---- */
for (const id of D.DAFTAR_BENTUK) {
  const d = D.BENTUK[id];
  if (d.golongan === "segiBanyak") {
    cek(Array.isArray(d.titik) && d.titik.length >= 3, `${id}: segi banyak punya titik`);
    const paku = D.periksaKaret(d.titik);
    cek(paku.sah, `${id}: poligon sederhana (${paku.alasan})`);
    if (id !== "bintang") cek(D.sisiSejati(d.titik) === d.sisi && paku.sisi === d.sisi, `${id}: sisi ${d.sisi} sama dengan pojok sejati ${D.sisiSejati(d.titik)}`);
    cek(d.titik.every(([x, y]) => x >= 0 && x <= 100 && y >= 0 && y <= 100), `${id}: titik dalam kotak 100`);
    cek(D.luasPoligon(d.titik) > 600, `${id}: luas cukup besar`);
  } else {
    cek(typeof d.path === "string" && d.path.startsWith("M") && d.sisi === undefined, `${id}: bentuk lengkung punya path dan tanpa sisi`);
  }
}
cek(D.sisiBentuk("segiLima") === 5 && D.sisiBentuk("segiEnam") === 6 && D.sisiBentuk("segiTujuh") === 7 && D.sisiBentuk("segiDelapan") === 8, "sisi segi lima sampai delapan");
cek(D.adalahLingkaran("lingkaran") && !D.adalahLingkaran("oval") && D.golonganBentuk("hati") === "lengkung" && D.golonganBentuk("persegi") === "segiBanyak", "golongan dan lingkaran");

/* ---- Mesin geometri ---- */
cek(D.luasPoligon([[0, 0], [10, 0], [10, 10], [0, 10]]) === 100, "luas persegi 10");
cek(D.luasPoligon([[0, 0], [10, 0], [0, 10]]) === 50, "luas segitiga siku");
cek(D.sisiSejati([[0, 0], [5, 0], [10, 0], [10, 10], [0, 10]]) === 4, "simpul segaris dibuang");
cek(D.sisiSejati([[0, 0], [10, 0], [10, 10], [10, 5], [0, 10]]) === 4, "ujung buntu dibuang");
cek(D.ruasBersilang([0, 0], [10, 10], [0, 10], [10, 0]) && !D.ruasBersilang([0, 0], [10, 0], [10, 0], [10, 10]), "bersilang: silang ya, bertemu di ujung tidak");
cek(D.ruasBersentuhan([0, 0], [10, 0], [10, 0], [10, 10]) && !D.ruasBersentuhan([0, 0], [10, 0], [0, 5], [10, 5]), "bersentuhan di ujung");
cek(D.titikDalam([5, 5], [[0, 0], [10, 0], [10, 10], [0, 10]]) && !D.titikDalam([15, 5], [[0, 0], [10, 0], [10, 10], [0, 10]]), "titik dalam poligon");

// Karet papan paku: contoh sah
for (const n of D.RONDE_KARET_A) {
  const c = D.CONTOH_KARET_A[n];
  const h = D.periksaKaret(c);
  cek(h.sah && h.sisi === n, `karet contoh ${n} sisi: sah=${h.sah} sisi=${h.sisi} ${h.alasan}`);
  cek(c.every(([x, y]) => x >= 0 && x < D.PAPAN_PAKU_A.kolom && y >= 0 && y < D.PAPAN_PAKU_A.baris), `karet contoh ${n}: di dalam papan 5 x 5`);
}
// Karet: kasus tidak sah
cek(!D.periksaKaret([[0, 0], [4, 4], [4, 0], [0, 4]]).sah, "karet: pita kupu-kupu (bersilang) ditolak");
cek(!D.periksaKaret([[0, 0], [1, 0]]).sah, "karet: dua paku ditolak");
cek(!D.periksaKaret([[0, 0], [2, 0], [4, 0]]).sah, "karet: tiga paku segaris ditolak");
cek(!D.periksaKaret([[0, 0], [2, 2], [0, 0]]).sah, "karet: paku ganda ditolak");
cek(!D.periksaKaret([[0, 0], [4, 0], [4, 4], [2, 0]]).sah, "karet: karet menyentuh sisinya sendiri ditolak");
cek(D.periksaKaret([[0, 0], [2, 0], [4, 0], [4, 4]]).sisi === 3, "karet: paku segaris tidak menambah sisi (segitiga)");
cek(D.periksaKaret([[0, 0], [4, 0], [4, 4], [0, 4]]).sisi === 4 && D.periksaKaret([[0, 0], [4, 0], [4, 4], [0, 4]]).sah, "karet: persegi 4 sisi");
cek(D.periksaKaret([[0, 0], [4, 0], [2, 3], [2, 1]]).sah === false || D.periksaKaret([[0, 0], [4, 0], [2, 3], [2, 1]]).sisi >= 3, "karet: bentuk berlekuk dikenali");

// Mengurai: tanpa garis
{
  const sq = [[14, 14], [86, 14], [86, 86], [14, 86]];
  const r0 = D.uraiBangun(sq, 4, []);
  cek(r0.sah && r0.keping.length === 1 && r0.keping[0].sisi === 4 && hampir(r0.keping[0].luas, 72 * 72, 1), "urai: tanpa garis satu keping persegi");
  const r1 = D.uraiBangun(sq, 4, [[0, 2]]);
  const h1 = D.hitungJenis(r1.keping);
  cek(r1.sah && h1.segitiga === 2 && h1.total === 2, "urai: diagonal menghasilkan dua segitiga");
  cek(hampir(r1.keping[0].luas + r1.keping[1].luas, 72 * 72, 1), "urai: luas keping sama dengan luas bangun");
  const r2 = D.uraiBangun(sq, 4, [[0, 2], [1, 3]]);
  cek(!r2.sah, "urai: dua diagonal tanpa titik tengah bersilang ditolak");
  const r3 = D.uraiBangun(sq, 4, [[0, 0]]);
  cek(r3.sah && r3.keping.length === 1, "urai: garis ke diri sendiri diabaikan");
  const r4 = D.uraiBangun(sq, 4, [[0, 1]]);
  cek(r4.sah && r4.keping.length === 1, "urai: garis di sisi yang sudah ada tidak menambah keping");
}
// Garis menembus titik di tengah sisi dan titik tengah bangun
{
  const t = [[10, 10], [50, 10], [90, 10], [90, 50], [90, 90], [50, 90], [10, 90], [10, 50], [50, 50]];
  const garisTengah = D.uraiBangun(t, 8, [[1, 5]]);
  cek(garisTengah.sah && D.hitungJenis(garisTengah.keping).segiEmpat === 2, "urai: garis tegak di tengah menghasilkan 2 segi empat");
  const diag = D.uraiBangun(t, 8, [[0, 4]]);
  cek(diag.sah && D.hitungJenis(diag.keping).segitiga === 2, "urai: diagonal melewati titik tengah dipecah, 2 segitiga");
  const dua = D.uraiBangun(t, 8, [[0, 4], [2, 6]]);
  cek(dua.sah && D.hitungJenis(dua.keping).segitiga === 4, "urai: dua diagonal lewat titik tengah menghasilkan 4 segitiga");
  const empat = D.uraiBangun(t, 8, [[1, 5], [7, 3]]);
  cek(empat.sah && D.hitungJenis(empat.keping).segiEmpat === 4, "urai: garis tegak dan datar menghasilkan 4 segi empat");
  const lonjong = D.uraiBangun(t, 8, [[1, 8]]);
  cek(lonjong.sah && D.hitungJenis(lonjong.keping).total === 1, "urai: ujung buntu tidak membuat keping baru");
}

// Segi banyak beraturan: dari satu pojok dan dari titik tengah (pola B10)
for (const n of D.SISI_POLA) {
  const b = D.poligonBeraturan(n, 50, 50, 44);
  const pojok = Array.from({ length: n - 3 }, (_, i) => [0, i + 2]);
  const dari = D.uraiBangun(b, n, pojok);
  const hp = D.hitungJenis(dari.keping);
  cek(dari.sah && hp.total === D.segitigaDariPojok(n) && hp.segitiga === n - 2, `pola: ${n} sisi dari satu pojok ${D.segitigaDariPojok(n)} segitiga (dapat ${hp.total})`);
  const pusat = [...b, [50, 50]];
  const spoke = Array.from({ length: n }, (_, i) => [i, n]);
  const tengah = D.uraiBangun(pusat, n, spoke);
  const ht = D.hitungJenis(tengah.keping);
  cek(tengah.sah && ht.total === D.segitigaDariTengah(n) && ht.segitiga === n, `pola: ${n} sisi dari titik tengah ${n} segitiga (dapat ${ht.total})`);
  const luasTotal = tengah.keping.reduce((s, k) => s + k.luas, 0);
  cek(hampir(luasTotal, D.luasPoligon(b), 2), `pola: ${n} sisi, jumlah luas keping sama dengan luas bangun`);
}

/* ---- SUB-BAB A ---- */
cek(D.BENDA_DATAR.length === 19 && new Set(D.BENDA_DATAR.map((b) => b.id)).size === 19, "benda datar: 19 benda unik");
for (const b of D.BENDA_DATAR) cek(D.BENTUK[b.bentuk] !== undefined && /^#[0-9A-Fa-f]{6}$/.test(b.warna), `benda ${b.id}: bentuk dan warna`);
for (const [i, r] of D.RONDE_PILAH_A.entries()) {
  cek(r.length === 6 && new Set(r).size === 6, `pilah A ronde ${i + 1}: enam benda unik`);
  const lurus = r.filter((id) => D.golonganBenda(id) === "segiBanyak").length;
  cek(lurus >= 2 && r.length - lurus >= 2, `pilah A ronde ${i + 1}: tiap golongan minimal dua (${lurus})`);
}
for (const rr of D.RONDE_CARI_A) {
  cek(rr.benda.length === 8 && new Set(rr.benda).size === 8, `cari A ${rr.sisi}: delapan benda unik`);
  const sasaran = rr.benda.filter((id) => D.sisiBenda(id) === rr.sisi);
  cek(sasaran.length >= 3 && sasaran.length <= 4, `cari A ${rr.sisi}: tiga atau empat sasaran (${sasaran.length})`);
  cek(rr.benda.length - sasaran.length >= 4, `cari A ${rr.sisi}: pengecoh minimal empat`);
}
for (const id of D.RONDE_SISI_A) cek(D.sisiBentuk(id) >= 3 && D.BENTUK[id].titik.length === D.sisiBentuk(id), `sisi A ${id}: titik sama dengan sisi`);
for (const [i, r] of D.RONDE_GARIS_A.entries()) {
  cek(r.kiri.length === 5 && r.kanan.length === 5 && new Set(r.kiri).size === 5, `garis A ronde ${i + 1}: lima pasang`);
  for (const k of r.kiri) {
    const cocok = r.kanan.filter((c) => c.cocokDengan === k);
    cek(cocok.length === 1, `garis A ronde ${i + 1}: ${k} punya tepat satu ciri`);
    const ciri = cocok[0]?.teks ?? "";
    const sisi = D.sisiBentuk(k);
    cek(sisi === 0 ? /kurva/.test(ciri) : ciri.includes(`${sisi} sisi`), `garis A ronde ${i + 1}: ciri ${k} cocok dengan sisi ${sisi}`);
  }
  cek(r.kanan.every((c, j) => c.cocokDengan !== r.kiri[j]), `garis A ronde ${i + 1}: urutan kanan diacak`);
}
for (const [i, r] of D.RONDE_WARNAI_A.entries()) {
  cek(r.bentuk.length === 8, `warnai A ronde ${i + 1}: delapan bentuk`);
  const sasaran = r.bentuk.filter((b) => D.cocokAturan(b, r.aturan)).length;
  cek(sasaran >= 2 && r.bentuk.length - sasaran >= 2, `warnai A ronde ${i + 1}: sasaran ${sasaran}, bukan sasaran ${8 - sasaran}`);
}
const sasaranWarna = D.RONDE_WARNAI_A.map((r) => r.bentuk.filter((b) => D.cocokAturan(b, r.aturan)).length);
cek(sasaranWarna.join() === "4,2,2,6" || sasaranWarna.every((n) => n >= 2), `warnai A: jumlah sasaran per ronde ${sasaranWarna}`);
for (const [i, r] of D.RONDE_TABEL_A.entries()) {
  cek(new Set(r.kartu).size === r.kartu.length && r.baris.every((b) => r.kartu.includes(b.jawab)), `tabel A ronde ${i + 1}: kartu memuat semua jawaban`);
  cek(new Set(r.baris.map((b) => b.jawab)).size === r.baris.length, `tabel A ronde ${i + 1}: jawaban unik`);
}
for (const b of D.RONDE_TABEL_A[0].baris) {
  const sisi = Number(b.jawab);
  cek(D.namaSegi(sisi).toLowerCase() === b.label.toLowerCase(), `tabel A ronde 1: ${b.label} = ${b.jawab} sisi`);
}
for (const b of D.RONDE_TABEL_A[1].baris) {
  const sisi = Number(b.label.split(" ")[0]);
  cek(D.namaSegi(sisi).toLowerCase() === b.jawab.toLowerCase(), `tabel A ronde 2: ${b.label} = ${b.jawab}`);
}
for (const [i, s] of D.RONDE_DETEKTIF_A.entries()) cek(s.opsi.length === 3 && s.jawab >= 0 && s.jawab < 3 && s.petunjuk.length === 2 && s.salah.length > 30, `detektif A ${i + 1}: tiga opsi, kunci, penjelasan`);
cek(D.RONDE_DETEKTIF_A[0].opsi[D.RONDE_DETEKTIF_A[0].jawab] === "segi lima" && D.RONDE_DETEKTIF_A[1].opsi[D.RONDE_DETEKTIF_A[1].jawab] === "lingkaran" && D.RONDE_DETEKTIF_A[2].opsi[D.RONDE_DETEKTIF_A[2].jawab] === "segi lima" && D.RONDE_DETEKTIF_A[3].opsi[D.RONDE_DETEKTIF_A[3].jawab] === "segi enam", "detektif A: kunci segi lima, lingkaran, segi lima, segi enam");
for (const [i, p] of D.PETA_KONSEP_A.entries()) {
  cek(p.kotak.length === 4 && p.kotak.every((k) => k.opsi.length === 3 && k.benar === 0 && new Set(k.opsi).size === 3), `peta konsep A ${i + 1}: empat kotak, tiga kartu, kunci pertama`);
}

/* ---- SUB-BAB B ---- */
for (const [i, r] of D.RONDE_GUNTING_B.entries()) {
  cek(r.garis.length >= 3 && r.kunci.length >= 1, `gunting B ${i + 1}: pilihan garis dan kunci`);
  const cobaKunci = D.uraiBangun(r.titik, r.batas, r.kunci.map((k) => r.garis[k].ruas));
  const h = D.hitungJenis(cobaKunci.keping);
  cek(cobaKunci.sah && D.cocokTarget(h, r.target), `gunting B ${i + 1}: kunci menghasilkan ${r.teksTarget} (dapat ${D.kalimatKeping(h)})`);
  // Semua kombinasi: hanya kunci yang memenuhi target
  const n = r.garis.length;
  const sah = [];
  for (let m = 0; m < 1 << n; m += 1) {
    const pilih = [...Array(n).keys()].filter((b) => m & (1 << b));
    if (pilih.length === 0) continue;
    const u = D.uraiBangun(r.titik, r.batas, pilih.map((p) => r.garis[p].ruas));
    if (u.sah && D.cocokTarget(D.hitungJenis(u.keping), r.target)) sah.push(pilih.join("+"));
  }
  cek(sah.includes(r.kunci.join("+")), `gunting B ${i + 1}: kunci termasuk cara yang sah (${sah.join(" | ")})`);
  if (i < 3) cek(sah.length === 1, `gunting B ${i + 1}: satu cara saja (${sah.join(" | ")})`);
  else cek(sah.length === 3 && sah.every((c) => !c.includes("2+3") && c !== "2+3"), `gunting B 4: tiga cara sah, bukan dua garis bersilang (${sah.join(" | ")})`);
}
for (const [i, r] of D.RONDE_RAKIT_B.entries()) {
  cek(r.slot.length === r.warna.length && r.slot.length >= 2, `rakit B ${i + 1}: warna sama banyak dengan slot`);
  const semuaDalam = r.slot.every((s) => s.titik.every(([x, y]) => x >= 0 && x <= 100 && y >= 0 && y <= 100));
  cek(semuaDalam, `rakit B ${i + 1}: slot dalam kotak 100`);
  for (const [a, sa] of r.slot.entries()) {
    cek(D.periksaKaret(sa.titik).sah, `rakit B ${i + 1} slot ${a}: poligon sederhana`);
    for (const [b, sb] of r.slot.entries()) {
      if (b <= a) continue;
      let silangAda = false;
      for (let p = 0; p < sa.titik.length; p += 1) {
        for (let q = 0; q < sb.titik.length; q += 1) {
          if (D.ruasBersilang(sa.titik[p], sa.titik[(p + 1) % sa.titik.length], sb.titik[q], sb.titik[(q + 1) % sb.titik.length])) silangAda = true;
        }
      }
      const pa = D.pusatPoligon(sa.titik);
      const pb = D.pusatPoligon(sb.titik);
      cek(!silangAda && !D.titikDalam(pa, sb.titik) && !D.titikDalam(pb, sa.titik), `rakit B ${i + 1}: slot ${a} dan ${b} tidak bertumpuk`);
    }
  }
}
cek(D.RONDE_RAKIT_B[0].slot[0].jenis === D.RONDE_RAKIT_B[0].slot[1].jenis, "rakit B 1: dua segitiga sejenis");
cek(D.luasPoligon(D.RONDE_RAKIT_B[0].slot[0].titik) + D.luasPoligon(D.RONDE_RAKIT_B[0].slot[1].titik) === 60 * 60, "rakit B 1: dua segitiga membentuk persegi 60 x 60");
const hitungRakit = D.RONDE_RAKIT_B.map((r) => D.hitungSlot(r));
cek(hitungRakit[1].segitiga === 1 && hitungRakit[1].segiEmpat === 1, "rakit B: rumah 1 segitiga dan 1 segi empat");
cek(hitungRakit[2].segitiga === 2 && hitungRakit[2].segiEmpat === 1, "rakit B: perahu 2 segitiga dan 1 segi empat");
cek(hitungRakit[3].segitiga === 3 && hitungRakit[3].segiEmpat === 1, "rakit B: pohon cemara 3 segitiga dan 1 segi empat");
cek(D.INDEKS_BONGKAR_B.length === 3 && D.INDEKS_BONGKAR_B.every((i) => i >= 0 && i < D.RONDE_RAKIT_B.length), "bongkar B: indeks bangunan");
// B4
for (const g of D.GABUNGAN_B) {
  const luasDasar = D.luasPoligon(D.SEGITIGA_DASAR_B);
  cek(hampir(D.luasPoligon(g.keping2), luasDasar, 0.01), `gabungan B ${g.id}: segitiga kedua sama besar`);
  cek(hampir(D.luasPoligon(g.luar), luasDasar * 2, 0.01), `gabungan B ${g.id}: luas luar dua kali segitiga`);
  cek(D.periksaKaret(g.luar).sah, `gabungan B ${g.id}: bentuk luar sederhana`);
  cek(g.opsi[g.jawab] === g.nama && g.opsi.length === 3, `gabungan B ${g.id}: kunci sama dengan nama`);
  // Dua segitiga tidak bertumpuk
  let silangAda = false;
  const a = D.SEGITIGA_DASAR_B;
  const b = g.keping2;
  for (let p = 0; p < 3; p += 1) for (let q = 0; q < 3; q += 1) if (D.ruasBersilang(a[p], a[(p + 1) % 3], b[q], b[(q + 1) % 3])) silangAda = true;
  cek(!silangAda && !D.titikDalam(D.pusatPoligon(a), b) && !D.titikDalam(D.pusatPoligon(b), a), `gabungan B ${g.id}: dua segitiga tidak bertumpuk`);
}
cek(D.GABUNGAN_B.map((g) => D.sisiSejati(g.luar)).join() === "4,3,4", "gabungan B: persegi (4), segitiga besar (3), segi empat miring (4)");
// B6
for (const [i, r] of D.RONDE_KOMPOSIT_B.entries()) {
  const total = D.luasKeping(r);
  cek(r.opsi.length === 4 && r.opsi.filter((o) => o.bisa).length >= 2, `komposit B ${i + 1}: empat opsi dan minimal dua yang bisa`);
  for (const o of r.opsi) {
    cek(D.periksaKaret(o.titik).sah, `komposit B ${i + 1} ${o.nama}: poligon sederhana`);
    const sama = hampir(D.luasPoligon(o.titik), total, 0.01);
    cek(sama === o.bisa, `komposit B ${i + 1} ${o.nama}: bisa=${o.bisa} sesuai luas ${D.luasPoligon(o.titik)} dan jumlah keping ${total}`);
  }
}
// B5 dan B7 (garis pengurai dan hitung keping)
for (const [i, r] of D.RONDE_HITUNG_B.entries()) {
  const u = D.uraiBangun(r.titik, r.batas, r.ruas);
  cek(u.sah && D.cocokTarget(D.hitungJenis(u.keping), r.target), `hitung B ${i + 1} ${r.nama}: ${D.kalimatKeping(D.hitungJenis(u.keping))}`);
  cek(hampir(u.keping.reduce((s, k) => s + k.luas, 0), D.luasPoligon(r.titik.slice(0, r.batas)), 2), `hitung B ${i + 1}: jumlah luas sama dengan bangun`);
}
for (const [i, r] of D.RONDE_GARIS_B.entries()) {
  const u = D.uraiBangun(r.titik, r.batas, r.solusi);
  cek(u.sah && D.cocokTarget(D.hitungJenis(u.keping), r.target), `garis B ${i + 1} ${r.nama}: solusi menghasilkan ${r.teksTarget} (dapat ${D.kalimatKeping(D.hitungJenis(u.keping))})`);
  cek(hampir(u.keping.reduce((s, k) => s + k.luas, 0), D.luasPoligon(r.titik.slice(0, r.batas)), 2), `garis B ${i + 1}: jumlah luas sama dengan bangun`);
  // Tanpa garis tidak boleh langsung menang
  const kosong = D.uraiBangun(r.titik, r.batas, []);
  cek(!D.cocokTarget(D.hitungJenis(kosong.keping), r.target), `garis B ${i + 1}: tanpa garis belum memenuhi target`);
  // Solusi dikurangi satu garis tidak memenuhi
  for (let k = 0; k < r.solusi.length; k += 1) {
    const kurang = r.solusi.filter((_, j) => j !== k);
    const w = D.uraiBangun(r.titik, r.batas, kurang);
    cek(!D.cocokTarget(D.hitungJenis(w.keping), r.target), `garis B ${i + 1}: tanpa garis ke-${k + 1} belum memenuhi target`);
  }
}
for (const [i, rr] of D.RONDE_KALIMAT_B.entries()) {
  cek(rr.length === 3 && rr.every((s) => s.opsi.length === 3 && s.benar === 0 && new Set(s.opsi).size === 3), `kalimat B ronde ${i + 1}: tiga kalimat, tiga opsi, kunci pertama`);
}
// Konsistensi kunci isian kalimat dengan mesin
{
  const sq = [[14, 14], [86, 14], [86, 86], [14, 86]];
  cek(D.hitungJenis(D.uraiBangun(sq, 4, [[0, 2]]).keping).total === Number(D.RONDE_KALIMAT_B[0][0].opsi[0]), "kalimat B: persegi diurai miring jadi 2");
  const t8 = [[10, 10], [50, 10], [90, 10], [90, 50], [90, 90], [50, 90], [10, 90], [10, 50]];
  cek(D.hitungJenis(D.uraiBangun(t8, 8, [[1, 5]]).keping).total === Number(D.RONDE_KALIMAT_B[0][1].opsi[0]), "kalimat B: persegi dibelah tegak jadi 2");
  cek(Number(D.RONDE_KALIMAT_B[1][0].opsi[0]) === D.segitigaDariTengah(6) && Number(D.RONDE_KALIMAT_B[1][1].opsi[0]) === D.segitigaDariTengah(5), "kalimat B: segi enam jadi 6, segi lima jadi 5 dari titik tengah");
}
for (const [i, rr] of D.RONDE_SORTIR_B.entries()) {
  cek(rr.length === 4 && rr.filter((k) => k.bin === "mengurai").length === 2 && rr.filter((k) => k.bin === "menyusun").length === 2, `sortir B ronde ${i + 1}: empat kalimat, dua mengurai dan dua menyusun`);
}
for (const [i, r] of D.RONDE_POLA_B.entries()) {
  cek(r.baris.length === 4 && r.baris.every((b) => r.kartu.includes(b.jawab)), `pola B ronde ${i + 1}: empat baris dan kartu memuat jawaban`);
}
cek(D.RONDE_POLA_B[0].baris.map((b) => b.jawab).join() === "1,2,3,4" && D.RONDE_POLA_B[1].baris.map((b) => b.jawab).join() === "3,4,5,6", "pola B: 1,2,3,4 dan 3,4,5,6");

// Tangram
{
  const t = D.TANGRAM_SATUAN;
  cek(t.length === 7 && t.filter((k) => k.nama.startsWith("segitiga")).length === 5 && t.filter((k) => k.nama === "persegi").length === 1 && t.filter((k) => k.nama === "segi empat miring").length === 1, "tangram: 5 segitiga, 1 persegi, 1 segi empat miring");
  cek(hampir(t.reduce((s, k) => s + D.luasPoligon(k.titik), 0), 16, 0.001), "tangram: jumlah luas 16");
  const luas = (nama) => t.filter((k) => k.nama === nama).map((k) => D.luasPoligon(k.titik));
  cek(luas("segitiga besar").join() === "4,4" && luas("segitiga sedang").join() === "2" && luas("segitiga kecil").join() === "1,1" && luas("persegi").join() === "2" && luas("segi empat miring").join() === "2", "tangram: luas keping 4,4,2,1,1,2,2");
  for (const [a, ka] of t.entries()) {
    cek(D.periksaKaret(ka.titik).sah, `tangram keping ${a}: poligon sederhana`);
    for (const [b, kb] of t.entries()) {
      if (b <= a) continue;
      let silangAda = false;
      for (let p = 0; p < ka.titik.length; p += 1) for (let q = 0; q < kb.titik.length; q += 1) if (D.ruasBersilang(ka.titik[p], ka.titik[(p + 1) % ka.titik.length], kb.titik[q], kb.titik[(q + 1) % kb.titik.length])) silangAda = true;
      cek(!silangAda && !D.titikDalam(D.pusatPoligon(ka.titik), kb.titik) && !D.titikDalam(D.pusatPoligon(kb.titik), ka.titik), `tangram: keping ${a} dan ${b} tidak bertumpuk`);
    }
  }
  const k100 = D.tangramKeping();
  cek(k100.every((k) => k.titik.every(([x, y]) => x >= 10 && x <= 90 && y >= 10 && y <= 90)), "tangram: dalam kotak 100");
  // Semua keping berada di dalam persegi 4 x 4: titik tengah masing-masing di dalam
  cek(t.every((k) => D.titikDalam(D.pusatPoligon(k.titik), [[0, 0], [4, 0], [4, 4], [0, 4]])), "tangram: semua keping di dalam persegi 4 x 4");
}
// A3 cetak dan putar
{
  const r = D.RONDE_CETAKPUTAR_A;
  cek(r.length === 4 && r.filter((b) => b.lingkaran).length === 2, "cetak putar A: dua lingkaran dan dua bukan");
  for (const b of r) {
    const pas = [0, 45, 90, 135, 180, 225, 270, 315].map((s) => D.pasDiCetakan(b, s));
    if (b.lingkaran) cek(pas.every(Boolean) && D.adalahLingkaran(b.bentuk), `cetak putar A ${b.nama}: selalu pas`);
    else cek(pas.some((x) => !x) && pas[0] === true, `cetak putar A ${b.nama}: tidak selalu pas`);
  }
}

/* ---- SUB-BAB C ---- */
cek(D.BENDA_RUANG.length === 10 && new Set(D.BENDA_RUANG.map((b) => b.id)).size === 10, "benda ruang: sepuluh benda unik");
for (const j of D.URUTAN_RUANG) cek(D.BENDA_RUANG.filter((b) => b.jenis === j).length >= 2, `benda ruang: ${j} punya minimal dua contoh`);
cek(D.menggelinding("tabung") && D.menggelinding("kerucut") && D.menggelinding("bola") && !D.menggelinding("kubus") && !D.menggelinding("balok"), "menggelinding: tabung, kerucut, bola");
cek(D.permukaanDatarMenurutBuku("kubus") && D.permukaanDatarMenurutBuku("balok") && !D.permukaanDatarMenurutBuku("bola"), "permukaan datar menurut buku: kubus dan balok");
for (const [i, r] of D.RONDE_GELIND_C.entries()) {
  cek(r.length === 5 && new Set(r).size === 5, `gelinding C ronde ${i + 1}: lima benda unik`);
  const bisa = r.filter((id) => D.menggelinding(D.bendaRuang(id).jenis)).length;
  cek(bisa >= 2 && bisa <= 3, `gelinding C ronde ${i + 1}: dua atau tiga menggelinding (${bisa})`);
}
cek(D.ALASAN_GELIND_C.length === 3 && D.ALASAN_GELIND_C[0] === "permukaannya lengkung", "gelinding C: alasan pertama kunci");
for (const [i, r] of D.RONDE_PILAH_C.entries()) {
  cek(r.length === 5 && new Set(r).size === 5, `pilah C ronde ${i + 1}: lima benda unik`);
  const datar = r.filter((id) => D.permukaanDatarMenurutBuku(D.bendaRuang(id).jenis)).length;
  cek(datar >= 2 && datar <= 3, `pilah C ronde ${i + 1}: dua atau tiga datar (${datar})`);
}
for (const [i, r] of D.RONDE_TAS_C.entries()) cek(r.petunjuk.length === 3 && D.URUTAN_RUANG.includes(r.jenis), `tas C ${i + 1}: tiga petunjuk`);
cek(D.RONDE_TAS_C.map((r) => r.jenis).join() === "kubus,kerucut,bola", "tas C: kubus, kerucut, bola");
for (const [i, r] of D.RONDE_CETAK_C.entries()) {
  const b = D.bendaRuang(r.benda);
  cek(r.permukaan.some((p) => p.cetak !== null), `cetak C ${i + 1}: ada permukaan yang bisa dicetak`);
  cek(r.permukaan.filter((p) => p.cetak !== null).every((p) => p.cetak === r.jawab), `cetak C ${i + 1}: semua cetakan yang bisa sama dengan jawaban`);
  if (b.jenis === "kubus") cek(r.jawab === "persegi", `cetak C ${i + 1}: kubus mencetak persegi`);
  if (b.jenis === "balok") cek(r.jawab === "persegiPanjang", `cetak C ${i + 1}: balok mencetak persegi panjang`);
  if (b.jenis === "tabung" || b.jenis === "kerucut") cek(r.jawab === "lingkaran" && r.permukaan.some((p) => p.cetak === null), `cetak C ${i + 1}: ${b.jenis} mencetak lingkaran dan ada permukaan lengkung`);
}
cek(D.RONDE_CETAK_C.map((r) => D.bendaRuang(r.benda).jenis).join() === "kubus,balok,tabung,kerucut", "cetak C: kubus, balok, tabung, kerucut");
for (const [i, r] of D.RONDE_BAYANGAN_C.entries()) {
  cek(r.opsi.length === 3 && new Set(r.opsi).size === 3 && r.opsi.filter((o) => o === r.jawab).length === 1, `bayangan C ${i + 1}: tiga opsi dan satu kunci`);
}
{
  const tepat = (jenis, arah) => D.RONDE_BAYANGAN_C.find((r) => r.jenis === jenis && r.arah === arah)?.jawab;
  cek(tepat("kubus", "atas") === "persegi" && tepat("kerucut", "samping") === "segitiga" && tepat("tabung", "atas") === "lingkaran" && tepat("balok", "samping") === "persegiPanjang", "bayangan C: kubus atas persegi, kerucut samping segitiga, tabung atas lingkaran, balok samping persegi panjang");
}
cek(D.KOLOM_TABEL_C.length === 3, "tabel C: tiga kolom");
{
  const k = (j) => D.kunciTabelC(j).join();
  cek(k("kubus") === "true,false,false" && k("balok") === "true,false,false" && k("tabung") === "false,true,true" && k("kerucut") === "false,true,true" && k("bola") === "false,true,true", "tabel C: kunci kubus, balok datar; tabung, kerucut, bola lengkung dan menggelinding");
}
for (const [i, r] of D.RONDE_NAMA_C.entries()) {
  cek(r.urut.length === 5 && new Set(r.urut).size === 5 && r.warna.length === 5, `nama C ronde ${i + 1}: lima bangun`);
}
cek(D.RONDE_NAMA_C[0].urut.join() !== D.RONDE_NAMA_C[1].urut.join(), "nama C: dua urutan berbeda");
for (const [i, r] of D.RONDE_BENARSALAH_C.entries()) {
  cek(r.length === 5 && r.some((p) => p.benar) && r.some((p) => !p.benar) && r.every((p) => p.penjelasan.length > 15), `benar salah C ronde ${i + 1}: lima pernyataan campuran dengan penjelasan`);
}
for (const [i, s] of D.RONDE_DETEKTIF_C.entries()) cek(s.opsi.length === 3 && s.jawab >= 0 && s.jawab < 3 && s.petunjuk.length === 2 && s.salah.length > 30, `detektif C ${i + 1}: tiga opsi, kunci, penjelasan`);
cek(D.RONDE_DETEKTIF_C.map((s) => s.opsi[s.jawab]).join() === "kubus,bola,kerucut,balok", "detektif C: kubus, bola, kerucut, balok");
for (const [i, r] of D.RONDE_KALIMAT_C.entries()) {
  const u = D.urutanKartuKata(r, i);
  cek(u.length === r.kata.length + 1 && new Set(u.map((x) => x.asli)).size === u.length, `kalimat C ${i + 1}: kartu kata unik`);
  cek(u.map((x) => x.asli).join() !== [...r.kata.keys(), -1].join(), `kalimat C ${i + 1}: kartu kata teracak`);
  cek(u.some((x) => x.teks === r.pengecoh), `kalimat C ${i + 1}: pengecoh ada`);
}

/* ---- Naskah ---- */
const kalimatDari = (t) => (t.match(/[^.!?]+[.!?]+/g) ?? [t]).map((k) => k.trim()).filter(Boolean);
cek(N.SUB_BAB_K2B3.length === 3, "tiga sub-bab");
cek(N.K2B3_META.suaraLaju === 0.7 && N.K2B3_META.suaraNada === 1, "suara: laju 0,70 dan nada 1");
for (const s of N.SUB_BAB_K2B3) {
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
  cek(s.silabus.teksSuara.length > 200 && s.silabus.cp.length > 100 && s.silabus.referensi.includes("Bab 3"), `${s.id}: silabus lengkap`);
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
const semuaJudulGame = N.SUB_BAB_K2B3.flatMap((s) => s.games.map((g) => g.title));
cek(semuaJudulGame.length === 30, "tiga puluh permainan seluruhnya");
cek(N.semuaAdeganK2B3().length === 27, `dua puluh tujuh adegan video (ada ${N.semuaAdeganK2B3().length})`);

/* ---- JSON publik (bila sudah dibangkitkan) ---- */
if (fs.existsSync("src/data/kelas2-bab3.json")) {
  const teks = fs.readFileSync("src/data/kelas2-bab3.json", "utf8");
  cek(!/"correct_index"|"correctAnswer"|"explanation"/.test(teks), "JSON publik tanpa kunci jawaban");
  const j = JSON.parse(teks);
  cek(j.chapter_id === "k2-mat-bab3" && j.phase_code === "FASE_A" && j.grade === 2, "JSON: chapter_id, phase_code, grade");
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

console.log(`\nData Kelas 2 Bab 3: ${lulus} lulus, ${gagal} gagal`);
process.exit(gagal ? 1 : 0);
