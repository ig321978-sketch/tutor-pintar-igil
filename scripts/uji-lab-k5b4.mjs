// Uji Simulasi Kelas 5 Bab 4 (Keliling Bangun Datar): Lab Jalur (A), Lab Segitiga (B), Lab Segi Empat (C), Lab Segi Banyak (D),
// mesin, skenario, misi, gerbang, data ringkas, pengeja, dan konsep sub-bab berikutnya tidak bocor ke Sub-Bab A sampai D.
// Jalankan: node --no-warnings scripts/uji-lab-k5b4.mjs
import { readFileSync } from "node:fs";
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K5 from "../src/components/modul/misi-k5bab4.ts";
import * as TK from "../src/components/modul/misi-teks-k5b4.ts";
import * as A from "../src/components/modul/lab-jalur-k5b4a.ts";
import * as B from "../src/components/modul/lab-segitiga-k5b4b.ts";
import * as SE from "../src/components/modul/lab-segiempat-k5b4c.ts";
import * as SB from "../src/components/modul/lab-segibanyak-k5b4d.ts";
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
    cek(x.selesai && def.selesaiId === K5.ID_MESIN_K5B4[{ "mesin-jalur-k5b4": "A", "mesin-segitiga-k5b4": "B", "mesin-segiempat-k5b4": "C", "mesin-segibanyak-k5b4": "D" }[def.id]], `${def.id}: bisa diselesaikan, id selesai sesuai misi`);
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
  sama(Object.keys(TK.MISI_K5B4), ["A", "B", "C", "D"], "teks misi untuk A sampai D");
  sama(Object.keys(TK.NAMA_SIM_K5B4), ["A", "B", "C", "D"], "nama simulasi untuk A sampai D");
  cek(TK.hurufK5B4("Z") === "A" && TK.hurufK5B4("A") === "A" && TK.hurufK5B4("B") === "B" && TK.hurufK5B4("C") === "C" && TK.hurufK5B4("D") === "D", "huruf tak dikenal jatuh ke A");
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
  for (const p of globalThis.__pesanA) catat(p, "pesan lab dari fuzz");
  for (const u of [A.ucapJalanK5B4A(x0), A.ucapPagarK5B4A(x0), A.ucapBandingK5B4A(x0)]) catat(u, "ucapan lab");

  // Kunci tidak bocor ke klien, tanpa jaringan.
  for (const f of ["SimulasiLabJalurK5B4", "SimulasiK5Bab4", "model-jalur-k5b4"]) {
    const s = baca(f, "tsx");
    cek(!/correct_index|explanation/.test(s), `${f}: tidak memuat correct_index atau explanation`);
    cek(!/fetch\(|XMLHttpRequest|api\/|openai|anthropic|gemini/i.test(s), `${f}: tanpa jaringan atau model bahasa`);
  }
  for (const f of ["lab-jalur-k5b4a", "lab-segitiga-k5b4b", "lab-segiempat-k5b4c", "lab-segibanyak-k5b4d", "mesin-data-k5b4", "skenario-k5b4", "misi-k5bab4", "misi-teks-k5b4", "eja-k5b4"]) {
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
}

/* ------------------------------ Lab B: Segitiga ------------------------------ */
const LB = B.langkahSegitigaK5B4B;
const y0 = B.awalSegitigaK5B4B();
// Hitungan mandiri: keliling dengan berjalan satu sentimeter demi satu sentimeter di tepi.
const jalanSisi = (sisi) => {
  let jarak = 0;
  for (const s of sisi) for (let u = 0; u < s; u += 1) jarak += 1;
  return jarak;
};
const segitigaSah = (s) => s[0] < s[1] + s[2] && s[1] < s[0] + s[2] && s[2] < s[0] + s[1];
const banyakSama = (s) => {
  let n = 0;
  for (let a = 0; a < 3; a += 1) for (let b = a + 1; b < 3; b += 1) if (s[a] === s[b]) n += 1;
  return n;
};
{
  cek(y0.pernah.length === 0 && y0.pesan === "" && y0.jumlah.lewat.every((v) => !v) && !y0.sama.tandaOk && y0.ukur.ok.every((v) => !v), "B awal: kosong, belum ada riwayat");
  cek(B.DATA_JUMLAH.length === 4 && B.DATA_SAMA.length === 4 && B.DATA_UKUR.length === 2, "B: jumlah segitiga di tiap tampilan");
  cek([...B.DATA_JUMLAH, ...B.DATA_SAMA, ...B.DATA_UKUR].every(segitigaSah), "B: semua segitiga sah (sisi terpanjang kurang dari jumlah dua sisi lain)");
  cek(B.DATA_UKUR.every((s) => Math.max(...s) <= B.SKALA_UKUR), "B: sisi ukur muat pada penggaris");

  // Jumlah.
  const permutasi = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];
  const letakJ = [];
  for (const [i, sisi] of B.DATA_JUMLAH.entries()) {
    const nama = sisi.join(", ");
    const K = jalanSisi(sisi);
    cek(B.jumlahSisi(sisi) === K, `B Jumlah ${nama}: keliling ${K} sama dengan berjalan di tepi`);
    const o = B.opsiJumlah(i);
    cek(o.length === 3 && new Set(o).size === 3 && o.filter((v) => v === K).length === 1 && o.every((v) => Number.isInteger(v) && v > 0), `B Jumlah ${nama}: tiga pilihan unik, satu benar (${K})`);
    cek(o.includes(3 * sisi[0]) && o.includes(sisi[0] + sisi[1]) && 3 * sisi[0] !== K && sisi[0] + sisi[1] !== K, `B Jumlah ${nama}: pengecoh tiga kali sisi pertama dan dua sisi saja, keduanya salah`);
    letakJ.push(o.indexOf(K));
    const xj = LB(y0, { t: "JM_DATA", i });
    cek(/Ketuk dulu/.test(LB(xj, { t: "JM_HASIL", nilai: K }).pesan) && LB(xj, { t: "JM_HASIL", nilai: K }).pernah.length === 0, `B Jumlah ${nama}: keliling sebelum ketiga sisi diketuk ditolak`);
    for (const urut of permutasi) {
      let s = xj;
      urut.forEach((k, n) => {
        s = LB(s, { t: "JM_SISI", k });
        cek(s.pesan.startsWith("✅") && s.pesan.includes(`sepanjang ${sisi[k]} cm`) && s.jumlah.lewat[k], `B Jumlah ${nama}: sisi ke-${k + 1} diterima pada urutan ${urut.join("")}`);
        const dipakai = urut.slice(0, n + 1).map((v) => v).sort().map((v) => sisi[v]);
        cek(s.pesan.includes(`Jumlah sekarang ${dipakai.length === 1 ? dipakai[0] : `${dipakai.join(" + ")} = ${jalanSisi(dipakai)}`} cm`), `B Jumlah ${nama}: jumlah berjalan urutan ${urut.join("")} langkah ${n + 1}`);
        cek(LB(s, { t: "JM_SISI", k }).pesan.includes("sudah dijumlah") && LB(s, { t: "JM_SISI", k }).jumlah.lewat.filter(Boolean).length === n + 1, `B Jumlah ${nama}: mengetuk sisi ke-${k + 1} lagi ditolak`);
      });
      cek(s.pesan.includes("Ketiga sisi sudah dijumlah"), `B Jumlah ${nama}: ketiga sisi disebut selesai`);
      for (const v of o.filter((n) => n !== K)) {
        const t = LB(s, { t: "JM_HASIL", nilai: v });
        cek(!t.jumlah.hasilOk && t.pernah.length === 0 && !t.pesan.startsWith("✅"), `B Jumlah ${nama}: keliling ${v} ditolak`);
        cek(/Dikali 3 hanya bila/.test(t.pesan) === (v === 3 * sisi[0] && !B.semuaSama(sisi)) && /dua sisi/.test(t.pesan) === (v === sisi[0] + sisi[1] && v !== 3 * sisi[0]), `B Jumlah ${nama}: keliling ${v} dijelaskan tepat`);
      }
      const ok = LB(s, { t: "JM_HASIL", nilai: K });
      cek(ok.jumlah.hasilOk && ok.pernah.includes(`jumlah:${i}`) && ok.pesan.startsWith("✅") && ok.pesan.includes(`${sisi.join(" + ")} = ${K} cm`), `B Jumlah ${nama}: keliling ${K} tercatat`);
    }
    // Hanya dua sisi diketuk: keliling ditolak.
    const dua = jalan(xj, LB, [{ t: "JM_SISI", k: 0 }, { t: "JM_SISI", k: 1 }]);
    cek(LB(dua, { t: "JM_HASIL", nilai: K }).pernah.length === 0 && /Ketuk dulu/.test(LB(dua, { t: "JM_HASIL", nilai: K }).pesan), `B Jumlah ${nama}: dua sisi diketuk belum cukup`);
    cek(LB(xj, { t: "JM_SISI", k: 3 }) === xj && LB(xj, { t: "JM_SISI", k: -1 }) === xj && LB(xj, { t: "JM_HASIL", nilai: 999 }) === xj, `B Jumlah ${nama}: sisi dan nilai di luar batas diabaikan`);
    cek(LB(dua, { t: "JM_DATA", i: (i + 1) % 4 }).jumlah.lewat.every((v) => !v), `B Jumlah ${nama}: ganti segitiga mengosongkan ketukan`);
  }
  cek(new Set(letakJ).size >= 2, `B Jumlah: letak jawaban benar bervariasi (${letakJ.join("")})`);
  cek(LB(y0, { t: "JM_DATA", i: 4 }) === y0 && LB(y0, { t: "JM_DATA", i: -1 }) === y0, "B Jumlah: segitiga di luar batas diabaikan");

  // Sama.
  const letakS = [];
  for (const [i, sisi] of B.DATA_SAMA.entries()) {
    const nama = sisi.join(", ");
    const K = jalanSisi(sisi);
    const ketigaSama = banyakSama(sisi) === 3;
    cek(B.semuaSama(sisi) === ketigaSama, `B Sama ${nama}: pemeriksaan ketiga sisi sama dihitung berpasangan`);
    cek(!ketigaSama || K === 3 * sisi[0], `B Sama ${nama}: 3 kali sisi sama dengan menjumlah tiga sisi (${K})`);
    const o = B.opsiSama(i);
    cek(o.length === 3 && new Set(o).size === 3 && o.filter((v) => v === K).length === 1 && o.every((v) => v > 0), `B Sama ${nama}: tiga pilihan unik, satu benar (${K})`);
    letakS.push(o.indexOf(K));
    if (ketigaSama) cek(o.includes(2 * sisi[0]) && o.includes(sisi[0] * sisi[0]), `B Sama ${nama}: pengecoh dua kali sisi dan sisi kali sisi`);
    else cek(o.includes(3 * sisi[0]) && 3 * sisi[0] !== K && o.includes(sisi[0] + sisi[1]), `B Sama ${nama}: pengecoh tiga kali sisi dan dua sisi saja`);
    const xs = LB(y0, { t: "SM_DATA", i });
    cek(LB(xs, { t: "SM_HASIL", nilai: K }).pernah.length === 0 && /Periksa dulu/.test(LB(xs, { t: "SM_HASIL", nilai: K }).pesan), `B Sama ${nama}: keliling sebelum diperiksa ditolak`);
    const salah = LB(xs, { t: "SM_JAWAB", ya: !ketigaSama });
    cek(!salah.sama.tandaOk && !salah.pesan.startsWith("✅") && salah.pesan.includes(nama), `B Sama ${nama}: jawaban pemeriksaan yang salah ditolak`);
    cek(LB(salah, { t: "SM_HASIL", nilai: K }).pernah.length === 0, `B Sama ${nama}: keliling setelah pemeriksaan salah tidak dicatat`);
    const benar = LB(xs, { t: "SM_JAWAB", ya: ketigaSama });
    cek(benar.sama.tandaOk && benar.pesan.startsWith("✅") && (ketigaSama ? benar.pesan.includes(`3 × ${sisi[0]}`) : /tidak semuanya sama/.test(benar.pesan)), `B Sama ${nama}: pemeriksaan benar diterima`);
    cek(LB(xs, { t: "SM_JAWAB", ya: "ya" }) === xs, `B Sama ${nama}: jawaban bukan ya atau tidak diabaikan`);
    for (const v of o.filter((n) => n !== K)) {
      const t = LB(benar, { t: "SM_HASIL", nilai: v });
      cek(!t.sama.hasilOk && t.pernah.length === 0 && !t.pesan.startsWith("✅"), `B Sama ${nama}: keliling ${v} ditolak`);
      cek(/Dikali 3 hanya bila/.test(t.pesan) === (!ketigaSama && v === 3 * sisi[0]) && /Sisi dikali sisi/.test(t.pesan) === (ketigaSama && v === sisi[0] * sisi[0]), `B Sama ${nama}: keliling ${v} dijelaskan tepat`);
    }
    const ok = LB(benar, { t: "SM_HASIL", nilai: K });
    cek(ok.sama.hasilOk && ok.pernah.includes(`sama:${i}`) && ok.pesan.startsWith("✅") && ok.pesan.includes(`${sisi.join(" + ")} = ${K} cm`), `B Sama ${nama}: keliling ${K} tercatat`);
    cek(ketigaSama === ok.pesan.includes(`sama dengan 3 × ${sisi[0]} = ${K} cm`) && ketigaSama !== /tidak dikali 3/.test(ok.pesan), `B Sama ${nama}: pesan hasil sesuai sama sisi atau sama kaki`);
    cek(LB(xs, { t: "SM_HASIL", nilai: 999 }) === xs && !LB(ok, { t: "SM_DATA", i: (i + 1) % 4 }).sama.tandaOk && LB(ok, { t: "SM_DATA", i: (i + 1) % 4 }).pernah.includes(`sama:${i}`), `B Sama ${nama}: nilai di luar pilihan diabaikan, ganti segitiga mengosongkan`);
  }
  cek(new Set(letakS).size >= 2, `B Sama: letak jawaban benar bervariasi (${letakS.join("")})`);
  cek(B.DATA_SAMA.filter((s) => B.semuaSama(s)).length === 3 && B.DATA_SAMA.filter((s) => !B.semuaSama(s) && banyakSama(s) === 1).length === 1, "B Sama: tiga sama sisi dan satu sama kaki");
  cek(LB(y0, { t: "SM_DATA", i: 4 }) === y0, "B Sama: segitiga di luar batas diabaikan");

  // Ukur.
  const letakU = [];
  for (const [i, sisi] of B.DATA_UKUR.entries()) {
    const nama = `segitiga ${i + 1}`;
    const K = jalanSisi(sisi);
    const o = B.opsiUkur(i);
    cek(o.length === 3 && new Set(o).size === 3 && o.filter((v) => v === K).length === 1 && o.every((v) => v > 0), `B Ukur ${nama}: tiga pilihan unik, satu benar (${K})`);
    cek(o.includes(3 * sisi[0]) && o.includes(sisi[0] + sisi[1]) && 3 * sisi[0] !== K, `B Ukur ${nama}: pengecoh tiga kali sisi pertama dan dua sisi saja`);
    letakU.push(o.indexOf(K));
    const xu = LB(y0, { t: "UK_DATA", i });
    cek(/Ukur dulu/.test(LB(xu, { t: "UK_HASIL", nilai: K }).pesan) && LB(xu, { t: "UK_HASIL", nilai: K }).pernah.length === 0, `B Ukur ${nama}: keliling sebelum diukur ditolak`);
    for (let k = 0; k < 3; k += 1) {
      for (let n = 1; n <= B.SKALA_UKUR; n += 1) {
        const s = LB(xu, { t: "UK_UKUR", k, nilai: n });
        if (n === sisi[k]) cek(s.ukur.ok[k] && s.pesan.startsWith("✅") && s.pesan.includes(`diukur ${n} cm`), `B Ukur ${nama}: sisi ${k + 1} angka ${n} diterima`);
        else cek(!s.ukur.ok[k] && !s.pesan.startsWith("✅") && (n < sisi[k] ? /terlalu kecil/.test(s.pesan) : /terlalu besar/.test(s.pesan)), `B Ukur ${nama}: sisi ${k + 1} angka ${n} ditolak ${n < sisi[k] ? "kecil" : "besar"}`);
      }
      for (const n of [0, 13, -2, 2.5]) cek(LB(xu, { t: "UK_UKUR", k, nilai: n }) === xu, `B Ukur ${nama}: angka ${n} di luar penggaris diabaikan`);
    }
    cek(LB(xu, { t: "UK_UKUR", k: 3, nilai: 5 }) === xu && LB(xu, { t: "UK_UKUR", k: -1, nilai: 5 }) === xu, `B Ukur ${nama}: sisi di luar batas diabaikan`);
    const dua = jalan(xu, LB, [0, 1].map((k) => ({ t: "UK_UKUR", k, nilai: sisi[k] })));
    cek(LB(dua, { t: "UK_HASIL", nilai: K }).pernah.length === 0 && /Ukur dulu/.test(LB(dua, { t: "UK_HASIL", nilai: K }).pesan), `B Ukur ${nama}: dua sisi diukur belum cukup`);
    cek(/sudah diukur/.test(LB(dua, { t: "UK_UKUR", k: 0, nilai: 1 }).pesan), `B Ukur ${nama}: sisi yang sudah diukur tidak diukur lagi`);
    const semuaOk = jalan(xu, LB, [0, 1, 2].map((k) => ({ t: "UK_UKUR", k, nilai: sisi[k] })));
    cek(semuaOk.pesan.includes("Ketiga sisi sudah diukur"), `B Ukur ${nama}: ketiga sisi diukur disebut`);
    for (const v of o.filter((n) => n !== K)) {
      const t = LB(semuaOk, { t: "UK_HASIL", nilai: v });
      cek(!t.ukur.hasilOk && t.pernah.length === 0 && !t.pesan.startsWith("✅"), `B Ukur ${nama}: keliling ${v} ditolak`);
      cek(/Dikali 3 hanya bila/.test(t.pesan) === (v === 3 * sisi[0]), `B Ukur ${nama}: keliling ${v} dijelaskan tepat`);
    }
    const ok = LB(semuaOk, { t: "UK_HASIL", nilai: K });
    cek(ok.ukur.hasilOk && ok.pernah.includes(`ukur:${i}`) && ok.pesan.includes(`${sisi.join(" + ")} = ${K} cm`) && ok.pesan.startsWith("✅"), `B Ukur ${nama}: keliling ${K} tercatat`);
    cek((banyakSama(sisi) === 1) === /Dua sisi yang sama tidak berarti/.test(ok.pesan), `B Ukur ${nama}: catatan sama kaki hanya bila dua sisi sama`);
    cek(LB(xu, { t: "UK_HASIL", nilai: 999 }) === xu && !LB(ok, { t: "UK_DATA", i: (i + 1) % 2 }).ukur.ok[0] && LB(ok, { t: "UK_DATA", i: (i + 1) % 2 }).pernah.includes(`ukur:${i}`), `B Ukur ${nama}: nilai di luar pilihan diabaikan, ganti segitiga mengosongkan`);
  }
  cek(new Set(letakU).size >= 2, `B Ukur: letak jawaban benar bervariasi (${letakU.join("")})`);
  cek(LB(y0, { t: "UK_DATA", i: 2 }) === y0, "B Ukur: segitiga di luar batas diabaikan");

  // Fuzz.
  const acak = acakDari(77);
  let s = y0;
  let ok = true;
  const pesanSemua = new Set();
  const riwayatSemua = new Set();
  const ID = /^(jumlah:[0-3]|sama:[0-3]|ukur:[0-1])$/;
  for (let n = 0; n < 20000; n += 1) {
    const p = acak(24);
    const sj = B.dataJumlah(s);
    const ss = B.dataSama(s);
    const su = B.dataUkur(s);
    const a =
      p === 0 ? { t: "JM_DATA", i: acak(5) } :
      p <= 2 ? { t: "JM_SISI", k: acak(4) - (acak(8) === 0 ? 1 : 0) } :
      p === 3 ? { t: "JM_HASIL", nilai: acak(5) === 0 ? 99 : B.opsiJumlah(s.jumlah.data)[acak(3)] } :
      p === 4 ? { t: "JM_HASIL", nilai: B.jumlahSisi(sj) } :
      p === 5 ? { t: "SM_DATA", i: acak(5) } :
      p === 6 ? { t: "SM_JAWAB", ya: acak(2) === 0 } :
      p === 7 ? { t: "SM_JAWAB", ya: B.semuaSama(ss) } :
      p === 8 ? { t: "SM_HASIL", nilai: acak(5) === 0 ? 99 : B.opsiSama(s.sama.data)[acak(3)] } :
      p === 9 ? { t: "SM_HASIL", nilai: B.jumlahSisi(ss) } :
      p === 10 ? { t: "UK_DATA", i: acak(3) } :
      p <= 12 ? { t: "UK_UKUR", k: acak(4) - (acak(8) === 0 ? 1 : 0), nilai: acak(15) - 1 } :
      p <= 15 ? { t: "UK_UKUR", k: acak(3), nilai: su[acak(3)] } :
      p === 16 ? { t: "UK_HASIL", nilai: acak(5) === 0 ? 99 : B.opsiUkur(s.ukur.data)[acak(3)] } :
      p === 17 ? { t: "UK_HASIL", nilai: B.jumlahSisi(su) } :
      p <= 19 ? { t: "JM_SISI", k: s.jumlah.lewat.findIndex((v) => !v) } :
      p === 20 ? { t: "PESAN_KOSONG" } :
      acak(30) === 0 ? { t: "RESET" } : { t: "UK_UKUR", k: s.ukur.ok.findIndex((v) => !v), nilai: su[Math.max(0, s.ukur.ok.findIndex((v) => !v))] };
    const t = LB(s, a);
    if (a.t !== "RESET" && !s.pernah.every((v) => t.pernah.includes(v))) ok = false;
    if (!(t.jumlah.data >= 0 && t.jumlah.data < 4 && t.sama.data >= 0 && t.sama.data < 4 && t.ukur.data >= 0 && t.ukur.data < 2)) ok = false;
    if (!(t.jumlah.lewat.length === 3 && t.ukur.ok.length === 3)) ok = false;
    for (const id of t.pernah) if (!ID.test(id)) ok = false;
    // Riwayat hanya bila sungguh tercapai.
    for (const id of t.pernah.filter((v) => !s.pernah.includes(v))) {
      const [jenis, nn] = id.split(":");
      const idx = Number(nn);
      if (jenis === "jumlah" && !(t.jumlah.data === idx && t.jumlah.lewat.every(Boolean) && t.jumlah.hasilOk)) ok = false;
      if (jenis === "sama" && !(t.sama.data === idx && t.sama.tandaOk && t.sama.hasilOk)) ok = false;
      if (jenis === "ukur" && !(t.ukur.data === idx && t.ukur.ok.every(Boolean) && t.ukur.hasilOk)) ok = false;
    }
    if (t.sama.hasilOk && !t.sama.tandaOk) ok = false;
    if (t.pesan) pesanSemua.add(t.pesan);
    for (const id of t.pernah) riwayatSemua.add(id);
    s = t;
  }
  cek(ok, "fuzz 20.000 aksi Lab Segitiga: batas terjaga, riwayat tidak dicabut dan hanya bila tercapai");
  cek(pesanSemua.size > 40 && [...pesanSemua].every(tanpaAngka), `fuzz Lab Segitiga: semua ${pesanSemua.size} pesan dieja menjadi kata`);
  cek(riwayatSemua.size >= 8, `fuzz Lab Segitiga: riwayat terkumpul (${[...riwayatSemua].sort().join(" ")})`);
  globalThis.__pesanB = [...pesanSemua];
}

