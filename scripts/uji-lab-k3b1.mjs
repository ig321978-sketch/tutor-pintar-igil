// Uji logika murni dan misi Matematika Kelas 3 Bab 1 (Bilangan Cacah sampai 1.000): Lab Papan Tempat, Lab Urut,
// Lab Susun, Lab Kelompok, Mesin Bertahap (enam definisi), dan misi per sub-bab.
// Jalankan: node --no-warnings scripts/uji-lab-k3b1.mjs
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K3 from "../src/components/modul/misi-k3bab1.ts";
import * as T from "../src/components/modul/lab-tempat-k3b1.ts";
import * as U from "../src/components/modul/lab-urut-k3b1.ts";
import * as S from "../src/components/modul/lab-susun-k3b1.ts";
import * as K from "../src/components/modul/lab-kelompok-k3b1.ts";
import * as ME from "../src/components/modul/mesin-bertahap-k3b1.ts";
import * as MD from "../src/components/modul/mesin-data-k3b1.ts";
import { NamaBilangan } from "../src/components/modul/data-k2.ts";

let gagal = 0;
let lulus = 0;
const cek = (kondisi, pesan) => {
  if (kondisi) lulus += 1;
  else {
    gagal += 1;
    console.log("GAGAL:", pesan);
  }
};
const sama = (a, b, pesan) => cek(JSON.stringify(a) === JSON.stringify(b), `${pesan}: ${JSON.stringify(a)} != ${JSON.stringify(b)}`);
const kosong = new Set();

/* ------------------------------ Nama bilangan ------------------------------ */
{
  let beda = 0;
  for (let n = 0; n <= 999; n += 1) {
    const a = T.kataBilangan(n);
    if (a !== MD.kataBil(n)) beda += 1;
    if (a !== NamaBilangan(n).toLowerCase()) beda += 1;
  }
  cek(beda === 0, `kataBilangan, kataBil, dan NamaBilangan sama untuk 0..999 (selisih ${beda})`);
  sama(T.kataBilangan(671), "enam ratus tujuh puluh satu", "671");
  sama(T.kataBilangan(160), "seratus enam puluh", "160");
  sama(T.kataBilangan(703), "tujuh ratus tiga", "703");
  sama(T.kataBilangan(900), "sembilan ratus", "900");
  sama(T.kataBilangan(405), "empat ratus lima", "405");
  sama(T.kataBilangan(110), "seratus sepuluh", "110");
  sama(T.kataBilangan(212), "dua ratus dua belas", "212");
  sama(T.kataBilangan(1000), "seribu", "1000");
  sama(T.ejaK3("23 + 16 = 39"), "dua puluh tiga ditambah enam belas sama dengan tiga puluh sembilan", "eja tambah");
  sama(T.ejaK3("45 − 19 = 26"), "empat puluh lima dikurangi sembilan belas sama dengan dua puluh enam", "eja kurang");
  sama(T.ejaK3("5 × 6 = 30"), "lima dikali enam sama dengan tiga puluh", "eja kali");
  sama(T.ejaK3("15 : 3 = 5"), "lima belas dibagi tiga sama dengan lima", "eja bagi");
  sama(T.ejaK3("339 < 421"), "tiga ratus tiga puluh sembilan kurang dari empat ratus dua puluh satu", "eja kurang dari");
  sama(T.ejaK3("583 > 529"), "lima ratus delapan puluh tiga lebih dari lima ratus dua puluh sembilan", "eja lebih dari");
}

/* ------------------------------- Lab Papan Tempat ------------------------------- */
const tp = (x, ...a) => a.reduce((s, ak) => T.langkahTempat(s, ak), x);
const ulangT = (x, ak, n) => {
  let s = x;
  for (let i = 0; i < n; i += 1) s = T.langkahTempat(s, ak);
  return s;
};
/** Susun papan rapi menjadi bilangan n lewat tombol tambah dan kurang. */
function buatT(x, n) {
  const d = T.digitDari(n);
  let s = x;
  for (const t of ["r", "p", "s"]) while (s[t] > d[t]) s = T.langkahTempat(s, { t: "UBAH", tempat: t, d: -1 });
  for (const t of ["r", "p", "s"]) while (s[t] < d[t]) s = T.langkahTempat(s, { t: "UBAH", tempat: t, d: 1 });
  return s;
}
function buatM(x, n) {
  const d = T.digitDari(n);
  let s = x;
  for (const t of ["r", "p", "s"]) {
    while (s.m[t] > d[t]) s = T.langkahTempat(s, { t: "UBAH_M", tempat: t, d: -1 });
    while (s.m[t] < d[t]) s = T.langkahTempat(s, { t: "UBAH_M", tempat: t, d: 1 });
  }
  return s;
}
const nyala = (x, rep) => T.langkahTempat(x, { t: "TOGGLE", rep });
const kT = (x) => T.keadaanTempat(x);

