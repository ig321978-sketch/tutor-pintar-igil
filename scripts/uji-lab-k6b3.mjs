// Uji Simulasi Kelas 6 Bab 3 (Kubus dan Balok): Lab Susunan (A), mesin, skenario, misi, gerbang, data ringkas, pengeja,
// dan konsep sub-bab berikutnya tidak bocor ke sub-bab sebelumnya.
// Jalankan: node --no-warnings scripts/uji-lab-k6b3.mjs
import { readFileSync } from "node:fs";
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K3 from "../src/components/modul/misi-k6bab3.ts";
import * as TK from "../src/components/modul/misi-teks-k6b3.ts";
import * as A from "../src/components/modul/lab-susunan-k6b3a.ts";
import * as MS from "../src/components/modul/mesin-susunan-k6b3.ts";
import * as B from "../src/components/modul/lab-tampak-k6b3b.ts";
import * as MT from "../src/components/modul/mesin-tampak-k6b3.ts";
import * as C from "../src/components/modul/lab-petak-k6b3c.ts";
import * as MP from "../src/components/modul/mesin-petak-k6b3.ts";
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
  sama(Object.keys(TK.MISI_K6B3), ["A", "B", "C"], "teks misi untuk A, B, dan C");
  sama(Object.keys(TK.NAMA_SIM_K6B3), ["A", "B", "C"], "nama simulasi untuk A, B, dan C");
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
  sama(e("2C dan 5E"), "dua ce dan lima e", "angka lalu huruf petak (urutan terbalik) tetap dibaca");
  sama(e("Pilih A1, B6 atau F3."), "Pilih a satu, be enam atau ef tiga.", "beberapa letak petak dalam satu kalimat");
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
  for (const [f, e] of [["SimulasiLabSusunanK6B3", "tsx"], ["model-susunan-k6b3", "tsx"], ["lab-susunan-k6b3a", "ts"], ["mesin-susunan-k6b3", "ts"]]) catat(tanpaKomentar(baca(f, e)).replace(/ ([-=+] |=> )/g, " "), `${f} (tanpa komentar)`);
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

