// Uji Story Kelas 5 Bab 3 Sub-Bab B (penjumlahan bilangan pecahan): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka dan pecahan suara dengan gambar, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// teks bertumpuk, pemisahan materi dan metode luar, tidak membocorkan Subbab C (pengurangan), kutipan buku (bila PDF ada),
// hitungan mandiri dengan pecahan eksak (martabak, penghapus, pita, kertas, wingko, denah), persamaan di gambar, KPK dan kelipatan,
// geometri gambar (batang, lingkaran irisan, penghapus, kisi, lompatan di garis bilangan), emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k5b3b.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k5b3b-video.ts");

const stat = { teksPasang: 0, persamaan: 0, pecahanSuara: 0, batang: 0, lingkaran: 0, penghapus: 0, kisi: 0, lompat: 0 };
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
const VIDEO = [V.VIDEO_MATERI_K5B3B, V.VIDEO_LUAR_K5B3B];
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
const M = V.VIDEO_MATERI_K5B3B;
const U = V.VIDEO_LUAR_K5B3B;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const nilaiId = (objs, id) => objs.find((o) => o.id === id)?.isi;

/* ------------------------------ Data buku dan hitungan mandiri ------------------------------ */
// Buku Siswa hlm. 76-90 (PDF 92-106). Hitungan dengan pecahan eksak (pembilang dan penyebut bilangan bulat), bukan salinan teks kunci.
const fpb = (a, b) => (b === 0 ? Math.abs(a) : fpb(b, a % b));
const kpk2 = (a, b) => (a / fpb(a, b)) * b;
const kpk = (...n) => n.reduce((t, x) => kpk2(t, x));
const pec = (p, q) => ({ p, q });
const tambahPec = (a, b) => {
  const q = kpk2(a.q, b.q);
  return pec((q / a.q) * a.p + (q / b.q) * b.p, q);
};
const sedehana = (a) => {
  const g = fpb(a.p, a.q);
  return pec(a.p / g, a.q / g);
};
const biasa = (bulat, a) => pec(bulat * a.q + a.p, a.q); // campuran ke pecahan biasa
const teksP = (a) => `${a.p}/${a.q}`;
const campuran = (a) => (a.p >= a.q ? `${Math.floor(a.p / a.q)}${a.p % a.q ? ` ${a.p % a.q}/${a.q}` : ""}` : teksP(a));

