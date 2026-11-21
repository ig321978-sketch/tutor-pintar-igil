// Uji Mind-map (Loyang Roti Pak Seno), Infografis (papan pesanan dan loyang gabungan), Simulasi Gabung Loyang, dan tahap Concrete, Pictorial, Abstract Kelas 5 Bab 3 Sub-Bab B ("Roti Isi Pak Seno"),
// lanjutan cerita Toko Roti Keliling (penjumlahan pecahan: penyebut sama, KPK, campuran dengan dua cara, disederhanakan).
// Memeriksa: logika pecahan murni (jumlah dihitung ulang dengan cara berbeda: pecahan desimal pembanding dan hasil kali penyebut), bar digambar sungguh sebanyak data, simulasi (gabung, samakan, campur, sederhana dengan alat menolak),
// misi, Mind-map enam label dan Infografis dua kartu dengan data bersambung, CPA dua belas langkah per tahap (Klik, Kanvas, Suara x empat metode) dengan jawaban beragam dan Cari kesalahan di tiap tahap,
// jawaban benar dihitung ulang dari data, angka tidak kembar per misi, pengenal ucapan, batas rupa, emoji, kata terlarang, akhir baris.
// Jalankan: node --no-warnings scripts/uji-loyang-k5b3b.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/loyang-k5b3b/logika.ts");
const DS = await import("../src/components/modul/loyang-k5b3b/data-sim.ts");
const DK = await import("../src/components/modul/loyang-k5b3b/data-kartu.ts");
const LC = await import("../src/components/modul/loyang-k5b3b/logika-cpa.ts");
const G = await import("../src/components/modul/loyang-k5b3b/logika-data.ts");
const D = await import("../src/components/modul/loyang-k5b3b/data.ts");
const K = await import("../src/components/modul/loyang-k5b3b/periksa.ts");
const S = await import("../src/components/modul/misi-simulasi.ts");
const MK = await import("../src/components/modul/misi-k5bab3.ts");
const MT = await import("../src/components/modul/misi-teks-k5b3.ts");
const folder = new URL("../src/components/modul/loyang-k5b3b/", import.meta.url);

let lulus = 0;
let gagal = 0;
const cek = (k, p) => {
  if (k) lulus += 1;
  else {
    gagal += 1;
    console.log("GAGAL:", p);
  }
};
const sama = (a, b, p) => cek(JSON.stringify(a) === JSON.stringify(b), `${p}: ${JSON.stringify(a)} != ${JSON.stringify(b)}`);
const bersih = (t) => !/buku|kelompok|bernilai|tebak|nilai|kelas|teman|skor|soal|kunci|latihan|senilai|ditemani|pangkat/i.test(t);
const tanpaDigit = (t) => !/\d/.test(t);
const emojiSah = (s) => [...s].every((c) => c.codePointAt(0) <= 0x1fa95 && c.codePointAt(0) !== 0x200d && c.codePointAt(0) !== 0x1f6de);
const IKAN = [0x1f41f, 0x1f420, 0x1f421, 0x1f988, 0x1f42c, 0x1f38f];
const DILARANG = [0x1fa74, 0x1f39f, 0x2602, 0x1fa9f, 0x1faa3, 0x1f355, 0x1faa1, 0x1f9cb, 0x1fa91];
// Topik Sub-Bab lain (pengurangan, perbandingan, garis timbang) tidak dibahas di Sub-Bab B.
const BUKAN_B = /dikurangi|pengurangan|kurangkan|dikurang|sisa adonan|membandingkan|garis timbang|timbangan/i;
const KATA_PENDEK = (t) => t.split(/\s+/).every((w) => w.replace(/[^a-zA-Z]/g, "").length <= 12);
const GAMBAR = /gambar|petak|kisi|titik|kotak|emoji|diagram|loyang berpotongan/i;

/* Pembanding independen: gcd dengan pengurangan, KPK dengan mencari kelipatan, nilai lewat desimal. */
const gcdBeda = (a, b) => {
  while (a !== b) a > b ? (a -= b) : (b -= a);
  return a;
};
const kpkBeda = (a, b) => {
  let m = Math.max(a, b);
  while (m % a !== 0 || m % b !== 0) m += 1;
  return m;
};
const nilaiDes = (w, n, d) => w + n / d;
const teksBentuk = (w, n, d) => {
  // Bentuk paling sederhana dihitung dari nilai desimal lewat penyebut hasil kali.
  const total = w * d + n;
  const g = gcdBeda(total, d);
  const bn = total / g;
  const bd = d / g;
  if (bd === 1) return `${bn}`;
  return bn > bd ? `${Math.floor(bn / bd)}${bn % bd === 0 ? "" : ` ${bn % bd}/${bd}`}` : `${bn}/${bd}`;
};
/** Jumlah dua campuran lewat hasil kali penyebut (bukan KPK), lalu disederhanakan. */
const jumlahBeda = (w1, n1, d1, w2, n2, d2) => {
  const tn = (w1 * d1 + n1) * d2 + (w2 * d2 + n2) * d1;
  const td = d1 * d2;
  const g = gcdBeda(tn, td);
  return { n: tn / g, d: td / g, w: Math.floor(tn / g / (td / g)), sisa: (tn / g) % (td / g) };
};
const tulisHasil = (h) => (h.sisa === 0 ? `${h.w}` : h.w === 0 ? `${h.sisa}/${h.d}` : `${h.w} ${h.sisa}/${h.d}`);
const BILANGAN_STORY = ["1/8+2/8", "2 1/5+3 1/5", "1/4+1/6", "1 1/2+2 1/4"];

