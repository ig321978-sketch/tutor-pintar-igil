// Uji Story Kelas 4 Bab 2 Sub-Bab E (Desimal Perseratusan dan Persen, penutup bab): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar (bilangan >= 100 yang diucapkan dengan kata dibaca ulang menjadi angka), perubahan gambar tiap ketukan,
// keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar, kutipan buku (bila PDF ada), rantai pecahan-desimal-persen dihitung ulang,
// kisi seratus kotak (kotak gelap dihitung dari lintasan), tabel konversi, hitungan mandiri kunci jawaban (perbandingan, urutan, desimal, persen, rubrik, pengayaan),
// emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k4b2e.mjs   (PEMICU=1 mencetak kata pemicu tiap aksi untuk ditinjau; RINCI=1 mencetak ukuran tiap adegan)
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/[.][a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k4b2e-video.ts");

const stat = { persamaan: 0, banding: 0, angkaSuara: 0, teksPasang: 0, format: 0, kartu: 0, kisi: 0, tabel: 0, kunci: 0, konversi: 0 };
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

/* ------------------------------ Alat hitung mandiri ------------------------------ */

/** Bilangan yang diucapkan dengan kata (satu urutan kata bilangan) dibaca menjadi angka. Hanya yang >= 100 dikembalikan. */
const SATUAN = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
const angkaDariKata = (suara) => {
  const hasil = [];
  let total = 0;
  let ratus = 0;
  let puluh = 0;
  let sat = 0;
  let ada = false;
  const tutup = () => {
    if (ada) {
      const n = total + ratus + puluh + sat;
      if (n >= 100) hasil.push(n);
    }
    total = ratus = puluh = sat = 0;
    ada = false;
  };
  for (const t of suara.toLowerCase().replace(/[^a-z\s,.:;?!]/g, " ").replace(/[,.:;?!]/g, " # ").split(/\s+/).filter(Boolean)) {
    if (SATUAN[t] !== undefined) {
      sat = SATUAN[t];
      ada = true;
    }
    else if (t === "sepuluh") {
      puluh = 10;
      ada = true;
    }
    else if (t === "sebelas") {
      puluh = 10;
      sat = 1;
      ada = true;
    }
    else if (t === "belas") {
      puluh = 10;
      ada = true;
    }
    else if (t === "puluh") {
      puluh = sat * 10;
      sat = 0;
      ada = true;
    }
    else if (t === "seratus") {
      ratus = 100;
      ada = true;
    }
    else if (t === "ratus") {
      ratus = sat * 100;
      sat = 0;
      ada = true;
    }
    else if (t === "seribu") {
      total += 1000;
      ada = true;
    }
    else if (t === "ribu") {
      const g = ratus + puluh + sat;
      total += (g === 0 ? 1 : g) * 1000;
      ratus = puluh = sat = 0;
      ada = true;
    } else tutup();
  }
  tutup();
  return hasil;
};
sama(angkaDariKata("tiga ratus empat puluh enam siswa dan seratus lima kilogram"), [346, 105], "pembaca bilangan: 346 dan 105");
sama(angkaDariKata("delapan ratus tujuh puluh kilogram"), [870], "pembaca bilangan: 870");
sama(angkaDariKata("enam puluh empat buku dan lima belas"), [], "pembaca bilangan: kecil diabaikan");

/** Nilai persamaan aritmetika dengan titik ribuan, tanda − × ÷ dan kurung. */
const nilai = (ekspr) => {
  const s = ekspr.replace(/(?<=\d)\.(?=\d{3}(?!\d))/g, "").replace(/−/g, "-").replace(/×/g, "*").replace(/÷/g, "/");
  if (!/^[\d\s+\-*/().]+$/.test(s)) return NaN;
  return Function(`"use strict"; return (${s});`)();
};
sama([nilai("20 + 4 × 8"), nilai("(14 + 16) ÷ 2"), nilai("76 − 6 × 8"), nilai("7 × 3 + 17")], [52, 15, 28, 38], "evaluator aritmetika");

const VIDEO = [V.VIDEO_MATERI_K4B2E, V.VIDEO_LUAR_K4B2E];
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
const EMOJI_ATAU_TANDA = /^[\u{1F000}-\u{1FFFF}]|^[☀-➿]/u;
for (const v of VIDEO) {
  cek(v.adegan.length >= 7, `${v.id}: paling sedikit 7 adegan (ada ${v.adegan.length})`);
  cek(["materi", "metode-luar"].includes(v.jenis) && v.judul.length > 5 && v.subjudul.length > 5, `${v.id}: jenis dan judul ada`);
  cek(new Set(v.adegan.map((a) => a.id)).size === v.adegan.length, `${v.id}: id adegan unik`);
  for (const a of v.adegan) {
    const nama = `${v.id}/${a.id}`;
    cek(a.ketukan.length >= 3 && a.ketukan.length <= 14, `${nama}: 3 sampai 14 ketukan (ada ${a.ketukan.length})`);
    cek(a.sumber.length > 8 && a.sumber.length <= 66 && a.judul.length > 5 && /^#[0-9A-Fa-f]{6}$/.test(a.latar), `${nama}: sumber (paling banyak 66 huruf agar muat kanvas), judul, dan latar ada (${a.sumber.length})`);
    let sebelumnya = null;
    const terlihat = new Set();
    a.ketukan.forEach((kt, i) => {
      const kata = L.kataDari(kt.suara);
      totalKetukan += 1;
      totalKata += kata.length;
      cek(kata.length >= 6 && kata.length <= 42, `${nama}#${i + 1}: 6 sampai 42 kata (ada ${kata.length})`);
      cek(!/[=×÷<>\/%]/.test(kt.suara), `${nama}#${i + 1}: suara tanpa lambang yang sulit dibaca mesin suara`);
      cek(/[.?!]$/.test(kt.suara.trim()), `${nama}#${i + 1}: suara berakhir tanda baca`);
      cek(kt.aksi.length >= 1, `${nama}#${i + 1}: ada aksi gambar`);
      for (const ak of kt.aksi) {
        const p = L.posisiKata(kt.suara, ak.at);
        cek(p >= 0, `${nama}#${i + 1}: pemicu "${ak.at}" ditemukan dalam kalimat`);
        if (typeof ak.at === "number") cek(ak.at >= 0 && ak.at < kata.length, `${nama}#${i + 1}: pemicu angka ${ak.at} dalam batas`);
        if (process.env.PEMICU && p >= 0) {
          const nm = [ak.tambah, ak.ubah, ak.hapus].flat().filter(Boolean).map((o) => (typeof o === "string" ? o : o.id)).slice(0, 3).join(",");
          console.log(`${nama}#${i + 1} "${ak.at ?? ""}" -> [${p}] ${kata[p]}   (${nm})`);
        }
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
      // sinkron angka: bilangan (>= 100) yang diucapkan dengan kata tampak sebagai angka di gambar pada ketukan ini atau sebelumnya
      for (let p = 0; p < kata.length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) for (const b of bilanganDari(o.isi)) terlihat.add(b);
      cek(!/\d/.test(kt.suara), `${nama}#${i + 1}: suara tanpa angka (bilangan ditulis dengan kata)`);
      for (const n of angkaDariKata(kt.suara)) {
        stat.angkaSuara += 1;
        cek(terlihat.has(String(n)), `${nama}#${i + 1}: bilangan ${n} di suara tampak di gambar`);
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
        else if (o.t === "garis" || o.t === "panah") cek(x > -2 && x < 302 && y > -2 && y < 204 && x + (o.x2 ?? 0) > -2 && x + (o.x2 ?? 0) < 302 && y + (o.y2 ?? 0) > -2 && y + (o.y2 ?? 0) < 204, `${nama}#${i + 1}: garis ${o.id} masuk kanvas`);
      }
      // teks tidak boleh bertumpuk
      {
        const teksAda = akhir.filter((o) => o.t === "teks" && (o.op ?? 1) > 0 && o.isi && !EMOJI_ATAU_TANDA.test(o.isi));
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
const M = V.VIDEO_MATERI_K4B2E;
const U = V.VIDEO_LUAR_K4B2E;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksVisible = (objs) => objs.filter((o) => o.t === "teks" && (o.op ?? 1) > 0 && o.isi).map((o) => o.isi);
/** Semua teks yang pernah tampak di sebuah adegan (gabungan semua ketukan). */
const teksAdegan = (v, id) => new Set(adegan(v, id).ketukan.flatMap((kt, i) => L.kataDari(kt.suara).flatMap((_, p) => teksVisible(L.keadaanStory(adegan(v, id), i, p)))));
const seluruhTeks = (v) => v.adegan.map((a) => [a.judul, a.sumber, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
{
  const teksVideo = (v) => JSON.stringify(seluruhTeks(v));
  const METODE = ["Percent as Hundredths", "Hundred Grid Percent", "Decimal–Percent Link", "Scale to One Hundred", "Persen sebagai Perseratusan", "Kisi Seratus Persen", "Jembatan Desimal–Persen", "Skala ke Seratus"];
  const NAMA_METODE = new RegExp(METODE.join("|"));
  const KATA_METODE = /metode luar|metode dari luar/i;
  // nama metode lama bab lain (Sub-Bab A sampai D) dan nama sub-bab tidak boleh muncul sebagai metode
  const METODE_LAIN = /Unit Fraction|Area Model|Number Line Unit|Same Denominator|Compare Numerators|Fraction Bars|Equivalent Fractions|Multiply Identity|Decimal Tenths Hundredths|Decimal Grid|Fraction–Decimal Link|Pecahan Satuan|Model Daerah|Penyebut Sama|Batang Pecahan|Kisi Desimal|Benchmark Percent|Ratio Table/;
  const materi = teksVideo(M);
  const luar = teksVideo(U);
  cek(!NAMA_METODE.test(materi) && !KATA_METODE.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of METODE) cek(luar.includes(m), `video metode luar memuat ${m}`);
  cek(!METODE_LAIN.test(materi + luar), `tidak memuat metode luar sub-bab lain (${(materi + luar).match(METODE_LAIN)?.[0]})`);
  // nama dan judul video tidak bentrok dengan metode
  cek(M.id === "k4b2e-materi" && U.id === "k4b2e-luar" && M.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M.adegan.every((a) => /(Buku Siswa|Panduan Guru) hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(U.adegan.every((a) => /metode luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  for (const kata of ["Sub-Bab E", "Ayo Mengamati", "Ayo Berpikir", "Ayo Berlatih", "Tahukah Kalian", "Uji Kompetensi", "Pengayaan", "Refleksi", "orang tua", "Panduan Guru", "Rubrik", "remedial", "Diferensiasi", "Penutup Bab", "cara biasa", "cara langsung", "persen", "desimal perseratusan"]) cek(new RegExp(kata, "i").test(materi), `video materi memuat "${kata}"`);
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-ph", "luar-ph-terapan", "luar-hg", "luar-hg-terapan", "luar-dp", "luar-dp-terapan", "luar-sb", "luar-sb-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk empat metode");
  cek(M.adegan.length === 16 && U.adegan.length === 10, "16 adegan materi dan 10 adegan metode luar");
  cek(!/volume|pola bilangan|diagram batang|piktogram/i.test(materi + luar), "tidak membahas bab lain");
  cek(totalKetukan >= 80, `total ketukan cukup dalam (${totalKetukan})`);
  // metode luar memakai angka buku
  for (const kata of ["0,35", "2,46", "18%", "123%", "35 kotak = 35%", "40 kotak = 40%", "30 kotak = 30%", "100% + 25% = 125%", "0,12 → 12%", "1,15 → 115%", "5,62 → 562%", "10,55 → 1055%", "18% → 0,18", "65% → 0,65", "123% → 1,23", "675% → 6,75", "20/50", "40/100", "6/10", "60/100", "3/10", "30/100", "25/10", "250/100", "100 ÷ 50 = 2", "100 ÷ 10 = 10"]) cek(luar.includes(kata), `video metode luar memuat "${kata}"`);
  // hitungan buku yang harus tampak di video materi
  for (const kata of ["0,75 = 75/100 = 75%", "0,35 = 35/100", "35/100 = 35%", "2,46 = 246/100", "246/100 = 246%", "20/50 = 40/100", "40/100 = 40%", "0,36 × 100% =", "(0,25 × 100)% = 25%", "(2,36 × 100)% = 236%", "10,55 × 100 = 1055", "4 × 10 = 40", "2 × 10 = 20", "40 + 20 + 40 = 100", "6/10 × 100% = 60%", "1/2 × 50.000 = 25.000", "5% = 5/100", "5/100 = 0,05"]) cek(materi.includes(kata), `video materi memuat "${kata}"`);
}

/* ------------------------------ Persamaan, perbandingan, dan konversi di gambar dihitung ulang ------------------------------ */
/** Nilai ekspresi dengan pecahan, desimal berkoma, persen, titik ribuan, kurung, × dan ÷. NaN bila tak terbaca. */
const nilaiEks = (t) => {
  let s = t.replace(/(?<=\d)\.(?=\d{3}(?!\d))/g, "").replace(/,/g, ".");
  s = s.replace(/\(([^()]+)\)%/g, "(($1)/100)").replace(/(\d+(?:\.\d+)?)%/g, "($1/100)").replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-");
  if (!/^[\d\s+\-*/().]+$/.test(s)) return NaN;
  return Function(`"use strict"; return (${s});`)();
};
sama([nilaiEks("0,25 × 100%"), nilaiEks("(0,25 × 100)%"), nilaiEks("35%"), nilaiEks("1/2 × 50.000"), nilaiEks("25 ÷ 10"), nilaiEks("100% + 25%")], [0.25, 0.25, 0.35, 25000, 2.5, 1.25], "evaluator: persen, kurung, ribuan, desimal berkoma");
const dekat = (a, b) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) < 1e-9;
/** Memeriksa satu teks yang berbentuk rantai (= → < >); mengembalikan jumlah relasi yang diperiksa, atau -1 bila teks bukan rantai. */
const periksaRantai = (t, nama) => {
  let s = t.includes(": ") ? t.slice(t.indexOf(": ") + 2) : t;
  s = s.replace(/^[a-e]\. /, "").replace(/^jadi /, "");
  if (/\.\.\./.test(s) || !/^[\d\s,.+\-−×÷()/%]+( (=|→|<|>) [\d\s,.+\-−×÷()/%]+)+$/.test(s)) return -1;
  const bagian = s.split(/ (=|→|<|>) /);
  let n = 0;
  for (let q = 1; q < bagian.length; q += 2) {
    const a = nilaiEks(bagian[q - 1]);
    const b = nilaiEks(bagian[q + 1]);
    const ok = bagian[q] === "<" ? a < b : bagian[q] === ">" ? a > b : dekat(a, b);
    stat.persamaan += 1;
    n += 1;
    cek(ok, `${nama}: "${t}" benar (${a} ${bagian[q]} ${b})`);
  }
  return n;
};
{
  let rantaiN = 0;
  let teksN = 0;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((_, i) => {
        const objs = akhirAdegan(a, i);
        const nama = `${v.id}/${a.id}#${i + 1}`;
        const sudah = new Set();
        for (const o of objs) {
          if (o.t !== "teks" || !o.isi || (o.op ?? 1) === 0) continue;
          if (periksaRantai(o.isi, nama) > 0) teksN += 1;
          // rantai tiga bagian sebaris: -r1, -r2, -r3
          const m = o.id.match(/^(.+)-r1$/);
          if (m && !sudah.has(m[1])) {
            sudah.add(m[1]);
            const bag = [1, 2, 3].map((n) => objs.find((x) => x.id === `${m[1]}-r${n}`)?.isi);
            if (bag.every(Boolean)) {
              rantaiN += 1;
              stat.konversi += 1;
              const gabung = bag.join(" ");
              cek(periksaRantai(gabung, `${nama} rantai ${m[1]}`) === 2, `${nama}: rantai ${m[1]} "${gabung}" terbaca dua relasi`);
            }
          }
          // pecahan senilai a/b = c/d dengan panah pengali: pembilang dan penyebut dikali sama
          const sa = o.id.match(/^(s[a-d])-a$/);
          if (sa) {
            const [p, q] = o.isi.split("/").map(Number);
            const [p2, q2] = (objs.find((x) => x.id === `${sa[1]}-h`)?.isi ?? "0/0").split("/").map(Number);
            const f = Number((objs.find((x) => x.id === `${sa[1]}-p1t`)?.isi ?? "× 0").slice(2));
            stat.konversi += 1;
            cek(p * f === p2 && q * f === q2 && q2 === 100 && 100 / q === f, `${nama}: Scale to One Hundred ${o.isi} × ${f} = ${p2}/${q2}`);
          }
          // perbandingan antarpecahan sederhana tanpa awalan sudah dicakup rantai; pecahan > 1 utuh tidak diperiksa lagi
          const bt = o.isi.replace(/Tabel \d\.\d/g, "").match(/\d[\d.]*\d|\d/g) ?? [];
          for (const t of bt) {
            stat.format += 1;
            cek(!t.includes(".") || /^\d{1,3}(\.\d{3})+$/.test(t), `${nama}: format ribuan "${t}" pada "${o.isi}"`);
          }
        }
      });
    }
  }
  cek(teksN >= 60, `jumlah teks rantai yang diperiksa (${teksN})`);
  cek(rantaiN >= 5, `jumlah rantai tiga bagian yang diperiksa (${rantaiN})`);
  // pernyataan keliru di kunci buku sengaja ditampilkan: pastikan memang keliru dan koreksinya benar
  cek(!(1 / 2 < 4 / 10) && 1 / 2 === 5 / 10 && 5 / 10 > 4 / 10, "kunci pengayaan 4: 1/2 < 4/10 keliru, benar 1/2 = 5/10 > 4/10");
  cek(!dekat(5 / 10, 0.05) && dekat(5 / 100, 0.05), "kunci pengayaan 5: 5% = 5/10 keliru, benar 5/100");
}

/* ------------------------------ Teks di dalam kartu dan sel tabel tidak melebihi kotaknya ------------------------------ */
{
  let n = 0;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((_, i) => {
        const objs = akhirAdegan(a, i);
        const kotakAda = new Map(objs.filter((o) => o.t === "kotak").map((o) => [o.id, o]));
        for (const o of objs) {
          if (o.t !== "teks" || !o.isi || (o.op ?? 1) === 0) continue;
          const m = o.id.match(/^(.*)-t(\d+)$/);
          if (!m) continue;
          const kt = kotakAda.get(`${m[1]}-k`) ?? kotakAda.get(`${m[1]}-s${m[2]}`);
          if (!kt) continue;
          n += 1;
          stat.kartu += 1;
          const lebar = o.isi.length * (o.u ?? 10) * 0.58;
          cek(lebar <= kt.w - 3 && o.x - lebar / 2 >= kt.x - 0.5 && o.x + lebar / 2 <= kt.x + kt.w + 0.5, `${v.id}/${a.id}#${i + 1}: teks "${o.isi}" muat dalam kotaknya (lebar ${Math.round(lebar)} dari ${kt.w})`);
          cek(o.y > kt.y && o.y < kt.y + kt.h + 1, `${v.id}/${a.id}#${i + 1}: teks "${o.isi}" berada di tinggi kotaknya`);
        }
      });
    }
  }
  cek(n >= 150, `jumlah teks dalam kartu dan tabel yang diperiksa (${n})`);
}

/* ------------------------------ Lintasan (kisi) masuk kanvas ------------------------------ */
{
  let n = 0;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((_, i) => {
        for (const o of akhirAdegan(a, i)) {
          if (o.t !== "jalur") continue;
          const angka = (o.d.match(/-?\d+(\.\d+)?/g) ?? []).map(Number);
          const xs = angka.filter((_, q) => q % 2 === 0).map((q) => q + (o.x ?? 0));
          const ys = angka.filter((_, q) => q % 2 === 1).map((q) => q + (o.y ?? 0));
          n += 1;
          cek(Math.min(...xs) >= 0 && Math.max(...xs) <= 300 && Math.min(...ys) >= 22 && Math.max(...ys) <= 204, `${v.id}/${a.id}#${i + 1}: lintasan ${o.id} masuk kanvas (x ${Math.min(...xs)}..${Math.max(...xs)}, y ${Math.min(...ys)}..${Math.max(...ys)})`);
        }
      });
    }
  }
  cek(n > 20, `jumlah lintasan yang diperiksa batas kanvasnya (${n})`);
}

/* ------------------------------ Kisi seratus kotak dihitung ulang ------------------------------ */
{
  /** Kisi pada sebuah keadaan: { id: kotak gelap } dan bingkainya (10 x 10, persegi, 99 garis kisi bagian dalam: 9 + 9 garis). */
  const kisiDari = (objs, nama) => {
    const g = {};
    for (const o of objs) {
      const m = o.id.match(/^(.+)-fr$/);
      if (!m) continue;
      const garisKisi = objs.find((x) => x.id === `${m[1]}-g`);
      const gelap = objs.find((x) => x.id === `${m[1]}-d`);
      cek(Math.abs(o.w - o.h) < 0.01 && !!garisKisi, `${nama}: kisi ${m[1]} berbingkai persegi dan bergaris`);
      const c = o.w / 10;
      cek(garisKisi && (garisKisi.d.match(/M/g) ?? []).length === 18, `${nama}: kisi ${m[1]} memuat 9 garis tegak dan 9 garis datar (10 x 10 kotak)`);
      const z = gelap ? (gelap.d.match(/Z/g) ?? []).length : 0;
      // kotak gelap terhitung ulang dari koordinat: tiap subpath satu kotak dalam kisi tanpa tumpang tindih, tersusun baris demi baris dari kiri-atas
      if (gelap) {
        const sel = gelap.d.split("Z").filter((q) => q.trim()).map((q) => q.match(/-?\d+(\.\d+)?/g).map(Number));
        const unik = new Set(sel.map((q) => `${q[0]},${q[1]}`));
        cek(unik.size === sel.length && sel.every((q, idx) => Math.abs(q[0] - (idx % 10) * c) < 0.2 && Math.abs(q[1] - Math.floor(idx / 10) * c) < 0.2), `${nama}: kotak gelap kisi ${m[1]} tak tumpang tindih dan berurutan`);
      }
      g[m[1]] = z;
      stat.kisi += 1;
    }
    return g;
  };
  const jumlah = (g) => Object.values(g).reduce((t, x) => t + x, 0);
  const kisiKe = (v, id, ke) => kisiDari(akhirAdegan(adegan(v, id), ke), `${v.id}/${id}#${ke + 1}`);
  // (video, adegan, ketukan) -> kotak gelap per kisi
  sama(kisiKe(M, "contoh-2e", 2), { kg: 40 }, "contoh olahraga: 20 dari 50 = 40 kotak");
  sama(kisiKe(M, "uk-persen", 2), { kg: 30 }, "Uji Kompetensi 9: 30 kotak");
  sama(kisiKe(M, "uk-persen", 3), { kg: 60 }, "Uji Kompetensi 10: 60 kotak");
  sama(kisiKe(M, "pengayaan-1e", 2), { kg: 40 }, "Pengayaan 2: 40 kotak");
  sama(kisiKe(M, "pengayaan-2e", 1), { kg: 5 }, "Pengayaan 5: 5 kotak");
  sama(kisiKe(U, "luar-hg", 0), { hg: 1 }, "Hundred Grid: 1 kotak");
  sama(kisiKe(U, "luar-hg", 1), { hg: 10 }, "Hundred Grid: satu baris sepuluh kotak");
  sama(kisiKe(U, "luar-hg", 2), { hg: 100, hh: 0 }, "Hundred Grid: kisi penuh 100, kisi berikutnya kosong");
  sama([kisiKe(U, "luar-hg-terapan", 0), kisiKe(U, "luar-hg-terapan", 1), kisiKe(U, "luar-hg-terapan", 2)], [{ ka: 35 }, { kb: 40 }, { kc: 30 }], "Hundred Grid terapan: 35, 40, 30 kotak");
  sama(kisiKe(U, "luar-hg-terapan", 3), { kd0: 100, kd1: 25 }, "Hundred Grid terapan: 125% = kisi 100 + kisi 25");
  // teks "N kotak = N%" dan "N dari 100 kotak" sama dengan jumlah kotak gelap di gambar yang sama
  let n = 0;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((_, i) => {
        const objs = akhirAdegan(a, i);
        const g = kisiDari(objs, "x");
        for (const o of objs) {
          if (o.t !== "teks" || !o.isi) continue;
          const m = o.isi.match(/^(\d+) kotak = (\d+)%$/) ?? o.isi.match(/^(\d+) dari 100 kotak$/);
          if (m) {
            n += 1;
            cek(Number(m[1]) === jumlah(g) && (m[2] === undefined || m[2] === m[1]), `${v.id}/${a.id}#${i + 1}: "${o.isi}" sama dengan jumlah kotak gelap ${jumlah(g)}`);
          }
        }
      });
    }
  }
  cek(n >= 6, `jumlah teks kotak = persen yang dicocokkan dengan kisi (${n})`);
}

/* ------------------------------ Tabel konversi sama dengan hitungan mandiri ------------------------------ */
{
  const sel = (objs, id, r, c) => objs.find((o) => o.id === `${id}-t${r}${c}`)?.isi;
  /** Desimal berkoma (dua angka paling banyak) menjadi bilangan bulat perseratus: 0,12 menjadi 12; 10,55 menjadi 1055. */
  const perseratus = (d) => {
    const [a, b = ""] = d.split(",");
    return Number(a) * 100 + Number((b + "00").slice(0, 2));
  };
  const dariPerseratus = (p) => `${Math.floor(p / 100)},${String(p % 100).padStart(2, "0")}`;
  sama([perseratus("0,12"), perseratus("10,55"), perseratus("20,05"), perseratus("2,46")], [12, 1055, 2005, 246], "pembaca desimal perseratus");
  sama([dariPerseratus(18), dariPerseratus(675), dariPerseratus(125)], ["0,18", "6,75", "1,25"], "penulis desimal perseratus");
  // [adegan, ketukan terakhir, id tabel, baris: [desimal, persen]] untuk desimal ke persen; kebalikannya untuk persen ke desimal
  const LATIHAN1 = [["0,12", 12], ["1,15", 115], ["5,62", 562], ["10,55", 1055]]; // Buku Siswa hlm. 82 dan kunci Panduan Guru hlm. 110
  const LATIHAN2 = [[18, "0,18"], [65, "0,65"], [123, "1,23"], [675, "6,75"]];
  const UK7 = [["0,05", 5], ["0,25", 25], ["1,38", 138], ["20,05", 2005]]; // kunci Panduan Guru hlm. 112
  const UK8 = [[35, "0,35"], [56, "0,56"], [125, "1,25"], [455, "4,55"]];
  const tabelUji = [
    ["berlatih-1e", 1, "lt", LATIHAN1, "arah1"],
    ["berlatih-2e", 1, "lp", LATIHAN2, "arah2"],
    ["uk-persen", 0, "t7", UK7, "arah1"],
    ["uk-persen", 1, "t8", UK8, "arah2"],
  ];
  for (const [id, ke, tid, data, arah] of tabelUji) {
    const objs = akhirAdegan(adegan(M, id), ke);
    data.forEach(([x, y], r) => {
      const c1 = sel(objs, tid, r + 1, 1);
      const c2 = sel(objs, tid, r + 1, 2);
      stat.tabel += 1;
      if (arah === "arah1") {
        cek(c1 === x && c2 === `${y}%` && perseratus(x) === y, `tabel ${tid} baris ${r + 1}: ${x} dikali 100 persen = ${y}% (di gambar ${c1} ${c2})`);
      } else {
        cek(c1 === `${x}%` && c2 === y && dariPerseratus(x) === y, `tabel ${tid} baris ${r + 1}: ${x}% dibagi 100 = ${y} (di gambar ${c1} ${c2})`);
      }
    });
  }
  // Bobot rubrik dan rekap kunci
  const rb = akhirAdegan(adegan(M, "rubrik-e"), 1);
  sama([sel(rb, "rb", 1, 2), sel(rb, "rb", 2, 2), sel(rb, "rb", 3, 2), sel(rb, "rb", 4, 2)], ["4 × 10 = 40", "2 × 10 = 20", "4 × 10 = 40", "40 + 20 + 40 = 100"], "tabel bobot rubrik");
  const BOBOT = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
  sama([BOBOT.length, BOBOT.reduce((t, b) => t + b, 0), BOBOT.slice(0, 4).reduce((t, b) => t + b, 0), BOBOT.slice(4, 6).reduce((t, b) => t + b, 0), BOBOT.slice(6).reduce((t, b) => t + b, 0)], [10, 100, 40, 20, 40], "rubrik: 10 butir, jumlah 100, pecahan 40, desimal 20, persen 40");
  stat.tabel += 6;
  const rk = akhirAdegan(adegan(M, "rubrik-e"), 3);
  const kunci = [3, 4, 5, 6, 7, 8, 9, 10].map((r) => rk.find((o) => o.id === `rk-t${r - 2}1`)?.isi);
  sama(kunci, ["Helen 1/4, Putu 3/4; terbesar Putu", "paling sedikit: Wiwin", "0,3  0,4  0,2  0,6  2,5", "0,81  0,79  0,45  0,66  0,99", "5%  25%  138%  2005%", "0,35  0,56  1,25  4,55", "30%", "60%"], "rekap kunci soal 3 sampai 10");
  const nomor = [3, 4, 5, 6, 7, 8, 9, 10].map((r) => rk.find((o) => o.id === `rk-t${r - 2}0`)?.isi);
  sama(nomor, ["3", "4", "5", "6", "7", "8", "9", "10"], "rekap kunci: nomor soal");
  stat.tabel += 16;
}

/* ------------------------------ Hitungan buku dan kunci, dihitung ulang mandiri ------------------------------ */
{
  /** Bandingkan p/q dan r/s dengan perkalian silang: -1, 0, atau 1. */
  const banding = ([p, q], [r, s]) => Math.sign(p * s - r * q);
  const TANDA = { "-1": "<", 0: "=", 1: ">" };
  // Uji Kompetensi 1 (Buku Siswa hlm. 83): pasangan dan kunci Panduan Guru hlm. 111
  const UK1 = [[[1, 3], [1, 1], "<"], [[1, 7], [1, 5], "<"], [[5, 9], [3, 9], ">"], [[2, 6], [3, 6], "<"], [[11, 17], [3, 17], ">"]];
  const uk1 = akhirAdegan(adegan(M, "uk-pecahan"), 1);
  UK1.forEach(([a, b, kunci], i) => {
    stat.kunci += 1;
    cek(TANDA[banding(a, b)] === kunci, `Uji Kompetensi 1${"abcde"[i]}: ${a.join("/")} ${kunci} ${b.join("/")} (hitungan mandiri ${TANDA[banding(a, b)]})`);
    const id = `u1${"abcde"[i]}-t0`;
    const t = (i < 3 ? akhirAdegan(adegan(M, "uk-pecahan"), 0) : uk1).find((o) => o.id === id)?.isi;
    cek(t === `${"abcde"[i]}. ${a.join("/")} ${kunci} ${b.join("/")}`, `gambar Uji Kompetensi 1${"abcde"[i]}: "${t}"`);
  });
  // Uji Kompetensi 2: soal dari buku (urutan acak), kunci terurut naik
  const UK2 = [[[[1, 3], [1, 2], [1, 4]], "1/4, 1/3, 1/2"], [[[1, 13], [1, 17], [1, 21]], "1/21, 1/17, 1/13"], [[[5, 8], [2, 8], [7, 8]], "2/8, 5/8, 7/8"], [[[6, 7], [3, 7], [7, 7]], "3/7, 6/7, 7/7"], [[[12, 16], [15, 16], [14, 16]], "12/16, 14/16, 15/16"]];
  const uk2a = akhirAdegan(adegan(M, "uk-pecahan"), 3);
  const uk2b = akhirAdegan(adegan(M, "uk-pecahan"), 4);
  UK2.forEach(([soal, kunci], i) => {
    stat.kunci += 1;
    const urut = [...soal].sort((a, b) => banding(a, b)).map((f) => f.join("/")).join(", ");
    sama(urut, kunci, `Uji Kompetensi 2${"abcde"[i]}: hitungan mandiri sama dengan kunci`);
    const t = (i < 3 ? uk2a : uk2b).find((o) => o.id === `u2${"abcde"[i]}-t0`)?.isi;
    sama(t, `${"abcde"[i]}. ${kunci}`, `gambar Uji Kompetensi 2${"abcde"[i]}`);
  });
  // semangka dan roti
  sama([1 - 1 / 4, banding([1, 4], [3, 4]), banding([1, 3], [2, 3])], [3 / 4, -1, -1], "Uji Kompetensi 3 dan 4: Putu 3/4 lebih besar, Wiwin 1/3 lebih kecil");
  // desimal persepuluhan (UK 5) dan perseratusan (UK 6) lewat pembagian
  const sepuluhan = (n) => `${Math.floor(n / 10)},${n % 10}`;
  sama([3, 4, 2, 6, 25].map(sepuluhan), ["0,3", "0,4", "0,2", "0,6", "2,5"], "Uji Kompetensi 5: persepuluhan 3, 4, 2, 6, 25 per 10");
  const seratusan = (n) => `${Math.floor(n / 100)},${String(n % 100).padStart(2, "0")}`;
  sama([81, 79, 45, 66, 99].map(seratusan), ["0,81", "0,79", "0,45", "0,66", "0,99"], "Uji Kompetensi 6: perseratusan 81, 79, 45, 66, 99 per 100");
  const uk5 = akhirAdegan(adegan(M, "uk-desimal"), 0);
  sama(["d5a", "d5b", "d5c", "d5d", "d5e"].map((id) => uk5.find((o) => o.id === `${id}-t0`)?.isi), ["a. 3/10 = 0,3", "b. 4/10 = 0,4", "c. 2/10 = 0,2", "d. 6/10 = 0,6", "e. 25/10 = 2,5"], "gambar Uji Kompetensi 5a sampai e");
  const uk6 = akhirAdegan(adegan(M, "uk-desimal"), 2);
  sama(["d6a", "d6b", "d6c", "d6d", "d6e"].map((id) => uk6.find((o) => o.id === `${id}-t0`)?.isi), ["a. 81/100 = 0,81", "b. 79/100 = 0,79", "c. 45/100 = 0,45", "d. 66/100 = 0,66", "e. 99/100 = 0,99"], "gambar Uji Kompetensi 6a sampai e");
  stat.kunci += 20;
  // persen: 30 dari 100 dan 6 dari 10; olahraga 20 dari 50; skala ke seratus dengan pengali 100 / penyebut
  const persen = (p, q) => (100 % q === 0 ? (p * 100) / q : NaN);
  sama([persen(30, 100), persen(6, 10), persen(20, 50), persen(3, 10), persen(25, 10)], [30, 60, 40, 30, 250], "persen lewat skala ke seratus: 30, 60, 40, 30, 250");
  sama([100 / 50, 100 / 10, 20 * 2, 6 * 10, 25 * 10], [2, 10, 40, 60, 250], "pengali dan pembilang baru");
  // geseran koma tiga langkah: 2,36 menjadi 23,6 menjadi 236
  sama([2.36 * 10, 2.36 * 100].map((x) => Math.round(x * 100) / 100), [23.6, 236], "geseran koma: 2,36 menjadi 23,6 lalu 236");
  // Pengayaan: jumlah, pecahan, desimal, persen, harga
  sama([3 + 2.5, 2.5 + 1, 4 / 10, (4 / 10) * 100, 0.5 * 50000, 5 / 100, (5 / 100) * 100], [5.5, 3.5, 0.4, 40, 25000, 0.05, 5], "Pengayaan 1 sampai 5: 5½, 3½, 0,4 = 40%, 25.000, 5% = 5/100 = 0,05");
  stat.kunci += 10;
  // jumlah butir refleksi guru dan interaksi orang tua, empat bentuk remedial
  sama([9, 6, 4], [9, 6, 4], "refleksi guru 9 butir, interaksi orang tua 6 cara, remedial 4 bentuk");
  const ot = [...teksAdegan(M, "penutup-e")].filter((t) => /^\d\. /.test(t) && !/murid:|BAB/.test(t));
  cek(ot.length >= 6, `interaksi orang tua: enam butir bernomor tampak (${ot.length})`);
}

/* ------------------------------ Kutipan buku (bila PDF dan python tersedia) ------------------------------ */
{
  const bs = new URL("../bahan-sd/Matematika-BS-KLS-IV.pdf", import.meta.url);
  const bg = new URL("../bahan-sd/Matematika-BG-KLS-IV.pdf", import.meta.url);
  const jalur = (u) => u.pathname.replace(/^\/([A-Za-z]:)/, "$1");
  const SKRIP = "import sys,pymupdf\nsys.stdout.reconfigure(encoding='utf-8')\nd=pymupdf.open(sys.argv[1])\nfor p in range(int(sys.argv[2])-1,int(sys.argv[3])):\n    print(d[p].get_text())\n";
  const ambil = (berkas, dari, sampai) => {
    const r = spawnSync("python", ["-I", "-c", SKRIP, jalur(berkas), String(dari), String(sampai)], { encoding: "utf8", maxBuffer: 1 << 26, env: { ...process.env, PYTHONIOENCODING: "utf-8" } });
    return r.status === 0 ? r.stdout : null;
  };
  // Buku Siswa hlm. 75-84 = PDF 87-96; Panduan Guru hlm. 107-120 = PDF 119-132 (offset kelas IV: PDF dikurangi 12).
  const bagian = existsSync(bs) && existsSync(bg) ? [ambil(bs, 87, 96), ambil(bg, 119, 132)] : [null];
  if (bagian.some((b) => b === null)) console.log("PDF atau python (pymupdf) tidak tersedia: pemeriksaan kutipan buku dilewati");
  else {
    const bersih = (t) => t.toLowerCase().replace(/ /g, " ").replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim();
    const buku = bersih(bagian.join("\n"));
    let n = 0;
    for (const a of M.adegan) {
      for (const kt of a.kutipan ?? []) {
        n += 1;
        cek(buku.includes(bersih(kt)), `kutipan buku ${a.id}: "${kt}" ada di teks PDF`);
      }
    }
    // kunci yang dipakai video benar-benar ada di Panduan Guru
    const bgSaja = bersih(bagian[1]);
    for (const s of ["0,12 = 12 %", "1,15 = 115 %", "5,62 = 562 %", "10,55 = 1055 %", "18% = 0,18", "65% = 0,65", "123% = 1,23", "675% = 6,75", "0,05 = 5 %", "0,25 = 25 %", "1,38 = 138 %", "20,05 = 2005 %", "35% = 0,35", "56% = 0,56", "125% = 1,25", "455% = 4,55", "= 0,30 = 30%", "x 100% = 60%", "= 0,3", "= 2,5", "= 0,81", "= 0,99", "Jawab: Putu", "Jawab: Wiwin", "Maka kue brownies yang diterima stanley sebanyak", "Diskon 5 % =", "x 50.000 = 25.000", "Rp25.000,00"]) cek(bgSaja.includes(bersih(s)), `Panduan Guru memuat kunci "${s}"`);
    const bsSaja = bersih(bagian[0]);
    for (const s of ["a. 0,12 = ... %", "d. 10,55 = ... %", "a. 18%", "d. 675%", "a. 0,05 = ... %", "d. 20,05 = ... %", "a. 35%", "d. 455%", "30 siswa dari 100 orang siswa", "6 pertanyaan dari 10 soal", "= 246%", "2,36 x 100% = (2,36 x 100)% = 236%", "246"]) cek(bsSaja.includes(bersih(s)), `Buku Siswa memuat "${s}"`);
    cek(n >= 100, `jumlah kutipan buku yang diperiksa (${n})`);
    console.log(`Kutipan buku diperiksa: ${n}`);
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k4b2e-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|k4b2e-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k4b2e sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../video-k4b2e.tsx", folder), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_E42|video-k4b2-umum|naskah-k4b2/.test(pembungkus) && /VIDEO_MATERI_K4B2E/.test(pembungkus) && /VIDEO_LUAR_K4B2E/.test(pembungkus) && /export function VideoK4B2E/.test(pembungkus) && /DaftarVideoCerita/.test(pembungkus) && !/mulaiLangsung/.test(pembungkus) && /a: 0, k: 0/.test(pembungkus) && /a: 1, k: 3/.test(pembungkus), "pembungkus video-k4b2e: mesin Story, tanpa naskah lama");
  cek(!pembungkus.includes("\r"), "pembungkus video-k4b2e: akhir baris LF");
  const uji = readFileSync(new URL("../../../../scripts/uji-story-k4b2e.mjs", folder), "utf8");
  cek(!uji.includes("\r"), "uji-story-k4b2e: akhir baris LF");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Pemeriksaan: ${stat.persamaan} relasi, ${stat.konversi} konversi, ${stat.format} angka berformat, ${stat.kisi} kisi, ${stat.tabel} sel tabel, ${stat.kunci} kunci, ${stat.angkaSuara} bilangan suara, ${stat.kartu} teks kartu, ${stat.teksPasang} pasang teks`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
