// Uji Simulasi Kelas 5 Bab 4 (Keliling Bangun Datar): Lab Jalur (Sub-Bab A), mesin, skenario, misi, gerbang,
// data ringkas, pengeja, dan konsep sub-bab berikutnya tidak bocor ke Sub-Bab A.
// Jalankan: node --no-warnings scripts/uji-lab-k5b4.mjs
import { readFileSync } from "node:fs";
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K5 from "../src/components/modul/misi-k5bab4.ts";
import * as TK from "../src/components/modul/misi-teks-k5b4.ts";
import * as A from "../src/components/modul/lab-jalur-k5b4a.ts";
import * as MS from "../src/components/modul/mesin-data-k5b4.ts";
import * as SK from "../src/components/modul/skenario-k5b4.ts";
import * as ME from "../src/components/modul/mesin-bertahap-k3b1.ts";
import * as EJ from "../src/components/modul/eja-k5b4.ts";
import * as EJ1 from "../src/components/modul/eja-k5b1.ts";
import * as D from "../src/components/modul/data-k5b4.ts";

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
const tanpaAngka = (t) => !/\d/.test(EJ.ejaK5B4(t));
const L = A.langkahJalurK5B4A;
const x0 = A.awalJalurK5B4A();

/* ------------------------------ Hitungan MANDIRI (cara berbeda) ------------------------------ */
// Kode menjumlah panjang sisi dan mengalikan panjang dengan lebar. Di sini keliling dihitung dengan menelusuri titik demi
// titik pada kisi (jalan kaki), atau dengan menghitung sisi petak yang hanya dimiliki satu petak (tepi tanah), dan isi
// dengan menghitung petak satu per satu.
const jalanMandiri = (sisi) => {
  let x = 0;
  let y = 0;
  let jarak = 0;
  const arah = [[1, 0], [0, 1], [-1, 0], [0, -1]];
  sisi.forEach((s, k) => {
    for (let u = 0; u < s; u += 1) {
      x += arah[k % 4][0];
      y += arah[k % 4][1];
      jarak += 1;
    }
  });
  return { jarak, kembali: x === 0 && y === 0 };
};
const tepiMandiri = (w, h) => {
  const hitung = new Map();
  for (let j = 0; j < h; j += 1) {
    for (let i = 0; i < w; i += 1) {
      for (const e of [`H${i},${j}`, `H${i},${j + 1}`, `V${i},${j}`, `V${i + 1},${j}`]) hitung.set(e, (hitung.get(e) ?? 0) + 1);
    }
  }
  let n = 0;
  for (const v of hitung.values()) if (v === 1) n += 1;
  return n;
};
const petakMandiri = (w, h) => {
  let n = 0;
  for (let j = 0; j < h; j += 1) for (let i = 0; i < w; i += 1) n += 1;
  return n;
};
const sisiTanah = (t) => [t.w, t.h, t.w, t.h];

/* ------------------------------ Pengeja ------------------------------ */
{
  sama(EJ.ejaK5B4("16 cm"), "enam belas sentimeter", "eja sentimeter");
  sama(EJ.ejaK5B4("20 m"), "dua puluh meter", "eja meter");
  sama(EJ.ejaK5B4("3 dm"), "tiga desimeter", "eja desimeter");
  sama(EJ.ejaK5B4("4 + 4 + 4 + 4 = 16 cm"), "empat ditambah empat ditambah empat ditambah empat sama dengan enam belas sentimeter", "eja penjumlahan sisi");
  sama(EJ.ejaK5B4("2 × (5 + 3) = 16"), "dua dikali kurung buka lima ditambah tiga kurung tutup sama dengan enam belas", "eja kurung");
  sama(EJ.ejaK5B4("titik ke-7 dari awal"), "titik ke-tujuh dari awal", "eja ke-");
  sama(EJ.ejaK5B4("isi 15 petak …"), "isi lima belas petak titik-titik", "eja petak dan titik-titik");
  sama(EJ.ejaK5B4("6, 4, 6, 4 m"), "enam, empat, enam, empat meter", "eja daftar sisi");
  sama(EJ.ejaK5B4("sisi 3 cm dan 4 cm"), "sisi tiga sentimeter dan empat sentimeter", "eja dua satuan");
  let samaKata = true;
  for (let n = 0; n <= 1200; n += 1) if (EJ.kataK5B4(n) !== EJ1.kataK5B1(n)) samaKata = false;
  cek(samaKata && EJ.kataK5B4(999999) === EJ1.kataK5B1(999999), "kata bilangan sama dengan kataK5B1 (0 sampai 1200 dan 999.999)");
  let semuaKata = true;
  for (let n = 0; n <= 200; n += 1) if (/\d/.test(EJ.ejaK5B4(`${n} cm dan ${n} m`)) || EJ.ejaK5B4(`${n} cm`) !== `${EJ1.kataK5B1(n)} sentimeter`) semuaKata = false;
  cek(semuaKata, "semua bilangan 0 sampai 200 dengan satuan dieja menjadi kata");
}

/* ------------------------------ Data sama dengan buku ------------------------------ */
{
  const naskah = readFileSync(new URL("../src/components/modul/naskah-k5b4.ts", import.meta.url), "utf8");
  const hitungBuku = D.RONDE_HITUNG_CA.flat();
  cek(D.ANGKA_BUKU.persegi4 === 16 && hitungBuku.some((r) => r.sisi.join() === "4,4,4,4" && r.hasil === 16), "Jalan: persegi sisi 4 sama dengan 16 dari data buku");
  cek(D.ANGKA_BUKU.pp53 === 16 && hitungBuku.some((r) => r.sisi.join() === "5,3,5,3" && r.hasil === 16), "Jalan: persegi panjang 5 dan 3 sama dengan 16 dari data buku");
  cek(hitungBuku.some((r) => r.sisi.join() === "6,4,6,4" && r.hasil === 20), "Jalan: persegi panjang 6 dan 4 sama dengan 20 dari data buku");
  for (const d of A.DATA_JALAN) {
    const r = hitungBuku.find((v) => v.sisi.join() === d.sisi.join());
    cek(!!r && r.hasil === jalanMandiri(d.sisi).jarak, `Jalan ${d.nama}: hasil data buku sama dengan penelusuran kisi`);
  }
  cek(naskah.includes("Baluwarti") && naskah.includes("pagar") && naskah.includes("bingkai"), "naskah memuat Baluwarti, pagar, dan bingkai");
  cek(D.RONDE_ARTI_CA.flat().some((r) => /pagar|bingkai/.test(r.jawab)) && D.RONDE_PASANG_CA.flat().some((r) => r.kiri === "pagar rumah"), "data buku memuat pagar dan bingkai");
}

