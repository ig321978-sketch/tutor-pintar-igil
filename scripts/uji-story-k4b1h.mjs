// Uji Story Kelas 4 Bab 1 Sub-Bab H (Pembagian Bilangan Cacah sampai 100): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Memeriksa: pemicu kata, suara tanpa digit, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk,
// pemisahan materi dan metode luar, tidak membocorkan sub-bab lain, kutipan buku terhadap teks PDF (Buku Siswa PDF 56-59, Panduan Guru PDF 77-81),
// hitungan mandiri kunci buku (10 kunci), semua persamaan di gambar, pembagian bersusun dihitung ulang dari gambar, jumlah benda (permen, kelereng, wadah, petak), rantai pengurangan,
// emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k4b1h.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";
import { spawnSync } from "node:child_process";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k4b1h-video.ts");

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
const VIDEO = [V.VIDEO_MATERI_K4B1H, V.VIDEO_LUAR_K4B1H];
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


/* ------------------------------ Struktur, pemisahan materi dan metode luar ------------------------------ */
const G = await import("../src/components/modul/story/k4b1h-gambar.ts");
const U1 = await import("../src/components/modul/story/k4b1h-luar-1.ts");
const M = V.VIDEO_MATERI_K4B1H;
const U = V.VIDEO_LUAR_K4B1H;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const nilaiId = (objs, id) => objs.find((o) => o.id === id)?.isi;
const T = (v, id, ke) => akhirAdegan(adegan(v, id), ke);
const objAda = (objs, id) => objs.find((o) => o.id === id);
const hitungBenda = (objs, id) => objs.filter((o) => new RegExp(`^${id}-o\\d+$`).test(o.id)).length;
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
for (const v of [M, U]) for (const a of v.adegan) for (const [i, kt] of a.ketukan.entries()) cek(!/\d/.test(kt.suara), `${v.id}/${a.id}#${i + 1}: suara tanpa digit (bilangan ditulis dengan kata)`);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M);
  const luar = teksVideo(U);
  const METODE = ["Fair Share", "Measurement Division", "Inverse of Multiply", "Repeated Subtraction"];
  const NAMA_ID = ["Bagi Rata", "Bagi Ukur", "Kebalikan Kali", "Pengurangan Berulang"];
  // Huruf besar: kalimat Apersepsi buku sendiri memuat "pengurangan berulang" (huruf kecil), bukan nama metode.
  cek(!/Fair Share|Measurement Division|Inverse of Multiply|Repeated Subtraction|Bagi Rata|Bagi Ukur|Kebalikan Kali|Pengurangan Berulang|metode luar|metode dari luar|Van de Walle/.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of [...METODE, ...NAMA_ID]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE, METODE, "nama metode di berkas luar-1");
  sama(U1.NAMA_METODE_ID, NAMA_ID, "nama Indonesia metode luar");
  cek(M.adegan.every((a) => /(Buku Siswa|Panduan Guru) hlm\./.test(a.sumber)), "video materi: tiap adegan mencatat halaman buku");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber)), "video metode luar: tiap adegan bersumber metode luar atau ringkasan");
  cek(U.adegan.every((a) => a.sumber.length <= 46), "video metode luar: label sumber cukup pendek untuk kanvas 300 lebar");
  cek(M.adegan.every((a) => a.sumber.length <= 52), "video materi: label sumber cukup pendek untuk kanvas 300 lebar");
  for (const kata of ["Peta konsep", "Kata kunci", "Apersepsi", "Ayo Berlatih", "Ayo Berpikir", "Miskonsepsi", "Diferensiasi", "Refleksi", "Subbab", "Tujuan pembelajaran", "Panduan guru", "Aktivitas"]) cek(!new RegExp(kata, "i").test(luar), `video metode luar tidak memuat "${kata}" milik materi`);
  cek(U.adegan.map((a) => a.id).join() === "luar-pembuka,luar-bagi-rata,luar-bagi-rata-terapan,luar-bagi-ukur,luar-bagi-ukur-terapan,luar-kali-balik,luar-kali-balik-terapan,luar-kurang-ulang,luar-kurang-ulang-terapan,luar-ringkas", "urutan adegan metode luar: pembuka, empat metode (konsep dan penerapan), ringkasan");
  cek(M.adegan.map((a) => a.id).join() === "pembuka-h,pemantik,aktivitas-lima,tabel-wadah,susun-istilah,susun-langkah,berlatih-satu,cerita-bagi,cerita-kotak,miskonsepsi", "urutan adegan materi");
  cek(M.id === "k4b1h-materi" && U.id === "k4b1h-luar", "id video k4b1h-materi dan k4b1h-luar");
  cek(M.jenis === "materi" && U.jenis === "metode-luar", "jenis video materi dan metode-luar");
  // Tidak membocorkan materi sub-bab lain (faktor, kelipatan, pembulatan, penutup bab).
  const BOCOR = /faktor|kelipatan|prima|pembulatan|uji kompetensi|refleksi|remedial|ribuan|ratusan/i;
  for (const a of M.adegan) cek(!BOCOR.test(teksAdegan(a)), `materi ${a.id} tidak membocorkan sub-bab lain`);
  for (const a of U.adegan) cek(!BOCOR.test(teksAdegan(a)), `metode luar ${a.id} tidak membocorkan sub-bab lain`);
  // Nama metode: tiga lama sama dengan naskah bab; nama baru tidak bentrok dengan naskah, judul, atau lab bab 1.
  const modul = new URL("../src/components/modul/", import.meta.url);
  const baca = (n) => readFileSync(new URL(n, modul), "utf8");
  const naskah = baca("naskah-k4b1.ts");
  const awalH = naskah.indexOf("export const SUB_H41");
  const naskahH = naskah.slice(awalH, naskah.indexOf("export const SUB_I41"));
  cek(/Fair Share/.test(naskahH) && /Measurement Division/.test(naskahH) && /Inverse of Multiply/.test(naskahH), "tiga nama metode lama sama dengan nama di naskah sub-bab H");
  cek(/Bagi Rata/.test(naskahH) && /Bagi Ukur/.test(naskahH) && /Kebalikan Kali/.test(naskahH), "tiga nama Indonesia metode lama sama dengan naskah sub-bab H");
  const berkasLab = readdirSync(modul).filter((f) => /^lab-.*k4b1.*\.ts$/.test(f));
  cek(berkasLab.length >= 9, `berkas lab bab 1 ditemukan (${berkasLab.length})`);
  for (const n of ["naskah-k4b1.ts", "data-k4b1.ts", ...berkasLab]) cek(!/Repeated Subtraction|Pengurangan Berulang/.test(baca(n)), `nama metode baru Repeated Subtraction / Pengurangan Berulang tidak bentrok dengan ${n}`);
  for (const ad of M.adegan) cek(!/Repeated Subtraction|Pengurangan Berulang/.test(ad.judul), `judul ${ad.id}: nama metode baru hanya di video metode luar`);
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

