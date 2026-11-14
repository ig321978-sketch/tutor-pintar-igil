// Uji Story Kelas 5 Bab 4 Sub-Bab E (keliling bangun gabungan, penutup bab): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// teks bertumpuk, pemisahan materi dan metode luar, kutipan buku (bila PDF ada),
// hitungan mandiri (sisi denah, luas dan keliling ruangan, sekat, bingkai 12 kali 12, kunci Uji Kompetensi 1 sampai 5, soal pengayaan, contoh miskonsepsi),
// emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k5b4e.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k5b4e-video.ts");
const G = await import("../src/components/modul/story/k5b4e-gambar.ts");
const LU1 = await import("../src/components/modul/story/k5b4e-luar-1.ts");

const stat = { sisi: 0, bentuk: 0, teksPasang: 0, jumlah: 0 };
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

/* ------------------------------ Data buku, ditulis ulang mandiri dari halaman PDF ------------------------------ */
// Panduan Guru hlm. 165: jumlah 2 + 4 + 6 + 4 + 4 + 4 + 4 + 4 + 2 + 4 + 4 + 2 + 4 = 48 (suku keempat adalah JI + DE = 4).
const KUNCI_JUMLAH = [2, 4, 6, 4, 4, 4, 4, 4, 2, 4, 4, 2, 4];
// Buku Siswa hlm. 126: ukuran ruangan (panjang, lebar) dalam meter. Dapur 4 x 4, K. Mandi 2 x 4, R. Keluarga 8 x 4, R. Tamu 6 x 4, dua Kamar 4 x 4.
const UKURAN = { dapur: [4, 4], mandi: [2, 4], keluarga: [8, 4], tamu: [6, 4], kamarA: [4, 4], kamarB: [4, 4] };
// Kunci Uji Kompetensi (Panduan Guru hlm. 168 sampai 169) dan soal pengayaan (hlm. 173 sampai 174).
const KUNCI_UK = { 1: 24, 2: 20, 3: 80, 4: 72, 5: 46 };
const jml = (a) => a.reduce((t, x) => t + x, 0);
const kelilingPP = ([p, l]) => 2 * (p + l);

/* ------------------------------ Geometri umum ------------------------------ */
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
const luasTali = (p) => Math.abs(p.reduce((t, a, i) => t + a[0] * p[(i + 1) % p.length][1] - p[(i + 1) % p.length][0] * a[1], 0)) / 2;
const keliling = (p) => p.reduce((t, a, i) => t + Math.hypot(p[(i + 1) % p.length][0] - a[0], p[(i + 1) % p.length][1] - a[1]), 0);
const jalurDari = (objs, id) => titikJalur(objs.find((o) => o.id === id));
const masuk = (p, x, y) => {
  let d = false;
  for (let i = 0, j = p.length - 1; i < p.length; j = i, i += 1) if (p[i][1] > y !== p[j][1] > y && x < ((p[j][0] - p[i][0]) * (y - p[i][1])) / (p[j][1] - p[i][1]) + p[i][0]) d = !d;
  return d;
};
const T = G.TITIK_DENAH;
const jarak = (a, b) => Math.hypot(b[0] - a[0], b[1] - a[1]);

