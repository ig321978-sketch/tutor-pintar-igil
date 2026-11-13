// Uji Simulasi Kelas 5 Bab 9 (Bilangan Cacah sampai 1.000.000): Lab Nilai Tempat (A), mesin, skenario, misi, gerbang, data ringkas, pengeja,
// dan konsep sub-bab berikutnya tidak bocor ke sub-bab sebelumnya.
// Jalankan: node --no-warnings scripts/uji-lab-k5b9.mjs
import { readFileSync } from "node:fs";
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K9 from "../src/components/modul/misi-k5bab9.ts";
import * as TK from "../src/components/modul/misi-teks-k5b9.ts";
import * as A from "../src/components/modul/lab-nilai-k5b9a.ts";
import * as B from "../src/components/modul/lab-banding-k5b9b.ts";
import * as MS from "../src/components/modul/mesin-nilai-k5b9.ts";
import * as MSB from "../src/components/modul/mesin-banding-k5b9.ts";
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
  sama(Object.keys(TK.MISI_K5B9), ["A", "B"], "teks misi untuk A dan B");
  sama(Object.keys(TK.NAMA_SIM_K5B9), ["A", "B"], "nama simulasi untuk A dan B");
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
}


/* ====================================================================== */
/* Sub-Bab B: Lab Banding                                                  */
/* ====================================================================== */

/* ------------------------------ Hitungan MANDIRI B ------------------------------ */
// Kode membandingkan kolom demi kolom. Di sini selisih bilangan dipakai (tanda selisih), urutan lewat sortir numerik,
// dan kolom pertama yang beda dicari dari teks bilangan berpanjang enam.
const cmpMandiri = (a, b) => Math.sign(a - b);
const kolomPertamaMandiri = (a, b) => {
  const s = String(a).padStart(6, "0");
  const t = String(b).padStart(6, "0");
  for (let k = 0; k < 6; k += 1) if (s[k] !== t[k]) return k;
  return -1;
};
const satuanMenyesatkanMandiri = (a, b) => Math.sign(Number(String(a).slice(-1)) - Number(String(b).slice(-1))) !== cmpMandiri(a, b);
const urutMandiri = (daftar, arah) => [...daftar].sort((p, q) => (arah === "naik" ? p - q : q - p));
const RENCANA_B = [
  { nama: "harga dua ponsel", a: 599198, b: 599047 },
  { nama: "harga sepatu Lukas dan Komang", a: 432543, b: 342231 },
  { nama: "penduduk dua desa", a: 789867, b: 789876 },
  { nama: "harga dua motor", a: 786897, b: 789876 },
  { nama: "dua tabungan", a: 250105, b: 250015 },
  { nama: "dua kiriman paket", a: 860209, b: 860290 },
];
const URUT_RENCANA = [
  { awal: [432543, 232231, 342231], arah: "naik" },
  { awal: [599047, 432543, 599198], arah: "turun" },
  { awal: [789867, 676785, 789876], arah: "naik" },
  { awal: [786897, 676785, 789876, 789867], arah: "turun" },
  { awal: [250105, 250015, 205999], arah: "naik" },
  { awal: [860290, 860209, 806999, 860902], arah: "turun" },
];
const SIMBOL_RENCANA = [[676785, 786897], [500040, 500040], [599047, 599198], [789876, 789867], [408906, 408906], [860290, 860209]];
const KATA_HUBUNGAN = ["lebih kecil dari", "sama dengan", "lebih besar dari"];
const LB = B.langkahBandingK5B9B;
const y0 = B.awalBandingK5B9B();

{
  sama(B.PASANGAN_B.map((p) => [p.nama, p.a, p.b]), RENCANA_B.map((p) => [p.nama, p.a, p.b]), "B: enam pasangan sesuai rencana");
  sama(B.URUT_B.map((u) => [u.awal, u.arah]), URUT_RENCANA.map((u) => [u.awal, u.arah]), "B: enam kelompok urut sesuai rencana");
  sama(B.SIMBOL_B.map((p) => [p.a, p.b]), SIMBOL_RENCANA, "B: enam pasangan simbol sesuai rencana");
  cek(B.PASANGAN_B.every((p) => p.a !== p.b && p.a > 99999 && p.a < 1000000 && p.b > 99999 && p.b < 1000000), "B: pasangan berbeda dan enam digit");
  sama(B.PASANGAN_B.map((p) => kolomPertamaMandiri(p.a, p.b)), [3, 0, 4, 2, 3, 4], "B: kolom pertama yang beda tiap pasangan");
  cek(new Set(B.PASANGAN_B.map((p) => cmpMandiri(p.a, p.b))).size === 2, "B: pasangan memuat atas lebih besar dan bawah lebih besar");
  cek(B.URUT_B.every((u) => JSON.stringify(u.awal) !== JSON.stringify(urutMandiri(u.awal, u.arah)) && new Set(u.awal).size === u.awal.length), "B: susunan awal belum urut dan bilangan berbeda");
  cek(B.URUT_B.some((u) => u.arah === "naik") && B.URUT_B.some((u) => u.arah === "turun") && B.URUT_B.some((u) => u.awal.length === 4), "B: ada naik, turun, dan empat bilangan");
  sama(B.SIMBOL_B.map((p) => cmpMandiri(p.a, p.b)), [-1, 0, -1, 1, 0, 1], "B: hubungan enam pasangan simbol");
  sama(B.PASANGAN_B.map((p) => B.kolomBedaPertama(p.a, p.b)), [3, 0, 4, 2, 3, 4], "B: kolomBedaPertama sama");
  cek(B.kolomBedaPertama(500040, 500040) === -1 && B.bandingKolom(500040, 500040) === 0, "B: dua bilangan sama tidak punya kolom beda");
  // Pasangan yang hanya beda di satuan, dan perbandingan dari satuan untuk pasangan yang satuannya lebih kecil, sama, atau lebih besar.
  cek(B.kolomBedaPertama(123456, 123457) === 5 && B.bandingKolom(123456, 123457) === -1 && B.bandingKolom(123459, 123451) === 1 && kolomPertamaMandiri(123456, 123457) === 5, "B: pasangan yang hanya beda di satuan");
  cek(B.bandingSatuan(123451, 123459) === -1 && B.bandingSatuan(123459, 123451) === 1 && B.bandingSatuan(123455, 999995) === 0, "B: banding dari satuan: lebih kecil, lebih besar, dan sama");
  let ok = true;
  for (let n = 0; n < 40000; n += 1) {
    const a = (n * 7919 + 13) % 1000000;
    const b = n % 5 === 0 ? a : (n * 104729 + (n % 9) * 1000 + 7) % 1000000;
    if (B.bandingKolom(a, b) !== cmpMandiri(a, b)) ok = false;
    if (B.kolomBedaPertama(a, b) !== kolomPertamaMandiri(a, b)) ok = false;
  }
  cek(ok, "B: bandingKolom dan kolomBedaPertama sama dengan selisih dan teks, 40.000 pasangan acak");
  cek(B.PASANGAN_B.every((p, i) => B.satuanMenyesatkan(i) === satuanMenyesatkanMandiri(p.a, p.b)), "B: satuan menyesatkan dihitung mandiri");
  sama(B.PASANGAN_B.map((_, i) => B.satuanMenyesatkan(i)), [false, false, true, true, true, true], "B: pasangan 2 sampai 5 menyesatkan bila dari satuan");
  for (const u of B.URUT_B) sama(B.urutBenar(u.awal, u.arah), urutMandiri(u.awal, u.arah), `B: urut ${u.nama} dihitung mandiri`);
  cek(B.TEKS_SIMBOL.join() === "lebih besar dari,lebih kecil dari,sama dengan" && B.TANDA_SIMBOL.join("") === "><=", "B: teks dan tanda simbol");
}

