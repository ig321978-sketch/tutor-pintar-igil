// Uji Simulasi Kelas 4 Bab 6 (Piktogram dan Diagram Batang): pengeja, Lab Piktogram, Lab Batang, mesin, skenario, misi, gerbang,
// data ringkas, dan konsep Sub-Bab B tidak bocor ke Sub-Bab A.
// Jalankan: node --no-warnings scripts/uji-lab-k4b6.mjs
import { readFileSync } from "node:fs";
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K6 from "../src/components/modul/misi-k4bab6.ts";
import * as TK from "../src/components/modul/misi-teks-k4b6.ts";
import * as A from "../src/components/modul/lab-piktogram-k4b6a.ts";
import * as B from "../src/components/modul/lab-batang-k4b6b.ts";
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
  sama(B.DATA_TRANSPORT.kategori.map((k) => k.nilai), nilaiDari(D.DS_TRANSPORT), "data transportasi sama dengan buku");
  sama(B.DATA_TRANSPORT.kategori.map((k) => k.label), D.DS_TRANSPORT.item.map((x) => (x.label === "becak/lain" ? "lainnya" : x.label)), "label transportasi sama dengan buku (becak/lain ditulis lainnya)");
  sama(B.DATA_KELAS_B.kategori.map((k) => [k.label, k.nilai]), A.DATA_KELAS.kategori.map((k) => [k.label, k.nilai]), "data siswa per kelas B sama dengan A");
  sama(B.DATA_BUKU_B.kategori.map((k) => [k.label, k.nilai]), D.DS_BUKU.item.map((x) => [x.label, x.nilai]), "data buku dipinjam Senin sampai Sabtu sama dengan buku");
  for (const k of MS.KASUS_BATANG) {
    const asal = { transport: B.DATA_TRANSPORT, buku: B.DATA_BUKU_B, kelas: B.DATA_KELAS_B }[k.id];
    sama(k.baris.map((b) => [b.label, b.nilai]), asal.kategori.map((c) => [c.label, c.nilai]), `mesin batang ${k.id}: data sama dengan lab`);
    cek(k.namaKategori === asal.namaKategori && k.namaNilai === asal.namaNilai, `mesin batang ${k.id}: nama sumbu sama dengan lab`);
  }
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

