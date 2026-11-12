// Uji Simulasi Kelas 5 Bab 8 (Data): Lab Data (A), Lab Piktogram (B), mesin, skenario, misi, gerbang, data ringkas, pengeja, dan konsep
// sub-bab berikutnya tidak bocor ke sub-bab sebelumnya.
// Jalankan: node --no-warnings scripts/uji-lab-k5b8.mjs
import { readFileSync } from "node:fs";
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K8 from "../src/components/modul/misi-k5bab8.ts";
import * as TK from "../src/components/modul/misi-teks-k5b8.ts";
import * as A from "../src/components/modul/lab-data-k5b8a.ts";
import * as B from "../src/components/modul/lab-piktogram-k5b8b.ts";
import * as MS from "../src/components/modul/mesin-data-k5b8.ts";
import * as SK from "../src/components/modul/skenario-k5b8.ts";
import * as ME from "../src/components/modul/mesin-bertahap-k3b1.ts";
import * as EJ from "../src/components/modul/eja-k5b8.ts";
import * as EJ1 from "../src/components/modul/eja-k5b1.ts";

let lulus = 0;
let gagal = 0;
const cek = (kondisi, pesan) => {
  if (kondisi) lulus += 1;
  else {
    gagal += 1;
    console.log("GAGAL:", pesan);
  }
};
const sama = (a, b, pesan) => cek(JSON.stringify(a) === JSON.stringify(b), `${pesan}: ${JSON.stringify(a)} != ${JSON.stringify(b)}`);
const sel = (id) => ({ alat: "selesai", id });
const acakDari = (seed0) => {
  let s = seed0 >>> 0;
  return (n) => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return (s >>> 8) % n;
  };
};
const jalan = (awal, langkah, aksi) => aksi.reduce((s, a) => langkah(s, a), awal);
const tanpaAngka = (t) => !/\d/.test(EJ.ejaK5B8(t));
const L = A.langkahDataK5B8A;
const x0 = A.awalDataK5B8A();

/* ------------------------------ Hitungan MANDIRI (cara berbeda) ------------------------------ */
// Kode menghitung dari tabel f. Di sini semuanya dihitung dari urutan jawaban mentah dengan cara lain.
// Frekuensi: dikumpulkan ke dalam Map saat menelusuri jawaban satu per satu (bukan filter).
const frekuensiMandiri = (mentah, banyakKategori = 4) => {
  const peta = new Map();
  for (const v of mentah) peta.set(v, (peta.get(v) ?? 0) + 1);
  return Array.from({ length: banyakKategori }, (_, k) => peta.get(k) ?? 0);
};
// Turus ditulis sebagai teks: tiap lima garis menjadi "||||/ ", sisanya "|".
const teksTurus = (f) => "||||/ ".repeat((f - (f % 5)) / 5) + "|".repeat(f % 5);
const hitungDariTeksTurus = (t) => t.split(" ").reduce((jum, bagian) => jum + (bagian === "||||/" ? 5 : bagian.length), 0);
// Mode: urutkan indeks menurun menurut frekuensi; yang sama dengan puncak adalah mode.
const modeMandiri = (f) => {
  const urut = f.map((v, k) => [v, k]).sort((p, q) => q[0] - p[0] || p[1] - q[1]);
  return urut.filter(([v]) => v === urut[0][0]).map(([, k]) => k);
};
const NAMA_DATA = ["sayuran favorit", "penjualan donat Anggi", "cara berangkat sekolah", "ukuran sepatu", "nilai ulangan", "olahraga favorit"];
const F_RENCANA = [[6, 5, 2, 1], [6, 4, 3, 2], [5, 5, 3, 1], [2, 6, 5, 3], [3, 4, 7, 2], [5, 3, 5, 2]];
const SALAH_RENCANA = [[2, 1], [0, -1], [3, 1], [1, -1], [2, 1], [1, 1]];

/* ------------------------------ Pengeja ------------------------------ */
{
  sama(EJ.ejaK5B8("7 + 5 + 3 + 2 = 17"), "tujuh ditambah lima ditambah tiga ditambah dua sama dengan tujuh belas", "eja jumlah frekuensi");
  sama(EJ.ejaK5B8("6 − 2 = 4"), "enam dikurangi dua sama dengan empat", "eja selisih");
  sama(EJ.ejaK5B8("5 + 3 > 7"), "lima ditambah tiga lebih besar dari tujuh", "eja lebih besar");
  sama(EJ.ejaK5B8("ada 14 jawaban."), "ada empat belas jawaban.", "eja kalimat berangka");
  sama(EJ.ejaK5B8("tidak ada angka."), "tidak ada angka.", "tanpa angka tetap");
  sama(EJ.ejaK5B8("(5 + 3)"), "kurung buka lima ditambah tiga kurung tutup", "eja kurung");
  let ok = true;
  for (let n = 0; n <= 360; n += 1) if (EJ.kataK5B8(n) !== EJ1.kataK5B1(n)) ok = false;
  for (const n of [999, 1000, 1200, 999999]) if (EJ.kataK5B8(n) !== EJ1.kataK5B1(n)) ok = false;
  cek(ok, "kata bilangan sama dengan kataK5B1 (0 sampai 360 dan bilangan besar)");
  cek(EJ.kataK5B8(-1) === "-1" && EJ.kataK5B8(1.5) === "1.5" && EJ.kataK5B8(1000000) === "1000000", "kata di luar jangkauan apa adanya");
}

/* ------------------------------ Data sama dengan rencana ------------------------------ */
{
  cek(A.DATA_TURUS.length === 6 && A.BANYAK_KATEGORI === 4 && A.KELOMPOK === 5, "enam data, empat kategori, kelompok lima");
  sama(A.DATA_TURUS.map((d) => d.nama), NAMA_DATA, "nama enam data");
  sama(A.DATA_TURUS.map((d) => d.f), F_RENCANA, "frekuensi enam data sesuai rencana");
  sama(A.DATA_TURUS.map((d) => [d.salah.k, d.salah.selisih]), SALAH_RENCANA, "rekap salah sesuai rencana");
  for (const [i, d] of A.DATA_TURUS.entries()) {
    sama(frekuensiMandiri(d.mentah), F_RENCANA[i], `data ${i}: jawaban mentah dihitung mandiri sama dengan f (Map)`);
    cek(d.mentah.length === F_RENCANA[i].reduce((a, b) => a + b, 0) && d.mentah.every((v) => Number.isInteger(v) && v >= 0 && v < 4), `data ${i}: banyak dan nilai jawaban mentah`);
    cek(d.kategori.length === 4 && new Set(d.kategori).size === 4, `data ${i}: empat kategori berbeda`);
    cek(d.mentah.some((v, j) => j > 0 && v !== d.mentah[j - 1]) && d.mentah.join() !== [...d.mentah].sort().join(), `data ${i}: jawaban mentah teracak, bukan terurut`);
    // Rekap salah: tepat satu kategori berbeda satu dan jumlahnya tidak sama dengan banyak data.
    const rekap = A.rekapSalah(d);
    cek(rekap.filter((v, k) => v !== d.f[k]).length === 1 && Math.abs(rekap[d.salah.k] - d.f[d.salah.k]) === 1 && rekap.every((v) => v >= 0), `data ${i}: rekap salah beda satu pada satu kategori`);
    cek(rekap.reduce((a, b) => a + b, 0) === A.banyakData(d) + d.salah.selisih && rekap.reduce((a, b) => a + b, 0) !== A.banyakData(d), `data ${i}: jumlah rekap tidak sama dengan banyak data`);
    sama(A.indeksMode(d.f), modeMandiri(d.f), `data ${i}: mode sama dengan urutan menurun`);
    cek(A.adaSeri(d.f) === (modeMandiri(d.f).length > 1), `data ${i}: seri sama dengan mode lebih dari satu`);
    for (let k = 0; k < 4; k += 1) {
      cek(hitungDariTeksTurus(teksTurus(d.f[k])) === d.f[k], `data ${i}/${k}: teks turus dihitung balik sama`);
      const t = A.kelompokTurus(d.f[k]);
      cek(t.penuh * 5 + t.sisa === d.f[k] && t.sisa < 5 && teksTurus(d.f[k]).split("||||/").length - 1 === t.penuh, `data ${i}/${k}: kelompok ${t.penuh} dan sisa ${t.sisa}`);
    }
  }
  sama(A.DATA_TURUS.map((d) => modeMandiri(d.f).length > 1), [false, false, true, false, false, true], "tepat dua data berseri (cara berangkat dan olahraga)");
  cek(A.DATA_TURUS.some((d) => d.f.some((v) => v >= 5)) && A.DATA_TURUS[0].f[0] === 6, "data pertama punya kategori dengan kelompok lima penuh");
  // Susunan mentah tetap (deterministik) dan bergantung benih.
  sama(A.susunMentah([2, 1], 7), A.susunMentah([2, 1], 7), "susunMentah deterministik");
  sama(frekuensiMandiri(A.susunMentah([3, 0, 2, 1], 99)), [3, 0, 2, 1], "susunMentah menjaga frekuensi");
  // Pilihan keputusan.
  for (const i of [0, 1, 2, 3, 4, 5]) {
    const p = A.opsiPutus(i);
    const d = A.DATA_TURUS[i];
    const mode = modeMandiri(d.f);
    const kunci = `Utamakan ${mode.map((k) => d.kategori[k]).join(" dan ")}`;
    cek(p.opsi.length === 3 && new Set(p.opsi).size === 3 && p.opsi[p.benar] === kunci && p.opsi.filter((o) => o === kunci).length === 1, `keputusan ${i}: tiga pilihan unik, kunci ${kunci}`);
    cek(p.opsi.some((o) => /^Tidak perlu/.test(o)) && p.opsi.every((o) => tanpaAngka(o)), `keputusan ${i}: ada pilihan menebak dan dapat dieja`);
    const rendah = d.f.indexOf(Math.min(...d.f));
    cek(p.opsi.includes(mode.length > 1 ? `Utamakan ${d.kategori[rendah]} saja` : `Utamakan ${d.kategori[rendah]}`) && p.opsi.includes("Tidak perlu melihat tabel, cukup menebak"), `keputusan ${i}: pengecoh kategori terendah dan menebak`);
  }
  cek(new Set([0, 1, 2, 3, 4, 5].map((i) => A.opsiPutus(i).benar)).size === 3, "letak kunci keputusan bervariasi");
  cek(A.fTertinggi([6, 5, 2, 1]) === 6 && A.fTerendah([6, 5, 2, 1]) === 1 && A.indeksTerendah([6, 5, 2, 1]) === 3, "tertinggi dan terendah");
}