/* ------------------------------ Lab B ------------------------------ */
{
  sama(B.keadaanBandingK5B9B(y0), { alat: "banding", pernah: [] }, "B: keadaan awal");
  cek(y0.pernah.length === 0 && y0.pesan === "" && y0.banding.kolom === 0 && !y0.banding.berhenti && JSON.stringify(y0.urut.daftar) === JSON.stringify(URUT_RENCANA[0].awal), "B awal: kosong");
  cek(y0.urut.daftar !== B.URUT_B[0].awal, "B awal: daftar urut salinan, bukan data asli");

  const posBanding = [];
  const posSimbol = [];
  const hubunganTeks = (h) => (h > 0 ? "Atas lebih besar" : h < 0 ? "Bawah lebih besar" : "Sama besar");
  for (const [i, r] of RENCANA_B.entries()) {
    const k = kolomPertamaMandiri(r.a, r.b);
    const ob = B.opsiBanding(i);
    cek(new Set(ob.opsi).size === 3 && ob.opsi[ob.benar] === hubunganTeks(cmpMandiri(r.a, r.b)) && [...ob.opsi].sort().join() === [...B.TEKS_BANDING].sort().join(), `Banding ${i}: tiga pilihan unik, kunci ${hubunganTeks(cmpMandiri(r.a, r.b))}`);
    posBanding.push(ob.benar);
    const awal = LB(y0, { t: "G_DATA", i });
    cek(awal.banding.data === i && awal.banding.kolom === 0 && !awal.banding.berhenti, `Banding ${i}: pilih pasangan`);
    // Berhenti terlalu dini ditolak, tiap kolom sebelum kolom beda.
    let s = awal;
    for (let c = 0; c < k; c += 1) {
      const dini = LB(s, { t: "G_BERHENTI" });
      cek(!dini.banding.berhenti && dini.pernah.length === 0 && dini.pesan.includes(["ratus ribuan", "puluh ribuan", "ribuan", "ratusan", "puluhan", "satuan"][c]) && dini.pesan.includes("sama"), `Banding ${i}: berhenti di kolom ${c} (masih sama) ditolak`);
      // Memilih hasil sebelum berhenti ditolak walaupun kunci.
      const cepat = LB(s, { t: "G_PILIH", o: ob.benar });
      cek(cepat.pernah.length === 0 && !cepat.pesan.startsWith("✅") && cepat.pesan.includes("kolom"), `Banding ${i}: memilih di kolom ${c} sebelum berhenti ditolak`);
      s = LB(s, { t: "G_GESER" });
      cek(s.banding.kolom === c + 1 && s.pesan.startsWith("✅ Kolom") && !s.banding.berhenti, `Banding ${i}: geser ke kolom ${c + 1}`);
    }
    cek(s.banding.kolom === k, `Banding ${i}: penunjuk sampai kolom beda ${k} setelah ${k} geseran`);
    // Menggeser dari kolom beda ditolak.
    const lewat = LB(s, { t: "G_GESER" });
    cek(lewat.banding.kolom === k && lewat.pesan.includes("Berhenti di sini"), `Banding ${i}: geser dari kolom beda ditolak`);
    const stop = LB(s, { t: "G_BERHENTI" });
    cek(stop.banding.berhenti && stop.pesan.startsWith("✅") && stop.pernah.length === 0, `Banding ${i}: berhenti di kolom beda`);
    // Hasil salah ditolak, benar diterima.
    for (let o = 0; o < 3; o += 1) {
      const t = LB(stop, { t: "G_PILIH", o });
      const benar = ob.opsi[o] === hubunganTeks(cmpMandiri(r.a, r.b));
      cek(benar ? t.pernah.join() === `banding:${i}` && t.pesan.startsWith("✅") : t.pernah.length === 0 && !t.pesan.startsWith("✅"), `Banding ${i}: pilihan ${ob.opsi[o]} ${benar ? "benar" : "salah"}`);
    }
    const benarT = LB(stop, { t: "G_PILIH", o: ob.benar });
    cek(benarT.pesan.includes(`${String(r.a).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ${cmpMandiri(r.a, r.b) > 0 ? ">" : "<"} ${String(r.b).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`), `Banding ${i}: pesan memuat ${r.a} dan ${r.b} dengan tanda mandiri`);
    // Berhenti lalu geser: ditolak.
    cek(LB(stop, { t: "G_GESER" }).banding.kolom === k, `Banding ${i}: sesudah berhenti tidak bisa geser`);
    // Satuan.
    const sat = LB(awal, { t: "G_SATUAN" });
    const mesti = satuanMenyesatkanMandiri(r.a, r.b);
    cek(mesti ? sat.pernah.join() === `satuan:${i}` && sat.pesan.startsWith("✅") : sat.pernah.length === 0 && !sat.pesan.startsWith("✅"), `Satuan ${i}: ${mesti ? "menyesatkan dan dicatat" : "kebetulan sama, tidak dicatat"}`);
  }
  cek(new Set(posBanding).size === 3, `Banding: letak kunci bervariasi (${posBanding.join("")})`);
  cek(LB(y0, { t: "G_DATA", i: 1 }).banding.kolom === 0 && LB(LB(LB(y0, { t: "G_DATA", i: 0 }), { t: "G_GESER" }), { t: "G_DATA", i: 0 }).banding.kolom === 0, "Banding: ganti pasangan mengulang dari kolom kiri");

  // Urut.
  for (const [i, u] of URUT_RENCANA.entries()) {
    const sortir = urutMandiri(u.awal, u.arah);
    const awal = LB(y0, { t: "U_DATA", i });
    sama(awal.urut.daftar, u.awal, `Urut ${i}: susunan awal`);
    const ditolak = LB(awal, { t: "U_PERIKSA" });
    cek(ditolak.pernah.length === 0 && !ditolak.pesan.startsWith("✅") && ditolak.pesan.includes(`urut ${u.arah}`), `Urut ${i}: susunan awal belum urut ${u.arah} ditolak`);
    // Pasangan pertama yang salah disebut.
    let k = -1;
    for (let j = 0; j < u.awal.length - 1; j += 1) {
      const salah = u.arah === "naik" ? u.awal[j] > u.awal[j + 1] : u.awal[j] < u.awal[j + 1];
      if (salah) { k = j; break; }
    }
    const titik = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    cek(k >= 0 && ditolak.pesan.startsWith(`${titik(u.awal[k])} dan ${titik(u.awal[k + 1])}`), `Urut ${i}: pesan menyebut pasangan tetangga pertama yang salah`);
    // Penyelesai mandiri: gelembung lewat aksi turun.
    let s = awal;
    const arr = [...u.awal];
    for (let putar = 0; putar < arr.length; putar += 1) {
      for (let j = 0; j < arr.length - 1; j += 1) {
        const salah = u.arah === "naik" ? arr[j] > arr[j + 1] : arr[j] < arr[j + 1];
        if (salah) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          s = LB(s, { t: "U_TURUN", k: j });
        }
      }
    }
    sama(s.urut.daftar, sortir, `Urut ${i}: gelembung lewat aksi menghasilkan urutan mandiri`);
    const bagus = LB(s, { t: "U_PERIKSA" });
    cek(bagus.pernah.join() === `urut:${i}` && bagus.pesan.startsWith("✅") && bagus.pesan.includes(sortir.map(titik).join(", ")), `Urut ${i}: urutan ${u.arah} benar diterima`);
    // Urutan kebalikan ditolak.
    let balik = s;
    for (let putar = 0; putar < arr.length; putar += 1) for (let j = 0; j < arr.length - 1; j += 1) balik = LB(balik, { t: "U_TURUN", k: j });
    cek(LB(balik, { t: "U_PERIKSA" }).pernah.length === 0 || JSON.stringify(balik.urut.daftar) === JSON.stringify(sortir), `Urut ${i}: kebalikan ditolak`);
    // Mengurutkan untuk arah yang berlawanan ditolak.
    const lawan = [...sortir].reverse();
    let t = awal;
    const arr2 = [...u.awal];
    const tujuan = lawan;
    for (let putar = 0; putar < arr2.length; putar += 1) for (let j = 0; j < arr2.length - 1; j += 1) if (tujuan.indexOf(arr2[j]) > tujuan.indexOf(arr2[j + 1])) { [arr2[j], arr2[j + 1]] = [arr2[j + 1], arr2[j]]; t = LB(t, { t: "U_TURUN", k: j }); }
    cek(JSON.stringify(t.urut.daftar) === JSON.stringify(lawan) && LB(t, { t: "U_PERIKSA" }).pernah.length === 0, `Urut ${i}: urutan arah berlawanan ditolak`);
    // Indeks di luar batas diabaikan.
    for (const kk of [-1, u.awal.length - 1, u.awal.length, 1.5, NaN, undefined]) cek(LB(awal, { t: "U_TURUN", k: kk }) === awal, `Urut ${i}: turunkan indeks ${kk} diabaikan`);
    // Daftar tetap permutasi.
    cek([...LB(awal, { t: "U_TURUN", k: 0 }).urut.daftar].sort((p, q) => p - q).join() === [...u.awal].sort((p, q) => p - q).join(), `Urut ${i}: tetap memuat bilangan yang sama`);
  }

  // Simbol.
  for (const [i, [a, b]] of SIMBOL_RENCANA.entries()) {
    const os = B.opsiSimbol(i);
    const h = cmpMandiri(a, b);
    posSimbol.push(os.benar);
    cek(new Set(os.opsi).size === 3 && os.opsi[os.benar] === KATA_HUBUNGAN[h + 1] && [...os.opsi].sort().join() === [...KATA_HUBUNGAN].sort().join(), `Simbol ${i}: kunci ${KATA_HUBUNGAN[h + 1]}`);
    const awal = LB(y0, { t: "S_DATA", i });
    for (let o = 0; o < 3; o += 1) {
      const t = LB(awal, { t: "S_PILIH", o });
      const benar = os.opsi[o] === KATA_HUBUNGAN[h + 1];
      cek(benar ? t.pernah.join() === `simbol:${i}` && t.pesan.startsWith("✅") && t.pesan.includes(os.opsi[o]) : t.pernah.length === 0 && !t.pesan.startsWith("✅") && (h === 0 ? t.pesan.includes("sama besar") : t.pesan.includes("kiri")), `Simbol ${i}: pilihan ${os.opsi[o]} ${benar ? "benar" : "salah"}`);
    }
    const t = LB(awal, { t: "S_PILIH", o: os.benar });
    cek(t.pesan.includes(h > 0 ? " > " : h < 0 ? " < " : " = "), `Simbol ${i}: pesan memuat tanda ${h > 0 ? ">" : h < 0 ? "<" : "="}`);
  }
  cek(new Set(posSimbol).size === 3, `Simbol: letak kunci bervariasi (${posSimbol.join("")})`);
  for (let i = 0; i < 6; i += 1) {
    sama(B.opsiSimbol(i).opsi, [0, 1, 2].map((j) => B.TEKS_SIMBOL[(j + i + 1) % 3]), `Simbol ${i}: urutan pilihan berputar menurut nomor pasangan`);
    sama(B.opsiBanding(i).opsi, [0, 1, 2].map((j) => B.TEKS_BANDING[(j + i) % 3]), `Banding ${i}: urutan pilihan berputar menurut nomor pasangan`);
  }
  {
    const sudah = jalan(y0, LB, [{ t: "G_DATA", i: 1 }, { t: "G_BERHENTI" }]);
    const dua = LB(sudah, { t: "G_BERHENTI" });
    cek(sudah.banding.berhenti && dua.banding.berhenti && dua.pesan.includes("sudah ketemu") && !dua.pesan.startsWith("✅") && dua.pernah.length === 0, "Banding: berhenti dua kali tidak mengulang pesan sukses");
    const geserLagi = LB(sudah, { t: "G_GESER" });
    cek(geserLagi.pesan.includes("sudah ketemu") && geserLagi.banding.kolom === sudah.banding.kolom, "Banding: geser sesudah berhenti ditolak dengan pesan sudah ketemu");
  }

  // Indeks tak sah.
  {
    let ok = true;
    const dasar = jalan(y0, LB, [{ t: "G_DATA", i: 0 }, { t: "G_GESER" }, { t: "U_DATA", i: 1 }, { t: "S_DATA", i: 2 }]);
    for (const v of [-1, 1.5, 99, NaN, undefined, "1", 6]) {
      for (const a of [{ t: "G_DATA", i: v }, { t: "U_DATA", i: v }, { t: "S_DATA", i: v }, { t: "G_PILIH", o: v }, { t: "S_PILIH", o: v }, { t: "U_TURUN", k: v }]) {
        if (JSON.stringify(LB(dasar, a)) !== JSON.stringify(dasar)) ok = false;
      }
    }
    for (const v of [3, 4]) for (const a of [{ t: "G_PILIH", o: v }, { t: "S_PILIH", o: v }]) if (JSON.stringify(LB(dasar, a)) !== JSON.stringify(dasar)) ok = false;
    cek(ok, "B: indeks pecahan, negatif, di luar batas, bukan bilangan: diabaikan");
    sama(LB(jalan(y0, LB, [{ t: "G_SATUAN" }]), { t: "RESET" }), B.awalBandingK5B9B(), "B: reset kembali ke awal");
    cek(LB({ ...y0, pesan: "x" }, { t: "PESAN_KOSONG" }).pesan === "", "B: pesan dikosongkan");
  }

  // Fuzz.
  {
    const acak = acakDari(5150);
    let s = y0;
    let ok = true;
    const pesanSemua = new Set();
    const riwayatSemua = new Set();
    const teksHub = (h) => hubunganTeks(h);
    const buat = () => {
      const r = acak(20);
      const g = s.banding.data;
      if (r === 0) return { t: "G_DATA", i: acak(8) - 1 };
      if (r === 1 || r === 2 || r === 3) return { t: "G_GESER" };
      if (r === 4 || r === 5) return { t: "G_BERHENTI" };
      if (r === 6) return { t: "G_PILIH", o: acak(5) - 1 };
      if (r === 7) return { t: "G_PILIH", o: B.opsiBanding(g).benar };
      if (r === 8) return { t: "G_SATUAN" };
      if (r === 9) return { t: "U_DATA", i: acak(8) - 1 };
      if (r === 10 || r === 11) return { t: "U_TURUN", k: acak(6) - 1 };
      if (r === 12) {
        // Langkah gelembung yang benar menuju urutan mandiri.
        const u = URUT_RENCANA[s.urut.data];
        for (let j = 0; j < s.urut.daftar.length - 1; j += 1) {
          const salah = u.arah === "naik" ? s.urut.daftar[j] > s.urut.daftar[j + 1] : s.urut.daftar[j] < s.urut.daftar[j + 1];
          if (salah) return { t: "U_TURUN", k: j };
        }
        return { t: "U_PERIKSA" };
      }
      if (r === 13) return { t: "U_PERIKSA" };
      if (r === 14) return { t: "S_DATA", i: acak(8) - 1 };
      if (r === 15) return { t: "S_PILIH", o: acak(5) - 1 };
      if (r === 16) return { t: "S_PILIH", o: B.opsiSimbol(s.simbol.data).benar };
      if (r === 17) return { t: "PESAN_KOSONG" };
      if (r === 18 && acak(60) === 0) return { t: "RESET" };
      return { t: "G_GESER" };
    };
    for (let n = 0; n < 20000; n += 1) {
      const a = buat();
      const sebelum = s;
      s = LB(s, a);
      pesanSemua.add(s.pesan);
      const gb = s.banding;
      const kb = kolomPertamaMandiri(RENCANA_B[gb.data].a, RENCANA_B[gb.data].b);
      const batas =
        [gb.data, s.urut.data, s.simbol.data].every((v) => Number.isInteger(v) && v >= 0 && v < 6) &&
        gb.kolom >= 0 && gb.kolom <= kb && (!gb.berhenti || gb.kolom === kb) &&
        [...s.urut.daftar].sort((p, q) => p - q).join() === [...URUT_RENCANA[s.urut.data].awal].sort((p, q) => p - q).join() &&
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
        if (alat === "banding") {
          const r = RENCANA_B[i];
          const benar = a.t === "G_PILIH" && sebelum.banding.data === i && sebelum.banding.berhenti && sebelum.banding.kolom === kolomPertamaMandiri(r.a, r.b) && B.opsiBanding(i).opsi[a.o] === teksHub(cmpMandiri(r.a, r.b));
          if (!benar) ok = false;
        } else if (alat === "satuan") {
          const r = RENCANA_B[i];
          if (!(a.t === "G_SATUAN" && sebelum.banding.data === i && satuanMenyesatkanMandiri(r.a, r.b))) ok = false;
        } else if (alat === "urut") {
          const u = URUT_RENCANA[i];
          if (!(a.t === "U_PERIKSA" && sebelum.urut.data === i && JSON.stringify(sebelum.urut.daftar) === JSON.stringify(urutMandiri(u.awal, u.arah)))) ok = false;
        } else if (alat === "simbol") {
          const [p, q] = SIMBOL_RENCANA[i];
          if (!(a.t === "S_PILIH" && sebelum.simbol.data === i && B.opsiSimbol(i).opsi[a.o] === KATA_HUBUNGAN[cmpMandiri(p, q) + 1])) ok = false;
        } else ok = false;
      }
    }
    cek(ok, "fuzz 20.000 aksi Lab Banding: batas terjaga, riwayat tidak dicabut dan hanya bila tercapai (orakel mandiri)");
    cek(pesanSemua.size > 40 && [...pesanSemua].every(tanpaAngka), `fuzz Lab Banding: semua ${pesanSemua.size} pesan dieja menjadi kata`);
    cek(riwayatSemua.size === 4, `fuzz Lab Banding: riwayat terkumpul (${[...riwayatSemua].sort().join(" ")})`);
    globalThis.__pesanB = [...pesanSemua];
  }
}