/* ------------------------------ Lab B: Batang ------------------------------ */
{
  const LB = B.langkahBatangK4B6B;
  const y0 = B.awalBatangK4B6B();
  cek(y0.pernah.length === 0 && y0.pesan === "" && y0.bangun.tinggi.every((v) => v === 0) && y0.label.judul === null && y0.label.tegak === null && y0.label.datar === null && y0.banding.pilih.length === 0, "awal Lab B: kosong, tanpa riwayat dan pesan");
  cek(B.GARIS === 10 && JSON.stringify(B.SKALA_SUMBU) === "[1,2,4,5]", "Lab B: sepuluh garis, langkah 1, 2, 4, 5");

  // Bangun: muat atau tidak dihitung mandiri (penjumlahan berulang langkah sampai sepuluh garis).
  const puncakMandiri = (s) => {
    let p = 0;
    for (let g = 0; g < 10; g += 1) p += s;
    return p;
  };
  const hasilB = {};
  for (const [i, d] of B.DATA_BANGUN.entries()) {
    const nilai = d.kategori.map((k) => k.nilai);
    hasilB[d.id] = [];
    for (const s of B.SKALA_SUMBU) {
      const muat = nilai.every((v) => v <= puncakMandiri(s));
      hasilB[d.id].push(muat ? "ok" : "tak-muat");
      const xs = jalan(y0, LB, [{ t: "G_DATA", i }, { t: "G_SKALA", s }]);
      if (!muat) {
        const t = LB(xs, { t: "G_CEK" });
        cek(t.pernah.includes("tak-muat") && !t.pernah.some((p) => p.startsWith("bangun:")), `Bangun ${d.id} langkah ${s}: tidak muat ditolak`);
        continue;
      }
      // Dengan tombol satu-satu.
      const satu = nilai.flatMap((v, r) => Array.from({ length: v }, () => ({ t: "G_TAMBAH", r })));
      const ok = jalan(xs, LB, [...satu, { t: "G_CEK" }]);
      cek(ok.pernah.includes(`bangun:${d.id}:${s}`) && ok.pesan.startsWith("✅"), `Bangun ${d.id} langkah ${s}: batang tepat diterima`);
      // Dengan ketuk garis lalu sisa satu-satu.
      const garis = nilai.flatMap((v, r) => {
        let g = 0;
        let sisa = v;
        while (sisa >= s) {
          sisa -= s;
          g += 1;
        }
        return [{ t: "G_ATUR", r, garis: g }, ...Array.from({ length: sisa }, () => ({ t: "G_TAMBAH", r }))];
      });
      cek(jalan(xs, LB, [...garis, { t: "G_CEK" }]).pernah.includes(`bangun:${d.id}:${s}`), `Bangun ${d.id} langkah ${s}: lewat ketuk garis diterima`);
      const kurang = jalan(xs, LB, [...satu.slice(1), { t: "G_CEK" }]);
      cek(!kurang.pernah.includes(`bangun:${d.id}:${s}`) && /1 batang/.test(kurang.pesan), `Bangun ${d.id} langkah ${s}: satu batang kurang satu ditolak`);
      const lebih = jalan(xs, LB, [...satu, { t: "G_TAMBAH", r: 1 }, { t: "G_CEK" }]);
      cek(!lebih.pernah.includes(`bangun:${d.id}:${s}`), `Bangun ${d.id} langkah ${s}: satu batang lebih satu ditolak`);
      // Lupa langkah: garis sebanyak nilai tidak sama dengan nilai bila langkah lebih dari satu.
      if (s > 1) {
        const lupa = jalan(xs, LB, [...nilai.map((v, r) => ({ t: "G_ATUR", r, garis: Math.min(v, 10) })), { t: "G_CEK" }]);
        cek(!lupa.pernah.includes(`bangun:${d.id}:${s}`), `Bangun ${d.id} langkah ${s}: garis sebanyak nilai (lupa langkah) ditolak`);
      }
    }
  }
  sama(hasilB, { transport: ["ok", "ok", "ok", "ok"], kelas: ["tak-muat", "tak-muat", "ok", "ok"], buku: ["tak-muat", "ok", "ok", "ok"] }, "Bangun: muat tidaknya tiap langkah sesuai hitungan mandiri");
  const saranBuku = jalan(y0, LB, [{ t: "G_DATA", i: 2 }, { t: "G_SKALA", s: 4 }, ...B.DATA_BUKU_B.kategori.flatMap((k, r) => Array.from({ length: k.nilai }, () => ({ t: "G_TAMBAH", r }))), { t: "G_CEK" }]);
  cek(saranBuku.pernah.includes("bangun:buku:4") && /Langkah 2 juga memuat/.test(saranBuku.pesan), "Bangun: buku langkah 4 diterima dengan saran langkah 2");
  const puncak = jalan(y0, LB, Array.from({ length: 12 }, () => ({ t: "G_TAMBAH", r: 0 })));
  cek(puncak.bangun.tinggi[0] === 10 && puncak.pesan.length > 0, "Bangun: batang tidak melewati puncak sumbu");
  cek(jalan(y0, LB, [{ t: "G_SKALA", s: 4 }, { t: "G_ATUR", r: 0, garis: 9 }, { t: "G_SKALA", s: 1 }]).bangun.tinggi[0] === 10, "Bangun: ganti langkah memangkas batang ke puncak baru");
  cek(LB(y0, { t: "G_ATUR", r: 0, garis: 11 }) === y0 && LB(y0, { t: "G_SKALA", s: 3 }) === y0 && LB(y0, { t: "G_KURANG", r: 0 }) === y0 && LB(y0, { t: "G_DATA", i: 7 }) === y0, "Bangun: aksi di luar batas diabaikan");

  // Label: label benar dihitung mandiri dari arah (sumbu banyak searah batang).
  const labelMandiri = (d, arah) => {
    const searah = arah === "tegak" ? "tegak" : "datar";
    return searah === "tegak" ? { tegak: d.namaNilai, datar: d.namaKategori } : { tegak: d.namaKategori, datar: d.namaNilai };
  };
  for (const [i, { data: d }] of B.DATA_LABEL.entries()) {
    for (const arah of ["tegak", "mendatar"]) {
      const m = labelMandiri(d, arah);
      sama(B.labelBenar(d, arah), m, `Label ${d.id} ${arah}: kunci sama dengan hitungan mandiri`);
      cek(B.PILIHAN_LABEL.includes(m.tegak) && B.PILIHAN_LABEL.includes(m.datar) && B.PILIHAN_JUDUL.includes(d.judul), `Label ${d.id}: pilihan memuat kunci`);
      const xs = jalan(y0, LB, [{ t: "L_DATA", i }, { t: "L_ARAH", a: arah }]);
      const ok = jalan(xs, LB, [{ t: "L_JUDUL", v: d.judul }, { t: "L_TEGAK", v: m.tegak }, { t: "L_DATAR", v: m.datar }, { t: "L_CEK" }]);
      cek(ok.pernah.includes(`label:${d.id}:${arah}`) && ok.pesan.startsWith("✅"), `Label ${d.id} ${arah}: lengkap dan benar diterima`);
      const tukar = jalan(xs, LB, [{ t: "L_JUDUL", v: d.judul }, { t: "L_TEGAK", v: m.datar }, { t: "L_DATAR", v: m.tegak }, { t: "L_CEK" }]);
      cek(!tukar.pernah.includes(`label:${d.id}:${arah}`) && tukar.pernah.includes("tertukar") && /tertukar/.test(tukar.pesan), `Label ${d.id} ${arah}: sumbu tertukar ditolak`);
      const tanpaJudul = jalan(xs, LB, [{ t: "L_TEGAK", v: m.tegak }, { t: "L_DATAR", v: m.datar }, { t: "L_CEK" }]);
      cek(!tanpaJudul.pernah.some((p) => p.startsWith("label:")) && /judul/.test(tanpaJudul.pesan), `Label ${d.id} ${arah}: tanpa judul ditolak`);
      const satuKosong = jalan(xs, LB, [{ t: "L_JUDUL", v: d.judul }, { t: "L_TEGAK", v: m.tegak }, { t: "L_CEK" }]);
      cek(!satuKosong.pernah.some((p) => p.startsWith("label:")) && /sumbu datar/.test(satuKosong.pesan), `Label ${d.id} ${arah}: satu label sumbu kosong ditolak`);
      const judulLain = jalan(xs, LB, [{ t: "L_JUDUL", v: B.PILIHAN_JUDUL.find((j) => j !== d.judul) }, { t: "L_TEGAK", v: m.tegak }, { t: "L_DATAR", v: m.datar }, { t: "L_CEK" }]);
      cek(!judulLain.pernah.some((p) => p.startsWith("label:")), `Label ${d.id} ${arah}: judul lain ditolak`);
      const labelLain = B.PILIHAN_LABEL.find((v) => v !== m.tegak && v !== m.datar);
      const salah = jalan(xs, LB, [{ t: "L_JUDUL", v: d.judul }, { t: "L_TEGAK", v: labelLain }, { t: "L_DATAR", v: m.datar }, { t: "L_CEK" }]);
      cek(!salah.pernah.some((p) => p.startsWith("label:")), `Label ${d.id} ${arah}: label data lain ditolak`);
    }
    // Label tegak yang benar lalu diubah ke mendatar tanpa menukar label: ditolak.
    const m = labelMandiri(d, "tegak");
    const putarSaja = jalan(y0, LB, [{ t: "L_DATA", i }, { t: "L_JUDUL", v: d.judul }, { t: "L_TEGAK", v: m.tegak }, { t: "L_DATAR", v: m.datar }, { t: "L_ARAH", a: "mendatar" }, { t: "L_CEK" }]);
    cek(!putarSaja.pernah.includes(`label:${d.id}:mendatar`) && putarSaja.pernah.includes("tertukar"), `Label ${d.id}: diputar tanpa menukar label ditolak`);
  }
  cek(LB(y0, { t: "L_TEGAK", v: "x" }) === y0 && LB(y0, { t: "L_JUDUL", v: "x" }) === y0 && LB(y0, { t: "L_ARAH", a: "miring" }) === y0, "Label: pilihan di luar daftar diabaikan");

  // Banding: kunci dan semua pengecoh dihitung ulang mandiri.
  for (const [i, b] of B.DATA_BANDING.entries()) {
    const d = b.data;
    const nilai = d.kategori.map((k) => k.nilai);
    cek(nilai.every((v) => v <= puncakMandiri(b.skala)), `Banding ${d.id}: semua batang muat`);
    const xb = LB(y0, { t: "D_DATA", i });
    cek(B.tanyaAktif(xb) === null, `Banding ${d.id}: awal tanpa pertanyaan`);
    const periksa = (q, kunci, apa) => {
      cek(q.benar === String(kunci), `Banding ${d.id} ${apa}: kunci ${q.benar} = ${kunci}`);
      cek(q.opsi.length === 3 && new Set(q.opsi).size === 3 && q.opsi.includes(q.benar), `Banding ${d.id} ${apa}: tiga pilihan unik dengan kunci`);
      cek(q.opsi.every((o) => o === q.benar || (Number(o) !== kunci && Number.isInteger(Number(o)) && Number(o) >= 0 && q.salah[o]?.length > 10)), `Banding ${d.id} ${apa}: pengecoh bulat, salah, dan dijelaskan`);
    };
    for (let r = 0; r < nilai.length; r += 1) {
      const t = LB(xb, { t: "D_PILIH", r });
      const q = B.tanyaAktif(t);
      periksa(q, nilai[r], `nilai ${d.kategori[r].label}`);
      if (b.skala > 1 && simbolMandiri(nilai[r], b.skala) !== null) cek(q.lupa.includes(String(simbolMandiri(nilai[r], b.skala))), `Banding ${d.id}: lupa langkah = banyak garis ${d.kategori[r].label}`);
      const ok = LB(t, { t: "D_JAWAB", nilai: q.benar });
      cek(ok.pernah.includes(`banding:${d.id}:nilai:${d.kategori[r].id}`), `Banding ${d.id}: nilai ${d.kategori[r].label} tercatat`);
      for (let s2 = r + 1; s2 < nilai.length; s2 += 1) {
        const u = LB(t, { t: "D_PILIH", r: s2 });
        const qs = B.tanyaAktif(u);
        const kunci = nilai[r] > nilai[s2] ? nilai[r] - nilai[s2] : nilai[s2] - nilai[r];
        periksa(qs, kunci, `selisih ${d.kategori[r].label} ${d.kategori[s2].label}`);
        cek(qs.opsi.includes(String(nilai[r] + nilai[s2])), `Banding ${d.id}: pengecoh jumlah ada`);
        const balik = B.tanyaAktif(jalan(xb, LB, [{ t: "D_PILIH", r: s2 }, { t: "D_PILIH", r }]));
        cek(balik.kunci === qs.kunci && balik.benar === qs.benar, `Banding ${d.id}: urutan ketuk tidak mengubah selisih`);
      }
    }
    const qj = B.tanyaAktif(LB(xb, { t: "D_SEMUA" }));
    periksa(qj, jumlahMandiri(nilai), "jumlah");
    for (const o of qj.opsi.filter((v) => v !== qj.benar)) cek(LB(LB(xb, { t: "D_SEMUA" }), { t: "D_JAWAB", nilai: o }).pesan === qj.salah[o], `Banding ${d.id}: jumlah "${o}" dijelaskan`);
  }
  const iBuku = B.DATA_BANDING.findIndex((b) => b.data.id === "buku");
  const rab = B.DATA_BUKU_B.kategori.findIndex((k) => k.id === "rab");
  const sab = B.DATA_BUKU_B.kategori.findIndex((k) => k.id === "sab");
  const qRS = B.tanyaAktif(jalan(y0, LB, [{ t: "D_DATA", i: iBuku }, { t: "D_PILIH", r: rab }, { t: "D_PILIH", r: sab }]));
  cek(qRS.benar === "9" && qRS.kunci === "selisih:rab-sab" && qRS.opsi.includes("19"), "Banding: Rabu dan Sabtu selisih 9, pengecoh jumlah 19");
  const tiga = jalan(y0, LB, [{ t: "D_PILIH", r: 0 }, { t: "D_PILIH", r: 1 }, { t: "D_PILIH", r: 2 }]);
  sama(tiga.banding.pilih, [1, 2], "Banding: ketuk batang ketiga mengganti pilihan terlama");
  cek(LB(LB(y0, { t: "D_PILIH", r: 0 }), { t: "D_PILIH", r: 0 }).banding.pilih.length === 0, "Banding: ketuk lagi melepas pilihan");
  cek(LB(y0, { t: "D_JAWAB", nilai: "9" }) === y0 && LB(y0, { t: "D_PILIH", r: 9 }) === y0, "Banding: aksi di luar batas diabaikan");

  // Fuzz.
  const acak = acakDari(67);
  let s = y0;
  let ok = true;
  const pesanSemua = new Set();
  const riwayatSemua = new Set();
  for (let i = 0; i < 20000; i += 1) {
    const p = acak(18);
    const q = B.tanyaAktif(s);
    const a =
      p <= 1 ? { t: "G_DATA", i: acak(4) } :
      p === 2 ? { t: "G_SKALA", s: [1, 2, 3, 4, 5][acak(5)] } :
      p === 3 ? { t: "G_ATUR", r: acak(7), garis: acak(12) } :
      p <= 5 ? { t: "G_TAMBAH", r: acak(7) } :
      p === 6 ? (acak(10) === 0 ? { t: "G_ULANG" } : { t: "G_KURANG", r: acak(7) }) :
      p === 7 ? { t: "G_CEK" } :
      p === 8 ? (acak(3) === 0 ? { t: "L_DATA", i: acak(3) } : { t: "L_ARAH", a: ["tegak", "mendatar", "x"][acak(3)] }) :
      p === 9 ? { t: "L_JUDUL", v: [...B.PILIHAN_JUDUL, "x"][acak(4)] } :
      p === 10 ? { t: "L_TEGAK", v: [...B.PILIHAN_LABEL, "x"][acak(5)] } :
      p === 11 ? { t: "L_DATAR", v: [...B.PILIHAN_LABEL, "x"][acak(5)] } :
      p === 12 ? { t: "L_CEK" } :
      p === 13 ? (acak(3) === 0 ? { t: "D_DATA", i: acak(4) } : { t: "D_SEMUA" }) :
      p === 14 ? { t: "D_PILIH", r: acak(7) } :
      p === 15 ? { t: "D_JAWAB", nilai: q && acak(6) > 0 ? q.opsi[acak(3)] : "x" } :
      p === 16 ? { t: "PESAN_KOSONG" } :
      acak(40) === 0 ? { t: "RESET" } : { t: "G_CEK" };
    const t = LB(s, a);
    if (a.t !== "RESET" && !s.pernah.every((v) => t.pernah.includes(v))) ok = false;
    const maks = B.maksSumbu(t.bangun.skala);
    if (!B.SKALA_SUMBU.includes(t.bangun.skala) || t.bangun.tinggi.length !== B.dataBangun(t).kategori.length || t.bangun.tinggi.some((v) => !Number.isInteger(v) || v < 0 || v > maks)) ok = false;
    if (!["tegak", "mendatar"].includes(t.label.arah) || [t.label.tegak, t.label.datar].some((v) => v !== null && !B.PILIHAN_LABEL.includes(v)) || (t.label.judul !== null && !B.PILIHAN_JUDUL.includes(t.label.judul))) ok = false;
    if (t.banding.pilih.length > 2 || new Set(t.banding.pilih).size !== t.banding.pilih.length || t.banding.pilih.some((r) => r < 0 || r >= B.bandingAktif(t).data.kategori.length)) ok = false;
    if (t.banding.semua && t.banding.pilih.length > 0) ok = false;
    for (const id of t.pernah) if (!/^(bangun:(transport|kelas|buku):(1|2|4|5)|tak-muat|label:(transport|buku):(tegak|mendatar)|tertukar|banding:(buku|transport|kelas):(nilai:[a-z0-9]+|selisih:[a-z0-9]+-[a-z0-9]+|jumlah)|lupa-skala)$/.test(id)) ok = false;
    if (t.pernah.includes("bangun:kelas:1") || t.pernah.includes("bangun:kelas:2") || t.pernah.includes("bangun:buku:1")) ok = false;
    if (t.pesan) pesanSemua.add(t.pesan);
    for (const id of t.pernah) riwayatSemua.add(id);
    s = t;
  }
  cek(ok, "fuzz 20.000 aksi Lab Batang: batas terjaga, riwayat tidak dicabut");
  cek(pesanSemua.size > 15 && [...pesanSemua].every(tanpaAngka), `fuzz Lab Batang: semua ${pesanSemua.size} pesan dieja menjadi kata`);
  cek(riwayatSemua.size > 5, `fuzz Lab Batang: riwayat terkumpul (${[...riwayatSemua].join(" ")})`);
  globalThis.__pesanB = [...pesanSemua];
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
  sama(MS.SEMUA_MESIN_K4B6.map((d) => d.selesaiId), [K6.ID_MESIN_K4B6.A, K6.ID_MESIN_K4B6.B], "selesaiId mesin sama dengan id misi");

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

  // Mesin Batang: kunci dan SEMUA pengecoh dihitung ulang mandiri.
  for (const k of MS.KASUS_BATANG) {
    const kasus = MS.MESIN_BATANG.kasus.find((c) => c.id === k.id);
    const [sumbu, baca, banding, simpul] = kasus.langkah;
    const nilaiArr = k.baris.map((b) => b.nilai);
    const f = k.baris.find((b) => b.label === k.fokus);
    const g = simbolMandiri(f.nilai, k.skala);
    cek(g !== null && g <= 10 && nilaiArr.every((v) => v <= 10 * k.skala), `Mesin batang ${k.id}: ujung ${f.label} tepat di garis, semua muat`);
    const tegakMandiri = k.arah === "tegak" ? k.namaNilai : k.namaKategori;
    cek(sumbu.benar === tegakMandiri && sumbu.opsi.every((o) => o === sumbu.benar || o !== tegakMandiri), `Mesin batang ${k.id}: label sumbu tegak ${tegakMandiri}`);
    cek(sumbu.opsi.includes(k.arah === "tegak" ? k.namaKategori : k.namaNilai), `Mesin batang ${k.id}: pengecoh sumbu tertukar ada`);
    let kali = 0;
    for (let j = 0; j < g; j += 1) kali += k.skala;
    cek(Number(baca.benar) === kali && baca.opsi.every((o) => o === baca.benar || Number(o) !== kali) && baca.tanya.includes(`garis ke-${g}`), `Mesin batang ${k.id}: baca ${kali}; pengecoh salah`);
    if (k.skala > 1) cek(baca.opsi.includes(String(g)), `Mesin batang ${k.id}: pengecoh lupa langkah ada`);
    let kunciB;
    if (k.banding === "tertinggi") {
      kunciB = k.baris[indeksMaks(nilaiArr)].label;
      cek(banding.opsi.every((o) => k.baris.some((b) => b.label === o)), `Mesin batang ${k.id}: pengecoh nama batang sah`);
      cek(k.baris.every((b) => banding.tanya.includes(`${b.label} di garis ke-${simbolMandiri(b.nilai, k.skala)}`)), `Mesin batang ${k.id}: semua ujung batang disebut`);
    } else {
      const [a, b] = k.pasang.map((l) => k.baris.find((x) => x.label === l).nilai);
      kunciB = String(a > b ? a - b : b - a);
      cek(banding.opsi.includes(String(a + b)) && banding.opsi.every((o) => o === banding.benar || Number(o) !== Number(kunciB)), `Mesin batang ${k.id}: pengecoh selisih salah, jumlah ada`);
    }
    cek(banding.benar === kunciB, `Mesin batang ${k.id}: banding ${kunciB}`);
    cek(Number(simpul.benar) === f.nilai && simpul.opsi.every((o) => o === simpul.benar || Number(o) !== f.nilai), `Mesin batang ${k.id}: arah berubah, nilai tetap ${f.nilai}`);
    cek(simpul.tanya.includes(k.arah === "tegak" ? "mendatar" : "tegak"), `Mesin batang ${k.id}: simpulkan menyebut arah lawan`);
  }
  sama(MS.KASUS_BATANG.map((k) => [k.arah, k.skala]), [["tegak", 1], ["mendatar", 2], ["tegak", 4]], "Mesin Batang: tegak 1, mendatar 2, tegak 4");
}

