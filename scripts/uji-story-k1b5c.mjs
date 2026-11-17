// Uji Story Kelas 1 Bab 5 Sub-Bab C "Kemas Pakan dan Kantong" (puluhan dan satuan), lanjutan cerita Akuarium Ikan Hias Abang: video materi dan video metode global.
// Bagian umum sama dengan uji Sub-Bab B; bagian khusus memeriksa bungkus pakan yang berserakan lalu diikat tiap sepuluh, ikatan sembilan yang belum sepuluh,
// tabel puluhan dan satuan, kantong ikan dalam keranjang sepuluh, sebelas kerang (angka sama, tempat beda), dua puluh kerikil tanpa sisa,
// kalimat puluhan dan satuan, papan persediaan, jembatan ke Sub-Bab D, bilangan yang diucapkan tampak sebagai angka, dan tiga metode global.
// Jalankan: node --no-warnings scripts/uji-story-k1b5c.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k1b5c-video.ts");
const U1 = await import("../src/components/modul/story/k1b5c-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K1B5C, V.VIDEO_LUAR_K1B5C];
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



/* ------------------------------ Khusus Sub-Bab C Bab 5 ------------------------------ */
const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
const M_VIDEO = V.VIDEO_MATERI_K1B5C;
const U = V.VIDEO_LUAR_K1B5C;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const hitung = (objs, p) => objs.filter((o) => new RegExp(`^${p}\\d+$`).test(o.id)).length;
const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
const rentang = (dari, sampai) => (dari <= sampai ? Array.from({ length: sampai - dari + 1 }, (_, i) => dari + i) : Array.from({ length: dari - sampai + 1 }, (_, i) => dari - i));
/** Benda kotak `o` berada di dalam bingkai `r`. */
const didalam = (o, r) => o.x >= r.x && o.y >= r.y && o.x + o.w <= r.x + r.w && o.y + o.h <= r.y + r.h;
const bungkusDi = (objs, p, karet) => objs.filter((o) => new RegExp(`^${p}\\d+$`).test(o.id) && didalam(o, karet));

// Bilangan yang diucapkan (satu sampai dua puluh, belasan dibaca utuh) dibaca dari suara.
const SATUAN = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
const POLA_BIL = /\b(sebelas|(?:satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan) belas|dua puluh|sepuluh|satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan)\b/g;
const nilaiBil = (m) => (m === "sebelas" ? 11 : m === "dua puluh" ? 20 : m === "sepuluh" ? 10 : m.endsWith(" belas") ? 10 + SATUAN[m.split(" ")[0]] : SATUAN[m]);
const bilanganSuara = (s) => [...s.toLowerCase().matchAll(POLA_BIL)].map((m) => nilaiBil(m[1]));
sama(bilanganSuara("Dua belas, tiga belas, sebelas, sepuluh dan satu, dua puluh, dua puluhan, kedua, satuannya."), [12, 13, 11, 10, 1, 20, 2], "pembaca bilangan suara");
{
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!/Base Ten Blocks|Place Value Chart|Bundling Sticks|Balok Puluhan|Tabel Puluhan dan Satuan|Ikat Sedotan|metode global/i.test(materi), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Base Ten Blocks", "Place Value Chart", "Bundling Sticks"], ["Balok Puluhan", "Tabel Puluhan dan Satuan", "Ikat Sedotan"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Kemas Pakan dan Kantong" && U.judul === M_VIDEO.judul && V.JUDUL_K1B5C === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k1b5c-materi" && U.id === "k1b5c-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,brak,ikat-sepuluh,tabel,kantong-ikan,sebelas,dua-puluh,kalimat,papan-rapi,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-balok,luar-balok-terapan,luar-tabel,luar-tabel-terapan,luar-ikat,luar-ikat-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46) && U.adegan.every((a) => /Metode global|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "label sumber");
  const TERLARANG = /buku|panduan guru|kunci|rubrik|latihan|soal|kelas|teman|kelompok|skor|nilai|tebak/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang (termasuk nilai tempat)`);
  const SURUH = /bawalah|bawa benda|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
  // Bab 5: tanpa kali dan bagi, tanpa lambang hitung, angka paling besar dua puluh.
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan) {
      for (const kt of a.ketukan) cek(!/\b(kali|dikali|bagi|dibagi|perkalian|pembagian)\b/i.test(kt.suara.replace(/berkali-kali/gi, "")), `${v.id}/${a.id}: suara tanpa kali dan bagi`);
      for (const [i] of a.ketukan.entries())
        for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) {
          cek(!/[<>×÷=]/.test(t) && !/\d\s*-\s*\d/.test(t), `${v.id}/${a.id}#${i + 1}: tanpa lambang hitung ("${t}")`);
          for (const b of bilanganDari(t)) cek(Number(b) <= 20, `${v.id}/${a.id}#${i + 1}: angka paling besar dua puluh ("${t}")`);
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
  for (const n of [1, 2, 3, 6, 9, 10, 11, 13, 16, 20]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  for (const kata of ["Igil", "Kaka", "Abang", "Mamah", "bungkus", "pakan", "kantong", "ikan", "kerang", "kerikil", "puluhan", "satuan", "tabel", "diikat", "karet", "keranjang", "papan", "persediaan", "pembeli", "tempat"])
    cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/Malosi/i, /\bKira\b/, /\bUpe\b/, /\bWei\b/, /Halim/i, /kebun/i, /bibit/i, /sekolah/i, /burung hantu/i, /piknik/i, /kereta/i, /Nenek/i, /festival/i, /kardus/i, /\bTika\b/i, /ulat/i, /tangga bilangan/i, /kelereng/i, /rak akuarium bernomor/i, /menghitung maju/i])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/puluhan dan satuan/.test(sapa.ketukan[0].suara) && ["Mengikat sepuluh", "Tabel", "Arti angka"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
}
{
  // 1. Brak: tiga belas bungkus berserakan; sepuluh dirapikan dan diikat karet, tiga terpisah.
  const b = adegan(M_VIDEO, "brak");
  const b0 = akhirAdegan(b, 0);
  cek(hitung(b0, "bk") === 13 && ada(b0, "mj", "mm", "pb", "brak") && rentang(0, 12).some((i) => ketemu(b0, `bk${i}`).rot), "brak: tiga belas bungkus berserakan miring di meja, Mamah dan pembeli");
  const awalB = L.keadaanStory(b, 0, L.posisiKata(b.ketukan[0].suara, "bungkus") - 1);
  cek(hitung(awalB, "bk") === 0, "brak: bungkus muncul saat kata bungkus");
  sama([!!ketemu(akhirAdegan(b, 1), "brak"), isiTeks(akhirAdegan(b, 1), "sp"), !!ketemu(akhirAdegan(b, 1), "ig")], [false, "1 per 1", true], "brak: Igil menghitung satu per satu");
  const b2 = akhirAdegan(b);
  const kb = ketemu(b2, "kb");
  const rapi = rentang(0, 9).map((i) => ketemu(b2, `bk${i}`));
  cek(rapi.every((o) => didalam(o, kb) && !o.rot) && new Set(rapi.map((o) => o.y)).size === 2 && new Set(rapi.map((o) => o.x)).size === 5, "brak: sepuluh bungkus rapi lima kali dua di dalam karet");
  cek(rentang(10, 12).every((i) => !didalam(ketemu(b2, `bk${i}`), kb) && ketemu(b2, `bk${i}`).x > kb.x + kb.w), "brak: tiga bungkus sisa terpisah di luar karet");
  sama([isiTeks(b2, "kt-t0"), !!ketemu(b2, "kk"), isiTeks(b2, "ss")], ["tiap 10 diikat jadi 1", true, "sisa"], "brak: sepuluh diikat jadi satu, sisanya dipisah");
  // 2. Ikat sepuluh: Igil mengikat sembilan, Kaka menghitung, ditambah satu jadi sepuluh.
  const s = adegan(M_VIDEO, "ikat-sepuluh");
  const s0 = akhirAdegan(s, 0);
  const kr = ketemu(s0, "kb2");
  sama([hitung(s0, "sb") + hitung(s0, "sl"), isiTeks(s0, "j16"), bungkusDi(s0, "sb", kr).length, bungkusDi(s0, "sl", kr).length, isiTeks(s0, "sr-t0")], [16, "16 bungkus pakan", 9, 0, "puluhan sudah jadi!"], "ikat: enam belas bungkus, sembilan di karet, Igil berseru");
  const s1 = akhirAdegan(s, 1);
  sama([rentang(1, 9).map((j) => isiTeks(s1, `d${j}`)).join(), isiTeks(s1, "b9"), isiTeks(s1, "b10"), bungkusDi(s1, "sb", kr).length + bungkusDi(s1, "sl", kr).length, isiTeks(s1, "d10")], [rentang(1, 9).join(), "baru 9", "belum 10", 10, "10"], "ikat: Kaka menghitung sembilan, belum sepuluh, ditambah satu");
  const sebelumTambah = L.keadaanStory(s, 1, L.posisiKata(s.ketukan[1].suara, "menambah") - 1);
  cek(bungkusDi(sebelumTambah, "sb", kr).length + bungkusDi(sebelumTambah, "sl", kr).length === 9, "ikat: sebelum Igil menambah, karet berisi sembilan");
  const s2 = akhirAdegan(s);
  sama([isiTeks(s2, "lp"), isiTeks(s2, "ls"), bungkusDi(s2, "sl", kr).length, rentang(1, 6).every((i) => ketemu(s2, `sl${i}`).sorot && !didalam(ketemu(s2, `sl${i}`), kr)), ketemu(s2, "kb2").sorot], ["1 puluhan", "6 satuan", 1, true, true], "ikat: satu puluhan dan enam satuan");
  // 3. Tabel: ikatan masuk puluhan, bungkus lepas masuk satuan.
  const t = adegan(M_VIDEO, "tabel");
  const t0 = akhirAdegan(t, 0);
  sama([isiTeks(t0, "tb-tl"), isiTeks(t0, "tb-tr"), ketemu(t0, "tb-hl").x < ketemu(t0, "tb-hr").x], ["puluhan", "satuan", true], "tabel: kolom kiri puluhan, kolom kanan satuan");
  const t1 = akhirAdegan(t, 1);
  const bagi = ketemu(t1, "tb-hr").x;
  cek(hitung(t1, "tz") === 6 && rentang(0, 5).every((i) => ketemu(t1, `tz${i}`).x > bagi) && rentang(0, 9).every((i) => ketemu(t1, `imb${i}`).x < bagi && ketemu(t1, `imb${i}`).x > ketemu(t1, "tb-hl").x) && isiTeks(t1, "l1") === "1 ikatan" && isiTeks(t1, "l6") === "6 bungkus", "tabel: satu ikatan sepuluh di kiri, enam bungkus di kanan");
  const t2 = akhirAdegan(t);
  sama([isiTeks(t2, "tb-al"), isiTeks(t2, "tb-ar"), isiTeks(t2, "bc")], ["1", "6", "16 dibaca enam belas"], "tabel: angka satu dan enam dibaca enam belas");
  // 4. Kantong ikan: tiga belas kantong, sepuluh masuk keranjang (satu puluhan), tiga di luar.
  const q = adegan(M_VIDEO, "kantong-ikan");
  const q0 = akhirAdegan(q, 0);
  const sekat = rentang(0, 9).map((i) => ketemu(q0, `kjc${i}`));
  const dalam = (o) => sekat.findIndex((c) => didalam(o, c));
  cek(hitung(q0, "kt") === 13 && isiTeks(q0, "j13") === "13 kantong ikan" && isiTeks(q0, "is") === "isi 10", "kantong: tiga belas kantong ikan, keranjang isi sepuluh");
  cek(new Set(rentang(0, 9).map((i) => dalam(ketemu(q0, `kt${i}`)))).size === 10 && !rentang(0, 9).some((i) => dalam(ketemu(q0, `kt${i}`)) < 0) && rentang(10, 12).every((i) => dalam(ketemu(q0, `kt${i}`)) < 0), "kantong: sepuluh kantong masing-masing di satu sekat, tiga di luar");
  cek(rentang(0, 9).every((i) => Math.abs(ketemu(q0, `kt${i}-f`).x - (ketemu(q0, `kt${i}`).x + 10)) < 0.5), "kantong: ikan ikut pindah bersama kantongnya");
  const q1 = akhirAdegan(q, 1);
  sama([isiTeks(q1, "lp"), isiTeks(q1, "ls"), !!ketemu(q1, "is"), sekat.every((c) => ketemu(q1, c.id).sorot), ["kt10", "kt11", "kt12"].every((id) => ketemu(q1, id).sorot)], ["1 puluhan", "3 satuan", false, true, true], "kantong: satu puluhan dan tiga satuan");
  const q2 = akhirAdegan(q);
  sama([isiTeks(q2, "tk-tl"), isiTeks(q2, "tk-tr"), isiTeks(q2, "tk-al"), isiTeks(q2, "tk-ar"), isiTeks(q2, "l13"), !!ketemu(q2, "lp")], ["puluhan", "satuan", "1", "3", "13: 10 dan 3", false], "kantong: tabel satu dan tiga, tiga belas adalah sepuluh dan tiga");
  // 5. Sebelas kerang: angka sama, tempat beda.
  const e = adegan(M_VIDEO, "sebelas");
  const e0 = akhirAdegan(e, 0);
  sama([hitung(e0, "kr"), isiTeks(e0, "j11"), isiTeks(e0, "tb-al"), isiTeks(e0, "tb-ar"), isiTeks(e0, "sr-t0")], [11, "11 kerang", "1", "1", "2 angka 1 sama!"], "sebelas: sebelas kerang, tabel satu dan satu, Igil mengira sama");
  const e1 = akhirAdegan(e, 1);
  cek(ketemu(e1, "tb-hl").sorot && ketemu(e1, "tb-bl").sorot && !ketemu(e1, "tb-hr").sorot && rentang(0, 9).every((i) => ketemu(e1, `kr${i}`).sorot) && !ketemu(e1, "kr10").sorot && isiTeks(e1, "k10") === "10 kerang" && !!ketemu(e1, "kk"), "sebelas: kiri berarti sepuluh kerang (Kaka)");
  const e2 = akhirAdegan(e);
  cek(ketemu(e2, "tb-hr").sorot && ketemu(e2, "tb-br").sorot && !ketemu(e2, "tb-hl").sorot && ketemu(e2, "kr10").sorot && !ketemu(e2, "kr0").sorot && isiTeks(e2, "k1") === "1 kerang" && isiTeks(e2, "bd") === "angka sama, tempat beda", "sebelas: kanan berarti satu kerang, angka sama tempat beda");
  // 6. Dua puluh kerikil: dua ikatan, nol satuan.
  const d = adegan(M_VIDEO, "dua-puluh");
  const d0 = akhirAdegan(d, 0);
  const ka = ketemu(d0, "ka");
  const kbb = ketemu(d0, "kb");
  const isiKaret = (objs, r) => objs.filter((o) => /^kb\d+$/.test(o.id) && o.t === "bulat" && o.x - o.r >= r.x && o.x + o.r <= r.x + r.w && o.y - o.r >= r.y && o.y + o.r <= r.y + r.h).length;
  sama([hitung(d0, "kb"), isiKaret(d0, ka), isiKaret(d0, kbb), isiTeks(d0, "j20")], [20, 10, 10, "20 kerikil"], "dua puluh: dua puluh kerikil, dua ikatan masing-masing sepuluh");
  const d1 = akhirAdegan(d, 1);
  cek(isiTeks(d1, "p2") === "2 puluhan" && isiTeks(d1, "s0") === "0 satuan" && ketemu(d1, "ig").y < ketemu(d0, "ig").y && ketemu(d1, "ig").y > ketemu(d1, "mj").y && ada(d1, "kc"), "dua puluh: dua puluhan, nol satuan, Igil mencari di kolong meja");
  const d2 = akhirAdegan(d);
  sama([isiTeks(d2, "tj-al"), isiTeks(d2, "tj-ar"), isiTeks(d2, "dp"), isiTeks(d2, "ns-t0"), !!ketemu(d2, "kb0")], ["2", "0", "20 dibaca dua puluh", "0 artinya tidak ada sisa", false], "dua puluh: tabel dua dan nol");
  // 7. Kalimat di papan: enam belas dan dua puluh.
  const l = adegan(M_VIDEO, "kalimat");
  const l2 = akhirAdegan(l, 1);
  sama([[isiTeks(l2, "n0"), isiTeks(l2, "a0"), isiTeks(l2, "b0")].join("|"), !!ketemu(l2, "n1")], ["16|1 puluhan|dan 6 satuan", false], "kalimat: enam belas, satu puluhan dan enam satuan");
  const l3 = akhirAdegan(l);
  sama([[isiTeks(l3, "n1"), isiTeks(l3, "a1"), isiTeks(l3, "b1")].join("|")], ["20|2 puluhan|dan 0 satuan"], "kalimat: dua puluh, dua puluhan dan nol satuan");
  cek([0, 1].every((i) => Number(isiTeks(l3, `n${i}`)) === Number(isiTeks(l3, `a${i}`)[0]) * 10 + Number(isiTeks(l3, `b${i}`).match(/[0-9]/)[0])), "kalimat: puluhan sepuluh ditambah satuan sama dengan bilangannya");
  cek(ada(akhirAdegan(l, 0), "mm", "ab", "pp"), "kalimat: Mamah, Abang, dan papan");
  // 8. Papan persediaan rapi dan jembatan ke Sub-Bab D.
  const p = adegan(M_VIDEO, "papan-rapi");
  const p0 = akhirAdegan(p, 0);
  sama([0, 1, 2, 3].map((i) => [isiTeks(p0, `pn${i}`), isiTeks(p0, `pj${i}`), isiTeks(p0, `pp${i}`), isiTeks(p0, `ps${i}`)].join(":")), ["pakan:16:1:6", "kantong ikan:13:1:3", "kerang:11:1:1", "kerikil:20:2:0"], "papan: empat baris persediaan");
  cek([0, 1, 2, 3].every((i) => Number(isiTeks(p0, `pj${i}`)) === Number(isiTeks(p0, `pp${i}`)) * 10 + Number(isiTeks(p0, `ps${i}`))), "papan: jumlah sama dengan puluhan sepuluh ditambah satuan");
  cek(ada(p0, "pb", "sk") && ketemu(p0, "pp").sorot && /sekali pandang/.test(p.ketukan[0].suara), "papan: pembeli melihat persediaan sekali pandang");
  const p2 = akhirAdegan(p, 1);
  cek(ada(akhirAdegan(p), "pk", "mm", "jp", "ok") && p.ketukan[2].suara === "Mamah tersenyum lega.", "papan: Mamah tersenyum lega");
  const ikanDi = (objs, id) => objs.filter((o) => new RegExp(`^${id}f\\d+$`).test(o.id)).length;
  sama([ikanDi(p2, "ta"), ikanDi(p2, "tb"), isiTeks(p2, "tc"), isiTeks(p2, "tl"), isiTeks(p2, "gp-t0"), ada(p2, "pk")], [7, 12, "cukup?", "lebih banyak?", "ikan guppy", true], "papan: Pak RT memesan ikan guppy, dua akuarium berbeda banyak");
  cek(/akuarium/i.test(p.ketukan[1].suara) && /lebih banyak/.test(p.ketukan[1].suara), "papan: jembatan ke Sub-Bab D (akuarium mana lebih banyak)");
  // 9. Penutup.
  const z = adegan(M_VIDEO, "penutup");
  const z1 = akhirAdegan(z, 1);
  sama(["q0a", "q0b", "q1a", "q1b", "q2a"].map((id) => isiTeks(z1, id)), ["tiap 10 diikat jadi 1 puluhan", "sisa: satuan", "angka kiri: puluhan", "angka kanan: satuan", "angka sama, tempat beda"], "penutup: ringkasan tiga baris");
  const z2 = akhirAdegan(z);
  cek(ada(z2, "ig", "kk", "kk-pita", "ab", "mm", "mk") && /akuarium mana yang lebih banyak/.test(z.ketukan[2].suara), "penutup: empat tokoh dan pertanyaan jembatan ke Sub-Bab D");
}
{
  // Base Ten Blocks.
  const a = adegan(U, "luar-balok");
  const a0 = akhirAdegan(a, 0);
  sama([ada(a0, "bt"), hitung(a0, "kb"), isiTeks(a0, "b1"), isiTeks(a0, "p1"), isiTeks(a0, "k10")], [true, 10, "1 batang", "1 puluhan", "10 kubus kecil"], "Base Ten Blocks: satu batang sama dengan sepuluh kubus");
  const a1 = akhirAdegan(a, 1);
  sama([ada(a1, "k1", "bt", "ar"), hitung(a1, "kb"), isiTeks(a1, "t2"), isiTeks(a1, "t3")], [true, 10, "1 satuan", "1 batang"], "Base Ten Blocks: satu kubus satu satuan, sepuluh kubus ditukar satu batang");
  sama([isiTeks(akhirAdegan(a, 2), "bp"), isiTeks(akhirAdegan(a, 2), "bs")], ["puluhan", "satuan"], "Base Ten Blocks: batang puluhan, kubus satuan");
  const a3 = akhirAdegan(a);
  sama([ada(a3, "bt"), hitung(a3, "kb"), isiTeks(a3, "b14")], [true, 4, "14"], "Base Ten Blocks: satu batang dan empat kubus adalah empat belas");
  const bt = adegan(U, "luar-balok-terapan");
  const b1 = akhirAdegan(bt, 0);
  sama([isiTeks(b1, "jm"), hitung(b1, "kb"), isiTeks(b1, "b6")], ["16 bungkus pakan", 6, "6 kubus"], "Base Ten Blocks: enam belas bungkus, satu batang dan enam kubus");
  const b2 = akhirAdegan(bt, 1);
  sama([isiTeks(b2, "jm"), hitung(b2, "kb"), isiTeks(b2, "b6"), ketemu(b2, "bt").sorot], ["13 kantong", 3, "3 kubus", true], "Base Ten Blocks: tiga belas kantong, satu batang dan tiga kubus");
  const b3 = akhirAdegan(bt, 2);
  sama([isiTeks(b3, "jm"), ada(b3, "bt", "bu"), hitung(b3, "kb"), isiTeks(b3, "b2"), isiTeks(b3, "b0")], ["20 kerikil", true, 0, "2 batang", "0 kubus"], "Base Ten Blocks: dua puluh kerikil, dua batang tanpa kubus");
  sama(["kl-t0", "kb-t0", "kn-t0"].map((id) => isiTeks(akhirAdegan(bt), id)), ["balok: sekali lihat", "1 per 1: lama", "menulis angka: 16"], "Base Ten Blocks: cepat dilihat, lama ditaruh satu per satu");
  // Place Value Chart.
  const c = adegan(U, "luar-tabel");
  sama([isiTeks(akhirAdegan(c, 0), "tc-tl"), isiTeks(akhirAdegan(c, 0), "tc-tr"), isiTeks(akhirAdegan(c, 0), "kl"), ketemu(akhirAdegan(c, 0), "tc-hr").sorot], ["puluhan", "satuan", "2 kolom", true], "Place Value Chart: dua kolom");
  sama([isiTeks(akhirAdegan(c, 1), "tp"), isiTeks(akhirAdegan(c, 1), "ts")], ["banyak puluhan", "banyak satuan"], "Place Value Chart: banyak puluhan di kiri, banyak satuan di kanan");
  sama([isiTeks(akhirAdegan(c, 2), "tc-al"), isiTeks(akhirAdegan(c, 2), "tc-ar"), isiTeks(akhirAdegan(c, 2), "kl")], ["?", "?", "tempat menentukan arti"], "Place Value Chart: tempat menentukan arti");
  const c3 = akhirAdegan(c);
  sama([isiTeks(c3, "tc-al"), isiTeks(c3, "tc-ar"), isiTeks(c3, "kl")], ["1", "1", "bilangan 11"], "Place Value Chart: sebelas satu di puluhan satu di satuan");
  const ct = adegan(U, "luar-tabel-terapan");
  const nilaiTabel = (objs) => Number(isiTeks(objs, "tc-al")) * 10 + Number(isiTeks(objs, "tc-ar"));
  sama([0, 1, 2].map((i) => nilaiTabel(akhirAdegan(ct, i))), [15, 18, 10], "Place Value Chart: lima belas, delapan belas, sepuluh");
  sama([isiTeks(akhirAdegan(ct, 0), "kl"), isiTeks(akhirAdegan(ct, 1), "kl"), isiTeks(akhirAdegan(ct, 2), "kl"), isiTeks(akhirAdegan(ct, 2), "tc-ar")], ["15 kerang", "18 kerang", "10 kerang", "0"], "Place Value Chart: nol menjaga tempat satuan");
  sama([isiTeks(akhirAdegan(ct), "kc"), isiTeks(akhirAdegan(ct), "kt"), !!ketemu(akhirAdegan(ct), "kl")], ["cepat dibaca", "tanpa benda", false], "Place Value Chart: cepat tetapi tanpa benda");
  // Bundling Sticks.
  const i = adegan(U, "luar-ikat");
  const i0 = akhirAdegan(i, 0);
  cek(rentang(0, 9).every((j) => ketemu(i0, `iks${j}`)) && ketemu(i0, "ik").t === "kotak" && isiTeks(i0, "ti") === "tiap 10 diikat", "Bundling Sticks: sepuluh sedotan diikat karet");
  const i1 = akhirAdegan(i, 1);
  sama([hitung(i1, "sl"), isiTeks(i1, "ti"), isiTeks(i1, "tp"), isiTeks(i1, "sl")], [3, "1 ikat: 10 sedotan", "1 puluhan", "satuan"], "Bundling Sticks: satu ikat satu puluhan, tiga sedotan lepas satuan");
  const i3 = akhirAdegan(i);
  sama([hitung(i3, "sl"), ada(i3, "kz"), isiTeks(i3, "sl"), isiTeks(i3, "tq")], [10, true, "10 lepas", "jadi 1 puluhan"], "Bundling Sticks: sepuluh lepas diikat jadi satu puluhan");
  const it = adegan(U, "luar-ikat-terapan");
  const t1a = akhirAdegan(it, 0);
  sama([hitung(t1a, "sl"), ada(t1a, "ia"), isiTeks(t1a, "js"), isiTeks(t1a, "f1"), isiTeks(t1a, "f7")], [7, true, "17 sedotan", "1 ikat", "7 lepas"], "Bundling Sticks: tujuh belas, satu ikat dan tujuh lepas");
  const t2a = akhirAdegan(it, 1);
  sama([hitung(t2a, "sl"), ada(t2a, "kz"), isiTeks(t2a, "t3"), isiTeks(t2a, "t10")], [10, true, "tambah 3", "7 dan 3 jadi 10"], "Bundling Sticks: tujuh ditambah tiga jadi sepuluh, diikat baru");
  const t3a = akhirAdegan(it, 2);
  sama([ada(t3a, "ia", "ib"), hitung(t3a, "sl"), isiTeks(t3a, "gp"), isiTeks(t3a, "gs"), isiTeks(t3a, "g20")], [true, 0, "2 puluhan", "0 satuan", "20"], "Bundling Sticks: dua ikat, tidak ada yang lepas, dua puluh");
  sama([isiTeks(akhirAdegan(it), "ja-t0"), isiTeks(akhirAdegan(it), "jb-t0")], ["paling jelas: kapan harus mengikat", "tetapi butuh banyak sedotan dan karet"], "Bundling Sticks: jelas tetapi butuh banyak sedotan");
  // Pembuka dan ringkasan.
  const o0 = akhirAdegan(adegan(U, "luar-pembuka"), 0);
  cek(ada(o0, "lc", "lb", "lt0", "lt1", "ls", "tg-t0", "ab", "ig") && isiTeks(o0, "tg-t0") === "3 alat bantu", "pembuka: tiga alat bantu di laci");
  const rk = akhirAdegan(adegan(U, "luar-ringkas"));
  sama(["r0-t0", "r1-t0", "r2-t0"].map((id) => isiTeks(rk, id)), U1.NAMA_METODE, "ringkasan: tiga metode");
  cek(ketemu(rk, "r1-k").sorot && !!ketemu(rk, "pb") && /catatan cepat/.test(adegan(U, "luar-ringkas").ketukan[3].suara), "ringkasan: catatan cepat dipilih ke tabel");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k1b5c-.*\.ts$/.test(f));
  cek(berkas.length >= 8, `berkas story k1b5c (${berkas.length})`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k1b1a-[a-z0-9-]+|k1b4a-gambar|k1b5a-gambar|k1b5c-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, k1b1a, k1b4a-gambar, k1b5a-gambar, atau k1b5c (${impor.join(", ")})`);
    // Gambar baru: dari Sub-Bab A hanya bentuk dasar ikan dan daftar emoji.
    for (const m of s.matchAll(/(?:import|export) \{([^}]+)\} from "\.\/k1b5a-gambar"/g)) cek(m[1].split(",").map((x) => x.trim()).every((x) => /^(E as E_5A|ikan)$/.test(x)), `${f}: dari k1b5a-gambar hanya ikan dan emoji (${m[1].trim()})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k1b5c.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K1B5C/.test(pb) && /VIDEO_LUAR_K1B5C/.test(pb) && /export function VideoK1B5C/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿"), "video-k1b5c.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