/* ------------------------------ Logika pecahan murni ------------------------------ */
{
  for (const [a, b] of [[4, 6], [2, 3], [3, 9], [8, 12], [5, 7], [4, 8], [6, 10], [1, 1]]) {
    sama(G.kpk(a, b), kpkBeda(a, b), `KPK ${a} dan ${b} sama dengan mencari kelipatan`);
    sama(G.gcd(a, b), gcdBeda(a, b), `gcd ${a} dan ${b}`);
  }
  sama(G.kpk(4, 6), 12, "KPK 4 dan 6 (Story)");
  for (const [a, p, b, q] of [[1, 4, 1, 6], [2, 3, 1, 6], [1, 2, 2, 5], [3, 4, 3, 8], [1, 2, 1, 3], [1, 3, 4, 9]]) {
    const h = G.jumlah({ n: a, d: p }, { n: b, d: q });
    cek(Math.abs(h.n / h.d - (a / p + b / q)) < 1e-12 && G.gcd(h.n, h.d) === 1, `jumlah ${a}/${p} + ${b}/${q}: nilai desimal sama dan sudah sederhana`);
  }
  sama(G.sederhana({ n: 6, d: 9 }), { n: 2, d: 3 }, "sederhana 6/9");
  sama(G.keBiasa({ w: 2, n: 1, d: 5 }), { n: 11, d: 5 }, "campuran ke biasa: 2 1/5 menjadi 11/5");
  sama(G.keBiasa({ w: 3, n: 1, d: 5 }), { n: 16, d: 5 }, "campuran ke biasa: 3 1/5 menjadi 16/5");
  sama(G.keCampur({ n: 27, d: 5 }), { w: 5, n: 2, d: 5 }, "27/5 menjadi 5 2/5");
  sama(G.keCampur({ n: 15, d: 4 }), { w: 3, n: 3, d: 4 }, "15/4 menjadi 3 3/4");
  sama([G.tPec(3, 8), G.tCamp({ w: 5, n: 2, d: 5 }), G.tCamp({ w: 4, n: 0, d: 3 }), G.bentuk({ n: 9, d: 6 }), G.bentuk({ n: 5, d: 6 })], ["3/8", "5 2/5", "4", "1 1/2", "5/6"], "penulisan pecahan");
  // Story B sama dengan kontrak data.
  sama(G.jumlah({ n: 1, d: 8 }, { n: 2, d: 8 }), { n: 3, d: 8 }, "Story: 1/8 + 2/8 = 3/8");
  sama(G.bentuk(G.jumlah(G.keBiasa({ w: 2, n: 1, d: 5 }), G.keBiasa({ w: 3, n: 1, d: 5 }))), "5 2/5", "Story: mentega 5 2/5");
  sama(G.jumlah({ n: 1, d: 4 }, { n: 1, d: 6 }), { n: 5, d: 12 }, "Story: 1/4 + 1/6 = 5/12");
  sama(G.bentuk(G.jumlah(G.keBiasa({ w: 1, n: 1, d: 2 }), G.keBiasa({ w: 2, n: 1, d: 4 }))), "3 3/4", "Story: 3 3/4");
  cek(Object.values(G.IKON_BAHAN).every((e) => emojiSah(e) && ![...e].some((c) => DILARANG.includes(c.codePointAt(0)) || IKAN.includes(c.codePointAt(0)))) && G.NAMA_BAHAN.length >= 8, "ikon bahan emoji lama");
  cek(G.NAMA_BAHAN.every((b) => G.satuanBahan(b).length > 4 && bersih(G.satuanBahan(b))), "satuan tiap bahan tertulis");

  // Pengecoh: nilai tidak pernah sama dengan jawaban benar, teks tidak kembar.
  for (const [h, g] of [[{ n: 3, d: 5 }, { w: 0, n: 3, d: 10 }], [{ n: 9, d: 6 }, null], [{ n: 11, d: 7 }, { w: 0, n: 11, d: 14 }], [{ n: 5, d: 6 }, { w: 0, n: 3, d: 9 }]]) {
    const w = G.hasilKeliru(h, g);
    cek(w.length >= 2 && new Set(w).size === w.length, `pengecoh ${h.n}/${h.d}: dua atau lebih berbeda (${w.join(" | ")})`);
    cek(w.every((t) => t !== G.bentuk(h)) && w.every((t) => { const m = t.match(/^(?:(\d+) )?(\d+)\/(\d+)$|^(\d+)$/); if (!m) return false; const v = m[4] ? Number(m[4]) : Number(m[1] ?? 0) + Number(m[2]) / Number(m[3]); return Math.abs(v - h.n / h.d) > 1e-9; }), `pengecoh ${h.n}/${h.d}: nilai berbeda dari jawaban benar`);
  }

  // Tata bar: sel digambar sungguh sebanyak data.
  for (const baris of [
    [{ label: "2/7", w: 0, n: 2, d: 7 }, { label: "3/7", w: 0, n: 3, d: 7 }],
    [{ label: "1 1/3", w: 1, n: 1, d: 3 }, { label: "2 1/2", w: 2, n: 1, d: 2 }],
    [{ label: "3 3/5", w: 3, n: 3, d: 5 }, { label: "2 4/5", w: 2, n: 4, d: 5 }],
    [{ label: "5/6", w: 0, n: 5, d: 6 }, { label: "4/6", w: 0, n: 4, d: 6 }],
    [{ label: "1/4", w: 0, n: 1, d: 4 }, { label: "1/6", w: 0, n: 1, d: 6 }, { label: "3/12", w: 0, n: 3, d: 12 }, { label: "2/12", w: 0, n: 2, d: 12 }],
    [{ label: "2/12", w: 0, n: 2, d: 12 }, { label: "3/12", w: 0, n: 3, d: 12 }],
  ]) {
    const t = G.tataBar(baris);
    const dihitung = baris.reduce((a, r) => a + (r.w + (r.n > 0 ? 1 : 0)) * r.d, 0);
    const terisi = baris.reduce((a, r) => a + r.w * r.d + r.n, 0);
    cek(t.sel.length === dihitung, `tata bar ${baris.map((r) => r.label)}: sel sebanyak data (${t.sel.length} dari ${dihitung})`);
    cek(t.sel.filter((c) => c.isi).length === terisi, `tata bar ${baris.map((r) => r.label)}: sel terisi sebanyak pembilang dan bilangan bulat`);
    cek(t.bar.length === baris.reduce((a, r) => a + r.w + (r.n > 0 ? 1 : 0), 0), `tata bar ${baris.map((r) => r.label)}: banyak bar`);
    cek(t.sel.every((c) => c.x >= 45.9 && c.x + c.w <= 292.1 && c.y >= 20) && t.tinggi <= 200, `tata bar ${baris.map((r) => r.label)}: sel masuk kanvas dan tinggi muat (${t.tinggi})`);
    cek(t.sel.every((c, i, a) => a.slice(i + 1).every((e) => !(Math.abs(c.y - e.y) < 1 && Math.abs(c.x - e.x) < Math.min(c.w, e.w) - 0.01))), `tata bar ${baris.map((r) => r.label)}: sel tidak bertumpuk`);
    cek(t.sel.every((c) => c.w >= 10), `tata bar ${baris.map((r) => r.label)}: sel cukup lebar`);
    // Bar bilangan bulat penuh, bar pecahan berisi pembilang.
    cek(t.bar.filter((b) => b.penuh).every((b) => b.terisi === b.d), `tata bar ${baris.map((r) => r.label)}: bar bulat penuh`);
  }
}

