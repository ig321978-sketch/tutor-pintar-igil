// Uji Story Kelas 2 Bab 5 Sub-Bab C (Seperempat dari Benda Utuh): dua video (materi kurikulum dan metode luar) dengan mesin animasi Story.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar (nama metode hanya Indonesia),
// dan HITUNG ULANG dari struktur adegan: tiap benda yang dibagi digambar sebagai bagian-bagian (jalur tertutup), luas tiap bagian dihitung dari titik sudutnya (rumus tali sepatu).
// Dari luas itu dihitung: banyak bagian, sama besar atau tidak, nilai tiap bagian terhadap seluruh benda (utuh, setengah, seperempat), label 1/2 dan 1/4 pada gambar,
// bagian yang menyala terhadap pecahan yang disebut suara, dua seperempat = setengah, empat seperempat = utuh, setengah dari setengah = seperempat,
// bagian yang tidak sama besar bukan seperempat, bentuk bagian (persegi, segitiga, jalur), garis potong dan garis lipat tepat di batas bagian, jawaban latihan dan terapan, isi tabel susun.
// Jalankan: node --no-warnings scripts/uji-story-k2b5C.mjs
import { readFileSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k2b5C-video.ts");

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
const VIDEO = [V.VIDEO_MATERI_K2B5C, V.VIDEO_LUAR_K2B5C];
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

const U1 = await import("../src/components/modul/story/k2b5C-luar-1.ts");

/* ------------------------------ Pemisahan materi dan metode luar ------------------------------ */
const M_VIDEO = V.VIDEO_MATERI_K2B5C;
const U = V.VIDEO_LUAR_K2B5C;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR_KHAS = /Setengah dari Setengah|Lipat Dua Kali|metode luar|metode dari luar/i;
const NAMA_INGGRIS = /Quartering|Half of Half|Fold Twice|Early fractions|Fraction relation|Paper folding|Singapore Math/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  // Video materi tidak memuat nama metode luar (huruf besar persis) dan kata metode luar; kata "seperempat" dan "setengah dari setengah" adalah materi biasa.
  cek(!/Setengah dari Setengah|Lipat Dua Kali/.test(materi) && !/metode luar|metode dari luar/i.test(materi), "video materi tidak memuat nama metode luar");
  cek(!/lipat dua kali/i.test(materi), "video materi tidak memuat Lipat Dua Kali");
  for (const m of U1.NAMA_METODE_ID) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE_ID, ["Seperempat", "Setengah dari Setengah", "Lipat Dua Kali"], "nama Indonesia metode luar (namaId data)");
  cek(!NAMA_INGGRIS.test(materi) && !NAMA_INGGRIS.test(luar), "nama metode hanya bahasa Indonesia (tanpa Quartering, Half of Half, Fold Twice)");
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
      cek(!/\b(Tika|Lili|Paman|Ibu|Ayah|Bapak|Budi|Ani|Doni|Sinta|Dewi|Rudi|Nina|Andi|Siti|Bu Guru|Pak Guru)\b/.test(semua.join(" | ")), `${v.id}/${a.id}: hanya enam tokoh tetap`);
    }
  }
  cek(M_VIDEO.subjudul === "Materi kurikulum" && U.subjudul === "Tiga metode luar", "subjudul video: Materi kurikulum dan Tiga metode luar");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46), "video materi: label sumber berbentuk Materi: ... dan pendek");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "video metode luar: label sumber metode luar atau ringkasan, pendek");
  cek(M_VIDEO.id === "k2b5C-materi" && U.id === "k2b5C-luar", "id video k2b5C-materi dan k2b5C-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,cerita-martabak,empat-sama,tidak-sama,tiga-bagian,tiga-periksa,setengah-dulu,dua-kali,banyak-cara,dua-seperempat,empat-seperempat,sisa-martabak,tangga,seperempat-benda,karya,latihan-satu,latihan-dua,latihan-tiga,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-seperempat,luar-seperempat-terapan,luar-setengah,luar-setengah-terapan,luar-lipat,luar-lipat-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 3 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 3 lalu penutup");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  cek(U.adegan.length - 3 === 6, "video metode luar: konsep dan penerapan untuk tiga metode (6 adegan di antara pembuka dan ringkasan)");
  for (const kata of ["Latihan", "Kira", "Malosi", "Upe", "Wei", "martabak", "apel", "bolu", "pizza", "puding", "seperempat", "setengah", "utuh", "empat bagian", "sama besar", "tidak sama besar", "dua kali", "setengah dari setengah", "dua seperempat", "empat seperempat"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Pecahan: tanpa luas, keliling, rumus, satuan baku, perkalian, dan bilangan besar.
  const BOCOR = /luas|keliling|rumus|volume|sentimeter|centimeter|\bcm\b|\bmeter\b|diameter|penggaris|ribu|ratus|dikali|perkalian|×|÷|−/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa luas, keliling, rumus, satuan baku, perkalian`);
    for (const a of v.adegan) for (const i of a.ketukan.keys()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 20, `${v.id}/${a.id}#${i + 1}: angka di gambar paling besar dua puluh ("${t}")`);
  }
  const ketMateri = M_VIDEO.adegan.reduce((t, ad) => t + ad.ketukan.length, 0);
  cek(totalKetukan >= 70 && ketMateri >= 70, `total ketukan cukup dalam (${totalKetukan}; materi ${ketMateri})`);
  const kataMateri = kataVideo(M_VIDEO);
  cek(kataMateri / 120 >= 8 && kataMateri / 120 <= 13, `durasi materi diputar 8 sampai 13 menit (${(kataMateri / 120).toFixed(1)} menit)`);
  cek(kataVideo(U) / 120 >= 3, `durasi video luar paling sedikit 3 menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
}

/* ------------------------------ Hitung ulang bagian benda dari koordinat ------------------------------ */
const bilanganPoli = (d) => (d.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);
const poli = (o) => {
  if (o.t !== "jalur") return null;
  const t = titikJalur(o);
  return t;
};
const luasPoli = (p) => {
  let s = 0;
  for (let i = 0; i < p.length; i += 1) {
    const [x1, y1] = p[i];
    const [x2, y2] = p[(i + 1) % p.length];
    s += x1 * y2 - x2 * y1;
  }
  return Math.abs(s) / 2;
};
const pusatPoli = (p) => {
  let l = 0;
  let cx = 0;
  let cy = 0;
  for (let i = 0; i < p.length; i += 1) {
    const [x1, y1] = p[i];
    const [x2, y2] = p[(i + 1) % p.length];
    const c = x1 * y2 - x2 * y1;
    l += c;
    cx += (x1 + x2) * c;
    cy += (y1 + y2) * c;
  }
  return [cx / (3 * l), cy / (3 * l)];
};
const dalamPoli = (p, [x, y]) => {
  let d = false;
  for (let i = 0, j = p.length - 1; i < p.length; j = i, i += 1) {
    const [xi, yi] = p[i];
    const [xj, yj] = p[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) d = !d;
  }
  return d;
};
const jarakKeRuas = ([x, y], [x1, y1], [x2, y2]) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const l2 = dx * dx + dy * dy;
  const t = l2 === 0 ? 0 : Math.max(0, Math.min(1, ((x - x1) * dx + (y - y1) * dy) / l2));
  return Math.hypot(x - (x1 + t * dx), y - (y1 + t * dy));
};
const jarakKeTepi = (p, pt) => Math.min(...p.map((a, i) => jarakKeRuas(pt, a, p[(i + 1) % p.length])));
const mirip = (a, b, tol = 0.015) => Math.abs(a - b) <= tol * Math.max(a, b, 1e-9);
const dekat = (a, b, tol = 0.01) => Math.abs(a - b) <= tol;

/** Kelompok bagian per benda (slug): luas tiap bagian dihitung dari titik sudutnya. */
const kelompok = (objs) => {
  const peta = new Map();
  for (const o of objs) {
    const m = /^pc-([a-z0-9]+)-(\d+)$/.exec(o.id);
    if (!m) continue;
    const pts = poli(o);
    if (!peta.has(m[1])) peta.set(m[1], []);
    peta.get(m[1]).push({ o, no: Number(m[2]), pts, luas: pts ? luasPoli(pts) : 0, sorot: !!o.sorot });
  }
  return [...peta.entries()].map(([slug, ps]) => {
    ps.sort((a, b) => a.no - b.no);
    const total = ps.reduce((t, p) => t + p.luas, 0);
    const rujuk = slug === "ik" ? 4 * Math.min(...ps.map((p) => p.luas)) : total;
    const maks = Math.max(...ps.map((p) => p.luas));
    const mins = Math.min(...ps.map((p) => p.luas));
    return { slug, ps, n: ps.length, total, rujuk, sama: mirip(maks, mins), sorot: ps.filter((p) => p.sorot), fSorot: ps.filter((p) => p.sorot).reduce((t, p) => t + p.luas, 0) / rujuk };
  });
};
const namaPecahan = (f) => (dekat(f, 1) ? "utuh" : dekat(f, 0.5) ? "setengah" : dekat(f, 0.25) ? "seperempat" : "?");
const KATA_BILANGAN = { 1: "satu", 2: "dua", 3: "tiga", 4: "empat", 6: "enam" };
const BILANGAN_KATA = { satu: 1, dua: 2, tiga: 3, empat: 4 };

/** Pecahan yang disebut suara: himpunan nilai, dan apakah ada "bukan seperempat". "setengah dari setengah" dikecualikan. */
const klaimPecahan = (suara) => {
  let t = suara.toLowerCase().replace(/setengah dari setengah/g, " # ");
  const pos = [];
  let neg = false;
  t = t.replace(/bukan seperempat/g, () => {
    neg = true;
    return " # ";
  });
  t = t.replace(/\b(satu|dua|tiga|empat) seperempat/g, (_, w) => {
    pos.push(BILANGAN_KATA[w] / 4);
    return " # ";
  });
  for (const _ of t.matchAll(/seperempat/g)) pos.push(0.25);
  for (const _ of t.matchAll(/setengah/g)) pos.push(0.5);
  return { pos, neg };
};
const kalimat = (suara) => (suara.match(/[^.?!]+[.?!]?/g) ?? []).map((s) => s.trim()).filter(Boolean);
const stat = { bagian: 0, klaim: 0, label: 0, garis: 0, kalimat: 0, jawaban: 0, khusus: 0 };

const LABEL_NILAI = { "1/2": 0.5, "1/4": 0.25, utuh: 1 };
for (const v of VIDEO) {
  for (const a of v.adegan) {
    a.ketukan.forEach((kt, i) => {
      const objs = akhirAdegan(a, i);
      const nm = `${v.id}/${a.id}#${i + 1}`;
      const gr = kelompok(objs);
      // 0) Bentuk bagian: bangun sah, tak bertumpuk, nomor 1..n, label dihitung ulang.
      for (const g of gr) {
        stat.bagian += 1;
        cek(g.ps.every((p) => p.pts && p.luas > 1), `${nm}: bagian ${g.slug} berupa bangun tertutup bertitik`);
        sama(g.ps.map((p) => p.no), g.ps.map((_, q) => q + 1), `${nm}: nomor bagian ${g.slug} berurutan`);
        for (let p = 0; p < g.ps.length; p += 1) {
          const c = pusatPoli(g.ps[p].pts);
          for (let q = 0; q < g.ps.length; q += 1) if (q !== p) cek(!dalamPoli(g.ps[q].pts, c), `${nm}: bagian ${g.slug}-${p + 1} tidak bertumpuk dengan bagian ${g.slug}-${q + 1}`);
        }
        for (const lb of objs.filter((o) => new RegExp(`^lb-${g.slug}-\\d+$`).test(o.id))) {
          const no = Number(lb.id.split("-")[2]);
          const bag = g.ps.find((p) => p.no === no);
          cek(!!bag, `${nm}: label ${lb.id} punya bagiannya`);
          if (!bag) continue;
          const nilai = LABEL_NILAI[lb.isi];
          if (nilai !== undefined) {
            stat.label += 1;
            cek(dekat(bag.luas / g.rujuk, nilai, 0.012), `${nm}: label "${lb.isi}" pada ${lb.id} cocok dengan luas bagian (${(bag.luas / g.rujuk).toFixed(3)} dari seluruhnya)`);
          }
          cek(dalamPoli(bag.pts, [lb.x, lb.y - 0.35 * (lb.u ?? 10)]), `${nm}: label ${lb.id} berada di dalam bagiannya`);
        }
      }
      // 1) Kalimat suara tentang banyak bagian dan sama besar dihitung ulang dari gambar.
      const ada = (f) => gr.some(f);
      for (const frag of a.id === "sapaan" ? [] : kalimat(kt.suara)) {
        const f = frag.toLowerCase();
        const tanya = /\?$/.test(f);
        const negatif = /tidak sama|berbeda ukuran|bukan/.test(f);
        if (!tanya && /empat bagian (yang )?sama/.test(f) && !negatif) {
          stat.kalimat += 1;
          cek(ada((g) => g.n === 4 && g.sama), `${nm}: "${frag}" cocok dengan gambar (ada benda empat bagian sama besar)`);
        }
        if (!tanya && /dua bagian (yang )?sama/.test(f) && !negatif) {
          stat.kalimat += 1;
          cek(ada((g) => g.n === 2 && g.sama), `${nm}: "${frag}" cocok dengan gambar (ada benda dua bagian sama besar)`);
        }
        if (/tidak sama besar/.test(f)) {
          stat.kalimat += 1;
          cek(ada((g) => !g.sama), `${nm}: "${frag}" cocok dengan gambar (ada benda yang bagiannya tidak sama besar)`);
        }
        if (!tanya && /sama besar/.test(f) && !negatif && gr.some((g) => g.n >= 2)) {
          stat.kalimat += 1;
          cek(ada((g) => g.n >= 2 && g.ps.some((p, q) => g.ps.some((r, s) => q !== s && mirip(p.luas, r.luas)))), `${nm}: "${frag}" ada bagian yang sama besar di gambar`);
        }
      }
      // 2) Pecahan yang disebut cocok dengan bagian yang menyala.
      {
        const { pos, neg } = klaimPecahan(kalimat(kt.suara).filter((q) => !/\?$/.test(q)).join(" "));
        for (const g of gr) {
          if (!g.sorot.length) continue;
          if (pos.length) {
            stat.klaim += 1;
            cek(pos.some((q) => dekat(q, g.fSorot, 0.012)), `${nm}: bagian menyala pada ${g.slug} = ${g.fSorot.toFixed(3)} dari seluruhnya, suara menyebut ${[...new Set(pos)].join(", ")}`);
          }
          if (neg) {
            stat.klaim += 1;
            cek(!dekat(0.25, g.fSorot, 0.012), `${nm}: "bukan seperempat" tetapi bagian menyala pada ${g.slug} memang seperempat`);
          }
        }
      }
    });
    // 3) Garis potong dan garis lipat jatuh pada batas antarbagian (kecuali garis rencana pada adegan cerita).
    if (a.id !== "cerita-martabak") {
      const objs = akhirAdegan(a);
      const gr = kelompok(objs);
      for (const gp of objs.filter((o) => /^gp/.test(o.id) && o.t === "garis")) {
        const p1 = [gp.x, gp.y];
        const p2 = [gp.x + gp.x2, gp.y + gp.y2];
        const semua = gr.flatMap((g) => g.ps);
        let dipakai = 0;
        for (const t of [0.2, 0.35, 0.5, 0.65, 0.8]) {
          const pt = [p1[0] + t * (p2[0] - p1[0]), p1[1] + t * (p2[1] - p1[1])];
          const di = semua.filter((p) => dalamPoli(p.pts, pt) || jarakKeTepi(p.pts, pt) < 0.8);
          if (!di.length) continue;
          dipakai += 1;
          cek(di.some((p) => jarakKeTepi(p.pts, pt) < 0.8), `${v.id}/${a.id}: garis ${gp.id} tepat pada batas antarbagian (titik ${pt.map(Math.round)})`);
        }
        stat.garis += 1;
        cek(dipakai >= 2, `${v.id}/${a.id}: garis ${gp.id} melewati benda`);
      }
    }
  }
}

