// Uji Simulasi Kelas 6 Bab 3 (Kubus dan Balok): Lab Susunan (A), mesin, skenario, misi, gerbang, data ringkas, pengeja,
// dan konsep sub-bab berikutnya tidak bocor ke sub-bab sebelumnya.
// Jalankan: node --no-warnings scripts/uji-lab-k6b3.mjs
import { readFileSync } from "node:fs";
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K3 from "../src/components/modul/misi-k6bab3.ts";
import * as TK from "../src/components/modul/misi-teks-k6b3.ts";
import * as A from "../src/components/modul/lab-susunan-k6b3a.ts";
import * as MS from "../src/components/modul/mesin-susunan-k6b3.ts";
import * as SK from "../src/components/modul/skenario-k6b3.ts";
import * as ME from "../src/components/modul/mesin-bertahap-k3b1.ts";
import * as EJ from "../src/components/modul/eja-k6b3.ts";
import { periksaDataPeta } from "../src/components/modul/peta-konsep-logika.ts";
import { periksaDataInfografis } from "../src/components/modul/infografis-ringkas-logika.ts";

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
const tanpaAngka = (t) => !/\d/.test(EJ.ejaK6B3(t));
const L = A.langkahSusunanK6B3A;
const x0 = A.awalSusunanK6B3A();
globalThis.__pesanA = [];

/* ------------------------------ Hitungan MANDIRI (cara berbeda) ------------------------------ */
// Kode menjumlahkan panjang daftar petak per lantai dan memakai rumus p * l * t. Di sini setiap KUBUS SATUAN dicacah satu per satu
// pada himpunan "x,y,z", penyangga diperiksa per kubus (kubus di bawahnya harus ada), dan balok penuh dicacah dengan tiga lingkaran.
const himpunan = (daftar) => new Set(daftar);
const blok = (p, l, t) => {
  const h = [];
  for (let z = 0; z < t; z += 1) for (let y = 0; y < l; y += 1) for (let x = 0; x < p; x += 1) h.push(`${x},${y},${z}`);
  return h;
};
const lantaiTeratasMandiri = (h) => {
  let maks = -1;
  for (const k of h) maks = Math.max(maks, Number(k.split(",")[2]));
  let n = 0;
  for (const k of h) if (Number(k.split(",")[2]) === maks) n += 1;
  return n;
};
const tanpaLantaiTeratasMandiri = (h) => {
  let maks = -1;
  for (const k of h) maks = Math.max(maks, Number(k.split(",")[2]));
  let n = 0;
  for (const k of h) if (Number(k.split(",")[2]) < maks) n += 1;
  return n;
};
const melayangMandiri = (h) => {
  const s = himpunan(h);
  let n = 0;
  for (const k of s) {
    const [x, y, z] = k.split(",").map(Number);
    if (z > 0 && !s.has(`${x},${y},${z - 1}`)) n += 1;
  }
  return n;
};
// Menambah penyangga: setiap kubus lantai kedua yang melayang diberi satu kubus di lantai dasar, lalu semuanya dicacah ulang.
const tambahPenyangga = (h) => {
  const s = himpunan(h);
  for (const k of [...s]) {
    const [x, y, z] = k.split(",").map(Number);
    if (z > 0) s.add(`${x},${y},${z - 1}`);
  }
  return s;
};
const KATA_DIGIT = { 0: "", 1: "satu", 2: "dua", 3: "tiga", 4: "empat", 5: "lima", 6: "enam", 7: "tujuh", 8: "delapan", 9: "sembilan" };
const tigaDigitMandiri = (teks3) => {
  const [h, t, u] = teks3.padStart(3, "0").split("").map(Number);
  const bagian = [];
  if (h === 1) bagian.push("seratus");
  else if (h > 1) bagian.push(`${KATA_DIGIT[h]} ratus`);
  if (t === 1) bagian.push(u === 0 ? "sepuluh" : u === 1 ? "sebelas" : `${KATA_DIGIT[u]} belas`);
  else {
    if (t > 1) bagian.push(`${KATA_DIGIT[t]} puluh`);
    if (u > 0) bagian.push(KATA_DIGIT[u]);
  }
  return bagian.join(" ");
};
const bacaMandiri = (n) => {
  if (n === 0) return "nol";
  const s = String(n).padStart(4, "0");
  const ribu = Number(s[0]);
  const sisa = s.slice(1);
  const depan = ribu === 0 ? "" : ribu === 1 ? "seribu" : `${KATA_DIGIT[ribu]} ribu`;
  return [depan, tigaDigitMandiri(sisa)].filter(Boolean).join(" ");
};
const sortir = (a) => [...a].map(String).sort();
const posisiRotasi = (i, r) => (3 - ((i + r) % 3)) % 3;

/* ------------------------------ Rencana soal (diketik ulang, bukan disalin dari kode) ------------------------------ */
const RENCANA_SUSUN = [
  { nama: "dua kubus ditumpuk", kubus: ["0,0,0", "0,0,1"], target: 8, nt: "kubus 2 × 2 × 2", total: 2, kurang: 6, sisa: 1, teratas: 1 },
  { nama: "bentuk L", kubus: ["0,0,0", "1,0,0", "0,0,1"], target: 8, nt: "kubus 2 × 2 × 2", total: 3, kurang: 5, sisa: 2, teratas: 1 },
  { nama: "tangga tiga lantai", kubus: ["0,0,0", "1,0,0", "2,0,0", "0,0,1", "1,0,1", "0,0,2"], target: 12, nt: "balok 3 × 2 × 2", total: 6, kurang: 6, sisa: 5, teratas: 1 },
  { nama: "menara kecil", kubus: ["0,0,0", "1,0,0", "0,1,0", "1,1,0", "1,0,1", "0,1,1", "1,0,2"], target: 12, nt: "balok 2 × 2 × 3", total: 7, kurang: 5, sisa: 6, teratas: 1 },
  { nama: "kubus penuh", kubus: blok(2, 2, 2), target: 18, nt: "balok 3 × 3 × 2", total: 8, kurang: 10, sisa: 4, teratas: 4 },
  { nama: "balok rendah", kubus: blok(3, 2, 2), target: 27, nt: "kubus 3 × 3 × 3", total: 12, kurang: 15, sisa: 6, teratas: 6 },
];
const RENCANA_LAPISAN = [
  { nama: "kubus kecil", p: 2, l: 2, t: 2, dasar: 4, total: 8, sisa: 4 },
  { nama: "kubus besar", p: 3, l: 3, t: 3, dasar: 9, total: 27, sisa: 18 },
  { nama: "balok kardus", p: 5, l: 3, t: 2, dasar: 15, total: 30, sisa: 15 },
  { nama: "balok tinggi", p: 2, l: 3, t: 4, dasar: 6, total: 24, sisa: 18 },
  { nama: "balok lebar", p: 4, l: 4, t: 2, dasar: 16, total: 32, sisa: 16 },
  { nama: "balok gudang", p: 4, l: 3, t: 3, dasar: 12, total: 36, sisa: 24 },
];
const RENCANA_PENYANGGA = [
  { nama: "dua kubus bertumpu", bawah: ["0,0"], bawahSemua: ["0,0", "1,0"], atas: ["0,0"], melayang: 0, total: 3 },
  { nama: "kubus di sudut kosong", bawahSemua: ["0,0", "1,0", "0,1"], atas: ["1,1"], melayang: 1, total: 5 },
  { nama: "dinding bertumpu", bawahSemua: ["0,0", "1,0", "2,0"], atas: ["0,0", "1,0"], melayang: 0, total: 5 },
  { nama: "kubus menjulur", bawahSemua: ["0,0"], atas: ["0,0", "1,0"], melayang: 1, total: 4 },
  { nama: "lantai penuh", bawahSemua: ["0,0", "1,0", "0,1", "1,1"], atas: ["0,0", "1,1"], melayang: 0, total: 6 },
  { nama: "dua kubus jauh", bawahSemua: ["0,0", "1,0"], atas: ["2,0", "2,1"], melayang: 2, total: 6 },
];
const kubusPenyanggaMandiri = (r) => [...r.bawahSemua.map((p) => `${p},0`), ...r.atas.map((p) => `${p},1`)];