/* ------------------------------ Simulasi: data dan logika ------------------------------ */
{
  cek(DS.TARGET_GABUNG.length === 3 && DS.TARGET_SAMAKAN.length === 3 && DS.TARGET_CAMPUR.length === 3 && DS.TARGET_SEDERHANA.length === 3, "simulasi: tiga sasaran tiap alat");
  cek(DS.TARGET_GABUNG.every((x) => x.a + x.b < x.d && G.gcd(x.a + x.b, x.d) === 1 && x.d <= 12), "simulasi gabung: jumlah kurang dari penyebut dan sudah sederhana");
  cek(DS.TARGET_SAMAKAN.every((x) => x.p !== x.q && kpkBeda(x.p, x.q) <= 24), "simulasi samakan: penyebut beda dan KPK muat");
  cek(DS.TARGET_SAMAKAN.some((x) => kpkBeda(x.p, x.q) !== x.p * x.q), "simulasi samakan: ada yang KPK-nya bukan hasil kali penyebut");
  cek(DS.TARGET_CAMPUR.every((x) => { const h = jumlahBeda(x.w1, x.n1, x.d, x.w2, x.n2, x.d); return h.d === x.d && h.sisa > 0; }), "simulasi campur: hasil tetap berpenyebut sama dan sudah sederhana");
  cek(DS.TARGET_CAMPUR.some((x) => x.n1 + x.n2 >= x.d), "simulasi campur: ada yang pecahannya melebihi seluruhnya");
  cek(DS.TARGET_SEDERHANA.every((x) => { const benar = teksBentuk(0, x.n, x.d); return x.kartu.length === 4 && new Set(x.kartu).size === 4 && x.kartu.filter((c) => c === benar).length === 1 && x.kartu.every(bersih); }), "simulasi sederhana: empat kartu berbeda, satu bentuk paling sederhana");
  const semuaSim = [...DS.TARGET_GABUNG.map((x) => `${x.a}/${x.d}+${x.b}/${x.d}`), ...DS.TARGET_SAMAKAN.map((x) => `${x.a}/${x.p}+${x.b}/${x.q}`)];
  cek(semuaSim.every((s) => !BILANGAN_STORY.includes(s)), "simulasi: bukan data Story");
  cek(tanpaDigit(DS.MISI_LOYANG_TEKS) && bersih(DS.MISI_LOYANG_TEKS) && !BUKAN_B.test(DS.MISI_LOYANG_TEKS) && DS.MISI_LOYANG_TEKS === MT.MISI_K5B3.B && D.MISI_LOYANG_TEKS === DS.MISI_LOYANG_TEKS && DS.MISI_LOYANG_TEKS.length >= 10 && DS.MISI_LOYANG_TEKS.length <= 170, "simulasi: teks misi bersih dan sama dengan misi-teks-k5b3");
  const a0 = L.awalLoyang();
  cek(a0.alat === "loyang" && a0.mode === "gabung" && a0.gabungN === 1 && a0.gabungD === DS.TARGET_GABUNG[0].d && a0.samaM === 0 && a0.sedPilih === -1 && !a0.tolakPenyebut && !a0.tolakKelipatan && !a0.tolakCampur && a0.salah === 0 && a0.gabungBenar.length + a0.samaBenar.length + a0.campBenar.length + a0.sedBenar.length === 0, "awal: belum ada hasil, pilihan, atau penolakan");
  sama(L.mulaiLagiLoyang(), a0, "mulai lagi sama dengan awal");
  sama([L.pilihModeLoyang(a0, "campur").mode, L.kata(11), L.hurufBesar("betul")], ["campur", "sebelas", "Betul"], "pilih alat, kata, huruf besar");

  /* Gabung */
  {
    DS.TARGET_GABUNG.forEach((x, i) => {
      let k = { ...L.awalLoyang(), gabungKe: i, gabungD: x.d };
      cek(L.sasaranGabung(k).a === x.a, `gabung sasaran ${i}: sasaran terbaca`);
      // Penyebut diubah ditolak dan menandai tantangan menolak.
      const tolak = L.periksaGabung(L.ubahGabungD({ ...k, gabungN: x.a + x.b }, 1));
      cek(!tolak.ok && tolak.tolak && tolak.k.tolakPenyebut === true && /menolak/i.test(L.petunjukGabung(L.ubahGabungD(k, 1))) && tanpaDigit(L.petunjukGabung(L.ubahGabungD(k, 1))), `gabung sasaran ${i}: penyebut yang diubah ditolak`);
      // Pembilang keliru dihitung percobaan, bukan penolakan.
      const keliru = L.periksaGabung({ ...k, gabungN: x.a + x.b + 1 });
      cek(!keliru.ok && !keliru.tolak && keliru.k.salah === 1 && !keliru.k.tolakPenyebut && !/menolak/i.test(L.petunjukGabung({ ...k, gabungN: x.a + x.b + 1 })), `gabung sasaran ${i}: pembilang keliru bukan penolakan`);
      k = { ...k, gabungN: 1 };
      for (let m = 1; m < x.a + x.b; m += 1) k = L.ubahGabungN(k, 1);
      const ok = L.periksaGabung(k);
      cek(ok.ok && ok.k.gabungBenar.length === 1 && ok.k.gabungKe === i + 1 && ok.k.gabungN === 1 && ok.k.gabungD === DS.TARGET_GABUNG[(i + 1) % 3].d, `gabung sasaran ${i}: hasil tepat menaikkan sasaran dan mereset pengatur`);
      cek(Math.abs((x.a + x.b) / x.d - (x.a / x.d + x.b / x.d)) < 1e-12, `gabung sasaran ${i}: nilai desimal sama`);
    });
    cek(L.ubahGabungN(a0, -1).gabungN === 1 && L.ubahGabungN({ ...a0, gabungN: 12 }, 1).gabungN === 12 && L.ubahGabungD({ ...a0, gabungD: 2 }, -1).gabungD === 2, "gabung: pengatur punya batas");
    const t = L.kalimatTerimaGabung(DS.TARGET_GABUNG[0]);
    cek(/^Betul!/.test(t) && tanpaDigit(t) && /dua per sembilan ditambah tiga per sembilan sama dengan lima per sembilan/.test(t), `gabung: kalimat terima mengeja pecahan (${t})`);
  }
  /* Samakan */
  {
    const kosong = L.periksaSamakan(a0);
    cek(!kosong.ok && !kosong.tolak && !kosong.k.tolakKelipatan && /menolak/i.test(L.petunjukSamakan(a0)) && tanpaDigit(L.petunjukSamakan(a0)), "samakan: memeriksa sebelum mengatur ditolak, bukan tantangan menolak");
    DS.TARGET_SAMAKAN.forEach((x, i) => {
      const m = kpkBeda(x.p, x.q);
      const dasar = { ...L.awalLoyang(), samaKe: i };
      const bukanKelipatan = Array.from({ length: 40 }, (_, j) => j + 1).find((v) => v % x.p !== 0 || v % x.q !== 0);
      const tolak = L.periksaSamakan({ ...dasar, samaM: bukanKelipatan });
      cek(!tolak.ok && tolak.tolak && tolak.k.tolakKelipatan === true && /menolak/i.test(L.petunjukSamakan({ ...dasar, samaM: bukanKelipatan })), `samakan sasaran ${i}: bukan kelipatan ditolak`);
      const lebih = x.p * x.q === m ? null : x.p * x.q;
      if (lebih) {
        const k2 = L.periksaSamakan({ ...dasar, samaM: lebih });
        cek(!k2.ok && !k2.tolak && k2.k.salah === 1 && !/menolak/i.test(L.petunjukSamakan({ ...dasar, samaM: lebih })) && tanpaDigit(L.petunjukSamakan({ ...dasar, samaM: lebih })), `samakan sasaran ${i}: kelipatan yang bukan terkecil bukan penolakan`);
      }
      let k = dasar;
      while ((k.samaM || 0) < m) k = L.ubahSamaM(k, 1);
      cek(k.samaM === m, `samakan sasaran ${i}: KPK ${m} dicapai dengan tombol tambah`);
      const ok = L.periksaSamakan(k);
      cek(ok.ok && ok.k.samaBenar.length === 1 && ok.k.samaKe === i + 1 && ok.k.samaM === 0, `samakan sasaran ${i}: KPK tepat menaikkan sasaran`);
      const h = jumlahBeda(0, x.a, x.p, 0, x.b, x.q);
      cek(h.d <= 24 && Math.abs(h.n / h.d - (x.a / x.p + x.b / x.q)) < 1e-12, `samakan sasaran ${i}: jumlah dihitung ulang`);
    });
    cek(L.ubahSamaM({ ...a0, samaM: 0 }, 1).samaM === 6 || L.ubahSamaM({ ...a0, samaM: 0 }, 1).samaM === 4, "samakan: pengatur mulai dari penyebut terbesar");
  }
  /* Campur */
  {
    DS.TARGET_CAMPUR.forEach((x, i) => {
      const dasar = { ...L.awalLoyang(), campKe: i };
      const tolak = L.periksaCampur({ ...dasar, campW: 1, campN: x.d });
      cek(!tolak.ok && tolak.tolak && tolak.k.tolakCampur === true && /menolak/i.test(L.petunjukCampur({ ...dasar, campN: x.d })) && tanpaDigit(L.petunjukCampur({ ...dasar, campN: x.d })), `campur sasaran ${i}: pembilang tidak kurang dari penyebut ditolak`);
      const h = jumlahBeda(x.w1, x.n1, x.d, x.w2, x.n2, x.d);
      sama(L.hasilCampur(x), { w: h.w, n: h.sisa }, `campur sasaran ${i}: hasil dihitung ulang lewat hasil kali penyebut`);
      const keliru = L.periksaCampur({ ...dasar, campW: h.w, campN: (h.sisa + 1) % x.d });
      cek(!keliru.ok && !keliru.tolak && keliru.k.salah === 1 && !/menolak/i.test(L.petunjukCampur({ ...dasar, campW: h.w, campN: (h.sisa + 1) % x.d })), `campur sasaran ${i}: hasil keliru bukan penolakan`);
      let k = dasar;
      for (let m = 0; m < h.w; m += 1) k = L.ubahCampW(k, 1);
      for (let m = 0; m < h.sisa; m += 1) k = L.ubahCampN(k, 1);
      const ok = L.periksaCampur(k);
      cek(ok.ok && ok.k.campBenar.length === 1 && ok.k.campKe === i + 1 && ok.k.campW === 0 && ok.k.campN === 0, `campur sasaran ${i}: hasil tepat menaikkan sasaran`);
    });
    cek(L.ubahCampW(a0, -1).campW === 0 && L.ubahCampN({ ...a0, campN: 14 }, 1).campN === 14, "campur: pengatur punya batas");
  }
  /* Sederhana */
  {
    const kosong = L.periksaSederhana(a0);
    cek(!kosong.ok && kosong.k.salah === 0 && /menolak/i.test(L.petunjukSederhana(a0)) && tanpaDigit(L.petunjukSederhana(a0)), "sederhana: memeriksa tanpa memilih ditolak");
    cek(L.pilihSederhana(a0, 1).sedPilih === 1 && L.pilihSederhana(L.pilihSederhana(a0, 1), 1).sedPilih === -1 && L.pilihSederhana(a0, 9) === a0, "sederhana: ketuk memilih dan membatalkan");
    DS.TARGET_SEDERHANA.forEach((x, i) => {
      const dasar = { ...L.awalLoyang(), sedKe: i };
      const benar = x.kartu.indexOf(teksBentuk(0, x.n, x.d));
      sama(L.kartuSederhana(x), benar, `sederhana sasaran ${i}: kartu benar dihitung ulang`);
      const ok = L.periksaSederhana({ ...dasar, sedPilih: benar });
      cek(ok.ok && ok.k.sedBenar.length === 1 && ok.k.sedKe === i + 1 && ok.k.sedPilih === -1, `sederhana sasaran ${i}: kartu benar menaikkan sasaran`);
      const salahPilih = (benar + 1) % 4;
      const sl = L.periksaSederhana({ ...dasar, sedPilih: salahPilih });
      cek(!sl.ok && sl.k.salah === 1 && !/menolak/i.test(L.petunjukSederhana({ ...dasar, sedPilih: salahPilih })) && tanpaDigit(L.petunjukSederhana({ ...dasar, sedPilih: salahPilih })), `sederhana sasaran ${i}: kartu keliru bukan penolakan`);
    });
  }
  /* Kalimat status */
  for (const f of [L.kalimatGabung, L.kalimatSamakan, L.kalimatCampur, L.kalimatSederhana]) cek(/^[A-Z]/.test(L.hurufBesar(f(a0))) && tanpaDigit(f(a0)) && bersih(f(a0)) && !BUKAN_B.test(f(a0)), `kalimat ${f.name}: awal huruf besar, tanpa digit`);
  /* Misi */
  {
    const dB = MK.daftarMisiK5Bab3("B");
    cek(dB === MK.MISI_B && dB.length === 6 && dB.filter((m) => m.wajib).length === 4 && dB.filter((m) => !m.wajib).length === 2, "misi: enam misi, empat wajib, dua bebas");
    cek(dB.every((m) => m.id.startsWith("b-")) && new Set(dB.map((m) => m.id)).size === 6, "misi: id berawalan b- dan unik");
    cek(S.misiBaru(dB, a0, new Set()).length === 0, "misi: keadaan awal tidak memenuhi misi");
    cek(dB.every((m) => !m.cek({ alat: "kerangka" })) && dB.every((m) => !m.cek({ alat: "timbang" })), "misi: alat lain tidak memenuhi misi");
    cek(dB.every((m) => tanpaDigit(m.teks) && bersih(m.teks) && !BUKAN_B.test(m.teks) && m.teks.length > 10 && m.teks.length < 120), "misi: teks tanpa digit, kata terlarang, dan istilah Sub-Bab lain");
    sama(S.misiBaru(dB, { ...a0, gabungBenar: [0] }, new Set()), ["b-gabung"], "misi: gabung");
    sama(S.misiBaru(dB, { ...a0, samaBenar: [0] }, new Set()), ["b-samakan"], "misi: samakan");
    sama(S.misiBaru(dB, { ...a0, campBenar: [0] }, new Set()), ["b-campur"], "misi: campur");
    sama(S.misiBaru(dB, { ...a0, sedBenar: [0] }, new Set()), ["b-sederhana"], "misi: sederhana");
    sama(S.misiBaru(dB, { ...a0, tolakPenyebut: true }, new Set()), ["b-tolak"], "misi: tolak");
    sama(S.misiBaru(dB, { ...a0, samaBenar: [0, 1] }, new Set()), ["b-samakan", "b-dua"], "misi: dua sasaran samakan");
    // Hanya penolakan penyebut pada alat Gabung menghitung tantangan menolak.
    cek(S.misiBaru(dB, L.periksaSamakan({ ...a0, samaM: 9 }).k, new Set()).length === 0 && S.misiBaru(dB, L.periksaCampur({ ...a0, campN: 9 }).k, new Set()).length === 0 && S.misiBaru(dB, L.periksaSederhana(a0).k, new Set()).length === 0 && S.misiBaru(dB, L.periksaGabung({ ...a0, gabungN: 3 }).k, new Set()).length === 0, "misi: penolakan alat lain tidak menghitung tantangan menolak");
    sama(S.misiBaru(dB, L.periksaGabung(L.ubahGabungD(a0, 1)).k, new Set()), ["b-tolak"], "misi: penolakan penyebut menghitung tantangan menolak");
  }
}