/* ------------------------------ Isi tiap adegan dihitung ulang ------------------------------ */
const di = (id, ke) => {
  const a = adegan(M_VIDEO, id) ?? adegan(U, id);
  return akhirAdegan(a, ke);
};
const grDi = (id, ke, slug) => kelompok(di(id, ke)).find((g) => g.slug === slug);
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const pilih = (objs) => [1, 2, 3].map((q) => ({ t: isiTeks(objs, `c${q}-t`), s: ketemu(objs, `c${q}-k`)?.sorot })).filter((c) => c.t !== undefined);
const dipilih = (objs) => pilih(objs).filter((c) => c.s).map((c) => c.t);
const lebar = (p) => {
  const xs = p.map((q) => q[0]);
  const ys = p.map((q) => q[1]);
  return [Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys)];
};
const bbox = (g) => {
  const xs = g.ps.flatMap((p) => p.pts.map((q) => q[0]));
  const ys = g.ps.flatMap((p) => p.pts.map((q) => q[1]));
  return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
};
{
  // Martabak untuk empat anak: empat anak, garis rencana lewat pusat martabak.
  {
    const c4 = di("cerita-martabak", 4);
    sama(["kira", "malosi", "upe", "wei"].map((s) => (ketemu(c4, `ob-${s}`) ? 1 : 0)), [1, 1, 1, 1], "cerita: empat anak tergambar (sama dengan empat bagian)");
    const m = grDi("cerita-martabak", 4, "m");
    const [x0, y0, x1, y1] = bbox(m);
    const gp1 = ketemu(c4, "gp1");
    const gp2 = ketemu(c4, "gp2");
    cek(dekat(gp1.x, (x0 + x1) / 2, 0.6) && dekat(gp2.y, (y0 + y1) / 2, 0.6), "cerita: dua garis potong rencana lewat pusat martabak");
    cek(gp1.x2 === 0 && gp2.y2 === 0 && gp1.y < y0 + 4 && gp1.y + gp1.y2 > y1 - 4 && gp2.x < x0 + 4 && gp2.x + gp2.x2 > x1 - 4, "cerita: garis tegak dan mendatar menembus seluruh martabak");
    stat.khusus += 2;
  }
  // Empat bagian sama besar: potong pertama dua bagian, potong kedua empat bagian; tiap bagian seperempat.
  {
    const g2 = grDi("empat-sama", 1, "m");
    const g4 = grDi("empat-sama", 2, "m");
    sama([g2.n, g2.sama, g4.n, g4.sama], [2, true, 4, true], "empat sama: potong pertama dua bagian sama, potong kedua empat bagian sama");
    cek(dekat(g4.ps[0].luas / g4.total, 0.25, 0.01) && dekat(g2.ps[0].luas / g2.total, 0.5, 0.01), "empat sama: luas setengah dan seperempat dari martabak");
    cek(dekat(g4.ps[0].luas * 2, g2.ps[0].luas, 0.01 * g2.ps[0].luas) && dekat(g4.ps[0].luas * 4, g4.total, 0.01 * g4.total), "empat sama: dua kali seperempat = setengah, empat kali seperempat = utuh");
    cek(dekat(g2.total, g4.total, 0.5), "empat sama: seluruh martabak tetap sama sesudah dipotong");
    const g5 = grDi("empat-sama", 4, "m");
    cek(g5.sorot.length === 4 && dekat(g5.fSorot, 1, 0.01), "empat sama: empat seperempat sama dengan satu utuh");
    stat.khusus += 4;
  }
  // Bagian tidak sama besar: tak ada yang seperempat.
  {
    const a1 = grDi("tidak-sama", 0, "a");
    sama([a1.n, a1.sama], [4, false], "tidak sama: martabak empat bagian tidak sama besar");
    cek(a1.ps.every((p) => !dekat(p.luas / a1.total, 0.25, 0.02)), "tidak sama: tak satu pun bagian martabak seperempat (luas dihitung ulang)");
    const b3 = grDi("tidak-sama", 2, "b");
    sama([b3.n, b3.sama], [4, false], "tidak sama: kue bolu empat bagian tidak sama besar");
    cek(b3.ps.every((p) => !dekat(p.luas / b3.total, 0.25, 0.02)), "tidak sama: tak satu pun bagian kue bolu seperempat");
    cek(grDi("tidak-sama", 1, "a").sorot.length === 1 && dekat(grDi("tidak-sama", 1, "a").sorot[0].luas, Math.min(...a1.ps.map((p) => p.luas)), 0.5), "tidak sama: bagian yang kecil menyala");
    stat.khusus += 4;
  }
  // Tiga bagian sama besar bukan seperempat.
  {
    const t1 = grDi("tiga-bagian", 0, "tg");
    sama([t1.n, t1.sama], [3, true], "tiga bagian: tiga bagian sama besar");
    cek(dekat(t1.ps[0].luas / t1.total, 1 / 3, 0.01) && !dekat(t1.ps[0].luas / t1.total, 0.25, 0.02), "tiga bagian: tiap bagian sepertiga dari kue bolu, bukan seperempat (luas dihitung ulang)");
    sama(grDi("tiga-bagian", 2, "tg").sorot.length, 1, "tiga bagian: satu bagian menyala saat disebut bukan seperempat");
    const t4 = grDi("tiga-bagian", 3, "tg");
    sama([t4.n, t4.sama, t4.sorot.length], [4, true, 0], "tiga bagian: dibagi empat bagian sama besar");
    const t5 = grDi("tiga-bagian", 4, "tg");
    sama([t5.n, t5.sama, namaPecahan(t5.fSorot)], [4, true, "seperempat"], "tiga bagian: satu dari empat bagian sama besar adalah seperempat");
    stat.khusus += 5;
  }
  // Sisa martabak: satu seperempat, tiga seperempat, empat seperempat.
  {
    const s2 = grDi("sisa-martabak", 1, "sm");
    const s3 = grDi("sisa-martabak", 2, "sm");
    const s4 = grDi("sisa-martabak", 3, "sm");
    sama([s2.n, s2.sama, s2.sorot.length, namaPecahan(s2.fSorot)], [4, true, 1, "seperempat"], "sisa martabak: satu seperempat dimakan Kira");
    sama([s3.sorot.map((p) => p.no), Math.round(s3.fSorot * 100)], [[2, 3, 4], 75], "sisa martabak: sisanya tiga seperempat (tiga per empat dari martabak)");
    cek(dekat(s2.fSorot + s3.fSorot, 1, 0.01) && s4.sorot.length === 4 && dekat(s4.fSorot, 1, 0.01), "sisa martabak: satu seperempat ditambah tiga seperempat sama dengan empat seperempat, yaitu satu utuh");
    stat.khusus += 3;
  }
  // Tiga pertanyaan pemeriksa.
  {
    const p = grDi("tiga-periksa", 3, "b");
    sama([p.n, p.sama, p.sorot.length, namaPecahan(p.fSorot)], [4, true, 1, "seperempat"], "pemeriksa: empat bagian, sama besar, satu bagian menyala seperempat");
    stat.khusus += 1;
  }
  // Apel: setengah lalu setengah dari setengah.
  {
    const a2 = grDi("setengah-dulu", 1, "ap");
    const a3 = grDi("setengah-dulu", 2, "ap");
    sama([a2.n, a2.sama, a3.n, a3.sama], [2, true, 4, true], "apel: dua bagian sama, lalu empat bagian sama");
    cek(dekat(a3.ps[0].luas + a3.ps[1].luas, a2.ps[0].luas, 0.012 * a2.ps[0].luas), "apel: dua seperempat sama dengan setengah apel (setengah dari setengah)");
    cek(dekat(a3.ps[0].luas * 2, a2.ps[0].luas, 0.012 * a2.ps[0].luas), "apel: seperempat adalah setengah dari setengah");
    sama(namaPecahan(grDi("setengah-dulu", 3, "ap").fSorot), "seperempat", "apel: bagian menyala seperempat");
    stat.khusus += 3;
  }
  // Kue bolu: potong dua kali.
  {
    const b2 = grDi("dua-kali", 1, "bo");
    const b3 = grDi("dua-kali", 2, "bo");
    sama([b2.n, b2.sama, b3.n, b3.sama], [2, true, 4, true], "dua kali: potong pertama dua bagian sama, potong kedua empat bagian sama");
    const b5 = grDi("dua-kali", 4, "bo");
    sama([b5.sorot.length, namaPecahan(b5.fSorot)], [2, "setengah"], "dua kali: dua seperempat di sebelah kiri sama dengan setengah");
    const [x0, , x1] = bbox(b5);
    cek(b5.sorot.every((p) => bbox({ ps: [p] })[2] <= (x0 + x1) / 2 + 0.5), "dua kali: dua bagian yang menyala berada di setengah kiri");
    cek(dekat(b3.ps[0].luas + b3.ps[2].luas, b2.ps[0].luas, 0.012 * b2.ps[0].luas), "dua kali: setengah dibagi lagi menjadi dua seperempat");
    stat.khusus += 4;
  }
  // Banyak cara: bentuk bagian cocok dengan sebutan suara.
  {
    const gA = grDi("banyak-cara", 4, "a");
    const gB = grDi("banyak-cara", 4, "b");
    const gC = grDi("banyak-cara", 4, "c");
    sama([gA.n, gA.sama, gB.n, gB.sama, gC.n, gC.sama], [4, true, 4, true, 4, true], "banyak cara: tiga cara semuanya empat bagian sama besar");
    cek(gA.ps.every((p) => p.pts.length === 4 && dekat(lebar(p.pts)[0], lebar(p.pts)[1], 0.1)), "banyak cara: cara pertama empat persegi kecil");
    cek(gB.ps.every((p) => p.pts.length === 3), "banyak cara: cara kedua empat segitiga");
    cek(gC.ps.every((p) => p.pts.length === 4 && lebar(p.pts)[1] / lebar(p.pts)[0] >= 3), "banyak cara: cara ketiga empat jalur panjang");
    cek(dekat(gA.total, gB.total, 0.5) && dekat(gB.total, gC.total, 0.5), "banyak cara: tiga persegi sama besar, jadi seperempat sama di tiga cara");
    cek(gA.ps[0].luas > 0 && dekat(gA.ps[0].luas, gC.ps[0].luas, 0.5) && dekat(gB.ps[0].luas, gC.ps[0].luas, 0.5), "banyak cara: seperempat dari ketiga cara sama besar");
    stat.khusus += 5;
  }
  // Dua seperempat jadi setengah.
  {
    const q = [1, 2, 3, 4].map((ke) => grDi("dua-seperempat", ke, "pu"));
    sama([q[0].sorot.length, namaPecahan(q[0].fSorot)], [1, "seperempat"], "dua seperempat: satu bagian menyala seperempat");
    sama([q[1].sorot.length, namaPecahan(q[1].fSorot)], [2, "setengah"], "dua seperempat: dua bagian menyala setengah");
    sama([q[3].sorot.map((p) => p.no), namaPecahan(q[3].fSorot)], [[3, 4], "setengah"], "dua seperempat: dua bagian yang lain juga setengah");
    stat.khusus += 3;
  }
  // Empat seperempat jadi utuh.
  {
    const z1 = grDi("empat-seperempat", 0, "z");
    const z3 = grDi("empat-seperempat", 2, "z");
    cek(z1.n === 4 && z1.sama && z3.n === 4 && z3.sama && dekat(z1.total, z3.total, 0.5), "empat seperempat: empat bagian terpisah lalu disatukan, luas total tetap");
    const z4 = grDi("empat-seperempat", 3, "z");
    sama([z4.sorot.length, namaPecahan(z4.fSorot)], [4, "utuh"], "empat seperempat: empat bagian menyala sama dengan utuh");
    const [x0, y0, x1, y1] = bbox(z3);
    cek(dekat((x0 + x1) / 2, 150, 0.7) && dekat((y0 + y1) / 2, 98, 0.7), "empat seperempat: bagian yang disatukan membentuk lingkaran utuh berpusat di piring");
    const [a0, b0, a1, b1] = bbox(z1);
    cek(a1 - a0 > x1 - x0 + 20 && b1 - b0 > y1 - y0 + 20, "empat seperempat: bagian yang terpisah lebih lebar daripada yang disatukan");
    stat.khusus += 4;
  }
  // Utuh, setengah, seperempat: tiga roti sama besar.
  {
    const u = grDi("tangga", 0, "u");
    const s = grDi("tangga", 1, "s");
    const p = grDi("tangga", 2, "p");
    sama([u.n, s.n, p.n, s.sama, p.sama], [1, 2, 4, true, true], "tangga: utuh satu bagian, setengah dua bagian, seperempat empat bagian sama");
    cek(dekat(u.total, s.total, 0.5) && dekat(s.total, p.total, 0.5), "tangga: tiga roti sama panjang (luas total sama)");
    cek(p.ps[0].luas < s.ps[0].luas && s.ps[0].luas < u.ps[0].luas, "tangga: seperempat lebih kecil dari setengah, setengah lebih kecil dari utuh");
    cek(dekat(2 * s.ps[0].luas, u.total, 0.5) && dekat(4 * p.ps[0].luas, u.total, 0.5) && dekat(2 * p.ps[0].luas, s.ps[0].luas, 0.5), "tangga: dua setengah sama dengan utuh, empat seperempat sama dengan utuh, dua seperempat sama dengan setengah");
    const g5 = kelompok(di("tangga", 4));
    sama([g5.find((g) => g.slug === "p").sorot.length, g5.find((g) => g.slug === "s").sorot.length], [2, 1], "tangga: dua seperempat dan satu setengah menyala");
    cek(dekat(g5.find((g) => g.slug === "p").fSorot, g5.find((g) => g.slug === "s").fSorot, 0.01), "tangga: dua seperempat sama besar dengan setengah");
    cek(isiTeks(di("tangga", 2), "nm2") === "seperempat" && isiTeks(di("tangga", 1), "nm1") === "setengah", "tangga: nama baris sesuai");
    stat.khusus += 6;
  }
  // Seperempat pada banyak benda.
  {
    const ke = (q) => kelompok(di("seperempat-benda", q));
    const k4 = ke(3);
    sama(k4.map((g) => [g.slug, g.n, g.sama, g.sorot.length, namaPecahan(g.fSorot)]), [["ap", 4, true, 1, "seperempat"], ["pu", 4, true, 1, "seperempat"], ["bo", 4, true, 1, "seperempat"]], "seperempat benda: apel, puding, dan kue bolu masing-masing empat bagian sama, satu bagian seperempat");
    stat.khusus += 1;
  }
  // Karya ikan: satu setengah dan tiga seperempat dari lingkaran yang sama.
  {
    const tr = grDi("karya", 1, "ik");
    sama(tr.ps.map((p) => Math.round((p.luas / tr.ps[1].luas) * 10) / 10), [2, 1, 1, 1], "karya: satu potongan setengah sama dengan dua seperempat, dan tiga potongan seperempat sama besar");
    const ik = grDi("karya", 3, "ik");
    sama(ik.ps.map((p) => Math.round(p.luas)), tr.ps.map((p) => Math.round(p.luas)), "karya: ikan tersusun dari potongan yang sama besar dengan potongan awal");
    sama(ik.ps.map((p) => p.pts.length), tr.ps.map((p) => p.pts.length), "karya: bentuk potongan sama sesudah disusun");
    cek(isiTeks(di("karya", 1), "lb-ik-1") === "1/2" && [2, 3, 4].every((q) => isiTeks(di("karya", 1), `lb-ik-${q}`) === "1/4"), "karya: label setengah dan tiga seperempat");
    stat.khusus += 4;
  }
}

