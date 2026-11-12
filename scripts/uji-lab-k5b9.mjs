// Uji Simulasi Kelas 5 Bab 9 (Bilangan Cacah sampai 1.000.000): Lab Nilai Tempat (A), mesin, skenario, misi, gerbang, data ringkas, pengeja,
// dan konsep sub-bab berikutnya tidak bocor ke sub-bab sebelumnya.
// Jalankan: node --no-warnings scripts/uji-lab-k5b9.mjs
import { readFileSync } from "node:fs";
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K9 from "../src/components/modul/misi-k5bab9.ts";
import * as TK from "../src/components/modul/misi-teks-k5b9.ts";
import * as A from "../src/components/modul/lab-nilai-k5b9a.ts";
import * as MS from "../src/components/modul/mesin-nilai-k5b9.ts";
import * as SK from "../src/components/modul/skenario-k5b9.ts";
import * as ME from "../src/components/modul/mesin-bertahap-k3b1.ts";
import * as EJ from "../src/components/modul/eja-k5b9.ts";

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
const tanpaAngka = (t) => !/\d/.test(EJ.ejaK5B9(t));
const L = A.langkahNilaiK5B9A;
const x0 = A.awalNilaiK5B9A();

/* ------------------------------ Hitungan MANDIRI (cara berbeda) ------------------------------ */
// Kode memakai sisa pembagian dan potongan tiga digit. Di sini semuanya dihitung per digit dari teks, dengan tabel kata sendiri.
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
  if (n === 1000000) return "satu juta";
  const s = String(n).padStart(6, "0");
  const kiri = s.slice(0, 3);
  const kanan = s.slice(3);
  const bagianKiri = kiri === "001" ? "seribu" : Number(kiri) === 0 ? "" : `${tigaDigitMandiri(kiri)} ribu`;
  return [bagianKiri, tigaDigitMandiri(kanan)].filter(Boolean).join(" ");
};
const titikMandiri = (n) => {
  const s = String(n);
  const hasil = [];
  for (let i = s.length; i > 0; i -= 3) hasil.unshift(s.slice(Math.max(0, i - 3), i));
  return hasil.join(".");
};
const digitMandiri = (n) => Array.from(String(n).padStart(6, "0"), Number);
const TEMPAT = ["ratus ribuan", "puluh ribuan", "ribuan", "ratusan", "puluhan", "satuan"];
// Nilai tempat dari panjang nol: kolom ke-k dari kiri punya (5 - k) nol di belakang angka 1.
const nilaiTempatMandiri = (k) => Number("1" + "0".repeat(5 - k));
const RENCANA = [
  { nama: "harga lemari", n: 979875, kolom: 0, salah: (d) => { const t = [...d]; [t[0], t[1]] = [t[1], t[0]]; return t; } },
  { nama: "penduduk kecamatan", n: 720736, kolom: 1, salah: (d) => d.map((v, k) => (k === 4 ? 8 : v)) },
  { nama: "harga sepeda motor", n: 500040, kolom: 4, salah: (d) => { const t = [...d]; [t[3], t[4]] = [t[4], t[3]]; return t; } },
  { nama: "harga televisi", n: 408906, kolom: 2, salah: (d) => { const t = [...d]; [t[1], t[2]] = [t[2], t[1]]; return t; } },
  { nama: "jumlah penonton", n: 250015, kolom: 1, salah: (d) => d.map((v, k) => (k === 0 ? 5 : v)) },
  { nama: "harga laptop", n: 860209, kolom: 3, salah: (d) => { const t = [...d]; [t[3], t[4]] = [t[4], t[3]]; return t; } },
];

/* ------------------------------ Pengeja ------------------------------ */
{
  sama(EJ.ejaK5B9("979.875 + 1 = 979.876"), "sembilan ratus tujuh puluh sembilan ribu delapan ratus tujuh puluh lima ditambah satu sama dengan sembilan ratus tujuh puluh sembilan ribu delapan ratus tujuh puluh enam", "eja bilangan besar");
  sama(EJ.ejaK5B9("9 × 100.000 = 900.000"), "sembilan dikali seratus ribu sama dengan sembilan ratus ribu", "eja perkalian nilai tempat");
  sama(EJ.ejaK5B9("999.999 + 1 = 1.000.000"), "sembilan ratus sembilan puluh sembilan ribu sembilan ratus sembilan puluh sembilan ditambah satu sama dengan satu juta", "eja satu juta");
  sama(EJ.ejaK5B9("tidak ada angka."), "tidak ada angka.", "tanpa angka tetap");
  sama(EJ.ejaK5B9("(5 + 3)"), "kurung buka lima ditambah tiga kurung tutup", "eja kurung");
  sama(EJ.ejaK5B9("ada 14 jawaban."), "ada empat belas jawaban.", "eja kalimat berangka");
  sama(EJ.ejaK5B9("6 − 2 = 4"), "enam dikurangi dua sama dengan empat", "eja kurang");
  sama(EJ.ejaK5B9("6 ÷ 2 = 3"), "enam dibagi dua sama dengan tiga", "eja bagi");
  sama(EJ.ejaK5B9("5 ≥ 3"), "lima lebih besar atau sama dengan tiga", "eja lebih besar atau sama dengan");
  sama(EJ.ejaK5B9("3 ≤ 5"), "tiga lebih kecil atau sama dengan lima", "eja lebih kecil atau sama dengan");
  sama(EJ.ejaK5B9("3 ≠ 5"), "tiga tidak sama dengan lima", "eja tidak sama dengan");
  sama(EJ.ejaK5B9("3 ≈ 5"), "tiga kira-kira lima", "eja kira-kira");
  sama(EJ.ejaK5B9("3 < 5"), "tiga lebih kecil dari lima", "eja lebih kecil dari");
  sama(EJ.ejaK5B9("wait…"), "waittitik-titik", "eja titik-titik");
  let ok = true;
  for (let n = 1; n <= 1000000; n += 1) {
    const mandiri = bacaMandiri(n);
    if (EJ.kataK5B9(n) !== mandiri) {
      ok = false;
      console.log("beda eja", n, EJ.kataK5B9(n), mandiri);
      break;
    }
    if (n <= 999999 && (A.bacaLengkap(n) !== mandiri || MS.bacaMesin(n) !== mandiri)) {
      ok = false;
      console.log("beda baca", n, A.bacaLengkap(n), MS.bacaMesin(n), mandiri);
      break;
    }
    if (n <= 999999 && (A.titikRibuan(n) !== titikMandiri(n) || MS.titik(n) !== titikMandiri(n))) {
      ok = false;
      console.log("beda titik", n);
      break;
    }
  }
  cek(ok, "kata bilangan 1 sampai 1.000.000 sama di eja, lab, dan mesin dengan hitungan mandiri per digit");
  cek(EJ.kataK5B9(0) === "nol" && EJ.kataK5B9(-1) === "-1" && EJ.kataK5B9(1.5) === "1.5" && EJ.kataK5B9(1000001) === "1000001", "kata nol dan di luar jangkauan apa adanya");
  cek(A.kataKelompok(100) === "seratus" && A.kataKelompok(15) === "lima belas" && A.kataKelompok(40) === "empat puluh", "kata kelompok tiga digit");
  sama([A.digitEnam(979875), A.dariDigit([9, 7, 9, 8, 7, 5])], [[9, 7, 9, 8, 7, 5], 979875], "digit enam dan balik");
}

/* ------------------------------ Data sama dengan rencana ------------------------------ */
{
  sama(A.BILANGAN_A.map((b) => [b.nama, b.n, b.kolomNilai]), RENCANA.map((r) => [r.nama, r.n, r.kolom]), "enam bilangan sesuai rencana");
  sama([A.NAMA_TEMPAT, A.NILAI_TEMPAT, A.BANYAK_KOLOM], [TEMPAT, TEMPAT.map((_, k) => nilaiTempatMandiri(k)), 6], "enam kolom tempat dan nilai tempatnya");
  cek(A.BILANGAN_A.every((b) => b.n > 99999 && b.n < 1000000), "semua bilangan enam digit di bawah satu juta");
  cek(A.BILANGAN_A.every((b) => digitMandiri(b.n)[b.kolomNilai] >= 2), "angka yang ditanyakan nilainya bukan nol dan bukan satu");
  cek(A.BILANGAN_A.filter((b) => String(b.n).includes("0")).length >= 3, "banyak bilangan memuat nol penyangga");
  cek(A.BILANGAN_A.every((b) => A.kelompokKanan(b.n) !== 0), "kelompok kanan tidak nol (tiap bilangan punya dua kelompok untuk dibaca)");
}