/* ------------------------------ Persamaan di gambar dihitung ulang ------------------------------ */
const hitungEks = (s) => {
  // Perkalian dan pembagian (bulat ke bawah) lebih dulu, lalu tambah dan kurang, dari kiri ke kanan.
  const tok = s.replace(/−/g, "-").match(/\d+|[+\-×:]/g);
  const suku = [];
  let op = "+";
  let cur = Number(tok[0]);
  for (let i = 1; i < tok.length; i += 2) {
    const nilai = Number(tok[i + 1]);
    if (tok[i] === "×") cur *= nilai;
    else if (tok[i] === ":") cur = Math.floor(cur / nilai);
    else {
      suku.push([op, cur]);
      op = tok[i];
      cur = nilai;
    }
  }
  suku.push([op, cur]);
  return suku.reduce((t, [o, v]) => (o === "+" ? t + v : t - v), 0);
};
const POLA_EKS = /(\d+(?:(?:\s*[+×−-]\s*|\s+:\s+)\d+)+)\s*=\s*(\d+)(?:,\s*sisa\s*(\d+))?/g;
for (const v of [M, U]) {
  for (const a of v.adegan) {
    const sudah = new Set();
    a.ketukan.forEach((kt, i) => {
      for (let p = 0; p < L.kataDari(kt.suara).length; p += 1)
        for (const o of L.keadaanStory(a, i, p)) {
          if (o.t !== "teks" || !o.isi || sudah.has(`${o.id}:${o.isi}`)) continue;
          sudah.add(`${o.id}:${o.isi}`);
          for (const m of o.isi.matchAll(POLA_EKS)) {
            stat.persamaan += 1;
            cek(hitungEks(m[1]) === Number(m[2]), `${v.id}/${a.id}: persamaan "${m[0]}" dihitung ulang (${hitungEks(m[1])})`);
            const bagi = m[1].match(/^(\d+)\s*:\s*(\d+)$/);
            if (bagi && m[3] !== undefined) cek(Number(bagi[1]) % Number(bagi[2]) === Number(m[3]), `${v.id}/${a.id}: sisa pada "${m[0]}" benar`);
            if (bagi && m[3] === undefined) cek(Number(bagi[1]) % Number(bagi[2]) === 0, `${v.id}/${a.id}: "${m[0]}" habis dibagi (tanpa sisa)`);
          }
        }
    });
  }
}

