// Uji Story Kelas 5 Bab 2 Sub-Bab D (faktor persekutuan dan FPB): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, bilangan di suara (angka dan kata) tampak di gambar, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// teks bertumpuk, pemisahan materi dan metode luar, tidak membocorkan Subbab E (faktor prima), kutipan buku terhadap teks PDF (bila ada),
// hitungan mandiri (faktor, faktor persekutuan, FPB, jumlah paket dan vas, soal tambahan), persamaan di gambar,
// geometri gambar (papan congklak 28 lubang, baris sel tabel, diagram irisan, deret vas dan paket), emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k5b2d.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k5b2d-video.ts");

const stat = { teksPasang: 0, persamaan: 0, angkaSuara: 0, papan: 0, baris: 0, venn: 0, deret: 0, fpb: 0, daftar: 0 };
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

cek(typeof L.keadaanStory === "function" && typeof L.posisiKata === "function", "mesin Story tersedia");

/* ------------------------------ Geometri umum ------------------------------ */
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
const jalurDari = (objs, id) => titikJalur(objs.find((o) => o.id === id));

/* ------------------------------ Isi dua video ------------------------------ */
const VIDEO = [V.VIDEO_MATERI_K5B2D, V.VIDEO_LUAR_K5B2D];
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
const seluruhTeks = (v) => v.adegan.map((a) => [a.judul, a.sumber, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const M = V.VIDEO_MATERI_K5B2D;
const U = V.VIDEO_LUAR_K5B2D;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
/** Keadaan akhir ketukan ke-`ke` (mulai 0) adegan `id` pada video `v`. */
const ket = (v, id, ke) => akhirAdegan(adegan(v, id), ke);
const nilaiId = (objs, id) => objs.find((o) => o.id === id)?.isi;
const EMAS = "#FFC800";
const HIJAU_PITA = "#86EFAC";
const MERAH_PITA = "#F87171";
const PUTIH = "#FFFFFF";

/* ------------------------------ Hitungan mandiri ------------------------------ */
const fpb = (a, b) => (b === 0 ? Math.abs(a) : fpb(b, a % b));
const fpbBanyak = (...n) => n.reduce((t, x) => fpb(t, x));
const kpk2 = (a, b) => (a / fpb(a, b)) * b;
const faktor = (n) => Array.from({ length: n }, (_, i) => i + 1).filter((i) => n % i === 0);
/** Faktor persekutuan dihitung langsung (bukan dari FPB): faktor bilangan pertama yang juga membagi semua yang lain. */
const persekutuan = (...n) => faktor(n[0]).filter((x) => n.every((m) => m % x === 0));
const tanpa = (a, b) => a.filter((x) => !b.includes(x));
const gabung = (d) => d.join(", ");
// Faktor persekutuan = faktor dari FPB (sifat yang dipakai metode luar GCF Concept)
for (const [a, b] of [[12, 18], [6, 12], [8, 20], [12, 28], [15, 35], [12, 42], [24, 18], [18, 24], [14, 28], [15, 20], [13, 26], [20, 28], [48, 60], [60, 120]]) {
  sama(persekutuan(a, b), faktor(fpb(a, b)), `faktor persekutuan ${a} dan ${b} sama dengan faktor dari FPB-nya`);
}

const BUKU = {
  menyimak: [12, 18], // Ayo Menyimak hlm. 48
  eks24A: [[6, 12], [8, 20], [12, 28]], // Eksplorasi 2.4A a, b, c (hlm. 49-50)
  mawar: [24, 18], // Eksplorasi 2.4B (hlm. 51-52)
  latihan1: [[15, 35], [12, 42]], // Ayo Berlatih 1 (hlm. 52)
  dania: [36, 48, 24], // Ayo Berlatih 2 (hlm. 53)
  tambahan: [[18, 24], [14, 28], [15, 20], [13, 26], [20, 28]], // Soal tambahan Panduan Guru hlm. 72
  diferensiasi: [[48, 60], [60, 120], [54, 72, 120]], // Soal tambahan 1 Panduan Guru hlm. 74
  benarSalah: [{ n: [30, 90], klaim: 90 }, { n: [42, 60], klaim: 6 }, { n: [23, 27], klaim: null }], // Soal tambahan 2 hlm. 75
};
// Kunci Panduan Guru hlm. 70-71 untuk Eksplorasi 2.4A (dibandingkan dengan hitungan mandiri)
sama(BUKU.eks24A.map(([a, b]) => [persekutuan(a, b), fpb(a, b)]), [[[1, 2, 3, 6], 6], [[1, 2, 4], 4], [[1, 2, 4], 4]], "Eksplorasi 2.4A: kunci buku cocok dengan hitungan");
// Ayo Menyimak: lubang berisi dua biji adalah 1, 2, 3, dan 6
sama(persekutuan(12, 18), [1, 2, 3, 6], "Ayo Menyimak: lubang berisi dua biji");
sama(faktor(12), [1, 2, 3, 4, 6, 12], "faktor 12");
// Temuan buku: Buku Siswa hlm. 48 dan Panduan Guru hlm. 69 menulis faktor 18 = 1, 2, 3, 6, 18 (tanpa 9)
const FAKTOR18_BUKU = [1, 2, 3, 6, 18];
sama(tanpa(faktor(18), FAKTOR18_BUKU), [9], "temuan buku: faktor 18 di buku kehilangan 9");
// Eksplorasi 2.4B: Tabel 2.2
sama(faktor(24).map((f) => 24 / f), [24, 12, 8, 6, 4, 3, 2, 1], "Tabel 2.2: vas untuk 24 mawar merah");
sama(faktor(18).map((f) => 18 / f), [18, 9, 6, 3, 2, 1], "Tabel 2.2: vas untuk 18 mawar putih");
sama([fpb(24, 18), 24 / fpb(24, 18), 18 / fpb(24, 18)], [6, 4, 3], "mawar: 6 vas, 4 merah, 3 putih");
// Temuan buku: hlm. 52 menyebut faktor persekutuan 24 dan 18 hanya 2, 3, 6 (tanpa 1)
sama(tanpa(persekutuan(24, 18), [2, 3, 6]), [1], "temuan buku: faktor persekutuan 24 dan 18 di buku kehilangan 1");
// Ayo Berlatih 1: kunci Panduan Guru hlm. 75
sama([faktor(15), faktor(35), persekutuan(15, 35), fpb(15, 35)], [[1, 3, 5, 15], [1, 5, 7, 35], [1, 5], 5], "Berlatih 1a: kunci cocok dengan hitungan");
sama([faktor(12), faktor(42), persekutuan(12, 42), fpb(12, 42)], [[1, 2, 3, 4, 6, 12], [1, 2, 3, 6, 7, 14, 21, 42], [1, 2, 3, 6], 6], "Berlatih 1b: kunci cocok dengan hitungan");
// Ayo Berlatih 2: Dania, kunci Panduan Guru hlm. 76
{
  const paket = (n) => faktor(n).map((f) => n / f);
  sama(paket(36), [36, 18, 12, 9, 6, 4, 3, 2, 1], "Dania: paket untuk 36 susu");
  sama(paket(48), [48, 24, 16, 12, 8, 6, 4, 3, 2, 1], "Dania: paket untuk 48 permen");
  sama(paket(24), [24, 12, 8, 6, 4, 3, 2, 1], "Dania: paket untuk 24 biskuit");
  sama([fpbBanyak(...BUKU.dania), ...BUKU.dania.map((n) => n / fpbBanyak(...BUKU.dania))], [12, 3, 4, 2], "Dania: 12 paket, isi 3, 4, 2");
  // paket yang muncul di ketiga tabel
  const ketiga = paket(36).filter((p) => paket(48).includes(p) && paket(24).includes(p));
  sama(ketiga, [12, 6, 4, 3, 2, 1], "Dania: jumlah paket di ketiga tabel");
}
// Soal tambahan: tidak ada kunci di buku, hitungan mandiri
sama(BUKU.tambahan.map((p) => fpb(...p)), [6, 14, 5, 13, 4], "soal tambahan Panduan Guru hlm. 72: FPB");
sama(BUKU.diferensiasi.map((p) => fpbBanyak(...p)), [12, 60, 6], "soal tambahan diferensiasi: FPB");
sama(BUKU.benarSalah.map((s) => (s.klaim === null ? false : fpbBanyak(...s.n) === s.klaim)), [false, true, false], "benar atau salah: A salah, B benar, C salah");
sama([fpbBanyak(30, 90), fpbBanyak(23, 27), kpk2(12, 18), fpb(12, 18)], [30, 1, 36, 6], "benar atau salah dan contoh KPK dan FPB");

/* ------------------------------ Bilangan di suara (kata) tampak di gambar ------------------------------ */
{
  const SATUAN = { nol: 0, satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
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
  /** Semua bilangan yang disebut dengan kata di suara (berurutan, tidak melewati tanda baca). */
  const bilanganSuara = (suara) => {
    const tok = suara.split(/\s+/).filter(Boolean).map((w) => ({ w: w.toLowerCase().replace(/[^a-z]/g, ""), brk: /[,.:;?!]$/.test(w) }));
    const hasil = [];
    let i = 0;
    while (i < tok.length) {
      let dapat = null;
      for (let j = Math.min(tok.length, i + 5); j > i; j -= 1) {
        if (tok.slice(i, j - 1).some((x) => x.brk)) continue;
        const v = nilaiKata(tok.slice(i, j).map((x) => x.w));
        if (v !== null) {
          dapat = { v, j };
          break;
        }
      }
      if (dapat) {
        hasil.push(dapat.v);
        i = dapat.j;
      } else i += 1;
    }
    return hasil;
  };
  sama(bilanganSuara("dua belas dan delapan belas, kali tiga puluh enam sama dengan seratus dua puluh satu"), [12, 18, 36, 121], "pemeriksa bilangan suara: belasan, puluhan, ratusan");
  sama(bilanganSuara("satu, dua, tiga, dan enam"), [1, 2, 3, 6], "pemeriksa bilangan suara: dipisah tanda baca");
  let n = 0;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      const lihat = new Set();
      a.ketukan.forEach((kt, i) => {
        for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) for (const b of bilanganDari(o.isi)) lihat.add(b);
        for (const b of bilanganSuara(kt.suara)) {
          if (b < 6) continue;
          n += 1;
          cek(lihat.has(String(b)), `${v.id}/${a.id}#${i + 1}: bilangan ${b} di suara tampak di gambar`);
        }
      });
    }
  }
  cek(n >= 250, `jumlah bilangan di suara yang dicocokkan dengan gambar (${n})`);
  stat.angkaSuara = n;
}