const BUKU = {
  wingko: [pec(1, 2), pec(1, 3)], // Masalah Lukas hlm. 76
  martabak: [pec(1, 8), pec(2, 8)], // Eksplorasi 3.2A: nanas untuk Lukas, karamel dan stroberi untuk Komang
  penghapus: [pec(2, 10), pec(3, 10)], // Eksplorasi 3.2B: dua dan tiga dari sepuluh penghapus
  pita: [{ bulat: 2, f: pec(1, 5) }, { bulat: 3, f: pec(1, 5) }], // Eksplorasi 3.2C: 2 1/5 m dan 3 1/5 m
  kertas: [pec(1, 3), pec(4, 6)], // Eksplorasi 3.2D
  denah: [{ bulat: 1, f: pec(1, 2) }, pec(1, 200), { bulat: 2, f: pec(1, 4) }], // Eksplorasi 3.2E: 1 1/2, 1/200, 2 1/4 km
};
// Hasil yang dihitung ulang
const H = {};
H.martabak = tambahPec(...BUKU.martabak);
sama(teksP(H.martabak), "3/8", "martabak: 1/8 + 2/8 = 3/8");
H.penghapus = tambahPec(...BUKU.penghapus);
sama([teksP(H.penghapus), teksP(sedehana(H.penghapus))], ["5/10", "1/2"], "penghapus: 2/10 + 3/10 = 5/10 = 1/2");
{
  const [a, b] = BUKU.pita;
  const biasaA = biasa(a.bulat, a.f);
  const biasaB = biasa(b.bulat, b.f);
  sama([teksP(biasaA), teksP(biasaB)], ["11/5", "16/5"], "pita: campuran diubah ke biasa");
  H.pita = tambahPec(biasaA, biasaB);
  sama([teksP(H.pita), campuran(H.pita)], ["27/5", "5 2/5"], "pita: 11/5 + 16/5 = 27/5 = 5 2/5");
  // Cara Komang: bulat dan pecahan dipisah
  sama([a.bulat + b.bulat, teksP(tambahPec(a.f, b.f))], [5, "2/5"], "pita Cara Komang: 2 + 3 dan 1/5 + 1/5");
}
{
  const [a, b] = BUKU.kertas;
  H.kertas = tambahPec(a, b);
  sama(kpk(a.q, b.q), 6, "kertas: KPK 3 dan 6 = 6");
  sama([(6 / 3) * 1, teksP(H.kertas), H.kertas.p / H.kertas.q], [2, "6/6", 1], "kertas: 1/3 = 2/6, 2/6 + 4/6 = 6/6 = 1");
  sama(teksP(sedehana(pec(2 * 1, 6))), "1/3", "1/3 senilai dengan 2/6");
}
{
  H.wingko = tambahPec(...BUKU.wingko);
  sama([kpk(2, 3), teksP(H.wingko)], [6, "5/6"], "wingko: KPK 2 dan 3 = 6, hasil 5/6");
}
{
  const [a, b, c] = BUKU.denah.map((x) => (x.bulat ? biasa(x.bulat, x.f) : x));
  sama([teksP(a), teksP(c)], ["3/2", "9/4"], "denah: 1 1/2 = 3/2 dan 2 1/4 = 9/4");
  const q = kpk(a.q, b.q, c.q);
  sama(q, 200, "denah: KPK 2, 4, 200 = 200");
  sama([(q / a.q) * a.p, (q / c.q) * c.p, (q / b.q) * b.p], [300, 450, 1], "denah: 300/200 + 450/200 + 1/200");
  H.denah = tambahPec(tambahPec(a, c), b);
  sama([teksP(H.denah), campuran(H.denah)], ["751/200", "3 151/200"], "denah: 751/200 = 3 151/200");
  // Cara Lukas: bulat 1 + 2 = 3 dan pecahan 1/2 + 1/4 + 1/200 = 151/200
  const f = tambahPec(tambahPec(pec(1, 2), pec(1, 4)), pec(1, 200));
  sama([1 + 2, teksP(f), (q / 2) * 1, (q / 4) * 1], [3, "151/200", 100, 50], "denah Cara Lukas: 3 dan 151/200 (100/200 + 50/200 + 1/200)");
  sama(3 * 200 + 151, 751, "3 151/200 = 751/200");
}
{
  // contoh umum di video metode luar
  sama([teksP(tambahPec(pec(2, 7), pec(3, 7)))], ["5/7"], "umum: 2/7 + 3/7 = 5/7");
  sama([kpk(4, 6), teksP(tambahPec(pec(1, 4), pec(1, 6)))], [12, "5/12"], "umum: KPK 4 dan 6 = 12, 1/4 + 1/6 = 5/12");
  sama(teksP(tambahPec(pec(2, 6), pec(3, 6))), "5/6", "umum area: 2/6 + 3/6 = 5/6");
  sama(teksP(tambahPec(pec(2, 5), pec(1, 5))), "3/5", "umum garis: 2/5 + 1/5 = 3/5");
}

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
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((_, i) => {
        for (const o of akhirAdegan(a, i)) {
          if (o.t !== "teks" || !o.isi || !/^=?\s*[\d(][\d\s+×():/]*(?:=[\d\s+×():/]+)*$/.test(o.isi.trim()) || !o.isi.includes("=")) continue;
          const bagian = o.isi.split("=").map((s) => s.trim()).filter(Boolean);
          if (bagian.length < 2) continue;
          const nilai = bagian.map(nilaiEkspresi);
          n += 1;
          cek(nilai.every((x) => Math.abs(x - nilai[0]) < 1e-9), `${v.id}/${a.id}#${i + 1}: persamaan "${o.isi}" benar (${nilai.join(" ; ")})`);
        }
      });
    }
  }
  cek(n >= 40, `jumlah persamaan yang diperiksa (${n})`);
  stat.persamaan = n;
}

/* ------------------------------ Pecahan yang disebut di suara tampak di gambar ------------------------------ */
{
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
  const pecahanSuara = (suara) => {
    const tok = suara.split(/\s+/).filter(Boolean).map((w) => ({ w: w.toLowerCase().replace(/[^a-z]/g, ""), brk: /[,.:;?!]$/.test(w) }));
    const hasil = [];
    tok.forEach((t, i) => {
      if (t.w !== "per") return;
      let p = null;
      for (let j = Math.max(0, i - 5); j < i; j += 1) {
        if (tok.slice(j, i - 1).some((x) => x.brk)) continue;
        const v = nilaiKata(tok.slice(j, i).map((x) => x.w));
        if (v !== null) {
          p = v;
          break;
        }
      }
      let q = null;
      for (let m = Math.min(tok.length, i + 6); m > i + 1; m -= 1) {
        if (tok.slice(i + 1, m - 1).some((x) => x.brk)) continue;
        const v = nilaiKata(tok.slice(i + 1, m).map((x) => x.w));
        if (v !== null) {
          q = v;
          break;
        }
      }
      if (p !== null && q !== null) hasil.push(`${p}/${q}`);
    });
    return hasil;
  };
  // uji pemeriksa sendiri
  sama(pecahanSuara("dua satu per lima ditambah tiga satu per lima sama dengan lima dua per lima"), ["1/5", "1/5", "2/5"], "pemeriksa pecahan suara: campuran");
  sama(pecahanSuara("seratus lima puluh satu per dua ratus, dan tiga ratus per dua ratus"), ["151/200", "300/200"], "pemeriksa pecahan suara: ratusan");
  sama(pecahanSuara("tiga per dua belas ditambah dua per dua belas"), ["3/12", "2/12"], "pemeriksa pecahan suara: belasan");
  let n = 0;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      const lihat = new Set();
      a.ketukan.forEach((kt, i) => {
        for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) lihat.add(o.isi);
        const semua = [...lihat].join(" | ");
        for (const f of pecahanSuara(kt.suara)) {
          n += 1;
          const [p, q] = f.split("/");
          cek(new RegExp(`(^|[^\\d])${p}/${q}($|[^\\d])`).test(semua), `${v.id}/${a.id}#${i + 1}: pecahan ${f} di suara tampak di gambar`);
        }
      });
    }
  }
  cek(n >= 80, `jumlah pecahan di suara yang dicocokkan dengan gambar (${n})`);
  stat.pecahanSuara = n;
}