/* ------------------------------ Data soal ------------------------------ */
{
  cek(A.SOAL_SUSUN.length === 6 && A.SOAL_LAPISAN.length === 6 && A.SOAL_PENYANGGA.length === 6, "enam soal tiap tampilan");
  RENCANA_SUSUN.forEach((r, i) => {
    const s = A.SOAL_SUSUN[i];
    const mandiri = himpunan(r.kubus);
    cek(s.nama === r.nama && s.namaTarget === r.nt && s.target === r.target, `Susun ${i}: nama dan target sesuai rencana`);
    sama([...himpunan(A.kubusSusun(s).map((k) => k.join(",")))].sort(), [...mandiri].sort(), `Susun ${i}: kubus kode sama dengan kubus rencana`);
    cek(A.kubusSusun(s).length === mandiri.size, `Susun ${i}: tidak ada kubus ganda`);
    cek(mandiri.size === r.total && A.totalSusun(s) === r.total, `Susun ${i}: total ${r.total} (cacah satu per satu dan kode)`);
    cek(r.target - mandiri.size === r.kurang && A.kurangSusun(s) === r.kurang, `Susun ${i}: kurang ${r.kurang}`);
    cek(lantaiTeratasMandiri(mandiri) === r.teratas && A.lantaiTeratas(s) === r.teratas, `Susun ${i}: lantai teratas ${r.teratas}`);
    cek(tanpaLantaiTeratasMandiri(mandiri) === r.sisa && A.sisaSusun(s) === r.sisa, `Susun ${i}: sisa ${r.sisa} sesudah lantai teratas dilepas`);
    cek(melayangMandiri(mandiri) === 0, `Susun ${i}: tidak ada kubus melayang`);
    cek(r.target > r.total && r.kurang > 0, `Susun ${i}: target lebih besar dari susunan`);
    cek(s.lantai.length >= 2, `Susun ${i}: paling sedikit dua lantai`);
  });
  RENCANA_LAPISAN.forEach((r, i) => {
    const s = A.SOAL_LAPISAN[i];
    const h = himpunan(blok(r.p, r.l, r.t));
    cek(s.nama === r.nama && s.p === r.p && s.l === r.l && s.t === r.t, `Lapisan ${i}: ukuran sesuai rencana`);
    cek(h.size === r.total && A.totalLapisan(s) === r.total, `Lapisan ${i}: total ${r.total}`);
    cek(blok(r.p, r.l, 1).length === r.dasar && A.dasarLapisan(s) === r.dasar, `Lapisan ${i}: dasar ${r.dasar}`);
    cek(tanpaLantaiTeratasMandiri(h) === r.sisa && A.sisaLapisan(s) === r.sisa, `Lapisan ${i}: sisa ${r.sisa}`);
    sama([...himpunan(A.kubusLapisan(s).map((k) => k.join(",")))].sort(), [...h].sort(), `Lapisan ${i}: kubus kode sama dengan kubus rencana`);
    cek(A.kubusLapisan(s).length === r.total, `Lapisan ${i}: kubus digambar tepat ${r.total}`);
  });
  cek(new Set(RENCANA_LAPISAN.map((r) => r.total)).size === 6, "Lapisan: enam total berbeda");
  RENCANA_PENYANGGA.forEach((r, i) => {
    const s = A.SOAL_PENYANGGA[i];
    const h = kubusPenyanggaMandiri(r);
    cek(s.nama === r.nama, `Penyangga ${i}: nama`);
    sama([...himpunan(A.kubusPenyangga(s).map((k) => k.join(",")))].sort(), [...himpunan(h)].sort(), `Penyangga ${i}: kubus kode sama dengan rencana`);
    cek(melayangMandiri(h) === r.melayang && A.melayangPenyangga(s) === r.melayang, `Penyangga ${i}: melayang ${r.melayang}`);
    cek(tambahPenyangga(h).size === r.total, `Penyangga ${i}: total sesudah penyangga ${r.total} (cacah mandiri)`);
    cek(A.totalSahPenyangga(s) === r.total, `Penyangga ${i}: total sah kode ${r.total}`);
    cek(melayangMandiri([...tambahPenyangga(h)]) === 0, `Penyangga ${i}: sesudah penyangga tidak ada yang melayang`);
  });
  sama(A.SOAL_PENYANGGA.map((s) => A.melayangPenyangga(s)), [0, 1, 0, 1, 0, 2], "Penyangga: urutan melayang");
  cek(A.SOAL_PENYANGGA.filter((s) => A.melayangPenyangga(s) === 0).length === 3, "Penyangga: tiga susunan sah dan tiga melayang");
  sama([A.idSusun(3), A.idLapisan(4), A.idPenyangga(5)], ["susun:3", "lapisan:4", "penyangga:5"], "format id soal");
}

