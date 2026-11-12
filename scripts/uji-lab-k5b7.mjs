// Uji Simulasi Kelas 5 Bab 7 (Membandingkan Ciri-Ciri Bangun Datar): Lab Segitiga (A), Lab Segi Empat (B), mesin, skenario, misi,
// gerbang, data ringkas, pendaftaran bab, pengeja, dan konsep segi empat tidak bocor ke Sub-Bab A.
// Jalankan: node --no-warnings scripts/uji-lab-k5b7.mjs
import { readFileSync } from "node:fs";
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K7 from "../src/components/modul/misi-k5bab7.ts";
import * as TK from "../src/components/modul/misi-teks-k5b7.ts";
import * as A from "../src/components/modul/lab-segitiga-k5b7a.ts";
import * as B from "../src/components/modul/lab-segiempat-k5b7b.ts";
import * as MS from "../src/components/modul/mesin-data-k5b7.ts";
import * as SK from "../src/components/modul/skenario-k5b7.ts";
import * as ME from "../src/components/modul/mesin-bertahap-k3b1.ts";
import * as EJ from "../src/components/modul/eja-k5b7.ts";
import * as EJ1 from "../src/components/modul/eja-k5b1.ts";

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
const tanpaAngka = (t) => !/\d/.test(EJ.ejaK5B7(t));
const L = A.langkahSegitigaK5B7A;
const x0 = A.awalSegitigaK5B7A();

/* ------------------------------ Hitungan MANDIRI (cara berbeda) ------------------------------ */
// Kode memakai jumlah dua sisi lawan sisi ketiga. Di sini segitiga ada bila luasnya positif: 16 x luas kuadrat
// = (a+b+c)(-a+b+c)(a-b+c)(a+b-c) (rumus Heron) lebih dari nol.
const heron = ([a, b, c]) => (a + b + c) * (-a + b + c) * (a - b + c) * (a + b - c);
const adaSegitiga = (s) => heron(s) > 0;
// Pasangan yang lolos dihitung dari sisi terurut: dua sisi pendek lawan sisi terpanjang adalah satu-satunya uji yang bisa gagal.
const lolosMandiri = (s) => {
  const [p, q, r] = [...s].sort((u, v) => u - v);
  return 2 + (p + q > r ? 1 : 0);
};
// Jenis menurut sudut: dari kosinus sudut terbesar (positif lancip, nol siku-siku, negatif tumpul).
const jenisSudutMandiri = (p, q) => {
  const r = 180 - p - q;
  if (r <= 0) return null;
  const rad = (Math.max(p, q, r) * Math.PI) / 180;
  const c = Math.round(Math.cos(rad) * 1e6) / 1e6;
  return c === 0 ? "siku" : c > 0 ? "lancip" : "tumpul";
};
// Jenis menurut sisi dari banyak panjang berbeda; simetri lipat dari banyak permutasi sisi yang mempertahankan panjang.
const jenisSisiMandiri = (s) => ({ 1: "sama-sisi", 2: "sama-kaki", 3: "sembarang" })[new Set(s).size];
const permutasi = (a) => (a.length <= 1 ? [a] : a.flatMap((v, i) => permutasi([...a.slice(0, i), ...a.slice(i + 1)]).map((r) => [v, ...r])));
const simetriMandiri = (s) => {
  const terjaga = permutasi([0, 1, 2]).filter((p) => p.every((j, i) => s[j] === s[i])).length;
  const putar = new Set(s).size === 1 ? 2 : 0;
  return terjaga - 1 - putar;
};
const NAMA_SISI = { "sama-kaki": "sama kaki", "sama-sisi": "sama sisi", sembarang: "sembarang" };

/* ------------------------------ Pengeja ------------------------------ */
{
  sama(EJ.ejaK5B7("180°"), "seratus delapan puluh derajat", "eja 180 derajat");
  sama(EJ.ejaK5B7("5 + 6 = 11"), "lima ditambah enam sama dengan sebelas", "eja jumlah");
  sama(EJ.ejaK5B7("5 + 4 > 12"), "lima ditambah empat lebih besar dari dua belas", "eja lebih besar");
  sama(EJ.ejaK5B7("9 < 12"), "sembilan lebih kecil dari dua belas", "eja lebih kecil");
  sama(EJ.ejaK5B7("a ≠ b"), "a tidak sama dengan b", "eja tidak sama");
  sama(EJ.ejaK5B7("180° − 50° − 60° = 70°"), "seratus delapan puluh derajat dikurangi lima puluh derajat dikurangi enam puluh derajat sama dengan tujuh puluh derajat", "eja sisa sudut");
  sama(EJ.ejaK5B7("180° ÷ 3 = 60°"), "seratus delapan puluh derajat dibagi tiga sama dengan enam puluh derajat", "eja dibagi");
  sama(EJ.ejaK5B7("12 cm"), "dua belas sentimeter", "eja sentimeter");
  sama(EJ.ejaK5B7("tidak ada angka."), "tidak ada angka.", "tanpa angka tetap");
  let ok = true;
  for (let n = 0; n <= 360; n += 1) if (EJ.kataK5B7(n) !== EJ1.kataK5B1(n)) ok = false;
  for (const n of [999, 1000, 1200, 999999]) if (EJ.kataK5B7(n) !== EJ1.kataK5B1(n)) ok = false;
  cek(ok, "kata bilangan sama dengan kataK5B1 untuk 0 sampai 360 dan beberapa bilangan besar");
  cek(EJ.kataK5B7(-1) === "-1" && EJ.kataK5B7(1.5) === "1.5" && EJ.kataK5B7(1000000) === "1000000", "di luar rentang dikembalikan apa adanya");
}

/* ------------------------------ Data sama dengan buku ------------------------------ */
{
  sama(A.DATA_SEDOTAN.slice(0, 2).map((d) => d.sisi), [[5, 6, 7], [5, 4, 12]], "Sedotan: dua contoh buku, 5-6-7 bisa dan 5-4-12 tidak");
  cek(A.SIKU === 90 && A.JUMLAH_SUDUT === 180, "siku-siku 90 dan jumlah sudut segitiga 180");
  cek(A.DATA_SEDOTAN.length === 6 && A.DATA_SUDUT.length === 6 && A.DATA_SISI.length === 6, "enam data tiap tampilan");
  cek(A.DATA_SEDOTAN.every((d) => d.sisi.every((n) => Number.isInteger(n) && n >= 1 && n <= 15)), "panjang sedotan bulat 1 sampai 15");
  cek(A.DATA_SUDUT.every((d) => d.p % 5 === 0 && d.q % 5 === 0 && d.p > 0 && d.q > 0), "sudut kelipatan 5 dan positif");
  cek(A.DATA_SEDOTAN.filter((d) => adaSegitiga(d.sisi)).length === 3 && A.DATA_SEDOTAN.filter((d) => !adaSegitiga(d.sisi)).length === 3, "tiga sedotan bisa, tiga tidak (Heron)");
  cek(heron([3, 4, 7]) === 0 && heron([5, 4, 12]) < 0 && heron([5, 6, 7]) > 0, "Heron: 3-4-7 nol (garis lurus), 5-4-12 negatif, 5-6-7 positif");
  cek(A.DATA_SEDOTAN.some((d) => d.sisi[0] + d.sisi[1] === d.sisi[2] || d.sisi[0] + d.sisi[2] === d.sisi[1] || d.sisi[1] + d.sisi[2] === d.sisi[0]), "ada kasus jumlah dua sisi sama dengan sisi ketiga");
  const jenisSudutData = A.DATA_SUDUT.map((d) => jenisSudutMandiri(d.p, d.q));
  sama(jenisSudutData, ["lancip", "siku", "tumpul", null, null, "lancip"], "Sudut: jenis tiap data (kosinus sudut terbesar)");
  sama(A.DATA_SISI.map((d) => jenisSisiMandiri(d.sisi)), ["sama-kaki", "sama-sisi", "sembarang", "sama-kaki", "sama-sisi", "sembarang"], "Sisi: jenis tiap data");
  cek(A.DATA_SISI.every((d) => adaSegitiga(d.sisi)), "semua data Sisi memenuhi syarat segitiga (Heron)");
}

/* ------------------------------ Fungsi murni dibanding hitungan mandiri ------------------------------ */
{
  let n = 0;
  let ok = true;
  for (let a = 1; a <= 15; a += 1)
    for (let b = 1; b <= 15; b += 1)
      for (let c = 1; c <= 15; c += 1) {
        n += 1;
        const s = [a, b, c];
        if (A.bisaSegitiga(s) !== adaSegitiga(s) || A.banyakLolos(s) !== lolosMandiri(s)) ok = false;
        if (A.pasanganSama(s) !== (new Set(s).size === 1 ? 3 : new Set(s).size === 2 ? 1 : 0)) ok = false;
        if (A.jenisSisi(s) !== jenisSisiMandiri(s)) ok = false;
        if (A.simetriLipat(A.jenisSisi(s)) !== simetriMandiri(s)) ok = false;
      }
  cek(ok && n === 3375, `3.375 trio sisi: bisaSegitiga sama dengan Heron, banyak lolos, jenis sisi, simetri lipat sama dengan hitungan mandiri`);
  ok = true;
  let m = 0;
  for (let p = 5; p <= 175; p += 5)
    for (let q = 5; q <= 175; q += 5) {
      m += 1;
      if (A.sudutKetiga(p, q) !== 180 - p - q || A.sudutBisa(p, q) !== (p + q < 180) || A.jenisSudut(p, q) !== jenisSudutMandiri(p, q)) ok = false;
    }
  cek(ok && m === 35 * 35, "semua pasangan sudut kelipatan 5: sudut ketiga, bisa atau tidak, jenis sama dengan hitungan mandiri");
  for (let k = 0; k < 3; k += 1) {
    const u = A.ujiPasangan([5, 4, 12], k);
    cek(u.jumlah === u.dua[0] + u.dua[1] && u.lolos === (u.jumlah > u.lawan), `ujiPasangan 5-4-12 pasangan ${k} konsisten`);
  }
  sama([0, 1, 2].map((k) => A.ujiPasangan([5, 4, 12], k).lolos), [false, true, true], "5-4-12: hanya a+b lawan c gagal");
  sama([0, 1, 2].map((k) => A.ujiPasangan([3, 4, 7], k).lolos), [false, true, true], "3-4-7: a+b sama dengan c gagal");
  sama([0, 1, 2].map((k) => A.ujiPasangan([5, 6, 7], k).jumlah), [11, 12, 13], "5-6-7: jumlah pasangan 11, 12, 13");
  sama([0, 1, 2].map((k) => A.pasanganImpit([7, 4, 9], k)), [[7, 4], [7, 9], [4, 9]], "pasangan impit a-b, a-c, b-c");
  sama(["sama-sisi", "sama-kaki", "sembarang"].map((j) => A.hierarki(j).jawab), ["ya", "tidak", "tidak"], "hierarki: sama sisi ya, sama kaki tidak, sembarang tidak");
  sama(["sama-sisi", "sama-kaki", "sembarang"].map((j) => A.simetriLipat(j)), [3, 1, 0], "simetri lipat 3, 1, 0");
}