/* ------------------------------ Latihan dan terapan: jawaban dihitung dari gambar ------------------------------ */
{
  const periksaJawaban = (id, ke, harap, nama) => {
    const o = di(id, ke);
    const pil = pilih(o);
    sama(new Set(pil.map((c) => c.t)).size, 3, `${nama}: tiga pilihan berbeda`);
    sama(pil.filter((c) => c.t === harap).length, 1, `${nama}: tepat satu pilihan sama dengan hasil hitung (${harap})`);
    sama(dipilih(o), [harap], `${nama}: pilihan yang disorot sama dengan hasil hitung`);
    stat.jawaban += 1;
  };
  // Latihan 1: gambar yang dibagi empat bagian sama besar.
  {
    const gr = kelompok(di("latihan-satu", 2));
    const benar = gr.filter((g) => g.n === 4 && g.sama).map((g) => g.slug.toUpperCase());
    sama(benar.length, 1, "latihan 1: hanya satu gambar yang empat bagian sama besar");
    periksaJawaban("latihan-satu", 2, benar[0], "latihan 1: gambar yang seperempat");
    const huruf = /Gambar ([A-C])/.exec(adegan(M_VIDEO, "latihan-satu").ketukan[2].suara)?.[1];
    sama(huruf, benar[0], "latihan 1: huruf pada suara sama dengan hasil hitung");
    const tak = gr.find((g) => g.slug === "a");
    const dua = gr.find((g) => g.slug === "c");
    sama([tak.n, tak.sama, dua.n, dua.sama], [4, false, 2, true], "latihan 1: gambar A empat bagian tidak sama besar, gambar C dua bagian");
    sama(isiTeks(di("latihan-satu", 2), "c2-t"), "B", "latihan 1: kartu B");
    sama(namaPecahan(gr.find((g) => g.slug === "b").fSorot), "seperempat", "latihan 1: bagian gambar B yang menyala seperempat");
  }
  // Latihan 2: nama satu bagian.
  {
    const g = grDi("latihan-dua", 1, "bo");
    periksaJawaban("latihan-dua", 2, namaPecahan(g.fSorot), "latihan 2: satu bagian dari empat bagian sama");
    const g2 = grDi("latihan-dua", 3, "bo");
    sama([g2.n, g2.sama, namaPecahan(g2.fSorot)], [2, true, "setengah"], "latihan 2: dua bagian sama, satu bagian setengah");
  }
  // Latihan 3: dua seperempat sama dengan apa.
  {
    const g = grDi("latihan-tiga", 1, "z");
    sama([g.n, g.sama, g.sorot.length], [4, true, 2], "latihan 3: pizza empat bagian sama, dua bagian menyala");
    periksaJawaban("latihan-tiga", 2, namaPecahan(g.fSorot), "latihan 3: dua seperempat sama dengan");
    const g4 = grDi("latihan-tiga", 3, "z");
    sama([g4.sorot.length, namaPecahan(g4.fSorot)], [4, "utuh"], "latihan 3: empat seperempat sama dengan utuh");
  }
  // Metode luar: Seperempat, Setengah dari Setengah, Lipat Dua Kali.
  {
    const g = grDi("luar-seperempat-terapan", 3, "bp");
    sama([g.n, g.sama], [4, true], "Seperempat terapan: kue bolu panjang empat bagian sama besar");
    periksaJawaban("luar-seperempat-terapan", 3, namaPecahan(g.fSorot), "Seperempat terapan: satu bagian kue bolu panjang");
    const h = grDi("luar-setengah-terapan", 3, "rt");
    periksaJawaban("luar-setengah-terapan", 3, namaPecahan(h.fSorot), "Setengah dari Setengah terapan: bagian kanan roti");
    const h3 = grDi("luar-setengah", 2, "ap");
    const h2 = grDi("luar-setengah", 1, "ap");
    cek(h3.n === 3 && dekat(h3.ps[0].luas, h3.ps[1].luas, 0.015 * h3.ps[0].luas) && dekat(h3.ps[0].luas + h3.ps[1].luas, h2.ps[0].luas, 0.015 * h2.ps[0].luas) && dekat(h3.ps[2].luas, h2.ps[1].luas, 0.015 * h2.ps[1].luas), "Setengah dari Setengah: setengah kanan dibagi dua sama besar, setengah kiri tetap");
    sama([grDi("luar-setengah", 3, "ap").sorot.length, namaPecahan(grDi("luar-setengah", 3, "ap").fSorot)], [1, "seperempat"], "Setengah dari Setengah: satu bagian dari setengah kanan adalah seperempat");
    const rt = grDi("luar-setengah-terapan", 0, "rt");
    cek(rt.n === 3 && dekat(rt.ps[0].luas, rt.ps[1].luas, 0.015 * rt.ps[0].luas) && dekat(rt.ps[0].luas * 2, rt.ps[2].luas, 0.02 * rt.ps[2].luas), "Setengah dari Setengah terapan: roti setengah dan dua seperempat");
    // Lipat Dua Kali: garis lipat di tengah, kedua sisi pas menumpuk.
    const f = di("luar-lipat", 1);
    const lp = grDi("luar-lipat", 0, "lp");
    const [x0, y0, x1, y1] = bbox(lp);
    cek(dekat(ketemu(f, "gp1").x, (x0 + x1) / 2, 0.6) && ketemu(f, "gp1").x2 === 0, "Lipat Dua Kali: lipatan pertama tegak tepat di tengah persegi");
    const fl1 = ketemu(f, "fl1");
    cek(fl1.x < (x0 + x1) / 2 && fl1.x + fl1.x2 > (x0 + x1) / 2 && fl1.y2 === 0, "Lipat Dua Kali: sisi kiri dilipat ke kanan (panah melewati lipatan)");
    const f4 = di("luar-lipat", 3);
    cek(dekat(ketemu(f4, "gp2").y, (y0 + y1) / 2, 0.6) && ketemu(f4, "gp2").y2 === 0, "Lipat Dua Kali: lipatan kedua mendatar tepat di tengah persegi");
    const fl2 = ketemu(f4, "fl2");
    cek(fl2.y < (y0 + y1) / 2 && fl2.y + fl2.y2 > (y0 + y1) / 2 && fl2.x2 === 0, "Lipat Dua Kali: sisi atas dilipat ke bawah (panah melewati lipatan)");
    const l3 = grDi("luar-lipat", 2, "lp");
    const l5 = grDi("luar-lipat", 4, "lp");
    sama([l3.n, l3.sama, l5.n, l5.sama], [2, true, 4, true], "Lipat Dua Kali: sesudah lipat pertama dua bagian sama, sesudah lipat kedua empat bagian sama");
    sama([[...new Set(l5.ps.map((p) => Math.round(p.luas)))].length, Math.round(l5.ps[0].luas * 4)], [1, Math.round(l5.total)], "Lipat Dua Kali: empat seperempat sama dengan utuh");
    // Terapan lipat: berapa bagian sama besar.
    const t4 = grDi("luar-lipat-terapan", 3, "lt");
    sama([t4.n, t4.sama], [4, true], "Lipat terapan: dua kali lipat menghasilkan empat bagian sama besar");
    periksaJawaban("luar-lipat-terapan", 3, KATA_BILANGAN[t4.n], "Lipat terapan: banyak bagian sama besar");
    const nomor = di("luar-lipat-terapan", 2).filter((o) => /^nm-lt-\d+$/.test(o.id)).map((o) => o.isi);
    sama(nomor, ["1", "2", "3", "4"], "Lipat terapan: hitungan satu sampai empat sesuai banyak bagian");
    const gt = di("luar-lipat-terapan", 0);
    cek(dekat(ketemu(gt, "gp1").x, (x0 + x1) / 2, 0.6) && dekat(ketemu(gt, "gp2").y, (y0 + y1) / 2, 0.6), "Lipat terapan: dua lipatan lewat tengah persegi");
    stat.khusus += 12;
  }
  // Pembuka dan ringkasan metode luar memakai gambar yang sama dengan ucapannya.
  {
    const p = grDi("luar-pembuka", 4, "po");
    sama([p.n, p.sama, namaPecahan(p.fSorot)], [4, true, "seperempat"], "pembuka: satu dari empat bagian sama besar adalah seperempat");
    const s2 = grDi("luar-seperempat", 1, "pz");
    const s4 = grDi("luar-seperempat", 3, "pz");
    sama([s2.n, s2.sama, namaPecahan(s4.fSorot)], [4, true, "seperempat"], "Seperempat: bagi menjadi empat bagian sama, satu bagian seperempat");
    const r = kelompok(di("luar-ringkas", 3));
    sama(r.map((g) => [g.slug, g.n, g.sama, namaPecahan(g.fSorot)]), [["a", 4, true, "?"], ["b", 4, true, "seperempat"], ["c", 4, true, "seperempat"]], "ringkasan: tiga gambar mini empat bagian sama, bagian menyala seperempat");
    const pn = kelompok(di("penutup", 3));
    sama(pn.map((g) => [g.slug, g.n, g.sama, g.sorot.length, namaPecahan(g.fSorot)]), [["a", 4, true, 0, "?"], ["b", 4, true, 0, "?"], ["c", 4, true, 4, "utuh"]], "penutup: tiga gambar mini sesuai tiga hal yang dipelajari");
  }
}