/* ------------------------------ Skenario ------------------------------ */
{
  const semua = [SK.SKENARIO_K4B6A, SK.SKENARIO_K4B6B];
  for (const def of semua) {
    cek(def.adegan.length >= 5 && def.adegan.length <= 8, `${def.id}: 5 sampai 8 adegan`);
    cek(def.adegan[0].jenis === "narasi" && def.adegan[def.adegan.length - 1].jenis === "akhir", `${def.id}: buka dan tutup`);
    cek(new Set(def.adegan.map((a) => a.jenis)).size >= 4, `${def.id}: paling sedikit empat jenis adegan`);
    for (const a of def.adegan.filter((x) => x.jenis === "soal")) for (const q of a.soal) cek(q.opsi.filter((o) => o !== q.jawaban).every((o) => Number(o) !== Number(q.jawaban)), `${def.id}/${a.id}: pengecoh salah (${q.teks})`);
    cek(def.adegan.every((a) => tanpaAngka(a.cerita)), `${def.id}: cerita dapat dieja`);
  }
  sama(semua.map((d) => d.id.replace(/-k4b6$/, "")), [K6.ID_SKENARIO_K4B6.A, K6.ID_SKENARIO_K4B6.B], "id skenario sesuai id misi");
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

  // Skenario B dihitung ulang dari data.
  const T = SK.SKENARIO_K4B6B;
  const nT = B.DATA_TRANSPORT.kategori.map((k) => k.nilai);
  const nBk = B.DATA_BUKU_B.kategori.map((k) => k.nilai);
  let enam4 = 0;
  for (let j = 0; j < 6; j += 1) enam4 += 4;
  cek(adegan(T, "ubah").opsi.find((o) => o.benar).teks === `Sampai ${enam4}` && simbolMandiri(B.DATA_KELAS_B.kategori[1].nilai, 4) === 6 && /Kelas 2 punya 6 simbol/.test(adegan(T, "ubah").cerita), "B: Kelas 2 enam simbol = batang sampai 24 (dihitung)");
  cek(adegan(T, "ubah").opsi.filter((o) => !o.benar).every((o) => Number(/\d+/.exec(o.teks)[0]) !== enam4), "B: pengecoh ubah salah");
  cek(adegan(T, "garis").target === simbolMandiri(B.DATA_KELAS_B.kategori[3].nilai, 4) && /Kelas 4 punya 20/.test(adegan(T, "garis").cerita), "B: Kelas 4 dua puluh siswa = 5 garis (dihitung)");
  cek(adegan(T, "sumbu").opsi.find((o) => o.benar).teks.toLowerCase() === B.labelBenar(B.DATA_TRANSPORT, "tegak").tegak, "B: sumbu tegak diagram tegak = banyak siswa (dari labelBenar)");
  cek(/sumbu tegak/.test(adegan(T, "mendatar").opsi.find((o) => o.benar).teks) && B.labelBenar(B.DATA_BUKU_B, "mendatar").tegak === "hari", "B: hari di sumbu tegak pada diagram mendatar");
  const iRab = B.DATA_BUKU_B.kategori.findIndex((k) => k.id === "rab");
  const iSab = B.DATA_BUKU_B.kategori.findIndex((k) => k.id === "sab");
  sama(adegan(T, "baca").soal.map((q) => Number(q.jawaban)), [nT[indeksMaks(nT)] - nT[indeksMin(nT)], jumlahMandiri(nT), nBk[iRab] - nBk[iSab]], "B: selisih jalan kaki dan lainnya, jumlah transportasi, selisih Rabu dan Sabtu (dihitung)");
  cek(/8 \+ 5 \+ 7 \+ 3/.test(adegan(T, "baca").soal[1].teks) && /Rabu 14, Sabtu 5/.test(adegan(T, "baca").soal[2].teks), "B: rincian transportasi dan buku sesuai data");
  cek(/Hanya arah/.test(adegan(T, "arti").opsi.find((o) => o.benar).teks) && /Rabu tetap 14/.test(JSON.stringify(adegan(T, "arti"))), "B: mengubah arah tidak mengubah nilai");
  const posB = T.adegan.filter((a) => a.jenis === "pilih").map((a) => a.opsi.findIndex((o) => o.benar));
  cek(new Set(posB).size === 3, `B: letak jawaban pilih bervariasi (${posB.join("")})`);
}