/* ------------------------------ Lab A: Jalur ------------------------------ */
{
  cek(x0.pernah.length === 0 && x0.pesan === "" && x0.jalan.langkah === 0 && !x0.jalan.selesai && x0.pagar.ruas.every((v) => v === 0) && !x0.banding.perluOk && !x0.banding.jalurOk && !x0.banding.isiOk, "awal: kosong, belum ada riwayat");
  cek(A.DATA_JALAN.length === 3 && A.DATA_PAGAR.length === 3 && A.DATA_BANDING.length === 3, "tiga bangun di tiap tampilan");

  // Jalan: tiap bangun.
  for (const [i, b] of A.DATA_JALAN.entries()) {
    const nama = b.nama;
    const m = jalanMandiri(b.sisi);
    cek(m.kembali && m.jarak === A.jumlahSisi(b.sisi) && b.sisi.length === 4, `Jalan ${nama}: penelusuran kisi kembali ke awal, jarak ${m.jarak}`);
    const xj = L(x0, { t: "J_DATA", i });
    // Melompat ditolak.
    for (let k = 1; k < 4; k += 1) {
      const s = L(xj, { t: "J_SISI", k });
      cek(s.jalan.langkah === 0 && s.pernah.length === 0 && /Jangan melompat/.test(s.pesan) && !s.pesan.startsWith("✅"), `Jalan ${nama}: sisi ke-${k + 1} sebelum yang pertama ditolak`);
    }
    // Kembali sebelum semua sisi ditolak.
    cek(/Mulai dari/.test(L(xj, { t: "J_KEMBALI" }).pesan) && !L(xj, { t: "J_KEMBALI" }).jalan.selesai, `Jalan ${nama}: kembali sebelum mulai ditolak`);
    let s = xj;
    for (let k = 0; k < 4; k += 1) {
      const sebelum = s;
      s = L(s, { t: "J_SISI", k });
      const jarak = jalanMandiri(b.sisi.slice(0, k + 1)).jarak;
      cek(s.jalan.langkah === k + 1 && s.pesan.startsWith("✅") && s.pesan.includes(`sepanjang ${b.sisi[k]} cm`) && s.pesan.includes(`${jarak} cm`), `Jalan ${nama}: sisi ke-${k + 1} diterima, jalur ${jarak}`);
      cek(s.pernah.length === 0, `Jalan ${nama}: belum tercatat sebelum kembali (sisi ke-${k + 1})`);
      // Mengulang sisi sebelumnya ditolak.
      cek(L(s, { t: "J_SISI", k }).jalan.langkah === k + 1 && /sudah dilewati/.test(L(s, { t: "J_SISI", k }).pesan), `Jalan ${nama}: mengulang sisi ke-${k + 1} ditolak`);
      // Melompat setelah sebagian.
      if (k + 2 < 4) cek(L(s, { t: "J_SISI", k: k + 2 }).jalan.langkah === k + 1 && /Jangan melompat/.test(L(s, { t: "J_SISI", k: k + 2 }).pesan), `Jalan ${nama}: melompat setelah sisi ke-${k + 1} ditolak`);
      if (k < 3) {
        const k2 = L(s, { t: "J_KEMBALI" });
        cek(!k2.jalan.selesai && k2.pernah.length === 0 && /Belum kembali/.test(k2.pesan) && k2.pesan.includes(`${3 - k} sisi`), `Jalan ${nama}: berhenti setelah sisi ke-${k + 1} belum kembali`);
      }
      cek(sebelum !== s, `Jalan ${nama}: keadaan baru`);
    }
    cek(/Sekarang kembali ke sudut awal/.test(s.pesan), `Jalan ${nama}: setelah sisi terakhir diminta kembali`);
    const k = L(s, { t: "J_KEMBALI" });
    cek(k.jalan.selesai && k.pernah.includes(`jalan:${i}`) && k.pesan.startsWith("✅") && k.pesan.includes(`${b.sisi.join(" + ")} = ${m.jarak} cm`), `Jalan ${nama}: kembali tercatat, ${m.jarak} cm`);
    cek(/sudah kembali/.test(L(k, { t: "J_SISI", k: 0 }).pesan) && L(k, { t: "J_SISI", k: 0 }).pernah.length === 1, `Jalan ${nama}: setelah selesai sisi ditolak`);
    cek(L(k, { t: "J_DATA", i }).jalan.langkah === 0 && L(k, { t: "J_DATA", i }).pernah.includes(`jalan:${i}`), `Jalan ${nama}: mulai lagi mengosongkan langkah, riwayat tetap`);
    cek(L(xj, { t: "J_SISI", k: -1 }) === xj && L(xj, { t: "J_SISI", k: 4 }) === xj && L(xj, { t: "J_SISI", k: 1.5 }) === xj, `Jalan ${nama}: sisi di luar batas diabaikan`);
  }
  cek(L(x0, { t: "J_DATA", i: 3 }) === x0 && L(x0, { t: "J_DATA", i: -1 }) === x0, "Jalan: bangun di luar batas diabaikan");

  // Pagar: tiap tanah.
  const isiPagar = (i, nilai) => nilai.reduce((s, n, k) => jalan(s, L, Array.from({ length: n }, () => ({ t: "P_RUAS", k, d: 1 }))), L(x0, { t: "P_DATA", i }));
  for (const [i, t] of A.DATA_PAGAR.entries()) {
    const nama = `${t.w} dan ${t.h}`;
    const tepi = tepiMandiri(t.w, t.h);
    const petak = petakMandiri(t.w, t.h);
    cek(A.kelilingTanah(t) === tepi && A.jumlahSisi(sisiTanah(t)) === tepi && A.isiTanah(t) === petak && tepi !== petak, `Pagar ${nama}: keliling ${tepi} sama dengan hitungan sisi petak di tepi, isi ${petak} (berbeda)`);
    cek([0, 1, 2, 3].map((k) => A.panjangTepi(t, k)).join() === `${t.w},${t.h},${t.w},${t.h}`, `Pagar ${nama}: panjang tepi`);
    const xp = L(x0, { t: "P_DATA", i });
    cek(/Pasang dulu/.test(L(xp, { t: "P_PERIKSA" }).pesan) && L(xp, { t: "P_PERIKSA" }).pernah.length === 0, `Pagar ${nama}: periksa tanpa ruas diminta memasang`);
    const penuh = [0, 1, 2, 3].map((k) => A.panjangTepi(t, k));
    const lengkap = isiPagar(i, penuh);
    cek(A.totalRuas(lengkap) === tepi, `Pagar ${nama}: total ruas ${tepi}`);
    const ok = L(lengkap, { t: "P_PERIKSA" });
    cek(ok.pernah.includes(`pagar:${i}`) && ok.pesan.startsWith("✅") && ok.pesan.includes(`= ${tepi} ruas`) && ok.pesan.includes(`${petak} petak`) && ok.pesan.includes(sisiTanah(t).join(" + ")), `Pagar ${nama}: lengkap tercatat (${tepi} ruas, isi ${petak})`);
    for (let k = 0; k < 4; k += 1) {
      const kurang = penuh.map((v, j) => (j === k ? v - 1 : v));
      const s = L(isiPagar(i, kurang), { t: "P_PERIKSA" });
      cek(s.pernah.length === 0 && !s.pesan.startsWith("✅") && s.pesan.includes(`Tepi ${A.TEPI[k]} masih kurang: ${kurang[k]} dari ${penuh[k]} ruas`), `Pagar ${nama}: tepi ${A.TEPI[k]} kurang satu ditolak`);
      cek(L(lengkap, { t: "P_RUAS", k, d: 1 }).pagar.ruas[k] === penuh[k] && /hanya/.test(L(lengkap, { t: "P_RUAS", k, d: 1 }).pesan), `Pagar ${nama}: tepi ${A.TEPI[k]} tidak boleh lebih dari ${penuh[k]} ruas`);
      cek(L(xp, { t: "P_RUAS", k, d: -1 }) === xp, `Pagar ${nama}: ruas tidak bisa kurang dari nol (${A.TEPI[k]})`);
      const satu = L(xp, { t: "P_RUAS", k, d: 1 });
      cek(satu.pagar.ruas[k] === 1 && A.totalRuas(satu) === 1 && satu.pesan === "", `Pagar ${nama}: satu ruas di tepi ${A.TEPI[k]}`);
      cek(L(satu, { t: "P_RUAS", k, d: -1 }).pagar.ruas[k] === 0, `Pagar ${nama}: satu ruas dilepas lagi`);
    }
    // Hanya satu tepi penuh tidak cukup.
    cek(L(isiPagar(i, [penuh[0], 0, 0, 0]), { t: "P_PERIKSA" }).pernah.length === 0 && /Tepi kanan masih kurang/.test(L(isiPagar(i, [penuh[0], 0, 0, 0]), { t: "P_PERIKSA" }).pesan), `Pagar ${nama}: hanya tepi atas penuh belum cukup`);
    cek(L(lengkap, { t: "P_RUAS", k: 4, d: 1 }) === lengkap && L(lengkap, { t: "P_RUAS", k: 0, d: 2 }) === lengkap && L(lengkap, { t: "P_RUAS", k: -1, d: 1 }) === lengkap, `Pagar ${nama}: tepi atau arah di luar batas diabaikan`);
    cek(L(lengkap, { t: "P_DATA", i: (i + 1) % 3 }).pagar.ruas.every((v) => v === 0) && L(lengkap, { t: "P_DATA", i: (i + 1) % 3 }).pernah.length === 0, `Pagar ${nama}: ganti tanah mengosongkan ruas`);
  }
  cek(L(x0, { t: "P_DATA", i: 3 }) === x0, "Pagar: tanah di luar batas diabaikan");
  cek(A.DATA_PAGAR.every((t) => t.w + t.h >= 2 && A.kelilingTanah(t) <= 20), "Pagar: keliling paling banyak dua puluh ruas");

  // Banding: tiap bangun.
  const letakJalur = [];
  const letakIsi = [];
  for (const [i, t] of A.DATA_BANDING.entries()) {
    const nama = `${t.w} dan ${t.h}`;
    const tepi = tepiMandiri(t.w, t.h);
    const petak = petakMandiri(t.w, t.h);
    const oJ = A.opsiJalur(i);
    const oI = A.opsiIsi(i);
    cek(oJ.length === 3 && new Set(oJ).size === 3 && oJ.filter((v) => v === tepi).length === 1 && oJ.every((v) => Number.isInteger(v) && v > 0), `Banding ${nama}: tiga pilihan jalur unik, satu benar (${tepi})`);
    cek(oI.length === 3 && new Set(oI).size === 3 && oI.filter((v) => v === petak).length === 1 && oI.every((v) => Number.isInteger(v) && v > 0), `Banding ${nama}: tiga pilihan isi unik, satu benar (${petak})`);
    cek(oJ.includes(petak) && oI.includes(tepi) && tepi !== petak, `Banding ${nama}: pengecoh klasik, isi dan jalur saling tertukar`);
    cek(oJ.some((v) => v === t.w + t.h) || oJ.every((v) => v !== t.w + t.h), `Banding ${nama}: jumlah dua sisi hanya sebagai pengecoh`);
    letakJalur.push(oJ.indexOf(tepi));
    letakIsi.push(oI.indexOf(petak));
    const xb = L(x0, { t: "B_DATA", i });
    const kep = A.KEPERLUAN[i];
    const lain = kep.jawab === "jalur" ? "isi" : "jalur";
    const salahPerlu = L(xb, { t: "B_PERLU", jawab: lain });
    cek(!salahPerlu.banding.perluOk && salahPerlu.pernah.length === 0 && !salahPerlu.pesan.startsWith("✅") && salahPerlu.pesan.includes(kep.teks), `Banding ${nama}: keperluan ${lain} untuk ${kep.teks} ditolak`);
    const benarPerlu = L(xb, { t: "B_PERLU", jawab: kep.jawab });
    cek(benarPerlu.banding.perluOk && benarPerlu.pernah.includes(`perlu:${i}`) && benarPerlu.pesan.startsWith("✅") && benarPerlu.pesan.includes(kep.teks), `Banding ${nama}: keperluan ${kep.jawab} untuk ${kep.teks} diterima`);
    cek(L(xb, { t: "B_PERLU", jawab: "luas" }) === xb && L(xb, { t: "B_PERLU", jawab: "" }) === xb, `Banding ${nama}: keperluan tak dikenal diabaikan`);
    // Jalur.
    for (const v of oJ.filter((o) => o !== tepi)) {
      const s = L(xb, { t: "B_JALUR", nilai: v });
      cek(!s.banding.jalurOk && s.pernah.length === 0 && !s.pesan.startsWith("✅"), `Banding ${nama}: jalur ${v} ditolak`);
      cek(/\bisi\b/.test(s.pesan) === (v === petak) && /dua sisi/.test(s.pesan) === (v === t.w + t.h && v !== petak), `Banding ${nama}: jalur ${v} dijelaskan tepat`);
    }
    const sJ = L(xb, { t: "B_JALUR", nilai: tepi });
    cek(sJ.banding.jalurOk && sJ.pernah.includes(`jalur:${i}`) && sJ.pesan.startsWith("✅") && sJ.pesan.includes(`${sisiTanah(t).join(" + ")} = ${tepi} cm`), `Banding ${nama}: jalur ${tepi} tercatat`);
    // Isi.
    for (const v of oI.filter((o) => o !== petak)) {
      const s = L(xb, { t: "B_ISI", nilai: v });
      cek(!s.banding.isiOk && s.pernah.length === 0 && !s.pesan.startsWith("✅"), `Banding ${nama}: isi ${v} ditolak`);
      cek(/panjang jalur/.test(s.pesan) === (v === tepi), `Banding ${nama}: isi ${v} dijelaskan tepat`);
    }
    const sI = L(xb, { t: "B_ISI", nilai: petak });
    cek(sI.banding.isiOk && sI.pernah.includes(`isi:${i}`) && sI.pesan.startsWith("✅") && sI.pesan.includes(`${petak} petak`) && sI.pesan.includes(`${t.w} petak tiap baris, ada ${t.h} baris`), `Banding ${nama}: isi ${petak} tercatat`);
    cek(L(xb, { t: "B_JALUR", nilai: 999 }) === xb && L(xb, { t: "B_ISI", nilai: 999 }) === xb, `Banding ${nama}: nilai di luar pilihan diabaikan`);
    cek(!L(sI, { t: "B_DATA", i: (i + 1) % 3 }).banding.isiOk && L(sI, { t: "B_DATA", i: (i + 1) % 3 }).pernah.includes(`isi:${i}`), `Banding ${nama}: ganti bangun mengosongkan tanda, riwayat tetap`);
  }
  cek(new Set(letakJalur).size >= 2 && new Set(letakIsi).size >= 2, `Banding: letak jawaban benar bervariasi (${letakJalur.join("")} / ${letakIsi.join("")})`);
  cek(L(x0, { t: "B_DATA", i: 3 }) === x0 && L(x0, { t: "B_DATA", i: -1 }) === x0, "Banding: bangun di luar batas diabaikan");
  // Dua bangun dengan jalur sama dan isi beda.
  {
    const [a, b] = A.DATA_BANDING;
    cek(tepiMandiri(a.w, a.h) === tepiMandiri(b.w, b.h) && petakMandiri(a.w, a.h) !== petakMandiri(b.w, b.h), "Banding: bangun pertama dan kedua jalur sama, isi beda (dihitung)");
    const kedua = jalan(x0, L, [
      { t: "B_DATA", i: 0 }, { t: "B_JALUR", nilai: 16 }, { t: "B_ISI", nilai: 15 }, { t: "B_DATA", i: 1 }, { t: "B_JALUR", nilai: 16 },
    ]);
    cek(!/jalur tepi sama/.test(kedua.pesan), "Banding: kesimpulan jalur sama belum disebut sebelum keempatnya");
    const lengkap = L(kedua, { t: "B_ISI", nilai: 12 });
    cek(/Dua bangun berbeda bisa punya jalur tepi sama, yaitu 16 dan 16, tetapi isi berbeda, yaitu 15 dan 12/.test(lengkap.pesan), "Banding: kesimpulan jalur sama dan isi beda disebut setelah keempatnya");
  }

  // Fuzz.
  const acak = acakDari(41);
  let s = x0;
  let ok = true;
  const pesanSemua = new Set();
  const riwayatSemua = new Set();
  const ID = /^(jalan:[0-2]|pagar:[0-2]|perlu:[0-2]|jalur:[0-2]|isi:[0-2])$/;
  for (let i = 0; i < 20000; i += 1) {
    const p = acak(20);
    const tj = A.dataPagar(s);
    const tb = A.dataBanding(s);
    const kurangTepi = [0, 1, 2, 3].find((k) => s.pagar.ruas[k] < A.panjangTepi(tj, k)) ?? 0;
    const a =
      p === 0 ? { t: "J_DATA", i: acak(4) } :
      p <= 3 ? { t: "J_SISI", k: acak(5) - (acak(8) === 0 ? 1 : 0) } :
      p === 4 || p === 5 ? { t: "J_SISI", k: s.jalan.langkah } :
      p === 6 ? { t: "J_KEMBALI" } :
      p === 7 ? { t: "P_DATA", i: acak(4) } :
      p === 8 ? { t: "P_RUAS", k: acak(5), d: acak(3) - 1 } :
      p === 9 || p === 10 ? { t: "P_RUAS", k: kurangTepi, d: 1 } :
      p === 11 ? { t: "P_PERIKSA" } :
      p === 12 ? { t: "B_DATA", i: acak(4) } :
      p === 13 ? { t: "B_PERLU", jawab: ["jalur", "isi", "luas"][acak(3)] } :
      p === 14 ? { t: "B_PERLU", jawab: A.KEPERLUAN[s.banding.data].jawab } :
      p === 15 ? { t: "B_JALUR", nilai: acak(6) === 0 ? 99 : A.opsiJalur(s.banding.data)[acak(3)] } :
      p === 16 ? { t: "B_JALUR", nilai: A.kelilingTanah(tb) } :
      p === 17 ? { t: "B_ISI", nilai: acak(6) === 0 ? 99 : A.opsiIsi(s.banding.data)[acak(3)] } :
      p === 18 ? { t: "B_ISI", nilai: A.isiTanah(tb) } :
      acak(40) === 0 ? { t: "RESET" } : { t: "PESAN_KOSONG" };
    const t = L(s, a);
    if (a.t !== "RESET" && !s.pernah.every((v) => t.pernah.includes(v))) ok = false;
    if (!(t.jalan.data >= 0 && t.jalan.data < 3 && t.jalan.langkah >= 0 && t.jalan.langkah <= 4 && typeof t.jalan.selesai === "boolean")) ok = false;
    if (t.jalan.selesai && t.jalan.langkah !== 4) ok = false;
    if (!(t.pagar.data >= 0 && t.pagar.data < 3 && t.pagar.ruas.length === 4)) ok = false;
    const tp = A.dataPagar(t);
    for (let k = 0; k < 4; k += 1) if (!(t.pagar.ruas[k] >= 0 && t.pagar.ruas[k] <= A.panjangTepi(tp, k))) ok = false;
    if (!(t.banding.data >= 0 && t.banding.data < 3)) ok = false;
    for (const id of t.pernah) if (!ID.test(id)) ok = false;
    // Riwayat hanya bila sungguh tercapai.
    for (const id of t.pernah) {
      const [jenis, n] = id.split(":");
      const nn = Number(n);
      if (jenis === "pagar" && s.pernah.includes(id) === false && !(t.pagar.data === nn && A.totalRuas(t) === A.kelilingTanah(A.DATA_PAGAR[nn]))) ok = false;
      if (jenis === "jalan" && s.pernah.includes(id) === false && !(t.jalan.data === nn && t.jalan.selesai)) ok = false;
    }
    if (t.pesan) pesanSemua.add(t.pesan);
    for (const id of t.pernah) riwayatSemua.add(id);
    s = t;
  }
  cek(ok, "fuzz 20.000 aksi Lab Jalur: batas terjaga, riwayat tidak dicabut dan hanya bila tercapai");
  cek(pesanSemua.size > 40 && [...pesanSemua].every(tanpaAngka), `fuzz Lab Jalur: semua ${pesanSemua.size} pesan dieja menjadi kata`);
  cek(riwayatSemua.size >= 12, `fuzz Lab Jalur: riwayat terkumpul (${[...riwayatSemua].sort().join(" ")})`);
  globalThis.__pesanA = [...pesanSemua];
}

