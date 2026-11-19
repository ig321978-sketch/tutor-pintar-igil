// Uji Story Kelas 3 Bab 1 Sub-Bab C "Karung Pak Dodi" (membandingkan dan mengurutkan bilangan): video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k3b1C.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k3b1C-video.ts");
const U1 = await import("../src/components/modul/story/k3b1C-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K3B1C, V.VIDEO_LUAR_K3B1C];
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
          for (const o of ak.tambah === undefined ? [] : [].concat(ak.tambah)) {
            cek(!peta.has(o.id), `${nama}#${i + 1}: tambah "${o.id}" tidak menimpa benda yang sudah ada`);
            peta.add(o.id);
          }
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




/* ------------------------------ Khusus Sub-Bab C Kelas 3 Bab 1 ------------------------------ */
const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
const M_VIDEO = V.VIDEO_MATERI_K3B1C;
const U = V.VIDEO_LUAR_K3B1C;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));

/** Bilangan yang diucapkan sebagai angka: satuan, "N puluh [M]", "N ratus [N puluh] [M]", "seratus", dan "N ratusan" (cukup angka N atau N00 tampak). */
const SAT = { nol: 0, satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
const adaSat = (w) => w !== undefined && Object.prototype.hasOwnProperty.call(SAT, w);
function bilanganSuara(s) {
  const hasil = [];
  for (const klausa of s.toLowerCase().split(/[,.?!:;]/)) {
    const w = klausa.split(/\s+/).filter(Boolean);
    for (let i = 0; i < w.length; ) {
      const a = w[i];
      if (a === "seratus") {
        hasil.push({ n: 100 });
        i += 1;
      } else if (adaSat(a) && w[i + 1] === "ratus") {
        let n = SAT[a] * 100;
        i += 2;
        if (adaSat(w[i]) && w[i + 1] === "puluh") {
          n += SAT[w[i]] * 10;
          i += 2;
        }
        if (adaSat(w[i]) && SAT[w[i]] > 0 && w[i + 1] !== "ratus" && w[i + 1] !== "puluh") {
          n += SAT[w[i]];
          i += 1;
        }
        hasil.push({ n });
      } else if (adaSat(a) && w[i + 1] === "ratusan") {
        hasil.push({ n: SAT[a], atau: SAT[a] * 100 });
        i += 2;
      } else if (adaSat(a) && w[i + 1] === "puluh") {
        let n = SAT[a] * 10;
        i += 2;
        if (adaSat(w[i]) && SAT[w[i]] > 0) {
          n += SAT[w[i]];
          i += 1;
        }
        hasil.push({ n });
      } else if (adaSat(a)) {
        hasil.push({ n: SAT[a] });
        i += 1;
      } else i += 1;
    }
  }
  return hasil;
}
sama(bilanganSuara("Tiga ratus empat puluh, tiga ratus empat, empat ratus tiga puluh, dan empat ratus tiga.").map((x) => x.n), [340, 304, 430, 403], "pembaca bilangan suara: ratusan");
sama(bilanganSuara("Puluhannya enam dan lima. Seratus. Lima ratusan karung.").map((x) => x.n), [6, 5, 100, 5], "pembaca bilangan suara: satuan, seratus, ratusan");
sama(bilanganSuara("tujuh ratus dua puluh delapan dan tujuh ratus dua puluh satu").map((x) => x.n), [728, 721], "pembaca bilangan suara: dua puluh delapan");
const angkaTampak = (objs) => {
  const s = new Set();
  for (const o of objs) if (o.t === "teks" && (o.op ?? 1) > 0 && o.isi) for (const m of o.isi.matchAll(/\d+/g)) s.add(Number(m[0]));
  return s;
};
{
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Compare Placewise|Number Line|Ordering|Banding per Tempat|Garis Bilangan Ratusan|Mengurutkan/.test(materi.replace(/mengurutkan bilangan/gi, "")) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Compare Placewise", "Number Line", "Ordering"], ["Banding per Tempat", "Garis Bilangan Ratusan", "Mengurutkan"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Karung Pak Dodi" && U.judul === M_VIDEO.judul && V.JUDUL_K3B1C === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k3b1C-materi" && U.id === "k3b1C-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,truk-beras,ratusan-dulu,ratusan-sama,salah-urut,tanda-banding,garis-bilangan,urut-tiga,papan-urut,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-tempat,luar-tempat-terapan,luar-garis,luar-garis-terapan,luar-urut,luar-urut-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 56) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 56), "label sumber");
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
          for (const b of bilanganSuara(kt.suara)) cek(terlihat.has(b.n) || (b.atau !== undefined && terlihat.has(b.atau)), `${v.id}/${a.id}#${i + 1}: bilangan ${b.n} yang diucapkan tampak sebagai angka`);
        });
  const semuaSuara = M_VIDEO.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  const bm = bilanganSuara(semuaSuara).map((x) => x.n);
  for (const n of [465, 456, 546, 389, 398, 500, 400, 600, 3, 5, 6]) cek(bm.includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  const bl = bilanganSuara(semuaLuar).map((x) => x.n);
  for (const n of [728, 721, 250, 780, 340, 304, 430, 403, 100, 3]) cek(bl.includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Raka", "Salsa", "Bima", "Pak Joko", "Pak Dodi", "Bu Tuti", "karung", "Gudang Utara", "Gudang Selatan", "Gudang Timur", "ratusan", "puluhan", "satuan", "garis bilangan", "urutan naik", "urutan turun", "lebih besar", "sama dengan", "mulut"])
    cek(materi.toLowerCase().includes(kata.toLowerCase()) || M_VIDEO.adegan.some((a) => a.ketukan.some((kt) => kt.suara.toLowerCase().includes(kata.toLowerCase()))), `video materi memuat "${kata}"`);
  for (const pola of [/Igil/, /Kaka/, /Abang/, /Mamah/, /Pak Pos/i, /rumah rapi/i, /bibit/i, /kereta/i, /festival/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /pustaka/i, /perpustakaan/i, /kantin/i, /koperasi/i, /seragam/i, /Chacha/, /Dika/, /\bNia\b/, /Bu Sari/, /Bu Dewi/, /Pak Rudi/, /Pak Tono/, /ubin/i, /taman bermain/i, /puzzle/i, /pameran/i, /manik/i, /Pak Hasan/, /Bu Mira\b/, /Pak Danu/, /Bu Wati/, /semangka/i, /kebun/i, /martabak/i, /Pak Anton/, /Bu Ratna/, /neraca/i, /timbang/i, /peluit/i, /lapangan/i, /Pak Ujang/, /Bu Lia/, /bank sampah/i, /Pak Hendra/, /angklung/i, /seruling/i, /gendang/i, /rebana/i, /Kak Dewi/, /Pak Anto/, /Bu Mirna/, /Nenek Ijah/, /Alfa/, /Galih/, /Alen/, /Meutia/, /Andi/, /Pak Bandi/])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/membandingkan dan mengurutkan bilangan/.test(sapa.ketukan[0].suara) && ["Membandingkan dua bilangan", "Memakai tanda lebih besar dan lebih kecil", "Mengurutkan bilangan"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  const naskah = readFileSync(new URL("../naskah/story-naskah-k3b1c.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  let banyakTitik = 0;
  let total = 0;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) { total += 1; if (new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at))).size >= 2) banyakTitik += 1; }
  cek(banyakTitik / total >= 0.9, `visual berubah mengikuti kata pada sedikitnya 90 persen ketukan (${banyakTitik}/${total})`);
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") cek(akhirAdegan(a).some((o) => o.t !== "teks"), `${v.id}/${a.id}: gambar akhir memuat bentuk gambar sendiri, bukan hanya teks`);
}
{
  // Materi: tiap adegan sesuai catatan visual naskah.
  const tb = adegan(M_VIDEO, "truk-beras");
  cek(ada(akhirAdegan(tb, 0), "hl", "tr", "tr-k", "tk", "tk-p", "kr0", "kr2", "pd", "pd-tp", "n3") && isiTeks(akhirAdegan(tb, 0), "tk-p") === "TOKO PAK JOKO" && isiTeks(akhirAdegan(tb, 0), "n3") === "3 gudang", "truk beras: halaman toko, truk bertumpuk karung, Pak Dodi bertopi kuning, tiga gudang");
  cek(["g0-t1", "g1-t1", "g2-t1"].map((id) => isiTeks(akhirAdegan(tb, 1), id)).join() === "465,456,546" && ["g0-t0", "g1-t0", "g2-t0"].map((id) => isiTeks(akhirAdegan(tb, 1), id)).join() === "Utara,Selatan,Timur", "truk beras: tiga papan nama gudang 465, 456, 546");
  cek(ada(akhirAdegan(tb, 2), "pj", "pj-pn", "rk", "sl", "bm", "ty", "pb-k"), "truk beras: Pak Joko dan tiga anak bertanya paling banyak");
  const rd = adegan(M_VIDEO, "ratusan-dulu");
  cek(["pt-d0", "pt-d1", "pt-d2"].map((id) => isiTeks(akhirAdegan(rd, 0), id)).join() === "4,6,5" && isiTeks(akhirAdegan(rd, 0), "n3") === "3 angka" && ada(akhirAdegan(rd, 0), "pt-s0"), "ratusan dulu: papan tiga tempat, tiga angka, kolom ratusan disorot");
  cek(isiTeks(akhirAdegan(rd, 1), "pa-d0") === "5" && isiTeks(akhirAdegan(rd, 1), "pb-d0") === "4" && ada(akhirAdegan(rd, 1), "pa-s0", "pb-s0"), "ratusan dulu: Timur lima ratusan dan Utara empat ratusan");
  cek(isiTeks(akhirAdegan(rd, 2), "g5") === "5" && isiTeks(akhirAdegan(rd, 2), "g4") === "4" && isiTeks(akhirAdegan(rd, 2), "tn") === ">" && ada(akhirAdegan(rd, 2), "pl"), "ratusan dulu: lima lebih besar dari empat, Timur lebih banyak");
  const rs = adegan(M_VIDEO, "ratusan-sama");
  cek(ada(akhirAdegan(rs, 0), "ca", "cb", "pa-s1", "pb-s1") && isiTeks(akhirAdegan(rs, 0), "pa-d0") === "4" && isiTeks(akhirAdegan(rs, 0), "pb-d0") === "4", "ratusan sama: kolom ratusan dicentang, puluhan disorot");
  cek(isiTeks(akhirAdegan(rs, 1), "g6") === "6" && isiTeks(akhirAdegan(rs, 1), "g5") === "5" && isiTeks(akhirAdegan(rs, 1), "pa-d1") === "6" && isiTeks(akhirAdegan(rs, 1), "pb-d1") === "5", "ratusan sama: puluhan enam dan lima");
  cek(ada(akhirAdegan(rs, 2), "pa-s2", "pb-s2", "bp") && ketemu(akhirAdegan(rs, 2), "pa-d2").op === 0.3 && !ketemu(akhirAdegan(rs, 2), "g6"), "ratusan sama: satuan abu-abu belum perlu");
  const su = adegan(M_VIDEO, "salah-urut");
  cek(ada(akhirAdegan(su, 0), "rk", "pa-k", "pb-k", "pk", "k65", "mk0", "mk2", "n3") && isiTeks(akhirAdegan(su, 0), "k65") === "6 > 5" && isiTeks(akhirAdegan(su, 0), "n3") === "3 karung", "salah urut: Raka membandingkan dari satuan, panah dari kanan, tiga karung");
  cek(ada(akhirAdegan(su, 1), "sl", "x1", "ph", "pa-s0", "pa-s1") && ketemu(akhirAdegan(su, 1), "pk").op === 0.3 && !ketemu(akhirAdegan(su, 1), "k65"), "salah urut: Salsa menggeleng, panah hijau dari kiri");
  cek(ada(akhirAdegan(su, 2), "bm", "tj", "pl", "kp0", "kp2", "lt") && !ketemu(akhirAdegan(su, 2), "mk0"), "salah urut: Bima menunjuk puluhan, Raka memikul karung");
  const tn = adegan(M_VIDEO, "tanda-banding");
  cek(ada(akhirAdegan(tn, 0), "ka-k", "kb-k", "tn", "tn-b", "pm") && isiTeks(akhirAdegan(tn, 0), "ka-t") === "546" && isiTeks(akhirAdegan(tn, 0), "n2") === "2 bilangan", "tanda banding: mulut mengarah ke 546");
  cek(ada(akhirAdegan(tn, 1), "rd", "t2", "t2-b", "r1", "r2") && isiTeks(akhirAdegan(tn, 1), "r1") === "465" && isiTeks(akhirAdegan(tn, 1), "r2") === "546", "tanda banding: dibaca lebih besar dari, tanda kurang dari terbalik");
  cek(isiTeks(akhirAdegan(tn, 2), "ka-t") === "300" && isiTeks(akhirAdegan(tn, 2), "kb-t") === "300" && ada(akhirAdegan(tn, 2), "tn", "tn-b") && isiTeks(akhirAdegan(tn, 2), "n2") === "2 bilangan sama", "tanda banding: tanda sama dengan di antara dua kartu 300");
  const gb = adegan(M_VIDEO, "garis-bilangan");
  cek(["gb-l0", "gb-l1", "gb-l2"].map((id) => isiTeks(akhirAdegan(gb, 0), id)).join() === "400,500,600" && isiTeks(akhirAdegan(gb, 0), "j0") === "+100" && isiTeks(akhirAdegan(gb, 0), "j1") === "+100" && ada(akhirAdegan(gb, 0), "bm"), "garis bilangan: 400, 500, 600 dengan loncatan 100");
  cek(ada(akhirAdegan(gb, 1), "ar", "al") && isiTeks(akhirAdegan(gb, 1), "tb") === "makin besar" && isiTeks(akhirAdegan(gb, 1), "tk") === "makin kecil", "garis bilangan: makin kanan makin besar");
  cek(isiTeks(akhirAdegan(gb, 2), "m1-n") === "456" && isiTeks(akhirAdegan(gb, 2), "m2-n") === "465" && ketemu(akhirAdegan(gb, 2), "m2").x > ketemu(akhirAdegan(gb, 2), "m1").x && ada(akhirAdegan(gb, 2), "br") && !ketemu(akhirAdegan(gb, 2), "ar"), "garis bilangan: 456 dan 465 berdekatan, 465 lebih ke kanan");
  const ut = adegan(M_VIDEO, "urut-tiga");
  cek(["ka-t1", "kb-t1", "kc-t1"].map((id) => isiTeks(akhirAdegan(ut, 0), id)).join() === "465,456,546" && isiTeks(akhirAdegan(ut, 0), "n3") === "3 gudang" && ada(akhirAdegan(ut, 0), "sl"), "urut tiga: tiga kartu gudang, Salsa");
  {
    const a2 = akhirAdegan(ut, 1);
    const xs = ["kb-k", "ka-k", "kc-k"].map((id) => ketemu(a2, id).x);
    cek(xs[0] < xs[1] && xs[1] < xs[2] && ada(a2, "nk", "o1", "o3"), "urut tiga: kartu bergeser menjadi 456, 465, 546 dengan panah naik");
    const a3 = akhirAdegan(ut, 2);
    const ys = ["kc-k", "ka-k", "kb-k"].map((id) => ketemu(a3, id).x);
    cek(ys[0] < ys[1] && ys[1] < ys[2] && ada(a3, "tr", "ut") && !ketemu(a3, "nk") && isiTeks(a3, "ut") === "urutan turun", "urut tiga: dibalik menjadi urutan turun");
  }
  const pu = adegan(M_VIDEO, "papan-urut");
  cek(ada(akhirAdegan(pu, 0), "sl0", "sl3", "c0-k", "c1-k", "c3-k", "nk") && isiTeks(akhirAdegan(pu, 0), "c0-t") === "456" && isiTeks(akhirAdegan(pu, 0), "c3-t") === "546" && !ketemu(akhirAdegan(pu, 0), "c2-k"), "papan urut: slot kartu 456, 465, 546 dengan satu slot kosong");
  cek(isiTeks(akhirAdegan(pu, 1), "k5-t") === "500" && ada(akhirAdegan(pu, 1), "rk", "sl", "ty", "pt") && ketemu(akhirAdegan(pu, 1), "k5-k").y > 120, "papan urut: kartu 500 melayang di bawah slot ketiga");
  cek(ketemu(akhirAdegan(pu, 2), "k5-k").y === 68 && ketemu(akhirAdegan(pu, 2), "k5-k").x === 166 && ada(akhirAdegan(pu, 2), "bm", "ck0", "ck3", "rp") && !ketemu(akhirAdegan(pu, 2), "pt"), "papan urut: kartu 500 masuk slot ketiga, semua bercentang");
  const pn = adegan(M_VIDEO, "penutup");
  cek(ada(akhirAdegan(pn, 0), "rk", "ks0", "ks2", "tk", "ph", "dk"), "penutup: Raka bangga dengan karung, belajar dari kiri");
  cek(ada(akhirAdegan(pn, 1), "bt", "bt-kr", "bt-ds", "ps", "q1", "q2") && isiTeks(akhirAdegan(pn, 1), "n2") === "2 kotak kue", "penutup: Bu Tuti berkerudung merah muda, dua kotak kue");
  cek(isiTeks(akhirAdegan(pn, 2), "ka-t") === "389" && isiTeks(akhirAdegan(pn, 2), "kb-t") === "398" && isiTeks(akhirAdegan(pn, 2), "ps") === "?" && ada(akhirAdegan(pn, 2), "rk", "sl", "bm", "pj", "pd", "lb"), "penutup: 389 dan 398 bertanda tanya, lima tokoh melambai");
  // Metode global.
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "tr", "bm", "c0-k", "c2-k") && isiTeks(akhirAdegan(op, 0), "n3") === "3 catatan", "global pembuka: Bima menemukan tiga catatan lama di bak truk");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Compare Placewise", "2. Number Line", "3. Ordering"], "global pembuka: tiga nama metode");
  sama(["q0", "q1", "q2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Banding per Tempat", "Garis Bilangan Ratusan", "Mengurutkan"], "global pembuka: tiga nama bahasa Indonesia");
  const lt = adegan(U, "luar-tempat");
  cek(isiTeks(akhirAdegan(lt, 0), "nm-t0") === "Compare Placewise" && isiTeks(akhirAdegan(lt, 0), "nm-t1") === "Banding per Tempat", "Banding per Tempat konsep: nama");
  cek(ada(akhirAdegan(lt, 1), "pa-k", "pb-k", "pa-s0", "pb-s0") && isiTeks(akhirAdegan(lt, 1), "pa-d0") === "5", "Banding per Tempat konsep: dua papan, ratusan disorot");
  cek(ada(akhirAdegan(lt, 2), "st", "g7", "g4", "tn", "pl"), "Banding per Tempat konsep: berbeda berhenti, yang lebih besar menang");
  cek(ada(akhirAdegan(lt, 3), "ca", "ca1", "pa-s2", "pb-s2", "kt"), "Banding per Tempat konsep: sama turun ke puluhan lalu satuan");
  const tt = adegan(U, "luar-tempat-terapan");
  cek(isiTeks(akhirAdegan(tt, 0), "pa-n") === "728" && isiTeks(akhirAdegan(tt, 0), "pb-n") === "721" && ada(akhirAdegan(tt, 0), "sl", "ca1", "pa-s2"), "Banding per Tempat terapan: 728 dan 721");
  cek(ada(akhirAdegan(tt, 1), "tn", "rs", "pl") && isiTeks(akhirAdegan(tt, 1), "rs") === "728 > 721", "Banding per Tempat terapan: yang pertama lebih besar");
  cek(ada(akhirAdegan(tt, 2), "cc-k", "m1-k", "ok") && ada(akhirAdegan(tt, 3), "kc-k", "hl", "pm") && isiTeks(akhirAdegan(tt, 3), "m1-t") === "905", "Banding per Tempat terapan: cocok untuk mirip, kurang cocok untuk jauh berbeda");
  const lg = adegan(U, "luar-garis");
  cek(isiTeks(akhirAdegan(lg, 0), "nm-t0") === "Number Line" && ada(akhirAdegan(lg, 0), "rl"), "Garis Bilangan konsep: nama");
  cek(ada(akhirAdegan(lg, 1), "gb", "gb-l2", "ar", "tb"), "Garis Bilangan konsep: makin ke kanan makin besar");
  cek(isiTeks(akhirAdegan(lg, 2), "j0") === "+100" && isiTeks(akhirAdegan(lg, 2), "m1-n") === "430" && ada(akhirAdegan(lg, 2), "br"), "Garis Bilangan konsep: loncatan seratus, bilangan ditandai di antaranya");
  cek(ada(akhirAdegan(lg, 3), "ta", "tb", "pl", "jr", "tj") && ketemu(akhirAdegan(lg, 3), "tb").x > ketemu(akhirAdegan(lg, 3), "ta").x, "Garis Bilangan konsep: siapa lebih besar dan jaraknya");
  const lp = adegan(U, "luar-garis-terapan");
  cek(isiTeks(akhirAdegan(lp, 0), "ta-n") === "250" && isiTeks(akhirAdegan(lp, 0), "tb-n") === "780" && ketemu(akhirAdegan(lp, 0), "tb").x > ketemu(akhirAdegan(lp, 0), "ta").x && ada(akhirAdegan(lp, 0), "rk"), "Garis Bilangan terapan: 250 dan 780, titik kedua di kanan");
  cek(ada(akhirAdegan(lp, 1), "pl", "jr", "tj") && ada(akhirAdegan(lp, 2), "cc-k", "tm", "pd", "rb") && ada(akhirAdegan(lp, 3), "kc-k", "ta", "tb", "kg"), "Garis Bilangan terapan: jarak besar, cocok dan kurang cocok");
  const lu = adegan(U, "luar-urut");
  cek(isiTeks(akhirAdegan(lu, 0), "nm-t0") === "Ordering" && ada(akhirAdegan(lu, 0), "up"), "Mengurutkan konsep: nama");
  cek(["c0-t", "c1-t", "c2-t"].map((id) => isiTeks(akhirAdegan(lu, 1), id)).join() === "804,482,640" && ada(akhirAdegan(lu, 1), "pa", "pb", "tk", "tb"), "Mengurutkan konsep: dari terkecil ke terbesar atau sebaliknya");
  cek(ketemu(akhirAdegan(lu, 2), "c1-k").x === 24 && ketemu(akhirAdegan(lu, 2), "c0-k").x === 112 && ada(akhirAdegan(lu, 2), "ul"), "Mengurutkan konsep: yang paling kecil di depan lalu ulangi");
  cek(["c0-t", "c1-t", "c2-t"].map((id) => isiTeks(akhirAdegan(lu, 3), id)).join() === "482,640,804" && ketemu(akhirAdegan(lu, 3), "c0-k").x === 200 && isiTeks(akhirAdegan(lu, 3), "ut") === "urutan turun" && !ketemu(akhirAdegan(lu, 3), "nk"), "Mengurutkan konsep: naik lalu dibalik menjadi turun");
  const lo = adegan(U, "luar-urut-terapan");
  {
    const a1 = akhirAdegan(lo, 0);
    cek(["a-t", "b-t", "c-t", "d-t"].map((id) => isiTeks(a1, id)).join() === "340,304,430,403" && ["b-k", "a-k", "d-k", "c-k"].map((id) => ketemu(a1, id).x).join() === "14,84,154,224" && ada(a1, "bm", "nk", "un"), "Mengurutkan terapan: empat bilangan diurutkan menjadi 304, 340, 403, 430");
  }
  cek(ada(akhirAdegan(lo, 1), "tj", "g1", "g2", "g3", "ok"), "Mengurutkan terapan: diperiksa dari kiri, tiap bilangan lebih besar");
  cek(["m0-t", "m5-t"].map((id) => isiTeks(akhirAdegan(lo, 2), id)).join() === "128,712" && ada(akhirAdegan(lo, 2), "cc-k", "pr", "br"), "Mengurutkan terapan: cocok untuk banyak bilangan");
  cek(isiTeks(akhirAdegan(lo, 3), "n2") === "2 bilangan" && ada(akhirAdegan(lo, 3), "kc-k", "tn", "cb", "ok"), "Mengurutkan terapan: kurang cocok untuk dua bilangan");
  const rk = adegan(U, "luar-ringkas");
  cek(["r0", "r1", "r2"].map((id) => isiTeks(akhirAdegan(rk, 0), id)).join() === "1. Banding per Tempat,2. Garis Bilangan Ratusan,3. Mengurutkan" && isiTeks(akhirAdegan(rk, 0), "n3") === "3 cara", "ringkasan: tiga metode");
  cek(ada(akhirAdegan(rk, 3), "tk", "kr", "ty") && ketemu(akhirAdegan(rk, 3), "r0").sorot === true, "ringkasan: truk dan tiga cara untuk dipilih");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k3b1C-.*\.ts$/.test(f));
  cek(berkas.length >= 8, `berkas story k3b1C (${berkas.length})`);
  cek(!berkas.includes("k3b1C-materi-4.ts") && !berkas.includes("k3b1C-materi-5.ts"), "k3b1C-materi-4.ts dan materi-5.ts sudah dihapus");
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s), `${f}: tanpa kata buku`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k3b1C-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k3b1C (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k3b1c.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K3B1C/.test(pb) && /VIDEO_LUAR_K3B1C/.test(pb) && /export function VideoK3B1C/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿"), "video-k3b1c.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