{
  const a = T.awalTempat();
  cek(T.nilaiTempat(a) === 0 && T.rapiTempat(a), "papan awal kosong dan rapi");
  cek(Object.values(a.tampil).every((v) => !v), "semua perwakilan mati di awal");

  // Tukar sepuluh satuan menjadi satu puluhan.
  let s = ulangT(a, { t: "UBAH", tempat: "s", d: 1 }, 10);
  cek(T.nilaiTempat(s) === 10 && !T.rapiTempat(s) && s.s === 10, "sepuluh satuan belum rapi");
  cek(T.kalimatTempat(s).includes("belum rapi"), "papan tidak rapi diberi tahu");
  const t = T.langkahTempat(s, { t: "TUKAR_NAIK", dari: "s" });
  cek(t.p === 1 && t.s === 0 && T.rapiTempat(t) && T.nilaiTempat(t) === 10 && t.tukarSP, "10 satuan jadi 1 puluhan, nilai tetap");
  sama(T.langkahTempat(a, { t: "TUKAR_NAIK", dari: "s" }).tukarSP, false, "tukar tanpa sepuluh satuan ditolak");
  cek(T.langkahTempat(a, { t: "TUKAR_NAIK", dari: "s" }).pesan.length > 5, "penolakan tukar diberi alasan");
  // Pecah puluhan menjadi satuan dan ratusan menjadi puluhan.
  const u = T.langkahTempat(tp(a, { t: "UBAH", tempat: "p", d: 1 }), { t: "TUKAR_TURUN", dari: "p" });
  cek(u.p === 0 && u.s === 10 && T.nilaiTempat(u) === 10, "1 puluhan jadi 10 satuan");
  const v = T.langkahTempat(tp(a, { t: "UBAH", tempat: "r", d: 1 }), { t: "TUKAR_TURUN", dari: "r" });
  cek(v.r === 0 && v.p === 10 && T.nilaiTempat(v) === 100, "1 ratusan jadi 10 puluhan");
  const w = T.langkahTempat(v, { t: "TUKAR_NAIK", dari: "p" });
  cek(w.r === 1 && w.p === 0 && w.tukarPR, "10 puluhan jadi 1 ratusan");
  cek(T.langkahTempat(a, { t: "TUKAR_TURUN", dari: "r" }).pesan.length > 5, "tidak ada ratusan untuk dipecah");

  // Batas.
  const maks = buatT(a, 999);
  cek(T.nilaiTempat(maks) === 999, "bisa membuat 999");
  const lebih = T.langkahTempat(maks, { t: "UBAH", tempat: "s", d: 1 });
  cek(T.nilaiTempat(lebih) === 999 && lebih.pesan.length > 5, "lebih dari 999 ditolak");
  cek(T.langkahTempat(a, { t: "UBAH", tempat: "r", d: -1 }).pesan.length > 5, "kurang dari nol ditolak");
  cek(T.langkahTempat(buatT(a, 900), { t: "UBAH", tempat: "r", d: 1 }).r === 9, "ratusan paling banyak 9");
  sama(T.langkahTempat(a, { t: "UBAH_M", tempat: "r", d: -1 }).m, { r: 0, p: 0, s: 0 }, "pembanding tidak di bawah nol");
  sama(T.langkahTempat(buatM(a, 999), { t: "UBAH_M", tempat: "s", d: 1 }).m, { r: 9, p: 9, s: 9 }, "pembanding paling banyak 9");

  // Uraian dan banding.
  sama(T.uraiBilangan(251), "200 + 50 + 1", "uraian 251");
  sama(T.uraiBilangan(602), "600 + 0 + 2", "uraian 602");
  sama(T.uraiBilangan(805), "800 + 0 + 5", "uraian 805");
  for (let n = 0; n <= 999; n += 1) {
    const d = T.digitDari(n);
    cek(T.nilaiTempat(d) === n, `digitDari/nilai ${n}`);
    cek(T.satuAngka(n) === (n > 0 && /^[1-9]0*$/.test(String(n))), `satuAngka ${n}`);
  }
  for (const [n, m, e] of [[339, 421, "ratusan"], [583, 529, "puluhan"], [769, 761, "satuan"], [804, 804, "sama"], [45, 78, "puluhan"], [5, 7, "satuan"], [100, 200, "ratusan"], [0, 0, "sama"]]) {
    sama(T.tempatBeda(n, m), e, `tempat beda ${n} dan ${m}`);
  }
  // Tempat beda cocok dengan perbandingan teks nol-depan, dan relasi cocok dengan bilangan.
  for (let n = 0; n <= 999; n += 37) {
    for (let m = 0; m <= 999; m += 41) {
      const pa = String(n).padStart(3, "0");
      const pb = String(m).padStart(3, "0");
      let i = 0;
      while (i < 3 && pa[i] === pb[i]) i += 1;
      const hrp = i === 3 ? "sama" : ["ratusan", "puluhan", "satuan"][i];
      if (T.tempatBeda(n, m) !== hrp) cek(false, `tempatBeda ${n}/${m}`);
      const rel = n > m ? ">" : n < m ? "<" : "=";
      if (T.relasiTempat(n, m) !== rel) cek(false, `relasi ${n}/${m}`);
      // Bilangan yang tempat penentunya lebih kiri selalu menentukan urutan.
      if (i < 3 && (pa[i] > pb[i]) !== (n > m)) cek(false, `tempat penentu konsisten ${n}/${m}`);
    }
  }
  cek(T.relasiTempat(339, 421) === "<" && T.kataRelasiTempat(339, 421) === "kurang dari", "339 kurang dari 421");

  // Fuzz: invarian papan.
  let seed = 12345;
  const acak = (n) => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed % n;
  };
  let ok = true;
  for (let ulang = 0; ulang < 400 && ok; ulang += 1) {
    let x = T.awalTempat();
    for (let i = 0; i < 80; i += 1) {
      const j = acak(10);
      const tempat = ["r", "p", "s"][acak(3)];
      const d = acak(2) === 0 ? 1 : -1;
      const sebelum = T.nilaiTempat(x);
      let ak;
      if (j < 5) ak = { t: "UBAH", tempat, d };
      else if (j === 5) ak = { t: "TUKAR_NAIK", dari: ["s", "p"][acak(2)] };
      else if (j === 6) ak = { t: "TUKAR_TURUN", dari: ["p", "r"][acak(2)] };
      else if (j === 7) ak = { t: "UBAH_M", tempat, d };
      else ak = { t: "TOGGLE", rep: ["kata", "garis", "nilai", "banding"][acak(4)] };
      x = T.langkahTempat(x, ak);
      const n = T.nilaiTempat(x);
      if (n < 0 || n > 999 || x.r < 0 || x.r > 9 || x.p < 0 || x.p > 19 || x.s < 0 || x.s > 19) ok = false;
      if (ak.t === "TUKAR_NAIK" || ak.t === "TUKAR_TURUN") if (n !== sebelum) ok = false;
      for (const t of ["r", "p", "s"]) if (x.m[t] < 0 || x.m[t] > 9) ok = false;
      if (!x.pernahNilai.every((v, k, arr) => T.satuAngka(v) && (k === 0 || arr[k - 1] < v))) ok = false;
      if (kT(x).n !== n || kT(x).rapi !== T.rapiTempat(x)) ok = false;
    }
  }
  cek(ok, "fuzz papan tempat: nilai 0..999, batas tempat, tukar menjaga nilai, riwayat rapi");

  // Riwayat bilangan satu angka hanya saat Nilai menyala dan papan rapi.
  let r = buatT(T.awalTempat(), 600);
  cek(r.pernahNilai.length === 0, "tanpa Nilai, riwayat tidak dicatat");
  r = nyala(r, "nilai");
  cek(r.pernahNilai.includes(600), "menyalakan Nilai saat 600 mencatatnya");
  cek(!buatT(nyala(T.awalTempat(), "nilai"), 251).pernahNilai.includes(251), "bilangan beberapa angka tidak dicatat");
}

/* ------------------------------- Lab Urut ------------------------------- */
const ur = (x, ...a) => a.reduce((s, ak) => U.langkahUrut(s, ak), x);
function urutkan(x, arah) {
  let s = x.arah === arah ? x : U.langkahUrut(x, { t: "ARAH", arah });
  for (let i = 0; i < s.kartu.length; i += 1) {
    // pilih elemen yang seharusnya di posisi i
    const sasaran = [...s.kartu].sort((a, b) => (arah === "naik" ? a - b : b - a))[i];
    const j = s.kartu.indexOf(sasaran);
    if (j !== i) s = ur(s, { t: "KETUK", i }, { t: "KETUK", i: j });
  }
  return s;
}
{
  cek(U.HIMPUNAN_URUT.length === 4, "empat himpunan kartu");
  for (const [k, h] of U.HIMPUNAN_URUT.entries()) {
    cek(h.length === 5 && new Set(h).size === 5, `himpunan ${k}: lima bilangan berbeda`);
    cek(h.every((n) => n >= 100 && n <= 999), `himpunan ${k}: bilangan tiga angka`);
    cek(!U.sudahUrut(h, "naik") && !U.sudahUrut(h, "turun"), `himpunan ${k}: mulai tidak urut`);
  }
  const a = U.awalUrut();
  cek(!U.keadaanUrut(a).urut && !a.pernahNaik && !a.pernahTurun && a.selesaiHimpunan.length === 0, "lab urut awal belum urut");
  // Tukar dua kartu.
  const t = ur(a, { t: "KETUK", i: 0 }, { t: "KETUK", i: 1 });
  sama([t.kartu[0], t.kartu[1]], [a.kartu[1], a.kartu[0]], "ketuk dua kartu menukar letak");
  cek(t.pilih === null && t.tukar === 1, "pilihan dilepas setelah menukar");
  cek(ur(a, { t: "KETUK", i: 2 }, { t: "KETUK", i: 2 }).pilih === null, "ketuk kartu sama membatalkan pilihan");
  // Semua himpunan bisa diurutkan naik dan turun dengan penukaran.
  for (let k = 0; k < 4; k += 1) {
    let s = ur(a, { t: "HIMPUNAN", k });
    cek(s.himpunan === k && s.tukar === 0, `ganti ke himpunan ${k}`);
    s = urutkan(s, "naik");
    cek(U.keadaanUrut(s).urut && s.pernahNaik && !s.pernahTurun, `himpunan ${k}: urut naik tercapai`);
    s = urutkan(s, "turun");
    cek(U.keadaanUrut(s).urut && s.pernahTurun, `himpunan ${k}: urut turun tercapai`);
    cek([...s.kartu].sort((x, y) => y - x).join() === s.kartu.join(), `himpunan ${k}: benar urut turun`);
  }
  // Mengganti arah saat sudah urut naik tidak otomatis urut turun.
  let s = urutkan(a, "naik");
  const balik = ur(s, { t: "ARAH", arah: "turun" });
  cek(!U.keadaanUrut(balik).urut, "urut naik bukan urut turun");
  // Dua himpunan.
  s = urutkan(a, "naik");
  s = ur(s, { t: "HIMPUNAN", k: 1 });
  s = urutkan(s, "naik");
  cek(U.keadaanUrut(s).himpunanSelesai === 2, "dua himpunan selesai tercatat");
  // Penentu.
  sama(U.penentuUrut(720, 639), "ratusan", "penentu 720 639");
  sama(U.penentuUrut(583, 529), "puluhan", "penentu 583 529");
  sama(U.penentuUrut(239, 231), "satuan", "penentu 239 231");
  sama(U.penentuUrut(5, 5), "sama", "penentu sama");
  // Fuzz: kartu selalu permutasi.
  let seed = 7;
  const acak = (n) => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed % n;
  };
  let ok = true;
  for (let ulang = 0; ulang < 300; ulang += 1) {
    let x = U.awalUrut();
    for (let i = 0; i < 60; i += 1) {
      const j = acak(8);
      x = U.langkahUrut(x, j < 6 ? { t: "KETUK", i: acak(5) } : j === 6 ? { t: "ARAH", arah: acak(2) ? "naik" : "turun" } : { t: "HIMPUNAN", k: acak(4) });
      if ([...x.kartu].sort((p, q) => p - q).join() !== [...U.HIMPUNAN_URUT[x.himpunan]].sort((p, q) => p - q).join()) ok = false;
    }
  }
  cek(ok, "fuzz lab urut: kartu selalu permutasi himpunannya");
}

