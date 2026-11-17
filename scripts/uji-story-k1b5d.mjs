// Uji Story Kelas 1 Bab 5 Sub-Bab D "Lapak Ikan Dibuka" (membandingkan dan mengurutkan bilangan), akhir cerita Akuarium Ikan Hias Abang: video materi dan video metode global.
// Bagian umum sama dengan uji Sub-Bab B; bagian khusus memeriksa pembukaan lapak, pasangkan satu-satu (lebih banyak, lebih sedikit, sama banyak),
// puluhan dibandingkan dulu, paling banyak dan paling sedikit, urutan dan garis bilangan, pesanan Pak RT dan tetangga, lapak dibuka (akhir cerita bab),
// bilangan yang diucapkan tampak sebagai angka, dan tiga metode global (One-to-One Matching, Cube Towers, Number Line Order).
// Jalankan: node --no-warnings scripts/uji-story-k1b5d.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k1b5d-video.ts");
const U1 = await import("../src/components/modul/story/k1b5d-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K1B5D, V.VIDEO_LUAR_K1B5D];
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



/* ------------------------------ Khusus Sub-Bab D Bab 5 ------------------------------ */
const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
const G = await import("../src/components/modul/story/k1b5d-gambar.ts");
const M_VIDEO = V.VIDEO_MATERI_K1B5D;
const U = V.VIDEO_LUAR_K1B5D;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const hitung = (objs, p) => objs.filter((o) => new RegExp(`^${p}\\d+$`).test(o.id)).length;
const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
const tidakAda = (objs, ...ids) => ids.every((id) => !ketemu(objs, id));
const sorot = (objs, ...ids) => ids.every((id) => ketemu(objs, id)?.sorot);
const rentang = (dari, sampai) => (dari <= sampai ? Array.from({ length: sampai - dari + 1 }, (_, i) => dari + i) : Array.from({ length: dari - sampai + 1 }, (_, i) => dari - i));

// Bilangan yang diucapkan (satu sampai dua puluh, belasan dibaca utuh) dibaca dari suara.
const SATUAN = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
const POLA_BIL = /\b(sebelas|(?:satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan) belas|dua puluh|sepuluh|satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan)\b/g;
const nilaiBil = (m) => (m === "sebelas" ? 11 : m === "dua puluh" ? 20 : m === "sepuluh" ? 10 : m.endsWith(" belas") ? 10 + SATUAN[m.split(" ")[0]] : SATUAN[m]);
const bilanganSuara = (s) => [...s.toLowerCase().matchAll(POLA_BIL)].map((m) => nilaiBil(m[1]));
sama(bilanganSuara("Dua belas, tiga belas, sebelas, sepuluh dan satu, dua puluh, kedua, keduanya, satuannya."), [12, 13, 11, 10, 1, 20], "pembaca bilangan suara");
{
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!/One-to-One|Cube Towers|Number Line Order|Menara Kubus|Urut di Garis Bilangan|metode global/i.test(materi) && !/Pasangkan Satu-Satu/.test(materi), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["One-to-One Matching", "Cube Towers", "Number Line Order"], ["Pasangkan Satu-Satu", "Menara Kubus", "Urut di Garis Bilangan"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Lapak Ikan Dibuka" && U.judul === M_VIDEO.judul && V.JUDUL_K1B5D === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k1b5d-materi" && U.id === "k1b5d-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,pembukaan,pasangan,puluhan-dulu,paling,urut,pesanan,lapak-buka,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-pasang,luar-pasang-terapan,luar-menara,luar-menara-terapan,luar-garis,luar-garis-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46) && U.adegan.every((a) => /Metode global|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "label sumber");
  const TERLARANG = /buku|panduan guru|kunci|rubrik|latihan|soal|kelas|teman|kelompok|skor|nilai/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
  cek(!/tebak/i.test(materi) && !/tebak/i.test(luar), "video tanpa tebak-tebakan");
  // Bab 5: tanpa kali dan bagi, tanpa lambang lebih besar atau lebih kecil, angka paling besar dua puluh.
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan) {
      for (const kt of a.ketukan) cek(!/\b(kali|dikali|bagi|dibagi|perkalian|pembagian)\b/i.test(kt.suara), `${v.id}/${a.id}: suara tanpa kali dan bagi`);
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
  for (const n of [1, 3, 9, 12, 13, 15, 16, 18, 19, 20]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  for (const kata of ["Igil", "Kaka", "Abang", "Mamah", "Pak RT", "lapak", "akuarium", "guppy", "koki", "neon", "pasang", "lebih banyak", "lebih sedikit", "paling banyak", "paling sedikit", "puluhan", "satuan", "terkecil", "terbesar", "garis bilangan", "pesanan", "spanduk", "pita"])
    cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/Malosi/i, /\bKira\b/, /\bUpe\b/, /\bWei\b/, /Halim/i, /kebun/i, /bibit/i, /sekolah/i, /burung hantu/i, /piknik/i, /kereta/i, /Nenek/i, /festival/i, /kardus/i, /\bTika\b/i, /ulat/i, /tangga bilangan/i, /kelereng/i, /rak akuarium/i, /label nomor/i])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/membandingkan dan mengurutkan bilangan/.test(sapa.ketukan[0].suara) && ["Membandingkan kumpulan", "Paling banyak, paling sedikit", "Mengurutkan bilangan"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
}
{
  // 1. Pembukaan: spanduk, antrean pembeli, Pak RT, dua akuarium, pasangkan satu ikan dengan satu ikan.
  const p = adegan(M_VIDEO, "pembukaan");
  const p0 = akhirAdegan(p, 0);
  sama([isiTeks(p0, "sp-t0"), hitung(p0, "q"), ada(p0, "ab", "gg", "rm")], ["LAPAK IKAN HIAS ABANG", 4, true], "pembukaan: spanduk, empat pembeli berbaris, Abang gugup");
  const p1 = akhirAdegan(p, 1);
  sama([hitung(p1, "agf"), hitung(p1, "akf"), ada(p1, "pr"), tidakAda(p1, "q0", "ab"), isiTeks(p1, "pl-t0")], [15, 12, true, true, "pilih yang lebih banyak"], "pembukaan: Pak RT memilih akuarium guppy lima belas atau koki dua belas");
  const p2 = akhirAdegan(p);
  sama([ada(p2, "kk", "pg0", "pg2"), isiTeks(p2, "pt-t0"), tidakAda(p2, "sl", "kr")], [true, "1 ikan dengan 1 ikan", true], "pembukaan: Kaka mengajak memasangkan satu ikan dengan satu ikan");
  // 2. Pasangan: guppy lima belas, koki dua belas, tiga guppy tersisa.
  const s = adegan(M_VIDEO, "pasangan");
  const pos15 = L.posisiKata(s.ketukan[0].suara, "belas");
  cek(hitung(L.keadaanStory(s, 0, pos15 - 1), "g") === 0 && hitung(L.keadaanStory(s, 0, pos15), "g") === 15, "pasangan: lima belas guppy muncul saat kata lima belas");
  const s0 = akhirAdegan(s, 0);
  sama([hitung(s0, "g"), hitung(s0, "o"), hitung(s0, "pg"), isiTeks(s0, "lg"), isiTeks(s0, "lo"), isiTeks(s0, "ps")], [15, 12, 12, "guppy: 15", "koki: 12", "1 guppy dengan 1 koki"], "pasangan: lima belas guppy, dua belas koki, dua belas garis");
  cek(rentang(0, 11).every((i) => ketemu(s0, `pg${i}`).x === ketemu(s0, `g${i}`).x && ketemu(s0, `pg${i}`).x === ketemu(s0, `o${i}`).x && ketemu(s0, `pg${i}`).y < ketemu(s0, `o${i}`).y && ketemu(s0, `pg${i}`).y + ketemu(s0, `pg${i}`).y2 < ketemu(s0, `o${i}`).y + 1), "pasangan: tiap garis menghubungkan guppy dan koki yang sejajar");
  const s1 = akhirAdegan(s, 1);
  cek(isiTeks(s1, "hb") === "pasangan habis di 12" && isiTeks(s1, "sa") === "sisa 3" && sorot(s1, "g12", "g13", "g14") && !sorot(s1, "g0", "g11"), "pasangan: habis di dua belas, tiga guppy tersisa disorot");
  const s2 = akhirAdegan(s);
  sama([isiTeks(s2, "lg"), isiTeks(s2, "lo"), isiTeks(s2, "bd")], ["guppy: 15, lebih banyak", "koki: 12, lebih sedikit", "15 lebih banyak daripada 12"], "pasangan: guppy lebih banyak, koki lebih sedikit");
  // 4. Puluhan dulu: sembilan dan tiga belas, Igil keliru, puluhan menentukan, lalu satuan.
  const t = adegan(M_VIDEO, "puluhan-dulu");
  const t0 = akhirAdegan(t, 0);
  sama([["r1p-t", "r1s-t", "r2p-t", "r2s-t"].map((id) => isiTeks(t0, id)).join(), isiTeks(t0, "r1-l"), isiTeks(t0, "r2-l"), isiTeks(t0, "bg-t0"), ada(t0, "ig", "x1"), isiTeks(t0, "hp"), isiTeks(t0, "hs")], ["0,9,1,3", "9 ikan", "13 ikan", "9 lebih besar dari 3!", true, "puluhan", "satuan"], "puluhan dulu: tabel nol sembilan dan satu tiga, Igil keliru");
  const t1 = akhirAdegan(t, 1);
  sama([ada(t1, "kk"), tidakAda(t1, "ig", "x1", "bg-k"), sorot(t1, "r1p-k", "r2p-k"), isiTeks(t1, "a2"), isiTeks(t1, "a1")], [true, true, true, "1 puluhan", "0 puluhan"], "puluhan dulu: Kaka menunjuk kolom puluhan");
  const t2 = akhirAdegan(t);
  sama([["r3p-t", "r3s-t", "r4p-t", "r4s-t"].map((id) => isiTeks(t2, id)).join(), isiTeks(t2, "r3-l"), isiTeks(t2, "r4-l"), sorot(t2, "r3s-k", "r4s-k"), ada(t2, "mk2"), tidakAda(t2, "r1-l", "r2-l", "mk"), isiTeks(t2, "sk-t0")], ["1,5,1,6", "15 ikan", "16 ikan", true, true, true, "puluhan sama: lihat satuan"], "puluhan dulu: puluhan sama, satuan menentukan, enam belas lebih banyak");
  // 5. Paling banyak dan paling sedikit: tiga akuarium delapan belas, sembilan, dan tiga belas.
  const g = adegan(M_VIDEO, "paling");
  const g0 = akhirAdegan(g, 0);
  sama([hitung(g0, "a0f"), hitung(g0, "a1f"), hitung(g0, "a2f"), ["a0-n", "a1-n", "a2-n"].map((id) => isiTeks(g0, id)).join(), isiTeks(g0, "jud")], [18, 9, 13, "18,9,13", "3 akuarium"], "paling: tiga akuarium berisi delapan belas, sembilan, dan tiga belas ikan");
  const g1 = akhirAdegan(g, 1);
  sama([ada(g1, "mk", "tn"), isiTeks(g1, "b0"), isiTeks(g1, "b1"), isiTeks(g1, "pb"), isiTeks(g1, "ps"), sorot(g1, "a0")], [true, "1 puluhan, 8 satuan", "belum ada puluhan", "paling banyak", "paling sedikit", true], "paling: delapan belas paling banyak, sembilan paling sedikit");
  const g2 = akhirAdegan(g);
  sama([["pp-t0", "pp-t1", "pp-t2"].map((id) => isiTeks(g2, id)).join(), sorot(g2, "a2"), ada(g2, "kk", "ct"), tidakAda(g2, "b0", "b1")], ["paling banyak: 18,tengah: 13,paling sedikit: 9", true, true, true], "paling: tiga belas di tengah, Kaka mencatat di papan");
  // 6. Urut: kartu sembilan, tiga belas, delapan belas lalu kebalikannya, dan garis bilangan.
  const u = adegan(M_VIDEO, "urut");
  const xKartu = (objs, n) => ketemu(objs, `c${n}-k`).x;
  const u0 = akhirAdegan(u, 0);
  cek(xKartu(u0, 9) < xKartu(u0, 13) && xKartu(u0, 13) < xKartu(u0, 18) && isiTeks(u0, "cp") === "dari paling sedikit" && isiTeks(u0, "ar") === "makin banyak" && ketemu(u0, "pa").x2 > 0, "urut: dari paling sedikit, sembilan, tiga belas, delapan belas");
  const u1 = akhirAdegan(u, 1);
  cek(xKartu(u1, 18) < xKartu(u1, 13) && xKartu(u1, 13) < xKartu(u1, 9) && isiTeks(u1, "cp") === "dari terbanyak" && isiTeks(u1, "ar") === "makin sedikit" && ketemu(u1, "pa").x2 < 0, "urut: kebalikannya, delapan belas, tiga belas, sembilan");
  const tukar = L.posisiKata(u.ketukan[1].suara, "belas");
  cek(xKartu(L.keadaanStory(u, 1, tukar - 1), 18) === xKartu(u0, 18) && xKartu(L.keadaanStory(u, 1, 9999), 18) === 40, "urut: kartu bertukar tempat saat kata delapan belas");
  const u2 = akhirAdegan(u);
  cek(hitung(u2, "gb-a") === 21 && rentang(0, 20).every((n) => isiTeks(u2, `gb-a${n}`) === String(n)) && [9, 13, 18].every((n) => ketemu(u2, `m${n}`).x === G.xGB(n) && isiTeks(u2, `m${n}-n`) === String(n)) && isiTeks(u2, "kc") === "lebih kecil: kiri" && isiTeks(u2, "bs") === "lebih besar: kanan" && ketemu(u2, "pk").x2 < 0 && ketemu(u2, "pb").x2 > 0, "urut: garis bilangan, yang kecil di kiri dan yang besar di kanan");
  // 7. Pesanan: enam belas guppy (kurang satu, ditambah satu), sembilan belas neon (dua puluh cukup).
  const o = adegan(M_VIDEO, "pesanan");
  const o0 = akhirAdegan(o, 0);
  sama([isiTeks(o0, "o1-t0"), isiTeks(o0, "o2-t0"), ada(o0, "pr", "tg")], ["Pak RT: 16 guppy", "Tetangga: 19 neon", true], "pesanan: enam belas guppy dan sembilan belas neon");
  const o1 = akhirAdegan(o, 1);
  const tempat = G.titikIsi(24, 100, 112, 15);
  sama([hitung(o1, "agf"), isiTeks(o1, "ag-n"), ketemu(o1, "ex").x, ketemu(o1, "ex").y, isiTeks(o1, "kg"), ada(o1, "ab")], [15, "16", tempat.x, tempat.y, "jadi 16: pas", true], "pesanan: guppy lima belas kurang satu, ikan tambahan masuk, jadi enam belas");
  const lagi = L.posisiKata(o.ketukan[1].suara, "lagi");
  const sebelumLompat = L.keadaanStory(o, 1, lagi - 1);
  cek(ketemu(sebelumLompat, "ex").x === 150 && isiTeks(sebelumLompat, "ag-n") === "15" && isiTeks(sebelumLompat, "kg") === "kurang 1", "pesanan: ikan tambahan melompat masuk setelah kata lagi");
  const o2 = akhirAdegan(o);
  sama([hitung(o2, "anf"), isiTeks(o2, "an-n"), isiTeks(o2, "lb"), ada(o2, "ok")], [20, "20", "20 lebih banyak dari 19", true], "pesanan: neon dua puluh lebih banyak daripada sembilan belas, cukup");
  // 8. Lapak dibuka (akhir cerita bab).
  const l = adegan(M_VIDEO, "lapak-buka");
  const l0 = akhirAdegan(l, 0);
  sama([ada(l0, "mm", "pt", "gt", "lp", "v1", "v2"), isiTeks(l0, "c1-t0"), isiTeks(l0, "c2-t0")], [true, "Pak RT: 16 guppy", "Tetangga: 19 neon"], "lapak buka: semua pesanan terlayani, Mamah menggunting pita");
  const l1 = akhirAdegan(l, 1);
  sama([ada(l1, "pa", "pb", "ps", "tp"), tidakAda(l1, "pt", "gt"), isiTeks(l1, "bk-t0"), hitung(l1, "kf"), isiTeks(l1, "jud")], [true, true, "BUKA", 10, "Lapak Ikan Hias Abang dibuka!"], "lapak buka: pita putus, papan BUKA, konfeti, pembeli bertepuk tangan");
  const l2 = akhirAdegan(l);
  sama([ada(l2, "ig", "kk", "kk-pita", "ab", "s0", "s1", "s2", "pn", "lp2"), isiTeks(l2, "kt-t0"), tidakAda(l2, "mm", "bk-k")], [true, "1 kantong", true], "lapak buka: tiga tokoh tersenyum, dari satu kantong guppy menjadi lapak ramai");
  // 9. Penutup.
  const q = akhirAdegan(adegan(M_VIDEO, "penutup"), 1);
  sama(["p0a", "p0b", "p1a", "p1b", "p2a", "p3a"].map((id) => isiTeks(q, id)), ["pasangkan 1 dengan 1", "membandingkan", "puluhan dulu, baru satuan", "13 dan 9", "paling banyak, paling sedikit", "urutan: terkecil atau terbesar"], "penutup: ringkasan pasangan, puluhan dulu, paling, urutan");
  const q2 = akhirAdegan(adegan(M_VIDEO, "penutup"));
  cek(hitung(q2, "qaf") === 18 && hitung(q2, "qbf") === 9 && hitung(q2, "qcf") === 13 && ada(q2, "ig", "kk", "kk-pita", "ab", "mm", "qt"), "penutup: tiga akuarium dan empat tokoh");
}
{
  // Pembuka metode global.
  const op = adegan(U, "luar-pembuka");
  sama([isiTeks(akhirAdegan(op, 0), "pk-t0"), ada(akhirAdegan(op, 0), "tg", "kr", "ab", "lp")], ["3 cara membandingkan", true], "global pembuka: tetangga membawa kertas lomba, tiga cara");
  sama(["m0-t0", "m1-t0", "m2-t0"].map((id) => isiTeks(akhirAdegan(op, 1), id)), ["1. One-to-One Matching", "2. Cube Towers", "3. Number Line Order"], "global pembuka: tiga nama metode");
  sama(["n0-t0", "n1-t0", "n2-t0"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Pasangkan Satu-Satu", "2. Menara Kubus", "3. Urut di Garis Bilangan"], "global pembuka: tiga nama bahasa Indonesia");
  const op3 = akhirAdegan(op);
  sama([hitung(op3, "saf"), hitung(op3, "sbf"), isiTeks(op3, "sk-t0"), isiTeks(op3, "ss-t0")], [15, 12, "lebih banyak", "lebih sedikit"], "global pembuka: lebih banyak dan lebih sedikit");
  // One-to-One Matching.
  const pc = adegan(U, "luar-pasang");
  const c0 = akhirAdegan(pc, 0);
  sama([hitung(c0, "a"), hitung(c0, "b"), hitung(c0, "pg"), isiTeks(c0, "kp"), isiTeks(c0, "ps")], [4, 4, 4, "2 kumpulan", "1 dengan 1"], "One-to-One Matching: dua kumpulan, satu dengan satu");
  const c1 = akhirAdegan(pc, 1);
  sama([hitung(c1, "a"), hitung(c1, "b"), hitung(c1, "pg"), sorot(c1, "a4", "a5"), isiTeks(c1, "sm"), isiTeks(c1, "sl")], [6, 4, 4, true, "punya pasangan: sama banyak", "sisa: lebih banyak"], "One-to-One Matching: sisa tanpa pasangan lebih banyak");
  const c2 = akhirAdegan(pc, 2);
  cek(sorot(c2, "b0", "b3") && isiTeks(c2, "sd-t0") === "koki: lebih sedikit" && isiTeks(c2, "hd2") === "habis lebih dulu", "One-to-One Matching: yang habis lebih dulu lebih sedikit");
  const c3 = akhirAdegan(pc);
  sama([hitung(c3, "a"), hitung(c3, "b"), hitung(c3, "pg"), isiTeks(c3, "sb-t0")], [5, 5, 5, "sama banyak"], "One-to-One Matching: semua berpasangan sama banyak");
  const pt = adegan(U, "luar-pasang-terapan");
  const d0 = akhirAdegan(pt, 0);
  sama([hitung(d0, "g"), hitung(d0, "n"), hitung(d0, "pg"), isiTeks(d0, "lg"), isiTeks(d0, "ln")], [15, 20, 15, "guppy: 15", "neon: 20"], "One-to-One Matching terapan: guppy lima belas dengan neon dua puluh");
  const d1 = akhirAdegan(pt, 1);
  sama([sorot(d1, "n15", "n19"), !sorot(d1, "n14"), isiTeks(d1, "sa"), isiTeks(d1, "ln")], [true, true, "sisa 5", "neon: 20, lebih banyak"], "One-to-One Matching terapan: lima neon tanpa pasangan");
  const d2 = akhirAdegan(pt, 2);
  sama([hitung(d2, "c"), hitung(d2, "o"), hitung(d2, "pg"), isiTeks(d2, "sb-t0")], [12, 12, 12, "sama banyak"], "One-to-One Matching terapan: cupang dan koki sama banyak");
  sama([isiTeks(akhirAdegan(pt, 3), "jl-t0"), isiTeks(akhirAdegan(pt, 3), "lm-t0")], ["jelas, tanpa menghitung", "lama bila sangat banyak"], "One-to-One Matching terapan: jelas tetapi lama");
  // Cube Towers.
  const mc = adegan(U, "luar-menara");
  const e0 = akhirAdegan(mc, 0);
  sama([hitung(e0, "ta"), hitung(e0, "tb")], [5, 3], "Cube Towers: dua menara kubus");
  const e1 = akhirAdegan(mc, 1);
  sama([isiTeks(e1, "sk-t0"), isiTeks(e1, "lt1"), sorot(e1, "ta0", "ta4")], ["1 kubus untuk 1 benda", "lebih tinggi: lebih banyak", true], "Cube Towers: satu kubus untuk satu benda, lebih tinggi lebih banyak");
  const e2 = akhirAdegan(mc, 2);
  sama([hitung(e2, "ta"), hitung(e2, "tb"), isiTeks(e2, "lt1")], [5, 5, "sama tinggi: sama banyak"], "Cube Towers: sama tinggi sama banyak");
  const e3 = akhirAdegan(mc);
  const puncakMenara = (objs, id, n) => Math.min(...rentang(0, n - 1).map((i) => ketemu(objs, `${id}${i}`).y));
  cek([hitung(e3, "ma"), hitung(e3, "mb"), hitung(e3, "mc")].join() === "12,6,9" && puncakMenara(e3, "ma", 12) < puncakMenara(e3, "mc", 9) && puncakMenara(e3, "mc", 9) < puncakMenara(e3, "mb", 6) && ada(e3, "mk", "tn") && isiTeks(e3, "tt") === "tertinggi" && isiTeks(e3, "tr") === "terendah", "Cube Towers: berdampingan, tertinggi dan terendah");
  const mt = adegan(U, "luar-menara-terapan");
  const f0 = akhirAdegan(mt, 0);
  sama([hitung(f0, "t18"), hitung(f0, "t9"), hitung(f0, "t13"), ["l18", "l9", "l13"].map((id) => isiTeks(f0, id)).join(), isiTeks(f0, "tm")], [18, 9, 13, "18,9,13", "3 menara"], "Cube Towers terapan: menara delapan belas, sembilan, tiga belas");
  const f1 = akhirAdegan(mt, 1);
  cek(ada(f1, "mk", "tn", "pt", "pr") && sorot(f1, "t180", "t90") && isiTeks(f1, "pt") === "paling tinggi" && isiTeks(f1, "pr") === "paling rendah", "Cube Towers terapan: delapan belas paling tinggi, sembilan paling rendah");
  const f2 = akhirAdegan(mt, 2);
  const pusat = (objs, id) => ketemu(objs, `${id}0`).x + G.KUBUS.w / 2;
  cek(pusat(f2, "t9") === 90 && pusat(f2, "t13") === 160 && pusat(f2, "t18") === 230 && ketemu(f2, "l9").x === 90 && ketemu(f2, "l13").x === 160 && ketemu(f2, "l18").x === 230 && ada(f2, "kk") && tidakAda(f2, "ig", "mk", "tn"), "Cube Towers terapan: menara diurutkan dari terendah ke tertinggi");
  cek(ada(akhirAdegan(mt), "cc-t0", "bb") && isiTeks(akhirAdegan(mt), "bb") === "butuh banyak kubus", "Cube Towers terapan: cocok untuk paling banyak dan urutan, butuh banyak kubus");
  // Number Line Order.
  const gc = adegan(U, "luar-garis");
  const h0 = akhirAdegan(gc, 0);
  cek(hitung(h0, "gb-a") === 21 && isiTeks(h0, "rg") === "dari 0 sampai 20" && sorot(h0, "gb-a0", "gb-a20"), "Number Line Order: garis nol sampai dua puluh");
  const h1 = akhirAdegan(gc, 1);
  cek(ketemu(h1, "p9").x === G.xGB(9) && ketemu(h1, "p18").x === G.xGB(18) && ketemu(h1, "pk").x2 < 0 && ketemu(h1, "pb").x2 > 0 && isiTeks(h1, "kc") === "lebih kecil: kiri" && isiTeks(h1, "bs") === "lebih besar: kanan", "Number Line Order: kecil di kiri, besar di kanan");
  const h2 = akhirAdegan(gc, 2);
  cek(ketemu(h2, "p13").x === G.xGB(13) && ketemu(h2, "pr").x2 > 0 && isiTeks(h2, "so") === "terkecil: 9, 13, 18" && tidakAda(h2, "pk", "pb"), "Number Line Order: terkecil dibaca dari kiri ke kanan");
  const h3 = akhirAdegan(gc);
  cek(ketemu(h3, "pl").x2 < 0 && isiTeks(h3, "sb") === "terbesar: 18, 13, 9" && tidakAda(h3, "pr", "so"), "Number Line Order: terbesar dibaca dari kanan ke kiri");
  const gt = adegan(U, "luar-garis-terapan");
  const i0 = akhirAdegan(gt, 0);
  cek(ketemu(i0, "p16").x === G.xGB(16) && ketemu(i0, "p19").x === G.xGB(19) && isiTeks(i0, "n16") === "Pak RT" && isiTeks(i0, "n19") === "Tetangga", "Number Line Order terapan: pesanan enam belas dan sembilan belas ditandai");
  const i1 = akhirAdegan(gt, 1);
  cek(ketemu(i1, "pa").x2 < 0 && sorot(i1, "p16") && isiTeks(i1, "kt") === "16 di kiri 19: lebih sedikit", "Number Line Order terapan: enam belas di kiri sembilan belas, lebih sedikit");
  const sk = gt.ketukan[1];
  const aksiKt = sk.aksi.find((a) => (Array.isArray(a.tambah) ? a.tambah : [a.tambah]).some((o) => o?.id === "kt"));
  cek(aksiKt !== undefined && L.posisiKata(sk.suara, aksiKt.at) >= 0 && L.posisiKata(sk.suara, aksiKt.at) < L.kataDari(sk.suara).length - 1 && L.keadaanStory(gt, 1, L.kataDari(sk.suara).length - 2).some((o) => o.id === "kt"), "Number Line Order terapan: teks kesimpulan muncul sebelum kata terakhir ketukan");
  const i2 = akhirAdegan(gt, 2);
  cek([12, 15, 20].every((n) => ketemu(i2, `p${n}`).x === G.xGB(n) && ketemu(i2, `p${n}`).sorot) && tidakAda(i2, "p16", "p19") && isiTeks(i2, "ur") === "dari terkecil: 12, 15, 20", "Number Line Order terapan: dua belas, lima belas, dua puluh dari terkecil");
  sama([isiTeks(akhirAdegan(gt), "cp-t0"), isiTeks(akhirAdegan(gt), "kb-t0")], ["paling cepat untuk mengurutkan", "kurang menunjukkan bendanya"], "Number Line Order terapan: paling cepat, kurang menunjukkan benda");
  const rk = akhirAdegan(adegan(U, "luar-ringkas"));
  sama(["r0-t0", "r1-t0", "r2-t0"].map((id) => isiTeks(rk, id)), U1.NAMA_METODE, "ringkasan: tiga metode");
  sama([isiTeks(rk, "lm-t0"), ada(rk, "tq")], ["5 akuarium: alat mana?", true], "ringkasan: lima akuarium, alat mana yang paling cepat");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k1b5d-.*\.ts$/.test(f));
  cek(berkas.length >= 8, `berkas story k1b5d (${berkas.length})`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k1b1a-[a-z0-9-]+|k1b4a-gambar|k1b5a-gambar|k1b5d-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, k1b1a, k1b4a-gambar, k1b5a-gambar, atau k1b5d (${impor.join(", ")})`);
    // Gambar baru: dari Sub-Bab A hanya bentuk dasar ikan dan daftar emoji.
    for (const m of s.matchAll(/(?:import|export) \{([^}]+)\} from "\.\/k1b5a-gambar"/g)) cek(m[1].split(",").map((x) => x.trim()).every((x) => /^(E as E_5A|ikan)$/.test(x)), `${f}: dari k1b5a-gambar hanya ikan dan emoji (${m[1].trim()})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k1b5d.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K1B5D/.test(pb) && /VIDEO_LUAR_K1B5D/.test(pb) && /export function VideoK1B5D/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿"), "video-k1b5d.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
