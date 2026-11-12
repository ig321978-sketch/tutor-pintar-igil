// Uji Simulasi Kelas 5 Bab 2 (KPK dan FPB): Lab Lompat Kelipatan (Sub-Bab A), mesin, skenario, misi, gerbang,
// data ringkas, dan konsep sub-bab berikutnya tidak bocor ke Sub-Bab A.
// Jalankan: node --no-warnings scripts/uji-lab-k5b2.mjs
import { readFileSync } from "node:fs";
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K5 from "../src/components/modul/misi-k5bab2.ts";
import * as TK from "../src/components/modul/misi-teks-k5b2.ts";
import * as A from "../src/components/modul/lab-kelipatan-k5b2a.ts";
import * as MS from "../src/components/modul/mesin-data-k5b2.ts";
import * as SK from "../src/components/modul/skenario-k5b2.ts";
import * as ME from "../src/components/modul/mesin-bertahap-k3b1.ts";
import * as EJ from "../src/components/modul/eja-k5b1.ts";
import * as D from "../src/components/modul/data-k5b2.ts";

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
const tanpaAngka = (t) => !/\d/.test(EJ.ejaK5B1(t));
const L = A.langkahKelipatanK5B2A;
const x0 = A.awalKelipatanK5B2A();

/* ------------------------------ Hitungan MANDIRI (cara berbeda) ------------------------------ */
// Kode memakai perkalian dan sisa bagi (%). Di sini kelipatan dibentuk dengan penjumlahan berulang (lompatan),
// dan sisa dihitung dengan pengurangan berulang. Tidak ada perkalian atau % di hitungan mandiri.
const kelipatanMandiri = (d, maks) => {
  const hasil = [];
  for (let v = d; v <= maks; v += d) hasil.push(v);
  return hasil;
};
const bagiMandiri = (n, d) => {
  let sisa = n;
  let q = 0;
  while (sisa >= d) {
    sisa -= d;
    q += 1;
  }
  return { q, r: sisa };
};
const adalahKelipatan = (n, d) => bagiMandiri(n, d).r === 0;
const jumlahKe = (d, k) => kelipatanMandiri(d, d * 20)[k - 1];

/* ------------------------------ Pengeja ------------------------------ */
{
  sama(EJ.ejaK5B1("7 × 4 = 28"), "tujuh dikali empat sama dengan dua puluh delapan", "eja kali");
  sama(EJ.ejaK5B1("14 ÷ 3 bersisa 2"), "empat belas dibagi tiga bersisa dua", "eja bagi");
  sama(EJ.ejaK5B1("pendaratan ke-4 di 12"), "pendaratan ke-empat di dua belas", "eja ke-");
  sama(EJ.ejaK5B1("sampai 100 dan 9, 18, 27, …"), "sampai seratus dan sembilan, delapan belas, dua puluh tujuh, titik-titik", "eja seratus dan daftar");
}

/* ------------------------------ Data sama dengan buku ------------------------------ */
{
  const naskah = readFileSync(new URL("../src/components/modul/naskah-k5b2.ts", import.meta.url), "utf8");
  cek(naskah.includes("jarak sama: 3, 6, 9, 12") && A.JARAK.includes(3), "Lompat: jarak tiga dari naskah (3, 6, 9, 12)");
  cek(D.RONDE_KELIPATAN_CA.flat().some((r) => r.dari === 7) && A.JARAK.includes(7), "Lompat: jarak tujuh dari data buku");
  cek(naskah.includes("Kelipatan empat: empat, delapan, dua belas, enam belas") && A.JARAK.includes(4) && A.DATA_TABEL.includes(4), "jarak empat dari naskah");
  cek(naskah.includes("Warnai semua kelipatan lima") && A.DATA_TABEL.includes(5), "Tabel: kelipatan lima dari naskah");
  cek(D.RONDE_CERITA_CA.flat().some((r) => r.teks.includes("kelipatan 9")) && A.DATA_TABEL.includes(9), "Tabel: kelipatan sembilan dari data buku");
  cek(naskah.includes("Apakah dua belas kelipatan tiga? Ya, karena dua belas dibagi tiga sisa nol") && A.DATA_CEK.some((d) => d.n === 12 && d.d === 3), "Cek: 12 dan 3 dari naskah");
  cek(D.RONDE_BENARSALAH_QA.flat().some((r) => r.teks.includes("10 adalah kelipatan 3")) && A.DATA_CEK.some((d) => d.n === 14 && d.d === 3), "Cek: bukan kelipatan tiga seperti di buku");
  cek(D.RONDE_KELIPATAN_CA.flat().some((r) => r.dari === 7 && r.tanya === 21) && A.DATA_CEK.some((d) => d.n === 28 && d.d === 7), "Cek: kelipatan tujuh dari data buku");
  for (const d of [3, 4, 5, 7, 9]) sama(D.kelipatan(d, 10), kelipatanMandiri(d, d * 10), `data buku: kelipatan ${d} sama dengan penjumlahan berulang`);
}

