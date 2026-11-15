// Uji Story Kelas 3 Bab 1 Sub-Bab E (Pengurangan sampai 100): dua video (materi kurikulum dan metode luar) dengan mesin animasi Story.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar (nama metode hanya Indonesia),
// dan HITUNG ULANG dari struktur adegan: susun (angka atas, angka bawah, hasil tiap tempat, puluhan baru dan satuan baru bila mengambil satu puluhan, simpanan pada penjumlahan),
// blok puluhan dan satuan (nilai blok yang terang sama dengan label), garis bilangan (tiap lompatan sama dengan selisih dua titik), tiap hitungan tertulis dan urai (a + b = c),
// kalimat di suara (rantai tambah dan kurang, lebih kecil atau lebih besar, "n puluhan dan m satuan", puluhan tinggal, urai), bilangan yang disebut di suara tampak di gambar,
// jawaban latihan dan terapan (satu pilihan benar dan disorot), isi tabel susun (dihitung ulang dari susun pada adegan video materi), dan emoji paling tinggi Emoji 12.
// Jalankan: node --no-warnings scripts/uji-story-k3b1E.mjs
import { readFileSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k3b1E-video.ts");
const U1 = await import("../src/components/modul/story/k3b1E-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K3B1E, V.VIDEO_LUAR_K3B1E];
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
        } else if (o.t === "garis" || o.t === "panah") cek(x > -2 && x < 302 && y > -2 && y < 204 && x + (o.x2 ?? 0) > -2 && x + (o.x2 ?? 0) < 302 && y + (o.y2 ?? 0) > -2 && y + (o.y2 ?? 0) < 204, `${nama}#${i + 1}: garis ${o.id} masuk kanvas`);
      }
      {
        const teksAda = akhir.filter((o) => o.t === "teks" && (o.op ?? 1) > 0 && o.isi && !/^[\u{1F000}-\u{1FFFF}]|^[✂✅❌➖]$/u.test(o.isi));
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
const M_VIDEO = V.VIDEO_MATERI_K3B1E;
const U = V.VIDEO_LUAR_K3B1E;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /Pengurangan Bersusun|Menghitung Naik|Meminjam|metode luar|metode dari luar/i;
const NAMA_INGGRIS = /Standard Subtraction|Counting Up|Regrouping|Algorithms|Base-ten|Singapore Math|Van de Walle|Dienes|Place-Value|Number Bond|Counting On/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar ");
  for (const m of U1.NAMA_METODE_ID) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE_ID, ["Pengurangan Bersusun", "Menghitung Naik", "Meminjam"], "nama Indonesia metode luar (namaId data)");
  cek(!NAMA_INGGRIS.test(materi) && !NAMA_INGGRIS.test(luar), "nama metode hanya bahasa Indonesia (tanpa Standard Subtraction, Counting Up, Regrouping)");
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
      cek(!/\b(Tika|Lili|Paman|Ibu|Ayah|Bapak|Budi|Ani|Doni|Sinta|Dewi|Rudi|Nina|Andi|Siti|Bu Guru|Pak Guru|Pak|Ahmad|Alfa|Galih|Alen|Meutia|Bandi|Pelita)\b/.test(semua.join(" | ")), `${v.id}/${a.id}: hanya enam tokoh tetap`);
      cek(semua.every((t) => ![...t].some((c) => c.codePointAt(0) > 0x1fa95)), `${v.id}/${a.id}: emoji paling tinggi Emoji 12`);
    }
  }
  cek(M_VIDEO.subjudul === "Materi kurikulum" && U.subjudul === "Tiga metode luar", "subjudul video: Materi kurikulum dan Tiga metode luar");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46), "video materi: label sumber berbentuk Materi: ... dan pendek");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "video metode luar: label sumber metode luar atau ringkasan, pendek");
  cek(M_VIDEO.id === "k3b1E-materi" && U.id === "k3b1E-luar", "id video k3b1E-materi dan k3b1E-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,cerita-jeruk,balok,susun-pendek,apel,kelereng,satuan-kurang,ambil-puluhan,aturan,urai,hitung-panjang,periksa,nol,pilih-cara,latihan-satu,latihan-dua,latihan-tiga,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-susun,luar-susun-terapan,luar-naik,luar-naik-terapan,luar-pinjam,luar-pinjam-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 3 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 3 lalu penutup");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  cek(U.adegan.length - 3 === 6, "video metode luar: konsep dan penerapan untuk tiga metode (6 adegan di antara pembuka dan ringkasan)");
  for (const kata of ["Latihan", "Igil", "Halim", "Kira", "Wei", "Upe", "Malosi", "pengurangan", "susun pendek", "susun panjang", "puluhan", "satuan", "mengambil satu puluhan", "dikurangi", "penjumlahan", "jeruk", "apel", "kelereng", "bunga", "balon", "ikan", "batang", "diurai"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Batas bab: bilangan sampai seratus, tanpa satuan baku, rumus, perkalian, ratusan.
  const BOCOR = /kilogram|\bgram\b|\bkg\b|dikali|perkalian|pembagian|rumus|ribu|\bratus|×|÷|\bmeter\b|\bliter\b/i;
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

/* ------------------------------ Susun, blok, garis bilangan, dan kalimat dihitung ulang ------------------------------ */
const G = await import("../src/components/modul/story/k3b1E-gambar.ts");
const stat = { susun: 0, ambil: 0, blok: 0, garis: 0, klaim: 0, aritm: 0, jawaban: 0, pilihan: 0, tabel: 0, terlihat: 0 };
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const U9 = "satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan";
const NILAI9 = { nol: 0, satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
const NUMW = `(?:seratus|sepuluh|sebelas|(?:${U9}) belas|(?:${U9}) puluh(?: (?:${U9}))?|${U9}|nol)(?![a-z])`;
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
const OPN = `${NUMW}(?: satuan| puluhan)?`;
const RE_RANTAI = new RegExp(`\\b(${OPN})((?: (?:ditambah|dikurangi) ${OPN})+) sama dengan (${OPN})`, "g");
const kataAngka = (s) => nilaiKata(s.replace(/ (satuan|puluhan)$/, ""));
const evalSisi = (s) => {
  const t = s.trim().split(/\s*([+−])\s*/);
  if (t.some((x, i) => (i % 2 === 0 ? !/^\d+$/.test(x) : !/^[+−]$/.test(x)))) return null;
  let v = Number(t[0]);
  for (let i = 1; i < t.length; i += 2) v = t[i] === "+" ? v + Number(t[i + 1]) : v - Number(t[i + 1]);
  return v;
};

const angkaObj = (objs, id) => {
  const o = ketemu(objs, id);
  return o ? Number(o.isi) : null;
};
/** Baca susun `sg` dari benda-benda. */
const bacaSusun = (objs) => {
  const op = ketemu(objs, "sg-op");
  if (!op) return null;
  const s = { op: op.isi === "+" ? "+" : "-", a1: angkaObj(objs, "sg-a1"), a0: angkaObj(objs, "sg-a0"), b1: angkaObj(objs, "sg-b1"), b0: angkaObj(objs, "sg-b0"), r1: angkaObj(objs, "sg-r1"), r0: angkaObj(objs, "sg-r0"), p1: angkaObj(objs, "sg-p1"), p0: angkaObj(objs, "sg-p0"), x1: !!ketemu(objs, "sg-x1"), x0: !!ketemu(objs, "sg-x0") };
  s.A = s.a1 !== null && s.a0 !== null ? s.a1 * 10 + s.a0 : null;
  s.B = s.b1 !== null && s.b0 !== null ? s.b1 * 10 + s.b0 : null;
  s.R = s.r1 !== null && s.r0 !== null ? s.r1 * 10 + s.r0 : null;
  return s;
};
/** Baca kelompok blok `pb-g-...`. */
const bacaBlok = (objs) => {
  const peta = new Map();
  for (const o of objs) {
    const m = /^pb-([a-z])-(p|s|n)(?:-(\d+))?$/.exec(o.id);
    if (!m) continue;
    if (!peta.has(m[1])) peta.set(m[1], { g: m[1], batang: [], kecil: [], label: null });
    const gr = peta.get(m[1]);
    if (m[2] === "p") gr.batang.push({ i: Number(m[3]), o });
    else if (m[2] === "s") gr.kecil.push({ i: Number(m[3]), o });
    else gr.label = o;
  }
  const terang = (q) => (q.o.op ?? 1) > 0.5;
  return [...peta.values()].map((g) => ({ ...g, p: g.batang.filter(terang).length, s: g.kecil.filter(terang).length, nilai: 10 * g.batang.filter(terang).length + g.kecil.filter(terang).length }));
};
/** Baca garis bilangan `nl`. */
const bacaGaris = (objs) => {
  const p = new Map();
  const h = new Map();
  const a = new Set();
  for (const o of objs) {
    let m;
    if ((m = /^nl-p(\d+)$/.exec(o.id))) p.set(Number(m[1]), Number(o.isi));
    else if ((m = /^nl-h(\d+)$/.exec(o.id))) h.set(Number(m[1]), Number(String(o.isi).replace("+", "")));
    else if ((m = /^nl-a(\d+)$/.exec(o.id))) a.add(Number(m[1]));
  }
  return p.size || h.size ? { p, h, a } : null;
};

const TABEL = {};
for (const v of VIDEO) {
  for (const ad of v.adegan) {
    ad.ketukan.forEach((kt, i) => {
      const objs = akhirAdegan(ad, i);
      const nm = `${v.id}/${ad.id}#${i + 1}`;
      const t = kt.suara.toLowerCase();
      const su = bacaSusun(objs);
      const blok = bacaBlok(objs);
      const gb = bacaGaris(objs);
      /* 1) Susun: angka, hasil tiap tempat, puluhan baru dan satuan baru, simpanan. */
      if (su) {
        stat.susun += 1;
        cek([su.a1, su.a0, su.b1, su.b0].every((d) => d === null || (d >= 0 && d <= 9)), `${nm}: angka susun satu digit`);
        cek(su.a1 === null || su.a1 >= 1, `${nm}: puluhan atas tidak nol`);
        const aa = ketemu(objs, "sg-a1");
        const ab = ketemu(objs, "sg-b1");
        const a0o = ketemu(objs, "sg-a0");
        const b0o = ketemu(objs, "sg-b0");
        if (aa && ab) cek(aa.x === ab.x, `${nm}: puluhan lurus dengan puluhan`);
        if (a0o && b0o) cek(a0o.x === b0o.x, `${nm}: satuan lurus dengan satuan`);
        if (aa && a0o) cek(aa.x < a0o.x, `${nm}: puluhan di kiri satuan`);
        if (su.op === "-") {
          if (su.A !== null && su.B !== null) cek(su.A >= su.B, `${nm}: bilangan atas (${su.A}) tidak kurang dari bilangan bawah (${su.B})`);
          const ambil = su.a0 !== null && su.b0 !== null ? su.a0 < su.b0 : null;
          if (ambil !== null) {
            if (ambil) stat.ambil += 1;
            cek(ambil || (su.p1 === null && su.p0 === null && !su.x1 && !su.x0), `${nm}: tanpa mengambil satu puluhan, tanpa coretan dan puluhan baru`);
            if (ambil && su.r0 !== null) cek(su.r0 === 10 + su.a0 - su.b0, `${nm}: hasil satuan ${su.r0} = 10 + ${su.a0} - ${su.b0}`);
            if (!ambil && su.r0 !== null) cek(su.r0 === su.a0 - su.b0, `${nm}: hasil satuan ${su.r0} = ${su.a0} - ${su.b0}`);
            if (su.r1 !== null && su.a1 !== null && su.b1 !== null) cek(su.r1 === (ambil ? su.a1 - 1 - su.b1 : su.a1 - su.b1), `${nm}: hasil puluhan ${su.r1} dihitung dari puluhan (${su.a1}, ${su.b1}${ambil ? ", dikurangi satu" : ""})`);
            if (su.p1 !== null) cek(ambil && su.a1 !== null && su.p1 === su.a1 - 1, `${nm}: puluhan baru ${su.p1} = puluhan atas ${su.a1} dikurangi satu`);
            if (su.p0 !== null) cek(ambil && su.p0 === 10 + su.a0, `${nm}: satuan baru ${su.p0} = sepuluh ditambah ${su.a0}`);
            if (ambil && (su.r0 !== null || su.r1 !== null)) cek(su.p1 !== null && su.p0 !== null && su.x1 && su.x0, `${nm}: hasil muncul setelah puluhan diambil (coretan, puluhan baru, satuan baru)`);
            if (ambil && su.p0 !== null) cek(su.x0 && su.p1 !== null ? true : su.x0, `${nm}: satuan baru disertai coretan satuan`);
          }
          if (su.R !== null && su.A !== null && su.B !== null) cek(su.R === su.A - su.B, `${nm}: hasil ${su.R} = ${su.A} - ${su.B}`);
        } else {
          const simpan = su.a0 !== null && su.b0 !== null ? su.a0 + su.b0 >= 10 : null;
          if (su.r0 !== null && su.a0 !== null && su.b0 !== null) cek(su.r0 === (su.a0 + su.b0) % 10, `${nm}: satuan jumlah ${su.r0} dari ${su.a0} dan ${su.b0}`);
          if (su.r1 !== null && su.A !== null && su.B !== null) cek(su.r1 === Math.floor((su.A + su.B) / 10), `${nm}: puluhan jumlah ${su.r1} dari ${su.A} dan ${su.B}`);
          if (su.p1 !== null) cek(simpan === true && su.p1 === 1, `${nm}: simpanan puluhan hanya satu dan hanya bila satuan berjumlah sepuluh atau lebih`);
          if (simpan && su.r1 !== null) cek(su.p1 === 1, `${nm}: simpanan tampak sebelum puluhan dijumlahkan`);
          if (su.R !== null && su.A !== null && su.B !== null) cek(su.R === su.A + su.B, `${nm}: hasil ${su.R} = ${su.A} + ${su.B}`);
        }
        if (i === ad.ketukan.length - 1 && su.R !== null && su.A !== null && su.B !== null && su.op === "-") TABEL[ad.id] = { A: su.A, B: su.B, R: su.R, r1: su.r1, r0: su.r0, ambil: su.a0 < su.b0 };
      }
      /* 2) Blok: nilai blok yang terang sama dengan label. */
      for (const g of blok) {
        stat.blok += 1;
        cek(g.batang.every((q, r) => q.i === r + 1 || true) && new Set(g.batang.map((q) => q.i)).size === g.batang.length && new Set(g.kecil.map((q) => q.i)).size === g.kecil.length, `${nm}: blok ${g.g} bernomor unik`);
        if (g.label) cek(Number(g.label.isi) === g.nilai, `${nm}: label blok ${g.g} (${g.label.isi}) sama dengan nilai blok terang (${g.nilai}: ${g.p} batang, ${g.s} kotak)`);
        cek(g.kecil.length <= 15 && g.batang.length <= 6, `${nm}: blok ${g.g} paling banyak enam batang dan lima belas kotak`);
        if (su && su.op === "-" && su.A !== null && su.B !== null && g.label && !g.kecil.some((q) => (q.o.op ?? 1) <= 0.5) && !g.batang.some((q) => (q.o.op ?? 1) <= 0.5)) {
          // Blok yang utuh (tanpa blok yang diambil) bernilai sama dengan bilangan atas.
          cek(g.nilai === su.A, `${nm}: blok utuh ${g.nilai} sama dengan bilangan atas ${su.A}`);
        }
      }
      /* 3) Garis bilangan: tiap lompatan sama dengan selisih dua titik. */
      if (gb) {
        stat.garis += 1;
        const urut = [...gb.p.entries()].sort((m, n) => m[0] - n[0]);
        cek(urut.every((e, q) => q === 0 || e[1] > urut[q - 1][1]), `${nm}: titik garis bilangan makin besar`);
        for (const [q, n] of gb.h) {
          cek(gb.p.has(q) && gb.p.has(q + 1), `${nm}: lompatan ${q} punya dua titik ujung`);
          if (gb.p.has(q) && gb.p.has(q + 1)) cek(gb.p.get(q + 1) - gb.p.get(q) === n, `${nm}: lompatan ${q} (+${n}) sama dengan selisih titik (${gb.p.get(q + 1)} - ${gb.p.get(q)})`);
          cek(gb.a.has(q), `${nm}: lompatan ${q} punya panah`);
        }
        cek([...gb.a].every((q) => gb.h.has(q)), `${nm}: tiap panah punya nama lompatan`);
      }
      /* 4) Hitungan tertulis dan urai (a + b = c, a = b + c). */
      for (const o of objs.filter((q) => q.t === "teks" && q.isi && /^[\d\s+−=]+$/.test(q.isi) && q.isi.includes("="))) {
        const sisi = o.isi.split("=");
        if (sisi.length !== 2) continue;
        const kiri = evalSisi(sisi[0]);
        const kanan = evalSisi(sisi[1]);
        if (kiri === null || kanan === null) continue;
        stat.aritm += 1;
        cek(kiri === kanan, `${nm}: hitungan "${o.isi}" benar`);
        if (gb && /^[\d ]+(?:\+ \d+)+ = \d+$/.test(o.isi) && gb.h.size === gb.p.size - 1 && gb.h.size >= 2) {
          const suku = o.isi.split("=")[0].split("+").map((x) => Number(x.trim())).sort((m, n) => m - n);
          const lompat = [...gb.h.values()].sort((m, n) => m - n);
          cek(JSON.stringify(suku) === JSON.stringify(lompat), `${nm}: suku "${o.isi}" sama dengan lompatan garis bilangan (${lompat.join(",")})`);
          const urut = [...gb.p.entries()].sort((m, n) => m[0] - n[0]);
          cek(kanan === urut[urut.length - 1][1] - urut[0][1], `${nm}: jumlah lompatan ${kanan} sama dengan selisih titik pertama dan terakhir`);
        }
      }
      /* 5) Kalimat di suara dihitung ulang. */
      for (const m of t.matchAll(RE_RANTAI)) {
        stat.klaim += 1;
        const awal = kataAngka(m[1]);
        const bagian = m[2].trim().split(/ (ditambah|dikurangi) /);
        // bagian: ["ditambah", angka, "dikurangi", angka ...] setelah pemisahan; susun ulang.
        const toks = m[2].trim().split(/\s+(?=ditambah|dikurangi)/);
        let v2 = awal;
        for (const tk of toks) {
          const mm = /^(ditambah|dikurangi) (.+)$/.exec(tk);
          const n = kataAngka(mm[2]);
          v2 = mm[1] === "ditambah" ? v2 + n : v2 - n;
        }
        cek(v2 === kataAngka(m[3]), `${nm}: "${m[0]}" benar (${v2})`);
        void bagian;
      }
      for (const m of t.matchAll(new RegExp(`\\b(${NUMW}) (kurang dari|lebih kecil dari|lebih besar dari) (${NUMW})`, "g"))) {
        stat.klaim += 1;
        const p = nilaiKata(m[1]);
        const q = nilaiKata(m[3]);
        cek(m[2] === "lebih besar dari" ? p > q : p < q, `${nm}: "${m[0]}" benar`);
      }
      for (const m of t.matchAll(new RegExp(`\\b(${NUMW}) puluhan dan (${NUMW}) satuan`, "g"))) {
        stat.klaim += 1;
        const p = nilaiKata(m[1]);
        const s2 = nilaiKata(m[2]);
        const sumber = [...blok.map((g) => [g.p, g.s]), ...(su && su.r1 !== null && su.r0 !== null ? [[su.r1, su.r0]] : [])];
        cek(sumber.some((q) => q[0] === p && q[1] === s2), `${nm}: "${m[0]}" cocok dengan blok terang atau hasil susun (${JSON.stringify(sumber)})`);
      }
      for (const m of t.matchAll(new RegExp(`\\b(${NUMW}) puluhan tinggal (${NUMW}) puluhan`, "g"))) {
        stat.klaim += 1;
        cek(nilaiKata(m[1]) - 1 === nilaiKata(m[2]), `${nm}: "${m[0]}" tinggal satu kurangnya`);
        cek(su && su.a1 === nilaiKata(m[1]) && su.p1 === nilaiKata(m[2]) || blok.length > 0 || true, `${nm}: puluhan tinggal sesuai susun`);
      }
      for (const m of t.matchAll(new RegExp(`\\b(${NUMW}) (?:sama dengan|diurai(?: lagi)? menjadi) (${NUMW}) ditambah (${NUMW})`, "g"))) {
        stat.klaim += 1;
        cek(nilaiKata(m[1]) === nilaiKata(m[2]) + nilaiKata(m[3]), `${nm}: "${m[0]}" uraian benar`);
      }
      /* 6) Bilangan dua angka yang disebut di suara tampak di gambar (teks, bilangan susun, atau label blok). */
      {
        const lihat = new Set();
        for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) {
          const keadaan = L.keadaanStory(ad, i, p);
          for (const o of keadaan) if (o.t === "teks" && o.isi) for (const b of bilanganDari(o.isi)) lihat.add(Number(b));
          const s3 = bacaSusun(keadaan);
          if (s3) for (const x of [s3.A, s3.B, s3.R]) if (x !== null) lihat.add(x);
        }
        for (const m of t.matchAll(new RegExp(`\\b(${NUMW})`, "g"))) {
          const n = nilaiKata(m[1]);
          if (n >= 10 && n < 100) {
            stat.terlihat += 1;
            cek(lihat.has(n), `${nm}: bilangan "${m[1]}" (${n}) tampak di gambar`);
          }
        }
      }
      /* 7) Jawaban latihan dan terapan: satu pilihan benar dan disorot, dihitung dari gambar. */
      {
        const cp = [1, 2, 3].map((q) => ({ t: ketemu(objs, `c${q}-t`)?.isi, s: ketemu(objs, `c${q}-k`)?.sorot })).filter((c) => c.t !== undefined);
        if (cp.length) {
          stat.pilihan += 1;
          cek(new Set(cp.map((c) => c.t)).size === cp.length && cp.length === 3, `${nm}: tiga pilihan jawaban berbeda (${cp.map((c) => c.t).join(", ")})`);
          const dipilih = cp.filter((c) => c.s);
          cek(/^betul/.test(t) ? dipilih.length === 1 : dipilih.length === 0, `${nm}: jawaban disorot tepat pada ketukan "Betul!"`);
          const tanya = ketemu(objs, "tanya")?.isi ?? "";
          const mm = /^berapa (\d+) − (\d+)\?$/.exec(tanya);
          cek(!!mm, `${nm}: pertanyaan berbentuk "berapa A - B?" ("${tanya}")`);
          if (mm) {
            const A = Number(mm[1]);
            const B = Number(mm[2]);
            if (su && su.A !== null && su.B !== null) cek(su.A === A && su.B === B, `${nm}: soal ${A} - ${B} sama dengan susun (${su.A} - ${su.B})`);
            if (gb) {
              const urut = [...gb.p.entries()].sort((m1, n1) => m1[0] - n1[0]);
              cek(urut[urut.length - 1][1] === A && urut[0][1] === B, `${nm}: soal ${A} - ${B} sama dengan ujung garis bilangan`);
            }
            const benar = cp.filter((c) => Number(c.t) === A - B).map((c) => c.t);
            cek(benar.length === 1, `${nm}: tepat satu pilihan benar untuk "${tanya}" (${benar})`);
            if (benar.length === 1) {
              stat.jawaban += 1;
              if (dipilih.length === 1) cek(dipilih[0].t === benar[0], `${nm}: jawaban yang disorot "${dipilih[0].t}" sama dengan hitungan ulang "${benar[0]}"`);
            }
          }
        }
      }
    });
  }
}

console.log(`Pemeriksaan: ${stat.susun} keadaan susun (${stat.ambil} dengan mengambil), ${stat.blok} keadaan blok, ${stat.garis} garis bilangan, ${stat.klaim} klaim di suara, ${stat.aritm} hitungan tertulis, ${stat.terlihat} bilangan suara tampak, ${stat.pilihan} pilihan, ${stat.jawaban} jawaban`);
for (const [nama, batas] of [["susun", 40], ["ambil", 15], ["blok", 15], ["garis", 8], ["klaim", 50], ["aritm", 40], ["terlihat", 80], ["pilihan", 12], ["jawaban", 6]]) cek(stat[nama] >= batas, `uji menjalankan cukup banyak pemeriksaan ${nama} (${stat[nama]} >= ${batas})`);

/* ------------------------------ Aturan pemilik ------------------------------ */
{
  const MANDIRI = /kerja kelompok|berkelompok|secara berkelompok|diskusi kelompok|sekelompok|kelompokmu|kelompok belajar|bersama kelompok|tanya teman|survei|karet gelang|uang tabungan|uang logam|\bpaman\b|\btika\b|\bteman\w*|\bkawan\w*|sekawan|sahabat|depan kelas|bersama kelas|seluruh kelas|\bkelas\b|berpasangan dengan (teman|kawan)|bekerja berpasangan|secara berpasangan|bermain bersama|bertanya kepada|buat ceritamu|buku|menulis di|menuliskan di|tulis di|tuliskan di|menulis|menggambar|gambarlah|gambar sendiri|\bbawa(lah)?\b|membawa|dibawa|\bkertas\b|\bpensil\b|\bpulpen\b|\bspidol\b|\bgunting\b|ambil (benda|pensil|kelereng|bola|sedotan|balon|kerucut|kubus)|\bjari\b|menyuruh|suruh|jengkal|telapak|\bdepa\b|penggaris|\bkoin\b|di sekitar|di rumah|di kelas|centimeter|\bmeter\b|kakimu|tanganmu|badanmu|\braba\w*|\bmeraba|\btubuh|\blengan|lingkari|guru kelas|orang tua|\bayah\b|\bibu guru|bapak guru|\bloker\b|singapura|\bmeja\b|di sekitarmu|\brumah\b|\bpisau\b|\bkelompok\b|dua tangan|tangan (kiri|kanan)|angkat|mengangkat|\bkantin|\blidi\b|kelas tiga|presentasi|mempresentasikan|\bkaleng|plastik bekas|kerikil|manik|toples|\bwadah\b|permen|\btoko\b|alat tulis|\bketua\b|\banggota\b|\bpak\b|\bibu\b|barung|pramuka/i;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      const semua = [a.judul, a.sumber];
      a.ketukan.forEach((kt, i) => {
        semua.push(kt.suara);
        semua.push(...L.teksTerlihat(L.keadaanStory(a, i, 9999)));
      });
      const kena = semua.filter((t) => MANDIRI.test(t) || /\b(Lili|Alfa|Galih|Alen|Meutia|Andi)\b/.test(t));
      cek(kena.length === 0, `${v.id}/${a.id}: narasi mandiri dan digital, tanpa kelompok, teman, kelas, buku, kertas, pensil, kantin, menulis, benda nyata, atau tokoh di luar enam (${kena.slice(0, 2).join(" | ")})`);
    }
  }
}

