// Uji Story Kelas 2 Bab 8 Sub-Bab A (Diagram Turus): dua video (materi kurikulum dan metode luar) dengan mesin animasi Story.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar (nama metode hanya Indonesia),
// dan HITUNG ULANG dari struktur adegan: garis turus tiap baris (garis kelima tiap lima miring dan memotong empat garis tegak; banyak = 5 x ikat lima + garis sisa), banyak benda per jenis,
// kolom banyak sama dengan banyak garis, angka ikat lima, data sumber (buah, hewan, mainan, sayur, bunga), kalimat paling banyak, paling sedikit, sama banyak, lebihnya, kurangnya, selisih, dan jumlah
// dihitung dari data, hitungan tertulis (a + b = c), jawaban latihan (satu pilihan benar dan disorot), isi tabel susun, dan emoji paling tinggi Emoji 12.
// Jalankan: node --no-warnings scripts/uji-story-k2b8A.mjs
// Jalankan: node --no-warnings scripts/uji-story-k2b8A.mjs
import { readFileSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k2b8A-video.ts");
const U1 = await import("../src/components/modul/story/k2b8A-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K2B8A, V.VIDEO_LUAR_K2B8A];
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
const M_VIDEO = V.VIDEO_MATERI_K2B8A;
const U = V.VIDEO_LUAR_K2B8A;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /Hitung Frekuensi|Pilah Kategori|metode luar|metode dari luar/i;
const NAMA_INGGRIS = /Tally Marks?|Frequency Count|Category Sort|Pictograph|Legend|Compare Categories|Singapore Math|Van de Walle/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar ");
  for (const m of U1.NAMA_METODE_ID) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE_ID, ["Turus", "Hitung Frekuensi", "Pilah Kategori"], "nama Indonesia metode luar (namaId data)");
  cek(!NAMA_INGGRIS.test(materi) && !NAMA_INGGRIS.test(luar), "nama metode hanya bahasa Indonesia (tanpa Tally Marks, Frequency Count, Category Sort)");
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
      cek(!/\b(Tika|Lili|Paman|Ibu|Ayah|Bapak|Budi|Ani|Doni|Sinta|Dewi|Rudi|Nina|Andi|Siti|Bu Guru|Pak Guru|Pak|Ahmad)\b/.test(semua.join(" | ")), `${v.id}/${a.id}: hanya enam tokoh tetap`);
      cek(semua.every((t) => ![...t].some((c) => c.codePointAt(0) > 0x1fa95)), `${v.id}/${a.id}: emoji paling tinggi Emoji 12`);
    }
  }
  cek(M_VIDEO.subjudul === "Materi kurikulum" && U.subjudul === "Tiga metode luar", "subjudul video: Materi kurikulum dan Tiga metode luar");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46), "video materi: label sumber berbentuk Materi: ... dan pendek");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "video metode luar: label sumber metode luar atau ringkasan, pendek");
  cek(M_VIDEO.id === "k2b8A-materi" && U.id === "k2b8A-luar", "id video k2b8A-materi dan k2b8A-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,cerita-buah,pilah-buah,kenal-turus,ikat-lima,turus-buah,peternak,turus-hewan,baca-paling,lebih-kurang,sama-banyak,jumlah,ubah-banyak,catat-jawaban,latihan-satu,latihan-dua,latihan-tiga,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-turus,luar-turus-terapan,luar-frekuensi,luar-frekuensi-terapan,luar-pilah,luar-pilah-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 3 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 3 lalu penutup");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  cek(U.adegan.length - 3 === 6, "video metode luar: konsep dan penerapan untuk tiga metode (6 adegan di antara pembuka dan ringkasan)");
  for (const kata of ["Latihan", "Igil", "Halim", "Kira", "Wei", "Upe", "Malosi", "turus", "diagram", "data", "ikat lima", "garis tegak", "coretan miring", "paling banyak", "paling sedikit", "sama banyak", "lebihnya", "kurangnya", "selisih", "jumlah", "mengelompokkan", "anggur", "jeruk", "ayam", "bebek", "mawar", "boneka", "brokoli", "kucing"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Batas bab: data paling banyak empat kategori, bilangan kecil, tanpa satuan baku, rumus, perkalian, ratusan.
  const BOCOR = /kilogram|\bgram\b|\bkg\b|dikali|perkalian|pembagian|rumus|ribu|\bratus|×|÷|−|\bmeter\b|\bliter\b/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa satuan baku, rumus, perkalian, ratusan`);
    for (const a of v.adegan) for (const i of a.ketukan.keys()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 100, `${v.id}/${a.id}#${i + 1}: angka di gambar paling besar seratus ("${t}")`);
  }
  const ketMateri = M_VIDEO.adegan.reduce((t, ad) => t + ad.ketukan.length, 0);
  cek(totalKetukan >= 70 && ketMateri >= 70, `total ketukan cukup dalam (${totalKetukan}; materi ${ketMateri})`);
  const kataMateri = kataVideo(M_VIDEO);
  cek(kataMateri / 120 >= 8 && kataMateri / 120 <= 13, `durasi materi diputar 8 sampai 13 menit (${(kataMateri / 120).toFixed(1)} menit)`);
  cek(kataVideo(U) / 120 >= 3, `durasi video luar paling sedikit 3 menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
}

/* ------------------------------ Diagram turus, benda, dan kalimat dihitung ulang dari struktur adegan ------------------------------ */
const G = await import("../src/components/modul/story/k2b8A-gambar.ts");
const stat = { dt: 0, baris: 0, garis: 0, ikat: 0, benda: 0, klaim: 0, aritm: 0, jawaban: 0, tabel: 0, pilihan: 0 };
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const U9 = "satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan";
const NILAI9 = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9, sepuluh: 10 };
const NUMW = `(?:seratus|sepuluh|sebelas|(?:${U9}) belas|(?:${U9}) puluh(?: (?:${U9}))?|${U9})(?![a-z])`;
const nilaiKata = (s) => {
  const t = s.toLowerCase().trim();
  if (t === "seratus") return 100;
  if (t === "sepuluh") return 10;
  if (t === "sebelas") return 11;
  let m = /^(\w+) belas$/.exec(t);
  if (m) return 10 + NILAI9[m[1]];
  m = /^(\w+) puluh(?: (\w+))?$/.exec(t);
  if (m) return 10 * NILAI9[m[1]] + (m[2] ? NILAI9[m[2]] : 0);
  return NILAI9[t] ?? null;
};

// Data sumber (kelas2-bab8.json subBabs.A): banyak tiap jenis.
const DATA = { anggur: 2, jeruk: 6, apel: 4, pisang: 3, ayam: 10, kambing: 8, sapi: 6, bebek: 11, "mobil-mobilan": 2, boneka: 4, kelereng: 6, balok: 7, brokoli: 7, bayam: 4, wortel: 6, jagung: 3, mawar: 7, lili: 4, tulip: 5, aster: 4, kucing: 4, kelinci: 3, burung: 2, ikan: 8, bintang: 5, bulan: 3, awan: 6, pelangi: 4, bola: 9, balon: 6 };
for (const [nama, daftar] of [["BUAH", G.BUAH], ["HEWAN", G.HEWAN], ["MAINAN", G.MAINAN], ["SAYUR", G.SAYUR], ["BUNGA", G.BUNGA]]) {
  cek(daftar.length === 4 && daftar.every((j) => DATA[j.nama] === j.n), `data ${nama} di gambar sama dengan data sumber (empat kategori)`);
  cek(daftar.every((j) => j.n <= 11 && G.EMO[j.nama]), `data ${nama}: paling banyak sebelas per kategori dan ada gambarnya`);
}
cek(Object.values(G.EMO).every((e) => ![...e].some((c) => c.codePointAt(0) > 0x1fa95)), "emoji benda paling tinggi Emoji 12");
const NAMA_RE = Object.keys(DATA).sort((a, b) => b.length - a.length).join("|");
const nilaiBaris = (b) => (/^\d+$/.test(b.label?.isi ?? "") ? Number(b.label.isi) : DATA[b.label?.isi]);

/** Baca diagram turus `dt` dari benda-benda: baris, garis, banyaknya, dan angka ikat lima. */
const bacaDt = (objs) => {
  const peta = new Map();
  const ambil = (r) => {
    if (!peta.has(r)) peta.set(r, { r, label: null, box: null, strokes: [], n: null, ikat: [] });
    return peta.get(r);
  };
  for (const o of objs) {
    let m;
    if ((m = /^dt-l(\d+)$/.exec(o.id))) ambil(Number(m[1])).label = o;
    else if ((m = /^dt-b(\d+)$/.exec(o.id))) ambil(Number(m[1])).box = o;
    else if ((m = /^dt-g(\d+)-(\d+)$/.exec(o.id))) ambil(Number(m[1])).strokes.push({ i: Number(m[2]), o });
    else if ((m = /^dt-n(\d+)$/.exec(o.id))) ambil(Number(m[1])).n = o;
    else if ((m = /^dt-k(\d+)-(\d+)$/.exec(o.id))) ambil(Number(m[1])).ikat.push({ g: Number(m[2]), o });
  }
  for (const b of peta.values()) b.strokes.sort((p, q) => p.i - q.i);
  return [...peta.values()].sort((p, q) => p.r - q.r);
};
/** Benda bergambar per jenis: id `b-${nama}-${i}` atau `st-${nama}-${i}`. */
const bacaBenda = (objs) => {
  const peta = new Map();
  for (const o of objs) {
    const m = /^(?:b|st)-([a-z-]+)-(\d+)$/.exec(o.id);
    if (m) {
      if (!peta.has(m[1])) peta.set(m[1], []);
      peta.get(m[1]).push(Number(m[2]));
    }
  }
  for (const v of peta.values()) v.sort((p, q) => p - q);
  return peta;
};
const hitungAritm = (s) => {
  const m = /^(\d+(?: [+-] \d+)+) = (\d+)$/.exec(s);
  if (!m) return null;
  const t = m[1].split(" ");
  let v = Number(t[0]);
  for (let i = 1; i < t.length; i += 2) v = t[i] === "+" ? v + Number(t[i + 1]) : v - Number(t[i + 1]);
  return { ok: v === Number(m[2]), angka: t.filter((_, i) => i % 2 === 0).map(Number), ops: t.filter((_, i) => i % 2 === 1), hasil: Number(m[2]) };
};

for (const v of VIDEO) {
  for (const a of v.adegan) {
    a.ketukan.forEach((kt, i) => {
      const objs = akhirAdegan(a, i);
      const akhirAd = i === a.ketukan.length - 1;
      const nm = `${v.id}/${a.id}#${i + 1}`;
      const t = kt.suara.toLowerCase();
      const dt = bacaDt(objs);
      const benda = bacaBenda(objs);
      /* 1) Diagram turus: garis, ikat lima, banyaknya, dan letak dihitung dari struktur. */
      if (dt.length) stat.dt += 1;
      const xAwal = new Set();
      for (const b of dt) {
        stat.baris += 1;
        const n = b.strokes.length;
        cek(!!b.label && !!b.box, `${nm}: baris ${b.r} punya nama dan kotak`);
        cek(b.strokes.every((s, q) => s.i === q), `${nm}: garis baris ${b.r} bernomor berurutan dari nol`);
        const tegak = b.strokes.filter((s) => s.i % 5 < 4);
        const miring = b.strokes.filter((s) => s.i % 5 === 4);
        stat.garis += n;
        cek(tegak.every((s) => s.o.x2 === 0 && s.o.y2 > 0) && miring.every((s) => s.o.x2 > 0 && s.o.y2 < 0), `${nm}: baris ${b.r}: empat garis tegak dan garis kelima miring`);
        // Tiap ikat lima: garis miring memotong empat garis tegak di kelompoknya; banyak = 5 x ikat penuh + garis sisa.
        const ikatPenuh = Math.floor(n / 5);
        cek(miring.length === ikatPenuh, `${nm}: baris ${b.r}: banyak garis miring (${miring.length}) sama dengan banyak ikat lima penuh (${ikatPenuh})`);
        const sisa = n - 5 * ikatPenuh;
        cek(b.strokes.length === 5 * miring.length + b.strokes.filter((s) => s.i >= 5 * ikatPenuh).length, `${nm}: baris ${b.r}: banyak garis = 5 x ikat + garis sisa`);
        for (let g = 0; g * 5 < n; g += 1) {
          const kel = b.strokes.filter((s) => Math.floor(s.i / 5) === g);
          const teg = kel.filter((s) => s.i % 5 < 4);
          cek(teg.every((s, q) => s.o.y === teg[0].o.y && s.o.y2 === teg[0].o.y2 && (q === 0 || Math.abs(s.o.x - teg[q - 1].o.x - (teg[1]?.o.x - teg[0].o.x)) < 0.01)), `${nm}: baris ${b.r}: garis tegak ikat ${g + 1} sama tinggi dan berjarak sama`);
          const mr = kel.find((s) => s.i % 5 === 4);
          if (mr) {
            stat.ikat += 1;
            cek(teg.length === 4 && mr.o.x <= teg[0].o.x && mr.o.x + mr.o.x2 >= teg[3].o.x && mr.o.y > teg[0].o.y && mr.o.y + mr.o.y2 < teg[0].o.y + teg[0].o.y2, `${nm}: baris ${b.r}: garis miring ikat ${g + 1} memotong empat garis tegak`);
          } else cek(kel.length === n - 5 * g && kel.length < 5, `${nm}: baris ${b.r}: garis sisa kurang dari lima`);
        }
        if (g0(b)) xAwal.add(g0(b));
        if (b.box)
          for (const s of b.strokes) cek(s.o.x > b.box.x && s.o.x + s.o.x2 < b.box.x + b.box.w && Math.min(s.o.y, s.o.y + s.o.y2) > b.box.y && Math.max(s.o.y, s.o.y + s.o.y2) < b.box.y + b.box.h, `${nm}: garis ${s.o.id} di dalam kotak baris`);
        // Banyaknya (kolom banyak) sama dengan banyak garis.
        if (b.n) cek(Number(b.n.isi) === n, `${nm}: kolom banyak baris ${b.r} (${b.n.isi}) sama dengan banyak garis (${n})`);
        // Angka ikat lima: 5 x (ikat ke-g), dan ikatnya sudah penuh.
        for (const q of b.ikat) {
          cek(Number(q.o.isi) === 5 * (q.g + 1) && q.g < ikatPenuh, `${nm}: angka ikat ${q.g + 1} baris ${b.r} bernilai ${5 * (q.g + 1)} (ada ${q.o.isi}) pada ikat yang penuh`);
        }
        // Nama jenis: banyak garis cocok dengan data (sama di akhir adegan, tidak lebih sebelumnya).
        const target = nilaiBaris(b);
        cek(target !== undefined, `${nm}: nama baris "${b.label?.isi}" dikenal`);
        if (target !== undefined) {
          cek(n <= target, `${nm}: baris ${b.label.isi} tidak punya garis lebih banyak dari data (${n} > ${target})`);
          if (akhirAd) cek(n === target, `${nm}: di akhir adegan baris ${b.label.isi} punya ${target} garis (ada ${n})`);
        }
        void sisa;
      }
      cek(xAwal.size <= 1, `${nm}: semua baris mulai dari kolom turus yang sama`);
      /* 2) Benda bergambar: jumlah per jenis cocok dengan data, label banyak cocok, dan garis turus sama dengan benda di akhir adegan. */
      for (const [nama, daftar] of benda) {
        stat.benda += 1;
        cek(DATA[nama] !== undefined && daftar.every((q, r) => q === r + 1), `${nm}: benda ${nama} bernomor 1, 2, 3 ... berurutan`);
        cek(daftar.length <= DATA[nama], `${nm}: benda ${nama} tidak lebih banyak dari data (${daftar.length} > ${DATA[nama]})`);
        const bn = ketemu(objs, `bn-${nama}`);
        if (bn) cek(Number(bn.isi) === daftar.length && Number(bn.isi) === DATA[nama], `${nm}: banyaknya benda ${nama} (${bn.isi}) sama dengan jumlah benda (${daftar.length}) dan data (${DATA[nama]})`);
        const bl = ketemu(objs, `bl-${nama}`);
        if (bl) cek(bl.isi === nama, `${nm}: nama baris benda ${nama}`);
        const baris = dt.find((b) => b.label?.isi === nama);
        if (baris && akhirAd) cek(baris.strokes.length === daftar.length, `${nm}: garis turus ${nama} (${baris.strokes.length}) sama dengan jumlah benda (${daftar.length})`);
      }
      for (const o of objs.filter((q) => /^(?:b|st)-/.test(q.id))) cek(o.isi === G.EMO[/^(?:b|st)-([a-z-]+)-\d+$/.exec(o.id)[1]], `${nm}: gambar benda ${o.id} sesuai jenisnya`);
      /* 3) Kalimat di suara dihitung ulang dari data dan gambar. */
      const hadir = new Set([...dt.filter((b) => b.label && DATA[b.label.isi] !== undefined).map((b) => b.label.isi), ...benda.keys()]);
      const nilaiHadir = [...hadir].map((x) => DATA[x]);
      const bilBaris = dt.map((b) => nilaiBaris(b));
      const kenal = (x) => DATA[x] !== undefined;
      for (const m of t.matchAll(new RegExp(`(?<!jumlah (?:${NAMA_RE}) dan )\\b(${NAMA_RE}) (?:ada|adalah) (${NUMW})(?! ikat)`, "g"))) {
        stat.klaim += 1;
        const n = nilaiKata(m[2]);
        cek(DATA[m[1]] === n, `${nm}: "${m[0]}" sesuai data (${DATA[m[1]]})`);
        cek(hadir.has(m[1]), `${nm}: "${m[1]}" tampak di gambar`);
        const b = dt.find((q) => q.label?.isi === m[1]);
        if (b) cek(b.strokes.length === n, `${nm}: "${m[0]}" cocok dengan garis turus (${b.strokes.length})`);
        if (benda.has(m[1])) cek(benda.get(m[1]).length === n, `${nm}: "${m[0]}" cocok dengan jumlah benda (${benda.get(m[1]).length})`);
      }
      for (const m of [...t.matchAll(new RegExp(`\\b(${NAMA_RE})(?: (${NUMW}))? paling (banyak|sedikit)`, "g")), ...t.matchAll(new RegExp(`paling (banyak|sedikit)(?: adalah| yaitu)? (${NAMA_RE})\\b(?: (${NUMW}))?`, "g"))]) {
        stat.klaim += 1;
        const banyak = m[0].startsWith("paling") ? m[1] === "banyak" : m[3] === "banyak";
        const nama = m[0].startsWith("paling") ? m[2] : m[1];
        const angka = m[0].startsWith("paling") ? m[3] : m[2];
        cek(hadir.has(nama), `${nm}: "${m[0]}" jenis tampak di gambar`);
        const lain = [...hadir].filter((x) => x !== nama);
        cek(lain.length >= 1 && lain.every((x) => (banyak ? DATA[nama] > DATA[x] : DATA[nama] < DATA[x])), `${nm}: "${m[0]}" benar menurut data (${[...hadir].map((x) => `${x}:${DATA[x]}`).join(", ")})`);
        if (angka) cek(nilaiKata(angka) === DATA[nama], `${nm}: "${m[0]}" bilangannya sesuai data`);
      }
      for (const m of t.matchAll(new RegExp(`\\b(${NAMA_RE}) dan (${NAMA_RE}) sama banyak`, "g"))) {
        stat.klaim += 1;
        cek(hadir.has(m[1]) && hadir.has(m[2]) && DATA[m[1]] === DATA[m[2]], `${nm}: "${m[0]}" benar menurut data`);
      }
      for (const m of t.matchAll(new RegExp(`(?:banyak )?(${NAMA_RE}) (${NUMW}) (lebihnya|kurangnya) dari (?:banyak )?(${NAMA_RE})`, "g"))) {
        stat.klaim += 1;
        const d = nilaiKata(m[2]);
        cek(hadir.has(m[1]) && hadir.has(m[4]), `${nm}: "${m[0]}" kedua jenis tampak di gambar`);
        cek(m[3] === "lebihnya" ? DATA[m[1]] - DATA[m[4]] === d : DATA[m[4]] - DATA[m[1]] === d, `${nm}: "${m[0]}" benar menurut data (${DATA[m[1]]} dan ${DATA[m[4]]})`);
      }
      for (const m of t.matchAll(new RegExp(`jumlah (${NAMA_RE}) dan (${NAMA_RE}) (?:ada|adalah|sama dengan) (${NUMW})`, "g"))) {
        stat.klaim += 1;
        cek(hadir.has(m[1]) && hadir.has(m[2]) && DATA[m[1]] + DATA[m[2]] === nilaiKata(m[3]), `${nm}: "${m[0]}" jumlahnya benar (${DATA[m[1]]} + ${DATA[m[2]]})`);
      }
      for (const m of t.matchAll(new RegExp(`jumlah semua(?: [a-z]+)*? (?:ada|adalah) (${NUMW})`, "g"))) {
        stat.klaim += 1;
        cek(hadir.size === 4 && nilaiHadir.reduce((p, q) => p + q, 0) === nilaiKata(m[1]), `${nm}: "${m[0]}" sama dengan jumlah semua kategori (${nilaiHadir.join(" + ")})`);
      }
      for (const m of t.matchAll(new RegExp(`selisih(?:nya)? (${NUMW})`, "g"))) {
        stat.klaim += 1;
        const d = nilaiKata(m[1]);
        const pasang = [];
        for (const p of hadir) for (const q of hadir) if (p < q) pasang.push(Math.abs(DATA[p] - DATA[q]));
        cek(pasang.includes(d), `${nm}: "${m[0]}" cocok dengan selisih dua jenis di gambar (${pasang.join(",")})`);
      }
      // Ikat lima dan garis sisa: satu kalimat memuat satu jenis (atau tanpa nama: ada baris bernilai sama).
      for (const kal of t.split(/[.?!]/)) {
        const mm = [...kal.matchAll(new RegExp(`\\b(${U9}) ikat lima(?: dan (${U9}) garis)?`, "g"))];
        if (!mm.length) continue;
        const nama = [...kal.matchAll(new RegExp(`\\b(${NAMA_RE})\\b`, "g"))].map((q) => q[1]);
        for (const q of mm) {
          stat.klaim += 1;
          const val = 5 * NILAI9[q[1]] + (q[2] ? NILAI9[q[2]] : 0);
          if (nama.length === 1) cek(DATA[nama[0]] === val && hadir.has(nama[0]), `${nm}: "${q[0]}" untuk ${nama[0]} berjumlah ${val} (data ${DATA[nama[0]]})`);
          else if (q[2]) cek(nama.length === 0 && bilBaris.includes(val), `${nm}: "${q[0]}" berjumlah ${val} ada di baris diagram (${bilBaris.join(",")})`);
          else cek(nama.length === 0 && dt.some((b) => Math.floor(b.strokes.length / 5) >= NILAI9[q[1]]), `${nm}: "${q[0]}" ada ikat lima sebanyak itu di baris diagram`);
        }
      }
      /* 4) Hitungan tertulis di gambar (a + b = c). */
      for (const o of objs.filter((q) => q.t === "teks" && q.isi)) {
        const r = hitungAritm(o.isi);
        if (!r) continue;
        stat.aritm += 1;
        cek(r.ok, `${nm}: hitungan "${o.isi}" benar`);
        if (r.ops.length === 1 && r.ops[0] === "+" && r.angka[0] % 5 === 0 && r.angka[0] <= 10 && bilBaris.length) cek(bilBaris.includes(r.hasil), `${nm}: hasil "${o.isi}" ada di baris diagram (${bilBaris.join(",")})`);
        else if (bilBaris.length) cek(r.angka.every((x) => bilBaris.includes(x)), `${nm}: bilangan di "${o.isi}" ada di baris diagram (${bilBaris.join(",")})`);
        if (r.ops.length >= 2) cek(hadir.size === r.angka.length && [...r.angka].sort((p, q) => p - q).join() === [...nilaiHadir].sort((p, q) => p - q).join(), `${nm}: tiap bilangan di "${o.isi}" adalah banyak satu kategori`);
      }
      /* 5) Jawaban latihan dan terapan: satu pilihan benar dan disorot, dihitung dari gambar dan data. */
      {
        const cp = [1, 2, 3].map((q) => ({ t: ketemu(objs, `c${q}-t`)?.isi, s: ketemu(objs, `c${q}-k`)?.sorot })).filter((c) => c.t !== undefined);
        if (cp.length) {
          stat.pilihan += 1;
          cek(new Set(cp.map((c) => c.t)).size === cp.length && cp.length >= 2, `${nm}: pilihan jawaban berbeda (${cp.map((c) => c.t).join(", ")})`);
          const dipilih = cp.filter((c) => c.s);
          cek(/^betul/.test(t) ? dipilih.length === 1 : dipilih.length === 0, `${nm}: jawaban disorot tepat pada ketukan "Betul!"`);
          const tanya = ketemu(objs, "tanya")?.isi ?? "";
          cek(tanya.length > 0, `${nm}: pertanyaan tampil bersama pilihan`);
          let benar = null;
          let m;
          if ((m = /^berapa (?:banyak|frekuensi) ([a-z-]+)\?$/.exec(tanya))) {
            const b = dt.find((q) => q.label?.isi === m[1]);
            cek(!!b && dt.length === 1, `${nm}: tepat satu baris turus untuk "${tanya}"`);
            benar = cp.filter((c) => Number(c.t) === b?.strokes.length).map((c) => c.t);
            cek(b && b.strokes.length === DATA[m[1]], `${nm}: garis turus ${m[1]} sama dengan data`);
          } else if ((m = /^paling (sedikit|banyak) yang mana\?$/.exec(tanya))) {
            const nilai = dt.map((q) => ({ nama: q.label.isi, n: q.strokes.length }));
            const ekstrem = m[1] === "sedikit" ? Math.min(...nilai.map((q) => q.n)) : Math.max(...nilai.map((q) => q.n));
            const tepat = nilai.filter((q) => q.n === ekstrem).map((q) => q.nama);
            cek(tepat.length === 1, `${nm}: satu jenis yang ${m[1] === "sedikit" ? "paling sedikit" : "paling banyak"} (${tepat.join(",")})`);
            benar = cp.filter((c) => tepat.includes(c.t)).map((c) => c.t);
          } else if ((m = /^berapa lebihnya ([a-z-]+) dari ([a-z-]+)\?$/.exec(tanya))) {
            const b1 = dt.find((q) => q.label?.isi === m[1]);
            const b2 = dt.find((q) => q.label?.isi === m[2]);
            cek(!!b1 && !!b2, `${nm}: dua baris turus untuk "${tanya}"`);
            benar = cp.filter((c) => Number(c.t) === (b1?.strokes.length ?? 0) - (b2?.strokes.length ?? 0)).map((c) => c.t);
          } else if (/^apa yang dilakukan dulu\?$/.test(tanya)) {
            benar = cp.filter((c) => /^pilah/.test(c.t)).map((c) => c.t);
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
/** Kolom awal garis turus dalam satu baris (untuk memeriksa kesejajaran baris). */
function g0(b) {
  const s = b.strokes.find((q) => q.i % 5 === 0);
  return s ? s.o.x : null;
}

console.log(`Pemeriksaan: ${stat.dt} keadaan diagram, ${stat.baris} baris turus, ${stat.garis} garis, ${stat.ikat} ikat lima, ${stat.benda} kelompok benda, ${stat.klaim} klaim di suara, ${stat.aritm} hitungan tertulis, ${stat.pilihan} pilihan, ${stat.jawaban} jawaban`);
for (const [nama, batas] of [["dt", 60], ["baris", 150], ["garis", 800], ["ikat", 80], ["benda", 50], ["klaim", 60], ["aritm", 8], ["pilihan", 8], ["jawaban", 6]]) cek(stat[nama] >= batas, `uji menjalankan cukup banyak pemeriksaan ${nama} (${stat[nama]} >= ${batas})`);

/* ------------------------------ Aturan pemilik ------------------------------ */
{
  const MANDIRI = /kerja kelompok|berkelompok|secara berkelompok|diskusi kelompok|sekelompok|kelompokmu|kelompok belajar|bersama kelompok|tanya teman|survei|karet gelang|uang tabungan|uang logam|\bpaman\b|\btika\b|\bteman\w*|\bkawan\w*|sekawan|sahabat|depan kelas|bersama kelas|seluruh kelas|\bkelas\b|berpasangan dengan (teman|kawan)|bekerja berpasangan|secara berpasangan|bermain bersama|bertanya kepada|buat ceritamu|buku|menulis di|menuliskan di|tulis di|tuliskan di|menulis|menggambar|gambarlah|gambar sendiri|\bbawa(lah)?\b|membawa|dibawa|\bkertas\b|\bpensil\b|\bpulpen\b|\bspidol\b|\bgunting\b|ambil (benda|pensil|kelereng|bola|sedotan|balon|kerucut|kubus)|\bjari\b|menyuruh|suruh|jengkal|telapak|\bdepa\b|penggaris|\bkoin\b|di sekitar|di rumah|di kelas|centimeter|\bmeter\b|kakimu|tanganmu|badanmu|\braba\w*|\bmeraba|\btubuh|\blengan|lingkari|guru kelas|orang tua|\bayah\b|\bibu guru|bapak guru|\bloker\b|singapura|\bmeja\b|di sekitarmu|\brumah\b|\bpisau\b|\bkelompok\b|dua tangan|tangan (kiri|kanan)|angkat|mengangkat|\bkantin|\blidi\b|kelas dua|survei|presentasi|mempresentasikan/i;
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
  const DAFTAR = ["Mengelompokkan data", "Membuat diagram turus", "Membaca diagram turus"];
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Mengelompokkan data/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => DAFTAR.includes(t)), DAFTAR, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara) && !/\d/.test(DAFTAR.join(" ")), "sapaan materi: tanpa angka");
  const sapLuar = adegan(U, "sapaan");
  cek(/cara lain/i.test(L.teksTerlihat(akhirAdegan(sapLuar, 1)).join(" | ")) && /metode-luar|Metode luar/.test(sapLuar.sumber), "sapaan metode luar: pengumuman cara lain");
  const ringkasBerkas = new URL("../src/data/kelas2-bab8-ringkas.json", import.meta.url);
  const sumberRingkas = existsSync(ringkasBerkas) ? JSON.parse(readFileSync(ringkasBerkas, "utf8")).subBab?.A : null;
  const sementara = new URL("../.tmp-k2b8s/A.json", import.meta.url);
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
    // Isi tabel dihitung ulang dari diagram turus hewan ternak pada video materi: banyak ikat lima, garis sisa, dan banyaknya.
    sama(T.kolom, ["Ikat lima", "Garis", "Banyak"], "tabel susun: kolom ikat lima, garis, banyak");
    sama(T.baris.map((b) => b.label), ["Kambing", "Sapi", "Bebek"], "tabel susun: baris kambing, sapi, bebek");
    const dtHewan = bacaDt(akhirAdegan(adegan(M_VIDEO, "turus-hewan")));
    for (const b of T.baris) {
      const baris = dtHewan.find((q) => q.label?.isi === b.label.toLowerCase());
      cek(!!baris, `tabel susun: baris sumber ${b.label} ada di diagram turus hewan`);
      if (!baris) continue;
      stat.tabel += 1;
      const n = baris.strokes.length;
      sama(b.sel, [String(Math.floor(n / 5)), String(n % 5), String(n)], `tabel susun: baris ${b.label} dihitung ulang dari garis turus`);
    }
    const KATA_LARANG = /buku|halaman|kunci|kerja kelompok|berkelompok|\bteman|kawan|kelas\b|kertas|pensil|\bbawa\b|menggambar|menulis|depan kelas|\bluas\b|keliling|di rumah|survei|karet gelang|uang tabungan|di sekitar|\bpaman\b|\btika\b|\blili\b|loker|ibu guru|singapura|tally|frequency|category sort|pisau|koin|\brumah\b|\bayah\b|\bpak\b|\bkantin|\blidi\b/i;
    cek(!KATA_LARANG.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: tanpa kata terlarang dan tanpa nama Inggris, kelompok, teman, kelas, buku, kertas, pensil, pisau, loker, Ibu guru");
    cek(peta.every((s) => ![...s.teks, ...(s.ikon ?? "")].some((c) => c.codePointAt(0) > 0x1fa95)), "peta susun: emoji paling tinggi Emoji 12");
  } else cek(false, "peta dan tabel susun: .tmp-k2b8s/A.json atau kelas2-bab8-ringkas.json subBab.A.petaSusun ada");
}

console.log(`Tabel susun dihitung ulang: ${stat.tabel} baris`);
console.log(`${VIDEO.map((v) => `${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, a) => t + a.ketukan.length, 0)} ketukan, ${kataVideo(v)} kata (sekitar ${(kataVideo(v) / 120).toFixed(1)} menit diputar)`).join("\n")}`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