/* ------------------------------ Lab A: Lompat Kelipatan ------------------------------ */
{
  cek(x0.pernah.length === 0 && x0.pesan === "" && x0.lompat.k === 0 && x0.tabel.warna.length === 0, "awal: kosong, belum ada riwayat");
  // Lompat: tiap jarak, sepuluh pendaratan.
  for (const [i, J] of A.JARAK.entries()) {
    let s = L(x0, { t: "L_JARAK", i });
    const mand = kelipatanMandiri(J, J * 10);
    for (let k = 1; k <= 10; k += 1) {
      s = L(s, { t: "L_LOMPAT" });
      sama(A.daftarLompat(s), mand.slice(0, k), `Lompat ${J}: ${k} pendaratan sama dengan penjumlahan berulang`);
      cek(s.pesan.startsWith("✅") && s.pesan.includes(String(mand[k - 1])), `Lompat ${J}/${k}: pesan info menyebut pendaratan ${mand[k - 1]}`);
      cek(s.pernah.includes(`lompat:${J}:5`) === (k >= 5) && s.pernah.includes(`lompat:${J}:10`) === (k === 10), `Lompat ${J}/${k}: riwayat 5 dan 10 tepat`);
    }
    const lagi = L(s, { t: "L_LOMPAT" });
    cek(A.daftarLompat(lagi).length === 10 && !lagi.pesan.startsWith("✅") && /Sepuluh pendaratan/.test(lagi.pesan), `Lompat ${J}: pendaratan kesebelas ditolak`);
    const ulang = L(s, { t: "L_ULANG" });
    cek(ulang.lompat.k === 0 && ulang.pernah.includes(`lompat:${J}:10`) && /Nol bukan kelipatan/.test(ulang.pesan), `Lompat ${J}: mulai lagi tidak mencabut riwayat dan menjelaskan nol`);
    cek(L(s, { t: "L_JARAK", i: (i + 1) % 3 }).lompat.k === 0, `Lompat ${J}: ganti jarak mengulang dari nol`);
    cek(/kelipatan pertama/.test(L(L(x0, { t: "L_JARAK", i }), { t: "L_LOMPAT" }).pesan), `Lompat ${J}: pendaratan pertama disebut kelipatan pertama`);
  }
  cek(L(x0, { t: "L_JARAK", i: 3 }) === x0 && L(x0, { t: "L_JARAK", i: -1 }) === x0 && L(x0, { t: "L_JARAK", i: 0.5 }) === x0, "Lompat: jarak di luar batas diabaikan");
  // Lompat: pendaratan jarak lain tidak mengisi riwayat jarak tiga.
  cek(!jalan(L(x0, { t: "L_JARAK", i: 1 }), L, Array(5).fill({ t: "L_LOMPAT" })).pernah.includes("lompat:3:5"), "Lompat: lima pendaratan jarak empat bukan misi jarak tiga");

  // Tabel: semua kelipatan lewat klik, near-miss satu per satu.
  for (const [i, d] of A.DATA_TABEL.entries()) {
    const kunci = kelipatanMandiri(d, 100);
    cek(kunci.length === A.kelipatanTabel(d).length && kunci.every((v, j) => v === A.kelipatanTabel(d)[j]), `Tabel ${d}: kunci sama dengan penjumlahan berulang`);
    const xt = L(x0, { t: "G_DATA", i });
    const klik = (daftar) => jalan(xt, L, daftar.map((n) => ({ t: "G_KLIK", n })));
    const tepat = L(klik(kunci), { t: "G_CEK" });
    cek(tepat.pernah.includes(`tabel:${d}`) && tepat.pesan.startsWith("✅") && tepat.pesan.includes(String(kunci.length)), `Tabel ${d}: semua kelipatan tercatat`);
    // Urutan klik tidak berpengaruh.
    cek(L(klik([...kunci].reverse()), { t: "G_CEK" }).pernah.includes(`tabel:${d}`), `Tabel ${d}: urutan klik tidak berpengaruh`);
    // Satu kelipatan terlewat.
    for (const m of kunci) {
      const s = L(klik(kunci.filter((v) => v !== m)), { t: "G_CEK" });
      cek(s.pernah.length === 0 && !s.pesan.startsWith("✅") && /belum diwarnai/.test(s.pesan), `Tabel ${d}: kelipatan ${m} terlewat ditolak`);
    }
    // Satu bilangan bukan kelipatan kelebihan.
    let ditolak = 0;
    let total = 0;
    for (let n = 1; n <= 100; n += 1) {
      if (adalahKelipatan(n, d)) continue;
      total += 1;
      const s = L(klik([...kunci, n]), { t: "G_CEK" });
      const r = bagiMandiri(n, d).r;
      if (s.pernah.length === 0 && !s.pesan.startsWith("✅") && s.pesan.includes(`kelipatan ${d}: ${n}.`) && s.pesan.includes(`bersisa ${r}`)) ditolak += 1;
    }
    cek(ditolak === total, `Tabel ${d}: semua ${total} bilangan kelebihan ditolak dengan sisanya (${ditolak})`);
    // Hanya yang kelebihan tanpa yang benar.
    cek(L(klik([kunci[0], kunci[0] + 1]), { t: "G_CEK" }).pernah.length === 0, `Tabel ${d}: sebagian benar sebagian salah ditolak`);
    // Ketuk dua kali melepas warna.
    cek(L(L(xt, { t: "G_KLIK", n: 7 }), { t: "G_KLIK", n: 7 }).tabel.warna.length === 0, `Tabel ${d}: ketuk dua kali melepas warna`);
    cek(L(klik(kunci), { t: "G_BERSIH" }).tabel.warna.length === 0, `Tabel ${d}: bersihkan`);
    cek(L(klik(kunci), { t: "G_DATA", i: (i + 1) % 3 }).tabel.warna.length === 0, `Tabel ${d}: ganti data mengosongkan warna`);
    cek(klik(kunci).tabel.warna.every((v, j, a) => j === 0 || a[j - 1] < v), `Tabel ${d}: warna terurut dan unik`);
  }
  cek(/Belum ada bilangan/.test(L(x0, { t: "G_CEK" }).pesan), "Tabel: kosong diberi tahu");
  cek(L(x0, { t: "G_KLIK", n: 0 }) === x0 && L(x0, { t: "G_KLIK", n: 101 }) === x0 && L(x0, { t: "G_KLIK", n: 2.5 }) === x0 && L(x0, { t: "G_DATA", i: 3 }) === x0, "Tabel: di luar batas diabaikan");
  // Tabel kelipatan 4 tidak memenuhi tabel kelipatan 9 (data lain).
  cek(!L(jalan(L(x0, { t: "G_DATA", i: 1 }), L, kelipatanMandiri(4, 100).map((n) => ({ t: "G_KLIK", n }))), { t: "G_CEK" }).pernah.some((p) => p.startsWith("tabel:")), "Tabel: kelipatan 4 saat targetnya 9 tidak tercatat");

  // Cek: tiap data.
  const adaCek = [];
  for (const [i, d] of A.DATA_CEK.entries()) {
    const { q, r } = bagiMandiri(d.n, d.d);
    cek(A.bagiCek(d.n, d.d).q === q && A.bagiCek(d.n, d.d).r === r, `Cek ${d.n}/${d.d}: hasil bagi dan sisa sama dengan pengurangan berulang`);
    const opsi = A.opsiSisa(i);
    cek(opsi.length === 3 && new Set(opsi).size === 3 && opsi.filter((v) => v === r).length === 1, `Cek ${d.n}/${d.d}: tiga pilihan sisa unik, satu benar (${r})`);
    cek(opsi.every((v) => Number.isInteger(v) && v >= 0), `Cek ${d.n}/${d.d}: pilihan bulat`);
    cek(opsi.includes(q) && q !== r, `Cek ${d.n}/${d.d}: pengecoh hasil bagi ${q}`);
    adaCek.push(opsi.indexOf(r));
    const xc = L(x0, { t: "C_DATA", i });
    // Putusan sebelum sisa ditolak.
    for (const ya of [true, false]) cek(L(xc, { t: "C_JAWAB", ya }).pernah.length === 0 && /Tentukan dulu sisanya/.test(L(xc, { t: "C_JAWAB", ya }).pesan), `Cek ${d.n}/${d.d}: putusan ${ya} sebelum sisa ditolak`);
    for (const v of opsi.filter((o) => o !== r)) {
      const s = L(xc, { t: "C_SISA", nilai: v });
      cek(!s.cek.sisaOk && !s.pesan.startsWith("✅") && s.pesan.length > 10, `Cek ${d.n}/${d.d}: sisa ${v} ditolak`);
      cek(L(s, { t: "C_JAWAB", ya: r === 0 }).pernah.length === 0, `Cek ${d.n}/${d.d}: putusan setelah sisa salah tidak dicatat`);
      cek(/hasil bagi|banyak kelompok/.test(s.pesan) === (v === q), `Cek ${d.n}/${d.d}: sisa ${v} dijelaskan sebagai hasil bagi dengan tepat`);
    }
    const sOk = L(xc, { t: "C_SISA", nilai: r });
    cek(sOk.cek.sisaOk && sOk.pesan.startsWith("✅") && sOk.pesan.includes(`sisanya ${r}`), `Cek ${d.n}/${d.d}: sisa ${r} benar`);
    const benar = L(sOk, { t: "C_JAWAB", ya: r === 0 });
    cek(benar.pernah.includes(`cek:${d.n}:${d.d}`) && benar.pesan.startsWith("✅"), `Cek ${d.n}/${d.d}: putusan benar tercatat`);
    cek((r === 0 && benar.pesan.includes(`${d.d} × ${q} = ${d.n}`)) || (r > 0 && benar.pesan.includes(`bersisa ${r}`) && benar.pesan.includes("bukan kelipatan")), `Cek ${d.n}/${d.d}: pesan sesuai`);
    const salah = L(sOk, { t: "C_JAWAB", ya: r !== 0 });
    cek(salah.pernah.length === 0 && !salah.pesan.startsWith("✅") && salah.pesan.length > 10, `Cek ${d.n}/${d.d}: putusan salah ditolak`);
    cek(!L(sOk, { t: "C_DATA", i: (i + 1) % 4 }).cek.sisaOk, `Cek ${d.n}/${d.d}: ganti data mengulang sisa`);
  }
  cek(new Set(adaCek).size >= 2, `Cek: letak sisa benar bervariasi (${adaCek.join("")})`);
  cek(L(x0, { t: "C_SISA", nilai: 99 }) === x0 && L(x0, { t: "C_DATA", i: 4 }) === x0, "Cek: di luar batas diabaikan");

  // Fuzz.
  const acak = acakDari(52);
  let s = x0;
  let ok = true;
  const pesanSemua = new Set();
  const riwayatSemua = new Set();
  for (let i = 0; i < 20000; i += 1) {
    const p = acak(16);
    const kunciT = kelipatanMandiri(A.dasarTabel(s), 100);
    const belum = kunciT.find((n) => !s.tabel.warna.includes(n));
    const a =
      p === 0 ? { t: "L_JARAK", i: acak(4) } :
      p <= 3 ? { t: "L_LOMPAT" } :
      p === 4 ? (acak(4) === 0 ? { t: "L_ULANG" } : { t: "PESAN_KOSONG" }) :
      p === 5 ? { t: "G_DATA", i: acak(4) } :
      p <= 7 ? { t: "G_KLIK", n: acak(102) } :
      p === 8 ? { t: "G_KLIK", n: belum ?? acak(102) } :
      p === 9 ? (acak(5) === 0 ? { t: "G_BERSIH" } : { t: "G_CEK" }) :
      p === 10 ? { t: "C_DATA", i: acak(5) } :
      p === 11 ? { t: "C_SISA", nilai: acak(6) === 0 ? 99 : A.opsiSisa(s.cek.data)[acak(3)] } :
      p === 12 ? { t: "C_JAWAB", ya: acak(2) === 0 } :
      p === 13 ? { t: "G_CEK" } :
      p === 14 ? { t: "G_KLIK", n: belum ?? 1 } :
      acak(40) === 0 ? { t: "RESET" } : { t: "L_LOMPAT" };
    const t = L(s, a);
    if (a.t !== "RESET" && !s.pernah.every((v) => t.pernah.includes(v))) ok = false;
    if (!(t.lompat.k >= 0 && t.lompat.k <= 10 && t.lompat.jarak >= 0 && t.lompat.jarak < 3)) ok = false;
    if (!(t.tabel.data >= 0 && t.tabel.data < 3 && t.cek.data >= 0 && t.cek.data < 4)) ok = false;
    if (t.tabel.warna.some((v, j, w) => !Number.isInteger(v) || v < 1 || v > 100 || (j > 0 && w[j - 1] >= v))) ok = false;
    if (typeof t.cek.sisaOk !== "boolean") ok = false;
    for (const id of t.pernah) if (!/^(lompat:(3|4|7):(5|10)|tabel:(4|9|5)|cek:(12:3|14:3|28:7|25:4))$/.test(id)) ok = false;
    if (t.pesan) pesanSemua.add(t.pesan);
    for (const id of t.pernah) riwayatSemua.add(id);
    s = t;
  }
  cek(ok, "fuzz 20.000 aksi Lab Lompat Kelipatan: batas terjaga, riwayat tidak dicabut");
  cek(pesanSemua.size > 30 && [...pesanSemua].every(tanpaAngka), `fuzz Lab Lompat Kelipatan: semua ${pesanSemua.size} pesan dieja menjadi kata`);
  cek(riwayatSemua.size >= 8, `fuzz Lab Lompat Kelipatan: riwayat terkumpul (${[...riwayatSemua].join(" ")})`);
  globalThis.__pesanA = [...pesanSemua];
}

