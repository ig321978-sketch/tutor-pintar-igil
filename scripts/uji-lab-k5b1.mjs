// Uji Simulasi Kelas 5 Bab 1 (Bilangan Cacah sampai 100.000): pengeja, Lab Nilai Tempat (A), Lab Banding (B), mesin,
// skenario, misi, gerbang, data ringkas, dan konsep sub-bab berikutnya tidak bocor ke sub-bab sebelumnya.
// Jalankan: node --no-warnings scripts/uji-lab-k5b1.mjs
import { readFileSync } from "node:fs";
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K5 from "../src/components/modul/misi-k5bab1.ts";
import * as TK from "../src/components/modul/misi-teks-k5b1.ts";
import * as A from "../src/components/modul/lab-tempat-k5b1a.ts";
import * as B from "../src/components/modul/lab-banding-k5b1b.ts";
import * as MS from "../src/components/modul/mesin-data-k5b1.ts";
import * as SK from "../src/components/modul/skenario-k5b1.ts";
import * as ME from "../src/components/modul/mesin-bertahap-k3b1.ts";
import * as EJ from "../src/components/modul/eja-k5b1.ts";
import * as D from "../src/components/modul/data-k5b1.ts";

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
const L = A.langkahTempatK5B1A;
const x0 = A.awalTempatK5B1A();

/* ------------------------------ Hitungan MANDIRI (cara berbeda) ------------------------------ */
// Kode memakai pembagian dan sisa bagi. Di sini digit dibaca dari teks angka: tempat dihitung dari kanan, dan nilai
// digit dibentuk dengan menempelkan nol sebanyak tempat di kanannya. Kata bilangan diambil dari data-k5b1.ts.
const NAMA_DARI_KANAN = ["satuan", "puluhan", "ratusan", "ribuan", "puluh ribuan", "ratus ribuan"];
const digitMandiri = (n) => {
  const s = String(n);
  return s.split("").map((c, j) => {
    const dariKanan = s.length - 1 - j;
    return { d: Number(c), tempat: NAMA_DARI_KANAN[dariKanan], nilai: Number(c + "0".repeat(dariKanan)) };
  });
};
/** Aksi menulis n di tabel: tiap digit dinaikkan satu per satu di kolomnya (kolom dihitung dari kanan). */
const aksiTulis = (n) => {
  const s = String(n);
  const aksi = [];
  s.split("").forEach((c, j) => {
    const kolom = 5 - (s.length - 1 - j);
    for (let i = 0; i < Number(c); i += 1) aksi.push({ t: "T_NAIK", k: kolom });
  });
  return aksi;
};

/* ------------------------------ Pengeja dan kata ------------------------------ */
{
  let cocok = 0;
  let total = 0;
  for (let n = 1; n <= 100000; n += 1) {
    total += 1;
    const k = D.kata(n);
    if (EJ.kataK5B1(n) === k && A.bacaBil(n) === k && MS.bacaM(n) === k && A.titik(n) === D.lambang(n) && MS.titikM(n) === D.lambang(n) && EJ.lambangK5B1(n) === D.lambang(n)) cocok += 1;
  }
  cek(cocok === total, `kata dan lambang 1 sampai 100.000 sama dengan data-k5b1 (${cocok}/${total})`);
  cek(EJ.kataK5B1(0) === "nol" && A.bacaBil(0) === "nol", "kata nol");
  sama(EJ.ejaK5B1("14.500 dan 100.000"), "empat belas ribu lima ratus dan seratus ribu", "eja bertitik");
  sama(EJ.ejaK5B1("7 di ribuan bernilai 7.000."), "tujuh di ribuan bernilai tujuh ribu.", "eja akhir kalimat");
  sama(EJ.ejaK5B1("38.600 + 21.400 ≈ 60.000"), "tiga puluh delapan ribu enam ratus ditambah dua puluh satu ribu empat ratus kira-kira enam puluh ribu", "eja tambah dan kira-kira");
  sama(EJ.ejaK5B1("45.230 < 46.001"), "empat puluh lima ribu dua ratus tiga puluh kurang dari empat puluh enam ribu satu", "eja kurang dari");
  sama(EJ.ejaK5B1("Pertanyaan 1 dari 4: 20.040 dibaca …"), "Pertanyaan satu dari empat: dua puluh ribu empat puluh dibaca titik-titik", "eja pertanyaan mesin");
}

/* ------------------------------ Data sama dengan buku (data-k5b1.ts, naskah) ------------------------------ */
{
  const naskah = readFileSync(new URL("../src/components/modul/naskah-k5b1.ts", import.meta.url), "utf8");
  const B = D.ANGKA_BUKU;
  sama(A.DATA_TULIS.map((d) => d.n), [B.bukuYohana, B.hubung[2], B.hubung[0], 100000], "Tulis: 14.500, 40.350, 88.976 dari buku, dan batas 100.000");
  sama(A.DATA_BACA.map((d) => d.n), [B.penduduk, 20040, B.obat], "Baca: penduduk, 20.040, obat");
  cek(naskah.includes("20.040"), "Baca: 20.040 dari naskah (nol penjaga)");
  sama(A.DATA_NILAI.map((d) => d.n), [B.tujuh, B.hubung[2], B.bukuYohana], "Nilai: 87.986, 40.350, 14.500 dari buku");
  sama(MS.KASUS_TEMPAT.map((k) => k.n), [B.bukuYohana, B.tujuh, B.hubung[2]], "Mesin: 14.500, 87.986, 40.350 dari buku");
  cek(D.RONDE_TEMPAT_CA.flat().some((r) => r.n === 87986 && r.tempat === "ribuan" && r.digit === 7 && r.nilai === 7000), "data buku: 7 di ribuan pada 87.986 bernilai 7.000");
  cek(D.RONDE_TEMPAT_CA.flat().some((r) => r.n === 40350 && r.tempat === "puluh ribuan" && r.nilai === 40000), "data buku: 4 pada 40.350 bernilai 40.000");
}

