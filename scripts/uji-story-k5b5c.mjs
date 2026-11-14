// Uji Story Kelas 5 Bab 5 Sub-Bab C (luas daerah bangun gabungan): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// teks bertumpuk, pemisahan materi dan metode luar, tidak membocorkan Sub-Bab D, kutipan buku (bila PDF ada), hitungan mandiri
// (luas bangun dari titik-titiknya, luas dengan hitung titik petak, jumlah bagian, hitungan di teks gambar), geometri gambar
// (bentuk potongan sebangun dengan data, diagonal tegak lurus, sisi sejajar, letak dan skala), emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k5b5c.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k5b5c-video.ts");
const G = await import("../src/components/modul/story/k5b5c-gambar.ts");
const M1 = await import("../src/components/modul/story/k5b5c-materi-1.ts");
const M3 = await import("../src/components/modul/story/k5b5c-materi-3.ts");

const stat = { bentuk: 0, hitung: 0, garis: 0, teksPasang: 0 };
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
const hampir = (a, b, tol, pesan) => cek(Math.abs(a - b) <= tol, `${pesan}: ${a} != ${b} (toleransi ${tol})`);

cek(typeof L.keadaanStory === "function" && typeof L.posisiKata === "function", "mesin Story tersedia");

/* ------------------------------ Geometri umum, ditulis mandiri ------------------------------ */
const jml = (a) => a.reduce((t, x) => t + x, 0);
const bilangan = (d) => (d.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);
/** Titik mutlak bangun dari jalur tertutup lurus (M, L, ..., Z). */
const titikJalur = (o) => {
  const d = o.d ?? "";
  if (!/^M[-\d. L]+ Z$/.test(d)) return null;
  const n = bilangan(d);
  if (n.length < 6 || n.length % 2 !== 0) return null;
  const out = [];
  for (let i = 0; i < n.length; i += 2) out.push([(o.x ?? 0) + n[i], (o.y ?? 0) + n[i + 1]]);
  return out;
};
/** Luas dengan membagi bangun menjadi segitiga dari titik pertama (bukan rumus tali sepatu seperti di gambar). */
const luasKipas = (t) => {
  let jumlah = 0;
  for (let i = 1; i < t.length - 1; i += 1) {
    const a = [t[i][0] - t[0][0], t[i][1] - t[0][1]];
    const b = [t[i + 1][0] - t[0][0], t[i + 1][1] - t[0][1]];
    jumlah += (a[0] * b[1] - a[1] * b[0]) / 2;
  }
  return Math.abs(jumlah);
};
/** Luas dengan mencacah titik contoh pada kisi halus (cara ketiga, tidak memakai rumus). */
const luasCacah = (t, langkah = 0.05) => {
  const xs = t.map((p) => p[0]);
  const ys = t.map((p) => p[1]);
  let isi = 0;
  const dalam = (x, y) => {
    let masuk = false;
    for (let i = 0, j = t.length - 1; i < t.length; j = i, i += 1) {
      const [xi, yi] = t[i];
      const [xj, yj] = t[j];
      if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) masuk = !masuk;
    }
    return masuk;
  };
  for (let x = Math.min(...xs) + langkah / 2; x < Math.max(...xs); x += langkah) for (let y = Math.min(...ys) + langkah / 2; y < Math.max(...ys); y += langkah) if (dalam(x, y)) isi += 1;
  return isi * langkah * langkah;
};
const jarak = (p, q) => Math.hypot(q[0] - p[0], q[1] - p[1]);
const lurus = (p, q, r, s) => Math.abs((q[0] - p[0]) * (s[1] - r[1]) - (q[1] - p[1]) * (s[0] - r[0])) < 1e-9;
const tegak = (p, q, r, s) => Math.abs((q[0] - p[0]) * (s[0] - r[0]) + (q[1] - p[1]) * (s[1] - r[1])) < 1e-9;

/* ------------------------------ Data buku, ditulis ulang mandiri dari halaman PDF ------------------------------ */
// Buku Siswa hlm. 158 dan Panduan Guru hlm. 230: bangun ABCDE pada petak; kunci 15 satuan luas.
const BUKU = {
  eks: { layang: 10, segitigaAtas: 5, jajar: 10, segitigaBawah: 5, total: 15 },
  // Panduan Guru hlm. 236-241: kunci Uji Kompetensi.
  uji1: 216,
  uji2: { jajar: 128, segitiga: 96, total: 224 },
  uji3: { layang: 10, trap1: 12, segitiga: 2, trap2: 20, total: 22 },
  // Cara 1 Panduan Guru hlm. 237 memberi 20; rubrik hlm. 241 memberi 22 (trapesium memakai 3 + 1, tidak cocok dengan petak).
  uji4: { pp1: 8, pp2: 6, trap: 6, total: 20, rubrik: 22 },
  skor: [4, 6, 10, 10],
};

