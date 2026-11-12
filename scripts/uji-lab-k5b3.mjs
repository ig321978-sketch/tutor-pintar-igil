// Uji Simulasi Kelas 5 Bab 3 (Bilangan Pecahan): Lab Banding Pecahan (Sub-Bab A), Lab Jumlah Arsir (Sub-Bab B), Lab Sisa Arsir (Sub-Bab C), mesin, skenario, misi, gerbang,
// data ringkas, pengeja pecahan, dan konsep sub-bab berikutnya tidak bocor ke Sub-Bab A.
// Jalankan: node --no-warnings scripts/uji-lab-k5b3.mjs
import { readFileSync } from "node:fs";
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K5 from "../src/components/modul/misi-k5bab3.ts";
import * as TK from "../src/components/modul/misi-teks-k5b3.ts";
import * as A from "../src/components/modul/lab-banding-k5b3a.ts";
import * as B from "../src/components/modul/lab-jumlah-k5b3b.ts";
import * as C from "../src/components/modul/lab-sisa-k5b3c.ts";
import * as MS from "../src/components/modul/mesin-data-k5b3.ts";
import * as SK from "../src/components/modul/skenario-k5b3.ts";
import * as ME from "../src/components/modul/mesin-bertahap-k3b1.ts";
import * as EJ from "../src/components/modul/eja-k5b3.ts";
import * as EJ1 from "../src/components/modul/eja-k5b1.ts";
import * as D from "../src/components/modul/data-k5b3.ts";

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
const tanpaAngka = (t) => !/\d/.test(EJ.ejaK5B3(t));
const L = A.langkahBandingK5B3A;
const x0 = A.awalBandingK5B3A();
const LB = B.langkahJumlahK5B3B;
const y0 = B.awalJumlahK5B3B();

/* ------------------------------ Hitungan MANDIRI (cara berbeda) ------------------------------ */
// Kode memakai perkalian silang, perkalian, dan sisa bagi (%). Di sini kelipatan dibentuk dengan penjumlahan berulang,
// pecahan senilai dengan mengulang pembilang sebanyak langkah penyebut, dan campuran dengan menambah bagian satu per satu.
const kelipatanMandiri = (d, maks) => {
  const hasil = [];
  for (let v = d; v <= maks; v += d) hasil.push(v);
  return hasil;
};
const penyebutSamaMandiri = (q1, q2) => {
  const a = kelipatanMandiri(q1, q1 * q2);
  const b = kelipatanMandiri(q2, q1 * q2);
  return a.find((v) => b.includes(v));
};
const bersamaMandiri = (q1, q2, n) => kelipatanMandiri(q1, n).includes(n) && kelipatanMandiri(q2, n).includes(n);
/** Pembilang pecahan p/q setelah penyebutnya menjadi d: ulangi p sebanyak langkah q menuju d. */
const ubahMandiri = (p, q, d) => {
  let langkah = 0;
  for (let v = q; v <= d; v += q) langkah += 1;
  let hasil = 0;
  for (let i = 0; i < langkah; i += 1) hasil += p;
  return hasil;
};
const bandingMandiri = (a, b) => {
  const d = penyebutSamaMandiri(a.q, b.q);
  const ap = ubahMandiri(a.p, a.q, d);
  const bp = ubahMandiri(b.p, b.q, d);
  return ap < bp ? "<" : ap > bp ? ">" : "=";
};
/** Campuran ke biasa dengan menambah bagian satu per satu: b bulat berisi q bagian tiap bulat, lalu p bagian lagi. */
const campuranMandiri = (b, p, q) => {
  let bagian = 0;
  for (let i = 0; i < b; i += 1) for (let j = 0; j < q; j += 1) bagian += 1;
  for (let j = 0; j < p; j += 1) bagian += 1;
  return bagian;
};
const kataTandaMandiri = { "<": "lebih kecil dari", ">": "lebih besar dari", "=": "sama dengan" };
const urutMandiri = (daftar) => {
  let d = 1;
  for (const x of daftar) d = penyebutSamaMandiri(d, x.q) ?? d;
  const dengan = daftar.map((x) => ({ ...x, v: ubahMandiri(x.p, x.q, d) }));
  return dengan.sort((m, n) => m.v - n.v);
};
const teksPec = (x) => `${x.p}/${x.q}`;
const teksCamp = (x) => {
  let bulat = 0;
  let sisa = x.p;
  while (sisa >= x.q) {
    sisa -= x.q;
    bulat += 1;
  }
  return bulat > 0 && sisa > 0 ? `${bulat} ${sisa}/${x.q}` : teksPec(x);
};

/* ------------------------------ Pengeja ------------------------------ */
{
  sama(EJ.ejaK5B3("3/4"), "tiga per empat", "eja pecahan biasa");
  sama(EJ.ejaK5B3("2 3/4"), "dua dan tiga per empat", "eja pecahan campuran");
  sama(EJ.ejaK5B3("3 1/2 meter"), "tiga dan satu per dua meter", "eja campuran dengan satuan");
  sama(EJ.ejaK5B3("1/2 < 1/5"), "satu per dua lebih kecil dari satu per lima", "eja tanda kurang dari");
  sama(EJ.ejaK5B3("3/8 > 1/8"), "tiga per delapan lebih besar dari satu per delapan", "eja tanda lebih dari");
  sama(EJ.ejaK5B3("7/8, 11/4, 7/2"), "tujuh per delapan, sebelas per empat, tujuh per dua", "eja daftar pecahan");
  sama(EJ.ejaK5B3("2 × 4 = 8"), "dua dikali empat sama dengan delapan", "eja kali dan sama dengan");
  sama(EJ.ejaK5B3("titik ke-7 dari nol"), "titik ke-tujuh dari nol", "eja ke-");
  sama(EJ.ejaK5B3("14/4 = 7/2 …"), "empat belas per empat sama dengan tujuh per dua titik-titik", "eja titik-titik");
  sama(EJ.ejaK5B3("ada 17/4 dan 4 1/4"), "ada tujuh belas per empat dan empat dan satu per empat", "eja pecahan di dalam kalimat");
  // Kata bilangan sama dengan pengeja Kelas 5 Bab 1 (dihitung dengan cara lain di sana).
  let samaKata = true;
  for (let n = 0; n <= 1200; n += 1) if (EJ.kataK5B3(n) !== EJ1.kataK5B1(n)) samaKata = false;
  cek(samaKata && EJ.kataK5B3(999999) === EJ1.kataK5B1(999999), "kata bilangan sama dengan kataK5B1 (0 sampai 1200 dan 999.999)");
  let semuaKata = true;
  for (let p = 1; p <= 30; p += 1) {
    for (let q = 2; q <= 30; q += 1) {
      const kata = EJ.ejaK5B3(`${p}/${q}`);
      if (kata !== `${EJ1.kataK5B1(p)} per ${EJ1.kataK5B1(q)}` || /\d/.test(kata)) semuaKata = false;
      for (let b = 1; b <= 5; b += 1) if (EJ.ejaK5B3(`${b} ${p}/${q}`) !== `${EJ1.kataK5B1(b)} dan ${kata}` || /\d/.test(EJ.ejaK5B3(`${b} ${p}/${q}`))) semuaKata = false;
    }
  }
  cek(semuaKata, "semua pecahan biasa dan campuran (p sampai 30, q sampai 30, bulat sampai 5) dieja menjadi kata");
}

/* ------------------------------ Data sama dengan buku ------------------------------ */
{
  const naskah = readFileSync(new URL("../src/components/modul/naskah-k5b3.ts", import.meta.url), "utf8");
  const ada = (g) => A.DATA_GARIS.some((t) => t.p === g.p && t.q === g.q);
  cek(D.ANGKA_BUKU.lompat1 === "2 3/4" && D.ANGKA_BUKU.lompat1Biasa === "11/4" && ada({ p: 11, q: 4 }), "Garis: 2 3/4 dan 11/4 dari data buku");
  cek(D.ANGKA_BUKU.lompat2 === "3 1/2" && D.ANGKA_BUKU.lompat2Biasa === "7/2" && ada({ p: 7, q: 2 }), "Garis: 3 1/2 dan 7/2 dari data buku");
  cek(D.ANGKA_BUKU.lompat3 === "7/8" && ada({ p: 7, q: 8 }), "Garis: 7/8 dari data buku");
  cek(naskah.includes("11/4") && naskah.includes("3 1/2"), "naskah memuat 11/4 dan 3 1/2");
  const pasang = D.RONDE_BANDING_CA.flat();
  cek(pasang.some((r) => r.a === "1/2" && r.b === "1/5" && r.tanda === ">") && A.DATA_BANDING.some((p) => teksPec(p.a) === "1/2" && teksPec(p.b) === "1/5"), "Banding: 1/2 dan 1/5 dari data buku");
  cek(pasang.some((r) => r.a === "3/8" && r.b === "5/8" && r.tanda === "<") && A.DATA_BANDING.some((p) => teksPec(p.a) === "3/8" && teksPec(p.b) === "5/8"), "Banding: 3/8 dan 5/8 dari data buku");
  cek(D.RONDE_SORTIR_CA.flat().some((r) => r.label === "1/3") && D.RONDE_SORTIR_CA.flat().some((r) => r.label === "2/3"), "data buku memuat 1/3 dan 2/3");
  for (const [bulat, p, q, biasa] of [[2, 3, 4, "11/4"], [3, 1, 2, "7/2"], [1, 1, 2, "3/2"], [4, 1, 4, "17/4"]]) {
    cek(D.RONDE_CAMPURAN_CA.flat().some((r) => r.campuran === `${bulat} ${p}/${q}` && r.biasa === biasa), `Campuran: ${bulat} ${p}/${q} = ${biasa} dari data buku`);
    cek(A.DATA_CAMPURAN.some((c) => c.b === bulat && c.p === p && c.q === q), `Campuran: ${bulat} ${p}/${q} ada di lab`);
    cek(campuranMandiri(bulat, p, q) === Number(biasa.split("/")[0]), `Campuran: ${bulat} ${p}/${q} sama dengan ${biasa} (penambahan bagian satu per satu)`);
  }
  cek(D.sederhanakan(2, 6).p === 1 && D.sederhanakan(2, 6).q === 3 && A.DATA_BANDING.some((p) => teksPec(p.a) === "1/3" && teksPec(p.b) === "2/6"), "Banding: 1/3 dan 2/6 senilai");
  cek(D.RONDE_URUT_CA.some((r) => r.kunci.join() === "7/2,11/4,7/8"), "data buku: urutan lompatan Yohana");
}