/* ------------------------------ Lab A: Data ------------------------------ */
{
  sama(A.keadaanDataK5B8A(x0), { alat: "data", pernah: [] }, "keadaan awal");
  cek(x0.pernah.length === 0 && x0.pesan === "" && x0.turus.titik === 0 && x0.turus.tally.every((v) => v === 0) && x0.tabel.f.every((v) => v === 0), "awal: kosong");
  cek(x0.turus.data === 0 && x0.tabel.data === 0 && x0.mode.data === 0, "awal: data pertama");

  // Turus.
  {
    const mentah = A.DATA_TURUS[0].mentah;
    const salahPertama = (mentah[0] + 1) % 4;
    const s1 = L(x0, { t: "R_CATAT", k: salahPertama });
    cek(s1.turus.titik === 0 && s1.turus.tally.every((v) => v === 0) && s1.pernah.length === 0 && s1.pesan.includes("bukan"), "Turus: kategori salah ditolak, tidak ada perubahan");
    const s2 = L(x0, { t: "R_CATAT", k: mentah[0] });
    cek(s2.pesan.startsWith("✅") && !s1.pesan.startsWith("✅") && s2.turus.titik === 1 && s2.turus.tally[mentah[0]] === 1 && s2.turus.tally.reduce((a, b) => a + b, 0) === 1, "Turus: kategori benar menambah satu garis");
    // Menyelesaikan seluruh data dengan jawaban benar: hasil tally sama dengan f, dihitung mandiri.
    for (const [i, d] of A.DATA_TURUS.entries()) {
      const aksi = [{ t: "R_DATA", i }, ...d.mentah.map((k) => ({ t: "R_CATAT", k }))];
      const s = jalan(x0, L, aksi);
      sama(s.turus.tally, F_RENCANA[i], `Turus ${i}: hasil turus sama dengan frekuensi rencana`);
      cek(s.turus.titik === d.mentah.length && s.pernah.includes(A.idTurus(i)) && A.jawabanBerikut(s) === null, `Turus ${i}: selesai dicatat`);
      cek(s.pesan.includes(`Semua ${d.mentah.length} jawaban`) && s.pesan.includes(`Jumlah turus = ${d.mentah.length}`), `Turus ${i}: pesan akhir memuat banyak jawaban`);
      cek((F_RENCANA[i].some((v) => v >= 5)) === s.pernah.includes(A.idLima(i)), `Turus ${i}: kelompok lima tercatat tepat bila ada kategori sedikitnya lima`);
      // Setelah habis, mencatat lagi ditolak dan tidak mengubah apa pun.
      const lagi = L(s, { t: "R_CATAT", k: 0 });
      cek(lagi.turus === s.turus && lagi.pernah === s.pernah && lagi.pesan.includes("sudah dicatat"), `Turus ${i}: sesudah habis tidak bisa mencatat lagi`);
      // Setengah jalan belum menyelesaikan.
      const separuh = jalan(x0, L, [{ t: "R_DATA", i }, ...d.mentah.slice(0, -1).map((k) => ({ t: "R_CATAT", k }))]);
      cek(!separuh.pernah.includes(A.idTurus(i)), `Turus ${i}: kurang satu jawaban belum selesai`);
    }
    // Kelompok lima: tepat saat turus kategori mencapai lima.
    {
      const d = A.DATA_TURUS[0];
      const k5 = 0; // Bayam f 6
      let s = x0;
      let hitung = 0;
      let saatLima = -1;
      for (const [n, k] of d.mentah.entries()) {
        s = L(s, { t: "R_CATAT", k });
        if (k === k5) hitung += 1;
        if (hitung === 5 && saatLima < 0) {
          saatLima = n;
          cek(s.pernah.includes(A.idLima(0)) && s.pesan.includes("empat garis tegak dan satu garis miring"), "Turus: lima tercatat saat turus bayam kelima");
        }
        if (saatLima < 0) cek(!s.pernah.includes(A.idLima(0)), `Turus: lima belum tercatat pada jawaban ke-${n + 1}`);
      }
    }
    cek(L(x0, { t: "R_CATAT", k: 4 }) === x0 && L(x0, { t: "R_CATAT", k: -1 }) === x0 && L(x0, { t: "R_CATAT", k: 1.5 }) === x0 && L(x0, { t: "R_DATA", i: 6 }) === x0 && L(x0, { t: "R_DATA", i: -1 }) === x0 && L(x0, { t: "R_DATA", i: 0.5 }) === x0, "Turus: indeks di luar batas atau pecahan diabaikan");
    const ganti = jalan(x0, L, [{ t: "R_CATAT", k: mentah[0] }, { t: "R_DATA", i: 1 }]);
    cek(ganti.turus.data === 1 && ganti.turus.titik === 0 && ganti.turus.tally.every((v) => v === 0), "Turus: ganti data mengosongkan turus");
  }

  // Tabel.
  {
    for (const [i, d] of A.DATA_TURUS.entries()) {
      const pilih = (f) => jalan(L(x0, { t: "T_DATA", i }), L, f.flatMap((v, k) => Array.from({ length: v }, () => ({ t: "T_UBAH", k, delta: 1 }))));
      const benar = L(pilih(F_RENCANA[i]), { t: "T_PERIKSA" });
      cek(benar.pernah.join() === A.idTabel(i) && benar.pesan.startsWith("✅") && benar.pesan.includes(`${F_RENCANA[i].join(" + ")} = ${F_RENCANA[i].reduce((a, b) => a + b, 0)}`), `Tabel ${i}: isian benar dicatat dengan jumlah`);
      // Satu kategori kurang satu atau lebih satu: ditolak dengan jumlah yang tidak cocok.
      for (let k = 0; k < 4; k += 1) {
        for (const selisih of [-1, 1, 2]) {
          const f = F_RENCANA[i].map((v, j) => (j === k ? v + selisih : v));
          if (f[k] < 0) continue;
          const s = L(pilih(f), { t: "T_PERIKSA" });
          const n = F_RENCANA[i].reduce((a, b) => a + b, 0);
          cek(s.pernah.length === 0 && s.pesan.includes(`Jumlah frekuensimu ${n + selisih}, padahal banyak data ${n}`) && s.pesan.includes(A.DATA_TURUS[i].kategori[k]), `Tabel ${i}/${k}/${selisih}: isian salah ditolak dengan jumlah dan kategori`);
        }
      }
      // Dua kategori tertukar: jumlahnya benar tetapi tetap ditolak.
      if (F_RENCANA[i][0] !== F_RENCANA[i][1]) {
        const tukar = [...F_RENCANA[i]];
        [tukar[0], tukar[1]] = [tukar[1], tukar[0]];
        const s = L(pilih(tukar), { t: "T_PERIKSA" });
        cek(s.pernah.length === 0 && s.pesan.includes("tertukar"), `Tabel ${i}: dua kategori tertukar ditolak walau jumlahnya sama`);
      }
      // Rekap salah: hanya setelah tabel benar.
      const sebelum = L(L(x0, { t: "T_DATA", i }), { t: "T_TUNJUK", k: A.DATA_TURUS[i].salah.k });
      cek(sebelum.pernah.length === 0 && sebelum.pesan.includes("Isi dan periksa"), `Tabel ${i}: tunjuk sebelum tabel benar ditolak`);
      const [kk, sl] = SALAH_RENCANA[i];
      const tunjuk = L(benar, { t: "T_TUNJUK", k: kk });
      cek(tunjuk.pernah.includes(A.idSalah(i)) && tunjuk.pernah.includes(A.idTabel(i)) && tunjuk.pesan.startsWith("✅") && tunjuk.pesan.includes(`rekap menulis ${F_RENCANA[i][kk] + sl}`), `Tabel ${i}: kategori salah rekap ditunjuk benar`);
      const jumlahRekap = F_RENCANA[i].reduce((a, b) => a + b, 0) + sl;
      cek(tunjuk.pesan.includes(`jumlah rekap ${jumlahRekap}`), `Tabel ${i}: pesan memuat jumlah rekap ${jumlahRekap}`);
      for (let k = 0; k < 4; k += 1) {
        if (k === kk) continue;
        const s = L(benar, { t: "T_TUNJUK", k });
        cek(s.pernah.length === 1 && !s.pernah.includes(A.idSalah(i)), `Tabel ${i}: kategori ${k} yang benar tidak dihitung salah`);
      }
    }
    // Pengubah: batas 0 sampai 30, hanya satu per langkah.
    let s = x0;
    for (let n = 0; n < 40; n += 1) s = L(s, { t: "T_UBAH", k: 0, delta: 1 });
    cek(s.tabel.f[0] === A.BATAS_F && A.BATAS_F === 30, "Tabel: frekuensi dibatasi 30");
    s = x0;
    s = L(s, { t: "T_UBAH", k: 1, delta: -1 });
    cek(s.tabel.f[1] === 0, "Tabel: frekuensi tidak negatif");
    cek(L(x0, { t: "T_UBAH", k: 0, delta: 2 }) === x0 && L(x0, { t: "T_UBAH", k: 0, delta: 0 }) === x0 && L(x0, { t: "T_UBAH", k: 4, delta: 1 }) === x0 && L(x0, { t: "T_UBAH", k: -1, delta: 1 }) === x0 && L(x0, { t: "T_UBAH", k: 0.5, delta: 1 }) === x0 && L(x0, { t: "T_TUNJUK", k: 7 }) === x0 && L(x0, { t: "T_DATA", i: 6 }) === x0, "Tabel: indeks dan langkah tidak sah diabaikan");
    cek(L(L(x0, { t: "T_UBAH", k: 0, delta: 1 }), { t: "T_DATA", i: 1 }).tabel.f.every((v) => v === 0), "Tabel: ganti data mengosongkan isian");
    cek(L(x0, { t: "T_PERIKSA" }).pernah.length === 0, "Tabel: tabel kosong tidak dianggap benar");
  }

  // Mode.
  {
    for (const [i, d] of A.DATA_TURUS.entries()) {
      const mode = modeMandiri(d.f);
      const s0 = L(x0, { t: "M_DATA", i });
      // Pilih tiap kategori.
      for (let k = 0; k < 4; k += 1) {
        const s = L(s0, { t: "M_PILIH", k });
        const harusBenar = mode.length === 1 && mode[0] === k;
        cek(s.pernah.includes(A.idMode(i)) === harusBenar, `Mode ${i}/${k}: pilihan ${harusBenar ? "benar" : "salah"} (orakel urutan menurun)`);
        cek(s.pesan.length > 10 && (harusBenar ? s.pesan.startsWith("✅") && s.pesan.includes(`frekuensinya ${d.f[k]}`) : !s.pesan.startsWith("✅")), `Mode ${i}/${k}: pesan sesuai`);
      }
      const seri = L(s0, { t: "M_SERI" });
      cek(seri.pernah.includes(A.idMode(i)) === (mode.length > 1), `Mode ${i}: "sama tinggi" benar hanya bila seri`);
      if (mode.length > 1) cek(mode.every((k) => seri.pesan.includes(d.kategori[k])) && seri.pesan.includes("dua mode"), `Mode ${i}: pesan seri menyebut semua kategori tertinggi`);
      // Keputusan.
      const siap = mode.length > 1 ? seri : L(s0, { t: "M_PILIH", k: mode[0] });
      const sebelum = L(s0, { t: "M_PUTUS", o: 0 });
      cek(sebelum.pernah.length === 0 && sebelum.pesan.includes("Tentukan dulu"), `Mode ${i}: keputusan sebelum mode ditolak`);
      const p = A.opsiPutus(i);
      for (let o = 0; o < 3; o += 1) {
        const s = L(siap, { t: "M_PUTUS", o });
        cek(s.pernah.includes(A.idPutus(i)) === (o === p.benar), `Mode ${i}: keputusan ${o} ${o === p.benar ? "benar" : "salah"}`);
      }
      cek(L(siap, { t: "M_PUTUS", o: 3 }) === siap && L(siap, { t: "M_PUTUS", o: -1 }) === siap && L(siap, { t: "M_PUTUS", o: 0.5 }) === siap, `Mode ${i}: keputusan di luar batas diabaikan`);
    }
    cek(L(x0, { t: "M_PILIH", k: 4 }) === x0 && L(x0, { t: "M_PILIH", k: -1 }) === x0 && L(x0, { t: "M_PILIH", k: 0.5 }) === x0 && L(x0, { t: "M_DATA", i: 6 }) === x0, "Mode: indeks di luar batas diabaikan");
    const d1 = L(x0, { t: "M_DATA", i: 1 });
    cek(L(d1, { t: "M_PILIH", k: 0 }).pesan.includes("Selisih") && L(d1, { t: "M_PILIH", k: 0 }).pesan.includes(`${6} − ${2} = ${4}`), "Mode: pesan memuat selisih tertinggi dan terendah (6 − 2 = 4)");
  }

  // Reset dan pesan kosong.
  {
    const s = jalan(x0, L, [{ t: "R_CATAT", k: A.DATA_TURUS[0].mentah[0] }, { t: "T_UBAH", k: 0, delta: 1 }, { t: "M_DATA", i: 2 }, { t: "M_SERI" }]);
    cek(L(s, { t: "PESAN_KOSONG" }).pesan === "" && L(s, { t: "PESAN_KOSONG" }).turus.titik === 1, "PESAN_KOSONG hanya mengosongkan pesan");
    sama(L(s, { t: "RESET" }), x0, "RESET kembali ke awal");
  }

  // Fuzz 20.000 aksi: batas terjaga, riwayat hanya bertambah oleh jawaban benar bersyarat (orakel mandiri).
  {
    const acak = acakDari(5808);
    const pesanSemua = new Set();
    const riwayatSemua = new Set();
    let ok = true;
    let s = x0;
    const buat = () => {
      const r = acak(16);
      if (r === 0) return acak(6) === 0 ? { t: "R_DATA", i: acak(8) - 1 } : { t: "R_CATAT", k: A.jawabanBerikut(s) ?? 0 };
      if (r === 1 || r === 2) return { t: "R_CATAT", k: acak(6) - 1 };
      if (r === 3) return acak(8) === 0 ? { t: "T_DATA", i: acak(8) - 1 } : { t: "T_PERIKSA" };
      if (r === 4) return { t: "T_UBAH", k: acak(6) - 1, delta: acak(5) - 2 };
      if (r === 5) return { t: "T_PERIKSA" };
      if (r === 6) return acak(3) === 0 ? { t: "T_TUNJUK", k: acak(6) - 1 } : { t: "T_TUNJUK", k: A.DATA_TURUS[s.tabel.data].salah.k };
      if (r === 7) return acak(3) === 0 ? { t: "M_DATA", i: acak(8) - 1 } : { t: "M_SERI" };
      if (r === 8) return { t: "M_PILIH", k: acak(6) - 1 };
      if (r === 9) return { t: "M_PUTUS", o: A.opsiPutus(s.mode.data).benar };
      if (r === 10) return { t: "M_PUTUS", o: acak(5) - 1 };
      if (r === 11) return { t: "PESAN_KOSONG" };
      if (r === 12 && acak(60) === 0) return { t: "RESET" };
      if (r === 13) {
        // Jawaban benar yang sedang diminta, supaya turus bisa maju jauh.
        const b = A.jawabanBerikut(s);
        return { t: "R_CATAT", k: b === null ? 0 : b };
      }
      if (r === 14) {
        // Isi tabel mendekati benar.
        const d = A.DATA_TURUS[s.tabel.data];
        const k = acak(4);
        return { t: "T_UBAH", k, delta: s.tabel.f[k] < d.f[k] ? 1 : -1 };
      }
      return { t: "M_PILIH", k: modeMandiri(A.DATA_TURUS[s.mode.data].f)[0] };
    };
    for (let n = 0; n < 20000; n += 1) {
      const a = buat();
      const sebelum = s;
      s = L(s, a);
      pesanSemua.add(s.pesan);
      const batas =
        [s.turus.data, s.tabel.data, s.mode.data].every((v) => v >= 0 && v < 6) &&
        s.turus.tally.length === 4 && s.turus.tally.every((v) => v >= 0) &&
        s.turus.titik >= 0 && s.turus.titik <= A.DATA_TURUS[s.turus.data].mentah.length &&
        s.turus.tally.reduce((p, q) => p + q, 0) === s.turus.titik &&
        s.turus.tally.every((v, k) => v === A.DATA_TURUS[s.turus.data].mentah.slice(0, s.turus.titik).filter((j) => j === k).length) &&
        s.tabel.f.length === 4 && s.tabel.f.every((v) => Number.isInteger(v) && v >= 0 && v <= 30) &&
        new Set(s.pernah).size === s.pernah.length;
      if (!batas) ok = false;
      if (a.t === "RESET") {
        if (s.pernah.length !== 0) ok = false;
        continue;
      }
      if (!sebelum.pernah.every((p) => s.pernah.includes(p))) ok = false;
      const baru = s.pernah.filter((p) => !sebelum.pernah.includes(p));
      if (baru.length > 2) ok = false;
      for (const b of baru) {
        const [alat, idx] = b.split(":");
        const i = Number(idx);
        riwayatSemua.add(alat);
        const d = A.DATA_TURUS[i];
        if (alat === "turus" || alat === "lima") {
          const lengkap = a.t === "R_CATAT" && sebelum.turus.data === i && sebelum.turus.titik < d.mentah.length && a.k === d.mentah[sebelum.turus.titik];
          if (!lengkap) ok = false;
          if (alat === "turus" && s.turus.titik !== d.mentah.length) ok = false;
          if (alat === "lima" && s.turus.tally[d.mentah[sebelum.turus.titik]] !== 5) ok = false;
        } else if (alat === "tabel") {
          if (!(a.t === "T_PERIKSA" && sebelum.tabel.data === i && JSON.stringify(sebelum.tabel.f) === JSON.stringify(frekuensiMandiri(d.mentah)))) ok = false;
        } else if (alat === "salah") {
          if (!(a.t === "T_TUNJUK" && sebelum.tabel.data === i && sebelum.pernah.includes(`tabel:${i}`) && a.k === SALAH_RENCANA[i][0])) ok = false;
        } else if (alat === "mode") {
          const m = modeMandiri(frekuensiMandiri(d.mentah));
          const benar = (a.t === "M_PILIH" && m.length === 1 && a.k === m[0]) || (a.t === "M_SERI" && m.length > 1);
          if (!(benar && sebelum.mode.data === i)) ok = false;
        } else if (alat === "putus") {
          if (!(a.t === "M_PUTUS" && sebelum.mode.data === i && sebelum.pernah.includes(`mode:${i}`) && a.o === A.opsiPutus(i).benar)) ok = false;
        } else ok = false;
      }
    }
    cek(ok, "fuzz 20.000 aksi Lab Data: batas terjaga, riwayat tidak dicabut dan hanya bila tercapai (orakel mandiri)");
    cek(pesanSemua.size > 40 && [...pesanSemua].every(tanpaAngka), `fuzz Lab Data: semua ${pesanSemua.size} pesan dieja menjadi kata`);
    cek(riwayatSemua.size === 6, `fuzz Lab Data: riwayat terkumpul (${[...riwayatSemua].sort().join(" ")})`);
    globalThis.__pesanA = [...pesanSemua];
  }
}

