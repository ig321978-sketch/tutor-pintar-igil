// Uji Story Kelas 5 Bab 5 Sub-Bab B (luas daerah bangun datar): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// pemisahan materi dan metode luar, kutipan buku dan Buku Panduan Guru (bila PDF ada), luas semua bangun dan potongan dihitung mandiri
// (rumus tali sepatu dari titik gambar), kunci Eksplorasi 5.2A-5.2G, hitungan tiap metode luar, emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k5b5b.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k5b5b-video.ts");
const G = await import("../src/components/modul/story/k5b5b-gambar.ts");

let lulus = 0;
let gagal = 0;
const cek = (kondisi, pesan) => {
  if (kondisi) lulus += 1;
  else {
    gagal += 1;
    console.log("GAGAL:", pesan);
  }
};
const js = (x) => JSON.stringify(x, (_, v) => (typeof v === "bigint" ? `${v}n` : v));
const sama = (a, b, pesan) => cek(js(a) === js(b), `${pesan}: ${js(a)} != ${js(b)}`);

/* Mesin (logika-story) diuji lengkap di scripts/uji-story-k6b4a.mjs. */
cek(typeof L.keadaanStory === "function" && typeof L.posisiKata === "function", "mesin Story tersedia");

/* ------------------------------ Bilangan mandiri ------------------------------ */
const angka = (t) => Number(String(t).replace(/\./g, ""));
const bandingSelisih = (a, b) => (angka(a) - angka(b) > 0 ? ">" : angka(a) - angka(b) < 0 ? "<" : "=");

/** Periksa semua hubungan bilangan di teks gambar: kali, bagi, jumlah, selisih, dan rantai pembanding. Mengembalikan jumlah yang diperiksa. */
function periksaTeks(t, nama) {
  let n = 0;
  let s = t;
  const pola = (re, f) => {
    for (const m of s.matchAll(re)) {
      n += 1;
      f(m);
    }
    s = s.replace(re, " ");
  };
  pola(/(\d[\d.]*) x (\d[\d.]*) = (\d[\d.]*)/g, (m) => cek(angka(m[1]) * angka(m[2]) === angka(m[3]), `${nama}: hasil kali di gambar "${m[0]}" benar`));
  pola(/(\d[\d.]*) : (\d[\d.]*) = (\d[\d.]*)/g, (m) => cek(angka(m[1]) === angka(m[2]) * angka(m[3]), `${nama}: hasil bagi di gambar "${m[0]}" benar`));
  pola(/(\d[\d.]*) - (\d[\d.]*) = (\d[\d.]*)/g, (m) => cek(angka(m[1]) - angka(m[2]) === angka(m[3]), `${nama}: selisih di gambar "${m[0]}" benar`));
  pola(/(\d[\d.]*) \+ (\d[\d.]*) = (\d[\d.]*)/g, (m) => cek(angka(m[1]) + angka(m[2]) === angka(m[3]), `${nama}: jumlah di gambar "${m[0]}" benar`));
  for (const m of s.matchAll(/\d[\d.]*(?: [<>=] \d[\d.]*)+/g)) {
    const bagian = m[0].split(" ");
    for (let i = 0; i + 2 < bagian.length; i += 2) {
      n += 1;
      cek(bandingSelisih(bagian[i], bagian[i + 2]) === bagian[i + 1], `${nama}: rantai di gambar "${m[0]}" benar`);
    }
  }
  return n;
}