/* ------------------------------ Lab A: Nilai Tempat ------------------------------ */
{
  cek(A.nilaiTulis(x0) === 0 && x0.pernah.length === 0 && x0.pesan === "", "awal: tabel kosong, belum ada riwayat");
  // Tulis: semua target lewat aksi.
  for (const [i, d] of A.DATA_TULIS.entries()) {
    const t = jalan(L(x0, { t: "T_DATA", i }), L, [...aksiTulis(d.n), { t: "T_CEK" }]);
    cek(A.nilaiTulis(t) === d.n && t.pernah.includes(`tulis:${d.n}`) && t.pesan.startsWith("✅") && t.pesan.includes(D.kata(d.n)), `Tulis ${d.n}: tepat dan dibaca ${D.kata(d.n)}`);
    cek(String(d.n).length === digitMandiri(d.n).length && digitMandiri(d.n).reduce((a, v) => a + v.nilai, 0) === d.n, `Tulis ${d.n}: digit mandiri lengkap`);
  }
  // Near-miss Tulis.
  const tulis = (i, n) => jalan(L(x0, { t: "T_DATA", i }), L, [...aksiTulis(n), { t: "T_CEK" }]);
  for (const [i, salah] of [[0, 1450], [0, 15400], [0, 14501], [1, 4035], [1, 40351], [1, 41350], [1, 43050], [2, 88967], [3, 10000]]) {
    const t = tulis(i, salah);
    cek(t.pernah.length === 0 && !t.pesan.startsWith("✅") && t.pesan.includes(A.titik(salah)), `Tulis near-miss ${salah} untuk ${A.DATA_TULIS[i].n} ditolak dan dibacakan`);
  }
  cek(/nol yang hilang/.test(tulis(1, 4035).pesan) && /nol yang hilang/.test(tulis(0, 145).pesan), "Tulis: nol hilang dijelaskan");
  cek(/kosong/.test(L(x0, { t: "T_CEK" }).pesan), "Tulis: tabel kosong diberi tahu");
  // Batas.
  const seratus = jalan(x0, L, aksiTulis(100000));
  for (let k = 0; k < 6; k += 1) {
    const t = L(seratus, { t: "T_NAIK", k });
    cek(A.nilaiTulis(t) === 100000 && /100\.000/.test(t.pesan), `Tulis: di atas 100.000 ditolak (kolom ${k})`);
  }
  const sembilan = jalan(x0, L, Array.from({ length: 9 }, () => ({ t: "T_NAIK", k: 5 })));
  cek(L(sembilan, { t: "T_NAIK", k: 5 }).tulis.digit[5] === 9 && /sembilan/.test(L(sembilan, { t: "T_NAIK", k: 5 }).pesan), "Tulis: satu kolom paling banyak sembilan");
  cek(L(x0, { t: "T_TURUN", k: 2 }) === x0 && L(x0, { t: "T_NAIK", k: 6 }) === x0 && L(x0, { t: "T_DATA", i: 9 }) === x0, "Tulis: aksi di luar batas diabaikan");
  const ulang = jalan(x0, L, [...aksiTulis(14500), { t: "T_ULANG" }]);
  cek(A.nilaiTulis(ulang) === 0, "Tulis: kosongkan");

  // Baca: tepat satu bacaan benar (dibanding kata data), pengecoh dihitung dan salah.
  for (const [i, d] of A.DATA_BACA.entries()) {
    const opsi = A.opsiBaca(i);
    cek(opsi.length === 3 && new Set(opsi).size === 3 && opsi.filter((o) => o === D.kata(d.n)).length === 1, `Baca ${d.n}: tiga pilihan unik, satu sama dengan kata buku`);
    const digit = String(d.n).split("").map((c) => ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"][Number(c)]).join(" ");
    cek(opsi.includes(digit), `Baca ${d.n}: pengecoh digit satu per satu`);
    const tukar = A.tukarDigit(d.n);
    cek(tukar !== d.n && [...String(tukar)].sort().join() === [...String(d.n)].sort().join() && opsi.includes(D.kata(tukar)), `Baca ${d.n}: pengecoh ${tukar} memakai digit yang sama, tempat beda`);
    const xb = L(x0, { t: "B_DATA", i });
    const benar = L(xb, { t: "B_JAWAB", nilai: D.kata(d.n) });
    cek(benar.pernah.includes(`baca:${d.n}`) && benar.pesan.startsWith("✅"), `Baca ${d.n}: bacaan benar tercatat`);
    for (const o of opsi.filter((v) => v !== D.kata(d.n))) {
      const t = L(xb, { t: "B_JAWAB", nilai: o });
      cek(!t.pernah.includes(`baca:${d.n}`) && !t.pesan.startsWith("✅") && t.pesan.length > 10, `Baca ${d.n}: "${o}" ditolak`);
      cek(t.pernah.includes("baca-digit") === (o === digit), `Baca ${d.n}: "${o}" tercatat baca digit dengan tepat`);
    }
  }
  const pos = A.DATA_BACA.map((d, i) => A.opsiBaca(i).indexOf(D.kata(d.n)));
  cek(new Set(pos).size === 3, `Baca: letak bacaan benar bervariasi (${pos.join("")})`);
  cek(L(x0, { t: "B_JAWAB", nilai: "x" }) === x0 && L(x0, { t: "B_DATA", i: 3 }) === x0, "Baca: aksi di luar batas diabaikan");

  // Nilai: tiap digit tiap bilangan, tempat dan nilai dibandingkan dengan hitungan mandiri.
  for (const [i, d] of A.DATA_NILAI.entries()) {
    const xn = L(x0, { t: "N_DATA", i });
    const man = digitMandiri(d.n);
    cek(A.digitTulis(d.n).length === man.length, `Nilai ${d.n}: banyak digit`);
    for (const [j, m] of man.entries()) {
      const xd = L(xn, { t: "N_DIGIT", j });
      const opsi = A.opsiNilai(d.n, j);
      cek(opsi.length === 3 && new Set(opsi).size === 3 && opsi.filter((v) => v === m.nilai).length === 1, `Nilai ${d.n}/${j}: tiga pilihan unik, satu benar (${m.nilai})`);
      cek(opsi.every((v) => Number.isInteger(v) && v >= 0 && v <= 100000), `Nilai ${d.n}/${j}: pilihan bulat dalam batas`);
      // Nilai sebelum tempat tidak dicatat.
      cek(!L(xd, { t: "N_NILAI", nilai: m.nilai }).pernah.includes(`nilai:${d.n}:${j}`), `Nilai ${d.n}/${j}: nilai sebelum tempat tidak dicatat`);
      for (const t of A.TEMPAT.filter((v) => v !== m.tempat)) {
        const s = jalan(xd, L, [{ t: "N_TEMPAT", tempat: t }, { t: "N_NILAI", nilai: m.nilai }]);
        cek(!s.pernah.includes(`nilai:${d.n}:${j}`) && !s.nilai.tempatOk, `Nilai ${d.n}/${j}: tempat ${t} salah tidak dicatat`);
      }
      const xt = L(xd, { t: "N_TEMPAT", tempat: m.tempat });
      cek(xt.nilai.tempatOk && xt.pesan.startsWith("✅"), `Nilai ${d.n}/${j}: tempat ${m.tempat} benar`);
      const ok = L(xt, { t: "N_NILAI", nilai: m.nilai });
      cek(ok.pernah.includes(`nilai:${d.n}:${j}`) && ok.pesan.startsWith("✅"), `Nilai ${d.n}/${j}: nilai ${m.nilai} tercatat`);
      for (const v of opsi.filter((o) => o !== m.nilai)) {
        const s = L(xt, { t: "N_NILAI", nilai: v });
        cek(!s.pernah.includes(`nilai:${d.n}:${j}`) && !s.pesan.startsWith("✅"), `Nilai ${d.n}/${j}: ${v} ditolak`);
        cek(s.pernah.includes("lupa-tempat") === (v === m.d && m.d !== 0), `Nilai ${d.n}/${j}: ${v} lupa tempat tercatat tepat`);
      }
      // Ganti digit membatalkan tempat yang sudah benar.
      const lain = (j + 1) % man.length;
      cek(!L(xt, { t: "N_DIGIT", j: lain }).nilai.tempatOk, `Nilai ${d.n}/${j}: ganti digit mengulang tempat`);
    }
  }
  cek(/Ketuk dulu/.test(L(x0, { t: "N_TEMPAT", tempat: "ribuan" }).pesan), "Nilai: tempat tanpa digit diberi tahu");
  cek(L(x0, { t: "N_DIGIT", j: 5 }) === x0 && L(x0, { t: "N_TEMPAT", tempat: "ribu" }) === x0 && L(L(x0, { t: "N_DIGIT", j: 1 }), { t: "N_NILAI", nilai: 123 }).pesan === "", "Nilai: aksi di luar batas diabaikan");

  // Fuzz.
  const acak = acakDari(51);
  let s = x0;
  let ok = true;
  const pesanSemua = new Set();
  const riwayatSemua = new Set();
  for (let i = 0; i < 20000; i += 1) {
    const p = acak(16);
    const j = s.nilai.pilih ?? 0;
    const a =
      p <= 4 ? { t: "T_NAIK", k: acak(7) } :
      p === 5 ? { t: "T_TURUN", k: acak(7) } :
      p === 6 ? (acak(3) === 0 ? { t: "T_DATA", i: acak(5) } : { t: "T_CEK" }) :
      p === 7 ? (acak(8) === 0 ? { t: "T_ULANG" } : { t: "PESAN_KOSONG" }) :
      p === 8 ? { t: "B_DATA", i: acak(4) } :
      p === 9 ? { t: "B_JAWAB", nilai: acak(6) === 0 ? "x" : A.opsiBaca(s.baca.data)[acak(3)] } :
      p === 10 ? { t: "N_DATA", i: acak(4) } :
      p === 11 ? { t: "N_DIGIT", j: acak(6) } :
      p === 12 ? { t: "N_TEMPAT", tempat: acak(8) === 0 ? "x" : A.TEMPAT[acak(6)] } :
      p <= 14 ? { t: "N_NILAI", nilai: acak(6) === 0 ? 7 : A.opsiNilai(A.bilNilai(s), j)[acak(3)] } :
      acak(40) === 0 ? { t: "RESET" } : aksiTulis(A.targetTulis(s))[0] ?? { t: "T_CEK" };
    const t = L(s, a);
    if (a.t !== "RESET" && !s.pernah.every((v) => t.pernah.includes(v))) ok = false;
    if (t.tulis.digit.length !== 6 || t.tulis.digit.some((v) => !Number.isInteger(v) || v < 0 || v > 9) || A.nilaiTulis(t) > 100000) ok = false;
    if (!(t.tulis.data >= 0 && t.tulis.data < A.DATA_TULIS.length && t.baca.data >= 0 && t.baca.data < A.DATA_BACA.length && t.nilai.data >= 0 && t.nilai.data < A.DATA_NILAI.length)) ok = false;
    if (t.nilai.pilih !== null && (t.nilai.pilih < 0 || t.nilai.pilih >= A.digitTulis(A.bilNilai(t)).length)) ok = false;
    if (t.nilai.pilih === null && t.nilai.tempatOk) ok = false;
    for (const id of t.pernah) if (!/^(tulis:(14500|40350|88976|100000)|baca:(26932|20040|66500)|baca-digit|lupa-tempat|nilai:(87986|40350|14500):[0-4])$/.test(id)) ok = false;
    if (t.pesan) pesanSemua.add(t.pesan);
    for (const id of t.pernah) riwayatSemua.add(id);
    s = t;
  }
  cek(ok, "fuzz 20.000 aksi Lab Nilai Tempat: batas terjaga, riwayat tidak dicabut");
  cek(pesanSemua.size > 15 && [...pesanSemua].every(tanpaAngka), `fuzz Lab Nilai Tempat: semua ${pesanSemua.size} pesan dieja menjadi kata`);
  cek(riwayatSemua.size > 8, `fuzz Lab Nilai Tempat: riwayat terkumpul (${[...riwayatSemua].join(" ")})`);
  globalThis.__pesanA = [...pesanSemua];
}

/* ------------------------------ Mesin ------------------------------ */
{
  for (const def of MS.SEMUA_MESIN_K5B1) {
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
      // Main sampai selesai lewat mesin.
    }
    cek(new Set(posisi).size === 3, `${def.id}: letak kunci bervariasi`);
    let x = ME.awalMesin(def);
    let n = 0;
    while (!x.selesai && n < 100) {
      n += 1;
      const l = ME.langkahAktif(x);
      x = l ? ME.langkahMesin(x, { t: "JAWAB", nilai: l.benar }) : ME.langkahMesin(x, { t: "LANJUT" });
    }
    cek(x.selesai && def.selesaiId === K5.ID_MESIN_K5B1[def === MS.MESIN_TEMPAT ? "A" : "B"], `${def.id}: bisa diselesaikan, id selesai sesuai misi`);
  }
  // Kunci dan pengecoh dihitung ulang mandiri.
  for (const [i, k] of MS.KASUS_TEMPAT.entries()) {
    const c = MS.MESIN_TEMPAT.kasus[i];
    const [tulis, tempat, nilai, baca] = c.langkah;
    const man = digitMandiri(k.n);
    const f = man.filter((m) => m.tempat === k.tempat);
    cek(f.length === 1, `Mesin ${k.n}: tempat ${k.tempat} ada`);
    const fokus = f[0];
    cek(man.filter((m) => m.d === fokus.d).length === 1, `Mesin ${k.n}: digit ${fokus.d} hanya sekali (tidak ambigu)`);
    cek(tulis.benar === D.lambang(k.n) && tulis.tanya.includes(D.kata(k.n)), `Mesin ${k.n}: tulis ${D.lambang(k.n)} dari kata`);
    cek(tulis.opsi.every((o) => o === tulis.benar || Number(o.replace(".", "")) !== k.n), `Mesin ${k.n}: pengecoh tulis bukan bilangan itu`);
    cek(tempat.benar === fokus.tempat && tempat.tanya.includes(`digit ${fokus.d} `), `Mesin ${k.n}: digit ${fokus.d} di ${fokus.tempat}`);
    cek(nilai.benar === D.lambang(fokus.nilai) && nilai.opsi.every((o) => o === nilai.benar || Number(o.replace(".", "")) !== fokus.nilai), `Mesin ${k.n}: nilai ${fokus.nilai}; pengecoh salah`);
    cek(nilai.opsi.includes(String(fokus.d)), `Mesin ${k.n}: pengecoh digit saja (lupa tempat)`);
    cek(baca.benar === D.kata(k.n) && baca.opsi.every((o) => o === baca.benar || o !== D.kata(k.n)), `Mesin ${k.n}: baca ${D.kata(k.n)}`);
    cek(EJ.ejaK5B1(c.ringkas).includes(D.kata(k.n)), `Mesin ${k.n}: ringkas dieja dengan bacaan benar`);
  }
}