/* ------------------------------ Mesin B: kunci mandiri ------------------------------ */
{
  for (const [i, k] of MS.KASUS_SEGITIGA.entries()) {
    const c = MS.MESIN_SEGITIGA.kasus[i];
    const [jm, sm, kk, uk] = c.langkah;
    const dua = (s) => `${s[0]} cm, ${s[1]} cm, dan ${s[2]} cm`;
    cek([k.jumlah, k.kaki, k.ukur].every(segitigaSah) && segitigaSah([k.sama, k.sama, k.sama]), `Mesin ${k.id}: semua segitiga sah`);
    cek(banyakSama(k.kaki) === 1 && banyakSama(k.jumlah) === 0, `Mesin ${k.id}: sama kaki punya tepat dua sisi sama, segitiga jumlah tidak punya sisi sama`);
    cek(Math.max(...k.ukur) <= B.SKALA_UKUR, `Mesin ${k.id}: sisi ukur muat pada penggaris`);
    const Kj = jalanSisi(k.jumlah);
    cek(jm.benar === `${Kj} cm` && jm.tanya.includes(dua(k.jumlah)), `Mesin ${k.id}: jumlah ${Kj} cm`);
    cek(jm.opsi.includes(`${3 * k.jumlah[0]} cm`) && jm.opsi.includes(`${k.jumlah[0] + k.jumlah[1]} cm`) && jm.opsi.every((o) => o === jm.benar || o !== `${Kj} cm`), `Mesin ${k.id}: pengecoh jumlah (tiga kali sisi pertama, dua sisi)`);
    const Ks = jalanSisi([k.sama, k.sama, k.sama]);
    cek(Ks === 3 * k.sama && sm.benar === `${Ks} cm` && sm.tanya.includes(`${k.sama} cm`), `Mesin ${k.id}: sama sisi ${Ks} cm`);
    cek(sm.opsi.includes(`${2 * k.sama} cm`) && sm.opsi.includes(`${k.sama * k.sama} cm`) && sm.opsi.every((o) => o === sm.benar || o !== `${Ks} cm`), `Mesin ${k.id}: pengecoh sama sisi (dua kali sisi, sisi kali sisi)`);
    const Kk = jalanSisi(k.kaki);
    cek(kk.benar === `${Kk} cm` && kk.tanya.includes(dua(k.kaki)) && kk.opsi.includes(`${3 * k.kaki[0]} cm`) && 3 * k.kaki[0] !== Kk, `Mesin ${k.id}: sama kaki ${Kk} cm, pengecoh dikali tiga salah`);
    const Ku = jalanSisi(k.ukur);
    cek(uk.benar === `${Ku} cm` && uk.tanya.includes(dua(k.ukur)) && uk.opsi.includes(`${3 * k.ukur[0]} cm`) && uk.opsi.includes(`${k.ukur[0] + k.ukur[1]} cm`), `Mesin ${k.id}: ukur ${Ku} cm`);
    const ej = EJ.ejaK5B4(c.ringkas);
    cek([Kj, Ks, Kk, Ku].every((v) => ej.includes(EJ.kataK5B4(v))), `Mesin ${k.id}: ringkas dieja dengan hasil benar`);
  }
  sama(MS.KASUS_SEGITIGA.map((k) => k.id), ["buku", "enam", "tujuh"], "Mesin B: tiga kasus");
}

/* ------------------------------ Skenario B ------------------------------ */
{
  const S = SK.SKENARIO_K5B4B;
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
  sama(S.id.replace(/-k5b4$/, ""), K5.ID_SKENARIO_K5B4.B, "id skenario B sesuai id misi");
  const adegan = (id) => S.adegan.find((a) => a.id === id);
  const soal = adegan("hitung-pita").soal;
  cek(soal[0].teks.includes("5 cm, 4 cm, dan 7 cm") && soal[0].jawaban === String(jalanSisi([5, 4, 7])) && jalanSisi([5, 4, 7]) === 16, "B: pita 5, 4, 7 sama dengan 16 (dihitung)");
  cek(soal[0].opsi.includes(String(3 * 5)) && soal[0].opsi.includes(String(5 + 4)) && soal[0].opsi.filter((o) => o !== soal[0].jawaban).every((o) => Number(o) !== 16), "B: pengecoh pita 5, 4, 7 (tiga kali sisi pertama dan dua sisi) salah");
  cek(soal[1].jawaban === String(jalanSisi([5, 5, 5])) && jalanSisi([5, 5, 5]) === 15 && soal[1].opsi.includes(String(2 * 5)) && soal[1].opsi.includes(String(5 * 5)) && soal[1].opsi.filter((o) => o !== "15").every((o) => Number(o) !== 15), "B: pita sama sisi 5 sama dengan 15, pengecoh salah");
  const alasan = adegan("alasan");
  cek(alasan.cerita.includes("3 × 5") && /ketiga sisinya sama panjang/.test(alasan.opsi.find((o) => o.benar).teks) && alasan.opsi.filter((o) => !o.benar).every((o) => !/ketiga sisinya sama panjang/.test(o.teks)), "B: alasan dikali 3 adalah ketiga sisi sama panjang, pengecoh salah");
  const pita = adegan("pita-enam");
  cek(pita.jumlah === jalanSisi([6, 6, 6]) && pita.jumlah === 18 && pita.sukses.includes("3 × 6 = 18") && pita.cerita.includes("6 cm"), "B: pita sama sisi 6 sama dengan 18 stik (dihitung)");
  const siku = adegan("siku");
  cek(siku.target === jalanSisi([3, 4, 5]) && siku.target === 12 && siku.target <= siku.maks && siku.cerita.includes("3 cm, 4 cm, dan 5 cm") && siku.sukses.includes("3 + 4 + 5 = 12"), "B: segitiga 3, 4, 5 sama dengan 12 stik (dihitung)");
  const kaki = adegan("kaki");
  const kb = kaki.opsi.find((o) => o.benar);
  cek(kaki.cerita.includes("6 cm, 6 cm, dan 4 cm") && /jumlahkan ketiga sisinya/.test(kb.teks) && kaki.opsi.filter((o) => !o.benar).every((o) => !/jumlahkan ketiga sisinya/.test(o.teks)), "B: sama kaki tidak boleh dikali 3, jumlahkan; pengecoh salah");
  cek(kaki.opsi.some((o) => o.umpan.includes(String(3 * 6))) && kb.umpan.includes(String(jalanSisi([6, 6, 4]))) && jalanSisi([6, 6, 4]) === 16 && 3 * 6 !== 16, "B: umpan menyebut 18 salah dan 16 benar (dihitung)");
  const posisi = S.adegan.filter((a) => a.jenis === "pilih").map((a) => a.opsi.findIndex((o) => o.benar));
  cek(new Set(posisi).size === posisi.length, `B: letak jawaban pilih bervariasi (${posisi.join("")})`);
}

