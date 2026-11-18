// Uji Story Kelas 2 Bab 3 Sub-Bab A "Ubin untuk Taman Bermain" (bangun datar), awal cerita Taman Bermain Sekolah: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k2b3A.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k2b3A-video.ts");
const U1 = await import("../src/components/modul/story/k2b3A-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K2B3A, V.VIDEO_LUAR_K2B3A];
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

for (const v of VIDEO) for (const a of v.adegan) a.ketukan.forEach((_, i) => { for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(typeof o.isi === "string" && o.isi.length > 0, `${v.id}/${a.id}#${i + 1}: teks berisi (${o.id})`); });


/* ------------------------------ Khusus Sub-Bab A Kelas 2 Bab 3 ------------------------------ */
const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
const M_VIDEO = V.VIDEO_MATERI_K2B3A;
const U = V.VIDEO_LUAR_K2B3A;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
const tidakAda = (objs, ...ids) => ids.every((id) => !ketemu(objs, id));
const sorot = (objs, ...ids) => ids.every((id) => ketemu(objs, id)?.sorot);
const jumlahId = (objs, awalan) => objs.filter((o) => o.id.startsWith(awalan)).length;

const SATUAN = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8 };
const POLA_BIL = /\b(satu|dua|tiga|empat|lima|enam|tujuh|delapan)\b/g;
const bilanganSuara = (s) => [...s.toLowerCase().matchAll(POLA_BIL)].map((m) => SATUAN[m[1]]);
sama(bilanganSuara("Satu, dua, kedua, keduanya, satuannya, tiga puluh."), [1, 2, 3], "pembaca bilangan suara (satuan)");
{
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Geoboard|Venn Diagram|Shape Hunt|Papan Paku|Diagram Venn|Berburu Bentuk/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Geoboard", "Venn Diagram", "Shape Hunt"], ["Papan Paku", "Diagram Venn", "Berburu Bentuk"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Ubin untuk Taman Bermain" && U.judul === M_VIDEO.judul && V.JUDUL_K2B3A === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k2b3A-materi" && U.id === "k2b3A-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,ubin-datang,pilah-tepi,salah-hitung,tandai-awal,cari-taman,lingkaran,ubin-telur,tiga-tanya,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-papan,luar-papan-terapan,luar-venn,luar-venn-terapan,luar-buru,luar-buru-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan)/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
  // Angka di gambar paling besar delapan.
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan)
      for (const [i] of a.ketukan.entries())
        for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 8, `${v.id}/${a.id}#${i + 1}: angka paling besar delapan ("${t}")`);
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
  for (const n of [1, 2, 3, 4, 5, 6, 7]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [1, 2, 3, 5, 6]) cek(bilanganSuara(semuaLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Chacha", "Dika", "Nia", "Bu Sari", "Pak Tono", "ubin", "sisi", "segi banyak", "bentuk lengkung", "segitiga", "segi empat", "segi lima", "segi enam", "lingkaran", "uang logam", "rumah burung", "jam dinding", "perosotan", "terhitung dua kali", "papan permainan"])
    cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/Igil/, /Kaka/, /Abang/, /Mamah/, /Pak Pos/i, /rumah rapi/i, /kebun/i, /bibit/i, /kereta/i, /festival/i, /kardus/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /pustaka/i, /perpustakaan/i, /kantin/i, /koperasi/i, /\bkue\b/i, /seragam/i, /Bu Dewi/, /Bu Ratna/, /Pak Rudi/])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/bangun datar/.test(sapa.ketukan[0].suara) && ["Segi banyak dan bentuk lengkung", "Menamai bentuk dari banyak sisinya", "Mengenal lingkaran"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k2b3a.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  // Visual berubah mengikuti kata (paling sedikit dua titik waktu) pada hampir semua ketukan.
  let banyakTitik = 0;
  let total = 0;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) { total += 1; if (new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at))).size >= 2) banyakTitik += 1; }
  cek(banyakTitik / total >= 0.9, `visual berubah mengikuti kata pada sedikitnya 90 persen ketukan (${banyakTitik}/${total})`);
  // Gambar bukan hanya emoji: setiap adegan memuat bentuk gambar sendiri.
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") cek(akhirAdegan(a).some((o) => o.t !== "teks"), `${v.id}/${a.id}: gambar akhir memuat bentuk gambar sendiri, bukan hanya teks`);
}
{
  // 1. Ubin datang.
  const d = adegan(M_VIDEO, "ubin-datang");
  const d0 = akhirAdegan(d, 0);
  cek(ada(d0, "gb", "gb-p", "pt", "pt-hl", "kr0", "kr1", "kr2") && isiTeks(d0, "pt-n") === "Pak Tono" && isiTeks(d0, "gb-p") === "Taman Bermain", "ubin datang: gerbang berpita, Pak Tono berhelm, tiga karung ubin");
  const d1 = akhirAdegan(d, 1);
  cek(ada(d1, "bs", "bs-hl", "pp", "ppc0", "ppc5", "ub", "ok") && tidakAda(d1, "kr0", "kr1") && ketemu(d1, "ub").x === ketemu(d1, "ok").x, "ubin datang: Bu Sari bertopi proyek, papan petak, ubin tepat masuk petak");
  const d2 = akhirAdegan(d);
  cek(ada(d2, "sg", "xx", "an", "tt-k") && ketemu(d2, "an").rot > 0 && tidakAda(d2, "ub", "ok"), "ubin datang: salah pasang, anak tersandung, papan belum dibuka");
  // 2. Pilah tepi.
  const p = adegan(M_VIDEO, "pilah-tepi");
  cek(ada(akhirAdegan(p, 0), "ut", "jr", "tl", "ni") && isiTeks(akhirAdegan(p, 0), "ls") === "sisi", "pilah tepi: jari Nia menelusuri tepi, sisi lurus ditandai");
  cek(isiTeks(akhirAdegan(p, 1), "nb") === "segi banyak" && isiTeks(akhirAdegan(p, 1), "nl") === "bentuk lengkung" && ada(akhirAdegan(p, 1), "lg"), "pilah tepi: segi banyak dan bentuk lengkung");
  cek(ada(akhirAdegan(p), "kk", "kh") && ketemu(akhirAdegan(p), "ut").y > 130 && ketemu(akhirAdegan(p), "lg").y > 130 && ketemu(akhirAdegan(p), "ut").x < 100 && ketemu(akhirAdegan(p), "lg").x > 200, "pilah tepi: segi banyak ke keranjang kuning, lengkung ke keranjang hijau");
  // 3. Salah hitung.
  const h = adegan(M_VIDEO, "salah-hitung");
  const h0 = akhirAdegan(h, 0);
  cek(jumlahId(h0, "hxsn") === 6 && ["1", "2", "3", "4", "5", "6"].every((n, i) => isiTeks(h0, `hxsn${i}`) === n) && isiTeks(h0, "t7") === "7", "salah hitung: sisi bernomor 1 sampai 6 lalu angka 7 bertumpuk di sisi awal");
  cek(sorot(akhirAdegan(h, 1), "hxs0", "t7") && ada(akhirAdegan(h, 1), "dk", "sl") && isiTeks(akhirAdegan(h, 1), "dk2") === "2 kali", "salah hitung: Dika menunjuk sisi terhitung dua kali");
  cek(ada(akhirAdegan(h), "ch", "tb0", "tb1", "tb2", "bi") && ketemu(akhirAdegan(h), "ch").isi === "\u{1F604}" && tidakAda(akhirAdegan(h), "hx"), "salah hitung: Chacha terduduk di tumpukan ubin sambil tertawa");
  // 4. Tandai awal.
  const t = adegan(M_VIDEO, "tandai-awal");
  cek(ada(akhirAdegan(t, 0), "hxs0", "bd") && isiTeks(akhirAdegan(t, 0), "hxsn0") === "1" && isiTeks(akhirAdegan(t, 0), "kb") === "kembali ke tanda", "tandai awal: bendera di sisi awal, hitung berputar sampai tanda");
  cek(jumlahId(akhirAdegan(t, 1), "hxsn") === 6 && isiTeks(akhirAdegan(t, 1), "hx-nm") === "segi enam" && ada(akhirAdegan(t, 1), "lb"), "tandai awal: enam sisi, segi enam, sarang lebah");
  cek(["a3", "a4", "a5", "a6"].map((id) => isiTeks(akhirAdegan(t), id)).join() === "3 sisi,4 sisi,5 sisi,6 sisi" && ["n3", "n4", "n5", "n6"].map((id) => isiTeks(akhirAdegan(t), id)).join() === "segitiga,segi empat,segi lima,segi enam", "tandai awal: empat bentuk dengan nama dari banyak sisi");
  // 5. Cari taman.
  const c = adegan(M_VIDEO, "cari-taman");
  cek(ada(akhirAdegan(c, 0), "pn", "pt", "ni", "dk", "ch", "kc"), "cari taman: empat tokoh dan kaca pembesar di taman");
  cek(ada(akhirAdegan(c, 1), "ps", "rb") && isiTeks(akhirAdegan(c, 1), "s4") === "4 sisi" && isiTeks(akhirAdegan(c, 1), "s5") === "5 sisi", "cari taman: papan perosotan segi empat, rumah burung segi lima");
  cek(jumlahId(akhirAdegan(c), "jmsn") === 6 && isiTeks(akhirAdegan(c), "jm-nm") === "segi enam" && ada(akhirAdegan(c), "po", "jm"), "cari taman: jam dinding di pos dihitung enam sisi");
  // 6. Lingkaran.
  const l = adegan(M_VIDEO, "lingkaran");
  cek(isiTeks(akhirAdegan(l, 0), "s1") === "1 ubin" && ada(akhirAdegan(l, 0), "lk", "tl"), "lingkaran: satu ubin bulat seperti roda atau telur");
  cek(ada(akhirAdegan(l, 1), "lg", "lg-cap", "kt", "lgm") && ketemu(akhirAdegan(l, 1), "lgm").rot > 0 && ketemu(akhirAdegan(l, 1), "lg-cap").putus, "lingkaran: uang logam dicetak dan diputar di atas cetakan");
  cek(isiTeks(akhirAdegan(l), "bs") === "bulat sempurna" && isiTeks(akhirAdegan(l), "nl") === "lingkaran" && ada(akhirAdegan(l), "ok"), "lingkaran: pas ke arah mana pun, bulat sempurna");
  // 7. Ubin telur.
  const e = adegan(M_VIDEO, "ubin-telur");
  cek(ada(akhirAdegan(e, 0), "tl", "tl-cap", "pt") && ketemu(akhirAdegan(e, 0), "tl").rot > 0, "ubin telur: ubin telur diputar di cetakannya");
  cek(ada(akhirAdegan(e, 1), "xx") && isiTeks(akhirAdegan(e, 1), "bl") === "bukan lingkaran", "ubin telur: tidak pas, bukan lingkaran");
  cek(ketemu(akhirAdegan(e), "ch").isi === "\u{1F604}" && ketemu(akhirAdegan(e), "tl").rot > ketemu(akhirAdegan(e, 1), "tl").rot, "ubin telur: Chacha tertawa, ubin ikut berputar");
  // 8. Tiga pertanyaan.
  const q = adegan(M_VIDEO, "tiga-tanya");
  cek(isiTeks(akhirAdegan(q, 0), "p3") === "3 pertanyaan" && ada(akhirAdegan(q, 0), "pc", "dk"), "tiga pertanyaan: papan catatan Dika");
  cek(["r1", "r2", "r3"].map((id) => isiTeks(akhirAdegan(q), id).charAt(0)).join() === "1,2,3" && ada(akhirAdegan(q), "il", "ik", "ic"), "tiga pertanyaan: tiga baris bernomor dengan ikon garis lurus, lengkung, dan putar");
  // 9. Penutup.
  const n = adegan(M_VIDEO, "penutup");
  cek(jumlahId(akhirAdegan(n, 0), "ub") === 6 && ada(akhirAdegan(n, 0), "pp", "ok"), "penutup: enam petak terisi pas");
  cek(["c1", "c2", "c3"].map((id) => isiTeks(akhirAdegan(n, 1), id).charAt(0)).join() === "1,2,3" && ada(akhirAdegan(n, 1), "pc", "bd"), "penutup: Dika merangkum tiga langkah");
  const n2 = akhirAdegan(n);
  cek(ada(n2, "pz", "sq", "gp", "bs", "ch", "dk", "ni", "pt") && isiTeks(n2, "sn") === "1 persegi", "penutup: papan puzzle, satu persegi dipotong, lima tokoh melambai");
}
{
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "kr", "ch", "rk0-k", "rk1-k", "rk2-k") && isiTeks(akhirAdegan(op, 0), "n3") === "3 kartu", "global pembuka: karung ubin, tiga kartu tua");
  cek(ada(akhirAdegan(op, 1), "pt"), "global pembuka: Pak Tono tertawa");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Geoboard", "2. Venn Diagram", "3. Shape Hunt"], "global pembuka: tiga nama metode");
  sama(["n0", "n1", "n2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Papan Paku", "Diagram Venn", "Berburu Bentuk"], "global pembuka: tiga nama bahasa Indonesia");
  // Geoboard.
  const g = adegan(U, "luar-papan");
  cek(jumlahId(akhirAdegan(g, 0), "pg") >= 16 && isiTeks(akhirAdegan(g, 0), "gn") === "Papan Paku", "Geoboard: papan paku empat kali empat");
  cek(ada(akhirAdegan(g, 1), "kr0", "kr1", "kr2") && tidakAda(akhirAdegan(g, 1), "kr3"), "Geoboard: karet direntangkan di antara paku");
  cek(ada(akhirAdegan(g, 2), "kr3", "fl") && jumlahId(akhirAdegan(g, 2), "flsn") === 4 && isiTeks(akhirAdegan(g, 2), "sb") === "segi banyak", "Geoboard: karet rapat membentuk segi banyak, sisi sama dengan karet lurus");
  cek(ada(akhirAdegan(g), "kr4", "xs") && isiTeks(akhirAdegan(g), "tb") === "karet tidak bersilangan", "Geoboard: karet tidak boleh bersilangan");
  const gt = adegan(U, "luar-papan-terapan");
  cek(ada(akhirAdegan(gt, 0), "kr0", "kr4", "ph0", "ph4", "ni") && isiTeks(akhirAdegan(gt, 0), "p5") === "5 paku", "Geoboard terapan: karet di lima paku ditutup di paku pertama");
  cek(jumlahId(akhirAdegan(gt, 1), "flsn") === 5 && isiTeks(akhirAdegan(gt, 1), "n5") === "segi lima", "Geoboard terapan: lima karet lurus, segi lima");
  cek(ada(akhirAdegan(gt, 2), "ok", "cc-k", "sg") && ada(akhirAdegan(gt, 3), "xs", "rb", "kc-k"), "Geoboard terapan: cocok untuk bentuk sendiri, kurang cocok untuk benda jadi");
  // Venn.
  const v1 = adegan(U, "luar-venn");
  cek(ada(akhirAdegan(v1, 0), "vna", "vnb") && isiTeks(akhirAdegan(v1, 0), "vl") === "Diagram Venn", "Venn: dua lingkaran bertumpuk");
  cek(isiTeks(akhirAdegan(v1, 1), "d2") === "2 lingkaran" && ada(akhirAdegan(v1, 1), "ln"), "Venn: dua lingkaran, bagian tengah bertumpuk");
  cek(isiTeks(akhirAdegan(v1, 2), "va") === "segi banyak" && isiTeks(akhirAdegan(v1, 2), "vb") === "warna merah" && tidakAda(akhirAdegan(v1, 2), "ln"), "Venn: satu lingkaran untuk satu ciri");
  cek(ada(akhirAdegan(v1), "ln", "hx", "ok") && isiTeks(akhirAdegan(v1), "c2") === "2 ciri", "Venn: benda dua ciri di bagian tengah");
  const v2 = adegan(U, "luar-venn-terapan");
  cek(ada(akhirAdegan(v2, 0), "vna", "vnb", "dk") && isiTeks(akhirAdegan(v2, 0), "d2") === "2 lingkaran", "Venn terapan: Dika menaruh ubin ke dua lingkaran");
  cek(ada(akhirAdegan(v2, 1), "hx", "ku", "tl", "ln") && ketemu(akhirAdegan(v2, 1), "hx").y === 100 && isiTeks(akhirAdegan(v2, 1), "e6") === "6 sisi", "Venn terapan: ubin merah segi enam masuk ke bagian tengah");
  cek(ada(akhirAdegan(v2, 2), "ck", "cc-k") && ada(akhirAdegan(v2), "xs", "k1", "k2") && isiTeks(akhirAdegan(v2), "kc2") === "2 keranjang cukup", "Venn terapan: cocok untuk dua ciri, kurang cocok untuk satu ciri");
  // Shape Hunt.
  const b1 = adegan(U, "luar-buru");
  cek(ada(akhirAdegan(b1, 0), "pn", "kc") && isiTeks(akhirAdegan(b1, 0), "bn") === "Berburu Bentuk", "Shape Hunt: taman dan kaca pembesar");
  cek(ada(akhirAdegan(b1, 1), "ch", "ps", "po", "jm", "rb", "qm") && tidakAda(akhirAdegan(b1, 1), "bn"), "Shape Hunt: berjalan mengelilingi taman mencari benda");
  cek(ada(akhirAdegan(b1, 2), "hx", "pb-k") && isiTeks(akhirAdegan(b1, 2), "e6") === "6 sisi", "Shape Hunt: pilih satu bentuk, segi enam");
  cek(jumlahId(akhirAdegan(b1), "hxsn") === 6 && ada(akhirAdegan(b1), "pc", "ok"), "Shape Hunt: temuan dicatat, sisi dihitung lagi");
  const b2 = adegan(U, "luar-buru-terapan");
  cek(ada(akhirAdegan(b2, 0), "jm", "ul", "sl0", "sl3") && isiTeks(akhirAdegan(b2, 0), "e6") === "6 sisi", "Shape Hunt terapan: jam dinding, ubin lantai, sarang lebah kayu");
  cek(jumlahId(akhirAdegan(b2, 1), "jmsn") === 6 && ada(akhirAdegan(b2, 1), "ct", "ok"), "Shape Hunt terapan: sisi jam dinding dihitung sampai enam lalu dicatat");
  cek(ada(akhirAdegan(b2, 2), "ok", "cc-k", "m3", "m6") && ada(akhirAdegan(b2), "xs", "jam", "kc-k"), "Shape Hunt terapan: cocok mengenal bentuk, kurang cocok bila butuh cepat");
  // Ringkasan.
  const rk = adegan(U, "luar-ringkas");
  cek(["r0-t0", "r1-t0", "r2-t0"].map((id) => isiTeks(akhirAdegan(rk, 0), id)).join() === U1.NAMA_METODE.map((m, i) => `${i + 1}. ${m}`).join() && isiTeks(akhirAdegan(rk, 0), "t3") === "3 cara", "ringkasan: tiga metode");
  cek(isiTeks(akhirAdegan(rk, 1), "q0b-t0") === "Papan Paku" && isiTeks(akhirAdegan(rk, 1), "q1b-t0") === "Diagram Venn" && isiTeks(akhirAdegan(rk, 2), "q2b-t0") === "Berburu Bentuk", "ringkasan: pilih cara menurut tugas");
  cek(isiTeks(akhirAdegan(rk), "e6") === "6 sisi" && ada(akhirAdegan(rk), "o0-k", "o1-k", "o2-k", "qq", "hx"), "ringkasan: pertanyaan segi enam dari karet gelang");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k2b3A-.*\.ts$/.test(f));
  cek(berkas.length >= 8, `berkas story k2b3A (${berkas.length})`);
  cek(!berkas.includes("k2b3A-materi-4.ts"), "k2b3A-materi-4.ts sudah dihapus");
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s), `${f}: tanpa kata buku`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k2b3A-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k2b3A (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k2b3a.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K2B3A/.test(pb) && /VIDEO_LUAR_K2B3A/.test(pb) && /export function VideoK2B3A/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿"), "video-k2b3a.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