/* ------------------------------ Skenario ------------------------------ */
{
  const S = SK.SKENARIO_K5B1A;
  cek(S.adegan.length >= 5 && S.adegan.length <= 8, `${S.id}: 5 sampai 8 adegan`);
  cek(S.adegan[0].jenis === "narasi" && S.adegan[S.adegan.length - 1].jenis === "akhir", `${S.id}: buka dan tutup`);
  cek(new Set(S.adegan.map((a) => a.jenis)).size >= 4, `${S.id}: paling sedikit empat jenis adegan`);
  cek(S.adegan.every((a) => tanpaAngka(a.cerita)), `${S.id}: cerita dapat dieja`);
  sama(S.id.replace(/-k5b1$/, ""), K5.ID_SKENARIO_K5B1.A, "id skenario sesuai id misi");
  const adegan = (id) => S.adegan.find((a) => a.id === id);
  const B = D.ANGKA_BUKU;
  cek(adegan("tulis").cerita.includes(D.kata(B.penduduk)) && adegan("tulis").opsi.find((o) => o.benar).teks === D.lambang(B.penduduk), "A: penduduk ditulis dari kata buku");
  cek(adegan("tulis").opsi.filter((o) => !o.benar).every((o) => Number(o.teks.replace(".", "")) !== B.penduduk), "A: pengecoh tulis bukan penduduk");
  cek(adegan("digit").cerita.includes(D.lambang(B.perempuan)) && adegan("digit").jumlah === String(B.perempuan).length, "A: banyak digit penduduk perempuan (dihitung)");
  const puluhan = digitMandiri(B.laki).find((m) => m.tempat === "puluhan").d;
  cek(adegan("puluhan").cerita.includes(D.lambang(B.laki)) && adegan("puluhan").target === puluhan && adegan("puluhan").target <= adegan("puluhan").maks, "A: digit puluhan penduduk laki-laki (dihitung)");
  const soal = adegan("nilai").soal;
  const sembilan = digitMandiri(B.penduduk).find((m) => m.d === 9);
  cek(soal[0].teks.includes(D.lambang(B.penduduk)) && soal[0].jawaban === String(sembilan.nilai), "A: nilai digit sembilan pada penduduk (dihitung)");
  cek(soal[0].opsi.filter((o) => o !== soal[0].jawaban).every((o) => Number(o.replace(".", "")) !== sembilan.nilai), "A: pengecoh nilai sembilan salah");
  const pr = digitMandiri(B.perempuan).find((m) => m.tempat === "puluh ribuan").d;
  cek(soal[1].jawaban === String(pr) && soal[1].opsi.filter((o) => o !== soal[1].jawaban).every((o) => Number(o) !== pr), "A: digit puluh ribuan penduduk perempuan (dihitung)");
  cek(soal[2].jawaban === "menjaga tempat", "A: nol menjaga tempat");
  const nol = adegan("nol");
  cek(nol.cerita.includes(D.kata(40350)) && nol.opsi.find((o) => o.benar).teks.includes(D.lambang(40350)), "A: nol penjaga 40.350 dari kata");
  cek(D.kata(4035) !== D.kata(40350) && nol.cerita.includes(D.lambang(4035)) && /empat ribu tiga puluh lima/.test(nol.opsi[0].umpan) && D.kata(4035) === "empat ribu tiga puluh lima", "A: 4.035 dibaca bilangan lain (dihitung)");
  const posisi = S.adegan.filter((a) => a.jenis === "pilih").map((a) => a.opsi.findIndex((o) => o.benar));
  cek(new Set(posisi).size === posisi.length, `A: letak jawaban pilih bervariasi (${posisi.join("")})`);
}