// Denah: urutan titik A sampai N, panjang tiap sisi dihitung dari titik dan sama dengan kunci buku (dengan JI + DE = 4).
{
  const urut = "ABCDEFGHIJKLMN".split("");
  sama(G.URUT_DENAH, urut, "urutan titik denah A sampai N");
  const sisi = urut.map((h, i) => jarak(T[h], T[urut[(i + 1) % 14]]));
  stat.sisi += 14;
  sama(sisi, [2, 4, 6, 2, 4, 4, 4, 4, 2, 2, 4, 4, 2, 4], "panjang empat belas sisi dari titik denah");
  hampir(jml(sisi), 48, 1e-9, "keliling denah dari titik = 48");
  // Kunci: suku keempat adalah JI + DE.
  const kunci = [sisi[0], sisi[1], sisi[2], sisi[8] + sisi[3], sisi[4], sisi[5], sisi[6], sisi[7], sisi[9], sisi[10], sisi[11], sisi[12], sisi[13]];
  sama(kunci, KUNCI_JUMLAH, "suku keliling menurut kunci Panduan Guru hlm. 165");
  sama(jml(KUNCI_JUMLAH), 48, "jumlah kunci = 48");
  sama(KUNCI_JUMLAH.slice(0, 7).reduce((t, x) => t + x, 0), 28, "tujuh suku pertama 28");
  sama(jml(KUNCI_JUMLAH.slice(7)), 20, "enam suku sisanya 20");
  sama(Object.values(LU1.NILAI_SISI).map(Number), sisi, "label sisi di metode luar sama dengan panjang dari titik");
  for (const n of G.SISI_DENAH) hampir(G.PANJANG_SISI[n], jarak(T[n[0]], T[n[1]]), 1e-9, `PANJANG_SISI ${n}`);
  // Persegi panjang A O P N (Buku Siswa hlm. 127): AO = 8, AB = AO - CD, BO = CD.
  const O = G.TITIK_EKSTRA.O;
  const P = G.TITIK_EKSTRA.P;
  sama([jarak(T.A, O), jarak(T.B, O), jarak(T.C, T.D)], [8, 6, 6], "AO = 8 dan BO = CD = 6");
  sama(jarak(T.A, O) - jarak(T.C, T.D), jarak(T.A, T.B), "AB = AO - CD = 2");
  sama(jarak(T.A, T.B), jarak(T.M, T.N), "AB = MN");
  sama(luasTali([T.A, O, P, T.N]), 32, "persegi panjang AOPN luas 32 (8 kali 4)");
  sama([jarak(T.J, P), jarak(P, O), jarak(O, T.D)], [4, 4, 4], "JD = JP + PO + OD = 4 + 4 + 4");
  sama(jarak(T.J, T.D), 12, "JD = 12");
  sama([jarak(T.I, T.E), jarak(T.H, T.F), jarak(T.H, T.G) + jarak(T.G, T.F)], [8, 8, 8], "IE = HF = HG + GF = 8");
  sama(jarak(T.J, T.D) - jarak(T.I, T.E), jarak(T.J, T.I) + jarak(T.E, T.D), "JI + ED = 12 - 8 = 4");
  sama(jarak(T.J, T.I) + jarak(T.E, T.D), 4, "JI + ED = 4");
  // Luas denah: dinding terluar membungkus 112 m2, sama dengan jumlah luas ruangan, dan bingkai 12 x 12 dipotong empat pojok 2 x 4.
  const poli = urut.map((h) => T[h]);
  const luasRuang = Object.values(UKURAN).map(([p, l]) => p * l);
  sama([luasTali(poli), jml(luasRuang)], [112, 112], "luas denah dari titik = jumlah luas ruangan");
  sama(144 - 4 * 8, 112, "bingkai 12 kali 12 dikurangi empat pojok 8 m2");
  const xs = urut.map((h) => T[h][0]);
  const ys = urut.map((h) => T[h][1]);
  sama([Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)], [-2, 10, 0, 12], "bingkai denah 12 kali 12 (x dari -2 sampai 10, y dari 0 sampai 12)");
  sama(kelilingPP([12, 12]), 48, "keliling bingkai 12 kali 12 = 48");
  // Ruangan menutupi denah tanpa tumpang tindih (titik uji setiap setengah meter).
  const rr = G.RUANG_DENAH;
  const ruangDi = (x, y) => Object.values(rr).filter(({ r }) => x > r[0] && x < r[2] && y > r[1] && y < r[3]).length;
  let cocok = true;
  for (let x = -1.75; x < 10; x += 0.5) for (let y = 0.25; y < 12; y += 0.5) if (ruangDi(x, y) !== (masuk(poli, x, y) ? 1 : 0)) cocok = false;
  cek(cocok, "ruangan menutupi denah tepat satu kali");
  // Ukuran ruangan di data gambar sama dengan buku.
  for (const [kode, [p, l]] of Object.entries(UKURAN)) {
    const r = rr[kode].r;
    sama([r[2] - r[0], r[3] - r[1]].sort((a, b) => b - a), [p, l].sort((a, b) => b - a), `ukuran ruangan ${kode}`);
  }
  sama(rr.tamu.ukuran + rr.keluarga.ukuran + rr.dapur.ukuran + rr.mandi.ukuran, "6 × 48 × 44 × 42 × 4", "teks ukuran ruangan");
  // Jumlah keliling ruangan = 104, sekat = 28 (dua kali terhitung), 104 - 48 = 56 = 2 * 28.
  const kelRuang = Object.values(UKURAN).map(kelilingPP);
  sama(kelRuang, [16, 12, 24, 20, 16, 16], "keliling tiap ruangan: dapur, kamar mandi, ruang keluarga, ruang tamu, dua kamar");
  sama(jml(kelRuang), 104, "jumlah keliling ruangan = 104");
  const nama = Object.keys(UKURAN);
  let sekat = 0;
  for (let a = 0; a < nama.length; a += 1) {
    for (let b = a + 1; b < nama.length; b += 1) {
      const p = rr[nama[a]].r;
      const q = rr[nama[b]].r;
      const ox = Math.min(p[2], q[2]) - Math.max(p[0], q[0]);
      const oy = Math.min(p[3], q[3]) - Math.max(p[1], q[1]);
      if (ox === 0 && oy > 0) sekat += oy;
      else if (oy === 0 && ox > 0) sekat += ox;
    }
  }
  sama(sekat, 28, "panjang sekat antar ruangan = 28");
  sama(jml(kelRuang) - 48, 2 * sekat, "104 - 48 = 56 = 2 kali sekat");
  // Tiga persegi panjang Cara Komang menutupi denah tanpa tumpang tindih: 2 x 4, 6 x 12, 4 x 8 (buku: 4m x ?, 12m x 6m, 8m x 4m).
  const kr = G.KOMANG_RECT;
  sama(Object.values(kr).map((r) => (r[2] - r[0]) * (r[3] - r[1])), [8, 72, 32], "luas tiga persegi panjang Komang");
  sama(Object.values(kr).reduce((t, r) => t + (r[2] - r[0]) * (r[3] - r[1]), 0), 112, "tiga persegi panjang Komang meliputi 112 m2");
  const komangDi = (x, y) => Object.values(kr).filter((r) => x > r[0] && x < r[2] && y > r[1] && y < r[3]).length;
  let cocokK = true;
  for (let x = -1.75; x < 10; x += 0.5) for (let y = 0.25; y < 12; y += 0.5) if (komangDi(x, y) !== (masuk(poli, x, y) ? 1 : 0)) cocokK = false;
  cek(cocokK, "tiga persegi panjang Komang menutupi denah tepat satu kali");
  sama([kr.tengah[3] - kr.tengah[1], kr.tengah[2] - kr.tengah[0], kr.kanan[3] - kr.kanan[1], kr.kanan[2] - kr.kanan[0]], [12, 6, 8, 4], "12m x 6m dan 8m x 4m pada gambar Komang");
  // Pengelompokan sisi berdasarkan arah luar: atas, bawah, kiri, kanan masing-masing berjumlah 12.
  const per = (arah) => G.SISI_DENAH.filter((n) => G.LUAR_SISI[n][0] === arah[0] && G.LUAR_SISI[n][1] === arah[1]);
  sama(per([0, -1]).sort(), ["HI", "JK", "KL", "MN"], "sisi menghadap atas");
  sama(per([0, 1]).sort(), ["AB", "CD", "EF"], "sisi menghadap bawah");
  sama(per([-1, 0]).sort(), ["BC", "LM", "NA"], "sisi menghadap kiri");
  sama(per([1, 0]).sort(), ["DE", "FG", "GH", "IJ"], "sisi menghadap kanan");
  for (const a of [[0, -1], [0, 1], [-1, 0], [1, 0]]) sama(jml(per(a).map((n) => G.PANJANG_SISI[n])), 12, `jumlah sisi arah ${a}`);
  // Jalan dari A mengikuti urutan huruf: timur, barat, utara, selatan masing-masing 12 (y ke atas).
  const gerak = { timur: 0, barat: 0, utara: 0, selatan: 0 };
  urut.forEach((h, i) => {
    const a = T[h];
    const b = T[urut[(i + 1) % 14]];
    if (b[0] > a[0]) gerak.timur += b[0] - a[0];
    if (b[0] < a[0]) gerak.barat += a[0] - b[0];
    if (b[1] > a[1]) gerak.utara += b[1] - a[1];
    if (b[1] < a[1]) gerak.selatan += a[1] - b[1];
  });
  sama(gerak, { timur: 12, barat: 12, utara: 12, selatan: 12 }, "keseimbangan jalur tertutup denah");
  const dari = (n) => jarak(T[n[0]], T[n[1]]);
  sama([["AB", "CD", "EF"], ["HI", "JK", "KL", "MN"], ["DE", "FG", "GH", "IJ"], ["BC", "LM", "NA"]].map((g) => jml(g.map(dari))), [12, 12, 12, 12], "kelompok timur, barat, utara, selatan di video");
  // Ruang tamu 6 x 4: keliling 20 dan keseimbangan 6 + 6 + 4 + 4.
  sama(kelilingPP([6, 4]), 20, "ruang tamu 6 kali 4 berkeliling 20");
}