// Pilihan jawaban umum: tiga pilihan berbeda; paling banyak satu disorot.
for (const v of VIDEO) {
  for (const a of v.adegan) {
    a.ketukan.forEach((kt, i) => {
      const objs = akhirAdegan(a, i);
      const adaPilih = pilih(objs);
      if (adaPilih.length && /^latihan-|luar-.*terapan$/.test(a.id)) {
        cek(adaPilih.length === 3 && new Set(adaPilih.map((c) => c.t)).size === 3, `${v.id}/${a.id}#${i + 1}: tiga pilihan jawaban berbeda`);
        cek(dipilih(objs).length <= 1, `${v.id}/${a.id}#${i + 1}: paling banyak satu jawaban disorot`);
      }
    });
  }
}
console.log(`Pemeriksaan pecahan: ${stat.bagian} benda dibagi, ${stat.label} label, ${stat.klaim} pecahan disebut, ${stat.kalimat} kalimat bagian, ${stat.garis} garis potong, ${stat.jawaban} jawaban, ${stat.khusus} khusus`);

/* ------------------------------ Aturan pemilik ------------------------------ */
{
  const MANDIRI = /kerja kelompok|berkelompok|secara berkelompok|diskusi kelompok|sekelompok|kelompokmu|kelompok belajar|bersama kelompok|tanya teman|survei|karet gelang|uang tabungan|uang logam|\bpaman\b|\btika\b|\bteman\w*|\bkawan\w*|sekawan|\bsahabat\w*|depan kelas|bersama kelas|seluruh kelas|\bkelas\b|berpasangan dengan (teman|kawan)|bekerja berpasangan|secara berpasangan|bermain bersama|bertanya kepada|buat ceritamu|buku|menulis di|menuliskan di|tulis di|tuliskan di|menggambar|gambarlah|gambar sendiri|\bbawa(lah)?\b|membawa|dibawa|\bkertas\b|\bpensil\b|\bpulpen\b|\bspidol\b|\bgunting\b|\bpisau\b|ambil (benda|pensil|kelereng|bola|sedotan|balon|kerucut|kubus)|tangan (kiri|kanan)|\bjari\b|menyuruh|suruh|jengkal|telapak|\bdepa\b|penggaris|\bkoin\b|di sekitar|di rumah|di kelas|centimeter|\bmeter\b|kakimu|tanganmu|badanmu|\braba\w*|\bmeraba|\btubuh|\blengan|lingkari|coret|guru kelas|orang tua|\bayah\b|\bibu guru|bapak guru|\bloker\b|singapura|\bmeja\b|di sekitarmu/i;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      const semua = [a.judul, a.sumber];
      a.ketukan.forEach((kt, i) => {
        semua.push(kt.suara);
        semua.push(...L.teksTerlihat(L.keadaanStory(a, i, 9999)));
      });
      const kena = semua.filter((t) => MANDIRI.test(t));
      cek(kena.length === 0, `${v.id}/${a.id}: narasi mandiri dan digital, tanpa kelompok, teman, sahabat, kelas, buku, kertas, pensil, gunting, pisau, koin, atau benda nyata (${kena.slice(0, 2).join(" | ")})`);
    }
  }
}