/* ------------------------------ Persamaan di gambar ------------------------------ */
const nilaiEkspresi = (s) => {
  const t = s.trim().replace(/×/g, "*").replace(/−/g, "-").replace(/:/g, "/");
  return Function(`"use strict"; return (${t || "NaN"});`)();
};
{
  let n = 0;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((_, i) => {
        for (const o of akhirAdegan(a, i)) {
          if (o.t !== "teks" || !o.isi || !/^\s*[\d(][\d\s+×−\-():/]*(?:=[\d\s+×−\-():/]+)+$/.test(o.isi.trim())) continue;
          const bagian = o.isi.split("=").map((s) => s.trim()).filter(Boolean);
          if (bagian.length < 2) continue;
          const nilai = bagian.map(nilaiEkspresi);
          n += 1;
          cek(nilai.every((x) => Math.abs(x - nilai[0]) < 1e-9), `${v.id}/${a.id}#${i + 1}: persamaan "${o.isi}" benar (${nilai.join(" ; ")})`);
        }
      });
    }
  }
  cek(n >= 30, `jumlah persamaan yang diperiksa (${n})`);
  stat.persamaan = n;
}

/* ------------------------------ Pernyataan FPB di gambar ------------------------------ */
{
  let n = 0;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((_, i) => {
        for (const o of akhirAdegan(a, i)) {
          if (o.t !== "teks" || !o.isi) continue;
          const m = /^FPB (?:dari )?([\d, dan]+?)(?: adalah |: )(\d+)$/.exec(o.isi);
          if (!m) continue;
          const angka = m[1].match(/\d+/g).map(Number);
          n += 1;
          cek(fpbBanyak(...angka) === Number(m[2]), `${v.id}/${a.id}#${i + 1}: "${o.isi}" benar (FPB = ${fpbBanyak(...angka)})`);
        }
      });
    }
  }
  cek(n >= 25, `jumlah pernyataan FPB yang diperiksa (${n})`);
  stat.fpb = n;
}

