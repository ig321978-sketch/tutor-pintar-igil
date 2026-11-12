// Uji Simulasi Kelas 5 Bab 2 (KPK dan FPB): Lab Lompat Kelipatan (A), Lab Dua Jalur (B), Lab Susunan Faktor (C), Lab Faktor Bersama (D), Lab Pohon Prima (E), mesin, skenario,
// misi, gerbang, data ringkas, dan konsep sub-bab berikutnya tidak bocor ke sub-bab sebelumnya.
// Jalankan: node --no-warnings scripts/uji-lab-k5b2.mjs
import { readFileSync } from "node:fs";
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K5 from "../src/components/modul/misi-k5bab2.ts";
import * as TK from "../src/components/modul/misi-teks-k5b2.ts";
import * as A from "../src/components/modul/lab-kelipatan-k5b2a.ts";
import * as B from "../src/components/modul/lab-jalur-k5b2b.ts";
import * as C from "../src/components/modul/lab-faktor-k5b2c.ts";
import * as E from "../src/components/modul/lab-bersama-k5b2d.ts";
import * as F from "../src/components/modul/lab-prima-k5b2e.ts";
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
    cek(x.selesai && Object.values(K5.ID_MESIN_K5B2).includes(def.selesaiId), `${def.id}: bisa diselesaikan, id selesai sesuai misi`);
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
  const huruf = ["A", "B", "C", "D", "E"];
  sama(Object.keys(TK.MISI_K5B2), huruf, "teks misi untuk A, B, C, D, dan E");
  sama(Object.keys(TK.NAMA_SIM_K5B2), huruf, "nama simulasi untuk A, B, C, D, dan E");
  cek(TK.hurufK5B2("Z") === "A" && TK.hurufK5B2("A") === "A", "huruf tak dikenal jatuh ke A");
  cek(["A", "B", "C", "D", "E"].every((h) => TK.misiAwalK5Bab2(h).startsWith("Simulasi 1. Misi: ") && tanpaAngka(TK.misiAwalK5Bab2(h))), "misi awal dan dapat dieja");
  for (const h of huruf) {
    const daftar = K5.daftarMisiK5Bab2(h);
    cek(daftar.filter((m) => m.wajib).length === 7 && daftar.filter((m) => !m.wajib).length === 3, `${h}: tujuh misi wajib dan tiga tantangan bebas`);
    cek(new Set(daftar.map((m) => m.id)).size === 10 && daftar.every((m) => m.id.startsWith(`${h.toLowerCase()}-`)), `${h}: id misi unik berawalan huruf`);
    const kosong = [{ alat: "kelipatan", pernah: [] }, { alat: "jalur", pernah: [] }, { alat: "faktor", pernah: [] }, { alat: "bersama", pernah: [] }, { alat: "prima", pernah: [] }, sel("tidak-ada"), A.keadaanKelipatanK5B2A(A.awalKelipatanK5B2A()), B.keadaanJalurK5B2B(B.awalJalurK5B2B()), C.keadaanFaktorK5B2C(C.awalFaktorK5B2C()), E.keadaanBersamaK5B2D(E.awalBersamaK5B2D()), F.keadaanPrimaK5B2E(F.awalPrimaK5B2E())];
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
  sama(Object.keys(ringkas.subBab), ["A", "B", "C", "D", "E"], "ringkas: sub-bab A sampai E");
}

/* ======================================================================== */
/* ============================ SUB-BAB B ================================= */
/* ======================================================================== */
// Hitungan mandiri untuk B: kelipatan dengan penjumlahan berulang; KPK sebagai kelipatan a pertama yang habis dibagi b
// (pengurangan berulang), dan dicek ulang dengan hasil kali dibagi pembagi persekutuan terbesar (Euclid dengan pengurangan).
const gcdKurang = (a, b) => {
  while (a !== b) {
    if (a > b) a -= b;
    else b -= a;
  }
  return a;
};
const kpkMandiri = (a, b) => {
  for (let v = a; ; v += a) if (adalahKelipatan(v, b)) return v;
};
const daftarKe = kelipatanMandiri;
const kpkDariGcd = (a, b) => {
  // hasil kali dihitung dengan penjumlahan berulang lalu dibagi dengan pengurangan berulang
  let kali = 0;
  for (let i = 0; i < b; i += 1) kali += a;
  return bagiMandiri(kali, gcdKurang(a, b)).q;
};
const biasaMandiri = (p, q) => p.filter((v) => !!q.find((w) => w === v));
/** Hitung hari satu per satu: tanggal mulai ditambah n hari. */
const tanggalSetelah = (awal, n) => {
  let t = awal;
  for (let i = 0; i < n; i += 1) t += 1;
  return t;
};
const LB = B.langkahJalurK5B2B;
const y0 = B.awalJalurK5B2B();

/* ------------------------------ Data sama dengan buku (B) ------------------------------ */
{
  const AB = D.ANGKA_BUKU;
  sama(B.DATA_JADWAL.map((d) => [d.a, d.b]), [[AB.nisaHari, AB.yohanaHari], [AB.asepHari, AB.lukasHari], [AB.dindaHari, AB.ameliaHari]], "Jadwal: selang Nisa, Yohana, Asep, Lukas, Dinda, Amelia dari buku");
  sama(B.DATA_JADWAL.map((d) => kpkMandiri(d.a, d.b)), [AB.kpkRenang, AB.kpkAsepLukas, AB.kpkPiano], "Jadwal: KPK 12, 15, 10 sama dengan buku (dihitung)");
  cek(B.DATA_JADWAL[0].awal === AB.tanggalAwal && tanggalSetelah(AB.tanggalAwal, AB.kpkRenang) === AB.tanggalBaru, "Jadwal: 3 Agustus ditambah 12 hari menjadi 15 Agustus (dari buku, dihitung)");
  cek(D.RONDE_KPK_CB.flat().some((r) => r.angka.join() === "4,5" && r.hasil === 20) && B.DATA_JALUR.some(([a, b]) => a === 4 && b === 5) && B.DATA_IRISAN.some(([a, b]) => a === 4 && b === 5), "Jalur dan Irisan: 4 dan 5 dari buku");
  cek(D.RONDE_KPK_CB.flat().some((r) => r.angka.join() === "2,3" && r.hasil === 6) && B.DATA_IRISAN.some(([a, b]) => a === 2 && b === 3), "Irisan: 2 dan 3 dari buku");
  cek(D.RONDE_KPK_CB.flat().some((r) => r.angka.join() === "6,8" && r.hasil === 24) && B.DATA_IRISAN.some(([a, b]) => a === 6 && b === 8), "Irisan: 6 dan 8 dari buku");
  cek(D.RONDE_KPK_CB.flat().some((r) => r.angka.join() === "3,4" && r.hasil === 12) && B.DATA_JALUR.some(([a, b]) => a === 3 && b === 4), "Jalur: 3 dan 4 dari buku");
  cek(AB.kpkAsepLukas === 15 && B.DATA_JALUR.some(([a, b]) => a === 3 && b === 5), "Jalur: 3 dan 5 dari buku (Asep dan Lukas)");
  for (const [a, b] of [[2, 3], [3, 4], [3, 5], [4, 5], [5, 2], [6, 8], [4, 6], [7, 9]]) {
    cek(kpkMandiri(a, b) === kpkDariGcd(a, b) && B.kpkDaftar(a, b) === kpkMandiri(a, b), `KPK ${a} dan ${b}: daftar, pencarian, dan hasil kali dibagi pembagi terbesar sama`);
  }
}

/* ------------------------------ Lab B: Dua Jalur ------------------------------ */
{
  cek(y0.pernah.length === 0 && y0.pesan === "" && y0.jalur.a === 0 && y0.jalur.b === 0 && y0.irisan.tanda.length === 0 && !y0.irisan.tandaOk && !y0.jadwal.hariOk, "B awal: kosong, belum ada riwayat");
  const A_ = { t: "J_A" };
  const B_ = { t: "J_B" };
  const ulang = (aksi, n) => Array(n).fill(aksi);
  for (const [i, [a, b]] of B.DATA_JALUR.entries()) {
    const k = kpkMandiri(a, b);
    const na = daftarKe(a, k).length;
    const nb = daftarKe(b, k).length;
    const xj = LB(y0, { t: "J_DATA", i });
    // Urutan: A dulu, B dulu, bergantian. Riwayat baru muncul tepat saat kedua pelompat sama-sama mendarat di KPK.
    const urutan = {
      "A dulu": [...ulang(A_, na), ...ulang(B_, nb)],
      "B dulu": [...ulang(B_, nb), ...ulang(A_, na)],
      bergantian: Array.from({ length: Math.max(na, nb) }, (_, j) => [...(j < na ? [A_] : []), ...(j < nb ? [B_] : [])]).flat(),
    };
    for (const [nama, aksi] of Object.entries(urutan)) {
      let s = xj;
      let ok = true;
      for (const [j, ak] of aksi.entries()) {
        s = LB(s, ak);
        const terakhir = j === aksi.length - 1;
        if (s.pernah.includes(`jalur:${a}:${b}`) !== terakhir) ok = false;
      }
      cek(ok, `Jalur ${a} dan ${b} (${nama}): riwayat muncul tepat saat keduanya mendarat di ${k}`);
      cek(s.pesan.startsWith("✅") && s.pesan.includes(`di ${k}.`) && /kelipatan persekutuan pertama/.test(s.pesan) && s.pesan.includes(`KPK dari ${a} dan ${b}`), `Jalur ${a} dan ${b} (${nama}): pesan menyebut KPK ${k}`);
      sama(B.sejajarJalur(s), [k], `Jalur ${a} dan ${b} (${nama}): hanya ${k} yang sama`);
    }
    // Pelompat yang sama terus melompat: tidak pernah bertemu.
    for (const sisi of [A_, B_]) {
      const s = jalan(xj, LB, ulang(sisi, 10));
      cek(s.pernah.length === 0 && /Belum ada bilangan/.test(LB(xj, sisi).pesan), `Jalur ${a} dan ${b}: satu pelompat saja tidak bertemu`);
      const lagi = LB(s, sisi);
      cek(lagi.pernah.length === 0 && /sudah mendarat sepuluh kali/.test(lagi.pesan) && !lagi.pesan.startsWith("✅"), `Jalur ${a} dan ${b}: pendaratan kesebelas ditolak`);
      cek((sisi.t === "J_A" ? lagi.jalur.a : lagi.jalur.b) === 10, `Jalur ${a} dan ${b}: paling banyak sepuluh pendaratan`);
    }
    // Kelipatan persekutuan kedua (dua kali KPK) dicatat bukan yang terkecil.
    const dua = jalan(xj, LB, [...ulang(A_, daftarKe(a, 2 * k).length), ...ulang(B_, daftarKe(b, 2 * k).length)]);
    cek(dua.pernah.includes(`jalur:${a}:${b}`) && /bukan yang terkecil/.test(dua.pesan) && dua.pesan.includes(`di ${2 * k}.`), `Jalur ${a} dan ${b}: kelipatan persekutuan kedua ${2 * k} disebut bukan yang terkecil`);
    sama(B.sejajarJalur(dua), [k, 2 * k], `Jalur ${a} dan ${b}: dua bilangan sama (dihitung)`);
    // Pendaratan sama dengan penjumlahan berulang.
    const tengah = jalan(xj, LB, [...ulang(A_, 4), ...ulang(B_, 3)]);
    sama(B.pendaratanJalur(tengah).a, daftarKe(a, a * 4), `Jalur ${a}: empat pendaratan`);
    sama(B.pendaratanJalur(tengah).b, daftarKe(b, b * 3), `Jalur ${b}: tiga pendaratan`);
    sama(B.sejajarJalur(tengah), biasaMandiri(daftarKe(a, a * 4), daftarKe(b, b * 3)), `Jalur ${a} dan ${b}: bilangan sama sementara`);
    // Mulai lagi mengulang dari nol tanpa mencabut riwayat.
    const m = LB(dua, { t: "J_ULANG" });
    cek(m.jalur.a === 0 && m.jalur.b === 0 && m.pernah.includes(`jalur:${a}:${b}`), `Jalur ${a} dan ${b}: mulai lagi tidak mencabut riwayat`);
    cek(LB(dua, { t: "J_DATA", i: (i + 1) % 3 }).jalur.a === 0, `Jalur ${a} dan ${b}: ganti pasangan mengulang`);
  }
  cek(LB(y0, { t: "J_DATA", i: 3 }) === y0 && LB(y0, { t: "J_DATA", i: -1 }) === y0, "Jalur: pasangan di luar batas diabaikan");
  // Pasangan lain tidak mengisi riwayat pasangan ini.
  const campur = jalan(LB(y0, { t: "J_DATA", i: 1 }), LB, [...ulang({ t: "J_A" }, 4), ...ulang({ t: "J_B" }, 3)]);
  cek(campur.pernah.length === 0, "Jalur: 3 dan 5 belum bertemu di dua belas, tidak tercatat");

  // Irisan.
  for (const [i, [a, b]] of B.DATA_IRISAN.entries()) {
    const p = daftarKe(a, a * 10);
    const q = daftarKe(b, b * 10);
    const xi = LB(y0, { t: "I_DATA", i });
    sama(B.daftarIrisan(xi), { a: p, b: q }, `Irisan ${a} dan ${b}: dua daftar sepuluh kelipatan`);
    const kunci = p.filter((v) => adalahKelipatan(v, b));
    sama(B.kunciIrisan(xi), kunci, `Irisan ${a} dan ${b}: bilangan di kedua daftar sama dengan hitungan keterbagian`);
    sama(kunci, biasaMandiri(p, q), `Irisan ${a} dan ${b}: kunci sama dengan bilangan yang ada di kedua daftar`);
    cek(kunci.length >= 2 && kunci.every((v) => q.includes(v) && adalahKelipatan(v, a) && adalahKelipatan(v, b)), `Irisan ${a} dan ${b}: dua atau lebih bilangan, semuanya kelipatan kedua bilangan`);
    const k = kpkMandiri(a, b);
    cek(kunci[0] === k, `Irisan ${a} dan ${b}: yang terkecil adalah KPK ${k}`);
    const tandai = (daftar) => jalan(xi, LB, daftar.map((n) => ({ t: "I_KLIK", n })));
    const tepat = LB(tandai(kunci), { t: "I_CEK" });
    cek(tepat.irisan.tandaOk && tepat.pesan.startsWith("✅") && tepat.pesan.includes(kunci.join(", ")), `Irisan ${a} dan ${b}: tanda tepat`);
    cek(LB(tandai([...kunci].reverse()), { t: "I_CEK" }).irisan.tandaOk, `Irisan ${a} dan ${b}: urutan tanda tidak berpengaruh`);
    // Pilihan terkecil.
    const opsi = B.opsiKpkIrisan(i);
    cek(opsi.length === 3 && new Set(opsi).size === 3 && opsi.filter((v) => v === k).length === 1, `Irisan ${a} dan ${b}: tiga pilihan unik, satu KPK`);
    cek(opsi.includes(kunci[kunci.length - 1]) && opsi.includes(a + b) && (a + b) !== k, `Irisan ${a} dan ${b}: pengecoh kelipatan persekutuan terakhir dan jumlah`);
    const ok = LB(tepat, { t: "I_KPK", nilai: k });
    cek(ok.pernah.includes(`irisan:${a}:${b}`) && ok.pesan.startsWith("✅") && ok.pesan.includes(`KPK dari ${a} dan ${b}`), `Irisan ${a} dan ${b}: pilihan ${k} tercatat`);
    for (const v of opsi.filter((o) => o !== k)) {
      const s = LB(tepat, { t: "I_KPK", nilai: v });
      cek(s.pernah.length === 0 && !s.pesan.startsWith("✅") && s.pesan.length > 10, `Irisan ${a} dan ${b}: pilihan ${v} ditolak`);
      cek(/bukan yang terkecil/.test(s.pesan) === kunci.includes(v), `Irisan ${a} dan ${b}: ${v} dijelaskan tepat`);
    }
    // KPK sebelum tanda diperiksa ditolak.
    const dini = LB(tandai(kunci), { t: "I_KPK", nilai: k });
    cek(dini.pernah.length === 0 && /Tandai dulu/.test(dini.pesan), `Irisan ${a} dan ${b}: pilihan sebelum periksa ditolak`);
    // Mengubah tanda setelah benar mencabut izin memilih (riwayat tetap).
    const ubah = LB(tepat, { t: "I_KLIK", n: p[0] === kunci[0] ? q[0] : p[0] });
    cek(!ubah.irisan.tandaOk, `Irisan ${a} dan ${b}: ubah tanda mengulang periksa`);
    // Satu bilangan terlewat.
    for (const m of kunci) {
      const s = LB(tandai(kunci.filter((v) => v !== m)), { t: "I_CEK" });
      cek(!s.irisan.tandaOk && !s.pesan.startsWith("✅") && /muncul di kedua daftar/.test(s.pesan), `Irisan ${a} dan ${b}: ${m} terlewat ditolak`);
    }
    // Satu bilangan hanya di satu daftar kelebihan.
    const semua = [...new Set([...p, ...q])];
    let ditolak = 0;
    let total = 0;
    for (const n of semua.filter((v) => !kunci.includes(v))) {
      total += 1;
      const s = LB(tandai([...kunci, n]), { t: "I_CEK" });
      const di = p.includes(n) ? a : b;
      if (!s.irisan.tandaOk && !s.pesan.startsWith("✅") && s.pesan.startsWith(`${n} hanya ada di daftar kelipatan ${di}.`)) ditolak += 1;
    }
    cek(ditolak === total && total >= 10, `Irisan ${a} dan ${b}: semua ${total} bilangan di satu daftar ditolak dan disebut daftarnya (${ditolak})`);
    cek(LB(xi, { t: "I_CEK" }).pesan.startsWith("Belum ada bilangan"), `Irisan ${a} dan ${b}: kosong diberi tahu`);
    cek(LB(tepat, { t: "I_BERSIH" }).irisan.tanda.length === 0 && !LB(tepat, { t: "I_BERSIH" }).irisan.tandaOk, `Irisan ${a} dan ${b}: bersihkan`);
    cek(LB(LB(xi, { t: "I_KLIK", n: p[1] }), { t: "I_KLIK", n: p[1] }).irisan.tanda.length === 0, `Irisan ${a} dan ${b}: ketuk dua kali melepas tanda`);
    cek(LB(tepat, { t: "I_DATA", i: (i + 1) % 3 }).irisan.tanda.length === 0, `Irisan ${a} dan ${b}: ganti pasangan mengosongkan tanda`);
  }
  cek(LB(y0, { t: "I_KLIK", n: 999 }) === y0 && LB(y0, { t: "I_KLIK", n: 7 }) === y0 && LB(y0, { t: "I_DATA", i: 5 }) === y0 && LB(y0, { t: "I_KPK", nilai: 99 }) === y0, "Irisan: di luar batas diabaikan");
  // Kelipatan persekutuan 4 dan 5 tidak memenuhi pasangan lain.
  const salahPasangan = jalan(LB(y0, { t: "I_DATA", i: 1 }), LB, [...daftarKe(4, 40).filter((v) => daftarKe(5, 50).includes(v)).map((n) => ({ t: "I_KLIK", n })), { t: "I_CEK" }]);
  cek(!salahPasangan.irisan.tandaOk && !salahPasangan.irisan.tanda.includes(40), "Irisan: bilangan di luar daftar pasangan ini tidak dapat ditandai, dan tanda kelebihan ditolak");

  // Jadwal.
  for (const [i, d] of B.DATA_JADWAL.entries()) {
    const k = kpkMandiri(d.a, d.b);
    const tgl = tanggalSetelah(d.awal, k);
    const xd = LB(y0, { t: "D_DATA", i });
    const oh = B.opsiHari(i);
    cek(oh.length === 3 && new Set(oh).size === 3 && oh.filter((v) => v === k).length === 1 && oh.includes(2 * k) && oh.includes(d.a + d.b) && d.a + d.b !== k, `Jadwal ${d.namaA}: tiga pilihan hari, satu KPK ${k}`);
    const ot = B.opsiTanggal(i);
    cek(ot.length === 3 && new Set(ot).size === 3 && ot.filter((v) => v === tgl).length === 1 && ot.includes(k) && ot.includes(tanggalSetelah(d.awal, d.a + d.b)) && ot.every((v) => v >= 1 && v <= 31), `Jadwal ${d.namaA}: tiga pilihan tanggal Agustus, satu benar (${tgl})`);
    cek(tgl <= 31, `Jadwal ${d.namaA}: tanggal tetap di bulan Agustus`);
    // Tanggal sebelum hari ditolak.
    const dini = LB(xd, { t: "D_TANGGAL", nilai: tgl });
    cek(dini.pernah.length === 0 && /Tentukan dulu lama hari/.test(dini.pesan), `Jadwal ${d.namaA}: tanggal sebelum hari ditolak`);
    for (const v of oh.filter((o) => o !== k)) {
      const s = LB(xd, { t: "D_HARI", nilai: v });
      cek(!s.jadwal.hariOk && !s.pesan.startsWith("✅") && s.pesan.length > 10, `Jadwal ${d.namaA}: hari ${v} ditolak`);
      cek(LB(s, { t: "D_TANGGAL", nilai: tgl }).pernah.length === 0, `Jadwal ${d.namaA}: tanggal setelah hari salah tidak dicatat`);
      cek(/pertemuan yang kedua/.test(s.pesan) === (v === 2 * k) && /jumlah dua selang/.test(s.pesan) === (v === d.a + d.b), `Jadwal ${d.namaA}: hari ${v} dijelaskan tepat`);
    }
    const hOk = LB(xd, { t: "D_HARI", nilai: k });
    cek(hOk.jadwal.hariOk && hOk.pesan.startsWith("✅") && hOk.pesan.includes(`KPK dari ${d.a} dan ${d.b}`), `Jadwal ${d.namaA}: hari ${k} benar`);
    const tOk = LB(hOk, { t: "D_TANGGAL", nilai: tgl });
    cek(tOk.pernah.includes(`jadwal:${d.a}:${d.b}`) && tOk.pesan.startsWith("✅") && tOk.pesan.includes(`${d.awal} Agustus ditambah ${k} hari jatuh pada ${tgl} Agustus`), `Jadwal ${d.namaA}: tanggal ${tgl} Agustus tercatat`);
    for (const v of ot.filter((o) => o !== tgl)) {
      const s = LB(hOk, { t: "D_TANGGAL", nilai: v });
      cek(s.pernah.length === 0 && !s.pesan.startsWith("✅") && /lamanya hari/.test(s.pesan) === (v === k), `Jadwal ${d.namaA}: tanggal ${v} ditolak`);
    }
    cek(!LB(hOk, { t: "D_DATA", i: (i + 1) % 3 }).jadwal.hariOk, `Jadwal ${d.namaA}: ganti pasangan mengulang hari`);
  }
  cek(LB(y0, { t: "D_HARI", nilai: 99 }) === y0 && LB(y0, { t: "D_DATA", i: 3 }) === y0 && LB(y0, { t: "D_TANGGAL", nilai: 99 }) === y0, "Jadwal: di luar batas diabaikan");

  // Fuzz.
  const acak = acakDari(53);
  let s = y0;
  let ok = true;
  const pesanSemua = new Set();
  const riwayatSemua = new Set();
  for (let i = 0; i < 20000; i += 1) {
    const p = acak(18);
    const kunciI = B.kunciIrisan(s);
    const belum = kunciI.find((n) => !s.irisan.tanda.includes(n));
    const ij = B.daftarIrisan(s);
    const a =
      p === 0 ? { t: "J_DATA", i: acak(4) } :
      p <= 3 ? { t: "J_A" } :
      p <= 6 ? { t: "J_B" } :
      p === 7 ? (acak(4) === 0 ? { t: "J_ULANG" } : { t: "PESAN_KOSONG" }) :
      p === 8 ? { t: "I_DATA", i: acak(4) } :
      p === 9 ? { t: "I_KLIK", n: acak(8) === 0 ? 999 : [...ij.a, ...ij.b][acak(20)] } :
      p === 10 ? { t: "I_KLIK", n: belum ?? ij.a[0] } :
      p === 11 ? (acak(5) === 0 ? { t: "I_BERSIH" } : { t: "I_CEK" }) :
      p === 12 ? { t: "I_KPK", nilai: acak(6) === 0 ? 99 : B.opsiKpkIrisan(s.irisan.data)[acak(3)] } :
      p === 13 ? { t: "D_DATA", i: acak(4) } :
      p === 14 ? { t: "D_HARI", nilai: acak(6) === 0 ? 99 : B.opsiHari(s.jadwal.data)[acak(3)] } :
      p === 15 ? { t: "D_TANGGAL", nilai: acak(6) === 0 ? 99 : B.opsiTanggal(s.jadwal.data)[acak(3)] } :
      p === 16 ? { t: "I_CEK" } :
      acak(40) === 0 ? { t: "RESET" } : { t: "J_A" };
    const t = LB(s, a);
    if (a.t !== "RESET" && !s.pernah.every((v) => t.pernah.includes(v))) ok = false;
    if (!(t.jalur.a >= 0 && t.jalur.a <= 10 && t.jalur.b >= 0 && t.jalur.b <= 10 && t.jalur.data >= 0 && t.jalur.data < 3)) ok = false;
    if (!(t.irisan.data >= 0 && t.irisan.data < 3 && t.jadwal.data >= 0 && t.jadwal.data < 3)) ok = false;
    const tj = B.daftarIrisan(t);
    if (t.irisan.tanda.some((v, j, w) => !(tj.a.includes(v) || tj.b.includes(v)) || (j > 0 && w[j - 1] >= v))) ok = false;
    if (t.irisan.tandaOk && JSON.stringify(t.irisan.tanda) !== JSON.stringify(B.kunciIrisan(t))) ok = false;
    if (typeof t.jadwal.hariOk !== "boolean") ok = false;
    for (const id of t.pernah) if (!/^(jalur:(3:4|3:5|4:5)|irisan:(4:5|2:3|6:8)|jadwal:(3:4|3:5|5:2))$/.test(id)) ok = false;
    if (t.pesan) pesanSemua.add(t.pesan);
    for (const id of t.pernah) riwayatSemua.add(id);
    s = t;
  }
  cek(ok, "fuzz 20.000 aksi Lab Dua Jalur: batas terjaga, riwayat tidak dicabut");
  cek(pesanSemua.size > 40 && [...pesanSemua].every(tanpaAngka), `fuzz Lab Dua Jalur: semua ${pesanSemua.size} pesan dieja menjadi kata`);
  cek(riwayatSemua.size >= 6, `fuzz Lab Dua Jalur: riwayat terkumpul (${[...riwayatSemua].join(" ")})`);
  globalThis.__pesanB = [...pesanSemua];
}