/* ------------------------------ Mesin B ------------------------------ */
{
  const def = MSB.MESIN_BANDING;
  cek(def.stasiun.length === 4 && def.kasus.length === 3, `${def.id}: empat stasiun, tiga kasus`);
  sama(def.stasiun.map((s) => s.id), ["kolom", "banding", "urut", "simbol"], "stasiun mesin B");
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
  cek(x.selesai && def.selesaiId === K9.ID_MESIN_K5B9.B, `${def.id}: bisa diselesaikan, id selesai sesuai misi`);
  const y = ME.awalMesin(def);
  const l0 = ME.langkahAktif(y);
  const z = ME.langkahMesin(y, { t: "JAWAB", nilai: l0.opsi.find((o) => o !== l0.benar) });
  cek(z.ke === 0 && z.ditolak === 1 && z.pesan === l0.petunjuk, `${def.id}: jawaban salah ditolak dengan petunjuk`);

  const RENCANA_MB = [
    { id: "sepatu", a: 432543, b: 342231, urut: [432543, 232231, 342231], arah: "naik" },
    { id: "ratusan", a: 599198, b: 599047, urut: [599047, 432543, 599198], arah: "turun" },
    { id: "puluhan", a: 789867, b: 789876, urut: [789867, 676785, 789876], arah: "naik" },
  ];
  sama(MSB.KASUS_BANDING.map((k) => [k.id, k.a, k.b, k.urut, k.arah]), RENCANA_MB.map((r) => [r.id, r.a, r.b, r.urut, r.arah]), "Mesin B: data tiga kasus sesuai rencana");
  const T = ["ratus ribuan", "puluh ribuan", "ribuan", "ratusan", "puluhan", "satuan"];
  const titik = (v) => String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  for (const [i, r] of RENCANA_MB.entries()) {
    const c = def.kasus[i];
    const [ko, ba, ur, si] = c.langkah;
    const k = kolomPertamaMandiri(r.a, r.b);
    cek(ko.benar === T[k] && ko.opsi.every((o) => T.includes(o)) && ko.tanya.includes(titik(r.a)) && ko.tanya.includes(titik(r.b)), `Mesin B ${r.id}: kolom pertama beda ${T[k]}`);
    cek(ko.opsi.filter((o) => o !== ko.benar).every((o) => [k - 1, k + 1, 5, 0].includes(T.indexOf(o))), `Mesin B ${r.id}: pengecoh kolom adalah tetangga, satuan, atau kolom paling kiri`);
    const besar = Math.max(r.a, r.b);
    cek(ba.benar === titik(besar) && ba.opsi.includes(titik(Math.min(r.a, r.b))) && ba.opsi.includes("sama besar"), `Mesin B ${r.id}: yang lebih besar ${besar}`);
    cek(ba.tanya.includes(T[k]) , `Mesin B ${r.id}: soal banding menyebut kolom penentu`);
    const sortir = urutMandiri(r.urut, r.arah);
    cek(ur.benar === sortir.map(titik).join(", ") && ur.tanya.includes(r.arah), `Mesin B ${r.id}: urut ${r.arah} ${sortir.join(" ")}`);
    sama([...ur.opsi].sort(), [sortir.map(titik).join(", "), [...sortir].reverse().map(titik).join(", "), [sortir[1], sortir[0], ...sortir.slice(2)].map(titik).join(", ")].sort(), `Mesin B ${r.id}: pengecoh urut kebalikan dan dua pertama berpindah`);
    cek(!ur.tanya.includes(sortir.map(titik).join(", ")) , `Mesin B ${r.id}: soal urut tidak membocorkan jawaban`);
    const h = cmpMandiri(r.b, r.a);
    cek(si.benar === KATA_HUBUNGAN[h + 1] && si.tanya.includes(`${titik(r.b)} … ${titik(r.a)}`) && [...si.opsi].sort().join() === [...KATA_HUBUNGAN].sort().join(), `Mesin B ${r.id}: simbol ${KATA_HUBUNGAN[h + 1]} (urutan b lalu a)`);
    cek(EJ.ejaK5B9(c.ringkas).includes(EJ.kataK5B9(besar)) && c.ringkas.includes(`kolom ${T[k]}`), `Mesin B ${r.id}: ringkas memuat bilangan dan kolom`);
  }
  sama(MSB.KASUS_BANDING.map((k) => kolomPertamaMandiri(k.a, k.b)), [0, 3, 4], "Mesin B: kolom beda 0, 3, dan 4");
}