/* ------------------------------- Lab Susun ------------------------------- */
const sk = (x, ...a) => a.reduce((s, ak) => S.langkahSusun(s, ak), x);
const BAG = ["ap", "as", "bp", "bs"];
/** Susun digit menuju target tanpa pernah melanggar aturan: kurangi dulu (b lebih dulu pada pengurangan), lalu naikkan. */
function jalanS(mode, tgt, tampil = []) {
  let s = S.awalSusun(mode);
  const urutTurun = mode === "tambah" ? BAG : ["bs", "bp", "as", "ap"];
  const urutNaik = mode === "tambah" ? BAG : ["ap", "as", "bp", "bs"];
  for (const b of urutTurun) while (s[b] > 0) s = S.langkahSusun(s, { t: "UBAH", bagian: b, d: -1 });
  for (const b of urutNaik) while (s[b] < tgt[b]) s = S.langkahSusun(s, { t: "UBAH", bagian: b, d: 1 });
  for (const rep of tampil) s = S.langkahSusun(s, { t: "TOGGLE", rep });
  return s;
}
{
  // Aturan dasar.
  const a = S.awalSusun("tambah");
  const e = S.awalSusun("kurang");
  cek(S.kalimatSusun(a) === "23 + 16 = 39", "kalimat awal tambah");
  cek(S.kalimatSusun(e) === "45 − 19 = 26", "kalimat awal kurang");
  cek(Object.values(a.tampil).every((v) => !v) && Object.values(e.tampil).every((v) => !v), "perwakilan mati di awal");
  cek(S.langkahSusun(sk(a, { t: "UBAH", bagian: "ap", d: 1 }, { t: "UBAH", bagian: "ap", d: 1 }), { t: "TOGGLE", rep: "periksa" }).tampil.periksa === false, "periksa tidak ada pada penjumlahan");

  // Semua keadaan sah: invarian hitungan.
  let jumlah = 0;
  let masalah = 0;
  for (const mode of ["tambah", "kurang"]) {
    for (let ap = 0; ap <= 9; ap += 1) for (let as = 0; as <= 9; as += 1) for (let bp = 0; bp <= 9; bp += 1) for (let bs = 0; bs <= 9; bs += 1) {
      const a2 = 10 * ap + as;
      const b2 = 10 * bp + bs;
      if (mode === "tambah" ? a2 + b2 > 100 : a2 < b2) continue;
      jumlah += 1;
      const x = { ...S.awalSusun(mode), ap, as, bp, bs };
      const an = S.analisisSusun(x);
      const hasil = mode === "tambah" ? a2 + b2 : a2 - b2;
      if (an.hasil !== hasil || an.a !== a2 || an.b !== b2) masalah += 1;
      if (an.tulisSatuan + 10 * an.tulisPuluhan !== hasil) masalah += 1;
      if (an.tulisSatuan < 0 || an.tulisSatuan > 9 && !(mode === "tambah" && an.tulisPuluhan === 10)) masalah += 1;
      if (an.tulisPuluhan < 0) masalah += 1;
      if (mode === "tambah" && an.simpan !== (as + bs >= 10)) masalah += 1;
      if (mode === "kurang" && an.ambil !== (as < bs)) masalah += 1;
      if (mode === "tambah" && an.ambil) masalah += 1;
      if (mode === "kurang" && an.simpan) masalah += 1;
      const baris = S.barisPanjang(x);
      const akhir = baris[baris.length - 1].match(/^(\d+) \+ (\d+) = (\d+)$/);
      if (!akhir || Number(akhir[1]) + Number(akhir[2]) !== hasil || Number(akhir[3]) !== hasil) masalah += 1;
      if (baris.length !== 4) masalah += 1;
      const kal = S.kalimatSusun(x);
      if (kal !== `${a2} ${mode === "tambah" ? "+" : "−"} ${b2} = ${hasil}`) masalah += 1;
      if (mode === "kurang" && S.kalimatPeriksa(x) !== `${hasil} + ${b2} = ${a2}`) masalah += 1;
      if (S.ucapSusun(x).length < 20) masalah += 1;
    }
  }
  cek(masalah === 0, `semua ${jumlah} keadaan susun sah konsisten (masalah ${masalah})`);

  // Penolakan.
  const penuh = jalanS("tambah", { ap: 5, as: 0, bp: 5, bs: 0 });
  cek(S.keadaanSusun(penuh).hasil === 100, "50 + 50 = 100 sah");
  const lebihS = sk(penuh, { t: "UBAH", bagian: "bs", d: 1 });
  cek(lebihS.bs === 0 && lebihS.pesan.length > 5, "jumlah di atas 100 ditolak");
  const turunA = sk(jalanS("kurang", { ap: 4, as: 5, bp: 4, bs: 5 }), { t: "UBAH", bagian: "ap", d: -1 });
  cek(turunA.ap === 4 && turunA.pesan.length > 5, "pengurangan tidak boleh di bawah nol");
  cek(S.langkahSusun(a, { t: "UBAH", bagian: "as", d: 1 }).as === 4, "tambah satuan");
  cek(S.langkahSusun(sk(a, ...Array(3).fill({ t: "UBAH", bagian: "as", d: -1 })), { t: "UBAH", bagian: "as", d: -1 }).pesan.length > 5, "digit tidak di bawah nol");

  // Contoh buku.
  const x54 = S.analisisSusun(jalanS("tambah", { ap: 5, as: 4, bp: 2, bs: 9 }));
  cek(x54.hasil === 83 && x54.simpan && x54.tulisSatuan === 3 && x54.tulisPuluhan === 8, "54 + 29 = 83 menyimpan");
  sama(S.barisPanjang(jalanS("tambah", { ap: 5, as: 4, bp: 2, bs: 9 })).at(-1), "70 + 13 = 83", "uraian 54 + 29");
  const k45 = S.analisisSusun(jalanS("kurang", { ap: 4, as: 5, bp: 1, bs: 9 }));
  cek(k45.hasil === 26 && k45.ambil && k45.satuanHitung === 15 && k45.puluhanAtas === 3 && k45.tulisSatuan === 6 && k45.tulisPuluhan === 2, "45 − 19 = 26 mengambil");
  sama(S.barisPanjang(jalanS("kurang", { ap: 4, as: 5, bp: 1, bs: 9 })), ["45 = 30 + 15", "19 = 10 + 9", "(30 − 10) + (15 − 9) = 20 + 6", "20 + 6 = 26"], "uraian 45 − 19");
  const k25 = S.analisisSusun(jalanS("kurang", { ap: 2, as: 5, bp: 1, bs: 2 }));
  cek(k25.hasil === 13 && !k25.ambil, "25 − 12 = 13 tanpa mengambil");
}