/* ------------------------------ Lab A: Nilai Tempat ------------------------------ */
{
  sama(A.keadaanNilaiK5B9A(x0), { alat: "nilai", pernah: [] }, "keadaan awal");
  cek(x0.pernah.length === 0 && x0.pesan === "" && x0.baca.data === 0 && !x0.baca.kiri && x0.tabel.d.every((v) => v === -1) && !x0.nilai.tempat && !x0.nilai.tambah, "awal: kosong");

  // Baca.
  const posKiri = [];
  const posKanan = [];
  for (const [i, r] of RENCANA.entries()) {
    const kiriTeks = `${tigaDigitMandiri(String(r.n).slice(0, 3))} ribu`;
    const kananTeks = tigaDigitMandiri(String(r.n).slice(3));
    const ki = A.opsiKiri(i);
    const ka = A.opsiKanan(i);
    cek(new Set(ki.opsi).size === 3 && ki.opsi[ki.benar] === kiriTeks && ki.opsi.filter((o) => o === kiriTeks).length === 1, `Baca ${i}: kiri tiga pilihan unik, satu kunci ${kiriTeks}`);
    cek(new Set(ka.opsi).size === 3 && ka.opsi[ka.benar] === kananTeks && ka.opsi.filter((o) => o === kananTeks).length === 1, `Baca ${i}: kanan tiga pilihan unik, satu kunci ${kananTeks}`);
    // Pengecoh adalah dua digit tertukar dari kelompok, dihitung mandiri.
    const dg = (t) => String(t).padStart(3, "0").split("");
    const tukar = (teks, p, q) => { const a = dg(teks); [a[p], a[q]] = [a[q], a[p]]; return Number(a.join("")); };
    const kiriAsli = String(r.n).slice(0, 3);
    const kananAsli = String(r.n).slice(3);
    const calonKiri = [[0, 1], [1, 2], [0, 2]].map(([p, q]) => tukar(kiriAsli, p, q)).filter((v, k, a) => v !== Number(kiriAsli) && a.indexOf(v) === k);
    const calonKanan = [[0, 1], [1, 2], [0, 2]].map(([p, q]) => tukar(kananAsli, p, q)).filter((v, k, a) => v !== Number(kananAsli) && a.indexOf(v) === k);
    sama([...ki.opsi].sort(), [kiriTeks, ...calonKiri.slice(0, 2).map((v) => `${tigaDigitMandiri(String(v))} ribu`)].sort(), `Baca ${i}: pengecoh kiri dari digit tertukar`);
    sama([...ka.opsi].sort(), [kananTeks, ...calonKanan.slice(0, 2).map((v) => tigaDigitMandiri(String(v)))].sort(), `Baca ${i}: pengecoh kanan dari digit tertukar`);
    posKiri.push(ki.benar);
    posKanan.push(ka.benar);

    const awal = L(x0, { t: "B_DATA", i });
    cek(awal.baca.data === i && !awal.baca.kiri, `Baca ${i}: pilih bilangan`);
    const salahKiri = ki.opsi.findIndex((o) => o !== kiriTeks);
    const s1 = L(awal, { t: "B_KIRI", o: salahKiri });
    cek(!s1.baca.kiri && s1.pernah.length === 0 && !s1.pesan.startsWith("✅") && s1.pesan.length > 10, `Baca ${i}: kelompok kiri salah ditolak`);
    // Kanan sebelum kiri benar ditolak walaupun kunci kanan.
    const dulu = L(awal, { t: "B_KANAN", o: ka.opsi.indexOf(kananTeks) });
    cek(dulu.pernah.length === 0 && !dulu.pesan.startsWith("✅") && dulu.pesan.includes("kiri"), `Baca ${i}: kanan sebelum kiri ditolak`);
    const s2 = L(awal, { t: "B_KIRI", o: ki.opsi.indexOf(kiriTeks) });
    cek(s2.baca.kiri && s2.pesan.startsWith("✅") && s2.pernah.length === 0, `Baca ${i}: kiri benar belum menyelesaikan`);
    const s3 = L(s2, { t: "B_KANAN", o: ka.opsi.findIndex((o) => o !== kananTeks) });
    cek(s3.pernah.length === 0 && !s3.pesan.startsWith("✅"), `Baca ${i}: kanan salah ditolak`);
    const s4 = L(s2, { t: "B_KANAN", o: ka.opsi.indexOf(kananTeks) });
    sama(s4.pernah, [`baca:${i}`], `Baca ${i}: riwayat`);
    cek(s4.pesan.startsWith("✅") && s4.pesan.includes(bacaMandiri(r.n)) && s4.pesan.includes(titikMandiri(r.n)), `Baca ${i}: pesan memuat bacaan lengkap ${bacaMandiri(r.n)}`);
    // Ganti bilangan menghapus kemajuan kiri.
    cek(!L(s2, { t: "B_DATA", i: (i + 1) % 6 }).baca.kiri, `Baca ${i}: ganti bilangan mengulang dari kiri`);
  }
  cek(new Set(posKiri).size === 3 && new Set(posKanan).size === 3, `Baca: letak kunci bervariasi (${posKiri.join("")} / ${posKanan.join("")})`);

  // Tabel.
  const isiTabel = (i, digit = digitMandiri(RENCANA[i].n), periksa = true) => [{ t: "T_DATA", i }, ...digit.flatMap((d, k) => Array.from({ length: d + 1 }, () => ({ t: "T_UBAH", k, delta: 1 }))), ...(periksa ? [{ t: "T_PERIKSA" }] : [])];
  {
    const s0 = L(x0, { t: "T_UBAH", k: 0, delta: 1 });
    cek(s0.tabel.d[0] === 0 && s0.tabel.d.slice(1).every((v) => v === -1), "Tabel: tekan naik dari kosong menjadi 0");
    cek(L(x0, { t: "T_UBAH", k: 2, delta: -1 }).tabel.d[2] === 9, "Tabel: tekan turun dari kosong menjadi 9");
    cek(L(jalan(x0, L, Array(10).fill({ t: "T_UBAH", k: 1, delta: 1 })), { t: "T_UBAH", k: 1, delta: 1 }).tabel.d[1] === 0 && jalan(x0, L, Array(10).fill({ t: "T_UBAH", k: 1, delta: 1 })).tabel.d[1] === 9, "Tabel: 9 lalu naik kembali ke 0 (angka tidak lewat batas)");
    const kosongPeriksa = L(x0, { t: "T_PERIKSA" });
    cek(kosongPeriksa.pernah.length === 0 && kosongPeriksa.pesan.includes("kosong"), "Tabel: kolom kosong ditolak, nol harus diisi");
    for (const [i, r] of RENCANA.entries()) {
      const benar = digitMandiri(r.n);
      const s = jalan(x0, L, isiTabel(i));
      sama(s.tabel.d, benar, `Tabel ${i}: kolom terisi sesuai`);
      cek(s.pernah.includes(`tabel:${i}`) && s.pesan.startsWith("✅") && s.pesan.includes(bacaMandiri(r.n)) && s.pesan.includes(titikMandiri(r.n)), `Tabel ${i}: tabel benar dan dibaca ulang`);
      // Satu kolom salah.
      for (let k = 0; k < 6; k += 1) {
        const salah = benar.map((v, j) => (j === k ? (v + 1) % 10 : v));
        const sk = jalan(x0, L, isiTabel(i, salah));
        cek(sk.pernah.length === 0 && !sk.pesan.startsWith("✅") && sk.pesan.includes(TEMPAT[k]), `Tabel ${i}: kolom ${TEMPAT[k]} salah ditolak dan disebut`);
      }
      // Dua kolom bertetangga tertukar.
      for (let k = 0; k < 5; k += 1) {
        if (benar[k] === benar[k + 1]) continue;
        const t = [...benar];
        [t[k], t[k + 1]] = [t[k + 1], t[k]];
        const st = jalan(x0, L, isiTabel(i, t));
        cek(st.pernah.length === 0 && st.pesan.includes("tertukar") && st.pesan.includes(TEMPAT[k]) && st.pesan.includes(TEMPAT[k + 1]), `Tabel ${i}: kolom ${TEMPAT[k]} dan ${TEMPAT[k + 1]} tertukar disebut`);
      }
      // Nol dilupakan: digit nol diganti kosong.
      benar.forEach((v, k) => {
        if (v !== 0) return;
        const sn = jalan(x0, L, isiTabel(i, benar.map((w, j) => (j === k ? 0 : w)).map((w, j) => (j === k ? -1 : w)).map((w) => (w < 0 ? 0 : w)), false));
        const kosongkan = jalan(sn, L, [{ t: "T_PERIKSA" }]);
        cek(kosongkan.pernah.includes(`tabel:${i}`), `Tabel ${i}: nol yang diisi benar`);
      });
    }
    // Tabel teman.
    for (const [i, r] of RENCANA.entries()) {
      const benar = digitMandiri(r.n);
      const salah = r.salah(benar);
      sama(A.digitSalah(i), salah, `Tabel teman ${i}: digit salah dihitung mandiri`);
      const beda = salah.flatMap((v, k) => (v !== benar[k] ? [k] : []));
      cek(beda.length >= 1 && beda.length <= 2, `Tabel teman ${i}: ${beda.length} kolom berbeda`);
      cek(A.kolomBeda(salah, benar).join() === beda.join(), `Tabel teman ${i}: kolomBeda sama`);
      const bagus = jalan(x0, L, isiTabel(i));
      // Menunjuk sebelum tabel benar ditolak.
      const dini = L(L(x0, { t: "T_DATA", i }), { t: "T_TUNJUK", k: beda[0] });
      cek(dini.pernah.length === 0 && dini.pesan.includes("dulu"), `Tabel teman ${i}: menunjuk sebelum tabel benar ditolak`);
      // Menunjuk kolom yang benar (bukan salah) ditolak.
      for (let k = 0; k < 6; k += 1) if (!beda.includes(k)) {
        const t = L(bagus, { t: "T_TUNJUK", k });
        cek(t.pernah.length === 1 && t.tabel.tunjuk.length === 0 && t.pesan.includes("sudah benar"), `Tabel teman ${i}: kolom ${TEMPAT[k]} yang benar ditolak`);
      }
      // Menunjuk semua kolom salah menyelesaikan; sebagian belum.
      let t = bagus;
      beda.forEach((k, j) => {
        t = L(t, { t: "T_TUNJUK", k });
        cek(t.tabel.tunjuk.includes(k) && t.pernah.includes(`salah:${i}`) === (j === beda.length - 1), `Tabel teman ${i}: tunjuk kolom ${TEMPAT[k]} (${j + 1} dari ${beda.length})`);
      });
      cek(t.pesan.startsWith("✅") && t.pesan.includes(titikMandiri(r.n)), `Tabel teman ${i}: pesan akhir memuat bilangan benar`);
      // Menunjuk dua kali kolom yang sama tidak menggandakan.
      cek(L(L(bagus, { t: "T_TUNJUK", k: beda[0] }), { t: "T_TUNJUK", k: beda[0] }).tabel.tunjuk.length === 1, `Tabel teman ${i}: tunjuk ulang tidak menggandakan`);
    }
    cek(RENCANA.filter((r) => r.salah(digitMandiri(r.n)).some((v, k) => v !== digitMandiri(r.n)[k]) && A.kolomBeda(r.salah(digitMandiri(r.n)), digitMandiri(r.n)).length === 2).length === 4, "Tabel teman: empat tertukar (dua kolom) dan dua berganti (satu kolom)");
  }

  // Nilai.
  const posNilai = [];
  const posTempat = [];
  for (const [i, r] of RENCANA.entries()) {
    const d = digitMandiri(r.n)[r.kolom];
    const p = nilaiTempatMandiri(r.kolom);
    const nilai = d * p;
    const nl = A.opsiNilai(i);
    const tp = A.opsiTempat(i);
    cek(new Set(nl.opsi).size === 3 && nl.opsi[nl.benar] === nilai && nl.opsi.filter((v) => v === nilai).length === 1, `Nilai ${i}: tiga pilihan unik, satu kunci ${nilai}`);
    cek(nl.opsi.includes(d) && nl.opsi.includes(p), `Nilai ${i}: pengecoh angka saja dan nilai tempat saja`);
    cek(new Set(tp.opsi).size === 3 && tp.opsi[tp.benar] === TEMPAT[r.kolom] && tp.opsi.every((o) => TEMPAT.includes(o)), `Nilai ${i}: tempat ${TEMPAT[r.kolom]} dengan pengecoh tempat lain`);
    posNilai.push(nl.benar);
    posTempat.push(tp.benar);
    const a0 = L(x0, { t: "N_DATA", i });
    // Nilai sebelum tempat benar ditolak walaupun kunci.
    const dulu = L(a0, { t: "N_NILAI", o: nl.benar });
    cek(dulu.pernah.length === 0 && !dulu.nilai.tempat && dulu.pesan.includes("dulu"), `Nilai ${i}: nilai sebelum tempat ditolak`);
    const salahTempat = L(a0, { t: "N_TEMPAT", o: tp.opsi.findIndex((o) => o !== TEMPAT[r.kolom]) });
    cek(!salahTempat.nilai.tempat && salahTempat.pernah.length === 0 && !salahTempat.pesan.startsWith("✅"), `Nilai ${i}: tempat salah ditolak`);
    const a1 = L(a0, { t: "N_TEMPAT", o: tp.opsi.indexOf(TEMPAT[r.kolom]) });
    cek(a1.nilai.tempat && a1.pesan.startsWith("✅") && a1.pernah.length === 0, `Nilai ${i}: tempat benar`);
    for (const salah of [d, p]) {
      const sn = L(a1, { t: "N_NILAI", o: nl.opsi.indexOf(salah) });
      cek(sn.pernah.length === 0 && !sn.pesan.startsWith("✅"), `Nilai ${i}: nilai ${salah} salah ditolak`);
    }
    const a2 = L(a1, { t: "N_NILAI", o: nl.opsi.indexOf(nilai) });
    cek(a2.pernah.join() === `nilai:${i}` && a2.pesan.startsWith("✅") && a2.pesan.includes(`${d} × ${titikMandiri(p)} = ${titikMandiri(nilai)}`), `Nilai ${i}: ${d} × ${p} = ${nilai}`);
    cek(!L(a1, { t: "N_DATA", i: (i + 1) % 6 }).nilai.tempat, `Nilai ${i}: ganti bilangan mengulang dari tempat`);
  }
  cek(new Set(posNilai).size === 3 && new Set(posTempat).size === 3, `Nilai: letak kunci bervariasi (${posNilai.join("")} / ${posTempat.join("")})`);
  {
    const j0 = L(x0, { t: "N_JUTA", o: A.BENAR_JUTA });
    cek(j0.pernah.length === 0 && j0.pesan.includes("tambah"), "Juta: membaca sebelum tambah satu ditolak");
    const j1 = L(x0, { t: "N_TAMBAH" });
    cek(j1.nilai.tambah && j1.pesan.includes("1.000.000") && j1.pernah.length === 0, "Juta: tambah satu memunculkan satu juta");
    cek(A.OPSI_JUTA.length === 3 && new Set(A.OPSI_JUTA).size === 3 && A.OPSI_JUTA[A.BENAR_JUTA] === "satu juta" && A.OPSI_JUTA.includes("seratus ribu") && A.OPSI_JUTA.includes("sepuluh juta"), "Juta: tiga pilihan, kunci satu juta, pengecoh seratus ribu dan sepuluh juta");
    cek(EJ.kataK5B9(999999 + 1) === A.OPSI_JUTA[A.BENAR_JUTA] && 999999 + 1 === Number("1" + "0".repeat(6)), "Juta: 999.999 + 1 = satu juta (dihitung mandiri)");
    for (const o of [0, 2]) {
      const sj = L(j1, { t: "N_JUTA", o });
      cek(sj.pernah.length === 0 && !sj.pesan.startsWith("✅"), `Juta: ${A.OPSI_JUTA[o]} ditolak`);
    }
    const j2 = L(j1, { t: "N_JUTA", o: A.BENAR_JUTA });
    cek(j2.pernah.join() === "juta" && j2.pesan.startsWith("✅") && j2.pesan.includes("satu juta"), "Juta: satu juta benar");
    cek(L(j2, { t: "N_DATA", i: 3 }).nilai.tambah && L(j2, { t: "N_DATA", i: 3 }).pernah.includes("juta"), "Juta: ganti bilangan nilai tidak mencabut kemajuan satu juta");
  }

  // Indeks pecahan dan di luar batas diabaikan.
  {
    const bukan = [-1, 1.5, 99, NaN, undefined, "1"];
    let ok = true;
    const dasar = jalan(x0, L, [{ t: "B_KIRI", o: A.opsiKiri(0).benar }, ...isiTabel(0), { t: "N_DATA", i: 0 }, { t: "N_TEMPAT", o: A.opsiTempat(0).benar }, { t: "N_TAMBAH" }]);
    for (const v of [...bukan, 3, 6]) {
      const aksi = [{ t: "B_DATA", i: v }, { t: "T_DATA", i: v }, { t: "N_DATA", i: v }, { t: "T_UBAH", k: v, delta: 1 }, { t: "T_TUNJUK", k: v }, { t: "B_KIRI", o: v }, { t: "B_KANAN", o: v }, { t: "N_TEMPAT", o: v }, { t: "N_NILAI", o: v }, { t: "N_JUTA", o: v }];
      for (const a of aksi) {
        // 3 sah sebagai kolom dan sebagai nomor bilangan, tetapi di luar batas untuk pilihan (0 sampai 2); 6 di luar batas semuanya.
        if (v === 3 && (a.t === "T_UBAH" || a.t === "T_TUNJUK")) continue;
        if (v === 3 && a.i !== undefined) continue;
        const hasil = L(dasar, a);
        if (a.t === "T_UBAH" || a.t === "T_TUNJUK" || a.t.endsWith("_DATA")) {
          if (JSON.stringify(hasil) !== JSON.stringify(dasar)) ok = false;
        } else if (hasil.pernah.length !== dasar.pernah.length || hasil.nilai.tempat !== dasar.nilai.tempat || hasil.baca.kiri !== dasar.baca.kiri) ok = false;
      }
    }
    cek(ok, "indeks pecahan, negatif, di luar batas, bukan bilangan: diabaikan");
    cek(L(x0, { t: "T_UBAH", k: 0, delta: 2 }) === x0 && L(x0, { t: "T_UBAH", k: 0, delta: 0 }) === x0, "delta selain satu atau minus satu diabaikan");
    const r = L(jalan(x0, L, isiTabel(2)), { t: "RESET" });
    sama(r, A.awalNilaiK5B9A(), "reset kembali ke awal");
    cek(L({ ...x0, pesan: "x" }, { t: "PESAN_KOSONG" }).pesan === "", "pesan dikosongkan");
  }

  // Fuzz.
  {
    const acak = acakDari(20241113);
    let s = x0;
    let ok = true;
    const pesanSemua = new Set();
    const riwayatSemua = new Set();
    let kiriDiharap = false;
    const buat = () => {
      const r = acak(18);
      const b = s.baca.data;
      const t = s.tabel.data;
      const nd = s.nilai.data;
      if (r === 0) return { t: "B_DATA", i: acak(8) - 1 };
      if (r === 1) return { t: "B_KIRI", o: acak(5) - 1 };
      if (r === 2) return { t: "B_KIRI", o: A.opsiKiri(b).benar };
      if (r === 3) return { t: "B_KANAN", o: acak(3) === 0 ? acak(5) - 1 : A.opsiKanan(b).benar };
      if (r === 4) return acak(6) === 0 ? { t: "T_DATA", i: acak(8) - 1 } : { t: "T_PERIKSA" };
      if (r === 5 || r === 6) return { t: "T_UBAH", k: acak(7) - 1, delta: acak(5) - 2 };
      if (r === 7 || r === 8) {
        // Isi tabel mendekati benar.
        const benar = digitMandiri(RENCANA[t].n);
        const k = acak(6);
        const sekarang = s.tabel.d[k];
        return { t: "T_UBAH", k, delta: sekarang === benar[k] ? (acak(8) === 0 ? 1 : 1) : 1 };
      }
      if (r === 9) return { t: "T_TUNJUK", k: acak(8) - 1 };
      if (r === 10) {
        const beda = A.kolomBeda(A.digitSalah(t), digitMandiri(RENCANA[t].n));
        return { t: "T_TUNJUK", k: beda[acak(beda.length)] };
      }
      if (r === 11) return { t: "N_DATA", i: acak(8) - 1 };
      if (r === 12) return { t: "N_TEMPAT", o: acak(3) === 0 ? acak(5) - 1 : A.opsiTempat(nd).benar };
      if (r === 13) return { t: "N_NILAI", o: acak(3) === 0 ? acak(5) - 1 : A.opsiNilai(nd).benar };
      if (r === 14) return { t: "N_TAMBAH" };
      if (r === 15) return { t: "N_JUTA", o: acak(4) - 1 };
      if (r === 16) return acak(2) === 0 ? { t: "PESAN_KOSONG" } : acak(70) === 0 ? { t: "RESET" } : { t: "T_PERIKSA" };
      return { t: "N_JUTA", o: A.BENAR_JUTA };
    };
    // Tabel mendekati benar: tekan naik sampai sama, supaya periksa bisa benar sesekali.
    const isiBenarSesekali = () => {
      const benar = digitMandiri(RENCANA[s.tabel.data].n);
      let tmp = s;
      for (let k = 0; k < 6; k += 1) {
        let guard = 0;
        while (tmp.tabel.d[k] !== benar[k] && guard < 12) {
          tmp = L(tmp, { t: "T_UBAH", k, delta: 1 });
          guard += 1;
        }
      }
      return tmp;
    };
    for (let n = 0; n < 20000; n += 1) {
      let a = buat();
      if (n % 97 === 0) {
        s = isiBenarSesekali();
        a = { t: "T_PERIKSA" };
      }
      const sebelum = s;
      s = L(s, a);
      pesanSemua.add(s.pesan);
      // Orakel "kiri sudah benar": diturunkan mandiri dari aksi.
      if (a.t === "RESET" || a.t === "B_DATA") kiriDiharap = a.t === "B_DATA" && Number.isInteger(a.i) && a.i >= 0 && a.i < 6 ? false : a.t === "RESET" ? false : kiriDiharap;
      else if (a.t === "B_KIRI" && Number.isInteger(a.o) && a.o >= 0 && a.o < 3) {
        const teksKiri = `${tigaDigitMandiri(String(RENCANA[sebelum.baca.data].n).slice(0, 3))} ribu`;
        if (A.opsiKiri(sebelum.baca.data).opsi[a.o] === teksKiri) kiriDiharap = true;
      }
      if (s.baca.kiri !== kiriDiharap) ok = false;
      const batas =
        [s.baca.data, s.tabel.data, s.nilai.data].every((v) => Number.isInteger(v) && v >= 0 && v < 6) &&
        s.tabel.d.length === 6 && s.tabel.d.every((v) => Number.isInteger(v) && v >= -1 && v <= 9) &&
        new Set(s.tabel.tunjuk).size === s.tabel.tunjuk.length && s.tabel.tunjuk.every((k) => k >= 0 && k < 6 && A.kolomBeda(A.digitSalah(s.tabel.data), digitMandiri(RENCANA[s.tabel.data].n)).includes(k)) &&
        new Set(s.pernah).size === s.pernah.length;
      if (!batas) ok = false;
      if (a.t === "RESET") {
        if (s.pernah.length !== 0) ok = false;
        continue;
      }
      if (!sebelum.pernah.every((p) => s.pernah.includes(p))) ok = false;
      const baru = s.pernah.filter((p) => !sebelum.pernah.includes(p));
      if (baru.length > 1) ok = false;
      for (const b of baru) {
        const [alat, idx] = b.split(":");
        const i = Number(idx);
        riwayatSemua.add(alat);
        const r = RENCANA[i];
        if (alat === "baca") {
          const teksKanan = tigaDigitMandiri(String(r.n).slice(3));
          const benar = a.t === "B_KANAN" && sebelum.baca.data === i && sebelum.baca.kiri && A.opsiKanan(i).opsi[a.o] === teksKanan;
          if (!benar) ok = false;
        } else if (alat === "tabel") {
          if (!(a.t === "T_PERIKSA" && sebelum.tabel.data === i && JSON.stringify(sebelum.tabel.d) === JSON.stringify(digitMandiri(r.n)))) ok = false;
        } else if (alat === "salah") {
          const beda = digitMandiri(r.n).flatMap((v, k) => (r.salah(digitMandiri(r.n))[k] !== v ? [k] : []));
          if (!(a.t === "T_TUNJUK" && sebelum.tabel.data === i && sebelum.pernah.includes(`tabel:${i}`) && beda.includes(a.k) && beda.every((k) => s.tabel.tunjuk.includes(k)))) ok = false;
        } else if (alat === "nilai") {
          const nilai = digitMandiri(r.n)[r.kolom] * nilaiTempatMandiri(r.kolom);
          if (!(a.t === "N_NILAI" && sebelum.nilai.data === i && sebelum.nilai.tempat && A.opsiNilai(i).opsi[a.o] === nilai)) ok = false;
        } else if (alat === "juta") {
          if (!(a.t === "N_JUTA" && sebelum.nilai.tambah && a.o === 1)) ok = false;
        } else ok = false;
      }
    }
    cek(ok, "fuzz 20.000 aksi Lab Nilai Tempat: batas terjaga, riwayat tidak dicabut dan hanya bila tercapai (orakel mandiri)");
    cek(pesanSemua.size > 40 && [...pesanSemua].every(tanpaAngka), `fuzz Lab Nilai Tempat: semua ${pesanSemua.size} pesan dieja menjadi kata`);
    cek(riwayatSemua.size === 5, `fuzz Lab Nilai Tempat: riwayat terkumpul (${[...riwayatSemua].sort().join(" ")})`);
    globalThis.__pesanA = [...pesanSemua];
  }
}