// Luas semua bangun data, dihitung tiga cara yang berbeda.
const DATA = [
  ["EKS_BANGUN", G.EKS_BANGUN, BUKU.eks.total],
  ["EKS_LAYANG", G.EKS_LAYANG, BUKU.eks.layang],
  ["EKS_SEGITIGA_ATAS", G.EKS_SEGITIGA_ATAS, BUKU.eks.segitigaAtas],
  ["EKS_JAJAR", G.EKS_JAJAR, BUKU.eks.jajar],
  ["EKS_SEGITIGA_BAWAH", G.EKS_SEGITIGA_BAWAH, BUKU.eks.segitigaBawah],
  ["EKS_LUAR", G.EKS_LUAR, 24],
  ["EKS_BUANG0", G.EKS_BUANG[0], 1],
  ["EKS_BUANG1", G.EKS_BUANG[1], 1],
  ["EKS_BUANG2", G.EKS_BUANG[2], 7],
  ["UJI1", G.UJI1, BUKU.uji1],
  ["UJI1_LUAR", G.UJI1_LUAR, 432],
  ["UJI2", G.UJI2, BUKU.uji2.total],
  ["UJI2_JAJAR", G.UJI2_JAJAR, BUKU.uji2.jajar],
  ["UJI2_SEGITIGA", G.UJI2_SEGITIGA, BUKU.uji2.segitiga],
  ["UJI3", G.UJI3, BUKU.uji3.total],
  ["UJI3_LAYANG", G.UJI3_LAYANG, BUKU.uji3.layang],
  ["UJI3_TRAP_1", G.UJI3_TRAP_1, BUKU.uji3.trap1],
  ["UJI3_SEGITIGA", G.UJI3_SEGITIGA, BUKU.uji3.segitiga],
  ["UJI3_TRAP_2", G.UJI3_TRAP_2, BUKU.uji3.trap2],
  ["UJI4", G.UJI4, BUKU.uji4.total],
  ["UJI4_PP1", G.UJI4_PP1, BUKU.uji4.pp1],
  ["UJI4_PP2", G.UJI4_PP2, BUKU.uji4.pp2],
  ["UJI4_TRAP", G.UJI4_TRAP, BUKU.uji4.trap],
  ["UJI4_LUAR", G.UJI4_LUAR, 28],
  ["UJI4_RELUNG", G.UJI4_RELUNG, 6],
  ["UJI4_SUDUT", G.UJI4_SUDUT, 2],
  ["TRAP_RUBRIK", [[0, 0], [1, 0], [2, 4], [0, 4]], 6],
];
for (const [nama, t, luas] of DATA) {
  hampir(G.luasTitik(t), luas, 1e-9, `luas ${nama} (rumus di gambar) sama dengan data buku`);
  hampir(luasKipas(t), luas, 1e-9, `luas ${nama} (segitiga dari titik pertama) sama dengan data buku`);
  hampir(luasCacah(t), luas, Math.max(0.15, luas * 0.01), `luas ${nama} (cacah titik contoh) sama dengan data buku`);
}
// Bagian menyusun seluruhnya: jumlah dan selisih.
sama([BUKU.eks.layang + BUKU.eks.segitigaAtas, BUKU.eks.jajar + BUKU.eks.segitigaBawah], [15, 15], "cara Yohana dan cara Komang sama-sama 15");
sama(BUKU.uji2.jajar + BUKU.uji2.segitiga, 224, "soal 2: 128 + 96");
sama([BUKU.uji3.layang + BUKU.uji3.trap1, BUKU.uji3.segitiga + BUKU.uji3.trap2], [22, 22], "soal 3: dua cara sama-sama 22");
sama(BUKU.uji4.pp1 + BUKU.uji4.pp2 + BUKU.uji4.trap, 20, "soal 4: 8 + 6 + 6");
sama(24 - 1 - 1 - 7, 15, "ABCDE: pembungkus dikurangi tiga daerah kosong");
sama(28 - 6 - 2, 20, "bangun B: pembungkus dikurangi dua daerah kosong");
sama(432 / 2, 216, "layang-layang separuh persegi panjang pembungkus");
sama(BUKU.skor.reduce((a, b) => a + b, 0), 30, "total skor rubrik");
// Trapesium rubrik 3 + 1 memang menghasilkan 22, tidak cocok dengan petak (1 + 2 menghasilkan 20).
sama([8 + 6 + (0.5 * (3 + 1) * 4), 8 + 6 + (0.5 * (1 + 2) * 4)], [BUKU.uji4.rubrik, BUKU.uji4.total], "rubrik 22 dan petak 20");
// Sisi dan diagonal dari titik data.
{
  const [A, E, C, B] = G.EKS_LAYANG;
  hampir(jarak(A, C), 5, 1e-9, "diagonal 1 layang-layang ABCDE = 5");
  hampir(jarak(E, B), 4, 1e-9, "diagonal 2 layang-layang ABCDE = 4");
  cek(tegak(A, C, E, B), "diagonal layang-layang ABCDE saling tegak lurus");
  const [a, e, d, c] = G.EKS_JAJAR;
  cek(lurus(a, e, c, d) && lurus(a, c, e, d), "AEDC jajargenjang: sisi berhadapan sejajar");
  hampir(jarak(a, c), 5, 1e-9, "alas jajargenjang AEDC = 5");
  hampir(Math.abs(e[1] - a[1]), 2, 1e-9, "tinggi jajargenjang AEDC = 2");
  const [e2, d2, c2] = G.EKS_SEGITIGA_ATAS;
  hampir(jarak(e2, d2), 5, 1e-9, "alas segitiga EDC = 5 (alas di atas)");
  hampir(Math.abs(c2[1] - e2[1]), 2, 1e-9, "tinggi segitiga EDC = 2");
  const [a3, b3, c3] = G.EKS_SEGITIGA_BAWAH;
  hampir(jarak(a3, c3), 5, 1e-9, "alas segitiga ABC = 5");
  hampir(Math.abs(b3[1] - a3[1]), 2, 1e-9, "tinggi segitiga ABC = 2");
  const k1 = G.UJI1;
  hampir(jarak(k1[0], k1[2]), 24, 1e-9, "soal 1: diagonal 24");
  hampir(jarak(k1[1], k1[3]), 18, 1e-9, "soal 1: diagonal 18");
  cek(tegak(k1[0], k1[2], k1[1], k1[3]), "soal 1: diagonal saling tegak lurus");
  const k3 = G.UJI3_LAYANG;
  hampir(jarak(k3[0], k3[2]), 5, 1e-9, "soal 3: diagonal 5");
  hampir(jarak(k3[1], k3[3]), 4, 1e-9, "soal 3: diagonal 4");
  cek(tegak(k3[0], k3[2], k3[1], k3[3]), "soal 3: diagonal layang-layang tegak lurus");
  // trapesium soal 3 cara 1: sisi sejajar tegak 2 dan 4, tinggi 4
  const t1 = G.UJI3_TRAP_1;
  cek(lurus(t1[0], t1[3], t1[1], t1[2]), "soal 3 cara 1: sisi kiri dan kanan trapesium sejajar");
  sama([jarak(t1[0], t1[3]), jarak(t1[1], t1[2]), Math.abs(t1[1][0] - t1[0][0])], [2, 4, 4], "soal 3 cara 1: sisi sejajar 2 dan 4, tinggi 4");
  const t2 = G.UJI3_TRAP_2;
  sama([jarak(t2[0], t2[3]), jarak(t2[1], t2[2]), Math.abs(t2[1][0] - t2[0][0])], [6, 4, 4], "soal 3 cara 2: sisi sejajar 6 dan 4, tinggi 4");
  const s3 = G.UJI3_SEGITIGA;
  sama([jarak(s3[0], s3[2]), Math.abs(s3[1][0] - s3[0][0])], [4, 1], "soal 3 cara 2: segitiga beralas 4 tinggi 1");
  const j2 = G.UJI2_JAJAR;
  cek(lurus(j2[0], j2[3], j2[1], j2[2]) && jarak(j2[3], j2[2]) === 16 && Math.abs(j2[0][1] - j2[3][1]) === 8, "soal 2: jajargenjang alas 16 tinggi 8");
  const g2 = G.UJI2_SEGITIGA;
  cek(tegak(g2[0], g2[1], g2[1], g2[2]) && jarak(g2[0], g2[1]) === 16 && jarak(g2[1], g2[2]) === 12, "soal 2: segitiga siku-siku beralas 16 tinggi 12");
  const tr = G.UJI4_TRAP;
  sama([jarak(tr[0], tr[1]), jarak(tr[3], tr[2]) - 0, Math.abs(tr[3][1] - tr[0][1])], [1, 2, 4], "soal 4: trapesium sisi sejajar 1 dan 2, tinggi 4");
  cek(lurus(tr[0], tr[1], tr[3], tr[2]), "soal 4: sisi atas dan bawah trapesium sejajar");
}
// Bagian saling menutup bangun tanpa bertumpuk: jumlah luas = luas bangun dan tidak ada titik bagian yang di luar bangun.
{
  const dalamBangun = (bangun) => (p) => {
    let masuk = false;
    for (let i = 0, j = bangun.length - 1; i < bangun.length; j = i, i += 1) {
      const [xi, yi] = bangun[i];
      const [xj, yj] = bangun[j];
      if (yi > p[1] !== yj > p[1] && p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi) masuk = !masuk;
    }
    return masuk;
  };
  const pusat = (t) => [jml(t.map((p) => p[0])) / t.length, jml(t.map((p) => p[1])) / t.length];
  const susun = [
    ["Yohana", G.EKS_BANGUN, [G.EKS_LAYANG, G.EKS_SEGITIGA_ATAS]],
    ["Komang", G.EKS_BANGUN, [G.EKS_JAJAR, G.EKS_SEGITIGA_BAWAH]],
    ["soal 2", G.UJI2, [G.UJI2_JAJAR, G.UJI2_SEGITIGA]],
    ["soal 3 cara 1", G.UJI3, [G.UJI3_LAYANG, G.UJI3_TRAP_1]],
    ["soal 3 cara 2", G.UJI3, [G.UJI3_SEGITIGA, G.UJI3_TRAP_2]],
    ["soal 4", G.UJI4, [G.UJI4_PP1, G.UJI4_PP2, G.UJI4_TRAP]],
  ];
  for (const [nama, bangun, bagian] of susun) {
    hampir(jml(bagian.map(G.luasTitik)), G.luasTitik(bangun), 1e-9, `${nama}: jumlah luas bagian = luas bangun`);
    // titik contoh di dalam bagian: tepat satu bagian yang memuatnya, dan semuanya di dalam bangun
    let tumpuk = 0;
    let luar = 0;
    const xs = bangun.map((p) => p[0]);
    const ys = bangun.map((p) => p[1]);
    for (let x = Math.min(...xs) + 0.05; x < Math.max(...xs); x += 0.1) {
      for (let y = Math.min(...ys) + 0.05; y < Math.max(...ys); y += 0.1) {
        const n = bagian.filter((b) => dalamBangun(b)([x, y])).length;
        const di = dalamBangun(bangun)([x, y]);
        if (n > 1) tumpuk += 1;
        if ((n === 1) !== di) luar += 1;
      }
    }
    cek(tumpuk === 0 && luar === 0, `${nama}: bagian tidak bertumpuk dan tanpa celah (tumpuk ${tumpuk}, beda ${luar})`);
    void pusat;
  }
  // bangun pembungkus dikurangi daerah kosong sama dengan bangun
  hampir(G.luasTitik(G.EKS_LUAR) - jml(G.EKS_BUANG.map(G.luasTitik)), 15, 1e-9, "ABCDE: pembungkus dikurangi daerah kosong");
  hampir(G.luasTitik(G.UJI4_LUAR) - G.luasTitik(G.UJI4_RELUNG) - G.luasTitik(G.UJI4_SUDUT), 20, 1e-9, "bangun B: pembungkus dikurangi daerah kosong");
}