/* ------------------------------ Misi B ------------------------------ */
{
  const daftar = K5.daftarMisiK5Bab4("B");
  cek(daftar.filter((m) => m.wajib).length === 7 && daftar.filter((m) => !m.wajib).length === 3, "B: tujuh misi wajib dan tiga tantangan bebas");
  cek(new Set(daftar.map((m) => m.id)).size === 10 && daftar.every((m) => m.id.startsWith("b-")), "B: id misi unik berawalan b");
  cek(daftar.every((m) => m.teks.length > 20 && tanpaAngka(m.teks)), "B: teks misi jelas dan dapat dieja");
  const kosong = [{ alat: "segitiga", pernah: [] }, sel("tidak-ada"), B.keadaanSegitigaK5B4B(B.awalSegitigaK5B4B())];
  cek(kosong.every((k) => M0.misiBaru(daftar, k, new Set()).length === 0), "B: keadaan awal alat tidak memenuhi misi mana pun");
  const baru = (k) => M0.misiBaru(daftar, k, new Set());
  cek(baru(sel(K5.ID_MESIN_K5B4.B)).join() === "b-mesin" && baru(sel(K5.ID_SKENARIO_K5B4.B)).join() === "b-skenario", "B: id mesin dan skenario memenuhi misinya");
  cek(M0.misiBaru(daftar, { alat: "jalur", pernah: ["jumlah:0", "jumlah:1", "sama:0", "sama:1", "ukur:0"] }, new Set()).length === 0, "B: riwayat alat lain tidak memenuhi misi B");
  cek(M0.misiBaru(K5.MISI_A, { alat: "segitiga", pernah: ["jalan:0", "jalan:1", "pagar:0"] }, new Set()).length === 0, "A: riwayat Lab Segitiga tidak memenuhi misi A");

  const capai = (aksi) => M0.misiBaru(daftar, B.keadaanSegitigaK5B4B(jalan(B.awalSegitigaK5B4B(), LB, aksi)), new Set());
  const jumlahAksi = (i, hasil = B.jumlahSisi(B.DATA_JUMLAH[i]), sisi = [0, 1, 2]) => [{ t: "JM_DATA", i }, ...sisi.map((k) => ({ t: "JM_SISI", k })), { t: "JM_HASIL", nilai: hasil }];
  cek(capai(jumlahAksi(0)).join() === "b-buku" && capai(jumlahAksi(1)).join() === "b-siku" && capai(jumlahAksi(3)).join() === "b-besar", "B: jumlah segitiga 5, 4, 7 dan 3, 4, 5 memenuhi, dan tantangan 6, 8, 10");
  cek(capai(jumlahAksi(2)).length === 0, "B: jumlah segitiga sama kaki 6, 6, 4 hanya latihan, bukan misi");
  cek(capai(jumlahAksi(0, 15)).length === 0 && capai(jumlahAksi(0, 9)).length === 0, "B: keliling salah (tiga kali sisi pertama, dua sisi) tidak memenuhi");
  cek(capai(jumlahAksi(0, 16, [0, 1])).length === 0 && capai(jumlahAksi(0, 16, [])).length === 0, "B: dua sisi atau tanpa sisi diketuk tidak memenuhi");
  const samaAksi = (i, ya = B.semuaSama(B.DATA_SAMA[i]), hasil = B.jumlahSisi(B.DATA_SAMA[i])) => [{ t: "SM_DATA", i }, ...(ya === null ? [] : [{ t: "SM_JAWAB", ya }]), { t: "SM_HASIL", nilai: hasil }];
  cek(capai(samaAksi(0)).join() === "b-sama-lima" && capai(samaAksi(1)).join() === "b-sama-enam" && capai(samaAksi(2)).join() === "b-tujuh" && capai(samaAksi(3)).join() === "b-kaki", "B: sama sisi 5, 6, 7 dan sama kaki memenuhi");
  cek(capai(samaAksi(0, false)).length === 0 && capai(samaAksi(3, true)).length === 0 && capai(samaAksi(0, null)).length === 0, "B: pemeriksaan sisi sama yang salah atau dilewati tidak memenuhi");
  cek(capai(samaAksi(0, true, 10)).length === 0 && capai(samaAksi(0, true, 25)).length === 0 && capai(samaAksi(3, false, 18)).length === 0 && capai(samaAksi(3, false, 12)).length === 0, "B: keliling sama sisi atau sama kaki yang salah (dikali 3, dua sisi) tidak memenuhi");
  const ukurAksi = (i, hasil = B.jumlahSisi(B.DATA_UKUR[i]), ukur = [0, 1, 2]) => [{ t: "UK_DATA", i }, ...ukur.map((k) => ({ t: "UK_UKUR", k, nilai: B.DATA_UKUR[i][k] })), { t: "UK_HASIL", nilai: hasil }];
  cek(capai(ukurAksi(0)).join() === "b-ukur" && capai(ukurAksi(1)).length === 0, "B: ukur segitiga pertama memenuhi, kedua hanya latihan");
  cek(capai(ukurAksi(0, 24)).length === 0 && capai(ukurAksi(0, 13)).length === 0 && capai(ukurAksi(0, 18, [0, 1])).length === 0 && capai([{ t: "UK_DATA", i: 0 }, { t: "UK_HASIL", nilai: 18 }]).length === 0, "B: keliling ukur salah, atau sisi belum diukur, tidak memenuhi");
  cek(capai([{ t: "UK_DATA", i: 0 }, { t: "UK_UKUR", k: 0, nilai: 7 }, { t: "UK_UKUR", k: 1, nilai: 5 }, { t: "UK_UKUR", k: 2, nilai: 5 }, { t: "UK_HASIL", nilai: 18 }]).length === 0, "B: ukur dengan angka meleset tidak memenuhi");

  const tampil = M0.tampilMisi(daftar);
  const wajibIds = tampil.filter((m) => m.wajib).map((m) => m.id);
  cek(!M0.wajibSelesai(tampil, new Set(wajibIds.slice(0, 6))) && M0.wajibSelesai(tampil, new Set(wajibIds)), "B: gerbang terbuka hanya bila tujuh wajib");
}

