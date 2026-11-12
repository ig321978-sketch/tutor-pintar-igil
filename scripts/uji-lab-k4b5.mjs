// Uji Simulasi Kelas 4 Bab 5 (Bangun Datar): pengeja, Lab Ciri, mesin, skenario, misi, gerbang, data ringkas,
// dan konsep Sub-Bab B tidak bocor ke Sub-Bab A.
// Jalankan: node --no-warnings scripts/uji-lab-k4b5.mjs
import { readFileSync } from "node:fs";
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K5 from "../src/components/modul/misi-k4bab5.ts";
import * as TK from "../src/components/modul/misi-teks-k4b5.ts";
import * as A from "../src/components/modul/lab-ciri-k4b5a.ts";
import * as B from "../src/components/modul/lab-susun-k4b5b.ts";
import * as MS from "../src/components/modul/mesin-data-k4b5.ts";
import * as SK from "../src/components/modul/skenario-k4b5.ts";
import * as ME from "../src/components/modul/mesin-bertahap-k3b1.ts";
import * as EJ from "../src/components/modul/eja-k4b5.ts";
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
    // Bit tinggi: bit rendah LCG modulo 2^32 berperiode pendek.
    return (s >>> 8) % n;
  };
};
const jalan = (awal, langkah, aksi) => aksi.reduce((s, a) => langkah(s, a), awal);
const ulang = (n, a) => Array.from({ length: n }, () => a);
const tanpaAngka = (t) => !/\d/.test(EJ.ejaK4B5(t));
const tanpaAngkaK3 = (t) => !/\d/.test(ejaK3(t));
const EPS = 1e-9;

/* ------------------------------ Hitungan MANDIRI (pecahan desimal, cara berbeda) ------------------------------ */
// Kode memakai hasil kali titik dan silang bilangan bulat. Di sini sudut dihitung dengan arccos (derajat), panjang
// dengan Math.hypot, sejajar dengan kemiringan pecahan sederhana, dan perpotongan dengan parameter ruas.
const sudutDerajat = (a, o, b) => {
  const u = [a[0] - o[0], a[1] - o[1]];
  const v = [b[0] - o[0], b[1] - o[1]];
  const c = (u[0] * v[0] + u[1] * v[1]) / (Math.hypot(...u) * Math.hypot(...v));
  return (Math.acos(Math.max(-1, Math.min(1, c))) * 180) / Math.PI;
};
const fpb = (a, b) => (b === 0 ? Math.abs(a) : fpb(b, a % b));
const kemiringan = (a, b) => {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  if (dx === 0) return "tegak";
  const g = fpb(dy, dx) * Math.sign(dx);
  return `${dy / g}/${dx / g}`;
};
const luasSegitiga = (a, b, c) => Math.abs((b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1])) / 2;
const potong = (p, q, r, s) => {
  // Ruas p-q dan r-s bertemu? Parameter t, u pada [0, 1]; ruas sejajar diperiksa titik ujungnya.
  const d = (q[0] - p[0]) * (s[1] - r[1]) - (q[1] - p[1]) * (s[0] - r[0]);
  const diAntara = (a, b, c) => luasSegitiga(a, b, c) < EPS && Math.min(a[0], b[0]) - EPS <= c[0] && c[0] <= Math.max(a[0], b[0]) + EPS && Math.min(a[1], b[1]) - EPS <= c[1] && c[1] <= Math.max(a[1], b[1]) + EPS;
  if (Math.abs(d) < EPS) return diAntara(p, q, r) || diAntara(p, q, s) || diAntara(r, s, p) || diAntara(r, s, q);
  const t = ((r[0] - p[0]) * (s[1] - r[1]) - (r[1] - p[1]) * (s[0] - r[0])) / d;
  const u = ((r[0] - p[0]) * (q[1] - p[1]) - (r[1] - p[1]) * (q[0] - p[0])) / d;
  return t >= -EPS && t <= 1 + EPS && u >= -EPS && u <= 1 + EPS;
};
/** Nama bangun mandiri dari koordinat, atau alasan tidak sah. */
function namaMandiri(p) {
  const n = p.length;
  const ke = (i) => p[((i % n) + n) % n];
  for (let i = 0; i < n; i += 1) if (luasSegitiga(ke(i - 1), ke(i), ke(i + 1)) < EPS) return "segaris";
  for (let i = 0; i < n; i += 1) for (let j = i + 2; j < n; j += 1) if (!(i === 0 && j === n - 1) && potong(ke(i), ke(i + 1), ke(j), ke(j + 1))) return "silang";
  // Arah belok tiap titik (atan2): cembung bila semua belok searah.
  const belok = [];
  for (let i = 0; i < n; i += 1) {
    const a1 = Math.atan2(ke(i)[1] - ke(i - 1)[1], ke(i)[0] - ke(i - 1)[0]);
    const a2 = Math.atan2(ke(i + 1)[1] - ke(i)[1], ke(i + 1)[0] - ke(i)[0]);
    let d = a2 - a1;
    while (d > Math.PI) d -= 2 * Math.PI;
    while (d < -Math.PI) d += 2 * Math.PI;
    belok.push(Math.sign(d));
  }
  const cembung = belok.every((b) => b === belok[0]);
  const sudut = Array.from({ length: n }, (_, i) => sudutDerajat(ke(i - 1), ke(i), ke(i + 1)));
  const pjg = Array.from({ length: n }, (_, i) => Math.hypot(ke(i + 1)[0] - ke(i)[0], ke(i + 1)[1] - ke(i)[1]));
  const siku = sudut.filter((s) => Math.abs(s - 90) < 1e-6).length;
  if (n === 3) {
    const besar = Math.max(...sudut);
    return Math.abs(besar - 90) < 1e-6 ? "segitiga siku-siku" : besar > 90 ? "segitiga tumpul" : "segitiga lancip";
  }
  if (n === 4) {
    if (!cembung) return "segiempat tak beraturan";
    const sej = [0, 1].filter((i) => kemiringan(ke(i), ke(i + 1)) === kemiringan(ke(i + 2), ke(i + 3))).length;
    const semua = pjg.every((v) => Math.abs(v - pjg[0]) < 1e-9);
    if (sej === 2) return siku === 4 ? (semua ? "persegi" : "persegi panjang") : semua ? "belah ketupat" : "jajargenjang";
    if (sej === 1) return "trapesium";
    const kite = (Math.abs(pjg[0] - pjg[1]) < 1e-9 && Math.abs(pjg[2] - pjg[3]) < 1e-9) || (Math.abs(pjg[1] - pjg[2]) < 1e-9 && Math.abs(pjg[3] - pjg[0]) < 1e-9);
    return kite ? "layang-layang" : "segiempat tak beraturan";
  }
  return n === 5 ? "segilima tak beraturan" : "segienam tak beraturan";
}
const keTitik = (pts) => pts.map(([x, y]) => ({ x, y }));
const namaBagianSiku = (p) => p.some((t, i) => Math.abs(sudutDerajat(p[(i - 1 + p.length) % p.length], t, p[(i + 1) % p.length]) - 90) < 1e-6);
const indeks = ([x, y]) => y * A.UKURAN_PAPAN + x;
const paku = (pts) => pts.map((p) => ({ t: "P_PAKU", i: indeks(p) }));

/* ------------------------------ Pengeja ------------------------------ */
{
  sama(EJ.ejaK4B5("90°"), "sembilan puluh derajat", "eja derajat");
  sama(EJ.ejaK4B5("sisi 4 cm"), "sisi empat sentimeter", "eja cm");
  sama(EJ.ejaK4B5("4 + 3 = 7"), "empat ditambah tiga sama dengan tujuh", "eja tambah");
  sama(EJ.ejaK4B5("semua < 90°"), "semua kurang dari sembilan puluh derajat", "eja kurang dari");
  let ok = true;
  for (let n = 0; n <= 9999; n += 1) if (/\d/.test(EJ.kataBilK4B5(n))) ok = false;
  cek(ok, "kata bilangan sampai 9.999 tanpa angka");
}