/* ------------------------------ Lab A: Banding Pecahan ------------------------------ */
{
  cek(x0.pernah.length === 0 && x0.pesan === "" && x0.garis.pos === -1 && x0.garis.ok.every((v) => !v) && x0.campuran.bagianOk === false, "awal: kosong, belum ada riwayat");
  cek(x0.banding.d === 0 && A.DATA_BANDING[0].a.q !== A.DATA_BANDING[0].b.q, "awal: pasangan pertama belum punya penyebut sama");

  // Garis: tiap titik, hanya yang tepat diterima.
  for (const [i, t] of A.DATA_GARIS.entries()) {
    const total = A.titikGaris(t);
    cek(total === t.q * Math.ceil(t.p / t.q) && total >= t.p, `Garis ${teksPec(t)}: banyak titik ${total}`);
    const xg = L(x0, { t: "G_DATA", i });
    const placed = [];
    for (let pos = 1; pos <= total; pos += 1) {
      const s = L(L(xg, { t: "G_POS", n: pos }), { t: "G_LETAK" });
      if (pos === t.p) {
        placed.push(pos);
        cek(s.pernah.includes(`garis:${t.p}:${t.q}`) && s.pesan.startsWith("✅") && s.garis.ok[i], `Garis ${teksPec(t)}: titik ke-${pos} diterima`);
        cek(s.pesan.includes(`titik ke-${t.p}`) && s.pesan.includes(`dibagi ${t.q} bagian`), `Garis ${teksPec(t)}: pesan menyebut titik dan banyak bagian`);
        cek((t.p > t.q) === s.pesan.includes(`ditulis juga ${teksCamp(t)}`), `Garis ${teksPec(t)}: campuran disebut bila lebih dari satu bulat`);
      } else {
        cek(s.pernah.length === 0 && !s.pesan.startsWith("✅") && s.pesan.includes(`${pos}/${t.q}`) && !s.garis.ok[i], `Garis ${teksPec(t)}: titik ke-${pos} ditolak`);
        cek((pos < t.p) === /kanan/.test(s.pesan) && (pos > t.p) === /kiri/.test(s.pesan), `Garis ${teksPec(t)}: arah geser untuk titik ke-${pos}`);
      }
    }
    sama(placed, [t.p], `Garis ${teksPec(t)}: tepat satu titik benar`);
    cek(L(xg, { t: "G_LETAK" }).pernah.length === 0 && /Ketuk dulu/.test(L(xg, { t: "G_LETAK" }).pesan), `Garis ${teksPec(t)}: periksa tanpa titik diminta memilih`);
    cek(L(xg, { t: "G_POS", n: 0 }) === xg && L(xg, { t: "G_POS", n: total + 1 }) === xg && L(xg, { t: "G_POS", n: 2.5 }) === xg && L(xg, { t: "G_POS", n: -3 }) === xg, `Garis ${teksPec(t)}: titik di luar batas diabaikan`);
    cek(L(L(xg, { t: "G_POS", n: 2 }), { t: "G_DATA", i: (i + 1) % 3 }).garis.pos === -1, `Garis ${teksPec(t)}: ganti pecahan mengosongkan titik`);
    cek(L(xg, { t: "G_POS", n: 3 }).pesan === "", `Garis ${teksPec(t)}: memilih titik tidak mengirim pesan`);
  }
  cek(A.DATA_GARIS.every((t) => A.titikGaris(t) <= 12), "Garis: paling banyak dua belas titik");
  // Ketiganya di garis: urutan dihitung mandiri.
  const semua = jalan(x0, L, A.DATA_GARIS.flatMap((t, i) => [{ t: "G_DATA", i }, { t: "G_POS", n: t.p }, { t: "G_LETAK" }]));
  const urut = urutMandiri(A.DATA_GARIS).map(teksCamp).join(", ");
  cek(semua.pesan.startsWith("✅") && semua.pesan.includes(`Dari kiri ke kanan: ${urut}.`) && urut === "7/8, 2 3/4, 3 1/2", `Garis: urutan ketiga lompatan ${urut}`);
  sama(A.urutGaris().map(teksPec), urutMandiri(A.DATA_GARIS).map(teksPec), "Garis: urutGaris sama dengan penyamaan penyebut");
  cek(semua.pernah.length === 3 && !jalan(x0, L, [{ t: "G_DATA", i: 0 }, { t: "G_POS", n: 7 }, { t: "G_LETAK" }]).pesan.includes("Dari kiri"), "Garis: urutan baru disebut setelah ketiganya");

  // Banding: tiap pasangan.
  const adaTanda = [];
  for (const [i, pr] of A.DATA_BANDING.entries()) {
    const { a, b } = pr;
    const nama = `${teksPec(a)} dan ${teksPec(b)}`;
    const benar = bandingMandiri(a, b);
    sama(A.tandaBanding(a, b), benar, `Banding ${nama}: tanda perkalian silang sama dengan penyamaan penyebut`);
    adaTanda.push(benar);
    const xb = L(x0, { t: "B_DATA", i });
    const opsi = A.opsiPenyebut(i);
    let sudahSama = xb;
    if (a.q === b.q) {
      cek(opsi.length === 0 && xb.banding.d === a.q, `Banding ${nama}: penyebut sudah sama, tidak ada pilihan`);
      cek(/sudah sama/.test(L(xb, { t: "B_SAMA", nilai: a.q }).pesan), `Banding ${nama}: memilih penyebut diberi tahu sudah sama`);
    } else {
      const d = penyebutSamaMandiri(a.q, b.q);
      cek(A.penyebutSama(a.q, b.q) === d, `Banding ${nama}: penyebut sama terkecil ${d}`);
      cek(opsi.length === 3 && new Set(opsi).size === 3 && opsi.filter((n) => bersamaMandiri(a.q, b.q, n)).join() === String(d), `Banding ${nama}: tiga pilihan unik, hanya ${d} yang cocok`);
      cek(opsi.includes(a.q + b.q) || opsi.includes(Math.max(a.q, b.q)) || opsi.includes(Math.min(a.q, b.q)), `Banding ${nama}: pengecoh penyebut klasik ada`);
      cek(xb.banding.d === 0, `Banding ${nama}: awal belum ada penyebut sama`);
      // Tanda sebelum penyebut ditolak.
      for (const tanda of A.TANDA) cek(L(xb, { t: "B_TANDA", tanda }).pernah.length === 0 && /Samakan dulu/.test(L(xb, { t: "B_TANDA", tanda }).pesan), `Banding ${nama}: tanda ${tanda} sebelum penyebut sama ditolak`);
      for (const n of opsi.filter((v) => v !== d)) {
        const s = L(xb, { t: "B_SAMA", nilai: n });
        cek(s.banding.d === 0 && !s.pesan.startsWith("✅") && /belum bisa dibagi/.test(s.pesan), `Banding ${nama}: penyebut ${n} ditolak`);
        cek(L(s, { t: "B_TANDA", tanda: benar }).pernah.length === 0, `Banding ${nama}: tanda setelah penyebut salah tidak dicatat`);
      }
      sudahSama = L(xb, { t: "B_SAMA", nilai: d });
      const ap = ubahMandiri(a.p, a.q, d);
      const bp = ubahMandiri(b.p, b.q, d);
      cek(sudahSama.banding.d === d && sudahSama.pesan.startsWith("✅") && sudahSama.pesan.includes(`${ap}/${d}`) && sudahSama.pesan.includes(`${bp}/${d}`), `Banding ${nama}: penyebut ${d} diterima, ${ap}/${d} dan ${bp}/${d}`);
      cek(A.ubahKe(a, d) === ap && A.ubahKe(b, d) === bp, `Banding ${nama}: pecahan senilai sama dengan pengulangan pembilang`);
      cek(L(xb, { t: "B_SAMA", nilai: 999 }) === xb, `Banding ${nama}: penyebut di luar pilihan diabaikan`);
    }
    const d = sudahSama.banding.d;
    const ap = ubahMandiri(a.p, a.q, d);
    const bp = ubahMandiri(b.p, b.q, d);
    for (const tanda of A.TANDA) {
      const s = L(sudahSama, { t: "B_TANDA", tanda });
      if (tanda === benar) {
        cek(s.pernah.includes(`banding:${i}`) && s.pesan.startsWith("✅") && s.pesan.includes(`${ap}/${d} ${tanda} ${bp}/${d}`) && s.pesan.includes(kataTandaMandiri[tanda]), `Banding ${nama}: tanda ${tanda} benar tercatat`);
        cek((a.p === b.p && a.q !== b.q) === /Pembilang sama/.test(s.pesan) && (tanda === "=") === /senilai/.test(s.pesan), `Banding ${nama}: catatan khusus tepat`);
      } else {
        cek(s.pernah.length === 0 && !s.pesan.startsWith("✅") && s.pesan.includes(`${ap} dan ${bp}`), `Banding ${nama}: tanda ${tanda} ditolak`);
        cek((a.p === b.p && a.q !== b.q) === /penyebut/.test(s.pesan.replace("setelah penyebut sama", "")), `Banding ${nama}: pesan penyebut hanya untuk pembilang sama`);
      }
    }
    cek(L(sudahSama, { t: "B_TANDA", tanda: "?" }) === sudahSama, `Banding ${nama}: tanda tak dikenal diabaikan`);
    cek(L(sudahSama, { t: "B_DATA", i: (i + 1) % 5 }).banding.d === (A.DATA_BANDING[(i + 1) % 5].a.q === A.DATA_BANDING[(i + 1) % 5].b.q ? A.DATA_BANDING[(i + 1) % 5].a.q : 0), `Banding ${nama}: ganti pasangan mengulang penyebut`);
  }
  cek(adaTanda.includes("<") && adaTanda.includes(">") && adaTanda.includes("="), `Banding: ketiga tanda ada di data (${adaTanda.join("")})`);
  cek(L(x0, { t: "B_DATA", i: 5 }) === x0 && L(x0, { t: "B_DATA", i: -1 }) === x0, "Banding: pasangan di luar batas diabaikan");
  // Perbandingan semua pecahan: perkalian silang sama dengan penyamaan penyebut.
  {
    let ok = true;
    let n = 0;
    for (let p1 = 1; p1 <= 11; p1 += 1) for (let q1 = 2; q1 <= 12; q1 += 1) for (let p2 = 1; p2 <= 11; p2 += 1) for (let q2 = 2; q2 <= 12; q2 += 1) {
      n += 1;
      if (A.tandaBanding({ p: p1, q: q1 }, { p: p2, q: q2 }) !== bandingMandiri({ p: p1, q: q1 }, { p: p2, q: q2 })) ok = false;
      if (A.penyebutSama(q1, q2) !== penyebutSamaMandiri(q1, q2)) ok = false;
    }
    cek(ok, `Banding: perkalian silang dan penyebut sama cocok dengan hitungan mandiri untuk ${n} pasangan`);
  }

  // Campuran: tiap data.
  const adaBagian = [];
  const adaTotal = [];
  for (const [i, c] of A.DATA_CAMPURAN.entries()) {
    const nama = `${c.b} ${c.p}/${c.q}`;
    const bagian = campuranMandiri(c.b, 0, c.q);
    const total = campuranMandiri(c.b, c.p, c.q);
    const oB = A.opsiBagian(i);
    const oT = A.opsiTotal(i);
    cek(oB.length === 3 && new Set(oB).size === 3 && oB.filter((v) => v === bagian).length === 1 && oB.every((v) => Number.isInteger(v) && v > 0), `Campuran ${nama}: tiga pilihan bagian unik, satu benar (${bagian})`);
    cek(oT.length === 3 && new Set(oT).size === 3 && oT.filter((v) => v === total).length === 1 && oT.every((v) => Number.isInteger(v) && v > 0), `Campuran ${nama}: tiga pilihan seluruhnya unik, satu benar (${total})`);
    cek(oT.includes(bagian) && oT.includes(c.b + c.p + c.q) && bagian !== total, `Campuran ${nama}: pengecoh lupa pembilang dan semua angka digabung`);
    cek(oB.includes(c.b + c.q), `Campuran ${nama}: pengecoh bulat dan penyebut digabung`);
    adaBagian.push(oB.indexOf(bagian));
    adaTotal.push(oT.indexOf(total));
    const xc = L(x0, { t: "C_DATA", i });
    // Seluruhnya sebelum bagian ditolak.
    for (const v of oT) cek(L(xc, { t: "C_TOTAL", nilai: v }).pernah.length === 0 && /Tentukan dulu/.test(L(xc, { t: "C_TOTAL", nilai: v }).pesan), `Campuran ${nama}: seluruhnya ${v} sebelum bagian ditolak`);
    for (const v of oB.filter((o) => o !== bagian)) {
      const s = L(xc, { t: "C_BAGIAN", nilai: v });
      cek(!s.campuran.bagianOk && !s.pesan.startsWith("✅") && s.pesan.includes(`${c.q} bagian`), `Campuran ${nama}: bagian ${v} ditolak`);
    }
    const sB = L(xc, { t: "C_BAGIAN", nilai: bagian });
    cek(sB.campuran.bagianOk && sB.pesan.startsWith("✅") && sB.pesan.includes(`${bagian} bagian`), `Campuran ${nama}: bagian ${bagian} benar`);
    for (const v of oT.filter((o) => o !== total)) {
      const s = L(sB, { t: "C_TOTAL", nilai: v });
      cek(s.pernah.length === 0 && !s.pesan.startsWith("✅") && s.pesan.length > 10, `Campuran ${nama}: seluruhnya ${v} ditolak`);
      cek(/baru bagian dari bilangan bulatnya/.test(s.pesan) === (v === bagian), `Campuran ${nama}: seluruhnya ${v} dijelaskan lupa pembilang dengan tepat`);
      cek(/Menggabung semua angka/.test(s.pesan) === (v === c.b + c.p + c.q && v !== bagian), `Campuran ${nama}: seluruhnya ${v} dijelaskan digabung dengan tepat`);
    }
    const sT = L(sB, { t: "C_TOTAL", nilai: total });
    cek(sT.pernah.includes(`campuran:${c.b}:${c.p}:${c.q}`) && sT.pesan.startsWith("✅") && sT.pesan.includes(`${nama} sama dengan ${total}/${c.q}`) && sT.pesan.includes(`${c.b} × ${c.q} = ${bagian}`), `Campuran ${nama}: ${total}/${c.q} tercatat`);
    cek(!L(sB, { t: "C_DATA", i: (i + 1) % 4 }).campuran.bagianOk, `Campuran ${nama}: ganti data mengulang bagian`);
    cek(L(sB, { t: "C_TOTAL", nilai: 999 }) === sB && L(xc, { t: "C_BAGIAN", nilai: 999 }) === xc, `Campuran ${nama}: nilai di luar pilihan diabaikan`);
  }
  cek(new Set(adaBagian).size >= 2 && new Set(adaTotal).size >= 2, `Campuran: letak jawaban benar bervariasi (${adaBagian.join("")} / ${adaTotal.join("")})`);
  cek(L(x0, { t: "C_DATA", i: 4 }) === x0, "Campuran: data di luar batas diabaikan");

  // Fuzz.
  const acak = acakDari(53);
  let s = x0;
  let ok = true;
  const pesanSemua = new Set();
  const riwayatSemua = new Set();
  const ID = /^(garis:(7:8|11:4|7:2)|banding:[0-4]|campuran:(2:3:4|3:1:2|1:1:2|4:1:4))$/;
  for (let i = 0; i < 20000; i += 1) {
    const p = acak(18);
    const g = A.dataGaris(s);
    const pr = A.dataBanding(s);
    const opsiP = A.opsiPenyebut(s.banding.data);
    const kunciPos = g.p;
    const a =
      p === 0 ? { t: "G_DATA", i: acak(4) } :
      p === 1 ? { t: "G_POS", n: acak(15) } :
      p === 2 ? { t: "G_POS", n: acak(3) === 0 ? kunciPos : acak(15) } :
      p === 3 ? { t: "G_LETAK" } :
      p === 4 ? { t: "B_DATA", i: acak(6) } :
      p === 5 ? { t: "B_SAMA", nilai: opsiP.length ? (acak(5) === 0 ? 99 : opsiP[acak(opsiP.length)]) : acak(10) } :
      p === 6 ? { t: "B_SAMA", nilai: opsiP.length ? A.penyebutSama(pr.a.q, pr.b.q) : 3 } :
      p <= 8 ? { t: "B_TANDA", tanda: acak(7) === 0 ? "?" : A.TANDA[acak(3)] } :
      p === 9 ? { t: "B_TANDA", tanda: A.tandaBanding(pr.a, pr.b) } :
      p === 10 ? { t: "C_DATA", i: acak(5) } :
      p === 11 ? { t: "C_BAGIAN", nilai: acak(6) === 0 ? 99 : A.opsiBagian(s.campuran.data)[acak(3)] } :
      p === 12 ? { t: "C_TOTAL", nilai: acak(6) === 0 ? 99 : A.opsiTotal(s.campuran.data)[acak(3)] } :
      p === 13 ? { t: "C_BAGIAN", nilai: A.dataCampuran(s).b * A.dataCampuran(s).q } :
      p === 14 ? { t: "C_TOTAL", nilai: A.dataCampuran(s).b * A.dataCampuran(s).q + A.dataCampuran(s).p } :
      p === 15 ? { t: "PESAN_KOSONG" } :
      acak(40) === 0 ? { t: "RESET" } : { t: "G_LETAK" };
    const t = L(s, a);
    if (a.t !== "RESET" && !s.pernah.every((v) => t.pernah.includes(v))) ok = false;
    if (a.t !== "RESET" && !s.garis.ok.every((v, j) => !v || t.garis.ok[j])) ok = false;
    if (!(t.garis.data >= 0 && t.garis.data < 3 && t.garis.pos >= -1 && t.garis.pos <= A.titikGaris(A.dataGaris(t)))) ok = false;
    if (!(t.banding.data >= 0 && t.banding.data < 5 && t.campuran.data >= 0 && t.campuran.data < 4)) ok = false;
    const pb = A.dataBanding(t);
    if (!(t.banding.d === 0 || (t.banding.d % pb.a.q === 0 && t.banding.d % pb.b.q === 0))) ok = false;
    if (typeof t.campuran.bagianOk !== "boolean") ok = false;
    for (const id of t.pernah) if (!ID.test(id)) ok = false;
    if (t.pesan) pesanSemua.add(t.pesan);
    for (const id of t.pernah) riwayatSemua.add(id);
    s = t;
  }
  cek(ok, "fuzz 20.000 aksi Lab Banding Pecahan: batas terjaga, riwayat tidak dicabut");
  cek(pesanSemua.size > 40 && [...pesanSemua].every(tanpaAngka), `fuzz Lab Banding Pecahan: semua ${pesanSemua.size} pesan dieja menjadi kata`);
  cek(riwayatSemua.size >= 9, `fuzz Lab Banding Pecahan: riwayat terkumpul (${[...riwayatSemua].join(" ")})`);
  globalThis.__pesanA = [...pesanSemua];
}

/* ------------------------------ Mesin ------------------------------ */
{
  for (const def of MS.SEMUA_MESIN_K5B3) {
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
    cek(x.selesai && Object.values(K5.ID_MESIN_K5B3).includes(def.selesaiId), `${def.id}: bisa diselesaikan, id selesai sesuai misi`);
  }
  // Kunci dan pengecoh dihitung ulang mandiri.
  for (const [i, k] of MS.KASUS_BANDING.entries()) {
    const c = MS.MESIN_BANDING.kasus[i];
    const [garis, banding, campuran, urut] = c.langkah;
    // Garis: titik ke-t dari nol, dihitung bagian demi bagian.
    let titik = 0;
    for (let j = 0; j < k.t; j += 1) titik += 1;
    cek(garis.benar === `${titik}/${k.q}` && garis.tanya.includes(`${k.q} bagian`) && garis.tanya.includes(`ke-${k.t}`), `Mesin ${k.id}: titik ke-${k.t} adalah ${titik}/${k.q}`);
    cek(garis.opsi.every((o) => o === garis.benar || o !== `${titik}/${k.q}`) && garis.opsi.includes(`${k.q}/${k.t}`) && garis.opsi.includes(`${k.t - 1}/${k.q}`), `Mesin ${k.id}: pengecoh garis (tertukar, satu bagian kurang)`);
    // Banding: pecahan yang lebih besar lewat penyamaan penyebut.
    const tanda = bandingMandiri(k.a, k.b);
    const lebih = tanda === ">" ? k.a : k.b;
    const lain = tanda === ">" ? k.b : k.a;
    cek(tanda !== "=" && banding.benar === teksPec(lebih) && banding.tanya.includes(teksPec(k.a)) && banding.tanya.includes(teksPec(k.b)), `Mesin ${k.id}: ${teksPec(lebih)} lebih besar`);
    cek(banding.opsi.includes(teksPec(lain)) && banding.opsi.includes("sama besar") && banding.opsi.every((o) => o === banding.benar || o !== teksPec(lebih)), `Mesin ${k.id}: pengecoh banding salah`);
    // Campuran: tambah bagian satu per satu.
    const tot = campuranMandiri(k.c.b, k.c.p, k.c.q);
    cek(campuran.benar === `${tot}/${k.c.q}` && campuran.tanya.includes(`${k.c.b} ${k.c.p}/${k.c.q}`), `Mesin ${k.id}: ${k.c.b} ${k.c.p}/${k.c.q} sama dengan ${tot}/${k.c.q}`);
    cek(campuran.opsi.includes(`${campuranMandiri(k.c.b, 0, k.c.q)}/${k.c.q}`) && (campuran.opsi.includes(`${k.c.b + k.c.p}/${k.c.q}`) || campuran.opsi.includes(`${k.c.b + k.c.p + k.c.q}/${k.c.q}`)) && campuran.opsi.every((o) => o === campuran.benar || o !== `${tot}/${k.c.q}`), `Mesin ${k.id}: pengecoh campuran (lupa pembilang, bulat dan pembilang digabung)`);
    // Urut: dari kecil ke besar, dihitung dengan penyamaan penyebut.
    const kecil = urutMandiri(k.u).map(teksPec);
    cek(new Set(urutMandiri(k.u).map((m) => m.v)).size === 3, `Mesin ${k.id}: ketiga pecahan berbeda nilai`);
    cek(urut.benar === kecil.join(", ") && urut.tanya.includes(k.u.map(teksPec).join(", ")), `Mesin ${k.id}: urutan ${kecil.join(", ")}`);
    const lainnya = urut.opsi.filter((o) => o !== urut.benar);
    cek(lainnya.length === 2 && lainnya.every((o) => [...o.split(", ")].sort().join() === [...kecil].sort().join() && o !== kecil.join(", ")), `Mesin ${k.id}: pengecoh urut adalah urutan lain dari pecahan yang sama`);
    cek(lainnya.includes([...kecil].reverse().join(", ")), `Mesin ${k.id}: pengecoh urut terbalik`);
    cek(EJ.ejaK5B3(c.ringkas).includes(EJ.kataPecahanK5B3(titik, k.q)), `Mesin ${k.id}: ringkas dieja dengan pecahan benar`);
  }
  sama(MS.KASUS_BANDING.map((k) => k.id), ["yohana", "pembilang", "penyebut"], "Mesin: tiga kasus");
}

