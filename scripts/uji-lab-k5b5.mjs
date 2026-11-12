// Uji Simulasi Kelas 5 Bab 5 (Luas Daerah Bangun Datar): Lab Petak (Sub-Bab A), mesin, skenario, misi, gerbang,
// data ringkas, pengeja, dan konsep sub-bab berikutnya tidak bocor ke Sub-Bab A.
// Jalankan: node --no-warnings scripts/uji-lab-k5b5.mjs
import { readFileSync } from "node:fs";
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K5 from "../src/components/modul/misi-k5bab5.ts";
import * as TK from "../src/components/modul/misi-teks-k5b5.ts";
import * as A from "../src/components/modul/lab-petak-k5b5a.ts";
import * as R from "../src/components/modul/lab-rumus-k5b5b.ts";
import * as G_ from "../src/components/modul/lab-gabungan-k5b5c.ts";
import * as D_ from "../src/components/modul/lab-kawat-k5b5d.ts";
import * as MS from "../src/components/modul/mesin-data-k5b5.ts";
import * as SK from "../src/components/modul/skenario-k5b5.ts";
import * as ME from "../src/components/modul/mesin-bertahap-k3b1.ts";
import * as EJ from "../src/components/modul/eja-k5b5.ts";
import * as EJ1 from "../src/components/modul/eja-k5b1.ts";
import * as D from "../src/components/modul/data-k5b5.ts";

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
const tanpaAngka = (t) => !/\d/.test(EJ.ejaK5B5(t));
const L = A.langkahPetakK5B5A;
const x0 = A.awalPetakK5B5A();
const LR = R.langkahRumusK5B5B;
const r0 = R.awalRumusK5B5B();

/* ------------------------------ Hitungan MANDIRI (cara berbeda) ------------------------------ */
// Kode mengalikan dan menjumlah. Di sini luas dihitung dengan mencacah petak satu per satu, atau dengan penjumlahan
// berulang, dan pemindahan petak dihitung dengan himpunan petak di kisi yang dibangun dari bawah ke atas.
const petakMandiri = (w, h) => {
  let n = 0;
  for (let j = 0; j < h; j += 1) for (let i = 0; i < w; i += 1) n += 1;
  return n;
};
const ulangTambah = (a, kali) => {
  let n = 0;
  for (let i = 0; i < kali; i += 1) n += a;
  return n;
};
const kisiMandiri = (tumpuk, r, c) => {
  const H = Math.max(r, ...tumpuk);
  const S = new Set();
  const R = new Set();
  tumpuk.forEach((t, k) => {
    for (let n = 0; n < t; n += 1) S.add(`${H - 1 - n},${k}`);
  });
  for (let n = 0; n < r; n += 1) for (let k = 0; k < c; k += 1) R.add(`${H - 1 - n},${k}`);
  const lebih = [...S].filter((p) => !R.has(p)).sort();
  const lubang = [...R].filter((p) => !S.has(p)).sort();
  return { H, S, R, lebih, lubang };
};
const ke = (p) => p.split(",").map(Number);
const urutan = (a) => [...a].sort();

/* ------------------------------ Pengeja ------------------------------ */
{
  sama(EJ.ejaK5B5("10 cm²"), "sepuluh sentimeter persegi", "eja sentimeter persegi");
  sama(EJ.ejaK5B5("12 m²"), "dua belas meter persegi", "eja meter persegi");
  sama(EJ.ejaK5B5("luas dalam cm² atau m²"), "luas dalam sentimeter persegi atau meter persegi", "eja satuan tanpa angka");
  sama(EJ.ejaK5B5("16 cm"), "enam belas sentimeter", "eja sentimeter");
  sama(EJ.ejaK5B5("20 m"), "dua puluh meter", "eja meter");
  sama(EJ.ejaK5B5("3 dm"), "tiga desimeter", "eja desimeter");
  sama(EJ.ejaK5B5("½ × 6 × 4 = 12"), "setengah dikali enam dikali empat sama dengan dua belas", "eja setengah");
  sama(EJ.ejaK5B5("(5 + 3) × 4 ÷ 2 = 16"), "kurung buka lima ditambah tiga kurung tutup dikali empat dibagi dua sama dengan enam belas", "eja kurung dan tanda hitung");
  sama(EJ.ejaK5B5("5 × 2 = 10 cm²"), "lima dikali dua sama dengan sepuluh sentimeter persegi", "eja perkalian dengan satuan");
  sama(EJ.ejaK5B5("1 m × 1 m = 1 m²"), "satu meter dikali satu meter sama dengan satu meter persegi", "eja satu meter");
  sama(EJ.ejaK5B5("isi 15 petak …"), "isi lima belas petak titik-titik", "eja petak dan titik-titik");
  let samaKata = true;
  for (let n = 0; n <= 1200; n += 1) if (EJ.kataK5B5(n) !== EJ1.kataK5B1(n)) samaKata = false;
  cek(samaKata && EJ.kataK5B5(999999) === EJ1.kataK5B1(999999), "kata bilangan sama dengan kataK5B1 (0 sampai 1200 dan 999.999)");
  let semuaKata = true;
  for (let n = 0; n <= 200; n += 1) {
    if (/\d/.test(EJ.ejaK5B5(`${n} cm² dan ${n} m² dan ${n} cm`))) semuaKata = false;
    if (EJ.ejaK5B5(`${n} cm²`) !== `${EJ1.kataK5B1(n)} sentimeter persegi` || EJ.ejaK5B5(`${n} m²`) !== `${EJ1.kataK5B1(n)} meter persegi`) semuaKata = false;
  }
  cek(semuaKata, "semua bilangan 0 sampai 200 dengan cm², m², dan cm dieja menjadi kata");
  cek(!/[²½]/.test(EJ.ejaK5B5("cm² m² ½ 3 m² ½ × 2")), "² dan ½ tidak tersisa setelah dieja");
}

/* ------------------------------ Data sama dengan buku ------------------------------ */
{
  const naskah = readFileSync(new URL("../src/components/modul/naskah-k5b5.ts", import.meta.url), "utf8");
  const hitungBuku = D.RONDE_HITUNG_CA.flat();
  cek(D.ANGKA_BUKU.pp52 === 10 && hitungBuku.some((r) => r.p === 5 && r.l === 2 && r.hasil === 10), "Tutup: 5 dan 2 sama dengan 10 dari data buku");
  cek(hitungBuku.some((r) => r.p === 3 && r.l === 3 && r.hasil === 9), "Tutup: 3 dan 3 sama dengan 9 dari data buku");
  cek(hitungBuku.some((r) => r.p === 4 && r.l === 2 && r.hasil === 8), "Baris: 4 dan 2 sama dengan 8 dari data buku");
  cek(hitungBuku.some((r) => r.p === 6 && r.l === 3 && r.hasil === 18), "Baris: 6 dan 3 sama dengan 18 dari data buku");
  cek(hitungBuku.some((r) => r.p === 5 && r.l === 4 && r.hasil === 20), "Baris: 5 dan 4 sama dengan 20 dari data buku");
  for (const d of A.DATA_TUTUP) {
    const r = hitungBuku.find((v) => v.p === d.w && v.l === d.h);
    cek(!!r && r.hasil === petakMandiri(d.w, d.h), `Tutup ${d.w} dan ${d.h}: data buku sama dengan cacah petak`);
  }
  for (const s of A.DATA_BARIS) {
    const r = hitungBuku.find((v) => v.p === s.r && v.l === s.k) ?? hitungBuku.find((v) => v.p === s.k && v.l === s.r);
    cek(!!r && r.hasil === ulangTambah(s.k, s.r), `Baris ${s.r} dan ${s.k}: data buku sama dengan penjumlahan berulang`);
  }
  cek(D.RONDE_HITUNG_CA.flat().length >= 6 && naskah.includes("Alun-Alun") && naskah.includes("Yohana") && naskah.includes("Array Model"), "naskah memuat Alun-Alun, Yohana, dan Array Model");
  cek(D.RONDE_ARTI_CA.flat().some((r) => /luas tidak berubah/.test(r.jawab)), "data buku memuat luas tidak berubah (cara Yohana)");
}

/* ------------------------------ Lab A: Petak ------------------------------ */
{
  cek(x0.pernah.length === 0 && x0.pesan === "" && x0.tutup.petak.every((v) => v === 0) && !x0.tutup.rapat && x0.baris.r === 1 && x0.baris.k === 1, "awal: kosong, belum ada riwayat");
  cek(A.DATA_TUTUP.length === 3 && A.DATA_BARIS.length === 3 && A.DATA_POTONG.length === 2, "tiga daerah Tutup, tiga tugas Baris, dua bangun Potong");

  // Tutup.
  const letakT = [];
  const tutupSemua = (i, kecuali = []) => {
    const d = A.DATA_TUTUP[i];
    const aksi = [{ t: "T_DATA", i }];
    for (let ru = 0; ru < d.h; ru += 1) for (let k = 0; k < d.w; k += 1) if (!kecuali.includes(ru * d.w + k)) aksi.push({ t: "T_PETAK", ru, k });
    return aksi;
  };
  for (const [i, d] of A.DATA_TUTUP.entries()) {
    const nama = `${d.w} dan ${d.h}`;
    const luas = petakMandiri(d.w, d.h);
    const total = d.w * d.h;
    const o = A.opsiTutup(i);
    cek(A.luasTutup(d) === luas && luas === ulangTambah(d.w, d.h), `Tutup ${nama}: luas ${luas} (cacah petak dan penjumlahan berulang)`);
    cek(o.length === 3 && new Set(o).size === 3 && o.filter((v) => v === luas).length === 1 && o.every((v) => Number.isInteger(v) && v > 0), `Tutup ${nama}: tiga pilihan unik, satu benar`);
    cek(o.includes(d.w + d.h) && o.includes(2 * (d.w + d.h)) && d.w + d.h !== luas && 2 * (d.w + d.h) !== luas, `Tutup ${nama}: pengecoh baris ditambah kolom dan jumlah tepi, keduanya salah`);
    letakT.push(o.indexOf(luas));
    cek(d.sat === "cm²" || d.sat === "m²", `Tutup ${nama}: satuan luas persegi`);
    const xt = L(x0, { t: "T_DATA", i });
    cek(/Ketuk petak/.test(L(xt, { t: "T_PERIKSA" }).pesan) && !L(xt, { t: "T_PERIKSA" }).tutup.rapat, `Tutup ${nama}: periksa tanpa petak diminta mengetuk`);
    // Luas sebelum rapat ditolak, walau nilainya benar.
    for (const v of o) {
      const s = L(xt, { t: "T_LUAS", nilai: v });
      cek(s.pernah.length === 0 && /Tutup dulu/.test(s.pesan) && !s.pesan.startsWith("✅"), `Tutup ${nama}: luas ${v} sebelum menutup ditolak`);
    }
    // Hampir rapat: tiap petak yang dilewatkan ditolak.
    for (let n = 0; n < total; n += 1) {
      const hampir = jalan(x0, L, tutupSemua(i, [n]));
      const periksa = L(hampir, { t: "T_PERIKSA" });
      cek(!periksa.tutup.rapat && periksa.pesan.includes("Masih ada celah: 1 petak"), `Tutup ${nama}: petak ke-${n + 1} terlewat, ada celah`);
      cek(L(periksa, { t: "T_LUAS", nilai: luas }).pernah.length === 0, `Tutup ${nama}: celah ${n + 1} lalu luas benar tidak memenuhi`);
    }
    const penuh = jalan(x0, L, tutupSemua(i));
    cek(A.tertutup(penuh) === total && !penuh.tutup.rapat && penuh.pernah.length === 0, `Tutup ${nama}: semua petak diketuk tetapi belum diperiksa`);
    cek(L(penuh, { t: "T_LUAS", nilai: luas }).pernah.length === 0, `Tutup ${nama}: luas benar tanpa periksa tidak memenuhi`);
    const rapat = L(penuh, { t: "T_PERIKSA" });
    cek(rapat.tutup.rapat && rapat.pesan.startsWith("✅") && rapat.pernah.length === 0, `Tutup ${nama}: rapat diterima, belum tercatat`);
    for (const v of o.filter((v) => v !== luas)) {
      const s = L(rapat, { t: "T_LUAS", nilai: v });
      cek(s.pernah.length === 0 && !s.pesan.startsWith("✅"), `Tutup ${nama}: luas ${v} ditolak`);
      cek(/jumlah panjang tepi/.test(s.pesan) === (v === 2 * (d.w + d.h)) && /satu baris ditambah satu kolom/.test(s.pesan) === (v === d.w + d.h), `Tutup ${nama}: luas ${v} dijelaskan tepat`);
    }
    const benar = L(rapat, { t: "T_LUAS", nilai: luas });
    cek(benar.pernah.includes(`tutup:${i}`) && benar.pesan.startsWith("✅") && benar.pesan.includes(`${luas} ${d.sat}`) && benar.pesan.includes(`${d.h} baris, tiap baris ${d.w} petak`), `Tutup ${nama}: luas ${luas} tercatat`);
    // Membuka satu petak setelah rapat membatalkan pemeriksaan.
    const buka = L(rapat, { t: "T_PETAK", ru: 0, k: 0 });
    cek(!buka.tutup.rapat && L(buka, { t: "T_LUAS", nilai: luas }).pernah.length === 0, `Tutup ${nama}: membuka petak membatalkan rapat`);
    cek(L(rapat, { t: "T_LUAS", nilai: 999 }) === rapat && L(xt, { t: "T_LUAS", nilai: 999 }) === xt, `Tutup ${nama}: luas di luar pilihan diabaikan`);
    cek(L(xt, { t: "T_PETAK", ru: d.h, k: 0 }) === xt && L(xt, { t: "T_PETAK", ru: 0, k: d.w }) === xt && L(xt, { t: "T_PETAK", ru: -1, k: 0 }) === xt && L(xt, { t: "T_PETAK", ru: 0.5, k: 0 }) === xt, `Tutup ${nama}: petak di luar batas diabaikan`);
    const dua = L(L(xt, { t: "T_PETAK", ru: 0, k: 0 }), { t: "T_PETAK", ru: 0, k: 0 });
    cek(A.tertutup(dua) === 0, `Tutup ${nama}: ketuk dua kali melepas petak`);
    cek(A.tertutup(L(benar, { t: "T_DATA", i: (i + 1) % 3 })) === 0 && L(benar, { t: "T_DATA", i: (i + 1) % 3 }).pernah.includes(`tutup:${i}`), `Tutup ${nama}: ganti daerah mengosongkan petak, riwayat tetap`);
  }
  cek(new Set(letakT).size === 3, `Tutup: letak luas benar bervariasi (${letakT.join("")})`);
  cek(L(x0, { t: "T_DATA", i: 3 }) === x0 && L(x0, { t: "T_DATA", i: -1 }) === x0, "Tutup: daerah di luar batas diabaikan");

  // Baris.
  const letakB = [];
  const susun = (i, r, k) => [
    { t: "B_DATA", i },
    ...Array.from({ length: r - 1 }, () => ({ t: "B_BARIS", d: 1 })),
    ...Array.from({ length: k - 1 }, () => ({ t: "B_KOLOM", d: 1 })),
  ];
  for (const [i, s] of A.DATA_BARIS.entries()) {
    const nama = `${s.r} baris dan ${s.k} kolom`;
    const luas = ulangTambah(s.k, s.r);
    const o = A.opsiBaris(i);
    cek(A.luasBaris(s) === luas && luas === petakMandiri(s.k, s.r), `Baris ${nama}: ${luas} petak (penjumlahan berulang dan cacah)`);
    cek(o.length === 3 && new Set(o).size === 3 && o.filter((v) => v === luas).length === 1 && o.every((v) => Number.isInteger(v) && v > 0), `Baris ${nama}: tiga pilihan unik, satu benar`);
    cek(o.includes(s.r + s.k) && o.includes(s.r * s.r) && s.r + s.k !== luas && s.r * s.r !== luas, `Baris ${nama}: pengecoh baris ditambah kolom dan baris dikali baris, keduanya salah`);
    letakB.push(o.indexOf(luas));
    const xb = L(x0, { t: "B_DATA", i });
    // Susunan yang salah ditolak, apa pun pilihannya.
    for (let r = 1; r <= 8; r += 1) {
      for (let k = 1; k <= 8; k += 1) {
        if (r === s.r && k === s.k) continue;
        if (!((r + k) % 3 === 0 || r === s.r || k === s.k || (r === s.k && k === s.r))) continue;
        const salah = jalan(x0, L, susun(i, r, k));
        const t = L(salah, { t: "B_LUAS", nilai: luas });
        cek(t.pernah.length === 0 && /Atur dulu susunannya/.test(t.pesan) && salah.baris.r === r && salah.baris.k === k, `Baris ${nama}: susunan ${r} dan ${k} dengan luas benar ditolak`);
      }
    }
    const tepat = jalan(x0, L, susun(i, s.r, s.k));
    cek(tepat.baris.r === s.r && tepat.baris.k === s.k && tepat.pernah.length === 0, `Baris ${nama}: susunan sesuai, belum tercatat`);
    for (const v of o.filter((v) => v !== luas)) {
      const t = L(tepat, { t: "B_LUAS", nilai: v });
      cek(t.pernah.length === 0 && !t.pesan.startsWith("✅"), `Baris ${nama}: banyak petak ${v} ditolak`);
      cek(/baris ditambah kolom/.test(t.pesan) === (v === s.r + s.k) && /baris dikali baris/.test(t.pesan) === (v === s.r * s.r), `Baris ${nama}: ${v} dijelaskan tepat`);
    }
    const benar = L(tepat, { t: "B_LUAS", nilai: luas });
    cek(benar.pernah.includes(`baris:${i}`) && benar.pesan.startsWith("✅") && benar.pesan.includes(`${s.r} × ${s.k} = ${luas} petak`), `Baris ${nama}: ${luas} petak tercatat`);
    cek(L(tepat, { t: "B_LUAS", nilai: 999 }) === tepat, `Baris ${nama}: nilai di luar pilihan diabaikan`);
    cek(L(benar, { t: "B_DATA", i: (i + 1) % 3 }).baris.r === 1 && L(benar, { t: "B_DATA", i: (i + 1) % 3 }).pernah.includes(`baris:${i}`), `Baris ${nama}: ganti tugas mengembalikan satu baris satu kolom, riwayat tetap`);
    cek(xb.baris.r === 1 && xb.baris.k === 1, `Baris ${nama}: mulai dari satu baris satu kolom`);
  }
  cek(new Set(letakB).size === 3, `Baris: letak banyak petak benar bervariasi (${letakB.join("")})`);
  {
    cek(L(x0, { t: "B_BARIS", d: -1 }) === x0 && L(x0, { t: "B_KOLOM", d: -1 }) === x0, "Baris: tidak bisa kurang dari satu");
    cek(L(x0, { t: "B_BARIS", d: 2 }) === x0 && L(x0, { t: "B_KOLOM", d: 0 }) === x0, "Baris: langkah selain satu diabaikan");
    const penuh = jalan(x0, L, susun(0, A.MAKS_BARIS, A.MAKS_BARIS));
    cek(penuh.baris.r === 8 && penuh.baris.k === 8 && /paling banyak/.test(L(penuh, { t: "B_BARIS", d: 1 }).pesan) && L(penuh, { t: "B_BARIS", d: 1 }).baris.r === 8 && L(penuh, { t: "B_KOLOM", d: 1 }).baris.k === 8, "Baris: paling banyak delapan baris dan delapan kolom");
    cek(L(x0, { t: "B_DATA", i: 3 }) === x0 && L(x0, { t: "B_DATA", i: -1 }) === x0, "Baris: tugas di luar batas diabaikan");
  }

  // Potong.
  for (const [i, d] of A.DATA_POTONG.entries()) {
    const nama = d.nama;
    const m = kisiMandiri(d.tumpuk, d.r, d.c);
    const luas = m.S.size;
    const xp = L(x0, { t: "PO_DATA", i });
    cek(m.S.size === m.R.size && m.R.size === ulangTambah(d.c, d.r) && luas === d.tumpuk.reduce((s, v) => s + v, 0), `Potong ${nama}: luas ${luas}, sama dengan persegi panjang ${d.r} dan ${d.c}`);
    sama(urutan(xp.potong.petak), urutan([...m.S]), `Potong ${nama}: petak awal sama dengan kisi mandiri`);
    cek(m.lebih.length > 0 && m.lebih.length === m.lubang.length && A.menonjol(d, xp.potong.petak) === m.lebih.length, `Potong ${nama}: ${m.lebih.length} petak menonjol, ${m.lubang.length} lubang`);
    cek(A.luasPotong(d) === luas && A.barisKisi(d) === m.H && A.lebarKisi(d) === Math.max(d.c, d.tumpuk.length), `Potong ${nama}: luas dan ukuran kisi`);
    // Salah ambil: petak pas, lubang, di luar kisi.
    for (const p of [...m.S].filter((p) => m.R.has(p))) {
      const [ru, k] = ke(p);
      const t = L(xp, { t: "PO_AMBIL", ru, k });
      cek(t.potong.pilih === null && /sudah pas/.test(t.pesan) && !t.pesan.startsWith("✅") && t.pernah.length === 0, `Potong ${nama}: mengambil petak pas (${p}) ditolak`);
    }
    for (const p of m.lubang) {
      const [ru, k] = ke(p);
      const t = L(xp, { t: "PO_AMBIL", ru, k });
      cek(t.potong.pilih === null && /lubang, bukan petak/.test(t.pesan), `Potong ${nama}: mengambil lubang (${p}) ditolak`);
      cek(/Ambil dulu/.test(L(xp, { t: "PO_TARUH", ru, k }).pesan) && L(xp, { t: "PO_TARUH", ru, k }).potong.petak.length === luas, `Potong ${nama}: menaruh sebelum mengambil ditolak`);
    }
    cek(L(xp, { t: "PO_AMBIL", ru: -1, k: 0 }) === xp && L(xp, { t: "PO_AMBIL", ru: 0, k: A.lebarKisi(d) }) === xp && L(xp, { t: "PO_TARUH", ru: A.barisKisi(d), k: 0 }) === xp && L(xp, { t: "PO_AMBIL", ru: 0.5, k: 0 }) === xp, `Potong ${nama}: petak di luar kisi diabaikan`);
    // Ambil petak menonjol lalu salah menaruh.
    const [ru1, k1] = ke(m.lebih[0]);
    const ambil = L(xp, { t: "PO_AMBIL", ru: ru1, k: k1 });
    cek(ambil.potong.pilih === m.lebih[0] && ambil.pesan.startsWith("✅") && ambil.pernah.length === 0, `Potong ${nama}: petak menonjol ${m.lebih[0]} diambil`);
    const sudahIsi = [...m.S].find((p) => m.R.has(p));
    {
      const [a, b] = ke(sudahIsi);
      const t = L(ambil, { t: "PO_TARUH", ru: a, k: b });
      cek(t.potong.pilih === m.lebih[0] && t.potong.petak.length === luas && /sudah terisi/.test(t.pesan), `Potong ${nama}: menaruh di tempat terisi ditolak`);
      const luar = [...m.S].filter((p) => !m.R.has(p) && p !== m.lebih[0])[0];
      if (luar) {
        const [c1, c2] = ke(luar);
        cek(/di dalam garis putus/.test(L(ambil, { t: "PO_TARUH", ru: c1, k: c2 }).pesan) && L(ambil, { t: "PO_TARUH", ru: c1, k: c2 }).potong.petak.length === luas, `Potong ${nama}: menaruh di luar garis putus ditolak`);
      }
      const [e, f] = [0, A.lebarKisi(d) - 1];
      const kosongLuar = m.R.has(`${e},${f}`) || m.S.has(`${e},${f}`);
      if (!kosongLuar) cek(/di dalam garis putus/.test(L(ambil, { t: "PO_TARUH", ru: e, k: f }).pesan), `Potong ${nama}: sel kosong di luar garis ditolak`);
    }
    // Selesaikan dengan memasangkan petak menonjol dan lubang.
    let s = xp;
    for (let n = 0; n < m.lebih.length; n += 1) {
      const [pa, pb] = ke(m.lebih[n]);
      const [qa, qb] = ke(m.lubang[n]);
      s = L(s, { t: "PO_AMBIL", ru: pa, k: pb });
      s = L(s, { t: "PO_TARUH", ru: qa, k: qb });
      cek(s.potong.petak.length === luas && new Set(s.potong.petak).size === luas && s.potong.pilih === null, `Potong ${nama}: luas tetap ${luas} setelah pemindahan ke-${n + 1}`);
      if (n < m.lebih.length - 1) cek(s.pernah.length === 0 && new RegExp(`Tinggal ${m.lebih.length - n - 1} petak`).test(s.pesan) && s.pesan.startsWith("✅"), `Potong ${nama}: setelah pemindahan ke-${n + 1} belum selesai`);
    }
    cek(s.pernah.includes(`potong:${i}`) && s.pesan.startsWith("✅") && s.pesan.includes(`persegi panjang ${d.r} baris dan ${d.c} kolom`) && s.pesan.includes(`Luas tetap ${luas} petak`) && A.menonjol(d, s.potong.petak) === 0, `Potong ${nama}: selesai tercatat, luas tetap ${luas}`);
    sama(urutan(s.potong.petak), urutan([...m.R]), `Potong ${nama}: hasil sama dengan persegi panjang ${d.r} dan ${d.c}`);
    // Pemindahan satu per satu bisa dalam urutan terbalik.
    let balik = xp;
    for (let n = m.lebih.length - 1; n >= 0; n -= 1) {
      const [pa, pb] = ke(m.lebih[n]);
      const [qa, qb] = ke(m.lubang[(n + 1) % m.lubang.length]);
      balik = L(L(balik, { t: "PO_AMBIL", ru: pa, k: pb }), { t: "PO_TARUH", ru: qa, k: qb });
    }
    cek(balik.pernah.includes(`potong:${i}`), `Potong ${nama}: urutan pemindahan bebas, tetap selesai`);
    cek(L(s, { t: "PO_DATA", i }).potong.petak.length === luas && A.menonjol(d, L(s, { t: "PO_DATA", i }).potong.petak) === m.lebih.length && L(s, { t: "PO_DATA", i }).pernah.includes(`potong:${i}`), `Potong ${nama}: mulai lagi mengembalikan bangun, riwayat tetap`);
    // Tanpa selesai: sebagian saja tidak tercatat.
    if (m.lebih.length > 1) {
      const sebagian = L(L(xp, { t: "PO_AMBIL", ru: ru1, k: k1 }), { t: "PO_TARUH", ru: ke(m.lubang[0])[0], k: ke(m.lubang[0])[1] });
      cek(sebagian.pernah.length === 0, `Potong ${nama}: sebagian dipindah tidak tercatat`);
    }
  }
  cek(L(x0, { t: "PO_DATA", i: 2 }) === x0 && L(x0, { t: "PO_DATA", i: -1 }) === x0, "Potong: bangun di luar batas diabaikan");

  // Fuzz.
  const acak = acakDari(53);
  let s = x0;
  let ok = true;
  const pesanSemua = new Set();
  const riwayatSemua = new Set();
  const ID = /^(tutup:[0-2]|baris:[0-2]|potong:[0-1])$/;
  for (let i = 0; i < 20000; i += 1) {
    const p = acak(27);
    const dt = A.dataTutup(s);
    const dp = A.dataPotong(s);
    const mp = kisiMandiri(dp.tumpuk, dp.r, dp.c);
    const lebihKini = s.potong.petak.filter((v) => !mp.R.has(v));
    const lubangKini = [...mp.R].filter((v) => !s.potong.petak.includes(v));
    const unsur = (a, n) => ke(a[n % Math.max(a.length, 1)] ?? "0,0");
    const a =
      p === 0 ? { t: "T_DATA", i: acak(4) } :
      p <= 3 ? { t: "T_PETAK", ru: acak(dt.h + 1), k: acak(dt.w + 1) } :
      p === 4 ? { t: "T_PERIKSA" } :
      p === 5 ? { t: "T_LUAS", nilai: acak(6) === 0 ? 99 : A.opsiTutup(s.tutup.data)[acak(3)] } :
      p === 6 ? { t: "T_LUAS", nilai: A.luasTutup(dt) } :
      p === 7 ? { t: "B_DATA", i: acak(4) } :
      p === 8 || p === 9 ? { t: "B_BARIS", d: acak(3) - 1 } :
      p === 10 || p === 11 ? { t: "B_KOLOM", d: acak(3) - 1 } :
      p === 12 ? { t: "B_LUAS", nilai: acak(6) === 0 ? 99 : A.opsiBaris(s.baris.data)[acak(3)] } :
      p === 13 ? { t: "B_LUAS", nilai: A.luasBaris(A.dataBaris(s)) } :
      p === 14 ? { t: "PO_DATA", i: acak(3) } :
      p === 15 ? { t: "PO_AMBIL", ru: acak(A.barisKisi(dp) + 1) - (acak(8) === 0 ? 1 : 0), k: acak(A.lebarKisi(dp) + 1) } :
      p === 16 ? { t: "PO_TARUH", ru: acak(A.barisKisi(dp) + 1), k: acak(A.lebarKisi(dp) + 1) } :
      p === 17 || p === 18 ? { t: "PO_AMBIL", ru: unsur(lebihKini, acak(5))[0], k: unsur(lebihKini, acak(5))[1] } :
      p === 19 || p === 20 ? { t: "PO_TARUH", ru: unsur(lubangKini, acak(5))[0], k: unsur(lubangKini, acak(5))[1] } :
      p === 21 || p === 22 ? { t: "T_PETAK", ru: Math.floor(Math.max(0, s.tutup.petak.indexOf(0)) / dt.w), k: Math.max(0, s.tutup.petak.indexOf(0)) % dt.w } :
      p === 23 ? { t: "B_BARIS", d: Math.sign(A.dataBaris(s).r - s.baris.r) || (acak(2) ? 1 : -1) } :
      p === 24 ? { t: "B_KOLOM", d: Math.sign(A.dataBaris(s).k - s.baris.k) || (acak(2) ? 1 : -1) } :
      acak(40) === 0 ? { t: "RESET" } : { t: "PESAN_KOSONG" };
    // Pilihan sel ambil/taruh sengaja dipilih dari yang sah, supaya jalan sampai selesai bisa terjadi.
    const t = L(s, a);
    if (a.t !== "RESET" && !s.pernah.every((v) => t.pernah.includes(v))) ok = false;
    const dtt = A.dataTutup(t);
    if (!(t.tutup.data >= 0 && t.tutup.data < 3 && t.tutup.petak.length === dtt.w * dtt.h && t.tutup.petak.every((v) => v === 0 || v === 1))) ok = false;
    if (t.tutup.rapat && A.tertutup(t) !== dtt.w * dtt.h) ok = false;
    if (!(t.baris.data >= 0 && t.baris.data < 3 && t.baris.r >= 1 && t.baris.r <= 8 && t.baris.k >= 1 && t.baris.k <= 8)) ok = false;
    const dpt = A.dataPotong(t);
    const mpt = kisiMandiri(dpt.tumpuk, dpt.r, dpt.c);
    if (!(t.potong.data >= 0 && t.potong.data < 2 && t.potong.petak.length === mpt.S.size && new Set(t.potong.petak).size === mpt.S.size)) ok = false;
    if (t.potong.pilih !== null && !(t.potong.petak.includes(t.potong.pilih) && !mpt.R.has(t.potong.pilih))) ok = false;
    for (const id of t.pernah) if (!ID.test(id)) ok = false;
    // Riwayat hanya bila sungguh tercapai.
    for (const id of t.pernah) {
      if (s.pernah.includes(id)) continue;
      const [jenis, n] = id.split(":");
      const nn = Number(n);
      if (jenis === "tutup" && !(t.tutup.data === nn && t.tutup.rapat && A.tertutup(t) === A.DATA_TUTUP[nn].w * A.DATA_TUTUP[nn].h)) ok = false;
      if (jenis === "baris" && !(t.baris.data === nn && t.baris.r === A.DATA_BARIS[nn].r && t.baris.k === A.DATA_BARIS[nn].k)) ok = false;
      if (jenis === "potong" && !(t.potong.data === nn && A.menonjol(dpt, t.potong.petak) === 0)) ok = false;
    }
    if (t.pesan) pesanSemua.add(t.pesan);
    for (const id of t.pernah) riwayatSemua.add(id);
    s = t;
  }
  cek(ok, "fuzz 20.000 aksi Lab Petak: batas terjaga, luas tetap, riwayat tidak dicabut dan hanya bila tercapai");
  cek(pesanSemua.size > 30 && [...pesanSemua].every(tanpaAngka), `fuzz Lab Petak: semua ${pesanSemua.size} pesan dieja menjadi kata`);
  cek(riwayatSemua.size >= 6, `fuzz Lab Petak: riwayat terkumpul (${[...riwayatSemua].sort().join(" ")})`);
  globalThis.__pesanA = [...pesanSemua];
}

