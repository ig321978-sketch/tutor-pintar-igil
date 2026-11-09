/**
 * Uji data murni Matematika Kelas 2 Bab 6 (Pengukuran: Berat dan Waktu).
 * Jalankan: node --no-warnings scripts/uji-data-k2b6.mjs
 * Memeriksa tabel berat dan satuan tidak baku, mesin perbandingan, semua ronde 30 permainan Sub-Bab A dan 30 permainan
 * Sub-Bab B, model waktu (jam 12 dan 24, bagian hari, lama kegiatan), naskah video dan peta pikiran, serta berkas JSON
 * publik (tanpa kunci jawaban, tanpa soal Latihan dan Ujian).
 */
import fs from "node:fs";
import * as D from "../src/components/modul/data-k2b6.ts";
import * as N from "../src/components/modul/naskah-k2b6.ts";

let lulus = 0;
let gagal = 0;
function cek(kondisi, pesan) {
  if (kondisi) lulus += 1;
  else {
    gagal += 1;
    console.error("GAGAL:", pesan);
  }
}
const sama = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const unik = (a) => new Set(a).size === a.length;
const tigaPilihan = (o, kunci, pesan) => cek(o.length === 3 && unik(o) && o.includes(kunci), `${pesan}: tiga pilihan berbeda dan memuat kunci (${o})`);

/* ---- Pembantu ---- */
for (const n of [2, 3, 4, 5, 6, 8, 10]) {
  const u = D.urutanTetap(n, 3, 0);
  cek(u.length === n && unik(u) && u.every((x) => x >= 0 && x < n), `urutanTetap(${n}) permutasi: ${u}`);
}
cek(D.Kapital("semangka") === "Semangka", "Kapital");
{
  const posisi = new Set();
  for (let n = 0; n < 9; n += 1) {
    const o = D.opsiAngka(5, n);
    tigaPilihan(o, 5, `opsiAngka(5, ${n})`);
    posisi.add(o.indexOf(5));
  }
  cek(posisi.size === 3, "opsiAngka: kunci muncul di ketiga posisi");
  cek(sama(D.opsiAngka(1, 0).slice().sort(), [1, 2, 3]) && D.opsiAngka(0, 0).every((x) => x >= 0), "opsiAngka: tidak negatif untuk 0 dan 1");
  const kunci = new Set();
  for (let n = 0; n < 9; n += 1) {
    const { opsi, jawab } = D.susunOpsi("benar", ["a", "b"], n);
    cek(opsi[jawab] === "benar" && unik(opsi), `susunOpsi ${n}`);
    kunci.add(jawab);
  }
  cek(kunci.size === 3, "susunOpsi: kunci muncul di ketiga posisi");
}

/* ====================================================================== */
/* SUB-BAB A. Berat                                                         */
/* ====================================================================== */

/* ---- Tabel berat selaras dengan buku ---- */
const ID = Object.keys(D.BERAT);
cek(ID.length === 34 && ID.every((i) => D.NAMA[i] && D.BERAT[i] > 0), "tabel berat: 34 benda bernama dan berat positif");
cek(sama(Object.keys(D.BERAT_SATUAN), ["bolaTenis", "kelereng", "koin", "balok"]), "satuan tidak baku: bola tenis, kelereng, koin, balok");
cek(D.jumlahSatuan("boneka", "bolaTenis") === 4 && D.jumlahSatuan("boneka", "kelereng") === 10, "buku hlm. 169-170: boneka = 4 bola tenis = 10 kelereng");
cek(D.relBenda("jeruk", "apel") === "sama berat" && D.relBenda("tomat", "jeruk") === "sama berat", "buku hlm. 160 dan 167: jeruk sama berat dengan apel, tomat sama berat dengan jeruk");
cek(D.relBenda("semangka", "apel") === "lebih berat" && D.relBenda("apel", "anggur") === "lebih berat", "buku hlm. 159: semangka > apel > anggur");
cek(D.relBenda("kupu", "burung") === "lebih ringan" && D.relBenda("kucing", "tikus") === "lebih berat" && D.relBenda("kucing", "kelinci") === "sama berat", "buku hlm. 162-163: kupu-kupu < burung, kucing > tikus, kucing = kelinci");
cek(D.relBenda("labu", "kol") === "lebih berat" && D.relBenda("kol", "wortel") === "lebih berat", "buku hlm. 166: labu > kol > wortel");
cek(D.relBenda("terong", "tomat") === "lebih berat" && D.relBenda("terong", "labu") === "lebih ringan", "buku hlm. 167: terong > tomat, terong < labu");
cek(D.rasio("pepaya", "mangga") === 2 && D.rasio("mangga", "manggis") === 2 && D.rasio("pepaya", "manggis") === 4, "buku hlm. 176: 1 pepaya = 2 mangga = 4 manggis");
cek(D.rasio("labu", "apel") === 3 && D.jumlahSatuan("buku", "bolaTenis") === 3 && D.jumlahSatuan("gunting", "kelereng") === 3, "buku hlm. 172-173: 1 labu = 3 apel, 1 buku = 3 bola tenis, 1 gunting = 3 kelereng");
cek(D.BERAT.pisang * 2 === D.BERAT.jeruk, "buku hlm. 173: 2 pisang = 1 jeruk");
cek(D.rasio("jeruk", "stroberi") === 3, "buku hlm. 188: 1 jeruk = 3 stroberi");
cek(D.relBenda("anjing", "kucing") === "lebih berat" && D.relBerat(2, 2) === "sama berat" && D.relBerat(1, 2) === "lebih ringan", "relasi dasar");
cek(D.kalimatBenda("semangka", "apel") === "Semangka lebih berat dari apel." && D.kalimatBenda("jeruk", "apel") === "Jeruk sama berat dengan apel.", "kalimat banding");
cek(D.kalimatBalok("A", "lebih ringan", "B") === "Balok A lebih ringan dari balok B." && D.kalimatBalok("C", "sama berat", "D") === "Balok C sama berat dengan balok D.", "kalimat balok");
cek(D.beratBerbeda(["apel", "semangka", "anggur"]) && !D.beratBerbeda(["apel", "jeruk"]), "beratBerbeda");
cek(sama(D.urutBerat(["semangka", "apel", "anggur"], "ringan"), ["anggur", "apel", "semangka"]) && sama(D.urutBerat(["semangka", "apel", "anggur"], "berat"), ["semangka", "apel", "anggur"]), "urutBerat");