/* ------------------------------ Mesin B ------------------------------ */
{
  const c0 = MS.MESIN_KPK;
  cek(c0.id === "mesin-kpk-k5b2" && c0.selesaiId === K5.ID_MESIN_K5B2.B, "Mesin KPK: id selesai sesuai misi");
  sama(MS.KASUS_KPK.map((k) => [k.a, k.b]), [[2, 3], [4, 5], [6, 8]], "Mesin KPK: pasangan 2 dan 3, 4 dan 5, 6 dan 8");
  for (const [i, k] of MS.KASUS_KPK.entries()) {
    const c = c0.kasus[i];
    const [jalur, irisan, kpk, jadwal] = c.langkah;
    const kunci = kpkMandiri(k.a, k.b);
    const p = daftarKe(k.a, k.a * MS.PANJANG_DAFTAR_KPK);
    const q = daftarKe(k.b, k.b * MS.PANJANG_DAFTAR_KPK);
    const banyak = p.filter((v) => adalahKelipatan(v, k.b)).length;
    cek(banyak >= 1 && banyak === biasaMandiri(p, q).length, `Mesin KPK ${k.a} dan ${k.b}: ada kelipatan persekutuan di daftar`);
    const hitungA = daftarKe(k.a, kunci).length;
    const hitungB = daftarKe(k.b, kunci).length;
    cek(Number(jalur.benar) === hitungA && jalur.tanya.includes(`berjarak ${k.a} harus`) && jalur.opsi.includes(String(hitungA + 1)) && jalur.opsi.includes(String(hitungB)) && hitungA !== hitungB, `Mesin KPK ${k.a} dan ${k.b}: ${hitungA} kali pendaratan sampai bertemu`);
    cek(Number(irisan.benar) === banyak && irisan.tanya.includes(p.join(", ")) && irisan.tanya.includes(q.join(", ")) && irisan.opsi.every((o) => o === irisan.benar || Number(o) !== banyak), `Mesin KPK ${k.a} dan ${k.b}: ${banyak} bilangan di kedua daftar (dihitung)`);
    cek(Number(kpk.benar) === kunci && kpk.opsi.includes(String(k.a + k.b)) && kpk.opsi.every((o) => o === kpk.benar || (Number(o) !== kunci && !(adalahKelipatan(Number(o), k.a) && adalahKelipatan(Number(o), k.b) && Number(o) < kunci))), `Mesin KPK ${k.a} dan ${k.b}: KPK ${kunci}; pengecoh bukan KPK`);
    cek(kpk.opsi.some((o) => Number(o) === (k.a * k.b !== kunci ? k.a * k.b : 2 * kunci)), `Mesin KPK ${k.a} dan ${k.b}: pengecoh hasil kali atau dua kali KPK`);
    const tgl = tanggalSetelah(k.awal, kunci);
    cek(jadwal.benar === `${tgl} Agustus` && tgl <= 31 && jadwal.tanya.includes(`${k.awal} Agustus`) && jadwal.opsi.includes(`${kunci} Agustus`) && jadwal.opsi.includes(`${tanggalSetelah(k.awal, k.a + k.b)} Agustus`), `Mesin KPK ${k.a} dan ${k.b}: ${k.awal} Agustus ditambah ${kunci} menjadi ${tgl} Agustus`);
    cek(EJ.ejaK5B1(c.ringkas).includes(EJ.kataK5B1(kunci)), `Mesin KPK ${k.a} dan ${k.b}: ringkas dieja dengan KPK benar`);
  }
}

/* ------------------------------ Skenario B ------------------------------ */
{
  const S = SK.SKENARIO_K5B2B;
  cek(S.adegan.length >= 5 && S.adegan.length <= 8, `${S.id}: 5 sampai 8 adegan`);
  cek(S.adegan[0].jenis === "narasi" && S.adegan[S.adegan.length - 1].jenis === "akhir" && new Set(S.adegan.map((a) => a.jenis)).size >= 4, `${S.id}: buka, tutup, empat jenis`);
  const semuaTeks = [];
  for (const a of S.adegan) {
    semuaTeks.push(a.cerita);
    for (const o of a.opsi ?? []) semuaTeks.push(o.teks, o.umpan);
    for (const q of a.soal ?? []) semuaTeks.push(q.teks, ...q.opsi);
    for (const f of ["tanya", "sukses", "salah", "kurang", "lebih"]) if (a[f]) semuaTeks.push(a[f]);
  }
  cek(semuaTeks.every(tanpaAngka), `${S.id}: semua teks dapat dieja`);
  sama(S.id.replace(/-k5b2$/, ""), K5.ID_SKENARIO_K5B2.B, "id skenario B sesuai id misi");
  const adegan = (id) => S.adegan.find((a) => a.id === id);
  const kpk34 = kpkMandiri(3, 4);
  const daftar = adegan("daftar");
  cek(daftar.cerita.includes(`Kelipatan 3: ${daftarKe(3, 12).join(", ")}`) && daftar.cerita.includes(`Kelipatan 4: ${daftarKe(4, 12).join(", ")}`), "B: dua daftar kelipatan 3 dan 4 sampai 12 (dihitung)");
  cek(daftar.opsi.find((o) => o.benar).teks === String(kpk34) && daftar.opsi.filter((o) => !o.benar).every((o) => adalahKelipatan(Number(o.teks), 3) !== adalahKelipatan(Number(o.teks), 4)), "B: bilangan di kedua daftar 12; pengecoh hanya di satu daftar");
  const yohana = adegan("yohana");
  const hariKe = [...yohana.cerita.matchAll(/ke-(\d+)/g)].map((m) => Number(m[1]));
  sama(hariKe, daftarKe(4, 12), "B: hari renang Yohana ke-4, ke-8, ke-12");
  cek(yohana.jumlah === daftarKe(4, 12).length, "B: tiga hari renang Yohana dalam 12 hari (dihitung)");
  const nisa = adegan("nisa");
  cek(nisa.target === daftarKe(3, 12).length && nisa.target <= nisa.maks, "B: empat hari renang Nisa dalam 12 hari (dihitung)");
  const soal = adegan("periksa").soal;
  cek(soal[0].jawaban === String(kpk34) && soal[0].opsi.filter((o) => o !== soal[0].jawaban).every((o) => Number(o) !== kpk34), "B: KPK 3 dan 4 (dihitung)");
  cek(soal[1].jawaban === `${tanggalSetelah(3, kpk34)} Agustus` && adegan("periksa").cerita.includes("3 Agustus") && soal[1].opsi.filter((o) => o !== soal[1].jawaban).every((o) => o !== `${tanggalSetelah(3, kpk34)} Agustus`), "B: 3 Agustus ditambah KPK menjadi 15 Agustus (dihitung)");
  cek(soal[2].jawaban === String(2 * kpk34) && soal[2].opsi.filter((o) => o !== soal[2].jawaban).every((o) => !(adalahKelipatan(Number(o), 3) && adalahKelipatan(Number(o), 4))), "B: kelipatan persekutuan kedua 24; pengecoh bukan kelipatan persekutuan (dihitung)");
  const tebak = adegan("tebak");
  cek(tebak.cerita.includes("7") && 3 + 4 === 7 && !adalahKelipatan(7, 3) && tebak.opsi.find((o) => o.benar).teks === `Salah, KPK adalah ${kpk34}` && tebak.opsi.some((o) => !o.benar && o.teks === `Salah, KPK adalah ${2 * kpk34}`), "B: KPK bukan jumlah (7 bukan kelipatan 3) dan bukan 24 (dihitung)");
  const posisi = S.adegan.filter((a) => a.jenis === "pilih").map((a) => a.opsi.findIndex((o) => o.benar));
  cek(new Set(posisi).size === posisi.length, `B: letak jawaban pilih bervariasi (${posisi.join("")})`);
}

/* ------------------------------ Misi B ------------------------------ */
{
  const daftar = K5.daftarMisiK5Bab2("B");
  const capai = (aksi) => M0.misiBaru(K5.MISI_B, B.keadaanJalurK5B2B(jalan(B.awalJalurK5B2B(), LB, aksi)), new Set());
  const ulang = (aksi, n) => Array(n).fill(aksi);
  const jalurKe = (i, na, nb) => [{ t: "J_DATA", i }, ...ulang({ t: "J_A" }, na), ...ulang({ t: "J_B" }, nb)];
  cek(capai(jalurKe(0, 4, 3)).join() === "b-nisa", "B: jalur 3 dan 4 bertemu di 12 memenuhi");
  cek(capai(jalurKe(0, 4, 2)).length === 0 && capai(jalurKe(0, 10, 0)).length === 0 && capai(jalurKe(0, 3, 4)).length === 0, "B: 4 dan 2 pendaratan, satu pelompat saja, atau 3 dan 4 pendaratan tidak memenuhi");
  cek(capai(jalurKe(1, 5, 3)).join() === "b-asep", "B: jalur 3 dan 5 bertemu di 15 memenuhi");
  cek(capai(jalurKe(1, 4, 3)).length === 0 && capai(jalurKe(1, 5, 2)).length === 0, "B: jalur 3 dan 5 belum bertemu tidak memenuhi");
  cek(capai(jalurKe(2, 5, 4)).join() === "b-empatlima", "B: tantangan jalur 4 dan 5 bertemu di 20");
  cek(capai(jalurKe(2, 4, 4)).length === 0, "B: jalur 4 dan 5 pada 16 dan 20 sebelum bertemu tidak memenuhi");
  const irisanKe = (i, tanda, pilih) => [{ t: "I_DATA", i }, ...tanda.map((n) => ({ t: "I_KLIK", n })), { t: "I_CEK" }, ...(pilih === null ? [] : [{ t: "I_KPK", nilai: pilih }])];
  cek(capai(irisanKe(0, [20, 40], 20)).join() === "b-irisan", "B: irisan 4 dan 5 memenuhi");
  cek(capai(irisanKe(0, [20, 40], 40)).length === 0 && capai(irisanKe(0, [20, 40], null)).length === 0 && capai(irisanKe(0, [20], 20)).length === 0 && capai(irisanKe(0, [20, 40, 10], 20)).length === 0, "B: irisan 4 dan 5 dengan pilihan 40, tanpa pilihan, tanda kurang, atau tanda kelebihan tidak memenuhi");
  cek(capai(irisanKe(1, [6, 12, 18], 6)).join() === "b-duatiga", "B: tantangan irisan 2 dan 3");
  cek(capai(irisanKe(2, [24, 48], 24)).join() === "b-enamdelapan", "B: tantangan irisan 6 dan 8");
  cek(capai(irisanKe(2, [24, 48], 24)).join() !== "b-irisan", "B: irisan 6 dan 8 bukan misi 4 dan 5");
  const jadwalKe = (i, hari, tgl) => [{ t: "D_DATA", i }, { t: "D_HARI", nilai: hari }, { t: "D_TANGGAL", nilai: tgl }];
  cek(capai(jadwalKe(0, 12, 15)).join() === "b-hari", "B: Nisa dan Yohana 12 hari, 15 Agustus memenuhi");
  cek(capai(jadwalKe(0, 12, 12)).length === 0 && capai(jadwalKe(0, 24, 15)).length === 0 && capai(jadwalKe(0, 7, 15)).length === 0 && capai([{ t: "D_DATA", i: 0 }, { t: "D_TANGGAL", nilai: 15 }]).length === 0, "B: tanggal 12, hari 24, hari 7, atau tanggal tanpa hari tidak memenuhi");
  cek(capai(jadwalKe(2, 10, 11)).join() === "b-dinda", "B: Dinda dan Amelia 10 hari, 11 Agustus memenuhi");
  cek(capai(jadwalKe(2, 10, 10)).length === 0 && capai(jadwalKe(1, 15, 20)).join() === "", "B: tanggal 10 tidak memenuhi, dan Asep Lukas bukan misi jadwal");
  cek(M0.misiBaru(K5.MISI_B, { alat: "kelipatan", pernah: ["jalur:3:4", "irisan:4:5", "jadwal:3:4"] }, new Set()).length === 0, "B: riwayat alat lain tidak memenuhi misi B");
  cek(M0.misiBaru(K5.MISI_A, B.keadaanJalurK5B2B({ ...B.awalJalurK5B2B(), pernah: ["jalur:3:4"] }), new Set()).length === 0, "B: riwayat jalur tidak memenuhi misi A");
  // Gerbang: tujuh wajib.
  const tampil = M0.tampilMisi(daftar);
  const wajib = tampil.filter((m) => m.wajib).map((m) => m.id);
  cek(wajib.length === 7 && !M0.wajibSelesai(tampil, new Set(wajib.slice(0, 6))) && M0.wajibSelesai(tampil, new Set(wajib)), "B: gerbang terbuka hanya setelah tujuh wajib");
}

