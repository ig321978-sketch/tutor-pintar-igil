// Uji Story Kelas 1 Bab 1 Sub-Bab C "Tangga Gudang Loteng" (menghitung maju dan mundur): video materi dan video metode global.
// Bagian umum sama dengan uji Sub-Bab A; bagian khusus memeriksa tangga, naik dan turun sesuai kata bilangan, sebelum dan sesudah, nomor hilang, jalur, hitung lanjut, tongkat.
// Jalankan: node --no-warnings scripts/uji-story-k1b1c.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k1b1c-video.ts");
const G = await import("../src/components/modul/story/k1b1c-gambar.ts");
const U1 = await import("../src/components/modul/story/k1b1c-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K1B1C, V.VIDEO_LUAR_K1B1C];
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

/* ------------------------------ Khusus Sub-Bab C ------------------------------ */
const M_VIDEO = V.VIDEO_MATERI_K1B1C;
const U = V.VIDEO_LUAR_K1B1C;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const NAMA_ANGKA = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh"];
const normal = (w) => w.toLowerCase().replace(/[^a-z]/g, "");
{
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!/Number Track|Counting|Jalur Angka|Hitung Lanjut|Tongkat Hitung|metode global/i.test(materi), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Tangga Gudang Loteng" && U.judul === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,gudang-loteng,naik-maju,turun-mundur,dari-tengah,sebelum-sesudah,lengkapi-urutan,kardus-urut,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-jalur,luar-jalur-terapan,luar-lanjut,luar-lanjut-terapan,luar-tongkat,luar-tongkat-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46) && U.adegan.every((a) => /Metode global|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "label sumber");
  const TERLARANG = /buku|panduan guru|halaman|kunci|rubrik|latihan|soal|kelas|teman|kelompok|skor|nilai/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
  const BOCOR = /tambah|kurang|jumlah|\bbelas\b|\bpuluh\b|sebelas|[<>=+]/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) {
    cek(!BOCOR.test(a.ketukan.map((kt) => kt.suara).join(" ")), `${v.id}/${a.id}: suara tanpa tambah, kurang, belasan, atau tanda`);
    for (const [i] of a.ketukan.entries()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 10, `${v.id}/${a.id}#${i + 1}: angka paling besar sepuluh ("${t}")`);
  }
  for (const kata of ["Igil", "Kaka", "Abang", "Mamah", "loteng", "tangga", "maju", "mundur", "sebelum", "sesudah", "hilang", "pesta"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const kata of ["Malosi", "Kira", "Upe", "Wei", "taman", "katak"]) for (const isi of [materi, luar]) cek(!isi.toLowerCase().includes(kata.toLowerCase()), `video tanpa tokoh atau latar lama "${kata}"`);
  const km = kataVideo(M_VIDEO);
  cek(km / 120 >= 2.5 && km / 120 <= 3.4, `durasi materi sekitar tiga menit (${(km / 120).toFixed(1)} menit)`);
  cek(kataVideo(U) / 120 >= 3, `durasi video global paling sedikit tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
}
{
  // Naik: tokoh berpindah ke anak tangga yang sama dengan kata bilangan, angka anak tangga menyala berurutan.
  const tanggaCek = (id, ke, urut) => {
    const a = adegan(M_VIDEO, id);
    const kt = a.ketukan[ke];
    const kata = L.kataDari(kt.suara).map(normal);
    let ok = true;
    let dari = 0;
    for (const n of urut) {
      const p = kata.indexOf(NAMA_ANGKA[n], dari);
      if (p < 0) { ok = false; break; }
      dari = p + 1;
      const o = L.keadaanStory(a, ke, p);
      const tokoh = ketemu(o, id === "dari-tengah" ? "ab" : "ig");
      const tujuan = n === 0 ? { x: 20 } : G.atasTangga(n - 1);
      if (Math.abs(tokoh.x - tujuan.x) > 0.5) ok = false;
      if (n > 0 && isiTeks(o, `tga${n - 1}`) !== String(n)) ok = false;
    }
    cek(ok, `${id}#${ke + 1}: tokoh berdiri di anak tangga sesuai kata bilangan (${urut.join(",")})`);
  };
  tanggaCek("naik-maju", 1, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  tanggaCek("turun-mundur", 1, [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
  tanggaCek("dari-tengah", 1, [5, 6, 7, 8]);
  const tg = akhirAdegan(adegan(M_VIDEO, "naik-maju"), 0).filter((o) => /^tg\d$/.test(o.id));
  cek(tg.length === 10 && tg.every((o, i) => i === 0 || (o.x > tg[i - 1].x && o.y < tg[i - 1].y)), "tangga: sepuluh anak tangga makin tinggi ke kanan");
  // Sebelum dan sesudah enam.
  const s = akhirAdegan(adegan(M_VIDEO, "sebelum-sesudah"));
  sama([isiTeks(s, "k5-t"), isiTeks(s, "k6-t"), isiTeks(s, "k7-t")], ["5", "6", "7"], "sebelum dan sesudah enam");
  cek(ketemu(s, "k5").x < ketemu(s, "k6").x && ketemu(s, "k6").x < ketemu(s, "k7").x, "sebelum di kiri, sesudah di kanan");
  // Melengkapi: nomor hilang tiga dan tujuh.
  const l = akhirAdegan(adegan(M_VIDEO, "lengkapi-urutan"));
  sama([0, 1, 2, 3, 4].map((i) => isiTeks(l, `ba${i}-t`)), ["1", "2", "3", "4", "5"], "lengkapi maju: satu sampai lima");
  sama([0, 1, 2, 3].map((i) => isiTeks(l, `bb${i}-t`)), ["9", "8", "7", "6"], "lengkapi mundur: sembilan sampai enam");
  const awal = akhirAdegan(adegan(M_VIDEO, "lengkapi-urutan"), 0);
  sama(isiTeks(awal, "ba2-t"), "?", "lengkapi: mula-mula tanpa nomor");
  // Kardus urut satu sampai sepuluh.
  const u = akhirAdegan(adegan(M_VIDEO, "kardus-urut"));
  sama(Array.from({ length: 10 }, (_, i) => isiTeks(u, `ku${i}-t`)), Array.from({ length: 10 }, (_, i) => String(i + 1)), "kardus urut satu sampai sepuluh");
  // Tumpukan awal tercampur dan ada yang terlepas.
  const c = akhirAdegan(adegan(M_VIDEO, "gudang-loteng"));
  const nomor = Array.from({ length: 10 }, (_, i) => isiTeks(c, `kc${i}-t`));
  cek(nomor.filter((x) => x === "?").length === 2 && nomor.join() !== "1,2,3,4,5,6,7,8,9,10", "kardus awal tercampur, dua tanpa nomor");
  // Jalur: kardus di empat, lalu lima, lalu tiga.
  const j = adegan(U, "luar-jalur-terapan");
  const xk = (ke) => ketemu(akhirAdegan(j, ke), "kd").x;
  const xp = (i) => ketemu(akhirAdegan(j, 0), `jp${i}`).x + 13;
  sama([xk(0), xk(1), xk(2)].map((x) => Math.round(x)), [xp(3), xp(4), xp(2)].map(Math.round), "Number Track: kardus di empat, lima, tiga");
  // Hitung lanjut: enam lalu sembilan kardus.
  const h = adegan(U, "luar-lanjut-terapan");
  sama([0, 2].map((ke) => akhirAdegan(h, ke).filter((o) => /^kr\d$/.test(o.id)).length), [6, 9], "Counting On: enam kardus menjadi sembilan");
  sama(["t6", "t7", "t8", "t9"].map((id) => isiTeks(akhirAdegan(h, 1), id)), ["6", "7", "8", "9"], "Counting On: mulai dari enam");
  // Tongkat: tanda tanya tujuh dan tiga.
  const t = adegan(U, "luar-tongkat-terapan");
  sama([isiTeks(akhirAdegan(t, 0), "q7"), isiTeks(akhirAdegan(t, 2), "q7"), isiTeks(akhirAdegan(t, 2), "q3")], ["?", "7", "3"], "Counting Stick: tanda tanya menjadi tujuh dan tiga");
  cek(Math.abs(ketemu(akhirAdegan(t, 2), "q7").x - G.xTongkat(20, 7)) < 0.5, "Counting Stick: tujuh di tempat ketujuh");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k1b1c-.*\.ts$/.test(f));
  cek(berkas.length >= 8, `berkas story k1b1c (${berkas.length})`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k1b1[abc]-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, dan berkas k1b1 (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k1b1c.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K1B1C/.test(pb) && /VIDEO_LUAR_K1B1C/.test(pb) && !/\r/.test(pb), "video-k1b1c.tsx memakai dua video Story");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