/* ------------------------------ Mesin ------------------------------ */
{
  for (const def of MS.SEMUA_MESIN_K5B5) {
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
    cek(x.selesai && def.selesaiId === { "mesin-petak-k5b5": K5.ID_MESIN_K5B5.A, "mesin-rumus-k5b5": K5.ID_MESIN_K5B5.B, "mesin-gabungan-k5b5": K5.ID_MESIN_K5B5.C, "mesin-kawat-k5b5": K5.ID_MESIN_K5B5.D }[def.id], `${def.id}: bisa diselesaikan, id selesai sesuai misi`);
  }
  const angka = (o) => Number(o.split(" ")[0]);
  for (const [i, k] of MS.KASUS_PETAK.entries()) {
    const c = MS.MESIN_PETAK.kasus[i];
    const [tutup, baris, satuan, potong] = c.langkah;
    // Tutup: cacah petak.
    const lt = petakMandiri(k.tutup.p, k.tutup.l);
    cek(tutup.benar === `${lt} petak` && tutup.tanya.includes(`${k.tutup.p} petak tiap baris dan ada ${k.tutup.l} baris`) && MS.luasDaerah(k.tutup.p, k.tutup.l) === lt, `Mesin ${k.id}: tutup ${lt} petak (cacah)`);
    cek(tutup.opsi.includes(`${k.tutup.p + k.tutup.l} petak`) && tutup.opsi.every((o) => o === tutup.benar || angka(o) !== lt) && tutup.opsi.every((o) => angka(o) > 0), `Mesin ${k.id}: pengecoh tutup salah (baris ditambah kolom)`);
    // Baris: penjumlahan berulang.
    const lb = ulangTambah(k.baris.k, k.baris.r);
    cek(baris.benar === `${lb} petak` && baris.tanya.includes(`${k.baris.r} baris dan ${k.baris.k} kolom`), `Mesin ${k.id}: baris ${lb} petak (penjumlahan berulang)`);
    cek(baris.opsi.includes(`${k.baris.r + k.baris.k} petak`) && baris.opsi.every((o) => o === baris.benar || angka(o) !== lb) && baris.opsi.every((o) => angka(o) > 0), `Mesin ${k.id}: pengecoh baris salah`);
    // Satuan.
    const ls = petakMandiri(k.satuan.p, k.satuan.l);
    const panjang = k.satuan.sat === "cm²" ? "cm" : "m";
    cek(satuan.benar === `${ls} ${k.satuan.sat}` && satuan.tanya.includes(`${k.satuan.p} ubin ke samping dan ${k.satuan.l} ubin ke bawah`), `Mesin ${k.id}: luas ${ls} ${k.satuan.sat}`);
    cek(satuan.opsi.includes(`${ls} ${panjang}`) && satuan.opsi.includes(`${k.satuan.p + k.satuan.l} ${k.satuan.sat}`) && k.satuan.p + k.satuan.l !== ls && satuan.opsi.filter((o) => o.endsWith("²")).length === 2, `Mesin ${k.id}: pengecoh satuan panjang dan jumlah panjang`);
    // Potong: himpunan petak.
    const m = kisiMandiri(k.potong.tumpuk, k.potong.r, k.potong.c);
    cek(m.S.size === m.R.size && m.lebih.length === MS.petakDipindah(k.potong.tumpuk, k.potong.r) && m.lebih.length > 0, `Mesin ${k.id}: ${m.lebih.length} petak dipindah (himpunan petak)`);
    cek(potong.benar === `${m.S.size} petak` && potong.tanya.includes(k.potong.tumpuk.join(", ")) && potong.tanya.includes(`${k.potong.r} baris dan ${k.potong.c} kolom`), `Mesin ${k.id}: luas setelah dipindah ${m.S.size}`);
    cek(potong.opsi.includes(`${m.S.size - m.lebih.length} petak`) && potong.opsi.includes(`${m.S.size + m.lebih.length} petak`) && potong.opsi.every((o) => o === potong.benar || angka(o) !== m.S.size) && potong.opsi.every((o) => angka(o) > 0), `Mesin ${k.id}: pengecoh potong berkurang atau bertambah, keduanya salah`);
    cek(EJ.ejaK5B5(c.ringkas).includes(EJ.kataK5B5(lt)) && EJ.ejaK5B5(c.ringkas).includes(EJ.kataK5B5(lb)) && EJ.ejaK5B5(c.ringkas).includes(EJ.kataK5B5(ls)), `Mesin ${k.id}: ringkas dieja dengan hasil benar`);
  }
  sama(MS.KASUS_PETAK.map((k) => k.id), ["alun", "lukas", "yohana"], "Mesin: tiga kasus");
  sama(MS.KASUS_PETAK.map((k) => [k.tutup.p, k.tutup.l, k.baris.r, k.baris.k, k.satuan.p, k.satuan.l, k.satuan.sat, k.potong.tumpuk.join("-"), k.potong.r, k.potong.c]), [[5, 2, 3, 4, 6, 2, "m²", "2-3-1", 2, 3], [3, 3, 2, 5, 4, 3, "m²", "4-2-3", 3, 3], [4, 2, 5, 3, 3, 2, "cm²", "1-2-3-4", 2, 5]], "Mesin: data tiga kasus sesuai rancangan");
}

/* ------------------------------ Skenario ------------------------------ */
{
  const S = SK.SKENARIO_K5B5A;
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
  sama(S.id.replace(/-k5b5$/, ""), K5.ID_SKENARIO_K5B5.A, "id skenario sesuai id misi");
  const adegan = (id) => S.adegan.find((a) => a.id === id);
  const soal = adegan("ubin-lantai").soal;
  cek(soal[0].teks.includes("5 m dan 2 m") && soal[0].jawaban === String(petakMandiri(5, 2)) && soal[0].opsi.includes(String(5 + 2)) && soal[0].opsi.includes(String(2 * (5 + 2))) && soal[0].opsi.filter((o) => o !== soal[0].jawaban).every((o) => Number(o) !== 10), "A: kamar 5 m dan 2 m sama dengan 10 ubin, pengecoh 7 dan 14 salah");
  cek(soal[1].teks.includes("sisinya 3 m") && soal[1].jawaban === String(petakMandiri(3, 3)) && soal[1].opsi.includes("6") && soal[1].opsi.includes("12") && soal[1].opsi.filter((o) => o !== soal[1].jawaban).every((o) => Number(o) !== 9), "A: persegi sisi 3 m sama dengan 9 ubin, pengecoh 6 dan 12 salah");
  const pos = adegan("pos");
  cek(pos.jumlah === petakMandiri(4, 3) && pos.cerita.includes("4 m dan 3 m") && pos.sukses.includes("4 × 3 = 12"), "A: pos jaga 4 m dan 3 m sama dengan 12 ubin");
  const serambi = adegan("serambi");
  cek(serambi.target === petakMandiri(6, 3) && serambi.target <= serambi.maks && serambi.maks <= 20 && serambi.cerita.includes("6 m dan 3 m") && serambi.sukses.includes("6 × 3 = 18") && serambi.sukses.includes("18 m²"), "A: serambi 6 m dan 3 m sama dengan 18 ubin");
  const yohana = adegan("yohana");
  const my = kisiMandiri([1, 2, 3], 2, 3);
  const bb = yohana.opsi.find((o) => o.benar);
  cek(my.S.size === 6 && my.lebih.length === 1 && yohana.cerita.includes("6 petak") && yohana.cerita.includes("2 baris dan 3 kolom") && /tetap enam petak/.test(bb.teks) && yohana.opsi.filter((o) => !o.benar).every((o) => !/tetap/.test(o.teks)), "A: cara Yohana, 6 petak dipindah 1, luas tetap enam, pengecoh salah");
  const arti = adegan("arti").opsi.find((o) => o.benar);
  cek(/daerah di dalam batas bangun/.test(arti.teks) && adegan("arti").opsi.filter((o) => !o.benar).every((o) => !/daerah di dalam/.test(o.teks)), "A: arti luas daerah di dalam batas, pengecoh salah");
  const posisi = S.adegan.filter((a) => a.jenis === "pilih").map((a) => a.opsi.findIndex((o) => o.benar));
  cek(new Set(posisi).size === posisi.length, `A: letak jawaban pilih bervariasi (${posisi.join("")})`);
}

/* ------------------------------ Lab B: Rumus ------------------------------ */
// Hitungan mandiri Sub-Bab B: luas poligon dengan rumus tali sepatu (shoelace) dari titik sudut, bukan dengan rumus
// alas kali tinggi atau setengahnya yang dipakai kode.
const luasPoligon = (titik) => {
  let dua = 0;
  for (let i = 0; i < titik.length; i += 1) {
    const [x1, y1] = titik[i];
    const [x2, y2] = titik[(i + 1) % titik.length];
    dua += x1 * y2 - x2 * y1;
  }
  return Math.round((Math.abs(dua) / 2) * 1e6) / 1e6;
};
const poliJajar = (alas, t, m) => {
  const geser = Math.sqrt(m * m - t * t);
  return [[0, 0], [alas, 0], [alas + geser, t], [geser, t]];
};
const poliSegitiga = (a, t) => [[0, 0], [a, 0], [a / 3, t]];
const poliBelah = (d1, d2) => [[0, d2 / 2], [d1 / 2, 0], [d1, d2 / 2], [d1 / 2, d2]];
const poliLayang = (d1, d2) => [[0, d2 / 3], [d1 / 2, 0], [d1, d2 / 3], [d1 / 2, d2]];
const poliTrap = (a, b, t) => [[0, 0], [a, 0], [a - (a - b) / 2, t], [(a - b) / 2, t]];
const sama_ = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const luasSetengahMandiri = (d) => luasPoligon(d.jenis === "segitiga" ? poliSegitiga(d.a, d.t) : d.jenis === "belah" ? poliBelah(d.a, d.t) : poliLayang(d.a, d.t));

