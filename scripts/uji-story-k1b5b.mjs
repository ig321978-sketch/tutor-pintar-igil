// Uji Story Kelas 1 Bab 5 Sub-Bab B "Rak Akuarium Bernomor" (menghitung maju dan mundur), lanjutan cerita Akuarium Ikan Hias Abang: video materi dan video metode global.
// Bagian umum sama dengan uji Sub-Bab A; bagian khusus memeriksa rak dua tingkat bernomor satu sampai dua puluh, pakan maju dari delapan sampai lima belas,
// lampu mundur dari dua puluh sampai dua belas, sesudah, sebelum, dan di antara, label tiga belas dan tujuh belas yang jatuh, rak sebagai kisi,
// jembatan ke Sub-Bab C, bilangan yang diucapkan tampak sebagai angka, dan tiga metode global.
// Jalankan: node --no-warnings scripts/uji-story-k1b5b.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k1b5b-video.ts");
const U1 = await import("../src/components/modul/story/k1b5b-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K1B5B, V.VIDEO_LUAR_K1B5B];
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


/* ------------------------------ Khusus Sub-Bab B Bab 5 ------------------------------ */
const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
const G = await import("../src/components/modul/story/k1b5b-gambar.ts");
const M_VIDEO = V.VIDEO_MATERI_K1B5B;
const U = V.VIDEO_LUAR_K1B5B;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const hitung = (objs, p) => objs.filter((o) => new RegExp(`^${p}\\d+$`).test(o.id)).length;
const nomorDari = (objs, p) => objs.filter((o) => new RegExp(`^${p}\\d+$`).test(o.id)).map((o) => Number(o.id.slice(p.length))).sort((a, b) => a - b);
const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
const deretIsi = (objs, p, daftar) => daftar.map((n) => isiTeks(objs, `${p}${n}`)).join();
const rentang = (dari, sampai) => (dari <= sampai ? Array.from({ length: sampai - dari + 1 }, (_, i) => dari + i) : Array.from({ length: dari - sampai + 1 }, (_, i) => dari - i));
const NYALA = G.WARNA.lampuNyala;
const lampuNyala = (objs) => rentang(1, 20).filter((n) => ketemu(objs, `lm${n}`)?.warna === NYALA);

// Bilangan yang diucapkan (satu sampai dua puluh, belasan dibaca utuh) dibaca dari suara.
const SATUAN = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
const NAMA_SATUAN = Object.keys(SATUAN);
const POLA_BIL = /\b(sebelas|(?:satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan) belas|dua puluh|sepuluh|satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan)\b/g;
const nilaiBil = (m) => (m === "sebelas" ? 11 : m === "dua puluh" ? 20 : m === "sepuluh" ? 10 : m.endsWith(" belas") ? 10 + SATUAN[m.split(" ")[0]] : SATUAN[m]);
const bilanganSuara = (s) => [...s.toLowerCase().matchAll(POLA_BIL)].map((m) => nilaiBil(m[1]));
/** Nomor kata terakhir tiap nama bilangan dalam suara, dicari berurutan (sama seperti pemicu naskah). */
const posBilangan = (suara, daftar) => {
  const kata = L.kataDari(suara).map((w) => w.toLowerCase().replace(/[^a-z]/g, ""));
  const nama = (n) => (n === 10 ? "sepuluh" : n === 11 ? "sebelas" : n === 20 ? "dua puluh" : n > 11 ? `${NAMA_SATUAN[n - 11]} belas` : NAMA_SATUAN[n - 1]).split(" ");
  let dari = 0;
  return daftar.map((n) => {
    const w = nama(n);
    for (let i = dari; i + w.length <= kata.length; i += 1)
      if (w.every((x, j) => kata[i + j] === x)) {
        dari = i + w.length;
        return i + w.length - 1;
      }
    return -1;
  });
};
sama(bilanganSuara("Dua belas, tiga belas, sebelas, sepuluh dan satu, dua puluh, kedua, keduanya, satuannya."), [12, 13, 11, 10, 1, 20], "pembaca bilangan suara");
sama(posBilangan("Dua puluh, sembilan belas, sebelas.", [20, 19, 11]), [1, 3, 4], "pencari posisi bilangan");
{
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!/Number Line Hop|Number Grid|Before and After|Lompat di Garis Bilangan|Kisi Bilangan|Sebelum dan Sesudah|metode global/i.test(materi), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Number Line Hop", "Number Grid", "Before and After"], ["Lompat di Garis Bilangan", "Kisi Bilangan", "Sebelum dan Sesudah"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Rak Akuarium Bernomor" && U.judul === M_VIDEO.judul && V.JUDUL_K1B5B === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k1b5b-materi" && U.id === "k1b5b-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,rak-pagi,hitung-maju,hitung-mundur,sebelum-sesudah,label-hilang,kisi-rak,semua-beres,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-lompat,luar-lompat-terapan,luar-kisi,luar-kisi-terapan,luar-sebelum,luar-sebelum-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46) && U.adegan.every((a) => /Metode global|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "label sumber");
  const TERLARANG = /buku|panduan guru|kunci|rubrik|latihan|soal|kelas|teman|kelompok|skor|nilai/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
  cek(!/tebak/i.test(materi), "video materi tanpa tebak-tebakan");
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
  for (const n of [1, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  for (const kata of ["Igil", "Kaka", "Abang", "Mamah", "rak", "akuarium", "pakan", "lampu", "label", "maju", "mundur", "sesudah", "sebelum", "di antara", "kisi", "tetangga", "bungkus", "kantong", "berurutan"])
    cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/Malosi/i, /\bKira\b/, /\bUpe\b/, /\bWei\b/, /Halim/i, /kebun/i, /bibit/i, /sekolah/i, /burung hantu/i, /piknik/i, /kereta/i, /Nenek/i, /festival/i, /kardus/i, /\bTika\b/i, /ulat/i, /tangga bilangan/i, /kelereng/i])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/menghitung maju dan mundur/.test(sapa.ketukan[0].suara) && ["Menghitung maju dan mundur", "Sesudah, sebelum, di antara", "Mencari nomor yang hilang"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
}
{
  // 1. Rak dua tingkat: dua puluh akuarium bernomor satu sampai dua puluh, pakan berurutan, lampu diperiksa dari ujung.
  const r = adegan(M_VIDEO, "rak-pagi");
  const r0 = akhirAdegan(r, 0);
  sama([hitung(r0, "aq"), deretIsi(r0, "no", rentang(1, 20)), isiTeks(r0, "jm"), isiTeks(r0, "tk2"), ada(r0, "rk-pa", "rk-pb")], [20, rentang(1, 20).join(), "20 akuarium kecil", "rak 2 tingkat", true], "rak: dua puluh akuarium bernomor di rak dua tingkat");
  cek(rentang(1, 10).every((n) => ketemu(r0, `no${n}`).y === ketemu(r0, "no1").y) && rentang(11, 20).every((n) => ketemu(r0, `no${n}`).y === ketemu(r0, "no11").y) && ketemu(r0, "no11").y > ketemu(r0, "no1").y + 40, "rak: atas satu sampai sepuluh, bawah sebelas sampai dua puluh");
  cek(rentang(1, 10).every((n) => ketemu(r0, `no${n}`).x === ketemu(r0, `no${n + 10}`).x), "rak: nomor bawah tepat di bawah nomor atas");
  const awalR = L.keadaanStory(r, 0, L.posisiKata(r.ketukan[0].suara, "akuarium") - 1);
  cek(!ketemu(awalR, "aq1") && !ketemu(awalR, "no1"), "rak: akuarium muncul saat kata akuarium");
  const r1 = akhirAdegan(r, 1);
  sama([!!ketemu(r1, "ab"), isiTeks(r1, "ur-t0"), isiTeks(r1, "tl"), isiTeks(r1, "bu")], [true, "berurutan", "tidak terlewat", "tidak berulang"], "rak: pakan berurutan, tidak terlewat, tidak berulang");
  const r2 = akhirAdegan(r);
  cek(rentang(1, 20).every((n) => ketemu(r2, `lm${n}`).sorot) && ada(r2, "sn0", "sn1") && isiTeks(r2, "tq") === "mulai nomor ?" && ketemu(r2, "pa").x2 < 0 && ketemu(r2, "pb").x2 > 0, "rak: lampu diperiksa dari ujung, dua arah");
  // 2. Menghitung maju: Igil memberi pakan dari delapan sampai lima belas, tiap kata bilangan satu akuarium.
  const m = adegan(M_VIDEO, "hitung-maju");
  sama([isiTeks(akhirAdegan(m, 0), "cap"), ketemu(akhirAdegan(m, 0), "sd").x, hitung(akhirAdegan(m, 0), "pk")], ["maju: bertambah 1", G.cxAq(8), 0], "maju: mulai di akuarium delapan, belum ada pakan");
  let c = 0;
  for (const [ke, daftar] of [[1, rentang(8, 10)], [2, rentang(11, 15)]]) {
    const pos = posBilangan(m.ketukan[ke].suara, daftar);
    daftar.forEach((n, j) => {
      c += 1;
      const s = L.keadaanStory(m, ke, pos[j]);
      const sebelum = L.keadaanStory(m, ke, pos[j] - 1);
      cek(pos[j] >= 0 && hitung(s, "pk") === c && !ketemu(sebelum, `pk${n}`) && ketemu(s, `pk${n}`) && ketemu(s, "sd").x === G.cxAq(n) && isiTeks(s, `j${n}`) === String(n), `maju#${ke + 1}: kata ${n} memberi pakan tepat satu akuarium`);
    });
  }
  const m2 = akhirAdegan(m);
  sama([nomorDari(m2, "pk").join(), rentang(8, 15).map((n) => ketemu(m2, `j${n}`).x).every((x, i, a) => i === 0 || x > a[i - 1]), isiTeks(m2, "cap")], [rentang(8, 15).join(), true, "8 akuarium dapat pakan"], "maju: delapan akuarium, jejak bertambah ke kanan");
  cek(m.ketukan[1].aksi.some((ak) => [].concat(ak.tambah ?? []).some((o) => o.id === "tr" && o.t === "panah")), "maju: panah turun ke rak bawah");
  // 3. Menghitung mundur: Kaka memeriksa lampu dari dua puluh sampai dua belas.
  const d = adegan(M_VIDEO, "hitung-mundur");
  const d0 = akhirAdegan(d, 0);
  sama([isiTeks(d0, "cap"), ketemu(d0, "sn").x, lampuNyala(d0).length, nomorDari(d0, "pk").join()], ["mundur: berkurang 1", G.cxAq(20), 0, rentang(8, 15).join()], "mundur: mulai di dua puluh, pakan tadi tetap ada");
  let nyala = 0;
  for (const [ke, daftar] of [[1, rentang(20, 16)], [2, rentang(15, 12)]]) {
    const pos = posBilangan(d.ketukan[ke].suara, daftar);
    daftar.forEach((n, j) => {
      nyala += 1;
      const s = L.keadaanStory(d, ke, pos[j]);
      cek(pos[j] >= 0 && lampuNyala(s).length === nyala && lampuNyala(s).includes(n) && ketemu(s, "sn").x === G.cxAq(n) && isiTeks(s, `j${n}`) === String(n), `mundur#${ke + 1}: kata ${n} menyalakan lampu ${n}`);
    });
  }
  const d2 = akhirAdegan(d);
  sama([lampuNyala(d2).join(), rentang(20, 12).map((n) => ketemu(d2, `j${n}`).x).every((x, i, a) => i === 0 || x > a[i - 1]), ketemu(d2, "aq12").sorot], [rentang(12, 20).join(), true, true], "mundur: lampu dua puluh sampai dua belas, jejak berkurang");
  // 4. Sesudah, sebelum, di antara.
  const b = adegan(M_VIDEO, "sebelum-sesudah");
  const b0 = akhirAdegan(b, 0);
  sama([isiTeks(b0, "a1-n"), isiTeks(b0, "a2-n"), isiTeks(b0, "psj"), isiTeks(b0, "pl"), ketemu(b0, "ps").x2 > 0], ["15", "16", "sesudah", "1 lebih banyak", true], "sesudah lima belas adalah enam belas");
  const b1 = akhirAdegan(b, 1);
  sama([isiTeks(b1, "a0-n"), isiTeks(b1, "a1-n"), isiTeks(b1, "pbj"), isiTeks(b1, "pl"), ketemu(b1, "pb").x2 < 0], ["11", "12", "sebelum", "1 lebih sedikit", true], "sebelum dua belas adalah sebelas");
  const b2 = akhirAdegan(b);
  sama([["a0-n", "a1-n", "a2-n"].map((id) => isiTeks(b2, id)).join(), isiTeks(b2, "da-t0"), ketemu(b2, "a1").sorot], ["14,15,16", "15 di antara 14 dan 16", true], "lima belas di antara empat belas dan enam belas");
  // 5. Dua label jatuh, ditemukan dari tetangganya.
  const l = adegan(M_VIDEO, "label-hilang");
  const l0 = akhirAdegan(l, 0);
  sama([hitung(l0, "no"), !!ketemu(l0, "no13"), !!ketemu(l0, "no17"), isiTeks(l0, "q13"), isiTeks(l0, "q17"), isiTeks(l0, "j2"), ketemu(l0, "tg13").y > 150 && ketemu(l0, "tg17").y > 150], [18, false, false, "?", "?", "2 label jatuh", true], "label: tiga belas dan tujuh belas jatuh");
  const l1 = akhirAdegan(l, 1);
  sama([isiTeks(l1, "q13"), ketemu(l1, "no12").sorot, ketemu(l1, "no14").sorot, isiTeks(l1, "c13")], ["13", true, true, "12, 13, 14"], "label: sesudah dua belas, sebelum empat belas, tiga belas");
  const l2 = akhirAdegan(l);
  sama([isiTeks(l2, "q17"), ketemu(l2, "no16").sorot, ketemu(l2, "no18").sorot, ketemu(l2, "tg13").y, ketemu(l2, "tg17").y, ketemu(l2, "tg13").rot], ["17", true, true, ketemu(l0, "tg12").y, ketemu(l0, "tg16").y, 0], "label: di antara enam belas dan delapan belas, tujuh belas; label terpasang lagi");
  // 6. Rak seperti kisi: bawah tiap nomor atas adalah sepuluh dan nomor itu.
  const ks = adegan(M_VIDEO, "kisi-rak");
  const k0 = akhirAdegan(ks, 0);
  sama([hitung(k0, "ksc"), deretIsi(k0, "ksa", rentang(1, 20)), rentang(1, 10).every((n) => ketemu(k0, `ksa${n}`).x === ketemu(k0, `ksa${n + 10}`).x && ketemu(k0, `ksa${n + 10}`).y > ketemu(k0, `ksa${n}`).y)], [20, rentang(1, 20).join(), true], "kisi: dua baris, nomor bawah di bawah nomor atas");
  const k1 = akhirAdegan(ks, 1);
  cek(["ksc3", "ksc13", "ksc7", "ksc17"].every((id) => ketemu(k1, id).sorot) && ada(k1, "t3", "t7"), "kisi: di bawah tiga ada tiga belas, di bawah tujuh ada tujuh belas");
  sama([isiTeks(akhirAdegan(ks), "k13-t0"), isiTeks(akhirAdegan(ks), "kb-t0")], ["13: 10 dan 3", "bawah: 10 dan nomor atasnya"], "kisi: tiga belas adalah sepuluh dan tiga");
  // 7. Semua beres, lalu jembatan ke Sub-Bab C.
  const h = adegan(M_VIDEO, "semua-beres");
  const h0 = akhirAdegan(h, 0);
  sama([nomorDari(h0, "pk").join(), lampuNyala(h0).length, isiTeks(h0, "r17"), isiTeks(h0, "r16"), ada(h0, "ab", "mm", "kk")], [rentang(1, 20).join(), 20, "1 sampai 7", "16 sampai 20", true], "beres: dua puluh akuarium mendapat pakan, semua lampu menyala");
  sama([isiTeks(akhirAdegan(h, 1), "hs-t0"), deretIsi(akhirAdegan(h, 1), "no", rentang(1, 20))], ["20 akuarium beres", rentang(1, 20).join()], "beres: dua puluh akuarium beres, label lengkap");
  const h2 = akhirAdegan(h);
  cek(hitung(h2, "bk") === 7 && hitung(h2, "kn") === 5 && isiTeks(h2, "tq") === "berapa banyak?" && /bungkus pakan/.test(h.ketukan[2].suara) && /kantong ikan/.test(h.ketukan[2].suara) && /menjual/.test(h.ketukan[2].suara), "beres: jembatan ke Sub-Bab C (bungkus pakan dan kantong ikan berserakan)");
  // 8. Penutup.
  const q = akhirAdegan(adegan(M_VIDEO, "penutup"), 1);
  sama(["p0b", "p1b", "p2a", "p2b", "p3a"].map((id) => isiTeks(q, id)), ["bertambah 1", "berkurang 1", "sesudah: 1 lebih banyak", "sebelum: 1 lebih sedikit", "12, ?, 14: hilang 13"], "penutup: ringkasan maju, mundur, sesudah, sebelum, nomor hilang");
  const q2 = akhirAdegan(adegan(M_VIDEO, "penutup"));
  cek(hitung(q2, "qkc") === 20 && ada(q2, "ig", "kk", "kk-pita", "ab", "mm"), "penutup: kisi dan empat tokoh");
}
{
  // Number Line Hop: busur lompatan dan ikan penanda.
  const lt = adegan(U, "luar-lompat-terapan");
  const ikX = (objs) => ketemu(objs, "ik")?.x;
  const g0 = akhirAdegan(lt, 0);
  sama([ikX(g0), isiTeks(g0, "rg")], [G.xLompat(8), "dari 8 sampai 15"], "Number Line Hop: mulai di delapan");
  const pos1 = posBilangan(lt.ketukan[1].suara, rentang(9, 15));
  rentang(9, 15).forEach((n, j) => {
    const s = L.keadaanStory(lt, 1, pos1[j]);
    cek(ikX(s) === G.xLompat(n) && !!ketemu(s, `h${n}`), `Number Line Hop: kata ${n} melompat maju`);
  });
  const g1 = akhirAdegan(lt, 1);
  sama([hitung(g1, "h"), isiTeks(g1, "jl"), rentang(9, 15).every((n) => ketemu(g1, `h${n}`).x === G.xLompat(n - 1) && /Q6\.5 -16 13 0/.test(ketemu(g1, `h${n}`).d))], [7, "7 lompatan maju", true], "Number Line Hop: tujuh lompatan maju dari delapan ke lima belas");
  const g3 = akhirAdegan(lt);
  sama([hitung(g3, "m"), ikX(g3), isiTeks(g3, "jl"), isiTeks(g3, "rg"), rentang(12, 19).every((n) => ketemu(g3, `m${n}`).x === G.xLompat(n + 1) && /Q-6\.5 -16 -13 0/.test(ketemu(g3, `m${n}`).d))], [8, G.xLompat(12), "8 lompatan mundur", "dari 20 sampai 12", true], "Number Line Hop: delapan lompatan mundur dari dua puluh ke dua belas");
  // Number Grid: penanda bergeser, kotak tertutup ditemukan.
  const kg = adegan(U, "luar-kisi");
  const pnSel = (objs) => {
    const pn = ketemu(objs, "pn");
    return rentang(1, 20).find((n) => {
      const p = G.selKisi(20, 60, n, 26);
      return p.x === pn.x && p.y === pn.y;
    });
  };
  sama([pnSel(akhirAdegan(kg, 1)), pnSel(akhirAdegan(kg, 2)), pnSel(akhirAdegan(kg, 3)), isiTeks(akhirAdegan(kg, 2), "t14")], [5, 14, 9, "14: 10 dan 4"], "Number Grid: kanan, kiri, turun, naik");
  const kt = adegan(U, "luar-kisi-terapan");
  const t0 = akhirAdegan(kt, 0);
  sama([!!ketemu(t0, "gka13"), !!ketemu(t0, "gka17"), ada(t0, "tp13", "tp17"), isiTeks(t0, "d2")], [false, false, true, "2 kotak tertutup"], "Number Grid: dua kotak tertutup");
  const t1 = akhirAdegan(kt, 1);
  sama([isiTeks(t1, "gka13"), !!ketemu(t1, "tp13"), ketemu(t1, "gkc12").sorot, ketemu(t1, "gkc3").sorot], ["13", false, true, true], "Number Grid: tiga belas dari dua belas dan tiga");
  const t2 = akhirAdegan(kt, 2);
  sama([isiTeks(t2, "gka17"), !!ketemu(t2, "tp17"), ketemu(t2, "gkc18").sorot, ketemu(t2, "gkc7").sorot], ["17", false, true, true], "Number Grid: tujuh belas dari delapan belas dan tujuh");
  // Before and After: tiga kotak.
  const isiTiga = (objs) => ["bk0n", "bk1n", "bk2n"].map((id) => isiTeks(objs, id)).join();
  const sb = adegan(U, "luar-sebelum");
  sama([isiTiga(akhirAdegan(sb)), isiTeks(akhirAdegan(sb), "da-t0"), ["bk0j", "bk1j", "bk2j"].map((id) => isiTeks(akhirAdegan(sb), id)).join()], ["6,7,8", "7 di antara 6 dan 8", "sebelum,pilihan,sesudah"], "Before and After: enam, tujuh, delapan");
  const st = adegan(U, "luar-sebelum-terapan");
  sama([0, 1, 2].map((i) => isiTiga(akhirAdegan(st, i))), ["9,10,11", "18,19,20", "14,15,16"], "Before and After: akuarium sepuluh, sembilan belas, dan di antara empat belas dan enam belas");
  const rk = akhirAdegan(adegan(U, "luar-ringkas"));
  sama(["r0-t0", "r1-t0", "r2-t0"].map((id) => isiTeks(rk, id)), U1.NAMA_METODE, "ringkasan: tiga metode");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k1b5b-.*\.ts$/.test(f));
  cek(berkas.length >= 8, `berkas story k1b5b (${berkas.length})`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k1b1a-[a-z0-9-]+|k1b4a-gambar|k1b5a-gambar|k1b5b-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, k1b1a, k1b4a-gambar, k1b5a-gambar, atau k1b5b (${impor.join(", ")})`);
    // Gambar baru: dari Sub-Bab A hanya bentuk dasar ikan dan daftar emoji.
    for (const m of s.matchAll(/(?:import|export) \{([^}]+)\} from "\.\/k1b5a-gambar"/g)) cek(m[1].split(",").map((x) => x.trim()).every((x) => /^(E as E_5A|ikan)$/.test(x)), `${f}: dari k1b5a-gambar hanya ikan dan emoji (${m[1].trim()})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k1b5b.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K1B5B/.test(pb) && /VIDEO_LUAR_K1B5B/.test(pb) && /export function VideoK1B5B/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿"), "video-k1b5b.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