/* ------------------------------ Misi ------------------------------ */
{
  const huruf = ["A", "B"];
  sama(Object.keys(TK.MISI_K5B1), huruf, "teks misi untuk A dan B");
  sama(Object.keys(TK.NAMA_SIM_K5B1), huruf, "nama simulasi untuk A dan B");
  cek(TK.hurufK5B1("Z") === "A" && TK.hurufK5B1("A") === "A" && TK.hurufK5B1("B") === "B", "huruf tak dikenal jatuh ke A");
  cek(huruf.every((h) => TK.misiAwalK5Bab1(h).startsWith("Simulasi 1. Misi: ") && tanpaAngka(TK.misiAwalK5Bab1(h))), "misi awal dan dapat dieja");
  for (const h of huruf) {
    const daftar = K5.daftarMisiK5Bab1(h);
    cek(daftar.filter((m) => m.wajib).length === 7 && daftar.filter((m) => !m.wajib).length === 3, `${h}: tujuh misi wajib dan tiga tantangan bebas`);
    cek(new Set(daftar.map((m) => m.id)).size === 10 && daftar.every((m) => m.id.startsWith(`${h.toLowerCase()}-`)), `${h}: id misi unik berawalan huruf`);
    const kosong = [{ alat: "nilai-tempat", pernah: [] }, { alat: "banding", pernah: [] }, sel("tidak-ada"), A.keadaanTempatK5B1A(A.awalTempatK5B1A()), B.keadaanBandingK5B1B(B.awalBandingK5B1B())];
    cek(kosong.every((k) => M0.misiBaru(daftar, k, new Set()).length === 0), `${h}: keadaan awal alat tidak memenuhi misi mana pun`);
    cek(daftar.every((m) => m.teks.length > 20 && tanpaAngka(m.teks)), `${h}: teks misi jelas dan dapat dieja`);
    const baru = (k) => M0.misiBaru(daftar, k, new Set());
    cek(baru(sel(K5.ID_MESIN_K5B1[h])).join() === `${h.toLowerCase()}-mesin` && baru(sel(K5.ID_SKENARIO_K5B1[h])).join() === `${h.toLowerCase()}-skenario`, `${h}: id mesin dan skenario memenuhi misinya`);
  }
  cek(M0.misiBaru(K5.MISI_A, { alat: "lain", pernah: ["tulis:14500", "baca:26932"] }, new Set()).length === 0, "A: riwayat alat lain tidak memenuhi misi A");

  // Jalur nyata lewat aksi lab, dan near-miss.
  const capai = (aksi) => M0.misiBaru(K5.MISI_A, A.keadaanTempatK5B1A(jalan(A.awalTempatK5B1A(), L, aksi)), new Set());
  const tulis = (i, n) => [{ t: "T_DATA", i }, ...aksiTulis(n), { t: "T_CEK" }];
  cek(capai(tulis(0, 14500)).join() === "a-yohana", "A: tulis 14.500 memenuhi");
  cek(capai(tulis(0, 1450)).length === 0 && capai(tulis(0, 15400)).length === 0 && capai([...aksiTulis(14500)]).length === 0, "A: 1.450, 15.400, atau belum diperiksa tidak memenuhi");
  cek(capai(tulis(1, 40350)).join() === "a-nol", "A: tulis 40.350 memenuhi");
  cek(capai(tulis(1, 4035)).length === 0 && capai(tulis(1, 40305)).length === 0, "A: 4.035 dan 40.305 tidak memenuhi");
  cek(capai(tulis(0, 40350)).length === 0, "A: 40.350 saat target lain tidak memenuhi");
  cek(capai(tulis(3, 100000)).join() === "a-enam", "A: tantangan 100.000");
  const bacaKe = (i, nilai) => [{ t: "B_DATA", i }, { t: "B_JAWAB", nilai }];
  cek(capai(bacaKe(0, D.kata(26932))).join() === "a-baca", "A: baca penduduk memenuhi");
  cek(capai(bacaKe(0, D.kata(29632))).length === 0, "A: bacaan 29.632 tidak memenuhi");
  cek(capai(bacaKe(0, "dua enam sembilan tiga dua")).join() === "a-digit", "A: baca digit satu per satu hanya tantangan");
  cek(capai(bacaKe(1, D.kata(20040))).length === 0, "A: baca 20.040 bukan misi penduduk");
  const nilai = (i, j, tempat, v) => [{ t: "N_DATA", i }, { t: "N_DIGIT", j }, { t: "N_TEMPAT", tempat }, { t: "N_NILAI", nilai: v }];
  cek(capai(nilai(0, 1, "ribuan", 7000)).join() === "a-tujuh", "A: 7 di ribuan bernilai 7.000 memenuhi");
  cek(capai(nilai(0, 1, "ratusan", 7000)).length === 0 && capai(nilai(0, 1, "ribuan", 7)).length === 0 && capai(nilai(0, 3, "puluhan", 80)).length === 0, "A: tempat salah, digit saja, atau digit lain tidak memenuhi");
  cek(capai([{ t: "N_DATA", i: 0 }, { t: "N_DIGIT", j: 1 }, { t: "N_NILAI", nilai: 7000 }]).length === 0, "A: nilai tanpa tempat tidak memenuhi");
  cek(capai(nilai(1, 0, "puluh ribuan", 40000)).join() === "a-empat", "A: 4 di puluh ribuan bernilai 40.000 memenuhi");
  cek(capai(nilai(1, 0, "puluh ribuan", 4000)).length === 0 && capai(nilai(1, 0, "puluh ribuan", 4)).length === 0, "A: 4.000 atau 4 tidak memenuhi");
  cek(capai(nilai(1, 4, "satuan", 0)).join() === "a-nolsatuan" && capai(nilai(1, 1, "ribuan", 0)).length === 0, "A: tantangan nol di satuan (bukan nol di ribuan)");

  // Gerbang.
  for (const h of huruf) {
    const daftar = M0.tampilMisi(K5.daftarMisiK5Bab1(h));
    const wajibIds = daftar.filter((m) => m.wajib).map((m) => m.id);
    cek(!M0.wajibSelesai(daftar, new Set(wajibIds.slice(0, 6))), `${h}: enam dari tujuh wajib belum membuka gerbang`);
    cek(M0.wajibSelesai(daftar, new Set(wajibIds)), `${h}: tujuh wajib membuka gerbang`);
    cek(M0.bolehLanjut({ adaMisi: true, wajibSelesai: false, dilewati: true, disentuh: true }) && !M0.bolehLanjut({ adaMisi: true, wajibSelesai: false, dilewati: true, disentuh: false }), "lewati hanya setelah disentuh");
  }
}

/* ------------------------------ Sub-Bab B: hitungan MANDIRI ------------------------------ */
// Kode memakai perbandingan angka, findIndex digit, pembagian, dan sort. Di sini tanda dicari dengan membandingkan
// teks angka yang ditulis lima digit (urutan kamus), penentu dengan menyusuri teks, ruas dengan penjumlahan berulang,
// dan urutan dengan sisip satu per satu.
const lima5 = (n) => String(n).padStart(5, "0");
const tandaMandiri = (a, b) => (lima5(a) === lima5(b) ? "=" : lima5(a) < lima5(b) ? "<" : ">");
const penentuMandiri = (a, b) => {
  const s = lima5(a);
  const t = lima5(b);
  for (let i = 0; i < 5; i += 1) if (s[i] !== t[i]) return i;
  return 5;
};
const NAMA5 = ["puluh ribuan", "ribuan", "ratusan", "puluhan", "satuan"];
const ruasMandiri = (dari, langkah, n) => {
  let r = 0;
  while (dari + (r + 1) * langkah <= n) r += 1;
  return r;
};
const urutMandiri = (angka, arah) => {
  const hasil = [];
  for (const n of angka) {
    let i = 0;
    while (i < hasil.length && (arah === "naik" ? tandaMandiri(hasil[i], n) === "<" : tandaMandiri(hasil[i], n) === ">")) i += 1;
    hasil.splice(i, 0, n);
  }
  return hasil;
};
const LB = B.langkahBandingK5B1B;
const y0 = B.awalBandingK5B1B();
const aksiBanding = (i) => {
  const ps = B.DATA_BANDING[i];
  const p = penentuMandiri(ps.a, ps.b);
  return [{ t: "B_DATA", i }, ...Array.from({ length: p === 5 ? 5 : p + 1 }, (_, k) => ({ t: "B_KOLOM", k })), { t: "B_TANDA", tanda: tandaMandiri(ps.a, ps.b) }];
};
const aksiGaris = (i, ubah = (r) => r) => {
  const g = B.DATA_GARIS[i];
  return [{ t: "G_DATA", i }, ...g.angka.flatMap((n, j) => [{ t: "G_PILIH", j }, { t: "G_RUAS", r: ubah(ruasMandiri(g.dari, g.langkah, n), j) }]), { t: "G_CEK" }];
};
const aksiUrut = (i, susunan) => {
  const u = B.DATA_URUT[i];
  const urut = susunan ?? urutMandiri(u.angka, u.arah);
  return [{ t: "U_DATA", i }, ...urut.map((n) => ({ t: "U_KETUK", j: u.angka.indexOf(n) })), { t: "U_CEK" }];
};
const naskahK5 = readFileSync(new URL("../src/components/modul/naskah-k5b1.ts", import.meta.url), "utf8");

/* ------------------------------ Data B sama dengan buku ------------------------------ */
{
  const pasangBuku = D.RONDE_BANDING_CB.flat().map((r) => `${r.a}-${r.b}`);
  for (const ps of B.DATA_BANDING) {
    const ada = pasangBuku.includes(`${ps.a}-${ps.b}`) || naskahK5.includes(`${D.lambang(ps.a)} dan ${D.lambang(ps.b)}`);
    cek(ada, `Banding ${ps.a} dan ${ps.b} dari buku atau naskah`);
    const r = D.RONDE_BANDING_CB.flat().find((v) => v.a === ps.a && v.b === ps.b);
    if (r) cek(r.tanda === tandaMandiri(ps.a, ps.b), `Banding ${ps.a} dan ${ps.b}: tanda buku sama dengan hitungan mandiri`);
  }
  cek([...B.DATA_URUT[0].angka].sort().join() === [...D.ANGKA_BUKU.dakon].sort().join(), "Urut: skor dakon sama dengan buku");
  cek(B.DATA_URUT[1].angka.every((n) => D.RONDE_URUT_CB[1].angka.includes(n)), "Urut: empat bilangan dari buku");
  cek(B.DATA_URUT[2].angka.every((n) => D.RONDE_CERITA_CB.flat().some((r) => r.teks.includes(D.lambang(n)))), "Urut: tiga bilangan dari soal cerita buku");
  cek(B.DATA_GARIS[0].angka.every((n) => naskahK5.includes(D.lambang(n))) && naskahK5.includes("Acuan 40.000"), "Garis: 38.500, 40.200, 39.999 dan acuan 40.000 dari naskah");
  cek([...B.DATA_GARIS[1].angka].sort().join() === [...D.ANGKA_BUKU.dakon].sort().join(), "Garis: skor dakon dari buku");
}