/* ------------------------------ Mesin ------------------------------ */
{
  const def = MS.MESIN_NILAI;
  cek(def.stasiun.length === 4 && def.kasus.length === 3, `${def.id}: empat stasiun, tiga kasus`);
  sama(def.stasiun.map((s) => s.id), ["baca", "tulis", "tempat", "nilai"], "stasiun mesin");
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
  cek(new Set(posisi).size === 3, `${def.id}: letak kunci bervariasi (${posisi.join("")})`);
  let x = ME.awalMesin(def);
  let n = 0;
  while (!x.selesai && n < 100) {
    n += 1;
    const l = ME.langkahAktif(x);
    x = l ? ME.langkahMesin(x, { t: "JAWAB", nilai: l.benar }) : ME.langkahMesin(x, { t: "LANJUT" });
  }
  cek(x.selesai && def.selesaiId === K9.ID_MESIN_K5B9.A, `${def.id}: bisa diselesaikan, id selesai sesuai misi`);
  const y = ME.awalMesin(def);
  const l0 = ME.langkahAktif(y);
  const z = ME.langkahMesin(y, { t: "JAWAB", nilai: l0.opsi.find((o) => o !== l0.benar) });
  cek(z.ke === 0 && z.ditolak === 1 && z.pesan === l0.petunjuk, `${def.id}: jawaban salah ditolak dengan petunjuk`);

  const RENCANA_M = [
    { id: "lemari", n: 979875, angka: 7, kolomNilai: 2 },
    { id: "gianyar", n: 963000, angka: 6, kolomNilai: 0 },
    { id: "nol", n: 500040, angka: 4, kolomNilai: 4 },
  ];
  sama(MS.KASUS_NILAI.map((k) => [k.id, k.n, k.angkaTempat, k.kolomNilai]), RENCANA_M.map((r) => [r.id, r.n, r.angka, r.kolomNilai]), "Mesin: data tiga kasus sesuai rencana");
  for (const [i, r] of RENCANA_M.entries()) {
    const c = def.kasus[i];
    const [ba, tu, te, ni] = c.langkah;
    const d = digitMandiri(r.n);
    const asli = titikMandiri(r.n);
    // Baca: bacaan mandiri; pengecoh adalah bacaan dari bilangan pengecoh yang berbeda.
    cek(ba.benar === bacaMandiri(r.n) && ba.tanya.includes(asli), `Mesin ${r.id}: baca ${bacaMandiri(r.n)}`);
    // Tulis: nol atau tukar. Pengecoh dihitung mandiri dari teks.
    const teks = String(r.n);
    const lupaNol = teks.includes("0") ? Number(teks.replace("0", "")) : null;
    const tukarTetangga = [];
    for (let k = 0; k < 5; k += 1) {
      if (d[k] === d[k + 1]) continue;
      const t = [...d];
      [t[k], t[k + 1]] = [t[k + 1], t[k]];
      tukarTetangga.push(Number(t.join("")));
    }
    const calon = [...(lupaNol ? [lupaNol] : []), ...tukarTetangga].filter((v, k, a) => v > 0 && v !== r.n && a.indexOf(v) === k).slice(0, 2);
    sama([...tu.opsi].sort(), [asli, ...calon.map(titikMandiri)].sort(), `Mesin ${r.id}: pengecoh tulis (nol terlewat atau tertukar)`);
    sama([...ba.opsi].sort(), [bacaMandiri(r.n), ...calon.map(bacaMandiri)].sort(), `Mesin ${r.id}: pengecoh baca dari bilangan pengecoh`);
    cek(tu.benar === asli && tu.tanya.includes(bacaMandiri(r.n)) && !tu.tanya.includes(asli), `Mesin ${r.id}: tulis ${asli} tidak dibocorkan di soal`);
    cek(!ba.tanya.includes(bacaMandiri(r.n)), `Mesin ${r.id}: baca tidak membocorkan bacaan`);
    // Tempat: kemunculan pertama dari kiri.
    const kolom = d.indexOf(r.angka);
    cek(te.benar === TEMPAT[kolom] && te.tanya.includes(`angka ${r.angka} yang pertama dari kiri`) && te.opsi.every((o) => TEMPAT.includes(o)), `Mesin ${r.id}: angka ${r.angka} di ${TEMPAT[kolom]}`);
    cek(Math.abs(TEMPAT.indexOf(te.opsi.find((o) => o !== te.benar)) - kolom) <= 2, `Mesin ${r.id}: pengecoh tempat dekat dengan tempat benar`);
    // Nilai.
    const angka = d[r.kolomNilai];
    const p = nilaiTempatMandiri(r.kolomNilai);
    cek(angka >= 2 && ni.benar === titikMandiri(angka * p) && ni.tanya.includes(`angka ${angka} berada di tempat ${TEMPAT[r.kolomNilai]}`), `Mesin ${r.id}: nilai ${angka} × ${p} = ${angka * p}`);
    cek(ni.opsi.includes(titikMandiri(angka)) && ni.opsi.includes(titikMandiri(p)), `Mesin ${r.id}: pengecoh angka saja dan nilai tempat saja`);
    cek(!ni.tanya.includes(titikMandiri(angka * p)) || String(angka * p).length <= 2, `Mesin ${r.id}: soal nilai tidak membocorkan jawaban`);
    cek(EJ.ejaK5B9(c.ringkas).includes(EJ.kataK5B9(r.n)) && c.ringkas.includes(bacaMandiri(r.n)), `Mesin ${r.id}: ringkas memuat bacaan`);
  }
}