{
  cek(r0.pernah.length === 0 && r0.pesan === "" && r0.kali.tinggiOk && !r0.setengah.ganda && !r0.trap.ganda && !r0.trap.alasOk, "B awal: kosong, belum ada riwayat");
  cek(R.DATA_KALI.length === 4 && R.DATA_SETENGAH.length === 3 && R.DATA_TRAP.length === 2, "B: empat bangun Kali, tiga bangun Setengah, dua trapesium");
  const letak = { kali: [], setengah: [], trap: [] };

  // Kali.
  for (const [i, d] of R.DATA_KALI.entries()) {
    const nama = d.nama;
    const luas = d.jenis === "jajar" ? luasPoligon(poliJajar(d.alas, d.tinggi, d.miring)) : petakMandiri(d.alas, d.tinggi);
    const o = R.opsiKali(i);
    cek(R.luasKali(d) === luas && luas === ulangTambah(d.alas, d.tinggi), `Kali ${nama}: luas ${luas} (titik sudut dan penjumlahan berulang)`);
    cek(d.jenis === "jajar" ? d.miring > d.tinggi && Number.isInteger(d.miring) : d.miring === null, `Kali ${nama}: sisi miring hanya pada jajargenjang dan lebih panjang dari tinggi`);
    cek(d.jenis !== "persegi" || d.alas === d.tinggi, `Kali ${nama}: persegi punya alas sama dengan tinggi`);
    cek(o.length === 3 && new Set(o).size === 3 && o.filter((v) => v === luas).length === 1 && o.every((v) => Number.isInteger(v) && v > 0), `Kali ${nama}: tiga pilihan unik, satu benar`);
    cek(o.includes(d.alas + d.tinggi) && (d.jenis !== "jajar" || o.includes(d.alas * d.miring)) && d.alas + d.tinggi !== luas, `Kali ${nama}: pengecoh alas ditambah tinggi${d.jenis === "jajar" ? " dan sisi miring" : ""}, salah`);
    letak.kali.push(o.indexOf(luas));
    const xk = LR(r0, { t: "K_DATA", i });
    const ot = R.opsiTinggi(i);
    if (d.jenis === "jajar") {
      cek(ot.length === 2 && ot.includes(d.tinggi) && ot.includes(d.miring) && !xk.kali.tinggiOk, `Kali ${nama}: pilihan tinggi ${ot.join(" dan ")}, belum benar`);
      for (const v of o) {
        const s = LR(xk, { t: "K_LUAS", nilai: v });
        cek(s.pernah.length === 0 && /Pilih dulu tinggi/.test(s.pesan), `Kali ${nama}: luas ${v} sebelum memilih tinggi ditolak`);
      }
      const salah = LR(xk, { t: "K_TINGGI", nilai: d.miring });
      cek(!salah.kali.tinggiOk && /sisi miring/.test(salah.pesan) && !salah.pesan.startsWith("✅") && salah.pernah.length === 0, `Kali ${nama}: sisi miring ${d.miring} bukan tinggi`);
      cek(LR(salah, { t: "K_LUAS", nilai: luas }).pernah.length === 0, `Kali ${nama}: luas benar setelah memilih sisi miring tidak memenuhi`);
      cek(LR(xk, { t: "K_TINGGI", nilai: 99 }) === xk, `Kali ${nama}: tinggi di luar pilihan diabaikan`);
    } else {
      cek(ot.length === 0 && xk.kali.tinggiOk && LR(xk, { t: "K_TINGGI", nilai: d.tinggi }) === xk, `Kali ${nama}: tinggi langsung diketahui, tanpa pilihan`);
    }
    const siap = d.jenis === "jajar" ? LR(xk, { t: "K_TINGGI", nilai: d.tinggi }) : xk;
    cek(siap.kali.tinggiOk && (d.jenis !== "jajar" || (siap.pesan.startsWith("✅") && siap.pesan.includes(`Tinggi ${d.tinggi} cm`))), `Kali ${nama}: tinggi benar diterima`);
    for (const v of o.filter((v) => v !== luas)) {
      const s = LR(siap, { t: "K_LUAS", nilai: v });
      cek(s.pernah.length === 0 && !s.pesan.startsWith("✅"), `Kali ${nama}: luas ${v} ditolak`);
      cek(/sisi miring/.test(s.pesan) === (d.miring !== null && v === d.alas * d.miring) && /alas ditambah tinggi/.test(s.pesan) === (v === d.alas + d.tinggi), `Kali ${nama}: luas ${v} dijelaskan tepat`);
    }
    const benar = LR(siap, { t: "K_LUAS", nilai: luas });
    cek(benar.pernah.includes(`kali:${i}`) && benar.pesan.startsWith("✅") && benar.pesan.includes(`${d.alas} × ${d.tinggi} = ${luas} cm²`) && (d.jenis !== "jajar" || /digeser/.test(benar.pesan)), `Kali ${nama}: luas ${luas} tercatat`);
    cek(LR(siap, { t: "K_LUAS", nilai: 999 }) === siap, `Kali ${nama}: luas di luar pilihan diabaikan`);
    cek(LR(benar, { t: "K_DATA", i: (i + 1) % 4 }).pernah.includes(`kali:${i}`), `Kali ${nama}: ganti bangun, riwayat tetap`);
  }
  cek(new Set(letak.kali).size >= 3, `Kali: letak luas benar bervariasi (${letak.kali.join("")})`);
  cek(LR(r0, { t: "K_DATA", i: 4 }) === r0 && LR(r0, { t: "K_DATA", i: -1 }) === r0, "Kali: bangun di luar batas diabaikan");

  // Setengah.
  for (const [i, d] of R.DATA_SETENGAH.entries()) {
    const nama = d.nama;
    const luas = luasSetengahMandiri(d);
    const persegiPanjang = petakMandiri(d.a, d.t);
    const o = R.opsiSetengah(i);
    cek(persegiPanjang % 2 === 0 && R.luasSetengah(d) === luas && Number.isInteger(luas), `Setengah ${nama}: hasil kali ${persegiPanjang} genap, luas ${luas} (titik sudut)`);
    cek(R.luasPersegiPanjang(d) === persegiPanjang && luas * 2 === persegiPanjang, `Setengah ${nama}: dua bangun sama dengan persegi panjang ${persegiPanjang}`);
    cek(o.length === 3 && new Set(o).size === 3 && o.filter((v) => v === luas).length === 1 && o.every((v) => Number.isInteger(v) && v > 0), `Setengah ${nama}: tiga pilihan unik, satu benar`);
    cek(o.includes(persegiPanjang) && o.includes(d.a + d.t) && persegiPanjang !== luas && d.a + d.t !== luas, `Setengah ${nama}: pengecoh lupa setengah dan jumlah dua ukuran, salah`);
    letak.setengah.push(o.indexOf(luas));
    const xs = LR(r0, { t: "S_DATA", i });
    for (const v of o) {
      const s = LR(xs, { t: "S_LUAS", nilai: v });
      cek(s.pernah.length === 0 && /Susun dulu/.test(s.pesan), `Setengah ${nama}: luas ${v} sebelum menggandakan ditolak`);
    }
    const ganda = LR(xs, { t: "S_GANDA" });
    cek(ganda.setengah.ganda && ganda.pesan.startsWith("✅") && ganda.pesan.includes(`${d.a} × ${d.t} = ${persegiPanjang} cm²`) && ganda.pernah.length === 0, `Setengah ${nama}: menggandakan menjadi persegi panjang ${persegiPanjang}`);
    for (const v of o.filter((v) => v !== luas)) {
      const s = LR(ganda, { t: "S_LUAS", nilai: v });
      cek(s.pernah.length === 0 && !s.pesan.startsWith("✅"), `Setengah ${nama}: luas ${v} ditolak`);
      cek(/hanya setengahnya/.test(s.pesan) === (v === persegiPanjang) && /jumlah dua ukuran/.test(s.pesan) === (v === d.a + d.t), `Setengah ${nama}: luas ${v} dijelaskan tepat`);
    }
    const benar = LR(ganda, { t: "S_LUAS", nilai: luas });
    cek(benar.pernah.includes(`setengah:${i}`) && benar.pesan.startsWith("✅") && benar.pesan.includes(`½ × ${d.a} × ${d.t} = ${luas} cm²`), `Setengah ${nama}: luas ${luas} tercatat`);
    cek(LR(ganda, { t: "S_LUAS", nilai: 999 }) === ganda, `Setengah ${nama}: luas di luar pilihan diabaikan`);
    cek(!LR(benar, { t: "S_DATA", i: (i + 1) % 3 }).setengah.ganda && LR(benar, { t: "S_DATA", i: (i + 1) % 3 }).pernah.includes(`setengah:${i}`), `Setengah ${nama}: ganti bangun melepas gandaan, riwayat tetap`);
  }
  cek(new Set(letak.setengah).size >= 2, `Setengah: letak luas benar bervariasi (${letak.setengah.join("")})`);
  cek(LR(r0, { t: "S_DATA", i: 3 }) === r0 && LR(r0, { t: "S_DATA", i: -1 }) === r0, "Setengah: bangun di luar batas diabaikan");

  // Trapesium.
  for (const [i, d] of R.DATA_TRAP.entries()) {
    const nama = `${d.a} dan ${d.b} tinggi ${d.t}`;
    const luas = luasPoligon(poliTrap(d.a, d.b, d.t));
    const jajar = luasPoligon([[0, 0], [d.a + d.b, 0], [d.a + d.b + 1, d.t], [1, d.t]]);
    const oa = R.opsiAlas(i);
    const ol = R.opsiTrap(i);
    cek(R.luasTrap(d) === luas && Number.isInteger(luas) && R.luasJajarTrap(d) === jajar && jajar === luas * 2 && (d.a - d.b) % 2 === 0, `Trapesium ${nama}: luas ${luas}, dua trapesium sama dengan jajargenjang ${jajar} (titik sudut)`);
    cek(oa.length === 3 && new Set(oa).size === 3 && oa.filter((v) => v === d.a + d.b).length === 1 && oa.includes(d.a) && oa.includes(d.b), `Trapesium ${nama}: pilihan alas jumlah sisi sejajar, dan satu sisi`);
    cek(ol.length === 3 && new Set(ol).size === 3 && ol.filter((v) => v === luas).length === 1 && ol.includes(jajar) && ol.includes(d.a + d.b + d.t) && jajar !== luas && d.a + d.b + d.t !== luas && ol.every((v) => v > 0), `Trapesium ${nama}: pilihan luas, pengecoh tanpa setengah dan jumlah semua ukuran, salah`);
    letak.trap.push(ol.indexOf(luas));
    const xt = LR(r0, { t: "T_DATA", i });
    cek(/Susun dulu/.test(LR(xt, { t: "T_ALAS", nilai: d.a + d.b }).pesan) && !LR(xt, { t: "T_ALAS", nilai: d.a + d.b }).trap.alasOk, `Trapesium ${nama}: alas sebelum menyusun ditolak`);
    for (const v of ol) cek(LR(xt, { t: "T_LUAS", nilai: v }).pernah.length === 0, `Trapesium ${nama}: luas ${v} tanpa menyusun ditolak`);
    const ganda = LR(xt, { t: "T_GANDA" });
    cek(ganda.trap.ganda && !ganda.trap.alasOk && ganda.pesan.startsWith("✅") && ganda.pernah.length === 0, `Trapesium ${nama}: menyusun jajargenjang`);
    for (const v of ol) cek(LR(ganda, { t: "T_LUAS", nilai: v }).pernah.length === 0 && /pilih alasnya/.test(LR(ganda, { t: "T_LUAS", nilai: v }).pesan), `Trapesium ${nama}: luas ${v} sebelum memilih alas ditolak`);
    for (const v of oa.filter((v) => v !== d.a + d.b)) {
      const s = LR(ganda, { t: "T_ALAS", nilai: v });
      cek(!s.trap.alasOk && /satu sisi sejajar/.test(s.pesan) && !s.pesan.startsWith("✅"), `Trapesium ${nama}: alas ${v} ditolak`);
    }
    const alas = LR(ganda, { t: "T_ALAS", nilai: d.a + d.b });
    cek(alas.trap.alasOk && alas.pesan.startsWith("✅") && alas.pesan.includes(`${d.a} + ${d.b} = ${d.a + d.b} cm`), `Trapesium ${nama}: alas ${d.a + d.b} diterima`);
    cek(!LR(alas, { t: "T_ALAS", nilai: d.a }).trap.alasOk && LR(LR(alas, { t: "T_ALAS", nilai: d.a }), { t: "T_LUAS", nilai: luas }).pernah.length === 0, `Trapesium ${nama}: alas diganti salah lalu luas benar tidak memenuhi`);
    for (const v of ol.filter((v) => v !== luas)) {
      const s = LR(alas, { t: "T_LUAS", nilai: v });
      cek(s.pernah.length === 0 && !s.pesan.startsWith("✅"), `Trapesium ${nama}: luas ${v} ditolak`);
      cek(/hanya setengahnya/.test(s.pesan) === (v === jajar) && /menjumlah semua ukuran/.test(s.pesan) === (v === d.a + d.b + d.t), `Trapesium ${nama}: luas ${v} dijelaskan tepat`);
    }
    const benar = LR(alas, { t: "T_LUAS", nilai: luas });
    cek(benar.pernah.includes(`trap:${i}`) && benar.pesan.startsWith("✅") && benar.pesan.includes(`½ × (${d.a} + ${d.b}) × ${d.t} = ${luas} cm²`), `Trapesium ${nama}: luas ${luas} tercatat`);
    cek(LR(alas, { t: "T_ALAS", nilai: 999 }) === alas && LR(alas, { t: "T_LUAS", nilai: 999 }) === alas, `Trapesium ${nama}: nilai di luar pilihan diabaikan`);
    cek(!LR(benar, { t: "T_DATA", i: (i + 1) % 2 }).trap.ganda && LR(benar, { t: "T_DATA", i: (i + 1) % 2 }).pernah.includes(`trap:${i}`), `Trapesium ${nama}: ganti trapesium mengosongkan susunan, riwayat tetap`);
  }
  cek(new Set(letak.trap).size === 2, `Trapesium: letak luas benar bervariasi (${letak.trap.join("")})`);
  cek(LR(r0, { t: "T_DATA", i: 2 }) === r0 && LR(r0, { t: "T_DATA", i: -1 }) === r0, "Trapesium: trapesium di luar batas diabaikan");

  // Fuzz.
  const acak = acakDari(71);
  let s = r0;
  let ok = true;
  const pesanSemua = new Set();
  const riwayatSemua = new Set();
  const ID = /^(kali:[0-3]|setengah:[0-2]|trap:[0-1])$/;
  for (let i = 0; i < 20000; i += 1) {
    const p = acak(24);
    const dk = R.dataKali(s);
    const ds = R.dataSetengah(s);
    const dt = R.dataTrap(s);
    const a =
      p === 0 ? { t: "K_DATA", i: acak(5) - (acak(8) === 0 ? 1 : 0) } :
      p === 1 ? { t: "K_TINGGI", nilai: acak(5) === 0 ? 99 : [dk.tinggi, dk.miring ?? 1][acak(2)] } :
      p === 2 || p === 3 ? { t: "K_TINGGI", nilai: dk.tinggi } :
      p === 4 ? { t: "K_LUAS", nilai: acak(6) === 0 ? 99 : R.opsiKali(s.kali.data)[acak(3)] } :
      p === 5 || p === 6 ? { t: "K_LUAS", nilai: R.luasKali(dk) } :
      p === 7 ? { t: "S_DATA", i: acak(4) } :
      p === 8 || p === 9 ? { t: "S_GANDA" } :
      p === 10 ? { t: "S_LUAS", nilai: acak(6) === 0 ? 99 : R.opsiSetengah(s.setengah.data)[acak(3)] } :
      p === 11 || p === 12 ? { t: "S_LUAS", nilai: R.luasSetengah(ds) } :
      p === 13 ? { t: "T_DATA", i: acak(3) } :
      p === 14 || p === 15 ? { t: "T_GANDA" } :
      p === 16 ? { t: "T_ALAS", nilai: acak(6) === 0 ? 99 : R.opsiAlas(s.trap.data)[acak(3)] } :
      p === 17 || p === 18 ? { t: "T_ALAS", nilai: R.jumlahSejajar(dt) } :
      p === 19 ? { t: "T_LUAS", nilai: acak(6) === 0 ? 99 : R.opsiTrap(s.trap.data)[acak(3)] } :
      p === 20 || p === 21 ? { t: "T_LUAS", nilai: R.luasTrap(dt) } :
      acak(40) === 0 ? { t: "RESET" } : { t: "PESAN_KOSONG" };
    const t = LR(s, a);
    if (a.t !== "RESET" && !s.pernah.every((v) => t.pernah.includes(v))) ok = false;
    if (!(t.kali.data >= 0 && t.kali.data < 4 && t.setengah.data >= 0 && t.setengah.data < 3 && t.trap.data >= 0 && t.trap.data < 2)) ok = false;
    if (R.DATA_KALI[t.kali.data].miring === null && !t.kali.tinggiOk) ok = false;
    if (t.trap.alasOk && !t.trap.ganda) ok = false;
    for (const id of t.pernah) if (!ID.test(id)) ok = false;
    for (const id of t.pernah) {
      if (s.pernah.includes(id)) continue;
      const [jenis, n] = id.split(":");
      const nn = Number(n);
      if (jenis === "kali" && !(t.kali.data === nn && t.kali.tinggiOk)) ok = false;
      if (jenis === "setengah" && !(t.setengah.data === nn && t.setengah.ganda)) ok = false;
      if (jenis === "trap" && !(t.trap.data === nn && t.trap.ganda && t.trap.alasOk)) ok = false;
    }
    if (t.pesan) pesanSemua.add(t.pesan);
    for (const id of t.pernah) riwayatSemua.add(id);
    s = t;
  }
  cek(ok, "fuzz 20.000 aksi Lab Rumus: batas terjaga, urutan langkah terjaga, riwayat tidak dicabut dan hanya bila tercapai");
  cek(pesanSemua.size > 30 && [...pesanSemua].every(tanpaAngka), `fuzz Lab Rumus: semua ${pesanSemua.size} pesan dieja menjadi kata`);
  cek(riwayatSemua.size >= 6, `fuzz Lab Rumus: riwayat terkumpul (${[...riwayatSemua].sort().join(" ")})`);
  globalThis.__pesanB = [...pesanSemua];
}

/* ------------------------------ Mesin B ------------------------------ */
{
  const angka = (o) => Number(o.split(" ")[0]);
  const def = MS.MESIN_RUMUS;
  sama(MS.KASUS_RUMUS.map((k) => k.id), ["kebun", "bendera", "kolam"], "Mesin Rumus: tiga kasus");
  sama(MS.KASUS_RUMUS.map((k) => [k.dasar.bentuk, k.dasar.p, k.dasar.l, k.setengah.bangun, k.setengah.a, k.setengah.t, k.trap.a, k.trap.b, k.trap.t, k.tinggi.alas, k.tinggi.t, k.tinggi.m]), [
    ["persegi panjang", 5, 2, "segitiga", 6, 4, 5, 3, 4, 6, 4, 5],
    ["persegi panjang", 8, 3, "belah ketupat", 10, 4, 6, 4, 3, 8, 3, 5],
    ["persegi", 6, 6, "layang-layang", 8, 6, 7, 5, 2, 9, 2, 4],
  ], "Mesin Rumus: data tiga kasus sesuai rancangan");
  sama(def.stasiun.map((s) => s.id), ["dasar", "setengah", "trapesium", "tinggi"], "Mesin Rumus: urutan stasiun");
  for (const [i, k] of MS.KASUS_RUMUS.entries()) {
    const c = def.kasus[i];
    const [dasar, setengah, trap, tinggi] = c.langkah;
    const ld = petakMandiri(k.dasar.p, k.dasar.l);
    cek(dasar.benar === `${ld} cm²` && dasar.tanya.includes(k.dasar.bentuk === "persegi" ? `sisi ${k.dasar.p} cm` : `alas ${k.dasar.p} cm dan tinggi ${k.dasar.l} cm`), `Mesin ${k.id}: dasar ${ld} cm² (cacah petak)`);
    cek(dasar.opsi.includes(`${k.dasar.p + k.dasar.l} cm²`) && dasar.opsi.every((o) => o === dasar.benar || angka(o) !== ld) && dasar.opsi.every((o) => angka(o) > 0), `Mesin ${k.id}: pengecoh dasar salah (jumlah ukuran)`);
    const poli = k.setengah.bangun === "segitiga" ? poliSegitiga(k.setengah.a, k.setengah.t) : k.setengah.bangun === "belah ketupat" ? poliBelah(k.setengah.a, k.setengah.t) : poliLayang(k.setengah.a, k.setengah.t);
    const ls = luasPoligon(poli);
    const penuh = petakMandiri(k.setengah.a, k.setengah.t);
    cek(penuh % 2 === 0 && setengah.benar === `${ls} cm²` && ls * 2 === penuh && setengah.tanya.includes(`${k.setengah.a} cm kali ${k.setengah.t} cm`), `Mesin ${k.id}: setengah ${ls} cm², hasil kali ${penuh} genap (titik sudut)`);
    cek(setengah.opsi.includes(`${penuh} cm²`) && setengah.opsi.includes(`${k.setengah.a + k.setengah.t} cm²`) && setengah.opsi.every((o) => o === setengah.benar || angka(o) !== ls) && setengah.opsi.every((o) => angka(o) > 0), `Mesin ${k.id}: pengecoh setengah salah (lupa setengah, jumlah)`);
    const lt = luasPoligon(poliTrap(k.trap.a, k.trap.b, k.trap.t));
    const jajarT = petakMandiri(k.trap.a + k.trap.b, k.trap.t);
    cek((k.trap.a - k.trap.b) % 2 === 0 && trap.benar === `${lt} cm²` && lt * 2 === jajarT && trap.tanya.includes(`${k.trap.a} cm dan ${k.trap.b} cm`) && trap.tanya.includes(`tingginya ${k.trap.t} cm`), `Mesin ${k.id}: trapesium ${lt} cm² (titik sudut)`);
    cek(trap.opsi.includes(`${jajarT} cm²`) && trap.opsi.includes(`${k.trap.a + k.trap.b + k.trap.t} cm²`) && trap.opsi.every((o) => o === trap.benar || angka(o) !== lt) && trap.opsi.every((o) => angka(o) > 0), `Mesin ${k.id}: pengecoh trapesium salah (tanpa setengah, jumlah semua)`);
    const lj = luasPoligon(poliJajar(k.tinggi.alas, k.tinggi.t, k.tinggi.m));
    cek(k.tinggi.m > k.tinggi.t && tinggi.benar === `${lj} cm²` && lj === petakMandiri(k.tinggi.alas, k.tinggi.t) && tinggi.tanya.includes(`sisi miringnya ${k.tinggi.m} cm`), `Mesin ${k.id}: jajargenjang ${lj} cm², sisi miring ${k.tinggi.m} lebih panjang dari tinggi`);
    cek(tinggi.opsi.includes(`${k.tinggi.alas * k.tinggi.m} cm²`) && tinggi.opsi.includes(`${k.tinggi.alas + k.tinggi.t} cm²`) && tinggi.opsi.every((o) => o === tinggi.benar || angka(o) !== lj) && tinggi.opsi.every((o) => angka(o) > 0), `Mesin ${k.id}: pengecoh tinggi salah (sisi miring kali alas, jumlah)`);
    const eja = EJ.ejaK5B5(c.ringkas);
    cek([ld, ls, lt, lj].every((n) => eja.includes(EJ.kataK5B5(n))), `Mesin ${k.id}: ringkas dieja dengan hasil benar`);
  }
}