/* ------------------------------ Lab B: Banding ------------------------------ */
{
  cek(y0.pernah.length === 0 && y0.pesan === "" && y0.banding.buka === 0 && y0.urut.susun.length === 0 && y0.garis.letak.every((v) => v === null), "B awal: belum ada riwayat");
  for (const [i, ps] of B.DATA_BANDING.entries()) {
    const p = penentuMandiri(ps.a, ps.b);
    cek(B.penentu(ps) === p, `Banding ${ps.a}/${ps.b}: penentu ${p} (mandiri)`);
    const t = jalan(y0, LB, aksiBanding(i));
    cek(t.pernah.includes(`banding:${ps.a}-${ps.b}`) && t.pesan.startsWith("✅") && t.pesan.includes(`${D.lambang(ps.a)} ${tandaMandiri(ps.a, ps.b)} ${D.lambang(ps.b)}`), `Banding ${ps.a}/${ps.b}: tanda ${tandaMandiri(ps.a, ps.b)} tercatat`);
    if (p < 5) cek(t.pesan.includes(NAMA5[p]), `Banding ${ps.a}/${ps.b}: pesan menyebut penentu ${NAMA5[p]}`);
    for (const salah of B.TANDA.filter((v) => v !== tandaMandiri(ps.a, ps.b))) {
      const s = jalan(y0, LB, [...aksiBanding(i).slice(0, -1), { t: "B_TANDA", tanda: salah }]);
      cek(!s.pernah.includes(`banding:${ps.a}-${ps.b}`) && !s.pesan.startsWith("✅"), `Banding ${ps.a}/${ps.b}: tanda ${salah} ditolak`);
    }
    const dini = jalan(y0, LB, [{ t: "B_DATA", i }, ...Array.from({ length: p === 5 ? 4 : p }, (_, k) => ({ t: "B_KOLOM", k })), { t: "B_TANDA", tanda: tandaMandiri(ps.a, ps.b) }]);
    cek(!dini.pernah.includes(`banding:${ps.a}-${ps.b}`) && /Periksa dulu/.test(dini.pesan), `Banding ${ps.a}/${ps.b}: tanda sebelum penentu ditolak`);
    const satuan = jalan(y0, LB, [{ t: "B_DATA", i }, { t: "B_KOLOM", k: 4 }]);
    cek(satuan.banding.buka === 0 && satuan.pernah.includes("dari-satuan") && /satuan/.test(satuan.pesan), `Banding ${ps.a}/${ps.b}: satuan lebih dulu dijelaskan`);
    const lompat = jalan(y0, LB, [{ t: "B_DATA", i }, { t: "B_KOLOM", k: 2 }]);
    cek(lompat.banding.buka === 0 && !lompat.pernah.includes("dari-satuan"), `Banding ${ps.a}/${ps.b}: lompat kolom ditolak`);
    if (p < 4) {
      const lewat = LB(jalan(y0, LB, aksiBanding(i).slice(0, -1)), { t: "B_KOLOM", k: p + 1 });
      cek(lewat.banding.buka === p + 1 && /sudah ketemu/.test(lewat.pesan), `Banding ${ps.a}/${ps.b}: kolom setelah penentu tidak perlu`);
    }
  }
  cek(LB(y0, { t: "B_KOLOM", k: 5 }) === y0 && LB(y0, { t: "B_TANDA", tanda: "x" }) === y0 && LB(y0, { t: "B_DATA", i: 9 }) === y0, "Banding: aksi di luar batas diabaikan");

  // Garis.
  for (const [i, g] of B.DATA_GARIS.entries()) {
    cek(g.angka.every((n) => B.ruasBenar(g, n) === ruasMandiri(g.dari, g.langkah, n) && ruasMandiri(g.dari, g.langkah, n) < B.RUAS), `Garis ${g.id}: ruas dihitung sama dan muat`);
    const t = jalan(y0, LB, aksiGaris(i));
    cek(t.pernah.includes(`garis:${g.id}`) && t.pesan.startsWith("✅") && t.pesan.includes(urutMandiri(g.angka, "naik").map(D.lambang).join(" < ")), `Garis ${g.id}: tepat, urutan di pesan dihitung`);
    const kiri = urutMandiri(g.angka.filter((n) => tandaMandiri(n, g.acuan) === "<"), "naik").map(D.lambang);
    const kanan = urutMandiri(g.angka.filter((n) => tandaMandiri(n, g.acuan) === ">"), "naik").map(D.lambang);
    cek(kiri.length + kanan.length === g.angka.length && (!kiri.length || t.pesan.includes(`${kiri.join(", ")} di kiri ${D.lambang(g.acuan)}`)) && (!kanan.length || t.pesan.includes(`${kanan.join(", ")} di kanan ${D.lambang(g.acuan)}`)), `Garis ${g.id}: sisi acuan tiap bilangan (mandiri)`);
    for (let j = 0; j < g.angka.length; j += 1)
      for (const geser of [-1, 1]) {
        const asli = ruasMandiri(g.dari, g.langkah, g.angka[j]);
        const baru = Math.min(9, Math.max(0, asli + geser));
        if (baru === asli) continue;
        const s = jalan(y0, LB, aksiGaris(i, (r, jj) => (jj === j ? baru : r)));
        cek(!s.pernah.includes(`garis:${g.id}`) && !s.pesan.startsWith("✅"), `Garis ${g.id}: ${g.angka[j]} geser ${geser} ruas ditolak`);
      }
    const belum = jalan(y0, LB, [{ t: "G_DATA", i }, { t: "G_PILIH", j: 0 }, { t: "G_RUAS", r: 3 }, { t: "G_CEK" }]);
    cek(!belum.pernah.length && /belum diletakkan/.test(belum.pesan), `Garis ${g.id}: belum semua diletakkan ditolak`);
  }
  {
    const tanpa = jalan(y0, LB, aksiGaris(0).slice(0, -1));
    cek(tanpa.garis.pilih === null && /Ketuk dulu/.test(LB(tanpa, { t: "G_RUAS", r: 2 }).pesan), "Garis: ruas tanpa bilangan terpilih diberi tahu");
    cek(LB(y0, { t: "G_RUAS", r: 10 }) === y0 && LB(y0, { t: "G_PILIH", j: 7 }) === y0, "Garis: aksi di luar batas diabaikan");
  }

  // Urut.
  for (const [i, u] of B.DATA_URUT.entries()) {
    const benar = urutMandiri(u.angka, u.arah);
    sama(B.urutBenar(u), benar, `Urut ${u.id}: urutan sama dengan sisip mandiri`);
    const t = jalan(y0, LB, aksiUrut(i));
    cek(t.pernah.includes(`urut:${u.id}`) && t.pesan.startsWith("✅") && t.pesan.includes(benar.map(D.lambang).join(u.arah === "naik" ? " < " : " > ")), `Urut ${u.id}: tepat`);
    const balik = jalan(y0, LB, aksiUrut(i, [...benar].reverse()));
    cek(!balik.pernah.includes(`urut:${u.id}`) && /Itu urutan/.test(balik.pesan), `Urut ${u.id}: arah terbalik ditolak dan dijelaskan`);
    const tukar = [...benar];
    [tukar[0], tukar[1]] = [tukar[1], tukar[0]];
    const s = jalan(y0, LB, aksiUrut(i, tukar));
    cek(!s.pernah.includes(`urut:${u.id}`) && s.pesan.includes(D.lambang(tukar[0])), `Urut ${u.id}: dua bilangan tertukar ditolak`);
    const kurang = jalan(y0, LB, aksiUrut(i, benar.slice(0, -1)));
    cek(!kurang.pernah.includes(`urut:${u.id}`) && /Ketuk semua/.test(kurang.pesan), `Urut ${u.id}: belum semua ditolak`);
  }
  cek(jalan(y0, LB, aksiUrut(2)).pesan.includes(`tengahnya ${D.lambang(urutMandiri(B.DATA_URUT[2].angka, "naik")[1])}`), "Urut: bilangan tengah dihitung");
  cek(LB(y0, { t: "U_KETUK", j: 9 }) === y0 && LB(LB(y0, { t: "U_KETUK", j: 0 }), { t: "U_KETUK", j: 0 }).urut.susun.length === 1, "Urut: ketuk dobel dan di luar batas diabaikan");

  // Fuzz.
  const acak = acakDari(52);
  let s = y0;
  let ok = true;
  const pesanSemua = new Set();
  const riwayatSemua = new Set();
  for (let i = 0; i < 20000; i += 1) {
    const p = acak(16);
    const a =
      p <= 2 ? { t: "B_KOLOM", k: acak(3) === 0 ? acak(6) : s.banding.buka } :
      p === 3 ? { t: "B_TANDA", tanda: acak(8) === 0 ? "x" : B.TANDA[acak(3)] } :
      p === 4 ? (acak(4) === 0 ? { t: "B_ULANG" } : { t: "B_DATA", i: acak(6) }) :
      p === 5 ? { t: "G_DATA", i: acak(3) } :
      p === 6 ? { t: "G_PILIH", j: acak(5) } :
      p <= 8 ? { t: "G_RUAS", r: acak(3) === 0 ? acak(11) : B.ruasBenar(B.garisAktif(s), B.garisAktif(s).angka[s.garis.pilih ?? 0]) } :
      p === 9 ? (acak(6) === 0 ? { t: "G_ULANG" } : { t: "G_CEK" }) :
      p === 10 ? { t: "U_DATA", i: acak(4) } :
      p <= 12 ? { t: "U_KETUK", j: acak(5) } :
      p === 13 ? (acak(3) === 0 ? { t: "U_BATAL" } : acak(5) === 0 ? { t: "U_ULANG" } : { t: "U_CEK" }) :
      p === 14 ? { t: "PESAN_KOSONG" } :
      acak(40) === 0 ? { t: "RESET" } : { t: "G_CEK" };
    const t = LB(s, a);
    if (a.t !== "RESET" && !s.pernah.every((v) => t.pernah.includes(v))) ok = false;
    if (t.banding.buka < 0 || t.banding.buka > 5 || !Number.isInteger(t.banding.buka)) ok = false;
    const pb = B.penentu(B.pasangAktif(t));
    if (t.banding.buka > (pb === 5 ? 5 : pb + 1)) ok = false;
    const g = B.garisAktif(t);
    if (t.garis.letak.length !== g.angka.length || t.garis.letak.some((v) => v !== null && (v < 0 || v >= B.RUAS))) ok = false;
    if (t.garis.pilih !== null && (t.garis.pilih < 0 || t.garis.pilih >= g.angka.length)) ok = false;
    const u = B.urutAktif(t);
    if (new Set(t.urut.susun).size !== t.urut.susun.length || t.urut.susun.some((j) => j < 0 || j >= u.angka.length)) ok = false;
    for (const id of t.pernah) if (!/^(banding:(78897-87897|56560-57000|45230-46001|56475-43217|13234-13234)|dari-satuan|garis:(sekitar40|dakon)|urut:(dakon|empat|tengah))$/.test(id)) ok = false;
    if (t.pesan) pesanSemua.add(t.pesan);
    for (const id of t.pernah) riwayatSemua.add(id);
    s = t;
  }
  cek(ok, "fuzz 20.000 aksi Lab Banding: batas terjaga, riwayat tidak dicabut");
  cek(pesanSemua.size > 15 && [...pesanSemua].every(tanpaAngka), `fuzz Lab Banding: semua ${pesanSemua.size} pesan dieja menjadi kata`);
  cek(riwayatSemua.size > 5, `fuzz Lab Banding: riwayat terkumpul (${[...riwayatSemua].join(" ")})`);
  globalThis.__pesanB = [...pesanSemua];
}

