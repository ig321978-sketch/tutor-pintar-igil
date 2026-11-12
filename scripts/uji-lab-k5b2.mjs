// Uji Simulasi Kelas 5 Bab 2 (KPK dan FPB): Lab Lompat Kelipatan (Sub-Bab A), Lab Dua Jalur (Sub-Bab B), mesin, skenario,
// misi, gerbang, data ringkas, dan konsep sub-bab berikutnya tidak bocor ke sub-bab sebelumnya.
// Jalankan: node --no-warnings scripts/uji-lab-k5b2.mjs
import { readFileSync } from "node:fs";
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K5 from "../src/components/modul/misi-k5bab2.ts";
import * as TK from "../src/components/modul/misi-teks-k5b2.ts";
import * as A from "../src/components/modul/lab-kelipatan-k5b2a.ts";
import * as B from "../src/components/modul/lab-jalur-k5b2b.ts";
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
  const huruf = ["A", "B"];
  sama(Object.keys(TK.MISI_K5B2), huruf, "teks misi untuk A dan B");
  sama(Object.keys(TK.NAMA_SIM_K5B2), huruf, "nama simulasi untuk A dan B");
  cek(TK.hurufK5B2("Z") === "A" && TK.hurufK5B2("A") === "A", "huruf tak dikenal jatuh ke A");
  cek(["A", "B"].every((h) => TK.misiAwalK5Bab2(h).startsWith("Simulasi 1. Misi: ") && tanpaAngka(TK.misiAwalK5Bab2(h))), "misi awal dan dapat dieja");
  for (const h of huruf) {
    const daftar = K5.daftarMisiK5Bab2(h);
    cek(daftar.filter((m) => m.wajib).length === 7 && daftar.filter((m) => !m.wajib).length === 3, `${h}: tujuh misi wajib dan tiga tantangan bebas`);
    cek(new Set(daftar.map((m) => m.id)).size === 10 && daftar.every((m) => m.id.startsWith(`${h.toLowerCase()}-`)), `${h}: id misi unik berawalan huruf`);
    const kosong = [{ alat: "kelipatan", pernah: [] }, { alat: "jalur", pernah: [] }, sel("tidak-ada"), A.keadaanKelipatanK5B2A(A.awalKelipatanK5B2A()), B.keadaanJalurK5B2B(B.awalJalurK5B2B())];
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
  sama(Object.keys(ringkas.subBab), ["A", "B"], "ringkas: sub-bab A dan B");
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
  // Kode bersama dan Sub-Bab A juga bebas dari konsep C sampai E (tanpa komentar).
  catat(tanpaKomentar(baca("SimulasiK5Bab2", "tsx")), "pembungkus (tanpa komentar)");
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

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