/* ------------------------------- Lab Kelompok ------------------------------- */
const kl = (x, ...a) => a.reduce((s, ak) => K.langkahKel(s, ak), x);
/** Atur kali (k kelompok isi n) lalu bagi (T, w) lewat tombol. Naik dulu pada k, lalu n: hasil kali tak pernah melewati target. */
function jalanKali(x, k, n) {
  let s = x;
  for (let i = 0; i < 20 && s.n > 1; i += 1) s = K.langkahKel(s, { t: "UBAH_N", d: -1 });
  for (let i = 0; i < 20 && s.k > 1; i += 1) s = K.langkahKel(s, { t: "UBAH_K", d: -1 });
  for (let i = 1; i < k; i += 1) s = K.langkahKel(s, { t: "UBAH_K", d: 1 });
  for (let i = 1; i < n; i += 1) s = K.langkahKel(s, { t: "UBAH_N", d: 1 });
  return s;
}
function jalanBagi(x, T2, w2) {
  let s = K.langkahKel(x, { t: "MODE", mode: "bagi" });
  while (s.T > T2) s = K.langkahKel(s, { t: "UBAH_T", d: -1 });
  while (s.T < T2) s = K.langkahKel(s, { t: "UBAH_T", d: 1 });
  while (s.w > w2) s = K.langkahKel(s, { t: "UBAH_W", d: -1 });
  while (s.w < w2) s = K.langkahKel(s, { t: "UBAH_W", d: 1 });
  return s;
}
const nyalaK = (x, ...rep) => rep.reduce((s, r) => K.langkahKel(s, { t: "TOGGLE", rep: r }), x);
{
  const a = K.awalKel("kali");
  cek(a.k === 1 && a.n === 1 && a.riwayatKali.length === 0, "lab kelompok awal 1 × 1, riwayat kosong");
  cek(Object.values(a.tampil).every((v) => !v), "perwakilan kelompok mati di awal");

  // Semua kali: hasil sampai 100.
  let masalah = 0;
  for (let k = 1; k <= 10; k += 1) for (let n = 1; n <= 10; n += 1) {
    const x = jalanKali(a, k, n);
    if (x.k !== k || x.n !== n) masalah += 1;
    const ke = K.keadaanKel(x);
    if (ke.p !== k * n || ke.p > 100) masalah += 1;
    const t = K.barisTambah(k, n);
    if (!t.endsWith(`= ${k * n}`)) masalah += 1;
    if (k <= 6) {
      const suku = t.split(" = ")[0].split(" + ").map(Number);
      if (suku.length !== k || suku.some((v) => v !== n) || suku.reduce((p, q) => p + q, 0) !== k * n) masalah += 1;
    }
  }
  cek(masalah === 0, `semua 100 perkalian konsisten (masalah ${masalah})`);
  cek(K.langkahKel(jalanKali(a, 10, 10), { t: "UBAH_K", d: 1 }).pesan.length > 5, "faktor di atas 10 ditolak");
  cek(K.langkahKel(a, { t: "UBAH_K", d: -1 }).pesan.length > 5, "faktor di bawah 1 ditolak");
  // Riwayat.
  const r = jalanKali(a, 5, 6);
  cek(r.riwayatKali.every((p) => p.k >= 2 && p.n >= 2), "riwayat hanya faktor >= 2");
  cek(new Set(r.riwayatKali.map((p) => `${p.k}x${p.n}`)).size === r.riwayatKali.length, "riwayat tanpa ganda");
  cek(r.riwayatKali.some((p) => p.k === 5 && p.n === 6), "5 × 6 tercatat");
  cek(K.adaDuaSama([{ k: 2, n: 6 }, { k: 3, n: 4 }]) === true, "2×6 dan 3×4 sama hasilnya");
  cek(K.adaDuaSama([{ k: 2, n: 6 }, { k: 6, n: 2 }]) === false, "2×6 dan 6×2 hanya tukar tempat");
  cek(K.adaDuaSama([{ k: 4, n: 5 }, { k: 2, n: 3 }]) === false, "hasil beda bukan pasangan sama");
  cek(K.adaDuaSama([]) === false, "riwayat kosong bukan pasangan sama");

  // Semua pembagian: q × w + sisa = T.
  let m2 = 0;
  let adaSisa = 0;
  for (let T2 = 1; T2 <= 100; T2 += 1) for (let w2 = 1; w2 <= 10; w2 += 1) {
    const { q, sisa } = K.hasilBagi(T2, w2);
    if (q * w2 + sisa !== T2 || sisa < 0 || sisa >= w2) m2 += 1;
    const kal = K.kalimatBagi(T2, w2);
    if ((sisa === 0) !== !kal.includes("sisa")) m2 += 1;
    const habis = K.pernyataanHabis(T2, w2);
    if (sisa > 0 && !habis.includes("tidak habis dibagi")) m2 += 1;
    if (sisa > 0 && /(?<!tidak )habis dibagi/.test(habis)) m2 += 1;
    if (sisa === 0 && habis.includes("tidak")) m2 += 1;
    if (sisa > 0) adaSisa += 1;
    const per = K.kalimatPeriksaBagi(T2, w2);
    if (sisa === 0 && per !== `${q} × ${w2} = ${T2}`) m2 += 1;
    if (sisa > 0 && per !== `${q} × ${w2} + ${sisa} = ${T2}`) m2 += 1;
    const kur = K.barisKurang(T2, w2);
    if (!kur.endsWith(`= ${sisa}`)) m2 += 1;
    if (q <= 6) {
      const bagian = kur.split(" = ")[0].split(" − ").map(Number);
      if (bagian[0] !== T2 || bagian.length !== q + 1 || bagian.slice(1).some((v) => v !== w2)) m2 += 1;
      if (T2 - q * w2 !== sisa) m2 += 1;
    }
  }
  cek(m2 === 0, `semua 1000 pembagian konsisten dan jujur soal sisa (masalah ${m2})`);
  cek(adaSisa > 100, "ada banyak pembagian bersisa");
  sama(K.kalimatBagi(13, 4), "13 : 4 = 3 sisa 1", "13 : 4");
  sama(K.kalimatBagi(15, 3), "15 : 3 = 5", "15 : 3");
  cek(K.langkahKel(K.awalKel("bagi"), { t: "UBAH_T", d: -100 }).pesan.length > 5, "T di bawah 1 ditolak");
  cek(K.langkahKel(jalanBagi(a, 100, 2), { t: "UBAH_T", d: 1 }).pesan.length > 5, "T di atas 100 ditolak");
  cek(K.langkahKel(jalanBagi(a, 12, 10), { t: "UBAH_W", d: 1 }).pesan.length > 5, "wadah di atas 10 ditolak");
}

