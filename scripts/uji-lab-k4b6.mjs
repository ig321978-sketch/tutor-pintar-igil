// Uji Simulasi Kelas 4 Bab 6 (Piktogram dan Diagram Batang): pengeja, Lab Piktogram, mesin, skenario, misi, gerbang,
// data ringkas, dan konsep Sub-Bab B tidak bocor ke Sub-Bab A.
// Jalankan: node --no-warnings scripts/uji-lab-k4b6.mjs
import { readFileSync } from "node:fs";
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K6 from "../src/components/modul/misi-k4bab6.ts";
import * as TK from "../src/components/modul/misi-teks-k4b6.ts";
import * as A from "../src/components/modul/lab-piktogram-k4b6a.ts";
import * as MS from "../src/components/modul/mesin-data-k4b6.ts";
import * as SK from "../src/components/modul/skenario-k4b6.ts";
import * as ME from "../src/components/modul/mesin-bertahap-k3b1.ts";
import * as EJ from "../src/components/modul/eja-k4b6.ts";
import * as D from "../src/components/modul/data-k4b6.ts";
import { ejaK3 } from "../src/components/modul/lab-tempat-k3b1.ts";

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
const tanpaAngka = (t) => !/\d/.test(EJ.ejaK4B6(t));
const tanpaAngkaK3 = (t) => !/\d/.test(ejaK3(t));
const L = A.langkahPiktoK4B6A;
const x0 = A.awalPiktoK4B6A();

/* ------------------------------ Hitungan MANDIRI (cara berbeda) ------------------------------ */
// Kode memakai pembagian, sisa bagi, dan pengurutan. Di sini nilai dicari dengan pengurangan berulang, jumlah dengan
// perulangan for, dan paling banyak/sedikit dengan pencarian indeks satu per satu.
/** Banyak simbol lewat pengurangan berulang; null bila tidak habis. */
const simbolMandiri = (nilai, skala) => {
  let sisa = nilai;
  let n = 0;
  while (sisa >= skala) {
    sisa -= skala;
    n += 1;
  }
  return sisa === 0 ? n : null;
};
const jumlahMandiri = (arr) => {
  let t = 0;
  for (let i = 0; i < arr.length; i += 1) t += arr[i];
  return t;
};
const indeksMaks = (arr) => {
  let m = 0;
  for (let i = 1; i < arr.length; i += 1) if (arr[i] > arr[m]) m = i;
  return m;
};
const indeksMin = (arr) => {
  let m = 0;
  for (let i = 1; i < arr.length; i += 1) if (arr[i] < arr[m]) m = i;
  return m;
};
/** Hasil susun mandiri: "tak-utuh", "tak-muat", atau daftar simbol. */
const susunMandiri = (nilai, skala) => {
  const s = nilai.map((v) => simbolMandiri(v, skala));
  if (s.some((v) => v === null)) return "tak-utuh";
  if (s.some((v) => v > A.MAKS_SIMBOL)) return "tak-muat";
  return s;
};

/* ------------------------------ Pengeja ------------------------------ */
{
  sama(EJ.ejaK4B6("8 × 4 = 32"), "delapan kali empat sama dengan tiga puluh dua", "eja kali");
  sama(EJ.ejaK4B6("32 − 12 = 20"), "tiga puluh dua dikurangi dua belas sama dengan dua puluh", "eja kurang");
  sama(EJ.ejaK4B6("● = 4"), "simbol sama dengan empat", "eja simbol");
  let ok = true;
  for (let n = 0; n <= 9999; n += 1) if (/\d/.test(EJ.kataBilK4B6(n))) ok = false;
  cek(ok, "kata bilangan sampai 9.999 tanpa angka");
}

/* ------------------------------ Data sama dengan buku (data-k4b6.ts) ------------------------------ */
{
  const nilaiDari = (ds) => ds.item.map((x) => x.nilai);
  sama(A.DATA_MAINAN.kategori.map((k) => k.nilai), nilaiDari(D.DS_MAINAN), "data mainan Karel sama dengan buku");
  sama(A.DATA_MAINAN.kategori.map((k) => k.label), D.DS_MAINAN.item.map((x) => x.label), "label mainan sama dengan buku");
  sama(A.DATA_WARNA.kategori.map((k) => k.nilai), nilaiDari(D.DS_WARNA), "data warna sama dengan buku");
  sama(A.DATA_KELAS.kategori.map((k) => k.nilai), nilaiDari(D.DS_KELAS_SKALA), "data siswa per kelas sama dengan buku");
  sama(A.DATA_BUKU.kategori.map((k) => k.nilai), nilaiDari(D.DS_BUKU).slice(0, 4), "data buku Senin sampai Kamis sama dengan buku");
  sama(A.DATA_BUKU.kategori.map((k) => k.label), D.DS_BUKU.item.slice(0, 4).map((x) => x.label), "hari buku sama");
  cek(jumlahMandiri(nilaiDari(D.DS_MAINAN)) === 23 && jumlahMandiri(nilaiDari(D.DS_WARNA)) === 12, "jumlah mainan 23 dan warna 12");
  for (const k of MS.KASUS_PIKTO) {
    const asal = { mainan: A.DATA_MAINAN, buku: A.DATA_BUKU, kelas: A.DATA_KELAS }[k.id];
    sama(k.baris.map((b) => [b.label, b.nilai]), asal.kategori.map((c) => [c.label, c.nilai]), `mesin ${k.id}: data sama dengan lab`);
  }
}