/* ------------------------------ Misi ------------------------------ */
{
  const huruf = ["A", "B"];
  sama(Object.keys(TK.MISI_K4B6), huruf, "teks misi untuk A dan B");
  sama(Object.keys(TK.NAMA_SIM_K4B6), huruf, "nama simulasi untuk A dan B");
  cek(TK.hurufK4B6("Z") === "A" && TK.hurufK4B6("B") === "B", "huruf tak dikenal jatuh ke A");
  cek(huruf.every((h) => TK.misiAwalK4Bab6(h).startsWith("Simulasi 1. Misi: ") && tanpaAngka(TK.misiAwalK4Bab6(h))), "misi awal dan dapat dieja");
  cek(/Pencapaian Misi Bab/.test(TK.NAMA_SIM_K4B6.B) && /penutup bab/.test(TK.MISI_K4B6.B), "B: pencapaian misi bab");
  for (const h of huruf) {
    const daftar = K6.daftarMisiK4Bab6(h);
    cek(daftar.filter((m) => m.wajib).length === 7 && daftar.filter((m) => !m.wajib).length === 3, `${h}: tujuh misi wajib dan tiga tantangan bebas`);
    cek(new Set(daftar.map((m) => m.id)).size === 10 && daftar.every((m) => m.id.startsWith(`${h.toLowerCase()}-`)), `${h}: id misi unik berawalan huruf`);
    const kosong = [{ alat: "piktogram", pernah: [] }, { alat: "batang", pernah: [] }, sel("tidak-ada"), A.keadaanPiktoK4B6A(A.awalPiktoK4B6A()), B.keadaanBatangK4B6B(B.awalBatangK4B6B())];
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


  // Jalur nyata Sub-Bab B lewat aksi lab, dan near-miss.
  const LB = B.langkahBatangK4B6B;
  const capaiB = (aksi) => M0.misiBaru(K6.MISI_B, B.keadaanBatangK4B6B(jalan(B.awalBatangK4B6B(), LB, aksi)), new Set());
  cek(M0.misiBaru(K6.MISI_B, { alat: "piktogram", pernah: ["bangun:transport:1", "lupa-skala"] }, new Set()).length === 0, "B: riwayat alat lain tidak memenuhi misi B");
  const bangun = (i, s, ubah = () => 0) => [{ t: "G_DATA", i }, { t: "G_SKALA", s }, ...B.DATA_BANGUN[i].kategori.flatMap((k, r) => Array.from({ length: k.nilai + ubah(r) }, () => ({ t: "G_TAMBAH", r }))), { t: "G_CEK" }];
  cek(capaiB(bangun(0, 1)).join() === "b-transport", "B: diagram transportasi langkah 1 memenuhi");
  cek(capaiB(bangun(0, 2)).length === 0 && capaiB(bangun(0, 1, (r) => (r === 2 ? -1 : 0))).length === 0, "B: transportasi langkah 2 atau motor kurang satu tidak memenuhi");
  cek(capaiB(bangun(1, 4)).join() === "b-kelas", "B: diagram siswa per kelas langkah 4 memenuhi");
  cek(capaiB(bangun(1, 5)).length === 0 && capaiB([{ t: "G_DATA", i: 1 }, { t: "G_SKALA", s: 2 }, { t: "G_CEK" }]).length === 0, "B: kelas langkah 5 atau langkah 2 (tak muat) tidak memenuhi");
  cek(capaiB(bangun(1, 4, (r) => (r === 0 ? 1 : 0))).length === 0, "B: kelas dengan satu batang lebih satu tidak memenuhi");
  cek(capaiB(bangun(2, 2)).join() === "b-terkecil" && capaiB(bangun(2, 4)).length === 0, "B: tantangan buku langkah 2 (terkecil); langkah 4 tidak");
  const label = (i, arah, tegak, datar, judul = B.DATA_LABEL[i].data.judul) => [{ t: "L_DATA", i }, { t: "L_ARAH", a: arah }, { t: "L_JUDUL", v: judul }, { t: "L_TEGAK", v: tegak }, { t: "L_DATAR", v: datar }, { t: "L_CEK" }];
  cek(capaiB(label(0, "tegak", "banyak siswa", "alat transportasi")).join() === "b-label", "B: label transportasi tegak memenuhi");
  cek(capaiB(label(0, "tegak", "alat transportasi", "banyak siswa")).length === 0 && capaiB(label(0, "mendatar", "alat transportasi", "banyak siswa")).length === 0, "B: label tertukar atau transportasi mendatar tidak memenuhi label");
  cek(capaiB(label(1, "mendatar", "hari", "banyak buku")).join() === "b-mendatar", "B: buku mendatar dengan label benar memenuhi");
  cek(capaiB(label(1, "mendatar", "banyak buku", "hari")).length === 0 && capaiB(label(1, "tegak", "banyak buku", "hari")).length === 0, "B: buku mendatar dengan label tegak, atau buku tegak, tidak memenuhi");
  cek(capaiB(label(1, "mendatar", "hari", "banyak buku", "Alat transportasi")).length === 0, "B: judul salah tidak memenuhi");
  const iBk = B.DATA_BANDING.findIndex((b) => b.data.id === "buku");
  const idx = (id) => B.DATA_BUKU_B.kategori.findIndex((k) => k.id === id);
  const pilihJawab = (rs, pilihNilai) => {
    const aksi = [{ t: "D_DATA", i: iBk }, ...rs.map((r) => ({ t: "D_PILIH", r }))];
    const q = B.tanyaAktif(jalan(B.awalBatangK4B6B(), LB, aksi));
    return [...aksi, { t: "D_JAWAB", nilai: pilihNilai(q) }];
  };
  cek(capaiB(pilihJawab([idx("rab"), idx("sab")], (q) => q.benar)).join() === "b-selisih", "B: selisih Rabu dan Sabtu memenuhi");
  cek(capaiB(pilihJawab([idx("sab"), idx("rab")], (q) => q.benar)).join() === "b-selisih", "B: urutan ketuk Sabtu lalu Rabu juga memenuhi");
  cek(capaiB(pilihJawab([idx("rab"), idx("kam")], (q) => q.benar)).length === 0, "B: selisih Rabu dan Kamis tidak memenuhi");
  cek(capaiB(pilihJawab([idx("rab"), idx("sab")], () => "19")).length === 0, "B: jumlah 19 untuk selisih tidak memenuhi");
  cek(capaiB(pilihJawab([idx("rab")], () => "7")).join() === "b-lupa", "B: Rabu tujuh garis (lupa langkah) memenuhi tantangan lupa saja");
  const iTr = B.DATA_BANDING.findIndex((b) => b.data.id === "transport");
  cek(capaiB([{ t: "D_DATA", i: iTr }, { t: "D_SEMUA" }, { t: "D_JAWAB", nilai: "23" }]).join() === "b-total", "B: tantangan jumlah transportasi 23");
  cek(capaiB([{ t: "D_DATA", i: iTr }, { t: "D_SEMUA" }, { t: "D_JAWAB", nilai: "8" }]).length === 0, "B: jumlah 8 (hanya jalan kaki) tidak memenuhi");

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
  for (const p of globalThis.__pesanA) catat(p, "pesan lab dari fuzz");
  for (const u of [A.ucapTurusK4B6A(x0), A.ucapSusunK4B6A(x0), A.ucapBacaK4B6A(x0)]) catat(u, "ucapan lab");
  // Sub-Bab B (pencapaian bab) boleh memakai piktogram, tetapi tidak memakai konsep di luar bab.
  const catatB = (teks, apa) => {
    const m = LUAR_BAB.exec(teks);
    cek(!m, `B: ${apa} bebas konsep di luar bab (${m ? m[0] : ""})`);
  };
  for (const t of [TK.MISI_K4B6.B, TK.NAMA_SIM_K4B6.B, ...K6.MISI_B.map((m) => m.teks)]) catatB(t, "teks misi");
  catatB(JSON.stringify(MS.MESIN_BATANG), "mesin");
  catatB(JSON.stringify(SK.SKENARIO_K4B6B), "skenario");
  catatB(JSON.stringify(ringkas.subBab.B), "data ringkas");
  catatB(tanpaKomentar(baca("SimulasiLabBatangK4B6", "tsx")), "komponen lab");
  catatB(tanpaKomentar(baca("model-batang-k4b6", "tsx")), "model gambar");
  catatB(tanpaKomentar(baca("lab-batang-k4b6b", "ts")), "logika lab");
  catatB(tanpaKomentar(baca("SimulasiK4Bab6", "tsx")), "pembungkus");
  for (const p of globalThis.__pesanB) catatB(p, "pesan lab dari fuzz");

  // Kunci tidak bocor ke klien.
  for (const f of ["SimulasiLabPiktogramK4B6", "SimulasiLabBatangK4B6", "SimulasiK4Bab6", "model-piktogram-k4b6", "model-batang-k4b6"]) {
    const s = baca(f, "tsx");
    cek(!/correct_index|explanation/.test(s), `${f}: tidak memuat correct_index atau explanation`);
    cek(!/fetch\(|XMLHttpRequest|api\/|openai|anthropic|gemini/i.test(s), `${f}: tanpa jaringan atau model bahasa`);
  }
  for (const f of ["lab-piktogram-k4b6a", "lab-batang-k4b6b", "mesin-data-k4b6", "skenario-k4b6", "misi-k4bab6", "misi-teks-k4b6", "eja-k4b6"]) {
    const s = baca(f, "ts");
    cek(!/fetch\(|XMLHttpRequest|from "react"|openai|anthropic|gemini|correct_index|explanation/i.test(s), `${f}: murni`);
    const impor = s.match(/^import .+$/gm) ?? [];
    cek(impor.every((l) => l.startsWith("import type")), `${f}: hanya mengimpor tipe`);
  }
  for (const f of ["SimulasiLabPiktogramK4B6", "SimulasiLabBatangK4B6"]) {
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
  const LB = B.langkahBatangK4B6B;
  const yb = B.awalBatangK4B6B();
  for (let i = 0; i < B.DATA_BANGUN.length; i += 1) for (const s of B.SKALA_SUMBU) ucapan.push(B.ucapBangunK4B6B(jalan(yb, LB, [{ t: "G_DATA", i }, { t: "G_SKALA", s }])));
  for (let i = 0; i < B.DATA_LABEL.length; i += 1) for (const a of ["tegak", "mendatar"]) ucapan.push(B.ucapLabelK4B6B(jalan(yb, LB, [{ t: "L_DATA", i }, { t: "L_ARAH", a }])));
  for (let i = 0; i < B.DATA_BANDING.length; i += 1) {
    const xb = LB(yb, { t: "D_DATA", i });
    ucapan.push(B.ucapBandingK4B6B(xb), B.ucapBandingK4B6B(LB(xb, { t: "D_SEMUA" })), B.ucapBandingK4B6B(LB(xb, { t: "D_PILIH", r: 0 })), B.ucapBandingK4B6B(jalan(xb, LB, [{ t: "D_PILIH", r: 0 }, { t: "D_PILIH", r: 1 }])));
  }
  cek(ucapan.length > 40 && ucapan.every(tanpaAngka), `semua ${ucapan.length} ucapan lab dieja menjadi kata`);
  const pembungkus = baca("SimulasiK4Bab6", "tsx");
  const coba = [...pembungkus.matchAll(/"([^"]*\?)"/g)].map((m) => m[1]);
  cek(coba.length >= 6 && coba.every((t) => tanpaAngkaK3(t) && !/[°²³●]/.test(t)), "Coba ini mesin dapat dieja");
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
  // Ringkas B dihitung ulang dari data lab.
  const tabelB = ringkas.subBab.B.infografis.panel[0].butir.find((b) => b.id === "data").visual.baris;
  sama(tabelB, B.DATA_TRANSPORT.kategori.map((k) => [k.label, k.nilai]), "ringkas B: tabel transportasi sesuai data");
  const nT = B.DATA_TRANSPORT.kategori.map((k) => k.nilai);
  const nBk = B.DATA_BUKU_B.kategori.map((k) => k.nilai);
  const butirB = ringkas.subBab.B.infografis.panel[2].butir;
  cek(butirB.find((b) => b.id === "jumlah").visual.isi === `${nT.join(" + ")} = ${jumlahMandiri(nT)}`, "ringkas B: jumlah transportasi dihitung");
  cek(butirB.find((b) => b.id === "selisih").visual.isi === `${nBk[2]} − ${nBk[5]} = ${nBk[2] - nBk[5]}`, "ringkas B: selisih Rabu dan Sabtu dihitung");
  cek(butirB.find((b) => b.id === "terbanyak").visual.isi === `${B.DATA_TRANSPORT.kategori[indeksMaks(nT)].label} ${nT[indeksMaks(nT)]}`, "ringkas B: paling banyak dihitung");
  cek(ringkas.subBab.B.infografis.panel[0].butir.find((b) => b.id === "langkah").visual.isi === `7 × 2 = ${simbolMandiri(14, 2) * 2}` && simbolMandiri(14, 2) === 7, "ringkas B: tujuh garis langkah dua = Rabu empat belas");
  sama(Object.keys(ringkas.subBab), ["A", "B"], "ringkas: sub-bab A dan B");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
