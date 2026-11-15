// Uji Story Kelas 3 Bab 1 Sub-Bab A (Bilangan dan Lambang Bilangan): dua video (materi kurikulum dan metode luar) dengan mesin animasi Story.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar (nama metode hanya Indonesia),
// dan HITUNG ULANG dari struktur adegan: bilangan di papan tiga tempat = 100 x ratusan + 10 x puluhan + satuan, banyak balok tiap tempat sama dengan angkanya, nilai tempat = angka x 100, 10, 1,
// kata bilangan (dieja dari angka) sama dengan bilangan, bilangan yang disebut di suara tampak di gambar, penjumlahan nilai tempat, penukaran sepuluh jadi satu, baris kata bilangan,
// jawaban latihan (satu pilihan benar dan disorot), isi tabel susun, dan emoji paling tinggi Emoji 12.
// Jalankan: node --no-warnings scripts/uji-story-k3b1A.mjs
import { readFileSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k3b1A-video.ts");
const U1 = await import("../src/components/modul/story/k3b1A-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K3B1A, V.VIDEO_LUAR_K3B1A];
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
      cek(!/\d/.test(kt.suara), `${nama}#${i + 1}: suara tanpa digit (angka ditulis dengan kata)`);
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
          else {
            // Angka tulisan tangan (kurva): titik-titik pada lintasan harus masuk kanvas.
            const n = bilangan(o.d ?? "");
            const px = n.filter((_, q) => q % 2 === 0).map((q) => x + q);
            const py = n.filter((_, q) => q % 2 === 1).map((q) => y + q);
            cek(px.every((p) => p > -2 && p < 302) && py.every((p) => p > -2 && p < 204), `${nama}#${i + 1}: angka tulisan ${o.id} masuk kanvas`);
          }
        } else if (o.t === "garis" || o.t === "panah") cek(x > -2 && x < 302 && y > -2 && y < 204 && x + (o.x2 ?? 0) > -2 && x + (o.x2 ?? 0) < 302 && y + (o.y2 ?? 0) > -2 && y + (o.y2 ?? 0) < 204, `${nama}#${i + 1}: garis ${o.id} masuk kanvas`);
      }
      {
        const teksAda = akhir.filter((o) => o.t === "teks" && (o.op ?? 1) > 0 && o.isi && !/^[\u{1F000}-\u{1FFFF}]|^[✂✅❌]$/u.test(o.isi));
        for (let p = 0; p < teksAda.length; p += 1) {
          for (let q = p + 1; q < teksAda.length; q += 1) {
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
const M_VIDEO = V.VIDEO_MATERI_K3B1A;
const U = V.VIDEO_LUAR_K3B1A;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /Balok Dienes|Tabel Nilai Tempat|Nama Bilangan|metode luar|metode dari luar/i;
const NAMA_INGGRIS = /Dienes Blocks?|Place-Value Chart|Number Names?|Place Value|Montessori Cards?|Expanded Form|Compare Placewise|Number Line|Ordering|Standard Addition|Number Bond|Counting On|Singapore Math|Van de Walle/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar ");
  for (const m of U1.NAMA_METODE_ID) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE_ID, ["Balok Dienes", "Tabel Nilai Tempat", "Nama Bilangan"], "nama Indonesia metode luar (namaId data)");
  cek(!NAMA_INGGRIS.test(materi) && !NAMA_INGGRIS.test(luar), "nama metode hanya bahasa Indonesia (tanpa Dienes Blocks, Place-Value Chart, Number Names)");
  const TERLARANG = /buku|panduan guru|hlm|halaman|kunci|rubrik|salah ketik|salah cetak|tambahan video|contoh video|temuan|pertemuan|loker|ibu guru|singapura/i;
  for (const v of [M_VIDEO, U]) {
    cek(!TERLARANG.test(`${v.judul} ${v.subjudul}`), `${v.id}: judul dan subjudul video tanpa kata terlarang`);
    cek(!/nomor|no\./i.test(v.subjudul) && v.subjudul.length <= 40, `${v.id}: subjudul pendek tanpa nomor halaman`);
    for (const a of v.adegan) {
      const semua = [a.judul, a.sumber];
      a.ketukan.forEach((kt, i) => {
        semua.push(kt.suara);
        for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) semua.push(...L.teksTerlihat(L.keadaanStory(a, i, p)));
      });
      const kena = semua.filter((t) => TERLARANG.test(t) || /soal nomor|Latihan 3\.[1-4]|nomor [1-9]|catatan video|menurut buku/i.test(t));
      cek(kena.length === 0, `${v.id}/${a.id}: tanpa penyebutan buku atau catatan sumber (${kena.slice(0, 2).join(" | ")})`);
      cek(!/Uji Kompetensi|Pengayaan|Ayo Berlatih|Ayo Berdiskusi|Ayo Berefleksi|Ayo Mengingat|Ayo Berkomunikasi|Ayo Berpikir|Ayo Berkarya|Ayo Bermain|Ayo Mencoba|soal \d|Soal \d|Eksplorasi|Refleksi/.test(semua.join(" | ")), `${v.id}/${a.id}: latihan disajikan sebagai Latihan, tanpa istilah buku`);
      // Tokoh hanya enam tokoh tetap (Malosi, Kira, Upe, Wei, Halim, Igil): tanpa nama lain dari data sumber.
      cek(!/\b(Tika|Lili|Paman|Ibu|Ayah|Bapak|Budi|Ani|Doni|Sinta|Dewi|Rudi|Nina|Andi|Siti|Bu Guru|Pak Guru|Pak|Ahmad|Alfa|Galih|Alen|Meutia|Bandi)\b/.test(semua.join(" | ")), `${v.id}/${a.id}: hanya enam tokoh tetap`);
      cek(semua.every((t) => ![...t].some((c) => c.codePointAt(0) > 0x1fa95)), `${v.id}/${a.id}: emoji paling tinggi Emoji 12`);
    }
  }
  cek(M_VIDEO.subjudul === "Materi kurikulum" && U.subjudul === "Tiga metode luar", "subjudul video: Materi kurikulum dan Tiga metode luar");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46), "video materi: label sumber berbentuk Materi: ... dan pendek");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "video metode luar: label sumber metode luar atau ringkasan, pendek");
  cek(M_VIDEO.id === "k3b1A-materi" && U.id === "k3b1A-luar", "id video k3b1A-materi dan k3b1A-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,cerita-tongkat,kotak-satuan,puluhan-ratusan,papan-tiga,kata-ratusan,kata-puluhan,baca-160,baca-671,baca-759,nol-703,nol-900,tulis-354,tulis-572,nol-penjaga,latihan-satu,latihan-dua,latihan-tiga,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-balok,luar-balok-terapan,luar-tabel,luar-tabel-terapan,luar-nama,luar-nama-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 3 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 3 lalu penutup");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  cek(U.adegan.length - 3 === 6, "video metode luar: konsep dan penerapan untuk tiga metode (6 adegan di antara pembuka dan ringkasan)");
  for (const kata of ["Latihan", "Igil", "Halim", "Kira", "Wei", "Upe", "satuan", "puluhan", "ratusan", "balok", "lempeng", "batang", "kotak kecil", "papan", "seratus", "nol", "tidak dibaca", "sepuluh satuan", "sepuluh puluhan", "tujuh ratus tiga", "sembilan ratus", "tiga ratus lima puluh empat", "lima ratus tujuh puluh dua", "empat ratus lima", "kata bilangan", "lambang"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Batas bab: bilangan paling banyak tiga angka, tanpa rumus, perkalian, pembagian, dan satuan baku selain meter dan sentimeter.
  const BOCOR = /kilogram|gram|kg|dikali|perkalian|pembagian|rumus|ribu|×|÷|−|liter/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa satuan baku lain, rumus, perkalian, ribuan`);
    for (const a of v.adegan) for (const i of a.ketukan.keys()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 999, `${v.id}/${a.id}#${i + 1}: angka di gambar paling besar sembilan ratus sembilan puluh sembilan ("${t}")`);
  }
  const ketMateri = M_VIDEO.adegan.reduce((t, ad) => t + ad.ketukan.length, 0);
  cek(totalKetukan >= 70 && ketMateri >= 70, `total ketukan cukup dalam (${totalKetukan}; materi ${ketMateri})`);
  const kataMateri = kataVideo(M_VIDEO);
  cek(kataMateri / 120 >= 8 && kataMateri / 120 <= 13, `durasi materi diputar 8 sampai 13 menit (${(kataMateri / 120).toFixed(1)} menit)`);
  cek(kataVideo(U) / 120 >= 3, `durasi video luar paling sedikit 3 menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
}


/* ------------------------------ Papan tiga tempat, balok, dan kata bilangan dihitung ulang dari struktur adegan ------------------------------ */
const G = await import("../src/components/modul/story/k3b1A-gambar.ts");
const stat = { tabel: 0, papan: 0, balok: 0, nilai: 0, kata: 0, frasa: 0, jumlah: 0, tukar: 0, baris: 0, tb: 0, pilihan: 0, jawaban: 0, tukarBalok: 0 };
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const W9 = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
const KATA9 = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
/** Mengeja bilangan 0 sampai 999 dari angkanya (aturan bahasa Indonesia). */
const eja = (n) => {
  if (n === 0) return "nol";
  const r = Math.floor(n / 100);
  const s = n % 100;
  const out = [];
  if (r === 1) out.push("seratus");
  else if (r > 1) out.push(`${KATA9[r]} ratus`);
  if (s === 10) out.push("sepuluh");
  else if (s === 11) out.push("sebelas");
  else if (s > 11 && s < 20) out.push(`${KATA9[s - 10]} belas`);
  else if (s >= 20) {
    out.push(`${KATA9[Math.floor(s / 10)]} puluh`);
    if (s % 10) out.push(KATA9[s % 10]);
  } else if (s > 0) out.push(KATA9[s]);
  return out.join(" ");
};
const NUMTOK = new Set(["seratus", "ratus", "puluh", "belas", "sepuluh", "sebelas", ...Object.keys(W9)]);
const nilaiRun = (t) => {
  let v = 0;
  for (let i = 0; i < t.length; i += 1) {
    const w = t[i];
    if (w === "seratus") v += 100;
    else if (W9[w] && t[i + 1] === "ratus") {
      v += W9[w] * 100;
      i += 1;
    } else if (W9[w] && t[i + 1] === "puluh") {
      v += W9[w] * 10;
      i += 1;
    } else if (W9[w] && t[i + 1] === "belas") {
      v += 10 + W9[w];
      i += 1;
    } else if (w === "sepuluh") v += 10;
    else if (w === "sebelas") v += 11;
    else if (W9[w]) v += W9[w];
  }
  return v;
};
/** Semua frasa bilangan (deretan kata bilangan) dalam satu teks: {teks, nilai}. */
const frasaBilangan = (s) => {
  const out = [];
  for (const seg of s.toLowerCase().split(/[,.?!:;]/)) {
    let run = [];
    const tutup = () => {
      if (run.length) out.push({ teks: run.join(" "), nilai: nilaiRun(run) });
      run = [];
    };
    for (const w of seg.split(/\s+/).filter(Boolean)) {
      if (NUMTOK.has(w)) run.push(w);
      else tutup();
    }
    tutup();
  }
  return out;
};
// Ejaan dan pembaca kata saling cocok untuk seluruh bilangan 1 sampai 999.
for (let n = 1; n <= 999; n += 1) cek(nilaiRun(eja(n).split(" ")) === n, `ejaan ${n}: dibaca kembali sama (${eja(n)})`);
sama([eja(160), eja(671), eja(759), eja(703), eja(900), eja(354), eja(572), eja(405), eja(100), eja(115), eja(613), eja(618)], ["seratus enam puluh", "enam ratus tujuh puluh satu", "tujuh ratus lima puluh sembilan", "tujuh ratus tiga", "sembilan ratus", "tiga ratus lima puluh empat", "lima ratus tujuh puluh dua", "empat ratus lima", "seratus", "seratus lima belas", "enam ratus tiga belas", "enam ratus delapan belas"], "ejaan bilangan contoh");

const NILAI_TEMPAT = [100, 10, 1];
const bacaBlok = (objs) => {
  const c = { s: [], p: [], r: [] };
  for (const o of objs) {
    const m = /^bk-([spr])-(\d+)$/.exec(o.id);
    if (m) c[m[1]].push({ i: Number(m[2]), o });
  }
  for (const v of Object.values(c)) v.sort((p, q) => p.i - q.i);
  return c;
};
const nilaiBlok = (c) => c.s.length + 10 * c.p.length + 100 * c.r.length;
const angkaDari = (objs, awalan) => [0, 1, 2].map((c) => ketemu(objs, `${awalan}${c}`)?.isi);
const hitungAritm = (s) => {
  const m = /^(\d+(?: [+-] \d+)+) = (\d+)$/.exec(s);
  if (!m) return null;
  const t = m[1].split(" ");
  let v = Number(t[0]);
  for (let i = 1; i < t.length; i += 2) v = t[i] === "+" ? v + Number(t[i + 1]) : v - Number(t[i + 1]);
  return { ok: v === Number(m[2]), angka: t.filter((_, i) => i % 2 === 0).map(Number), hasil: Number(m[2]) };
};
const bulat = (n) => n === 0 || /^[1-9]0*$/.test(String(n));
const uraian = (n) => [100, 10, 1].map((p) => (Math.floor(n / p) % 10) * p).filter((x) => x > 0);

/** Bilangan yang tampak di gambar sepanjang adegan (semua ketukan, semua kata). */
const terlihatAdegan = (a) => {
  const s = new Set();
  a.ketukan.forEach((kt, i) => {
    for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) for (const b of bilanganDari(o.isi)) s.add(Number(b));
  });
  return s;
};

for (const v of VIDEO) {
  for (const a of v.adegan) {
    const lihat = terlihatAdegan(a);
    let prev = null;
    a.ketukan.forEach((kt, i) => {
      const objs = akhirAdegan(a, i);
      const nm = `${v.id}/${a.id}#${i + 1}`;
      const t = kt.suara.toLowerCase();
      const blok = bacaBlok(objs);
      const nBlok = nilaiBlok(blok);
      const pvN = ketemu(objs, "pv-n")?.isi;
      const pvD = angkaDari(objs, "pv-d");
      const pvW = angkaDari(objs, "pv-w");
      const adaPapan = !!ketemu(objs, "pv-c0");
      /* 1) Papan tiga tempat: angka, nilai tempat, bilangan, balok, dan kata bilangan saling cocok. */
      if (adaPapan) {
        stat.papan += 1;
        for (let c = 0; c < 3; c += 1) {
          if (pvD[c] !== undefined) cek(/^[0-9]$/.test(pvD[c]), `${nm}: angka tempat ${c} satu digit (${pvD[c]})`);
          if (pvN !== undefined) {
            const dn = String(pvN).padStart(3, "0")[c];
            if (pvD[c] !== undefined) cek(pvD[c] === dn, `${nm}: angka tempat ${c} (${pvD[c]}) sama dengan angka bilangan ${pvN}`);
            if (pvW[c] !== undefined) cek(Number(pvW[c]) === Number(dn) * NILAI_TEMPAT[c], `${nm}: nilai tempat ${c} (${pvW[c]}) = angka ${dn} x ${NILAI_TEMPAT[c]}`);
          } else if (pvD[c] !== undefined && pvW[c] !== undefined) cek(Number(pvW[c]) === Number(pvD[c]) * NILAI_TEMPAT[c], `${nm}: nilai tempat ${c} (${pvW[c]}) = angka ${pvD[c]} x ${NILAI_TEMPAT[c]}`);
        }
        if (pvN !== undefined && pvD.every((d) => d !== undefined)) {
          stat.nilai += 1;
          cek(Number(pvN) === 100 * Number(pvD[0]) + 10 * Number(pvD[1]) + Number(pvD[2]), `${nm}: bilangan ${pvN} = 100 x ${pvD[0]} + 10 x ${pvD[1]} + ${pvD[2]}`);
        }
        // Balok tiap tempat sama dengan angkanya, dan letaknya di badan tempat yang benar.
        const jenisTempat = ["r", "p", "s"];
        for (let c = 0; c < 3; c += 1) {
          const daftar = blok[jenisTempat[c]];
          if (daftar.length) stat.balok += 1;
          cek(daftar.every((b, q) => b.i === q + 1), `${nm}: balok ${jenisTempat[c]} bernomor berurutan`);
          cek(daftar.every((b) => b.o.x >= G.KOLOM_X[c] && b.o.x + b.o.w <= G.KOLOM_X[c] + G.KOLOM_W && b.o.y >= 42 && b.o.y + b.o.h <= 132), `${nm}: balok ${jenisTempat[c]} di badan tempat ${c}`);
          if (pvD[c] !== undefined && blok.s.length + blok.p.length + blok.r.length > 0) cek(daftar.length === Number(pvD[c]), `${nm}: banyak balok tempat ${c} (${daftar.length}) sama dengan angka ${pvD[c]}`);
          if (pvN !== undefined) cek(daftar.length <= Number(String(pvN).padStart(3, "0")[c]), `${nm}: balok tempat ${c} tidak lebih banyak dari angka bilangan ${pvN}`);
        }
        // Kata bilangan dieja dari angka.
        const pk = ketemu(objs, "pv-k-t0")?.isi;
        if (pk !== undefined && pvN !== undefined) {
          stat.kata += 1;
          cek(pk === eja(Number(pvN)), `${nm}: kata bilangan "${pk}" sama dengan ejaan ${pvN} ("${eja(Number(pvN))}")`);
          cek(nilaiRun(pk.split(" ")) === Number(pvN), `${nm}: kata bilangan "${pk}" dibaca kembali ${pvN}`);
        }
        const pu = ketemu(objs, "pv-u-t0")?.isi;
        if (pu !== undefined && pvN !== undefined) {
          const r = hitungAritm(pu);
          cek(!!r && r.ok && r.hasil === Number(pvN) && JSON.stringify(r.angka.filter((x) => x > 0).sort((p, q) => q - p)) === JSON.stringify(uraian(Number(pvN))), `${nm}: penjumlahan nilai tempat "${pu}" sama dengan uraian ${pvN}`);
        }
      } else cek(pvN === undefined && pvD.every((d) => d === undefined), `${nm}: angka papan hanya pada papan`);
      /* 2) Tabel tempat pada metode luar. */
      {
        const tbD = angkaDari(objs, "tb-d");
        const tbW = angkaDari(objs, "tb-w");
        const tbN = ketemu(objs, "tb-n")?.isi;
        if (ketemu(objs, "tb-dk0")) {
          stat.tb += 1;
          for (let c = 0; c < 3; c += 1) {
            if (tbD[c] !== undefined) cek(/^[0-9]$/.test(tbD[c]), `${nm}: angka tabel ${c} satu digit`);
            if (tbW[c] !== undefined && tbD[c] !== undefined) cek(Number(tbW[c]) === Number(tbD[c]) * NILAI_TEMPAT[c], `${nm}: nilai tabel ${c} (${tbW[c]}) = angka ${tbD[c]} x ${NILAI_TEMPAT[c]}`);
          }
          if (tbN !== undefined && tbD.every((d) => d !== undefined)) cek(Number(tbD.join("")) === Number(tbN), `${nm}: bilangan tabel ${tbN} sama dengan angka ${tbD.join("")}`);
          const tk = ketemu(objs, "tb-k-t0")?.isi;
          const bil = tbN ?? (tbD.every((d) => d !== undefined) ? tbD.join("") : undefined);
          if (tk !== undefined && bil !== undefined) {
            stat.kata += 1;
            cek(tk === eja(Number(bil)), `${nm}: kata tabel "${tk}" sama dengan ejaan ${bil}`);
          }
        }
      }
      /* 3) Baris kata bilangan: bilangan, kata, dan label saling cocok. */
      for (let r = 0; r < 6; r += 1) {
        const ka = ketemu(objs, `kr-a${r}`);
        const kw = ketemu(objs, `kr-w${r}`);
        const kl = ketemu(objs, `kr-l${r}`);
        if (!ka || !kw) continue;
        stat.baris += 1;
        cek(kw.isi === eja(Number(ka.isi)), `${nm}: baris ${r}: kata "${kw.isi}" sama dengan ejaan ${ka.isi}`);
        if (kl) {
          const m = /^(\d) (ratusan|puluhan)$/.exec(kl.isi);
          cek(!!m && Number(m[1]) * (m[2] === "ratusan" ? 100 : 10) === Number(ka.isi), `${nm}: baris ${r}: label "${kl.isi}" sama dengan ${ka.isi}`);
        }
      }
      /* 4) Hitungan tertulis dan penukaran sepuluh jadi satu. */
      for (const o of objs.filter((q) => q.t === "teks" && q.isi)) {
        const r = hitungAritm(o.isi);
        if (r) {
          stat.jumlah += 1;
          cek(r.ok, `${nm}: hitungan "${o.isi}" benar`);
          if (r.angka.every(bulat)) cek(JSON.stringify(r.angka.filter((x) => x > 0)) === JSON.stringify(uraian(r.hasil)), `${nm}: uraian "${o.isi}" sama dengan nilai tempat ${r.hasil}`);
        }
        const q = /^(\d+) (satuan|puluhan|ratusan) = (\d+) (satuan|puluhan|ratusan)$/.exec(o.isi);
        if (q) {
          stat.tukar += 1;
          const nilaiNama = { satuan: 1, puluhan: 10, ratusan: 100 };
          cek(Number(q[1]) * nilaiNama[q[2]] === Number(q[3]) * nilaiNama[q[4]], `${nm}: penukaran "${o.isi}" benar`);
        }
      }
      for (const j of ["s", "p", "r"]) {
        const lab = ketemu(objs, `bk-n-${j}`);
        if (lab) cek(Number(lab.isi) === blok[j].length, `${nm}: label banyak balok ${j} (${lab.isi}) sama dengan jumlah balok (${blok[j].length})`);
      }
      if (prev && !adaPapan) {
        const hilang = ["s", "p", "r"].some((j) => blok[j].length < prev[j].length);
        if (hilang && nBlok > 0) {
          stat.tukarBalok += 1;
          cek(nilaiBlok(prev) === nBlok, `${nm}: penukaran balok menjaga nilai (${nilaiBlok(prev)} menjadi ${nBlok})`);
          cek((prev.s.length === 10 && blok.s.length === 0 && blok.p.length === 1) || (prev.p.length === 10 && blok.p.length === 0 && blok.r.length === 1), `${nm}: sepuluh balok ditukar satu balok yang lebih besar`);
        }
      }
      prev = blok;
      /* 5) Bilangan yang disebut di suara tampak di gambar dan dieja benar. */
      for (const f of frasaBilangan(kt.suara)) {
        stat.frasa += 1;
        if (f.nilai > 10) cek(lihat.has(f.nilai), `${nm}: bilangan "${f.teks}" (${f.nilai}) tampak di gambar adegan`);
        if (f.teks.split(" ").length >= 2) cek(f.teks === eja(f.nilai) || /bukan|salah/.test(t), `${nm}: frasa "${f.teks}" dieja benar (${eja(f.nilai)})`);
      }
      /* 6) Pilihan jawaban: satu benar, disorot pada "Betul!", dihitung dari gambar. */
      {
        const cp = [1, 2, 3].map((q) => ({ t: ketemu(objs, `c${q}-t`)?.isi, s: ketemu(objs, `c${q}-k`)?.sorot })).filter((c) => c.t !== undefined);
        if (cp.length) {
          stat.pilihan += 1;
          cek(new Set(cp.map((c) => c.t)).size === cp.length && cp.length === 3, `${nm}: tiga pilihan berbeda (${cp.map((c) => c.t).join(", ")})`);
          const dipilih = cp.filter((c) => c.s);
          cek(/^betul/.test(t) ? dipilih.length === 1 : dipilih.length === 0, `${nm}: jawaban disorot tepat pada ketukan "Betul!"`);
          const tanya = ketemu(objs, "tanya")?.isi ?? "";
          cek(tanya.length > 0, `${nm}: pertanyaan tampil bersama pilihan`);
          let benar = null;
          let m;
          const tbD = angkaDari(objs, "tb-d");
          if (/^berapa bilangan balok ini\?$/.test(tanya)) {
            cek(nBlok > 0 && nBlok < 1000, `${nm}: balok tampak untuk pertanyaan`);
            benar = cp.filter((c) => Number(c.t) === nBlok).map((c) => c.t);
          } else if ((m = /^bagaimana (?:membaca|menyebut) (\d+)\?$/.exec(tanya))) {
            const N = Number(m[1]);
            if (tbD.every((d) => d !== undefined)) cek(Number(tbD.join("")) === N, `${nm}: bilangan pada soal (${N}) sama dengan angka tabel (${tbD.join("")})`);
            const bn = ketemu(objs, "bn")?.isi ?? m[1];
            cek(Number(bn) === N, `${nm}: bilangan besar (${bn}) sama dengan bilangan pada soal (${N})`);
            benar = cp.filter((c) => c.t === eja(N)).map((c) => c.t);
          } else if (/^mana lambangnya\?$/.test(tanya)) {
            const kt2 = ketemu(objs, "kt-t0")?.isi ?? "";
            benar = cp.filter((c) => Number(c.t) === nilaiRun(kt2.split(" ")) && kt2 === eja(Number(c.t))).map((c) => c.t);
          }
          cek(benar !== null && benar.length === 1, `${nm}: tepat satu pilihan benar untuk "${tanya}" (${benar})`);
          if (benar && benar.length === 1) {
            stat.jawaban += 1;
            if (dipilih.length === 1) cek(dipilih[0].t === benar[0], `${nm}: jawaban yang disorot "${dipilih[0].t}" sama dengan hitungan ulang "${benar[0]}"`);
          }
        }
      }
    });
  }
}

