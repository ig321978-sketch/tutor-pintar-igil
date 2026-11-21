// Uji Story Kelas 4 Bab 5 Sub-Bab B "Mosaik Pak Rudi" (menyusun dan menguraikan bangun datar), akhir cerita Toko Keramik Bu Dewi: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k4b5b.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k4b5b-video.ts");

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
const dekat = (a, b, tol, pesan) => cek(Math.abs(a - b) <= tol, `${pesan}: ${a} vs ${b} (toleransi ${tol})`);

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
const VIDEO = [V.VIDEO_MATERI_K4B5B, V.VIDEO_LUAR_K4B5B];
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
      cek(kata.length >= 5 && kata.length <= 40, `${nama}#${i + 1}: 5 sampai 40 kata (ada ${kata.length})`);
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
          cek(t !== null, `${nama}#${i + 1}: jalur ${o.id} berupa poligon tertutup`);
          if (t) cek(t.every((p) => p[0] > -2 && p[0] < 302 && p[1] > -2 && p[1] < 204), `${nama}#${i + 1}: bangun ${o.id} masuk kanvas`);
        } else if (o.t === "garis" || o.t === "panah") cek(x > -2 && x < 302 && y > -2 && y < 204 && x + (o.x2 ?? 0) > -2 && x + (o.x2 ?? 0) < 302 && y + (o.y2 ?? 0) > -2 && y + (o.y2 ?? 0) < 204, `${nama}#${i + 1}: garis ${o.id} masuk kanvas`);
      }
      {
        const teksAda = akhir.filter((o) => o.t === "teks" && (o.op ?? 1) > 0 && o.isi && !/^[\u{1F000}-\u{1FFFF}]|^[✂✅❌✊⚡⌛✨❓❗]$/u.test(o.isi));
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

for (const v of VIDEO) for (const a of v.adegan) a.ketukan.forEach((_, i) => { for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(typeof o.isi === "string" && o.isi.length > 0, `${v.id}/${a.id}#${i + 1}: teks berisi (${o.id})`); });

/* ------------------------------ Geometri murni dari koordinat jalur ------------------------------ */
const luasPoli = (p) => {
  let s = 0;
  for (let i = 0; i < p.length; i += 1) {
    const a = p[i];
    const b = p[(i + 1) % p.length];
    s += a[0] * b[1] - b[0] * a[1];
  }
  return Math.abs(s / 2);
};
const sisiPoli = (p) => p.map((a, i) => Math.hypot(p[(i + 1) % p.length][0] - a[0], p[(i + 1) % p.length][1] - a[1]));
const dalamPoli = (pt, poly) => {
  let ins = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > pt[1] !== yj > pt[1] && pt[0] < ((xj - xi) * (pt[1] - yi)) / (yj - yi) + xi) ins = !ins;
  }
  return ins;
};
const sikuSiku = (p) => {
  // jumlah sudut siku-siku (|cos| < 0,02)
  let n = 0;
  for (let i = 0; i < p.length; i += 1) {
    const a = p[(i + p.length - 1) % p.length];
    const b = p[i];
    const c = p[(i + 1) % p.length];
    const u = [a[0] - b[0], a[1] - b[1]];
    const w = [c[0] - b[0], c[1] - b[1]];
    const cos = (u[0] * w[0] + u[1] * w[1]) / (Math.hypot(...u) * Math.hypot(...w));
    if (Math.abs(cos) < 0.02) n += 1;
  }
  return n;
};
const samaPanjang = (arr, tol) => arr.every((x) => Math.abs(x - arr[0]) <= tol);
/** Jalur dari objek berid `${p}-<angka>` (atau daftar id) pada keadaan akhir sebuah ketukan, berupa daftar titik. */
const bangunDari = (objs, id) => {
  const o = objs.find((q) => q.id === id);
  return o && o.t === "jalur" ? titikJalur(o) : null;
};
const polaId = (objs, re) => objs.filter((o) => o.t === "jalur" && re.test(o.id));
/** Banyak titik contoh yang tercakup lebih dari satu bangun (tumpang tindih) dan luas gabungan kasar. */
const periksaTumpuk = (daftar, langkah = 0.6) => {
  const xs = daftar.flat().map((p) => p[0]);
  const ys = daftar.flat().map((p) => p[1]);
  let ganda = 0;
  let isi = 0;
  for (let x = Math.min(...xs) + langkah / 2; x < Math.max(...xs); x += langkah)
    for (let y = Math.min(...ys) + langkah / 2; y < Math.max(...ys); y += langkah) {
      const n = daftar.filter((p) => dalamPoli([x, y], p)).length;
      if (n > 1) ganda += 1;
      if (n >= 1) isi += 1;
    }
  return { ganda, luas: isi * langkah * langkah, kotakBatas: [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)] };
};
const bilanganSuara = (s) => {
  const KAMUS = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9, sepuluh: 10 };
  return (s.toLowerCase().match(/[a-z]+/g) ?? []).filter((w) => w in KAMUS).map((w) => KAMUS[w]);
};
sama(bilanganSuara("Satu, dua, kedua, keduanya, satuan, segilima, segienam, tujuh keping."), [1, 2, 7], "pembaca bilangan suara");

