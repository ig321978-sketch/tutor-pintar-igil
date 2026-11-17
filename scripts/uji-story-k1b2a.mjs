// Uji Story Kelas 1 Bab 2 Sub-Bab A "Bibit Kiriman Nenek" (cerita penjumlahan), awal cerita Kebun Sayur Mamah: video materi dan video metode global.
// Bagian umum sama dengan uji Bab 1; bagian khusus memeriksa cabai bertambah, kalimat penjumlahan, tomat digabung, nol, sawi sepuluh, dan tiga metode global.
// Jalankan: node --no-warnings scripts/uji-story-k1b2a.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k1b2a-video.ts");
const G = await import("../src/components/modul/story/k1b2a-gambar.ts");
const U1 = await import("../src/components/modul/story/k1b2a-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K1B2A, V.VIDEO_LUAR_K1B2A];
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

/* ------------------------------ Khusus Sub-Bab A Bab 2 ------------------------------ */
const M_VIDEO = V.VIDEO_MATERI_K1B2A;
const U = V.VIDEO_LUAR_K1B2A;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const hitung = (objs, p) => objs.filter((o) => new RegExp(`^${p}\\d+$`).test(o.id)).length;
const kalimatDi = (objs, p) => [0, 1, 2, 3, 4].map((i) => isiTeks(objs, `${p}${i}`)).join(" ");
{
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!/Counting On|Part-Part-Whole|Ten Frame|Menghitung Maju|Bagian-Bagian-Utuh|metode global/i.test(materi), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Bibit Kiriman Nenek" && U.judul === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,halaman-kosong,cabai-bertambah,kalimat-penjumlahan,tomat-digabung,selada-nol,sawi-sepuluh,semua-tertanam,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-maju,luar-maju-terapan,luar-bagian,luar-bagian-terapan,luar-bingkai,luar-bingkai-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46) && U.adegan.every((a) => /Metode global|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "label sumber");
  const TERLARANG = /buku|panduan guru|kunci|rubrik|latihan|soal|kelas|teman|kelompok|skor|nilai/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
  // Bab 2 hanya penjumlahan: tanpa pengurangan, belasan, puluhan, dan tanda selain + dan =.
  const BOCOR = /dikurangi|pengurangan|\bbelas\b|\bpuluh\b|sebelas|[<>×÷−]/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) {
    cek(!BOCOR.test(a.ketukan.map((kt) => kt.suara).join(" ")), `${v.id}/${a.id}: suara tanpa pengurangan, belasan, atau tanda lain`);
    for (const [i] of a.ketukan.entries()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) {
      cek(!/[<>×÷−]/.test(t), `${v.id}/${a.id}#${i + 1}: hanya tanda + dan = ("${t}")`);
      for (const b of bilanganDari(t)) cek(Number(b) <= 10, `${v.id}/${a.id}#${i + 1}: angka paling besar sepuluh ("${t}")`);
    }
  }
  for (const kata of ["Igil", "Kaka", "Abang", "Mamah", "Nenek", "kebun", "bibit", "lubang", "ditambah", "sama dengan", "bertambah", "digabung", "nol", "panen"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const kata of ["Malosi", "Kira", "Upe", "Wei", "taman", "lompat tali", "sekolah"]) for (const isi of [materi, luar]) cek(!isi.toLowerCase().includes(kata.toLowerCase()), `video tanpa tokoh atau latar lama "${kata}"`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
}
{
  // Cabai: empat dihitung, dua datang, hitung maju lima dan enam.
  const c = adegan(M_VIDEO, "cabai-bertambah");
  const c0 = akhirAdegan(c, 0);
  sama([hitung(c0, "cb"), [0, 1, 2, 3].map((i) => isiTeks(c0, `cbn${i}`)).join()], [4, "1,2,3,4"], "cabai: empat dihitung satu sampai empat");
  const c1 = akhirAdegan(c, 1);
  sama(hitung(c1, "cb"), 6, "cabai: datang dua menjadi enam");
  const c2 = akhirAdegan(c, 2);
  sama([isiTeks(c2, "cbn4"), isiTeks(c2, "cbn5"), isiTeks(c2, "sm-t0")], ["5", "6", "semuanya 6"], "cabai: hitung maju lima, enam");
  cek(ketemu(c2, "cbn3")?.sorot === true, "cabai: mulai dari empat (disorot)");
  // Kalimat penjumlahan.
  const kl = akhirAdegan(adegan(M_VIDEO, "kalimat-penjumlahan"), 1);
  sama(kalimatDi(kl, "kl"), "4 + 2 = 6", "kalimat: empat ditambah dua sama dengan enam");
  cek([0, 1, 2, 3, 4].every((i) => ketemu(kl, `kl${i}`)?.sorot), "kalimat: tiap lambang disorot saat dibaca");
  // Tomat: tiga dan lima digabung ke bedeng sepuluh lubang, delapan terisi, dua kosong.
  const t = adegan(M_VIDEO, "tomat-digabung");
  const t0 = akhirAdegan(t, 0);
  sama([t0.filter((o) => /^tm\d$/.test(o.id) && o.x < 140).length, t0.filter((o) => /^tm\d$/.test(o.id) && o.x > 140).length], [3, 5], "tomat: tiga dan lima");
  const t2 = akhirAdegan(t, 2);
  sama([hitung(t2, "tm"), hitung(t2, "bsc"), kalimatDi(t2, "kl")], [8, 10, "3 + 5 = 8"], "tomat: delapan di bedeng sepuluh lubang");
  cek(ketemu(t2, "bsc8")?.sorot && ketemu(t2, "bsc9")?.sorot && !ketemu(t2, "bsc7")?.sorot, "tomat: dua lubang kosong disorot");
  cek(!ketemu(t2, "kr1") && !ketemu(t2, "kr2"), "tomat: keranjang hilang setelah digabung");
  // Nol.
  const n = akhirAdegan(adegan(M_VIDEO, "selada-nol"), 1);
  sama([hitung(n, "sl"), isiTeks(n, "n0"), kalimatDi(n, "kl")], [7, "0", "7 + 0 = 7"], "selada: tujuh ditambah nol");
  sama(hitung(akhirAdegan(adegan(M_VIDEO, "selada-nol")), "lb"), 7, "selada: tujuh lubang");
  // Sawi sampai sepuluh.
  const s = adegan(M_VIDEO, "sawi-sepuluh");
  sama(hitung(akhirAdegan(s, 0), "sw"), 6, "sawi: enam");
  const s1 = akhirAdegan(s, 1);
  sama([hitung(s1, "sw"), [5, 6, 7, 8, 9].map((i) => isiTeks(s1, `hn${i}`)).join()], [10, "6,7,8,9,10"], "sawi: hitung maju sampai sepuluh");
  sama(kalimatDi(akhirAdegan(s, 2), "kl"), "6 + 4 = 10", "sawi: enam ditambah empat");
  // Papan catatan memuat empat kalimat cerita dan semuanya benar.
  const h = akhirAdegan(adegan(M_VIDEO, "semua-tertanam"), 1);
  sama([0, 1, 2, 3].map((i) => isiTeks(h, `ct${i}`)), ["4 + 2 = 6", "3 + 5 = 8", "7 + 0 = 7", "6 + 4 = 10"], "papan catatan kebun");
  for (const i of [0, 1, 2, 3]) {
    const [a, , b, , c2b] = isiTeks(h, `ct${i}`).split(" ");
    cek(Number(a) + Number(b) === Number(c2b), `papan catatan ${i}: penjumlahan benar`);
  }
  // Metode global.
  const mt = adegan(U, "luar-maju-terapan");
  sama([hitung(akhirAdegan(mt, 0), "wt"), isiTeks(akhirAdegan(mt, 2), "h8"), isiTeks(akhirAdegan(mt, 2), "h9"), kalimatDi(akhirAdegan(mt, 3), "kl")], [9, "8", "9", "7 + 2 = 9"], "Counting On: tujuh, hitung maju delapan sembilan");
  const bt = adegan(U, "luar-bagian-terapan");
  const b1 = akhirAdegan(bt, 1);
  sama([b1.filter((o) => /^tr\d$/.test(o.id) && o.x < 140).length, b1.filter((o) => /^tr\d$/.test(o.id) && o.x > 140).length], [2, 3], "Part-Part-Whole: dua dan tiga di bagian");
  const b2 = akhirAdegan(bt, 2);
  cek(b2.filter((o) => /^tr\d$/.test(o.id)).every((o) => o.y < 104), "Part-Part-Whole: semua pindah ke utuh");
  sama([isiTeks(akhirAdegan(bt, 3), "gu"), kalimatDi(akhirAdegan(bt, 3), "kl")], ["5", "2 + 3 = 5"], "Part-Part-Whole: utuh lima");
  const gj = adegan(U, "luar-bingkai-terapan");
  sama([hitung(akhirAdegan(gj, 0), "gj"), hitung(akhirAdegan(gj, 1), "gj"), isiTeks(akhirAdegan(gj, 2), "d8-t0"), kalimatDi(akhirAdegan(gj, 3), "kl")], [5, 8, "semuanya 8", "5 + 3 = 8"], "Ten Frame: lima dan tiga menjadi delapan");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k1b2a-.*\.ts$/.test(f));
  cek(berkas.length >= 8, `berkas story k1b2a (${berkas.length})`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k1b1[abcd]-[a-z0-9-]+|k1b2a-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, dan berkas k1b1 atau k1b2a (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k1b2a.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K1B2A/.test(pb) && /VIDEO_LUAR_K1B2A/.test(pb) && !/\r/.test(pb), "video-k1b2a.tsx memakai dua video Story");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