/* ------------------------------ Mind-map dan Infografis ------------------------------ */
{
  const n = DK.LANGKAH_LOYANG.length;
  cek(n >= 3 && n <= 6 && n === 6, `mind-map: jumlah label 3 sampai 6, enam untuk Sub-Bab ini (${n})`);
  const arti = DK.LANGKAH_LOYANG.map((l) => l.arti).join(" ");
  cek([...DK.LANGKAH_LOYANG.map((l) => l.judul), ...DK.LANGKAH_LOYANG.map((l) => l.arti), DK.PETUNJUK_PETA_LOYANG, DK.SELESAI_PETA_LOYANG, DK.JUDUL_PETA_LOYANG].every((t) => tanpaDigit(t) && bersih(t) && !BUKAN_B.test(t)), "mind-map: tanpa digit, kata terlarang, dan istilah Sub-Bab lain");
  cek(DK.LANGKAH_LOYANG.every((l) => l.judul.length <= 26 && KATA_PENDEK(l.judul)), "mind-map: judul langkah pendek, tiap kata paling banyak dua belas huruf (muat di 344 px)");
  const URUT = ["satu", "dua", "tiga", "empat", "lima", "enam"];
  cek(DK.LANGKAH_LOYANG.every((l, i) => l.arti.startsWith(`Langkah ${URUT[i]}.`)), "mind-map: arti dibacakan berurut");
  for (const m of ["penyebutnya sama", "kelipatan persekutuan terkecil", "pecahan yang sama besar", "pembilangnya saja", "penyebut tetap", "ukuran tiap potongan tidak berubah", "pecahan campuran", "pecahan biasa", "bilangan bulat dan pecahannya", "sederhanakan", "lebih besar daripada penyebut"]) cek(arti.toLowerCase().includes(m), `mind-map: memuat ${m}`);
  cek(DK.LANGKAH_LOYANG.every((l) => emojiSah(l.ikon)) && new Set(DK.LANGKAH_LOYANG.map((l) => l.ikon)).size === n && emojiSah(DK.IKON_JUDUL_PETA_LOYANG), "mind-map: ikon berbeda, emoji sah");

  /* Infografis: data bersambung dari Story B. */
  sama([DK.ARSIR, DK.BEDA], [{ a: 1, b: 2, d: 8 }, { a: 1, p: 4, b: 1, q: 6 }], "infografis: kontrak data");
  sama([DK.MENTEGA, DK.ADONAN], [{ c1: { w: 2, n: 1, d: 5 }, c2: { w: 3, n: 1, d: 5 } }, { c1: { w: 1, n: 1, d: 2 }, c2: { w: 2, n: 1, d: 4 } }], "infografis: kontrak data campuran");
  const k1 = DK.SEL_KARTU1;
  const k2 = DK.SEL_KARTU2;
  sama(k1.arsir.teks, ["1/8 + 2/8 = 3/8"], "infografis kartu 1: model arsir 3/8");
  sama(k1.tetap.teks, ["1 + 2 = 3", "penyebut tetap 8"], "infografis kartu 1: pembilang dijumlahkan, penyebut tetap");
  sama(k1.cara1.teks, ["2 1/5 + 3 1/5", "11/5 + 16/5 = 27/5", "= 5 2/5"], "infografis kartu 1: cara pertama (ubah ke biasa)");
  sama(k1.cara2.teks, ["2 + 3 = 5", "1/5 + 1/5 = 2/5", "= 5 2/5"], "infografis kartu 1: cara kedua (pisahkan bulat dan pecahan)");
  sama(k2.kpk.teks, ["KPK 4 dan 6 = 12"], "infografis kartu 2: KPK 4 dan 6");
  sama(k2.samakan.teks, ["1/4 = 3/12", "1/6 = 2/12"], "infografis kartu 2: pecahan yang sama besar");
  sama(k2.jumlah.teks, ["3/12 + 2/12 = 5/12"], "infografis kartu 2: jumlah 5/12");
  sama(k2.campur.teks, ["1 1/2 + 2 1/4", "6/4 + 9/4", "= 15/4"], "infografis kartu 2: campuran beda penyebut");
  sama([k2.sed1.teks, k2.sed2.teks], [["15/4 = 3 3/4"], ["27/5 = 5 2/5"]], "infografis kartu 2: disederhanakan");
  sama([DK.ID_KARTU1.length, DK.ID_KARTU2.length], [5, 6], "infografis: banyak sel tiap kartu");
  const semuaSel = [...Object.values(k1), ...Object.values(k2)];
  cek(new Set(semuaSel.map((s) => s.kunci)).size === semuaSel.length, "infografis: kunci sel unik");
  for (const s of semuaSel) cek(s.suara.length > 20 && tanpaDigit(s.suara) && bersih(s.suara) && !BUKAN_B.test(s.suara), `infografis ${s.kunci}: suara tanpa digit (${s.suara})`);
  cek(k1.arsir.suara.includes("satu per delapan ditambah dua per delapan sama dengan tiga per delapan") && k1.cara1.suara.includes("dua bulat satu per lima menjadi sebelas per lima") && k1.cara1.suara.includes("dua puluh tujuh per lima") && k1.cara1.suara.includes("lima bulat dua per lima") && k1.cara2.suara.includes("dua ditambah tiga sama dengan lima") && k2.kpk.suara.includes("kelipatan persekutuan terkecil empat dan enam adalah dua belas") && k2.jumlah.suara.includes("lima per dua belas") && k2.sed1.suara.includes("lima belas per empat menjadi tiga bulat tiga per empat"), "infografis: suara mengeja pecahan dan campuran");
  cek([DK.PETUNJUK1_INFO_LOYANG, DK.SELESAI1_INFO_LOYANG, DK.PETUNJUK2_INFO_LOYANG, DK.SELESAI2_INFO_LOYANG].every((t) => tanpaDigit(t) && bersih(t) && !BUKAN_B.test(t)), "infografis: petunjuk dan pesan tanpa digit dan istilah Sub-Bab lain");
  // Infografis memuat semua topik inti Sub-Bab B.
  const semuaSuara = semuaSel.map((s) => s.suara).join(" ").toLowerCase();
  for (const m of ["penyebutnya sama", "dipotong delapan bagian", "jumlahkan pembilangnya", "penyebutnya tetap", "cara pertama", "ubah ke pecahan biasa", "cara kedua", "pisahkan bilangan bulat dan pecahan", "penyebutnya beda", "kelipatan persekutuan terkecil", "pecahan yang sama besar", "campuran dengan penyebut beda", "disederhanakan", "menjadi lima bulat dua per lima", "menjadi tiga bulat tiga per empat"]) cek(semuaSuara.includes(m) || DK.SEL_KARTU2.sed1.suara.includes(m), `infografis: memuat topik inti "${m}"`);
}