/* ------------------------------ Pengecoh dan letak kunci ------------------------------ */
{
  const dasarMandiri = (i) => RENCANA_SUSUN[i];
  // Pengecoh angka: dua nilai berbeda dari kunci dan satu sama lain, tidak negatif.
  for (const benar of [0, 1, 2, 5, 9, 30]) {
    for (const calon of [[], [benar], [benar, benar], [benar + 1, benar + 1], [-3, benar], [2.5, 7]]) {
      const [p, q] = A.pengecohAngka(benar, calon);
      cek(Number.isInteger(p) && Number.isInteger(q) && p >= 0 && q >= 0 && p !== q && p !== benar && q !== benar, `pengecohAngka(${benar}, ${JSON.stringify(calon)}) = ${p},${q}`);
    }
  }
  sama(A.pengecohAngka(4, [9, 2]), [9, 2], "pengecohAngka memakai calon pertama yang sah");
  sama(A.pengecohAngka(4, [4, 4, 7]), [7, 5], "pengecohAngka melewati calon sama dengan kunci dan ganda");

  const cekPilih = (nama, p, benarNilai, seed) => {
    const opsi = p.opsi;
    cek(opsi.length === 3 && new Set(opsi).size === 3, `${nama}: tiga pilihan unik (${opsi.join(",")})`);
    cek(opsi[p.benar] === benarNilai && opsi.filter((o) => o === benarNilai).length === 1, `${nama}: tepat satu kunci, nilainya ${benarNilai}`);
    cek(p.benar === posisiRotasi(0, seed), `${nama}: letak kunci eksak ${posisiRotasi(0, seed)}, bukan ${p.benar}`);
    return opsi.filter((o) => o !== benarNilai);
  };
  // Pengecoh yang diharapkan: calon mandiri (dari cacahan) disaring tanpa ganda dan tanpa kunci, lalu cadangan di sekitar kunci.
  const pengecohMandiri = (benar, calon) => {
    const u = [];
    for (const c of [...calon, benar + 1, benar + 2, benar - 1, benar + 3, benar - 2, benar + 4]) if (Number.isInteger(c) && c >= 0 && c !== benar && u.indexOf(c) < 0) u.push(c);
    return u.slice(0, 2);
  };
  const cekPeng = (nama, peng, benar, calon) => sama([...peng].sort(), [...pengecohMandiri(benar, calon)].sort(), `${nama}: pengecoh persis dari calon kebiasaan salah`);
  const letak = { hitung: [], kurang: [], urai: [], dasar: [], total: [], sisa: [], melayang: [], putusan: [], totalP: [] };
  for (let i = 0; i < 6; i += 1) {
    const r = RENCANA_SUSUN[i];
    // seed putaran: i, i + 1, i + 2 (posisi kunci awal 0 digeser sebanyak seed)
    let peng = cekPilih(`Susun ${i} hitung`, A.opsiHitungSusun(i), r.total, i);
    cekPeng(`Susun ${i} hitung`, cekPilih(`Susun ${i} hitung (ulang)`, A.opsiHitungSusun(i), r.total, i), r.total, [r.kubus.filter((k) => k.endsWith(",0")).length, r.sisa, r.total + 1]);
    cek(peng.every((v) => v >= 0), `Susun ${i} hitung: pengecoh tidak negatif`);
    cek(peng.some((v) => v === A.SOAL_SUSUN[i].lantai[0].length || v === r.sisa || v === r.total + 1), `Susun ${i} hitung: pengecoh dari kebiasaan salah (lantai dasar saja, tanpa lantai teratas, satu lebih)`);
    peng = cekPilih(`Susun ${i} kurang`, A.opsiKurangSusun(i), r.kurang, i + 1);
    cekPeng(`Susun ${i} kurang`, peng, r.kurang, [r.target, r.total, r.target + r.total]);
    cek(peng.every((v) => v >= 0), `Susun ${i} kurang: pengecoh tidak negatif`);
    peng = cekPilih(`Susun ${i} urai`, A.opsiUraiSusun(i), r.sisa, i + 2);
    cekPeng(`Susun ${i} urai`, peng, r.sisa, [r.total, r.teratas, r.kubus.filter((k) => k.endsWith(",0")).length]);
    cek(peng.every((v) => v >= 0), `Susun ${i} urai: pengecoh tidak negatif`);
    letak.hitung.push(A.opsiHitungSusun(i).benar);
    letak.kurang.push(A.opsiKurangSusun(i).benar);
    letak.urai.push(A.opsiUraiSusun(i).benar);
    const q = RENCANA_LAPISAN[i];
    peng = cekPilih(`Lapisan ${i} dasar`, A.opsiDasarLapisan(i), q.dasar, i);
    cekPeng(`Lapisan ${i} dasar`, peng, q.dasar, [q.p + q.l, q.p * q.t, q.l * q.t]);
    cek(peng.every((v) => v >= 0), `Lapisan ${i} dasar: pengecoh tidak negatif`);
    peng = cekPilih(`Lapisan ${i} total`, A.opsiTotalLapisan(i), q.total, i + 1);
    cekPeng(`Lapisan ${i} total`, peng, q.total, [q.dasar, q.p + q.l + q.t, q.dasar + q.t]);
    cek(peng.every((v) => v >= 0), `Lapisan ${i} total: pengecoh tidak negatif`);
    cek(peng.some((v) => v === q.dasar || v === q.p + q.l + q.t || v === q.dasar + q.t), `Lapisan ${i} total: pengecoh dari kebiasaan salah (satu lantai, jumlah ukuran)`);
    peng = cekPilih(`Lapisan ${i} sisa`, A.opsiSisaLapisan(i), q.sisa, i + 2);
    cekPeng(`Lapisan ${i} sisa`, peng, q.sisa, [q.total, q.dasar, q.total - q.t]);
    cek(peng.every((v) => v >= 0), `Lapisan ${i} sisa: pengecoh tidak negatif`);
    letak.dasar.push(A.opsiDasarLapisan(i).benar);
    letak.total.push(A.opsiTotalLapisan(i).benar);
    letak.sisa.push(A.opsiSisaLapisan(i).benar);
    const w = RENCANA_PENYANGGA[i];
    peng = cekPilih(`Penyangga ${i} melayang`, A.opsiMelayang(i), w.melayang, i);
    cekPeng(`Penyangga ${i} melayang`, peng, w.melayang, [w.atas.length, w.melayang + 1, w.bawahSemua.length]);
    cek(peng.every((v) => v >= 0), `Penyangga ${i} melayang: pengecoh tidak negatif`);
    const kunciPutusan = w.melayang === 0 ? A.JAWAB_BOLEH : A.JAWAB_TAMBAH;
    peng = cekPilih(`Penyangga ${i} putusan`, A.opsiPutusan(i), kunciPutusan, i + 1);
    sama(sortir([...peng, kunciPutusan]), sortir([A.JAWAB_BOLEH, A.JAWAB_TAMBAH, A.JAWAB_BIARKAN]), `Penyangga ${i} putusan: tiga keputusan berbeda`);
    peng = cekPilih(`Penyangga ${i} total`, A.opsiTotalPenyangga(i), w.total, i + 2);
    cekPeng(`Penyangga ${i} total`, peng, w.total, [w.bawahSemua.length + w.atas.length, w.bawahSemua.length + w.melayang, w.atas.length]);
    cek(peng.every((v) => v >= 0), `Penyangga ${i} total: pengecoh tidak negatif`);
    if (w.melayang > 0) cek(peng.includes(w.bawahSemua.length + w.atas.length), `Penyangga ${i} total: jumlah mentah tanpa penyangga menjadi pengecoh`);
    letak.melayang.push(A.opsiMelayang(i).benar);
    letak.putusan.push(A.opsiPutusan(i).benar);
    letak.totalP.push(A.opsiTotalPenyangga(i).benar);
  }
  void dasarMandiri;
  for (const [nama, daftar] of Object.entries(letak)) cek(new Set(daftar).size === 3, `letak kunci ${nama} memakai ketiga posisi (${daftar.join("")})`);
  sama(JSON.stringify(A.JAWAB_BOLEH) !== JSON.stringify(A.JAWAB_TAMBAH), true, "teks keputusan boleh dan tambah berbeda");
}

/* ------------------------------ Alur tiap soal ------------------------------ */
const kunciSusun = (i, tahap) => [A.opsiHitungSusun, A.opsiKurangSusun, A.opsiUraiSusun][tahap](i).benar;
const kunciLapisan = (i, tahap) => [A.opsiDasarLapisan, A.opsiTotalLapisan, A.opsiSisaLapisan][tahap](i).benar;
const kunciPenyangga = (i, tahap) => [A.opsiMelayang, A.opsiPutusan, A.opsiTotalPenyangga][tahap](i).benar;
const AKSI = {
  susun: { data: "S_DATA", tahap: ["S_HITUNG", "S_KURANG", "S_URAI"], kunci: kunciSusun },
  lapisan: { data: "L_DATA", tahap: ["L_DASAR", "L_TOTAL", "L_SISA"], kunci: kunciLapisan },
  penyangga: { data: "P_DATA", tahap: ["P_MELAYANG", "P_PUTUSAN", "P_TOTAL"], kunci: kunciPenyangga },
};
{
  for (const [nama, def] of Object.entries(AKSI)) {
    for (let i = 0; i < 6; i += 1) {
      let x = L(x0, { t: def.data, i });
      cek(x[nama].data === i && x[nama].tahap === 0 && x.pesan === "", `${nama} ${i}: memilih soal mengatur tahap awal`);
      for (let tahap = 0; tahap < 3; tahap += 1) {
        const kunci = def.kunci(i, tahap);
        // jawaban salah: tidak maju, tidak ada riwayat, pesan bukan sukses
        for (const o of [0, 1, 2].filter((v) => v !== kunci)) {
          const y = L(x, { t: def.tahap[tahap], o });
          globalThis.__pesanA.push(y.pesan);
          cek(y[nama].tahap === tahap && y[nama].data === i && y.pernah.length === 0 && !y.pesan.startsWith("✅") && y.pesan.length > 10, `${nama} ${i} tahap ${tahap}: pilihan salah ${o} tidak maju dan diberi petunjuk`);
        }
        // melompat ke tahap berikutnya ditolak
        if (tahap < 2) {
          const lompat = L(x, { t: def.tahap[tahap + 1], o: def.kunci(i, tahap + 1) });
          globalThis.__pesanA.push(lompat.pesan);
          cek(lompat[nama].tahap === tahap && lompat.pernah.length === 0 && !lompat.pesan.startsWith("✅"), `${nama} ${i} tahap ${tahap}: melompat ke tahap ${tahap + 1} ditolak`);
        }
        // indeks pecahan, negatif, di luar batas, dan bukan angka diabaikan
        for (const o of [0.5, 1.5, -1, 3, 99, NaN, Infinity, "1", null, undefined]) cek(L(x, { t: def.tahap[tahap], o }) === x, `${nama} ${i} tahap ${tahap}: indeks ${String(o)} diabaikan`);
        x = L(x, { t: def.tahap[tahap], o: kunci });
        globalThis.__pesanA.push(x.pesan);
        cek(x[nama].tahap === tahap + 1 && x.pesan.startsWith("✅"), `${nama} ${i} tahap ${tahap}: jawaban benar maju dengan pesan sukses`);
        cek(tahap < 2 ? x.pernah.length === 0 : x.pernah.length === 1 && x.pernah[0] === `${nama}:${i}`, `${nama} ${i} tahap ${tahap}: riwayat hanya dicatat di langkah terakhir`);
      }
      // sesudah selesai, jawaban lain diabaikan
      for (let tahap = 0; tahap < 3; tahap += 1) cek(L(x, { t: def.tahap[tahap], o: def.kunci(i, tahap) }) === x, `${nama} ${i}: sesudah selesai aksi tahap ${tahap} diabaikan`);
      const ulangPilih = L(x, { t: def.data, i });
      cek(ulangPilih[nama].tahap === 0 && ulangPilih.pernah.includes(`${nama}:${i}`), `${nama} ${i}: memilih soal lagi mengulang tahap tetapi riwayat tetap`);
      // alat lain tidak ikut berubah
      for (const lain of Object.keys(AKSI).filter((v) => v !== nama)) cek(x[lain].tahap === 0 && x[lain].data === 0, `${nama} ${i}: tampilan ${lain} tidak berubah`);
    }
    // data pecahan atau di luar batas diabaikan
    for (const i of [-1, 6, 2.5, NaN, "2", null]) cek(L(x0, { t: def.data, i }) === x0, `${nama}: soal ${String(i)} diabaikan`);
  }
  cek(L(x0, { t: "RESET" }).pernah.length === 0 && L(L(x0, { t: "S_HITUNG", o: 0 }), { t: "PESAN_KOSONG" }).pesan === "", "reset dan pesan kosong");
  let y = x0;
  for (const [nama, def] of Object.entries(AKSI)) for (let i = 0; i < 6; i += 1) {
    y = L(y, { t: def.data, i });
    for (let tahap = 0; tahap < 3; tahap += 1) y = L(y, { t: def.tahap[tahap], o: def.kunci(i, tahap) });
  }
  sama([...y.pernah].sort(), [...Array(6).keys()].flatMap((i) => [`susun:${i}`, `lapisan:${i}`, `penyangga:${i}`]).sort(), "semua 18 soal selesai: riwayat 18 id");
  cek(L(y, { t: "RESET" }).pernah.length === 0, "reset menghapus riwayat");
  const kb = A.keadaanSusunanK6B3A(y);
  cek(kb.alat === "susunan" && kb.pernah === y.pernah, "keadaan lapor memakai alat susunan");
}