/* ------------------------------ Lab A: Ciri ------------------------------ */
{
  const x0 = A.awalCiriK4B5A();
  cek(x0.pernah.length === 0 && x0.pesan === "" && x0.paku.length === 0 && x0.pilah.letak.every((v) => v === null) && x0.kenali.letak.every((v) => v === null), "awal Lab A: kosong, tanpa riwayat dan pesan");

  // Paku: SEMUA segitiga di papan 5 × 5 dibandingkan dengan hitungan mandiri.
  const semua = Array.from({ length: 25 }, (_, i) => [i % 5, Math.floor(i / 5)]);
  let okT = 0;
  let jumlahT = 0;
  const jenisT = new Set();
  for (let a = 0; a < 25; a += 1)
    for (let b = a + 1; b < 25; b += 1)
      for (let c = b + 1; c < 25; c += 1) {
        const pts = [semua[a], semua[b], semua[c]];
        const h = A.periksaKaret(keTitik(pts));
        const m = namaMandiri(pts);
        jumlahT += 1;
        const kode = h.sah ? h.bangun.nama : h.alasan;
        if (kode === m) okT += 1;
        if (h.sah) jenisT.add(h.bangun.nama);
        if (h.sah && h.bangun.ciriSisi === "sama sisi") okT = -1e9; // segitiga sama sisi mustahil di papan persegi
      }
  cek(okT === jumlahT, `Paku: ${jumlahT} segitiga sama dengan hitungan mandiri (${okT})`);
  sama([...jenisT].sort(), ["segitiga lancip", "segitiga siku-siku", "segitiga tumpul"], "Paku: tiga jenis segitiga dapat dibentuk");

  // Semua segiempat (tiap himpunan 4 paku dalam tiga urutan keliling).
  let okQ = 0;
  let jumlahQ = 0;
  const jenisQ = new Map();
  for (let a = 0; a < 25; a += 1)
    for (let b = a + 1; b < 25; b += 1)
      for (let c = b + 1; c < 25; c += 1)
        for (let d = c + 1; d < 25; d += 1)
          for (const urut of [[a, b, c, d], [a, b, d, c], [a, c, b, d]]) {
            const pts = urut.map((i) => semua[i]);
            const h = A.periksaKaret(keTitik(pts));
            const kode = h.sah ? h.bangun.nama : h.alasan;
            jumlahQ += 1;
            if (kode === namaMandiri(pts)) okQ += 1;
            jenisQ.set(kode, (jenisQ.get(kode) ?? 0) + 1);
          }
  cek(okQ === jumlahQ, `Paku: ${jumlahQ} urutan segiempat sama dengan hitungan mandiri (${okQ})`);
  for (const j of ["persegi", "persegi panjang", "jajargenjang", "belah ketupat", "trapesium", "layang-layang", "segiempat tak beraturan", "segaris", "silang"]) cek((jenisQ.get(j) ?? 0) > 0, `Paku: ${j} muncul di papan`);

  // Segilima dan segienam acak: sah atau tidak sama dengan hitungan mandiri; tidak pernah beraturan di papan persegi.
  const acakQ = acakDari(7);
  let okP = true;
  let sahP = 0;
  for (let k = 0; k < 20000; k += 1) {
    const n = 5 + acakQ(2);
    const pilih = new Set();
    while (pilih.size < n) pilih.add(acakQ(25));
    const pts = [...pilih].map((i) => semua[i]);
    const h = A.periksaKaret(keTitik(pts));
    const kode = h.sah ? h.bangun.nama : h.alasan;
    if (kode !== namaMandiri(pts)) okP = false;
    if (h.sah) {
      sahP += 1;
      if (h.bangun.beraturan) okP = false;
    }
  }
  cek(okP && sahP > 100, `Paku: segilima dan segienam acak sama dengan hitungan mandiri (${sahP} sah)`);

  // Jalur ketuk: menutup dengan mengetuk paku pertama, lepas paku terakhir, paku dipakai dua kali, batas enam paku.
  const persegi = [[0, 0], [2, 0], [2, 2], [0, 2]];
  const tutupLewatPertama = jalan(x0, A.langkahCiriK4B5A, [...paku(persegi), { t: "P_PAKU", i: 0 }]);
  cek(tutupLewatPertama.pernah.includes("paku:persegi") && tutupLewatPertama.pesan.startsWith("✅ Persegi"), "Paku: ketuk paku pertama menutup karet");
  cek(tutupLewatPertama.pesan.includes("4 sudut siku-siku") && tutupLewatPertama.pesan.includes("2 pasang sisi sejajar") && tutupLewatPertama.pesan.includes("semua sisi sama panjang"), "Paku: pesan persegi menyebut ciri yang dihitung");
  const lepas = jalan(x0, A.langkahCiriK4B5A, [...paku(persegi), { t: "P_PAKU", i: indeks([0, 2]) }]);
  cek(lepas.paku.length === 3, "Paku: ketuk paku terakhir melepasnya");
  const dua = jalan(x0, A.langkahCiriK4B5A, [...paku(persegi), { t: "P_PAKU", i: indeks([2, 0]) }]);
  cek(dua.paku.length === 4 && /sudah dipakai/.test(dua.pesan), "Paku: paku tengah tidak dipakai dua kali");
  const tujuh = jalan(x0, A.langkahCiriK4B5A, paku([[0, 0], [1, 0], [2, 1], [3, 0], [4, 1], [4, 4], [0, 4]]));
  cek(tujuh.paku.length === A.MAKS_PAKU && /Paling banyak/.test(tujuh.pesan), "Paku: paling banyak enam paku");
  const dua0 = jalan(x0, A.langkahCiriK4B5A, [...paku([[0, 0], [1, 1]]), { t: "P_CEK" }]);
  cek(dua0.pernah.length === 0 && /paling sedikit/.test(dua0.pesan), "Paku: dua paku belum bangun");
  const segaris = jalan(x0, A.langkahCiriK4B5A, [...paku([[0, 0], [2, 0], [4, 0]]), { t: "P_CEK" }]);
  cek(segaris.pernah.includes("segaris") && !segaris.pesan.startsWith("✅"), "Paku: tiga paku segaris ditolak dan dijelaskan");
  const silang = jalan(x0, A.langkahCiriK4B5A, [...paku([[0, 0], [2, 2], [2, 0], [0, 2]]), { t: "P_CEK" }]);
  cek(silang.pernah.includes("silang") && /bersilang/.test(silang.pesan), "Paku: karet bersilang ditolak");
  cek(A.langkahCiriK4B5A(x0, { t: "P_PAKU", i: 25 }) === x0 && A.langkahCiriK4B5A(x0, { t: "P_PAKU", i: -1 }) === x0, "Paku: paku di luar papan diabaikan");

  // Pilah: kelompok benar dihitung mandiri (arccos dari aturan kosinus; selisih sisi; penutupan bangun).
  const sudutMandiri = (s) => {
    const [a, b, c] = s;
    const sud = [
      (Math.acos((b * b + c * c - a * a) / (2 * b * c)) * 180) / Math.PI,
      (Math.acos((a * a + c * c - b * b) / (2 * a * c)) * 180) / Math.PI,
      (Math.acos((a * a + b * b - c * c) / (2 * a * b)) * 180) / Math.PI,
    ];
    const besar = Math.max(...sud);
    return Math.abs(besar - 90) < 1e-6 ? "siku-siku" : besar > 90 ? "tumpul" : "lancip";
  };
  const sisiMandiri = (s) => {
    let pasang = 0;
    for (let i = 0; i < 3; i += 1) for (let j = i + 1; j < 3; j += 1) if (s[i] === s[j]) pasang += 1;
    return pasang === 3 ? "sama sisi" : pasang === 1 ? "sama kaki" : "sembarang";
  };
  const segitigaSah = (s) => {
    const [a, b, c] = [...s].sort((p, q) => p - q);
    return a + b > c;
  };
  const tutupMandiri = (sisi, sudut) => {
    let x = 0;
    let y = 0;
    let h = 0;
    for (let i = 0; i < sisi.length; i += 1) {
      x += sisi[i] * Math.cos((h * Math.PI) / 180);
      y += sisi[i] * Math.sin((h * Math.PI) / 180);
      h += 180 - sudut[(i + 1) % sudut.length];
    }
    return Math.hypot(x, y) < 1e-9;
  };
  const beraturanMandiri = (b) => Math.max(...b.sisi) - Math.min(...b.sisi) === 0 && Math.max(...b.sudut) - Math.min(...b.sudut) === 0;
  for (const m of A.MODE_PILAH) {
    const daftar = A.PILAH[m];
    cek(daftar.length === 6 && new Set(daftar.map((b) => b.id)).size === 6, `Pilah ${m}: enam bangun unik`);
    const kunci = daftar.map((b) => (m === "sudut" ? sudutMandiri(b.sisi) : m === "sisi" ? sisiMandiri(b.sisi) : beraturanMandiri(b) ? "beraturan" : "tak beraturan"));
    sama(daftar.map((b) => A.kelompokBenar(m, b)), kunci, `Pilah ${m}: kelompok benar sama dengan hitungan mandiri`);
    cek(A.KELOMPOK[m].every((k) => kunci.includes(k)), `Pilah ${m}: semua kelompok terisi`);
    if (m !== "beraturan") cek(daftar.every((b) => b.sisi.length === 3 && segitigaSah(b.sisi)), `Pilah ${m}: semua segitiga sah`);
    else cek(daftar.every((b) => b.sudut.reduce((s, v) => s + v, 0) === (b.sisi.length - 2) * 180 && tutupMandiri(b.sisi, b.sudut)), "Pilah beraturan: jumlah sudut benar dan bangun tertutup");
    // Main: semua benar memenuhi; satu salah tidak.
    const xs = A.langkahCiriK4B5A(x0, { t: "S_MODE", m: A.MODE_PILAH.indexOf(m) });
    const taruh = (k) => daftar.flatMap((_, i) => [{ t: "S_PILIH", i }, { t: "S_KE", k: k[i] }]);
    const benar = jalan(xs, A.langkahCiriK4B5A, [...taruh(kunci), { t: "S_CEK" }]);
    cek(benar.pernah.includes(`pilah:${m}`) && benar.pesan.startsWith("✅"), `Pilah ${m}: semua tepat diterima`);
    const satuSalah = [...kunci];
    satuSalah[0] = A.KELOMPOK[m].find((k) => k !== kunci[0]);
    const salah = jalan(xs, A.langkahCiriK4B5A, [...taruh(satuSalah), { t: "S_CEK" }]);
    cek(!salah.pernah.includes(`pilah:${m}`) && /1 bangun/.test(salah.pesan), `Pilah ${m}: satu salah ditolak`);
    const kurang = jalan(xs, A.langkahCiriK4B5A, [...taruh(kunci).slice(0, -2), { t: "S_CEK" }]);
    cek(!kurang.pernah.includes(`pilah:${m}`) && /Masih 1 bangun/.test(kurang.pesan), `Pilah ${m}: satu belum dipilah ditolak`);
  }
  cek(A.langkahCiriK4B5A(x0, { t: "S_KE", k: "lancip" }).pesan.length > 0, "Pilah: kelompok tanpa memilih bangun dijelaskan");
  cek(A.langkahCiriK4B5A(x0, { t: "S_KE", k: "tidak-ada" }) === x0 && A.langkahCiriK4B5A(x0, { t: "S_MODE", m: 9 }) === x0, "Pilah: aksi di luar batas diabaikan");
  const gantiMode = jalan(x0, A.langkahCiriK4B5A, [{ t: "S_PILIH", i: 0 }, { t: "S_KE", k: "siku-siku" }, { t: "S_MODE", m: 1 }]);
  cek(gantiMode.pilah.letak.every((v) => v === null), "Pilah: ganti ciri mengosongkan pilahan");

  // Kenali: kelompok benar dihitung mandiri (jalur tertutup, semua lurus, banyak ruas).
  const kenaliMandiri = (g) => {
    const ujung = JSON.stringify(g.titik[0]) === JSON.stringify(g.titik.at(-1));
    const lurus = g.lengkung.filter((v) => !v).length;
    return ujung && lurus === g.lengkung.length && lurus >= 3 ? String(lurus) : "bukan";
  };
  const kunciK = A.KENALI.map(kenaliMandiri);
  sama(A.KENALI.map(A.kelompokKenali), kunciK, "Kenali: kelompok sama dengan hitungan mandiri");
  cek(A.KELOMPOK_KENALI.every((k) => kunciK.includes(k)), "Kenali: semua kelompok terisi");
  cek(A.KENALI.every((g) => g.lengkung.length === g.titik.length - 1), "Kenali: jenis ruas lengkap");
  const taruhK = (k) => A.KENALI.flatMap((_, i) => [{ t: "K_PILIH", i }, { t: "K_KE", k: k[i] }]);
  const kBenar = jalan(x0, A.langkahCiriK4B5A, [...taruhK(kunciK), { t: "K_CEK" }]);
  cek(kBenar.pernah.includes("kenali") && kBenar.pesan.startsWith("✅"), "Kenali: semua tepat diterima");
  const kSalah = [...kunciK];
  kSalah[1] = "4"; // lingkaran dikira segiempat
  cek(!jalan(x0, A.langkahCiriK4B5A, [...taruhK(kSalah), { t: "K_CEK" }]).pernah.includes("kenali"), "Kenali: lingkaran sebagai segiempat ditolak");
  const kTerbuka = [...kunciK];
  kTerbuka[3] = "3"; // garis terbuka dikira segitiga
  cek(!jalan(x0, A.langkahCiriK4B5A, [...taruhK(kTerbuka), { t: "K_CEK" }]).pernah.includes("kenali"), "Kenali: garis terbuka sebagai segitiga ditolak");

  // Fuzz.
  const acak = acakDari(53);
  let s = x0;
  let ok = true;
  const pesanSemua = new Set();
  for (let i = 0; i < 20000; i += 1) {
    const p = acak(14);
    const a =
      p <= 2 ? { t: "P_PAKU", i: acak(27) - 1 } :
      p === 3 ? { t: "P_HAPUS" } :
      p === 4 ? { t: "P_CEK" } :
      p === 5 ? (acak(6) === 0 ? { t: "P_BERSIH" } : { t: "PESAN_KOSONG" }) :
      p === 6 ? { t: "S_MODE", m: acak(4) } :
      p === 7 ? { t: "S_PILIH", i: acak(7) } :
      p === 8 ? { t: "S_KE", k: [...A.KELOMPOK[A.modeAktif(s)], "x"][acak(4)] } :
      p === 9 ? (acak(8) === 0 ? { t: "S_ULANG" } : { t: "S_CEK" }) :
      p === 10 ? { t: "K_PILIH", i: acak(8) } :
      p === 11 ? { t: "K_KE", k: [...A.KELOMPOK_KENALI, "x"][acak(6)] } :
      p === 12 ? (acak(8) === 0 ? { t: "K_ULANG" } : { t: "K_CEK" }) : { t: "P_PAKU", i: acak(25) };
    const t = A.langkahCiriK4B5A(s, a);
    if (!s.pernah.every((v) => t.pernah.includes(v))) ok = false;
    if (t.paku.length > A.MAKS_PAKU || new Set(t.paku).size !== t.paku.length || t.paku.some((v) => v < 0 || v >= 25)) ok = false;
    const m = A.modeAktif(t);
    if (!m || t.pilah.letak.length !== A.PILAH[m].length || t.pilah.letak.some((v) => v !== null && !A.KELOMPOK[m].includes(v))) ok = false;
    if (t.kenali.letak.length !== A.KENALI.length || t.kenali.letak.some((v) => v !== null && !A.KELOMPOK_KENALI.includes(v))) ok = false;
    for (const id of t.pernah) if (!/^(paku:[a-z-]+|segaris|silang|pilah:(sudut|sisi|beraturan)|kenali)$/.test(id)) ok = false;
    if (t.pesan) pesanSemua.add(t.pesan);
    s = t;
  }
  cek(ok, "fuzz 20.000 aksi Lab Ciri: batas terjaga, riwayat tidak dicabut");
  cek(pesanSemua.size > 10 && [...pesanSemua].every(tanpaAngka), `fuzz Lab Ciri: semua ${pesanSemua.size} pesan dieja menjadi kata`);
  globalThis.__pesanA = [...pesanSemua];
}