/* ---- Concrete A ---- */
{
  cek(D.RONDE_TANGAN_A.length === 4 && D.RONDE_TANGAN_A.every((r) => r.length === 3), "A1: empat ronde, tiga pasang");
  const semua = D.RONDE_TANGAN_A.flat();
  cek(semua.every(([a, b]) => a !== b && D.BERAT[a] && D.BERAT[b]), "A1: pasangan valid");
  cek(semua.filter(([a, b]) => D.relBenda(a, b) === "sama berat").length >= 2, "A1: paling sedikit dua pasang sama berat");
  cek(new Set(semua.map(([a, b]) => D.relBenda(a, b))).size === 3, "A1: ketiga hubungan muncul");
  cek(unik(semua.map(([a, b]) => `${a}-${b}`)), "A1: pasangan tidak berulang");
  cek(D.RONDE_JUNGKAT_A.length === 4 && D.RONDE_JUNGKAT_A.some(([a, b]) => D.relBenda(a, b) === "sama berat") && D.RONDE_JUNGKAT_A.some(([a, b]) => D.relBenda(a, b) !== "sama berat"), "A2: empat pasang, ada yang sama berat");
  cek(D.RONDE_GANTUNGAN_A.length === 3 && D.RONDE_GANTUNGAN_A.every((r) => r.length === 2), "A3: tiga ronde, dua pasang");
  cek(D.RONDE_GANTUNGAN_A.flat().some(([a, b]) => D.relBenda(a, b) === "sama berat"), "A3: ada pasangan sama berat");
  cek(D.RONDE_URUT_A.length === 4 && D.RONDE_URUT_A.every((r) => r.ids.length >= 3 && r.ids.length <= 4 && D.beratBerbeda(r.ids)), "A4: empat ronde, benda beratnya berbeda semua");
  cek(new Set(D.RONDE_URUT_A.map((r) => r.dari)).size === 2, "A4: dua arah urutan");
  cek(D.RONDE_URUT_A.every((r, i) => !sama(D.urutTampil(r.ids, D.urutBerat(r.ids, r.dari), i), D.urutBerat(r.ids, r.dari)) && sama(D.urutTampil(r.ids, D.urutBerat(r.ids, r.dari), i).slice().sort(), r.ids.slice().sort())), "A4: urutan tampil permutasi dan bukan jawaban");
  cek(D.RONDE_SORTIR_A.length === 3, "A5: tiga ronde");
  for (const [i, r] of D.RONDE_SORTIR_A.entries()) {
    cek(r.ids.length === 6 && unik(r.ids) && !r.ids.includes(r.acuan), `A5 r${i + 1}: enam benda berbeda, acuan di luar`);
    cek(r.ids.every((id) => D.BERAT[id] !== D.BERAT[r.acuan]), `A5 r${i + 1}: tidak ada benda sama berat dengan acuan (kotak hanya dua)`);
    const berat = r.ids.filter((id) => D.relBenda(id, r.acuan) === "lebih berat").length;
    cek(berat >= 2 && 6 - berat >= 2, `A5 r${i + 1}: paling sedikit dua benda di tiap kotak (${berat} lebih berat)`);
  }
  cek(D.RONDE_TIMBANG_A.length === 4, "A6: empat ronde");
  for (const t of D.RONDE_TIMBANG_A) {
    const n = D.jumlahSatuan(t.benda, t.satuan);
    cek(n !== null && n >= 2 && n <= 20, `A6 ${t.benda} ${t.satuan}: hasil bulat ${n}`);
  }
  cek(unik(D.RONDE_TIMBANG_A.map((t) => D.jumlahSatuan(t.benda, t.satuan))), "A6: hasil berbeda tiap ronde");
  const posisi = new Set();
  let nomor = 0;
  for (const r of D.RONDE_HITUNG_A) {
    for (const t of r) {
      const n = D.jumlahSatuan(t.benda, t.satuan);
      cek(n !== null, `A7 ${t.benda}: bulat`);
      const o = D.opsiAngka(n, nomor);
      tigaPilihan(o, n, `A7 ${t.benda}`);
      posisi.add(o.indexOf(n));
      nomor += 1;
    }
  }
  cek(D.RONDE_HITUNG_A.length === 3 && D.RONDE_HITUNG_A.every((r) => r.length === 2), "A7: tiga ronde, dua gambar");
  cek(D.RONDE_KETUK_A.length === 4, "A8: empat ronde");
  const tertinggi = [];
  const terendah = [];
  for (const [i, r] of D.RONDE_KETUK_A.entries()) {
    const w = r.map((id) => D.BERAT[id]);
    cek(unik(r) && w.filter((x) => x === Math.max(...w)).length === 1 && w.filter((x) => x === Math.min(...w)).length === 1, `A8 r${i + 1}: paling berat dan paling ringan tunggal`);
    tertinggi.push(r.indexOf(D.palingBerat(r)));
    terendah.push(r.indexOf(D.palingRingan(r)));
  }
  cek(unik(tertinggi) && unik(terendah), `A8: letak kunci berpindah (${tertinggi} / ${terendah})`);
  cek(D.RONDE_JODOH_A.length === 3 && D.RONDE_JODOH_A.every((r) => r.length === 3), "A9: tiga ronde, tiga benda");
  for (const [i, r] of D.RONDE_JODOH_A.entries()) {
    const label = r.map((t) => `${D.jumlahSatuan(t.benda, t.satuan)} ${D.NAMA_SATUAN[t.satuan]}`);
    cek(r.every((t) => D.jumlahSatuan(t.benda, t.satuan) !== null) && unik(label) && unik(r.map((t) => t.benda)), `A9 r${i + 1}: hasil bulat dan label berbeda (${label})`);
  }
  cek(D.RONDE_RAK_A.length === 3 && D.RONDE_RAK_A.every((r) => r.length === 3 && D.beratBerbeda(r)), "A10: tiga ronde, tiga belanjaan berbeda berat");
  cek(D.RONDE_RAK_A.every((r, i) => !sama(D.urutTampil(r, D.urutBerat(r, "berat"), i), D.urutBerat(r, "berat"))), "A10: urutan tampil bukan jawaban");
}