/* ------------------------------ Geometri gambar: papan congklak ------------------------------ */
// Tata letak papan di Buku Siswa hlm. 47 dan 49: papan atas 1-7 (kiri ke kanan) dan 14-8, papan bawah 15-21 dan 22-28.
const letakBuku = (n) => (n <= 7 ? [n - 1, 0] : n <= 14 ? [14 - n, 1] : n <= 21 ? [n - 15, 2] : [n - 22, 3]);
const lubangPapan = (objs, id) => {
  const peta = new Map();
  for (let n = 1; n <= 28; n += 1) {
    const l = objs.find((o) => o.id === `${id}-L${n}`);
    const t = objs.find((o) => o.id === `${id}-N${n}`);
    if (l && t) peta.set(n, { x: l.x, y: l.y, r: l.r, warna: l.warna, nomor: t.isi, tx: t.x });
  }
  return peta;
};
const cekPapan = (objs, id, a, b, nama) => {
  const p = lubangPapan(objs, id);
  stat.papan += 1;
  cek(p.size === 28, `${nama}: papan ${id} punya 28 lubang`);
  if (p.size !== 28) return;
  const h1 = p.get(1);
  const dx = p.get(2).x - h1.x;
  const dy = p.get(14).y - h1.y;
  const y3 = p.get(15).y - h1.y;
  cek(dx > 2 * h1.r && dy > 2 * h1.r && y3 > 2 * dy - 1, `${nama}: jarak antarlubang cukup (dx=${dx}, dy=${dy})`);
  for (let n = 1; n <= 28; n += 1) {
    const q = p.get(n);
    const [kol, baris] = letakBuku(n);
    const yDiharap = h1.y + (baris < 2 ? baris * dy : y3 + (baris - 2) * dy);
    cek(Math.abs(q.x - (h1.x + kol * dx)) < 0.05 && Math.abs(q.y - yDiharap) < 0.05, `${nama}: lubang ${n} di tempat yang sama dengan gambar buku`);
    cek(q.nomor === String(n) && Math.abs(q.tx - q.x) < 0.05, `${nama}: nomor lubang ${n} di tengah lubang`);
    const dalamA = a.includes(n);
    const dalamB = b.includes(n);
    const warna = dalamA && dalamB ? EMAS : dalamA ? HIJAU_PITA : dalamB ? MERAH_PITA : PUTIH;
    cek(q.warna === warna, `${nama}: lubang ${n} berwarna sesuai faktor (A=${dalamA}, B=${dalamB}, ada ${q.warna})`);
  }
  // dua papan: lubang 1-14 di badan atas, 15-28 di badan bawah
  const p1 = objs.find((o) => o.id === `${id}-p1`);
  const p2 = objs.find((o) => o.id === `${id}-p2`);
  cek(Boolean(p1 && p2), `${nama}: dua badan papan ada`);
  if (p1 && p2) {
    const dalam = (k, q) => q.x - q.r >= k.x && q.x + q.r <= k.x + k.w && q.y - q.r >= k.y && q.y + q.r <= k.y + k.h;
    cek([...p.keys()].every((n) => dalam(n <= 14 ? p1 : p2, p.get(n))), `${nama}: lubang 1-14 di papan pertama dan 15-28 di papan kedua`);
    cek(p1.y + p1.h < p2.y, `${nama}: dua papan tidak bertumpuk`);
  }
};
{
  const f = faktor;
  const P = (v, id, ke, pp, A, B) => cekPapan(ket(v, id, ke), pp, A, B, `${v.id}/${id}#${ke + 1}`);
  // Aturan permainan: faktor 12 (pemain 1) dan faktor 18 (pemain 2)
  P(M, "aturan-congklak", 0, "pp", [], []);
  P(M, "aturan-congklak", 1, "pp", [], []);
  P(M, "aturan-congklak", 2, "pp", f(12), []);
  P(M, "aturan-congklak", 3, "pp", f(12), f(18));
  P(M, "aturan-congklak", 4, "pp", f(12), f(18));
  // Eksplorasi 2.4A soal a, b, c
  for (const ke of [1, 2]) P(M, "eks-24a-ab", ke, "pp", f(6), f(12));
  for (const ke of [3, 4]) P(M, "eks-24a-ab", ke, "pp", f(8), f(20));
  for (const ke of [0, 1]) P(M, "eks-24a-c", ke, "pp", f(12), f(28));
  // Faktor yang disebut dan ditulis di samping papan
  const teksList = (v, id, ke, label, daftar, nama) => {
    const o = ket(v, id, ke);
    sama([nilaiId(o, label[0]), nilaiId(o, label[1])], [`faktor ${nama}:`, gabung(daftar)], `${id}#${ke + 1}: daftar faktor ${nama} di samping papan`);
    stat.daftar += 1;
  };
  teksList(M, "aturan-congklak", 2, ["pf", "pg"], f(12), 12);
  teksList(M, "aturan-congklak", 3, ["qf", "qg"], f(18), 18);
  teksList(M, "eks-24a-ab", 1, ["qa", "qb"], f(6), 6);
  teksList(M, "eks-24a-ab", 1, ["qc", "qd"], f(12), 12);
  teksList(M, "eks-24a-ab", 3, ["ra", "rb"], f(8), 8);
  teksList(M, "eks-24a-ab", 3, ["rc", "rd"], f(20), 20);
  teksList(M, "eks-24a-c", 0, ["sa", "sb"], f(12), 12);
  teksList(M, "eks-24a-c", 0, ["sc", "sd"], f(28), 28);
  // Hasil: faktor persekutuan dan FPB tertulis
  sama(nilaiId(ket(M, "aturan-congklak", 4), "rk-t1"), gabung(persekutuan(12, 18)), "aturan: lubang berisi dua biji");
  sama(nilaiId(ket(M, "aturan-congklak", 4), "rm"), "lubang 1, 2, 3, dan 6", "aturan: kalimat hasil");
  sama(nilaiId(ket(M, "eks-24a-ab", 2), "ha-t1"), gabung(persekutuan(6, 12)), "Eks 2.4A a: faktor persekutuan");
  sama(nilaiId(ket(M, "eks-24a-ab", 4), "hc-t1"), gabung(persekutuan(8, 20)), "Eks 2.4A b: faktor persekutuan");
  sama(nilaiId(ket(M, "eks-24a-c", 1), "hc-t1"), gabung(persekutuan(12, 28)), "Eks 2.4A c: faktor persekutuan");
  sama(nilaiId(ket(M, "faktor-persekutuan", 3), "fp-t1"), gabung(persekutuan(12, 18)), "faktor persekutuan 12 dan 18");
}