/* ------------------------------ Lab B: Susun ------------------------------ */
{
  const x0 = B.awalSusunK4B5B();
  cek(x0.pernah.length === 0 && x0.pesan === "" && x0.keping.length === 0 && x0.potong.length === 0 && x0.tangram.length === 0, "awal Lab B: kosong, tanpa riwayat dan pesan");

  // Mandiri: perempat bersambung lewat sisi (BFS), luas dari banyak perempat, selubung cembung (Andrew) dengan desimal.
  const kunciQ = (q) => q.join(",");
  const tetanggaQ = ([r, c, q]) => [[r, c, (q + 1) % 4], [r, c, (q + 3) % 4], q === 0 ? [r - 1, c, 2] : q === 1 ? [r, c + 1, 3] : q === 2 ? [r + 1, c, 0] : [r, c - 1, 1]];
  const bersambung = (qs) => {
    const ada = new Set(qs.map(kunciQ));
    const lihat = new Set([kunciQ(qs[0])]);
    const antre = [qs[0]];
    while (antre.length) for (const t of tetanggaQ(antre.pop())) if (ada.has(kunciQ(t)) && !lihat.has(kunciQ(t))) { lihat.add(kunciQ(t)); antre.push(t); }
    return lihat.size === qs.length;
  };
  const sudutQ = ([r, c, q]) => {
    const p = [[c, r], [c + 1, r], [c + 1, r + 1], [c, r + 1]];
    return [p[q], p[(q + 1) % 4], [c + 0.5, r + 0.5]];
  };
  const selubung = (pts) => {
    const u = [...new Map(pts.map((p) => [p.join(), p])).values()].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const x = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    const bawah = [];
    for (const p of u) { while (bawah.length >= 2 && x(bawah.at(-2), bawah.at(-1), p) <= 1e-12) bawah.pop(); bawah.push(p); }
    const atas = [];
    for (const p of [...u].reverse()) { while (atas.length >= 2 && x(atas.at(-2), atas.at(-1), p) <= 1e-12) atas.pop(); atas.push(p); }
    return [...bawah.slice(0, -1), ...atas.slice(0, -1)];
  };
  const luasDes = (p) => Math.abs(p.reduce((s, a, i) => s + a[0] * p[(i + 1) % p.length][1] - a[1] * p[(i + 1) % p.length][0], 0)) / 2;
  const samaJenis = (lab, mandiri) => {
    if (lab.sisi === 3) return (lab.nama === "segitiga siku-siku") === (mandiri === "segitiga siku-siku");
    if (lab.sisi === 4) return lab.nama === mandiri;
    return mandiri.startsWith(lab.jenis);
  };
  const tempat = [];
  for (let r = 0; r < B.SUSUN_BARIS; r += 1) for (let c = 0; c < B.SUSUN_KOLOM; c += 1) {
    for (let a = 0; a < 4; a += 1) tempat.push({ jenis: "segitiga", arah: a, r, c });
    tempat.push({ jenis: "persegi", arah: 0, r, c });
  }
  let uji = 0;
  let cocok = 0;
  let sahN = 0;
  const jenisSusun = new Set();
  const periksaSusun = (kp) => {
    const qs = kp.flatMap(B.perempatKeping);
    if (new Set(qs.map(kunciQ)).size !== qs.length) return; // bertumpuk: diuji terpisah
    uji += 1;
    const h = B.tepiGabungan(qs);
    const nyambung = bersambung(qs);
    if (!nyambung) { if (!h.ok) cocok += 1; return; }
    if (!h.ok) { if (h.alasan === "titik" || h.alasan === "terpisah") cocok += 1; return; }
    sahN += 1;
    const nama = B.namaiBangun(h.titik, "persegi");
    jenisSusun.add(`${nama.jenis}:${kp.length}`);
    let ok = B.luasGanda(h.titik) / 2 === qs.length; // luas tepi (ganda) = banyak perempat
    const hull = selubung(qs.flatMap(sudutQ));
    if (Math.abs(luasDes(hull) - qs.length / 4) < 1e-9) ok = ok && h.titik.length === hull.length && samaJenis(nama, namaMandiri(hull));
    else ok = ok && (nama.sisi >= 5 || nama.jenis === "segiempat" || nama.sisi > hull.length);
    if (ok) cocok += 1;
  };
  for (let i = 0; i < tempat.length; i += 1) for (let j = i + 1; j < tempat.length; j += 1) periksaSusun([tempat[i], tempat[j]]);
  const acakS = acakDari(61);
  for (let n = 0; n < 30000; n += 1) periksaSusun([0, 0, 0].map(() => tempat[acakS(tempat.length)]));
  cek(cocok === uji && sahN > 200, `Susun: ${uji} susunan dua dan tiga keping sama dengan hitungan mandiri (${cocok}, ${sahN} sah)`);
  for (const j of ["persegi:2", "jajargenjang:2", "segitiga:2", "trapesium:3", "persegi-panjang:2", "segilima:3"]) cek(jenisSusun.has(j), `Susun: ${j} keping dapat dibentuk`);

  const susun = (daftar) => [{ t: "S_BERSIH" }, ...daftar.flatMap(([j, a, r, c]) => [j === "p" ? { t: "S_JENIS", jenis: "persegi" } : { t: "S_ARAH", arah: a }, { t: "S_TARUH", r, c }]), { t: "S_CEK" }];
  const xp = jalan(x0, B.langkahSusunK4B5B, susun([["s", 0, 0, 0], ["s", 2, 0, 0]]));
  cek(xp.pernah.includes("susun:persegi:2-0") && /komposisi/.test(xp.pesan) && xp.pesan.startsWith("✅"), "Susun: dua segitiga dalam satu petak menjadi persegi");
  const rumah = jalan(x0, B.langkahSusunK4B5B, susun([["s", 2, 0, 0], ["s", 3, 0, 1], ["p", 0, 1, 0], ["p", 0, 1, 1]]));
  cek(rumah.pernah.includes("susun:segilima:2-2") && /rumah/.test(rumah.pesan), "Susun: rumah 2 persegi + 2 segitiga = segilima");
  const tumpuk = jalan(x0, B.langkahSusunK4B5B, [{ t: "S_ARAH", arah: 0 }, { t: "S_TARUH", r: 0, c: 0 }, { t: "S_ARAH", arah: 1 }, { t: "S_TARUH", r: 0, c: 0 }]);
  cek(tumpuk.keping.length === 1 && tumpuk.pernah.includes("tumpuk") && /Bertumpuk/.test(tumpuk.pesan), "Susun: keping bertumpuk ditolak");
  const satu = jalan(x0, B.langkahSusunK4B5B, [{ t: "S_TARUH", r: 0, c: 0 }, { t: "S_CEK" }]);
  cek(satu.pernah.length === 0 && /satu keping/i.test(satu.pesan), "Susun: satu keping bukan komposisi");
  cek(B.langkahSusunK4B5B(x0, { t: "S_CEK" }).pernah.length === 0, "Susun: papan kosong tidak memenuhi");
  cek(B.langkahSusunK4B5B(x0, { t: "S_TARUH", r: 3, c: 0 }) === x0 && B.langkahSusunK4B5B(x0, { t: "S_ARAH", arah: 4 }) === x0, "Susun: aksi di luar batas diabaikan");

  // Urai: semua satu dan dua potongan; luas tetap, tiap bagian cembung, banyak bagian = potongan + 1, nama mandiri.
  const keNyata = (b, p) => (b.metrik === "persegi" ? p : [p[0] + p[1] / 2, (p[1] * Math.sqrt(3)) / 2]);
  const namaBagianMandiri = (b, p) => {
    const nyata = p.map((t) => keNyata(b, t));
    // Buang titik segaris (luas segitiga tetangga nol).
    let t = nyata;
    for (let ulang = 0; ulang < 10; ulang += 1) t = t.filter((q, i) => luasSegitiga(t[(i - 1 + t.length) % t.length], q, t[(i + 1) % t.length]) > 1e-9);
    if (t.length === 3) {
      const pj = t.map((q, i) => Math.hypot(t[(i + 1) % 3][0] - q[0], t[(i + 1) % 3][1] - q[1]));
      const besar = Math.max(...t.map((q, i) => sudutDerajat(t[(i + 2) % 3], q, t[(i + 1) % 3])));
      return Math.abs(besar - 90) < 1e-6 ? "segitiga siku-siku" : Math.max(...pj) - Math.min(...pj) < 1e-9 ? "segitiga sama sisi" : "segitiga";
    }
    return `sisi:${t.length}`;
  };
  for (let bi = 0; bi < B.URAI.length; bi += 1) {
    const b = B.URAI[bi];
    const n = B.titikUrai(b).length;
    const luasUtuh = luasDes(b.sudut.map((p) => keNyata(b, p)));
    let okU = true;
    let sahU = 0;
    const pasang = [];
    for (let i = 0; i < n; i += 1) for (let j = i + 1; j < n; j += 1) pasang.push([i, j]);
    for (const p1 of pasang) for (const p2 of [null, ...pasang]) {
      const potong = p2 ? [p1, p2] : [p1];
      let bag = [B.bagianUrai(b, [])];
      bag = bag[0];
      let sah = 0;
      for (const pp of potong) {
        const h = B.potongBagian(b, bag, B.titikUrai(b)[pp[0]], B.titikUrai(b)[pp[1]]);
        if (h.ok) { bag = h.bagian; sah += 1; }
      }
      if (bag.length < sah + 1) okU = false;
      const luas = bag.reduce((s2, q) => s2 + luasDes(q.map((t) => keNyata(b, t))), 0);
      if (Math.abs(luas - luasUtuh) > 1e-9) okU = false;
      for (const q of bag) {
        const ny = q.map((t) => keNyata(b, t));
        const kanan = ny.map((t, i) => { const a1 = ny[(i - 1 + ny.length) % ny.length]; const a2 = ny[(i + 1) % ny.length]; return (t[0] - a1[0]) * (a2[1] - t[1]) - (t[1] - a1[1]) * (a2[0] - t[0]); });
        if (!(kanan.every((v) => v >= -1e-9) || kanan.every((v) => v <= 1e-9))) okU = false; // tiap bagian cembung
        if (luasDes(ny) < 1e-9) okU = false;
        const lab = B.namaiBangun(B.rapikan(q), b.metrik);
        const m = namaBagianMandiri(b, q);
        if (lab.sisi === 3 ? lab.nama !== m : m !== `sisi:${lab.sisi}`) okU = false;
      }
      if (sah > 0) sahU += 1;
    }
    cek(okU && sahU > 10, `Urai ${b.id}: semua satu dan dua potongan (${sahU} sah) menjaga luas, bagian cembung, nama mandiri`);
  }
  const urai = (bi, potong) => [{ t: "U_BENTUK", i: bi }, ...potong.flatMap(([p, q]) => [{ t: "U_TITIK", i: p }, { t: "U_TITIK", i: q }]), { t: "U_CEK" }];
  const huruf = (b, pt) => B.titikUrai(B.URAI[b]).findIndex((t) => t[0] === pt[0] && t[1] === pt[1]);
  const enam = jalan(x0, B.langkahSusunK4B5B, urai(3, [[huruf(3, [2, 0]), huruf(3, [-2, 0])], [huruf(3, [0, 2]), huruf(3, [0, 0])], [huruf(3, [-2, 2]), huruf(3, [0, 0])], [huruf(3, [0, -2]), huruf(3, [0, 0])], [huruf(3, [2, -2]), huruf(3, [0, 0])]]));
  cek(enam.pernah.includes("urai:segienam:6-segitiga") && /segitiga sama sisi/.test(enam.pesan) && /luas bangun utuh/.test(enam.pesan), "Urai: segienam menjadi 6 segitiga sama sisi, luas tetap");
  const tengahDulu = jalan(x0, B.langkahSusunK4B5B, [{ t: "U_BENTUK", i: 3 }, { t: "U_TITIK", i: huruf(3, [0, 0]) }, { t: "U_TITIK", i: huruf(3, [2, 0]) }]);
  cek(tengahDulu.potong.length === 0 && /tidak berada di tepi/.test(tengahDulu.pesan), "Urai: titik tengah sebelum dilewati potongan ditolak");
  const tepi = jalan(x0, B.langkahSusunK4B5B, [{ t: "U_TITIK", i: 0 }, { t: "U_TITIK", i: huruf(0, [2, 0]) }]);
  cek(tepi.potong.length === 0 && /tepi bangun/.test(tepi.pesan), "Urai: potongan di tepi ditolak");
  const tiga = jalan(x0, B.langkahSusunK4B5B, urai(2, [[huruf(2, [2, 0]), huruf(2, [0, 2])], [huruf(2, [2, 0]), huruf(2, [2, 2])]]));
  cek(tiga.pernah.includes("urai:trapesium:3-segitiga") && /segitiga sama sisi/.test(tiga.pesan), "Urai: trapesium menjadi 3 segitiga sama sisi (buku)");
  const duaCara = jalan(x0, B.langkahSusunK4B5B, [...urai(0, [[0, 2]]), { t: "U_ULANG" }, ...urai(0, [[huruf(0, [2, 0]), huruf(0, [2, 4])]])]);
  cek(duaCara.pernah.includes("urai:persegi:2-segitiga") && duaCara.pernah.includes("urai:persegi:2-persegi-panjang") && /banyak cara/.test(duaCara.pesan), "Urai: persegi dua cara dijelaskan");
  cek(B.langkahSusunK4B5B(x0, { t: "U_CEK" }).pernah.length === 0, "Urai: bangun belum dipotong tidak memenuhi");

  // Tangram: tujuh keping baku menutup persegi 4 × 4 tanpa celah dan tanpa bertumpuk; luas dari rumus tali sepatu.
  const qsBaku = B.TANGRAM.map((t) => B.perempatDari(t.poli, 4, 4));
  cek(qsBaku.every((qs, k) => qs.length === luasDes(B.TANGRAM[k].poli) * 4), "Tangram: perempat tiap keping = luas keping (mandiri)");
  cek(new Set(qsBaku.flat().map(kunciQ)).size === 64, "Tangram: tujuh keping baku menutup 64 perempat persegi 4 × 4 tanpa bertumpuk");
  sama(B.TANGRAM.map((t) => luasDes(t.poli)), [4, 4, 2, 1, 1, 2, 2], "Tangram: luas keping 4, 4, 2, 1, 1, 2, 2");
  cek(B.SILUET.every((s2) => B.perempatDari(s2.poli, 4, 4).length === luasDes(s2.poli) * 4), "Tangram: perempat siluet = luas siluet (mandiri)");
  let okR = true;
  for (let k = 0; k < 7; k += 1) {
    const dasar = JSON.stringify(B.bentukKeping(k, 0, false).map(kunciQ).sort());
    if (JSON.stringify(B.bentukKeping(k, 4, false).map(kunciQ).sort()) !== dasar) okR = false;
    for (let pu = 0; pu < 4; pu += 1) if (B.bentukKeping(k, pu, true).length !== qsBaku[k].length) okR = false;
    const nm = (qs) => { const h = B.tepiGabungan(qs); return h.ok ? B.namaiBangun(h.titik, "persegi").nama : "x"; };
    for (let pu = 0; pu < 4; pu += 1) if (nm(B.bentukKeping(k, pu, pu % 2 === 1)) !== nm(qsBaku[k])) okR = false;
  }
  cek(okR, "Tangram: putar dan balik menjaga bentuk dan luas keping");
  // Cari mandiri (pencarian menyeluruh) cara menutup siluet segitiga besar dan persegi miring.
  const cariTutup = (si, batas) => {
    const target = new Set(B.perempatSiluet(si).map(kunciQ));
    const hasil = [];
    const coba = (sisa, pakai, isi) => {
      if (isi.size === target.size) { hasil.push(pakai); return; }
      if (hasil.length >= batas) return;
      for (let k = 0; k < 7; k += 1) {
        if (pakai.some((p) => p.k === k)) continue;
        for (let pu = 0; pu < 4; pu += 1) for (const bl of B.TANGRAM[k].bisaBalik ? [false, true] : [false]) for (let r = 0; r < 4; r += 1) for (let c = 0; c < 4; c += 1) {
          const p = { k, putar: pu, balik: bl, r, c };
          const qs = B.perempatPasang(p).map(kunciQ);
          if (qs.every((q) => target.has(q) && !isi.has(q))) coba(sisa, [...pakai, p], new Set([...isi, ...qs]));
        }
      }
    };
    coba(null, [], new Set());
    return hasil;
  };
  const caraSegitiga = cariTutup(0, 400);
  const lebihSatu = caraSegitiga.filter((c) => c.length >= 2);
  cek(lebihSatu.length > 0 && caraSegitiga.some((c) => c.length === 1), `Tangram: siluet segitiga bisa ditutup satu keping dan beberapa keping (${lebihSatu.length} cara)`);
  const mainkan = (si, cara) => [{ t: "G_SILUET", i: si }, ...cara.flatMap((p) => [{ t: "G_PILIH", k: p.k }, ...ulang(p.putar, { t: "G_PUTAR" }), ...(p.balik ? [{ t: "G_BALIK" }] : []), { t: "G_TARUH", r: p.r, c: p.c }]), { t: "G_CEK" }];
  const xs = jalan(x0, B.langkahSusunK4B5B, mainkan(0, lebihSatu[0]));
  cek(xs.pernah.includes(`tangram:segitiga:${lebihSatu[0].length}`) && xs.pesan.startsWith("✅"), "Tangram: cara mandiri diterima lab");
  const satuKeping = caraSegitiga.find((c) => c.length === 1);
  cek(jalan(x0, B.langkahSusunK4B5B, mainkan(0, satuKeping)).pernah.includes("tangram:segitiga:1"), "Tangram: satu keping dicatat terpisah");
  cek(cariTutup(1, 50).some((c) => c.length === 2), "Tangram: persegi miring dari dua segitiga kecil");
  const baku = B.TANGRAM.map((t, k) => { const qs = qsBaku[k]; return { k, putar: 0, balik: false, r: Math.min(...qs.map((q) => q[0])), c: Math.min(...qs.map((q) => q[1])) }; });
  const tujuh = jalan(x0, B.langkahSusunK4B5B, mainkan(2, baku));
  cek(tujuh.pernah.includes("tangram:persegi-besar:7"), "Tangram: persegi besar dari tujuh keping");
  const celah = jalan(x0, B.langkahSusunK4B5B, mainkan(2, baku.slice(0, 6)));
  cek(!celah.pernah.some((p) => p.startsWith("tangram:")) && /celah/.test(celah.pesan), "Tangram: enam keping masih bercelah");
  const keluar = jalan(x0, B.langkahSusunK4B5B, [{ t: "G_PILIH", k: 0 }, { t: "G_TARUH", r: 1, c: 0 }]);
  cek(keluar.tangram.length === 0 && /keluar/.test(keluar.pesan), "Tangram: keping keluar siluet ditolak");
  const dobel = jalan(x0, B.langkahSusunK4B5B, [{ t: "G_SILUET", i: 2 }, { t: "G_PILIH", k: 0 }, { t: "G_TARUH", r: 0, c: 0 }, { t: "G_PILIH", k: 5 }, { t: "G_TARUH", r: 0, c: 0 }]);
  cek(dobel.tangram.length === 1 && dobel.pernah.includes("tumpuk"), "Tangram: keping bertumpuk ditolak");
  cek(/Hanya jajargenjang/.test(B.langkahSusunK4B5B(x0, { t: "G_BALIK" }).pesan), "Tangram: hanya jajargenjang yang dibalik");

  // Fuzz.
  const acak = acakDari(67);
  let s2 = x0;
  let ok = true;
  const pesanSemua = new Set();
  for (let i = 0; i < 20000; i += 1) {
    const p = acak(16);
    const a =
      p === 0 ? { t: "S_ARAH", arah: acak(5) } :
      p === 1 ? { t: "S_JENIS", jenis: acak(2) ? "persegi" : "segitiga" } :
      p <= 3 ? { t: "S_TARUH", r: acak(4), c: acak(5) } :
      p === 4 ? (acak(3) === 0 ? { t: "S_BERSIH" } : { t: "S_CEK" }) :
      p === 5 ? { t: "U_BENTUK", i: acak(5) } :
      p <= 7 ? { t: "U_TITIK", i: acak(10) } :
      p === 8 ? (acak(3) === 0 ? { t: "U_ULANG" } : { t: "U_CEK" }) :
      p === 9 ? { t: "G_SILUET", i: acak(4) } :
      p === 10 ? { t: "G_PILIH", k: acak(8) } :
      p === 11 ? (acak(2) ? { t: "G_PUTAR" } : { t: "G_BALIK" }) :
      p === 12 ? { t: "G_TARUH", r: acak(5), c: acak(5) } :
      p === 13 ? (acak(3) === 0 ? { t: "G_SILUET", i: acak(3) } : { t: "G_CEK" }) :
      p === 14 ? (acak(6) === 0 ? { t: "S_ANGKAT" } : { t: "PESAN_KOSONG" }) : (acak(10) === 0 ? { t: "U_ULANG" } : { t: "S_TARUH", r: acak(3), c: acak(4) });
    const t = B.langkahSusunK4B5B(s2, a);
    if (!s2.pernah.every((v) => t.pernah.includes(v))) ok = false;
    const qs = B.perempatSusun(t).map(kunciQ);
    if (new Set(qs).size !== qs.length || t.keping.length > B.MAKS_KEPING_SUSUN) ok = false;
    const tq = B.perempatTangram(t).map(kunciQ);
    const sil = new Set(B.perempatSiluet(t.siluet).map(kunciQ));
    if (new Set(tq).size !== tq.length || tq.some((q) => !sil.has(q)) || new Set(t.tangram.map((p) => p.k)).size !== t.tangram.length) ok = false;
    const bag = B.bagianUrai(B.URAI[t.bentuk], t.potong);
    if (bag.length < t.potong.length + 1 || t.potong.length > B.MAKS_POTONG) ok = false;
    if (t.pesan) pesanSemua.add(t.pesan);
    s2 = t;
  }
  cek(ok, "fuzz 20.000 aksi Lab Susun: tanpa bertumpuk, potongan sah, batas terjaga, riwayat tidak dicabut");
  cek(pesanSemua.size > 10 && [...pesanSemua].every(tanpaAngka), `fuzz Lab Susun: semua ${pesanSemua.size} pesan dieja menjadi kata`);
}