/* ------------------------------- Mesin bertahap ------------------------------- */
{
  const ids = new Set();
  for (const def of MD.SEMUA_MESIN_K3B1) {
    cek(!ids.has(def.id), `${def.id}: id mesin unik`);
    ids.add(def.id);
    cek(new Set(def.stasiun.map((s) => s.id)).size === def.stasiun.length, `${def.id}: id stasiun unik`);
    cek(def.stasiun.length >= 3 && def.stasiun.length <= 5, `${def.id}: 3 sampai 5 stasiun`);
    cek(def.kasus.length === 4, `${def.id}: empat kasus`);
    cek(new Set(def.kasus.map((k) => k.id)).size === def.kasus.length, `${def.id}: id kasus unik`);
    const posisi = [];
    for (const kasus of def.kasus) {
      cek(kasus.langkah.length === def.stasiun.length, `${def.id}/${kasus.id}: satu pertanyaan per stasiun`);
      cek(kasus.ringkas.length > 10, `${def.id}/${kasus.id}: ada ringkasan`);
      for (const [i, l] of kasus.langkah.entries()) {
        cek(l.stasiun === def.stasiun[i]?.id, `${def.id}/${kasus.id}: stasiun ke-${i} cocok`);
        cek(l.opsi.length >= 2 && l.opsi.length <= 3, `${def.id}/${kasus.id}/${l.stasiun}: 2 atau 3 pilihan`);
        cek(new Set(l.opsi).size === l.opsi.length, `${def.id}/${kasus.id}/${l.stasiun}: pilihan unik ${JSON.stringify(l.opsi)}`);
        cek(l.opsi.filter((o) => o === l.benar).length === 1, `${def.id}/${kasus.id}/${l.stasiun}: tepat satu jawaban benar`);
        cek(l.tanya.length > 10 && l.petunjuk.length > 20, `${def.id}/${kasus.id}/${l.stasiun}: tanya dan petunjuk ada`);
        posisi.push(l.opsi.indexOf(l.benar));
        for (const o of l.opsi) {
          const angka = o.match(/\d+/g) ?? [];
          cek(angka.every((v) => Number(v) >= 0), `${def.id}/${kasus.id}/${l.stasiun}: tidak ada bilangan negatif`);
        }
      }
    }
    cek(new Set(posisi).size >= 2, `${def.id}: letak jawaban benar bervariasi (${posisi.join("")})`);
    // Tiap stasiun: letak jawaban tidak selalu sama.
    for (let i = 0; i < def.stasiun.length; i += 1) {
      const p = def.kasus.map((k) => k.langkah[i].opsi.indexOf(k.langkah[i].benar));
      cek(new Set(p).size >= 2, `${def.id}/${def.stasiun[i].id}: letak jawaban berubah antar kasus (${p.join("")})`);
    }

    // Main sampai selesai, dengan jawaban salah, lompat, dan lanjut terlalu dini.
    let x = ME.awalMesin(def);
    cek(ME.indeksStasiun(x) === 0 && !x.selesai, `${def.id}: mulai dari stasiun pertama`);
    cek(ME.langkahMesin(x, { t: "ULANG" }) === x, `${def.id}: ULANG sebelum selesai tidak berubah`);
    for (const [mi] of def.kasus.entries()) {
      for (let i = 0; i < def.stasiun.length; i += 1) {
        const l = ME.langkahAktif(x);
        cek(l !== null && x.misi === mi && x.ke === i, `${def.id}: kasus ${mi} stasiun ${i} aktif`);
        const lompat = ME.langkahMesin(x, { t: "LOMPAT", ke: (i + 1) % (def.stasiun.length + 1) });
        cek(lompat.ke === x.ke && lompat.misi === x.misi && lompat.ditolak === x.ditolak + 1 && lompat.pesan.length > 5, `${def.id}: lompat stasiun ditolak`);
        cek(ME.langkahMesin(x, { t: "LOMPAT", ke: i }) === x, `${def.id}: ketuk stasiun sekarang tidak apa-apa`);
        const dini = ME.langkahMesin(x, { t: "LANJUT" });
        cek(dini.ke === x.ke && dini.ditolak === x.ditolak + 1, `${def.id}: lanjut sebelum selesai ditolak`);
        const salah = l.opsi.find((o) => o !== l.benar);
        const t = ME.langkahMesin(x, { t: "JAWAB", nilai: salah });
        cek(t.ke === x.ke && t.misi === x.misi && t.ditolak === x.ditolak + 1 && t.pesan === l.petunjuk, `${def.id}: jawaban salah tinggal dengan petunjuk`);
        cek(ME.langkahMesin(t, { t: "JAWAB", nilai: "bukan pilihan" }) === t, `${def.id}: jawaban di luar pilihan diabaikan`);
        const dahulu = x.ke;
        x = ME.langkahMesin(t, { t: "JAWAB", nilai: l.benar });
        cek(x.pesan === "" && (i + 1 < def.stasiun.length ? x.ke === dahulu + 1 && x.fase === "jalan" : x.fase === "sudah"), `${def.id}: jawaban benar maju`);
      }
      cek(x.fase === "sudah" && ME.indeksStasiun(x) === def.stasiun.length, `${def.id}: semua stasiun dilewati pada kasus ${mi}`);
      cek(ME.petunjukMesin(x).includes("Betul"), `${def.id}: ada pujian setelah kasus ${mi}`);
      const lagi = ME.langkahMesin(x, { t: "JAWAB", nilai: "1" });
      cek(lagi.ditolak === x.ditolak + 1 && lagi.fase === "sudah", `${def.id}: menjawab setelah kasus selesai ditolak`);
      const y = ME.langkahMesin(x, { t: "LANJUT" });
      if (mi + 1 < def.kasus.length) cek(y.misi === mi + 1 && y.ke === 0 && y.fase === "jalan" && !y.selesai, `${def.id}: lanjut ke kasus berikut`);
      else cek(y.fase === "selesai" && y.selesai, `${def.id}: kasus terakhir menyelesaikan mesin`);
      x = y;
    }
    cek(x.selesai && ME.langkahAktif(x) === null, `${def.id}: selesai tidak punya pertanyaan`);
    cek(ME.langkahMesin(x, { t: "JAWAB", nilai: "1" }).ditolak === x.ditolak + 1, `${def.id}: menjawab setelah selesai ditolak`);
    const baru = ME.langkahMesin(x, { t: "ULANG" });
    cek(!baru.selesai && baru.misi === 0 && baru.ke === 0 && baru.ditolak === 0 && baru.riwayat.length === 0, `${def.id}: main lagi kembali ke awal`);
    cek(x.riwayat.length <= 10, `${def.id}: riwayat dibatasi 10`);
  }

  // Kunci dihitung ulang secara mandiri dari bilangan tiap kasus.
  const teksKasus = (def, id) => def.kasus.find((k) => k.id === id);
  for (const k of MD.MESIN_BACA.kasus) {
    const n = Number(k.id.split("-")[1]);
    const d = T.digitDari(n);
    sama(k.langkah[0].benar, `${d.r} | ${d.p} | ${d.s}`, `${k.id}: papan`);
    sama(k.langkah[1].benar, T.kataBilangan(n), `${k.id}: baca`);
    sama(k.langkah[2].benar, String(n), `${k.id}: tulis`);
    cek(k.langkah[2].tanya.includes(`"${T.kataBilangan(n)}"`), `${k.id}: soal tulis memuat kata bilangan`);
    cek(k.langkah[1].tanya.includes(String(n)), `${k.id}: soal baca memuat angka`);
    // pengecoh adalah bilangan lain yang masuk akal (bukan n).
    cek(!k.langkah[1].opsi.some((o) => o !== k.langkah[1].benar && o === T.kataBilangan(n)), `${k.id}: pengecoh baca bukan jawaban`);
    cek(k.langkah[2].opsi.every((o) => Number(o) >= 0 && Number(o) <= 999), `${k.id}: pilihan tulis dalam 0..999`);
  }
  cek(["671", "160", "703", "900"].every((n) => teksKasus(MD.MESIN_BACA, `baca-${n}`)), "mesin baca memuat 671, 160, 703, 900");
  // Pengecoh tulis untuk bilangan berangka nol menyertakan versi tanpa nol.
  cek(teksKasus(MD.MESIN_BACA, "baca-703").langkah[2].opsi.includes("73"), "703: pengecoh 73 (nol hilang)");
  cek(teksKasus(MD.MESIN_BACA, "baca-160").langkah[2].opsi.includes("16"), "160: pengecoh 16 (nol hilang)");
  cek(teksKasus(MD.MESIN_BACA, "baca-900").langkah[2].opsi.includes("9"), "900: pengecoh 9 (nol hilang)");
  for (let n = 0; n <= 999; n += 1) {
    const c = MD.pengecohBilangan(n, true);
    cek(c.length === 2 && c[0] !== c[1] && !c.includes(n) && c.every((v) => v >= 0 && v <= 999), `pengecoh ${n} dua bilangan berbeda`);
  }

  for (const k of MD.MESIN_NILAI.kasus) {
    const n = Number(k.id.split("-")[1]);
    const d = T.digitDari(n);
    sama(k.langkah[2].benar, T.uraiBilangan(n), `${k.id}: urai`);
    const m = k.langkah[0].tanya.match(/angka (\d) ada di tempat/);
    const angka = Number(m[1]);
    const pos = k.langkah[0].benar;
    cek(d[{ ratusan: "r", puluhan: "p", satuan: "s" }[pos]] === angka, `${k.id}: angka ${angka} memang ada di ${pos}`);
    const kali = { ratusan: 100, puluhan: 10, satuan: 1 }[pos];
    sama(k.langkah[1].benar, String(angka * kali), `${k.id}: nilai`);
    cek(k.langkah[1].tanya.includes(`angka ${angka} pada ${n}`), `${k.id}: soal nilai konsisten`);
    cek(k.langkah[1].opsi.includes(String(angka)) && k.langkah[1].opsi.length === 3, `${k.id}: pengecoh nilai memuat angkanya sendiri`);
    sama(k.langkah[2].opsi.filter((o) => o !== k.langkah[2].benar).length, 2, `${k.id}: dua pengecoh urai`);
  }
  cek(["251", "602", "987", "805"].every((n) => teksKasus(MD.MESIN_NILAI, `nilai-${n}`)), "mesin nilai memuat 251, 602, 987, 805");

  for (const k of MD.MESIN_TAMBAH.kasus) {
    const [, a, b] = k.id.split("-").map(Number);
    const ap = Math.floor(a / 10);
    const as = a % 10;
    const bp = Math.floor(b / 10);
    const bs = b % 10;
    const ss = as + bs;
    const sim = ss >= 10;
    cek(a >= 10 && b >= 10 && a + b <= 100, `${k.id}: bilangan dalam jangkauan`);
    sama(k.langkah[0].benar, String(as), `${k.id}: susun`);
    sama(k.langkah[1].benar, String(ss), `${k.id}: satuan`);
    sama(k.langkah[2].benar, sim ? `Tulis ${ss - 10}, simpan 1 puluhan` : `Tulis ${ss}, tidak menyimpan`, `${k.id}: simpan`);
    sama(k.langkah[3].benar, String(ap + bp + (sim ? 1 : 0)), `${k.id}: puluhan`);
    cek(k.ringkas.startsWith(`${a} + ${b} = ${a + b}`), `${k.id}: ringkasan benar`);
    cek((ap + bp + (sim ? 1 : 0)) * 10 + (sim ? ss - 10 : ss) === a + b, `${k.id}: hasil tulis puluhan-satuan sama dengan jumlah`);
  }
  cek(MD.MESIN_TAMBAH.kasus.filter((k) => /simpan 1/.test(k.langkah[2].benar)).length === 2, "mesin tambah: dua kasus menyimpan, dua tidak");

  for (const k of MD.MESIN_KURANG.kasus) {
    const [, a, b] = k.id.split("-").map(Number);
    const ap = Math.floor(a / 10);
    const as = a % 10;
    const bp = Math.floor(b / 10);
    const bs = b % 10;
    const amb = as < bs;
    const sat = (amb ? as + 10 : as) - bs;
    const pul = ap - (amb ? 1 : 0) - bp;
    cek(a >= 10 && b >= 10 && a > b, `${k.id}: bilangan dalam jangkauan`);
    sama(k.langkah[0].benar, String(as), `${k.id}: susun`);
    sama(k.langkah[1].benar.startsWith("Tidak cukup"), amb, `${k.id}: cukup atau tidak`);
    sama(k.langkah[2].benar, String(sat), `${k.id}: satuan`);
    sama(k.langkah[3].benar, String(pul), `${k.id}: puluhan`);
    sama(k.langkah[4].benar, String(a), `${k.id}: periksa`);
    cek(pul * 10 + sat === a - b, `${k.id}: hasil tulis sama dengan selisih`);
    cek(k.langkah[4].tanya.includes(`${a - b} + ${b}`), `${k.id}: soal periksa memakai hasil dan pengurang`);
  }
  cek(MD.MESIN_KURANG.kasus.filter((k) => k.langkah[1].benar.startsWith("Tidak cukup")).length === 2, "mesin kurang: dua kasus mengambil, dua tidak");

  for (const k of MD.MESIN_KALI.kasus) {
    const [, a, b] = k.id.split("-").map(Number);
    cek(a * b <= 100 && a !== b, `${k.id}: dalam jangkauan, faktor berbeda`);
    sama(k.langkah[0].benar, `${a} kelompok, isi ${b}`, `${k.id}: kelompok`);
    sama(k.langkah[1].benar, String(a * b), `${k.id}: tambah berulang`);
    sama(k.langkah[2].benar, `${a} × ${b} = ${a * b}`, `${k.id}: kali`);
    sama(k.langkah[3].benar, String(b * a), `${k.id}: tukar`);
    cek(Array.from({ length: a }, () => b).reduce((p, q) => p + q, 0) === a * b, `${k.id}: penjumlahan berulang cocok`);
  }
  for (const k of MD.MESIN_BAGI.kasus) {
    const [, n, w] = k.id.split("-").map(Number);
    cek(n % w === 0 && n <= 100, `${k.id}: habis dibagi dan dalam jangkauan`);
    const q = n / w;
    sama(k.langkah[0].benar, String(w), `${k.id}: bagikan`);
    sama(k.langkah[1].benar, String(q), `${k.id}: kurang berulang`);
    sama(k.langkah[2].benar, `${n} : ${w} = ${q}`, `${k.id}: bagi`);
    sama(k.langkah[3].benar, String(n), `${k.id}: periksa`);
    // Kalimat salah memang salah.
    for (const o of k.langkah[2].opsi) {
      const m = o.match(/^(\d+) ([:−]) (\d+) = (\d+)$/);
      const nilai = m[2] === ":" ? Number(m[1]) / Number(m[3]) : Number(m[1]) - Number(m[3]);
      if (o !== k.langkah[2].benar && m[2] === ":") cek(!(nilai === Number(m[4]) && Number(m[1]) === n && Number(m[3]) === w), `${k.id}: pengecoh "${o}" tidak sama dengan jawaban`);
      if (m[2] === "−") cek(nilai === Number(m[4]), `${k.id}: "${o}" hitungannya benar walau tidak cocok soal`);
    }
  }
}