/* ------------------------------ Mesin ------------------------------ */
{
  for (const def of MS.SEMUA_MESIN_K5B4) {
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
    cek(x.selesai && def.selesaiId === K5.ID_MESIN_K5B4.A, `${def.id}: bisa diselesaikan, id selesai sesuai misi`);
  }
  // Kunci dan pengecoh dihitung ulang mandiri.
  for (const [i, k] of MS.KASUS_JALUR.entries()) {
    const c = MS.MESIN_JALUR.kasus[i];
    const [jalurL, arti, pagar, beda] = c.langkah;
    // Jalur: berjalan kaki di kisi.
    const m = jalanMandiri(k.sisi);
    cek(m.kembali && jalurL.benar === `${m.jarak} m` && jalurL.tanya.includes(k.sisi.join(", ")), `Mesin ${k.id}: jalur ${m.jarak} m (penelusuran kisi)`);
    const isiSisi = petakMandiri(k.sisi[0], k.sisi[1]);
    cek(jalurL.opsi.every((o) => o === jalurL.benar || o !== `${m.jarak} m`) && jalurL.opsi.includes(`${isiSisi} m`) === (isiSisi !== m.jarak), `Mesin ${k.id}: pengecoh jalur salah, isi petak ada`);
    cek(jalurL.opsi.every((o) => Number(o.split(" ")[0]) > 0), `Mesin ${k.id}: pilihan jalur positif`);
    // Arti.
    const benarArti = k.perlu === "jalur" ? "panjang jalur di tepi, yaitu keliling" : "banyak petak di dalam, yaitu isi";
    cek(arti.benar === benarArti && arti.tanya.includes(k.keperluan) && arti.opsi.includes("banyak sudut bangun"), `Mesin ${k.id}: arti sesuai keperluan ${k.perlu}`);
    cek((k.perlu === "isi" && /rumput/.test(k.keperluan)) || (k.perlu === "jalur" && /pagar|bingkai/.test(k.keperluan)), `Mesin ${k.id}: keperluan masuk akal`);
    // Pagar: sisi petak yang hanya dimiliki satu petak.
    const ruas = tepiMandiri(k.t.w, k.t.h);
    const isiT = petakMandiri(k.t.w, k.t.h);
    cek(pagar.benar === `${ruas} ruas` && pagar.tanya.includes(`${k.t.w} petak panjang dan ${k.t.h} petak lebar`) && MS.ruasPagar(k.t) === ruas, `Mesin ${k.id}: ${ruas} ruas pagar`);
    cek(pagar.opsi.includes(`${isiT} ruas`) && pagar.opsi.every((o) => o === pagar.benar || o !== `${ruas} ruas`) && isiT !== ruas, `Mesin ${k.id}: pengecoh pagar (isi petak)`);
    // Beda.
    const kel = tepiMandiri(k.d.w, k.d.h);
    const isiD = petakMandiri(k.d.w, k.d.h);
    cek(kel !== isiD && beda.benar === `jalur tepi ${kel} cm, isi ${isiD} petak` && beda.tanya.includes(`${k.d.w} petak panjang dan ${k.d.h} petak lebar`), `Mesin ${k.id}: jalur ${kel} dan isi ${isiD}`);
    cek(beda.opsi.includes(`jalur tepi ${isiD} cm, isi ${kel} petak`) && beda.opsi.includes(`jalur tepi ${kel} cm, isi ${kel} petak`) && beda.opsi.every((o) => o === beda.benar || o !== beda.benar), `Mesin ${k.id}: pengecoh beda (tertukar, isi disamakan)`);
    cek(EJ.ejaK5B4(c.ringkas).includes(EJ.kataK5B4(m.jarak)) && EJ.ejaK5B4(c.ringkas).includes(EJ.kataK5B4(ruas)), `Mesin ${k.id}: ringkas dieja dengan hasil benar`);
  }
  sama(MS.KASUS_JALUR.map((k) => k.id), ["ayah", "ibu", "baluwarti"], "Mesin: tiga kasus");
}