/* ------------------------------ Skenario ------------------------------ */
{
  const S = SK.SKENARIO_K5B9A;
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
  sama(S.id.replace(/-k5b9$/, ""), K9.ID_SKENARIO_K5B9.A, "id skenario sesuai id misi");
  const adegan = (id) => S.adegan.find((a) => a.id === id);
  const baca = adegan("baca");
  const kb = baca.opsi.filter((o) => o.benar);
  cek(kb.length === 1 && kb[0].teks === bacaMandiri(979875) && baca.cerita.includes("979.875"), "baca: 979.875 dibaca benar (hitungan mandiri)");
  cek(baca.opsi.length === 3 && new Set(baca.opsi.map((o) => o.teks)).size === 3, "baca: tiga pilihan unik");
  const digit = adegan("digit");
  cek(digit.jumlah === String(979875).length && digit.jumlah <= 12 && digit.sukses.includes("6 angka"), "digit: enam angka pada 979.875");
  const tempat = adegan("tempat");
  const d = digitMandiri(979875);
  cek(tempat.soal[0].jawaban === TEMPAT[d.indexOf(7)] && tempat.soal[1].jawaban === TEMPAT[d.indexOf(5)], "tempat: 7 di puluh ribuan, 5 di satuan");
  const nilai = adegan("nilai");
  cek(nilai.soal[0].jawaban === titikMandiri(9 * nilaiTempatMandiri(0)) && nilai.soal[1].jawaban === titikMandiri(7 * nilaiTempatMandiri(1)) && nilai.soal[1].teks.includes("7 × 10.000"), "nilai: 9 × 100.000 dan 7 × 10.000");
  cek(nilai.soal.every((q) => q.opsi.length === 3 && q.opsi.filter((o) => o === q.jawaban).length === 1), "nilai: tiga pilihan satu kunci");
  const nol = adegan("nol");
  cek(nol.cerita.includes(bacaMandiri(500040)) && nol.soal[0].jawaban === titikMandiri(500040) && nol.soal[0].opsi.includes("540") && nol.soal[0].opsi.includes("50.040"), "nol: lima ratus ribu empat puluh ditulis 500.040, pengecoh 540 dan 50.040");
  const juta = adegan("juta");
  cek(juta.opsi.filter((o) => o.benar).length === 1 && juta.opsi.find((o) => o.benar).teks === "satu juta" && 999999 + 1 === 1000000 && juta.cerita.includes("1.000.000"), "juta: 999.999 + 1 dibaca satu juta");
  const posisi = S.adegan.filter((a) => a.jenis === "pilih").map((a) => a.opsi.findIndex((o) => o.benar));
  cek(new Set(posisi).size === posisi.length, `letak jawaban pilih bervariasi (${posisi.join("")})`);
  for (const id of ["tempat", "nilai", "nol"]) {
    const ps = adegan(id).soal.map((q) => q.opsi.indexOf(q.jawaban));
    cek(ps.every((p) => p >= 0) && new Set(ps).size === ps.length, `letak jawaban soal ${id} bervariasi (${ps.join("")})`);
  }
  cek(S.adegan.filter((a) => a.jenis === "pilih").every((a) => a.opsi.length === 3 && a.opsi.filter((o) => o.benar).length === 1), "setiap pilih: tiga opsi, satu benar");
}

