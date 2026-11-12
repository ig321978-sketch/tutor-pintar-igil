// Uji Simulasi Kelas 5 Bab 5 (Luas Daerah Bangun Datar): Lab Petak (Sub-Bab A), mesin, skenario, misi, gerbang,
// data ringkas, pengeja, dan konsep sub-bab berikutnya tidak bocor ke Sub-Bab A.
// Jalankan: node --no-warnings scripts/uji-lab-k5b5.mjs
import { readFileSync } from "node:fs";
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K5 from "../src/components/modul/misi-k5bab5.ts";
import * as TK from "../src/components/modul/misi-teks-k5b5.ts";
import * as A from "../src/components/modul/lab-petak-k5b5a.ts";
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
    cek(x.selesai && def.selesaiId === K5.ID_MESIN_K5B5.A, `${def.id}: bisa diselesaikan, id selesai sesuai misi`);
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

/* ------------------------------ Misi ------------------------------ */
{
  const huruf = ["A"];
  sama(Object.keys(TK.MISI_K5B5), huruf, "teks misi untuk A");
  sama(Object.keys(TK.NAMA_SIM_K5B5), huruf, "nama simulasi untuk A");
  cek(TK.hurufK5B5("Z") === "A" && TK.hurufK5B5("A") === "A", "huruf tak dikenal jatuh ke A");
  cek(TK.misiAwalK5Bab5("A").startsWith("Simulasi 1. Misi: ") && tanpaAngka(TK.misiAwalK5Bab5("A")), "misi awal dan dapat dieja");
  for (const h of huruf) {
    const daftar = K5.daftarMisiK5Bab5(h);
    cek(daftar.filter((m) => m.wajib).length === 7 && daftar.filter((m) => !m.wajib).length === 3, `${h}: tujuh misi wajib dan tiga tantangan bebas`);
    cek(new Set(daftar.map((m) => m.id)).size === 10 && daftar.every((m) => m.id.startsWith(`${h.toLowerCase()}-`)), `${h}: id misi unik berawalan huruf`);
    const kosong = [{ alat: "petak", pernah: [] }, sel("tidak-ada"), A.keadaanPetakK5B5A(A.awalPetakK5B5A())];
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
  catat(tanpaKomentar(baca("SimulasiK5Bab5", "tsx")), "pembungkus (tanpa komentar)");
  catat(tanpaKomentar(baca("mesin-data-k5b5", "ts")), "logika mesin (tanpa komentar)");
  for (const p of globalThis.__pesanA) catat(p, "pesan lab dari fuzz");
  for (const u of [A.ucapTutupK5B5A(x0), A.ucapBarisK5B5A(x0), A.ucapPotongK5B5A(x0)]) catat(u, "ucapan lab");

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
  sama(Object.keys(ringkas.subBab), ["A"], "ringkas: gelombang ini hanya sub-bab A");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
