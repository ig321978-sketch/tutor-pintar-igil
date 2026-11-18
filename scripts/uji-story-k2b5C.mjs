// Uji Story Kelas 2 Bab 5 Sub-Bab C "Panen Raya Pak Joko" (seperempat dari benda utuh), akhir cerita Kebun Sekolah: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k2b5C.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k2b5C-video.ts");
const U1 = await import("../src/components/modul/story/k2b5C-luar-1.ts");

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


/* ------------------------------ Khusus Sub-Bab C Kelas 2 Bab 5 ------------------------------ */
const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
const M_VIDEO = V.VIDEO_MATERI_K2B5C;
const U = V.VIDEO_LUAR_K2B5C;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
const tidakAda = (objs, ...ids) => ids.every((id) => !ketemu(objs, id));
const sorot = (objs, ...ids) => ids.every((id) => ketemu(objs, id)?.sorot);

const SATUAN = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8 };
const POLA_BIL = /\b(satu|dua|tiga|empat|lima|enam|tujuh|delapan)\b/g;
const bilanganSuara = (s) => [...s.toLowerCase().matchAll(POLA_BIL)].map((m) => SATUAN[m[1]]);
sama(bilanganSuara("Satu, dua, kedua, keduanya, satuannya, tiga puluh, disatukan."), [1, 2, 3], "pembaca bilangan suara (satuan)");
{
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Halving Twice|Fraction Wall|Fold and Shade|Belah Dua Kali|Dinding Pecahan|Lipat dan Warnai/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Halving Twice", "Fraction Wall", "Fold and Shade"], ["Belah Dua Kali", "Dinding Pecahan", "Lipat dan Warnai"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Panen Raya Pak Joko" && U.judul === M_VIDEO.judul && V.JUDUL_K2B5C === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k2b5C-materi" && U.id === "k2b5C-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,labu-datang,salah-garis,empat-seperempat,dua-kali,hubungan,lipat,lingkaran,kupu,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-belah,luar-belah-terapan,luar-dinding,luar-dinding-terapan,luar-lipat,luar-lipat-terapan,luar-ringkas", "urutan adegan metode global");
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
  for (const n of [1, 2, 3, 4]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [1, 2, 3, 4]) cek(bilanganSuara(semuaLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Chacha", "Dika", "Nia", "Bu Sari", "Pak Joko", "labu", "regu", "petak tanah", "tali", "jerami", "empat bagian sama besar", "seperempat", "setengah", "dua kali", "satu utuh", "dua setengah", "empat seperempat", "tegak lurus", "kupu-kupu", "melipat", "segitiga", "persegi kecil"])
    cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/Igil/, /Kaka/, /Abang/, /Mamah/, /Pak Pos/i, /rumah rapi/i, /bibit/i, /kereta/i, /festival/i, /kardus/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /pustaka/i, /perpustakaan/i, /kantin/i, /koperasi/i, /seragam/i, /Bu Dewi/, /Bu Ratna/, /Pak Rudi/, /Pak Tono/, /ubin/i, /taman bermain/i, /puzzle/i, /gudang/i, /pameran/i, /manik/i, /Pak Hasan/, /Bu Mira/, /Pak Danu/, /Bu Wati/, /semangka/i, /martabak/i])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/seperempat/.test(sapa.ketukan[0].suara) && ["Empat bagian sama besar", "Memotong dua kali", "Utuh, setengah, dan seperempat"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k2b5c.md", import.meta.url), "utf8");
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
  // 1. Labu datang.
  const d = adegan(M_VIDEO, "labu-datang");
  cek(ada(akhirAdegan(d, 0), "pj", "pj-km", "pj-b1", "pj-b2", "lb", "pg0", "rm") && isiTeks(akhirAdegan(d, 0), "pj-n") === "Pak Joko" && isiTeks(akhirAdegan(d, 0), "n1") === "1 labu", "labu datang: Pak Joko berkumis dan bersepatu bot membawa satu labu, pagar bambu");
  cek(ada(akhirAdegan(d, 1), "r1", "r4", "pt", "pt-p0") && isiTeks(akhirAdegan(d, 1), "n4") === "4 regu" && isiTeks(akhirAdegan(d, 1), "n5") === "4 petak", "labu datang: empat regu dan petak tanah dengan patok");
  cek(ada(akhirAdegan(d), "x1", "m1", "bt-k"), "labu datang: tidak adil, regu bertengkar, panen batal");
  // 2. Salah garis.
  const s = adegan(M_VIDEO, "salah-garis");
  cek(ada(akhirAdegan(s, 0), "pt", "t1", "t2", "ch") && ketemu(akhirAdegan(s, 0), "t1").x2 === 0 && ketemu(akhirAdegan(s, 0), "t2").y2 !== 0, "salah garis: tali pertama tegak di tengah, tali kedua miring");
  cek(ada(akhirAdegan(s, 1), "dk", "jr", "x1", "x2", "x3", "x4"), "salah garis: Dika menunjuk empat petak tidak sama besar");
  cek(ada(akhirAdegan(s), "jm", "ch") && ketemu(akhirAdegan(s), "ch").isi === "\u{1F604}" && tidakAda(akhirAdegan(s), "x1"), "salah garis: Chacha jatuh ke jerami sambil tertawa");
  // 3. Empat seperempat.
  const e = adegan(M_VIDEO, "empat-seperempat");
  cek(ada(akhirAdegan(e, 0), "pt", "t1", "h1-k", "h2-k") && isiTeks(akhirAdegan(e, 0), "h1-t") === "setengah", "empat seperempat: petak dibagi dua, tiap bagian setengah");
  cek(ada(akhirAdegan(e, 1), "t1", "t2") && tidakAda(akhirAdegan(e, 1), "h1-k"), "empat seperempat: tiap setengah dibagi dua lagi");
  cek(["q1-t", "q2-t", "q3-t", "q4-t"].every((id) => isiTeks(akhirAdegan(e), id) === "seperempat") && isiTeks(akhirAdegan(e), "n4") === "4 bagian", "empat seperempat: empat bagian berlabel seperempat");
  // 4. Dua kali.
  const dk = adegan(M_VIDEO, "dua-kali");
  cek(isiTeks(akhirAdegan(dk, 0), "ks-t0") === "seperempat" && ada(akhirAdegan(dk, 0), "kt-k", "ku-k", "lb", "pj") && isiTeks(akhirAdegan(dk, 0), "n2") === "2 kali", "dua kali: seperempat sama dengan setengah dari setengah, labu utuh");
  cek(ada(akhirAdegan(dk, 1), "lh1", "lh2", "c2") && tidakAda(akhirAdegan(dk, 1), "lb"), "dua kali: labu dibelah, tiap belahan dibelah lagi");
  cek(ada(akhirAdegan(dk), "p1", "p4", "r1", "r4", "e1-k", "e4-k") && isiTeks(akhirAdegan(dk), "n4") === "4 regu", "dua kali: empat potong dibagikan ke empat regu");
  // 5. Hubungan.
  const h = adegan(M_VIDEO, "hubungan");
  cek(ketemu(akhirAdegan(h, 0), "a1").x === 140 && ketemu(akhirAdegan(h, 0), "a2").x === 140 && ketemu(akhirAdegan(h, 0), "a1").y === ketemu(akhirAdegan(h, 0), "a2").y && isiTeks(akhirAdegan(h, 0), "n1") === "1 setengah", "hubungan: dua seperempat menyatu menjadi satu setengah");
  cek(["b1", "b2", "b3", "b4"].every((id) => ketemu(akhirAdegan(h, 1), id).x === 150 && ketemu(akhirAdegan(h, 1), id).y === 110) && isiTeks(akhirAdegan(h, 1), "n1") === "1 utuh", "hubungan: empat seperempat menyatu menjadi satu utuh");
  sama(["r1", "r2", "r3"].map((id) => isiTeks(akhirAdegan(h), id)), ["1 utuh", "= 2 setengah", "= 4 seperempat"], "hubungan: tabel kecil utuh, setengah, seperempat");
  // 6. Lipat.
  const l = adegan(M_VIDEO, "lipat");
  cek(ada(akhirAdegan(l, 0), "kp1", "g1", "g2", "ni") && isiTeks(akhirAdegan(l, 0), "n4") === "4 persegi", "lipat: kertas dilipat tegak lalu mendatar jadi empat persegi");
  cek(ada(akhirAdegan(l, 1), "kp2", "d1", "d2") && isiTeks(akhirAdegan(l, 1), "n5") === "4 segitiga", "lipat: kertas kedua dilipat pojok ke pojok jadi empat segitiga");
  cek(ada(akhirAdegan(l), "w1", "w2", "l1-k", "l2-k") && tidakAda(akhirAdegan(l), "n4", "n5"), "lipat: satu bagian diwarnai tiap kertas, label seperempat");
  // 7. Lingkaran.
  const g = adegan(M_VIDEO, "lingkaran");
  cek(ada(akhirAdegan(g, 0), "lk", "g1", "g2", "tt", "bs-cp") && isiTeks(akhirAdegan(g, 0), "n2") === "2 garis", "lingkaran: Bu Sari bercaping, lingkaran di tanah dengan dua garis lewat titik tengah");
  cek(ada(akhirAdegan(g, 1), "g1", "g2", "xx") && tidakAda(akhirAdegan(g, 1), "ss", "ok") && ketemu(akhirAdegan(g, 1), "g2").y2 !== 0, "lingkaran: garis kedua miring, tidak sama besar");
  cek(ada(akhirAdegan(g), "pa1", "pa2", "pb1", "pb2", "ya", "ti", "dk"), "lingkaran: bagian ditumpuk, tegak lurus pas, miring tidak pas");
  // 8. Kupu-kupu.
  const kp = adegan(M_VIDEO, "kupu");
  cek(ada(akhirAdegan(kp, 0), "s1", "s2", "s3", "s4", "gt") && isiTeks(akhirAdegan(kp, 0), "n1") === "1 setengah" && isiTeks(akhirAdegan(kp, 0), "n3") === "3 seperempat", "kupu: satu setengah dan tiga seperempat lingkaran digunting");
  cek(ada(akhirAdegan(kp, 1), "w1", "w2", "w3", "w4", "bd", "ks") && tidakAda(akhirAdegan(kp, 1), "s1"), "kupu: potongan disusun menjadi kupu-kupu lalu diwarnai");
  cek(ada(akhirAdegan(kp), "hc-k", "b1", "b4") && ketemu(akhirAdegan(kp), "ni").isi === "\u{1F60A}", "kupu: hiasan cantik");
  // 9. Penutup.
  const pn = adegan(M_VIDEO, "penutup");
  cek(ada(akhirAdegan(pn, 0), "pt", "l1", "l2", "q1", "q4", "r1", "r4", "sr1") && isiTeks(akhirAdegan(pn, 0), "n4") === "4 regu", "penutup: petak dan labu terbagi empat, empat regu bersorak");
  cek(ada(akhirAdegan(pn, 1), "pc", "dk") && isiTeks(akhirAdegan(pn, 1), "c3") === "4 bagian", "penutup: papan catatan merangkum seperempat");
  cek(ada(akhirAdegan(pn), "sp", "sp-t", "ch", "dk", "ni", "bs", "pj", "tq", "lb", "pt", "kr") && isiTeks(akhirAdegan(pn), "sp-t") === "PANEN RAYA", "penutup: spanduk PANEN RAYA, lima tokoh, labu petak kertas");
}
{
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "lb", "dk", "c0-k", "c1-k", "c2-k") && isiTeks(akhirAdegan(op, 0), "n3") === "3 kartu", "global pembuka: Dika di balik labu menemukan tiga kartu tua");
  cek(ada(akhirAdegan(op, 1), "pj", "pt", "ok", "sn"), "global pembuka: Pak Joko menjelaskan cara membagi tanah");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Halving Twice", "2. Fraction Wall", "3. Fold and Shade"], "global pembuka: tiga nama metode");
  sama(["q0", "q1", "q2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Belah Dua Kali", "Dinding Pecahan", "Lipat dan Warnai"], "global pembuka: tiga nama bahasa Indonesia");
  const c = adegan(U, "luar-belah");
  cek(isiTeks(akhirAdegan(c, 0), "nm-t0") === "Halving Twice" && isiTeks(akhirAdegan(c, 0), "d2") === "2 kali", "Belah konsep: nama dan arti membelah dua kali");
  cek(ada(akhirAdegan(c, 1), "b1", "b2", "a1", "a2", "a3") && isiTeks(akhirAdegan(c, 1), "n3") === "2 lagi", "Belah konsep: belah dua lalu belah lagi");
  cek(ada(akhirAdegan(c, 2), "b3", "v1", "v2", "q1-k", "q4-k") && isiTeks(akhirAdegan(c, 2), "n4") === "4 bagian", "Belah konsep: empat bagian seperempat");
  cek(ada(akhirAdegan(c), "kc", "b4", "c1", "ok", "pb", "tq"), "Belah konsep: periksa tiap langkah sebelum membelah lagi");
  const ct = adegan(U, "luar-belah-terapan");
  cek(ada(akhirAdegan(ct, 0), "ch", "m1", "m2", "ct") && tidakAda(akhirAdegan(ct, 0), "ml"), "Belah terapan: Chacha membelah melon dua kali");
  cek(ada(akhirAdegan(ct, 1), "p1", "p4", "r1", "r4") && isiTeks(akhirAdegan(ct, 1), "n1") === "1 potong", "Belah terapan: empat potong untuk empat regu");
  cek(ada(akhirAdegan(ct, 2), "cc-k", "gt", "kc", "ok") && ada(akhirAdegan(ct, 3), "kc-k", "b1", "u1", "u2", "x1", "x2", "x3"), "Belah terapan: cocok untuk benda yang bisa dipotong, kurang cocok bila belahan pertama tak sama besar");
  const dd = adegan(U, "luar-dinding");
  cek(isiTeks(akhirAdegan(dd, 0), "nm-t0") === "Fraction Wall" && ada(akhirAdegan(dd, 0), "pt"), "Dinding konsep: nama dan pita");
  cek(ada(akhirAdegan(dd, 1), "b10", "b20", "b21") && isiTeks(akhirAdegan(dd, 1), "c1") === "1" && isiTeks(akhirAdegan(dd, 1), "c2") === "2", "Dinding konsep: baris satu pita utuh dan dua pita setengah");
  cek(ada(akhirAdegan(dd, 2), "b30", "b33") && isiTeks(akhirAdegan(dd, 2), "c3") === "4", "Dinding konsep: baris empat pita seperempat");
  cek(ada(akhirAdegan(dd), "el", "er", "kc", "pa", "ok"), "Dinding konsep: semua baris sama panjang, dibandingkan dari atas ke bawah");
  const dt = adegan(U, "luar-dinding-terapan");
  cek(ada(akhirAdegan(dt, 0), "ni", "e0", "e1", "h0", "sm") && isiTeks(akhirAdegan(dt, 0), "n2") === "2 pita" && isiTeks(akhirAdegan(dt, 0), "n1") === "1 pita", "Dinding terapan: dua pita seperempat di bawah satu pita setengah");
  cek(isiTeks(akhirAdegan(dt, 1), "f2") === "2 seperempat" && isiTeks(akhirAdegan(dt, 1), "f1") === "1 setengah", "Dinding terapan: dua seperempat sama dengan satu setengah");
  cek(ada(akhirAdegan(dt, 2), "cc-k", "u0", "v0", "w0") && ada(akhirAdegan(dt, 3), "kc-k", "lk", "pl", "x1", "x2"), "Dinding terapan: cocok untuk membandingkan, kurang cocok untuk lingkaran");
  const lp = adegan(U, "luar-lipat");
  cek(isiTeks(akhirAdegan(lp, 0), "nm-t0") === "Fold and Shade" && ada(akhirAdegan(lp, 0), "kr", "ks"), "Lipat konsep: nama dan selembar kertas");
  cek(ada(akhirAdegan(lp, 1), "kr", "g1", "g2") && isiTeks(akhirAdegan(lp, 1), "n4") === "4 bagian" && ketemu(akhirAdegan(lp, 1), "g1").putus === false, "Lipat konsep: lipat dua kali jadi empat bagian lalu buka");
  cek(ada(akhirAdegan(lp, 2), "wn", "lb-k") && isiTeks(akhirAdegan(lp, 2), "n1") === "1 bagian", "Lipat konsep: warnai satu bagian seperempat");
  cek(ada(akhirAdegan(lp), "b1", "b2", "kc") && sorot(akhirAdegan(lp), "g1", "g2"), "Lipat konsep: lipatan rapi, warna mudah dilihat");
  const lt = adegan(U, "luar-lipat-terapan");
  cek(ada(akhirAdegan(lt, 0), "dk", "kr", "g1", "g2", "wn") && isiTeks(akhirAdegan(lt, 0), "n1") === "1 persegi", "Lipat terapan: Dika melipat tegak mendatar dan mewarnai satu persegi");
  cek(isiTeks(akhirAdegan(lt, 1), "m1") === "1 dari" && isiTeks(akhirAdegan(lt, 1), "m4") === "4 bagian" && ada(akhirAdegan(lt, 1), "lb-k", "bk"), "Lipat terapan: satu dari empat bagian sama besar");
  cek(ada(akhirAdegan(lt, 2), "cc-k", "wn", "pl", "ok") && ada(akhirAdegan(lt, 3), "kc-k", "sb", "tt1", "sk", "x1"), "Lipat terapan: cocok menunjukkan seperempat, kurang cocok bila kertas basah atau sobek");
  const rk = adegan(U, "luar-ringkas");
  cek(["r0-t0", "r1-t0", "r2-t0"].map((id) => isiTeks(akhirAdegan(rk, 0), id)).join() === U1.NAMA_METODE_ID.map((m, i) => `${i + 1}. ${m}`).join() && isiTeks(akhirAdegan(rk, 0), "t3") === "3 cara", "ringkasan: tiga metode");
  cek(sorot(akhirAdegan(rk, 1), "r1-k") && ada(akhirAdegan(rk, 1), "gt", "d2", "dk1"), "ringkasan: Belah Dua Kali untuk yang bisa dipotong, Dinding Pecahan untuk membandingkan");
  cek(sorot(akhirAdegan(rk, 2), "r2-k") && ada(akhirAdegan(rk, 2), "kr", "ks", "ok"), "ringkasan: Lipat dan Warnai untuk gambar, keempat bagian sama besar");
  cek(ada(akhirAdegan(rk), "pt", "v1", "v2", "tq") && isiTeks(akhirAdegan(rk), "n4") === "4 bagian", "ringkasan: pertanyaan membagi petak tanah jadi empat");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k2b5C-.*\.ts$/.test(f));
  cek(berkas.length >= 8, `berkas story k2b5C (${berkas.length})`);
  cek(!berkas.includes("k2b5C-materi-4.ts"), "k2b5C-materi-4.ts sudah dihapus");
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s), `${f}: tanpa kata buku`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k2b5C-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k2b5C (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k2b5c.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K2B5C/.test(pb) && /VIDEO_LUAR_K2B5C/.test(pb) && /export function VideoK2B5C/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿"), "video-k2b5c.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
