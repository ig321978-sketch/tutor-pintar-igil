// Uji Story Kelas 2 Bab 7 Sub-Bab A (Menghitung, Membaca, dan Menulis Bilangan sampai 100): dua video (materi kurikulum dan metode luar) dengan mesin animasi Story.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar (nama metode hanya Indonesia),
// dan HITUNG ULANG dari struktur adegan: banyak benda = wadah x sepuluh + satuan lepas, hitungan sepuluh demi sepuluh di bawah wadah, nama bilangan di suara cocok dengan gambar,
// banyak puluhan dan satuan yang disebut suara dan tulisan, papan nilai tempat (puluhan kiri, satuan kanan), nama bilangan cocok dengan lambang (26 dan 62 tidak tertukar), pasangan bilangan,
// selisih tebakan dan tebakan yang lebih dekat, tabel seratus (isi sel = 10 x (baris - 1) + kolom, panah turun satu baris tambah sepuluh dan ke kanan tambah satu), garis hitung (selisih tetap),
// jawaban latihan (satu pilihan benar dan disorot), isi tabel susun, dan emoji paling tinggi Emoji 12.
// Jalankan: node --no-warnings scripts/uji-story-k2b7A.mjs
import { readFileSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k2b7A-video.ts");
const U1 = await import("../src/components/modul/story/k2b7A-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K2B7A, V.VIDEO_LUAR_K2B7A];
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
const M_VIDEO = V.VIDEO_MATERI_K2B7A;
const U = V.VIDEO_LUAR_K2B7A;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /Hitung sampai 100|Puluhan dan Satuan|Tabel Seratus|metode luar|metode dari luar/i;
const NAMA_INGGRIS = /Count to 100|Tens and Ones|Hundred Chart|Compare Tens|Number Line|Symbols|Singapore Math|Van de Walle|Place value/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar ");
  for (const m of U1.NAMA_METODE_ID) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE_ID, ["Hitung sampai 100", "Puluhan dan Satuan", "Tabel Seratus"], "nama Indonesia metode luar (namaId data)");
  cek(!NAMA_INGGRIS.test(materi) && !NAMA_INGGRIS.test(luar), "nama metode hanya bahasa Indonesia (tanpa Count to 100, Tens and Ones, Hundred Chart)");
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
  cek(M_VIDEO.id === "k2b7A-materi" && U.id === "k2b7A-luar", "id video k2b7A-materi dan k2b7A-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,cerita-kue,bungkus,lompat,rambutan,kelereng,nilai-tempat,pasangan,baca-tulis,tertukar,perkiraan,buktikan,selisih,latihan-satu,latihan-dua,latihan-tiga,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-hitung,luar-hitung-terapan,luar-puluhan,luar-puluhan-terapan,luar-tabel,luar-tabel-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 3 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 3 lalu penutup");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  cek(U.adegan.length - 3 === 6, "video metode luar: konsep dan penerapan untuk tiga metode (6 adegan di antara pembuka dan ringkasan)");
  for (const kata of ["Latihan", "Igil", "Halim", "Kira", "Wei", "Upe", "Malosi", "bungkus", "puluhan", "satuan", "nilai tempat", "pasangan bilangan", "seratus", "kue cubit", "rambutan", "kelereng", "ikan", "tebakan", "selisih", "lebih dekat", "mengelompokkan", "kiri", "kanan", "dua puluh enam", "enam puluh dua"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Batas bab: bilangan sampai seratus, tanpa satuan baku, rumus, perkalian, ratusan.
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

/* ------------------------------ Kelompok benda, nilai tempat, tebakan, tabel seratus, dan kalimat dihitung ulang dari struktur adegan ------------------------------ */
const G = await import("../src/components/modul/story/k2b7A-gambar.ts");
const stat = { kel: 0, wadah: 0, lepas: 0, hitung: 0, klaim: 0, senyawa: 0, pasang: 0, nt: 0, kartu: 0, ps: 0, tebak: 0, deret: 0, sel: 0, panah: 0, jawaban: 0, tabel: 0 };
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const U9 = "satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan";
const U10 = `${U9}|sepuluh`;
const NILAI9 = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9, sepuluh: 10 };
const NUM_RE = new RegExp(`\\b(seratus|sepuluh|sebelas|(?:${U9}) belas|(?:${U9}) puluh(?: (?:${U9}))?)(?![a-z])`, "g");
const nilaiKata = (s) => {
  const t = s.toLowerCase().trim();
  if (t === "seratus") return 100;
  if (t === "sepuluh") return 10;
  if (t === "sebelas") return 11;
  let m = /^(\w+) belas$/.exec(t);
  if (m) return 10 + NILAI9[m[1]];
  m = /^(\w+) puluh(?: (\w+))?$/.exec(t);
  if (m) return 10 * NILAI9[m[1]] + (m[2] ? NILAI9[m[2]] : 0);
  return null;
};
/** Nama bilangan utuh (mis. "lima puluh tiga") menjadi angka; null bila bukan nama bilangan. */
const parseKata = (s) => {
  const t = s.toLowerCase().trim();
  const m = [...t.matchAll(NUM_RE)];
  return m.length === 1 && m[0][0] === t ? nilaiKata(t) : null;
};
// Nama bilangan dari gambar.kataBil harus bolak-balik sama dengan pembaca di uji ini.
for (let n = 10; n <= 100; n += 1) sama(parseKata(G.kataBil(n)), n, `kataBil(${n}) = "${G.kataBil(n)}"`);

const kelompokDari = (objs) => {
  const peta = new Map();
  const ambil = (id) => {
    if (!peta.has(id)) peta.set(id, { id, w: [], s: [], n: [] });
    return peta.get(id);
  };
  for (const o of objs) {
    let m = /^([a-z0-9]+)-w(\d+)$/.exec(o.id);
    if (m && o.t === "kotak") ambil(m[1]).w.push({ i: Number(m[2]), o });
    m = /^([a-z0-9]+)-s(\d+)$/.exec(o.id);
    if (m) ambil(m[1]).s.push({ i: Number(m[2]), o });
    m = /^([a-z0-9]+)-n(\d+)$/.exec(o.id);
    if (m && o.t === "teks") ambil(m[1]).n.push({ i: Number(m[2]), o });
  }
  return [...peta.values()].filter((g) => g.w.length + g.s.length > 0).map((g) => ({ ...g, nw: g.w.length, ns: g.s.length, total: g.w.length * 10 + g.s.length }));
};
const kotakLepas = (o) => (o.t === "bulat" ? [o.x - o.r, o.y - o.r, o.x + o.r, o.y + o.r] : o.t === "kotak" ? [o.x, o.y, o.x + o.w, o.y + o.h] : [o.x - 6, o.y - 10, o.x + 6, o.y + 2]);
const tumpang = (p, q) => Math.min(p[2], q[2]) - Math.max(p[0], q[0]) > 0.5 && Math.min(p[3], q[3]) - Math.max(p[1], q[1]) > 0.5;
const angkaTeks = (t) => (t.match(/\d+/g) ?? []).map(Number);
const SEL = { x0: 15, cw: 27, ch: 17 };

for (const v of VIDEO) {
  for (const a of v.adegan) {
    a.ketukan.forEach((kt, i) => {
      const objs = akhirAdegan(a, i);
      const nm = `${v.id}/${a.id}#${i + 1}`;
      const gs = kelompokDari(objs);
      // Angka yang tampak sepanjang ketukan (semua kata), untuk memastikan bilangan yang disuarakan ada di gambar.
      const tampak = new Set([10, 100]);
      for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) for (const b of angkaTeks(o.isi)) tampak.add(b);
      /* 1) Kelompok benda: wadah penuh sepuluh, satuan lepas, hitungan, dan jumlah benda dihitung dari struktur. */
      for (const g of gs) {
        stat.kel += 1;
        stat.wadah += g.nw;
        stat.lepas += g.ns;
        const wi = g.w.map((q) => q.i).sort((p, q) => p - q);
        const si = g.s.map((q) => q.i).sort((p, q) => p - q);
        cek(wi.every((q, r) => q === r + 1) && si.every((q, r) => q === r + 1), `${nm}: wadah dan satuan lepas kelompok ${g.id} bernomor 1, 2, 3 ... berurutan`);
        cek(g.ns <= 10 && (g.nw === 0 || g.ns <= 9), `${nm}: kelompok ${g.id} punya paling banyak sembilan satuan lepas bila ada wadah (${g.ns})`);
        cek(g.nw <= 10 && g.total <= 100, `${nm}: kelompok ${g.id} paling banyak seratus benda (${g.total})`);
        for (const w of g.w) {
          const batang = w.o.h >= 30;
          const lb = ketemu(objs, `${g.id}-wt${w.i}`);
          if (batang) cek(!lb, `${nm}: batang ${g.id}-w${w.i} tanpa label sepuluh`);
          else cek(!!lb && lb.isi === "10" && Math.abs(lb.x - (w.o.x + w.o.w / 2)) < 0.01 && lb.y > w.o.y && lb.y < w.o.y + w.o.h + 2, `${nm}: bungkus ${g.id}-w${w.i} berlabel sepuluh di tengahnya`);
        }
        for (let p = 0; p < g.w.length; p += 1) for (let q = p + 1; q < g.w.length; q += 1) cek(!tumpang(kotakLepas(g.w[p].o), kotakLepas(g.w[q].o)), `${nm}: wadah ${g.id} tidak bertumpuk`);
        for (let p = 0; p < g.s.length; p += 1) {
          for (let q = p + 1; q < g.s.length; q += 1) cek(!tumpang(kotakLepas(g.s[p].o), kotakLepas(g.s[q].o)), `${nm}: satuan lepas ${g.id} tidak bertumpuk`);
          for (const w of g.w) cek(!tumpang(kotakLepas(g.s[p].o), kotakLepas(w.o)), `${nm}: satuan lepas ${g.id} tidak menimpa wadah`);
        }
        // Hitungan di dekat wadah ke-i bernilai sepuluh x i dan terletak tepat di atas atau di bawahnya.
        for (const n of g.n) {
          stat.hitung += 1;
          const w = g.w.find((q) => q.i === n.i);
          cek(!!w, `${nm}: hitungan ${g.id}-n${n.i} punya wadah`);
          if (!w) continue;
          cek(Number(n.o.isi) === 10 * n.i, `${nm}: hitungan ${g.id}-n${n.i} bernilai ${10 * n.i} (ada ${n.o.isi})`);
          cek(Math.abs(n.o.x - (w.o.x + w.o.w / 2)) < 0.01 && (n.o.y < w.o.y || n.o.y > w.o.y + w.o.h), `${nm}: hitungan ${g.id}-n${n.i} sejajar dengan wadahnya`);
        }
      }
      const poolKel = new Set([...tampak]);
      for (const g of gs) {
        for (let q = 0; q <= g.nw; q += 1) poolKel.add(10 * q);
        for (let q = 0; q <= g.ns; q += 1) poolKel.add(10 * g.nw + q);
      }
      const kecil = new Set([1, 10, ...[...tampak].filter((q) => q <= 10)]);
      for (const g of gs) {
        kecil.add(g.nw);
        for (let q = 1; q <= g.nw; q += 1) kecil.add(q);
        kecil.add(g.ns);
      }
      const maxW = Math.max(0, ...gs.map((g) => g.nw));
      /* 2) Bilangan di suara: nama bilangan sepuluh ke atas harus berasal dari gambar atau hitungan kelompok. */
      const t = kt.suara.toLowerCase();
      for (const m of t.matchAll(NUM_RE)) {
        stat.senyawa += 1;
        const n = nilaiKata(m[0]);
        cek(poolKel.has(n), `${nm}: bilangan "${m[0]}" (${n}) di suara tampak di gambar atau cocok dengan kelompok benda`);
      }
      // Banyak wadah, satuan lepas, dan pasangan puluhan-satuan di suara cocok dengan gambar.
      for (const m of t.matchAll(new RegExp(`\\b(${U10}) (bungkus|keranjang|kantong|batang)( puluhan)?( penuh)?(?![a-z])`, "g"))) {
        stat.klaim += 1;
        const n = NILAI9[m[1]];
        cek(gs.length > 0, `${nm}: "${m[0]}" ada wadah di gambar`);
        if (m[4]) cek(gs.some((g) => g.nw === n), `${nm}: "${m[0]}" cocok dengan banyak wadah penuh (${gs.map((g) => g.nw).join(",")})`);
        else cek(n >= 1 && n <= maxW, `${nm}: "${m[0]}" tidak melebihi banyak wadah (${maxW})`);
      }
      for (const m of t.matchAll(new RegExp(`\\b(${U10}) (?:[a-z]+ )?lepas\\b`, "g"))) {
        stat.klaim += 1;
        cek(gs.some((g) => g.ns === NILAI9[m[1]]), `${nm}: "${m[0]}" cocok dengan banyak satuan lepas (${gs.map((g) => g.ns).join(",")})`);
      }
      for (const m of t.matchAll(new RegExp(`\\b(${U10}) kotak satuan\\b`, "g"))) {
        stat.klaim += 1;
        cek(gs.some((g) => g.ns === NILAI9[m[1]]), `${nm}: "${m[0]}" cocok dengan banyak kotak satuan (${gs.map((g) => g.ns).join(",")})`);
      }
      for (const m of t.matchAll(new RegExp(`\\b(${U9}) puluhan (?:dan )?(${U9}) satuan\\b`, "g"))) {
        stat.pasang += 1;
        cek(gs.some((g) => g.nw === NILAI9[m[1]] && g.ns === NILAI9[m[2]]), `${nm}: "${m[0]}" cocok dengan satu kelompok benda (${gs.map((g) => `${g.nw}/${g.ns}`).join(",")})`);
      }
      for (const m of t.matchAll(new RegExp(`\\b(${U10}) puluhan(?! (?:dan )?(?:${U9}) satuan)`, "g"))) {
        stat.klaim += 1;
        cek(kecil.has(NILAI9[m[1]]), `${nm}: "${m[0]}" cocok dengan banyak puluhan di gambar`);
      }
      for (const m of t.matchAll(new RegExp(`\\b(${U10}) satuan\\b`, "g"))) {
        stat.klaim += 1;
        cek(kecil.has(NILAI9[m[1]]), `${nm}: "${m[0]}" cocok dengan banyak satuan di gambar`);
      }
      /* 3) Tulisan di gambar: kalimat angka dihitung ulang. */
      for (const o of objs.filter((q) => q.t === "teks" && (q.op ?? 1) > 0 && q.isi)) {
        const s = o.isi;
        const m = /^(\d+) = (\d+) puluhan (\d+) satuan$/.exec(s);
        if (m) {
          stat.pasang += 1;
          cek(Number(m[1]) === 10 * Number(m[2]) + Number(m[3]), `${nm}: tulisan "${s}" benar`);
        }
        for (const mm of s.matchAll(/(\d+) puluhan (\d+) satuan/g)) {
          stat.pasang += 1;
          cek(gs.some((g) => g.nw === Number(mm[1]) && g.ns === Number(mm[2])), `${nm}: tulisan "${mm[0]}" cocok dengan kelompok benda (${gs.map((g) => `${g.nw}/${g.ns}`).join(",")})`);
        }
        for (const mm of s.matchAll(/(\d+) puluhan = (\d+)/g)) {
          stat.klaim += 1;
          cek(Number(mm[2]) === 10 * Number(mm[1]), `${nm}: tulisan "${mm[0]}" benar`);
        }
        for (const mm of s.matchAll(/(\d+) (?:bungkus|keranjang|kantong) = (\d+)/g)) {
          stat.klaim += 1;
          cek(Number(mm[2]) === 10 * Number(mm[1]), `${nm}: tulisan "${mm[0]}" benar`);
        }
        for (const mm of s.matchAll(/(\d+) \+ (\d+) = (\d+)/g)) {
          stat.klaim += 1;
          cek(Number(mm[1]) + Number(mm[2]) === Number(mm[3]), `${nm}: tulisan "${mm[0]}" benar`);
        }
        for (const mm of s.matchAll(/^(\d+) puluhan$/g)) {
          stat.klaim += 1;
          cek(gs.some((g) => g.nw === Number(mm[1])), `${nm}: tulisan "${mm[0]}" cocok dengan banyak wadah (${gs.map((g) => g.nw).join(",")})`);
        }
      }
      /* 4) Papan nilai tempat: angka puluhan dan satuan cocok dengan kelompok benda. */
      const np = ketemu(objs, "nt-p");
      const ns = ketemu(objs, "nt-s");
      for (const o of [np, ns]) if (o) cek(/^\d$/.test(o.isi), `${nm}: angka papan nilai tempat satu angka`);
      if (np || ns) stat.nt += 1;
      if (np && ns) cek(gs.some((g) => g.nw === Number(np.isi) && g.ns === Number(ns.isi)), `${nm}: papan nilai tempat ${np.isi} dan ${ns.isi} cocok dengan kelompok benda`);
      const nn = ketemu(objs, "nt-n");
      if (nn) {
        cek(!!np && !!ns && Number(nn.isi) === 10 * Number(np.isi) + Number(ns.isi), `${nm}: bilangan ${nn.isi} dari papan nilai tempat`);
        cek(!!np && !!ns && ns.x > np.x && !!ketemu(objs, "nt-pk") && !!ketemu(objs, "nt-sk") && ketemu(objs, "nt-sk").x > ketemu(objs, "nt-pk").x, `${nm}: puluhan di kiri dan satuan di kanan`);
      }
      /* 5) Kartu bilangan: nama harus cocok dengan lambang; tanda benar atau salah menurut banyak benda di gambar. */
      const idKartuBil = [...new Set(objs.map((o) => /^(bl\d+)-a$/.exec(o.id)?.[1]).filter(Boolean))];
      for (const id of idKartuBil) {
        stat.kartu += 1;
        const la = ketemu(objs, `${id}-a`);
        const lb = ketemu(objs, `${id}-b`);
        cek(!!lb && parseKata(lb.isi) === Number(la.isi), `${nm}: nama "${lb?.isi}" cocok dengan lambang ${la.isi}`);
        if (gs.length) {
          const cocok = gs.some((g) => g.total === Number(la.isi));
          cek(cocok ? !!ketemu(objs, `${id}-ok`) && !ketemu(objs, `${id}-x`) : !!ketemu(objs, `${id}-x`) && !ketemu(objs, `${id}-ok`), `${nm}: kartu ${la.isi} bertanda ${cocok ? "benar" : "salah"} sesuai banyak benda (${gs.map((g) => g.total).join(",")})`);
        }
      }
      /* 6) Pasangan bilangan. */
      const pa = ketemu(objs, "ps-a");
      if (pa) {
        stat.ps += 1;
        const pb = ketemu(objs, "ps-b");
        const pc = ketemu(objs, "ps-c");
        if (pb && pc) {
          cek(Number(pb.isi) + Number(pc.isi) === Number(pa.isi) && Number(pb.isi) % 10 === 0 && Number(pc.isi) < 10, `${nm}: pasangan ${pb.isi} dan ${pc.isi} membentuk ${pa.isi}`);
          const pe = ketemu(objs, "ps-e");
          if (pe) cek(pe.isi === `${pb.isi} + ${pc.isi} = ${pa.isi}`, `${nm}: jumlah pasangan "${pe.isi}"`);
          cek(pb.x < pc.x, `${nm}: pasangan puluhan di kiri dan satuan di kanan`);
        }
      }
      /* 7) Tebakan dan selisih. */
      const tbs = [1, 2].map((q) => ({ q, a: ketemu(objs, `tb${q}-a`), nama: ketemu(objs, `tb${q}-nm`)?.isi, d: ketemu(objs, `tb${q}-d`), ok: ketemu(objs, `tb${q}-ok`) })).filter((q) => q.a);
      const real = ketemu(objs, "tb-r");
      if (tbs.length) stat.tebak += 1;
      if (real) {
        for (const q of tbs) {
          if (q.d) cek(Number(/\d+/.exec(q.d.isi)[0]) === Math.abs(Number(q.a.isi) - Number(real.isi)), `${nm}: selisih ${q.d.isi} tebakan ${q.a.isi} dari ${real.isi}`);
        }
        const sel = tbs.map((q) => Math.abs(Number(q.a.isi) - Number(real.isi)));
        for (const q of tbs.filter((x) => x.ok)) {
          const d = Math.abs(Number(q.a.isi) - Number(real.isi));
          cek(tbs.length >= 2 && sel.filter((x) => x < d).length === 0 && sel.filter((x) => x === d).length === 1, `${nm}: tebakan ${q.a.isi} bertanda lebih dekat memang selisihnya paling kecil (${sel.join(",")})`);
        }
        for (const m of t.matchAll(/tebakan (kira|malosi|wei|upe|halim) lebih dekat/g)) {
          const q = tbs.find((x) => x.nama?.toLowerCase() === m[1]);
          const d = q ? Math.abs(Number(q.a.isi) - Number(real.isi)) : -1;
          cek(!!q && tbs.every((x) => x === q || Math.abs(Number(x.a.isi) - Number(real.isi)) > d), `${nm}: "${m[0]}" benar menurut selisih (${sel.join(",")})`);
        }
        for (const m of t.matchAll(new RegExp(`selisih(?:nya)?(?: (kira|malosi|wei|upe|halim))? (?:hanya )?(${U9}|seratus|sepuluh|sebelas|(?:${U9}) belas|(?:${U9}) puluh(?: (?:${U9}))?)(?![a-z])`, "g"))) {
          stat.klaim += 1;
          const n = NILAI9[m[2]] ?? nilaiKata(m[2]);
          const dd = tbs.map((q) => ({ nama: q.nama?.toLowerCase(), d: Math.abs(Number(q.a.isi) - Number(real.isi)) }));
          if (m[1]) cek(dd.some((x) => x.nama === m[1] && x.d === n), `${nm}: "${m[0]}" cocok dengan selisih tebakan (${dd.map((x) => `${x.nama}:${x.d}`).join(",")})`);
          else cek(dd.some((x) => x.d === n), `${nm}: "${m[0]}" cocok dengan salah satu selisih (${dd.map((x) => x.d).join(",")})`);
        }
      }
      /* 8) Tabel seratus: isi sel = 10 x (baris - 1) + kolom, letak sel teratur, dan panah satu langkah. */
      const sel = objs.filter((o) => /^th-\d+-\d+$/.test(o.id));
      let rAwal = 99;
      let yAtas = 0;
      if (sel.length) {
        const bar = sel.map((o) => Number(o.id.split("-")[1]));
        rAwal = Math.min(...bar);
        yAtas = ketemu(objs, `th-${rAwal}-1-k`).y;
        for (const o of sel) {
          stat.sel += 1;
          const [, r, c] = o.id.split("-").map(Number);
          const kk = ketemu(objs, `${o.id}-k`);
          cek(c >= 1 && c <= 10 && r >= 1 && r <= 10, `${nm}: sel ${o.id} di dalam tabel`);
          cek(o.isi === "?" || Number(o.isi) === 10 * (r - 1) + c, `${nm}: isi sel baris ${r} kolom ${c} adalah ${10 * (r - 1) + c} (ada ${o.isi})`);
          cek(!!kk && kk.x === SEL.x0 + (c - 1) * SEL.cw && kk.y === yAtas + (r - rAwal) * SEL.ch && kk.w === SEL.cw && kk.h === SEL.ch, `${nm}: kotak sel ${o.id} teratur`);
          cek(!!kk && Math.abs(o.x - (kk.x + kk.w / 2)) < 0.01 && o.y > kk.y && o.y < kk.y + kk.h, `${nm}: angka sel ${o.id} di tengah kotaknya`);
        }
        const barisAda = [...new Set(bar)].sort((p, q) => p - q);
        cek(barisAda.every((q, r) => q === rAwal + r) && barisAda.every((q) => sel.filter((o) => o.id.startsWith(`th-${q}-`)).length === 10), `${nm}: tabel seratus berisi baris penuh berurutan`);
      }
      const cellDi = (x, y) => ({ c: Math.floor((x - SEL.x0) / SEL.cw) + 1, r: rAwal + Math.floor((y - yAtas) / SEL.ch) });
      const pnh = ketemu(objs, "th-p");
      let tujuanTabel = null;
      if (pnh && sel.length) {
        stat.panah += 1;
        const dari = cellDi(pnh.x, pnh.y);
        const ke = cellDi(pnh.x + pnh.x2, pnh.y + pnh.y2);
        tujuanTabel = ke;
        const dr = ke.r - dari.r;
        const dc = ke.c - dari.c;
        cek((dr === 1 && dc === 0) || (dr === 0 && dc === 1), `${nm}: panah tabel satu langkah (turun satu baris atau satu kotak ke kanan)`);
        if (/turun satu baris/.test(t)) cek(dr === 1 && dc === 0, `${nm}: suara "turun satu baris" cocok dengan panah`);
        if (/satu kotak ke kanan/.test(t)) cek(dr === 0 && dc === 1, `${nm}: suara "satu kotak ke kanan" cocok dengan panah`);
        const beda = 10 * (ke.r - 1) + ke.c - (10 * (dari.r - 1) + dari.c);
        if (/bertambah sepuluh/.test(t)) cek(beda === 10, `${nm}: "bertambah sepuluh" cocok dengan panah (${beda})`);
        if (/bertambah satu/.test(t)) cek(beda === 1, `${nm}: "bertambah satu" cocok dengan panah (${beda})`);
        cek(!!ketemu(objs, `th-${dari.r}-${dari.c}`) && !!ketemu(objs, `th-${ke.r}-${ke.c}`), `${nm}: ujung panah tabel tepat di sel`);
      }
      /* 9) Garis hitung (deret): selisih tetap, tanda +d cocok, bilangan yang ditanyakan dihitung dari deret. */
      const sn = objs.filter((o) => /^gh-n\d+$/.test(o.id)).sort((p, q) => Number(p.id.slice(4)) - Number(q.id.slice(4)));
      let deretLast = null;
      if (sn.length) {
        stat.deret += 1;
        sn.forEach((o, q) => cek(o.id === `gh-n${q + 1}` && !!ketemu(objs, `gh-k${q + 1}`), `${nm}: deret bernomor berurutan`));
        const nil = sn.map((o) => (o.isi === "?" ? null : Number(o.isi)));
        const bedaArr = [];
        for (let q = 1; q < nil.length; q += 1) if (nil[q] !== null && nil[q - 1] !== null) bedaArr.push(nil[q] - nil[q - 1]);
        const d = bedaArr[0];
        cek(d !== undefined && (d === 1 || d === 10) && bedaArr.every((x) => x === d), `${nm}: deret naik dengan selisih tetap satu atau sepuluh (${bedaArr.join(",")})`);
        for (let q = 1; q < sn.length; q += 1) {
          const dt = ketemu(objs, `gh-d${q}`);
          cek(!!dt && dt.isi === `+${d}`, `${nm}: tanda antar kotak ${q} berisi +${d}`);
        }
        const penuh = nil.map((x, q) => (x === null ? (q > 0 && nil[q - 1] !== null ? nil[q - 1] + d : nil[q + 1] - d) : x));
        deretLast = penuh[penuh.length - 1];
        cek(nil.filter((x) => x === null).length <= 1, `${nm}: paling banyak satu bilangan yang ditanyakan`);
        if (/sepuluh demi sepuluh/.test(t)) cek(d === 10, `${nm}: "sepuluh demi sepuluh" cocok dengan deret (selisih ${d})`);
        if (/satu demi satu/.test(t)) cek(d === 1, `${nm}: "satu demi satu" cocok dengan deret (selisih ${d})`);
      }
      /* 10) Jawaban latihan dan terapan: satu pilihan benar dan disorot, dihitung dari gambar. */
      {
        const cp = [1, 2, 3].map((q) => ({ t: ketemu(objs, `c${q}-t`)?.isi, s: ketemu(objs, `c${q}-k`)?.sorot })).filter((c) => c.t !== undefined);
        if (cp.length) {
          cek(new Set(cp.map((c) => c.t)).size === cp.length && cp.length >= 2, `${nm}: pilihan jawaban berbeda (${cp.map((c) => c.t).join(", ")})`);
          const dipilih = cp.filter((c) => c.s);
          const betul = /^betul/.test(t);
          cek(betul ? dipilih.length === 1 : dipilih.length === 0, `${nm}: jawaban disorot tepat pada ketukan "Betul!"`);
          const tanya = ketemu(objs, "tanya")?.isi ?? "";
          cek(tanya.length > 0, `${nm}: pertanyaan tampil bersama pilihan`);
          // Jawaban benar dihitung ulang dari gambar menurut jenis pertanyaan.
          let benarSet = null;
          if (/^berapa banyak/.test(tanya)) {
            cek(gs.length === 1, `${nm}: tepat satu kelompok benda untuk pertanyaan banyak benda`);
            benarSet = cp.filter((c) => Number(c.t) === gs[0]?.total).map((c) => c.t);
          } else if (/dibaca apa/.test(tanya)) {
            const lm = ketemu(objs, "lm");
            benarSet = cp.filter((c) => parseKata(c.t) === Number(lm?.isi)).map((c) => c.t);
          } else if (/tebakan siapa/.test(tanya)) {
            const dd = tbs.map((q) => ({ nama: q.nama, d: Math.abs(Number(q.a.isi) - Number(real?.isi)) }));
            const kecilD = Math.min(...dd.map((x) => x.d));
            const arr = dd.filter((x) => x.d === kecilD);
            benarSet = arr.length === 1 ? [arr[0].nama] : ["sama dekat"];
          } else if (/bilangan berikutnya/.test(tanya)) {
            benarSet = cp.filter((c) => parseKata(c.t) === deretLast).map((c) => c.t);
          } else if (/tanda tanya/.test(tanya)) {
            benarSet = tujuanTabel ? cp.filter((c) => Number(c.t) === 10 * (tujuanTabel.r - 1) + tujuanTabel.c).map((c) => c.t) : null;
          }
          cek(benarSet !== null && benarSet.length === 1, `${nm}: tepat satu pilihan benar untuk "${tanya}" (${benarSet})`);
          if (benarSet && benarSet.length === 1) {
            stat.jawaban += 1;
            if (dipilih.length === 1) cek(dipilih[0].t === benarSet[0], `${nm}: jawaban yang disorot "${dipilih[0].t}" sama dengan hitungan ulang "${benarSet[0]}"`);
          }
        }
      }
    });
  }
}

console.log(`Pemeriksaan: ${stat.kel} keadaan kelompok benda, ${stat.wadah} wadah, ${stat.lepas} satuan lepas, ${stat.hitung} hitungan, ${stat.senyawa} nama bilangan di suara, ${stat.klaim} klaim banyak, ${stat.pasang} pasangan puluhan-satuan, ${stat.nt} papan nilai tempat, ${stat.kartu} kartu bilangan, ${stat.ps} pasangan bilangan, ${stat.tebak} tebakan, ${stat.deret} deret, ${stat.sel} sel tabel seratus, ${stat.panah} panah tabel, ${stat.jawaban} jawaban`);
for (const [nama, batas] of [["kel", 45], ["wadah", 150], ["hitung", 25], ["senyawa", 60], ["klaim", 30], ["pasang", 10], ["nt", 3], ["kartu", 8], ["ps", 3], ["tebak", 5], ["deret", 6], ["sel", 150], ["panah", 4], ["jawaban", 6]]) cek(stat[nama] >= batas, `uji menjalankan cukup banyak pemeriksaan ${nama} (${stat[nama]} >= ${batas})`);

/* ------------------------------ Aturan pemilik ------------------------------ */
{
  const MANDIRI = /kerja kelompok|berkelompok|secara berkelompok|diskusi kelompok|sekelompok|kelompokmu|kelompok belajar|bersama kelompok|tanya teman|survei|karet gelang|uang tabungan|uang logam|\bpaman\b|\btika\b|\blili\b|\bteman\w*|\bkawan\w*|sekawan|depan kelas|bersama kelas|seluruh kelas|\bkelas\b|berpasangan dengan (teman|kawan)|bekerja berpasangan|secara berpasangan|bermain bersama|bertanya kepada|buat ceritamu|buku|menulis di|menuliskan di|tulis di|tuliskan di|menggambar|gambarlah|gambar sendiri|\bbawa(lah)?\b|membawa|dibawa|\bkertas\b|\bpensil\b|\bpulpen\b|\bspidol\b|\bgunting\b|ambil (benda|pensil|kelereng|bola|sedotan|balon|kerucut|kubus)|\bjari\b|menyuruh|suruh|jengkal|telapak|\bdepa\b|penggaris|\bkoin\b|di sekitar|di rumah|di kelas|centimeter|\bmeter\b|kakimu|tanganmu|badanmu|\braba\w*|\bmeraba|\btubuh|\blengan|lingkari|coret|guru kelas|orang tua|\bayah\b|\bibu guru|bapak guru|\bloker\b|singapura|\bmeja\b|di sekitarmu|\brumah\b|\bpisau\b|\bkelompok\b|dua tangan|tangan (kiri|kanan)|angkat|mengangkat/i;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      const semua = [a.judul, a.sumber];
      a.ketukan.forEach((kt, i) => {
        semua.push(kt.suara);
        semua.push(...L.teksTerlihat(L.keadaanStory(a, i, 9999)));
      });
      const kena = semua.filter((t) => MANDIRI.test(t));
      cek(kena.length === 0, `${v.id}/${a.id}: narasi mandiri dan digital, tanpa kelompok, teman, kelas, buku, kertas, pensil, gunting, koin, atau benda nyata (${kena.slice(0, 2).join(" | ")})`);
    }
  }
}

