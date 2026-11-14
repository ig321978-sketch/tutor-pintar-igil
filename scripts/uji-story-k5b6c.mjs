// Uji Story Kelas 5 Bab 6 Sub-Bab C (mengukur dan membandingkan sudut): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan akhir adegan, batas kanvas,
// teks bertumpuk, pemisahan materi dan metode luar, tidak membocorkan Subbab D, kutipan buku (bila PDF ada), hitungan mandiri
// (sudut jarum jam, pecahan putaran, penjumlahan), geometri gambar (busur sudut, kipas, jarum jam, skala busur derajat, tanda siku-siku),
// emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k5b6c.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k5b6c-video.ts");

const stat = { busur: 0, kipas: 0, jam: 0, skala: 0, siku: 0, label: 0, rumus: 0, teksPasang: 0 };
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
// Eksplorasi 6.3 (BS hlm. 176 dan 179, kunci Panduan Guru hlm. 265): kipas 1 sampai 4.
const KIPAS = [105, 130, 135, 85];
// Ayo Berlatih nomor 1 (kunci Panduan Guru hlm. 267) dan nomor 2 (hlm. 268): jam, menit, besar sudut terkecil.
const JAM1 = [[1, 0, 30], [9, 0, 90], [4, 0, 120], [1, 30, 135]];
const JAM2 = [[10, 0, 60], [15, 0, 90], [7, 0, 150], [4, 30, 45]];
/** Sudut terkecil antara jarum pendek dan panjang, dihitung mandiri. */
const sudutJam = (j, m) => {
  const a = Math.abs((j % 12) * 30 + m * 0.5 - m * 6);
  return Math.min(a, 360 - a);
};
for (const [j, m, besar] of [...JAM1, ...JAM2]) sama(sudutJam(j, m), besar, `kunci Panduan Guru pukul ${j}.${m}: ${besar} derajat`);
// Tantangan (Panduan Guru hlm. 265-266): sudut refleks dua cara.
cek(180 + 60 === 240 && 360 - 120 === 240, "tantangan: 180 + 60 = 360 - 120 = 240");
// Kipas: yang terlebar adalah kipas 3.
sama(KIPAS.indexOf(Math.max(...KIPAS)) + 1, 3, "kipas terlebar adalah kipas 3");
sama(KIPAS.map((b) => (b < 90 ? "lancip" : b === 90 ? "siku-siku" : "tumpul")), ["tumpul", "tumpul", "tumpul", "lancip"], "jenis sudut empat kipas");
// Skala busur: dua skala berjumlah 180 (55 dan 125 pada contoh Panduan Guru hlm. 264).
cek(55 + 125 === 180, "skala luar 55 dan skala dalam 125 berjumlah 180");

/* ------------------------------ Geometri gambar ------------------------------ */
const bilangan = (d) => (d.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);
const derajat = (r) => (r * 180) / Math.PI;
const antara = (a, b) => {
  const c = (a[0] * b[0] + a[1] * b[1]) / (Math.hypot(...a) * Math.hypot(...b));
  return derajat(Math.acos(Math.max(-1, Math.min(1, c))));
};
/** Besar busur (derajat) dari jalur busur M..A. */
const spanBusur = (o) => {
  const n = bilangan(o.d ?? "");
  if (!/^M[^A]*A/.test(o.d ?? "") || n.length !== 9) return null;
  const awal = derajat(Math.atan2(n[1], n[0]));
  const akhir = derajat(Math.atan2(n[8], n[7]));
  let span = n[6] === 1 ? akhir - awal : awal - akhir;
  span = ((span % 360) + 360) % 360;
  if (n[5] === 1 && span < 180) span += 360;
  return span;
};
/** Besar juring (kipas) dari jalur M0 0 L.. A.. Z. */
const spanKipas = (o) => {
  const n = bilangan(o.d ?? "");
  if (!/^M0 0 L/.test(o.d ?? "") || n.length !== 11) return null;
  const teta = antara([n[2], n[3]], [n[9], n[10]]);
  return n[7] === 1 ? 360 - teta : teta;
};
const arahGaris = (o) => [o.x2 ?? 0, o.y2 ?? 0];
const dekat = (a, b) => Math.abs(a[0] - b[0]) < 0.6 && Math.abs(a[1] - b[1]) < 0.6;
const angkaPertama = (s) => {
  const m = (s ?? "").match(/\d+/);
  return m ? Number(m[0]) : null;
};
const sudutLayar = (v) => ((derajat(Math.atan2(v[0], -v[1])) % 360) + 360) % 360; // arah jarum jam dari pukul 12