/* ------------------------------ Letak dan bentuk gambar yang dipakai ------------------------------ */
const L1 = M3.LETAK_UJI.u1;
const L2 = M3.LETAK_UJI.u2;
const L3 = M3.LETAK_UJI.u3;
const L4 = M3.LETAK_UJI.u4;
const PENTAGON = { ox: M1.OX, oy: M1.OY, s: M1.S };
const KENAL = {
  "e-b": [G.EKS_BANGUN, PENTAGON], yl: [G.EKS_LAYANG, PENTAGON], ys: [G.EKS_SEGITIGA_ATAS, PENTAGON], kj: [G.EKS_JAJAR, PENTAGON], ks: [G.EKS_SEGITIGA_BAWAH, PENTAGON],
  mt1: [G.EKS_LAYANG, PENTAGON], mt2: [G.EKS_SEGITIGA_ATAS, PENTAGON], lu: [G.EKS_LUAR, PENTAGON], b1: [G.EKS_BUANG[0], PENTAGON], b2: [G.EKS_BUANG[1], PENTAGON], b3: [G.EKS_BUANG[2], PENTAGON],
  "u1-b": [G.UJI1, L1], "u1-lu": [G.UJI1_LUAR, L1],
  "u2-b": [G.UJI2, L2], "u2-p1": [G.UJI2_JAJAR, L2], "u2-p2": [G.UJI2_SEGITIGA, L2],
  "u3-b": [G.UJI3, L3], "u3-p1": [G.UJI3_LAYANG, L3], "u3-p2": [G.UJI3_TRAP_1, L3], "u3-q1": [G.UJI3_SEGITIGA, L3], "u3-q2": [G.UJI3_TRAP_2, L3],
  "u4-b": [G.UJI4, L4], "u4-p1": [G.UJI4_PP1, L4], "u4-p2": [G.UJI4_PP2, L4], "u4-p3": [G.UJI4_TRAP, L4], "u4-lu": [G.UJI4_LUAR, L4], "u4-r1": [G.UJI4_RELUNG, L4], "u4-r2": [G.UJI4_SUDUT, L4],
  tp: [[[0, 0], [1, 0], [2, 4], [0, 4]], null],
  m1: [G.UJI1, null], m2: [G.UJI2, null], m3: [G.UJI3, null], m4: [G.UJI4, null],
};
/** Bentuk gambar sama persis (skala, geser) dengan data satuan; bila ada letak, skala dan titik asal juga cocok. */
const periksaBentuk = (nama, o, data, letak) => {
  const t = titikJalur(o);
  cek(!!t && t.length === data.length, `${nama}: ${o.id} berupa bangun ${data.length} titik`);
  if (!t || t.length !== data.length) return;
  stat.bentuk += 1;
  const s = jarak(t[0], t[1]) / jarak(data[0], data[1]);
  t.forEach((p, i) => {
    hampir(p[0] - t[0][0], s * (data[i][0] - data[0][0]), 0.15, `${nama}: ${o.id} titik ${i} (x) sebangun dengan data`);
    hampir(p[1] - t[0][1], s * (data[i][1] - data[0][1]), 0.15, `${nama}: ${o.id} titik ${i} (y) sebangun dengan data`);
  });
  hampir(luasKipas(t) / (s * s), G.luasTitik(data), 0.05, `${nama}: ${o.id} luas di gambar dibagi skala kuadrat = luas data`);
  if (letak) {
    hampir(s, letak.s, 0.01, `${nama}: ${o.id} berskala ${letak.s}`);
    hampir(t[0][0] - s * data[0][0], letak.ox, 0.15, `${nama}: ${o.id} berasal dari titik x ${letak.ox}`);
    hampir(t[0][1] - s * data[0][1], letak.oy, 0.15, `${nama}: ${o.id} berasal dari titik y ${letak.oy}`);
  }
};
/** Garis bantu: panjang sebenarnya (satuan) dan arah. */
const GARIS = {
  d1: [(id) => (id === "d1" ? [PENTAGON, 5, "mendatar"] : null)],
};
void GARIS;
const periksaGaris = (nama, o, id, panjang, letak, arah) => {
  stat.garis += 1;
  const dx = o.x2 ?? 0;
  const dy = o.y2 ?? 0;
  hampir(Math.hypot(dx, dy), panjang * letak.s, 0.15, `${nama}: garis ${id} panjangnya ${panjang} satuan`);
  if (arah === "mendatar") hampir(dy, 0, 0.01, `${nama}: garis ${id} mendatar`);
  if (arah === "tegak") hampir(dx, 0, 0.01, `${nama}: garis ${id} tegak`);
};
const GARIS_UJI = {
  "u1-d1": [L1, 24, "mendatar"], "u1-d2": [L1, 18, "tegak"],
  "u2-d1": [L2, 16, "mendatar"], "u2-d2": [L2, 8, "tegak"],
  "u3-d1": [L3, 5, "mendatar"], "u3-d2": [L3, 4, "tegak"],
};