/* ------------------------------ Geometri gambar: batang, lingkaran, lompatan, kisi ------------------------------ */
const kelompokSel = (objs) => {
  const g = new Map();
  for (const o of objs) {
    const m = /^(.*)-(\d+)$/.exec(o.id);
    if (!m || !["kotak", "bulat", "jalur"].includes(o.t)) continue;
    if (!g.has(m[1])) g.set(m[1], []);
    g.get(m[1]).push({ ...o, no: Number(m[2]) });
  }
  return g;
};
const putih = (o) => o.warna === "#FFFFFF";
const terisi = (objs, id) => (kelompokSel(objs).get(id) ?? []).filter((o) => !putih(o)).length;
const jumlahSel = (objs, id) => (kelompokSel(objs).get(id) ?? []).length;
{
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((_, i) => {
        const t = akhirAdegan(a, i);
        const nama = `${v.id}/${a.id}#${i + 1}`;
        for (const [id, sel] of kelompokSel(t)) {
          sel.sort((m, n) => m.no - n.no);
          cek(sel.every((o, q) => o.no === q), `${nama}: sel ${id} bernomor berurutan dari nol`);
          if (sel[0].t === "kotak" && sel.length >= 2) {
            const lebar = sel[0].w;
            const tinggi = sel[0].h;
            cek(sel.every((o) => Math.abs(o.w - lebar) < 0.35 && Math.abs(o.h - tinggi) < 0.35), `${nama}: sel ${id} sama besar`);
            const baris = sel.filter((o) => Math.abs(o.y - sel[0].y) < 0.35).length;
            if (baris === sel.length && sel.every((o, q) => q === 0 || Math.abs(o.x - (sel[q - 1].x + lebar)) < 0.45)) {
              stat.batang += 1;
              cek(Math.abs(lebar * sel.length - (sel[sel.length - 1].x + lebar - sel[0].x)) < 0.6, `${nama}: batang ${id} tersusun rapat`);
            } else if (sel.length === 10 && lebar < 17) {
              stat.penghapus += 1;
              cek(sel.every((o, q) => Math.abs(o.x - (sel[0].x + (q % 5) * (sel[1].x - sel[0].x))) < 0.5), `${nama}: penghapus ${id} dua baris lima kolom`);
            } else {
              // kisi baris x kolom: semua sel menempati sudut kisi rapat
              const kolom = sel.filter((o) => Math.abs(o.y - sel[0].y) < 0.35).length;
              const jumlahBaris = sel.length / kolom;
              stat.kisi += 1;
              cek(Number.isInteger(jumlahBaris) && sel.every((o, q) => Math.abs(o.x - (sel[0].x + (q % kolom) * lebar)) < 0.6 && Math.abs(o.y - (sel[0].y + Math.floor(q / kolom) * tinggi)) < 0.6), `${nama}: kisi ${id} rapat ${jumlahBaris} x ${kolom}`);
            }
          }
          if (sel[0].t === "jalur" && /^M0 0 L[-\d. ]+ A\d+ \d+ 0 0 1 [-\d. ]+ Z$/.test(sel[0].d)) {
            stat.lingkaran += 1;
            const sudut = sel.map((o) => {
              const n = bilangan(o.d);
              return ((Math.atan2(n[10], n[9]) - Math.atan2(n[3], n[2]) + 4 * Math.PI) % (2 * Math.PI)) * (180 / Math.PI);
            });
            cek(sudut.every((s) => Math.abs(s - 360 / sel.length) < 1.2), `${nama}: lingkaran ${id} beririsan sama besar (${sel.length} irisan, sudut ${sudut.map((s) => s.toFixed(1)).join(", ")})`);
            cek(sel.every((o) => Math.abs(Math.hypot(bilangan(o.d)[2], bilangan(o.d)[3]) - bilangan(o.d)[4]) < 0.6), `${nama}: jari-jari irisan ${id} sama dengan busur`);
          }
        }
      });
    }
  }
  cek(stat.batang >= 15 && stat.lingkaran >= 5 && stat.penghapus >= 4 && stat.kisi >= 8, `jumlah batang, lingkaran, penghapus, kisi yang diperiksa (${stat.batang}, ${stat.lingkaran}, ${stat.penghapus}, ${stat.kisi})`);
}