/* ------------------------------ Misi ------------------------------ */
{
  sama(Object.keys(TK.MISI_K5B9), ["A"], "teks misi untuk A");
  sama(Object.keys(TK.NAMA_SIM_K5B9), ["A"], "nama simulasi untuk A");
  cek(TK.hurufK5B9("Z") === "A" && TK.hurufK5B9("A") === "A", "huruf tak dikenal jatuh ke A");
  cek(TK.misiAwalK5Bab9("A").startsWith("Simulasi 1. Misi: ") && tanpaAngka(TK.misiAwalK5Bab9("A")), "misi awal dan dapat dieja");
  const daftar = K9.daftarMisiK5Bab9("A");
  cek(K9.daftarMisiK5Bab9("Z") === K9.MISI_A, "huruf tak dikenal memakai misi A");
  cek(daftar.filter((m) => m.wajib).length === 7 && daftar.filter((m) => !m.wajib).length === 3, "A: tujuh misi wajib dan tiga tantangan bebas");
  cek(new Set(daftar.map((m) => m.id)).size === 10 && daftar.every((m) => m.id.startsWith("a-")), "A: id misi unik berawalan huruf");
  const kosong = [{ alat: "nilai", pernah: [] }, { alat: "lain", pernah: [] }, sel("tidak-ada"), A.keadaanNilaiK5B9A(A.awalNilaiK5B9A())];
  cek(kosong.every((k) => M0.misiBaru(daftar, k, new Set()).length === 0), "A: keadaan awal alat tidak memenuhi misi mana pun");
  cek(daftar.every((m) => m.teks.length > 20 && tanpaAngka(m.teks)), "A: teks misi jelas dan dapat dieja");
  const baru = (k) => M0.misiBaru(daftar, k, new Set());
  cek(baru(sel(K9.ID_MESIN_K5B9.A)).join() === "a-mesin" && baru(sel(K9.ID_SKENARIO_K5B9.A)).join() === "a-skenario", "A: id mesin dan skenario memenuhi misinya");
  cek(baru({ alat: "lain", pernah: ["baca:0", "baca:2", "tabel:0", "salah:0", "nilai:0", "juta"] }).length === 0, "A: riwayat alat lain tidak memenuhi misi A");

  const capai = (aksi) => baru(A.keadaanNilaiK5B9A(jalan(A.awalNilaiK5B9A(), L, aksi)));
  const kiriO = (i) => A.opsiKiri(i).opsi.indexOf(`${tigaDigitMandiri(String(RENCANA[i].n).slice(0, 3))} ribu`);
  const kananO = (i) => A.opsiKanan(i).opsi.indexOf(tigaDigitMandiri(String(RENCANA[i].n).slice(3)));
  const bacaSemua = (i) => [{ t: "B_DATA", i }, { t: "B_KIRI", o: kiriO(i) }, { t: "B_KANAN", o: kananO(i) }];
  const isiTabel = (i, digit = digitMandiri(RENCANA[i].n)) => [{ t: "T_DATA", i }, ...digit.flatMap((d, k) => Array.from({ length: d + 1 }, () => ({ t: "T_UBAH", k, delta: 1 }))), { t: "T_PERIKSA" }];
  const tunjuk = (i) => {
    const benar = digitMandiri(RENCANA[i].n);
    const salah = RENCANA[i].salah(benar);
    return [...isiTabel(i), ...salah.flatMap((v, k) => (v !== benar[k] ? [{ t: "T_TUNJUK", k }] : []))];
  };
  const nilaiSemua = (i) => {
    const r = RENCANA[i];
    const nilai = digitMandiri(r.n)[r.kolom] * nilaiTempatMandiri(r.kolom);
    return [{ t: "N_DATA", i }, { t: "N_TEMPAT", o: A.opsiTempat(i).opsi.indexOf(TEMPAT[r.kolom]) }, { t: "N_NILAI", o: A.opsiNilai(i).opsi.indexOf(nilai) }];
  };
  const juta = [{ t: "N_TAMBAH" }, { t: "N_JUTA", o: A.BENAR_JUTA }];

  cek(capai(bacaSemua(0)).join() === "a-baca", "A: baca 979.875 memenuhi a-baca");
  cek(capai(bacaSemua(2)).join() === "a-baca-nol", "A: baca 500.040 memenuhi a-baca-nol");
  cek(capai([...bacaSemua(0), ...bacaSemua(2)]).join() === "a-baca,a-baca-nol", "A: dua bacaan memenuhi dua misi");
  cek(capai([...bacaSemua(1), ...bacaSemua(3)]).length === 0, "A: bacaan bilangan lain tidak memenuhi misi wajib");
  cek(capai(bacaSemua(0).slice(0, 2)).length === 0, "A: kelompok kiri saja belum memenuhi");
  cek(capai([{ t: "B_DATA", i: 0 }, { t: "B_KANAN", o: kananO(0) }]).length === 0, "A: kanan tanpa kiri tidak memenuhi");
  cek(capai(isiTabel(0)).join() === "a-tabel", "A: tabel 979.875 memenuhi a-tabel");
  cek(capai(isiTabel(1)).length === 0 && capai(isiTabel(2)).length === 0, "A: tabel bilangan lain tidak memenuhi");
  cek(capai(isiTabel(0, digitMandiri(979875).map((v, k) => (k === 0 ? 7 : k === 1 ? 9 : v)))).length === 0, "A: tabel dengan puluh ribuan tertukar ratus ribuan tidak memenuhi");
  cek(capai(isiTabel(0, [9, 7, 9, 8, 7, 4])).length === 0, "A: tabel dengan satu kolom kurang tidak memenuhi");
  cek(capai(tunjuk(0)).join() === "a-tabel,a-salah", "A: dua kolom tertukar ditunjuk memenuhi a-salah");
  cek(capai([...isiTabel(0), { t: "T_TUNJUK", k: 0 }]).join() === "a-tabel", "A: baru satu dari dua kolom salah belum memenuhi a-salah");
  cek(capai([...isiTabel(0), { t: "T_TUNJUK", k: 3 }]).join() === "a-tabel", "A: menunjuk kolom yang benar tidak memenuhi a-salah");
  cek(capai([{ t: "T_DATA", i: 0 }, { t: "T_TUNJUK", k: 0 }, { t: "T_TUNJUK", k: 1 }]).length === 0, "A: menunjuk sebelum tabel benar tidak memenuhi");
  cek(capai(tunjuk(3)).join() === "", "A: tabel teman bilangan lain tidak memenuhi a-salah");
  cek(capai(nilaiSemua(0)).join() === "", "A: nilai tanpa satu juta belum memenuhi a-nilai");
  cek(capai(juta).join() === "", "A: satu juta tanpa nilai belum memenuhi a-nilai");
  cek(capai([...nilaiSemua(0), ...juta]).join() === "a-nilai", "A: nilai 900.000 dan satu juta memenuhi a-nilai");
  cek(capai([...nilaiSemua(1), ...juta]).join() === "", "A: nilai bilangan lain tidak memenuhi a-nilai");
  cek(capai([{ t: "N_DATA", i: 0 }, { t: "N_NILAI", o: A.opsiNilai(0).benar }, ...juta]).length === 0, "A: nilai tanpa tempat tidak memenuhi");
  // Tantangan.
  cek(capai([0, 1, 2, 3, 4, 5].flatMap(bacaSemua)).join() === "a-baca,a-baca-nol,a-baca-semua", "A: keenam bacaan memenuhi dua misi dan tantangan");
  cek(capai([0, 1, 2, 3, 4].flatMap(bacaSemua)).join() === "a-baca,a-baca-nol", "A: lima bacaan belum memenuhi tantangan");
  cek(capai([0, 1, 2, 3, 4, 5].flatMap(tunjuk)).join() === "a-tabel,a-salah,a-tabel-semua", "A: keenam tabel dan tabel teman memenuhi tantangan");
  cek(capai([0, 1, 2, 3, 4, 5].flatMap((i) => isiTabel(i))).join() === "a-tabel", "A: keenam tabel tanpa tunjuk belum memenuhi tantangan");
  cek(capai([...[0, 1, 2, 3, 4, 5].flatMap(nilaiSemua), ...juta]).join() === "a-nilai,a-nilai-semua", "A: keenam nilai memenuhi tantangan");
  cek(capai([0, 1, 2, 3, 4].flatMap(nilaiSemua)).length === 0, "A: lima nilai belum memenuhi tantangan");
  cek(capai([...bacaSemua(1), ...isiTabel(3), ...nilaiSemua(4)]).length === 0, "A: riwayat pada bilangan lain, tidak ada misi yang terpenuhi");

  // Gerbang.
  const tampil = M0.tampilMisi(daftar);
  const wajibIds = tampil.filter((m) => m.wajib).map((m) => m.id);
  cek(!M0.wajibSelesai(tampil, new Set(wajibIds.slice(0, 6))), "A: enam dari tujuh wajib belum membuka gerbang");
  cek(M0.wajibSelesai(tampil, new Set(wajibIds)), "A: tujuh wajib membuka gerbang");
  cek(M0.bolehLanjut({ adaMisi: true, wajibSelesai: false, dilewati: true, disentuh: true }) && !M0.bolehLanjut({ adaMisi: true, wajibSelesai: false, dilewati: true, disentuh: false }), "lewati hanya setelah disentuh");
}