/* ------------------------------ Mesin B ------------------------------ */
{
  const dariBuku = [...D.ANGKA_BUKU.dakon, ...D.RONDE_URUT_CB.flatMap((r) => r.angka), ...D.RONDE_BANDING_CB.flat().flatMap((r) => [r.a, r.b])];
  for (const [i, k] of MS.KASUS_BANDING.entries()) {
    const c = MS.MESIN_BANDING.kasus[i];
    const [sej, pen, tan, uru] = c.langkah;
    const [a, b] = k.angka;
    const kunciSej = `${lima5(a)[0]} dan ${lima5(b)[0]}`;
    cek(sej.benar === kunciSej && sej.opsi.filter((o) => o === kunciSej).length === 1, `Mesin B ${a}: digit puluh ribuan (mandiri)`);
    const p = penentuMandiri(a, b);
    cek(pen.benar === NAMA5[p] && pen.opsi.filter((o) => o === NAMA5[p]).length === 1, `Mesin B ${a}: penentu ${NAMA5[p]}`);
    const kal = `${D.lambang(a)} ${tandaMandiri(a, b)} ${D.lambang(b)}`;
    cek(tan.benar === kal && tan.opsi.filter((o) => o === kal).length === 1, `Mesin B ${a}: ${kal}`);
    const benarU = urutMandiri(k.angka, k.arah).map(D.lambang).join(", ");
    cek(uru.benar === benarU && uru.opsi.filter((o) => o === benarU).length === 1, `Mesin B ${a}: urut ${k.arah} ${benarU}`);
    cek(uru.opsi.every((o) => o.split(", ").sort().join() === benarU.split(", ").sort().join()), `Mesin B ${a}: pengecoh urut memakai tiga bilangan yang sama`);
    cek(k.angka.every((n) => dariBuku.includes(n) || naskahK5.includes(D.lambang(n))), `Mesin B ${a}: bilangan dari buku atau naskah`);
  }
}

/* ------------------------------ Skenario B ------------------------------ */
{
  const S = SK.SKENARIO_K5B1B;
  cek(S.adegan.length >= 5 && S.adegan.length <= 8 && S.adegan[0].jenis === "narasi" && S.adegan[S.adegan.length - 1].jenis === "akhir", `${S.id}: 5 sampai 8 adegan, buka dan tutup`);
  cek(new Set(S.adegan.map((x) => x.jenis)).size >= 4, `${S.id}: paling sedikit empat jenis adegan`);
  cek(S.adegan.every((x) => tanpaAngka(x.cerita)), `${S.id}: cerita dapat dieja`);
  sama(S.id.replace(/-k5b1$/, ""), K5.ID_SKENARIO_K5B1.B, "id skenario B sesuai id misi");
  const ad = (id) => S.adegan.find((x) => x.id === id);
  const kal = ad("banding").opsi.find((o) => o.benar).teks.match(/^([\d.]+) ([<>=]) ([\d.]+)$/);
  const na = Number(kal[1].replace(".", ""));
  const nb = Number(kal[3].replace(".", ""));
  cek(kal[2] === tandaMandiri(na, nb) && ad("banding").cerita.includes(kal[1]) && ad("banding").cerita.includes(kal[3]), "B: kalimat banding benar (mandiri)");
  cek(ad("banding").opsi.filter((o) => !o.benar).every((o) => o.teks.split(" ")[1] !== tandaMandiri(na, nb)), "B: pengecoh tanda salah");
  cek(ad("periksa").jumlah === penentuMandiri(56560, 57000) + 1 && ad("periksa").cerita.includes("56.560 dan 57.000"), "B: tempat yang diperiksa sampai penentu (mandiri)");
  cek(penentuMandiri(75360, 65750) === 0 && ad("penentu").target === Number(lima5(75360)[0]) && ad("penentu").target <= ad("penentu").maks, "B: digit penentu 75.360 (mandiri)");
  const soal = ad("baca").soal;
  const dakon = [...D.ANGKA_BUKU.dakon];
  cek(soal[0].jawaban === D.lambang(urutMandiri(dakon, "turun")[0]), "B: skor terbesar dari buku (mandiri)");
  cek(soal[1].jawaban === tandaMandiri(45230, 46001) && soal[1].teks.startsWith("45.230 … 46.001"), "B: tanda 45.230 dan 46.001 (mandiri)");
  cek(soal[2].jawaban === (tandaMandiri(43217, 50000) === "<" ? "kiri" : "kanan"), "B: 43.217 di kiri acuan 50.000 (mandiri)");
  cek(soal[3].jawaban === D.lambang(urutMandiri([85350, 85550, 85450], "naik")[1]), "B: bilangan tengah (mandiri)");
  for (const q of soal) cek(q.opsi.filter((o) => o === q.jawaban).length === 1, `B: satu kunci (${q.teks})`);
  const urut = ad("urut");
  const naikDakon = urutMandiri(dakon, "naik").map(D.lambang).join(", ");
  cek(urut.opsi.find((o) => o.benar).teks === naikDakon && urut.opsi.filter((o) => !o.benar).every((o) => o.teks !== naikDakon), "B: urut naik skor dakon (mandiri), pengecoh salah");
  cek(dakon.every((n) => S.adegan[0].cerita.includes(D.lambang(n))), "B: skor dakon di cerita sesuai buku");
  const posisi = S.adegan.filter((x) => x.jenis === "pilih").map((x) => x.opsi.findIndex((o) => o.benar));
  cek(new Set(posisi).size === posisi.length, `B: letak jawaban pilih bervariasi (${posisi.join("")})`);
}

