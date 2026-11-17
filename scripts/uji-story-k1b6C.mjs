// Uji Story Kelas 1 Bab 6 Sub-Bab C "Tutup Pasar Malam" (pengurangan sampai dua puluh), akhir cerita Pasar Malam Kampung: video materi dan video metode global.
// Bagian umum sama dengan uji Bab 5; bagian khusus memeriksa lonceng penutup, lupa puluhan, hitung mundur, balon lepas, periksa dengan menambah, pilih cara,
// perayaan akhir cerita, bilangan yang diucapkan tampak sebagai angka, dan tiga metode global (Think Addition, Fact Family, Subtract Through Ten).
// Jalankan: node --no-warnings scripts/uji-story-k1b6C.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k1b6C-video.ts");
const U1 = await import("../src/components/modul/story/k1b6C-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K1B6C, V.VIDEO_LUAR_K1B6C];
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



/* ------------------------------ Khusus Sub-Bab C Bab 6 ------------------------------ */
const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
const G = await import("../src/components/modul/story/k1b6C-gambar.ts");
const M_VIDEO = V.VIDEO_MATERI_K1B6C;
const U = V.VIDEO_LUAR_K1B6C;
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
const pudar = (objs, ...ids) => ids.every((id) => (ketemu(objs, id)?.op ?? 1) < 0.5);

// Bilangan yang diucapkan (satu sampai dua puluh, belasan dibaca utuh) dibaca dari suara.
const SATUAN = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
const POLA_BIL = /\b(sebelas|(?:satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan) belas|dua puluh|sepuluh|satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan)\b/g;
const nilaiBil = (m) => (m === "sebelas" ? 11 : m === "dua puluh" ? 20 : m === "sepuluh" ? 10 : m.endsWith(" belas") ? 10 + SATUAN[m.split(" ")[0]] : SATUAN[m]);
const bilanganSuara = (s) => [...s.toLowerCase().matchAll(POLA_BIL)].map((m) => nilaiBil(m[1]));
sama(bilanganSuara("Dua belas, tiga belas, sebelas, sepuluh dan satu, dua puluh, kedua, keduanya, satuannya."), [12, 13, 11, 10, 1, 20], "pembaca bilangan suara");
{
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!/Think Addition|Fact Family|Subtract Through Ten|Pikir Penjumlahan|Keluarga Kalimat|Kurangi Lewat Sepuluh|metode global/i.test(materi), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Think Addition", "Fact Family", "Subtract Through Ten"], ["Pikir Penjumlahan", "Keluarga Kalimat", "Kurangi Lewat Sepuluh"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Tutup Pasar Malam" && U.judul === M_VIDEO.judul && V.JUDUL_K1B6C === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k1b6C-materi" && U.id === "k1b6C-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,lonceng,lupa-puluhan,mundur,balon,periksa,pilih-cara,perayaan,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-pikir,luar-pikir-terapan,luar-keluarga,luar-keluarga-terapan,luar-lewat,luar-lewat-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46) && U.adegan.every((a) => /Metode global|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "label sumber");
  const TERLARANG = /buku|panduan guru|kunci|rubrik|latihan|soal|kelas|teman|kelompok|skor|nilai/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
  cek(!/tebak/i.test(materi) && !/tebak/i.test(luar), "video tanpa tebak-tebakan");
  // Bab 6: tanpa kali dan bagi; lambang hitung = dan - boleh, tetapi tanpa lebih besar atau lebih kecil; angka paling besar dua puluh.
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan) {
      for (const kt of a.ketukan) cek(!/\b(kali|dikali|bagi|dibagi|perkalian|pembagian)\b/i.test(kt.suara), `${v.id}/${a.id}: suara tanpa kali dan bagi`);
      for (const [i] of a.ketukan.entries())
        for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) {
          cek(!/[<>×÷]/.test(t), `${v.id}/${a.id}#${i + 1}: tanpa lambang lebih besar, lebih kecil, kali, bagi ("${t}")`);
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
  for (const n of [1, 3, 4, 5, 6, 10, 12, 13, 14, 15, 16, 17, 18]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  for (const kata of ["Igil", "Kaka", "Abang", "Mamah", "Pak RT", "lampion", "lonceng", "laporan", "kue", "balon", "garis bilangan", "mundur", "puluhan", "satuan", "menambah", "diperiksa", "dagangan", "nampan", "sisa", "tetap"])
    cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/akuarium/i, /guppy/i, /\bkoki\b/i, /kebun/i, /bibit/i, /kereta/i, /Nenek/i, /festival/i, /kardus/i, /Malosi/i, /\bUpe\b/, /\bWei\b/, /burung hantu/i, /rak akuarium/i])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/pengurangan sampai dua puluh/.test(sapa.ketukan[0].suara) && ["Menghitung mundur", "Mengurangi satuan dulu", "Memeriksa dengan menambah"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  // Naskah tetap: suara dipindah apa adanya dari naskah/story-naskah-k1b6c.md (kata demi kata, urut).
  const naskah = readFileSync(new URL("../naskah/story-naskah-k1b6c.md", import.meta.url), "utf8");
  const [bm, bg] = naskah.split("## Video metode global");
  const kal = (t) => [...t.matchAll(/^\s+- "(.*)"$/gm)].map((m) => m[1]).join(" ").split(/\s+/).join(" ");
  const suaraBlok = (v) => v.adegan.filter((a) => a.id !== "sapaan").map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ").split(/\s+/).join(" ");
  cek(suaraBlok(M_VIDEO) === kal(bm), "suara video materi sama persis dengan naskah tetap");
  { const A = kal(bg).split(" "); const B = suaraBlok(U).split(" "); let d = 0; while (d < A.length && A[d] === B[d]) d += 1; cek(d === A.length && A.length === B.length, "suara video metode global sama persis dengan naskah tetap (beda di kata " + d + ": " + A.slice(d - 2, d + 3).join(" ") + " | " + B.slice(d - 2, d + 3).join(" ") + ")"); }
}
{
  // 1. Lonceng: lampu padam satu per satu, Pak RT meminta laporan, enam belas kue dimakan tiga.
  const l = adegan(M_VIDEO, "lonceng");
  const l0 = akhirAdegan(l, 0);
  sama([hitung(l0, "lp"), pudar(l0, "lp0", "lp1", "lp2"), pudar(l0, "lp3"), ada(l0, "lc", "n1", "n2")], [4, true, false, true], "lonceng: empat lampu, tiga padam, lonceng");
  const l1 = akhirAdegan(l, 1);
  sama([ada(l1, "pr", "pp", "lap-k", "sl", "hl"), isiTeks(l1, "lap-t0"), tidakAda(l1, "lc", "lp0")], [true, "LAPORAN", true], "lonceng: Pak RT dengan papan laporan, salah lapor");
  const l2a = L.keadaanStory(l, 2, 9999);
  const l2 = akhirAdegan(l);
  sama([hitung(l2, "ku"), isiTeks(l2, "n16-t0"), isiTeks(l2, "dm"), isiTeks(l2, "tg"), ada(l2, "mm", "an", "nm")], [16, "16 kue", "dimakan 3", "tinggal ?", true], "lonceng: enam belas kue, dimakan tiga, tinggal berapa");
  cek(ketemu(l2a, "ku13").x === 262 && ketemu(l2a, "ku15").x === 262 && ketemu(l2a, "ku12").x < 220, "lonceng: tiga kue pindah ke anak yang makan");
  const belas = L.posisiKata(l.ketukan[2].suara, "belas");
  cek(hitung(L.keadaanStory(l, 2, belas - 1), "ku") === 0 && hitung(L.keadaanStory(l, 2, belas), "ku") === 16, "lonceng: enam belas kue muncul saat kata enam belas");
  // 2. Lupa puluhan.
  const p = adegan(M_VIDEO, "lupa-puluhan");
  const p0 = akhirAdegan(p, 0);
  sama([hitung(p0, "ru"), hitung(p0, "ls"), isiTeks(p0, "jw-t0"), isiTeks(p0, "pl"), isiTeks(p0, "sc"), ada(p0, "ig", "bk")], [10, 6, "6 – 3 = 3", "1 puluhan", "sisa 3", true], "lupa puluhan: sepuluh berikat, enam lepas, Igil menjawab tiga");
  const p1 = akhirAdegan(p, 1);
  sama([ada(p1, "kk", "x1", "hp"), tidakAda(p1, "jw-k"), sorot(p1, "bk"), isiTeks(p1, "sc")], [true, true, true, "sisa 3?"], "lupa puluhan: Kaka menunjuk nampan masih penuh");
  const p2 = akhirAdegan(p);
  sama([isiTeks(p2, "pn-t0"), isiTeks(p2, "sc"), pudar(p2, "ls3", "ls4", "ls5"), pudar(p2, "ls0"), tidakAda(p2, "x1", "hp")], ["10 + 3 = 13", "sisa 13", true, false, true], "lupa puluhan: sepuluh ditambah tiga sama dengan tiga belas");
  // 3. Mundur.
  const m = adegan(M_VIDEO, "mundur");
  const m0 = akhirAdegan(m, 0);
  sama([hitung(m0, "gb-a"), ketemu(m0, "mk").x, isiTeks(m0, "ks-t0"), isiTeks(m0, "tg")], [21, G.xGB(15), "15 – 3 = ?", "mundur 3"], "mundur: garis bilangan, mulai lima belas");
  const m1 = akhirAdegan(m, 1);
  sama([[1, 2, 3].map((i) => isiTeks(m1, `h${i}n`)).join(), [1, 2, 3].map((i) => ketemu(m1, `h${i}`).x2 < 0).join(), tidakAda(m1, "tg")], ["14,13,12", "true,true,true", true], "mundur: tiga lompatan mundur 14, 13, 12");
  const sebelum = L.posisiKata(m.ketukan[1].suara, "dua");
  cek(tidakAda(L.keadaanStory(m, 1, sebelum - 1), "h3") && ada(L.keadaanStory(m, 1, sebelum), "h3"), "mundur: lompatan ketiga muncul saat kata dua belas");
  const m2 = akhirAdegan(m);
  sama([isiTeks(m2, "ks-t0"), ketemu(m2, "md").x, isiTeks(m2, "cc-t0")], ["15 – 3 = 12", G.xGB(12), "cocok kalau yang diambil sedikit"], "mundur: mendarat di dua belas");
  // 4. Balon.
  const b = adegan(M_VIDEO, "balon");
  const b0 = akhirAdegan(b, 0);
  sama([hitung(b0, "bl"), isiTeks(b0, "b18-t0"), isiTeks(b0, "b4-t0"), ketemu(b0, "bl14").y < 60, ketemu(b0, "bl13").y > 60, ada(b0, "tg", "s0")], [18, "18 balon", "4 lepas", true, true, true], "balon: delapan belas balon, empat lepas dan terbang");
  const b1 = akhirAdegan(b, 1);
  sama([isiTeks(b1, "tb-p"), isiTeks(b1, "tb-s"), isiTeks(b1, "sk-t0"), sorot(b1, "tb-kp"), tidakAda(b1, "b18-k")], ["1", "4", "8 – 4 = 4", true, true], "balon: satuan delapan dikurangi empat, puluhan tetap satu");
  const b2 = akhirAdegan(b);
  sama([isiTeks(b2, "hs-t0"), ada(b2, "pr", "bc-k"), sorot(b2, "tb-ks")], ["18 – 4 = 14", true, true], "balon: sisa empat belas, Pak RT berseru");
  // 5. Periksa.
  const c = adegan(M_VIDEO, "periksa");
  const c0 = akhirAdegan(c, 0);
  sama([isiTeks(c0, "p1-t0"), isiTeks(c0, "p2-t0"), ada(c0, "pa", "c1", "mm")], ["16 – 3 = 13", "13 + 3 = 16", true], "periksa: enam belas kurang tiga dan tiga belas tambah tiga");
  const c1 = akhirAdegan(c, 1);
  sama([isiTeks(c1, "p3-t0"), isiTeks(c1, "p4-t0"), ada(c1, "c2", "pb")], ["18 – 4 = 14", "14 + 4 = 18", true], "periksa: pasangan kedua juga cocok");
  sama([isiTeks(akhirAdegan(c), "rg-t0"), ada(akhirAdegan(c), "jp")], ["hasil + diambil = semula", true], "periksa: aturan memeriksa");
  // 6. Pilih cara.
  const d = adegan(M_VIDEO, "pilih-cara");
  const d0 = akhirAdegan(d, 0);
  sama([isiTeks(d0, "kt-t0"), ada(d0, "c1", "c2", "mm", "tn")], ["17 – 5 = ?", true], "pilih cara: tujuh belas dikurangi lima, dua cara");
  const d1 = akhirAdegan(d, 1);
  sama([isiTeks(d1, "tb-p"), isiTeks(d1, "tb-s"), isiTeks(d1, "ks"), isiTeks(d1, "r1"), isiTeks(d1, "c1t"), ada(d1, "kk")], ["1", "2", "7 – 5 = 2", "hasil 12", "cara 1: satuan", true], "pilih cara: cara Kaka, satuan dikurangi");
  const d2 = akhirAdegan(d);
  sama([isiTeks(d2, "hl-t0"), isiTeks(d2, "c2t"), ketemu(d2, "ma").x2 < 0, [12, 13, 14, 15, 16, 17].every((n) => isiTeks(d2, `mg-a${n}`) === String(n)), ada(d2, "ab")], ["17 – 5 = 12", "cara 2: mundur", true, true, true], "pilih cara: cara Abang, mundur, hasilnya sama");
  // 7. Perayaan.
  const r = adegan(M_VIDEO, "perayaan");
  sama([ada(akhirAdegan(r, 0), "pp", "pr", "lp", "pl"), isiTeks(akhirAdegan(r, 0), "rp-t0")], [true, "Lapak paling rapi dan teliti"], "perayaan: Pak RT mengumumkan lapak paling teliti");
  const r1 = akhirAdegan(r, 1);
  sama([hitung(r1, "lm"), ada(r1, "ig", "kk", "ab", "mm", "tp"), hitung(r1, "s")], [4, true, 3], "perayaan: empat lampion dilepas, empat tokoh bertepuk tangan");
  const r2 = akhirAdegan(r);
  sama([isiTeks(r2, "dn-t0"), isiTeks(r2, "lk-t0"), isiTeks(r2, "sd-t0"), isiTeks(r2, "tt-t0"), ada(r2, "a0", "a1", "ig", "mm")], ["2 nampan kue", "loket karcis", "sisa dagangan", "TUTUP, TERIMA KASIH", true], "perayaan: semua terhitung, papan tutup");
  // 8. Penutup.
  const q = akhirAdegan(adegan(M_VIDEO, "penutup"), 1);
  sama(["r0-t0", "r1-t0", "r2-t0"].map((id) => isiTeks(q, id)), ["kurangi satuan dulu, puluhan tetap", "atau mundur sebanyak yang diambil", "periksa: tambah kembali hasilnya"], "penutup: tiga ringkasan");
  const q2 = akhirAdegan(adegan(M_VIDEO, "penutup"));
  cek(ada(q2, "ig", "kk", "ab", "mm", "w0", "w3", "rm") && tidakAda(q2, "r0-k"), "penutup: empat tokoh melambai");
}
{
  // Pembuka metode global.
  const op = adegan(U, "luar-pembuka");
  sama([isiTeks(akhirAdegan(op, 0), "pk-t0"), ada(akhirAdegan(op, 0), "mm", "kr", "ig", "lm2")], ["3 cara mengurang", true], "global pembuka: kertas lipat tiga cara");
  sama(["m0-t0", "m1-t0", "m2-t0"].map((id) => isiTeks(akhirAdegan(op, 1), id)), ["1. Think Addition", "2. Fact Family", "3. Subtract Through Ten"], "global pembuka: tiga nama metode");
  sama(["n0-t0", "n1-t0", "n2-t0"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Pikir Penjumlahan", "2. Keluarga Kalimat", "3. Kurangi Lewat Sepuluh"], "global pembuka: tiga nama bahasa Indonesia");
  sama([isiTeks(akhirAdegan(op), "sp"), isiTeks(akhirAdegan(op), "cs")], ["10", "mencari sisa"], "global pembuka: ketiganya mencari sisa");
  // Think Addition.
  const pk = adegan(U, "luar-pikir");
  const a0 = akhirAdegan(pk, 0);
  sama([isiTeks(a0, "pk-t0"), isiTeks(a0, "pj-t0"), ada(a0, "pi", "hd-k")], ["pengurangan", "penjumlahan", true], "Think Addition: pengurangan dipikirkan sebagai penjumlahan");
  const a1 = akhirAdegan(pk, 1);
  sama([hitung(a1, "bs"), isiTeks(a1, "ka-t0"), isiTeks(a1, "kb-t0"), isiTeks(a1, "q"), [0, 6, 7].map((i) => ketemu(a1, `bs${i}`).warna).join()], [15, "15 – 7 = ?", "7 + ? = 15", "?", `${G.W.langit},${G.W.langit},${"#FFFFFF"}`], "Think Addition: tujuh ditambah berapa sama dengan lima belas");
  const a2 = akhirAdegan(pk);
  sama([isiTeks(a2, "l8"), isiTeks(a2, "kb-t0"), isiTeks(a2, "ka-t0"), tidakAda(a2, "q"), ketemu(a2, "bs14").warna === G.W.pink, ada(a2, "sw", "bp")], ["8", "7 + 8 = 15", "15 – 7 = 8", true, true, true], "Think Addition: tujuh ditambah delapan, sisa delapan, berpasangan");
  const pt = adegan(U, "luar-pikir-terapan");
  const e0 = akhirAdegan(pt, 0);
  sama([hitung(e0, "bs"), isiTeks(e0, "ka-t0"), isiTeks(e0, "kb-t0"), isiTeks(e0, "l6")], [14, "14 – 6 = ?", "6 + ? = 14", "6"], "Think Addition terapan: empat belas dikurangi enam");
  const e1 = akhirAdegan(pt, 1);
  sama([isiTeks(e1, "kb-t0"), isiTeks(e1, "ka-t0"), isiTeks(e1, "cc-t0"), ada(e1, "ok")], ["6 + 8 = 14", "14 – 6 = 8", "cocok kalau yang diambil besar", true], "Think Addition terapan: cocok kalau yang diambil besar");
  const e2 = akhirAdegan(pt);
  sama([ada(e2, "x", "gb", "m1", "m2", "cp"), isiTeks(e2, "sk"), isiTeks(e2, "sd-t0"), tidakAda(e2, "bs0")], [true, "diambil sedikit", "19 – 2 = ?", true], "Think Addition terapan: kurang cocok kalau yang diambil sedikit, mundur lebih cepat");
  // Fact Family.
  const kc = adegan(U, "luar-keluarga");
  const f0 = akhirAdegan(kc, 0);
  sama([isiTeks(f0, "t3"), isiTeks(f0, "e4"), [isiTeks(f0, "sg-ut"), isiTeks(f0, "sg-at"), isiTeks(f0, "sg-bt")].join()], ["3 bilangan", "4 kalimat", "16,9,7"], "Fact Family: tiga bilangan, empat kalimat");
  const f1 = akhirAdegan(kc, 1);
  sama([isiTeks(f1, "f1-t0"), isiTeks(f1, "f2-t0"), sorot(f1, "sg-a", "sg-b", "sg-u")], ["9 + 7 = 16", "7 + 9 = 16", true], "Fact Family: dua kalimat penjumlahan");
  const f2 = akhirAdegan(kc, 2);
  sama([isiTeks(f2, "f3-t0"), isiTeks(f2, "f4-t0")], ["16 – 7 = 9", "16 – 9 = 7"], "Fact Family: dua kalimat pengurangan");
  const f3 = akhirAdegan(kc);
  sama([isiTeks(f3, "s1"), sorot(f3, "f1-k", "f2-k", "f3-k", "f4-k"), ada(f3, "bk")], ["1 kalimat", true, true], "Fact Family: satu kalimat membuka kalimat lainnya");
  const kt = adegan(U, "luar-keluarga-terapan");
  const g0 = akhirAdegan(kt, 0);
  sama([[isiTeks(g0, "sg-ut"), isiTeks(g0, "sg-at"), isiTeks(g0, "sg-bt")].join(), ada(g0, "kk")], ["12,5,7", true], "Fact Family terapan: Kaka punya dua belas, lima, tujuh");
  const g1 = akhirAdegan(kt, 1);
  sama([isiTeks(g1, "g1-t0"), isiTeks(g1, "g2-t0")], ["5 + 7 = 12", "12 – 5 = 7"], "Fact Family terapan: lima ditambah tujuh, dua belas dikurangi lima");
  const g2 = akhirAdegan(kt);
  sama([ada(g2, "ck", "tt"), isiTeks(g2, "pm-t0"), isiTeks(g2, "hf-t0")], [true, "bagus untuk memeriksa", "hafal 1 kalimat dulu"], "Fact Family terapan: bagus memeriksa, perlu hafal satu kalimat");
  // Subtract Through Ten.
  const lw = adegan(U, "luar-lewat");
  const h0 = akhirAdegan(lw, 0);
  sama([hitung(h0, "tf"), isiTeks(h0, "t10"), isiTeks(h0, "ss-t0")], [10, "10", "lalu kurangi sisanya"], "Subtract Through Ten: sampai sepuluh, lalu sisanya");
  const h1 = akhirAdegan(lw, 1);
  sama([ketemu(h1, "mk").x, ketemu(h1, "md").x, ketemu(h1, "h1").x2 < 0, isiTeks(h1, "h1n"), isiTeks(h1, "kl-t0")], [G.xGB(13), G.xGB(10), true, "kurangi 3", "13 – 5 = ?"], "Subtract Through Ten: tiga belas kurang tiga jadi sepuluh");
  const h2 = akhirAdegan(lw, 2);
  sama([ketemu(h2, "m8").x, ketemu(h2, "h2").x2 < 0, isiTeks(h2, "h2n"), isiTeks(h2, "kl-t0")], [G.xGB(8), true, "kurangi 2", "10 – 2 = 8"], "Subtract Through Ten: sepuluh kurang dua sama dengan delapan");
  const h3 = akhirAdegan(lw);
  sama([isiTeks(h3, "kl-t0"), isiTeks(h3, "jd-t0"), sorot(h3, "mk"), ada(h3, "ok")], ["13 – 5 = 8", "jadi sisa 8", true, true], "Subtract Through Ten: tiga belas dikurangi lima sama dengan delapan");
  const lt = adegan(U, "luar-lewat-terapan");
  const i0 = akhirAdegan(lt, 0);
  sama([ketemu(i0, "mk").x, ketemu(i0, "md").x, isiTeks(i0, "kl-t0"), isiTeks(i0, "h1n"), ada(i0, "ig")], [G.xGB(15), G.xGB(10), "15 – 7 = ?", "kurangi 5", true], "Subtract Through Ten terapan: lima belas dikurangi lima jadi sepuluh");
  const i1 = akhirAdegan(lt, 1);
  sama([ketemu(i1, "m8").x, isiTeks(i1, "kl-t0"), isiTeks(i1, "sc")], [G.xGB(8), "15 – 7 = 8", "sisa 8"], "Subtract Through Ten terapan: sisa delapan");
  sama([ada(akhirAdegan(lt, 2), "ok"), isiTeks(akhirAdegan(lt, 2), "cs-t0")], [true, "satuan 5, yang diambil 7"], "Subtract Through Ten terapan: cocok kalau satuan lebih kecil dari yang diambil");
  const i3 = akhirAdegan(lt);
  sama([isiTeks(i3, "sk-t0"), hitung(i3, "c"), ada(i3, "x"), isiTeks(i3, "pj")], ["19 – 2 = ?", 4, true, "langkahnya jadi panjang"], "Subtract Through Ten terapan: kurang cocok, langkah panjang");
  // Ringkasan.
  const rk = akhirAdegan(adegan(U, "luar-ringkas"));
  sama(["r0-t0", "r1-t0", "r2-t0"].map((id) => isiTeks(rk, id)), U1.NAMA_METODE, "ringkasan: tiga metode");
  sama([isiTeks(rk, "ph-t0"), isiTeks(rk, "lm"), tidakAda(rk, "g0", "t3")], ["14 – 9 = ?", "cara yang mana?", true], "ringkasan: empat belas dikurangi sembilan, cara yang mana");
  const rk2 = akhirAdegan(adegan(U, "luar-ringkas"), 2);
  sama([isiTeks(rk2, "g0"), isiTeks(rk2, "g1"), isiTeks(rk2, "g2"), isiTeks(rk2, "s10")], ["diambil besar", "untuk memeriksa", "satuan kurang", "10"], "ringkasan: kapan tiap metode cocok");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k1b6C-.*\.ts$/.test(f));
  cek(berkas.length >= 8 && !berkas.includes("k1b6C-materi-4.ts"), `berkas story k1b6C (${berkas.length})`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s) && !s.includes("⭐"), `${f}: tanpa kode emoji terlarang`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k1b1a-[a-z0-9-]+|k1b4a-gambar|k1b6C-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, k1b1a, k1b4a-gambar, atau k1b6C (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k1b6c.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K1B6C/.test(pb) && /VIDEO_LUAR_K1B6C/.test(pb) && /export function VideoK1B6C/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿"), "video-k1b6c.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