/* ============================== Sub-Bab B: Lab Tampak ============================== */
{
  const LB = B.langkahTampakK6B3B;
  const xb0 = B.awalTampakK6B3B();
  globalThis.__pesanB = [];
  // Hitungan MANDIRI: kubus dicacah satu per satu pada (kolom, baris, lantai). Tampak = banyak pasangan berbeda yang terlihat dari satu arah.
  const kubusM = (m) => {
    const h = [];
    for (let r = 0; r < m.length; r += 1) for (let c = 0; c < m[r].length; c += 1) for (let z = 0; z < m[r][c]; z += 1) h.push([c, r, z]);
    return h;
  };
  const proyeksi = (m, arah) => new Set(kubusM(m).map(([c, r, z]) => (arah === "depan" ? `${c},${z}` : arah === "samping" ? `${r},${z}` : `${c},${r}`))).size;
  const tigaMandiri = (m) => [proyeksi(m, "depan"), proyeksi(m, "samping"), proyeksi(m, "atas")];
  // Tinggi terbesar satu garis (kolom atau baris) dihitung dari kubus yang berada di garis itu.
  const tinggiGaris = (m, arah, k) => kubusM(m).filter(([c, r]) => (arah === "depan" ? c === k : r === k)).reduce((s, [, , z]) => Math.max(s, z + 1), 0);
  const teksMandiri = (m) => m.map((b, r) => `${r === 0 ? "depan" : "belakang"} ${b.join(" dan ")}`).join(", ");

  const RM = [
    { nama: "contoh Anike", m: [[2, 1], [3, 4]], total: 10 },
    { nama: "menara kecil", m: [[1, 3], [2, 1]], total: 7 },
    { nama: "empat sama", m: [[2, 2], [2, 2]], total: 8 },
    { nama: "ada petak kosong", m: [[2, 0], [2, 2]], total: 6 },
    { nama: "depan tinggi", m: [[3, 1], [1, 2]], total: 7 },
    { nama: "belakang tinggi", m: [[1, 2], [4, 1]], total: 8 },
  ];
  const RT = [
    { nama: "depan satu dan tiga", m: [[1, 2], [3, 1]], arah: "depan", garis: [3, 2], jumlah: 5 },
    { nama: "depan dua sama", m: [[2, 2], [1, 2]], arah: "depan", garis: [2, 2], jumlah: 4 },
    { nama: "depan contoh Anike", m: [[2, 1], [3, 4]], arah: "depan", garis: [3, 4], jumlah: 7 },
    { nama: "samping dua sama", m: [[2, 1], [1, 2]], arah: "samping", garis: [2, 2], jumlah: 4 },
    { nama: "samping menara kecil", m: [[1, 3], [2, 1]], arah: "samping", garis: [3, 2], jumlah: 5 },
    { nama: "samping contoh Anike", m: [[2, 1], [3, 4]], arah: "samping", garis: [2, 4], jumlah: 6 },
  ];
  const RA = [
    { nama: "empat ditumpuk", m: [[4]], calon: [[[4]], [[1, 2], [2, 1]], [[0, 2], [2, 0]]], tiga: [4, 4, 1], total: 4 },
    { nama: "ada petak kosong", m: [[2, 0], [2, 2]], calon: [[[2, 0], [2, 2]], [[0, 1], [2, 3]], [[0, 2], [2, 0]]], tiga: [4, 4, 3], total: 6 },
    { nama: "menara kecil", m: [[1, 3], [2, 1]], calon: [[[1, 3], [2, 1]], [[1, 1], [2, 4]], [[1, 2], [1, 4]]], tiga: [5, 5, 4], total: 7 },
    { nama: "contoh Anike", m: [[2, 1], [3, 4]], calon: [[[2, 1], [3, 4]], [[1, 1], [3, 4]], [[0, 2], [3, 4]]], tiga: [7, 6, 4], total: 10 },
    { nama: "belakang kosong", m: [[3, 1], [0, 2]], calon: [[[3, 1], [0, 2]], [[0, 1], [3, 4]], [[0, 1], [4, 0]]], tiga: [5, 5, 3], total: 6 },
    { nama: "silang", m: [[1, 2], [2, 1]], calon: [[[1, 2], [2, 1]], [[1, 1], [2, 2]], [[0, 1], [3, 0]]], tiga: [4, 4, 4], total: 6 },
  ];

  /* ---------- Data soal ---------- */
  cek(B.SOAL_MATRIKS.length === 6 && B.SOAL_TAMPAK.length === 6 && B.SOAL_ATAS.length === 6, "B: enam soal tiap tampilan");
  RM.forEach((r, i) => {
    const s = B.SOAL_MATRIKS[i];
    sama(s.m, r.m, `Matriks ${i}: matriks sesuai rencana`);
    cek(s.nama === r.nama, `Matriks ${i}: nama`);
    cek(kubusM(r.m).length === r.total && B.totalM(s.m) === r.total, `Matriks ${i}: total ${r.total} (cacah kubus satu per satu)`);
    sama(B.kubusMatriks(s.m).map((k) => k.join(",")).sort(), kubusM(r.m).map((k) => k.join(",")).sort(), `Matriks ${i}: kubus kode sama dengan kubus mandiri`);
    cek(s.m.length === 2 && s.m.every((b) => b.length === 2), `Matriks ${i}: dua kali dua`);
    cek(B.teksBaris(s.m, 0) === r.m[0].join(" dan ") && B.teksMatriks(s.m) === teksMandiri(r.m), `Matriks ${i}: teks baris dan matriks`);
  });
  RT.forEach((r, i) => {
    const s = B.SOAL_TAMPAK[i];
    sama(s.m, r.m, `Tampak ${i}: matriks sesuai rencana`);
    cek(s.nama === r.nama && s.arah === r.arah, `Tampak ${i}: nama dan arah`);
    const garis = [0, 1].map((k) => tinggiGaris(r.m, r.arah, k));
    sama(garis, r.garis, `Tampak ${i}: tinggi terbesar tiap garis (cacah kubus)`);
    cek(proyeksi(r.m, r.arah) === r.jumlah && B.kunciTampak(s) === r.jumlah, `Tampak ${i}: ${r.arah} ${r.jumlah} petak (proyeksi kubus dan kode)`);
    sama([0, 1].map((k) => Math.max(...B.garisTampak(s, k))), r.garis, `Tampak ${i}: terbesar tiap garis dari kode`);
    sama(B.tigaTampak(r.m), tigaMandiri(r.m), `Tampak ${i}: tiga tampak kode sama dengan proyeksi mandiri`);
  });
  cek(RT.filter((r) => r.arah === "depan").length === 3 && RT.filter((r) => r.arah === "samping").length === 3, "Tampak: tiga soal depan dan tiga samping");
  RA.forEach((r, i) => {
    const s = B.SOAL_ATAS[i];
    sama(s.m, r.m, `Atas ${i}: matriks sesuai rencana`);
    cek(s.nama === r.nama, `Atas ${i}: nama`);
    sama(tigaMandiri(r.m), r.tiga, `Atas ${i}: tiga tampak (proyeksi kubus)`);
    sama(B.tigaTampak(r.m), r.tiga, `Atas ${i}: tiga tampak dari kode`);
    sama(s.calon, r.calon, `Atas ${i}: calon susunan sesuai rencana`);
    cek(kubusM(r.m).length === r.total && B.totalM(r.m) === r.total, `Atas ${i}: total ${r.total}`);
    // Tepat satu calon cocok pada ketiga tampak; dua pengecoh cocok tepat pada dua dari tiga.
    const cocok = r.calon.map((c) => tigaMandiri(c).filter((v, q) => v === r.tiga[q]).length);
    sama(cocok, [3, 2, 2], `Atas ${i}: kunci cocok tiga tampak, dua pengecoh cocok dua tampak`);
    cek(r.calon.every((c) => c.flat().some((h) => h > 0)), `Atas ${i}: tidak ada calon kosong`);
    cek(new Set(r.calon.map(teksMandiri)).size === 3, `Atas ${i}: tiga teks calon berbeda`);
    const gagal = r.calon.slice(1).map((c) => tigaMandiri(c).findIndex((v, q) => v !== r.tiga[q]));
    cek(new Set(gagal).size >= 1 && gagal.every((g) => g >= 0), `Atas ${i}: tiap pengecoh berbeda pada satu tampak (${gagal.join()})`);
  });
  sama([0, 1].map((k) => B.namaGaris(B.SOAL_TAMPAK[0], k)).concat([0, 1].map((k) => B.namaGaris(B.SOAL_TAMPAK[3], k))), ["kiri", "kanan", "depan", "belakang"], "nama garis: kolom kiri-kanan, baris depan-belakang");
  sama(B.SOAL_ATAS[0].m, [[4]], "Atas 0: empat kubus ditumpuk");
  cek(B.tampakAtas([[4]]) === 1 && B.tampakDepan([[4]]) === 4, "empat ditumpuk: atas 1, depan 4");
  cek(B.tampakSamping([[1, 3], [2, 1]]) === 5 && B.tampakDepan([[1, 2], [3, 1]]) === 5, "contoh buku: samping 5, depan 5");
  sama([B.idMatriks(2), B.idTampak(3), B.idAtas(5)], ["matriks:2", "tampak:3", "atas:5"], "format id soal B");
  cek(B.maksKolom([[1, 2, 3], [2]]).join() === "2,2,3" && B.banyakKolom([[1, 2, 3], [2]]) === 3, "maksKolom menangani baris pendek");

  /* ---------- Pengecoh dan letak kunci ---------- */
  {
    for (const benar of [0, 1, 3, 7, 12]) for (const calon of [[], [benar], [benar, benar], [-2, 2.5]]) {
      const [p, q] = B.pengecohAngka(benar, calon);
      cek(Number.isInteger(p) && Number.isInteger(q) && p >= 0 && q >= 0 && p !== q && p !== benar && q !== benar, `B pengecohAngka(${benar}, ${JSON.stringify(calon)}) = ${p},${q}`);
    }
    for (const [benar, calon] of [[[2, 2], [[2, 2]]], [[2, 1], [[1, 2], [3, 1]]], [[0, 0], []], [[3, 4], [[3, 4], [3, 4]]]]) {
      const [p, q] = B.pengecohPasang(benar, calon);
      cek(p !== q && p !== benar.join(" dan ") && q !== benar.join(" dan "), `pengecohPasang(${benar}, ...) = ${p}; ${q}`);
    }
    sama(B.pengecohPasang([2, 1], [[1, 2], [3, 1]]), ["1 dan 2", "3 dan 1"], "pengecohPasang memakai calon pertama yang sah");
    sama(B.pengecohPasang([2, 2], [[2, 2]]), ["3 dan 2", "2 dan 3"], "pengecohPasang melewati calon sama dengan kunci");
    const pengecohMandiri = (benar, calon) => {
      const u = [];
      for (const c of [...calon, benar + 1, benar + 2, benar - 1, benar + 3, benar - 2, benar + 4]) if (Number.isInteger(c) && c >= 0 && c !== benar && u.indexOf(c) < 0) u.push(c);
      return u.slice(0, 2);
    };
    const pasangMandiri = (b, calon) => {
      const u = [];
      for (const c of [...calon, [b[0] + 1, b[1]], [b[0], b[1] + 1], [b[0] + 2, b[1]], [b[0], b[1] + 2]]) {
        const t = c.join(" dan ");
        if (t !== b.join(" dan ") && u.indexOf(t) < 0) u.push(t);
      }
      return u.slice(0, 2);
    };
    const cekPilih = (nama, p, benarNilai, seed) => {
      const opsi = p.opsi;
      cek(opsi.length === 3 && new Set(opsi).size === 3, `${nama}: tiga pilihan unik (${opsi.join(" | ")})`);
      cek(opsi[p.benar] === benarNilai && opsi.filter((o) => o === benarNilai).length === 1, `${nama}: tepat satu kunci, nilainya ${benarNilai}`);
      cek(p.benar === posisiRotasi(0, seed), `${nama}: letak kunci eksak ${posisiRotasi(0, seed)}, bukan ${p.benar}`);
      return opsi.filter((o) => o !== benarNilai);
    };
    const cekPeng = (nama, peng, benar, calon) => sama([...peng].sort(), [...pengecohMandiri(benar, calon)].sort(), `${nama}: pengecoh persis dari calon kebiasaan salah`);
    const letak = { depan: [], belakang: [], total: [], garis0: [], garis1: [], jumlah: [], atas: [], totalAtas: [], rekon: [] };
    for (let i = 0; i < 6; i += 1) {
      const a = RM[i];
      const [b0, b1] = a.m;
      let p = cekPilih(`Matriks ${i} depan`, B.opsiDepanM(i), b0.join(" dan "), i);
      sama([...p].sort(), [...pasangMandiri(b0, [[...b0].reverse(), [b0[0] + 1, b0[1]]])].sort(), `Matriks ${i} depan: pengecoh persis`);
      p = cekPilih(`Matriks ${i} belakang`, B.opsiBelakangM(i), b1.join(" dan "), i + 1);
      sama([...p].sort(), [...pasangMandiri(b1, [[...b1].reverse(), [b1[0], b1[1] + 1]])].sort(), `Matriks ${i} belakang: pengecoh persis`);
      p = cekPilih(`Matriks ${i} total`, B.opsiTotalM(i), a.total, i + 2);
      cekPeng(`Matriks ${i} total`, p, a.total, [b0.reduce((s, v) => s + v, 0), b1.reduce((s, v) => s + v, 0), a.total + 1]);
      const t = RT[i];
      for (const k of [0, 1]) {
        const g = t.arah === "depan" ? [t.m[0][k], t.m[1][k]] : t.m[k];
        p = cekPilih(`Tampak ${i} garis ${k}`, B.opsiGaris(i, k), t.garis[k], i + k);
        cekPeng(`Tampak ${i} garis ${k}`, p, t.garis[k], [g[0] + g[1], Math.min(...g), g[0]]);
        letak[`garis${k}`].push(B.opsiGaris(i, k).benar);
      }
      const lain = t.arah === "depan" ? proyeksi(t.m, "samping") : proyeksi(t.m, "depan");
      const kecil = Math.min(t.arah === "depan" ? t.m[0][0] : t.m[0][0], t.arah === "depan" ? t.m[1][0] : t.m[0][1]);
      void kecil;
      const minGaris = [0, 1].map((k) => Math.min(...(t.arah === "depan" ? [t.m[0][k], t.m[1][k]] : t.m[k]))).reduce((s, v) => s + v, 0);
      const semua = t.m.flat().reduce((s, v) => s + v, 0);
      p = cekPilih(`Tampak ${i} jumlah`, B.opsiJumlahTampak(i), t.jumlah, i + 2);
      cekPeng(`Tampak ${i} jumlah`, p, t.jumlah, [semua, lain, minGaris]);
      const u = RA[i];
      p = cekPilih(`Atas ${i} atas`, B.opsiAtas(i), u.tiga[2], i);
      cekPeng(`Atas ${i} atas`, p, u.tiga[2], [u.total, u.tiga[0], u.tiga[1]]);
      p = cekPilih(`Atas ${i} total`, B.opsiTotalAtas(i), u.total, i + 1);
      cekPeng(`Atas ${i} total`, p, u.total, [u.tiga[2], u.tiga[0], u.total + 1]);
      p = cekPilih(`Atas ${i} rekonstruksi`, B.opsiRekonstruksi(i), teksMandiri(u.calon[0]), i + 2);
      sama(sortir(p), sortir([teksMandiri(u.calon[1]), teksMandiri(u.calon[2])]), `Atas ${i} rekonstruksi: pengecoh adalah dua calon yang cocok dua tampak`);
      letak.depan.push(B.opsiDepanM(i).benar);
      letak.belakang.push(B.opsiBelakangM(i).benar);
      letak.total.push(B.opsiTotalM(i).benar);
      letak.jumlah.push(B.opsiJumlahTampak(i).benar);
      letak.atas.push(B.opsiAtas(i).benar);
      letak.totalAtas.push(B.opsiTotalAtas(i).benar);
      letak.rekon.push(B.opsiRekonstruksi(i).benar);
    }
    for (const [nama, daftar] of Object.entries(letak)) cek(new Set(daftar).size === 3, `B letak kunci ${nama} memakai ketiga posisi (${daftar.join("")})`);
  }

  /* ---------- Alur tiap soal ---------- */
  const AKS = {
    matriks: { data: "M_DATA", tahap: ["M_DEPAN", "M_BELAKANG", "M_TOTAL"], kunci: [B.opsiDepanM, B.opsiBelakangM, B.opsiTotalM] },
    tampak: { data: "T_DATA", tahap: ["T_PERTAMA", "T_KEDUA", "T_JUMLAH"], kunci: [(i) => B.opsiGaris(i, 0), (i) => B.opsiGaris(i, 1), B.opsiJumlahTampak] },
    atas: { data: "U_DATA", tahap: ["U_ATAS", "U_TOTAL", "U_REKON"], kunci: [B.opsiAtas, B.opsiTotalAtas, B.opsiRekonstruksi] },
  };
  {
    for (const [nama, def] of Object.entries(AKS)) {
      for (let i = 0; i < 6; i += 1) {
        let x = LB(xb0, { t: def.data, i });
        cek(x[nama].data === i && x[nama].tahap === 0 && x.pesan === "", `B ${nama} ${i}: memilih soal mengatur tahap awal`);
        for (let tahap = 0; tahap < 3; tahap += 1) {
          const kunci = def.kunci[tahap](i).benar;
          for (const o of [0, 1, 2].filter((v) => v !== kunci)) {
            const y = LB(x, { t: def.tahap[tahap], o });
            globalThis.__pesanB.push(y.pesan);
            cek(y[nama].tahap === tahap && y[nama].data === i && y.pernah.length === 0 && !y.pesan.startsWith("✅") && y.pesan.length > 10, `B ${nama} ${i} tahap ${tahap}: pilihan salah ${o} tidak maju dan diberi petunjuk`);
          }
          if (tahap < 2) {
            const lompat = LB(x, { t: def.tahap[tahap + 1], o: def.kunci[tahap + 1](i).benar });
            globalThis.__pesanB.push(lompat.pesan);
            cek(lompat[nama].tahap === tahap && lompat.pernah.length === 0 && !lompat.pesan.startsWith("✅"), `B ${nama} ${i} tahap ${tahap}: melompat ke tahap ${tahap + 1} ditolak`);
          }
          for (const o of [0.5, 1.5, -1, 3, 99, NaN, Infinity, "1", null, undefined]) cek(LB(x, { t: def.tahap[tahap], o }) === x, `B ${nama} ${i} tahap ${tahap}: indeks ${String(o)} diabaikan`);
          x = LB(x, { t: def.tahap[tahap], o: kunci });
          globalThis.__pesanB.push(x.pesan);
          cek(x[nama].tahap === tahap + 1 && x.pesan.startsWith("✅"), `B ${nama} ${i} tahap ${tahap}: jawaban benar maju dengan pesan sukses`);
          cek(tahap < 2 ? x.pernah.length === 0 : x.pernah.length === 1 && x.pernah[0] === `${nama}:${i}`, `B ${nama} ${i} tahap ${tahap}: riwayat hanya dicatat di langkah terakhir`);
        }
        for (let tahap = 0; tahap < 3; tahap += 1) cek(LB(x, { t: def.tahap[tahap], o: def.kunci[tahap](i).benar }) === x, `B ${nama} ${i}: sesudah selesai aksi tahap ${tahap} diabaikan`);
        const ulang = LB(x, { t: def.data, i });
        cek(ulang[nama].tahap === 0 && ulang.pernah.includes(`${nama}:${i}`), `B ${nama} ${i}: memilih soal lagi mengulang tahap tetapi riwayat tetap`);
        for (const lain of Object.keys(AKS).filter((v) => v !== nama)) cek(x[lain].tahap === 0 && x[lain].data === 0, `B ${nama} ${i}: tampilan ${lain} tidak berubah`);
      }
      for (const i of [-1, 6, 2.5, NaN, "2", null]) cek(LB(xb0, { t: def.data, i }) === xb0, `B ${nama}: soal ${String(i)} diabaikan`);
    }
    let y = xb0;
    for (const [nama, def] of Object.entries(AKS)) for (let i = 0; i < 6; i += 1) {
      y = LB(y, { t: def.data, i });
      for (let tahap = 0; tahap < 3; tahap += 1) y = LB(y, { t: def.tahap[tahap], o: def.kunci[tahap](i).benar });
    }
    sama([...y.pernah].sort(), [...Array(6).keys()].flatMap((i) => [`matriks:${i}`, `tampak:${i}`, `atas:${i}`]).sort(), "B: semua 18 soal selesai, riwayat 18 id");
    cek(LB(y, { t: "RESET" }).pernah.length === 0 && LB(LB(xb0, { t: "M_DEPAN", o: 0 }), { t: "PESAN_KOSONG" }).pesan === "", "B: reset dan pesan kosong");
    const kb = B.keadaanTampakK6B3B(y);
    cek(kb.alat === "tampak" && kb.pernah === y.pernah, "B: keadaan lapor memakai alat tampak");
  }

  /* ---------- Fuzz 20.000 aksi dengan orakel mandiri ---------- */
  {
    const acak = acakDari(20260714);
    const NAMA = ["matriks", "tampak", "atas"];
    const posisiNilai = (opsi, nilai) => opsi.indexOf(nilai);
    const nilaiKunci = (nama, i, tahap) => {
      if (nama === "matriks") {
        const m = RM[i].m;
        return [m[0].join(" dan "), m[1].join(" dan "), kubusM(m).length][tahap];
      }
      if (nama === "tampak") {
        const t = RT[i];
        return [tinggiGaris(t.m, t.arah, 0), tinggiGaris(t.m, t.arah, 1), proyeksi(t.m, t.arah)][tahap];
      }
      const u = RA[i];
      return [proyeksi(u.m, "atas"), kubusM(u.m).length, teksMandiri(u.calon[0])][tahap];
    };
    const daftarOpsi = (nama, i, tahap) => AKS[nama].kunci[tahap](i).opsi;
    const o = { matriks: { data: 0, tahap: 0 }, tampak: { data: 0, tahap: 0 }, atas: { data: 0, tahap: 0 }, pernah: new Set() };
    let x = xb0;
    let ok = true;
    let pernahTerbesar = 0;
    const selesaiPer = { matriks: 0, tampak: 0, atas: 0 };
    const nilaiAcak = () => [0, 1, 2, 0.5, 1.5, -1, 3, 7, NaN, "1", null][acak(11)];
    for (let n = 0; n < 20000; n += 1) {
      const nama = NAMA[acak(3)];
      const def = AKS[nama];
      let a;
      const jenis = acak(10);
      if (jenis === 0) a = { t: def.data, i: [0, 1, 2, 3, 4, 5, -1, 6, 2.5, NaN][acak(10)] };
      else if (jenis === 1) a = { t: "PESAN_KOSONG" };
      else if (jenis === 2 && acak(8) === 0) a = { t: "RESET" };
      else if (jenis <= 5) {
        const tahap = Math.min(o[nama].tahap, 2);
        a = { t: def.tahap[tahap], o: posisiNilai(daftarOpsi(nama, o[nama].data, tahap), nilaiKunci(nama, o[nama].data, tahap)) };
      } else a = { t: def.tahap[acak(3)], o: nilaiAcak() };

      const sebelum = x;
      let maju = false;
      let diabaikan = false;
      let kosong = false;
      if (a.t === def.data) {
        if (Number.isInteger(a.i) && a.i >= 0 && a.i < 6) o[nama] = { data: a.i, tahap: 0 };
        else diabaikan = true;
      } else if (a.t === "PESAN_KOSONG") kosong = true;
      else if (a.t === "RESET") {
        o.matriks = { data: 0, tahap: 0 };
        o.tampak = { data: 0, tahap: 0 };
        o.atas = { data: 0, tahap: 0 };
        o.pernah = new Set();
        kosong = true;
      } else {
        const s = def.tahap.indexOf(a.t);
        if (!(Number.isInteger(a.o) && a.o >= 0 && a.o <= 2)) diabaikan = true;
        else if (o[nama].tahap > s) diabaikan = true;
        else if (o[nama].tahap === s) {
          if (daftarOpsi(nama, o[nama].data, s)[a.o] === nilaiKunci(nama, o[nama].data, s)) {
            o[nama].tahap += 1;
            maju = true;
            if (s === 2) {
              o.pernah.add(`${nama}:${o[nama].data}`);
              selesaiPer[nama] += 1;
            }
          }
        }
      }
      x = LB(x, a);
      globalThis.__pesanB.push(x.pesan);
      if (diabaikan && a.t !== def.data && x !== sebelum) {
        ok = false;
        console.log("fuzz B: aksi yang seharusnya diabaikan mengubah keadaan", n, JSON.stringify(a));
      }
      if (a.t === "RESET") ok = ok && x.pernah.length === 0 && x.pesan === "";
      else cek(x.pernah.length >= sebelum.pernah.length, `fuzz B ${n}: riwayat tidak dicabut`);
      const cocok = NAMA.every((k) => x[k].data === o[k].data && x[k].tahap === o[k].tahap) && JSON.stringify([...x.pernah].sort()) === JSON.stringify([...o.pernah].sort());
      if (!cocok) {
        ok = false;
        console.log("fuzz B beda dari orakel di langkah", n, JSON.stringify(a), JSON.stringify(x), JSON.stringify({ ...o, pernah: [...o.pernah] }));
        break;
      }
      if (maju) cek(x.pesan.startsWith("✅"), `fuzz B ${n}: langkah benar diawali pesan sukses`);
      else if (!diabaikan && !kosong && a.t !== def.data) cek(!x.pesan.startsWith("✅"), `fuzz B ${n}: langkah belum benar bukan pesan sukses`);
      if (kosong) cek(x.pesan === "", `fuzz B ${n}: pesan dikosongkan`);
      cek(NAMA.every((k) => x[k].tahap >= 0 && x[k].tahap <= 3), `fuzz B ${n}: tahap dalam batas`);
      pernahTerbesar = Math.max(pernahTerbesar, x.pernah.length);
    }
    cek(ok, "fuzz B 20.000 aksi: keadaan sama dengan orakel mandiri");
    cek(selesaiPer.matriks > 10 && selesaiPer.tampak > 10 && selesaiPer.atas > 10, `fuzz B: tiap tampilan selesai berkali-kali (${selesaiPer.matriks}, ${selesaiPer.tampak}, ${selesaiPer.atas})`);
    cek(pernahTerbesar >= 6, `fuzz B: riwayat pernah mencapai ${pernahTerbesar}`);
    cek(x.pernah.every((v) => /^(matriks|tampak|atas):[0-5]$/.test(v)), "fuzz B: semua id riwayat berbentuk sah");
  }

  /* ---------- Mesin ---------- */
  {
    const def = MT.MESIN_TAMPAK;
    cek(def.stasiun.length === 4 && def.kasus.length === 3, `${def.id}: empat stasiun, tiga kasus`);
    sama(def.stasiun.map((s) => s.id), ["matriks", "depan", "samping", "atas"], "stasiun mesin B");
    const posisi = [];
    for (const kasus of def.kasus) {
      cek(kasus.langkah.length === 4, `${def.id}/${kasus.id}: empat langkah`);
      kasus.langkah.forEach((l, i) => {
        cek(l.stasiun === def.stasiun[i].id, `${def.id}/${kasus.id}: langkah ${i + 1} di stasiun ${def.stasiun[i].id}`);
        cek(l.opsi.length === 3 && new Set(l.opsi).size === 3 && l.opsi.filter((q) => q === l.benar).length === 1, `${def.id}/${kasus.id}/${l.stasiun}: tiga pilihan unik, satu kunci`);
        cek(l.opsi.every((q) => /^\d+$/.test(q)), `${def.id}/${kasus.id}/${l.stasiun}: pilihan berupa bilangan bulat`);
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
    cek(x.selesai && def.selesaiId === K3.ID_MESIN_K6B3.B, `${def.id}: bisa diselesaikan, id selesai sesuai misi`);
    const y = ME.awalMesin(def);
    const l0 = ME.langkahAktif(y);
    const z = ME.langkahMesin(y, { t: "JAWAB", nilai: l0.opsi.find((q) => q !== l0.benar) });
    cek(z.ke === 0 && z.ditolak === 1 && z.pesan === l0.petunjuk, `${def.id}: jawaban salah ditolak dengan petunjuk`);
    const RENCANA_M = [
      { id: "susunan", m: [[2, 1], [3, 4]] },
      { id: "tumpukan", m: [[4]] },
      { id: "pagar", m: [[2, 0], [2, 2]] },
    ];
    sama(MT.KASUS_TAMPAK.map((k) => [k.id, k.m]), RENCANA_M.map((r) => [r.id, r.m]), "Mesin B: data tiga kasus sesuai rencana");
    for (const [i, r] of RENCANA_M.entries()) {
      const c = def.kasus[i];
      const [ma, de, sa, at] = c.langkah;
      const [d, s, a] = tigaMandiri(r.m);
      cek(ma.benar === String(kubusM(r.m).length) && ma.tanya.includes(teksMandiri(r.m).replace(/(^|, )(depan|belakang)/g, "$1baris $2")), `Mesin B ${r.id}: seluruh kubus ${kubusM(r.m).length} (cacah mandiri), matriks dibacakan`);
      cek(de.benar === String(d), `Mesin B ${r.id}: tampak depan ${d} (proyeksi mandiri)`);
      cek(sa.benar === String(s), `Mesin B ${r.id}: tampak samping ${s}`);
      cek(at.benar === String(a), `Mesin B ${r.id}: tampak atas ${a}`);
      cek(de.opsi.includes(String(kubusM(r.m).length)) || kubusM(r.m).length === d, `Mesin B ${r.id}: pengecoh depan memuat seluruh kubus (jumlah mentah)`);
      cek(c.ringkas.includes(`${kubusM(r.m).length} kubus`) && c.ringkas.toLowerCase().includes(`tampak depan ${d} petak`) && c.ringkas.toLowerCase().includes(`tampak samping ${s} petak`) && c.ringkas.toLowerCase().includes(`tampak atas ${a} petak`), `Mesin B ${r.id}: ringkas memuat semua hasil`);
      for (const l of c.langkah) cek(l.petunjuk.length > 15, `Mesin B ${r.id}/${l.stasiun}: petunjuk ada`);
    }
  }

  /* ---------- Skenario ---------- */
  {
    const S = SK.SKENARIO_K6B3B;
    cek(S.adegan.length >= 5 && S.adegan.length <= 8, `${S.id}: 5 sampai 8 adegan`);
    cek(S.adegan[0].jenis === "narasi" && S.adegan[S.adegan.length - 1].jenis === "akhir", `${S.id}: buka dan tutup`);
    cek(new Set(S.adegan.map((a) => a.jenis)).size >= 4, `${S.id}: paling sedikit empat jenis adegan`);
    const semuaTeks = [];
    for (const a of S.adegan) {
      semuaTeks.push(a.cerita);
      for (const q of a.opsi ?? []) semuaTeks.push(q.teks, q.umpan);
      for (const q of a.soal ?? []) semuaTeks.push(q.teks, ...q.opsi);
      for (const f of ["tanya", "sukses", "salah", "kurang", "lebih"]) if (a[f]) semuaTeks.push(a[f]);
    }
    cek(semuaTeks.every(tanpaAngka), `${S.id}: semua teks dapat dieja`);
    sama(S.id.replace(/-k6b3$/, "").replace(/-tampak$/, "-tampak"), K3.ID_SKENARIO_K6B3.B, "id skenario B sesuai id misi");
    const adegan = (id) => S.adegan.find((a) => a.id === id);
    const m0 = [[2, 1], [3, 4]];
    const tiga = adegan("tiga-arah");
    cek(tiga.opsi.length === 3 && tiga.opsi.filter((o) => o.benar).length === 1 && tiga.opsi.find((o) => o.benar).teks.startsWith("Hanya petak yang terisi"), "tiga-arah: dari atas hanya petak terisi");
    const hitung = adegan("hitung");
    cek(hitung.jumlah === 4 && hitung.objek === "stik" && proyeksi([[4]], "atas") === 1 && hitung.sukses.includes("4 kubus") && hitung.sukses.includes("1 petak"), "hitung: ketuk 4 stik, dari atas 1 petak (proyeksi mandiri)");
    const matriks = adegan("matriks");
    cek(matriks.soal[0].jawaban === String(kubusM(m0).length) && matriks.soal[1].jawaban === String(proyeksi(m0, "atas")), "matriks: 10 kubus dan 4 petak dari atas (cacah mandiri)");
    cek(matriks.cerita.includes("baris depan 2 dan 1") && matriks.cerita.includes("baris belakang 3 dan 4") && matriks.sukses.includes("2 + 1 + 3 + 4 = 10"), "matriks: cerita dan sukses cocok");
    const maks = adegan("maks");
    cek(maks.soal[0].jawaban === String(tinggiGaris([[2], [3]], "depan", 0)) && maks.soal[1].jawaban === String(proyeksi(m0, "depan")), "maks: kolom kiri 3 dan tampak depan 7 (proyeksi mandiri)");
    cek(maks.sukses.includes("7 petak") && maks.soal[1].teks.includes("kolom kiri 3 dan kolom kanan 4"), "maks: sukses dan teks cocok");
    for (const q of [...matriks.soal, ...maks.soal]) cek(q.opsi.length === 3 && q.opsi.filter((o) => o === q.jawaban).length === 1 && new Set(q.opsi).size === 3, `soal "${q.teks}": tiga pilihan satu kunci`);
    const salah = adegan("salah");
    cek(salah.opsi.length === 3 && salah.opsi.filter((o) => o.benar).length === 1 && salah.cerita.includes("10") && salah.opsi.find((o) => o.benar).umpan.includes("3 + 4 = 7"), "salah: jumlah semua tinggi 10, tampak depan 7");
    const warna = adegan("warna");
    cek(warna.target === proyeksi(m0, "depan") && warna.maks > warna.target && warna.objek === "stik" && warna.sukses.includes("3 + 4 = 7"), "warna: 7 stik untuk tampak depan");
    const posisiPilih = S.adegan.filter((a) => a.jenis === "pilih").map((a) => a.opsi.findIndex((o) => o.benar));
    cek(posisiPilih.length === 2 && new Set(posisiPilih).size === posisiPilih.length, `letak jawaban pilih bervariasi (${posisiPilih.join("")})`);
    const ps = [...matriks.soal, ...maks.soal].map((q) => q.opsi.indexOf(q.jawaban));
    cek(ps.every((p) => p >= 0) && new Set(ps).size >= 2, `letak jawaban soal bervariasi (${ps.join("")})`);
    cek(S.adegan.filter((a) => a.jenis === "pilih").every((a) => a.opsi.length === 3 && a.opsi.filter((o) => o.benar).length === 1), "setiap pilih: tiga opsi, satu benar");
    const metode = S.adegan.map((a) => a.cerita).join(" ");
    cek(adegan("tiga-arah").cerita.includes("Orthographic Projection Protocol") && adegan("matriks").cerita.includes("Height-Matrix Silhouette") && adegan("maks").cerita.includes("Occlusion Max Rule"), "tiap metode luar berlabel di adegannya");
    cek(/Orthographic Projection Protocol/.test(metode) && /Height-Matrix Silhouette/.test(metode) && /Occlusion Max Rule/.test(metode), "skenario memuat tiga metode luar berlabel");
  }

  /* ---------- Misi ---------- */
  {
    const daftar = K3.daftarMisiK6Bab3("B");
    cek(K3.daftarMisiK6Bab3("B") === K3.MISI_B && TK.hurufK6B3("B") === "B", "huruf B memakai misi B");
    cek(TK.misiAwalK6Bab3("B").startsWith("Simulasi 1. Misi: ") && tanpaAngka(TK.misiAwalK6Bab3("B")) && tanpaAngka(TK.NAMA_SIM_K6B3.B), "misi awal B dan dapat dieja");
    cek(daftar.filter((m) => m.wajib).length === 7 && daftar.filter((m) => !m.wajib).length === 3, "B: tujuh misi wajib dan tiga tantangan bebas");
    cek(new Set(daftar.map((m) => m.id)).size === 10 && daftar.every((m) => m.id.startsWith("b-")), "B: id misi unik berawalan huruf");
    const kosong = [{ alat: "tampak", pernah: [] }, { alat: "lain", pernah: [] }, sel("tidak-ada"), B.keadaanTampakK6B3B(B.awalTampakK6B3B()), { alat: "susunan", pernah: ["susun:1", "lapisan:0", "lapisan:2", "penyangga:0", "penyangga:1"] }, sel(K3.ID_MESIN_K6B3.A), sel(K3.ID_SKENARIO_K6B3.A)];
    cek(kosong.every((k) => M0.misiBaru(daftar, k, new Set()).length === 0), "B: keadaan awal dan riwayat alat lain tidak memenuhi misi mana pun");
    const baru = (k) => M0.misiBaru(daftar, k, new Set());
    cek(baru(sel(K3.ID_MESIN_K6B3.B)).join() === "b-mesin" && baru(sel(K3.ID_SKENARIO_K6B3.B)).join() === "b-skenario", "B: id mesin dan skenario memenuhi misinya");
    cek(baru(sel(K3.ID_MESIN_K6B3.A)).length === 0 && baru(sel(K3.ID_SKENARIO_K6B3.A)).length === 0, "B: id mesin dan skenario A tidak memenuhi misi B");
    const SB = (...id) => ({ alat: "tampak", pernah: id });
    const harap = {
      "b-matriks": ["matriks:0"],
      "b-depan": ["tampak:0"],
      "b-samping": ["tampak:3"],
      "b-atas": ["atas:0"],
      "b-rekonstruksi": ["atas:3"],
    };
    for (const [id, perlu] of Object.entries(harap)) {
      const m = daftar.find((v) => v.id === id);
      cek(m.wajib && m.cek(SB(...perlu)), `${id}: terpenuhi oleh ${perlu.join()}`);
      cek(!m.cek({ alat: "lain", pernah: perlu }) && !m.cek({ alat: "susunan", pernah: perlu }), `${id}: alat lain dengan id sama tidak memenuhi`);
      cek(!m.cek(sel(perlu[0])), `${id}: keadaan selesai dengan id sama tidak memenuhi`);
      const [tamp, nomor] = perlu[0].split(":");
      for (let j = 0; j < 6; j += 1) if (j !== Number(nomor)) cek(!m.cek(SB(`${tamp}:${j}`)), `${id}: soal ${tamp}:${j} saja tidak memenuhi`);
      for (const lain of ["matriks", "tampak", "atas"].filter((v) => v !== tamp)) cek(!m.cek(SB(`${lain}:${nomor}`)), `${id}: ${lain}:${nomor} saja tidak memenuhi`);
      cek(!m.cek(SB()), `${id}: riwayat kosong tidak memenuhi`);
    }
    for (const tamp of ["matriks", "tampak", "atas"]) for (let j = 0; j < 6; j += 1) {
      const dipenuhi = daftar.filter((m) => m.wajib && !["b-mesin", "b-skenario"].includes(m.id) && m.cek(SB(`${tamp}:${j}`))).map((m) => m.id);
      const tunggu = Object.entries(harap).filter(([, p]) => p[0] === `${tamp}:${j}`).map(([id]) => id);
      sama(dipenuhi, tunggu, `misi B terpenuhi oleh ${tamp}:${j} saja`);
    }
    for (const [id, tamp] of [["b-matriks-semua", "matriks"], ["b-tampak-semua", "tampak"], ["b-atas-semua", "atas"]]) {
      const m = daftar.find((v) => v.id === id);
      const semua = [0, 1, 2, 3, 4, 5].map((j) => `${tamp}:${j}`);
      cek(!m.wajib && m.cek(SB(...semua)), `${id}: terpenuhi oleh keenam soal`);
      for (let j = 0; j < 6; j += 1) cek(!m.cek(SB(...semua.filter((_, q) => q !== j))), `${id}: tanpa soal ${j} belum terpenuhi`);
      cek(!m.cek(SB(...[0, 1, 2, 3, 4, 5].map((j) => `${["matriks", "tampak", "atas"].find((v) => v !== tamp)}:${j}`))), `${id}: keenam soal tampilan lain tidak memenuhi`);
    }
    const tampil = M0.tampilMisi(daftar);
    const wajibIds = daftar.filter((m) => m.wajib).map((m) => m.id);
    cek(!M0.wajibSelesai(tampil, new Set(wajibIds.slice(0, 6))) && M0.wajibSelesai(tampil, new Set(wajibIds)), "B: tujuh wajib membuka gerbang, enam belum");
    const dicapai = new Set();
    M0.laporMisi(daftar, SB("matriks:0"), (id) => dicapai.add(id));
    M0.laporMisi(daftar, SB(), (id) => dicapai.add(id));
    cek(dicapai.size === 1 && dicapai.has("b-matriks"), "laporMisi B: hanya misi yang terpenuhi yang dicapai");
    cek(daftar.every((m) => tanpaAngka(m.teks) && !/\d/.test(m.teks)), "teks tiap misi B dapat dieja dan tanpa angka");
  }

  /* ---------- Data ringkas B ---------- */
  {
    const b = ringkas.subBab.B;
    sama(periksaDataPeta(b.peta), [], "ringkas B: peta sah");
    sama(periksaDataInfografis(b.infografis), [], "ringkas B: infografis sah");
    cek(b.peta.cabang.length >= 3 && b.peta.cabang.length <= 4, `ringkas B: ${b.peta.cabang.length} cabang`);
    cek(b.peta.cabang.every((c) => b.peta.kartu.filter((k) => k.cabang === c.id).length >= 2), "ringkas B: tiap cabang punya paling sedikit dua kartu");
    cek(b.infografis.panel.length <= 3, "ringkas B: infografis paling banyak tiga panel");
    for (const p of b.infografis.panel) {
      cek(p.ide.split(/\s+/).length <= 8, `ringkas B: ide ${p.id} paling banyak 8 kata`);
      for (const q of p.butir ?? []) cek(q.isi.split(/\s+/).length <= 8, `ringkas B: ringkas ${p.id}/${q.id} paling banyak 8 kata`);
    }
    for (const c of b.peta.cabang) cek(c.ringkas.split(/\s+/).length <= 8, `ringkas B: cabang ${c.id} ringkas paling banyak 8 kata`);
    const teksSuara = [];
    JSON.stringify(b, (k, v) => {
      if (k === "suara" && typeof v === "string") teksSuara.push(v);
      return v;
    });
    cek(teksSuara.every(tanpaAngka), "ringkas B: semua suara dapat dieja");
  }

  /* ---------- Konsep Sub-Bab C tidak bocor ke Sub-Bab B ---------- */
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
    // Sub-Bab B hanya membahas matriks tinggi, tampak, dan susunan yang cocok. Koordinat huruf-angka, lokasi, jarak, dan jalur (Sub-Bab C) belum boleh muncul.
    const BOCOR_B = /(\bkoordinat|\blokasi|\bhuruf\b|\bjarak|manhattan|\bjalur|\bdenah|\bgrid\b|\bdiagonal|shortest|naming|\bselisih|\blangkah minimal|\bpetak [A-H]\b)/i;
    const BOCOR_B_PETAK = /\b[A-H][1-9]\b/;
    const catat = (teks, apa) => {
      const m = BOCOR_B.exec(teks) ?? BOCOR_B_PETAK.exec(teks);
      cek(!m, `B: ${apa} bebas konsep koordinat, lokasi, jarak, dan jalur (${m ? m[0] : ""} di "${String(teks).slice(Math.max(0, (m?.index ?? 0) - 30), (m?.index ?? 0) + 40)}")`);
    };
    for (const t of [TK.MISI_K6B3.B, TK.NAMA_SIM_K6B3.B, ...K3.MISI_B.map((m) => m.teks)]) catat(t, "teks misi");
    for (const [nama, o] of [["mesin", MT.MESIN_TAMPAK], ["skenario", SK.SKENARIO_K6B3B], ["peta dan infografis ringkas", ringkas.subBab.B]]) catat(teksDari(o), nama);
    for (const [f, e] of [["SimulasiLabTampakK6B3", "tsx"], ["model-tampak-k6b3", "tsx"], ["lab-tampak-k6b3b", "ts"], ["mesin-tampak-k6b3", "ts"]]) catat(tanpaKomentar(baca(f, e)).replace(/ ([-=+] |=> )/g, " "), `${f} (tanpa komentar)`);
    for (const p of globalThis.__pesanB) catat(p, "pesan lab dari fuzz");
    for (const u of [B.ucapMatriksK6B3B(xb0), B.ucapTampakK6B3B(xb0), B.ucapAtasK6B3B(xb0)]) catat(u, "ucapan lab");
    cek(globalThis.__pesanB.length > 20000, `pesan fuzz B terkumpul (${globalThis.__pesanB.length})`);
    cek(globalThis.__pesanB.every((p) => typeof p === "string" && !/\d[.,]\d/.test(p)), "pesan lab B: hanya bilangan bulat");
    cek(globalThis.__pesanB.every((p) => !p.startsWith("✅") || /✅ /.test(p)), "pesan sukses B: ✅ diikuti spasi");
    for (const f of ["SimulasiLabTampakK6B3", "model-tampak-k6b3"]) {
      const s = baca(f, "tsx");
      cek(!/correct_index|explanation/.test(s), `${f}: tidak memuat correct_index atau explanation`);
      cek(!/fetch\(|XMLHttpRequest|api\/|openai|anthropic|gemini/i.test(s), `${f}: tanpa jaringan atau model bahasa`);
    }
    for (const f of ["lab-tampak-k6b3b", "mesin-tampak-k6b3"]) {
      const s = baca(f, "ts");
      cek(!/fetch\(|XMLHttpRequest|from "react"|openai|anthropic|gemini|correct_index|explanation/i.test(s), `${f}: murni`);
      cek((s.match(/^import .+$/gm) ?? []).every((l) => l.startsWith("import type")), `${f}: hanya mengimpor tipe`);
    }
    cek((baca("lab-tampak-k6b3b", "ts").match(/^import /gm) ?? []).length === 0, "lab B tanpa impor sama sekali");
    {
      const s = tanpaKomentar(baca("lab-tampak-k6b3b", "ts"));
      cek(!/\.toFixed|parseFloat|Math\.(round|floor|ceil|random)|\d\.\d/.test(s), "logika lab B: hanya bilangan bulat");
      const m = tanpaKomentar(baca("mesin-tampak-k6b3", "ts"));
      cek(!/\.toFixed|parseFloat|Math\.(round|floor|ceil|random)|\d\.\d/.test(m), "logika mesin B: hanya bilangan bulat");
    }
    {
      const s = baca("SimulasiLabTampakK6B3", "tsx");
      cek(/useEffect\(\(\) => \{\s*onKeadaan\?\.\(keadaan\w+\(x\)\);\s*\}, \[onKeadaan, x\]\);/.test(s), "lab B: lapor keadaan lewat useEffect");
      cek(/setLihat\(v\);\s*kirim\(\{ t: "PESAN_KOSONG" \}\);/.test(s), "lab B: ganti tampilan mengosongkan pesan");
      const catatan = [...s.matchAll(/^\s*"([^"]+)",$/gm)].map((m) => m[1]);
      cek(catatan.length >= 3 && catatan.every(tanpaAngka), "lab B: Coba ini dapat dieja");
      for (const awalan of ["Baris depan", "Baris belakang", "Seluruh kubus", "Petak tampak", "Petak terisi", "Susunan"]) cek(s.includes(`awalan="${awalan}"`), `lab B: pilihan berlabel ${awalan}`);
      cek(s.includes("awalan={`Tinggi ${kataGaris} ${namaGaris(ta, 0)}`}") && s.includes("awalan={`Tinggi ${kataGaris} ${namaGaris(ta, 1)}`}"), "lab B: pilihan tinggi garis berlabel");
      for (const awalan of ["Pilih soal matriks ", "Pilih soal tampak ", "Pilih soal atas "]) cek(s.includes(`label={\`${awalan}`), `lab B: pilihan soal berlabel ${awalan.trim()}`);
      for (const t of [0, 1, 2]) cek(new RegExp(`x\\.matriks\\.tahap === ${t} \\?`).test(s) && new RegExp(`x\\.tampak\\.tahap === ${t} \\?`).test(s) && new RegExp(`x\\.atas\\.tahap === ${t} \\?`).test(s), `lab B: pertanyaan tahap ${t} di tiga tampilan`);
      for (const aksi of ["M_DATA", "M_DEPAN", "M_BELAKANG", "M_TOTAL", "T_DATA", "T_PERTAMA", "T_KEDUA", "T_JUMLAH", "U_DATA", "U_ATAS", "U_TOTAL", "U_REKON", "RESET"]) cek(s.includes(`t: "${aksi}"`), `lab B: aksi ${aksi} terhubung ke tombol`);
      cek(/x\.atas\.tahap !== 2 \?/.test(s) && /x\.tampak\.tahap === 3 \? <Tampak/.test(s), "lab B: susunan kunci disembunyikan saat rekonstruksi, tampak muncul setelah selesai");
      const m = baca("model-tampak-k6b3", "tsx");
      cek(/role="img"/.test(m) && /aria-label=\{label\}/.test(m) && /aria-label=\{`\$\{NAMA_ARAH\[arah\]\}: \$\{petak\.length\} petak`\}/.test(m), "model B: gambar kubus, kisi, dan tampak berlabel");
      cek(m.includes("max-w-[240px]") && !/(?<!max-)\bw-\[\d{3,}px\]/.test(m), "model B: gambar dibatasi dan tanpa lebar tetap besar");
      // Petak tampak di model dihitung dari himpunan petak kubus satu per satu: samakan dengan proyeksi mandiri.
    }
    const ucapan = [];
    for (let i = 0; i < 6; i += 1) ucapan.push(B.ucapMatriksK6B3B(LB(xb0, { t: "M_DATA", i })), B.ucapTampakK6B3B(LB(xb0, { t: "T_DATA", i })), B.ucapAtasK6B3B(LB(xb0, { t: "U_DATA", i })));
    cek(ucapan.length === 18 && ucapan.every(tanpaAngka), `semua ${ucapan.length} ucapan lab B dieja menjadi kata`);
    cek(ucapan.every((u) => /kubus|tampak|tinggi/.test(EJ.ejaK6B3(u))), "ucapan lab B memuat kata kubus, tampak, atau tinggi");
  }
}

/* ============================== Sub-Bab C: Lab Petak ============================== */
{
  const LC = C.langkahPetakK6B3C;
  const xc0 = C.awalPetakK6B3C();
  globalThis.__pesanC = [];
  // Hitungan MANDIRI. Huruf diubah menjadi nomor lewat kode karakter. Jarak dicari dengan penelusuran lebar (BFS) pada kisi 6 kali 6
  // dengan empat arah. Banyak jalur terpendek dicacah dengan DFS yang hanya melangkah ke petak yang lebih dekat ke tujuan.
  const rc = (t) => [t.charCodeAt(0) - 65, Number(t.slice(1)) - 1];
  const bfs = (dari) => {
    const jarak = Array.from({ length: 6 }, () => Array(6).fill(-1));
    const [r0, c0] = rc(dari);
    jarak[r0][c0] = 0;
    const antre = [[r0, c0]];
    for (let q = 0; q < antre.length; q += 1) {
      const [r, c] = antre[q];
      for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const rr = r + dr;
        const cc = c + dc;
        if (rr >= 0 && rr < 6 && cc >= 0 && cc < 6 && jarak[rr][cc] < 0) {
          jarak[rr][cc] = jarak[r][c] + 1;
          antre.push([rr, cc]);
        }
      }
    }
    return jarak;
  };
  const jarakBfs = (p, q) => bfs(p)[rc(q)[0]][rc(q)[1]];
  const cacahJalur = (p, q) => {
    const [r1, c1] = rc(p);
    const [r2, c2] = rc(q);
    const dari = bfs(q); // jarak ke tujuan dari tiap petak
    const dfs = (r, c) => {
      if (r === r2 && c === c2) return 1;
      let n = 0;
      for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const rr = r + dr;
        const cc = c + dc;
        if (rr >= 0 && rr < 6 && cc >= 0 && cc < 6 && dari[rr][cc] === dari[r][c] - 1) n += dfs(rr, cc);
      }
      return n;
    };
    return dfs(r1, c1);
  };
  // Menilai teks jalur dengan menjalankannya langkah demi langkah.
  const nilaiJalur = (teks, p, q) => {
    let [r, c] = rc(p);
    let langkah = 0;
    let serong = false;
    for (const bagian of teks.split(" lalu ")) {
      const m = bagian.match(/^(kanan|kiri|turun|naik|serong (?:kanan|kiri)-(?:turun|naik)) (\d+)$/);
      if (!m) return { sah: false, alasan: `bagian tak dikenal: ${bagian}` };
      const n = Number(m[2]);
      if (m[1].startsWith("serong")) {
        serong = true;
        c += m[1].includes("kanan") ? n : -n;
        r += m[1].includes("turun") ? n : -n;
        langkah += n;
      } else {
        if (m[1] === "kanan") c += n;
        if (m[1] === "kiri") c -= n;
        if (m[1] === "turun") r += n;
        if (m[1] === "naik") r -= n;
        langkah += n;
      }
    }
    const [r2, c2] = rc(q);
    const sampai = r === r2 && c === c2;
    const terpendek = langkah === jarakBfs(p, q);
    return { sah: !serong && sampai && terpendek, serong, sampai, terpendek };
  };
  const HURUF6 = "ABCDEF";
  const pengecohMandiri = (benar, calon) => {
    const u = [];
    for (const c of [...calon, benar + 1, benar + 2, benar - 1, benar + 3, benar - 2, benar + 4]) if (Number.isInteger(c) && c >= 0 && c !== benar && u.indexOf(c) < 0) u.push(c);
    return u.slice(0, 2);
  };

  const RL = [
    { nama: "kota Makassar", t: "C2" },
    { nama: "meja guru", t: "A3" },
    { nama: "papan tulis", t: "E5" },
    { nama: "pintu kelas", t: "F1" },
    { nama: "kursi Tenri", t: "D2" },
    { nama: "jendela belakang", t: "B6" },
  ];
  const RJ = [
    { nama: "Tigor ke Tenri", dari: "A3", ke: "E5", dh: 4, da: 2, jarak: 6 },
    { nama: "kubus dipindah", dari: "F1", ke: "D2", dh: 2, da: 1, jarak: 3 },
    { nama: "rak ke meja", dari: "B6", ke: "D3", dh: 2, da: 3, jarak: 5 },
    { nama: "satu kolom sama", dari: "C2", ke: "C4", dh: 0, da: 2, jarak: 2 },
    { nama: "satu baris sama", dari: "A1", ke: "E1", dh: 4, da: 0, jarak: 4 },
    { nama: "titik sama", dari: "B3", ke: "B3", dh: 0, da: 0, jarak: 0 },
  ];
  const RR = [
    { nama: "satu belokan", dari: "A1", ke: "B2", jarak: 2, jalur: 2, sah: "kanan 1 lalu turun 1" },
    { nama: "dua kolom", dari: "A1", ke: "B3", jarak: 3, jalur: 3, sah: "kanan 2 lalu turun 1" },
    { nama: "dua kali dua", dari: "A1", ke: "C3", jarak: 4, jalur: 6, sah: "kanan 2 lalu turun 2" },
    { nama: "lurus", dari: "C2", ke: "C4", jarak: 2, jalur: 1, sah: "kanan 2" },
    { nama: "naik ke kanan", dari: "E1", ke: "C3", jarak: 4, jalur: 6, sah: "kanan 2 lalu naik 2" },
    { nama: "tiga kolom", dari: "A1", ke: "C4", jarak: 5, jalur: 10, sah: "kanan 3 lalu turun 2" },
  ];

  /* ---------- Data soal ---------- */
  cek(C.SOAL_LOKASI.length === 6 && C.SOAL_JARAK.length === 6 && C.SOAL_JALUR.length === 6, "C: enam soal tiap tampilan");
  RL.forEach((r, i) => {
    const s = C.SOAL_LOKASI[i];
    cek(s.nama === r.nama && s.t === r.t, `Lokasi ${i}: ${r.t} sesuai rencana`);
    const [b, k] = rc(r.t);
    cek(C.hurufDari(s.t) === HURUF6[b] && C.angkaDari(s.t) === k + 1 && C.barisDari(s.t) === b, `Lokasi ${i}: huruf dan angka ${r.t}`);
    cek(b >= 0 && b < 6 && k >= 0 && k < 6, `Lokasi ${i}: ada di dalam kisi`);
  });
  cek(RL[0].t === "C2", "Lokasi 0: Makassar di C2");
  RJ.forEach((r, i) => {
    const s = C.SOAL_JARAK[i];
    cek(s.nama === r.nama && s.dari === r.dari && s.ke === r.ke, `Jarak ${i}: ${r.dari} ke ${r.ke} sesuai rencana`);
    cek(jarakBfs(r.dari, r.ke) === r.jarak && C.jarakPetak(s.dari, s.ke) === r.jarak, `Jarak ${i}: ${r.jarak} (BFS 4 arah dan kode)`);
    cek(Math.abs(rc(r.dari)[0] - rc(r.ke)[0]) === r.dh && C.selisihHuruf(s.dari, s.ke) === r.dh, `Jarak ${i}: selisih huruf ${r.dh}`);
    cek(Math.abs(rc(r.dari)[1] - rc(r.ke)[1]) === r.da && C.selisihAngka(s.dari, s.ke) === r.da, `Jarak ${i}: selisih angka ${r.da}`);
    cek(r.dh + r.da === r.jarak, `Jarak ${i}: jumlah selisih sama dengan jarak`);
    // Gerak serong tidak membuat jarak lebih pendek: jarak terbesar saja berbeda dari jarak bila kedua selisih tidak nol.
    if (r.dh > 0 && r.da > 0) cek(Math.max(r.dh, r.da) < r.jarak, `Jarak ${i}: jarak serong akan lebih pendek, jadi pengecoh terbesar berbeda`);
  });
  sama(C.SOAL_JARAK.map((s) => C.jarakPetak(s.dari, s.ke)), [6, 3, 5, 2, 4, 0], "Jarak: urutan jarak enam soal");
  RR.forEach((r, i) => {
    const s = C.SOAL_JALUR[i];
    cek(s.nama === r.nama && s.dari === r.dari && s.ke === r.ke, `Jalur ${i}: ${r.dari} ke ${r.ke} sesuai rencana`);
    cek(jarakBfs(r.dari, r.ke) === r.jarak && C.jarakPetak(s.dari, s.ke) === r.jarak, `Jalur ${i}: langkah ${r.jarak}`);
    cek(cacahJalur(r.dari, r.ke) === r.jalur && C.banyakJalur(s.dari, s.ke) === r.jalur, `Jalur ${i}: ${r.jalur} jalur terpendek (DFS mandiri dan kode)`);
    cek(C.teksJalurSah(s.dari, s.ke) === r.sah, `Jalur ${i}: teks jalur sah "${r.sah}"`);
    const penilaian = nilaiJalur(r.sah, r.dari, r.ke);
    cek(penilaian.sah, `Jalur ${i}: jalur sah dinilai sah oleh simulasi mandiri`);
  });
  sama(C.SOAL_JALUR.map((s) => C.banyakJalur(s.dari, s.ke)), [2, 3, 6, 1, 6, 10], "Jalur: urutan banyak jalur");
  cek(C.banyakJalur("B3", "B3") === 1 && cacahJalur("B3", "B3") === 1, "titik sama: satu jalur kosong");
  // Banyak jalur kode sama dengan DFS mandiri untuk semua pasangan titik pada kisi 6 kali 6 yang cukup dekat.
  {
    let ok = true;
    for (let a = 0; a < 36; a += 1) for (let b = 0; b < 36; b += 1) {
      const p = `${HURUF6[Math.floor(a / 6)]}${(a % 6) + 1}`;
      const q = `${HURUF6[Math.floor(b / 6)]}${(b % 6) + 1}`;
      if (C.jarakPetak(p, q) !== jarakBfs(p, q) || C.banyakJalur(p, q) !== cacahJalur(p, q)) {
        ok = false;
        console.log("beda untuk", p, q, C.jarakPetak(p, q), jarakBfs(p, q), C.banyakJalur(p, q), cacahJalur(p, q));
      }
    }
    cek(ok, "jarak dan banyak jalur sama dengan BFS dan DFS mandiri untuk semua 1296 pasangan titik");
  }
  sama([C.idLokasi(3), C.idJarak(4), C.idJalur(5)], ["lokasi:3", "jarak:4", "jalur:5"], "format id soal C");

  /* ---------- Jalur: tiap pilihan dinilai dengan simulasi langkah ---------- */
  for (let i = 0; i < 6; i += 1) {
    const r = RR[i];
    const p = C.opsiJalur(i);
    const nilai = p.opsi.map((o) => nilaiJalur(o, r.dari, r.ke));
    cek(nilai.filter((v) => v.sah).length === 1 && nilai[p.benar].sah, `Jalur ${i}: tepat satu pilihan sah dan itulah kuncinya`);
    cek(new Set(p.opsi).size === 3, `Jalur ${i}: tiga pilihan unik`);
    const salah = p.opsi.filter((_, q) => q !== p.benar).map((o) => nilaiJalur(o, r.dari, r.ke));
    cek(salah.every((v) => !v.sah), `Jalur ${i}: dua pengecoh tidak sah`);
    cek(salah.some((v) => v.serong) || salah.some((v) => !v.sampai), `Jalur ${i}: satu pengecoh serong atau salah tempat`);
    cek(salah.some((v) => v.sampai && !v.serong && !v.terpendek), `Jalur ${i}: satu pengecoh sampai tetapi memutar (lebih panjang)`);
    cek(p.opsi[p.benar] === r.sah, `Jalur ${i}: kunci adalah jalur sah rencana`);
  }
  sama(RR.map((r) => C.teksJalurSalah(r.dari, r.ke)), ["serong kanan-turun 1", "serong kanan-turun 1 lalu kanan 1", "serong kanan-turun 2", "kanan 2 lalu turun 1", "serong kanan-naik 2", "serong kanan-turun 2 lalu kanan 1"], "teks jalur salah: serong memakai selisih terkecil, lurus berakhir di petak keliru");
  sama(RR.map((r) => C.teksJalurPanjang(r.dari, r.ke)), RR.map((r) => r.sah + " lalu turun 1 lalu naik 1"), "teks jalur panjang: memutar satu petak");
  sama([C.teksJalurSah("A1", "E1"), C.teksJalurSah("A3", "A1"), C.teksJalurSah("F6", "C2"), C.teksJalurPanjang("A1", "F1"), C.teksJalurSalah("A1", "E1"), C.teksJalurSalah("C4", "C1")], ["turun 4", "kiri 2", "kiri 4 lalu naik 3", "turun 5 lalu naik 1 lalu turun 1", "turun 4 lalu kanan 1", "kiri 3 lalu turun 1"], "teks jalur: gerak nol tidak ditulis, arah kiri dan naik, memutar di baris terbawah");
  sama(nilaiJalur("serong kanan-turun 1", "A1", "B2"), { sah: false, serong: true, sampai: true, terpendek: false }, "penilai mandiri: serong sampai dengan satu langkah, tetapi tidak sah");
  cek(nilaiJalur("kanan 1 lalu turun 1", "A1", "B2").sah && !nilaiJalur("kanan 2 lalu turun 1", "A1", "B2").sah && !nilaiJalur("kanan 1 lalu turun 1 lalu naik 1 lalu turun 1", "A1", "B2").sah, "penilai mandiri: jalur sah, salah tempat, dan memutar");

  /* ---------- Pengecoh dan letak kunci ---------- */
  {
    for (const benar of [0, 1, 3, 7, 12]) for (const calon of [[], [benar], [benar, benar], [-2, 2.5]]) {
      const [p, q] = C.pengecohAngka(benar, calon);
      cek(Number.isInteger(p) && Number.isInteger(q) && p >= 0 && q >= 0 && p !== q && p !== benar && q !== benar, `C pengecohAngka(${benar}, ${JSON.stringify(calon)}) = ${p},${q}`);
    }
    for (const h of HURUF6) {
      const [p, q] = C.pengecohHuruf(h);
      cek(p !== q && p !== h && q !== h && HURUF6.includes(p) && HURUF6.includes(q), `pengecohHuruf(${h}) = ${p},${q} di dalam A sampai F`);
    }
    for (const t of ["A1", "C2", "F6", "D5", "B6", "E1"]) {
      const [p, q] = C.pengecohAngkaKolom(t);
      const a = Number(t.slice(1));
      cek(p !== q && p !== a && q !== a && p >= 1 && p <= 6 && q >= 1 && q <= 6, `pengecohAngkaKolom(${t}) = ${p},${q} di dalam 1 sampai 6`);
    }
    cek(C.pengecohAngkaKolom("C2").includes(3), "pengecohAngkaKolom(C2) memuat nomor huruf (sumbu tertukar)");
    sama(C.pengecohHuruf("C"), ["D", "B"], "pengecohHuruf(C) berurutan di sekitar");
    const cekPilih = (nama, p, benarNilai, seed) => {
      const opsi = p.opsi;
      cek(opsi.length === 3 && new Set(opsi).size === 3, `${nama}: tiga pilihan unik (${opsi.join(" | ")})`);
      cek(opsi[p.benar] === benarNilai && opsi.filter((o) => o === benarNilai).length === 1, `${nama}: tepat satu kunci, nilainya ${benarNilai}`);
      cek(p.benar === posisiRotasi(0, seed), `${nama}: letak kunci eksak ${posisiRotasi(0, seed)}, bukan ${p.benar}`);
      return opsi.filter((o) => o !== benarNilai);
    };
    const cekPeng = (nama, peng, benar, calon) => sama([...peng].sort(), [...pengecohMandiri(benar, calon)].sort(), `${nama}: pengecoh persis dari calon kebiasaan salah`);
    const letak = { huruf: [], angka: [], tulis: [], sh: [], sa: [], jarak: [], langkah: [], jalur: [], banyak: [] };
    for (let i = 0; i < 6; i += 1) {
      const [b, k] = rc(RL[i].t);
      const h = HURUF6[b];
      const a = k + 1;
      let p = cekPilih(`Lokasi ${i} huruf`, C.opsiHurufLokasi(i), h, i);
      const cH = [b + 1, b - 1, b + 2, b - 2].filter((v) => v >= 0 && v < 6).map((v) => HURUF6[v]);
      sama([...p].sort(), cH.slice(0, 2).sort(), `Lokasi ${i} huruf: pengecoh persis`);
      p = cekPilih(`Lokasi ${i} angka`, C.opsiAngkaLokasi(i), a, i + 1);
      const cA = [b + 1, a + 1, a - 1, a + 2, a - 2].filter((v, q, arr) => v >= 1 && v <= 6 && v !== a && arr.indexOf(v) === q);
      sama([...p].sort(), cA.slice(0, 2).sort(), `Lokasi ${i} angka: pengecoh persis`);
      p = cekPilih(`Lokasi ${i} tulis`, C.opsiTulisLokasi(i), RL[i].t, i + 2);
      sama([...p].sort(), [`${a}${h}`, `${HURUF6[b < 5 ? b + 1 : b - 1]}${a}`].sort(), `Lokasi ${i} tulis: pengecoh urutan terbalik dan huruf di sebelahnya`);
      letak.huruf.push(C.opsiHurufLokasi(i).benar);
      letak.angka.push(C.opsiAngkaLokasi(i).benar);
      letak.tulis.push(C.opsiTulisLokasi(i).benar);
      const j = RJ[i];
      const semua = rc(j.dari)[0] + 1 + rc(j.dari)[1] + 1 + rc(j.ke)[0] + 1 + rc(j.ke)[1] + 1;
      p = cekPilih(`Jarak ${i} selisih huruf`, C.opsiSelisihHuruf(i), j.dh, i);
      cekPeng(`Jarak ${i} selisih huruf`, p, j.dh, [j.da, j.jarak]);
      p = cekPilih(`Jarak ${i} selisih angka`, C.opsiSelisihAngka(i), j.da, i + 1);
      cekPeng(`Jarak ${i} selisih angka`, p, j.da, [j.dh, j.jarak]);
      p = cekPilih(`Jarak ${i} jarak`, C.opsiJarak(i), j.jarak, i + 2);
      cekPeng(`Jarak ${i} jarak`, p, j.jarak, [Math.max(j.dh, j.da), j.dh, semua]);
      letak.sh.push(C.opsiSelisihHuruf(i).benar);
      letak.sa.push(C.opsiSelisihAngka(i).benar);
      letak.jarak.push(C.opsiJarak(i).benar);
      const r = RR[i];
      const dh = Math.abs(rc(r.dari)[0] - rc(r.ke)[0]);
      const da = Math.abs(rc(r.dari)[1] - rc(r.ke)[1]);
      p = cekPilih(`Jalur ${i} langkah`, C.opsiLangkah(i), r.jarak, i);
      cekPeng(`Jalur ${i} langkah`, p, r.jarak, [r.jalur, dh, da]);
      cek(C.opsiJalur(i).opsi[C.opsiJalur(i).benar] === r.sah && C.opsiJalur(i).benar === posisiRotasi(0, i + 1), `Jalur ${i} jalur: letak kunci eksak`);
      p = cekPilih(`Jalur ${i} banyak`, C.opsiBanyakJalur(i), r.jalur, i + 2);
      cekPeng(`Jalur ${i} banyak`, p, r.jalur, [r.jarak, dh * da, r.jarak + 1]);
      letak.langkah.push(C.opsiLangkah(i).benar);
      letak.jalur.push(C.opsiJalur(i).benar);
      letak.banyak.push(C.opsiBanyakJalur(i).benar);
    }
    for (const [nama, daftar] of Object.entries(letak)) cek(new Set(daftar).size === 3, `C letak kunci ${nama} memakai ketiga posisi (${daftar.join("")})`);
  }

  /* ---------- Alur tiap soal ---------- */
  const AKC = {
    lokasi: { data: "L_DATA", tahap: ["L_HURUF", "L_ANGKA", "L_TULIS"], kunci: [C.opsiHurufLokasi, C.opsiAngkaLokasi, C.opsiTulisLokasi] },
    jarak: { data: "J_DATA", tahap: ["J_HURUF", "J_ANGKA", "J_JARAK"], kunci: [C.opsiSelisihHuruf, C.opsiSelisihAngka, C.opsiJarak] },
    jalur: { data: "R_DATA", tahap: ["R_LANGKAH", "R_JALUR", "R_BANYAK"], kunci: [C.opsiLangkah, C.opsiJalur, C.opsiBanyakJalur] },
  };
  {
    for (const [nama, def] of Object.entries(AKC)) {
      for (let i = 0; i < 6; i += 1) {
        let x = LC(xc0, { t: def.data, i });
        cek(x[nama].data === i && x[nama].tahap === 0 && x.pesan === "", `C ${nama} ${i}: memilih soal mengatur tahap awal`);
        for (let tahap = 0; tahap < 3; tahap += 1) {
          const kunci = def.kunci[tahap](i).benar;
          for (const o of [0, 1, 2].filter((v) => v !== kunci)) {
            const y = LC(x, { t: def.tahap[tahap], o });
            globalThis.__pesanC.push(y.pesan);
            cek(y[nama].tahap === tahap && y[nama].data === i && y.pernah.length === 0 && !y.pesan.startsWith("✅") && y.pesan.length > 10, `C ${nama} ${i} tahap ${tahap}: pilihan salah ${o} tidak maju dan diberi petunjuk`);
          }
          if (tahap < 2) {
            const lompat = LC(x, { t: def.tahap[tahap + 1], o: def.kunci[tahap + 1](i).benar });
            globalThis.__pesanC.push(lompat.pesan);
            cek(lompat[nama].tahap === tahap && lompat.pernah.length === 0 && !lompat.pesan.startsWith("✅"), `C ${nama} ${i} tahap ${tahap}: melompat ke tahap ${tahap + 1} ditolak`);
          }
          for (const o of [0.5, 1.5, -1, 3, 99, NaN, Infinity, "1", null, undefined]) cek(LC(x, { t: def.tahap[tahap], o }) === x, `C ${nama} ${i} tahap ${tahap}: indeks ${String(o)} diabaikan`);
          x = LC(x, { t: def.tahap[tahap], o: kunci });
          globalThis.__pesanC.push(x.pesan);
          cek(x[nama].tahap === tahap + 1 && x.pesan.startsWith("✅"), `C ${nama} ${i} tahap ${tahap}: jawaban benar maju dengan pesan sukses`);
          cek(tahap < 2 ? x.pernah.length === 0 : x.pernah.length === 1 && x.pernah[0] === `${nama}:${i}`, `C ${nama} ${i} tahap ${tahap}: riwayat hanya dicatat di langkah terakhir`);
        }
        for (let tahap = 0; tahap < 3; tahap += 1) cek(LC(x, { t: def.tahap[tahap], o: def.kunci[tahap](i).benar }) === x, `C ${nama} ${i}: sesudah selesai aksi tahap ${tahap} diabaikan`);
        const ulang = LC(x, { t: def.data, i });
        cek(ulang[nama].tahap === 0 && ulang.pernah.includes(`${nama}:${i}`), `C ${nama} ${i}: memilih soal lagi mengulang tahap tetapi riwayat tetap`);
        for (const lain of Object.keys(AKC).filter((v) => v !== nama)) cek(x[lain].tahap === 0 && x[lain].data === 0, `C ${nama} ${i}: tampilan ${lain} tidak berubah`);
      }
      for (const i of [-1, 6, 2.5, NaN, "2", null]) cek(LC(xc0, { t: def.data, i }) === xc0, `C ${nama}: soal ${String(i)} diabaikan`);
    }
    let y = xc0;
    for (const [nama, def] of Object.entries(AKC)) for (let i = 0; i < 6; i += 1) {
      y = LC(y, { t: def.data, i });
      for (let tahap = 0; tahap < 3; tahap += 1) y = LC(y, { t: def.tahap[tahap], o: def.kunci[tahap](i).benar });
    }
    sama([...y.pernah].sort(), [...Array(6).keys()].flatMap((i) => [`lokasi:${i}`, `jarak:${i}`, `jalur:${i}`]).sort(), "C: semua 18 soal selesai, riwayat 18 id");
    cek(LC(y, { t: "RESET" }).pernah.length === 0 && LC(LC(xc0, { t: "L_HURUF", o: 0 }), { t: "PESAN_KOSONG" }).pesan === "", "C: reset dan pesan kosong");
    const kb = C.keadaanPetakK6B3C(y);
    cek(kb.alat === "petak" && kb.pernah === y.pernah, "C: keadaan lapor memakai alat petak");
  }

  /* ---------- Fuzz 20.000 aksi dengan orakel mandiri ---------- */
  {
    const acak = acakDari(20260715);
    const NAMA = ["lokasi", "jarak", "jalur"];
    const nilaiKunci = (nama, i, tahap) => {
      if (nama === "lokasi") {
        const [b, k] = rc(RL[i].t);
        return [HURUF6[b], k + 1, RL[i].t][tahap];
      }
      if (nama === "jarak") {
        const j = RJ[i];
        const [r1, c1] = rc(j.dari);
        const [r2, c2] = rc(j.ke);
        return [Math.abs(r1 - r2), Math.abs(c1 - c2), jarakBfs(j.dari, j.ke)][tahap];
      }
      const r = RR[i];
      return [jarakBfs(r.dari, r.ke), r.sah, cacahJalur(r.dari, r.ke)][tahap];
    };
    const daftarOpsi = (nama, i, tahap) => AKC[nama].kunci[tahap](i).opsi;
    const o = { lokasi: { data: 0, tahap: 0 }, jarak: { data: 0, tahap: 0 }, jalur: { data: 0, tahap: 0 }, pernah: new Set() };
    let x = xc0;
    let ok = true;
    let pernahTerbesar = 0;
    const selesaiPer = { lokasi: 0, jarak: 0, jalur: 0 };
    const nilaiAcak = () => [0, 1, 2, 0.5, 1.5, -1, 3, 7, NaN, "1", null][acak(11)];
    for (let n = 0; n < 20000; n += 1) {
      const nama = NAMA[acak(3)];
      const def = AKC[nama];
      let a;
      const jenis = acak(10);
      if (jenis === 0) a = { t: def.data, i: [0, 1, 2, 3, 4, 5, -1, 6, 2.5, NaN][acak(10)] };
      else if (jenis === 1) a = { t: "PESAN_KOSONG" };
      else if (jenis === 2 && acak(8) === 0) a = { t: "RESET" };
      else if (jenis <= 5) {
        const tahap = Math.min(o[nama].tahap, 2);
        a = { t: def.tahap[tahap], o: daftarOpsi(nama, o[nama].data, tahap).indexOf(nilaiKunci(nama, o[nama].data, tahap)) };
      } else a = { t: def.tahap[acak(3)], o: nilaiAcak() };

      const sebelum = x;
      let maju = false;
      let diabaikan = false;
      let kosong = false;
      if (a.t === def.data) {
        if (Number.isInteger(a.i) && a.i >= 0 && a.i < 6) o[nama] = { data: a.i, tahap: 0 };
        else diabaikan = true;
      } else if (a.t === "PESAN_KOSONG") kosong = true;
      else if (a.t === "RESET") {
        o.lokasi = { data: 0, tahap: 0 };
        o.jarak = { data: 0, tahap: 0 };
        o.jalur = { data: 0, tahap: 0 };
        o.pernah = new Set();
        kosong = true;
      } else {
        const s = def.tahap.indexOf(a.t);
        if (!(Number.isInteger(a.o) && a.o >= 0 && a.o <= 2)) diabaikan = true;
        else if (o[nama].tahap > s) diabaikan = true;
        else if (o[nama].tahap === s) {
          if (daftarOpsi(nama, o[nama].data, s)[a.o] === nilaiKunci(nama, o[nama].data, s)) {
            o[nama].tahap += 1;
            maju = true;
            if (s === 2) {
              o.pernah.add(`${nama}:${o[nama].data}`);
              selesaiPer[nama] += 1;
            }
          }
        }
      }
      x = LC(x, a);
      globalThis.__pesanC.push(x.pesan);
      if (diabaikan && a.t !== def.data && x !== sebelum) {
        ok = false;
        console.log("fuzz C: aksi yang seharusnya diabaikan mengubah keadaan", n, JSON.stringify(a));
      }
      if (a.t === "RESET") ok = ok && x.pernah.length === 0 && x.pesan === "";
      else cek(x.pernah.length >= sebelum.pernah.length, `fuzz C ${n}: riwayat tidak dicabut`);
      const cocok = NAMA.every((k) => x[k].data === o[k].data && x[k].tahap === o[k].tahap) && JSON.stringify([...x.pernah].sort()) === JSON.stringify([...o.pernah].sort());
      if (!cocok) {
        ok = false;
        console.log("fuzz C beda dari orakel di langkah", n, JSON.stringify(a), JSON.stringify(x), JSON.stringify({ ...o, pernah: [...o.pernah] }));
        break;
      }
      if (maju) cek(x.pesan.startsWith("✅"), `fuzz C ${n}: langkah benar diawali pesan sukses`);
      else if (!diabaikan && !kosong && a.t !== def.data) cek(!x.pesan.startsWith("✅"), `fuzz C ${n}: langkah belum benar bukan pesan sukses`);
      if (kosong) cek(x.pesan === "", `fuzz C ${n}: pesan dikosongkan`);
      cek(NAMA.every((k) => x[k].tahap >= 0 && x[k].tahap <= 3), `fuzz C ${n}: tahap dalam batas`);
      pernahTerbesar = Math.max(pernahTerbesar, x.pernah.length);
    }
    cek(ok, "fuzz C 20.000 aksi: keadaan sama dengan orakel mandiri");
    cek(selesaiPer.lokasi > 10 && selesaiPer.jarak > 10 && selesaiPer.jalur > 10, `fuzz C: tiap tampilan selesai berkali-kali (${selesaiPer.lokasi}, ${selesaiPer.jarak}, ${selesaiPer.jalur})`);
    cek(pernahTerbesar >= 6, `fuzz C: riwayat pernah mencapai ${pernahTerbesar}`);
    cek(x.pernah.every((v) => /^(lokasi|jarak|jalur):[0-5]$/.test(v)), "fuzz C: semua id riwayat berbentuk sah");
  }

  /* ---------- Mesin ---------- */
  {
    const def = MP.MESIN_PETAK;
    cek(def.stasiun.length === 4 && def.kasus.length === 3, `${def.id}: empat stasiun, tiga kasus`);
    sama(def.stasiun.map((s) => s.id), ["baca", "selisih", "jarak", "jalur"], "stasiun mesin C");
    const posisi = [];
    for (const kasus of def.kasus) {
      cek(kasus.langkah.length === 4, `${def.id}/${kasus.id}: empat langkah`);
      kasus.langkah.forEach((l, i) => {
        cek(l.stasiun === def.stasiun[i].id, `${def.id}/${kasus.id}: langkah ${i + 1} di stasiun ${def.stasiun[i].id}`);
        cek(l.opsi.length === 3 && new Set(l.opsi).size === 3 && l.opsi.filter((q) => q === l.benar).length === 1, `${def.id}/${kasus.id}/${l.stasiun}: tiga pilihan unik, satu kunci`);
        cek(i === 0 ? l.opsi.every((q) => /^[A-F]?\d[A-F]?\d?$/.test(q)) : l.opsi.every((q) => /^\d+$/.test(q)), `${def.id}/${kasus.id}/${l.stasiun}: bentuk pilihan wajar`);
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
    cek(x.selesai && def.selesaiId === K3.ID_MESIN_K6B3.C, `${def.id}: bisa diselesaikan, id selesai sesuai misi`);
    const y = ME.awalMesin(def);
    const l0 = ME.langkahAktif(y);
    const z = ME.langkahMesin(y, { t: "JAWAB", nilai: l0.opsi.find((q) => q !== l0.benar) });
    cek(z.ke === 0 && z.ditolak === 1 && z.pesan === l0.petunjuk, `${def.id}: jawaban salah ditolak dengan petunjuk`);
    const RENCANA_M = [
      { id: "kursi", dari: "A1", ke: "C3" },
      { id: "rak", dari: "A3", ke: "D5" },
      { id: "kubus", dari: "F1", ke: "D2" },
    ];
    sama(MP.KASUS_PETAK.map((k) => [k.id, k.dari, k.ke]), RENCANA_M.map((r) => [r.id, r.dari, r.ke]), "Mesin C: data tiga kasus sesuai rencana");
    for (const [i, r] of RENCANA_M.entries()) {
      const c = def.kasus[i];
      const [ba, se, ja, jl] = c.langkah;
      const dh = Math.abs(rc(r.dari)[0] - rc(r.ke)[0]);
      const da = Math.abs(rc(r.dari)[1] - rc(r.ke)[1]);
      cek(ba.benar === r.dari && ba.tanya.includes(`baris ${r.dari[0]} dan kolom ${r.dari.slice(1)}`) && !ba.tanya.includes(`ditulis ${r.dari}`), `Mesin C ${r.id}: letak awal ${r.dari}, kunci tidak dibocorkan`);
      sama(sortir(ba.opsi), sortir([r.dari, `${r.dari.slice(1)}${r.dari[0]}`, `${HURUF6[Math.min(rc(r.dari)[0] + 1, 5) === rc(r.dari)[0] ? rc(r.dari)[0] - 1 : rc(r.dari)[0] + 1]}${r.dari.slice(1)}`]), `Mesin C ${r.id}: pengecoh baca (urutan terbalik dan huruf sebelah)`);
      cek(se.benar === String(dh), `Mesin C ${r.id}: selisih huruf ${dh}`);
      cek(ja.benar === String(jarakBfs(r.dari, r.ke)), `Mesin C ${r.id}: jarak ${jarakBfs(r.dari, r.ke)} (BFS mandiri)`);
      cek(jl.benar === String(cacahJalur(r.dari, r.ke)), `Mesin C ${r.id}: ${cacahJalur(r.dari, r.ke)} jalur terpendek (DFS mandiri)`);
      cek(ja.opsi.includes(String(Math.max(dh, da))) || Math.max(dh, da) === jarakBfs(r.dari, r.ke), `Mesin C ${r.id}: pengecoh jarak memuat yang terbesar saja (seolah serong)`);
      cek(c.ringkas.includes(`jarak ${jarakBfs(r.dari, r.ke)} langkah`) && c.ringkas.includes(`ada ${cacahJalur(r.dari, r.ke)} jalur`) && c.ringkas.includes(`selisih huruf ${dh}`), `Mesin C ${r.id}: ringkas memuat semua hasil`);
      for (const l of c.langkah) cek(l.petunjuk.length > 15, `Mesin C ${r.id}/${l.stasiun}: petunjuk ada`);
    }
  }

  /* ---------- Skenario ---------- */
  {
    const S = SK.SKENARIO_K6B3C;
    cek(S.adegan.length >= 5 && S.adegan.length <= 8, `${S.id}: 5 sampai 8 adegan`);
    cek(S.adegan[0].jenis === "narasi" && S.adegan[S.adegan.length - 1].jenis === "akhir", `${S.id}: buka dan tutup`);
    cek(new Set(S.adegan.map((a) => a.jenis)).size >= 4, `${S.id}: paling sedikit empat jenis adegan`);
    const semuaTeks = [];
    for (const a of S.adegan) {
      semuaTeks.push(a.cerita);
      for (const q of a.opsi ?? []) semuaTeks.push(q.teks, q.umpan);
      for (const q of a.soal ?? []) semuaTeks.push(q.teks, ...q.opsi);
      for (const f of ["tanya", "sukses", "salah", "kurang", "lebih"]) if (a[f]) semuaTeks.push(a[f]);
    }
    cek(semuaTeks.every(tanpaAngka), `${S.id}: semua teks dapat dieja`);
    sama(S.id.replace(/-k6b3$/, ""), K3.ID_SKENARIO_K6B3.C, "id skenario C sesuai id misi");
    const adegan = (id) => S.adegan.find((a) => a.id === id);
    const nama = adegan("nama");
    cek(nama.opsi.length === 3 && nama.opsi.filter((o) => o.benar).length === 1 && nama.opsi.find((o) => o.benar).teks === "E5" && nama.cerita.includes("baris E dan kolom 5") && nama.cerita.includes("Grid Coordinate Naming"), "nama: baris E dan kolom 5 ditulis E5");
    const hitung = adegan("hitung");
    cek(hitung.jumlah === jarakBfs("A1", "A5") && hitung.objek === "stik" && hitung.sukses.includes("4 langkah"), "hitung: A1 ke A5 empat langkah (BFS mandiri)");
    const jarak = adegan("jarak");
    cek(jarak.soal[0].jawaban === String(Math.abs(rc("A3")[0] - rc("E5")[0])) && jarak.soal[1].jawaban === String(jarakBfs("A3", "E5")) && jarak.cerita.includes("Manhattan Path Distance"), "jarak: selisih huruf 4 dan jarak A3 ke E5 enam (BFS mandiri)");
    cek(jarak.sukses.includes("4 ditambah selisih angka 2 sama dengan 6"), "jarak: kalimat sukses");
    const serong = adegan("serong");
    cek(jarakBfs("A3", "B4") === 2 && serong.opsi.length === 3 && serong.opsi.filter((o) => o.benar).length === 1 && serong.opsi.find((o) => o.benar).teks.includes("dua langkah") && serong.opsi.find((o) => o.benar).umpan.includes("2 langkah"), "serong: A3 ke B4 dua langkah, serong tidak boleh");
    const kubus = adegan("kubus");
    cek(kubus.target === jarakBfs("F1", "D2") && kubus.maks > kubus.target && kubus.objek === "stik" && kubus.sukses.includes("2 + 1 = 3"), "kubus: 3 stik untuk F1 ke D2");
    const jalur = adegan("jalur");
    cek(jalur.soal[0].jawaban === String(jarakBfs("A1", "B3")) && jalur.soal[1].jawaban === String(cacahJalur("A1", "B3")) && jalur.cerita.includes("Shortest Grid Path"), "jalur: A1 ke B3, 3 langkah dan 3 jalur (BFS dan DFS mandiri)");
    for (const q of [...jarak.soal, ...jalur.soal]) cek(q.opsi.length === 3 && q.opsi.filter((o) => o === q.jawaban).length === 1 && new Set(q.opsi).size === 3, `soal "${q.teks}": tiga pilihan satu kunci`);
    const posisiPilih = S.adegan.filter((a) => a.jenis === "pilih").map((a) => a.opsi.findIndex((o) => o.benar));
    cek(posisiPilih.length === 2 && new Set(posisiPilih).size === posisiPilih.length, `letak jawaban pilih bervariasi (${posisiPilih.join("")})`);
    const ps = [...jarak.soal, ...jalur.soal].map((q) => q.opsi.indexOf(q.jawaban));
    cek(ps.every((p) => p >= 0) && new Set(ps).size >= 2, `letak jawaban soal bervariasi (${ps.join("")})`);
    cek(S.adegan.filter((a) => a.jenis === "pilih").every((a) => a.opsi.length === 3 && a.opsi.filter((o) => o.benar).length === 1), "setiap pilih: tiga opsi, satu benar");
    cek(S.adegan.find((a) => a.id === "buka").cerita.includes("C2"), "buka: Makassar di C2");
    cek(/Grid Coordinate Naming/.test(S.adegan.find((a) => a.id === "tutup").cerita) && /Manhattan Path Distance/.test(S.adegan.find((a) => a.id === "tutup").cerita) && /Shortest Grid Path/.test(S.adegan.find((a) => a.id === "tutup").cerita), "penutup memuat tiga metode luar berlabel");
  }

  /* ---------- Misi ---------- */
  {
    const daftar = K3.daftarMisiK6Bab3("C");
    cek(K3.daftarMisiK6Bab3("C") === K3.MISI_C && TK.hurufK6B3("C") === "C", "huruf C memakai misi C");
    cek(TK.misiAwalK6Bab3("C").startsWith("Simulasi 1. Misi: ") && tanpaAngka(TK.misiAwalK6Bab3("C")) && tanpaAngka(TK.NAMA_SIM_K6B3.C), "misi awal C dan dapat dieja");
    cek(daftar.filter((m) => m.wajib).length === 7 && daftar.filter((m) => !m.wajib).length === 3, "C: tujuh misi wajib dan tiga tantangan bebas");
    cek(new Set(daftar.map((m) => m.id)).size === 10 && daftar.every((m) => m.id.startsWith("c-")), "C: id misi unik berawalan huruf");
    const kosong = [{ alat: "petak", pernah: [] }, { alat: "lain", pernah: [] }, sel("tidak-ada"), C.keadaanPetakK6B3C(C.awalPetakK6B3C()), { alat: "tampak", pernah: ["matriks:0", "tampak:0", "tampak:3", "atas:0", "atas:3"] }, { alat: "susunan", pernah: ["susun:1", "lapisan:0"] }, sel(K3.ID_MESIN_K6B3.A), sel(K3.ID_SKENARIO_K6B3.A), sel(K3.ID_MESIN_K6B3.B), sel(K3.ID_SKENARIO_K6B3.B)];
    cek(kosong.every((k) => M0.misiBaru(daftar, k, new Set()).length === 0), "C: keadaan awal dan riwayat alat lain tidak memenuhi misi mana pun");
    const baru = (k) => M0.misiBaru(daftar, k, new Set());
    cek(baru(sel(K3.ID_MESIN_K6B3.C)).join() === "c-mesin" && baru(sel(K3.ID_SKENARIO_K6B3.C)).join() === "c-skenario", "C: id mesin dan skenario memenuhi misinya");
    const SC = (...id) => ({ alat: "petak", pernah: id });
    const harap = {
      "c-lokasi": ["lokasi:0"],
      "c-jarak": ["jarak:0"],
      "c-kubus": ["jarak:1"],
      "c-jalur": ["jalur:0"],
      "c-banyak": ["jalur:2"],
    };
    for (const [id, perlu] of Object.entries(harap)) {
      const m = daftar.find((v) => v.id === id);
      cek(m.wajib && m.cek(SC(...perlu)), `${id}: terpenuhi oleh ${perlu.join()}`);
      cek(!m.cek({ alat: "lain", pernah: perlu }) && !m.cek({ alat: "tampak", pernah: perlu }) && !m.cek({ alat: "susunan", pernah: perlu }), `${id}: alat lain dengan id sama tidak memenuhi`);
      cek(!m.cek(sel(perlu[0])), `${id}: keadaan selesai dengan id sama tidak memenuhi`);
      const [tamp, nomor] = perlu[0].split(":");
      for (let j = 0; j < 6; j += 1) if (j !== Number(nomor)) cek(!m.cek(SC(`${tamp}:${j}`)), `${id}: soal ${tamp}:${j} saja tidak memenuhi`);
      for (const lain of ["lokasi", "jarak", "jalur"].filter((v) => v !== tamp)) cek(!m.cek(SC(`${lain}:${nomor}`)), `${id}: ${lain}:${nomor} saja tidak memenuhi`);
      cek(!m.cek(SC()), `${id}: riwayat kosong tidak memenuhi`);
    }
    for (const tamp of ["lokasi", "jarak", "jalur"]) for (let j = 0; j < 6; j += 1) {
      const dipenuhi = daftar.filter((m) => m.wajib && !["c-mesin", "c-skenario"].includes(m.id) && m.cek(SC(`${tamp}:${j}`))).map((m) => m.id);
      const tunggu = Object.entries(harap).filter(([, p]) => p[0] === `${tamp}:${j}`).map(([id]) => id);
      sama(dipenuhi, tunggu, `misi C terpenuhi oleh ${tamp}:${j} saja`);
    }
    for (const [id, tamp] of [["c-lokasi-semua", "lokasi"], ["c-jarak-semua", "jarak"], ["c-jalur-semua", "jalur"]]) {
      const m = daftar.find((v) => v.id === id);
      const semua = [0, 1, 2, 3, 4, 5].map((j) => `${tamp}:${j}`);
      cek(!m.wajib && m.cek(SC(...semua)), `${id}: terpenuhi oleh keenam soal`);
      for (let j = 0; j < 6; j += 1) cek(!m.cek(SC(...semua.filter((_, q) => q !== j))), `${id}: tanpa soal ${j} belum terpenuhi`);
      cek(!m.cek(SC(...[0, 1, 2, 3, 4, 5].map((j) => `${["lokasi", "jarak", "jalur"].find((v) => v !== tamp)}:${j}`))), `${id}: keenam soal tampilan lain tidak memenuhi`);
    }
    const tampil = M0.tampilMisi(daftar);
    const wajibIds = daftar.filter((m) => m.wajib).map((m) => m.id);
    cek(!M0.wajibSelesai(tampil, new Set(wajibIds.slice(0, 6))) && M0.wajibSelesai(tampil, new Set(wajibIds)), "C: tujuh wajib membuka gerbang, enam belum");
    const dicapai = new Set();
    M0.laporMisi(daftar, SC("lokasi:0"), (id) => dicapai.add(id));
    M0.laporMisi(daftar, SC(), (id) => dicapai.add(id));
    cek(dicapai.size === 1 && dicapai.has("c-lokasi"), "laporMisi C: hanya misi yang terpenuhi yang dicapai");
    cek(daftar.every((m) => tanpaAngka(m.teks) && !/\d/.test(m.teks)), "teks tiap misi C dapat dieja dan tanpa angka");
    sama(Object.keys(TK.MISI_K6B3), ["A", "B", "C"], "teks misi untuk A, B, dan C");
    sama(Object.keys(TK.NAMA_SIM_K6B3), ["A", "B", "C"], "nama simulasi untuk A, B, dan C");
  }

  /* ---------- Data ringkas C ---------- */
  {
    const c = ringkas.subBab.C;
    sama(periksaDataPeta(c.peta), [], "ringkas C: peta sah");
    sama(periksaDataInfografis(c.infografis), [], "ringkas C: infografis sah");
    cek(c.peta.cabang.length >= 3 && c.peta.cabang.length <= 4, `ringkas C: ${c.peta.cabang.length} cabang`);
    cek(c.peta.cabang.every((q) => c.peta.kartu.filter((k) => k.cabang === q.id).length >= 2), "ringkas C: tiap cabang punya paling sedikit dua kartu");
    cek(c.infografis.panel.length <= 3, "ringkas C: infografis paling banyak tiga panel");
    for (const p of c.infografis.panel) {
      cek(p.ide.split(/\s+/).length <= 8, `ringkas C: ide ${p.id} paling banyak 8 kata`);
      for (const q of p.butir ?? []) cek(q.isi.split(/\s+/).length <= 8, `ringkas C: ringkas ${p.id}/${q.id} paling banyak 8 kata`);
    }
    for (const q of c.peta.cabang) cek(q.ringkas.split(/\s+/).length <= 8, `ringkas C: cabang ${q.id} ringkas paling banyak 8 kata`);
    const teksSuara = [];
    JSON.stringify(c, (k, v) => {
      if (k === "suara" && typeof v === "string") teksSuara.push(v);
      return v;
    });
    cek(teksSuara.every(tanpaAngka), "ringkas C: semua suara dapat dieja");
    sama(Object.keys(ringkas.subBab), ["A", "B", "C"], "ringkas: tiga sub-bab");
  }

  /* ---------- Murni, bilangan bulat, kode tampilan ---------- */
  {
    const baca = (nama, ekstensi) => readFileSync(new URL(`../src/components/modul/${nama}.${ekstensi}`, import.meta.url), "utf8");
    const tanpaKomentar = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
    for (const p of globalThis.__pesanC) cek(typeof p === "string" && !/\d[.,]\d/.test(p), "pesan lab C: hanya bilangan bulat");
    cek(globalThis.__pesanC.length > 20000, `pesan fuzz C terkumpul (${globalThis.__pesanC.length})`);
    cek(globalThis.__pesanC.every((p) => !p.startsWith("✅") || /✅ /.test(p)), "pesan sukses C: ✅ diikuti spasi");
    for (const f of ["SimulasiLabPetakK6B3", "model-petak-k6b3"]) {
      const s = baca(f, "tsx");
      cek(!/correct_index|explanation/.test(s), `${f}: tidak memuat correct_index atau explanation`);
      cek(!/fetch\(|XMLHttpRequest|api\/|openai|anthropic|gemini/i.test(s), `${f}: tanpa jaringan atau model bahasa`);
    }
    for (const f of ["lab-petak-k6b3c", "mesin-petak-k6b3"]) {
      const s = baca(f, "ts");
      cek(!/fetch\(|XMLHttpRequest|from "react"|openai|anthropic|gemini|correct_index|explanation/i.test(s), `${f}: murni`);
      cek((s.match(/^import .+$/gm) ?? []).every((l) => l.startsWith("import type")), `${f}: hanya mengimpor tipe`);
      cek(!/\.toFixed|parseFloat|Math\.(round|floor|ceil|random)|\d\.\d/.test(tanpaKomentar(s)), `${f}: hanya bilangan bulat`);
    }
    cek((baca("lab-petak-k6b3c", "ts").match(/^import /gm) ?? []).length === 0, "lab C tanpa impor sama sekali");
    {
      const s = baca("SimulasiLabPetakK6B3", "tsx");
      cek(/useEffect\(\(\) => \{\s*onKeadaan\?\.\(keadaan\w+\(x\)\);\s*\}, \[onKeadaan, x\]\);/.test(s), "lab C: lapor keadaan lewat useEffect");
      cek(/setLihat\(v\);\s*kirim\(\{ t: "PESAN_KOSONG" \}\);/.test(s), "lab C: ganti tampilan mengosongkan pesan");
      const catatan = [...s.matchAll(/^\s*"([^"]+)",$/gm)].map((m) => m[1]);
      cek(catatan.length >= 3 && catatan.every(tanpaAngka), "lab C: Coba ini dapat dieja");
      for (const awalan of ["Huruf", "Angka", "Tulis", "Selisih huruf", "Selisih angka", "Jarak", "Langkah", "Jalur", "Banyak jalur"]) cek(s.includes(`awalan="${awalan}"`), `lab C: pilihan berlabel ${awalan}`);
      for (const awalan of ["Pilih soal lokasi ", "Pilih soal jarak ", "Pilih soal jalur "]) cek(s.includes(`label={\`${awalan}`), `lab C: pilihan soal berlabel ${awalan.trim()}`);
      for (const t of [0, 1, 2]) cek(new RegExp(`x\\.lokasi\\.tahap === ${t} \\?`).test(s) && new RegExp(`x\\.jarak\\.tahap === ${t} \\?`).test(s) && new RegExp(`x\\.jalur\\.tahap === ${t} \\?`).test(s), `lab C: pertanyaan tahap ${t} di tiga tampilan`);
      for (const aksi of ["L_DATA", "L_HURUF", "L_ANGKA", "L_TULIS", "J_DATA", "J_HURUF", "J_ANGKA", "J_JARAK", "R_DATA", "R_LANGKAH", "R_JALUR", "R_BANYAK", "RESET"]) cek(s.includes(`t: "${aksi}"`), `lab C: aksi ${aksi} terhubung ke tombol`);
      cek(/x\.jarak\.tahap >= 3 \? \{ dari/.test(s) && /x\.jalur\.tahap >= 2 \? \{ dari/.test(s), "lab C: jalur digambar setelah jarak dan jalur sah terjawab");
      const m = baca("model-petak-k6b3", "tsx");
      cek(/role="img"/.test(m) && /aria-label=\{label\}/.test(m), "model C: kisi berlabel");
      cek(m.includes("max-w-[260px]") && !/(?<!max-)\bw-\[\d{3,}px\]/.test(m), "model C: gambar dibatasi dan tanpa lebar tetap besar");
      cek(m.includes('const HURUF = "ABCDEF"') && C.HURUF_KISI === "ABCDEF" && C.BANYAK_BARIS === 6 && C.BANYAK_KOLOM === 6, "model dan logika memakai kisi huruf A sampai F dan angka 1 sampai 6");
    }
    const ucapan = [];
    for (let i = 0; i < 6; i += 1) ucapan.push(C.ucapLokasiK6B3C(LC(xc0, { t: "L_DATA", i })), C.ucapJarakK6B3C(LC(xc0, { t: "J_DATA", i })), C.ucapJalurK6B3C(LC(xc0, { t: "R_DATA", i })));
    cek(ucapan.length === 18 && ucapan.every(tanpaAngka), `semua ${ucapan.length} ucapan lab C dieja menjadi kata`);
    cek(ucapan.every((u) => /titik|dari|petak/.test(EJ.ejaK6B3(u))), "ucapan lab C memuat kata titik, dari, atau petak");
    // Pengeja: letak petak dibaca sebagai nama huruf lalu angka.
    cek(EJ.ejaK6B3(C.ucapJarakK6B3C(LC(xc0, { t: "J_DATA", i: 0 }))).includes("a tiga ke e lima"), "ucapan jarak: A3 ke E5 dibaca a tiga ke e lima");
    cek(EJ.ejaK6B3(C.opsiTulisLokasi(0).opsi[0]).length > 0 && ["C2", "2C", "D2"].every((v) => C.opsiTulisLokasi(0).opsi.includes(v)), "tulis letak Makassar: pilihan C2, 2C, dan D2");
  }
}

/* ------------------------------ Pendaftaran bab ------------------------------ */
{
  const reg = readFileSync(new URL("../src/components/modul/registri-simulasi.ts", import.meta.url), "utf8");
  const baru = readFileSync(new URL("../src/components/modul/registri-bab-baru.ts", import.meta.url), "utf8");
  cek((reg.match(/"mtk-6-bab3"/g) ?? []).length === 3, "registri-simulasi: mtk-6-bab3 muncul tiga kali (materi, misi awal, ringkas)");
  cek((baru.match(/"mtk-6-bab3"/g) ?? []).length === 1, "registri-bab-baru: mtk-6-bab3 tetap satu kali");
  cek(/"mtk-6-bab3": SimulasiK6Bab3Materi,/.test(reg) && /"mtk-6-bab3": misiAwalK6Bab3,/.test(reg) && /"mtk-6-bab3": ringkasK6B3.subBab as unknown as Record<string, RingkasSub>,/.test(reg), "registri-simulasi: tiga entri menunjuk berkas yang benar");
  cek(reg.includes('import("@/components/modul/SimulasiK6Bab3")') && reg.includes("@/components/modul/misi-teks-k6b3") && reg.includes("@/data/kelas6-bab3-ringkas.json"), "registri-simulasi: komponen dimuat malas, misi dan ringkas dari berkas ringan");
  cek(!/SimulasiLab(Susunan|Tampak|Petak)K6B3/.test(reg), "registri tidak menarik komponen lab ke bundel awal");
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
    "src/components/modul/lab-tampak-k6b3b.ts",
    "src/components/modul/mesin-tampak-k6b3.ts",
    "src/components/modul/model-tampak-k6b3.tsx",
    "src/components/modul/SimulasiLabTampakK6B3.tsx",
    "src/components/modul/lab-petak-k6b3c.ts",
    "src/components/modul/mesin-petak-k6b3.ts",
    "src/components/modul/model-petak-k6b3.tsx",
    "src/components/modul/SimulasiLabPetakK6B3.tsx",
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
