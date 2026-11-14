// Uji Story Kelas 5 Bab 6 Sub-Bab B (pengertian sudut): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// pemisahan materi dan metode luar, kutipan buku dan Buku Panduan Guru (bila PDF ada), geometri gambar dihitung mandiri
// (sudut dari kaki dan daerah, jam analog, kunci Ayo Berlatih, hitungan jenis sudut), emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k5b6b.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k5b6b-video.ts");
const G = await import("../src/components/modul/story/k5b6b-gambar.ts");

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
const VIDEO = [V.VIDEO_MATERI_K5B6B, V.VIDEO_LUAR_K5B6B];
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
const M = V.VIDEO_MATERI_K5B6B;
const U = V.VIDEO_LUAR_K5B6B;
const adegan = (v, id) => v.adegan.find((x) => x.id === id);
const akhir = (a, i = a.ketukan.length - 1) => L.keadaanStory(a, i, 9999);
const oleh = (objs, id) => objs.find((o) => o.id === id);
const isi = (objs, id) => oleh(objs, id)?.isi;
{
  const NAMA_METODE = /Vertex-Ray|Ray Model|Acute|Obtuse|Classification|Angle as Rotation|Orientation|Invariance|metode luar|metode dari luar/i;
  const BOCOR_SUBBAB_LAIN = /derajat|busur|mengukur|melukis|sudut lurus|sudut refleks|sudut nol|tata kota|rasi bintang|Uji Kompetensi|Pengayaan/i;
  const materi = teksVideo(M);
  const luar = teksVideo(U);
  cek(!NAMA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of ["Vertex-Ray Model", "Acute-Right-Obtuse Classification", "Angle as Rotation", "Orientation Invariance Test"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(!BOCOR_SUBBAB_LAIN.test(materi), "video materi tidak membocorkan Sub-Bab C dan D (derajat, busur, mengukur, melukis, sudut lurus, refleks, Uji Kompetensi, pengayaan)");
  cek(!BOCOR_SUBBAB_LAIN.test(luar), "video metode luar tidak membocorkan Sub-Bab C dan D");
  cek(M.adegan.every((a) => /Buku (Siswa|Panduan Guru)/.test(a.sumber) && /hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(U.adegan.every((a) => /metode (dari )?luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  for (const kata of ["Sub-Bab B", "Eksplorasi 6\\.2", "Ayo Berlatih", "Refleksi", "Panduan Guru", "kotak pensil", "Yohana", "titik sudut", "kaki sudut", "lancip", "tumpul", "siku-siku", "miskonsepsi|salah kaprah", "diferensiasi", "Tabel 6\\.3", "soal satu", "soal dua", "pukul sepuluh tiga puluh", "gunting", "kipas", "jendela", "tangga", "persimpangan", "jam analog", "fasilitator", "mendatar"]) cek(new RegExp(kata, "i").test(materi), `video materi memuat ${kata}`);
  const ids = U.adegan.map((a) => a.id);
  cek(["luarb-vrm", "luarb-vrm-terapan", "luarb-aro", "luarb-aro-terapan", "luarb-rot", "luarb-rot-terapan", "luarb-ori", "luarb-ori-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(M.adegan.length === 11 && U.adegan.length === 10, "11 adegan materi dan 10 adegan metode luar");
  cek(totalKetukan >= 80, `total ketukan cukup dalam (${totalKetukan})`);
  cek(diperiksa >= 4, `hubungan bilangan di gambar yang diperiksa mandiri (${diperiksa})`);
}

/* ------------------------------ Geometri gambar, dihitung mandiri dari kaki sudut dan jarum jam ------------------------------ */
const derajat = (r) => (r * 180) / Math.PI;
const arahGaris = (o) => derajat(Math.atan2(-(o.y2 ?? 0), o.x2 ?? 0)); // arah berlawanan jarum jam dari kanan
const mod360 = (x) => ((x % 360) + 360) % 360;
const besarCCW = (a, b) => mod360(arahGaris(b) - arahGaris(a));
const dekat = (a, b, e = 0.2) => Math.abs(a - b) <= e;
const dekatSudut = (a, b, e = 0.3) => Math.min(mod360(a - b), mod360(b - a)) <= e;
const jenisDari = (besar) => (dekat(besar, 90, 0.001) ? "siku-siku" : besar < 90 ? "lancip" : "tumpul");
// pembanding dari buku (Buku Panduan Guru hlm. 261, kunci Soal 1)
const KUNCI_SOAL1 = { a: "tumpul", b: "lancip", c: "tumpul", d: "lancip", e: "tumpul", f: "siku-siku" };
const bacaSektor = (o) => {
  const m = /L(-?[\d.]+) (-?[\d.]+) A([\d.]+) [\d.]+ 0 (\d) 0 (-?[\d.]+) (-?[\d.]+) Z/.exec(o?.d ?? "");
  if (!m) return null;
  const x1 = Number(m[1]);
  const y1 = Number(m[2]);
  const x2 = Number(m[5]);
  const y2 = Number(m[6]);
  return { a1: derajat(Math.atan2(-y1, x1)), a2: derajat(Math.atan2(-y2, x2)), besar: Number(m[4]) === 1, r: Number(m[3]) };
};

/** Setiap sudut (daerah -d, kaki -a, kaki -b): daerah berhimpit dengan kedua kaki dan kaki sama panjang. Mengembalikan jumlah sudut diperiksa. */
function periksaSudut(objs, nama) {
  let n = 0;
  for (const d of objs.filter((o) => o.id.endsWith("-d") && o.t === "jalur" && /^M0 0 L/.test(o.d ?? ""))) {
    const p = d.id.slice(0, -2);
    const a = oleh(objs, `${p}-a`);
    const b = oleh(objs, `${p}-b`);
    if (!a || !b || a.t !== "garis" || b.t !== "garis") continue;
    const s = bacaSektor(d);
    n += 1;
    cek(s !== null, `${nama}: daerah sudut ${p} terbaca`);
    if (!s) continue;
    const besar = besarCCW(a, b);
    cek(dekatSudut(s.a1, arahGaris(a)) && dekatSudut(s.a2, arahGaris(b)), `${nama}: daerah ${p} berhimpit dengan kedua kakinya`);
    cek(s.besar === besar > 180, `${nama}: tanda busur besar ${p} sesuai`);
    cek(dekat(Math.hypot(a.x2, a.y2), Math.hypot(b.x2, b.y2), 0.01), `${nama}: kaki ${p} sama panjang`);
    cek(besar > 0.5 && besar < 180, `${nama}: sudut ${p} antara 0 dan 180 (${besar.toFixed(1)})`);
  }
  return n;
}
const besarDari = (objs, p) => besarCCW(oleh(objs, `${p}-a`), oleh(objs, `${p}-b`));

/** Jam analog: jarum pendek dan panjang sesuai pukul, daerah sudut = sudut terkecil di antara jarum. Mengembalikan jenis dan besar. */
function periksaJam(objs, id, waktu, nama) {
  const m = /(\d\d)\.(\d\d)/.exec(waktu ?? "");
  cek(m !== null, `${nama}: tulisan pukul jam ${id} terbaca (${waktu})`);
  if (!m) return null;
  const j = Number(m[1]);
  const mn = Number(m[2]);
  const pend = oleh(objs, `${id}-p`);
  const pang = oleh(objs, `${id}-m`);
  const dari12 = (o) => mod360(derajat(Math.atan2(o.x2, -o.y2)));
  const sJam = mod360((j % 12) * 30 + mn * 0.5);
  const sMenit = mod360(mn * 6);
  cek(dekatSudut(dari12(pend), sJam) && dekatSudut(dari12(pang), sMenit), `${nama}: jarum jam ${id} menunjuk pukul ${waktu}`);
  cek(Math.hypot(pend.x2, pend.y2) < Math.hypot(pang.x2, pang.y2), `${nama}: jarum pendek lebih pendek dari jarum panjang (${id})`);
  const sel = mod360(sMenit - sJam);
  const theta = Math.min(sel, 360 - sel);
  const s = bacaSektor(oleh(objs, `${id}-d`));
  cek(s !== null && dekat(mod360(s.a2 - s.a1), theta, 0.3) && !s.besar, `${nama}: daerah jam ${id} sebesar sudut terkecil ${theta} di antara jarum`);
  if (s) {
    const dae = [mod360(s.a1), mod360(s.a2)].sort((p, q) => p - q);
    const jar = [mod360(90 - sJam), mod360(90 - sMenit)].sort((p, q) => p - q);
    cek((dekatSudut(dae[0], jar[0]) && dekatSudut(dae[1], jar[1])) || (dekatSudut(dae[0], jar[1]) && dekatSudut(dae[1], jar[0])), `${nama}: daerah jam ${id} dibatasi kedua jarum`);
  }
  return { jenis: jenisDari(theta), besar: theta, sJam };
}

{
  // semua sudut dan jam di semua keadaan akhir ketukan
  let nSudut = 0;
  let nJam = 0;
  for (const v of VIDEO) for (const a of v.adegan) {
    a.ketukan.forEach((_, i) => {
      const o = akhir(a, i);
      nSudut += periksaSudut(o, `${v.id}/${a.id}#${i + 1}`);
      for (const w of o.filter((x) => x.id.endsWith("-w") && x.t === "bulat")) {
        const p = w.id.slice(0, -2);
        if (oleh(o, `${p}-p`) && oleh(o, `${p}-d`)) nJam += 1;
      }
    });
  }
  cek(nSudut >= 60, `sudut gambar yang diperiksa kaki dan daerahnya (${nSudut})`);
  cek(nJam >= 10, `jam gambar ditemukan (${nJam})`);

  // data bersama gambar: kunci buku dibandingkan dengan hitungan mandiri dari gambar
  const jamA = G.SOAL1[0];
  cek(dekat(jamA.besar, 120) && jenisDari(jamA.besar) === "tumpul", "jam pukul 08.00: sudut terkecil 120 (240 searah jarum jam), tumpul");
  sama(G.SOAL1.map((s) => jenisDari(s.besar)), Object.values(KUNCI_SOAL1), "jenis enam benda Soal 1 sama dengan kunci Buku Panduan Guru hlm. 261");
  sama(G.SOAL1.map((s) => s.h), ["a", "b", "c", "d", "e", "f"], "enam benda a sampai f");

  // jenis sudut: kuncinya perbandingan dengan siku-siku
  cek(G.jenisDari(89.99) === "lancip" && G.jenisDari(90) === "siku-siku" && G.jenisDari(90.01) === "tumpul" && G.jenisDari(120) === "tumpul", "jenisDari: kurang dari 90 lancip, tepat 90 siku-siku, lebih dari 90 tumpul");
  for (const [j, m] of [[2, 0], [3, 0], [8, 0], [10, 30], [1, 0], [11, 0], [4, 0]]) {
    const t = G.sudutJam(j, m).theta;
    const sJam = (j % 12) * 30 + m * 0.5;
    const sel = Math.abs(m * 6 - sJam);
    cek(dekat(t, Math.min(sel, 360 - sel), 1e-9), `sudutJam(${j}, ${m}) sama dengan hitungan mandiri`);
  }
  cek(300 < G.sudutJam(10, 30).a && G.sudutJam(10, 30).a < 330, "pukul 10.30: jarum pendek di tengah angka 10 dan 11");

  // pembuka B: tanda siku-siku hanya pada sudut 90
  {
    const a = adegan(M, "pembuka-b");
    const o = akhir(a, 4);
    [["s1", "c1"], ["s2", "c2"], ["s3", "c3"]].forEach(([p, c]) => cek(isi(o, c) === (jenisDari(besarDari(o, p)) === "siku-siku" ? "✓" : "✗"), `pembuka: tanda ${c} sesuai sudut ${p} (${besarDari(o, p).toFixed(0)})`));
  }
  // pengertian: satu titik sudut dan dua kaki
  {
    const a = adegan(M, "pengertian");
    const o = akhir(a, 3);
    cek(besarDari(o, "ps") > 0 && besarDari(o, "ps") < 90, "pengertian: sudut contoh lancip");
    cek(dekat(oleh(o, "ps-t").x, oleh(o, "ps-a").x) && dekat(oleh(o, "ps-t").y, oleh(o, "ps-b").y) && dekat(oleh(o, "ps-a").x, oleh(o, "ps-b").x) && dekat(oleh(o, "ps-a").y, oleh(o, "ps-b").y), "pengertian: titik sudut berimpit dengan pangkal kedua kaki");
  }
  // Eksplorasi 6.2: tiga kolom
  {
    const a = adegan(M, "eksplorasi-62");
    const o = akhir(a, 2);
    const harap = ["lebih sempit", "sama", "lebih lebar"];
    [0, 1, 2].forEach((i) => {
      const b = besarDari(o, `p${i}`);
      const w = b < 90 ? "lebih sempit" : dekat(b, 90, 0.001) ? "sama" : "lebih lebar";
      cek(isi(o, `pl${i}`) === w && w === harap[i], `eksplorasi: sudut p${i} (${b.toFixed(0)}) dibandingkan dengan lipatan = ${w}`);
    });
    const k4 = akhir(a, 3);
    ["kt0", "kt1", "kt2"].forEach((p, i) => {
      const b = besarDari(k4, p);
      const w = b < 90 ? "lebih sempit" : dekat(b, 90, 0.001) ? "sama" : "lebih lebar";
      cek(isi(k4, `kl${i}`) === w, `eksplorasi: kolom ${i} berisi sudut yang ${w}`);
    });
  }
  // lancip dan tumpul
  {
    const a = adegan(M, "lancip-tumpul");
    cek(jenisDari(besarDari(akhir(a, 0), "lc")) === "lancip" && jenisDari(besarDari(akhir(a, 1), "tp")) === "tumpul" && dekat(besarDari(akhir(a, 2), "sk"), 90, 0.001), "lancip, tumpul, dan siku-siku: sudut gambar sesuai namanya");
    const o = akhir(a, 3);
    ["lancip", "siku-siku", "tumpul"].forEach((nm, i) => cek(isi(o, `j${i}t`) === nm && jenisDari(besarDari(o, `j${i}`)) === nm, `tiga jenis: sudut j${i} bernama ${nm}`));
  }
  // salah kaprah: sudut sama pada empat posisi
  {
    const a = adegan(M, "salah-kaprah");
    const o = akhir(a, 2);
    const b = [0, 1, 2, 3].map((i) => besarDari(o, `m${i}`));
    cek(b.every((x) => dekat(x, b[0], 0.01)), "salah kaprah: empat sudut sama besar");
    const arah = [0, 1, 2, 3].map((i) => mod360(arahGaris(oleh(o, `m${i}-a`))).toFixed(0));
    cek(new Set(arah).size === 4, "salah kaprah: empat posisi berbeda");
    const k1 = akhir(a, 0);
    sama([0, 1, 2].map((i) => jenisDari(besarDari(k1, `rs${i}`))), ["lancip", "siku-siku", "tumpul"], "salah kaprah: tiga sudut contoh terkelompok benar");
  }
  // Soal 1 bagian a sampai c
  {
    const a = adegan(M, "soal1-abc");
    const o0 = akhir(a, 0);
    const ja = periksaJam(o0, "ja", isi(o0, "hp"), "soal1-abc");
    cek(ja?.jenis === KUNCI_SOAL1.a && dekat(ja.besar, 120), "soal1 a: jam pukul 08.00 tumpul menurut hitungan jarum");
    cek(isi(akhir(a, 1), "ra-t") === KUNCI_SOAL1.a, "soal1 a: baris jawaban di gambar sama dengan kunci");
    cek(jenisDari(besarDari(akhir(a, 2), "sb")) === KUNCI_SOAL1.b && isi(akhir(a, 2), "rb-t") === KUNCI_SOAL1.b, "soal1 b: sudut gambar dan jawaban lancip");
    cek(jenisDari(besarDari(akhir(a, 3), "sc")) === KUNCI_SOAL1.c && isi(akhir(a, 3), "rc-t") === KUNCI_SOAL1.c, "soal1 c: sudut gambar dan jawaban tumpul");
    const o4 = akhir(a, 4);
    sama(["sa-t", "sb-t", "sc-t"].map((id) => isi(o4, id)), [KUNCI_SOAL1.a, KUNCI_SOAL1.b, KUNCI_SOAL1.c], "soal1: kunci sementara a, b, c");
  }
  // Soal 1 bagian d sampai f, kunci, dan hitungan
  {
    const a = adegan(M, "soal1-def");
    cek(jenisDari(besarDari(akhir(a, 0), "sd")) === KUNCI_SOAL1.d && isi(akhir(a, 0), "rd-t") === KUNCI_SOAL1.d, "soal1 d: gunting lancip");
    cek(jenisDari(besarDari(akhir(a, 1), "se")) === KUNCI_SOAL1.e && isi(akhir(a, 1), "re-t") === KUNCI_SOAL1.e, "soal1 e: kipas tumpul");
    cek(jenisDari(besarDari(akhir(a, 2), "sf")) === KUNCI_SOAL1.f && isi(akhir(a, 2), "rf-t") === KUNCI_SOAL1.f, "soal1 f: jendela siku-siku");
    const kj = akhir(a, 3);
    sama(["a", "b", "c", "d", "e", "f"].map((h) => isi(kj, `kj${h}-t`)), Object.values(KUNCI_SOAL1), "kunci lengkap soal 1 di gambar sama dengan Buku Panduan Guru");
    const hit = { tumpul: 0, lancip: 0, "siku-siku": 0 };
    for (const v of Object.values(KUNCI_SOAL1)) hit[v] += 1;
    const o = akhir(a, 4);
    sama([isi(o, "h3-t0"), isi(o, "h2-t0"), isi(o, "h1-t0")], [String(hit.tumpul), String(hit.lancip), String(hit["siku-siku"])], "hitungan jenis: 3 tumpul, 2 lancip, 1 siku-siku");
    cek(hit.tumpul + hit.lancip + hit["siku-siku"] === 6 && 3 + 2 === 5 && 5 + 1 === 6, "hitungan jenis berjumlah enam benda");
  }
  // Soal 2: jam analog
  {
    const a = adegan(M, "soal2");
    const bk = periksaJam(akhir(a, 1), "cj", isi(akhir(a, 1), "cjt"), "soal2");
    cek(bk?.jenis === "lancip" && isi(akhir(a, 1), "cb-t0") === "pukul 02.00" && isi(akhir(a, 1), "cb-t1") === "sudut lancip", "soal2: contoh buku pukul 02.00 lancip");
    for (const [ket, ids] of [[2, ["j1", "j2"]], [3, ["j3", "j4"]], [5, ["z1", "z2", "z3", "z4"]]]) {
      const o = akhir(a, ket);
      for (const id of ids) {
        const r = periksaJam(o, id, isi(o, `${id}-wkt`), `soal2#${ket + 1}`);
        cek(r?.jenis === isi(o, `${id}-jns`), `soal2: ${id} pukul ${isi(o, `${id}-wkt`)} berlabel ${isi(o, `${id}-jns`)} dan hitungan ${r?.jenis}`);
      }
    }
    const o5 = akhir(a, 5);
    const lab = ["z1", "z2", "z3", "z4"].map((id) => isi(o5, `${id}-jns`));
    sama(lab, ["lancip", "lancip", "tumpul", "tumpul"], "soal2: dua lancip dan dua tumpul, sesuai perintah soal");
    cek(!["z1", "z2", "z3", "z4"].some((id) => isi(o5, `${id}-wkt`) === "02.00"), "soal2: jawaban berbeda dengan contoh pukul 02.00");
    const o4 = akhir(a, 4);
    const pm = periksaJam(o4, "pm", isi(o4, "pmt"), "soal2#5");
    cek(pm?.jenis === "tumpul" && 300 < pm.sJam && pm.sJam < 330, "soal2: pukul 10.30 tumpul, jarum pendek di antara angka 10 dan 11");
  }
  // Refleksi: tiga jenis berlabel benar
  {
    const a = adegan(M, "refleksi");
    const o = akhir(a, 2);
    ["lancip", "siku-siku", "tumpul"].forEach((nm, i) => cek(isi(o, `n3${i}t`) === nm && jenisDari(besarDari(o, `n3${i}`)) === nm, `refleksi: sudut n3${i} bernama ${nm}`));
  }

  // ------------------------------ metode luar ------------------------------
  {
    const a = adegan(U, "luarb-vrm-terapan");
    const o = akhir(a);
    const harap = [false, true, true, true];
    harap.forEach((sudutKah, i) => {
      const ya = [0, 1, 2].filter((j) => isi(o, `v${i}c${j}`) === "✓").length;
      cek((ya === 3) === sudutKah, `Vertex-Ray: benda ${i + 1} lolos ${ya} dari 3 pertanyaan, sudut = ${sudutKah}`);
      cek(isi(o, `v${i}j`) === `${ya} dari 3`, `Vertex-Ray: jumlah centang benda ${i + 1}`);
    });
    cek(isi(o, "v0-l") === "pojok kotak pensil", "Vertex-Ray: baris pertama kotak pensil (Yohana: bukan sudut)");
  }
  {
    const a = adegan(U, "luarb-aro-terapan");
    const o = akhir(a);
    const kol = { lancip: 8, "siku-siku": 104, tumpul: 200 };
    G.SOAL1.forEach((s) => cek(oleh(o, `ch${s.h}-k`)?.x === kol[jenisDari(s.besar)], `Acute-Right-Obtuse: benda ${s.h} (${jenisDari(s.besar)}) di kolom yang benar`));
    cek(["3 + 2 = 5", "5 + 1 = 6"].every((t) => L.teksTerlihat(o).includes(t)), "Acute-Right-Obtuse: hitungan 3 + 2 + 1 = 6 di gambar");
    cek(G.SOAL1.filter((s) => jenisDari(s.besar) === "tumpul").length === 3 && G.SOAL1.filter((s) => jenisDari(s.besar) === "lancip").length === 2, "Acute-Right-Obtuse: 3 tumpul dan 2 lancip");
  }
  {
    const a = adegan(U, "luarb-rot");
    const o1 = akhir(a, 1);
    cek(dekat(besarDari(o1, "rt"), 40, 0.01) && isi(o1, "rtl") === "putaran kecil: lancip", "Angle as Rotation: putaran kecil 40 lancip");
    const suara = a.ketukan[2].suara;
    const sikuNya = L.keadaanStory(a, 2, L.posisiKata(suara, "siku-siku."));
    cek(dekat(besarDari(sikuNya, "rt"), 90, 0.01) && oleh(sikuNya, "rts") !== undefined, "Angle as Rotation: tepat seperti pojok kertas, siku-siku, bertanda siku");
    const o2 = akhir(a, 2);
    cek(dekat(besarDari(o2, "rt"), 135, 0.01) && jenisDari(besarDari(o2, "rt")) === "tumpul" && isi(o2, "rtl") === "lebih jauh: tumpul", "Angle as Rotation: putaran lebih jauh 135 tumpul");
    const o3 = akhir(a, 3);
    sama(["g0", "g1", "g2"].map((p) => jenisDari(besarDari(o3, p))), ["lancip", "siku-siku", "tumpul"], "Angle as Rotation: gunting tiga tahap");
    const b3 = ["g0", "g1", "g2"].map((p) => besarDari(o3, p));
    cek(b3[0] < b3[1] && b3[1] < b3[2], "Angle as Rotation: makin lama dibuka makin lebar");
    sama(["g0t", "g1t", "g2t"].map((id) => isi(o3, id)), ["lancip", "siku-siku", "tumpul"], "Angle as Rotation: label tiga tahap");
  }
  {
    const a = adegan(U, "luarb-rot-terapan");
    const besar = [];
    ["r1", "r2", "r3", "r4"].forEach((id, i) => {
      const o = akhir(a, i);
      const r = periksaJam(o, id, isi(o, `${id}n-t0`), `rot-terapan#${i + 1}`);
      besar.push(r.besar);
      cek(r.jenis === isi(o, `${id}n-t1`), `Angle as Rotation: jam ${id} berlabel ${isi(o, `${id}n-t1`)} dan hitungan ${r.jenis}`);
      cek(dekatSudut(derajat(Math.atan2(oleh(o, `${id}-m`).x2, -oleh(o, `${id}-m`).y2)), 0), `Angle as Rotation: jarum panjang ${id} tetap di angka 12`);
    });
    sama(besar.map(Math.round), [30, 60, 90, 120], "Angle as Rotation: jarum pendek berputar 30, 60, 90, 120");
    cek(besar.every((b, i) => i === 0 || b > besar[i - 1]), "Angle as Rotation: sudut makin lebar tiap pukul");
    const o = akhir(a, 4);
    ["u1", "u2", "u3", "u4"].forEach((id) => {
      const r = periksaJam(o, id, isi(o, `${id}-wkt`), "rot-terapan#5");
      cek(r.jenis === isi(o, `${id}-jns`), `Angle as Rotation: ringkasan jam ${id} berlabel ${isi(o, `${id}-jns`)}`);
    });
  }
  {
    const a = adegan(U, "luarb-ori");
    const o1 = akhir(a, 0);
    cek(dekat(besarDari(o1, "o1"), besarDari(o1, "o2"), 0.01) && !dekatSudut(arahGaris(oleh(o1, "o1-a")), arahGaris(oleh(o1, "o2-a")), 5), "Orientation Invariance: dua posisi, besar sama, arah berbeda");
    const o2 = akhir(a, 1);
    const b = [0, 1, 2, 3].map((i) => besarDari(o2, `c${i}`));
    cek(b.every((x) => dekat(x, b[0], 0.01)) && jenisDari(b[0]) === "tumpul", "Orientation Invariance: empat posisi, semua tumpul");
  }
  {
    const a = adegan(U, "luarb-ori-terapan");
    const awalan = ["wa", "wb", "wc"];
    const harap = ["siku-siku", "tumpul", "lancip"];
    const sumberBesar = [G.SOAL1[5].besar, G.SOAL1[2].besar, G.SOAL1[3].besar];
    awalan.forEach((p, n) => {
      const o = akhir(a, n);
      const b = [0, 1, 2, 3].map((i) => besarDari(o, `${p}${i}`));
      cek(b.every((x) => dekat(x, sumberBesar[n], 0.01)), `Orientation Invariance: ${p} empat posisi sama besar dengan benda soal 1`);
      cek(b.every((x) => jenisDari(x) === harap[n]) && isi(o, "wt") === `tetap ${harap[n]}`, `Orientation Invariance: ${p} tetap ${harap[n]}`);
      cek(new Set([0, 1, 2, 3].map((i) => mod360(arahGaris(oleh(o, `${p}${i}-a`))).toFixed(0))).size === 4, `Orientation Invariance: ${p} empat posisi berbeda`);
    });
  }
}

/* ------------------------------ Kutipan buku dan Buku Panduan Guru (bila PDF tersedia) ------------------------------ */
{
  const pdfBS = new URL("../bahan-sd/Matematika-BS-KLS-V.pdf", import.meta.url);
  const pdfBG = new URL("../bahan-sd/Matematika-BG-KLS-V.pdf", import.meta.url);
  const path = (u) => u.pathname.replace(/^\/([A-Za-z]:)/, "$1");
  const ada = existsSync(pdfBS) && existsSync(pdfBG);
  const ambil = (pdf, dari, sampai) => (ada ? spawnSync("pdftotext", ["-f", String(dari), "-l", String(sampai), "-raw", path(pdf), "-"], { encoding: "utf8", maxBuffer: 1 << 26 }) : null);
  // Buku Siswa hlm. 170-174 = PDF 186-190 dan Refleksi hlm. 187 = PDF 203; Panduan Guru hlm. 257-262 = PDF 269-274
  const bagian = [ambil(pdfBS, 186, 190), ambil(pdfBS, 203, 203), ambil(pdfBG, 269, 274)];
  if (!ada || bagian.some((b) => !b || b.status !== 0)) console.log("PDF atau pdftotext tidak tersedia: pemeriksaan kutipan buku dilewati");
  else {
    const bersihTeks = (t) => t.toLowerCase().replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim();
    const buku = bagian.map((b) => bersihTeks(b.stdout)).join(" ");
    let n = 0;
    for (const a of M.adegan) for (const kt of a.kutipan ?? []) {
      n += 1;
      cek(buku.includes(bersihTeks(kt)), `kutipan buku ${a.id}: "${kt}" ada di teks PDF`);
    }
    cek(n >= 70, `jumlah kutipan buku yang diperiksa (${n})`);
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k5b6b-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|k5b6b-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k5b6b sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../video-k5b6b.tsx", folder), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_B56|naskah-k5b6/.test(pembungkus) && /VIDEO_MATERI_K5B6B/.test(pembungkus) && /VIDEO_LUAR_K5B6B/.test(pembungkus) && /export function VideoK5B6B/.test(pembungkus) && /DaftarVideoCerita/.test(pembungkus), "video-k5b6b: memakai dua video baru, bukan naskah dan visual lama");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
if (process.env.RINCI) for (const v of VIDEO) for (const a of v.adegan) console.log(`  ${v.id}/${a.id}: ${a.ketukan.length} ketukan, kata per ketukan ${a.ketukan.map((kt) => L.kataDari(kt.suara).length).join(",")}, jumlah ${a.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)}`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
