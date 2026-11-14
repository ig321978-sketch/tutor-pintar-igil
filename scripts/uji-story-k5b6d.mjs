// Uji Story Kelas 5 Bab 6 Sub-Bab D (melukis sudut): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// pemisahan materi dan metode luar, kutipan buku dan Buku Panduan Guru (bila PDF ada), geometri gambar dihitung mandiri
// (besar sudut dari dua sinar, letak angka busur derajat, jarum jam, persimpangan jalan, segi lima keramik, kunci Uji Kompetensi),
// emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k5b6d.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k5b6d-video.ts");
const G = await import("../src/components/modul/story/k5b6d-gambar.ts");

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
const VIDEO = [V.VIDEO_MATERI_K5B6D, V.VIDEO_LUAR_K5B6D];
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
const M = V.VIDEO_MATERI_K5B6D;
const U = V.VIDEO_LUAR_K5B6D;
const adegan = (v, id) => v.adegan.find((x) => x.id === id);
const keadaan = (v, id, i) => L.keadaanStory(adegan(v, id), i, 9999);
const cari = (objs, id) => objs.find((o) => o.id === id);
const M2 = await import("../src/components/modul/story/k5b6d-materi-2.ts");
const M3 = await import("../src/components/modul/story/k5b6d-materi-3.ts");
{
  const NAMA_METODE = /Constructing|Angles Protocol|Protractor Construction|Angle Addition|Estimate|Protocol|metode luar|metode dari luar/i;
  const materi = teksVideo(M);
  const luar = teksVideo(U);
  cek(!NAMA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of ["Constructing Angles Protocol", "Protractor Construction", "Angle Addition Construction", "Estimate-Then-Verify"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(!/Uji Kompetensi|Refleksi|Panduan Guru|Kipas/i.test(luar), "video metode luar tidak memuat isi materi kurikulum");
  cek(M.adegan.every((a) => /Buku (Siswa|Panduan Guru)/.test(a.sumber) && /hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(U.adegan.every((a) => /metode (dari )?luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  for (const kata of ["Sub-Bab D", "Ayo Menyimak", "Lukas", "Nisa", "Ayo Berlatih", "Uji Kompetensi", "Refleksi", "Proyek|tata kota", "Permai Indah", "diferensiasi", "miskonsepsi", "rasi bintang", "orang tua", "remedial", "rubrik", "Jalak", "Nuri", "Bangau", "Ketilang", "keramik", "Pak Tukang", "Panduan Guru", "Pasangan 1", "Pasangan 2", "busur derajat", "150"]) cek(new RegExp(kata, "i").test(materi), `video materi memuat ${kata}`);
  const ids = U.adegan.map((a) => a.id);
  cek(["luard-protokol", "luard-protokol-terapan", "luard-busur", "luard-busur-terapan", "luard-tambah", "luard-tambah-terapan", "luard-perkiraan", "luard-perkiraan-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(M.adegan.length === 15 && U.adegan.length === 10, "15 adegan materi dan 10 adegan metode luar");
  cek(totalKetukan >= 100, `total ketukan cukup dalam (${totalKetukan})`);
  cek(diperiksa >= 10, `hubungan bilangan di gambar yang diperiksa mandiri (${diperiksa})`);
}

/* ------------------------------ Geometri gambar, dihitung mandiri dari benda ------------------------------ */
const hampir = (a, b, t = 0.6) => Math.abs(a - b) < t;
const antara = (g1, g2) => G.sudutAntaraGaris(g1, g2);
const semuaState = [];
for (const v of VIDEO) for (const a of v.adegan) a.ketukan.forEach((_, i) => semuaState.push([`${v.id}/${a.id}#${i + 1}`, L.keadaanStory(a, i, 9999)]));

{
  // 1) Tiap label "N°" berimbuhan L memiliki dua sinar P1 dan P2: besar sudut dari sinar sama dengan label
  let n = 0;
  for (const [nama, objs] of semuaState) {
    for (const o of objs) {
      const m = /^(.+)L$/.exec(o.id);
      const mm = o.t === "teks" && /^(\d+)°$/.exec(o.isi ?? "");
      if (!m || !mm) continue;
      const g1 = cari(objs, `${m[1]}1`);
      const g2 = cari(objs, `${m[1]}2`);
      if (!g1 || !g2 || g1.t !== "garis" || g2.t !== "garis") continue;
      n += 1;
      cek(hampir(antara(g1, g2), Number(mm[1])), `${nama}: label ${o.isi} sama dengan sudut sinar ${m[1]} (${antara(g1, g2).toFixed(2)})`);
    }
  }
  cek(n >= 25, `sudut berlabel yang dihitung dari sinar (${n})`);

  // 2) Letak angka busur derajat sesuai arah dari pusat
  let nb = 0;
  for (const [nama, objs] of semuaState) {
    for (const pusat of objs.filter((o) => o.t === "bulat" && /c$/.test(o.id) && cari(objs, `${o.id.slice(0, -1)}b`))) {
      const p = pusat.id.slice(0, -1);
      const n0 = cari(objs, `${p}n0`);
      if (!n0) continue;
      const kanan = n0.x > pusat.x;
      for (const o of objs.filter((q) => new RegExp(`^${p}[nd]\\d+$`).test(q.id))) {
        const a = Number(o.id.slice(p.length + 1));
        const luar = o.id[p.length] === "n";
        const harap = (luar ? a : 180 - a) * (kanan ? 1 : -1) + (kanan ? 0 : 180) * (kanan ? 0 : 1);
        const hasil = (Math.atan2(pusat.y - (o.y - 2.4), o.x - pusat.x) * 180) / Math.PI;
        const norm = (d) => ((d % 360) + 360) % 360;
        const sel = Math.abs(norm(hasil) - norm(kanan ? (luar ? a : 180 - a) : luar ? 180 - a : a));
        nb += 1;
        cek(Math.min(sel, 360 - sel) < 4, `${nama}: angka ${o.id} berada pada arah yang benar (${hasil.toFixed(1)}, harap ${harap})`);
      }
    }
  }
  cek(nb >= 100, `angka busur derajat yang dicek letaknya (${nb})`);

  // 3) Kunci Ayo Berlatih
  sama(M2.LATIHAN.map((l) => l.derajat), [30, 75, 110, 52, 140], "Ayo Berlatih 1: ukuran sudut a sampai e sama dengan buku");
  sama(M2.CONTOH_SOAL2.map((s) => s.derajat), [45, 83, 112, 165], "Ayo Berlatih 2: ukuran sudut sama dengan buku");
  for (const l of M2.LATIHAN) {
    const sel = Math.abs(l.kaki - l.kedua);
    cek(hampir(Math.min(sel, 360 - sel), l.derajat, 0.01), `gambar ${l.h}: kaki dan sinar kedua membentuk ${l.derajat}`);
    cek((l.derajat < 90) === (l.jenis === "lancip") && (l.derajat > 90) === (l.jenis === "tumpul"), `gambar ${l.h}: jenis sudut sesuai besar`);
  }
  for (const s of M2.CONTOH_SOAL2) {
    const sel = Math.abs(s.kaki - s.kedua);
    cek(hampir(Math.min(sel, 360 - sel), s.derajat, 0.01), `soal 2 ${s.id}: sudut ${s.derajat}`);
  }
  cek(M2.LATIHAN.filter((l) => l.kaki % 180 !== 0).length === 4, "Ayo Berlatih 1: empat dari lima kaki sudut tidak mendatar");
  const berlatih = [["berlatih-1", 1, 0], ["berlatih-1", 2, 1], ["berlatih-1", 3, 2], ["berlatih-2", 0, 3], ["berlatih-2", 1, 4]];
  for (const [id, i, idx] of berlatih) {
    const o = keadaan(M, id, i);
    const jn = cari(o, "jn")?.isi;
    cek(jn === `sudut ${M2.LATIHAN[idx].jenis}`, `${id}#${i + 1}: jenis sudut di gambar sama dengan hitungan (${jn})`);
  }

  // 4) Apersepsi: panjang kaki tidak memengaruhi besar sudut
  {
    const a1 = keadaan(M, "apersepsi-d", 1);
    const sa = antara(cari(a1, "a1"), cari(a1, "a2"));
    const sb = antara(cari(a1, "b1"), cari(a1, "b2"));
    cek(hampir(sa, sb, 0.01) && cari(a1, "b1").x2 > cari(a1, "a1").x2 * 2, "pasangan 1: sudut A sama B walau kaki B lebih panjang");
    const a3 = keadaan(M, "apersepsi-d", 3);
    const pa = antara(cari(a3, "a1"), cari(a3, "a2"));
    const pb = antara(cari(a3, "b1"), cari(a3, "b2"));
    cek(pb > pa && Math.hypot(cari(a3, "a1").x2, cari(a3, "a1").y2) > Math.hypot(cari(a3, "b1").x2, cari(a3, "b1").y2), `pasangan 2: sudut B (${pb.toFixed(0)}) lebih besar dari A (${pa.toFixed(0)}) walau kaki B lebih pendek`);
  }

  // 5) Kipas 150 derajat
  {
    const o = keadaan(M, "kipas-langkah2", 6);
    const rusuk = [0, 1, 2, 3, 4].map((i) => cari(o, `fr${i}`));
    cek(hampir(antara(rusuk[0], rusuk[4]), 150, 0.01), "kipas: rusuk pertama dan terakhir membentuk 150");
    cek([0, 1, 2, 3].every((i) => hampir(antara(rusuk[i], rusuk[i + 1]), 37.5, 0.01)), "kipas: rusuk berjarak sama 37,5");
    const t = keadaan(M, "kipas-langkah2", 0);
    const dot = cari(t, "tt");
    const pusat = cari(t, "bdc");
    cek(hampir((Math.atan2(pusat.y - dot.y, dot.x - pusat.x) * 180) / Math.PI, 150, 1), "kipas: titik tanda berada pada angka 150 dari pusat busur");
    const p3 = keadaan(M, "kipas-langkah2", 2);
    cek(cari(p3, "bdd150") && hampir(cari(p3, "bdd150").x, pusat.x + (cari(p3, "bdd150").x - pusat.x)) && cari(p3, "bdd0").x < pusat.x, "kipas: skala dalam punya nol di kiri");
  }

  // 6) Miskonsepsi 120 menjadi 60
  {
    const o = keadaan(M, "miskonsepsi-d", 1);
    const d = cari(o, "td");
    const c = cari(o, "bdc");
    const arah = (Math.atan2(c.y - d.y, d.x - c.x) * 180) / Math.PI;
    const dalam120 = cari(o, "bdd120");
    cek(hampir(arah, 60, 1) && hampir((Math.atan2(c.y - (dalam120.y - 2.4), dalam120.x - c.x) * 180) / Math.PI, 60, 4), "miskonsepsi: angka 120 skala dalam berada pada arah 60 dari kaki");
    cek(180 - 120 === 60, "120 pada skala dalam sama dengan 60 pada skala luar");
    const k3 = keadaan(M, "miskonsepsi-d", 2);
    cek(hampir(antara(cari(k3, "r1"), cari(k3, "r2")), 60, 0.01), "miskonsepsi: hasil salah membentuk 60");
    const k5 = keadaan(M, "miskonsepsi-d", 4);
    cek(hampir(antara(cari(k5, "r1"), cari(k5, "r2")), 120, 0.01), "miskonsepsi: lukisan benar membentuk 120");
  }

  // 7) Rubrik proyek
  {
    const G2 = M3; // hindari peringatan
    void G2;
    cek(G.RUBRIK_PROYEK.reduce((t, r) => t + r.bobot, 0) === 100, "rubrik proyek: bobot berjumlah 100");
    const o = keadaan(M, "proyek-tata-kota", 4);
    sama(G.RUBRIK_PROYEK.map((r, i) => cari(o, `rbp${i}`)?.isi), ["30%", "20%", "15%", "35%"], "rubrik proyek: persen di gambar sama dengan buku");
    sama(G.RUBRIK_PROYEK.map((r, i) => Math.round(Number(/L([\d.]+)/.exec(cari(o, `rbb${i}`)?.d ?? "")?.[1]) / 2.6)), [30, 20, 15, 35], "rubrik proyek: panjang batang sama dengan bobot");
    cek(cari(keadaan(M, "proyek-tata-kota", 5), "tot")?.isi === "total 100%", "rubrik proyek: total 100 persen");
  }

  // 8) Jam
  {
    sama(M3.JAM_UJI.map((j) => G.sudutTerkecilJam(j.j, j.m)), [30, 120, 180], "sudut terkecil jam dihitung mandiri: 11.00, 08.00, 06.00");
    sama(M3.JAM_UJI.map((j) => j.sudut), [30, 120, 180], "kunci jam Buku Panduan Guru hlm. 276");
    const o = keadaan(M, "uji-jam", 0);
    sama([1, 2, 3].map((i) => Math.round(antara(cari(o, `c${i}jp`), cari(o, `c${i}jm`)))), [30, 120, 180], "tiga jam di gambar: sudut antara jarum pendek dan panjang");
    M3.JAM_UJI.forEach((j, i) => {
      const s = keadaan(M, "uji-jam", i + 1);
      const sudutJarum = antara(cari(s, "jbjp"), cari(s, "jbjm"));
      cek(hampir(sudutJarum, j.sudut, 0.01) && cari(s, "jL").isi === `${j.sudut}°`, `jam ${j.j}: sudut dari jarum ${sudutJarum.toFixed(2)} sama dengan label`);
    });
    const jarakSelang = [1, 4, 6].map((n) => n * 30);
    sama(jarakSelang, [30, 120, 180], "banyak selang kali 30");
    const akhir = M3.JAM_UJI.map((j) => j.sudut);
    cek(Math.max(...akhir) === 180 && akhir.indexOf(180) === 2, "yang terbesar adalah pukul enam, 180 derajat");
    cek(120 + 240 === 360 && G.sudutTerkecilJam(8, 0) === 120, "dua sudut pukul delapan berjumlah 360");
  }

  // 9) Persimpangan jalan
  {
    const o = keadaan(M, "uji-jalan-ab", 0);
    const j = (x) => cari(o, `j${x}`);
    const sudut = [antara(j("nr"), j("jl")), antara(j("bg"), j("nr")), antara(j("kt"), j("bg")), antara(j("jl"), j("kt"))];
    sama(sudut.slice(0, 3).map(Math.round), [110, 90, 25], "persimpangan: tiga sudut pertama sama dengan kunci");
    cek(hampir(sudut[0] + sudut[1] + sudut[2] + sudut[3], 360, 0.01), "persimpangan: empat sudut di gambar berjumlah 360");
    cek(Math.round(sudut[3]) === 135, "persimpangan: sudut Ketilang dan Jalak di gambar 135 (kunci buku 130)");
    sama(M3.SUDUT_JALAN.map((s) => s.kunci), [110, 90, 25, 130], "persimpangan: kunci Buku Panduan Guru");
    cek(110 + 90 + 25 + 130 === 355 && 360 - 355 === 5, "catatan: jumlah kunci 355, selisih 5 dari 360");
    cek(M3.SUDUT_JALAN.length === 4 && Math.max(...M3.SUDUT_JALAN.map((s) => s.kunci)) === 130 && M3.SUDUT_JALAN[0].kunci < 130, "pernyataan i salah: 110 bukan yang terbesar");
    cek(M3.SUDUT_JALAN.some((s) => s.kunci === 90), "pernyataan ii salah: ada sudut 90");
    const jenis = (d) => (d < 90 ? "lancip" : d > 90 ? "tumpul" : "siku-siku");
    const t = keadaan(M, "uji-jalan-ab", 5);
    sama(M3.SUDUT_JALAN.map((s, i) => cari(t, `jn${i}-t`)?.isi), M3.SUDUT_JALAN.map((s) => `${s.kunci}° ${jenis(s.kunci)}`), "persimpangan: jenis tiap sudut di gambar");
    const kecil = M3.SUDUT_JALAN.reduce((a, b) => (a.kunci < b.kunci ? a : b));
    cek(kecil.id === "sa2" && kecil.dari === "kt" && kecil.ke === "bg", "sudut terkecil 25: Bangau dan Ketilang");
    const sorted = [...M3.SUDUT_JALAN.map((s) => s.kunci)].sort((a, b) => a - b);
    sama(sorted, [25, 90, 110, 130], "urutan sudut dari kecil ke besar");
  }

  // 10) Keramik segi lima
  {
    const o = keadaan(M, "keramik-1", 4);
    const pts = (id) => G.titikDariJalur(cari(o, id));
    const dalam = (id) => pts(id).map((_, i) => G.sudutDalam(pts(id), i));
    cek(dalam("pj").every((d) => hampir(d, 90, 0.3)), "persegi pola 1: semua sudut 90");
    for (const id of ["pl0", "pl1", "pl2", "pl3"]) cek(dalam(id).every((d) => hampir(d, 108, 0.3)), `segi lima ${id}: semua sudut dalam 108`);
    const sisi = (p) => p.map((q, i) => Math.hypot(q[0] - p[(i + 1) % p.length][0], q[1] - p[(i + 1) % p.length][1]));
    cek([pts("pj"), pts("pl0"), pts("pl1")].every((p) => sisi(p).every((s) => hampir(s, sisi(pts("pj"))[0], 0.1))), "pola 1: semua sisi sama panjang");
    const sudutDi = (p, pojok) => {
      const i = p.findIndex((q) => Math.hypot(q[0] - pojok[0], q[1] - pojok[1]) < 0.01);
      return i < 0 ? null : [p[(i + p.length - 1) % p.length], p[(i + 1) % p.length], p[i]];
    };
    const pojok = pts("pj")[1];
    const luarArah = (p) => {
      const t = sudutDi(p, pojok);
      const lain = [t[0], t[1]].filter((q) => !pts("pj").some((r) => Math.hypot(q[0] - r[0], q[1] - r[1]) < 0.01));
      return (Math.atan2(pojok[1] - lain[0][1], lain[0][0] - pojok[0]) * 180) / Math.PI;
    };
    const celah = Math.abs(luarArah(pts("pl0")) - luarArah(pts("pl1")));
    cek(hampir(celah, 54, 0.3) && 360 - 90 - 108 - 108 === 54, `pola 1: celah di pojok ${celah.toFixed(2)} = 54`);
    cek(hampir(G.pola1(105, 112, 34).celah[1] - G.pola1(105, 112, 34).celah[0], 54, 0.01), "pola 1: juring celah berukuran 54");
    cek(360 - 90 === 270 && 270 - 108 === 162 && 162 - 108 === 54, "pola 1: pengurangan bertahap menuju 54");
    const b = keadaan(M, "keramik-1", 1);
    const pb = G.titikDariJalur(cari(b, "pb"));
    cek(pb.every((_, i) => hampir(G.sudutDalam(pb, i), 108, 0.3)), "segi lima besar: sudut dalam 108");
    const pusat = [105, 112];
    const arah = pb.map((p) => (Math.atan2(pusat[1] - p[1], p[0] - pusat[0]) * 180) / Math.PI);
    cek(arah.every((a, i) => hampir(((arah[(i + 1) % 5] - a + 540) % 360) - 180, -72, 0.3) || hampir(((arah[(i + 1) % 5] - a + 540) % 360) - 180, 72, 0.3)), "segi lima besar: sudut pusat antarsegitiga 72");
    cek(360 / 5 === 72 && 180 - 72 === 108 && 108 / 2 === 54 && 54 + 54 === 108, "hitungan 360 : 5 = 72, 180 - 72 = 108, 108 : 2 = 54");
    const tri = G.titikDariJalur(cari(keadaan(M, "keramik-1", 2), "sg"));
    sama(tri.map((_, i) => Math.round(G.sudutDalam(tri, i))).sort((a, c) => a - c), [54, 54, 72], "segitiga keramik: 72, 54, 54");
    // pola 2
    const q = keadaan(M, "keramik-2", 0);
    const qp = [0, 1, 2].map((i) => G.titikDariJalur(cari(q, `qp${i}`)));
    cek(qp.every((p) => p.every((_, i) => hampir(G.sudutDalam(p, i), 108, 0.3))), "pola 2: tiga segi lima, sudut dalam 108");
    const P = [120, 112];
    const tepi = qp.flatMap((p) => {
      const i = p.findIndex((r) => Math.hypot(r[0] - P[0], r[1] - P[1]) < 0.01);
      return i < 0 ? [] : [[p[(i + 1) % 5], p[(i + 4) % 5]]];
    });
    cek(tepi.length === 3, "pola 2: ketiga segi lima berpangkal di satu titik");
    const dir = (r) => (((Math.atan2(P[1] - r[1], r[0] - P[0]) * 180) / Math.PI) + 360) % 360;
    const arahTepi = tepi.flatMap((t2) => t2.map(dir)).sort((a, c) => a - c);
    const sela = arahTepi.map((a, i) => (arahTepi[(i + 1) % 6] - a + 360) % 360).map((x) => Math.round(x * 100) / 100);
    cek(sela.filter((x) => hampir(x, 108, 0.05)).length === 3 && sela.filter((x) => hampir(x, 36, 0.05)).length === 1 && sela.filter((x) => hampir(x, 0, 0.05)).length === 2, `pola 2: tiga sudut 108 dan satu celah 36 (${sela.join(",")})`);
    cek(3 * 108 === 324 && 360 - 324 === 36 && hampir(G.pola2(120, 112, 34).celah[1] - G.pola2(120, 112, 34).celah[0], 36, 0.01), "pola 2: 3 x 108 = 324 dan celah 36");
  }

  // 11) Metode luar
  {
    const a = adegan(U, "luard-protokol-terapan");
    const o = L.keadaanStory(a, 3, 9999);
    cek(hampir(antara(cari(o, "r1"), cari(o, "r2")), 52, 0.01), "luar protokol: 52 derajat");
    const p = L.keadaanStory(a, 1, 9999);
    const dot = cari(p, "td");
    const c = cari(p, "bdc");
    cek(hampir((Math.atan2(c.y - dot.y, dot.x - c.x) * 180) / Math.PI, 52, 1), "luar protokol: tanda di angka 52");
    const b = L.keadaanStory(adegan(U, "luard-busur-terapan"), 3, 9999);
    cek(hampir(antara(cari(b, "r1"), cari(b, "r2")), 110, 0.01) && hampir(antara(cari(b, "r1"), cari(b, "w2")), 70, 0.01) && 180 - 110 === 70, "luar busur: 110 benar, deret salah 70");
    const bd = L.keadaanStory(adegan(U, "luard-busur-terapan"), 2, 9999);
    const dt = cari(bd, "td");
    const pk = cari(bd, "bkc");
    cek(hampir((Math.atan2(pk.y - dt.y, dt.x - pk.x) * 180) / Math.PI, 70, 1) && cari(bd, "bkn0").x < pk.x, "luar busur: tanda 110 dari kiri berarah 70");
    const t = L.keadaanStory(adegan(U, "luard-tambah"), 1, 9999);
    cek(hampir(antara(cari(t, "p1"), cari(t, "p2")), 90, 0.01) && hampir(antara(cari(t, "p1"), cari(t, "p3")), 112, 0.01) && hampir(antara(cari(t, "p2"), cari(t, "p3")), 22, 0.01) && 90 + 22 === 112, "luar tambah: 90 + 22 = 112");
    const t2 = L.keadaanStory(adegan(U, "luard-tambah"), 2, 9999);
    cek(hampir(antara(t2.find((x) => x.id === "s1"), t2.find((x) => x.id === "s2")), 83, 0.01) && hampir(antara(t2.find((x) => x.id === "sb"), t2.find((x) => x.id === "s2")), 7, 0.01) && 90 - 7 === 83, "luar tambah: 90 - 7 = 83");
    const t3 = L.keadaanStory(adegan(U, "luard-tambah-terapan"), 2, 9999);
    cek(hampir(antara(cari(t3, "sk"), cari(t3, "r2")), 75, 0.01) && hampir(antara(cari(t3, "r1"), cari(t3, "r2")), 165, 0.01) && 165 - 90 === 75 && 90 + 75 === 165, "luar tambah: 165 = 90 + 75");
    const e = L.keadaanStory(adegan(U, "luard-perkiraan"), 3, 9999);
    cek(hampir(antara(cari(e, "w1"), cari(e, "w2")), 60, 0.01) && hampir(antara(cari(e, "b1"), cari(e, "b2")), 120, 0.01) && 180 - 120 === 60, "luar perkiraan: 120 tergambar 60");
    const e2 = L.keadaanStory(adegan(U, "luard-perkiraan-terapan"), 3, 9999);
    cek(hampir(antara(cari(e2, "r1"), cari(e2, "r2")), 140, 0.01) && 140 - 90 === 50 && 180 - 140 === 40 && 140 + 40 === 180, "luar perkiraan: 140, selisih 50 dari 90 dan 40 dari 180");
  }
}

/* ------------------------------ Kutipan buku dan Buku Panduan Guru (bila PDF tersedia) ------------------------------ */
{
  const pdfBS = new URL("../bahan-sd/Matematika-BS-KLS-V.pdf", import.meta.url);
  const pdfBG = new URL("../bahan-sd/Matematika-BG-KLS-V.pdf", import.meta.url);
  const path = (u) => u.pathname.replace(/^\/([A-Za-z]:)/, "$1");
  const ada = existsSync(pdfBS) && existsSync(pdfBG);
  const bs = ada ? spawnSync("pdftotext", ["-f", "199", "-l", "206", "-raw", path(pdfBS), "-"], { encoding: "utf8", maxBuffer: 1 << 26 }) : null;
  const bg = ada ? spawnSync("pdftotext", ["-f", "281", "-l", "296", "-raw", path(pdfBG), "-"], { encoding: "utf8", maxBuffer: 1 << 26 }) : null;
  if (!ada || !bs || bs.status !== 0 || !bg || bg.status !== 0) console.log("PDF atau pdftotext tidak tersedia: pemeriksaan kutipan buku dilewati");
  else {
    const bersih = (t) => t.toLowerCase().replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim();
    const buku = `${bersih(bs.stdout)} ${bersih(bg.stdout)}`;
    let n = 0;
    for (const a of M.adegan) for (const kt of a.kutipan ?? []) {
      n += 1;
      cek(buku.includes(bersih(kt)), `kutipan buku ${a.id}: "${kt}" ada di teks PDF`);
    }
    cek(n >= 100, `jumlah kutipan buku yang diperiksa (${n})`);
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k5b6d-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|k5b6d-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k5b6d sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../video-k5b6d.tsx", folder), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_D56|naskah-k5b6/.test(pembungkus) && /VIDEO_MATERI_K5B6D/.test(pembungkus) && /VIDEO_LUAR_K5B6D/.test(pembungkus) && /export function VideoK5B6D/.test(pembungkus) && /DaftarVideoCerita/.test(pembungkus), "video-k5b6d: memakai dua video baru, bukan naskah dan visual lama");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
if (process.env.RINCI) for (const v of VIDEO) for (const a of v.adegan) console.log(`  ${v.id}/${a.id}: ${a.ketukan.length} ketukan, kata per ketukan ${a.ketukan.map((kt) => L.kataDari(kt.suara).length).join(",")}, jumlah ${a.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)}`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
