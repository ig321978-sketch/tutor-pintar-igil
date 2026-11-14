// Uji Story Kelas 5 Bab 4 Sub-Bab C (keliling segi empat): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// teks bertumpuk, pemisahan materi dan metode luar, tidak membocorkan materi subbab berikutnya, kutipan buku (bila PDF ada),
// hitungan mandiri (keliling tujuh segi empat, panjang sisi dari titik gambar, label sisi, ruas lurus, tabel kunci),
// emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k5b4c.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k5b4c-video.ts");
const G = await import("../src/components/modul/story/k5b4c-gambar.ts");
const M3 = await import("../src/components/modul/story/k5b4c-materi-3.ts");

const stat = { bangun: 0, label: 0, teksPasang: 0, persamaan: 0 };
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
// Ukuran sisi dari Buku Siswa hlm. 118 sampai 121 (urutan: sisi bergantian searah jarum jam) dan hasil keliling dari Panduan Guru hlm. 141 sampai 165.
const SISI_BUKU = { pp: [5, 3, 5, 3], jg: [5, 3, 5, 3], ll: [2, 4, 4, 2], ps: [3, 3, 3, 3], bk: [3, 3, 3, 3], tr: [2, 5, 3, 4], ss: [5, 4, 2, 3] };
const jml = (a) => a.reduce((t, x) => t + x, 0);
// Panduan Guru hlm. 146 menulis layang-layang 2 + 2 + 4 + 4 = 16 lalu "14 cm": keduanya salah, hitungan benar 12.
const KELILING = { pp: 16, jg: 16, ll: 12, ps: 12, bk: 12, tr: 14, ss: 14 };
for (const kode of Object.keys(SISI_BUKU)) sama(jml(SISI_BUKU[kode]), KELILING[kode], `keliling ${kode} dari jumlah sisi buku`);
cek(2 + 2 + 4 + 4 !== 16 && 2 + 2 + 4 + 4 !== 14 && 2 * 2 + 2 * 4 === 12, "layang-layang: 16 dan 14 di Panduan Guru hlm. 146 keliru, hitungan benar 12");
sama(M3.KUNCI_KELILING, KELILING, "kunci keliling di berkas materi sama dengan hitungan mandiri");
// Rumus pintasan: dua pasang sisi sama dan empat sisi sama.
sama([2 * (5 + 3), 2 * (5 + 3), 2 * (2 + 4), 4 * 3, 4 * 3], [16, 16, 12, 12, 12], "rumus dua pasang sisi sama dan empat sisi sama");
// Pemaksaan empat kali sisi pada persegi panjang salah; luas bukan keliling.
cek(4 * 5 === 20 && 20 !== KELILING.pp && 5 * 3 === 15 && 15 !== KELILING.pp && 3 * 3 === 9 && 9 !== KELILING.ps, "pintasan dan perkalian panjang kali lebar tidak sama dengan keliling");

/* ------------------------------ Geometri gambar ------------------------------ */
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
const jauh = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const kelilingPx = (t) => jml(t.map((a, i) => jauh(a, t[(i + 1) % t.length])));
const jalurDari = (objs, id) => titikJalur(objs.find((o) => o.id === id));
const KODE = Object.keys(G.BANGUN_C);
/** Kenali segi empat dari titik gambar: kode bangun dan skala piksel per sentimeter. */
const kenaliBangun = (o) => {
  const t = titikJalur(o);
  if (!t || t.length !== 4) return null;
  const mx = Math.min(...t.map((p) => p[0]));
  const my = Math.min(...t.map((p) => p[1]));
  const rel = t.map(([x, y]) => [x - mx, y - my]);
  for (const kode of KODE) {
    const E = G.BANGUN_C[kode].p;
    const lebarE = Math.max(...E.map((p) => p[0]));
    const lebarO = Math.max(...rel.map((p) => p[0]));
    const s = lebarO / lebarE;
    if (!(s > 0)) continue;
    if (E.every(([x, y], i) => Math.abs(rel[i][0] - x * s) < 0.08 && Math.abs(rel[i][1] - y * s) < 0.08)) return { kode, s, rel };
  }
  return null;
};