/* ------------------------------ Skenario B ------------------------------ */
{
  const S = SK.SKENARIO_K5B5B;
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
  sama(S.id.replace(/-k5b5$/, ""), K5.ID_SKENARIO_K5B5.B, "id skenario B sesuai id misi");
  const adegan = (id) => S.adegan.find((a) => a.id === id);
  const tinggi = adegan("tinggi");
  const lj = luasPoligon(poliJajar(8, 3, 5));
  const tb = tinggi.opsi.find((o) => o.benar);
  cek(lj === 24 && tinggi.cerita.includes("beralas 8 m") && tinggi.cerita.includes("3 m") && tinggi.cerita.includes("5 m") && /tinggi 3 m yang tegak lurus/.test(tb.teks) && tb.umpan.includes("8 × 3 = 24 m²") && tinggi.opsi.filter((o) => !o.benar).every((o) => !/tegak lurus alas$/.test(o.teks) && !/tinggi 3 m/.test(o.teks)), "B: jajargenjang alas 8 tinggi 3 sisi miring 5 sama dengan 24 m², tinggi bukan sisi miring");
  const soal = adegan("hitung-luas").soal;
  cek(soal[0].jawaban === String(petakMandiri(4, 4)) && soal[0].teks.includes("sisi 4 m") && soal[0].opsi.includes(String(4 + 4)) && soal[0].opsi.filter((o) => o !== soal[0].jawaban).every((o) => Number(o) !== 16), "B: persegi sisi 4 m sama dengan 16 m², pengecoh 8 dan 20 salah");
  cek(soal[1].jawaban === String(lj) && soal[1].teks.includes("beralas 8 m dan tinggi 3 m") && soal[1].opsi.includes(String(8 * 5)) && soal[1].opsi.includes(String(8 + 3)) && soal[1].opsi.filter((o) => o !== soal[1].jawaban).every((o) => Number(o) !== 24), "B: jajargenjang 8 dan 3 sama dengan 24 m², pengecoh 40 dan 11 salah");
  const seg = adegan("segitiga");
  const ls = luasPoligon(poliSegitiga(6, 4));
  cek(seg.jumlah === ls && ls === 12 && seg.cerita.includes("beralas 6 m dan tinggi 4 m") && seg.cerita.includes("6 m kali 4 m") && seg.sukses.includes("½ × 6 × 4 = 12 m²") && seg.salah.includes(`${petakMandiri(6, 4)} m²`), "B: segitiga 6 dan 4 sama dengan 12 m² (titik sudut)");
  const trap = adegan("trapesium");
  const lt = luasPoligon(poliTrap(5, 3, 4));
  cek(trap.target === lt && lt === 16 && trap.target <= trap.maks && trap.maks <= 20 && trap.cerita.includes("5 m dan 3 m") && trap.cerita.includes("tingginya 4 m") && trap.sukses.includes("½ × (5 + 3) × 4 = 16 m²"), "B: trapesium 5, 3, tinggi 4 sama dengan 16 m² (titik sudut)");
  const lupa = adegan("lupa");
  const lb = lupa.opsi.find((o) => o.benar);
  cek(petakMandiri(6, 4) === 24 && lupa.cerita.includes("menjawab 24 m²") && /dikali setengah/.test(lb.teks) && lb.umpan.includes("12 m²") && lupa.opsi.filter((o) => !o.benar).every((o) => !/setengah/.test(o.teks)), "B: jawaban 24 untuk segitiga 6 dan 4 lupa setengah, yang benar 12 m²");
  const posisi = S.adegan.filter((a) => a.jenis === "pilih").map((a) => a.opsi.findIndex((o) => o.benar));
  cek(new Set(posisi).size === posisi.length, `B: letak jawaban pilih bervariasi (${posisi.join("")})`);
}

/* ------------------------------ Lab C: Gabungan ------------------------------ */
// Hitungan mandiri Sub-Bab C: luas bagian dari titik sudut (tali sepatu) atau cacah petak, denah L dari himpunan petak
// kisi, dan bangun yang menumpuk dari irisan himpunan petak. Kode memakai rumus dan pengurangan.
const luasBagianMandiri = (b) => (b.jenis === "pp" ? petakMandiri(b.a, b.t) : b.jenis === "jajar" ? luasPoligon([[0, 0], [b.a, 0], [b.a + 1, b.t], [1, b.t]]) : luasPoligon(poliSegitiga(b.a, b.t)));
const petakL = (d) => {
  const s = new Set();
  for (let y = 0; y < d.H; y += 1) for (let x = 0; x < d.W; x += 1) if (!(x >= d.W - d.w && y < d.h)) s.add(`${x},${y}`);
  return s;
};
const hitungDi = (s, f) => [...s].filter((p) => f(...p.split(",").map(Number))).length;
const caraMandiri = (d, c) => {
  const s = petakL(d);
  return c === 1
    ? [hitungDi(s, (x, y) => y >= d.h), hitungDi(s, (x, y) => y < d.h)]
    : [hitungDi(s, (x) => x < d.W - d.w), hitungDi(s, (x) => x >= d.W - d.w)];
};
const petakKotak = (k) => {
  const s = new Set();
  for (let y = k.y; y < k.y + k.h; y += 1) for (let x = k.x; x < k.x + k.w; x += 1) s.add(`${x},${y}`);
  return s;
};
const tumpangMandiri = (t) => {
  const a = petakKotak(t.A);
  const b = petakKotak(t.B);
  const irisan = [...a].filter((p) => b.has(p)).length;
  const gabungan = new Set([...a, ...b]).size;
  return { irisan, gabungan, a: a.size, b: b.size };
};
const LG = G_.langkahGabunganK5B5C;
const g0 = G_.awalGabunganK5B5C();

{
  cek(g0.pernah.length === 0 && g0.pesan === "" && g0.uraikan.bagianOk.every((v) => !v) && !g0.silang.ok1 && !g0.silang.ok2 && !g0.tumpang.irisanOk, "C awal: kosong, belum ada riwayat");
  cek(G_.DATA_URAIAN.length === 5 && G_.DATA_SILANG.length === 2 && G_.DATA_TUMPANG.length === 2, "C: lima bangun Uraikan, dua denah Silang, dua pasangan Tumpang");
  const letak = { bagian: [], total: [], silang: [], irisan: [], gab: [] };

  // Uraikan.
  for (const [i, u] of G_.DATA_URAIAN.entries()) {
    const nama = u.nama;
    const luas = u.bagian.map(luasBagianMandiri);
    const total = luas.reduce((s, v) => s + v, 0);
    cek(u.bagian.every((b) => b.jenis !== "segitiga" || petakMandiri(b.a, b.t) % 2 === 0), `Uraikan ${nama}: segitiga dengan hasil kali genap`);
    cek(u.bagian.map(G_.luasBagian).join() === luas.join() && G_.luasUraian(u) === total && G_.tulisJumlah(u) === `${luas.join(" + ")} = ${total}`, `Uraikan ${nama}: luas ${luas.join(" + ")} = ${total} (cacah petak dan titik sudut)`);
    cek(luas.every((v) => Number.isInteger(v) && v > 0) && G_.bagianTerkecil(u) === Math.min(...luas), `Uraikan ${nama}: luas bagian bulat dan positif`);
    const ot = G_.opsiTotal(i);
    cek(ot.length === 3 && new Set(ot).size === 3 && ot.filter((v) => v === total).length === 1 && ot.includes(total - Math.min(...luas)) && ot.includes(total + Math.min(...luas)) && ot.every((v) => v > 0), `Uraikan ${nama}: pilihan luas gabungan, pengecoh terlewat dan dobel`);
    letak.total.push(ot.indexOf(total));
    const xu = LG(g0, { t: "U_DATA", i });
    // Total sebelum semua bagian dihitung ditolak.
    for (const v of ot) cek(LG(xu, { t: "U_TOTAL", nilai: v }).pernah.length === 0 && /Hitung dulu luas semua bagian/.test(LG(xu, { t: "U_TOTAL", nilai: v }).pesan), `Uraikan ${nama}: total ${v} sebelum menghitung bagian ditolak`);
    let s = xu;
    for (const [k, b] of u.bagian.entries()) {
      const ob = G_.opsiBagian(i, k);
      cek(ob.length === 3 && new Set(ob).size === 3 && ob.filter((v) => v === luas[k]).length === 1 && ob.every((v) => Number.isInteger(v) && v > 0), `Uraikan ${nama}/${k + 1}: tiga pilihan luas bagian, satu benar`);
      letak.bagian.push(ob.indexOf(luas[k]));
      for (const v of ob.filter((v) => v !== luas[k])) {
        const t = LG(s, { t: "U_BAGIAN", k, nilai: v });
        cek(!t.uraikan.bagianOk[k] && !t.pesan.startsWith("✅") && t.pernah.length === 0, `Uraikan ${nama}/${k + 1}: luas ${v} ditolak`);
        cek(/persegi panjang\. Segitiga/.test(t.pesan) === (b.jenis === "segitiga" && v === b.a * b.t) && /tidak dibagi dua/.test(t.pesan) === (b.jenis === "jajar" && v === (b.a * b.t) / 2) && /jumlah dua ukuran/.test(t.pesan) === (v === b.a + b.t && !(b.jenis === "segitiga" && v === b.a * b.t)), `Uraikan ${nama}/${k + 1}: luas ${v} dijelaskan tepat`);
      }
      s = LG(s, { t: "U_BAGIAN", k, nilai: luas[k] });
      cek(s.uraikan.bagianOk[k] && s.pesan.startsWith("✅") && s.pesan.includes(`= ${luas[k]} cm²`) && s.pesan.includes(`Bagian ${k + 1}`), `Uraikan ${nama}/${k + 1}: luas ${luas[k]} diterima`);
      cek(s.uraikan.bagianOk.filter(Boolean).length === k + 1 && s.pernah.length === 0, `Uraikan ${nama}/${k + 1}: ${k + 1} bagian sudah, belum tercatat`);
      // Setelah sebagian, total masih ditolak.
      if (k < u.bagian.length - 1) cek(LG(s, { t: "U_TOTAL", nilai: total }).pernah.length === 0, `Uraikan ${nama}/${k + 1}: total benar sebelum semua bagian ditolak`);
      // Memilih luas salah setelah benar mencabut tanda bagian itu.
      const salahLagi = LG(s, { t: "U_BAGIAN", k, nilai: ob.find((v) => v !== luas[k]) });
      cek(!salahLagi.uraikan.bagianOk[k] && LG(salahLagi, { t: "U_TOTAL", nilai: total }).pernah.length === 0 === (u.bagian.length >= 1), `Uraikan ${nama}/${k + 1}: bagian diganti salah mencabut tanda`);
    }
    cek(G_.semuaBagianOk(s), `Uraikan ${nama}: semua bagian sudah`);
    for (const v of ot.filter((v) => v !== total)) {
      const t = LG(s, { t: "U_TOTAL", nilai: v });
      cek(t.pernah.length === 0 && !t.pesan.startsWith("✅") && /terlewat/.test(t.pesan) === (v < total) && /dua kali/.test(t.pesan) === (v > total), `Uraikan ${nama}: total ${v} ditolak dan dijelaskan`);
    }
    const benar = LG(s, { t: "U_TOTAL", nilai: total });
    cek(benar.pernah.includes(`uraikan:${i}`) && benar.pesan.startsWith("✅") && benar.pesan.includes(`${luas.join(" + ")} = ${total} cm²`), `Uraikan ${nama}: total ${total} tercatat`);
    cek(LG(s, { t: "U_TOTAL", nilai: 999 }) === s && LG(s, { t: "U_BAGIAN", k: u.bagian.length, nilai: 1 }) === s && LG(s, { t: "U_BAGIAN", k: -1, nilai: 1 }) === s && LG(s, { t: "U_BAGIAN", k: 0, nilai: 999 }) === s, `Uraikan ${nama}: nilai atau bagian di luar pilihan diabaikan`);
    cek(LG(benar, { t: "U_DATA", i: (i + 1) % 5 }).pernah.includes(`uraikan:${i}`) && LG(benar, { t: "U_DATA", i: (i + 1) % 5 }).uraikan.bagianOk.every((v) => !v), `Uraikan ${nama}: ganti bangun mengosongkan bagian, riwayat tetap`);
  }
  cek(new Set(letak.bagian).size === 3 && new Set(letak.total).size === 3, `Uraikan: letak luas benar bervariasi (${letak.bagian.join("")} / ${letak.total.join("")})`);
  cek(LG(g0, { t: "U_DATA", i: 5 }) === g0 && LG(g0, { t: "U_DATA", i: -1 }) === g0, "Uraikan: bangun di luar batas diabaikan");

  // Silang.
  for (const [i, d] of G_.DATA_SILANG.entries()) {
    const nama = `${d.W} kali ${d.H} takik ${d.w} kali ${d.h}`;
    const L = petakL(d).size;
    const [a1, b1] = caraMandiri(d, 1);
    const [a2, b2] = caraMandiri(d, 2);
    cek(G_.luasDenahL(d) === L && a1 + b1 === L && a2 + b2 === L && G_.caraBagian(d, 1).join() === `${a1},${b1}` && G_.caraBagian(d, 2).join() === `${a2},${b2}`, `Silang ${nama}: luas ${L}, cara 1 ${a1} + ${b1}, cara 2 ${a2} + ${b2} (himpunan petak)`);
    cek(a1 + b1 === a2 + b2 && `${a1},${b1}` !== `${a2},${b2}` && d.W * d.H !== L, `Silang ${nama}: dua cara berbeda, hasil sama, persegi panjang besar berbeda`);
    const xs = LG(g0, { t: "SI_DATA", i });
    letak.silang.push(G_.opsiSilang(i, 1).indexOf(L) * 3 + G_.opsiSilang(i, 2).indexOf(L));
    for (const c of [1, 2]) {
      const o = G_.opsiSilang(i, c);
      const bagian = c === 1 ? [a1, b1] : [a2, b2];
      cek(o.length === 3 && new Set(o).size === 3 && o.filter((v) => v === L).length === 1 && o.includes(d.W * d.H) && o.includes(bagian[0]) && o.every((v) => v > 0), `Silang ${nama}/cara ${c}: pilihan luas, pengecoh persegi panjang besar dan satu bagian`);
      for (const v of o.filter((v) => v !== L)) {
        const t = LG(xs, { t: "SI_TOTAL", c, nilai: v });
        cek(!t.silang.ok1 && !t.silang.ok2 && !t.pesan.startsWith("✅") && /takik/.test(t.pesan) === (v === d.W * d.H) && /satu bagian/.test(t.pesan) === (v !== d.W * d.H), `Silang ${nama}/cara ${c}: luas ${v} ditolak`);
      }
    }
    // Sama sebelum keduanya benar ditolak.
    for (const jw of ["sama", "beda"]) cek(LG(xs, { t: "SI_SAMA", jawab: jw }).pernah.length === 0 && /Hitung dulu luas denah/.test(LG(xs, { t: "SI_SAMA", jawab: jw }).pesan), `Silang ${nama}: bandingkan ${jw} sebelum menghitung ditolak`);
    const satu = LG(xs, { t: "SI_TOTAL", c: 1, nilai: L });
    cek(satu.silang.ok1 && !satu.silang.ok2 && satu.pesan.startsWith("✅") && satu.pesan.includes(`${a1} + ${b1} = ${L} cm²`), `Silang ${nama}: cara 1 benar`);
    cek(LG(satu, { t: "SI_SAMA", jawab: "sama" }).pernah.length === 0, `Silang ${nama}: hanya cara 1 lalu sama tidak memenuhi`);
    const dua = LG(xs, { t: "SI_TOTAL", c: 2, nilai: L });
    cek(LG(dua, { t: "SI_SAMA", jawab: "sama" }).pernah.length === 0, `Silang ${nama}: hanya cara 2 lalu sama tidak memenuhi`);
    const keduanya = LG(satu, { t: "SI_TOTAL", c: 2, nilai: L });
    cek(keduanya.silang.ok1 && keduanya.silang.ok2 && keduanya.pernah.length === 0 && keduanya.pesan.includes(`${a2} + ${b2} = ${L} cm²`), `Silang ${nama}: kedua cara benar, belum tercatat`);
    const beda = LG(keduanya, { t: "SI_SAMA", jawab: "beda" });
    cek(beda.pernah.length === 0 && /harus sama/.test(beda.pesan) && !beda.pesan.startsWith("✅"), `Silang ${nama}: memilih beda ditolak`);
    const sama1 = LG(keduanya, { t: "SI_SAMA", jawab: "sama" });
    cek(sama1.pernah.includes(`silang:${i}`) && sama1.pesan.startsWith("✅") && sama1.pesan.includes(`${L} cm²`), `Silang ${nama}: kedua cara sama tercatat`);
    cek(LG(keduanya, { t: "SI_SAMA", jawab: "mungkin" }) === keduanya && LG(keduanya, { t: "SI_TOTAL", c: 3, nilai: L }) === keduanya && LG(keduanya, { t: "SI_TOTAL", c: 1, nilai: 999 }) === keduanya, `Silang ${nama}: jawaban atau cara di luar pilihan diabaikan`);
    const cabut = LG(keduanya, { t: "SI_TOTAL", c: 2, nilai: d.W * d.H });
    cek(!cabut.silang.ok2 && cabut.silang.ok1 && LG(cabut, { t: "SI_SAMA", jawab: "sama" }).pernah.length === 0, `Silang ${nama}: cara diganti salah mencabut tanda`);
    cek(!LG(sama1, { t: "SI_DATA", i: (i + 1) % 2 }).silang.ok1 && LG(sama1, { t: "SI_DATA", i: (i + 1) % 2 }).pernah.includes(`silang:${i}`), `Silang ${nama}: ganti denah mengosongkan, riwayat tetap`);
  }
  cek(LG(g0, { t: "SI_DATA", i: 2 }) === g0 && LG(g0, { t: "SI_DATA", i: -1 }) === g0, "Silang: denah di luar batas diabaikan");

  // Tumpang.
  for (const [i, t] of G_.DATA_TUMPANG.entries()) {
    const nama = `${t.A.w} kali ${t.A.h} dan ${t.B.w} kali ${t.B.h}`;
    const m = tumpangMandiri(t);
    cek(G_.luasIrisan(t) === m.irisan && G_.luasGabunganTumpang(t) === m.gabungan && m.irisan > 0 && m.a + m.b - m.irisan === m.gabungan && m.gabungan !== m.a + m.b, `Tumpang ${nama}: bagian menumpuk ${m.irisan}, gabungan ${m.gabungan} (himpunan petak)`);
    const oi = G_.opsiIrisan(i);
    const og = G_.opsiTotalTumpang(i);
    cek(oi.length === 3 && new Set(oi).size === 3 && oi.filter((v) => v === m.irisan).length === 1 && oi.every((v) => v > 0), `Tumpang ${nama}: tiga pilihan bagian menumpuk, satu benar`);
    cek(og.length === 3 && new Set(og).size === 3 && og.filter((v) => v === m.gabungan).length === 1 && og.includes(m.a + m.b) && og.includes(Math.max(m.a, m.b)) && og.every((v) => v > 0), `Tumpang ${nama}: pilihan gabungan, pengecoh dobel dan satu bangun`);
    letak.irisan.push(oi.indexOf(m.irisan));
    letak.gab.push(og.indexOf(m.gabungan));
    const xt = LG(g0, { t: "TU_DATA", i });
    for (const v of og) cek(LG(xt, { t: "TU_TOTAL", nilai: v }).pernah.length === 0 && /Hitung dulu luas bagian yang menumpuk/.test(LG(xt, { t: "TU_TOTAL", nilai: v }).pesan), `Tumpang ${nama}: gabungan ${v} sebelum bagian menumpuk ditolak`);
    for (const v of oi.filter((v) => v !== m.irisan)) {
      const s = LG(xt, { t: "TU_IRISAN", nilai: v });
      cek(!s.tumpang.irisanOk && !s.pesan.startsWith("✅"), `Tumpang ${nama}: menumpuk ${v} ditolak`);
    }
    const ok = LG(xt, { t: "TU_IRISAN", nilai: m.irisan });
    const dim = G_.irisan(t);
    cek(ok.tumpang.irisanOk && ok.pesan.startsWith("✅") && ok.pesan.includes(`${dim.w} × ${dim.h} = ${m.irisan} cm²`) && ok.pernah.length === 0, `Tumpang ${nama}: bagian menumpuk ${m.irisan} diterima`);
    for (const v of og.filter((v) => v !== m.gabungan)) {
      const s = LG(ok, { t: "TU_TOTAL", nilai: v });
      cek(s.pernah.length === 0 && !s.pesan.startsWith("✅") && /dua kali/.test(s.pesan) === (v === m.a + m.b) && /satu bangun/.test(s.pesan) === (v !== m.a + m.b), `Tumpang ${nama}: gabungan ${v} ditolak dan dijelaskan`);
    }
    const benar = LG(ok, { t: "TU_TOTAL", nilai: m.gabungan });
    cek(benar.pernah.includes(`tumpang:${i}`) && benar.pesan.startsWith("✅") && benar.pesan.includes(`${m.a} + ${m.b} − ${m.irisan} = ${m.gabungan} cm²`), `Tumpang ${nama}: gabungan ${m.gabungan} tercatat`);
    const cabut = LG(ok, { t: "TU_IRISAN", nilai: oi.find((v) => v !== m.irisan) });
    cek(!cabut.tumpang.irisanOk && LG(cabut, { t: "TU_TOTAL", nilai: m.gabungan }).pernah.length === 0, `Tumpang ${nama}: bagian menumpuk diganti salah mencabut tanda`);
    cek(LG(ok, { t: "TU_IRISAN", nilai: 999 }) === ok && LG(ok, { t: "TU_TOTAL", nilai: 999 }) === ok, `Tumpang ${nama}: nilai di luar pilihan diabaikan`);
    cek(!LG(benar, { t: "TU_DATA", i: (i + 1) % 2 }).tumpang.irisanOk && LG(benar, { t: "TU_DATA", i: (i + 1) % 2 }).pernah.includes(`tumpang:${i}`), `Tumpang ${nama}: ganti pasangan mengosongkan, riwayat tetap`);
  }
  cek(new Set(letak.irisan).size === 2 && new Set(letak.gab).size === 2, `Tumpang: letak jawaban benar bervariasi (${letak.irisan.join("")} / ${letak.gab.join("")})`);
  cek(LG(g0, { t: "TU_DATA", i: 2 }) === g0 && LG(g0, { t: "TU_DATA", i: -1 }) === g0, "Tumpang: pasangan di luar batas diabaikan");

  // Fuzz.
  const acak = acakDari(89);
  let s = g0;
  let ok = true;
  const pesanSemua = new Set();
  const riwayatSemua = new Set();
  const ID = /^(uraikan:[0-4]|silang:[0-1]|tumpang:[0-1])$/;
  for (let i = 0; i < 20000; i += 1) {
    const p = acak(28);
    const du = G_.dataUraian(s);
    const ds = G_.dataSilang(s);
    const dt = G_.dataTumpang(s);
    const k = acak(du.bagian.length + 1) - (acak(10) === 0 ? 1 : 0);
    const kb = Math.min(Math.max(k, 0), du.bagian.length - 1);
    const a =
      p === 0 ? { t: "U_DATA", i: acak(6) - (acak(8) === 0 ? 1 : 0) } :
      p === 1 ? { t: "U_BAGIAN", k, nilai: acak(6) === 0 ? 99 : G_.opsiBagian(s.uraikan.data, kb)[acak(3)] } :
      p === 2 || p === 3 || p === 4 ? { t: "U_BAGIAN", k: kb, nilai: G_.luasBagian(du.bagian[kb]) } :
      p === 5 ? { t: "U_TOTAL", nilai: acak(6) === 0 ? 99 : G_.opsiTotal(s.uraikan.data)[acak(3)] } :
      p === 6 || p === 7 ? { t: "U_TOTAL", nilai: G_.luasUraian(du) } :
      p === 8 ? { t: "SI_DATA", i: acak(3) } :
      p === 9 ? { t: "SI_TOTAL", c: acak(4), nilai: acak(6) === 0 ? 99 : G_.opsiSilang(s.silang.data, 1 + acak(2))[acak(3)] } :
      p === 10 || p === 11 ? { t: "SI_TOTAL", c: 1 + acak(2), nilai: G_.luasDenahL(ds) } :
      p === 12 || p === 13 ? { t: "SI_SAMA", jawab: ["sama", "beda", "mungkin"][acak(3)] } :
      p === 14 ? { t: "SI_SAMA", jawab: "sama" } :
      p === 15 ? { t: "TU_DATA", i: acak(3) } :
      p === 16 ? { t: "TU_IRISAN", nilai: acak(6) === 0 ? 99 : G_.opsiIrisan(s.tumpang.data)[acak(3)] } :
      p === 17 || p === 18 ? { t: "TU_IRISAN", nilai: G_.luasIrisan(dt) } :
      p === 19 ? { t: "TU_TOTAL", nilai: acak(6) === 0 ? 99 : G_.opsiTotalTumpang(s.tumpang.data)[acak(3)] } :
      p === 20 || p === 21 ? { t: "TU_TOTAL", nilai: G_.luasGabunganTumpang(dt) } :
      acak(40) === 0 ? { t: "RESET" } : { t: "PESAN_KOSONG" };
    const t = LG(s, a);
    if (a.t !== "RESET" && !s.pernah.every((v) => t.pernah.includes(v))) ok = false;
    if (!(t.uraikan.data >= 0 && t.uraikan.data < 5 && t.uraikan.bagianOk.length === G_.DATA_URAIAN[t.uraikan.data].bagian.length)) ok = false;
    if (!(t.silang.data >= 0 && t.silang.data < 2 && t.tumpang.data >= 0 && t.tumpang.data < 2)) ok = false;
    for (const id of t.pernah) if (!ID.test(id)) ok = false;
    for (const id of t.pernah) {
      if (s.pernah.includes(id)) continue;
      const [jenis, n] = id.split(":");
      const nn = Number(n);
      if (jenis === "uraikan" && !(t.uraikan.data === nn && G_.semuaBagianOk(t))) ok = false;
      if (jenis === "silang" && !(t.silang.data === nn && t.silang.ok1 && t.silang.ok2)) ok = false;
      if (jenis === "tumpang" && !(t.tumpang.data === nn && t.tumpang.irisanOk)) ok = false;
    }
    if (t.pesan) pesanSemua.add(t.pesan);
    for (const id of t.pernah) riwayatSemua.add(id);
    s = t;
  }
  cek(ok, "fuzz 20.000 aksi Lab Gabungan: batas terjaga, urutan langkah terjaga, riwayat tidak dicabut dan hanya bila tercapai");
  cek(pesanSemua.size > 30 && [...pesanSemua].every(tanpaAngka), `fuzz Lab Gabungan: semua ${pesanSemua.size} pesan dieja menjadi kata`);
  cek(riwayatSemua.size >= 6, `fuzz Lab Gabungan: riwayat terkumpul (${[...riwayatSemua].sort().join(" ")})`);
  globalThis.__pesanC = [...pesanSemua];
}