/* ------------------------------ Fuzz 20.000 aksi dengan orakel mandiri ------------------------------ */
{
  const acak = acakDari(20260713);
  const NAMA = ["susun", "lapisan", "penyangga"];
  // Kunci orakel dari cacahan mandiri (bukan dari fungsi opsi kode). Posisi kunci dicari lewat nilai pada daftar opsi.
  const nilaiKunci = (nama, i, tahap) => {
    if (nama === "susun") {
      const r = RENCANA_SUSUN[i];
      const h = himpunan(r.kubus);
      return [h.size, r.target - h.size, tanpaLantaiTeratasMandiri(h)][tahap];
    }
    if (nama === "lapisan") {
      const r = RENCANA_LAPISAN[i];
      return [blok(r.p, r.l, 1).length, blok(r.p, r.l, r.t).length, blok(r.p, r.l, r.t - 1).length][tahap];
    }
    const r = RENCANA_PENYANGGA[i];
    const h = kubusPenyanggaMandiri(r);
    return [melayangMandiri(h), melayangMandiri(h) === 0 ? A.JAWAB_BOLEH : A.JAWAB_TAMBAH, tambahPenyangga(h).size][tahap];
  };
  const daftarOpsi = (nama, i, tahap) => {
    const f = { susun: [A.opsiHitungSusun, A.opsiKurangSusun, A.opsiUraiSusun], lapisan: [A.opsiDasarLapisan, A.opsiTotalLapisan, A.opsiSisaLapisan], penyangga: [A.opsiMelayang, A.opsiPutusan, A.opsiTotalPenyangga] };
    return f[nama][tahap](i).opsi;
  };
  const o = { susun: { data: 0, tahap: 0 }, lapisan: { data: 0, tahap: 0 }, penyangga: { data: 0, tahap: 0 }, pernah: new Set() };
  let x = x0;
  let ok = true;
  let pernahTerbesar = 0;
  const selesaiPer = { susun: 0, lapisan: 0, penyangga: 0 };
  const nilaiAcak = () => [0, 1, 2, 0.5, 1.5, -1, 3, 7, NaN, "1", null][acak(11)];
  for (let n = 0; n < 20000; n += 1) {
    const nama = NAMA[acak(3)];
    const def = AKSI[nama];
    let a;
    const jenis = acak(10);
    if (jenis === 0) a = { t: def.data, i: [0, 1, 2, 3, 4, 5, -1, 6, 2.5, NaN][acak(10)] };
    else if (jenis === 1) a = { t: "PESAN_KOSONG" };
    else if (jenis === 2 && acak(8) === 0) a = { t: "RESET" };
    else if (jenis <= 5) {
      // jawaban benar untuk tahap aktif (mendorong kemajuan)
      const tahap = Math.min(o[nama].tahap, 2);
      const kunci = nilaiKunci(nama, o[nama].data, tahap);
      a = { t: def.tahap[tahap], o: daftarOpsi(nama, o[nama].data, tahap).indexOf(kunci) };
    } else a = { t: def.tahap[acak(3)], o: nilaiAcak() };

    // Orakel
    const sebelum = x;
    let maju = false;
    let hanyaDiabaikan = false;
    let penanda = null;
    if (a.t === def.data) {
      if (Number.isInteger(a.i) && a.i >= 0 && a.i < 6) o[nama] = { data: a.i, tahap: 0 };
      else hanyaDiabaikan = true;
    } else if (a.t === "PESAN_KOSONG") {
      penanda = "kosong";
    } else if (a.t === "RESET") {
      o.susun = { data: 0, tahap: 0 };
      o.lapisan = { data: 0, tahap: 0 };
      o.penyangga = { data: 0, tahap: 0 };
      o.pernah = new Set();
      penanda = "kosong";
    } else {
      const s = def.tahap.indexOf(a.t);
      if (!(Number.isInteger(a.o) && a.o >= 0 && a.o <= 2)) hanyaDiabaikan = true;
      else if (o[nama].tahap > s) hanyaDiabaikan = true;
      else if (o[nama].tahap === s) {
        const kunci = nilaiKunci(nama, o[nama].data, s);
        if (daftarOpsi(nama, o[nama].data, s)[a.o] === kunci) {
          o[nama].tahap += 1;
          maju = true;
          if (s === 2) {
            o.pernah.add(`${nama}:${o[nama].data}`);
            selesaiPer[nama] += 1;
          }
        }
      }
    }
    x = L(x, a);
    globalThis.__pesanA.push(x.pesan);
    if (hanyaDiabaikan && a.t !== def.data) {
      if (x !== sebelum) {
        ok = false;
        console.log("fuzz: aksi yang seharusnya diabaikan mengubah keadaan", n, JSON.stringify(a));
      }
    }
    if (a.t === "RESET") ok = ok && x.pernah.length === 0 && x.pesan === "";
    else cek(x.pernah.length >= sebelum.pernah.length, `fuzz ${n}: riwayat tidak dicabut`);
    const cocok =
      NAMA.every((k) => x[k].data === o[k].data && x[k].tahap === o[k].tahap) && JSON.stringify([...x.pernah].sort()) === JSON.stringify([...o.pernah].sort());
    if (!cocok) {
      ok = false;
      console.log("fuzz beda dari orakel di langkah", n, JSON.stringify(a), JSON.stringify(x), JSON.stringify({ ...o, pernah: [...o.pernah] }));
      break;
    }
    if (maju) cek(x.pesan.startsWith("✅"), `fuzz ${n}: langkah benar diawali pesan sukses`);
    else if (!hanyaDiabaikan && penanda === null && a.t !== def.data) cek(!x.pesan.startsWith("✅"), `fuzz ${n}: langkah belum benar bukan pesan sukses`);
    if (penanda === "kosong") cek(x.pesan === "", `fuzz ${n}: pesan dikosongkan`);
    cek(NAMA.every((k) => x[k].tahap >= 0 && x[k].tahap <= 3), `fuzz ${n}: tahap dalam batas`);
    pernahTerbesar = Math.max(pernahTerbesar, x.pernah.length);
  }
  cek(ok, "fuzz 20.000 aksi: keadaan sama dengan orakel mandiri");
  cek(selesaiPer.susun > 10 && selesaiPer.lapisan > 10 && selesaiPer.penyangga > 10, `fuzz: tiap tampilan selesai berkali-kali (${selesaiPer.susun}, ${selesaiPer.lapisan}, ${selesaiPer.penyangga})`);
  cek(pernahTerbesar >= 6, `fuzz: riwayat pernah mencapai ${pernahTerbesar}`);
  cek(x.pernah.every((v) => /^(susun|lapisan|penyangga):[0-5]$/.test(v)), "fuzz: semua id riwayat berbentuk sah");
}