/* ------------------------------ Geometri gambar: baris sel dan diagram irisan ------------------------------ */
const barisSel = (objs, id) => {
  const sel = [];
  for (let i = 0; ; i += 1) {
    const kt = objs.find((o) => o.id === `${id}-${i}`);
    if (!kt) break;
    const tx = objs.find((o) => o.id === `${id}-t${i}`);
    sel.push({ isi: Number(tx?.isi), warna: kt.warna, x: kt.x, y: kt.y, w: kt.w, h: kt.h, tx: tx?.x, ty: tx?.y });
  }
  return sel;
};
const cekBaris = (objs, id, isi, emas, nama) => {
  const sel = barisSel(objs, id);
  stat.baris += 1;
  sama(sel.map((s) => s.isi), isi, `${nama}: isi baris ${id}`);
  if (emas !== null) sama(sel.filter((s) => s.warna === EMAS).map((s) => s.isi), emas, `${nama}: sel emas baris ${id}`);
  cek(sel.every((s, i) => i === 0 || (Math.abs(s.x - (sel[i - 1].x + sel[i - 1].w)) < 0.2 && s.y === sel[0].y && s.w === sel[0].w)), `${nama}: sel baris ${id} berurutan tanpa celah`);
  cek(sel.every((s) => Math.abs(s.tx - (s.x + s.w / 2)) < 0.2 && s.ty > s.y && s.ty < s.y + s.h + 3), `${nama}: angka di tengah sel baris ${id}`);
  cek(sel.length > 0 && sel[sel.length - 1].x + sel[sel.length - 1].w < 300, `${nama}: baris ${id} masuk kanvas`);
};
// Diagram irisan: pusat dan jari-jari lingkaran dari gambar, kelas tiap bilangan ditentukan oleh letaknya.
const vennDari = (objs, id) => {
  const A = objs.find((o) => o.id === `${id}-A`);
  const B = objs.find((o) => o.id === `${id}-B`);
  const hasil = { l: [], m: [], r: [], ok: Boolean(A && B) };
  if (!A || !B) return hasil;
  for (const o of objs) {
    const m = new RegExp(`^${id}-([lmr])(\\d+)$`).exec(o.id);
    if (!m) continue;
    const cy = o.y - (o.u ?? 10) * 0.35; // pusat teks kira-kira
    const dalamA = Math.hypot(o.x - A.x, cy - A.y) <= A.r - 2;
    const dalamB = Math.hypot(o.x - B.x, cy - B.y) <= B.r - 2;
    const kelas = dalamA && dalamB ? "m" : dalamA ? "l" : dalamB ? "r" : "?";
    cek(kelas === m[1], `venn ${id}: bilangan ${m[2]} berada di daerah ${kelas}, ditulis ${m[1]}`);
    hasil[m[1]].push(Number(m[2]));
    cek(Number(o.isi) === Number(m[2]), `venn ${id}: teks ${o.id} berisi ${m[2]}`);
  }
  for (const k2 of ["l", "m", "r"]) hasil[k2].sort((p, q) => p - q);
  return hasil;
};
const cekVenn = (objs, id, a, b, nama) => {
  const v = vennDari(objs, id);
  stat.venn += 1;
  cek(v.ok, `${nama}: dua lingkaran ${id} ada`);
  sama(v.l, tanpa(faktor(a), faktor(b)), `${nama}: hanya faktor ${a}`);
  sama(v.m, persekutuan(a, b), `${nama}: irisan faktor ${a} dan ${b}`);
  sama(v.r, tanpa(faktor(b), faktor(a)), `${nama}: hanya faktor ${b}`);
};
{
  const f = faktor;
  // Faktor persekutuan 12 dan 18 (materi)
  cekBaris(ket(M, "faktor-persekutuan", 0), "f12", f(12), null, "faktor-persekutuan#1");
  {
    // sebelum catatan guru: gambar memuat faktor 18 versi buku (tanpa 9); sesudahnya versi lengkap dengan 9 berwarna emas
    const a = adegan(M, "faktor-persekutuan");
    const sebelum = L.keadaanStory(a, 1, L.posisiKata(a.ketukan[1].suara, "Catatan") - 1);
    sama(barisSel(sebelum, "f18").map((s) => s.isi), FAKTOR18_BUKU, "faktor-persekutuan#2: versi buku faktor 18 tanpa 9 (temuan buku)");
    cekBaris(ket(M, "faktor-persekutuan", 1), "g18", f(18), [9], "faktor-persekutuan#2");
    cek(barisSel(ket(M, "faktor-persekutuan", 1), "f18").length === 0, "faktor-persekutuan#2: versi buku dihapus setelah catatan");
  }
  cekVenn(ket(M, "faktor-persekutuan", 2), "v", 12, 18, "faktor-persekutuan#3");
  cekBaris(ket(M, "faktor-persekutuan", 4), "cm", persekutuan(12, 18), [6], "faktor-persekutuan#5");
  // Eksplorasi 2.4B: Tabel 2.2
  cekBaris(ket(M, "eks-24b-masalah", 3), "m1", f(24), null, "eks-24b-masalah#4");
  cekBaris(ket(M, "eks-24b-masalah", 3), "m2", f(24).map((x) => 24 / x), null, "eks-24b-masalah#4");
  cekBaris(ket(M, "eks-24b-masalah", 4), "p1", f(18), null, "eks-24b-masalah#5");
  cekBaris(ket(M, "eks-24b-masalah", 4), "p2", f(18).map((x) => 18 / x), null, "eks-24b-masalah#5");
  // Hasil 2.4B: faktor persekutuan di tabel (kunci buku menyebut 2, 3, 6; catatan guru menambah 1)
  cekBaris(ket(M, "eks-24b-hasil", 0), "a", f(24), [2, 3, 6], "eks-24b-hasil#1");
  cekBaris(ket(M, "eks-24b-hasil", 0), "b", f(18), [2, 3, 6], "eks-24b-hasil#1");
  cekBaris(ket(M, "eks-24b-hasil", 1), "a", f(24), persekutuan(24, 18), "eks-24b-hasil#2");
  cekBaris(ket(M, "eks-24b-hasil", 1), "b", f(18), persekutuan(24, 18), "eks-24b-hasil#2");
  // Ayo Berlatih 1
  cekBaris(ket(M, "berlatih-1", 0), "n15", f(15), null, "berlatih-1#1");
  cekBaris(ket(M, "berlatih-1", 0), "n35", f(35), null, "berlatih-1#1");
  cekBaris(ket(M, "berlatih-1", 1), "n15", f(15), persekutuan(15, 35), "berlatih-1#2");
  cekBaris(ket(M, "berlatih-1", 1), "n35", f(35), persekutuan(15, 35), "berlatih-1#2");
  cekBaris(ket(M, "berlatih-1", 2), "o12", f(12), null, "berlatih-1#3");
  cekBaris(ket(M, "berlatih-1", 2), "o42", f(42), null, "berlatih-1#3");
  cekBaris(ket(M, "berlatih-1", 3), "o12", f(12), persekutuan(12, 42), "berlatih-1#4");
  cekBaris(ket(M, "berlatih-1", 3), "o42", f(42), persekutuan(12, 42), "berlatih-1#4");
  // Ayo Berlatih 2: Dania
  const paket = (n) => f(n).map((x) => n / x);
  cekBaris(ket(M, "berlatih-2", 1), "sa", f(36), null, "berlatih-2#2");
  cekBaris(ket(M, "berlatih-2", 1), "sb", paket(36), null, "berlatih-2#2");
  const ketiga = paket(36).filter((p) => paket(48).includes(p) && paket(24).includes(p));
  cekBaris(ket(M, "berlatih-2", 2), "ra", paket(36), paket(36).filter((p) => ketiga.includes(p)), "berlatih-2#3");
  cekBaris(ket(M, "berlatih-2", 2), "rb", paket(48), paket(48).filter((p) => ketiga.includes(p)), "berlatih-2#3");
  cekBaris(ket(M, "berlatih-2", 2), "rc", paket(24), paket(24).filter((p) => ketiga.includes(p)), "berlatih-2#3");
  // Metode luar: Common Factors List
  cekBaris(ket(U, "luar-daftar", 1), "c12", f(12), null, "luar-daftar#2");
  cekBaris(ket(U, "luar-daftar", 1), "c18", f(18), null, "luar-daftar#2");
  cekBaris(ket(U, "luar-daftar", 2), "c12", f(12), persekutuan(12, 18), "luar-daftar#3");
  cekBaris(ket(U, "luar-daftar", 2), "c18", f(18), persekutuan(12, 18), "luar-daftar#3");
  cekBaris(ket(U, "luar-daftar", 3), "cm", persekutuan(12, 18), [6], "luar-daftar#4");
  cekBaris(ket(U, "luar-daftar-terapan", 0), "t18", f(18), null, "luar-daftar-terapan#1");
  cekBaris(ket(U, "luar-daftar-terapan", 0), "t24", f(24), null, "luar-daftar-terapan#1");
  cekBaris(ket(U, "luar-daftar-terapan", 1), "t18", f(18), persekutuan(18, 24), "luar-daftar-terapan#2");
  cekBaris(ket(U, "luar-daftar-terapan", 1), "t24", f(24), persekutuan(18, 24), "luar-daftar-terapan#2");
  cekBaris(ket(U, "luar-daftar-terapan", 2), "v14", f(14), null, "luar-daftar-terapan#3");
  cekBaris(ket(U, "luar-daftar-terapan", 2), "v28", f(28), null, "luar-daftar-terapan#3");
  cekBaris(ket(U, "luar-daftar-terapan", 3), "v14", f(14), persekutuan(14, 28), "luar-daftar-terapan#4");
  cekBaris(ket(U, "luar-daftar-terapan", 3), "v28", f(28), persekutuan(14, 28), "luar-daftar-terapan#4");
  // Metode luar: GCF Concept
  cekVenn(ket(U, "luar-gcf", 1), "g", 8, 20, "luar-gcf#2");
  cekVenn(ket(U, "luar-gcf", 2), "g", 8, 20, "luar-gcf#3");
  cekVenn(ket(U, "luar-gcf-terapan", 1), "h", 12, 28, "luar-gcf-terapan#2");
  cekVenn(ket(U, "luar-gcf-terapan", 2), "h", 12, 28, "luar-gcf-terapan#3");
  cekVenn(ket(U, "luar-gcf-terapan", 3), "i", 6, 12, "luar-gcf-terapan#4");
  cekVenn(ket(U, "luar-gcf-terapan", 4), "i", 6, 12, "luar-gcf-terapan#5");
  // FPB di irisan ditandai: bilangan terbesar di irisan
  cek(nilaiId(ket(U, "luar-gcf", 2), "g-m4") === "4" && ket(U, "luar-gcf", 2).find((o) => o.id === "g-m4").warna === "#DC2626", "luar-gcf: FPB 4 ditandai merah di irisan");
  cek(ket(U, "luar-gcf-terapan", 4).find((o) => o.id === "i-m6").warna === "#DC2626", "luar-gcf-terapan: FPB 6 ditandai merah di irisan");
  cek(ket(U, "luar-gcf-terapan", 2).find((o) => o.id === "h-m4").warna === "#DC2626", "luar-gcf-terapan: FPB 4 ditandai merah di irisan");
  // bagian khusus faktor 6 kosong (semua faktor 6 ada di faktor 12)
  cek(tanpa(f(6), f(12)).length === 0, "6 adalah faktor dari 12 sehingga bagian khusus faktor 6 kosong");
}