/* ---- Picture A ---- */
{
  cek(D.HURUF_PASANG.length === 3 && unik(D.HURUF_PASANG.flat()), "P1: tiga pasang huruf berbeda");
  cek(D.RONDE_BACA_A.length === 3 && D.RONDE_BACA_A.every((r) => r.length === 3), "P1: tiga ronde, tiga neraca");
  cek(new Set(D.RONDE_BACA_A.flat().map(([a, b]) => D.relHuruf(a, b))).size === 3, "P1: ketiga hubungan muncul");
  const posisi = new Set();
  D.RONDE_BACA_A.forEach((r, ri) =>
    r.forEach(([ba, bb], i) => {
      const [a, b] = D.HURUF_PASANG[i];
      const o = D.opsiBandingHuruf(a, b, ba, bb, ri * 3 + i);
      cek(o.opsi.length === 3 && unik(o.opsi) && o.opsi[o.jawab] !== undefined, `P1 r${ri + 1}.${i + 1}: tiga pilihan`);
      const benar = ba > bb ? `Balok ${a} lebih berat` : ba < bb ? `Balok ${b} lebih berat` : "Sama berat";
      cek(o.opsi[o.jawab] === benar, `P1 r${ri + 1}.${i + 1}: kunci ${benar}`);
      posisi.add(o.jawab);
    }),
  );
  cek(posisi.size === 3, "P1: kunci di ketiga posisi");
  cek(D.RONDE_URUTNERACA_A.length === 3, "P2: tiga ronde");
  for (const [i, r] of D.RONDE_URUTNERACA_A.entries()) {
    cek(D.rantaiMenentukan(r), `P2 r${i + 1}: diagram menentukan satu urutan`);
    cek(r.diagram.every(([a, b]) => r.bobot[a] !== undefined && r.bobot[b] !== undefined && a !== b), `P2 r${i + 1}: diagram memakai huruf yang ada`);
  }
  cek(new Set(D.RONDE_URUTNERACA_A.map((r) => r.dari)).size === 2, "P2: dua arah");
  cek(D.RONDE_BATANG_A.length === 3, "P3: tiga ronde");
  for (const [i, r] of D.RONDE_BATANG_A.entries()) {
    const n = r.map((x) => x.n);
    cek(r.length >= 3 && r.length <= 4 && unik(r.map((x) => x.id)), `P3 r${i + 1}: tiga atau empat batang`);
    cek(n.filter((x) => x === Math.max(...n)).length === 1 && n.filter((x) => x === Math.min(...n)).length === 1, `P3 r${i + 1}: tertinggi dan terendah tunggal`);
    cek(Math.max(...n) <= 9 && Math.min(...n) >= 1, `P3 r${i + 1}: tinggi 1 sampai 9`);
  }
  cek(D.RONDE_TITIK_A.length === 3 && D.RONDE_TITIK_A.every((r) => r.length === 2 && r.every((n) => n >= 2 && n <= 10)), "P4: tiga ronde, dua soal, 2 sampai 10 titik");
  cek(D.RONDE_GORESAN_A.length === 3 && D.RONDE_GORESAN_A.every((r) => r.length === 2 && r.every((n) => n >= 2 && n <= 10)), "P5: tiga ronde, dua soal");
  cek(D.RONDE_GORESAN_A.flat().some((n) => n > 5), "P5: ada goresan lebih dari lima (kelompok tally)");
  cek(D.RONDE_TABEL_PA.length === 2, "P6: dua tabel");
  for (const t of D.RONDE_TABEL_PA) {
    cek(t.baris.length === 4 && unik(t.baris.map((b) => b.label)) && t.baris.every((b) => t.kartu.includes(b.jawab)), `P6 ${t.judul}: empat baris dan kartu memuat jawaban`);
    cek(t.baris.every((b) => Number(b.jawab) >= 2 && Number(b.jawab) <= 10), `P6 ${t.judul}: jawaban 2 sampai 10`);
    cek(unik(t.kartu) && t.kartu.length === 6, `P6 ${t.judul}: enam kartu berbeda`);
  }
  cek(D.RONDE_PASANGNERACA_A.length === 3, "P7: tiga ronde");
  for (const [i, r] of D.RONDE_PASANGNERACA_A.entries()) {
    const kal = r.map(([a, b, x, y]) => D.kalimatBalok(a, D.relHuruf(x, y), b));
    cek(r.length === 3 && unik(kal) && unik(r.flatMap(([a, b]) => [a, b])), `P7 r${i + 1}: tiga kalimat berbeda, huruf berbeda`);
  }
  cek(new Set(D.RONDE_PASANGNERACA_A.flat().map(([, , x, y]) => D.relHuruf(x, y))).size === 3, "P7: ketiga hubungan muncul");
  cek(D.RONDE_SORTIRNERACA_A.length === 3, "P8: tiga ronde");
  for (const [i, r] of D.RONDE_SORTIRNERACA_A.entries()) {
    const rel = r.map(([, , x, y]) => D.relHuruf(x, y));
    cek(r.length === 6 && new Set(rel).size === 3 && unik(r.map(([a, b]) => a + b)), `P8 r${i + 1}: enam diagram, ketiga kotak terisi`);
  }
  cek(D.RONDE_GARISANGKA_A.length === 3 && D.RONDE_GARISANGKA_A.every((r) => r.length === 3 && unik(r) && r.every((n) => n >= 1 && n <= 10)), "P9: tiga ronde, tiga angka berbeda dalam 1 sampai 10");
  cek(D.RONDE_BAGAN_A.length === 3 && unik(D.RONDE_BAGAN_A) && D.RONDE_BAGAN_A.every((n) => n >= 3 && n <= 12), "P10: tiga target berbeda");
}