/* ------------------------------ Mesin ------------------------------ */
{
  const posisi = [];
  for (const def of MS.SEMUA_MESIN_K4B5) {
    cek(def.stasiun.length === 4 && def.kasus.length === 3, `${def.id}: empat stasiun, tiga kasus`);
    const lokal = [];
    for (const kasus of def.kasus) {
      cek(kasus.langkah.length === 4, `${def.id}/${kasus.id}: empat langkah`);
      kasus.langkah.forEach((l, i) => {
        cek(l.stasiun === def.stasiun[i].id, `${kasus.id}: stasiun ${i} berurutan`);
        cek(l.opsi.length === 3 && new Set(l.opsi).size === 3 && l.opsi.filter((o) => o === l.benar).length === 1, `${kasus.id}/${l.stasiun}: tiga pilihan unik dengan satu kunci`);
        cek(l.petunjuk.length > 20 && l.tanya.length > 5, `${kasus.id}/${l.stasiun}: tanya dan petunjuk ada`);
        cek(tanpaAngkaK3(l.tanya) && tanpaAngkaK3(l.petunjuk) && !/[°²³]/.test(l.tanya + l.petunjuk), `${kasus.id}/${l.stasiun}: tanya dan petunjuk dapat dieja mesin`);
        lokal.push(l.opsi.indexOf(l.benar));
      });
      cek(tanpaAngkaK3(kasus.ringkas) && tanpaAngkaK3(kasus.nama) && !/[°²³]/.test(kasus.ringkas + kasus.nama), `${def.id}/${kasus.id}: nama dan ringkas dieja menjadi kata`);
    }
    posisi.push(...lokal);
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
  sama(MS.SEMUA_MESIN_K4B5.map((d) => d.selesaiId), [K5.ID_MESIN_K4B5.A, K5.ID_MESIN_K4B5.B], "selesaiId mesin sama dengan id misi");
  cek(new Set(posisi).size === 3, "letak kunci bervariasi di semua mesin");

  // Mesin Ciri: kunci dan SEMUA pengecoh dihitung ulang mandiri dari koordinat.
  for (const k of MS.KASUS_CIRI) {
    const kasus = MS.MESIN_CIRI.kasus.find((c) => c.id === k.id);
    const [sisi, sudut, sejajar, nama] = kasus.langkah;
    const n = k.titik.length;
    const ke = (i) => k.titik[((i % n) + n) % n];
    let siku = 0;
    for (let i = 0; i < n; i += 1) if (Math.abs(sudutDerajat(ke(i - 1), ke(i), ke(i + 1)) - 90) < 1e-6) siku += 1;
    const sej = n === 4 ? [0, 1].filter((i) => kemiringan(ke(i), ke(i + 1)) === kemiringan(ke(i + 2), ke(i + 3))).length : 0;
    const nm = namaMandiri(k.titik);
    cek(Number(sisi.benar) === n && sisi.opsi.every((o) => o === sisi.benar || Number(o) !== n), `A/${k.id}: ${n} sisi; pengecoh salah`);
    cek(Number(sudut.benar) === siku && sudut.opsi.every((o) => o === sudut.benar || Number(o) !== siku), `A/${k.id}: ${siku} sudut siku-siku; pengecoh salah`);
    cek(Number(sejajar.benar) === sej && sejajar.opsi.every((o) => o === sejajar.benar || Number(o) !== sej), `A/${k.id}: ${sej} pasang sejajar; pengecoh salah`);
    cek(nama.benar === nm && nama.opsi.every((o) => o === nama.benar || o !== nm), `A/${k.id}: nama ${nm}; pengecoh bukan nama sebenarnya`);
    cek(nama.opsi.filter((o) => o !== nama.benar).every((o) => /^(segitiga|persegi|jajargenjang|belah ketupat|trapesium|layang-layang)/.test(o)), `A/${k.id}: pengecoh nama bangun yang sah`);
  }
  sama(MS.KASUS_CIRI.map((k) => namaMandiri(k.titik)), ["segitiga siku-siku", "persegi panjang", "trapesium"], "Mesin Ciri: penggaris, jendela, meja");
  cek(MS.MESIN_CIRI.kasus[1].langkah[3].opsi.includes("persegi"), "Mesin Ciri: pengecoh persegi untuk persegi panjang");

  // Mesin Susun-Urai: kunci dan SEMUA pengecoh dihitung ulang mandiri (koordinat nyata, Math.hypot, arccos).
  for (const k of MS.KASUS_SUSUN) {
    const kasus = MS.MESIN_SUSUN.kasus.find((c) => c.id === k.id);
    const [jenis, bagian, nama, luas] = kasus.langkah;
    const nyata = (p) => (k.kisi === "persegi" ? p : [p[0] + p[1] / 2, (p[1] * Math.sqrt(3)) / 2]);
    const luasN = (poli) => { const p = poli.map(nyata); return Math.abs(p.reduce((s, a, i) => s + a[0] * p[(i + 1) % p.length][1] - a[1] * p[(i + 1) % p.length][0], 0)) / 2; };
    const namaN = (poli) => {
      const p = poli.map(nyata);
      const n = p.length;
      const pj = p.map((q, i) => Math.hypot(p[(i + 1) % n][0] - q[0], p[(i + 1) % n][1] - q[1]));
      const sud = p.map((q, i) => sudutDerajat(p[(i - 1 + n) % n], q, p[(i + 1) % n]));
      const siku = sud.filter((v) => Math.abs(v - 90) < 1e-6).length;
      const samaS = Math.max(...pj) - Math.min(...pj) < 1e-9;
      if (n === 3) return siku ? "segitiga siku-siku" : samaS ? "segitiga sama sisi" : "segitiga";
      if (n === 4) {
        const sej = [0, 1].filter((i) => { const u = [p[i + 1][0] - p[i][0], p[i + 1][1] - p[i][1]]; const v = [p[(i + 3) % 4][0] - p[i + 2][0], p[(i + 3) % 4][1] - p[i + 2][1]]; return Math.abs(u[0] * v[1] - u[1] * v[0]) < 1e-9; }).length;
        return sej === 2 ? (siku === 4 ? (samaS ? "persegi" : "persegi panjang") : samaS ? "belah ketupat" : "jajargenjang") : sej === 1 ? "trapesium" : "segiempat";
      }
      return n === 6 && samaS ? "segienam beraturan" : `n${n}`;
    };
    const kunciJenis = k.arah === "susun" ? "komposisi" : "dekomposisi";
    cek(jenis.benar === kunciJenis && jenis.opsi.includes("pengukuran"), `B/${k.id}: ${kunciJenis}; pengecoh salah`);
    cek(Number(bagian.benar) === k.bagian.length && bagian.opsi.every((o) => o === bagian.benar || Number(o) !== k.bagian.length), `B/${k.id}: ${k.bagian.length} bagian; pengecoh salah`);
    const target = k.arah === "urai" ? namaN(k.bagian[0]) : namaN(k.utuh);
    cek(k.bagian.every((b) => namaN(b) === namaN(k.bagian[0])), `B/${k.id}: semua bagian sejenis`);
    cek(nama.benar === target && nama.opsi.every((o) => o === nama.benar || o !== target), `B/${k.id}: nama ${target}; pengecoh salah`);
    const jumlah = k.bagian.reduce((s, b) => s + luasN(b), 0);
    cek(Math.abs(jumlah - luasN(k.utuh)) < 1e-9 && luas.benar === "sama", `B/${k.id}: jumlah luas bagian = luas utuh (mandiri)`);
    // Bagian tidak saling menimpa: luas gabungan = luas utuh dan tiap titik bagian di dalam atau di tepi utuh.
    cek(k.bagian.every((b) => b.every((t) => B.luasGanda([...k.utuh]) > 0 && t.every(Number.isInteger))), `B/${k.id}: titik bagian bulat`);
  }
  sama(MS.KASUS_SUSUN.map((k) => k.bagian.length), [2, 6, 3], "Mesin Susun-Urai: 2, 6, 3 bagian (buku)");
}

/* ------------------------------ Skenario ------------------------------ */
{
  const semua = [SK.SKENARIO_K4B5A, SK.SKENARIO_K4B5B];
  for (const def of semua) {
    cek(def.adegan.length >= 5 && def.adegan.length <= 8, `${def.id}: 5 sampai 8 adegan`);
    cek(def.adegan[0].jenis === "narasi" && def.adegan[def.adegan.length - 1].jenis === "akhir", `${def.id}: buka dan tutup`);
    cek(new Set(def.adegan.map((a) => a.jenis)).size >= 4, `${def.id}: paling sedikit empat jenis adegan`);
    for (const a of def.adegan.filter((x) => x.jenis === "soal")) for (const q of a.soal) cek(q.opsi.filter((o) => o !== q.jawaban).every((o) => Number(o) !== Number(q.jawaban)), `${def.id}/${a.id}: pengecoh salah (${q.teks})`);
    cek(def.adegan.every((a) => tanpaAngka(a.cerita)), `${def.id}: cerita dapat dieja`);
  }
  sama(semua.map((d) => d.id.replace(/-k4b5$/, "")), [K5.ID_SKENARIO_K4B5.A, K5.ID_SKENARIO_K4B5.B], "id skenario sesuai id misi");
  const adegan = (def, id) => def.adegan.find((a) => a.id === id);
  const S = SK.SKENARIO_K4B5A;
  cek(adegan(S, "enam").jumlah === A.KENALI.find((g) => g.id === "k-enam").lengkung.length, "A: segienam punya 6 sisi (dari data Kenali)");
  cek(/tertutup/.test(adegan(S, "segi").opsi.find((o) => o.benar).teks) && /lurus/.test(adegan(S, "segi").opsi.find((o) => o.benar).teks), "A: segi banyak tertutup dan lurus");
  cek(adegan(S, "klm").opsi.find((o) => o.benar).teks === "Segitiga siku-siku", "A: KLM siku di K (buku)");
  const sikuPersegi = [0, 1, 2, 3].filter((i) => Math.abs(sudutDerajat(...[[0, 0], [2, 0], [2, 2], [0, 2]].map((_, j, a) => a[(i + j + 3) % 4]).slice(0, 3)) - 90) < 1e-6).length;
  const sejajarDari = (pts) => [0, 1].filter((i) => kemiringan(pts[i], pts[(i + 1) % 4]) === kemiringan(pts[(i + 2) % 4], pts[(i + 3) % 4])).length;
  sama(adegan(S, "persegi").soal.map((q) => Number(q.jawaban)), [sikuPersegi, sejajarDari([[0, 0], [3, 0], [3, 2], [0, 2]]), sejajarDari([[0, 0], [3, 0], [2, 2], [1, 2]])], "A: persegi 4 siku, persegi panjang 2 pasang, trapesium 1 pasang (dihitung)");

  const SB = SK.SKENARIO_K4B5B;
  const potongDiagonal = B.potongBagian(B.URAI[0], B.bagianUrai(B.URAI[0], []), [0, 0], [4, 4]);
  cek(potongDiagonal.ok && potongDiagonal.bagian.length === 2 && /Dua segitiga siku-siku/.test(adegan(SB, "diagonal").opsi.find((o) => o.benar).teks), "B: persegi dipotong diagonal = 2 segitiga siku-siku (dihitung)");
  cek(potongDiagonal.bagian.every((p) => namaBagianSiku(p)), "B: kedua bagian punya sudut siku-siku (arccos)");
  cek(adegan(SB, "susun").opsi.find((o) => o.benar).teks === "Komposisi", "B: menyusun = komposisi");
  cek(adegan(SB, "segienam").jumlah === MS.KASUS_SUSUN.find((k) => k.id === "hiasan").bagian.length, "B: segienam = 6 segitiga (dari data mesin)");
  cek(adegan(SB, "trapesium").target === MS.KASUS_SUSUN.find((k) => k.id === "trapesium").bagian.length, "B: trapesium = 3 segitiga sama sisi (dari data mesin)");
  const rumahTitik = [[0, 1], [1, 0], [2, 1], [2, 3], [0, 3]];
  const sikuSegitiga = [[0, 0], [4, 0], [4, 4]].filter((_, i, a) => Math.abs(sudutDerajat(a[(i + 2) % 3], a[i], a[(i + 1) % 3]) - 90) < 1e-6).length;
  sama(adegan(SB, "ingat").soal.map((q) => Number(q.jawaban)), [namaMandiri(rumahTitik) === "segilima tak beraturan" ? rumahTitik.length : -1, sikuSegitiga, B.TANGRAM.length], "B: rumah 5 sisi, 1 sudut siku-siku, tangram 7 keping (dihitung)");
  cek(adegan(SB, "peta").opsi.find((o) => o.benar).teks === "Dekomposisi", "B: peta dibagi = dekomposisi");
  cek(adegan(S, "karet").target === [[0, 0], [2, 0], [2, 2], [0, 2]].length + [[0, 0], [2, 0], [0, 2]].length, "A: persegi dan segitiga 7 sisi (dihitung)");
}

/* ------------------------------ Misi ------------------------------ */
{
  const huruf = ["A", "B"];
  sama(Object.keys(TK.MISI_K4B5), huruf, "teks misi untuk A dan B");
  sama(Object.keys(TK.NAMA_SIM_K4B5), huruf, "nama simulasi untuk A dan B");
  cek(TK.hurufK4B5("Z") === "A" && TK.hurufK4B5("B") === "B", "huruf tak dikenal jatuh ke A");
  cek(TK.misiAwalK4Bab5("B").startsWith("Simulasi 1. Misi: ") && tanpaAngka(TK.misiAwalK4Bab5("A")) && tanpaAngka(TK.misiAwalK4Bab5("B")), "misi awal dan dapat dieja");
  for (const h of huruf) {
    const daftar = K5.daftarMisiK4Bab5(h);
    cek(daftar.filter((m) => m.wajib).length === 7 && daftar.filter((m) => !m.wajib).length === 3, `${h}: tujuh misi wajib dan tiga tantangan bebas`);
    cek(new Set(daftar.map((m) => m.id)).size === 10 && daftar.every((m) => m.id.startsWith(`${h.toLowerCase()}-`)), `${h}: id misi unik berawalan huruf`);
    const kosong = [{ alat: "ciri", pernah: [] }, { alat: "susun", pernah: [] }, sel("tidak-ada"), A.keadaanCiriK4B5A(A.awalCiriK4B5A()), B.keadaanSusunK4B5B(B.awalSusunK4B5B())];
    cek(kosong.every((k) => M0.misiBaru(daftar, k, new Set()).length === 0), `${h}: keadaan awal alat tidak memenuhi misi mana pun`);
    cek(daftar.every((m) => m.teks.length > 20 && tanpaAngka(m.teks)), `${h}: teks misi jelas dan dapat dieja`);
    const baru = (k) => M0.misiBaru(daftar, k, new Set());
    for (const lain of huruf.filter((l) => l !== h)) cek(baru(sel(K5.ID_MESIN_K4B5[lain])).length === 0 && baru(sel(K5.ID_SKENARIO_K4B5[lain])).length === 0, `${h}: id mesin/skenario ${lain} tidak memenuhi misi ${h}`);
    cek(baru(sel(K5.ID_MESIN_K4B5[h])).join() === `${h.toLowerCase()}-mesin` && baru(sel(K5.ID_SKENARIO_K4B5[h])).join() === `${h.toLowerCase()}-skenario`, `${h}: id mesin dan skenario memenuhi misinya`);
  }
  cek(M0.misiBaru(K5.MISI_A, { alat: "volume", pernah: ["paku:persegi", "kenali"] }, new Set()).length === 0, "A: riwayat alat lain tidak memenuhi misi A");

  // Jalur nyata lewat aksi lab, dan near-miss.
  const capai = (aksi) => M0.misiBaru(K5.MISI_A, A.keadaanCiriK4B5A(jalan(A.awalCiriK4B5A(), A.langkahCiriK4B5A, aksi)), new Set());
  const bentuk = (pts) => [...paku(pts), { t: "P_CEK" }];
  cek(capai(bentuk([[0, 0], [3, 0], [0, 4]])).includes("a-siku"), "A: segitiga siku-siku memenuhi");
  cek(!capai(bentuk([[0, 0], [4, 0], [1, 2]])).includes("a-siku") && !capai(bentuk([[0, 0], [4, 0], [3, 1]])).includes("a-siku"), "A: segitiga lancip atau tumpul tidak memenuhi siku");
  cek(capai(bentuk([[1, 1], [3, 1], [3, 3], [1, 3]])).includes("a-persegi") && capai(bentuk([[2, 0], [4, 2], [2, 4], [0, 2]])).includes("a-persegi"), "A: persegi tegak dan miring memenuhi");
  cek(!capai(bentuk([[0, 0], [3, 0], [3, 2], [0, 2]])).includes("a-persegi") && !capai(bentuk([[1, 0], [2, 2], [1, 4], [0, 2]])).includes("a-persegi"), "A: persegi panjang atau belah ketupat tidak memenuhi persegi");
  cek(capai(bentuk([[0, 0], [4, 0], [3, 2], [1, 2]])).includes("a-trapesium") && capai(bentuk([[0, 0], [2, 0], [2, 2], [0, 4]])).includes("a-trapesium"), "A: trapesium sama kaki dan siku memenuhi");
  cek(!capai(bentuk([[0, 0], [3, 0], [4, 2], [1, 2]])).includes("a-trapesium") && !capai(bentuk([[0, 0], [3, 0], [3, 3], [0, 3]])).includes("a-trapesium") && !capai(bentuk([[2, 0], [4, 1], [2, 4], [0, 1]])).includes("a-trapesium"), "A: jajargenjang, persegi, layang-layang tidak memenuhi trapesium");
  cek(capai(bentuk([[1, 0], [2, 2], [1, 4], [0, 2]])).includes("a-belah") && !capai(bentuk([[0, 0], [2, 0], [2, 2], [0, 2]])).includes("a-belah"), "A: tantangan belah ketupat; persegi tidak");
  cek(capai(bentuk([[0, 0], [2, 0], [4, 0]])).join() === "a-segaris", "A: tantangan segaris");
  const kunciSudut = A.PILAH.sudut.map((b) => A.kelompokBenar("sudut", b));
  const pilahSemua = (k, m = 0) => [{ t: "S_MODE", m }, ...k.flatMap((v, i) => [{ t: "S_PILIH", i }, { t: "S_KE", k: v }]), { t: "S_CEK" }];
  cek(capai(pilahSemua(kunciSudut)).includes("a-pilah-sudut") && !capai(pilahSemua(kunciSudut.map((v, i) => (i === 2 ? (v === "tumpul" ? "lancip" : "tumpul") : v)))).includes("a-pilah-sudut"), "A: pilah sudut tepat memenuhi; satu salah tidak");
  const kunciSisi = A.PILAH.sisi.map((b) => A.kelompokBenar("sisi", b));
  cek(capai(pilahSemua(kunciSisi, 1)).join() === "a-pilah-sisi" && !capai(pilahSemua(kunciSudut, 1)).includes("a-pilah-sisi"), "A: tantangan pilah sisi; kunci sudut di pilahan sisi tidak");
  cek(!capai(pilahSemua(A.PILAH.beraturan.map((b) => A.kelompokBenar("beraturan", b)), 2)).some((m) => m.startsWith("a-pilah")), "A: pilah beraturan bukan misi pilah sudut atau sisi");
  const kunciK = A.KENALI.map(A.kelompokKenali);
  const kenali = (k) => [...k.flatMap((v, i) => [{ t: "K_PILIH", i }, { t: "K_KE", k: v }]), { t: "K_CEK" }];
  cek(capai(kenali(kunciK)).join() === "a-kenali" && !capai(kenali(kunciK.map((v, i) => (i === 5 ? "3" : v)))).includes("a-kenali"), "A: kenali tepat memenuhi; setengah lingkaran sebagai segitiga tidak");


  cek(M0.misiBaru(K5.MISI_B, { alat: "ciri", pernah: ["susun:persegi:2-0", "tumpuk"] }, new Set()).length === 0, "B: riwayat Lab Ciri tidak memenuhi misi B");
  const capaiB = (aksi) => M0.misiBaru(K5.MISI_B, B.keadaanSusunK4B5B(jalan(B.awalSusunK4B5B(), B.langkahSusunK4B5B, aksi)), new Set());
  const susunB = (daftar) => [...daftar.flatMap(([j, a, r, c]) => [j === "p" ? { t: "S_JENIS", jenis: "persegi" } : { t: "S_ARAH", arah: a }, { t: "S_TARUH", r, c }]), { t: "S_CEK" }];
  cek(capaiB(susunB([["s", 0, 1, 1], ["s", 2, 1, 1]])).includes("b-persegi") && !capaiB(susunB([["p", 0, 0, 0]])).includes("b-persegi"), "B: dua segitiga menjadi persegi memenuhi; satu keping persegi tidak");
  cek(!capaiB(susunB([["s", 0, 0, 0], ["s", 2, 0, 0], ["s", 0, 0, 1], ["s", 2, 0, 1]])).includes("b-persegi"), "B: empat segitiga menjadi persegi panjang bukan misi persegi");
  cek(capaiB(susunB([["s", 2, 0, 0], ["s", 0, 0, 1]])).includes("b-jajargenjang") && !capaiB(susunB([["s", 2, 0, 0], ["s", 3, 0, 1]])).includes("b-jajargenjang"), "B: jajargenjang memenuhi; segitiga besar tidak");
  cek(capaiB(susunB([["s", 2, 0, 0], ["s", 0, 0, 1], ["s", 2, 0, 1]])).includes("b-trapesium") && !capaiB(susunB([["s", 2, 0, 0], ["p", 0, 0, 1]])).includes("b-trapesium"), "B: tiga segitiga menjadi trapesium memenuhi; segitiga dan persegi tidak");
  cek(capaiB([{ t: "S_TARUH", r: 0, c: 0 }, { t: "S_TARUH", r: 0, c: 0 }]).join() === "b-tumpuk", "B: tantangan bertumpuk");
  const titikB = (bi, pt) => B.titikUrai(B.URAI[bi]).findIndex((t) => t[0] === pt[0] && t[1] === pt[1]);
  const uraiB = (bi, potong) => [{ t: "U_BENTUK", i: bi }, ...potong.flatMap(([p, q]) => [{ t: "U_TITIK", i: titikB(bi, p) }, { t: "U_TITIK", i: titikB(bi, q) }]), { t: "U_CEK" }];
  const jari = [[[2, 0], [-2, 0]], [[0, 2], [0, 0]], [[-2, 2], [0, 0]], [[0, -2], [0, 0]], [[2, -2], [0, 0]]];
  cek(capaiB(uraiB(3, jari)).includes("b-segienam") && !capaiB(uraiB(3, jari.slice(0, 4))).includes("b-segienam"), "B: segienam enam segitiga memenuhi; lima bagian tidak");
  cek(capaiB(uraiB(3, [[[2, 0], [-2, 0]], [[0, 2], [0, -2]], [[-2, 2], [2, -2]]])).includes("b-segienam"), "B: segienam dengan tiga diagonal panjang juga memenuhi");
  cek(capaiB([...uraiB(0, [[[0, 0], [4, 4]]]), { t: "U_ULANG" }, ...uraiB(0, [[[2, 0], [2, 4]]])]).join() === "b-dua-cara" && !capaiB(uraiB(0, [[[0, 0], [4, 4]]])).includes("b-dua-cara"), "B: tantangan dua cara; satu cara tidak");
  const tangramB = (si, daftar) => [{ t: "G_SILUET", i: si }, ...daftar.flatMap(([k, pu, r, c]) => [{ t: "G_PILIH", k }, ...ulang(pu, { t: "G_PUTAR" }), { t: "G_TARUH", r, c }]), { t: "G_CEK" }];
  cek(capaiB(tangramB(0, [[0, 0, 0, 0]])).length === 0, "B: siluet segitiga dengan satu keping tidak memenuhi");
  const lebih = [];
  for (const k of [2, 3, 4]) for (let pu = 0; pu < 4; pu += 1) for (let r = 0; r < 4; r += 1) for (let c = 0; c < 4; c += 1) lebih.push([k, pu, r, c]);
  // Cari kombinasi sedang + dua kecil yang menutup siluet segitiga, lewat aksi lab.
  let ketemu = null;
  const sedang = lebih.filter((p) => p[0] === 2);
  const kecil1 = lebih.filter((p) => p[0] === 3);
  const kecil2 = lebih.filter((p) => p[0] === 4);
  for (const a of sedang) { for (const b of kecil1) { for (const c of kecil2) { if (capaiB(tangramB(0, [a, b, c])).includes("b-tangram")) { ketemu = [a, b, c]; break; } } if (ketemu) break; } if (ketemu) break; }
  cek(!!ketemu, "B: siluet segitiga dari segitiga sedang dan dua segitiga kecil memenuhi");
  cek(!capaiB(tangramB(0, ketemu.slice(0, 2))).includes("b-tangram"), "B: siluet segitiga bercelah tidak memenuhi");
  const baku = B.TANGRAM.map((t, k) => { const qs = B.perempatDari(t.poli, 4, 4); return [k, 0, Math.min(...qs.map((q) => q[0])), Math.min(...qs.map((q) => q[1]))]; });
  cek(capaiB(tangramB(2, baku)).join() === "b-tujuh" && !capaiB(tangramB(2, baku.slice(1))).includes("b-tujuh"), "B: tantangan tujuh keping; enam tidak");

  // Gerbang.
  for (const h of huruf) {
    const daftar = M0.tampilMisi(K5.daftarMisiK4Bab5(h));
    const wajibIds = daftar.filter((m) => m.wajib).map((m) => m.id);
    cek(!M0.wajibSelesai(daftar, new Set(wajibIds.slice(0, 6))), `${h}: enam dari tujuh wajib belum membuka gerbang`);
    cek(M0.wajibSelesai(daftar, new Set(wajibIds)), `${h}: tujuh wajib membuka gerbang`);
    cek(M0.bolehLanjut({ adaMisi: true, wajibSelesai: false, dilewati: true, disentuh: true }) && !M0.bolehLanjut({ adaMisi: true, wajibSelesai: false, dilewati: true, disentuh: false }), "lewati hanya setelah disentuh");
  }
}

/* ------------------------------ Konsep tidak bocor antar sub-bab ------------------------------ */
{
  const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas4-bab5-ringkas.json", import.meta.url), "utf8"));
  const baca = (nama, ekstensi) => readFileSync(new URL(`../src/components/modul/${nama}.${ekstensi}`, import.meta.url), "utf8");
  const tanpaKomentar = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
  // Sub-Bab A (ciri) tidak memakai istilah komposisi dan dekomposisi (Sub-Bab B).
  const BOCOR_A = /(komposisi|tangram|keping|potong|gabung|urai|susun|menyatukan|\biris\b|\bpecah\b)/i;
  const catat = (teks, apa) => {
    const m = BOCOR_A.exec(teks);
    cek(!m, `A: ${apa} bebas konsep Sub-Bab B (${m ? m[0] : ""} di "${String(teks).slice(Math.max(0, (m?.index ?? 0) - 30), (m?.index ?? 0) + 40)}")`);
  };
  for (const t of [TK.MISI_K4B5.A, TK.NAMA_SIM_K4B5.A, ...K5.MISI_A.map((m) => m.teks)]) catat(t, "teks misi");
  catat(JSON.stringify(MS.MESIN_CIRI), "mesin");
  catat(JSON.stringify(SK.SKENARIO_K4B5A), "skenario");
  catat(JSON.stringify(ringkas.subBab.A), "peta dan infografis ringkas");
  catat(tanpaKomentar(baca("SimulasiLabCiriK4B5", "tsx")), "komponen lab (tanpa komentar)");
  catat(tanpaKomentar(baca("model-bangun-k4b5", "tsx")), "model gambar (tanpa komentar)");
  catat(tanpaKomentar(baca("lab-ciri-k4b5a", "ts")), "logika lab (tanpa komentar)");
  for (const p of globalThis.__pesanA) catat(p, "pesan lab dari fuzz");
  const xA = A.awalCiriK4B5A();
  for (const u of [A.ucapPakuK4B5A(xA), A.ucapPilahK4B5A(xA), A.ucapKenaliK4B5A(xA)]) catat(u, "ucapan lab");

  // Kunci tidak bocor ke klien.
  const KOMP = ["SimulasiLabCiriK4B5", "SimulasiLabSusunK4B5", "SimulasiK4Bab5", "model-bangun-k4b5", "model-susun-k4b5"];
  for (const f of KOMP) {
    const s = baca(f, "tsx");
    cek(!/correct_index|explanation/.test(s), `${f}: tidak memuat correct_index atau explanation`);
    cek(!/fetch\(|XMLHttpRequest|api\/|openai|anthropic|gemini/i.test(s), `${f}: tanpa jaringan atau model bahasa`);
  }
  const LOGIKA = ["lab-ciri-k4b5a", "lab-susun-k4b5b", "mesin-data-k4b5", "skenario-k4b5", "misi-k4bab5", "misi-teks-k4b5", "eja-k4b5"];
  for (const f of LOGIKA) {
    const s = baca(f, "ts");
    cek(!/fetch\(|XMLHttpRequest|from "react"|openai|anthropic|gemini|correct_index|explanation/i.test(s), `${f}: murni`);
    const impor = s.match(/^import .+$/gm) ?? [];
    cek(impor.every((l) => l.startsWith("import type")), `${f}: hanya mengimpor tipe`);
  }
  for (const f of ["SimulasiLabCiriK4B5", "SimulasiLabSusunK4B5"]) {
    const s = baca(f, "tsx");
    cek(/useEffect\(\(\) => \{\s*onKeadaan\?\.\(keadaan\w+\(x\)\);\s*\}, \[onKeadaan, x\]\);/.test(s), `${f}: lapor keadaan lewat useEffect`);
    cek(/setLihat\(v\);\s*kirim\(\{ t: "PESAN_KOSONG" \}\);/.test(s), `${f}: ganti tampilan mengosongkan pesan`);
    const catatan = [...s.matchAll(/^\s*"([^"]+)",$/gm)].map((m) => m[1]);
    cek(catatan.length >= 4 && catatan.every(tanpaAngka), `${f}: Coba ini dapat dieja`);
  }
  // Semua ucapan lab dieja menjadi kata.
  const ucapan = [
    A.ucapPakuK4B5A(xA),
    A.ucapPilahK4B5A(xA),
    A.ucapPilahK4B5A({ ...xA, mode: 2, pilah: { letak: Array(6).fill(null), dipilih: null } }),
    A.ucapKenaliK4B5A(xA),
    B.ucapSusunK4B5B(B.awalSusunK4B5B()),
    B.ucapUraiK4B5B({ ...B.awalSusunK4B5B(), bentuk: 3 }),
    B.ucapTangramK4B5B(B.awalSusunK4B5B()),
  ];
  cek(ucapan.every(tanpaAngka), "semua ucapan lab dieja menjadi kata");
  const pembungkus = baca("SimulasiK4Bab5", "tsx");
  const coba = [...pembungkus.matchAll(/"([^"]*\?)"/g)].map((m) => m[1]);
  cek(coba.length >= 6 && coba.every((t) => tanpaAngkaK3(t) && !/[°²³]/.test(t)), "Coba ini mesin dapat dieja");
}

/* ------------------------------ Data ringkas ------------------------------ */
{
  const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas4-bab5-ringkas.json", import.meta.url), "utf8"));
  cek(ringkas.chapter_id === "mtk-4-bab5" && ringkas.phase_code === "FASE_B" && ringkas.grade === 4, "ringkas: id bab, fase, kelas");
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
  // Tabel nama-sisi dihitung ulang dari data Kenali.
  const tabel = ringkas.subBab.A.infografis.panel[0].butir.find((b) => b.id === "nama").visual.baris;
  sama(tabel.map((r) => r[1]), ["3", "4", "5", "6"].map((k) => A.KENALI.find((g) => A.kelompokKenali(g) === k).lengkung.length), "ringkas A: tabel nama dan banyak sisi sesuai data");
  sama(Object.keys(ringkas.subBab), ["A", "B"], "ringkas: sub-bab A dan B");
  const tabelB = ringkas.subBab.B.infografis.panel[1].butir.find((b) => b.id === "hasil").visual.baris;
  sama(tabelB.map((r) => r[1]), [2, 3, 6], "ringkas B: persegi 2, trapesium 3, segienam 6 segitiga");
  sama(tabelB.map((r) => r[1]), [MS.KASUS_SUSUN[0].bagian.length, MS.KASUS_SUSUN[2].bagian.length, MS.KASUS_SUSUN[1].bagian.length], "ringkas B: tabel sesuai data mesin");
  const kepingB = ringkas.subBab.B.infografis.panel[2].butir.find((b) => b.id === "keping").visual.baris;
  sama(kepingB.map((r) => r[1]), [B.TANGRAM.filter((t) => t.nama.startsWith("segitiga")).length, B.TANGRAM.filter((t) => t.nama === "persegi").length, B.TANGRAM.filter((t) => t.nama === "jajargenjang").length], "ringkas B: keping tangram 5, 1, 1 (dari data lab)");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