/* ------------------------------ Mesin ------------------------------ */
{
  const def = MS.MESIN_SUSUNAN;
  cek(def.stasiun.length === 4 && def.kasus.length === 3, `${def.id}: empat stasiun, tiga kasus`);
  sama(def.stasiun.map((s) => s.id), ["hitung", "lapisan", "penyangga", "urai"], "stasiun mesin");
  const posisi = [];
  for (const kasus of def.kasus) {
    cek(kasus.langkah.length === 4, `${def.id}/${kasus.id}: empat langkah`);
    kasus.langkah.forEach((l, i) => {
      cek(l.stasiun === def.stasiun[i].id, `${def.id}/${kasus.id}: langkah ${i + 1} di stasiun ${def.stasiun[i].id}`);
      cek(l.opsi.length === 3 && new Set(l.opsi).size === 3 && l.opsi.filter((o) => o === l.benar).length === 1, `${def.id}/${kasus.id}/${l.stasiun}: tiga pilihan unik, satu kunci`);
      cek(l.opsi.every((o) => /^\d+$/.test(o)), `${def.id}/${kasus.id}/${l.stasiun}: pilihan berupa bilangan bulat`);
      cek([l.tanya, l.petunjuk, ...l.opsi].every(tanpaAngka), `${def.id}/${kasus.id}/${l.stasiun}: dapat dieja`);
      posisi.push(l.opsi.indexOf(l.benar));
    });
    cek(tanpaAngka(kasus.nama) && tanpaAngka(kasus.ringkas), `${def.id}/${kasus.id}: nama dan ringkas dapat dieja`);
  }
  cek(new Set(posisi).size === 3, `${def.id}: letak kunci bervariasi (${posisi.join("")})`);
  for (let s = 0; s < 4; s += 1) cek(new Set(def.kasus.map((k) => k.langkah[s].opsi.indexOf(k.langkah[s].benar))).size >= 2, `${def.id}: letak kunci stasiun ${def.stasiun[s].id} bervariasi antar kasus`);
  for (const [s, offset] of [[0, 0], [1, 1], [2, 2], [3, 3]]) {
    sama(def.kasus.map((k) => k.langkah[s].opsi.indexOf(k.langkah[s].benar)), [0, 1, 2].map((i) => posisiRotasi(i, offset)), `${def.id}: letak kunci eksak stasiun ${def.stasiun[s].id}`);
  }
  let x = ME.awalMesin(def);
  let n = 0;
  while (!x.selesai && n < 100) {
    n += 1;
    const l = ME.langkahAktif(x);
    x = l ? ME.langkahMesin(x, { t: "JAWAB", nilai: l.benar }) : ME.langkahMesin(x, { t: "LANJUT" });
  }
  cek(x.selesai && def.selesaiId === K3.ID_MESIN_K6B3.A, `${def.id}: bisa diselesaikan, id selesai sesuai misi`);
  const y = ME.awalMesin(def);
  const l0 = ME.langkahAktif(y);
  const z = ME.langkahMesin(y, { t: "JAWAB", nilai: l0.opsi.find((o) => o !== l0.benar) });
  cek(z.ke === 0 && z.ditolak === 1 && z.pesan === l0.petunjuk, `${def.id}: jawaban salah ditolak dengan petunjuk`);

  // Rencana kasus (diketik ulang). Kunci dicacah satu per satu dari kubus satuan.
  const RENCANA_M = [
    { id: "rumah", p: 3, l: 2, t: 2, atas: 3, melayang: 1 },
    { id: "gudang", p: 4, l: 3, t: 2, atas: 5, melayang: 2 },
    { id: "menara", p: 2, l: 2, t: 3, atas: 3, melayang: 2 },
  ];
  sama(MS.KASUS_SUSUNAN.map((k) => [k.id, k.p, k.l, k.t, k.atas, k.melayang]), RENCANA_M.map((r) => [r.id, r.p, r.l, r.t, r.atas, r.melayang]), "Mesin: data tiga kasus sesuai rencana");
  for (const [i, r] of RENCANA_M.entries()) {
    const c = def.kasus[i];
    const [hi, la, pe, ur] = c.langkah;
    const h = blok(r.p, r.l, r.t);
    const dasar = blok(r.p, r.l, 1).length;
    const sisa = tanpaLantaiTeratasMandiri(himpunan(h));
    cek(hi.benar === String(dasar) && hi.tanya.includes(`${r.p} × ${r.l}`) && !hi.tanya.includes(` ${dasar} `), `Mesin ${r.id}: satu lantai ${dasar}, kunci tidak dibocorkan`);
    sama(sortir(hi.opsi).includes(String(dasar)), true, `Mesin ${r.id}: pilihan hitung memuat kunci`);
    cek(la.benar === String(h.length) && la.tanya.includes(`${r.t} lantai`), `Mesin ${r.id}: seluruh kubus ${h.length} (cacah mandiri)`);
    cek(la.opsi.includes(String(dasar)) && la.opsi.includes(String(r.p + r.l + r.t)) || la.opsi.includes(String(dasar)) || la.opsi.includes(String(r.p + r.l + r.t)), `Mesin ${r.id}: pengecoh lapisan memuat kebiasaan salah`);
    cek(pe.benar === String(r.melayang) && pe.tanya.includes(`${r.atas} kubus`) && pe.tanya.includes(`${r.atas - r.melayang} kubus bertumpu`), `Mesin ${r.id}: melayang ${r.melayang}`);
    cek(pe.opsi.every((v) => Number(v) >= 0), `Mesin ${r.id}: pengecoh penyangga tidak negatif`);
    cek(ur.benar === String(sisa) && ur.tanya.includes(`${r.p} × ${r.l} × ${r.t}`), `Mesin ${r.id}: sisa ${sisa} (lantai teratas dilepas, cacah mandiri)`);
    cek(c.ringkas.includes(`${h.length} kubus`) && c.ringkas.includes(`${dasar} kubus`) && c.ringkas.includes(`${r.melayang} melayang`) && c.ringkas.includes(`${sisa} kubus`), `Mesin ${r.id}: ringkas memuat semua hasil`);
    for (const l of c.langkah) cek(l.opsi.every((v) => !l.tanya.includes(`… ${v}`)) && l.petunjuk.length > 15, `Mesin ${r.id}/${l.stasiun}: petunjuk ada`);
  }
}