/* ------------------------------ Mesin ------------------------------ */
{
  cek(MS.SEMUA_MESIN_K5B8.length === 2 && MS.SEMUA_MESIN_K5B8[0] === MS.MESIN_DATA && MS.SEMUA_MESIN_K5B8[1] === MS.MESIN_PIKTOGRAM, "dua mesin untuk Sub-Bab A dan B");
  for (const def of MS.SEMUA_MESIN_K5B8) {
    cek(def.stasiun.length === 4 && def.kasus.length === 3, `${def.id}: empat stasiun, tiga kasus`);
    const posisi = [];
    for (const kasus of def.kasus) {
      cek(kasus.langkah.length === 4, `${def.id}/${kasus.id}: empat langkah`);
      kasus.langkah.forEach((l, i) => {
        cek(l.stasiun === def.stasiun[i].id, `${def.id}/${kasus.id}: langkah ${i + 1} di stasiun ${def.stasiun[i].id}`);
        cek(l.opsi.length === 3 && new Set(l.opsi).size === 3 && l.opsi.filter((o) => o === l.benar).length === 1, `${def.id}/${kasus.id}/${l.stasiun}: tiga pilihan unik, satu kunci`);
        cek([l.tanya, l.petunjuk, ...l.opsi].every(tanpaAngka), `${def.id}/${kasus.id}/${l.stasiun}: dapat dieja`);
        posisi.push(l.opsi.indexOf(l.benar));
      });
      cek(tanpaAngka(kasus.nama) && tanpaAngka(kasus.ringkas), `${def.id}/${kasus.id}: nama dan ringkas dapat dieja`);
    }
    cek(new Set(posisi).size === 3, `${def.id}: letak kunci bervariasi`);
    let x = ME.awalMesin(def);
    let n = 0;
    while (!x.selesai && n < 100) {
      n += 1;
      const l = ME.langkahAktif(x);
      x = l ? ME.langkahMesin(x, { t: "JAWAB", nilai: l.benar }) : ME.langkahMesin(x, { t: "LANJUT" });
    }
    cek(x.selesai && def.selesaiId === K8.ID_MESIN_K5B8[def === MS.MESIN_DATA ? "A" : "B"], `${def.id}: bisa diselesaikan, id selesai sesuai misi`);
    const y = ME.awalMesin(def);
    const l0 = ME.langkahAktif(y);
    const z = ME.langkahMesin(y, { t: "JAWAB", nilai: l0.opsi.find((o) => o !== l0.benar) });
    cek(z.ke === 0 && z.ditolak === 1 && z.pesan === l0.petunjuk, `${def.id}: jawaban salah ditolak dengan petunjuk`);
  }
  const angka = (o) => Number(o.split(" ")[0]);
  const RENCANA = [
    { id: "donat", kategori: ["Cokelat", "Keju", "Stroberi", "Kacang"], f: [7, 5, 3, 2], daftar: [0, 1, 0, 2, 0, 3, 1, 0, 2, 1] },
    { id: "sayuran", kategori: ["Bayam", "Wortel", "Kangkung", "Sawi"], f: [8, 6, 4, 2], daftar: [1, 0, 1, 2, 1, 0, 3, 1, 2, 0] },
    { id: "berangkat", kategori: ["Jalan kaki", "Sepeda", "Angkot", "Motor"], f: [9, 5, 4, 2], daftar: [0, 0, 1, 0, 2, 0, 1, 3, 0, 2] },
  ];
  sama(MS.KASUS_DATA.map((k) => [k.id, k.kategori, k.f, k.daftar]), RENCANA.map((r) => [r.id, r.kategori, r.f, r.daftar]), "Mesin: data tiga kasus sesuai rencana");
  const kataKasus = ["donat", "sayuran", "berangkat"];
  for (const [i, r] of RENCANA.entries()) {
    const c = MS.MESIN_DATA.kasus[i];
    const [tu, fr, tb, kp] = c.langkah;
    const kas = MS.KASUS_DATA[i];
    // Turus: kelompok lima dari teks turus.
    const ft = r.f[kas.target.turus];
    const teks = teksTurus(ft);
    const penuh = teks.split("||||/").length - 1;
    const sisa = teks.endsWith("/ ") || teks.endsWith("/") ? 0 : teks.trim().split(" ").pop().length;
    cek(tu.benar === `${penuh} kelompok lima dan ${ft - penuh * 5} garis` && tu.tanya.includes(`${r.kategori[kas.target.turus]} muncul ${ft} kali`) && ft - penuh * 5 === ft % 5, `Mesin ${r.id}: turus ${ft} = ${penuh} kelompok lima dan ${ft % 5} garis`);
    cek(MS.bentukTurus(ft) === tu.benar && penuh !== ft % 5 && sisa >= 0, `Mesin ${r.id}: bentukTurus sama, kelompok dan garis berbeda (pengecoh tukar tidak sama)`);
    sama([...tu.opsi].sort(), [`${penuh} kelompok lima dan ${ft % 5} garis`, `${ft % 5} kelompok lima dan ${penuh} garis`, `${penuh + 1} kelompok lima dan ${ft % 5} garis`].sort(), `Mesin ${r.id}: pengecoh turus adalah menukar kelompok dengan garis dan kelompok lebih satu`);
    // Frekuensi dari daftar: dihitung dengan Map.
    const f1 = frekuensiMandiri(r.daftar)[kas.target.frekuensi];
    cek(fr.benar === `${f1} kali` && fr.tanya.includes(r.daftar.map((k) => r.kategori[k]).join(", ")) && fr.tanya.includes(`Frekuensi ${r.kategori[kas.target.frekuensi]}`) && fr.opsi.every((o) => o === fr.benar || angka(o) !== f1), `Mesin ${r.id}: frekuensi ${f1} dari daftar (Map)`);
    cek(MS.hitungDalamDaftar(r.daftar, kas.target.frekuensi) === f1 && r.daftar.length === 10, `Mesin ${r.id}: hitungDalamDaftar sama, daftar sepuluh jawaban`);
    // Tabel: frekuensi yang hilang dari jumlah.
    const total = r.f.reduce((a, b) => a + b, 0);
    const tigaSum = r.f.filter((_, k) => k !== kas.target.hilang).reduce((a, b) => a + b, 0);
    cek(tb.benar === String(total - tigaSum) && tb.benar === String(r.f[kas.target.hilang]) && tb.tanya.includes(`Banyak data ${total}`) && tb.opsi.every((o) => o === tb.benar || Number(o) !== total - tigaSum), `Mesin ${r.id}: frekuensi hilang ${total - tigaSum} = ${total} − ${tigaSum}`);
    cek(!tb.tanya.includes(`${r.kategori[kas.target.hilang]} ${r.f[kas.target.hilang]}`), `Mesin ${r.id}: soal tabel tidak membocorkan frekuensi yang hilang`);
    // Keputusan: kategori tertinggi, dihitung mandiri.
    const m = modeMandiri(r.f);
    cek(m.length === 1 && kp.benar === r.kategori[m[0]] && kp.opsi.includes(r.kategori[r.f.indexOf(Math.min(...r.f))]) && new Set(kp.opsi).size === 3, `Mesin ${r.id}: keputusan ${r.kategori[m[0]]}, ada pengecoh terendah`);
    cek(r.kategori.every((n, k) => kp.tanya.includes(`${n} ${r.f[k]}`)), `Mesin ${r.id}: keputusan memuat seluruh tabel`);
    sama([...kp.opsi].sort(), [r.kategori[m[0]], r.kategori[r.f.indexOf(Math.min(...r.f))], r.kategori[1]].sort(), `Mesin ${r.id}: pengecoh keputusan adalah terendah dan peringkat kedua`);
    cek(EJ.ejaK5B8(c.ringkas).includes(EJ.kataK5B8(total)) && c.ringkas.includes(`${f1} kali`) && kataKasus[i] === r.id, `Mesin ${r.id}: ringkas memuat banyak data dan frekuensi`);
  }
  sama(MS.KASUS_DATA.map((k) => k.f[k.target.turus] % 5), [2, 3, 4], "Mesin: sisa garis turus 2, 3, 4");
  sama(MS.KASUS_DATA.map((k) => frekuensiMandiri(k.daftar)[k.target.frekuensi]), [3, 4, 5], "Mesin: frekuensi dari daftar 3, 4, 5");
}

/* ------------------------------ Skenario ------------------------------ */
{
  const S = SK.SKENARIO_K5B8A;
  cek(S.adegan.length >= 5 && S.adegan.length <= 8, `${S.id}: 5 sampai 8 adegan`);
  cek(S.adegan[0].jenis === "narasi" && S.adegan[S.adegan.length - 1].jenis === "akhir", `${S.id}: buka dan tutup`);
  cek(new Set(S.adegan.map((a) => a.jenis)).size >= 4, `${S.id}: paling sedikit empat jenis adegan`);
  const semuaTeks = [];
  for (const a of S.adegan) {
    semuaTeks.push(a.cerita);
    for (const o of a.opsi ?? []) semuaTeks.push(o.teks, o.umpan);
    for (const q of a.soal ?? []) semuaTeks.push(q.teks, ...q.opsi);
    for (const f of ["tanya", "sukses", "salah", "kurang", "lebih"]) if (a[f]) semuaTeks.push(a[f]);
  }
  cek(semuaTeks.every(tanpaAngka), `${S.id}: semua teks dapat dieja`);
  sama(S.id.replace(/-k5b8$/, ""), K8.ID_SKENARIO_K5B8.A, "id skenario sesuai id misi");
  const adegan = (id) => S.adegan.find((a) => a.id === id);
  const turus = adegan("turus");
  cek(turus.soal[0].jawaban === "mudah dihitung lima-lima", "turus: alasan kelompok lima");
  cek(turus.soal[1].jawaban === String(8 % 5) && turus.soal[1].teks.includes("8 kali") && Math.floor(8 / 5) === 1 && turus.soal[1].teks.includes("1 kelompok lima") && turus.soal[1].opsi.includes("2") && turus.soal[1].opsi.includes("4") && turus.sukses.includes("8 = 5 + 3"), "turus: delapan = satu kelompok lima dan 3 garis");
  cek(frekuensiMandiri(Array(8).fill(2))[2] === 8, "turus: delapan stroberi dihitung (Map)");
  const pembeli = adegan("pembeli");
  cek(pembeli.jumlah === 5 && pembeli.jumlah <= 12 && pembeli.sukses.includes("5 pembeli"), "pembeli: lima stik, satu kelompok lima");
  const kacang = adegan("kacang");
  cek(kacang.target === 2 && kacang.target <= kacang.maks && kacang.maks <= 20 && kacang.cerita.includes("2 kali") && kacang.sukses.includes("2"), "kacang: frekuensi 2");
  const tabel = adegan("tabel");
  const f = [7, 5, 3, 2];
  cek(tabel.cerita.includes("cokelat 7, keju 5, stroberi 3, kacang 2") && tabel.soal[0].jawaban === String(f.reduce((a, b) => a + b, 0)) && tabel.soal[0].jawaban === "17" && tabel.soal[0].opsi.includes("15") && tabel.sukses.includes("7 + 5 + 3 + 2 = 17"), "tabel: jumlah frekuensi 17, pengecoh 15");
  cek(tabel.soal[1].jawaban === ["cokelat", "keju", "stroberi", "kacang"][modeMandiri(f)[0]] && modeMandiri(f).length === 1, "tabel: mode cokelat (urutan menurun)");
  const putus = adegan("putus");
  const pb = putus.opsi.find((o) => o.benar);
  cek(/cokelat/.test(pb.teks) && /terbesar/.test(pb.teks) && putus.opsi.filter((o) => !o.benar).every((o) => !/cokelat/.test(o.teks)) && putus.opsi.some((o) => /menebak/.test(o.teks)), "putus: keputusan memilih cokelat, pengecoh salah termasuk menebak");
  const data = adegan("data");
  cek(/kumpulan fakta/.test(data.opsi.find((o) => o.benar).teks) && data.opsi.filter((o) => o.benar).length === 1, "data: arti data kumpulan fakta");
  const posisi = S.adegan.filter((a) => a.jenis === "pilih").map((a) => a.opsi.findIndex((o) => o.benar));
  cek(new Set(posisi).size === posisi.length, `letak jawaban pilih bervariasi (${posisi.join("")})`);
  for (const id of ["turus", "tabel"]) {
    const ps = adegan(id).soal.map((q) => q.opsi.indexOf(q.jawaban));
    cek(new Set(ps).size === ps.length && ps.every((p) => p >= 0), `letak jawaban soal ${id} bervariasi (${ps.join("")})`);
  }
  cek(S.adegan.filter((a) => a.jenis === "pilih").every((a) => a.opsi.length === 3 && a.opsi.filter((o) => o.benar).length === 1), "setiap pilih: tiga opsi, satu benar");
}

