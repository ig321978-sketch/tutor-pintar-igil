// Uji Story Kelas 5 Bab 7 Sub-Bab A (ciri-ciri segitiga, termasuk pembuka bab): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// teks bertumpuk, pemisahan materi dan metode luar, kutipan buku (bila PDF ada), hitungan mandiri (sedotan, jumlah sudut, tabel penggolongan),
// geometri gambar (sisi sama, sudut siku-siku dan tumpul, busur sudut), emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k5b7a.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k5b7a-video.ts");
const G = await import("../src/components/modul/story/k5b7a-gambar.ts");

const W_HIJAU = G.W.hijau;
const W_MERAH = G.W.merah;

const stat = { busur: 0, siku: 0, baji: 0, teksPasang: 0 };
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

/* Mesin (logika-story) diuji lengkap di scripts/uji-story-k6b4a.mjs. */
cek(typeof L.keadaanStory === "function" && typeof L.posisiKata === "function", "mesin Story tersedia");

/* ------------------------------ Data buku, ditulis ulang mandiri dari halaman PDF ------------------------------ */
// Percobaan sedotan (hlm. 196): panjang a, b, c lima kelompok.
const SEDOTAN = [[5, 6, 7], [4, 6, 6], [5, 4, 12], [10, 5, 15], [5, 12, 13]];
const jml = (a) => a.reduce((t, x) => t + x, 0);
// Syarat segitiga: dua sisi terpendek harus lebih dari sisi terpanjang.
const bisaSegitiga = ([a, b, c]) => {
  const u = [a, b, c].sort((p, q) => p - q);
  return u[0] + u[1] > u[2];
};
sama(SEDOTAN.map(bisaSegitiga), [true, true, false, false, true], "kelompok sedotan yang bisa menjadi segitiga (kunci Panduan Guru: nomor 1, 2, 5)");
// Uji Kompetensi 1 (hlm. 234): 5, 7, dan 1 cm tidak bisa.
cek(!bisaSegitiga([5, 7, 1]) && 5 + 1 === 6 && 6 < 7, "Uji Kompetensi 1: lima, tujuh, satu tidak bisa membentuk segitiga");

/** Jenis segitiga menurut sudut terbesarnya dan menurut sisi (tepat dua sama = sama kaki). */
const jenisSudut = (s) => (Math.max(...s) < 89.5 ? "lancip" : Math.abs(Math.max(...s) - 90) < 0.5 ? "siku-siku" : "tumpul");
const jenisSisi = (ls) => {
  const [a, b, c] = ls;
  const sm = (p, q) => Math.abs(p - q) < 0.6;
  if (sm(a, b) && sm(b, c)) return "sama sisi";
  if (sm(a, b) || sm(b, c) || sm(a, c)) return "sama kaki";
  return "sembarang";
};

/* ------------------------------ Geometri gambar ------------------------------ */
const bilangan = (d) => (d.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);
/** Titik mutlak segitiga dari objek jalur tertutup tiga titik. */
const titikJalur = (o) => {
  const n = bilangan(o.d ?? "");
  if (!/^M.*L.*L.*Z$/.test(o.d ?? "") || n.length !== 6) return null;
  return [0, 2, 4].map((i) => [(o.x ?? 0) + n[i], (o.y ?? 0) + n[i + 1]]);
};
const jarakT = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
const sudutDi = (t, i) => {
  const p = t[i];
  const u = t[(i + 1) % 3];
  const w = t[(i + 2) % 3];
  const a = [u[0] - p[0], u[1] - p[1]];
  const b = [w[0] - p[0], w[1] - p[1]];
  return (Math.acos((a[0] * b[0] + a[1] * b[1]) / (Math.hypot(...a) * Math.hypot(...b))) * 180) / Math.PI;
};
const sudutSegitiga = (t) => [0, 1, 2].map((i) => sudutDi(t, i));
const sisiSegitiga = (t) => [jarakT(t[0], t[1]), jarakT(t[1], t[2]), jarakT(t[0], t[2])];
/** Besar busur (derajat) dari jalur busur. */
const spanBusur = (o) => {
  const n = bilangan(o.d ?? "");
  if (!/^M[^A]*A/.test(o.d ?? "") || n.length !== 9) return null;
  const awal = (Math.atan2(n[1], n[0]) * 180) / Math.PI;
  const akhir = (Math.atan2(n[8], n[7]) * 180) / Math.PI;
  const sapu = n[6];
  const besar = n[5];
  let span = sapu === 1 ? akhir - awal : awal - akhir;
  span = ((span % 360) + 360) % 360;
  if (besar === 1 && span < 180) span += 360;
  return span;
};
const sedekat = (p, q) => Math.abs(p[0] - q[0]) < 0.6 && Math.abs(p[1] - q[1]) < 0.6;

