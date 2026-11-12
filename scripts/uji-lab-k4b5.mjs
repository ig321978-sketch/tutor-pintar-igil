// Uji Simulasi Kelas 4 Bab 5 (Bangun Datar): pengeja, Lab Ciri, mesin, skenario, misi, gerbang, data ringkas,
// dan konsep Sub-Bab B tidak bocor ke Sub-Bab A.
// Jalankan: node --no-warnings scripts/uji-lab-k4b5.mjs
import { readFileSync } from "node:fs";
import * as M0 from "../src/components/modul/misi-simulasi.ts";
import * as K5 from "../src/components/modul/misi-k4bab5.ts";
import * as TK from "../src/components/modul/misi-teks-k4b5.ts";
import * as A from "../src/components/modul/lab-ciri-k4b5a.ts";
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
    return s % n;
  };
};
const jalan = (awal, langkah, aksi) => aksi.reduce((s, a) => langkah(s, a), awal);
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
  sama(MS.SEMUA_MESIN_K4B5.map((d) => d.selesaiId), [K5.ID_MESIN_K4B5.A], "selesaiId mesin sama dengan id misi");

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
}

/* ------------------------------ Skenario ------------------------------ */
{
  const semua = [SK.SKENARIO_K4B5A];
  for (const def of semua) {
    cek(def.adegan.length >= 5 && def.adegan.length <= 8, `${def.id}: 5 sampai 8 adegan`);
    cek(def.adegan[0].jenis === "narasi" && def.adegan[def.adegan.length - 1].jenis === "akhir", `${def.id}: buka dan tutup`);
    cek(new Set(def.adegan.map((a) => a.jenis)).size >= 4, `${def.id}: paling sedikit empat jenis adegan`);
    for (const a of def.adegan.filter((x) => x.jenis === "soal")) for (const q of a.soal) cek(q.opsi.filter((o) => o !== q.jawaban).every((o) => Number(o) !== Number(q.jawaban)), `${def.id}/${a.id}: pengecoh salah (${q.teks})`);
    cek(def.adegan.every((a) => tanpaAngka(a.cerita)), `${def.id}: cerita dapat dieja`);
  }
  sama(semua.map((d) => d.id.replace(/-k4b5$/, "")), [K5.ID_SKENARIO_K4B5.A], "id skenario sesuai id misi");
  const adegan = (def, id) => def.adegan.find((a) => a.id === id);
  const S = SK.SKENARIO_K4B5A;
  cek(adegan(S, "enam").jumlah === A.KENALI.find((g) => g.id === "k-enam").lengkung.length, "A: segienam punya 6 sisi (dari data Kenali)");
  cek(/tertutup/.test(adegan(S, "segi").opsi.find((o) => o.benar).teks) && /lurus/.test(adegan(S, "segi").opsi.find((o) => o.benar).teks), "A: segi banyak tertutup dan lurus");
  cek(adegan(S, "klm").opsi.find((o) => o.benar).teks === "Segitiga siku-siku", "A: KLM siku di K (buku)");
  const sikuPersegi = [0, 1, 2, 3].filter((i) => Math.abs(sudutDerajat(...[[0, 0], [2, 0], [2, 2], [0, 2]].map((_, j, a) => a[(i + j + 3) % 4]).slice(0, 3)) - 90) < 1e-6).length;
  const sejajarDari = (pts) => [0, 1].filter((i) => kemiringan(pts[i], pts[(i + 1) % 4]) === kemiringan(pts[(i + 2) % 4], pts[(i + 3) % 4])).length;
  sama(adegan(S, "persegi").soal.map((q) => Number(q.jawaban)), [sikuPersegi, sejajarDari([[0, 0], [3, 0], [3, 2], [0, 2]]), sejajarDari([[0, 0], [3, 0], [2, 2], [1, 2]])], "A: persegi 4 siku, persegi panjang 2 pasang, trapesium 1 pasang (dihitung)");
  cek(adegan(S, "karet").target === [[0, 0], [2, 0], [2, 2], [0, 2]].length + [[0, 0], [2, 0], [0, 2]].length, "A: persegi dan segitiga 7 sisi (dihitung)");
}

