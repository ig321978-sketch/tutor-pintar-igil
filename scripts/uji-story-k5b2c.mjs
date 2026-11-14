// Uji Story Kelas 5 Bab 2 Sub-Bab C (faktor): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron bilangan suara (kata bilangan) dengan gambar, perubahan gambar tiap ketukan, keunikan antaradegan,
// batas kanvas, teks bertumpuk, pemisahan materi dan metode luar, tidak membocorkan Subbab D (faktor persekutuan, FPB) dan E (faktor prima),
// kutipan buku (bila PDF ada), hitungan mandiri faktor dengan pembagian satu per satu (12, 18, 24, 36, 54, 72, 96), kunci buku yang salah
// (36 tanpa 6, 54 memuat 4 tanpa 6) dicocokkan dengan teks PDF, persamaan di gambar, sisa bagi, geometri gambar (pita yang dipotong,
// lingkaran faktor dan kurung pasangan, kisi susunan, tabel potongan, tangga uji bagi), emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k5b2c.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k5b2c-video.ts");

const stat = { teksPasang: 0, persamaan: 0, sisaBagi: 0, angkaSuara: 0, pita: 0, kisi: 0, lingkaran: 0, kurung: 0, tabel: 0, daftar: 0, ladder: 0, kunci: 0 };
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

/* ------------------------------ Hitungan mandiri (tanpa mengimpor gambar) ------------------------------ */
/** Faktor sebuah bilangan dengan mencoba membagi satu per satu, sama seperti metode buku. */
const faktorDari = (n) => {
  const hasil = [];
  for (let b = 1; b <= n; b += 1) if (n % b === 0) hasil.push(b);
  return hasil;
};
const daftarTeks = (a) => a.join(", ");

/* ------------------------------ Geometri umum ------------------------------ */
const bilangan = (d) => (d.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);
const titikJalur = (o) => {
  const d = o.d ?? "";
  if (!/^M[-\d. L]+ Z$/.test(d)) return null;
  const n = bilangan(d);
  if (n.length < 6 || n.length % 2 !== 0) return null;
  const out = [];
  for (let i = 0; i < n.length; i += 2) out.push([(o.x ?? 0) + n[i], (o.y ?? 0) + n[i + 1]]);
  return out;
};