/* ------------------------------- Misi ------------------------------- */
const HURUF = ["A", "B", "C", "D", "E", "F", "G"];
const awalSemua = {
  A: [kT(T.awalTempat())],
  B: [kT(T.awalTempat())],
  C: [kT(T.awalTempat()), U.keadaanUrut(U.awalUrut())],
  D: [S.keadaanSusun(S.awalSusun("tambah"))],
  E: [S.keadaanSusun(S.awalSusun("kurang"))],
  F: [K.keadaanKel(K.awalKel("kali"))],
  G: [K.keadaanKel(K.awalKel("kali")), K.keadaanKel(K.awalKel("bagi"))],
};
const semuaAwal = Object.values(awalSemua).flat();
const idMisi = new Set();
const sel = (id) => ({ alat: "selesai", id });

for (const h of HURUF) {
  const daftar = K3.daftarMisiK3Bab1(h);
  const wajib = daftar.filter((m) => m.wajib);
  const bebas = daftar.filter((m) => !m.wajib);
  cek(wajib.length >= 3, `sub-bab ${h}: minimal 3 misi wajib (${wajib.length})`);
  cek(bebas.length >= 1, `sub-bab ${h}: minimal 1 tantangan bebas (${bebas.length})`);
  for (const m of daftar) {
    cek(!idMisi.has(m.id), `misi ${m.id}: id unik`);
    idMisi.add(m.id);
    cek(m.id.startsWith(`${h.toLowerCase()}-`), `misi ${m.id}: berawalan huruf sub-bab`);
    cek(m.teks.length >= 10 && m.teks.length <= 120, `misi ${m.id}: panjang teks ${m.teks.length}`);
  }
  // Keadaan awal tidak memenuhi misi mana pun, di bab ini maupun yang lain.
  for (const ke of semuaAwal) {
    for (const m of daftar) cek(!m.cek(ke), `sub-bab ${h}: keadaan awal ${ke.alat} tidak memenuhi misi ${m.id}`);
  }
  // Gerbang tertutup di awal dan hanya mesin/skenario lain yang tidak membuka misi lain.
  const sudah = new Set();
  cek(!M0.wajibSelesai(M0.tampilMisi(daftar), sudah), `sub-bab ${h}: gerbang tertutup di awal`);
  // Misi mesin dan skenario hanya merespons id yang benar.
  for (const m of daftar.filter((x) => /-mesin$|-skenario$/.test(x.id))) {
    const idBenar = m.id.endsWith("mesin") ? K3.ID_MESIN_K3B1[h] : K3.ID_SKENARIO_K3B1[h];
    cek(idBenar !== undefined && m.cek(sel(idBenar)), `misi ${m.id}: tercapai oleh ${idBenar}`);
    for (const lain of [...Object.values(K3.ID_MESIN_K3B1), ...Object.values(K3.ID_SKENARIO_K3B1), "x"].filter((v) => v !== idBenar)) {
      if (m.cek(sel(lain))) cek(false, `misi ${m.id}: tidak boleh tercapai oleh ${lain}`);
    }
    cek(!m.cek({ alat: "tempat", n: 0 }), `misi ${m.id}: alat lain tidak memenuhi`);
  }
}
// Id selesai konsisten dengan definisi mesin.
for (const [h, def] of [["A", MD.MESIN_BACA], ["B", MD.MESIN_NILAI], ["D", MD.MESIN_TAMBAH], ["E", MD.MESIN_KURANG], ["F", MD.MESIN_KALI], ["G", MD.MESIN_BAGI]]) {
  sama(def.selesaiId, K3.ID_MESIN_K3B1[h], `selesaiId mesin ${h}`);
}
sama(Object.keys(K3.ID_SKENARIO_K3B1), HURUF, "id skenario untuk A..G");

/** Pastikan misi `id` pada sub-bab `h` memenuhi `ke` dan keadaan sebelumnya tidak memenuhi. */
const misiDi = (h, id) => K3.daftarMisiK3Bab1(h).find((m) => m.id === id);
const penuh = (h, id, ke) => cek(misiDi(h, id).cek(ke), `misi ${id} tercapai`);
const belum = (h, id, ke, ket) => cek(!misiDi(h, id).cek(ke), `misi ${id} belum tercapai: ${ket}`);
const rep = (x, ...r) => r.reduce((s, v) => nyala(s, v), x);