/* ------------------------------ Lab A: Piktogram ------------------------------ */
{
  cek(x0.pernah.length === 0 && x0.pesan === "" && x0.turus.catat.length === 0 && x0.susun.simbol.every((v) => v === 0), "awal Lab A: kosong, tanpa riwayat dan pesan");

  // Turus: urutan benda adalah permutasi data; banyak tiap kategori dihitung mandiri.
  for (const [i, d] of A.DATA_TURUS.entries()) {
    const urut = A.urutanBenda(d);
    const hitung = {};
    for (const b of urut) hitung[b] = (hitung[b] ?? 0) + 1;
    sama(d.kategori.map((k) => hitung[k.id] ?? 0), d.kategori.map((k) => k.nilai), `Turus ${d.id}: urutan benda memuat tepat data`);
    cek(urut.length === jumlahMandiri(d.kategori.map((k) => k.nilai)), `Turus ${d.id}: banyak benda = jumlah data`);
    let berurutan = 0;
    for (let j = 1; j < urut.length; j += 1) if (urut[j] === urut[j - 1]) berurutan += 1;
    cek(berurutan < urut.length / 2, `Turus ${d.id}: benda teracak (${berurutan} berurutan sama)`);
    const xs = L(x0, { t: "T_DATA", i });
    const benar = jalan(xs, L, [...urut.map((k) => ({ t: "T_CATAT", k })), { t: "T_CEK" }]);
    cek(benar.pernah.includes(`turus:${d.id}`) && benar.pesan.startsWith("✅"), `Turus ${d.id}: catat tepat diterima`);
    cek(benar.pesan.includes(`Semuanya ${urut.length}`), `Turus ${d.id}: jumlah disebut`);
    const lainId = (k) => d.kategori.find((c) => c.id !== k).id;
    const satuSalah = urut.map((k, j) => (j === 4 ? lainId(k) : k));
    const s1 = jalan(xs, L, [...satuSalah.map((k) => ({ t: "T_CATAT", k })), { t: "T_CEK" }]);
    cek(!s1.pernah.includes(`turus:${d.id}`) && /Ada 1 benda/.test(s1.pesan), `Turus ${d.id}: satu salah ditolak`);
    // Tukar dua benda beda kategori: banyak turus tetap cocok, tetapi ditolak.
    const j2 = urut.findIndex((k) => k !== urut[0]);
    const tukar = urut.map((k, j) => (j === 0 ? urut[j2] : j === j2 ? urut[0] : k));
    const s2 = jalan(xs, L, [...tukar.map((k) => ({ t: "T_CATAT", k })), { t: "T_CEK" }]);
    cek(!s2.pernah.includes(`turus:${d.id}`) && /tertukar/.test(s2.pesan), `Turus ${d.id}: benda tertukar ditolak walau banyaknya cocok`);
    const kurang = jalan(xs, L, [...urut.slice(0, -1).map((k) => ({ t: "T_CATAT", k })), { t: "T_CEK" }]);
    cek(!kurang.pernah.includes(`turus:${d.id}`) && /Masih 1 /.test(kurang.pesan), `Turus ${d.id}: satu belum dicatat ditolak`);
    const lebih = L(jalan(xs, L, urut.map((k) => ({ t: "T_CATAT", k }))), { t: "T_CATAT", k: urut[0] });
    cek(lebih.turus.catat.length === urut.length && lebih.pesan.length > 0, `Turus ${d.id}: tidak bisa mencatat lebih dari banyak benda`);
  }
  cek(L(x0, { t: "T_CATAT", k: "ungu" }) === x0, "Turus: kategori data lain diabaikan");
  cek(L(L(x0, { t: "T_CATAT", k: "mobil" }), { t: "T_DATA", i: 1 }).turus.catat.length === 0, "Turus: ganti data mengosongkan catatan");

  // Susun: hasil tiap data dan skala dibandingkan dengan hitungan mandiri.
  for (const [i, d] of A.DATA_SUSUN.entries()) {
    const nilai = d.kategori.map((k) => k.nilai);
    for (const s of A.SKALA) {
      const m = susunMandiri(nilai, s);
      const xs = jalan(x0, L, [{ t: "S_DATA", i }, { t: "S_SKALA", s }]);
      if (m === "tak-utuh" || m === "tak-muat") {
        const t = L(xs, { t: "S_CEK" });
        cek(t.pernah.includes(m) && !t.pernah.some((p) => p.startsWith("susun:")), `Susun ${d.id} skala ${s}: ${m}`);
      } else {
        const tambahSemua = m.flatMap((n, r) => Array.from({ length: n }, () => ({ t: "S_TAMBAH", r })));
        const ok = jalan(xs, L, [...tambahSemua, { t: "S_CEK" }]);
        cek(ok.pernah.includes(`susun:${d.id}:${s}`) && ok.pesan.startsWith("✅"), `Susun ${d.id} skala ${s}: simbol tepat diterima`);
        const kurangSatu = jalan(xs, L, [...tambahSemua.slice(1), { t: "S_CEK" }]);
        cek(!kurangSatu.pernah.includes(`susun:${d.id}:${s}`) && /1 baris/.test(kurangSatu.pesan), `Susun ${d.id} skala ${s}: satu simbol kurang ditolak`);
        const lebihSatu = jalan(xs, L, [...tambahSemua, { t: "S_TAMBAH", r: 0 }, { t: "S_CEK" }]);
        cek(!lebihSatu.pernah.includes(`susun:${d.id}:${s}`), `Susun ${d.id} skala ${s}: satu simbol lebih ditolak`);
        // Simbol sebanyak nilai tetapi keterangan lain: ditolak (lupa skala saat menyusun).
        for (const s2 of A.SKALA.filter((v) => v !== s)) {
          const t = jalan(x0, L, [{ t: "S_DATA", i }, { t: "S_SKALA", s: s2 }, ...tambahSemua, { t: "S_CEK" }]);
          cek(!t.pernah.includes(`susun:${d.id}:${s}`) && !t.pernah.includes(`susun:${d.id}:${s2}`), `Susun ${d.id}: simbol skala ${s} dengan keterangan ${s2} tidak diterima`);
        }
      }
    }
  }
  const hasil = Object.fromEntries(A.DATA_SUSUN.map((d) => [d.id, A.SKALA.map((s) => { const m = susunMandiri(d.kategori.map((k) => k.nilai), s); return typeof m === "string" ? m : "ok"; })]));
  sama(hasil, { warna: ["ok", "tak-utuh", "tak-utuh"], kelas: ["tak-muat", "tak-muat", "ok"], buku: ["tak-muat", "ok", "tak-utuh"] }, "Susun: hanya warna skala 1, kelas skala 4, buku skala 2 yang bisa");
  const penuh = jalan(x0, L, Array.from({ length: 12 }, () => ({ t: "S_TAMBAH", r: 0 })));
  cek(penuh.susun.simbol[0] === A.MAKS_SIMBOL && penuh.pesan.length > 0, "Susun: satu baris paling banyak sepuluh simbol");
  cek(L(x0, { t: "S_KURANG", r: 0 }) === x0 && L(x0, { t: "S_SKALA", s: 3 }) === x0 && L(x0, { t: "S_TAMBAH", r: 9 }) === x0, "Susun: aksi di luar batas diabaikan");

  // Baca: kunci dan semua pengecoh dihitung ulang mandiri.
  for (const [i, b] of A.DATA_BACA.entries()) {
    const d = b.data;
    const nilai = d.kategori.map((k) => k.nilai);
    const simbol = nilai.map((v) => simbolMandiri(v, b.skala));
    cek(simbol.every((v) => v !== null && v <= A.MAKS_SIMBOL), `Baca ${d.id}: piktogram utuh dan muat`);
    const iMaks = indeksMaks(nilai);
    const iMin = indeksMin(nilai);
    cek(nilai.filter((v) => v === nilai[iMaks]).length === 1 && nilai.filter((v) => v === nilai[iMin]).length === 1, `Baca ${d.id}: paling banyak dan paling sedikit tunggal`);
    const kunci = {
      terbanyak: d.kategori[iMaks].label,
      tersedikit: d.kategori[iMin].label,
      nilai: String(nilai[iMaks]),
      selisih: String(nilai[iMaks] - nilai[iMin]),
      total: String(jumlahMandiri(nilai)),
    };
    const soal = A.soalBaca(d, b.skala);
    for (const q of soal) {
      cek(q.benar === kunci[q.id], `Baca ${d.id}/${q.id}: kunci ${q.benar} = ${kunci[q.id]}`);
      cek(q.opsi.length === 3 && new Set(q.opsi).size === 3 && q.opsi.includes(q.benar), `Baca ${d.id}/${q.id}: tiga pilihan unik dengan kunci`);
      cek(q.opsi.filter((o) => o !== q.benar).every((o) => o !== kunci[q.id] && typeof q.salah[o] === "string" && q.salah[o].length > 10), `Baca ${d.id}/${q.id}: pengecoh salah dan dijelaskan`);
      cek(q.lupa.every((o) => q.opsi.includes(o) && o !== q.benar), `Baca ${d.id}/${q.id}: pengecoh lupa skala ada di pilihan`);
    }
    if (b.skala > 1) {
      const qn = soal.find((q) => q.id === "nilai");
      cek(qn.lupa.join() === String(simbol[iMaks]), `Baca ${d.id}: lupa skala = banyak simbol ${simbol[iMaks]}`);
      const qs = soal.find((q) => q.id === "selisih");
      cek(qs.lupa.join() === String(simbol[iMaks] - simbol[iMin]) && qs.opsi.includes(String(nilai[iMaks] + nilai[iMin])), `Baca ${d.id}: pengecoh selisih simbol dan jumlah`);
    }
    const posisi = soal.map((q) => q.opsi.indexOf(q.benar));
    if (soal.length > 2) cek(new Set(posisi).size === 3, `Baca ${d.id}: letak kunci bervariasi (${posisi.join("")})`);
    // Main: jawab semua benar berurutan.
    const xb = L(x0, { t: "B_DATA", i });
    const semua = jalan(xb, L, soal.map((q) => ({ t: "B_JAWAB", nilai: q.benar })));
    cek(soal.every((q) => semua.pernah.includes(`baca:${d.id}:${q.id}`)), `Baca ${d.id}: semua jawaban benar tercatat`);
    for (const [j, q] of soal.entries())
      for (const o of q.opsi.filter((v) => v !== q.benar)) {
        const t = jalan(xb, L, [{ t: "B_SOAL", i: j }, { t: "B_JAWAB", nilai: o }]);
        cek(!t.pernah.includes(`baca:${d.id}:${q.id}`) && t.pesan === q.salah[o] && !t.pesan.startsWith("✅"), `Baca ${d.id}/${q.id}: "${o}" ditolak`);
        cek(t.pernah.includes("lupa-skala") === q.lupa.includes(o), `Baca ${d.id}/${q.id}: "${o}" lupa skala tercatat tepat`);
      }
  }
  cek(L(x0, { t: "B_JAWAB", nilai: "999" }) === x0 && L(x0, { t: "B_SOAL", i: 9 }) === x0 && L(x0, { t: "B_DATA", i: 5 }) === x0, "Baca: aksi di luar batas diabaikan");

  // Fuzz.
  const acak = acakDari(61);
  let s = x0;
  let ok = true;
  const pesanSemua = new Set();
  const riwayatSemua = new Set();
  for (let i = 0; i < 20000; i += 1) {
    const p = acak(16);
    const kat = A.dataTurus(s).kategori;
    const q = A.soalAktif(s)[s.baca.ke];
    const a =
      p <= 3 ? (acak(5) === 0 ? { t: "T_CATAT", k: ["x", "ungu", "mobil"][acak(3)] } : { t: "T_CATAT", k: acak(3) === 0 ? A.bendaSekarang(s) ?? "mobil" : kat[acak(kat.length)].id }) :
      p === 4 ? (acak(10) === 0 ? { t: "T_ULANG" } : { t: "T_BATAL" }) :
      p === 5 ? { t: "T_CEK" } :
      p === 6 ? (acak(4) === 0 ? { t: "T_DATA", i: acak(3) } : { t: "PESAN_KOSONG" }) :
      p === 7 ? { t: "S_DATA", i: acak(4) } :
      p === 8 ? { t: "S_SKALA", s: [1, 2, 3, 4][acak(4)] } :
      p <= 10 ? { t: "S_TAMBAH", r: acak(7) } :
      p === 11 ? (acak(10) === 0 ? { t: "S_ULANG" } : { t: "S_KURANG", r: acak(7) }) :
      p === 12 ? { t: "S_CEK" } :
      p === 13 ? (acak(2) === 0 ? { t: "B_DATA", i: acak(3) } : { t: "B_SOAL", i: acak(5) }) :
      p === 14 ? { t: "B_JAWAB", nilai: acak(6) === 0 ? "x" : q.opsi[acak(3)] } :
      acak(40) === 0 ? { t: "RESET" } : { t: "S_CEK" };
    const t = L(s, a);
    if (a.t !== "RESET" && !s.pernah.every((v) => t.pernah.includes(v))) ok = false;
    const n = A.urutanBenda(A.dataTurus(t)).length;
    if (t.turus.catat.length > n || t.turus.catat.some((c) => !A.dataTurus(t).kategori.some((k) => k.id === c))) ok = false;
    if (t.susun.simbol.length !== A.dataSusun(t).kategori.length || t.susun.simbol.some((v) => v < 0 || v > A.MAKS_SIMBOL || !Number.isInteger(v))) ok = false;
    if (!A.SKALA.includes(t.susun.skala) || t.baca.ke < 0 || t.baca.ke >= A.soalAktif(t).length) ok = false;
    for (const id of t.pernah) if (!/^(turus:(mainan|warna)|susun:(warna|kelas|buku):(1|2|4)|tak-utuh|tak-muat|baca:(kelas|warna):(terbanyak|nilai|tersedikit|selisih|total)|lupa-skala)$/.test(id)) ok = false;
    if (t.pernah.includes("susun:warna:2") || t.pernah.includes("susun:kelas:1") || t.pernah.includes("susun:buku:4")) ok = false;
    if (t.pesan) pesanSemua.add(t.pesan);
    for (const id of t.pernah) riwayatSemua.add(id);
    s = t;
  }
  cek(ok, "fuzz 20.000 aksi Lab Piktogram: batas terjaga, riwayat tidak dicabut");
  cek(pesanSemua.size > 15 && [...pesanSemua].every(tanpaAngka), `fuzz Lab Piktogram: semua ${pesanSemua.size} pesan dieja menjadi kata`);
  cek(riwayatSemua.size > 5, `fuzz Lab Piktogram: riwayat terkumpul (${[...riwayatSemua].join(" ")})`);
  globalThis.__pesanA = [...pesanSemua];
}