/* ---- Abstract A ---- */
{
  cek(D.RONDE_KALIMAT_QA.length === 2 && D.RONDE_KALIMAT_QA.every((r) => r.length === 3), "Q1: dua ronde, tiga kalimat");
  const posisi = new Set();
  const rel = new Set();
  let nomor = 0;
  for (const r of D.RONDE_KALIMAT_QA) {
    for (const [a, b] of r) {
      const k = D.kalimatIsian(a, b, nomor);
      cek(k.opsi.length === 3 && unik(k.opsi) && k.opsi[k.benar] === D.relBenda(a, b), `Q1 ${a} ${b}: kunci ${D.relBenda(a, b)}`);
      cek(sama(k.opsi.slice().sort(), D.REL_SEMUA.slice().sort()), `Q1 ${a} ${b}: tiga kata hubungan`);
      posisi.add(k.benar);
      rel.add(D.relBenda(a, b));
      nomor += 1;
    }
  }
  cek(posisi.size >= 2 && rel.size === 3, "Q1: kunci berpindah dan ketiga hubungan muncul");
  cek(D.RONDE_BENARSALAH_QA.length === 2 && D.RONDE_BENARSALAH_QA.every((r) => r.length === 5 && r.some((p) => p.benar) && r.some((p) => !p.benar) && r.filter((p) => p.benar).length >= 2 && r.filter((p) => p.benar).length <= 3), "Q2: dua ronde, lima pernyataan, benar dan salah bercampur");
  cek(D.RONDE_BENARSALAH_QA.flat().every((p) => p.teks.length > 10 && p.penjelasan.length > 10), "Q2: teks dan penjelasan ada");
  cek(D.RONDE_SUSUNKATA_QA.length === 4, "Q3: empat kalimat");
  for (const r of D.RONDE_SUSUNKATA_QA) {
    cek(r.kata.length >= 4 && r.kata.length <= 8 && !r.kata.includes(r.pengecoh), `Q3 ${r.kata.join(" ")}: panjang wajar dan pengecoh bukan bagian kalimat`);
  }
  cek(D.RONDE_HITUNG_QA.length === 3 && D.RONDE_HITUNG_QA.every((r) => r.length === 2), "Q4: tiga ronde, dua soal");
  const jawab = D.RONDE_HITUNG_QA.flat().map((s) => s.jawab);
  cek(sama(jawab, [6, 9, 4, 10, 15, 8]), `Q4: kunci dihitung dari tabel berat (${jawab})`);
  cek(D.RONDE_HITUNG_QA.flat().every((s) => Number.isInteger(s.jawab) && s.jawab >= s.min && s.jawab <= s.max && s.petunjuk.length > 5), "Q4: kunci bulat dalam jangkauan");
  cek(D.RONDE_TABEL_QA.length === 2, "Q5: dua tabel");
  for (const t of D.RONDE_TABEL_QA) {
    cek(t.baris.length === 4 && t.baris.every((b) => t.kartu.includes(b.jawab)), `Q5 ${t.judul}: kartu memuat jawaban`);
    const n = t.baris.map((b) => Number(b.jawab));
    cek(n.every((x, i) => i === 0 || x - n[i - 1] === n[0]), `Q5 ${t.judul}: kelipatan tetap (${n})`);
  }
  cek(D.RONDE_BANDINGANGKA_QA.length === 3 && D.RONDE_BANDINGANGKA_QA.every((r) => r.length === 2), "Q6: tiga ronde, dua soal");
  cek(new Set(D.RONDE_BANDINGANGKA_QA.flat().map((s) => D.relAngka(s.a, s.b))).size === 3, "Q6: ketiga hubungan muncul");
  cek(D.RONDE_DETEKTIF_QA.length === 4, "Q7: empat soal");
  for (const [i, s] of D.RONDE_DETEKTIF_QA.entries()) {
    const cocok = s.opsi.filter((id) => s.klaim.every((k) => D.cocokKlaim(id, k)));
    cek(sama(cocok, [s.jawab]) && s.opsi.length === 3 && unik(s.opsi), `Q7 soal ${i + 1}: hanya ${s.jawab} yang cocok (${cocok})`);
  }
  cek(D.PETA_KONSEP_A.length === 2 && D.PETA_KONSEP_A.every((p) => p.kotak.length === 4 && p.kotak.every((k) => k.opsi.length === 3 && unik(k.opsi) && k.benar === 0)), "Q8: dua peta, empat kotak, tiga kartu");
  cek(D.RONDE_URUTANGKA_QA.length === 3, "Q9: tiga ronde");
  for (const [i, r] of D.RONDE_URUTANGKA_QA.entries()) {
    const n = r.ids.map((id) => D.jumlahSatuan(id, r.satuan));
    cek(n.every((x) => x !== null) && unik(n) && r.ids.length >= 3, `Q9 r${i + 1}: hasil bulat dan berbeda (${n})`);
    cek(sama(r.ids.slice().sort((x, y) => D.jumlahSatuan(x, r.satuan) - D.jumlahSatuan(y, r.satuan)), D.urutBerat(r.ids, "ringan")), `Q9 r${i + 1}: urutan angka sama dengan urutan berat`);
  }
  cek(D.RONDE_KETUKSEMUA_QA.length === 3 && D.RONDE_KETUKSEMUA_QA.every((s) => s.item.length === 5 && s.item.some((x) => x.benar) && s.item.some((x) => !x.benar) && unik(s.item.map((x) => x.id))), "Q10: tiga ronde, lima pernyataan, benar dan salah bercampur");
}

/* ====================================================================== */
/* SUB-BAB B. Waktu                                                         */
/* ====================================================================== */