/** Semua pemeriksaan geometri pada satu keadaan gambar. */
function periksaGeometri(objs, nama) {
  const garisAda = objs.filter((o) => o.t === "garis" && (o.op ?? 1) > 0);
  const per = (id) => objs.find((o) => o.id === id);
  const sinar = (pusat) => garisAda.filter((g) => dekat([g.x ?? 0, g.y ?? 0], pusat)).map((g) => arahGaris(g)).filter((v) => Math.hypot(...v) > 1);
  const himpunanSudut = (pusat) => {
    const r = sinar(pusat);
    const h = [];
    for (let i = 0; i < r.length; i += 1) for (let j = i + 1; j < r.length; j += 1) {
      const t = antara(r[i], r[j]);
      h.push(t, 360 - t);
    }
    return h;
  };
  // busur sudut (-w) sama dengan sudut antara dua sinar berpangkal di pusat yang sama
  for (const o of objs) {
    if (o.t !== "jalur" || !/-w$/.test(o.id)) continue;
    const span = spanBusur(o);
    if (span === null) continue;
    stat.busur += 1;
    const h = himpunanSudut([o.x ?? 0, o.y ?? 0]);
    cek(h.length > 0 && h.some((t) => Math.abs(t - span) < 1.6), `${nama}: busur ${o.id} (${span.toFixed(1)} derajat) cocok dengan sudut dua sinar di pusatnya`);
  }
  // juring kipas (-f): label -n bernilai sama dengan sudut juring
  for (const o of objs) {
    if (o.t !== "jalur" || !/-f$/.test(o.id)) continue;
    const span = spanKipas(o);
    if (span === null) continue;
    stat.kipas += 1;
    const n = bilangan(o.d);
    hampir(Math.hypot(n[2], n[3]), Math.hypot(n[9], n[10]), 0.3, `${nama}: juring ${o.id} jari-jari sama`);
    const label = per(o.id.replace(/-f$/, "-n"));
    const nilai = angkaPertama(label?.isi);
    if (nilai !== null && /^\D*\d+°/.test(label.isi)) {
      stat.label += 1;
      hampir(span, nilai, 1.2, `${nama}: label ${label.id} "${label.isi}" sama dengan juring ${o.id}`);
    }
  }
  // label -n bernilai sama dengan sudut dua kaki -a dan -b, atau busur -w
  for (const o of objs) {
    if (o.t !== "teks" || !/-n$/.test(o.id)) continue;
    const nilai = angkaPertama(o.isi);
    if (nilai === null || !/^\D*\d+°/.test(o.isi)) continue;
    const pre = o.id.replace(/-n$/, "");
    const a = per(`${pre}-a`);
    const b = per(`${pre}-b`);
    if (a && b && a.t === "garis" && b.t === "garis" && Math.hypot(...arahGaris(a)) > 1 && Math.hypot(...arahGaris(b)) > 1) {
      stat.label += 1;
      const t = antara(arahGaris(a), arahGaris(b));
      hampir(Math.abs(t - nilai) < 1.2 || Math.abs(360 - t - nilai) < 1.2 ? nilai : t, nilai, 1.2, `${nama}: label ${o.id} "${o.isi}" sama dengan sudut kaki ${pre}`);
    }
    const w = per(`${pre}-w`);
    if (w && spanBusur(w) !== null) {
      stat.label += 1;
      hampir(spanBusur(w), nilai, 1.6, `${nama}: label ${o.id} "${o.isi}" sama dengan busur ${w.id}`);
    }
  }
  // jam analog: jarum pendek dan panjang
  for (const hp of objs.filter((o) => /-jp$/.test(o.id))) {
    const pre = hp.id.replace(/-jp$/, "");
    const hm = per(`${pre}-jm`);
    if (!hm) continue;
    stat.jam += 1;
    const ap = sudutLayar(arahGaris(hp));
    const am = sudutLayar(arahGaris(hm));
    const selisih = Math.abs(ap - am);
    const kecil = Math.min(selisih, 360 - selisih);
    cek(Math.hypot(...arahGaris(hp)) < Math.hypot(...arahGaris(hm)), `${nama}: jam ${pre}: jarum pendek lebih pendek dari jarum panjang`);
    // hubungan jarum pendek dan panjang: sudut jam = 30 per jam + 0,5 per menit, sudut menit = 6 per menit
    const menit = Math.round(am / 6) % 60;
    hampir(((am - menit * 6 + 540) % 360) - 180, 0, 0.6, `${nama}: jam ${pre}: jarum panjang di menit bulat`);
    const jamPerkiraan = Math.round((ap - menit * 0.5) / 30);
    hampir(ap, ((jamPerkiraan % 12) * 30 + menit * 0.5 + 360) % 360, 0.6, `${nama}: jam ${pre}: jarum pendek sesuai jam dan menit`);
    const wk = per(`${pre}-wk`);
    if (wk) {
      const t = wk.isi.match(/(\d\d)\.(\d\d)/);
      cek(!!t, `${nama}: ${wk.id} memuat waktu`);
      if (t) {
        const [j, m] = [Number(t[1]), Number(t[2])];
        hampir(ap, ((j % 12) * 30 + m * 0.5) % 360, 0.6, `${nama}: jarum pendek ${pre} sesuai ${wk.isi}`);
        hampir(am, (m * 6) % 360, 0.6, `${nama}: jarum panjang ${pre} sesuai ${wk.isi}`);
      }
    }
    for (const kode of ["-n", "-m"]) {
      const lb = per(`${pre}${kode}`);
      if (!lb) continue;
      const rumus = lb.isi.match(/^(\d+(?:,\d+)?) × 30° = (\d+)°$/);
      const nilai = rumus ? Number(rumus[2]) : angkaPertama(lb.isi);
      if (nilai === null || !/°/.test(lb.isi) || /^\d+$/.test(lb.isi)) continue;
      cek(Math.abs(nilai - kecil) < 1.2 || Math.abs(nilai - (360 - kecil)) < 1.2, `${nama}: label ${lb.id} "${lb.isi}" sesuai sudut jarum (${kecil.toFixed(1)})`);
    }
  }
  // skala busur derajat: garis skala tiap 10 derajat, angka luar dan dalam
  for (const p of objs.filter((o) => o.t === "jalur" && /-p$/.test(o.id) && /^M-?\d+ 0 A/.test(o.d ?? ""))) {
    const pre = p.id.replace(/-p$/, "");
    const R = Math.abs(bilangan(p.d)[0]);
    for (let i = 0; i <= 18; i += 1) {
      const tk = per(`${pre}-tk${i}`);
      if (!tk) continue;
      stat.skala += 1;
      const pangkal = [(tk.x ?? 0) - (p.x ?? 0), (tk.y ?? 0) - (p.y ?? 0)];
      hampir(Math.hypot(...pangkal), R, 0.2, `${nama}: ${tk.id} pangkal di tepi busur`);
      hampir(((derajat(Math.atan2(-pangkal[1], pangkal[0])) % 360) + 360) % 360, i * 10, 0.4, `${nama}: ${tk.id} pada sudut ${i * 10}`);
    }
    for (let j = 0; j <= 6; j += 1) {
      for (const [kode, nilaiHarap] of [["lo", j * 30], ["li", 180 - j * 30]]) {
        const lb = per(`${pre}-${kode}${j}`);
        if (!lb) continue;
        stat.skala += 1;
        sama(lb.isi, String(nilaiHarap), `${nama}: angka ${lb.id}`);
        const ang = derajat(Math.atan2((p.y ?? 0) - (lb.y ?? 0) + 2, (lb.x ?? 0) - (p.x ?? 0)));
        hampir(ang, j * 30, 4, `${nama}: ${lb.id} berada pada arah ${j * 30}`);
      }
    }
  }
  // tanda siku-siku: dua sisi tegak lurus dan sama panjang
  for (const o of objs) {
    if (o.t !== "jalur" || !/^M-?[\d.]+ -?[\d.]+ L-?[\d.]+ -?[\d.]+ L-?[\d.]+ -?[\d.]+$/.test(o.d ?? "")) continue;
    const n = bilangan(o.d);
    stat.siku += 1;
    hampir(n[0] * n[4] + n[1] * n[5], 0, 0.3, `${nama}: tanda siku-siku ${o.id} tegak lurus`);
    hampir(Math.hypot(n[0], n[1]), Math.hypot(n[4], n[5]), 0.3, `${nama}: tanda siku-siku ${o.id} sisi sama panjang`);
    const h = himpunanSudut([o.x ?? 0, o.y ?? 0]);
    if (h.length) cek(h.some((t) => Math.abs(t - 90) < 1.2), `${nama}: tanda siku-siku ${o.id} berada di sudut 90 derajat`);
  }
  // rumus di gambar, dihitung mandiri
  for (const o of objs) {
    if (o.t !== "teks" || !o.isi) continue;
    const isi = o.isi;
    const angka = (s) => Number(s.replace(",", "."));
    const op = isi.match(/^(\d+(?:,\d+)?)°? ([+\-×÷]) (\d+(?:,\d+)?)°? = (\d+(?:,\d+)?)°?$/);
    if (op) {
      stat.rumus += 1;
      const [a, b, c] = [angka(op[1]), angka(op[3]), angka(op[4])];
      const hasil = op[2] === "+" ? a + b : op[2] === "-" ? a - b : op[2] === "×" ? a * b : a / b;
      hampir(hasil, c, 1e-9, `${nama}: rumus di gambar "${isi}"`);
    }
    const pecah = isi.match(/^(\d+)\/(\d+) = (\d+)\/(\d+) putaran$/);
    if (pecah) {
      stat.rumus += 1;
      cek(Number(pecah[1]) * Number(pecah[4]) === Number(pecah[2]) * Number(pecah[3]), `${nama}: pecahan putaran "${isi}"`);
    }
    const bagian = isi.match(/^(\d+)\/(\d+) putaran = (\d+)°$/);
    if (bagian) {
      stat.rumus += 1;
      hampir((360 * Number(bagian[1])) / Number(bagian[2]), Number(bagian[3]), 1e-9, `${nama}: bagian putaran "${isi}"`);
    }
  }
}

