// Uji Story Kelas 5 Bab 4 Sub-Bab D (keliling segi banyak): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// pemisahan materi dan metode luar, tidak membocorkan Sub-Bab E, kutipan buku dan Buku Panduan Guru terhadap teks PDF,
// hitungan mandiri dan geometri gambar (segi-n beraturan bersisi sama, tanda sisi, nomor sisi, tabel banyak sisi dan keliling,
// diagram batang, jumlah sisi berbeda), emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k5b4d.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k5b4d-video.ts");
const G = await import("../src/components/modul/story/k5b4d-gambar.ts");

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

/** Periksa semua hubungan bilangan di teks gambar: jumlah berantai, kali, bagi, selisih, dan rantai pembanding. Mengembalikan jumlah yang diperiksa. */
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
  pola(/(\d+(?: ?\+ ?\d+)+) = (\d+)/g, (m) => cek(m[1].split("+").reduce((a, b) => a + angka(b), 0) === angka(m[2]), `${nama}: jumlah di gambar "${m[0]}" benar`));
  pola(/(\d[\d.]*) x (\d[\d.]*) = (\d[\d.]*)/g, (m) => cek(angka(m[1]) * angka(m[2]) === angka(m[3]), `${nama}: hasil kali di gambar "${m[0]}" benar`));
  pola(/(\d[\d.]*) : (\d[\d.]*) = (\d[\d.]*)/g, (m) => cek(angka(m[1]) === angka(m[2]) * angka(m[3]), `${nama}: hasil bagi di gambar "${m[0]}" benar`));
  pola(/(\d[\d.]*) - (\d[\d.]*) = (\d[\d.]*)/g, (m) => cek(angka(m[1]) - angka(m[2]) === angka(m[3]), `${nama}: selisih di gambar "${m[0]}" benar`));
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
const VIDEO = [V.VIDEO_MATERI_K5B4D, V.VIDEO_LUAR_K5B4D];
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
        else if (o.t === "jalur") {
          const t = G.titikDariLintasan(o.d ?? "");
          cek(t.length > 0 && t.every(([px, py]) => x + px > -2 && x + px < 302 && y + py > -2 && y + py < 205), `${nama}#${i + 1}: jalur ${o.id} masuk kanvas`);
        } else if (o.t === "garis" || o.t === "panah") cek(x + (o.x2 ?? 0) > -2 && x + (o.x2 ?? 0) < 302 && y + (o.y2 ?? 0) > -2 && y + (o.y2 ?? 0) < 205 && x > -2 && x < 302 && y > -2 && y < 205, `${nama}#${i + 1}: ${o.t} ${o.id} masuk kanvas`);
      }
    });
  }
}