/* ------------------------------ Skenario ------------------------------ */
{
  const S = SK.SKENARIO_K5B4A;
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
  sama(S.id.replace(/-k5b4$/, ""), K5.ID_SKENARIO_K5B4.A, "id skenario sesuai id misi");
  const adegan = (id) => S.adegan.find((a) => a.id === id);
  const kebun = jalanMandiri([6, 4, 6, 4]);
  const soal = adegan("hitung-pagar").soal;
  cek(kebun.kembali && soal[0].teks.includes("6 m dan 4 m") && soal[0].jawaban === String(kebun.jarak) && kebun.jarak === 20, "A: pagar kebun 6 m dan 4 m sama dengan 20 meter (penelusuran kisi)");
  cek(soal[0].opsi.filter((o) => o !== soal[0].jawaban).every((o) => Number(o) !== kebun.jarak) && soal[0].opsi.includes(String(petakMandiri(6, 4))) && soal[0].opsi.includes(String(6 + 4)), "A: pengecoh pagar kebun (isi 24 dan dua sisi 10)");
  const persegi = jalanMandiri([3, 3, 3, 3]);
  cek(soal[1].teks.includes("sisinya 3 m") && soal[1].jawaban === String(persegi.jarak) && persegi.jarak === 12 && soal[1].opsi.includes(String(petakMandiri(3, 3))) && soal[1].opsi.filter((o) => o !== soal[1].jawaban).every((o) => Number(o) !== 12), "A: pagar persegi sisi 3 m sama dengan 12 meter, pengecoh isi 9");
  const ruas = adegan("ruas");
  cek(ruas.jumlah === tepiMandiri(6, 4) && ruas.jumlah === kebun.jarak && ruas.cerita.includes("6 m dan 4 m") && ruas.sukses.includes("6 + 4 + 6 + 4 = 20"), "A: banyak ruas pagar 20 (sisi petak di tepi)");
  const bingkai = adegan("bingkai");
  cek(bingkai.target === jalanMandiri([3, 3, 3, 3]).jarak && bingkai.target <= bingkai.maks && bingkai.cerita.includes("sisinya 3 cm") && bingkai.sukses.includes("3 + 3 + 3 + 3 = 12"), "A: bingkai persegi sisi 3 cm sama dengan 12 stik");
  const bandingkan = adegan("bandingkan");
  const b1 = { j: tepiMandiri(5, 3), i: petakMandiri(5, 3) };
  const b2 = { j: tepiMandiri(6, 2), i: petakMandiri(6, 2) };
  cek(b1.j === 16 && b2.j === 16 && b1.i === 15 && b2.i === 12 && bandingkan.cerita.includes(`${b1.j} cm dan ${b2.j} cm`) && bandingkan.cerita.includes(`${b1.i} petak dan ${b2.i} petak`), "A: dua bangun jalur 16 dan 16, isi 15 dan 12 (dihitung)");
  const bb = bandingkan.opsi.find((o) => o.benar);
  cek(b1.j === b2.j && b1.i !== b2.i && /jalur tepinya sama/.test(bb.teks) && /berbeda/.test(bb.teks) && bandingkan.opsi.filter((o) => !o.benar).every((o) => !/jalur tepinya sama, tetapi isinya berbeda/.test(o.teks)), "A: pernyataan benar jalur sama, isi berbeda; pengecoh salah");
  const kayu = adegan("kayu").opsi.find((o) => o.benar);
  cek(/jumlah panjang semua sisi/.test(kayu.teks) && adegan("kayu").opsi.filter((o) => !o.benar).every((o) => !/jumlah panjang semua sisi/.test(o.teks)), "A: panjang kayu pagar sama dengan jumlah semua sisi, pengecoh salah");
  const posisi = S.adegan.filter((a) => a.jenis === "pilih").map((a) => a.opsi.findIndex((o) => o.benar));
  cek(new Set(posisi).size === posisi.length, `A: letak jawaban pilih bervariasi (${posisi.join("")})`);
}