/* ------------------------------ Lab A: Segitiga ------------------------------ */
{
  // Awal.
  cek(x0.pernah.length === 0 && x0.pesan === "" && x0.sedotan.uji.length === 0 && !x0.sudut.hitung && x0.sisi.impit.length === 0, "awal: kosong");
  sama(A.keadaanSegitigaK5B7A(x0), { alat: "segitiga", pernah: [] }, "keadaan awal");
  cek(x0.sedotan.data === 0 && x0.sudut.data === 0 && x0.sisi.data === 0, "awal: data pertama");

  // Sedotan.
  {
    const s = jalan(x0, L, [{ t: "S_JAWAB", jawab: "bisa" }]);
    cek(s.pernah.length === 0 && s.pesan.includes("Uji dulu"), "Sedotan: menjawab sebelum menguji ketiga pasangan ditolak");
    const dua = jalan(x0, L, [{ t: "S_UJI", k: 0 }, { t: "S_UJI", k: 1 }, { t: "S_JAWAB", jawab: "bisa" }]);
    cek(dua.pernah.length === 0, "Sedotan: dua dari tiga uji belum cukup");
    const ganda = jalan(x0, L, [{ t: "S_UJI", k: 0 }, { t: "S_UJI", k: 0 }, { t: "S_UJI", k: 0 }]);
    sama(ganda.sedotan.uji, [0], "Sedotan: menguji pasangan yang sama tidak menggandakan");
    const tiga = [{ t: "S_UJI", k: 0 }, { t: "S_UJI", k: 1 }, { t: "S_UJI", k: 2 }];
    for (const [i, d] of A.DATA_SEDOTAN.entries()) {
      const bisa = adaSegitiga(d.sisi);
      const siap = jalan(x0, L, [{ t: "S_DATA", i }, ...tiga]);
      const salah = L(siap, { t: "S_JAWAB", jawab: bisa ? "tidak" : "bisa" });
      cek(salah.pernah.length === 0 && salah.pesan.length > 10, `Sedotan ${i}: jawaban terbalik tidak dicatat, ada petunjuk`);
      const benar = L(siap, { t: "S_JAWAB", jawab: bisa ? "bisa" : "tidak" });
      sama(benar.pernah, [A.idSedotan(i)], `Sedotan ${i}: jawaban benar dicatat`);
      cek(benar.pesan.startsWith("✅") && (bisa ? benar.pesan.includes("bisa menjadi segitiga") : benar.pesan.includes("tidak bisa menjadi segitiga")), `Sedotan ${i}: pesan benar sesuai`);
      cek(L(siap, { t: "S_JAWAB", jawab: "mungkin" }) === siap, `Sedotan ${i}: jawaban tak dikenal diabaikan`);
      // Pesan tiap uji sesuai hitungan.
      for (let k = 0; k < 3; k += 1) {
        const u = L(L(x0, { t: "S_DATA", i }), { t: "S_UJI", k });
        const [p, q] = k === 0 ? [d.sisi[0], d.sisi[1]] : k === 1 ? [d.sisi[0], d.sisi[2]] : [d.sisi[1], d.sisi[2]];
        const lawan = k === 0 ? d.sisi[2] : k === 1 ? d.sisi[1] : d.sisi[0];
        const kata = p + q > lawan ? "lolos" : p + q === lawan ? "sama dengan" : "kurang dari";
        cek(u.pesan.includes(`${p} + ${q} = ${p + q}`) && u.pesan.includes(kata) && (p + q > lawan ? !u.pesan.includes("gagal") : u.pesan.includes("gagal")), `Sedotan ${i} pasangan ${k}: pesan uji sesuai hitungan`);
      }
    }
    const ganti = jalan(x0, L, [...tiga, { t: "S_DATA", i: 1 }]);
    cek(ganti.sedotan.uji.length === 0 && ganti.sedotan.data === 1, "Sedotan: ganti sedotan mengosongkan uji");
    cek(L(x0, { t: "S_DATA", i: 99 }) === x0 && L(x0, { t: "S_DATA", i: -1 }) === x0 && L(x0, { t: "S_DATA", i: 1.5 }) === x0 && L(x0, { t: "S_UJI", k: 3 }) === x0 && L(x0, { t: "S_UJI", k: -1 }) === x0, "Sedotan: indeks di luar batas diabaikan");
  }

  // Sudut.
  {
    const s = jalan(x0, L, [{ t: "U_JAWAB", jawab: "lancip" }]);
    cek(s.pernah.length === 0 && s.pesan.includes("Hitung dulu"), "Sudut: menjawab sebelum menghitung ditolak");
    for (const [i, d] of A.DATA_SUDUT.entries()) {
      const jenis = jenisSudutMandiri(d.p, d.q) ?? "bukan";
      const siap = jalan(x0, L, [{ t: "U_DATA", i }, { t: "U_HITUNG" }]);
      const r = 180 - d.p - d.q;
      cek(r > 0 ? siap.pesan.includes(`= ${r}°`) : siap.pesan.includes("Tidak ada sisa"), `Sudut ${i}: pesan hitung sesuai (${r})`);
      for (const j of ["lancip", "siku", "tumpul", "bukan"]) {
        const t = L(siap, { t: "U_JAWAB", jawab: j });
        if (j === jenis) {
          sama(t.pernah, [A.idSudut(i)], `Sudut ${i}: jenis ${j} benar dicatat`);
          cek(t.pesan.startsWith("✅"), `Sudut ${i}: pesan benar`);
        } else cek(t.pernah.length === 0 && t.pesan.length > 10, `Sudut ${i}: jawaban ${j} salah tidak dicatat`);
      }
      cek(L(siap, { t: "U_JAWAB", jawab: "lurus" }) === siap, `Sudut ${i}: jawaban tak dikenal diabaikan`);
    }
    cek(L(jalan(x0, L, [{ t: "U_HITUNG" }]), { t: "U_DATA", i: 1 }).sudut.hitung === false, "Sudut: ganti data mengosongkan hitung");
    cek(L(x0, { t: "U_DATA", i: 6 }) === x0 && L(x0, { t: "U_DATA", i: -1 }) === x0, "Sudut: indeks di luar batas diabaikan");
    // Dua sudut siku-siku: tidak ada sisa; dua sudut tumpul: jumlah lebih dari 180.
    const dua = jalan(x0, L, [{ t: "U_DATA", i: 3 }, { t: "U_HITUNG" }]);
    cek(dua.pesan.includes("= 0°"), "Sudut: dua siku-siku menyisakan nol");
    const tumpul2 = jalan(x0, L, [{ t: "U_DATA", i: 4 }, { t: "U_HITUNG" }]);
    cek(tumpul2.pesan.includes("200°") && tumpul2.pesan.includes("lebih dari 180°"), "Sudut: dua tumpul berjumlah 200, lebih dari 180");
  }

  // Sisi dan hierarki.
  {
    const impitSemua = [{ t: "I_IMPIT", k: 0 }, { t: "I_IMPIT", k: 1 }, { t: "I_IMPIT", k: 2 }];
    const s = jalan(x0, L, [{ t: "I_JAWAB", jawab: "sama-kaki" }]);
    cek(s.pernah.length === 0 && s.pesan.includes("Impitkan dulu"), "Sisi: menjawab sebelum mengimpit ketiga pasangan ditolak");
    const hDini = jalan(x0, L, [{ t: "I_HIER", jawab: "ya" }]);
    cek(hDini.pernah.length === 0 && hDini.pesan.includes("Tentukan dulu"), "Sisi: hierarki sebelum jenis ditolak");
    for (const [i, d] of A.DATA_SISI.entries()) {
      const jenis = jenisSisiMandiri(d.sisi);
      const siap = jalan(x0, L, [{ t: "I_DATA", i }, ...impitSemua]);
      for (const j of ["sama-kaki", "sama-sisi", "sembarang"]) {
        const t = L(siap, { t: "I_JAWAB", jawab: j });
        if (j === jenis) {
          sama(t.pernah, [A.idSisi(i)], `Sisi ${i}: jenis ${j} benar dicatat`);
          cek(t.pesan.includes(NAMA_SISI[jenis]) && t.pesan.includes(`${simetriMandiri(d.sisi)} simetri lipat`) || jenis === "sembarang", `Sisi ${i}: pesan menyebut jenis dan simetri lipat`);
          if (jenis === "sama-sisi") cek(t.pesan.includes("60°"), `Sisi ${i}: sama sisi tiap sudut 60`);
        } else cek(t.pernah.length === 0, `Sisi ${i}: jawaban ${j} salah tidak dicatat`);
      }
      const jenisOk = L(siap, { t: "I_JAWAB", jawab: jenis });
      const benarH = jenis === "sama-sisi" ? "ya" : "tidak";
      const salahH = benarH === "ya" ? "tidak" : "ya";
      cek(L(jenisOk, { t: "I_HIER", jawab: salahH }).pernah.length === 1, `Sisi ${i}: hierarki salah tidak menambah riwayat`);
      const hb = L(jenisOk, { t: "I_HIER", jawab: benarH });
      sama(hb.pernah, [A.idSisi(i), A.idHier(i)], `Sisi ${i}: hierarki benar dicatat`);
      cek(A.hierarki(jenis).jawab === benarH, `Sisi ${i}: kunci hierarki (${benarH}) sama dengan hitungan mandiri`);
      // Tanpa mengimpit ulang: kembali ke data yang sudah punya jenis boleh langsung menjawab hierarki.
      const kembali = jalan(hb, L, [{ t: "I_DATA", i: (i + 1) % 6 }, { t: "I_DATA", i }]);
      cek(kembali.sisi.impit.length === 0 && kembali.pernah.includes(A.idSisi(i)), `Sisi ${i}: kembali ke data lama, riwayat utuh`);
      cek(L(jenisOk, { t: "I_HIER", jawab: "mungkin" }) === jenisOk, `Sisi ${i}: jawaban hierarki tak dikenal diabaikan`);
      for (let k = 0; k < 3; k += 1) {
        const [u, v] = k === 0 ? [d.sisi[0], d.sisi[1]] : k === 1 ? [d.sisi[0], d.sisi[2]] : [d.sisi[1], d.sisi[2]];
        const t = L(L(x0, { t: "I_DATA", i }), { t: "I_IMPIT", k });
        cek(u === v ? t.pesan.includes("berimpit rapi") : t.pesan.includes("tidak berimpit"), `Sisi ${i} pasangan ${k}: pesan impit sesuai`);
      }
    }
    sama(jalan(x0, L, [{ t: "I_IMPIT", k: 1 }, { t: "I_IMPIT", k: 1 }]).sisi.impit, [1], "Sisi: mengimpit pasangan sama tidak menggandakan");
    cek(L(x0, { t: "I_DATA", i: 6 }) === x0 && L(x0, { t: "I_IMPIT", k: 3 }) === x0, "Sisi: indeks di luar batas diabaikan");
  }

  // Reset dan pesan kosong.
  {
    const s = jalan(x0, L, [{ t: "S_UJI", k: 0 }, { t: "U_HITUNG" }, { t: "I_IMPIT", k: 0 }]);
    cek(L(s, { t: "PESAN_KOSONG" }).pesan === "" && L(s, { t: "PESAN_KOSONG" }).sedotan.uji.length === 1, "PESAN_KOSONG hanya mengosongkan pesan");
    sama(L(s, { t: "RESET" }), x0, "RESET kembali ke awal");
  }

  // Fuzz 20.000 aksi: batas terjaga, riwayat hanya bertambah oleh jawaban benar, pesan dapat dieja.
  {
    const acak = acakDari(5707);
    const pesanSemua = new Set();
    const riwayatSemua = new Set();
    let ok = true;
    let s = x0;
    const daftarJawab = ["bisa", "tidak", "lancip", "siku", "tumpul", "bukan", "sama-kaki", "sama-sisi", "sembarang", "ya", "tidak", "mungkin"];
    const buat = () => {
      const r = acak(14);
      if (r === 0) return { t: "S_DATA", i: acak(8) - 1 };
      if (r === 1) return { t: "S_UJI", k: acak(5) - 1 };
      if (r === 2) return { t: "S_JAWAB", jawab: daftarJawab[acak(daftarJawab.length)] };
      if (r === 3) return { t: "U_DATA", i: acak(8) - 1 };
      if (r === 4) return { t: "U_HITUNG" };
      if (r === 5) return { t: "U_JAWAB", jawab: daftarJawab[acak(daftarJawab.length)] };
      if (r === 6) return { t: "I_DATA", i: acak(8) - 1 };
      if (r === 7) return { t: "I_IMPIT", k: acak(5) - 1 };
      if (r === 8) return { t: "I_JAWAB", jawab: daftarJawab[acak(daftarJawab.length)] };
      if (r === 9) return { t: "I_HIER", jawab: daftarJawab[acak(daftarJawab.length)] };
      if (r === 10) return { t: "PESAN_KOSONG" };
      if (r === 11 && acak(40) === 0) return { t: "RESET" };
      return { t: "S_UJI", k: acak(3) };
    };
    for (let n = 0; n < 20000; n += 1) {
      const a = buat();
      const sebelum = s;
      s = L(s, a);
      pesanSemua.add(s.pesan);
      const batas =
        s.sedotan.data >= 0 && s.sedotan.data < 6 && s.sudut.data >= 0 && s.sudut.data < 6 && s.sisi.data >= 0 && s.sisi.data < 6 &&
        s.sedotan.uji.every((k) => k >= 0 && k < 3) && new Set(s.sedotan.uji).size === s.sedotan.uji.length &&
        s.sisi.impit.every((k) => k >= 0 && k < 3) && new Set(s.sisi.impit).size === s.sisi.impit.length &&
        new Set(s.pernah).size === s.pernah.length;
      if (!batas) ok = false;
      if (a.t === "RESET") {
        if (s.pernah.length !== 0) ok = false;
        continue;
      }
      // Riwayat tidak dicabut.
      if (!sebelum.pernah.every((p) => s.pernah.includes(p))) ok = false;
      const baru = s.pernah.filter((p) => !sebelum.pernah.includes(p));
      if (baru.length > 1) ok = false;
      if (baru.length === 1) {
        riwayatSemua.add(baru[0].split(":")[0]);
        const [alat, idx] = baru[0].split(":");
        const i = Number(idx);
        // Orakel mandiri: tiap id baru harus dari jawaban benar pada data yang aktif, dengan syarat terpenuhi.
        if (alat === "sedotan") {
          const bisa = adaSegitiga(A.DATA_SEDOTAN[i].sisi);
          if (!(a.t === "S_JAWAB" && sebelum.sedotan.data === i && sebelum.sedotan.uji.length === 3 && (a.jawab === "bisa") === bisa && (a.jawab === "bisa" || a.jawab === "tidak"))) ok = false;
        } else if (alat === "sudut") {
          const jenis = jenisSudutMandiri(A.DATA_SUDUT[i].p, A.DATA_SUDUT[i].q) ?? "bukan";
          if (!(a.t === "U_JAWAB" && sebelum.sudut.data === i && sebelum.sudut.hitung && a.jawab === jenis)) ok = false;
        } else if (alat === "sisi") {
          if (!(a.t === "I_JAWAB" && sebelum.sisi.data === i && sebelum.sisi.impit.length === 3 && a.jawab === jenisSisiMandiri(A.DATA_SISI[i].sisi))) ok = false;
        } else if (alat === "hier") {
          const kunci = jenisSisiMandiri(A.DATA_SISI[i].sisi) === "sama-sisi" ? "ya" : "tidak";
          if (!(a.t === "I_HIER" && sebelum.sisi.data === i && sebelum.pernah.includes(A.idSisi(i)) && a.jawab === kunci)) ok = false;
        } else ok = false;
      }
    }
    cek(ok, "fuzz 20.000 aksi Lab Segitiga: batas terjaga, riwayat tidak dicabut dan hanya bila tercapai (orakel mandiri)");
    cek(pesanSemua.size > 20 && [...pesanSemua].every(tanpaAngka), `fuzz Lab Segitiga: semua ${pesanSemua.size} pesan dieja menjadi kata`);
    cek(riwayatSemua.size === 4, `fuzz Lab Segitiga: riwayat terkumpul (${[...riwayatSemua].sort().join(" ")})`);
    globalThis.__pesanA = [...pesanSemua];
  }
}