/* ------------------------------ Mesin C ------------------------------ */
{
  const angka = (o) => Number(o.split(" ")[0]);
  const def = MS.MESIN_GABUNGAN;
  sama(MS.KASUS_GABUNGAN.map((k) => k.id), ["rumah", "papan", "taman"], "Mesin Gabungan: tiga kasus");
  sama(MS.KASUS_GABUNGAN.map((k) => [k.uraian.map((b) => `${b.jenis}${b.a}x${b.t}`).join("+"), k.silang.W, k.silang.H, k.silang.w, k.silang.h]), [
    ["pp4x3+pp4x2", 5, 4, 2, 2],
    ["jajar6x4+segitiga6x4", 6, 4, 2, 2],
    ["pp5x3+pp5x2+segitiga5x2", 7, 4, 3, 2],
  ], "Mesin Gabungan: data tiga kasus sesuai rancangan");
  sama(def.stasiun.map((s) => s.id), ["bagian", "rumus", "jumlah", "silang"], "Mesin Gabungan: urutan stasiun");
  for (const [i, k] of MS.KASUS_GABUNGAN.entries()) {
    const c = def.kasus[i];
    const [bagian, rumus, jumlahL, silang] = c.langkah;
    const luas = k.uraian.map(luasBagianMandiri);
    const total = luas.reduce((s, v) => s + v, 0);
    cek(k.uraian.every((b) => b.jenis !== "segitiga" || petakMandiri(b.a, b.t) % 2 === 0) && luas.every((v) => Number.isInteger(v)), `Mesin ${k.id}: luas bagian ${luas.join(", ")} bulat (cacah petak dan titik sudut)`);
    cek(bagian.benar === `${luas[0]} cm²` && bagian.opsi.every((o) => o === bagian.benar || angka(o) !== luas[0]) && bagian.opsi.every((o) => angka(o) > 0), `Mesin ${k.id}: bagian pertama ${luas[0]}, pengecoh salah`);
    const akhir = luas.length - 1;
    cek(rumus.benar === `${luas[akhir]} cm²` && rumus.opsi.every((o) => o === rumus.benar || angka(o) !== luas[akhir]) && rumus.opsi.every((o) => angka(o) > 0), `Mesin ${k.id}: bagian terakhir ${luas[akhir]}, pengecoh salah`);
    const b0 = k.uraian[0];
    const bz = k.uraian[akhir];
    cek(bz.jenis !== "segitiga" || (rumus.opsi.includes(`${petakMandiri(bz.a, bz.t)} cm²`) && rumus.opsi.includes(`${bz.a + bz.t} cm²`) && /Jangan lupa setengah/.test(rumus.petunjuk)), `Mesin ${k.id}: pengecoh segitiga lupa setengah dan jumlah ukuran`);
    cek(b0.jenis !== "jajar" || (bagian.opsi.includes(`${b0.a + b0.t} cm²`) && bagian.opsi.includes(`${petakMandiri(b0.a, b0.t) / 2} cm²`)), `Mesin ${k.id}: pengecoh jajargenjang dibagi dua dan jumlah ukuran`);
    const terkecil = Math.min(...luas);
    cek(jumlahL.benar === `${total} cm²` && jumlahL.tanya.includes(luas.map((v) => `${v} cm²`).join(", ")) && jumlahL.opsi.includes(`${total - terkecil} cm²`) && jumlahL.opsi.includes(`${total + terkecil} cm²`) && jumlahL.opsi.every((o) => angka(o) > 0), `Mesin ${k.id}: jumlah ${total}, pengecoh terlewat dan dobel`);
    const L = petakL(k.silang).size;
    cek(silang.benar === `${L} cm²` && silang.tanya.includes(`${k.silang.W} cm kali ${k.silang.H} cm`) && silang.tanya.includes(`${k.silang.w} cm kali ${k.silang.h} cm`) && silang.opsi.includes(`${k.silang.W * k.silang.H} cm²`) && silang.opsi.every((o) => o === silang.benar || angka(o) !== L) && silang.opsi.every((o) => angka(o) > 0), `Mesin ${k.id}: denah L ${L}, pengecoh persegi panjang besar dan satu bagian`);
    cek(caraMandiri(k.silang, 1).reduce((s, v) => s + v, 0) === L && caraMandiri(k.silang, 2).reduce((s, v) => s + v, 0) === L, `Mesin ${k.id}: dua cara memotong denah L sama dengan ${L} (himpunan petak)`);
    const eja = EJ.ejaK5B5(c.ringkas);
    cek([luas[0], luas[akhir], total, L].every((n) => eja.includes(EJ.kataK5B5(n))), `Mesin ${k.id}: ringkas dieja dengan hasil benar`);
  }
}

/* ------------------------------ Skenario C ------------------------------ */
{
  const S = SK.SKENARIO_K5B5C;
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
  sama(S.id.replace(/-k5b5$/, ""), K5.ID_SKENARIO_K5B5.C, "id skenario C sesuai id misi");
  const adegan = (id) => S.adegan.find((a) => a.id === id);
  const uraian = adegan("uraian").soal;
  cek(uraian[0].jawaban === String(petakMandiri(4, 3) + petakMandiri(4, 2)) && uraian[0].teks.includes("12 m² dan 8 m²") && uraian[0].opsi.filter((o) => o !== "20").every((o) => Number(o) !== 20), "C: denah 12 + 8 sama dengan 20 m²");
  cek(uraian[1].jawaban === String(luasBagianMandiri({ jenis: "jajar", a: 6, t: 4 }) + luasBagianMandiri({ jenis: "segitiga", a: 6, t: 4 })) && uraian[1].teks.includes("24 m²") && uraian[1].teks.includes("12 m²") && uraian[1].opsi.filter((o) => o !== "36").every((o) => Number(o) !== 36), "C: papan nama 24 + 12 sama dengan 36 m²");
  const silang = adegan("silang").soal;
  const dl = { W: 5, H: 4, w: 2, h: 2 };
  const c1 = caraMandiri(dl, 1);
  const c2 = caraMandiri(dl, 2);
  cek(c1.join() === "6,10" || c1.join() === "10,6" || (c1[0] + c1[1] === 16) , "C: denah L cara pertama berjumlah 16 (himpunan petak)");
  cek(adegan("silang").cerita.includes("10 m² dan 6 m²") && adegan("silang").cerita.includes("12 m² dan 4 m²") && [...c1].sort((p, q) => q - p).join() === "10,6" && [...c2].sort((p, q) => q - p).join() === "12,4", "C: cara pertama 10 dan 6, cara kedua 12 dan 4 (himpunan petak)");
  cek(silang[0].jawaban === "16" && silang[0].opsi.filter((o) => o !== "16").every((o) => Number(o) !== 16), "C: soal denah L cara pertama sama dengan 16, pengecoh salah");
  cek(silang[1].jawaban === String(petakL(dl).size) && silang[1].teks.includes("5 m kali 4 m") && silang[1].teks.includes("2 m kali 2 m") && silang[1].opsi.includes("20") && silang[1].opsi.filter((o) => o !== "16").every((o) => Number(o) !== 16), "C: persegi panjang 5 kali 4 dikurangi takik 2 kali 2 sama dengan 16, pengecoh 20 dan 18 salah");
  const tamu = adegan("ruang-tamu");
  cek(tamu.jumlah === petakMandiri(4, 4) + petakMandiri(3, 3) && tamu.jumlah === 25 && tamu.cerita.includes("16 m² dan 9 m²") && tamu.sukses.includes("16 + 9 = 25"), "C: ruang tamu 16 + 9 sama dengan 25 m²");
  const dlh = adegan("denah-l");
  cek(dlh.target === petakL(dl).size && dlh.target === 16 && dlh.target <= dlh.maks && dlh.maks <= 20 && dlh.cerita.includes("10 m² ditambah 6 m²") && dlh.sukses.includes("10 + 6 = 16"), "C: denah L 10 + 6 sama dengan 16 stik");
  const mn = adegan("menumpuk");
  const tp = tumpangMandiri({ A: { x: 0, y: 0, w: 4, h: 3 }, B: { x: 2, y: 0, w: 4, h: 3 } });
  const mb = mn.opsi.find((o) => o.benar);
  cek(tp.a === 12 && tp.b === 12 && tp.irisan === 6 && tp.gabungan === 18 && mn.cerita.includes("masing-masing 12 m²") && mn.cerita.includes("6 m²") && /^18 m²/.test(mb.teks) && mb.umpan.includes("12 + 12 − 6 = 18 m²") && mn.opsi.filter((o) => !o.benar).every((o) => !/^18 m²/.test(o.teks)) && /^24 m²/.test(mn.opsi.find((o) => /^24/.test(o.teks)).teks), "C: dua 12 menumpuk 6 sama dengan 18 m² (himpunan petak), pengecoh 24 dan 12 salah");
  const dc = adegan("dua-cara").opsi.find((o) => o.benar);
  cek(/^sama/.test(dc.teks) && adegan("dua-cara").opsi.filter((o) => !o.benar).every((o) => !/^sama/.test(o.teks)), "C: dua cara membagi memberi luas sama, pengecoh salah");
  const posisi = S.adegan.filter((a) => a.jenis === "pilih").map((a) => a.opsi.findIndex((o) => o.benar));
  cek(new Set(posisi).size === posisi.length, `C: letak jawaban pilih bervariasi (${posisi.join("")})`);
}