/* ------------------------------ Hitungan dalam teks gambar ------------------------------ */
const ungkap = (s) => {
  let t = s.replace(/satuan luas|cm²|cm/g, "").replace(/^[^0-9½(]*:/, "").trim();
  if (!/^[0-9½+−×÷()\s.]+$/.test(t) || !/[0-9½]/.test(t)) return null;
  t = t.replace(/½/g, "0.5").replace(/×/g, "*").replace(/−/g, "-").replace(/÷/g, "/").replace(/(\d)\s+(?=\()/g, "$1*").replace(/(0\.5)\s*(?=[0-9(])/g, "$1*");
  try {
    return Function(`"use strict"; return (${t})`)();
  } catch {
    return null;
  }
};
const periksaHitung = (nama, isi) => {
  if (!isi.includes("=") || isi.includes("≠")) return;
  const nilai = isi
    .split("=")
    .map((s) => s.replace(/^bukan\s+/, ""))
    .map(ungkap)
    .filter((v) => v !== null);
  if (nilai.length < 2) return;
  stat.hitung += 1;
  cek(nilai.every((v) => Math.abs(v - nilai[0]) < 1e-9), `${nama}: hitungan di gambar benar "${isi}" (${nilai.join(" , ")})`);
};

/* ------------------------------ Isi dua video ------------------------------ */
const VIDEO = [V.VIDEO_MATERI_K5B5C, V.VIDEO_LUAR_K5B5C];
const bilanganDari = (t) => (t.match(/\d[\d.]*\d|\d/g) ?? []).map((v) => v.replace(/\./g, ""));
const semuaSidik = new Map();
let totalKetukan = 0;
let totalKata = 0;
const kotakTeks = (o) => {
  const u = o.u ?? 10;
  const lebar = (o.isi ?? "").length * u * 0.58;
  const x = o.x ?? 0;
  const kiri = (o.anchor ?? "middle") === "middle" ? x - lebar / 2 : (o.anchor ?? "middle") === "end" ? x - lebar : x;
  const y = o.y ?? 0;
  return [kiri, y - u * 0.75, kiri + lebar, y + u * 0.2];
};
for (const v of VIDEO) {
  cek(v.adegan.length >= 7, `${v.id}: paling sedikit 7 adegan (ada ${v.adegan.length})`);
  cek(["materi", "metode-luar"].includes(v.jenis) && v.judul.length > 5 && v.subjudul.length > 5, `${v.id}: jenis dan judul ada`);
  cek(new Set(v.adegan.map((a) => a.id)).size === v.adegan.length, `${v.id}: id adegan unik`);
  for (const a of v.adegan) {
    const nama = `${v.id}/${a.id}`;
    cek(a.ketukan.length >= 4 && a.ketukan.length <= 14, `${nama}: 4 sampai 14 ketukan (ada ${a.ketukan.length})`);
    cek(a.sumber.length > 8 && a.judul.length > 5 && /^#[0-9A-Fa-f]{6}$/.test(a.latar), `${nama}: sumber, judul, dan latar ada`);
    let sebelumnya = null;
    const terlihat = new Set();
    a.ketukan.forEach((kt, i) => {
      const kata = L.kataDari(kt.suara);
      totalKetukan += 1;
      totalKata += kata.length;
      cek(kata.length >= 6 && kata.length <= 40, `${nama}#${i + 1}: 6 sampai 40 kata (ada ${kata.length})`);
      cek(!/[=×÷<>/%]/.test(kt.suara), `${nama}#${i + 1}: suara tanpa lambang yang sulit dibaca mesin suara`);
      cek(/[.?!]$/.test(kt.suara.trim()), `${nama}#${i + 1}: suara berakhir tanda baca`);
      cek(kt.aksi.length >= 1, `${nama}#${i + 1}: ada aksi gambar`);
      for (const ak of kt.aksi) {
        const p = L.posisiKata(kt.suara, ak.at);
        cek(p >= 0, `${nama}#${i + 1}: pemicu "${ak.at}" ditemukan dalam kalimat`);
        if (typeof ak.at === "number") cek(ak.at >= 0 && ak.at < kata.length, `${nama}#${i + 1}: pemicu angka ${ak.at} dalam batas`);
      }
      // ubah dan hapus harus menyasar benda yang ada saat itu (urutan aksi sama dengan urutan penerapan mesin)
      {
        const peta = new Set(L.keadaanStory(a, i - 1, 9999).map((o) => o.id));
        if (i === 0) peta.clear();
        for (const ak of kt.aksi) {
          if (ak.bersih) peta.clear();
          for (const id of ak.hapus === undefined ? [] : [].concat(ak.hapus)) {
            cek(peta.has(id), `${nama}#${i + 1}: hapus "${id}" menyasar benda yang ada`);
            peta.delete(id);
          }
          for (const o of ak.tambah === undefined ? [] : [].concat(ak.tambah)) peta.add(o.id);
          for (const u of ak.ubah === undefined ? [] : [].concat(ak.ubah)) cek(peta.has(u.id), `${nama}#${i + 1}: ubah "${u.id}" menyasar benda yang ada`);
        }
      }
      const akhir = L.keadaanStory(a, i, 9999);
      const sidik = L.sidikKeadaan(akhir);
      cek(sebelumnya === null || sidik !== sebelumnya, `${nama}#${i + 1}: gambar berubah dibanding ketukan sebelumnya`);
      sebelumnya = sidik;
      if (i === a.ketukan.length - 1) {
        const lama = semuaSidik.get(sidik);
        cek(!lama, `${nama}: gambar akhir adegan tidak sama dengan adegan lain (${lama ?? ""})`);
        semuaSidik.set(sidik, nama);
      }
      cek(new Set(akhir.map((o) => o.id)).size === akhir.length, `${nama}#${i + 1}: id benda unik`);
      // sinkron angka: tiap bilangan dalam suara tampak di gambar pada ketukan ini atau sebelumnya
      for (let p = 0; p < kata.length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) for (const b of bilanganDari(o.isi)) terlihat.add(b);
      for (const b of bilanganDari(kt.suara)) cek(terlihat.has(b), `${nama}#${i + 1}: bilangan ${b} di suara tampak di gambar`);
      // gambar mengikuti kata
      const titikAksi = [...new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at)))].sort((m, n) => m - n);
      if (titikAksi.length >= 2) {
        const sid = titikAksi.map((p) => L.sidikKeadaan(L.keadaanStory(a, i, p)));
        cek(new Set(sid).size >= 2, `${nama}#${i + 1}: gambar berubah mengikuti kata dalam kalimat`);
      }
      // gambar masuk kanvas 300 x 208
      for (const o of akhir) {
        const x = o.x ?? 0;
        const y = o.y ?? 0;
        if (o.t === "teks") {
          const lebar = (o.isi ?? "").length * (o.u ?? 10) * 0.56;
          const kiri = (o.anchor ?? "middle") === "middle" ? x - lebar / 2 : (o.anchor ?? "middle") === "end" ? x - lebar : x;
          cek(y > 0 && y < 200 && kiri > -4 && kiri + lebar < 304, `${nama}#${i + 1}: teks "${o.isi}" masuk kanvas (x=${x}, y=${y}, lebar=${Math.round(lebar)})`);
        } else if (o.t === "kotak") cek(x > -2 && y > -2 && x + (o.w ?? 0) < 302 && y + (o.h ?? 0) < 202, `${nama}#${i + 1}: kotak ${o.id} masuk kanvas`);
        else if (o.t === "bulat") cek(x - (o.r ?? 0) > -2 && x + (o.r ?? 0) < 302 && y - (o.r ?? 0) > -2 && y + (o.r ?? 0) < 210, `${nama}#${i + 1}: bulat ${o.id} masuk kanvas`);
        else if (o.t === "jalur") {
          const t = titikJalur(o);
          if (t) cek(t.every((p) => p[0] > -2 && p[0] < 302 && p[1] > -2 && p[1] < 204), `${nama}#${i + 1}: bangun ${o.id} masuk kanvas`);
          else {
            const n = bilangan(o.d ?? "");
            const xs = n.filter((_, q) => q % 2 === 0).map((q) => x + q);
            const ys = n.filter((_, q) => q % 2 === 1).map((q) => y + q);
            cek(xs.every((q) => q > -2 && q < 302) && ys.every((q) => q > -2 && q < 204), `${nama}#${i + 1}: jalur ${o.id} masuk kanvas`);
          }
        } else if (o.t === "garis" || o.t === "panah") cek(x > -2 && x < 302 && y > -2 && y < 204 && x + (o.x2 ?? 0) > -2 && x + (o.x2 ?? 0) < 302 && y + (o.y2 ?? 0) > -2 && y + (o.y2 ?? 0) < 204, `${nama}#${i + 1}: garis ${o.id} masuk kanvas`);
      }
      // teks tidak boleh bertumpuk
      {
        const teksAda = akhir.filter((o) => o.t === "teks" && (o.op ?? 1) > 0 && o.isi && !/^[\u{1F000}-\u{1FFFF}]|^[✂✓🔁]$/u.test(o.isi));
        for (let p = 0; p < teksAda.length; p += 1) {
          for (let q = p + 1; q < teksAda.length; q += 1) {
            stat.teksPasang += 1;
            const m = kotakTeks(teksAda[p]);
            const n = kotakTeks(teksAda[q]);
            const lx = Math.min(m[2], n[2]) - Math.max(m[0], n[0]);
            const ly = Math.min(m[3], n[3]) - Math.max(m[1], n[1]);
            cek(!(lx > 1 && ly > 1), `${nama}#${i + 1}: teks "${teksAda[p].isi}" (${teksAda[p].id}) bertumpuk dengan "${teksAda[q].isi}" (${teksAda[q].id})`);
          }
        }
      }
      // geometri: bentuk potongan sebangun dengan data, garis bantu, dan hitungan dalam teks
      for (const o of akhir) {
        if (o.t === "jalur" && KENAL[o.id]) periksaBentuk(nama, o, KENAL[o.id][0], KENAL[o.id][1]);
        if (o.t === "garis" && GARIS_UJI[o.id]) periksaGaris(nama, o, o.id, GARIS_UJI[o.id][1], GARIS_UJI[o.id][0], GARIS_UJI[o.id][2]);
        if (o.t === "garis" && /^(d1|d2|pb|th|t1|t2)$/.test(o.id) && a.id.match(/yohana|komang/)) {
          const tabelGaris = { d1: [5, "mendatar"], d2: [4, "tegak"], pb: [5, "mendatar"], th: [2, "tegak"], t1: [2, "tegak"], t2: [2, "tegak"] };
          periksaGaris(nama, o, o.id, tabelGaris[o.id][0], PENTAGON, tabelGaris[o.id][1]);
        }
        if (o.t === "teks" && o.isi) periksaHitung(`${nama}#${i + 1}`, o.isi);
      }
    });
  }
}

/* ------------------------------ Pemisahan materi dan metode luar ------------------------------ */
const seluruhTeks = (v) => v.adegan.map((a) => [a.judul, a.sumber, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const M = V.VIDEO_MATERI_K5B5C;
const U = V.VIDEO_LUAR_K5B5C;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const nilaiId = (objs, id) => objs.find((o) => o.id === id)?.isi;
{
  const teksVideo = (v) => JSON.stringify(seluruhTeks(v));
  const NAMA_METODE = /Additive|Composite|Subtractive|Rearrangement|Invariance|Outer Rectangle|metode luar|metode dari luar/i;
  const materi = teksVideo(M);
  const luar = teksVideo(U);
  cek(!NAMA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of ["Additive Decomposition", "Composite Area Strategy", "Subtractive Decomposition", "Outer Rectangle Minus Cutout", "Rearrangement Invariance Check"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(M.adegan.every((a) => /(Buku Siswa|Panduan Guru) hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(U.adegan.every((a) => /metode (dari )?luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  for (const kata of ["Eksplorasi 5.3", "Cara Yohana", "Cara Komang", "layang-layang", "jajargenjang", "segitiga", "trapesium", "dekomposisi", "Miskonsepsi", "Diferensiasi", "Refleksi", "nomor 13 dan 14", "Uji Kompetensi", "rubrik", "tidak langsung diketahui|belum diketahui|tidak tertulis", "alasnya ada di atas|alasnya di atas|alas ada di atas", "kertas berpetak", "proyektor", "224", "216", "22"]) cek(new RegExp(kata, "i").test(materi), `video materi memuat "${kata}"`);
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-additif", "luar-additif-terapan", "luar-komposit", "luar-komposit-terapan", "luar-kurang", "luar-kurang-terapan", "luar-kekal", "luar-kekal-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk empat metode");
  cek(M.adegan.length === 12 && U.adegan.length === 10, "12 adegan materi dan 10 adegan metode luar");
  // Sub-Bab C tidak membocorkan Sub-Bab D (hubungan keliling dan luas, Eksplorasi 5.4, pengayaan kolam) dan tidak memakai Refleksi 15 sampai 18.
  const BOCOR = /keliling|isoperimeter|isoperimetri|kawat|kolam|Eksplorasi 5\.4|nomor (lima belas|enam belas|tujuh belas|delapan belas)|\b1[5-8]\.\s*Aku/i;
  cek(!BOCOR.test(materi + luar), "tidak membocorkan Sub-Bab D (keliling, kawat, kolam, Eksplorasi 5.4, Refleksi 15 sampai 18)");
  cek(!/Eksplorasi 5\.[12]|persegi panjang berukuran 4 kali 3/i.test(materi + luar), "tidak mengulang eksplorasi Sub-Bab A dan B");
  cek(totalKetukan >= 80, `total ketukan cukup dalam (${totalKetukan})`);
}

/* ------------------------------ Hitungan isi, dihitung mandiri ------------------------------ */
{
  // Pentagon ABCDE: titik data cocok dengan huruf di gambar dan petak 7 x 4.
  {
    const a = adegan(M, "eksplorasi-bangun");
    const t = akhirAdegan(a, 2);
    sama(["A", "B", "C", "D", "E"].map((h) => nilaiId(t, `h-${h}`)), ["A", "B", "C", "D", "E"], "lima titik sudut A sampai E diberi huruf");
    const pet = t.find((o) => o.id === "e-g");
    cek(!!pet && (pet.d.match(/M/g) ?? []).length === 7 + 1 + 4 + 1, "petak Eksplorasi 5.3: 7 kolom dan 4 baris (garis 8 tegak dan 5 mendatar)");
    for (const [h, p] of Object.entries(G.EKS)) {
      const huruf = t.find((o) => o.id === `h-${h}`);
      cek(jarak([huruf.x, huruf.y], [PENTAGON.ox + p[0] * PENTAGON.s, PENTAGON.oy + p[1] * PENTAGON.s]) < 16, `huruf ${h} berada di dekat titik sudutnya`);
    }
  }
  // Ketukan hitungan cara Yohana dan Komang.
  {
    const y = akhirAdegan(adegan(M, "cara-yohana"));
    sama(["hs-t0"].map((id) => nilaiId(y, id)), ["10 + 5 = 15 satuan luas"], "cara Yohana: jumlah akhir");
    const km = akhirAdegan(adegan(M, "cara-komang"));
    sama([nilaiId(km, "hy-t0"), nilaiId(km, "hk-t0")], ["Yohana: 10 + 5 = 15", "Komang: 10 + 5 = 15"], "kedua cara berujung 15");
  }
  // Uji Kompetensi: hasil akhir tiap soal.
  {
    sama(nilaiId(akhirAdegan(adegan(M, "uji-1")), "u1-h-t0"), "216 cm²", "soal 1: hasil 216");
    sama(nilaiId(akhirAdegan(adegan(M, "uji-2")), "u2-h-t0"), "128 + 96 = 224", "soal 2: 128 + 96 = 224");
    sama(nilaiId(akhirAdegan(adegan(M, "uji-3"), 4), "u3-h-t0"), "10 + 12 = 22", "soal 3 cara 1: 10 + 12 = 22");
    sama(nilaiId(akhirAdegan(adegan(M, "uji-3")), "u3-z-t0"), "2 + 20 = 22", "soal 3 cara 2: 2 + 20 = 22");
    sama(nilaiId(akhirAdegan(adegan(M, "uji-4"), 3), "u4-h-t0"), "8 + 6 + 6 = 20", "soal 4: 8 + 6 + 6 = 20");
    const w = akhirAdegan(adegan(M, "uji-4"));
    sama([nilaiId(w, "u4-w1-t0"), nilaiId(w, "u4-w2-t0")], ["rubrik: (3 + 1) → 22", "petak: (2 + 1) → 20"], "soal 4: selisih rubrik dan petak ditulis");
  }
  // Rubrik: skor maksimum 4, 6, 10, 10 dan total 30.
  {
    const r = akhirAdegan(adegan(M, "rubrik"), 1);
    sama(["rb-t10", "rb2-t00", "rb3-t00", "rb4-t00"].map((id) => nilaiId(r, id)), ["1", "2", "3", "4"], "nomor soal pada tabel rubrik");
    sama(["rb-t11", "rb2-t01", "rb3-t01", "rb4-t01"].map((id) => nilaiId(r, id)), BUKU.skor.map(String), "skor maksimum tiap nomor pada tabel rubrik");
    sama(nilaiId(r, "tt-t0"), "total skor: 30", "total skor 30 pada tabel rubrik");
  }
  // Refleksi nomor 13 dan 14 dikutip dari buku.
  {
    const t = akhirAdegan(adegan(M, "penguatan-refleksi"), 3);
    cek(/^13\. Aku bisa mendekomposisi daerah bangun gabungan/.test(nilaiId(t, "r13-t0")) && /^14\. Aku bisa menemukan cara menghitung luas/.test(nilaiId(t, "r14-t0")), "Refleksi 13 dan 14 sesuai teks buku");
  }
  // Ringkasan metode luar: angka contoh sama dengan data.
  {
    const t = akhirAdegan(adegan(U, "luar-ringkas"), 2);
    sama([1, 2, 3, 4].map((r) => nilaiId(t, `kn-t${r}2`)), ["128 + 96 = 224", "10 + 12 = 22", "28 − 6 − 2 = 20", "15 = 15"], "ringkasan: angka contoh empat metode");
  }
  // Tiga potongan kosong di luar bangun ABCDE.
  {
    const t = akhirAdegan(adegan(U, "luar-kurang"), 2);
    sama(["v1", "v2", "v3"].map((id) => nilaiId(t, id)), ["1", "1", "7"], "tiga daerah kosong ABCDE: 1, 1, 7");
    sama(jml(["v1", "v2", "v3"].map((id) => Number(nilaiId(t, id)))), 24 - 15, "jumlah daerah kosong = pembungkus 24 dikurangi bangun 15");
  }
}

/* ------------------------------ Kutipan buku (bila PDF tersedia) ------------------------------ */
{
  const bs = new URL("../bahan-sd/Matematika-BS-KLS-V.pdf", import.meta.url);
  const bg = new URL("../bahan-sd/Matematika-BG-KLS-V.pdf", import.meta.url);
  const jalur = (u) => u.pathname.replace(/^\/([A-Za-z]:)/, "$1");
  const ambil = (berkas, dari, sampai) => {
    const r = spawnSync("pdftotext", ["-f", String(dari), "-l", String(sampai), "-raw", jalur(berkas), "-"], { encoding: "utf8", maxBuffer: 1 << 26 });
    return r.status === 0 ? r.stdout : null;
  };
  // Buku Siswa hlm. 158-159 = PDF 174-175, Refleksi hlm. 161 = PDF 177, Uji Kompetensi hlm. 162 = PDF 178;
  // Panduan Guru hlm. 228-232 = PDF 240-244, kunci dan rubrik hlm. 236-241 = PDF 248-253.
  const bagian = existsSync(bs) && existsSync(bg) ? [ambil(bs, 174, 175), ambil(bs, 177, 178), ambil(bg, 240, 244), ambil(bg, 248, 253)] : [null];
  if (bagian.some((b) => b === null)) console.log("PDF atau pdftotext tidak tersedia: pemeriksaan kutipan buku dilewati");
  else {
    const bersih = (t) => t.toLowerCase().replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim();
    const buku = bersih(bagian.join("\n"));
    let n = 0;
    for (const a of M.adegan) for (const kt of a.kutipan ?? []) {
      n += 1;
      cek(buku.includes(bersih(kt)), `kutipan buku ${a.id}: "${kt}" ada di teks PDF`);
    }
    cek(n >= 60, `jumlah kutipan buku yang diperiksa (${n})`);
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k5b5c-.*)\.(ts|tsx)$/.test(f));
  cek(berkas.length >= 8, `berkas story ditemukan (${berkas.length})`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    const buruk = [...s].filter((c) => {
      const kode = c.codePointAt(0);
      return kode > 0x1fa95 || kode === 0x1f7f0 || kode === 0x200d;
    });
    cek(buruk.length === 0, `${f}: tanpa emoji di atas Emoji 12 dan tanpa ZWJ (${buruk.map((c) => c.codePointAt(0).toString(16)).join()})`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: UTF-8 tanpa BOM dan akhir baris LF`);
    cek(!/fetch\(|XMLHttpRequest|openai|anthropic|gemini|correct_index|explanation/i.test(s), `${f}: tanpa jaringan, model bahasa, atau kunci jawaban`);
    cek(!/from "react"/.test(s), `${f}: logika dan data tanpa React`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|k5b5c-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k5b5c sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k5b5c.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_C55|video-k4b2-umum|naskah-k5b5/.test(pembungkus) && /VIDEO_MATERI_K5B5C/.test(pembungkus) && /VIDEO_LUAR_K5B5C/.test(pembungkus) && /export function VideoK5B5C/.test(pembungkus) && /DaftarVideoCerita/.test(pembungkus) && /keVideoSiap/.test(pembungkus), "video-k5b5c: memakai dua video baru, bukan naskah lama");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Pemeriksaan geometri: ${stat.bentuk} bentuk sebangun dengan data, ${stat.garis} garis bantu, ${stat.hitung} hitungan di teks gambar, ${stat.teksPasang} pasangan teks`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