/* ------------------------------ Misi ------------------------------ */
{
  const huruf = ["A"];
  sama(Object.keys(TK.MISI_K5B4), huruf, "teks misi untuk A");
  sama(Object.keys(TK.NAMA_SIM_K5B4), huruf, "nama simulasi untuk A");
  cek(TK.hurufK5B4("Z") === "A" && TK.hurufK5B4("A") === "A", "huruf tak dikenal jatuh ke A");
  cek(TK.misiAwalK5Bab4("A").startsWith("Simulasi 1. Misi: ") && tanpaAngka(TK.misiAwalK5Bab4("A")), "misi awal dan dapat dieja");
  for (const h of huruf) {
    const daftar = K5.daftarMisiK5Bab4(h);
    cek(daftar.filter((m) => m.wajib).length === 7 && daftar.filter((m) => !m.wajib).length === 3, `${h}: tujuh misi wajib dan tiga tantangan bebas`);
    cek(new Set(daftar.map((m) => m.id)).size === 10 && daftar.every((m) => m.id.startsWith(`${h.toLowerCase()}-`)), `${h}: id misi unik berawalan huruf`);
    const kosong = [{ alat: "jalur", pernah: [] }, sel("tidak-ada"), A.keadaanJalurK5B4A(A.awalJalurK5B4A())];
    cek(kosong.every((k) => M0.misiBaru(daftar, k, new Set()).length === 0), `${h}: keadaan awal alat tidak memenuhi misi mana pun`);
    cek(daftar.every((m) => m.teks.length > 20 && tanpaAngka(m.teks)), `${h}: teks misi jelas dan dapat dieja`);
    const baru = (k) => M0.misiBaru(daftar, k, new Set());
    cek(baru(sel(K5.ID_MESIN_K5B4[h])).join() === `${h.toLowerCase()}-mesin` && baru(sel(K5.ID_SKENARIO_K5B4[h])).join() === `${h.toLowerCase()}-skenario`, `${h}: id mesin dan skenario memenuhi misinya`);
  }
  cek(M0.misiBaru(K5.MISI_A, { alat: "lain", pernah: ["jalan:0", "jalan:1", "pagar:0", "perlu:0", "jalur:0", "isi:0", "jalur:1", "isi:1"] }, new Set()).length === 0, "A: riwayat alat lain tidak memenuhi misi A");

  // Jalur nyata lewat aksi lab, dan near-miss.
  const capai = (aksi) => M0.misiBaru(K5.MISI_A, A.keadaanJalurK5B4A(jalan(A.awalJalurK5B4A(), L, aksi)), new Set());
  const susur = (i, kembali = true) => [{ t: "J_DATA", i }, ...[0, 1, 2, 3].map((k) => ({ t: "J_SISI", k })), ...(kembali ? [{ t: "J_KEMBALI" }] : [])];
  cek(capai(susur(0)).join() === "a-persegi" && capai(susur(1)).join() === "a-pp", "A: menyusuri persegi sisi 4 dan persegi panjang 5 dan 3 memenuhi");
  cek(capai(susur(0, false)).length === 0 && capai(susur(1, false)).length === 0, "A: berhenti sebelum kembali ke sudut awal tidak memenuhi");
  cek(capai([{ t: "J_DATA", i: 0 }, { t: "J_SISI", k: 0 }, { t: "J_SISI", k: 1 }, { t: "J_SISI", k: 2 }, { t: "J_KEMBALI" }]).length === 0, "A: satu sisi terlewat lalu kembali tidak memenuhi");
  cek(capai([{ t: "J_DATA", i: 0 }, { t: "J_SISI", k: 0 }, { t: "J_SISI", k: 2 }, { t: "J_SISI", k: 1 }, { t: "J_SISI", k: 3 }, { t: "J_KEMBALI" }]).length === 0, "A: melompat sisi tidak memenuhi");
  cek(capai(susur(2)).join() === "a-besar" && capai([...susur(2), ...susur(0)]).join() === "a-persegi,a-besar", "A: tantangan persegi panjang 6 dan 4, dan urutan campur");
  const pasang = (i, kurangi = null) => {
    const t = A.DATA_PAGAR[i];
    const aksi = [{ t: "P_DATA", i }];
    for (let k = 0; k < 4; k += 1) for (let n = 0; n < A.panjangTepi(t, k) - (kurangi === k ? 1 : 0); n += 1) aksi.push({ t: "P_RUAS", k, d: 1 });
    aksi.push({ t: "P_PERIKSA" });
    return aksi;
  };
  cek(capai(pasang(0)).join() === "a-pagar" && capai(pasang(2)).join() === "a-pagar-kecil", "A: pagar tanah 6 dan 4, dan tantangan 4 dan 3");
  cek(capai(pasang(1)).length === 0, "A: pagar tanah 5 dan 3 hanya latihan, bukan misi");
  for (let k = 0; k < 4; k += 1) cek(capai(pasang(0, k)).length === 0, `A: pagar kurang satu ruas di tepi ${A.TEPI[k]} tidak memenuhi`);
  cek(capai(pasang(0).slice(0, -1)).length === 0, "A: pagar lengkap tetapi belum diperiksa tidak memenuhi");
  const bandingAksi = (i, ...aksi) => [{ t: "B_DATA", i }, ...aksi];
  const J = (i) => ({ t: "B_JALUR", nilai: tepiMandiri(A.DATA_BANDING[i].w, A.DATA_BANDING[i].h) });
  const I = (i) => ({ t: "B_ISI", nilai: petakMandiri(A.DATA_BANDING[i].w, A.DATA_BANDING[i].h) });
  const P = (jawab) => ({ t: "B_PERLU", jawab });
  cek(capai(bandingAksi(0, P("jalur"), J(0))).join() === "a-bingkai", "A: bingkai foto, pilih jalur tepi lalu hitung jalurnya memenuhi");
  cek(capai(bandingAksi(0, P("isi"), J(0))).length === 0 && capai(bandingAksi(0, P("jalur"), { t: "B_JALUR", nilai: 15 })).length === 0 && capai(bandingAksi(0, J(0))).length === 0 && capai(bandingAksi(0, P("jalur"), I(0))).length === 0, "A: bingkai dengan keperluan salah, jalur salah, tanpa keperluan, atau hanya isi tidak memenuhi");
  cek(capai([...bandingAksi(0, J(0), I(0)), ...bandingAksi(1, J(1), I(1))]).join() === "a-sama", "A: jalur dan isi kedua bangun memenuhi");
  cek(capai([...bandingAksi(0, J(0), I(0)), ...bandingAksi(1, J(1))]).length === 0 && capai([...bandingAksi(0, J(0)), ...bandingAksi(1, J(1), I(1))]).length === 0, "A: salah satu isi atau jalur belum dihitung tidak memenuhi");
  cek(capai(bandingAksi(1, P("isi"), J(1), I(1))).length === 0, "A: bangun kedua saja tidak memenuhi");
  cek(capai(bandingAksi(2, J(2), I(2))).join() === "a-kecil" && capai(bandingAksi(2, J(2))).length === 0, "A: tantangan bangun 2 dan 2 (jalur dan isi)");
  cek(capai([...bandingAksi(0, P("jalur"), J(0), I(0)), ...bandingAksi(1, P("isi"), J(1), I(1))]).join() === "a-bingkai,a-sama", "A: bingkai dan jalur sama bersamaan");

  // Gerbang.
  for (const h of huruf) {
    const daftar = M0.tampilMisi(K5.daftarMisiK5Bab4(h));
    const wajibIds = daftar.filter((m) => m.wajib).map((m) => m.id);
    cek(!M0.wajibSelesai(daftar, new Set(wajibIds.slice(0, 6))), `${h}: enam dari tujuh wajib belum membuka gerbang`);
    cek(M0.wajibSelesai(daftar, new Set(wajibIds)), `${h}: tujuh wajib membuka gerbang`);
    cek(M0.bolehLanjut({ adaMisi: true, wajibSelesai: false, dilewati: true, disentuh: true }) && !M0.bolehLanjut({ adaMisi: true, wajibSelesai: false, dilewati: true, disentuh: false }), "lewati hanya setelah disentuh");
  }
}