const objId2 = (objs, id) => objs.find((o) => o.id === id);
const tick = (x, w, n, i) => Math.round((x + (i * w) / n) * 10) / 10;
{
  // Lompatan di garis bilangan: titik awal dan titik mendarat tepat pada tanda.
  const cekLompat = (a, ke, id, x, w, n, dari, ke2) => {
    const o = objId2(akhirAdegan(a, ke), id);
    cek(!!o, `lompatan ${id} ada`);
    if (!o) return;
    const dx = bilangan(o.d)[4];
    stat.lompat += 1;
    hampir(o.x, tick(x, w, n, dari), 0.2, `lompatan ${id} mulai di tanda ${dari}/${n}`);
    hampir(o.x + dx, tick(x, w, n, ke2), 0.3, `lompatan ${id} mendarat di tanda ${ke2}/${n}`);
  };
  const g = adegan(U, "luar-garis");
  cekLompat(g, 2, "lp1", 30, 240, 5, 0, 2); // 2/5
  cekLompat(g, 2, "lp2", 30, 240, 5, 2, 3); // + 1/5 -> 3/5
  const h = adegan(U, "luar-garis-terapan");
  cekLompat(h, 0, "hp1", 25, 250, 10, 0, 2); // 2/10
  cekLompat(h, 1, "hp2", 25, 250, 10, 2, 5); // + 3/10 -> 5/10
  hampir(tick(25, 250, 10, 5), 150, 0.2, "5/10 tepat di tengah garis (x = 150)");
  hampir(objId2(akhirAdegan(h, 2), "hm").x, 150, 0.2, "penanda tengah di x = 150");
  cekLompat(h, 4, "ip", 30, 240, 6, 2, 6); // + 4/6 -> 6/6
  hampir(tick(30, 240, 6, 2), tick(30, 240, 3, 1), 0.2, "1/3 sama posisi dengan 2/6 di garis");
  hampir(objId2(akhirAdegan(h, 3), "ik").x, tick(30, 240, 6, 2), 0.2, "katak berdiri pada 2/6");
  // Tanda garis bilangan: jumlah tanda = bagian + 1, jarak sama
  for (const [adg, ke, id, n] of [[g, 0, "gb", 5], [h, 0, "hb", 10], [h, 3, "ib", 6]]) {
    const t = akhirAdegan(adg, ke);
    const tanda = Array.from({ length: n + 1 }, (_, q) => objId2(t, `${id}-b${q}`));
    cek(tanda.every(Boolean), `garis bilangan ${id}: ${n + 1} tanda`);
    if (tanda.every(Boolean)) cek(tanda.every((o, q) => q === 0 || Math.abs(o.x - tanda[q - 1].x - (tanda[n].x - tanda[0].x) / n) < 0.3), `garis bilangan ${id}: jarak antartanda sama`);
  }
}