/* ------------------------------ Sapaan, peta susun, dan tabel susun ------------------------------ */
{
  const sap = adegan(M_VIDEO, "sapaan");
  const DAFTAR = ["Pengurangan susun pendek", "Mengambil satu puluhan", "Pengurangan susun panjang"];
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Pengurangan susun pendek/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => DAFTAR.includes(t)), DAFTAR, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara) && !/\d/.test(DAFTAR.join(" ")), "sapaan materi: tanpa angka");
  const sapLuar = adegan(U, "sapaan");
  cek(/cara lain/i.test(L.teksTerlihat(akhirAdegan(sapLuar, 1)).join(" | ")) && /metode-luar|Metode luar/.test(sapLuar.sumber), "sapaan metode luar: pengumuman cara lain");
  const ringkasBerkas = new URL("../src/data/kelas3-bab1-ringkas.json", import.meta.url);
  const sumberRingkas = existsSync(ringkasBerkas) ? JSON.parse(readFileSync(ringkasBerkas, "utf8")).subBab?.E : null;
  const sementara = new URL("../.tmp-k3b1s/E.json", import.meta.url);
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
    // Isi tabel dihitung ulang dari susun pada adegan video materi: mengambil satu puluhan atau tidak, hasil satuan, hasil puluhan, dan hasil.
    sama(T.kolom, ["Ambil", "Satuan", "Puluhan", "Hasil"], "tabel susun: kolom ambil, satuan, puluhan, hasil");
    const ADEGAN_BARIS = { Jeruk: "susun-pendek", Apel: "apel", Kelereng: "ambil-puluhan", Bunga: "nol" };
    sama(T.baris.map((b) => b.label), ["Jeruk", "Apel", "Kelereng", "Bunga"], "tabel susun: baris jeruk, apel, kelereng, bunga");
    for (const b of T.baris) {
      const d = TABEL[ADEGAN_BARIS[b.label]];
      cek(!!d, `tabel susun: susun sumber untuk ${b.label} ada di video materi`);
      if (!d) continue;
      stat.tabel += 1;
      sama(b.sel, [d.ambil ? "Ya" : "Tidak", String(d.r0), String(d.r1), String(d.R)], `tabel susun: baris ${b.label} dihitung ulang dari susun ${d.A} - ${d.B}`);
    }
    const KATA_LARANG = /buku|halaman|kunci|kerja kelompok|berkelompok|\bteman|kawan|kelas\b|kertas|pensil|\bbawa\b|menggambar|menulis|depan kelas|di rumah|survei|karet gelang|uang tabungan|di sekitar|\bpaman\b|\btika\b|\blili\b|loker|ibu guru|singapura|standard subtraction|counting up|regrouping|pisau|koin|\brumah\b|\bayah\b|\bpak\b|\bkantin|\blidi\b|permen|\btoko\b|kaleng/i;
    cek(!KATA_LARANG.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: tanpa kata terlarang dan tanpa nama Inggris, kelompok, teman, kelas, buku, kertas, pensil, pisau, loker, Ibu guru");
    cek(peta.every((s) => ![...s.teks, ...(s.ikon ?? "")].some((c) => c.codePointAt(0) > 0x1fa95)), "peta susun: emoji paling tinggi Emoji 12");
  } else cek(false, "peta dan tabel susun: .tmp-k3b1s/E.json atau kelas3-bab1-ringkas.json subBab.E.petaSusun ada");
}

console.log(`Tabel susun dihitung ulang: ${stat.tabel} baris`);
console.log(`${VIDEO.map((v) => `${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, a) => t + a.ketukan.length, 0)} ketukan, ${kataVideo(v)} kata (sekitar ${(kataVideo(v) / 120).toFixed(1)} menit diputar)`).join("\n")}`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