/* ------------------------------ Geometri gambar: deret vas dan paket ------------------------------ */
const cekDeret = (objs, kotakAwalan, teksAwalan, n, isi, nama) => {
  const kotakAda = objs.filter((o) => o.t === "kotak" && new RegExp(`^${kotakAwalan}\\d+$`).test(o.id));
  stat.deret += 1;
  cek(kotakAda.length === n, `${nama}: ${n} kotak ${kotakAwalan} (ada ${kotakAda.length})`);
  for (let i = 0; i < n; i += 1) {
    const kt = objs.find((o) => o.id === `${kotakAwalan}${i}`);
    if (!kt) continue;
    const kt2 = objs.find((o) => o.id === `${kotakAwalan}${i + 1}`);
    if (kt2 && kt2.y === kt.y) cek(kt.x + kt.w <= kt2.x, `${nama}: kotak ${kotakAwalan}${i} tidak menimpa kotak berikutnya`);
    teksAwalan.forEach((aw, q) => {
      const tx = objs.find((o) => o.id === `${aw}${i}`);
      cek(Boolean(tx) && tx.isi === isi[q], `${nama}: teks ${aw}${i} berisi "${isi[q]}" (ada "${tx?.isi}")`);
      if (tx) cek(Math.abs(tx.x - (kt.x + kt.w / 2)) < 0.2 && tx.y > kt.y && tx.y < kt.y + kt.h, `${nama}: teks ${aw}${i} di dalam kotak ${kotakAwalan}${i}`);
    });
  }
};
{
  const [m, p] = BUKU.mawar;
  const vas = fpb(m, p);
  cekDeret(ket(M, "eks-24b-hasil", 2), "vs", ["vm", "vp"], vas, [`${m / vas} merah`, `${p / vas} putih`], "eks-24b-hasil#3 (vas)");
  cekDeret(ket(U, "luar-paket-terapan", 1), "vs", ["vm", "vp"], vas, [`${m / vas} merah`, `${p / vas} putih`], "luar-paket-terapan#2 (vas)");
  const [kue, permen] = [12, 18];
  const pk = fpb(kue, permen);
  cekDeret(ket(U, "luar-paket", 2), "pk", ["pa", "pb"], pk, [`${kue / pk} kue`, `${permen / pk} permen`], "luar-paket#3 (paket)");
  const dania = fpbBanyak(...BUKU.dania);
  cekDeret(ket(M, "berlatih-2", 3), "pk", ["pt"], dania, [BUKU.dania.map((n) => n / dania).join("-")], "berlatih-2#4 (paket Dania)");
  // Kalimat ringkas yang menyebut jumlah dan isi
  sama(nilaiId(ket(M, "berlatih-2", 3), "pu"), `${dania} paket: tiap paket ${BUKU.dania[0] / dania} susu, ${BUKU.dania[1] / dania} permen, ${BUKU.dania[2] / dania} biskuit`, "berlatih-2#4: kalimat ringkas");
  sama(nilaiId(ket(M, "eks-24b-hasil", 2), "vn"), `${vas} vas`, "eks-24b-hasil#3: jumlah vas");
  sama([nilaiId(ket(M, "eks-24b-hasil", 3), "pe1"), nilaiId(ket(M, "eks-24b-hasil", 3), "pe3")], [`${vas} × ${m / vas} = ${m}`, `${vas} × ${p / vas} = ${p}`], "eks-24b-hasil#4: pemeriksaan");
  // Paket Dania di metode luar
  sama([nilaiId(ket(U, "luar-paket-terapan", 3), "z1"), nilaiId(ket(U, "luar-paket-terapan", 3), "z2"), nilaiId(ket(U, "luar-paket-terapan", 3), "z3")], BUKU.dania.map((n) => `${n} : ${dania} = ${n / dania}`), "luar-paket-terapan#4: isi tiap paket");
  sama([nilaiId(ket(U, "luar-paket-terapan", 1), "x1"), nilaiId(ket(U, "luar-paket-terapan", 1), "x2")], [`${m} : ${vas} = ${m / vas}`, `${p} : ${vas} = ${p / vas}`], "luar-paket-terapan#2: isi tiap vas");
  sama([nilaiId(ket(U, "luar-paket", 3), "w1"), nilaiId(ket(U, "luar-paket", 3), "w2")], [`${kue} : ${pk} = ${kue / pk}`, `${permen} : ${pk} = ${permen / pk}`], "luar-paket#4: isi tiap paket");
  // 7 paket tidak mungkin: 7 tidak membagi 12 maupun 18
  cek(12 % 7 !== 0 && 18 % 7 !== 0, "7 paket tidak mungkin untuk 12 kue dan 18 permen");
  cek([2, 3, 6].every((x) => 12 % x === 0 && 18 % x === 0), "2, 3, dan 6 paket mungkin untuk 12 kue dan 18 permen");
  // Soal tambahan dan diferensiasi
  const a7 = ket(M, "eks-24a-c", 3);
  sama(BUKU.tambahan.map((_, i) => nilaiId(a7, `t${i + 1}`)), BUKU.tambahan.map(([x, y], i) => `${i + 1}. ${x} dan ${y}`), "soal tambahan: pasangan di gambar");
  const a8 = ket(M, "eks-24a-c", 4);
  sama(BUKU.tambahan.map((_, i) => nilaiId(a8, `u${i + 1}`)), BUKU.tambahan.map(([x, y]) => `FPB ${fpb(x, y)}`), "soal tambahan: FPB di gambar");
  const a9 = ket(M, "penutup-guru", 2);
  sama([nilaiId(a9, "df1"), nilaiId(a9, "df2"), nilaiId(a9, "df3")], ["a. 48 dan 60", "b. 60 dan 120", "c. 54, 72, dan 120"], "diferensiasi: soal di gambar");
  const a10 = ket(M, "penutup-guru", 3);
  sama([nilaiId(a10, "dg1"), nilaiId(a10, "dg2"), nilaiId(a10, "dg3")], BUKU.diferensiasi.map((n) => `FPB ${fpbBanyak(...n)}`), "diferensiasi: FPB di gambar");
  const a11 = ket(M, "penutup-guru", 5);
  sama([nilaiId(a11, "bj1"), nilaiId(a11, "bj2"), nilaiId(a11, "bj3")], ["A salah: FPB-nya 30", "B benar: FPB-nya 6", "C salah: FPB-nya 1"], "benar atau salah: kunci mandiri di gambar");
  sama([fpbBanyak(30, 90), fpbBanyak(42, 60), fpbBanyak(23, 27)], [30, 6, 1], "benar atau salah: FPB mandiri");
  const a12 = ket(M, "penutup-guru", 1);
  sama(nilaiId(a12, "x2-t0"), `salah: ${kpk2(12, 18)} adalah KPK`, "miskonsepsi 2: 36 adalah KPK dari 12 dan 18");
  sama(nilaiId(a12, "x2-t1"), `FPB 12 dan 18 adalah ${fpb(12, 18)}`, "miskonsepsi 2: FPB 12 dan 18");
}