/* ------------------------------ Isi bergambar tiap adegan, dihitung mandiri ------------------------------ */
{
  // Masalah Lukas: satu dari dua dan satu dari tiga.
  {
    const t = akhirAdegan(adegan(M, "masalah-lukas"), 0);
    sama([jumlahSel(t, "wl"), terisi(t, "wl"), jumlahSel(t, "wk"), terisi(t, "wk")], [2, 1, 3, 1], "wingko Lukas 1/2 dan wingko Komang 1/3");
    sama([nilaiId(t, "fl"), nilaiId(t, "fk")], [teksP(BUKU.wingko[0]), teksP(BUKU.wingko[1])], "label wingko");
  }
  // Martabak: delapan irisan; Komang 2 irisan (karamel dan stroberi), Lukas 1 (nanas).
  {
    const a = adegan(M, "eks-a-martabak");
    sama([jumlahSel(akhirAdegan(a, 0), "mt"), terisi(akhirAdegan(a, 0), "mt")], [8, 0], "martabak: 8 irisan awalnya putih");
    const t1 = akhirAdegan(a, 1);
    sama([terisi(t1, "mt"), t1.filter((o) => o.id.startsWith("mt-") && o.warna === "#F87171").length, t1.filter((o) => o.id.startsWith("mt-") && o.warna === "#FDBA74").length], [3, 2, 1], "martabak: Komang 2 irisan dan Lukas 1 irisan");
    sama([objId2(t1, "mt-5").warna, objId2(t1, "mt-6").warna, objId2(t1, "mt-7").warna], ["#F87171", "#FDBA74", "#F87171"], "martabak: karamel dan stroberi untuk Komang, nanas untuk Lukas");
    sama(terisi(akhirAdegan(a, 2), "mt"), 1, "martabak: bagian Lukas 1/8");
    sama([nilaiId(akhirAdegan(a, 2), "l2"), nilaiId(akhirAdegan(a, 3), "k1"), nilaiId(akhirAdegan(a, 3), "k3")], [teksP(BUKU.martabak[0]), `Komang: ${teksP(BUKU.martabak[1])}`, `${teksP(BUKU.martabak[0])} + ${teksP(BUKU.martabak[1])} = ${teksP(H.martabak)}`], "martabak: label pecahan");
    const t4 = akhirAdegan(a, 4);
    sama([jumlahSel(t4, "ma"), terisi(t4, "ma"), jumlahSel(t4, "mb"), terisi(t4, "mb"), jumlahSel(t4, "mc"), terisi(t4, "mc")], [8, 1, 8, 2, 8, 3], "martabak: arsiran 1 + 2 = 3 dari 8");
  }
  // Penghapus: sepuluh penghapus; 2 untuk Asep, 3 untuk Yohana.
  {
    const a = adegan(M, "eks-b-penghapus");
    const t0 = akhirAdegan(a, 0);
    sama([jumlahSel(t0, "ph"), terisi(t0, "ph")], [10, 5], "penghapus: sepuluh penghapus, lima terarsir (2 dan 3)");
    sama([t0.filter((o) => o.id.startsWith("ph-") && o.warna === "#DBEAFE").length, t0.filter((o) => o.id.startsWith("ph-") && o.warna === "#FBCFE8").length], [2, 3], "penghapus: Asep 2 dan Yohana 3");
    const t1 = akhirAdegan(a, 1);
    sama([nilaiId(t1, "as2"), nilaiId(t1, "yo2")], [teksP(BUKU.penghapus[0]), teksP(BUKU.penghapus[1])], "penghapus: 2/10 dan 3/10");
    sama([nilaiId(akhirAdegan(a, 2), "j2"), terisi(akhirAdegan(a, 2), "ph")], [`${teksP(BUKU.penghapus[0])} + ${teksP(BUKU.penghapus[1])} = ${teksP(H.penghapus)}`, 5], "penghapus: jumlah 5/10");
    const t3 = akhirAdegan(a, 3);
    sama([terisi(t3, "ma"), terisi(t3, "mb"), terisi(t3, "mc"), jumlahSel(t3, "mc")], [2, 3, 5, 10], "penghapus: arsiran 2 + 3 = 5 dari 10");
  }
  // Pita: campuran.
  {
    const a = adegan(M, "eks-c-lukas");
    sama(nilaiId(akhirAdegan(a, 2), "c1"), `2 1/5 = (2 × 5 + 1)/5 = ${teksP(biasa(2, pec(1, 5)))}`, "pita Cara Lukas: 2 1/5 = 11/5");
    sama(nilaiId(akhirAdegan(a, 3), "c2"), `3 1/5 = (3 × 5 + 1)/5 = ${teksP(biasa(3, pec(1, 5)))}`, "pita Cara Lukas: 3 1/5 = 16/5");
    sama([nilaiId(akhirAdegan(a, 4), "c3"), nilaiId(akhirAdegan(a, 4), "c4")], [`11/5 + 16/5 = ${teksP(H.pita)}`, "11 + 16 = 27"], "pita Cara Lukas: 11/5 + 16/5 = 27/5");
    sama(nilaiId(akhirAdegan(a, 5), "c5"), `${teksP(H.pita)} = ${campuran(H.pita)}`, "pita Cara Lukas: 27/5 = 5 2/5");
    const b = adegan(M, "eks-c-komang");
    sama([nilaiId(akhirAdegan(b, 0), "b2"), nilaiId(akhirAdegan(b, 1), "b4"), nilaiId(akhirAdegan(b, 2), "g1")], ["2 + 3 = 5", "1/5 + 1/5 = 2/5", "5 + 2/5 = 5 2/5"], "pita Cara Komang");
    const t3 = akhirAdegan(b, 3);
    sama([jumlahSel(t3, "m3"), terisi(t3, "m3"), jumlahSel(t3, "h4"), terisi(t3, "h4"), terisi(t3, "m1"), terisi(t3, "m2"), terisi(t3, "h1"), terisi(t3, "h2"), terisi(t3, "h3")], [5, 1, 5, 1, 1, 1, 1, 1, 1], "pita: model 2 pita penuh + 1/5 dan 3 pita penuh + 1/5");
    const t4 = akhirAdegan(b, 4);
    sama([1, 2, 3, 4, 5].map((q) => terisi(t4, `u${q}`)), [1, 1, 1, 1, 1], "pita: 5 pita penuh");
    sama([jumlahSel(t4, "v3"), terisi(t4, "v3"), terisi(t4, "v1"), terisi(t4, "v2")], [5, 2, 1, 1], "pita: bagian tidak penuh 1/5 + 1/5 = 2/5");
    sama(nilaiId(akhirAdegan(b, 5), "z1"), "5 pita penuh + 2/5", "pita: hasil model");
  }
  // Kertas (Eksplorasi 3.2D).
  {
    const a = adegan(M, "eks-d-nisa");
    sama([jumlahSel(akhirAdegan(a, 1), "ka"), terisi(akhirAdegan(a, 1), "ka"), jumlahSel(akhirAdegan(a, 2), "kb"), terisi(akhirAdegan(a, 2), "kb")], [3, 1, 6, 2], "kertas Lukas: 1/3 senilai 2/6");
    sama([jumlahSel(akhirAdegan(a, 3), "kc"), terisi(akhirAdegan(a, 3), "kc")], [6, 4], "kertas Komang: 4/6");
    sama([jumlahSel(akhirAdegan(a, 4), "kd"), terisi(akhirAdegan(a, 4), "kd")], [6, 6], "gabungan kertas memenuhi 6 bagian");
    sama(nilaiId(akhirAdegan(a, 5), "h1"), `2/6 + 4/6 = ${teksP(H.kertas)}`, "kertas: 2/6 + 4/6 = 6/6");
    sama(nilaiId(akhirAdegan(a, 5), "h2"), `${teksP(H.kertas)} = 1`, "kertas: 6/6 = 1");
    sama(terisi(akhirAdegan(a, 5), "h3"), 6, "kertas utuh: 6 bagian penuh");
    const b = adegan(M, "eks-d-komang-yohana");
    sama([jumlahSel(akhirAdegan(b, 0), "ca"), terisi(akhirAdegan(b, 0), "ca"), jumlahSel(akhirAdegan(b, 1), "cb"), terisi(akhirAdegan(b, 1), "cb")], [3, 1, 6, 4], "Cara Komang: lingkaran 1 dari 3 dan 4 dari 6");
    sama(nilaiId(akhirAdegan(b, 2), "sn1"), "1/3 = 2/6", "Cara Komang: pecahan senilai");
    sama([nilaiId(akhirAdegan(b, 3), "gb1"), nilaiId(akhirAdegan(b, 3), "gb2"), nilaiId(akhirAdegan(b, 3), "gb3")], ["1/3 + 4/6", "= 2/6 + 4/6", "= 6/6 = 1"], "Cara Komang: penjumlahan");
    sama(nilaiId(akhirAdegan(b, 5), "y5"), "1/3 = ((6 : 3) × 1)/6 = 2/6", "Cara Yohana: (6 : 3) × 1 per 6");
    sama(nilaiId(akhirAdegan(b, 7), "w4"), `= ${teksP(H.wingko)}`, "wingko Lukas dijawab 5/6");
  }
  // Denah.
  {
    const a = adegan(M, "eks-e-denah");
    sama([nilaiId(akhirAdegan(a, 1), "j1"), nilaiId(akhirAdegan(a, 1), "j3"), nilaiId(akhirAdegan(a, 1), "j2")], ["1 1/2 km", "2 1/4 km", "lebar rumah Komang 1/200 km"], "denah: jarak dan lebar rumah");
    sama([nilaiId(akhirAdegan(a, 2), "y1"), nilaiId(akhirAdegan(a, 2), "y2")], ["1 1/2 = 3/2", "2 1/4 = 9/4"], "denah Cara Yohana: ke pecahan biasa");
    sama([nilaiId(akhirAdegan(a, 3), "y5"), nilaiId(akhirAdegan(a, 3), "y6")], ["3/2 = (3 × 100)/(2 × 100) = 300/200", "9/4 = (9 × 50)/(4 × 50) = 450/200"], "denah Cara Yohana: samakan penyebut");
    sama([nilaiId(akhirAdegan(a, 4), "y8"), nilaiId(akhirAdegan(a, 4), "y9")], ["300/200 + 450/200 + 1/200 = 751/200", "751/200 = 3 151/200"], "denah Cara Yohana: jumlah");
    sama([nilaiId(akhirAdegan(a, 5), "l3"), nilaiId(akhirAdegan(a, 6), "l5"), nilaiId(akhirAdegan(a, 6), "l6"), nilaiId(akhirAdegan(a, 6), "l7")], ["1 + 2 = 3", "1/2 + 1/4 + 1/200", "= 100/200 + 50/200 + 1/200", "= 151/200"], "denah Cara Lukas");
    sama([nilaiId(akhirAdegan(a, 7), "m1"), nilaiId(akhirAdegan(a, 7), "m3-t0")], ["3 + 151/200 = 3 151/200", `jarak = ${campuran(H.denah)} km`], "denah: jawaban akhir");
  }
  // Isian umum di penutup: kesalahan umum jelas ditandai salah.
  {
    const t = akhirAdegan(adegan(M, "penutup-b"), 2);
    cek(nilaiId(t, "q3") === "1/3 + 4/6 = 5/9 ?" && /salah/.test(nilaiId(t, "q4")) && nilaiEkspresi("1/3 + 4/6") !== nilaiEkspresi("5/9"), "penutup: contoh jawaban keliru 5/9 jelas ditandai salah dan memang bukan hasil sebenarnya");
    sama(nilaiId(t, "q5"), "benar: 2/6 + 4/6 = 6/6 = 1", "penutup: hasil benar");
  }
  // Video metode luar.
  {
    const a = adegan(U, "luar-sama");
    sama([jumlahSel(akhirAdegan(a, 0), "b1"), terisi(akhirAdegan(a, 0), "b1"), jumlahSel(akhirAdegan(a, 0), "b2"), terisi(akhirAdegan(a, 0), "b2")], [7, 2, 7, 3], "Like Denominators: 2/7 dan 3/7");
    const b = adegan(U, "luar-sama-terapan");
    sama([terisi(akhirAdegan(b, 0), "m1"), jumlahSel(akhirAdegan(b, 0), "m1"), terisi(akhirAdegan(b, 0), "m2"), jumlahSel(akhirAdegan(b, 0), "m2")], [1, 8, 2, 8], "Like Denominators martabak: 1/8 dan 2/8");
    sama([nilaiId(akhirAdegan(b, 1), "h1"), nilaiId(akhirAdegan(b, 1), "h2"), terisi(akhirAdegan(b, 1), "h3")], ["1/8 + 2/8 = (1 + 2)/8", "= 3/8", 3], "Like Denominators martabak: 3/8");
    sama([nilaiId(akhirAdegan(b, 2), "p1"), nilaiId(akhirAdegan(b, 2), "p2")], [`2/10 + 3/10 = ${teksP(H.penghapus)}`, `${teksP(H.penghapus)} = ${teksP(sedehana(H.penghapus))}`], "Like Denominators penghapus");
    sama([nilaiId(akhirAdegan(b, 3), "y3"), nilaiId(akhirAdegan(b, 4), "y5"), nilaiId(akhirAdegan(b, 4), "y6")], ["2 + 3 = 5", "1/5 + 1/5 = 2/5", "= 5 2/5 m"], "Like Denominators pita");
    const c = adegan(U, "luar-kpk");
    sama([jumlahSel(akhirAdegan(c, 0), "b1"), terisi(akhirAdegan(c, 0), "b1"), jumlahSel(akhirAdegan(c, 0), "b2"), terisi(akhirAdegan(c, 0), "b2")], [4, 1, 6, 1], "LCM: 1/4 dan 1/6 potongan beda besar");
    sama([nilaiId(akhirAdegan(c, 2), "s1"), nilaiId(akhirAdegan(c, 2), "s2"), nilaiId(akhirAdegan(c, 3), "j2")], ["1/4 = ((12 : 4) × 1)/12 = 3/12", "1/6 = ((12 : 6) × 1)/12 = 2/12", "3/12 + 2/12 = 5/12"], "LCM contoh umum");
    const d = adegan(U, "luar-kpk-terapan");
    sama([nilaiId(akhirAdegan(d, 1), "b2"), nilaiId(akhirAdegan(d, 2), "c1"), nilaiId(akhirAdegan(d, 2), "c2")], ["1/3 = ((6 : 3) × 1)/6 = 2/6", "2/6 + 4/6 = 6/6", "= 1"], "LCM kertas");
    sama([nilaiId(akhirAdegan(d, 3), "d1"), nilaiId(akhirAdegan(d, 3), "d3")], ["1/2 + 1/3", "= 3/6 + 2/6 = 5/6"], "LCM wingko");
    sama([nilaiId(akhirAdegan(d, 4), "e1"), nilaiId(akhirAdegan(d, 4), "e3"), nilaiId(akhirAdegan(d, 4), "e4")], ["1/2 + 1/4 + 1/200", "= 100/200 + 50/200 + 1/200", "= 151/200"], "LCM tiga pecahan");
    // Area Model
    const e = adegan(U, "luar-area");
    sama([jumlahSel(akhirAdegan(e, 0), "kg"), terisi(akhirAdegan(e, 0), "kg"), terisi(akhirAdegan(e, 1), "kg"), terisi(akhirAdegan(e, 2), "kg")], [6, 0, 2, 5], "Area Model umum: 2/6 lalu 2/6 + 3/6 = 5/6");
    const f = adegan(U, "luar-area-terapan");
    sama([jumlahSel(akhirAdegan(f, 0), "kg"), terisi(akhirAdegan(f, 1), "kg"), terisi(akhirAdegan(f, 2), "kg"), terisi(akhirAdegan(f, 3), "kg")], [6, 3, 5, 5], "Area Model wingko: 3 dan 2 petak, 5 dari 6");
    sama([nilaiId(akhirAdegan(f, 3), "hs1"), nilaiId(akhirAdegan(f, 3), "hs2")], ["3/6 + 2/6 = 5/6", "1/2 + 1/3 = 5/6"], "Area Model wingko: persamaan");
    sama([terisi(akhirAdegan(f, 4), "kg"), jumlahSel(akhirAdegan(f, 4), "kg")], [6, 6], "Area Model kertas: 2 + 4 = 6 petak");
    sama(nilaiId(akhirAdegan(f, 4), "kt"), "2/6 + 4/6 = 6/6", "Area Model kertas: persamaan");
    // warna petak Lukas dan Komang berbeda dan tidak bertumpuk
    const t3 = akhirAdegan(f, 2);
    const kg = kelompokSel(t3).get("kg");
    cek(kg.filter((o) => o.warna === "#FDBA74").length === 3 && kg.filter((o) => o.warna === "#86EFAC").length === 2, "Area Model wingko: tiga petak Lukas dan dua petak Komang tidak bertumpuk");
  }
  // Ringkasan memakai hasil yang sama dengan hitungan
  {
    const t = akhirAdegan(adegan(U, "luar-ringkas"), 3);
    sama(nilaiId(t, "t5"), "1/3 + 4/6 = 1", "ringkasan: 1/3 + 4/6 = 1");
    cek(H.kertas.p === H.kertas.q, "ringkasan: hasil memang satu utuh");
  }
}

