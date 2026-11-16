// Uji Simulasi Modul Kedua Kelas 4 Bab 1 Sub-Bab A (naskah orisinal IGIL): pengeja, Lab Kemasan, Mesin Baca, skenario Gim Kebun Kira, misi, gerbang,
// dan konsep tidak bocor dari sub-bab berikutnya. Turunan scripts/uji-lab-k4b1.mjs (Modul Kesatu tidak diubah). Semua kunci dihitung ulang mandiri.
// Jalankan: node --no-warnings scripts/uji-lab-k4b1-kedua.mjs
import { readFileSync } from "node:fs";
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K4 from "../src/components/modul/misi-k4b1ka.ts";
import * as TK from "../src/components/modul/misi-teks-k4b1ka.ts";
import * as A from "../src/components/modul/lab-kemasan-k4b1ka.ts";
import * as ME from "../src/components/modul/mesin-bertahap-k3b1.ts";
import * as MB from "../src/components/modul/mesin-data-k4b1ka.ts";
import * as SB from "../src/components/modul/skenario-k4b1ka.ts";
import * as EJ from "../src/components/modul/eja-k4b1.ts";


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
    return s % n;
  };
};

/* ------------------------------ Hitungan MANDIRI ------------------------------ */
// Pembaca bilangan mandiri: menyusun kata dari tabel kelompok, bukan dari fungsi lab.
const KATA = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
function bacaMandiri(n) {
  if (n === 0) return "nol";
  if (n === 10000) return "sepuluh ribu";
  const kata = [];
  const ribu = Math.trunc(n / 1000);
  const ratus = Math.trunc((n % 1000) / 100);
  const sisa = n % 100;
  if (ribu > 0) kata.push(ribu === 1 ? "seribu" : `${KATA[ribu]} ribu`);
  if (ratus > 0) kata.push(ratus === 1 ? "seratus" : `${KATA[ratus]} ratus`);
  if (sisa > 0) {
    if (sisa < 10) kata.push(KATA[sisa]);
    else if (sisa === 10) kata.push("sepuluh");
    else if (sisa === 11) kata.push("sebelas");
    else if (sisa < 20) kata.push(`${KATA[sisa - 10]} belas`);
    else kata.push([`${KATA[Math.trunc(sisa / 10)]} puluh`, KATA[sisa % 10]].filter(Boolean).join(" "));
  }
  return kata.join(" ");
}
const angkaTeks = (s) => Number(String(s).replace(/\./g, ""));
const dig = (n) => String(n).padStart(4, "0").split("").map(Number);
const titik = (n) => (n >= 1000 ? `${Math.trunc(n / 1000)}.${String(n % 1000).padStart(3, "0")}` : String(n));

/* ------------------------------ Pengeja ------------------------------ */
{
  let ok = true;
  for (let n = 0; n <= 10000; n += 1) if (EJ.kataBilK4B1(n) !== bacaMandiri(n)) ok = false;
  cek(ok, "kataBilK4B1: 0 sampai 10.000 sama dengan pembaca mandiri");
  sama(EJ.ejaK4B1("Jarak 3.286 meter."), "Jarak tiga ribu dua ratus delapan puluh enam meter.", "eja titik ribuan");
  sama(EJ.ejaK4B1("Harga Rp7.300."), "Harga tujuh ribu tiga ratus rupiah.", "eja rupiah");
  sama(EJ.ejaK4B1("1.025 dan 10.000"), "seribu dua puluh lima dan sepuluh ribu", "eja seribu dan sepuluh ribu");
  sama(EJ.ejaK4B1("8.750 > 7.500"), "delapan ribu tujuh ratus lima puluh lebih dari tujuh ribu lima ratus", "eja tanda lebih dari");
  sama(EJ.ejaK4B1("2.000 + 100 + 50 + 0 = 2.150"), "dua ribu ditambah seratus ditambah lima puluh ditambah nol sama dengan dua ribu seratus lima puluh", "eja uraian");
  cek(!/\d/.test(EJ.ejaK4B1("Rp5.000, Rp2.000, dan 3 keping Rp100 = Rp7.300")), "eja: tidak ada angka tersisa");
}