/* ------------------------------ Mesin ------------------------------ */
{
  cek(MS.SEMUA_MESIN_K5B7.length === 2 && MS.SEMUA_MESIN_K5B7[0] === MS.MESIN_SEGITIGA && MS.SEMUA_MESIN_K5B7[1] === MS.MESIN_SEGIEMPAT, "dua mesin untuk Sub-Bab A dan B");
  for (const def of MS.SEMUA_MESIN_K5B7) {
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
    cek(x.selesai && def.selesaiId === { "mesin-segitiga-k5b7": K7.ID_MESIN_K5B7.A, "mesin-segiempat-k5b7": K7.ID_MESIN_K5B7.B }[def.id], `${def.id}: bisa diselesaikan, id selesai sesuai misi`);
    // Jawaban salah ditolak dan tidak maju.
    const y = ME.awalMesin(def);
    const l0 = ME.langkahAktif(y);
    const z = ME.langkahMesin(y, { t: "JAWAB", nilai: l0.opsi.find((o) => o !== l0.benar) });
    cek(z.ke === 0 && z.ditolak === 1 && z.pesan === l0.petunjuk, `${def.id}: jawaban salah ditolak dengan petunjuk`);
  }
  const angka = (o) => Number(o.split(" ")[0]);
  const daftar = (t) => `${t[0]}, ${t[1]}, dan ${t[2]}`;
  const kasusData = [
    ["atap", [5, 6, 7], [50, 60], [6, 6, 9], [8, 8, 8]],
    ["gapura", [5, 4, 12], [90, 35], [4, 5, 7], [7, 7, 4]],
    ["pagar", [3, 4, 7], [30, 40], [9, 9, 9], [4, 5, 7]],
  ];
  sama(MS.KASUS_SEGITIGA.map((k) => [k.id, k.syarat, k.sudut, k.sisi, k.hier]), kasusData, "Mesin: data tiga kasus sesuai rancangan");
  for (const [i, [id, syarat, [p, q], sisi, hier]] of kasusData.entries()) {
    const c = MS.MESIN_SEGITIGA.kasus[i];
    const [st, su, ss, hi] = c.langkah;
    // Syarat: banyak pasangan lolos, dihitung mandiri.
    const lolos = lolosMandiri(syarat);
    cek(st.benar === `${lolos} pasangan` && st.tanya.includes(daftar(syarat)) && st.opsi.every((o) => o === st.benar || angka(o) !== lolos) && st.opsi.every((o) => angka(o) >= 0 && angka(o) <= 3), `Mesin ${id}: syarat ${lolos} pasangan lolos (Heron dan sisi terurut)`);
    cek((lolos === 3) === adaSegitiga(syarat), `Mesin ${id}: tiga lolos hanya bila segitiga ada (Heron)`);
    cek(MS.lolosSyarat(syarat) === lolos, `Mesin ${id}: lolosSyarat sama dengan hitungan mandiri`);
    // Sudut: sudut ketiga dan jenis.
    const r = 180 - p - q;
    const jenisSudut = (a, b, cc) => {
      const m = Math.max(a, b, cc);
      const k = Math.round(Math.cos((m * Math.PI) / 180) * 1e6) / 1e6;
      return k === 0 ? "siku-siku" : k > 0 ? "lancip" : "tumpul";
    };
    const kunciSudut = `${r}°, segitiga ${jenisSudut(p, q, r)}`;
    cek(su.benar === kunciSudut && su.tanya.includes(`${p}°`) && su.tanya.includes(`${q}°`), `Mesin ${id}: sudut ketiga ${r} dan jenis ${jenisSudut(p, q, r)}`);
    sama([...su.opsi].sort(), [kunciSudut, `${p + q}°, segitiga ${jenisSudut(p, q, p + q)}`, `${180 - p}°, segitiga ${jenisSudut(p, q, 180 - p)}`].sort(), `Mesin ${id}: pengecoh sudut adalah menjumlahkan dan lupa mengurangi`);
    // Sisi.
    const kunciSisi = NAMA_SISI[jenisSisiMandiri(sisi)];
    cek(ss.benar === kunciSisi && ss.tanya.includes(daftar(sisi)), `Mesin ${id}: sisi ${kunciSisi}`);
    sama([...ss.opsi].sort(), ["sama kaki", "sama sisi", "sembarang"], `Mesin ${id}: pilihan sisi tiga jenis`);
    // Hierarki.
    const jh = jenisSisiMandiri(hier);
    const kunciH = jh === "sama-sisi" ? "sama sisi, dan juga sama kaki" : jh === "sama-kaki" ? "sama kaki, belum tentu sama sisi" : "sembarang, bukan sama kaki";
    cek(hi.benar === kunciH && hi.tanya.includes(daftar(hier)), `Mesin ${id}: golongan ${kunciH}`);
    cek(adaSegitiga(hier) && adaSegitiga(sisi), `Mesin ${id}: sisi dan hierarki memenuhi syarat segitiga (Heron)`);
    cek(adaSegitiga([p, q, r].map(() => 1)) && r > 0, `Mesin ${id}: dua sudut menyisakan sudut ketiga positif`);
    cek(EJ.ejaK5B7(c.ringkas).includes(EJ.kataK5B7(r)), `Mesin ${id}: ringkas memuat sudut ketiga`);
  }
  sama(MS.KASUS_SEGITIGA.map((k) => jenisSisiMandiri(k.hier)), ["sama-sisi", "sama-kaki", "sembarang"], "Mesin: tiga kasus hierarki sama sisi, sama kaki, sembarang");
  sama(MS.KASUS_SEGITIGA.map((k) => jenisSisiMandiri(k.sisi)), ["sama-kaki", "sembarang", "sama-sisi"], "Mesin: tiga kasus sisi sama kaki, sembarang, sama sisi");
  sama(MS.KASUS_SEGITIGA.map((k) => lolosMandiri(k.syarat)), [3, 2, 2], "Mesin: pasangan lolos 3, 2, 2");
  sama(MS.KASUS_SEGITIGA.map((k) => jenisSudutMandiri(k.sudut[0], k.sudut[1])), ["lancip", "siku", "tumpul"], "Mesin: sudut lancip, siku-siku, tumpul");
}

/* ------------------------------ Skenario ------------------------------ */
{
  const S = SK.SKENARIO_K5B7A;
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
  sama(S.id.replace(/-k5b7$/, ""), K7.ID_SKENARIO_K5B7.A, "id skenario sesuai id misi");
  const adegan = (id) => S.adegan.find((a) => a.id === id);
  const syarat = adegan("syarat");
  const bb = syarat.opsi.find((o) => o.benar);
  cek(/5 \+ 4 = 9/.test(bb.teks) && 5 + 4 === 9 && 9 < 12 && !adaSegitiga([5, 4, 12]) && /5, 4, dan 12/.test(syarat.cerita) && /^tidak bisa/.test(bb.teks), "syarat: sedotan 5, 4, 12 tidak bisa karena 5 + 4 = 9 kurang dari 12 (Heron negatif)");
  cek(syarat.opsi.filter((o) => !o.benar).every((o) => /^bisa/.test(o.teks)), "syarat: pengecoh menyatakan bisa");
  const jumlah = adegan("jumlah");
  cek(jumlah.soal[0].jawaban === "180" && jumlah.soal[0].opsi.includes("90") && jumlah.soal[0].opsi.includes("360"), "jumlah: tiga sudut 180, pengecoh 90 dan 360");
  cek(jumlah.soal[1].jawaban === String(180 - 50 - 60) && jumlah.soal[1].teks.includes("50°") && jumlah.soal[1].teks.includes("60°") && jumlah.soal[1].opsi.includes("110") && jumlah.soal[1].opsi.includes("10") && jumlah.sukses.includes("70°"), "jumlah: sudut ketiga 70 (180 - 50 - 60), pengecoh 110 dan 10");
  const lipat = adegan("lipat");
  cek(lipat.jumlah === simetriMandiri([6, 6, 6]) && lipat.jumlah === 3 && lipat.sukses.includes("3 simetri lipat") && lipat.jumlah <= 12, "lipat: sama sisi 3 simetri lipat (permutasi sisi)");
  const kaki = adegan("kaki");
  cek(kaki.target === simetriMandiri([7, 7, 4]) && kaki.target === 1 && kaki.target <= kaki.maks && kaki.maks <= 20, "kaki: sama kaki 1 simetri lipat (permutasi sisi)");
  const hier = adegan("hierarki");
  const hb = hier.opsi.find((o) => o.benar);
  cek(/^Nisa benar/.test(hb.teks) && hb.teks.includes("juga sama kaki") && hier.opsi.filter((o) => !o.benar).every((o) => !/juga sama kaki/.test(o.teks)) && A.hierarki("sama-sisi").jawab === "ya", "hierarki: sama sisi juga sama kaki, pengecoh salah");
  const posisi = S.adegan.filter((a) => a.jenis === "pilih").map((a) => a.opsi.findIndex((o) => o.benar));
  cek(new Set(posisi).size === posisi.length, `letak jawaban pilih bervariasi (${posisi.join("")})`);
  const posisiSoal = adegan("jumlah").soal.map((q) => q.opsi.indexOf(q.jawaban));
  cek(new Set(posisiSoal).size === posisiSoal.length, `letak jawaban soal bervariasi (${posisiSoal.join("")})`);
}

/* ------------------------------ Misi ------------------------------ */
{
  const huruf = ["A", "B"];
  sama(Object.keys(TK.MISI_K5B7), huruf, "teks misi untuk A dan B");
  sama(Object.keys(TK.NAMA_SIM_K5B7), huruf, "nama simulasi untuk A dan B");
  cek(TK.hurufK5B7("Z") === "A" && TK.hurufK5B7("A") === "A" && TK.hurufK5B7("B") === "B", "huruf tak dikenal jatuh ke A, B dikenal");
  cek(TK.misiAwalK5Bab7("A").startsWith("Simulasi 1. Misi: ") && tanpaAngka(TK.misiAwalK5Bab7("A")), "misi awal dan dapat dieja");
  for (const h of huruf) {
    const daftar = K7.daftarMisiK5Bab7(h);
    cek(daftar.filter((m) => m.wajib).length === 7 && daftar.filter((m) => !m.wajib).length === 3, `${h}: tujuh misi wajib dan tiga tantangan bebas`);
    cek(new Set(daftar.map((m) => m.id)).size === 10 && daftar.every((m) => m.id.startsWith(`${h.toLowerCase()}-`)), `${h}: id misi unik berawalan huruf`);
    const kosong = [{ alat: "segitiga", pernah: [] }, { alat: "segiempat", pernah: [] }, sel("tidak-ada"), A.keadaanSegitigaK5B7A(A.awalSegitigaK5B7A()), B.keadaanSegiempatK5B7B(B.awalSegiempatK5B7B())];
    cek(kosong.every((k) => M0.misiBaru(daftar, k, new Set()).length === 0), `${h}: keadaan awal alat tidak memenuhi misi mana pun`);
    cek(daftar.every((m) => m.teks.length > 20 && tanpaAngka(m.teks)), `${h}: teks misi jelas dan dapat dieja`);
    const baru = (k) => M0.misiBaru(daftar, k, new Set());
    cek(baru(sel(K7.ID_MESIN_K5B7[h])).join() === `${h.toLowerCase()}-mesin` && baru(sel(K7.ID_SKENARIO_K5B7[h])).join() === `${h.toLowerCase()}-skenario`, `${h}: id mesin dan skenario memenuhi misinya`);
  }
  cek(M0.misiBaru(K7.MISI_A, { alat: "lain", pernah: ["sedotan:0", "sedotan:1", "sedotan:2", "sudut:2", "sudut:3", "sisi:1", "hier:1"] }, new Set()).length === 0, "A: riwayat alat lain tidak memenuhi misi A");

  const capai = (aksi) => M0.misiBaru(K7.MISI_A, A.keadaanSegitigaK5B7A(jalan(A.awalSegitigaK5B7A(), L, aksi)), new Set());
  const tiga = [{ t: "S_UJI", k: 0 }, { t: "S_UJI", k: 1 }, { t: "S_UJI", k: 2 }];
  const sedotan = (i, jawab = adaSegitiga(A.DATA_SEDOTAN[i].sisi) ? "bisa" : "tidak", uji = true) => [{ t: "S_DATA", i }, ...(uji ? tiga : []), { t: "S_JAWAB", jawab }];
  cek(capai(sedotan(0)).join() === "a-bisa" && capai(sedotan(1)).join() === "a-gagal" && capai(sedotan(2)).join() === "a-lurus", "A: sedotan 5-6-7, 5-4-12, dan 3-4-7 memenuhi misinya masing-masing");
  cek(capai(sedotan(0, "tidak")).length === 0 && capai(sedotan(1, "bisa")).length === 0 && capai(sedotan(2, "bisa")).length === 0, "A: jawaban terbalik tidak memenuhi");
  cek(capai(sedotan(0, "bisa", false)).length === 0 && capai(sedotan(1, "tidak", false)).length === 0, "A: menjawab tanpa menguji tidak memenuhi");
  cek(capai([0, 1, 2, 3, 4, 5].flatMap((i) => sedotan(i))).join() === "a-bisa,a-gagal,a-lurus,a-sedotan-semua", "A: keenam sedotan memenuhi tiga misi dan tantangan semua");
  cek(capai([0, 1, 2, 3, 4].flatMap((i) => sedotan(i))).join() === "a-bisa,a-gagal,a-lurus", "A: lima sedotan belum memenuhi tantangan semua");

  const sudut = (i, jawab = jenisSudutMandiri(A.DATA_SUDUT[i].p, A.DATA_SUDUT[i].q) ?? "bukan", hitung = true) => [{ t: "U_DATA", i }, ...(hitung ? [{ t: "U_HITUNG" }] : []), { t: "U_JAWAB", jawab }];
  cek(capai([...sudut(2), ...sudut(3)]).join() === "a-sudut", "A: potongan ketiga tumpul dan keempat bukan segitiga memenuhi");
  cek(capai(sudut(2)).length === 0 && capai(sudut(3)).length === 0, "A: hanya salah satu dari dua potongan tidak memenuhi");
  cek(capai([...sudut(2), ...sudut(3, "siku")]).length === 0 && capai([...sudut(2, "lancip"), ...sudut(3)]).length === 0 && capai([...sudut(2), ...sudut(3, "bukan", false)]).length === 0, "A: jawaban salah atau tanpa menghitung tidak memenuhi");
  cek(capai([0, 1, 2, 3, 4, 5].flatMap((i) => sudut(i))).join() === "a-sudut,a-sudut-semua", "A: keenam potongan memenuhi misi dan tantangan semua");

  const sisi = (i, hier = true, jawabJenis = jenisSisiMandiri(A.DATA_SISI[i].sisi), jawabHier = jenisSisiMandiri(A.DATA_SISI[i].sisi) === "sama-sisi" ? "ya" : "tidak") => [
    { t: "I_DATA", i },
    { t: "I_IMPIT", k: 0 },
    { t: "I_IMPIT", k: 1 },
    { t: "I_IMPIT", k: 2 },
    { t: "I_JAWAB", jawab: jawabJenis },
    ...(hier ? [{ t: "I_HIER", jawab: jawabHier }] : []),
  ];
  cek(capai(sisi(1)).join() === "a-sama-sisi", "A: hiasan 6-6-6 jenis dan hierarki memenuhi");
  cek(capai(sisi(1, false)).length === 0 && capai(sisi(1, true, "sama-kaki")).length === 0 && capai(sisi(1, true, "sama-sisi", "tidak")).length === 0, "A: tanpa hierarki, jenis salah, atau hierarki salah tidak memenuhi");
  cek(capai(sisi(4)).length === 0 && capai(sisi(0)).length === 0, "A: hiasan lain tidak memenuhi misi sama sisi");
  cek(capai([0, 1, 2, 3, 4, 5].flatMap((i) => sisi(i))).join() === "a-sama-sisi,a-hier-semua", "A: keenam hiasan memenuhi misi dan tantangan hierarki");
  cek(capai([0, 1, 2, 3, 4].flatMap((i) => sisi(i))).join() === "a-sama-sisi", "A: lima hiasan belum memenuhi tantangan hierarki");
  cek(capai([...sedotan(0), ...sudut(0), ...sisi(2)]).join() === "a-bisa", "A: riwayat tiga tampilan terpisah, hanya misi yang tepat terpenuhi");

  // Gerbang.
  for (const h of huruf) {
    const daftar = M0.tampilMisi(K7.daftarMisiK5Bab7(h));
    const wajibIds = daftar.filter((m) => m.wajib).map((m) => m.id);
    cek(!M0.wajibSelesai(daftar, new Set(wajibIds.slice(0, 6))), `${h}: enam dari tujuh wajib belum membuka gerbang`);
    cek(M0.wajibSelesai(daftar, new Set(wajibIds)), `${h}: tujuh wajib membuka gerbang`);
    cek(M0.bolehLanjut({ adaMisi: true, wajibSelesai: false, dilewati: true, disentuh: true }) && !M0.bolehLanjut({ adaMisi: true, wajibSelesai: false, dilewati: true, disentuh: false }), "lewati hanya setelah disentuh");
  }
}