/* ------------------------------ Euclid Preview: langkah selisih dan sisa dihitung mandiri ------------------------------ */
{
  // Ganti pasangan (besar, kecil) dengan (kecil, selisih) yang diurutkan, sampai sama.
  const langkah = (a, b) => {
    const hasil = [];
    let [x, y] = a >= b ? [a, b] : [b, a];
    while (x !== y) {
      const d = x - y;
      const baru = y >= d ? [y, d] : [d, y];
      hasil.push({ pers: `${x} − ${y} = ${d}`, pasangan: `pasangan baru: ${baru[0]} dan ${baru[1]}` });
      [x, y] = baru;
    }
    return { hasil, akhir: x };
  };
  const a = langkah(18, 12);
  sama(a.akhir, fpb(18, 12), "Euclid: selisih berulang 18 dan 12 berakhir di FPB");
  const k2 = ket(U, "luar-euclid", 1);
  sama([nilaiId(k2, "s1"), nilaiId(k2, "p1"), nilaiId(k2, "s2"), nilaiId(k2, "p2")], [a.hasil[0].pers, a.hasil[0].pasangan, a.hasil[1].pers, a.hasil[1].pasangan], "Euclid konsep: langkah 18 dan 12");
  const b = langkah(24, 18);
  sama(b.akhir, fpb(24, 18), "Euclid: selisih berulang 24 dan 18 berakhir di FPB");
  const t2 = ket(U, "luar-euclid-terapan", 1);
  sama(
    [nilaiId(t2, "t1"), nilaiId(t2, "t2"), nilaiId(t2, "t3"), nilaiId(t2, "t4"), nilaiId(t2, "t5"), nilaiId(t2, "t6")],
    [b.hasil[0].pers, b.hasil[0].pasangan, b.hasil[1].pers, b.hasil[1].pasangan, b.hasil[2].pers, b.hasil[2].pasangan],
    "Euclid penerapan: langkah 24 dan 18",
  );
  // Sisa pembagian untuk 42 dan 12
  const sisa = [];
  {
    let [x, y] = [42, 12];
    while (y !== 0) {
      sisa.push([x, y, Math.floor(x / y), x % y]);
      [x, y] = [y, x % y];
    }
    sama(x, fpb(42, 12), "Euclid: sisa pembagian 42 dan 12 berakhir di FPB");
  }
  sama(sisa, [[42, 12, 3, 6], [12, 6, 2, 0]], "Euclid: langkah sisa pembagian 42 dan 12");
  const t4 = ket(U, "luar-euclid-terapan", 3);
  const t5 = ket(U, "luar-euclid-terapan", 4);
  sama([nilaiId(t4, "u2"), nilaiId(t4, "u3"), nilaiId(t5, "u4")], [`${sisa[0][0]} : ${sisa[0][1]} = ${sisa[0][2]} sisa ${sisa[0][3]}`, `${sisa[0][0]} = ${sisa[0][2]} × ${sisa[0][1]} + ${sisa[0][3]}`, `${sisa[1][0]} = ${sisa[1][2]} × ${sisa[1][1]} + ${sisa[1][3]}`], "Euclid penerapan: sisa pembagian di gambar");
  // pembuktian sifat: faktor persekutuan 18 dan 12 membagi selisihnya
  cek(persekutuan(18, 12).every((x) => (18 - 12) % x === 0), "faktor persekutuan 18 dan 12 membagi selisihnya");
  sama([18 / 6, 12 / 6, 6 / 6], [3, 2, 1], "mengapa benar: 6 membagi 18, 12, dan 6");
  const q = ket(U, "luar-euclid", 3);
  sama([nilaiId(q, "q1"), nilaiId(q, "q2"), nilaiId(q, "q3")], ["18 : 6 = 3", "12 : 6 = 2", "6 : 6 = 1"], "Euclid konsep: 6 membagi 18, 12, dan 6");
  // GCF Concept: setiap bilangan di irisan membagi FPB
  const g = ket(U, "luar-gcf", 3);
  sama([nilaiId(g, "q1"), nilaiId(g, "q2"), nilaiId(g, "q3")], persekutuan(8, 20).map((x) => `${fpb(8, 20)} : ${x} = ${fpb(8, 20) / x}`), "GCF Concept: isi irisan membagi FPB");
  sama(nilaiId(g, "q4"), `faktor dari ${fpb(8, 20)}: ${gabung(faktor(fpb(8, 20)))}`, "GCF Concept: faktor dari FPB sama dengan isi irisan");
  // Soal tambahan di metode luar
  sama(nilaiId(ket(U, "luar-daftar", 1), "pf"), "12 = 1 × 12 = 2 × 6 = 3 × 4", "Common Factors List: pasangan faktor 12");
  cek(faktor(12).length === 6 && [[1, 12], [2, 6], [3, 4]].every(([x, y]) => x * y === 12), "pasangan faktor 12 lengkap");
}