/* ------------------------------ Lab Kemasan (A) ------------------------------ */
const aa = (x, ...ak) => ak.reduce((s, a) => A.langkahKemasanK4B1KA(s, a), x);
const ka = A.keadaanKemasanK4B1KA;
/** Rakit n dari keadaan awal lewat tombol (kurangi semua, lalu tambah). */
function rakit(x, n) {
  let s = x;
  for (const j of A.URUT_KEMASAN) while (s.k[j] > 0) s = aa(s, { t: "UBAH", jenis: j, d: -1 });
  const d = n === 10000 ? [10, 0, 0, 0] : dig(n);
  A.URUT_KEMASAN.forEach((j, i) => {
    for (let k = 0; k < d[i]; k += 1) s = aa(s, { t: "UBAH", jenis: j, d: 1 });
  });
  return s;
}
function tulisKartu(x, n) {
  let s = x;
  const d = dig(n);
  for (let i = 0; i < 4; i += 1) while (s.kartu[i] !== d[i]) s = aa(s, { t: "KARTU", i, d: 1 });
  return aa(s, { t: "PERIKSA" });
}
const pilihTarget = (x, n) => {
  let s = x;
  for (let k = 0; k < A.TARGET_TULIS.length && A.TARGET_TULIS[s.target].n !== n; k += 1) s = aa(s, { t: "TARGET", d: 1 });
  return s;
};
{
  const a0 = A.awalKemasanK4B1KA();
  cek(A.totalKemasan(a0.k) === 2900 && !a0.baca && a0.pernah.length === 0, "A awal: 2.900, bacaan mati, tanpa riwayat");
  let okBaca = true;
  let okBagian = true;
  for (let n = 0; n <= 10000; n += 1) {
    if (A.bacaK4B1KA(n) !== bacaMandiri(n)) okBaca = false;
    if (n > 0 && n < 10000) {
      const bg = A.bagianBaca(n);
      const d = dig(n);
      if (bg.length !== 4) okBagian = false;
      for (let i = 0; i < 4; i += 1) {
        const gabung = i === 3 && d[2] === 1;
        if (bg[i].lewati !== (d[i] === 0 && !gabung) || (bg[i].kata === null) !== (d[i] === 0 || gabung)) okBagian = false;
      }
      if (bg.map((b) => b.kata).filter(Boolean).join(" ") !== bacaMandiri(n)) okBagian = false;
      if (bg.some((b) => b.kata && /\bnol\b/.test(b.kata))) okBagian = false;
    }
    if (n < 10000 && A.lambangK4B1(n) !== titik(n)) okBaca = false;
  }
  cek(okBaca, "bacaan dan lambang 0 sampai 10.000 sama dengan hitungan mandiri");
  cek(okBagian, "bagian bacaan empat tempat: tiap tempat bernilai nol dilewati, belasan digabung, kata 'nol' tidak pernah dibaca, gabungannya = bacaan mandiri");
  sama(A.bagianBaca(5007).map((b) => (b.lewati ? "lewat" : b.kata)), ["lima ribu", "lewat", "lewat", "tujuh"], "5.007: ratusan dan puluhan sama-sama tampak dilewati");
  sama(A.bacaK4B1KA(5007), "lima ribu tujuh", "5.007 dibaca lima ribu tujuh");
  sama(A.bacaK4B1KA(1308), "seribu tiga ratus delapan", "1.308 dibaca seribu tiga ratus delapan");

  // Penukaran berantai.
  const tukarDus = aa(a0, { t: "UBAH", jenis: "dus", d: 1 });
  cek(tukarDus.k.peti === 3 && tukarDus.k.dus === 0 && A.totalKemasan(tukarDus.k) === 3000 && tukarDus.pernah.includes("tukar:dus") && tukarDus.pesan.includes("10 dus ditukar 1 peti"), "10 dus ditukar 1 peti");
  let rantai = rakit(a0, 999);
  rantai = aa(rantai, { t: "UBAH", jenis: "benda", d: 1 });
  cek(A.totalKemasan(rantai.k) === 1000 && rantai.k.peti === 1 && rantai.k.dus === 0 && rantai.k.bungkus === 0 && rantai.k.benda === 0 && ["tukar:benda", "tukar:bungkus", "tukar:dus"].every((p) => rantai.pernah.includes(p)), "999 + 1 benda: penukaran berantai sampai 1 peti");
  const penuh = rakit(a0, 10000);
  cek(A.totalKemasan(penuh.k) === 10000 && penuh.pernah.includes("rakit:10000"), "rakit 10.000 = 10 peti");
  const lewat = aa(penuh, { t: "UBAH", jenis: "benda", d: 1 });
  cek(A.totalKemasan(lewat.k) === 10000 && lewat.pesan.includes("Batas"), "tidak bisa melewati 10.000");
  const kosong = aa(rakit(a0, 0), { t: "UBAH", jenis: "peti", d: -1 });
  cek(kosong.pesan.startsWith("Tidak ada peti"), "tidak bisa mengambil kemasan yang tidak ada");

  // Tulis: semua 10.000 susunan kartu untuk dua sasaran, tepat satu yang benar.
  for (const t of [4718, 5007]) {
    let benar = 0;
    let okPesan = true;
    const s0 = pilihTarget(a0, t);
    for (let n = 0; n <= 9999; n += 1) {
      const s = A.langkahKemasanK4B1KA({ ...s0, kartu: dig(n) }, { t: "PERIKSA" });
      if (s.pernah.includes(`tulis:${t}`)) benar += 1;
      else {
        const iBeda = dig(n).findIndex((v, i) => v !== dig(t)[i]);
        if (!s.pesan.includes(`Kartu ${A.NAMA_TEMPAT[iBeda]}`) || !s.pesan.includes(bacaMandiri(n))) okPesan = false;
      }
    }
    cek(benar === 1, `tulis ${titik(t)}: tepat satu susunan dari 10.000 yang diterima`);
    cek(okPesan, `tulis ${titik(t)}: pesan menunjuk tempat pertama yang keliru dan membacakan tulisan anak`);
  }

  // Fuzz.
  const acak = acakDari(41);
  let s = a0;
  let ok = true;
  for (let n = 0; n < 20000; n += 1) {
    const ak = [
      () => ({ t: "UBAH", jenis: A.URUT_KEMASAN[acak(4)], d: acak(3) ? 1 : -1 }),
      () => ({ t: "TOGGLE", rep: acak(2) ? "baca" : "papan" }),
      () => ({ t: "TARGET", d: acak(2) ? 1 : -1 }),
      () => ({ t: "KARTU", i: acak(4), d: acak(2) ? 1 : -1 }),
      () => ({ t: "PERIKSA" }),
    ][acak(5)]();
    const sebelum = s;
    s = A.langkahKemasanK4B1KA(s, ak);
    const tot = A.totalKemasan(s.k);
    if (tot < 0 || tot > 10000 || s.k.dus > 9 || s.k.bungkus > 9 || s.k.benda > 9 || s.k.peti > 10) ok = false;
    if (ak.t === "UBAH" && tot !== A.totalKemasan(sebelum.k) && Math.abs(tot - A.totalKemasan(sebelum.k)) !== A.ISI_KEMASAN[ak.jenis]) ok = false;
    if (!sebelum.pernah.every((p) => s.pernah.includes(p))) ok = false;
  }
  cek(ok, "fuzz 20.000 aksi lab kemasan: tiap kemasan 0 sampai 9, total ≤ 10.000, jumlah berubah tepat sebesar isi kemasan");
}