/* ------------------------------ Konsep tidak bocor ke Sub-Bab A ------------------------------ */
{
  const baca = (nama, ekstensi) => readFileSync(new URL(`../src/components/modul/${nama}.${ekstensi}`, import.meta.url), "utf8");
  const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas5-bab7-ringkas.json", import.meta.url), "utf8"));
  const tanpaKomentar = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
  const teksDari = (o) => {
    const hasil = [];
    JSON.stringify(o, (k, v) => {
      if (typeof v === "string") hasil.push(v);
      return v;
    });
    return hasil.join(" | ");
  };
  // Sub-Bab A hanya membahas segitiga. Segi empat dan istilahnya milik Sub-Bab B.
  const BOCOR_A = /(segi empat|segiempat|trapesium|jajar\s?genjang|persegi|belah ketupat|layang|diagonal|sejajar|\bvan hiele\b|\bkite\b|\brhombus\b|\bparallelogram\b|\btrapezoid\b|\brectangle\b|\bquadrilateral\b)/i;
  const catat = (teks, apa) => {
    const m = BOCOR_A.exec(teks);
    cek(!m, `A: ${apa} bebas konsep segi empat (${m ? m[0] : ""} di "${String(teks).slice(Math.max(0, (m?.index ?? 0) - 30), (m?.index ?? 0) + 40)}")`);
  };
  for (const t of [TK.MISI_K5B7.A, TK.NAMA_SIM_K5B7.A, ...K7.MISI_A.map((m) => m.teks)]) catat(t, "teks misi");
  for (const [nama, o] of [["mesin", MS.MESIN_SEGITIGA], ["skenario", SK.SKENARIO_K5B7A], ["peta dan infografis ringkas", ringkas.subBab.A]]) catat(teksDari(o), nama);
  for (const [f, e] of [["SimulasiLabSegitigaK5B7", "tsx"], ["model-segitiga-k5b7", "tsx"], ["lab-segitiga-k5b7a", "ts"]]) catat(tanpaKomentar(baca(f, e)), `${f} (tanpa komentar)`);
  for (const p of globalThis.__pesanA) catat(p, "pesan lab dari fuzz");
  for (const u of [A.ucapSedotanK5B7A(x0), A.ucapSudutK5B7A(x0), A.ucapSisiK5B7A(x0)]) catat(u, "ucapan lab");

  // Kunci tidak bocor ke klien, tanpa jaringan.
  for (const f of ["SimulasiLabSegitigaK5B7", "SimulasiK5Bab7", "model-segitiga-k5b7"]) {
    const s = baca(f, "tsx");
    cek(!/correct_index|explanation/.test(s), `${f}: tidak memuat correct_index atau explanation`);
    cek(!/fetch\(|XMLHttpRequest|api\/|openai|anthropic|gemini/i.test(s), `${f}: tanpa jaringan atau model bahasa`);
  }
  for (const f of ["lab-segitiga-k5b7a", "mesin-data-k5b7", "skenario-k5b7", "misi-k5bab7", "misi-teks-k5b7", "eja-k5b7"]) {
    const s = baca(f, "ts");
    cek(!/fetch\(|XMLHttpRequest|from "react"|openai|anthropic|gemini|correct_index|explanation/i.test(s), `${f}: murni`);
    const impor = s.match(/^import .+$/gm) ?? [];
    cek(impor.every((l) => l.startsWith("import type")), `${f}: hanya mengimpor tipe`);
  }
  cek((baca("lab-segitiga-k5b7a", "ts").match(/^import /gm) ?? []).length === 0 && (baca("eja-k5b7", "ts").match(/^import /gm) ?? []).length === 0, "lab dan pengeja tanpa impor sama sekali");
  {
    const s = baca("SimulasiLabSegitigaK5B7", "tsx");
    cek(/useEffect\(\(\) => \{\s*onKeadaan\?\.\(keadaan\w+\(x\)\);\s*\}, \[onKeadaan, x\]\);/.test(s), "lab: lapor keadaan lewat useEffect");
    cek(/setLihat\(v\);\s*kirim\(\{ t: "PESAN_KOSONG" \}\);/.test(s), "lab: ganti tampilan mengosongkan pesan");
    const catatan = [...s.matchAll(/^\s*"([^"]+)",$/gm)].map((m) => m[1]);
    cek(catatan.length >= 3 && catatan.every(tanpaAngka), "lab: Coba ini dapat dieja");
    for (const lab of ["Uji a + b", "Uji a + c", "Uji b + c", "Pilih bisa jadi segitiga", "Pilih tidak bisa jadi segitiga", "Hitung sudut ketiga", "Pilih segitiga lancip", "Pilih segitiga siku-siku", "Pilih segitiga tumpul", "Pilih bukan segitiga", "Pilih sama kaki", "Pilih sama sisi", "Pilih sembarang", "Jawab ya", "Jawab tidak"]) cek(s.includes(`aria-label="${lab}"`) || s.includes(`aria-label={\`${lab.split(" ")[0]} `), `lab: tombol berlabel ${lab}`);
    cek(/aria-label=\{`Impitkan /.test(s), "lab: tombol impit berlabel");
    cek(/sisiSudahJenis \? \(/.test(s), "lab: pertanyaan hierarki hanya tampil setelah jenis benar");
    const m = baca("model-segitiga-k5b7", "tsx");
    cek(/role="img"/.test(m) && (m.match(/aria-label=\{`Gambar /g) ?? []).length === 5, "model: gambar berlabel");
  }
  const pembungkus = baca("SimulasiK5Bab7", "tsx");
  cek(/eja=\{ejaK5B7\}/.test(pembungkus), "pembungkus: mesin dieja ejaK5B7");
  const coba = [...pembungkus.matchAll(/"([^"]*\?)"/g)].map((m) => m[1]);
  cek(coba.length >= 3 && coba.every(tanpaAngka), "Coba ini mesin dapat dieja");
  // Semua ucapan lab dieja menjadi kata.
  const ucapan = [];
  for (let i = 0; i < 6; i += 1) {
    ucapan.push(A.ucapSedotanK5B7A(L(x0, { t: "S_DATA", i })), A.ucapSudutK5B7A(L(x0, { t: "U_DATA", i })), A.ucapSisiK5B7A(L(x0, { t: "I_DATA", i })));
    ucapan.push(A.ucapSedotanK5B7A(jalan(x0, L, [{ t: "S_DATA", i }, { t: "S_UJI", k: 0 }, { t: "S_UJI", k: 1 }, { t: "S_UJI", k: 2 }])));
  }
  cek(ucapan.length === 24 && ucapan.every(tanpaAngka), `semua ${ucapan.length} ucapan lab dieja menjadi kata`);
}

/* ------------------------------ Data ringkas ------------------------------ */
{
  const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas5-bab7-ringkas.json", import.meta.url), "utf8"));
  cek(ringkas.chapter_id === "mtk-5-bab7" && ringkas.phase_code === "FASE_C" && ringkas.grade === 5, "ringkas: id bab, fase, kelas");
  const A0 = ringkas.subBab.A;
  const butir = (panel, id) => panel.butir.find((b) => b.id === id);
  const [p1, p2, p3] = A0.infografis.panel;
  cek(A0.infografis.panel.length === 3 && p1.butir.length === 3, "ringkas A: tiga panel");
  cek(butir(p1, "bisa").visual.isi === "5, 6, 7" && adaSegitiga([5, 6, 7]) && butir(p1, "tidak").visual.isi === "5, 4, 12" && !adaSegitiga([5, 4, 12]) && butir(p1, "lurus").visual.isi === "3 + 4 = 7" && 3 + 4 === 7 && !adaSegitiga([3, 4, 7]), "ringkas A: sedotan bisa, tidak, lurus dihitung mandiri (Heron)");
  cek(butir(p1, "tidak").suara.includes(`${EJ.kataK5B7(5)} ditambah ${EJ.kataK5B7(4)} hanya ${EJ.kataK5B7(9)}`) && butir(p1, "tidak").suara.includes(EJ.kataK5B7(12)), "ringkas A: suara sedotan gagal memuat 5 + 4 = 9 dan 12");
  const [siku, tumpul] = p2.sisi;
  cek(siku.visual.isi === "90°" && tumpul.visual.isi === "> 90°" && p2.kesimpulan === "Paling banyak satu sudut siku atau tumpul." && 90 + 90 === 180 && 91 + 91 > 180, "ringkas A: siku 90, tumpul lebih dari 90, dua siku sudah 180, dua tumpul lebih dari 180");
  cek(butir(p3, "kaki").visual.isi === "2 sisi sama" && butir(p3, "sisi").visual.isi === "3 sisi, 60°" && 180 / 3 === 60 && butir(p3, "sisi").suara.includes(EJ.kataK5B7(60)), "ringkas A: sama kaki dua sisi, sama sisi tiga sisi 60 (180 dibagi 3)");
  const tabel = butir(p3, "simetri").visual;
  sama(tabel.baris, [["sama kaki", simetriMandiri([7, 7, 4])], ["sama sisi", simetriMandiri([6, 6, 6])], ["sembarang", simetriMandiri([4, 5, 7])]], "ringkas A: tabel simetri lipat dihitung mandiri (permutasi sisi)");
  sama(A0.peta.cabang.map((c) => c.id), ["syarat", "sudut", "sisi", "hierarki"], "ringkas A: empat cabang");
  const kartu = (id) => A0.peta.kartu.find((k) => k.id === id);
  cek(A0.peta.kartu.length === 8 && A0.peta.kartu.every((k) => A0.peta.cabang.some((c) => c.id === k.cabang)), "ringkas A: delapan kartu, tiap kartu menunjuk cabang yang ada");
  cek(kartu("a-uji").teks.includes("5 + 6 lebih dari 7") && 5 + 6 > 7 && kartu("a-gagal").teks.includes("5 + 4 kurang dari 12") && 5 + 4 < 12, "ringkas A: kartu uji lolos dan gagal benar");
  cek(kartu("a-seratus").teks === "Tiga sudut = 180°" && kartu("a-sama-sisi").teks === "Sama sisi juga sama kaki" && kartu("a-dibalik").teks === "Sama kaki belum tentu sama sisi", "ringkas A: kartu jumlah dan hierarki");
  cek(A0.peta.kartu.every((k) => A0.peta.cabang.filter((c) => c.id === k.cabang).length === 1), "ringkas A: tiap kartu tepat satu cabang");
  const ide = [p1.ide, p2.ide, p3.ide];
  cek(ide.every((t) => t.split(/\s+/).length <= 8), "ringkas A: ide paling banyak delapan kata");
}


/* ====================================================================== */
/* Sub-Bab B: Lab Segi Empat                                               */
/* ====================================================================== */

/* ------------------------------ Hitungan MANDIRI geometri ------------------------------ */
// Koordinat enam bangun (ditulis ulang di sini, bukan diambil dari kode). Ciri dihitung dengan cara berbeda dari kode:
// sejajar dari arah yang dinormalkan dengan pembagi persekutuan terbesar, siku-siku dari teorema Pythagoras pada segitiga
// yang dibentuk tiga titik sudut, sisi sama dari panjang nyata (Math.hypot, dibulatkan), diagonal tegak lurus dari kemiringan.
const KOORD = {
  trapesium: [[0, 0], [8, 0], [6, 3], [1, 3]],
  jajargenjang: [[0, 0], [6, 0], [8, 3], [2, 3]],
  "persegi-panjang": [[0, 0], [6, 0], [6, 3], [0, 3]],
  "belah-ketupat": [[3, 0], [6, 2], [3, 4], [0, 2]],
  persegi: [[0, 0], [4, 0], [4, 4], [0, 4]],
  "layang-layang": [[0, 6], [3, 2], [0, 0], [-3, 2]],
};
const gcd = (a, b) => (b === 0 ? Math.abs(a) : gcd(b, a % b));
const arahNorm = (v) => {
  const g = gcd(v[0], v[1]) || 1;
  let [a, b] = [v[0] / g, v[1] / g];
  if (a < 0 || (a === 0 && b < 0)) [a, b] = [-a, -b];
  return `${a},${b}`;
};
const sisiVek = (q, i) => [q[(i + 1) % 4][0] - q[i][0], q[(i + 1) % 4][1] - q[i][1]];
const sejajarGeo = (q) => [[0, 2], [1, 3]].filter(([i, j]) => arahNorm(sisiVek(q, i)) === arahNorm(sisiVek(q, j))).length;
const sikuGeo = (q) => {
  let n = 0;
  for (let i = 0; i < 4; i += 1) {
    const a = q[(i + 3) % 4];
    const b = q[i];
    const c = q[(i + 1) % 4];
    const kuad = (u, v) => (u[0] - v[0]) ** 2 + (u[1] - v[1]) ** 2;
    if (kuad(a, c) === kuad(a, b) + kuad(b, c)) n += 1;
  }
  return n;
};
const panj = (q) => [0, 1, 2, 3].map((i) => Math.round(Math.hypot(...sisiVek(q, i)) * 1e6) / 1e6);
const sama4Geo = (q) => new Set(panj(q)).size === 1;
const berurutGeo = (q) => {
  const [a, b, c, d] = panj(q);
  return (a === b && c === d) || (b === c && d === a);
};
const diagGeo = (q) => {
  const u = [q[2][0] - q[0][0], q[2][1] - q[0][1]];
  const v = [q[3][0] - q[1][0], q[3][1] - q[1][1]];
  if (u[0] === 0 || v[0] === 0) return (u[0] === 0 && v[1] === 0) || (v[0] === 0 && u[1] === 0);
  return Math.abs((u[1] / u[0]) * (v[1] / v[0]) + 1) < 1e-9;
};
const ciriGeo = (q) => [sejajarGeo(q) >= 1, sejajarGeo(q) === 2, sikuGeo(q) === 4, sama4Geo(q), berurutGeo(q), diagGeo(q)];
// Matriks "termasuk" ditulis tangan dari buku (a termasuk b): jajargenjang termasuk trapesium; persegi panjang termasuk
// jajargenjang dan trapesium; belah ketupat termasuk jajargenjang, trapesium, dan layang-layang; persegi termasuk semuanya.
const NAMA_B = ["trapesium", "jajargenjang", "persegi-panjang", "belah-ketupat", "persegi", "layang-layang"];
const TERMASUK_BUKU = {
  trapesium: [],
  jajargenjang: ["trapesium"],
  "persegi-panjang": ["jajargenjang", "trapesium"],
  "belah-ketupat": ["jajargenjang", "trapesium", "layang-layang"],
  persegi: ["persegi-panjang", "belah-ketupat", "jajargenjang", "trapesium", "layang-layang"],
  "layang-layang": [],
};
const NAMA_TAMPIL = { trapesium: "trapesium", jajargenjang: "jajargenjang", "persegi-panjang": "persegi panjang", "belah-ketupat": "belah ketupat", persegi: "persegi", "layang-layang": "layang-layang" };
const LB = B.langkahSegiempatK5B7B;
const xb0 = B.awalSegiempatK5B7B();

/* ------------------------------ Data sama dengan buku ------------------------------ */
{
  sama(B.BANGUN, NAMA_B, "enam bangun berurutan");
  cek(B.CIRI.length === 6 && new Set(B.CIRI).size === 6, "enam ciri unik");
  for (const b of NAMA_B) {
    sama(B.CIRI_BANGUN[b], ciriGeo(KOORD[b]), `ciri ${b} sama dengan hitungan geometri mandiri`);
    cek(B.NAMA_BANGUN[b] === NAMA_TAMPIL[b], `nama tampil ${b}`);
  }
  sama(ciriGeo(KOORD.persegi), [true, true, true, true, true, true], "geometri: persegi punya keenam ciri");
  sama(ciriGeo(KOORD["layang-layang"]), [false, false, false, false, true, true], "geometri: layang-layang tanpa sejajar, dengan berurutan sama dan diagonal tegak lurus");
  sama(ciriGeo(KOORD["persegi-panjang"]), [true, true, true, false, false, false], "geometri: persegi panjang diagonal tidak tegak lurus");
  for (const a of NAMA_B)
    for (const b of NAMA_B) {
      const harap = a === b || TERMASUK_BUKU[a].includes(b);
      if (a === b) continue;
      cek(B.termasuk(a, b) === harap, `termasuk ${a} -> ${b}: ${harap} (matriks buku)`);
    }
  for (const b of NAMA_B) cek(B.namaTepat(B.CIRI_BANGUN[b]) === b, `nama paling tepat dari ciri ${b} adalah ${b}`);
  cek(B.namaTepat([false, false, false, false, false, false]) === null, "tanpa ciri tidak ada nama");
  cek(B.namaTepat([true, true, false, false, false, false]) === "jajargenjang" && B.namaTepat([true, false, false, false, false, false]) === "trapesium", "ciri jajargenjang dan trapesium");
  cek(B.namaTepat([true, true, true, true, true, true]) === "persegi", "semua ciri adalah persegi");
  // Ciri sintetis: empat sudut siku-siku tanpa dua pasang sisi sejajar tidak membentuk bangun mana pun.
  cek(B.namaTepat([false, false, true, false, false, false]) === null && B.namaTepat([true, false, true, false, false, false]) === "trapesium", "ciri sintetis: siku-siku tanpa dua pasang sejajar bukan persegi panjang");
  cek(B.atasSejajar({ titik: [[0, 0], [6, 0], [4, 4], [1, 3]] }) === false && B.atasSejajar({ titik: [[0, 0], [6, 0], [4, 3], [1, 4]] }) === false && B.atasSejajar({ titik: [[0, 0], [6, 0], [4, 3], [1, 3]] }) === true, "atasSejajar: tinggi tidak sama salah ke dua arah");
  cek(B.kiriSejajar({ titik: [[0, 0], [6, 0], [4, 3], [1, 3]] }) === false && B.kiriSejajar({ titik: [[0, 0], [6, 0], [8, 3], [2, 3]] }) === true && B.kiriSejajar({ titik: [[0, 0], [6, 0], [5, 3], [3, 3]] }) === false, "kiriSejajar: arah berbeda salah");
  cek(B.DATA_TANGGA.length === 10 && B.DATA_SEJAJAR.length === 6, "sepuluh pertanyaan tangga dan enam bangun Sejajar");
  sama(B.DATA_TANGGA.map((d) => B.termasuk(d.a, d.b)), [true, true, true, true, true, true, false, false, false, true], "tangga: kunci sepuluh pertanyaan (tujuh ya dan tiga tidak)");
  sama(B.DATA_TANGGA.map((d) => d.a === "jajargenjang" || TERMASUK_BUKU[d.a].includes(d.b)), B.DATA_TANGGA.map((d) => B.termasuk(d.a, d.b)), "tangga: kunci sama dengan matriks buku");
  // Sejajar: dihitung mandiri dari koordinat.
  const nama = ["trapesium biasa", "trapesium siku-siku", "trapesium sama kaki", "jajargenjang", "persegi panjang", "segi empat sembarang"];
  sama(B.DATA_SEJAJAR.map((d) => d.nama), nama, "Sejajar: enam nama bangun");
  const urut = (d) => [d.titik[0], d.titik[1], d.titik[2], d.titik[3]];
  sama(B.DATA_SEJAJAR.map((d) => sejajarGeo(urut(d))), [1, 1, 1, 2, 2, 0], "Sejajar: banyak pasang sejajar (arah dinormalkan)");
  sama(B.DATA_SEJAJAR.map((d) => B.banyakSejajar(d)), [1, 1, 1, 2, 2, 0], "Sejajar: banyakSejajar sama dengan hitungan mandiri");
  sama(B.DATA_SEJAJAR.map((d) => B.adalahTrapesium(d)), [true, true, true, true, true, false], "Sejajar: trapesium inklusif, jajargenjang dan persegi panjang termasuk");
  sama(B.DATA_SEJAJAR.map((d) => B.tinggiAtas(d)), [[3, 3], [3, 3], [3, 3], [3, 3], [3, 3], [4, 3]], "Sejajar: tinggi dari ujung sisi atas ke alas");
  cek(B.DATA_SEJAJAR.every((d) => d.titik[0][1] === 0 && d.titik[1][1] === 0), "Sejajar: alas datar di y nol");
  sama(B.DATA_SEJAJAR.map((d) => [B.atasSejajar(d), B.kiriSejajar(d)]), [[true, false], [true, false], [true, false], [true, true], [true, true], [false, false]], "Sejajar: uji atas dan kiri tiap bangun");
  sama(B.DATA_SEJAJAR.map((d) => B.arahKiri(d)), [[1, 3], [0, 3], [2, 3], [2, 3], [0, 3], [1, 4]], "Sejajar: arah sisi kiri");
  sama(B.DATA_SEJAJAR.map((d) => B.arahKanan(d)), [[-2, 3], [-3, 3], [-2, 3], [2, 3], [0, 3], [-2, 3]], "Sejajar: arah sisi kanan");
  cek(sikuGeo(urut(B.DATA_SEJAJAR[1])) === 2 && sikuGeo(urut(B.DATA_SEJAJAR[4])) === 4 && sikuGeo(urut(B.DATA_SEJAJAR[3])) === 0, "geometri: trapesium siku-siku 2 sudut, persegi panjang 4, jajargenjang 0");
  cek(panj(urut(B.DATA_SEJAJAR[2]))[1] === panj(urut(B.DATA_SEJAJAR[2]))[3], "geometri: trapesium sama kaki kakinya sama panjang");
}

/* ------------------------------ Lab B: Segi Empat ------------------------------ */
{
  cek(xb0.pernah.length === 0 && xb0.pesan === "" && xb0.ciri.periksa.length === 0 && !xb0.sejajar.atas && !xb0.sejajar.kiri, "awal B: kosong");
  sama(B.keadaanSegiempatK5B7B(xb0), { alat: "segiempat", pernah: [] }, "keadaan awal B");

  // Ciri.
  {
    const s = jalan(xb0, LB, [{ t: "C_NAMA", jawab: "persegi" }]);
    cek(s.pernah.length === 0 && s.pesan.includes("Periksa dulu"), "Ciri: memberi nama sebelum memeriksa keenam ciri ditolak");
    const lima = jalan(xb0, LB, [0, 1, 2, 3, 4].map((k) => ({ t: "C_PERIKSA", k })).concat([{ t: "C_NAMA", jawab: "trapesium" }]));
    cek(lima.pernah.length === 0, "Ciri: lima dari enam ciri belum cukup");
    const semua = [0, 1, 2, 3, 4, 5].map((k) => ({ t: "C_PERIKSA", k }));
    for (const [i, b] of NAMA_B.entries()) {
      const siap = jalan(xb0, LB, [{ t: "C_DATA", i }, ...semua]);
      for (const n of NAMA_B) {
        const t = LB(siap, { t: "C_NAMA", jawab: n });
        if (n === b) {
          sama(t.pernah, [B.idCiri(i)], `Ciri ${b}: nama benar dicatat`);
          cek(t.pesan.startsWith("✅") && t.pesan.includes(NAMA_TAMPIL[b]), `Ciri ${b}: pesan benar`);
          const juga = NAMA_B.filter((o) => o !== b && (TERMASUK_BUKU[b] ?? []).includes(o));
          cek(juga.every((o) => t.pesan.includes(NAMA_TAMPIL[o])) && (juga.length > 0 || t.pesan.includes("tidak termasuk golongan")), `Ciri ${b}: pesan menyebut golongan lain (${juga.length}) dari matriks buku`);
        } else cek(t.pernah.length === 0 && t.pesan.length > 10, `Ciri ${b}: nama ${n} salah tidak dicatat`);
      }
      cek(LB(siap, { t: "C_NAMA", jawab: "segi-lima" }) === siap, `Ciri ${b}: nama tak dikenal diabaikan`);
      for (let k = 0; k < 6; k += 1) {
        const t = LB(LB(xb0, { t: "C_DATA", i }), { t: "C_PERIKSA", k });
        const punya = ciriGeo(KOORD[b])[k];
        cek(t.pesan.includes(B.CIRI[k]) && (punya ? t.pesan.includes("ya, dimiliki") : t.pesan.includes("tidak dimiliki")) && t.pesan.includes(NAMA_TAMPIL[b]), `Ciri ${b} ciri ${k}: pesan periksa sesuai geometri (${punya})`);
      }
    }
    sama(jalan(xb0, LB, [{ t: "C_PERIKSA", k: 2 }, { t: "C_PERIKSA", k: 2 }]).ciri.periksa, [2], "Ciri: memeriksa ciri sama tidak menggandakan");
    cek(LB(xb0, { t: "C_DATA", i: 1.5 }) === xb0 && LB(xb0, { t: "C_PERIKSA", k: 1.5 }) === xb0 && LB(xb0, { t: "J_DATA", i: 1.5 }) === xb0 && LB(xb0, { t: "T_DATA", i: 1.5 }) === xb0, "indeks pecahan diabaikan di semua tampilan B");
    cek(LB(jalan(xb0, LB, semua), { t: "C_DATA", i: 1 }).ciri.periksa.length === 0, "Ciri: ganti bangun mengosongkan pemeriksaan");
    cek(LB(xb0, { t: "C_DATA", i: 6 }) === xb0 && LB(xb0, { t: "C_DATA", i: -1 }) === xb0 && LB(xb0, { t: "C_PERIKSA", k: 6 }) === xb0 && LB(xb0, { t: "C_PERIKSA", k: -1 }) === xb0, "Ciri: indeks di luar batas diabaikan");
  }

  // Sejajar.
  {
    const s = jalan(xb0, LB, [{ t: "J_JAWAB", jawab: "ya" }]);
    cek(s.pernah.length === 0 && s.pesan.includes("Uji dulu"), "Sejajar: memutuskan sebelum menguji ditolak");
    const sebagian = jalan(xb0, LB, [{ t: "J_ATAS" }, { t: "J_JAWAB", jawab: "ya" }]);
    cek(sebagian.pernah.length === 0, "Sejajar: hanya satu dari dua uji belum cukup");
    for (const [i, d] of B.DATA_SEJAJAR.entries()) {
      const trap = sejajarGeo(d.titik) >= 1;
      const siap = jalan(xb0, LB, [{ t: "J_DATA", i }, { t: "J_ATAS" }, { t: "J_KIRI" }]);
      const salah = LB(siap, { t: "J_JAWAB", jawab: trap ? "tidak" : "ya" });
      cek(salah.pernah.length === 0 && salah.pesan.length > 10, `Sejajar ${i}: jawaban terbalik tidak dicatat`);
      const benar = LB(siap, { t: "J_JAWAB", jawab: trap ? "ya" : "tidak" });
      sama(benar.pernah, [B.idSejajar(i)], `Sejajar ${i}: jawaban benar dicatat`);
      cek(benar.pesan.startsWith("✅") && benar.pesan.includes(`ada ${sejajarGeo(d.titik)} pasang sisi sejajar`) && (trap ? benar.pesan.includes("termasuk trapesium") : true), `Sejajar ${i}: pesan benar menyebut pasangan sejajar`);
      cek(LB(siap, { t: "J_JAWAB", jawab: "mungkin" }) === siap, `Sejajar ${i}: jawaban tak dikenal diabaikan`);
      const atas = LB(LB(xb0, { t: "J_DATA", i }), { t: "J_ATAS" });
      const [ta, tb] = i === 5 ? [4, 3] : [3, 3];
      cek(atas.pesan.includes(`${ta} dan ${tb}`) && (ta === tb ? atas.pesan.includes("sejajar dengan alas") && !atas.pesan.includes("tidak sejajar") : atas.pesan.includes("tidak sejajar")), `Sejajar ${i}: pesan uji atas sesuai tinggi ${ta} dan ${tb}`);
      const kiri = LB(LB(xb0, { t: "J_DATA", i }), { t: "J_KIRI" });
      const kiriSj = arahNorm(sisiVek(d.titik, 3)) === arahNorm(sisiVek(d.titik, 1));
      cek(kiriSj ? kiri.pesan.includes("Arahnya sama") : kiri.pesan.includes("Arahnya berbeda"), `Sejajar ${i}: pesan uji kiri sesuai arah (${kiriSj})`);
    }
    cek(LB(xb0, { t: "J_DATA", i: 6 }) === xb0 && LB(xb0, { t: "J_DATA", i: -1 }) === xb0, "Sejajar: indeks di luar batas diabaikan");
    cek(LB(jalan(xb0, LB, [{ t: "J_ATAS" }, { t: "J_KIRI" }]), { t: "J_DATA", i: 1 }).sejajar.atas === false, "Sejajar: ganti bangun mengosongkan uji");
    // Tambahan keterangan: siku-siku dan sama kaki.
    const sk = jalan(xb0, LB, [{ t: "J_DATA", i: 1 }, { t: "J_ATAS" }, { t: "J_KIRI" }, { t: "J_JAWAB", jawab: "ya" }]);
    cek(sk.pesan.includes("trapesium siku-siku"), "Sejajar: trapesium siku-siku disebut");
    const sm = jalan(xb0, LB, [{ t: "J_DATA", i: 2 }, { t: "J_ATAS" }, { t: "J_KIRI" }, { t: "J_JAWAB", jawab: "ya" }]);
    cek(sm.pesan.includes("trapesium sama kaki") && sm.pesan.includes("simetri lipat"), "Sejajar: trapesium sama kaki disebut");
  }

  // Tangga.
  {
    for (const [i, d] of B.DATA_TANGGA.entries()) {
      const ya = d.a !== d.b && TERMASUK_BUKU[d.a].includes(d.b);
      const siap = LB(xb0, { t: "T_DATA", i });
      const salah = LB(siap, { t: "T_JAWAB", jawab: ya ? "tidak" : "ya" });
      cek(salah.pernah.length === 0 && salah.pesan.length > 10, `Tangga ${i}: jawaban terbalik tidak dicatat`);
      const benar = LB(siap, { t: "T_JAWAB", jawab: ya ? "ya" : "tidak" });
      sama(benar.pernah, [B.idTangga(i)], `Tangga ${i}: jawaban benar dicatat`);
      cek(benar.pesan.startsWith("✅") && (ya ? benar.pesan.includes("termasuk") : benar.pesan.includes("tidak punya ciri") && benar.pesan.includes("bukan")), `Tangga ${i}: pesan benar (${ya ? "ya" : "tidak"})`);
      cek(benar.pesan.includes(NAMA_TAMPIL[d.a]) && benar.pesan.includes(NAMA_TAMPIL[d.b]), `Tangga ${i}: pesan menyebut kedua bangun`);
      cek(LB(siap, { t: "T_JAWAB", jawab: "mungkin" }) === siap, `Tangga ${i}: jawaban tak dikenal diabaikan`);
    }
    cek(LB(xb0, { t: "T_DATA", i: 10 }) === xb0 && LB(xb0, { t: "T_DATA", i: -1 }) === xb0, "Tangga: indeks di luar batas diabaikan");
    // Tidak berlaku sebaliknya: pasangan terbalik dari pertanyaan ya adalah tidak.
    cek(B.DATA_TANGGA.filter((d) => B.termasuk(d.a, d.b)).every((d) => !B.termasuk(d.b, d.a)), "Tangga: tiap hubungan ya tidak berlaku sebaliknya");
  }

  {
    const s = jalan(xb0, LB, [{ t: "C_PERIKSA", k: 0 }, { t: "J_ATAS" }, { t: "T_DATA", i: 2 }]);
    cek(LB(s, { t: "PESAN_KOSONG" }).pesan === "" && LB(s, { t: "PESAN_KOSONG" }).ciri.periksa.length === 1, "PESAN_KOSONG B hanya mengosongkan pesan");
    sama(LB(s, { t: "RESET" }), xb0, "RESET B kembali ke awal");
  }

  // Fuzz 20.000 aksi.
  {
    const acak = acakDari(7013);
    const pesanSemua = new Set();
    const riwayatSemua = new Set();
    let ok = true;
    let s = xb0;
    const jawabNama = [...NAMA_B, "segi-lima"];
    const jawabYa = ["ya", "tidak", "mungkin"];
    const buat = () => {
      const r = acak(14);
      if (r === 0) return { t: "C_DATA", i: acak(8) - 1 };
      if (r === 1 || r === 2) return { t: "C_PERIKSA", k: acak(8) - 1 };
      if (r === 3) return { t: "C_NAMA", jawab: jawabNama[acak(jawabNama.length)] };
      if (r === 4) return { t: "J_DATA", i: acak(8) - 1 };
      if (r === 5) return { t: "J_ATAS" };
      if (r === 6) return { t: "J_KIRI" };
      if (r === 7) return { t: "J_JAWAB", jawab: jawabYa[acak(3)] };
      if (r === 8) return { t: "T_DATA", i: acak(12) - 1 };
      if (r === 9 || r === 10) return { t: "T_JAWAB", jawab: jawabYa[acak(3)] };
      if (r === 11) return { t: "PESAN_KOSONG" };
      if (r === 12 && acak(40) === 0) return { t: "RESET" };
      return { t: "C_PERIKSA", k: acak(6) };
    };
    for (let n = 0; n < 20000; n += 1) {
      const a = buat();
      const sebelum = s;
      s = LB(s, a);
      pesanSemua.add(s.pesan);
      const batas =
        s.ciri.data >= 0 && s.ciri.data < 6 && s.sejajar.data >= 0 && s.sejajar.data < 6 && s.tangga.data >= 0 && s.tangga.data < 10 &&
        s.ciri.periksa.every((k) => k >= 0 && k < 6) && new Set(s.ciri.periksa).size === s.ciri.periksa.length && new Set(s.pernah).size === s.pernah.length;
      if (!batas) ok = false;
      if (a.t === "RESET") {
        if (s.pernah.length !== 0) ok = false;
        continue;
      }
      if (!sebelum.pernah.every((p) => s.pernah.includes(p))) ok = false;
      const baru = s.pernah.filter((p) => !sebelum.pernah.includes(p));
      if (baru.length > 1) ok = false;
      if (baru.length === 1) {
        const [alat, idx] = baru[0].split(":");
        const i = Number(idx);
        riwayatSemua.add(alat);
        if (alat === "ciri") {
          if (!(a.t === "C_NAMA" && sebelum.ciri.data === i && sebelum.ciri.periksa.length === 6 && a.jawab === NAMA_B[i])) ok = false;
        } else if (alat === "sejajar") {
          const trap = sejajarGeo(B.DATA_SEJAJAR[i].titik) >= 1;
          if (!(a.t === "J_JAWAB" && sebelum.sejajar.data === i && sebelum.sejajar.atas && sebelum.sejajar.kiri && a.jawab === (trap ? "ya" : "tidak"))) ok = false;
        } else if (alat === "tangga") {
          const d = B.DATA_TANGGA[i];
          const ya = TERMASUK_BUKU[d.a].includes(d.b);
          if (!(a.t === "T_JAWAB" && sebelum.tangga.data === i && a.jawab === (ya ? "ya" : "tidak"))) ok = false;
        } else ok = false;
      }
    }
    cek(ok, "fuzz 20.000 aksi Lab Segi Empat: batas terjaga, riwayat tidak dicabut dan hanya bila tercapai (orakel geometri mandiri)");
    cek(pesanSemua.size > 30 && [...pesanSemua].every(tanpaAngka), `fuzz Lab Segi Empat: semua ${pesanSemua.size} pesan dieja menjadi kata`);
    cek(riwayatSemua.size === 3, `fuzz Lab Segi Empat: riwayat terkumpul (${[...riwayatSemua].sort().join(" ")})`);
    globalThis.__pesanB = [...pesanSemua];
  }
}

/* ------------------------------ Mesin B ------------------------------ */
{
  const def = MS.MESIN_SEGIEMPAT;
  cek(def.id === "mesin-segiempat-k5b7" && def.selesaiId === K7.ID_MESIN_K5B7.B, "mesin B: id dan id selesai sesuai misi");
  const hadapGeo = (q) => {
    const [a, b, c, d] = panj(q);
    return a === c && b === d;
  };
  const sisiGeo = (q) => {
    const [a, b, c, d] = panj(q);
    const h = hadapGeo(q);
    const u = berurutGeo(q);
    if (h && !u) return "dua pasang sisi berhadapan sama panjang";
    if (u && !h) return "dua pasang sisi berurutan sama panjang";
    const pasanganSama = [[a, b], [b, c], [c, d], [d, a], [a, c], [b, d]].filter(([p, q2]) => p === q2).length;
    return pasanganSama === 1 ? "hanya sepasang sisi sama panjang" : null;
  };
  const SIKU_SIKU = [[0, 0], [7, 0], [4, 3], [0, 3]];
  const SAMA_KAKI = [[0, 0], [8, 0], [6, 3], [2, 3]];
  const data = [
    ["denah", KOORD.trapesium, KOORD["persegi-panjang"], SIKU_SIKU, "persegi-panjang", ["jajargenjang", "layang-layang", "belah-ketupat"], "jajargenjang"],
    ["jendela", KOORD.jajargenjang, KOORD["layang-layang"], KOORD["persegi-panjang"], "belah-ketupat", ["layang-layang", "persegi-panjang", "persegi"], "layang-layang"],
    ["gapura", KOORD["layang-layang"], SAMA_KAKI, KOORD.jajargenjang, "jajargenjang", ["trapesium", "persegi-panjang", "belah-ketupat"], "trapesium"],
  ];
  sama(MS.KASUS_SEGIEMPAT.map((k) => k.id), ["denah", "jendela", "gapura"], "Mesin B: tiga kasus");
  cek(def.stasiun.length === 4 && def.kasus.length === 3 && def.stasiun.map((s) => s.id).join() === "sejajar,sisi,sudut,hierarki", "Mesin B: empat stasiun, tiga kasus");
  const posisi = [];
  const angka = (o) => Number(o.split(" ")[0]);
  for (const [i, [id, qs, qsi, qsu, dari, pilihan, kunciH]] of data.entries()) {
    const kasus = def.kasus[i];
    const kd = MS.KASUS_SEGIEMPAT[i];
    cek(JSON.stringify(kd.sejajar.titik) === JSON.stringify(qs) && JSON.stringify(kd.sisi.titik) === JSON.stringify(qsi) && JSON.stringify(kd.sudut.titik) === JSON.stringify(qsu), `Mesin B ${id}: koordinat sama dengan rancangan`);
    cek(kasus.langkah.length === 4, `Mesin B ${id}: empat langkah`);
    kasus.langkah.forEach((l, j) => {
      cek(l.stasiun === def.stasiun[j].id, `Mesin B ${id}: langkah ${j + 1} di stasiun ${def.stasiun[j].id}`);
      cek(l.opsi.length === 3 && new Set(l.opsi).size === 3 && l.opsi.filter((o) => o === l.benar).length === 1, `Mesin B ${id}/${l.stasiun}: tiga pilihan unik, satu kunci`);
      cek([l.tanya, l.petunjuk, ...l.opsi].every(tanpaAngka), `Mesin B ${id}/${l.stasiun}: dapat dieja`);
      posisi.push(l.opsi.indexOf(l.benar));
    });
    cek(tanpaAngka(kasus.nama) && tanpaAngka(kasus.ringkas), `Mesin B ${id}: nama dan ringkas dapat dieja`);
    const [sj, si, su, hi] = kasus.langkah;
    const pasang = sejajarGeo(qs);
    cek(sj.benar === `${pasang} pasang` && sj.tanya.includes(kd.sejajar.sebut) && sj.opsi.map(angka).sort().join() === "0,1,2" && MS.pasangSejajar(qs) === pasang, `Mesin B ${id}: ${pasang} pasang sejajar (arah dinormalkan)`);
    const cs = sisiGeo(qsi);
    cek(cs !== null && si.benar === cs && si.tanya.includes(kd.sisi.sebut) && MS.ciriSisi(qsi) === cs, `Mesin B ${id}: ciri sisi ${cs} (panjang nyata)`);
    sama([...si.opsi].sort(), ["dua pasang sisi berhadapan sama panjang", "dua pasang sisi berurutan sama panjang", "hanya sepasang sisi sama panjang"].sort(), `Mesin B ${id}: pilihan sisi tiga ciri`);
    const sk = sikuGeo(qsu);
    cek(su.benar === `${sk} sudut` && su.tanya.includes(kd.sudut.sebut) && su.opsi.map(angka).sort().join() === "0,2,4" && MS.banyakSikuEmpat(qsu) === sk, `Mesin B ${id}: ${sk} sudut siku-siku (Pythagoras)`);
    cek(hi.benar === NAMA_TAMPIL[kunciH] && hi.tanya.toLowerCase().includes(NAMA_TAMPIL[dari]) && TERMASUK_BUKU[dari].includes(kunciH), `Mesin B ${id}: golongan ${kunciH} dari matriks buku`);
    const salahH = pilihan.filter((p) => p !== kunciH);
    cek(salahH.every((p) => !TERMASUK_BUKU[dari].includes(p)), `Mesin B ${id}: dua pengecoh hierarki bukan golongan ${NAMA_TAMPIL[dari]}`);
    sama([...hi.opsi].sort(), pilihan.map((p) => NAMA_TAMPIL[p]).sort(), `Mesin B ${id}: pilihan hierarki sama dengan rancangan`);
    cek(MS.golonganLain(NAMA_TAMPIL[dari], NAMA_TAMPIL[kunciH]) && salahH.every((p) => !MS.golonganLain(NAMA_TAMPIL[dari], NAMA_TAMPIL[p])), `Mesin B ${id}: golonganLain sama dengan matriks buku`);
    cek(EJ.ejaK5B7(kasus.ringkas).includes(EJ.kataK5B7(sk)), `Mesin B ${id}: ringkas memuat banyak sudut siku-siku`);
  }
  cek(new Set(posisi).size === 3, "Mesin B: letak kunci bervariasi");
  sama(data.map(([, qs]) => sejajarGeo(qs)), [1, 2, 0], "Mesin B: sejajar 1, 2, 0");
  sama(data.map(([, , , qsu]) => sikuGeo(qsu)), [2, 4, 0], "Mesin B: sudut siku 2, 4, 0");
  // Ciri enam bangun di mesin sama dengan geometri mandiri.
  for (const b of NAMA_B) sama(MS.ciriRep(NAMA_TAMPIL[b]), ciriGeo(KOORD[b]), `Mesin B: ciri ${b} dari koordinat sama dengan geometri mandiri`);
  let x = ME.awalMesin(def);
  let n = 0;
  while (!x.selesai && n < 100) {
    n += 1;
    const l = ME.langkahAktif(x);
    x = l ? ME.langkahMesin(x, { t: "JAWAB", nilai: l.benar }) : ME.langkahMesin(x, { t: "LANJUT" });
  }
  cek(x.selesai, "Mesin B: bisa diselesaikan");
  const y = ME.awalMesin(def);
  const l0 = ME.langkahAktif(y);
  const z = ME.langkahMesin(y, { t: "JAWAB", nilai: l0.opsi.find((o) => o !== l0.benar) });
  cek(z.ke === 0 && z.ditolak === 1 && z.pesan === l0.petunjuk, "Mesin B: jawaban salah ditolak dengan petunjuk");
  // Bangun sintetis: tiga sisi sama panjang (5, 5, 5) dan satu berbeda tidak punya ciri sisi apa pun; layang-layang dan trapesium sama kaki ya.
  cek(MS.ciriSisi([[0, 0], [5, 0], [8, 4], [4, 7]]) === null, "Mesin B: tiga sisi sama dan satu berbeda bukan hanya sepasang sisi sama");
  cek(MS.ciriSisi([[0, 0], [3, 0], [3, 3], [0, 3]]) === "dua pasang sisi berhadapan sama panjang" || MS.ciriSisi([[0, 0], [3, 0], [3, 3], [0, 3]]) === null, "Mesin B: persegi tidak diberi ciri tunggal yang menyesatkan");
  cek(MS.pasangSejajar([[0, 0], [6, 0], [4, 3], [1, 4]]) === 0 && MS.pasangSejajar([[0, 0], [6, 0], [8, 3], [2, 3]]) === 2, "Mesin B: pasangSejajar pada bangun sintetis");
}

/* ------------------------------ Skenario B ------------------------------ */
{
  const S = SK.SKENARIO_K5B7B;
  cek(S.adegan.length >= 5 && S.adegan.length <= 8, `${S.id}: 5 sampai 8 adegan (${S.adegan.length})`);
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
  sama(S.id.replace(/-k5b7$/, ""), K7.ID_SKENARIO_K5B7.B, "id skenario B sesuai id misi");
  const adegan = (id) => S.adegan.find((a) => a.id === id);
  const tr = adegan("trapesium").opsi.find((o) => o.benar);
  cek(/setidaknya sepasang/.test(tr.teks) && adegan("trapesium").opsi.filter((o) => !o.benar).every((o) => !/setidaknya sepasang/.test(o.teks)) && /jajargenjang juga termasuk trapesium/.test(tr.umpan), "trapesium: setidaknya sepasang sisi sejajar, pengecoh salah");
  const ciri = adegan("ciri");
  cek(ciri.soal[0].jawaban === String(sejajarGeo(KOORD.jajargenjang)) && ciri.soal[0].opsi.includes("1") && ciri.soal[0].opsi.includes("3"), "ciri: jajargenjang 2 pasang sejajar (geometri), pengecoh 1 dan 3");
  cek(ciri.soal[1].jawaban === String(sikuGeo(KOORD["persegi-panjang"])) && ciri.soal[1].opsi.includes("2") && ciri.soal[1].opsi.includes("3"), "ciri: persegi panjang 4 sudut siku-siku (Pythagoras), pengecoh 2 dan 3");
  const dg = adegan("diagonal");
  const persegi = KOORD.persegi;
  // Satu diagonal membagi persegi menjadi dua segitiga: titik 0, 1, 2 dan titik 0, 2, 3 (luas setengah-setengah).
  const luasSeg = (a, b, c) => Math.abs((b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1])) / 2;
  const tiga = [luasSeg(persegi[0], persegi[1], persegi[2]), luasSeg(persegi[0], persegi[2], persegi[3])];
  cek(dg.jumlah === tiga.length && tiga[0] === tiga[1] && dg.jumlah <= 12 && dg.sukses.includes("2 segitiga siku-siku sama kaki"), "diagonal: satu diagonal persegi menghasilkan 2 segitiga sama besar (geometri)");
  const sd = adegan("sudut");
  cek(sd.soal[0].jawaban === String((180 - 90) / 2) && sd.soal[0].opsi.includes("90") && sd.soal[0].opsi.includes("60") && sd.cerita.includes("90°") && sd.cerita.includes("180°"), "sudut: (180 - 90) dibagi 2 = 45, pengecoh 90 dan 60 (menyentuh konsep Sub-Bab A)");
  const sisi = adegan("sisi");
  cek(sisi.target === panj(KOORD["belah-ketupat"]).length && sama4Geo(KOORD["belah-ketupat"]) && sisi.target <= sisi.maks && sisi.maks <= 20 && sisi.sukses.includes("4 sisi sama panjang"), "sisi: belah ketupat 4 sisi sama panjang (panjang nyata)");
  const hier = adegan("hierarki");
  const hb = hier.opsi.find((o) => o.benar);
  cek(/^Asep benar/.test(hb.teks) && TERMASUK_BUKU.persegi.includes("persegi-panjang") && !TERMASUK_BUKU["persegi-panjang"].includes("persegi") && hier.opsi.filter((o) => !o.benar).every((o) => !/^Asep benar/.test(o.teks)), "hierarki: persegi juga persegi panjang, tidak dibalik (matriks buku)");
  const posisiPilih = S.adegan.filter((a) => a.jenis === "pilih").map((a) => a.opsi.findIndex((o) => o.benar));
  cek(new Set(posisiPilih).size === posisiPilih.length, `letak jawaban pilih bervariasi (${posisiPilih.join("")})`);
  const posisiSoal = S.adegan.filter((a) => a.jenis === "soal").flatMap((a) => a.soal.map((q) => q.opsi.indexOf(q.jawaban)));
  cek(new Set(posisiSoal).size >= 2, `letak jawaban soal bervariasi (${posisiSoal.join("")})`);
  const teks = semuaTeks.join(" | ");
  cek(/segitiga/.test(teks) && /jajargenjang/.test(teks) && /persegi panjang/.test(teks) && /trapesium/.test(teks), "pencapaian bab: skenario B menyentuh segitiga (A) dan segi empat (B)");
}