/* ------------------------------ Konsep tidak bocor ke Sub-Bab B ------------------------------ */
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
  // Sub-Bab B tidak memakai konsep C (persegi dan persegi panjang), D (segi banyak), dan E (gabungan).
  const BOCOR_B = /(\bpersegi\b|\bsegi\s+(empat|lima|enam|tujuh|delapan|banyak)\b|\bberaturan\b|\bgabungan\b|\bsekat\b|\bbungkus\b|\bdenah\b|\bkurung\b|\b[24] ×)/i;
  const KURUNG = /[()]/;
  const catat = (teks, apa, kurung = true) => {
    const m = BOCOR_B.exec(teks);
    cek(!m, `B: ${apa} bebas konsep sub-bab berikutnya (${m ? m[0] : ""} di "${String(teks).slice(Math.max(0, (m?.index ?? 0) - 30), (m?.index ?? 0) + 40)}")`);
    if (kurung) cek(!KURUNG.test(teks), `B: ${apa} tanpa kurung`);
  };
  for (const t of [TK.MISI_K5B4.B, TK.NAMA_SIM_K5B4.B, ...K5.MISI_B.map((m) => m.teks)]) catat(t, "teks misi");
  catat(teksDari(MS.MESIN_SEGITIGA), "mesin");
  catat(teksDari(SK.SKENARIO_K5B4B), "skenario");
  catat(teksDari(ringkas.subBab.B), "peta dan infografis ringkas");
  catat(tanpaKomentar(baca("SimulasiLabSegitigaK5B4", "tsx")), "komponen lab (tanpa komentar)", false);
  catat(tanpaKomentar(baca("model-segitiga-k5b4", "tsx")), "model gambar (tanpa komentar)", false);
  catat(tanpaKomentar(baca("lab-segitiga-k5b4b", "ts")), "logika lab (tanpa komentar)", false);
  for (const p of globalThis.__pesanB) catat(p, "pesan lab dari fuzz");
  for (const u of [B.ucapJumlahK5B4B(y0), B.ucapSamaK5B4B(y0), B.ucapUkurK5B4B(y0)]) catat(u, "ucapan lab");

  for (const f of ["SimulasiLabSegitigaK5B4", "model-segitiga-k5b4"]) {
    const s = baca(f, "tsx");
    cek(!/correct_index|explanation/.test(s) && !/fetch\(|XMLHttpRequest|api\/|openai|anthropic|gemini/i.test(s), `${f}: tanpa kunci jawaban dan tanpa jaringan`);
  }
  {
    const s = baca("lab-segitiga-k5b4b", "ts");
    cek(!/fetch\(|XMLHttpRequest|from "react"|openai|anthropic|gemini|correct_index|explanation/i.test(s) && (s.match(/^import /gm) ?? []).length === 0, "lab-segitiga-k5b4b: murni dan tanpa impor");
  }
  {
    const s = baca("SimulasiLabSegitigaK5B4", "tsx");
    cek(/useEffect\(\(\) => \{\s*onKeadaan\?\.\(keadaan\w+\(x\)\);\s*\}, \[onKeadaan, x\]\);/.test(s), "B lab: lapor keadaan lewat useEffect");
    cek(/setLihat\(v\);\s*kirim\(\{ t: "PESAN_KOSONG" \}\);/.test(s), "B lab: ganti tampilan mengosongkan pesan");
    const catatan = [...s.matchAll(/^\s*"([^"]+)",$/gm)].map((m) => m[1]);
    cek(catatan.length >= 3 && catatan.every(tanpaAngka), "B lab: Coba ini dapat dieja");
    cek(/aria-label=\{`Sisi \$\{k \+ 1\}`\}/.test(s) && /aria-label=\{`Ukur sisi \$\{k \+ 1\}`\}/.test(s) && /aria-label=\{`Angka \$\{n\}`\}/.test(s), "B lab: tombol sisi, ukur, dan angka berlabel");
    cek(!/🟰/.test(s), "B lab: emoji tidak melebihi Emoji 12");
  }
  const pembungkus = baca("SimulasiK5Bab4", "tsx");
  const coba = [...pembungkus.matchAll(/"([^"]*\?)"/g)].map((m) => m[1]);
  cek(coba.length >= 12 && coba.every(tanpaAngka), "Coba ini mesin A sampai D dapat dieja");
  const ucapan = [];
  for (let i = 0; i < B.DATA_JUMLAH.length; i += 1) {
    const xj = LB(y0, { t: "JM_DATA", i });
    ucapan.push(B.ucapJumlahK5B4B(xj), B.ucapJumlahK5B4B(LB(xj, { t: "JM_SISI", k: 0 })));
  }
  for (let i = 0; i < B.DATA_SAMA.length; i += 1) {
    const xs = LB(y0, { t: "SM_DATA", i });
    ucapan.push(B.ucapSamaK5B4B(xs), B.ucapSamaK5B4B(LB(xs, { t: "SM_JAWAB", ya: B.semuaSama(B.DATA_SAMA[i]) })));
  }
  for (let i = 0; i < B.DATA_UKUR.length; i += 1) {
    const xu = LB(y0, { t: "UK_DATA", i });
    ucapan.push(B.ucapUkurK5B4B(xu), B.ucapUkurK5B4B(LB(xu, { t: "UK_UKUR", k: 0, nilai: B.DATA_UKUR[i][0] })));
  }
  cek(ucapan.length >= 14 && ucapan.every(tanpaAngka), `B: semua ${ucapan.length} ucapan lab dieja menjadi kata`);
  for (const u of ucapan) catat(u, "ucapan lab");

  // Data ringkas B dihitung ulang mandiri.
  const B0 = ringkas.subBab.B;
  const butir = (panel, id) => panel.butir.find((b) => b.id === id);
  const [p1, p2, p3] = B0.infografis.panel;
  const s1 = B.DATA_JUMLAH[0];
  sama(butir(p1, "sisi").visual.baris.map((r) => r[1]), s1, "ringkas B: sisi 5, 4, 7 sama dengan data lab");
  cek(butir(p1, "jumlah").visual.isi === `${s1.join(" + ")} = ${jalanSisi(s1)}` && jalanSisi(s1) === 16, "ringkas B: 5 + 4 + 7 sama dengan 16 (dihitung)");
  cek(butir(p1, "hati").visual.isi === `bukan 3 × ${s1[0]}` && 3 * s1[0] !== jalanSisi(s1), "ringkas B: tiga kali sisi pertama bukan keliling");
  cek(butir(p1, "jumlah").suara.includes(EJ.kataK5B4(16)) && butir(p1, "sisi").suara.includes(EJ.kataK5B4(7)), "ringkas B: suara menyebut hasil dan sisi");
  const [sSama, sKaki] = p2.sisi;
  cek(sSama.visual.isi === `3 × 5 = ${jalanSisi([5, 5, 5])}` && jalanSisi([5, 5, 5]) === 15, "ringkas B: sama sisi 3 × 5 sama dengan 15 (dihitung)");
  cek(sKaki.visual.isi === `${B.DATA_SAMA[3].join(" + ")} = ${jalanSisi(B.DATA_SAMA[3])}` && jalanSisi(B.DATA_SAMA[3]) === 16, "ringkas B: sama kaki 6 + 6 + 4 sama dengan 16 (dihitung)");
  cek(sSama.suara.includes(EJ.kataK5B4(15)) && sKaki.suara.includes(EJ.kataK5B4(16)), "ringkas B: suara sama sisi dan sama kaki");
  const uk = MS.KASUS_SEGITIGA[0].ukur;
  cek(butir(p3, "hasil").visual.isi === `${uk.join(" + ")} = ${jalanSisi(uk)}` && jalanSisi(uk) === 12 && butir(p3, "baca").visual.isi === `${uk[0]} cm`, "ringkas B: hasil ukur 3 + 4 + 5 sama dengan 12 (dihitung)");
  cek(butir(p3, "hasil").suara.includes(EJ.kataK5B4(12)), "ringkas B: suara hasil ukur");
  const kartu = (id) => B0.peta.kartu.find((k) => k.id === id).teks;
  cek(kartu("b-lima") === `5 + 4 + 7 = ${jalanSisi([5, 4, 7])}` && kartu("b-siku") === `3 + 4 + 5 = ${jalanSisi([3, 4, 5])}`, "ringkas B: kartu jumlah (dihitung)");
  cek(kartu("b-tiga-lima") === `3 × 5 = ${jalanSisi([5, 5, 5])}` && kartu("b-tiga-enam") === `3 × 6 = ${jalanSisi([6, 6, 6])}` && kartu("b-kaki-enam") === `6 + 6 + 4 = ${jalanSisi([6, 6, 4])}`, "ringkas B: kartu sama sisi dan sama kaki (dihitung)");
}

/* ------------------------------ Lab C: Segi Empat ------------------------------ */
const LC = SE.langkahSegiEmpatK5B4C;
const z0 = SE.awalSegiEmpatK5B4C();
const kelPP = (p, l) => jalanSisi([p, l, p, l]);
{
  cek(z0.pernah.length === 0 && z0.pesan === "" && !z0.pp.jumlahOk && !z0.pp.hasilOk && !z0.persegi.hasilOk && !z0.beda.kelOk && !z0.beda.luasOk, "C awal: kosong, belum ada riwayat");
  cek(SE.DATA_PP.length === 3 && SE.DATA_PERSEGI.length === 3 && SE.DATA_BEDA.length === 2, "C: jumlah bangun di tiap tampilan");

  // Persegi panjang.
  const letakJ = [];
  const letakK = [];
  for (const [i, b] of SE.DATA_PP.entries()) {
    const nama = `${b.p} dan ${b.l}`;
    const K = kelPP(b.p, b.l);
    const luas = petakMandiri(b.p, b.l);
    cek(K === tepiMandiri(b.p, b.l) && K === SE.kelilingPP(b) && K === SE.jumlahEmpatSisi(b) && K !== luas, `C PP ${nama}: keliling ${K} sama dengan berjalan di tepi dan sisi petak di tepi, luas ${luas} berbeda`);
    cek(luas === SE.luasPP(b), `C PP ${nama}: luas ${luas} sama dengan hitungan petak`);
    const oJ = SE.opsiJumlahPP(i);
    cek(oJ.length === 3 && new Set(oJ).size === 3 && oJ.filter((v) => v === b.p + b.l).length === 1 && oJ.every((v) => v > 0), `C PP ${nama}: tiga pilihan jumlah unik, satu benar (${b.p + b.l})`);
    cek(oJ.includes(luas) && oJ.includes(2 * b.p), `C PP ${nama}: pengecoh jumlah luas dan dua panjang`);
    const oK = SE.opsiKaliPP(i);
    cek(oK.length === 3 && new Set(oK).size === 3 && oK.filter((v) => v === K).length === 1 && oK.every((v) => v > 0), `C PP ${nama}: tiga pilihan keliling unik, satu benar (${K})`);
    cek(oK.includes(b.p + b.l) && oK.includes(2 * b.p + b.l) && 2 * b.p + b.l !== K && b.p + b.l !== K, `C PP ${nama}: pengecoh belum dikali 2 dan kurung hilang, keduanya salah`);
    letakJ.push(oJ.indexOf(b.p + b.l));
    letakK.push(oK.indexOf(K));
    const xp = LC(z0, { t: "PP_DATA", i });
    // Kali sebelum jumlah ditolak.
    for (const v of oK) cek(LC(xp, { t: "PP_KALI", nilai: v }).pernah.length === 0 && /Jumlahkan dulu/.test(LC(xp, { t: "PP_KALI", nilai: v }).pesan), `C PP ${nama}: keliling ${v} sebelum jumlah ditolak`);
    for (const v of oJ.filter((o) => o !== b.p + b.l)) {
      const s = LC(xp, { t: "PP_JUMLAH", nilai: v });
      cek(!s.pp.jumlahOk && !s.pesan.startsWith("✅") && /yaitu luas/.test(s.pesan) === (v === luas) && /dua panjang/.test(s.pesan) === (v === 2 * b.p && v !== luas), `C PP ${nama}: jumlah ${v} ditolak dan dijelaskan tepat`);
      cek(/Jumlahkan dulu/.test(LC(s, { t: "PP_KALI", nilai: K }).pesan) && LC(s, { t: "PP_KALI", nilai: K }).pernah.length === 0, `C PP ${nama}: keliling setelah jumlah salah tidak dicatat`);
    }
    const sJ = LC(xp, { t: "PP_JUMLAH", nilai: b.p + b.l });
    cek(sJ.pp.jumlahOk && sJ.pesan.startsWith("✅") && sJ.pesan.includes(`${b.p} + ${b.l} = ${b.p + b.l}`), `C PP ${nama}: jumlah ${b.p + b.l} diterima`);
    for (const v of oK.filter((o) => o !== K)) {
      const s = LC(sJ, { t: "PP_KALI", nilai: v });
      cek(!s.pp.hasilOk && s.pernah.length === 0 && !s.pesan.startsWith("✅"), `C PP ${nama}: keliling ${v} ditolak`);
      cek(/baru panjang ditambah lebar/.test(s.pesan) === (v === b.p + b.l) && /Kurungnya hilang/.test(s.pesan) === (v === 2 * b.p + b.l && v !== b.p + b.l), `C PP ${nama}: keliling ${v} dijelaskan tepat`);
    }
    const sK = LC(sJ, { t: "PP_KALI", nilai: K });
    cek(sK.pp.hasilOk && sK.pernah.includes(`pp:${i}`) && sK.pesan.startsWith("✅") && sK.pesan.includes(`2 × (${b.p} + ${b.l}) = 2 × ${b.p + b.l} = ${K} cm`) && sK.pesan.includes(`${b.p} + ${b.l} + ${b.p} + ${b.l} = ${K} cm`), `C PP ${nama}: keliling ${K} tercatat dan dicek dengan empat sisi`);
    cek(!LC(sK, { t: "PP_JUMLAH", nilai: luas }).pp.hasilOk && LC(sK, { t: "PP_JUMLAH", nilai: luas }).pernah.includes(`pp:${i}`), `C PP ${nama}: jumlah salah setelah selesai mengosongkan tanda, riwayat tetap`);
    cek(LC(xp, { t: "PP_JUMLAH", nilai: 999 }) === xp && LC(sJ, { t: "PP_KALI", nilai: 999 }) === sJ, `C PP ${nama}: nilai di luar pilihan diabaikan`);
    cek(!LC(sK, { t: "PP_DATA", i: (i + 1) % 3 }).pp.jumlahOk && LC(sK, { t: "PP_DATA", i: (i + 1) % 3 }).pernah.includes(`pp:${i}`), `C PP ${nama}: ganti bangun mengosongkan, riwayat tetap`);
  }
  cek(new Set(letakJ).size >= 2 && new Set(letakK).size >= 2, `C PP: letak jawaban benar bervariasi (${letakJ.join("")} / ${letakK.join("")})`);
  cek(LC(z0, { t: "PP_DATA", i: 3 }) === z0 && LC(z0, { t: "PP_DATA", i: -1 }) === z0, "C PP: bangun di luar batas diabaikan");

  // Persegi.
  const letakP = [];
  for (const [i, s] of SE.DATA_PERSEGI.entries()) {
    const nama = `sisi ${s}`;
    const K = jalanSisi([s, s, s, s]);
    const luas = petakMandiri(s, s);
    cek(K === 4 * s && K === tepiMandiri(s, s) && K === SE.kelilingPersegi(s) && K !== luas && luas === s * s, `C Persegi ${nama}: keliling ${K} sama dengan berjalan dan sisi petak di tepi, luas ${luas} berbeda`);
    const o = SE.opsiPersegi(i);
    cek(o.length === 3 && new Set(o).size === 3 && o.filter((v) => v === K).length === 1 && o.every((v) => v > 0), `C Persegi ${nama}: tiga pilihan unik, satu benar (${K})`);
    cek(o.includes(luas) && o.includes(2 * s), `C Persegi ${nama}: pengecoh sisi kali sisi dan dua sisi`);
    letakP.push(o.indexOf(K));
    const xs = LC(z0, { t: "PS_DATA", i });
    for (const v of o.filter((n) => n !== K)) {
      const t = LC(xs, { t: "PS_HASIL", nilai: v });
      cek(!t.persegi.hasilOk && t.pernah.length === 0 && !t.pesan.startsWith("✅") && /yaitu luas/.test(t.pesan) === (v === luas) && /dua sisi/.test(t.pesan) === (v === 2 * s), `C Persegi ${nama}: keliling ${v} ditolak dan dijelaskan tepat`);
    }
    const ok = LC(xs, { t: "PS_HASIL", nilai: K });
    cek(ok.persegi.hasilOk && ok.pernah.includes(`persegi:${i}`) && ok.pesan.startsWith("✅") && ok.pesan.includes(`${s} + ${s} + ${s} + ${s} = ${K} cm`) && ok.pesan.includes(`4 × ${s} = ${K} cm`), `C Persegi ${nama}: keliling ${K} tercatat`);
    cek(LC(xs, { t: "PS_HASIL", nilai: 999 }) === xs && !LC(ok, { t: "PS_DATA", i: (i + 1) % 3 }).persegi.hasilOk && LC(ok, { t: "PS_DATA", i: (i + 1) % 3 }).pernah.includes(`persegi:${i}`), `C Persegi ${nama}: nilai di luar pilihan diabaikan, ganti persegi mengosongkan`);
  }
  cek(new Set(letakP).size >= 2, `C Persegi: letak jawaban benar bervariasi (${letakP.join("")})`);
  cek(LC(z0, { t: "PS_DATA", i: 3 }) === z0, "C Persegi: persegi di luar batas diabaikan");

  // Beda.
  const letakB = [];
  for (const [i, b] of SE.DATA_BEDA.entries()) {
    const nama = `${b.p} dan ${b.l}`;
    const K = kelPP(b.p, b.l);
    const luas = petakMandiri(b.p, b.l);
    cek(K === tepiMandiri(b.p, b.l) && K !== luas, `C Beda ${nama}: keliling ${K} dan luas ${luas} berbeda (dihitung)`);
    const oK = SE.opsiBedaKeliling(i);
    const oL = SE.opsiBedaLuas(i);
    cek(oK.length === 3 && new Set(oK).size === 3 && oK.filter((v) => v === K).length === 1 && oK.includes(luas), `C Beda ${nama}: pilihan keliling unik, satu benar, luas sebagai pengecoh`);
    cek(oL.length === 3 && new Set(oL).size === 3 && oL.filter((v) => v === luas).length === 1 && oL.includes(K), `C Beda ${nama}: pilihan luas unik, satu benar, keliling sebagai pengecoh`);
    letakB.push(oK.indexOf(K), oL.indexOf(luas));
    const xb = LC(z0, { t: "BD_DATA", i });
    for (const v of oK.filter((n) => n !== K)) {
      const t = LC(xb, { t: "BD_KELILING", nilai: v });
      cek(!t.beda.kelOk && t.pernah.length === 0 && !t.pesan.startsWith("✅") && /yaitu luas/.test(t.pesan) === (v === luas) && /baru panjang ditambah lebar/.test(t.pesan) === (v === b.p + b.l && v !== luas), `C Beda ${nama}: keliling ${v} ditolak dan dijelaskan tepat`);
    }
    for (const v of oL.filter((n) => n !== luas)) {
      const t = LC(xb, { t: "BD_LUAS", nilai: v });
      cek(!t.beda.luasOk && t.pernah.length === 0 && !t.pesan.startsWith("✅") && /adalah keliling/.test(t.pesan) === (v === K), `C Beda ${nama}: luas ${v} ditolak dan dijelaskan tepat`);
    }
    // Dua urutan: keliling dulu, atau luas dulu. Tercatat hanya setelah keduanya.
    const kel = LC(xb, { t: "BD_KELILING", nilai: K });
    const lu = LC(xb, { t: "BD_LUAS", nilai: luas });
    cek(kel.beda.kelOk && kel.pernah.length === 0 && kel.pesan.startsWith("✅") && kel.pesan.includes(`2 × (${b.p} + ${b.l}) = ${K} cm`) && !/dua hal berbeda/.test(kel.pesan), `C Beda ${nama}: keliling saja belum tercatat`);
    cek(lu.beda.luasOk && lu.pernah.length === 0 && lu.pesan.startsWith("✅") && lu.pesan.includes(`${b.p} × ${b.l} = ${luas} petak`) && !/dua hal berbeda/.test(lu.pesan), `C Beda ${nama}: luas saja belum tercatat`);
    for (const dua of [LC(kel, { t: "BD_LUAS", nilai: luas }), LC(lu, { t: "BD_KELILING", nilai: K })]) {
      cek(dua.pernah.includes(`beda:${i}`) && dua.pesan.includes(`Keliling ${K} cm dan luas ${luas} petak adalah dua hal berbeda`), `C Beda ${nama}: keduanya dihitung tercatat dengan kesimpulan`);
    }
    cek(LC(xb, { t: "BD_KELILING", nilai: 999 }) === xb && LC(xb, { t: "BD_LUAS", nilai: 999 }) === xb, `C Beda ${nama}: nilai di luar pilihan diabaikan`);
    cek(!LC(kel, { t: "BD_DATA", i: (i + 1) % 2 }).beda.kelOk, `C Beda ${nama}: ganti bangun mengosongkan`);
  }
  cek(new Set(letakB).size >= 2, `C Beda: letak jawaban benar bervariasi (${letakB.join("")})`);
  cek(LC(z0, { t: "BD_DATA", i: 2 }) === z0, "C Beda: bangun di luar batas diabaikan");

  // Fuzz.
  const acak = acakDari(91);
  let s = z0;
  let ok = true;
  const pesanSemua = new Set();
  const riwayatSemua = new Set();
  const ID = /^(pp:[0-2]|persegi:[0-2]|beda:[0-1])$/;
  for (let n = 0; n < 20000; n += 1) {
    const p = acak(22);
    const pp = SE.dataPP(s);
    const ps = SE.dataPersegi(s);
    const bd = SE.dataBeda(s);
    const a =
      p === 0 ? { t: "PP_DATA", i: acak(4) } :
      p === 1 ? { t: "PP_JUMLAH", nilai: acak(5) === 0 ? 99 : SE.opsiJumlahPP(s.pp.data)[acak(3)] } :
      p === 2 || p === 3 ? { t: "PP_JUMLAH", nilai: pp.p + pp.l } :
      p === 4 ? { t: "PP_KALI", nilai: acak(5) === 0 ? 99 : SE.opsiKaliPP(s.pp.data)[acak(3)] } :
      p === 5 || p === 6 ? { t: "PP_KALI", nilai: SE.kelilingPP(pp) } :
      p === 7 ? { t: "PS_DATA", i: acak(4) } :
      p === 8 ? { t: "PS_HASIL", nilai: acak(5) === 0 ? 99 : SE.opsiPersegi(s.persegi.data)[acak(3)] } :
      p === 9 ? { t: "PS_HASIL", nilai: SE.kelilingPersegi(ps) } :
      p === 10 ? { t: "BD_DATA", i: acak(3) } :
      p === 11 ? { t: "BD_KELILING", nilai: acak(5) === 0 ? 99 : SE.opsiBedaKeliling(s.beda.data)[acak(3)] } :
      p === 12 || p === 13 ? { t: "BD_KELILING", nilai: SE.kelilingPP(bd) } :
      p === 14 ? { t: "BD_LUAS", nilai: acak(5) === 0 ? 99 : SE.opsiBedaLuas(s.beda.data)[acak(3)] } :
      p === 15 || p === 16 ? { t: "BD_LUAS", nilai: SE.luasPP(bd) } :
      p === 17 ? { t: "PESAN_KOSONG" } :
      acak(30) === 0 ? { t: "RESET" } : { t: "PP_KALI", nilai: SE.kelilingPP(pp) };
    const t = LC(s, a);
    if (a.t !== "RESET" && !s.pernah.every((v) => t.pernah.includes(v))) ok = false;
    if (!(t.pp.data >= 0 && t.pp.data < 3 && t.persegi.data >= 0 && t.persegi.data < 3 && t.beda.data >= 0 && t.beda.data < 2)) ok = false;
    if (t.pp.hasilOk && !t.pp.jumlahOk) ok = false;
    for (const id of t.pernah) if (!ID.test(id)) ok = false;
    for (const id of t.pernah.filter((v) => !s.pernah.includes(v))) {
      const [jenis, nn] = id.split(":");
      const idx = Number(nn);
      if (jenis === "pp" && !(t.pp.data === idx && t.pp.jumlahOk && t.pp.hasilOk)) ok = false;
      if (jenis === "persegi" && !(t.persegi.data === idx && t.persegi.hasilOk)) ok = false;
      if (jenis === "beda" && !(t.beda.data === idx && t.beda.kelOk && t.beda.luasOk)) ok = false;
    }
    if (t.pesan) pesanSemua.add(t.pesan);
    for (const id of t.pernah) riwayatSemua.add(id);
    s = t;
  }
  cek(ok, "fuzz 20.000 aksi Lab Segi Empat: batas terjaga, riwayat tidak dicabut dan hanya bila tercapai");
  cek(pesanSemua.size > 30 && [...pesanSemua].every(tanpaAngka), `fuzz Lab Segi Empat: semua ${pesanSemua.size} pesan dieja menjadi kata`);
  cek(riwayatSemua.size >= 6, `fuzz Lab Segi Empat: riwayat terkumpul (${[...riwayatSemua].sort().join(" ")})`);
  globalThis.__pesanC = [...pesanSemua];
}

/* ------------------------------ Mesin C: kunci mandiri ------------------------------ */
{
  for (const [i, k] of MS.KASUS_SEGIEMPAT.entries()) {
    const c = MS.MESIN_SEGIEMPAT.kasus[i];
    const [pp, ps, rm, bd] = c.langkah;
    const Kpp = kelPP(k.pp.p, k.pp.l);
    cek(pp.benar === `${Kpp} cm` && pp.tanya.includes(`${k.pp.p} cm dan ${k.pp.l} cm`) && MS.kelilingSegiEmpat(k.pp.p, k.pp.l) === Kpp && Kpp === tepiMandiri(k.pp.p, k.pp.l), `Mesin ${k.id}: persegi panjang ${Kpp} cm`);
    cek(pp.opsi.includes(`${k.pp.p + k.pp.l} cm`) && pp.opsi.includes(`${petakMandiri(k.pp.p, k.pp.l)} cm`) && pp.opsi.every((o) => o === pp.benar || o !== `${Kpp} cm`), `Mesin ${k.id}: pengecoh persegi panjang (belum dikali 2, luas)`);
    const Ks = jalanSisi([k.s, k.s, k.s, k.s]);
    cek(ps.benar === `${Ks} cm` && ps.tanya.includes(`${k.s} cm`) && Ks === tepiMandiri(k.s, k.s), `Mesin ${k.id}: persegi ${Ks} cm`);
    cek(ps.opsi.includes(`${petakMandiri(k.s, k.s)} cm`) && ps.opsi.includes(`${2 * k.s} cm`) && petakMandiri(k.s, k.s) !== Ks, `Mesin ${k.id}: pengecoh persegi (sisi kali sisi, dua sisi)`);
    const { p: rp, l: rl } = k.rumus;
    const nilai = { [`2 × (${rp} + ${rl})`]: 2 * (rp + rl), [`${rp} × ${rl}`]: petakMandiri(rp, rl), [`2 × ${rp} + ${rl}`]: 2 * rp + rl };
    cek(rm.benar === `2 × (${rp} + ${rl})` && nilai[rm.benar] === kelPP(rp, rl) && rm.opsi.every((o) => o in nilai) && rm.opsi.filter((o) => nilai[o] === kelPP(rp, rl)).length === 1, `Mesin ${k.id}: ungkapan benar menghasilkan keliling, pengecoh tidak`);
    const Kb = kelPP(k.beda.p, k.beda.l);
    const Lb = petakMandiri(k.beda.p, k.beda.l);
    cek(Kb !== Lb && bd.benar === `keliling ${Kb} cm, luas ${Lb} petak` && bd.tanya.includes(`${k.beda.p} cm dan ${k.beda.l} cm`), `Mesin ${k.id}: beda keliling ${Kb} dan luas ${Lb}`);
    cek(bd.opsi.includes(`keliling ${Lb} cm, luas ${Kb} petak`) && bd.opsi.includes(`keliling ${Kb} cm, luas ${Kb} petak`), `Mesin ${k.id}: pengecoh beda (tertukar, luas disamakan dengan keliling)`);
    const ej = EJ.ejaK5B4(c.ringkas);
    cek([Kpp, Ks, Kb, Lb].every((v) => ej.includes(EJ.kataK5B4(v))), `Mesin ${k.id}: ringkas dieja dengan hasil benar`);
  }
  sama(MS.KASUS_SEGIEMPAT.map((k) => k.id), ["buku", "kebun", "lapangan"], "Mesin C: tiga kasus");
}

/* ------------------------------ Skenario C ------------------------------ */
{
  const S = SK.SKENARIO_K5B4C;
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
  sama(S.id.replace(/-k5b4$/, ""), K5.ID_SKENARIO_K5B4.C, "id skenario C sesuai id misi");
  const adegan = (id) => S.adegan.find((a) => a.id === id);
  const soal = adegan("hitung-keliling").soal;
  cek(soal[0].teks.includes("5 m dan lebarnya 3 m") && soal[0].jawaban === String(kelPP(5, 3)) && kelPP(5, 3) === 16, "C: kebun 5 m dan 3 m berkeliling 16 (dihitung)");
  cek(soal[0].opsi.includes(String(5 + 3)) && soal[0].opsi.includes(String(petakMandiri(5, 3))) && soal[0].opsi.filter((o) => o !== "16").every((o) => Number(o) !== 16), "C: pengecoh kebun (jumlah panjang dan lebar 8, luas 15) salah");
  cek(soal[1].teks.includes("sisinya 3 m") && soal[1].jawaban === String(jalanSisi([3, 3, 3, 3])) && soal[1].jawaban === "12" && soal[1].opsi.includes(String(petakMandiri(3, 3))) && soal[1].opsi.filter((o) => o !== "12").every((o) => Number(o) !== 12), "C: taman persegi sisi 3 m berkeliling 12, pengecoh luas 9");
  const alasan = adegan("alasan");
  cek(alasan.cerita.includes("2 × (5 + 3)") && /dua panjang dan dua lebar/.test(alasan.opsi.find((o) => o.benar).teks) && alasan.opsi.filter((o) => !o.benar).every((o) => !/dua panjang dan dua lebar/.test(o.teks)), "C: alasan dikali 2 adalah dua panjang dan dua lebar, pengecoh salah");
  const ruas = adegan("ruas");
  cek(ruas.jumlah === kelPP(7, 2) && ruas.jumlah === tepiMandiri(7, 2) && ruas.jumlah === 18 && ruas.cerita.includes("7 m dan 2 m") && ruas.sukses.includes("2 × (7 + 2) = 18"), "C: pagar 7 m dan 2 m sama dengan 18 stik (dihitung)");
  const bingkai = adegan("bingkai");
  cek(bingkai.target === jalanSisi([5, 5, 5, 5]) && bingkai.target === 20 && bingkai.target <= bingkai.maks && bingkai.cerita.includes("5 dm") && bingkai.sukses.includes("4 × 5 = 20"), "C: bingkai persegi 5 dm sama dengan 20 stik (dihitung)");
  const luas = adegan("luas");
  const lb = luas.opsi.find((o) => o.benar);
  cek(luas.cerita.includes("8 × 4 = 32") && petakMandiri(8, 4) === 32 && kelPP(8, 4) === 24 && /itu luas/.test(lb.teks) && lb.teks.includes("24 m") && luas.opsi.filter((o) => !o.benar).every((o) => !/itu luas/.test(o.teks)), "C: 32 adalah luas dan keliling 24 (dihitung), pengecoh salah");
  cek(luas.opsi.some((o) => o.teks.includes("12 m")) && 8 + 4 === 12 && 12 !== 24, "C: pengecoh 12 adalah jumlah panjang dan lebar, salah");
  const posisi = S.adegan.filter((a) => a.jenis === "pilih").map((a) => a.opsi.findIndex((o) => o.benar));
  cek(new Set(posisi).size === posisi.length, `C: letak jawaban pilih bervariasi (${posisi.join("")})`);
}

/* ------------------------------ Misi C ------------------------------ */
{
  const daftar = K5.daftarMisiK5Bab4("C");
  cek(daftar.filter((m) => m.wajib).length === 7 && daftar.filter((m) => !m.wajib).length === 3, "C: tujuh misi wajib dan tiga tantangan bebas");
  cek(new Set(daftar.map((m) => m.id)).size === 10 && daftar.every((m) => m.id.startsWith("c-")), "C: id misi unik berawalan c");
  cek(daftar.every((m) => m.teks.length > 20 && tanpaAngka(m.teks)), "C: teks misi jelas dan dapat dieja");
  const kosong = [{ alat: "segiempat", pernah: [] }, sel("tidak-ada"), SE.keadaanSegiEmpatK5B4C(SE.awalSegiEmpatK5B4C())];
  cek(kosong.every((k) => M0.misiBaru(daftar, k, new Set()).length === 0), "C: keadaan awal alat tidak memenuhi misi mana pun");
  const baru = (k) => M0.misiBaru(daftar, k, new Set());
  cek(baru(sel(K5.ID_MESIN_K5B4.C)).join() === "c-mesin" && baru(sel(K5.ID_SKENARIO_K5B4.C)).join() === "c-skenario", "C: id mesin dan skenario memenuhi misinya");
  cek(M0.misiBaru(daftar, { alat: "segitiga", pernah: ["pp:0", "pp:1", "persegi:0", "persegi:1", "beda:0"] }, new Set()).length === 0, "C: riwayat alat lain tidak memenuhi misi C");

  const capai = (aksi) => M0.misiBaru(daftar, SE.keadaanSegiEmpatK5B4C(jalan(SE.awalSegiEmpatK5B4C(), LC, aksi)), new Set());
  const ppAksi = (i, jumlah = SE.DATA_PP[i].p + SE.DATA_PP[i].l, kali = kelPP(SE.DATA_PP[i].p, SE.DATA_PP[i].l)) => [{ t: "PP_DATA", i }, { t: "PP_JUMLAH", nilai: jumlah }, { t: "PP_KALI", nilai: kali }];
  cek(capai(ppAksi(0)).join() === "c-pp-lima" && capai(ppAksi(1)).join() === "c-pp-empat" && capai(ppAksi(2)).join() === "c-pp-tujuh", "C: persegi panjang 5 dan 3, 4 dan 2, dan tantangan 7 dan 2 memenuhi");
  cek(capai(ppAksi(0, 15)).length === 0 && capai(ppAksi(0, 8, 8)).length === 0 && capai(ppAksi(0, 8, 13)).length === 0 && capai(ppAksi(0, 8, 15)).length === 0, "C: jumlah salah (luas), keliling belum dikali 2, kurung hilang, atau luas tidak memenuhi");
  cek(capai(ppAksi(0).slice(0, 2)).length === 0 && capai([{ t: "PP_DATA", i: 0 }, { t: "PP_KALI", nilai: 16 }]).length === 0, "C: hanya jumlah, atau dikali 2 tanpa jumlah, tidak memenuhi");
  const psAksi = (i, nilai = 4 * SE.DATA_PERSEGI[i]) => [{ t: "PS_DATA", i }, { t: "PS_HASIL", nilai }];
  cek(capai(psAksi(0)).join() === "c-persegi-tiga" && capai(psAksi(1)).join() === "c-persegi-lima" && capai(psAksi(2)).join() === "c-persegi-enam", "C: persegi sisi 3, 5, dan tantangan 6 memenuhi");
  cek(capai(psAksi(0, 9)).length === 0 && capai(psAksi(0, 6)).length === 0 && capai(psAksi(1, 25)).length === 0, "C: persegi dengan sisi kali sisi atau dua sisi tidak memenuhi");
  const bdAksi = (i, ...a) => [{ t: "BD_DATA", i }, ...a];
  const KEL = (i) => ({ t: "BD_KELILING", nilai: kelPP(SE.DATA_BEDA[i].p, SE.DATA_BEDA[i].l) });
  const LUAS = (i) => ({ t: "BD_LUAS", nilai: petakMandiri(SE.DATA_BEDA[i].p, SE.DATA_BEDA[i].l) });
  cek(capai(bdAksi(0, KEL(0), LUAS(0))).join() === "c-beda" && capai(bdAksi(0, LUAS(0), KEL(0))).join() === "c-beda" && capai(bdAksi(1, KEL(1), LUAS(1))).join() === "c-kecil", "C: keliling dan luas bangun 8 dan 4 (urutan bebas), dan tantangan persegi 2, memenuhi");
  cek(capai(bdAksi(0, KEL(0))).length === 0 && capai(bdAksi(0, LUAS(0))).length === 0 && capai(bdAksi(0, { t: "BD_KELILING", nilai: 32 }, LUAS(0))).length === 0 && capai(bdAksi(0, KEL(0), { t: "BD_LUAS", nilai: 24 })).length === 0, "C: hanya keliling, hanya luas, atau keliling dan luas tertukar tidak memenuhi");

  const tampil = M0.tampilMisi(daftar);
  const wajibIds = tampil.filter((m) => m.wajib).map((m) => m.id);
  cek(!M0.wajibSelesai(tampil, new Set(wajibIds.slice(0, 6))) && M0.wajibSelesai(tampil, new Set(wajibIds)), "C: gerbang terbuka hanya bila tujuh wajib");
}

/* ------------------------------ Konsep tidak bocor ke Sub-Bab C ------------------------------ */
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
  // Sub-Bab C tidak memakai konsep D (segi banyak, beraturan) dan E (gabungan, sekat, bungkus, denah, sisi hilang).
  const BOCOR_C = /(\bsegi\s+(lima|enam|tujuh|delapan|banyak)\b|\bberaturan\b|\bgabungan\b|\bsekat\b|\bbungkus\b|\bdenah\b|\bsisi hilang\b|\bn ×)/i;
  const catat = (teks, apa) => {
    const m = BOCOR_C.exec(teks);
    cek(!m, `C: ${apa} bebas konsep sub-bab berikutnya (${m ? m[0] : ""} di "${String(teks).slice(Math.max(0, (m?.index ?? 0) - 30), (m?.index ?? 0) + 40)}")`);
  };
  for (const t of [TK.MISI_K5B4.C, TK.NAMA_SIM_K5B4.C, ...K5.MISI_C.map((m) => m.teks)]) catat(t, "teks misi");
  catat(teksDari(MS.MESIN_SEGIEMPAT), "mesin");
  catat(teksDari(SK.SKENARIO_K5B4C), "skenario");
  catat(teksDari(ringkas.subBab.C), "peta dan infografis ringkas");
  catat(tanpaKomentar(baca("SimulasiLabSegiEmpatK5B4", "tsx")), "komponen lab (tanpa komentar)");
  catat(tanpaKomentar(baca("model-segiempat-k5b4", "tsx")), "model gambar (tanpa komentar)");
  catat(tanpaKomentar(baca("lab-segiempat-k5b4c", "ts")), "logika lab (tanpa komentar)");
  for (const p of globalThis.__pesanC) catat(p, "pesan lab dari fuzz");
  for (const u of [SE.ucapPPK5B4C(z0), SE.ucapPersegiK5B4C(z0), SE.ucapBedaK5B4C(z0)]) catat(u, "ucapan lab");

  for (const f of ["SimulasiLabSegiEmpatK5B4", "model-segiempat-k5b4"]) {
    const s = baca(f, "tsx");
    cek(!/correct_index|explanation/.test(s) && !/fetch\(|XMLHttpRequest|api\/|openai|anthropic|gemini/i.test(s), `${f}: tanpa kunci jawaban dan tanpa jaringan`);
  }
  {
    const s = baca("lab-segiempat-k5b4c", "ts");
    cek(!/fetch\(|XMLHttpRequest|from "react"|openai|anthropic|gemini|correct_index|explanation/i.test(s) && (s.match(/^import /gm) ?? []).length === 0, "lab-segiempat-k5b4c: murni dan tanpa impor");
  }
  {
    const s = baca("SimulasiLabSegiEmpatK5B4", "tsx");
    cek(/useEffect\(\(\) => \{\s*onKeadaan\?\.\(keadaan\w+\(x\)\);\s*\}, \[onKeadaan, x\]\);/.test(s), "C lab: lapor keadaan lewat useEffect");
    cek(/setLihat\(v\);\s*kirim\(\{ t: "PESAN_KOSONG" \}\);/.test(s), "C lab: ganti tampilan mengosongkan pesan");
    const catatan = [...s.matchAll(/^\s*"([^"]+)",$/gm)].map((m) => m[1]);
    cek(catatan.length >= 3 && catatan.every(tanpaAngka), "C lab: Coba ini dapat dieja");
    cek(/aria-label=\{`Jumlah \$\{n\}`\}/.test(s) && /aria-label=\{`Kali dua \$\{n\}`\}/.test(s) && /aria-label=\{`Keliling persegi \$\{n\}`\}/.test(s) && /aria-label=\{`Luas beda \$\{n\}`\}/.test(s), "C lab: tombol jawaban berlabel");
  }
  const ucapan = [];
  for (let i = 0; i < SE.DATA_PP.length; i += 1) {
    const xp = LC(z0, { t: "PP_DATA", i });
    ucapan.push(SE.ucapPPK5B4C(xp), SE.ucapPPK5B4C(LC(xp, { t: "PP_JUMLAH", nilai: SE.DATA_PP[i].p + SE.DATA_PP[i].l })));
  }
  for (let i = 0; i < SE.DATA_PERSEGI.length; i += 1) ucapan.push(SE.ucapPersegiK5B4C(LC(z0, { t: "PS_DATA", i })));
  for (let i = 0; i < SE.DATA_BEDA.length; i += 1) {
    const xb = LC(z0, { t: "BD_DATA", i });
    ucapan.push(SE.ucapBedaK5B4C(xb), SE.ucapBedaK5B4C(jalan(xb, LC, [{ t: "BD_KELILING", nilai: kelPP(SE.DATA_BEDA[i].p, SE.DATA_BEDA[i].l) }, { t: "BD_LUAS", nilai: petakMandiri(SE.DATA_BEDA[i].p, SE.DATA_BEDA[i].l) }])));
  }
  cek(ucapan.length >= 12 && ucapan.every(tanpaAngka), `C: semua ${ucapan.length} ucapan lab dieja menjadi kata`);
  for (const u of ucapan) catat(u, "ucapan lab");

  // Data ringkas C dihitung ulang mandiri.
  const C0 = ringkas.subBab.C;
  const butir = (panel, id) => panel.butir.find((b) => b.id === id);
  const [p1, p2, p3] = C0.infografis.panel;
  const pp0 = SE.DATA_PP[0];
  sama(butir(p1, "sisi").visual.baris.map((r) => r[1]), [pp0.p, pp0.l, pp0.p, pp0.l], "ringkas C: sisi 5, 3, 5, 3 sama dengan data lab");
  sama(butir(p1, "sisi").visual.baris.map((r) => r[0]), ["panjang", "lebar", "panjang", "lebar"], "ringkas C: nama sisi berselang");
  cek(butir(p1, "jumlah").visual.isi === `${pp0.p} + ${pp0.l} = ${jalanSisi([pp0.p, pp0.l])}` && butir(p1, "kali").visual.isi === `2 × ${jalanSisi([pp0.p, pp0.l])} = ${kelPP(pp0.p, pp0.l)}`, "ringkas C: jumlah 8 dan dikali 2 sama dengan 16 (dihitung)");
  cek(butir(p1, "jumlah").suara.includes(EJ.kataK5B4(8)) && butir(p1, "kali").suara.includes(EJ.kataK5B4(16)), "ringkas C: suara jumlah dan keliling");
  const [sPersegi, sPP] = p2.sisi;
  cek(sPersegi.visual.isi === `4 × 3 = ${jalanSisi([3, 3, 3, 3])}` && jalanSisi([3, 3, 3, 3]) === 12, "ringkas C: persegi 4 × 3 sama dengan 12 (dihitung)");
  cek(sPP.visual.isi === `2 × (5 + 3) = ${kelPP(5, 3)}` && kelPP(5, 3) === 16, "ringkas C: persegi panjang 2 × (5 + 3) sama dengan 16 (dihitung)");
  cek(sPersegi.suara.includes(EJ.kataK5B4(12)) && sPP.suara.includes(EJ.kataK5B4(16)), "ringkas C: suara persegi dan persegi panjang");
  cek(butir(p3, "luas").visual.isi === `8 × 4 = ${petakMandiri(8, 4)}` && butir(p3, "keliling").visual.isi === `2 × (8 + 4) = ${kelPP(8, 4)}` && butir(p3, "beda").visual.isi === `${kelPP(8, 4)} dan ${petakMandiri(8, 4)}`, "ringkas C: luas 32, keliling 24, dan bedanya (dihitung)");
  cek(butir(p3, "luas").suara.includes(EJ.kataK5B4(32)) && butir(p3, "keliling").suara.includes(EJ.kataK5B4(24)), "ringkas C: suara luas dan keliling");
  const kartu = (id) => C0.peta.kartu.find((k) => k.id === id).teks;
  cek(kartu("c-pp-lima") === `2 × (5 + 3) = ${kelPP(5, 3)}` && kartu("c-pp-empat") === `2 × (4 + 2) = ${kelPP(4, 2)}`, "ringkas C: kartu persegi panjang (dihitung)");
  cek(kartu("c-persegi-tiga") === `4 × 3 = ${jalanSisi([3, 3, 3, 3])}` && kartu("c-persegi-lima") === `4 × 5 = ${jalanSisi([5, 5, 5, 5])}`, "ringkas C: kartu persegi (dihitung)");
  cek(kartu("c-empat-sisi") === `5 + 3 + 5 + 3 = ${kelPP(5, 3)}` && kartu("c-luas") === `8 × 4 = ${petakMandiri(8, 4)} petak` && kartu("c-bukan") === `Keliling ${kelPP(8, 4)}, bukan ${petakMandiri(8, 4)}`, "ringkas C: kartu sisi berhadapan dan luas (dihitung)");
}

/* ------------------------------ Lab D: Segi Banyak ------------------------------ */
const LD = SB.langkahSegiBanyakK5B4D;
const w0 = SB.awalSegiBanyakK5B4D();
const samaSisi = (n, s) => Array.from({ length: n }, () => s);
{
  cek(w0.pernah.length === 0 && w0.pesan === "" && !w0.ber.sisiOk && !w0.ber.hasilOk && w0.beda.lewat.every((v) => !v) && w0.tabel.ok.every((v) => !v), "D awal: kosong, belum ada riwayat");
  cek(SB.DATA_BERATURAN.length === 5 && SB.DATA_BEDA.length === 2 && SB.DATA_TABEL.length === 2, "D: jumlah bangun di tiap tampilan");
  cek([3, 4, 5, 6, 7, 8].every((n) => SB.namaN(n) === MS.namaSegi(n)) && SB.namaN(5) === "segi lima" && SB.namaN(8) === "segi delapan", "D: nama bangun sama di lab dan mesin");

  // Beraturan.
  const letakS = [];
  const letakH = [];
  for (const [i, b] of SB.DATA_BERATURAN.entries()) {
    const nama = `${SB.namaN(b.n)} sisi ${b.s}`;
    const K = jalanSisi(samaSisi(b.n, b.s));
    cek(K === b.n * b.s && K === SB.kelilingBeraturan(b.n, b.s) && K === SB.jumlahSama(b.n, b.s) && K !== b.s * b.s && K !== b.n + b.s, `D Beraturan ${nama}: keliling ${K} sama dengan berjalan di tepi, bukan sisi kali sisi atau banyak sisi ditambah sisi`);
    cek(SB.tulisSama(b.n, b.s).split(" + ").length === b.n, `D Beraturan ${nama}: penjumlahan ditulis ${b.n} kali`);
    const oS = SB.opsiBanyakSisi(i);
    const oH = SB.opsiBeraturan(i);
    cek(oS.length === 3 && new Set(oS).size === 3 && oS.includes(b.n) && oS.includes(b.n - 1) && oS.includes(b.n + 1), `D Beraturan ${nama}: pilihan banyak sisi unik, ${b.n} satu-satunya benar`);
    cek(oH.length === 3 && new Set(oH).size === 3 && oH.filter((v) => v === K).length === 1 && oH.includes(b.n + b.s) && oH.every((v) => v > 0), `D Beraturan ${nama}: tiga pilihan keliling unik, satu benar (${K}), pengecoh ditambah ada`);
    letakS.push(oS.indexOf(b.n));
    letakH.push(oH.indexOf(K));
    const xb = LD(w0, { t: "BR_DATA", i });
    for (const v of oH) cek(LD(xb, { t: "BR_HASIL", nilai: v }).pernah.length === 0 && /Tentukan dulu/.test(LD(xb, { t: "BR_HASIL", nilai: v }).pesan), `D Beraturan ${nama}: keliling ${v} sebelum banyak sisi ditolak`);
    for (const v of oS.filter((o) => o !== b.n)) {
      const s = LD(xb, { t: "BR_SISI", nilai: v });
      cek(!s.ber.sisiOk && !s.pesan.startsWith("✅") && s.pesan.includes(`punya ${b.n} sisi`), `D Beraturan ${nama}: banyak sisi ${v} ditolak`);
    }
    const sS = LD(xb, { t: "BR_SISI", nilai: b.n });
    cek(sS.ber.sisiOk && sS.pesan.startsWith("✅") && sS.pesan.includes(`punya ${b.n} sisi`), `D Beraturan ${nama}: banyak sisi ${b.n} diterima`);
    for (const v of oH.filter((o) => o !== K)) {
      const t = LD(sS, { t: "BR_HASIL", nilai: v });
      cek(!t.ber.hasilOk && t.pernah.length === 0 && !t.pesan.startsWith("✅"), `D Beraturan ${nama}: keliling ${v} ditolak`);
      cek(/menjumlah banyak sisi/.test(t.pesan) === (v === b.n + b.s) && /Sisi dikali sisi/.test(t.pesan) === (v === b.s * b.s && v !== b.n + b.s), `D Beraturan ${nama}: keliling ${v} dijelaskan tepat`);
    }
    const ok = LD(sS, { t: "BR_HASIL", nilai: K });
    cek(ok.ber.hasilOk && ok.pernah.includes(`ber:${i}`) && ok.pesan.startsWith("✅") && ok.pesan.includes(`${samaSisi(b.n, b.s).join(" + ")} = ${K} cm`) && ok.pesan.includes(`${b.n} × ${b.s} = ${K} cm`), `D Beraturan ${nama}: keliling ${K} tercatat dan dicek dengan penjumlahan`);
    cek(!LD(ok, { t: "BR_SISI", nilai: b.n - 1 }).ber.sisiOk && !LD(ok, { t: "BR_SISI", nilai: b.n - 1 }).ber.hasilOk && LD(ok, { t: "BR_SISI", nilai: b.n - 1 }).pernah.includes(`ber:${i}`), `D Beraturan ${nama}: jawaban banyak sisi salah setelah selesai mengosongkan tanda, riwayat tetap`);
    cek(LD(xb, { t: "BR_SISI", nilai: 99 }) === xb && LD(sS, { t: "BR_HASIL", nilai: 999 }) === sS, `D Beraturan ${nama}: nilai di luar pilihan diabaikan`);
    cek(!LD(ok, { t: "BR_DATA", i: (i + 1) % 5 }).ber.sisiOk && LD(ok, { t: "BR_DATA", i: (i + 1) % 5 }).pernah.includes(`ber:${i}`), `D Beraturan ${nama}: ganti bangun mengosongkan, riwayat tetap`);
  }
  cek(new Set(letakS).size >= 2 && new Set(letakH).size >= 2, `D Beraturan: letak jawaban benar bervariasi (${letakS.join("")} / ${letakH.join("")})`);
  cek(LD(w0, { t: "BR_DATA", i: 5 }) === w0 && LD(w0, { t: "BR_DATA", i: -1 }) === w0, "D Beraturan: bangun di luar batas diabaikan");

  // Beda.
  const letakB = [];
  for (const [i, sisi] of SB.DATA_BEDA.entries()) {
    const nama = sisi.join(", ");
    const n = sisi.length;
    const K = jalanSisi(sisi);
    cek(SB.jumlahSisi(sisi) === K && !SB.DATA_BEDA[i].every((v) => v === sisi[0]) && K !== n * sisi[0], `D Beda ${nama}: keliling ${K} dengan berjalan, sisi tidak semuanya sama, dan bukan ${n} kali sisi pertama`);
    const o = SB.opsiBeda(i);
    cek(o.length === 3 && new Set(o).size === 3 && o.filter((v) => v === K).length === 1 && o.includes(n * sisi[0]) && o.includes(K - sisi[n - 1]), `D Beda ${nama}: tiga pilihan unik, satu benar (${K}), pengecoh dikali ${n} dan satu sisi terlewat`);
    letakB.push(o.indexOf(K));
    const xd = LD(w0, { t: "BD_DATA", i });
    cek(xd.beda.lewat.length === n, `D Beda ${nama}: ${n} sisi`);
    cek(/Ketuk dulu/.test(LD(xd, { t: "BD_HASIL", nilai: K }).pesan) && LD(xd, { t: "BD_HASIL", nilai: K }).pernah.length === 0, `D Beda ${nama}: keliling sebelum semua sisi diketuk ditolak`);
    const urutan = [sisi.map((_, k) => k), sisi.map((_, k) => n - 1 - k), sisi.map((_, k) => (k * 2 + 1) % n === k ? k : (k + 2) % n)].filter((u) => new Set(u).size === n);
    urutan.push(sisi.map((_, k) => (k + 3) % n));
    for (const urut of urutan) {
      let s = xd;
      urut.forEach((k, m) => {
        s = LD(s, { t: "BD_SISI", k });
        const dipakai = urut.slice(0, m + 1).sort((a, b) => a - b).map((v) => sisi[v]);
        cek(s.pesan.startsWith("✅") && s.pesan.includes(`sepanjang ${sisi[k]} cm`) && s.pesan.includes(`Jumlah sekarang ${dipakai.length === 1 ? dipakai[0] : `${dipakai.join(" + ")} = ${jalanSisi(dipakai)}`} cm`), `D Beda ${nama}: sisi ke-${k + 1} urutan ${urut.join("")} langkah ${m + 1}`);
        cek(LD(s, { t: "BD_SISI", k }).pesan.includes("sudah dijumlah") && LD(s, { t: "BD_SISI", k }).beda.lewat.filter(Boolean).length === m + 1, `D Beda ${nama}: mengetuk sisi ke-${k + 1} lagi ditolak`);
      });
      cek(s.pesan.includes("Semua sisi sudah dijumlah") && s.pesan.includes(`keliling ${SB.namaN(n)}`), `D Beda ${nama}: semua sisi disebut selesai`);
      for (const v of o.filter((q) => q !== K)) {
        const t = LD(s, { t: "BD_HASIL", nilai: v });
        cek(!t.beda.hasilOk && t.pernah.length === 0 && !t.pesan.startsWith("✅"), `D Beda ${nama}: keliling ${v} ditolak`);
        cek(new RegExp(`Dikali ${n} hanya bila`).test(t.pesan) === (v === n * sisi[0]) && new RegExp(`baru ${n - 1} sisi`).test(t.pesan) === (v === K - sisi[n - 1] && v !== n * sisi[0]), `D Beda ${nama}: keliling ${v} dijelaskan tepat`);
      }
      const ok = LD(s, { t: "BD_HASIL", nilai: K });
      cek(ok.beda.hasilOk && ok.pernah.includes(`beda:${i}`) && ok.pesan.startsWith("✅") && ok.pesan.includes(`${sisi.join(" + ")} = ${K} cm`), `D Beda ${nama}: keliling ${K} tercatat`);
    }
    const sebagian = jalan(xd, LD, [{ t: "BD_SISI", k: 0 }, { t: "BD_SISI", k: 1 }]);
    cek(LD(sebagian, { t: "BD_HASIL", nilai: K }).pernah.length === 0 && /Ketuk dulu/.test(LD(sebagian, { t: "BD_HASIL", nilai: K }).pesan), `D Beda ${nama}: sebagian sisi belum cukup`);
    cek(LD(xd, { t: "BD_SISI", k: n }) === xd && LD(xd, { t: "BD_SISI", k: -1 }) === xd && LD(xd, { t: "BD_HASIL", nilai: 999 }) === xd, `D Beda ${nama}: sisi dan nilai di luar batas diabaikan`);
    cek(LD(sebagian, { t: "BD_DATA", i: (i + 1) % 2 }).beda.lewat.every((v) => !v), `D Beda ${nama}: ganti bangun mengosongkan ketukan`);
  }
  cek(new Set(letakB).size >= 2, `D Beda: letak jawaban benar bervariasi (${letakB.join("")})`);
  cek(LD(w0, { t: "BD_DATA", i: 2 }) === w0, "D Beda: bangun di luar batas diabaikan");

  // Tabel.
  const letakT = [];
  for (const [i, t] of SB.DATA_TABEL.entries()) {
    const nama = `sisi ${t.s}`;
    const KK = t.baris.map((n) => jalanSisi(samaSisi(n, t.s)));
    // Pola: selisih dua baris sama dengan selisih banyak sisi dikali sisi (dihitung dengan berjalan).
    for (let a = 0; a + 1 < t.baris.length; a += 1) cek(KK[a + 1] - KK[a] === jalanSisi(samaSisi(t.baris[a + 1] - t.baris[a], t.s)), `D Tabel ${nama}: selisih baris ${t.baris[a]} dan ${t.baris[a + 1]} sama dengan selisih sisi dikali ${t.s}`);
    cek(t.baris.every((n) => n >= 3 && n <= 8) && t.baris.every((n, k) => k === 0 || n > t.baris[k - 1]), `D Tabel ${nama}: baris menaik, banyak sisi 3 sampai 8`);
    const xt = LD(w0, { t: "TB_DATA", i });
    cek(xt.tabel.ok.length === t.baris.length, `D Tabel ${nama}: ${t.baris.length} baris`);
    for (const [k, n] of t.baris.entries()) {
      const K = KK[k];
      const o = SB.opsiTabel(i, k);
      cek(o.length === 3 && new Set(o).size === 3 && o.filter((v) => v === K).length === 1 && o.includes(n + t.s) && o.includes(n * n) && n * n !== K && n + t.s !== K, `D Tabel ${nama}/${SB.namaN(n)}: tiga pilihan unik, satu benar (${K}), pengecoh ditambah dan n kali n`);
      letakT.push(o.indexOf(K));
      for (const v of o.filter((q) => q !== K)) {
        const s = LD(xt, { t: "TB_ISI", k, nilai: v });
        cek(!s.tabel.ok[k] && s.pernah.length === 0 && !s.pesan.startsWith("✅") && /menjumlah banyak sisi/.test(s.pesan) === (v === n + t.s) && /banyak sisi dikali banyak sisi/.test(s.pesan) === (v === n * n), `D Tabel ${nama}/${SB.namaN(n)}: isi ${v} ditolak dan dijelaskan tepat`);
      }
      const s = LD(xt, { t: "TB_ISI", k, nilai: K });
      cek(s.tabel.ok[k] && s.pesan.startsWith("✅") && s.pesan.includes(`${n} × ${t.s} = ${K} cm`) && s.tabel.ok.filter(Boolean).length === 1 && s.pernah.length === 0, `D Tabel ${nama}/${SB.namaN(n)}: isi ${K} diterima, belum tercatat`);
      cek(/sudah terisi/.test(LD(s, { t: "TB_ISI", k, nilai: K }).pesan), `D Tabel ${nama}/${SB.namaN(n)}: baris terisi tidak diisi lagi`);
      cek(LD(xt, { t: "TB_ISI", k, nilai: 999 }) === xt, `D Tabel ${nama}/${SB.namaN(n)}: nilai di luar pilihan diabaikan`);
    }
    // Semua baris: tercatat dengan pola, urutan apa saja.
    const isiSemua = (urut) => jalan(xt, LD, urut.map((k) => ({ t: "TB_ISI", k, nilai: KK[k] })));
    const maju = t.baris.map((_, k) => k);
    const mundur = [...maju].reverse();
    for (const urut of [maju, mundur]) {
      const penuh = isiSemua(urut);
      cek(penuh.pernah.includes(`tabel:${i}`) && penuh.pesan.includes(`Polanya: keliling = banyak sisi × ${t.s}`) && penuh.pesan.includes(`bertambah ${t.s}`) && penuh.tabel.ok.every(Boolean), `D Tabel ${nama}: semua baris tercatat dengan pola`);
      const sebagian = isiSemua(urut.slice(0, -1));
      cek(sebagian.pernah.length === 0 && !/Polanya/.test(sebagian.pesan), `D Tabel ${nama}: kurang satu baris belum tercatat`);
      cek(!LD(penuh, { t: "TB_DATA", i: (i + 1) % 2 }).tabel.ok.some(Boolean) && LD(penuh, { t: "TB_DATA", i: (i + 1) % 2 }).pernah.includes(`tabel:${i}`), `D Tabel ${nama}: ganti tabel mengosongkan, riwayat tetap`);
    }
    cek(LD(xt, { t: "TB_ISI", k: t.baris.length, nilai: 5 }) === xt && LD(xt, { t: "TB_ISI", k: -1, nilai: 5 }) === xt, `D Tabel ${nama}: baris di luar batas diabaikan`);
  }
  cek(new Set(letakT).size >= 2, `D Tabel: letak jawaban benar bervariasi (${letakT.join("")})`);
  cek(LD(w0, { t: "TB_DATA", i: 2 }) === w0, "D Tabel: tabel di luar batas diabaikan");

  // Fuzz.
  const acak = acakDari(113);
  let s = w0;
  let ok = true;
  const pesanSemua = new Set();
  const riwayatSemua = new Set();
  const ID = /^(ber:[0-4]|beda:[0-1]|tabel:[0-1])$/;
  for (let m = 0; m < 20000; m += 1) {
    const p = acak(26);
    const b = SB.dataBeraturan(s);
    const d = SB.dataBeda(s);
    const tb = SB.dataTabel(s);
    const kT = acak(tb.baris.length);
    const a =
      p === 0 ? { t: "BR_DATA", i: acak(6) } :
      p === 1 ? { t: "BR_SISI", nilai: acak(5) === 0 ? 99 : SB.opsiBanyakSisi(s.ber.data)[acak(3)] } :
      p === 2 || p === 3 ? { t: "BR_SISI", nilai: b.n } :
      p === 4 ? { t: "BR_HASIL", nilai: acak(5) === 0 ? 99 : SB.opsiBeraturan(s.ber.data)[acak(3)] } :
      p === 5 || p === 6 ? { t: "BR_HASIL", nilai: b.n * b.s } :
      p === 7 ? { t: "BD_DATA", i: acak(3) } :
      p === 8 || p === 9 || p === 10 ? { t: "BD_SISI", k: acak(d.length + 1) - (acak(8) === 0 ? 1 : 0) } :
      p === 11 || p === 12 ? { t: "BD_SISI", k: Math.max(0, s.beda.lewat.findIndex((v) => !v)) } :
      p === 13 ? { t: "BD_HASIL", nilai: acak(5) === 0 ? 99 : SB.opsiBeda(s.beda.data)[acak(3)] } :
      p === 14 || p === 15 ? { t: "BD_HASIL", nilai: SB.jumlahSisi(d) } :
      p === 16 ? { t: "TB_DATA", i: acak(3) } :
      p === 17 ? { t: "TB_ISI", k: acak(tb.baris.length + 1) - (acak(8) === 0 ? 1 : 0), nilai: acak(5) === 0 ? 99 : SB.opsiTabel(s.tabel.data, kT)[acak(3)] } :
      p === 18 || p === 19 || p === 20 ? { t: "TB_ISI", k: kT, nilai: tb.baris[kT] * tb.s } :
      p === 21 ? { t: "PESAN_KOSONG" } :
      acak(30) === 0 ? { t: "RESET" } : { t: "TB_ISI", k: Math.max(0, s.tabel.ok.findIndex((v) => !v)), nilai: tb.baris[Math.max(0, s.tabel.ok.findIndex((v) => !v))] * tb.s };
    const t = LD(s, a);
    if (a.t !== "RESET" && !s.pernah.every((v) => t.pernah.includes(v))) ok = false;
    if (!(t.ber.data >= 0 && t.ber.data < 5 && t.beda.data >= 0 && t.beda.data < 2 && t.tabel.data >= 0 && t.tabel.data < 2)) ok = false;
    if (t.beda.lewat.length !== SB.DATA_BEDA[t.beda.data].length || t.tabel.ok.length !== SB.DATA_TABEL[t.tabel.data].baris.length) ok = false;
    if (t.ber.hasilOk && !t.ber.sisiOk) ok = false;
    for (const id of t.pernah) if (!ID.test(id)) ok = false;
    for (const id of t.pernah.filter((v) => !s.pernah.includes(v))) {
      const [jenis, nn] = id.split(":");
      const idx = Number(nn);
      if (jenis === "ber" && !(t.ber.data === idx && t.ber.sisiOk && t.ber.hasilOk)) ok = false;
      if (jenis === "beda" && !(t.beda.data === idx && t.beda.lewat.every(Boolean) && t.beda.hasilOk)) ok = false;
      if (jenis === "tabel" && !(t.tabel.data === idx && t.tabel.ok.every(Boolean))) ok = false;
    }
    if (t.pesan) pesanSemua.add(t.pesan);
    for (const id of t.pernah) riwayatSemua.add(id);
    s = t;
  }
  cek(ok, "fuzz 20.000 aksi Lab Segi Banyak: batas terjaga, riwayat tidak dicabut dan hanya bila tercapai");
  cek(pesanSemua.size > 40 && [...pesanSemua].every(tanpaAngka), `fuzz Lab Segi Banyak: semua ${pesanSemua.size} pesan dieja menjadi kata`);
  cek(riwayatSemua.size >= 6, `fuzz Lab Segi Banyak: riwayat terkumpul (${[...riwayatSemua].sort().join(" ")})`);
  globalThis.__pesanD = [...pesanSemua];
}

/* ------------------------------ Mesin D: kunci mandiri ------------------------------ */
{
  for (const [i, k] of MS.KASUS_SEGIBANYAK.entries()) {
    const c = MS.MESIN_SEGIBANYAK.kasus[i];
    const [br, bd, tb, by] = c.langkah;
    const Kb = jalanSisi(samaSisi(k.ber.n, k.ber.s));
    cek(br.benar === `${Kb} cm` && br.tanya.includes(`${MS.namaSegi(k.ber.n)} beraturan, tiap sisinya ${k.ber.s} cm`) && MS.kelilingSamaSisi(k.ber.n, k.ber.s) === Kb, `Mesin ${k.id}: beraturan ${Kb} cm`);
    cek(br.opsi.includes(`${k.ber.n + k.ber.s} cm`) && br.opsi.every((o) => o === br.benar || o !== `${Kb} cm`) && Kb !== k.ber.n + k.ber.s, `Mesin ${k.id}: pengecoh beraturan (banyak sisi ditambah sisi)`);
    const n = k.beda.length;
    const Kd = jalanSisi(k.beda);
    cek(new Set(k.beda).size > 1 && bd.benar === `${Kd} cm` && bd.tanya.includes(k.beda.join(" cm, ")) && bd.tanya.includes(MS.namaSegi(n)), `Mesin ${k.id}: sisi berbeda ${Kd} cm`);
    cek(bd.opsi.includes(`${n * k.beda[0]} cm`) && bd.opsi.includes(`${Kd - k.beda[n - 1]} cm`) && n * k.beda[0] !== Kd, `Mesin ${k.id}: pengecoh sisi berbeda (dikali ${n}, satu sisi terlewat)`);
    const Kt = jalanSisi(samaSisi(k.tabel.n, k.tabel.s));
    cek(tb.benar === `${Kt} cm` && tb.tanya.includes(`${k.tabel.s} cm`) && tb.tanya.includes(MS.namaSegi(k.tabel.n)) && tb.opsi.includes(`${k.tabel.n + k.tabel.s} cm`) && tb.opsi.includes(`${k.tabel.n * k.tabel.n} cm`), `Mesin ${k.id}: tabel ${Kt} cm`);
    cek(by.benar === `${k.banyak} sisi` && by.opsi.includes(`${k.banyak - 1} sisi`) && by.opsi.includes(`${k.banyak + 1} sisi`) && by.tanya.includes(MS.namaSegi(k.banyak)), `Mesin ${k.id}: banyak sisi ${k.banyak}`);
    const ej = EJ.ejaK5B4(c.ringkas);
    cek([Kb, Kd, Kt].every((v) => ej.includes(EJ.kataK5B4(v))), `Mesin ${k.id}: ringkas dieja dengan hasil benar`);
  }
  sama(MS.KASUS_SEGIBANYAK.map((k) => k.id), ["lima", "enam", "delapan"], "Mesin D: tiga kasus");
}

/* ------------------------------ Skenario D ------------------------------ */
{
  const S = SK.SKENARIO_K5B4D;
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
  sama(S.id.replace(/-k5b4$/, ""), K5.ID_SKENARIO_K5B4.D, "id skenario D sesuai id misi");
  const adegan = (id) => S.adegan.find((a) => a.id === id);
  const soal = adegan("hitung-keliling").soal;
  cek(soal[0].teks.includes("segi lima beraturan, tiap sisinya 3 m") && soal[0].jawaban === String(jalanSisi(samaSisi(5, 3))) && soal[0].jawaban === "15" && soal[0].opsi.includes(String(5 + 3)) && soal[0].opsi.includes(String(3 * 3)) && soal[0].opsi.filter((o) => o !== "15").every((o) => Number(o) !== 15), "D: petak segi lima sisi 3 berkeliling 15, pengecoh 8 dan 9 salah (dihitung)");
  cek(soal[1].teks.includes("segi enam beraturan, tiap sisinya 4 m") && soal[1].jawaban === String(jalanSisi(samaSisi(6, 4))) && soal[1].jawaban === "24" && soal[1].opsi.includes(String(6 + 4)) && soal[1].opsi.includes(String(4 * 4)) && soal[1].opsi.filter((o) => o !== "24").every((o) => Number(o) !== 24), "D: kolam segi enam sisi 4 berkeliling 24, pengecoh 10 dan 16 salah (dihitung)");
  const beda = adegan("beda");
  const bb = beda.opsi.find((o) => o.benar);
  cek(beda.cerita.includes("2 m, 3 m, 4 m, 5 m, dan 6 m") && beda.cerita.includes("5 × 2") && /sisinya berbeda/.test(bb.teks) && /dijumlah/.test(bb.teks) && bb.umpan.includes(`= ${jalanSisi([2, 3, 4, 5, 6])} meter`) && jalanSisi([2, 3, 4, 5, 6]) === 20 && beda.opsi.filter((o) => !o.benar).every((o) => !/sisinya berbeda/.test(o.teks)), "D: sisi berbeda dijumlah 20 (dihitung), pengecoh salah");
  const pagar = adegan("pagar");
  cek(pagar.jumlah === jalanSisi(samaSisi(6, 3)) && pagar.jumlah === 18 && pagar.cerita.includes("segi enam beraturan bersisi 3 m") && pagar.sukses.includes("6 × 3 = 18"), "D: taman segi enam sisi 3 sama dengan 18 stik (dihitung)");
  const lampu = adegan("lampu");
  cek(lampu.target === jalanSisi(samaSisi(8, 2)) && lampu.target === 16 && lampu.target <= lampu.maks && lampu.cerita.includes("segi delapan beraturan bersisi 2 m") && lampu.sukses.includes("8 × 2 = 16"), "D: kolam segi delapan sisi 2 sama dengan 16 stik (dihitung)");
  const pola = adegan("pola");
  const pb = pola.opsi.find((o) => o.benar);
  cek(pola.cerita.includes(`segi lima ${jalanSisi(samaSisi(5, 2))} m, segi enam ${jalanSisi(samaSisi(6, 2))} m, segi delapan ${jalanSisi(samaSisi(8, 2))} m`) && /banyak sisi dikali panjang sisi/.test(pb.teks) && pb.umpan.includes(`bertambah ${jalanSisi(samaSisi(1, 2))} meter`), "D: tabel 10, 12, 16 dan pola banyak sisi dikali sisi (dihitung)");
  cek(pola.opsi.some((o) => o.umpan.includes(`5 + 2 = ${5 + 2}`)) && 5 + 2 !== 10 && pola.opsi.filter((o) => !o.benar).every((o) => !/dikali panjang sisi/.test(o.teks)), "D: pengecoh pola (banyak sisi ditambah sisi 7) salah");
  const posisi = S.adegan.filter((a) => a.jenis === "pilih").map((a) => a.opsi.findIndex((o) => o.benar));
  cek(new Set(posisi).size === posisi.length, `D: letak jawaban pilih bervariasi (${posisi.join("")})`);
}

/* ------------------------------ Misi D ------------------------------ */
{
  const daftar = K5.daftarMisiK5Bab4("D");
  cek(daftar.filter((m) => m.wajib).length === 7 && daftar.filter((m) => !m.wajib).length === 3, "D: tujuh misi wajib dan tiga tantangan bebas");
  cek(new Set(daftar.map((m) => m.id)).size === 10 && daftar.every((m) => m.id.startsWith("d-")), "D: id misi unik berawalan d");
  cek(daftar.every((m) => m.teks.length > 20 && tanpaAngka(m.teks)), "D: teks misi jelas dan dapat dieja");
  const kosong = [{ alat: "segibanyak", pernah: [] }, sel("tidak-ada"), SB.keadaanSegiBanyakK5B4D(SB.awalSegiBanyakK5B4D())];
  cek(kosong.every((k) => M0.misiBaru(daftar, k, new Set()).length === 0), "D: keadaan awal alat tidak memenuhi misi mana pun");
  const baru = (k) => M0.misiBaru(daftar, k, new Set());
  cek(baru(sel(K5.ID_MESIN_K5B4.D)).join() === "d-mesin" && baru(sel(K5.ID_SKENARIO_K5B4.D)).join() === "d-skenario", "D: id mesin dan skenario memenuhi misinya");
  cek(M0.misiBaru(daftar, { alat: "segiempat", pernah: ["ber:0", "ber:1", "ber:2", "beda:0", "tabel:0"] }, new Set()).length === 0, "D: riwayat alat lain tidak memenuhi misi D");

  const capai = (aksi) => M0.misiBaru(daftar, SB.keadaanSegiBanyakK5B4D(jalan(SB.awalSegiBanyakK5B4D(), LD, aksi)), new Set());
  const berAksi = (i, sisi = SB.DATA_BERATURAN[i].n, hasil = SB.DATA_BERATURAN[i].n * SB.DATA_BERATURAN[i].s) => [{ t: "BR_DATA", i }, { t: "BR_SISI", nilai: sisi }, { t: "BR_HASIL", nilai: hasil }];
  cek(capai(berAksi(0)).join() === "d-lima" && capai(berAksi(1)).join() === "d-enam" && capai(berAksi(2)).join() === "d-delapan" && capai(berAksi(3)).join() === "d-enam-tiga" && capai(berAksi(4)).join() === "d-tujuh", "D: segi lima, enam, delapan, dan tantangan segi enam sisi 3 serta segi tujuh memenuhi");
  cek(capai(berAksi(0, 4)).length === 0 && capai(berAksi(0, 6)).length === 0 && capai(berAksi(0, 5, 8)).length === 0 && capai(berAksi(0, 5, 9)).length === 0 && capai(berAksi(1, 6, 16)).length === 0, "D: banyak sisi salah, atau keliling salah (ditambah, sisi kali sisi), tidak memenuhi");
  cek(capai(berAksi(0).slice(0, 2)).length === 0 && capai([{ t: "BR_DATA", i: 0 }, { t: "BR_HASIL", nilai: 15 }]).length === 0, "D: hanya banyak sisi, atau keliling tanpa banyak sisi, tidak memenuhi");
  const bedaAksi = (i, hasil = SB.jumlahSisi(SB.DATA_BEDA[i]), sisi = SB.DATA_BEDA[i].map((_, k) => k)) => [{ t: "BD_DATA", i }, ...sisi.map((k) => ({ t: "BD_SISI", k })), { t: "BD_HASIL", nilai: hasil }];
  cek(capai(bedaAksi(0)).join() === "d-beda" && capai(bedaAksi(1)).join() === "d-beda-dua", "D: sisi berbeda 2, 3, 4, 5, 6 dan tantangan 2, 2, 3, 4, 5 memenuhi");
  cek(capai(bedaAksi(0, 10)).length === 0 && capai(bedaAksi(0, 14)).length === 0 && capai(bedaAksi(0, 20, [0, 1, 2, 3])).length === 0 && capai(bedaAksi(1, 10)).length === 0, "D: dikali banyak sisi, satu sisi terlewat, atau sisi belum diketuk semua tidak memenuhi");
  const tabelAksi = (i, lewati = null) => [{ t: "TB_DATA", i }, ...SB.DATA_TABEL[i].baris.map((n, k) => ({ t: "TB_ISI", k, nilai: n * SB.DATA_TABEL[i].s })).filter((_, k) => k !== lewati)];
  cek(capai(tabelAksi(0)).join() === "d-tabel" && capai(tabelAksi(1)).length === 0, "D: tabel sisi 2 penuh memenuhi, tabel sisi 3 hanya latihan");
  for (let k = 0; k < SB.DATA_TABEL[0].baris.length; k += 1) cek(capai(tabelAksi(0, k)).length === 0, `D: tabel sisi 2 kurang baris ${k + 1} tidak memenuhi`);
  cek(capai([{ t: "TB_DATA", i: 0 }, ...SB.DATA_TABEL[0].baris.map((n, k) => ({ t: "TB_ISI", k, nilai: n + 2 }))]).length === 0, "D: tabel diisi banyak sisi ditambah sisi tidak memenuhi");

  const tampil = M0.tampilMisi(daftar);
  const wajibIds = tampil.filter((m) => m.wajib).map((m) => m.id);
  cek(!M0.wajibSelesai(tampil, new Set(wajibIds.slice(0, 6))) && M0.wajibSelesai(tampil, new Set(wajibIds)), "D: gerbang terbuka hanya bila tujuh wajib");
}

/* ------------------------------ Konsep tidak bocor ke Sub-Bab D ------------------------------ */
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
  // Sub-Bab D tidak memakai konsep E (bangun gabungan, sekat, bungkus, denah, sisi hilang, Baluwarti).
  const BOCOR_D = /(\bgabungan\b|\bsekat\b|\bbungkus\b|\bdenah\b|\bsisi hilang\b|\bbaluwarti\b|\bsisi luar\b)/i;
  const catat = (teks, apa) => {
    const m = BOCOR_D.exec(teks);
    cek(!m, `D: ${apa} bebas konsep sub-bab berikutnya (${m ? m[0] : ""} di "${String(teks).slice(Math.max(0, (m?.index ?? 0) - 30), (m?.index ?? 0) + 40)}")`);
  };
  for (const t of [TK.MISI_K5B4.D, TK.NAMA_SIM_K5B4.D, ...K5.MISI_D.map((m) => m.teks)]) catat(t, "teks misi");
  catat(teksDari(MS.MESIN_SEGIBANYAK), "mesin");
  catat(teksDari(SK.SKENARIO_K5B4D), "skenario");
  catat(teksDari(ringkas.subBab.D), "peta dan infografis ringkas");
  catat(tanpaKomentar(baca("SimulasiLabSegiBanyakK5B4", "tsx")), "komponen lab (tanpa komentar)");
  catat(tanpaKomentar(baca("model-segibanyak-k5b4", "tsx")), "model gambar (tanpa komentar)");
  catat(tanpaKomentar(baca("lab-segibanyak-k5b4d", "ts")), "logika lab (tanpa komentar)");
  for (const p of globalThis.__pesanD) catat(p, "pesan lab dari fuzz");
  for (const u of [SB.ucapBeraturanK5B4D(w0), SB.ucapBedaK5B4D(w0), SB.ucapTabelK5B4D(w0)]) catat(u, "ucapan lab");

  for (const f of ["SimulasiLabSegiBanyakK5B4", "model-segibanyak-k5b4"]) {
    const s = baca(f, "tsx");
    cek(!/correct_index|explanation/.test(s) && !/fetch\(|XMLHttpRequest|api\/|openai|anthropic|gemini/i.test(s), `${f}: tanpa kunci jawaban dan tanpa jaringan`);
  }
  {
    const s = baca("lab-segibanyak-k5b4d", "ts");
    cek(!/fetch\(|XMLHttpRequest|from "react"|openai|anthropic|gemini|correct_index|explanation/i.test(s) && (s.match(/^import /gm) ?? []).length === 0, "lab-segibanyak-k5b4d: murni dan tanpa impor");
  }
  {
    const s = baca("SimulasiLabSegiBanyakK5B4", "tsx");
    cek(/useEffect\(\(\) => \{\s*onKeadaan\?\.\(keadaan\w+\(x\)\);\s*\}, \[onKeadaan, x\]\);/.test(s), "D lab: lapor keadaan lewat useEffect");
    cek(/setLihat\(v\);\s*kirim\(\{ t: "PESAN_KOSONG" \}\);/.test(s), "D lab: ganti tampilan mengosongkan pesan");
    const catatan = [...s.matchAll(/^\s*"([^"]+)",$/gm)].map((m) => m[1]);
    cek(catatan.length >= 3 && catatan.every(tanpaAngka), "D lab: Coba ini dapat dieja");
    cek(/aria-label=\{`Banyak sisi \$\{v\}`\}/.test(s) && /aria-label=\{`Keliling beraturan \$\{v\}`\}/.test(s) && /aria-label=\{`Isi tabel \$\{v\}`\}/.test(s) && /aria-label=\{`Baris \$\{namaN\(n\)\}`\}/.test(s), "D lab: tombol jawaban berlabel");
  }
  const ucapan = [];
  for (let i = 0; i < SB.DATA_BERATURAN.length; i += 1) {
    const xb = LD(w0, { t: "BR_DATA", i });
    ucapan.push(SB.ucapBeraturanK5B4D(xb), SB.ucapBeraturanK5B4D(LD(xb, { t: "BR_SISI", nilai: SB.DATA_BERATURAN[i].n })));
  }
  for (let i = 0; i < SB.DATA_BEDA.length; i += 1) {
    const xd = LD(w0, { t: "BD_DATA", i });
    ucapan.push(SB.ucapBedaK5B4D(xd), SB.ucapBedaK5B4D(LD(xd, { t: "BD_SISI", k: 0 })));
  }
  for (let i = 0; i < SB.DATA_TABEL.length; i += 1) {
    const xt = LD(w0, { t: "TB_DATA", i });
    ucapan.push(SB.ucapTabelK5B4D(xt), SB.ucapTabelK5B4D(LD(xt, { t: "TB_ISI", k: 0, nilai: SB.DATA_TABEL[i].baris[0] * SB.DATA_TABEL[i].s })));
  }
  cek(ucapan.length >= 14 && ucapan.every(tanpaAngka), `D: semua ${ucapan.length} ucapan lab dieja menjadi kata`);
  for (const u of ucapan) catat(u, "ucapan lab");

  // Data ringkas D dihitung ulang mandiri.
  const D0 = ringkas.subBab.D;
  const butir = (panel, id) => panel.butir.find((b) => b.id === id);
  const [p1, p2, p3] = D0.infografis.panel;
  sama(butir(p1, "sisi").visual.baris.map((r) => r[1]), [5, 6, 7, 8], "ringkas D: banyak sisi segi lima sampai delapan");
  sama(butir(p1, "sisi").visual.baris.map((r) => r[0]), ["lima", "enam", "tujuh", "delapan"], "ringkas D: nama segi berurutan");
  cek(butir(p1, "kali").visual.isi === `5 × 3 = ${jalanSisi(samaSisi(5, 3))}` && butir(p1, "cek").visual.isi === `${SB.tulisSama(5, 3)} = ${jalanSisi(samaSisi(5, 3))}`, "ringkas D: 5 × 3 sama dengan 15 dan dicek dengan penjumlahan (dihitung)");
  cek(butir(p1, "kali").suara.includes(EJ.kataK5B4(15)), "ringkas D: suara hasil segi lima");
  const [sSama, sBeda] = p2.sisi;
  cek(sSama.visual.isi === `5 × 3 = ${jalanSisi(samaSisi(5, 3))}` && sBeda.visual.isi === `${SB.DATA_BEDA[0].join(" + ")} = ${jalanSisi(SB.DATA_BEDA[0])}` && jalanSisi(SB.DATA_BEDA[0]) === 20, "ringkas D: sisi sama 15 dan sisi berbeda 20 (dihitung)");
  cek(sBeda.suara.includes(EJ.kataK5B4(20)) && sSama.suara.includes(EJ.kataK5B4(15)), "ringkas D: suara sisi sama dan berbeda");
  cek(butir(p3, "lima").visual.isi === `5 × 2 = ${jalanSisi(samaSisi(5, 2))}` && butir(p3, "enam").visual.isi === `6 × 2 = ${jalanSisi(samaSisi(6, 2))}`, "ringkas D: baris tabel segi lima dan enam (dihitung)");
  sama(butir(p3, "pola").visual.baris, [5, 6, 7, 8].map((n) => [n, jalanSisi(samaSisi(n, 2))]), "ringkas D: tabel pola n dan keliling sisi 2 (dihitung)");
  cek(butir(p3, "lima").suara.includes(EJ.kataK5B4(10)) && butir(p3, "enam").suara.includes(EJ.kataK5B4(12)), "ringkas D: suara baris tabel");
  const kartu = (id) => D0.peta.kartu.find((k) => k.id === id).teks;
  cek(kartu("d-lima") === `5 × 3 = ${jalanSisi(samaSisi(5, 3))}` && kartu("d-enam") === `6 × 4 = ${jalanSisi(samaSisi(6, 4))}` && kartu("d-jumlah") === `${SB.DATA_BEDA[0].join(" + ")} = ${jalanSisi(SB.DATA_BEDA[0])}`, "ringkas D: kartu beraturan dan sisi berbeda (dihitung)");
  cek(kartu("d-sepuluh") === `Segi lima sisi 2: ${jalanSisi(samaSisi(5, 2))}` && kartu("d-enambelas") === `Segi delapan sisi 2: ${jalanSisi(samaSisi(8, 2))}` && kartu("d-lima-sisi") === "Segi lima punya 5 sisi" && kartu("d-enam-sisi") === "Segi enam punya 6 sisi", "ringkas D: kartu tabel dan banyak sisi (dihitung)");
  sama(Object.keys(ringkas.subBab), ["A", "B", "C", "D"], "ringkas: gelombang ini sub-bab A, B, C, dan D");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