/* ------------------------------ Hitungan mandiri kunci buku dan data gambar ------------------------------ */
// Data buku ditulis ulang di sini sebagai pembanding mandiri (Buku Siswa hlm. 47; Panduan Guru hlm. 67-69).
const LATIHAN = [[24, 2, 12], [96, 3, 32], [96, 6, 16], [72, 3, 24], [75, 5, 15]];
const CERITA = [[36, 2, 18], [64, 4, 16], [81, 3, 27], [96, 8, 12], [55, 5, 11]];
sama(G.LATIHAN.map((b) => [...b]), LATIHAN.map(([n, p]) => [n, p]), "Ayo Berlatih nomor 1: soal a sampai e");
sama([...G.KUNCI_LATIHAN], LATIHAN.map((b) => b[2]), "kunci nomor 1 (Panduan Guru hlm. 67): 12, 32, 16, 24, 15");
sama(G.CERITA.map((b) => [...b]), CERITA, "Ayo Berlatih nomor 2: soal dan kunci a sampai e (Panduan Guru hlm. 67-69)");
for (const [n, p, h] of [...LATIHAN, ...CERITA]) {
  cek(Math.floor(n / p) === h && n % p === 0, `hitungan mandiri ${n} : ${p} = ${h} tanpa sisa`);
  cek(h * p === n, `kali balik ${h} x ${p} = ${n}`);
}
stat.data += LATIHAN.length + CERITA.length;
sama([G.PERMEN, [...G.WADAH]], [48, [2, 3, 4, 6, 8]], "Aktivitas 5: 48 permen, wadah 2, 3, 4, 6, 8");
sama(G.WADAH.map((w) => [w, 48 / w, 48 % w]), [[2, 24, 0], [3, 16, 0], [4, 12, 0], [6, 8, 0], [8, 6, 0]], "hitungan mandiri isi tabel Aktivitas 5 (sisa 0 semua)");
sama([...G.ANAK], ["Andi", "Azizah", "Drio", "Candra"], "empat anak Pak Wicak");
{
  /** Pembagian bersusun pada gambar: semua angka dihitung ulang dari angka yang dibagi dan pembagi. Keadaan akhir semua ketukan adegan digabung. */
  const gabung = (a) => {
    const peta = new Map();
    a.ketukan.forEach((_, i) => akhirAdegan(a, i).forEach((o) => peta.set(o.id, o)));
    return peta;
  };
  const dipakai = [];
  for (const a of [...M.adegan, ...U.adegan]) {
    const peta = gabung(a);
    const awalan = [...peta.keys()].filter((id) => /-p$/.test(id) && peta.has(id.replace(/-p$/, "-n1")) && peta.has(id.replace(/-p$/, "-v"))).map((id) => id.replace(/-p$/, ""));
    for (const pre of awalan) {
      const w = (s) => peta.get(`${pre}-${s}`)?.isi;
      const p = Number(w("p"));
      const a1 = Number(w("n1"));
      const b1 = Number(w("n2"));
      const n = a1 * 10 + b1;
      const q1 = Math.floor(a1 / p);
      const r1 = a1 - q1 * p;
      const q2 = Math.floor((r1 * 10 + b1) / p);
      const kali2 = q2 * p;
      const r2 = r1 * 10 + b1 - kali2;
      dipakai.push(`${a.id}:${pre}`);
      stat.data += 1;
      if (w("q1") !== undefined) cek(Number(w("q1")) === q1, `${a.id}/${pre}: hasil bagi puluhan ${n} : ${p} = ${q1}`);
      if (w("m1") !== undefined) cek(Number(w("m1")) === q1 * p, `${a.id}/${pre}: hasil kali puluhan ${q1} x ${p}`);
      if (w("r1") !== undefined) cek(Number(w("r1")) === r1, `${a.id}/${pre}: sisa puluhan ${a1} - ${q1 * p}`);
      if (w("d") !== undefined) cek(Number(w("d")) === b1, `${a.id}/${pre}: satuan yang diturunkan ${b1}`);
      if (w("q2") !== undefined) cek(Number(w("q2")) === q2, `${a.id}/${pre}: hasil bagi satuan ${r1 * 10 + b1} : ${p} = ${q2}`);
      if (w("m2b") !== undefined) cek(Number(`${w("m2a") ?? ""}${w("m2b")}`) === kali2, `${a.id}/${pre}: hasil kali satuan ${q2} x ${p} = ${kali2}`);
      if (w("r2") !== undefined) cek(Number(w("r2")) === r2, `${a.id}/${pre}: sisa akhir ${n} : ${p} = ${q1 * 10 + q2} sisa ${r2}`);
      if (w("q2") !== undefined && w("r2") !== undefined) cek((q1 * 10 + q2) * p + r2 === n, `${a.id}/${pre}: hasil x pembagi + sisa = ${n}`);
      cek(a1 >= p && n >= 10 && n <= 99, `${a.id}/${pre}: syarat tata letak (puluhan >= pembagi)`);
    }
  }
  const harapan = ["susun-istilah:es", "susun-langkah:bl", "berlatih-satu:ga", "berlatih-satu:gb", "berlatih-satu:gc", "berlatih-satu:gd", "berlatih-satu:ge", "cerita-bagi:cb", "cerita-kotak:ck", "cerita-kotak:cd", "miskonsepsi:mk"];
  sama(dipakai.sort(), harapan.sort(), "pembagian bersusun yang tergambar (11 gambar)");
  const hasilSusun = (id, pre) => {
    const peta = gabung(adegan(M, id));
    return Number(peta.get(`${pre}-q1`).isi) * 10 + Number(peta.get(`${pre}-q2`).isi);
  };
  sama([hasilSusun("susun-langkah", "bl"), hasilSusun("berlatih-satu", "ga"), hasilSusun("berlatih-satu", "gb"), hasilSusun("berlatih-satu", "gc"), hasilSusun("berlatih-satu", "gd"), hasilSusun("berlatih-satu", "ge")], [12, 12, 32, 16, 24, 15], "hasil bersusun 48:4, a, b, c, d, e sama dengan kunci");
  sama([hasilSusun("cerita-bagi", "cb"), hasilSusun("cerita-kotak", "ck"), hasilSusun("cerita-kotak", "cd")], [16, 27, 12], "hasil bersusun soal cerita b, c, d sama dengan kunci");
  sama(hasilSusun("miskonsepsi", "mk"), 12, "contoh tambahan 75 : 6: hasil bagi 12");
}
{
  // Banyak benda (butir) di gambar.
  sama(hitungBenda(T(M, "pembuka-h", 0), "pm"), 48, "pembuka: 48 permen tergambar");
  sama(nilaiId(T(M, "pembuka-h", 0), "kt"), "48", "pembuka: angka 48 di kaleng");
  cek(hitungBenda(T(M, "pemantik", 1), "kl") === 10 && hitungBenda(T(M, "pemantik", 2), "kl") === 10, "pemantik: 10 kelereng");
  sama([0, 1, 2, 3, 4].filter((i) => objAda(T(M, "pemantik", 2), `kp${i}`)).length, 5, "pemantik: lima orang");
  sama([1, 2, 3].filter((i) => objAda(T(M, "pemantik", 1), `kp${i}`)).length, 3, "pemantik: tiga orang");
  const ac = T(M, "aktivitas-lima", 1);
  sama([0, 1, 2].map((i) => hitungBenda(ac, `w${i}`)), [16, 16, 16], "Aktivitas 5: tiga wadah masing-masing 16 permen");
  sama(16 * 3, 48, "3 x 16 = 48");
  sama([0, 1, 2].map((i) => nilaiId(ac, `wn${i}`)), ["16", "16", "16"], "Aktivitas 5: label 16 tiap wadah");
  const tw = T(M, "tabel-wadah", 2);
  G.WADAH.forEach((w, i) => {
    sama([nilaiId(tw, `r${i}-t0`), nilaiId(tw, `r${i}-t1`), nilaiId(tw, `r${i}-t2`), nilaiId(tw, `r${i}-t3`)], ["48", String(w), String(48 / w), "0"], `tabel baris ${i + 1}: 48, ${w}, ${48 / w}, sisa 0`);
    cek(Number(nilaiId(tw, `r${i}-t1`)) * Number(nilaiId(tw, `r${i}-t2`)) === 48, `tabel baris ${i + 1}: wadah x isi = 48`);
  });
  const hd = T(M, "tabel-wadah", 3);
  sama([0, 1, 2, 3, 4].map((i) => nilaiId(hd, `hd${i}-t0`)), ["2", "3", "4", "6", "8"], "kesimpulan Panduan Guru: habis dibagi 2, 3, 4, 6, 8");
  cek([2, 3, 4, 6, 8].every((n) => 48 % n === 0), "48 habis dibagi 2, 3, 4, 6, 8");
  const pt = T(M, "tabel-wadah", 4);
  const semuaPembagi = Array.from({ length: 48 }, (_, i) => i + 1).filter((n) => 48 % n === 0);
  sama(semuaPembagi, [1, 2, 3, 4, 6, 8, 12, 16, 24, 48], "semua pembagi 48: sepuluh");
  const dariBuku = nilaiId(pt, "pt1-t0").match(/\d+/g).map(Number);
  const tambahan = nilaiId(pt, "pt2-t0").match(/\d+/g).map(Number);
  sama([...dariBuku, ...tambahan].sort((a, b) => a - b), semuaPembagi, "temuan: pembagi buku dan tambahan video = semua pembagi 48");
  sama(nilaiId(pt, "pt3-t0"), "10 pembagi, buku menyebut 5", "temuan: buku menyebut 5 dari 10 pembagi");
  // Soal cerita: orang dan benda.
  const cb = T(M, "cerita-bagi", 1);
  sama([0, 1, 2].filter((i) => objAda(cb, `tg${i}`)).length + (objAda(cb, "pb") ? 1 : 0), 4, "soal b: 3 tetangga + Pak Bejo = 4 pihak");
  sama(nilaiId(T(M, "cerita-bagi", 3), "gq"), "55 : 5 = 11", "soal e: 55 : 5 = 11");
  sama([0, 1, 2, 3, 4].map((i) => nilaiId(T(M, "cerita-bagi", 3), `ge${i}-t1`)), ["11", "11", "11", "11", "11"], "soal e: lima orang masing-masing 11");
  sama(hitungBenda(T(M, "cerita-kotak", 0), "ku"), 81, "soal c: 81 kue tergambar");
  const rs = T(M, "cerita-bagi", 4);
  sama([0, 1, 2].map((i) => nilaiId(rs, `sr${i}-t2`)), ["18", "16", "11"], "ringkas soal cerita a, b, e: 18, 16, 11");
  const kr = T(M, "berlatih-satu", 5);
  LATIHAN.forEach(([n, p, h], i) => sama([nilaiId(kr, `kr${i}-t1`), nilaiId(kr, `kr${i}-t2`), nilaiId(kr, `kr${i}-t3`)], [`${n} : ${p}`, String(h), `${h} × ${p} = ${n}`], `tabel kunci nomor 1 bagian ${"abcde"[i]}`));
  // Metode luar.
  sama(hitungBenda(T(U, "luar-bagi-rata", 0), "kp"), 10, "luar Bagi Rata: 10 kelereng");
  sama([0, 1, 2, 3, 4].map((i) => hitungBenda(T(U, "luar-bagi-rata", 1), `d${i}`)), [1, 1, 1, 1, 1], "luar Bagi Rata: putaran satu, tiap wadah 1");
  sama([0, 1, 2, 3, 4].map((i) => hitungBenda(T(U, "luar-bagi-rata", 2), `d${i}`)), [2, 2, 2, 2, 2], "luar Bagi Rata: putaran dua, tiap wadah 2, jumlah 10");
  sama([0, 1, 2, 3].map((i) => hitungBenda(T(U, "luar-bagi-rata-terapan", 0), `a${i}`)), [1, 1, 1, 1], "luar Bagi Rata permen: putaran satu 4 permen");
  sama([0, 1, 2, 3].map((i) => hitungBenda(T(U, "luar-bagi-rata-terapan", 1), `a${i}`)), [12, 12, 12, 12], "luar Bagi Rata permen: tiap anak 12, jumlah 48");
  sama(nilaiId(T(U, "luar-bagi-rata-terapan", 2), "qa-t0"), "36 : 2 = 18", "luar Bagi Rata soal a");
  sama([nilaiId(T(U, "luar-bagi-rata-terapan", 2), "ta-t1"), nilaiId(T(U, "luar-bagi-rata-terapan", 2), "ti-t1")], ["18", "18"], "luar Bagi Rata soal a: Tono dan Tini 18");
  sama(nilaiId(T(U, "luar-bagi-rata-terapan", 3), "qf"), "55 : 5 = 11", "luar Bagi Rata soal e");
  // Bagi Ukur: kelereng dalam kantong.
  const isiKotak = (objs, kid, pre) => {
    const kt = objAda(objs, kid);
    return objs.filter((o) => new RegExp(`^${pre}-o\\d+$`).test(o.id) && o.x - o.r >= kt.x && o.x + o.r <= kt.x + kt.w && o.y - o.r >= kt.y && o.y + o.r <= kt.y + kt.h).length;
  };
  const bu1 = T(U, "luar-bagi-ukur", 1);
  sama([isiKotak(bu1, "kg1", "kl"), isiKotak(bu1, "kg2", "kl")], [5, 5], "luar Bagi Ukur: dua kantong masing-masing 5 kelereng");
  const bu2 = T(U, "luar-bagi-ukur", 2);
  sama([isiKotak(bu2, "ku1", "ku"), isiKotak(bu2, "ku2", "ku")], [5, 5], "luar Bagi Ukur: tiap kantong 5, dua kantong");
  const tiga = [1, 2, 3].map((g) => isiKotak(bu2, `kv${g}`, "kv"));
  sama(tiga, [3, 3, 3], "luar Bagi Ukur: tiap kantong 3, tiga kantong");
  sama(hitungBenda(bu2, "kv") - tiga.reduce((a, b) => a + b, 0), 1, "luar Bagi Ukur: sisa satu kelereng di luar kantong");
  sama(10 - 3 * 3, 1, "10 - 9 = 1 sisa");
  const sp = T(U, "luar-bagi-ukur-terapan", 1);
  const petak = (objs, pre) => objs.filter((o) => new RegExp(`^${pre}-c\\d+$`).test(o.id));
  sama([petak(sp, "sp").length, petak(sp, "sp").reduce((s, o) => s + o.w, 0), 81 / 3], [27, 270, 27], "luar Bagi Ukur soal c: 27 petak sama besar, 81 : 3 = 27");
  const tp = T(U, "luar-bagi-ukur-terapan", 3);
  sama([petak(tp, "tp").length, petak(tp, "tp").reduce((s, o) => s + o.w, 0), 96 / 8], [12, 270, 12], "luar Bagi Ukur soal d: 12 petak sama besar, 96 : 8 = 12");
  cek(petak(sp, "sp").every((o) => o.w === petak(sp, "sp")[0].w) && petak(tp, "tp").every((o) => o.w === petak(tp, "tp")[0].w), "petak tiap batang sama lebar");
  // Kebalikan Kali.
  const tr = T(U, "luar-kali-balik", 1);
  sama([nilaiId(tr, "t4"), nilaiId(tr, "t12"), nilaiId(tr, "t48")], ["4", "12", "48"], "luar Kebalikan Kali: keluarga fakta 4, 12, 48");
  sama(4 * 12, 48, "4 x 12 = 48");
  const fk = T(U, "luar-kali-balik", 2);
  sama([1, 2, 3, 4].map((i) => nilaiId(fk, `f${i}-t0`)), ["4 × 12 = 48", "12 × 4 = 48", "48 : 4 = 12", "48 : 12 = 4"], "luar Kebalikan Kali: empat kalimat keluarga fakta");
  const kt = T(U, "luar-kali-balik-terapan", 3);
  const BARIS_CEK = [[96, 6], [72, 3], [75, 5], [64, 4]];
  BARIS_CEK.forEach(([n, p], i) => {
    sama([nilaiId(kt, `ur${i}-t1`), nilaiId(kt, `ur${i}-t2`), nilaiId(kt, `ur${i}-t3`)], [`${n} : ${p}`, String(n / p), `${n / p} × ${p} = ${n}`], `luar Kebalikan Kali baris ${i + 1}`);
  });
  sama(BARIS_CEK.map(([n, p]) => n / p), [16, 24, 15, 16], "luar Kebalikan Kali: hasil 16, 24, 15, 16 (c, d, e, cerita b)");
  sama(BARIS_CEK.slice(0, 3).map(([n, p]) => `${n}:${p}`), LATIHAN.slice(2).map(([n, p]) => `${n}:${p}`), "luar Kebalikan Kali: soal c, d, e sama dengan nomor 1");
  // Pengurangan Berulang: rantai kotak dan label.
  const rantaiNilai = (objs, pre) => {
    const v = [];
    for (let i = 0; objAda(objs, `${pre}-k${i}-t0`); i += 1) v.push(Number(nilaiId(objs, `${pre}-k${i}-t0`)));
    const lab = [];
    for (let i = 0; objAda(objs, `${pre}-l${i}`); i += 1) lab.push(Number(nilaiId(objs, `${pre}-l${i}`).replace(/[^\d]/g, "")));
    return { v, lab };
  };
  const kuranginOk = ({ v, lab }) => lab.length === v.length - 1 && lab.every((l, i) => v[i] - l === v[i + 1]);
  const rc = rantaiNilai(T(U, "luar-kurang-ulang", 1), "rc");
  cek(kuranginOk(rc) && rc.v.join() === "10,5,0", "luar Pengurangan Berulang: 10 - 5 - 5 = 0 (dua kali)");
  const rs2 = rantaiNilai(T(U, "luar-kurang-ulang", 3), "rs");
  cek(kuranginOk(rs2) && rs2.v.join() === "10,7,4,1" && 10 % 3 === 1 && Math.floor(10 / 3) === 3, "luar Pengurangan Berulang: 10 - 3 - 3 - 3 = 1 (tiga kali, sisa satu)");
  const rw = rantaiNilai(T(U, "luar-kurang-ulang-terapan", 1), "rw");
  cek(kuranginOk(rw) && rw.v.join() === "48,8,0" && 10 * 4 === 40 && 2 * 4 === 8 && 10 + 2 === 48 / 4, "luar Pengurangan Berulang: 48 - 40 - 8 = 0; 10 kali dan 2 kali kurangi 4 = 12 kali");
  const rd = rantaiNilai(T(U, "luar-kurang-ulang-terapan", 2), "rd");
  cek(kuranginOk(rd) && rd.v.join() === "96,16,0" && 10 * 8 === 80 && 2 * 8 === 16 && 10 + 2 === 96 / 8, "luar Pengurangan Berulang: 96 - 80 - 16 = 0; 10 kali dan 2 kali kurangi 8 = 12 kali");
  const rk = rantaiNilai(T(U, "luar-kurang-ulang-terapan", 3), "rk");
  cek(kuranginOk(rk) && rk.v.join() === "81,51,21,0" && rk.lab.join() === "30,30,21" && 10 * 3 === 30 && 7 * 3 === 21 && 10 + 10 + 7 === 81 / 3, "luar Pengurangan Berulang: 81 - 30 - 30 - 21 = 0; 10 + 10 + 7 = 27 kali kurangi 3");
  const xr = T(U, "luar-ringkas", 0);
  sama([0, 1, 2, 3].map((i) => nilaiId(xr, `xr${i}-t2`)), ["48 : 4 = 12", "81 : 3 = 27", "12 × 4 = 48", "10 : 5 = 2"], "luar ringkasan: contoh buku tiap metode");
  const xs = T(U, "luar-ringkas", 1);
  sama(nilaiId(xs, "xs2-t1"), "12 × 8 = 96; periksa dengan kali", "luar ringkasan: soal d lewat Kebalikan Kali");
  sama(nilaiId(xs, "xs3-t1"), "96 − 80 − 16 = 0; 10 + 2 = 12 kali", "luar ringkasan: soal d lewat Pengurangan Berulang");
  stat.data += 40;
}