/* ------------------------------ Skenario B ------------------------------ */
{
  const S = SK.SKENARIO_K5B9B;
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
  sama(S.id.replace(/-k5b9$/, ""), K9.ID_SKENARIO_K5B9.B, "id skenario B sesuai id misi");
  const adegan = (id) => S.adegan.find((a) => a.id === id);
  const titik = (v) => String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const mulai = adegan("mulai");
  cek(mulai.opsi.filter((o) => o.benar).length === 1 && /paling kiri/.test(mulai.opsi.find((o) => o.benar).teks) && mulai.opsi.some((o) => /satuan/.test(o.teks) && !o.benar), "mulai: mulai dari kolom paling kiri, pengecoh satuan");
  const sepatu = adegan("sepatu");
  const harga = { Lukas: 432543, Komang: 342231, Nisa: 232231 };
  const termahal = Object.entries(harga).sort((p, q) => q[1] - p[1])[0][0];
  const termurah = Object.entries(harga).sort((p, q) => p[1] - q[1])[0][0];
  cek(sepatu.soal[0].jawaban === termahal && sepatu.soal[1].jawaban === termurah && Object.values(harga).every((h) => sepatu.cerita.includes(titik(h))), "sepatu: termahal Lukas dan termurah Nisa (urut mandiri)");
  const kolom = adegan("kolom");
  const diperiksa = kolomPertamaMandiri(599198, 599047) + 1;
  cek(kolom.jumlah === diperiksa && diperiksa === 4 && kolom.jumlah <= 12 && kolom.cerita.includes("599.198") && kolom.cerita.includes("599.047"), "kolom: empat kolom diperiksa (tiga sama dan satu beda)");
  const beda = adegan("beda");
  cek(beda.soal[0].jawaban === titik(Math.max(599198, 599047)) && beda.soal[1].jawaban === "ratusan" && beda.soal[1].jawaban === ["ratus ribuan", "puluh ribuan", "ribuan", "ratusan", "puluhan", "satuan"][kolomPertamaMandiri(599198, 599047)], "beda: 599.198 lebih besar, kolom ratusan");
  const puluhan = adegan("puluhan");
  const bp = puluhan.opsi.find((o) => o.benar);
  cek(puluhan.opsi.filter((o) => o.benar).length === 1 && /puluhan/.test(bp.teks) && /789\.876 lebih besar/.test(bp.teks) && 789876 > 789867 && kolomPertamaMandiri(789876, 789867) === 4 && puluhan.opsi.some((o) => /satuan/.test(o.teks) && !o.benar), "puluhan: 789.876 lebih besar, satuan menyesatkan");
  const urut = adegan("urut");
  cek(urut.soal[0].jawaban === urutMandiri([232231, 342231, 432543], "naik").map(titik).join(", ") && urut.soal[1].jawaban === KATA_HUBUNGAN[cmpMandiri(342231, 432543) + 1] && urut.soal[1].teks.includes("342.231 … 432.543"), "urut: naik 232.231, 342.231, 432.543 dan lebih kecil dari");
  const posisi = S.adegan.filter((a) => a.jenis === "pilih").map((a) => a.opsi.findIndex((o) => o.benar));
  cek(new Set(posisi).size === posisi.length, `letak jawaban pilih bervariasi (${posisi.join("")})`);
  for (const id of ["sepatu", "beda", "urut"]) {
    const ps = adegan(id).soal.map((q) => q.opsi.indexOf(q.jawaban));
    cek(ps.every((p) => p >= 0) && new Set(ps).size === ps.length && adegan(id).soal.every((q) => q.opsi.length === 3 && new Set(q.opsi).size === 3), `letak jawaban soal ${id} bervariasi (${ps.join("")})`);
  }
  cek(S.adegan.filter((a) => a.jenis === "pilih").every((a) => a.opsi.length === 3 && a.opsi.filter((o) => o.benar).length === 1), "setiap pilih: tiga opsi, satu benar");
  cek(/tabel nilai tempat/.test(S.adegan[0].cerita), "B menyentuh tabel nilai tempat dari Sub-Bab A");
}