/* ------------------------------ Kata bilangan di suara ------------------------------ */
const SATUAN = { nol: 0, satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
// Nilai deretan kata bilangan (sampai 999), atau null bila bukan bilangan utuh yang sah.
const nilaiKata = (ws) => {
  let i = 0;
  let total = 0;
  const n = ws.length;
  if (n === 0) return null;
  if (ws[i] === "seratus") {
    total += 100;
    i += 1;
  } else if (i + 1 < n && ws[i] in SATUAN && ws[i + 1] === "ratus") {
    total += SATUAN[ws[i]] * 100;
    i += 2;
  }
  if (i === n) return total || null;
  if (ws[i] === "sepuluh") {
    total += 10;
    i += 1;
  } else if (ws[i] === "sebelas") {
    total += 11;
    i += 1;
  } else if (i + 1 < n && ws[i] in SATUAN && ws[i + 1] === "belas") {
    total += SATUAN[ws[i]] + 10;
    i += 2;
  } else if (i + 1 < n && ws[i] in SATUAN && ws[i + 1] === "puluh") {
    total += SATUAN[ws[i]] * 10;
    i += 2;
    if (i < n && ws[i] in SATUAN && SATUAN[ws[i]] > 0) {
      total += SATUAN[ws[i]];
      i += 1;
    }
  } else if (ws[i] in SATUAN) {
    total += SATUAN[ws[i]];
    i += 1;
  }
  return i === n ? total : null;
};
/** Semua bilangan yang diucapkan dalam kalimat suara (kata bilangan terpanjang yang sah, berhenti di tanda baca). */
const angkaSuara = (suara) => {
  const tok = suara.split(/\s+/).filter(Boolean).map((w) => ({ w: w.toLowerCase().replace(/[^a-z]/g, ""), brk: /[,.:;?!]$/.test(w) }));
  const hasil = [];
  let i = 0;
  while (i < tok.length) {
    let ketemu = false;
    for (let len = Math.min(5, tok.length - i); len >= 1; len -= 1) {
      const seg = tok.slice(i, i + len);
      if (seg.slice(0, -1).some((x) => x.brk)) continue;
      const v = nilaiKata(seg.map((x) => x.w));
      if (v !== null) {
        hasil.push(v);
        i += len;
        ketemu = true;
        break;
      }
    }
    if (!ketemu) i += 1;
  }
  return hasil;
};
sama(angkaSuara("dua puluh empat, tiga puluh enam, dan sembilan puluh enam"), [24, 36, 96], "pemeriksa kata bilangan: puluhan");
sama(angkaSuara("satu kali dua belas sama dengan dua belas"), [1, 12, 12], "pemeriksa kata bilangan: belasan");
sama(angkaSuara("Eksplorasi dua titik tiga A, empat dengan enam"), [2, 3, 4, 6], "pemeriksa kata bilangan: dipisah tanda baca dan kata lain");

/* ------------------------------ Isi dua video ------------------------------ */
const VIDEO = [V.VIDEO_MATERI_K5B2C, V.VIDEO_LUAR_K5B2C];
const digitDari = (t) => (t.match(/\d+/g) ?? []).map(Number);
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
      cek(!/[=×÷<>/%]/.test(kt.suara), `${nama}#${i + 1}: suara tanpa lambang yang sulit dibaca mesin suara`);
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
      // sinkron bilangan: tiap bilangan (kata bilangan atau angka) di suara tampak di gambar pada ketukan ini atau sebelumnya dalam adegan
      for (let p = 0; p < kata.length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) for (const b of digitDari(o.isi)) terlihat.add(b);
      for (const b of [...angkaSuara(kt.suara), ...digitDari(kt.suara)]) {
        stat.angkaSuara += 1;
        cek(terlihat.has(b), `${nama}#${i + 1}: bilangan ${b} di suara tampak di gambar`);
      }
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
        const teksAda = akhir.filter((o) => o.t === "teks" && (o.op ?? 1) > 0 && o.isi && !/^[\u{1F000}-\u{1FFFF}☀-➿]/u.test(o.isi));
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

/* ------------------------------ Penolong adegan ------------------------------ */
const M = V.VIDEO_MATERI_K5B2C;
const U = V.VIDEO_LUAR_K5B2C;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const benda = (objs, id) => objs.find((o) => o.id === id);
const isiId = (objs, id) => benda(objs, id)?.isi;
const seluruhTeks = (v) => v.adegan.map((a) => [a.judul, a.sumber, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
/** Semua keadaan akhir ketukan: [video, adegan, nomor ketukan (dari nol), benda[]]. */
const semuaKeadaan = [];
for (const v of VIDEO) for (const a of v.adegan) a.ketukan.forEach((_, i) => semuaKeadaan.push([v, a, i, akhirAdegan(a, i)]));

/* ------------------------------ Data buku, dibaca dari PDF bila ada ------------------------------ */
const bs = new URL("../bahan-sd/Matematika-BS-KLS-V.pdf", import.meta.url);
const bg = new URL("../bahan-sd/Matematika-BG-KLS-V.pdf", import.meta.url);
const jalurBerkas = (u) => u.pathname.replace(/^\/([A-Za-z]:)/, "$1");
const ambilPdf = (berkas, dari, sampai) => {
  const r = spawnSync("pdftotext", ["-enc", "UTF-8", "-f", String(dari), "-l", String(sampai), "-raw", jalurBerkas(berkas), "-"], { encoding: "utf8", maxBuffer: 1 << 26 });
  return r.status === 0 ? r.stdout : null;
};
const rapikan = (t) => t.toLowerCase().replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim();
const adaPdf = existsSync(bs) && existsSync(bg);
const teksBS = adaPdf ? [ambilPdf(bs, 59, 62), ambilPdf(bs, 76, 76)] : [null];
const teksBG = adaPdf ? [ambilPdf(bg, 73, 78)] : [null];
const pdfSiap = adaPdf && [...teksBS, ...teksBG].every((t) => t !== null);
if (!pdfSiap) console.log("PDF atau pdftotext tidak tersedia: pemeriksaan teks PDF dilewati");
const bukuRaw = pdfSiap ? rapikan([...teksBS, ...teksBG].join("\n")) : "";
const bgRaw = pdfSiap ? rapikan(teksBG.join("\n")) : "";

// Kunci Ayo Berlatih dalam Panduan Guru hlm. 65-66 (teks PDF; angka 2 tercetak lebih dulu karena letak lingkaran, urutannya tidak penting).
const KUNCI_PDF = {
  24: "2 1 3 4 6 8 12 24",
  36: "2 1 3 4 9 12 18 36",
  54: "2 1 3 4 9 18 27 54",
  72: "2 1 3 4 6 18 8 24 9 36 12 72",
  96: "2 1 3 4 6 24 8 32 12 48 16 96",
};
const KUNCI_BUKU = Object.fromEntries(Object.entries(KUNCI_PDF).map(([n, s]) => [n, s.split(" ").map(Number).sort((p, q) => p - q)]));
if (pdfSiap) for (const [n, s] of Object.entries(KUNCI_PDF)) cek(bgRaw.includes(s), `kunci buku ${n} (${s}) memang ada di teks Panduan Guru`);
// Hasil hitung mandiri melawan kunci buku
for (const n of [24, 72, 96]) sama(KUNCI_BUKU[n], faktorDari(n), `kunci buku ${n} benar`);
{
  const bener36 = faktorDari(36);
  const bener54 = faktorDari(54);
  sama(bener36, [1, 2, 3, 4, 6, 9, 12, 18, 36], "faktor 36 dihitung mandiri");
  sama(bener54, [1, 2, 3, 6, 9, 18, 27, 54], "faktor 54 dihitung mandiri");
  sama(KUNCI_BUKU[36].filter((x) => !bener36.includes(x)).concat(bener36.filter((x) => !KUNCI_BUKU[36].includes(x))), [6], "kunci 36 di buku salah: hanya kekurangan 6");
  sama([KUNCI_BUKU[54].filter((x) => !bener54.includes(x)), bener54.filter((x) => !KUNCI_BUKU[54].includes(x))], [[4], [6]], "kunci 54 di buku salah: 4 ikut, 6 hilang");
  cek(54 % 4 === 2 && Math.floor(54 / 4) === 13, "54 dibagi 4 = 13 sisa 2");
  cek(36 % 6 === 0 && 6 * 6 === 36, "6 x 6 = 36 dan 36 habis dibagi 6");
  stat.kunci += 6;
}
// Tabel hasil potongan buku (Panduan Guru hlm. 64) dibaca dari PDF
if (pdfSiap) {
  for (const [n, p, b] of [[12, "1 2 3 4 6 12", "12 6 4 3 2 1"], [18, "1 2 3 6 9 18", "18 9 6 3 2 1"]]) {
    cek(bgRaw.includes(`panjang tiap bagian ${p} banyaknya hasil potongan ${b}`), `tabel potongan ${n} ada di teks Panduan Guru`);
    const pp = p.split(" ").map(Number);
    const bb = b.split(" ").map(Number);
    cek(pp.every((x, i) => x * bb[i] === n), `tabel potongan ${n}: panjang x banyak = ${n}`);
    sama(pp, faktorDari(n), `tabel potongan ${n}: panjang bagian = faktor ${n}`);
  }
  cek(bukuRaw.includes("faktor dari 12 adalah 1, 2, 3, 4, 6, dan 12."), "buku: faktor dari 12 adalah 1, 2, 3, 4, 6, dan 12");
  sama(faktorDari(12), [1, 2, 3, 4, 6, 12], "faktor 12 dihitung mandiri sama dengan buku");
  cek(bukuRaw.includes("1 berpasangan dengan 18, artinya 1 x 18 = 18 2 berpasangan dengan 9, artinya 2 x 9 = 18 3 berpasangan dengan 6, artinya 3 x 6 = 18"), "buku: tiga pasangan faktor 18");
}
sama(faktorDari(18), [1, 2, 3, 6, 9, 18], "faktor 18 dihitung mandiri");
sama(faktorDari(24), [1, 2, 3, 4, 6, 8, 12, 24], "faktor 24 dihitung mandiri");
sama(faktorDari(72).length, 12, "72 punya dua belas faktor");
sama(faktorDari(96).length, 12, "96 punya dua belas faktor");

/* ------------------------------ Pemeriksa persamaan di gambar ------------------------------ */
const nilaiEkspresi = (s) => {
  const t = s
    .trim()
    .replace(/(\d+) (\d+)\/(\d+)/g, "($1+$2/$3)")
    .replace(/×/g, "*")
    .replace(/:/g, "/");
  return Function(`"use strict"; return (${t || "NaN"});`)();
};
{
  let n = 0;
  for (const [v, a, i, objs] of semuaKeadaan) {
    for (const o of objs) {
      if (o.t !== "teks" || !o.isi || !/^=?\s*[\d(][\d\s+×():/]*(?:=[\d\s+×():/]+)*$/.test(o.isi.trim()) || !o.isi.includes("=")) continue;
      const bagian = o.isi.split("=").map((s) => s.trim()).filter(Boolean);
      if (bagian.length < 2) continue;
      const nilai = bagian.map(nilaiEkspresi);
      n += 1;
      cek(nilai.every((x) => Math.abs(x - nilai[0]) < 1e-9), `${v.id}/${a.id}#${i + 1}: persamaan "${o.isi}" benar (${nilai.join(" ; ")})`);
    }
  }
  cek(n >= 60, `jumlah persamaan yang diperiksa (${n})`);
  stat.persamaan = n;
  // "A : B = C, sisa R" di teks mana pun (termasuk baris kartu)
  let m = 0;
  const lihat = new Set();
  for (const [v, a, i, objs] of semuaKeadaan) {
    for (const o of objs) {
      if (o.t !== "teks" || !o.isi) continue;
      for (const g of o.isi.matchAll(/(\d+) : (\d+) = (\d+), sisa (\d+)/g)) {
        const kunci = `${v.id}/${a.id}/${g[0]}`;
        if (lihat.has(kunci)) continue;
        lihat.add(kunci);
        m += 1;
        const [A, B, C, R] = [Number(g[1]), Number(g[2]), Number(g[3]), Number(g[4])];
        cek(Math.floor(A / B) === C && A % B === R && R < B, `${v.id}/${a.id}#${i + 1}: "${g[0]}" benar (${A} : ${B} = ${Math.floor(A / B)} sisa ${A % B})`);
      }
    }
  }
  cek(m >= 12, `jumlah pembagian bersisa yang diperiksa (${m})`);
  stat.sisaBagi = m;
}

/* ------------------------------ Daftar faktor, kunci, dan label jumlah di gambar ------------------------------ */
{
  let n = 0;
  for (const [v, a, i, objs] of semuaKeadaan) {
    const nama = `${v.id}/${a.id}#${i + 1}`;
    for (const o of objs) {
      if (o.t !== "teks" || !o.isi) continue;
      let g = /^faktor (\d+): ([\d, ]+)$/.exec(o.isi);
      if (g) {
        n += 1;
        sama(g[2], daftarTeks(faktorDari(Number(g[1]))), `${nama}: daftar "${o.isi}" benar`);
      }
      g = /^kunci buku (\d+): ([\d, ]+)$/.exec(o.isi);
      if (g) {
        n += 1;
        const N = Number(g[1]);
        sama(g[2], daftarTeks(KUNCI_BUKU[N]), `${nama}: "${o.isi}" persis kunci di Panduan Guru`);
        // keterangan benar/salah pada baris kartu sesudahnya harus sesuai hitungan mandiri
        const sebaris = /^(.*)-t0$/.exec(o.id);
        const ket = sebaris ? isiId(objs, `${sebaris[1]}-t1`) : undefined;
        if (ket !== undefined && /^(benar|salah)/.test(ket)) {
          const benar = daftarTeks(KUNCI_BUKU[N]) === daftarTeks(faktorDari(N));
          cek((ket.startsWith("benar") && benar) || (ket.startsWith("salah") && !benar), `${nama}: keterangan "${ket}" sesuai kunci ${N}`);
          if (N === 36) cek(!benar && ket.includes("tanpa 6"), `${nama}: kunci 36 salah karena tanpa 6`);
          if (N === 54) cek(!benar && ket.includes("ada 4") && ket.includes("tanpa 6"), `${nama}: kunci 54 salah karena ada 4 tanpa 6`);
        }
      }
      // daftar polos berurutan naik, mis. "1, 2, 3, 4, 6, 12"
      if (/^\d+(, \d+)+$/.test(o.isi)) {
        n += 1;
        const d = o.isi.split(", ").map(Number);
        cek(d.every((x, q) => q === 0 || x > d[q - 1]), `${nama}: daftar "${o.isi}" berurutan naik`);
        cek(d.every((x) => faktorDari(d[d.length - 1]).includes(x)), `${nama}: "${o.isi}" semuanya faktor dari ${d[d.length - 1]}`);
      }
    }
  }
  cek(n >= 15, `jumlah daftar faktor dan kunci yang diperiksa (${n})`);
  stat.daftar = n;
}

/* ------------------------------ Tabel potongan: panjang x banyak potongan = bilangan ------------------------------ */
{
  const BIL = { "tabel-12": 12, "eks-23b": 18 };
  for (const [v, a, i, objs] of semuaKeadaan) {
    if (!(a.id in BIL)) continue;
    const N = BIL[a.id];
    const nama = `${v.id}/${a.id}#${i + 1}`;
    const kolom = [];
    for (let q = 0; q < 6; q += 1) {
      const p = isiId(objs, `tp${q}`);
      const b = isiId(objs, `tb${q}`);
      if (p === undefined || b === undefined) continue;
      kolom.push([Number(p), Number(b)]);
      stat.tabel += 1;
      cek(Number(p) * Number(b) === N && N % Number(p) === 0, `${nama}: kolom ${q + 1} tabel: ${p} x ${b} = ${N}`);
      // kolom diisi bersamaan: tiap kolom ke-q memuat faktor ke-q dari N
      sama(Number(p), faktorDari(N)[q], `${nama}: kolom ${q + 1} memuat faktor ke-${q + 1} dari ${N}`);
    }
    if (kolom.length === 6) sama(kolom.map((c) => c[0]), faktorDari(N), `${nama}: tabel lengkap memuat semua faktor ${N}`);
  }
  // daftar "bilangan yang muncul" pada langkah empat sama dengan himpunan angka di tabel
  const eks = adegan(M, "tabel-12");
  const lang4 = akhirAdegan(eks, 4);
  const semua = new Set();
  for (let q = 0; q < 6; q += 1) {
    semua.add(Number(isiId(lang4, `tp${q}`)));
    semua.add(Number(isiId(lang4, `tb${q}`)));
  }
  sama(isiId(lang4, "bl"), daftarTeks([...semua].sort((p, q) => p - q)), "tabel 12: bilangan yang muncul ditulis sekali dan sama dengan faktor 12");
  // yang hasil bagi 12 dengan panjang 5 bersisa, jadi tidak masuk tabel
  const lima = akhirAdegan(eks, 3);
  cek(!faktorDari(12).includes(5) && 12 % 5 === 2 && isiId(lima, "pq") === "12 : 5 = 2, sisa 2", "tabel 12: panjang 5 bersisa 2 dan tidak masuk tabel");
  const dua = akhirAdegan(adegan(M, "eks-23b"), 4);
  cek([4, 5].every((d) => !faktorDari(18).includes(d)) && isiId(dua, "v1") === "18 : 4 = 4, sisa 2" && isiId(dua, "v2") === "18 : 5 = 3, sisa 3", "faktor 18: panjang 4 dan 5 bersisa dan tidak masuk tabel");
}

/* ------------------------------ Geometri gambar: pita, kisi, lingkaran, kurung ------------------------------ */
{
  const nomorSel = (objs, re) => {
    const g = new Map();
    for (const o of objs) {
      const m = re.exec(o.id);
      if (!m || o.t !== "kotak") continue;
      const kunci = m[1];
      if (!g.has(kunci)) g.set(kunci, []);
      g.get(kunci).push({ ...o, no: Number(m[2]) });
    }
    return g;
  };
  for (const [v, a, i, objs] of semuaKeadaan) {
    const nama = `${v.id}/${a.id}#${i + 1}`;
    // Pita: id p{n}x{d} atau q{n}x{d}; petak bernomor, warna berganti tiap d petak, sisa (n mod d) berwarna lain, garis potong tiap kelipatan d.
    for (const [kunci, sel] of nomorSel(objs, /^([pq]\d+x\d+)-(\d+)$/)) {
      const [, n, d] = /^[pq](\d+)x(\d+)$/.exec(kunci).map(Number);
      sel.sort((p, q) => p.no - q.no);
      stat.pita += 1;
      cek(sel.length === n && sel.every((o, q) => o.no === q), `${nama}: pita ${kunci} punya ${n} petak berurutan`);
      cek(sel.every((o) => Math.abs(o.w - sel[0].w) < 0.35 && o.y === sel[0].y && o.h === sel[0].h), `${nama}: pita ${kunci} petak sama besar dan sebaris`);
      cek(sel.every((o, q) => q === 0 || Math.abs(o.x - (sel[q - 1].x + sel[q - 1].w)) < 0.45), `${nama}: pita ${kunci} petak rapat`);
      const penuh = n - (n % d);
      for (let q = 1; q < n; q += 1) {
        const beda = sel[q].warna !== sel[q - 1].warna;
        const harapBeda = q % d === 0; // pergantian warna di tiap kelipatan d, termasuk ke petak sisa
        if (penuh === n && d === n) continue;
        cek(beda === harapBeda, `${nama}: pita ${kunci} warna berganti tepat tiap ${d} petak (di petak ${q})`);
      }
      if (n % d !== 0) cek(sel.slice(penuh).every((o) => o.warna === sel[penuh].warna) && sel[penuh].warna !== sel[penuh - 1].warna, `${nama}: pita ${kunci} petak sisa (${n % d}) satu warna sendiri`);
      else cek(sel.every((o, q) => q === 0 || o.warna === sel[q - 1].warna || q % d === 0), `${nama}: pita ${kunci} habis dibagi, tanpa warna sisa`);
      // garis potong
      const potong = objs.filter((o) => o.id.startsWith(`${kunci}-p`) && o.t === "garis");
      sama(potong.length, Math.ceil(n / d) - 1, `${nama}: pita ${kunci} punya ${Math.ceil(n / d) - 1} garis potong`);
      potong.forEach((o, q) => hampir(o.x, sel[(q + 1) * d].x, 0.2, `${nama}: garis potong ${o.id} tepat di batas petak ${(q + 1) * d}`));
    }
    // Kisi susunan: id a{R}x{C} atau b{R}x{C}; petak persegi, rapat, baris demi baris, petak berwarna berurutan dari awal.
    for (const [kunci, sel] of nomorSel(objs, /^([ab]\d+x\d+)-(\d+)$/)) {
      const [, R, C] = /^[ab](\d+)x(\d+)$/.exec(kunci).map(Number);
      sel.sort((p, q) => p.no - q.no);
      stat.kisi += 1;
      cek(sel.length === R * C && sel.every((o, q) => o.no === q), `${nama}: kisi ${kunci} punya ${R * C} petak`);
      cek(sel.every((o) => Math.abs(o.w - sel[0].w) < 0.05 && Math.abs(o.h - sel[0].w) < 0.05), `${nama}: kisi ${kunci} petak persegi`);
      const s = sel[0].w;
      cek(sel.every((o, q) => Math.abs(o.x - (sel[0].x + (q % C) * s)) < 0.15 && Math.abs(o.y - (sel[0].y + Math.floor(q / C) * s)) < 0.15), `${nama}: kisi ${kunci} rapat ${R} baris x ${C} kolom`);
      const berwarna = sel.filter((o) => o.warna !== "#FFFFFF").length;
      cek(sel.every((o, q) => (q < berwarna) === (o.warna !== "#FFFFFF")), `${nama}: petak berwarna kisi ${kunci} mengisi dari awal`);
      const harap = kunci === "a3x5" ? 12 : R * C;
      sama(berwarna, harap, `${nama}: kisi ${kunci} berwarna ${harap} petak`);
      if (berwarna === R * C) cek(R * C === Number({ a3x4: 12, a1x12: 12, a2x6: 12, b1x18: 18, b2x9: 18, b3x6: 18, b6x6: 36 }[kunci]), `${nama}: luas kisi ${kunci} sama dengan bilangan yang dibahas`);
      if (kunci === "a3x5") cek(berwarna % C === 2 && Math.floor(berwarna / C) === 2, `${nama}: 12 petak dalam baris 5 = 2 baris penuh dan sisa 2`);
    }
    // Lingkaran faktor: id f{N}-b{i} (daftar lengkap) atau g{N}-b{i} (sengaja belum lengkap), angka -n{i}, kurung -k{j}
    const keluarga = new Map();
    for (const o of objs) {
      const m = /^([fg])(\d+)-b(\d+)$/.exec(o.id);
      if (!m) continue;
      const kunci = `${m[1]}${m[2]}`;
      if (!keluarga.has(kunci)) keluarga.set(kunci, []);
      keluarga.get(kunci).push({ ...o, no: Number(m[3]) });
    }
    for (const [kunci, lingk] of keluarga) {
      lingk.sort((p, q) => p.no - q.no);
      const N = Number(kunci.slice(1));
      const angka = lingk.map((o) => Number(isiId(objs, `${kunci}-n${o.no}`)));
      if (angka.some((x) => Number.isNaN(x))) continue; // angka muncul bertahap saat kalimat berjalan; diperiksa pada keadaan akhir lain
      stat.lingkaran += 1;
      cek(lingk.every((o, q) => o.no === q), `${nama}: lingkaran ${kunci} bernomor berurutan`);
      cek(angka.every((x, q) => q === 0 || x > angka[q - 1]) && angka.every((x) => N % x === 0) && angka[angka.length - 1] === N && angka[0] === 1, `${nama}: lingkaran ${kunci} berisi faktor dari ${N} berurutan, dari 1 sampai ${N}`);
      if (kunci[0] === "f") sama(angka, faktorDari(N), `${nama}: lingkaran ${kunci} memuat semua faktor ${N}`);
      cek(lingk.every((o) => o.y === lingk[0].y && o.r === lingk[0].r), `${nama}: lingkaran ${kunci} sebaris dan sama besar`);
      cek(lingk.every((o, q) => q < 2 || Math.abs(o.x - lingk[q - 1].x - (lingk[1].x - lingk[0].x)) < 0.25), `${nama}: lingkaran ${kunci} sama jarak`);
      cek(lingk.every((o, q) => o.warna === lingk[lingk.length - 1 - q].warna) && new Set(lingk.slice(0, Math.floor(lingk.length / 2)).map((o) => o.warna)).size === Math.floor(lingk.length / 2), `${nama}: lingkaran ${kunci} pasangan sewarna, tiap pasangan warna berbeda`);
      cek(lingk.every((o) => Math.abs((benda(objs, `${kunci}-n${o.no}`)?.x ?? -999) - o.x) < 0.01), `${nama}: angka lingkaran ${kunci} tepat di pusat lingkaran`);
      cek(lingk.every((o) => (benda(objs, `${kunci}-n${o.no}`)?.u ?? 99) * String(angka[o.no]).length * 0.58 < o.r * 2 + 0.5), `${nama}: angka muat dalam lingkaran ${kunci}`);
      // Kurung pasangan
      const kurung = objs.filter((o) => o.id.startsWith(`${kunci}-k`) && o.t === "jalur");
      kurung.sort((p, q) => Number(p.id.slice(kunci.length + 2)) - Number(q.id.slice(kunci.length + 2)));
      kurung.forEach((o) => {
        const j = Number(o.id.slice(kunci.length + 2));
        const n = bilangan(o.d);
        stat.kurung += 1;
        cek(/^M0 0 L0 [\d.]+ L[\d.]+ [\d.]+ L[\d.]+ 0$/.test(o.d), `${nama}: kurung ${o.id} berbentuk kurung`);
        const xa = o.x;
        const xb = o.x + n[4];
        const a1 = lingk.find((c) => Math.abs(c.x - xa) < 0.25);
        const b1 = lingk.find((c) => Math.abs(c.x - xb) < 0.25);
        cek(!!a1 && !!b1, `${nama}: kurung ${o.id} berujung di pusat dua lingkaran`);
        if (!a1 || !b1) return;
        cek(a1.no === j && b1.no === lingk.length - 1 - j, `${nama}: kurung ${o.id} menghubungkan lingkaran ke-${j + 1} dengan ke-${lingk.length - j}`);
        cek(angka[a1.no] * angka[b1.no] === Math.max(...angka), `${nama}: kurung ${o.id} menghubungkan ${angka[a1.no]} dan ${angka[b1.no]}, hasil kali = ${Math.max(...angka)}`);
        hampir(o.y, a1.y + a1.r, 0.01, `${nama}: kurung ${o.id} mulai di tepi bawah lingkaran`);
        cek(o.warna === "none" && o.garis === a1.warna, `${nama}: kurung ${o.id} sewarna pasangannya`);
        // pasangan terluar paling dalam (tinggi kurung terbesar), makin ke dalam makin pendek
        if (j > 0) cek(n[3] < bilangan(kurung.find((c) => c.id === `${kunci}-k${j - 1}`).d)[3], `${nama}: kurung ${o.id} lebih pendek dari kurung luarnya`);
      });
    }
  }
  cek(stat.pita >= 12 && stat.kisi >= 10 && stat.lingkaran >= 20 && stat.kurung >= 50, `jumlah pita, kisi, lingkaran, kurung yang diperiksa (${stat.pita}, ${stat.kisi}, ${stat.lingkaran}, ${stat.kurung})`);
}

/* ------------------------------ Isi bergambar tiap adegan, dihitung mandiri ------------------------------ */
{
  // Pemanasan: 6 permen untuk 3 siswa habis, untuk 4 siswa bersisa 2
  const p = adegan(M, "pemanasan-permen");
  const permenKe = (objs) => objs.filter((o) => /^pm-\d$/.test(o.id));
  sama(permenKe(akhirAdegan(p, 0)).length, 6, "permen: 6 butir");
  {
    const o = akhirAdegan(p, 1);
    const siswa = [benda(o, "sw1"), benda(o, "sw2"), benda(o, "sw3")];
    const dekat = siswa.map((s) => permenKe(o).filter((c) => Math.abs(c.x - s.x) <= 14).length);
    sama(dekat, [2, 2, 2], "permen untuk tiga siswa: masing-masing dua butir dan semua terbagi");
    sama([6 % 3, 6 / 3], [0, 2], "6 dibagi 3 habis, tiap siswa 2");
    cek(permenKe(o).every((c) => c.y === 118), "permen untuk tiga siswa: sebaris di bawah siswa");
  }
  {
    const o = akhirAdegan(p, 2);
    sama([isiId(o, "bg"), isiId(o, "bs"), isiId(o, "bf")], ["6 : 3 = 2", "sisa 0", "3 faktor dari 6"], "permen: 6 : 3 = 2 sisa 0, 3 faktor dari 6");
  }
  {
    const o = akhirAdegan(p, 3);
    const siswa = ["sx1", "sx2", "sx3", "sx4"].map((id) => benda(o, id));
    sama(siswa.length, 4, "permen untuk empat siswa: empat siswa");
    const bawah = permenKe(o).filter((c) => c.y === 128);
    const sisa = permenKe(o).filter((c) => c.y !== 128);
    sama([bawah.length, sisa.length, permenKe(o).length], [4, 2, 6], "permen untuk empat siswa: 4 dibagi, 2 tersisa, total 6");
    cek(siswa.every((s) => bawah.filter((c) => Math.abs(c.x - s.x) < 1).length === 1), "permen untuk empat siswa: tiap siswa satu butir");
    sama([6 % 4, Math.floor(6 / 4), isiId(o, "sa2")], [2, 1, "sisa 2"], "6 dibagi 4 = 1 sisa 2");
  }
  // Eksplorasi 2.3A: contoh benar dan salah
  const e = adegan(M, "eks-23a");
  sama([isiId(akhirAdegan(e, 2), "c2"), 12 % 2, 12 / 2], ["12 petak = 6 potong", 0, 6], "2.3A contoh benar: 12 petak jadi 6 potong, sisa 0");
  cek(isiId(akhirAdegan(e, 3), "w2") === "sisa 2 petak" && 12 % 5 === 2, "2.3A contoh salah: panjang 5 menyisakan 2 petak");
  // Eksplorasi 2.3B lingkaran faktor 18 dan pasangan di buku
  const b = adegan(M, "eks-23b");
  sama(isiId(akhirAdegan(b, 5), "fl"), "faktor 18: " + daftarTeks(faktorDari(18)), "2.3B: faktor 18 pada langkah tiga");
  const ps = adegan(M, "pasangan-faktor");
  sama([isiId(akhirAdegan(ps, 1), "q1"), isiId(akhirAdegan(ps, 2), "q1"), isiId(akhirAdegan(ps, 3), "q1")], ["1 × 18 = 18", "2 × 9 = 18", "3 × 6 = 18"], "pasangan faktor 18 seperti di buku");
  sama([isiId(akhirAdegan(ps, 4), "r1"), isiId(akhirAdegan(ps, 4), "r2"), isiId(akhirAdegan(ps, 4), "r3")], ["1 × 12 = 12", "2 × 6 = 12", "3 × 4 = 12"], "pasangan faktor 12");
  sama(isiId(akhirAdegan(ps, 5), "m2"), "12 : 3 = 4", "faktor 3 dari 12 menemukan pasangan 4");
  // Ayo Berlatih
  const la = adegan(M, "berlatih-24-36");
  const l1 = akhirAdegan(la, 0);
  sama(["n24", "n36", "n54", "n72", "n96"].map((id) => isiId(l1, `${id}-t0`)), ["24", "36", "54", "72", "96"], "Ayo Berlatih: lima bilangan");
  sama(isiId(akhirAdegan(la, 1), "pc"), `${faktorDari(24).length} faktor`, "24 punya 8 faktor");
  sama(isiId(akhirAdegan(la, 4), "sb"), `${faktorDari(36).length} faktor`, "36 punya 9 faktor");
  sama(isiId(akhirAdegan(la, 4), "fl"), "faktor 36: " + daftarTeks(faktorDari(36)), "36: daftar yang benar");
  sama([isiId(akhirAdegan(la, 3), "sq"), isiId(akhirAdegan(la, 6), "g1"), isiId(akhirAdegan(la, 6), "g2")], ["6 × 6 = 36", "6 × 6 = 36", "36 : 6 = 6, sisa 0"], "catatan guru: 6 x 6 = 36 dan 36 : 6 = 6 sisa 0");
  sama(isiId(akhirAdegan(la, 6), "g3-t0"), "faktor 36: " + daftarTeks(faktorDari(36)), "catatan guru: daftar faktor 36 yang benar");
  // 54, 72, 96
  const lb = adegan(M, "berlatih-54-72-96");
  sama(isiId(akhirAdegan(lb, 0), "pb"), `${faktorDari(54).length} faktor`, "54 punya 8 faktor");
  sama([isiId(akhirAdegan(lb, 2), "j1"), 54 % 4, Math.floor(54 / 4)], ["54 : 4 = 13, sisa 2", 2, 13], "54 dibagi 4 = 13 sisa 2");
  sama([isiId(akhirAdegan(lb, 3), "pg"), 6 * 9], ["6 × 9 = 54", 54], "6 x 9 = 54");
  sama(isiId(akhirAdegan(lb, 3), "kb-t0"), "faktor 54: " + daftarTeks(faktorDari(54)), "catatan guru: daftar faktor 54 yang benar");
  sama(isiId(akhirAdegan(lb, 4), "pb"), `${faktorDari(72).length / 2} pasang = ${faktorDari(72).length} faktor`, "72: 6 pasang, 12 faktor");
  sama(isiId(akhirAdegan(lb, 6), "pb"), `${faktorDari(96).length / 2} pasang = ${faktorDari(96).length} faktor`, "96: 6 pasang, 12 faktor");
  {
    // ringkasan pemeriksaan kunci: tiap baris cocok dengan hitungan mandiri
    const o = akhirAdegan(lb, 7);
    const baris = { h1: 24, h4: 36, h5: 54, h6: 72, h7: 96 };
    for (const [id, N] of Object.entries(baris)) {
      const benar = daftarTeks(KUNCI_BUKU[N]) === daftarTeks(faktorDari(N));
      sama(isiId(o, id), `${N}: ${faktorDari(N).length} faktor, kunci ${benar ? "benar" : "salah"}`, `ringkasan pemeriksaan kunci ${N}`);
    }
  }
  // Penutup: contoh pita 12 dengan potongan 4
  const t = adegan(M, "penutup-c");
  sama([isiId(akhirAdegan(t, 1), "mk1"), isiId(akhirAdegan(t, 1), "mk2"), 12 % 4, 12 / 4], ["3 bagian sama panjang, tanpa sisa", "4 membagi habis 12", 0, 3], "penutup: pita 12 dipotong 4 jadi 3 bagian tanpa sisa");
  sama([isiId(akhirAdegan(t, 2), "ms"), 6 % 3], ["6 : 3 = 2, sisa 0", 0], "penutup: 6 permen untuk 3 siswa");
  stat.kunci += 20;
}

/* ------------------------------ Metode luar: pasangan, pelangi, susunan, tangga, dihitung mandiri ------------------------------ */
{
  // Factor Pairs
  const pasangan = adegan(U, "luar-pasangan");
  const kt3 = akhirAdegan(pasangan, 2);
  sama(["p1", "p2", "p3", "p4"].map((id) => isiId(kt3, id)), ["1 × 12 = 12", "2 × 6 = 12", "3 × 4 = 12", "4 × 3 = 12"], "Factor Pairs 12: pasangan kali");
  // pasangan keempat hanya mengulang pasangan ketiga dengan urutan terbalik
  cek(4 * 4 > 12 && 12 / 3 === 4, "Factor Pairs 12: setelah 3 pasangannya 4, di atas pembagi, jadi berhenti");
  sama(isiId(akhirAdegan(pasangan, 3), "fl"), "faktor 12: " + daftarTeks(faktorDari(12)), "Factor Pairs 12: daftar faktor");
  const pt = adegan(U, "luar-pasangan-terapan");
  {
    const o = akhirAdegan(pt, 1);
    const pas36 = [[1, 36], [2, 18], [3, 12], [4, 9], [6, 6]];
    sama(["q1", "q2", "q3", "q4", "q5"].map((id) => isiId(o, id)), pas36.map(([a, b]) => `${a} × ${b} = 36`), "Factor Pairs 36: lima pasangan");
    const dari = new Set(pas36.flat());
    sama([...dari].sort((p, q) => p - q), faktorDari(36), "Factor Pairs 36: pasangan memuat semua faktor, enam sekali saja");
    sama(isiId(o, "ql"), "faktor 36: " + daftarTeks(faktorDari(36)), "Factor Pairs 36: daftar");
    const o2 = akhirAdegan(pt, 3);
    const pas54 = [[1, 54], [2, 27], [3, 18], [6, 9]];
    sama(["r1", "r2", "r3", "r4"].map((id) => isiId(o2, id)), pas54.map(([a, b]) => `${a} × ${b} = 54`), "Factor Pairs 54: empat pasangan");
    sama([...new Set(pas54.flat())].sort((p, q) => p - q), faktorDari(54), "Factor Pairs 54: pasangan memuat semua faktor");
    cek(!pas54.flat().includes(4), "Factor Pairs 54: angka 4 tidak muncul di pasangan mana pun");
    sama(isiId(o2, "rl"), "faktor 54: " + daftarTeks(faktorDari(54)), "Factor Pairs 54: daftar");
  }
  // Factor Rainbow
  {
    const pel = adegan(U, "luar-pelangi");
    const o = akhirAdegan(pel, 3);
    cek(["g12-b0", "g12-b1", "g12-b2", "g12-b3", "g12-b4"].every((id) => benda(o, id)) && !benda(o, "g12-b5"), "Factor Rainbow: contoh tidak lengkap memuat 5 lingkaran (1, 2, 3, 6, 12)");
    sama([1, 2, 3, 6, 12].filter((x) => !faktorDari(12).includes(x)), [], "Factor Rainbow: lima bilangan contoh semuanya faktor 12");
    sama(faktorDari(12).filter((x) => ![1, 2, 3, 6, 12].includes(x)), [4], "Factor Rainbow: yang terlewat adalah 4");
    cek(isiId(o, "tl") === "terlewat: 4", "Factor Rainbow: label terlewat 4");
    // 3 tidak punya pasangan karena 12 : 3 = 4 tidak ada di daftar
    cek(12 / 3 === 4 && ![1, 2, 3, 6, 12].includes(4), "Factor Rainbow: faktor 3 tanpa pasangan karena 4 tidak ada");
    const t24 = adegan(U, "luar-pelangi-terapan");
    sama(isiId(akhirAdegan(t24, 1), "lk"), `${faktorDari(24).length} faktor, ${faktorDari(24).length / 2} pasang, lengkap`, "Factor Rainbow 24: 8 faktor, 4 pasang");
    sama(isiId(akhirAdegan(t24, 3), "bb"), `${faktorDari(72).length / 2} busur, ${faktorDari(72).length} faktor, lengkap`, "Factor Rainbow 72: 6 busur, 12 faktor");
  }
  // Array Model
  {
    const sus = adegan(U, "luar-susunan");
    const o = akhirAdegan(sus, 2);
    const luas = ["a1x12", "a2x6", "a3x4"].map((k) => k.slice(1).split("x").map(Number).reduce((p, q) => p * q));
    sama(luas, [12, 12, 12], "Array Model: tiga susunan seluas 12 petak");
    sama(["1 × 12", "2 × 6", "3 × 4"], ["l1", "l2", "l3"].map((id) => isiId(o, id)), "Array Model: label tiga susunan");
    sama(isiId(akhirAdegan(sus, 1), "df"), "3 dan 4 faktor dari 12", "Array Model: panjang 4 dan lebar 3 faktor dari 12");
    const sisa = akhirAdegan(sus, 3);
    cek(isiId(sisa, "sz") === "12 : 5 = 2, sisa 2" && 12 % 5 === 2 && !faktorDari(12).includes(5), "Array Model: baris lima petak menyisakan 2");
    const tr = adegan(U, "luar-susunan-terapan");
    const t18 = akhirAdegan(tr, 0);
    sama([["b1x18", "b2x9", "b3x6"].every((k) => benda(t18, `${k}-0`)), 1 * 18, 2 * 9, 3 * 6], [true, 18, 18, 18], "Array Model 18: tiga susunan seluas 18");
    sama(isiId(akhirAdegan(tr, 1), "ml"), "faktor 18: " + daftarTeks(faktorDari(18)), "Array Model 18: faktor 18");
    const t36 = akhirAdegan(tr, 3);
    sama(["t1", "t2", "t3", "t4", "t5"].map((id) => isiId(t36, id)), [[1, 36], [2, 18], [3, 12], [4, 9], [6, 6]].map(([a, b]) => `${a} × ${b} = 36`), "Array Model 36: lima susunan");
    sama(isiId(t36, "sm"), `${Math.ceil(faktorDari(36).length / 2)} susunan, ${faktorDari(36).length} faktor`, "Array Model 36: 5 susunan, 9 faktor");
    cek(isiId(akhirAdegan(tr, 2), "s3") === "persegi: 6 × 6 = 36" && 6 * 6 === 36, "Array Model 36: susunan 6 x 6 berbentuk persegi");
  }
  // Trial Division Ladder
  {
    const tg = adegan(U, "luar-tangga");
    const o = akhirAdegan(tg, 2);
    sama(["e1", "e2", "e3", "e4"].map((id) => isiId(o, id)), ["12 : 1 = 12", "12 : 2 = 6", "12 : 3 = 4", "12 : 4 = 3"], "Tangga uji bagi 12: empat baris");
    sama(["f1", "f2", "f3", "f4"].map((id) => isiId(o, id)), ["1 dan 12", "2 dan 6", "3 dan 4", "sudah ada"], "Tangga uji bagi 12: pasangan tiap baris");
    cek(3 * 3 <= 12 && 4 * 4 > 12 && 12 / 4 < 4, "Tangga uji bagi 12: berhenti di 4 karena 4 x 4 > 12 dan hasil bagi 3 < 4");
    const tt = adegan(U, "luar-tangga-terapan");
    const kt = akhirAdegan(tt, 3);
    const baris = [];
    for (let d = 1; d <= 10; d += 1) {
      const isi = isiId(kt, `ug${d}`);
      cek(isi !== undefined, `tangga 96: baris uji ${d} ada`);
      const g = /^96 : (\d+) = (\d+)(?:, sisa (\d+))?$/.exec(isi ?? "");
      cek(!!g && Number(g[1]) === d && Math.floor(96 / d) === Number(g[2]) && (96 % d) === Number(g[3] ?? 0), `tangga 96: baris ${d} "${isi}" benar`);
      if (g) baris.push([d, Number(g[2]), Number(g[3] ?? 0), benda(kt, `ug${d}`).warna]);
      stat.ladder += 1;
    }
    const habis = baris.filter((b) => b[2] === 0);
    sama([...new Set(habis.flatMap((b) => [b[0], b[1]]))].sort((p, q) => p - q), faktorDari(96), "tangga 96: pembagi yang habis beserta hasil baginya = semua faktor 96");
    cek(baris.every((b) => (b[2] === 0) === (b[3] === "#16A34A")), "tangga 96: hijau bila habis, merah bila bersisa");
    cek(10 * 10 > 96 && 9 * 9 <= 96 && Math.floor(96 / 10) < 10, "tangga 96: berhenti di 10 karena 10 x 10 > 96 dan hasil bagi 9 < 10");
    sama(isiId(akhirAdegan(tt, 4), "fl"), "faktor 96: " + daftarTeks(faktorDari(96)), "tangga 96: daftar faktor");
    // posisi baris: dua kolom, kiri d = 1..5, kanan d = 6..10, jarak baris sama
    const ys = [1, 2, 3, 4, 5].map((d) => benda(kt, `ug${d}`).y);
    cek(ys.every((y, q) => q === 0 || Math.abs(y - ys[q - 1] - 20) < 0.01), "tangga 96: jarak baris kolom kiri sama");
    cek([6, 7, 8, 9, 10].every((d, q) => benda(kt, `ug${d}`).y === ys[q] && benda(kt, `ug${d}`).x === 214), "tangga 96: kolom kanan sejajar dengan kolom kiri");
  }
  // Ringkasan
  {
    const r = adegan(U, "luar-ringkas");
    sama(isiId(akhirAdegan(r, 1), "d8"), `${faktorDari(24).length} faktor`, "ringkasan: 24 punya 8 faktor");
    sama(isiId(akhirAdegan(r, 1), "fl"), "faktor 24: " + daftarTeks(faktorDari(24)), "ringkasan: daftar faktor 24");
    const o = akhirAdegan(r, 3);
    sama([isiId(o, "e1-t1"), isiId(o, "e2-t1")], ["kunci buku 36: " + daftarTeks(KUNCI_BUKU[36]), "kunci buku 54: " + daftarTeks(KUNCI_BUKU[54])], "ringkasan: dua kunci buku yang salah");
  }
  stat.kunci += 10;
}

/* ------------------------------ Pemisahan materi dan metode luar ------------------------------ */
{
  const teksVideo = (v) => JSON.stringify(seluruhTeks(v));
  const NAMA_METODE = /Factor Pairs|Factor Rainbow|Array Model|Trial Division|Ladder|metode luar|metode dari luar/i;
  const materi = teksVideo(M);
  const luar = teksVideo(U);
  cek(!NAMA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of ["Factor Pairs", "Factor Rainbow", "Array Model", "Trial Division Ladder"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(M.adegan.every((a) => /(Buku Siswa|Panduan Guru) hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(U.adegan.every((a) => /metode luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-pasangan", "luar-pasangan-terapan", "luar-pelangi", "luar-pelangi-terapan", "luar-susunan", "luar-susunan-terapan", "luar-tangga", "luar-tangga-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk empat metode");
  cek(M.adegan.length === 11 && U.adegan.length === 10, "11 adegan materi dan 10 adegan metode luar");
  // Subbab C tidak membocorkan Subbab D (faktor persekutuan dan FPB) maupun Subbab E (bilangan prima, faktorisasi prima, KPK dan FPB dengan faktor prima).
  const BOCOR = /faktor persekutuan|persekutuan terbesar|FPB|prima|faktorisasi|pohon faktor|ayakan|saringan|Eratosthenes|congklak|dakon|pembagian berulang|faktor sama/i;
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  for (const a of M.adegan) cek(!BOCOR.test(teksAdegan(a)), `materi ${a.id} tidak membocorkan Subbab D atau E`);
  for (const a of U.adegan) cek(!BOCOR.test(teksAdegan(a)), `metode luar ${a.id} tidak membocorkan Subbab D atau E`);
  // Hanya Refleksi nomor empat yang milik subbab ini; Uji Kompetensi, pengayaan, dan remedial ikut penutup bab.
  cek(!/Uji Kompetensi|pengayaan|remedial|Refleksi nomor (satu|dua|tiga|lima|enam|tujuh|delapan|sembilan|[1-35-9])/i.test(materi + luar), "tidak memakai isi subbab lain atau Refleksi nomor lain");
  cek(/Refleksi nomor empat|nomor empat: aku dapat menentukan faktor/i.test(materi), "materi memuat Refleksi nomor 4");
  cek(totalKetukan >= 80, `total ketukan cukup dalam (${totalKetukan})`);
}

/* ------------------------------ Kutipan buku (bila PDF tersedia) ------------------------------ */
{
  if (pdfSiap) {
    let n = 0;
    for (const a of M.adegan) {
      for (const kt of a.kutipan ?? []) {
        n += 1;
        cek(bukuRaw.includes(rapikan(kt)), `kutipan buku ${a.id}: "${kt}" ada di teks PDF`);
      }
    }
    cek(n >= 60, `jumlah kutipan buku yang diperiksa (${n})`);
    stat.kutipan = n;
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k5b2c-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|k5b2c-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k5b2c sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k5b2c.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_C52|video-k4b2-umum|naskah-k5b2/.test(pembungkus) && /VIDEO_MATERI_K5B2C/.test(pembungkus) && /VIDEO_LUAR_K5B2C/.test(pembungkus) && /export function VideoK5B2C/.test(pembungkus) && /DaftarVideoCerita/.test(pembungkus) && /keVideoSiap/.test(pembungkus), "video-k5b2c.tsx: memakai dua video Story baru, tanpa naskah lama, ekspor VideoK5B2C tetap");
  cek(!pembungkus.includes("\r"), "video-k5b2c.tsx: akhir baris LF");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Pemeriksaan: ${stat.persamaan} persamaan, ${stat.sisaBagi} pembagian bersisa, ${stat.angkaSuara} bilangan suara, ${stat.daftar} daftar faktor dan kunci, ${stat.tabel} kolom tabel, ${stat.pita} pita, ${stat.kisi} kisi, ${stat.lingkaran} lingkaran, ${stat.kurung} kurung, ${stat.ladder} baris tangga, ${stat.kutipan ?? 0} kutipan, ${stat.teksPasang} pasangan teks`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