// Soal Uji Kompetensi: keliling dari titik gambar sama dengan kunci buku.
hampir(keliling(G.UK1), KUNCI_UK[1], 1e-6, "UK1 keliling dari titik = 24");
sama(G.UK1.slice(1).map((p, i) => Math.round(jarak(G.UK1[i], p) * 1000) / 1000), [8, 8], "UK1 sisi sama 8");
sama(3 * 8, KUNCI_UK[1], "UK1 tiga kali delapan");
{
  const { A, B, C, D } = G.UK2;
  hampir(jarak(A, B), 6, 1e-3, "UK2 AB = 6");
  hampir(jarak(A, D), 6, 1e-3, "UK2 AD = 6");
  hampir(jarak(C, B), 4, 1e-3, "UK2 CB = 4");
  hampir(jarak(C, D), 4, 1e-3, "UK2 CD = 4");
  hampir(keliling([C, B, A, D]), KUNCI_UK[2], 1e-2, "UK2 keliling = 20");
  sama(2 * 4 + 2 * 6, KUNCI_UK[2], "UK2 (2 kali 4) + (2 kali 6)");
}
hampir(keliling(G.UK3), KUNCI_UK[3], 1e-6, "UK3 keliling dari titik = 80");
for (let i = 0; i < 8; i += 1) hampir(jarak(G.UK3[i], G.UK3[(i + 1) % 8]), 10, 1e-6, `UK3 sisi ${i + 1} = 10`);
sama(8 * 10, KUNCI_UK[3], "UK3 delapan kali sepuluh");
{
  // Soal 4: jajargenjang (16 dan 12) digabung segitiga siku-siku 12, 16, 20. Garis putus-putus 16 di dalam, sama dengan sisi atas.
  const p = G.UK4;
  const s = p.map((a, i) => Math.round(jarak(a, p[(i + 1) % p.length]) * 1000) / 1000);
  sama(s, [16, 12, 12, 20, 12], "UK4 lima sisi: atas 16, kanan atas 12, kanan bawah 12, miring 20, kiri atas 12");
  hampir(jml(s), KUNCI_UK[4], 1e-6, "UK4 keliling = 72");
  sama(12 + 16 + 12 + 12 + 20, KUNCI_UK[4], "UK4 hitungan kunci 12 + 16 + 12 + 12 + 20");
  hampir(jarak(...G.UK4_DALAM), jarak(p[0], p[1]), 1e-9, "garis putus-putus 16 sama panjang dengan sisi atas");
  hampir(jarak(...G.UK4_DALAM), 16, 1e-9, "garis putus-putus 16");
  // Segitiga siku-siku 12, 16, 20 di bawah garis putus-putus.
  sama([jarak(p[2], p[3]), jarak(G.UK4_DALAM[0], p[2]), jarak(G.UK4_DALAM[0], p[3])], [12, 16, 20], "segitiga siku-siku 12, 16, 20");
  sama(12 ** 2 + 16 ** 2, 20 ** 2, "12, 16, 20 membentuk segitiga siku-siku");
  // Jajargenjang: sisi berhadapan sama.
  hampir(jarak(p[0], G.UK4_DALAM[0]), jarak(p[1], p[2]), 1e-9, "jajargenjang: sisi miring berhadapan sama");
}
{
  const p = G.UK5;
  hampir(keliling(p), KUNCI_UK[5], 1e-9, "UK5 keliling dari titik = 46");
  const xs = p.map((a) => a[0]);
  const ys = p.map((a) => a[1]);
  sama([Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys)], [11, 12], "UK5 bingkai 11 kali 12");
  sama(kelilingPP([11, 12]), KUNCI_UK[5], "UK5 keliling bingkai = 46");
  sama([jarak(p[0], p[1]), jarak(p[1], p[2]), jarak(p[2], p[3]), jarak(p[4], p[5]), jarak(p[7], p[0])], [8, 3, 3, 7, 12], "UK5 sisi berlabel 8, 3, 3, 7, 12");
  sama(jarak(p[6], p[7]), 4, "UK5 kaki kiri selebar 4 (11 - 7)");
  sama(8 + 3, 11, "UK5 sisi atas 8 + 3");
  sama(2 * 12 + 2 * 11, 46, "UK5 hitungan kunci");
}
sama(Object.values(KUNCI_UK), [24, 20, 80, 72, 46], "lima kunci Uji Kompetensi");
sama(5 * 4, 20, "skor maksimum lima butir");
// Soal pengayaan: keliling 94; sisi kiri 20, atas 24, kanan 20, bawah 30; FG = 9, AB = 15; bingkai 24 x 20 = 88; selisih 2 x 3.
{
  const h = G.PENGAYAAN_HURUF;
  hampir(keliling(G.PENGAYAAN), 94, 1e-9, "pengayaan: keliling dari titik = 94");
  sama([jarak(h.I, h.H), jarak(h.H, h.G), jarak(h.E, h.G), jarak(h.E, h.F), jarak(h.F, h.G), jarak(h.D, h.C), jarak(h.A, h.B)], [24, 20, 12, 3, 9, 3, 15], "pengayaan: IH 24, HG 20, EG 12, EF 3, FG 9, DC 3, AB 15");
  sama(jarak(h.E, h.F) + jarak(h.F, h.G), jarak(h.E, h.G), "EF + FG = EG");
  sama(12 - 3, 9, "FG = 12 - 3 = 9");
  sama(jarak(h.A, h.B) + jarak(h.F, h.G), jarak(h.I, h.H), "AB + FG = IH");
  sama(24 - 9, 15, "AB = 24 - 9 = 15");
  sama(15 + 3 + 12, 30, "sisi bawah = AB + DC + EG = 30");
  sama(20 + 24 + 20 + 30, 94, "keliling pengayaan = 94");
  sama(kelilingPP([24, 20]), 88, "bingkai pengayaan 24 kali 20 = 88");
  sama(88 + 2 * 3, 94, "88 + 2 kali 3 = 94 (bagian menjorok)");
  sama(2 * 27 + 2 * 20, 94, "timur 24 + 3 = 27 dan barat 12 + 15 = 27: 2 kali 27 + 2 kali 20 = 94");
  sama([24 + 3, 12 + 15], [27, 27], "keseimbangan timur dan barat pengayaan");
  sama(G.PENGAYAAN.map((a) => a[1]).filter((y) => y === 0).length, 2, "dua titik di sisi atas");
  // Galon: soal menyebut 18 galon, kunci memakai 20 galon.
  sama([18 * 5, 19 * 5, 20 * 5], [90, 95, 100], "galon kali 5 meter");
  cek(18 * 5 < 94 && 19 * 5 >= 94 && 20 * 5 > 94, "18 galon tidak cukup, 19 dan 20 galon cukup");
  sama(Math.ceil(94 / 5), 19, "galon minimal untuk 94 meter");
}
// Miskonsepsi 1: bangun tangga dibungkus bingkai 20 kali 12 (64).
hampir(keliling(G.MISKON1), 64, 1e-9, "miskonsepsi 1: keliling bangun tangga = 64");
sama(kelilingPP([12, 20]), 64, "miskonsepsi 1: 2 kali (12 + 20) = 64");
// Miskonsepsi 2: bingkai 18 kali 20, keliling 82; AB = 12, FG = 3, CE = 9, DE = 6; bingkai saja 76 (selisih 2 x 3).
{
  const p = G.MISKON2;
  hampir(keliling(p), 82, 1e-9, "miskonsepsi 2: keliling dari titik = 82");
  sama(20 + 18 + 20 + (12 + 3 + 9), 82, "miskonsepsi 2: 20 + 18 + 20 + (12 + 3 + 9) = 82");
  sama(18 - 6, 12, "AB = 18 - 6 = 12");
  const m = { A: [0, 5], B: [12, 5], C: [9, 20], D: [12, 20], E: [18, 20], F: [9, 17], G: [12, 17] };
  sama([jarak(m.A, m.B), jarak(m.F, m.G), jarak(m.C, m.E), jarak(m.D, m.E), jarak(m.C, m.D)], [12, 3, 9, 6, 3], "AB 12, FG 3, CE 9, DE 6, CD 3");
  sama(jarak(m.C, m.E) - jarak(m.C, m.D), jarak(m.D, m.E), "DE = CE - CD");
  sama(18 - jarak(m.D, m.E), jarak(m.A, m.B), "AB = 18 - DE");
  sama(kelilingPP([18, 20]), 76, "bingkai saja memberi 76");
  sama(82 - 76, 2 * 3, "selisih 6 = dua kali FG");
  // titik-titik gambar sama dengan huruf.
  sama([p[7], p[6], p[5], p[4], p[3]], [m.A, m.B, m.G, m.F, m.C], "titik gambar miskonsepsi 2 sama dengan huruf buku");
}
// Keliling bangun L tidak sama dengan bingkai bila ada bagian menjorok (pengayaan 94 lawan 88), tetapi sama bila lekukan hanya di pojok (UK5 dan bangun tangga).
cek(keliling(G.UK5) === kelilingPP([11, 12]) && keliling(G.MISKON1) === kelilingPP([20, 12]) && keliling(G.PENGAYAAN) > kelilingPP([24, 20]), "bingkai berlaku bila lekukan di pojok saja");
// Keseimbangan jalur pengayaan: timur 24 + 3, barat 12 + AB.