/* ------------------------------ Misi B ------------------------------ */
{
  const daftar = K9.daftarMisiK5Bab9("B");
  cek(TK.hurufK5B9("B") === "B" && TK.misiAwalK5Bab9("B").includes("Lab Banding") && tanpaAngka(TK.misiAwalK5Bab9("B")), "B: teks misi awal dan huruf");
  cek([TK.MISI_K5B9.B, TK.NAMA_SIM_K5B9.B].every(tanpaAngka), "B: teks misi dan nama dapat dieja");
  cek(daftar === K9.MISI_B && daftar.filter((m) => m.wajib).length === 7 && daftar.filter((m) => !m.wajib).length === 3, "B: tujuh misi wajib dan tiga tantangan bebas");
  cek(new Set(daftar.map((m) => m.id)).size === 10 && daftar.every((m) => m.id.startsWith("b-")), "B: id misi unik berawalan huruf");
  const baru = (k) => M0.misiBaru(daftar, k, new Set());
  const kosong = [{ alat: "banding", pernah: [] }, { alat: "nilai", pernah: [] }, sel("tidak-ada"), B.keadaanBandingK5B9B(B.awalBandingK5B9B()), A.keadaanNilaiK5B9A(A.awalNilaiK5B9A())];
  cek(kosong.every((k) => baru(k).length === 0), "B: keadaan awal alat tidak memenuhi misi mana pun");
  cek(daftar.every((m) => m.teks.length > 20 && tanpaAngka(m.teks)), "B: teks misi jelas dan dapat dieja");
  cek(baru(sel(K9.ID_MESIN_K5B9.B)).join() === "b-mesin" && baru(sel(K9.ID_SKENARIO_K5B9.B)).join() === "b-skenario", "B: id mesin dan skenario memenuhi misinya");
  cek(baru(sel(K9.ID_MESIN_K5B9.A)).length === 0 && baru(sel(K9.ID_SKENARIO_K5B9.A)).length === 0, "B: id mesin dan skenario A tidak memenuhi misi B");
  cek(M0.misiBaru(K9.MISI_A, sel(K9.ID_MESIN_K5B9.B), new Set()).length === 0, "A: id mesin B tidak memenuhi misi A");
  cek(baru({ alat: "nilai", pernah: ["banding:0", "banding:1", "satuan:2", "urut:0", "urut:1", "simbol:0", "simbol:1"] }).length === 0, "B: riwayat alat lain tidak memenuhi misi B");
  cek(M0.misiBaru(K9.MISI_A, { alat: "banding", pernah: ["baca:0", "baca:2", "tabel:0", "salah:0", "nilai:0", "juta"] }, new Set()).length === 0, "A: riwayat alat banding tidak memenuhi misi A");

  const capai = (aksi) => baru(B.keadaanBandingK5B9B(jalan(B.awalBandingK5B9B(), LB, aksi)));
  const banding = (i) => {
    const r = RENCANA_B[i];
    const k = kolomPertamaMandiri(r.a, r.b);
    const teks = cmpMandiri(r.a, r.b) > 0 ? "Atas lebih besar" : "Bawah lebih besar";
    return [{ t: "G_DATA", i }, ...Array.from({ length: k }, () => ({ t: "G_GESER" })), { t: "G_BERHENTI" }, { t: "G_PILIH", o: B.opsiBanding(i).opsi.indexOf(teks) }];
  };
  const urut = (i) => {
    const u = URUT_RENCANA[i];
    const aksi = [{ t: "U_DATA", i }];
    const arr = [...u.awal];
    for (let p = 0; p < arr.length; p += 1) for (let j = 0; j < arr.length - 1; j += 1) if (u.arah === "naik" ? arr[j] > arr[j + 1] : arr[j] < arr[j + 1]) { [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; aksi.push({ t: "U_TURUN", k: j }); }
    return [...aksi, { t: "U_PERIKSA" }];
  };
  const simbol = (i) => {
    const [p, q] = SIMBOL_RENCANA[i];
    return [{ t: "S_DATA", i }, { t: "S_PILIH", o: B.opsiSimbol(i).opsi.indexOf(KATA_HUBUNGAN[cmpMandiri(p, q) + 1]) }];
  };
  const satuan = (i) => [{ t: "G_DATA", i }, { t: "G_SATUAN" }];

  cek(capai(banding(1)).join() === "b-langsung", "B: banding sepatu Lukas dan Komang memenuhi b-langsung");
  cek(capai(banding(0)).join() === "b-geser", "B: banding ponsel dengan geser memenuhi b-geser");
  cek(capai([...banding(1), ...banding(0)]).join() === "b-langsung,b-geser", "B: dua banding memenuhi dua misi");
  cek(capai([...banding(2), ...banding(3), ...banding(4), ...banding(5)]).length === 0, "B: banding pasangan lain tidak memenuhi misi wajib");
  cek(capai(banding(0).slice(0, -1)).length === 0 && capai(banding(1).slice(0, -1)).length === 0, "B: berhenti tanpa memilih hasil belum memenuhi");
  cek(capai([{ t: "G_DATA", i: 1 }, { t: "G_PILIH", o: B.opsiBanding(1).benar }]).length === 0, "B: memilih hasil sebelum berhenti tidak memenuhi");
  cek(capai([{ t: "G_DATA", i: 0 }, { t: "G_BERHENTI" }, { t: "G_GESER" }, { t: "G_PILIH", o: B.opsiBanding(0).benar }]).length === 0, "B: berhenti terlalu dini di kolom yang sama tidak memenuhi");
  cek(capai(satuan(2)).join() === "b-satuan", "B: mencoba dari satuan pada undian memenuhi b-satuan");
  cek(capai(satuan(0)).length === 0 && capai(satuan(1)).length === 0 && capai(satuan(3)).length === 0, "B: satuan pada pasangan lain tidak memenuhi b-satuan");
  cek(capai([...urut(0)]).join() === "" && capai([...urut(1)]).join() === "", "B: satu urutan saja belum memenuhi b-urut");
  cek(capai([...urut(0), ...urut(1)]).join() === "b-urut", "B: urut naik dan turun memenuhi b-urut");
  cek(capai([...urut(0), ...urut(2)]).length === 0, "B: dua urutan naik belum memenuhi b-urut");
  cek(capai([{ t: "U_DATA", i: 0 }, { t: "U_PERIKSA" }, ...urut(1)]).length === 0, "B: periksa susunan awal tidak memenuhi");
  cek(capai([...simbol(0), ...simbol(1)]).join() === "b-simbol", "B: tanda lebih kecil dan sama dengan memenuhi b-simbol");
  cek(capai(simbol(0)).length === 0 && capai(simbol(1)).length === 0 && capai([...simbol(2), ...simbol(3)]).length === 0, "B: satu tanda atau pasangan lain tidak memenuhi b-simbol");
  cek(capai([{ t: "S_DATA", i: 0 }, { t: "S_PILIH", o: (B.opsiSimbol(0).benar + 1) % 3 }, { t: "S_DATA", i: 1 }, { t: "S_PILIH", o: (B.opsiSimbol(1).benar + 2) % 3 }]).length === 0, "B: tanda salah tidak memenuhi");
  // Tantangan.
  const enam = [0, 1, 2, 3, 4, 5];
  cek(capai(enam.flatMap(banding)).join() === "b-langsung,b-geser,b-banding-semua", "B: keenam banding memenuhi dua misi dan tantangan");
  cek(capai([0, 1, 2, 3, 4].flatMap(banding)).join() === "b-langsung,b-geser", "B: lima banding belum memenuhi tantangan");
  cek(capai(enam.flatMap(urut)).join() === "b-urut,b-urut-semua", "B: keenam urut memenuhi misi dan tantangan");
  cek(capai([0, 1, 2, 3, 4].flatMap(urut)).join() === "b-urut", "B: lima urut belum memenuhi tantangan");
  cek(capai(enam.flatMap(simbol)).join() === "b-simbol,b-simbol-semua", "B: keenam simbol memenuhi misi dan tantangan");
  cek(capai([0, 1, 2, 3, 4].flatMap(simbol)).join() === "b-simbol", "B: lima simbol belum memenuhi tantangan");
  cek(capai([...banding(2), ...urut(3), ...simbol(5)]).length === 0, "B: riwayat pada pasangan lain, tidak ada misi yang terpenuhi");
  // Gerbang.
  const tampil = M0.tampilMisi(daftar);
  const wajibIds = tampil.filter((m) => m.wajib).map((m) => m.id);
  cek(!M0.wajibSelesai(tampil, new Set(wajibIds.slice(0, 6))) && M0.wajibSelesai(tampil, new Set(wajibIds)), "B: enam dari tujuh wajib belum membuka gerbang, tujuh membuka");
}

/* ------------------------------ Konsep tidak bocor ke Sub-Bab B ------------------------------ */
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
  // Sub-Bab B memakai nilai tempat dan bacaan dari A. Menyusun dan menguraikan bilangan milik Sub-Bab C.
  const BOCOR_B = /(susun|menyusun|komposisi|dekomposisi|\burai|menguraikan|uraian|bentuk panjang|bentuk baku|penukaran|menukar|tukar|expanded|part-whole|flexible|decompos|compos|cara lain|jumlah nilai tempat|bagian nilai tempat|1 ratus ribuan = 10)/i;
  const catat = (teks, apa) => {
    const m = BOCOR_B.exec(teks);
    cek(!m, `B: ${apa} bebas konsep susun, urai, dan penukaran tempat (${m ? m[0] : ""} di "${String(teks).slice(Math.max(0, (m?.index ?? 0) - 30), (m?.index ?? 0) + 40)}")`);
  };
  for (const t of [TK.MISI_K5B9.B, TK.NAMA_SIM_K5B9.B, ...K9.MISI_B.map((m) => m.teks)]) catat(t, "teks misi");
  for (const [nama, o] of [["mesin", MSB.MESIN_BANDING], ["skenario", SK.SKENARIO_K5B9B], ["peta dan infografis ringkas", ringkas.subBab.B]]) catat(teksDari(o), nama);
  for (const [f, e] of [["SimulasiLabBandingK5B9", "tsx"], ["model-banding-k5b9", "tsx"], ["lab-banding-k5b9b", "ts"], ["mesin-banding-k5b9", "ts"]]) catat(tanpaKomentar(baca(f, e)), `${f} (tanpa komentar)`);
  for (const p of globalThis.__pesanB) catat(p, "pesan lab dari fuzz");
  for (const u of [B.ucapBandingK5B9B(y0), B.ucapUrutK5B9B(y0), B.ucapSimbolK5B9B(y0)]) catat(u, "ucapan lab");
  // Kode lab B tidak menyebut nama tampilan atau fungsi Sub-Bab C.

  for (const f of ["SimulasiLabBandingK5B9", "model-banding-k5b9"]) {
    const s = baca(f, "tsx");
    cek(!/correct_index|explanation/.test(s), `${f}: tidak memuat correct_index atau explanation`);
    cek(!/fetch\(|XMLHttpRequest|api\/|openai|anthropic|gemini/i.test(s), `${f}: tanpa jaringan atau model bahasa`);
  }
  for (const f of ["lab-banding-k5b9b", "mesin-banding-k5b9"]) {
    const s = baca(f, "ts");
    cek(!/fetch\(|XMLHttpRequest|from "react"|openai|anthropic|gemini|correct_index|explanation/i.test(s), `${f}: murni`);
    const impor = s.match(/^import .+$/gm) ?? [];
    cek(impor.every((l) => l.startsWith("import type")), `${f}: hanya mengimpor tipe`);
  }
  cek((baca("lab-banding-k5b9b", "ts").match(/^import /gm) ?? []).length === 0, "lab banding tanpa impor sama sekali");
  {
    const s = baca("SimulasiLabBandingK5B9", "tsx");
    cek(/useEffect\(\(\) => \{\s*onKeadaan\?\.\(keadaan\w+\(x\)\);\s*\}, \[onKeadaan, x\]\);/.test(s), "lab B: lapor keadaan lewat useEffect");
    cek(/setLihat\(v\);\s*kirim\(\{ t: "PESAN_KOSONG" \}\);/.test(s), "lab B: ganti tampilan mengosongkan pesan");
    const catatan = [...s.matchAll(/^\s*"([^"]+)",$/gm)].map((m) => m[1]);
    cek(catatan.length >= 3 && catatan.every(tanpaAngka), "lab B: Coba ini dapat dieja");
    for (const lab of ["Geser ke kanan", "Berhenti di kolom ini", "Bandingkan dari satuan", "Periksa urutan"]) cek(s.includes(`aria-label="${lab}"`), `lab B: tombol berlabel ${lab}`);
    for (const awalan of ["Hasil ", "Turunkan ", "Tanda "]) cek(s.includes(`aria-label={\`${awalan}`), `lab B: tombol berlabel ${awalan.trim()}`);
    for (const awalan of ["Pilih pasangan ", "Pilih urutan ", "Pilih simbol pasangan "]) cek(s.includes(`label={\`${awalan}`), `lab B: pilihan data berlabel ${awalan.trim()}`);
    for (const aksi of ["G_GESER", "G_BERHENTI", "G_SATUAN", "G_PILIH", "U_TURUN", "U_PERIKSA", "S_PILIH", "G_DATA", "U_DATA", "S_DATA", "RESET"]) cek(s.includes(`t: "${aksi}"`), `lab B: aksi ${aksi} terhubung ke tombol`);
    cek(/x\.banding\.berhenti \? \(/.test(s), "lab B: pilihan hasil hanya tampil setelah berhenti di kolom beda");
    const m = baca("model-banding-k5b9", "tsx");
    cek(/role="img"/.test(m) && /aria-label=\{`Tabel banding /.test(m), "model B: gambar tabel banding berlabel");
  }
  const pembungkus = baca("SimulasiK5Bab9", "tsx");
  cek(/B: \{ id: "banding", nama: "Lab Banding" \}/.test(pembungkus) && /SKENARIO_K5B9B/.test(pembungkus) && /MESIN_BANDING/.test(pembungkus) && /huruf === "B"/.test(pembungkus), "pembungkus: Sub-Bab B terhubung (lab, mesin, skenario)");
  const coba = [...pembungkus.matchAll(/"([^"]*\?)"/g)].map((m) => m[1]);
  cek(coba.length >= 6 && coba.every(tanpaAngka), "Coba ini mesin A dan B dapat dieja");
  const ucapan = [];
  for (let i = 0; i < 6; i += 1) ucapan.push(B.ucapBandingK5B9B(LB(y0, { t: "G_DATA", i })), B.ucapUrutK5B9B(LB(y0, { t: "U_DATA", i })), B.ucapSimbolK5B9B(LB(y0, { t: "S_DATA", i })));
  cek(ucapan.length === 18 && ucapan.every(tanpaAngka), `semua ${ucapan.length} ucapan lab B dieja menjadi kata`);
}

/* ------------------------------ Emoji dan data ringkas B ------------------------------ */
{
  const berkas = ["SimulasiLabBandingK5B9.tsx", "model-banding-k5b9.tsx", "lab-banding-k5b9b.ts", "mesin-banding-k5b9.ts"];
  let ok = true;
  for (const f of berkas) {
    const s = readFileSync(new URL(`../src/components/modul/${f}`, import.meta.url), "utf8");
    cek(s.charCodeAt(0) !== 0xfeff && !s.includes("\r"), `${f}: UTF-8 tanpa BOM dan akhir baris LF`);
    for (const c of s) if (c.codePointAt(0) > 0x1fa95) ok = false;
  }
  cek(ok, "B: emoji paling tinggi Emoji 12 pada berkas simulasi");
  const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas5-bab9-ringkas.json", import.meta.url), "utf8"));
  const B0 = ringkas.subBab.B;
  const [p1, p2, p3] = B0.infografis.panel;
  cek(B0.infografis.panel.length === 3 && p1.butir.length >= 2 && p2.sisi.length >= 2 && p3.butir.length >= 2, "ringkas B: tiga panel dengan isi");
  sama(B0.peta.cabang.map((c) => c.id), ["kiri", "geser", "tanda", "urut"], "ringkas B: empat cabang");
  cek(B0.peta.kartu.length === 8 && B0.peta.kartu.every((k) => B0.peta.cabang.some((c) => c.id === k.cabang)), "ringkas B: delapan kartu, tiap kartu menunjuk cabang yang ada");
  cek(B0.peta.cabang.every((c) => B0.peta.kartu.filter((k) => k.cabang === c.id).length >= 2), "ringkas B: tiap cabang punya dua kartu atau lebih");
  cek([p1.ide, p2.ide, p3.ide].every((t) => t.split(/\s+/).length <= 8) && B0.peta.cabang.every((c) => c.ringkas.split(/\s+/).length <= 8), "ringkas B: ide dan ringkas paling banyak delapan kata");
  const titikM = (v) => String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const isi = (panel, id) => panel.butir.find((b) => b.id === id).visual.isi;
  sama(isi(p1, "hasil"), `${titikM(432543)} ${cmpMandiri(432543, 342231) > 0 ? ">" : "<"} ${titikM(342231)}`, "ringkas B: hasil banding dihitung mandiri");
  sama(isi(p3, "besar"), `${titikM(432543)} > ${titikM(342231)}`, "ringkas B: tanda lebih besar");
  sama(isi(p3, "kecil"), `${titikM(342231)} ${cmpMandiri(342231, 432543) < 0 ? "<" : ">"} ${titikM(432543)}`, "ringkas B: tanda lebih kecil");
  sama(isi(p3, "naik"), urutMandiri([432543, 342231, 232231], "naik").map(titikM).join(", "), "ringkas B: urut naik dihitung mandiri");
  sama(p2.sisi.find((s) => s.id === "kiri").visual.isi, `${titikM(789876)} ${cmpMandiri(789876, 789867) > 0 ? ">" : "<"} ${titikM(789867)}`, "ringkas B: dari kiri dihitung mandiri");
  cek(kolomPertamaMandiri(432543, 342231) === 0 && isi(p1, "beda") === "4 dan 3" && 4 > 3, "ringkas B: kolom beda 4 dan 3");
  cek(Object.keys(ringkas.subBab).join() === "A,B", "ringkas: Sub-Bab A dan B (C menyusul)");
  cek(JSON.stringify(ringkas).indexOf("\r") < 0 && JSON.stringify(ringkas).split("").every((c) => c.codePointAt(0) <= 0x1fa95), "ringkas: emoji paling tinggi Emoji 12");
}

console.log(`\nLulus: ${lulus}, Gagal: ${gagal}`);
if (gagal > 0) process.exit(1);