/* ------------------------------ Isi dua video ------------------------------ */
const VIDEO = [V.VIDEO_MATERI_K5B5B, V.VIDEO_LUAR_K5B5B];
const bilanganDari = (t) => (t.match(/\d[\d.]*\d|\d/g) ?? []).map((v) => v.replace(/\./g, ""));
const semuaSidik = new Map();
let totalKetukan = 0;
let totalKata = 0;
let diperiksa = 0;
for (const v of VIDEO) {
  cek(v.adegan.length >= 7, `${v.id}: paling sedikit 7 adegan (ada ${v.adegan.length})`);
  cek(["materi", "metode-luar"].includes(v.jenis) && v.judul.length > 5 && v.subjudul.length > 5, `${v.id}: jenis dan judul ada`);
  cek(new Set(v.adegan.map((a) => a.id)).size === v.adegan.length, `${v.id}: id adegan unik`);
  for (const a of v.adegan) {
    const nama = `${v.id}/${a.id}`;
    cek(a.ketukan.length >= 3 && a.ketukan.length <= 14, `${nama}: 3 sampai 14 ketukan (ada ${a.ketukan.length})`);
    cek(a.sumber.length > 8 && a.sumber.length <= 75 && a.judul.length > 5 && /^#[0-9A-Fa-f]{6}$/.test(a.latar), `${nama}: sumber (paling panjang 75 huruf), judul, dan latar ada`);
    let sebelumnya = null;
    const terlihat = new Set();
    a.ketukan.forEach((kt, i) => {
      const kata = L.kataDari(kt.suara);
      totalKetukan += 1;
      totalKata += kata.length;
      cek(kata.length >= 6 && kata.length <= 40, `${nama}#${i + 1}: 6 sampai 40 kata (ada ${kata.length})`);
      cek(!/[=×÷<>\/%+]/.test(kt.suara), `${nama}#${i + 1}: suara tanpa lambang yang sulit dibaca mesin suara`);
      cek(/[.?!]$/.test(kt.suara.trim()), `${nama}#${i + 1}: suara berakhir tanda baca`);
      cek(kt.aksi.length >= 1, `${nama}#${i + 1}: ada aksi gambar`);
      for (const ak of kt.aksi) {
        const p = L.posisiKata(kt.suara, ak.at);
        cek(p >= 0, `${nama}#${i + 1}: pemicu "${ak.at}" ditemukan dalam kalimat`);
        if (typeof ak.at === "number") cek(ak.at >= 0 && ak.at < kata.length, `${nama}#${i + 1}: pemicu angka ${ak.at} dalam batas`);
      }
      // ubah dan hapus harus menyasar benda yang ada saat itu
      {
        const peta = new Set(L.keadaanStory(a, i - 1, 9999).map((o) => o.id));
        if (i === 0) peta.clear();
        const urut = [...kt.aksi].map((ak) => ({ ak, p: L.posisiKata(kt.suara, ak.at) })).sort((m, n) => m.p - n.p);
        for (const { ak } of urut) {
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
      for (const o of akhir) if (o.t === "teks" && (o.op ?? 1) > 0 && o.isi) diperiksa += periksaTeks(o.isi, `${nama}#${i + 1}`);
      const titik = [...new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at)))].sort((m, n) => m - n);
      if (titik.length >= 2) {
        const sid = titik.map((p) => L.sidikKeadaan(L.keadaanStory(a, i, p)));
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
        else if (o.t === "bulat") cek(x - (o.r ?? 0) > -2 && x + (o.r ?? 0) < 302 && y - (o.r ?? 0) > -2 && y + (o.r ?? 0) < 202, `${nama}#${i + 1}: bulat ${o.id} masuk kanvas`);
        else if (o.t === "jalur") cek(x > -2 && x < 302 && y > -2 && y < 210, `${nama}#${i + 1}: jalur ${o.id} berpusat di kanvas`);
        else if (o.t === "garis" || o.t === "panah") cek(x + (o.x2 ?? 0) > -2 && x + (o.x2 ?? 0) < 302 && y + (o.y2 ?? 0) > -2 && y + (o.y2 ?? 0) < 205 && x > -2 && x < 302 && y > -2 && y < 205, `${nama}#${i + 1}: ${o.t} ${o.id} masuk kanvas`);
      }
    });
  }
}


