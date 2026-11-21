// Uji Story Kelas 4 Bab 6 Sub-Bab B "Diagram Batang Pak Dodi" (diagram batang), akhir cerita Bazar Kuliner Sekolah: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k4b6b.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k4b6b-video.ts");

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
const VIDEO = [V.VIDEO_MATERI_K4B6B, V.VIDEO_LUAR_K4B6B];
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

/* ------------------------------ Khusus Sub-Bab B Kelas 4 Bab 6 ------------------------------ */
{
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k4b6b-luar-1.ts");
  const G = await import("../src/components/modul/story/k4b6b-gambar.ts");
  const M_VIDEO = V.VIDEO_MATERI_K4B6B;
  const U = V.VIDEO_LUAR_K4B6B;
  const adegan = (v, id) => v.adegan.find((a) => a.id === id);
  const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  const ketemu = (objs, id) => objs.find((o) => o.id === id);
  const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
  const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));

  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Follow the Line|Bar Duel|Flip the Chart|Telusuri Garis|Adu Batang|Putar Diagram/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Follow the Line", "Bar Duel", "Flip the Chart"], ["Telusuri Garis", "Adu Batang", "Putar Diagram"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Diagram Batang Pak Dodi" && U.judul === M_VIDEO.judul && V.JUDUL_K4B6B === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k4b6b-materi" && U.id === "k4b6b-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,kertas,sumbu,skala,baca-batang,salah-skala,periksa-skala,banding,mendatar,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-garis,luar-garis-terapan,luar-adu,luar-adu-terapan,luar-putar,luar-putar-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
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
  for (const n of [1, 2, 3, 4, 5, 6, 9, 10]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [1, 2, 3, 4, 5, 10]) cek(bilanganSuara(semuaLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Satria", "Laras", "Genta", "Pak Hendro", "Bu Rini", "Pak Dodi", "sumbu", "batang", "tegak", "mendatar", "tingkatan", "risoles", "pisang goreng", "lemper", "es cincau", "taplak", "selisih", "jumlah", "dibandingkan"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const kata of ["Pak Dodi", "es teh", "jus", "teh tarik", "sumbu", "tegak", "mendatar", "selisih", "garis"]) cek(luar.toLowerCase().includes(kata.toLowerCase()), `video global memuat "${kata}"`);
  for (const pola of [/Igil/, /Kaka/, /Abang/, /Mamah/, /Pak Pos/i, /rumah rapi/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /pustaka/i, /perpustakaan/i, /kantin/i, /koperasi/i, /seragam sekolah/i, /Chacha/, /Dika/, /\bNia\b/, /Bu Sari/, /pentas/i, /bank sampah/i, /\bRaka\b/, /\bSalsa\b/, /\bBima\b/, /Pak Joko/, /kebun binatang/i, /kandang/i, /perkemahan/i, /api unggun/i, /bengkel/i, /layang/i, /\bHelen\b/, /Azizah/, /Pak Toni/, /Pak Wicak/, /minimarket/i, /Pak Hasan/, /sepeda/i, /Kak Tari/, /Pak Wayan/, /Bu Lastri/, /Dokter Hana/, /Bu Ratih/, /Kak Anton/, /Pak Samsul/, /Tiara/, /Slamet/, /pizza/i, /Bu Maya/, /Pak Laode/, /Kak Tiara/, /Pak Darwis/, /Bu Rina/, /Pak Usman/, /Bu Marni/, /Bu Ratna/, /Kak Yoga/, /penginapan/i, /pantai/i, /kelapa/i, /batik/i, /Bu Wulan/, /Pak Joyo/, /Kak Sekar/, /Pak Bagas/, /Bu Tuti/, /sanggar/i, /Bu Ratri/, /Pak Gunawan/, /angklung/i, /konser/i, /panggung/i, /ubin/i, /kolam/i, /ember/i, /Pak Anto/, /Bu Sinta/, /\bikan\b/i, /\bpulau\b/i, /Pak Ujang/, /Bu Lia/, /Pak Hendra/, /Bu Dewi/, /Pak Rudi/, /keramik/i, /mosaik/i, /tangram/i, /burung/i, /Karel/])
    for (const isi of [materi, luar]) cek(!pola.test(isi.replace(/"lt-g\d"/g, "")), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3.2, `durasi video global lebih dari tiga menit dengan margin (${(kataVideo(U) / 120).toFixed(2)} menit, ${kataVideo(U)} kata)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/diagram batang/.test(sapa.ketukan[0].suara) && ["Sumbu", "Tinggi batang", "Membandingkan"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  const naskah = readFileSync(new URL("../naskah/story-naskah-k4b6b.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
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
  {
    const gm = readFileSync(new URL("../src/components/modul/story/k4b6b-gambar.ts", import.meta.url), "utf8");
    cek(/bulatkan\(y \+ 4 \+ \(nama === "Pak Hendro"/.test(gm), "label nama tokoh diturunkan (y + 4 + ...) seperti story k4b4");
  }

  /* ---- Diagram benar dari data: ujung batang tepat pada garis skala, angka sumbu naik sebesar tingkat ---- */
  const DATA = { Risoles: 30, "Pisang goreng": 20, Lemper: 15, "Es cincau": 25, "Es teh": 40, Jus: 25, "Teh tarik": 20, Pisang: 20, Cincau: 25 };
  const TOL = 0.06;
  let diagramDiperiksa = 0;
  const alias = { bx: "dg" };
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan)
      a.ketukan.forEach((_, i) => {
        const objs = akhirAdegan(a, i);
        const awalan = [...new Set(objs.filter((o) => /^[a-z0-9]+-b\d$/.test(o.id) && o.t === "kotak").map((o) => o.id.split("-")[0]))];
        for (const p of awalan) {
          const gp = alias[p] ?? p;
          const g1 = ketemu(objs, `${gp}-g1`);
          const sd = ketemu(objs, `${gp}-sd`);
          const sy = ketemu(objs, `${gp}-sy`);
          const a1 = ketemu(objs, `${gp}-a1`);
          if (!g1 || !sd || !a1) continue;
          const tegak = (g1.x2 ?? 0) > 0 && (g1.y2 ?? 0) === 0;
          const tingkat = Number(a1.isi);
          const gridN = objs.filter((o) => new RegExp(`^${gp}-g\\d+$`).test(o.id)).length;
          for (let kk = 0; kk <= gridN; kk += 1) {
            const t = ketemu(objs, `${gp}-a${kk}`);
            if (t && !(kk === 0 && t.isi === "20" && t.warna === "#DC2626")) cek(t.isi === String(kk * tingkat), `${v.id}/${a.id}#${i + 1}: angka sumbu ${gp}-a${kk} = ${kk * tingkat} (ada ${t.isi})`);
          }
          for (const bar of objs.filter((o) => new RegExp(`^${p}-b\\d$`).test(o.id) && o.t === "kotak")) {
            const nomor = bar.id.slice(-1);
            const nama = isiTeks(objs, `${p}-n${nomor}`);
            const nilai = DATA[nama];
            if (nilai === undefined) continue;
            if (p === "bx") {
              const k0 = Math.floor(35 / tingkat);
              const y3 = ketemu(objs, `${gp}-g${k0}`).y;
              const y4 = ketemu(objs, `${gp}-g${k0 + 1}`).y;
              cek(bar.y < y3 && bar.y > y4, `${v.id}/${a.id}#${i + 1}: batang tiga puluh lima berhenti di antara dua garis`);
              continue;
            }
            const k = nilai / tingkat;
            const garisK = ketemu(objs, `${gp}-g${k}`);
            cek(Number.isInteger(k) && !!garisK, `${v.id}/${a.id}#${i + 1}: ${p} ${nama}: garis ke-${k} ada`);
            if (!garisK) continue;
            diagramDiperiksa += 1;
            if (tegak) {
              cek(Math.abs(bar.y - garisK.y) < TOL, `${v.id}/${a.id}#${i + 1}: ${p} ${nama}: ujung batang (${bar.y}) tepat pada garis ke-${k} (${garisK.y})`);
              cek(Math.abs(bar.y + bar.h - sd.y) < TOL, `${v.id}/${a.id}#${i + 1}: ${p} ${nama}: batang berdiri dari dasar`);
              const sk = ketemu(objs, `${gp}-a${k}`);
              cek(sk && sk.isi === String(nilai), `${v.id}/${a.id}#${i + 1}: ${p} ${nama}: angka sumbu pada ujung batang sama dengan ${nilai}`);
            } else {
              cek(Math.abs(bar.x + bar.w - garisK.x) < TOL, `${v.id}/${a.id}#${i + 1}: ${p} ${nama}: ujung batang mendatar (${bar.x + bar.w}) tepat pada garis ke-${k} (${garisK.x})`);
              cek(Math.abs(bar.x - sy.x) < TOL, `${v.id}/${a.id}#${i + 1}: ${p} ${nama}: batang terbaring dari sumbu samping`);
            }
          }
        }
      });
  cek(diagramDiperiksa >= 60, `diagram: banyak batang yang dicek terhadap data (${diagramDiperiksa})`);
  {
    // Tinggi batang sebanding dengan data pada diagram tegak standar.
    const o = akhirAdegan(adegan(M_VIDEO, "baca-batang"), 0);
    const h = (id) => ketemu(o, id).h;
    cek(Math.abs(h("dg-b0") / 30 - h("dg-b1") / 20) < 0.01 && Math.abs(h("dg-b2") / 15 - h("dg-b3") / 25) < 0.01 && Math.abs(h("dg-b0") / 30 - h("dg-b2") / 15) < 0.01, "diagram tegak: tinggi batang sebanding data (30, 20, 15, 25)");
    const T = G.TEGAK_RINI;
    cek(T.tingkat === 5 && T.n === 6 && G.RINI.map((b) => b.banyak).join() === "30,20,15,25" && G.RINI.reduce((s, b) => s + b.banyak, 0) === 90, "data Story: jajanan Bu Rini 30, 20, 15, 25 dengan jumlah 90, tingkat lima, enam garis");
  }

  /* ---- Isi adegan ---- */
  {
    const kt = adegan(M_VIDEO, "kertas");
    cek(ada(akhirAdegan(kt, 0), "pr", "pr-tn", "pr-pg", "kt", "sy", "sx", "mj") && isiTeks(akhirAdegan(kt, 0), "n2") === "2 garis", "kertas: Pak Dodi berkalung tanda pengenal dan berpenggaris panjang, kertas berpetak dengan dua garis");
    cek(ada(akhirAdegan(kt, 1), "sa", "la", "ge", "d0", "d3") && isiTeks(akhirAdegan(kt, 1), "dt") === "data Bu Rini", "kertas: ketiga anak memindahkan data Bu Rini");
    cek(ada(akhirAdegan(kt, 2), "m0", "m3") && isiTeks(akhirAdegan(kt, 2), "n2") === "batang", "kertas: data digambar sebagai batang");
    const su = adegan(M_VIDEO, "sumbu");
    cek(ada(akhirAdegan(su, 0), "la", "dg-sy", "dg-sd", "dg-b0", "dg-b3", "dg-n0", "dg-n3") && isiTeks(akhirAdegan(su, 1), "l1") === "sumbu tegak" && isiTeks(akhirAdegan(su, 1), "l2") === "sumbu mendatar" && ketemu(akhirAdegan(su, 1), "dg-sy").sorot === true, "sumbu: sumbu tegak dan sumbu mendatar diberi nama");
    cek(isiTeks(akhirAdegan(su, 2), "l3") === "1 sumbu" && ada(akhirAdegan(su, 2), "dg-a0", "dg-a6", "su"), "sumbu: satu sumbu memuat nama jenis dan sumbu lain angka");
    const sk = adegan(M_VIDEO, "skala");
    sama(G.skalaTegak("dg", G.TEGAK_RINI).filter((o) => /-a\d$/.test(o.id)).map((o) => o.isi), ["0", "5", "10", "15", "20", "25", "30"], "skala: angka sumbu bertingkat lima");
    cek(ada(akhirAdegan(sk, 0), "dg-a0", "dg-a6", "dg-g1", "dg-g6") && isiTeks(akhirAdegan(sk, 1), "l30") === "30 = 3 puluh" && isiTeks(akhirAdegan(sk, 1), "l6") === "6 tingkat" && ada(akhirAdegan(sk, 1), "dg-b0", "gb"), "skala: batang risoles sampai garis tiga puluh, enam tingkat");
    cek(ada(akhirAdegan(sk, 2), "dg-b2", "gc") && isiTeks(akhirAdegan(sk, 2), "l15") === "15 porsi" && ketemu(akhirAdegan(sk, 2), "dg-b2").sorot === true, "skala: batang lemper sampai garis lima belas, lebih pendek");
    const bb = adegan(M_VIDEO, "baca-batang");
    cek(ada(akhirAdegan(bb, 0), "dg-b3", "pa", "em") && ketemu(akhirAdegan(bb, 0), "dg-b3").sorot === true && isiTeks(akhirAdegan(bb, 1), "l25a") === "2 puluh 5" && isiTeks(akhirAdegan(bb, 1), "l25b") === "= 25 porsi" && isiTeks(akhirAdegan(bb, 2), "lp") === "satuan: porsi", "baca-batang: geser mata dari ujung, es cincau dua puluh lima porsi, judul dan satuan sumbu");
    const sl = adegan(M_VIDEO, "salah-skala");
    cek(ada(akhirAdegan(sl, 0), "sa", "gb") && isiTeks(akhirAdegan(sl, 0), "l4") === "garis ke 4" && ketemu(akhirAdegan(sl, 0), "dg-b1").sorot === true, "salah-skala: Satria memandang batang pisang goreng di garis keempat");
    cek(isiTeks(akhirAdegan(sl, 1), "b4") === "4 porsi?" && ada(akhirAdegan(sl, 2), "tp0", "tp1", "tp2", "kn") && isiTeks(akhirAdegan(sl, 2), "tr") === "taruhan", "salah-skala: empat tingkat empat porsi, taruhan melipat taplak");
    const ps = adegan(M_VIDEO, "periksa-skala");
    cek(ada(akhirAdegan(ps, 0), "la", "gb", "pj") && ketemu(akhirAdegan(ps, 0), "dg-a4").sorot === true && isiTeks(akhirAdegan(ps, 0), "dg-a4") === "20", "periksa-skala: Laras menunjuk angka dua puluh pada garis keempat");
    cek(isiTeks(akhirAdegan(ps, 1), "l20") === "20 = 2 puluh" && isiTeks(akhirAdegan(ps, 1), "l5") === "tiap garis 5" && isiTeks(akhirAdegan(ps, 1), "l1") === "bukan 1 porsi" && ada(akhirAdegan(ps, 2), "sa", "kl", "tw1", "tw2"), "periksa-skala: tiap tingkat lima porsi, Satria terlilit taplak dan semua tertawa");
    const bd = adegan(M_VIDEO, "banding");
    cek(isiTeks(akhirAdegan(bd, 0), "lh") === "tertinggi" && ketemu(akhirAdegan(bd, 0), "dg-b0").sorot === true && ada(akhirAdegan(bd, 0), "ge"), "banding: risoles tertinggi");
    cek(isiTeks(akhirAdegan(bd, 1), "ls") === "30 - 15 = 15" && ada(akhirAdegan(bd, 1), "gb", "br") && isiTeks(akhirAdegan(bd, 1), "lp") === "terpendek", "banding: lemper terpendek, selisih lima belas dengan risoles");
    cek(isiTeks(akhirAdegan(bd, 2), "jm2") === "= 90 porsi" && isiTeks(akhirAdegan(bd, 2), "jm1") === "9 puluh" && !ketemu(akhirAdegan(bd, 2), "gb") && ["c0", "c1", "c2", "c3"].every((q) => ketemu(akhirAdegan(bd, 2), q)), "banding: jumlah empat batang sembilan puluh porsi");
    const md = adegan(M_VIDEO, "mendatar");
    cek(ada(akhirAdegan(md, 0), "pr", "dd-sy", "dd-sd", "dd-b0", "dd-b3", "dd-a6") && !ketemu(akhirAdegan(md, 0), "dg-b0") && !ketemu(akhirAdegan(md, 0), "dg-sy"), "mendatar: diagram tegak diputar menjadi mendatar");
    cek(ada(akhirAdegan(md, 1), "pj", "lk", "lm") && ketemu(akhirAdegan(md, 1), "dd-b0").sorot === true && ada(akhirAdegan(md, 2), "mb0", "mb3", "mt") && isiTeks(akhirAdegan(md, 2), "sm") === "banyak sama", "mendatar: panjang batang dibaca, tegak atau mendatar banyaknya sama");
    const pn = adegan(M_VIDEO, "penutup");
    cek(ada(akhirAdegan(pn, 0), "pb", "pd-b0", "pd-b3", "td1", "td2") && ada(akhirAdegan(pn, 1), "ph", "ph-tp", "ph-pl", "ph-ts") && isiTeks(akhirAdegan(pn, 1), "l1") === "1 pandangan", "penutup: diagram dipajang di papan besar, Pak Hendro");
    cek(ada(akhirAdegan(pn, 2), "sa", "la", "ge", "ph", "br", "br-ap", "br-np", "pr", "pr-tn", "pr-pg", "tn"), "penutup: keenam tokoh berpamitan");
    const op = adegan(U, "luar-pembuka");
    cek(ada(akhirAdegan(op, 0), "pr", "pb", "td", "sy", "sd") && isiTeks(akhirAdegan(op, 1), "n3") === "3 cara" && ada(akhirAdegan(op, 1), "o0", "o1", "o2", "ok"), "global pembuka: Pak Dodi menyiapkan papan besar, tiga cara, tanpa salah");
    cek(isiTeks(akhirAdegan(op, 2), "m0") === "1. Follow the Line" && isiTeks(akhirAdegan(op, 2), "m1") === "2. Bar Duel" && isiTeks(akhirAdegan(op, 2), "m2") === "3. Flip the Chart" && isiTeks(akhirAdegan(op, 3), "g2") === "Putar Diagram", "global pembuka: tiga nama dengan nama Indonesia");
    const gr = adegan(U, "luar-garis");
    cek(ada(akhirAdegan(gr, 1), "dg-sy", "dg-b0", "gb") && isiTeks(akhirAdegan(gr, 2), "lv") === "= 40" && ["c1", "c2", "c3", "c4"].every((c) => ada(akhirAdegan(gr, 3), `${c}-k`)) && isiTeks(akhirAdegan(gr, 3), "c4-t0") === "naik 10", "Follow the Line: tarik garis dari ujung batang, angka yang ditunjuk, empat tingkatan");
    const gt = adegan(U, "luar-garis-terapan");
    cek(ada(akhirAdegan(gt, 0), "la", "dg-b0", "gb") && isiTeks(akhirAdegan(gt, 0), "l40") === "40 = 4 puluh" && isiTeks(akhirAdegan(gt, 1), "lh") === "40 gelas" && ada(akhirAdegan(gt, 3), "bx-b0", "xs") && isiTeks(akhirAdegan(gt, 3), "lq") === "35?", "Follow the Line terapan: es teh empat puluh gelas, lalu ujung batang di antara dua garis");
    const au = adegan(U, "luar-adu");
    cek(isiTeks(akhirAdegan(au, 1), "n2") === "2 batang" && ada(akhirAdegan(au, 1), "ad-b0", "ad-b1") && isiTeks(akhirAdegan(au, 2), "fm") === "besar - kecil" && ada(akhirAdegan(au, 2), "gb", "br") && ada(akhirAdegan(au, 3), "ok"), "Bar Duel: dua batang diadu, selisih mengurangkan, sumbu sama");
    const at = adegan(U, "luar-adu-terapan");
    cek(isiTeks(akhirAdegan(at, 0), "l40") === "40 = 4 puluh" && isiTeks(akhirAdegan(at, 0), "l25") === "25 = 2 puluh 5" && isiTeks(akhirAdegan(at, 1), "sl") === "40 - 25 = 15" && isiTeks(akhirAdegan(at, 3), "ad-a0") === "20", "Bar Duel terapan: es teh dan jus, selisih lima belas, sumbu tidak dimulai dari nol");
    const pu = adegan(U, "luar-putar");
    cek(ada(akhirAdegan(pu, 1), "tp2-b0", "tp2-b2", "tp2-sd") && !ketemu(akhirAdegan(pu, 1), "tp-b0") && ada(akhirAdegan(pu, 2), "ka") && isiTeks(akhirAdegan(pu, 3), "ls") === "nama: samping", "Flip the Chart: diagram tegak diputar menjadi mendatar, nama di samping");
    const pt = adegan(U, "luar-putar-terapan");
    cek(ada(akhirAdegan(pt, 0), "sa", "tp2-b2", "dn") && !ketemu(akhirAdegan(pt, 0), "tp-b0") && ada(akhirAdegan(pt, 3), "xs", "tn") && !ketemu(akhirAdegan(pt, 3), "jp"), "Flip the Chart terapan: Satria memutar demi dinding sempit, lupa arah baca");
    const rk = adegan(U, "luar-ringkas");
    cek(ada(akhirAdegan(rk, 0), "r0-k", "r1-k", "r2-k", "pr") && isiTeks(akhirAdegan(rk, 0), "n3") === "3 cara" && ketemu(akhirAdegan(rk, 1), "r1-k").sorot === true && !ketemu(akhirAdegan(rk, 1), "r0-k").sorot && isiTeks(akhirAdegan(rk, 1), "n2") === "2 jenis" && ketemu(akhirAdegan(rk, 2), "r2-k").sorot === true && isiTeks(akhirAdegan(rk, 3), "qq") === "cara mana?" && isiTeks(akhirAdegan(rk, 3), "n2b") === "2 batang", "ringkasan: tiga kartu cara, dua jenis, dua batang yang hampir sama");
  }
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => f.startsWith("k4b6b-"));
  cek(berkas.length === 8, `berkas story k4b6b (${berkas.length})`);
  for (const f of ["bantu", "gambar", "luar-1", "luar-2", "materi-1", "materi-2", "materi-3", "video"]) cek(berkas.includes(`k4b6b-${f}.ts`), `k4b6b-${f}.ts ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de || c.codePointAt(0) === 0x1fa74), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}|\\u\{1FA74\}|\\u\{1F39F\}|\\u\{2602\}|\\u\{1FA9F\}|\\u\{1FAA3\}|\\u\{1FA91\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95 dan tidak memakai emoji yang tampil kosong`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku|kelompok|nilai|skor|tebak|latihan|teman|soal|kunci|senilai|ditemani/i.test(s), `${f}: tanpa kata terlarang di berkas`);
    cek(!/helen|tfl|\bember\b|kolam|\bikan\b|karel|azizah|keramik|mosaik/i.test(s), `${f}: tanpa sisa cerita lama atau bab lain`);
    const impor = [...s.matchAll(/from "(\.\/[^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k4b6b-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k4b6b (${impor.join(", ")})`);
  }
  const L2 = await import("../src/components/modul/story/logika-story.ts");
  const V2 = await import("../src/components/modul/story/k4b6b-video.ts");
  for (const v of [V2.VIDEO_MATERI_K4B6B, V2.VIDEO_LUAR_K4B6B]) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L2.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}#${i + 1}: teks ${o.id} tanpa emoji di atas U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k4b6b.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K4B6B/.test(pb) && /VIDEO_LUAR_K4B6B/.test(pb) && /export function VideoK4B6B/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿"), "video-k4b6b.tsx: VideoK4B6B dengan dua video");
  const bn = readFileSync(new URL("../naskah/story-naskah-k4b6b.md", import.meta.url), "utf8");
  cek(!bn.includes("\r") && !bn.startsWith("﻿"), "naskah story-naskah-k4b6b.md: LF tanpa BOM");
}

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