/* ------------------------------ Sapaan dan peta susun ------------------------------ */
{
  const sap = adegan(M_VIDEO, "sapaan");
  const DAFTAR = ["Empat bagian sama besar", "Setengah dari setengah", "Utuh, setengah, seperempat"];
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Empat bagian sama besar/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => DAFTAR.includes(t)), DAFTAR, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara) && !/\d/.test(DAFTAR.join(" ")), "sapaan materi: tanpa angka");
  const sapLuar = adegan(U, "sapaan");
  cek(/cara lain/i.test(L.teksTerlihat(akhirAdegan(sapLuar, 1)).join(" | ")) && /metode-luar|Metode luar/.test(sapLuar.sumber), "sapaan metode luar: pengumuman cara lain");
  const ringkasBerkas = new URL("../src/data/kelas2-bab5-ringkas.json", import.meta.url);
  const sumberRingkas = existsSync(ringkasBerkas) ? JSON.parse(readFileSync(ringkasBerkas, "utf8")).subBab?.C : null;
  const sementara = new URL("../.tmp-k2b5s/C.json", import.meta.url);
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
    // Isi tabel dihitung ulang dari gambar roti pada adegan "tangga" (utuh satu bagian, setengah dua bagian, seperempat empat bagian).
    sama(T.kolom, ["Utuh", "Setengah", "Seperempat"], "tabel susun: kolom utuh, setengah, seperempat");
    sama(T.baris.map((b) => b.label), ["Potong", "Bagian", "Lambang"], "tabel susun: baris potong, bagian, lambang");
    const tg = kelompok(di("tangga", 4));
    const per = ["u", "s", "p"].map((s) => tg.find((g) => g.slug === s));
    const KALI = { 1: "nol kali", 2: "sekali", 4: "dua kali" };
    const LAMBANG = { 1: "1", 2: "½", 4: "¼" };
    per.forEach((g, q) => {
      stat.khusus += 3;
      sama(T.baris[0].sel[q], KALI[g.n], `tabel susun: kali potong ${T.kolom[q]} (roti ${g.n} bagian, dipotong ${Math.log2(g.n)} kali)`);
      sama(T.baris[1].sel[q], KATA_BILANGAN[g.n], `tabel susun: banyak bagian ${T.kolom[q]}`);
      sama(T.baris[2].sel[q], LAMBANG[g.n], `tabel susun: lambang ${T.kolom[q]}`);
      cek(g.sama && Math.pow(2, Math.round(Math.log2(g.n))) === g.n && T.kolom[q].toLowerCase() === namaPecahan(g.ps[0].luas / g.total), `tabel susun: ${T.kolom[q]} sama dengan satu bagian dari ${g.n} bagian sama besar (luas dihitung ulang)`);
    });
    const KATA_LARANG = /buku|halaman|kunci|kerja kelompok|berkelompok|\bteman|kawan|sahabat|kelas\b|kertas|pensil|pisau|\bbawa\b|menggambar|menulis di|depan kelas|\bluas\b|keliling|di rumah|survei|karet gelang|uang tabungan|di sekitar|\bpaman\b|\btika\b|\blili\b|loker|ibu guru|singapura|quartering|half of half|fold twice/i;
    cek(!KATA_LARANG.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: tanpa kata terlarang dan tanpa nama Inggris, kelompok, teman, kelas, buku, kertas, pensil, pisau, loker, Ibu guru");
    cek(peta.every((s) => ![...s.teks, ...(s.ikon ?? "")].some((c) => c.codePointAt(0) > 0x1fa95)), "peta susun: emoji paling tinggi Emoji 12");
  } else cek(false, "peta dan tabel susun: .tmp-k2b5s/C.json atau kelas2-bab5-ringkas.json subBab.C.petaSusun ada");
}

console.log(`${VIDEO.map((v) => `${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, a) => t + a.ketukan.length, 0)} ketukan, ${kataVideo(v)} kata (sekitar ${(kataVideo(v) / 120).toFixed(1)} menit diputar)`).join("\n")}`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