/* ------------------------------ Konsep tidak bocor antar sub-bab ------------------------------ */
{
  const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas5-bab4-ringkas.json", import.meta.url), "utf8"));
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
  // Sub-Bab A tidak memakai konsep sub-bab berikutnya: segitiga dan sama sisi (B); rumus, kali, dan kurung (C);
  // segi lima, enam, delapan, banyak, beraturan (D); gabungan, sekat, bungkus, denah (E).
  const BOCOR_A = /(×|\bkali\b|\brumus\b|\bsegitiga\b|\bsama sisi\b|\bsama kaki\b|\bsegi\s+(lima|enam|tujuh|delapan|banyak|empat)\b|\bberaturan\b|\bgabungan\b|\bsekat\b|\bbungkus\b|\bdenah\b|\bkurung\b)/i;
  const KURUNG = /[()]/;
  const catat = (teks, apa, kurung = true) => {
    const m = BOCOR_A.exec(teks);
    cek(!m, `A: ${apa} bebas konsep sub-bab berikutnya (${m ? m[0] : ""} di "${String(teks).slice(Math.max(0, (m?.index ?? 0) - 30), (m?.index ?? 0) + 40)}")`);
    if (kurung) cek(!KURUNG.test(teks), `A: ${apa} tanpa kurung`);
  };
  for (const t of [TK.MISI_K5B4.A, TK.NAMA_SIM_K5B4.A, ...K5.MISI_A.map((m) => m.teks)]) catat(t, "teks misi");
  catat(teksDari(MS.MESIN_JALUR), "mesin");
  catat(teksDari(SK.SKENARIO_K5B4A), "skenario");
  catat(teksDari(ringkas.subBab.A), "peta dan infografis ringkas");
  catat(tanpaKomentar(baca("SimulasiLabJalurK5B4", "tsx")), "komponen lab (tanpa komentar)", false);
  catat(tanpaKomentar(baca("model-jalur-k5b4", "tsx")), "model gambar (tanpa komentar)", false);
  catat(tanpaKomentar(baca("lab-jalur-k5b4a", "ts")), "logika lab (tanpa komentar)", false);
  catat(tanpaKomentar(baca("SimulasiK5Bab4", "tsx")), "pembungkus (tanpa komentar)", false);
  catat(tanpaKomentar(baca("mesin-data-k5b4", "ts")), "logika mesin (tanpa komentar)", false);
  for (const p of globalThis.__pesanA) catat(p, "pesan lab dari fuzz");
  for (const u of [A.ucapJalanK5B4A(x0), A.ucapPagarK5B4A(x0), A.ucapBandingK5B4A(x0)]) catat(u, "ucapan lab");

  // Kunci tidak bocor ke klien, tanpa jaringan.
  for (const f of ["SimulasiLabJalurK5B4", "SimulasiK5Bab4", "model-jalur-k5b4"]) {
    const s = baca(f, "tsx");
    cek(!/correct_index|explanation/.test(s), `${f}: tidak memuat correct_index atau explanation`);
    cek(!/fetch\(|XMLHttpRequest|api\/|openai|anthropic|gemini/i.test(s), `${f}: tanpa jaringan atau model bahasa`);
  }
  for (const f of ["lab-jalur-k5b4a", "mesin-data-k5b4", "skenario-k5b4", "misi-k5bab4", "misi-teks-k5b4", "eja-k5b4"]) {
    const s = baca(f, "ts");
    cek(!/fetch\(|XMLHttpRequest|from "react"|openai|anthropic|gemini|correct_index|explanation/i.test(s), `${f}: murni`);
    const impor = s.match(/^import .+$/gm) ?? [];
    cek(impor.every((l) => l.startsWith("import type")), `${f}: hanya mengimpor tipe`);
  }
  cek((baca("lab-jalur-k5b4a", "ts").match(/^import /gm) ?? []).length === 0 && (baca("eja-k5b4", "ts").match(/^import /gm) ?? []).length === 0, "lab dan pengeja tanpa impor");
  {
    const s = baca("SimulasiLabJalurK5B4", "tsx");
    cek(/useEffect\(\(\) => \{\s*onKeadaan\?\.\(keadaan\w+\(x\)\);\s*\}, \[onKeadaan, x\]\);/.test(s), "lab: lapor keadaan lewat useEffect");
    cek(/setLihat\(v\);\s*kirim\(\{ t: "PESAN_KOSONG" \}\);/.test(s), "lab: ganti tampilan mengosongkan pesan");
    const catatan = [...s.matchAll(/^\s*"([^"]+)",$/gm)].map((m) => m[1]);
    cek(catatan.length >= 3 && catatan.every(tanpaAngka), "lab: Coba ini dapat dieja");
    cek(/aria-label="Kembali ke sudut awal"/.test(s) && /aria-label=\{`Sisi \$\{k \+ 1\}`\}/.test(s), "lab: tombol sisi dan kembali berlabel");
  }
  const pembungkus = baca("SimulasiK5Bab4", "tsx");
  cek(/eja=\{ejaK5B4\}/.test(pembungkus), "pembungkus: mesin dieja ejaK5B4");
  const coba = [...pembungkus.matchAll(/"([^"]*\?)"/g)].map((m) => m[1]);
  cek(coba.length >= 3 && coba.every(tanpaAngka), "Coba ini mesin dapat dieja");
  // Semua ucapan lab dieja menjadi kata.
  const ucapan = [];
  for (let i = 0; i < A.DATA_JALAN.length; i += 1) {
    const xj = L(x0, { t: "J_DATA", i });
    ucapan.push(A.ucapJalanK5B4A(xj), A.ucapJalanK5B4A(L(xj, { t: "J_SISI", k: 0 })), A.ucapJalanK5B4A(jalan(xj, L, [0, 1, 2, 3].map((k) => ({ t: "J_SISI", k })).concat([{ t: "J_KEMBALI" }]))));
  }
  for (let i = 0; i < A.DATA_PAGAR.length; i += 1) {
    const xp = L(x0, { t: "P_DATA", i });
    ucapan.push(A.ucapPagarK5B4A(xp), A.ucapPagarK5B4A(L(xp, { t: "P_RUAS", k: 0, d: 1 })));
  }
  for (let i = 0; i < A.DATA_BANDING.length; i += 1) {
    const xb = L(x0, { t: "B_DATA", i });
    ucapan.push(A.ucapBandingK5B4A(xb), A.ucapBandingK5B4A(L(xb, { t: "B_PERLU", jawab: A.KEPERLUAN[i].jawab })));
  }
  cek(ucapan.length >= 15 && ucapan.every(tanpaAngka), `semua ${ucapan.length} ucapan lab dieja menjadi kata`);
  for (const u of ucapan) catat(u, "ucapan lab");
}

/* ------------------------------ Data ringkas ------------------------------ */
{
  const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas5-bab4-ringkas.json", import.meta.url), "utf8"));
  cek(ringkas.chapter_id === "mtk-5-bab4" && ringkas.phase_code === "FASE_C" && ringkas.grade === 5, "ringkas: id bab, fase, kelas");
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
  const butir = (panel, id) => panel.butir.find((b) => b.id === id);
  const [p1, p2, p3] = A0.infografis.panel;
  const pp = A.DATA_JALAN[1].sisi;
  sama(butir(p1, "sisi").visual.baris.map((r) => r[1]), pp, "ringkas A: sisi persegi panjang 5, 3, 5, 3 sama dengan data lab");
  sama(butir(p1, "sisi").visual.baris.map((r) => r[0]), ["pertama", "kedua", "ketiga", "keempat"], "ringkas A: nama sisi berurutan");
  cek(butir(p1, "kembali").visual.isi === `${pp.join(" + ")} = ${jalanMandiri(pp).jarak}` && jalanMandiri(pp).jarak === 16, "ringkas A: 5 + 3 + 5 + 3 sama dengan 16 (penelusuran kisi)");
  cek(butir(p1, "kembali").suara.includes(EJ.kataK5B4(16)) && butir(p1, "sisi").suara.includes(EJ.kataK5B4(5)) && butir(p1, "sisi").suara.includes(EJ.kataK5B4(3)), "ringkas A: suara menyebut hasil dan sisi");
  const [jalurS, isiS] = p2.sisi;
  cek(jalurS.visual.isi === `${tepiMandiri(5, 3)} cm` && isiS.visual.isi === `${petakMandiri(5, 3)} petak` && A.DATA_BANDING[0].w === 5 && A.DATA_BANDING[0].h === 3, "ringkas A: jalur 16 cm dan isi 15 petak (dihitung)");
  cek(jalurS.suara.includes(EJ.kataK5B4(16)) && isiS.suara.includes(EJ.kataK5B4(15)), "ringkas A: suara jalur dan isi");
  cek(butir(p3, "pagar").visual.isi === `${[6, 4, 6, 4].join(" + ")} = ${jalanMandiri([6, 4, 6, 4]).jarak}` && jalanMandiri([6, 4, 6, 4]).jarak === 20, "ringkas A: pagar kebun 20 (dihitung)");
  cek(butir(p3, "bingkai").visual.isi === `3 + 3 + 3 + 3 = ${jalanMandiri([3, 3, 3, 3]).jarak}` && jalanMandiri([3, 3, 3, 3]).jarak === 12, "ringkas A: bingkai foto 12 (dihitung)");
  cek(butir(p3, "pagar").suara.includes(EJ.kataK5B4(20)) && butir(p3, "bingkai").suara.includes(EJ.kataK5B4(12)), "ringkas A: suara pagar dan bingkai");
  const kartu = (id) => A0.peta.kartu.find((k) => k.id === id).teks;
  cek(kartu("a-lima") === `${pp.join(" + ")} = ${jalanMandiri(pp).jarak}` && kartu("a-empat") === `${A.DATA_JALAN[0].sisi.join(" + ")} = ${jalanMandiri(A.DATA_JALAN[0].sisi).jarak}`, "ringkas A: kartu jumlah sisi (dihitung)");
  sama(Object.keys(ringkas.subBab), ["A"], "ringkas: gelombang ini hanya sub-bab A");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
