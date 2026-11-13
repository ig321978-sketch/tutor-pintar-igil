// Uji Simulasi Kelas 6 Bab 4 (Peluang): Lab Skala (A), mesin, skenario, misi, gerbang, data ringkas, pengeja,
// dan konsep sub-bab berikutnya tidak bocor ke sub-bab sebelumnya.
// Jalankan: node --no-warnings scripts/uji-lab-k6b4.mjs
import { readFileSync } from "node:fs";
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K4 from "../src/components/modul/misi-k6bab4.ts";
import * as TK from "../src/components/modul/misi-teks-k6b4.ts";
import * as A from "../src/components/modul/lab-skala-k6b4a.ts";
import * as MS from "../src/components/modul/mesin-skala-k6b4.ts";
import * as SK from "../src/components/modul/skenario-k6b4.ts";
import * as ME from "../src/components/modul/mesin-bertahap-k3b1.ts";
import * as EJ from "../src/components/modul/eja-k6b4.ts";
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
const tanpaAngka = (t) => !/\d/.test(EJ.ejaK6B4(t));
const L = A.langkahSkalaK6B4A;
const x0 = A.awalSkalaK6B4A();
globalThis.__pesanA = [];

/* ------------------------------ Hitungan MANDIRI (cara berbeda) ------------------------------ */
// Kode memakai filter dan rumus dua kali k dibanding n. Di sini setiap benda DISEBUT SATU PER SATU dengan penghitung manual,
// dan letak tangga ditentukan dengan memasangkan satu benda cocok dengan satu benda lain sampai salah satunya habis.
const sebut = (daftar, target) => {
  let n = 0;
  for (let i = 0; i < daftar.length; i += 1) if (daftar[i] === target) n += 1;
  return n;
};
const dari = (komposisi) => {
  const d = [];
  for (const [warna, banyak] of Object.entries(komposisi)) for (let i = 0; i < banyak; i += 1) d.push(warna);
  return d;
};
const NAMA_TANGGA = ["Tidak mungkin", "Kurang mungkin", "Mungkin", "Sangat mungkin", "Pasti"];
const tanggaPasangan = (k, n) => {
  let cocok = k;
  let lain = n - k;
  if (cocok === 0) return 0;
  if (lain === 0) return 4;
  while (cocok > 0 && lain > 0) {
    cocok -= 1;
    lain -= 1;
  }
  return cocok > 0 ? 3 : lain > 0 ? 1 : 2;
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
const RAK = { putih: 3, merah: 6, kuning: 1 };
const RENCANA_TANGGA = [
  { nama: "buku merah", isi: RAK, target: "merah", k: 6, n: 10, tangga: 3 },
  { nama: "buku kuning", isi: RAK, target: "kuning", k: 1, n: 10, tangga: 1 },
  { nama: "buku hijau", isi: RAK, target: "hijau", k: 0, n: 10, tangga: 0 },
  { nama: "dadu angka lima", isi: { 5: 8 }, target: "5", k: 8, n: 8, tangga: 4 },
  { nama: "koin gambar", isi: { gambar: 1, angka: 1 }, target: "gambar", k: 1, n: 2, tangga: 2 },
  { nama: "buku putih", isi: RAK, target: "putih", k: 3, n: 10, tangga: 1 },
];
const RENCANA_UJUNG = [
  { nama: "tas pesta", n: 10, k: 4, tangga: 1, pasti: 6, tidak: 4 },
  { nama: "tas sekolah", n: 10, k: 6, tangga: 3, pasti: 4, tidak: 6 },
  { nama: "tas mainan", n: 8, k: 1, tangga: 1, pasti: 7, tidak: 1 },
  { nama: "tas hadiah", n: 12, k: 9, tangga: 3, pasti: 3, tidak: 9 },
  { nama: "tas piknik", n: 10, k: 5, tangga: 2, pasti: 5, tidak: 5 },
  { nama: "tas pasar", n: 9, k: 7, tangga: 3, pasti: 2, tidak: 7 },
];
const RENCANA_PERCOBAAN = [
  { nama: "roda merah", juring: { merah: 6, biru: 2 }, target: "merah", kj: 6, nj: 8, pred: 3, catatan: { merah: 7, biru: 3 }, kc: 7, nc: 10, cat: 3, d: 0 },
  { nama: "roda kuning pendek", juring: { kuning: 1, hijau: 7 }, target: "kuning", kj: 1, nj: 8, pred: 1, catatan: { kuning: 2, hijau: 2 }, kc: 2, nc: 4, cat: 2, d: 1 },
  { nama: "roda kuning panjang", juring: { kuning: 1, hijau: 7 }, target: "kuning", kj: 1, nj: 8, pred: 1, catatan: { kuning: 3, hijau: 17 }, kc: 3, nc: 20, cat: 1, d: 0 },
  { nama: "roda seimbang", juring: { merah: 4, biru: 4 }, target: "merah", kj: 4, nj: 8, pred: 2, catatan: { merah: 7, biru: 3 }, kc: 7, nc: 10, cat: 3, d: 1 },
  { nama: "roda tanpa hijau", juring: { merah: 5, biru: 3 }, target: "hijau", kj: 0, nj: 8, pred: 0, catatan: { merah: 4, biru: 2 }, kc: 0, nc: 6, cat: 0, d: 0 },
  { nama: "roda biru langka", juring: { biru: 1, merah: 7 }, target: "biru", kj: 1, nj: 8, pred: 1, catatan: { biru: 4, merah: 2 }, kc: 4, nc: 6, cat: 3, d: 2 },
];
const ringkasKomposisi = (d) => {
  const h = {};
  for (const v of d) h[v] = (h[v] ?? 0) + 1;
  return Object.fromEntries(Object.entries(h).sort(([a], [b]) => (a < b ? -1 : 1)));
};

/* ------------------------------ Data soal ------------------------------ */
{
  cek(A.SOAL_TANGGA.length === 6 && A.SOAL_UJUNG.length === 6 && A.SOAL_PERCOBAAN.length === 6, "enam soal tiap tampilan");
  sama(A.TANGGA, NAMA_TANGGA, "lima nama tangga berurutan");
  RENCANA_TANGGA.forEach((r, i) => {
    const s = A.SOAL_TANGGA[i];
    const isi = dari(r.isi);
    cek(s.nama === r.nama && s.target === r.target, `Tangga ${i}: nama dan target sesuai rencana`);
    sama(ringkasKomposisi(s.isi), ringkasKomposisi(isi), `Tangga ${i}: isi wadah sama dengan rencana`);
    cek(sebut(isi, r.target) === r.k && A.kTangga(s) === r.k, `Tangga ${i}: yang cocok ${r.k} (disebut satu per satu dan kode)`);
    cek(isi.length === r.n && A.nTangga(s) === r.n, `Tangga ${i}: semua ${r.n}`);
    cek(tanggaPasangan(r.k, r.n) === r.tangga && A.tanggaTangga(s) === NAMA_TANGGA[r.tangga], `Tangga ${i}: tangga ${NAMA_TANGGA[r.tangga]} (pasangan mandiri dan kode)`);
    cek(s.wadah.length > 5 && s.sebut === ["buku merah", "buku kuning", "buku hijau", "sisi angka 5", "sisi gambar", "buku putih"][i], `Tangga ${i}: wadah dan sebutan sesuai rencana`);
  });
  sama(new Set(A.SOAL_TANGGA.map((s) => s.nama)).size, 6, "Tangga: nama soal unik");
  sama(RENCANA_TANGGA.map((r) => r.tangga), [3, 1, 0, 4, 2, 1], "Tangga: urutan tangga tiap soal");
  cek(new Set(RENCANA_TANGGA.map((r) => r.tangga)).size === 5, "Tangga: kelima tangga muncul");
  RENCANA_UJUNG.forEach((r, i) => {
    const s = A.SOAL_UJUNG[i];
    cek(s.nama === r.nama && s.n === r.n && s.k === r.k, `Ujung ${i}: ukuran sesuai rencana`);
    const bola = A.isiUjung(s);
    cek(bola.length === r.n && sebut(bola, "merah") === r.k && sebut(bola, "biru") === r.n - r.k, `Ujung ${i}: gambar ${r.k} merah dan ${r.n - r.k} biru`);
    cek(tanggaPasangan(r.k, r.n) === r.tangga && A.tanggaUjung(s) === NAMA_TANGGA[r.tangga], `Ujung ${i}: tangga ${NAMA_TANGGA[r.tangga]}`);
    // Mengganti bola biru satu per satu sampai semuanya merah, lalu menghitung langkahnya.
    let langkah = 0;
    const b = [...bola];
    for (let j = 0; j < b.length; j += 1) if (b[j] === "biru") { b[j] = "merah"; langkah += 1; }
    cek(langkah === r.pasti && A.gantiPasti(s) === r.pasti && tanggaPasangan(sebut(b, "merah"), b.length) === 4, `Ujung ${i}: ganti ${r.pasti} agar pasti`);
    let keluar = 0;
    const c = [...bola];
    for (let j = 0; j < c.length; j += 1) if (c[j] === "merah") { c[j] = "biru"; keluar += 1; }
    cek(keluar === r.tidak && A.gantiTidak(s) === r.tidak && tanggaPasangan(sebut(c, "merah"), c.length) === 0, `Ujung ${i}: keluarkan ${r.tidak} agar tidak mungkin`);
  });
  sama(new Set(A.SOAL_UJUNG.map((s) => s.nama)).size, 6, "Ujung: nama soal unik");
  RENCANA_PERCOBAAN.forEach((r, i) => {
    const s = A.SOAL_PERCOBAAN[i];
    const juring = dari(r.juring);
    cek(s.nama === r.nama && s.target === r.target, `Percobaan ${i}: nama dan target`);
    sama(ringkasKomposisi(s.juring), ringkasKomposisi(juring), `Percobaan ${i}: juring sama dengan rencana`);
    sama(ringkasKomposisi(s.catatan), ringkasKomposisi(dari(r.catatan)), `Percobaan ${i}: catatan sama dengan rencana`);
    cek(sebut(juring, r.target) === r.kj && A.kJuring(s) === r.kj && juring.length === r.nj, `Percobaan ${i}: juring ${r.kj} dari ${r.nj}`);
    cek(sebut(s.catatan, r.target) === r.kc && A.kCatatan(s) === r.kc && A.nCatatan(s) === r.nc, `Percobaan ${i}: catatan ${r.kc} dari ${r.nc}`);
    cek(tanggaPasangan(r.kj, r.nj) === r.pred && A.tanggaPrediksi(s) === NAMA_TANGGA[r.pred], `Percobaan ${i}: prediksi ${NAMA_TANGGA[r.pred]}`);
    cek(tanggaPasangan(r.kc, r.nc) === r.cat && A.tanggaCatatan(s) === NAMA_TANGGA[r.cat], `Percobaan ${i}: catatan ${NAMA_TANGGA[r.cat]}`);
    cek(Math.abs(r.cat - r.pred) === r.d && A.selisihTangga(s) === r.d, `Percobaan ${i}: selisih tangga ${r.d}`);
    cek(A.nCatatan(s) >= 4 && A.nCatatan(s) <= 20 && juring.length >= 8, `Percobaan ${i}: ukuran catatan dan roda wajar`);
  });
  sama(RENCANA_PERCOBAAN.map((r) => r.d), [0, 1, 0, 1, 0, 2], "Percobaan: selisih tiap soal");
  // Selisih tangga tidak bertanda: catatan LEBIH RENDAH dari prediksi tetap selisih positif (soal sintetis).
  {
    const rendah = { nama: "uji", juring: dari({ merah: 7, biru: 1 }), target: "merah", catatan: dari({ merah: 1, biru: 4 }) };
    cek(tanggaPasangan(7, 8) === 3 && tanggaPasangan(1, 5) === 1 && A.selisihTangga(rendah) === 2, "selisih tangga catatan lebih rendah dari prediksi tetap 2");
    cek(A.selisihTangga({ ...rendah, catatan: dari({ merah: 3, biru: 2 }) }) === 0, "selisih tangga sintetis sama tangga = 0");
  }
  sama([A.idTangga(3), A.idUjung(4), A.idPercobaan(5)], ["tangga:3", "ujung:4", "percobaan:5"], "format id soal");
  // Aturan tangga: dibanding tabel pasangan mandiri untuk semua k dan n kecil.
  let ok = true;
  for (let n = 1; n <= 30 && ok; n += 1) for (let k = 0; k <= n; k += 1) if (A.nomorTangga(k, n) !== tanggaPasangan(k, n)) { ok = false; console.log("tangga beda", k, n); break; }
  cek(ok, "nomorTangga sama dengan pasangan mandiri untuk semua k dan n sampai 30");
}

/* ------------------------------ Pengecoh dan letak kunci ------------------------------ */
{
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
  const pengecohMandiri = (benar, calon) => {
    const u = [];
    for (const c of [...calon, benar + 1, benar + 2, benar - 1, benar + 3, benar - 2, benar + 4]) if (Number.isInteger(c) && c >= 0 && c !== benar && u.indexOf(c) < 0) u.push(c);
    return u.slice(0, 2);
  };
  const cekPeng = (nama, peng, benar, calon) => sama([...peng].sort(), [...pengecohMandiri(benar, calon)].sort(), `${nama}: pengecoh persis dari calon kebiasaan salah`);
  // Pengecoh tangga: dua tangga yang paling dekat (kesalahan khas: bergeser satu tangga), disusun ulang secara mandiri.
  const tetanggaMandiri = (t) => {
    const hasil = [];
    for (const d of [-1, 1, -2, 2]) if (t + d >= 0 && t + d <= 4 && hasil.length < 2) hasil.push(NAMA_TANGGA[t + d]);
    return hasil;
  };
  const cekTangga = (nama, peng, t) => sama([...peng].sort(), [...tetanggaMandiri(t)].sort(), `${nama}: pengecoh tangga persis dua tangga terdekat`);
  const letak = { k: [], n: [], tanggaT: [], tanggaU: [], pasti: [], tidak: [], prediksi: [], catat: [], cocok: [] };
  for (let i = 0; i < 6; i += 1) {
    const r = RENCANA_TANGGA[i];
    let peng = cekPilih(`Tangga ${i} cocok`, A.opsiKTangga(i), r.k, i);
    cekPeng(`Tangga ${i} cocok`, peng, r.k, [r.n, r.n - r.k, r.k + 1]);
    cek(peng.every((v) => v >= 0), `Tangga ${i} cocok: pengecoh tidak negatif`);
    peng = cekPilih(`Tangga ${i} semua`, A.opsiNTangga(i), r.n, i + 1);
    cekPeng(`Tangga ${i} semua`, peng, r.n, [r.k, r.n - r.k, r.n + 1]);
    peng = cekPilih(`Tangga ${i} tangga`, A.opsiTanggaTangga(i), NAMA_TANGGA[r.tangga], i + 2);
    cekTangga(`Tangga ${i}`, peng, r.tangga);
    letak.k.push(A.opsiKTangga(i).benar);
    letak.n.push(A.opsiNTangga(i).benar);
    letak.tanggaT.push(A.opsiTanggaTangga(i).benar);
    const u = RENCANA_UJUNG[i];
    peng = cekPilih(`Ujung ${i} tangga`, A.opsiTanggaUjung(i), NAMA_TANGGA[u.tangga], i);
    cekTangga(`Ujung ${i}`, peng, u.tangga);
    peng = cekPilih(`Ujung ${i} pasti`, A.opsiPasti(i), u.pasti, i + 1);
    cekPeng(`Ujung ${i} pasti`, peng, u.pasti, [u.k, u.n, u.pasti + 1]);
    peng = cekPilih(`Ujung ${i} tidak`, A.opsiTidak(i), u.tidak, i + 2);
    cekPeng(`Ujung ${i} tidak`, peng, u.tidak, [u.n - u.k, u.n, u.tidak + 1]);
    letak.tanggaU.push(A.opsiTanggaUjung(i).benar);
    letak.pasti.push(A.opsiPasti(i).benar);
    letak.tidak.push(A.opsiTidak(i).benar);
    const c = RENCANA_PERCOBAAN[i];
    peng = cekPilih(`Percobaan ${i} prediksi`, A.opsiPrediksi(i), NAMA_TANGGA[c.pred], i);
    cekTangga(`Percobaan ${i} prediksi`, peng, c.pred);
    peng = cekPilih(`Percobaan ${i} catat`, A.opsiCatat(i), c.kc, i + 1);
    cekPeng(`Percobaan ${i} catat`, peng, c.kc, [c.nc, c.nc - c.kc, c.kc + 1]);
    const kunciCocok = [A.JAWAB_SAMA, A.JAWAB_SATU, A.JAWAB_BANYAK][c.d];
    peng = cekPilih(`Percobaan ${i} cocok`, A.opsiCocok(i), kunciCocok, i + 2);
    sama(sortir([...peng, kunciCocok]), sortir([A.JAWAB_SAMA, A.JAWAB_SATU, A.JAWAB_BANYAK]), `Percobaan ${i} cocok: tiga jawaban berbeda`);
    letak.prediksi.push(A.opsiPrediksi(i).benar);
    letak.catat.push(A.opsiCatat(i).benar);
    letak.cocok.push(A.opsiCocok(i).benar);
  }
  for (const [nama, daftar] of Object.entries(letak)) cek(new Set(daftar).size === 3, `letak kunci ${nama} memakai ketiga posisi (${daftar.join("")})`);
  // Pengecoh tangga: tidak ada tangga ganda pada tiap tangga dasar.
  for (let t = 0; t <= 4; t += 1) {
    const p = A.tangga3(t, 0);
    cek(new Set(p.opsi).size === 3 && p.opsi[p.benar] === NAMA_TANGGA[t], `tangga3(${t}): tiga tangga berbeda dan kunci benar`);
  }
  cek(new Set([A.JAWAB_SAMA, A.JAWAB_SATU, A.JAWAB_BANYAK]).size === 3, "tiga teks kecocokan berbeda");
}

/* ------------------------------ Alur tiap soal ------------------------------ */
const kunciTangga = (i, tahap) => [A.opsiKTangga, A.opsiNTangga, A.opsiTanggaTangga][tahap](i).benar;
const kunciUjung = (i, tahap) => [A.opsiTanggaUjung, A.opsiPasti, A.opsiTidak][tahap](i).benar;
const kunciPercobaan = (i, tahap) => [A.opsiPrediksi, A.opsiCatat, A.opsiCocok][tahap](i).benar;
const AKSI = {
  tangga: { data: "T_DATA", tahap: ["T_K", "T_N", "T_TANGGA"], kunci: kunciTangga },
  ujung: { data: "U_DATA", tahap: ["U_TANGGA", "U_PASTI", "U_TIDAK"], kunci: kunciUjung },
  percobaan: { data: "C_DATA", tahap: ["C_PREDIKSI", "C_CATAT", "C_COCOK"], kunci: kunciPercobaan },
};
{
  for (const [nama, def] of Object.entries(AKSI)) {
    for (let i = 0; i < 6; i += 1) {
      let x = L(x0, { t: def.data, i });
      cek(x[nama].data === i && x[nama].tahap === 0 && x.pesan === "", `${nama} ${i}: memilih soal mengatur tahap awal`);
      for (let tahap = 0; tahap < 3; tahap += 1) {
        const kunci = def.kunci(i, tahap);
        for (const o of [0, 1, 2].filter((v) => v !== kunci)) {
          const y = L(x, { t: def.tahap[tahap], o });
          globalThis.__pesanA.push(y.pesan);
          cek(y[nama].tahap === tahap && y[nama].data === i && y.pernah.length === 0 && !y.pesan.startsWith("✅") && y.pesan.length > 10, `${nama} ${i} tahap ${tahap}: pilihan salah ${o} tidak maju dan diberi petunjuk`);
        }
        if (tahap < 2) {
          const lompat = L(x, { t: def.tahap[tahap + 1], o: def.kunci(i, tahap + 1) });
          globalThis.__pesanA.push(lompat.pesan);
          cek(lompat[nama].tahap === tahap && lompat.pernah.length === 0 && !lompat.pesan.startsWith("✅"), `${nama} ${i} tahap ${tahap}: melompat ke tahap ${tahap + 1} ditolak`);
        }
        for (const o of [0.5, 1.5, -1, 3, 99, NaN, Infinity, "1", null, undefined]) cek(L(x, { t: def.tahap[tahap], o }) === x, `${nama} ${i} tahap ${tahap}: indeks ${String(o)} diabaikan`);
        x = L(x, { t: def.tahap[tahap], o: kunci });
        globalThis.__pesanA.push(x.pesan);
        cek(x[nama].tahap === tahap + 1 && x.pesan.startsWith("✅"), `${nama} ${i} tahap ${tahap}: jawaban benar maju dengan pesan sukses`);
        cek(tahap < 2 ? x.pernah.length === 0 : x.pernah.length === 1 && x.pernah[0] === `${nama}:${i}`, `${nama} ${i} tahap ${tahap}: riwayat hanya dicatat di langkah terakhir`);
      }
      for (let tahap = 0; tahap < 3; tahap += 1) cek(L(x, { t: def.tahap[tahap], o: def.kunci(i, tahap) }) === x, `${nama} ${i}: sesudah selesai aksi tahap ${tahap} diabaikan`);
      const ulangPilih = L(x, { t: def.data, i });
      cek(ulangPilih[nama].tahap === 0 && ulangPilih.pernah.includes(`${nama}:${i}`), `${nama} ${i}: memilih soal lagi mengulang tahap tetapi riwayat tetap`);
      for (const lain of Object.keys(AKSI).filter((v) => v !== nama)) cek(x[lain].tahap === 0 && x[lain].data === 0, `${nama} ${i}: tampilan ${lain} tidak berubah`);
    }
    for (const i of [-1, 6, 2.5, NaN, "2", null]) cek(L(x0, { t: def.data, i }) === x0, `${nama}: soal ${String(i)} diabaikan`);
  }
  cek(L(x0, { t: "RESET" }).pernah.length === 0 && L(L(x0, { t: "T_K", o: 0 }), { t: "PESAN_KOSONG" }).pesan === "", "reset dan pesan kosong");
  let y = x0;
  for (const [nama, def] of Object.entries(AKSI)) for (let i = 0; i < 6; i += 1) {
    y = L(y, { t: def.data, i });
    for (let tahap = 0; tahap < 3; tahap += 1) y = L(y, { t: def.tahap[tahap], o: def.kunci(i, tahap) });
  }
  sama([...y.pernah].sort(), [...Array(6).keys()].flatMap((i) => [`tangga:${i}`, `ujung:${i}`, `percobaan:${i}`]).sort(), "semua 18 soal selesai: riwayat 18 id");
  cek(L(y, { t: "RESET" }).pernah.length === 0, "reset menghapus riwayat");
  const kb = A.keadaanSkalaK6B4A(y);
  cek(kb.alat === "skala" && kb.pernah === y.pernah, "keadaan lapor memakai alat skala");
}

/* ------------------------------ Fuzz 20.000 aksi dengan orakel mandiri ------------------------------ */
{
  const acak = acakDari(20261113);
  const NAMA = ["tangga", "ujung", "percobaan"];
  // Kunci orakel dari cacahan dan pasangan mandiri (bukan dari fungsi opsi kode).
  const nilaiKunci = (nama, i, tahap) => {
    if (nama === "tangga") {
      const r = RENCANA_TANGGA[i];
      const isi = dari(r.isi);
      const k = sebut(isi, r.target);
      return [k, isi.length, NAMA_TANGGA[tanggaPasangan(k, isi.length)]][tahap];
    }
    if (nama === "ujung") {
      const r = RENCANA_UJUNG[i];
      return [NAMA_TANGGA[tanggaPasangan(r.k, r.n)], r.n - r.k, r.k][tahap];
    }
    const r = RENCANA_PERCOBAAN[i];
    const juring = dari(r.juring);
    const catatan = dari(r.catatan);
    const kj = sebut(juring, r.target);
    const kc = sebut(catatan, r.target);
    const d = Math.abs(tanggaPasangan(kc, catatan.length) - tanggaPasangan(kj, juring.length));
    return [NAMA_TANGGA[tanggaPasangan(kj, juring.length)], kc, [A.JAWAB_SAMA, A.JAWAB_SATU, A.JAWAB_BANYAK][Math.min(d, 2)]][tahap];
  };
  const daftarOpsi = (nama, i, tahap) => {
    const f = { tangga: [A.opsiKTangga, A.opsiNTangga, A.opsiTanggaTangga], ujung: [A.opsiTanggaUjung, A.opsiPasti, A.opsiTidak], percobaan: [A.opsiPrediksi, A.opsiCatat, A.opsiCocok] };
    return f[nama][tahap](i).opsi;
  };
  const o = { tangga: { data: 0, tahap: 0 }, ujung: { data: 0, tahap: 0 }, percobaan: { data: 0, tahap: 0 }, pernah: new Set() };
  let x = x0;
  let ok = true;
  let pernahTerbesar = 0;
  const selesaiPer = { tangga: 0, ujung: 0, percobaan: 0 };
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
      const tahap = Math.min(o[nama].tahap, 2);
      const kunci = nilaiKunci(nama, o[nama].data, tahap);
      a = { t: def.tahap[tahap], o: daftarOpsi(nama, o[nama].data, tahap).indexOf(kunci) };
    } else a = { t: def.tahap[acak(3)], o: nilaiAcak() };

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
      o.tangga = { data: 0, tahap: 0 };
      o.ujung = { data: 0, tahap: 0 };
      o.percobaan = { data: 0, tahap: 0 };
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
    const cocokOrakel = NAMA.every((k) => x[k].data === o[k].data && x[k].tahap === o[k].tahap) && JSON.stringify([...x.pernah].sort()) === JSON.stringify([...o.pernah].sort());
    if (!cocokOrakel) {
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
  cek(selesaiPer.tangga > 10 && selesaiPer.ujung > 10 && selesaiPer.percobaan > 10, `fuzz: tiap tampilan selesai berkali-kali (${selesaiPer.tangga}, ${selesaiPer.ujung}, ${selesaiPer.percobaan})`);
  cek(pernahTerbesar >= 6, `fuzz: riwayat pernah mencapai ${pernahTerbesar}`);
  cek(x.pernah.every((v) => /^(tangga|ujung|percobaan):[0-5]$/.test(v)), "fuzz: semua id riwayat berbentuk sah");
}

/* ------------------------------ Mesin ------------------------------ */
{
  const def = MS.MESIN_SKALA;
  cek(def.stasiun.length === 4 && def.kasus.length === 3, `${def.id}: empat stasiun, tiga kasus`);
  sama(def.stasiun.map((s) => s.id), ["hitung", "tangga", "ujung", "catat"], "stasiun mesin");
  const posisi = [];
  for (const kasus of def.kasus) {
    cek(kasus.langkah.length === 4, `${def.id}/${kasus.id}: empat langkah`);
    kasus.langkah.forEach((l, i) => {
      cek(l.stasiun === def.stasiun[i].id, `${def.id}/${kasus.id}: langkah ${i + 1} di stasiun ${def.stasiun[i].id}`);
      cek(l.opsi.length === 3 && new Set(l.opsi).size === 3 && l.opsi.filter((o) => o === l.benar).length === 1, `${def.id}/${kasus.id}/${l.stasiun}: tiga pilihan unik, satu kunci`);
      cek(l.opsi.every((o) => (i === 1 || i === 3 ? NAMA_TANGGA.includes(o) : /^\d+$/.test(o))), `${def.id}/${kasus.id}/${l.stasiun}: pilihan berupa nama tangga atau bilangan bulat`);
      cek([l.tanya, l.petunjuk, ...l.opsi].every(tanpaAngka), `${def.id}/${kasus.id}/${l.stasiun}: dapat dieja`);
      cek(!l.tanya.includes(l.benar) || /^\d+$/.test(l.benar), `${def.id}/${kasus.id}/${l.stasiun}: kunci tidak dibocorkan di pertanyaan`);
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
  cek(x.selesai && def.selesaiId === K4.ID_MESIN_K6B4.A, `${def.id}: bisa diselesaikan, id selesai sesuai misi`);
  const y = ME.awalMesin(def);
  const l0 = ME.langkahAktif(y);
  const z = ME.langkahMesin(y, { t: "JAWAB", nilai: l0.opsi.find((o) => o !== l0.benar) });
  cek(z.ke === 0 && z.ditolak === 1 && z.pesan === l0.petunjuk, `${def.id}: jawaban salah ditolak dengan petunjuk`);

  const RENCANA_M = [
    { id: "rak", n: 10, k: 6, putaran: 5, muncul: 4, tangga: 3, catat: 3 },
    { id: "tas", n: 12, k: 4, putaran: 6, muncul: 1, tangga: 1, catat: 1 },
    { id: "roda", n: 9, k: 4, putaran: 8, muncul: 4, tangga: 1, catat: 2 },
  ];
  sama(MS.KASUS_SKALA.map((k) => [k.id, k.n, k.k, k.putaran, k.muncul]), RENCANA_M.map((r) => [r.id, r.n, r.k, r.putaran, r.muncul]), "Mesin: data tiga kasus sesuai rencana");
  for (const [i, r] of RENCANA_M.entries()) {
    const c = def.kasus[i];
    const [hi, ta, uj, ca] = c.langkah;
    cek(tanggaPasangan(r.k, r.n) === r.tangga && tanggaPasangan(r.muncul, r.putaran) === r.catat, `Mesin ${r.id}: tangga mandiri sesuai rencana`);
    cek(hi.benar === String(r.k) && hi.tanya.includes(`ada ${r.n},`) && hi.tanya.includes(`ada ${r.n - r.k}.`), `Mesin ${r.id}: hitung ${r.k}, tanya memuat semua dan yang bukan`);
    cek(ta.benar === NAMA_TANGGA[r.tangga] && ta.tanya.includes(`${r.k} dari ${r.n}`), `Mesin ${r.id}: tangga ${NAMA_TANGGA[r.tangga]}`);
    cek(ta.opsi.includes(NAMA_TANGGA[r.tangga]) && ta.opsi.every((v) => Math.abs(NAMA_TANGGA.indexOf(v) - r.tangga) <= 2), `Mesin ${r.id}: pengecoh tangga berdekatan`);
    cek(uj.benar === String(r.n - r.k) && !uj.tanya.includes(String(r.n - r.k)), `Mesin ${r.id}: ganti ${r.n - r.k} agar pasti, kunci tidak dibocorkan`);
    cek(uj.opsi.every((v) => Number(v) >= 0), `Mesin ${r.id}: pengecoh ujung tidak negatif`);
    cek(ca.benar === NAMA_TANGGA[r.catat] && ca.tanya.includes(`${r.putaran} percobaan`) && ca.tanya.includes(`${r.muncul} kali`), `Mesin ${r.id}: catatan ${NAMA_TANGGA[r.catat]}`);
    cek(c.ringkas.includes(`${r.k} dari ${r.n}`) && c.ringkas.includes(`ganti ${r.n - r.k}`) && c.ringkas.includes(`${r.muncul} dari ${r.putaran}`), `Mesin ${r.id}: ringkas memuat semua hasil`);
    for (const l of c.langkah) cek(l.petunjuk.length > 15, `Mesin ${r.id}/${l.stasiun}: petunjuk ada`);
  }
}

/* ------------------------------ Skenario ------------------------------ */
{
  const S = SK.SKENARIO_K6B4A;
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
  sama(S.id.replace(/-k6b4$/, ""), K4.ID_SKENARIO_K6B4.A, "id skenario sesuai id misi");
  const adegan = (id) => S.adegan.find((a) => a.id === id);
  const bahasa = adegan("bahasa");
  const kb = bahasa.opsi.filter((o) => o.benar);
  cek(kb.length === 1 && kb[0].teks.includes("tidak ada satu pun cara") && bahasa.opsi.length === 3 && new Set(bahasa.opsi.map((o) => o.teks)).size === 3, "bahasa: nol berarti tidak ada satu pun cara");
  const rak = adegan("rak");
  const buku = dari(RAK);
  cek(rak.cerita.includes("3 buku putih") && rak.cerita.includes("6 buku merah") && rak.cerita.includes("1 buku kuning"), "rak: cerita memuat 3, 6, dan 1 buku");
  cek(rak.soal[0].jawaban === String(buku.length), "rak: semua buku 10 (disebut satu per satu)");
  cek(rak.soal[1].jawaban === NAMA_TANGGA[tanggaPasangan(sebut(buku, "merah"), buku.length)] && rak.soal[1].teks.includes("6 dari 10"), "rak: merah 6 dari 10 sangat mungkin");
  cek(rak.soal[2].jawaban === NAMA_TANGGA[tanggaPasangan(sebut(buku, "kuning"), buku.length)] && rak.soal[2].teks.includes("1 dari 10"), "rak: kuning 1 dari 10 kurang mungkin");
  cek(rak.sukses.includes("0 dari 10") && rak.sukses.includes("tidak mungkin"), "rak: sukses menyebut hijau 0 dari 10");
  for (const q of rak.soal) cek(q.opsi.length === 3 && q.opsi.filter((o) => o === q.jawaban).length === 1 && new Set(q.opsi).size === 3, `soal "${q.teks}": tiga pilihan satu kunci`);
  const hitung = adegan("hitung");
  cek(hitung.jumlah === sebut(buku, "merah") && hitung.objek === "stik" && hitung.sukses.includes("6 buku merah"), "hitung: ketuk 6 stik, buku merah 6");
  const ujung = adegan("ujung");
  const tas = [...dari({ merah: 4, biru: 6 })];
  let diganti = 0;
  for (let j = 0; j < tas.length; j += 1) if (tas[j] === "biru") diganti += 1;
  cek(ujung.target === diganti && ujung.maks > ujung.target && ujung.objek === "stik" && ujung.cerita.includes("10 bola") && ujung.cerita.includes("4 di antaranya merah") && ujung.sukses.includes("10 dari 10"), "ujung: 6 stik untuk 6 bola biru dari tas 10 bola");
  cek(ujung.sukses.includes(`${diganti} bola biru`), "ujung: sukses menyebut jumlah bola biru yang diganti");
  const percobaan = adegan("percobaan");
  const kp = percobaan.opsi.filter((o) => o.benar);
  cek(kp.length === 1 && kp[0].teks.includes("prediksi") && percobaan.opsi.length === 3 && percobaan.cerita.includes("Experimental Relative Frequency") && percobaan.cerita.includes("1 juring kuning dan 7 juring hijau"), "percobaan: prediksi dulu, roda 1 kuning dan 7 hijau");
  const catatan = adegan("catatan");
  const roda = dari({ kuning: 1, hijau: 7 });
  cek(tanggaPasangan(sebut(roda, "kuning"), roda.length) === 1 && catatan.cerita.includes("1 juring kuning dari 8 itu kurang mungkin"), "catatan: prediksi 1 dari 8 kurang mungkin");
  cek(catatan.soal[0].jawaban === NAMA_TANGGA[tanggaPasangan(2, 4)] && catatan.soal[0].teks.includes("4 kali") && catatan.soal[0].teks.includes("2 kali"), "catatan: 2 dari 4 mungkin");
  cek(catatan.soal[1].jawaban === NAMA_TANGGA[tanggaPasangan(3, 20)] && catatan.soal[1].teks.includes("20 kali") && catatan.soal[1].teks.includes("3 kali"), "catatan: 3 dari 20 kurang mungkin");
  cek(catatan.sukses.includes("2 dari 4") && catatan.sukses.includes("3 dari 20"), "catatan: sukses memuat dua hasil");
  for (const q of catatan.soal) cek(q.opsi.length === 3 && q.opsi.filter((o) => o === q.jawaban).length === 1 && new Set(q.opsi).size === 3, `soal "${q.teks}": tiga pilihan satu kunci`);
  const posisiPilih = S.adegan.filter((a) => a.jenis === "pilih").map((a) => a.opsi.findIndex((o) => o.benar));
  cek(posisiPilih.length === 2 && new Set(posisiPilih).size === posisiPilih.length, `letak jawaban pilih bervariasi (${posisiPilih.join("")})`);
  const ps = [...rak.soal, ...catatan.soal].map((q) => q.opsi.indexOf(q.jawaban));
  cek(ps.every((p) => p >= 0) && new Set(ps).size === 3, `letak jawaban soal memakai ketiga posisi (${ps.join("")})`);
  for (const a of [rak, catatan]) cek(new Set(a.soal.map((q) => q.opsi.indexOf(q.jawaban))).size === 3, `${a.id}: letak kunci antar soal bervariasi`);
  cek(S.adegan.filter((a) => a.jenis === "pilih").every((a) => a.opsi.length === 3 && a.opsi.filter((o) => o.benar).length === 1), "setiap pilih: tiga opsi, satu benar");
  const metode = S.adegan.map((a) => a.cerita).join(" ");
  cek(/Qualitative Probability Language/.test(bahasa.cerita) && /Likelihood Spectrum Scale/.test(rak.cerita) && /Impossible-Certain Continuum/.test(ujung.cerita) && /Experimental Relative Frequency/.test(percobaan.cerita), "tiap metode luar berlabel di adegannya sendiri");
  cek(/Qualitative Probability Language/.test(metode) && /Likelihood Spectrum Scale/.test(metode) && /Impossible-Certain Continuum/.test(metode) && /Experimental Relative Frequency/.test(metode), "skenario memuat empat metode luar berlabel");
}

/* ------------------------------ Misi ------------------------------ */
{
  sama(Object.keys(TK.MISI_K6B4), ["A"], "teks misi untuk A");
  sama(Object.keys(TK.NAMA_SIM_K6B4), ["A"], "nama simulasi untuk A");
  cek(TK.hurufK6B4("Z") === "A" && TK.hurufK6B4("A") === "A", "huruf tak dikenal jatuh ke A");
  cek(TK.misiAwalK6Bab4("A").startsWith("Simulasi 1. Misi: ") && tanpaAngka(TK.misiAwalK6Bab4("A")) && tanpaAngka(TK.NAMA_SIM_K6B4.A), "misi awal dapat dieja");
  const daftar = K4.daftarMisiK6Bab4("A");
  cek(K4.daftarMisiK6Bab4("Z") === K4.MISI_A, "huruf tak dikenal memakai misi A");
  cek(daftar.filter((m) => m.wajib).length === 7 && daftar.filter((m) => !m.wajib).length === 3, "A: tujuh misi wajib dan tiga tantangan bebas");
  cek(new Set(daftar.map((m) => m.id)).size === 10 && daftar.every((m) => m.id.startsWith("a-")), "A: id misi unik berawalan huruf");
  const kosong = [{ alat: "skala", pernah: [] }, { alat: "lain", pernah: [] }, sel("tidak-ada"), A.keadaanSkalaK6B4A(A.awalSkalaK6B4A())];
  cek(kosong.every((k) => M0.misiBaru(daftar, k, new Set()).length === 0), "A: keadaan awal alat tidak memenuhi misi mana pun");
  const baru = (k) => M0.misiBaru(daftar, k, new Set());
  cek(baru(sel(K4.ID_MESIN_K6B4.A)).join() === "a-mesin" && baru(sel(K4.ID_SKENARIO_K6B4.A)).join() === "a-skenario", "A: id mesin dan skenario memenuhi misinya");
  const S = (...id) => ({ alat: "skala", pernah: id });
  const harap = {
    "a-tangga-merah": ["tangga:0"],
    "a-tangga-nol": ["tangga:2"],
    "a-tangga-pasti": ["tangga:3"],
    "a-ujung-pasti": ["ujung:0"],
    "a-percobaan-roda": ["percobaan:0"],
  };
  for (const [id, perlu] of Object.entries(harap)) {
    const m = daftar.find((v) => v.id === id);
    cek(m.wajib && m.cek(S(...perlu)), `${id}: terpenuhi oleh ${perlu.join()}`);
    cek(!m.cek({ alat: "lain", pernah: perlu }), `${id}: alat lain dengan id sama tidak memenuhi`);
    cek(!m.cek(sel(perlu[0])), `${id}: keadaan selesai dengan id sama tidak memenuhi`);
    const [tamp, nomor] = perlu[0].split(":");
    for (let j = 0; j < 6; j += 1) if (j !== Number(nomor)) cek(!m.cek(S(`${tamp}:${j}`)), `${id}: soal ${tamp}:${j} saja tidak memenuhi`);
    for (const lain of ["tangga", "ujung", "percobaan"].filter((v) => v !== tamp)) cek(!m.cek(S(`${lain}:${nomor}`)), `${id}: ${lain}:${nomor} saja tidak memenuhi`);
    cek(!m.cek(S()), `${id}: riwayat kosong tidak memenuhi`);
  }
  for (const tamp of ["tangga", "ujung", "percobaan"]) for (let j = 0; j < 6; j += 1) {
    const dipenuhi = daftar.filter((m) => m.wajib && !["a-mesin", "a-skenario"].includes(m.id) && m.cek(S(`${tamp}:${j}`))).map((m) => m.id);
    const tunggu = Object.entries(harap).filter(([, p]) => p[0] === `${tamp}:${j}`).map(([id]) => id);
    sama(dipenuhi, tunggu, `misi terpenuhi oleh ${tamp}:${j} saja`);
  }
  for (const [id, tamp] of [["a-tangga-semua", "tangga"], ["a-ujung-semua", "ujung"], ["a-percobaan-semua", "percobaan"]]) {
    const m = daftar.find((v) => v.id === id);
    const semua = [0, 1, 2, 3, 4, 5].map((j) => `${tamp}:${j}`);
    cek(!m.wajib && m.cek(S(...semua)), `${id}: terpenuhi oleh keenam soal`);
    for (let j = 0; j < 6; j += 1) cek(!m.cek(S(...semua.filter((_, q) => q !== j))), `${id}: tanpa soal ${j} belum terpenuhi`);
    cek(!m.cek(S(...[0, 1, 2, 3, 4, 5].map((j) => `${["tangga", "ujung", "percobaan"].find((v) => v !== tamp)}:${j}`))), `${id}: keenam soal tampilan lain tidak memenuhi`);
  }
  const tampil = M0.tampilMisi(daftar);
  const wajibIds = daftar.filter((m) => m.wajib).map((m) => m.id);
  cek(!M0.wajibSelesai(tampil, new Set(wajibIds.slice(0, 6))), "A: enam dari tujuh wajib belum membuka gerbang");
  cek(M0.wajibSelesai(tampil, new Set(wajibIds)), "A: tujuh wajib membuka gerbang");
  cek(M0.bolehLanjut({ adaMisi: true, wajibSelesai: false, dilewati: true, disentuh: true }) && !M0.bolehLanjut({ adaMisi: true, wajibSelesai: false, dilewati: true, disentuh: false }), "lewati hanya setelah menyentuh simulasi");
  cek(M0.bolehLanjut({ adaMisi: true, wajibSelesai: true, dilewati: false, disentuh: false }), "gerbang terbuka setelah semua wajib");
  cek(!M0.bolehLanjut({ adaMisi: true, wajibSelesai: false, dilewati: false, disentuh: true }), "gerbang tertutup bila wajib belum selesai dan belum dilewati");
  const dicapai = new Set();
  M0.laporMisi(daftar, S("tangga:0"), (id) => dicapai.add(id));
  M0.laporMisi(daftar, S(), (id) => dicapai.add(id));
  cek(dicapai.size === 1 && dicapai.has("a-tangga-merah"), "laporMisi: hanya misi yang terpenuhi yang dicapai");
  cek(daftar.every((m) => tanpaAngka(m.teks)), "teks tiap misi dapat dieja");
  cek(daftar.every((m) => !/\d/.test(m.teks)), "teks misi tanpa angka (semua bilangan ditulis dengan kata)");
}

/* ------------------------------ Pengeja ------------------------------ */
{
  let bagus = true;
  for (let n = 0; n <= 9999; n += 1) if (EJ.kataK6B4(n) !== bacaMandiri(n)) {
    bagus = false;
    console.log("kata salah:", n, EJ.kataK6B4(n), bacaMandiri(n));
    break;
  }
  cek(bagus, "bilangan 0 sampai 9999 sama dengan hitungan mandiri per digit");
  cek(EJ.kataK6B4(10000) === "10000" && EJ.kataK6B4(-1) === "-1" && EJ.kataK6B4(2.5) === "2.5", "di luar jangkauan dikembalikan apa adanya");
  const e = EJ.ejaK6B4;
  sama(e("6 dari 10"), "enam dari sepuluh", "ejaan 6 dari 10");
  sama(e("4/7"), "empat per tujuh", "ejaan 4/7");
  sama(e("1 / 2"), "satu per dua", "ejaan 1 / 2");
  sama(e("2 × 6 = 12"), "dua kali enam sama dengan dua belas", "ejaan kali dan sama dengan");
  sama(e("3 x 3"), "tiga kali tiga", "ejaan x sebagai kali");
  sama(e("pemain A dan B"), "pemain a dan be", "huruf tunggal dibaca namanya");
  sama(e("Lantai 2"), "Lantai dua", "huruf kecil tidak diubah");
  sama(e("Ayo ADA dan Bab"), "Ayo ADA dan Bab", "kata berhuruf besar tidak terpengaruh");
  sama(e("Ada 12 bola."), "Ada dua belas bola.", "titik tidak terpisah");
  sama(e("6 < 10 dan 12 > 10"), "enam kurang dari sepuluh dan dua belas lebih dari sepuluh", "tanda kurang dari dan lebih dari");
  sama(e("kurung (3)"), "kurung kurung buka tiga kurung tutup", "kurung");
  sama(e("Berapa …?"), "Berapa titik-titik?", "elipsis");
  sama(e("6 − 2 = 4"), "enam dikurangi dua sama dengan empat", "kurang dengan minus");
  cek(!/\d/.test(e("Roda 8 juring, 1/8, 3 dari 20, 9999 bola, A dan B")), "angka dan pecahan tidak tersisa");
  for (const h of "ABCDEFGH") cek(EJ.NAMA_HURUF_K6B4[h], `huruf ${h} punya nama`);
}

/* ------------------------------ Data ringkas (peta dan infografis) ------------------------------ */
const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas6-bab4-ringkas.json", import.meta.url), "utf8"));
{
  cek(ringkas.chapter_id === "mtk-6-bab4" && ringkas.grade === 6 && ringkas.phase_code === "FASE_C", "ringkas: identitas bab");
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
  cek(!/correct_index|explanation/.test(JSON.stringify(ringkas)), "ringkas: tanpa correct_index atau explanation");
  // Angka di infografis cocok dengan hitungan mandiri.
  const tangga = (k, n) => NAMA_TANGGA[tanggaPasangan(k, n)];
  const teksInfo = JSON.stringify(a.infografis);
  cek(tangga(0, 10) === "Tidak mungkin" && tangga(6, 10) === "Sangat mungkin" && tangga(8, 8) === "Pasti" && tangga(1, 10) === "Kurang mungkin" && tangga(1, 2) === "Mungkin" && tangga(1, 8) === "Kurang mungkin" && tangga(3, 20) === "Kurang mungkin", "ringkas A: contoh infografis cocok dengan tangga mandiri");
  cek(["0 dari 10", "6 dari 10", "8 dari 8", "1 dari 10", "1 dari 2", "1 dari 8", "3 dari 20"].every((t) => teksInfo.includes(t)), "ringkas A: infografis memuat contoh yang dihitung");
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
  // Sub-Bab A hanya membahas skala, tangga, dua ujung, k dari n, dan catatan percobaan. Permainan, adil, rasio menguntungkan terhadap
  // total, membandingkan dua peluang, samakan total, dan keputusan (Sub-Bab B) belum boleh muncul.
  const BOCOR_A = /(\badil\b|kurang adil|\brasio|menguntungkan|favorable|\bpemain\b|\bpermainan\b|samakan|total bersama|\bKPK\b|keputusan|\bpecahan|desimal|persen|banding|comparative|fair game|equal chance|relative likelihood|\d ?\/ ?\d|\bsilang\b)/i;
  const catat = (teks, apa) => {
    const m = BOCOR_A.exec(teks);
    cek(!m, `A: ${apa} bebas konsep adil, rasio, banding, dan keputusan (${m ? m[0] : ""} di "${String(teks).slice(Math.max(0, (m?.index ?? 0) - 30), (m?.index ?? 0) + 40)}")`);
  };
  for (const t of [TK.MISI_K6B4.A, TK.NAMA_SIM_K6B4.A, ...K4.MISI_A.map((m) => m.teks)]) catat(t, "teks misi");
  for (const [nama, o] of [["mesin", MS.MESIN_SKALA], ["skenario", SK.SKENARIO_K6B4A], ["peta dan infografis ringkas", ringkas.subBab.A]]) catat(teksDari(o), nama);
  for (const [f, e] of [["SimulasiLabSkalaK6B4", "tsx"], ["model-skala-k6b4", "tsx"], ["lab-skala-k6b4a", "ts"], ["mesin-skala-k6b4", "ts"]]) catat(tanpaKomentar(baca(f, e)).replace(/ ([-=+] |=> )/g, " ").replace(/<\/?[a-z]+/g, " "), `${f} (tanpa komentar)`);
  for (const p of globalThis.__pesanA) catat(p, "pesan lab dari fuzz");
  for (const u of [A.ucapTanggaK6B4A(x0), A.ucapUjungK6B4A(x0), A.ucapPercobaanK6B4A(x0)]) catat(u, "ucapan lab");
  cek(globalThis.__pesanA.length > 20000, `pesan fuzz terkumpul (${globalThis.__pesanA.length})`);
  cek(globalThis.__pesanA.every((p) => typeof p === "string" && !/\d[.,]\d/.test(p)), "pesan lab: hanya bilangan bulat (tanpa pecahan atau desimal)");
  cek(globalThis.__pesanA.every((p) => !p.startsWith("✅") || /✅ /.test(p)), "pesan sukses: ✅ diikuti spasi");

  for (const f of ["SimulasiLabSkalaK6B4", "SimulasiK6Bab4", "model-skala-k6b4"]) {
    const s = baca(f, "tsx");
    cek(!/correct_index|explanation/.test(s), `${f}: tidak memuat correct_index atau explanation`);
    cek(!/fetch\(|XMLHttpRequest|api\/|openai|anthropic|gemini/i.test(s), `${f}: tanpa jaringan atau model bahasa`);
  }
  for (const f of ["lab-skala-k6b4a", "mesin-skala-k6b4", "skenario-k6b4", "misi-k6bab4", "misi-teks-k6b4", "eja-k6b4"]) {
    const s = baca(f, "ts");
    cek(!/fetch\(|XMLHttpRequest|from "react"|openai|anthropic|gemini|correct_index|explanation/i.test(s), `${f}: murni`);
    const impor = s.match(/^import .+$/gm) ?? [];
    cek(impor.every((l) => l.startsWith("import type")), `${f}: hanya mengimpor tipe`);
  }
  cek((baca("lab-skala-k6b4a", "ts").match(/^import /gm) ?? []).length === 0 && (baca("eja-k6b4", "ts").match(/^import /gm) ?? []).length === 0, "lab dan pengeja tanpa impor sama sekali");
  {
    const s = tanpaKomentar(baca("lab-skala-k6b4a", "ts"));
    cek(!/\.toFixed|parseFloat|Math\.(round|floor|ceil|random)|\d\.\d/.test(s), "logika lab: hanya bilangan bulat");
    const m = tanpaKomentar(baca("mesin-skala-k6b4", "ts"));
    cek(!/\.toFixed|parseFloat|Math\.(round|floor|ceil|random)|\d\.\d/.test(m), "logika mesin: hanya bilangan bulat");
    cek(!/\s\/\s/.test(s.replace(/\/\/.*$/gm, "")) && !/[a-z)]\s?\/\s?[a-z(]/i.test(s.replace(/\/\/.*$/gm, "").replace(/"[^"]*"/g, "").replace(/`[^`]*`/g, "")), "logika lab: tanpa pembagian");
  }
  {
    const s = baca("SimulasiLabSkalaK6B4", "tsx");
    cek(/useEffect\(\(\) => \{\s*onKeadaan\?\.\(keadaan\w+\(x\)\);\s*\}, \[onKeadaan, x\]\);/.test(s), "lab: lapor keadaan lewat useEffect");
    cek(/setLihat\(v\);\s*kirim\(\{ t: "PESAN_KOSONG" \}\);/.test(s), "lab: ganti tampilan mengosongkan pesan");
    const catatan = [...s.matchAll(/^\s*"([^"]+)",$/gm)].map((m) => m[1]);
    cek(catatan.length >= 3 && catatan.every(tanpaAngka), "lab: Coba ini dapat dieja");
    for (const awalan of ["Yang cocok", "Semua yang ada", "Tangga", "Bola diganti", "Bola dikeluarkan", "Prediksi", "Muncul", "Catatan"]) cek(s.includes(`awalan="${awalan}"`), `lab: pilihan berlabel ${awalan}`);
    for (const awalan of ["Pilih soal tangga ", "Pilih soal ujung ", "Pilih soal percobaan "]) cek(s.includes(`label={\`${awalan}`), `lab: pilihan soal berlabel ${awalan.trim()}`);
    for (const t of [0, 1, 2]) cek(new RegExp(`x\\.tangga\\.tahap === ${t} \\?`).test(s) && new RegExp(`x\\.ujung\\.tahap === ${t} \\?`).test(s) && new RegExp(`x\\.percobaan\\.tahap === ${t} \\?`).test(s), `lab: pertanyaan tahap ${t} di tiga tampilan`);
    for (const aksi of ["T_DATA", "T_K", "T_N", "T_TANGGA", "U_DATA", "U_TANGGA", "U_PASTI", "U_TIDAK", "C_DATA", "C_PREDIKSI", "C_CATAT", "C_COCOK", "RESET"]) cek(s.includes(`t: "${aksi}"`), `lab: aksi ${aksi} terhubung ke tombol`);
    const m = baca("model-skala-k6b4", "tsx");
    cek(/role="img"/.test(m) && (m.match(/aria-label=\{label\}/g) ?? []).length >= 3, "model: wadah, catatan, dan roda berlabel");
    cek(m.includes("max-w-[200px]") && m.includes("max-w-[420px]") && !/(?<!max-)\bw-\[\d{3,}px\]/.test(m), "model: gambar dibatasi dan tanpa lebar tetap besar");
    cek(/boxShadow: v === target \?/.test(m), "model: catatan menandai putaran target dengan lingkaran emas");
    cek(!/🪙/.test(m + s), "model dan lab: tanpa emoji koin (Emoji 13)");
  }
  const pembungkus = baca("SimulasiK6Bab4", "tsx");
  cek(/eja=\{ejaK6B4\}/.test(pembungkus), "pembungkus: mesin dieja ejaK6B4");
  const coba = [...pembungkus.matchAll(/"([^"]*\?)"/g)].map((m) => m[1]);
  cek(coba.length >= 3 && coba.every(tanpaAngka), "Coba ini mesin dapat dieja");
  const ucapan = [];
  for (let i = 0; i < 6; i += 1) ucapan.push(A.ucapTanggaK6B4A(L(x0, { t: "T_DATA", i })), A.ucapUjungK6B4A(L(x0, { t: "U_DATA", i })), A.ucapPercobaanK6B4A(L(x0, { t: "C_DATA", i })));
  cek(ucapan.length === 18 && ucapan.every(tanpaAngka), `semua ${ucapan.length} ucapan lab dieja menjadi kata`);
}

/* ------------------------------ Pendaftaran bab ------------------------------ */
{
  const reg = readFileSync(new URL("../src/components/modul/registri-simulasi.ts", import.meta.url), "utf8");
  const baru = readFileSync(new URL("../src/components/modul/registri-bab-baru.ts", import.meta.url), "utf8");
  cek((reg.match(/"mtk-6-bab4"/g) ?? []).length === 0, "registri-simulasi: mtk-6-bab4 belum didaftarkan (gelombang A)");
  cek((baru.match(/"mtk-6-bab4"/g) ?? []).length === 1, "registri-bab-baru: mtk-6-bab4 tetap satu kali");
  cek(!/SimulasiLab(Skala|Banding)K6B4/.test(reg), "registri tidak menarik komponen lab ke bundel awal");
}

/* ------------------------------ Emoji paling tinggi Emoji 12 ------------------------------ */
{
  const berkas = [
    "src/components/modul/eja-k6b4.ts",
    "src/components/modul/lab-skala-k6b4a.ts",
    "src/components/modul/mesin-skala-k6b4.ts",
    "src/components/modul/skenario-k6b4.ts",
    "src/components/modul/misi-k6bab4.ts",
    "src/components/modul/misi-teks-k6b4.ts",
    "src/components/modul/model-skala-k6b4.tsx",
    "src/components/modul/SimulasiLabSkalaK6B4.tsx",
    "src/components/modul/SimulasiK6Bab4.tsx",
    "src/data/kelas6-bab4-ringkas.json",
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