/* ------------------------------ Mesin ------------------------------ */
{
  for (const def of MS.SEMUA_MESIN_K5B2) {
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
    cek(x.selesai && def.selesaiId === K5.ID_MESIN_K5B2.A, `${def.id}: bisa diselesaikan, id selesai sesuai misi`);
  }
  // Kunci dan pengecoh dihitung ulang mandiri.
  const angka = (t) => Number(t);
  for (const [i, k] of MS.KASUS_KELIPATAN.entries()) {
    const c = MS.MESIN_KELIPATAN.kasus[i];
    const [lompat, tabel, cekL, lanjut] = c.langkah;
    const baris = kelipatanMandiri(k.d, k.d * 12);
    cek(angka(lompat.benar) === baris[k.k - 1] && lompat.tanya.includes(`jarak ${k.d}`) && lompat.tanya.includes(`ke-${k.k}`), `Mesin ${k.d}: pendaratan ke-${k.k} di ${baris[k.k - 1]}`);
    cek(lompat.opsi.every((o) => o === lompat.benar || angka(o) !== baris[k.k - 1]) && lompat.opsi.includes(String(k.d + k.k)) && lompat.opsi.includes(String(baris[k.k - 2])), `Mesin ${k.d}: pengecoh lompat salah (jarak ditambah k, satu pendaratan kurang)`);
    cek(angka(tabel.benar) === baris[k.j - 1] && angka(tabel.benar) <= 100 && adalahKelipatan(angka(tabel.benar), k.d), `Mesin ${k.d}: ${tabel.benar} kelipatan ${k.d} dalam tabel seratus`);
    cek(tabel.opsi.every((o) => o === tabel.benar || (!adalahKelipatan(angka(o), k.d) && angka(o) <= 100)), `Mesin ${k.d}: pengecoh tabel bukan kelipatan`);
    const { r } = bagiMandiri(k.x, k.d);
    cek(r > 0 && cekL.benar === `bukan, sisa ${r}` && cekL.tanya.includes(`${k.x} kelipatan ${k.d}`), `Mesin ${k.d}: ${k.x} dibagi ${k.d} sisa ${r}`);
    cek(cekL.opsi.includes(`ya, kelipatan ${k.d}`) && cekL.opsi.includes(`bukan, sisa ${k.d - r}`) && k.d - r !== r, `Mesin ${k.d}: pengecoh cek (menyangka kelipatan, sisa tertukar)`);
    cek(angka(lanjut.benar) === baris[4] && lanjut.tanya.includes(baris.slice(0, 4).join(", ")), `Mesin ${k.d}: setelah empat kelipatan pertama ${baris[4]}`);
    cek(lanjut.opsi.every((o) => o === lanjut.benar || !adalahKelipatan(angka(o), k.d)), `Mesin ${k.d}: pengecoh lanjut bukan kelipatan`);
    cek(EJ.ejaK5B1(c.ringkas).includes(EJ.kataK5B1(baris[k.k - 1])), `Mesin ${k.d}: ringkas dieja dengan pendaratan benar`);
  }
  sama(MS.KASUS_KELIPATAN.map((k) => k.d), [3, 7, 9], "Mesin: jarak tiga, tujuh, sembilan");
}