/* ------------------------------ Skenario ------------------------------ */
{
  const S = SK.SKENARIO_K5B3A;
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
  sama(S.id.replace(/-k5b3$/, ""), K5.ID_SKENARIO_K5B3.A, "id skenario sesuai id misi");
  const adegan = (id) => S.adegan.find((a) => a.id === id);
  // Biasa: 2 3/4 = 11/4.
  const biasa = adegan("biasa");
  const b11 = `${campuranMandiri(2, 3, 4)}/4`;
  const bb = biasa.opsi.find((o) => o.benar);
  cek(b11 === "11/4" && bb.teks.startsWith(b11) && biasa.cerita.includes("2 3/4"), "A: 2 3/4 sama dengan 11/4 (dihitung)");
  cek(biasa.opsi.filter((o) => !o.benar).every((o) => !o.teks.startsWith(b11)) && biasa.opsi.some((o) => o.teks.startsWith("6/4")) && biasa.opsi.some((o) => o.teks.startsWith("5/4")), "A: pengecoh campuran salah (6/4 dan 5/4)");
  const potong = adegan("potong");
  cek(potong.jumlah === campuranMandiri(2, 3, 4) && potong.cerita.includes("2 3/4"), "A: banyak potongan seperempat meter 11 (dihitung)");
  const setengah = adegan("setengah");
  cek(setengah.target === campuranMandiri(3, 1, 2) && setengah.target <= setengah.maks && setengah.cerita.includes("3 1/2"), "A: banyak potongan setengah meter 7 (dihitung)");
  cek(/3 bulat berisi 6 potongan/.test(setengah.lebih) && campuranMandiri(3, 0, 2) === 6, "A: 3 bulat berisi 6 potongan setengah (dihitung)");
  const soal = adegan("banding").soal;
  cek(soal[0].teks.includes("1/2 atau 1/5") && soal[0].jawaban === "1/2" && bandingMandiri({ p: 1, q: 2 }, { p: 1, q: 5 }) === ">" && !soal[0].opsi.filter((o) => o !== "1/2").includes("1/2"), "A: 1/2 lebih besar dari 1/5 (dihitung)");
  cek(soal[1].jawaban === String(penyebutSamaMandiri(2, 5)) && soal[1].opsi.filter((o) => o !== soal[1].jawaban).every((o) => !bersamaMandiri(2, 5, Number(o))), "A: penyebut sama untuk 1/2 dan 3/5 adalah 10, pengecoh bukan (dihitung)");
  cek(soal[2].jawaban === bandingMandiri({ p: 3, q: 8 }, { p: 5, q: 8 }) && soal[2].jawaban === "<" && soal[2].opsi.length === 3, "A: 3/8 lebih kecil dari 5/8 (dihitung)");
  const terjauh = adegan("terjauh");
  const paling = urutMandiri(A.DATA_GARIS).map(teksCamp).at(-1);
  const tj = terjauh.opsi.find((o) => o.benar);
  cek(paling === "3 1/2" && tj.teks.startsWith(paling) && tj.teks.includes("7/2") && ubahMandiri(7, 2, 4) === 14, "A: lompatan terjauh 3 1/2 (dihitung)");
  cek(terjauh.opsi.filter((o) => !o.benar).every((o) => !o.teks.startsWith(paling)) && terjauh.umpan === undefined, "A: pengecoh terjauh salah");
  const posisi = S.adegan.filter((a) => a.jenis === "pilih").map((a) => a.opsi.findIndex((o) => o.benar));
  cek(new Set(posisi).size === posisi.length, `A: letak jawaban pilih bervariasi (${posisi.join("")})`);
}

/* ------------------------------ Misi ------------------------------ */
{
  const huruf = ["A", "B", "C"];
  sama(Object.keys(TK.MISI_K5B3), huruf, "teks misi untuk A, B, dan C");
  sama(Object.keys(TK.NAMA_SIM_K5B3), huruf, "nama simulasi untuk A, B, dan C");
  cek(TK.hurufK5B3("Z") === "A" && TK.hurufK5B3("A") === "A", "huruf tak dikenal jatuh ke A");
  cek(TK.hurufK5B3("B") === "B" && TK.hurufK5B3("C") === "C" && TK.hurufK5B3("Z") === "A", "huruf B dan C dikenal");
  cek(["A", "B", "C"].every((h) => TK.misiAwalK5Bab3(h).startsWith("Simulasi 1. Misi: ") && tanpaAngka(TK.misiAwalK5Bab3(h))), "misi awal dan dapat dieja");
  for (const h of huruf) {
    const daftar = K5.daftarMisiK5Bab3(h);
    cek(daftar.filter((m) => m.wajib).length === 7 && daftar.filter((m) => !m.wajib).length === 3, `${h}: tujuh misi wajib dan tiga tantangan bebas`);
    cek(new Set(daftar.map((m) => m.id)).size === 10 && daftar.every((m) => m.id.startsWith(`${h.toLowerCase()}-`)), `${h}: id misi unik berawalan huruf`);
    const kosong = [{ alat: "banding", pernah: [] }, { alat: "jumlah", pernah: [] }, { alat: "sisa", pernah: [] }, sel("tidak-ada"), A.keadaanBandingK5B3A(A.awalBandingK5B3A()), B.keadaanJumlahK5B3B(B.awalJumlahK5B3B()), C.keadaanSisaK5B3C(C.awalSisaK5B3C())];
    cek(kosong.every((k) => M0.misiBaru(daftar, k, new Set()).length === 0), `${h}: keadaan awal alat tidak memenuhi misi mana pun`);
    cek(daftar.every((m) => m.teks.length > 20 && tanpaAngka(m.teks)), `${h}: teks misi jelas dan dapat dieja`);
    const baru = (k) => M0.misiBaru(daftar, k, new Set());
    cek(baru(sel(K5.ID_MESIN_K5B3[h])).join() === `${h.toLowerCase()}-mesin` && baru(sel(K5.ID_SKENARIO_K5B3[h])).join() === `${h.toLowerCase()}-skenario`, `${h}: id mesin dan skenario memenuhi misinya`);
  }
  cek(M0.misiBaru(K5.MISI_A, { alat: "lain", pernah: ["garis:7:8", "garis:11:4", "garis:7:2", "banding:0", "campuran:2:3:4"] }, new Set()).length === 0, "A: riwayat alat lain tidak memenuhi misi A");

  // Jalur nyata lewat aksi lab, dan near-miss.
  const capai = (aksi) => M0.misiBaru(K5.MISI_A, A.keadaanBandingK5B3A(jalan(A.awalBandingK5B3A(), L, aksi)), new Set());
  const taruh = (...idx) => idx.flatMap((i) => [{ t: "G_DATA", i }, { t: "G_POS", n: A.DATA_GARIS[i].p }, { t: "G_LETAK" }]);
  cek(capai(taruh(0, 1, 2)).join() === "a-garis", "A: ketiga lompatan di garis memenuhi");
  cek(capai(taruh(0, 1)).length === 0 && capai(taruh(1, 2)).length === 0, "A: hanya dua lompatan di garis tidak memenuhi");
  cek(capai([...taruh(0, 1), { t: "G_DATA", i: 2 }, { t: "G_POS", n: 6 }, { t: "G_LETAK" }]).length === 0 && capai([...taruh(0, 1), { t: "G_DATA", i: 2 }, { t: "G_POS", n: 7 }]).length === 0, "A: titik meleset satu atau belum diperiksa tidak memenuhi");
  const banding = (i, tanda, ubahSama = true) => {
    const { a, b } = A.DATA_BANDING[i];
    const aksi = [{ t: "B_DATA", i }];
    if (ubahSama && a.q !== b.q) aksi.push({ t: "B_SAMA", nilai: penyebutSamaMandiri(a.q, b.q) });
    aksi.push({ t: "B_TANDA", tanda });
    return aksi;
  };
  cek(capai(banding(0, bandingMandiri(A.DATA_BANDING[0].a, A.DATA_BANDING[0].b))).join() === "a-pembilang", "A: 1/2 dan 1/5 memenuhi");
  cek(capai(banding(0, "<")).length === 0 && capai(banding(0, "=")).length === 0, "A: 1/2 dan 1/5 dengan tanda salah tidak memenuhi");
  cek(capai(banding(0, ">", false)).length === 0, "A: tanda tanpa menyamakan penyebut tidak memenuhi");
  cek(capai(banding(2, "<")).join() === "a-beda" && capai(banding(2, ">")).length === 0, "A: 1/2 dan 3/5 memenuhi hanya dengan tanda benar");
  cek(capai([{ t: "B_DATA", i: 2 }, { t: "B_SAMA", nilai: 7 }, { t: "B_TANDA", tanda: "<" }]).length === 0, "A: penyebut yang salah tidak memenuhi");
  cek(capai(banding(1, "<")).join() === "a-penyebut" && capai(banding(1, ">")).length === 0, "A: tantangan 3/8 dan 5/8");
  cek(capai(banding(4, "=")).join() === "a-senilai" && capai(banding(4, "<")).length === 0, "A: tantangan 1/3 dan 2/6 sama besar");
  cek(capai(banding(3, "<")).length === 0, "A: pasangan 2/3 dan 3/4 hanya latihan, bukan misi");
  const campur = (i, ...nilai) => {
    const c = A.DATA_CAMPURAN[i];
    return [{ t: "C_DATA", i }, { t: "C_BAGIAN", nilai: campuranMandiri(c.b, 0, c.q) }, ...nilai.map((n) => ({ t: "C_TOTAL", nilai: n }))];
  };
  const tot = (i) => campuranMandiri(A.DATA_CAMPURAN[i].b, A.DATA_CAMPURAN[i].p, A.DATA_CAMPURAN[i].q);
  cek(capai(campur(0, tot(0))).join() === "a-biasa" && capai(campur(1, tot(1))).join() === "a-setengah", "A: campuran 2 3/4 dan 3 1/2 memenuhi");
  cek(capai(campur(0, 8)).length === 0 && capai(campur(0, 9)).length === 0 && capai([{ t: "C_DATA", i: 0 }, { t: "C_TOTAL", nilai: tot(0) }]).length === 0, "A: seluruhnya salah atau tanpa bagian tidak memenuhi");
  cek(capai([{ t: "C_DATA", i: 0 }, { t: "C_BAGIAN", nilai: 6 }, { t: "C_TOTAL", nilai: tot(0) }]).length === 0, "A: bagian salah lalu seluruhnya tidak memenuhi");
  cek(capai(campur(3, tot(3))).join() === "a-empat" && capai(campur(2, tot(2))).length === 0, "A: tantangan 4 1/4 (dan 1 1/2 bukan misi)");

  // Gerbang.
  for (const h of huruf) {
    const daftar = M0.tampilMisi(K5.daftarMisiK5Bab3(h));
    const wajibIds = daftar.filter((m) => m.wajib).map((m) => m.id);
    cek(!M0.wajibSelesai(daftar, new Set(wajibIds.slice(0, 6))), `${h}: enam dari tujuh wajib belum membuka gerbang`);
    cek(M0.wajibSelesai(daftar, new Set(wajibIds)), `${h}: tujuh wajib membuka gerbang`);
    cek(M0.bolehLanjut({ adaMisi: true, wajibSelesai: false, dilewati: true, disentuh: true }) && !M0.bolehLanjut({ adaMisi: true, wajibSelesai: false, dilewati: true, disentuh: false }), "lewati hanya setelah disentuh");
  }
}