/* ------------------------------ Sapaan, peta susun, dan tabel susun ------------------------------ */
{
  const sap = adegan(M_VIDEO, "sapaan");
  const DAFTAR = ["Menghitung puluhan", "Membaca dan menulis bilangan", "Memperkirakan banyak benda"];
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Menghitung puluhan/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => DAFTAR.includes(t)), DAFTAR, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara) && !/\d/.test(DAFTAR.join(" ")), "sapaan materi: tanpa angka");
  const sapLuar = adegan(U, "sapaan");
  cek(/cara lain/i.test(L.teksTerlihat(akhirAdegan(sapLuar, 1)).join(" | ")) && /metode-luar|Metode luar/.test(sapLuar.sumber), "sapaan metode luar: pengumuman cara lain");
  const ringkasBerkas = new URL("../src/data/kelas2-bab7-ringkas.json", import.meta.url);
  const sumberRingkas = existsSync(ringkasBerkas) ? JSON.parse(readFileSync(ringkasBerkas, "utf8")).subBab?.A : null;
  const sementara = new URL("../.tmp-k2b7s/A.json", import.meta.url);
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
    // Isi tabel dihitung ulang dari gambar pada video materi: banyak puluhan, satuan, dan bilangan tiap kelompok benda.
    sama(T.kolom, ["Puluhan", "Satuan", "Bilangan"], "tabel susun: kolom puluhan, satuan, bilangan");
    sama(T.baris.map((b) => b.label), ["Rambutan", "Kelereng", "Ikan"], "tabel susun: baris rambutan, kelereng, ikan");
    const sumberBaris = { Rambutan: ["rambutan", "rb"], Kelereng: ["kelereng", "kl"], Ikan: ["buktikan", "ik"] };
    for (const b of T.baris) {
      const [idAdegan, idKel] = sumberBaris[b.label];
      const ad = adegan(M_VIDEO, idAdegan);
      const g = kelompokDari(akhirAdegan(ad)).find((q) => q.id === idKel);
      cek(!!g, `tabel susun: kelompok sumber baris ${b.label} ada (${idAdegan}/${idKel})`);
      if (!g) continue;
      stat.tabel += 1;
      sama(b.sel, [String(g.nw), String(g.ns), String(g.total)], `tabel susun: baris ${b.label} dihitung ulang dari kelompok benda ${idAdegan}`);
    }
    const KATA_LARANG = /buku|halaman|kunci|kerja kelompok|berkelompok|\bteman|kawan|kelas\b|kertas|pensil|\bbawa\b|menggambar|menulis di|depan kelas|\bluas\b|keliling|di rumah|survei|karet gelang|uang tabungan|di sekitar|\bpaman\b|\btika\b|\blili\b|loker|ibu guru|singapura|count to 100|tens and ones|hundred chart|pisau|koin|\brumah\b|\bayah\b|\bpak\b/i;
    cek(!KATA_LARANG.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: tanpa kata terlarang dan tanpa nama Inggris, kelompok, teman, kelas, buku, kertas, pensil, pisau, loker, Ibu guru");
    cek(peta.every((s) => ![...s.teks, ...(s.ikon ?? "")].some((c) => c.codePointAt(0) > 0x1fa95)), "peta susun: emoji paling tinggi Emoji 12");
  } else cek(false, "peta dan tabel susun: .tmp-k2b7s/A.json atau kelas2-bab7-ringkas.json subBab.A.petaSusun ada");
}

console.log(`Tabel susun dihitung ulang: ${stat.tabel} baris`);
console.log(`${VIDEO.map((v) => `${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, a) => t + a.ketukan.length, 0)} ketukan, ${kataVideo(v)} kata (sekitar ${(kataVideo(v) / 120).toFixed(1)} menit diputar)`).join("\n")}`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
