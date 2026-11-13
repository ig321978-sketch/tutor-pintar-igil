// Uji Story Kelas 5 Bab 7 Sub-Bab B (membandingkan ciri-ciri segi empat): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// pemisahan materi dan metode luar, kutipan buku dan Buku Panduan Guru (bila PDF ada), geometri gambar dihitung mandiri
// (sisi sejajar, sudut, diagonal, sumbu simetri, golongan bangun, kunci Uji Kompetensi), emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k5b7b.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k5b7b-video.ts");
const G = await import("../src/components/modul/story/k5b7b-gambar.ts");

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
const VIDEO = [V.VIDEO_MATERI_K5B7B, V.VIDEO_LUAR_K5B7B];
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
const M = V.VIDEO_MATERI_K5B7B;
const U = V.VIDEO_LUAR_K5B7B;
const adegan = (v, id) => v.adegan.find((x) => x.id === id);
const akhirKe = (a) => a.ketukan.length - 1;
{
  const NAMA_METODE = /Inclusive|Trapezoid Definition|Quadrilateral|Hierarchy|Van Hiele|Property Comparison|Comparison Matrix|Diagonal Property|Property Test|metode luar|metode dari luar|inklusif|eksklusif/i;
  const SUB_A = /sama sisi pasti|candi|ketaksamaan|Sub-Bab A/i;
  const materi = teksVideo(M);
  const luar = teksVideo(U);
  cek(!NAMA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of ["Inclusive Trapezoid Definition", "Inclusive Quadrilateral Hierarchy", "Van Hiele", "Property Comparison Matrix", "Diagonal Property Test"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(!/segitiga|Candi/i.test(luar), "video metode luar tidak membahas segitiga (materi Sub-Bab A)");
  cek(!SUB_A.test(materi), "video materi tidak membocorkan isi Sub-Bab A selain butir Uji Kompetensi dan pengayaan");
  cek(M.adegan.every((a) => /Buku Siswa/.test(a.sumber) && /hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(U.adegan.every((a) => /metode (dari )?luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  for (const kata of ["Sub-Bab B", "Eksplorasi 7\\.2A", "Eksplorasi 7\\.2B", "Eksplorasi 7\\.2C", "Eksplorasi 7\\.2D", "Eksplorasi 7\\.2E", "Eksplorasi 7\\.2F", "Eksplorasi 7\\.2G", "Ayo Berpikir Kritis", "Ayo Berlatih", "Refleksi", "Uji Kompetensi", "Pengayaan", "Panduan Guru", "sedotan", "Nisa", "Komang", "Asep", "Yohana", "Lukas", "cekung", "miskonsepsi", "diferensiasi|alat peraga", "trapesium sama kaki", "belah ketupat adalah"]) cek(new RegExp(kata, "i").test(materi), `video materi memuat ${kata}`);
  const ids = U.adegan.map((a) => a.id);
  cek(["luarb-trapesium", "luarb-trapesium-terapan", "luarb-hierarki", "luarb-hierarki-terapan", "luarb-matriks", "luarb-matriks-terapan", "luarb-diagonal", "luarb-diagonal-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(M.adegan.length === 12 && U.adegan.length === 10, "12 adegan materi dan 10 adegan metode luar");
  cek(totalKetukan >= 90, `total ketukan cukup dalam (${totalKetukan})`);
  cek(diperiksa >= 5, `hubungan bilangan di gambar yang diperiksa mandiri (${diperiksa})`);
}

/* ------------------------------ Geometri gambar, dihitung mandiri dari titik sudut ------------------------------ */
const PT = (b) => G.BENTUK[b].pts;
const HU = (b) => G.BENTUK[b].huruf;
const jarak = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
const vek = (a, b) => [b[0] - a[0], b[1] - a[1]];
const silang = (u, v) => u[0] * v[1] - u[1] * v[0];
const titikDalam = (u, v) => u[0] * v[0] + u[1] * v[1];
const hampir = (a, b) => Math.abs(a - b) < 1e-9;
const sisiDari = (pts) => pts.map((p, i) => [p, pts[(i + 1) % pts.length]]);
const sejajarSisi = (s, t) => hampir(silang(vek(...s), vek(...t)), 0);
const pasangSejajar = (pts) => {
  const s = sisiDari(pts);
  let n = 0;
  for (let i = 0; i < s.length; i += 1) for (let j = i + 1; j < s.length; j += 1) if (sejajarSisi(s[i], s[j])) n += 1;
  return n;
};
const sudutDerajat = (pts, i) => {
  const n = pts.length;
  const a = vek(pts[i], pts[(i + n - 1) % n]);
  const c = vek(pts[i], pts[(i + 1) % n]);
  return (Math.acos(titikDalam(a, c) / (Math.hypot(...a) * Math.hypot(...c))) * 180) / Math.PI;
};
const bulatKunci = (x) => (Math.round(x * 1e6) / 1e6 + 0).toFixed(6);
const kunciTitik = (p) => `${bulatKunci(p[0])},${bulatKunci(p[1])}`;
const samaHimpunan = (a, b) => js(a.map(kunciTitik).sort()) === js(b.map(kunciTitik).sort());
const cerminLurus = (pts, p0, p1) => {
  const d = vek(p0, p1);
  const l2 = titikDalam(d, d);
  return pts.map((p) => {
    const t = titikDalam(vek(p0, p), d) / l2;
    const f = [p0[0] + t * d[0], p0[1] + t * d[1]];
    return [2 * f[0] - p[0], 2 * f[1] - p[1]];
  });
};
const banyakSumbu = (pts) => {
  const c = [pts.reduce((t, p) => t + p[0], 0) / pts.length, pts.reduce((t, p) => t + p[1], 0) / pts.length];
  let n = 0;
  for (let deg = 0; deg < 180; deg += 1) {
    const r = (deg * Math.PI) / 180;
    if (samaHimpunan(pts, cerminLurus(pts, c, [c[0] + Math.cos(r), c[1] + Math.sin(r)]))) n += 1;
  }
  return n;
};
const diagonalDari = (pts) => [[pts[0], pts[2]], [pts[1], pts[3]]];
const tengah = (s) => [(s[0][0] + s[1][0]) / 2, (s[0][1] + s[1][1]) / 2];
const sifat = (b) => {
  const pts = PT(b);
  const s = sisiDari(pts);
  const [d1, d2] = diagonalDari(pts);
  const panj = s.map((x) => jarak(...x));
  const sdt = pts.map((_, i) => sudutDerajat(pts, i));
  return {
    pasangSejajar: pasangSejajar(pts),
    duaPasangSejajar: pasangSejajar(pts) === 2,
    sisiBerhadapanSama: hampir(panj[0], panj[2]) && hampir(panj[1], panj[3]),
    empatSisiSama: panj.every((x) => hampir(x, panj[0])),
    duaPasangBerurutan: (hampir(panj[0], panj[1]) && hampir(panj[2], panj[3])) || (hampir(panj[1], panj[2]) && hampir(panj[3], panj[0])),
    sudutBerhadapanSama: hampir(sdt[0], sdt[2]) && hampir(sdt[1], sdt[3]),
    sikuSemua: sdt.every((x) => hampir(x, 90)),
    diagBagiDua: hampir(jarak(tengah(d1), tengah(d2)), 0),
    diagSama: hampir(jarak(...d1), jarak(...d2)),
    diagTegak: hampir(titikDalam(vek(...d1), vek(...d2)), 0),
    sumbu: banyakSumbu(pts),
    sumbuDiagonal: [d1, d2].filter((d) => samaHimpunan(pts, cerminLurus(pts, d[0], d[1]))).length,
    sudut: sdt,
    panjang: panj,
  };
};
const SF = Object.fromEntries(Object.keys(G.BENTUK).map((b) => [b, sifat(b)]));

{
  // ciri yang diklaim dalam video, dibuktikan dari titik sudut gambar
  cek(SF.sembarang.pasangSejajar === 1 && !SF.sembarang.sisiBerhadapanSama && SF.sembarang.sumbu === 0, "trapesium sembarang: satu pasang sejajar, tanpa sisi sama panjang, tanpa sumbu");
  const sk = sifat("siku");
  cek(sk.pasangSejajar === 1 && hampir(sk.sudut[0], 90) && hampir(sk.sudut[3], 90) && sk.sumbu === 0, "trapesium siku-siku: DC sejajar AB, sudut A dan D masing-masing 90, tanpa sumbu");
  const sm = SF.samaKaki;
  cek(sm.pasangSejajar === 1 && hampir(sm.panjang[1], sm.panjang[3]) && hampir(sm.sudut[0], sm.sudut[1]) && hampir(sm.sudut[2], sm.sudut[3]) && sm.sumbu === 1, "trapesium sama kaki: PS sama QR, sudut P sama Q, S sama R, satu sumbu");
  const jj = SF.jajar;
  cek(jj.pasangSejajar === 2 && jj.sisiBerhadapanSama && jj.sudutBerhadapanSama && !hampir(jj.sudut[0], jj.sudut[1]) && !hampir(jj.sudut[0], 90) && jj.sumbu === 0, "jajargenjang: dua pasang sejajar, sisi dan sudut berhadapan sama, A tidak sama B, tanpa sumbu");
  const pp = SF.persegiPanjang;
  cek(pp.duaPasangSejajar && pp.sisiBerhadapanSama && pp.sikuSemua && pp.diagBagiDua && pp.diagSama && !pp.diagTegak && pp.sumbu === 2, "persegi panjang: ciri buku (2 sumbu, diagonal membagi dua sama panjang)");
  const bk = SF.belahKetupat;
  cek(bk.duaPasangSejajar && bk.empatSisiSama && bk.sudutBerhadapanSama && bk.diagBagiDua && bk.diagTegak && !bk.diagSama && bk.sumbu === 2 && bk.sumbuDiagonal === 2, "belah ketupat: ciri buku (diagonal membagi dua dan tegak lurus, 2 sumbu = diagonal)");
  const ps = SF.persegi;
  cek(ps.duaPasangSejajar && ps.empatSisiSama && ps.sikuSemua && ps.diagBagiDua && ps.diagSama && ps.diagTegak && ps.sumbu === 4 && ps.sumbuDiagonal === 2, "persegi: ciri buku (4 sumbu)");
  const ly = SF.layang;
  cek(ly.duaPasangBerurutan && ly.diagTegak && !ly.diagBagiDua && ly.sumbu === 1 && ly.sumbuDiagonal === 1 && ly.pasangSejajar === 0, "layang-layang: dua pasang sisi berurutan sama, diagonal tegak lurus, satu sumbu, tanpa sisi sejajar");
  // sudut sama besar sesuai huruf buku
  const sudutHuruf = (b, h) => SF[b].sudut[HU(b).indexOf(h)];
  cek(hampir(sudutHuruf("jajar", "A"), sudutHuruf("jajar", "C")) && hampir(sudutHuruf("jajar", "B"), sudutHuruf("jajar", "D")), "jajargenjang: sudut A sama C dan B sama D");
  cek(hampir(sudutHuruf("belahKetupat", "A"), sudutHuruf("belahKetupat", "B")) && hampir(sudutHuruf("belahKetupat", "C"), sudutHuruf("belahKetupat", "D")), "belah ketupat: sudut A sama B dan C sama D (huruf Buku Siswa hlm. 222)");
  cek(!hampir(sudutHuruf("belahKetupat", "A"), sudutHuruf("belahKetupat", "C")), "belah ketupat: sudut A tidak sama C (Buku Panduan Guru hlm. 329 menulis A sama C)");
  cek(hampir(sudutHuruf("layang", "A"), sudutHuruf("layang", "C")) && !hampir(sudutHuruf("layang", "D"), sudutHuruf("layang", "B")), "layang-layang: sepasang sudut berhadapan sama (A dan C)");
  // sisi huruf: jajargenjang ABCD, belah ketupat AC sejajar DB dan AD sejajar BC
  const sisiHuruf = (b, h1, h2) => [PT(b)[HU(b).indexOf(h1)], PT(b)[HU(b).indexOf(h2)]];
  cek(sejajarSisi(sisiHuruf("belahKetupat", "A", "C"), sisiHuruf("belahKetupat", "D", "B")) && sejajarSisi(sisiHuruf("belahKetupat", "A", "D"), sisiHuruf("belahKetupat", "C", "B")), "belah ketupat: AC sejajar DB dan AD sejajar BC");
  cek(sejajarSisi(sisiHuruf("jajar", "A", "B"), sisiHuruf("jajar", "D", "C")) && sejajarSisi(sisiHuruf("jajar", "A", "D"), sisiHuruf("jajar", "B", "C")), "jajargenjang: AB sejajar DC dan AD sejajar BC");
  cek(sejajarSisi(sisiHuruf("sembarang", "A", "B"), sisiHuruf("sembarang", "D", "C")) && !sejajarSisi(sisiHuruf("sembarang", "A", "D"), sisiHuruf("sembarang", "B", "C")), "trapesium: DC sejajar AB, kaki tidak sejajar");
  // jarak antara dua sisi sejajar: DE = CF (trapesium) dan DE = FB (jajargenjang), GB = DH
  const kakiJarak = (b, dari, a1, a2) => jarak(PT(b)[HU(b).indexOf(dari)], G.kaki(PT(b)[HU(b).indexOf(dari)], PT(b)[HU(b).indexOf(a1)], PT(b)[HU(b).indexOf(a2)]));
  cek(hampir(kakiJarak("sembarang", "D", "A", "B"), kakiJarak("sembarang", "C", "A", "B")), "trapesium: DE sama CF (jarak antara DC dan AB)");
  cek(hampir(kakiJarak("jajar", "D", "A", "B"), kakiJarak("jajar", "B", "D", "C")), "jajargenjang: DE sama FB");
  cek(hampir(kakiJarak("jajar", "B", "A", "D"), kakiJarak("jajar", "D", "B", "C")), "jajargenjang: GB sama DH");
  // kaki tegak lurus jatuh pada ruas sisinya (titik E, F, G, H ada pada ruas)
  const padaRuas = (p, a, z) => hampir(jarak(a, p) + jarak(p, z), jarak(a, z));
  const ujiKaki = (b, dari, a1, a2) => padaRuas(G.kaki(PT(b)[HU(b).indexOf(dari)], PT(b)[HU(b).indexOf(a1)], PT(b)[HU(b).indexOf(a2)]), PT(b)[HU(b).indexOf(a1)], PT(b)[HU(b).indexOf(a2)]);
  cek(ujiKaki("sembarang", "D", "A", "B") && ujiKaki("sembarang", "C", "A", "B") && ujiKaki("jajar", "D", "A", "B") && ujiKaki("jajar", "B", "D", "C") && ujiKaki("jajar", "B", "A", "D") && ujiKaki("jajar", "D", "B", "C"), "titik kaki E, F, G, H berada pada ruas sisi");

  // golongan bangun (pengertian inklusif): rantai termasuk
  const termasukTrapesium = (b) => SF[b].pasangSejajar >= 1;
  const termasukTrapesiumEksklusif = (b) => SF[b].pasangSejajar === 1;
  const jajargenjang = (b) => SF[b].duaPasangSejajar && SF[b].sisiBerhadapanSama && SF[b].sudutBerhadapanSama;
  const belahKetupat = (b) => jajargenjang(b) && SF[b].empatSisiSama;
  const persegiPanjang = (b) => jajargenjang(b) && SF[b].sikuSemua;
  const persegi = (b) => belahKetupat(b) && SF[b].sikuSemua;
  const layangLayang = (b) => SF[b].duaPasangBerurutan && SF[b].diagTegak && SF[b].sumbuDiagonal >= 1;
  const trapesiumSamaKaki = (b) => termasukTrapesium(b) && SF[b].pasangSejajar === 1 && SF[b].sumbu === 1;
  const hasil = Object.fromEntries(Object.keys(G.BENTUK).map((b) => [b, [termasukTrapesium(b), jajargenjang(b), persegiPanjang(b), belahKetupat(b), persegi(b), layangLayang(b)]]));
  sama(hasil.sembarang, [true, false, false, false, false, false], "trapesium sembarang hanya trapesium");
  sama(hasil.jajar, [true, true, false, false, false, false], "jajargenjang: trapesium dan jajargenjang saja");
  sama(hasil.persegiPanjang, [true, true, true, false, false, false], "persegi panjang: trapesium, jajargenjang, persegi panjang");
  sama(hasil.belahKetupat, [true, true, false, true, false, true], "belah ketupat: trapesium, jajargenjang, belah ketupat, layang-layang");
  sama(hasil.persegi, [true, true, true, true, true, true], "persegi: termasuk semua golongan");
  sama(hasil.layang, [false, false, false, false, false, true], "layang-layang bukan trapesium atau jajargenjang");
  // pengertian eksklusif: hanya tepat satu pasang
  sama(["sembarang", "jajar", "persegiPanjang", "belahKetupat", "persegi", "layang"].map((b) => termasukTrapesiumEksklusif(b)), [true, false, false, false, false, false], "trapesium eksklusif hanya sembarang");
  sama(["sembarang", "jajar", "persegiPanjang", "belahKetupat", "persegi", "layang"].map((b) => termasukTrapesium(b)).filter(Boolean).length, 5, "trapesium inklusif: 5 dari 6 bangun");
  cek(!trapesiumSamaKaki("jajar") && trapesiumSamaKaki("samaKaki") && !trapesiumSamaKaki("siku"), "jajargenjang bukan trapesium sama kaki; trapesium PQRS sama kaki");

  // Uji Kompetensi: kunci dari buku dicocokkan dengan hitungan mandiri
  const kunciHitung = [
    5 + 1 > 7, // 1: ruas 5, 7, 1 membentuk segitiga bila jumlah dua sisi terpendek lebih besar daripada sisi terpanjang
    false, // 2: segitiga siku-siku hanya punya satu sudut siku-siku (jumlah tiga sudut 180, dua sudut siku-siku sudah 180)
    180 === 180, // 3
    true, // 4: sama sisi memiliki dua sisi sama panjang, jadi sama kaki
    trapesiumSamaKaki("jajar"), // 5
    persegiPanjang("persegiPanjang") && jajargenjang("persegiPanjang"), // 6
    jajargenjang("belahKetupat") && layangLayang("belahKetupat"), // 7
    !persegiPanjang("persegi"), // 8
    !belahKetupat("persegi"), // 9
    SF.layang.sumbuDiagonal >= 1, // 10
  ];
  sama(90 + 90 < 180, false, "dua sudut siku-siku dalam segitiga melebihi batas: segitiga siku-siku hanya satu sudut siku-siku");
  const uji = adegan(M, "uji");
  const objK = L.keadaanStory(uji, 5, 9999);
  const jawabBuku = Array.from({ length: 10 }, (_, i) => objK.find((o) => o.id === `aw${i}`)?.isi);
  sama(jawabBuku, kunciHitung.map((b) => (b ? "B" : "S")), "kunci Uji Kompetensi di gambar sama dengan hitungan mandiri");
  sama(jawabBuku.filter((x) => x === "B").length, 5, "lima benar");
  // pengayaan
  const segitiga = [[-1.2, 0.9], [1.2, 0.9], [-1.2, -1.5]];
  const sudutSeg = segitiga.map((_, i) => sudutDerajat(segitiga, i));
  sama(sudutSeg.map((x) => Math.round(x)).sort(), [45, 45, 90], "pengayaan 1: sudut segitiga 45, 45, 90");
  sama(45 + 45, 90, "45 ditambah 45 sama dengan 90");
  sama(180 - 90, 90, "180 dikurangi 90 sama dengan 90");
  const lancip = sudutSeg.every((x) => x < 89.999);
  const samaKakiSeg = hampir(jarak(segitiga[0], segitiga[1]), jarak(segitiga[0], segitiga[2])) || hampir(jarak(segitiga[0], segitiga[2]), jarak(segitiga[1], segitiga[2]));
  const objP1 = L.keadaanStory(uji, 6, 9999);
  const nilaiCek = (objs, id) => objs.find((o) => o.id === id)?.isi;
  sama([nilaiCek(objP1, "pc0"), nilaiCek(objP1, "pc1"), nilaiCek(objP1, "pc2")], [lancip ? "✓" : "✗", samaKakiSeg ? "✓" : "✗", samaKakiSeg && sudutSeg.some((x) => hampir(x, 90)) ? "✓" : "✗"], "pengayaan 1: tanda di gambar sama dengan hitungan");
  const memenuhi2 = (b) => SF[b].pasangSejajar >= 1 && (SF[b].sisiBerhadapanSama || SF[b].duaPasangBerurutan || hampir(SF[b].panjang[1], SF[b].panjang[3]));
  const objP2 = L.keadaanStory(uji, 7, 9999);
  sama([nilaiCek(objP2, "qjc"), nilaiCek(objP2, "qlc"), nilaiCek(objP2, "qsc")], [memenuhi2("jajar") ? "✓" : "✗", memenuhi2("layang") ? "✓" : "✗", memenuhi2("samaKaki") ? "✓" : "✗"], "pengayaan 2: tanda di gambar sama dengan hitungan");

  // segitiga 5, 7, 1
  cek(5 + 1 < 7 && 5 + 7 > 1, "ruas 5, 7, 1: 5 ditambah 1 kurang dari 7, bukan segitiga");

  // 7.2A: sembilan bangun
  const kecil = (pts) => pts.length === 4;
  const reflex = (pts) => pts.filter((_, i) => {
    const n = pts.length;
    return silang(vek(pts[(i + n - 1) % n], pts[i]), vek(pts[i], pts[(i + 1) % n])) * silang(vek(pts[0], pts[1]), vek(pts[1], pts[2])) < 0;
  }).length;
  const empat = Object.keys(G.BENTUK_72A).filter((h) => kecil(G.BENTUK_72A[h]));
  sama(empat.sort(), ["A", "B", "F", "H"], "bangun dengan empat sisi pada 7.2A: A, B, F, H");
  sama(G.SEGI_EMPAT_72A, ["A", "B", "F", "H"], "daftar segi empat di gambar: A, B, F, H");
  cek(reflex(G.BENTUK_72A.H) === 1 && ["A", "B", "F"].every((h) => reflex(G.BENTUK_72A[h]) === 0), "H cekung (satu sudut refleks), A, B, F cembung");
  sama(["C", "D", "G", "E"].map((h) => G.BENTUK_72A[h].length), [3, 5, 5, 10], "C tiga sudut, D dan G lima sudut, E bintang bersudut 10");
  {
    const h = G.BENTUK_72A.H;
    const diag = [h[1], h[3]];
    const tengahDiag = tengah(diag);
    // titik tengah diagonal P1-P3 berada di luar poligon H (uji sinar)
    const dalam = (p, poli) => {
      let d = false;
      for (let i = 0, j = poli.length - 1; i < poli.length; j = i, i += 1) {
        if (poli[i][1] > p[1] !== poli[j][1] > p[1] && p[0] < ((poli[j][0] - poli[i][0]) * (p[1] - poli[i][1])) / (poli[j][1] - poli[i][1]) + poli[i][0]) d = !d;
      }
      return d;
    };
    cek(!dalam(tengahDiag, h), "H: diagonal P1-P3 melewati daerah di luar bangun");
    cek(dalam(tengah([h[0], h[2]]), h), "H: diagonal lain berada di dalam bangun");
  }
  {
    const a = adegan(M, "pembuka-b");
    const o = L.keadaanStory(a, 3, 9999);
    sama(["nC", "nD", "nG", "nE", "nI"].map((id) => o.find((x) => x.id === id)?.isi), ["3 sisi", "5 sisi", "5 sisi", "bintang", "lingkaran"], "keterangan bangun bukan segi empat di gambar");
    const opak = L.keadaanStory(a, 2, 9999);
    sama(["A", "B", "F", "H"].every((h) => opak.find((x) => x.id === `s${h}`)?.warna === G.W.hijauMuda), true, "A, B, F, H diwarnai hijau");
    sama(["C", "D", "E", "G", "I"].every((h) => (opak.find((x) => x.id === `s${h}`)?.op ?? 1) < 1), true, "C, D, E, G, I diredupkan");
  }

  // metode luar: hitungan di gambar
  {
    const a = adegan(U, "luarb-trapesium-terapan");
    const o = L.keadaanStory(a, 0, 9999);
    const urut = ["sembarang", "jajar", "persegiPanjang", "belahKetupat", "persegi", "layang"];
    sama(urut.map((b, i) => o.find((x) => x.id === `s${i}c`)?.isi), urut.map((b) => `${SF[b].pasangSejajar} pasang`), "metode luar: pasangan sisi sejajar tiap bangun sama dengan hitungan");
    const akhir = L.keadaanStory(a, 3, 9999);
    cek(akhir.some((x) => x.isi === "5 - 1 = 4 bangun berpindah golongan") && 5 - 1 === 4, "metode luar: 5 dikurangi 1 sama dengan 4 bangun berpindah");
    const tanda = L.keadaanStory(a, 1, 9999);
    sama(urut.map((b, i) => tanda.find((x) => x.id === `ok${i}`)?.isi === "✓"), urut.map((b) => termasukTrapesium(b)), "metode luar: tanda trapesium inklusif tiap bangun");
  }
  {
    const a = adegan(U, "luarb-hierarki-terapan");
    const o = L.keadaanStory(a, akhirKe(a), 9999);
    const nama = { 0: "jajar", 1: "layang", 2: "belahKetupat", 3: "persegiPanjang", 4: "persegi" };
    sama([0, 1, 2, 3, 4].map((i) => Number(o.find((x) => x.id === `bt${i}c`)?.isi)), [0, 1, 2, 3, 4].map((i) => SF[nama[i]].sumbu), "metode luar: batang sumbu simetri sama dengan hitungan");
    const k3 = L.keadaanStory(a, 2, 9999).filter((x) => x.t === "teks").map((x) => x.isi);
    cek(k3.includes("2 sumbu") && k3.includes("4 sumbu") && SF.belahKetupat.sumbu === 2 && SF.persegiPanjang.sumbu === 2 && SF.persegi.sumbu === 4, "metode luar: dua jalan menuju persegi (2 sumbu menjadi 4 sumbu)");
    const k1 = L.keadaanStory(a, 0, 9999).filter((x) => x.t === "teks").map((x) => x.isi);
    cek(k1.includes("0 sumbu simetri") && k1.includes("2 sumbu simetri") && SF.jajar.sumbu === 0 && SF.persegiPanjang.sumbu === 2, "metode luar: jajargenjang 0 sumbu, persegi panjang 2 sumbu");
  }
  {
    const a = adegan(U, "luarb-matriks-terapan");
    const o = L.keadaanStory(a, akhirKe(a), 9999);
    const kolom = ["jajar", "persegiPanjang", "belahKetupat", "persegi"];
    const cirinya = [
      (s) => s.duaPasangSejajar,
      (s) => s.sisiBerhadapanSama,
      (s) => s.sikuSemua,
      (s) => s.empatSisiSama,
      (s) => s.diagTegak,
      (s) => s.diagSama,
    ];
    let cocok = 0;
    kolom.forEach((b, c) => {
      cirinya.forEach((f, r) => {
        const tanda = o.find((x) => x.id === `a-m${r}${c}`)?.isi;
        cocok += 1;
        cek(tanda === (f(SF[b]) ? "✓" : "✗"), `matriks: ciri ${r + 1} bangun ${b} sama dengan hitungan geometri (${tanda})`);
      });
      sama(o.find((x) => x.id === `a-j${c}`)?.isi, String(cirinya.filter((f) => f(SF[b])).length), `matriks: jumlah centang kolom ${b}`);
    });
    cek(cocok === 24, "matriks: 24 sel dicocokkan");
    // kolom persegi memuat semua centang kolom persegi panjang dan belah ketupat
    const ya = (b) => cirinya.map((f) => f(SF[b]));
    cek(ya("persegiPanjang").every((v, r) => !v || ya("persegi")[r]) && ya("belahKetupat").every((v, r) => !v || ya("persegi")[r]), "matriks: kolom persegi memuat semua centang persegi panjang dan belah ketupat");
    cek(ya("jajar").every((v, r) => !v || ya("persegiPanjang")[r]) && ya("jajar").every((v, r) => !v || ya("belahKetupat")[r]), "matriks: kolom jajargenjang termuat pada persegi panjang dan belah ketupat");
  }
  {
    const a = adegan(U, "luarb-diagonal");
    const o = L.keadaanStory(a, akhirKe(a), 9999);
    const urut = ["jajar", "persegiPanjang", "belahKetupat", "persegi", "layang"];
    urut.forEach((b, r) => {
      const harap = [SF[b].diagBagiDua, SF[b].diagSama, SF[b].diagTegak].map((v) => (v ? "✓" : "✗"));
      sama([0, 1, 2].map((c) => o.find((x) => x.id === `d${r}-y${c}`)?.isi), harap, `uji diagonal ${b}`);
      sama(o.find((x) => x.id === `d${r}-s`)?.isi, String(SF[b].sumbuDiagonal), `diagonal ${b} yang menjadi sumbu simetri`);
    });
  }
  {
    const a = adegan(U, "luarb-diagonal-terapan");
    const urut = ["persegiPanjang", "belahKetupat", "persegi", "layang"];
    urut.forEach((b, i) => {
      const o = L.keadaanStory(a, i, 9999);
      const harap = [SF[b].diagBagiDua, SF[b].diagSama, SF[b].diagTegak];
      const warna = [0, 1, 2].map((r) => o.find((x) => x.id === `s${r}-k`)?.warna);
      sama(warna, harap.map((v) => (v ? G.W.hijauMuda : G.W.merahMuda)), `tebak bangun ${i + 1}: jawaban pertanyaan diagonal sama dengan hitungan`);
      const sumbuTeks = o.find((x) => x.id === "s3-t")?.isi;
      if (i > 0) sama(sumbuTeks, `${SF[b].sumbu} sumbu simetri`, `tebak bangun ${i + 1}: sumbu simetri`);
      const nama = o.find((x) => x.id === "jwn")?.isi;
      sama(nama, ["persegi panjang", "belah ketupat", "persegi", "layang-layang"][i], `tebak bangun ${i + 1}: nama jawaban`);
      // jawaban unik di antara empat bangun menurut ciri yang diberikan
      const cocokan = ["persegiPanjang", "belahKetupat", "persegi", "layang", "jajar"].filter((c) => [SF[c].diagBagiDua, SF[c].diagSama, SF[c].diagTegak].every((v, j) => v === harap[j]) && (i === 0 || SF[c].sumbu === SF[b].sumbu));
      sama(cocokan, [b], `tebak bangun ${i + 1}: hanya satu bangun yang cocok`);
    });
  }
}

/* ------------------------------ Kutipan buku dan Buku Panduan Guru (bila PDF tersedia) ------------------------------ */
{
  const pdfBS = new URL("../bahan-sd/Matematika-BS-KLS-V.pdf", import.meta.url);
  const pdfBG = new URL("../bahan-sd/Matematika-BG-KLS-V.pdf", import.meta.url);
  const path = (u) => u.pathname.replace(/^\/([A-Za-z]:)/, "$1");
  const ada = existsSync(pdfBS) && existsSync(pdfBG);
  const bs = ada ? spawnSync("pdftotext", ["-f", "225", "-l", "250", "-raw", path(pdfBS), "-"], { encoding: "utf8", maxBuffer: 1 << 26 }) : null;
  const bg = ada ? spawnSync("pdftotext", ["-f", "326", "-l", "356", "-raw", path(pdfBG), "-"], { encoding: "utf8", maxBuffer: 1 << 26 }) : null;
  if (!ada || !bs || bs.status !== 0 || !bg || bg.status !== 0) console.log("PDF atau pdftotext tidak tersedia: pemeriksaan kutipan buku dilewati");
  else {
    const bersih = (t) => t.toLowerCase().replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim();
    const buku = `${bersih(bs.stdout)} ${bersih(bg.stdout)}`;
    let n = 0;
    for (const a of M.adegan) for (const kt of a.kutipan ?? []) {
      n += 1;
      cek(buku.includes(bersih(kt)), `kutipan buku ${a.id}: "${kt}" ada di teks PDF`);
    }
    cek(n >= 80, `jumlah kutipan buku yang diperiksa (${n})`);
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k5b7b-.*)\.(ts|tsx)$/.test(f));
  cek(berkas.length >= 8, `berkas story ditemukan (${berkas.length})`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    const buruk = [...s].filter((c) => {
      const k = c.codePointAt(0);
      return k > 0x1fa95 || k === 0x1f7f0 || k === 0x200d;
    });
    cek(buruk.length === 0, `${f}: tanpa emoji di atas Emoji 12 dan tanpa ZWJ (${buruk.map((c) => c.codePointAt(0).toString(16)).join()})`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: UTF-8 tanpa BOM dan akhir baris LF`);
    cek(!/fetch\(|XMLHttpRequest|openai|anthropic|gemini|correct_index|explanation/i.test(s), `${f}: tanpa jaringan, model bahasa, atau kunci jawaban`);
    cek(!/from "react"/.test(s), `${f}: logika dan data tanpa React`);
    cek(!/Math\.random/.test(s), `${f}: tanpa Math.random`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|k5b7b-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k5b7b sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../video-k5b7b.tsx", folder), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_B57|naskah-k5b7/.test(pembungkus) && /VIDEO_MATERI_K5B7B/.test(pembungkus) && /VIDEO_LUAR_K5B7B/.test(pembungkus) && /export function VideoK5B7B/.test(pembungkus) && /DaftarVideoCerita/.test(pembungkus), "video-k5b7b: memakai dua video baru, bukan naskah dan visual lama");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
if (process.env.RINCI) for (const v of VIDEO) for (const a of v.adegan) console.log(`  ${v.id}/${a.id}: ${a.ketukan.length} ketukan, kata per ketukan ${a.ketukan.map((kt) => L.kataDari(kt.suara).length).join(",")}, jumlah ${a.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)}`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