/* ---- Bukti tiap misi bisa dicapai dari alat sebenarnya (dengan tampilan yang tersedia di sub-bab itu) ---- */
{
  cek(JSON.stringify(T.REP_TEMPAT.A) === '["kata","garis"]' && T.REP_TEMPAT.C.includes("banding") && T.REP_TEMPAT.B.includes("nilai"), "perwakilan per sub-bab terdaftar");
  const baru = T.awalTempat();

  // A
  let x = buatT(baru, 160);
  belum("A", "a-160", kT(x), "Kata mati");
  x = nyala(x, "kata");
  penuh("A", "a-160", kT(x));
  x = buatT(x, 161);
  belum("A", "a-160", kT(x), "bilangan lain");
  x = rep(buatT(baru, 703), "kata");
  penuh("A", "a-703", kT(x));
  belum("A", "a-160", kT(x), "703 bukan 160");
  x = ulangT(baru, { t: "UBAH", tempat: "s", d: 1 }, 9);
  belum("A", "a-tukar", kT(x), "belum ditukar");
  x = tp(x, { t: "UBAH", tempat: "s", d: 1 }, { t: "TUKAR_NAIK", dari: "s" });
  penuh("A", "a-tukar", kT(x));
  x = tp(x, { t: "UBAH", tempat: "s", d: -1 });
  penuh("A", "a-tukar", kT(x)); // tidak dicabut oleh papan, dan keadaan lab menyimpan riwayat
  x = rep(buatT(baru, 900), "kata");
  penuh("A", "a-900", kT(x));
  x = rep(buatT(baru, 671), "garis");
  penuh("A", "a-garis", kT(x));
  belum("A", "a-garis", kT(buatT(x, 672)), "672 bukan 671");
  penuh("A", "a-999", kT(buatT(baru, 999)));
  // Tidak rapi: 160 bernilai 160 tetapi bukan rapi.
  let tidakRapi = rep(buatT(baru, 150), "kata");
  tidakRapi = ulangT(tidakRapi, { t: "UBAH", tempat: "s", d: 1 }, 0);
  tidakRapi = { ...tidakRapi, p: 5, s: 10 };
  cek(T.nilaiTempat(tidakRapi) === 160 && !kT(tidakRapi).rapi, "contoh 160 tidak rapi (5 puluhan 10 satuan)");
  belum("A", "a-160", kT(tidakRapi), "5 puluhan 10 satuan belum rapi");

  // B
  x = rep(buatT(baru, 251), "nilai");
  penuh("B", "b-251", kT(x));
  belum("B", "b-251", kT(buatT(baru, 251)), "Nilai mati");
  x = nyala(baru, "nilai");
  x = buatT(x, 600);
  belum("B", "b-enam", kT(x), "baru 600");
  x = buatT(x, 60);
  x = buatT(x, 6);
  penuh("B", "b-enam", kT(x));
  cek([6, 60, 600].every((n) => x.pernahNilai.includes(n)) && x.pernahNilai.every(T.satuAngka), "riwayat nilai satu angka memuat 6, 60, 600");
  x = nyala(x, "nilai"); // matikan Nilai: riwayat tetap
  penuh("B", "b-enam", kT(x));
  // Tanpa Nilai menyala tidak tercatat.
  belum("B", "b-enam", kT(buatT(buatT(buatT(baru, 600), 60), 6)), "tanpa Nilai");
  // Nilai dinyalakan setelah bilangan dibuat: tercatat saat dinyalakan.
  x = nyala(buatT(baru, 600), "nilai");
  x = buatT(x, 60);
  x = buatT(x, 6);
  penuh("B", "b-enam", kT(x));
  x = rep(buatT(baru, 602), "nilai");
  penuh("B", "b-602", kT(x));
  penuh("B", "b-987", kT(rep(buatT(baru, 987), "nilai")));
  penuh("B", "b-805", kT(rep(buatT(baru, 805), "nilai")));
  belum("B", "b-805", kT(buatT(baru, 805)), "Nilai mati");
  x = ulangT(baru, { t: "UBAH", tempat: "p", d: 1 }, 10);
  belum("B", "b-ratusan", kT(x), "belum ditukar");
  x = tp(x, { t: "TUKAR_NAIK", dari: "p" });
  penuh("B", "b-ratusan", kT(x));

  // C
  const banding = (n, m) => buatM(buatT(nyala(baru, "banding"), n), m);
  penuh("C", "c-ratusan", kT(banding(339, 421)));
  belum("C", "c-ratusan", kT(banding(583, 529)), "ratusan sama");
  penuh("C", "c-puluhan", kT(banding(583, 529)));
  penuh("C", "c-satuan", kT(banding(769, 761)));
  penuh("C", "c-sama", kT(banding(804, 804)));
  belum("C", "c-sama", kT(banding(804, 805)), "satuan beda");
  belum("C", "c-ratusan", kT(buatM(buatT(baru, 339), 421)), "Banding mati");
  belum("C", "c-puluhan", kT(banding(45, 78)), "bukan tiga angka");
  belum("C", "c-satuan", kT(banding(7, 9)), "bukan tiga angka");
  let kurangRapi = banding(583, 529);
  kurangRapi = { ...kurangRapi, p: 7, s: 13 };
  cek(T.nilaiTempat(kurangRapi) === 583 && !kT(kurangRapi).rapi, "contoh 583 tidak rapi (7 puluhan 13 satuan)");
  belum("C", "c-puluhan", kT(kurangRapi), "papan tidak rapi");
  // Urut.
  let u = U.awalUrut();
  belum("C", "c-urut", U.keadaanUrut(u), "awal");
  u = urutkan(u, "naik");
  penuh("C", "c-urut", U.keadaanUrut(u));
  belum("C", "c-turun", U.keadaanUrut(u), "belum turun");
  u = urutkan(u, "turun");
  penuh("C", "c-turun", U.keadaanUrut(u));
  belum("C", "c-dua", U.keadaanUrut(u), "satu himpunan");
  u = ur(u, { t: "HIMPUNAN", k: 2 });
  u = urutkan(u, "naik");
  penuh("C", "c-dua", U.keadaanUrut(u));
  // Mengganti arah saja tidak mencapai misi.
  belum("C", "c-turun", U.keadaanUrut(ur(U.awalUrut(), { t: "ARAH", arah: "turun" })), "hanya ganti arah");
  belum("C", "c-urut", U.keadaanUrut(ur(U.awalUrut(), { t: "KETUK", i: 0 }, { t: "KETUK", i: 1 })), "satu tukar saja");

  // D dan E: cari saksi di semua kombinasi digit dan tampilan, lalu putar ulang lewat tombol.
  for (const [h, mode] of [["D", "tambah"], ["E", "kurang"]]) {
    const repAda = mode === "tambah" ? ["blok", "pendek", "panjang"] : ["blok", "pendek", "panjang", "periksa"];
    for (const m of K3.daftarMisiK3Bab1(h).filter((q) => q.cek.length >= 0 && !/-mesin$|-skenario$/.test(q.id))) {
      let saksi = null;
      let totalSah = 0;
      let totalPenuh = 0;
      outer: for (let mask = 0; mask < 1 << repAda.length; mask += 1) {
        const tampil = repAda.filter((_, i) => mask & (1 << i));
        for (let ap = 0; ap <= 9; ap += 1) for (let as = 0; as <= 9; as += 1) for (let bp = 0; bp <= 9; bp += 1) for (let bs = 0; bs <= 9; bs += 1) {
          const a2 = 10 * ap + as;
          const b2 = 10 * bp + bs;
          if (mode === "tambah" ? a2 + b2 > 100 : a2 < b2) continue;
          totalSah += 1;
          const ke = S.keadaanSusun({ ...S.awalSusun(mode), ap, as, bp, bs, tampil: { blok: tampil.includes("blok"), pendek: tampil.includes("pendek"), panjang: tampil.includes("panjang"), periksa: tampil.includes("periksa") } });
          if (m.cek(ke)) {
            totalPenuh += 1;
            if (!saksi) saksi = { ap, as, bp, bs, tampil };
          }
        }
      }
      cek(saksi !== null, `misi ${m.id}: ada keadaan yang memenuhi`);
      if (saksi) {
        const s = jalanS(mode, saksi, saksi.tampil);
        cek(m.cek(S.keadaanSusun(s)), `misi ${m.id}: tercapai lewat tombol (${JSON.stringify(saksi)})`);
        cek(totalPenuh / totalSah < 0.6, `misi ${m.id}: tidak terlalu mudah (${((100 * totalPenuh) / totalSah).toFixed(1)}% keadaan)`);
      }
    }
  }
  // Contoh khusus.
  penuh("D", "d-tanpa", S.keadaanSusun(jalanS("tambah", { ap: 2, as: 3, bp: 1, bs: 6 }, ["pendek"])));
  belum("D", "d-tanpa", S.keadaanSusun(jalanS("tambah", { ap: 2, as: 3, bp: 1, bs: 6 })), "Susun pendek mati");
  belum("D", "d-tanpa", S.keadaanSusun(jalanS("tambah", { ap: 4, as: 8, bp: 1, bs: 6 }, ["pendek"])), "48 + 16 menyimpan");
  penuh("D", "d-simpan", S.keadaanSusun(jalanS("tambah", { ap: 4, as: 8, bp: 1, bs: 6 }, ["pendek"])));
  belum("D", "d-simpan", S.keadaanSusun(jalanS("tambah", { ap: 0, as: 8, bp: 0, bs: 6 }, ["pendek"])), "bukan dua angka");
  penuh("D", "d-panjang", S.keadaanSusun(jalanS("tambah", { ap: 5, as: 4, bp: 2, bs: 9 }, ["panjang"])));
  belum("D", "d-panjang", S.keadaanSusun(jalanS("tambah", { ap: 2, as: 3, bp: 1, bs: 6 }, ["panjang"])), "tidak menyimpan");
  penuh("D", "d-seratus", S.keadaanSusun(jalanS("tambah", { ap: 6, as: 0, bp: 4, bs: 0 })));
  penuh("D", "d-sepuluh", S.keadaanSusun(jalanS("tambah", { ap: 3, as: 4, bp: 2, bs: 6 })));
  belum("D", "d-sepuluh", S.keadaanSusun(jalanS("tambah", { ap: 3, as: 4, bp: 2, bs: 5 })), "satuan 9");
  penuh("E", "e-ambil", S.keadaanSusun(jalanS("kurang", { ap: 4, as: 5, bp: 1, bs: 9 }, ["pendek"])));
  belum("E", "e-tanpa", S.keadaanSusun(jalanS("kurang", { ap: 4, as: 5, bp: 1, bs: 9 }, ["pendek"])), "45 − 19 mengambil");
  penuh("E", "e-tanpa", S.keadaanSusun(jalanS("kurang", { ap: 2, as: 5, bp: 1, bs: 2 }, ["pendek"])));
  belum("E", "e-tanpa", S.keadaanSusun(jalanS("kurang", { ap: 3, as: 5, bp: 3, bs: 5 }, ["pendek"])), "hasil nol bukan contoh tanpa mengambil");
  penuh("E", "e-nol", S.keadaanSusun(jalanS("kurang", { ap: 3, as: 5, bp: 3, bs: 5 })));
  penuh("E", "e-periksa", S.keadaanSusun(jalanS("kurang", { ap: 4, as: 5, bp: 1, bs: 9 }, ["periksa"])));
  belum("E", "e-periksa", S.keadaanSusun(jalanS("kurang", { ap: 4, as: 5, bp: 1, bs: 9 })), "Periksa mati");

  // F dan G: kelompok.
  const kali = (k, n, ...r) => nyalaK(jalanKali(K.awalKel("kali"), k, n), ...r);
  penuh("F", "f-lima-dua", K.keadaanKel(kali(5, 2, "tambah")));
  belum("F", "f-lima-dua", K.keadaanKel(kali(5, 2)), "Tambah mati");
  belum("F", "f-lima-dua", K.keadaanKel(kali(2, 5, "tambah")), "2 kelompok isi 5 bukan 5 kelompok isi 2");
  penuh("F", "f-kalimat", K.keadaanKel(kali(4, 5, "kalimat")));
  belum("F", "f-kalimat", K.keadaanKel(kali(5, 4, "kalimat")), "5 kelompok isi 4");
  penuh("F", "f-garis", K.keadaanKel(kali(3, 7, "garis")));
  belum("F", "f-garis", K.keadaanKel(kali(7, 3, "garis")), "7 kelompok isi 3");
  penuh("F", "f-tukar", K.keadaanKel(kali(5, 6, "tukar")));
  penuh("F", "f-seratus", K.keadaanKel(kali(10, 10)));
  belum("F", "f-seratus", K.keadaanKel(kali(10, 9)), "90");
  let f = jalanKali(K.awalKel("kali"), 2, 6);
  belum("F", "f-sama", K.keadaanKel(f), "baru satu pasangan");
  f = jalanKali(f, 6, 2);
  belum("F", "f-sama", K.keadaanKel(f), "hanya tukar tempat");
  f = jalanKali(f, 3, 4);
  penuh("F", "f-sama", K.keadaanKel(f));
  // G
  let g = nyalaK(jalanBagi(K.awalKel("kali"), 12, 2), "kurang");
  penuh("G", "g-kurang", K.keadaanKel(g));
  belum("G", "g-kurang", K.keadaanKel(jalanBagi(K.awalKel("kali"), 12, 2)), "Kurang mati");
  belum("G", "g-kurang", K.keadaanKel(nyalaK(jalanBagi(K.awalKel("kali"), 12, 3), "kurang")), "12 : 3");
  penuh("G", "g-nama", K.keadaanKel(nyalaK(jalanBagi(K.awalKel("kali"), 15, 3), "nama")));
  belum("G", "g-nama", K.keadaanKel(nyalaK(jalanBagi(K.awalKel("kali"), 13, 4), "nama")), "13 : 4 tidak habis");
  penuh("G", "g-periksa", K.keadaanKel(nyalaK(jalanBagi(K.awalKel("kali"), 28, 7), "periksa")));
  belum("G", "g-periksa", K.keadaanKel(nyalaK(jalanBagi(K.awalKel("kali"), 29, 7), "periksa")), "29 : 7 tidak habis");
  penuh("G", "g-sisa", K.keadaanKel(jalanBagi(K.awalKel("kali"), 13, 4)));
  belum("G", "g-sisa", K.keadaanKel(jalanBagi(K.awalKel("kali"), 1, 2)), "1 : 2 belum satu pun terbagi");
  penuh("G", "g-seratus", K.keadaanKel(jalanBagi(K.awalKel("kali"), 100, 10)));
  belum("G", "g-seratus", K.keadaanKel(jalanBagi(K.awalKel("kali"), 100, 3)), "100 : 3 bersisa");
  // g-balik: perkalian dulu, lalu bagi.
  let gb = jalanKali(K.awalKel("kali"), 5, 3);
  belum("G", "g-balik", K.keadaanKel(gb), "masih mode Kali");
  const gb1 = jalanBagi(gb, 15, 3);
  penuh("G", "g-balik", K.keadaanKel(gb1));
  penuh("G", "g-balik", K.keadaanKel(jalanBagi(gb, 15, 5)));
  belum("G", "g-balik", K.keadaanKel(jalanBagi(gb, 15, 4)), "bukan faktornya");
  belum("G", "g-balik", K.keadaanKel(jalanBagi(K.awalKel("kali"), 15, 3)), "belum membuat perkaliannya");
  belum("G", "g-balik", K.keadaanKel(jalanBagi(gb, 12, 3)), "bukan hasil kali itu");
  // Perkalian dengan faktor 1 tidak membuka misi ini secara trivial.
  const tr = jalanKali(K.awalKel("kali"), 7, 1);
  belum("G", "g-balik", K.keadaanKel(jalanBagi(tr, 7, 1)), "faktor 1 tidak dicatat");
}