/* ------------------------------ Pemisahan materi dan metode luar ------------------------------ */
{
  const teksVideo = (v) => JSON.stringify(seluruhTeks(v));
  const NAMA_METODE = /Common Factors List|GCF Concept|Euclid|Equal Packing|metode luar|metode dari luar|irisan dua lingkaran/i;
  const materi = teksVideo(M);
  const luar = teksVideo(U);
  cek(!NAMA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of ["Common Factors List", "GCF Concept", "Euclid Preview", "Equal Packing"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(M.adegan.every((a) => /(Buku Siswa|Panduan Guru) hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(U.adegan.every((a) => /metode luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  for (const kata of ["Subbab D", "Faktor Persekutuan", "Ayo Menyimak", "Eksplorasi 2.4A", "Eksplorasi 2.4B", "Ayo Berlatih", "congklak", "dakon", "dentuman lamban", "mokaotan", "mawar", "Dania", "Miskonsepsi", "Diferensiasi", "Refleksi nomor 5, 6, dan 7", "Catatan guru", "Panduan Guru", "faktor persekutuan terbesar", "Ayo Berdiskusi", "kelipatan", "KPK"]) cek(materi.includes(kata), `video materi memuat ${kata}`);
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-daftar", "luar-daftar-terapan", "luar-gcf", "luar-gcf-terapan", "luar-euclid", "luar-euclid-terapan", "luar-paket", "luar-paket-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk empat metode");
  cek(M.adegan.length === 12 && U.adegan.length === 10, "12 adegan materi dan 10 adegan metode luar");
  // Subbab D tidak membocorkan Subbab E (bilangan prima, faktorisasi prima, pohon faktor, saringan, pembagian berulang).
  const BOCOR = /prima|faktorisasi|pohon faktor|saringan|eratosthenes|pembagian berulang|bersusun/i;
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  for (const a of M.adegan) cek(!BOCOR.test(teksAdegan(a)), `materi ${a.id} tidak membocorkan Subbab E`);
  for (const a of U.adegan) cek(!BOCOR.test(teksAdegan(a)), `metode luar ${a.id} tidak membocorkan Subbab E`);
  // Refleksi nomor lain, Uji Kompetensi, pengayaan, dan remedial bukan milik subbab ini.
  cek(!/Uji Kompetensi|pengayaan|remedial|Refleksi nomor (satu|dua|tiga|empat|delapan|sembilan|[1-4]|[89])/i.test(materi + luar), "tidak memakai isi subbab lain atau Refleksi nomor lain");
  cek(totalKetukan >= 90, `total ketukan cukup dalam (${totalKetukan})`);
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
  // Buku Siswa hlm. 46-53 = PDF 62-69, Refleksi hlm. 60 = PDF 76; Panduan Guru hlm. 66-76 = PDF 78-88.
  const bagian = existsSync(bs) && existsSync(bg) ? [ambil(bs, 62, 69), ambil(bs, 76, 76), ambil(bg, 78, 88)] : [null];
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
    cek(n >= 120, `jumlah kutipan buku yang diperiksa (${n})`);
    stat.kutipan = n;
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k5b2d-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|k5b2d-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k5b2d sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkusBerkas = new URL("../src/components/modul/video-k5b2d.tsx", import.meta.url);
  const pembungkus = readFileSync(pembungkusBerkas, "utf8");
  cek(!pembungkus.includes("\r"), "video-k5b2d.tsx: akhir baris LF");
  cek(!/video-visual-adegan|AdeganVisual|SUB_D52|video-k4b2-umum|naskah-k5b2/.test(pembungkus) && /VIDEO_MATERI_K5B2D/.test(pembungkus) && /VIDEO_LUAR_K5B2D/.test(pembungkus) && /export function VideoK5B2D/.test(pembungkus) && /DaftarVideoCerita/.test(pembungkus) && /keVideoSiap/.test(pembungkus), "video-k5b2d.tsx: pembungkus tipis, dua video Story, ekspor VideoK5B2D tetap, tanpa naskah lama");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Pemeriksaan: ${stat.persamaan} persamaan, ${stat.fpb} pernyataan FPB, ${stat.angkaSuara} bilangan di suara, ${stat.papan} papan congklak, ${stat.baris} baris sel, ${stat.venn} diagram irisan, ${stat.deret} deret vas atau paket, ${stat.daftar} daftar faktor, ${stat.kutipan ?? 0} kutipan, ${stat.teksPasang} pasangan teks`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