/* ------------------------------ Mesin Bertahap ------------------------------ */
{
  const posisi = [];
  for (const def of [MB.MESIN_BACA_KA]) {
    cek(def.stasiun.length === 4 && def.kasus.length === 3, `${def.id}: 4 stasiun, 3 kasus`);
    const lokal = [];
    for (const kasus of def.kasus) {
      cek(kasus.langkah.length === 4, `${def.id}/${kasus.id}: satu langkah per stasiun`);
      kasus.langkah.forEach((l, i) => {
        cek(l.stasiun === def.stasiun[i].id, `${kasus.id}: stasiun ${i} bernama ${def.stasiun[i].id}`);
        cek(l.opsi.length === 3 && new Set(l.opsi).size === 3 && l.opsi.filter((o) => o === l.benar).length === 1, `${def.id}/${kasus.id}/${l.stasiun}: tiga pilihan unik, satu kunci (${JSON.stringify(l.opsi)})`);
        cek(l.petunjuk.length > 20 && l.tanya.length > 5, `${kasus.id}/${l.stasiun}: tanya dan petunjuk ada`);
        lokal.push(l.opsi.indexOf(l.benar));
      });
    }
    posisi.push(...lokal);
    cek(new Set(lokal).size === 3, `${def.id}: letak kunci bervariasi (${lokal.join("")})`);
    let x = ME.awalMesin(def);
    for (let mi = 0; mi < def.kasus.length; mi += 1) {
      for (let i = 0; i < 4; i += 1) {
        const l = ME.langkahAktif(x);
        const lompat = ME.langkahMesin(x, { t: "LOMPAT", ke: i + 1 });
        cek(lompat.ke === x.ke && lompat.ditolak === x.ditolak + 1, `${def.id}: lompat stasiun ditolak`);
        for (const s of l.opsi.filter((o) => o !== l.benar)) {
          const t = ME.langkahMesin(x, { t: "JAWAB", nilai: s });
          cek(t.ke === x.ke && t.pesan === l.petunjuk, `${def.id}: "${s}" ditolak dengan petunjuk`);
        }
        x = ME.langkahMesin(x, { t: "JAWAB", nilai: l.benar });
      }
      cek(x.fase === "sudah", `${def.id}: kasus ${mi} selesai`);
      x = ME.langkahMesin(x, { t: "LANJUT" });
    }
    cek(x.selesai, `${def.id}: semua kasus selesai`);
  }
  cek(posisi.length === 12, "dua belas letak kunci tercatat");
  sama([MB.MESIN_BACA_KA.selesaiId], [K4.ID_MESIN_K4B1KA], "selesaiId mesin sama dengan id misi");

  // Kunci dan SEMUA pengecoh dihitung ulang mandiri.
  MB.KASUS_BACA.forEach((k, idx) => {
    const [rakitL, papan, baca, tulis] = MB.MESIN_BACA_KA.kasus[idx].langkah;
    const d = dig(k.n);
    const m = rakitL.tanya.match(/Ada (\d+) peti, (\d+) dus, (\d+) bungkus, dan (\d+) benda/);
    const dariTanya = Number(m[1]) * 1000 + Number(m[2]) * 100 + Number(m[3]) * 10 + Number(m[4]);
    cek(dariTanya === k.n && angkaTeks(rakitL.benar) === k.n, `${k.id}: rakit ${titik(k.n)}`);
    for (const o of rakitL.opsi.filter((q) => q !== rakitL.benar)) cek(angkaTeks(o) !== k.n, `${k.id}: pengecoh rakit "${o}" memang bukan ${k.n}`);
    const tempat = ["ribuan", "ratusan", "puluhan", "satuan"].findIndex((t) => papan.tanya.includes(`tempat ${t}`));
    cek(papan.benar === String(d[tempat]), `${k.id}: papan ${["ribuan", "ratusan", "puluhan", "satuan"][tempat]} = ${d[tempat]}`);
    for (const o of papan.opsi.filter((q) => q !== papan.benar)) cek(o !== String(d[tempat]), `${k.id}: pengecoh papan ${o} salah`);
    cek(baca.benar === bacaMandiri(k.n), `${k.id}: dibaca ${bacaMandiri(k.n)}`);
    for (const o of baca.opsi.filter((q) => q !== baca.benar)) cek(o !== bacaMandiri(k.n), `${k.id}: pengecoh bacaan "${o}" salah`);
    cek(tulis.tanya.endsWith(`${bacaMandiri(k.tulis)}.`) && angkaTeks(tulis.benar) === k.tulis, `${k.id}: tulis ${titik(k.tulis)}`);
    for (const o of tulis.opsi.filter((q) => q !== tulis.benar)) cek(angkaTeks(o) !== k.tulis, `${k.id}: pengecoh tulis "${o}" memang bukan ${k.tulis}`);
  });
}