/* ------------------------------ Konsep tidak bocor ke Sub-Bab A ------------------------------ */
{
  const baca = (nama, ekstensi) => readFileSync(new URL(`../src/components/modul/${nama}.${ekstensi}`, import.meta.url), "utf8");
  const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas5-bab9-ringkas.json", import.meta.url), "utf8"));
  const tanpaKomentar = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
  const teksDari = (o) => {
    const hasil = [];
    JSON.stringify(o, (k, v) => {
      if (typeof v === "string" && k !== "tipe" && k !== "jenis") hasil.push(v);
      return v;
    });
    return hasil.join(" | ");
  };
  // Sub-Bab A hanya membahas membaca, menulis, nilai tempat, nilai angka, satu juta. Banding, urut, susun, dan urai milik Sub-Bab B dan C.
  const BOCOR_A = /(bandingk?an?|membanding|lebih (besar|kecil|banyak|sedikit|tinggi|rendah)|terbesar|terkecil|paling (besar|kecil)|\burut|mengurut|susun|menyusun|komposisi|dekomposisi|urai|menguraikan|bentuk panjang|bentuk baku|uraian|ordering|comparison|leftmost|decompos|compos|expanded|part-whole|flexible)/i;
  const catat = (teks, apa) => {
    const m = BOCOR_A.exec(teks);
    if (!/\(tanpa komentar\)/.test(apa)) cek(!/[<>]/.test(teks), `A: ${apa} tanpa tanda lebih besar atau lebih kecil`);
    cek(!m, `A: ${apa} bebas konsep banding, urut, susun, dan urai (${m ? m[0] : ""} di "${String(teks).slice(Math.max(0, (m?.index ?? 0) - 30), (m?.index ?? 0) + 40)}")`);
  };
  for (const t of [TK.MISI_K5B9.A, TK.NAMA_SIM_K5B9.A, ...K9.MISI_A.map((m) => m.teks)]) catat(t, "teks misi");
  for (const [nama, o] of [["mesin", MS.MESIN_NILAI], ["skenario", SK.SKENARIO_K5B9A], ["peta dan infografis ringkas", ringkas.subBab.A]]) catat(teksDari(o), nama);
  for (const [f, e] of [["SimulasiLabNilaiK5B9", "tsx"], ["model-nilai-k5b9", "tsx"], ["lab-nilai-k5b9a", "ts"]]) catat(tanpaKomentar(baca(f, e)).replace(/ ([-=+] |=> )/g, " "), `${f} (tanpa komentar)`);
  for (const p of globalThis.__pesanA) catat(p, "pesan lab dari fuzz");
  for (const u of [A.ucapBacaK5B9A(x0), A.ucapTabelK5B9A(x0), A.ucapNilaiK5B9A(x0)]) catat(u, "ucapan lab");

  // Kunci tidak bocor ke klien, tanpa jaringan.
  for (const f of ["SimulasiLabNilaiK5B9", "SimulasiK5Bab9", "model-nilai-k5b9"]) {
    const s = baca(f, "tsx");
    cek(!/correct_index|explanation/.test(s), `${f}: tidak memuat correct_index atau explanation`);
    cek(!/fetch\(|XMLHttpRequest|api\/|openai|anthropic|gemini/i.test(s), `${f}: tanpa jaringan atau model bahasa`);
  }
  for (const f of ["lab-nilai-k5b9a", "mesin-nilai-k5b9", "skenario-k5b9", "misi-k5bab9", "misi-teks-k5b9", "eja-k5b9"]) {
    const s = baca(f, "ts");
    cek(!/fetch\(|XMLHttpRequest|from "react"|openai|anthropic|gemini|correct_index|explanation/i.test(s), `${f}: murni`);
    const impor = s.match(/^import .+$/gm) ?? [];
    cek(impor.every((l) => l.startsWith("import type")), `${f}: hanya mengimpor tipe`);
  }
  cek((baca("lab-nilai-k5b9a", "ts").match(/^import /gm) ?? []).length === 0 && (baca("eja-k5b9", "ts").match(/^import /gm) ?? []).length === 0, "lab dan pengeja tanpa impor sama sekali");
  {
    const s = baca("SimulasiLabNilaiK5B9", "tsx");
    cek(/useEffect\(\(\) => \{\s*onKeadaan\?\.\(keadaan\w+\(x\)\);\s*\}, \[onKeadaan, x\]\);/.test(s), "lab: lapor keadaan lewat useEffect");
    cek(/setLihat\(v\);\s*kirim\(\{ t: "PESAN_KOSONG" \}\);/.test(s), "lab: ganti tampilan mengosongkan pesan");
    const catatan = [...s.matchAll(/^\s*"([^"]+)",$/gm)].map((m) => m[1]);
    cek(catatan.length >= 3 && catatan.every(tanpaAngka), "lab: Coba ini dapat dieja");
    for (const lab of ["Periksa tabel", "Tambah satu pada 999.999"]) cek(s.includes(`aria-label="${lab}"`), `lab: tombol berlabel ${lab}`);
    for (const awalan of ["Bacaan ", "Naikkan angka ", "Turunkan angka ", "Tunjuk kolom ", "Tempat ", "Nilai "]) cek(s.includes(`aria-label={\`${awalan}`), `lab: tombol berlabel ${awalan.trim()}`);
    for (const awalan of ["Pilih bilangan ", "Pilih tabel ", "Pilih nilai "]) cek(s.includes(`label={\`${awalan}`), `lab: pilihan data berlabel ${awalan.trim()}`);
    cek(/tabelBenar \? \(/.test(s) && /x\.baca\.kiri \? kanan : kiri/.test(s) && /x\.nilai\.tempat\s*\?/.test(s) && /x\.nilai\.tambah \? \(/.test(s), "lab: tahap berikutnya hanya tampil setelah tahap sebelumnya benar");
    cek(/kirim\(\{ t: x\.baca\.kiri \? "B_KANAN" : "B_KIRI", o \}\)/.test(s), "lab: pilihan bacaan mengirim kiri dulu lalu kanan");
    cek(/kirim\(\{ t: "T_PERIKSA" \}\)/.test(s) && /kirim\(\{ t: "N_TAMBAH" \}\)/.test(s) && /kirim\(\{ t: "N_JUTA", o \}\)/.test(s) && /kirim\(\{ t: "N_NILAI", o \}\)/.test(s) && /kirim\(\{ t: "N_TEMPAT", o \}\)/.test(s) && /kirim\(\{ t: "T_TUNJUK", k \}\)/.test(s) && /kirim\(\{ t: "RESET" \}\)/.test(s), "lab: semua aksi lab terhubung ke tombol");
    const m = baca("model-nilai-k5b9", "tsx");
    cek(/role="img"/.test(m) && /aria-label=\{`Tabel nilai tempat /.test(m), "model: gambar tabel tempat berlabel");
  }
  const pembungkus = baca("SimulasiK5Bab9", "tsx");
  cek(/eja=\{ejaK5B9\}/.test(pembungkus), "pembungkus: mesin dieja ejaK5B9");
  const coba = [...pembungkus.matchAll(/"([^"]*\?)"/g)].map((m) => m[1]);
  cek(coba.length >= 3 && coba.every(tanpaAngka), "Coba ini mesin dapat dieja");
  const ucapan = [];
  for (let i = 0; i < 6; i += 1) {
    ucapan.push(A.ucapBacaK5B9A(L(x0, { t: "B_DATA", i })), A.ucapTabelK5B9A(L(x0, { t: "T_DATA", i })), A.ucapNilaiK5B9A(L(x0, { t: "N_DATA", i })));
  }
  cek(ucapan.length === 18 && ucapan.every(tanpaAngka), `semua ${ucapan.length} ucapan lab dieja menjadi kata`);
}

/* ------------------------------ Emoji paling tinggi Emoji 12 ------------------------------ */
{
  const berkas = ["SimulasiLabNilaiK5B9.tsx", "SimulasiK5Bab9.tsx", "model-nilai-k5b9.tsx", "lab-nilai-k5b9a.ts", "mesin-nilai-k5b9.ts", "skenario-k5b9.ts", "misi-k5bab9.ts", "misi-teks-k5b9.ts", "eja-k5b9.ts"];
  let ok = true;
  for (const f of berkas) {
    const s = readFileSync(new URL(`../src/components/modul/${f}`, import.meta.url), "utf8");
    cek(s.charCodeAt(0) !== 0xfeff && !s.includes("\r"), `${f}: UTF-8 tanpa BOM dan akhir baris LF`);
    for (const c of s) if (c.codePointAt(0) > 0x1fa95) ok = false;
  }
  const r = readFileSync(new URL("../src/data/kelas5-bab9-ringkas.json", import.meta.url), "utf8");
  for (const c of r) if (c.codePointAt(0) > 0x1fa95) ok = false;
  cek(ok && r.charCodeAt(0) !== 0xfeff && !r.includes("\r"), "emoji paling tinggi Emoji 12 dan data ringkas UTF-8 tanpa BOM");
}

/* ------------------------------ Data ringkas ------------------------------ */
{
  const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas5-bab9-ringkas.json", import.meta.url), "utf8"));
  cek(ringkas.chapter_id === "mtk-5-bab9" && ringkas.phase_code === "FASE_C" && ringkas.grade === 5, "ringkas: id bab, fase, kelas");
  const A0 = ringkas.subBab.A;
  const [p1, p2, p3] = A0.infografis.panel;
  cek(A0.infografis.panel.length === 3 && p1.butir.length >= 2 && p2.sisi.length >= 2 && p3.butir.length >= 2, "ringkas A: tiga panel dengan isi");
  sama(A0.peta.cabang.map((c) => c.id), ["baca", "tulis", "tempat", "nilai"], "ringkas A: empat cabang");
  cek(A0.peta.kartu.length === 8 && A0.peta.kartu.every((k) => A0.peta.cabang.some((c) => c.id === k.cabang)), "ringkas A: delapan kartu, tiap kartu menunjuk cabang yang ada");
  cek(A0.peta.cabang.every((c) => A0.peta.kartu.filter((k) => k.cabang === c.id).length >= 2), "ringkas A: tiap cabang punya dua kartu atau lebih");
  const ide = [p1.ide, p2.ide, p3.ide];
  cek(ide.every((t) => t.split(/\s+/).length <= 8), "ringkas A: ide paling banyak delapan kata");
  // Angka di ringkas dihitung ulang mandiri.
  const teks = JSON.stringify(A0);
  cek(teks.includes("979.875") && teks.includes(bacaMandiri(979875).split(" ").slice(0, 3).join(" ")), "ringkas A: 979.875 dan bacaan kelompok kiri");
  const visualButir = (panel, id) => panel.butir.find((b) => b.id === id).visual.isi;
  sama(visualButir(p3, "nilai"), `9 × ${titikMandiri(nilaiTempatMandiri(0))} = ${titikMandiri(9 * nilaiTempatMandiri(0))}`, "ringkas A: butir nilai dihitung mandiri");
  sama(visualButir(p3, "juta"), `${titikMandiri(999999)} + 1 = ${titikMandiri(999999 + 1)}`, "ringkas A: butir satu juta dihitung mandiri");
  cek(teks.includes("9 × 100.000 = 900.000") && 9 * 100000 === 900000 && teks.includes("999.999 + 1 = 1.000.000") && 999999 + 1 === 1000000, "ringkas A: nilai 900.000 dan satu juta benar");
  cek(teks.includes("500.040") && teks.includes(bacaMandiri(500040)), "ringkas A: 500.040 dibaca lima ratus ribu empat puluh");
  const tabel = p3.butir.map((b) => b.visual).find((v) => v.jenis === "tabel-menurun");
  sama(tabel.baris.map((b) => [b[0].toLowerCase(), b[1]]), TEMPAT.slice(0, 4).map((nm, k) => [nm, nilaiTempatMandiri(k)]), "ringkas A: tabel nilai tempat dihitung mandiri");
  cek(Object.keys(ringkas.subBab).join() === "A", "ringkas: Sub-Bab A (B dan C menyusul)");
}

console.log(`\nLulus: ${lulus}, Gagal: ${gagal}`);
if (gagal > 0) process.exit(1);