/* ------------------------------ Misi B ------------------------------ */
{
  cek(TK.misiAwalK5Bab7("B").startsWith("Simulasi 1. Misi: ") && tanpaAngka(TK.misiAwalK5Bab7("B")) && TK.hurufK5B7("B") === "B", "misi awal B dan dapat dieja");
  const capai = (aksi) => M0.misiBaru(K7.MISI_B, B.keadaanSegiempatK5B7B(jalan(B.awalSegiempatK5B7B(), LB, aksi)), new Set());
  const semua6 = [0, 1, 2, 3, 4, 5].map((k) => ({ t: "C_PERIKSA", k }));
  const ciri = (i, jawab = NAMA_B[i], periksa = true) => [{ t: "C_DATA", i }, ...(periksa ? semua6 : []), { t: "C_NAMA", jawab }];
  const sej = (i, jawab = sejajarGeo(B.DATA_SEJAJAR[i].titik) >= 1 ? "ya" : "tidak", uji = true) => [{ t: "J_DATA", i }, ...(uji ? [{ t: "J_ATAS" }, { t: "J_KIRI" }] : []), { t: "J_JAWAB", jawab }];
  const tg = (i, jawab) => [{ t: "T_DATA", i }, { t: "T_JAWAB", jawab: jawab ?? (TERMASUK_BUKU[B.DATA_TANGGA[i].a].includes(B.DATA_TANGGA[i].b) ? "ya" : "tidak") }];
  cek(M0.misiBaru(K7.MISI_B, { alat: "lain", pernah: ["ciri:4", "sejajar:0", "sejajar:3", "tangga:1", "tangga:2", "tangga:3", "tangga:4", "tangga:5"] }, new Set()).length === 0, "B: riwayat alat lain tidak memenuhi misi B");
  cek(capai(ciri(4)).join() === "b-ciri" && capai(ciri(0)).join() === "", "B: persegi diperiksa dan dinamai memenuhi; trapesium bukan misi wajib");
  cek(capai(ciri(4, "persegi-panjang")).length === 0 && capai(ciri(4, "persegi", false)).length === 0, "B: nama salah atau tanpa memeriksa keenam ciri tidak memenuhi");
  cek(capai(sej(0)).join() === "b-sejajar" && capai(sej(3)).join() === "b-jajargenjang", "B: trapesium biasa dan jajargenjang memenuhi misinya");
  cek(capai(sej(0, "tidak")).length === 0 && capai(sej(3, "tidak")).length === 0 && capai(sej(0, "ya", false)).length === 0 && capai(sej(3, "ya", false)).length === 0, "B: jawaban terbalik atau tanpa uji tidak memenuhi");
  cek(capai([...tg(1), ...tg(2)]).join() === "b-tangga" && capai(tg(1)).length === 0 && capai(tg(2)).length === 0, "B: kedua bangun naik ke jajargenjang, satu saja tidak cukup");
  cek(capai([...tg(1, "tidak"), ...tg(2)]).length === 0, "B: jawaban salah pada persegi panjang tidak memenuhi");
  cek(capai([...tg(3), ...tg(4), ...tg(5)]).join() === "b-persegi" && capai([...tg(3), ...tg(4)]).length === 0 && capai([...tg(3), ...tg(5)]).length === 0, "B: persegi (dua tangga) dan belah ketupat ke layang-layang memenuhi, kurang satu tidak");
  cek(capai([0, 1, 2, 3, 4, 5].flatMap((i) => sej(i))).join() === "b-sejajar,b-jajargenjang,b-sejajar-semua", "B: keenam bangun Sejajar memenuhi dua misi dan tantangan semua");
  cek(capai([0, 1, 2, 3, 4].flatMap((i) => sej(i))).join() === "b-sejajar,b-jajargenjang", "B: lima bangun belum memenuhi tantangan semua");
  cek(capai([0, 1, 2, 3, 4, 5].flatMap((i) => ciri(i))).join() === "b-ciri,b-ciri-semua", "B: keenam bangun Ciri memenuhi misi dan tantangan semua");
  cek(capai([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].flatMap((i) => tg(i))).join() === "b-tangga,b-persegi,b-tangga-semua", "B: kesepuluh pertanyaan Tangga memenuhi dua misi dan tantangan semua");
  cek(capai([0, 1, 2, 3, 4, 5, 6, 7, 8].flatMap((i) => tg(i))).join() === "b-tangga,b-persegi", "B: sembilan pertanyaan belum memenuhi tantangan semua");
  cek(capai([...ciri(4), ...sej(0), ...tg(6)]).join() === "b-ciri,b-sejajar", "B: tiga tampilan terpisah, hanya misi yang tepat terpenuhi");
  const daftar = M0.tampilMisi(K7.daftarMisiK5Bab7("B"));
  const wajibIds = daftar.filter((m) => m.wajib).map((m) => m.id);
  cek(wajibIds.length === 7 && !M0.wajibSelesai(daftar, new Set(wajibIds.slice(0, 6))) && M0.wajibSelesai(daftar, new Set(wajibIds)), "B: tujuh wajib membuka gerbang, enam belum");
}