/* ------------------------------ Misi ------------------------------ */
{
  const huruf = ["A", "B"];
  sama(Object.keys(TK.MISI_K5B8), huruf, "teks misi untuk A dan B");
  sama(Object.keys(TK.NAMA_SIM_K5B8), huruf, "nama simulasi untuk A dan B");
  cek(TK.hurufK5B8("Z") === "A" && TK.hurufK5B8("A") === "A" && TK.hurufK5B8("B") === "B", "huruf tak dikenal jatuh ke A, B dikenal");
  cek(TK.misiAwalK5Bab8("A").startsWith("Simulasi 1. Misi: ") && tanpaAngka(TK.misiAwalK5Bab8("A")), "misi awal dan dapat dieja");
  for (const h of huruf) {
    const daftar = K8.daftarMisiK5Bab8(h);
    cek(daftar.filter((m) => m.wajib).length === 7 && daftar.filter((m) => !m.wajib).length === 3, `${h}: tujuh misi wajib dan tiga tantangan bebas`);
    cek(new Set(daftar.map((m) => m.id)).size === 10 && daftar.every((m) => m.id.startsWith(`${h.toLowerCase()}-`)), `${h}: id misi unik berawalan huruf`);
    const kosong = [{ alat: "data", pernah: [] }, { alat: "piktogram", pernah: [] }, sel("tidak-ada"), A.keadaanDataK5B8A(A.awalDataK5B8A()), B.keadaanPiktogramK5B8B(B.awalPiktogramK5B8B())];
    cek(kosong.every((k) => M0.misiBaru(daftar, k, new Set()).length === 0), `${h}: keadaan awal alat tidak memenuhi misi mana pun`);
    cek(daftar.every((m) => m.teks.length > 20 && tanpaAngka(m.teks)), `${h}: teks misi jelas dan dapat dieja`);
    const baru = (k) => M0.misiBaru(daftar, k, new Set());
    cek(baru(sel(K8.ID_MESIN_K5B8[h])).join() === `${h.toLowerCase()}-mesin` && baru(sel(K8.ID_SKENARIO_K5B8[h])).join() === `${h.toLowerCase()}-skenario`, `${h}: id mesin dan skenario memenuhi misinya`);
  }
  cek(M0.misiBaru(K8.MISI_A, { alat: "lain", pernah: ["lima:0", "turus:1", "tabel:1", "salah:1", "mode:1", "putus:1"] }, new Set()).length === 0, "A: riwayat alat lain tidak memenuhi misi A");

  const capai = (aksi) => M0.misiBaru(K8.MISI_A, A.keadaanDataK5B8A(jalan(A.awalDataK5B8A(), L, aksi)), new Set());
  const catatSemua = (i) => [{ t: "R_DATA", i }, ...A.DATA_TURUS[i].mentah.map((k) => ({ t: "R_CATAT", k }))];
  const isiTabel = (i, f = F_RENCANA[i]) => [{ t: "T_DATA", i }, ...f.flatMap((v, k) => Array.from({ length: v }, () => ({ t: "T_UBAH", k, delta: 1 }))), { t: "T_PERIKSA" }];
  const tunjuk = (i) => [...isiTabel(i), { t: "T_TUNJUK", k: SALAH_RENCANA[i][0] }];
  const mode = (i, putus = true) => {
    const m = modeMandiri(F_RENCANA[i]);
    return [{ t: "M_DATA", i }, m.length > 1 ? { t: "M_SERI" } : { t: "M_PILIH", k: m[0] }, ...(putus ? [{ t: "M_PUTUS", o: A.opsiPutus(i).benar }] : [])];
  };

  // Misi 1: kelompok lima pada data sayuran (data 0), bukan data lain.
  cek(capai(catatSemua(0)).join() === "a-lima,a-turus-semua".split(",")[0] || capai(catatSemua(0)).join() === "a-lima", "A: mencatat data 0 sampai habis memenuhi a-lima saja");
  cek(capai(catatSemua(1)).join() === "a-turus", "A: mencatat data donat memenuhi a-turus (data 1: f terbesar 6 juga mencapai lima, tetapi a-lima khusus data 0)");
  cek(capai(catatSemua(2)).length === 0 && capai(catatSemua(3)).length === 0, "A: mencatat data lain tidak memenuhi misi wajib");
  cek(capai(catatSemua(0).slice(0, -1)).join() === "a-lima", "A: kelompok lima cukup tanpa menyelesaikan turus");
  cek(capai(catatSemua(1).slice(0, -1)).length === 0, "A: donat belum habis dicatat belum memenuhi");
  cek(capai(catatSemua(0).slice(0, 4)).length === 0, "A: baru empat jawaban pertama belum mencapai lima");
  // Misi 3 dan 4.
  cek(capai(isiTabel(1)).join() === "a-tabel", "A: tabel donat benar memenuhi a-tabel");
  cek(capai(isiTabel(0)).length === 0 && capai(isiTabel(2)).length === 0, "A: tabel data lain tidak memenuhi");
  cek(capai(isiTabel(1, [6, 4, 3, 3])).length === 0 && capai(isiTabel(1, [4, 6, 3, 2])).length === 0, "A: tabel donat salah tidak memenuhi");
  cek(capai(tunjuk(1)).join() === "a-tabel,a-salah", "A: kategori salah rekap donat memenuhi a-salah");
  cek(capai([...isiTabel(1), { t: "T_TUNJUK", k: 1 }]).join() === "a-tabel", "A: menunjuk kategori yang benar sebagai salah tidak memenuhi a-salah");
  cek(capai([{ t: "T_DATA", i: 1 }, { t: "T_TUNJUK", k: 0 }]).length === 0, "A: menunjuk sebelum tabel benar tidak memenuhi");
  cek(capai(tunjuk(3)).join() === "", "A: rekap salah data lain tidak memenuhi a-salah (hanya donat)");
  // Misi 5.
  cek(capai(mode(1)).join() === "a-mode", "A: mode dan keputusan donat memenuhi a-mode");
  cek(capai(mode(1, false)).length === 0 && capai(mode(0)).length === 0, "A: mode tanpa keputusan atau data lain tidak memenuhi");
  cek(capai([{ t: "M_DATA", i: 1 }, { t: "M_PILIH", k: 0 }, { t: "M_PUTUS", o: (A.opsiPutus(1).benar + 1) % 3 }]).length === 0, "A: keputusan salah tidak memenuhi");
  // Tantangan.
  cek(capai([0, 1, 2, 3, 4, 5].flatMap((i) => catatSemua(i))).join() === "a-lima,a-turus,a-turus-semua", "A: keenam data dicatat memenuhi a-lima, a-turus, dan tantangan");
  cek(capai([0, 1, 2, 3, 4].flatMap((i) => catatSemua(i))).join() === "a-lima,a-turus", "A: lima data belum memenuhi tantangan turus");
  cek(capai([0, 1, 2, 3, 4, 5].flatMap((i) => isiTabel(i))).join() === "a-tabel,a-tabel-semua", "A: keenam tabel memenuhi a-tabel dan tantangan");
  cek(capai([0, 1, 2, 3, 4].flatMap((i) => isiTabel(i))).join() === "a-tabel", "A: lima tabel belum memenuhi tantangan");
  cek(capai([0, 1, 2, 3, 4, 5].flatMap((i) => mode(i))).join() === "a-mode,a-mode-semua", "A: keenam mode dan keputusan memenuhi tantangan (termasuk data seri)");
  cek(capai([0, 1, 2, 3, 4, 5].flatMap((i) => mode(i, i !== 5))).join() === "a-mode", "A: satu keputusan kurang belum memenuhi tantangan mode");
  cek(capai([...catatSemua(2), ...isiTabel(0), ...mode(3)]).length === 0, "A: riwayat tiga tampilan terpisah pada data lain, tidak ada misi yang terpenuhi");

  // Gerbang.
  for (const h of huruf) {
    const daftar = M0.tampilMisi(K8.daftarMisiK5Bab8(h));
    const wajibIds = daftar.filter((m) => m.wajib).map((m) => m.id);
    cek(!M0.wajibSelesai(daftar, new Set(wajibIds.slice(0, 6))), `${h}: enam dari tujuh wajib belum membuka gerbang`);
    cek(M0.wajibSelesai(daftar, new Set(wajibIds)), `${h}: tujuh wajib membuka gerbang`);
    cek(M0.bolehLanjut({ adaMisi: true, wajibSelesai: false, dilewati: true, disentuh: true }) && !M0.bolehLanjut({ adaMisi: true, wajibSelesai: false, dilewati: true, disentuh: false }), "lewati hanya setelah disentuh");
  }
}

