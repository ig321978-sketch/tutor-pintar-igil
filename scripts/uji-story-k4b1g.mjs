// Uji Story Kelas 4 Bab 1 Sub-Bab G (Perkalian Bilangan Cacah sampai 100): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, sinkron angka suara dan gambar (angka dan bilangan yang diucapkan dengan kata), perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// teks bertumpuk, pemisahan materi dan metode luar, tidak membocorkan materi sub-bab lain, kutipan buku terhadap teks PDF (pdftotext, atau PyMuPDF bila tidak ada),
// hitungan mandiri semua perkalian dan kunci Panduan Guru (bersusun, angka yang disimpan, cara panjang), jumlah benda pada gambar (kotak donat, tumpuk kelereng, pak pensil, ayam, kucing, deret bulatan, batang penggandaan, tabel kali) dihitung ulang dari gambar,
// gambar donat buku diukur dari PDF, temuan buku (donal, kadus, 6 kelas tidak ditulis di Buku Siswa, hasil lebih dari 100), emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k4b1g.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k4b1g-video.ts");

const stat = { kutipan: 0, terbilang: 0, teksPasang: 0, persamaan: 0, data: 0 };
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

/* ------------------------------ Isi dua video ------------------------------ */
const VIDEO = [V.VIDEO_MATERI_K4B1G, V.VIDEO_LUAR_K4B1G];
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
    cek(a.ketukan.length >= 3 && a.ketukan.length <= 14, `${nama}: 3 sampai 14 ketukan (ada ${a.ketukan.length})`);
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
      for (let p = 0; p < kata.length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) for (const b of bilanganDari(o.isi)) terlihat.add(b);
      for (const b of bilanganDari(kt.suara)) cek(terlihat.has(b), `${nama}#${i + 1}: bilangan ${b} di suara tampak di gambar`);
      const titikAksi = [...new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at)))].sort((m, n) => m - n);
      if (titikAksi.length >= 2) {
        const sid = titikAksi.map((p) => L.sidikKeadaan(L.keadaanStory(a, i, p)));
        cek(new Set(sid).size >= 2, `${nama}#${i + 1}: gambar berubah mengikuti kata dalam kalimat`);
      }
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
          else if (/A/.test(o.d ?? "")) {
            const n = bilangan(o.d);
            const r = n[4];
            cek(x - r > -2 && x + r < 302 && y - r > -2 && y + r < 210, `${nama}#${i + 1}: juring ${o.id} masuk kanvas`);
          }
        } else if (o.t === "garis" || o.t === "panah") cek(x > -2 && x < 302 && y > -2 && y < 204 && x + (o.x2 ?? 0) > -2 && x + (o.x2 ?? 0) < 302 && y + (o.y2 ?? 0) > -2 && y + (o.y2 ?? 0) < 204, `${nama}#${i + 1}: garis ${o.id} masuk kanvas`);
      }
      {
        const teksAda = akhir.filter((o) => o.t === "teks" && (o.op ?? 1) > 0 && o.isi && !/^[\u{1F000}-\u{1FFFF}]|^[✂✅❌]$/u.test(o.isi));
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
const G = await import("../src/components/modul/story/k4b1g-gambar.ts");
const U1 = await import("../src/components/modul/story/k4b1g-luar-1.ts");
const M = V.VIDEO_MATERI_K4B1G;
const U = V.VIDEO_LUAR_K4B1G;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const nilaiId = (objs, id) => objs.find((o) => o.id === id)?.isi;
const objAda = (objs, id) => objs.find((o) => o.id === id);
const T = (v, id, ke) => akhirAdegan(adegan(v, id), ke);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M);
  const luar = teksVideo(U);
  const METODE = ["Equal Groups", "Array Model", "Times Table Fluency", "Doubling"];
  const NAMA_ID = ["Kelompok Sama Banyak", "Model Susunan", "Kefasihan Tabel Kali", "Penggandaan"];
  cek(!/Equal Groups|Array Model|Times Table Fluency|Doubling|Kelompok Sama Banyak|Model Susunan|Kefasihan Tabel Kali|Penggandaan|metode luar|metode dari luar/i.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of [...METODE, ...NAMA_ID]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE, METODE, "nama metode di berkas luar-1");
  sama(U1.NAMA_METODE_ID, NAMA_ID, "nama Indonesia metode luar");
  cek(M.adegan.every((a) => /(Buku Siswa|Panduan Guru) hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  cek(U.adegan.every((a) => a.sumber.length <= 46), "video metode luar: label sumber cukup pendek untuk kanvas 300 lebar");
  cek(M.adegan.every((a) => a.sumber.length <= 52), "video materi: label sumber cukup pendek untuk kanvas 300 lebar");
  for (const kata of ["Peta konsep", "Kata kunci", "Apersepsi", "Ayo Berlatih", "Ayo Berpikir", "Ayo Mencoba", "Ayo Mengamati", "Miskonsepsi", "Diferensiasi", "Refleksi", "Subbab", "Tujuan pembelajaran", "Panduan guru", "Aktivitas"]) cek(!luar.toLowerCase().includes(kata.toLowerCase()), `video metode luar tidak memuat "${kata}" milik materi`);
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-kelompok", "luar-kelompok-terapan", "luar-susunan", "luar-susunan-terapan", "luar-fakta", "luar-fakta-terapan", "luar-ganda", "luar-ganda-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(U.adegan[0].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  cek(M.adegan.length === 12 && U.adegan.length === 10, "12 adegan materi dan 10 adegan metode luar");
  cek(M.id === "k4b1g-materi" && U.id === "k4b1g-luar", "id video k4b1g-materi dan k4b1g-luar");
  // Sub-Bab G tidak membocorkan materi sub-bab lain (pengurangan, pembagian, faktor, kelipatan) maupun penutup bab.
  const BOCOR = /pembagian|dibagi|faktor|kelipatan|pengurangan|dikurang|uji kompetensi|refleksi|remedial|ribuan/i;
  for (const a of M.adegan) cek(!BOCOR.test(teksAdegan(a)), `materi ${a.id} tidak membocorkan sub-bab lain`);
  for (const a of U.adegan) cek(!BOCOR.test(teksAdegan(a)), `metode luar ${a.id} tidak membocorkan sub-bab lain`);
  cek(totalKetukan >= 80, `total ketukan cukup dalam (${totalKetukan})`);
  cek(M.adegan.map((a) => a.id).join() === "panduan-awal,pemantik,amati-donat,cara-panjang,susun-tanpa-simpan,kelereng-panjang,susun-menyimpan,ayo-mencoba,berlatih-satu,berlatih-dua-a,berlatih-dua-b,miskonsepsi", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "luar-pembuka,luar-kelompok,luar-kelompok-terapan,luar-susunan,luar-susunan-terapan,luar-fakta,luar-fakta-terapan,luar-ganda,luar-ganda-terapan,luar-ringkas", "urutan adegan metode luar");
  // Tiga nama metode lama sama dengan naskah bab; nama metode baru belum dipakai naskah, judul, atau lab lain pada bab ini.
  const modul = new URL("../src/components/modul/", import.meta.url);
  const baca = (n) => readFileSync(new URL(n, modul), "utf8");
  const naskah = baca("naskah-k4b1.ts");
  cek(/Equal Groups/.test(naskah) && /Array Model/.test(naskah) && /Times Table Fluency/.test(naskah), "tiga nama metode lama sama dengan nama di naskah bab");
  cek(/Kelompok Sama Banyak/.test(naskah) && /Model Susunan/.test(naskah) && /Kefasihan Tabel Kali/.test(naskah), "tiga nama Indonesia metode lama sama dengan naskah bab");
  const berkasLab = readdirSync(modul).filter((f) => /^(lab-.*k4b1.*|data-k4b1|mesin-data-k4b1.*)\.ts$/.test(f));
  cek(berkasLab.length >= 9, `berkas lab dan data bab 1 ditemukan (${berkasLab.length})`);
  for (const n of ["naskah-k4b1.ts", ...berkasLab]) cek(!/Doubling|Penggandaan/i.test(baca(n)), `nama metode baru Doubling / Penggandaan tidak bentrok dengan ${n}`);
  for (const ad of [...M.adegan, ...U.adegan]) cek(!/Doubling|Penggandaan/i.test(ad.judul) || U.adegan.includes(ad), `judul ${ad.id}: nama metode baru hanya di video metode luar`);
}

/* ------------------------------ Bilangan yang diucapkan dengan kata tampak sebagai angka ------------------------------ */
const SATUAN = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
const NAMA_ANGKA = new Set([...SATUAN, "sepuluh", "sebelas", "seratus", "seribu", "belas", "puluh", "ratus", "ribu"]);
const nilaiKata = (kata) => {
  let total = 0;
  let cur = 0;
  let tunda = 0;
  for (const w of kata) {
    const u = SATUAN.indexOf(w);
    if (u >= 0) tunda = u;
    else if (w === "sepuluh") cur += 10;
    else if (w === "sebelas") cur += 11;
    else if (w === "belas") {
      cur += tunda + 10;
      tunda = 0;
    } else if (w === "puluh") {
      cur += tunda * 10;
      tunda = 0;
    } else if (w === "seratus") cur += 100;
    else if (w === "ratus") {
      cur += tunda * 100;
      tunda = 0;
    } else if (w === "seribu") total += 1000;
    else if (w === "ribu") {
      total += (cur + tunda || 1) * 1000;
      cur = 0;
      tunda = 0;
    }
  }
  return total + cur + tunda;
};
const deretBilangan = (suara) => {
  const hasil = [];
  let run = [];
  const tutup = () => {
    if (run.length && !["puluh", "belas", "ratus"].includes(run[0])) {
      const nilai = nilaiKata(run);
      if (nilai >= 10) hasil.push({ kata: run.join(" "), nilai });
    }
    run = [];
  };
  for (const mentah of suara.split(/\s+/).filter(Boolean)) {
    const w = mentah.toLowerCase().replace(/[^a-z]/g, "");
    if (NAMA_ANGKA.has(w)) run.push(w);
    else tutup();
    if (/[,.:;?!]$/.test(mentah)) tutup();
  }
  tutup();
  return hasil;
};
for (const v of [M, U]) {
  for (const a of v.adegan) {
    const terlihat = new Set();
    a.ketukan.forEach((kt, i) => {
      for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) for (const b of bilanganDari(o.isi)) terlihat.add(b);
      for (const d of deretBilangan(kt.suara)) {
        stat.terbilang += 1;
        cek(terlihat.has(String(d.nilai)), `${v.id}/${a.id}#${i + 1}: bilangan "${d.kata}" (${d.nilai}) tampak sebagai angka di gambar`);
      }
    });
  }
}

/* ------------------------------ Semua persamaan di gambar dihitung ulang ------------------------------ */
const hitungEks = (s) => {
  const t = s.replace(/\./g, "").replace(/×/g, "*").replace(/x/g, "*").replace(/−/g, "-");
  if (!/^[\d\s+*-]+$/.test(t)) return null;
  return Function(`"use strict";return (${t})`)();
};
for (const v of [M, U]) {
  for (const a of v.adegan) {
    const sudah = new Set();
    a.ketukan.forEach((kt, i) => {
      for (let p = 0; p < L.kataDari(kt.suara).length; p += 1)
        for (const o of L.keadaanStory(a, i, p)) {
          if (o.t !== "teks" || !o.isi || sudah.has(`${o.id}:${o.isi}`)) continue;
          sudah.add(`${o.id}:${o.isi}`);
          const m = o.isi.match(/^([\d\s+×x−.-]+?)\s*=\s*(\d[\d.]*)(?:\D.*)?$/);
          if (m && /[+×x−-]/.test(m[1])) {
            stat.persamaan += 1;
            cek(hitungEks(m[1]) === Number(m[2].replace(/\./g, "")), `${v.id}/${a.id}: persamaan "${o.isi}" dihitung ulang`);
          }
        }
    });
  }
}

/* ------------------------------ Persamaan bertanda kurung dan berantai dihitung ulang ------------------------------ */
{
  const nilaiEks = (s) => {
    const t = s.replace(/×|x/g, "*").replace(/−/g, "-").trim();
    if (!t || !/^[\d\s+*().-]+$/.test(t) || !/\d/.test(t)) return null;
    try {
      return Function(`"use strict";return (${t})`)();
    } catch {
      return null;
    }
  };
  for (const v of [M, U]) {
    for (const a of v.adegan) {
      const sudah = new Set();
      a.ketukan.forEach((kt, i) => {
        for (let p = 0; p < L.kataDari(kt.suara).length; p += 1)
          for (const o of L.keadaanStory(a, i, p)) {
            if (o.t !== "teks" || !o.isi || !o.isi.includes("=") || sudah.has(`${o.id}:${o.isi}`)) continue;
            sudah.add(`${o.id}:${o.isi}`);
            const nilai = o.isi.split("=").map(nilaiEks).filter((n) => n !== null);
            if (nilai.length >= 2) {
              stat.persamaan += 1;
              cek(nilai.every((n) => n === nilai[0]), `${v.id}/${a.id}: rantai persamaan "${o.isi}" dihitung ulang (${nilai.join(" ; ")})`);
            }
          }
      });
    }
  }
}

/* ------------------------------ Data buku, hitungan mandiri, dan gambar dihitung ulang ------------------------------ */
const kelompokInfo = (objs, id) => {
  const kotak = objs.filter((o) => new RegExp(`^${id}-g\\d+$`).test(o.id));
  if (!kotak.length) return null;
  const perKotak = kotak.map((b) => objs.filter((o) => new RegExp(`^${b.id}-o\\d+$`).test(o.id)).length);
  const baris = new Map();
  for (const b of kotak) baris.set(b.y, (baris.get(b.y) ?? 0) + 1);
  return {
    n: kotak.length,
    perKotak,
    sama: kotak.every((b) => b.w === kotak[0].w && b.h === kotak[0].h),
    perBaris: [...baris.entries()].sort((p, q) => p[0] - q[0]).map((e) => e[1]),
    dots: perKotak.reduce((s, q) => s + q, 0),
    tulisan: objs.filter((o) => new RegExp(`^${id}-t\\d+$`).test(o.id)).map((o) => o.isi),
  };
};
/** Kelompok bulatan: banyak kotak, isi tiap kotak, banyak per baris, total. */
const kelompokOk = (objs, id, banyak, per, perBaris) => {
  const i = kelompokInfo(objs, id);
  return !!i && i.n === banyak && i.sama && i.perKotak.every((q) => q === per) && i.dots === banyak * per && (perBaris === undefined || JSON.stringify(i.perBaris) === JSON.stringify(perBaris));
};
const kelompokAngkaOk = (objs, id, banyak, isi) => {
  const i = kelompokInfo(objs, id);
  return !!i && i.n === banyak && i.sama && i.tulisan.length === banyak && i.tulisan.every((t) => t === isi);
};
/** Perkalian bersusun: dibaca dari angka-angka di gambar. */
const susunInfo = (objs, id) => {
  const m0 = nilaiId(objs, `${id}-m0`);
  const m1 = nilaiId(objs, `${id}-m1`);
  const p = nilaiId(objs, `${id}-p`);
  const h = objs.filter((o) => new RegExp(`^${id}-h\\d+$`).test(o.id)).sort((x, y) => x.x - y.x);
  return { a: Number(`${m0}${m1}`), b: Number(p), hasil: h.map((o) => o.isi).join(""), kolHasil: h.map((o) => o.x), xSatuan: objAda(objs, `${id}-m1`)?.x };
};
const susunOk = (objs, id, a, b) => {
  const i = susunInfo(objs, id);
  return i.a === a && i.b === b && i.hasil === String(a * b) && i.kolHasil[i.kolHasil.length - 1] === i.xSatuan && objAda(objs, `${id}-x`)?.isi === "×" && !!objAda(objs, `${id}-g`);
};
/** Angka yang disimpan menurut hitungan mandiri: satuan kali pengali dibagi sepuluh. */
const simpanMandiri = (a, b) => Math.floor(((a % 10) * b) / 10);
const hasilBersusun = (a, b) => {
  const satuan = (a % 10) * b;
  const puluhan = Math.floor(a / 10) * b + Math.floor(satuan / 10);
  return puluhan * 10 + (satuan % 10);
};
const deretInfo = (objs, id) => {
  const d = objs.filter((o) => new RegExp(`^${id}-o\\d+$`).test(o.id));
  if (!d.length) return null;
  const xs = [...new Set(d.map((o) => o.x))].sort((p, q) => p - q);
  const kol = xs.length;
  const bar = new Set(d.map((o) => o.y)).size;
  const warnaKolom = xs.map((x) => d.filter((o) => o.x === x).map((o) => o.warna));
  return { n: d.length, kol, bar, rapi: kol * bar === d.length, warnaKolom: warnaKolom.map((w) => (new Set(w).size === 1 ? w[0] : "campur")), sama: d.every((o) => o.r === d[0].r) };
};
{
  // Data buku ditulis ulang di sini sebagai pembanding mandiri.
  sama({ ...G.DONAT }, { kotak: 12, isi: 4, hasil: 48, perBaris: 6 }, "Ayo Mengamati hlm. 39: 12 kotak, 4 donat, 48, enam kotak per baris");
  sama(G.DONAT.kotak * G.DONAT.isi, 48, "hitungan mandiri 12 kali 4");
  sama([4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4].reduce((s, q) => s + q, 0), 48, "penjumlahan berulang 4 sebanyak 12 kali");
  sama(G.KELERENG.tumpuk * G.KELERENG.isi, 70, "hitungan mandiri 14 kali 5");
  sama((10 + 4) * 5, 10 * 5 + 4 * 5, "cara panjang 14 kali 5 sama dengan 50 + 20");
  sama(10 * 5 + 4 * 5, 70, "50 + 20 = 70");
  sama((10 + 2) * 4, 10 * 4 + 2 * 4, "cara panjang 12 kali 4: 40 + 8");
  sama(G.PENSIL.pak * G.PENSIL.isi, 96, "hitungan mandiri 8 pak kali 12 batang");
  sama(hasilBersusun(12, 8), 96, "bersusun 12 kali 8 = 96");
  sama(hasilBersusun(14, 5), 70, "bersusun 14 kali 5 = 70");
  sama(hasilBersusun(12, 4), 48, "bersusun 12 kali 4 = 48");
  sama([simpanMandiri(14, 5), simpanMandiri(12, 8), simpanMandiri(12, 4)], [2, 1, 0], "angka disimpan: 14 kali 5 -> 2, 12 kali 8 -> 1, 12 kali 4 -> 0");
  sama(G.TELUR.kardus * G.TELUR.isi, 120, "hitungan mandiri 12 kardus kali 10 butir telur (tidak ada di buku)");
  sama(G.LATIHAN_SATU.map((q) => [...q]), [[32, 3], [24, 2], [37, 2], [52, 5], [48, 7]], "Ayo Berlatih hlm. 43 nomor 1: soal");
  sama(G.LATIHAN_SATU.map(([a, b]) => a * b), [96, 48, 74, 260, 336], "hitungan mandiri nomor 1");
  sama([...G.KUNCI_SATU], [96, 48, 74, 260, 336], "kunci Panduan Guru hlm. 62 nomor 1: 96, 48, 74, 260, 336");
  sama(G.LATIHAN_SATU.map(([a, b]) => hasilBersusun(a, b)), [96, 48, 74, 260, 336], "bersusun nomor 1 dengan penyimpanan");
  sama(G.LATIHAN_SATU.map(([a, b]) => simpanMandiri(a, b)), [0, 0, 1, 1, 5], "angka disimpan nomor 1: c 1, d 1, e 5");
  sama(G.CERITA_DUA.map((q) => [...q]), [[12, 3], [2, 45], [14, 7], [21, 4], [13, 6]], "Panduan Guru hlm. 62-64 nomor 2: perkalian yang ditulis");
  sama(G.CERITA_DUA.map(([a, b]) => a * b), [36, 90, 98, 84, 78], "hitungan mandiri nomor 2");
  sama([...G.KUNCI_DUA], [36, 90, 98, 84, 78], "kunci Panduan Guru nomor 2: 36, 90, 98, 84, 78");
  sama(10 * 7 + 4 * 7, 98, "14 kali 7 = 70 + 28");
  sama([8 * 7, 4 * 7, 28 + 5, 48 * 7], [56, 28, 33, 336], "fakta kali untuk 48 kali 7: 56, 28, 33, 336");
  sama([2 * 5, 5 * 5, 25 + 1, 52 * 5], [10, 25, 26, 260], "langkah 52 kali 5: 10, 25, 26, 260");
  sama([7 * 2, 3 * 2 + 1, 37 * 2], [14, 7, 74], "langkah 37 kali 2: 14, 7, 74");
  sama([12 * 2, 12 * 4, 12 * 8, 21 * 2, 21 * 4], [24, 48, 96, 42, 84], "penggandaan: 12, 24, 48, 96 dan 21, 42, 84");
  sama(2 * 2 * 2, 8, "8 pak: dua kali dua kali dua");

  // Materi: panduan awal dan pemantik.
  const pa = T(M, "panduan-awal", 0);
  cek(["a1-k", "a2-k", "a3-k"].every((i) => objAda(pa, i)), "pengalaman belajar: tiga kartu benda konkret, gambar, simbol");
  const tl = T(M, "pemantik", 1);
  cek(kelompokOk(tl, "tl", 12, 10, [6, 6]), "pemantik: 12 kardus berisi 10 telur (120 butir), enam kardus per baris");
  sama(nilaiId(T(M, "pemantik", 2), "tlh"), "12 × 10 = 120 butir", "hitungan telur ditandai tambahan video");
  // Donat.
  const dn0 = T(M, "amati-donat", 0);
  cek(kelompokOk(dn0, "dn", 12, 4, [6, 6]), "amati donat: 12 kotak (6 + 6), tiap kotak 4 donat (gambar buku: 12 gambar kotak dua baris)");
  const dn2 = T(M, "amati-donat", 2);
  const sumDn = nilaiId(dn2, "dns").split("=");
  sama(sumDn[0].trim().split("+").length, 12, "penjumlahan donat: 12 suku");
  cek(sumDn[0].trim().split("+").every((s) => s.trim() === "4") && sumDn[1].trim() === "48", "penjumlahan donat: 12 suku bernilai 4, hasil 48");
  // Cara panjang donat.
  const cp = T(M, "cara-panjang", 3);
  sama([nilaiId(cp, "cp0"), nilaiId(cp, "cp1"), nilaiId(cp, "cp2"), nilaiId(cp, "cp3"), nilaiId(cp, "cp4")], ["12 × 4 = ...", "12 × 4 = (10 + 2) × 4", "12 × 4 = (10 × 4) + (2 × 4)", "= 40 + 8", "= 48 donat"], "langkah cara panjang donat sama dengan buku hlm. 40");
  // Bersusun.
  const sb = T(M, "susun-tanpa-simpan", 2);
  cek(susunOk(sb, "sb", 12, 4) && !objAda(sb, "sb-s"), "bersusun 12 kali 4: angka, tanda kali, garis, hasil 48 sejajar satuan, tanpa angka disimpan");
  sama([nilaiId(T(M, "susun-tanpa-simpan", 1), "sc1"), nilaiId(T(M, "susun-tanpa-simpan", 1), "sc2")], ["1 × 4 = 4", "2 × 4 = 8"], "langkah buku hlm. 41: 1 × 4 = 4 dan 2 × 4 = 8");
  // Kelereng.
  const kl0 = T(M, "kelereng-panjang", 0);
  cek(kelompokOk(kl0, "kl", 14, 5, [5, 5, 4]), "kelereng: 14 tumpuk berisi 5 butir, susunan 5 + 5 + 4 seperti gambar buku (70 butir)");
  const kl1 = T(M, "kelereng-panjang", 1);
  cek(Array.from({ length: 14 }, (_, i) => objAda(kl1, `kl-g${i}`).warna).join() === [...Array(10).fill("#DCFCE7"), ...Array(4).fill("#DBEAFE")].join(), "kelereng: 10 tumpuk (dua baris) dan 4 tumpuk (baris ketiga) diberi warna berbeda");
  const sm = T(M, "susun-menyimpan", 3);
  cek(susunOk(sm, "sm", 14, 5) && sm.find((o) => o.id === "sm-s")?.isi === "2", "bersusun 14 kali 5: hasil 70, angka disimpan 2");
  sama([nilaiId(sm, "sm1"), nilaiId(sm, "sm2"), nilaiId(sm, "sm3")], ["4 × 5 = 20", "1 × 5 = 5", "2 + 5 = 7"], "langkah buku hlm. 42: 4 × 5 = 20, 1 × 5 = 5, 2 + 5 = 7");
  // Ayo Mencoba.
  cek(kelompokAngkaOk(T(M, "ayo-mencoba", 0), "pk", 8, "12 batang"), "Ayo Mencoba: 8 pak berisi 12 batang");
  const sp = T(M, "ayo-mencoba", 3);
  cek(susunOk(sp, "sp", 12, 8) && sp.find((o) => o.id === "sp-s")?.isi === "1", "Ayo Mencoba: bersusun 12 kali 8 = 96, angka disimpan 1 (kunci Panduan Guru hlm. 62)");
  // Ayo Berlatih nomor 1.
  const bs1 = T(M, "berlatih-satu", 0);
  sama([0, 1, 2, 3, 4].map((i) => nilaiId(bs1, `q${i}`)), ["a. 32 × 3 = ...", "b. 24 × 2 = ...", "c. 37 × 2 = ...", "d. 52 × 5 = ...", "e. 48 × 7 = ..."], "soal nomor 1 sama dengan buku hlm. 43");
  G.LATIHAN_SATU.forEach(([a, b], i) => {
    const id = ["la", "lb", "lc", "ld", "le"][i];
    const o = T(M, "berlatih-satu", i + 1);
    cek(susunOk(o, id, a, b), `nomor 1 ${"abcde"[i]}: bersusun ${a} kali ${b} = ${a * b} dari angka di gambar`);
    sama(objAda(o, `${id}-s`)?.isi, simpanMandiri(a, b) > 0 ? String(simpanMandiri(a, b)) : undefined, `nomor 1 ${"abcde"[i]}: angka disimpan ${simpanMandiri(a, b)}`);
    sama(nilaiId(o, `${id}k-t0`), `${a} × ${b} = ${a * b}`, `nomor 1 ${"abcde"[i]}: kartu hasil`);
  });
  const kk = T(M, "berlatih-satu", 6);
  sama([0, 1, 2, 3, 4].map((i) => nilaiId(kk, `kk${i}`)), ["32 × 3 = 96", "24 × 2 = 48", "37 × 2 = 74", "52 × 5 = 260", "48 × 7 = 336"], "kunci nomor 1 di gambar");
  sama(nilaiId(T(M, "berlatih-satu", 7), "lnk-t0"), "260 dan 336 lebih dari 100", "catatan hasil lebih dari 100");
  // Ayo Berlatih nomor 2.
  const d2a = T(M, "berlatih-dua-a", 0);
  cek(kelompokOk(d2a, "ay", 12, 3, [6, 6]) && nilaiId(d2a, "ayh") === "12 × 3 = 36 mangkok", "2 a: 12 ayam, tiap ayam 3 mangkok = 36");
  const d2b = T(M, "berlatih-dua-a", 1);
  cek(kelompokAngkaOk(d2b, "rk", 2, "45 buku") && nilaiId(d2b, "rkh") === "2 × 45 = 90 buku", "2 b: 2 rak berisi 45 buku = 90");
  const d2c = T(M, "berlatih-dua-a", 2);
  cek(kelompokOk(d2c, "kc", 14, 7, [7, 7]) && nilaiId(d2c, "kch") === "14 × 7 = 98 kancing" && nilaiId(d2c, "kcp") === "70 + 28 = 98", "2 c: 14 baju, tiap baju 7 kancing = 98");
  const d2d = T(M, "berlatih-dua-b", 0);
  cek(kelompokOk(d2d, "kd", 21, 4, [7, 7, 7]) && nilaiId(d2d, "kdh") === "21 × 4 = 84 kaki", "2 d: 21 kucing, tiap kucing 4 kaki = 84");
  const d2e = T(M, "berlatih-dua-b", 2);
  cek(kelompokAngkaOk(d2e, "ks", 6, "13") && nilaiId(d2e, "ksh") === "13 × 6 = 78 siswa", "2 e: 6 kelas (dari Panduan Guru), tiap kelas 13 siswa = 78");
  cek(nilaiId(T(M, "berlatih-dua-b", 1), "e2-t1") === "tidak ditulis" && !objAda(T(M, "berlatih-dua-b", 1), "ks-g0"), "2 e di Buku Siswa: banyak kelas tidak ditulis");
  // Miskonsepsi 2: contoh 37 kali 2.
  const mk = T(M, "miskonsepsi", 3);
  cek(susunInfo(mk, "mk").a === 37 && susunInfo(mk, "mk").b === 2 && susunInfo(mk, "mk").hasil === "4" && mk.find((o) => o.id === "mk-s")?.isi === "1", "miskonsepsi penyimpanan: 37 kali 2, ditulis 4, disimpan 1");

  // Metode luar: jumlah benda dihitung ulang.
  cek(kelompokOk(T(U, "luar-pembuka", 0), "po", 12, 4, [6, 6]), "luar pembuka: 12 kotak donat berisi 4 donat");
  cek(kelompokOk(T(U, "luar-kelompok", 0), "eg", 12, 4, [6, 6]), "Equal Groups: 12 kelompok berisi 4");
  sama(nilaiId(T(U, "luar-kelompok", 3), "egk-t1"), "12 × 4 = 48", "Equal Groups: hasil 12 × 4 = 48");
  cek(kelompokOk(T(U, "luar-kelompok-terapan", 0), "ea", 12, 3, [6, 6]), "Equal Groups terapan: 12 kelompok ayam berisi 3 mangkok");
  cek(kelompokOk(T(U, "luar-kelompok-terapan", 2), "ec", 21, 4, [7, 7, 7]) && nilaiId(T(U, "luar-kelompok-terapan", 3), "ech") === "21 × 4 = 84 kaki", "Equal Groups terapan: 21 kelompok kucing berisi 4 kaki = 84");
  const ar = T(U, "luar-susunan", 3);
  const ari = deretInfo(ar, "ar");
  cek(ari && ari.n === 48 && ari.kol === 12 && ari.bar === 4 && ari.rapi && ari.sama, "Array Model: susunan 4 baris 12 kolom = 48 bulatan");
  cek(ari.warnaKolom.slice(0, 10).every((c) => c === "#FFC800") && ari.warnaKolom.slice(10).every((c) => c === "#2B8FD0"), "Array Model: 10 kolom pertama dan 2 kolom terakhir berbeda warna");
  sama([10 * 4, 2 * 4, 10 * 4 + 2 * 4], [40, 8, 48], "Array Model: 40 + 8 = 48");
  const ak = T(U, "luar-susunan-terapan", 2);
  const aki = deretInfo(ak, "ak");
  cek(aki && aki.n === 98 && aki.kol === 14 && aki.bar === 7 && aki.rapi && aki.sama, "Array Model terapan: susunan 7 baris 14 kolom = 98 bulatan");
  cek(aki.warnaKolom.slice(0, 10).every((c) => c === "#FFC800") && aki.warnaKolom.slice(10).every((c) => c === "#2B8FD0"), "Array Model terapan: 10 kolom dan 4 kolom berbeda warna");
  // Tabel kali tujuh.
  const tk = T(U, "luar-fakta", 1);
  for (let n = 1; n <= 10; n += 1) sama(nilaiId(tk, `tk${n}`), `${n} × 7 = ${n * 7}`, `tabel kali tujuh baris ${n}`);
  cek(objAda(tk, "tk4").sorot === true && objAda(tk, "tk8").sorot === true, "tabel kali tujuh: fakta 4 × 7 dan 8 × 7 disorot");
  const tf = T(U, "luar-fakta-terapan", 2);
  cek(susunOk(tf, "tf", 48, 7) && tf.find((o) => o.id === "tf-s")?.isi === "5", "Times Table Fluency terapan: bersusun 48 kali 7 = 336, disimpan 5");
  sama(nilaiId(T(U, "luar-fakta-terapan", 1), "tf3"), "28 + 5 = 33", "Times Table Fluency terapan: 28 + 5 = 33");
  // Batang penggandaan: lebar batang = nilai kali skala, dan tiap batang dua kali batang sebelumnya.
  const batangOk = (objs, ids, nilai) => ids.every((id, i) => {
    const b = objAda(objs, id);
    return b && Math.abs(b.w - nilai[i] * 2.8) < 1e-6 && nilaiId(objs, `${id}t`) === String(nilai[i]);
  });
  cek(batangOk(T(U, "luar-ganda", 1), ["dd0", "dd1", "dd2"], [12, 24, 48]), "Doubling: batang 12, 24, 48 selebar nilainya");
  cek(batangOk(T(U, "luar-ganda-terapan", 2), ["fp0", "fp1", "fp2", "fp3"], [12, 24, 48, 96]), "Doubling terapan: batang 12, 24, 48, 96 selebar nilainya (pensil)");
  cek(batangOk(T(U, "luar-ganda-terapan", 3), ["fk0", "fk1", "fk2"], [21, 42, 84]), "Doubling terapan: batang 21, 42, 84 selebar nilainya (kucing)");
  for (const [id, ke, ids] of [["luar-ganda", 1, ["dd0", "dd1", "dd2"]], ["luar-ganda-terapan", 2, ["fp0", "fp1", "fp2", "fp3"]], ["luar-ganda-terapan", 3, ["fk0", "fk1", "fk2"]]]) {
    const o = T(U, id, ke);
    cek(ids.slice(1).every((b, i) => Math.abs(objAda(o, b).w - 2 * objAda(o, ids[i]).w) < 1e-6), `${id}: tiap batang dua kali batang sebelumnya`);
  }
  // Ringkasan: angka yang diucapkan tampak pada tabel dan ada di buku.
  const rt = T(U, "luar-ringkas", 1);
  const angkaRingkas = ["12 × 4, 12 × 3, 21 × 4", "12 × 4, 14 × 7", "48 × 7", "12 × 4, 12 × 8, 21 × 4"];
  sama([nilaiId(rt, "rt1-t1"), nilaiId(rt, "rt2-t1"), nilaiId(rt, "rt3-t1"), nilaiId(rt, "rt4-t1")], angkaRingkas, "ringkasan: angka buku tiap metode");
  for (const t of angkaRingkas) {
    for (const f of t.split(",").map((s) => s.trim())) {
      const [a, b] = f.split("×").map((s) => Number(s.trim()));
      cek(G.LATIHAN_SATU.some(([x, y]) => x === a && y === b) || G.CERITA_DUA.some(([x, y]) => x === a && y === b) || (a === 12 && (b === 4 || b === 8)), `ringkasan: ${f} adalah perkalian yang ada di buku`);
    }
  }
  stat.data += 1;
}

/* ------------------------------ Kutipan buku (bila PDF tersedia) ------------------------------ */
{
  const bs = new URL("../bahan-sd/Matematika-BS-KLS-IV.pdf", import.meta.url);
  const bg = new URL("../bahan-sd/Matematika-BG-KLS-IV.pdf", import.meta.url);
  const jalur = (u) => u.pathname.replace(/^\/([A-Za-z]:)/, "$1");
  const KODE_PY = "import sys, pymupdf\nsys.stdout.reconfigure(encoding='utf-8', errors='replace')\nd = pymupdf.open(sys.argv[1])\nsys.stdout.write('\\n'.join(d[i - 1].get_text() for i in range(int(sys.argv[2]), int(sys.argv[3]) + 1)))";
  const KODE_GAMBAR = "import sys, json, pymupdf\nd = pymupdf.open(sys.argv[1])\npg = d[int(sys.argv[2]) - 1]\nout = [[round(v) for v in i['bbox']] for i in pg.get_image_info()]\nprint(json.dumps(out))";
  const ambil = (berkas, dari, sampai) => {
    const r = spawnSync("pdftotext", ["-enc", "UTF-8", "-f", String(dari), "-l", String(sampai), "-raw", jalur(berkas), "-"], { encoding: "utf8", maxBuffer: 1 << 26 });
    if (r.status === 0) return r.stdout;
    // Cadangan bila pdftotext tidak ada: PyMuPDF (python -I).
    const p = spawnSync("python", ["-I", "-c", KODE_PY, jalur(berkas), String(dari), String(sampai)], { encoding: "utf8", maxBuffer: 1 << 26 });
    return p.status === 0 ? p.stdout : null;
  };
  // Kelas IV: Buku Siswa hlm. N = PDF N+12 (hlm. 39-43 = PDF 51-55; sub-bab G mulai di tengah PDF 51); Panduan Guru hlm. N = PDF N+12 (hlm. 60-64 = PDF 72-76; G mulai di tengah PDF 72 dan butir diferensiasi terakhir ada di awal PDF 77, sebelum sub-bab H).
  const bagian = existsSync(bs) && existsSync(bg) ? [ambil(bs, 51, 55), ambil(bg, 72, 77)] : [null];
  if (bagian.some((b) => b === null)) console.log("PDF atau pembaca PDF tidak tersedia: pemeriksaan kutipan buku dilewati");
  else {
    const bersih = (t) => t.toLowerCase().replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim();
    const JUDUL_G = "g. perkalian bilangan cacah sampai 100";
    const JUDUL_H = "h. pembagian bilangan cacah sampai 100";
    const siswaPenuh = bersih(bagian[0]);
    const guruPenuh = bersih(bagian[1]);
    cek(siswaPenuh.indexOf(JUDUL_G) > 0 && guruPenuh.indexOf(JUDUL_G) > 0 && guruPenuh.indexOf(JUDUL_H) > guruPenuh.indexOf(JUDUL_G), "Buku Siswa PDF 51 dan Panduan Guru PDF 72 memuat judul sub-bab G; Panduan Guru PDF 77 memuat judul sub-bab H");
    const siswa = siswaPenuh.slice(siswaPenuh.indexOf(JUDUL_G));
    const guru = guruPenuh.slice(guruPenuh.indexOf(JUDUL_G), guruPenuh.indexOf(JUDUL_H));
    const buku = `${siswa}\n${guru}`;
    // Nomor halaman cetak sama dengan PDF dikurangi 12.
    const halaman = (berkas, pdf, cetak) => new RegExp(`(^|\\n)\\s*${cetak}(\\s|$)`).test(ambil(berkas, pdf, pdf));
    for (let pdf = 51; pdf <= 55; pdf += 1) cek(halaman(bs, pdf, pdf - 12), `Buku Siswa PDF ${pdf} bernomor halaman ${pdf - 12}`);
    for (let pdf = 72; pdf <= 77; pdf += 1) cek(halaman(bg, pdf, pdf - 12), `Panduan Guru PDF ${pdf} bernomor halaman ${pdf - 12}`);
    cek(!bersih(ambil(bs, 50, 50)).includes(JUDUL_G) && !bersih(ambil(bg, 71, 71)).includes(JUDUL_G), "sub-bab G belum mulai di Buku Siswa PDF 50 dan Panduan Guru PDF 71");
    let n = 0;
    for (const a of M.adegan) {
      for (const kt of a.kutipan ?? []) {
        n += 1;
        cek(buku.includes(bersih(kt)), `kutipan buku ${a.id}: "${kt}" ada di teks PDF`);
      }
    }
    stat.kutipan = n;
    cek(n >= 100, `jumlah kutipan buku yang diperiksa (${n})`);
    cek(M.adegan.every((a) => (a.kutipan ?? []).length >= 3), "tiap adegan materi memuat paling sedikit 3 kutipan buku");
    // Isi buku yang dicatat sebagai temuan di video dihitung ulang dari teks PDF.
    const hlm39 = bersih(ambil(bs, 51, 51));
    cek((hlm39.match(/4 dona[lt]/g) ?? []).length === 12 && (hlm39.match(/4 donal/g) ?? []).length === 2, "Buku Siswa hlm. 39: 12 suku 4 donat dengan 2 suku salah ketik donal");
    cek(guru.includes("12 kadus yang berisi masing-masing 10 butir"), "Panduan Guru hlm. 61: stimulus 12 kardus (tertulis kadus) berisi 10 butir telur");
    const stimulus = guru.slice(guru.indexOf("misalkan ada 12 kadus"), guru.indexOf("aktivitas pembelajaran", guru.indexOf("misalkan ada 12 kadus")));
    cek(stimulus.length > 50 && !stimulus.includes("120"), "Panduan Guru hlm. 61: jawaban 120 telur tidak ditulis (guru tidak perlu menjawab)");
    const soalDua = siswa.slice(siswa.indexOf("2. kerjakan soal cerita berikut!"));
    cek(soalDua.includes("sd anggrek") && !/6 kelas|enam kelas|\b6\b/.test(soalDua.slice(soalDua.indexOf("sd anggrek"))), "Buku Siswa hlm. 43 nomor 2 e: banyak kelas tidak ditulis");
    cek(guru.includes("terdapat 6 kelas yang dikutkan lomba") && guru.includes("13 x 6 = 78"), "Panduan Guru hlm. 63-64: menambahkan 6 kelas dan menulis 13 x 6 = 78");
    cek(!/kunci/.test(siswa), "Buku Siswa hlm. 39-43: tanpa kunci jawaban (hitungan mandiri)");
    cek(guru.includes("3 x 2 = 2 + 2 + 2 (benar)") && guru.includes("3 x 2 = 3 + 3 (salah)"), "Panduan Guru hlm. 64: miskonsepsi 3 x 2 = 2 + 2 + 2 benar, 3 + 3 salah");
    cek(guru.includes("berikan perkalian bilangan yang tidak menyimpan terlebih dahulu"), "Panduan Guru hlm. 65: diferensiasi rendah mulai dari perkalian tanpa menyimpan");
    cek(!/\b(260|336)\b/.test(siswa), "Buku Siswa: hasil 260 dan 336 tidak tertulis (hanya di kunci Panduan Guru)");
    // Gambar donat hlm. 39 (PDF 51): 12 gambar kotak, enam per baris, dua baris.
    const gd = spawnSync("python", ["-I", "-c", KODE_GAMBAR, jalur(bs), "51"], { encoding: "utf8" });
    if (gd.status !== 0) console.log("PyMuPDF tidak tersedia: pengukuran gambar donat dilewati");
    else {
      const kotakDonat = JSON.parse(gd.stdout).filter((b) => b[2] - b[0] > 60 && b[2] - b[0] < 90 && b[3] - b[1] > 50 && b[3] - b[1] < 70);
      cek(kotakDonat.length === 12 && new Set(kotakDonat.map((b) => b[0])).size === 6 && new Set(kotakDonat.map((b) => b[1])).size === 2, `gambar donat hlm. 39: 12 kotak, 6 kolom, 2 baris (${kotakDonat.length})`);
    }
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k4b1g-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|k4b1g-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k4b1g sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k4b1g.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_G41|video-k4b2-umum|video-k4b1-umum|naskah-k4b1/.test(pembungkus) && /VIDEO_MATERI_K4B1G/.test(pembungkus) && /VIDEO_LUAR_K4B1G/.test(pembungkus) && /export function VideoK4B1G/.test(pembungkus) && /daftar-video-cerita/.test(pembungkus), "video-k4b1g.tsx: dua video dari mesin Story, tanpa naskah dan pembungkus umum lama");
  cek(!/\r/.test(pembungkus), "video-k4b1g.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k4b1g.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k4b1g.mjs: akhir baris LF");
}

for (const v of [M, U]) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Pemeriksaan: ${stat.kutipan} kutipan terhadap teks PDF, ${stat.terbilang} bilangan berkata, ${stat.persamaan} persamaan, ${stat.teksPasang} pasangan teks`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