/* ------------------------------ Skenario Gim Kebun Kira (kunci dihitung mandiri) ------------------------------ */
{
  const s = SB.SKENARIO_K4B1KA;
  cek(s.adegan.length >= 5 && s.adegan.length <= 8 && new Set(s.adegan.map((a) => a.jenis)).size >= 4, `${s.id}: 5–8 adegan, minimal 4 jenis`);
  for (const a of s.adegan.filter((q) => q.jenis === "pilih")) cek(a.opsi.length === 3 && a.opsi.filter((o) => o.benar).length === 1, `${s.id}/${a.id}: tiga pilihan, satu benar`);
  for (const a of s.adegan.filter((q) => q.jenis === "soal")) for (const q of a.soal) cek(q.opsi.length === 3 && new Set(q.opsi).size === 3 && q.opsi.includes(q.jawaban), `${s.id}/${a.id}: "${q.teks}" tiga pilihan memuat kunci`);
  const ad = (id) => s.adegan.find((a) => a.id === id);
  const benarPilih = (id) => ad(id).opsi.find((o) => o.benar).teks;
  const [h1, h2, h3] = ad("harga").soal;
  cek(bacaMandiri(5820) === `lima ribu delapan ratus ${h1.jawaban}`, "A: 5.820 dibaca lima ribu delapan ratus dua puluh");
  cek(h2.jawaban === String(dig(5820)[1]) && h3.jawaban === String(dig(5820)[3]), "A: ratusan 8 dan satuan 0 pada 5.820");
  cek(benarPilih("nol").toLowerCase() === bacaMandiri(5007), "A: 5.007 dibaca lima ribu tujuh");
  cek(benarPilih("seribu").toLowerCase() === bacaMandiri(1308), "A: 1.308 dibaca seribu tiga ratus delapan");
  for (const o of ad("nol").opsi.filter((q) => !q.benar)) cek(o.teks.toLowerCase() !== bacaMandiri(5007), `A: pengecoh "${o.teks}" bukan bacaan 5.007`);
  for (const o of ad("seribu").opsi.filter((q) => !q.benar)) cek(o.teks.toLowerCase() !== bacaMandiri(1308), `A: pengecoh "${o.teks}" bukan bacaan 1.308`);
  cek(ad("bungkus").target === dig(4152)[2] && ad("peti").jumlah === dig(4152)[0], "A: bungkus pada 4.152 = 5 dan empat peti");
  cek(ad("bungkus").target <= ad("bungkus").maks, "A: target stik tidak melebihi batas");
}