/* ------------------------------ Konsep tidak bocor ke Sub-Bab A ------------------------------ */
{
  const baca = (nama, ekstensi) => readFileSync(new URL(`../src/components/modul/${nama}.${ekstensi}`, import.meta.url), "utf8");
  const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas5-bab8-ringkas.json", import.meta.url), "utf8"));
  const tanpaKomentar = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
  const teksDari = (o) => {
    const hasil = [];
    JSON.stringify(o, (k, v) => {
      if (typeof v === "string") hasil.push(v);
      return v;
    });
    return hasil.join(" | ");
  };
  // Sub-Bab A hanya membahas turus, frekuensi, tabel, mode. Piktogram dan diagram batang milik Sub-Bab B dan C.
  const BOCOR_A = /(piktogram|pictograph|kunci|legenda|legend|simbol|diagram|batang|sumbu|skala|\baxis\b|grafik|bar chart|setengah gambar)/i;
  const catat = (teks, apa) => {
    const m = BOCOR_A.exec(teks);
    cek(!m, `A: ${apa} bebas konsep piktogram dan diagram (${m ? m[0] : ""} di "${String(teks).slice(Math.max(0, (m?.index ?? 0) - 30), (m?.index ?? 0) + 40)}")`);
  };
  for (const t of [TK.MISI_K5B8.A, TK.NAMA_SIM_K5B8.A, ...K8.MISI_A.map((m) => m.teks)]) catat(t, "teks misi");
  for (const [nama, o] of [["mesin", MS.MESIN_DATA], ["skenario", SK.SKENARIO_K5B8A], ["peta dan infografis ringkas", ringkas.subBab.A]]) catat(teksDari(o), nama);
  for (const [f, e] of [["SimulasiLabDataK5B8", "tsx"], ["model-data-k5b8", "tsx"], ["lab-data-k5b8a", "ts"]]) catat(tanpaKomentar(baca(f, e)), `${f} (tanpa komentar)`);
  for (const p of globalThis.__pesanA) catat(p, "pesan lab dari fuzz");
  for (const u of [A.ucapTurusK5B8A(x0), A.ucapTabelK5B8A(x0), A.ucapModeK5B8A(x0)]) catat(u, "ucapan lab");

  // Kunci tidak bocor ke klien, tanpa jaringan.
  for (const f of ["SimulasiLabDataK5B8", "SimulasiK5Bab8", "model-data-k5b8"]) {
    const s = baca(f, "tsx");
    cek(!/correct_index|explanation/.test(s), `${f}: tidak memuat correct_index atau explanation`);
    cek(!/fetch\(|XMLHttpRequest|api\/|openai|anthropic|gemini/i.test(s), `${f}: tanpa jaringan atau model bahasa`);
  }
  for (const f of ["lab-data-k5b8a", "lab-piktogram-k5b8b", "mesin-data-k5b8", "skenario-k5b8", "misi-k5bab8", "misi-teks-k5b8", "eja-k5b8"]) {
    const s = baca(f, "ts");
    cek(!/fetch\(|XMLHttpRequest|from "react"|openai|anthropic|gemini|correct_index|explanation/i.test(s), `${f}: murni`);
    const impor = s.match(/^import .+$/gm) ?? [];
    cek(impor.every((l) => l.startsWith("import type")), `${f}: hanya mengimpor tipe`);
  }
  cek((baca("lab-data-k5b8a", "ts").match(/^import /gm) ?? []).length === 0 && (baca("eja-k5b8", "ts").match(/^import /gm) ?? []).length === 0, "lab dan pengeja tanpa impor sama sekali");
  {
    const s = baca("SimulasiLabDataK5B8", "tsx");
    cek(/useEffect\(\(\) => \{\s*onKeadaan\?\.\(keadaan\w+\(x\)\);\s*\}, \[onKeadaan, x\]\);/.test(s), "lab: lapor keadaan lewat useEffect");
    cek(/setLihat\(v\);\s*kirim\(\{ t: "PESAN_KOSONG" \}\);/.test(s), "lab: ganti tampilan mengosongkan pesan");
    const catatan = [...s.matchAll(/^\s*"([^"]+)",$/gm)].map((m) => m[1]);
    cek(catatan.length >= 3 && catatan.every(tanpaAngka), "lab: Coba ini dapat dieja");
    for (const lab of ["Periksa tabel", "Pilih ada yang sama tinggi"]) cek(s.includes(`aria-label="${lab}"`), `lab: tombol berlabel ${lab}`);
    for (const awalan of ["Catat ", "Kurangi frekuensi ", "Tambah frekuensi ", "Tunjuk ", "Pilih mode ", "Keputusan "]) cek(s.includes(`aria-label={\`${awalan}`), `lab: tombol berlabel ${awalan.trim()}`);
    for (const awalan of ["Pilih data ", "Pilih tabel ", "Pilih mode "]) cek(s.includes(`label={\`${awalan}`), `lab: pilihan data berlabel ${awalan.trim()}`);
    cek(/tabelBenar \? \(/.test(s) && /modeBenar \? \(/.test(s), "lab: rekap salah dan keputusan hanya tampil setelah tahap sebelumnya benar");
    const m = baca("model-data-k5b8", "tsx");
    cek(/role="img"/.test(m) && /aria-label=\{`Turus /.test(m), "model: gambar turus berlabel");
  }
  const pembungkus = baca("SimulasiK5Bab8", "tsx");
  cek(/eja=\{ejaK5B8\}/.test(pembungkus), "pembungkus: mesin dieja ejaK5B8");
  const coba = [...pembungkus.matchAll(/"([^"]*\?)"/g)].map((m) => m[1]);
  cek(coba.length >= 3 && coba.every(tanpaAngka), "Coba ini mesin dapat dieja");
  const ucapan = [];
  for (let i = 0; i < 6; i += 1) {
    ucapan.push(A.ucapTurusK5B8A(L(x0, { t: "R_DATA", i })), A.ucapTabelK5B8A(L(x0, { t: "T_DATA", i })), A.ucapModeK5B8A(L(x0, { t: "M_DATA", i })));
    ucapan.push(A.ucapTurusK5B8A(jalan(x0, L, [{ t: "R_DATA", i }, ...A.DATA_TURUS[i].mentah.map((k) => ({ t: "R_CATAT", k }))])));
  }
  cek(ucapan.length === 24 && ucapan.every(tanpaAngka), `semua ${ucapan.length} ucapan lab dieja menjadi kata`);
}

/* ------------------------------ Emoji paling tinggi Emoji 12 ------------------------------ */
{
  const berkas = ["SimulasiLabDataK5B8.tsx", "SimulasiLabPiktogramK5B8.tsx", "SimulasiK5Bab8.tsx", "model-data-k5b8.tsx", "model-piktogram-k5b8.tsx", "lab-data-k5b8a.ts", "lab-piktogram-k5b8b.ts", "mesin-data-k5b8.ts", "skenario-k5b8.ts", "misi-k5bab8.ts", "misi-teks-k5b8.ts", "eja-k5b8.ts"];
  let ok = true;
  for (const f of berkas) {
    const s = readFileSync(new URL(`../src/components/modul/${f}`, import.meta.url), "utf8");
    cek(s.charCodeAt(0) !== 0xfeff && !s.includes("\r"), `${f}: UTF-8 tanpa BOM dan akhir baris LF`);
    for (const c of s) if (c.codePointAt(0) > 0x1fa95) ok = false;
  }
  const r = readFileSync(new URL("../src/data/kelas5-bab8-ringkas.json", import.meta.url), "utf8");
  for (const c of r) if (c.codePointAt(0) > 0x1fa95) ok = false;
  cek(ok, "emoji paling tinggi Emoji 12 (tidak ada titik kode di atas U+1FA95)");
}

/* ------------------------------ Data ringkas ------------------------------ */
{
  const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas5-bab8-ringkas.json", import.meta.url), "utf8"));
  cek(ringkas.chapter_id === "mtk-5-bab8" && ringkas.phase_code === "FASE_C" && ringkas.grade === 5, "ringkas: id bab, fase, kelas");
  const A0 = ringkas.subBab.A;
  const butir = (panel, id) => panel.butir.find((b) => b.id === id);
  const [p1, p2, p3] = A0.infografis.panel;
  cek(A0.infografis.panel.length === 3, "ringkas A: tiga panel");
  cek(p1.butir.length >= 2 && p2.sisi.length >= 2 && p3.butir.length >= 2, "ringkas A: tiap panel punya isi");
  sama(A0.peta.cabang.map((c) => c.id), ["kumpul", "turus", "frekuensi", "keputusan"], "ringkas A: empat cabang");
  const kartu = (id) => A0.peta.kartu.find((k) => k.id === id);
  cek(A0.peta.kartu.length === 8 && A0.peta.kartu.every((k) => A0.peta.cabang.some((c) => c.id === k.cabang)), "ringkas A: delapan kartu, tiap kartu menunjuk cabang yang ada");
  cek(A0.peta.cabang.every((c) => A0.peta.kartu.filter((k) => k.cabang === c.id).length >= 2), "ringkas A: tiap cabang punya dua kartu atau lebih");
  cek(A0.peta.kartu.every((k) => A0.peta.cabang.filter((c) => c.id === k.cabang).length === 1), "ringkas A: tiap kartu tepat satu cabang");
  // Isi hitungan di ringkas diuji ulang secara mandiri.
  const semuaTeks = JSON.stringify(A0);
  cek(semuaTeks.includes("4 garis tegak") || semuaTeks.includes("empat garis tegak"), "ringkas A: menyebut empat garis tegak");
  const tabel = p3.butir.map((b) => b.visual).find((v) => v.jenis === "tabel-menurun");
  if (tabel) {
    const d1 = A.DATA_TURUS[1];
    sama(tabel.baris, d1.kategori.map((n, k) => [n, frekuensiMandiri(d1.mentah)[k]]), "ringkas A: tabel frekuensi donat dihitung mandiri dari jawaban mentah");
  }
  const ide = [p1.ide, p2.ide, p3.ide];
  cek(ide.every((t) => t.split(/\s+/).length <= 8), "ringkas A: ide paling banyak delapan kata");
  cek(JSON.stringify(ringkas).indexOf("\r") < 0 && Object.keys(ringkas.subBab).join() === "A,B", "ringkas: Sub-Bab A dan B pada gelombang ini");
}


/* ====================================================================== */
/* Sub-Bab B: Lab Piktogram                                                */
/* ====================================================================== */

/* ------------------------------ Hitungan MANDIRI B ------------------------------ */
// Kode memakai sisa pembagian. Di sini piktogram dihitung dalam satuan setengah simbol: 2f/k harus bilangan bulat.
const setengahSatuan = (f, k) => (2 * f) / k;
const gambarMandiri = (f, k) => Math.ceil(setengahSatuan(f, k) / 2);
const bisaBarisMandiri = (f, k) => Number.isInteger(setengahSatuan(f, k));
const kunciBisaMandiri = (fs, k) => fs.every((v) => bisaBarisMandiri(v, k)) && fs.every((v) => gambarMandiri(v, k) <= 8);
const adaSetengahMandiri = (fs, k) => kunciBisaMandiri(fs, k) && fs.some((v) => setengahSatuan(v, k) % 2 === 1);
const F_PIK = [[8, 12, 4, 16], [6, 10, 4, 8], [15, 25, 10, 20], [12, 18, 6, 24], [20, 30, 10, 40], [5, 10, 15, 20]];
const NAMA_PIK = ["kue apem Anggi", "panen tomat", "pengunjung perpustakaan", "siswa membawa bekal", "buku dipinjam", "sepeda terjual"];
const KUNCI_BACA = [4, 4, 10, 4, 20, 10];
const TARGET_BACA = [3, 0, 0, 1, 1, 2];
const CACAT_JENIS = ["jumlah", "ukuran", "kunci", "jumlah", "ukuran", "kunci"];
const CACAT_K = [1, 2, -1, 0, 3, -1];
const KUNCI_LIST = [2, 4, 5, 10, 20];
const LB = B.langkahPiktogramK5B8B;
const y0 = B.awalPiktogramK5B8B();

/* ------------------------------ Data B sama dengan rencana ------------------------------ */
{
  cek(B.DATA_PIK.length === 6 && B.MAKS_SIMBOL === 8, "B: enam data, paling banyak delapan simbol per baris");
  sama(B.DATA_PIK.map((d) => d.nama), NAMA_PIK, "B: nama enam data");
  sama(B.DATA_PIK.map((d) => d.f), F_PIK, "B: frekuensi enam data");
  sama(B.DATA_PIK.map((d) => d.kunciBaca), KUNCI_BACA, "B: kunci baca");
  sama(B.DATA_PIK.map((d) => d.targetBaca), TARGET_BACA, "B: target baca");
  sama(B.DATA_PIK.map((d) => d.cacat.jenis), CACAT_JENIS, "B: jenis cacat bergantian jumlah, ukuran, kunci");
  sama(B.DATA_PIK.map((d) => d.cacat.k), CACAT_K, "B: baris cacat");
  sama(B.KUNCI_PILIHAN, KUNCI_LIST, "B: kunci yang bisa dipilih");
  for (const [i, d] of B.DATA_PIK.entries()) {
    cek(d.kategori.length === 4 && new Set(d.kategori).size === 4 && d.f.every((v) => Number.isInteger(v) && v > 0), `B data ${i}: empat kategori berbeda, frekuensi bulat positif`);
    cek(kunciBisaMandiri(d.f, d.kunciBaca), `B data ${i}: kunci baca bisa dipakai (satuan setengah simbol)`);
    cek(adaSetengahMandiri(d.f, d.kunciBaca) === (i !== 0), `B data ${i}: setengah simbol pada kunci baca ada kecuali data pertama (satuan setengah simbol)`);
    const f = d.f[d.targetBaca];
    cek((setengahSatuan(f, d.kunciBaca) % 2 === 1) === (i !== 0), `B data ${i}: baris target punya setengah simbol kecuali data pertama`);
    cek(B.nilaiBaca(B.penuhBaris(f, d.kunciBaca), B.sisaBaris(f, d.kunciBaca) > 0, d.kunciBaca) === f, `B data ${i}: nilaiBaca mengembalikan frekuensi target`);
    for (const k of KUNCI_LIST) {
      cek(B.kunciBisa(d, k) === kunciBisaMandiri(d.f, k), `B data ${i} kunci ${k}: bisa sama dengan hitungan mandiri`);
      cek(B.kunciAdaSetengah(d, k) === adaSetengahMandiri(d.f, k), `B data ${i} kunci ${k}: ada setengah sama dengan hitungan mandiri`);
      cek((B.alasanTolak(d, k) === null) === kunciBisaMandiri(d.f, k), `B data ${i} kunci ${k}: alasan tolak null hanya bila bisa`);
      for (const v of d.f) {
        cek(B.barisBisa(v, k) === bisaBarisMandiri(v, k) && B.gambarBaris(v, k) === gambarMandiri(v, k), `B baris ${v}/${k}: bisa dan banyak gambar sama dengan hitungan mandiri`);
      }
    }
    // Cacat: kunci cocok unik dari simbol yang tergambar.
    const kons = KUNCI_LIST.filter((q) => d.f.every((v) => Math.abs((setengahSatuan(v, d.kunciBaca) / 2) * q - v) < 1e-9));
    sama(kons, [d.kunciBaca], `B data ${i}: hanya kunci baca yang cocok dengan simbol yang tergambar`);
    const p = B.opsiKunciPeriksa(i);
    cek(p.opsi.length === 3 && new Set(p.opsi).size === 3 && p.opsi[p.benar] === d.kunciBaca && p.opsi.every((q) => KUNCI_LIST.includes(q)), `B data ${i}: tiga pilihan kunci perbaikan unik, satu benar`);
    cek(p.opsi.filter((q) => d.f.every((v) => Math.abs((setengahSatuan(v, d.kunciBaca) / 2) * q - v) < 1e-9)).length === 1, `B data ${i}: hanya satu pilihan kunci perbaikan yang cocok`);
    for (let k = 0; k < 4; k += 1) {
      const harus = gambarMandiri(d.f[k], d.kunciBaca) + (d.cacat.jenis === "jumlah" && d.cacat.k === k ? 1 : 0);
      cek(B.gambarPeriksa(d, k) === harus, `B data ${i}/${k}: gambar periksa ${harus}`);
    }
    // Pilihan baca: nilai benar, banyak gambar, dan satu kunci lebih.
    const pb = B.opsiBaca(i);
    const kb = d.kunciBaca;
    sama([...pb.opsi].sort((u, v) => u - v), [f, gambarMandiri(f, kb), (Math.floor(f / kb) + 1) * kb].sort((u, v) => u - v), `B data ${i}: pilihan baca adalah nilai, banyak gambar, dan satu kunci lebih`);
    cek(new Set(pb.opsi).size === 3 && pb.opsi[pb.benar] === f, `B data ${i}: tiga pilihan baca unik, satu benar`);
  }
  cek(new Set([0, 1, 2, 3, 4, 5].map((i) => B.opsiBaca(i).benar)).size === 3 && new Set([0, 1, 2, 3, 4, 5].map((i) => B.opsiKunciPeriksa(i).benar)).size === 3, "B: letak kunci pilihan baca dan perbaikan bervariasi");
  cek(B.kunciBisa(B.DATA_PIK[0], 4) && B.kunciBisa(B.DATA_PIK[0], 2) && !B.kunciBisa(B.DATA_PIK[0], 5) && !B.kunciBisa(B.DATA_PIK[0], 10) && B.kunciAdaSetengah(B.DATA_PIK[1], 4) && !B.kunciAdaSetengah(B.DATA_PIK[1], 2), "B: kunci 4 dan 2 bisa untuk apem, 5 dan 10 tidak; tomat kunci 4 ada setengah simbol, kunci 2 tidak");
  sama(B.alasanTolak(B.DATA_PIK[3], 2), { tipe: "banyak", baris: 1 }, "B: bekal kunci 2 terlalu banyak simbol (18 butuh 9)");
  sama(B.alasanTolak(B.DATA_PIK[0], 5), { tipe: "sisa", baris: 0 }, "B: apem kunci 5 bersisa pada baris pertama");
}

/* ------------------------------ Lab B: Piktogram ------------------------------ */
{
  sama(B.keadaanPiktogramK5B8B(y0), { alat: "piktogram", pernah: [] }, "B keadaan awal");
  cek(y0.kunci.pilih === null && y0.baca.data === 0 && y0.periksa.ditemukan === false && y0.pernah.length === 0 && y0.pesan === "", "B awal: kosong");

  // Kunci.
  {
    const sebelum = LB(LB(y0, { t: "K_DATA", i: 1 }), { t: "K_JAWAB", jawab: "bisa" });
    cek(sebelum.pernah.length === 0 && sebelum.pesan.includes("Pilih dulu kuncinya"), "B Kunci: memutuskan sebelum memilih kunci ditolak");
    for (const [i, fs] of F_PIK.entries()) {
      for (const k of KUNCI_LIST) {
        const siap = jalan(y0, LB, [{ t: "K_DATA", i }, { t: "K_PILIH", k }]);
        const bisa = kunciBisaMandiri(fs, k);
        const benar = LB(siap, { t: "K_JAWAB", jawab: bisa ? "bisa" : "tidak" });
        const salah = LB(siap, { t: "K_JAWAB", jawab: bisa ? "tidak" : "bisa" });
        sama(benar.pernah, [bisa ? B.idKunci(i, k) : B.idTolak(i, k)], `B Kunci ${i}/${k}: jawaban benar dicatat dengan id yang tepat`);
        cek(salah.pernah.length === 0 && salah.pesan.length > 10 && !salah.pesan.startsWith("✅"), `B Kunci ${i}/${k}: jawaban salah tidak dicatat, ada petunjuk`);
        cek(benar.pesan.startsWith("✅") && benar.pesan.includes(`Satu simbol = ${k}`), `B Kunci ${i}/${k}: pesan benar menyebut kunci`);
        if (bisa) cek(adaSetengahMandiri(fs, k) ? benar.pesan.includes("setengah simbol") && benar.pesan.includes("Sisa tepat setengah kunci") : benar.pesan.includes("tidak ada sisa"), `B Kunci ${i}/${k}: pesan setengah simbol sesuai`);
        else {
          const j = fs.findIndex((v) => !bisaBarisMandiri(v, k));
          if (j >= 0) cek(benar.pesan.includes(`${fs[j]} dibagi ${k} bersisa ${fs[j] - k * Math.floor(fs[j] / k)}`), `B Kunci ${i}/${k}: pesan menyebut sisa pembagian`);
          else cek(benar.pesan.includes("terlalu banyak"), `B Kunci ${i}/${k}: pesan terlalu banyak simbol`);
        }
        cek(LB(siap, { t: "K_JAWAB", jawab: "mungkin" }) === siap, `B Kunci ${i}/${k}: jawaban tak dikenal diabaikan`);
      }
    }
    cek(LB(y0, { t: "K_PILIH", k: 3 }) === y0 && LB(y0, { t: "K_PILIH", k: 0 }) === y0 && LB(y0, { t: "K_PILIH", k: -1 }) === y0 && LB(y0, { t: "K_PILIH", k: 2.5 }) === y0 && LB(y0, { t: "K_DATA", i: 6 }) === y0 && LB(y0, { t: "K_DATA", i: -1 }) === y0 && LB(y0, { t: "K_DATA", i: 0.5 }) === y0, "B Kunci: kunci dan data di luar batas atau pecahan diabaikan");
    const ganti = jalan(y0, LB, [{ t: "K_PILIH", k: 4 }, { t: "K_DATA", i: 2 }]);
    cek(ganti.kunci.pilih === null && ganti.kunci.data === 2, "B Kunci: ganti data mengosongkan kunci terpilih");
    // Id kunci tidak tertukar antar data: kunci 5 pada apem ditolak, pada bekal juga ditolak tetapi dengan id data sendiri.
    sama(jalan(y0, LB, [{ t: "K_DATA", i: 0 }, { t: "K_PILIH", k: 5 }, { t: "K_JAWAB", jawab: "tidak" }]).pernah, ["tolak:0:5"], "B Kunci: id tolak apem kunci 5");
    sama(jalan(y0, LB, [{ t: "K_DATA", i: 1 }, { t: "K_PILIH", k: 4 }, { t: "K_JAWAB", jawab: "bisa" }]).pernah, ["kunci:1:4"], "B Kunci: id kunci tomat kunci 4");
  }

  // Baca.
  {
    for (const [i, fs] of F_PIK.entries()) {
      const s0 = LB(y0, { t: "B_DATA", i });
      const p = B.opsiBaca(i);
      const f = fs[TARGET_BACA[i]];
      for (let o = 0; o < 3; o += 1) {
        const s = LB(s0, { t: "B_JAWAB", o });
        const benar = p.opsi[o] === f;
        cek(s.pernah.includes(B.idBaca(i)) === benar && (benar ? s.pesan.startsWith("✅") && s.pesan.includes(`= ${f}`) : !s.pesan.startsWith("✅") && s.pesan.length > 10), `B Baca ${i}/${o}: ${benar ? "benar" : "salah"} (nilai ${p.opsi[o]})`);
      }
      const kb = KUNCI_BACA[i];
      const bs = LB(s0, { t: "B_JAWAB", o: p.benar });
      cek(setengahSatuan(f, kb) % 2 === 1 ? bs.pesan.includes(`+ ${kb / 2}`) : !bs.pesan.includes("+"), `B Baca ${i}: pesan memuat tambahan setengah kunci hanya bila ada setengah simbol`);
    }
    cek(LB(y0, { t: "B_JAWAB", o: 3 }) === y0 && LB(y0, { t: "B_JAWAB", o: -1 }) === y0 && LB(y0, { t: "B_JAWAB", o: 0.5 }) === y0 && LB(y0, { t: "B_DATA", i: 6 }) === y0, "B Baca: indeks di luar batas atau pecahan diabaikan");
  }

  // Periksa.
  {
    for (const [i, jenis] of CACAT_JENIS.entries()) {
      const s0 = LB(y0, { t: "P_DATA", i });
      for (const j of ["jumlah", "ukuran", "kunci"]) {
        const s = LB(s0, { t: "P_JENIS", jenis: j });
        cek(s.pernah.includes(B.idCacat(i)) === (j === jenis) && s.periksa.ditemukan === (j === jenis), `B Periksa ${i}: jenis ${j} ${j === jenis ? "benar" : "salah"}`);
      }
      cek(LB(s0, { t: "P_JENIS", jenis: "warna" }) === s0, `B Periksa ${i}: jenis tak dikenal diabaikan`);
      // Sebelum jenis ditemukan, perbaikan ditolak.
      for (let k = 0; k < 4; k += 1) cek(LB(s0, { t: "P_TUNJUK", k }).pernah.length === 0 && LB(s0, { t: "P_TUNJUK", k }).pesan.includes("Tentukan dulu"), `B Periksa ${i}/${k}: tunjuk sebelum jenis ditolak`);
      for (let o = 0; o < 3; o += 1) cek(LB(s0, { t: "P_KUNCI", o }).pernah.length === 0 && LB(s0, { t: "P_KUNCI", o }).pesan.includes("Tentukan dulu"), `B Periksa ${i}/${o}: pilih kunci sebelum jenis ditolak`);
      const s1 = LB(s0, { t: "P_JENIS", jenis });
      if (jenis === "kunci") {
        const p = B.opsiKunciPeriksa(i);
        for (let o = 0; o < 3; o += 1) {
          const s = LB(s1, { t: "P_KUNCI", o });
          cek(s.pernah.includes(B.idPerbaiki(i)) === (p.opsi[o] === KUNCI_BACA[i]), `B Periksa ${i}: kunci ${p.opsi[o]} ${p.opsi[o] === KUNCI_BACA[i] ? "benar" : "salah"}`);
        }
        for (let k = 0; k < 4; k += 1) cek(!LB(s1, { t: "P_TUNJUK", k }).pernah.includes(B.idPerbaiki(i)), `B Periksa ${i}/${k}: menunjuk baris pada cacat kunci tidak memperbaiki`);
      } else {
        for (let k = 0; k < 4; k += 1) {
          const s = LB(s1, { t: "P_TUNJUK", k });
          cek(s.pernah.includes(B.idPerbaiki(i)) === (k === CACAT_K[i]), `B Periksa ${i}/${k}: baris ${k === CACAT_K[i] ? "cacat" : "benar"}`);
        }
        for (let o = 0; o < 3; o += 1) cek(!LB(s1, { t: "P_KUNCI", o }).pernah.includes(B.idPerbaiki(i)), `B Periksa ${i}/${o}: memilih kunci pada cacat baris tidak memperbaiki`);
        const bn = LB(s1, { t: "P_TUNJUK", k: CACAT_K[i] });
        const n = gambarMandiri(F_PIK[i][CACAT_K[i]], KUNCI_BACA[i]);
        cek(jenis === "jumlah" ? bn.pesan.includes(`= ${n} simbol, bukan ${n + 1}`) : bn.pesan.includes("terlalu besar"), `B Periksa ${i}: pesan perbaikan sesuai`);
      }
      // Ganti data menutup tahap perbaikan.
      cek(LB(s1, { t: "P_DATA", i: (i + 1) % 6 }).periksa.ditemukan === false, `B Periksa ${i}: ganti data mengosongkan penemuan`);
    }
    cek(LB(y0, { t: "P_TUNJUK", k: 4 }) === y0 && LB(y0, { t: "P_TUNJUK", k: -1 }) === y0 && LB(y0, { t: "P_KUNCI", o: 3 }) === y0 && LB(y0, { t: "P_DATA", i: 6 }) === y0 && LB(y0, { t: "P_TUNJUK", k: 1.5 }) === y0, "B Periksa: indeks di luar batas atau pecahan diabaikan");
  }

  // Reset dan pesan kosong.
  {
    const s = jalan(y0, LB, [{ t: "K_PILIH", k: 4 }, { t: "B_DATA", i: 2 }, { t: "P_DATA", i: 3 }, { t: "P_JENIS", jenis: "jumlah" }]);
    cek(LB(s, { t: "PESAN_KOSONG" }).pesan === "" && LB(s, { t: "PESAN_KOSONG" }).kunci.pilih === 4, "B PESAN_KOSONG hanya mengosongkan pesan");
    sama(LB(s, { t: "RESET" }), y0, "B RESET kembali ke awal");
  }

  // Fuzz 20.000 aksi.
  {
    const acak = acakDari(7707);
    const pesanSemua = new Set();
    const riwayatSemua = new Set();
    let ok = true;
    let s = y0;
    const JENIS = ["jumlah", "ukuran", "kunci", "warna"];
    const buat = () => {
      const r = acak(20);
      if (r === 0) return { t: "K_DATA", i: acak(8) - 1 };
      if (r === 1 || r === 2) return { t: "K_PILIH", k: [2, 4, 5, 10, 20, 3, 0][acak(7)] };
      if (r === 3 || r === 4) return { t: "K_JAWAB", jawab: ["bisa", "tidak", "mungkin"][acak(3)] };
      if (r === 5) return { t: "B_DATA", i: acak(8) - 1 };
      if (r === 6 || r === 7) return { t: "B_JAWAB", o: acak(5) - 1 };
      if (r === 8) return { t: "B_JAWAB", o: B.opsiBaca(s.baca.data).benar };
      if (r === 9) return { t: "P_DATA", i: acak(8) - 1 };
      if (r === 10 || r === 11) return { t: "P_JENIS", jenis: JENIS[acak(4)] };
      if (r === 12) return { t: "P_JENIS", jenis: B.DATA_PIK[s.periksa.data].cacat.jenis };
      if (r === 13 || r === 14) return { t: "P_TUNJUK", k: acak(6) - 1 };
      if (r === 15) return { t: "P_TUNJUK", k: B.DATA_PIK[s.periksa.data].cacat.k };
      if (r === 16) return { t: "P_KUNCI", o: acak(5) - 1 };
      if (r === 17) return { t: "P_KUNCI", o: B.opsiKunciPeriksa(s.periksa.data).benar };
      if (r === 18 && acak(60) === 0) return { t: "RESET" };
      if (r === 18) return { t: "PESAN_KOSONG" };
      return { t: "K_JAWAB", jawab: kunciBisaMandiri(F_PIK[s.kunci.data], s.kunci.pilih ?? 4) ? "bisa" : "tidak" };
    };
    for (let n = 0; n < 20000; n += 1) {
      const a = buat();
      const sebelum = s;
      s = LB(s, a);
      pesanSemua.add(s.pesan);
      const batas =
        [s.kunci.data, s.baca.data, s.periksa.data].every((v) => v >= 0 && v < 6) &&
        (s.kunci.pilih === null || KUNCI_LIST.includes(s.kunci.pilih)) &&
        typeof s.periksa.ditemukan === "boolean" && new Set(s.pernah).size === s.pernah.length;
      if (!batas) ok = false;
      if (a.t === "RESET") {
        if (s.pernah.length !== 0) ok = false;
        continue;
      }
      if (!sebelum.pernah.every((p) => s.pernah.includes(p))) ok = false;
      const baru = s.pernah.filter((p) => !sebelum.pernah.includes(p));
      if (baru.length > 1) ok = false;
      for (const b of baru) {
        const bagian = b.split(":");
        const alat = bagian[0];
        const i = Number(bagian[1]);
        riwayatSemua.add(alat);
        if (alat === "kunci" || alat === "tolak") {
          const k = Number(bagian[2]);
          const bisa = kunciBisaMandiri(F_PIK[i], k);
          if (!(a.t === "K_JAWAB" && sebelum.kunci.data === i && sebelum.kunci.pilih === k && (alat === "kunci") === bisa && a.jawab === (bisa ? "bisa" : "tidak"))) ok = false;
        } else if (alat === "baca") {
          const p = B.opsiBaca(i);
          if (!(a.t === "B_JAWAB" && sebelum.baca.data === i && p.opsi[a.o] === F_PIK[i][TARGET_BACA[i]])) ok = false;
        } else if (alat === "cacat") {
          if (!(a.t === "P_JENIS" && sebelum.periksa.data === i && a.jenis === CACAT_JENIS[i])) ok = false;
        } else if (alat === "perbaiki") {
          const benarTunjuk = a.t === "P_TUNJUK" && CACAT_JENIS[i] !== "kunci" && a.k === CACAT_K[i];
          const benarKunci = a.t === "P_KUNCI" && CACAT_JENIS[i] === "kunci" && B.opsiKunciPeriksa(i).opsi[a.o] === KUNCI_BACA[i];
          if (!((benarTunjuk || benarKunci) && sebelum.periksa.data === i && sebelum.periksa.ditemukan)) ok = false;
        } else ok = false;
      }
    }
    cek(ok, "fuzz 20.000 aksi Lab Piktogram: batas terjaga, riwayat tidak dicabut dan hanya bila tercapai (orakel mandiri)");
    cek(pesanSemua.size > 40 && [...pesanSemua].every(tanpaAngka), `fuzz Lab Piktogram: semua ${pesanSemua.size} pesan dieja menjadi kata`);
    cek(riwayatSemua.size === 5, `fuzz Lab Piktogram: riwayat terkumpul (${[...riwayatSemua].sort().join(" ")})`);
    globalThis.__pesanB = [...pesanSemua];
  }
}

/* ------------------------------ Mesin B ------------------------------ */
{
  const def = MS.MESIN_PIKTOGRAM;
  cek(MS.SEMUA_MESIN_K5B8[1] === def && def.selesaiId === K8.ID_MESIN_K5B8.B, "B: mesin kedua adalah Mesin Piktogram, id selesai sesuai misi");
  sama(def.stasiun.map((s) => s.id), ["kunci", "hitung", "setengah", "periksa"], "B: empat stasiun");
  const RENCANA = [
    { id: "apem", f: [8, 12, 4, 16], opsi: [4, 5, 10], hitung: ["Senin", 3, 4], setengah: ["Selasa", 2, 10], salah: ["Rabu", 12, 4, 4] },
    { id: "tomat", f: [6, 10, 4, 8], opsi: [5, 2, 4], hitung: ["Minggu 2", 5, 2], setengah: ["Minggu 1", 2, 4], salah: ["Minggu 3", 10, 2, 4] },
    { id: "perpustakaan", f: [20, 30, 10, 40], opsi: [4, 10, 20], hitung: ["Selasa", 3, 10], setengah: ["Kamis", 1, 20], salah: ["Rabu", 20, 5, 4] },
  ];
  sama(MS.KASUS_PIKTOGRAM.map((k) => [k.id, k.f, k.kunciOpsi, [k.hitung.nama, k.hitung.simbol, k.hitung.kunci], [k.setengah.nama, k.setengah.penuh, k.setengah.kunci], [k.salah.nama, k.salah.f, k.salah.kunci, k.salah.gambar]]), RENCANA.map((r) => [r.id, r.f, r.opsi, r.hitung, r.setengah, r.salah]), "B Mesin: data tiga kasus sesuai rencana");
  for (const [i, r] of RENCANA.entries()) {
    const c = def.kasus[i];
    const [ku, hi, se, pe] = c.langkah;
    // Kunci: yang membagi habis semua frekuensi (pembagian bilangan bulat), dihitung mandiri.
    const habis = r.opsi.filter((k) => r.f.every((v) => Number.isInteger(v / k)));
    cek(habis.length === 1 && ku.benar === `1 simbol = ${habis[0]}`, `B Mesin ${r.id}: kunci ${habis[0]} satu-satunya yang habis membagi`);
    sama([...ku.opsi].sort(), r.opsi.map((k) => `1 simbol = ${k}`).sort(), `B Mesin ${r.id}: tiga pilihan kunci`);
    cek(r.opsi.every((k) => k === habis[0] || !r.f.every((v) => Number.isInteger(v / k))), `B Mesin ${r.id}: pengecoh kunci meninggalkan sisa`);
    // Hitung.
    const [nh, sh, kh] = r.hitung;
    cek(hi.benar === String(sh * kh) && hi.tanya.includes(`${nh} punya ${sh} simbol`) && hi.tanya.includes(`sama dengan ${kh}`) && hi.opsi.every((o) => o === hi.benar || Number(o) !== sh * kh), `B Mesin ${r.id}: hitung ${sh} × ${kh} = ${sh * kh}`);
    cek(hi.opsi.includes(String(sh)) && hi.opsi.every((o) => Number(o) >= 0), `B Mesin ${r.id}: pengecoh hitung memuat banyak simbol saja`);
    // Setengah.
    const [ns, ps, ks] = r.setengah;
    const nilai = (2 * ps * ks + ks) / 2;
    sama([...se.opsi].sort((u, v) => u - v), [nilai, (ps + 1) * ks, ps * ks].sort((u, v) => u - v).map(String), `B Mesin ${r.id}: pilihan setengah simbol (benar, setengah dihitung penuh, setengah diabaikan)`);
    cek(se.benar === String(nilai) && se.tanya.includes(`${ns} punya ${ps} simbol utuh dan satu setengah simbol`) && ks % 2 === 0, `B Mesin ${r.id}: setengah ${ps} × ${ks} + ${ks / 2} = ${nilai}`);
    // Periksa.
    const [nz, fz, kz, gz] = r.salah;
    const E = fz / kz;
    const harus = gz > E ? "terlalu banyak satu simbol" : gz < E ? "kurang satu simbol" : "tidak ada yang salah";
    cek(pe.benar.startsWith(harus) && Math.abs(gz - E) <= 1 && pe.tanya.includes(`${nz} ${fz}`) && pe.tanya.includes(`menggambar ${gz} simbol`) && pe.opsi.filter((o) => o.startsWith("terlalu banyak")).length === 1, `B Mesin ${r.id}: cacat periksa ${harus} (E = ${E})`);
    if (harus !== "tidak ada yang salah") cek(pe.benar.includes(`seharusnya ${E}`), `B Mesin ${r.id}: seharusnya ${E}`);
    cek(EJ.ejaK5B8(c.ringkas).includes(EJ.kataK5B8(nilai)) && c.ringkas.includes(`bernilai ${nilai}`), `B Mesin ${r.id}: ringkas memuat nilai setengah simbol`);
  }
  sama(RENCANA.map((r) => { const [, f, k, g] = r.salah; return g > f / k ? "lebih" : g < f / k ? "kurang" : "cocok"; }), ["lebih", "kurang", "cocok"], "B Mesin: tiga kasus periksa lebih, kurang, cocok");
}

/* ------------------------------ Skenario B ------------------------------ */
{
  const S = SK.SKENARIO_K5B8B;
  cek(S.adegan.length >= 5 && S.adegan.length <= 8, `${S.id}: 5 sampai 8 adegan`);
  cek(S.adegan[0].jenis === "narasi" && S.adegan[S.adegan.length - 1].jenis === "akhir", `${S.id}: buka dan tutup`);
  cek(new Set(S.adegan.map((a) => a.jenis)).size >= 4, `${S.id}: paling sedikit empat jenis adegan`);
  const semuaTeks = [];
  for (const a of S.adegan) {
    semuaTeks.push(a.cerita);
    for (const o of a.opsi ?? []) semuaTeks.push(o.teks, o.umpan);
    for (const q of a.soal ?? []) semuaTeks.push(q.teks, ...q.opsi);
    for (const f of ["tanya", "sukses", "salah", "kurang", "lebih"]) if (a[f]) semuaTeks.push(a[f]);
  }
  cek(semuaTeks.every(tanpaAngka), `${S.id}: semua teks dapat dieja`);
  sama(S.id.replace(/-k5b8$/, ""), K8.ID_SKENARIO_K5B8.B, "B: id skenario sesuai id misi");
  const adegan = (id) => S.adegan.find((a) => a.id === id);
  const kunci = adegan("kunci");
  cek(/nilai satu simbol/.test(kunci.opsi.find((o) => o.benar).teks) && kunci.opsi.filter((o) => o.benar).length === 1 && kunci.cerita.includes("4 kue"), "B kunci: kunci menunjukkan nilai satu simbol");
  const baca = adegan("baca");
  cek(baca.soal[0].jawaban === String(3 * 4) && baca.soal[1].jawaban === String(5 * 4) && baca.soal[0].opsi.includes("3") && baca.soal[0].opsi.includes("7") && baca.soal[1].opsi.includes("5") && baca.soal[1].opsi.includes("9") && baca.sukses.includes("3 × 4 = 12") && baca.sukses.includes("5 × 4 = 20"), "B baca: 3 × 4 = 12 dan 5 × 4 = 20, pengecoh banyak simbol dan jumlah");
  const simbol = adegan("simbol");
  cek(simbol.jumlah === 20 / 4 && simbol.jumlah <= 12 && simbol.cerita.includes("20 kue") && simbol.sukses.includes("20 ÷ 4 = 5"), "B simbol: 20 ÷ 4 = 5 stik");
  const kamis = adegan("kamis");
  cek(kamis.target === 16 / 4 && kamis.target <= kamis.maks && kamis.maks <= 20 && kamis.cerita.includes("16 kue") && kamis.sukses.includes("16 ÷ 4 = 4"), "B kamis: 16 ÷ 4 = 4 stik");
  const seten = adegan("setengah");
  cek(10 % 4 === 2 && 2 * 2 === 4 && seten.cerita.includes("sisa 2") && seten.soal[0].jawaban === "setengah simbol" && seten.sukses.includes("2 × 4 + 2 = 10") && 2 * 4 + 2 === 10, "B setengah: 10 ÷ 4 sisa 2 = setengah kunci, nilai 2 × 4 + 2 = 10");
  const salah = adegan("salah");
  const sb = salah.opsi.find((o) => o.benar);
  cek(12 / 4 === 3 && 4 > 3 && /^terlalu banyak satu simbol, seharusnya 3$/.test(sb.teks) && salah.cerita.includes("12 kue") && salah.cerita.includes("4 simbol") && salah.opsi.filter((o) => !o.benar).every((o) => !/^terlalu banyak/.test(o.teks)) && salah.opsi.some((o) => /^kurang satu simbol/.test(o.teks)) && salah.opsi.some((o) => /^tidak ada yang salah/.test(o.teks)), "B salah: 12 ÷ 4 = 3, gambar 4 kelebihan satu, pengecoh kurang dan tidak ada yang salah");
  const posisi = S.adegan.filter((a) => a.jenis === "pilih").map((a) => a.opsi.findIndex((o) => o.benar));
  cek(new Set(posisi).size === posisi.length, `B letak jawaban pilih bervariasi (${posisi.join("")})`);
  for (const id of ["baca"]) {
    const ps = adegan(id).soal.map((q) => q.opsi.indexOf(q.jawaban));
    cek(new Set(ps).size === ps.length && ps.every((p) => p >= 0), `B letak jawaban soal ${id} bervariasi (${ps.join("")})`);
  }
  cek(S.adegan.filter((a) => a.jenis === "pilih").every((a) => a.opsi.length === 3 && a.opsi.filter((o) => o.benar).length === 1), "B setiap pilih: tiga opsi, satu benar");
  cek(/tabel frekuensi/.test(S.adegan[0].cerita), "B skenario menyentuh tabel frekuensi dari Sub-Bab A");
}

/* ------------------------------ Misi B ------------------------------ */
{
  const daftar = K8.daftarMisiK5Bab8("B");
  const capai = (aksi) => M0.misiBaru(K8.MISI_B, B.keadaanPiktogramK5B8B(jalan(B.awalPiktogramK5B8B(), LB, aksi)), new Set());
  const kunciAksi = (i, k, jawab) => [{ t: "K_DATA", i }, { t: "K_PILIH", k }, { t: "K_JAWAB", jawab: jawab ?? (kunciBisaMandiri(F_PIK[i], k) ? "bisa" : "tidak") }];
  const bacaAksi = (i, o) => [{ t: "B_DATA", i }, { t: "B_JAWAB", o: o ?? B.opsiBaca(i).benar }];
  const periksaAksi = (i, penuh = true) => {
    const jenis = CACAT_JENIS[i];
    return [{ t: "P_DATA", i }, { t: "P_JENIS", jenis }, ...(penuh ? [jenis === "kunci" ? { t: "P_KUNCI", o: B.opsiKunciPeriksa(i).benar } : { t: "P_TUNJUK", k: CACAT_K[i] }] : [])];
  };
  cek(daftar.filter((m) => m.wajib).length === 7 && daftar.length === 10, "B: tujuh wajib dan tiga tantangan");
  cek(capai(kunciAksi(0, 4)).join() === "b-kunci" && capai(kunciAksi(1, 4)).join() === "b-setengah" && capai(kunciAksi(0, 5)).join() === "b-tolak", "B: kunci 4 apem, kunci 4 tomat, tolak kunci 5 apem memenuhi misinya");
  cek(capai(kunciAksi(0, 4, "tidak")).length === 0 && capai(kunciAksi(0, 5, "bisa")).length === 0, "B: jawaban terbalik tidak memenuhi");
  cek(capai(kunciAksi(0, 2)).length === 0 && capai(kunciAksi(1, 2)).length === 0 && capai(kunciAksi(2, 4, "tidak")).length === 0 && capai(kunciAksi(3, 4)).length === 0, "B: kunci lain atau data lain tidak memenuhi misi kunci");
  cek(capai([{ t: "K_DATA", i: 0 }, { t: "K_JAWAB", jawab: "bisa" }]).length === 0, "B: memutuskan tanpa memilih kunci tidak memenuhi");
  cek(capai(bacaAksi(2)).join() === "b-baca" && capai(bacaAksi(1)).length === 0 && capai(bacaAksi(2, (B.opsiBaca(2).benar + 1) % 3)).length === 0, "B: baca perpustakaan benar memenuhi, data lain atau salah tidak");
  cek(capai(periksaAksi(0)).join() === "b-periksa" && capai(periksaAksi(0, false)).length === 0 && capai(periksaAksi(1)).length === 0 && capai([{ t: "P_DATA", i: 0 }, { t: "P_JENIS", jenis: "ukuran" }, { t: "P_TUNJUK", k: 1 }]).length === 0, "B: periksa apem sampai perbaiki memenuhi, tanpa perbaikan atau jenis salah tidak");
  cek(capai([{ t: "P_DATA", i: 0 }, { t: "P_JENIS", jenis: "jumlah" }, { t: "P_TUNJUK", k: 0 }]).length === 0, "B: baris salah tidak memperbaiki");
  const semuaKunci = [0, 1, 2, 3, 4, 5].flatMap((i) => kunciAksi(i, B.DATA_PIK[i].kunciBaca));
  cek(capai(semuaKunci).join() === "b-kunci,b-setengah,b-kunci-semua", "B: kunci baca setiap data memenuhi b-kunci, b-setengah, dan tantangan");
  cek(capai(semuaKunci.slice(0, -3)).includes("b-kunci-semua") === false, "B: lima data belum memenuhi tantangan kunci");
  cek(capai([0, 1, 2, 3, 4, 5].flatMap((i) => bacaAksi(i))).join() === "b-baca,b-baca-semua" && capai([0, 1, 2, 3, 4].flatMap((i) => bacaAksi(i))).join() === "b-baca", "B: keenam baca memenuhi tantangan, lima belum");
  cek(capai([0, 1, 2, 3, 4, 5].flatMap((i) => periksaAksi(i))).join() === "b-periksa,b-periksa-semua" && capai([0, 1, 2, 3, 4].flatMap((i) => periksaAksi(i))).join() === "b-periksa", "B: keenam periksa memenuhi tantangan, lima belum");
  cek(capai([0, 1, 2, 3, 4, 5].flatMap((i) => periksaAksi(i, i !== 5))).join() === "b-periksa", "B: cacat kunci data keenam belum diperbaiki belum memenuhi tantangan");
  cek(M0.misiBaru(K8.MISI_B, { alat: "data", pernah: ["kunci:0:4", "kunci:1:4", "tolak:0:5", "baca:2", "cacat:0", "perbaiki:0"] }, new Set()).length === 0, "B: riwayat alat data tidak memenuhi misi B");
  cek(M0.misiBaru(K8.MISI_A, { alat: "piktogram", pernah: ["lima:0", "turus:1", "tabel:1", "salah:1", "mode:1", "putus:1"] }, new Set()).length === 0, "A: riwayat alat piktogram tidak memenuhi misi A");
  cek(capai([...kunciAksi(3, 4), ...bacaAksi(0), ...periksaAksi(2)]).length === 0, "B: riwayat tiga tampilan pada data lain tidak memenuhi misi");
}

/* ------------------------------ Konsep tidak bocor ke Sub-Bab B ------------------------------ */
{
  const baca = (nama, ekstensi) => readFileSync(new URL(`../src/components/modul/${nama}.${ekstensi}`, import.meta.url), "utf8");
  const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas5-bab8-ringkas.json", import.meta.url), "utf8"));
  const tanpaKomentar = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
  const teksDari = (o) => {
    const hasil = [];
    JSON.stringify(o, (k, v) => {
      if (typeof v === "string") hasil.push(v);
      return v;
    });
    return hasil.join(" | ");
  };
  // Sub-Bab B memakai tabel frekuensi (dari A) tetapi tidak membahas diagram batang, sumbu, atau skala (Sub-Bab C).
  const BOCOR_B = /(diagram|batang|sumbu|skala|grafik|\baxis\b|bar chart|garis bantu)/i;
  const catat = (teks, apa) => {
    const m = BOCOR_B.exec(teks);
    cek(!m, `B: ${apa} bebas konsep diagram batang (${m ? m[0] : ""} di "${String(teks).slice(Math.max(0, (m?.index ?? 0) - 30), (m?.index ?? 0) + 40)}")`);
  };
  for (const t of [TK.MISI_K5B8.B, TK.NAMA_SIM_K5B8.B, ...K8.MISI_B.map((m) => m.teks)]) catat(t, "teks misi");
  for (const [nama, o] of [["mesin", MS.MESIN_PIKTOGRAM], ["skenario", SK.SKENARIO_K5B8B], ["peta dan infografis ringkas", ringkas.subBab.B]]) catat(teksDari(o), nama);
  for (const [f, e] of [["SimulasiLabPiktogramK5B8", "tsx"], ["model-piktogram-k5b8", "tsx"], ["lab-piktogram-k5b8b", "ts"]]) catat(tanpaKomentar(baca(f, e)), `${f} (tanpa komentar)`);
  for (const p of globalThis.__pesanB) catat(p, "pesan lab dari fuzz");
  for (const u of [B.ucapKunciK5B8B(y0), B.ucapBacaK5B8B(y0), B.ucapPeriksaK5B8B(y0)]) catat(u, "ucapan lab");
  // Sub-Bab A tidak membocorkan piktogram: lab A tidak memakai berkas B.
  cek(!/piktogram/i.test(tanpaKomentar(baca("SimulasiLabDataK5B8", "tsx"))) && !/piktogram/i.test(tanpaKomentar(baca("lab-data-k5b8a", "ts"))), "A: kode lab A tidak menyebut piktogram");

  for (const f of ["SimulasiLabPiktogramK5B8", "model-piktogram-k5b8"]) {
    const s = baca(f, "tsx");
    cek(!/correct_index|explanation/.test(s), `${f}: tidak memuat correct_index atau explanation`);
    cek(!/fetch\(|XMLHttpRequest|api\/|openai|anthropic|gemini/i.test(s), `${f}: tanpa jaringan atau model bahasa`);
  }
  {
    const s = baca("lab-piktogram-k5b8b", "ts");
    cek(!/fetch\(|XMLHttpRequest|from "react"|openai|anthropic|gemini|correct_index|explanation/i.test(s) && (s.match(/^import /gm) ?? []).length === 0, "lab-piktogram-k5b8b: murni, tanpa impor");
  }
  {
    const s = baca("SimulasiLabPiktogramK5B8", "tsx");
    cek(/useEffect\(\(\) => \{\s*onKeadaan\?\.\(keadaan\w+\(x\)\);\s*\}, \[onKeadaan, x\]\);/.test(s), "lab B: lapor keadaan lewat useEffect");
    cek(/setLihat\(v\);\s*kirim\(\{ t: "PESAN_KOSONG" \}\);/.test(s), "lab B: ganti tampilan mengosongkan pesan");
    const catatan = [...s.matchAll(/^\s*"([^"]+)",$/gm)].map((m) => m[1]);
    cek(catatan.length >= 3 && catatan.every(tanpaAngka), "lab B: Coba ini dapat dieja");
    for (const lab of ["Kunci bisa dipakai", "Kunci tidak bisa dipakai"]) cek(s.includes(`aria-label="${lab}"`), `lab B: tombol berlabel ${lab}`);
    for (const awalan of ["Jawab nilai ", "Cacat ", "Kunci cocok ", "Perbaiki baris "]) cek(s.includes(`aria-label={\`${awalan}`), `lab B: tombol berlabel ${awalan.trim()}`);
    for (const awalan of ["Pilih data ", "Pilih baca ", "Pilih periksa ", "Pilih kunci "]) cek(s.includes(`label={\`${awalan}`), `lab B: pilihan berlabel ${awalan.trim()}`);
    cek(/x\.periksa\.ditemukan \? \(/.test(s), "lab B: perbaikan hanya tampil setelah jenis cacat benar");
    const m = baca("model-piktogram-k5b8", "tsx");
    cek(/role="img"/.test(m) && /aria-label=\{`Piktogram /.test(m), "model B: gambar piktogram berlabel");
  }
  const ucapan = [];
  for (let i = 0; i < 6; i += 1) ucapan.push(B.ucapKunciK5B8B(LB(y0, { t: "K_DATA", i })), B.ucapBacaK5B8B(LB(y0, { t: "B_DATA", i })), B.ucapPeriksaK5B8B(LB(y0, { t: "P_DATA", i })));
  cek(ucapan.length === 18 && ucapan.every(tanpaAngka), `semua ${ucapan.length} ucapan lab B dieja menjadi kata`);
  // Data ringkas B dihitung mandiri.
  const B0 = ringkas.subBab.B;
  const [q1, q2, q3] = B0.infografis.panel;
  const bt = (panel, id) => panel.butir.find((b) => b.id === id);
  cek(B0.infografis.panel.length === 3 && q1.butir.length >= 2 && q2.sisi.length === 2 && q3.butir.length >= 2, "ringkas B: tiga panel");
  cek(bt(q1, "kunci").visual.isi === "1 simbol = 4" && bt(q1, "hitung").visual.isi === "3 × 4 = 12" && 3 * 4 === 12 && bt(q1, "setengah").visual.isi === "½ simbol = 2" && 4 / 2 === 2, "ringkas B: kunci 4, 3 × 4 = 12, setengah simbol 2");
  const tb = bt(q3, "tabel").visual;
  sama(tb.baris, F_PIK[0].map((v, k) => [B.DATA_PIK[0].kategori[k], v]), "ringkas B: tabel apem sama dengan data lab");
  cek(bt(q3, "jumlah").visual.isi === "12 ÷ 4 = 3, bukan 4" && 12 / 4 === 3, "ringkas B: 12 ÷ 4 = 3");
  sama(B0.peta.cabang.map((c) => c.id), ["kunci", "baca", "setengah", "jujur"], "ringkas B: empat cabang");
  cek(B0.peta.kartu.length === 8 && B0.peta.cabang.every((c) => B0.peta.kartu.filter((k) => k.cabang === c.id).length >= 2) && B0.peta.kartu.every((k) => B0.peta.cabang.filter((c) => c.id === k.cabang).length === 1), "ringkas B: delapan kartu, tiap cabang dua kartu atau lebih");
  const kartuB = (id) => B0.peta.kartu.find((k) => k.id === id);
  cek(kartuB("b-kali").teks === "3 simbol × 4 = 12" && kartuB("b-sisa").teks === "10 ÷ 4 = 2 sisa 2" && 10 % 4 === 2 && Math.floor(10 / 4) === 2, "ringkas B: kartu perkalian dan sisa pembagian benar");
  cek([q1.ide, q2.ide, q3.ide].every((t) => t.split(/\s+/).length <= 8), "ringkas B: ide paling banyak delapan kata");
}

console.log(`\nLulus: ${lulus}, Gagal: ${gagal}`);
if (gagal > 0) process.exit(1);