/* ------------------------------ Isi dua video ------------------------------ */
const VIDEO = [V.VIDEO_MATERI_K5B6C, V.VIDEO_LUAR_K5B6C];
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
      for (let p = 0; p < kata.length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) for (const b of bilanganDari(o.isi)) terlihat.add(b);
      for (const b of bilanganDari(kt.suara)) cek(terlihat.has(b), `${nama}#${i + 1}: bilangan ${b} di suara tampak di gambar`);
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
          cek(y > 0 && y < 210 && kiri > -4 && kiri + lebar < 304, `${nama}#${i + 1}: teks "${o.isi}" masuk kanvas (x=${x}, y=${y}, lebar=${Math.round(lebar)})`);
        } else if (o.t === "kotak") cek(x > -2 && y > -2 && x + (o.w ?? 0) < 302 && y + (o.h ?? 0) < 210, `${nama}#${i + 1}: kotak ${o.id} masuk kanvas`);
        else if (o.t === "bulat") cek(x - (o.r ?? 0) > -2 && x + (o.r ?? 0) < 302 && y - (o.r ?? 0) > -2 && y + (o.r ?? 0) < 210, `${nama}#${i + 1}: bulat ${o.id} masuk kanvas`);
        else if (o.t === "garis" || o.t === "panah") cek(x > -2 && x < 302 && y > -2 && y < 210 && x + (o.x2 ?? 0) > -2 && x + (o.x2 ?? 0) < 302 && y + (o.y2 ?? 0) > -2 && y + (o.y2 ?? 0) < 210, `${nama}#${i + 1}: garis ${o.id} masuk kanvas`);
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
      periksaGeometri(akhir, `${nama}#${i + 1}`);
    });
  }
}