/* ------------------------------ Konsep B tidak bocor ------------------------------ */
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
  // Sub-Bab B tidak memakai konsep C sampai E: faktor, pembagi, FPB, bilangan prima, faktorisasi, dan "terbesar".
  const BOCOR_B = /\b(fpb|faktor\w*|prima|pembagi|pohon|ayakan|eratosthenes|terbesar)\b/i;
  const catat = (teks, apa) => {
    const m = BOCOR_B.exec(teks);
    cek(!m, `B: ${apa} bebas konsep sub-bab berikutnya (${m ? m[0] : ""} di "${String(teks).slice(Math.max(0, (m?.index ?? 0) - 30), (m?.index ?? 0) + 40)}")`);
  };
  for (const t of [TK.MISI_K5B2.B, TK.NAMA_SIM_K5B2.B, ...K5.MISI_B.map((m) => m.teks)]) catat(t, "teks misi");
  catat(teksDari(MS.MESIN_KPK), "mesin");
  catat(teksDari(SK.SKENARIO_K5B2B), "skenario");
  catat(teksDari(ringkas.subBab.B), "peta dan infografis ringkas");
  catat(tanpaKomentar(baca("SimulasiLabJalurK5B2", "tsx")), "komponen lab (tanpa komentar)");
  catat(tanpaKomentar(baca("model-jalur-k5b2", "tsx")), "model gambar (tanpa komentar)");
  catat(tanpaKomentar(baca("lab-jalur-k5b2b", "ts")), "logika lab (tanpa komentar)");
  for (const p of globalThis.__pesanB) catat(p, "pesan lab dari fuzz");
  const x = B.awalJalurK5B2B();
  const ucapan = [];
  for (let i = 0; i < 3; i += 1) {
    ucapan.push(B.ucapJalurK5B2B(LB(x, { t: "J_DATA", i })), B.ucapJalurK5B2B(LB(LB(x, { t: "J_DATA", i }), { t: "J_A" })));
    ucapan.push(B.ucapIrisanK5B2B(LB(x, { t: "I_DATA", i })), B.ucapIrisanK5B2B(LB(LB(x, { t: "I_DATA", i }), { t: "I_KLIK", n: B.daftarIrisan(LB(x, { t: "I_DATA", i })).a[1] })));
    ucapan.push(B.ucapJadwalK5B2B(LB(x, { t: "D_DATA", i })));
  }
  cek(ucapan.length === 15 && ucapan.every(tanpaAngka), `semua ${ucapan.length} ucapan lab B dieja menjadi kata`);
  for (const u of ucapan) catat(u, "ucapan lab");

  for (const f of ["SimulasiLabJalurK5B2", "model-jalur-k5b2"]) {
    const s = baca(f, "tsx");
    cek(!/correct_index|explanation/.test(s), `${f}: tidak memuat correct_index atau explanation`);
    cek(!/fetch\(|XMLHttpRequest|api\/|openai|anthropic|gemini/i.test(s), `${f}: tanpa jaringan atau model bahasa`);
  }
  {
    const s = baca("lab-jalur-k5b2b", "ts");
    cek(!/fetch\(|XMLHttpRequest|from "react"|openai|anthropic|gemini|correct_index|explanation/i.test(s) && (s.match(/^import .+$/gm) ?? []).length === 0, "lab-jalur-k5b2b: murni, tanpa impor");
    const k = baca("SimulasiLabJalurK5B2", "tsx");
    cek(/useEffect\(\(\) => \{\s*onKeadaan\?\.\(keadaan\w+\(x\)\);\s*\}, \[onKeadaan, x\]\);/.test(k), "lab B: lapor keadaan lewat useEffect");
    cek(/setLihat\(v\);\s*kirim\(\{ t: "PESAN_KOSONG" \}\);/.test(k), "lab B: ganti tampilan mengosongkan pesan");
    const catatan = [...k.matchAll(/^\s*"([^"]+)",$/gm)].map((m) => m[1]);
    cek(catatan.length >= 4 && catatan.every(tanpaAngka), "lab B: Coba ini dapat dieja");
  }

  // Data ringkas B dihitung ulang mandiri.
  const B0 = ringkas.subBab.B;
  const butir = (panel, id) => panel.butir.find((b) => b.id === id);
  const deret = (d, n) => daftarKe(d, d * n).join(", ");
  const p1 = B0.infografis.panel[0];
  const k34 = kpkMandiri(3, 4);
  cek(butir(p1, "tiga").visual.isi === deret(3, 5) && butir(p1, "empat").visual.isi === deret(4, 5) && butir(p1, "sama").visual.isi === String(k34), "ringkas B: dua daftar dan bilangan yang sama (dihitung)");
  cek(biasaMandiri(daftarKe(3, 15), daftarKe(4, 20)).join() === String(k34), "ringkas B: hanya 12 di dua daftar pendek (dihitung)");
  const [pers, kp] = B0.infografis.panel[1].sisi;
  cek(pers.visual.isi === `${[1, 2, 3].map((m) => k34 * m).join(", ")}, …` && kp.visual.isi === String(k34), "ringkas B: kelipatan persekutuan dan KPK (dihitung)");
  const p3 = B0.infografis.panel[2];
  sama(butir(p3, "lama").visual.baris, [["3 dan 4", kpkMandiri(3, 4)], ["3 dan 5", kpkMandiri(3, 5)], ["5 dan 2", kpkMandiri(5, 2)]], "ringkas B: KPK tiga pasangan (dihitung)");
  cek(butir(p3, "tanggal").visual.isi === `3 + ${k34} = ${tanggalSetelah(3, k34)} Agustus` && butir(p3, "jumlah").visual.isi === `3 + 4 = ${3 + 4}` && !adalahKelipatan(7, 3), "ringkas B: tanggal dan jumlah (dihitung)");
  const kartu = (id) => B0.peta.kartu.find((k) => k.id === id).teks;
  cek(kartu("b-tiga") === `Kelipatan 3: ${deret(3, 4)}` && kartu("b-empat") === `Kelipatan 4: ${deret(4, 4)}` && kartu("b-dua-belas") === `KPK 3 dan 4 adalah ${k34}`, "ringkas B: kartu daftar dan KPK (dihitung)");
  cek(daftarKe(3, 12).includes(12) && daftarKe(4, 16).includes(12) && !adalahKelipatan(8, 3) && adalahKelipatan(8, 4) && kartu("b-dua-daftar") === "12 ada di kedua daftar" && kartu("b-satu-daftar") === "8 hanya ada di daftar 4", "ringkas B: 12 di kedua daftar, 8 hanya di daftar 4 (dihitung)");
  cek(kartu("b-tanggal") === `3 Agustus + ${k34} hari = ${tanggalSetelah(3, k34)} Agustus` && kartu("b-berulang") === `Bertemu lagi tiap ${k34} hari` && kartu("b-bukan-jumlah") === "Bukan jumlah: 3 + 4 = 7", "ringkas B: kartu jadwal (dihitung)");
}

/* ======================================================================== */
/* ============================ SUB-BAB C ================================= */
/* ======================================================================== */
// Hitungan mandiri untuk C: faktor dicari dengan mencoba semua pembagi 1 sampai n (sisa dengan pengurangan berulang),
// pasangan dengan perkalian lewat penjumlahan berulang, banyak titik per baris dengan pengurangan berulang.
const kaliMandiri = (a, b) => {
  let h = 0;
  for (let i = 0; i < b; i += 1) h += a;
  return h;
};
const faktorMandiri = (n) => {
  const h = [];
  for (let d = 1; d <= n; d += 1) if (bagiMandiri(n, d).r === 0) h.push(d);
  return h;
};
const pasanganMandiri = (n) => {
  const h = [];
  for (let a = 1; a <= n; a += 1) for (let b = a; b <= n; b += 1) if (kaliMandiri(a, b) === n) h.push([a, b]);
  return h;
};
const akarBawah = (n) => {
  let a = 0;
  while (kaliMandiri(a + 1, a + 1) <= n) a += 1;
  return a;
};
const LC = C.langkahFaktorK5B2C;
const z0 = C.awalFaktorK5B2C();

/* ------------------------------ Data sama dengan buku (C) ------------------------------ */
{
  const AB = D.ANGKA_BUKU;
  sama(faktorMandiri(12), AB.contohFaktor12, "faktor 12 sama dengan data buku (dihitung)");
  sama(faktorMandiri(18), AB.contohFaktor18, "faktor 18 sama dengan data buku (dihitung)");
  const lembar = D.RONDE_FAKTOR_CC.flat();
  for (const n of [12, 18, 24, 36]) cek(lembar.some((r) => r.n === n && JSON.stringify(r.daftar) === JSON.stringify(faktorMandiri(n))), `data buku: daftar faktor ${n} sama dengan hitungan`);
  cek(lembar.some((r) => r.n === 24 && r.tanya === 5 && !r.ya) || D.RONDE_FAKTOR_CC.flat().some((r) => r.n === 36 && r.tanya === 5 && !r.ya), "data buku: 5 bukan faktor 24 atau 36");
  sama(C.DATA_SUSUN, [12, 18, 24], "Susun: 12, 18, 24 dari buku");
  sama(C.DATA_PASANGAN, [18, 12, 36], "Pasangan: 18, 12, 36 dari buku");
  sama(C.DATA_TANDA, [24, 36], "Tanda: 24 dan 36 dari buku");
  cek(D.RONDE_PASANGAN_CC.flat().some((r) => r.n === 18 && r.a === 2 && r.b === 9) && D.RONDE_PASANGAN_CC.flat().some((r) => r.n === 36 && r.a === 4 && r.b === 9), "data buku: pasangan 2 dan 9 untuk 18, 4 dan 9 untuk 36");
  for (const n of [12, 18, 24, 36, 5, 1, 49]) {
    sama(C.daftarFaktor(n), faktorMandiri(n), `daftarFaktor(${n}) sama dengan hitungan mandiri`);
    sama(C.pasanganFaktor(n), pasanganMandiri(n), `pasanganFaktor(${n}) sama dengan perkalian mandiri`);
  }
}

/* ------------------------------ Lab C: Susunan Faktor ------------------------------ */
{
  cek(z0.pernah.length === 0 && z0.pesan === "" && z0.susun.baris === 1 && z0.susun.ditemukan.length === 0 && z0.pasangan.a === 1 && z0.tanda.tanda.length === 0, "C awal: kosong, belum ada riwayat");
  const kePoros = (x, r) => {
    let s = x;
    while (s.susun.baris < r) s = LC(s, { t: "S_NAIK" });
    while (s.susun.baris > r) s = LC(s, { t: "S_TURUN" });
    return s;
  };
  const simpan = (x, r) => LC(kePoros(x, r), { t: "S_SIMPAN" });
  for (const [i, n] of C.DATA_SUSUN.entries()) {
    const faktor = faktorMandiri(n);
    const xs = LC(z0, { t: "S_DATA", i });
    for (const r of faktor) {
      const t = kePoros(xs, r);
      const { q, r: sisa } = bagiMandiri(n, r);
      cek(C.bagiSusun(t).q === q && C.bagiSusun(t).r === sisa && sisa === 0, `Susun ${n}/${r}: tiap baris ${q} titik, tanpa sisa (dihitung)`);
    }
    // Semua susunan penuh, naik atau turun.
    for (const [nama, urut] of [["naik", faktor], ["turun", [...faktor].reverse()]]) {
      let s = xs;
      let ok = true;
      for (const [j, r] of urut.entries()) {
        s = simpan(s, r);
        const terakhir = j === urut.length - 1;
        if (s.pernah.includes(`susun:${n}`) !== terakhir) ok = false;
        if (!s.pesan.startsWith("✅") || !s.pesan.includes(`${r} baris`) || !s.pesan.includes(`${bagiMandiri(n, r).q} titik`)) ok = false;
      }
      cek(ok, `Susun ${n} (${nama}): riwayat muncul tepat saat faktor terakhir disimpan`);
      cek(s.pesan.includes(faktor.join(", ")) && s.susun.ditemukan.join() === faktor.join(), `Susun ${n} (${nama}): pesan menyebut semua faktor`);
    }
    // Satu faktor terlewat: tidak tercatat.
    for (const m of faktor) {
      const s = faktor.filter((v) => v !== m).reduce((a, r) => simpan(a, r), xs);
      cek(!s.pernah.includes(`susun:${n}`) && s.susun.ditemukan.length === faktor.length - 1, `Susun ${n}: tanpa faktor ${m} belum lengkap`);
    }
    // Susunan tidak rata: tidak menambah faktor, dicatat gagal, dijelaskan dengan sisa.
    let tolak = 0;
    let total = 0;
    for (let r = 1; r <= n; r += 1) {
      const { q, r: sisa } = bagiMandiri(n, r);
      if (sisa === 0) continue;
      total += 1;
      const s = simpan(xs, r);
      if (s.susun.ditemukan.length === 0 && s.pernah.includes(`gagal:${n}:${r}`) && !s.pernah.some((p) => p.startsWith("susun:")) && !s.pesan.startsWith("✅") && s.pesan.includes(`tiap baris ${q} titik`) && s.pesan.includes(`${sisa} titik sisa`) && s.pesan.includes(`${r} bukan faktor ${n}`)) tolak += 1;
    }
    cek(tolak === total && total > 0, `Susun ${n}: semua ${total} banyak baris yang bersisa ditolak dengan sisanya (${tolak})`);
    // Simpan dua kali.
    const dua = simpan(simpan(xs, faktor[1]), faktor[1]);
    cek(dua.susun.ditemukan.length === 1 && /sudah kamu simpan/.test(dua.pesan), `Susun ${n}: simpan dua kali tidak menggandakan`);
    // Batas baris.
    const penuh = kePoros(xs, n);
    cek(LC(penuh, { t: "S_NAIK" }).susun.baris === n && /Paling banyak/.test(LC(penuh, { t: "S_NAIK" }).pesan), `Susun ${n}: paling banyak ${n} baris`);
    cek(LC(xs, { t: "S_TURUN" }) === xs, `Susun ${n}: satu baris adalah batas bawah`);
    cek(LC(simpan(xs, 1), { t: "S_BERSIH" }).susun.ditemukan.length === 0 && LC(simpan(xs, 1), { t: "S_BERSIH" }).susun.baris === 1, `Susun ${n}: kosongkan`);
    cek(LC(simpan(xs, 1), { t: "S_DATA", i: (i + 1) % 3 }).susun.ditemukan.length === 0, `Susun ${n}: ganti bilangan mengosongkan simpanan`);
  }
  cek(LC(z0, { t: "S_DATA", i: 3 }) === z0 && LC(z0, { t: "S_DATA", i: -1 }) === z0, "Susun: bilangan di luar batas diabaikan");

  // Pasangan.
  for (const [i, n] of C.DATA_PASANGAN.entries()) {
    const xp = LC(z0, { t: "P_DATA", i });
    const batas = akarBawah(n);
    const faktor = faktorMandiri(n);
    let s = xp;
    let ok = true;
    const posisi = [];
    for (let a = 1; a <= batas; a += 1) {
      const adaFaktor = bagiMandiri(n, a).r === 0;
      const b = bagiMandiri(n, a).q;
      const opsi = C.opsiPasangan(n, a);
      const kunci = adaFaktor ? b : 0;
      if (!(opsi.length === 3 && new Set(opsi).size === 3 && opsi.filter((v) => v === kunci).length === 1 && opsi.every((v) => Number.isInteger(v) && v >= 0))) ok = false;
      posisi.push(opsi.indexOf(kunci));
      if (adaFaktor && !opsi.includes(0)) ok = false;
      if (!adaFaktor && !opsi.includes(bagiMandiri(n, a).q) ) ok = false;
      // Jawaban salah: tidak maju.
      for (const v of opsi.filter((o) => o !== kunci)) {
        const t = LC(s, { t: "P_JAWAB", nilai: v });
        if (t.pasangan.a !== a || t.pasangan.pasang.length !== s.pasangan.pasang.length || t.pesan.startsWith("✅") || t.pesan.length < 10 || t.pernah.length !== s.pernah.length) ok = false;
        if (v === 0 && !(t.pesan.includes(`${a} × ${b} = ${n}`) && t.pesan.includes("adalah faktor"))) ok = false;
        if (v !== 0 && !t.pesan.includes(`${a} dikali ${v} sama dengan ${kaliMandiri(a, v)}, bukan ${n}`)) ok = false;
      }
      const sebelum = s;
      s = LC(s, { t: "P_JAWAB", nilai: kunci });
      const terakhir = a === batas;
      if (s.pasangan.a !== a + 1 || s.pasangan.selesai !== terakhir || s.pernah.includes(`pasangan:${n}`) !== terakhir) ok = false;
      if (!s.pesan.startsWith("✅")) ok = false;
      if (adaFaktor && !s.pesan.includes(a === b ? `${a} × ${a} = ${n}` : `${a} × ${b} = ${n}`)) ok = false;
      if (!adaFaktor && !s.pesan.includes(`${n} dibagi ${a} bersisa ${bagiMandiri(n, a).r}, jadi ${a} bukan faktor ${n}`)) ok = false;
      if (s.pasangan.pasang.length !== sebelum.pasangan.pasang.length + (adaFaktor ? 1 : 0)) ok = false;
    }
    cek(ok, `Pasangan ${n}: tiap kandidat 1 sampai ${batas} (jawaban salah tidak maju, riwayat hanya di akhir)`);
    cek(s.pasangan.selesai && s.pernah.includes(`pasangan:${n}`) && s.pesan.includes(faktor.join(", ")) && s.pesan.includes("bertemu di tengah"), `Pasangan ${n}: selesai di kandidat ${batas}, faktor ${faktor.join(", ")}`);
    sama(C.faktorPasangan(s), faktor, `Pasangan ${n}: faktor dari pasangan sama dengan hitungan mandiri`);
    sama(s.pasangan.pasang, pasanganMandiri(n), `Pasangan ${n}: pasangan sama dengan perkalian mandiri`);
    cek(new Set(posisi).size >= 2, `Pasangan ${n}: letak kunci bervariasi (${posisi.join("")})`);
    cek(/sudah lengkap/.test(LC(s, { t: "P_JAWAB", nilai: 0 }).pesan) && LC(s, { t: "P_JAWAB", nilai: 0 }).pasangan.pasang.length === s.pasangan.pasang.length, `Pasangan ${n}: setelah selesai jawaban baru ditolak`);
    const ul = LC(s, { t: "P_ULANG" });
    cek(ul.pasangan.a === 1 && ul.pasangan.pasang.length === 0 && !ul.pasangan.selesai && ul.pernah.includes(`pasangan:${n}`), `Pasangan ${n}: mulai lagi tidak mencabut riwayat`);
    cek(LC(xp, { t: "P_JAWAB", nilai: 999 }) === xp, `Pasangan ${n}: pilihan di luar daftar diabaikan`);
    cek(LC(s, { t: "P_DATA", i: (i + 1) % 3 }).pasangan.a === 1, `Pasangan ${n}: ganti bilangan mengulang`);
  }
  cek(akarBawah(36) === 6, "Pasangan 36: kandidat berhenti di 6 (6 × 6)");
  cek(C.pasanganFaktor(36).some(([a, b]) => a === 6 && b === 6) && !C.pasanganFaktor(18).some(([a, b]) => a === b), "Pasangan: 36 punya pasangan kembar 6 dan 6, 18 tidak");
  cek(LC(z0, { t: "P_DATA", i: 3 }) === z0, "Pasangan: bilangan di luar batas diabaikan");

  // Tanda.
  for (const [i, n] of C.DATA_TANDA.entries()) {
    const faktor = faktorMandiri(n);
    const xt = LC(z0, { t: "T_DATA", i });
    const tandai = (daftar) => jalan(xt, LC, daftar.map((v) => ({ t: "T_KLIK", n: v })));
    const tepat = LC(tandai(faktor), { t: "T_CEK" });
    cek(tepat.pernah.includes(`cek:${n}`) && tepat.pesan.startsWith("✅") && tepat.pesan.includes(faktor.join(", ")) && tepat.pesan.includes(`ada ${faktor.length}`), `Tanda ${n}: semua faktor tercatat`);
    cek(LC(tandai([...faktor].reverse()), { t: "T_CEK" }).pernah.includes(`cek:${n}`), `Tanda ${n}: urutan klik tidak berpengaruh`);
    for (const m of faktor) {
      const s = LC(tandai(faktor.filter((v) => v !== m)), { t: "T_CEK" });
      const harap = m === 1 ? /1 selalu faktor/ : m === n ? new RegExp(`${n} juga faktor ${n}`) : new RegExp(`misalnya ${m}`);
      cek(s.pernah.length === 0 && !s.pesan.startsWith("✅") && harap.test(s.pesan), `Tanda ${n}: faktor ${m} terlewat ditolak dengan penjelasan yang tepat`);
    }
    // Tanpa 1 dan n sekaligus: yang terkecil adalah 1.
    cek(/1 selalu faktor/.test(LC(tandai(faktor.filter((v) => v !== 1 && v !== n)), { t: "T_CEK" }).pesan), `Tanda ${n}: tanpa 1 dan ${n}, 1 disebut dulu`);
    let tolak = 0;
    let total = 0;
    for (let v = 1; v <= n; v += 1) {
      if (faktor.includes(v)) continue;
      total += 1;
      const s = LC(tandai([...faktor, v]), { t: "T_CEK" });
      if (s.pernah.length === 0 && !s.pesan.startsWith("✅") && s.pesan.startsWith(`${v} bukan faktor ${n}: ${n} dibagi ${v} bersisa ${bagiMandiri(n, v).r}.`)) tolak += 1;
    }
    cek(tolak === total && total > 5, `Tanda ${n}: semua ${total} bilangan bukan faktor ditolak dengan sisanya (${tolak})`);
    cek(/Belum ada bilangan/.test(LC(xt, { t: "T_CEK" }).pesan), `Tanda ${n}: kosong diberi tahu`);
    cek(LC(LC(xt, { t: "T_KLIK", n: 5 }), { t: "T_KLIK", n: 5 }).tanda.tanda.length === 0 && LC(tepat, { t: "T_BERSIH" }).tanda.tanda.length === 0, `Tanda ${n}: ketuk dua kali melepas, bersihkan`);
    cek(LC(tepat, { t: "T_DATA", i: (i + 1) % 2 }).tanda.tanda.length === 0, `Tanda ${n}: ganti bilangan mengosongkan tanda`);
    cek(LC(xt, { t: "T_KLIK", n: 0 }) === xt && LC(xt, { t: "T_KLIK", n: n + 1 }) === xt && LC(xt, { t: "T_KLIK", n: 2.5 }) === xt, `Tanda ${n}: kartu di luar batas diabaikan`);
  }
  cek(LC(z0, { t: "T_DATA", i: 2 }) === z0, "Tanda: bilangan di luar batas diabaikan");
  // Faktor 24 tidak memenuhi 36.
  cek(!LC(jalan(LC(z0, { t: "T_DATA", i: 1 }), LC, faktorMandiri(24).map((v) => ({ t: "T_KLIK", n: v }))), { t: "T_CEK" }).pernah.some((p) => p.startsWith("cek:")), "Tanda: faktor 24 saat targetnya 36 tidak tercatat");

  // Fuzz.
  const acak = acakDari(54);
  let s = z0;
  let ok = true;
  const pesanSemua = new Set();
  const riwayatSemua = new Set();
  for (let i = 0; i < 20000; i += 1) {
    const p = acak(20);
    const nS = C.bilSusun(s);
    const nT = C.bilTanda(s);
    const kunciT = faktorMandiri(nT);
    const belum = kunciT.find((v) => !s.tanda.tanda.includes(v));
    const nP = C.bilPasangan(s);
    const opsiP = C.opsiPasangan(nP, Math.min(s.pasangan.a, nP));
    const a =
      p === 0 ? { t: "S_DATA", i: acak(4) } :
      p <= 3 ? { t: "S_NAIK" } :
      p === 4 ? { t: "S_TURUN" } :
      p === 5 ? { t: "S_SIMPAN" } :
      p === 6 ? { t: "S_SIMPAN" } :
      p === 7 ? (acak(6) === 0 ? { t: "S_BERSIH" } : { t: "PESAN_KOSONG" }) :
      p === 8 ? { t: "P_DATA", i: acak(4) } :
      p <= 11 ? { t: "P_JAWAB", nilai: acak(6) === 0 ? 999 : opsiP[acak(3)] } :
      p === 12 ? { t: "P_JAWAB", nilai: (nP % s.pasangan.a === 0 ? nP / s.pasangan.a : 0) } :
      p === 13 ? (acak(5) === 0 ? { t: "P_ULANG" } : { t: "PESAN_KOSONG" }) :
      p === 14 ? { t: "T_DATA", i: acak(3) } :
      p === 15 ? { t: "T_KLIK", n: acak(40) } :
      p === 16 ? { t: "T_KLIK", n: belum ?? 1 } :
      p === 17 ? { t: "T_CEK" } :
      p === 18 ? (acak(5) === 0 ? { t: "T_BERSIH" } : { t: "T_CEK" }) :
      acak(40) === 0 ? { t: "RESET" } : { t: "S_NAIK" };
    void nS;
    const t = LC(s, a);
    if (a.t !== "RESET" && !s.pernah.every((v) => t.pernah.includes(v))) ok = false;
    if (!(t.susun.data >= 0 && t.susun.data < 3 && t.susun.baris >= 1 && t.susun.baris <= C.bilSusun(t))) ok = false;
    if (t.susun.ditemukan.some((v, j, w) => !Number.isInteger(v) || C.bilSusun(t) % v !== 0 || (j > 0 && w[j - 1] >= v))) ok = false;
    if (!(t.pasangan.data >= 0 && t.pasangan.data < 3 && t.pasangan.a >= 1 && t.pasangan.a <= akarBawah(C.bilPasangan(t)) + 1)) ok = false;
    if (t.pasangan.selesai !== (t.pasangan.a > akarBawah(C.bilPasangan(t)))) ok = false;
    if (t.pasangan.pasang.some(([p1, q1]) => kaliMandiri(p1, q1) !== C.bilPasangan(t) || p1 > q1)) ok = false;
    if (!(t.tanda.data >= 0 && t.tanda.data < 2)) ok = false;
    if (t.tanda.tanda.some((v, j, w) => !Number.isInteger(v) || v < 1 || v > C.bilTanda(t) || (j > 0 && w[j - 1] >= v))) ok = false;
    for (const id of t.pernah) if (!/^(susun:(12|18|24)|gagal:(12|18|24):\d+|pasangan:(18|12|36)|cek:(24|36))$/.test(id)) ok = false;
    if (t.pesan) pesanSemua.add(t.pesan);
    for (const id of t.pernah) riwayatSemua.add(id);
    s = t;
  }
  cek(ok, "fuzz 20.000 aksi Lab Susunan Faktor: batas terjaga, riwayat tidak dicabut");
  cek(pesanSemua.size > 40 && [...pesanSemua].every(tanpaAngka), `fuzz Lab Susunan Faktor: semua ${pesanSemua.size} pesan dieja menjadi kata`);
  cek(riwayatSemua.size >= 6, `fuzz Lab Susunan Faktor: riwayat terkumpul (${riwayatSemua.size})`);
  globalThis.__pesanC = [...pesanSemua];
}

/* ------------------------------ Mesin C ------------------------------ */
{
  const c0 = MS.MESIN_FAKTOR;
  cek(c0.id === "mesin-faktor-k5b2" && c0.selesaiId === K5.ID_MESIN_K5B2.C, "Mesin Faktor: id selesai sesuai misi");
  sama(MS.KASUS_FAKTOR.map((k) => k.n), [18, 24, 36], "Mesin Faktor: 18, 24, 36");
  for (const [i, k] of MS.KASUS_FAKTOR.entries()) {
    const c = c0.kasus[i];
    const [susun, pasangan, daftar, cekL] = c.langkah;
    const faktor = faktorMandiri(k.n);
    cek(bagiMandiri(k.n, k.r).r === 0 && Number(susun.benar) === bagiMandiri(k.n, k.r).q && susun.tanya.includes(`${k.n} titik`) && susun.tanya.includes(`${k.r} baris`) && susun.opsi.includes(String(Number(susun.benar) + 1)) && susun.opsi.includes(String(k.r)) && Number(susun.benar) !== k.r, `Mesin Faktor ${k.n}: ${k.r} baris, ${susun.benar} titik tiap baris (dihitung)`);
    cek(bagiMandiri(k.n, k.a).r === 0 && Number(pasangan.benar) === bagiMandiri(k.n, k.a).q && kaliMandiri(k.a, Number(pasangan.benar)) === k.n && pasangan.tanya.includes(`dengan ${k.a} `) && pasangan.opsi.every((o) => o === pasangan.benar || kaliMandiri(k.a, Number(o)) !== k.n), `Mesin Faktor ${k.n}: ${k.a} berpasangan dengan ${pasangan.benar}; pengecoh salah`);
    cek(Number(daftar.benar) === faktor.length && daftar.opsi.every((o) => o === daftar.benar || Number(o) !== faktor.length) && daftar.opsi.includes(String(faktor.length - 2)) && daftar.opsi.includes(String(faktor.length + 1)), `Mesin Faktor ${k.n}: ${faktor.length} faktor (dihitung)`);
    const { r } = bagiMandiri(k.n, k.d);
    cek(r > 0 && cekL.benar === `bukan, sisa ${r}` && cekL.tanya.includes(`${k.d} faktor ${k.n}`) && cekL.opsi.includes(`ya, faktor ${k.n}`) && cekL.opsi.some((o) => o.startsWith("bukan, sisa ") && o !== cekL.benar), `Mesin Faktor ${k.n}: ${k.d} bukan faktor, sisa ${r}`);
    cek(EJ.ejaK5B1(c.ringkas).includes(EJ.kataK5B1(faktor.length)), `Mesin Faktor ${k.n}: ringkas dieja dengan banyak faktor`);
  }
}

/* ------------------------------ Skenario C ------------------------------ */
{
  const S = SK.SKENARIO_K5B2C;
  cek(S.adegan.length >= 5 && S.adegan.length <= 8, `${S.id}: 5 sampai 8 adegan`);
  cek(S.adegan[0].jenis === "narasi" && S.adegan[S.adegan.length - 1].jenis === "akhir" && new Set(S.adegan.map((a) => a.jenis)).size >= 4, `${S.id}: buka, tutup, empat jenis`);
  const semuaTeks = [];
  for (const a of S.adegan) {
    semuaTeks.push(a.cerita);
    for (const o of a.opsi ?? []) semuaTeks.push(o.teks, o.umpan);
    for (const q of a.soal ?? []) semuaTeks.push(q.teks, ...q.opsi);
    for (const f of ["tanya", "sukses", "salah", "kurang", "lebih"]) if (a[f]) semuaTeks.push(a[f]);
  }
  cek(semuaTeks.every(tanpaAngka), `${S.id}: semua teks dapat dieja`);
  sama(S.id.replace(/-k5b2$/, ""), K5.ID_SKENARIO_K5B2.C, "id skenario C sesuai id misi");
  const adegan = (id) => S.adegan.find((a) => a.id === id);
  const lima = adegan("lima");
  const bagi125 = bagiMandiri(12, 5);
  const benarLima = lima.opsi.find((o) => o.benar);
  cek(lima.cerita.includes("12 petak") && lima.cerita.includes("5 baris") && bagi125.r === 2 && benarLima.teks === `Ada sisa ${bagi125.r} petak, jadi 5 bukan faktor 12`, "C: 12 dibagi 5 bersisa 2 (dihitung)");
  cek(lima.opsi.filter((o) => !o.benar).every((o) => o.teks.includes("tepat")) && kaliMandiri(5, bagi125.q) === 10 && kaliMandiri(5, 3) === 15 && kaliMandiri(5, 3) !== 12, "C: pengecoh tiap baris 2 atau 3 petak tidak tepat (dihitung)");
  const hit = adegan("faktor-dua-belas");
  const dalamCerita = [...hit.cerita.matchAll(/\d+/g)].map((m) => Number(m[0])).filter((v) => v !== 12 || true);
  sama(dalamCerita.slice(1), faktorMandiri(12), "C: faktor 12 di cerita sama dengan hitungan");
  cek(hit.jumlah === faktorMandiri(12).length, "C: banyak faktor 12 enam (dihitung)");
  const isi = adegan("delapan-belas");
  cek(isi.target === faktorMandiri(18).length && isi.target <= isi.maks && isi.sukses.includes(faktorMandiri(18).join(", ").replace(/, ([^,]*)$/, ", dan $1")), "C: banyak faktor 18 enam, disebut di umpan (dihitung)");
  const soal = adegan("periksa").soal;
  cek(soal[0].jawaban === String(bagiMandiri(12, 3).q) && kaliMandiri(3, Number(soal[0].jawaban)) === 12 && soal[0].opsi.filter((o) => o !== soal[0].jawaban).every((o) => kaliMandiri(3, Number(o)) !== 12), "C: pasangan 3 untuk 12 adalah 4 (dihitung)");
  cek(soal[1].jawaban === String(kaliMandiri(2, 9)) && soal[1].opsi.filter((o) => o !== soal[1].jawaban).every((o) => Number(o) !== 18), "C: 2 × 9 = 18 (dihitung)");
  cek(soal[2].jawaban === String(faktorMandiri(24).length) && soal[2].opsi.filter((o) => o !== soal[2].jawaban).every((o) => Number(o) !== faktorMandiri(24).length), "C: faktor 24 ada 8 (dihitung)");
  const lupa = adegan("lupa");
  const disebut = [2, 3, 4, 6, 8, 12];
  const hilang = faktorMandiri(24).filter((v) => !disebut.includes(v));
  cek(disebut.every((v) => bagiMandiri(24, v).r === 0) && lupa.opsi.find((o) => o.benar).teks === hilang.join(" dan ") && kaliMandiri(1, 24) === 24, "C: faktor yang terlewat 1 dan 24 (dihitung)");
  cek(lupa.opsi.filter((o) => !o.benar).every((o) => [...o.teks.matchAll(/\d+/g)].every((m) => bagiMandiri(24, Number(m[0])).r > 0)), "C: pengecoh faktor terlewat bukan faktor 24 (dihitung)");
  for (const [d, r] of [[5, 4], [7, 3], [10, 4], [20, 4]]) cek(bagiMandiri(24, d).r === r && lupa.opsi.some((o) => o.umpan.includes(`24 dibagi ${d} bersisa ${r}`)), `C: 24 dibagi ${d} bersisa ${r} di umpan`);
  const posisi = S.adegan.filter((a) => a.jenis === "pilih").map((a) => a.opsi.findIndex((o) => o.benar));
  cek(new Set(posisi).size === posisi.length, `C: letak jawaban pilih bervariasi (${posisi.join("")})`);
}

/* ------------------------------ Misi C ------------------------------ */
{
  const daftar = K5.daftarMisiK5Bab2("C");
  const capai = (aksi) => M0.misiBaru(K5.MISI_C, C.keadaanFaktorK5B2C(jalan(C.awalFaktorK5B2C(), LC, aksi)), new Set());
  const susunSemua = (i, urut) => [{ t: "S_DATA", i }, ...urut.flatMap((r) => [...Array(r).fill({ t: "S_NAIK" }).slice(0, r - 1), { t: "S_SIMPAN" }, ...Array(r - 1).fill({ t: "S_TURUN" })])];
  cek(capai(susunSemua(0, faktorMandiri(12))).join() === "c-dua-belas", "C: semua susunan penuh 12 memenuhi");
  cek(capai(susunSemua(0, faktorMandiri(12).slice(1))).length === 0 && capai(susunSemua(0, faktorMandiri(12).filter((v) => v !== 12))).length === 0, "C: 12 tanpa satu baris atau tanpa 12 baris tidak memenuhi");
  cek(capai(susunSemua(1, faktorMandiri(18))).join() === "c-delapan-belas", "C: semua susunan penuh 18 memenuhi");
  cek(capai(susunSemua(1, faktorMandiri(12).filter((v) => v <= 18))).length === 0, "C: faktor 12 saat bilangannya 18 tidak memenuhi");
  cek(capai(susunSemua(2, faktorMandiri(24))).sort().join() === "c-dua-empat", "C: tantangan semua susunan penuh 24");
  const lima = (i, r) => [{ t: "S_DATA", i }, ...Array(r - 1).fill({ t: "S_NAIK" }), { t: "S_SIMPAN" }];
  cek(capai(lima(2, 5)).join() === "c-lima", "C: 24 titik dalam 5 baris disimpan memenuhi c-lima");
  cek(capai(lima(2, 5).slice(0, -1)).length === 0 && capai(lima(2, 7)).length === 0 && capai(lima(1, 5)).length === 0 && capai(lima(2, 4)).length === 0, "C: tanpa simpan, 7 baris, bilangan lain, atau 4 baris (faktor) tidak memenuhi c-lima");
  const pasangan = (i, n) => {
    const aksi = [{ t: "P_DATA", i }];
    for (let a = 1; a <= akarBawah(n); a += 1) aksi.push({ t: "P_JAWAB", nilai: bagiMandiri(n, a).r === 0 ? bagiMandiri(n, a).q : 0 });
    return aksi;
  };
  cek(capai(pasangan(0, 18)).join() === "c-pasangan", "C: pasangan 18 sampai bertemu memenuhi");
  cek(capai(pasangan(0, 18).slice(0, -1)).length === 0 && capai(pasangan(1, 12)).length === 0, "C: pasangan 18 sampai kandidat 3, atau pasangan 12, tidak memenuhi");
  cek(capai(pasangan(2, 36)).join() === "c-tiga-enam", "C: tantangan pasangan 36");
  const tanda = (i, daftarTanda) => [{ t: "T_DATA", i }, ...daftarTanda.map((v) => ({ t: "T_KLIK", n: v })), { t: "T_CEK" }];
  cek(capai(tanda(0, faktorMandiri(24))).join() === "c-tanda", "C: tanda faktor 24 memenuhi");
  cek(capai(tanda(0, faktorMandiri(24).slice(1))).length === 0 && capai(tanda(0, [...faktorMandiri(24), 5])).length === 0 && capai([...tanda(0, faktorMandiri(24)).slice(0, -1)]).length === 0, "C: tanda tanpa 1, dengan 5, atau tanpa periksa tidak memenuhi");
  cek(capai(tanda(1, faktorMandiri(36))).join() === "c-tanda-tiga-enam", "C: tantangan tanda faktor 36");
  cek(capai(tanda(1, faktorMandiri(24))).length === 0, "C: faktor 24 saat targetnya 36 tidak memenuhi");
  cek(M0.misiBaru(K5.MISI_C, { alat: "jalur", pernah: ["susun:12", "cek:24", "pasangan:18"] }, new Set()).length === 0, "C: riwayat alat lain tidak memenuhi misi C");
  const tampil = M0.tampilMisi(daftar);
  const wajib = tampil.filter((m) => m.wajib).map((m) => m.id);
  cek(wajib.length === 7 && daftar.filter((m) => !m.wajib).length === 3 && !M0.wajibSelesai(tampil, new Set(wajib.slice(0, 6))) && M0.wajibSelesai(tampil, new Set(wajib)), "C: gerbang terbuka hanya setelah tujuh wajib");
  const sel_ = (id) => M0.misiBaru(daftar, sel(id), new Set()).join();
  cek(sel_(K5.ID_MESIN_K5B2.C) === "c-mesin" && sel_(K5.ID_SKENARIO_K5B2.C) === "c-skenario", "C: id mesin dan skenario memenuhi misinya");
}

/* ------------------------------ Konsep C tidak bocor ------------------------------ */
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
  // Sub-Bab C tidak memakai konsep D dan E: faktor persekutuan, FPB, bilangan prima, faktorisasi, pohon faktor, "terbesar".
  const BOCOR_C = /\b(fpb|prima|faktorisasi|pohon|ayakan|eratosthenes|terbesar|persekutuan)\b/i;
  const catat = (teks, apa) => {
    const m = BOCOR_C.exec(teks);
    cek(!m, `C: ${apa} bebas konsep sub-bab berikutnya (${m ? m[0] : ""} di "${String(teks).slice(Math.max(0, (m?.index ?? 0) - 30), (m?.index ?? 0) + 40)}")`);
  };
  for (const t of [TK.MISI_K5B2.C, TK.NAMA_SIM_K5B2.C, ...K5.MISI_C.map((m) => m.teks)]) catat(t, "teks misi");
  catat(teksDari(MS.MESIN_FAKTOR), "mesin");
  catat(teksDari(SK.SKENARIO_K5B2C), "skenario");
  catat(teksDari(ringkas.subBab.C), "peta dan infografis ringkas");
  catat(tanpaKomentar(baca("SimulasiLabFaktorK5B2", "tsx")), "komponen lab (tanpa komentar)");
  catat(tanpaKomentar(baca("model-faktor-k5b2", "tsx")), "model gambar (tanpa komentar)");
  catat(tanpaKomentar(baca("lab-faktor-k5b2c", "ts")), "logika lab (tanpa komentar)");
  for (const p of globalThis.__pesanC) catat(p, "pesan lab dari fuzz");
  const ucapan = [];
  for (let i = 0; i < 3; i += 1) {
    const xs = LC(z0, { t: "S_DATA", i });
    ucapan.push(C.ucapSusunK5B2C(xs), C.ucapSusunK5B2C(LC(xs, { t: "S_NAIK" })));
    const xp = LC(z0, { t: "P_DATA", i });
    ucapan.push(C.ucapPasanganK5B2C(xp));
  }
  for (let i = 0; i < 2; i += 1) ucapan.push(C.ucapTandaK5B2C(LC(z0, { t: "T_DATA", i })), C.ucapTandaK5B2C(LC(LC(z0, { t: "T_DATA", i }), { t: "T_KLIK", n: 3 })));
  cek(ucapan.length === 13 && ucapan.every(tanpaAngka), `semua ${ucapan.length} ucapan lab C dieja menjadi kata`);
  for (const u of ucapan) catat(u, "ucapan lab");

  for (const f of ["SimulasiLabFaktorK5B2", "model-faktor-k5b2"]) {
    const s = baca(f, "tsx");
    cek(!/correct_index|explanation/.test(s), `${f}: tidak memuat correct_index atau explanation`);
    cek(!/fetch\(|XMLHttpRequest|api\/|openai|anthropic|gemini/i.test(s), `${f}: tanpa jaringan atau model bahasa`);
  }
  {
    const s = baca("lab-faktor-k5b2c", "ts");
    cek(!/fetch\(|XMLHttpRequest|from "react"|openai|anthropic|gemini|correct_index|explanation/i.test(s) && (s.match(/^import .+$/gm) ?? []).length === 0, "lab-faktor-k5b2c: murni, tanpa impor");
    const k = baca("SimulasiLabFaktorK5B2", "tsx");
    cek(/useEffect\(\(\) => \{\s*onKeadaan\?\.\(keadaan\w+\(x\)\);\s*\}, \[onKeadaan, x\]\);/.test(k), "lab C: lapor keadaan lewat useEffect");
    cek(/setLihat\(v\);\s*kirim\(\{ t: "PESAN_KOSONG" \}\);/.test(k), "lab C: ganti tampilan mengosongkan pesan");
    const catatan = [...k.matchAll(/^\s*"([^"]+)",$/gm)].map((m) => m[1]);
    cek(catatan.length >= 4 && catatan.every(tanpaAngka), "lab C: Coba ini dapat dieja");
  }

  // Data ringkas C dihitung ulang mandiri.
  const C0 = ringkas.subBab.C;
  const butir = (panel, id) => panel.butir.find((b) => b.id === id);
  const p1 = C0.infografis.panel[0];
  cek(butir(p1, "tepat").visual.isi === `3 × ${bagiMandiri(12, 3).q} = ${kaliMandiri(3, 4)}` && bagiMandiri(12, 3).r === 0, "ringkas C: 12 dalam 3 baris (dihitung)");
  cek(butir(p1, "sisa").visual.isi === `12 ÷ 5 = ${bagiMandiri(12, 5).q} sisa ${bagiMandiri(12, 5).r}`, "ringkas C: 12 dalam 5 baris (dihitung)");
  sama(butir(p1, "baris").visual.baris, [1, 2, 3].map((r) => [`${r} baris`, bagiMandiri(12, r).q]), "ringkas C: titik tiap baris (dihitung)");
  const [fak, buk] = C0.infografis.panel[1].sisi;
  cek(fak.visual.isi === `24 ÷ 8 = ${bagiMandiri(24, 8).q} sisa ${bagiMandiri(24, 8).r}` && buk.visual.isi === `24 ÷ 5 = ${bagiMandiri(24, 5).q} sisa ${bagiMandiri(24, 5).r}` && bagiMandiri(24, 8).r === 0 && bagiMandiri(24, 5).r > 0, "ringkas C: 24 dibagi 8 dan 5 (dihitung)");
  const p3 = C0.infografis.panel[2];
  cek(butir(p3, "dua-belas").visual.isi === faktorMandiri(12).join(", ") && butir(p3, "delapan-belas").visual.isi === faktorMandiri(18).join(", "), "ringkas C: faktor 12 dan 18 (dihitung)");
  cek(butir(p3, "pasangan").visual.isi === pasanganMandiri(18).map(([a, b]) => `${a} × ${b}`).join(", "), "ringkas C: pasangan 18 (dihitung)");
  const kartu = (id) => C0.peta.kartu.find((k) => k.id === id).teks;
  cek(kartu("c-tiga-baris") === `12 titik dalam 3 baris, tepat` && bagiMandiri(12, 3).r === 0 && kartu("c-lima-baris") === `12 titik dalam 5 baris, sisa ${bagiMandiri(12, 5).r}`, "ringkas C: kartu susunan (dihitung)");
  cek(kartu("c-tiga-empat") === `3 × 4 = ${kaliMandiri(3, 4)}` && kartu("c-dua-belas") === `Faktor 12: ${faktorMandiri(12).join(", ")}` && kartu("c-delapan") === `24 ÷ 8 bersisa ${bagiMandiri(24, 8).r}: faktor` && kartu("c-lima") === `24 ÷ 5 bersisa ${bagiMandiri(24, 5).r}: bukan`, "ringkas C: kartu pasangan, daftar, cek (dihitung)");
}

/* ======================================================================== */
/* ============================ SUB-BAB D ================================= */
/* ======================================================================== */
// Hitungan mandiri untuk D: faktor persekutuan dengan keterbagian (pengurangan berulang), FPB dengan Euclid memakai
// pengurangan, dan hasil kali lewat penjumlahan berulang. Lab memakai sisa bagi (%) dan daftar faktor.
const persekutuanMandiri = (a, b) => faktorMandiri(a).filter((d) => adalahKelipatan(b, d));
const fpbMandiri = (a, b) => gcdKurang(a, b);
const fpbBanyak = (daftar) => daftar.reduce((h, v) => gcdKurang(h, v));
const LD = E.langkahBersamaK5B2D;
const w0 = E.awalBersamaK5B2D();
const sebutLagi = (bagian) => (bagian.length < 2 ? bagian.join("") : `${bagian.slice(0, -1).join(", ")} dan ${bagian[bagian.length - 1]}`);

/* ------------------------------ Data sama dengan buku (D) ------------------------------ */
{
  const AB = D.ANGKA_BUKU_DE;
  const buku = D.RONDE_FPB_CD.flat();
  for (const [a, b] of E.DATA_DAFTAR) cek(buku.some((r) => r.angka.join() === `${a},${b}` && r.hasil === fpbMandiri(a, b)), `Daftar ${a} dan ${b}: FPB dari data buku sama dengan hitungan`);
  sama(E.DATA_DAFTAR.map(([a, b]) => fpbMandiri(a, b)), [AB.fpb1218, 1, 4, AB.fpb612], "Daftar: FPB 6, 1, 4, 6");
  sama(E.DATA_BAGI[0].item, [AB.mawarMerah, AB.mawarPutih], "Bagi: 24 mawar merah dan 18 mawar putih dari buku");
  sama(E.DATA_BAGI[1].item, [AB.susu, AB.lolipop, AB.biskuit], "Bagi: 36 susu, 48 lolipop, 24 biskuit dari buku");
  cek(fpbBanyak(E.DATA_BAGI[0].item) === AB.fpbMawar && fpbBanyak(E.DATA_BAGI[1].item) === AB.fpbPaket, "Bagi: FPB 6 dan 12 sama dengan buku (dihitung)");
  cek(D.RONDE_FPB_CD.flat().some((r) => r.angka.join() === "24,18" && r.hasil === 6), "Jembatan: 24 dan 18 dari buku");
  sama(E.DATA_JEMBATAN, [[12, 18], [24, 18], [8, 12]], "Jembatan: 12 dan 18, 24 dan 18, 8 dan 12");
  for (const [a, b] of [[12, 18], [24, 18], [8, 12], [15, 28], [6, 12], [36, 48], [18, 30]]) {
    sama(E.persekutuanFaktor(a, b), persekutuanMandiri(a, b), `faktor persekutuan ${a} dan ${b} sama dengan keterbagian mandiri`);
    cek(E.fpbDari(a, b) === fpbMandiri(a, b) && E.kpkDari(a, b) === kpkMandiri(a, b), `FPB dan KPK ${a} dan ${b} sama dengan Euclid dan pencarian mandiri`);
    cek(kaliMandiri(fpbMandiri(a, b), kpkMandiri(a, b)) === kaliMandiri(a, b), `jembatan ${a} dan ${b}: FPB dikali KPK sama dengan hasil kali (dihitung)`);
  }
  cek(E.kelompokMaks([36, 48, 24]) === 12 && E.kelompokMaks([24, 18]) === 6 && E.kelompokMaks([7, 9]) === 1, "kelompokMaks dari data buku");
}

/* ------------------------------ Lab D: Faktor Bersama ------------------------------ */
{
  cek(w0.pernah.length === 0 && w0.pesan === "" && w0.daftar.tanda.length === 0 && !w0.daftar.tandaOk && w0.bagi.k === 1 && w0.bagi.rata.length === 0 && !w0.jembatan.fpbOk && !w0.jembatan.kpkOk, "D awal: kosong, belum ada riwayat");
  // Daftar.
  for (const [i, [a, b]] of E.DATA_DAFTAR.entries()) {
    const kunci = persekutuanMandiri(a, b);
    const f = fpbMandiri(a, b);
    const k = kpkMandiri(a, b);
    const xd = LD(w0, { t: "F_DATA", i });
    const tandai = (daftar) => jalan(xd, LD, daftar.map((n) => ({ t: "F_KLIK", n })));
    const tepat = LD(tandai(kunci), { t: "F_CEK" });
    cek(tepat.daftar.tandaOk && tepat.pesan.startsWith("✅") && tepat.pesan.includes(kunci.join(", ")), `Daftar ${a} dan ${b}: faktor persekutuan tepat`);
    cek(LD(tandai([...kunci].reverse()), { t: "F_CEK" }).daftar.tandaOk, `Daftar ${a} dan ${b}: urutan tanda tidak berpengaruh`);
    const opsi = E.opsiFpbDaftar(i);
    cek(opsi.length === 3 && new Set(opsi).size === 3 && opsi.filter((v) => v === f).length === 1 && opsi.includes(k) && opsi.includes(a + b), `Daftar ${a} dan ${b}: tiga pilihan, FPB ${f}, pengecoh KPK ${k} dan jumlah`);
    const ok = LD(tepat, { t: "F_FPB", nilai: f });
    cek(ok.pernah.includes(`daftar:${a}:${b}`) && ok.pesan.startsWith("✅") && ok.pesan.includes(String(f)) && (kunci.length === 1 ? /Satu-satunya/.test(ok.pesan) : /Yang terbesar/.test(ok.pesan)), `Daftar ${a} dan ${b}: FPB ${f} tercatat`);
    for (const v of opsi.filter((o) => o !== f)) {
      const s = LD(tepat, { t: "F_FPB", nilai: v });
      cek(s.pernah.length === 0 && !s.pesan.startsWith("✅") && (/adalah KPK/.test(s.pesan) === (v === k)) && (/jumlah dua bilangan/.test(s.pesan) === (v === a + b)), `Daftar ${a} dan ${b}: pilihan ${v} ditolak dan dijelaskan tepat`);
    }
    const dini = LD(tandai(kunci), { t: "F_FPB", nilai: f });
    cek(dini.pernah.length === 0 && /Tandai dulu/.test(dini.pesan), `Daftar ${a} dan ${b}: pilihan sebelum periksa ditolak`);
    cek(!LD(tepat, { t: "F_KLIK", n: 1 }).daftar.tandaOk, `Daftar ${a} dan ${b}: ubah tanda mengulang periksa`);
    // Terlewat.
    for (const m of kunci) {
      const s = LD(tandai(kunci.filter((v) => v !== m)), { t: "F_CEK" });
      cek(!s.daftar.tandaOk && !s.pesan.startsWith("✅") && (kunci.length === 1 ? /Belum ada bilangan/ : /terlewat/).test(s.pesan), `Daftar ${a} dan ${b}: faktor ${m} terlewat ditolak`);
    }
    cek(/1 selalu faktor persekutuan/.test(LD(tandai(kunci.filter((v) => v !== 1)), { t: "F_CEK" }).pesan) || kunci.length === 1, `Daftar ${a} dan ${b}: tanpa 1 dijelaskan`);
    // Kelebihan: faktor yang hanya ada di satu daftar.
    const semua = [...new Set([...faktorMandiri(a), ...faktorMandiri(b)])];
    let tolak = 0;
    let total = 0;
    for (const e of semua.filter((v) => !kunci.includes(v))) {
      total += 1;
      const s = LD(tandai([...kunci, e]), { t: "F_CEK" });
      const di = adalahKelipatan(a, e) ? a : b;
      if (!s.daftar.tandaOk && !s.pesan.startsWith("✅") && s.pesan.startsWith(`${e} hanya faktor ${di}.`)) tolak += 1;
    }
    cek(tolak === total, `Daftar ${a} dan ${b}: semua ${total} faktor yang hanya di satu daftar ditolak dan disebut daftarnya (${tolak})`);
    cek(/Belum ada bilangan/.test(LD(xd, { t: "F_CEK" }).pesan), `Daftar ${a} dan ${b}: kosong diberi tahu`);
    cek(LD(tepat, { t: "F_BERSIH" }).daftar.tanda.length === 0 && LD(LD(xd, { t: "F_KLIK", n: 1 }), { t: "F_KLIK", n: 1 }).daftar.tanda.length === 0, `Daftar ${a} dan ${b}: bersihkan dan ketuk dua kali`);
    cek(LD(tepat, { t: "F_DATA", i: (i + 1) % 4 }).daftar.tanda.length === 0, `Daftar ${a} dan ${b}: ganti pasangan mengosongkan tanda`);
    // Bilangan yang bukan faktor kedua bilangan diabaikan.
    const bukan = Array.from({ length: 40 }, (_, j) => j + 1).find((v) => !adalahKelipatan(a, v) && !adalahKelipatan(b, v));
    cek(LD(xd, { t: "F_KLIK", n: bukan }) === xd && LD(xd, { t: "F_KLIK", n: 0 }) === xd && LD(xd, { t: "F_KLIK", n: 2.5 }) === xd, `Daftar ${a} dan ${b}: bilangan bukan faktor diabaikan`);
  }
  cek(LD(w0, { t: "F_DATA", i: 4 }) === w0 && LD(w0, { t: "F_FPB", nilai: 99 }) === w0, "Daftar: di luar batas diabaikan");

  // Bagi.
  for (const [i, d] of E.DATA_BAGI.entries()) {
    const f = fpbBanyak(d.item);
    const xb = LD(w0, { t: "R_DATA", i });
    const batas = Math.min(...d.item);
    const ke = (x, k) => {
      let s = x;
      while (s.bagi.k < k) s = LD(s, { t: "R_NAIK" });
      while (s.bagi.k > k) s = LD(s, { t: "R_TURUN" });
      return s;
    };
    cek(E.kelompokMaks(d.item) === f, `Bagi ${d.item.join(", ")}: terbanyak ${f} sama dengan Euclid`);
    let ok = true;
    let rataSemua = [];
    for (let k = 1; k <= batas; k += 1) {
      const rata = d.item.every((v) => adalahKelipatan(v, k));
      const s = LD(ke(xb, k), { t: "R_COBA" });
      const gagal = d.item.findIndex((v) => !adalahKelipatan(v, k));
      if (rata) {
        rataSemua.push(k);
        const isi = sebutLagi(d.item.map((v, j) => `${bagiMandiri(v, k).q} ${d.nama[j]}`));
        if (!(s.bagi.rata.includes(k) && s.pesan.startsWith("✅") && s.pesan.includes(`tiap ${d.kelompok} berisi ${isi}`))) ok = false;
      } else {
        const sisa = bagiMandiri(d.item[gagal], k).r;
        if (!(!s.bagi.rata.includes(k) && !s.pesan.startsWith("✅") && s.pesan.includes(`${d.item[gagal]} ${d.nama[gagal]} dibagi ke ${k} ${d.kelompok} bersisa ${sisa}`))) ok = false;
      }
      // Menyatakan terbanyak.
      const p = LD(ke(xb, k), { t: "R_PILIH" });
      if (rata && k === f) {
        if (!(p.pernah.includes(`bagi:${d.item.join(":")}`) && p.pesan.startsWith("✅") && p.pesan.includes(`FPB dari ${sebutLagi(d.item.map(String))}`))) ok = false;
      } else if (rata) {
        if (!(p.pernah.length === 0 && /masih bisa lebih banyak/.test(p.pesan))) ok = false;
      } else if (!(p.pernah.length === 0 && /belum rata/.test(p.pesan))) ok = false;
    }
    cek(ok, `Bagi ${d.item.join(", ")}: tiap banyak 1 sampai ${batas} dicoba dan dinyatakan dengan tepat`);
    sama(rataSemua, faktorMandiri(f), `Bagi ${d.item.join(", ")}: banyak yang rata adalah faktor FPB ${f} (dihitung)`);
    const semua = rataSemua.reduce((s, k) => LD(ke(s, k), { t: "R_COBA" }), xb);
    sama(semua.bagi.rata, rataSemua, `Bagi ${d.item.join(", ")}: daftar yang rata tersimpan terurut`);
    const penuh = ke(xb, batas);
    cek(LD(penuh, { t: "R_NAIK" }).bagi.k === batas && /Paling banyak/.test(LD(penuh, { t: "R_NAIK" }).pesan), `Bagi ${d.item.join(", ")}: paling banyak ${batas}`);
    cek(LD(xb, { t: "R_TURUN" }) === xb, `Bagi ${d.item.join(", ")}: satu adalah batas bawah`);
    cek(LD(semua, { t: "R_DATA", i: (i + 1) % 2 }).bagi.rata.length === 0 && LD(semua, { t: "R_DATA", i: (i + 1) % 2 }).bagi.k === 1, `Bagi ${d.item.join(", ")}: ganti benda mengulang`);
    // Hanya mencoba, belum menyatakan: tidak tercatat.
    cek(!LD(ke(xb, f), { t: "R_COBA" }).pernah.some((p) => p.startsWith("bagi:")), `Bagi ${d.item.join(", ")}: mencoba ${f} saja belum tercatat`);
  }
  cek(LD(w0, { t: "R_DATA", i: 2 }) === w0, "Bagi: benda di luar batas diabaikan");

  // Jembatan.
  for (const [i, [a, b]] of E.DATA_JEMBATAN.entries()) {
    const f = fpbMandiri(a, b);
    const k = kpkMandiri(a, b);
    const xj = LD(w0, { t: "J_DATA", i });
    const of_ = E.opsiFpbJembatan(i);
    const ok_ = E.opsiKpkJ(i);
    cek(of_.length === 3 && new Set(of_).size === 3 && of_.includes(f) && of_.includes(k) && of_.includes(a + b), `Jembatan ${a} dan ${b}: pilihan FPB (FPB, KPK, jumlah)`);
    cek(ok_.length === 3 && new Set(ok_).size === 3 && ok_.includes(k) && ok_.includes(kaliMandiri(a, b)) && ok_.includes(a + b) && kaliMandiri(a, b) !== k, `Jembatan ${a} dan ${b}: pilihan KPK (KPK, hasil kali, jumlah)`);
    for (const v of of_.filter((o) => o !== f)) {
      const s = LD(xj, { t: "J_FPB", nilai: v });
      cek(!s.jembatan.fpbOk && !s.pesan.startsWith("✅") && (/adalah KPK, bukan FPB/.test(s.pesan) === (v === k)), `Jembatan ${a} dan ${b}: FPB ${v} ditolak`);
    }
    for (const v of ok_.filter((o) => o !== k)) {
      const s = LD(xj, { t: "J_KPK", nilai: v });
      cek(!s.jembatan.kpkOk && !s.pesan.startsWith("✅") && (new RegExp(`${v} adalah ${a} × ${b}, bukan KPK`).test(s.pesan) === (v === kaliMandiri(a, b))), `Jembatan ${a} dan ${b}: KPK ${v} ditolak`);
    }
    const fOk = LD(xj, { t: "J_FPB", nilai: f });
    const kOk = LD(xj, { t: "J_KPK", nilai: k });
    cek(fOk.jembatan.fpbOk && !fOk.jembatan.kpkOk && kOk.jembatan.kpkOk && !kOk.jembatan.fpbOk, `Jembatan ${a} dan ${b}: FPB dan KPK dicatat terpisah`);
    // Periksa sebelum keduanya benar.
    for (const s0 of [xj, fOk, kOk]) {
      const s = LD(s0, { t: "J_PERIKSA" });
      cek(s.pernah.length === 0 && /Pilih dulu FPB dan KPK/.test(s.pesan), `Jembatan ${a} dan ${b}: periksa sebelum keduanya benar ditolak`);
    }
    const dua = LD(LD(fOk, { t: "J_KPK", nilai: k }), { t: "J_PERIKSA" });
    cek(dua.pernah.includes(`jembatan:${a}:${b}`) && dua.pesan.startsWith("✅") && dua.pesan.includes(`${f} × ${k} = ${kaliMandiri(f, k)}`) && dua.pesan.includes(`${a} × ${b} = ${kaliMandiri(a, b)}`) && kaliMandiri(f, k) === kaliMandiri(a, b), `Jembatan ${a} dan ${b}: ${f} × ${k} = ${a} × ${b} tercatat`);
    // KPK benar lalu FPB salah tidak mengunci; pilihan ulang FPB salah mencabut izin periksa (riwayat tetap).
    const cabut = LD(LD(fOk, { t: "J_KPK", nilai: k }), { t: "J_FPB", nilai: of_.find((o) => o !== f) });
    cek(!cabut.jembatan.fpbOk && cabut.jembatan.kpkOk, `Jembatan ${a} dan ${b}: FPB salah mencabut izin FPB`);
    cek(!LD(dua, { t: "J_DATA", i: (i + 1) % 3 }).jembatan.fpbOk && LD(dua, { t: "J_DATA", i: (i + 1) % 3 }).pernah.includes(`jembatan:${a}:${b}`), `Jembatan ${a} dan ${b}: ganti pasangan mengulang tanpa mencabut riwayat`);
  }
  cek(LD(w0, { t: "J_FPB", nilai: 99 }) === w0 && LD(w0, { t: "J_KPK", nilai: 99 }) === w0 && LD(w0, { t: "J_DATA", i: 3 }) === w0, "Jembatan: di luar batas diabaikan");

  // Fuzz.
  const acak = acakDari(55);
  let s = w0;
  let ok = true;
  const pesanSemua = new Set();
  const riwayatSemua = new Set();
  for (let i = 0; i < 20000; i += 1) {
    const p = acak(22);
    const [fa, fb] = E.pasanganDaftar(s);
    const kunciF = persekutuanMandiri(fa, fb);
    const belum = kunciF.find((v) => !s.daftar.tanda.includes(v));
    const semuaF = [...new Set([...faktorMandiri(fa), ...faktorMandiri(fb)])];
    const dj = s.jembatan.data;
    const bgi = E.dataBagi(s);
    const fm = fpbBanyak(bgi.item);
    const a =
      p === 0 ? { t: "F_DATA", i: acak(5) } :
      p <= 2 ? { t: "F_KLIK", n: acak(8) === 0 ? 99 : semuaF[acak(semuaF.length)] } :
      p === 3 ? { t: "F_KLIK", n: belum ?? 1 } :
      p === 4 ? (acak(5) === 0 ? { t: "F_BERSIH" } : { t: "F_CEK" }) :
      p === 5 ? { t: "F_CEK" } :
      p === 6 ? { t: "F_FPB", nilai: acak(6) === 0 ? 99 : E.opsiFpbDaftar(s.daftar.data)[acak(3)] } :
      p === 7 ? { t: "R_DATA", i: acak(3) } :
      p <= 10 ? { t: "R_NAIK" } :
      p === 11 ? { t: "R_TURUN" } :
      p === 12 ? { t: "R_COBA" } :
      p === 13 ? { t: "R_PILIH" } :
      p === 14 ? (s.bagi.k < fm ? { t: "R_NAIK" } : { t: "R_PILIH" }) :
      p === 15 ? { t: "J_DATA", i: acak(4) } :
      p === 16 ? { t: "J_FPB", nilai: acak(6) === 0 ? 99 : E.opsiFpbJembatan(dj)[acak(3)] } :
      p === 17 ? { t: "J_KPK", nilai: acak(6) === 0 ? 99 : E.opsiKpkJ(dj)[acak(3)] } :
      p === 18 ? { t: "J_PERIKSA" } :
      p === 19 ? { t: "J_FPB", nilai: fpbMandiri(...E.pasanganJembatan(s)) } :
      p === 20 ? { t: "J_KPK", nilai: kpkMandiri(...E.pasanganJembatan(s)) } :
      acak(40) === 0 ? { t: "RESET" } : { t: "PESAN_KOSONG" };
    const t = LD(s, a);
    if (a.t !== "RESET" && !s.pernah.every((v) => t.pernah.includes(v))) ok = false;
    if (!(t.daftar.data >= 0 && t.daftar.data < 4 && t.bagi.data >= 0 && t.bagi.data < 2 && t.jembatan.data >= 0 && t.jembatan.data < 3)) ok = false;
    const [ta, tb] = E.pasanganDaftar(t);
    if (t.daftar.tanda.some((v, j, w) => !(adalahKelipatan(ta, v) || adalahKelipatan(tb, v)) || (j > 0 && w[j - 1] >= v))) ok = false;
    if (t.daftar.tandaOk && JSON.stringify(t.daftar.tanda) !== JSON.stringify(persekutuanMandiri(ta, tb))) ok = false;
    const bt = E.dataBagi(t);
    if (!(t.bagi.k >= 1 && t.bagi.k <= Math.min(...bt.item))) ok = false;
    if (t.bagi.rata.some((v, j, w) => !bt.item.every((x) => adalahKelipatan(x, v)) || (j > 0 && w[j - 1] >= v))) ok = false;
    if (typeof t.jembatan.fpbOk !== "boolean" || typeof t.jembatan.kpkOk !== "boolean") ok = false;
    for (const id of t.pernah) if (!/^(daftar:(12:18|15:28|8:12|6:12)|bagi:(24:18|36:48:24)|jembatan:(12:18|24:18|8:12))$/.test(id)) ok = false;
    if (t.pesan) pesanSemua.add(t.pesan);
    for (const id of t.pernah) riwayatSemua.add(id);
    s = t;
  }
  cek(ok, "fuzz 20.000 aksi Lab Faktor Bersama: batas terjaga, riwayat tidak dicabut");
  cek(pesanSemua.size > 40 && [...pesanSemua].every(tanpaAngka), `fuzz Lab Faktor Bersama: semua ${pesanSemua.size} pesan dieja menjadi kata`);
  cek(riwayatSemua.size >= 6, `fuzz Lab Faktor Bersama: riwayat terkumpul (${riwayatSemua.size})`);
  globalThis.__pesanD = [...pesanSemua];
}

/* ------------------------------ Mesin D ------------------------------ */
{
  const c0 = MS.MESIN_FPB;
  cek(c0.id === "mesin-fpb-k5b2" && c0.selesaiId === K5.ID_MESIN_K5B2.D, "Mesin FPB: id selesai sesuai misi");
  sama(MS.KASUS_FPB.map((k) => [k.a, k.b]), [[12, 18], [36, 48], [18, 30]], "Mesin FPB: 12 dan 18, 36 dan 48, 18 dan 30");
  for (const [i, k] of MS.KASUS_FPB.entries()) {
    const c = c0.kasus[i];
    const [daftar, fpb, bagi, jembatan] = c.langkah;
    const kunci = persekutuanMandiri(k.a, k.b);
    const f = fpbMandiri(k.a, k.b);
    const kp = kpkMandiri(k.a, k.b);
    cek(daftar.tanya.includes(faktorMandiri(k.a).join(", ")) && daftar.tanya.includes(faktorMandiri(k.b).join(", ")) && Number(daftar.benar) === kunci.length && daftar.opsi.includes(String(kunci.length + 1)) && daftar.opsi.includes(String(kunci.length - 1)), `Mesin FPB ${k.a} dan ${k.b}: ${kunci.length} faktor persekutuan (dihitung)`);
    cek(Number(fpb.benar) === f && fpb.opsi.includes("1") && fpb.opsi.includes(String(kp)) && f !== 1 && f !== kp, `Mesin FPB ${k.a} dan ${k.b}: FPB ${f}; pengecoh 1 dan KPK ${kp}`);
    cek(Number(bagi.benar) === bagiMandiri(k.a, f).q && bagi.tanya.includes(`${k.a} bunga merah`) && bagi.tanya.includes(`${k.b} bunga putih`) && bagi.opsi.includes(String(bagiMandiri(k.b, f).q)) && bagi.opsi.includes(String(2 * bagiMandiri(k.a, f).q)) && new Set(bagi.opsi).size === 3, `Mesin FPB ${k.a} dan ${k.b}: ${bagi.benar} bunga merah tiap vas (dihitung)`);
    cek(Number(jembatan.benar) === kp && jembatan.tanya.includes(`FPB ${k.a} dan ${k.b} adalah ${f}`) && jembatan.tanya.includes(`${k.a} × ${k.b} = ${kaliMandiri(k.a, k.b)}`) && kaliMandiri(f, kp) === kaliMandiri(k.a, k.b) && jembatan.opsi.includes(String(kaliMandiri(k.a, k.b))) && jembatan.opsi.includes(String(k.a + k.b)), `Mesin FPB ${k.a} dan ${k.b}: KPK ${kp} lewat jembatan (dihitung)`);
    cek(EJ.ejaK5B1(c.ringkas).includes(EJ.kataK5B1(f)), `Mesin FPB ${k.a} dan ${k.b}: ringkas dieja dengan FPB benar`);
  }
}

/* ------------------------------ Skenario D ------------------------------ */
{
  const S = SK.SKENARIO_K5B2D;
  cek(S.adegan.length >= 5 && S.adegan.length <= 8, `${S.id}: 5 sampai 8 adegan`);
  cek(S.adegan[0].jenis === "narasi" && S.adegan[S.adegan.length - 1].jenis === "akhir" && new Set(S.adegan.map((a) => a.jenis)).size >= 4, `${S.id}: buka, tutup, empat jenis`);
  const semuaTeks = [];
  for (const a of S.adegan) {
    semuaTeks.push(a.cerita);
    for (const o of a.opsi ?? []) semuaTeks.push(o.teks, o.umpan);
    for (const q of a.soal ?? []) semuaTeks.push(q.teks, ...q.opsi);
    for (const f of ["tanya", "sukses", "salah", "kurang", "lebih"]) if (a[f]) semuaTeks.push(a[f]);
  }
  cek(semuaTeks.every(tanpaAngka), `${S.id}: semua teks dapat dieja`);
  sama(S.id.replace(/-k5b2$/, ""), K5.ID_SKENARIO_K5B2.D, "id skenario D sesuai id misi");
  const adegan = (id) => S.adegan.find((a) => a.id === id);
  const f = fpbMandiri(24, 18);
  const terbesar = adegan("terbesar");
  cek(terbesar.cerita.includes(`Faktor 24: ${faktorMandiri(24).join(", ")}`) && terbesar.cerita.includes(`Faktor 18: ${faktorMandiri(18).join(", ")}`), "D: daftar faktor 24 dan 18 (dihitung)");
  cek(terbesar.opsi.find((o) => o.benar).teks === String(f) && terbesar.opsi.filter((o) => !o.benar).every((o) => adalahKelipatan(24, Number(o.teks)) !== adalahKelipatan(18, Number(o.teks))), "D: yang terbesar di kedua daftar 6; pengecoh hanya di satu daftar (dihitung)");
  const bersama = adegan("bersama");
  const sebut = [...bersama.cerita.matchAll(/\d+/g)].map((m) => Number(m[0])).slice(2);
  sama(sebut, persekutuanMandiri(24, 18), "D: faktor persekutuan 24 dan 18 di cerita");
  cek(bersama.jumlah === persekutuanMandiri(24, 18).length && bersama.sukses.includes(String(f)), "D: banyak faktor persekutuan 4 (dihitung)");
  const merah = adegan("merah");
  cek(merah.target === bagiMandiri(24, f).q && merah.target <= merah.maks && kaliMandiri(f, merah.target) === 24 && merah.cerita.includes(`${f} vas`), "D: 24 mawar merah ke 6 vas, 4 tiap vas (dihitung)");
  const soal = adegan("periksa").soal;
  cek(soal[0].jawaban === String(bagiMandiri(18, f).q) && soal[0].opsi.filter((o) => o !== soal[0].jawaban).every((o) => Number(o) !== bagiMandiri(18, f).q), "D: mawar putih tiap vas 3 (dihitung)");
  cek(soal[1].jawaban === String(f) && soal[1].opsi.includes(String(kpkMandiri(24, 18))) && soal[1].opsi.filter((o) => o !== soal[1].jawaban).every((o) => Number(o) !== f), "D: FPB 24 dan 18 adalah 6, KPK 72 pengecoh (dihitung)");
  cek(soal[2].jawaban === String(fpbBanyak([36, 48, 24])) && soal[2].opsi.filter((o) => o !== soal[2].jawaban).every((o) => Number(o) !== 12), "D: paket terbanyak 12 (dihitung)");
  const dua = adegan("dua-belas");
  const benar = dua.opsi.find((o) => o.benar);
  cek(adalahKelipatan(24, 12) && !adalahKelipatan(18, 12) && bagiMandiri(18, 12).r === 6 && benar.teks === `Salah, 12 bukan faktor 18, sisa ${bagiMandiri(18, 12).r} mawar putih` && dua.opsi.some((o) => !o.benar && o.umpan.includes("18 dibagi 12 bersisa 6")), "D: 12 faktor 24 tetapi bukan faktor 18, sisa 6 (dihitung)");
  const posisi = S.adegan.filter((a) => a.jenis === "pilih").map((a) => a.opsi.findIndex((o) => o.benar));
  cek(new Set(posisi).size === posisi.length, `D: letak jawaban pilih bervariasi (${posisi.join("")})`);
}

/* ------------------------------ Misi D ------------------------------ */
{
  const daftar = K5.daftarMisiK5Bab2("D");
  const capai = (aksi) => M0.misiBaru(K5.MISI_D, E.keadaanBersamaK5B2D(jalan(E.awalBersamaK5B2D(), LD, aksi)), new Set());
  const daftarKe_ = (i, tanda, pilih) => [{ t: "F_DATA", i }, ...tanda.map((n) => ({ t: "F_KLIK", n })), { t: "F_CEK" }, ...(pilih === null ? [] : [{ t: "F_FPB", nilai: pilih }])];
  cek(capai(daftarKe_(0, [1, 2, 3, 6], 6)).join() === "d-daftar", "D: daftar 12 dan 18 memenuhi");
  cek(capai(daftarKe_(0, [1, 2, 3, 6], 36)).length === 0 && capai(daftarKe_(0, [1, 2, 3, 6], 30)).length === 0 && capai(daftarKe_(0, [1, 2, 3, 6], null)).length === 0 && capai(daftarKe_(0, [2, 3, 6], 6)).length === 0 && capai(daftarKe_(0, [1, 2, 3, 4, 6], 6)).length === 0, "D: pilihan KPK atau jumlah, tanpa pilihan, tanda kurang, atau tanda kelebihan tidak memenuhi");
  cek(capai(daftarKe_(1, [1], 1)).join() === "d-satu", "D: daftar 15 dan 28 hanya 1 memenuhi");
  cek(capai(daftarKe_(1, [1, 3], 1)).length === 0 && capai(daftarKe_(1, [1], 420)).length === 0, "D: daftar 15 dan 28 dengan tanda kelebihan atau pilihan 420 tidak memenuhi");
  cek(capai(daftarKe_(2, [1, 2, 4], 4)).join() === "d-delapan", "D: tantangan daftar 8 dan 12");
  cek(capai(daftarKe_(3, [1, 2, 3, 6], 6)).join() === "d-enam", "D: tantangan daftar 6 dan 12");
  cek(capai(daftarKe_(3, [1, 2, 3, 6], 6)).join() !== "d-daftar", "D: daftar 6 dan 12 bukan misi 12 dan 18");
  const bagiKe = (i, k, pilih) => [{ t: "R_DATA", i }, ...Array(k - 1).fill({ t: "R_NAIK" }), ...(pilih ? [{ t: "R_PILIH" }] : [{ t: "R_COBA" }])];
  cek(capai(bagiKe(0, 6, true)).join() === "d-vas", "D: 6 vas dinyatakan terbanyak memenuhi");
  cek(capai(bagiKe(0, 6, false)).length === 0 && capai(bagiKe(0, 3, true)).length === 0 && capai(bagiKe(0, 2, true)).length === 0 && capai(bagiKe(0, 5, true)).length === 0, "D: 6 vas hanya dicoba, atau 3, 2, 5 vas dinyatakan, tidak memenuhi");
  cek(capai(bagiKe(1, 12, true)).join() === "d-paket", "D: 12 paket dinyatakan terbanyak memenuhi");
  cek(capai(bagiKe(1, 6, true)).length === 0 && capai(bagiKe(1, 24, true)).length === 0 && capai(bagiKe(1, 12, false)).length === 0, "D: 6 paket, 24 paket (tidak rata), atau 12 paket hanya dicoba tidak memenuhi");
  const jemKe = (i, f, k, periksa = true) => [{ t: "J_DATA", i }, { t: "J_FPB", nilai: f }, { t: "J_KPK", nilai: k }, ...(periksa ? [{ t: "J_PERIKSA" }] : [])];
  cek(capai(jemKe(0, 6, 36)).join() === "d-jembatan", "D: jembatan 12 dan 18 memenuhi");
  cek(capai(jemKe(0, 36, 36)).length === 0 && capai(jemKe(0, 6, 216)).length === 0 && capai(jemKe(0, 6, 36, false)).length === 0 && capai(jemKe(0, 30, 30)).length === 0, "D: jembatan dengan FPB salah, KPK salah, atau tanpa periksa tidak memenuhi");
  cek(capai(jemKe(1, 6, 72)).join() === "d-jembatan-dua" && capai(jemKe(1, 6, 72)).join() !== "d-jembatan", "D: tantangan jembatan 24 dan 18");
  cek(M0.misiBaru(K5.MISI_D, { alat: "faktor", pernah: ["daftar:12:18", "bagi:24:18", "jembatan:12:18"] }, new Set()).length === 0, "D: riwayat alat lain tidak memenuhi misi D");
  const tampil = M0.tampilMisi(daftar);
  const wajib = tampil.filter((m) => m.wajib).map((m) => m.id);
  cek(wajib.length === 7 && daftar.filter((m) => !m.wajib).length === 3 && !M0.wajibSelesai(tampil, new Set(wajib.slice(0, 6))) && M0.wajibSelesai(tampil, new Set(wajib)), "D: gerbang terbuka hanya setelah tujuh wajib");
  const sel_ = (id) => M0.misiBaru(daftar, sel(id), new Set()).join();
  cek(sel_(K5.ID_MESIN_K5B2.D) === "d-mesin" && sel_(K5.ID_SKENARIO_K5B2.D) === "d-skenario", "D: id mesin dan skenario memenuhi misinya");
}

/* ------------------------------ Konsep D tidak bocor ------------------------------ */
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
  // Sub-Bab D tidak memakai konsep E: bilangan prima, faktorisasi prima, pohon faktor, ayakan, pangkat.
  const BOCOR_D = /\b(prima|faktorisasi|pohon|ayakan|eratosthenes|pangkat)\b/i;
  const catat = (teks, apa) => {
    const m = BOCOR_D.exec(teks);
    cek(!m, `D: ${apa} bebas konsep sub-bab berikutnya (${m ? m[0] : ""} di "${String(teks).slice(Math.max(0, (m?.index ?? 0) - 30), (m?.index ?? 0) + 40)}")`);
  };
  for (const t of [TK.MISI_K5B2.D, TK.NAMA_SIM_K5B2.D, ...K5.MISI_D.map((m) => m.teks)]) catat(t, "teks misi");
  catat(teksDari(MS.MESIN_FPB), "mesin");
  catat(teksDari(SK.SKENARIO_K5B2D), "skenario");
  catat(teksDari(ringkas.subBab.D), "peta dan infografis ringkas");
  catat(tanpaKomentar(baca("SimulasiLabBersamaK5B2", "tsx")), "komponen lab (tanpa komentar)");
  catat(tanpaKomentar(baca("model-bersama-k5b2", "tsx")), "model gambar (tanpa komentar)");
  catat(tanpaKomentar(baca("lab-bersama-k5b2d", "ts")), "logika lab (tanpa komentar)");
  for (const p of globalThis.__pesanD) catat(p, "pesan lab dari fuzz");
  const ucapan = [];
  for (let i = 0; i < 4; i += 1) {
    const xd = LD(w0, { t: "F_DATA", i });
    ucapan.push(E.ucapDaftarK5B2D(xd), E.ucapDaftarK5B2D(LD(xd, { t: "F_KLIK", n: 1 })));
  }
  for (let i = 0; i < 2; i += 1) ucapan.push(E.ucapBagiK5B2D(LD(w0, { t: "R_DATA", i })), E.ucapBagiK5B2D(LD(LD(w0, { t: "R_DATA", i }), { t: "R_NAIK" })));
  for (let i = 0; i < 3; i += 1) ucapan.push(E.ucapJembatanK5B2D(LD(w0, { t: "J_DATA", i })));
  cek(ucapan.length === 15 && ucapan.every(tanpaAngka), `semua ${ucapan.length} ucapan lab D dieja menjadi kata`);
  for (const u of ucapan) catat(u, "ucapan lab");

  for (const f of ["SimulasiLabBersamaK5B2", "model-bersama-k5b2"]) {
    const s = baca(f, "tsx");
    cek(!/correct_index|explanation/.test(s), `${f}: tidak memuat correct_index atau explanation`);
    cek(!/fetch\(|XMLHttpRequest|api\/|openai|anthropic|gemini/i.test(s), `${f}: tanpa jaringan atau model bahasa`);
  }
  {
    const s = baca("lab-bersama-k5b2d", "ts");
    cek(!/fetch\(|XMLHttpRequest|from "react"|openai|anthropic|gemini|correct_index|explanation/i.test(s) && (s.match(/^import .+$/gm) ?? []).length === 0, "lab-bersama-k5b2d: murni, tanpa impor");
    const k = baca("SimulasiLabBersamaK5B2", "tsx");
    cek(/useEffect\(\(\) => \{\s*onKeadaan\?\.\(keadaan\w+\(x\)\);\s*\}, \[onKeadaan, x\]\);/.test(k), "lab D: lapor keadaan lewat useEffect");
    cek(/setLihat\(v\);\s*kirim\(\{ t: "PESAN_KOSONG" \}\);/.test(k), "lab D: ganti tampilan mengosongkan pesan");
    const catatan = [...k.matchAll(/^\s*"([^"]+)",$/gm)].map((m) => m[1]);
    cek(catatan.length >= 4 && catatan.every(tanpaAngka), "lab D: Coba ini dapat dieja");
  }

  // Data ringkas D dihitung ulang mandiri.
  const D0 = ringkas.subBab.D;
  const butir = (panel, id) => panel.butir.find((b) => b.id === id);
  const p1 = D0.infografis.panel[0];
  cek(butir(p1, "dua-belas").visual.isi === faktorMandiri(12).join(", ") && butir(p1, "delapan-belas").visual.isi === faktorMandiri(18).join(", ") && butir(p1, "sama").visual.isi === persekutuanMandiri(12, 18).join(", "), "ringkas D: faktor 12, 18, dan yang sama (dihitung)");
  const [pers, fp] = D0.infografis.panel[1].sisi;
  cek(pers.visual.isi === persekutuanMandiri(12, 18).join(", ") && fp.visual.isi === String(fpbMandiri(12, 18)), "ringkas D: faktor persekutuan dan FPB (dihitung)");
  const p3 = D0.infografis.panel[2];
  sama(butir(p3, "vas").visual.baris, [["merah", bagiMandiri(24, 6).q], ["putih", bagiMandiri(18, 6).q]], "ringkas D: isi tiap vas (dihitung)");
  cek(fpbMandiri(24, 18) === 6 && butir(p3, "jembatan").visual.isi === `6 × ${kpkMandiri(12, 18)} = ${kaliMandiri(6, kpkMandiri(12, 18))}` && butir(p3, "cek").visual.isi === `12 × 18 = ${kaliMandiri(12, 18)}`, "ringkas D: jembatan 6 × 36 = 12 × 18 (dihitung)");
  const kartu = (id) => D0.peta.kartu.find((k) => k.id === id).teks;
  cek(kartu("d-fpb-enam") === `FPB 12 dan 18 adalah ${fpbMandiri(12, 18)}` && kartu("d-bukan-kpk") === `Bukan KPK: KPK 12 dan 18 adalah ${kpkMandiri(12, 18)}`, "ringkas D: kartu FPB dan KPK (dihitung)");
  cek(adalahKelipatan(12, 6) && adalahKelipatan(18, 6) && kartu("d-enam-sama") === "6 faktor 12 dan faktor 18" && adalahKelipatan(12, 4) && !adalahKelipatan(18, 4) && kartu("d-empat-satu") === "4 hanya faktor 12", "ringkas D: 6 di kedua daftar, 4 hanya di 12 (dihitung)");
  cek(kartu("d-enam-vas") === "24 merah, 18 putih: 6 vas" && fpbMandiri(24, 18) === 6 && kartu("d-isi-vas") === `Tiap vas: ${bagiMandiri(24, 6).q} merah dan ${bagiMandiri(18, 6).q} putih`, "ringkas D: kartu bagi rata (dihitung)");
  cek(kartu("d-kali-kecil") === `6 × 36 = ${kaliMandiri(6, 36)}` && kartu("d-kali-besar") === `12 × 18 = ${kaliMandiri(12, 18)}`, "ringkas D: kartu jembatan (dihitung)");
}

/* ======================================================================== */
/* ============================ SUB-BAB E ================================= */
/* ======================================================================== */
// Hitungan mandiri untuk E: bilangan prima dari banyak faktornya (tepat dua), faktorisasi dengan mencari pembagi terkecil
// (keterbagian lewat pengurangan berulang), banyak tiap prima dengan menghitung kemunculan, KPK dan FPB dibandingkan dengan
// pencarian kelipatan dan Euclid. Lab memakai sisa bagi (%) dan perulangan pembagi bilangan prima.
const primaMandiri = (n) => faktorMandiri(n).length === 2;
const urai = (n) => {
  const h = [];
  let sisa = n;
  while (sisa > 1) {
    let d = 2;
    while (!adalahKelipatan(sisa, d)) d += 1;
    h.push(d);
    sisa = bagiMandiri(sisa, d).q;
  }
  return h;
};
const hitungKali = (daftar, p) => daftar.filter((v) => v === p).length;
const kunciMandiri = (a, b, mode) => {
  const ua = urai(a);
  const ub = urai(b);
  const semua = [...new Set([...ua, ...ub])].sort((p, q) => p - q);
  return semua.map((p) => (mode === "kpk" ? Math.max(hitungKali(ua, p), hitungKali(ub, p)) : Math.min(hitungKali(ua, p), hitungKali(ub, p))));
};
const LE = F.langkahPrimaK5B2E;
const v0 = F.awalPrimaK5B2E();
const kaliDaftar = (daftar) => daftar.reduce((h, v) => kaliMandiri(h, v), 1);

/* ------------------------------ Data sama dengan buku (E) ------------------------------ */
{
  const prim = D.RONDE_PRIMA_CE.flat();
  for (const n of F.DATA_PRIMA) cek(prim.some((r) => r.n === n && r.ya === primaMandiri(n)) || n === 15 || n === 49 || n === 1, `Prima ${n}: dari data buku atau contoh buku, ${primaMandiri(n) ? "prima" : "bukan"} (dihitung)`);
  for (const [n, ya] of [[2, true], [1, false], [17, true], [15, false], [29, true], [49, false]]) {
    cek(prim.some((r) => r.n === n && r.ya === ya) && primaMandiri(n) === ya, `data buku: ${n} ${ya ? "prima" : "bukan prima"} sama dengan hitungan`);
  }
  const fz = D.RONDE_FAKTORISASI_CE.flat();
  for (const n of F.DATA_POHON) cek(fz.some((r) => r.n === n && r.teks === urai(n).join(" × ")), `Pohon ${n}: faktorisasi dari data buku sama dengan hitungan (${urai(n).join(" × ")})`);
  const kf = D.RONDE_KPKFPB_CE.flat();
  for (const [a, b] of [[72, 150], [42, 60]]) {
    cek(kf.some((r) => r.a === a && r.b === b && r.jenis === "KPK" && r.hasil === kpkMandiri(a, b)) && kf.some((r) => r.a === a && r.b === b && r.jenis === "FPB" && r.hasil === gcdKurang(a, b)), `data buku: KPK dan FPB ${a} dan ${b} sama dengan hitungan`);
  }
  cek(kf.some((r) => r.a === 27 && r.b === 81 && r.jenis === "KPK" && r.hasil === 81) && kf.some((r) => r.a === 15 && r.b === 28 && r.jenis === "FPB" && r.hasil === 1), "data buku: KPK 27 dan 81, FPB 15 dan 28");
  sama(F.DATA_GABUNG, [[72, 150], [27, 81], [15, 28], [42, 60]], "Gabung: 72 dan 150, 27 dan 81, 15 dan 28, 42 dan 60");
  for (const n of [1, 2, 12, 15, 17, 29, 49, 60, 72, 96, 150, 196, 300]) {
    sama(F.faktorisasiE(n), urai(n), `faktorisasiE(${n}) sama dengan penguraian mandiri`);
    cek(F.adalahPrimaE(n) === primaMandiri(n), `adalahPrimaE(${n}) sama dengan hitungan mandiri`);
    cek(n === 1 || kaliDaftar(F.faktorisasiE(n)) === n, `hasil kali faktorisasi ${n} sama dengan ${n}`);
  }
  for (const [a, b] of F.DATA_GABUNG) {
    for (const mode of ["kpk", "fpb"]) sama(F.kunciGabung(a, b, mode), kunciMandiri(a, b, mode), `kunci ${mode} ${a} dan ${b} sama dengan hitungan mandiri`);
    const nilaiKpk = F.hasilGabung(F.primaGabung(a, b), F.kunciGabung(a, b, "kpk"));
    const nilaiFpb = F.hasilGabung(F.primaGabung(a, b), F.kunciGabung(a, b, "fpb"));
    cek(nilaiKpk === kpkMandiri(a, b) && nilaiFpb === gcdKurang(a, b) && kaliMandiri(nilaiKpk, nilaiFpb) === kaliMandiri(a, b), `KPK ${a} dan ${b} = ${nilaiKpk}, FPB = ${nilaiFpb} sama dengan pencarian dan Euclid, dan jembatan cocok`);
  }
}

/* ------------------------------ Lab E: Pohon Prima ------------------------------ */
{
  cek(v0.pernah.length === 0 && v0.pesan === "" && !v0.prima.cari && v0.prima.ditemukan.length === 0 && v0.pohon.daun.length === 1 && v0.pohon.daun[0] === 12 && v0.pohon.pilih === null && v0.gabung.ambil.every((v) => v === 0), "E awal: kosong, belum ada riwayat");
  // Prima.
  for (const [i, n] of F.DATA_PRIMA.entries()) {
    const faktor = faktorMandiri(n);
    const prima = faktor.length === 2;
    const xp = LE(v0, { t: "P_DATA", i });
    const dini = LE(xp, { t: "P_JAWAB", prima });
    cek(dini.pernah.length === 0 && /Cari dulu/.test(dini.pesan), `Prima ${n}: jawab sebelum mencari faktor ditolak`);
    const xc = LE(xp, { t: "P_CARI" });
    const ok = LE(xc, { t: "P_JAWAB", prima });
    cek(ok.pernah.includes(`prima:${n}`) && ok.pesan.startsWith("✅") && ok.pesan.startsWith(`✅ Tepat! `) && ok.prima.ditemukan.includes(n) === prima, `Prima ${n}: jawaban ${prima ? "prima" : "bukan prima"} tercatat`);
    if (n === 1) cek(/hanya punya satu faktor/.test(ok.pesan) && /bukan bilangan prima/.test(ok.pesan), "Prima 1: dijelaskan hanya satu faktor");
    else if (prima) cek(ok.pesan.includes(`hanya punya dua faktor, 1 dan ${n}`), `Prima ${n}: dijelaskan dua faktor`);
    else cek(ok.pesan.includes(`${faktor.length} faktor: ${faktor.join(", ")}`) && ok.pesan.includes(`${n} = ${faktor[1]} × ${bagiMandiri(n, faktor[1]).q}`) && primaMandiri(faktor[1]), `Prima ${n}: dijelaskan faktor dan penguraian dengan prima terkecil ${faktor[1]}`);
    const salah = LE(xc, { t: "P_JAWAB", prima: !prima });
    cek(salah.pernah.length === 0 && !salah.pesan.startsWith("✅") && salah.pesan.length > 10, `Prima ${n}: jawaban ${!prima ? "prima" : "bukan prima"} ditolak`);
    if (n === 1) cek(/hanya punya satu faktor/.test(salah.pesan), "Prima 1: menjawab prima dijelaskan");
    else if (!prima) cek(salah.pesan.includes(`misalnya ${faktor[1]}`), `Prima ${n}: menjawab prima dijelaskan dengan faktor ${faktor[1]}`);
    else cek(salah.pesan.includes(`hanya punya dua faktor, 1 dan ${n}`), `Prima ${n}: menjawab bukan prima dijelaskan`);
    cek(!LE(xc, { t: "P_DATA", i: (i + 1) % 6 }).prima.cari, `Prima ${n}: ganti bilangan mengulang cari faktor`);
  }
  cek(LE(v0, { t: "P_DATA", i: 6 }) === v0 && LE(v0, { t: "P_DATA", i: -1 }) === v0, "Prima: bilangan di luar batas diabaikan");
  // Hanya jawaban yang salah tidak mengisi riwayat bilangan lain.
  cek(!LE(LE(LE(v0, { t: "P_DATA", i: 2 }), { t: "P_CARI" }), { t: "P_JAWAB", prima: true }).pernah.includes("prima:15") && LE(LE(LE(v0, { t: "P_DATA", i: 2 }), { t: "P_CARI" }), { t: "P_JAWAB", prima: false }).pernah.includes("prima:15"), "Prima 15: hanya jawaban bukan prima yang tercatat");

  // Pohon.
  const bagiMulai = (x, caraBesar) => {
    // Mainkan pohon sampai selesai dengan memilih daun belum prima (pertama atau terakhir) dan membaginya dengan prima.
    let s = x;
    let n = 0;
    while (!s.pohon.daun.every(primaMandiri) && n < 50) {
      n += 1;
      const idx = caraBesar ? s.pohon.daun.map((v, j) => [v, j]).filter(([v]) => !primaMandiri(v)).pop()[1] : s.pohon.daun.findIndex((v) => !primaMandiri(v));
      const v = s.pohon.daun[idx];
      const kandidat = F.PEMBAGI_PRIMA.filter((p) => adalahKelipatan(v, p));
      const p = caraBesar ? kandidat[kandidat.length - 1] : kandidat[0];
      s = LE(LE(s, { t: "O_PILIH", i: idx }), { t: "O_BAGI", p });
    }
    return s;
  };
  for (const [i, n] of F.DATA_POHON.entries()) {
    const xo = LE(v0, { t: "O_DATA", i });
    cek(xo.pohon.daun.length === 1 && xo.pohon.daun[0] === n && LE(xo, { t: "O_BAGI", p: 2 }).pesan.startsWith("Pilih dulu"), `Pohon ${n}: awal satu daun, bagi tanpa memilih ditolak`);
    for (const besar of [false, true]) {
      const s = bagiMulai(xo, besar);
      const harap = urai(n);
      sama([...s.pohon.daun].sort((p, q) => p - q), harap, `Pohon ${n} (${besar ? "prima terbesar" : "prima terkecil"}): daun akhir sama dengan faktorisasi mandiri`);
      cek(s.pernah.includes(`pohon:${n}`) && kaliDaftar(s.pohon.daun) === n && s.pesan.startsWith("✅") && s.pesan.includes(`Semua daun sudah prima: ${n} = ${harap.join(" × ")}`), `Pohon ${n}: tercatat, hasil kali daun ${n}, pesan menyebut faktorisasi`);
    }
    // Setiap langkah menjaga hasil kali, dan riwayat hanya di akhir.
    let s = xo;
    let ok = true;
    let langkah = 0;
    while (!s.pohon.daun.every(primaMandiri) && langkah < 50) {
      langkah += 1;
      if (kaliDaftar(s.pohon.daun) !== n || s.pernah.includes(`pohon:${n}`)) ok = false;
      const idx = s.pohon.daun.findIndex((v) => !primaMandiri(v));
      const v = s.pohon.daun[idx];
      const p = F.PEMBAGI_PRIMA.find((q) => adalahKelipatan(v, q));
      const sebelum = s;
      // Prima yang bukan faktor ditolak dengan sisanya.
      for (const q of F.PEMBAGI_PRIMA.filter((u) => !adalahKelipatan(v, u))) {
        const t = LE(LE(sebelum, { t: "O_PILIH", i: idx }), { t: "O_BAGI", p: q });
        if (JSON.stringify(t.pohon.daun) !== JSON.stringify(sebelum.pohon.daun) || !t.pesan.includes(`${v} dibagi ${q} bersisa ${bagiMandiri(v, q).r}`) || t.pesan.startsWith("✅")) ok = false;
      }
      s = LE(LE(s, { t: "O_PILIH", i: idx }), { t: "O_BAGI", p });
      if (!s.pesan.includes(`${v} = ${p} × ${bagiMandiri(v, p).q}`)) ok = false;
      if (s.pohon.pilih !== null) ok = false;
    }
    cek(ok, `Pohon ${n}: tiap langkah menjaga hasil kali, prima salah ditolak dengan sisanya, riwayat hanya di akhir`);
    // Daun prima tidak dapat dipilih.
    const prm = s.pohon.daun.findIndex(primaMandiri);
    cek(LE(s, { t: "O_PILIH", i: prm }).pohon.pilih === null && /sudah prima/.test(LE(s, { t: "O_PILIH", i: prm }).pesan), `Pohon ${n}: daun prima tidak dapat dipilih`);
    const ul = LE(s, { t: "O_ULANG" });
    cek(ul.pohon.daun.length === 1 && ul.pohon.daun[0] === n && ul.pernah.includes(`pohon:${n}`), `Pohon ${n}: mulai lagi tidak mencabut riwayat`);
    cek(LE(s, { t: "O_DATA", i: (i + 1) % 3 }).pohon.daun.length === 1, `Pohon ${n}: ganti bilangan mengulang`);
    // Pecah sebagian: belum tercatat.
    const separuh = LE(LE(xo, { t: "O_PILIH", i: 0 }), { t: "O_BAGI", p: urai(n)[0] });
    cek(separuh.pernah.length === 0, `Pohon ${n}: satu langkah belum tercatat`);
  }
  cek(LE(v0, { t: "O_PILIH", i: 99 }) === v0 && LE(v0, { t: "O_BAGI", p: 4 }) === v0 && LE(v0, { t: "O_DATA", i: 3 }) === v0, "Pohon: di luar batas diabaikan");

  // Gabung.
  const naikSemua = (x, kunci) => kunci.reduce((s, v, k) => Array.from({ length: v }).reduce((t) => LE(t, { t: "G_NAIK", k }), s), x);
  for (const [i, [a, b]] of F.DATA_GABUNG.entries()) {
    const xg = LE(v0, { t: "G_DATA", i });
    const prm = F.primaGabung(a, b);
    sama(prm, [...new Set([...urai(a), ...urai(b)])].sort((p, q) => p - q), `Gabung ${a} dan ${b}: bilangan prima yang muncul`);
    for (const mode of ["kpk", "fpb"]) {
      const xm = LE(xg, { t: "G_MODE", mode });
      const kunci = kunciMandiri(a, b, mode);
      const lain = kunciMandiri(a, b, mode === "kpk" ? "fpb" : "kpk");
      const nilai = mode === "kpk" ? kpkMandiri(a, b) : gcdKurang(a, b);
      const tepat = LE(naikSemua(xm, kunci), { t: "G_PERIKSA" });
      if (kunci.some((v) => v > 0)) {
        cek(tepat.pernah.includes(`gabung:${a}:${b}:${mode}`) && tepat.pesan.startsWith(`✅ ${mode === "kpk" ? "KPK" : "FPB"} ${a} dan ${b}: `) && tepat.pesan.includes(`= ${nilai}.`), `Gabung ${a} dan ${b} ${mode}: kunci tercatat, hasil ${nilai} (dihitung)`);
      } else {
        cek(tepat.pernah.includes(`gabung:${a}:${b}:fpb`) && /tidak ada faktor prima yang sama, jadi FPB = 1/.test(tepat.pesan) && nilai === 1, `Gabung ${a} dan ${b} fpb: tidak ada prima yang sama, FPB 1 (dihitung)`);
      }
      cek(!tepat.pernah.includes(`gabung:${a}:${b}:${mode === "kpk" ? "fpb" : "kpk"}`) || (mode === "kpk" ? false : false), `Gabung ${a} dan ${b} ${mode}: tidak mencatat mode yang lain`);
      // Satu bilangan prima kurang atau lebih satu: ditolak.
      for (const [k, p] of prm.entries()) {
        for (const delta of [-1, 1]) {
          const target = kunci[k] + delta;
          if (target < 0 || target > Math.max(hitungKaliMandiri(a, p), hitungKaliMandiri(b, p))) continue;
          const ambil = kunci.map((v, j) => (j === k ? target : v));
          const s = LE(naikSemua(xm, ambil), { t: "G_PERIKSA" });
          const beda = ambil.some((v, j) => v !== kunci[j]);
          const salahTertukar = ambil.every((v, j) => v === lain[j]) && lain.some((v, j) => v !== kunci[j]);
          const kosong = ambil.every((v) => v === 0) && kunci.some((v) => v > 0);
          cek(beda && s.pernah.length === 0 && !s.pesan.startsWith("✅") && (kosong || s.pesan.includes(`Faktor prima ${prm[ambil.findIndex((v, j) => v !== kunci[j])]}: muncul`)), `Gabung ${a} dan ${b} ${mode}: prima ${p} diambil ${target} kali (bukan ${kunci[k]}) ditolak`);
          void salahTertukar;
        }
      }
      // Cara yang lain: ditolak dengan penjelasan bila berbeda.
      if (lain.some((v, j) => v !== kunci[j]) && lain.some((v) => v > 0)) {
        const s = LE(naikSemua(xm, lain), { t: "G_PERIKSA" });
        cek(s.pernah.length === 0 && new RegExp(`Itu cara ${mode === "kpk" ? "FPB" : "KPK"}`).test(s.pesan), `Gabung ${a} dan ${b} ${mode}: cara ${mode === "kpk" ? "FPB" : "KPK"} ditolak dan dijelaskan`);
      }
    }
    // Kosong untuk KPK.
    cek(/Belum ada faktor prima/.test(LE(LE(xg, { t: "G_MODE", mode: "kpk" }), { t: "G_PERIKSA" }).pesan), `Gabung ${a} dan ${b}: KPK kosong diberi tahu`);
    // Batas atas dan bawah.
    const ujung = naikSemua(xg, prm.map((p) => Math.max(hitungKaliMandiri(a, p), hitungKaliMandiri(b, p))));
    cek(prm.every((p, k) => LE(ujung, { t: "G_NAIK", k }).gabung.ambil[k] === ujung.gabung.ambil[k]) && /paling banyak/.test(LE(ujung, { t: "G_NAIK", k: 0 }).pesan), `Gabung ${a} dan ${b}: jumlah ambil paling banyak sebanyak yang ada`);
    cek(LE(xg, { t: "G_TURUN", k: 0 }) === xg && LE(xg, { t: "G_NAIK", k: 9 }) === xg && LE(xg, { t: "G_TURUN", k: -1 }) === xg, `Gabung ${a} dan ${b}: aksi di luar batas diabaikan`);
    cek(LE(ujung, { t: "G_MODE", mode: "fpb" }).gabung.ambil.every((v) => v === 0) && LE(ujung, { t: "G_DATA", i: (i + 1) % 4 }).gabung.ambil.every((v) => v === 0) && LE(ujung, { t: "G_MODE", mode: "x" }) === ujung, `Gabung ${a} dan ${b}: ganti cara atau pasangan mengosongkan pilihan`);
  }
  function hitungKaliMandiri(n, p) {
    return hitungKali(urai(n), p);
  }
  cek(LE(v0, { t: "G_DATA", i: 4 }) === v0, "Gabung: pasangan di luar batas diabaikan");

  // Fuzz.
  const acak = acakDari(56);
  let s = v0;
  let ok = true;
  const pesanSemua = new Set();
  const riwayatSemua = new Set();
  for (let i = 0; i < 20000; i += 1) {
    const p = acak(22);
    const nI = F.bilPohon(s);
    const idxNon = s.pohon.daun.findIndex((v) => !primaMandiri(v));
    const [ga, gb] = F.pasanganGabung(s);
    const kunciG = kunciMandiri(ga, gb, s.gabung.mode);
    const kBeda = s.gabung.ambil.findIndex((v, j) => v < kunciG[j]);
    const a =
      p === 0 ? { t: "P_DATA", i: acak(7) } :
      p === 1 ? { t: "P_CARI" } :
      p <= 3 ? { t: "P_JAWAB", prima: acak(2) === 0 } :
      p === 4 ? { t: "P_JAWAB", prima: primaMandiri(F.bilPrima(s)) } :
      p === 5 ? { t: "O_DATA", i: acak(4) } :
      p <= 7 ? { t: "O_PILIH", i: acak(8) === 0 ? 99 : acak(Math.max(1, s.pohon.daun.length)) } :
      p === 8 ? { t: "O_PILIH", i: idxNon >= 0 ? idxNon : 0 } :
      p <= 10 ? { t: "O_BAGI", p: acak(7) === 0 ? 4 : F.PEMBAGI_PRIMA[acak(4)] } :
      p === 11 ? { t: "O_BAGI", p: idxNon >= 0 ? F.PEMBAGI_PRIMA.find((q) => adalahKelipatan(s.pohon.daun[idxNon], q)) ?? 2 : 2 } :
      p === 12 ? (acak(6) === 0 ? { t: "O_ULANG" } : { t: "PESAN_KOSONG" }) :
      p === 13 ? { t: "G_DATA", i: acak(5) } :
      p === 14 ? { t: "G_MODE", mode: acak(8) === 0 ? "x" : acak(2) === 0 ? "kpk" : "fpb" } :
      p <= 16 ? { t: "G_NAIK", k: acak(6) } :
      p === 17 ? { t: "G_TURUN", k: acak(6) } :
      p === 18 ? { t: "G_NAIK", k: kBeda >= 0 ? kBeda : 0 } :
      p <= 20 ? { t: "G_PERIKSA" } :
      acak(40) === 0 ? { t: "RESET" } : { t: "PESAN_KOSONG" };
    void nI;
    const t = LE(s, a);
    if (a.t !== "RESET" && !s.pernah.every((v) => t.pernah.includes(v))) ok = false;
    if (!(t.prima.data >= 0 && t.prima.data < 6 && t.pohon.data >= 0 && t.pohon.data < 3 && t.gabung.data >= 0 && t.gabung.data < 4)) ok = false;
    if (kaliDaftar(t.pohon.daun) !== F.bilPohon(t) || t.pohon.daun.length < 1) ok = false;
    if (t.pohon.pilih !== null && !(t.pohon.pilih >= 0 && t.pohon.pilih < t.pohon.daun.length && !primaMandiri(t.pohon.daun[t.pohon.pilih]))) ok = false;
    const [ta, tb] = F.pasanganGabung(t);
    if (t.gabung.ambil.length !== F.primaGabung(ta, tb).length || t.gabung.ambil.some((v, j) => !Number.isInteger(v) || v < 0 || v > Math.max(hitungKaliMandiri(ta, F.primaGabung(ta, tb)[j]), hitungKaliMandiri(tb, F.primaGabung(ta, tb)[j])))) ok = false;
    if (!["kpk", "fpb"].includes(t.gabung.mode)) ok = false;
    if (t.prima.ditemukan.some((v, j, w) => !primaMandiri(v) || (j > 0 && w[j - 1] >= v))) ok = false;
    for (const id of t.pernah) if (!/^(prima:(17|1|15|49|29|2)|pohon:(12|196|300)|gabung:(72:150|27:81|15:28|42:60):(kpk|fpb))$/.test(id)) ok = false;
    if (t.pesan) pesanSemua.add(t.pesan);
    for (const id of t.pernah) riwayatSemua.add(id);
    s = t;
  }
  cek(ok, "fuzz 20.000 aksi Lab Pohon Prima: batas terjaga, hasil kali daun tetap, riwayat tidak dicabut");
  cek(pesanSemua.size > 40 && [...pesanSemua].every(tanpaAngka), `fuzz Lab Pohon Prima: semua ${pesanSemua.size} pesan dieja menjadi kata`);
  cek(riwayatSemua.size >= 6, `fuzz Lab Pohon Prima: riwayat terkumpul (${riwayatSemua.size})`);
  globalThis.__pesanE = [...pesanSemua];
}

/* ------------------------------ Mesin E ------------------------------ */
{
  const c0 = MS.MESIN_PRIMA;
  cek(c0.id === "mesin-prima-k5b2" && c0.selesaiId === K5.ID_MESIN_K5B2.E, "Mesin Prima: id selesai sesuai misi");
  sama(MS.KASUS_PRIMA.map((k) => [k.a, k.b]), [[72, 150], [42, 60], [27, 81]], "Mesin Prima: 72 dan 150, 42 dan 60, 27 dan 81");
  for (const [i, k] of MS.KASUS_PRIMA.entries()) {
    const c = c0.kasus[i];
    const [prima, pohon, pasangan, hasil] = c.langkah;
    cek(primaMandiri(k.p) && k.c.every((v) => !primaMandiri(v)) && Number(prima.benar) === k.p && prima.opsi.every((o) => o === prima.benar || !primaMandiri(Number(o))) && new Set(prima.opsi).size === 3, `Mesin Prima ${k.a} dan ${k.b}: ${k.p} prima, pengecoh bukan prima (dihitung)`);
    const fa = urai(k.a);
    cek(pohon.benar === fa.join(" × ") && pohon.tanya.includes(`dari ${k.a} `) && kaliDaftar(fa) === k.a, `Mesin Prima ${k.a} dan ${k.b}: faktorisasi ${fa.join(" × ")}`);
    const lainnya = pohon.opsi.filter((o) => o !== pohon.benar).map((o) => o.split(" × ").map(Number));
    cek(lainnya.length === 2 && lainnya.some((d) => kaliDaftar(d) === k.a && d.some((v) => !primaMandiri(v))) && lainnya.some((d) => kaliDaftar(d) !== k.a && d.every(primaMandiri)), `Mesin Prima ${k.a} dan ${k.b}: pengecoh (ada daun belum prima, hasil kali salah)`);
    const ua = urai(k.a);
    const ub = urai(k.b);
    const q = [...new Set(ua)].find((v) => ub.includes(v));
    const ca = hitungKali(ua, q);
    const cb = hitungKali(ub, q);
    cek(Number(pasangan.benar) === Math.max(ca, cb) && pasangan.tanya.includes(`Faktor prima ${q} muncul ${ca} kali di ${k.a} dan ${cb} kali di ${k.b}`) && pasangan.opsi.includes(String(Math.min(ca, cb))) && pasangan.opsi.includes(String(ca + cb)) && new Set(pasangan.opsi).size === 3, `Mesin Prima ${k.a} dan ${k.b}: faktor ${q} diambil ${Math.max(ca, cb)} kali untuk KPK (dihitung)`);
    const f = gcdKurang(k.a, k.b);
    const kp = kpkMandiri(k.a, k.b);
    cek(Number(hasil.benar) === f && hasil.opsi.includes(String(kp)) && hasil.opsi.includes("1") && f !== 1 && hasil.tanya.includes(`${k.a} dan ${k.b}`) && F.hasilGabung(F.primaGabung(k.a, k.b), F.kunciGabung(k.a, k.b, "fpb")) === f, `Mesin Prima ${k.a} dan ${k.b}: FPB ${f} lewat faktor prima; pengecoh KPK ${kp} dan 1`);
    cek(EJ.ejaK5B1(c.ringkas).includes(EJ.kataK5B1(f)) && EJ.ejaK5B1(c.ringkas).includes(EJ.kataK5B1(kp)), `Mesin Prima ${k.a} dan ${k.b}: ringkas dieja dengan FPB dan KPK`);
  }
}

/* ------------------------------ Skenario E (pencapaian bab) ------------------------------ */
{
  const S = SK.SKENARIO_K5B2E;
  cek(S.adegan.length >= 5 && S.adegan.length <= 8, `${S.id}: 5 sampai 8 adegan (ada ${S.adegan.length})`);
  cek(S.adegan[0].jenis === "narasi" && S.adegan[S.adegan.length - 1].jenis === "akhir" && new Set(S.adegan.map((a) => a.jenis)).size >= 4, `${S.id}: buka, tutup, empat jenis`);
  const semuaTeks = [];
  for (const a of S.adegan) {
    semuaTeks.push(a.cerita);
    for (const o of a.opsi ?? []) semuaTeks.push(o.teks, o.umpan);
    for (const q of a.soal ?? []) semuaTeks.push(q.teks, ...q.opsi);
    for (const f of ["tanya", "sukses", "salah", "kurang", "lebih"]) if (a[f]) semuaTeks.push(a[f]);
  }
  cek(semuaTeks.every(tanpaAngka), `${S.id}: semua teks dapat dieja`);
  sama(S.id.replace(/-k5b2$/, ""), K5.ID_SKENARIO_K5B2.E, "id skenario E sesuai id misi");
  const adegan = (id) => S.adegan.find((a) => a.id === id);
  const kel = adegan("kelipatan");
  cek(kel.opsi.find((o) => o.benar).teks === "18" && adalahKelipatan(18, 6) && kel.opsi.filter((o) => !o.benar).every((o) => !adalahKelipatan(Number(o.teks), 6)) && kaliMandiri(6, 3) === 18, "E: 18 kelipatan 6; 16 dan 20 bukan (dihitung)");
  for (const [d, r] of [[16, 4], [20, 2]]) cek(bagiMandiri(d, 6).r === r && kel.opsi.some((o) => o.umpan.includes(`${d} dibagi 6 bersisa ${r}`)), `E: ${d} dibagi 6 bersisa ${r} di umpan`);
  const sama_ = adegan("sama");
  const hariNisa = kelipatanMandiri(6, 36);
  const hariLukas = kelipatanMandiri(9, 36);
  const bersama = biasaMandiri(hariNisa, hariLukas);
  cek(sama_.cerita.includes(`ke-${hariNisa.slice(0, -1).join(", ")}, dan ${hariNisa[hariNisa.length - 1]}`) && sama_.cerita.includes(`ke-${hariLukas.slice(0, -1).join(", ")}, dan ${hariLukas[hariLukas.length - 1]}`) && bersama.join() === "18,36" && sama_.jumlah === bersama.length && sama_.sukses.includes(String(kpkMandiri(6, 9))), "E: hari yang sama dalam 36 hari ada dua, KPK 6 dan 9 adalah 18 (dihitung)");
  cek([...sama_.cerita.matchAll(/\d+/g)].map((m) => Number(m[0])).includes(27) && hariLukas.join() === "9,18,27,36", "E: hari Lukas 9, 18, 27, 36 (dihitung)");
  const fak = adegan("faktor");
  cek(fak.target === faktorMandiri(16).length && fak.target <= fak.maks && fak.sukses.includes(faktorMandiri(16).join(", ").replace(/, ([^,]*)$/, ", dan $1")), "E: faktor 16 ada lima (dihitung)");
  const soal = adegan("periksa").soal;
  cek(soal[0].jawaban === String(gcdKurang(24, 36)) && soal[0].opsi.includes(String(kpkMandiri(24, 36))) && soal[0].opsi.filter((o) => o !== soal[0].jawaban).every((o) => Number(o) !== gcdKurang(24, 36)), "E: FPB 24 dan 36 adalah 12, KPK 72 pengecoh (dihitung)");
  cek(soal[1].jawaban === String(kpkMandiri(6, 9)) && soal[1].opsi.filter((o) => o !== soal[1].jawaban).every((o) => Number(o) !== 18) && soal[1].opsi.includes(String(kaliMandiri(6, 9))), "E: KPK 6 dan 9 adalah 18, hasil kali 54 pengecoh (dihitung)");
  cek(primaMandiri(Number(soal[2].jawaban)) && soal[2].opsi.filter((o) => o !== soal[2].jawaban).every((o) => !primaMandiri(Number(o))), "E: 7 prima; 9 dan 15 bukan (dihitung)");
  const pohon = adegan("pohon");
  const bnr = pohon.opsi.find((o) => o.benar);
  cek(bnr.teks === `Salah, 4 belum prima: 12 = ${urai(12).join(" × ")}` && !primaMandiri(4) && kaliMandiri(3, 4) === 12 && pohon.opsi.some((o) => !o.benar && o.teks === "Benar, 3 × 4 = 12") && pohon.opsi.some((o) => !o.benar && o.teks === "Salah, 12 adalah bilangan prima" && !primaMandiri(12)), "E: faktorisasi prima 12 adalah 2 × 2 × 3, 3 × 4 belum prima (dihitung)");
  const jadwal = adegan("jadwal");
  cek(jadwal.opsi.find((o) => o.benar).teks.startsWith("KPK") && jadwal.opsi.find((o) => o.benar).umpan.includes(String(kpkMandiri(6, 9))), "E: jadwal bertemu lagi memakai KPK, 18 (dihitung)");
  const posisi = S.adegan.filter((a) => a.jenis === "pilih").map((a) => a.opsi.findIndex((o) => o.benar));
  cek(new Set(posisi).size === posisi.length, `E: letak jawaban pilih bervariasi (${posisi.join("")})`);
  // Pencapaian bab: menyentuh konsep sub-bab A sampai E.
  const jelajah = semuaTeks.join(" | ");
  for (const [kata, sub] of [[/kelipatan/i, "A"], [/KPK/, "B"], [/faktor\b/i, "C"], [/FPB/, "D"], [/prima/i, "E"]]) cek(kata.test(jelajah), `E (pencapaian bab): skenario menyentuh konsep Sub-Bab ${sub}`);
}

/* ------------------------------ Misi E ------------------------------ */
{
  const daftar = K5.daftarMisiK5Bab2("E");
  const capai = (aksi) => M0.misiBaru(K5.MISI_E, F.keadaanPrimaK5B2E(jalan(F.awalPrimaK5B2E(), LE, aksi)), new Set());
  const primaKe = (i, jawab, cari = true) => [{ t: "P_DATA", i }, ...(cari ? [{ t: "P_CARI" }] : []), { t: "P_JAWAB", prima: jawab }];
  cek(capai(primaKe(0, true)).join() === "e-prima", "E: 17 prima memenuhi");
  cek(capai(primaKe(0, false)).length === 0 && capai(primaKe(0, true, false)).length === 0, "E: 17 dijawab bukan prima, atau tanpa cari faktor, tidak memenuhi");
  cek(capai(primaKe(1, false)).join() === "e-satu" && capai(primaKe(1, true)).length === 0, "E: 1 bukan prima memenuhi; 1 dijawab prima tidak");
  cek(capai(primaKe(3, false)).join() === "e-empat-sembilan" && capai(primaKe(3, true)).length === 0, "E: tantangan 49 bukan prima");
  cek(capai(primaKe(2, false)).length === 0 && capai(primaKe(4, true)).length === 0, "E: 15 dan 29 bukan misi");
  const pohonKe = (i) => {
    const n = F.DATA_POHON[i];
    const aksi = [{ t: "O_DATA", i }];
    let daun = [n];
    while (!daun.every(primaMandiri)) {
      const idx = daun.findIndex((v) => !primaMandiri(v));
      const p = urai(daun[idx])[0];
      aksi.push({ t: "O_PILIH", i: idx }, { t: "O_BAGI", p });
      daun = [...daun.slice(0, idx), p, bagiMandiri(daun[idx], p).q, ...daun.slice(idx + 1)];
    }
    return aksi;
  };
  cek(capai(pohonKe(1)).join() === "e-pohon", "E: pohon 196 sampai semua daun prima memenuhi");
  cek(capai(pohonKe(1).slice(0, -2)).length === 0 && capai(pohonKe(0)).length === 0 && capai(pohonKe(2)).join() === "e-tiga-ratus", "E: pohon 196 kurang satu langkah, atau pohon 12, tidak memenuhi 196; pohon 300 tantangan");
  const gabungKe = (i, mode) => {
    const [a, b] = F.DATA_GABUNG[i];
    const kunci = kunciMandiri(a, b, mode);
    return [{ t: "G_DATA", i }, { t: "G_MODE", mode }, ...kunci.flatMap((v, k) => Array(v).fill({ t: "G_NAIK", k })), { t: "G_PERIKSA" }];
  };
  cek(capai(gabungKe(0, "kpk")).join() === "e-kpk" && capai(gabungKe(0, "fpb")).join() === "e-fpb", "E: KPK dan FPB 72 dan 150 memenuhi masing-masing");
  cek(capai(gabungKe(0, "kpk").slice(0, -1)).length === 0 && capai([...gabungKe(0, "kpk").slice(0, -2), { t: "G_PERIKSA" }]).length === 0, "E: KPK 72 dan 150 tanpa periksa atau kurang satu faktor tidak memenuhi");
  cek(capai([{ t: "G_DATA", i: 0 }, { t: "G_MODE", mode: "fpb" }, ...kunciMandiri(72, 150, "kpk").flatMap((v, k) => Array(Math.min(v, 3)).fill({ t: "G_NAIK", k })), { t: "G_PERIKSA" }]).length === 0, "E: cara KPK dipakai saat mencari FPB tidak memenuhi");
  cek(capai(gabungKe(1, "kpk")).join() === "e-dua-tujuh" && capai(gabungKe(1, "fpb")).length === 0, "E: tantangan KPK 27 dan 81; FPB 27 dan 81 bukan misi");
  cek(capai(gabungKe(3, "kpk")).length === 0 && capai(gabungKe(2, "fpb")).length === 0, "E: 42 dan 60, 15 dan 28 bukan misi");
  cek(M0.misiBaru(K5.MISI_E, { alat: "bersama", pernah: ["prima:17", "pohon:196", "gabung:72:150:kpk"] }, new Set()).length === 0, "E: riwayat alat lain tidak memenuhi misi E");
  const tampil = M0.tampilMisi(daftar);
  const wajib = tampil.filter((m) => m.wajib).map((m) => m.id);
  cek(wajib.length === 7 && daftar.filter((m) => !m.wajib).length === 3 && !M0.wajibSelesai(tampil, new Set(wajib.slice(0, 6))) && M0.wajibSelesai(tampil, new Set(wajib)), "E: gerbang terbuka hanya setelah tujuh wajib");
  const sel_ = (id) => M0.misiBaru(daftar, sel(id), new Set()).join();
  cek(sel_(K5.ID_MESIN_K5B2.E) === "e-mesin" && sel_(K5.ID_SKENARIO_K5B2.E) === "e-skenario", "E: id mesin dan skenario memenuhi misinya");
  // Semua sub-bab: id mesin dan skenario unik.
  cek(new Set([...Object.values(K5.ID_MESIN_K5B2), ...Object.values(K5.ID_SKENARIO_K5B2)]).size === 10, "id mesin dan skenario kelima sub-bab unik");
}

/* ------------------------------ Teks, kode, dan ringkas E ------------------------------ */
{
  const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas5-bab2-ringkas.json", import.meta.url), "utf8"));
  const baca = (nama, ekstensi) => readFileSync(new URL(`../src/components/modul/${nama}.${ekstensi}`, import.meta.url), "utf8");
  for (const t of [TK.MISI_K5B2.E, TK.NAMA_SIM_K5B2.E, ...K5.MISI_E.map((m) => m.teks)]) cek(tanpaAngka(t), `E: teks misi dapat dieja (${t.slice(0, 30)})`);
  const x = F.awalPrimaK5B2E();
  const ucapan = [];
  for (let i = 0; i < 6; i += 1) ucapan.push(F.ucapPrimaK5B2E(LE(x, { t: "P_DATA", i })));
  for (let i = 0; i < 3; i += 1) ucapan.push(F.ucapPohonK5B2E(LE(x, { t: "O_DATA", i })), F.ucapPohonK5B2E(LE(LE(LE(x, { t: "O_DATA", i }), { t: "O_PILIH", i: 0 }), { t: "O_BAGI", p: 2 })));
  for (let i = 0; i < 4; i += 1) ucapan.push(F.ucapGabungK5B2E(LE(x, { t: "G_DATA", i })), F.ucapGabungK5B2E(LE(LE(x, { t: "G_DATA", i }), { t: "G_MODE", mode: "fpb" })));
  cek(ucapan.length === 20 && ucapan.every(tanpaAngka), `semua ${ucapan.length} ucapan lab E dieja menjadi kata`);
  cek(globalThis.__pesanE.every(tanpaAngka), "pesan lab E hasil fuzz dapat dieja");
  for (const f of ["SimulasiLabPrimaK5B2"]) {
    const s = baca(f, "tsx");
    cek(!/correct_index|explanation/.test(s), `${f}: tidak memuat correct_index atau explanation`);
    cek(!/fetch\(|XMLHttpRequest|api\/|openai|anthropic|gemini/i.test(s), `${f}: tanpa jaringan atau model bahasa`);
    cek(/useEffect\(\(\) => \{\s*onKeadaan\?\.\(keadaan\w+\(x\)\);\s*\}, \[onKeadaan, x\]\);/.test(s), "lab E: lapor keadaan lewat useEffect");
    cek(/setLihat\(v\);\s*kirim\(\{ t: "PESAN_KOSONG" \}\);/.test(s), "lab E: ganti tampilan mengosongkan pesan");
    const catatan = [...s.matchAll(/^\s*"([^"]+)",$/gm)].map((m) => m[1]);
    cek(catatan.length >= 4 && catatan.every(tanpaAngka), "lab E: Coba ini dapat dieja");
  }
  {
    const s = baca("lab-prima-k5b2e", "ts");
    cek(!/fetch\(|XMLHttpRequest|from "react"|openai|anthropic|gemini|correct_index|explanation/i.test(s) && (s.match(/^import .+$/gm) ?? []).length === 0, "lab-prima-k5b2e: murni, tanpa impor");
  }
  // Pembungkus dan registri: semua sub-bab terdaftar, pengeja ejaK5B1 untuk mesin.
  const pembungkus = baca("SimulasiK5Bab2", "tsx");
  cek(/eja=\{ejaK5B1\}/.test(pembungkus) && ["SimulasiLabKelipatanK5B2", "SimulasiLabJalurK5B2", "SimulasiLabFaktorK5B2", "SimulasiLabBersamaK5B2", "SimulasiLabPrimaK5B2"].every((n) => pembungkus.includes(n)), "pembungkus: lima lab, mesin dieja ejaK5B1");
  const coba = [...pembungkus.matchAll(/"([^"]*\?)"/g)].map((m) => m[1]);
  cek(coba.length >= 15 && coba.every(tanpaAngka), `Coba ini mesin kelima sub-bab dapat dieja (${coba.length})`);
  const registri = readFileSync(new URL("../src/components/modul/registri-simulasi.ts", import.meta.url), "utf8");
  cek(/"mtk-5-bab2": SimulasiK5Bab2Materi,/.test(registri) && /"mtk-5-bab2": misiAwalK5Bab2,/.test(registri) && /"mtk-5-bab2": ringkasK5B2\.subBab as unknown as Record<string, RingkasSub>,/.test(registri), "registri-simulasi: mtk-5-bab2 terdaftar di tiga peta");
  cek(/import \{ misiAwalK5Bab2 \} from "@\/components\/modul\/misi-teks-k5b2";/.test(registri) && /import ringkasK5B2 from "@\/data\/kelas5-bab2-ringkas\.json";/.test(registri) && /dynamic<SimulasiMateriProps>\(\(\) => import\("@\/components\/modul\/SimulasiK5Bab2"\), \{ ssr: false \}\)/.test(registri), "registri-simulasi: impor teks misi, JSON ringkas, dan komponen malas");
  cek(!registri.includes("\n") || registri.split("\r\n").length === registri.split("\n").length, "registri-simulasi: akhir baris CRLF konsisten");
  const peta = readFileSync(new URL("../naskah/igil-module-player-peta.md", import.meta.url), "utf8");
  cek(/Kelas 5: Bab 2 sudah \(`SimulasiK5Bab2`, lima sub-bab/.test(peta), "peta pemutar: Kelas 5 Bab 2 tercatat");

  // Data ringkas E dihitung ulang mandiri.
  const E0 = ringkas.subBab.E;
  const butir = (panel, id) => panel.butir.find((b) => b.id === id);
  const p1 = E0.infografis.panel[0];
  cek(butir(p1, "prima").visual.isi === `17: ${faktorMandiri(17).join(", ")}` && primaMandiri(17) && butir(p1, "bukan").visual.isi === `49 = ${urai(49).join(" × ")}` && !primaMandiri(49) && butir(p1, "satu").visual.isi === `1: ${faktorMandiri(1).join(", ")}` && !primaMandiri(1), "ringkas E: 17 prima, 49 = 7 × 7, 1 hanya satu faktor (dihitung)");
  const p2 = E0.infografis.panel[1];
  cek(butir(p2, "dua-belas").visual.isi === `12 = ${urai(12).join(" × ")}` && butir(p2, "seratus").visual.isi === `196 = ${urai(196).join(" × ")}` && butir(p2, "tiga-ratus").visual.isi === `300 = ${urai(300).join(" × ")}`, "ringkas E: faktorisasi 12, 196, 300 (dihitung)");
  const [kp, fp] = E0.infografis.panel[2].sisi;
  const prm = F.primaGabung(72, 150);
  cek(kp.visual.isi === `${F.teksGabung(prm, kunciMandiri(72, 150, "kpk"))} = ${kpkMandiri(72, 150)}` && fp.visual.isi === `${F.teksGabung(prm, kunciMandiri(72, 150, "fpb"))} = ${gcdKurang(72, 150)}`.replace(/ = 6$/, " = 6"), "ringkas E: KPK dan FPB 72 dan 150 dari faktor prima (dihitung)");
  const kartu = (id) => E0.peta.kartu.find((k) => k.id === id).teks;
  cek(kartu("e-tujuh-belas") === `17 hanya punya faktor 1 dan 17` && faktorMandiri(17).join() === "1,17" && kartu("e-satu") === "1 bukan bilangan prima" && !primaMandiri(1), "ringkas E: kartu prima (dihitung)");
  cek(kartu("e-dua-belas") === `12 = ${urai(12).join(" × ")}` && kartu("e-seratus") === `196 = ${urai(196).join(" × ")}`, "ringkas E: kartu pohon (dihitung)");
  cek(kartu("e-kpk-prima") === `KPK 72 dan 150 = ${kpkMandiri(72, 150)}` && kartu("e-fpb-prima") === `FPB 72 dan 150 = ${gcdKurang(72, 150)}`, "ringkas E: kartu KPK dan FPB (dihitung)");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