const VIDEO = [V.VIDEO_MATERI_K5B4E, V.VIDEO_LUAR_K5B4E];
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
      cek(!/[=×÷<>\/%]/.test(kt.suara), `${nama}#${i + 1}: suara tanpa lambang yang sulit dibaca mesin suara`);
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
          if (!t && /^[MLQTZ\d.\s-]+$/.test(o.d ?? "")) {
            const n = bilangan(o.d);
            for (let q = 0; q + 1 < n.length; q += 2) cek(x + n[q] > -2 && x + n[q] < 302 && y + n[q + 1] > -2 && y + n[q + 1] < 204, `${nama}#${i + 1}: lintasan ${o.id} masuk kanvas`);
          }
        } else if (o.t === "garis" || o.t === "panah") cek(x > -2 && x < 302 && y > -2 && y < 204 && x + (o.x2 ?? 0) > -2 && x + (o.x2 ?? 0) < 302 && y + (o.y2 ?? 0) > -2 && y + (o.y2 ?? 0) < 204, `${nama}#${i + 1}: garis ${o.id} masuk kanvas`);
      }
      // teks tidak boleh bertumpuk
      {
        const teksAda = akhir.filter((o) => o.t === "teks" && (o.op ?? 1) > 0 && o.isi && !/^[\u{1F000}-\u{1FFFF}]|^[✂]$/u.test(o.isi));
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
    });
  }
}


