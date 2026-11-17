// Uji Story Kelas 1 Bab 7 Sub-Bab A "Tiang dan Tangga" (membandingkan dan mengurutkan panjang), awal cerita Rumah Pohon Abang: video materi dan video metode global.
// Bagian umum sama dengan uji Bab 5; bagian khusus memeriksa pagi di halaman, garis awal yang sama (salah langkah), lebih, sama tinggi (tupai), paling,
// tangga, tali dari garis awal, burung di dahan, penutup, bilangan yang diucapkan tampak sebagai angka, tanpa satuan baku, naskah suara tetap,
// dan tiga metode global (Direct Comparison, Indirect Comparison, Seriation).
// Jalankan: node --no-warnings scripts/uji-story-k1b7a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k1b7A-video.ts");
const U1 = await import("../src/components/modul/story/k1b7A-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K1B7A, V.VIDEO_LUAR_K1B7A];
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




/* ------------------------------ Khusus Sub-Bab A Bab 7 ------------------------------ */
const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
const G = await import("../src/components/modul/story/k1b7A-gambar.ts");
const M_VIDEO = V.VIDEO_MATERI_K1B7A;
const U = V.VIDEO_LUAR_K1B7A;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
const tidakAda = (objs, ...ids) => ids.every((id) => !ketemu(objs, id));
const sorot = (objs, ...ids) => ids.every((id) => ketemu(objs, id)?.sorot);
const puncak = (objs, id) => ketemu(objs, id).y;
const tinggi = (objs, id) => ketemu(objs, id).h;
const dasar = (objs, id) => ketemu(objs, id).y + ketemu(objs, id).h;

const SATUAN = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
const POLA_BIL = /\b(sebelas|(?:satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan) belas|dua belas|sepuluh|satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan)\b/g;
const nilaiBil = (m) => (m === "sebelas" ? 11 : m === "sepuluh" ? 10 : m.endsWith(" belas") ? 10 + SATUAN[m.split(" ")[0]] : SATUAN[m]);
const bilanganSuara = (s) => [...s.toLowerCase().matchAll(POLA_BIL)].map((m) => nilaiBil(m[1]));
sama(bilanganSuara("Dua belas, sebelas, sepuluh dan satu, kedua, keduanya, satuannya, berdua."), [12, 11, 10, 1], "pembaca bilangan suara");
{
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Direct Comparison|Indirect Comparison|Seriation|Banding Langsung|Banding dengan Perantara|Menyusun Tangga/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Direct Comparison", "Indirect Comparison", "Seriation"], ["Banding Langsung", "Banding dengan Perantara", "Menyusun Tangga"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Tiang dan Tangga" && U.judul === M_VIDEO.judul && V.JUDUL_K1B7A === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k1b7a-materi" && U.id === "k1b7a-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,pagi-halaman,garis-awal,lebih,sama-tinggi,paling,tangga,tali,burung,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-langsung,luar-langsung-terapan,luar-perantara,luar-perantara-terapan,luar-tangga,luar-tangga-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46) && U.adegan.every((a) => /Metode global|Ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  const TERLARANG = /\b(kelas|buku|teman|kelompok|skor|nilai|soal|tebak|latihan)\b/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
  const BAKU = /\b(cm|km|mm|meter|meteran|sentimeter|kilometer|milimeter|penggaris|centimeter)\b/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!BAKU.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa satuan baku`);
  const SURUH = /bawalah|bawa benda|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
  // Bab 7: tanpa lambang hitung, angka paling besar dua belas.
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan) {
      for (const [i] of a.ketukan.entries())
        for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) {
          cek(!/[<>×÷=]/.test(t) && !/\d\s*-\s*\d/.test(t), `${v.id}/${a.id}#${i + 1}: tanpa lambang hitung ("${t}")`);
          for (const b of bilanganDari(t)) cek(Number(b) <= 12, `${v.id}/${a.id}#${i + 1}: angka paling besar dua belas ("${t}")`);
        }
    }
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
  for (const n of [2, 3, 4]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  for (const kata of ["Igil", "Kaka", "Abang", "Mamah", "Kakek Jaya", "rumah pohon", "tiang", "tangga", "garis awal", "bata", "tupai", "tali", "burung", "lebih tinggi", "lebih pendek", "sama tinggi", "paling tinggi", "paling pendek", "papan lantai"])
    cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/Malosi/i, /\bKira\b/, /\bUpe\b/, /\bWei\b/, /Halim/i, /kebun/i, /bibit/i, /sekolah/i, /piknik/i, /kereta/i, /festival/i, /kardus/i, /\bikan\b/i, /akuarium/i, /lapak/i, /kambing/i, /pasar/i, /Pak Dadang/i, /Pak RT/i, /jerami/i])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/membandingkan dan mengurutkan panjang benda/.test(sapa.ketukan[0].suara) && ["Lebih tinggi, lebih pendek", "Paling tinggi, paling pendek", "Urutan dari garis awal sama"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k1b7a.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  const BEDA_SENGAJA = new Set(["Cara ini cocok untuk banyak benda sekaligus."]); // naskah: "Cocok untuk banyak benda sekaligus." (kurang dari enam kata)
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara) || BEDA_SENGAJA.has(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
}
{
  // 1. Pagi: halaman, rumah pohon berangka, empat tiang, Kakek Jaya, Abang, lalu Mamah dan Igil.
  const p = adegan(M_VIDEO, "pagi-halaman");
  const p0 = akhirAdegan(p, 0);
  cek(ada(p0, "tn", "pj-b", "pj-d", "rp-l", "ab", "kj", "tm", "tk", "th", "tb") && isiTeks(p0, "kj-n") === "Kakek Jaya", "pagi: halaman, pohon jambu, rumah pohon berangka, Kakek Jaya, Abang, empat tiang");
  cek(tinggi(p0, "tk") > tinggi(p0, "tm") && tinggi(p0, "tm") === tinggi(p0, "th") && tinggi(p0, "tb") < tinggi(p0, "tm"), "pagi: kuning paling tinggi, merah dan hijau sama, biru paling pendek");
  const p1 = akhirAdegan(p, 1);
  cek(ada(p1, "pb", "tp", "tg", "ld") && isiTeks(p1, "ld") === "tangga landai", "pagi: tiang berbaris dari pendek, tangga landai");
  const p2 = akhirAdegan(p);
  cek(ada(p2, "mm", "ig", "at-k", "al-k"), "pagi: Mamah menoleh pada Igil, tolong atur dan beri alasan");
  // 2. Garis awal: merah di atas bata tampak paling tinggi, tetapi dari tanah lebih pendek dari kuning.
  const g = adegan(M_VIDEO, "garis-awal");
  const g0 = akhirAdegan(g, 0);
  cek(["bt0", "bt1", "bt2"].every((id) => ada(g0, id)) && puncak(g0, "tm") < puncak(g0, "tk") && isiTeks(g0, "pt") === "paling tinggi?" && dasar(g0, "tm") < dasar(g0, "tk"), "garis awal: merah di atas bata, ujungnya paling atas, alasnya lebih tinggi dari tanah");
  const g1 = akhirAdegan(g, 1);
  cek(ada(g1, "kk", "sl", "lb", "lt") && sorot(g1, "bt0", "bt1", "bt2"), "garis awal: Kaka menggeleng, bata disorot, tanah ditandai");
  const g2 = akhirAdegan(g);
  cek(tidakAda(g2, "bt0", "bt1", "bt2", "sl", "pt") && ada(g2, "ga") && dasar(g2, "tm") === dasar(g2, "tk") && puncak(g2, "tm") > puncak(g2, "tk") && isiTeks(g2, "gt") === "garis awal sama" && isiTeks(g2, "hs") === "merah lebih pendek dari kuning", "garis awal: bata disingkirkan, dari garis awal sama merah lebih pendek");
  // 3. Lebih.
  const l = adegan(M_VIDEO, "lebih");
  const l1 = akhirAdegan(l, 1);
  cek(tinggi(l1, "tk") > tinggi(l1, "tm") && isiTeks(l1, "kt-t0") === "kuning lebih tinggi" && isiTeks(l1, "mp-t0") === "merah lebih pendek" && dasar(l1, "tk") === dasar(l1, "tm"), "lebih: kuning lebih tinggi dan merah lebih pendek dari garis awal sama");
  const l2 = akhirAdegan(l);
  cek(isiTeks(l2, "dn") === "2 benda" && isiTeks(l2, "kl-t0") === "kata: lebih", "lebih: dua benda memakai kata lebih");
  // 4. Sama tinggi dengan tupai.
  const s = adegan(M_VIDEO, "sama-tinggi");
  const s0 = akhirAdegan(s, 0);
  cek(tinggi(s0, "th") === tinggi(s0, "tm") && puncak(s0, "th") === puncak(s0, "tm") && isiTeks(s0, "st-t0") === "sama tinggi" && ada(s0, "gu"), "sama tinggi: hijau dan merah sejajar");
  const s1 = akhirAdegan(s, 1);
  cek(ada(s1, "tl", "ab") && isiTeks(s1, "ps") === "pas!" && isiTeks(s1, "tt") === "tidak ada yang lebih tinggi", "sama tinggi: tali lurus pas di ujung keduanya");
  const tupaiLompat = L.posisiKata(s.ketukan[2].suara, "melompat");
  cek(ketemu(L.keadaanStory(s, 2, tupaiLompat - 1), "tu").x === 252 && ketemu(L.keadaanStory(s, 2, 9999), "tu").x === 110, "sama tinggi: tupai melompat ke ujung tiang saat kata melompat");
  const s2 = akhirAdegan(s);
  cek(isiTeks(s2, "ct-t0") === "cit cit!" && ada(s2, "tw0", "tw1") && tidakAda(s2, "st-k"), "sama tinggi: tupai mengerik, semua tertawa");
  // 5. Paling.
  const m = adegan(M_VIDEO, "paling");
  const m0 = akhirAdegan(m, 0);
  cek(isiTeks(m0, "em") === "4 tiang" && ada(m0, "mk") && isiTeks(m0, "pt-t0") === "kuning paling tinggi" && sorot(m0, "tk") && Math.min(...["tm", "tk", "th", "tb"].map((id) => puncak(m0, id))) === puncak(m0, "tk"), "paling: empat tiang, kuning paling tinggi");
  const m1 = akhirAdegan(m, 1);
  cek(sorot(m1, "tb") && isiTeks(m1, "pp-t0") === "biru paling pendek" && tidakAda(m1, "mk", "pt-k") && Math.max(...["tm", "tk", "th", "tb"].map((id) => puncak(m1, id))) === puncak(m1, "tb"), "paling: biru paling pendek");
  const m2 = akhirAdegan(m);
  cek(isiTeks(m2, "k2-t0") === "2 benda: kata lebih" && isiTeks(m2, "k3-t0") === "3 benda atau lebih: kata paling", "paling: dua benda lebih, tiga benda atau lebih paling");
  // 6. Tangga.
  const t = adegan(M_VIDEO, "tangga");
  const t0 = akhirAdegan(t, 0);
  const xs = (objs) => ["tb", "tm", "th", "tk"].map((id) => ketemu(objs, id).x);
  cek(xs(t0)[0] < xs(t0)[1] && xs(t0)[1] < xs(t0)[2] && xs(t0)[2] < xs(t0)[3] && ["tb", "tm", "th", "tk"].every((id, i, a) => i === 0 || tinggi(t0, a[i - 1]) <= tinggi(t0, id)) && ada(t0, "ab") && isiTeks(t0, "pl") === "dari paling pendek", "tangga: biru, merah, hijau, kuning dari paling pendek");
  const t1 = akhirAdegan(t, 1);
  cek(ketemu(t1, "tm").x > ketemu(t1, "th").x && tinggi(t1, "tm") === tinggi(t1, "th") && isiTeks(t1, "sm") === "sama tinggi: boleh bertukar", "tangga: merah dan hijau sama tinggi bertukar tempat");
  const t2 = akhirAdegan(t);
  cek(ketemu(t2, "mm").y < 80 && ada(t2, "ln", "ok") && isiTeks(t2, "lm") === "landai" && isiTeks(t2, "tg") === "tidak goyang", "tangga: Mamah menaiki tangga landai dan tidak goyang");
  // 7. Tali.
  const a = adegan(M_VIDEO, "tali");
  const a0 = akhirAdegan(a, 0);
  cek(isiTeks(a0, "tg") === "3 tali" && ketemu(a0, "tm").w > ketemu(a0, "tb").w && ketemu(a0, "tb").w > ketemu(a0, "th").w && ["tm", "tb", "th"].every((id) => ketemu(a0, id).x === 70) && ada(a0, "ga") && isiTeks(a0, "gt") === "garis awal", "tali: tiga tali dari garis awal yang sama");
  const a1 = akhirAdegan(a, 1);
  cek(isiTeks(a1, "k1-t0") === "merah lebih panjang dari biru" && isiTeks(a1, "k2-t0") === "hijau paling pendek" && sorot(a1, "th"), "tali: merah lebih panjang dari biru, hijau paling pendek");
  const a2 = akhirAdegan(a);
  cek(ketemu(a2, "th").x > 70 && ketemu(a2, "th").x + ketemu(a2, "th").w > ketemu(a2, "tm").x + ketemu(a2, "tm").w && isiTeks(a2, "tp") === "tampak paling panjang?" && ada(a2, "sl"), "tali: ujung tidak sejajar, tali pendek tampak paling panjang");
  // 8. Burung.
  const b = adegan(M_VIDEO, "burung");
  const b0 = akhirAdegan(b, 0);
  cek(isiTeks(b0, "tb") === "3 burung" && puncak(b0, "ba") < puncak(b0, "bp") && puncak(b0, "bp") < puncak(b0, "bc") && isiTeks(b0, "ka-t0") === "abu lebih tinggi dari putih", "burung: tiga burung, abu paling tinggi");
  const b1 = akhirAdegan(b, 1);
  cek(isiTeks(b1, "ka-t0") === "putih lebih rendah dari abu" && isiTeks(b1, "kb-t0") === "cokelat paling rendah" && sorot(b1, "bc"), "burung: putih lebih rendah, cokelat paling rendah");
  const b2 = akhirAdegan(b);
  cek(isiTeks(b2, "ti") === "tinggi" && isiTeks(b2, "re") === "rendah" && ada(b2, "aw", "pn", "pr") && tidakAda(b2, "ka-k", "kb-k"), "burung: tinggi dan rendah untuk letak di udara");
  // 9. Penutup.
  const n = adegan(M_VIDEO, "penutup");
  const n1 = akhirAdegan(n, 1);
  cek(isiTeks(n1, "r1-t0") === "2 benda: kata lebih" && isiTeks(n1, "r2-t0") === "3 benda atau lebih: kata paling" && isiTeks(n1, "r3-t0") === "mulai dari garis awal sama", "penutup: ringkasan tiga baris");
  const n2 = akhirAdegan(n);
  cek(ada(n2, "rp-l", "gp", "ig", "kk", "kk-pita", "ab", "mm") && isiTeks(n2, "pq-t0") === "papan lantai?" && ada(n2, "tq"), "penutup: rangka lantai kosong, pertanyaan papan lantai, empat tokoh");
}
{
  // Pembuka metode global.
  const op = adegan(U, "luar-pembuka");
  sama([isiTeks(akhirAdegan(op, 0), "pk-t0"), ada(akhirAdegan(op, 0), "kj", "kr", "pj-b")], ["3 cara membandingkan", true], "global pembuka: Kakek Jaya menempel gambar, tiga cara");
  sama(["m0-t0", "m1-t0", "m2-t0"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Direct Comparison", "2. Indirect Comparison", "3. Seriation"], "global pembuka: tiga nama metode");
  sama(["n0-t0", "n1-t0", "n2-t0"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["1. Banding Langsung", "2. Banding dengan Perantara", "3. Menyusun Tangga"], "global pembuka: tiga nama bahasa Indonesia");
  // Direct Comparison.
  const lc = adegan(U, "luar-langsung");
  const c0 = akhirAdegan(lc, 0);
  cek(ketemu(c0, "ba").x < ketemu(c0, "bb").x && isiTeks(c0, "dn") === "2 benda", "Direct Comparison: dua benda berdampingan, ujung kiri belum sama");
  const c1 = akhirAdegan(lc, 1);
  cek(ketemu(c1, "ba").x === ketemu(c1, "bb").x && ada(c1, "ga") && isiTeks(c1, "gt") === "garis awal", "Direct Comparison: ujung kiri diluruskan di garis awal");
  const c2 = akhirAdegan(lc, 2);
  cek(ketemu(c2, "ek").x === ketemu(c2, "ba").x + ketemu(c2, "bb").w && sorot(c2, "ek") && isiTeks(c2, "kp-t0") === "yang melewati: lebih panjang", "Direct Comparison: yang melewati lebih panjang");
  const c3 = akhirAdegan(lc);
  cek(ketemu(c3, "ba").w === ketemu(c3, "bb").w && isiTeks(c3, "sm-t0") === "sama panjang" && tidakAda(c3, "ek"), "Direct Comparison: ujung kanan sejajar, sama panjang");
  const lt = adegan(U, "luar-langsung-terapan");
  const d0 = akhirAdegan(lt, 0);
  cek(isiTeks(d0, "dn") === "2 balok" && ketemu(d0, "bk").x === ketemu(d0, "bh").x && ketemu(d0, "bk").w > ketemu(d0, "bh").w && isiTeks(d0, "kl-t0") === "kuning lebih panjang", "terapan: dua balok dari garis sama, kuning lebih panjang");
  const maju = L.posisiKata(lt.ketukan[1].suara, "mengira");
  cek(ketemu(L.keadaanStory(lt, 1, maju), "bh").x === 100 && ketemu(L.keadaanStory(lt, 1, 9999), "bh").x === 60 && isiTeks(akhirAdegan(lt, 1), "lu") === "setelah lurus: kuning lebih panjang" && ada(akhirAdegan(lt, 1), "sd"), "terapan: Igil mengira hijau lebih panjang, setelah diluruskan sadar");
  cek(isiTeks(akhirAdegan(lt, 2), "pc-t0") === "paling cepat" && ada(akhirAdegan(lt, 2), "kl") && ketemu(akhirAdegan(lt, 2), "cb").x === 40, "terapan: paling cepat kalau bisa digeser");
  cek(ada(akhirAdegan(lt, 3), "pa-b", "pb-b", "sl") && isiTeks(akhirAdegan(lt, 3), "tk-t0") === "tidak bisa digeser", "terapan: pohon jambu tidak bisa digeser");
  // Indirect Comparison.
  const pc = adegan(U, "luar-perantara");
  const e0 = akhirAdegan(pc, 0);
  cek(ada(e0, "ta", "tb") && ketemu(e0, "tb").x - ketemu(e0, "ta").x >= 150 && isiTeks(e0, "jh") === "berjauhan", "Indirect Comparison: dua benda berjauhan");
  const e1 = akhirAdegan(pc, 1);
  cek(isiTeks(e1, "dn") === "2 benda" && ada(e1, "tl", "sl") && isiTeks(e1, "pt") === "perantara: tali", "Indirect Comparison: perantara seutas tali");
  const e2 = akhirAdegan(pc, 2);
  cek(ketemu(e2, "tt").h === tinggi(e2, "ta") && tidakAda(e2, "tl") && isiTeks(e2, "tn2") === "tandai ujungnya", "Indirect Comparison: tali sepanjang benda pertama, ujung ditandai");
  const e3 = akhirAdegan(pc);
  cek(ketemu(e3, "tt").x > 200 && ketemu(e3, "tt").h < tinggi(e3, "tb") && ["c1-t0", "c2-t0", "c3-t0"].map((id) => isiTeks(e3, id)).join() === "pas,kurang,lebih" && sorot(e3, "tt"), "Indirect Comparison: tali dibawa ke benda kedua, kurang");
  const pt = adegan(U, "luar-perantara-terapan");
  const f0 = akhirAdegan(pt, 0);
  cek(ada(f0, "ab", "pn", "pg0", "pg3") && tinggi(f0, "pg0") > tinggi(f0, "pn") && isiTeks(f0, "jh") === "berjauhan", "perantara terapan: pintu dan pagar berjauhan");
  const f1 = akhirAdegan(pt, 1);
  cek(ketemu(f1, "tt").h === tinggi(f1, "pn") && ketemu(f1, "tt").x > 200 && isiTeks(f1, "kr") === "tali kurang" && isiTeks(f1, "pl-t0") === "pagar lebih tinggi", "perantara terapan: tali setinggi pintu tidak sampai ke atas pagar");
  cek(ada(akhirAdegan(pt, 2), "ok", "cc-k", "cd-k") && ada(akhirAdegan(pt, 3), "tw", "sl") && isiTeks(akhirAdegan(pt, 3), "hk") === "hasil keliru", "perantara terapan: cocok untuk berjauhan, tali melar hasil keliru");
  // Seriation.
  const tc = adegan(U, "luar-tangga");
  const h0 = akhirAdegan(tc, 0);
  sama([0, 1, 2, 3, 4].map((i) => ada(h0, `t${i}`)), [true, true, true, true, true], "Seriation: lima benda acak");
  const h1 = akhirAdegan(tc, 1);
  const urutX = [0, 1, 2, 3, 4].sort((p, q) => ketemu(h1, `t${p}`).x - ketemu(h1, `t${q}`).x);
  cek(urutX.every((id, i) => i === 0 || tinggi(h1, `t${urutX[i - 1]}`) <= tinggi(h1, `t${id}`)) && isiTeks(h1, "lk") === "paling pendek" && isiTeks(h1, "lg") === "paling panjang", "Seriation: disusun dari paling pendek sampai paling panjang");
  cek(ada(akhirAdegan(tc, 2), "s0", "s3") && isiTeks(akhirAdegan(tc, 2), "mk") === "makin ke kanan, makin panjang", "Seriation: tiap benda lebih panjang dari yang di kirinya");
  const h3 = akhirAdegan(tc);
  cek(tinggi(h3, "t0") === tinggi(h3, "t4") && ketemu(h3, "t0").x === 143 && ketemu(h3, "t4").x === 103 && ada(h3, "p1", "p2"), "Seriation: dua benda sama panjang bertukar tempat");
  const tt = adegan(U, "luar-tangga-terapan");
  const i0 = akhirAdegan(tt, 0);
  cek(isiTeks(i0, "ln") === "5 tongkat" && [0, 1, 2, 3, 4].every((i) => ada(i0, `tk${i}`)) && ada(i0, "mm", "kk", "kk-pita"), "Seriation terapan: Mamah mengacak lima tongkat, Kaka menyusun");
  const i1 = akhirAdegan(tt, 1);
  cek(isiTeks(i1, "sa") === "1 tongkat salah tempat" && sorot(i1, "tk3") && ada(i1, "pt") && ketemu(i1, "tk0").x === 143 && ketemu(i1, "tk3").x === 183, "Seriation terapan: satu tongkat salah tempat terlihat patah");
  const i2 = akhirAdegan(tt, 2);
  cek(ketemu(i2, "tk3").x === 143 && ketemu(i2, "tk0").x === 183 && tidakAda(i2, "pt", "sa") && isiTeks(i2, "bn-t0") === "banyak benda", "Seriation terapan: cocok untuk banyak benda");
  const i3 = akhirAdegan(tt);
  cek(isiTeks(i3, "dn") === "2 benda" && ada(i3, "ka", "kb", "sl") && isiTeks(i3, "bl-t0") === "Banding Langsung", "Seriation terapan: dua benda cukup Banding Langsung");
  // Ringkasan.
  const rk = adegan(U, "luar-ringkas");
  sama(["r0-t0", "r1-t0", "r2-t0"].map((id) => isiTeks(akhirAdegan(rk, 0), id)), U1.NAMA_METODE, "ringkasan: tiga metode");
  cek(isiTeks(akhirAdegan(rk, 1), "q0-t0") === "2 benda digeser: Banding Langsung" && isiTeks(akhirAdegan(rk, 1), "q1-t0") === "berjauhan: Banding dengan Perantara" && isiTeks(akhirAdegan(rk, 2), "q2-t0") === "banyak benda: Menyusun Tangga", "ringkasan: pilih cara menurut benda");
  const r3 = akhirAdegan(rk);
  cek(isiTeks(r3, "sp") === "10 tongkat" && [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].every((i) => ada(r3, `tj${i}`)) && ada(r3, "tq"), "ringkasan: sepuluh tongkat, cara mana");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k1b7A-.*\.ts$/.test(f));
  cek(berkas.length >= 8, `berkas story k1b7A (${berkas.length})`);
  cek(!berkas.includes("k1b7A-materi-4.ts"), "k1b7A-materi-4.ts sudah dihapus");
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k1b1a-[a-z0-9-]+|k1b4a-gambar|k1b7A-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, k1b1a, k1b4a-gambar, atau k1b7A (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k1b7a.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K1B7A/.test(pb) && /VIDEO_LUAR_K1B7A/.test(pb) && /export function VideoK1B7A/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿"), "video-k1b7a.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => u0(t, kt), 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
function u0(t, kt) {
  return t + L.kataDari(kt.suara).length;
}