/* ------------------------------ Lab D: Kawat ------------------------------ */
// Hitungan mandiri Sub-Bab D: luas dari cacah petak, keliling dari cacah sisi petak yang hanya dimiliki satu petak
// (tepi kerangka), dan urutan dari pengurutan luas hasil cacah. Kode memakai perkalian dan rumus dua kali jumlah.
const kelilingMandiri = (w, h) => {
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
const KW = D_.langkahKawatK5B5D;
const w0 = D_.awalKawatK5B5D();
/** Aksi dari panjang awal 10 ke panjang p, memakai langkah lima dan satu. */
const keP = (dari, p) => {
  const aksi = [];
  let sekarang = dari;
  while (Math.abs(p - sekarang) >= 5) {
    const d = p > sekarang ? 5 : -5;
    aksi.push({ t: "K_UBAH", d });
    sekarang += d;
  }
  while (sekarang !== p) {
    const d = p > sekarang ? 1 : -1;
    aksi.push({ t: "K_UBAH", d });
    sekarang += d;
  }
  return aksi;
};

{
  cek(w0.pernah.length === 0 && w0.pesan === "" && w0.kawat.p === 10 && w0.urut.dipilih.length === 0 && w0.pilih.data === 0, "D awal: kosong, belum ada riwayat");
  cek(D_.KELILING_KAWAT === 60 && D_.SETENGAH_KELILING === 30 && D_.LUAS_BUKU === 200, "D: kawat 60 cm, panjang tambah lebar 30");
  cek(D_.DATA_PILIH.length === 4 && D_.DATA_URUT.length === 5, "D: empat kebutuhan Pilih, lima kerangka Urut");

  // Kawat: semua panjang 1 sampai 29.
  const idCatat = new Set();
  for (let p = 1; p <= 29; p += 1) {
    const l = 30 - p;
    const luas = petakMandiri(p, l);
    cek(D_.lebarDari(p) === l && D_.luasKawat(p) === luas && luas === ulangTambah(p, l), `Kawat ${p} dan ${l}: luas ${luas} (cacah petak dan penjumlahan berulang)`);
    cek(kelilingMandiri(p, l) === 60 && D_.kelilingKawat(p) === 60, `Kawat ${p} dan ${l}: keliling 60 (cacah sisi petak di tepi)`);
    cek(D_.idKawat(p) === `kawat:${Math.max(p, l)}` && D_.idKawat(p) === D_.idKawat(l), `Kawat ${p} dan ${l}: dicatat dengan sisi yang lebih panjang`);
    cek(luas !== 60 && luas !== 30, `Kawat ${p} dan ${l}: luas tidak pernah sama dengan keliling 60 atau 30`);
    const xp = jalan(w0, KW, keP(10, p));
    cek(xp.kawat.p === p && xp.pernah.length === 0, `Kawat ${p}: diatur dari 10, belum tercatat`);
    const c = KW(xp, { t: "K_CATAT" });
    idCatat.add(D_.idKawat(p));
    cek(c.pernah.includes(D_.idKawat(p)) && c.pernah.length === 1 && c.pesan.startsWith("✅") && c.pesan.includes(`${p} × ${l}`) && c.pesan.includes(`= ${luas} cm²`) && c.pesan.includes("= 60 cm"), `Kawat ${p}: dicatat dengan keliling 60 dan luas ${luas}`);
    if (p === l) cek(/luas terbesar/.test(c.pesan), `Kawat ${p}: persegi disebut luas terbesar`);
    else cek(luas < 200 ? /lebih kecil dari 200/.test(c.pesan) : luas > 200 ? /lebih besar dari 200/.test(c.pesan) : /luasnya 200/.test(c.pesan), `Kawat ${p}: dibandingkan dengan 200 (luas ${luas})`);
    cek(KW(c, { t: "K_CATAT" }).pernah.length === 1, `Kawat ${p}: dicatat dua kali tetap satu riwayat`);
  }
  cek(idCatat.size === 15 && [...idCatat].every((id) => /^kawat:(1[5-9]|2[0-9])$/.test(id)), "Kawat: lima belas kerangka berbeda (sisi panjang 15 sampai 29)");
  // Luas terbesar hanya pada persegi dan menurun menjauhi persegi (dihitung).
  {
    const luasSemua = Array.from({ length: 29 }, (_, i) => petakMandiri(i + 1, 29 - i));
    cek(Math.max(...luasSemua) === 225 && luasSemua.filter((v) => v === 225).length === 1 && luasSemua[14] === 225, "Kawat: hanya persegi 15 dan 15 yang luasnya terbesar, 225");
    cek(luasSemua.slice(0, 14).every((v, i) => v < luasSemua[i + 1]), "Kawat: makin mendekati persegi, luas makin besar (panjang 1 sampai 15)");
  }
  // Batas dan langkah.
  {
    const kecil = jalan(w0, KW, keP(10, 1));
    const kb = KW(kecil, { t: "K_UBAH", d: -1 });
    cek(kb.kawat.p === 1 && /paling sedikit 1 cm/.test(kb.pesan) && KW(kecil, { t: "K_UBAH", d: -5 }).kawat.p === 1, "Kawat: panjang tidak bisa kurang dari 1");
    const besar = jalan(w0, KW, keP(10, 29));
    cek(besar.kawat.p === 29 && KW(besar, { t: "K_UBAH", d: 1 }).kawat.p === 29 && /paling banyak 29 cm/.test(KW(besar, { t: "K_UBAH", d: 5 }).pesan), "Kawat: panjang tidak bisa lebih dari 29");
    cek(KW(w0, { t: "K_UBAH", d: 2 }) === w0 && KW(w0, { t: "K_UBAH", d: 0 }) === w0 && KW(w0, { t: "K_UBAH", d: 10 }) === w0 && KW(w0, { t: "K_UBAH", d: 0.5 }) === w0, "Kawat: langkah selain minus lima, minus satu, satu, lima diabaikan");
    cek(KW(w0, { t: "K_UBAH", d: 1 }).kawat.p === 11 && KW(w0, { t: "K_UBAH", d: -1 }).kawat.p === 9 && KW(w0, { t: "K_UBAH", d: 5 }).kawat.p === 15 && KW(w0, { t: "K_UBAH", d: -5 }).kawat.p === 5, "Kawat: langkah satu dan lima");
    cek(D_.PERUBAHAN.join() === "-5,-1,1,5", "Kawat: empat tombol perubahan");
  }

  // Pilih.
  for (const [i, k] of D_.DATA_PILIH.entries()) {
    const xp = KW(w0, { t: "P_DATA", i });
    const lain = k.jawab === "keliling" ? "luas" : "keliling";
    const salah = KW(xp, { t: "P_JAWAB", jawab: lain });
    cek(salah.pernah.length === 0 && !salah.pesan.startsWith("✅") && salah.pesan.includes(k.teks), `Pilih ${k.teks}: ${lain} ditolak`);
    const benar = KW(xp, { t: "P_JAWAB", jawab: k.jawab });
    cek(benar.pernah.includes(`pilih:${i}`) && benar.pesan.startsWith("✅") && benar.pesan.includes(`${k.teks} memakai ${k.jawab}`), `Pilih ${k.teks}: ${k.jawab} tercatat`);
    cek(KW(xp, { t: "P_JAWAB", jawab: "sudut" }) === xp && KW(xp, { t: "P_JAWAB", jawab: "" }) === xp, `Pilih ${k.teks}: jawaban tak dikenal diabaikan`);
    cek(KW(benar, { t: "P_DATA", i: (i + 1) % 4 }).pernah.includes(`pilih:${i}`), `Pilih ${k.teks}: ganti kebutuhan, riwayat tetap`);
  }
  cek(/pagar|kawat/.test(D_.DATA_PILIH[0].teks + D_.DATA_PILIH[2].teks) && D_.DATA_PILIH[0].jawab === "keliling" && D_.DATA_PILIH[2].jawab === "keliling" && D_.DATA_PILIH[1].jawab === "luas" && D_.DATA_PILIH[3].jawab === "luas" && /ubin/.test(D_.DATA_PILIH[1].teks) && /pasir/.test(D_.DATA_PILIH[3].teks), "Pilih: pagar dan kawat keliling, ubin dan pasir luas");
  cek(KW(w0, { t: "P_DATA", i: 4 }) === w0 && KW(w0, { t: "P_DATA", i: -1 }) === w0, "Pilih: kebutuhan di luar batas diabaikan");

  // Urut.
  {
    const luasU = D_.DATA_URUT.map((d) => petakMandiri(d.p, d.l));
    const benarU = luasU.map((v, i) => [v, i]).sort((a, b) => a[0] - b[0]).map((e) => e[1]);
    sama(luasU.slice().sort((a, b) => a - b), [56, 125, 176, 216, 225], "Urut: luas lima kerangka terurut (cacah petak)");
    cek(new Set(luasU).size === 5 && D_.DATA_URUT.every((d) => d.p + d.l === 30) && D_.DATA_URUT.every((d) => petakMandiri(d.p, d.l) === ulangTambah(d.p, d.l) && kelilingMandiri(d.p, d.l) === 60), "Urut: lima kerangka berkeliling 60 dengan luas berbeda");
    sama(D_.urutanBenar(), benarU, "Urut: urutan benar sama dengan pengurutan luas mandiri");
    cek(D_.urutanBenar().join() !== "0,1,2,3,4" && D_.urutanBenar().join() !== "4,3,2,1,0", "Urut: urutan di layar tidak sama dengan urutan jawaban");
    // Tiap awal yang salah ditolak.
    for (let k = 0; k < 5; k += 1) {
      if (k === benarU[0]) continue;
      const s = KW(w0, { t: "U_PILIH", k });
      cek(s.urut.dipilih.length === 0 && s.pernah.length === 0 && /luasnya lebih kecil/.test(s.pesan) && !s.pesan.startsWith("✅"), `Urut: memilih kerangka ${k} lebih dulu ditolak`);
    }
    let s = w0;
    for (let n = 0; n < 5; n += 1) {
      for (let k = 0; k < 5; k += 1) {
        if (k === benarU[n] || s.urut.dipilih.includes(k)) continue;
        const t = KW(s, { t: "U_PILIH", k });
        cek(t.urut.dipilih.length === n && t.pernah.length === 0 && /luasnya lebih kecil/.test(t.pesan), `Urut: langkah ${n + 1}, kerangka ${k} salah ditolak`);
      }
      s = KW(s, { t: "U_PILIH", k: benarU[n] });
      cek(s.urut.dipilih.length === n + 1 && s.urut.dipilih.join() === benarU.slice(0, n + 1).join(), `Urut: langkah ${n + 1} diterima`);
      if (n < 4) cek(s.pernah.length === 0 && s.pesan.startsWith("✅") && s.pesan.includes(`= ${luasU[benarU[n]]} cm²`), `Urut: langkah ${n + 1} belum selesai, luas ${luasU[benarU[n]]}`);
      cek(KW(s, { t: "U_PILIH", k: benarU[n] }).urut.dipilih.length === n + 1 && /sudah dipilih/.test(KW(s, { t: "U_PILIH", k: benarU[n] }).pesan), `Urut: memilih ulang langkah ${n + 1} ditolak`);
    }
    cek(s.pernah.includes("urut:0") && s.pesan.startsWith("✅") && s.pesan.includes("56 < 125 < 176 < 216 < 225 cm²") && /mendekati persegi/.test(s.pesan), "Urut: urutan lengkap tercatat");
    cek(KW(s, { t: "U_ULANG" }).urut.dipilih.length === 0 && KW(s, { t: "U_ULANG" }).pernah.includes("urut:0"), "Urut: urut ulang mengosongkan pilihan, riwayat tetap");
    cek(KW(w0, { t: "U_PILIH", k: 5 }) === w0 && KW(w0, { t: "U_PILIH", k: -1 }) === w0 && KW(w0, { t: "U_PILIH", k: 1.5 }) === w0, "Urut: kerangka di luar batas diabaikan");
    cek(KW(KW(w0, { t: "U_PILIH", k: benarU[0] }), { t: "U_PILIH", k: benarU[2] }).pernah.length === 0, "Urut: melompat tidak memenuhi");
  }

  // Fuzz.
  const acak = acakDari(97);
  let s = w0;
  let ok = true;
  const pesanSemua = new Set();
  const riwayatSemua = new Set();
  const ID = /^(kawat:(1[5-9]|2[0-9])|pilih:[0-3]|urut:0)$/;
  for (let i = 0; i < 20000; i += 1) {
    const p = acak(22);
    const a =
      p <= 3 ? { t: "K_UBAH", d: D_.PERUBAHAN[acak(4)] } :
      p === 4 ? { t: "K_UBAH", d: acak(12) - 6 } :
      p === 5 || p === 6 ? { t: "K_CATAT" } :
      p === 7 ? { t: "P_DATA", i: acak(5) - (acak(8) === 0 ? 1 : 0) } :
      p === 8 ? { t: "P_JAWAB", jawab: ["keliling", "luas", "sudut"][acak(3)] } :
      p === 9 || p === 10 ? { t: "P_JAWAB", jawab: D_.dataPilih(s).jawab } :
      p === 11 || p === 12 ? { t: "U_PILIH", k: acak(6) - (acak(8) === 0 ? 1 : 0) } :
      p === 13 || p === 14 || p === 15 ? { t: "U_PILIH", k: D_.urutanBenar()[Math.min(s.urut.dipilih.length, 4)] } :
      p === 16 ? { t: "U_ULANG" } :
      acak(40) === 0 ? { t: "RESET" } : { t: "PESAN_KOSONG" };
    const t = KW(s, a);
    if (a.t !== "RESET" && !s.pernah.every((v) => t.pernah.includes(v))) ok = false;
    if (!(t.kawat.p >= 1 && t.kawat.p <= 29 && D_.kelilingKawat(t.kawat.p) === 60)) ok = false;
    if (!(t.pilih.data >= 0 && t.pilih.data < 4)) ok = false;
    if (!(t.urut.dipilih.length <= 5 && new Set(t.urut.dipilih).size === t.urut.dipilih.length && t.urut.dipilih.join() === D_.urutanBenar().slice(0, t.urut.dipilih.length).join())) ok = false;
    for (const id of t.pernah) if (!ID.test(id)) ok = false;
    for (const id of t.pernah) {
      if (s.pernah.includes(id)) continue;
      const [jenis, n] = id.split(":");
      if (jenis === "kawat" && !(a.t === "K_CATAT" && D_.idKawat(t.kawat.p) === id)) ok = false;
      if (jenis === "pilih" && !(a.t === "P_JAWAB" && t.pilih.data === Number(n) && D_.DATA_PILIH[Number(n)].jawab === a.jawab)) ok = false;
      if (jenis === "urut" && !(t.urut.dipilih.length === 5)) ok = false;
    }
    if (t.pesan) pesanSemua.add(t.pesan);
    for (const id of t.pernah) riwayatSemua.add(id);
    s = t;
  }
  cek(ok, "fuzz 20.000 aksi Lab Kawat: batas terjaga, keliling tetap 60, riwayat tidak dicabut dan hanya bila tercapai");
  cek(pesanSemua.size > 30 && [...pesanSemua].every(tanpaAngka), `fuzz Lab Kawat: semua ${pesanSemua.size} pesan dieja menjadi kata`);
  cek(riwayatSemua.size >= 8, `fuzz Lab Kawat: riwayat terkumpul (${[...riwayatSemua].sort().join(" ")})`);
  globalThis.__pesanD = [...pesanSemua];
}

/* ------------------------------ Mesin D ------------------------------ */
{
  const angka = (o) => Number(o.split(" ")[0]);
  const def = MS.MESIN_KAWAT;
  sama(MS.KASUS_KAWAT.map((k) => k.id), ["panjang", "pipih", "sedang"], "Mesin Kawat: tiga kasus");
  sama(MS.KASUS_KAWAT.map((k) => [k.p, k.l, k.perlu]), [[20, 10, "keliling"], [25, 5, "luas"], [18, 12, "keliling"]], "Mesin Kawat: data tiga kasus sesuai rancangan");
  sama(def.stasiun.map((s) => s.id), ["pasangan", "beda", "terbesar", "pilih"], "Mesin Kawat: urutan stasiun");
  for (const [i, k] of MS.KASUS_KAWAT.entries()) {
    const c = def.kasus[i];
    const [pasangan, beda, terbesar, pilih] = c.langkah;
    cek(k.p + k.l === 30 && kelilingMandiri(k.p, k.l) === 60, `Mesin ${k.id}: kerangka ${k.p} dan ${k.l} berkeliling 60 (cacah sisi petak)`);
    cek(pasangan.benar === `${k.l} cm` && pasangan.tanya.includes(`panjang ${k.p} cm`) && pasangan.opsi.includes(`${60 - k.p} cm`) && pasangan.opsi.includes("30 cm") && pasangan.opsi.every((o) => o === pasangan.benar || angka(o) !== k.l) && pasangan.opsi.every((o) => angka(o) > 0), `Mesin ${k.id}: lebar ${k.l}, pengecoh 60 dikurangi panjang dan 30`);
    const L = petakMandiri(k.p, k.l);
    cek(beda.benar === `${L} cm²` && beda.tanya.includes(`${k.p} cm kali ${k.l} cm`) && beda.opsi.includes("60 cm²") && beda.opsi.includes("30 cm²") && beda.opsi.every((o) => o === beda.benar || angka(o) !== L) && L !== 60 && L !== 30, `Mesin ${k.id}: luas ${L}, pengecoh keliling 60 dan 30`);
    const persegi = petakMandiri(15, 15);
    cek(persegi === 225 && L < persegi && terbesar.benar === `persegi 15 cm kali 15 cm, luasnya ${persegi} cm²` && terbesar.opsi.includes(`kerangka ${k.p} cm kali ${k.l} cm, luasnya ${L} cm²`) && terbesar.opsi.includes("sama besar, karena kelilingnya sama") && terbesar.opsi.filter((o) => o !== terbesar.benar).every((o) => !/^persegi 15/.test(o)), `Mesin ${k.id}: persegi 225 lebih besar dari ${L}, pengecoh kerangka lain dan sama besar`);
    const benarPerlu = k.perlu === "keliling" ? "keliling, yaitu panjang di tepi" : "luas, yaitu daerah di dalam";
    cek(pilih.benar === benarPerlu && pilih.tanya.includes(k.keperluan) && pilih.opsi.includes("banyak sudut bangun") && ((k.perlu === "keliling" && /pagar|memagari|kawat/.test(k.keperluan)) || (k.perlu === "luas" && /ubin|pasir/.test(k.keperluan))), `Mesin ${k.id}: ${k.keperluan} memakai ${k.perlu}`);
    const eja = EJ.ejaK5B5(c.ringkas);
    cek([L, persegi, k.l].every((n) => eja.includes(EJ.kataK5B5(n))) && c.ringkas.includes(k.perlu), `Mesin ${k.id}: ringkas dieja dengan hasil benar`);
  }
  cek(MS.KASUS_KAWAT.filter((k) => k.perlu === "keliling").length === 2 && MS.KASUS_KAWAT.filter((k) => k.perlu === "luas").length === 1, "Mesin Kawat: keperluan keliling dan luas dua banding satu");
}

/* ------------------------------ Skenario D ------------------------------ */
{
  const S = SK.SKENARIO_K5B5D;
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
  sama(S.id.replace(/-k5b5$/, ""), K5.ID_SKENARIO_K5B5.D, "id skenario D sesuai id misi");
  const adegan = (id) => S.adegan.find((a) => a.id === id);
  const ubin = adegan("ubin");
  cek(ubin.jumlah === petakMandiri(4, 3) && ubin.cerita.includes("4 m dan 3 m") && ubin.sukses.includes("4 × 3 = 12"), "D: pos jaga 4 dan 3 sama dengan 12 ubin (konsep A)");
  const rumus = adegan("rumus").soal;
  cek(rumus[0].jawaban === String(petakMandiri(8, 3)) && rumus[0].opsi.includes(String(8 + 3)) && rumus[0].opsi.includes(String(8 * 5)) && rumus[0].opsi.filter((o) => o !== "24").every((o) => Number(o) !== 24), "D: persegi panjang 8 dan 3 sama dengan 24, pengecoh 11 dan 40 salah (konsep B)");
  cek(rumus[1].jawaban === String(luasPoligon(poliSegitiga(6, 4))) && rumus[1].opsi.includes(String(petakMandiri(6, 4))) && rumus[1].opsi.includes(String(6 + 4)) && rumus[1].opsi.filter((o) => o !== "12").every((o) => Number(o) !== 12), "D: segitiga 6 dan 4 sama dengan 12 (titik sudut), pengecoh 24 dan 10 salah (konsep B)");
  const gab = adegan("gabungan").soal;
  cek(gab[0].jawaban === String(petakMandiri(4, 3) + petakMandiri(4, 2)) && gab[0].opsi.includes(String(12 - 8)) && gab[0].opsi.includes(String(12 * 8)) && gab[0].opsi.filter((o) => o !== "20").every((o) => Number(o) !== 20), "D: 12 + 8 sama dengan 20, pengecoh 4 dan 96 salah (konsep C)");
  const tp = tumpangMandiri({ A: { x: 0, y: 0, w: 4, h: 3 }, B: { x: 2, y: 0, w: 4, h: 3 } });
  cek(gab[1].jawaban === String(tp.gabungan) && tp.gabungan === 18 && gab[1].teks.includes("12 cm²") && gab[1].teks.includes("6 cm²") && gab[1].opsi.includes("24") && gab[1].opsi.filter((o) => o !== "18").every((o) => Number(o) !== 18), "D: dua 12 menumpuk 6 sama dengan 18 (himpunan petak), pengecoh 24 dan 12 salah (konsep C)");
  const syarat = adegan("syarat");
  const sb = syarat.opsi.find((o) => o.benar);
  cek(/panjang ditambah lebar sama dengan 30/.test(sb.teks) && D_.SETENGAH_KELILING === 30 && syarat.cerita.includes("60 cm") && syarat.opsi.filter((o) => !o.benar).every((o) => !/ditambah lebar sama dengan 30/.test(o.teks)), "D: syarat kawat panjang ditambah lebar 30, pengecoh salah");
  const lk = adegan("luas-kawat").soal;
  cek(lk[0].jawaban === String(petakMandiri(20, 10)) && lk[1].jawaban === String(petakMandiri(25, 5)) && lk[0].opsi.includes("60") && lk[1].opsi.includes("60") && lk[0].opsi.filter((o) => o !== "200").every((o) => Number(o) !== 200) && lk[1].opsi.filter((o) => o !== "125").every((o) => Number(o) !== 125) && kelilingMandiri(20, 10) === 60 && kelilingMandiri(25, 5) === 60, "D: 20 kali 10 sama dengan 200 dan 25 kali 5 sama dengan 125, keliling sama 60 (cacah)");
  const tb = adegan("terbesar");
  const tbb = tb.opsi.find((o) => o.benar);
  cek(petakMandiri(15, 15) === 225 && petakMandiri(20, 10) === 200 && petakMandiri(25, 5) === 125 && /persegi 15 cm kali 15 cm, luasnya 225 cm²/.test(tbb.teks) && tb.opsi.filter((o) => !o.benar).every((o) => !/persegi/.test(o.teks)) && tb.opsi.find((o) => /200/.test(o.teks)).umpan.includes("225"), "D: persegi 15 kali 15 luas 225 paling besar, pengecoh 200 dan 125 salah");
  const posisi = S.adegan.filter((a) => a.jenis === "pilih").map((a) => a.opsi.findIndex((o) => o.benar));
  cek(new Set(posisi).size === posisi.length, `D: letak jawaban pilih bervariasi (${posisi.join("")})`);
  // Menyentuh konsep A sampai D.
  const gabung = JSON.stringify(S);
  cek(/ubin/.test(gabung) && /rumus|alas/.test(gabung) && /menumpuk/.test(gabung) && /keliling/.test(gabung) && /kawat/.test(gabung), "D: skenario menyentuh konsep A (ubin), B (rumus), C (menumpuk), dan D (kawat dan keliling)");
}

/* ------------------------------ Misi ------------------------------ */
{
  const huruf = ["A", "B", "C", "D"];
  sama(Object.keys(TK.MISI_K5B5), huruf, "teks misi untuk A");
  sama(Object.keys(TK.NAMA_SIM_K5B5), huruf, "nama simulasi untuk A");
  cek(TK.hurufK5B5("Z") === "A" && TK.hurufK5B5("A") === "A", "huruf tak dikenal jatuh ke A");
  cek(TK.misiAwalK5Bab5("A").startsWith("Simulasi 1. Misi: ") && tanpaAngka(TK.misiAwalK5Bab5("A")), "misi awal dan dapat dieja");
  for (const h of huruf) {
    const daftar = K5.daftarMisiK5Bab5(h);
    cek(daftar.filter((m) => m.wajib).length === 7 && daftar.filter((m) => !m.wajib).length === 3, `${h}: tujuh misi wajib dan tiga tantangan bebas`);
    cek(new Set(daftar.map((m) => m.id)).size === 10 && daftar.every((m) => m.id.startsWith(`${h.toLowerCase()}-`)), `${h}: id misi unik berawalan huruf`);
    const kosong = [{ alat: "petak", pernah: [] }, { alat: "rumus", pernah: [] }, { alat: "gabungan", pernah: [] }, { alat: "kawat", pernah: [] }, sel("tidak-ada"), A.keadaanPetakK5B5A(A.awalPetakK5B5A()), R.keadaanRumusK5B5B(R.awalRumusK5B5B()), G_.keadaanGabunganK5B5C(G_.awalGabunganK5B5C()), D_.keadaanKawatK5B5D(D_.awalKawatK5B5D())];
    cek(kosong.every((k) => M0.misiBaru(daftar, k, new Set()).length === 0), `${h}: keadaan awal alat tidak memenuhi misi mana pun`);
    cek(daftar.every((m) => m.teks.length > 20 && tanpaAngka(m.teks)), `${h}: teks misi jelas dan dapat dieja`);
    const baru = (k) => M0.misiBaru(daftar, k, new Set());
    cek(baru(sel(K5.ID_MESIN_K5B5[h])).join() === `${h.toLowerCase()}-mesin` && baru(sel(K5.ID_SKENARIO_K5B5[h])).join() === `${h.toLowerCase()}-skenario`, `${h}: id mesin dan skenario memenuhi misinya`);
  }
  cek(M0.misiBaru(K5.MISI_A, { alat: "lain", pernah: ["tutup:0", "tutup:1", "baris:0", "baris:1", "potong:0"] }, new Set()).length === 0, "A: riwayat alat lain tidak memenuhi misi A");

  const capai = (aksi) => M0.misiBaru(K5.MISI_A, A.keadaanPetakK5B5A(jalan(A.awalPetakK5B5A(), L, aksi)), new Set());
  const tutup = (i, { periksa = true, luas = true, kecuali = [] } = {}) => {
    const d = A.DATA_TUTUP[i];
    const aksi = [{ t: "T_DATA", i }];
    for (let ru = 0; ru < d.h; ru += 1) for (let k = 0; k < d.w; k += 1) if (!kecuali.includes(ru * d.w + k)) aksi.push({ t: "T_PETAK", ru, k });
    if (periksa) aksi.push({ t: "T_PERIKSA" });
    if (luas) aksi.push({ t: "T_LUAS", nilai: petakMandiri(d.w, d.h) });
    return aksi;
  };
  cek(capai(tutup(0)).join() === "a-tutup-lima" && capai(tutup(1)).join() === "a-tutup-tiga", "A: menutup 5 dan 2, 3 dan 3 memenuhi");
  cek(capai(tutup(2)).join() === "a-tutup-empat", "A: tantangan menutup 4 dan 2");
  cek(capai(tutup(0, { periksa: false })).length === 0 && capai(tutup(0, { luas: false })).length === 0, "A: menutup tanpa periksa, atau tanpa memilih luas, tidak memenuhi");
  for (let n = 0; n < 10; n += 1) cek(capai(tutup(0, { kecuali: [n] })).length === 0, `A: menutup dengan celah di petak ${n + 1} tidak memenuhi`);
  cek(capai([...tutup(0, { luas: false }), { t: "T_LUAS", nilai: 7 }, { t: "T_LUAS", nilai: 14 }]).length === 0, "A: luas salah (jumlah baris dan kolom, jumlah tepi) tidak memenuhi");
  cek(capai([...tutup(0), ...tutup(1)]).join() === "a-tutup-lima,a-tutup-tiga", "A: dua daerah bersamaan");

  const susun = (i, r, k, luas = true) => [{ t: "B_DATA", i }, ...Array.from({ length: r - 1 }, () => ({ t: "B_BARIS", d: 1 })), ...Array.from({ length: k - 1 }, () => ({ t: "B_KOLOM", d: 1 })), ...(luas ? [{ t: "B_LUAS", nilai: ulangTambah(k, r) }] : [])];
  cek(capai(susun(0, 4, 2)).join() === "a-baris-empat" && capai(susun(1, 6, 3)).join() === "a-baris-enam" && capai(susun(2, 5, 4)).join() === "a-baris-lima", "A: susunan Baris 4 dan 2, 6 dan 3, 5 dan 4 memenuhi");
  cek(capai(susun(0, 2, 4)).length === 0 && capai(susun(0, 4, 3)).length === 0 && capai(susun(0, 4, 2, false)).length === 0, "A: susunan tertukar atau salah, atau belum memilih banyak petak, tidak memenuhi");
  cek(capai([...susun(0, 4, 2, false), { t: "B_LUAS", nilai: 6 }, { t: "B_LUAS", nilai: 16 }]).length === 0, "A: baris ditambah kolom dan baris dikali baris tidak memenuhi");
  cek(capai(susun(1, 4, 2)).length === 0, "A: tugas enam baris tiga kolom dengan susunan empat dua tidak memenuhi");

  const potong = (i, sampai = null) => {
    const d = A.DATA_POTONG[i];
    const m = kisiMandiri(d.tumpuk, d.r, d.c);
    const aksi = [{ t: "PO_DATA", i }];
    const n = sampai ?? m.lebih.length;
    for (let j = 0; j < n; j += 1) aksi.push({ t: "PO_AMBIL", ru: ke(m.lebih[j])[0], k: ke(m.lebih[j])[1] }, { t: "PO_TARUH", ru: ke(m.lubang[j])[0], k: ke(m.lubang[j])[1] });
    return aksi;
  };
  cek(capai(potong(0)).join() === "a-potong" && capai(potong(1)).join() === "a-potong-empat", "A: memindahkan petak tangga tiga dan empat tingkat memenuhi");
  cek(capai(potong(0, 0)).length === 0 && capai(potong(1, 2)).length === 0 && capai(potong(1, 1)).length === 0, "A: pemindahan belum selesai tidak memenuhi");
  cek(capai([...potong(0), ...potong(1)]).join() === "a-potong,a-potong-empat", "A: dua bangun bersamaan");

  // Misi B lewat aksi lab, dan near-miss.
  cek(M0.misiBaru(K5.MISI_B, { alat: "petak", pernah: ["kali:0", "kali:1", "kali:2", "setengah:0", "trap:0"] }, new Set()).length === 0, "B: riwayat alat lain tidak memenuhi misi B");
  const capaiB = (aksi) => M0.misiBaru(K5.MISI_B, R.keadaanRumusK5B5B(jalan(R.awalRumusK5B5B(), LR, aksi)), new Set());
  const kaliAksi = (i, { tinggi = true, luas = true, nilai = null } = {}) => {
    const d = R.DATA_KALI[i];
    const a = [{ t: "K_DATA", i }];
    if (tinggi && d.miring !== null) a.push({ t: "K_TINGGI", nilai: d.tinggi });
    if (luas) a.push({ t: "K_LUAS", nilai: nilai ?? petakMandiri(d.alas, d.tinggi) });
    return a;
  };
  cek(capaiB(kaliAksi(0)).join() === "b-pp" && capaiB(kaliAksi(1)).join() === "b-persegi" && capaiB(kaliAksi(2)).join() === "b-jajar" && capaiB(kaliAksi(3)).join() === "b-jajar-enam", "B: Kali persegi panjang, persegi, dan dua jajargenjang memenuhi");
  cek(capaiB(kaliAksi(2, { tinggi: false })).length === 0 && capaiB(kaliAksi(3, { tinggi: false })).length === 0, "B: jajargenjang tanpa memilih tinggi tidak memenuhi");
  cek(capaiB([{ t: "K_DATA", i: 2 }, { t: "K_TINGGI", nilai: 5 }, { t: "K_LUAS", nilai: 24 }]).length === 0, "B: jajargenjang dengan sisi miring dipilih sebagai tinggi tidak memenuhi");
  cek(capaiB(kaliAksi(2, { nilai: 40 })).length === 0 && capaiB(kaliAksi(2, { nilai: 11 })).length === 0 && capaiB(kaliAksi(0, { nilai: 7 })).length === 0 && capaiB(kaliAksi(0, { nilai: 14 })).length === 0 && capaiB(kaliAksi(0, { luas: false })).length === 0, "B: luas salah (sisi miring, jumlah ukuran) atau belum memilih luas tidak memenuhi");
  cek(capaiB([...kaliAksi(0), ...kaliAksi(1), ...kaliAksi(2)]).join() === "b-pp,b-persegi,b-jajar", "B: tiga bangun Kali bersamaan");
  const setAksi = (i, { ganda = true, nilai = null } = {}) => [{ t: "S_DATA", i }, ...(ganda ? [{ t: "S_GANDA" }] : []), { t: "S_LUAS", nilai: nilai ?? luasSetengahMandiri(R.DATA_SETENGAH[i]) }];
  cek(capaiB(setAksi(0)).join() === "b-segitiga" && capaiB(setAksi(1)).join() === "b-belah" && capaiB(setAksi(2)).join() === "b-layang", "B: segitiga 6 dan 4, belah ketupat, layang-layang memenuhi");
  cek(capaiB(setAksi(0, { ganda: false })).length === 0 && capaiB(setAksi(0, { nilai: 24 })).length === 0 && capaiB(setAksi(0, { nilai: 10 })).length === 0 && capaiB(setAksi(2, { nilai: 48 })).length === 0, "B: Setengah tanpa menggandakan, lupa setengah, atau jumlah ukuran tidak memenuhi");
  const trapAksi = (i, { ganda = true, alas = true, nilai = null, alasNilai = null } = {}) => {
    const d = R.DATA_TRAP[i];
    return [{ t: "T_DATA", i }, ...(ganda ? [{ t: "T_GANDA" }] : []), ...(alas ? [{ t: "T_ALAS", nilai: alasNilai ?? d.a + d.b }] : []), { t: "T_LUAS", nilai: nilai ?? luasPoligon(poliTrap(d.a, d.b, d.t)) }];
  };
  cek(capaiB(trapAksi(0)).join() === "b-trapesium" && capaiB(trapAksi(1)).length === 0, "B: trapesium 5 dan 3 tinggi 4 memenuhi, trapesium 7 dan 5 hanya latihan");
  cek(capaiB(trapAksi(0, { ganda: false })).length === 0 && capaiB(trapAksi(0, { alas: false })).length === 0 && capaiB(trapAksi(0, { alasNilai: 5 })).length === 0 && capaiB(trapAksi(0, { nilai: 32 })).length === 0 && capaiB(trapAksi(0, { nilai: 12 })).length === 0, "B: trapesium tanpa menyusun, tanpa alas, alas satu sisi, tanpa setengah, atau jumlah semua ukuran tidak memenuhi");
  cek(capaiB([...kaliAksi(0), ...setAksi(0), ...trapAksi(0)]).join() === "b-pp,b-segitiga,b-trapesium", "B: tiga tampilan bersamaan");

  // Misi C lewat aksi lab, dan near-miss.
  cek(M0.misiBaru(K5.MISI_C, { alat: "rumus", pernah: ["uraikan:0", "uraikan:1", "uraikan:2", "silang:0", "tumpang:0"] }, new Set()).length === 0, "C: riwayat alat lain tidak memenuhi misi C");
  const capaiC = (aksi) => M0.misiBaru(K5.MISI_C, G_.keadaanGabunganK5B5C(jalan(G_.awalGabunganK5B5C(), LG, aksi)), new Set());
  const uraiAksi = (i, { total = true, kecuali = null, nilaiTotal = null } = {}) => {
    const u = G_.DATA_URAIAN[i];
    const a = [{ t: "U_DATA", i }];
    u.bagian.forEach((b, k) => {
      if (k !== kecuali) a.push({ t: "U_BAGIAN", k, nilai: luasBagianMandiri(b) });
    });
    if (total) a.push({ t: "U_TOTAL", nilai: nilaiTotal ?? u.bagian.reduce((sum, b) => sum + luasBagianMandiri(b), 0) });
    return a;
  };
  cek(capaiC(uraiAksi(0)).join() === "c-denah-rumah" && capaiC(uraiAksi(1)).join() === "c-papan-nama" && capaiC(uraiAksi(2)).join() === "c-tiga-bagian" && capaiC(uraiAksi(3)).join() === "c-ruang-tamu" && capaiC(uraiAksi(4)).join() === "c-pintu", "C: Uraikan lima bangun memenuhi (tiga wajib, dua bebas)");
  for (let i = 0; i < 3; i += 1) for (let k = 0; k < G_.DATA_URAIAN[i].bagian.length; k += 1) cek(capaiC(uraiAksi(i, { kecuali: k })).length === 0, `C: Uraikan ${i} dengan bagian ${k + 1} terlewat tidak memenuhi`);
  cek(capaiC(uraiAksi(0, { total: false })).length === 0 && capaiC(uraiAksi(0, { nilaiTotal: 8 })).length === 0 && capaiC(uraiAksi(0, { nilaiTotal: 28 })).length === 0 && capaiC(uraiAksi(1, { nilaiTotal: 24 })).length === 0, "C: Uraikan tanpa total, atau total terlewat atau dobel, tidak memenuhi");
  const silangAksi = (i, { sama = true, caraDua = true, caraSatu = true } = {}) => {
    const L2 = petakL(G_.DATA_SILANG[i]).size;
    const a = [{ t: "SI_DATA", i }];
    if (caraSatu) a.push({ t: "SI_TOTAL", c: 1, nilai: L2 });
    if (caraDua) a.push({ t: "SI_TOTAL", c: 2, nilai: L2 });
    if (sama) a.push({ t: "SI_SAMA", jawab: "sama" });
    return a;
  };
  cek(capaiC(silangAksi(0)).join() === "c-silang" && capaiC(silangAksi(1)).join() === "c-silang-dua", "C: Silang denah L pertama dan kedua memenuhi");
  cek(capaiC(silangAksi(0, { sama: false })).length === 0 && capaiC(silangAksi(0, { caraDua: false })).length === 0 && capaiC(silangAksi(0, { caraSatu: false })).length === 0 && capaiC([...silangAksi(0, { sama: false }), { t: "SI_SAMA", jawab: "beda" }]).length === 0, "C: Silang tanpa memeriksa sama, hanya satu cara, atau memilih beda tidak memenuhi");
  cek(capaiC([...silangAksi(0, { sama: false }), { t: "SI_TOTAL", c: 2, nilai: 20 }, { t: "SI_SAMA", jawab: "sama" }]).length === 0, "C: Silang cara kedua diganti salah lalu sama tidak memenuhi");
  const tumpAksi = (i, { irisan = true, total = true, nilaiIrisan = null, nilaiTotal = null } = {}) => {
    const m = tumpangMandiri(G_.DATA_TUMPANG[i]);
    const a = [{ t: "TU_DATA", i }];
    if (irisan) a.push({ t: "TU_IRISAN", nilai: nilaiIrisan ?? m.irisan });
    if (total) a.push({ t: "TU_TOTAL", nilai: nilaiTotal ?? m.gabungan });
    return a;
  };
  cek(capaiC(tumpAksi(0)).join() === "c-tumpang" && capaiC(tumpAksi(1)).length === 0, "C: Tumpang 4 kali 3 dan 4 kali 3 memenuhi, pasangan kedua hanya latihan");
  cek(capaiC(tumpAksi(0, { irisan: false })).length === 0 && capaiC(tumpAksi(0, { total: false })).length === 0 && capaiC(tumpAksi(0, { nilaiTotal: 24 })).length === 0 && capaiC(tumpAksi(0, { nilaiTotal: 12 })).length === 0 && capaiC(tumpAksi(0, { nilaiIrisan: 12 })).length === 0, "C: Tumpang tanpa bagian menumpuk, jumlah dobel, satu bangun, atau bagian salah tidak memenuhi");
  cek(capaiC([...uraiAksi(0), ...silangAksi(0), ...tumpAksi(0)]).join() === "c-denah-rumah,c-silang,c-tumpang", "C: tiga tampilan bersamaan");

  // Misi D lewat aksi lab, dan near-miss.
  cek(M0.misiBaru(K5.MISI_D, { alat: "gabungan", pernah: ["kawat:20", "kawat:25", "kawat:15", "pilih:0", "pilih:1", "pilih:2", "pilih:3", "urut:0"] }, new Set()).length === 0, "D: riwayat alat lain tidak memenuhi misi D");
  const capaiD = (aksi) => M0.misiBaru(K5.MISI_D, D_.keadaanKawatK5B5D(jalan(D_.awalKawatK5B5D(), KW, aksi)), new Set());
  const rangkaiKawat = (ps, { catatBentuk = true } = {}) => {
    let sekarang = 10;
    const a = [];
    for (const q of ps) {
      a.push(...keP(sekarang, q));
      sekarang = q;
      if (catatBentuk) a.push({ t: "K_CATAT" });
    }
    return a;
  };
  cek(capaiD(rangkaiKawat([20])).join() === "d-dua-puluh" && capaiD(rangkaiKawat([10])).join() === "d-dua-puluh", "D: kerangka 20 dan 10 (dan 10 dan 20) memenuhi");
  cek(capaiD(rangkaiKawat([25])).join() === "d-pipih" && capaiD(rangkaiKawat([5])).join() === "d-pipih", "D: kerangka 25 dan 5 (dan 5 dan 25) memenuhi");
  cek(capaiD(rangkaiKawat([15])).join() === "d-persegi", "D: persegi 15 dan 15 memenuhi");
  cek(capaiD(rangkaiKawat([18])).join() === "d-delapan-belas" && capaiD(rangkaiKawat([12])).join() === "d-delapan-belas" && capaiD(rangkaiKawat([28])).join() === "d-pipih-sekali" && capaiD(rangkaiKawat([2])).join() === "d-pipih-sekali" && capaiD(rangkaiKawat([22])).join() === "d-dua-dua" && capaiD(rangkaiKawat([8])).join() === "d-dua-dua", "D: tiga tantangan bebas memenuhi");
  cek(capaiD(rangkaiKawat([20, 25, 15])).join() === "d-dua-puluh,d-pipih,d-persegi", "D: tiga kerangka wajib bersamaan");
  cek(capaiD(rangkaiKawat([20, 25, 15], { catatBentuk: false })).length === 0 && capaiD(rangkaiKawat([21, 24, 16, 17, 19, 29])).length === 0, "D: mengatur tanpa mencatat, atau mencatat kerangka lain, tidak memenuhi");
  const pilihAksi = (daftar) => daftar.flatMap(([i, jawab]) => [{ t: "P_DATA", i }, { t: "P_JAWAB", jawab }]);
  const semuaBenar = D_.DATA_PILIH.map((d, i) => [i, d.jawab]);
  cek(capaiD(pilihAksi(semuaBenar)).join() === "d-pilih", "D: keempat kebutuhan dijawab benar memenuhi");
  cek(capaiD(pilihAksi(semuaBenar.slice(0, 3))).length === 0 && capaiD(pilihAksi(semuaBenar.slice(1))).length === 0, "D: hanya tiga kebutuhan tidak memenuhi");
  cek(capaiD(pilihAksi(semuaBenar.map(([i, j]) => [i, j === "luas" ? "keliling" : "luas"]))).length === 0 && capaiD(pilihAksi([...semuaBenar.slice(0, 3), [3, "keliling"]])).length === 0, "D: jawaban terbalik tidak memenuhi");
  const urutAksi = (urutan) => urutan.map((k) => ({ t: "U_PILIH", k }));
  const benarU = D_.urutanBenar();
  cek(capaiD(urutAksi(benarU)).join() === "d-urut", "D: kelima kerangka terurut memenuhi");
  cek(capaiD(urutAksi(benarU.slice(0, 4))).length === 0 && capaiD(urutAksi([...benarU].reverse())).length === 0, "D: urutan belum lengkap atau terbalik tidak memenuhi");
  cek(capaiD(urutAksi([benarU[1], ...benarU])).join() === "d-urut", "D: pilihan keliru ditolak, lalu urutan yang benar tetap memenuhi");
  cek(capaiD([...rangkaiKawat([20, 25, 15]), ...pilihAksi(semuaBenar), ...urutAksi(benarU)]).join() === "d-dua-puluh,d-pipih,d-persegi,d-pilih,d-urut", "D: lima misi lab bersamaan");

  // Gerbang.
  for (const h of huruf) {
    const daftar = M0.tampilMisi(K5.daftarMisiK5Bab5(h));
    const wajibIds = daftar.filter((m) => m.wajib).map((m) => m.id);
    cek(!M0.wajibSelesai(daftar, new Set(wajibIds.slice(0, 6))), `${h}: enam dari tujuh wajib belum membuka gerbang`);
    cek(M0.wajibSelesai(daftar, new Set(wajibIds)), `${h}: tujuh wajib membuka gerbang`);
    cek(M0.bolehLanjut({ adaMisi: true, wajibSelesai: false, dilewati: true, disentuh: true }) && !M0.bolehLanjut({ adaMisi: true, wajibSelesai: false, dilewati: true, disentuh: false }), "lewati hanya setelah disentuh");
  }
}

/* ------------------------------ Konsep tidak bocor antar sub-bab ------------------------------ */
{
  const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas5-bab5-ringkas.json", import.meta.url), "utf8"));
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
  // Sub-Bab A tidak memakai konsep sub-bab berikutnya: rumus bangun (B): segitiga, jajargenjang, trapesium, belah
  // ketupat, layang-layang, setengah, alas, tinggi, diagonal, rumus; bangun gabungan (C): gabungan, uraikan, tumpang,
  // silang; hubungan dengan tepi (D): kawat, keliling.
  const BOCOR_A = /(½|\bsetengah\b|\bsegitiga\b|\bjajar\w*|\btrapesium\b|\bbelah\b|\blayang\b|\balas\b|\btinggi\b|\bdiagonal\b|\brumus\b|\bgabungan\b|\buraikan\b|\burai\b|\btumpang\b|\bsilang\b|\bkawat\b|\bkeliling\b|\bsejajar\b)/i;
  const catat = (teks, apa) => {
    const m = BOCOR_A.exec(teks);
    cek(!m, `A: ${apa} bebas konsep sub-bab berikutnya (${m ? m[0] : ""} di "${String(teks).slice(Math.max(0, (m?.index ?? 0) - 30), (m?.index ?? 0) + 40)}")`);
  };
  for (const t of [TK.MISI_K5B5.A, TK.NAMA_SIM_K5B5.A, ...K5.MISI_A.map((m) => m.teks)]) catat(t, "teks misi");
  catat(teksDari(MS.MESIN_PETAK), "mesin");
  catat(teksDari(SK.SKENARIO_K5B5A), "skenario");
  catat(teksDari(ringkas.subBab.A), "peta dan infografis ringkas");
  catat(tanpaKomentar(baca("SimulasiLabPetakK5B5", "tsx")), "komponen lab (tanpa komentar)");
  catat(tanpaKomentar(baca("model-petak-k5b5", "tsx")), "model gambar (tanpa komentar)");
  catat(tanpaKomentar(baca("lab-petak-k5b5a", "ts")), "logika lab (tanpa komentar)");
  for (const p of globalThis.__pesanA) catat(p, "pesan lab dari fuzz");
  for (const u of [A.ucapTutupK5B5A(x0), A.ucapBarisK5B5A(x0), A.ucapPotongK5B5A(x0)]) catat(u, "ucapan lab");

  // Sub-Bab B tidak memakai konsep sub-bab berikutnya: bangun gabungan (C): gabungan, uraikan, tumpang tindih, silang;
  // hubungan dengan tepi (D): kawat, keliling, isoperimetrik.
  const BOCOR_B = /\b(gabungan|uraikan|urai|tumpang|silang|kawat|keliling|isoperimetrik)\b/i;
  const catatB = (teks, apa) => {
    const m = BOCOR_B.exec(teks);
    cek(!m, `B: ${apa} bebas konsep sub-bab berikutnya (${m ? m[0] : ""} di "${String(teks).slice(Math.max(0, (m?.index ?? 0) - 30), (m?.index ?? 0) + 40)}")`);
  };
  for (const t of [TK.MISI_K5B5.B, TK.NAMA_SIM_K5B5.B, ...K5.MISI_B.map((m) => m.teks)]) catatB(t, "teks misi");
  catatB(teksDari(MS.MESIN_RUMUS), "mesin");
  catatB(teksDari(SK.SKENARIO_K5B5B), "skenario");
  catatB(teksDari(ringkas.subBab.B), "peta dan infografis ringkas");
  catatB(tanpaKomentar(baca("SimulasiLabRumusK5B5", "tsx")), "komponen lab (tanpa komentar)");
  catatB(tanpaKomentar(baca("model-rumus-k5b5", "tsx")), "model gambar (tanpa komentar)");
  catatB(tanpaKomentar(baca("lab-rumus-k5b5b", "ts")), "logika lab (tanpa komentar)");
  for (const p of globalThis.__pesanB) catatB(p, "pesan lab dari fuzz");
  for (const f of ["SimulasiLabRumusK5B5", "model-rumus-k5b5"]) {
    const s = baca(f, "tsx");
    cek(!/correct_index|explanation/.test(s) && !/fetch\(|XMLHttpRequest|api\/|openai|anthropic|gemini/i.test(s), `${f}: tanpa kunci jawaban, jaringan, atau model bahasa`);
  }
  {
    const s = baca("lab-rumus-k5b5b", "ts");
    cek(!/fetch\(|XMLHttpRequest|from "react"|openai|anthropic|gemini|correct_index|explanation/i.test(s) && (s.match(/^import /gm) ?? []).length === 0, "lab-rumus-k5b5b: murni dan tanpa impor");
    const c = baca("SimulasiLabRumusK5B5", "tsx");
    cek(/useEffect\(\(\) => \{\s*onKeadaan\?\.\(keadaan\w+\(x\)\);\s*\}, \[onKeadaan, x\]\);/.test(c), "lab rumus: lapor keadaan lewat useEffect");
    cek(/setLihat\(v\);\s*kirim\(\{ t: "PESAN_KOSONG" \}\);/.test(c), "lab rumus: ganti tampilan mengosongkan pesan");
    const catatan = [...c.matchAll(/^\s*"([^"]+)",$/gm)].map((m) => m[1]);
    cek(catatan.length >= 3 && catatan.every(tanpaAngka), "lab rumus: Coba ini dapat dieja");
    cek(/aria-label="Gandakan bangun"/.test(c) && /aria-label="Susun jajargenjang"/.test(c) && /aria-label=\{`Tinggi \$\{n\}`\}/.test(c) && /aria-label=\{`Luas \$\{n\}`\}/.test(c) && /aria-label=\{`Alas \$\{n\}`\}/.test(c), "lab rumus: tombol tinggi, luas, alas, gandakan, dan susun berlabel");
    const pembungkus = baca("SimulasiK5Bab5", "tsx");
    const coba = [...pembungkus.matchAll(/"([^"]*\?)"/g)].map((m) => m[1]);
    cek(coba.length >= 6 && coba.every(tanpaAngka), "Coba ini mesin A dan B dapat dieja");
    cek(/SimulasiLabRumusK5B5/.test(pembungkus) && /MESIN_RUMUS/.test(pembungkus) && /SKENARIO_K5B5B/.test(pembungkus), "pembungkus memuat lab, mesin, dan skenario B");
  }
  const ucapanB = [];
  for (let i = 0; i < R.DATA_KALI.length; i += 1) {
    const xk = LR(r0, { t: "K_DATA", i });
    ucapanB.push(R.ucapKaliK5B5B(xk), R.ucapKaliK5B5B(LR(xk, { t: "K_TINGGI", nilai: R.DATA_KALI[i].tinggi })));
  }
  for (let i = 0; i < R.DATA_SETENGAH.length; i += 1) {
    const xs = LR(r0, { t: "S_DATA", i });
    ucapanB.push(R.ucapSetengahK5B5B(xs), R.ucapSetengahK5B5B(LR(xs, { t: "S_GANDA" })));
  }
  for (let i = 0; i < R.DATA_TRAP.length; i += 1) {
    const xt = LR(r0, { t: "T_DATA", i });
    const g = LR(xt, { t: "T_GANDA" });
    ucapanB.push(R.ucapTrapK5B5B(xt), R.ucapTrapK5B5B(g), R.ucapTrapK5B5B(LR(g, { t: "T_ALAS", nilai: R.jumlahSejajar(R.DATA_TRAP[i]) })));
  }
  cek(ucapanB.length >= 15 && ucapanB.every(tanpaAngka), `semua ${ucapanB.length} ucapan lab B dieja menjadi kata`);
  for (const u of ucapanB) catatB(u, "ucapan lab");

  // Sub-Bab C tidak memakai konsep sub-bab berikutnya: hubungan dengan tepi dan bentuk tetap (D): kawat, keliling.
  const BOCOR_C = /\b(kawat|keliling|isoperimetrik)\b/i;
  const catatC = (teks, apa) => {
    const m = BOCOR_C.exec(teks);
    cek(!m, `C: ${apa} bebas konsep sub-bab berikutnya (${m ? m[0] : ""} di "${String(teks).slice(Math.max(0, (m?.index ?? 0) - 30), (m?.index ?? 0) + 40)}")`);
  };
  for (const t of [TK.MISI_K5B5.C, TK.NAMA_SIM_K5B5.C, ...K5.MISI_C.map((m) => m.teks)]) catatC(t, "teks misi");
  catatC(teksDari(MS.MESIN_GABUNGAN), "mesin");
  catatC(teksDari(SK.SKENARIO_K5B5C), "skenario");
  catatC(teksDari(ringkas.subBab.C), "peta dan infografis ringkas");
  catatC(tanpaKomentar(baca("SimulasiLabGabunganK5B5", "tsx")), "komponen lab (tanpa komentar)");
  catatC(tanpaKomentar(baca("model-gabungan-k5b5", "tsx")), "model gambar (tanpa komentar)");
  catatC(tanpaKomentar(baca("lab-gabungan-k5b5c", "ts")), "logika lab (tanpa komentar)");
  for (const p of globalThis.__pesanC) catatC(p, "pesan lab dari fuzz");
  for (const f of ["SimulasiLabGabunganK5B5", "model-gabungan-k5b5"]) {
    const s = baca(f, "tsx");
    cek(!/correct_index|explanation/.test(s) && !/fetch\(|XMLHttpRequest|api\/|openai|anthropic|gemini/i.test(s), `${f}: tanpa kunci jawaban, jaringan, atau model bahasa`);
  }
  {
    const s = baca("lab-gabungan-k5b5c", "ts");
    cek(!/fetch\(|XMLHttpRequest|from "react"|openai|anthropic|gemini|correct_index|explanation/i.test(s) && (s.match(/^import /gm) ?? []).length === 0, "lab-gabungan-k5b5c: murni dan tanpa impor");
    const c = baca("SimulasiLabGabunganK5B5", "tsx");
    cek(/useEffect\(\(\) => \{\s*onKeadaan\?\.\(keadaan\w+\(x\)\);\s*\}, \[onKeadaan, x\]\);/.test(c), "lab gabungan: lapor keadaan lewat useEffect");
    cek(/setLihat\(v\);\s*kirim\(\{ t: "PESAN_KOSONG" \}\);/.test(c), "lab gabungan: ganti tampilan mengosongkan pesan");
    const catatan = [...c.matchAll(/^\s*"([^"]+)",$/gm)].map((m) => m[1]);
    cek(catatan.length >= 3 && catatan.every(tanpaAngka), "lab gabungan: Coba ini dapat dieja");
    cek(/aria-label=\{`Bagian \$\{k \+ 1\} luas \$\{n\}`\}/.test(c) && /aria-label=\{`Luas seluruhnya \$\{n\}`\}/.test(c) && /aria-label=\{`Cara \$\{cara\} luas \$\{n\}`\}/.test(c) && /aria-label="Hasil kedua cara sama"/.test(c) && /aria-label=\{`Menumpuk \$\{n\}`\}/.test(c) && /aria-label=\{`Gabungan \$\{n\}`\}/.test(c), "lab gabungan: tombol bagian, total, cara, sama, menumpuk, dan gabungan berlabel");
    const pembungkus = baca("SimulasiK5Bab5", "tsx");
    const coba = [...pembungkus.matchAll(/"([^"]*\?)"/g)].map((m) => m[1]);
    cek(coba.length >= 9 && coba.every(tanpaAngka), "Coba ini mesin A, B, dan C dapat dieja");
    cek(/SimulasiLabGabunganK5B5/.test(pembungkus) && /MESIN_GABUNGAN/.test(pembungkus) && /SKENARIO_K5B5C/.test(pembungkus), "pembungkus memuat lab, mesin, dan skenario C");
  }
  const ucapanC = [];
  for (let i = 0; i < G_.DATA_URAIAN.length; i += 1) {
    const xu = LG(g0, { t: "U_DATA", i });
    ucapanC.push(G_.ucapUraikanK5B5C(xu), G_.ucapUraikanK5B5C(LG(xu, { t: "U_BAGIAN", k: 0, nilai: luasBagianMandiri(G_.DATA_URAIAN[i].bagian[0]) })), G_.ucapUraikanK5B5C(jalan(xu, LG, G_.DATA_URAIAN[i].bagian.map((b, k) => ({ t: "U_BAGIAN", k, nilai: luasBagianMandiri(b) })))));
  }
  for (let i = 0; i < G_.DATA_SILANG.length; i += 1) {
    const xs = LG(g0, { t: "SI_DATA", i });
    const L2 = petakL(G_.DATA_SILANG[i]).size;
    ucapanC.push(G_.ucapSilangK5B5C(xs), G_.ucapSilangK5B5C(jalan(xs, LG, [{ t: "SI_TOTAL", c: 1, nilai: L2 }, { t: "SI_TOTAL", c: 2, nilai: L2 }])));
  }
  for (let i = 0; i < G_.DATA_TUMPANG.length; i += 1) {
    const xt = LG(g0, { t: "TU_DATA", i });
    ucapanC.push(G_.ucapTumpangK5B5C(xt), G_.ucapTumpangK5B5C(LG(xt, { t: "TU_IRISAN", nilai: tumpangMandiri(G_.DATA_TUMPANG[i]).irisan })));
  }
  cek(ucapanC.length >= 15 && ucapanC.every(tanpaAngka), `semua ${ucapanC.length} ucapan lab C dieja menjadi kata`);
  for (const u of ucapanC) catatC(u, "ucapan lab");

  // Sub-Bab D menyentuh konsep sebelumnya, jadi tidak ada uji bocor ke D. Uji murni dan statis berikut tetap berlaku.
  for (const f of ["SimulasiLabKawatK5B5", "model-kawat-k5b5"]) {
    const s = baca(f, "tsx");
    cek(!/correct_index|explanation/.test(s) && !/fetch\(|XMLHttpRequest|api\/|openai|anthropic|gemini/i.test(s), `${f}: tanpa kunci jawaban, jaringan, atau model bahasa`);
  }
  {
    const s = baca("lab-kawat-k5b5d", "ts");
    cek(!/fetch\(|XMLHttpRequest|from "react"|openai|anthropic|gemini|correct_index|explanation/i.test(s) && (s.match(/^import /gm) ?? []).length === 0, "lab-kawat-k5b5d: murni dan tanpa impor");
    const c = baca("SimulasiLabKawatK5B5", "tsx");
    cek(/useEffect\(\(\) => \{\s*onKeadaan\?\.\(keadaan\w+\(x\)\);\s*\}, \[onKeadaan, x\]\);/.test(c), "lab kawat: lapor keadaan lewat useEffect");
    cek(/setLihat\(v\);\s*kirim\(\{ t: "PESAN_KOSONG" \}\);/.test(c), "lab kawat: ganti tampilan mengosongkan pesan");
    const catatan = [...c.matchAll(/^\s*"([^"]+)",$/gm)].map((m) => m[1]);
    cek(catatan.length >= 3 && catatan.every(tanpaAngka), "lab kawat: Coba ini dapat dieja");
    cek(/aria-label="Catat bentuk ini"/.test(c) && /aria-label=\{NAMA_UBAH\[d\]\}/.test(c) && /aria-label="Yang dihitung keliling"/.test(c) && /aria-label="Yang dihitung luas"/.test(c) && /aria-label=\{`Kerangka \$\{d\.p\} kali \$\{d\.l\}`\}/.test(c) && /aria-label="Urut ulang"/.test(c), "lab kawat: tombol ubah, catat, pilih, kerangka, dan urut ulang berlabel");
    const pembungkus = baca("SimulasiK5Bab5", "tsx");
    const coba = [...pembungkus.matchAll(/"([^"]*\?)"/g)].map((m) => m[1]);
    cek(coba.length >= 12 && coba.every(tanpaAngka), "Coba ini mesin A sampai D dapat dieja");
    cek(/SimulasiLabKawatK5B5/.test(pembungkus) && /MESIN_KAWAT/.test(pembungkus) && /SKENARIO_K5B5D/.test(pembungkus), "pembungkus memuat lab, mesin, dan skenario D");
  }
  const ucapanD = [];
  {
    const xk = KW(w0, { t: "K_UBAH", d: 5 });
    ucapanD.push(D_.ucapKawatK5B5D(w0), D_.ucapKawatK5B5D(xk));
    for (let p = 1; p <= 29; p += 7) ucapanD.push(D_.ucapKawatK5B5D(jalan(w0, KW, keP(10, p))));
    for (let i = 0; i < 4; i += 1) ucapanD.push(D_.ucapPilihK5B5D(KW(w0, { t: "P_DATA", i })));
    ucapanD.push(D_.ucapUrutK5B5D(w0), D_.ucapUrutK5B5D(jalan(w0, KW, [{ t: "U_PILIH", k: D_.urutanBenar()[0] }])), D_.ucapUrutK5B5D(jalan(w0, KW, D_.urutanBenar().map((k) => ({ t: "U_PILIH", k })))));
  }
  cek(ucapanD.length >= 12 && ucapanD.every(tanpaAngka), `semua ${ucapanD.length} ucapan lab D dieja menjadi kata`);

  // Kunci tidak bocor ke klien, tanpa jaringan.
  for (const f of ["SimulasiLabPetakK5B5", "SimulasiK5Bab5", "model-petak-k5b5"]) {
    const s = baca(f, "tsx");
    cek(!/correct_index|explanation/.test(s), `${f}: tidak memuat correct_index atau explanation`);
    cek(!/fetch\(|XMLHttpRequest|api\/|openai|anthropic|gemini/i.test(s), `${f}: tanpa jaringan atau model bahasa`);
  }
  for (const f of ["lab-petak-k5b5a", "mesin-data-k5b5", "skenario-k5b5", "misi-k5bab5", "misi-teks-k5b5", "eja-k5b5"]) {
    const s = baca(f, "ts");
    cek(!/fetch\(|XMLHttpRequest|from "react"|openai|anthropic|gemini|correct_index|explanation/i.test(s), `${f}: murni`);
    const impor = s.match(/^import .+$/gm) ?? [];
    cek(impor.every((l) => l.startsWith("import type")), `${f}: hanya mengimpor tipe`);
  }
  cek((baca("lab-petak-k5b5a", "ts").match(/^import /gm) ?? []).length === 0 && (baca("eja-k5b5", "ts").match(/^import /gm) ?? []).length === 0, "lab dan pengeja tanpa impor");
  {
    const s = baca("SimulasiLabPetakK5B5", "tsx");
    cek(/useEffect\(\(\) => \{\s*onKeadaan\?\.\(keadaan\w+\(x\)\);\s*\}, \[onKeadaan, x\]\);/.test(s), "lab: lapor keadaan lewat useEffect");
    cek(/setLihat\(v\);\s*kirim\(\{ t: "PESAN_KOSONG" \}\);/.test(s), "lab: ganti tampilan mengosongkan pesan");
    const catatan = [...s.matchAll(/^\s*"([^"]+)",$/gm)].map((m) => m[1]);
    cek(catatan.length >= 3 && catatan.every(tanpaAngka), "lab: Coba ini dapat dieja");
    cek(/aria-label="Periksa tutupan"/.test(s) && /aria-label=\{`Luas \$\{n\} \$\{t\.sat\}`\}/.test(s) && /aria-label="Tambah baris"/.test(s) && /aria-label="Tambah kolom"/.test(s), "lab: tombol periksa, luas, baris, dan kolom berlabel");
    const m = baca("model-petak-k5b5", "tsx");
    cek(/aria-label=\{`Petak baris \$\{ru \+ 1\} kolom \$\{k \+ 1\}`\}/.test(m) && /Petak lebih/.test(m) && /Petak pas/.test(m) && /"Lubang"/.test(m), "model: petak Tutup dan petak Potong berlabel");
  }
  const pembungkus = baca("SimulasiK5Bab5", "tsx");
  cek(/eja=\{ejaK5B5\}/.test(pembungkus), "pembungkus: mesin dieja ejaK5B5");
  const coba = [...pembungkus.matchAll(/"([^"]*\?)"/g)].map((m) => m[1]);
  cek(coba.length >= 3 && coba.every(tanpaAngka), "Coba ini mesin dapat dieja");
  // Semua ucapan lab dieja menjadi kata.
  const ucapan = [];
  for (let i = 0; i < A.DATA_TUTUP.length; i += 1) {
    const xt = L(x0, { t: "T_DATA", i });
    ucapan.push(A.ucapTutupK5B5A(xt), A.ucapTutupK5B5A(L(xt, { t: "T_PETAK", ru: 0, k: 0 })));
    const d = A.DATA_TUTUP[i];
    const penuh = jalan(xt, L, [...Array(d.h).keys()].flatMap((ru) => [...Array(d.w).keys()].map((k) => ({ t: "T_PETAK", ru, k }))).concat([{ t: "T_PERIKSA" }]));
    ucapan.push(A.ucapTutupK5B5A(penuh));
  }
  for (let i = 0; i < A.DATA_BARIS.length; i += 1) {
    const xb = L(x0, { t: "B_DATA", i });
    ucapan.push(A.ucapBarisK5B5A(xb), A.ucapBarisK5B5A(L(xb, { t: "B_BARIS", d: 1 })));
  }
  for (let i = 0; i < A.DATA_POTONG.length; i += 1) {
    const xp = L(x0, { t: "PO_DATA", i });
    ucapan.push(A.ucapPotongK5B5A(xp));
  }
  cek(ucapan.length >= 12 && ucapan.every(tanpaAngka), `semua ${ucapan.length} ucapan lab dieja menjadi kata`);
  for (const u of ucapan) catat(u, "ucapan lab");
}

/* ------------------------------ Data ringkas ------------------------------ */
{
  const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas5-bab5-ringkas.json", import.meta.url), "utf8"));
  cek(ringkas.chapter_id === "mtk-5-bab5" && ringkas.phase_code === "FASE_C" && ringkas.grade === 5, "ringkas: id bab, fase, kelas");
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
  sama(butir(p1, "rapat").visual.baris.map((r) => r[1]), [5, 5], "ringkas A: tiap baris 5 petak (daerah 5 dan 2)");
  cek(petakMandiri(5, 2) === 10 && butir(p1, "hitung").visual.isi === `5 + 5 = ${ulangTambah(5, 2)}`, "ringkas A: 5 + 5 sama dengan 10 (dihitung)");
  cek(butir(p1, "hitung").suara.includes(EJ.kataK5B5(10)) && butir(p1, "rapat").suara.includes(EJ.kataK5B5(5)) && butir(p1, "satuan").suara.includes("sentimeter persegi"), "ringkas A: suara menyebut hasil, petak, dan satuan");
  const m = kisiMandiri([1, 2, 3], 2, 3);
  const [sebelum, sesudah] = p2.sisi;
  cek(sebelum.visual.isi === `${m.S.size} petak` && sesudah.visual.isi === `${m.R.size} petak` && m.S.size === m.R.size, "ringkas A: tangga dan persegi panjang 2 × 3 sama-sama 6 petak (dihitung)");
  cek(sebelum.suara.includes(EJ.kataK5B5(6)) && sesudah.suara.includes(EJ.kataK5B5(6)), "ringkas A: suara sebelum dan sesudah dipindah");
  cek(butir(p3, "array").visual.isi === `3 × 4 = ${ulangTambah(4, 3)}` && ulangTambah(4, 3) === 12 && butir(p3, "array").suara.includes(EJ.kataK5B5(12)), "ringkas A: 3 × 4 sama dengan 12 (dihitung)");
  cek(butir(p3, "cm").visual.isi === "1 cm × 1 cm = 1 cm²" && butir(p3, "m").visual.isi === "1 m × 1 m = 1 m²", "ringkas A: satuan luas");
  const kartu = (id) => A0.peta.kartu.find((k) => k.id === id).teks;
  cek(kartu("a-lima") === `5 petak tiap baris, 2 baris = ${petakMandiri(5, 2)}` && kartu("a-tiga") === `3 × 3 = ${petakMandiri(3, 3)} petak`, "ringkas A: kartu baris dan kolom (dihitung)");
  cek(kartu("a-tetap") === `Tangga ${m.S.size} petak jadi 2 × 3, luas ${m.R.size}`, "ringkas A: kartu tangga jadi persegi panjang (dihitung)");
  // Angka di ringkas B dihitung ulang mandiri (titik sudut).
  const B0 = ringkas.subBab.B;
  const [q1, q2, q3] = B0.infografis.panel;
  const kata = (n) => EJ.kataK5B5(n);
  cek(butir(q1, "pp").visual.isi === `5 × 2 = ${petakMandiri(5, 2)} cm²` && butir(q1, "pp").suara.includes(kata(10)), "ringkas B: persegi panjang 5 kali 2 sama dengan 10 (dihitung)");
  cek(butir(q1, "persegi").visual.isi === `4 × 4 = ${petakMandiri(4, 4)} cm²` && butir(q1, "persegi").suara.includes(kata(16)), "ringkas B: persegi 4 kali 4 sama dengan 16 (dihitung)");
  cek(butir(q1, "jajar").visual.isi === `8 × 3 = ${luasPoligon(poliJajar(8, 3, 5))} cm²` && butir(q1, "jajar").suara.includes(kata(24)), "ringkas B: jajargenjang 8 kali 3 sama dengan 24 (titik sudut)");
  const [tinggiS, miringS] = q2.sisi;
  cek(tinggiS.visual.isi === `${luasPoligon(poliJajar(8, 3, 5))} cm²` && miringS.visual.isi === `${petakMandiri(8, 5)} cm²` && petakMandiri(8, 5) !== 24 && tinggiS.suara.includes(kata(24)) && miringS.suara.includes(kata(40)) && /salah/.test(miringS.suara), "ringkas B: tinggi 24 benar, sisi miring 40 salah (dihitung)");
  cek(butir(q3, "segitiga").visual.isi === `½ × 6 × 4 = ${luasPoligon(poliSegitiga(6, 4))} cm²` && butir(q3, "belah").visual.isi === `½ × 6 × 4 = ${luasPoligon(poliBelah(6, 4))} cm²` && butir(q3, "segitiga").suara.includes(kata(12)) && butir(q3, "belah").suara.includes(kata(12)), "ringkas B: segitiga dan belah ketupat 6 dan 4 sama dengan 12 (titik sudut)");
  cek(butir(q3, "trap").visual.isi === `½ × (5 + 3) × 4 = ${luasPoligon(poliTrap(5, 3, 4))} cm²` && butir(q3, "trap").suara.includes(kata(16)), "ringkas B: trapesium 5, 3, tinggi 4 sama dengan 16 (titik sudut)");
  const kartuB = (id) => B0.peta.kartu.find((k) => k.id === id).teks;
  cek(kartuB("b-pp") === `5 × 2 = ${petakMandiri(5, 2)} cm²` && kartuB("b-segitiga") === `½ × 6 × 4 = ${luasPoligon(poliSegitiga(6, 4))} cm²` && kartuB("b-trap") === `½ × (5 + 3) × 4 = ${luasPoligon(poliTrap(5, 3, 4))} cm²`, "ringkas B: kartu rumus (dihitung)");
  // Angka di ringkas C dihitung ulang mandiri (cacah petak, titik sudut, himpunan petak).
  const C0 = ringkas.subBab.C;
  const [r1, r2, r3] = C0.infografis.panel;
  const kataC = (n) => EJ.kataK5B5(n);
  const uPertama = G_.DATA_URAIAN[0].bagian.map(luasBagianMandiri);
  cek(sama_(butir(r1, "hitung").visual.baris.map((r) => r[1]), uPertama) && butir(r1, "hitung").suara.includes(kataC(12)) && butir(r1, "hitung").suara.includes(kataC(8)), "ringkas C: bagian 12 dan 8 (cacah petak)");
  cek(butir(r1, "jumlah").visual.isi === `${uPertama.join(" + ")} = ${uPertama.reduce((p, q) => p + q, 0)} cm²` && butir(r1, "jumlah").suara.includes(kataC(20)), "ringkas C: 12 + 8 sama dengan 20 (dihitung)");
  const dl0 = { W: 5, H: 4, w: 2, h: 2 };
  const cc1 = caraMandiri(dl0, 1);
  const cc2 = caraMandiri(dl0, 2);
  const [yoh, kom] = r2.sisi;
  cek(yoh.visual.isi === `${cc1.join(" + ")} = ${petakL(dl0).size}` && kom.visual.isi === `${cc2.join(" + ")} = ${petakL(dl0).size}` && cc1.join() !== cc2.join() && yoh.suara.includes(kataC(16)) && kom.suara.includes(kataC(16)) && r2.kesimpulan.includes(String(petakL(dl0).size)), "ringkas C: cara Yohana 10 + 6 dan cara Komang 12 + 4 sama dengan 16 (himpunan petak)");
  const tp0 = tumpangMandiri(G_.DATA_TUMPANG[0]);
  const dimr = G_.irisan(G_.DATA_TUMPANG[0]);
  cek(butir(r3, "irisan").visual.isi === `${dimr.w} × ${dimr.h} = ${tp0.irisan} cm²` && butir(r3, "jumlah").visual.isi === `${tp0.a} + ${tp0.b} = ${tp0.a + tp0.b}` && butir(r3, "kurang").visual.isi === `${tp0.a + tp0.b} − ${tp0.irisan} = ${tp0.gabungan} cm²` && butir(r3, "kurang").suara.includes(kataC(18)), "ringkas C: menumpuk 6, jumlah 24, dikurangi 6 sama dengan 18 (himpunan petak)");
  const kartuC = (id) => C0.peta.kartu.find((k) => k.id === id).teks;
  cek(kartuC("c-dua") === `${uPertama.join(" + ")} = ${uPertama.reduce((p, q) => p + q, 0)} cm²` && kartuC("c-tiga") === `${G_.DATA_URAIAN[2].bagian.map(luasBagianMandiri).join(" + ")} = ${G_.DATA_URAIAN[2].bagian.map(luasBagianMandiri).reduce((p, q) => p + q, 0)} cm²` && kartuC("c-yohana") === `Cara Yohana: ${cc1.join(" + ")} = 16` && kartuC("c-komang") === `Cara Komang: ${cc2.join(" + ")} = 16` && kartuC("c-kurang") === `${tp0.a} + ${tp0.b} − ${tp0.irisan} = ${tp0.gabungan} cm²`, "ringkas C: kartu jumlah, dua cara, dan menumpuk (dihitung)");
  // Angka di ringkas D dihitung ulang mandiri (cacah petak dan cacah sisi petak di tepi).
  const D0 = ringkas.subBab.D;
  const [d1, d2, d3] = D0.infografis.panel;
  const kataD = (n) => EJ.kataK5B5(n);
  cek(butir(d1, "kawat").visual.isi === "60 cm" && butir(d1, "syarat").visual.isi === "2 × (p + l) = 60" && butir(d1, "tiga").visual.isi === "p + l = 30" && kelilingMandiri(20, 10) === 60 && 20 + 10 === 30, "ringkas D: kawat 60 dan p + l = 30 (cacah sisi petak)");
  cek(butir(d1, "kawat").suara.includes(kataD(60)) && butir(d1, "tiga").suara.includes(kataD(30)), "ringkas D: suara menyebut 60 dan 30");
  const [dua, lima] = d2.sisi;
  cek(dua.visual.isi === `${petakMandiri(20, 10)} cm²` && lima.visual.isi === `${petakMandiri(25, 5)} cm²` && petakMandiri(20, 10) !== petakMandiri(25, 5) && kelilingMandiri(20, 10) === kelilingMandiri(25, 5) && dua.suara.includes(kataD(200)) && lima.suara.includes(kataD(125)), "ringkas D: 20 kali 10 sama dengan 200 dan 25 kali 5 sama dengan 125, keliling sama (dihitung)");
  const urutR = butir(d3, "urut");
  const luasR = urutR.visual.baris.map((r) => r[1]);
  cek(urutR.visual.baris.every((r) => { const [a, b] = r[0].split(" × ").map(Number); return a + b === 30 && petakMandiri(a, b) === r[1]; }) && luasR.every((v, i) => i === 0 || v > luasR[i - 1]), "ringkas D: tabel kerangka 60 cm, luas dihitung dan terurut");
  cek([56, 125, 176, 216, 225].every((n) => urutR.suara.includes(kataD(n))) && [56, 125, 176, 216, 225].join() === D_.DATA_URUT.map((d) => petakMandiri(d.p, d.l)).sort((a, b) => a - b).join(), "ringkas D: suara menyebut lima luas terurut (dihitung)");
  const kartuD = (id) => D0.peta.kartu.find((k) => k.id === id).teks;
  cek(kartuD("d-dua") === `20 × 10 = ${petakMandiri(20, 10)} cm²` && kartuD("d-lima") === `25 × 5 = ${petakMandiri(25, 5)} cm²` && kartuD("d-persegi") === `15 × 15 = ${petakMandiri(15, 15)} cm²`, "ringkas D: kartu luas tiga kerangka (dihitung)");
  sama(Object.keys(ringkas.subBab), ["A", "B", "C", "D"], "ringkas: keempat sub-bab A sampai D");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