/* ------------------------------ Skenario ------------------------------ */
{
  const S = SK.SKENARIO_K6B3A;
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
  sama(S.id.replace(/-k6b3$/, ""), K3.ID_SKENARIO_K6B3.A, "id skenario sesuai id misi");
  const adegan = (id) => S.adegan.find((a) => a.id === id);
  const susun = adegan("susun");
  const ks = susun.opsi.filter((o) => o.benar);
  cek(ks.length === 1 && ks[0].teks.startsWith("Dua kubus berdampingan") && susun.opsi.length === 3 && new Set(susun.opsi.map((o) => o.teks)).size === 3, "susun: bentuk L dua kubus mendatar dan satu naik");
  const hitung = adegan("hitung");
  const bentukL = himpunan(["0,0,0", "1,0,0", "0,0,1"]);
  cek(hitung.jumlah === bentukL.size && hitung.objek === "stik" && hitung.sukses.includes(`${bentukL.size} kubus`), "hitung: ketuk 3 stik, bentuk L 3 kubus (cacah mandiri)");
  const lapisan = adegan("lapisan");
  const lantaiDua = blok(3, 2, 1).length;
  cek(lapisan.soal[0].jawaban === String(lantaiDua) && lapisan.soal[1].jawaban === String(blok(3, 2, 2).length), "lapisan: 6 kubus satu lantai dan 12 kubus dua lantai (cacah mandiri)");
  for (const q of lapisan.soal) cek(q.opsi.length === 3 && q.opsi.filter((o) => o === q.jawaban).length === 1 && new Set(q.opsi).size === 3, `soal "${q.teks}": tiga pilihan satu kunci`);
  cek(lapisan.sukses.includes("3 × 2 = 6") && lapisan.sukses.includes("6 × 2 = 12"), "lapisan: kalimat sukses memuat dua hasil");
  const isi = adegan("isi");
  cek(isi.target === lantaiDua && isi.maks > isi.target && isi.objek === "stik" && isi.cerita.includes("3 × 2") && isi.sukses.includes("3 × 2 = 6"), "isi: 6 stik untuk lantai kedua 3 × 2");
  const penyangga = adegan("penyangga");
  const kp = penyangga.opsi.filter((o) => o.benar);
  cek(kp.length === 1 && kp[0].teks.includes("penyangga") && penyangga.opsi.length === 3 && penyangga.cerita.includes("Hidden Support Rule"), "penyangga: tambah penyangga dulu");
  const urai = adegan("urai");
  const menara = himpunan([...blok(2, 2, 1), "0,0,1", "1,0,1"]);
  cek(urai.soal[0].jawaban === String(menara.size) && urai.soal[1].jawaban === String(tanpaLantaiTeratasMandiri(menara)), "urai: menara 6 kubus, sisa 4 sesudah lantai teratas dilepas (cacah mandiri)");
  cek(urai.cerita.includes("4 kubus") && urai.cerita.includes("2 kubus") && urai.sukses.includes("4 + 2 = 6"), "urai: cerita dan sukses cocok");
  for (const q of urai.soal) cek(q.opsi.length === 3 && q.opsi.filter((o) => o === q.jawaban).length === 1 && new Set(q.opsi).size === 3, `soal "${q.teks}": tiga pilihan satu kunci`);
  const posisiPilih = S.adegan.filter((a) => a.jenis === "pilih").map((a) => a.opsi.findIndex((o) => o.benar));
  cek(posisiPilih.length === 2 && new Set(posisiPilih).size === posisiPilih.length, `letak jawaban pilih bervariasi (${posisiPilih.join("")})`);
  const ps = [...lapisan.soal, ...urai.soal].map((q) => q.opsi.indexOf(q.jawaban));
  cek(ps.every((p) => p >= 0) && new Set(ps).size >= 2, `letak jawaban soal bervariasi (${ps.join("")})`);
  cek(S.adegan.filter((a) => a.jenis === "pilih").every((a) => a.opsi.length === 3 && a.opsi.filter((o) => o.benar).length === 1), "setiap pilih: tiga opsi, satu benar");
  const metode = S.adegan.map((a) => a.cerita).join(" ");
  cek(/Construct-Decompose Protocol/.test(metode) && /Layer Counting Method/.test(metode) && /Hidden Support Rule/.test(metode), "skenario memuat tiga metode luar berlabel");
}

/* ------------------------------ Misi ------------------------------ */
{
  sama(Object.keys(TK.MISI_K6B3), ["A"], "teks misi untuk A");
  sama(Object.keys(TK.NAMA_SIM_K6B3), ["A"], "nama simulasi untuk A");
  cek(TK.hurufK6B3("Z") === "A" && TK.hurufK6B3("A") === "A", "huruf tak dikenal jatuh ke A");
  cek(TK.misiAwalK6Bab3("A").startsWith("Simulasi 1. Misi: ") && tanpaAngka(TK.misiAwalK6Bab3("A")) && tanpaAngka(TK.NAMA_SIM_K6B3.A), "misi awal dapat dieja");
  const daftar = K3.daftarMisiK6Bab3("A");
  cek(K3.daftarMisiK6Bab3("Z") === K3.MISI_A, "huruf tak dikenal memakai misi A");
  cek(daftar.filter((m) => m.wajib).length === 7 && daftar.filter((m) => !m.wajib).length === 3, "A: tujuh misi wajib dan tiga tantangan bebas");
  cek(new Set(daftar.map((m) => m.id)).size === 10 && daftar.every((m) => m.id.startsWith("a-")), "A: id misi unik berawalan huruf");
  const kosong = [{ alat: "susunan", pernah: [] }, { alat: "lain", pernah: [] }, sel("tidak-ada"), A.keadaanSusunanK6B3A(A.awalSusunanK6B3A())];
  cek(kosong.every((k) => M0.misiBaru(daftar, k, new Set()).length === 0), "A: keadaan awal alat tidak memenuhi misi mana pun");
  const baru = (k) => M0.misiBaru(daftar, k, new Set());
  cek(baru(sel(K3.ID_MESIN_K6B3.A)).join() === "a-mesin" && baru(sel(K3.ID_SKENARIO_K6B3.A)).join() === "a-skenario", "A: id mesin dan skenario memenuhi misinya");
  const S = (...id) => ({ alat: "susunan", pernah: id });
  const harap = {
    "a-susun-l": ["susun:1"],
    "a-lapisan-kecil": ["lapisan:0"],
    "a-lapisan-balok": ["lapisan:2"],
    "a-penyangga-sah": ["penyangga:0"],
    "a-penyangga-melayang": ["penyangga:1"],
  };
  for (const [id, perlu] of Object.entries(harap)) {
    const m = daftar.find((v) => v.id === id);
    cek(m.wajib && m.cek(S(...perlu)), `${id}: terpenuhi oleh ${perlu.join()}`);
    cek(!m.cek({ alat: "lain", pernah: perlu }), `${id}: alat lain dengan id sama tidak memenuhi`);
    cek(!m.cek(sel(perlu[0])), `${id}: keadaan selesai dengan id sama tidak memenuhi`);
    // near-miss: soal lain pada tampilan yang sama, dan soal yang sama pada tampilan lain
    const [tamp, nomor] = perlu[0].split(":");
    for (let j = 0; j < 6; j += 1) if (j !== Number(nomor)) cek(!m.cek(S(`${tamp}:${j}`)), `${id}: soal ${tamp}:${j} saja tidak memenuhi`);
    for (const lain of ["susun", "lapisan", "penyangga"].filter((v) => v !== tamp)) cek(!m.cek(S(`${lain}:${nomor}`)), `${id}: ${lain}:${nomor} saja tidak memenuhi`);
    cek(!m.cek(S()), `${id}: riwayat kosong tidak memenuhi`);
  }
  // Setiap misi lab tepat tersentuh oleh id-nya saja
  for (const tamp of ["susun", "lapisan", "penyangga"]) for (let j = 0; j < 6; j += 1) {
    const dipenuhi = daftar.filter((m) => m.wajib && !["a-mesin", "a-skenario"].includes(m.id) && m.cek(S(`${tamp}:${j}`))).map((m) => m.id);
    const tunggu = Object.entries(harap).filter(([, p]) => p[0] === `${tamp}:${j}`).map(([id]) => id);
    sama(dipenuhi, tunggu, `misi terpenuhi oleh ${tamp}:${j} saja`);
  }
  // Tantangan: keenam soal
  for (const [id, tamp] of [["a-susun-semua", "susun"], ["a-lapisan-semua", "lapisan"], ["a-penyangga-semua", "penyangga"]]) {
    const m = daftar.find((v) => v.id === id);
    const semua = [0, 1, 2, 3, 4, 5].map((j) => `${tamp}:${j}`);
    cek(!m.wajib && m.cek(S(...semua)), `${id}: terpenuhi oleh keenam soal`);
    for (let j = 0; j < 6; j += 1) cek(!m.cek(S(...semua.filter((_, q) => q !== j))), `${id}: tanpa soal ${j} belum terpenuhi`);
    cek(!m.cek(S(...[0, 1, 2, 3, 4, 5].map((j) => `${["susun", "lapisan", "penyangga"].find((v) => v !== tamp)}:${j}`))), `${id}: keenam soal tampilan lain tidak memenuhi`);
  }
  const tampil = M0.tampilMisi(daftar);
  const wajibIds = daftar.filter((m) => m.wajib).map((m) => m.id);
  cek(!M0.wajibSelesai(tampil, new Set(wajibIds.slice(0, 6))), "A: enam dari tujuh wajib belum membuka gerbang");
  cek(M0.wajibSelesai(tampil, new Set(wajibIds)), "A: tujuh wajib membuka gerbang");
  cek(M0.bolehLanjut({ adaMisi: true, wajibSelesai: false, dilewati: true, disentuh: true }) && !M0.bolehLanjut({ adaMisi: true, wajibSelesai: false, dilewati: true, disentuh: false }), "lewati hanya setelah menyentuh simulasi");
  cek(M0.bolehLanjut({ adaMisi: true, wajibSelesai: true, dilewati: false, disentuh: false }), "gerbang terbuka setelah semua wajib");
  cek(!M0.bolehLanjut({ adaMisi: true, wajibSelesai: false, dilewati: false, disentuh: true }), "gerbang tertutup bila wajib belum selesai dan belum dilewati");
  // Misi yang sudah tercapai tidak dicabut
  const dicapai = new Set();
  M0.laporMisi(daftar, S("susun:1"), (id) => dicapai.add(id));
  M0.laporMisi(daftar, S(), (id) => dicapai.add(id));
  cek(dicapai.size === 1 && dicapai.has("a-susun-l"), "laporMisi: hanya misi yang terpenuhi yang dicapai");
  cek(daftar.every((m) => tanpaAngka(m.teks)), "teks tiap misi dapat dieja");
  cek(daftar.every((m) => !/\d/.test(m.teks)), "teks misi tanpa angka (semua bilangan ditulis dengan kata)");
}