// titikSisi menghasilkan segitiga dengan sisi yang diminta
for (const s of SEDOTAN.filter(bisaSegitiga)) {
  const [a, b, c] = s;
  const t = G.titikSisi(a, b, c, 10);
  hampir(jarakT(t[0], t[1]), c * 10, 0.01, `titikSisi ${s}: alas c`);
  hampir(jarakT(t[1], t[2]), a * 10, 0.01, `titikSisi ${s}: sisi a`);
  hampir(jarakT(t[0], t[2]), b * 10, 0.01, `titikSisi ${s}: sisi b`);
}

/* ------------------------------ Isi dua video ------------------------------ */
const VIDEO = [V.VIDEO_MATERI_K5B7A, V.VIDEO_LUAR_K5B7A];
const bilanganDari = (t) => (t.match(/\d[\d.]*\d|\d/g) ?? []).map((v) => v.replace(/\./g, ""));
const semuaSidik = new Map();
let totalKetukan = 0;
let totalKata = 0;
/** Perkiraan kotak teks (x1, y1, x2, y2). */
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
      // pemicu kata
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
      // keadaan akhir ketukan
      const akhir = L.keadaanStory(a, i, 9999);
      const sidik = L.sidikKeadaan(akhir);
      cek(sebelumnya === null || sidik !== sebelumnya, `${nama}#${i + 1}: gambar berubah dibanding ketukan sebelumnya`);
      sebelumnya = sidik;
      const kunci = `${v.id}/${a.id}`;
      if (i === a.ketukan.length - 1) {
        const lama = semuaSidik.get(sidik);
        cek(!lama, `${nama}: gambar akhir adegan tidak sama dengan adegan lain (${lama ?? ""})`);
        semuaSidik.set(sidik, kunci);
      }
      // id benda unik dalam satu keadaan
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
          cek(y > 0 && y < 210 && kiri > -4 && kiri + lebar < 304, `${nama}#${i + 1}: teks "${o.isi}" masuk kanvas (x=${x}, y=${y}, lebar=${Math.round(lebar)})`);
          // persamaan murni angka di gambar diperiksa mandiri (penjumlahan)
          const isi = o.isi ?? "";
          if (/^[\d\s×=+]+$/.test(isi) && isi.includes("=") && isi.split("=").length === 2) {
            const [kiriP, kananP] = isi.split("=").map((s) => s.trim());
            const nilai = (s) => (/^\d+(\s*[×+]\s*\d+)*$/.test(s) ? s.split(/\s*([×+])\s*/).reduce((t, bagian, idx, arr) => (/^\d+$/.test(bagian) ? (idx === 0 ? Number(bagian) : arr[idx - 1] === "×" ? t * Number(bagian) : t + Number(bagian)) : t), 0) : NaN);
            cek(nilai(kiriP) === nilai(kananP), `${nama}#${i + 1}: persamaan di gambar "${isi}" salah hitung`);
          }
          // selisih di gambar, bentuk "a - b = c" dan "a - b - c = d"
          const sel = isi.match(/^(\d+)((?: - \d+)+) = (\d+)$/);
          if (sel) cek([...sel[2].matchAll(/ - (\d+)/g)].reduce((t, m) => t - Number(m[1]), Number(sel[1])) === Number(sel[3]), `${nama}#${i + 1}: selisih di gambar "${isi}" salah hitung`);
          // pembagian di gambar, bentuk "a ÷ b = c"
          const bag = isi.match(/^(\d+)° ÷ (\d+) = (\d+)°$|^(\d+) ÷ (\d+) = (\d+)$/);
          if (bag) {
            const [p, q, r] = bag[1] !== undefined ? [bag[1], bag[2], bag[3]] : [bag[4], bag[5], bag[6]];
            cek(Number(p) / Number(q) === Number(r), `${nama}#${i + 1}: pembagian di gambar "${isi}" salah hitung`);
          }
        } else if (o.t === "kotak") cek(x > -2 && y > -2 && x + (o.w ?? 0) < 302 && y + (o.h ?? 0) < 210, `${nama}#${i + 1}: kotak ${o.id} masuk kanvas`);
        else if (o.t === "bulat") cek(x - (o.r ?? 0) > -2 && x + (o.r ?? 0) < 302 && y - (o.r ?? 0) > -2 && y + (o.r ?? 0) < 210, `${nama}#${i + 1}: bulat ${o.id} masuk kanvas`);
        else if (o.t === "jalur") {
          const t = titikJalur(o);
          if (t) cek(t.every((p) => p[0] > -2 && p[0] < 302 && p[1] > -2 && p[1] < 210), `${nama}#${i + 1}: segitiga ${o.id} masuk kanvas`);
        } else if (o.t === "garis" || o.t === "panah") cek(x > -2 && x < 302 && y > -2 && y < 210 && x + (o.x2 ?? 0) > -2 && x + (o.x2 ?? 0) < 302 && y + (o.y2 ?? 0) > -2 && y + (o.y2 ?? 0) < 210, `${nama}#${i + 1}: garis ${o.id} masuk kanvas`);
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
      // geometri: sudut busur sesuai segitiga di titik sudut yang sama, tanda siku-siku tepat 90 derajat, jumlah baji lurus 180
      {
        const segs = akhir.map((o) => ({ o, t: titikJalur(o) })).filter((e) => e.t);
        for (const o of akhir) {
          if (o.t !== "jalur") continue;
          const pusat = [o.x ?? 0, o.y ?? 0];
          const span = spanBusur(o);
          if (span !== null) {
            for (const e of segs) {
              const idx = e.t.findIndex((p) => sedekat(p, pusat));
              if (idx >= 0) stat.busur += 1;
              if (idx >= 0) hampir(span, sudutDi(e.t, idx), 1.6, `${nama}#${i + 1}: busur ${o.id} sama dengan sudut segitiga ${e.o.id} di titik itu`);
            }
          } else if (/^M-?\d+(\.\d+)? 0 L-?\d+(\.\d+)? -?\d+(\.\d+)? L0 -?\d+(\.\d+)?$/.test(o.d ?? "")) {
            const idx = segs.map((e) => ({ e, idx: e.t.findIndex((p) => sedekat(p, pusat)) })).filter((s) => s.idx >= 0);
            if (segs.length > 0) cek(idx.length >= 1, `${nama}#${i + 1}: tanda siku-siku ${o.id} berada di titik sudut sebuah segitiga`);
            stat.siku += idx.length;
            for (const s of idx) hampir(sudutDi(s.e.t, s.idx), 90, 0.6, `${nama}#${i + 1}: tanda siku-siku ${o.id} pada sudut ${Math.round(sudutDi(s.e.t, s.idx))} derajat`);
          }
        }
        const baji = akhir.filter((o) => /-w\d+$/.test(o.id) && o.t === "jalur");
        const kelompokBaji = new Map();
        for (const o of baji) kelompokBaji.set(o.id.replace(/-w\d+$/, ""), [...(kelompokBaji.get(o.id.replace(/-w\d+$/, "")) ?? []), spanBusur(o)]);
        stat.baji += [...kelompokBaji.values()].filter((spans) => spans.length === 3).length;
        for (const [id, spans] of kelompokBaji) if (spans.length === 3) hampir(jml(spans), 180, 0.6, `${nama}#${i + 1}: jumlah tiga baji ${id}`);
      }
    });
  }
}