/* ------------------------------ Skenario ------------------------------ */
{
  const S = SK.SKENARIO_K5B2A;
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
  sama(S.id.replace(/-k5b2$/, ""), K5.ID_SKENARIO_K5B2.A, "id skenario sesuai id misi");
  const adegan = (id) => S.adegan.find((a) => a.id === id);
  // Tepuk: bilangan 9 sampai 13, kelipatan 3 dicari dengan lompatan.
  const tepuk = adegan("tepuk");
  const antara = [9, 10, 11, 12, 13];
  const tepukBenar = antara.filter((n) => adalahKelipatan(n, 3));
  cek(tepuk.cerita.includes(antara.join(", ")) && tepuk.opsi.find((o) => o.benar).teks === `Di ${tepukBenar.join(" dan ")}`, "A: tepuk di 9 dan 12 (dihitung)");
  cek(tepuk.opsi.filter((o) => !o.benar).every((o) => [...o.teks.matchAll(/\d+/g)].some((m) => !adalahKelipatan(Number(m[0]), 3))), "A: pengecoh tepuk memuat bilangan bukan kelipatan");
  const banyak = adegan("banyak");
  const deret = [...banyak.cerita.matchAll(/\d+/g)].map((m) => Number(m[0]));
  sama(deret, kelipatanMandiri(3, 18), "A: tepukan 3 sampai 18");
  cek(deret.every((n) => adalahKelipatan(n, 3)) && deret.length === banyak.jumlah, "A: banyak tepukan sama dengan banyak kelipatan 3 sampai 18 (dihitung)");
  const tigaPuluh = adegan("tiga-puluh");
  cek(tigaPuluh.target === kelipatanMandiri(3, 30).length && tigaPuluh.target <= tigaPuluh.maks && tigaPuluh.cerita.includes("30"), "A: tepukan sampai 30 sepuluh (dihitung)");
  const soal = adegan("periksa").soal;
  cek(soal[0].teks === "3 × 7 = …" && soal[0].jawaban === String(jumlahKe(3, 7)) && soal[0].opsi.filter((o) => o !== soal[0].jawaban).every((o) => Number(o) !== jumlahKe(3, 7)), "A: 3 × 7 (dihitung)");
  cek(soal[1].jawaban === String(jumlahKe(3, 5)) && jumlahKe(3, 4) === 12 && soal[1].opsi.filter((o) => o !== soal[1].jawaban).every((o) => !adalahKelipatan(Number(o), 3)), "A: kelipatan 3 setelah 12 adalah 15, pengecoh bukan kelipatan");
  cek(soal[2].jawaban === String(bagiMandiri(14, 3).r) && soal[2].opsi.filter((o) => o !== soal[2].jawaban).every((o) => Number(o) !== bagiMandiri(14, 3).r), "A: 14 dibagi 3 bersisa 2 (dihitung)");
  const tebak = adegan("tebak");
  const tb = tebak.opsi.find((o) => o.benar);
  cek(tebak.cerita.includes("14") && tb.teks.includes(`bersisa ${bagiMandiri(14, 3).r}`) && !adalahKelipatan(14, 3), "A: 14 bukan kelipatan 3 (dihitung)");
  cek(tebak.opsi.some((o) => !o.benar && o.teks === "Benar, 3 × 5 = 14") && jumlahKe(3, 5) !== 14, "A: 3 × 5 = 14 salah (dihitung)");
  const posisi = S.adegan.filter((a) => a.jenis === "pilih").map((a) => a.opsi.findIndex((o) => o.benar));
  cek(new Set(posisi).size === posisi.length, `A: letak jawaban pilih bervariasi (${posisi.join("")})`);
}