/* ------------------------------ Khusus Sub-Bab B Kelas 4 Bab 5 ------------------------------ */
{
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k4b5b-luar-1.ts");
  const M2 = await import("../src/components/modul/story/k4b5b-materi-2.ts");
  const U2 = await import("../src/components/modul/story/k4b5b-luar-2.ts");
  const G = await import("../src/components/modul/story/k4b5b-gambar.ts");
  const M_VIDEO = V.VIDEO_MATERI_K4B5B;
  const U = V.VIDEO_LUAR_K4B5B;
  const adegan = (v, id) => v.adegan.find((a) => a.id === id);
  const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  const ketemu = (objs, id) => objs.find((o) => o.id === id);
  const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
  const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
  const tidakAda = (objs, ...ids) => ids.every((id) => !ketemu(objs, id));

  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Fit the Pieces|Cut Into Triangles|Many Ways Mosaic|Pasang Keping|Bagi Jadi Segitiga|Mosaik Banyak Cara/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Fit the Pieces", "Cut Into Triangles", "Many Ways Mosaic"], ["Pasang Keping", "Bagi Jadi Segitiga", "Mosaik Banyak Cara"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Mosaik Pak Rudi" && U.judul === M_VIDEO.judul && V.JUDUL_K4B5B === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k4b5b-materi" && U.id === "k4b5b-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,kotak,menyusun,menguraikan,salah-segienam,hitung-segitiga,menyapu,banyak-cara,tangram,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-pasang,luar-pasang-terapan,luar-bagi,luar-bagi-terapan,luar-mosaik,luar-mosaik-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  // Judul adegan yang tergambar pendek (tidak tertutup lencana n/10) dan judul adegan wajar.
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) {
    cek(a.judul.length <= 40, `${v.id}/${a.id}: judul adegan paling banyak 40 huruf (${a.judul.length})`);
    for (let i = 0; i < a.ketukan.length; i += 1) {
      const j = akhirAdegan(a, i).find((o) => o.id === "jud" || o.id === "sp-jud" || o.id === "sp-jud2" || o.id === "sp-jud3");
      if (j) cek((j.isi ?? "").length <= 27, `${v.id}/${a.id}#${i + 1}: judul tergambar paling banyak 27 huruf ("${j.isi}")`);
    }
  }
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan|senilai|ditemani)/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)) && !TERLARANG.test(a.id) && !TERLARANG.test(JSON.stringify(a.ketukan.flatMap((kt) => kt.aksi.flatMap((ak) => [].concat(ak.tambah ?? []).map((o) => o.id))))), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda (di|dari) rumah|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
  // Bilangan yang diucapkan dengan kata tampak sebagai angka di gambar pada ketukan itu. Sapaan bersama dikecualikan.
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan)
      if (a.id !== "sapaan")
        a.ketukan.forEach((kt, i) => {
          const terlihat = new Set();
          for (let p = -1; p < L.kataDari(kt.suara).length; p += 1) for (const t of L.teksTerlihat(L.keadaanStory(a, i, p))) for (const b of bilanganDari(t)) terlihat.add(Number(b));
          for (const n of bilanganSuara(kt.suara)) cek(terlihat.has(n), `${v.id}/${a.id}#${i + 1}: bilangan ${n} yang diucapkan tampak sebagai angka`);
        });
  const semuaSuara = M_VIDEO.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [1, 2, 5, 6, 7]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [1, 2, 3, 4, 5]) cek(bilanganSuara(semuaLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Satria", "Laras", "Genta", "Pak Hendro", "Bu Dewi", "Pak Rudi", "keping", "persegi", "segitiga", "segienam", "jajargenjang", "tangram", "perahu", "rumah", "mosaik", "komposisi", "dekomposisi", "menyusun", "menguraikan"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const kata of ["Pak Rudi", "keping", "segilima", "persegi", "jajargenjang", "mosaik"]) cek(luar.toLowerCase().includes(kata.toLowerCase()), `video global memuat "${kata}"`);
  for (const pola of [/Igil/, /Kaka/, /Abang/, /Mamah/, /Pak Pos/i, /rumah rapi/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /pustaka/i, /perpustakaan/i, /kantin/i, /koperasi/i, /seragam sekolah/i, /Chacha/, /Dika/, /\bNia\b/, /Bu Sari/, /pentas/i, /bank sampah/i, /\bRaka\b/, /\bSalsa\b/, /\bBima\b/, /Pak Joko/, /kebun binatang/i, /kandang/i, /perkemahan/i, /api unggun/i, /bengkel/i, /layang/i, /\bHelen\b/, /Azizah/, /Pak Toni/, /Pak Wicak/, /minimarket/i, /Pak Hasan/, /sepeda/i, /Kak Tari/, /Pak Wayan/, /Bu Lastri/, /Dokter Hana/, /Bu Ratih/, /Kak Anton/, /Pak Samsul/, /Tiara/, /Slamet/, /pizza/i, /Bu Maya/, /Pak Laode/, /Kak Tiara/, /Pak Darwis/, /Bu Rina/, /Pak Usman/, /Bu Marni/, /Bu Ratna/, /Kak Yoga/, /penginapan/i, /pantai/i, /kelapa/i, /batik/i, /Bu Wulan/, /Pak Joyo/, /Kak Sekar/, /Pak Bagas/, /Bu Tuti/, /sanggar/i, /Bu Ratri/, /Pak Gunawan/, /angklung/i, /kursi/i, /konser/i, /panggung/i, /bikanb/i, /ubin/i, /lantai kolam/i, /kolam/i, /ember/i, /Pak Anto/, /Bu Sinta/, /\bikan\b/i, /\bpulau\b/i, /liter/i, /gelas/i, /Pak Ujang/, /Bu Lia/, /Pak Hendra/])
    for (const isi of [materi, luar]) cek(!pola.test(isi.replace(/"lt-g\d"/g, "")), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3.2, `durasi video global lebih dari tiga menit dengan margin (${(kataVideo(U) / 120).toFixed(2)} menit, ${kataVideo(U)} kata)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/menyusun dan menguraikan bangun datar/.test(sapa.ketukan[0].suara) && ["Menyusun", "Menguraikan", "Banyak cara"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k4b5b.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  // Visual berubah mengikuti kata pada hampir semua ketukan.
  let banyakTitik = 0;
  let total = 0;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) { total += 1; if (new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at))).size >= 2) banyakTitik += 1; }
  cek(banyakTitik / total >= 0.9, `visual berubah mengikuti kata pada sedikitnya 90 persen ketukan (${banyakTitik}/${total})`);
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") cek(akhirAdegan(a).some((o) => o.t !== "teks" || /^[\u{1F000}-\u{1FFFF}]/u.test(o.isi ?? "")), `${v.id}/${a.id}: gambar akhir memuat bentuk gambar sendiri, bukan hanya teks`);
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const [i, kt] of a.ketukan.entries()) for (const ak of kt.aksi) cek(L.posisiKata(kt.suara, ak.at) >= 0, `${v.id}/${a.id}#${i + 1}: kata pemicu "${ak.at}" ada dalam suara`);
  // Tidak ada gambar tokoh yang menutup angka atau nama.
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan)
      a.ketukan.forEach((_, i) => {
        const objs = L.keadaanStory(a, i, 9999);
        for (const w of objs.filter((o) => o.t === "teks" && /^[\u{1F466}\u{1F467}\u{1F9D2}\u{1F468}\u{1F469}\u{1F9D1}]$/u.test(o.isi ?? "") && (o.u ?? 10) >= 28)) {
          const kiri = (w.x ?? 0) - 15;
          const kanan = (w.x ?? 0) + 15;
          const atas = (w.y ?? 0) - 24;
          const bawah = (w.y ?? 0) + 4;
          for (const o of objs.filter((q) => q.t === "teks" && !/^[\u{1F000}-\u{1FFFF}]|^[✂✅❌✊⚡⌛✨❓❗]$/u.test(q.isi ?? "") && !/-n$/.test(q.id) && q.id !== w.id)) {
            const u = o.u ?? 10;
            const lebar = (o.isi ?? "").length * u * 0.56;
            const x1 = (o.x ?? 0) - lebar / 2;
            const x2 = (o.x ?? 0) + lebar / 2;
            const y1 = (o.y ?? 0) - u * 0.75;
            const y2 = (o.y ?? 0) + u * 0.2;
            cek(!(Math.min(x2, kanan) - Math.max(x1, kiri) > 1 && Math.min(y2, bawah) - Math.max(y1, atas) > 1), `${v.id}/${a.id}#${i + 1}: teks "${o.isi}" (${o.id}) tertutup gambar tokoh ${w.id}`);
          }
        }
      });
  // Label nama tokoh diturunkan (y + 4 + selisih) supaya tidak menempel dagu.
  {
    const gm = readFileSync(new URL("../src/components/modul/story/k4b5b-gambar.ts", import.meta.url), "utf8");
    cek(/bulatkan\(y \+ 4 \+ \(nama === "Pak Hendro"/.test(gm), "label nama tokoh diturunkan (y + 4 + ...) seperti story k4b4");
  }

  /* ---- Bangun benar dari koordinat ---- */
  // Segitiga siku-siku sama kaki: dua sisi tegak sama panjang, satu sudut siku-siku.
  const segitigaSikuSamaKaki = (p, tag) => {
    cek(p && p.length === 3, `${tag}: segitiga bertitik tiga`);
    if (!p || p.length !== 3) return;
    const s = sisiPoli(p).sort((m, n) => m - n);
    cek(sikuSiku(p) === 1 && Math.abs(s[0] - s[1]) < 0.3 && Math.abs(s[2] - s[0] * Math.SQRT2) < 0.5, `${tag}: segitiga siku-siku sama kaki (sisi ${s.map((q) => q.toFixed(1)).join(", ")})`);
  };
  // Menyusun: dua segitiga siku-siku sama kaki yang sama besar menjadi satu persegi.
  {
    const a = adegan(M_VIDEO, "menyusun");
    const o = akhirAdegan(a, 2);
    const A = bangunDari(o, "ta");
    const B = bangunDari(o, "tb").map((p) => [p[0], p[1]]);
    segitigaSikuSamaKaki(A, "menyusun: keping A");
    segitigaSikuSamaKaki(B, "menyusun: keping B");
    dekat(luasPoli(A), luasPoli(B), 0.5, "menyusun: dua keping sama besar");
    const P = bangunDari(o, "so");
    cek(P.length === 4 && sikuSiku(P) === 4 && samaPanjang(sisiPoli(P), 0.2), "menyusun: hasilnya persegi (empat sisi sama, empat sudut siku-siku)");
    dekat(luasPoli(A) + luasPoli(B), luasPoli(P), 0.8, "menyusun: luas dua keping sama dengan luas persegi");
    cek(periksaTumpuk([A, B]).ganda <= 8, "menyusun: dua keping tidak bertumpuk");
  }
  // Menguraikan: persegi panjang menjadi dua persegi yang sama besar, atau dua segitiga siku-siku yang sama besar.
  {
    const a = adegan(M_VIDEO, "menguraikan");
    const o1 = akhirAdegan(a, 0);
    const Q0 = bangunDari(o1, "q0");
    const Q1 = bangunDari(o1, "q1");
    cek(Q0.length === 4 && Q1.length === 4 && sikuSiku(Q0) === 4 && sikuSiku(Q1) === 4 && samaPanjang(sisiPoli(Q0), 0.2) && samaPanjang(sisiPoli(Q1), 0.2), "menguraikan: dua persegi");
    dekat(luasPoli(Q0), luasPoli(Q1), 0.5, "menguraikan: dua persegi sama besar");
    const R = bangunDari(akhirAdegan(a, 2, 0).length ? L.keadaanStory(a, 2, 0).concat([]) : [], "rc2") ?? bangunDari(L.keadaanStory(a, 2, 5), "rc2");
    cek(R === null || (R.length === 4 && sikuSiku(R) === 4), "menguraikan: persegi panjang bersudut siku-siku");
    dekat(luasPoli(Q0) + luasPoli(Q1), 72 * 36, 1, "menguraikan: dua persegi menutup persegi panjang");
    const o3 = akhirAdegan(a, 2);
    const T0 = bangunDari(o3, "t0");
    const T1 = bangunDari(o3, "t1");
    cek(T0.length === 3 && T1.length === 3 && sikuSiku(T0) === 1 && sikuSiku(T1) === 1, "menguraikan: dua segitiga siku-siku");
    dekat(luasPoli(T0), luasPoli(T1), 0.5, "menguraikan: dua segitiga sama besar");
    dekat(luasPoli(T0) + luasPoli(T1), 72 * 36, 1, "menguraikan: dua segitiga menutup persegi panjang");
  }
  // Segienam beraturan dibelah dari titik tengah: ENAM segitiga sama sisi (bukan lima).
  {
    const H = M2.SEGIENAM;
    cek(H.length === 6 && samaPanjang(sisiPoli(H), 0.1), "segienam beraturan: enam titik sudut dan enam sisi sama panjang");
    const a = adegan(M_VIDEO, "hitung-segitiga");
    const o1 = akhirAdegan(a, 0);
    const gs = o1.filter((q) => q.t === "garis" && /^g-\d$/.test(q.id));
    cek(gs.length === 6 && ada(o1, "ct"), "hitung-segitiga: enam garis dari titik tengah ke enam sudut");
    const o2 = akhirAdegan(a, 1);
    const ts = polaId(o2, /^t-\d$/).map((q) => titikJalur(q));
    cek(ts.length === 6, `hitung-segitiga: tepat enam segitiga (ada ${ts.length})`);
    cek(ts.every((p) => p.length === 3 && samaPanjang(sisiPoli(p), 0.2)), "hitung-segitiga: semua segitiga sama sisi");
    cek(ts.every((p) => Math.abs(luasPoli(p) - luasPoli(ts[0])) < 0.5), "hitung-segitiga: semua segitiga sama besar");
    dekat(ts.reduce((s, p) => s + luasPoli(p), 0), luasPoli(H), 0.6, "hitung-segitiga: enam segitiga menutup segienam");
    cek(periksaTumpuk(ts).ganda <= 12, "hitung-segitiga: segitiga tidak bertumpuk");
    cek(isiTeks(o2, "c6") === "6 segitiga" && isiTeks(o2, "a6") === "6 sudut" && isiTeks(o2, "b6") === "6 garis", "hitung-segitiga: label enam sesuai gambar (enam sudut, enam garis, enam segitiga)");
    cek(ada(akhirAdegan(a, 2), "tk0", "tk1", "tk2", "n5") && isiTeks(akhirAdegan(a, 2), "n5") === "bukan 5", "hitung-segitiga: tanda sisi sama dan koreksi lima");
    const s = adegan(M_VIDEO, "salah-segienam");
    cek(ketemu(akhirAdegan(s, 1), "hx") && isiTeks(akhirAdegan(s, 1), "n5") === "5 segitiga?" && titikJalur(ketemu(akhirAdegan(s, 1), "hx")).length === 6, "salah-segienam: segienam beraturan bertitik enam dan klaim Satria lima segitiga");
    cek(isiTeks(akhirAdegan(s, 2), "tr") === "taruhan : menyapu toko" && ada(akhirAdegan(s, 2), "sp"), "salah-segienam: taruhan menyapu toko");
  }
  // Segilima beraturan (terapan global): LIMA segitiga sama kaki yang sama besar; titik meleset memberi segitiga tidak sama besar.
  {
    const P = U2.SEGILIMA;
    cek(P.length === 5 && samaPanjang(sisiPoli(P), 0.1), "segilima beraturan: lima titik sudut dan lima sisi sama panjang");
    const a = adegan(U, "luar-bagi-terapan");
    const o2 = akhirAdegan(a, 1);
    const ts = polaId(o2, /^t-\d$/).map((q) => titikJalur(q));
    cek(ts.length === 5 && isiTeks(o2, "a5") === "5 sisi" && isiTeks(o2, "b5") === "5 segitiga", "segilima: tepat lima segitiga, label lima sisi dan lima segitiga");
    cek(ts.every((p) => Math.abs(luasPoli(p) - luasPoli(ts[0])) < 0.8) && ts.every((p) => samaPanjang(sisiPoli(p).slice(1), 0.3) || samaPanjang([sisiPoli(p)[0], sisiPoli(p)[2]], 0.3)), "segilima: lima segitiga sama besar dan sama kaki");
    dekat(ts.reduce((s, p) => s + luasPoli(p), 0), luasPoli(P), 0.8, "segilima: lima segitiga menutup segilima");
    const o4 = akhirAdegan(a, 3);
    const us = polaId(o4, /^u-\d$/).map((q) => titikJalur(q));
    cek(us.length === 5 && !us.every((p) => Math.abs(luasPoli(p) - luasPoli(us[0])) < 1), "segilima: titik meleset menghasilkan lima segitiga yang tidak sama besar");
    dekat(us.reduce((s, p) => s + luasPoli(p), 0), luasPoli(P), 0.8, "segilima: titik meleset tetap menutup segilima");
  }
  // Konsep Bagi Jadi Segitiga: segienam dari satu titik menjadi enam segitiga; segiempat dari satu sudut menjadi dua segitiga.
  {
    const a = adegan(U, "luar-bagi");
    const o2 = akhirAdegan(a, 1);
    const ts = polaId(o2, /^t-\d$/).map((q) => titikJalur(q));
    cek(ts.length === 6 && isiTeks(o2, "n1") === "1 titik" && polaId(o2, /^g-\d$/).length + o2.filter((q) => /^g-\d$/.test(q.id)).length >= 6, "luar-bagi: satu titik, enam garis, enam segitiga");
    const o4 = akhirAdegan(a, 3);
    const q0 = bangunDari(o4, "q0");
    const q1 = bangunDari(o4, "q1");
    cek(q0.length === 3 && q1.length === 3 && isiTeks(o4, "n1") === "1 sudut" && isiTeks(o4, "n2") === "2 segitiga", "luar-bagi: segiempat dari satu sudut menjadi dua segitiga");
    dekat(luasPoli(q0) + luasPoli(q1), 0.5 * Math.abs(112 * 64 - 196 * 70 + 196 * 108 - 204 * 64 + 204 * 110 - 118 * 108 + 118 * 70 - 112 * 110), 1, "luar-bagi: dua segitiga menutup segiempat");
  }
  // Banyak cara: dua segitiga siku-siku sama kaki yang sama besar menjadi persegi, jajargenjang, dan segitiga yang lebih besar.
  {
    const a = adegan(M_VIDEO, "banyak-cara");
    const o = akhirAdegan(a, 1);
    for (const [p, nama] of [["p", "persegi"], ["j", "jajargenjang"], ["g", "segitiga besar"]]) {
      const A = bangunDari(o, `${p}0`);
      const B = bangunDari(o, `${p}1`);
      segitigaSikuSamaKaki(A, `banyak-cara ${nama}: keping A`);
      segitigaSikuSamaKaki(B, `banyak-cara ${nama}: keping B`);
      dekat(luasPoli(A), luasPoli(B), 0.5, `banyak-cara ${nama}: dua keping sama besar`);
      cek(periksaTumpuk([A, B]).ganda <= 6, `banyak-cara ${nama}: tanpa tumpang tindih`);
      const sama2 = A.filter((q) => B.some((r) => Math.hypot(q[0] - r[0], q[1] - r[1]) < 0.1)).length;
      cek(sama2 === 2, `banyak-cara ${nama}: dua keping bertemu pada satu sisi (dua titik sudut sama, ada ${sama2})`);
    }
    // Gabungan persegi: empat titik, empat sudut siku-siku. Jajargenjang: dua pasang sisi sejajar, tanpa sudut siku-siku. Segitiga besar: tiga titik, luas dua kali keping.
    const gabung = (p) => {
      const t = [...bangunDari(o, `${p}0`), ...bangunDari(o, `${p}1`)];
      const unik = t.filter((q, i) => t.findIndex((r) => Math.hypot(q[0] - r[0], q[1] - r[1]) < 0.1) === i);
      return unik;
    };
    const urut = (pts) => {
      const c = [pts.reduce((s, q) => s + q[0], 0) / pts.length, pts.reduce((s, q) => s + q[1], 0) / pts.length];
      return pts.slice().sort((m, n) => Math.atan2(m[1] - c[1], m[0] - c[0]) - Math.atan2(n[1] - c[1], n[0] - c[0]));
    };
    const PP = urut(gabung("p"));
    const JJ = urut(gabung("j"));
    const GG = urut(gabung("g"));
    cek(PP.length === 4 && sikuSiku(PP) === 4 && samaPanjang(sisiPoli(PP), 0.2), "banyak-cara: gabungan pertama persegi");
    const sj = sisiPoli(JJ);
    cek(JJ.length === 4 && Math.abs(sj[0] - sj[2]) < 0.2 && Math.abs(sj[1] - sj[3]) < 0.2 && sikuSiku(JJ) === 0 && Math.abs(sj[0] - sj[1]) > 3, "banyak-cara: gabungan kedua jajargenjang (sisi berhadapan sama, tanpa sudut siku-siku)");
    const vek = (p, i) => [p[(i + 1) % 4][0] - p[i][0], p[(i + 1) % 4][1] - p[i][1]];
    cek([0, 1].every((i) => Math.abs(vek(JJ, i)[0] * vek(JJ, i + 2)[1] - vek(JJ, i)[1] * vek(JJ, i + 2)[0]) < 1), "banyak-cara: jajargenjang punya dua pasang sisi sejajar");
    cek(GG.length >= 3 && sikuSiku(GG) === 1 && luasPoli(GG) > 1.9 * luasPoli(bangunDari(o, "g0")), "banyak-cara: gabungan ketiga segitiga yang lebih besar");
    cek(isiTeks(o, "n2") === "2 segitiga" && ada(akhirAdegan(a, 2), "e0", "e1", "e2"), "banyak-cara: label dua segitiga dan sisi yang dipertemukan ditandai");
  }
  // Persegi dari dua segitiga dan dari empat segitiga yang lebih kecil (terapan Mosaik Banyak Cara).
  {
    const a = adegan(U, "luar-mosaik-terapan");
    const o = akhirAdegan(a, 0);
    const d = ["d0", "d1"].map((id) => bangunDari(o, id));
    const e = ["e0", "e1", "e2", "e3"].map((id) => bangunDari(o, id));
    cek(d.length === 2 && e.length === 4 && d.every((p) => p && p.length === 3) && e.every((p) => p && p.length === 3), "mosaik terapan: dua segitiga dan empat segitiga");
    cek(!ketemu(o, "e4") && !ketemu(o, "d2"), "mosaik terapan: tidak ada keping tambahan");
    dekat(d.reduce((s, p) => s + luasPoli(p), 0), 44 * 44, 1, "mosaik terapan: dua segitiga menutup persegi");
    dekat(e.reduce((s, p) => s + luasPoli(p), 0), 44 * 44, 1, "mosaik terapan: empat segitiga menutup persegi");
    cek(e.every((p) => Math.abs(luasPoli(p) - luasPoli(e[0])) < 0.5) && d.every((p) => Math.abs(luasPoli(p) - luasPoli(d[0])) < 0.5) && luasPoli(e[0]) < luasPoli(d[0]), "mosaik terapan: segitiga sama besar tiap susunan, empat segitiga lebih kecil dari dua segitiga");
    cek(isiTeks(o, "n2") === "2 segitiga" && isiTeks(o, "n4") === "4 segitiga", "mosaik terapan: label dua dan empat segitiga");
    cek(periksaTumpuk(e).ganda <= 12 && periksaTumpuk(d).ganda <= 6, "mosaik terapan: tanpa tumpang tindih");
    const o3 = akhirAdegan(a, 2);
    cek(polaId(o3, /^pl-\d+-[ab]$/).length === 18, "mosaik terapan: pola lantai sembilan ubin dari delapan belas segitiga");
    const rr = akhirAdegan(adegan(U, "luar-mosaik"), 2);
    const rh = ["r0", "r1", "r2"].map((id) => bangunDari(rr, id));
    const hs = polaId(rr, /^h-\d$/).map((q) => titikJalur(q));
    cek(rh.length === 3 && hs.length === 6 && rh.every((p) => p.length === 4 && samaPanjang(sisiPoli(p), 0.2)), "mosaik konsep: satu segienam dari enam segitiga dan dari tiga belah ketupat");
    dekat(rh.reduce((s, p) => s + luasPoli(p), 0), hs.reduce((s, p) => s + luasPoli(p), 0), 0.8, "mosaik konsep: dua susunan segienam sama besar");
  }
  // Tangram: tujuh keping sungguh, tanpa tumpang tindih, membentuk persegi, perahu, dan rumah.
  {
    const a = adegan(M_VIDEO, "tangram");
    const sk = akhirAdegan(a, 0);
    const kb = akhirAdegan(a, 1);
    const kumpul = (objs, p) => polaId(objs, new RegExp(`^${p}-\\d$`)).map((q) => titikJalur(q));
    const susunan = [
      ["tk", 12, "persegi", kumpul(sk, "tk")],
      ["tb", 11, "perahu", kumpul(kb, "tb")],
      ["th", 11, "rumah", kumpul(kb, "th")],
    ];
    const kotakBatas = [];
    for (const [id, s, nama, pcs] of susunan) {
      cek(pcs.length === 7, `tangram ${nama}: tepat tujuh keping (ada ${pcs.length})`);
      const rasio = pcs.map((p) => luasPoli(p) / (s * s)).sort((m, n) => m - n);
      cek(rasio.every((r, i) => Math.abs(r - [1, 1, 2, 2, 2, 4, 4][i]) < 0.08), `tangram ${nama}: luas tujuh keping 1, 1, 2, 2, 2, 4, 4 satuan (${rasio.map((r) => r.toFixed(2)).join(", ")})`);
      const t = periksaTumpuk(pcs, 0.5);
      cek(t.ganda * 0.25 < 0.01 * 16 * s * s, `tangram ${nama}: keping tidak bertumpuk (area ganda ${(t.ganda * 0.25).toFixed(1)})`);
      dekat(t.luas, 16 * s * s, 0.03 * 16 * s * s, `tangram ${nama}: tujuh keping menutup 16 satuan luas tanpa celah dalam gabungan`);
      // Setiap keping bersentuhan dengan keping lain pada sedikitnya dua titik sudut (tersambung rapat).
      const jarakKeRuas = (pt, a1, b1) => {
        const dx = b1[0] - a1[0];
        const dy = b1[1] - a1[1];
        const t = Math.max(0, Math.min(1, ((pt[0] - a1[0]) * dx + (pt[1] - a1[1]) * dy) / (dx * dx + dy * dy)));
        return Math.hypot(pt[0] - (a1[0] + t * dx), pt[1] - (a1[1] + t * dy));
      };
      const titikTepi = (p) => p.flatMap((a1, i) => Array.from({ length: 12 }, (_, m) => [a1[0] + ((p[(i + 1) % p.length][0] - a1[0]) * m) / 12, a1[1] + ((p[(i + 1) % p.length][1] - a1[1]) * m) / 12]));
      const sentuh = pcs.map((p, i) => pcs.some((q, j) => j !== i && titikTepi(p).filter((pt) => q.some((b1, k1) => jarakKeRuas(pt, b1, q[(k1 + 1) % q.length]) < 0.5)).length >= 6));
      cek(sentuh.every(Boolean), `tangram ${nama}: tiap keping menempel pada keping lain`);
      // Jenis keping: dua segitiga besar, satu sedang, dua kecil (segitiga siku-siku sama kaki), satu persegi, satu jajargenjang.
      const tiga = pcs.filter((p) => p.length === 3);
      const empat = pcs.filter((p) => p.length === 4);
      cek(tiga.length === 5 && empat.length === 2 && tiga.every((p) => sikuSiku(p) === 1), `tangram ${nama}: lima segitiga siku-siku dan dua segiempat`);
      cek(empat.filter((p) => sikuSiku(p) === 4 || Math.abs(sisiPoli(p)[0] - sisiPoli(p)[1]) < 0.3).length >= 1 && empat.some((p) => sikuSiku(p) === 0), `tangram ${nama}: satu persegi (diagonal) dan satu jajargenjang`);
      kotakBatas.push([nama, t.kotakBatas]);
    }
    const lebar = (n) => kotakBatas.find((q) => q[0] === n)[1];
    cek(Math.abs(lebar("persegi")[2] - lebar("persegi")[0] - 48) < 1 && Math.abs(lebar("persegi")[3] - lebar("persegi")[1] - 48) < 1, "tangram persegi: bangun 4 kali 4 satuan");
    const lp = lebar("perahu");
    const lr = lebar("rumah");
    cek(Math.abs(lp[2] - lp[0] - 66) < 1 && Math.abs(lp[3] - lp[1] - 66) < 1, "tangram perahu: lebar dan tinggi sesuai susunan (enam kali enam satuan)");
    cek(Math.abs(lr[2] - lr[0] - 62.2) < 1 && Math.abs(lr[3] - lr[1] - 62.2) < 1 && lr[3] <= 112.5, "tangram rumah: lebar dan tinggi sesuai susunan, berdiri di atas meja");
    cek(lp[3] <= 112.5, "tangram perahu: lambung berdiri di atas meja");
    cek(JSON.stringify(susunan[1][3]) !== JSON.stringify(susunan[2][3]), "tangram: perahu dan rumah susunan berbeda");
    cek(isiTeks(kb, "n7") === "7 keping" && isiTeks(kb, "lb") === "perahu" && isiTeks(kb, "lh") === "rumah" && ada(kb, "la", "ge"), "tangram: label tujuh keping, perahu oleh Laras, rumah oleh Genta");
    cek(isiTeks(sk, "n7") === "7 keping" && ada(sk, "bd"), "tangram: Bu Dewi mengeluarkan tangram tujuh keping");
  }
  // Mosaik penutup: enam kali tiga ubin, tiap ubin dua segitiga yang sama besar.
  {
    const a = adegan(M_VIDEO, "penutup");
    const o = akhirAdegan(a, 0);
    const ts = polaId(o, /^mz-\d-\d-[ab]$/);
    cek(ts.length === 36, `penutup: mosaik enam kali tiga ubin dari 36 segitiga (ada ${ts.length})`);
    const ok = [0, 1, 2].every((r) => [0, 1, 2, 3, 4, 5].every((c) => {
      const A = bangunDari(o, `mz-${r}-${c}-a`);
      const B = bangunDari(o, `mz-${r}-${c}-b`);
      return A && B && A.length === 3 && B.length === 3 && Math.abs(luasPoli(A) - luasPoli(B)) < 0.5 && Math.abs(luasPoli(A) + luasPoli(B) - 26 * 26) < 1;
    }));
    cek(ok, "penutup: tiap ubin persegi dari dua segitiga sama besar");
    const t = periksaTumpuk(ts.map((q) => titikJalur(q)), 0.8);
    cek(t.ganda < 120, `penutup: ubin tidak bertumpuk (${t.ganda})`);
    dekat(t.luas, 18 * 26 * 26, 0.02 * 18 * 26 * 26, "penutup: mosaik menutup rapi tanpa celah");
    cek(ada(o, "fm") && ada(o, "ok"), "penutup: bingkai dan tanda benar");
    sama(["o1", "o2", "o3", "o4", "o5", "o6"].map((id) => isiTeks(akhirAdegan(a), `${id}-n`)), ["Satria", "Laras", "Genta", "Pak Hendro", "Bu Dewi", "Pak Rudi"], "penutup: keempat tokoh dan kedua tamu tampil bernama");
    cek(isiTeks(akhirAdegan(a, 1), "n2") === "2 arah" && ada(akhirAdegan(a, 1), "ph", "pa", "pb"), "penutup: Pak Hendro, dua arah menyusun dan menguraikan");
  }
  // Isi adegan lain (kotak, menyusun, menyapu, pembuka, ringkasan).
  {
    const kt = adegan(M_VIDEO, "kotak");
    cek(ada(akhirAdegan(kt, 0), "pr", "pr-hl", "pr-pm", "pp", "pp-t", "kp", "s1-0", "s1-3") && isiTeks(akhirAdegan(kt, 0), "pp-t") === "TOKO KERAMIK BU DEWI", "kotak: Pak Rudi berhelm membawa palu karet, papan nama toko, kotak dan keping pecah");
    cek(ada(akhirAdegan(kt, 1), "fr", "pm", "ok") && isiTeks(akhirAdegan(kt, 1), "pm") === "PAMERAN", "kotak: mosaik untuk pameran");
    cek(ada(akhirAdegan(kt, 2), "sa", "la", "ge", "s2-0", "s2-3"), "kotak: ketiga anak mengumpulkan keping di meja kerja");
    const my = adegan(M_VIDEO, "menyapu");
    cek(ada(akhirAdegan(my, 0), "sa", "sp", "fl-0", "fl-2", "kp") && ada(akhirAdegan(my, 1), "ms", "tb", "fb-0") && ketemu(akhirAdegan(my, 1), "kp").rot > 0, "menyapu: Satria menyapu serpihan, kotak keping tersenggol dan keping berhamburan");
    cek(ada(akhirAdegan(my, 2), "ge", "ct", "kc-k", "mh-0", "mh-5") && polaId(akhirAdegan(my, 2), /^mh-\d$/).length === 6 && isiTeks(akhirAdegan(my, 2), "kc-t0") === "segitiga = sisi", "menyapu: Genta mencatat banyak segitiga sama dengan banyak sisi (segienam kecil dari enam segitiga)");
    const op = adegan(U, "luar-pembuka");
    cek(ada(akhirAdegan(op, 0), "pr", "mj", "s1-0", "s1-7", "fr"), "global pembuka: Pak Rudi menebarkan keping di meja kerja");
    cek(isiTeks(akhirAdegan(op, 1), "n3") === "3 cara" && ada(akhirAdegan(op, 1), "sa", "sb", "hx", "g-5", "ok"), "global pembuka: tiga cara, keping disusun, bangun dibelah, tanpa celah");
    sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Fit the Pieces", "2. Cut Into Triangles", "3. Many Ways Mosaic"], "global pembuka: tiga nama metode");
    sama(["g0", "g1", "g2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Pasang Keping", "Bagi Jadi Segitiga", "Mosaik Banyak Cara"], "global pembuka: tiga nama bahasa Indonesia");
    const rk = adegan(U, "luar-ringkas");
    cek(ada(akhirAdegan(rk, 0), "r0-k", "r1-k", "r2-k", "tn", "pr") && isiTeks(akhirAdegan(rk, 0), "n3") === "3 cara", "ringkasan: tiga kartu cara dan pertanyaan");
    cek(ketemu(akhirAdegan(rk, 1), "r1-k").sorot === true && !ketemu(akhirAdegan(rk, 1), "r0-k").sorot && ada(akhirAdegan(rk, 1), "e1", "e2"), "ringkasan: Pasang Keping lalu Bagi Jadi Segitiga");
    cek(ketemu(akhirAdegan(rk, 2), "r2-k").sorot === true && !ketemu(akhirAdegan(rk, 2), "r1-k").sorot && isiTeks(akhirAdegan(rk, 2), "tc") === "tanpa celah", "ringkasan: Mosaik Banyak Cara, periksa tidak ada celah");
    cek(isiTeks(akhirAdegan(rk, 3), "qq") === "cara mana?" && ada(akhirAdegan(rk, 3), "dn", "r0-k", "r2-k"), "ringkasan: dinding luas, memilih cara");
    const pp = adegan(U, "luar-pasang");
    cek(ada(akhirAdegan(pp, 1), "ta", "tb", "sa", "sb") && ketemu(akhirAdegan(pp, 1), "tb").x === 0 && ketemu(akhirAdegan(pp, 1), "sb").x === 130, "Pasang Keping: dua keping bertemu pada sisi miringnya");
    const p4 = akhirAdegan(pp, 3);
    cek(ada(p4, "u0", "u1", "v0", "v1", "ue", "ve") && isiTeks(p4, "a0") === "sisi miring" && isiTeks(p4, "a1") === "sisi tegak", "Pasang Keping: sisi yang dipertemukan menentukan bangun (persegi atau segitiga besar)");
    for (const [p, tag] of [["u", "persegi"], ["v", "segitiga besar"]]) {
      const A = bangunDari(p4, `${p}0`);
      const B = bangunDari(p4, `${p}1`);
      segitigaSikuSamaKaki(A, `Pasang Keping ${tag}: keping A`);
      segitigaSikuSamaKaki(B, `Pasang Keping ${tag}: keping B`);
      dekat(luasPoli(A), luasPoli(B), 0.5, `Pasang Keping ${tag}: sama besar`);
    }
    const pt = adegan(U, "luar-pasang-terapan");
    const t2 = akhirAdegan(pt, 1);
    segitigaSikuSamaKaki(bangunDari(t2, "ta"), "Pasang Keping terapan: keping A");
    segitigaSikuSamaKaki(bangunDari(t2, "tb"), "Pasang Keping terapan: keping B");
    cek(ketemu(t2, "tb").x === 0 && isiTeks(t2, "n2") === "persegi" && isiTeks(t2, "lj") === "jajargenjang" && ada(t2, "j0", "j1", "je"), "Pasang Keping terapan: persegi lalu jajargenjang");
    cek(polaId(akhirAdegan(pt, 3), /^b2-\d+$/).length === 12 && ada(akhirAdegan(pt, 3), "xs", "jm"), "Pasang Keping terapan: terlalu banyak keping, memakan waktu");
  }
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k4b5b-.*\.ts$/.test(f));
  cek(berkas.length === 8, `berkas story k4b5b (${berkas.length})`);
  for (const f of ["bantu", "gambar", "luar-1", "luar-2", "materi-1", "materi-2", "materi-3", "video"]) cek(berkas.includes(`k4b5b-${f}.ts`), `k4b5b-${f}.ts ada`);
  cek(!berkas.includes("k4b5b-data.ts"), "k4b5b-data.ts lama (berbasis buku) sudah dihapus");
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de || c.codePointAt(0) === 0x1fa74), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}|\\u\{1FA74\}|\\u\{1F39F\}|\\u\{2602\}|\\u\{1FA9F\}|\\u\{1FAA3\}|\\u\{1FA91\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95 dan tidak memakai emoji yang tampil kosong`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku|kelompok|nilai|skor|tebak|latihan|teman|soal|kunci|senilai|ditemani/i.test(s), `${f}: tanpa kata terlarang di berkas`);
    cek(!/helen|tfl|\bember\b|kolam|\bikan\b/i.test(s), `${f}: tanpa sisa cerita lama atau bab lain`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k4b5b-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k4b5b (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k4b5b.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K4B5B/.test(pb) && /VIDEO_LUAR_K4B5B/.test(pb) && /export function VideoK4B5B/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿") && !/data-k4b5|k4b5b-data|naskah-k4b5|buku/.test(pb), "video-k4b5b.tsx memakai dua video Story dan jeda seragam");
  const bn = readFileSync(new URL("../naskah/story-naskah-k4b5b.md", import.meta.url), "utf8");
  cek(!bn.includes("\r") && !bn.startsWith("﻿"), "naskah story-naskah-k4b5b.md: LF tanpa BOM");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