// Tujuh segi empat: sisi dari titik, keliling, dan kesesuaian dengan buku.
for (const kode of KODE) {
  const b = G.BANGUN_C[kode];
  sama(jml(b.sisi), KELILING[kode], `keliling ${kode} dari sisi terdaftar`);
  hampir(b.keliling, KELILING[kode], 1e-9, `keliling ${kode} di daftar gambar`);
  const nyata = G.panjangSisi(b.p);
  if (b.tepat) {
    nyata.forEach((n, i) => hampir(n, b.sisi[i], 1e-9, `sisi ke-${i} bangun ${kode} dari titik`));
    hampir(G.kelilingTitik(b.p), KELILING[kode], 1e-9, `keliling bangun ${kode} dari titik`);
  }
  // Sisi dari buku sama (sebagai himpunan) dengan sisi bangun.
  sama(b.sisi.slice().sort((p, q) => p - q), SISI_BUKU[kode].slice().sort((p, q) => p - q), `himpunan sisi ${kode} sama dengan buku`);
  stat.bangun += 1;
}
// Pola sisi sama: dua pasang berhadapan (pp, jg), dua pasang bersebelahan (ll), empat sama (ps, bk), tidak ada yang sama (tr, ss).
{
  const s = (kode) => G.BANGUN_C[kode].sisi;
  sama([s("pp")[0] === s("pp")[2] && s("pp")[1] === s("pp")[3], s("jg")[0] === s("jg")[2] && s("jg")[1] === s("jg")[3]], [true, true], "persegi panjang dan jajargenjang: sisi berhadapan sama");
  cek(s("ll")[0] === s("ll")[3] && s("ll")[1] === s("ll")[2] && s("ll")[0] !== s("ll")[1], "layang-layang: sisi yang sama saling bersebelahan, bukan berhadapan (catatan Panduan Guru hlm. 145)");
  cek(new Set(s("ps")).size === 1 && new Set(s("bk")).size === 1, "persegi dan belah ketupat: empat sisi sama");
  cek(new Set(s("tr")).size === 4 && new Set(s("ss")).size === 4, "trapesium dan segi empat sembarang: tidak ada sisi yang sama");
  // Trapesium 2, 5, 3, 4: sisi sejajar 2 dan 3 selisih 1, kaki 4 dan 5; 1 + 4 = 5 sehingga segitiga bantu rata (gambar buku skematik).
  cek(Math.abs(3 - 2) + 4 === 5, "trapesium 2, 5, 3, 4: segitiga bantu 1, 4, 5 rata (tidak ada trapesium sungguhan)");
  // Segi empat sembarang 5, 4, 2, 3 ada: sisi terpanjang kurang dari jumlah tiga sisi lain.
  cek(5 < 4 + 2 + 3, "segi empat sembarang 5, 4, 2, 3 dapat digambar");
}