console.log(`Pemeriksaan: ${stat.papan} keadaan papan, ${stat.nilai} bilangan papan lengkap, ${stat.balok} kelompok balok, ${stat.kata} kata bilangan, ${stat.baris} baris kata, ${stat.tb} keadaan tabel, ${stat.frasa} frasa bilangan di suara, ${stat.jumlah} hitungan tertulis, ${stat.tukar} penukaran, ${stat.tukarBalok} penukaran balok, ${stat.pilihan} pilihan, ${stat.jawaban} jawaban`);
for (const [nama, batas] of [["papan", 40], ["nilai", 25], ["balok", 25], ["kata", 10], ["baris", 10], ["tb", 6], ["frasa", 150], ["jumlah", 8], ["tukar", 2], ["tukarBalok", 2], ["pilihan", 6], ["jawaban", 6]]) cek(stat[nama] >= batas, `uji menjalankan cukup banyak pemeriksaan ${nama} (${stat[nama]} >= ${batas})`);


/* ------------------------------ Aturan pemilik ------------------------------ */
{
  const MANDIRI = /kerja kelompok|berkelompok|secara berkelompok|diskusi kelompok|sekelompok|kelompokmu|kelompok belajar|bersama kelompok|tanya teman|survei|karet gelang|uang tabungan|uang logam|\bpaman\b|\btika\b|\bteman\w*|\bkawan\w*|sekawan|sahabat|depan kelas|bersama kelas|seluruh kelas|\bkelas\b|berpasangan dengan (teman|kawan)|bekerja berpasangan|secara berpasangan|bermain bersama|bertanya kepada|buat ceritamu|buku|menulis di|menuliskan di|tulis di|tuliskan di|menggambar|gambarlah|gambar sendiri|\bbawa(lah)?\b|membawa|dibawa|\bkertas\b|\bpensil\b|\bpulpen\b|\bspidol\b|\bgunting\b|ambil (benda|pensil|kelereng|bola|sedotan|balon|kerucut|kubus)|\bjari\b|menyuruh|suruh|jengkal|telapak|\bdepa\b|penggaris|\bkoin\b|di sekitar|di rumah|di kelas|kakimu|tanganmu|badanmu|\braba\w*|\bmeraba|\btubuh|\blengan|lingkari|guru kelas|orang tua|\bayah\b|\bibu guru|bapak guru|\bloker\b|singapura|\bmeja\b|di sekitarmu|\brumah\b|\bpisau\b|\bkelompok\b|dua tangan|tangan (kiri|kanan)|angkat|mengangkat|\bkantin|\blidi\b|kelas dua|survei|presentasi|mempresentasikan/i;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      const semua = [a.judul, a.sumber];
      a.ketukan.forEach((kt, i) => {
        semua.push(kt.suara);
        semua.push(...L.teksTerlihat(L.keadaanStory(a, i, 9999)));
      });
      const kena = semua.filter((t) => MANDIRI.test(t) || /\bLili\b/.test(t));
      cek(kena.length === 0, `${v.id}/${a.id}: narasi mandiri dan digital, tanpa kelompok, teman, kelas, buku, kertas, pensil, kantin, menulis, atau tokoh di luar enam (${kena.slice(0, 2).join(" | ")})`);
    }
  }
}