/* ------------------------------ Misi B lewat aksi lab ------------------------------ */
{
  const capai = (aksi) => M0.misiBaru(K5.MISI_B, B.keadaanBandingK5B1B(jalan(B.awalBandingK5B1B(), LB, aksi)), new Set());
  cek(capai(aksiBanding(0)).join() === "b-tempat", "B: pasangan pertama memenuhi");
  cek(capai(aksiBanding(1)).join() === "b-ribuan" && penentuMandiri(56560, 57000) === 1, "B: pasangan kedua (penentu ribuan) memenuhi");
  cek(capai(aksiBanding(2)).length === 0 && capai(aksiBanding(3)).length === 0, "B: pasangan lain bukan misi wajib");
  cek(capai([...aksiBanding(0).slice(0, -1), { t: "B_TANDA", tanda: ">" }]).length === 0, "B: tanda salah tidak memenuhi");
  cek(capai([{ t: "B_DATA", i: 0 }, { t: "B_TANDA", tanda: "<" }]).length === 0, "B: tanda tanpa memeriksa kolom tidak memenuhi");
  cek(capai([{ t: "B_DATA", i: 1 }, { t: "B_KOLOM", k: 4 }]).join() === "b-satuan", "B: tantangan satuan lebih dulu");
  cek(capai(aksiBanding(4)).join() === "b-sama", "B: tantangan bilangan kembar");
  cek(capai(aksiGaris(0)).join() === "b-garis", "B: garis sekitar 40.000 memenuhi");
  cek(capai(aksiGaris(1)).length === 0, "B: garis dakon bukan misi garis");
  cek(capai(aksiGaris(0, (r, j) => (j === 1 ? r - 1 : r))).length === 0, "B: 40.200 di kiri acuan tidak memenuhi");
  cek(capai(aksiUrut(0)).join() === "b-dakon", "B: urut dakon naik memenuhi");
  cek(capai(aksiUrut(0, urutMandiri(D.ANGKA_BUKU.dakon, "turun"))).length === 0, "B: dakon turun tidak memenuhi");
  cek(capai(aksiUrut(1)).join() === "b-turun", "B: empat bilangan turun memenuhi");
  cek(capai(aksiUrut(1, urutMandiri(B.DATA_URUT[1].angka, "naik"))).length === 0, "B: empat bilangan naik tidak memenuhi");
  cek(capai(aksiUrut(2)).join() === "b-tengah", "B: tantangan bilangan tengah");
  cek(M0.misiBaru(K5.MISI_B, A.keadaanTempatK5B1A(jalan(x0, L, aksiTulis(14500))), new Set()).length === 0 && M0.misiBaru(K5.MISI_A, B.keadaanBandingK5B1B(jalan(y0, LB, aksiBanding(0))), new Set()).length === 0, "riwayat lab A dan B tidak saling memenuhi");
}