/* ------------------------------ Pemisahan materi dan metode luar ------------------------------ */
const seluruhTeks = (v) => v.adegan.map((a) => [a.judul, a.sumber, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const M = V.VIDEO_MATERI_K5B4E;
const U = V.VIDEO_LUAR_K5B4E;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const nilaiId = (objs, id) => objs.find((o) => o.id === id)?.isi;
const ada = (objs, id) => objs.some((o) => o.id === id);
const S = 11;
const KUNCI_UK_TEKS = () => [KUNCI_UK[1], KUNCI_UK[2], KUNCI_UK[3]].map((x) => `${x} cm`);
const KUNCI_UK_TEKS_5 = () => `${Object.values(KUNCI_UK).join(", ")} cm`;
/** Panjang garis atau panah dalam meter pada denah berskala 11 piksel per meter. */
const panjangGaris = (objs, id, skalaPx = S) => {
  const o = objs.find((x) => x.id === id);
  return o ? Math.round((Math.hypot(o.x2 ?? 0, o.y2 ?? 0) / skalaPx) * 1000) / 1000 : NaN;
};
{
  const teksVideo = (v) => JSON.stringify(seluruhTeks(v));
  const NAMA_METODE = /Outer Path|Bounding Rectangle|Missing Length|Closed Path|metode luar|metode dari luar/i;
  const materi = teksVideo(M);
  const luar = teksVideo(U);
  cek(!NAMA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of ["Outer Path Only", "Bounding Rectangle", "Missing Length", "Closed Path Balance"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(M.adegan.every((a) => /(Buku Siswa|Panduan Guru) hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(U.adegan.every((a) => /metode luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  for (const kata of ["Sub-Bab E", "Eksplorasi 4.5", "Gambar 4.6", "Asep", "Komang", "denah", "Miskonsepsi", "Diferensiasi", "Uji Kompetensi", "Rubrik", "pengayaan", "Remedial", "Refleksi", "orang tua", "persegi besar", "dinding terluar", "sekat", "tumpang tindih", "C4", "C6", "lapangan", "bangun gabungan", "kunci", "galon"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-opo", "luar-opo-terapan", "luar-br", "luar-br-terapan", "luar-ml", "luar-ml-terapan", "luar-cpb", "luar-cpb-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk empat metode");
  cek(M.adegan.length === 13 && U.adegan.length === 10, "13 adegan materi dan 10 adegan metode luar");
  // Sub-Bab E penutup bab: materi tidak memuat Refleksi nomor 1 sampai 15 (milik sub-bab lain).
  cek(!/Refleksi nomor (?:(?:satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan)(?! belas)|sepuluh|sebelas|(?:dua|tiga|empat|lima) belas)\b/i.test(materi), "tidak memakai Refleksi 1 sampai 15 milik sub-bab lain");
  cek(totalKetukan >= 90, `total ketukan cukup dalam (${totalKetukan})`);
  // Dua video tidak memuat kata "metode luar" di materi, dan video metode luar memuat penerapan angka buku (denah, soal 4 dan 5, pengayaan).
  for (const kata of ["denah", "Uji Kompetensi", "pengayaan"]) cek(luar.toLowerCase().includes(kata.toLowerCase()), `metode luar memakai angka buku: ${kata}`);
}

/* ------------------------------ Semua persamaan di gambar dihitung ulang ------------------------------ */
{
  let n = 0;
  let m2 = 0;
  const hit = (e) => Function(`"use strict"; return (${e.replace(/×/g, "*").replace(/−/g, "-")});`)();
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((_, i) => {
        for (const o of akhirAdegan(a, i)) {
          if (o.t !== "teks" || !o.isi) continue;
          const m = o.isi.match(/^([\d\s+×()/]+(?:=\s*[\d\s+×()/]+)+)/);
          if (m) {
            const nilai = m[1].split("=").map((s) => hit(s.trim() || "NaN"));
            n += 1;
            cek(nilai.every((x) => Math.abs(x - nilai[0]) < 1e-9), `${v.id}/${a.id}#${i + 1}: persamaan "${o.isi}" benar (${nilai.join(" ; ")})`);
          }
          // Persamaan di mana saja dalam teks: jumlah, selisih, dan hasil kali sederhana.
          for (const q of o.isi.matchAll(/(\d+(?: [+] \d+)+) = (\d+)/g)) {
            m2 += 1;
            stat.jumlah += 1;
            cek(hit(q[1]) === Number(q[2]), `${v.id}/${a.id}#${i + 1}: jumlah "${q[0]}" benar`);
          }
          for (const q of o.isi.matchAll(/(\d+) − (\d+) = (\d+)/g)) {
            m2 += 1;
            cek(Number(q[1]) - Number(q[2]) === Number(q[3]), `${v.id}/${a.id}#${i + 1}: selisih "${q[0]}" benar`);
          }
          for (const q of o.isi.matchAll(/(?<!\+ )(\d+) × (\d+) = (\d+)/g)) {
            m2 += 1;
            cek(Number(q[1]) * Number(q[2]) === Number(q[3]), `${v.id}/${a.id}#${i + 1}: hasil kali "${q[0]}" benar`);
          }
        }
      });
    }
  }
  cek(n >= 20, `jumlah persamaan yang diperiksa (${n})`);
  cek(m2 >= 40, `jumlah persamaan tersisip yang diperiksa (${m2})`);
}

/* ------------------------------ Hitungan isi, dihitung mandiri ------------------------------ */
{
  // Sisi hilang (Cara Asep).
  {
    const a = adegan(M, "sisi-hilang");
    const t0 = akhirAdegan(a, 0);
    cek(ada(t0, "rao") && t0.find((o) => o.id === "rao").w === 8 * S && t0.find((o) => o.id === "rao").h === 4 * S, "persegi panjang A O P N pada gambar 8 kali 4");
    sama(nilaiId(t0, "p1"), "AO = 8 m", "AO = 8 m");
    const t1 = akhirAdegan(a, 1);
    sama(panjangGaris(t1, "sAB"), 2, "garis hijau A B sepanjang 2 meter");
    sama([nilaiId(t1, "p2"), nilaiId(t1, "p3"), nilaiId(t1, "p4"), nilaiId(t1, "p5")], ["BO = CD = 6 m", "AB = AO − CD", "8 − 6 = 2", "AB = 2 m"], "langkah A B");
    const t2 = akhirAdegan(a, 2);
    cek(t2.find((o) => o.id === "rab").w === 2 * S && t2.find((o) => o.id === "rab").h === 4 * S, "persegi panjang A B M N pada gambar 2 kali 4");
    sama([panjangGaris(t2, "sMN"), nilaiId(t2, "q2")], [2, "MN = 2 m"], "MN 2 meter");
    const t3 = akhirAdegan(a, 3);
    sama([panjangGaris(t3, "sJD"), nilaiId(t3, "r2"), nilaiId(t3, "r3")], [12, "4 + 4 + 4 = 12", "JD = 12 m"], "J D 12 meter");
    const t4 = akhirAdegan(a, 4);
    sama([panjangGaris(t4, "sIE"), panjangGaris(t4, "sHF"), nilaiId(t4, "t3"), nilaiId(t4, "t4")], [8, 8, "4 + 4 = 8", "IE = 8 m"], "I E dan H F 8 meter");
    const t5 = akhirAdegan(a, 5);
    sama([nilaiId(t5, "u1"), nilaiId(t5, "u2")], ["JI + ED = 12 − 8", "JI + ED = 4 m"], "J I ditambah E D");
  }
  // Menjumlahkan: empat belas sisi, suku yang dijumlahkan sama dengan kunci buku.
  {
    const a = adegan(M, "jumlah-asep");
    const t0 = akhirAdegan(a, 0);
    sama(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N"].map((h) => ada(t0, `jh-${h}`)), Array(14).fill(true), "empat belas huruf titik di gambar");
    sama(nilaiId(t0, "j14"), "14 sisi", "14 sisi");
    const t1 = akhirAdegan(a, 1);
    sama([panjangGaris(t1, "jIJ"), panjangGaris(t1, "jDE"), nilaiId(t1, "j4"), nilaiId(t1, "j13")], [2, 2, "JI + DE = 4 m", "13 suku"], "J I ditambah D E dan 13 suku");
    sama(KUNCI_JUMLAH.length, 13, "13 suku pada kunci");
    const t2 = akhirAdegan(a, 2);
    sama([nilaiId(t2, "n1"), nilaiId(t2, "n2")], [`${KUNCI_JUMLAH.slice(0, 7).join(" + ")} = 28`, `${KUNCI_JUMLAH.slice(7).join(" + ")} = 20`], "suku dijumlahkan sama dengan kunci buku");
    sama(nilaiId(akhirAdegan(a, 3), "n3"), "28 + 20 = 48", "jumlah akhir 48");
  }
  // Cara Komang: kelompok sisi di gambar dihitung dari panjang garis.
  {
    const a = adegan(M, "cara-komang");
    const t1 = akhirAdegan(a, 1);
    sama(["MN", "KL", "JK", "HI"].map((n) => panjangGaris(t1, `at${n}`)), [2, 4, 2, 4], "sisi atas pada gambar");
    sama(nilaiId(t1, "g1a"), "2 + 4 + 2 + 4 = 12", "jumlah sisi atas");
    const t2 = akhirAdegan(a, 2);
    sama(["AB", "CD", "EF"].map((n) => panjangGaris(t2, `bw${n}`)), [2, 6, 4], "sisi bawah pada gambar");
    sama(nilaiId(t2, "g2a"), "2 + 6 + 4 = 12", "jumlah sisi bawah");
    const t3 = akhirAdegan(a, 3);
    sama(["LM", "NA", "BC"].map((n) => panjangGaris(t3, `kr${n}`)), [4, 4, 4], "sisi kiri pada gambar");
    sama(["DE", "FG", "GH", "IJ"].map((n) => panjangGaris(t3, `kn${n}`)), [2, 4, 4, 2], "sisi kanan pada gambar");
    sama([nilaiId(t3, "g3"), nilaiId(t3, "g4")], ["kiri: 4 + 4 + 4 = 12", "kanan: 2 + 4 + 4 + 2 = 12"], "jumlah sisi kiri dan kanan");
    const t0 = akhirAdegan(a, 0);
    sama(["kk", "kt", "kn"].map((id) => ada(t0, id)), [true, true, true], "tiga persegi panjang Komang");
    const bk = t0.find((o) => o.id === "bk");
    sama([bk.w, bk.h], [12 * S, 12 * S], "bingkai persegi besar 12 kali 12");
    sama(nilaiId(akhirAdegan(a, 4), "kb2"), "4 × 12 = 48 m", "keliling 4 kali 12");
  }
  // Miskonsepsi 1: keliling tiap ruangan.
  {
    const t = akhirAdegan(adegan(M, "miskonsepsi-1"), 1);
    sama(["c1", "c2", "c3", "c4", "c5"].map((id) => nilaiId(t, id)), ["dapur 16", "kamar mandi 12", "ruang keluarga 24", "ruang tamu 20", "dua kamar 16 + 16"], "keliling ruangan di gambar");
    sama(nilaiId(t, "c8"), "16 + 12 + 24 + 20 + 16 + 16 = 104", "jumlah keliling ruangan 104");
    sama(nilaiId(t, "c6"), "jumlah: 104", "jumlah 104");
  }
  // Bangun di gambar: keliling dari titik jalur, dibagi skala.
  const bentukCek = (v, id, ke, idBentuk, skalaPx, harapan, nama) => {
    const a = adegan(v, id);
    const t = akhirAdegan(a, ke);
    const o = t.find((x) => x.id === idBentuk);
    const p = o ? titikJalur(o) : null;
    cek(p !== null, `${nama}: bangun ${idBentuk} ada dan berupa jalur lurus`);
    if (p) {
      hampir(keliling(p) / skalaPx, harapan, 0.02, `${nama}: keliling bangun di gambar`);
      stat.bentuk += 1;
    }
  };
  bentukCek(M, "miskonsepsi-2", 0, "s1", 7, 64, "miskonsepsi 1 (tangga)");
  bentukCek(M, "miskonsepsi-2", 2, "s2", 6.5, 82, "miskonsepsi 2");
  bentukCek(M, "uji-kompetensi-1", 0, "u1", 14, 24, "UK1");
  bentukCek(M, "uji-kompetensi-1", 2, "u3", 4.2, 80, "UK3");
  bentukCek(M, "uji-kompetensi-2", 0, "v1", 5.2, 72, "UK4");
  bentukCek(M, "uji-kompetensi-2", 2, "w1", 11, 46, "UK5");
  bentukCek(M, "pengayaan-cat", 1, "g", 6, 94, "pengayaan");
  bentukCek(U, "luar-opo-terapan", 3, "t4", 5.2, 72, "metode luar UK4");
  bentukCek(U, "luar-br", 0, "br", 7, 64, "metode luar tangga");
  bentukCek(U, "luar-br", 3, "s1", 5.4, 46, "metode luar bingkai aman");
  bentukCek(U, "luar-br", 3, "s2", 3.6, 94, "metode luar bingkai tidak aman");
  bentukCek(U, "luar-br-terapan", 2, "e1", 11, 46, "metode luar UK5");
  bentukCek(U, "luar-br-terapan", 3, "p1", 6, 94, "metode luar pengayaan");
  bentukCek(U, "luar-ml-terapan", 3, "pe", 6, 94, "metode luar Missing Length pengayaan");
  bentukCek(U, "luar-cpb-terapan", 4, "px", 6, 94, "metode luar Closed Path Balance pengayaan");
  {
    // Layang-layang UK2 pada gambar: lintasan M..L..Z dengan titik relatif, keliling 20 setelah dibagi skala 18.
    const t = akhirAdegan(adegan(M, "uji-kompetensi-1"), 1);
    const o = t.find((x) => x.id === "u2");
    const p = titikJalur(o);
    cek(p !== null, "layang-layang UK2 berupa jalur lurus");
    if (p) {
      hampir(keliling(p) / 18, 20, 0.02, "keliling layang-layang UK2 di gambar");
      stat.bentuk += 1;
    }
    const lm = (k) => nilaiId(t, k);
    sama([lm("u2a"), lm("u2c"), lm("t3"), lm("t4")], ["6 cm", "4 cm", "(2 × 4) + (2 × 6) = 20", "8 + 12 = 20 cm"], "teks UK2");
    sama([nilaiId(akhirAdegan(adegan(M, "uji-kompetensi-1"), 0), "t2"), nilaiId(akhirAdegan(adegan(M, "uji-kompetensi-1"), 2), "t6")], ["3 × 8 = 24 cm", "8 × 10 = 80 cm"], "teks UK1 dan UK3");
    const tt = akhirAdegan(adegan(M, "uji-kompetensi-1"), 3);
    sama([nilaiId(tt, "tb1"), nilaiId(tt, "tb2"), nilaiId(tt, "tb3")], KUNCI_UK_TEKS(), "tabel kunci nomor 1 sampai 3");
  }
  // Uji Kompetensi 2: kunci 72, 46 dan skor.
  {
    const a = adegan(M, "uji-kompetensi-2");
    const t1 = akhirAdegan(a, 1);
    sama([nilaiId(t1, "v2e"), nilaiId(t1, "v2f")], ["12 + 16 + 12 + 12 + 20 = 72", "72 cm"], "kunci nomor 4");
    const t0 = akhirAdegan(a, 0);
    const d = t0.find((o) => o.id === "v1d");
    cek(Math.abs(Math.hypot(d.x2, d.y2) / 5.2 - 16) < 1e-6 && d.putus === true, "garis putus-putus 16 cm di gambar nomor 4");
    const t3 = akhirAdegan(a, 3);
    sama([nilaiId(t3, "w2a"), nilaiId(t3, "w2b"), nilaiId(t3, "w2c")], ["(2 × 12) + (2 × 11) = 46", "24 + 22 = 46", "46 cm"], "kunci nomor 5");
    const bb = akhirAdegan(a, 2).find((o) => o.id === "w1b");
    sama([bb.w / 11, bb.h / 11], [11, 12], "bingkai nomor 5 sebelas kali dua belas");
    const z = akhirAdegan(a, 5);
    sama(nilaiId(z, "z1-t0"), "5 × 4 = 20", "skor maksimum");
    sama(nilaiId(z, "z2-t1"), KUNCI_UK_TEKS_5(), "lima kunci pada kartu pemeriksaan");
    // Rubrik: skor 0 sampai 4.
    const r = akhirAdegan(a, 4);
    sama([0, 1, 2, 3, 4].map((i) => nilaiId(r, `rb-t${i + 1}0`)), ["0", "1", "2", "3", "4"], "skor rubrik 0 sampai 4");
  }
  // Pengayaan: langkah hitungan dan galon.
  {
    const a = adegan(M, "pengayaan-cat");
    const t1 = akhirAdegan(a, 1);
    sama([nilaiId(t1, "g24"), nilaiId(t1, "g20"), nilaiId(t1, "g3"), nilaiId(t1, "g12"), nilaiId(t1, "g5"), nilaiId(t1, "g18")], ["24 m", "20 m", "3 m", "12 m", "1 galon: 5 m dinding", "18 galon cukup?"], "data soal pengayaan");
    const t2 = akhirAdegan(a, 2);
    sama(["I", "H", "G", "F", "E", "D", "C", "B", "A"].map((h) => ada(t2, `gh${h}`)), Array(9).fill(true), "sembilan huruf titik pengayaan");
    sama([nilaiId(t2, "k1"), nilaiId(t2, "k2"), nilaiId(t2, "k3")], ["kiri = 20 m", "kanan = 20 m", "atas = 24 m"], "kiri, kanan, atas pengayaan");
    const t3 = akhirAdegan(a, 4);
    sama([nilaiId(t3, "m2"), nilaiId(t3, "m3"), nilaiId(t3, "m4"), nilaiId(t3, "m5")], ["3 + FG = 12", "FG = 12 − 3 = 9", "AB + 9 = 24", "AB = 24 − 9 = 15"], "langkah F G dan A B");
    const t4 = akhirAdegan(a, 5);
    sama([nilaiId(t4, "n1"), nilaiId(t4, "n2"), nilaiId(t4, "n3")], ["bawah: 15 + 3 + 12 = 30", "20 + 24 + 20 + 30 = 94", "94 m"], "keliling pengayaan 94");
    const t5 = akhirAdegan(a, 6);
    sama([nilaiId(t5, "o1"), nilaiId(t5, "o2")], ["kunci buku: 20 galon", "20 × 5 = 100 m"], "kunci buku memakai 20 galon");
    const t6 = akhirAdegan(a, 7);
    sama([nilaiId(t6, "p1"), nilaiId(t6, "p3")], ["18 × 5 = 90 m", "19 galon: 19 × 5 = 95 m"], "catatan guru: 18 galon tidak cukup");
  }
  // Miskonsepsi 2: langkah dan catatan guru.
  {
    const a = adegan(M, "miskonsepsi-2");
    sama(nilaiId(akhirAdegan(a, 1), "e1"), "2 × (12 + 20) = 64 cm", "bangun tangga 64");
    const t4 = akhirAdegan(a, 4);
    sama([nilaiId(t4, "r4"), nilaiId(t4, "r5"), nilaiId(t4, "r6"), nilaiId(t4, "r7")], ["AB = 18 − DE", "AB = 18 − 6 = 12 cm", "FG = 3 cm", "CE = 9 cm"], "langkah A B, F G, C E");
    sama(nilaiId(akhirAdegan(a, 5), "r9"), "20 + 18 + 20 + (12 + 3 + 9) = 82", "keliling 82");
    const t6 = akhirAdegan(a, 6);
    sama(["w1", "w2", "w3", "w4"].map((id) => nilaiId(t6, id)), ["gambar buku: atas 20", "hitungan buku: atas 18", "teks buku: CE = 10", "hitungan buku: CE = 9"], "catatan guru tentang gambar dan teks buku");
    sama(nilaiId(akhirAdegan(a, 7), "x2"), "2 × (18 + 20) = 76", "bingkai saja 76");
    const t2 = akhirAdegan(a, 2);
    const b2 = t2.find((o) => o.id === "b2");
    sama([b2.w / 6.5, b2.h / 6.5], [18, 20], "bingkai miskonsepsi 2 delapan belas kali dua puluh");
    const kiriSum = ["kiri1", "kiri2", "kiri3"].map((id) => panjangGaris(t2, id, 6.5));
    sama(kiriSum, [5, 12, 3], "sisi kiri bangun: 5, 12, 3");
    sama(jml(kiriSum), 20, "jumlah sisi kiri 20");
    const t3 = akhirAdegan(a, 3);
    sama(panjangGaris(t3, "hAB", 6.5), 12, "A B pada gambar 12");
    const t4b = akhirAdegan(a, 4);
    sama([panjangGaris(t4b, "hFG", 6.5), panjangGaris(t4b, "hCE", 6.5)], [3, 9], "F G dan C E pada gambar");
    const b1 = akhirAdegan(a, 0).find((o) => o.id === "b1");
    sama([b1.w / 7, b1.h / 7], [20, 12], "bingkai bangun tangga 20 kali 12");
  }
  // Metode luar: Outer Path Only.
  {
    const a = adegan(U, "luar-opo-terapan");
    const t0 = akhirAdegan(a, 0);
    sama([nilaiId(t0, "ot1"), nilaiId(t0, "ot2"), nilaiId(t0, "ot3")], ["16 + 12 + 24 +", "20 + 16 + 16", "104 m"], "metode luar: jumlah keliling ruangan 104");
    const t1 = akhirAdegan(a, 1);
    const nilai = G.SISI_DENAH.map((n) => Number(nilaiId(t1, `ol-${n}`)));
    sama(nilai, [2, 4, 6, 2, 4, 4, 4, 4, 2, 2, 4, 4, 2, 4], "label empat belas sisi di metode luar");
    sama(jml(nilai), 48, "jumlah label sisi 48");
    sama([nilaiId(akhirAdegan(a, 2), "ot6"), nilaiId(akhirAdegan(a, 2), "ot7"), nilaiId(akhirAdegan(a, 2), "ot8")], ["jalur luar: 48 m", "104 − 48 = 56", "= 2 × 28 m sekat"], "selisih 56 = 2 kali sekat 28");
  }
  // Metode luar: Bounding Rectangle.
  {
    const a = adegan(U, "luar-br-terapan");
    const t0 = akhirAdegan(a, 0);
    const bk = t0.find((o) => o.id === "btb");
    sama([bk.w, bk.h], [12 * S, 12 * S], "bingkai denah 12 kali 12 di metode luar");
    sama(["n0", "n1", "n2", "n3"].map((id) => { const o = t0.find((x) => x.id === id); return (o.w / S) * (o.h / S); }), [8, 8, 8, 8], "empat pojok terpotong masing-masing 8 m2");
    sama(nilaiId(akhirAdegan(a, 1), "b1"), "4 × 12 = 48 m", "bingkai 4 kali 12");
    const t3 = akhirAdegan(a, 3);
    sama([nilaiId(t3, "p2"), nilaiId(t3, "p4")], ["2 × (24 + 20) = 88", "kaki menjorok: 3 m"], "bingkai pengayaan 88 dan kaki 3 m");
    const kaki = t3.find((o) => o.id === "p3");
    sama(luasTali(titikJalur(kaki)) / 36, 9, "kaki menjorok 3 kali 3 pada gambar");
    sama(nilaiId(akhirAdegan(a, 4), "p5"), "88 + 2 × 3 = 94", "88 ditambah dua kali 3");
    const bb = akhirAdegan(a, 3).find((o) => o.id === "p1b");
    sama([bb.w / 6, bb.h / 6], [24, 20], "bingkai pengayaan 24 kali 20");
  }
  // Metode luar: Missing Length.
  {
    const a = adegan(U, "luar-ml-terapan");
    const t0 = akhirAdegan(a, 0);
    sama([panjangGaris(t0, "ab1"), panjangGaris(t0, "ab2")], [8, 2], "A O 8 dan A B 2 pada gambar");
    sama([nilaiId(t0, "t1"), nilaiId(t0, "t2"), nilaiId(t0, "t3")], ["AO = 8 m", "BO = CD = 6 m", "AB = 8 − 6 = 2 m"], "langkah A B di metode luar");
    sama(panjangGaris(akhirAdegan(a, 1), "mn1"), 2, "M N 2 meter");
    const t2 = akhirAdegan(a, 2);
    sama([panjangGaris(t2, "jd1"), panjangGaris(t2, "ie1"), nilaiId(t2, "t7")], [12, 8, "JI + ED = 12 − 8 = 4 m"], "J D 12, I E 8, selisih 4");
    const t3 = akhirAdegan(a, 3);
    sama([nilaiId(t3, "u1"), nilaiId(t3, "u2")], ["FG = 12 − 3 = 9", "AB = 24 − 9 = 15"], "F G dan A B pengayaan di metode luar");
    const k0 = akhirAdegan(adegan(U, "luar-ml"), 0);
    sama([nilaiId(akhirAdegan(adegan(U, "luar-ml"), 1), "a5")], ["8 − 6 = 2"], "contoh bagian dan keseluruhan 8 − 6 = 2");
    cek(ada(k0, "ml1c"), "tanda tanya bagian hilang");
  }
  // Metode luar: Closed Path Balance.
  {
    const a = adegan(U, "luar-cpb-terapan");
    const g = (n) => (ids) => jml(ids.map((i) => panjangGaris(akhirAdegan(a, n), `p${i}`)));
    sama(g(0)(["AB", "CD", "EF"]), 12, "timur pada gambar");
    sama(g(1)(["HI", "JK", "KL", "MN"]), 12, "barat pada gambar");
    sama(g(2)(["DE", "FG", "GH", "IJ"]), 12, "utara pada gambar");
    sama(g(2)(["BC", "LM", "NA"]), 12, "selatan pada gambar");
    sama([nilaiId(akhirAdegan(a, 0), "w1"), nilaiId(akhirAdegan(a, 1), "w2"), nilaiId(akhirAdegan(a, 2), "w3"), nilaiId(akhirAdegan(a, 2), "w4")], ["timur: 2 + 6 + 4 = 12", "barat: 4 + 2 + 4 + 2 = 12", "utara: 2 + 4 + 4 + 2 = 12", "selatan: 4 + 4 + 4 = 12"], "empat jumlah arah");
    const t4 = akhirAdegan(a, 4);
    sama(["y1", "y2", "y3", "y4"].map((id) => nilaiId(t4, id)), ["timur: 24 + 3 = 27", "barat: 12 + AB = 27", "AB = 27 − 12 = 15 m", "2 × 27 + 2 × 20 = 94"], "keseimbangan pengayaan");
    sama(nilaiId(akhirAdegan(a, 3), "x3"), "24 + 24 = 48 m", "jumlah akhir denah 48");
    const c3 = akhirAdegan(adegan(U, "luar-cpb"), 2);
    sama(nilaiId(c3, "e6"), "6 + 6 + 4 + 4 = 20 m", "ruang tamu 6 kali 4: 20");
  }
  // Ringkasan: hasil.
  {
    const t = akhirAdegan(adegan(U, "luar-ringkas"), 2);
    sama([[1, 0], [1, 1], [2, 0], [2, 1], [3, 0], [3, 1]].map(([r, c]) => nilaiId(t, `hs-t${r}${c}`)), ["denah rumah", "48 m", "Uji Kompetensi 5", "46 cm", "gedung sekolah", "94 m"], "tabel hasil di ringkasan");
  }
}

/* ------------------------------ Kutipan buku (bila PDF tersedia) ------------------------------ */
{
  const bs = new URL("../bahan-sd/Matematika-BS-KLS-V.pdf", import.meta.url);
  const bg = new URL("../bahan-sd/Matematika-BG-KLS-V.pdf", import.meta.url);
  const jalur = (u) => u.pathname.replace(/^\/([A-Za-z]:)/, "$1");
  const ambil = (berkas, dari, sampai) => {
    const r = spawnSync("pdftotext", ["-f", String(dari), "-l", String(sampai), "-raw", "-enc", "UTF-8", jalur(berkas), "-"], { encoding: "utf8", maxBuffer: 1 << 26 });
    return r.status === 0 ? r.stdout : null;
  };
  // Buku Siswa hlm. 125-130 = PDF 141-146; Panduan Guru hlm. 116 = PDF 128 dan hlm. 160-176 = PDF 172-188.
  const bagian = existsSync(bs) && existsSync(bg) ? [ambil(bs, 141, 146), ambil(bg, 128, 128), ambil(bg, 172, 188)] : [null];
  if (bagian.some((b) => b === null)) console.log("PDF atau pdftotext tidak tersedia: pemeriksaan kutipan buku dilewati");
  else {
    const bersih = (t) => t.toLowerCase().replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim();
    const buku = bersih(bagian.join("\n"));
    let n = 0;
    for (const a of M.adegan) {
      for (const kt of a.kutipan ?? []) {
        n += 1;
        cek(buku.includes(bersih(kt)), `kutipan buku ${a.id}: "${kt}" ada di teks PDF`);
      }
    }
    cek(n >= 80, `jumlah kutipan buku yang diperiksa (${n})`);
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k5b4e-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|k5b4e-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k5b4e sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k5b4e.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_E54|video-k4b2-umum|naskah-k5b4/.test(pembungkus) && /VIDEO_MATERI_K5B4E/.test(pembungkus) && /VIDEO_LUAR_K5B4E/.test(pembungkus) && /export function VideoK5B4E/.test(pembungkus) && /DaftarVideoCerita/.test(pembungkus) && /keVideoSiap/.test(pembungkus), "video-k5b4e: memakai dua video baru, bukan naskah lama");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Pemeriksaan: ${stat.sisi} sisi denah, ${stat.bentuk} bangun di gambar, ${stat.jumlah} jumlah di gambar, ${stat.teksPasang} pasangan teks`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