/* ------------------------------ Konsep tidak bocor ke Sub-Bab B ------------------------------ */
{
  const baca = (nama, ekstensi) => readFileSync(new URL(`../src/components/modul/${nama}.${ekstensi}`, import.meta.url), "utf8");
  const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas5-bab7-ringkas.json", import.meta.url), "utf8"));
  const tanpaKomentar = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
  const teksDari = (o) => {
    const hasil = [];
    JSON.stringify(o, (k, v) => {
      if (typeof v === "string") hasil.push(v);
      return v;
    });
    return hasil.join(" | ");
  };
  // Sub-Bab B tidak memakai konsep di luar Materi: jumlah sudut segi empat (360), luas, keliling, dan rumus.
  const BOCOR_B = /(360|\bluas (daerah|bangun|persegi|segitiga|trapesium|segi)|menghitung luas|\bkeliling\b|\brumus\b|jumlah sudut segi empat|\bprotractor\b)/i;
  const catat = (teks, apa) => {
    const m = BOCOR_B.exec(teks);
    cek(!m, `B: ${apa} bebas konsep di luar Materi (${m ? m[0] : ""} di "${String(teks).slice(Math.max(0, (m?.index ?? 0) - 30), (m?.index ?? 0) + 40)}")`);
  };
  for (const t of [TK.MISI_K5B7.B, TK.NAMA_SIM_K5B7.B, ...K7.MISI_B.map((m) => m.teks)]) catat(t, "teks misi");
  for (const [nama, o] of [["mesin", MS.MESIN_SEGIEMPAT], ["skenario", SK.SKENARIO_K5B7B], ["peta dan infografis ringkas", ringkas.subBab.B]]) catat(teksDari(o), nama);
  for (const [f, e] of [["SimulasiLabSegiEmpatK5B7", "tsx"], ["model-segiempat-k5b7", "tsx"], ["lab-segiempat-k5b7b", "ts"]]) catat(tanpaKomentar(baca(f, e)), `${f} (tanpa komentar)`);
  for (const p of globalThis.__pesanB) catat(p, "pesan lab dari fuzz");
  for (const u of [B.ucapCiriK5B7B(xb0), B.ucapSejajarK5B7B(xb0), B.ucapTanggaK5B7B(xb0)]) catat(u, "ucapan lab");
  // Lab B tidak memakai segitiga; segitiga hanya muncul di skenario sebagai sentuhan Sub-Bab A.
  for (const [f, e] of [["lab-segiempat-k5b7b", "ts"], ["SimulasiLabSegiEmpatK5B7", "tsx"]]) cek(!/segitiga/i.test(tanpaKomentar(baca(f, e))), `${f}: tanpa segitiga`);

  for (const f of ["SimulasiLabSegiEmpatK5B7", "model-segiempat-k5b7"]) {
    const s = baca(f, "tsx");
    cek(!/correct_index|explanation/.test(s), `${f}: tidak memuat correct_index atau explanation`);
    cek(!/fetch\(|XMLHttpRequest|api\/|openai|anthropic|gemini/i.test(s), `${f}: tanpa jaringan atau model bahasa`);
  }
  const lb = baca("lab-segiempat-k5b7b", "ts");
  cek(!/fetch\(|XMLHttpRequest|from "react"|openai|anthropic|gemini|correct_index|explanation/i.test(lb) && (lb.match(/^import /gm) ?? []).length === 0, "lab-segiempat-k5b7b: murni, tanpa impor");
  {
    const s = baca("SimulasiLabSegiEmpatK5B7", "tsx");
    cek(/useEffect\(\(\) => \{\s*onKeadaan\?\.\(keadaan\w+\(x\)\);\s*\}, \[onKeadaan, x\]\);/.test(s), "lab B: lapor keadaan lewat useEffect");
    cek(/setLihat\(v\);\s*kirim\(\{ t: "PESAN_KOSONG" \}\);/.test(s), "lab B: ganti tampilan mengosongkan pesan");
    const catatan = [...s.matchAll(/^\s*"([^"]+)",$/gm)].map((m) => m[1]);
    cek(catatan.length >= 3 && catatan.every(tanpaAngka), "lab B: Coba ini dapat dieja");
    for (const lab of ["Uji sisi atas dengan alas", "Uji sisi kiri dengan kanan", "Jawab trapesium", "Jawab bukan trapesium", "Jawab termasuk", "Jawab tidak termasuk"]) cek(s.includes(`aria-label="${lab}"`), `lab B: tombol berlabel ${lab}`);
    cek(/aria-label=\{`Periksa ciri /.test(s) && /aria-label=\{`Nama /.test(s) && /label=\{`Pilih /.test(s), "lab B: tombol ciri, nama, dan pilih bangun berlabel");
    const m = baca("model-segiempat-k5b7", "tsx");
    cek(/role="img"/.test(m) && (m.match(/aria-label=\{`Gambar /g) ?? []).length === 3, "model B: tiga gambar berlabel");
  }
  const pembungkus = baca("SimulasiK5Bab7", "tsx");
  cek(/B: \{ id: "segiempat", nama: "Lab Segi Empat" \}/.test(pembungkus) && /SKENARIO_K5B7B/.test(pembungkus) && /MESIN_SEGIEMPAT/.test(pembungkus), "pembungkus: Sub-Bab B memakai Lab Segi Empat, Mesin Segi Empat, dan skenario B");
  const coba = [...pembungkus.matchAll(/"([^"]*\?)"/g)].map((m) => m[1]);
  cek(coba.length >= 6 && coba.every(tanpaAngka), "Coba ini mesin A dan B dapat dieja");
  const ucapan = [];
  for (let i = 0; i < 6; i += 1) ucapan.push(B.ucapCiriK5B7B(LB(xb0, { t: "C_DATA", i })), B.ucapSejajarK5B7B(LB(xb0, { t: "J_DATA", i })));
  for (let i = 0; i < 10; i += 1) ucapan.push(B.ucapTanggaK5B7B(LB(xb0, { t: "T_DATA", i })));
  cek(ucapan.length === 22 && ucapan.every(tanpaAngka), `semua ${ucapan.length} ucapan Lab Segi Empat dieja menjadi kata`);
}

/* ------------------------------ Data ringkas B ------------------------------ */
{
  const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas5-bab7-ringkas.json", import.meta.url), "utf8"));
  const B0 = ringkas.subBab.B;
  const butir = (panel, id) => panel.butir.find((b) => b.id === id);
  const [p1, p2, p3] = B0.infografis.panel;
  cek(B0.infografis.panel.length === 3 && p1.butir.length === 3 && p3.butir.length === 3, "ringkas B: tiga panel");
  cek(butir(p1, "sejajar").visual.isi === "1 pasang atau lebih" && butir(p1, "jajar").visual.isi === "2 pasang" && sejajarGeo(KOORD.jajargenjang) === 2 && butir(p1, "jenis").visual.isi === "siku-siku, sama kaki", "ringkas B: trapesium inklusif, jajargenjang 2 pasang (geometri)");
  const [panjang, ketupat] = p2.sisi;
  cek(panjang.visual.isi === "4 siku-siku" && sikuGeo(KOORD["persegi-panjang"]) === 4 && ketupat.visual.isi === "4 sisi sama" && sama4Geo(KOORD["belah-ketupat"]) && sikuGeo(KOORD.persegi) === 4 && sama4Geo(KOORD.persegi), "ringkas B: persegi panjang 4 siku, belah ketupat 4 sisi sama, persegi punya keduanya (geometri)");
  sama(butir(p3, "tabel").visual.baris, [["trapesium biasa", sejajarGeo(KOORD.trapesium)], ["jajargenjang", sejajarGeo(KOORD.jajargenjang)], ["layang-layang", sejajarGeo(KOORD["layang-layang"])]], "ringkas B: tabel pasang sejajar dihitung mandiri");
  cek(TERMASUK_BUKU["persegi-panjang"].includes("jajargenjang") && butir(p3, "naik").visual.isi === "persegi panjang → jajargenjang", "ringkas B: persegi panjang naik ke jajargenjang (matriks buku)");
  sama(B0.peta.cabang.map((c) => c.id), ["trapesium", "jajar", "belah", "persegi"], "ringkas B: empat cabang");
  cek(B0.peta.kartu.length === 8 && B0.peta.kartu.every((k) => B0.peta.cabang.some((c) => c.id === k.cabang)), "ringkas B: delapan kartu, tiap kartu menunjuk cabang yang ada");
  cek([p1.ide, p2.ide, p3.ide].every((t) => t.split(/\s+/).length <= 8), "ringkas B: ide paling banyak delapan kata");
  cek(JSON.stringify(Object.keys(ringkas.subBab)) === '["A","B"]', "ringkas: tepat Sub-Bab A dan B");
}

/* ------------------------------ Pencapaian bab dan pendaftaran ------------------------------ */
{
  const baca = (nama, ekstensi) => readFileSync(new URL(`../src/components/modul/${nama}.${ekstensi}`, import.meta.url), "utf8");
  const registri = readFileSync(new URL("../src/components/modul/registri-simulasi.ts", import.meta.url), "utf8");
  cek(/import \{ misiAwalK5Bab7 \} from "@\/components\/modul\/misi-teks-k5b7";/.test(registri) && /import ringkasK5B7 from "@\/data\/kelas5-bab7-ringkas\.json";/.test(registri), "registri: impor misi awal dan data ringkas Bab 7");
  cek(/const SimulasiK5Bab7Materi = dynamic<SimulasiMateriProps>\(\(\) => import\("@\/components\/modul\/SimulasiK5Bab7"\), \{ ssr: false \}\);/.test(registri), "registri: simulasi Bab 7 dimuat malas, tanpa SSR");
  cek(/"mtk-5-bab7": SimulasiK5Bab7Materi,/.test(registri) && /"mtk-5-bab7": misiAwalK5Bab7,/.test(registri) && /"mtk-5-bab7": ringkasK5B7\.subBab as unknown as Record<string, RingkasSub>,/.test(registri), "registri: tiga peta (SIMULASI_MATERI, SIMULASI_MISI_AWAL, RINGKAS_BAB) memuat Bab 7");
  cek((registri.match(/"mtk-5-bab7"/g) ?? []).length === 3, "registri: mtk-5-bab7 tepat tiga kali");
  cek(!/import[^;]*SimulasiK5Bab7[^;]*from "@\/components\/modul\/SimulasiK5Bab7"/.test(registri.replace(/dynamic<[^;]*;/g, "")), "registri: komponen laboratorium tidak diimpor langsung");
  const peta = readFileSync(new URL("../naskah/igil-module-player-peta.md", import.meta.url), "utf8");
  cek(/Migrasi Kelas 5: Bab 7 sudah \(`SimulasiK5Bab7`, dua sub-bab A dan B/.test(peta), "naskah peta: Bab 7 tercatat");
  const bab = readFileSync(new URL("../src/components/modul/registri-bab-baru.ts", import.meta.url), "utf8");
  cek(/"mtk-5-bab7": \(\) => import\("\.\/paket-k5b7"\)/.test(bab), "registri bab baru: Materi Bab 7 sudah terdaftar (tidak diubah)");
  // Pencapaian bab: skenario B menyentuh A dan B, dan kedua sub-bab punya tujuh wajib dan tiga bebas.
  for (const h of ["A", "B"]) {
    const d = K7.daftarMisiK5Bab7(h);
    cek(d.filter((m) => m.wajib).length === 7 && d.filter((m) => !m.wajib).length === 3, `pencapaian bab ${h}: tujuh wajib dan tiga bebas`);
  }
  // Tidak ada berkas Materi yang berubah dan tidak ada rute pratinjau tersisa.
  cek(!/pratinjau/i.test(registri), "registri: tanpa rute pratinjau");
  // Emoji paling baru Emoji 12: tidak ada titik kode di atas U+1FA95 pada berkas simulasi Bab 7.
  for (const [f, e] of [["lab-segitiga-k5b7a", "ts"], ["lab-segiempat-k5b7b", "ts"], ["mesin-data-k5b7", "ts"], ["skenario-k5b7", "ts"], ["misi-k5bab7", "ts"], ["misi-teks-k5b7", "ts"], ["SimulasiLabSegitigaK5B7", "tsx"], ["SimulasiLabSegiEmpatK5B7", "tsx"], ["SimulasiK5Bab7", "tsx"], ["model-segitiga-k5b7", "tsx"], ["model-segiempat-k5b7", "tsx"]]) cek(![...baca(f, e)].some((c) => c.codePointAt(0) >= 0x1fa96), `${f}: emoji paling baru Emoji 12`);
  cek(![...readFileSync(new URL("../src/data/kelas5-bab7-ringkas.json", import.meta.url), "utf8")].some((c) => c.codePointAt(0) >= 0x1fa96), "ringkas Bab 7: emoji paling baru Emoji 12");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