/* ---- Semua misi wajib dan bebas dapat dicapai (ringkasan) dan gerbang bekerja ---- */
{
  const daftarA = K3.daftarMisiK3Bab1("A");
  const tampil = M0.tampilMisi(daftarA);
  let sudah = new Set();
  // Capai semua wajib lewat misiBaru dari rangkaian keadaan.
  let x = rep(buatT(T.awalTempat(), 160), "kata");
  for (const id of M0.misiBaru(daftarA, kT(x), sudah)) sudah.add(id);
  cek(sudah.has("a-160") && !M0.wajibSelesai(tampil, sudah), "gerbang A masih tertutup setelah satu misi");
  x = rep(buatT(x, 703), "kata");
  x = x.tampil.kata ? x : nyala(x, "kata");
  for (const id of M0.misiBaru(daftarA, kT(x), sudah)) sudah.add(id);
  x = ulangT(buatT(x, 0), { t: "UBAH", tempat: "s", d: 1 }, 10);
  x = tp(x, { t: "TUKAR_NAIK", dari: "s" });
  for (const id of M0.misiBaru(daftarA, kT(x), sudah)) sudah.add(id);
  for (const id of M0.misiBaru(daftarA, sel(K3.ID_MESIN_K3B1.A), sudah)) sudah.add(id);
  cek(!M0.wajibSelesai(tampil, sudah), "gerbang A tertutup tanpa skenario");
  for (const id of M0.misiBaru(daftarA, sel(K3.ID_SKENARIO_K3B1.A), sudah)) sudah.add(id);
  cek(M0.wajibSelesai(tampil, sudah), "gerbang A terbuka setelah semua misi wajib");
  cek(sudah.has("a-160") && sudah.has("a-703"), "misi yang tercapai tidak dicabut");
}

console.log(`SEMUA ${gagal ? "GAGAL" : "LULUS"} (${lulus} cek${gagal ? `, ${gagal} gagal` : ""})`);
process.exit(gagal ? 1 : 0);