/* ------------------------------ Konsep tidak bocor antar sub-bab ------------------------------ */
{
  const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas5-bab3-ringkas.json", import.meta.url), "utf8"));
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
  // Sub-Bab A tidak memakai konsep B (penjumlahan, KPK) dan C (pengurangan).
  const BOCOR_A = /(jumlah|kurang|tambah|kurangi|penjumlahan|pengurangan|kpk|sisa daerah|arsir daerah)/i;
  const LAMBANG = /[+−]|\s-\s/;
  const catat = (teks, apa, lambang = true) => {
    const m = BOCOR_A.exec(teks);
    cek(!m, `A: ${apa} bebas konsep sub-bab berikutnya (${m ? m[0] : ""} di "${String(teks).slice(Math.max(0, (m?.index ?? 0) - 30), (m?.index ?? 0) + 40)}")`);
    if (lambang) cek(!LAMBANG.test(teks), `A: ${apa} tanpa lambang tambah dan kurang`);
  };
  for (const t of [TK.MISI_K5B3.A, TK.NAMA_SIM_K5B3.A, ...K5.MISI_A.map((m) => m.teks)]) catat(t, "teks misi");
  catat(teksDari(MS.MESIN_BANDING), "mesin");
  catat(teksDari(SK.SKENARIO_K5B3A), "skenario");
  catat(teksDari(ringkas.subBab.A), "peta dan infografis ringkas");
  catat(tanpaKomentar(baca("SimulasiLabBandingK5B3", "tsx")), "komponen lab (tanpa komentar)", false);
  catat(tanpaKomentar(baca("model-banding-k5b3", "tsx")), "model gambar (tanpa komentar)", false);
  catat(tanpaKomentar(baca("lab-banding-k5b3a", "ts")), "logika lab (tanpa komentar)", false);
  for (const p of globalThis.__pesanA) catat(p, "pesan lab dari fuzz");
  for (const u of [A.ucapGarisK5B3A(x0), A.ucapBandingK5B3A(x0), A.ucapCampuranK5B3A(x0)]) catat(u, "ucapan lab");

  // Kunci tidak bocor ke klien, tanpa jaringan.
  for (const f of ["SimulasiLabBandingK5B3", "SimulasiK5Bab3", "model-banding-k5b3"]) {
    const s = baca(f, "tsx");
    cek(!/correct_index|explanation/.test(s), `${f}: tidak memuat correct_index atau explanation`);
    cek(!/fetch\(|XMLHttpRequest|api\/|openai|anthropic|gemini/i.test(s), `${f}: tanpa jaringan atau model bahasa`);
  }
  for (const f of ["lab-banding-k5b3a", "lab-jumlah-k5b3b", "lab-sisa-k5b3c", "mesin-data-k5b3", "skenario-k5b3", "misi-k5bab3", "misi-teks-k5b3", "eja-k5b3"]) {
    const s = baca(f, "ts");
    cek(!/fetch\(|XMLHttpRequest|from "react"|openai|anthropic|gemini|correct_index|explanation/i.test(s), `${f}: murni`);
    const impor = s.match(/^import .+$/gm) ?? [];
    cek(impor.every((l) => l.startsWith("import type")), `${f}: hanya mengimpor tipe`);
  }
  cek((baca("lab-jumlah-k5b3b", "ts").match(/^import /gm) ?? []).length === 0 && (baca("lab-banding-k5b3a", "ts").match(/^import /gm) ?? []).length === 0 && (baca("eja-k5b3", "ts").match(/^import /gm) ?? []).length === 0, "lab dan pengeja tanpa impor");
  {
    const s = baca("SimulasiLabBandingK5B3", "tsx");
    cek(/useEffect\(\(\) => \{\s*onKeadaan\?\.\(keadaan\w+\(x\)\);\s*\}, \[onKeadaan, x\]\);/.test(s), "lab: lapor keadaan lewat useEffect");
    cek(/setLihat\(v\);\s*kirim\(\{ t: "PESAN_KOSONG" \}\);/.test(s), "lab: ganti tampilan mengosongkan pesan");
    const catatan = [...s.matchAll(/^\s*"([^"]+)",$/gm)].map((m) => m[1]);
    cek(catatan.length >= 4 && catatan.every(tanpaAngka), "lab: Coba ini dapat dieja");
  }
  const pembungkus = baca("SimulasiK5Bab3", "tsx");
  cek(/eja=\{ejaK5B3\}/.test(pembungkus), "pembungkus: mesin dieja ejaK5B3");
  const coba = [...pembungkus.matchAll(/"([^"]*\?)"/g)].map((m) => m[1]);
  cek(coba.length >= 3 && coba.every(tanpaAngka), "Coba ini mesin dapat dieja");
  // Semua ucapan lab dieja menjadi kata.
  const ucapan = [];
  for (let i = 0; i < A.DATA_GARIS.length; i += 1) {
    const xg = L(x0, { t: "G_DATA", i });
    ucapan.push(A.ucapGarisK5B3A(xg), A.ucapGarisK5B3A(L(xg, { t: "G_POS", n: 3 })));
  }
  for (let i = 0; i < A.DATA_BANDING.length; i += 1) {
    const xb = L(x0, { t: "B_DATA", i });
    ucapan.push(A.ucapBandingK5B3A(xb), A.ucapBandingK5B3A(L(xb, { t: "B_SAMA", nilai: A.penyebutSama(A.DATA_BANDING[i].a.q, A.DATA_BANDING[i].b.q) })));
  }
  for (let i = 0; i < A.DATA_CAMPURAN.length; i += 1) {
    const xc = L(x0, { t: "C_DATA", i });
    ucapan.push(A.ucapCampuranK5B3A(xc), A.ucapCampuranK5B3A(L(xc, { t: "C_BAGIAN", nilai: A.DATA_CAMPURAN[i].b * A.DATA_CAMPURAN[i].q })));
  }
  cek(ucapan.length >= 16 && ucapan.every(tanpaAngka), `semua ${ucapan.length} ucapan lab dieja menjadi kata`);
  for (const u of ucapan) catat(u, "ucapan lab");
}

/* ------------------------------ Data ringkas ------------------------------ */
{
  const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas5-bab3-ringkas.json", import.meta.url), "utf8"));
  cek(ringkas.chapter_id === "mtk-5-bab3" && ringkas.phase_code === "FASE_C" && ringkas.grade === 5, "ringkas: id bab, fase, kelas");
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
  sama(butir(p1, "bagian").visual.baris.map((r) => r[1]), kelipatanMandiri(1, 4), "ringkas A: titik pertama sampai keempat (dihitung)");
  const urutTeks = urutMandiri(A.DATA_GARIS).map(teksPec).join(" < ");
  cek(butir(p1, "kanan").visual.isi === urutTeks, `ringkas A: urutan lompatan ${urutTeks} (dihitung)`);
  cek(butir(p1, "bulat").visual.isi === `4/4 = ${campuranMandiri(1, 0, 4) / 4}`, "ringkas A: empat per empat sama dengan satu (dihitung)");
  cek(butir(p1, "bagian").suara.includes(EJ.kataPecahanK5B3(1, 4)) && butir(p1, "kanan").suara.toLowerCase().includes(EJ.kataPecahanK5B3(7, 8)) && butir(p1, "kanan").suara.toLowerCase().includes(EJ.kataPecahanK5B3(11, 4)), "ringkas A: suara menyebut pecahan yang benar");
  const [sama0, beda0] = p2.sisi;
  cek(sama0.visual.isi === `3/8 ${bandingMandiri({ p: 3, q: 8 }, { p: 5, q: 8 })} 5/8`, "ringkas A: 3/8 dan 5/8 (dihitung)");
  cek(beda0.visual.isi === `${ubahMandiri(1, 2, 10)}/10 ${bandingMandiri({ p: 1, q: 2 }, { p: 3, q: 5 })} ${ubahMandiri(3, 5, 10)}/10`, "ringkas A: 1/2 dan 3/5 disamakan menjadi 10 (dihitung)");
  cek(beda0.suara.includes(EJ.kataPecahanK5B3(ubahMandiri(1, 2, 10), 10)) && beda0.suara.includes(EJ.kataPecahanK5B3(ubahMandiri(3, 5, 10), 10)), "ringkas A: suara 5/10 dan 6/10");
  cek(butir(p3, "bulat").visual.isi === `2 × 4 = ${campuranMandiri(2, 0, 4)}` && butir(p3, "pecahan").visual.isi === `${campuranMandiri(2, 0, 4)} dan 3 bagian` && butir(p3, "hasil").visual.isi === `2 3/4 = ${campuranMandiri(2, 3, 4)}/4`, "ringkas A: 2 3/4 sama dengan 11/4 (dihitung)");
  const kartu = (id) => A0.peta.kartu.find((k) => k.id === id).teks;
  cek(kartu("a-sepertiga") === "1/3 = 2/6" && ubahMandiri(1, 3, 6) === 2 && kartu("a-setengah-senilai") === "1/2 = 5/10" && ubahMandiri(1, 2, 10) === 5, "ringkas A: kartu senilai (dihitung)");
  cek(kartu("a-duatigaperempat") === `2 3/4 = ${campuranMandiri(2, 3, 4)}/4` && kartu("a-tigasetengah") === `3 1/2 = ${campuranMandiri(3, 1, 2)}/2`, "ringkas A: kartu campuran (dihitung)");
  cek(kartu("a-setengah-lima") === `1/2 ${bandingMandiri({ p: 1, q: 2 }, { p: 1, q: 5 })} 1/5` && kartu("a-tiga-delapan") === `3/8 ${bandingMandiri({ p: 3, q: 8 }, { p: 5, q: 8 })} 5/8`, "ringkas A: kartu tanda (dihitung)");
  cek(kartu("a-lompatan") === `${A.DATA_GARIS.map(teksPec).join(", ")} di garis`, "ringkas A: kartu lompatan");
  sama(Object.keys(ringkas.subBab), ["A", "B", "C"], "ringkas: sub-bab A, B, dan C");
}

/* ================================ SUB-BAB B: PENJUMLAHAN ================================ */

/* ------------------------------ Hitungan MANDIRI B ------------------------------ */
// Penjumlahan dengan menambah satu per satu; KPK dengan irisan daftar kelipatan; FPB dengan mencoba pembagi dari besar
// ke kecil memakai pengurangan berulang; campuran dengan mengurangi penyebut berulang (tanpa perkalian atau %).
const tambahMandiri = (a, b) => {
  let n = a;
  for (let i = 0; i < b; i += 1) n += 1;
  return n;
};
const habisMandiri = (n, d) => {
  let sisa = n;
  while (sisa >= d) sisa -= d;
  return sisa === 0;
};
const fpbMandiri = (p, q) => {
  for (let d = Math.min(p, q); d >= 1; d -= 1) if (habisMandiri(p, d) && habisMandiri(q, d)) return d;
  return 1;
};
const bagiMandiri = (n, d) => {
  let sisa = n;
  let q = 0;
  while (sisa >= d) {
    sisa -= d;
    q += 1;
  }
  return { q, r: sisa };
};
const jumlahMandiri = (a, b) => {
  const k = penyebutSamaMandiri(a.q, b.q);
  return { p: tambahMandiri(ubahMandiri(a.p, a.q, k), ubahMandiri(b.p, b.q, k)), q: k };
};
const sederhanaMandiri = (x) => {
  const g = fpbMandiri(x.p, x.q);
  return { p: bagiMandiri(x.p, g).q, q: bagiMandiri(x.q, g).q, g };
};
const parsePec = (t) => {
  const m = /^(\d+)\/(\d+)$/.exec(t);
  return m ? { p: Number(m[1]), q: Number(m[2]) } : null;
};
/** Nilai campuran "b r/q" menjadi pecahan biasa dengan menambah bagian satu per satu. */
const parseCamp = (t) => {
  const m = /^(\d+) (\d+)\/(\d+)$/.exec(t);
  return m ? { p: campuranMandiri(Number(m[1]), Number(m[2]), Number(m[3])), q: Number(m[3]) } : null;
};
const nilaiSama = (a, b) => bandingMandiri(a, b) === "=";
const teksPecB = (x) => `${x.p}/${x.q}`;

/* ------------------------------ Lab B: Jumlah Arsir ------------------------------ */
{
  cek(y0.pernah.length === 0 && y0.pesan === "" && y0.sama.atasOk === false && y0.beda.k === 0, "B awal: kosong, belum ada riwayat");
  cek(B.DATA_SAMA.every((d) => d.a.q === d.b.q) && B.DATA_BEDA.every((d) => d.a.q !== d.b.q), "B: data Sama berpenyebut sama, data Beda berpenyebut beda");
  // Pengeja KPK.
  sama(EJ.ejaK5B3("KPK dari 4 dan 6"), "kelipatan persekutuan terkecil dari empat dan enam", "eja KPK");

  // Sama.
  const posAtas = [];
  const posBawah = [];
  for (const [i, d] of B.DATA_SAMA.entries()) {
    const { a, b } = d;
    const nama = `${teksPecB(a)} + ${teksPecB(b)}`;
    const atas = tambahMandiri(a.p, b.p);
    const oA = B.opsiAtasSama(i);
    const oB = B.opsiBawahSama(i);
    cek(oA.length === 3 && new Set(oA).size === 3 && oA.filter((v) => v === atas).length === 1 && oA.includes(a.p * b.p), `Sama ${nama}: tiga pilihan pembilang unik, satu benar (${atas}), pengecoh hasil kali`);
    cek(oB.length === 3 && new Set(oB).size === 3 && oB.filter((v) => v === a.q).length === 1 && oB.includes(tambahMandiri(a.q, b.q)) && oB.includes(a.q * b.q), `Sama ${nama}: tiga pilihan penyebut unik, satu benar (${a.q}), pengecoh penyebut dijumlahkan dan dikalikan`);
    posAtas.push(oA.indexOf(atas));
    posBawah.push(oB.indexOf(a.q));
    const xs = LB(y0, { t: "S_DATA", i });
    for (const v of oB) cek(LB(xs, { t: "S_BAWAH", nilai: v }).pernah.length === 0 && /Tentukan dulu/.test(LB(xs, { t: "S_BAWAH", nilai: v }).pesan), `Sama ${nama}: penyebut ${v} sebelum pembilang ditolak`);
    for (const v of oA.filter((o) => o !== atas)) {
      const s = LB(xs, { t: "S_ATAS", nilai: v });
      cek(!s.sama.atasOk && !s.pesan.startsWith("✅") && /dikalikan/.test(s.pesan) === (v === a.p * b.p), `Sama ${nama}: pembilang ${v} ditolak`);
    }
    const sA = LB(xs, { t: "S_ATAS", nilai: atas });
    cek(sA.sama.atasOk && sA.pesan.startsWith("✅") && sA.pesan.includes(`${atas} bagian`), `Sama ${nama}: pembilang ${atas} benar`);
    for (const v of oB.filter((o) => o !== a.q)) {
      const s = LB(sA, { t: "S_BAWAH", nilai: v });
      cek(s.pernah.length === 0 && !s.pesan.startsWith("✅") && /tidak dijumlahkan/.test(s.pesan) === (v === tambahMandiri(a.q, b.q)), `Sama ${nama}: penyebut ${v} ditolak`);
    }
    const sB = LB(sA, { t: "S_BAWAH", nilai: a.q });
    cek(sB.pernah.includes(`sama:${i}`) && sB.pesan.startsWith("✅") && sB.pesan.includes(`${nama} = ${atas}/${a.q}`), `Sama ${nama}: tercatat`);
    cek(!LB(sA, { t: "S_DATA", i: (i + 1) % 4 }).sama.atasOk, `Sama ${nama}: ganti data mengulang pembilang`);
    cek(LB(sA, { t: "S_BAWAH", nilai: 999 }) === sA && LB(xs, { t: "S_ATAS", nilai: 999 }) === xs, `Sama ${nama}: nilai di luar pilihan diabaikan`);
  }
  cek(new Set(posAtas).size >= 2 && new Set(posBawah).size >= 2, `Sama: letak jawaban benar bervariasi (${posAtas.join("")} / ${posBawah.join("")})`);
  cek(LB(y0, { t: "S_DATA", i: 4 }) === y0 && LB(y0, { t: "S_DATA", i: -1 }) === y0, "Sama: data di luar batas diabaikan");

  // Beda.
  const posK = [];
  const posH = [];
  for (const [i, d] of B.DATA_BEDA.entries()) {
    const { a, b } = d;
    const nama = `${teksPecB(a)} + ${teksPecB(b)}`;
    const k = penyebutSamaMandiri(a.q, b.q);
    const jm = jumlahMandiri(a, b);
    const oK = B.opsiKpk(i);
    cek(B.kpk(a.q, b.q) === k && jm.q === k, `Beda ${nama}: KPK ${k}`);
    cek(oK.length === 3 && new Set(oK).size === 3 && oK.filter((v) => v === k).length === 1 && oK.includes(tambahMandiri(a.q, b.q)), `Beda ${nama}: tiga pilihan KPK unik, satu benar (${k}), pengecoh jumlah penyebut`);
    posK.push(oK.indexOf(k));
    const xb = LB(y0, { t: "B_DATA", i });
    for (const v of B.opsiAtasBeda(i)) cek(LB(xb, { t: "B_ATAS", nilai: v }).pernah.length === 0 && /Cari dulu KPK/.test(LB(xb, { t: "B_ATAS", nilai: v }).pesan), `Beda ${nama}: hasil ${v} sebelum KPK ditolak`);
    for (const v of oK.filter((o) => o !== k)) {
      const s = LB(xb, { t: "B_KPK", nilai: v });
      const bersamaV = bersamaMandiri(a.q, b.q, v);
      cek(s.beda.k === 0 && !s.pesan.startsWith("✅") && /bukan kelipatan dari kedua/.test(s.pesan) === !bersamaV && /bukan yang terkecil/.test(s.pesan) === bersamaV, `Beda ${nama}: KPK ${v} ditolak dengan alasan tepat`);
    }
    const sK = LB(xb, { t: "B_KPK", nilai: k });
    cek(sK.beda.k === k && sK.pesan.startsWith("✅") && sK.pesan.includes(`${ubahMandiri(a.p, a.q, k)}/${k}`) && sK.pesan.includes(`${ubahMandiri(b.p, b.q, k)}/${k}`), `Beda ${nama}: KPK ${k} diterima`);
    cek(LB(sK, { t: "B_KPK", nilai: oK.find((o) => o !== k) }).beda.k === 0, `Beda ${nama}: KPK salah setelah benar mengulang`);
    const oH = B.opsiAtasBeda(i);
    cek(oH.length === 3 && new Set(oH).size === 3 && oH.filter((v) => v === jm.p).length === 1 && oH.includes(tambahMandiri(a.p, b.p)), `Beda ${nama}: tiga pilihan hasil unik, satu benar (${jm.p}), pengecoh pembilang dijumlah tanpa menyamakan`);
    posH.push(oH.indexOf(jm.p));
    for (const v of oH.filter((o) => o !== jm.p)) {
      const s = LB(sK, { t: "B_ATAS", nilai: v });
      cek(s.pernah.length === 0 && !s.pesan.startsWith("✅") && /pembilang aslinya/.test(s.pesan) === (v === tambahMandiri(a.p, b.p)), `Beda ${nama}: hasil ${v} ditolak`);
    }
    const sH = LB(sK, { t: "B_ATAS", nilai: jm.p });
    cek(sH.pernah.includes(`beda:${i}`) && sH.pesan.startsWith("✅") && sH.pesan.includes(`= ${jm.p}/${k}`), `Beda ${nama}: ${jm.p}/${k} tercatat`);
    cek(/disederhanakan/.test(sH.pesan) === (fpbMandiri(jm.p, k) > 1), `Beda ${nama}: saran menyederhanakan hanya bila bisa`);
    cek(!(LB(sK, { t: "B_DATA", i: (i + 1) % 6 }).beda.k > 0), `Beda ${nama}: ganti data mengulang KPK`);
  }
  cek(new Set(posK).size >= 2 && new Set(posH).size >= 2, `Beda: letak jawaban benar bervariasi (${posK.join("")} / ${posH.join("")})`);
  cek(LB(y0, { t: "B_DATA", i: 6 }) === y0 && LB(y0, { t: "B_KPK", nilai: 999 }) === y0, "Beda: data dan KPK di luar batas diabaikan");
  // KPK dan jumlah semua pasangan penyebut: kode cocok dengan hitungan mandiri.
  {
    let ok = true;
    let n = 0;
    for (let q1 = 2; q1 <= 12; q1 += 1) for (let q2 = 2; q2 <= 12; q2 += 1) {
      n += 1;
      if (B.kpk(q1, q2) !== penyebutSamaMandiri(q1, q2)) ok = false;
      for (let p1 = 1; p1 < q1; p1 += 1) for (let p2 = 1; p2 < q2; p2 += 1) {
        const j = B.jumlahKpk({ p: p1, q: q1 }, { p: p2, q: q2 });
        const m = jumlahMandiri({ p: p1, q: q1 }, { p: p2, q: q2 });
        if (j.p !== m.p || j.q !== m.q) ok = false;
        const s1 = B.sederhana(j);
        const s2 = sederhanaMandiri(j);
        if (s1.p !== s2.p || s1.q !== s2.q) ok = false;
        if (!nilaiSama(s1, j)) ok = false;
      }
    }
    cek(ok, `B: KPK, jumlah, dan penyederhanaan cocok dengan hitungan mandiri untuk ${n} pasang penyebut`);
  }

  // Hasil.
  for (const [i, d] of B.DATA_HASIL.entries()) {
    const nama = `${teksPecB(d.a)} + ${teksPecB(d.b)}`;
    const jm = jumlahMandiri(d.a, d.b);
    const h = B.hasilData(i);
    cek(h.p === jm.p && h.q === jm.q, `Hasil ${nama}: ${jm.p}/${jm.q}`);
    const oT = B.opsiBentuk(i);
    const benar = d.jenis === "sederhana" ? teksPecB(sederhanaMandiri(jm)) : (() => { const bg = bagiMandiri(jm.p, jm.q); return `${bg.q} ${bg.r}/${jm.q}`; })();
    cek(B.bentukBenar(i) === benar, `Hasil ${nama}: bentuk benar ${benar} sama dengan hitungan mandiri`);
    cek(d.jenis === "sederhana" ? sederhanaMandiri(jm).g > 1 : jm.p > jm.q, `Hasil ${nama}: jenis ${d.jenis} sesuai data`);
    cek(oT.length === 3 && new Set(oT).size === 3 && oT.filter((t) => t === benar).length === 1, `Hasil ${nama}: tiga pilihan unik, satu benar`);
    const salah = oT.filter((t) => t !== benar);
    for (const t of salah) {
      const nilaiT = parsePec(t) ?? parseCamp(t);
      const nilaiTsama = nilaiT && nilaiSama(nilaiT, jm);
      if (d.jenis === "sederhana") {
        const tidakSederhana = nilaiT && fpbMandiri(nilaiT.p, nilaiT.q) > 1;
        cek(!nilaiTsama || tidakSederhana, `Hasil ${nama}: pengecoh ${t} salah (nilai berbeda atau belum paling sederhana)`);
      } else cek(!nilaiTsama, `Hasil ${nama}: pengecoh ${t} berbeda nilai`);
      const xh = LB(y0, { t: "H_DATA", i });
      const s = LB(xh, { t: "H_BENTUK", teks: t });
      cek(s.pernah.length === 0 && !s.pesan.startsWith("✅"), `Hasil ${nama}: ${t} ditolak`);
      if (d.jenis === "sederhana") cek(/masih bisa disederhanakan lagi/.test(s.pesan) === (nilaiTsama && fpbMandiri(nilaiT.p, nilaiT.q) > 1), `Hasil ${nama}: ${t} dijelaskan belum tuntas dengan tepat`);
    }
    const sOk = LB(LB(y0, { t: "H_DATA", i }), { t: "H_BENTUK", teks: benar });
    cek(sOk.pernah.includes(`hasil:${i}`) && sOk.pesan.startsWith("✅") && (d.jenis === "sederhana" ? sOk.pesan.includes(`dibagi ${sederhanaMandiri(jm).g}`) : sOk.pesan.includes(`${bagiMandiri(jm.p, jm.q).q} bulat penuh`)), `Hasil ${nama}: ${benar} tercatat`);
    cek(LB(LB(y0, { t: "H_DATA", i }), { t: "H_BENTUK", teks: "9/9" }).pernah.length === 0, `Hasil ${nama}: bentuk di luar pilihan diabaikan`);
  }
  cek(LB(y0, { t: "H_DATA", i: 5 }) === y0, "Hasil: data di luar batas diabaikan");

  // Fuzz.
  const acak = acakDari(54);
  let s = y0;
  let ok = true;
  const pesanSemua = new Set();
  const riwayatSemua = new Set();
  const ID = /^(sama:[0-3]|beda:[0-5]|hasil:[0-4])$/;
  for (let i = 0; i < 20000; i += 1) {
    const p = acak(18);
    const sd = B.dataSama(s);
    const bd = B.dataBeda(s);
    const aksiAcak = [{ t: "PESAN_KOSONG" }];
    const a =
      p === 0 ? { t: "S_DATA", i: acak(5) } :
      p === 1 ? { t: "S_ATAS", nilai: acak(5) === 0 ? 99 : B.opsiAtasSama(s.sama.data)[acak(3)] } :
      p === 2 ? { t: "S_ATAS", nilai: tambahMandiri(sd.a.p, sd.b.p) } :
      p === 3 ? { t: "S_BAWAH", nilai: acak(5) === 0 ? 99 : B.opsiBawahSama(s.sama.data)[acak(3)] } :
      p === 4 ? { t: "S_BAWAH", nilai: sd.a.q } :
      p === 5 ? { t: "B_DATA", i: acak(7) } :
      p === 6 ? { t: "B_KPK", nilai: acak(5) === 0 ? 99 : B.opsiKpk(s.beda.data)[acak(3)] } :
      p === 7 ? { t: "B_KPK", nilai: penyebutSamaMandiri(bd.a.q, bd.b.q) } :
      p === 8 ? { t: "B_ATAS", nilai: acak(5) === 0 ? 99 : B.opsiAtasBeda(s.beda.data)[acak(3)] } :
      p === 9 ? { t: "B_ATAS", nilai: jumlahMandiri(bd.a, bd.b).p } :
      p === 10 ? { t: "H_DATA", i: acak(6) } :
      p === 11 ? { t: "H_BENTUK", teks: acak(5) === 0 ? "9/9" : B.opsiBentuk(s.hasil.data)[acak(3)] } :
      p === 12 ? { t: "H_BENTUK", teks: B.bentukBenar(s.hasil.data) } :
      p === 13 ? aksiAcak[0] :
      acak(40) === 0 ? { t: "RESET" } : { t: "B_ATAS", nilai: acak(30) };
    const t = LB(s, a);
    if (a.t !== "RESET" && !s.pernah.every((v) => t.pernah.includes(v))) ok = false;
    if (!(t.sama.data >= 0 && t.sama.data < 4 && t.beda.data >= 0 && t.beda.data < 6 && t.hasil.data >= 0 && t.hasil.data < 5)) ok = false;
    const tb = B.dataBeda(t);
    if (!(t.beda.k === 0 || t.beda.k === penyebutSamaMandiri(tb.a.q, tb.b.q))) ok = false;
    if (typeof t.sama.atasOk !== "boolean") ok = false;
    for (const id of t.pernah) if (!ID.test(id)) ok = false;
    if (t.pesan) pesanSemua.add(t.pesan);
    for (const id of t.pernah) riwayatSemua.add(id);
    s = t;
  }
  cek(ok, "fuzz 20.000 aksi Lab Jumlah Arsir: batas terjaga, riwayat tidak dicabut");
  cek(pesanSemua.size > 40 && [...pesanSemua].every(tanpaAngka), `fuzz Lab Jumlah Arsir: semua ${pesanSemua.size} pesan dieja menjadi kata`);
  cek(riwayatSemua.size >= 10, `fuzz Lab Jumlah Arsir: riwayat terkumpul (${[...riwayatSemua].join(" ")})`);
  globalThis.__pesanB = [...pesanSemua];
}

/* ------------------------------ Mesin B ------------------------------ */
{
  for (const [i, k] of MS.KASUS_JUMLAH.entries()) {
    const c = MS.MESIN_JUMLAH.kasus[i];
    const [sm, bd, sd, cm] = c.langkah;
    const nilaiOpsi = (t) => parsePec(t) ?? parseCamp(t);
    // Sama.
    const [sa, sb] = k.sa;
    cek(sa.q === sb.q && sm.benar === `${tambahMandiri(sa.p, sb.p)}/${sa.q}` && sm.tanya.includes(teksPecB(sa)) && sm.tanya.includes(teksPecB(sb)), `Mesin ${k.id}: ${teksPecB(sa)} + ${teksPecB(sb)} = ${sm.benar}`);
    cek(sm.opsi.includes(`${tambahMandiri(sa.p, sb.p)}/${tambahMandiri(sa.q, sb.q)}`) && sm.opsi.includes(`${sa.p * sb.p}/${sa.q}`) && sm.opsi.filter((o) => o !== sm.benar).every((o) => !nilaiSama(nilaiOpsi(o), jumlahMandiri(sa, sb))), `Mesin ${k.id}: pengecoh sama (penyebut dijumlah, pembilang dikali) salah`);
    // Beda.
    const [ba, bb] = k.be;
    const jb = jumlahMandiri(ba, bb);
    cek(ba.q !== bb.q && bd.benar === teksPecB(jb) && fpbMandiri(jb.p, jb.q) === 1 && bd.tanya.includes(teksPecB(ba)) && bd.tanya.includes(teksPecB(bb)), `Mesin ${k.id}: ${teksPecB(ba)} + ${teksPecB(bb)} = ${bd.benar} (sudah sederhana)`);
    cek(bd.opsi.includes(`${tambahMandiri(ba.p, bb.p)}/${tambahMandiri(ba.q, bb.q)}`) && bd.opsi.filter((o) => o !== bd.benar).every((o) => !nilaiSama(nilaiOpsi(o), jb)), `Mesin ${k.id}: pengecoh beda salah (pembilang dan penyebut dijumlah)`);
    cek(bd.petunjuk.includes(`${penyebutSamaMandiri(ba.q, bb.q)}`), `Mesin ${k.id}: petunjuk menyebut KPK`);
    // Sederhana.
    const [ea, eb] = k.se;
    const je = jumlahMandiri(ea, eb);
    const ss = sederhanaMandiri(je);
    cek(ss.g > 1 && sd.benar === teksPecB(ss) && sd.tanya.includes(teksPecB(je)), `Mesin ${k.id}: ${teksPecB(je)} disederhanakan menjadi ${sd.benar}`);
    cek(sd.opsi.filter((o) => o !== sd.benar).every((o) => { const n = nilaiOpsi(o); return !nilaiSama(n, je) || fpbMandiri(n.p, n.q) > 1; }), `Mesin ${k.id}: pengecoh sederhana salah`);
    // Campuran.
    const [ca, cb] = k.cm;
    const jc = jumlahMandiri(ca, cb);
    const bg = bagiMandiri(jc.p, jc.q);
    cek(jc.p > jc.q && cm.benar === `${bg.q} ${bg.r}/${jc.q}` && cm.tanya.includes(teksPecB(jc)), `Mesin ${k.id}: ${teksPecB(jc)} sama dengan ${cm.benar}`);
    cek(cm.opsi.filter((o) => o !== cm.benar).every((o) => !nilaiSama(nilaiOpsi(o), jc)), `Mesin ${k.id}: pengecoh campuran berbeda nilai`);
    cek(EJ.ejaK5B3(c.ringkas).includes(EJ.kataPecahanK5B3(jb.p, jb.q)) && !/\d/.test(EJ.ejaK5B3(c.ringkas)), `Mesin ${k.id}: ringkas dieja dengan hasil benar`);
  }
  sama(MS.KASUS_JUMLAH.map((k) => k.id), ["martabak", "penghapus", "wingko"], "Mesin B: tiga kasus");
}

/* ------------------------------ Skenario B ------------------------------ */
{
  const S = SK.SKENARIO_K5B3B;
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
  sama(S.id.replace(/-k5b3$/, ""), K5.ID_SKENARIO_K5B3.B, "id skenario B sesuai id misi");
  const adegan = (id) => S.adegan.find((a) => a.id === id);
  const martabak = adegan("martabak");
  const m38 = `${tambahMandiri(1, 2)}/8`;
  cek(martabak.opsi.find((o) => o.benar).teks.startsWith(m38) && martabak.cerita.includes("1/8") && martabak.cerita.includes("2/8"), "B: 1/8 + 2/8 = 3/8 (dihitung)");
  cek(martabak.opsi.filter((o) => !o.benar).every((o) => !o.teks.startsWith(m38)) && martabak.opsi.some((o) => o.teks.startsWith("3/16")) && martabak.opsi.some((o) => o.teks.startsWith("2/8")), "B: pengecoh martabak salah (3/16 dan 2/8)");
  cek(adegan("potong").jumlah === tambahMandiri(1, 2) && adegan("potong").sukses.includes("3/8"), "B: tiga potong dimakan (dihitung)");
  const wingko = adegan("wingko");
  const enam = penyebutSamaMandiri(2, 3);
  const bagianL = ubahMandiri(1, 2, enam);
  const bagianK = ubahMandiri(1, 3, enam);
  cek(enam === 6 && wingko.target === tambahMandiri(bagianL, bagianK) && wingko.target <= wingko.maks && wingko.cerita.includes(`${bagianL} potong`) && wingko.cerita.includes(`${bagianK} potong`) && wingko.sukses.includes(`${wingko.target}/${enam}`), "B: wingko 3 potong dan 2 potong menjadi 5 potong dari 6 (dihitung)");
  const soal = adegan("hitung").soal;
  const j1 = jumlahMandiri({ p: 1, q: 2 }, { p: 1, q: 3 });
  cek(soal[0].jawaban === teksPecB(j1) && soal[0].opsi.filter((o) => o !== soal[0].jawaban).every((o) => !nilaiSama(parsePec(o), j1)), "B: 1/2 + 1/3 = 5/6, pengecoh salah (dihitung)");
  cek(soal[1].jawaban === String(penyebutSamaMandiri(4, 6)) && soal[1].opsi.filter((o) => o !== soal[1].jawaban).every((o) => Number(o) !== penyebutSamaMandiri(4, 6)) && soal[1].opsi.some((o) => bersamaMandiri(4, 6, Number(o)) && Number(o) !== 12), "B: KPK 4 dan 6 adalah 12, pengecoh termasuk kelipatan persekutuan bukan terkecil (dihitung)");
  const j2 = jumlahMandiri({ p: 1, q: 4 }, { p: 1, q: 6 });
  cek(soal[2].jawaban === teksPecB(j2) && soal[2].opsi.filter((o) => o !== soal[2].jawaban).every((o) => !nilaiSama(parsePec(o), j2)), "B: 1/4 + 1/6 = 5/12, pengecoh salah (dihitung)");
  const sd = adegan("sederhana");
  const j3 = jumlahMandiri({ p: 4, q: 9 }, { p: 2, q: 9 });
  const s3 = sederhanaMandiri(j3);
  const tb = sd.opsi.find((o) => o.benar);
  cek(sd.cerita.includes("6/9") && j3.p === 6 && j3.q === 9 && tb.teks.includes(teksPecB(s3)) && tb.teks.includes(`dibagi ${s3.g}`) && tb.umpan.includes(`${s3.p}`), "B: 6/9 disederhanakan menjadi 2/3 dengan pembagi 3 (dihitung)");
  cek(sd.opsi.filter((o) => !o.benar).every((o) => !o.teks.includes("2/3")) && sd.opsi.some((o) => !o.benar && o.teks.includes("2/9")) && !nilaiSama({ p: 2, q: 9 }, j3), "B: pengecoh 2/9 salah dan 6/9 belum sederhana (dihitung)");
  const posisi = S.adegan.filter((a) => a.jenis === "pilih").map((a) => a.opsi.findIndex((o) => o.benar));
  cek(new Set(posisi).size === posisi.length, `B: letak jawaban pilih bervariasi (${posisi.join("")})`);
}

/* ------------------------------ Misi B ------------------------------ */
{
  const capai = (aksi) => M0.misiBaru(K5.MISI_B, B.keadaanJumlahK5B3B(jalan(B.awalJumlahK5B3B(), LB, aksi)), new Set());
  const sama_ = (i, benar = true) => {
    const d = B.DATA_SAMA[i];
    return [{ t: "S_DATA", i }, { t: "S_ATAS", nilai: tambahMandiri(d.a.p, d.b.p) }, { t: "S_BAWAH", nilai: benar ? d.a.q : tambahMandiri(d.a.q, d.b.q) }];
  };
  const beda_ = (i, benarK = true, benarH = true) => {
    const d = B.DATA_BEDA[i];
    const k = penyebutSamaMandiri(d.a.q, d.b.q);
    const jm = jumlahMandiri(d.a, d.b);
    return [{ t: "B_DATA", i }, { t: "B_KPK", nilai: benarK ? k : tambahMandiri(d.a.q, d.b.q) }, { t: "B_ATAS", nilai: benarH ? jm.p : tambahMandiri(d.a.p, d.b.p) }];
  };
  const hasil_ = (i, benar = true) => [{ t: "H_DATA", i }, { t: "H_BENTUK", teks: benar ? B.bentukBenar(i) : B.opsiBentuk(i).find((o) => o !== B.bentukBenar(i)) }];
  cek(capai(sama_(0)).join() === "b-martabak" && capai(sama_(1)).join() === "b-penghapus", "B: Sama 1/8 + 2/8 dan 2/10 + 3/10 memenuhi");
  cek(capai(sama_(0, false)).length === 0 && capai([{ t: "S_DATA", i: 0 }, { t: "S_BAWAH", nilai: 8 }]).length === 0 && capai(sama_(2)).length === 0 && capai(sama_(3)).length === 0, "B: penyebut salah, penyebut sebelum pembilang, atau pasangan latihan tidak memenuhi");
  cek(capai(beda_(0)).join() === "b-wingko" && capai(beda_(1)).join() === "b-duabelas", "B: Beda 1/2 + 1/3 dan 1/4 + 1/6 memenuhi");
  cek(capai(beda_(0, false)).length === 0 && capai(beda_(0, true, false)).length === 0 && capai([{ t: "B_DATA", i: 0 }, { t: "B_ATAS", nilai: 5 }]).length === 0, "B: KPK salah, hasil salah, atau hasil tanpa KPK tidak memenuhi");
  cek(capai(beda_(2)).length === 0 && capai(beda_(3)).length === 0, "B: pasangan 2/3 + 1/6 dan 1/5 + 1/2 hanya latihan, bukan misi");
  cek(capai(hasil_(0)).join() === "b-sederhana" && capai(hasil_(0, false)).length === 0 && capai(hasil_(2)).length === 0, "B: Hasil 6/9 menjadi 2/3 memenuhi, bentuk salah atau pasangan lain tidak");
  cek(capai(beda_(4)).join() === "b-delapan" && capai(beda_(5)).join() === "b-sepuluhan" && capai(hasil_(3)).join() === "b-campuran" && capai(hasil_(4)).length === 0, "B: tiga tantangan bebas");
  cek(capai([...sama_(0), ...beda_(0), ...hasil_(0)]).sort().join() === "b-martabak,b-sederhana,b-wingko", "B: tiga alat sekaligus memenuhi tiga misi");
  cek(M0.misiBaru(K5.MISI_B, { alat: "banding", pernah: ["sama:0", "beda:0", "hasil:0"] }, new Set()).length === 0, "B: riwayat alat banding tidak memenuhi misi B");
  cek(M0.misiBaru(K5.MISI_A, { alat: "jumlah", pernah: ["banding:0", "garis:7:8"] }, new Set()).length === 0, "B: riwayat alat jumlah tidak memenuhi misi A");
  cek(B.keadaanJumlahK5B3B(y0).alat === "jumlah" && B.keadaanJumlahK5B3B(y0).pernah.length === 0, "B: keadaan awal tanpa riwayat");
}

/* ------------------------------ Konsep tidak bocor B ------------------------------ */
{
  const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas5-bab3-ringkas.json", import.meta.url), "utf8"));
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
  // Sub-Bab B tidak memakai konsep C: pengurangan, kurang, kurangi, dan lambang kurang.
  const BOCOR_B = /(kurang|pengurangan|kurangi|sisa daerah)/i;
  const LAMBANG_B = /[−]|\s-\s/;
  const catat = (teks, apa, lambang = true) => {
    const m = BOCOR_B.exec(teks);
    cek(!m, `B: ${apa} bebas konsep pengurangan (${m ? m[0] : ""} di "${String(teks).slice(Math.max(0, (m?.index ?? 0) - 30), (m?.index ?? 0) + 40)}")`);
    if (lambang) cek(!LAMBANG_B.test(teks), `B: ${apa} tanpa lambang kurang`);
  };
  for (const t of [TK.MISI_K5B3.B, TK.NAMA_SIM_K5B3.B, ...K5.MISI_B.map((m) => m.teks)]) catat(t, "teks misi");
  catat(teksDari(MS.MESIN_JUMLAH), "mesin");
  catat(teksDari(SK.SKENARIO_K5B3B), "skenario");
  catat(teksDari(ringkas.subBab.B), "peta dan infografis ringkas");
  for (const [f, e] of [["SimulasiLabJumlahK5B3", "tsx"], ["model-jumlah-k5b3", "tsx"], ["lab-jumlah-k5b3b", "ts"]]) catat(tanpaKomentar(baca(f, e)), `${f} (tanpa komentar)`, false);
  for (const p of globalThis.__pesanB) catat(p, "pesan lab dari fuzz");
  for (const f of ["SimulasiLabJumlahK5B3", "model-jumlah-k5b3"]) {
    const s = baca(f, "tsx");
    cek(!/correct_index|explanation/.test(s) && !/fetch\(|XMLHttpRequest|api\/|openai|anthropic|gemini/i.test(s), `${f}: tanpa kunci jawaban, jaringan, atau model bahasa`);
  }
  {
    const s = baca("SimulasiLabJumlahK5B3", "tsx");
    cek(/useEffect\(\(\) => \{\s*onKeadaan\?\.\(keadaan\w+\(x\)\);\s*\}, \[onKeadaan, x\]\);/.test(s), "lab B: lapor keadaan lewat useEffect");
    cek(/setLihat\(v\);\s*kirim\(\{ t: "PESAN_KOSONG" \}\);/.test(s), "lab B: ganti tampilan mengosongkan pesan");
    const catatan = [...s.matchAll(/^\s*"([^"]+)",$/gm)].map((m) => m[1]);
    cek(catatan.length >= 4 && catatan.every(tanpaAngka), "lab B: Coba ini dapat dieja");
  }
  const ucapan = [];
  for (let i = 0; i < B.DATA_SAMA.length; i += 1) {
    const xs = LB(y0, { t: "S_DATA", i });
    ucapan.push(B.ucapSamaK5B3B(xs), B.ucapSamaK5B3B(LB(xs, { t: "S_ATAS", nilai: tambahMandiri(B.DATA_SAMA[i].a.p, B.DATA_SAMA[i].b.p) })));
  }
  for (let i = 0; i < B.DATA_BEDA.length; i += 1) {
    const xb = LB(y0, { t: "B_DATA", i });
    const d = B.DATA_BEDA[i];
    ucapan.push(B.ucapBedaK5B3B(xb), B.ucapBedaK5B3B(LB(xb, { t: "B_KPK", nilai: penyebutSamaMandiri(d.a.q, d.b.q) })));
  }
  for (let i = 0; i < B.DATA_HASIL.length; i += 1) ucapan.push(B.ucapHasilK5B3B(LB(y0, { t: "H_DATA", i })));
  cek(ucapan.length >= 17 && ucapan.every(tanpaAngka), `B: semua ${ucapan.length} ucapan lab dieja menjadi kata`);
  for (const u of ucapan) catat(u, "ucapan lab");

  // Data ringkas B dihitung ulang mandiri.
  const B0 = ringkas.subBab.B;
  const s = B0.peta.cabang.length === 4 && B0.peta.kartu.length === 8 && B0.infografis.panel.length === 3;
  cek(s, "ringkas B: empat cabang, delapan kartu, tiga panel");
  const butir = (panel, id) => panel.butir.find((b) => b.id === id);
  const [p1, p2, p3] = B0.infografis.panel;
  const m = jumlahMandiri({ p: 1, q: 8 }, { p: 2, q: 8 });
  sama(butir(p1, "bagian").visual.baris.map((r) => r[1]), [1, 2, tambahMandiri(1, 2)], "ringkas B: bagian terarsir Lukas, Komang, bersama (dihitung)");
  cek(butir(p1, "hasil").visual.isi === `1/8 + 2/8 = ${m.p}/${m.q}` && m.q === 8, "ringkas B: 1/8 + 2/8 (dihitung)");
  cek(butir(p1, "salah").visual.isi === `${tambahMandiri(1, 2)}/${tambahMandiri(8, 8)} salah` && !nilaiSama({ p: 3, q: 16 }, m), "ringkas B: 3/16 salah (dihitung)");
  cek(butir(p1, "salah").suara.toLowerCase().includes(EJ.kataPecahanK5B3(3, 16)) && butir(p1, "hasil").suara.toLowerCase().includes(EJ.kataPecahanK5B3(m.p, m.q)), "ringkas B: suara menyebut pecahan yang benar");
  const m2 = jumlahMandiri({ p: 2, q: 10 }, { p: 3, q: 10 });
  const [sm, bd] = p2.sisi;
  cek(sm.visual.isi === `2/10 + 3/10 = ${m2.p}/${m2.q}`, "ringkas B: 2/10 + 3/10 (dihitung)");
  const m3 = jumlahMandiri({ p: 1, q: 2 }, { p: 1, q: 3 });
  cek(bd.visual.isi === `${ubahMandiri(1, 2, 6)}/6 + ${ubahMandiri(1, 3, 6)}/6 = ${m3.p}/${m3.q}` && m3.q === 6, "ringkas B: 1/2 + 1/3 disamakan menjadi 6 (dihitung)");
  cek(bd.suara.includes(EJ.kataPecahanK5B3(ubahMandiri(1, 2, 6), 6)) || bd.suara.toLowerCase().includes(EJ.kataPecahanK5B3(ubahMandiri(1, 2, 6), 6)), "ringkas B: suara tiga per enam");
  const s3 = sederhanaMandiri({ p: 6, q: 9 });
  cek(butir(p3, "sederhana").visual.isi === `6/9 = ${s3.p}/${s3.q}` && s3.g === 3, "ringkas B: 6/9 sama dengan 2/3 (dihitung)");
  const kelip4 = kelipatanMandiri(4, 12).join(", ");
  const kelip6 = kelipatanMandiri(6, 12).join(", ");
  cek(butir(p3, "kpk").visual.isi === `${kelip4} dan ${kelip6}` && penyebutSamaMandiri(4, 6) === 12 && butir(p3, "kpk").isi.includes("dua belas"), "ringkas B: kelipatan 4 dan 6 bertemu di 12 (dihitung)");
  const bg = bagiMandiri(7, 5);
  cek(butir(p3, "campuran").visual.isi === `7/5 = ${bg.q} ${bg.r}/5`, "ringkas B: 7/5 sama dengan 1 2/5 (dihitung)");
  const kartu = (id) => B0.peta.kartu.find((k) => k.id === id).teks;
  cek(kartu("b-martabak") === `1/8 + 2/8 = ${m.p}/${m.q}` && kartu("b-penghapus") === `2/10 + 3/10 = ${m2.p}/${m2.q}` && kartu("b-wingko") === `1/2 + 1/3 = ${m3.p}/${m3.q}`, "ringkas B: kartu martabak, penghapus, wingko (dihitung)");
  const m4 = jumlahMandiri({ p: 1, q: 4 }, { p: 1, q: 6 });
  cek(kartu("b-dua-belas") === `1/4 + 1/6 = ${m4.p}/${m4.q}` && m4.q === 12 && kartu("b-enam-sembilan") === `6/9 = ${s3.p}/${s3.q}` && kartu("b-tujuh-lima") === `7/5 = ${bg.q} ${bg.r}/5`, "ringkas B: kartu 1/4 + 1/6, 6/9, 7/5 (dihitung)");
}

/* ================================ SUB-BAB C: PENGURANGAN (PENCAPAIAN BAB) ================================ */

// Pengurangan dengan mengurangi satu per satu (tanpa operator minus pada bilangan).
const kurangMandiri = (a, b) => {
  let n = a;
  for (let i = 0; i < b; i += 1) n -= 1;
  return n;
};
const selisihMandiri = (a, b) => {
  const k = penyebutSamaMandiri(a.q, b.q);
  return { p: kurangMandiri(ubahMandiri(a.p, a.q, k), ubahMandiri(b.p, b.q, k)), q: k };
};
const z0 = C.awalSisaK5B3C();
const LC = C.langkahSisaK5B3C;

/* ------------------------------ Lab C: Sisa Arsir ------------------------------ */
{
  cek(z0.pernah.length === 0 && z0.pesan === "" && z0.sama.atasOk === false && z0.beda.k === 0 && z0.hasil.bentukOk === false, "C awal: kosong, belum ada riwayat");
  cek(C.DATA_SAMA.every((d) => d.a.q === d.b.q && bandingMandiri(d.a, d.b) === ">") && C.DATA_BEDA.every((d) => d.a.q !== d.b.q && bandingMandiri(d.a, d.b) === ">") && C.DATA_HASIL.every((d) => bandingMandiri(d.a, d.b) === ">"), "C: pecahan awal selalu lebih besar dari bagian yang diambil");

  // Sama.
  const posAtas = [];
  const posBawah = [];
  for (const [i, d] of C.DATA_SAMA.entries()) {
    const { a, b } = d;
    const nama = `${teksPecB(a)} − ${teksPecB(b)}`;
    const atas = kurangMandiri(a.p, b.p);
    const oA = C.opsiAtasSama(i);
    const oB = C.opsiBawahSama(i);
    cek(oA.length === 3 && new Set(oA).size === 3 && oA.filter((v) => v === atas).length === 1 && oA.every((v) => Number.isInteger(v) && v >= 0) && oA.includes(tambahMandiri(a.p, b.p)), `Sama ${nama}: tiga pilihan pembilang unik, satu benar (${atas}), pengecoh dijumlahkan`);
    cek(oB.length === 3 && new Set(oB).size === 3 && oB.filter((v) => v === a.q).length === 1 && oB.includes(kurangMandiri(a.q, b.q)) && oB.includes(tambahMandiri(a.q, b.q)), `Sama ${nama}: tiga pilihan penyebut unik, satu benar (${a.q}), pengecoh penyebut dikurangi dan dijumlahkan`);
    posAtas.push(oA.indexOf(atas));
    posBawah.push(oB.indexOf(a.q));
    const xs = LC(z0, { t: "S_DATA", i });
    for (const v of oB) cek(LC(xs, { t: "S_BAWAH", nilai: v }).pernah.length === 0 && /Tentukan dulu/.test(LC(xs, { t: "S_BAWAH", nilai: v }).pesan), `Sama ${nama}: penyebut ${v} sebelum pembilang ditolak`);
    for (const v of oA.filter((o) => o !== atas)) {
      const s = LC(xs, { t: "S_ATAS", nilai: v });
      cek(!s.sama.atasOk && !s.pesan.startsWith("✅") && /digabung/.test(s.pesan) === (v === tambahMandiri(a.p, b.p)), `Sama ${nama}: pembilang ${v} ditolak`);
    }
    const sA = LC(xs, { t: "S_ATAS", nilai: atas });
    cek(sA.sama.atasOk && sA.pesan.startsWith("✅") && sA.pesan.includes(`${atas} bagian`), `Sama ${nama}: pembilang ${atas} benar`);
    for (const v of oB.filter((o) => o !== a.q)) {
      const s = LC(sA, { t: "S_BAWAH", nilai: v });
      cek(s.pernah.length === 0 && !s.pesan.startsWith("✅") && /tidak dikurangi/.test(s.pesan) === (v === kurangMandiri(a.q, b.q)), `Sama ${nama}: penyebut ${v} ditolak`);
    }
    const sB = LC(sA, { t: "S_BAWAH", nilai: a.q });
    cek(sB.pernah.includes(`sama:${i}`) && sB.pesan.startsWith("✅") && sB.pesan.includes(`${nama} = ${atas}/${a.q}`), `Sama ${nama}: tercatat`);
    cek(!LC(sA, { t: "S_DATA", i: (i + 1) % 4 }).sama.atasOk, `Sama ${nama}: ganti data mengulang pembilang`);
    cek(LC(sA, { t: "S_BAWAH", nilai: 999 }) === sA && LC(xs, { t: "S_ATAS", nilai: 999 }) === xs, `Sama ${nama}: nilai di luar pilihan diabaikan`);
  }
  cek(new Set(posAtas).size >= 2 && new Set(posBawah).size >= 2, `Sama C: letak jawaban benar bervariasi (${posAtas.join("")} / ${posBawah.join("")})`);
  cek(LC(z0, { t: "S_DATA", i: 4 }) === z0 && LC(z0, { t: "S_DATA", i: -1 }) === z0, "Sama C: data di luar batas diabaikan");

  // Beda.
  const posK = [];
  const posH = [];
  for (const [i, d] of C.DATA_BEDA.entries()) {
    const { a, b } = d;
    const nama = `${teksPecB(a)} − ${teksPecB(b)}`;
    const k = penyebutSamaMandiri(a.q, b.q);
    const sm = selisihMandiri(a, b);
    const oK = C.opsiKpk(i);
    cek(C.kpk(a.q, b.q) === k && sm.q === k, `Beda ${nama}: KPK ${k}`);
    cek(oK.length === 3 && new Set(oK).size === 3 && oK.filter((v) => v === k).length === 1 && oK.includes(tambahMandiri(a.q, b.q)), `Beda ${nama}: tiga pilihan KPK unik, satu benar (${k}), pengecoh jumlah penyebut`);
    posK.push(oK.indexOf(k));
    const xb = LC(z0, { t: "B_DATA", i });
    for (const v of C.opsiAtasBeda(i)) cek(LC(xb, { t: "B_ATAS", nilai: v }).pernah.length === 0 && /Cari dulu KPK/.test(LC(xb, { t: "B_ATAS", nilai: v }).pesan), `Beda ${nama}: hasil ${v} sebelum KPK ditolak`);
    for (const v of oK.filter((o) => o !== k)) {
      const s = LC(xb, { t: "B_KPK", nilai: v });
      const bersamaV = bersamaMandiri(a.q, b.q, v);
      cek(s.beda.k === 0 && !s.pesan.startsWith("✅") && /bukan kelipatan dari kedua/.test(s.pesan) === !bersamaV && /bukan yang terkecil/.test(s.pesan) === bersamaV, `Beda ${nama}: KPK ${v} ditolak dengan alasan tepat`);
    }
    const sK = LC(xb, { t: "B_KPK", nilai: k });
    cek(sK.beda.k === k && sK.pesan.startsWith("✅") && sK.pesan.includes(`${ubahMandiri(a.p, a.q, k)}/${k}`) && sK.pesan.includes(`${ubahMandiri(b.p, b.q, k)}/${k}`), `Beda ${nama}: KPK ${k} diterima`);
    cek(LC(sK, { t: "B_KPK", nilai: oK.find((o) => o !== k) }).beda.k === 0, `Beda ${nama}: KPK salah setelah benar mengulang`);
    const oH = C.opsiAtasBeda(i);
    const mentah = kurangMandiri(a.p, b.p);
    cek(oH.length === 3 && new Set(oH).size === 3 && oH.filter((v) => v === sm.p).length === 1 && oH.every((v) => v > 0), `Beda ${nama}: tiga pilihan hasil unik, satu benar (${sm.p})`);
    cek(mentah === sm.p || mentah <= 0 || oH.includes(mentah), `Beda ${nama}: pengecoh pembilang asli dikurangkan ada bila berbeda`);
    posH.push(oH.indexOf(sm.p));
    for (const v of oH.filter((o) => o !== sm.p)) {
      const s = LC(sK, { t: "B_ATAS", nilai: v });
      cek(s.pernah.length === 0 && !s.pesan.startsWith("✅") && /aslinya/.test(s.pesan) === (v === mentah), `Beda ${nama}: hasil ${v} ditolak`);
    }
    const sH = LC(sK, { t: "B_ATAS", nilai: sm.p });
    cek(sH.pernah.includes(`beda:${i}`) && sH.pesan.startsWith("✅") && sH.pesan.includes(`= ${sm.p}/${k}`), `Beda ${nama}: ${sm.p}/${k} tercatat`);
    cek(/disederhanakan/.test(sH.pesan) === (fpbMandiri(sm.p, k) > 1), `Beda ${nama}: saran menyederhanakan hanya bila bisa`);
    cek(!(LC(sK, { t: "B_DATA", i: (i + 1) % 6 }).beda.k > 0), `Beda ${nama}: ganti data mengulang KPK`);
  }
  cek(new Set(posK).size >= 2 && new Set(posH).size >= 2, `Beda C: letak jawaban benar bervariasi (${posK.join("")} / ${posH.join("")})`);
  cek(LC(z0, { t: "B_DATA", i: 6 }) === z0 && LC(z0, { t: "B_KPK", nilai: 999 }) === z0, "Beda C: data dan KPK di luar batas diabaikan");
  // Selisih semua pasangan: kode cocok dengan hitungan mandiri, dan sisa ditambah yang diambil kembali ke awal.
  {
    let ok = true;
    let n = 0;
    for (let q1 = 2; q1 <= 12; q1 += 1) for (let q2 = 2; q2 <= 12; q2 += 1) for (let p1 = 1; p1 < q1; p1 += 1) for (let p2 = 1; p2 < q2; p2 += 1) {
      const a = { p: p1, q: q1 };
      const b = { p: p2, q: q2 };
      if (bandingMandiri(a, b) !== ">") continue;
      n += 1;
      const j = C.selisihKpk(a, b);
      const m = selisihMandiri(a, b);
      if (j.p !== m.p || j.q !== m.q) ok = false;
      // Periksa: sisa ditambah yang diambil sama dengan pecahan awal.
      if (!nilaiSama(jumlahMandiri(j, b), a)) ok = false;
      const s1 = C.sederhana(j);
      const s2 = sederhanaMandiri(j);
      if (s1.p !== s2.p || s1.q !== s2.q) ok = false;
    }
    cek(ok && n > 1000, `C: selisih, penyederhanaan, dan pemeriksaan dengan penjumlahan cocok dengan hitungan mandiri untuk ${n} pasangan`);
  }

  // Hasil.
  for (const [i, d] of C.DATA_HASIL.entries()) {
    const { a, b } = d;
    const nama = `${teksPecB(a)} − ${teksPecB(b)}`;
    const sm = selisihMandiri(a, b);
    const h = C.hasilData(i);
    const ss = sederhanaMandiri(sm);
    cek(h.p === sm.p && h.q === sm.q && ss.g > 1, `Hasil ${nama}: ${sm.p}/${sm.q} masih bisa disederhanakan`);
    cek(C.bentukBenar(i) === teksPecB(ss), `Hasil ${nama}: bentuk sederhana ${teksPecB(ss)} sama dengan hitungan mandiri`);
    const oT = C.opsiBentuk(i);
    cek(oT.length === 3 && new Set(oT).size === 3 && oT.filter((t) => t === teksPecB(ss)).length === 1, `Hasil ${nama}: tiga pilihan bentuk unik, satu benar`);
    const xh = LC(z0, { t: "H_DATA", i });
    // Periksa sebelum menyederhanakan ditolak.
    for (const t of C.opsiCek(i)) cek(LC(xh, { t: "H_CEK", teks: t }).pernah.length === 0 && /Sederhanakan dulu/.test(LC(xh, { t: "H_CEK", teks: t }).pesan), `Hasil ${nama}: periksa ${t} sebelum menyederhanakan ditolak`);
    for (const t of oT.filter((o) => o !== teksPecB(ss))) {
      const n = parsePec(t);
      const nilaiTsama = nilaiSama(n, sm);
      cek(!nilaiTsama || fpbMandiri(n.p, n.q) > 1, `Hasil ${nama}: pengecoh ${t} salah (nilai berbeda atau belum paling sederhana)`);
      const s = LC(xh, { t: "H_BENTUK", teks: t });
      cek(!s.hasil.bentukOk && !s.pesan.startsWith("✅") && /masih bisa disederhanakan lagi/.test(s.pesan) === (nilaiTsama && fpbMandiri(n.p, n.q) > 1), `Hasil ${nama}: ${t} ditolak dengan alasan tepat`);
    }
    const sOk = LC(xh, { t: "H_BENTUK", teks: teksPecB(ss) });
    cek(sOk.hasil.bentukOk && sOk.pesan.startsWith("✅") && sOk.pesan.includes(`dibagi ${ss.g}`) && sOk.pernah.length === 0, `Hasil ${nama}: bentuk ${teksPecB(ss)} diterima, belum tercatat sebelum diperiksa`);
    cek(!LC(sOk, { t: "H_BENTUK", teks: oT.find((o) => o !== teksPecB(ss)) }).hasil.bentukOk, `Hasil ${nama}: bentuk salah setelah benar membatalkan`);
    // Periksa dengan penjumlahan.
    const oC = C.opsiCek(i);
    cek(oC.length === 3 && new Set(oC).size === 3 && oC.filter((t) => t === teksPecB(a)).length === 1, `Hasil ${nama}: tiga pilihan periksa unik, satu benar (${teksPecB(a)})`);
    cek(nilaiSama(jumlahMandiri(ss, b), a), `Hasil ${nama}: ${teksPecB(ss)} + ${teksPecB(b)} sama dengan ${teksPecB(a)} (penjumlahan mandiri)`);
    for (const t of oC.filter((o) => o !== teksPecB(a))) {
      const n = parsePec(t);
      cek(!nilaiSama(n, a), `Hasil ${nama}: pengecoh periksa ${t} berbeda nilai dari ${teksPecB(a)}`);
      const s = LC(sOk, { t: "H_CEK", teks: t });
      cek(s.pernah.length === 0 && !s.pesan.startsWith("✅") && /baru satu bagian/.test(s.pesan) === (t === teksPecB(ss) || t === teksPecB(b)), `Hasil ${nama}: periksa ${t} ditolak dengan alasan tepat`);
    }
    const sT = LC(sOk, { t: "H_CEK", teks: teksPecB(a) });
    cek(sT.pernah.includes(`hasil:${i}`) && sT.pesan.startsWith("✅") && sT.pesan.includes(`${teksPecB(ss)} + ${teksPecB(b)} = ${teksPecB(a)}`), `Hasil ${nama}: pemeriksaan tercatat`);
    cek(LC(sOk, { t: "H_CEK", teks: "9/9" }) === sOk && LC(xh, { t: "H_BENTUK", teks: "9/9" }) === xh, `Hasil ${nama}: pilihan di luar daftar diabaikan`);
  }
  cek(LC(z0, { t: "H_DATA", i: 4 }) === z0 && !LC(LC(LC(z0, { t: "H_DATA", i: 0 }), { t: "H_BENTUK", teks: C.bentukBenar(0) }), { t: "H_DATA", i: 1 }).hasil.bentukOk, "Hasil: data di luar batas diabaikan, ganti data mengulang");

  // Fuzz.
  const acak = acakDari(55);
  let s = z0;
  let ok = true;
  const pesanSemua = new Set();
  const riwayatSemua = new Set();
  const ID = /^(sama:[0-3]|beda:[0-5]|hasil:[0-3])$/;
  for (let i = 0; i < 20000; i += 1) {
    const p = acak(20);
    const sd = C.dataSama(s);
    const bd = C.dataBeda(s);
    const hd = C.dataHasil(s);
    const a =
      p === 0 ? { t: "S_DATA", i: acak(5) } :
      p === 1 ? { t: "S_ATAS", nilai: acak(5) === 0 ? 99 : C.opsiAtasSama(s.sama.data)[acak(3)] } :
      p === 2 ? { t: "S_ATAS", nilai: kurangMandiri(sd.a.p, sd.b.p) } :
      p === 3 ? { t: "S_BAWAH", nilai: acak(5) === 0 ? 99 : C.opsiBawahSama(s.sama.data)[acak(3)] } :
      p === 4 ? { t: "S_BAWAH", nilai: sd.a.q } :
      p === 5 ? { t: "B_DATA", i: acak(7) } :
      p === 6 ? { t: "B_KPK", nilai: acak(5) === 0 ? 99 : C.opsiKpk(s.beda.data)[acak(3)] } :
      p === 7 ? { t: "B_KPK", nilai: penyebutSamaMandiri(bd.a.q, bd.b.q) } :
      p === 8 ? { t: "B_ATAS", nilai: acak(5) === 0 ? 99 : C.opsiAtasBeda(s.beda.data)[acak(3)] } :
      p === 9 ? { t: "B_ATAS", nilai: selisihMandiri(bd.a, bd.b).p } :
      p === 10 ? { t: "H_DATA", i: acak(5) } :
      p === 11 ? { t: "H_BENTUK", teks: acak(5) === 0 ? "9/9" : C.opsiBentuk(s.hasil.data)[acak(3)] } :
      p === 12 ? { t: "H_BENTUK", teks: C.bentukBenar(s.hasil.data) } :
      p === 13 ? { t: "H_CEK", teks: acak(5) === 0 ? "9/9" : C.opsiCek(s.hasil.data)[acak(3)] } :
      p === 14 ? { t: "H_CEK", teks: teksPecB(hd.a) } :
      p === 15 ? { t: "PESAN_KOSONG" } :
      acak(40) === 0 ? { t: "RESET" } : { t: "H_CEK", teks: C.opsiCek(s.hasil.data)[acak(3)] };
    const t = LC(s, a);
    if (a.t !== "RESET" && !s.pernah.every((v) => t.pernah.includes(v))) ok = false;
    if (!(t.sama.data >= 0 && t.sama.data < 4 && t.beda.data >= 0 && t.beda.data < 6 && t.hasil.data >= 0 && t.hasil.data < 4)) ok = false;
    const tb = C.dataBeda(t);
    if (!(t.beda.k === 0 || t.beda.k === penyebutSamaMandiri(tb.a.q, tb.b.q))) ok = false;
    if (typeof t.sama.atasOk !== "boolean" || typeof t.hasil.bentukOk !== "boolean") ok = false;
    for (const id of t.pernah) if (!ID.test(id)) ok = false;
    // Hasil hanya tercatat setelah bentuk sederhana benar: tercatat berarti data itu pernah diperiksa.
    if (t.pesan) pesanSemua.add(t.pesan);
    for (const id of t.pernah) riwayatSemua.add(id);
    s = t;
  }
  cek(ok, "fuzz 20.000 aksi Lab Sisa Arsir: batas terjaga, riwayat tidak dicabut");
  cek(pesanSemua.size > 40 && [...pesanSemua].every(tanpaAngka), `fuzz Lab Sisa Arsir: semua ${pesanSemua.size} pesan dieja menjadi kata`);
  cek(riwayatSemua.size >= 10, `fuzz Lab Sisa Arsir: riwayat terkumpul (${[...riwayatSemua].join(" ")})`);
  globalThis.__pesanC = [...pesanSemua];
}

/* ------------------------------ Mesin C ------------------------------ */
{
  for (const [i, k] of MS.KASUS_SISA.entries()) {
    const c = MS.MESIN_SISA.kasus[i];
    const [sm, bd, sd, pk] = c.langkah;
    const nilaiOpsi = (t) => parsePec(t);
    const [sa, sb] = k.sa;
    cek(sa.q === sb.q && bandingMandiri(sa, sb) === ">" && sm.benar === `${kurangMandiri(sa.p, sb.p)}/${sa.q}` && sm.tanya.includes(teksPecB(sa)) && sm.tanya.includes(teksPecB(sb)), `Mesin ${k.id}: ${teksPecB(sa)} − ${teksPecB(sb)} = ${sm.benar}`);
    cek(sm.opsi.includes(`${kurangMandiri(sa.p, sb.p)}/${kurangMandiri(sa.q, sb.q)}`) && sm.opsi.filter((o) => o !== sm.benar).every((o) => { const n = nilaiOpsi(o); return n.q === 0 || !nilaiSama(n, selisihMandiri(sa, sb)); }), `Mesin ${k.id}: pengecoh sama salah (penyebut ikut dikurangi)`);
    const [ba, bb] = k.be;
    const jb = selisihMandiri(ba, bb);
    cek(ba.q !== bb.q && bandingMandiri(ba, bb) === ">" && bd.benar === teksPecB(jb) && fpbMandiri(jb.p, jb.q) === 1 && bd.tanya.includes(teksPecB(ba)) && bd.tanya.includes(teksPecB(bb)), `Mesin ${k.id}: ${teksPecB(ba)} − ${teksPecB(bb)} = ${bd.benar} (sudah sederhana)`);
    cek(bd.opsi.includes(`${Math.abs(kurangMandiri(ba.p, bb.p))}/${Math.abs(kurangMandiri(ba.q, bb.q))}`) && bd.opsi.every((o) => !o.includes("-")) && bd.opsi.filter((o) => o !== bd.benar).every((o) => { const n = nilaiOpsi(o); return n.q === 0 || !nilaiSama(n, jb); }), `Mesin ${k.id}: pengecoh beda salah (pembilang dan penyebut dikurangi)`);
    cek(bd.petunjuk.includes(`${penyebutSamaMandiri(ba.q, bb.q)}`), `Mesin ${k.id}: petunjuk menyebut KPK`);
    const [ea, eb] = k.se;
    const je = selisihMandiri(ea, eb);
    const ss = sederhanaMandiri(je);
    cek(ss.g > 1 && sd.benar === teksPecB(ss) && sd.tanya.includes(teksPecB(je)), `Mesin ${k.id}: ${teksPecB(je)} disederhanakan menjadi ${sd.benar}`);
    cek(sd.opsi.filter((o) => o !== sd.benar).every((o) => { const n = nilaiOpsi(o); return !nilaiSama(n, je) || fpbMandiri(n.p, n.q) > 1; }), `Mesin ${k.id}: pengecoh sederhana salah`);
    const [pa, pb] = k.pk;
    const sp = sederhanaMandiri(selisihMandiri(pa, pb));
    cek(bandingMandiri(pa, pb) === ">" && pk.benar === teksPecB(pa) && pk.tanya.includes(`${sp.p}/${sp.q}`) && pk.tanya.includes(teksPecB(pb)) && nilaiSama(jumlahMandiri(sp, pb), pa), `Mesin ${k.id}: ${sp.p}/${sp.q} + ${teksPecB(pb)} = ${pk.benar} (penjumlahan mandiri)`);
    cek(pk.opsi.filter((o) => o !== pk.benar).every((o) => !nilaiSama(nilaiOpsi(o), pa)), `Mesin ${k.id}: pengecoh periksa berbeda nilai`);
    cek(pk.opsi.includes(`${tambahMandiri(sp.p, pb.p)}/${tambahMandiri(sp.q, pb.q)}`), `Mesin ${k.id}: pengecoh periksa pembilang dan penyebut dijumlahkan langsung`);
    cek(EJ.ejaK5B3(c.ringkas).includes(EJ.kataPecahanK5B3(jb.p, jb.q)) && !/\d/.test(EJ.ejaK5B3(c.ringkas)), `Mesin ${k.id}: ringkas dieja dengan hasil benar`);
  }
  sama(MS.KASUS_SISA.map((k) => k.id), ["lukis", "kertas", "kebun"], "Mesin C: tiga kasus");
}

/* ------------------------------ Skenario C ------------------------------ */
{
  const S = SK.SKENARIO_K5B3C;
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
  sama(S.id.replace(/-k5b3$/, ""), K5.ID_SKENARIO_K5B3.C, "id skenario C sesuai id misi");
  const adegan = (id) => S.adegan.find((a) => a.id === id);
  // Lukas: 2/3 − 1/3 = 1/3.
  const lukas = adegan("lukas");
  const l13 = `${kurangMandiri(2, 1)}/3`;
  const lb = lukas.opsi.find((o) => o.benar);
  cek(lb.teks.startsWith(l13) && lukas.cerita.includes("2/3") && lukas.cerita.includes("1/3") && lukas.opsi.some((o) => o.teks.startsWith("1/0")) && kurangMandiri(3, 3) === 0 && lukas.opsi.some((o) => o.teks.startsWith("3/3")) && lukas.opsi.filter((o) => !o.benar).every((o) => !o.teks.startsWith(l13)), "C: 2/3 − 1/3 = 1/3, pengecoh 1/0 dan 3/3 salah (dihitung)");
  // Banding, KPK, senilai (konsep A dan B).
  const soal = adegan("banding").soal;
  cek(soal[0].jawaban === "2/3" && bandingMandiri({ p: 2, q: 3 }, { p: 1, q: 2 }) === ">" && soal[0].teks.includes("lebih besar"), "C: A, 2/3 lebih besar dari 1/2 (dihitung)");
  cek(soal[1].jawaban === String(penyebutSamaMandiri(3, 2)) && soal[1].opsi.filter((o) => o !== soal[1].jawaban).every((o) => Number(o) !== penyebutSamaMandiri(3, 2)) && soal[1].opsi.some((o) => !bersamaMandiri(3, 2, Number(o))) && soal[1].opsi.some((o) => bersamaMandiri(3, 2, Number(o)) && Number(o) !== 6), "C: B, KPK 3 dan 2 adalah 6, pengecoh bukan kelipatan dan kelipatan bukan terkecil (dihitung)");
  cek(soal[2].jawaban === `${ubahMandiri(1, 2, 6)}/6` && soal[2].opsi.filter((o) => o !== soal[2].jawaban).every((o) => !nilaiSama(parsePec(o), { p: 1, q: 2 })), "C: A, 1/2 sama dengan 3/6, pengecoh salah (dihitung)");
  cek(adegan("banding").sukses.includes(`${ubahMandiri(2, 3, 6)}/6`) && adegan("banding").sukses.includes(`${ubahMandiri(1, 2, 6)}/6`), "C: kalimat sukses menyebut 4/6 dan 3/6 (dihitung)");
  const sudah = adegan("sudah");
  cek(sudah.jumlah === ubahMandiri(1, 2, 6) && sudah.cerita.includes("3/6") && sudah.sukses.includes("1/2"), "C: tiga bagian per enam sama dengan 1/2 (dihitung)");
  const sisa = adegan("sisa");
  cek(sisa.target === kurangMandiri(ubahMandiri(2, 3, 6), ubahMandiri(1, 2, 6)) && sisa.target <= sisa.maks && sisa.cerita.includes("4/6") && sisa.cerita.includes("3/6") && sisa.sukses.includes("2/3 − 1/2 = 1/6"), "C: 4/6 − 3/6 menyisakan satu bagian (dihitung)");
  const yohana = adegan("yohana");
  const yb = yohana.opsi.find((o) => o.benar);
  const s16 = selisihMandiri({ p: 2, q: 3 }, { p: 1, q: 2 });
  cek(s16.p === 1 && s16.q === 6 && yb.teks.startsWith("1/6") && yb.teks.includes(`${ubahMandiri(2, 3, 6)} dikurangi ${ubahMandiri(1, 2, 6)}`), "C: 2/3 − 1/2 = 1/6 dengan 4 dikurangi 3 (dihitung)");
  cek(yohana.opsi.filter((o) => !o.benar).every((o) => !o.teks.startsWith("1/6")) && yohana.opsi.some((o) => o.teks.startsWith("1/1")) && yohana.opsi.some((o) => o.teks.startsWith("1/3")) && !nilaiSama({ p: 1, q: 3 }, s16) && kurangMandiri(2, 1) === 1 && kurangMandiri(3, 2) === 1, "C: pengecoh 1/1 (penyebut dikurangi langsung) dan 1/3 salah (dihitung)");
  const periksa = adegan("periksa").soal;
  const j1 = jumlahMandiri({ p: 1, q: 3 }, { p: 1, q: 3 });
  cek(periksa[0].jawaban === teksPecB({ p: 2, q: 3 }) && nilaiSama(j1, { p: 2, q: 3 }) && periksa[0].opsi.filter((o) => o !== periksa[0].jawaban).every((o) => !nilaiSama(parsePec(o), j1)), "C: 1/3 + 1/3 = 2/3 (periksa, dihitung)");
  const s48 = sederhanaMandiri(selisihMandiri({ p: 6, q: 8 }, { p: 2, q: 8 }));
  cek(periksa[1].teks.includes("4/8") && periksa[1].jawaban === teksPecB(s48) && periksa[1].opsi.filter((o) => o !== periksa[1].jawaban).every((o) => !nilaiSama(parsePec(o), { p: 1, q: 2 }) || fpbMandiri(parsePec(o).p, parsePec(o).q) > 1), "C: 6/8 − 2/8 = 4/8 disederhanakan menjadi 1/2 (dihitung)");
  const s56 = sederhanaMandiri(selisihMandiri({ p: 5, q: 6 }, { p: 1, q: 3 }));
  cek(periksa[2].jawaban === teksPecB(s56) && periksa[2].opsi.filter((o) => o !== periksa[2].jawaban).every((o) => !nilaiSama(parsePec(o), { p: 1, q: 2 })), "C: 5/6 − 1/3 = 1/2 (dihitung)");
  // Pencapaian bab: skenario menyentuh konsep A (banding), B (KPK dan penjumlahan), dan C (pengurangan).
  const teksS = semuaTeks.join(" | ");
  cek(/lebih besar/.test(teksS) && /KPK/.test(teksS) && /\+/.test(teksS) && /dikurangi|dikurangkan/.test(teksS) && /disederhanakan/.test(teksS), "C: skenario menyentuh banding, KPK, penjumlahan, pengurangan, dan penyederhanaan");
  const posisi = S.adegan.filter((a) => a.jenis === "pilih").map((a) => a.opsi.findIndex((o) => o.benar));
  cek(new Set(posisi).size === posisi.length, `C: letak jawaban pilih bervariasi (${posisi.join("")})`);
}

/* ------------------------------ Misi C ------------------------------ */
{
  const capai = (aksi) => M0.misiBaru(K5.MISI_C, C.keadaanSisaK5B3C(jalan(C.awalSisaK5B3C(), LC, aksi)), new Set());
  const sama_ = (i, benar = true) => {
    const d = C.DATA_SAMA[i];
    return [{ t: "S_DATA", i }, { t: "S_ATAS", nilai: kurangMandiri(d.a.p, d.b.p) }, { t: "S_BAWAH", nilai: benar ? d.a.q : kurangMandiri(d.a.q, d.b.q) }];
  };
  const beda_ = (i, benarK = true, benarH = true) => {
    const d = C.DATA_BEDA[i];
    const k = penyebutSamaMandiri(d.a.q, d.b.q);
    const sm = selisihMandiri(d.a, d.b);
    return [{ t: "B_DATA", i }, { t: "B_KPK", nilai: benarK ? k : tambahMandiri(d.a.q, d.b.q) }, { t: "B_ATAS", nilai: benarH ? sm.p : C.opsiAtasBeda(i).find((o) => o !== sm.p) }];
  };
  const hasil_ = (i, { bentuk = true, cekOk = true } = {}) => {
    const d = C.DATA_HASIL[i];
    const ss = sederhanaMandiri(selisihMandiri(d.a, d.b));
    const aksi = [{ t: "H_DATA", i }, { t: "H_BENTUK", teks: bentuk ? teksPecB(ss) : C.opsiBentuk(i).find((o) => o !== teksPecB(ss)) }];
    aksi.push({ t: "H_CEK", teks: cekOk ? teksPecB(d.a) : C.opsiCek(i).find((o) => o !== teksPecB(d.a)) });
    return aksi;
  };
  cek(capai(sama_(0)).join() === "c-lukas" && capai(sama_(1)).join() === "c-delapan", "C: Sama 2/3 − 1/3 dan 6/8 − 2/8 memenuhi");
  cek(capai(sama_(0, false)).length === 0 && capai([{ t: "S_DATA", i: 0 }, { t: "S_BAWAH", nilai: 3 }]).length === 0 && capai(sama_(2)).length === 0 && capai(sama_(3)).length === 0, "C: penyebut dikurangi, penyebut sebelum pembilang, atau pasangan latihan tidak memenuhi");
  cek(capai(beda_(0)).join() === "c-yohana" && capai(beda_(1)).join() === "c-dua-belas", "C: Beda 2/3 − 1/2 dan 3/4 − 1/6 memenuhi");
  cek(capai(beda_(0, false)).length === 0 && capai(beda_(0, true, false)).length === 0 && capai([{ t: "B_DATA", i: 0 }, { t: "B_ATAS", nilai: 1 }]).length === 0, "C: KPK salah, hasil salah, atau hasil tanpa KPK tidak memenuhi");
  cek(capai(beda_(2)).length === 0 && capai(beda_(5)).length === 0, "C: pasangan 5/6 − 1/3 dan 2/3 − 1/6 hanya latihan, bukan misi");
  cek(capai(hasil_(0)).join() === "c-periksa", "C: Hasil 6/8 − 2/8 disederhanakan lalu diperiksa memenuhi");
  cek(capai(hasil_(0, { bentuk: false })).length === 0 && capai(hasil_(0, { cekOk: false })).length === 0 && capai([{ t: "H_DATA", i: 0 }, { t: "H_BENTUK", teks: "1/2" }]).length === 0 && capai(hasil_(1)).length === 0, "C: bentuk salah, periksa salah, belum diperiksa, atau pasangan lain tidak memenuhi");
  cek(capai(beda_(4)).join() === "c-delapan-empat" && capai(beda_(3)).join() === "c-sepuluh" && capai(hasil_(3)).join() === "c-dua-belas-periksa", "C: tiga tantangan bebas");
  cek(capai([...sama_(0), ...beda_(0), ...hasil_(0)]).sort().join() === "c-lukas,c-periksa,c-yohana", "C: tiga alat sekaligus memenuhi tiga misi");
  cek(M0.misiBaru(K5.MISI_C, { alat: "jumlah", pernah: ["sama:0", "beda:0", "hasil:0"] }, new Set()).length === 0 && M0.misiBaru(K5.MISI_B, { alat: "sisa", pernah: ["sama:0", "beda:0", "hasil:0"] }, new Set()).length === 0, "C: riwayat alat jumlah dan alat sisa saling tidak memenuhi misi");
  cek(C.keadaanSisaK5B3C(z0).alat === "sisa" && C.keadaanSisaK5B3C(z0).pernah.length === 0, "C: keadaan awal tanpa riwayat");
}

/* ------------------------------ Kelengkapan bab C ------------------------------ */
{
  const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas5-bab3-ringkas.json", import.meta.url), "utf8"));
  const baca = (nama, ekstensi) => readFileSync(new URL(`../src/components/modul/${nama}.${ekstensi}`, import.meta.url), "utf8");
  const tanpaKomentar = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
  for (const f of ["SimulasiLabSisaK5B3", "model-sisa-k5b3"]) {
    const s = baca(f, "tsx");
    cek(!/correct_index|explanation/.test(s) && !/fetch\(|XMLHttpRequest|api\/|openai|anthropic|gemini/i.test(s), `${f}: tanpa kunci jawaban, jaringan, atau model bahasa`);
  }
  {
    const s = baca("SimulasiLabSisaK5B3", "tsx");
    cek(/useEffect\(\(\) => \{\s*onKeadaan\?\.\(keadaan\w+\(x\)\);\s*\}, \[onKeadaan, x\]\);/.test(s), "lab C: lapor keadaan lewat useEffect");
    cek(/setLihat\(v\);\s*kirim\(\{ t: "PESAN_KOSONG" \}\);/.test(s), "lab C: ganti tampilan mengosongkan pesan");
    const catatan = [...s.matchAll(/^\s*"([^"]+)",$/gm)].map((m) => m[1]);
    cek(catatan.length >= 4 && catatan.every(tanpaAngka), "lab C: Coba ini dapat dieja");
  }
  cek((baca("lab-sisa-k5b3c", "ts").match(/^import /gm) ?? []).length === 0, "lab C: tanpa impor");
  {
    const s = baca("lab-sisa-k5b3c", "ts");
    cek(!/fetch\(|XMLHttpRequest|from "react"|openai|anthropic|gemini|correct_index|explanation/i.test(s), "lab C: murni");
  }
  const pembungkus = baca("SimulasiK5Bab3", "tsx");
  cek(/SimulasiLabSisaK5B3/.test(tanpaKomentar(pembungkus)) && /C: SKENARIO_K5B3C/.test(pembungkus) && /C: MESIN_SISA/.test(pembungkus), "pembungkus: sub-bab C terhubung ke lab, mesin, dan skenario");
  const ucapan = [];
  for (let i = 0; i < C.DATA_SAMA.length; i += 1) {
    const xs = LC(z0, { t: "S_DATA", i });
    ucapan.push(C.ucapSamaK5B3C(xs), C.ucapSamaK5B3C(LC(xs, { t: "S_ATAS", nilai: kurangMandiri(C.DATA_SAMA[i].a.p, C.DATA_SAMA[i].b.p) })));
  }
  for (let i = 0; i < C.DATA_BEDA.length; i += 1) {
    const xb = LC(z0, { t: "B_DATA", i });
    const d = C.DATA_BEDA[i];
    ucapan.push(C.ucapBedaK5B3C(xb), C.ucapBedaK5B3C(LC(xb, { t: "B_KPK", nilai: penyebutSamaMandiri(d.a.q, d.b.q) })));
  }
  for (let i = 0; i < C.DATA_HASIL.length; i += 1) {
    const xh = LC(z0, { t: "H_DATA", i });
    ucapan.push(C.ucapHasilK5B3C(xh), C.ucapHasilK5B3C(LC(xh, { t: "H_BENTUK", teks: C.bentukBenar(i) })));
  }
  cek(ucapan.length >= 16 && ucapan.every(tanpaAngka), `C: semua ${ucapan.length} ucapan lab dieja menjadi kata`);
  for (const p of globalThis.__pesanC) cek(!/\s-\s/.test(p), "C: pesan lab memakai tanda kurang resmi, bukan strip");
  // Teks misi, mesin, skenario, dan ringkas bisa dieja.
  cek([TK.MISI_K5B3.C, TK.NAMA_SIM_K5B3.C, ...K5.MISI_C.map((m) => m.teks)].every(tanpaAngka), "C: teks misi dapat dieja");

  // Data ringkas C dihitung ulang mandiri.
  const C0 = ringkas.subBab.C;
  cek(C0.peta.cabang.length === 4 && C0.peta.kartu.length === 8 && C0.infografis.panel.length === 3, "ringkas C: empat cabang, delapan kartu, tiga panel");
  const butir = (panel, id) => panel.butir.find((b) => b.id === id);
  const [p1, p2, p3] = C0.infografis.panel;
  sama(butir(p1, "bagian").visual.baris.map((r) => r[1]), [2, 1, kurangMandiri(2, 1)], "ringkas C: Lukas harus, sudah, sisa (dihitung)");
  const m1 = selisihMandiri({ p: 2, q: 3 }, { p: 1, q: 3 });
  cek(butir(p1, "hasil").visual.isi === `2/3 − 1/3 = ${m1.p}/${m1.q}` && m1.q === 3, "ringkas C: 2/3 − 1/3 (dihitung)");
  cek(butir(p1, "salah").visual.isi === `${m1.p}/${kurangMandiri(3, 3)} salah` && butir(p1, "salah").suara.toLowerCase().includes(EJ.kataPecahanK5B3(1, 0)) && butir(p1, "hasil").suara.toLowerCase().includes(EJ.kataPecahanK5B3(m1.p, m1.q)), "ringkas C: 1/0 salah dan suaranya (dihitung)");
  const [sm, bd] = p2.sisi;
  const m2 = selisihMandiri({ p: 6, q: 8 }, { p: 2, q: 8 });
  cek(sm.visual.isi === `6/8 − 2/8 = ${m2.p}/${m2.q}`, "ringkas C: 6/8 − 2/8 (dihitung)");
  const m3 = selisihMandiri({ p: 2, q: 3 }, { p: 1, q: 2 });
  cek(bd.visual.isi === `${ubahMandiri(2, 3, 6)}/6 − ${ubahMandiri(1, 2, 6)}/6 = ${m3.p}/${m3.q}` && m3.q === 6, "ringkas C: 2/3 − 1/2 disamakan menjadi 6 (dihitung)");
  cek(bd.suara.toLowerCase().includes(EJ.kataPecahanK5B3(ubahMandiri(2, 3, 6), 6)) && bd.suara.toLowerCase().includes(EJ.kataPecahanK5B3(ubahMandiri(1, 2, 6), 6)), "ringkas C: suara empat per enam dan tiga per enam");
  const j1 = jumlahMandiri({ p: 1, q: 3 }, { p: 1, q: 3 });
  cek(butir(p3, "periksa").visual.isi === `1/3 + 1/3 = ${j1.p}/${j1.q}` && j1.q === 3, "ringkas C: 1/3 + 1/3 (dihitung)");
  const s48 = sederhanaMandiri({ p: 4, q: 8 });
  cek(butir(p3, "sederhana").visual.isi === `4/8 = ${s48.p}/${s48.q}` && s48.g === 4, "ringkas C: 4/8 sama dengan 1/2 (dihitung)");
  cek(butir(p3, "kpk").visual.isi === `${kelipatanMandiri(3, 6).join(", ")} dan ${kelipatanMandiri(2, 6).join(", ")}` && penyebutSamaMandiri(3, 2) === 6, "ringkas C: kelipatan 3 dan 2 bertemu di 6 (dihitung)");
  const kartu = (id) => C0.peta.kartu.find((k) => k.id === id).teks;
  cek(kartu("c-lukas") === `2/3 − 1/3 = ${m1.p}/${m1.q}` && kartu("c-delapan") === `6/8 − 2/8 = ${m2.p}/${m2.q}` && kartu("c-yohana") === `2/3 − 1/2 = ${m3.p}/${m3.q}`, "ringkas C: kartu Lukas, delapan, Yohana (dihitung)");
  const m4 = selisihMandiri({ p: 3, q: 4 }, { p: 1, q: 6 });
  cek(kartu("c-dua-belas") === `3/4 − 1/6 = ${m4.p}/${m4.q}` && m4.q === 12 && kartu("c-tambah") === `1/3 + 1/3 = ${j1.p}/${j1.q}` && kartu("c-sederhana") === `4/8 = ${s48.p}/${s48.q}`, "ringkas C: kartu 3/4 − 1/6, 1/3 + 1/3, 4/8 (dihitung)");
}

/* ------------------------------ Pendaftaran bab ------------------------------ */
{
  const registri = readFileSync(new URL("../src/components/modul/registri-simulasi.ts", import.meta.url), "utf8");
  cek(/"mtk-5-bab3": SimulasiK5Bab3Materi,/.test(registri) && /"mtk-5-bab3": misiAwalK5Bab3,/.test(registri) && /"mtk-5-bab3": ringkasK5B3\.subBab as unknown as Record<string, RingkasSub>,/.test(registri), "registri: mtk-5-bab3 terdaftar di tiga peta (simulasi, misi awal, ringkas)");
  cek(/dynamic<SimulasiMateriProps>\(\(\) => import\("@\/components\/modul\/SimulasiK5Bab3"\), \{ ssr: false \}\)/.test(registri), "registri: simulasi Kelas 5 Bab 3 dimuat malas tanpa SSR");
  cek(!/SimulasiLab(Banding|Jumlah|Sisa)K5B3/.test(registri) && !/lab-(banding|jumlah|sisa)-k5b3/.test(registri), "registri: tidak menarik komponen lab ke bundel awal");
  const peta = readFileSync(new URL("../naskah/igil-module-player-peta.md", import.meta.url), "utf8");
  cek(peta.includes("SimulasiK5Bab3"), "peta pemutar: Kelas 5 Bab 3 dicatat");
  const bab = readFileSync(new URL("../src/components/modul/registri-bab-baru.ts", import.meta.url), "utf8");
  cek(bab.includes("mtk-5-bab3"), "registri bab baru: mtk-5-bab3 ada");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