/* ------------------------------ CPA: tiga tahap ------------------------------ */
const TAHAP = [
  ["Concrete", D.CONCRETE, "benda"],
  ["Pictorial", D.PICTORIAL, "diagram"],
  ["Abstract", D.ABSTRACT, "lambang"],
];
{
  cek(D.CONCRETE_LOYANG === D.CONCRETE && D.PICTORIAL_LOYANG === D.PICTORIAL && D.ABSTRACT_LOYANG === D.ABSTRACT, "nama ekspor untuk pemasang");
  cek(D.TEMA_LOYANG.concrete.nama === "Concrete" && D.TEMA_LOYANG.pictorial.nama === "Pictorial" && D.TEMA_LOYANG.abstract.nama === "Abstract", "tema tiga tahap");
  sama(D.CONCRETE.map((s) => s.nomor), [2, 3, 4], "nomor misi Concrete lanjut dari simulasi");
  sama(D.PICTORIAL.map((s) => s.nomor), [5, 6, 7], "nomor misi Pictorial");
  sama(D.ABSTRACT.map((s) => s.nomor), [8, 9, 10], "nomor misi Abstract");
  sama([LC.kataBil(0), LC.kataBil(11), LC.kataBil(27), LC.ucapkan("2 3/4 + 1/4 = 3"), LC.ucapkan("KPK 4 dan 6 = 12"), LC.ucapkan("5/6")], ["nol", "sebelas", "dua puluh tujuh", "dua bulat tiga per empat ditambah satu per empat sama dengan tiga", "kelipatan persekutuan terkecil empat dan enam sama dengan dua belas", "lima per enam"], "kata bilangan, pecahan, dan ucapan CPA");
  // Jawaban dihitung ulang dari data dengan cara lain (hasil kali penyebut, gcd dengan pengurangan), tanpa memakai fungsi jawaban.
  const hitung = (d, cara) => {
    let w = 0, n = 0, dd = 1;
    if (d.tipe === "igil" || d.tipe === "atas") {
      const h = jumlahBeda(0, d.a, d.d, 0, d.b, d.d);
      w = h.w; n = h.sisa; dd = h.d;
      if (cara === "kanvas") return d.a + d.b;
      if (cara === "suara") return d.tipe === "igil" ? d.d - (d.a + d.b) : d.d;
    } else if (d.tipe === "bawah") {
      const h = jumlahBeda(0, d.a, d.p, 0, d.b, d.q);
      w = h.w; n = h.sisa; dd = h.d;
      if (cara === "kanvas") return kpkBeda(d.p, d.q);
      if (cara === "suara") return h.n;
    } else {
      const h = jumlahBeda(d.w1, d.n1, d.d1, d.w2, d.n2, d.d2);
      w = h.w; n = h.sisa; dd = h.d;
      if (cara === "kanvas") return h.w;
      if (cara === "suara") return h.sisa;
    }
    return tulisHasil({ w, sisa: n, d: dd });
  };
  const semuaData = [];
  const salahDi = (soal) => soal.flatMap((s) => s.langkah.map((q) => q.langkah)).find((l) => l.tipe === "salah");
  for (const [nama, soal, rupa] of TAHAP) {
    sama(soal.map((s) => s.cara), ["klik", "kanvas", "suara"], `${nama}: tiga cara menjawab`);
    sama(soal.reduce((n, s) => n + s.langkah.length, 0), 12, `${nama}: dua belas tugas`);
    let adaSalah = 0;
    const posisiKlik = new Set();
    for (const s of soal) {
      const kanvas = [];
      const suaraAngka = [];
      cek(s.langkah.length === 4 && s.langkah.map((q) => q.metode).join() === "igil,atas,bawah,bulat", `${nama} misi ${s.nomor}: empat metode IGIL, Add the Tops, Match the Bottoms, Whole Then Part`);
      cek(bersih(s.judul) && bersih(s.cerita) && tanpaDigit(s.cerita) && !BUKAN_B.test(s.judul + s.cerita), `${nama} misi ${s.nomor}: judul dan cerita bersih`);
      cek(s.judul.startsWith(`Misi Loyang ${s.nomor}:`), `${nama} misi ${s.nomor}: judul berawalan Misi Loyang`);
      for (const q of s.langkah) {
        const l = q.langkah;
        const d = LC.dasarDari(l);
        const kunci = LC.kunciJawab(l, s.cara);
        cek(kunci !== null, `${nama} misi ${s.nomor} ${q.metode}: ada jawaban untuk cara ${s.cara}`);
        cek(LC.siapLangsung(l, rupa, s.cara) === (l.tipe !== "salah"), `${nama} misi ${s.nomor} ${q.metode}: siap langsung kecuali Cari kesalahan`);
        cek(q.suara === q.judul && tanpaDigit(q.suara) && bersih(q.suara) && !BUKAN_B.test(q.suara), `${nama} misi ${s.nomor} ${q.metode}: instruksi tanpa digit, kata terlarang, dan istilah Sub-Bab lain (${q.suara})`);
        cek(emojiSah(q.suara) && emojiSah(q.judul) && tanpaDigit(LC.ucapkan(q.suara)), `${nama} misi ${s.nomor}: emoji sah dan ucapan tanpa digit`);
        if (rupa === "lambang") cek(!GAMBAR.test(q.suara), `${nama} misi ${s.nomor} ${q.metode}: tahap Abstract tanpa menyebut gambar atau kotak`);
        cek(d.tipe === q.metode, `${nama} misi ${s.nomor}: metode ${q.metode} memakai tugas ${q.metode}`);
        semuaData.push([nama, s.nomor, q.metode, d]);
        cek(G.NAMA_BAHAN.includes(d.bahan), `${nama} misi ${s.nomor} ${q.metode}: bahan dikenal (${d.bahan})`);
        // Data sah menurut jenis tugas.
        if (d.tipe === "igil") cek(d.a >= 1 && d.b >= 1 && d.a + d.b < d.d && gcdBeda(d.a + d.b, d.d) === 1 && d.d <= 12 && d.a + d.b <= 9 && d.d - d.a - d.b <= 9 && ["roti", "kue", "kue kering"].includes(d.bahan), `${nama} misi ${s.nomor}: igil jumlah kurang dari satu dan sudah sederhana`);
        if (d.tipe === "atas") cek((s.cara !== "kanvas" || d.a + d.b <= 9) && d.d >= 5 && d.d <= 9, `${nama} misi ${s.nomor}: atas pembilang dan penyebut kecil`);
        if (d.tipe === "bawah") cek(d.p !== d.q && kpkBeda(d.p, d.q) <= 12, `${nama} misi ${s.nomor}: bawah penyebut beda, KPK paling besar dua belas`);
        if (d.tipe === "bulat") cek(d.w1 >= 1 && d.w2 >= 1 && d.w1 + d.w2 <= 5 && d.n1 < d.d1 && d.n2 < d.d2, `${nama} misi ${s.nomor}: bulat dua campuran sah`);
        // Hasil bukan data Story.
        cek(!BILANGAN_STORY.includes(d.tipe === "bulat" ? `${d.w1} ${d.n1}/${d.d1}+${d.w2} ${d.n2}/${d.d2}` : d.tipe === "bawah" ? `${d.a}/${d.p}+${d.b}/${d.q}` : `${d.a}/${d.d}+${d.b}/${d.d}`), `${nama} misi ${s.nomor} ${q.metode}: bukan data Story`);
        // Jawaban dihitung dari data.
        const h = hitung(d, s.cara);
        sama(kunci, typeof h === "number" ? { jenis: "angka", n: h } : { jenis: "nama", nama: h }, `${nama} ${d.tipe} cara ${s.cara}: jawaban benar dihitung dari data`);
        // Pilihan klik.
        if (s.cara === "klik") {
          const pk = LC.pilihanKlik(l);
          cek(pk.length === 3 && new Set(pk).size === 3, `${nama} misi ${s.nomor} ${q.metode}: tiga pilihan klik berbeda (${pk.join(" | ")})`);
          cek(pk.includes(kunci.nama) && pk[0] !== kunci.nama, `${nama} misi ${s.nomor} ${q.metode}: jawaban benar ada dan tidak di tombol pertama`);
          cek(LC.teksKunciKlik(l) === kunci.nama, `${nama} misi ${s.nomor} ${q.metode}: teks jawaban klik`);
          posisiKlik.add(pk.indexOf(kunci.nama));
          if (l.tipe === "salah") cek(pk.includes(l.jawabTokoh), `${nama} misi ${s.nomor}: jawaban tokoh ada di pilihan`);
          cek(pk.every((x) => emojiSah(x) && bersih(x) && KATA_PENDEK(x) && x.length <= 42), `${nama} misi ${s.nomor} ${q.metode}: pilihan bersih dan pendek`);
          // Hanya jawaban benar yang sama nilainya dengan jumlah, dihitung ulang dari teks pilihan.
          const nilaiBenar = d.tipe === "bawah" ? d.a / d.p + d.b / d.q : d.tipe === "bulat" ? nilaiDes(d.w1, d.n1, d.d1) + nilaiDes(d.w2, d.n2, d.d2) : (d.a + d.b) / d.d;
          const nilaiTeks = (x) => { const m = x.match(/^(?:(\d+) )?(\d+)\/(\d+)$|^(\d+)$/); return m[4] ? Number(m[4]) : Number(m[1] ?? 0) + Number(m[2]) / Number(m[3]); };
          sama(pk.map((x) => Math.abs(nilaiTeks(x) - nilaiBenar) < 1e-9), pk.map((x) => x === kunci.nama), `${nama} misi ${s.nomor} ${q.metode}: hanya jumlah yang tepat bernilai sama`);
          cek(pk.every((x) => (nilaiTeks(x) >= 1) === /^\d+( \d+\/\d+)?$/.test(x) || nilaiTeks(x) < 1), `${nama} misi ${s.nomor}: bentuk pilihan konsisten`);
        }
        if (s.cara === "suara") {
          const pk = LC.pilihanSuara(l, s.cara);
          const teksBenar = LC.teksKunciPilihan(kunci);
          cek(kunci.jenis === "angka" && kunci.n >= 1 && kunci.n <= 9, `${nama} misi ${s.nomor} ${q.metode}: jawaban suara satu angka (${kunci.n})`);
          cek(pk.length === 3 && new Set(pk).size === 3 && pk.includes(teksBenar) && pk[0] !== teksBenar, `${nama} misi ${s.nomor} ${q.metode}: pilihan ketuk cadangan suara (${pk.join(" | ")})`);
          cek(K.cocokUcapan(teksBenar, kunci).cocok && K.cocokUcapan(String(kunci.n), kunci).cocok, `${nama} misi ${s.nomor}: pengenal ucapan mengenali jawaban`);
          cek(tanpaDigit(pk.join(" ")), `${nama} misi ${s.nomor}: pilihan suara tanpa digit`);
          cek(pk.filter((x) => x !== teksBenar).every((x) => !K.cocokUcapan(x, kunci).cocok), `${nama} misi ${s.nomor}: pilihan salah tidak dikenali sebagai jawaban benar`);
          cek(pk.every((x) => K.angkaDariUcapan(x).length === 1), `${nama} misi ${s.nomor}: semua pilihan suara dikenali pengenal ucapan`);
          if (kunci.jenis === "angka") suaraAngka.push(kunci.n);
        }
        if (s.cara === "kanvas") {
          cek(kunci.jenis === "angka" && kunci.n >= 1 && kunci.n <= 9, `${nama} misi ${s.nomor} ${q.metode}: kanvas satu angka satu sampai sembilan (${kunci.n})`);
          kanvas.push(kunci.n);
          cek(LC.pilihanSuara(l, s.cara).length === 0, `${nama} misi ${s.nomor}: kanvas tanpa pilihan suara`);
        }
        // Kalimat benar diawali huruf kapital dan tanpa spasi sebelum tanda baca.
        const kk = LC.kalimatKunci(l, s.cara);
        cek(/^[A-Z]/.test(kk) && !/ [.,:;!?]/.test(kk) && /[.]$/.test(kk) && bersih(kk) && !BUKAN_B.test(kk), `${nama} misi ${s.nomor} ${q.metode}: kalimat pembenaran (${kk})`);
        cek(tanpaDigit(LC.ucapkan(kk)), `${nama} misi ${s.nomor} ${q.metode}: kalimat pembenaran dieja tanpa digit`);
        const pet = LC.petunjukSalah(l, s.cara, "x");
        if (rupa === "lambang") cek(!GAMBAR.test(kk + pet), `${nama} misi ${s.nomor} ${q.metode}: umpan balik Abstract tanpa menyebut gambar atau kotak`);
        cek(pet.length > 15 && bersih(pet) && tanpaDigit(pet) && !BUKAN_B.test(pet), `${nama} misi ${s.nomor} ${q.metode}: petunjuk salah tanpa digit`);
        if (l.tipe !== "salah") {
          const bocor = kunci.jenis === "angka" ? new RegExp(`\\b${kunci.n}\\b|\\b${LC.kataBil(kunci.n)}\\b`) : new RegExp(`\\b${kunci.nama}\\b`);
          cek(!bocor.test(pet), `${nama} misi ${s.nomor} ${q.metode}: petunjuk tidak menyebut jawaban (${pet})`);
        }
        const kt = LC.kalimatTanya(l, s.cara);
        cek(bersih(kt) && tanpaDigit(kt) && kt.endsWith("?"), `${nama} misi ${s.nomor} ${q.metode}: pertanyaan tanpa digit`);
        // Tampilan: bar digambar sungguh dari data.
        if (rupa !== "lambang") {
          const tp = LC.tampilan(d, s.cara, rupa);
          sama(tp.mode, rupa === "benda" ? "loyang" : "bar", `${nama} misi ${s.nomor} ${q.metode}: mode gambar`);
          cek(tp.judul.length <= 38 && bersih(tp.judul) && emojiSah(tp.judul), `${nama} misi ${s.nomor} ${q.metode}: judul gambar pendek (${tp.judul})`);
          const t = G.tataBar(tp.baris);
          const terisi = tp.baris.reduce((a, r) => a + r.w * r.d + r.n, 0);
          cek(t.sel.length === tp.baris.reduce((a, r) => a + (r.w + (r.n > 0 ? 1 : 0)) * r.d, 0) && t.sel.filter((c) => c.isi).length === terisi && t.tinggi <= 200, `${nama} misi ${s.nomor} ${q.metode}: bar digambar sungguh (${t.sel.length} sel, tinggi ${t.tinggi})`);
          cek(t.sel.every((c) => c.w >= 10), `${nama} misi ${s.nomor} ${q.metode}: sel cukup lebar`);
          if (rupa === "diagram") cek(!/[\u{1F300}-\u{1FAFF}]/u.test(JSON.stringify(tp)), `${nama} misi ${s.nomor} ${q.metode}: bar polos tanpa emoji`);
          // Label sama dengan data.
          if (d.tipe === "igil" || d.tipe === "atas") sama(tp.baris.map((r) => [r.n, r.d]), [[d.a, d.d], [d.b, d.d]], `${nama} misi ${s.nomor}: gambar sama dengan pecahan data`);
          if (d.tipe === "bawah") sama(tp.baris.map((r) => [r.n, r.d]), [[d.a, d.p], [d.b, d.q]], `${nama} misi ${s.nomor}: gambar sama dengan pecahan data`);
          if (d.tipe === "bulat") sama(tp.baris.map((r) => [r.w, r.n, r.d]), [[d.w1, d.n1, d.d1], [d.w2, d.n2, d.d2]], `${nama} misi ${s.nomor}: gambar sama dengan campuran data`);
        }
        // Kartu data Abstract memuat data yang cukup untuk menjawab, dan menyisakan satu hal yang ditanyakan.
        if (rupa === "lambang") {
          const baris = LC.barisKartu(d, s.cara);
          cek(baris.length === 3 && baris.every((x) => bersih(x) && !GAMBAR.test(x) && emojiSah(x) && !BUKAN_B.test(x)), `${nama} misi ${s.nomor} ${q.metode}: kartu data bersih`);
          cek(baris.filter((x) => x.includes("?")).length === 1, `${nama} misi ${s.nomor} ${q.metode}: kartu data menyisakan satu hal yang ditanyakan`);
          cek(baris[0].startsWith("pecahan pertama: ") && baris[1].startsWith("pecahan kedua: "), `${nama} misi ${s.nomor} ${q.metode}: kartu memuat pecahan dari data`);
        }
        if (l.tipe === "salah") {
          adaSalah += 1;
          const w = l;
          cek(w.alasan.length === 3 && new Set(w.alasan).size === 3 && w.benar >= 0 && w.benar <= 2, `${nama}: tiga alasan berbeda, satu benar`);
          cek(w.alasan.every((a2) => /^[A-Z]/.test(a2) && !/ [.,:;!?]/.test(a2) && bersih(a2) && !BUKAN_B.test(a2) && tanpaDigit(a2) && (rupa !== "lambang" || !GAMBAR.test(a2))), `${nama}: alasan diawali huruf kapital, tanpa digit dan kata terlarang`);
          cek(/^[A-Z]/.test(w.keliru) && bersih(w.keliru) && /^[A-Z]/.test(w.kataTokoh) && bersih(w.kataTokoh) && tanpaDigit(w.kataTokoh) && tanpaDigit(w.keliru), `${nama}: kalimat tokoh dan penjelasan berhuruf kapital`);
          cek(["Bima", "Citra", "Fajar"].includes(w.tokoh) && w.alasan[w.benar].startsWith(w.tokoh) && /keliru|benar/.test(w.alasan[w.benar]), `${nama}: alasan benar menyebut tokoh`);
          cek(w.alasan.every((a2) => !new RegExp(`\\b${kunci.nama.replace(/[.+]/g, "\\$&")}\\b`).test(a2)), `${nama}: alasan tidak membocorkan jawaban benar (${kunci.nama})`);
          cek(LC.petunjukSalah(w, "klik", w.jawabTokoh).startsWith(`Itu jawaban ${w.tokoh}`), `${nama}: pilih jawaban tokoh mendapat petunjuk tokoh`);
          cek(w.betul === true ? w.jawabTokoh === kunci.nama : w.jawabTokoh !== kunci.nama, `${nama}: jawaban tokoh ${w.betul ? "benar" : "keliru"} sesuai jawaban`);
          cek(["atas", "bawah", "bulat"].includes(q.metode), `${nama}: Cari kesalahan memakai metode Add the Tops, Match the Bottoms, atau Whole Then Part`);
          const awal = w.alasan.map((a2) => a2.split(",")[0]);
          cek(new Set(awal).size === 1 && /^(Bima|Citra|Fajar) (keliru|benar)$/.test(awal[0]), `${nama}: tiga alasan berawalan sama (${awal.join(" | ")})`);
        }
      }
      if (s.cara === "kanvas") sama(new Set(kanvas).size, 4, `${nama}: empat angka kanvas tidak kembar (${kanvas.join(",")})`);
      if (s.cara === "suara") sama(new Set(suaraAngka).size, 4, `${nama}: empat jawaban suara tidak kembar (${suaraAngka.join(",")})`);
    }
    cek(adaSalah === 1, `${nama}: tepat satu Cari kesalahan`);
    cek(posisiKlik.size >= 2, `${nama}: posisi jawaban benar bervariasi`);
  }
  // Tidak ada dua tugas yang sama persis dalam seluruh bab ini.
  const sidik = semuaData.map(([, , , d]) => JSON.stringify(d));
  cek(new Set(sidik).size === sidik.length, "tidak ada dua tugas yang memakai data sama persis");
  // Data CPA berbeda dari Simulasi.
  const kodeSim = new Set([...DS.TARGET_GABUNG.map((x) => `${x.a}/${x.d}+${x.b}/${x.d}`), ...DS.TARGET_SAMAKAN.map((x) => `${x.a}/${x.p}+${x.b}/${x.q}`), ...DS.TARGET_CAMPUR.map((x) => `${x.w1} ${x.n1}/${x.d}+${x.w2} ${x.n2}/${x.d}`)]);
  cek(semuaData.every(([, , , d]) => !kodeSim.has(d.tipe === "bulat" ? `${d.w1} ${d.n1}/${d.d1}+${d.w2} ${d.n2}/${d.d2}` : d.tipe === "bawah" ? `${d.a}/${d.p}+${d.b}/${d.q}` : `${d.a}/${d.d}+${d.b}/${d.d}`)), "data CPA berbeda dari data Simulasi");
  for (const [nama, soal] of TAHAP) for (const s of soal) for (const q of s.langkah) cek(!/\b(Raka|Salsa|Nisa|Yohana|Lukas|Komang|Asep|wingko|martabak|Pak Joyo|batik|angklung|kolam|renang|ember|ubin|Bu Dewi|Pak Rudi|keramik|Karel|Azizah|Bu Rini|Pak Dodi|bazar|Satria|Laras|Genta|Bu Marni|Pak Tarno|Bu Wati|Pak Joko|klepon|stadion|tribun|lonceng)\b/i.test(q.suara + s.cerita + s.judul), `${nama}: tanpa tokoh atau benda lama`);
  // Seed alur.
  const sc = salahDi(D.CONCRETE);
  cek(sc.tokoh === "Fajar" && !sc.betul && sc.dasar.tipe === "atas" && sc.dasar.a === 2 && sc.dasar.b === 1 && sc.dasar.d === 5 && sc.jawabTokoh === "3/10", "seed Concrete: Fajar menjumlahkan penyebut juga (2/5 + 1/5 = 3/10)");
  const sp = salahDi(D.PICTORIAL);
  cek(sp.tokoh === "Citra" && sp.betul === true && sp.dasar.tipe === "bawah" && sp.jawabTokoh === "5/6" && jumlahBeda(0, sp.dasar.a, sp.dasar.p, 0, sp.dasar.b, sp.dasar.q).n === 5, "seed Pictorial: Citra benar, dua per tiga ditambah satu per enam lewat KPK enam");
  const sa = salahDi(D.ABSTRACT);
  cek(sa.tokoh === "Fajar" && !sa.betul && sa.dasar.tipe === "bulat" && sa.jawabTokoh === "3 3/10", "seed Abstract: Fajar menjumlahkan penyebut pada pecahan campuran");
  sama([D.CONCRETE, D.PICTORIAL, D.ABSTRACT].map((t) => salahDi(t).posisi), [1, 0, 2], "posisi tampilan alasan benar: kedua, pertama, ketiga");
  const lebihPendek = [D.CONCRETE, D.PICTORIAL, D.ABSTRACT].map((t) => { const w = salahDi(t); return w.alasan[w.benar].length < Math.max(...w.alasan.map((a) => a.length)); });
  cek(lebihPendek.some(Boolean), "alasan benar tidak selalu yang terpanjang");
  // Poin penting dan jembatan.
  cek(D.POIN_PENTING.length === 6 && D.POIN_PENTING_SUARA.length === 6 && D.POIN_PENTING_SUARA.every(tanpaDigit) && D.POIN_PENTING.every(bersih), "poin penting: enam butir, suara tanpa digit, tanpa kata terlarang");
  cek(D.POIN_PENTING.every((p) => /^[A-Z]/.test(p) && !/ [,:;!?]/.test(p) && /\.$/.test(p)), "poin penting: huruf kapital dan tanpa spasi sebelum tanda baca");
  const ps = D.POIN_PENTING_SUARA.join(" ").toLowerCase();
  cek(/penyebutnya sama/.test(ps) && /jumlahkan pembilangnya dan penyebut tetap/.test(ps) && /satu per delapan ditambah dua per delapan sama dengan tiga per delapan/.test(ps) && /model arsir/.test(ps) && /dua cara/.test(ps) && /kelipatan persekutuan terkecil empat dan enam adalah dua belas/.test(ps) && /lima per dua belas/.test(ps) && /dua puluh tujuh per lima menjadi lima bulat dua per lima/.test(ps) && /lima belas per empat menjadi tiga bulat tiga per empat/.test(ps), `poin penting: penyebut sama, arsir, dua cara, KPK, dan disederhanakan diucapkan dengan kata: ${ps}`);
  cek(/Bu Nani/.test(D.PENUTUP_B) && /pembuat kue/.test(D.PENUTUP_B) && /sisa/.test(D.PENUTUP_B) && /pesanan/.test(D.PENUTUP_B) && /berapa bagian adonan/.test(D.PENUTUP_B) && tanpaDigit(D.PENUTUP_B) && bersih(D.PENUTUP_B), "jembatan ke Sub-Bab C: Bu Nani datang dengan loyang sisa dan pesanan");
}

