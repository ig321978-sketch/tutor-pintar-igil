// Uji Story Kelas 1 Bab 3 Sub-Bab B "Pindah Kereta di Stasiun Besar" (berbagai cara mengurangi), lanjutan Kereta ke Rumah Nenek: video materi dan video metode global.
// Bagian umum sama dengan uji Sub-Bab A; bagian khusus memeriksa bagan pasangan, nol dan sama, garis bilangan papan peron, pasangan sepuluh, catatan, dan tiga metode global.
// Jalankan: node --no-warnings scripts/uji-story-k1b3b.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k1b3b-video.ts");
const U1 = await import("../src/components/modul/story/k1b3b-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K1B3B, V.VIDEO_LUAR_K1B3B];
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

/* ------------------------------ Khusus Sub-Bab B Bab 3 ------------------------------ */
const M_VIDEO = V.VIDEO_MATERI_K1B3B;
const U = V.VIDEO_LUAR_K1B3B;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const hitung = (objs, p) => objs.filter((o) => new RegExp(`^${p}\\d+$`).test(o.id)).length;
const kalimatDi = (objs, p) => [0, 1, 2, 3, 4].map((i) => isiTeks(objs, `${p}${i}`)).join(" ");
const K = "−";
const kal = (a, b) => `${a} ${K} ${b} = ${a - b}`;
{
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!/Number Bond|Number Line|Make Ten|metode global/i.test(materi), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Pindah Kereta di Stasiun Besar" && U.judul === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,stasiun-besar,bagan-barang,nol-sama,peron-mundur,kursi-sepuluh,semua-duduk,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-bagan,luar-bagan-terapan,luar-garis,luar-garis-terapan,luar-sepuluh,luar-sepuluh-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46) && U.adegan.every((a) => /Metode global|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "label sumber");
  const TERLARANG = /buku|panduan guru|kunci|rubrik|latihan|soal|kelas|teman|kelompok|skor|nilai/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
  // Bab 3 hanya pengurangan sampai sepuluh: tanpa penjumlahan, belasan, puluhan, dan tanda selain kurang dan sama dengan.
  const BOCOR = /ditambah|penjumlahan|\bbelas\b|\bpuluh\b|sebelas|[<>×÷+−]/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) {
    cek(!BOCOR.test(a.ketukan.map((kt) => kt.suara).join(" ")), `${v.id}/${a.id}: suara tanpa penjumlahan, belasan, atau lambang`);
    for (const [i] of a.ketukan.entries()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) {
      cek(!/[<>×÷+]/.test(t) && !/\d\s*-\s*\d/.test(t), `${v.id}/${a.id}#${i + 1}: hanya tanda kurang dan sama dengan ("${t}")`);
      for (const b of bilanganDari(t)) cek(Number(b) <= 10, `${v.id}/${a.id}#${i + 1}: angka paling besar sepuluh ("${t}")`);
    }
  }
  for (const kata of ["Igil", "Kaka", "Abang", "Mamah", "kereta lanjutan", "stasiun besar", "bagan", "dua kalimat", "dikurangi nol", "garis bilangan", "mundur", "pasangan sepuluh", "kondektur"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const kata of ["Malosi", "Kira", "Upe", "Wei", "Halim", "kebun", "bibit", "sekolah", "telur", "balon"]) for (const isi of [materi, luar]) cek(!isi.toLowerCase().includes(kata.toLowerCase()), `video tanpa tokoh atau latar lama "${kata}"`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
}
{
  // Bagan barang: tujuh, lima koper dan dua tas, dua kalimat.
  const b = adegan(M_VIDEO, "bagan-barang");
  sama([hitung(akhirAdegan(b, 0), "kp"), hitung(akhirAdegan(b, 0), "ts")], [5, 2], "bagan: lima koper dan dua tas");
  sama(["ik-tu", "ik-ta", "ik-tb"].map((id) => isiTeks(akhirAdegan(b, 1), id)), ["7", "5", "2"], "bagan: utuh tujuh, bagian lima dan dua");
  sama([kalimatDi(akhirAdegan(b), "k1"), kalimatDi(akhirAdegan(b), "k2")], [kal(7, 5), kal(7, 2)], "bagan: satu bagan dua pengurangan");
  // Nol dan sama.
  const n = adegan(M_VIDEO, "nol-sama");
  sama([hitung(akhirAdegan(n, 0), "bk"), kalimatDi(akhirAdegan(n, 1), "k1"), kalimatDi(akhirAdegan(n), "k2")], [4, kal(4, 0), kal(4, 4)], "nol: empat dikurangi nol, empat dikurangi empat");
  // Peron: garis bilangan, mundur tiga dari delapan.
  const p = adegan(M_VIDEO, "peron-mundur");
  sama([hitung(akhirAdegan(p, 0), "gb-c"), hitung(akhirAdegan(p, 0), "pp")], [11, 10], "peron: garis nol sampai sepuluh dan sepuluh papan");
  const p2 = akhirAdegan(p, 2);
  sama([ketemu(p2, "ig").x, ["h7", "h6", "h5"].every((id) => ketemu(p2, id)), ketemu(p2, "gb-a5")?.sorot], [25 + 5 * 25, true, true], "peron: tiga lompatan berhenti di lima");
  sama(kalimatDi(akhirAdegan(p), "kl"), kal(8, 3), "peron: delapan dikurangi tiga");
  // Kursi sepuluh: tujuh terisi, tiga kosong; baris sebelah enam terisi, empat kosong.
  const k2 = adegan(M_VIDEO, "kursi-sepuluh");
  sama([hitung(akhirAdegan(k2, 0), "kr"), hitung(akhirAdegan(k2, 0), "pn"), kalimatDi(akhirAdegan(k2, 1), "kl")], [10, 7, kal(10, 7)], "kursi: sepuluh dikurangi tujuh");
  cek(/cukup/.test(isiTeks(akhirAdegan(k2, 2), "tc")), "kursi: tiga tidak cukup untuk berempat");
  sama([hitung(akhirAdegan(k2), "pn"), kalimatDi(akhirAdegan(k2), "k2")], [6, kal(10, 6)], "kursi: baris sebelah sepuluh dikurangi enam");
  // Catatan baru.
  const h = akhirAdegan(adegan(M_VIDEO, "semua-duduk"), 1);
  sama([0, 1, 2, 3].map((i) => isiTeks(h, `ct${i}`)), [kal(7, 5), kal(7, 2), kal(8, 3), kal(10, 6)], "catatan baru Kaka");
  cek(/penumpang/.test(isiTeks(akhirAdegan(adegan(M_VIDEO, "semua-duduk")), "hp-t0")), "hasil: jembatan kondektur menghitung penumpang");
  // Metode global.
  const bt = adegan(U, "luar-bagan-terapan");
  sama([hitung(akhirAdegan(bt, 0), "kc"), isiTeks(akhirAdegan(bt, 2), "ik-tb"), kalimatDi(akhirAdegan(bt, 2), "kl"), kalimatDi(akhirAdegan(bt, 3), "k2")], [9, "3", kal(9, 6), kal(9, 3)], "Number Bond: sembilan, enam, tiga");
  const gt = adegan(U, "luar-garis-terapan");
  sama([ketemu(akhirAdegan(gt, 2), "pd").x, kalimatDi(akhirAdegan(gt, 3), "kl")], [25 + 3 * 25, kal(7, 4)], "Number Line: tujuh mundur empat ke tiga");
  const st = adegan(U, "luar-sepuluh-terapan");
  sama([hitung(akhirAdegan(st, 0), "jd"), akhirAdegan(st, 0).filter((o) => /^jd\d$/.test(o.id) && o.warna === "#FCA5A5").length, kalimatDi(akhirAdegan(st, 2), "kl")], [10, 8, kal(10, 8)], "Make Ten: sepuluh jendela, delapan tertutup");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k1b3b-.*\.ts$/.test(f));
  cek(berkas.length >= 8, `berkas story k1b3b (${berkas.length})`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k1b1[abcd]-[a-z0-9-]+|k1b2a-gambar|k1b3a-gambar|k1b3b-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, dan berkas k1b1 atau k1b3b (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k1b3b.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K1B3B/.test(pb) && /VIDEO_LUAR_K1B3B/.test(pb) && !/\r/.test(pb), "video-k1b3b.tsx memakai dua video Story");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
