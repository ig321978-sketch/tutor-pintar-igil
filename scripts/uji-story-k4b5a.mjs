// Uji Story Kelas 4 Bab 5 Sub-Bab A "Etalase Keramik Bu Dewi" (ciri-ciri bangun datar), awal cerita Toko Keramik Bu Dewi: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k4b5a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k4b5a-video.ts");

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
const VIDEO = [V.VIDEO_MATERI_K4B5A, V.VIDEO_LUAR_K4B5A];
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
          if (t) cek(t.every((p) => p[0] > -2 && p[0] < 302 && p[1] > -2 && p[1] < 204), `${nama}#${i + 1}: bangun ${o.id} masuk kanvas`);
          else {
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

for (const v of VIDEO) for (const a of v.adegan) a.ketukan.forEach((_, i) => { for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(typeof o.isi === "string" && o.isi.length > 0, `${v.id}/${a.id}#${i + 1}: teks berisi (${o.id})`); });

/* ------------------------------ Khusus Sub-Bab A Kelas 4 Bab 5 ------------------------------ */
{
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k4b5a-luar-1.ts");
  const M_VIDEO = V.VIDEO_MATERI_K4B5A;
  const U = V.VIDEO_LUAR_K4B5A;
  const adegan = (v, id) => v.adegan.find((a) => a.id === id);
  const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  const ketemu = (objs, id) => objs.find((o) => o.id === id);
  const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
  const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
  const tidakAda = (objs, ...ids) => ids.every((id) => !ketemu(objs, id));

  // Pembaca bilangan yang diucapkan dengan kata: satuan, belasan, puluhan, ratusan, dan ribuan. "satu" sebagai kata bilangan dihitung.
  const SATUAN = { nol: 0, satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
  const bilanganSuara = (s0) => {
    const w = s0.toLowerCase().split(/[^a-z]+/).filter(Boolean);
    return w.filter((x) => Object.prototype.hasOwnProperty.call(SATUAN, x)).map((x) => SATUAN[x]);
  };
  sama(bilanganSuara("Tiga sisi, satu per satu, keempat dan kedua."), [3, 1, 1], "pembaca bilangan suara");

  /* Geometri dari titik gambar sungguhan. */
  const titikJ = (o) => {
    const n = bilangan(o.d ?? "");
    const out = [];
    for (let i = 0; i + 1 < n.length; i += 2) out.push([(o.x ?? 0) + n[i], (o.y ?? 0) + n[i + 1]]);
    return out;
  };
  const sisiL = (p) => p.map((q, i) => Math.hypot(p[(i + 1) % p.length][0] - q[0], p[(i + 1) % p.length][1] - q[1]));
  const dekat = (a, b, t = 0.45) => Math.abs(a - b) < t;
  const vek = (p, i) => [p[(i + 1) % p.length][0] - p[i][0], p[(i + 1) % p.length][1] - p[i][1]];
  const sudutD = (p, i) => {
    const a = vek(p, (i + p.length - 1) % p.length);
    const b = vek(p, i);
    return (Math.acos(Math.max(-1, Math.min(1, (-a[0] * b[0] - a[1] * b[1]) / (Math.hypot(...a) * Math.hypot(...b))))) * 180) / Math.PI;
  };
  const siku = (p) => p.map((_, i) => i).filter((i) => Math.abs(sudutD(p, i) - 90) < 1.2);
  const sejajar = (p) => {
    let n = 0;
    for (let i = 0; i < p.length; i += 1) for (let j = i + 1; j < p.length; j += 1) if (Math.abs(vek(p, i)[0] * vek(p, j)[1] - vek(p, i)[1] * vek(p, j)[0]) < 0.02 * Math.hypot(...vek(p, i)) * Math.hypot(...vek(p, j))) n += 1;
    return n;
  };
  const semuaSama = (p) => sisiL(p).every((s) => dekat(s, sisiL(p)[0]));
  const bentuk = (objs, id) => {
    const o = ketemu(objs, id);
    if (!o || o.t !== "jalur") return null;
    const p = titikJ(o);
    return { p, n: p.length, sisi: sisiL(p), siku: siku(p).length, sejajar: sejajar(p), sama: semuaSama(p), beraturan: semuaSama(p) && p.every((_, i) => dekat(sudutD(p, i), sudutD(p, 0), 1.2)) };
  };
  const cekBentuk = (objs, id, n, h, pesan) => {
    const b = bentuk(objs, id);
    cek(!!b, `${pesan}: bangun ${id} ada`);
    if (!b) return;
    cek(b.n === n, `${pesan}: ${id} bersisi ${n} (ada ${b.n})`);
    for (const [k2, v] of Object.entries(h)) cek(b[k2] === v, `${pesan}: ${id}.${k2} = ${v} (ada ${b[k2]})`);
  };
  const banyakTanda = (objs, id, jenis) => objs.filter((o) => new RegExp(`^${id}-${jenis}\\d`).test(o.id)).length;

  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Sort the Tiles|Sides and Corners|Shape Family Tree|Pilah Keramik|Sisi dan Sudut|Pohon Keluarga Bentuk/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Sort the Tiles", "Sides and Corners", "Shape Family Tree"], ["Pilah Keramik", "Sisi dan Sudut", "Pohon Keluarga Bentuk"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Etalase Keramik Bu Dewi" && U.judul === M_VIDEO.judul && V.JUDUL_K4B5A === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k4b5a-materi" && U.id === "k4b5a-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,toko,segi-banyak,beraturan,segitiga,salah-jajargenjang,periksa-sudut,keluarga,katalog,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-pilah,luar-pilah-terapan,luar-sisi,luar-sisi-terapan,luar-pohon,luar-pohon-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  cek([...M_VIDEO.adegan, ...U.adegan].every((a) => a.judul.length <= 34), "judul adegan tidak terlalu panjang");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan|senilai|ditemani)/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)) && !TERLARANG.test(a.id), `${v.id}/${a.id}: tanpa kata terlarang`);
  // Sub-Bab A tidak memakai istilah menyusun dan menguraikan (untuk Sub-Bab B), dan tidak membahas keliling, luas, atau simetri.
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!/komposisi|dekomposisi|tangram|susun|urai|keliling|\bluas\b|simetri/i.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa istilah Sub-Bab B dan topik yang tidak dibahas`);
  const SURUH = /bawalah|bawa benda (di|dari) rumah|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
  // Bilangan yang diucapkan tampak sebagai angka di gambar pada ketukan itu. Sapaan bersama dikecualikan.
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan)
      if (a.id !== "sapaan")
        a.ketukan.forEach((kt, i) => {
          const terlihat = new Set();
          for (let p = -1; p < L.kataDari(kt.suara).length; p += 1) for (const t of L.teksTerlihat(L.keadaanStory(a, i, p))) for (const b of bilanganDari(t)) terlihat.add(Number(b));
          for (const n of bilanganSuara(kt.suara)) cek(terlihat.has(n), `${v.id}/${a.id}#${i + 1}: bilangan ${n} yang diucapkan tampak sebagai angka`);
        });
  const semuaSuara = M_VIDEO.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [2, 3, 4, 5]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  for (const kata of ["Pak Hendro", "Satria", "Laras", "Genta", "Bu Dewi", "Pak Rudi", "Toko Keramik Bu Dewi", "etalase", "katalog", "segi banyak", "beraturan", "segitiga sama sisi", "segitiga sama kaki", "segitiga sembarang", "segitiga siku-siku", "jajargenjang", "persegi panjang", "belah ketupat", "layang-layang", "trapesium", "penyiku", "mosaik", "keping"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  cek(/Kalau aku salah, aku mengelap seluruh etalase/.test(materi) && /sisi yang berhadapan sama panjang/.test(materi) && /penyiku itu tidak pas/.test(materi), "video materi: salah langkah jajargenjang dikira persegi panjang dengan taruhan mengelap etalase");
  for (const pola of [/Helen/, /Azizah/, /Pak Toni/, /Pak Wicak/, /minimarket/i, /Bu Ratri/, /Pak Gunawan/, /angklung/i, /Raka/, /Salsa/, /Bima/, /Pak Joko/, /Pak Hasan/, /Bu Ratih/, /Kak Anton/, /Pak Samsul/, /layang-layang berterbangan/i, /bengkel/i, /sepeda/i, /Chacha/, /Dika/, /\bNia\b/, /Bu Sari/, /pentas/i, /bank sampah/i, /kebun binatang/i, /perkemahan/i, /tenda/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /perpustakaan/i, /kantin/i, /koperasi/i, /Meutia/, /Alfa/, /Galih/, /Tiara/, /Slamet/, /pizza/i, /Bu Maya/, /Pak Laode/, /penginapan/i, /perahu/i, /pantai/i, /tiket/i, /kelapa/i, /Bu Wulan/, /Pak Joyo/, /batik/i, /canting/i, /sanggar/i, /Bu Sinta/, /Pak Anto/, /kolam/i, /ubin/i, /ember/i, /gelas ukur/i, /bikanb/i, /pulau/i, /panggung/i])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3.2, `durasi video global lebih dari tiga menit dengan margin (${(kataVideo(U) / 120).toFixed(2)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/bangun datar/.test(sapa.ketukan[0].suara) && ["Segi banyak", "Segitiga", "Segiempat"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/bangun datar/.test(adegan(U, "sapaan").ketukan[0].suara) && /Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global dan bertopik bangun datar");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k4b5a.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  // Visual berubah mengikuti kata pada hampir semua ketukan.
  let banyakTitik = 0;
  let total = 0;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) { total += 1; if (new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at))).size >= 2) banyakTitik += 1; }
  cek(banyakTitik / total >= 0.9, `visual berubah mengikuti kata pada sedikitnya 90 persen ketukan (${banyakTitik}/${total})`);
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") cek(akhirAdegan(a).some((o) => o.t !== "teks"), `${v.id}/${a.id}: gambar akhir memuat bentuk gambar sendiri, bukan hanya teks`);
  // Tidak ada gambar tokoh yang menutup angka atau nama; label nama tokoh diturunkan (tidak menempel dagu).
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan)
      a.ketukan.forEach((_, i) => {
        const objs = L.keadaanStory(a, i, 9999);
        for (const w of objs.filter((o) => o.t === "teks" && /^[\u{1F466}\u{1F467}\u{1F9D2}\u{1F468}\u{1F469}]$/u.test(o.isi ?? "") && (o.u ?? 10) >= 28)) {
          const kiri = (w.x ?? 0) - 15;
          const kanan = (w.x ?? 0) + 15;
          const atas = (w.y ?? 0) - 24;
          const bawah = (w.y ?? 0) + 4;
          const label = ketemu(objs, `${w.id}-n`);
          if (label) cek((label.y ?? 0) >= (w.y ?? 0) + 4 + 14, `${v.id}/${a.id}#${i + 1}: label ${label.isi} diturunkan dari wajah ${w.id}`);
          for (const o of objs.filter((q) => q.t === "teks" && !/^[\u{1F000}-\u{1FFFF}]|^[✂✅❌]$/u.test(q.isi ?? "") && !/-n$/.test(q.id) && q.id !== w.id)) {
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

  /* Isi tiap adegan materi (geometri dihitung ulang dari titik gambar). */
  const tk = adegan(M_VIDEO, "toko");
  {
    const o = akhirAdegan(tk, 0);
    cek(ada(o, "tn", "jud", "ph", "ph-bj", "ph-tp", "ph-pl", "ph-ts", "sa", "sa-bj", "lr", "lr-ka", "lr-k1", "lr-kc", "ge", "ge-pc", "pn"), "toko: Pak Hendro bertopi pantai, Satria, Laras, Genta, dan papan nama");
    cek(isiTeks(o, "pn-s1") === "TOKO KERAMIK" && isiTeks(o, "pn-s2") === "BU DEWI", "toko: papan nama TOKO KERAMIK BU DEWI");
    const p = akhirAdegan(tk, 1);
    cek(ada(p, "et", "et-r1", "et-r2") && isiTeks(p, "el") === "etalase" && ["a1", "a2", "a3", "b1", "b2", "b3"].every((id) => ketemu(p, id)?.t === "jalur"), "toko: etalase kayu berisi enam keramik dua rak");
    cek(["persegi", "segitiga", "jajargenjang", "belah ketupat", "layang-layang", "trapesium"].length === 6 && cekBentuk(p, "a1", 4, { siku: 4, sama: true }, "toko") === undefined && cekBentuk(p, "a2", 3, {}, "toko") === undefined && cekBentuk(p, "a3", 4, { siku: 0, sejajar: 2 }, "toko") === undefined && cekBentuk(p, "b1", 4, { siku: 0, sama: true }, "toko") === undefined && cekBentuk(p, "b3", 4, { sejajar: 1 }, "toko") === undefined, "toko: bentuk keramik di rak sesuai nama");
    const q = akhirAdegan(tk);
    cek(ada(q, "bd", "bd-kr", "bd-kt", "kat", "kt", "ks", "mq") && isiTeks(q, "kt") === "katalog" && isiTeks(q, "ks") === "kosong", "toko: Bu Dewi berkerudung membawa katalog kosong dan bertanya");
  }
  const sb = adegan(M_VIDEO, "segi-banyak");
  {
    const o = akhirAdegan(sb, 0);
    cekBentuk(o, "kr", 5, { beraturan: false }, "segi banyak");
    cek(ada(o, "lr") && isiTeks(o, "tt") === "tertutup rapat" && ketemu(o, "kr").sorot === true, "segi banyak: Laras mengangkat keramik bertepi ruas garis lurus dan tertutup rapat");
    const p = akhirAdegan(sb, 1);
    cek(isiTeks(p, "sb") === "segi banyak" && isiTeks(p, "t3") === "3 ruas garis" && tidakAda(p, "tt"), "segi banyak: paling sedikit tiga ruas garis");
    cekBentuk(p, "sg", 3, {}, "segi banyak paling sedikit");
    const q = akhirAdegan(sb);
    cekBentuk(q, "s3", 3, {}, "segi banyak tiga sisi");
    cekBentuk(q, "s4", 4, { siku: 4, sama: true }, "segi banyak empat sisi");
    cekBentuk(q, "s5", 5, { beraturan: true }, "segi banyak lima sisi");
    sama(["b3", "b4", "b5"].map((id) => isiTeks(q, id)), ["3 sisi", "4 sisi", "5 sisi"], "segi banyak: label banyak sisi cocok dengan bangun");
    sama(["n3", "n4", "n5"].map((id) => isiTeks(q, id)), ["segitiga", "segiempat", "segilima"], "segi banyak: nama menurut banyak sisi");
  }
  const br = adegan(M_VIDEO, "beraturan");
  {
    const o = akhirAdegan(br, 0);
    cekBentuk(o, "hx", 6, { beraturan: true, sama: true, siku: 0, sejajar: 3 }, "beraturan segienam");
    cek(banyakTanda(o, "hx", "t") === 6 && banyakTanda(o, "hx", "d") === 6 && isiTeks(o, "sm") === "semua sama" && ada(o, "ge"), "beraturan: enam sisi sama panjang bertanda dan enam sudut sama besar bertitik");
    const p = akhirAdegan(br, 1);
    cek(isiTeks(p, "n2") === "beraturan" && ada(p, "ok") && tidakAda(p, "sm"), "beraturan: disebut segi banyak beraturan");
    const q = akhirAdegan(br);
    cekBentuk(q, "ir", 5, { beraturan: false, sama: false }, "tidak beraturan");
    cek(new Set(bentuk(q, "ir").sisi.map((s) => Math.round(s))).size >= 3 && isiTeks(q, "n3") === "tidak beraturan" && isiTeks(q, "lp") === "panjang" && isiTeks(q, "lq") === "pendek" && ada(q, "xs"), "tidak beraturan: sisi ada panjang dan ada pendek");
  }
  const sg = adegan(M_VIDEO, "segitiga");
  {
    const o = akhirAdegan(sg, 0);
    cekBentuk(o, "sa", 3, { sama: true, beraturan: true }, "segitiga sama sisi");
    cek(banyakTanda(o, "sa", "t") === 3 && isiTeks(o, "t3") === "3 sisi sama" && isiTeks(o, "nm") === "sama sisi", "segitiga: tiga sisi sama panjang bertanda, sama sisi");
    const p = akhirAdegan(sg, 1);
    const kaki = bentuk(p, "sk");
    cek(kaki && kaki.n === 3 && kaki.sisi.filter((s, i, a) => a.some((t, j) => j !== i && dekat(s, t))).length === 2, "segitiga: sama kaki punya tepat dua sisi sama panjang");
    cek(banyakTanda(p, "sk", "t") === 2 && isiTeks(p, "t2") === "2 sisi sama" && isiTeks(p, "n2") === "sama kaki", "segitiga: dua sisi sama panjang bertanda, sama kaki");
    const sem = bentuk(p, "sb");
    cek(sem && sem.n === 3 && !sem.sisi.some((s, i, a) => a.some((t, j) => j !== i && dekat(s, t, 1))) && isiTeks(p, "n4") === "sembarang" && isiTeks(p, "t4") === "berbeda semua", "segitiga: sembarang punya tiga sisi berbeda");
    const q = akhirAdegan(sg);
    cekBentuk(q, "sr", 3, { siku: 1 }, "segitiga siku-siku");
    const sr = bentuk(q, "sr");
    const tanda = ketemu(q, "sr-q1");
    cek(tanda && Math.abs(sudutD(sr.p, 1) - 90) < 1.2 && titikJ(tanda).length === 3 && Math.hypot(titikJ(tanda)[1][0] - sr.p[1][0], titikJ(tanda)[1][1] - sr.p[1][1]) < 14, "segitiga: tanda siku-siku tepat di sudut siku-siku");
    cek(isiTeks(q, "nm") === "segitiga siku-siku" && isiTeks(q, "ss") === "siku-siku", "segitiga: segitiga siku-siku bertanda");
  }
  const sj = adegan(M_VIDEO, "salah-jajargenjang");
  {
    const o = akhirAdegan(sj, 0);
    cekBentuk(o, "jg", 4, { siku: 0, sejajar: 2, sama: false }, "jajargenjang");
    cekBentuk(o, "pp", 4, { siku: 4, sejajar: 2, sama: false }, "persegi panjang");
    const a = bentuk(o, "jg").sisi;
    const b = bentuk(o, "pp").sisi;
    cek(dekat(a[0], a[2]) && dekat(a[1], a[3]) && dekat(b[0], b[2]) && dekat(b[1], b[3]), "salah jajargenjang: sisi berhadapan sama panjang pada kedua keramik");
    cek(isiTeks(o, "n1") === "jajargenjang" && isiTeks(o, "n2") === "persegi panjang" && ada(o, "ge"), "salah jajargenjang: Genta menaruh keduanya berdampingan");
    const p = akhirAdegan(sj, 1);
    cek(ada(p, "sa", "sa-bj", "cm") && isiTeks(p, "ss") === "sama saja?" && banyakTanda(p, "jg", "t") === 6 && banyakTanda(p, "pp", "t") === 6 && isiTeks(p, "sj") === "sisi berhadapan sama panjang", "salah jajargenjang: Satria mengira sama karena sisi berhadapan sama panjang");
    const q = akhirAdegan(sj);
    cek(isiTeks(q, "ks") === "kalau salah:" && isiTeks(q, "sj2") === "mengelap" && ada(q, "sk", "ku") && tidakAda(q, "ss", "cm"), "salah jajargenjang: taruhan mengelap seluruh etalase");
  }
  const ps = adegan(M_VIDEO, "periksa-sudut");
  {
    const o = akhirAdegan(ps, 0);
    cekBentuk(o, "pr", 4, { siku: 4 }, "periksa persegi panjang");
    const pr = bentuk(o, "pr").p;
    const py = ketemu(o, "py");
    cek(py && dekat(py.x, pr[3][0], 0.2) && dekat(py.y, pr[3][1], 0.2), "periksa sudut: penyiku menempel tepat di sudut persegi panjang");
    cek(ada(o, "pr-q3", "ok") && Math.abs(sudutD(pr, 3) - 90) < 1.2, "periksa sudut: penyiku pas di sudut siku-siku");
    const p = akhirAdegan(ps, 1);
    cekBentuk(p, "pj", 4, { siku: 0, sejajar: 2 }, "periksa jajargenjang");
    const pj = bentuk(p, "pj").p;
    const py2 = ketemu(p, "py");
    cek(py2 && dekat(py2.x, pj[3][0], 0.2) && dekat(py2.y, pj[3][1], 0.2) && Math.abs(sudutD(pj, 3) - 90) > 10, "periksa sudut: penyiku di sudut jajargenjang tidak pas karena sudutnya miring");
    cek(ada(p, "xs") && isiTeks(p, "mr") === "miring", "periksa sudut: tanda tidak pas");
    const q = akhirAdegan(ps);
    cek(ada(q, "sa", "sp", "t1", "t2", "t3", "et") && isiTeks(q, "lp") === "kain lap", "periksa sudut: Satria mengelap etalase, kain lap, semua tertawa");
  }
  const kl = adegan(M_VIDEO, "keluarga");
  {
    const o = akhirAdegan(kl);
    cekBentuk(o, "pg", 4, { sama: true, siku: 4, sejajar: 2 }, "keluarga persegi");
    cekBentuk(o, "pp", 4, { sama: false, siku: 4, sejajar: 2 }, "keluarga persegi panjang");
    cekBentuk(o, "bk", 4, { sama: true, siku: 0, sejajar: 2 }, "keluarga belah ketupat");
    cekBentuk(o, "jg", 4, { sama: false, siku: 0, sejajar: 2 }, "keluarga jajargenjang");
    cekBentuk(o, "ll", 4, { siku: 0, sejajar: 0, sama: false }, "keluarga layang-layang");
    cekBentuk(o, "tr", 4, { siku: 0, sejajar: 1, sama: false }, "keluarga trapesium");
    const ll = bentuk(o, "ll").sisi;
    cek(dekat(ll[0], ll[3]) && dekat(ll[1], ll[2]) && !dekat(ll[0], ll[1], 1), "keluarga: layang-layang punya dua pasang sisi bersebelahan sama panjang");
    sama(["pg", "pp", "bk", "jg", "ll", "tr"].map((id) => isiTeks(o, `${id}-n`)), ["persegi", "persegi panjang", "belah ketupat", "jajargenjang", "layang-layang", "trapesium"], "keluarga: nama enam segiempat");
    sama(["pg-c1", "pg-c2", "pp-c1", "bk-c1", "jg-c1", "ll-c1", "tr-c1"].map((id) => isiTeks(o, id)), ["4 sisi sama", "4 siku-siku", "2 pasang sama", "4 sisi sama", "2 pasang sejajar", "2 pasang sebelah", "1 pasang sejajar"], "keluarga: ciri tiap segiempat");
    cek(tidakAda(akhirAdegan(kl, 0), "pp", "bk") && ada(akhirAdegan(kl, 0), "pg") && tidakAda(akhirAdegan(kl, 1), "ll", "tr") && ada(akhirAdegan(kl, 1), "pp", "bk", "jg"), "keluarga: keluarga bertambah dari ketukan ke ketukan");
  }
  const kt = adegan(M_VIDEO, "katalog");
  {
    const o = akhirAdegan(kt, 0);
    cek(ada(o, "bd", "bd-kr", "bd-kt", "kat", "cat") && [0, 1, 2, 3].every((i) => ketemu(o, `ln${i}`) && ketemu(o, `lc${i}`)), "katalog: Bu Dewi menulis nama dan ciri empat bangun");
    sama([0, 1, 2, 3].map((i) => isiTeks(o, `ln${i}`)), ["persegi", "jajargenjang", "trapesium", "layang-layang"], "katalog: nama bangun");
    sama([0, 1, 2, 3].map((i) => isiTeks(o, `lc${i}`)), ["4 sisi, 4 siku", "2 pasang sejajar", "1 pasang sejajar", "2 pasang sebelah"], "katalog: ciri bangun");
    const p = akhirAdegan(kt, 1);
    cek(ada(p, "ph", "ph-tp", "kn", "xs", "my") && isiTeks(p, "kn") === "kenali dari ciri" && tidakAda(p, "cat"), "katalog: Pak Hendro berpesan kenali dari ciri, bukan sekilas");
    const q = akhirAdegan(kt);
    cek(ada(q, "ok", "sa", "lr", "ge", "jp") && isiTeks(q, "cj") === "ciri jelas" && tidakAda(q, "kn"), "katalog: ciri jelas, dibaca siapa pun tanpa salah paham");
  }
  const pt = adegan(M_VIDEO, "penutup");
  {
    const o = akhirAdegan(pt, 0);
    cek(ada(o, "pr", "pr-bj", "pr-hl", "pr-pm", "kk", "kp1", "kp2", "kp3", "kp4") && isiTeks(o, "pr-n") === "Pak Rudi" && isiTeks(o, "pc") === "keping pecah", "penutup: Pak Rudi berhelm kuning membawa kotak keping pecah");
    const p = akhirAdegan(pt, 1);
    const sel = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => ketemu(p, `mz-c${i}`));
    cek(sel.every((c) => c && c.w === 22 && c.h === 22) && sel.every((c, i) => c.x === sel[0].x + (i % 3) * 22 && c.y === sel[0].y + Math.floor(i / 3) * 22) && new Set(sel.map((c) => c.warna)).size === 9, "penutup: mosaik tiga kali tiga keping sama besar, rapat, berwarna beda");
    cek(isiTeks(p, "mo") === "mosaik" && isiTeks(p, "pm") === "pameran" && tidakAda(p, "kk", "pc", "kp1") && ada(p, "pr"), "penutup: keping dirangkai menjadi mosaik untuk pameran");
    const q = akhirAdegan(pt);
    cek(ada(q, "pr", "sa", "lr", "ge", "ph", "bd", "lb", "tq", "k0", "k2", "ar") && isiTeks(q, "tq") === "?" && isiTeks(q, "k1") === "keping kecil" && isiTeks(q, "k3") === "bentuk besar", "penutup: enam tokoh melambai dan pertanyaan dari keping kecil menjadi bentuk besar");
    cekBentuk(q, "k2", 6, { beraturan: true }, "penutup bentuk besar");
  }

  /* Isi tiap adegan metode global. */
  const op = adegan(U, "luar-pembuka");
  {
    const o = akhirAdegan(op, 0);
    cek(ada(o, "tn", "bd", "bd-kr", "bd-kt", "gl", "mt") && isiTeks(o, "dn") === "katalog" && isiTeks(o, "ks") === "masih kosong", "global pembuka: Bu Dewi membuka katalog yang masih kosong");
    cek(isiTeks(akhirAdegan(op, 1), "n3") === "3 cara" && ada(akhirAdegan(op, 1), "c0-k", "c2-k", "xs", "ok") && tidakAda(akhirAdegan(op, 1), "gl"), "global pembuka: tiga cara supaya keramik mudah dikenali");
    sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Sort the Tiles", "2. Sides and Corners", "3. Shape Family Tree"], "global pembuka: tiga nama metode");
    sama(["g0", "g1", "g2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Pilah Keramik", "Sisi dan Sudut", "Pohon Keluarga Bentuk"], "global pembuka: tiga nama bahasa Indonesia");
  }
  const lp = adegan(U, "luar-pilah");
  {
    cek(isiTeks(akhirAdegan(lp, 0), "nm") === "Sort the Tiles" && isiTeks(akhirAdegan(lp, 0), "ni") === "Pilah Keramik" && ada(akhirAdegan(lp, 0), "pt", "rk"), "pilah konsep: judul dan rak keramik");
    const p = akhirAdegan(lp, 1);
    cekBentuk(p, "ta", 3, {}, "pilah golongan A");
    cekBentuk(p, "tb", 3, {}, "pilah golongan A");
    cekBentuk(p, "pa", 4, { siku: 4 }, "pilah golongan B");
    cekBentuk(p, "pb", 4, { siku: 0 }, "pilah golongan B");
    cek(isiTeks(p, "sa1") === "1 ciri" && isiTeks(p, "sa2") === "banyak sisi" && isiTeks(p, "gl") === "golongan A" && isiTeks(p, "gm") === "golongan B", "pilah konsep: menggolongkan menurut satu ciri yaitu banyak sisi");
    cek(isiTeks(akhirAdegan(lp, 2), "tp") === "1 keramik, 1 golongan" && ada(akhirAdegan(lp, 2), "ok"), "pilah konsep: tiap keramik masuk tepat satu golongan");
    cek(isiTeks(akhirAdegan(lp), "cj") === "ciri jelas" && isiTeks(akhirAdegan(lp), "hs") === "hasil sama" && ada(akhirAdegan(lp), "o1", "o2", "o3", "ok2"), "pilah konsep: ciri jelas, siapa pun mendapat hasil sama");
  }
  const lpt = adegan(U, "luar-pilah-terapan");
  {
    const o = akhirAdegan(lpt, 0);
    cekBentuk(o, "g3", 3, {}, "pilah terapan tiga sisi");
    cekBentuk(o, "g4", 4, { siku: 4 }, "pilah terapan empat sisi");
    cekBentuk(o, "g5", 5, { beraturan: true }, "pilah terapan lima sisi");
    sama(["l3", "l4", "l5"].map((id) => isiTeks(o, id)), ["3 sisi", "4 sisi", "5 sisi"], "pilah terapan: tiga golongan menurut banyak sisi");
    cek(ada(o, "lr") && isiTeks(akhirAdegan(lpt, 1), "dr") === "3 deretan" && ada(akhirAdegan(lpt, 1), "rk0", "rk1", "rk2", "ok") && tidakAda(akhirAdegan(lpt, 1), "br"), "pilah terapan: etalase berantakan menjadi tiga deretan rapi");
    cek(ada(akhirAdegan(lpt, 2), "ok2") && isiTeks(akhirAdegan(lpt, 2), "bc") === "banyak bangun bercampur", "pilah terapan: cocok untuk banyak bangun bercampur");
    cek(ada(akhirAdegan(lpt), "xs") && isiTeks(akhirAdegan(lpt), "sb") === "sisi sama banyak" && isiTeks(akhirAdegan(lpt), "bt") === "butuh ciri tambahan" && tidakAda(akhirAdegan(lpt), "ok2"), "pilah terapan: kurang cocok bila sisi sama banyak");
  }
  const ls = adegan(U, "luar-sisi");
  {
    cek(isiTeks(akhirAdegan(ls, 0), "nm") === "Sides and Corners" && isiTeks(akhirAdegan(ls, 0), "ni") === "Sisi dan Sudut", "sisi konsep: judul");
    const p = akhirAdegan(ls, 1);
    cekBentuk(p, "sq", 4, { sama: true, siku: 4, sejajar: 2 }, "sisi konsep persegi");
    cek(banyakTanda(p, "sq", "t") === 4 && [0, 1, 2, 3].every((i) => ada(p, `sq-j${i}a`, `sq-j${i}b`)) && [0, 1, 2, 3].every((i) => ada(p, `sq-q${i}`)), "sisi konsep: tanda sisi sama panjang, panah sisi sejajar, dan kotak sudut siku-siku pada persegi");
    sama(["l1", "l2", "l3"].map((id) => isiTeks(p, id)), ["sisi sama panjang", "sisi sejajar", "sudut siku-siku"], "sisi konsep: tiga hal yang diperiksa");
    const q = akhirAdegan(ls, 2);
    cek(ada(q, "py", "rl") && isiTeks(q, "tp") === "penyiku: sudut" && isiTeks(q, "pg") === "penggaris: sisi" && [0, 1, 2, 3, 4, 5, 6].every((i) => ada(q, `rl-${i}`)), "sisi konsep: penyiku untuk sudut dan penggaris untuk sisi");
    const r = akhirAdegan(ls);
    cek(isiTeks(r, "sp") === "1 per 1" && isiTeks(r, "nb") === "nama bangun: persegi" && tidakAda(r, "py", "rl"), "sisi konsep: memeriksa ciri satu per satu memastikan nama bangun");
  }
  const lst = adegan(U, "luar-sisi-terapan");
  {
    const o = akhirAdegan(lst, 0);
    cekBentuk(o, "bk", 4, { sama: true, siku: 0, sejajar: 2 }, "sisi terapan belah ketupat");
    cek(ada(o, "ge", "py", "rl"), "sisi terapan: Genta memeriksa keramik dengan penyiku dan penggaris");
    const p = akhirAdegan(lst, 1);
    cek(banyakTanda(p, "bk", "t") === 4 && isiTeks(p, "ts") === "tidak siku-siku" && ada(p, "xs") && isiTeks(p, "nm") === "belah ketupat" && tidakAda(p, "py", "rl"), "sisi terapan: empat sisi sama panjang, tidak siku-siku, belah ketupat");
    const q = akhirAdegan(lst, 2);
    cekBentuk(q, "pg", 4, { sama: true, siku: 4 }, "sisi terapan persegi pembanding");
    cek(isiTeks(q, "mp") === "tampak mirip" && isiTeks(q, "ca") === "ciri diperiksa" && ada(q, "ok"), "sisi terapan: cocok membedakan bangun yang tampak mirip");
    const r = akhirAdegan(lst);
    const rot = ketemu(r, "pr");
    cekBentuk(r, "pr", 4, { sama: true, siku: 4 }, "sisi terapan persegi diputar");
    cek(rot && rot.rot === 45 && ada(r, "xs", "my") && isiTeks(r, "ps") === "posisi berbeda" && tidakAda(r, "ok", "pg"), "sisi terapan: persegi yang diputar tampak seperti belah ketupat, mata mudah tertipu posisi");
  }
  const lh = adegan(U, "luar-pohon");
  {
    cek(isiTeks(akhirAdegan(lh, 0), "nm") === "Shape Family Tree" && isiTeks(akhirAdegan(lh, 0), "ni") === "Pohon Keluarga Bentuk" && ada(akhirAdegan(lh, 0), "ph"), "pohon konsep: judul");
    const p = akhirAdegan(lh, 1);
    sama(["n1-t", "n2-t", "n3-t"].map((id) => isiTeks(p, id)), ["segiempat", "jajargenjang", "persegi panjang"], "pohon konsep: bagan dari umum ke khusus");
    cek(ketemu(p, "n1").y < ketemu(p, "n2").y && ketemu(p, "n2").y < ketemu(p, "n3").y && isiTeks(p, "um") === "umum" && isiTeks(p, "kh") === "khusus" && ada(p, "a1", "a2"), "pohon konsep: bangun umum di atas dan bangun khusus di bawah");
    cek(isiTeks(akhirAdegan(lh, 2), "sb") === "1 ciri baru" && isiTeks(akhirAdegan(lh, 2), "sc") === "semua ciri induk", "pohon konsep: semua ciri induk ditambah satu ciri baru");
    cek(isiTeks(akhirAdegan(lh), "sp") === "1 pandangan" && ada(akhirAdegan(lh), "my") && tidakAda(akhirAdegan(lh), "sb"), "pohon konsep: hubungan antar bangun terlihat dalam satu pandangan");
  }
  const lht = adegan(U, "luar-pohon-terapan");
  {
    const o = akhirAdegan(lht, 0);
    sama(["n1-t", "n2-t", "n3-t"].map((id) => isiTeks(o, id)), ["segiempat", "persegi panjang", "persegi"], "pohon terapan: Satria menelusuri segiempat, persegi panjang, persegi");
    cek(ada(o, "sa", "a1", "a2"), "pohon terapan: Satria dan panah turun");
    const p = akhirAdegan(lht, 1);
    cekBentuk(p, "pg", 4, { sama: true, siku: 4 }, "pohon terapan persegi");
    cek(banyakTanda(p, "pg", "t") === 4 && isiTeks(p, "pl") === "+ 4 sisi sama" && ketemu(p, "n3").sorot === true, "pohon terapan: persegi punya ciri persegi panjang ditambah empat sisi sama panjang");
    cek(ada(akhirAdegan(lht, 2), "ok") && isiTeks(akhirAdegan(lht, 2), "sc") === "1 ciri dipakai" && !ketemu(akhirAdegan(lht, 2), "n3").sorot, "pohon terapan: cocok karena satu ciri dipakai berulang");
    cek(ada(akhirAdegan(lht), "xs", "p1", "p2") && tidakAda(akhirAdegan(lht), "a2", "ok") && isiTeks(akhirAdegan(lht), "pt2") === "bagan putus", "pohon terapan: kurang cocok bila lupa ciri, bagan putus");
  }
  const rg = adegan(U, "luar-ringkas");
  {
    sama([0, 1, 2].map((i) => isiTeks(akhirAdegan(rg, 0), `r${i}-t`)), ["Pilah Keramik", "Sisi dan Sudut", "Pohon Keluarga Bentuk"], "ringkasan: tiga kartu cara");
    cek(isiTeks(akhirAdegan(rg, 0), "n3") === "3 cara" && ada(akhirAdegan(rg, 0), "bd"), "ringkasan: tiga cara bersama Bu Dewi");
    cek(ketemu(akhirAdegan(rg, 1), "r1-k").sorot === true && !ketemu(akhirAdegan(rg, 1), "r0-k").sorot && ada(akhirAdegan(rg, 1), "ok1", "ok2"), "ringkasan: Pilah Keramik lalu Sisi dan Sudut");
    cek(ketemu(akhirAdegan(rg, 2), "r2-k").sorot === true && !ketemu(akhirAdegan(rg, 2), "r1-k").sorot && ada(akhirAdegan(rg, 2), "ok3") && isiTeks(akhirAdegan(rg, 2), "ps") === "sebut ciri dengan jelas", "ringkasan: Pohon Keluarga Bentuk dan sebut ciri dengan jelas");
    const r = akhirAdegan(rg);
    cekBentuk(r, "ll", 4, { siku: 0, sejajar: 0, sama: false }, "ringkasan layang-layang");
    cekBentuk(r, "bk", 4, { siku: 0, sejajar: 2, sama: true }, "ringkasan belah ketupat");
    cek(isiTeks(r, "tq") === "?" && isiTeks(r, "t1") === "layang-layang" && isiTeks(r, "t2") === "belah ketupat" && ada(r, "bd", "i1", "i2") && tidakAda(r, "n3", "r0-k"), "ringkasan: pertanyaan cara untuk membedakan layang-layang dan belah ketupat");
  }
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k4b5a-.*\.ts$/.test(f));
  cek(berkas.length === 8, `berkas story k4b5a (${berkas.length})`);
  for (const f of ["bantu", "gambar", "luar-1", "luar-2", "materi-1", "materi-2", "materi-3", "video"]) cek(berkas.includes(`k4b5a-${f}.ts`), `k4b5a-${f}.ts ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!/\\u\{1FA74\}|\\u\{1F39F\}|\\u2602|\\u\{1FA9F\}|\\u\{1FAA3\}|\\u\{1F355\}/i.test(s) && ![...s].some((c) => [0x1fa74, 0x1f39f, 0x2602, 0x1fa9f, 0x1faa3, 0x1f355].includes(c.codePointAt(0))), `${f}: tanpa emoji yang tampil kosong atau hitam`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s) && !/senilai/i.test(s) && !/\\u\{1F41F\}|\\u\{1F420\}|\\u\{1F421\}|\\u\{1F988\}|\\u\{1F42C\}|\\u\{1F38F\}/i.test(s) && ![...s].some((c) => [0x1f41f, 0x1f420, 0x1f421, 0x1f988, 0x1f42c, 0x1f38f].includes(c.codePointAt(0))), `${f}: tanpa kata buku, senilai, dan tanpa emoji ikan`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k4b5a-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k4b5a (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pbc = readFileSync(new URL("../src/components/modul/video-k4b5a.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K4B5A/.test(pbc) && /VIDEO_LUAR_K4B5A/.test(pbc) && /export function VideoK4B5A/.test(pbc) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pbc) && !/\r/.test(pbc) && !pbc.startsWith("﻿") && !/data-k4b5|video-k4b5-umum|naskah-k4b5|skenario-k4b5/.test(pbc), "video-k4b5a.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);