/* ------------------------------ Pengenal ucapan ------------------------------ */
{
  sama(K.angkaDariUcapan("lima dan 7"), [5, 7], "ucapan: angka dari kata dan digit");
  sama(K.angkaDariUcapan("delapan"), [8], "ucapan: delapan");
  cek(K.cocokUcapan("enam", { jenis: "angka", n: 6 }).cocok && !K.cocokUcapan("tujuh", { jenis: "angka", n: 6 }).cocok && K.cocokUcapan("6", { jenis: "angka", n: 6 }).cocok, "ucapan: cocok hanya bila sama");
  cek(K.cocokUcapan("", { jenis: "angka", n: 3 }).terdengar.length === 0 && K.cocokUcapan("", { jenis: "nama", nama: "x" }).terdengar.length === 0, "ucapan: sepi tidak terdengar apa pun");
}

/* ------------------------------ Berkas folder ------------------------------ */
{
  const berkas = readdirSync(folder).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const f of ["data.ts", "data-kartu.ts", "data-sim.ts", "logika.ts", "logika-cpa.ts", "logika-data.ts", "periksa.ts", "GambarLoyang.tsx", "JawabLoyang.tsx", "LangkahLoyang.tsx", "TahapLoyang.tsx", "PetaLoyang.tsx", "InfoLoyang.tsx", "SimulasiGabungLoyang.tsx"]) cek(berkas.includes(f), `${f} ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(emojiSah(s) && !DILARANG.some((c) => [...s].some((x) => x.codePointAt(0) === c)) && !IKAN.some((c) => [...s].some((x) => x.codePointAt(0) === c)), `${f}: emoji paling tinggi U+1FA95, tanpa ZWJ, ikan, dan emoji yang tampil kosong`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}|\\u\{1FA74\}|\\u\{1F39F\}|\\u2602|\\u\{1FA9F\}|\\u\{1FAA3\}|\\u\{1F9CB\}/i.test(s), `${f}: kode emoji sah`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/nilai|kunci/i.test(s.replace(/[A-Za-z]*[Kk]unci[A-Za-z]*/g, "")), `${f}: tanpa kata nilai dan tanpa kata kunci di teks`);
    cek(!/senilai|kelompok|pangkat/i.test(s), `${f}: tanpa kata senilai, kelompok, pangkat`);
    cek(!/jajanan-k4b6a|bazar-k4b6b|etalase-k4b5|mosaik-k4b5|ubin-k4b4|ember-k4b4|angklung|batik|keramik|stadion|tribun|piring-k5b2c|lonceng-k5b2a/i.test(s), `${f}: tidak merujuk bab lain`);
    cek(!/timbang-k5b3a|adonan-k5b3c|KeadaanTimbang|KeadaanAdonan/.test(s.replace(/@\/[^\n]*/g, "")), `${f}: tanpa folder Sub-Bab lain`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => !/SubBabK5B3|kit-k5b3|infografis-k5b3|skenario-k5b3|mesin-data-k5b3|lab-|SimulasiLab|model-(banding|jumlah|sisa)-k5b3|data-k5b3|naskah-k5b3|peta-label\/PetaLabel|peta-label\/InfoKartu|timbang-k5b3a|adonan-k5b3c|piring-k5b2c/.test(i)), `${f}: tidak mengimpor berkas lama Bab 3, PetaLabel, InfoKartu, atau folder Sub-Bab lain`);
  }
  const gambar = readFileSync(new URL("GambarLoyang.tsx", folder), "utf8");
  cek(/tataBar/.test(gambar) && /PapanLoyang/.test(gambar) && /BarPecahan/.test(gambar) && /ikonBahan/.test(gambar), "gambar memakai logika bar murni yang diuji (sel digambar dari data)");
  cek(!/flex-wrap/.test(gambar) && !/<img/.test(gambar), "gambar tanpa flex-wrap");
  const polos = gambar.slice(gambar.indexOf("export function BarPecahan"), gambar.indexOf("export function PapanTampilan"));
  cek(!/[\u{1F300}-\u{1FAFF}]/u.test(polos) && !/ikonBahan/.test(polos), "bar pecahan polos: tanpa emoji");
  cek(!berkas.some((f) => /capitalize/.test(readFileSync(new URL(f, folder), "utf8"))), "tanpa CSS capitalize");
  const lang = readFileSync(new URL("LangkahLoyang.tsx", folder), "utf8");
  cek(/Pikirkan lagi apa yang \$\{l\.tokoh\} lakukan/.test(lang) && !/Lihat lagi\. \$\{l\.keliru\}|belum tepat\. \$\{l\.keliru\}/.test(lang), "Cari kesalahan: salah memilih keputusan atau alasan hanya mengarahkan, tidak membocorkan");
  const sim = readFileSync(new URL("SimulasiGabungLoyang.tsx", folder), "utf8");
  cek(/setCatatan\(ucap \?\? ""\)/.test(sim) && /PapanLoyang/.test(sim) && /BarPecahan/.test(sim) && /grid grid-cols-2 gap-2/.test(sim) && !/flex-wrap/.test(sim), "simulasi: pesan lama dikosongkan, empat alat dalam grid dua kali dua, bar digambar dari data");
  cek(/Kurangi pembilang/.test(sim) && /Tambah penyebut/.test(sim) && /Kurangi KPK/.test(sim) && /Tambah bilangan bulat/.test(sim) && /col-span-3/.test(sim), "simulasi: nama di baris sendiri di atas tombol kurang dan tambah (tidak terjepit)");
  const mm = readFileSync(new URL("PetaLoyang.tsx", folder), "utf8");
  cek(/export default function PetaLoyang/.test(mm) && /export \{ PetaLoyang \}/.test(mm) && !/PetaLabel|PetaKartu/.test(mm) && !/flex-wrap/.test(mm) && mm.includes("grid-cols-[100px_1fr]") && mm.includes("grid-cols-[1fr_100px]") && !/break-words/.test(mm) && /speakGuru/.test(mm) && /LANGKAH_LOYANG/.test(mm), "Mind-map: komponen sendiri (loyang berenam sekat bergantian kiri-kanan), kisi tetap, label kosong diketuk dibacakan Guru");
  const dl = readFileSync(new URL("InfoLoyang.tsx", folder), "utf8");
  cek(/export default function InfoLoyang/.test(dl) && /export \{ InfoLoyang \}/.test(dl) && !/InfoKartu|InfografisKartu/.test(dl) && !/flex-wrap/.test(dl) && /grid-cols-2/.test(dl) && /Kartu \{kartu\} dari 2/.test(dl) && /BarMini/.test(dl), "Infografis: komponen sendiri (papan pesanan dan loyang gabungan), dua kartu, kisi tetap");
  const th = readFileSync(new URL("TahapLoyang.tsx", folder), "utf8");
  cek(/export default function TahapLoyang/.test(th) && /poinPenting/.test(th) && /PENUTUP_B/.test(th) && !/flex-wrap/.test(th), "Tahap: ekspor default, Poin Penting dengan jembatan, kemajuan berupa kisi tetap");
  const sa2 = readFileSync(new URL("../SimulasiK5Bab3.tsx", folder), "utf8");
  cek(/misiDaftar: daftarMisiK5Bab3\("B"\)/.test(sa2) && /SimulasiGabungLoyang/.test(sa2) && /laporMisiLoyang\(daftarMisiK5Bab3\("B"\), k, a\.capai\)/.test(sa2), "SimulasiK5Bab3: Sub-Bab B memakai misiDaftar dan laporMisi");
  cek(MT.misiAwalK5Bab3("B").includes(DS.MISI_LOYANG_TEKS), "misi awal Sub-Bab B memuat teks misi");
}

console.log(`Uji Roti Isi Pak Seno Kelas 5 Bab 3 B: ${lulus} lulus, ${gagal} gagal`);
process.exit(gagal ? 1 : 0);
