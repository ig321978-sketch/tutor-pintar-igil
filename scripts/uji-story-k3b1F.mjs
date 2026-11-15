// Uji Story Kelas 3 Bab 1 Sub-Bab F (Perkalian sampai 100): dua video (materi kurikulum dan metode luar) dengan mesin animasi Story.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar (nama metode hanya Indonesia),
// dan HITUNG ULANG dari struktur adegan: banyak kelompok dan isi tiap kelompok (semua kelompok sama banyak, isi di dalam kotak), banyak baris dan kolom susunan, lompatan garis bilangan (titik mendarat,
// langkah sama, letak lengkung), rumus a x b = c (cocok dengan gambar), jumlah berulang (suku sama dengan isi, hasil tepat), tukar tempat, klaim di suara (banyak kelompok, isi, jumlah semuanya,
// kali, tambah, lompatan, mendarat), jawaban latihan (satu pilihan benar dan disorot), isi tabel susun, dan emoji paling tinggi Emoji 12.
// Jalankan: node --no-warnings scripts/uji-story-k3b1F.mjs
import { readFileSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k3b1F-video.ts");
const U1 = await import("../src/components/modul/story/k3b1F-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K3B1F, V.VIDEO_LUAR_K3B1F];
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
const M_VIDEO = V.VIDEO_MATERI_K3B1F;
const U = V.VIDEO_LUAR_K3B1F;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /Kelompok Sama(?!\s+banyak)|Susunan Baris Kolom|Lompat Hitung|metode luar|metode dari luar/i;
const NAMA_INGGRIS = /Equal Groups|\bArray\b|Skip Counting|Multiplication|Basic facts|Singapore Math|Van de Walle/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar ");
  for (const m of U1.NAMA_METODE_ID) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE_ID, ["Kelompok Sama", "Susunan Baris Kolom", "Lompat Hitung"], "nama Indonesia metode luar (namaId data)");
  cek(!NAMA_INGGRIS.test(materi) && !NAMA_INGGRIS.test(luar), "nama metode hanya bahasa Indonesia (tanpa Equal Groups, Array, Skip Counting)");
  const TERLARANG = /buku|panduan guru|hlm|halaman|rubrik|salah ketik|salah cetak|tambahan video|contoh video|temuan|pertemuan|loker|ibu guru|singapura/i;
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
  cek(M_VIDEO.id === "k3b1F-materi" && U.id === "k3b1F-luar", "id video k3b1F-materi dan k3b1F-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,cerita-kue,ulang-kue,bunga-kira,sama-atau-tidak,mobil-wei,mobil-balik,tukar-tempat,empat-langkah,apel-halim,soal-igil,soal-malosi,latihan-satu,latihan-dua,latihan-tiga,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-kelompok,luar-kelompok-terapan,luar-susunan,luar-susunan-terapan,luar-lompat,luar-lompat-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 3 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 3 lalu penutup");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  cek(U.adegan.length - 3 === 6, "video metode luar: konsep dan penerapan untuk tiga metode (6 adegan di antara pembuka dan ringkasan)");
  for (const kata of ["Latihan", "Igil", "Halim", "Kira", "Wei", "Upe", "Malosi", "perkalian", "penjumlahan berulang", "banyak kelompok", "isi tiap kelompok", "sama banyak", "ditukar tempatnya", "soal cerita", "langkah", "kue", "bunga", "mobil", "apel", "kelereng", "bintang", "stroberi", "balon", "jeruk", "piring", "vas", "kotak"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Batas sub-bab: perkalian sampai seratus, tanpa satuan baku, pembagian, atau ratusan.
  const BOCOR = /kilogram|\bgram\b|\bkg\b|pembagian|dibagi|ribu|\bratus|÷|−|\bmeter\b|\bliter\b/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa satuan baku, pembagian, ratusan`);
    for (const a of v.adegan) for (const i of a.ketukan.keys()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 100, `${v.id}/${a.id}#${i + 1}: angka di gambar paling besar seratus ("${t}")`);
  }
  const ketMateri = M_VIDEO.adegan.reduce((t, ad) => t + ad.ketukan.length, 0);
  cek(totalKetukan >= 70 && ketMateri >= 70, `total ketukan cukup dalam (${totalKetukan}; materi ${ketMateri})`);
  const kataMateri = kataVideo(M_VIDEO);
  cek(kataMateri / 120 >= 8 && kataMateri / 120 <= 13, `durasi materi diputar 8 sampai 13 menit (${(kataMateri / 120).toFixed(1)} menit)`);
  cek(kataVideo(U) / 120 >= 3, `durasi video luar paling sedikit 3 menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
}


/* ------------------------------ Kelompok, susunan, lompatan, rumus, dan kalimat dihitung ulang dari struktur adegan ------------------------------ */
const G = await import("../src/components/modul/story/k3b1F-gambar.ts");
const stat = { kel: 0, benda: 0, tak: 0, susun: 0, lompat: 0, rumus: 0, jumlah: 0, tukar: 0, klaim: 0, pilihan: 0, jawaban: 0, tabel: 0 };
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
const EMOJI_JENIS = new Set(Object.values(G.EMO));
const CONT = "piring|kotak|vas|keranjang|kelompok";
cek(Object.values(G.EMO).every((e) => ![...e].some((c) => c.codePointAt(0) > 0x1fa95)), "emoji benda paling tinggi Emoji 12");

const kumpul = (objs, reBox, reIsi) => {
  const peta = new Map();
  const ambil = (g) => {
    if (!peta.has(g)) peta.set(g, { g, box: null, isi: [] });
    return peta.get(g);
  };
  for (const o of objs) {
    let m;
    if ((m = reBox.exec(o.id))) ambil(Number(m[1])).box = o;
    else if ((m = reIsi.exec(o.id))) ambil(Number(m[1])).isi.push({ j: Number(m[2]), o });
  }
  const out = [...peta.values()].sort((p, q) => p.g - q.g);
  for (const g of out) g.isi.sort((p, q) => p.j - q.j);
  return out;
};
const bacaKel = (objs) => kumpul(objs, /^kg-b(\d+)$/, /^it-(\d+)-(\d+)$/);
const bacaTak = (objs) => kumpul(objs, /^tg-b(\d+)$/, /^tg-(\d+)-(\d+)$/);
const dalam = (b, o) => o.x > b.x && o.x < b.x + b.w && o.y > b.y && o.y < b.y + b.h;
const tindih = (p, q) => p.x < q.x + q.w && q.x < p.x + p.w && p.y < q.y + q.h && q.y < p.y + p.h;
const bacaSusunan = (objs) => {
  const b = new Map();
  for (const o of objs) {
    const m = /^ar-(\d+)-(\d+)$/.exec(o.id);
    if (m) {
      const r = Number(m[1]);
      if (!b.has(r)) b.set(r, []);
      b.get(r).push({ c: Number(m[2]), o });
    }
  }
  return [...b.entries()].sort((p, q) => p[0] - q[0]).map(([r, a]) => ({ r, sel: a.sort((p, q) => p.c - q.c) }));
};
const bacaLompat = (objs) => {
  const tanda = [];
  const lompat = [];
  const nama = new Map();
  const angka = new Map();
  for (const o of objs) {
    let m;
    if ((m = /^lj-t(\d+)$/.exec(o.id))) tanda.push({ v: Number(m[1]), o });
    else if ((m = /^lj-n(\d+)$/.exec(o.id))) angka.set(Number(m[1]), o);
    else if ((m = /^lj-p(\d+)$/.exec(o.id))) lompat.push({ k: Number(m[1]), o });
    else if ((m = /^lj-s(\d+)$/.exec(o.id))) nama.set(Number(m[1]), o);
  }
  tanda.sort((p, q) => p.v - q.v);
  lompat.sort((p, q) => p.k - q.k);
  return { tanda, lompat, nama, angka, ada: tanda.length + lompat.length > 0 };
};
const hitungAritm = (s) => {
  const m = /^(\d+(?: [+-] \d+)+) = (\d+)$/.exec(s);
  if (!m) return null;
  const t = m[1].split(" ");
  let v = Number(t[0]);
  for (let i = 1; i < t.length; i += 2) v = t[i] === "+" ? v + Number(t[i + 1]) : v - Number(t[i + 1]);
  return { ok: v === Number(m[2]) };
};

for (const v of VIDEO) {
  for (const a of v.adegan) {
    a.ketukan.forEach((kt, i) => {
      const objs = akhirAdegan(a, i);
      const nm = `${v.id}/${a.id}#${i + 1}`;
      const t = kt.suara.toLowerCase();
      const kel = bacaKel(objs);
      const tak = bacaTak(objs);
      const sus = bacaSusunan(objs);
      const lj = bacaLompat(objs);
      const isiKel = kel.length ? kel[0].isi.length : null;
      const R = sus.length;
      const C = sus.length ? sus[0].sel.length : null;
      const J = lj.lompat.length;
      const S = J ? Number((lj.nama.get(1)?.isi ?? "+0").slice(1)) : null;
      const total = kel.length ? kel.length * isiKel : sus.length ? R * C : J ? J * S : null;
      const lihat = [];
      for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) lihat.push(...L.teksTerlihat(L.keadaanStory(a, i, p)));
      const tampak = (s) => lihat.some((x) => x.includes(s));

      /* 1) Kelompok sama banyak: semua kelompok berisi sama banyak, isi di dalam kotak, satu jenis gambar. */
      if (kel.length) {
        stat.kel += 1;
        const isi = kel.map((g) => g.isi.length);
        cek(kel.every((g, q) => g.g === q) && kel.every((g) => g.box), `${nm}: kelompok bernomor 0, 1, 2 ... berurutan dan punya kotak`);
        cek(new Set(isi).size === 1, `${nm}: semua kelompok berisi sama banyak (${isi.join(",")})`);
        cek(kel.every((g) => g.isi.every((s, q) => s.j === q)), `${nm}: isi kelompok bernomor berurutan`);
        cek(kel.length >= 2 && kel.length <= 6 && isi[0] >= 2 && isi[0] <= 7 && kel.length * isi[0] <= 100, `${nm}: ${kel.length} kelompok x ${isi[0]} wajar (sampai seratus)`);
        const jenis = new Set(kel.flatMap((g) => g.isi.map((s) => s.o.isi)));
        cek(jenis.size === 1 && [...jenis].every((e) => EMOJI_JENIS.has(e)), `${nm}: semua isi kelompok satu jenis gambar`);
        for (const g of kel) {
          if (!g.box) continue;
          for (const s of g.isi) {
            stat.benda += 1;
            cek(dalam(g.box, s.o), `${nm}: ${s.o.id} di dalam kotak kelompok ${g.g}`);
          }
        }
        for (let p = 0; p < kel.length; p += 1) for (let q = p + 1; q < kel.length; q += 1) if (kel[p].box && kel[q].box) cek(!tindih(kel[p].box, kel[q].box), `${nm}: kotak kelompok ${p} dan ${q} tidak bertumpuk`);
      }
      /* 2) Kelompok tidak sama banyak (perbandingan). */
      if (tak.length) {
        stat.tak += 1;
        const isi = tak.map((g) => g.isi.length);
        cek(tak.length >= 2 && new Set(isi).size > 1, `${nm}: kelompok perbandingan memang tidak sama banyak (${isi.join(",")})`);
        for (const g of tak) {
          const nom = ketemu(objs, `tg-n${g.g}`);
          if (nom) cek(Number(nom.isi) === g.isi.length, `${nm}: angka kelompok ${g.g} (${nom.isi}) sama dengan isinya (${g.isi.length})`);
          if (g.box) for (const s of g.isi) cek(dalam(g.box, s.o), `${nm}: ${s.o.id} di dalam kotak`);
        }
      }
      /* 3) Susunan baris kolom: persegi panjang, baris utuh, nama baris dan kolom cocok. */
      if (sus.length) {
        stat.susun += 1;
        cek(sus.every((b, q) => b.r === q) && sus.every((b) => b.sel.length === C && b.sel.every((s, q) => s.c === q)), `${nm}: susunan persegi panjang dengan baris utuh`);
        cek(R >= 2 && C >= 2 && R * C <= 100, `${nm}: susunan ${R} x ${C} wajar`);
        const xKolom = Array.from({ length: C }, (_, c) => sus.map((b) => b.sel[c]?.o.x));
        const yBaris = sus.map((b) => b.sel.map((s) => s.o.y));
        cek(xKolom.every((xs) => xs.every((x) => x === xs[0])), `${nm}: benda sekolom sama letak mendatarnya`);
        cek(yBaris.every((ys) => ys.every((y) => y === ys[0])), `${nm}: benda sebaris sama tingginya`);
        const jarakX = xKolom.slice(1).map((xs, c) => xs[0] - xKolom[c][0]);
        const jarakY = yBaris.slice(1).map((ys, r) => ys[0] - yBaris[r][0]);
        cek(jarakX.every((d) => Math.abs(d - jarakX[0]) < 0.01 && d > 0) && jarakY.every((d) => Math.abs(d - jarakY[0]) < 0.01 && d > 0), `${nm}: jarak antarkolom dan antarbaris sama`);
        const bg = ketemu(objs, "ar-bg");
        cek(!!bg, `${nm}: susunan punya latar`);
        if (bg) cek(sus.every((b) => b.sel.every((s) => dalam(bg, s.o))), `${nm}: semua benda susunan di dalam latar`);
        const nb = ketemu(objs, "ar-nb");
        const nk = ketemu(objs, "ar-nk");
        if (nb) cek(nb.isi === `${R} baris`, `${nm}: nama baris "${nb.isi}" sesuai ${R} baris`);
        if (nk) cek(nk.isi === `${C} kolom`, `${nm}: nama kolom "${nk.isi}" sesuai ${C} kolom`);
        const jenis = new Set(sus.flatMap((b) => b.sel.map((s) => s.o.isi)));
        cek(jenis.size === 1 && [...jenis].every((e) => EMOJI_JENIS.has(e)), `${nm}: semua benda susunan satu jenis gambar`);
      }
      /* 4) Lompat hitung: lompatan sama besar, titik mendarat kelipatan, letak lengkung dari garis bilangan. */
      if (lj.ada) {
        stat.lompat += 1;
        cek(!!ketemu(objs, "lj-g"), `${nm}: garis bilangan ada`);
        const nama = lj.lompat.map((p) => lj.nama.get(p.k)?.isi);
        cek(lj.lompat.every((p, q) => p.k === q + 1) && nama.every((n) => /^\+\d+$/.test(n ?? "") && n === nama[0]), `${nm}: lompatan bernomor berurutan dan sama besar (${nama.join(",")})`);
        const t0 = lj.tanda.find((q) => q.v === 0);
        cek(!!t0, `${nm}: tanda nol ada`);
        if (J) {
          cek(S >= 2 && S <= 10 && J >= 1 && J * S <= 100, `${nm}: ${J} lompatan sebesar ${S} wajar`);
          for (const tq of lj.tanda) {
            cek(tq.v % S === 0 && tq.v <= J * S, `${nm}: tanda ${tq.v} kelipatan ${S} dan tidak melewati ${J * S}`);
            cek(lj.angka.get(tq.v)?.isi === String(tq.v), `${nm}: angka tanda ${tq.v} sesuai`);
          }
          const dengan = lj.tanda.filter((q) => q.v > 0);
          if (t0 && dengan.length) {
            const sk = (dengan[0].o.x - t0.o.x) / dengan[0].v;
            cek(dengan.every((q) => Math.abs((q.o.x - t0.o.x) / q.v - sk) < 0.01), `${nm}: tanda-tanda sejajar skala yang sama`);
            for (const p of lj.lompat) {
              const n = bilangan(p.o.d ?? "");
              const awal = t0.o.x + (p.k - 1) * S * sk;
              const akhir = t0.o.x + p.k * S * sk;
              cek(Math.abs(p.o.x - awal) < 0.2 && Math.abs(p.o.x + n[4] - akhir) < 0.2, `${nm}: lompatan ${p.k} dari titik ${(p.k - 1) * S} ke ${p.k * S} sesuai garis bilangan`);
            }
          }
        }
      }
      /* 5) Rumus di gambar: a x b = c benar dan cocok dengan gambar; jumlah berulang; tukar tempat. */
      for (const o of objs.filter((q) => q.t === "teks" && q.isi)) {
        let m;
        if ((m = /^(\d+) × (\d+)(?: = (\d+))?$/.exec(o.isi))) {
          const p = Number(m[1]);
          const q = Number(m[2]);
          stat.rumus += 1;
          if (m[3] !== undefined) cek(p * q === Number(m[3]), `${nm}: hitungan "${o.isi}" benar`);
          if (o.id === "eq") {
            if (kel.length) cek(p === kel.length && q === isiKel, `${nm}: "${o.isi}" cocok dengan ${kel.length} kelompok berisi ${isiKel}`);
            else if (sus.length) cek(p === R && q === C, `${nm}: "${o.isi}" cocok dengan ${R} baris ${C} kolom`);
            else if (J) cek(p === J && q === S && (m[3] === undefined || Number(m[3]) === J * S), `${nm}: "${o.isi}" cocok dengan ${J} lompatan sebesar ${S}`);
            else cek(false, `${nm}: rumus "${o.isi}" tanpa gambar kelompok, susunan, atau lompatan`);
          }
        } else if ((m = /^(\d+) × (\d+) = (\d+) × (\d+)$/.exec(o.isi))) {
          stat.tukar += 1;
          cek(Number(m[1]) * Number(m[2]) === Number(m[3]) * Number(m[4]) && m[1] === m[4] && m[2] === m[3], `${nm}: tukar tempat "${o.isi}" benar (hasil sama, bilangan bertukar)`);
        } else if (o.id === "ps") {
          m = /^(\d+(?: \+ \d+)+)(?: = (\d+))?$/.exec(o.isi);
          cek(!!m, `${nm}: bentuk jumlah berulang "${o.isi}"`);
          if (m) {
            stat.jumlah += 1;
            const suku = m[1].split(" + ").map(Number);
            if (m[2] !== undefined) cek(suku.reduce((x, y) => x + y, 0) === Number(m[2]), `${nm}: jumlah berulang "${o.isi}" benar`);
            if (kel.length) cek(suku.every((x) => x === isiKel) && suku.length <= kel.length, `${nm}: tiap suku "${o.isi}" sama dengan isi kelompok (${isiKel}) dan paling banyak ${kel.length} suku`);
            else if (sus.length) cek(suku.every((x) => x === C) && suku.length <= R, `${nm}: tiap suku "${o.isi}" sama dengan banyak kolom (${C}) dan paling banyak ${R} suku`);
            else cek(false, `${nm}: jumlah berulang "${o.isi}" tanpa gambar kelompok atau susunan`);
          }
        } else {
          const r = hitungAritm(o.isi);
          if (r) cek(r.ok, `${nm}: hitungan "${o.isi}" benar`);
        }
      }
      /* 6) Kalimat di suara dihitung ulang dari gambar: banyak kelompok, isi, kali, tambah, jumlah semuanya, lompatan, mendarat. */
      for (const m of t.matchAll(new RegExp(`\\b(${NUMW}) kali (${NUMW})\\b(?: juga)?(?: sama dengan (${NUMW})(?! kali))?`, "g"))) {
        stat.klaim += 1;
        const p = nilaiKata(m[1]);
        const q = nilaiKata(m[2]);
        cek(tampak(`${p} × ${q}`), `${nm}: "${m[0]}" tampak di gambar sebagai ${p} × ${q}`);
        if (m[3]) cek(p * q === nilaiKata(m[3]), `${nm}: "${m[0]}" hasil kali benar (${p * q})`);
      }
      for (const m of t.matchAll(new RegExp(`\\b((?:${NUMW})(?: tambah (?:${NUMW}))+) sama dengan (${NUMW})`, "g"))) {
        stat.klaim += 1;
        const suku = m[1].split(" tambah ").map(nilaiKata);
        cek(suku.reduce((x, y) => x + y, 0) === nilaiKata(m[2]), `${nm}: "${m[0]}" jumlahnya benar`);
        cek(tampak(suku.join(" + ")), `${nm}: "${m[0]}" tampak di gambar sebagai ${suku.join(" + ")}`);
      }
      for (const m of t.matchAll(new RegExp(`\\b(${NUMW}) (${CONT})\\b`, "g"))) {
        if (m[1] === "satu") continue;
        const n = nilaiKata(m[1]);
        const jml = kel.length || tak.length;
        if (!jml) continue;
        stat.klaim += 1;
        cek(n === jml, `${nm}: "${m[0]}" sama dengan banyak kelompok di gambar (${jml})`);
      }
      for (const m of t.matchAll(new RegExp(`\\b(${NUMW}) baris\\b`, "g"))) {
        if (m[1] === "satu" || !sus.length) continue;
        stat.klaim += 1;
        cek(nilaiKata(m[1]) === R, `${nm}: "${m[0]}" sama dengan banyak baris (${R})`);
      }
      for (const m of t.matchAll(new RegExp(`\\b(${NUMW}) kolom\\b`, "g"))) {
        if (m[1] === "satu" || !sus.length) continue;
        stat.klaim += 1;
        cek(nilaiKata(m[1]) === C, `${nm}: "${m[0]}" sama dengan banyak kolom (${C})`);
      }
      for (const m of t.matchAll(new RegExp(`\\b(${NUMW}) lompatan\\b`, "g"))) {
        if (m[1] === "satu" || !J) continue;
        stat.klaim += 1;
        cek(nilaiKata(m[1]) === J, `${nm}: "${m[0]}" sama dengan banyak lompatan (${J})`);
      }
      for (const m of t.matchAll(new RegExp(`(?:berisi|isinya) (${NUMW})`, "g"))) {
        if (kel.length) {
          stat.klaim += 1;
          cek(nilaiKata(m[1]) === isiKel, `${nm}: "${m[0]}" sama dengan isi tiap kelompok (${isiKel})`);
        } else if (sus.length) {
          stat.klaim += 1;
          cek(nilaiKata(m[1]) === C, `${nm}: "${m[0]}" sama dengan isi tiap baris (${C})`);
        }
      }
      for (const m of t.matchAll(new RegExp(`\\b(?:semuanya|seluruhnya|jumlahnya|hasilnya)(?: ada| adalah| sama dengan)? (${NUMW})`, "g"))) {
        stat.klaim += 1;
        cek(total !== null && nilaiKata(m[1]) === total, `${nm}: "${m[0]}" sama dengan jumlah di gambar (${total})`);
      }
      for (const m of t.matchAll(new RegExp(`sebesar (${NUMW})`, "g"))) {
        stat.klaim += 1;
        cek(J > 0 && nilaiKata(m[1]) === S, `${nm}: "${m[0]}" sama dengan besar lompatan (${S})`);
      }
      for (const m of t.matchAll(new RegExp(`mendarat di (${NUMW})`, "g"))) {
        stat.klaim += 1;
        const n = nilaiKata(m[1]);
        cek(J > 0 && n % S === 0 && n / S >= 1 && n / S <= J, `${nm}: "${m[0]}" adalah titik mendarat (kelipatan ${S} sampai ${J * S})`);
      }
      /* 7) Jawaban latihan dan terapan: satu pilihan benar dan disorot, dihitung dari gambar. */
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
          if (tanya === "berapa semuanya?") {
            cek(total !== null, `${nm}: ada gambar yang dihitung untuk "${tanya}"`);
            benar = cp.filter((c) => Number(c.t) === total).map((c) => c.t);
          } else if (tanya === "perkalian yang cocok?") {
            cek(kel.length > 0, `${nm}: ada kelompok untuk "${tanya}"`);
            benar = cp.filter((c) => c.t === `${kel.length} × ${isiKel}`).map((c) => c.t);
          } else if (tanya === "mendarat di mana?") {
            cek(J > 0, `${nm}: ada lompatan untuk "${tanya}"`);
            benar = cp.filter((c) => Number(c.t) === J * S).map((c) => c.t);
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

console.log(`Pemeriksaan: ${stat.kel} keadaan kelompok, ${stat.benda} benda dalam kelompok, ${stat.tak} perbandingan tak sama, ${stat.susun} keadaan susunan, ${stat.lompat} keadaan lompatan, ${stat.rumus} rumus kali, ${stat.jumlah} jumlah berulang, ${stat.tukar} tukar tempat, ${stat.klaim} klaim di suara, ${stat.pilihan} pilihan, ${stat.jawaban} jawaban`);
for (const [nama, batas] of [["kel", 30], ["benda", 300], ["tak", 2], ["susun", 6], ["lompat", 8], ["rumus", 20], ["jumlah", 15], ["tukar", 2], ["klaim", 60], ["pilihan", 6], ["jawaban", 6]]) cek(stat[nama] >= batas, `uji menjalankan cukup banyak pemeriksaan ${nama} (${stat[nama]} >= ${batas})`);

/* ------------------------------ Aturan pemilik ------------------------------ */
{
  // "kelompok" BOLEH di sub-bab ini hanya sebagai istilah matematika (banyak kelompok x isi tiap kelompok); ajakan kerja kelompok tetap dilarang.
  const MANDIRI = /kerja kelompok|berkelompok|secara berkelompok|diskusi kelompok|sekelompok|kelompokmu|kelompok belajar|bersama kelompok|tanya teman|survei|karet gelang|uang tabungan|uang logam|\bpaman\b|\btika\b|\bteman\w*|\bkawan\w*|sekawan|sahabat|depan kelas|bersama kelas|seluruh kelas|\bkelas\b|berpasangan dengan (teman|kawan)|bekerja berpasangan|secara berpasangan|bermain bersama|bertanya kepada|buat ceritamu|buku|menulis di|menuliskan di|tulis di|tuliskan di|menulis|menggambar|gambarlah|gambar sendiri|\bbawa(lah)?\b|membawa|dibawa|\bkertas\b|\bpensil\b|\bpulpen\b|\bspidol\b|\bgunting\b|ambil (benda|pensil|kelereng|bola|sedotan|balon|kerucut|kubus)|\bjari\b|menyuruh|suruh|jengkal|telapak|\bdepa\b|penggaris|\bkoin\b|di sekitar|di rumah|di kelas|centimeter|\bmeter\b|kakimu|tanganmu|badanmu|\braba\w*|\bmeraba|\btubuh|\blengan|lingkari|guru kelas|orang tua|\bayah\b|\bibu guru|bapak guru|\bloker\b|singapura|\bmeja\b|di sekitarmu|\brumah\b|\bpisau\b|dua tangan|tangan (kiri|kanan)|angkat|mengangkat|\bkantin|\blidi\b|kelas dua|survei|presentasi|mempresentasikan/i;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      const semua = [a.judul, a.sumber];
      a.ketukan.forEach((kt, i) => {
        semua.push(kt.suara);
        semua.push(...L.teksTerlihat(L.keadaanStory(a, i, 9999)));
      });
      const kena = semua.filter((t) => MANDIRI.test(t) || /Lili/.test(t));
      cek(kena.length === 0, `${v.id}/${a.id}: narasi mandiri dan digital, tanpa kerja kelompok, teman, kelas, buku, kertas, pensil, kantin, menulis, atau tokoh di luar enam (${kena.slice(0, 2).join(" | ")})`);
    }
  }
}

/* ------------------------------ Sapaan, peta susun, dan tabel susun ------------------------------ */
{
  const sap = adegan(M_VIDEO, "sapaan");
  const DAFTAR = ["Penjumlahan berulang", "Membaca perkalian", "Menukar tempat bilangan"];
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Penjumlahan berulang/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => DAFTAR.includes(t)), DAFTAR, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara) && !/\d/.test(DAFTAR.join(" ")), "sapaan materi: tanpa angka");
  const sapLuar = adegan(U, "sapaan");
  cek(/cara lain/i.test(L.teksTerlihat(akhirAdegan(sapLuar, 1)).join(" | ")) && /metode-luar|Metode luar/.test(sapLuar.sumber), "sapaan metode luar: pengumuman cara lain");
  const ringkasBerkas = new URL("../src/data/kelas3-bab1-ringkas.json", import.meta.url);
  const sumberRingkas = existsSync(ringkasBerkas) ? JSON.parse(readFileSync(ringkasBerkas, "utf8")).subBab?.F : null;
  const sementara = new URL("../.tmp-k3b1s/F.json", import.meta.url);
  const F = sumberRingkas?.petaSusun && sumberRingkas?.tabelSusun ? sumberRingkas : existsSync(sementara) ? JSON.parse(readFileSync(sementara, "utf8")) : null;
  if (F) {
    const peta = F.petaSusun.simpul;
    const anak = (id) => peta.filter((s) => s.induk === id).map((s) => s.teks);
    const akar = peta.filter((s) => s.induk === null);
    cek(akar.length === 3, "peta susun: tiga cabang dari pusat");
    sama(anak(akar[0].id), DAFTAR, "peta susun: cabang pertama sama dengan daftar sapaan");
    sama([anak(akar[1].id).length, anak(akar[2].id).length, peta.length], [3, 2, 11], "peta susun: 3 cara, 2 hasil, 11 simpul");
    sama(peta.map((s) => s.nomor), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], "peta susun: nomor 1 sampai 11");
    cek(peta.every((s) => s.teks.length <= 28) && new Set(peta.map((s) => s.teks)).size === peta.length, "peta susun: teks <= 28 huruf dan unik");
    cek(F.petaSusun.pusat.judul.length <= 28, "peta susun: judul pusat <= 28 huruf");
    cek(!/\d/.test(F.petaSusun.pusat.suara) && !/\d/.test(F.petaSusun.petunjuk) && peta.every((s) => !/\d/.test(s.petunjuk ?? "")), "peta susun: suara dan petunjuk tanpa digit");
    cek(F.petaSusun.pusat.judul.length > 8 && /\?$/.test(F.petaSusun.pusat.judul), "peta susun: pusat berupa masalah (pertanyaan) sub-bab");
    const T = F.tabelSusun;
    cek(T.baris.length >= 3 && T.baris.length <= 5 && T.kolom.length >= 3 && T.kolom.length <= 4, "tabel susun: 3 sampai 5 baris dan 3 sampai 4 kolom");
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 26 && (s.match(/\d+/g) ?? []).length <= 1)), "tabel susun: sel <= 26 huruf dan paling banyak satu angka per sel");
    cek(T.baris.every((b) => b.label.split(/\s+/).every((w) => w.length <= 8)), "tabel susun: kata terpanjang kolom label <= 8 huruf");
    cek(!/\d/.test(T.suara) && !/\d/.test(T.petunjuk), "tabel susun: suara dan petunjuk tanpa digit");
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 8)), "tabel susun: sel pendek supaya margin teks >= 5 px di 405 px");
    // Isi tabel dihitung ulang dari kelompok pada adegan materi: banyak kelompok, isi tiap kelompok, dan jumlah.
    sama(T.kolom, ["Kelompok", "Isi", "Jumlah"], "tabel susun: kolom kelompok, isi, jumlah");
    const SUMBER_TABEL = { Kue: "cerita-kue", Bunga: "bunga-kira", Mobil: "mobil-wei", Apel: "apel-halim" };
    sama(T.baris.map((b) => b.label), ["Kue", "Bunga", "Mobil", "Apel"], "tabel susun: baris kue, bunga, mobil, apel");
    for (const b of T.baris) {
      const ad = adegan(M_VIDEO, SUMBER_TABEL[b.label]);
      cek(!!ad, `tabel susun: adegan sumber ${b.label} ada`);
      if (!ad) continue;
      const kelAdegan = bacaKel(akhirAdegan(ad));
      cek(kelAdegan.length > 0, `tabel susun: adegan ${SUMBER_TABEL[b.label]} memuat kelompok`);
      if (!kelAdegan.length) continue;
      cek(kelAdegan[0].isi.every((s) => s.o.isi === G.EMO[b.label.toLowerCase()]), `tabel susun: benda baris ${b.label} sesuai gambarnya`);
      stat.tabel += 1;
      const n = kelAdegan.length;
      const isi = kelAdegan[0].isi.length;
      sama(b.sel, [String(n), String(isi), String(n * isi)], `tabel susun: baris ${b.label} dihitung ulang dari kelompok pada adegan`);
    }
    const KATA_LARANG = /buku|halaman|kerja kelompok|berkelompok|teman|kawan|kelas|kertas|pensil|bawa|menggambar|menulis|depan kelas|luas|keliling|di rumah|survei|karet gelang|uang tabungan|di sekitar|paman|tika|lili|loker|ibu guru|singapura|equal groups|array|skip counting|pisau|koin|rumah|ayah|pak|kantin|lidi|sahabat|kerikil|gelas/i;
    cek(!KATA_LARANG.test(JSON.stringify({ p: F.petaSusun, t: F.tabelSusun })), "peta dan tabel susun: tanpa kata terlarang dan tanpa nama Inggris, kerja kelompok, teman, kelas, buku, kertas, pensil, pisau, loker, Ibu guru");
    cek(peta.every((s) => ![...s.teks, ...(s.ikon ?? "")].some((c) => c.codePointAt(0) > 0x1fa95)), "peta susun: emoji paling tinggi Emoji 12");
  } else cek(false, "peta dan tabel susun: .tmp-k3b1s/F.json atau kelas3-bab1-ringkas.json subBab.F.petaSusun ada");
}

console.log(`Tabel susun dihitung ulang: ${stat.tabel} baris`);
console.log(`${VIDEO.map((v) => `${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, a) => t + a.ketukan.length, 0)} ketukan, ${kataVideo(v)} kata (sekitar ${(kataVideo(v) / 120).toFixed(1)} menit diputar)`).join("\n")}`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