/* ------------------------------ Misi ------------------------------ */
{
  const huruf = ["A"];
  sama(Object.keys(TK.MISI_K5B2), huruf, "teks misi untuk A");
  sama(Object.keys(TK.NAMA_SIM_K5B2), huruf, "nama simulasi untuk A");
  cek(TK.hurufK5B2("Z") === "A" && TK.hurufK5B2("A") === "A", "huruf tak dikenal jatuh ke A");
  cek(TK.misiAwalK5Bab2("A").startsWith("Simulasi 1. Misi: ") && tanpaAngka(TK.misiAwalK5Bab2("A")), "misi awal dan dapat dieja");
  for (const h of huruf) {
    const daftar = K5.daftarMisiK5Bab2(h);
    cek(daftar.filter((m) => m.wajib).length === 7 && daftar.filter((m) => !m.wajib).length === 3, `${h}: tujuh misi wajib dan tiga tantangan bebas`);
    cek(new Set(daftar.map((m) => m.id)).size === 10 && daftar.every((m) => m.id.startsWith(`${h.toLowerCase()}-`)), `${h}: id misi unik berawalan huruf`);
    const kosong = [{ alat: "kelipatan", pernah: [] }, sel("tidak-ada"), A.keadaanKelipatanK5B2A(A.awalKelipatanK5B2A())];
    cek(kosong.every((k) => M0.misiBaru(daftar, k, new Set()).length === 0), `${h}: keadaan awal alat tidak memenuhi misi mana pun`);
    cek(daftar.every((m) => m.teks.length > 20 && tanpaAngka(m.teks)), `${h}: teks misi jelas dan dapat dieja`);
    const baru = (k) => M0.misiBaru(daftar, k, new Set());
    cek(baru(sel(K5.ID_MESIN_K5B2[h])).join() === `${h.toLowerCase()}-mesin` && baru(sel(K5.ID_SKENARIO_K5B2[h])).join() === `${h.toLowerCase()}-skenario`, `${h}: id mesin dan skenario memenuhi misinya`);
  }
  cek(M0.misiBaru(K5.MISI_A, { alat: "lain", pernah: ["lompat:3:5", "tabel:4", "cek:12:3"] }, new Set()).length === 0, "A: riwayat alat lain tidak memenuhi misi A");

  // Jalur nyata lewat aksi lab, dan near-miss.
  const capai = (aksi) => M0.misiBaru(K5.MISI_A, A.keadaanKelipatanK5B2A(jalan(A.awalKelipatanK5B2A(), L, aksi)), new Set());
  const lompat = (i, kali) => [{ t: "L_JARAK", i }, ...Array(kali).fill({ t: "L_LOMPAT" })];
  cek(capai(lompat(0, 5)).join() === "a-tiga", "A: lima pendaratan jarak tiga memenuhi");
  cek(capai(lompat(0, 4)).length === 0 && capai(lompat(1, 5)).length === 0, "A: empat pendaratan atau jarak empat tidak memenuhi");
  cek(capai(lompat(2, 5)).join() === "a-tujuh", "A: lima pendaratan jarak tujuh memenuhi");
  cek(capai(lompat(0, 10)).sort().join() === "a-sepuluh,a-tiga", "A: sepuluh pendaratan jarak tiga memenuhi a-tiga dan tantangan a-sepuluh");
  cek(capai([...lompat(0, 5), { t: "L_JARAK", i: 1 }, ...Array(5).fill({ t: "L_LOMPAT" })]).sort().join() === "a-tiga", "A: ganti jarak tidak mencabut misi lima pendaratan");
  const warnaDari = (i, daftar) => [{ t: "G_DATA", i }, ...daftar.map((n) => ({ t: "G_KLIK", n })), { t: "G_CEK" }];
  cek(capai(warnaDari(0, kelipatanMandiri(4, 100))).join() === "a-tabel", "A: tabel kelipatan empat memenuhi");
  cek(capai(warnaDari(0, kelipatanMandiri(4, 96))).length === 0 && capai(warnaDari(0, [...kelipatanMandiri(4, 100), 10])).length === 0, "A: kelipatan empat kurang satu atau kelebihan satu tidak memenuhi");
  cek(capai(warnaDari(0, kelipatanMandiri(5, 100))).length === 0 && capai([{ t: "G_DATA", i: 0 }, ...kelipatanMandiri(4, 100).map((n) => ({ t: "G_KLIK", n }))]).length === 0, "A: kelipatan lima saat targetnya empat atau belum diperiksa tidak memenuhi");
  cek(capai(warnaDari(1, kelipatanMandiri(9, 100))).join() === "a-sembilan", "A: tantangan kelipatan sembilan");
  const cekKe = (i, ya) => [{ t: "C_DATA", i }, { t: "C_SISA", nilai: bagiMandiri(A.DATA_CEK[i].n, A.DATA_CEK[i].d).r }, { t: "C_JAWAB", ya }];
  cek(capai(cekKe(0, true)).join() === "a-habis", "A: 12 kelipatan 3 memenuhi");
  cek(capai(cekKe(0, false)).length === 0 && capai([{ t: "C_DATA", i: 0 }, { t: "C_JAWAB", ya: true }]).length === 0, "A: putusan salah atau tanpa sisa tidak memenuhi");
  cek(capai(cekKe(1, false)).join() === "a-sisa", "A: 14 bukan kelipatan 3 memenuhi");
  cek(capai(cekKe(1, true)).length === 0 && capai([{ t: "C_DATA", i: 1 }, { t: "C_SISA", nilai: 4 }, { t: "C_JAWAB", ya: false }]).length === 0, "A: 14 kelipatan 3, atau sisa salah, tidak memenuhi");
  cek(capai(cekKe(3, false)).join() === "a-empat" && capai(cekKe(2, true)).length === 0, "A: tantangan 25 bukan kelipatan 4 (dan 28 kelipatan 7 bukan misi)");

  // Gerbang.
  for (const h of huruf) {
    const daftar = M0.tampilMisi(K5.daftarMisiK5Bab2(h));
    const wajibIds = daftar.filter((m) => m.wajib).map((m) => m.id);
    cek(!M0.wajibSelesai(daftar, new Set(wajibIds.slice(0, 6))), `${h}: enam dari tujuh wajib belum membuka gerbang`);
    cek(M0.wajibSelesai(daftar, new Set(wajibIds)), `${h}: tujuh wajib membuka gerbang`);
    cek(M0.bolehLanjut({ adaMisi: true, wajibSelesai: false, dilewati: true, disentuh: true }) && !M0.bolehLanjut({ adaMisi: true, wajibSelesai: false, dilewati: true, disentuh: false }), "lewati hanya setelah disentuh");
  }
}

