// Uji Story Kelas 1 Bab 8 Sub-Bab A "Kotak Cerita Berantakan" (memilah benda, turus, dan tabel), awal cerita Perpustakaan Keliling: video materi dan video metode global.
// Bagian umum sama dengan uji Bab 5; bagian khusus memeriksa mobil datang, menghitung yang masih campur (salah langkah), memilah ke rak, turus, tabel,
// paling banyak dan paling sedikit, selisih, jumlah semuanya, penutup, bilangan yang diucapkan tampak sebagai angka, naskah suara tetap,
// dan tiga metode global (Sorting Hoops, One-to-One Matching, Frequency Table).
// Jalankan: node --no-warnings scripts/uji-story-k1b8a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k1b8A-video.ts");
const U1 = await import("../src/components/modul/story/k1b8A-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K1B8A, V.VIDEO_LUAR_K1B8A];
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

/* ------------------------------ Khusus Sub-Bab A Bab 8 ------------------------------ */
const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
const M_VIDEO = V.VIDEO_MATERI_K1B8A;
const U = V.VIDEO_LUAR_K1B8A;
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

const SATUAN = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
const POLA_BIL = /\b(sebelas|(?:satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan) belas|dua belas|sepuluh|satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan)\b/g;
const nilaiBil = (m) => (m === "sebelas" ? 11 : m === "sepuluh" ? 10 : m.endsWith(" belas") ? 10 + SATUAN[m.split(" ")[0]] : SATUAN[m]);
const bilanganSuara = (s) => [...s.toLowerCase().matchAll(POLA_BIL)].map((m) => nilaiBil(m[1]));
sama(bilanganSuara("Dua belas, sebelas, sepuluh dan satu, kedua, keduanya, satuannya, berdua."), [12, 11, 10, 1], "pembaca bilangan suara");
{
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Sorting Hoops|One-to-One Matching|Frequency Table|Lingkaran Pilah|Pasangkan Satu-Satu|Tabel Frekuensi/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Sorting Hoops", "One-to-One Matching", "Frequency Table"], ["Lingkaran Pilah", "Pasangkan Satu-Satu", "Tabel Frekuensi"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Kotak Cerita Berantakan" && U.judul === M_VIDEO.judul && V.JUDUL_K1B8A === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k1b8A-materi" && U.id === "k1b8A-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,mobil-datang,hitung-campur,pilah,turus,tabel,terbanyak,selisih,jumlah,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-pilah,luar-pilah-terapan,luar-pasang,luar-pasang-terapan,luar-tabel,luar-tabel-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46) && U.adegan.every((a) => /Metode global|Ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  const TERLARANG = /\b(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan)\b/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)) && !/buku/i.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
  // Angka di gambar paling besar delapan belas.
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan)
      for (const [i] of a.ketukan.entries())
        for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 18, `${v.id}/${a.id}#${i + 1}: angka paling besar delapan belas ("${t}")`);
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
  for (const n of [3, 4, 5, 6, 10, 15, 18]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  for (const kata of ["Igil", "Kaka", "Abang", "Mamah", "Pak Pos Pustaka", "kotak cerita bergambar", "mobil pustaka", "jenis", "pilah", "turus", "tabel", "baris", "kolom", "paling banyak", "paling sedikit", "sama banyak", "selisih", "pukul empat", "dikurangi"])
    cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/Malosi/i, /\bKira\b/, /\bUpe\b/, /\bWei\b/, /Halim/i, /kebun/i, /bibit/i, /sekolah/i, /piknik/i, /kereta/i, /festival/i, /kardus/i, /akuarium/i, /lapak/i, /kambing/i, /Pak Dadang/i, /Pak RT/i, /jerami/i, /rumah pohon/i, /tiang/i, /Kakek Jaya/i, /mainan/i])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/memilah benda dan membaca tabel/.test(sapa.ketukan[0].suara) && ["Pilah menurut jenis", "Turus dan tabel", "Paling banyak, paling sedikit, selisih"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k1b8a.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  // Visual berubah mengikuti kata (paling sedikit dua titik waktu) pada hampir semua ketukan.
  let banyakTitik = 0;
  let total = 0;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) { total += 1; if (new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at))).size >= 2) banyakTitik += 1; }
  cek(banyakTitik / total >= 0.9, `visual berubah mengikuti kata pada sedikitnya 90 persen ketukan (${banyakTitik}/${total})`);
}
{
  const ACAK = ["roket", "hewan", "bunga", "laut", "hewan", "roket", "laut", "hewan", "bunga", "roket", "hewan", "laut", "roket", "hewan", "bunga", "laut", "roket", "hewan"];
  // 1. Mobil datang.
  const m = adegan(M_VIDEO, "mobil-datang");
  const m0 = akhirAdegan(m, 0);
  cek(ada(m0, "tn", "mb-b", "mb-t", "mb-k", "mb-r0", "mb-r1", "pp", "pp-tp", "ig") && isiTeks(m0, "mb-s") === "PUSTAKA" && isiTeks(m0, "pp-n") === "Pak Pos", "mobil: mobil pustaka bak hijau berterpal, Pak Pos, dan Igil");
  cek(ketemu(L.keadaanStory(m, 0, L.posisiKata(m.ketukan[0].suara, "berlari")), "ig").x < ketemu(m0, "ig").x, "mobil: Igil berlari menyambut");
  const m1 = akhirAdegan(m, 1);
  cek(ada(m1, "lb") && [...Array(9).keys()].every((i) => ada(m1, `bs${i}`)), "mobil: lubang jalan dan kotak tumpah bercampur");
  const m2 = akhirAdegan(m);
  cek(ada(m2, "jm", "jm-m", "jm-j") && isiTeks(m2, "j4-t0") === "jam 4" && ada(m2, "lp-k"), "mobil: jam hampir pukul empat dan laporan banyak kotak tiap jenis");
  // 2. Hitung campur.
  const c = adegan(M_VIDEO, "hitung-campur");
  const c0 = akhirAdegan(c, 0);
  cek([...Array(12).keys()].every((i) => ada(c0, `c${i}`, `c${i}-e`)) && ketemu(c0, "c3").warna === "#FDE047" && isiTeks(c0, "dd-t0") === "terhitung 2 kali" && ada(c0, "jr"), "campur: dua belas kotak menumpuk, satu kuning terhitung dua kali");
  const c1 = akhirAdegan(c, 1);
  cek(ada(c1, "kk", "sl") && isiTeks(c1, "at-t0") === "pisahkan dulu" && tidakAda(c1, "dd-k"), "campur: Kaka menggeleng, pisahkan dulu");
  const c2 = akhirAdegan(c);
  const gugus = (jenis) => [...Array(12).keys()].filter((i) => ACAK[i] === jenis).map((i) => ketemu(c2, `c${i}`));
  cek(["hewan", "laut", "roket", "bunga"].every((j) => { const g = gugus(j); return g.every((b) => b.y >= 50 && Math.abs(b.x - g[0].x) <= 24 && Math.abs(b.y - g[0].y) <= 24); }) && ada(c2, "mm", "tn2") && isiTeks(c2, "dk-t0") === "tidak terhitung 2 kali", "campur: yang sejenis berkumpul, Mamah bertanya");
  // 3. Pilah.
  const p = adegan(M_VIDEO, "pilah");
  const p0 = akhirAdegan(p, 0);
  cek(ada(p0, "rk-b", "rk-s1", "rk-s2", "rk-s3") && [...Array(18).keys()].every((i) => ada(p0, `b${i}`, `b${i}-e`)), "pilah: rak empat petak dan delapan belas kotak");
  const jenisDi = ["hewan", "laut", "roket", "bunga"];
  const kotakJenis = (objs, j) => [...Array(18).keys()].filter((i) => ACAK[i] === jenisDi[j]).map((i) => ketemu(objs, `b${i}`));
  const dalamRak = (b, j) => b.x >= 14 + 68 * j && b.x <= 14 + 68 * (j + 1) && b.y >= 28 && b.y <= 112;
  cek(kotakJenis(p0, 0).every((b) => dalamRak(b, 0)) && kotakJenis(p0, 1).every((b) => dalamRak(b, 1)) && kotakJenis(p0, 2).every((b) => b.y > 128), "pilah: hewan ke petak pertama, laut ke petak kedua, yang lain belum");
  const p1 = akhirAdegan(p, 1);
  cek([0, 1, 2, 3].every((j) => kotakJenis(p1, j).every((b) => dalamRak(b, j))) && [6, 4, 5, 3].every((n, j) => kotakJenis(p1, j).length === n), "pilah: roket dan bunga masuk, setiap petak satu jenis dengan banyak 6, 4, 5, 3");
  const p2 = akhirAdegan(p);
  cek(isiTeks(p2, "sj-t0") === "1 rak = 1 jenis" && [6, 4, 5, 3].every((n, j) => isiTeks(p2, `nb${j}`) === String(n)), "pilah: satu rak satu jenis, banyaknya enam, empat, lima, tiga");
  // 4. Turus.
  const t = adegan(M_VIDEO, "turus");
  const t0 = akhirAdegan(t, 0);
  cek(isiTeks(t0, "n0") === "1" && ada(t0, "t00") && tidakAda(t0, "t01") && ada(t0, "pk", "ab"), "turus: satu kotak satu goresan di papan kapur");
  const t1 = akhirAdegan(t, 1);
  cek(["t00", "t01", "t02", "t03", "t04", "t05"].every((id) => ada(t1, id)) && isiTeks(t1, "n0") === "6" && ketemu(t1, "t04").y2 < 0 && ketemu(t1, "t03").y2 > 0, "turus: lima goresan dicoret miring, hewan ada enam");
  const t2 = akhirAdegan(t);
  cek(jumlahId(t2, "t1") === 4 && ["t10", "t13"].every((id) => ada(t2, id)) && jumlahId(t2, "t2") === 5 && ["t20", "t24"].every((id) => ada(t2, id)) && jumlahId(t2, "t3") === 3 && tidakAda(t2, "t14", "t33"), "turus: laut empat, roket lima (dicoret miring), bunga tiga");
  cek(["n1", "n2", "n3"].map((id) => isiTeks(t2, id)).join() === "4,5,3", "turus: banyaknya tertulis empat, lima, tiga");
  // 5. Tabel.
  const b = adegan(M_VIDEO, "tabel");
  const b0 = akhirAdegan(b, 0);
  cek(isiTeks(b0, "tb-jd") === "Kotak Cerita Bergambar" && isiTeks(b0, "tb-h0t") === "Jenis" && isiTeks(b0, "tb-h1t") === "Banyak" && [6, 4, 5, 3].every((n, i) => isiTeks(b0, `tb-r${i}bt`) === String(n)) && ["Hewan", "Laut", "Roket", "Bunga"].every((j, i) => isiTeks(b0, `tb-r${i}at`) === j), "tabel: judul, kepala, empat baris menurun");
  const b1 = akhirAdegan(b, 1);
  cek(isiTeks(b1, "lbr") === "baris" && isiTeks(b1, "lkl") === "kolom" && ada(b1, "pb", "pk", "jr", "ab", "bs", "bn") && sorot(b1, "tb-r0a", "tb-h1", "tb-r3b"), "tabel: garis ke samping baris, ke bawah kolom, jari Igil ke hidung Abang, Abang bersin");
  cek(ketemu(L.keadaanStory(b, 1, L.posisiKata(b.ketukan[1].suara, "menyusuri")), "jr").x === 200 && ketemu(L.keadaanStory(b, 1, 9999), "jr").x === 228, "tabel: jari bergerak menyusuri baris");
  const b2 = akhirAdegan(b);
  cek(tidakAda(b2, "tb-r0a", "pb", "pk", "jr") && ada(b2, "tm-jd", "tm-c0a", "tm-c3b") && [6, 4, 5, 3].every((n, i) => isiTeks(b2, `tm-c${i}bt`) === String(n)) && isiTeks(b2, "sb-t0") === "isi sama, bentuk berbeda", "tabel: diputar menjadi mendatar, isinya sama");
  // 6. Terbanyak.
  const q = adegan(M_VIDEO, "terbanyak");
  const q1 = akhirAdegan(q, 1);
  cek(sorot(q1, "tq-r0a", "tq-r3b") && ketemu(q1, "tq-r0a").warna === "#FCA5A5" && ketemu(q1, "tq-r3a").warna === "#93C5FD" && isiTeks(q1, "h1-t0") === "paling banyak: Hewan" && isiTeks(q1, "h2-t0") === "paling sedikit: Bunga", "terbanyak: hewan paling banyak (merah), bunga paling sedikit (biru)");
  const q2 = akhirAdegan(q);
  cek(sorot(q2, "tq-r2a") && ada(q2, "by") && isiTeks(q2, "p1") === "+1" && isiTeks(q2, "sm-t0") === "roket sama banyak dengan hewan" && !ketemu(q2, "tq-r0a").sorot, "terbanyak: roket kurang satu menjadi sama banyak dengan hewan");
  // 7. Selisih.
  const s = adegan(M_VIDEO, "selisih");
  const s0 = akhirAdegan(s, 0);
  cek(jumlahId(s0, "sh") === 12 && jumlahId(s0, "sg") === 6 && ada(s0, "pr0") && tidakAda(s0, "pr1") && isiTeks(s0, "p1k-t0") === "1 pasang", "selisih: enam kotak hewan, tiga bunga, satu pasangan");
  const s1 = akhirAdegan(s, 1);
  cek(ada(s1, "pr0", "pr1", "pr2") && sorot(s1, "sh3", "sh4", "sh5") && !sorot(s1, "sh0") && isiTeks(s1, "t3") === "3" && isiTeks(s1, "sl-t0") === "selisih", "selisih: tiga kotak hewan tanpa pasangan disorot");
  const s2 = akhirAdegan(s);
  cek(["k6", "km", "k3", "ks", "kh"].map((id) => isiTeks(s2, id)).join(" ") === "6 – 3 = 3" && isiTeks(s2, "lb-t0") === "hewan lebih 3", "selisih: kalimat 6 - 3 = 3");
  // 8. Jumlah.
  const j = adegan(M_VIDEO, "jumlah");
  const j0 = akhirAdegan(j, 0);
  cek([6, 4, 5, 3].every((n, i) => isiTeks(j0, `ns${i}`) === String(n)) && ada(j0, "pp", "tn", "pj"), "jumlah: Pak Pos bertanya, empat bilangan di papan");
  const j1 = akhirAdegan(j, 1);
  const baris = (b2) => [0, 1, 2, 3, 4].map((i) => isiTeks(j1, `kj${b2 * 5 + i}`)).join(" ");
  cek(baris(0) === "6 + 4 = 10" && baris(1) === "10 + 5 = 15" && baris(2) === "15 + 3 = 18", "jumlah: jumlah berjalan 10, 15, 18");
  const j2 = akhirAdegan(j);
  cek(isiTeks(j2, "k18-t0") === "18 kotak" && isiTeks(j2, "j4-t0") === "jam 4" && ada(j2, "jm", "jp", "pp"), "jumlah: delapan belas kotak, jam empat, jempol Pak Pos");
  // 9. Penutup.
  const n = adegan(M_VIDEO, "penutup");
  const n0 = akhirAdegan(n, 0);
  cek(ada(n0, "mb-b", "rk-b", "a1", "a2", "a3") && ketemu(n0, "mb-t").y === 92 && jumlahId(n0, "rr") === 24, "penutup: mobil dibuka, rak rapi, anak-anak kampung");
  const n1 = akhirAdegan(n, 1);
  cek(["r1-t0", "r2-t0", "r3-t0", "r4-t0"].map((id) => isiTeks(n1, id)).join() === "1. Pilah menurut jenis,2. Hitung dengan turus,3. Tulis di tabel,4. Bandingkan", "penutup: ringkasan empat langkah");
  const n2 = akhirAdegan(n);
  cek(isiTeks(n2, "cq-t0") === "cerita mana paling disukai?" && ada(n2, "pp", "ig", "kk", "kk-pita", "ab", "mm", "l1", "l4"), "penutup: pertanyaan cerita mana yang paling disukai, empat tokoh melambai");
}
{
  // Pembuka metode global.
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "kl", "kk0", "kk2", "ig") && isiTeks(akhirAdegan(op, 0), "tk-t0") === "3 kartu", "global pembuka: kotak kartu peminjam, tiga kartu terselip");
  cek(ada(akhirAdegan(op, 1), "pp", "tw"), "global pembuka: Pak Pos tertawa");
  sama(["m0-t0", "m1-t0", "m2-t0"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Sorting Hoops", "2. One-to-One Matching", "3. Frequency Table"], "global pembuka: tiga nama metode");
  sama(["n0-t0", "n1-t0", "n2-t0"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["1. Lingkaran Pilah", "2. Pasangkan Satu-Satu", "3. Tabel Frekuensi"], "global pembuka: tiga nama bahasa Indonesia");
  // Sorting Hoops.
  const h = adegan(U, "luar-pilah");
  const h0 = akhirAdegan(h, 0);
  cek([...Array(9).keys()].every((i) => ada(h0, `bd${i}`)) && isiTeks(h0, "lc-t0") === "Lingkaran Pilah", "Sorting Hoops: sembilan benda berserakan");
  const h1 = akhirAdegan(h, 1);
  cek(ada(h1, "ln0", "ln1", "ln2") && ["jenis 1", "jenis 2", "jenis 3"].every((x, i) => isiTeks(h1, `jn${i}`) === x), "Sorting Hoops: satu lingkaran satu jenis");
  const h2 = akhirAdegan(h, 2);
  const di = (id, l) => Math.hypot(ketemu(h2, id).x - ketemu(h2, `ln${l}`).x, ketemu(h2, id).y - ketemu(h2, `ln${l}`).y) < 30;
  cek([0, 1, 2, 3].every((i) => di(`bd${i}`, 0)) && [4, 5, 6].every((i) => di(`bd${i}`, 1)) && [7, 8].every((i) => di(`bd${i}`, 2)), "Sorting Hoops: tiap benda masuk lingkaran jenisnya");
  cek(["hc0", "hc1", "hc2"].map((id) => isiTeks(akhirAdegan(h), id)).join() === "4,3,2", "Sorting Hoops: isi tiap lingkaran dihitung");
  const ht = adegan(U, "luar-pilah-terapan");
  const i0 = akhirAdegan(ht, 0);
  cek([["st0", 5], ["st1", 3], ["st2", 2]].every(([a, n]) => jumlahId(i0, a) === n) && ["sc0", "sc1", "sc2"].map((id) => isiTeks(i0, id)).join() === "5,3,2" && isiTeks(i0, "l3-t0") === "3 lingkaran" && ada(i0, "ab"), "Sorting Hoops terapan: bintang lima, hati tiga, bulat dua");
  cek(isiTeks(akhirAdegan(ht, 1), "sp-t0") === "10 stempel" && sorot(akhirAdegan(ht, 1), "ln0") && isiTeks(akhirAdegan(ht, 1), "pb") === "paling banyak", "Sorting Hoops terapan: sepuluh stempel, bintang paling banyak");
  cek(ada(akhirAdegan(ht, 2), "ok") && isiTeks(akhirAdegan(ht, 2), "kc-t0") === "kecil, bisa dipindah", "Sorting Hoops terapan: cocok untuk benda kecil");
  cek(ada(akhirAdegan(ht, 3), "ph", "sl") && isiTeks(akhirAdegan(ht, 3), "hl") === "pohon di halaman", "Sorting Hoops terapan: pohon tidak bisa dipindahkan");
  // One-to-One Matching.
  const pc = adegan(U, "luar-pasang");
  cek(ada(akhirAdegan(pc, 0), "jb") && isiTeks(akhirAdegan(pc, 0), "kp-t0") === "1 benda : 1 benda", "One-to-One Matching: satu benda satu benda");
  const e1 = akhirAdegan(pc, 1);
  cek(jumlahId(e1, "pa") === 5 && jumlahId(e1, "pb") === 3 && ada(e1, "pr0") && isiTeks(e1, "k11-t0") === "1 : 1", "One-to-One Matching: dua jenis, satu pasangan pertama");
  const e2 = akhirAdegan(pc, 2);
  cek(ada(e2, "pr0", "pr1", "pr2", "q3", "q4") && sorot(e2, "pa3", "pa4") && isiTeks(e2, "sl-t0") === "selisih", "One-to-One Matching: dua benda tanpa pasangan menunjukkan selisih");
  cek(isiTeks(akhirAdegan(pc), "tm-t0") === "tanpa menghitung" && ada(akhirAdegan(pc), "no"), "One-to-One Matching: tanpa menghitung");
  const pt = adegan(U, "luar-pasang-terapan");
  const f0 = akhirAdegan(pt, 0);
  cek(jumlahId(f0, "pm") === 5 && jumlahId(f0, "pn") === 8 && isiTeks(f0, "c5") === "5" && isiTeks(f0, "c8") === "8" && ada(f0, "kk"), "pasang terapan: lima pita merah dan delapan pita biru");
  const f1 = akhirAdegan(pt, 1);
  cek(jumlahId(f1, "pr") === 5 && sorot(f1, "pn5", "pn6", "pn7") && isiTeks(f1, "c3") === "3" && isiTeks(f1, "bl-t0") === "biru lebih banyak 3", "pasang terapan: tiga pita biru tanpa pasangan");
  cek(isiTeks(akhirAdegan(pt, 2), "d2-t0") === "2 jenis" && ada(akhirAdegan(pt, 2), "ok", "kl"), "pasang terapan: cocok untuk dua jenis dan cepat");
  cek(ada(akhirAdegan(pt, 3), "bm00", "bm33", "bl00", "no") && jumlahId(akhirAdegan(pt, 3), "bm") === 16, "pasang terapan: banyak jenis harus memasangkan berkali-kali");
  // Frequency Table.
  const tc = adegan(U, "luar-tabel");
  cek(ada(akhirAdegan(tc, 0), "ft-h0", "ft-h2", "ft-r2c", "gf") && isiTeks(akhirAdegan(tc, 0), "ft-h1t") === "Goresan", "Frequency Table: tabel kosong berkepala Jenis, Goresan, Banyak");
  cek(isiTeks(akhirAdegan(tc, 1), "fr-t1") === "seberapa sering" && ada(akhirAdegan(tc, 1), "lp"), "Frequency Table: frekuensi artinya seberapa sering");
  const k3 = akhirAdegan(tc, 2);
  cek(["Jenis A", "Jenis B", "Jenis C"].every((x, r) => isiTeks(k3, `ft-r${r}at`) === x) && jumlahId(k3, "ft-g0") === 4 && jumlahId(k3, "ft-g1") === 2 && jumlahId(k3, "ft-g2") === 3 && isiTeks(k3, "sg-t0") === "1 muncul", "Frequency Table: satu goresan tiap yang muncul");
  const k4 = akhirAdegan(tc);
  cek(["ft-r0ct", "ft-r1ct", "ft-r2ct"].map((id) => isiTeks(k4, id)).join() === "4,2,3" && sorot(k4, "ft-h2", "ft-r1c"), "Frequency Table: goresan dihitung, banyaknya di kolom sebelah");
  const tt = adegan(U, "luar-tabel-terapan");
  const u0 = akhirAdegan(tt, 0);
  cek(["Senin", "Selasa", "Rabu", "Kamis"].every((x, r) => isiTeks(u0, `fu-r${r}at`) === x) && ["fu-r0ct", "fu-r1ct", "fu-r2ct", "fu-r3ct"].map((id) => isiTeks(u0, id)).join() === "4,2,6,3" && ada(u0, "pp"), "tabel terapan: Senin empat, Selasa dua, Rabu enam, Kamis tiga");
  cek(sorot(akhirAdegan(tt, 1), "fu-r2a") && isiTeks(akhirAdegan(tt, 1), "sm-t1") === "15 anak", "tabel terapan: Rabu paling banyak, semuanya lima belas");
  cek(ada(akhirAdegan(tt, 2), "ok", "kal") && isiTeks(akhirAdegan(tt, 2), "ds-t0") === "banyak jenis, disimpan", "tabel terapan: cocok untuk banyak jenis dan disimpan");
  cek(isiTeks(akhirAdegan(tt, 3), "d2-t0") === "2 jenis" && ada(akhirAdegan(tt, 3), "no", "kl", "up0", "ua3", "ub1"), "tabel terapan: dua jenis cukup dipasangkan");
  // Ringkasan.
  const rk = adegan(U, "luar-ringkas");
  cek(["r0-t0", "r1-t0", "r2-t0"].map((id) => isiTeks(akhirAdegan(rk, 0), id)).join() === U1.NAMA_METODE.map((m, i) => `${i + 1}. ${m}`).join() && isiTeks(akhirAdegan(rk, 0), "t3") === "3 cara", "ringkasan: tiga metode");
  cek(isiTeks(akhirAdegan(rk, 1), "q0-t1") === "Lingkaran Pilah" && isiTeks(akhirAdegan(rk, 1), "q1-t1") === "Pasangkan Satu-Satu (1:1)" && isiTeks(akhirAdegan(rk, 2), "q2-t1") === "Tabel Frekuensi", "ringkasan: pilih cara menurut bendanya");
  cek(ada(akhirAdegan(rk), "kal", "qq", "pc0-k", "pc2-k"), "ringkasan: pertanyaan mencatat peminjam sebulan");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k1b8A-.*\.ts$/.test(f));
  cek(berkas.length >= 8, `berkas story k1b8A (${berkas.length})`);
  cek(!berkas.includes("k1b8A-materi-4.ts"), "k1b8A-materi-4.ts sudah dihapus");
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s), `${f}: tanpa kata buku`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k1b1a-[a-z0-9-]+|k1b4a-gambar|k1b8A-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, k1b1a, k1b4a-gambar, atau k1b8A (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k1b8a.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K1B8A/.test(pb) && /VIDEO_LUAR_K1B8A/.test(pb) && /export function VideoK1B8A/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿"), "video-k1b8a.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