/* ------------------------------ Pemisahan materi dan metode luar ------------------------------ */
const teksVideo = (v) => JSON.stringify(v.adegan.map((a) => [a.judul, a.sumber, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]));
const M = V.VIDEO_MATERI_K5B5B;
const U = V.VIDEO_LUAR_K5B5B;
const adegan = (v, id) => v.adegan.find((x) => x.id === id);
const akhir = (a, i = a.ketukan.length - 1) => L.keadaanStory(a, i, 9999);
const oleh = (objs, id) => objs.find((o) => o.id === id);
const isi = (objs, id) => oleh(objs, id)?.isi;
{
  const NAMA_METODE = /Dissection|Shear|Unification|Enclosure|Halving|metode luar|metode dari luar/i;
  const BOCOR_SUBBAB_LAIN = /gabungan|keliling|dekomposisi|Uji Kompetensi|pengayaan|isoperimetri/i;
  const materi = teksVideo(M);
  const luar = teksVideo(U);
  cek(!NAMA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of ["Dissection Method", "Shear Principle", "Base×Height Unification", "Rectangle Enclosure Halving"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(!BOCOR_SUBBAB_LAIN.test(materi), "video materi tidak membocorkan Sub-Bab A, C, dan D (bangun gabungan, keliling, Uji Kompetensi, pengayaan)");
  cek(!BOCOR_SUBBAB_LAIN.test(luar), "video metode luar tidak membocorkan sub-bab lain");
  cek(M.adegan.every((a) => /Buku (Siswa|Panduan Guru)/.test(a.sumber) && /hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(U.adegan.every((a) => /metode (dari )?luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  for (const kata of ["Sub-Bab B", "Eksplorasi 5\\.2A", "Eksplorasi 5\\.2B", "Eksplorasi 5\\.2C", "Eksplorasi 5\\.2D", "Eksplorasi 5\\.2E", "Eksplorasi 5\\.2F", "Eksplorasi 5\\.2G", "Panduan Guru", "miskonsepsi", "diferensiasi", "Refleksi", "tangram", "kertas lipat", "kertas berpetak", "persegi panjang", "persegi", "segitiga", "jajargenjang", "trapesium", "belah ketupat", "layang-layang", "diagonal", "separuh", "setengah", "satuan luas", "membilang", "tebak-tebakan", "alat tulis", "pemanasan"]) cek(new RegExp(kata, "i").test(materi), `video materi memuat ${kata}`);
  const ids = U.adegan.map((a) => a.id);
  cek(["luarb-dis", "luarb-dis-terapan", "luarb-shr", "luarb-shr-terapan", "luarb-bxh", "luarb-bxh-terapan", "luarb-reh", "luarb-reh-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(M.adegan.length === 11 && U.adegan.length === 10, "11 adegan materi dan 10 adegan metode luar");
  cek(totalKetukan >= 80, `total ketukan cukup dalam (${totalKetukan})`);
  cek(diperiksa >= 40, `hubungan bilangan di gambar yang diperiksa mandiri (${diperiksa})`);
}

/* ------------------------------ Geometri gambar: luas dihitung mandiri dari titik poligon ------------------------------ */
const SK = G.S;
cek(SK === 20, "satu satuan petak = 20 piksel");
const tali = (pts) => {
  let s = 0;
  pts.forEach((a, i) => {
    const b = pts[(i + 1) % pts.length];
    s += a[0] * b[1] - b[0] * a[1];
  });
  return Math.abs(s) / 2;
};
const titikDari = (o) => {
  const d = o.d ?? "";
  cek(/^[ML\d.\s-]+Z$/.test(d.trim()), `jalur ${o.id}: hanya garis lurus (M, L, Z)`);
  const n = (d.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);
  const p = [];
  for (let i = 0; i + 1 < n.length; i += 2) p.push([n[i] / SK, n[i + 1] / SK]);
  return p;
};
const luasJalur = (o) => tali(titikDari(o));
const kotakBatas = (pts) => ({ x0: Math.min(...pts.map((p) => p[0])), x1: Math.max(...pts.map((p) => p[0])), y0: Math.min(...pts.map((p) => p[1])), y1: Math.max(...pts.map((p) => p[1])) });
const dalam = (t, pts) => {
  let ya = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i, i += 1) {
    if (pts[i][1] > t[1] !== pts[j][1] > t[1] && t[0] < ((pts[j][0] - pts[i][0]) * (t[1] - pts[i][1])) / (pts[j][1] - pts[i][1]) + pts[i][0]) ya = !ya;
  }
  return ya;
};
/** Potongan menutupi wilayah persis satu kali: tiap titik uji tertutup 1 kali di dalam wilayah dan 0 kali di luar. */
const jubin = (potongan, wilayah) => {
  const semua = [...potongan.flat(), ...wilayah];
  const b = kotakBatas(semua);
  let salah = 0;
  let uji = 0;
  for (let x = b.x0 + 0.0371; x < b.x1; x += 0.1) for (let y = b.y0 + 0.0293; y < b.y1; y += 0.1) {
    uji += 1;
    const tutup = potongan.filter((p) => dalam([x, y], p)).length;
    if (tutup !== (dalam([x, y], wilayah) ? 1 : 0)) salah += 1;
  }
  return { salah, uji };
};
const dekatU = (a, b, e = 1e-9) => Math.abs(a - b) <= e;

// Kunci buku (Buku Panduan Guru hlm. 203-226), ditulis ulang di sini sebagai pembanding mandiri.
const BUKU = {
  pp: [[2, 1, 2], [5, 2, 10], [4, 3, 12], [2, 3, 6]],
  persegi: [[1, 1], [2, 4], [3, 9], [4, 16]],
  seg1: { alas: 4, tinggi: 4, lebar: 2, luas: 8 },
  seg2: { alas: 5, tinggi: 4, lebar: 2, luas: 10 },
  jjg: { alas: 4, tinggi: 2, luas: 8 },
  trap: { alas: 5, atas: 2, tinggi: 2, alasBaru: 7, tinggiBaru: 1, luas: 7 },
  bk: { d1: 2, d2: 4, sisi1: 2, sisi2: 2, luas: 4 },
  kite: { d1: 5, d2: 4, panjang: 5, lebar: 2, luas: 10 },
};
{
  // data gambar sama dengan kunci buku
  sama(G.PERSEGI_PANJANG_ABCD, BUKU.pp.map((r) => [r[0], r[1]]), "ukuran persegi panjang A-D sama dengan kunci hlm. 203");
  sama(BUKU.pp.map((r) => r[0] * r[1]), BUKU.pp.map((r) => r[2]), "hitungan kunci persegi panjang: 2, 10, 12, 6");
  sama(G.PERSEGI_ABCD, BUKU.persegi.map((r) => r[0]), "sisi persegi A-D sama dengan kunci hlm. 206");
  sama(BUKU.persegi.map((r) => r[0] * r[0]), BUKU.persegi.map((r) => r[1]), "hitungan kunci persegi: 1, 4, 9, 16");
  for (const [n, f] of [["seg1", G.SEG1], ["seg2", G.SEG2], ["jjg", G.JJG], ["trap", G.TRAP], ["bk", G.BK], ["kite", G.KITE]]) {
    const luas = BUKU[n].luas;
    cek(dekatU(tali(f.asal), luas) && dekatU(tali(f.hasil), luas) && f.luas === luas, `${n}: luas bangun mula-mula dan hasil sama dengan kunci ${luas}`);
  }
  // segitiga model 1 dan 2
  {
    const t1 = G.SEG1;
    const b = kotakBatas(t1.asal);
    cek(b.x1 - b.x0 === BUKU.seg1.alas && b.y1 - b.y0 === BUKU.seg1.tinggi, "segitiga 1: alas 4 dan tinggi 4 dari titik gambar");
    const h = kotakBatas(t1.hasil);
    cek(h.x1 - h.x0 === BUKU.seg1.alas && h.y1 - h.y0 === BUKU.seg1.lebar && BUKU.seg1.alas * BUKU.seg1.lebar === BUKU.seg1.luas && BUKU.seg1.lebar * 2 === BUKU.seg1.tinggi, "segitiga 1: persegi panjang 4 x 2, lebar setengah tinggi");
    cek(dekatU(tali(t1.atas) + tali(t1.bawah), tali(t1.asal)) && dekatU(tali(t1.baru), tali(t1.atas)), "segitiga 1: potongan atas dan bawah berjumlah luas segitiga, potongan pindah sama luas");
    const t2 = G.SEG2;
    const b2 = kotakBatas(t2.asal);
    cek(b2.x1 - b2.x0 === BUKU.seg2.alas && b2.y1 - b2.y0 === BUKU.seg2.tinggi && 0.5 * BUKU.seg2.alas * BUKU.seg2.tinggi === BUKU.seg2.luas, "segitiga 2: alas 5, tinggi 4, setengah kali alas kali tinggi sama dengan 10");
    const h2 = kotakBatas(t2.hasil);
    cek(h2.x1 - h2.x0 === 5 && h2.y1 - h2.y0 === 2, "segitiga 2: persegi panjang 5 x 2");
  }
  // jajargenjang, trapesium, belah ketupat, layang-layang
  {
    const j = G.JJG;
    cek(dekatU(tali(j.potong), 1) && dekatU(tali(j.sisa), 7) && dekatU(tali(j.baru), 1), "jajargenjang: segitiga AOD luas 1, sisa 7, pindahan 1");
    const hj = kotakBatas(j.hasil);
    cek(hj.x1 - hj.x0 === BUKU.jjg.alas && hj.y1 - hj.y0 === BUKU.jjg.tinggi, "jajargenjang: persegi panjang 4 x 2 (panjang alas, lebar tinggi)");
    const t = G.TRAP;
    const tb = kotakBatas(t.asal);
    cek(tb.x1 - tb.x0 === BUKU.trap.alas && tb.y1 - tb.y0 === BUKU.trap.tinggi, "trapesium: alas 5 dan tinggi 2");
    const atas = t.asal.filter((p) => p[1] === 0);
    cek(atas.length === 2 && Math.abs(atas[0][0] - atas[1][0]) === BUKU.trap.atas, "trapesium: sisi atas 2");
    const bawahBaru = t.hasil.filter((p) => p[1] === 2);
    cek(Math.abs(bawahBaru[0][0] - bawahBaru[1][0]) === BUKU.trap.alasBaru && BUKU.trap.alas + BUKU.trap.atas === BUKU.trap.alasBaru, "trapesium: alas jajargenjang 7 = 5 + 2");
    const hb = kotakBatas(t.hasil);
    cek(hb.y1 - hb.y0 === BUKU.trap.tinggiBaru && BUKU.trap.tinggi / 2 === BUKU.trap.tinggiBaru, "trapesium: tinggi jajargenjang 1 = setengah tinggi");
    cek(BUKU.trap.alasBaru * BUKU.trap.tinggiBaru === BUKU.trap.luas && 0.5 * (BUKU.trap.alas + BUKU.trap.atas) * BUKU.trap.tinggi === BUKU.trap.luas, "trapesium: 7 x 1 = 7 dan setengah kali jumlah sisi kali tinggi = 7");
    const e = G.BK;
    const be = kotakBatas(e.asal);
    cek(be.x1 - be.x0 === BUKU.bk.d1 && be.y1 - be.y0 === BUKU.bk.d2, "belah ketupat: diagonal 1 = 2 dan diagonal 2 = 4");
    const he = kotakBatas(e.hasil);
    cek(he.x1 - he.x0 === BUKU.bk.sisi1 && he.y1 - he.y0 === BUKU.bk.sisi2 && BUKU.bk.sisi1 === BUKU.bk.d1 && BUKU.bk.sisi2 === BUKU.bk.d2 / 2, "belah ketupat: persegi sisi 2 = diagonal 1 dan setengah diagonal 2");
    const ky = G.KITE;
    const bk = kotakBatas(ky.asal);
    cek(bk.x1 - bk.x0 === BUKU.kite.d1 && bk.y1 - bk.y0 === BUKU.kite.d2, "layang-layang: diagonal 1 = 5 dan diagonal 2 = 4");
    const hk = kotakBatas(ky.hasil);
    cek(hk.x1 - hk.x0 === BUKU.kite.panjang && hk.y1 - hk.y0 === BUKU.kite.lebar && BUKU.kite.lebar === BUKU.kite.d2 / 2, "layang-layang: persegi panjang 5 x 2, lebar setengah diagonal 2");
  }
  // potongan menjubin bangun mula-mula dan bangun hasil persis satu kali
  {
    const susun = [
      ["segitiga 1", [G.SEG1.bawah, G.SEG1.atas], G.SEG1.asal, [G.SEG1.bawah, G.SEG1.baru], G.SEG1.hasil],
      ["segitiga 2", [G.SEG2.bawah, G.SEG2.kiri, G.SEG2.kanan], G.SEG2.asal, [G.SEG2.bawah, G.SEG2.kiriBaru, G.SEG2.kananBaru], G.SEG2.hasil],
      ["jajargenjang", [G.JJG.sisa, G.JJG.potong], G.JJG.asal, [G.JJG.sisa, G.JJG.baru], G.JJG.hasil],
      ["trapesium", [G.TRAP.bawah, G.TRAP.atas], G.TRAP.asal, [G.TRAP.bawah, G.TRAP.baru], G.TRAP.hasil],
      ["belah ketupat", [G.BK.bawah, G.BK.kiriAtas, G.BK.kananAtas], G.BK.asal, [G.BK.bawah, G.BK.kiriBaru, G.BK.kananBaru], G.BK.hasil],
      ["layang-layang", [G.KITE.bawah, G.KITE.kiriAtas, G.KITE.kananAtas], G.KITE.asal, [G.KITE.bawah, G.KITE.kiriBaru, G.KITE.kananBaru], G.KITE.hasil],
    ];
    for (const [nama, sebelum, asal, sesudah, hasil] of susun) {
      const a = jubin(sebelum, asal);
      const h = jubin(sesudah, hasil);
      cek(a.salah === 0 && a.uji > 100, `${nama}: potongan menjubin bangun mula-mula persis satu kali (${a.salah} salah dari ${a.uji})`);
      cek(h.salah === 0 && h.uji > 100, `${nama}: potongan setelah dipindahkan menjubin bangun hasil persis satu kali (${h.salah} salah dari ${h.uji})`);
      cek(dekatU(sebelum.reduce((t, p) => t + tali(p), 0), tali(asal)) && dekatU(sesudah.reduce((t, p) => t + tali(p), 0), tali(hasil)), `${nama}: jumlah luas potongan sama dengan luas bangun`);
    }
    cek(dekatU(tali([[0, 0], [4, 0], [4, 2], [0, 2]]), 8) && dekatU(tali([[1, 0], [5, 0], [4, 2], [0, 2]]), 8), "geser: persegi panjang dan jajargenjang beralas 4 bertinggi 2 sama-sama 8");
    cek(dekatU(tali([[0, 3], [4, 3], [1, 0]]), tali([[0, 3], [4, 3], [3, 0]])) && dekatU(tali([[0, 3], [4, 3], [3, 0]]), tali([[0, 3], [4, 3], [0, 0]])), "geser puncak: tiga segitiga beralas 4 bertinggi 3 sama luas");
  }
}

/* ------------------------------ Luas bangun di dalam gambar, di semua keadaan ------------------------------ */
{
  const PIECES = {
    sg: [["sg-bw", "sg-ps"], 8],
    sh: [["sh-bw", "sh-p1", "sh-p2"], 10],
    jj: [["jj-bw", "jj-ps"], 8],
    tp: [["tp-bw", "tp-ps"], 7],
    bk: [["bk-bw", "bk-p1", "bk-p2"], 4],
    ky: [["ky-bw", "ky-p1", "ky-p2"], 10],
    dj: [["dj-bw", "dj-ps"], 8],
    db: [["db-a", "db-b", "db-c", "db-d"], 4],
    d2: [["d2a", "d2b"], 8],
  };
  const UTUH = { sg: 8, sh: 10, jj: 8, tp: 7, bk: 4, ky: 10 };
  let nPoli = 0;
  let nJubin = 0;
  const periksa = (objs, nama) => {
    const poliOf = (id) => oleh(objs, id);
    for (const [p, luas] of Object.entries(UTUH)) for (const sfx of ["-bg", "-hs"]) {
      const o = poliOf(`${p}${sfx}`);
      if (!o) continue;
      nPoli += 1;
      cek(dekatU(luasJalur(o), luas, 1e-6), `${nama}: ${o.id} berluas ${luas} (hitungan ${luasJalur(o)})`);
    }
    for (const [p, [ids, luas]] of Object.entries(PIECES)) {
      const ada = ids.map(poliOf);
      if (ada.some((o) => !o)) continue;
      nPoli += 1;
      cek(dekatU(ada.reduce((t, o) => t + luasJalur(o), 0), luas, 1e-6), `${nama}: potongan ${p} berjumlah luas ${luas}`);
      const pts = ada.map(titikDari);
      const hs = poliOf(`${p}-hs`);
      if (hs) {
        const r = jubin(pts, titikDari(hs));
        nJubin += 1;
        cek(r.salah === 0, `${nama}: potongan ${p} menjubin bangun hasil persis satu kali (${r.salah} titik salah)`);
      } else {
        // tanpa garis tepi hasil: potongan tidak boleh saling menimpa
        const b = kotakBatas(pts.flat());
        let tindih = 0;
        for (let x = b.x0 + 0.0371; x < b.x1; x += 0.1) for (let y = b.y0 + 0.0293; y < b.y1; y += 0.1) if (pts.filter((q) => dalam([x, y], q)).length > 1) tindih += 1;
        nJubin += 1;
        cek(tindih === 0, `${nama}: potongan ${p} tidak saling menimpa (${tindih} titik)`);
      }
    }
    // kisi (kertas berpetak) memuat bangunnya
    for (const g of objs.filter((o) => /-g2?$/.test(o.id) && o.t === "jalur" && o.warna === "none")) {
      const p = g.id.replace(/-g2?$/, "");
      const n = (g.d.match(/-?\d+(?:\.\d+)?/g) ?? ["0"]).map(Number);
      const lebar = Math.max(...n.filter((_, i) => i % 2 === 0)) / SK;
      const tinggi = Math.max(...n.filter((_, i) => i % 2 === 1)) / SK;
      for (const sfx of ["-bg", "-hs", "-bw", "-ps", "-p1", "-p2", "-a", "-b", "-c", "-d"]) {
        const o = poliOf(`${p}${sfx}`);
        if (!o || o.t !== "jalur" || !/^M/.test(o.d ?? "") || /A\d/.test(o.d)) continue;
        const b = kotakBatas(titikDari(o));
        cek(b.x0 >= -1e-9 && b.y0 >= -1e-9 && b.x1 <= lebar + 1e-9 && b.y1 <= tinggi + 1e-9, `${nama}: ${o.id} di dalam kertas berpetak ${lebar} x ${tinggi}`);
      }
    }
  };
  for (const v of [M, U]) for (const a of v.adegan) a.ketukan.forEach((kt, i) => {
    periksa(akhir(a, i), `${v.id}/${a.id}#${i + 1}`);
    for (const t of [...new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at)))]) periksa(L.keadaanStory(a, i, t), `${v.id}/${a.id}#${i + 1}@${t}`);
  });
  cek(nPoli >= 150, `bangun dan potongan di gambar yang diperiksa luasnya (${nPoli})`);
  cek(nJubin >= 40, `kelompok potongan yang diperiksa jubinannya (${nJubin})`);
}

/* ------------------------------ Materi: tabel persegi panjang, persegi ------------------------------ */
{
  // Eksplorasi 5.2A
  {
    const a = adegan(M, "persegi-panjang");
    const o0 = akhir(a, 0);
    BUKU.pp.forEach(([p, l], i) => cek(dekatU(luasJalur(oleh(o0, `r${i}-bg`)), p * l), `5.2A: persegi panjang ${"ABCD"[i]} berluas ${p} x ${l}`));
    const o5 = akhir(a, 5);
    sama(["tA", "tB", "tC", "tD"].map((id) => isi(o5, id)), ["A: 2 x 1 = 2", "B: 5 x 2 = 10", "C: 4 x 3 = 12", "D: 2 x 3 = 6"], "5.2A: tabel hitungan sama dengan kunci hlm. 203");
    [["a", 1, 0], ["b", 2, 1], ["c", 3, 2], ["d", 4, 3]].forEach(([id, ket, i]) => {
      const o = akhir(a, ket);
      cek(dekatU(luasJalur(oleh(o, `${id}-bg`)), BUKU.pp[i][2]), `5.2A: bangun ${id} berluas ${BUKU.pp[i][2]}`);
      cek(isi(o, `${id}lu`)?.includes(String(BUKU.pp[i][2])), `5.2A: tulisan luas bangun ${"ABCD"[i]} memuat ${BUKU.pp[i][2]}`);
    });
  }
  // Eksplorasi 5.2B
  {
    const a = adegan(M, "persegi");
    const o0 = akhir(a, 0);
    BUKU.persegi.forEach(([s, l], i) => cek(dekatU(luasJalur(oleh(o0, `q${i}-bg`)), l) && dekatU(luasJalur(oleh(o0, `q${i}-bg`)), s * s), `5.2B: persegi ${"ABCD"[i]} sisi ${s} berluas ${l}`));
    const o2 = akhir(a, 2);
    sama([isi(o2, "tc"), isi(o2, "td")], ["C: 3 x 3 = 9", "D: 4 x 4 = 16"], "5.2B: hitungan C dan D");
    sama([isi(akhir(a, 1), "ta"), isi(akhir(a, 1), "tb")], ["A: 1 x 1 = 1", "B: 2 x 2 = 4"], "5.2B: hitungan A dan B");
    cek(dekatU(luasJalur(oleh(akhir(a, 3), "e-bg")), 16), "5.2B: persegi bersisi 4 berluas 16");
  }
}

/* ------------------------------ Metode luar: hitungan dari angka buku ------------------------------ */
{
  // Base x Height Unification: tiap baris alas efektif x tinggi efektif sama dengan luas bangun hasil hitungan mandiri
  {
    const a = adegan(U, "luarb-bxh-terapan");
    const o = akhir(a, 3);
    const rumus = (i) => /^(\d+) x (\d+) = (\d+)$/.exec(isi(o, `bt${i}f`) ?? "");
    const harap = [
      { alas: BUKU.pp[1][0], tinggi: BUKU.pp[1][1], luas: tali([[0, 0], [5, 0], [5, 2], [0, 2]]) },
      { alas: BUKU.jjg.alas, tinggi: BUKU.jjg.tinggi, luas: tali(G.JJG.asal) },
      { alas: BUKU.seg2.alas, tinggi: BUKU.seg2.tinggi / 2, luas: tali(G.SEG2.asal) },
      { alas: BUKU.trap.alas + BUKU.trap.atas, tinggi: BUKU.trap.tinggi / 2, luas: tali(G.TRAP.asal) },
      { alas: BUKU.bk.d1, tinggi: BUKU.bk.d2 / 2, luas: tali(G.BK.asal) },
      { alas: BUKU.kite.d1, tinggi: BUKU.kite.d2 / 2, luas: tali(G.KITE.asal) },
    ];
    harap.forEach((h, i) => {
      const m = rumus(i);
      cek(m !== null && Number(m[1]) === h.alas && Number(m[2]) === h.tinggi && Number(m[3]) === h.luas && h.alas * h.tinggi === h.luas, `alas efektif x tinggi efektif baris ${i + 1}: ${m?.[0]} cocok dengan luas poligon ${h.luas}`);
    });
    cek(["bt0f", "bt2f", "bt5f"].every((id) => oleh(o, id).sorot === true) && oleh(o, "bt4f").sorot === true && !oleh(o, "bt1f").sorot, "luas terbesar 10 pada tiga baris, terkecil 4 pada belah ketupat");
    cek(harap.filter((h) => h.luas === 10).length === 3 && Math.min(...harap.map((h) => h.luas)) === 4, "tiga bangun berluas 10 dan paling kecil 4");
  }
  // Rectangle Enclosure Halving: pembungkus tepat dua kali luas bangun
  {
    const a = adegan(U, "luarb-reh-terapan");
    [[0, "re1", 20, 10], [1, "re2", 8, 4], [2, "re3", 20, 10]].forEach(([ket, p, pembungkus, separuh]) => {
      const o = akhir(a, ket);
      const box = titikDari(oleh(o, `${p}-box`));
      const bg = titikDari(oleh(o, `${p}-bg`));
      cek(dekatU(tali(box), pembungkus) && dekatU(tali(bg), separuh) && dekatU(tali(box), 2 * tali(bg)), `pembungkus ${p}: luas ${pembungkus} tepat dua kali luas bangun ${separuh}`);
      const bb = kotakBatas(box);
      const bs = kotakBatas(bg);
      cek(bb.x0 === bs.x0 && bb.x1 === bs.x1 && bb.y0 === bs.y0 && bb.y1 === bs.y1, `pembungkus ${p}: persegi panjang pas menyentuh titik terluar bangun`);
    });
    const o = akhir(a, 3);
    const sudut = [1, 2, 3, 4].map((i) => luasJalur(oleh(o, `re3-c${i}`)));
    sama(sudut, [2, 3, 2, 3], "layang-layang: empat pojok luar berluas 2, 3, 2, 3");
    cek(dekatU(sudut.reduce((t, x) => t + x, 0), tali(titikDari(oleh(o, "re3-box"))) - tali(titikDari(oleh(o, "re3-bg")))), "layang-layang: jumlah pojok luar sama dengan luas pembungkus dikurangi luas bangun");
    cek(dekatU(sudut[0] + sudut[1], 5) && dekatU(sudut[2] + sudut[3], 5) && dekatU(tali(titikDari(oleh(o, "re3-bg"))), 10), "layang-layang: dua pasang pojok 5 + 5 = 10 sama dengan luas layang-layang");
    const c = adegan(U, "luarb-reh");
    const oc = akhir(c, 1);
    const luar = [1, 2, 3, 4].map((i) => luasJalur(oleh(oc, `ec-c${i}`)));
    cek(dekatU(luar.reduce((t, x) => t + x, 0), 10) && dekatU(tali(titikDari(oleh(oc, "ec-box"))), 20), "konsep: bagian luar berjumlah 10, sama dengan bagian dalam dari pembungkus 20");
  }
  // Shear Principle: puncak digeser sejajar alas, luas tetap
  {
    const a = adegan(U, "luarb-shr-terapan");
    const o = akhir(a, 0);
    const t = ["sx-a", "sx-b", "sx-c"].map((id) => titikDari(oleh(o, id)));
    cek(t.every((p) => dekatU(tali(p), 10)), "Shear: tiga segitiga PQR sama-sama 10");
    cek(t.every((p) => p.filter((q) => q[1] === 4).length === 2 && p.filter((q) => q[1] === 0).length === 1), "Shear: alas tetap, puncak selalu pada garis sejajar alas setinggi 4");
    sama(t.map((p) => p.find((q) => q[1] === 0)[0]), [2, 0, 5], "Shear: puncak R di atas O, di kiri, di kanan");
    const g = akhir(a, 2);
    cek(dekatU(luasJalur(oleh(g, "sy-bg")), 8) && dekatU(luasJalur(oleh(g, "sy-bg")), BUKU.jjg.alas * BUKU.jjg.tinggi), "Shear: jajargenjang digeser menjadi persegi panjang 4 x 2 = 8");
    const sebelum = L.keadaanStory(a, 2, 0);
    cek(dekatU(luasJalur(oleh(sebelum, "sy-bg")), 8) && titikDari(oleh(sebelum, "sy-bg")).some((p) => p[0] === 5), "Shear: sebelum digeser bangunnya jajargenjang (titik 5 di ujung atas)");
    const c = adegan(U, "luarb-shr");
    const o1 = akhir(c, 0);
    cek(dekatU(luasJalur(oleh(o1, "sr-bg")), 8), "Shear: bangun yang digeser tetap 8");
    const o3 = akhir(c, 2);
    cek(dekatU(luasJalur(oleh(o3, "sr3a")), 6) && dekatU(luasJalur(oleh(o3, "sr3b")), 6) && dekatU(luasJalur(oleh(o3, "sr3c")), 6), "Shear: tiga segitiga beralas 4 bertinggi 3 sama-sama 6");
  }
  // Dissection Method: jajargenjang dan belah ketupat
  {
    const a = adegan(U, "luarb-dis-terapan");
    const o0 = akhir(a, 0);
    cek(dekatU(luasJalur(oleh(o0, "dj-bw")) + luasJalur(oleh(o0, "dj-ps")), 8) && isi(o0, "djk2") === "4 x 2 = 8", "Dissection: jajargenjang 4 x 2 = 8 dari dua potongan");
    const o1 = akhir(a, 1);
    sama(["db-a", "db-b", "db-c", "db-d"].map((id) => luasJalur(oleh(o1, id))), [1, 1, 1, 1], "Dissection: empat potongan belah ketupat masing-masing 1");
    const o2 = akhir(a, 2);
    const r = jubin(["db-a", "db-b", "db-c", "db-d"].map((id) => titikDari(oleh(o2, id))), G.BK.hasil);
    cek(r.salah === 0 && isi(o2, "dbj") === "4 x 1 = 4" && isi(o2, "dbk") === "2 x 2 = 4", "Dissection: empat potongan menjubin persegi 2 x 2, jumlah 4 x 1 = 4");
    const k2 = akhir(adegan(U, "luarb-dis"), 1);
    cek(dekatU(luasJalur(oleh(k2, "d2a")) + luasJalur(oleh(k2, "d2b")), 8) && isi(k2, "d2t") === "1 + 7 = 8" && dekatU(luasJalur(oleh(k2, "d2b")), 1) && dekatU(luasJalur(oleh(k2, "d2a")), 7), "Dissection: 1 + 7 = 8 sama dengan luas potongan");
    const k1 = akhir(adegan(U, "luarb-dis"), 0);
    cek(dekatU(luasJalur(oleh(k1, "d1a")), luasJalur(oleh(k1, "d1b"))), "Dissection: bangun awal dan bangun susunan ulang sama luas");
  }
  // miskonsepsi: sebelum dan sesudah sama luas
  {
    const a = adegan(M, "miskonsepsi");
    const o = akhir(a, 0);
    cek(dekatU(luasJalur(oleh(o, "m1a")), luasJalur(oleh(o, "m1b"))), "miskonsepsi 1: bentuk lama dan baru sama luas");
    const o3 = akhir(a, 2);
    cek(dekatU(luasJalur(oleh(o3, "m3a")), luasJalur(oleh(o3, "m3b"))) && dekatU(titikDari(oleh(o3, "m3a")).reduce((m, p) => Math.max(m, p[1]), 0) / 2, kotakBatas(titikDari(oleh(o3, "m3b"))).y1), "miskonsepsi 2: lebar bentuk baru setengah tinggi bentuk lama, luas sama");
  }
}

/* ------------------------------ Kutipan buku dan Buku Panduan Guru (bila PDF tersedia) ------------------------------ */
{
  const pdfBS = new URL("../bahan-sd/Matematika-BS-KLS-V.pdf", import.meta.url);
  const pdfBG = new URL("../bahan-sd/Matematika-BG-KLS-V.pdf", import.meta.url);
  const path = (u) => u.pathname.replace(/^\/([A-Za-z]:)/, "$1");
  const ada = existsSync(pdfBS) && existsSync(pdfBG);
  const ambil = (pdf, dari, sampai) => (ada ? spawnSync("pdftotext", ["-f", String(dari), "-l", String(sampai), "-raw", path(pdf), "-"], { encoding: "utf8", maxBuffer: 1 << 26 }) : null);
  // Buku Siswa hlm. 144-157 = PDF 160-173 dan Refleksi hlm. 161 = PDF 177; Panduan Guru hlm. 200-227 = PDF 212-239
  const bagian = [ambil(pdfBS, 160, 173), ambil(pdfBS, 177, 177), ambil(pdfBG, 212, 239)];
  if (!ada || bagian.some((b) => !b || b.status !== 0)) console.log("PDF atau pdftotext tidak tersedia: pemeriksaan kutipan buku dilewati");
  else {
    const bersihTeks = (t) => t.toLowerCase().replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim();
    const buku = bagian.map((b) => bersihTeks(b.stdout)).join(" ");
    let n = 0;
    for (const a of M.adegan) for (const kt of a.kutipan ?? []) {
      n += 1;
      cek(buku.includes(bersihTeks(kt)), `kutipan buku ${a.id}: "${kt}" ada di teks PDF`);
    }
    cek(n >= 50, `jumlah kutipan buku yang diperiksa (${n})`);
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k5b5b-.*)\.(ts|tsx)$/.test(f));
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
    cek(!/Math\.random/.test(s), `${f}: tanpa Math.random`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|k5b5b-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k5b5b sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../video-k5b5b.tsx", folder), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_B55|naskah-k5b5/.test(pembungkus) && /VIDEO_MATERI_K5B5B/.test(pembungkus) && /VIDEO_LUAR_K5B5B/.test(pembungkus) && /export function VideoK5B5B/.test(pembungkus) && /DaftarVideoCerita/.test(pembungkus), "video-k5b5b: memakai dua video baru, bukan naskah dan visual lama");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
if (process.env.RINCI) for (const v of VIDEO) for (const a of v.adegan) console.log(`  ${v.id}/${a.id}: ${a.ketukan.length} ketukan, kata per ketukan ${a.ketukan.map((kt) => L.kataDari(kt.suara).length).join(",")}, jumlah ${a.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)}`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