/* ------------------------------ Pemisahan materi dan metode luar ------------------------------ */
{
  const teksVideo = (v) => JSON.stringify(seluruhTeks(v));
  const NAMA_METODE = /Like Denominators|Common Denominator|Number Line Jumps|Area Model|metode luar|metode dari luar|Samakan Penyebut dengan KPK/i;
  const materi = teksVideo(M);
  const luar = teksVideo(U);
  cek(!NAMA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of ["Like Denominators", "Common Denominator via LCM", "Area Model", "Number Line Jumps"]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(M.adegan.every((a) => /(Buku Siswa|Panduan Guru) hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(U.adegan.every((a) => /metode luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  for (const kata of ["Subbab B", "Penjumlahan Bilangan Pecahan", "Eksplorasi 3.2A", "Eksplorasi 3.2B", "Eksplorasi 3.2C", "Eksplorasi 3.2D", "Eksplorasi 3.2E", "Masalah Lukas", "Masalah Yohana", "Masalah Komang", "Cara Lukas", "Cara Komang", "Cara Nisa", "Cara Yohana", "Ayo Menyimpulkan", "Ayo Menyimak", "martabak", "penghapus", "wingko", "Refleksi nomor 3", "pecahan campuran", "KPK", "arsiran"]) cek(materi.includes(kata), `video materi memuat ${kata}`);
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-sama", "luar-sama-terapan", "luar-kpk", "luar-kpk-terapan", "luar-area", "luar-area-terapan", "luar-garis", "luar-garis-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk empat metode");
  cek(M.adegan.length === 11 && U.adegan.length === 10, "11 adegan materi dan 10 adegan metode luar");
  // Subbab B tidak membocorkan Subbab C (pengurangan).
  const BOCOR = /pengurang|dikurang|mengurang|selisih|\bsisa\b|kurangi|kurangkan/i;
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  for (const a of M.adegan) cek(!BOCOR.test(teksAdegan(a)), `materi ${a.id} tidak membocorkan pengurangan (Subbab C)`);
  for (const a of U.adegan) cek(!BOCOR.test(teksAdegan(a)), `metode luar ${a.id} tidak membocorkan pengurangan (Subbab C)`);
  // Isi Subbab A, Uji Kompetensi, dan Refleksi nomor lain bukan milik subbab ini.
  cek(!/Uji Kompetensi|pengayaan|remedial|Refleksi nomor (satu|dua|empat|lima|enam|[1245-9])/i.test(materi + luar), "tidak memakai isi subbab lain atau Refleksi nomor lain");
  cek(!/garis bilangan/i.test(materi), "materi B tidak memuat garis bilangan (isi Subbab A; hanya muncul sebagai metode luar)");
  cek(totalKetukan >= 80, `total ketukan cukup dalam (${totalKetukan})`);
}

/* ------------------------------ KPK dan kelipatan yang tertulis di gambar ------------------------------ */
{
  let nk = 0;
  let nl = 0;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((_, i) => {
        for (const o of akhirAdegan(a, i)) {
          if (o.t !== "teks" || !o.isi) continue;
          const m = /^KPK ([\d, dan]+) = (\d+)$/.exec(o.isi);
          if (m) {
            nk += 1;
            const angka = m[1].split(/, | dan /).map(Number);
            cek(kpk(...angka) === Number(m[2]), `${v.id}/${a.id}#${i + 1}: "${o.isi}" benar (KPK = ${kpk(...angka)})`);
          }
          const l = /^kelipatan (\d+): ([\d, ]+), \.\.\.$/.exec(o.isi);
          if (l) {
            nl += 1;
            const n = Number(l[1]);
            const daftar = l[2].split(", ").map(Number);
            cek(daftar.every((x, q) => x === n * (q + 1)), `${v.id}/${a.id}#${i + 1}: "${o.isi}" benar`);
          }
        }
      });
    }
  }
  cek(nk >= 6 && nl >= 6, `jumlah KPK dan daftar kelipatan yang diperiksa (${nk}, ${nl})`);
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
  // Buku Siswa hlm. 76-90 = PDF 92-106, Refleksi nomor 3 hlm. 103 = PDF 119; Panduan Guru hlm. 105-107 = PDF 117-119.
  const bagian = existsSync(bs) && existsSync(bg) ? [ambil(bs, 92, 106), ambil(bs, 119, 119), ambil(bg, 117, 119)] : [null];
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
    cek(n >= 70, `jumlah kutipan buku yang diperiksa (${n})`);
    stat.kutipan = n;
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k5b3b-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|k5b3b-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k5b3b sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k5b3b.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_B53|video-k4b2-umum|naskah-k5b3/.test(pembungkus) && /VIDEO_MATERI_K5B3B/.test(pembungkus) && /VIDEO_LUAR_K5B3B/.test(pembungkus) && /export function VideoK5B3B/.test(pembungkus) && /DaftarVideoCerita/.test(pembungkus) && /keVideoSiap/.test(pembungkus), "video-k5b3b.tsx: pembungkus tipis, dua video Story, ekspor VideoK5B3B tetap, tanpa naskah lama");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Pemeriksaan: ${stat.persamaan} persamaan, ${stat.pecahanSuara} pecahan di suara, ${stat.batang} batang, ${stat.lingkaran} lingkaran, ${stat.penghapus} kumpulan penghapus, ${stat.kisi} kisi, ${stat.lompat} lompatan, ${stat.kutipan ?? 0} kutipan, ${stat.teksPasang} pasangan teks`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