/* ------------------------------ Mesin ------------------------------ */
{
  for (const def of MS.SEMUA_MESIN_K4B6) {
    cek(def.stasiun.length === 4 && def.kasus.length === 3, `${def.id}: empat stasiun, tiga kasus`);
    const lokal = [];
    for (const kasus of def.kasus) {
      cek(kasus.langkah.length === 4, `${def.id}/${kasus.id}: empat langkah`);
      kasus.langkah.forEach((l, i) => {
        cek(l.stasiun === def.stasiun[i].id, `${kasus.id}: stasiun ${i} berurutan`);
        cek(l.opsi.length === 3 && new Set(l.opsi).size === 3 && l.opsi.filter((o) => o === l.benar).length === 1, `${kasus.id}/${l.stasiun}: tiga pilihan unik dengan satu kunci`);
        cek(l.petunjuk.length > 20 && l.tanya.length > 5, `${kasus.id}/${l.stasiun}: tanya dan petunjuk ada`);
        cek(tanpaAngkaK3(l.tanya) && tanpaAngkaK3(l.petunjuk) && !/[°²³●]/.test(l.tanya + l.petunjuk), `${kasus.id}/${l.stasiun}: tanya dan petunjuk dapat dieja mesin`);
        lokal.push(l.opsi.indexOf(l.benar));
      });
      cek(tanpaAngkaK3(kasus.ringkas) && tanpaAngkaK3(kasus.nama) && !/[°²³●]/.test(kasus.ringkas + kasus.nama), `${def.id}/${kasus.id}: nama dan ringkas dieja menjadi kata`);
    }
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
  sama(MS.SEMUA_MESIN_K4B6.map((d) => d.selesaiId), [K6.ID_MESIN_K4B6.A], "selesaiId mesin sama dengan id misi");

  // Mesin Piktogram: kunci dan SEMUA pengecoh dihitung ulang mandiri.
  for (const k of MS.KASUS_PIKTO) {
    const kasus = MS.MESIN_PIKTOGRAM.kasus.find((c) => c.id === k.id);
    const [skala, simbol, nilai, banding] = kasus.langkah;
    const nilaiArr = k.baris.map((b) => b.nilai);
    const f = k.baris.find((b) => b.label === k.fokus);
    const bc = k.baris.find((b) => b.label === k.baca);
    const nf = simbolMandiri(f.nilai, k.skala);
    const nb = simbolMandiri(bc.nilai, k.skala);
    cek(k.baris.every((b) => simbolMandiri(b.nilai, k.skala) !== null && simbolMandiri(b.nilai, k.skala) <= A.MAKS_SIMBOL), `Mesin ${k.id}: piktogram utuh dan muat`);
    // Keterangan sah dicari mandiri dari pilihan lab: tepat satu yang utuh dan muat, dan itu skala kasus.
    const sahMandiri = A.SKALA.filter((s) => nilaiArr.every((v) => { const n = simbolMandiri(v, s); return n !== null && n <= A.MAKS_SIMBOL; }));
    cek(sahMandiri.length === 1 && sahMandiri[0] === k.skala, `Mesin ${k.id}: hanya skala ${k.skala} yang utuh dan muat (${sahMandiri.join(",")})`);
    cek(Number(skala.benar) === k.skala && skala.opsi.every((o) => o === skala.benar || !sahMandiri.includes(Number(o))), `Mesin ${k.id}: skala ${k.skala}; pengecoh tidak utuh atau tidak muat`);
    cek(nilaiArr.every((v) => skala.tanya.includes(String(v))), `Mesin ${k.id}: data lengkap di pertanyaan skala`);
    cek(Number(simbol.benar) === nf && simbol.opsi.every((o) => o === simbol.benar || Number(o) !== nf), `Mesin ${k.id}: ${nf} simbol; pengecoh salah`);
    if (k.skala > 1) cek(simbol.opsi.includes(String(f.nilai)), `Mesin ${k.id}: pengecoh simbol sebanyak nilai (lupa skala)`);
    let kali = 0;
    for (let j = 0; j < nb; j += 1) kali += k.skala;
    cek(bc.label !== f.label && nilai.tanya.includes(`${nb} simbol`), `Mesin ${k.id}: stasiun nilai membaca baris lain dari banyak simbol`);
    cek(Number(nilai.benar) === kali && nilai.opsi.every((o) => o === nilai.benar || Number(o) !== kali), `Mesin ${k.id}: nilai ${kali}; pengecoh salah`);
    if (k.skala > 1) cek(nilai.opsi.includes(String(nb)), `Mesin ${k.id}: pengecoh lupa skala ada`);
    let kunciB;
    if (k.banding === "terbanyak") kunciB = k.baris[indeksMaks(nilaiArr)].label;
    else if (k.banding === "selisih") kunciB = String(f.nilai - k.baris.find((b) => b.label === k.lawan).nilai);
    else kunciB = String(jumlahMandiri(nilaiArr));
    cek(banding.benar === kunciB && banding.opsi.every((o) => o === banding.benar || o !== kunciB), `Mesin ${k.id}: banding ${kunciB}; pengecoh salah`);
    if (k.banding !== "terbanyak") cek(banding.opsi.every((o) => o === banding.benar || Number(o) !== Number(kunciB)), `Mesin ${k.id}: pengecoh banding bukan kunci`);
    else cek(banding.opsi.every((o) => k.baris.some((b) => b.label === o)), `Mesin ${k.id}: pengecoh banding nama baris sah`);
  }
  sama(MS.KASUS_PIKTO.map((k) => k.skala), [1, 2, 4], "Mesin Piktogram: skala 1, 2, 4");
  const kasusKelas = MS.MESIN_PIKTOGRAM.kasus.find((c) => c.id === "kelas");
  cek(kasusKelas.langkah[3].opsi.includes("33") && kasusKelas.langkah[3].benar === "132", "Mesin Piktogram: total siswa 132, pengecoh 33 simbol");
  const kasusBuku = MS.MESIN_PIKTOGRAM.kasus.find((c) => c.id === "buku");
  cek(kasusBuku.langkah[3].opsi.includes("20") && kasusBuku.langkah[3].opsi.includes("4"), "Mesin Piktogram: pengecoh selisih (jumlah 20, selisih simbol 4)");
}

/* ------------------------------ Skenario ------------------------------ */
{
  const semua = [SK.SKENARIO_K4B6A];
  for (const def of semua) {
    cek(def.adegan.length >= 5 && def.adegan.length <= 8, `${def.id}: 5 sampai 8 adegan`);
    cek(def.adegan[0].jenis === "narasi" && def.adegan[def.adegan.length - 1].jenis === "akhir", `${def.id}: buka dan tutup`);
    cek(new Set(def.adegan.map((a) => a.jenis)).size >= 4, `${def.id}: paling sedikit empat jenis adegan`);
    for (const a of def.adegan.filter((x) => x.jenis === "soal")) for (const q of a.soal) cek(q.opsi.filter((o) => o !== q.jawaban).every((o) => Number(o) !== Number(q.jawaban)), `${def.id}/${a.id}: pengecoh salah (${q.teks})`);
    cek(def.adegan.every((a) => tanpaAngka(a.cerita)), `${def.id}: cerita dapat dieja`);
  }
  sama(semua.map((d) => d.id.replace(/-k4b6$/, "")), [K6.ID_SKENARIO_K4B6.A], "id skenario sesuai id misi");
  const adegan = (def, id) => def.adegan.find((a) => a.id === id);
  const S = SK.SKENARIO_K4B6A;
  const nilaiKelas = A.DATA_KELAS.kategori.map((k) => k.nilai);
  const nilaiMainan = A.DATA_MAINAN.kategori.map((k) => k.nilai);
  cek(adegan(S, "turus").jumlah === A.DATA_MAINAN.kategori.find((k) => k.id === "kelereng").nilai, "A: turus kelereng 9 (data buku)");
  // Keterangan yang sah: semua data habis dibagi dan baris terpanjang paling banyak sepuluh simbol.
  const sahSkala = (s) => nilaiKelas.every((v) => simbolMandiri(v, s) !== null && simbolMandiri(v, s) <= A.MAKS_SIMBOL);
  const opsiSkala = adegan(S, "skala").opsi;
  cek(opsiSkala.every((o) => o.benar === sahSkala(Number(/= (\d+)/.exec(o.teks)[1]))), "A: hanya keterangan yang utuh dan muat yang benar (dihitung)");
  cek(/28, 24, 32, 20, 16, dan 12/.test(adegan(S, "skala").cerita), "A: data siswa per kelas di cerita sama dengan buku");
  cek(adegan(S, "simbol").target === simbolMandiri(32, 4) && adegan(S, "simbol").target <= adegan(S, "simbol").maks, "A: Kelas 3 butuh 8 simbol (dihitung)");
  const baca = adegan(S, "baca").soal.map((q) => Number(q.jawaban));
  let lima4 = 0;
  for (let j = 0; j < 5; j += 1) lima4 += 4;
  sama(baca, [lima4, jumlahMandiri(nilaiMainan), nilaiMainan[indeksMaks(nilaiMainan)] - nilaiMainan[indeksMin(nilaiMainan)]], "A: 5 simbol skala 4, total mainan, selisih kelereng puzzle (dihitung)");
  cek(/6 \+ 4 \+ 3 \+ 1 \+ 9/.test(adegan(S, "baca").soal[1].teks), "A: rincian mainan sesuai buku");
  // Setiap "Kelas N ... M simbol" di skenario cocok dengan data buku (nilai = simbol × 4).
  const sebut = [...JSON.stringify(S).matchAll(/Kelas (\d) (?:ada|punya) (\d+) (simbol|siswa)/g)];
  cek(sebut.length >= 3, `A: skenario menyebut kelas dengan data (${sebut.length})`);
  for (const [, n, v, apa] of sebut) {
    const asli = A.DATA_KELAS.kategori[Number(n) - 1].nilai;
    cek(apa === "siswa" ? Number(v) === asli : simbolMandiri(asli, 4) === Number(v), `A: Kelas ${n} ${v} ${apa} sesuai data buku (${asli} siswa)`);
  }
  const k6 = /baris Kelas (\d)/.exec(adegan(S, "lupa").cerita);
  cek(k6 && simbolMandiri(A.DATA_KELAS.kategori[Number(k6[1]) - 1].nilai, 4) === 3, "A: kelas Putu memang tiga simbol");
  let tiga4 = 0;
  for (let j = 0; j < 3; j += 1) tiga4 += 4;
  cek(adegan(S, "lupa").opsi.find((o) => o.benar).teks === `3 × 4 = ${tiga4} siswa` && simbolMandiri(nilaiKelas[5], 4) === 3, "A: Kelas 6 tiga simbol = 12 siswa (dihitung)");
  const posisi = S.adegan.filter((a) => a.jenis === "pilih").map((a) => a.opsi.findIndex((o) => o.benar));
  cek(new Set(posisi).size === posisi.length, `A: letak jawaban pilih bervariasi (${posisi.join("")})`);
}

/* ------------------------------ Misi ------------------------------ */
{
  const huruf = ["A"];
  sama(Object.keys(TK.MISI_K4B6), huruf, "teks misi untuk A");
  sama(Object.keys(TK.NAMA_SIM_K4B6), huruf, "nama simulasi untuk A");
  cek(TK.hurufK4B6("Z") === "A" && TK.hurufK4B6("A") === "A", "huruf tak dikenal jatuh ke A");
  cek(TK.misiAwalK4Bab6("A").startsWith("Simulasi 1. Misi: ") && tanpaAngka(TK.misiAwalK4Bab6("A")), "misi awal dan dapat dieja");
  for (const h of huruf) {
    const daftar = K6.daftarMisiK4Bab6(h);
    cek(daftar.filter((m) => m.wajib).length === 7 && daftar.filter((m) => !m.wajib).length === 3, `${h}: tujuh misi wajib dan tiga tantangan bebas`);
    cek(new Set(daftar.map((m) => m.id)).size === 10 && daftar.every((m) => m.id.startsWith(`${h.toLowerCase()}-`)), `${h}: id misi unik berawalan huruf`);
    const kosong = [{ alat: "piktogram", pernah: [] }, sel("tidak-ada"), A.keadaanPiktoK4B6A(A.awalPiktoK4B6A())];
    cek(kosong.every((k) => M0.misiBaru(daftar, k, new Set()).length === 0), `${h}: keadaan awal alat tidak memenuhi misi mana pun`);
    cek(daftar.every((m) => m.teks.length > 20 && tanpaAngka(m.teks)), `${h}: teks misi jelas dan dapat dieja`);
    const baru = (k) => M0.misiBaru(daftar, k, new Set());
    cek(baru(sel(K6.ID_MESIN_K4B6[h])).join() === `${h.toLowerCase()}-mesin` && baru(sel(K6.ID_SKENARIO_K4B6[h])).join() === `${h.toLowerCase()}-skenario`, `${h}: id mesin dan skenario memenuhi misinya`);
  }
  cek(M0.misiBaru(K6.MISI_A, { alat: "batang", pernah: ["turus:mainan", "susun:kelas:4"] }, new Set()).length === 0, "A: riwayat alat lain tidak memenuhi misi A");

  // Jalur nyata lewat aksi lab, dan near-miss.
  const capai = (aksi) => M0.misiBaru(K6.MISI_A, A.keadaanPiktoK4B6A(jalan(A.awalPiktoK4B6A(), L, aksi)), new Set());
  const urutM = A.urutanBenda(A.DATA_MAINAN);
  cek(capai([...urutM.map((k) => ({ t: "T_CATAT", k })), { t: "T_CEK" }]).join() === "a-turus", "A: turus mainan tepat memenuhi");
  cek(capai([...urutM.map((k, j) => ({ t: "T_CATAT", k: j === 7 ? (k === "mobil" ? "robot" : "mobil") : k })), { t: "T_CEK" }]).length === 0, "A: turus dengan satu salah tidak memenuhi");
  cek(capai([{ t: "T_DATA", i: 1 }, ...A.urutanBenda(A.DATA_WARNA).map((k) => ({ t: "T_CATAT", k })), { t: "T_CEK" }]).length === 0, "A: turus warna bukan misi turus mainan");
  const susun = (i, s, nilai, ubah = () => 0) => [{ t: "S_DATA", i }, { t: "S_SKALA", s }, ...nilai.flatMap((v, r) => Array.from({ length: v / s + ubah(r) }, () => ({ t: "S_TAMBAH", r }))), { t: "S_CEK" }];
  const nW = A.DATA_WARNA.kategori.map((k) => k.nilai);
  const nK = A.DATA_KELAS.kategori.map((k) => k.nilai);
  const nB = A.DATA_BUKU.kategori.map((k) => k.nilai);
  cek(capai(susun(0, 1, nW)).join() === "a-warna", "A: piktogram warna skala 1 memenuhi");
  cek(capai(susun(0, 1, nW, (r) => (r === 3 ? -1 : 0))).length === 0, "A: piktogram warna dengan satu simbol kurang tidak memenuhi");
  cek(capai(susun(1, 4, nK)).join() === "a-kelas", "A: piktogram kelas skala 4 memenuhi");
  cek(capai(susun(1, 4, nK, (r) => (r === 2 ? 1 : 0))).length === 0, "A: piktogram kelas dengan satu simbol lebih tidak memenuhi");
  cek(capai([{ t: "S_DATA", i: 1 }, { t: "S_SKALA", s: 2 }, { t: "S_CEK" }]).length === 0, "A: kelas dengan skala 2 (tak muat) tidak memenuhi");
  cek(capai([...susun(2, 4, [0, 0, 0, 0]), ...susun(2, 2, nB)]).join() === "a-utuh", "A: tantangan buku skala 4 ditolak lalu skala 2");
  cek(capai(susun(2, 2, nB)).length === 0 && capai(susun(2, 4, [0, 0, 0, 0])).length === 0, "A: tantangan utuh butuh kedua langkah");
  const soalK = A.soalBaca(A.DATA_KELAS, 4);
  const jawab = (id, nilai) => [{ t: "B_SOAL", i: soalK.findIndex((q) => q.id === id) }, { t: "B_JAWAB", nilai }];
  const kunciK = (id) => soalK.find((q) => q.id === id).benar;
  cek(capai([...jawab("terbanyak", kunciK("terbanyak")), ...jawab("nilai", kunciK("nilai"))]).join() === "a-nilai", "A: kelas terbanyak dan nilainya memenuhi");
  cek(capai(jawab("nilai", kunciK("nilai"))).length === 0 && capai(jawab("terbanyak", kunciK("terbanyak"))).length === 0, "A: hanya salah satu (terbanyak atau nilai) tidak memenuhi");
  cek(capai([...jawab("terbanyak", kunciK("terbanyak")), ...jawab("nilai", "8")]).join() === "a-lupa", "A: nilai 8 (lupa skala) tidak memenuhi nilai, memenuhi tantangan lupa");
  cek(capai(jawab("selisih", kunciK("selisih"))).join() === "a-selisih" && kunciK("selisih") === "20", "A: selisih 20 memenuhi");
  cek(!capai(jawab("selisih", "44")).includes("a-selisih") && capai(jawab("selisih", "5")).join() === "a-lupa", "A: jumlah 44 dan selisih simbol 5 tidak memenuhi selisih");
  const soalW = A.soalBaca(A.DATA_WARNA, 1);
  cek(capai([{ t: "B_DATA", i: 1 }, { t: "B_SOAL", i: 1 }, { t: "B_JAWAB", nilai: "12" }]).join() === "a-total" && soalW[1].benar === "12", "A: tantangan total warna 12");
  cek(capai([{ t: "B_DATA", i: 1 }, { t: "B_SOAL", i: 1 }, { t: "B_JAWAB", nilai: "5" }]).length === 0, "A: total warna 5 (hanya merah) tidak memenuhi");

  // Gerbang.
  for (const h of huruf) {
    const daftar = M0.tampilMisi(K6.daftarMisiK4Bab6(h));
    const wajibIds = daftar.filter((m) => m.wajib).map((m) => m.id);
    cek(!M0.wajibSelesai(daftar, new Set(wajibIds.slice(0, 6))), `${h}: enam dari tujuh wajib belum membuka gerbang`);
    cek(M0.wajibSelesai(daftar, new Set(wajibIds)), `${h}: tujuh wajib membuka gerbang`);
    cek(M0.bolehLanjut({ adaMisi: true, wajibSelesai: false, dilewati: true, disentuh: true }) && !M0.bolehLanjut({ adaMisi: true, wajibSelesai: false, dilewati: true, disentuh: false }), "lewati hanya setelah disentuh");
  }
}

/* ------------------------------ Konsep tidak bocor antar sub-bab ------------------------------ */
{
  const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas4-bab6-ringkas.json", import.meta.url), "utf8"));
  const baca = (nama, ekstensi) => readFileSync(new URL(`../src/components/modul/${nama}.${ekstensi}`, import.meta.url), "utf8");
  const tanpaKomentar = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
  // Sub-Bab A (piktogram) tidak memakai istilah diagram batang (Sub-Bab B).
  const BOCOR_A = /(batang|sumbu|tegak|mendatar|tinggi)/i;
  // Kedua sub-bab tidak memakai konsep di luar bab.
  const LUAR_BAB = /(rata-rata|modus|median|diagram lingkaran|persen)/i;
  const catat = (teks, apa) => {
    for (const [pola, nama] of [[BOCOR_A, "konsep Sub-Bab B"], [LUAR_BAB, "konsep di luar bab"]]) {
      const m = pola.exec(teks);
      cek(!m, `A: ${apa} bebas ${nama} (${m ? m[0] : ""} di "${String(teks).slice(Math.max(0, (m?.index ?? 0) - 30), (m?.index ?? 0) + 40)}")`);
    }
  };
  for (const t of [TK.MISI_K4B6.A, TK.NAMA_SIM_K4B6.A, ...K6.MISI_A.map((m) => m.teks)]) catat(t, "teks misi");
  catat(JSON.stringify(MS.MESIN_PIKTOGRAM), "mesin");
  catat(JSON.stringify(SK.SKENARIO_K4B6A), "skenario");
  catat(JSON.stringify(ringkas.subBab.A), "peta dan infografis ringkas");
  catat(tanpaKomentar(baca("SimulasiLabPiktogramK4B6", "tsx")), "komponen lab (tanpa komentar)");
  catat(tanpaKomentar(baca("model-piktogram-k4b6", "tsx")), "model gambar (tanpa komentar)");
  catat(tanpaKomentar(baca("lab-piktogram-k4b6a", "ts")), "logika lab (tanpa komentar)");
  catat(tanpaKomentar(baca("SimulasiK4Bab6", "tsx")), "pembungkus (tanpa komentar)");
  for (const p of globalThis.__pesanA) catat(p, "pesan lab dari fuzz");
  for (const u of [A.ucapTurusK4B6A(x0), A.ucapSusunK4B6A(x0), A.ucapBacaK4B6A(x0)]) catat(u, "ucapan lab");

  // Kunci tidak bocor ke klien.
  for (const f of ["SimulasiLabPiktogramK4B6", "SimulasiK4Bab6", "model-piktogram-k4b6"]) {
    const s = baca(f, "tsx");
    cek(!/correct_index|explanation/.test(s), `${f}: tidak memuat correct_index atau explanation`);
    cek(!/fetch\(|XMLHttpRequest|api\/|openai|anthropic|gemini/i.test(s), `${f}: tanpa jaringan atau model bahasa`);
  }
  for (const f of ["lab-piktogram-k4b6a", "mesin-data-k4b6", "skenario-k4b6", "misi-k4bab6", "misi-teks-k4b6", "eja-k4b6"]) {
    const s = baca(f, "ts");
    cek(!/fetch\(|XMLHttpRequest|from "react"|openai|anthropic|gemini|correct_index|explanation/i.test(s), `${f}: murni`);
    const impor = s.match(/^import .+$/gm) ?? [];
    cek(impor.every((l) => l.startsWith("import type")), `${f}: hanya mengimpor tipe`);
  }
  for (const f of ["SimulasiLabPiktogramK4B6"]) {
    const s = baca(f, "tsx");
    cek(/useEffect\(\(\) => \{\s*onKeadaan\?\.\(keadaan\w+\(x\)\);\s*\}, \[onKeadaan, x\]\);/.test(s), `${f}: lapor keadaan lewat useEffect`);
    cek(/setLihat\(v\);\s*kirim\(\{ t: "PESAN_KOSONG" \}\);/.test(s), `${f}: ganti tampilan mengosongkan pesan`);
    const catatan = [...s.matchAll(/^\s*"([^"]+)",$/gm)].map((m) => m[1]);
    cek(catatan.length >= 4 && catatan.every(tanpaAngka), `${f}: Coba ini dapat dieja`);
  }
  // Semua ucapan lab dieja menjadi kata, di tiap data dan tiap pertanyaan.
  const ucapan = [];
  for (let i = 0; i < A.DATA_TURUS.length; i += 1) {
    const xt = L(x0, { t: "T_DATA", i });
    ucapan.push(A.ucapTurusK4B6A(xt), A.ucapTurusK4B6A(jalan(xt, L, A.urutanBenda(A.dataTurus(xt)).map((k) => ({ t: "T_CATAT", k })))));
  }
  for (let i = 0; i < A.DATA_SUSUN.length; i += 1) for (const s of A.SKALA) ucapan.push(A.ucapSusunK4B6A(jalan(x0, L, [{ t: "S_DATA", i }, { t: "S_SKALA", s }])));
  for (let i = 0; i < A.DATA_BACA.length; i += 1) {
    const xb = L(x0, { t: "B_DATA", i });
    for (let j = 0; j < A.soalAktif(xb).length; j += 1) ucapan.push(A.ucapBacaK4B6A(L(xb, { t: "B_SOAL", i: j })));
  }
  cek(ucapan.length > 15 && ucapan.every(tanpaAngka), `semua ${ucapan.length} ucapan lab dieja menjadi kata`);
  const pembungkus = baca("SimulasiK4Bab6", "tsx");
  const coba = [...pembungkus.matchAll(/"([^"]*\?)"/g)].map((m) => m[1]);
  cek(coba.length >= 3 && coba.every((t) => tanpaAngkaK3(t) && !/[°²³●]/.test(t)), "Coba ini mesin dapat dieja");
}

/* ------------------------------ Data ringkas ------------------------------ */
{
  const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas4-bab6-ringkas.json", import.meta.url), "utf8"));
  cek(ringkas.chapter_id === "mtk-4-bab6" && ringkas.phase_code === "FASE_B" && ringkas.grade === 4, "ringkas: id bab, fase, kelas");
  for (const h of Object.keys(ringkas.subBab)) {
    const s = ringkas.subBab[h];
    cek(!!s && s.peta.cabang.length === 4 && s.peta.kartu.length === 8 && s.infografis.panel.length === 3, `ringkas ${h}: empat cabang, delapan kartu, tiga panel`);
    cek(s.peta.cabang.every((c) => c.ringkas.split(/\s+/).length <= 8) && s.infografis.panel.every((p) => p.ide.split(/\s+/).length <= 8), `ringkas ${h}: ringkas cabang dan ide panel paling banyak delapan kata`);
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
  // Tabel warna dan angka mainan dihitung ulang dari data lab.
  const tabel = ringkas.subBab.A.infografis.panel[0].butir.find((b) => b.id === "tabel").visual.baris;
  sama(tabel, A.DATA_WARNA.kategori.map((k) => [k.label, k.nilai]), "ringkas A: tabel warna sesuai data");
  const nM = A.DATA_MAINAN.kategori.map((k) => k.nilai);
  const butirBaca = ringkas.subBab.A.infografis.panel[2].butir;
  cek(butirBaca.find((b) => b.id === "jumlah").visual.isi === `${nM.join(" + ")} = ${jumlahMandiri(nM)}`, "ringkas A: jumlah mainan dihitung");
  cek(butirBaca.find((b) => b.id === "selisih").visual.isi === `${nM[indeksMaks(nM)]} − ${nM[indeksMin(nM)]} = ${nM[indeksMaks(nM)] - nM[indeksMin(nM)]}`, "ringkas A: selisih kelereng dan puzzle dihitung");
  const banding = ringkas.subBab.A.infografis.panel[1].sisi;
  cek(banding[0].visual.isi === "4 × 1 = 4" && banding[1].visual.isi === `3 × 4 = ${3 * 4}` && simbolMandiri(12, 4) === 3, "ringkas A: banding skala dihitung");
  sama(Object.keys(ringkas.subBab), ["A"], "ringkas: gelombang ini hanya sub-bab A");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
