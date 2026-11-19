// Uji Story Kelas 3 Bab 1 Sub-Bab E "Sisa Stok Pak Anto" (pengurangan sampai seratus): video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k3b1E.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k3b1E-video.ts");
const U1 = await import("../src/components/modul/story/k3b1E-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K3B1E, V.VIDEO_LUAR_K3B1E];
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
      cek(kata.length >= 3 && kata.length <= 40, `${nama}#${i + 1}: 3 sampai 40 kata (ada ${kata.length})`);
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




/* ------------------------------ Khusus Sub-Bab E Kelas 3 Bab 1 ------------------------------ */
const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
const M_VIDEO = V.VIDEO_MATERI_K3B1E;
const U = V.VIDEO_LUAR_K3B1E;
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
sama(bilanganSuara("Enam puluh delapan dikurangi tiga puluh lima; satu, dua belas, kedua."), [68, 35, 12, 1], "pembaca bilangan suara: puluhan, belasan, satuan");
const angkaTampak = (objs) => {
  const s = new Set();
  for (const o of objs) if (o.t === "teks" && (o.op ?? 1) > 0 && o.isi) for (const m of o.isi.matchAll(/\d+/g)) s.add(Number(m[0]));
  return s;
};
{
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Standard Subtraction|Counting Up|Regrouping|Pengurangan Bersusun|Menghitung Naik|Pinjam Puluhan/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Standard Subtraction", "Counting Up", "Regrouping"], ["Pengurangan Bersusun", "Menghitung Naik", "Pinjam Puluhan"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Sisa Stok Pak Anto" && U.judul === M_VIDEO.judul && V.JUDUL_K3B1E === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k3b1E-materi" && U.id === "k3b1E-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,rak-mi,susun-kurang,susun-panjang-kurang,salah-balik,pinjam-puluhan,periksa-tambah,soal-cerita-kurang,kurang-sama,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-susun,luar-susun-terapan,luar-naik,luar-naik-terapan,luar-pinjam,luar-pinjam-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|persoalan|tebak|kunci|latihan|ditemani)/i;
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
  for (const n of [1, 3, 5, 8, 10, 11, 24, 28, 33, 35, 36, 43, 54, 57, 68, 71, 85, 90]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [2, 3, 4, 6, 10, 12, 36, 53, 62, 76, 82, 89, 99]) cek(bilanganSuara(semuaLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Raka", "Salsa", "Bima", "Pak Joko", "Pak Anto", "Bu Mirna", "mi instan", "susun pendek", "susun panjang", "meminjam", "penjumlahan", "kaleng susu", "sisa", "satuan", "puluhan", "kardus"])
    cek(M_VIDEO.adegan.some((a) => a.ketukan.some((kt) => kt.suara.toLowerCase().includes(kata.toLowerCase()))), `video materi memuat "${kata}"`);
  for (const pola of [/Igil/, /Kaka/, /Abang/, /Mamah/, /Pak Pos/i, /rumah rapi/i, /bibit/i, /kereta/i, /festival/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /pustaka/i, /perpustakaan/i, /kantin/i, /koperasi/i, /seragam/i, /\bChacha\b/, /\bDika\b/, /\bNia\b/, /Bu Sari/, /ubin/i, /taman bermain/i, /puzzle/i, /pameran/i, /semangka/i, /kebun/i, /lapangan/i, /Pak Dodi/, /Bu Tuti/, /Kak Dewi/, /Bu Wati/, /Nenek Ijah/, /bank sampah/i, /angklung/i, /Galih/, /Alfa/, /Pak Bandi/])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  // Naskah tetap memuat 356 kata (2,97 menit pada 120 kata per menit). Suara perangkat laju 0.7 lebih lambat dari itu, jadi video lebih dari tiga menit; batas di sini 2,9 menit.
  cek(kataVideo(U) / 120 > 2.9, `durasi video global sekitar tiga menit (${(kataVideo(U) / 120).toFixed(2)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/pengurangan sampai seratus/.test(sapa.ketukan[0].suara) && ["Mengurang dengan susun pendek dan susun panjang", "Meminjam satu puluhan", "Memeriksa dengan penjumlahan"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  const naskah = readFileSync(new URL("../naskah/story-naskah-k3b1e.md", import.meta.url), "utf8");
  const kutipNaskah = [...naskah.matchAll(/^\s*- "(.*)"\s*$/gm)].map((m) => m[1].replace(/\s+/g, " "));
  cek(kutipNaskah.length === 59, `naskah memuat 59 ketukan (${kutipNaskah.length})`);
  const dipakai = new Set();
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan)
      if (a.id !== "sapaan")
        for (const kt of a.ketukan) {
          const s = kt.suara.replace(/\s+/g, " ");
          cek(kutipNaskah.includes(s), `${v.id}/${a.id}: suara sama persis dengan naskah tetap ("${kt.suara.slice(0, 40)}")`);
          dipakai.add(s);
        }
  cek(kutipNaskah.every((s) => dipakai.has(s)), "semua ketukan naskah tetap dipakai");
  let banyakTitik = 0;
  let total = 0;
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan)
      if (a.id !== "sapaan")
        for (const kt of a.ketukan) {
          total += 1;
          if (new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at))).size >= 2) banyakTitik += 1;
        }
  cek(banyakTitik / total >= 0.9, `visual berubah mengikuti kata pada sedikitnya 90 persen ketukan (${banyakTitik}/${total})`);
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") cek(akhirAdegan(a).some((o) => o.t !== "teks"), `${v.id}/${a.id}: gambar akhir memuat bentuk gambar sendiri, bukan hanya teks`);
}
{
  const rm = adegan(M_VIDEO, "rak-mi");
  cek(ada(akhirAdegan(rm, 0), "tk", "tk-v", "tk-l", "pa", "pa-kj", "pa-ts", "rk", "rk-s1", "rk-s3", "pj", "pj-ap", "pj-km", "pj-pn"), "rak mi: toko, Pak Anto berkemeja kotak-kotak bertas, rak kayu, Pak Joko berapron");
  cek(isiTeks(akhirAdegan(rm, 1), "pn-t1") === "68" && isiTeks(akhirAdegan(rm, 1), "tj-t1") === "35" && ada(akhirAdegan(rm, 1), "kd0", "kd5", "bg0", "bg7") && !ketemu(akhirAdegan(rm, 1), "kd6") && !ketemu(akhirAdegan(rm, 1), "bg8"), "rak mi: enam kardus dan delapan bungkus, terjual 35");
  cek(ada(akhirAdegan(rm, 2), "tz", "ct", "tr", "kb"), "rak mi: sisa ditanyakan, catatan, troli kardus baru");
  const sk = adegan(M_VIDEO, "susun-kurang");
  cek(isiTeks(akhirAdegan(sk, 0), "sn-a") === "68" && isiTeks(akhirAdegan(sk, 0), "sn-b") === "35" && ada(akhirAdegan(sk, 0), "pk", "sn-m", "sn-g", "cp", "cs"), "susun pendek: 68 dan 35 bersusun, kolom puluhan dan satuan");
  cek(isiTeks(akhirAdegan(sk, 1), "k1-t0") === "8 - 5 = 3" && isiTeks(akhirAdegan(sk, 1), "hs") === "3", "susun pendek: satuan 8 - 5 = 3");
  cek(isiTeks(akhirAdegan(sk, 2), "k2-t0") === "6 - 3 = 3" && isiTeks(akhirAdegan(sk, 2), "hs") === "33" && isiTeks(akhirAdegan(sk, 2), "k3-t0") === "33 bungkus", "susun pendek: puluhan 6 - 3 = 3, sisa 33");
  const sp = adegan(M_VIDEO, "susun-panjang-kurang");
  cek(ada(akhirAdegan(sp, 0), "ct", "sl", "sl-kp1", "sl-ct") && isiTeks(akhirAdegan(sp, 0), "u1") === "68 = 60 + 8" && isiTeks(akhirAdegan(sp, 0), "u2") === "35 = 30 + 5", "susun panjang: Salsa berkepang dan kertas catatan, uraian 68 dan 35");
  cek(isiTeks(akhirAdegan(sp, 1), "h1") === "60 - 30 = 30" && isiTeks(akhirAdegan(sp, 1), "h2") === "8 - 5 = 3", "susun panjang: 60 - 30 dan 8 - 5");
  cek(isiTeks(akhirAdegan(sp, 2), "gh") === "30 + 3 = 33" && isiTeks(akhirAdegan(sp, 2), "ps-t0") === "33" && !ketemu(akhirAdegan(sp, 2), "ok1"), "susun panjang: 30 + 3 = 33 cocok dengan susun pendek");
  const sb = adegan(M_VIDEO, "salah-balik");
  cek(isiTeks(akhirAdegan(sb, 0), "sn-a") === "71" && isiTeks(akhirAdegan(sb, 0), "sn-b") === "28" && isiTeks(akhirAdegan(sb, 0), "k1-t0") === "8 - 1 = 7" && isiTeks(akhirAdegan(sb, 0), "hs") === "57" && ada(akhirAdegan(sb, 0), "rk", "rk-bj"), "salah balik: Raka membalik 1 - 8 menjadi 8 - 1, menulis 57");
  cek(ada(akhirAdegan(sb, 1), "kk0", "kk3", "kk0-c", "ll", "tg"), "salah balik: taruhan, kardus kosong menjulang");
  cek(ada(akhirAdegan(sb, 2), "bm", "bm-bj", "k4-k", "pn", "k5-k") && !ketemu(akhirAdegan(sb, 2), "k1-k"), "salah balik: Bima menunjuk satuan 1 kurang dari 8, harus meminjam");
  const pp = adegan(M_VIDEO, "pinjam-puluhan");
  cek(ada(akhirAdegan(pp, 0), "p7", "c7", "p6", "bt", "pb", "bu0", "bu9") && !ketemu(akhirAdegan(pp, 0), "bu10") && isiTeks(akhirAdegan(pp, 0), "lb2") === "10 satuan" && isiTeks(akhirAdegan(pp, 0), "p1") === "1", "pinjam puluhan: 7 dicoret jadi 6, batang menjadi sepuluh butir");
  cek(isiTeks(akhirAdegan(pp, 1), "p1") === "11" && isiTeks(akhirAdegan(pp, 1), "k2-t0") === "11 - 8 = 3" && isiTeks(akhirAdegan(pp, 1), "hs") === "3", "pinjam puluhan: satuan jadi 11, 11 - 8 = 3");
  cek(isiTeks(akhirAdegan(pp, 2), "k3-t0") === "6 - 2 = 4" && isiTeks(akhirAdegan(pp, 2), "hs") === "43" && isiTeks(akhirAdegan(pp, 2), "k4-t0") === "43 bungkus" && !ketemu(akhirAdegan(pp, 2), "bt"), "pinjam puluhan: 6 - 2 = 4, sisa 43");
  const pt = adegan(M_VIDEO, "periksa-tambah");
  cek(ada(akhirAdegan(pt, 0), "sl", "sl-ct") && isiTeks(akhirAdegan(pt, 0), "sn-a") === "43" && isiTeks(akhirAdegan(pt, 0), "sn-b") === "28" && isiTeks(akhirAdegan(pt, 0), "k1-t0") === "kembali ke 71", "periksa: 43 + 28 harus kembali ke 71");
  cek(isiTeks(akhirAdegan(pt, 1), "k2-t0") === "3 + 8 = 11" && isiTeks(akhirAdegan(pt, 1), "k3-t0") === "4 + 2 + 1 = 7" && isiTeks(akhirAdegan(pt, 1), "hs") === "71" && ada(akhirAdegan(pt, 1), "cr", "ok"), "periksa: 3 + 8 = 11 simpan 1, 4 + 2 + 1 = 7, 71");
  cek(isiTeks(akhirAdegan(pt, 2), "sn-a") === "57" && isiTeks(akhirAdegan(pt, 2), "hs") === "85" && isiTeks(akhirAdegan(pt, 2), "k4-t0") === "85 bukan 71" && ada(akhirAdegan(pt, 2), "rk", "x1"), "periksa: jawaban Raka 57 + 28 = 85 salah");
  const sc = adegan(M_VIDEO, "soal-cerita-kurang");
  cek(ada(akhirAdegan(sc, 0), "rk", "kl0", "kl8", "tr", "pa") && !ketemu(akhirAdegan(sc, 0), "kl9") && isiTeks(akhirAdegan(sc, 0), "ga-t0") === "Ada 90" && isiTeks(akhirAdegan(sc, 0), "kr-t0") === "Kirim 54", "cerita pengurangan: sembilan kaleng susu di rak, dikirim 54 dengan troli");
  cek(isiTeks(akhirAdegan(sc, 1), "ka-t0") === "0 - 4 = ?" && isiTeks(akhirAdegan(sc, 1), "kc-t0") === "10 - 4 = 6" && isiTeks(akhirAdegan(sc, 1), "hs") === "6" && ada(akhirAdegan(sc, 1), "kb-k", "x1"), "cerita pengurangan: 0 - 4 tidak bisa, pinjam, 10 - 4 = 6");
  cek(isiTeks(akhirAdegan(sc, 2), "kd-t0") === "8 - 5 = 3" && isiTeks(akhirAdegan(sc, 2), "hs") === "36" && isiTeks(akhirAdegan(sc, 2), "ke-t0") === "36 kaleng" && !ketemu(akhirAdegan(sc, 2), "ka-k"), "cerita pengurangan: 8 - 5 = 3, sisa 36 kaleng");
  const ks = adegan(M_VIDEO, "kurang-sama");
  cek(isiTeks(akhirAdegan(ks, 0), "ad-t1") === "24" && isiTeks(akhirAdegan(ks, 0), "tj-t1") === "24" && ada(akhirAdegan(ks, 0), "rk", "kd1", "bg3") && !ketemu(akhirAdegan(ks, 0), "kd2"), "hasil nol: ada 24, terjual 24, rak hampir kosong");
  cek(isiTeks(akhirAdegan(ks, 1), "e1") === "24" && isiTeks(akhirAdegan(ks, 1), "e3") === "24" && isiTeks(akhirAdegan(ks, 1), "e5") === "0" && ada(akhirAdegan(ks, 1), "e2", "e4"), "hasil nol: 24 - 24 = 0");
  cek(ada(akhirAdegan(ks, 2), "pa", "ct", "ko", "tr", "kb", "kl") && isiTeks(akhirAdegan(ks, 2), "ko") === "0", "hasil nol: Pak Anto mencatat sisa stok dan mengirim mi baru");
  const pn = adegan(M_VIDEO, "penutup");
  cek(ada(akhirAdegan(pn, 0), "rk", "kt0", "kt5", "kt5-c", "lh"), "penutup: Raka menata kardus kosong");
  cek(ada(akhirAdegan(pn, 1), "pt", "bm", "bm-cp", "bm-kr", "tl", "lb"), "penutup: Bu Mirna bercaping membawa keranjang telur di pintu");
  cek(ada(akhirAdegan(pn, 2), "rk", "sl", "bi", "pj", "pa", "bm", "lm") && !ketemu(akhirAdegan(pn, 2), "kt0"), "penutup: lima tokoh melambai");
  // Metode global.
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "mj", "ms", "lc", "bm", "c0-k", "c2-k") && isiTeks(akhirAdegan(op, 0), "n3") === "3 catatan", "global pembuka: Bima menemukan tiga catatan lama di laci kasir");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Standard Subtraction", "2. Counting Up", "3. Regrouping"], "global pembuka: tiga nama metode");
  sama(["q0", "q1", "q2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Pengurangan Bersusun", "Menghitung Naik", "Pinjam Puluhan"], "global pembuka: tiga nama bahasa Indonesia");
  const su = adegan(U, "luar-susun");
  cek(isiTeks(akhirAdegan(su, 0), "nm-t0") === "Standard Subtraction" && isiTeks(akhirAdegan(su, 1), "sn-a") === "47" && ada(akhirAdegan(su, 1), "cp", "cs", "kp-k", "ks-k"), "Standard Subtraction konsep: nama, susunan, puluhan dan satuan lurus");
  cek(ada(akhirAdegan(su, 2), "n1", "n2", "pn") && ada(akhirAdegan(su, 3), "hs", "ok"), "Standard Subtraction konsep: satuan dulu lalu puluhan, hasil sisa");
  const st = adegan(U, "luar-susun-terapan");
  cek(isiTeks(akhirAdegan(st, 0), "sn-a") === "89" && isiTeks(akhirAdegan(st, 0), "sn-b") === "53" && isiTeks(akhirAdegan(st, 0), "k1-t0") === "9 - 3 = 6" && isiTeks(akhirAdegan(st, 0), "k2-t0") === "8 - 5 = 3" && ada(akhirAdegan(st, 0), "rk"), "Standard Subtraction terapan: Raka 89 - 53");
  cek(isiTeks(akhirAdegan(st, 1), "hs") === "36" && ada(akhirAdegan(st, 2), "cc-k", "c1", "c2") && ada(akhirAdegan(st, 3), "kc-k", "x1", "pj", "kj-k"), "Standard Subtraction terapan: sisa 36, cocok dan kurang cocok");
  const nk = adegan(U, "luar-naik");
  cek(isiTeks(akhirAdegan(nk, 0), "nm-t0") === "Counting Up" && ada(akhirAdegan(nk, 1), "gl", "t1", "t2", "p1") && isiTeks(akhirAdegan(nk, 2), "kj-t0") === "jumlah = selisih" && ada(akhirAdegan(nk, 3), "gd", "d1", "d2", "kt"), "Counting Up konsep: nama, naik dari kecil ke besar, jumlah langkah, dekat");
  const nt = adegan(U, "luar-naik-terapan");
  cek(isiTeks(akhirAdegan(nt, 0), "sk-t0") === "82 - 76" && isiTeks(akhirAdegan(nt, 0), "p4") === "+4" && isiTeks(akhirAdegan(nt, 0), "p2") === "+2" && ["l76", "l80", "l82"].map((id) => isiTeks(akhirAdegan(nt, 0), id)).join() === "76,80,82" && ada(akhirAdegan(nt, 0), "sl"), "Counting Up terapan: Salsa naik 4 ke 80 lalu 2 ke 82");
  cek(isiTeks(akhirAdegan(nt, 1), "ju-t0") === "4 + 2 = 6" && ada(akhirAdegan(nt, 2), "cc-k", "d1", "d2", "sy") && ada(akhirAdegan(nt, 3), "kc-k", "gj", "hp8", "lh"), "Counting Up terapan: 4 + 2 = 6, cocok dan kurang cocok");
  const pj = adegan(U, "luar-pinjam");
  cek(isiTeks(akhirAdegan(pj, 0), "nm-t0") === "Regrouping" && isiTeks(akhirAdegan(pj, 1), "lb1") === "1 puluhan" && isiTeks(akhirAdegan(pj, 1), "lb2") === "10 satuan" && ada(akhirAdegan(pj, 1), "sk-k", "bt", "pb", "bu0", "bu9"), "Regrouping konsep: satuan kecil, 1 puluhan jadi 10 satuan");
  cek(isiTeks(akhirAdegan(pj, 2), "mn-t0") === "puluhan -1" && isiTeks(akhirAdegan(pj, 2), "pl-t0") === "satuan +10" && ada(akhirAdegan(pj, 3), "pk", "ok", "sy"), "Regrouping konsep: puluhan berkurang satu, satuan bertambah sepuluh");
  const pq = adegan(U, "luar-pinjam-terapan");
  cek(isiTeks(akhirAdegan(pq, 0), "sn-a") === "62" && isiTeks(akhirAdegan(pq, 0), "sn-b") === "38" && ada(akhirAdegan(pq, 0), "bm", "k1-k", "x1"), "Regrouping terapan: Bima 62 - 38, 2 tidak cukup untuk 8");
  cek(isiTeks(akhirAdegan(pq, 1), "k2-t0") === "60 jadi 50" && isiTeks(akhirAdegan(pq, 1), "k3-t0") === "2 jadi 12" && isiTeks(akhirAdegan(pq, 1), "hs") === "24", "Regrouping terapan: 60 jadi 50, 2 jadi 12, hasil 24");
  cek(ada(akhirAdegan(pq, 2), "cc-k", "ca-k", "cb-k", "lk", "sy") && ada(akhirAdegan(pq, 3), "kc-k", "ct-k", "sl3", "lh"), "Regrouping terapan: cocok dan kurang cocok");
  const rk = adegan(U, "luar-ringkas");
  cek(["r0-t0", "r1-t0", "r2-t0"].map((id) => isiTeks(akhirAdegan(rk, 0), id)).join() === "Pengurangan,Menghitung,Pinjam" && isiTeks(akhirAdegan(rk, 0), "n3") === "3 cara", "ringkasan: tiga metode");
  cek(ada(akhirAdegan(rk, 1), "ls0", "ls1") && ada(akhirAdegan(rk, 2), "ls2", "pr-k", "ok"), "ringkasan: kapan memakai tiap cara, periksa dengan tambah");
  cek(isiTeks(akhirAdegan(rk, 3), "s1-t0") === "100" && isiTeks(akhirAdegan(rk, 3), "s2-t0") === "99" && ada(akhirAdegan(rk, 3), "q0", "q1", "q2", "pk"), "ringkasan: 100 - 99 dan tiga cara untuk dipilih");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k3b1E-.*\.ts$/.test(f));
  cek(berkas.length >= 8, `berkas story k3b1E (${berkas.length})`);
  cek(!berkas.includes("k3b1E-materi-4.ts") && !berkas.includes("k3b1E-materi-5.ts"), "k3b1E-materi-4.ts dan materi-5.ts sudah dihapus");
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s), `${f}: tanpa kata buku`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k3b1E-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k3b1E (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k3b1e.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K3B1E/.test(pb) && /VIDEO_LUAR_K3B1E/.test(pb) && /export function VideoK3B1E/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿"), "video-k3b1e.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