/* ------------------------------ Pemisahan materi dan metode luar ------------------------------ */
const seluruhTeks = (v) => v.adegan.map((a) => [a.judul, a.sumber, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const M = V.VIDEO_MATERI_K5B7A;
const U = V.VIDEO_LUAR_K5B7A;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const nilaiId = (objs, id) => objs.find((o) => o.id === id)?.isi;
const objId = (objs, id) => objs.find((o) => o.id === id);
{
  const teksVideo = (v) => JSON.stringify(seluruhTeks(v));
  const NAMA_METODE = /Triangle Inequality|Angle Sum|Side-Angle|Inclusive|Theorem|Property|Hierarchy|Classification|metode luar|metode dari luar/i;
  const materi = teksVideo(M);
  const luar = teksVideo(U);
  cek(!NAMA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of ["Triangle Inequality Theorem", "Angle Sum Property", "Side-Angle Classification", "Inclusive Triangle Hierarchy"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(M.adegan.every((a) => /Buku Siswa/.test(a.sumber) && /hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(U.adegan.every((a) => /metode (dari )?luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  for (const kata of ["Bab 7", "Candi Sewu", "Yohana", "Komang", "Nisa", "Asep", "Lukas", "Tujuan", "Peta Konsep", "Kata Kunci", "Eksplorasi 7.1A", "sedotan", "Eksplorasi 7.1B", "Eksplorasi 7.1C", "Eksplorasi 7.1D", "sama kaki", "sama sisi", "sembarang", "Uji Kompetensi", "pengayaan", "Refleksi", "Panduan Guru", "lipatan kertas", "simetri lipat", "simetri putar"]) cek(new RegExp(kata.replace(/\./g, "\\."), "i").test(materi), `video materi memuat ${kata}`);
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-ketaksamaan", "luar-ketaksamaan-terapan", "luar-jumlah", "luar-jumlah-terapan", "luar-klasifikasi", "luar-klasifikasi-terapan", "luar-hierarki", "luar-hierarki-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(M.adegan.length === 11 && U.adegan.length === 10, "11 adegan materi dan 10 adegan metode luar");
  // Subbab A tidak mengajarkan segi empat (itu Subbab B); hanya pembuka bab (Candi Sewu, peta konsep, kata kunci) yang boleh menyebut persegi dan kawan-kawannya.
  const BUKAN_SUBBAB_A = /trapesium|jajargenjang|jajar genjang|belah ketupat|layang|persegi/i;
  cek(!BUKAN_SUBBAB_A.test(luar), "metode luar Subbab A tidak membahas segi empat");
  const bolehMenyebut = ["denah-peta"];
  const materiTanpa = JSON.stringify(M.adegan.filter((a) => !bolehMenyebut.includes(a.id)).map((a) => [a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]));
  cek(!BUKAN_SUBBAB_A.test(materiTanpa), "materi Subbab A di luar denah dan peta konsep tidak membahas segi empat");
  // Uji Kompetensi nomor 5 sampai 10 dan refleksi 6 sampai 10 milik Subbab B.
  cek(!/Uji Kompetensi 5|Refleksi 6|Refleksi 1 sampai 10/i.test(materi), "materi A tidak memakai butir Uji Kompetensi dan refleksi milik Subbab B");
  cek(totalKetukan >= 90, `total ketukan cukup dalam (${totalKetukan})`);
}

/* ------------------------------ Hitungan isi, dihitung mandiri ------------------------------ */
{
  // Tabel hasil percobaan sedotan (hlm. 196 dan kunci Panduan Guru hlm. 295).
  {
    const t = akhirAdegan(adegan(M, "ekspl-71a"));
    SEDOTAN.forEach(([a, b, c], r) => {
      const baris = [0, 1, 2, 3, 4, 5, 6, 7].map((col) => nilaiId(t, `tb-t${r + 1}${col}`));
      sama(baris.slice(0, 4), [String(r + 1), String(a), String(b), String(c)], `tabel sedotan baris ${r + 1}: a, b, c`);
      sama(baris[4], bisaSegitiga([a, b, c]) ? "bisa" : "tidak", `tabel sedotan baris ${r + 1}: bisa atau tidak`);
      sama(baris.slice(5), [String(b + c), String(a + c), String(a + b)], `tabel sedotan baris ${r + 1}: jumlah dua sisi`);
    });
    // contoh nomor 1 di Buku Siswa hlm. 196: 13, 12, 11
    sama([nilaiId(akhirAdegan(adegan(M, "ekspl-71a"), 2), "tb-t15"), nilaiId(akhirAdegan(adegan(M, "ekspl-71a"), 2), "tb-t16"), nilaiId(akhirAdegan(adegan(M, "ekspl-71a"), 2), "tb-t17")], ["13", "12", "11"], "contoh Buku Siswa nomor 1: 13, 12, 11");
  }
  // Adegan syarat: nomor yang bisa dan tidak, serta perbandingan nomor 3, 4, dan 1.
  {
    const s = adegan(M, "syarat-segitiga");
    const a = akhirAdegan(s, 0);
    sama([0, 1, 2, 3, 4].map((i) => nilaiId(a, `l${i}`)), SEDOTAN.map((x) => (bisaSegitiga(x) ? "bisa" : "tidak")), "label nomor bisa atau tidak");
    const tiga = akhirAdegan(s, 1);
    sama([nilaiId(tiga, "e9"), nilaiId(tiga, "e12")], ["5 + 4 = 9", "c = 12"], "nomor 3: a tambah b sembilan, c dua belas");
    const lebar = (o) => o?.w;
    sama([lebar(objId(tiga, "sa-k")), lebar(objId(tiga, "sb-k")), lebar(objId(tiga, "sc-k"))], [55, 44, 132], "nomor 3: lebar sedotan sebanding panjangnya");
    const empat = akhirAdegan(s, 2);
    sama([lebar(objId(empat, "sa-k")), lebar(objId(empat, "sb-k")), lebar(objId(empat, "sc-k"))], [100, 50, 150], "nomor 4: sedotan 10 dan 5 sama panjang dengan 15");
    cek(lebar(objId(empat, "sa-k")) + lebar(objId(empat, "sb-k")) === lebar(objId(empat, "sc-k")), "nomor 4: jumlah dua sedotan sama dengan sisi ketiga");
    const satu = akhirAdegan(s, 3);
    const [a1, b1, c1] = SEDOTAN[0];
    sama([nilaiId(satu, "q1"), nilaiId(satu, "q2"), nilaiId(satu, "q3")], [`${a1} + ${b1} = ${a1 + b1} > ${c1}`, `${b1} + ${c1} = ${b1 + c1} > ${a1}`, `${a1} + ${c1} = ${a1 + c1} > ${b1}`], "nomor 1: tiga perbandingan");
    const gambarTiga = titikJalur(objId(satu, "sg"));
    cek(gambarTiga && [5, 6, 7].every((m) => sisiSegitiga(gambarTiga).some((s) => Math.abs(s - m * 12) < 0.2)), "segitiga nomor 1 digambar dengan sisi 5, 6, dan 7 (skala 12)");
  }
  // Jenis segitiga dari geometri gambar.
  {
    const A = (id, k, idSeg) => titikJalur(objId(akhirAdegan(adegan(M, id), k), idSeg));
    const abc = A("ekspl-71b-lancip", 2, "abc");
    sama(jenisSudut(sudutSegitiga(abc)), "lancip", "segitiga ABC lancip");
    const abc2 = A("ekspl-71b-lancip", 3, "abc");
    const pqr = A("ekspl-71b-lancip", 3, "pqr");
    sama([jenisSudut(sudutSegitiga(abc2)), jenisSudut(sudutSegitiga(pqr))], ["lancip", "lancip"], "segitiga ABC dan PQR sama-sama lancip");
    const def = A("ekspl-71b-siku-tumpul", 0, "def");
    sama(jenisSudut(sudutSegitiga(def)), "siku-siku", "segitiga DEF siku-siku");
    hampir(sudutDi(def, 1), 90, 0.6, "DEF: sudut E 90 derajat");
    const klm = A("ekspl-71b-siku-tumpul", 1, "klm");
    sama(jenisSudut(sudutSegitiga(klm)), "siku-siku", "segitiga KLM siku-siku");
    sama(sudutSegitiga(klm).filter((s) => Math.abs(s - 90) < 0.6).length, 1, "KLM: hanya satu sudut siku-siku");
    const hij = A("ekspl-71b-siku-tumpul", 2, "hij");
    const xyz = A("ekspl-71b-siku-tumpul", 3, "xyz");
    sama([jenisSudut(sudutSegitiga(hij)), jenisSudut(sudutSegitiga(xyz))], ["tumpul", "tumpul"], "segitiga HIJ dan XYZ tumpul");
    sama([sudutSegitiga(hij).filter((s) => s > 90.5).length, sudutSegitiga(xyz).filter((s) => s > 90.5).length], [1, 1], "HIJ dan XYZ: hanya satu sudut tumpul");
    for (const t of [abc, pqr, def, klm, hij, xyz]) hampir(jml(sudutSegitiga(t)), 180, 0.01, "jumlah sudut segitiga gambar 180");
    // sama kaki
    const jkl = A("ekspl-71d-sama-kaki", 0, "jkl");
    sama(jenisSisi(sisiSegitiga(jkl)), "sama kaki", "segitiga JKL sama kaki (LJ sama dengan LK)");
    hampir(sudutDi(jkl, 0), sudutDi(jkl, 1), 0.01, "JKL: sudut J sama dengan sudut K");
    const abck = A("ekspl-71d-sama-kaki", 5, "abc");
    sama([jenisSisi(sisiSegitiga(abck)), jenisSudut(sudutSegitiga(abck))], ["sama kaki", "siku-siku"], "ABC siku-siku sama kaki");
    sama(sudutSegitiga(abck).map((x) => Math.round(x)).sort((m, n) => m - n), [45, 45, 90], "ABC: sudut 45, 45, 90");
    const pqrk = A("ekspl-71d-sama-kaki", 5, "pqr");
    sama([jenisSisi(sisiSegitiga(pqrk)), jenisSudut(sudutSegitiga(pqrk))], ["sama kaki", "tumpul"], "PQR tumpul sama kaki");
    const abck2 = A("ekspl-71d-sama-kaki", 6, "abc");
    sama(jenisSisi(sisiSegitiga(abck2)), "sama kaki", "tantangan: segitiga siku-siku sama kaki");
    // sama sisi dan sembarang
    const pqrs = A("ekspl-71d-sama-sisi", 0, "pqr");
    sama(jenisSisi(sisiSegitiga(pqrs)), "sama sisi", "PQR sama sisi");
    hampir(sudutDi(pqrs, 0), 60, 0.01, "sama sisi: sudut 60");
    const abcs = A("ekspl-71d-sama-sisi", 3, "abc");
    sama(jenisSisi(sisiSegitiga(abcs)), "sembarang", "ABC sembarang: ketiga sisi berbeda");
    cek(sisiSegitiga(abcs).every((s, i, arr) => arr.every((u, j) => i === j || Math.abs(s - u) > 3)), "ABC sembarang: panjang sisi beda jelas");
    const pk = A("banding-kaki-sisi", 0, "sk");
    const ps = A("banding-kaki-sisi", 0, "ss");
    sama([jenisSisi(sisiSegitiga(pk)), jenisSisi(sisiSegitiga(ps))], ["sama kaki", "sama sisi"], "gambar pembanding: sama kaki dan sama sisi");
    // candi (pembuka): dua segitiga pendapat
    const ssp = A("pembuka-candi", 4, "ss");
    const skp = A("pembuka-candi", 4, "sk");
    sama([jenisSisi(sisiSegitiga(ssp)), jenisSisi(sisiSegitiga(skp))], ["sama sisi", "sama kaki"], "pembuka: gambar dua pendapat Komang dan Nisa");
  }
  // Tumpul percobaan Lukas dan baji lurus.
  {
    const j = akhirAdegan(adegan(M, "ekspl-71c"), 2);
    const t1 = titikJalur(objId(j, "t1"));
    sama(jenisSudut(sudutSegitiga(t1)), "tumpul", "segitiga percobaan Lukas tumpul");
    const sp = sudutSegitiga(t1);
    const wedge = [0, 1, 2].map((i) => spanBusur(objId(j, `bj-w${i}`)));
    hampir(wedge[0], Math.max(...sp), 0.2, "baji pertama sama dengan sudut tumpul");
    hampir(jml(wedge), 180, 0.3, "tiga baji Lukas berjumlah 180");
    const asep = akhirAdegan(adegan(M, "ekspl-71c"), 1);
    const w2 = [0, 1, 2].map((i) => spanBusur(objId(asep, `bj-w${i}`)));
    const asep0 = titikJalur(objId(akhirAdegan(adegan(M, "ekspl-71c"), 0), "sg"));
    const sa = sudutSegitiga(asep0);
    sama(w2.map((x) => Math.round(x)), [sa[0], sa[1], sa[2]].map((x) => Math.round(x)), "baji Asep sama dengan sudut A, B, C segitiga lancipnya");
    hampir(jml(w2), 180, 0.3, "tiga baji Asep berjumlah 180");
    // dua sudut siku-siku dan sisa
    const d = akhirAdegan(adegan(M, "ekspl-71c"), 4);
    sama([nilaiId(d, "l1"), nilaiId(d, "l2"), nilaiId(d, "l3")], ["A + B + C = 180°", "90° + 90° + C = 180°", "180° + C = 180°"], "pertanyaan Nisa: tiga baris penalaran");
    cek(180 - 90 - 90 === 0 && nilaiId(akhirAdegan(adegan(M, "ekspl-71c"), 5), "l4") === "C = 0°", "pertanyaan Nisa: sudut ketiga nol");
    cek(2 * 91 > 180 && 2 * 90 === 180, "dua sudut tumpul lebih dari 180 dan dua siku-siku tepat 180");
  }
  // Tantangan dan sama sisi: hitungan sudut.
  {
    const q = akhirAdegan(adegan(M, "ekspl-71d-sama-kaki"), 6);
    sama([nilaiId(q, "q1"), nilaiId(q, "q2"), nilaiId(q, "q3")], ["A + 90° + C = 180°", "A + C = 90°", "A = C = 45°"], "tantangan kaki segitiga siku-siku sama kaki");
    cek((180 - 90) / 2 === 45 && 45 + 45 === 90 && nilaiId(q, "q4") === "45 + 45 = 90", "tantangan: 180 dikurang 90 dibagi dua sama dengan 45");
    const s = akhirAdegan(adegan(M, "ekspl-71d-sama-sisi"), 1);
    sama(nilaiId(s, "e1"), "180° ÷ 3 = 60°", "sama sisi: 180 dibagi 3");
    cek(180 / 3 === 60 && 3 * 60 === 180, "sama sisi: tiap sudut 60");
    // tabel rangkuman menurut sisi
    const r = akhirAdegan(adegan(M, "ekspl-71d-sama-sisi"), 5);
    const baris = (id) => [0, 1, 2, 3, 4].map((c) => nilaiId(r, `${id}-t0${c}`));
    sama(baris("rk1"), ["sama kaki", "≥ 2", "≥ 2", "1", "1"], "rangkuman sama kaki: 2 sisi, 2 sudut, 1 lipat, 1 putar");
    sama(baris("rk2"), ["sama sisi", "3", "3", "3", "3"], "rangkuman sama sisi: 3, 3, 3, 3");
    sama(baris("rk3"), ["sembarang", "0", "0", "0", "1"], "rangkuman sembarang: 0, 0, 0, 1");
    // ciri sama kaki yang dimiliki sama sisi (Panduan Guru hlm. 310)
    const syarat = [2, 2, 1, 1];
    const sisi = [3, 3, 3, 3];
    cek(syarat.every((s, i) => sisi[i] >= s), "setiap ciri sama kaki dimiliki sama sisi (3 paling sedikit sama dengan syaratnya)");
    cek(sisi.some((s) => s > 2), "sama kaki belum tentu sama sisi: ciri tiga tidak menjamin");
  }
  // Uji Kompetensi dan pengayaan.
  {
    const u = akhirAdegan(adegan(M, "uji-refleksi"), 0);
    sama([nilaiId(u, "e6"), nilaiId(u, "e7")], ["5 + 1 = 6", "c = 7"], "Uji Kompetensi 1: lima tambah satu");
    const lebar = (id) => objId(u, id)?.w;
    sama([lebar("sa-k"), lebar("sb-k"), lebar("sc-k")], [55, 11, 77], "Uji Kompetensi 1: lebar sedotan lima, satu, tujuh");
    cek(lebar("sa-k") + lebar("sb-k") < lebar("sc-k"), "Uji Kompetensi 1: a ditambah b lebih pendek dari c");
    const p = akhirAdegan(adegan(M, "uji-refleksi"), 2);
    const t = titikJalur(objId(p, "pg"));
    const sudut = sudutSegitiga(t);
    sama(sudut.map((x) => Math.round(x)).sort((m, n) => m - n), [45, 45, 90], "pengayaan: sudut 45, 45, dan 90");
    sama(jenisSisi(sisiSegitiga(t)), "sama kaki", "pengayaan: segitiga siku-siku sama kaki");
    cek(180 - 45 - 45 === 90 && nilaiId(p, "q1") === "180 - 45 - 45 = 90", "pengayaan: sudut ketiga 90");
    // kunci pengayaan: lancip salah (ada 90), sama kaki benar, siku-siku sama kaki benar
    const lancip = Math.max(...sudut) < 90;
    sama([lancip, jenisSisi(sisiSegitiga(t)) === "sama kaki", jenisSudut(sudut) === "siku-siku" && jenisSisi(sisiSegitiga(t)) === "sama kaki"], [false, true, true], "kunci pengayaan i X, ii centang, iii centang");
  }
  // Metode luar: tabel Triangle Inequality, Angle Sum, grid penggolongan.
  {
    const t = akhirAdegan(adegan(U, "luar-ketaksamaan-terapan"), 2);
    SEDOTAN.forEach(([a, b, c], r) => {
      const urut = [a, b, c].sort((p, q) => p - q);
      const sel = [0, 1, 2, 3, 4].map((col) => nilaiId(t, `lt${r + 1}-t0${col}`));
      sama(sel, [String(r + 1), `${a}, ${b}, ${c}`, `${urut[0]}+${urut[1]}=${urut[0] + urut[1]}`, String(urut[2]), bisaSegitiga([a, b, c]) ? "bisa" : "tidak"], `metode luar tabel baris ${r + 1}`);
    });
    const warna = [1, 2, 3, 4, 5].map((r) => objId(t, `lt${r}-t04`)?.warna);
    sama(warna, SEDOTAN.map((x) => (bisaSegitiga(x) ? W_HIJAU : W_MERAH)), "metode luar: warna hijau untuk bisa, merah untuk tidak");
    const uk = akhirAdegan(adegan(U, "luar-ketaksamaan-terapan"), 3);
    sama([nilaiId(uk, "e6"), nilaiId(uk, "e7"), nilaiId(uk, "lb")], ["1 + 5 = 6", "c = 7", "6 tidak melebihi 7"], "metode luar Uji Kompetensi 1");
    const ak = akhirAdegan(adegan(U, "luar-ketaksamaan"), 3);
    const ok = titikJalur(objId(ak, "ok"));
    cek(ok && [5, 6, 7].every((m) => sisiSegitiga(ok).some((s) => Math.abs(s - m * 12) < 0.2)), "metode luar: contoh segitiga 5, 6, 7");
    sama(nilaiId(ak, "fq"), "10 + 5 = 15", "metode luar: sisi rebah 10 + 5 = 15");
    const w = (id, o) => objId(o, id)?.w;
    cek(w("fa", ak) === undefined && objId(ak, "fa").x2 + objId(ak, "fc").x2 === objId(ak, "fb").x2, "metode luar: panjang a ditambah b sama dengan c pada gambar rebah");
    // Angle sum
    const aj = akhirAdegan(adegan(U, "luar-jumlah-terapan"), 0);
    sama([nilaiId(aj, "q1"), nilaiId(aj, "q2"), nilaiId(aj, "q3")], ["180 - 90 = 90", "90 ÷ 2 = 45", "45° tiap kaki"], "metode luar: sudut kaki siku-siku sama kaki");
    sama(nilaiId(akhirAdegan(adegan(U, "luar-jumlah-terapan"), 1), "q2"), "60 + 60 + 60 = 180", "metode luar: tiga sudut 60");
    sama([nilaiId(akhirAdegan(adegan(U, "luar-jumlah-terapan"), 2), "q1"), nilaiId(akhirAdegan(adegan(U, "luar-jumlah-terapan"), 2), "q2")], ["45 + 45 = 90", "180 - 90 = 90"], "metode luar: pengayaan");
    sama([nilaiId(akhirAdegan(adegan(U, "luar-jumlah-terapan"), 3), "q1"), nilaiId(akhirAdegan(adegan(U, "luar-jumlah-terapan"), 3), "q2")], ["90 + 90 = 180", "180 - 180 = 0"], "metode luar: dua sudut siku-siku");
    // Grid penggolongan: tiap kombinasi dihitung dari aljabar sudut.
    const mungkin = (sudut, sisiJ) => {
      for (let a = 1; a < 180; a += 0.5) for (let b = 1; a + b < 180; b += 0.5) {
        const c = 180 - a - b;
        const ang = [a, b, c];
        const sama2 = (p, q) => Math.abs(p - q) < 0.01;
        const jml2 = (sama2(a, b) ? 1 : 0) + (sama2(b, c) ? 1 : 0) + (sama2(a, c) ? 1 : 0);
        const sisiBeda = jml2 === 3 ? "sama sisi" : jml2 >= 1 ? "sama kaki" : "sembarang";
        const sd = Math.max(...ang) < 90 ? "lancip" : Math.max(...ang) === 90 ? "siku-siku" : "tumpul";
        if (sd === sudut && sisiBeda === sisiJ) return true;
      }
      return false;
    };
    const kg = akhirAdegan(adegan(U, "luar-klasifikasi"), 3);
    const sudutBaris = ["lancip", "siku-siku", "tumpul"];
    const sisiKolom = ["sama sisi", "sama kaki", "sembarang"];
    sudutBaris.forEach((sd, r) => sisiKolom.forEach((ss, c) => sama(nilaiId(kg, `kg-t${r + 1}${c + 1}`), mungkin(sd, ss) ? "✓" : "✗", `grid ${sd} dan ${ss}`)));
    cek(!mungkin("siku-siku", "sama sisi") && 180 / 3 === 60, "siku-siku sama sisi mustahil karena sama sisi berarti 60 derajat");
    // Hierarki: tabel ciri sama kaki dengan nilai sama sisi
    const ht = akhirAdegan(adegan(U, "luar-hierarki-terapan"), 1);
    sama([1, 2, 3, 4].map((i) => nilaiId(ht, `ht${i}-t01`)), ["3", "3", "3", "3"], "hierarki: sama sisi memiliki 3, 3, 3, 3");
    sama([1, 2, 3, 4].map((i) => nilaiId(ht, `ht${i}-t00`)), ["≥ 2 sisi sama", "≥ 2 sudut sama", "≥ 1 simetri lipat", "≥ 1 simetri putar"], "hierarki: empat ciri sama kaki");
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
  const bagian = existsSync(bs) && existsSync(bg) ? [ambil(bs, 207, 224), ambil(bs, 249, 250), ambil(bg, 299, 325), ambil(bg, 351, 355)] : [null];
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
  const berkas = readdirSync(folder).filter((f) => /^(k5b7a-.*)\.(ts|tsx)$/.test(f));
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
    // larangan berbagi visual: berkas k5b7a hanya mengimpor logika dan berkas k5b7a sendiri
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|k5b7a-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k5b7a sendiri (${impor.join(", ")})`);
  }
  // mesin tidak memakai kit visual lama
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k5b7a.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_A57|video-k4b2-umum/.test(pembungkus) && /VIDEO_MATERI_K5B7A/.test(pembungkus) && /VIDEO_LUAR_K5B7A/.test(pembungkus) && /export function VideoK5B7A/.test(pembungkus) && /DaftarVideoCerita/.test(pembungkus) && /keVideoSiap/.test(pembungkus), "video-k5b7a: memakai dua video baru, bukan naskah dan visual lama");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Pemeriksaan geometri: ${stat.busur} busur, ${stat.siku} tanda siku-siku, ${stat.baji} kelompok baji, ${stat.teksPasang} pasangan teks`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