/* ---- Model waktu ---- */
cek(D.jam12(0) === 12 && D.jam12(12) === 12 && D.jam12(13) === 1 && D.jam12(24) === 12 && D.jam12(5) === 5 && D.jam12(21) === 9, "jam12 dari jam 24");
cek(D.digital(5) === "05.00" && D.digital(16) === "16.00" && D.digital(12) === "12.00", "jam digital");
cek(D.sudutJam(6) === 180 && D.sudutJam(12) === 0 && D.sudutJam(3) === 90 && D.sudutJam(21) === 270, "sudut jarum pendek");
{
  const tiap = [];
  for (let j = 0; j < 24; j += 1) tiap.push(D.bagianHari(j));
  cek(sama([...new Set(tiap)], ["malam", "pagi", "siang", "sore"]) || new Set(tiap).size === 4, "bagian hari: keempat bagian terpakai");
  cek([4, 5, 6, 7, 8, 9, 10].every((j) => D.bagianHari(j) === "pagi") && [11, 12, 13, 14].every((j) => D.bagianHari(j) === "siang"), "bagian hari: pagi 4-10, siang 11-14");
  cek([15, 16, 17].every((j) => D.bagianHari(j) === "sore") && [18, 19, 20, 21, 22, 23, 0, 1, 2, 3].every((j) => D.bagianHari(j) === "malam"), "bagian hari: sore 15-17, malam 18-3");
  cek(D.sebutPukul(6) === "pukul 6 pagi" && D.sebutPukul(16) === "pukul 4 sore", "sebut pukul");
}
{
  const K = D.KEGIATAN;
  cek(K.sarapan.jam24 === 6 && D.bagianHari(6) === "pagi" && K.sekolah.jam24 === 7 && K.kantin.jam24 === 12 && D.bagianHari(12) === "siang", "buku hlm. 179-180: sarapan 6 pagi, sekolah 7 pagi, kantin 12 siang");
  cek(K.bermain.jam24 === 16 && D.bagianHari(16) === "sore" && K.tidur.jam24 === 21 && D.bagianHari(21) === "malam", "buku hlm. 180-181: bermain 4 sore, tidur 9 malam");
  cek(K.olahraga.jam24 === 6 && K.olahraga.menit === 60 && K.mandiPagi.menit < K.olahraga.menit, "buku hlm. 182: olahraga 6 sampai 7 (1 jam), mandi lebih sebentar");
  cek(K.menyisir.menit < K.mandiPagi.menit && K.tidur.menit > K.sikatGigi.menit && K.sekolah.menit > K.sarapan.menit && K.cuciTangan.menit < K.bermainBola.menit, "buku hlm. 185-186: pasangan lama kegiatan");
  cek(K.bangun.jam24 === 5, "buku hlm. 178: Halim bangun pukul 5");
  cek(D.lamaTeks(15) === "15 menit" && D.lamaTeks(60) === "1 jam" && D.lamaTeks(480) === "8 jam" && D.lamaTeks(90) === "1 jam 30 menit", "lamaTeks");
  cek(sama(D.urutKegiatan(["tidur", "sarapan", "kantin"]), ["sarapan", "kantin", "tidur"]), "urutKegiatan");
  cek(D.ikat(["sarapan", "tidur"]).length === 2 && D.jam12Berbeda(["sarapan", "sekolah"]) && !D.jam12Berbeda(["sarapan", "olahraga"]), "jam12Berbeda");
}

/* ---- Concrete B ---- */
{
  const posisi = new Set();
  let nomor = 0;
  cek(D.RONDE_BACAJAM_B.length === 4 && D.RONDE_BACAJAM_B.every((r) => r.length === 3 && unik(r.map(D.jam12))), "B1: empat ronde, tiga jam berbeda");
  for (const r of D.RONDE_BACAJAM_B) {
    for (const jam of r) {
      const p = D.pilihanPukul(jam, nomor);
      tigaPilihan(p, D.jam12(jam), `B1 pukul ${jam}`);
      posisi.add(p.indexOf(D.jam12(jam)));
      nomor += 1;
    }
  }
  cek(posisi.size === 3, "B1: kunci di ketiga posisi");
  cek(D.RONDE_PUTAR_B.length === 4 && D.RONDE_PUTAR_B.every((r) => r.length === 3 && r.every((id) => D.KEGIATAN[id])), "B2: empat ronde, tiga tugas");
  cek(D.RONDE_SORTIR_B.length === 3 && D.RONDE_SORTIR_B.every((r) => r.length === 6 && unik(r) && new Set(r.map((id) => D.bagianHari(D.KEGIATAN[id].jam24))).size >= 3), "B3: tiga ronde, enam kegiatan, paling sedikit tiga bagian hari");
  cek(D.RONDE_SORTIR_B.flat().length === 18 && new Set(D.RONDE_SORTIR_B.flat().map((id) => D.bagianHari(D.KEGIATAN[id].jam24))).size === 4, "B3: keempat bagian hari terpakai");
  for (const [nama, daftar] of [["B4", D.RONDE_JODOH_B], ["B8", D.RONDE_MEMORI_B]]) {
    cek(daftar.length === 3 && daftar.every((r) => r.length === 4 && unik(r) && D.jam12Berbeda(r)), `${nama}: tiga ronde, empat kegiatan, muka jam berbeda`);
  }
  cek(D.RONDE_LAMA_B.length === 4 && D.RONDE_LAMA_B.every((r) => r.length === 2), "B5: empat ronde, dua pasang");
  for (const p of D.RONDE_LAMA_B.flat()) {
    cek(D.KEGIATAN[p.a].menit !== D.KEGIATAN[p.b].menit && p.a !== p.b, `B5 ${p.a} ${p.b}: lama berbeda`);
    const menang = D.lebihLama(p);
    const lebih = p.tanya === "lama" ? Math.max(D.KEGIATAN[p.a].menit, D.KEGIATAN[p.b].menit) : Math.min(D.KEGIATAN[p.a].menit, D.KEGIATAN[p.b].menit);
    cek(D.KEGIATAN[menang].menit === lebih, `B5 ${p.a} ${p.b}: kunci ${menang}`);
  }
  cek(new Set(D.RONDE_LAMA_B.flat().map((p) => p.tanya)).size === 2, "B5: pertanyaan lama dan sebentar muncul");
  cek(D.RONDE_URUT_B.length === 3 && D.RONDE_URUT_B.every((r) => r.length === 4 && unik(r.map((id) => D.KEGIATAN[id].jam24))), "B6: tiga ronde, jam kegiatan berbeda");
  cek(D.RONDE_URUT_B.every((r, i) => !sama(D.urutTampil(r, D.urutKegiatan(r), i), D.urutKegiatan(r))), "B6: urutan tampil bukan jawaban");
  cek(D.RONDE_GARIS_B.length === 3, "B7: tiga ronde");
  for (const [i, r] of D.RONDE_GARIS_B.entries()) {
    cek(r.length === 4 && sama(r.map((id) => D.bagianHari(D.KEGIATAN[id].jam24)).sort(), ["malam", "pagi", "siang", "sore"]), `B7 r${i + 1}: tepat satu kegiatan tiap bagian hari`);
  }
  cek(D.RONDE_SELISIH_B.length === 3 && D.RONDE_SELISIH_B.every((r) => r.length === 2 && r.every((s) => s.selesai > s.mulai && s.selesai - s.mulai <= 8)), "B9: tiga ronde, dua cerita, selisih 1 sampai 8");
  const selisih = D.RONDE_SELISIH_B.flat().map((s) => s.selesai - s.mulai);
  cek(sama(selisih, [1, 5, 4, 3, 4, 2]), `B9: kunci dari selisih jam (${selisih})`);
  cek(D.RONDE_TEMUKANJAM_B.length === 3 && D.RONDE_TEMUKANJAM_B.every((r) => r.length === 4 && unik(r)), "B10: tiga ronde, empat jam berbeda");
  const sasaran = D.RONDE_TEMUKANJAM_B.map((r, i) => [r[i % 4], r[(i + 2) % 4]]);
  cek(sasaran.every((s) => s[0] !== s[1]), "B10: dua sasaran berbeda tiap ronde");
}