/* ------------------------------ Konsep tidak bocor antar sub-bab ------------------------------ */
{
  const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas5-bab2-ringkas.json", import.meta.url), "utf8"));
  const baca = (nama, ekstensi) => readFileSync(new URL(`../src/components/modul/${nama}.${ekstensi}`, import.meta.url), "utf8");
  const tanpaKomentar = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
  const teksDari = (o) => {
    const hasil = [];
    JSON.stringify(o, (k, v) => {
      if (typeof v === "string") hasil.push(v);
      return v;
    });
    return hasil.join(" | ");
  };
  // Sub-Bab A tidak memakai konsep B (kelipatan persekutuan, KPK, jadwal bertemu), C dan D (faktor, pembagi, FPB),
  // dan E (bilangan prima, faktorisasi).
  const BOCOR_A = /\b(kpk|fpb|faktor\w*|persekutuan|prima|irisan|pohon|jadwal|bertemu|terkecil|terbesar|pembagi|gabungan|dua warna|ayakan|eratosthenes)\b/i;
  const catat = (teks, apa) => {
    const m = BOCOR_A.exec(teks);
    cek(!m, `A: ${apa} bebas konsep sub-bab berikutnya (${m ? m[0] : ""} di "${String(teks).slice(Math.max(0, (m?.index ?? 0) - 30), (m?.index ?? 0) + 40)}")`);
  };
  for (const t of [TK.MISI_K5B2.A, TK.NAMA_SIM_K5B2.A, ...K5.MISI_A.map((m) => m.teks)]) catat(t, "teks misi");
  catat(teksDari(MS.MESIN_KELIPATAN), "mesin");
  catat(teksDari(SK.SKENARIO_K5B2A), "skenario");
  catat(teksDari(ringkas.subBab.A), "peta dan infografis ringkas");
  catat(tanpaKomentar(baca("SimulasiLabKelipatanK5B2", "tsx")), "komponen lab (tanpa komentar)");
  catat(tanpaKomentar(baca("model-kelipatan-k5b2", "tsx")), "model gambar (tanpa komentar)");
  catat(tanpaKomentar(baca("lab-kelipatan-k5b2a", "ts")), "logika lab (tanpa komentar)");
  catat(tanpaKomentar(baca("SimulasiK5Bab2", "tsx")), "pembungkus (tanpa komentar)");
  for (const p of globalThis.__pesanA) catat(p, "pesan lab dari fuzz");
  for (const u of [A.ucapLompatK5B2A(x0), A.ucapTabelK5B2A(x0), A.ucapCekK5B2A(x0)]) catat(u, "ucapan lab");

  // Kunci tidak bocor ke klien, tanpa jaringan.
  for (const f of ["SimulasiLabKelipatanK5B2", "SimulasiK5Bab2", "model-kelipatan-k5b2"]) {
    const s = baca(f, "tsx");
    cek(!/correct_index|explanation/.test(s), `${f}: tidak memuat correct_index atau explanation`);
    cek(!/fetch\(|XMLHttpRequest|api\/|openai|anthropic|gemini/i.test(s), `${f}: tanpa jaringan atau model bahasa`);
  }
  for (const f of ["lab-kelipatan-k5b2a", "mesin-data-k5b2", "skenario-k5b2", "misi-k5bab2", "misi-teks-k5b2"]) {
    const s = baca(f, "ts");
    cek(!/fetch\(|XMLHttpRequest|from "react"|openai|anthropic|gemini|correct_index|explanation/i.test(s), `${f}: murni`);
    const impor = s.match(/^import .+$/gm) ?? [];
    cek(impor.every((l) => l.startsWith("import type")), `${f}: hanya mengimpor tipe`);
  }
  {
    const s = baca("SimulasiLabKelipatanK5B2", "tsx");
    cek(/useEffect\(\(\) => \{\s*onKeadaan\?\.\(keadaan\w+\(x\)\);\s*\}, \[onKeadaan, x\]\);/.test(s), "lab: lapor keadaan lewat useEffect");
    cek(/setLihat\(v\);\s*kirim\(\{ t: "PESAN_KOSONG" \}\);/.test(s), "lab: ganti tampilan mengosongkan pesan");
    const catatan = [...s.matchAll(/^\s*"([^"]+)",$/gm)].map((m) => m[1]);
    cek(catatan.length >= 4 && catatan.every(tanpaAngka), "lab: Coba ini dapat dieja");
  }
  const pembungkus = baca("SimulasiK5Bab2", "tsx");
  cek(/eja=\{ejaK5B1\}/.test(pembungkus), "pembungkus: mesin dieja ejaK5B1");
  const coba = [...pembungkus.matchAll(/"([^"]*\?)"/g)].map((m) => m[1]);
  cek(coba.length >= 3 && coba.every(tanpaAngka), "Coba ini mesin dapat dieja");
  // Semua ucapan lab dieja menjadi kata.
  const ucapan = [];
  for (let i = 0; i < A.JARAK.length; i += 1) {
    const xl = L(x0, { t: "L_JARAK", i });
    ucapan.push(A.ucapLompatK5B2A(xl), A.ucapLompatK5B2A(L(xl, { t: "L_LOMPAT" })));
  }
  for (let i = 0; i < A.DATA_TABEL.length; i += 1) {
    const xt = L(x0, { t: "G_DATA", i });
    ucapan.push(A.ucapTabelK5B2A(xt), A.ucapTabelK5B2A(L(xt, { t: "G_KLIK", n: 5 })));
  }
  for (let i = 0; i < A.DATA_CEK.length; i += 1) ucapan.push(A.ucapCekK5B2A(L(x0, { t: "C_DATA", i })));
  cek(ucapan.length >= 10 && ucapan.every(tanpaAngka), `semua ${ucapan.length} ucapan lab dieja menjadi kata`);
  for (const u of ucapan) catat(u, "ucapan lab");
}

/* ------------------------------ Data ringkas ------------------------------ */
{
  const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas5-bab2-ringkas.json", import.meta.url), "utf8"));
  cek(ringkas.chapter_id === "mtk-5-bab2" && ringkas.phase_code === "FASE_C" && ringkas.grade === 5, "ringkas: id bab, fase, kelas");
  for (const h of Object.keys(ringkas.subBab)) {
    const s = ringkas.subBab[h];
    cek(!!s && s.peta.cabang.length === 4 && s.peta.kartu.length === 8 && s.infografis.panel.length === 3, `ringkas ${h}: empat cabang, delapan kartu, tiga panel`);
    cek(s.peta.cabang.every((c) => c.ringkas.split(/\s+/).length <= 8) && s.infografis.panel.every((p) => p.ide.split(/\s+/).length <= 8), `ringkas ${h}: ringkas cabang dan ide panel paling banyak delapan kata`);
    cek(s.peta.cabang.every((c) => s.peta.kartu.filter((k) => k.cabang === c.id).length === 2), `ringkas ${h}: tiap cabang dua kartu`);
    const suara = [];
    JSON.stringify(s, (k, v) => {
      if (k === "suara") suara.push(v);
      return v;
    });
    cek(suara.length > 10 && suara.every((t) => !/\d/.test(t)), `ringkas ${h}: semua teks suara berupa kata`);
    for (const p of s.infografis.panel) {
      if (p.tipe === "buka") cek(p.butir.length >= 2 && p.butir.length <= 4, `ringkas ${h}/${p.id}: dua sampai empat butir`);
      if (p.tipe === "banding") cek(p.sisi.length === 2 && !!p.kesimpulan, `ringkas ${h}/${p.id}: dua sisi dan kesimpulan`);
      for (const b of p.butir ?? []) if (b.visual.jenis === "tabel-menurun") cek(b.visual.baris.length <= 4 && b.visual.baris.every((r) => typeof r[1] === "number"), `ringkas ${h}/${b.id}: tabel paling banyak empat baris, nilai angka`);
    }
  }
  // Angka di ringkas A dihitung ulang mandiri.
  const A0 = ringkas.subBab.A;
  const deret = (d, n) => kelipatanMandiri(d, d * n).join(", ");
  const butir = (panel, id) => panel.butir.find((b) => b.id === id);
  const p1 = A0.infografis.panel[0];
  sama(butir(p1, "mendarat").visual.baris.map((r) => r[1]), kelipatanMandiri(3, 12), "ringkas A: empat pendaratan jarak tiga (dihitung)");
  cek(butir(p1, "contoh").visual.isi === deret(7, 4), "ringkas A: kelipatan tujuh (dihitung)");
  const [tiga, empat] = A0.infografis.panel[1].sisi;
  cek(tiga.visual.isi === deret(3, 5) && empat.visual.isi === deret(4, 5), "ringkas A: kelipatan tiga dan empat (dihitung)");
  const p3 = A0.infografis.panel[2];
  const frasa = (n, d) => `${n} ÷ ${d} = ${bagiMandiri(n, d).q} sisa ${bagiMandiri(n, d).r}`;
  cek(butir(p3, "kelipatan").visual.isi === frasa(12, 3) && butir(p3, "bukan").visual.isi === frasa(14, 3), "ringkas A: 12 dan 14 dibagi 3 (dihitung)");
  cek(butir(p3, "tabel").visual.isi === `${deret(9, 4)}, …`, "ringkas A: kelipatan sembilan (dihitung)");
  const kartu = (id) => A0.peta.kartu.find((k) => k.id === id).teks;
  cek(kartu("a-12").startsWith("12 ÷ 3 bersisa 0") && kartu("a-14").startsWith("14 ÷ 3 bersisa 2") && bagiMandiri(12, 3).r === 0 && bagiMandiri(14, 3).r === 2, "ringkas A: kartu cek sisa (dihitung)");
  cek(kartu("a-warna") === `Kelipatan 4: ${deret(4, 3)}, …`, "ringkas A: kartu kelipatan empat (dihitung)");
  cek(kartu("a-mendarat") === `Mendarat di ${deret(3, 3).replace(/, /g, ", ")}`, "ringkas A: kartu pendaratan (dihitung)");
  sama(Object.keys(ringkas.subBab), ["A"], "ringkas: gelombang ini hanya sub-bab A");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