/* ------------------------------ Pemisahan materi dan metode luar, serta Subbab D ------------------------------ */
const seluruhTeks = (v) => v.adegan.map((a) => [a.judul, a.sumber, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const M = V.VIDEO_MATERI_K5B6C;
const U = V.VIDEO_LUAR_K5B6C;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const nilaiId = (objs, id) => objs.find((o) => o.id === id)?.isi;
const objId = (objs, id) => objs.find((o) => o.id === id);
{
  const teksVideo = (v) => JSON.stringify(seluruhTeks(v));
  const NAMA_METODE = /Protractor Reading|Benchmark|Degree Measure|Clock Face|Protocol|Protokol|metode luar|metode dari luar/i;
  const materi = teksVideo(M);
  const luar = teksVideo(U);
  cek(!NAMA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of ["Protractor Reading Protocol", "Benchmark Angles", "Degree Measure", "Clock Face Division"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(M.adegan.every((a) => /Buku Siswa|Panduan Guru/.test(a.sumber) && /hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(U.adegan.every((a) => /metode (dari )?luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  for (const kata of ["Subbab C", "Tari", "pakarena", "Sulawesi Selatan", "Gantarang", "kipas lipat", "Nisa", "busur derajat", "titik pusat", "garis dasar", "skala", "derajat", "Eksplorasi 6.3", "sudut siku-siku", "lancip", "tumpul", "refleks", "sudut nol", "sudut lurus", "sudut penuh", "Tantangan", "Tahukah", "Ayo Berlatih", "Refleksi", "Panduan Guru", "diferensiasi", "jarak ujung kaki|jarak antara ujung kaki", "salah membaca skala"]) cek(new RegExp(kata.replace(/\./g, "\\."), "i").test(materi), `video materi memuat ${kata}`);
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-protokol", "luar-protokol-terapan", "luar-patokan", "luar-patokan-terapan", "luar-derajat", "luar-derajat-terapan", "luar-muka-jam", "luar-muka-jam-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(M.adegan.length === 13 && U.adegan.length === 10, "13 adegan materi dan 10 adegan metode luar");
  // Subbab D (melukis sudut, proyek tata kota, Uji Kompetensi, pengayaan rasi bintang, Refleksi 6) tidak boleh bocor ke Subbab C.
  const BOCOR_D = /melukis|lukis|menggambar|tata kota|rasi bintang|Uji Kompetensi|proyek|pengayaan|Subbab D|Refleksi (1|2|3|6)|persimpangan|keramik/i;
  cek(!BOCOR_D.test(materi), "materi C tidak membocorkan Subbab D");
  cek(!BOCOR_D.test(luar), "metode luar C tidak membocorkan Subbab D");
  cek(totalKetukan >= 90, `total ketukan cukup dalam (${totalKetukan})`);
}

/* ------------------------------ Hitungan isi, dihitung mandiri ------------------------------ */
{
  // Eksplorasi 6.3: label empat kipas.
  const e = akhirAdegan(adegan(M, "eks-kipas"), 2);
  sama([1, 2, 3, 4].map((i) => nilaiId(e, `ek${i}-n`)), KIPAS.map((b) => `${b}°`), "label empat kipas cocok dengan kunci Panduan Guru");
  const bar = akhirAdegan(adegan(M, "eks-kipas"));
  const lebarBar = [3, 2, 1, 4].map((i) => objId(bar, `br${i}`)?.w);
  sama(lebarBar.map((w) => Math.round(w)), [135, 130, 105, 85].map((b) => Math.round(b * 1.4)), "lebar batang sebanding besar sudut, urutan kipas 3, 2, 1, 4");
  cek(lebarBar.every((w, i, arr) => i === 0 || w < arr[i - 1]), "batang kipas terurut dari yang terlebar");
  // Ayo Berlatih nomor 1 dan 2: waktu dan sudut di tabel hasil.
  const tab = (idAdegan, pre, data) => {
    const t = akhirAdegan(adegan(M, idAdegan));
    data.forEach(([j, m, besar], r) => {
      const jj = String(j).padStart(2, "0");
      const mm = String(m).padStart(2, "0");
      sama([nilaiId(t, `${pre}-t${r + 1}1`), nilaiId(t, `${pre}-t${r + 1}2`)], [`Pukul ${jj}.${mm}`, `${sudutJam(j, m)}°`], `tabel ${pre} baris ${r + 1}`);
      cek(sudutJam(j, m) === besar, `tabel ${pre} baris ${r + 1}: kunci ${besar}`);
    });
  };
  tab("berlatih-jam-1", "tj", JAM1);
  tab("berlatih-jam-2", "tn", JAM2);
  // Empat jam pada tiap soal digambar dengan jarum sesuai waktu (diuji lewat periksaGeometri), dan label sudut terisi pada akhir adegan.
  const jm = akhirAdegan(adegan(M, "berlatih-jam-1"), 3);
  sama(["a", "b", "c", "d"].map((h) => nilaiId(jm, `jm${h}-n`)), JAM1.map(([, , b]) => `${b}°`), "Ayo Berlatih 1: label sudut empat jam");
  const jn = akhirAdegan(adegan(M, "berlatih-jam-2"), 2);
  sama(["a", "b", "c", "d"].map((h) => nilaiId(jn, `jn${h}-n`)), JAM2.map(([, , b]) => `${b}°`), "Ayo Berlatih 2: label sudut empat jam");
  // Tantangan: sudut refleks.
  const t = akhirAdegan(adegan(M, "tantangan-refleks"));
  sama(nilaiId(akhirAdegan(adegan(M, "tantangan-refleks"), 2), "tc-n"), "240°", "tantangan: sudut refleks 240");
  sama([nilaiId(t, "w1-t1"), nilaiId(t, "w2-t1")], ["180° + 60° = 240°", "360° - 120° = 240°"], "tantangan: dua cara");
  // Jenis lain: skala 0..360, proporsi bagian.
  const g = akhirAdegan(adegan(M, "jenis-lain"));
  sama([objId(g, "ga1")?.w, objId(g, "ga2")?.w, objId(g, "ga3")?.w], [65, 65, 130], "tujuh jenis sudut: lebar bagian sebanding 90, 90, 180 derajat");
  // Eksplorasi siku-siku: sudut siku-siku 90.
  sama(nilaiId(akhirAdegan(adegan(M, "eks-siku-jodoh"), 1), "sk-n"), "90°", "siku-siku diukur 90 derajat");
  // Salah baca: skala luar 55, dalam 125.
  const sb = akhirAdegan(adegan(M, "salah-baca"), 1);
  sama([nilaiId(sb, "bs-o"), nilaiId(sb, "bs-d")], ["55° ✗", "125° ✓"], "salah baca skala: 55 salah, 125 benar");
  const [luarSkala, dalamSkala] = ["bs-lo2", "bs-li2"].map((id) => Number(nilaiId(sb, id)));
  cek(luarSkala + dalamSkala === 180, "dua skala pada arah yang sama berjumlah 180");
  // Metode luar: tabel kipas, sudut 85, patokan 240, putaran, jam.
  const pk = akhirAdegan(adegan(U, "luar-protokol-terapan"));
  KIPAS.forEach((b, r) => sama([nilaiId(pk, `pk-t${r + 1}1`), nilaiId(pk, `pk-t${r + 1}2`)], [`${b}°`, b > 90 ? "lebih dari 90°" : "kurang dari 90°"], `metode luar tabel kipas ${r + 1}`));
  const rz = akhirAdegan(adegan(U, "luar-patokan-terapan"));
  hampir(objId(rz, "rz-p")?.x ?? 0, 20 + 240 * (260 / 360), 0.5, "metode luar: penanda 240 pada skala 0 sampai 360");
  sama([objId(rz, "rz1")?.w, objId(rz, "rz2")?.w], [130, 130], "metode luar: 180 dan 180 pada skala patokan");
  // Degree Measure: pecahan dan juring.
  const dt = (k, id) => nilaiId(akhirAdegan(adegan(U, "luar-derajat-terapan"), k), id);
  sama([dt(0, "dt1-n"), dt(1, "dt2-n"), dt(2, "dp1-n"), dt(3, "ds1-n")], ["120°", "240°", "135°", "90°"], "Degree Measure: nilai juring");
  cek(120 / 360 === 1 / 3 && 240 / 360 === 2 / 3 && 135 / 360 === 3 / 8 && 360 / 4 === 90, "Degree Measure: sepertiga, dua pertiga, tiga perdelapan, seperempat");
  const dq = akhirAdegan(adegan(U, "luar-derajat-terapan"));
  sama([1, 2, 3, 4].map((i) => nilaiId(dq, `dq${i}-n`)), KIPAS.map((b) => `${b}°`), "Degree Measure: juring empat kipas");
  // Clock Face Division: jarak ruas dikali 30.
  const cj = akhirAdegan(adegan(U, "luar-muka-jam-terapan"), 1);
  const ruas = (j, m) => {
    const hp = ((j % 12) + m / 60) % 12;
    const mp = m / 5;
    const d = Math.abs(hp - mp);
    return Math.min(d, 12 - d);
  };
  [["a", 10, 0], ["b", 15, 0], ["c", 7, 0]].forEach(([h, j, m]) => {
    const r = ruas(j, m);
    sama(nilaiId(cj, `cj${h}-m`), `${r} × 30° = ${r * 30}°`, `Clock Face Division pukul ${j}.${m}`);
  });
  sama([ruas(4, 30), ruas(1, 30), ruas(7, 0)], [1.5, 4.5, 5], "jarak ruas pukul 04.30, 01.30, dan 07.00");
  sama(nilaiId(akhirAdegan(adegan(U, "luar-muka-jam-terapan"), 3), "cm-m"), "1,5 × 30° = 45°", "Clock Face Division pukul 04.30");
  sama(nilaiId(akhirAdegan(adegan(U, "luar-muka-jam-terapan"), 4), "cn-m"), "4,5 × 30° = 135°", "Clock Face Division pukul 01.30");
  sama([nilaiId(akhirAdegan(adegan(U, "luar-muka-jam-terapan"), 2), "ck-m"), nilaiId(akhirAdegan(adegan(U, "luar-muka-jam-terapan"), 2), "cl-m")], ["5 × 30° = 150°", "7 × 30° = 210°"], "pukul 07.00 dari dua arah");
  cek(360 / 12 === 30 && 30 / 2 === 15, "muka jam: 360 dibagi 12 sama dengan 30, setengah ruas 15");
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
  // Buku Siswa hlm. 175-182 (PDF 191-198) dan Refleksi hlm. 187 (PDF 203); Panduan Guru hlm. 262-268 (PDF 274-280).
  const bagian = existsSync(bs) && existsSync(bg) ? [ambil(bs, 191, 198), ambil(bs, 203, 203), ambil(bg, 274, 280)] : [null];
  if (bagian.some((b) => b === null)) console.log("PDF atau pdftotext tidak tersedia: pemeriksaan kutipan buku dilewati");
  else {
    const bersih = (t) => t.toLowerCase().replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim();
    const buku = bersih(bagian.join("\n"));
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
  const berkas = readdirSync(folder).filter((f) => /^(k5b6c-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|k5b6c-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k5b6c sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k5b6c.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_C56|video-k4b2-umum/.test(pembungkus) && /VIDEO_MATERI_K5B6C/.test(pembungkus) && /VIDEO_LUAR_K5B6C/.test(pembungkus) && /export function VideoK5B6C/.test(pembungkus) && /DaftarVideoCerita/.test(pembungkus) && /keVideoSiap/.test(pembungkus), "video-k5b6c: memakai dua video baru, bukan naskah dan visual lama");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Pemeriksaan geometri: ${stat.busur} busur, ${stat.kipas} juring kipas, ${stat.jam} jam, ${stat.skala} skala busur derajat, ${stat.siku} tanda siku-siku, ${stat.label} label sudut, ${stat.rumus} rumus, ${stat.teksPasang} pasangan teks`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