/* ---- Picture B ---- */
{
  cek(D.RONDE_BACAJAM_PB.length === 3 && D.RONDE_BACAJAM_PB.every((r) => r.length === 3 && unik(r) && r.every((j) => j >= 1 && j <= 12)), "PB1: tiga ronde, jam 1 sampai 12");
  cek(D.RONDE_GAMBARJARUM_PB.length === 3 && D.RONDE_GAMBARJARUM_PB.every((r) => r.length === 3 && unik(r) && r.every((j) => j >= 1 && j <= 12)), "PB2: tiga ronde, jam 1 sampai 12");
  cek(D.RONDE_BATANGLAMA_PB.length === 3, "PB3: tiga ronde");
  for (const [i, r] of D.RONDE_BATANGLAMA_PB.entries()) {
    const n = r.map((x) => x.jam);
    cek(r.length >= 3 && r.length <= 4 && n.filter((x) => x === Math.max(...n)).length === 1 && n.filter((x) => x === Math.min(...n)).length === 1 && Math.max(...n) <= 8, `PB3 r${i + 1}: terlama dan tersebentar tunggal`);
  }
  cek(D.RONDE_DIGITAL_PB.length === 3 && D.RONDE_DIGITAL_PB.every((r) => r.length === 4 && unik(r) && r.every((j) => j >= 1 && j <= 12)), "PB4: tiga ronde, empat jam berbeda");
  cek(D.RONDE_URUTJAM_PB.length === 3, "PB5: tiga ronde");
  for (const [i, r] of D.RONDE_URUTJAM_PB.entries()) {
    cek(r.length === 4 && unik(r) && unik(r.map((j) => `${D.jam12(j)}-${D.bagianHari(j)}`)), `PB5 r${i + 1}: empat jam, muka jam dan bagian hari menentukan waktu`);
    cek(!sama(D.urutTampil(r, [...r].sort((x, y) => x - y), i), [...r].sort((x, y) => x - y)), `PB5 r${i + 1}: urutan tampil bukan jawaban`);
  }
  cek(D.RONDE_SORTIRJAM_PB.length === 3, "PB6: tiga ronde");
  for (const [i, r] of D.RONDE_SORTIRJAM_PB.entries()) {
    cek(r.length === 6 && unik(r) && new Set(r.map(D.bagianHari)).size === 4, `PB6 r${i + 1}: enam jam, keempat bagian hari muncul`);
  }
  cek(D.RONDE_BLOK_PB.length === 3 && D.RONDE_BLOK_PB.every((r) => r.length === 2 && r.every(([a, b]) => b - a >= 1 && b - a <= 6)), "PB7: tiga ronde, dua jalur, 1 sampai 6 kotak");
  cek(D.RONDE_TABEL_PB.length === 2, "PB8: dua tabel");
  for (const t of D.RONDE_TABEL_PB) {
    cek(t.baris.length === 4 && t.baris.every((b) => /^\d\d\.00$/.test(b.label) && b.jawab === D.bagianHari(Number(b.label.slice(0, 2)))), `PB8 ${t.judul}: kunci dari bagian hari`);
    cek(new Set(t.baris.map((b) => b.jawab)).size === 4 && sama(t.kartu.slice().sort(), ["malam", "pagi", "siang", "sore"]), `PB8 ${t.judul}: keempat bagian hari`);
  }
  cek(D.RONDE_TALLYJAM_PB.length === 3 && D.RONDE_TALLYJAM_PB.every((r) => r.length === 2 && r.every(([a, b]) => b - a >= 2 && b - a <= 8)), "PB9: tiga ronde, 2 sampai 8 jam");
  cek(D.RONDE_TALLYJAM_PB.flat().some(([a, b]) => b - a > 5), "PB9: ada goresan lebih dari lima");
  cek(D.RONDE_GARISJAM_PB.length === 3 && D.RONDE_GARISJAM_PB.every((r) => r.length === 3 && unik(r) && r.every((j) => j >= 1 && j <= 12)), "PB10: tiga ronde, tiga jam");
}

