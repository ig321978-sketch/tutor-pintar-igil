// Uji Story Kelas 2 Bab 8 Sub-Bab B "Bintang Bu Maya" (diagram gambar), akhir cerita Pentas Seni Sekolah: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k2b8B.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k2b8B-video.ts");
const U1 = await import("../src/components/modul/story/k2b8B-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K2B8B, V.VIDEO_LUAR_K2B8B];
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




/* ------------------------------ Khusus Sub-Bab B Kelas 2 Bab 8 ------------------------------ */
const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
const M_VIDEO = V.VIDEO_MATERI_K2B8B;
const U = V.VIDEO_LUAR_K2B8B;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));

/** Bilangan yang diucapkan (kata) sebagai angka: satuan, belasan, puluhan dengan satuannya; "seratus" tidak dihitung. */
const SATUAN = { nol: 0, satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
const NAMA_S = "nol|satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan";
function bilanganSuara(s) {
  let t = s.toLowerCase().replace(/[.,?!:;]/g, " ");
  const hasil = [];
  t = t.replace(new RegExp(`\\b(dua|tiga|empat|lima|enam|tujuh|delapan|sembilan) puluh(?: (satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan))?\\b`, "g"), (_, a, b) => {
    hasil.push(SATUAN[a] * 10 + (b ? SATUAN[b] : 0));
    return " ";
  });
  t = t.replace(/\bsepuluh\b/g, () => (hasil.push(10), " "));
  t = t.replace(/\bsebelas\b/g, () => (hasil.push(11), " "));
  t = t.replace(new RegExp(`\\b(${NAMA_S}) belas\\b`, "g"), (_, a) => (hasil.push(10 + SATUAN[a]), " "));
  for (const m of t.matchAll(new RegExp(`\\b(${NAMA_S})\\b`, "g"))) hasil.push(SATUAN[m[1]]);
  return hasil;
}
sama(bilanganSuara("Dua puluh, sepuluh penonton, dua lebihnya, kedua, tiga."), [20, 10, 2, 3], "pembaca bilangan suara");
const angkaTampak = (objs) => {
  const s = new Set();
  for (const o of objs) if (o.t === "teks" && (o.op ?? 1) > 0 && o.isi) for (const m of o.isi.matchAll(/\d+/g)) s.add(Number(m[0]));
  return s;
};
{
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Sticky Note Graph|Row Comparing|Graph Detective|Diagram Kertas Tempel|Banding Baris|Detektif Diagram/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Sticky Note Graph", "Row Comparing", "Graph Detective"], ["Diagram Kertas Tempel", "Banding Baris", "Detektif Diagram"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Bintang Bu Maya" && U.judul === M_VIDEO.judul && V.JUDUL_K2B8B === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k2b8B-materi" && U.id === "k2b8B-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,papan-layar,satu-bintang,salah-gambar,sama-ukuran,baca-diagram,bandingkan,jumlah,presentasi,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-tempel,luar-tempel-terapan,luar-banding,luar-banding-terapan,luar-detektif,luar-detektif-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan)/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan)
      if (a.id !== "sapaan")
        a.ketukan.forEach((kt, i) => {
          const terlihat = new Set();
          for (let p = -1; p < L.kataDari(kt.suara).length; p += 1) for (const n of angkaTampak(L.keadaanStory(a, i, p))) terlihat.add(n);
          for (const n of bilanganSuara(kt.suara)) cek(terlihat.has(n), `${v.id}/${a.id}#${i + 1}: bilangan ${n} yang diucapkan tampak sebagai angka`);
        });
  const semuaSuara = M_VIDEO.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [1, 3, 5, 7, 8, 20]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [1, 2, 3, 4, 7, 10]) cek(bilanganSuara(semuaLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Chacha", "Dika", "Nia", "Bu Sari", "Bu Maya", "bintang", "selendang", "diagram gambar", "judul", "keterangan", "lebihnya", "kurangnya", "paling banyak", "paling sedikit", "dua puluh", "tirai merah", "Pentas Seni"])
    cek(materi.toLowerCase().includes(kata.toLowerCase()) || M_VIDEO.adegan.some((a) => a.ketukan.some((kt) => kt.suara.toLowerCase().includes(kata.toLowerCase()))), `video materi memuat "${kata}"`);
  for (const pola of [/Igil/, /Kaka/, /Abang/, /Mamah/, /Pak Pos/i, /rumah rapi/i, /bibit/i, /kereta/i, /festival/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /pustaka/i, /perpustakaan/i, /kantin/i, /koperasi/i, /seragam/i, /Bu Dewi/, /Pak Rudi/, /Pak Tono/, /ubin/i, /taman bermain/i, /puzzle/i, /pameran/i, /manik/i, /Pak Hasan/, /Bu Mira/, /Pak Danu/, /Bu Wati/, /Pak Joko/, /semangka/i, /kebun/i, /martabak/i, /Pak Anton/, /Bu Ratna/, /neraca/i, /timbang/i, /peluit/i, /lapangan/i, /Pak Ujang/, /Bu Lia/, /bank sampah/i, /gudang/i, /Pak Hendra/, /angklung/i, /seruling/i, /gendang/i, /rebana/i, /peti alat/i])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/diagram gambar/.test(sapa.ketukan[0].suara) && ["Membuat diagram gambar", "Membaca diagram gambar", "Menyajikan data"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  const naskah = readFileSync(new URL("../naskah/story-naskah-k2b8b.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  let banyakTitik = 0;
  let total = 0;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) { total += 1; if (new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at))).size >= 2) banyakTitik += 1; }
  cek(banyakTitik / total >= 0.9, `visual berubah mengikuti kata pada sedikitnya 90 persen ketukan (${banyakTitik}/${total})`);
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") cek(akhirAdegan(a).some((o) => o.t !== "teks"), `${v.id}/${a.id}: gambar akhir memuat bentuk gambar sendiri, bukan hanya teks`);
}
{
  const bs = adegan(M_VIDEO, "papan-layar");
  cek(ada(akhirAdegan(bs, 0), "dn", "dn-tk", "dn-tr", "lk", "lk-j", "bm", "bm-kb", "pl-k", "ks0", "ks4") && !ketemu(akhirAdegan(bs, 0), "bs"), "papan layar: depan panggung, loket, Bu Maya, papan layar kotak-kotak, kursi lipat");
  cek(ada(akhirAdegan(bs, 1), "bs", "bs-sl", "bs-kt", "bs-pj", "s0", "s3", "p1") && isiTeks(akhirAdegan(bs, 1), "bs-kp") === "PANITIA", "papan layar: Bu Sari berselendang batik, kartu PANITIA, papan jepit, empat selendang");
  cek(ada(akhirAdegan(bs, 2), "tt-k", "tz", "lp", "gb-k", "b0", "b2"), "papan layar: tabel turus bertanda tanya, usul diagram gambar bintang");
  const sb = adegan(M_VIDEO, "satu-bintang");
  cek(isiTeks(akhirAdegan(sb, 0), "lg-t0") === "1 bintang = 1 selendang" && ada(akhirAdegan(sb, 0), "bm0", "bm6", "sd0") && !ketemu(akhirAdegan(sb, 0), "bm7") && isiTeks(akhirAdegan(sb, 0), "jm0") === "7", "satu bintang: tujuh bintang merah, angka 7");
  cek(["jm1", "jm2", "jm3"].map((id) => isiTeks(akhirAdegan(sb, 1), id)).join() === "5,3,5" && ada(akhirAdegan(sb, 1), "bk4", "bh2", "bb4") && !ketemu(akhirAdegan(sb, 1), "bh3"), "satu bintang: kuning 5, hijau 3, biru 5 bintang");
  cek(ada(akhirAdegan(sb, 2), "hn", "hg", "kk", "pk"), "satu bintang: nama di kolom kiri, bintang ke kanan");
  const sg = adegan(M_VIDEO, "salah-gambar");
  cek(ada(akhirAdegan(sg, 0), "ch", "bg0", "bg2", "bm6", "sp", "pn") && !ketemu(akhirAdegan(sg, 0), "bm7"), "salah gambar: Chacha menggambar tiga bintang besar dan tujuh kecil, sapu");
  cek(isiTeks(akhirAdegan(sg, 1), "n3") === "3" && ada(akhirAdegan(sg, 1), "pj", "x1"), "salah gambar: hijau tampak panjang padahal 3");
  cek(ada(akhirAdegan(sg, 2), "dk", "bs0", "bs2", "sm", "jr", "ok") && !ketemu(akhirAdegan(sg, 2), "bg0"), "salah gambar: Dika, bintang diganti sama ukuran dan jarak");
  const su = adegan(M_VIDEO, "sama-ukuran");
  cek(ada(akhirAdegan(su, 0), "ni", "ni-tp", "bm6", "bk4", "bh2", "bb4", "tu", "tj"), "sama ukuran: Nia bertopi, semua bintang sama ukuran dan jarak");
  cek(ada(akhirAdegan(su, 1), "lb", "lc", "lh", "lw", "lw-m1", "kt-k") && isiTeks(akhirAdegan(su, 1), "kt-t0") === "1 gambar = 1 benda", "sama ukuran: bintang, lingkaran, hati, wajah, satu gambar satu benda");
  cek(isiTeks(akhirAdegan(su, 2), "kk-t0") === "1 bintang = 1 selendang" && ada(akhirAdegan(su, 2), "ni", "kl", "ki"), "sama ukuran: keterangan di bawah diagram");
  const bd = adegan(M_VIDEO, "baca-diagram");
  cek(ada(akhirAdegan(bd, 0), "jt", "kt", "nm0", "b06", "pk") && isiTeks(akhirAdegan(bd, 0), "jt") === "Selendang Penari", "baca diagram: judul, keterangan, nama, hitung ke kanan");
  cek(["jm0", "jm1", "jm2", "jm3"].map((id) => isiTeks(akhirAdegan(bd, 1), id)).join() === "7,5,3,5", "baca diagram: 7, 5, 3, 5");
  cek(isiTeks(akhirAdegan(bd, 2), "lb0") === "paling banyak" && isiTeks(akhirAdegan(bd, 2), "lb2") === "paling sedikit", "baca diagram: paling banyak dan paling sedikit");
  const bn = adegan(M_VIDEO, "bandingkan");
  cek(ada(akhirAdegan(bn, 0), "gv", "sm") && isiTeks(akhirAdegan(bn, 0), "sm") === "=", "bandingkan: kuning dan biru sama panjang");
  cek(isiTeks(akhirAdegan(bn, 1), "d2") === "2 lebih" && ada(akhirAdegan(bn, 1), "ch", "dk", "ok") && !ketemu(akhirAdegan(bn, 1), "cl"), "bandingkan: Chacha keliru, Dika meluruskan, merah 2 lebih");
  cek(isiTeks(akhirAdegan(bn, 2), "kr") === "2 kurang" && ada(akhirAdegan(bn, 2), "e0", "e1"), "bandingkan: hijau 2 kurang dari kuning");
  const jm = adegan(M_VIDEO, "jumlah");
  cek(isiTeks(akhirAdegan(jm, 1), "pj") === "3 + 5 = 8" && ada(akhirAdegan(jm, 1), "gh0", "gh2", "gb0", "gb4"), "jumlah: 3 + 5 = 8");
  cek(isiTeks(akhirAdegan(jm, 2), "eq") === "7 + 5 + 3 + 5 = 20" && isiTeks(akhirAdegan(jm, 2), "tt") === "20", "jumlah: semua selendang 20");
  const pr = adegan(M_VIDEO, "presentasi");
  cek(ada(akhirAdegan(pr, 0), "ch", "bs", "mk", "pl-k", "ks0", "p0"), "presentasi: Chacha di panggung bermikrofon, papan layar, penonton");
  cek(ada(akhirAdegan(pr, 1), "c0-k", "c1-k", "c2-k", "c3-k") && !ketemu(akhirAdegan(pr, 1), "ks0"), "presentasi: empat gelembung ucapan");
  cek(ada(akhirAdegan(pr, 2), "t0", "t2", "sr", "ks0") && !ketemu(akhirAdegan(pr, 2), "c0-k"), "presentasi: penonton bertepuk tangan");
  const pn = adegan(M_VIDEO, "penutup");
  cek(ada(akhirAdegan(pn, 0), "ch", "sp", "db", "n1"), "penutup: Chacha menyapu panggung");
  cek(ada(akhirAdegan(pn, 1), "tk2", "tr2", "lp", "b1", "sr") && ketemu(akhirAdegan(pn, 1), "tk2").w === 36, "penutup: tirai merah terbuka, lampu sorot, balon");
  cek(ada(akhirAdegan(pn, 2), "sp", "sp-t", "kf0", "kf9", "ch", "dk", "ni", "bs", "bm") && isiTeks(akhirAdegan(pn, 2), "sp-t") === "PENTAS SENI MERIAH", "penutup: spanduk PENTAS SENI MERIAH, konfeti, lima tokoh");
  // Metode global.
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "lk", "lc", "ni", "c0-k", "c2-k") && isiTeks(akhirAdegan(op, 0), "n3") === "3 kartu", "global pembuka: Nia menemukan tiga kartu lipat di laci loket");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Sticky Note Graph", "2. Row Comparing", "3. Graph Detective"], "global pembuka: tiga nama metode");
  sama(["q0", "q1", "q2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Diagram Kertas Tempel", "Banding Baris", "Detektif Diagram"], "global pembuka: tiga nama bahasa Indonesia");
  const tm = adegan(U, "luar-tempel");
  cek(isiTeks(akhirAdegan(tm, 0), "nm-t0") === "Sticky Note Graph" && ada(akhirAdegan(tm, 1), "pl-k", "ta0", "ta2", "ch") && isiTeks(akhirAdegan(tm, 1), "s1") === "1 anak = 1 kertas", "Kertas Tempel konsep: nama, satu anak satu kertas di lajur");
  cek(isiTeks(akhirAdegan(tm, 2), "kk-t0") === "1 kertas = 1 pilihan" && ada(akhirAdegan(tm, 2), "pn", "x1", "x2"), "Kertas Tempel konsep: satu kertas satu pilihan tanpa menggambar");
  cek(isiTeks(akhirAdegan(tm, 3), "sb") === "sama besar" && ada(akhirAdegan(tm, 3), "pr", "ok2"), "Kertas Tempel konsep: sama besar dan rapat");
  const tt = adegan(U, "luar-tempel-terapan");
  cek(isiTeks(akhirAdegan(tt, 0), "n10") === "10 penonton" && ada(akhirAdegan(tt, 0), "ch", "pa4", "pb4", "s3"), "Kertas Tempel terapan: sepuluh penonton ditanya warna");
  cek(ada(akhirAdegan(tt, 1), "ta0", "tb1", "tc1", "td2") && isiTeks(akhirAdegan(tt, 1), "s1") === "1 jawaban = 1 kertas", "Kertas Tempel terapan: satu jawaban satu kertas di lajur warna");
  cek(ada(akhirAdegan(tt, 2), "cc-k", "pp5", "by") && ada(akhirAdegan(tt, 3), "kc-k", "ct-k", "jm", "x1"), "Kertas Tempel terapan: cocok dan kurang cocok");
  const bb = adegan(U, "luar-banding");
  cek(isiTeks(akhirAdegan(bb, 0), "nm-t0") === "Row Comparing" && isiTeks(akhirAdegan(bb, 1), "n2") === "2 baris" && ada(akhirAdegan(bb, 1), "gs", "r14", "r22"), "Banding Baris konsep: dua baris sejajar dari garis yang sama");
  cek(ada(akhirAdegan(bb, 2), "lb", "kb", "ls") && ada(akhirAdegan(bb, 3), "kr", "e0", "e1"), "Banding Baris konsep: lebihnya dan kurangnya");
  const bt = adegan(U, "luar-banding-terapan");
  cek(isiTeks(akhirAdegan(bt, 0), "c7") === "7" && isiTeks(akhirAdegan(bt, 0), "c3") === "3" && ada(akhirAdegan(bt, 0), "dk", "ht6", "sp2") && !ketemu(akhirAdegan(bt, 0), "ht7"), "Banding Baris terapan: topi 7 dan sepatu 3");
  cek(isiTeks(akhirAdegan(bt, 1), "e4") === "4 gambar" && isiTeks(akhirAdegan(bt, 1), "ll") === "4 lebih", "Banding Baris terapan: topi 4 lebihnya dari sepatu");
  cek(isiTeks(akhirAdegan(bt, 2), "j2") === "2 jenis" && ada(akhirAdegan(bt, 3), "kc-k", "jm", "x1"), "Banding Baris terapan: cocok untuk dua jenis, kurang cocok untuk jumlah");
  const dt = adegan(U, "luar-detektif");
  cek(isiTeks(akhirAdegan(dt, 0), "nm-t0") === "Graph Detective" && ["c0-t0", "c1-t0", "c2-t0", "c3-t0"].map((id) => isiTeks(akhirAdegan(dt, 1), id)).join() === "judul,keterangan,nama jenis,gambar", "Detektif konsep: empat langkah baca berurutan");
  cek(ada(akhirAdegan(dt, 2), "pu", "ok0", "ok3") && ada(akhirAdegan(dt, 3), "bs0", "bs4", "h4", "pk"), "Detektif konsep: tidak terlewat, lalu hitung gambar");
  const dp = adegan(U, "luar-detektif-terapan");
  cek(isiTeks(akhirAdegan(dp, 0), "kt") === "1 gambar = 1 penonton" && ada(akhirAdegan(dp, 0), "ni", "jt", "t00", "n2"), "Detektif terapan: Nia membaca judul dan keterangan diagram tiket");
  cek(ada(akhirAdegan(dp, 1), "p0", "p2", "bm") && ada(akhirAdegan(dp, 2), "cc-k", "tz") && ada(akhirAdegan(dp, 3), "kc-k", "jm", "x1"), "Detektif terapan: hitung kiri ke kanan, cocok dan kurang cocok");
  const rk = adegan(U, "luar-ringkas");
  cek(["r0-t0", "r1-t0", "r2-t0"].map((id) => isiTeks(akhirAdegan(rk, 0), id)).join() === "1. Kertas Tempel,2. Banding Baris,3. Detektif Diagram" && isiTeks(akhirAdegan(rk, 0), "n3") === "3 cara", "ringkasan: tiga metode");
  cek(ada(akhirAdegan(rk, 3), "d0", "d2", "i0", "i1", "i2", "pk"), "ringkasan: tarian dan tiga cara untuk dipilih");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k2b8B-.*\.ts$/.test(f));
  cek(berkas.length >= 8, `berkas story k2b8B (${berkas.length})`);
  cek(!berkas.includes("k2b8B-materi-4.ts") && !berkas.includes("k2b8B-materi-5.ts"), "k2b8B-materi-4.ts dan materi-5.ts sudah dihapus");
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s), `${f}: tanpa kata buku`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k2b8B-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k2b8B (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k2b8b.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K2B8B/.test(pb) && /VIDEO_LUAR_K2B8B/.test(pb) && /export function VideoK2B8B/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿"), "video-k2b8b.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
