// Uji Story Kelas 2 Bab 3 Sub-Bab B "Papan Puzzle yang Berantakan" (mengurai dan menyusun bangun datar), tengah cerita Taman Bermain Sekolah: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k2b3B.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k2b3B-video.ts");
const U1 = await import("../src/components/modul/story/k2b3B-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K2B3B, V.VIDEO_LUAR_K2B3B];
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


/* ------------------------------ Khusus Sub-Bab B Kelas 2 Bab 3 ------------------------------ */
const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
const M_VIDEO = V.VIDEO_MATERI_K2B3B;
const U = V.VIDEO_LUAR_K2B3B;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
const jumlahId = (objs, awalan) => objs.filter((o) => o.id.startsWith(awalan)).length;
const SATUAN = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9, sepuluh: 10, sebelas: 11 };
const bilanganSuara = (s) => [...s.toLowerCase().replace(/segi empat/g, "segi").matchAll(/\b(satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan|sepuluh|sebelas)\b/g)].map((m) => SATUAN[m[1]]);
sama(bilanganSuara("Satu, dua, tiga, kedua, keduanya, ketujuh dan enam."), [1, 2, 3, 6], "pembaca bilangan suara");
{
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Pattern Blocks|Paper Folding|Silhouette Puzzle|Pola Blok|Lipat Kertas|Teka-Teki Bayangan/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Pattern Blocks", "Paper Folding", "Silhouette Puzzle"], ["Pola Blok", "Lipat Kertas", "Teka-Teki Bayangan"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Papan Puzzle yang Berantakan" && U.judul === M_VIDEO.judul && V.JUDUL_K2B3B === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k2b3B-materi" && U.id === "k2b3B-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,angin-kencang,keping-bertumpuk,aturan,urai-persegi,susun-segitiga,segi-enam,tangram,pola-segitiga,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-blok,luar-blok-terapan,luar-lipat,luar-lipat-terapan,luar-bayangan,luar-bayangan-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan)/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan)
      for (const [i] of a.ketukan.entries())
        for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 9, `${v.id}/${a.id}#${i + 1}: angka paling besar sembilan ("${t}")`);
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan)
      if (a.id !== "sapaan")
        a.ketukan.forEach((kt, i) => {
          const terlihat = new Set();
          for (let p = -1; p < L.kataDari(kt.suara).length; p += 1) for (const t of L.teksTerlihat(L.keadaanStory(a, i, p))) for (const b of bilanganDari(t)) terlihat.add(Number(b));
          for (const n of bilanganSuara(kt.suara)) cek(terlihat.has(n), `${v.id}/${a.id}#${i + 1}: bilangan ${n} yang diucapkan tampak sebagai angka`);
        });
  const semuaSuara = M_VIDEO.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [1, 2, 4, 5, 6, 7]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  for (const kata of ["Chacha", "Dika", "Nia", "Bu Sari", "Bu Ratna", "papan puzzle", "bertumpuk", "mengurai", "menyusun", "segi enam", "tangram", "satu pojok", "titik tengah", "gudang mainan"])
    cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/Igil/, /Kaka/, /Abang/, /Mamah/, /Pak Pos/i, /rumah rapi/i, /kebun/i, /bibit/i, /kereta/i, /festival/i, /kardus/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /pustaka/i, /perpustakaan/i, /kantin/i, /koperasi/i, /seragam/i, /\bkue\b/i, /Pak Tono/, /ubin/i])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/mengurai dan menyusun bangun datar/.test(sapa.ketukan[0].suara) && ["Mengurai satu bangun menjadi beberapa bagian", "Menyusun beberapa bagian menjadi satu bentuk", "Bermain tangram"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  const naskah = readFileSync(new URL("../naskah/story-naskah-k2b3b.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  let banyakTitik = 0;
  let total = 0;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) { total += 1; if (new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at))).size >= 2) banyakTitik += 1; }
  cek(banyakTitik / total >= 0.9, `visual berubah mengikuti kata pada sedikitnya 90 persen ketukan (${banyakTitik}/${total})`);
}
{
  const d = (id) => adegan(M_VIDEO, id);
  const a1 = akhirAdegan(d("angin-kencang"), 0);
  cek(ada(a1, "pg-r", "pp", "an1", "sk0", "sk4") && ketemu(a1, "pp").y === 50, "angin: pagar, papan puzzle jatuh, keping berserakan");
  cek(ada(akhirAdegan(d("angin-kencang"), 1), "bs", "br", "kl-k", "qm") && isiTeks(akhirAdegan(d("angin-kencang")), "sd1") === "\u{1F622}", "angin: Bu Sari dan Bu Ratna, Sabtu, anak sedih");
  const t = akhirAdegan(d("keping-bertumpuk"), 0);
  cek(ada(t, "ch", "lt", "t0", "t1", "t2") && ketemu(t, "t2").z === 4, "tumpuk: Chacha menumpuk keping");
  cek(ada(akhirAdegan(d("keping-bertumpuk"), 1), "dk", "no") && ada(akhirAdegan(d("keping-bertumpuk")), "ni", "kg") && ketemu(akhirAdegan(d("keping-bertumpuk")), "t2").x === 114, "tumpuk: Dika menunjuk, keping mendarat di topi Nia");
  const r = akhirAdegan(d("aturan"));
  cek(["ar1", "ar2", "ar3", "ar4"].map((id) => isiTeks(r, id)).join() === "Pakai semua keping,Tidak bertumpuk,Sisi menempel rapat,Boleh putar dan balik" && jumlahId(r, "c") >= 4, "aturan: empat poin bercentang");
  const u1 = akhirAdegan(d("urai-persegi"), 1);
  cek(ada(u1, "kp0", "kp1", "ug0") && isiTeks(u1, "n0") === "2 segitiga", "urai: garis miring, dua segitiga");
  cek(ada(akhirAdegan(d("urai-persegi")), "kq0", "kq1", "ug1") && isiTeks(akhirAdegan(d("urai-persegi")), "n1") === "2 segi empat", "urai: garis tengah, dua segi empat");
  const s2 = akhirAdegan(d("susun-segitiga"), 1);
  cek(ada(s2, "ht", "dk") && isiTeks(s2, "ht-nm") === "persegi" && ketemu(s2, "kp0").x === 0, "susun: sisi miring menempel, persegi");
  cek(isiTeks(akhirAdegan(d("susun-segitiga")), "hs2-nm") === "segitiga besar", "susun: sisi pendek menempel, segitiga besar");
  cek(ada(akhirAdegan(d("segi-enam"), 1), "a0", "a1", "a2") && ada(akhirAdegan(d("segi-enam")), "b0", "b1", "b2") && isiTeks(akhirAdegan(d("segi-enam")), "b-nm") === "tetap segi enam", "segi enam: dua cara menyusun");
  const g = akhirAdegan(d("tangram"), 0);
  cek(jumlahId(g, "kp") === 7 && isiTeks(g, "cn") === "7", "tangram: satu persegi dipotong jadi tujuh keping");
  const g1 = akhirAdegan(d("tangram"), 1);
  cek(ada(g1, "jn") && isiTeks(g1, "jn") === "segi empat miring", "tangram: lima segitiga, persegi, segi empat miring");
  cek(ada(akhirAdegan(d("tangram")), "hm", "ph", "kc") && isiTeks(akhirAdegan(d("tangram")), "cn") === "7", "tangram: rumah, perahu, kucing, selalu tujuh");
  const p1 = akhirAdegan(d("pola-segitiga"), 1);
  cek(jumlahId(p1, "f") === 4 && jumlahId(p1, "ug") === 3 && isiTeks(p1, "ms-t0") === "6 − 2 = 4", "pola: satu pojok, empat segitiga, 6 - 2 = 4");
  const p2 = akhirAdegan(d("pola-segitiga"));
  cek(jumlahId(p2, "c") >= 6 && isiTeks(p2, "n6b") === "6 segitiga", "pola: titik tengah, enam segitiga");
  const c = akhirAdegan(d("penutup"));
  cek(ada(c, "gd", "t1", "t2", "t3", "t4", "t5", "qm") && ada(akhirAdegan(d("penutup"), 0), "pp", "kt", "br", "ni"), "penutup: papan utuh, gudang dengan tanda tanya, lima tokoh");
}
{
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "ps", "ni") && isiTeks(akhirAdegan(op, 0), "t3") === "3 cara" && ada(akhirAdegan(op, 1), "br", "ls"), "global pembuka: poster tua di balik lukisan");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), `${id}-t0`)), ["1. Pattern Blocks", "2. Paper Folding", "3. Silhouette Puzzle"], "global pembuka: tiga nama metode");
  sama(["n0", "n1", "n2"].map((id) => isiTeks(akhirAdegan(op, 3), `${id}-t0`)), ["Pola Blok", "Lipat Kertas", "Teka-Teki Bayangan"], "global pembuka: tiga nama Indonesia");
  const b = adegan(U, "luar-blok");
  cek(ada(akhirAdegan(b, 1), "b0", "b1", "b2") && isiTeks(akhirAdegan(b, 1), "n6") === "6 sisi", "Pola Blok: segitiga, segi empat, segi enam");
  const bt = adegan(U, "luar-blok-terapan");
  cek(jumlahId(akhirAdegan(bt, 0), "s") >= 6 && isiTeks(akhirAdegan(bt, 0), "c6") === "6 segitiga" && jumlahId(akhirAdegan(bt, 1), "r") >= 3 && isiTeks(akhirAdegan(bt, 1), "c6") === "3 segi empat miring", "Pola Blok terapan: enam segitiga diganti tiga segi empat miring");
  cek(ada(akhirAdegan(bt, 2), "ok", "cc-k") && ada(akhirAdegan(bt, 3), "xs", "lb", "kk-k"), "Pola Blok terapan: cocok dan kurang cocok");
  const l = adegan(U, "luar-lipat");
  cek(ada(akhirAdegan(l, 1), "kt", "fl") && ada(akhirAdegan(l, 2), "g0", "g1", "sm") && isiTeks(akhirAdegan(l, 3), "d2") === "2 bagian", "Lipat Kertas: lipat, gunting, dua bagian ditumpuk");
  const lt = adegan(U, "luar-lipat-terapan");
  cek(isiTeks(akhirAdegan(lt, 1), "n2") === "2" && ada(akhirAdegan(lt, 2), "ok2", "sb-k") && ada(akhirAdegan(lt, 3), "xs", "rm"), "Lipat Kertas terapan: dua segitiga, cocok dan kurang cocok");
  const y = adegan(U, "luar-bayangan");
  cek(ada(akhirAdegan(y, 1), "by0", "by1") && ada(akhirAdegan(y, 2), "s0", "s1", "ok") && ada(akhirAdegan(y, 3), "pt", "bl", "qm"), "Teka-Teki Bayangan: bayangan gelap, keping menutupi, putar dan balik");
  const yt = adegan(U, "luar-bayangan-terapan");
  cek(jumlahId(akhirAdegan(yt, 0), "kp") === 7 && isiTeks(akhirAdegan(yt, 0), "c7") === "7" && ada(akhirAdegan(yt, 2), "ok", "ms") && ada(akhirAdegan(yt, 3), "xs", "kb"), "Teka-Teki Bayangan terapan: tujuh keping, cocok dan kurang cocok");
  const rk = adegan(U, "luar-ringkas");
  cek(isiTeks(akhirAdegan(rk, 0), "t3") === "3 cara" && ["r0", "r1", "r2"].map((id) => isiTeks(akhirAdegan(rk, 0), `${id}-t0`)).join() === U1.NAMA_METODE_ID.map((m, i) => `${i + 1}. ${m}`).join(), "ringkasan: tiga metode");
  cek(ada(akhirAdegan(rk), "ug", "n2", "qm") && isiTeks(akhirAdegan(rk), "n2") === "2 segitiga", "ringkasan: pertanyaan persegi menjadi dua segitiga");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k2b3B-.*\.ts$/.test(f));
  cek(berkas.length >= 8, `berkas story k2b3B (${berkas.length})`);
  cek(!berkas.includes("k2b3B-materi-4.ts"), "k2b3B-materi-4.ts sudah dihapus");
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s), `${f}: tanpa kata buku`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k1b1a-bantu|k1b4a-gambar|k2b3B-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, k1b1a-bantu, k1b4a-gambar, atau k2b3B (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k2b3b.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K2B3B/.test(pb) && /VIDEO_LUAR_K2B3B/.test(pb) && /export function VideoK2B3B/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿"), "video-k2b3b.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