/* ---- Abstract B ---- */
{
  cek(D.RONDE_KALIMAT_QB.length === 2 && D.RONDE_KALIMAT_QB.every((r) => r.length === 3), "QB1: dua ronde, tiga kalimat");
  const kunci = D.RONDE_KALIMAT_QB.flat().map((k) => k.opsi[k.benar]);
  cek(sama(kunci, ["pagi", "siang", "malam", "lama", "sebentar", "sore"]), `QB1: kunci sesuai fakta (${kunci})`);
  cek(D.RONDE_KALIMAT_QB.flat().every((k) => k.opsi.length === 3 && unik(k.opsi) && k.depan.length > 5), "QB1: tiga pilihan berbeda");
  cek(new Set(D.RONDE_KALIMAT_QB.flat().map((k) => k.benar)).size >= 2, "QB1: kunci berpindah posisi");
  cek(D.RONDE_BENARSALAH_QB.length === 2 && D.RONDE_BENARSALAH_QB.every((r) => r.length === 5 && r.some((p) => p.benar) && r.some((p) => !p.benar) && r.filter((p) => p.benar).length >= 2 && r.filter((p) => p.benar).length <= 4), "QB2: dua ronde, lima pernyataan, benar dan salah bercampur");
  const t = D.RONDE_BENARSALAH_QB.flat();
  cek(t.find((p) => p.teks.startsWith("Tidur malam lebih sebentar"))?.benar === false && t.find((p) => p.teks.startsWith("Pukul 12 siang termasuk bagian hari malam"))?.benar === false && t.find((p) => p.teks.startsWith("Belajar di sekolah lebih lama"))?.benar === true, "QB2: kunci dihitung dari data kegiatan");
  cek(D.RONDE_SUSUNKATA_QB.length === 4 && D.RONDE_SUSUNKATA_QB.every((r) => r.kata.length >= 4 && !r.kata.includes(r.pengecoh)), "QB3: empat kalimat");
  cek(D.RONDE_HITUNG_QB.length === 3 && D.RONDE_HITUNG_QB.every((r) => r.length === 2), "QB4: tiga ronde, dua soal");
  cek(sama(D.RONDE_HITUNG_QB.flat().map((s) => s.jawab), [1, 5, 2, 8, 3, 3]), "QB4: kunci dari selisih jam");
  cek(D.RONDE_TABEL_QB.length === 2 && D.RONDE_TABEL_QB.every((t) => t.baris.length === 4 && new Set(t.baris.map((b) => b.jawab)).size === 4 && t.baris.every((b) => t.kartu.includes(b.jawab))), "QB5: dua tabel, empat bagian hari berbeda");
  cek(D.RONDE_PILIHBAGIAN_QB.length === 3 && D.RONDE_PILIHBAGIAN_QB.every((r) => r.length === 3 && unik(r)), "QB6: tiga ronde, tiga jam");
  cek(new Set(D.RONDE_PILIHBAGIAN_QB.flat().map(D.bagianHari)).size >= 3, "QB6: paling sedikit tiga bagian hari muncul");
  /* Detektif: satu pilihan cocok dengan dua petunjuk. */
  const nama = Object.fromEntries(Object.values(D.KEGIATAN).map((k) => [k.nama, k]));
  const syarat = [
    (k) => D.bagianHari(k.jam24) === "pagi" && D.jam12(k.jam24) === 6,
    (k) => D.bagianHari(k.jam24) === "sore" && k.jam24 === 16,
    (k) => D.bagianHari(k.jam24) === "malam" && k.menit === Math.max(...["menyikat gigi", "tidur malam", "makan malam"].map((n) => nama[n].menit)),
    (k) => D.bagianHari(k.jam24) === "pagi" && k.menit < D.KEGIATAN.mandiPagi.menit,
  ];
  cek(D.RONDE_DETEKTIF_QB.length === 4, "QB7: empat soal");
  for (const [i, s] of D.RONDE_DETEKTIF_QB.entries()) {
    const ok = s.opsi.map((n) => nama[n]).map((k) => !!k && syarat[i](k));
    cek(s.petunjuk.length === 2 && s.opsi.length === 3 && ok.filter(Boolean).length === 1 && ok[s.jawab] === true && s.salah.length > 20, `QB7 soal ${i + 1}: hanya ${s.opsi[s.jawab]} yang cocok (${ok})`);
  }
  cek(D.PETA_KONSEP_B.length === 2 && D.PETA_KONSEP_B.every((p) => p.kotak.length === 4 && p.kotak.every((k) => k.opsi.length === 3 && unik(k.opsi) && k.benar === 0)), "QB8: dua peta, empat kotak");
  cek(D.RONDE_URUTDIGITAL_QB.length === 3 && D.RONDE_URUTDIGITAL_QB.every((r, i) => r.length === 4 && unik(r) && !sama(D.urutTampil(r, [...r].sort((a, b) => a - b), i), [...r].sort((a, b) => a - b))), "QB9: tiga ronde, empat jam berbeda, urutan tampil bukan jawaban");
  cek(D.RONDE_KETUKBAGIAN_QB.length === 3, "QB10: tiga ronde");
  for (const [i, s] of D.RONDE_KETUKBAGIAN_QB.entries()) {
    const cocok = s.jam.filter((j) => D.bagianHari(j) === s.bagian).length;
    cek(s.jam.length === 6 && unik(s.jam) && cocok >= 2 && cocok <= 4, `QB10 r${i + 1}: ${cocok} dari 6 jam termasuk ${s.bagian}`);
  }
  cek(sama(D.RONDE_KETUKBAGIAN_QB.map((s) => s.bagian), ["pagi", "malam", "sore"]), "QB10: pagi, malam, sore");
}