/* ------------------------------ Isi dua video ------------------------------ */
const VIDEO = [V.VIDEO_MATERI_K5B4C, V.VIDEO_LUAR_K5B4C];
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
          const isi = o.isi ?? "";
          const sel = isi.match(/^(\d+)((?: \+ \d+)+)$/);
          if (sel) stat.bangun += 0;
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
const M = V.VIDEO_MATERI_K5B4C;
const U = V.VIDEO_LUAR_K5B4C;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const nilaiId = (objs, id) => objs.find((o) => o.id === id)?.isi;
const hitung = (rumus) => Function(`"use strict"; return (${rumus.split("=").map((x) => x.trim()).filter(Boolean)[0].replace(/×/g, "*")});`)();
{
  const teksVideo = (v) => JSON.stringify(seluruhTeks(v));
  const NAMA_METODE = /Rectangle Formula|Square Shortcut|Not Area Product|Straight Line Unrolling|metode luar|metode dari luar/i;
  const materi = teksVideo(M);
  const luar = teksVideo(U);
  cek(!NAMA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of ["Rectangle Formula", "Square Shortcut", "Not Area Product", "Straight Line Unrolling"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(M.adegan.every((a) => /(Buku Siswa|Panduan Guru) hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(U.adegan.every((a) => /metode luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  for (const kata of ["Subbab C", "Eksplorasi 4.3A", "Eksplorasi 4.3B", "Eksplorasi 4.3C", "Eksplorasi 4.3D", "Eksplorasi 4.3E", "Ayo Mengingat Kembali", "persegi panjang", "jajargenjang", "layang-layang", "belah ketupat", "trapesium", "segi empat sembarang", "sisi alas", "sisi samping", "sisi pendek", "sisi panjang", "penggaris", "Refleksi", "Apersepsi", "Pemanasan", "penemuan terbimbing", "keliru", "sentimeter"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-rf", "luar-rf-terapan", "luar-ss", "luar-ss-terapan", "luar-nap", "luar-nap-terapan", "luar-slu", "luar-slu-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk empat metode");
  cek(M.adegan.length === 11 && U.adegan.length === 10, "11 adegan materi dan 10 adegan metode luar");
  // Sub-Bab C tidak membocorkan subbab berikutnya (segi banyak dan bangun gabungan) ataupun Uji Kompetensi, pengayaan, remedial, dan Refleksi di luar nomor 6 sampai 12.
  const BOCOR = /segi banyak|segi lima|segi enam|segi delapan|beraturan|gabungan|dekomposisi|denah|Uji Kompetensi|pengayaan|remedial|miskonsepsi/i;
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  for (const a of M.adegan) cek(!BOCOR.test(teksAdegan(a)), `materi ${a.id} tidak membocorkan materi subbab berikutnya`);
  for (const a of U.adegan) cek(!BOCOR.test(teksAdegan(a)), `metode luar ${a.id} tidak membocorkan materi subbab berikutnya`);
  cek(!/Refleksi,? nomor (satu|dua|tiga|empat|lima|tiga belas|empat belas|lima belas|enam belas|tujuh belas|delapan belas|sembilan belas|dua puluh)\b/i.test(materi + luar), "Refleksi hanya nomor 6 sampai 12");
  cek(totalKetukan >= 80, `total ketukan cukup dalam (${totalKetukan})`);
}

/* ------------------------------ Label sisi di gambar sesuai bentuk dan buku ------------------------------ */
{
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((_, i) => {
        const t = akhirAdegan(a, i);
        const poli = new Map();
        for (const o of t) {
          if (o.t !== "jalur") continue;
          const kb = kenaliBangun(o);
          if (kb) poli.set(o.id, kb);
        }
        for (const o of t) {
          const m = /^(.+?)-l(\d)$/.exec(o.id);
          if (!m || o.t !== "teks") continue;
          const angka = /^(\d+(?:\.\d+)?)(?: cm)?$/.exec(o.isi ?? "");
          if (!angka) continue;
          const kb = poli.get(m[1]) ?? poli.get(m[1].replace(/\d+$/, ""));
          cek(!!kb, `${v.id}/${a.id}#${i + 1}: label ${o.id} ("${o.isi}") punya bangun`);
          if (!kb) continue;
          const sisiBuku = G.BANGUN_C[kb.kode].sisi[Number(m[2])];
          sama(Number(angka[1]), sisiBuku, `${v.id}/${a.id}#${i + 1}: label ${o.id} sama dengan sisi ${kb.kode} ke-${m[2]}`);
          if (G.BANGUN_C[kb.kode].tepat) {
            const e = [...Array(4).keys()].map((q) => jauh(kb.rel[q], kb.rel[(q + 1) % 4]) / kb.s);
            hampir(e[Number(m[2])], Number(angka[1]), 0.02, `${v.id}/${a.id}#${i + 1}: panjang gambar sisi ${m[2]} bangun ${kb.kode} sama dengan label`);
          }
          stat.label += 1;
        }
        for (const [, kb] of poli) stat.bangun += kb ? 1 : 0;
      });
    }
  }
  cek(stat.label >= 70, `jumlah label sisi yang diperiksa (${stat.label})`);
}

/* ------------------------------ Semua persamaan di gambar dihitung ulang ------------------------------ */
{
  let n = 0;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((_, i) => {
        for (const o of akhirAdegan(a, i)) {
          if (o.t !== "teks" || !o.isi) continue;
          const m = o.isi.match(/^([\d\s+×()/]+(?:=\s*[\d\s+×()/]+)+)/);
          if (!m) continue;
          const nilai = m[1].split("=").map((s) => Function(`"use strict"; return (${s.trim().replace(/×/g, "*") || "NaN"});`)());
          n += 1;
          cek(nilai.every((x) => Math.abs(x - nilai[0]) < 1e-9), `${v.id}/${a.id}#${i + 1}: persamaan "${o.isi}" benar (${nilai.join(" ; ")})`);
        }
      });
    }
  }
  stat.persamaan = n;
  cek(n >= 25, `jumlah persamaan yang diperiksa (${n})`);
}

/* ------------------------------ Hitungan isi, dihitung mandiri ------------------------------ */
{
  // Pembuka Sub-Bab C: empat jam pelajaran (Panduan Guru hlm. 116), tujuh bangun.
  sama(nilaiId(akhirAdegan(adegan(M, "pembuka-c"), 4), "jp-t0"), "4 JP", "pembuka: empat jam pelajaran");
  sama([1, 2, 3, 4, 5, 6, 7].map((i) => nilaiId(akhirAdegan(adegan(M, "pembuka-c"), 3), `u${i}-n0`)), ["persegi panjang", "jajargenjang", "layang-layang", "persegi", "belah ketupat", "trapesium", "segi empat"], "urutan tujuh bangun di pembuka");

  // Eksplorasi 4.3A: persegi panjang 5 kali 3.
  {
    const a = adegan(M, "eks-43a-ukur");
    const t0 = akhirAdegan(a, 0);
    sama([nilaiId(t0, "pp-l0"), nilaiId(t0, "pp-l3")], ["5 cm", "3 cm"], "4.3A: sisi yang diketahui 5 dan 3");
    const t1 = akhirAdegan(a, 1);
    sama([nilaiId(t1, "pp-l1"), nilaiId(t1, "pp-l2")], ["3 cm", "5 cm"], "4.3A: sisi yang berhadapan sama panjang");
    const t3 = akhirAdegan(a, 3);
    const rantai = ["g0", "g1", "g2", "g3"].map((id) => hitung(nilaiId(t3, id)));
    sama(rantai, [16, 16, 16, 16], "4.3A: rantai persamaan 5 + 3 + 5 + 3 sampai 10 + 6 bernilai 16");
    const t4 = akhirAdegan(a, 4);
    sama([nilaiId(t4, "g4"), nilaiId(t4, "g5")], ["= 16", "Keliling = 16 cm"], "4.3A: hasil 16 cm");
    sama(hitung(nilaiId(akhirAdegan(a, 2), "j4")), KELILING.pp, "4.3A: jumlah berkeliling 5 + 3 + 5 + 3");
    hampir(kelilingPx(jalurDari(akhirAdegan(a, 0), "pp")) / 20, KELILING.pp, 0.02, "4.3A: keliling gambar persegi panjang");
  }
  // Rumus persegi panjang: pasangan sisi sama dan pengali dua.
  {
    const t = akhirAdegan(adegan(M, "eks-43a-rumus"), 2);
    sama([nilaiId(t, "pk5"), nilaiId(t, "pk6")], ["2 pasang sisi sama", "tiap sisi dikali 2"], "rumus: pasangan sisi dan pengali");
  }
  // Jajargenjang 5 dan 3.
  {
    const a = adegan(M, "eks-43b-jajargenjang");
    const t = akhirAdegan(a, 2);
    sama(["h1", "h2", "h3", "h4"].map((id) => hitung(nilaiId(t, id))), [16, 16, 16, 16], "jajargenjang: rantai persamaan bernilai 16");
    sama(nilaiId(t, "h5"), "= 16", "jajargenjang: hasil 16");
    const t4 = akhirAdegan(a, 3);
    sama([nilaiId(t4, "la"), nilaiId(t4, "ls"), nilaiId(t4, "hk")], ["sisi alas", "sisi samping", "Keliling = 16 cm"], "jajargenjang: sisi alas, sisi samping, 16 cm");
    sama(nilaiId(akhirAdegan(a, 4), "rc"), "(2 × 5) + (2 × 3) = 16", "jajargenjang: rumus dengan angka buku");
    hampir(kelilingPx(jalurDari(akhirAdegan(a, 0), "jg")) / 22, KELILING.jg, 0.02, "jajargenjang: keliling gambar");
  }
  // Layang-layang 2 dan 4: hitungan benar 12, Panduan Guru hlm. 146 menulis 16 dan 14.
  {
    const a = adegan(M, "eks-43b-layang");
    const t = akhirAdegan(a, 4);
    sama([nilaiId(t, "w1"), nilaiId(t, "w2")], ["2 + 2 + 4 + 4 = 12", "(2 × 2) + (2 × 4) = 4 + 8 = 12"], "layang-layang: hitungan benar 12");
    sama(nilaiId(t, "w3-t0"), "Panduan Guru hlm. 146 menulis 16,", "layang-layang: kutipan kunci keliru, baris 1");
    sama(nilaiId(t, "w3-t1"), "lalu 14 cm: keduanya keliru", "layang-layang: kutipan kunci keliru, baris 2");
    sama(nilaiId(akhirAdegan(a, 5), "lk"), "= 12 cm", "layang-layang: hasil akhir 12 cm");
    hampir(kelilingPx(jalurDari(akhirAdegan(a, 0), "ll")) / 17, KELILING.ll, 0.02, "layang-layang: keliling gambar");
    const t2 = akhirAdegan(a, 1);
    sama([nilaiId(t2, "ll-l0"), nilaiId(t2, "ll-l1"), nilaiId(t2, "ll2-l2"), nilaiId(t2, "ll2-l3")], ["2 cm", "4 cm", "4 cm", "2 cm"], "layang-layang: empat label sisi");
  }
  // Persegi 3: empat sisi sama.
  {
    const a = adegan(M, "eks-43c-persegi");
    const t = akhirAdegan(a, 1);
    sama([0, 1, 2, 3].map((i) => nilaiId(t, `ps-l${i}`)), ["3 cm", "3 cm", "3 cm", "3 cm"], "persegi: empat sisi 3 cm");
    const t2 = akhirAdegan(a, 2);
    sama(["e1", "e2", "e3"].map((id) => hitung(nilaiId(t2, id))), [12, 12, 12], "persegi: 3 + 3 + 3 + 3 = 4 × 3 = 12");
    sama(nilaiId(akhirAdegan(a, 3), "pc"), "Keliling persegi = 12 cm", "persegi: hasil 12 cm");
    hampir(kelilingPx(jalurDari(akhirAdegan(a, 0), "ps")) / 30, KELILING.ps, 0.02, "persegi: keliling gambar");
  }
  // Belah ketupat 3.
  {
    const a = adegan(M, "eks-43d-belah-ketupat");
    sama([0, 1, 2, 3].map((i) => nilaiId(akhirAdegan(a, 1), `bk-l${i}`)), ["3 cm", "3 cm", "3 cm", "3 cm"], "belah ketupat: empat sisi 3 cm");
    sama(["e1", "e2", "e3"].map((id) => hitung(nilaiId(akhirAdegan(a, 2), id))), [12, 12, 12], "belah ketupat: 3 + 3 + 3 + 3 = 4 × 3 = 12");
    hampir(kelilingPx(jalurDari(akhirAdegan(a, 0), "bk")) / 22, KELILING.bk, 0.02, "belah ketupat: keliling gambar");
  }
  // Trapesium 4 + 2 + 5 + 3 dan segi empat sembarang 2 + 3 + 4 + 5.
  {
    const a = adegan(M, "eks-43e-trapesium");
    const t = akhirAdegan(a, 3);
    sama([hitung(nilaiId(t, "h1")), hitung(nilaiId(t, "h3"))], [14, 14], "trapesium: dua urutan menjumlah bernilai 14");
    sama(nilaiId(t, "h2"), "Keliling trapesium = 14 cm", "trapesium: 14 cm");
    const b = adegan(M, "eks-43e-sembarang");
    sama(hitung(nilaiId(akhirAdegan(b, 2), "j1")), 14, "segi empat sembarang: 2 + 3 + 4 + 5 = 14");
    hampir(kelilingPx(jalurDari(akhirAdegan(b, 0), "ss")) / 24, KELILING.ss, 0.02, "segi empat sembarang: keliling gambar");
    // Kotak kesimpulan Buku Siswa hlm. 121 keliru: 4 kali panjang sisi untuk sisi tidak sama.
    const t5 = akhirAdegan(b, 4);
    sama([nilaiId(t5, "kk1-t1"), nilaiId(t5, "kk3-t1")], ["Keliling = 4 × panjang sisi", "Keliling = sisi 1 + sisi 2 + sisi 3 + sisi 4"], "kotak kesimpulan keliru dan yang benar");
    cek(4 * 5 !== KELILING.ss && 4 * 5 !== 14, "empat kali sisi terpanjang tidak sama dengan keliling segi empat sembarang");
  }
  // Ringkasan rumus dan Refleksi 6 sampai 12.
  {
    const a = adegan(M, "ringkasan-refleksi");
    const t = akhirAdegan(a, 0);
    sama([1, 2, 3, 4, 5, 6, 7].map((r) => nilaiId(t, `tb-t${r}0`)), ["persegi panjang", "jajargenjang", "layang-layang", "persegi", "belah ketupat", "trapesium", "segi empat sembarang"], "tabel rumus: tujuh bangun");
    sama([4, 5].map((r) => nilaiId(t, `tb-t${r}1`)), ["4 × panjang sisi", "4 × panjang sisi"], "tabel rumus: persegi dan belah ketupat empat kali sisi");
    sama([6, 7].map((r) => nilaiId(t, `tb-t${r}1`)), ["sisi 1 + sisi 2 + sisi 3 + sisi 4", "sisi 1 + sisi 2 + sisi 3 + sisi 4"], "tabel rumus: trapesium dan segi empat sembarang menjumlah semua sisi");
    const rf = akhirAdegan(a, 4);
    sama([0, 1, 2, 3, 4, 5, 6].map((i) => (nilaiId(rf, `rf${i}-t0`) ?? "").match(/^\d+/)?.[0]), ["6", "7", "8", "9", "10", "11", "12"], "tujuh butir refleksi bernomor 6 sampai 12");
  }
  // Pembuka metode luar: angka buku.
  {
    const t = akhirAdegan(adegan(U, "luar-pembuka"), 3);
    sama([0, 1, 2, 3, 4, 5, 6].map((i) => nilaiId(t, `ag${i}-t1`)), ["5 dan 3", "5 dan 3", "2 dan 4", "sisi 3", "sisi 3", "2, 5, 3, 4", "5, 4, 2, 3"], "pembuka luar: angka dari buku");
  }
  // Rectangle Formula.
  {
    const a = adegan(U, "luar-rf-terapan");
    sama([hitung(nilaiId(akhirAdegan(a, 0), "e1")), hitung(nilaiId(akhirAdegan(a, 0), "e2"))], [8, KELILING.pp], "RF persegi panjang: 5 + 3 = 8, 2 × 8 = 16");
    sama([hitung(nilaiId(akhirAdegan(a, 1), "f1")), hitung(nilaiId(akhirAdegan(a, 1), "f2"))], [8, KELILING.jg], "RF jajargenjang: 8 dan 16");
    sama([hitung(nilaiId(akhirAdegan(a, 2), "g1")), hitung(nilaiId(akhirAdegan(a, 2), "g2"))], [6, KELILING.ll], "RF layang-layang: 6 dan 12");
    sama(hitung(nilaiId(akhirAdegan(a, 3), "g3")), 12, "RF layang-layang diperiksa dengan cara lain: 12");
    const t = akhirAdegan(a, 4);
    sama([1, 2, 3].map((r) => [nilaiId(t, `hs-t${r}0`), Number(nilaiId(t, `hs-t${r}1`).split(" ")[0])]), [["persegi panjang", 16], ["jajargenjang", 16], ["layang-layang", 12]], "tabel hasil Rectangle Formula");
    const b = akhirAdegan(adegan(U, "luar-rf"), 1);
    sama([nilaiId(b, "t1"), nilaiId(b, "t2")], ["p + l", "p + l"], "RF: dua setengah jalan p + l");
  }
  // Square Shortcut.
  {
    const a = adegan(U, "luar-ss-terapan");
    sama([hitung(nilaiId(akhirAdegan(a, 0), "a2")), nilaiId(akhirAdegan(a, 0), "a3")], [12, "12 cm"], "SS persegi: 4 × 3 = 12");
    sama([hitung(nilaiId(akhirAdegan(a, 1), "b2")), nilaiId(akhirAdegan(a, 1), "b3")], [12, "12 cm"], "SS belah ketupat: 4 × 3 = 12");
    const t = akhirAdegan(a, 2);
    sama([hitung(nilaiId(t, "c2")), nilaiId(t, "c4")], [20, "keliling: 16 cm"], "SS dipaksa pada persegi panjang: 20 bukan 16");
    const t4 = akhirAdegan(a, 3);
    sama([hitung(nilaiId(t4, "d1t")), hitung(nilaiId(t4, "d2t"))], [14, 14], "SS tidak berlaku: trapesium dan segi empat sembarang 14");
  }
  // Not Area Product.
  {
    const a = adegan(U, "luar-nap-terapan");
    const t = akhirAdegan(a, 0);
    sama([hitung(nilaiId(t, "a1")), hitung(nilaiId(t, "a3"))], [15, 16], "NAP persegi panjang: 5 × 3 = 15 (keliru), 2 × (5 + 3) = 16 (benar)");
    const b = akhirAdegan(a, 1);
    sama([hitung(nilaiId(b, "b1")), hitung(nilaiId(b, "b3"))], [9, 12], "NAP persegi: 3 × 3 = 9 (keliru), 4 × 3 = 12 (benar)");
  }
  // Straight Line Unrolling: lebar ruas sama dengan panjang sisi, jumlah sama dengan keliling.
  {
    const a1 = akhirAdegan(adegan(U, "luar-slu"), 0);
    sama([0, 1, 2, 3].map((i) => a1.find((o) => o.id === `sr-${i}`).w / 10), [5, 3, 5, 3], "SLU konsep: ruas 5, 3, 5, 3");
    const t = akhirAdegan(adegan(U, "luar-slu-terapan"), 4);
    ["pp", "ll", "tr", "ss"].forEach((kode, r) => {
      const lebar = [0, 1, 2, 3].map((i) => t.find((o) => o.id === `sg${r}-${i}`).w / 11);
      sama(lebar, SISI_BUKU[kode], `SLU ${kode}: lebar ruas sama dengan sisi buku`);
      sama(t.find((o) => o.id === `tot${r}`).isi, `${KELILING[kode]} cm`, `SLU ${kode}: total panjang lurus`);
      const x = t.filter((o) => o.id.startsWith(`sg${r}-`) && o.t === "kotak").map((o) => o.x);
      cek(x.every((v, i) => i === 0 || Math.abs(v - (x[i - 1] + lebar[i - 1] * 11)) < 1e-6), `SLU ${kode}: ruas berurutan rapat`);
    });
    cek(KELILING.tr === KELILING.ss, "trapesium dan segi empat sembarang sama-sama 14");
  }
  // Ringkasan: kunci tujuh bangun.
  {
    const t = akhirAdegan(adegan(U, "luar-ringkas"), 1);
    sama([1, 2, 3, 4, 5, 6, 7].map((r) => [nilaiId(t, `kn-t${r}0`), Number(nilaiId(t, `kn-t${r}1`).split(" ")[0])]), [["persegi panjang", 16], ["jajargenjang", 16], ["layang-layang", 12], ["persegi", 12], ["belah ketupat", 12], ["trapesium", 14], ["segi empat sembarang", 14]], "kunci tujuh bangun di ringkasan");
    const l = akhirAdegan(adegan(U, "luar-ringkas"), 2);
    sama([nilaiId(l, "l1"), nilaiId(l, "l3")], ["2 + 2 + 4 + 4 = 12", "16 dan 14 (salah)"], "ringkasan: layang-layang 12, kunci panduan guru salah");
  }
}

/* ------------------------------ Kutipan buku (bila PDF tersedia) ------------------------------ */
{
  const bs = new URL("../bahan-sd/Matematika-BS-KLS-V.pdf", import.meta.url);
  const bg = new URL("../bahan-sd/Matematika-BG-KLS-V.pdf", import.meta.url);
  const jalur = (u) => u.pathname.replace(/^\/([A-Za-z]:)/, "$1");
  const ambil = (berkas, dari, sampai) => {
    const r = spawnSync("pdftotext", ["-enc", "UTF-8", "-f", String(dari), "-l", String(sampai), "-raw", jalur(berkas), "-"], { encoding: "utf8", maxBuffer: 1 << 26 });
    return r.status === 0 ? r.stdout : null;
  };
  // Buku Siswa hlm. 118-121 = PDF 134-137, Refleksi hlm. 129 = PDF 145; Panduan Guru hlm. 116 = PDF 128, hlm. 138-153 = PDF 150-165.
  const bagian = existsSync(bs) && existsSync(bg) ? [ambil(bs, 134, 137), ambil(bs, 145, 145), ambil(bg, 128, 128), ambil(bg, 150, 165)] : [null];
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
    cek(n >= 60, `jumlah kutipan buku yang diperiksa (${n})`);
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k5b4c-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|k5b4c-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k5b4c sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k5b4c.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_C54|video-k4b2-umum|naskah-k5b4/.test(pembungkus) && /VIDEO_MATERI_K5B4C/.test(pembungkus) && /VIDEO_LUAR_K5B4C/.test(pembungkus) && /export function VideoK5B4C/.test(pembungkus) && /DaftarVideoCerita/.test(pembungkus) && /keVideoSiap/.test(pembungkus), "video-k5b4c: memakai dua video baru, bukan naskah lama");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Pemeriksaan: ${stat.bangun} bangun, ${stat.label} label sisi, ${stat.persamaan} persamaan, ${stat.teksPasang} pasangan teks`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