/* ------------------------------ Pengeja ------------------------------ */
{
  let bagus = true;
  for (let n = 0; n <= 9999; n += 1) if (EJ.kataK6B3(n) !== bacaMandiri(n)) {
    bagus = false;
    console.log("kata salah:", n, EJ.kataK6B3(n), bacaMandiri(n));
    break;
  }
  cek(bagus, "bilangan 0 sampai 9999 sama dengan hitungan mandiri per digit");
  cek(EJ.kataK6B3(10000) === "10000" && EJ.kataK6B3(-1) === "-1" && EJ.kataK6B3(2.5) === "2.5", "di luar jangkauan dikembalikan apa adanya");
  const e = EJ.ejaK6B3;
  sama(e("2 × 2 × 2 = 8"), "dua kali dua kali dua sama dengan delapan", "ejaan 2 × 2 × 2 = 8");
  sama(e("5×3×2 = 30"), "lima kali tiga kali dua sama dengan tiga puluh", "ejaan 5×3×2 tanpa spasi");
  sama(e("3 x 3"), "tiga kali tiga", "ejaan x sebagai kali");
  sama(e("C2"), "ce dua", "ejaan C2");
  sama(e("A3 ke E5"), "a tiga ke e lima", "ejaan A3 ke E5");
  sama(e("huruf H dan F"), "huruf ha dan ef", "huruf tunggal dibaca namanya");
  sama(e("Lantai 2"), "Lantai dua", "huruf kecil tidak diubah");
  sama(e("Bentuk L"), "Bentuk L", "L bukan huruf petak");
  sama(e("Ada 12 kubus."), "Ada dua belas kubus.", "titik tidak terpisah");
  sama(e("kurung (3)"), "kurung kurung buka tiga kurung tutup", "kurung");
  sama(e("Berapa …?"), "Berapa titik-titik?", "elipsis");
  sama(e("6 − 2 = 4"), "enam dikurangi dua sama dengan empat", "kurang dengan minus");
  sama(e("Ayo ADA dan Bab"), "Ayo ADA dan Bab", "kata berhuruf besar tidak terpengaruh");
  cek(!/\d/.test(e("Gudang 4 × 3 × 2, 9999 kubus, lantai 1 sampai 10, A1 sampai H8")), "angka dan petak tidak tersisa");
  for (const h of "ABCDEFGH") cek(EJ.NAMA_HURUF_K6B3[h] && !/\d/.test(e(`${h}1`)), `huruf ${h} punya nama`);
  sama(Object.keys(EJ.NAMA_HURUF_K6B3).join(""), "ABCDEFGH", "delapan huruf petak");
}

/* ------------------------------ Data ringkas (peta dan infografis) ------------------------------ */
const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas6-bab3-ringkas.json", import.meta.url), "utf8"));
{
  cek(ringkas.chapter_id === "mtk-6-bab3" && ringkas.grade === 6 && ringkas.phase_code === "FASE_C", "ringkas: identitas bab");
  const a = ringkas.subBab.A;
  sama(periksaDataPeta(a.peta), [], "ringkas A: peta sah");
  sama(periksaDataInfografis(a.infografis), [], "ringkas A: infografis sah");
  cek(a.peta.cabang.length >= 3 && a.peta.cabang.length <= 4, `ringkas A: ${a.peta.cabang.length} cabang`);
  cek(a.peta.cabang.every((c) => a.peta.kartu.filter((k) => k.cabang === c.id).length >= 2), "ringkas A: tiap cabang punya paling sedikit dua kartu");
  cek(a.infografis.panel.length <= 3, "ringkas A: infografis paling banyak tiga panel");
  for (const p of a.infografis.panel) {
    cek(p.ide.split(/\s+/).length <= 8, `ringkas A: ide ${p.id} paling banyak 8 kata`);
    for (const b of p.butir ?? []) cek(b.isi.split(/\s+/).length <= 8, `ringkas A: ringkas ${p.id}/${b.id} paling banyak 8 kata`);
  }
  for (const c of a.peta.cabang) cek(c.ringkas.split(/\s+/).length <= 8, `ringkas A: cabang ${c.id} ringkas paling banyak 8 kata`);
  const teksSuara = [];
  JSON.stringify(a, (k, v) => {
    if (k === "suara" && typeof v === "string") teksSuara.push(v);
    return v;
  });
  cek(teksSuara.every(tanpaAngka), "ringkas A: semua suara dapat dieja");
  // Kunci ujian tidak ada
  cek(!/correct_index|explanation/.test(JSON.stringify(ringkas)), "ringkas: tanpa correct_index atau explanation");
}