/* ====================================================================== */
/* Naskah, video, dan JSON                                                  */
/* ====================================================================== */
const SIMBOL = /[=<>+×÷]/;
for (const s of N.SUB_BAB_K2B6) {
  const k = s.id;
  cek(s.videos.length === 3 && s.videos.every((v) => v.adegan.length === 3), `naskah ${k}: tiga video, tiap video tiga adegan`);
  cek(s.mindMaps.length === 8 && s.mindMaps.every((m, i) => m.stepNumber === i + 1 && m.stepDesc.length > 150 && m.stepTitle.startsWith(`${i + 1}.`)), `naskah ${k}: delapan langkah peta pikiran berurutan dan mendalam`);
  cek(s.infografis.length === 10 && s.infografis.every((p) => p.suara.length > 40 && p.countNum >= 2), `naskah ${k}: sepuluh panel infografis`);
  cek(s.games.length === 30, `naskah ${k}: tiga puluh permainan (ada ${s.games.length})`);
  for (const [tahap, dari] of [["Concrete", 0], ["Picture", 10], ["Abstract", 20]]) {
    cek(s.games.slice(dari, dari + 10).every((g) => g.stage === tahap), `naskah ${k}: permainan ${dari + 1}-${dari + 10} bertahap ${tahap}`);
  }
  cek(unik(s.games.map((g) => g.title)), `naskah ${k}: judul permainan unik`);
  for (const tahap of ["Concrete", "Picture", "Abstract"]) {
    const t = s.games.filter((g) => g.stage === tahap).map((g) => g.gameType);
    cek(unik(t), `naskah ${k}: sepuluh jenis permainan berbeda di tahap ${tahap}`);
  }
  cek(s.games.every((g) => g.bookReference.length > 8 && g.objective.length > 15 && g.mechanicDescription.length > 60 && g.voiceGuide.length > 8), `naskah ${k}: tiap permainan lengkap keterangannya`);
  cek(s.games.filter((g) => g.stage === "Concrete").every((g) => g.emoji && g.targetCount > 0) && s.games.filter((g) => g.stage === "Picture").every((g) => g.diagramType) && s.games.filter((g) => g.stage === "Abstract").every((g) => g.symbolLarge && g.wordLarge), `naskah ${k}: bidang khusus tahap ada`);
  cek(s.poin.length === 5 && s.refleksi.length === 4 && s.cara.potongan.length === 4, `naskah ${k}: lima poin, empat refleksi, empat potongan cara`);
  for (const v of s.videos) {
    for (const a of v.adegan) {
      cek(a.ketukan.length >= 3 && a.ketukan.length <= 4 && a.ketukan.length === a.papan.length, `${a.id}: ketukan dan papan sama banyak (${a.ketukan.length}/${a.papan.length})`);
      cek(a.papan.every((p) => p.length <= 34), `${a.id}: papan tidak terlalu panjang`);
      cek(a.ketukan.every((x) => /[.!?]$/.test(x) && !SIMBOL.test(x)), `${a.id}: ketukan berakhir tanda baca dan tanpa lambang`);
    }
  }
  const lisan = [s.silabus.teksSuara, s.poinSuara, s.cara.suara, s.rumah, ...s.mindMaps.map((m) => m.stepDesc), ...s.infografis.map((p) => p.suara), ...s.poin.map((p) => p.suara)];
  cek(lisan.every((x) => !SIMBOL.test(x)), `naskah ${k}: ucapan memakai kata, bukan lambang`);
  cek(![s.targetDescription, s.rumah, ...s.games.map((g) => g.mechanicDescription)].some((x) => /rupiah|Rp\s?\d|\bkurs\b/i.test(x)), `naskah ${k}: tanpa nilai tukar`);
  const emojiPicto = /\p{Extended_Pictographic}/u;
  for (const g of s.games.filter((x) => x.stage === "Picture")) cek(!emojiPicto.test(`${g.title} ${g.objective} ${g.mechanicDescription} ${g.voiceGuide} ${g.diagramType}`), `naskah ${k}: Picture "${g.title}" tanpa emoji`);
}
cek(N.K2B6_META.suaraLaju === 0.7 && N.K2B6_META.suaraNada === 1 && N.K2B6_META.chapterId === "k2-mat-bab6" && N.K2B6_META.phaseCode === "FASE_A" && N.K2B6_META.grade === 2, "naskah: meta bab 6, laju 0,70, nada 1");
cek(N.semuaAdeganK2B6.length === 18, "naskah: delapan belas adegan");

/* ---- Berkas JSON publik ---- */
{
  const f = "src/data/kelas2-bab6.json";
  cek(fs.existsSync(f), "JSON publik ada");
  if (fs.existsSync(f)) {
    const j = JSON.parse(fs.readFileSync(f, "utf8"));
    const teks = JSON.stringify(j);
    cek(j.chapter_id === "k2-mat-bab6" && j.phase_code === "FASE_A" && j.grade === 2, "JSON: chapter_id, phase_code, grade");
    cek(j.suaraLaju === 0.7 && j.suaraNada === 1 && j.suaraPerangkatSaja === true, "JSON: laju 0,70, nada 1, suara perangkat saja");
    cek(Object.keys(j.subBabs).join() === "A,B", "JSON: hanya sub-bab A dan B");
    cek(Array.isArray(j.practiceQuestions) && j.practiceQuestions.length === 0 && !("examQuestions" in j) && !("examPackages" in j), "JSON: tanpa soal Latihan dan Ujian");
    cek(!/"correct_index"|"correctAnswer"|"explanation"/.test(teks), "JSON: tanpa kunci jawaban");
    cek(!/simulasi/i.test(teks), "JSON: tanpa data simulasi");
    for (const k of ["A", "B"]) {
      const s = j.subBabs[k];
      cek(s.stories.length === 9 && s.videos.length === 3 && s.mindMaps.length === 8 && s.infografisData.length === 10, `JSON ${k}: 9 adegan, 3 video, 8 peta pikiran, 10 panel`);
      cek(s.interactiveGames.length === 30 && s.concreteSlides.length === 10 && s.pictorialSlides.length === 10 && s.abstractSlides.length === 10, `JSON ${k}: 30 permainan (10 + 10 + 10)`);
      cek(unik(s.interactiveGames.map((g) => g.gameId)), `JSON ${k}: gameId unik`);
      const sumber = N.SUB_BAB_K2B6.find((x) => x.id === k);
      cek(sama(s.videos.map((v) => v.adegan.map((a) => a.ketukan)), sumber.videos.map((v) => v.adegan.map((a) => a.ketukan))), `JSON ${k}: ketukan video sama dengan naskah`);
    }
  }
}
cek(!fs.existsSync("supabase/seed/02_kelas2_bab6_keys.sql"), "seed server tidak dibuat untuk bab tanpa soal");

console.log(`\nData Kelas 2 Bab 6: ${lulus} lulus, ${gagal} gagal`);
process.exit(gagal ? 1 : 0);