/* ------------------------------ Misi ------------------------------ */
const keadaanAwal = [ka(A.awalKemasanK4B1KA())];
const SEMUA_ID = [K4.ID_MESIN_K4B1KA, K4.ID_SKENARIO_K4B1KA, "x", "mesin-urut"];
{
  const daftar = K4.daftarMisiK4B1KA();
  cek(daftar.filter((m) => m.wajib).length === 7 && daftar.filter((m) => !m.wajib).length === 3, "7 misi wajib dan 3 tantangan bebas");
  const ids = new Set();
  for (const m of daftar) {
    cek(!ids.has(m.id), `misi ${m.id}: id unik`);
    ids.add(m.id);
    cek(m.id.startsWith("a-"), `misi ${m.id}: berawalan huruf sub-bab`);
    cek(m.teks.length >= 10 && m.teks.length <= 170, `misi ${m.id}: panjang teks ${m.teks.length}`);
    for (const ke of keadaanAwal) cek(!m.cek(ke), `misi ${m.id}: keadaan awal ${ke.alat} tidak memenuhinya`);
  }
  for (const m of daftar.filter((x) => x.id.endsWith("mesin") || x.id.endsWith("skenario"))) {
    const idBenar = m.id.endsWith("mesin") ? K4.ID_MESIN_K4B1KA : K4.ID_SKENARIO_K4B1KA;
    cek(m.cek(sel(idBenar)), `misi ${m.id}: tercapai oleh ${idBenar}`);
    for (const lain of SEMUA_ID.filter((v) => v !== idBenar)) cek(!m.cek(sel(lain)), `misi ${m.id}: tidak tercapai oleh ${lain}`);
  }
  for (const m of daftar.filter((x) => !x.id.endsWith("mesin") && !x.id.endsWith("skenario"))) for (const id of SEMUA_ID) cek(!m.cek(sel(id)), `misi ${m.id}: tidak tercapai oleh selesai ${id}`);
  cek(!M0.wajibSelesai(M0.tampilMisi(daftar), new Set()), "gerbang tertutup di awal");
  cek(TK.MISI_K4B1KA.length > 60 && TK.NAMA_SIM_K4B1KA.length > 10 && TK.misiAwalK4B1KA("A").startsWith("Simulasi 1. Misi:"), "teks misi A");
  cek(K4.ID_SKENARIO_K4B1KA !== "kira-gim-kebun" && MB.MESIN_BACA_KA.selesaiId !== "mesin-baca", "id selesai tidak bentrok dengan Modul Kesatu");
}