/* ------------------------------ Pemisahan materi dan metode luar ------------------------------ */
const teksVideo = (v) => JSON.stringify(v.adegan.map((a) => [a.judul, a.sumber, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]));
const M = V.VIDEO_MATERI_K5B4D;
const U = V.VIDEO_LUAR_K5B4D;
const adegan = (v, id) => v.adegan.find((x) => x.id === id);
const keadaan = (v, id, i) => L.keadaanStory(adegan(v, id), i, 9999);
const cari = (objs, id) => objs.find((o) => o.id === id);
{
  const NAMA_METODE = /Regular n-gon|Irregular Side Sum|Table Pattern|Inverse Perimeter|metode luar|metode dari luar/i;
  const materi = teksVideo(M);
  const luar = teksVideo(U);
  cek(!NAMA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of ["Regular n-gon", "Irregular Side Sum", "Table Pattern", "Inverse Perimeter Division"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(!/Refleksi|Uji Kompetensi|Panduan Guru|miskonsepsi|remedial|pengayaan|Ayo Merangkum di buku/i.test(luar.replace(/Mirip Ayo Merangkum di buku/g, "")), "video metode luar tidak memuat isi materi kurikulum");
  cek(M.adegan.every((a) => /Buku (Siswa|Panduan Guru)/.test(a.sumber) && /hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(U.adegan.every((a) => /metode (dari )?luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  for (const kata of ["Sub-Bab D", "Eksplorasi 4.4", "penemuan terbimbing", "penggaris", "proyektor", "segi lima beraturan", "segi enam beraturan", "segi delapan beraturan", "Ayo Merangkum", "jumlahkan|menjumlahkan", "Refleksi", "13", "14", "15", "122", "123", "124", "pengali", "persegi", "belah ketupat", "tanya jawab", "catatan guru", "hitungan tambahan|contoh tambahan"]) cek(new RegExp(kata, "i").test(materi), `video materi memuat ${kata}`);
  // tidak membocorkan Sub-Bab E (bangun gabungan) dan tidak keluar dari Sub-Bab D
  cek(!/gabungan|denah|dekomposisi|Eksplorasi 4\.5|Sub-Bab E|Uji Kompetensi|Bab 5/i.test(materi + luar), "tidak membocorkan Sub-Bab E atau bab lain");
  const ids = U.adegan.map((a) => a.id);
  cek(["luar4d-ngon", "luar4d-ngon-terapan", "luar4d-jumlah", "luar4d-jumlah-terapan", "luar4d-tabel", "luar4d-tabel-terapan", "luar4d-balik", "luar4d-balik-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(M.adegan.length === 11 && U.adegan.length === 10, "11 adegan materi dan 10 adegan metode luar");
  cek(totalKetukan >= 90, `total ketukan cukup dalam (${totalKetukan})`);
  cek(diperiksa >= 40, `hubungan bilangan di gambar yang diperiksa mandiri (${diperiksa})`);
}

/* ------------------------------ Hitungan dan geometri, dihitung mandiri dari benda dan data ------------------------------ */
const semuaState = [];
for (const v of VIDEO) for (const a of v.adegan) a.ketukan.forEach((_, i) => semuaState.push([`${v.id}/${a.id}#${i + 1}`, L.keadaanStory(a, i, 9999)]));
const hampir = (a, b, t = 0.35) => Math.abs(a - b) < t;

{
  // 1) Pembangkit segi-n beraturan: n titik, sama jauh dari pusat, semua sisi sama panjang, sudut sama
  for (const [n, R] of [[5, 40], [6, 44], [8, 28], [10, 44], [5, 54]]) {
    const t = G.titikBeraturan(n, R);
    cek(t.length === n, `segi-${n}: ${n} titik sudut`);
    cek(t.every(([x, y]) => hampir(Math.hypot(x, y), R, 0.05)), `segi-${n}: semua sudut sejauh jari-jari ${R}`);
    const sisi = t.map(([x, y], i) => Math.hypot(t[(i + 1) % n][0] - x, t[(i + 1) % n][1] - y));
    cek(sisi.every((s) => hampir(s, sisi[0], 0.1)), `segi-${n}: semua sisi sama panjang (${sisi.map((s) => s.toFixed(2)).join(",")})`);
    cek(hampir(sisi[0], G.sisiBeraturan(n, R), 0.1), `segi-${n}: panjang sisi sesuai rumus 2R sin(pi/n)`);
    const sudut = t.map(([x, y]) => Math.atan2(y, x));
    const beda = sudut.map((s, i) => (((sudut[(i + 1) % n] - s) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI));
    cek(beda.every((d) => hampir(d, (2 * Math.PI) / n, 0.02)), `segi-${n}: sudut pusat antarsudut sama (${((360 / n)).toFixed(1)} derajat)`);
  }
  cek(G.kelilingBeraturan(5, 3) === 15 && G.kelilingBeraturan(6, 3) === 18 && G.kelilingBeraturan(8, 3) === 24, "keliling beraturan bersisi 3: 15, 18, 24");
  sama(G.TABEL_SISI, [4, 5, 6, 8], "tabel Ayo Merangkum: banyak sisi 4, 5, 6, 8");
  cek(G.SISI_BUKU === 3, "sisi gambar buku 3 cm");

  // 2) Segi-n beraturan pada tiap keadaan: deteksi dari titik sudut sama jauh dari pusat, cocokkan dengan benda yang dilabeli
  const beraturanDi = (objs) => {
    const hasil = [];
    for (const o of objs) {
      if (o.t !== "jalur" || !o.d || o.warna === "none") continue;
      const t = G.titikDariLintasan(o.d);
      if (t.length < 4) continue;
      const R = Math.hypot(t[0][0], t[0][1]);
      if (R < 5 || !t.every(([x, y]) => hampir(Math.hypot(x, y), R, 0.08))) continue;
      const n = t.length;
      const sisi = t.map(([x, y], i) => Math.hypot(t[(i + 1) % n][0] - x, t[(i + 1) % n][1] - y));
      hasil.push({ id: o.id, x: o.x, y: o.y, n, R, sisiSama: sisi.every((s) => hampir(s, sisi[0], 0.1)) });
    }
    return hasil;
  };
  let nb = 0;
  let nt = 0;
  let nn = 0;
  for (const [nama, objs] of semuaState) {
    const reg = beraturanDi(objs);
    for (const r of reg) {
      nb += 1;
      cek(r.sisiSama && [5, 6, 8, 10].includes(r.n), `${nama}: ${r.id} segi-${r.n} beraturan dengan sisi sama panjang`);
    }
    for (const o of objs) {
      // tanda sisi: satu garis kecil tegak lurus tiap sisi, banyaknya sama dengan segi-n pada pusat yang sama
      if (o.t === "jalur" && o.warna === "none" && o.garis === G.W.merah && o.tebal === 1.8) {
        const r = reg.find((q) => q.x === o.x && q.y === o.y);
        const bagian = (o.d.match(/M/g) ?? []).length;
        nt += 1;
        cek(r && r.n === bagian, `${nama}: ${o.id} memiliki ${bagian} tanda sisi untuk segi-${r?.n}`);
        const t = G.titikBeraturan(r.n, r.R);
        const potong = [...o.d.matchAll(/M(-?[\d.]+) (-?[\d.]+) L(-?[\d.]+) (-?[\d.]+)/g)].map((m) => m.slice(1).map(Number));
        potong.forEach(([ax, ay, bx, by], i) => {
          const [x1, y1] = t[i];
          const [x2, y2] = t[(i + 1) % r.n];
          const tengahX = (ax + bx) / 2;
          const tengahY = (ay + by) / 2;
          cek(hampir(tengahX, (x1 + x2) / 2, 0.05) && hampir(tengahY, (y1 + y2) / 2, 0.05), `${nama}: tanda sisi ${i + 1} di tengah sisi`);
          cek(Math.abs((bx - ax) * (x2 - x1) + (by - ay) * (y2 - y1)) / (Math.hypot(bx - ax, by - ay) * Math.hypot(x2 - x1, y2 - y1)) < 0.01, `${nama}: tanda sisi ${i + 1} tegak lurus sisi`);
        });
      }
      // nomor sisi 1..n: banyaknya sama dengan n segi-n terdekat
      const m = /^(ns|wn)(\d+)$/.exec(o.id);
      if (m && Number(m[2]) === 0) {
        const nomor = objs.filter((q) => q.id.startsWith(m[1]) && /^\d+$/.test(q.id.slice(m[1].length)));
        const r = reg.find((q) => Math.abs(q.x - nomor.reduce((a, q) => a + q.x, 0) / nomor.length) < 4 && Math.abs(q.y - nomor.reduce((a, q) => a + q.y, 0) / nomor.length) < 6);
        nn += 1;
        cek(r && nomor.length === r.n && sama2(nomor.map((q) => q.isi), Array.from({ length: r.n }, (_, i) => String(i + 1))), `${nama}: nomor sisi 1 sampai ${r?.n} untuk segi-${r?.n}`);
      }
    }
  }
  cek(nb >= 50, `segi-n beraturan yang diperiksa (${nb})`);
  cek(nt >= 12, `tanda sisi yang diperiksa (${nt})`);
  cek(nn >= 3, `nomor sisi yang diperiksa (${nn})`);

  // 3) Adegan tertentu: n sesuai nama bangun, label sisi, dan keliling n x sisi
  const nDi = (objs, id) => beraturanDi(objs).find((r) => r.id === id)?.n;
  const harap = [
    ["pembuka-d", 0, { p5: 5, p6: 6, p8: 8 }],
    ["pembuka-d", 1, { q5: 5, q6: 6, q8: 8 }],
    ["pembuka-d", 3, { g5: 5 }],
    ["apersepsi-d", 1, { t5: 5 }],
    ["apersepsi-d", 2, { t6: 6 }],
    ["sarana-d", 3, { v5: 5, v6: 6, v8: 8 }],
    ["lima-1", 0, { pk: 5 }],
    ["lima-1", 3, { pk: 5 }],
    ["lima-2", 3, { pk: 5 }],
    ["enam-1", 0, { pk: 6 }],
    ["enam-1", 4, { pk: 6 }],
    ["enam-2", 0, { pk: 6 }],
    ["rangkum-d", 0, { i2: 5, i3: 6, i4: 8 }],
    ["rangkum-d", 4, { o8: 8 }],
    ["akhir-d", 0, { e5: 5, e6: 6, e8: 8 }],
    ["uji-d", 0, { u5: 5 }],
    ["uji-d", 1, { v6: 6, v8: 8 }],
    ["uji-d", 3, { w6: 6 }],
  ];
  for (const [a, i, tabel] of harap) for (const [id, n] of Object.entries(tabel)) cek(nDi(keadaan(M, a, i), id) === n, `materi ${a}#${i + 1}: ${id} adalah segi-${n}`);
  const harapLuar = [
    ["luar4d-pembuka", 0, { p5: 5, p6: 6, p8: 8 }],
    ["luar4d-ngon", 0, { pk: 5 }],
    ["luar4d-ngon", 2, { q3: 5, q4: 6 }],
    ["luar4d-ngon", 4, { s1: 5 }],
    ["luar4d-ngon-terapan", 0, { pk: 5 }],
    ["luar4d-ngon-terapan", 1, { pk: 6 }],
    ["luar4d-ngon-terapan", 2, { pk: 8 }],
    ["luar4d-ngon-terapan", 4, { pk: 10 }],
    ["luar4d-balik", 3, { k3: 6 }],
    ["luar4d-balik-terapan", 0, { pk: 5 }],
    ["luar4d-balik-terapan", 1, { pk: 6 }],
    ["luar4d-balik-terapan", 2, { pk: 8 }],
  ];
  for (const [a, i, tabel] of harapLuar) for (const [id, n] of Object.entries(tabel)) cek(nDi(keadaan(U, a, i), id) === n, `luar ${a}#${i + 1}: ${id} adalah segi-${n}`);

  // label "3" pada tiap sisi segi lima, enam, delapan, dan 3 cm di buku: jumlah label = n, keliling = n x 3
  const labelDi = (objs, awal) => objs.filter((o) => o.t === "teks" && new RegExp(`^${awal}\\d+$`).test(o.id));
  for (const [v, a, i, n, kel] of [[M, "lima-1", 0, 5, 15], [M, "lima-1", 2, 5, 15], [M, "enam-1", 3, 6, 18], [U, "luar4d-ngon-terapan", 0, 5, 15], [U, "luar4d-ngon-terapan", 1, 6, 18], [U, "luar4d-ngon-terapan", 2, 8, 24]]) {
    const o = keadaan(v, a, i);
    const lab = labelDi(o, "ls");
    cek(lab.length === n && lab.every((q) => /^3( cm)?$/.test(q.isi)), `${a}#${i + 1}: ${n} label sisi 3 cm`);
    cek(lab.length * 3 === kel, `${a}#${i + 1}: keliling ${n} x 3 = ${kel}`);
  }
  {
    const o = keadaan(M, "lima-2", 0);
    cek(labelDi(o, "ls").length === 5 && cari(o, "kj").isi === "3+3+3+3+3", "lima-2: lima suku 3 dijumlahkan");
    const p = keadaan(M, "enam-2", 0);
    cek(labelDi(p, "ls").length === 6 && cari(p, "kj").isi === "3+3+3+3+3+3", "enam-2: enam suku 3 dijumlahkan");
    cek((cari(keadaan(M, "lima-2", 0), "kj").isi.match(/3/g) ?? []).length * 3 === 15, "lima-2: 5 suku 3 berjumlah 15");
    cek((cari(p, "kj").isi.match(/3/g) ?? []).length * 3 === 18, "enam-2: 6 suku 3 berjumlah 18");
    cek(cari(keadaan(M, "lima-2", 4), "r1").isi.split("sisi").length - 1 === 5, "lima-2: rumus memuat lima kata sisi");
    cek(cari(keadaan(M, "enam-2", 2), "r1").isi.split("sisi").length - 1 === 6, "enam-2: rumus memuat enam kata sisi");
    cek(cari(keadaan(M, "enam-2", 2), "r2").isi === "= 6 x sisi" && cari(keadaan(M, "lima-2", 4), "r2").isi === "= 5 x sisi", "rumus 5 x sisi dan 6 x sisi");
  }

  // 4) Tabel Ayo Merangkum: baris banyak sisi dan keliling n x panjang sisi, urut dengan bangun
  {
    const o = keadaan(M, "rangkum-d", 2);
    const n = G.TABEL_SISI;
    n.forEach((v, i) => {
      cek(cari(o, `r${i + 1}-t1`).isi === String(v), `rangkum: baris ${i + 1} banyak sisi ${v}`);
      cek(cari(o, `r${i + 1}-t2`).isi === `${v} x panjang sisi`, `rangkum: baris ${i + 1} keliling ${v} x panjang sisi`);
    });
    const ikon = [cari(o, "i1"), cari(o, "i2"), cari(o, "i3"), cari(o, "i4")];
    cek(ikon[0].t === "kotak" && [ikon[1], ikon[2], ikon[3]].every((q, i) => G.titikDariLintasan(q.d).length === n[i + 1]), "rangkum: ikon bangun di tabel sesuai banyak sisi (persegi, 5, 6, 8)");
    const yUrut = ["r1", "r2", "r3", "r4"].map((id) => cari(o, `${id}-k0`).y);
    cek(yUrut.every((y, i) => i === 0 || y > yUrut[i - 1]), "rangkum: baris tabel berurutan ke bawah");
    const lanjut = keadaan(M, "rangkum-d", 4);
    cek(lanjut.filter((q) => q.id.startsWith("ls")).length === 8 && cari(lanjut, "ot").isi === "8 x 3 = 24", "rangkum: segi delapan bersisi 3: 8 label dan 8 x 3 = 24");
  }

  // 5) Jumlah sisi berbeda: 3, 3, 3, 4, 5 = 18 dan 3, 3, 3, 3, 5, 5 = 22 dari label dan teks gambar
  {
    const o = keadaan(M, "tidak-sama", 2);
    const sisi = ["b1", "b2", "b3", "b4", "b5"].map((id) => Number(cari(o, id).isi));
    sama(sisi, [3, 3, 3, 4, 5], "tidak-sama: sisi lima bangun tidak beraturan");
    cek(sisi.reduce((a, b) => a + b, 0) === 18 && cari(o, "bs").isi === "3+3+3+4+5 = 18", "tidak-sama: 3+3+3+4+5 = 18");
    const w = keadaan(M, "tidak-sama", 3);
    cek(5 * 3 === 15 && 15 !== 18 && cari(w, "w1-t").isi === "5 x 3 = 15", "tidak-sama: kali 5 x 3 = 15 bukan keliling yang benar (18)");
    cek(G.titikDariLintasan(cari(keadaan(M, "tidak-sama", 2), "b0").d).length === 5, "tidak-sama: bangun gambar punya lima sisi");

    const j = keadaan(U, "luar4d-jumlah-terapan", 0);
    sama(["ls0", "ls1", "ls2", "ls3", "ls4"].map((id) => Number(cari(j, id).isi)), [3, 3, 3, 4, 5], "jumlah-terapan: label lima sisi");
    const h = keadaan(U, "luar4d-jumlah-terapan", 2);
    const hs = ["hl0", "hl1", "hl2", "hl3", "hl4", "hl5"].map((id) => Number(cari(h, id).isi));
    cek(G.titikDariLintasan(cari(h, "hk").d).length === 6 && hs.length === 6, "jumlah-terapan: segi enam punya enam sisi");
    sama(hs, [3, 3, 3, 3, 5, 5], "jumlah-terapan: label sisi segi enam");
    const hit = (a) => a.reduce((x, y) => x + y, 0);
    cek(hit(hs) === 22 && 4 * 3 + 2 * 5 === 22 && hs.filter((q) => q === 3).length === 4 && hs.filter((q) => q === 5).length === 2, "jumlah-terapan: 4 x 3 + 2 x 5 = 22 sama dengan jumlah satu per satu");
    cek(cari(h, "k1").isi === "4 x 3 = 12" && cari(h, "k2").isi === "2 x 5 = 10" && cari(h, "k3").isi === "12 + 10 = 22", "jumlah-terapan: kelompok 12, 10, dan 22");
    const urut = keadaan(U, "luar4d-jumlah-terapan", 1);
    const tahap = ["j1", "j2", "j3", "j4"].map((id) => cari(urut, id).isi);
    sama(tahap, ["3 + 3 = 6", "6 + 3 = 9", "9 + 4 = 13", "13 + 5 = 18"], "jumlah-terapan: jumlah berurutan");
    const nomor = keadaan(U, "luar4d-jumlah", 2);
    sama([0, 1, 2, 3, 4].map((i) => cari(nomor, `nm${i}`).isi), ["1", "2", "3", "4", "5"], "jumlah: nomor sisi 1 sampai 5");
  }

  // 6) Table Pattern: keliling = 3 x banyak sisi, selisih antarbaris sama dengan 3 x tambahan sisi
  {
    const o = keadaan(U, "luar4d-tabel", 2);
    const baris = [["t1", 4, 12], ["t2", 5, 15], ["t3", 6, 18], ["t4", 8, 24]];
    for (const [id, n, kel] of baris) {
      cek(cari(o, `${id}-t0`).isi === String(n) && cari(o, `${id}-t1`).isi === String(kel) && kel === 3 * n, `tabel: ${n} sisi keliling ${kel} = 3 x ${n}`);
    }
    const selisih = [];
    for (let i = 1; i < baris.length; i += 1) selisih.push([baris[i][2] - baris[i - 1][2], 3 * (baris[i][1] - baris[i - 1][1])]);
    cek(selisih.every(([a, b]) => a === b) && sama2(selisih.map((q) => q[0]), [3, 3, 6]), "tabel: selisih keliling 3, 3, 6 sama dengan 3 x tambahan sisi");
    cek(cari(o, "d1").isi === "15 - 12 = 3" && cari(o, "d2").isi === "18 - 15 = 3" && cari(o, "d3").isi === "24 - 18 = 6", "tabel: tiga selisih di gambar");
    const t = keadaan(U, "luar4d-tabel-terapan", 1);
    cek(cari(t, "t3-t1").isi === "18" && cari(t, "t5-t0").isi === "7" && cari(t, "t5-t1").isi === "21" && 18 + 3 === 21 && 7 * 3 === 21, "tabel-terapan: segi tujuh 18 + 3 = 21 = 7 x 3");
    const s = keadaan(U, "luar4d-tabel-terapan", 2);
    cek(cari(s, "t4-t1").isi === "24" && cari(s, "t6-t0").isi === "10" && cari(s, "t6-t1").isi === "30" && 24 + 6 === 30 && 10 * 3 === 30, "tabel-terapan: segi sepuluh 24 + 6 = 30 = 10 x 3");
    // diagram batang: tinggi sebanding keliling
    const b = keadaan(U, "luar4d-tabel-terapan", 3);
    const nilai = [["g4", 12, 4], ["g5", 15, 5], ["g6", 18, 6], ["g8", 24, 8], ["g10", 30, 10]];
    for (const [id, kel, n] of nilai) cek(Number(cari(b, `${id}-n`).isi) === kel && kel === 3 * n && cari(b, id).h === Math.round((kel / 30) * 100) && cari(b, id).y + cari(b, id).h === 170, `batang ${n} sisi: nilai ${kel}, tinggi sebanding, alas 170`);
    cek(nilai.every((q, i) => i === 0 || cari(b, q[0]).h > cari(b, nilai[i - 1][0]).h), "batang: naik teratur");
    const g = keadaan(U, "luar4d-ngon-terapan", 3);
    for (const [id, kel] of [["g5", 15], ["g6", 18], ["g8", 24]]) cek(Number(cari(g, `${id}-n`).isi) === kel && cari(g, id).h === Math.round((kel / 24) * 100) && cari(g, id).y + cari(g, id).h === 170, `batang ngon ${id}: ${kel}`);
  }

  // 7) Inverse Perimeter Division: sisi = keliling : n, cek balik n x sisi = keliling
  {
    for (const [i, n, kel, s] of [[0, 5, 15, 3], [1, 6, 18, 3], [2, 8, 24, 3]]) {
      const o = keadaan(U, "luar4d-balik-terapan", i);
      cek(cari(o, "h1").isi === `${kel} : ${n} = ${s}` && cari(o, "h3").isi === `${n} x ${s} = ${kel}` && kel / n === s && n * s === kel, `balik: ${kel} : ${n} = ${s} dan cek balik ${n} x ${s} = ${kel}`);
      cek(nDi(o, "pk") === n, `balik: bangun pada ketukan ${i + 1} adalah segi-${n}`);
    }
    const o = keadaan(U, "luar4d-balik-terapan", 3);
    cek(cari(o, "z2-t").isi === "30 : 6 = 5" && 30 / 6 === 5 && 6 * 5 === 30 && cari(o, "z3").isi === "cek: 6 x 5 = 30", "balik: segi enam keliling 30, sisi 5, cek balik 6 x 5 = 30");
  }

  // 8) Regular n-gon: n x s untuk persegi, segi lima, segi enam, dan keliling berubah mengikuti n
  {
    const q = keadaan(U, "luar4d-ngon", 2);
    cek(cari(q, "q1t").isi === "n = 4: 4 x s" && cari(q, "q3t").isi === "n = 5: 5 x s" && cari(q, "q4t").isi === "n = 6: 6 x s", "ngon: persegi 4 x s, segi lima 5 x s, segi enam 6 x s");
    for (const [i, h1] of [[0, "5 x 3 = 15"], [1, "6 x 3 = 18"], [2, "8 x 3 = 24"], [4, "10 x 3 = 30"]]) cek(cari(keadaan(U, "luar4d-ngon-terapan", i), "h1").isi === h1, `ngon-terapan ${i + 1}: ${h1}`);
  }
}
function sama2(a, b) {
  return js(a) === js(b);
}

/* ------------------------------ Kutipan buku dan Buku Panduan Guru (bila PDF tersedia) ------------------------------ */
{
  const pdfBS = new URL("../bahan-sd/Matematika-BS-KLS-V.pdf", import.meta.url);
  const pdfBG = new URL("../bahan-sd/Matematika-BG-KLS-V.pdf", import.meta.url);
  const path = (u) => u.pathname.replace(/^\/([A-Za-z]:)/, "$1");
  const ada = existsSync(pdfBS) && existsSync(pdfBG);
  const bs = ada ? spawnSync("pdftotext", ["-enc", "UTF-8", "-f", "121", "-l", "146", "-raw", path(pdfBS), "-"], { encoding: "utf8", maxBuffer: 1 << 26 }) : null;
  const bg = ada ? spawnSync("pdftotext", ["-enc", "UTF-8", "-f", "125", "-l", "188", "-raw", path(pdfBG), "-"], { encoding: "utf8", maxBuffer: 1 << 26 }) : null;
  if (!ada || !bs || bs.status !== 0 || !bg || bg.status !== 0) console.log("PDF atau pdftotext tidak tersedia: pemeriksaan kutipan buku dilewati");
  else {
    const bersih = (t) => t.toLowerCase().replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim();
    const buku = `${bersih(bs.stdout)} ${bersih(bg.stdout)}`;
    let n = 0;
    for (const a of M.adegan) for (const kt of a.kutipan ?? []) {
      n += 1;
      cek(buku.includes(bersih(kt)), `kutipan buku ${a.id}: "${kt}" ada di teks PDF`);
    }
    cek(n >= 35, `jumlah kutipan buku yang diperiksa (${n})`);
    // halaman buku yang disebut video: hlm. 122 sampai 124 (PDF 138 sampai 140), cek isi halaman benar
    const halaman = (f, p) => spawnSync("pdftotext", ["-enc", "UTF-8", "-f", String(p), "-l", String(p), "-raw", path(f), "-"], { encoding: "utf8" }).stdout.toLowerCase();
    cek(halaman(pdfBS, 138).includes("keliling segi lima beraturan") && /\b122\b/.test(halaman(pdfBS, 138)), "buku siswa hlm. 122 memuat segi lima beraturan");
    cek(halaman(pdfBS, 139).includes("keliling segi enam beraturan") && /\b123\b/.test(halaman(pdfBS, 139)), "buku siswa hlm. 123 memuat segi enam beraturan");
    cek(halaman(pdfBS, 140).includes("ayo merangkum") && /\b124\b/.test(halaman(pdfBS, 140)), "buku siswa hlm. 124 memuat Ayo Merangkum");
    cek(/aku bisa menemukan cara menghitung keliling segi lima beraturan/.test(halaman(pdfBS, 145).replace(/\s+/g, " ")) && /\b129\b/.test(halaman(pdfBS, 145)), "buku siswa hlm. 129 memuat refleksi nomor 13 sampai 15");
    cek(/segi lima beraturan/.test(halaman(pdfBG, 168)) && /\b156\b/.test(halaman(pdfBG, 168)), "panduan guru hlm. 156 memuat segi lima beraturan");
    cek(/segi enam beraturan/.test(halaman(pdfBG, 169)) && /\b157\b/.test(halaman(pdfBG, 169)), "panduan guru hlm. 157 memuat segi enam beraturan");
    cek(/8 × panjang sisinya/.test(halaman(pdfBG, 170)) && /\b158\b/.test(halaman(pdfBG, 170)), "panduan guru hlm. 158 memuat kunci tabel dengan segi delapan");
    cek(/menjadi pengali/.test(halaman(pdfBG, 171).replace(/\s+/g, " ")) && /\b159\b/.test(halaman(pdfBG, 171)), "panduan guru hlm. 159 memuat penguatan dan refleksi");
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k5b4d-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|k5b4d-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k5b4d sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../video-k5b4d.tsx", folder), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_D54|naskah-k5b4/.test(pembungkus) && /VIDEO_MATERI_K5B4D/.test(pembungkus) && /VIDEO_LUAR_K5B4D/.test(pembungkus) && /export function VideoK5B4D/.test(pembungkus) && /DaftarVideoCerita/.test(pembungkus) && /keVideoSiap/.test(pembungkus), "video-k5b4d: memakai dua video baru, bukan naskah lama");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
if (process.env.RINCI) for (const v of VIDEO) for (const a of v.adegan) console.log(`  ${v.id}/${a.id}: ${a.ketukan.length} ketukan, kata per ketukan ${a.ketukan.map((kt) => L.kataDari(kt.suara).length).join(",")}, jumlah ${a.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)}`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