/* ------------------------------ Sapaan, peta susun, dan tabel susun ------------------------------ */
{
  const sap = adegan(M_VIDEO, "sapaan");
  const DAFTAR = ["Satuan, puluhan, dan ratusan", "Membaca bilangan tiga angka", "Menulis lambang bilangan"];
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Satuan, puluhan, dan ratusan/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => DAFTAR.includes(t)), DAFTAR, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara) && !/\d/.test(DAFTAR.join(" ")), "sapaan materi: tanpa angka");
  const sapLuar = adegan(U, "sapaan");
  cek(/cara lain/i.test(L.teksTerlihat(akhirAdegan(sapLuar, 1)).join(" | ")) && /metode-luar|Metode luar/.test(sapLuar.sumber), "sapaan metode luar: pengumuman cara lain");
  const ringkasBerkas = new URL("../src/data/kelas3-bab1-ringkas.json", import.meta.url);
  const sumberRingkas = existsSync(ringkasBerkas) ? JSON.parse(readFileSync(ringkasBerkas, "utf8")).subBab?.A : null;
  const sementara = new URL("../.tmp-k3b1s/A.json", import.meta.url);
  const A = sumberRingkas?.petaSusun && sumberRingkas?.tabelSusun ? sumberRingkas : existsSync(sementara) ? JSON.parse(readFileSync(sementara, "utf8")) : null;
  if (A) {
    const peta = A.petaSusun.simpul;
    const anak = (id) => peta.filter((s) => s.induk === id).map((s) => s.teks);
    const akar = peta.filter((s) => s.induk === null);
    cek(akar.length === 3, "peta susun: tiga cabang dari pusat");
    sama(anak(akar[0].id), DAFTAR, "peta susun: cabang pertama sama dengan daftar sapaan");
    sama([anak(akar[1].id).length, anak(akar[2].id).length, peta.length], [3, 2, 11], "peta susun: 3 cara, 2 hasil, 11 simpul");
    sama(peta.map((s) => s.nomor), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], "peta susun: nomor 1 sampai 11");
    cek(peta.every((s) => s.teks.length <= 28) && new Set(peta.map((s) => s.teks)).size === peta.length, "peta susun: teks <= 28 huruf dan unik");
    cek(A.petaSusun.pusat.judul.length <= 28, "peta susun: judul pusat <= 28 huruf");
    cek(!/\d/.test(A.petaSusun.pusat.suara) && !/\d/.test(A.petaSusun.petunjuk) && peta.every((s) => !/\d/.test(s.petunjuk ?? "")), "peta susun: suara dan petunjuk tanpa digit");
    cek(A.petaSusun.pusat.judul.length > 8 && /\?$/.test(A.petaSusun.pusat.judul), "peta susun: pusat berupa masalah (pertanyaan) sub-bab");
    const T = A.tabelSusun;
    cek(T.baris.length >= 3 && T.baris.length <= 5 && T.kolom.length >= 3 && T.kolom.length <= 4, "tabel susun: 3 sampai 5 baris dan 3 sampai 4 kolom");
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 26 && (s.match(/\d+/g) ?? []).length <= 1)), "tabel susun: sel <= 26 huruf dan paling banyak satu angka per sel");
    cek(T.baris.every((b) => b.label.split(/\s+/).every((w) => w.length <= 8)), "tabel susun: kata terpanjang kolom label <= 8 huruf");
    cek(!/\d/.test(T.suara) && !/\d/.test(T.petunjuk), "tabel susun: suara dan petunjuk tanpa digit");
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 8)), "tabel susun: sel pendek supaya margin teks >= 5 px di 405 px");
    // Isi tabel dihitung ulang dari papan tiga tempat pada video materi: angka ratusan, puluhan, dan satuan tiap bilangan.
    sama(T.kolom, ["Ratusan", "Puluhan", "Satuan"], "tabel susun: kolom ratusan, puluhan, satuan");
    const SUMBER = { 160: "baca-160", 671: "baca-671", 759: "baca-759", 703: "nol-703" };
    sama(T.baris.map((b) => b.label), ["160", "671", "759", "703"], "tabel susun: baris bilangan 160, 671, 759, 703");
    for (const b of T.baris) {
      const ad = adegan(M_VIDEO, SUMBER[b.label]);
      cek(!!ad, `tabel susun: adegan sumber ${b.label} ada`);
      if (!ad) continue;
      const objs = akhirAdegan(ad);
      stat.tabel += 1;
      cek(ketemu(objs, "pv-n")?.isi === b.label, `tabel susun: papan adegan ${ad.id} menampilkan ${b.label}`);
      sama(b.sel, angkaDari(objs, "pv-d"), `tabel susun: baris ${b.label} dihitung ulang dari angka papan`);
      sama(b.sel, String(b.label).split(""), `tabel susun: baris ${b.label} sama dengan angka bilangan`);
    }
    const KATA_LARANG = /buku|halaman|kunci|kerja kelompok|berkelompok|\bteman|kawan|kelas\b|kertas|pensil|\bbawa\b|menggambar|depan kelas|di rumah|survei|karet gelang|di sekitar|\bpaman\b|\btika\b|\blili\b|loker|ibu guru|singapura|dienes blocks|place-value|number names|pisau|koin|\brumah\b|\bayah\b|\bpak\b|\bkantin|\blidi\b|alfa|galih|alen|meutia|pramuka|barung|tabel nilai tempat|nama bilangan|balok dienes/i;
    cek(!KATA_LARANG.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: tanpa kata terlarang dan tanpa nama Inggris, kelompok, teman, kelas, buku, kertas, pensil, pisau, loker, Ibu guru, nama metode luar");
    cek(peta.every((s) => ![...s.teks, ...(s.ikon ?? "")].some((c) => c.codePointAt(0) > 0x1fa95)), "peta susun: emoji paling tinggi Emoji 12");
  } else cek(false, "peta dan tabel susun: .tmp-k3b1s/A.json atau kelas3-bab1-ringkas.json subBab.A.petaSusun ada");
}

console.log(`Tabel susun dihitung ulang: ${stat.tabel} baris`);
console.log(`${VIDEO.map((v) => `${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, a) => t + a.ketukan.length, 0)} ketukan, ${kataVideo(v)} kata (sekitar ${(kataVideo(v) / 120).toFixed(1)} menit diputar)`).join("\n")}`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