const misiDi = (id) => K4.daftarMisiK4B1KA().find((m) => m.id === id);
const penuh = (id, ke) => cek(misiDi(id).cek(ke), `misi ${id} tercapai`);
const belum = (id, ke, ket) => cek(!misiDi(id).cek(ke), `misi ${id} belum tercapai: ${ket}`);

/* ---- Bukti tiap misi bisa dicapai lewat tombol alat, dan near-miss tidak ---- */
let AKSI_WAJIB;
{
  const a0 = A.awalKemasanK4B1KA();
  const nyala = aa(a0, { t: "TOGGLE", rep: "baca" });
  penuh("a-tukar", ka(aa(a0, { t: "UBAH", jenis: "dus", d: 1 })));
  belum("a-tukar", ka(aa(a0, { t: "UBAH", jenis: "bungkus", d: 1 })), "baru menambah bungkus");
  penuh("a-rakit", ka(rakit(nyala, 4152)));
  belum("a-rakit", ka(rakit(a0, 4152)), "Bacaan mati");
  belum("a-rakit", ka(rakit(nyala, 4125)), "4.125 bukan 4.152");
  penuh("a-nol", ka(rakit(nyala, 5007)));
  belum("a-nol", ka(rakit(nyala, 5070)), "5.070 bukan 5.007");
  penuh("a-seribu", ka(rakit(nyala, 1308)));
  belum("a-seribu", ka(rakit(nyala, 1380)), "1.380 bukan 1.308");
  penuh("a-tulis", ka(tulisKartu(pilihTarget(a0, 4718), 4718)));
  belum("a-tulis", ka(tulisKartu(pilihTarget(a0, 4718), 4781)), "kartu 4.781 keliru");
  belum("a-tulis", ka(tulisKartu(pilihTarget(a0, 6439), 6439)), "6.439 bukan skor tertinggi gim");
  penuh("a-sepuluh-ribu", ka(rakit(a0, 10000)));
  belum("a-sepuluh-ribu", ka(rakit(a0, 9999)), "9.999");
  penuh("a-tulis-nol", ka(tulisKartu(pilihTarget(a0, 3075), 3075)));
  belum("a-tulis-nol", ka(tulisKartu(pilihTarget(a0, 3075), 75)), "0075 tanpa ribuan 3");
  penuh("a-8209", ka(rakit(nyala, 8209)));
  AKSI_WAJIB = [ka(aa(a0, { t: "UBAH", jenis: "dus", d: 1 })), ka(rakit(rakit(rakit(nyala, 4152), 5007), 1308)), ka(tulisKartu(pilihTarget(a0, 4718), 4718))];
}