/* ------------------------------ Konsep C dan D tidak bocor ke Sub-Bab B ------------------------------ */
{
  const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas5-bab1-ringkas.json", import.meta.url), "utf8"));
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
  // Sub-Bab B tidak memakai konsep C (uraian, komposisi, menukar) dan D (operasi hitung, perkiraan, menyimpan, meminjam).
  // "kurang dari" dan "lebih dari" adalah bacaan tanda banding, bukan operasi.
  const BOCOR_B = /\b(uraian|diuraikan|bentuk panjang|komposisi|dekomposisi|tukar|ditukar|menukar|jumlah\w*|penjumlahan|ditambah|selisih|pengurangan|dikurangi|perkalian|kali|dikali|pembagian|dibagi|perkiraan|dibulatkan|pembulatan|menyimpan|meminjam|bersusun|operasi)\b/i;
  const LAMBANG_B = /[+−×÷≈]/;
  const catatB = (teks, apa, lambang = true) => {
    for (const [p, nama] of lambang ? [[BOCOR_B, "konsep sub-bab berikutnya"], [LAMBANG_B, "lambang operasi"]] : [[BOCOR_B, "konsep sub-bab berikutnya"]]) {
      const m = p.exec(teks);
      cek(!m, `B: ${apa} bebas ${nama} (${m ? m[0] : ""} di "${String(teks).slice(Math.max(0, (m?.index ?? 0) - 30), (m?.index ?? 0) + 40)}")`);
    }
  };
  for (const t of [TK.MISI_K5B1.B, TK.NAMA_SIM_K5B1.B, ...K5.MISI_B.map((m) => m.teks)]) catatB(t, "teks misi");
  catatB(teksDari(MS.MESIN_BANDING), "mesin");
  catatB(teksDari(SK.SKENARIO_K5B1B), "skenario");
  catatB(teksDari(ringkas.subBab.B), "peta dan infografis ringkas");
  catatB(tanpaKomentar(baca("SimulasiLabBandingK5B1", "tsx")), "komponen lab (tanpa komentar)", false);
  catatB(tanpaKomentar(baca("model-banding-k5b1", "tsx")), "model gambar (tanpa komentar)", false);
  catatB(tanpaKomentar(baca("lab-banding-k5b1b", "ts")), "logika lab (tanpa komentar)", false);
  catatB(tanpaKomentar(baca("SimulasiK5Bab1", "tsx")), "pembungkus (tanpa komentar)", false);
  for (const p of globalThis.__pesanB) catatB(p, "pesan lab dari fuzz");
  const ucapan = [];
  for (let i = 0; i < B.DATA_BANDING.length; i += 1) {
    const xb = LB(y0, { t: "B_DATA", i });
    ucapan.push(B.ucapBandingK5B1B(xb), B.ucapBandingK5B1B(jalan(y0, LB, aksiBanding(i))));
  }
  for (let i = 0; i < B.DATA_GARIS.length; i += 1) ucapan.push(B.ucapGarisK5B1B(LB(y0, { t: "G_DATA", i })), B.ucapGarisK5B1B(jalan(y0, LB, aksiGaris(i).slice(0, -1))));
  for (let i = 0; i < B.DATA_URUT.length; i += 1) ucapan.push(B.ucapUrutK5B1B(LB(y0, { t: "U_DATA", i })), B.ucapUrutK5B1B(jalan(y0, LB, aksiUrut(i))));
  cek(ucapan.length > 15 && ucapan.every(tanpaAngka), `B: semua ${ucapan.length} ucapan lab dieja menjadi kata`);
  for (const u of ucapan) catatB(u, "ucapan lab");
  for (const f of ["SimulasiLabBandingK5B1", "model-banding-k5b1"]) {
    const s = baca(f, "tsx");
    cek(!/correct_index|explanation/.test(s) && !/fetch\(|XMLHttpRequest|api\/|openai|anthropic|gemini/i.test(s), `${f}: tanpa kunci, jaringan, atau model bahasa`);
  }
  {
    const s = baca("lab-banding-k5b1b", "ts");
    cek(!/fetch\(|XMLHttpRequest|from "react"|correct_index|explanation/i.test(s) && (s.match(/^import .+$/gm) ?? []).every((l) => l.startsWith("import type")), "lab-banding-k5b1b: murni, hanya impor tipe");
    const k = baca("SimulasiLabBandingK5B1", "tsx");
    cek(/useEffect\(\(\) => \{\s*onKeadaan\?\.\(keadaan\w+\(x\)\);\s*\}, \[onKeadaan, x\]\);/.test(k), "lab B: lapor keadaan lewat useEffect");
    cek(/setLihat\(v\);\s*kirim\(\{ t: "PESAN_KOSONG" \}\);/.test(k), "lab B: ganti tampilan mengosongkan pesan");
    const catatan = [...k.matchAll(/^\s*"([^"]+)",$/gm)].map((m) => m[1]);
    cek(catatan.length >= 4 && catatan.every(tanpaAngka), "lab B: Coba ini dapat dieja");
  }
}

/* ------------------------------ Konsep tidak bocor antar sub-bab ------------------------------ */
{
  const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas5-bab1-ringkas.json", import.meta.url), "utf8"));
  const baca = (nama, ekstensi) => readFileSync(new URL(`../src/components/modul/${nama}.${ekstensi}`, import.meta.url), "utf8");
  const tanpaKomentar = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
  /** Semua nilai teks dalam objek (tanpa nama kunci). */
  const teksDari = (o) => {
    const hasil = [];
    JSON.stringify(o, (k, v) => {
      if (typeof v === "string") hasil.push(v);
      return v;
    });
    return hasil.join(" | ");
  };
  // Sub-Bab A tidak memakai konsep B (membandingkan, mengurutkan, acuan), C (uraian, komposisi, menukar), dan
  // D (operasi hitung, perkiraan, menyimpan, meminjam).
  const BOCOR_A = /\b(membandingkan|bandingkan|dibandingkan|lebih besar|lebih kecil|terbesar|terkecil|urut\w*|mengurutkan|acuan|garis bilangan|uraian|diuraikan|bentuk panjang|komposisi|dekomposisi|tukar|ditukar|menukar|jumlah\w*|penjumlahan|ditambah|selisih|pengurangan|dikurangi|perkalian|kali|dikali|pembagian|dibagi|perkiraan|dibulatkan|pembulatan|menyimpan|meminjam|bersusun|operasi)\b/i;
  const LAMBANG_A = /[<>+−×÷≈]/;
  const catat = (teks, apa, lambang = true) => {
    const pola = lambang ? [[BOCOR_A, "konsep sub-bab berikutnya"], [LAMBANG_A, "lambang banding atau operasi"]] : [[BOCOR_A, "konsep sub-bab berikutnya"]];
    for (const [p, nama] of pola) {
      const m = p.exec(teks);
      cek(!m, `A: ${apa} bebas ${nama} (${m ? m[0] : ""} di "${String(teks).slice(Math.max(0, (m?.index ?? 0) - 30), (m?.index ?? 0) + 40)}")`);
    }
  };
  for (const t of [TK.MISI_K5B1.A, TK.NAMA_SIM_K5B1.A, ...K5.MISI_A.map((m) => m.teks)]) catat(t, "teks misi");
  catat(teksDari(MS.MESIN_TEMPAT), "mesin");
  catat(teksDari(SK.SKENARIO_K5B1A), "skenario");
  catat(teksDari(ringkas.subBab.A), "peta dan infografis ringkas");
  catat(tanpaKomentar(baca("SimulasiLabTempatK5B1", "tsx")), "komponen lab (tanpa komentar)", false);
  catat(tanpaKomentar(baca("model-tempat-k5b1", "tsx")), "model gambar (tanpa komentar)", false);
  catat(tanpaKomentar(baca("lab-tempat-k5b1a", "ts")), "logika lab (tanpa komentar)", false);
  // Pembungkus bersama memuat semua sub-bab, jadi yang diperiksa hanya bagian A-nya (Coba ini mesin A).
  catat(/\n  A: \[(.*)\],\n  B: \[/.exec(baca("SimulasiK5Bab1", "tsx"))[1], "Coba ini mesin A");
  for (const p of globalThis.__pesanA) catat(p, "pesan lab dari fuzz");
  for (const u of [A.ucapTulisK5B1A(x0), A.ucapBacaK5B1A(x0), A.ucapNilaiK5B1A(x0)]) catat(u, "ucapan lab");

  // Kunci tidak bocor ke klien.
  for (const f of ["SimulasiLabTempatK5B1", "SimulasiK5Bab1", "model-tempat-k5b1"]) {
    const s = baca(f, "tsx");
    cek(!/correct_index|explanation/.test(s), `${f}: tidak memuat correct_index atau explanation`);
    cek(!/fetch\(|XMLHttpRequest|api\/|openai|anthropic|gemini/i.test(s), `${f}: tanpa jaringan atau model bahasa`);
  }
  for (const f of ["lab-tempat-k5b1a", "mesin-data-k5b1", "skenario-k5b1", "misi-k5bab1", "misi-teks-k5b1", "eja-k5b1"]) {
    const s = baca(f, "ts");
    cek(!/fetch\(|XMLHttpRequest|from "react"|openai|anthropic|gemini|correct_index|explanation/i.test(s), `${f}: murni`);
    const impor = s.match(/^import .+$/gm) ?? [];
    cek(impor.every((l) => l.startsWith("import type")), `${f}: hanya mengimpor tipe`);
  }
  {
    const s = baca("SimulasiLabTempatK5B1", "tsx");
    cek(/useEffect\(\(\) => \{\s*onKeadaan\?\.\(keadaan\w+\(x\)\);\s*\}, \[onKeadaan, x\]\);/.test(s), "lab: lapor keadaan lewat useEffect");
    cek(/setLihat\(v\);\s*kirim\(\{ t: "PESAN_KOSONG" \}\);/.test(s), "lab: ganti tampilan mengosongkan pesan");
    const catatan = [...s.matchAll(/^\s*"([^"]+)",$/gm)].map((m) => m[1]);
    cek(catatan.length >= 4 && catatan.every(tanpaAngka), "lab: Coba ini dapat dieja");
  }
  const pembungkus = baca("SimulasiK5Bab1", "tsx");
  cek(/eja=\{ejaK5B1\}/.test(pembungkus), "pembungkus: mesin dieja ejaK5B1 (bilangan sampai 100.000)");
  const mesinUmum = baca("SimulasiMesinBertahapK3", "tsx");
  cek(/eja = ejaK3,/.test(mesinUmum) && /speakGuru\(eja\(suara\)\)/.test(mesinUmum) && !/ejaK3\(suara\)/.test(mesinUmum), "mesin umum: pengeja bisa diganti, bawaan ejaK3");
  const coba = [...pembungkus.matchAll(/"([^"]*\?)"/g)].map((m) => m[1]);
  cek(coba.length >= 3 && coba.every(tanpaAngka), "Coba ini mesin dapat dieja");
  // Semua ucapan lab dieja menjadi kata.
  const ucapan = [];
  for (let i = 0; i < A.DATA_TULIS.length; i += 1) {
    const xt = L(x0, { t: "T_DATA", i });
    ucapan.push(A.ucapTulisK5B1A(xt), A.ucapTulisK5B1A(jalan(xt, L, aksiTulis(A.DATA_TULIS[i].n))));
  }
  for (let i = 0; i < A.DATA_BACA.length; i += 1) ucapan.push(A.ucapBacaK5B1A(L(x0, { t: "B_DATA", i })));
  for (let i = 0; i < A.DATA_NILAI.length; i += 1) {
    const xn = L(x0, { t: "N_DATA", i });
    ucapan.push(A.ucapNilaiK5B1A(xn));
    for (let j = 0; j < A.digitTulis(A.DATA_NILAI[i].n).length; j += 1) ucapan.push(A.ucapNilaiK5B1A(L(xn, { t: "N_DIGIT", j })));
  }
  cek(ucapan.length > 15 && ucapan.every(tanpaAngka), `semua ${ucapan.length} ucapan lab dieja menjadi kata`);
  for (const u of ucapan) catat(u, "ucapan lab");
}

/* ------------------------------ Data ringkas ------------------------------ */
{
  const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas5-bab1-ringkas.json", import.meta.url), "utf8"));
  cek(ringkas.chapter_id === "mtk-5-bab1" && ringkas.phase_code === "FASE_C" && ringkas.grade === 5, "ringkas: id bab, fase, kelas");
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
  // Angka di ringkas A dihitung ulang mandiri.
  const A0 = ringkas.subBab.A;
  const tabel = A0.infografis.panel[0].butir.find((b) => b.id === "tabel").visual.baris;
  cek(tabel.every(([nama, v]) => Number("1" + "0".repeat(NAMA_DARI_KANAN.indexOf(nama))) === v), "ringkas A: nilai satu di tiap tempat (dihitung)");
  for (const sisi of A0.infografis.panel[1].sisi) {
    const [bil, nilai] = sisi.visual.isi.split(" → ").map((t) => Number(t.replace(".", "")));
    const tujuh = digitMandiri(bil).filter((m) => m.d === 7);
    cek(tujuh.length === 1 && tujuh[0].nilai === nilai && tujuh[0].tempat === sisi.id, `ringkas A: digit tujuh pada ${bil} di ${sisi.id} bernilai ${nilai} (dihitung)`);
    cek([D.ANGKA_BUKU.tujuh, ...D.ANGKA_BUKU.hubung].includes(bil), `ringkas A: ${bil} dari data buku`);
  }
  const periode = A0.infografis.panel[2].butir;
  cek(periode.find((b) => b.id === "periode").visual.isi === `${Math.floor(D.ANGKA_BUKU.penduduk / 1000)} | ${D.ANGKA_BUKU.penduduk % 1000}`, "ringkas A: kelompok tiga digit penduduk (dihitung)");
  cek(periode.find((b) => b.id === "nol").suara.startsWith(`${D.kata(20040).replace(/^d/, "D")}.`), "ringkas A: bacaan 20.040 sesuai kata");
  cek(A0.peta.kartu.find((k) => k.id === "a-tujuh-ribu").teks === `7 di ribuan bernilai ${D.lambang(digitMandiri(87986)[1].nilai)}`, "ringkas A: 7 di ribuan (dihitung)");
  // Angka di ringkas B dihitung ulang mandiri.
  const B0 = ringkas.subBab.B;
  const kiri = B0.infografis.panel[0].butir;
  cek(kiri.find((b) => b.id === "penentu").visual.isi === `45.230 ${tandaMandiri(45230, 46001)} 46.001` && penentuMandiri(45230, 46001) === 1 && kiri.find((b) => b.id === "sama").visual.isi === `${lima5(45230)[0]} dan ${lima5(46001)[0]}`, "ringkas B: 45.230 dan 46.001 (mandiri)");
  const turun = urutMandiri(D.ANGKA_BUKU.dakon, "turun");
  sama(B0.infografis.panel[2].butir.find((b) => b.id === "dakon").visual.baris.map((r) => r[1]), turun, "ringkas B: tabel skor dakon urut turun (mandiri)");
  sama(B0.infografis.panel[1].sisi.map((x) => x.visual.isi), [`${D.lambang(turun[3])} → ${D.lambang(turun[0])}`, `${D.lambang(turun[0])} → ${D.lambang(turun[3])}`], "ringkas B: naik dan turun dakon");
  cek(B0.infografis.panel[2].butir.find((b) => b.id === "acuan").visual.isi === urutMandiri([38500, 40200, 39999], "naik").map(D.lambang).join(" < "), "ringkas B: urutan sekitar acuan (mandiri)");
  cek(B0.peta.kartu.find((k) => k.id === "b-kurang-dari").teks === `45.230 ${tandaMandiri(45230, 46001)} 46.001` && B0.peta.kartu.find((k) => k.id === "b-sama-dengan").teks === `13.234 ${tandaMandiri(13234, 13234)} 13.234`, "ringkas B: kartu tanda (mandiri)");
  sama(Object.keys(ringkas.subBab), ["A", "B"], "ringkas: gelombang ini sub-bab A dan B");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