/* ------------------------------ Kutipan buku (bila PDF tersedia) ------------------------------ */
{
  const bs = new URL("../bahan-sd/Matematika-BS-KLS-IV.pdf", import.meta.url);
  const bg = new URL("../bahan-sd/Matematika-BG-KLS-IV.pdf", import.meta.url);
  const jalur = (u) => u.pathname.replace(/^\/([A-Za-z]:)/, "$1");
  const KODE_PY = "import sys, pymupdf\nsys.stdout.reconfigure(encoding='utf-8', errors='replace')\nd = pymupdf.open(sys.argv[1])\nsys.stdout.write('\\n'.join(d[i - 1].get_text() for i in range(int(sys.argv[2]), int(sys.argv[3]) + 1)))";
  const ambil = (berkas, dari, sampai) => {
    const r = spawnSync("pdftotext", ["-enc", "UTF-8", "-f", String(dari), "-l", String(sampai), "-raw", jalur(berkas), "-"], { encoding: "utf8", maxBuffer: 1 << 26 });
    if (r.status === 0) return r.stdout;
    // Cadangan bila pdftotext tidak ada: PyMuPDF (python -I).
    const p = spawnSync("python", ["-I", "-c", KODE_PY, jalur(berkas), String(dari), String(sampai)], { encoding: "utf8", maxBuffer: 1 << 26 });
    return p.status === 0 ? p.stdout : null;
  };
  // Kelas IV: Buku Siswa hlm. N = PDF N+12 (hlm. 44-47 = PDF 56-59; subbab I mulai PDF 60); Panduan Guru hlm. N = PDF N+12 (hlm. 65-69 = PDF 77-81; subbab H mulai di tengah PDF 77, subbab I mulai PDF 82).
  const bagian = existsSync(bs) && existsSync(bg) ? [ambil(bs, 56, 59), ambil(bg, 77, 81), ambil(bs, 60, 60), ambil(bg, 82, 82)] : [null];
  if (bagian.some((b) => b === null)) console.log("PDF atau pembaca PDF tidak tersedia: pemeriksaan kutipan buku dilewati");
  else {
    const bersih = (t) => t.toLowerCase().replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim();
    const JUDUL_H = "h. pembagian bilangan cacah sampai 100";
    const siswa = bersih(bagian[0]);
    const guruPenuh = bersih(bagian[1]);
    const awalBg = guruPenuh.indexOf(JUDUL_H);
    cek(siswa.includes(JUDUL_H), "Buku Siswa PDF 56 memuat judul subbab H");
    cek(awalBg > 0, "Panduan Guru PDF 77 memuat judul subbab H (di tengah halaman)");
    const guru = guruPenuh.slice(awalBg);
    cek(/^i\. /.test(bersih(bagian[2]).replace(/^[\s\d=÷]+/, "")) || bersih(bagian[2]).includes("i. "), "Buku Siswa PDF 60 sudah subbab I (H selesai di PDF 59)");
    cek(bersih(bagian[3]).includes("i. ") && !bersih(bagian[3]).includes(JUDUL_H), "Panduan Guru PDF 82 sudah subbab I");
    const buku = `${siswa}\n${guru}`;
    // Nomor halaman cetak sama dengan PDF dikurangi 12.
    const halaman = (berkas, pdf, cetak) => new RegExp(`(^|\\n)\\s*${cetak}(\\s|$)`).test(ambil(berkas, pdf, pdf));
    for (let pdf = 56; pdf <= 59; pdf += 1) cek(halaman(bs, pdf, pdf - 12), `Buku Siswa PDF ${pdf} bernomor halaman ${pdf - 12}`);
    for (let pdf = 77; pdf <= 81; pdf += 1) cek(halaman(bg, pdf, pdf - 12), `Panduan Guru PDF ${pdf} bernomor halaman ${pdf - 12}`);
    let n = 0;
    for (const a of M.adegan) {
      for (const kt of a.kutipan ?? []) {
        n += 1;
        cek(buku.includes(bersih(kt)), `kutipan buku ${a.id}: "${kt}" ada di teks PDF`);
      }
    }
    stat.kutipan = n;
    cek(n >= 70, `jumlah kutipan buku yang diperiksa (${n})`);
    cek(M.adegan.every((a) => (a.kutipan ?? []).length >= 3), "tiap adegan materi memuat paling sedikit 3 kutipan buku");
    // Kunci Panduan Guru nomor 1 dan 2 (dicocokkan dengan hitungan mandiri di atas).
    for (const kunci of ["a. 24 : 2 = 12", "b. 96 : 3 = 32", "c. 96 : 6 = 16", "d. 72 : 3 = 24", "e. 75 : 5 = 15", "jawab: 36 : 2 = 18", "jawab: 64 : 4 = 16", "jawab: 81 : 3 = 27", "jawab: 96 : 8 = 12", "jawab: 55 : 5 = 11"]) cek(guru.includes(kunci), `Panduan Guru memuat kunci "${kunci}"`);
    // Soal Buku Siswa nomor 1 dan 2.
    for (const soal of ["a. 24 : 2 = ….", "b. 96 : 3 = ….", "c. 96 : 6 = ….", "d. 72 : 3 = ….", "e. 75 : 5 = ….", "berisi 36 butir permen", "64 buah alpukat", "81 kue", "setiap kotak kue berisi 3 kue", "96 butir telur", "memuat 8 telur", "55 gantungan"]) cek(siswa.includes(soal.toLowerCase()), `Buku Siswa memuat soal "${soal}"`);
    // Keganjilan buku yang dicatat di video: tabel Aktivitas 5 tanpa kunci; tidak ada contoh sisa di Buku Siswa.
    cek(/banyak wadah.*48 2 \.\.\. \.\.\. 48 3 \.\.\. \.\.\. 48 4 \.\.\. \.\.\. 48 6 \.\.\. \.\.\. 48 8 \.\.\. \.\.\./.test(siswa), "Buku Siswa hlm. 45: tabel Aktivitas 5 hanya berisi titik-titik (tanpa kunci), wadah 2, 3, 4, 6, 8");
    cek(!/kunci jawaban|jawab:/.test(siswa), "Buku Siswa hlm. 44-47: tanpa kunci jawaban (hitungan mandiri)");
    cek(!/sisa [1-9]/.test(siswa), "Buku Siswa hlm. 44-47: tidak ada contoh pembagian dengan sisa tidak nol");
    cek(/pengurangan berulang dengan bilangan yang sama sampai habis/.test(guru), "Panduan Guru hlm. 65: apersepsi menyebut pembagian sebagai pengurangan berulang");
    // Contoh bersusun buku hanya 48 : 4 (tanpa sisa puluhan): tidak ada langkah turunkan sisa puluhan.
    cek((siswa.match(/turunkan/g) ?? []).length === 1, "Buku Siswa hlm. 46: hanya satu langkah turunkan (48 : 4 tanpa sisa puluhan)");
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k4b1h-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|k4b1h-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k4b1h sendiri (${impor.join(", ")})`);
  }
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k4b1h.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|SUB_H41|video-k4b2-umum|video-k4b1-umum|naskah-k4b1/.test(pembungkus) && /VIDEO_MATERI_K4B1H/.test(pembungkus) && /VIDEO_LUAR_K4B1H/.test(pembungkus) && /export function VideoK4B1H/.test(pembungkus) && /daftar-video-cerita/.test(pembungkus), "video-k4b1h.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k4b1h.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k4b1h.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k4b1h.mjs: akhir baris LF");
}

for (const v of [M, U]) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${((n * 0.5) / 60).toFixed(1)} menit suara)`);
}
console.log(`Pemeriksaan: ${stat.kutipan} kutipan terhadap teks PDF, ${stat.terbilang} bilangan berkata, ${stat.persamaan} persamaan, ${stat.teksPasang} pasangan teks, ${stat.data} data hitung ulang`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata (sekitar ${Math.round((totalKata * 0.5) / 60)} menit suara)`);
process.exit(gagal ? 1 : 0);