/* ---- Gerbang ---- */
{
  const daftar = K4.daftarMisiK4B1KA();
  const tampil = M0.tampilMisi(daftar);
  const sudah = new Set();
  const catat = (k) => {
    for (const id of M0.misiBaru(daftar, k, sudah)) sudah.add(id);
  };
  for (const ke of AKSI_WAJIB) catat(ke);
  cek(!M0.wajibSelesai(tampil, sudah) && sudah.size >= 5, `gerbang: tertutup setelah misi alat saja (${[...sudah].join(",")})`);
  catat(sel(K4.ID_MESIN_K4B1KA));
  cek(!M0.wajibSelesai(tampil, sudah), "gerbang: tertutup tanpa skenario");
  catat(sel(K4.ID_SKENARIO_K4B1KA));
  cek(M0.wajibSelesai(tampil, sudah), `gerbang: terbuka setelah semua wajib (belum: ${daftar.filter((m) => m.wajib && !sudah.has(m.id)).map((m) => m.id).join(",")})`);
  for (const ke of keadaanAwal) catat(ke);
  cek(M0.wajibSelesai(tampil, sudah), "gerbang: tetap terbuka setelah alat diubah");
}

/* ---- Konsep sub-bab berikutnya tidak dipakai di Sub-Bab A ---- */
{
  const BOCOR = /(bernilai|uraian|lebih dari|kurang dari|mengurutkan|komposisi|dekomposisi|menyimpan|mengambil| < | > | × )/i;
  const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas4-bab1-kedua-ringkas.json", import.meta.url), "utf8"));
  const teksMisi = [TK.MISI_K4B1KA, TK.NAMA_SIM_K4B1KA, ...K4.daftarMisiK4B1KA().map((m) => m.teks)].join(" ");
  cek(!BOCOR.test(teksMisi), `misi A bebas konsep sub-bab berikutnya (${teksMisi.match(BOCOR)?.[0]})`);
  cek(!BOCOR.test(JSON.stringify(SB.SKENARIO_K4B1KA)), `skenario A bebas konsep sub-bab berikutnya (${JSON.stringify(SB.SKENARIO_K4B1KA).match(BOCOR)?.[0]})`);
  cek(!BOCOR.test(JSON.stringify(MB.MESIN_BACA_KA)), `mesin A bebas konsep sub-bab berikutnya (${JSON.stringify(MB.MESIN_BACA_KA).match(BOCOR)?.[0]})`);
  const sumber = readFileSync(new URL("../src/components/modul/SimulasiLabKemasanK4KA.tsx", import.meta.url), "utf8")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "")
    .replace(/import[\s\S]*?from "[^"]+";/g, "");
  const temu = sumber.match(/(bernilai|uraian|lebih dari|kurang dari|mengurutkan|komposisi|dekomposisi|menyimpan|mengambil|bersusun)/gi) ?? [];
  cek(temu.length === 0, `komponen SimulasiLabKemasanK4KA bebas konsep sub-bab berikutnya (${temu.join(", ")})`);
  cek(Object.keys(ringkas.subBab).join() === "A" && ringkas.chapter_id === "mtk-4-bab1-kedua", "ringkas kedua: hanya sub-bab A, id bab kedua");
  cek(!BOCOR.test(JSON.stringify(ringkas.subBab.A)), `ringkas A bebas konsep sub-bab berikutnya (${JSON.stringify(ringkas.subBab.A).match(BOCOR)?.[0]})`);
  cek(!/ \+ /.test(JSON.stringify(ringkas.subBab.A)) && !/bernilai/.test(JSON.stringify(ringkas.subBab.A)), "ringkas A tanpa uraian bertanda + dan tanpa 'bernilai'");
  const ac = acakDari(23);
  let s = A.awalKemasanK4B1KA();
  let bocor = "";
  for (let n = 0; n < 5000; n += 1) {
    s = A.langkahKemasanK4B1KA(s, [{ t: "UBAH", jenis: A.URUT_KEMASAN[ac(4)], d: ac(3) ? 1 : -1 }, { t: "TOGGLE", rep: "baca" }, { t: "KARTU", i: ac(4), d: 1 }, { t: "PERIKSA" }, { t: "TARGET", d: 1 }][ac(5)]);
    const t = [s.pesan, A.ucapRakitK4B1KA(s), A.ucapTulisK4B1KA(s)].join(" ");
    if (!bocor && BOCOR.test(t)) bocor = t;
  }
  cek(!bocor, `ucapan dan pesan lab A bebas konsep sub-bab berikutnya ${bocor}`);
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