/* ------------------------------ Misi ------------------------------ */
{
  const huruf = ["A"];
  sama(Object.keys(TK.MISI_K4B5), huruf, "teks misi untuk A");
  sama(Object.keys(TK.NAMA_SIM_K4B5), huruf, "nama simulasi untuk A");
  cek(TK.hurufK4B5("Z") === "A" && TK.hurufK4B5("A") === "A", "huruf tak dikenal jatuh ke A");
  cek(TK.misiAwalK4Bab5("A").startsWith("Simulasi 1. Misi: ") && tanpaAngka(TK.misiAwalK4Bab5("A")), "misi awal dan dapat dieja");
  for (const h of huruf) {
    const daftar = K5.daftarMisiK4Bab5(h);
    cek(daftar.filter((m) => m.wajib).length === 7 && daftar.filter((m) => !m.wajib).length === 3, `${h}: tujuh misi wajib dan tiga tantangan bebas`);
    cek(new Set(daftar.map((m) => m.id)).size === 10 && daftar.every((m) => m.id.startsWith(`${h.toLowerCase()}-`)), `${h}: id misi unik berawalan huruf`);
    const kosong = [{ alat: "ciri", pernah: [] }, sel("tidak-ada"), A.keadaanCiriK4B5A(A.awalCiriK4B5A())];
    cek(kosong.every((k) => M0.misiBaru(daftar, k, new Set()).length === 0), `${h}: keadaan awal alat tidak memenuhi misi mana pun`);
    cek(daftar.every((m) => m.teks.length > 20 && tanpaAngka(m.teks)), `${h}: teks misi jelas dan dapat dieja`);
    const baru = (k) => M0.misiBaru(daftar, k, new Set());
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
  catat(tanpaKomentar(baca("SimulasiK4Bab5", "tsx")), "pembungkus (tanpa komentar)");
  for (const p of globalThis.__pesanA) catat(p, "pesan lab dari fuzz");
  const xA = A.awalCiriK4B5A();
  for (const u of [A.ucapPakuK4B5A(xA), A.ucapPilahK4B5A(xA), A.ucapKenaliK4B5A(xA)]) catat(u, "ucapan lab");

  // Kunci tidak bocor ke klien.
  const KOMP = ["SimulasiLabCiriK4B5", "SimulasiK4Bab5", "model-bangun-k4b5"];
  for (const f of KOMP) {
    const s = baca(f, "tsx");
    cek(!/correct_index|explanation/.test(s), `${f}: tidak memuat correct_index atau explanation`);
    cek(!/fetch\(|XMLHttpRequest|api\/|openai|anthropic|gemini/i.test(s), `${f}: tanpa jaringan atau model bahasa`);
  }
  const LOGIKA = ["lab-ciri-k4b5a", "mesin-data-k4b5", "skenario-k4b5", "misi-k4bab5", "misi-teks-k4b5", "eja-k4b5"];
  for (const f of LOGIKA) {
    const s = baca(f, "ts");
    cek(!/fetch\(|XMLHttpRequest|from "react"|openai|anthropic|gemini|correct_index|explanation/i.test(s), `${f}: murni`);
    const impor = s.match(/^import .+$/gm) ?? [];
    cek(impor.every((l) => l.startsWith("import type")), `${f}: hanya mengimpor tipe`);
  }
  for (const f of ["SimulasiLabCiriK4B5"]) {
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
  ];
  cek(ucapan.every(tanpaAngka), "semua ucapan lab dieja menjadi kata");
  const pembungkus = baca("SimulasiK4Bab5", "tsx");
  const coba = [...pembungkus.matchAll(/"([^"]*\?)"/g)].map((m) => m[1]);
  cek(coba.length >= 3 && coba.every((t) => tanpaAngkaK3(t) && !/[°²³]/.test(t)), "Coba ini mesin dapat dieja");
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
  sama(Object.keys(ringkas.subBab), ["A"], "ringkas: gelombang ini hanya sub-bab A");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