/* ------------------------------ Konsep sub-bab berikutnya tidak bocor ke Sub-Bab A ------------------------------ */
{
  const baca = (nama, ekstensi) => readFileSync(new URL(`../src/components/modul/${nama}.${ekstensi}`, import.meta.url), "utf8");
  const tanpaKomentar = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
  const teksDari = (o) => {
    const hasil = [];
    JSON.stringify(o, (k, v) => {
      if (typeof v === "string" && k !== "tipe" && k !== "jenis") hasil.push(v);
      return v;
    });
    return hasil.join(" | ");
  };
  // Sub-Bab A hanya membahas susun, urai, lantai, penyangga, dan total. Gambar dari beberapa arah, matriks tinggi, siluet, dan
  // proyeksi (Sub-Bab B), serta koordinat huruf-angka, jarak, dan jalur (Sub-Bab C) belum boleh muncul.
  const BOCOR_A = /(\btampak|\bsiluet|proyeksi|\bmatriks|\bmaksimum|\bmaks\b|orthographic|occlusion|height-matrix|\bperspektif|arah pandang|dari atas|dari depan|dari samping|\bdepan\b|\bsamping\b|\bkoordinat|\blokasi|\bjarak|manhattan|\bjalur|\bdenah|\bgrid\b|\bdiagonal|shortest|naming)/i;
  const BOCOR_PETAK = /(\bpetak [A-H]\b|\b[A-H][1-9]\b)/;
  const catat = (teks, apa) => {
    const m = BOCOR_A.exec(teks) ?? BOCOR_PETAK.exec(teks);
    cek(!m, `A: ${apa} bebas konsep tampak, matriks, koordinat, jarak, dan jalur (${m ? m[0] : ""} di "${String(teks).slice(Math.max(0, (m?.index ?? 0) - 30), (m?.index ?? 0) + 40)}")`);
  };
  const catatTeks = (teks, apa) => {
    catat(teks, apa);
    cek(!/huruf/i.test(teks), `A: ${apa} tanpa kata huruf (koordinat huruf-angka milik Sub-Bab C)`);
  };
  for (const t of [TK.MISI_K6B3.A, TK.NAMA_SIM_K6B3.A, ...K3.MISI_A.map((m) => m.teks)]) catatTeks(t, "teks misi");
  for (const [nama, o] of [["mesin", MS.MESIN_SUSUNAN], ["skenario", SK.SKENARIO_K6B3A], ["peta dan infografis ringkas", ringkas.subBab.A]]) catatTeks(teksDari(o), nama);
  for (const [f, e] of [["SimulasiLabSusunanK6B3", "tsx"], ["model-susunan-k6b3", "tsx"], ["lab-susunan-k6b3a", "ts"], ["mesin-susunan-k6b3", "ts"], ["SimulasiK6Bab3", "tsx"]]) catat(tanpaKomentar(baca(f, e)).replace(/ ([-=+] |=> )/g, " "), `${f} (tanpa komentar)`);
  for (const p of globalThis.__pesanA) catatTeks(p, "pesan lab dari fuzz");
  for (const u of [A.ucapSusunK6B3A(x0), A.ucapLapisanK6B3A(x0), A.ucapPenyanggaK6B3A(x0)]) catatTeks(u, "ucapan lab");
  cek(globalThis.__pesanA.length > 20000, `pesan fuzz terkumpul (${globalThis.__pesanA.length})`);
  cek(globalThis.__pesanA.every((p) => typeof p === "string" && !/\d[.,]\d/.test(p)), "pesan lab: hanya bilangan bulat (tanpa pecahan atau desimal)");
  cek(globalThis.__pesanA.every((p) => !p.startsWith("✅") || /✅ /.test(p)), "pesan sukses: ✅ diikuti spasi");

  for (const f of ["SimulasiLabSusunanK6B3", "SimulasiK6Bab3", "model-susunan-k6b3"]) {
    const s = baca(f, "tsx");
    cek(!/correct_index|explanation/.test(s), `${f}: tidak memuat correct_index atau explanation`);
    cek(!/fetch\(|XMLHttpRequest|api\/|openai|anthropic|gemini/i.test(s), `${f}: tanpa jaringan atau model bahasa`);
  }
  for (const f of ["lab-susunan-k6b3a", "mesin-susunan-k6b3", "skenario-k6b3", "misi-k6bab3", "misi-teks-k6b3", "eja-k6b3"]) {
    const s = baca(f, "ts");
    cek(!/fetch\(|XMLHttpRequest|from "react"|openai|anthropic|gemini|correct_index|explanation/i.test(s), `${f}: murni`);
    const impor = s.match(/^import .+$/gm) ?? [];
    cek(impor.every((l) => l.startsWith("import type")), `${f}: hanya mengimpor tipe`);
  }
  cek((baca("lab-susunan-k6b3a", "ts").match(/^import /gm) ?? []).length === 0 && (baca("eja-k6b3", "ts").match(/^import /gm) ?? []).length === 0, "lab dan pengeja tanpa impor sama sekali");
  {
    const s = tanpaKomentar(baca("lab-susunan-k6b3a", "ts"));
    cek(!/\.toFixed|parseFloat|Math\.(round|floor|ceil|random)|\d\.\d/.test(s), "logika lab: hanya bilangan bulat");
    const m = tanpaKomentar(baca("mesin-susunan-k6b3", "ts"));
    cek(!/\.toFixed|parseFloat|Math\.(round|floor|ceil|random)|\d\.\d/.test(m), "logika mesin: hanya bilangan bulat");
  }
  {
    const s = baca("SimulasiLabSusunanK6B3", "tsx");
    cek(/useEffect\(\(\) => \{\s*onKeadaan\?\.\(keadaan\w+\(x\)\);\s*\}, \[onKeadaan, x\]\);/.test(s), "lab: lapor keadaan lewat useEffect");
    cek(/setLihat\(v\);\s*kirim\(\{ t: "PESAN_KOSONG" \}\);/.test(s), "lab: ganti tampilan mengosongkan pesan");
    const catatan = [...s.matchAll(/^\s*"([^"]+)",$/gm)].map((m) => m[1]);
    cek(catatan.length >= 3 && catatan.every(tanpaAngka), "lab: Coba ini dapat dieja");
    for (const awalan of ["Seluruh kubus", "Kubus kurang", "Kubus tersisa", "Kubus satu lantai", "Kubus melayang", "Keputusan"]) cek(s.includes(`awalan="${awalan}"`), `lab: pilihan berlabel ${awalan}`);
    for (const awalan of ["Pilih soal susun ", "Pilih soal lapisan ", "Pilih soal penyangga "]) cek(s.includes(`label={\`${awalan}`), `lab: pilihan soal berlabel ${awalan.trim()}`);
    for (const t of [0, 1, 2]) cek(new RegExp(`x\\.susun\\.tahap === ${t} \\?`).test(s) && new RegExp(`x\\.lapisan\\.tahap === ${t} \\?`).test(s) && new RegExp(`x\\.penyangga\\.tahap === ${t} \\?`).test(s), `lab: pertanyaan tahap ${t} di tiga tampilan`);
    for (const aksi of ["S_DATA", "S_HITUNG", "S_KURANG", "S_URAI", "L_DATA", "L_DASAR", "L_TOTAL", "L_SISA", "P_DATA", "P_MELAYANG", "P_PUTUSAN", "P_TOTAL", "RESET"]) cek(s.includes(`t: "${aksi}"`), `lab: aksi ${aksi} terhubung ke tombol`);
    const m = baca("model-susunan-k6b3", "tsx");
    cek(/role="img"/.test(m) && /aria-label=\{label\}/.test(m) && /aria-label=\{`\$\{nama\}: \$\{lantai\.length\} kubus`\}/.test(m), "model: gambar kubus dan kisi berlabel");
    cek(m.includes("max-w-[240px]") && !/(?<!max-)\bw-\[\d{3,}px\]/.test(m), "model: gambar dibatasi dan tanpa lebar tetap besar");
  }
  const pembungkus = baca("SimulasiK6Bab3", "tsx");
  cek(/eja=\{ejaK6B3\}/.test(pembungkus), "pembungkus: mesin dieja ejaK6B3");
  const coba = [...pembungkus.matchAll(/"([^"]*\?)"/g)].map((m) => m[1]);
  cek(coba.length >= 3 && coba.every(tanpaAngka), "Coba ini mesin dapat dieja");
  const ucapan = [];
  for (let i = 0; i < 6; i += 1) ucapan.push(A.ucapSusunK6B3A(L(x0, { t: "S_DATA", i })), A.ucapLapisanK6B3A(L(x0, { t: "L_DATA", i })), A.ucapPenyanggaK6B3A(L(x0, { t: "P_DATA", i })));
  cek(ucapan.length === 18 && ucapan.every(tanpaAngka), `semua ${ucapan.length} ucapan lab dieja menjadi kata`);
  cek(ucapan.every((u) => /kubus/.test(EJ.ejaK6B3(u))), "ucapan lab memuat kata kubus");
}

/* ------------------------------ Emoji paling tinggi Emoji 12 ------------------------------ */
{
  const berkas = [
    "src/components/modul/eja-k6b3.ts",
    "src/components/modul/lab-susunan-k6b3a.ts",
    "src/components/modul/mesin-susunan-k6b3.ts",
    "src/components/modul/skenario-k6b3.ts",
    "src/components/modul/misi-k6bab3.ts",
    "src/components/modul/misi-teks-k6b3.ts",
    "src/components/modul/model-susunan-k6b3.tsx",
    "src/components/modul/SimulasiLabSusunanK6B3.tsx",
    "src/components/modul/SimulasiK6Bab3.tsx",
    "src/data/kelas6-bab3-ringkas.json",
  ];
  for (const f of berkas) {
    const s = readFileSync(new URL(`../${f}`, import.meta.url), "utf8");
    const buruk = [...s].filter((c) => {
      const k = c.codePointAt(0);
      return k > 0x1fa95 || k === 0x1f7f0 || k === 0x200d;
    });
    cek(buruk.length === 0, `${f}: tanpa emoji di atas Emoji 12 dan tanpa ZWJ (${buruk.map((c) => c.codePointAt(0).toString(16)).join()})`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: UTF-8 tanpa BOM dan akhir baris LF`);
  }
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
