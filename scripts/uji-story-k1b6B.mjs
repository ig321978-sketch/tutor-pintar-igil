// Uji Story Kelas 1 Bab 6 Sub-Bab B "Loket Karcis" (penjumlahan dengan hasil sampai dua puluh), cerita Pasar Malam Kampung: video materi dan video metode global.
// Bagian umum sama dengan uji Story Bab 5; bagian khusus memeriksa antrean loket, hitung maju dari bilangan sesudahnya (salah langkah lalu benar), genapkan sepuluh,
// belasan ditambah satuan dengan puluhan dan satuan, pilih cara, catatan, lonceng penutup (jembatan ke Sub-Bab C), setiap kalimat tambah dihitung ulang (hasil paling besar dua puluh),
// bilangan yang diucapkan tampak sebagai angka, dan tiga metode global (Doubles Plus One, Part-Whole Model, Number Line Jumps).
// Jalankan: node --no-warnings scripts/uji-story-k1b6B.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k1b6B-video.ts");
const U1 = await import("../src/components/modul/story/k1b6B-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K1B6B, V.VIDEO_LUAR_K1B6B];
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
        const teksAda = akhir.filter((o) => o.t === "teks" && (o.op ?? 1) > 0 && o.isi && !/^[\u{1F000}-\u{1FFFF}]|^[✂✅❌❓⚡]$/u.test(o.isi));
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



/* ------------------------------ Khusus Sub-Bab B Bab 6 ------------------------------ */
const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
const G = await import("../src/components/modul/story/k1b6B-gambar.ts");
const M_VIDEO = V.VIDEO_MATERI_K1B6B;
const U = V.VIDEO_LUAR_K1B6B;
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
const rentang = (dari, sampai) => Array.from({ length: sampai - dari + 1 }, (_, i) => dari + i);

// Bilangan yang diucapkan (satu sampai dua puluh, belasan dibaca utuh) dibaca dari suara.
const SATUAN = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
const POLA_BIL = /\b(sebelas|(?:satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan) belas|dua puluh|sepuluh|satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan)\b/g;
const nilaiBil = (m) => (m === "sebelas" ? 11 : m === "dua puluh" ? 20 : m === "sepuluh" ? 10 : m.endsWith(" belas") ? 10 + SATUAN[m.split(" ")[0]] : SATUAN[m]);
const bilanganSuara = (s) => [...s.toLowerCase().matchAll(POLA_BIL)].map((m) => nilaiBil(m[1]));
sama(bilanganSuara("Dua belas, tiga belas, sebelas, sepuluh dan satu, dua puluh, kedua, keduanya, satuannya."), [12, 13, 11, 10, 1, 20], "pembaca bilangan suara");
{
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!/Doubles Plus One|Part-Whole|Number Line Jumps|Kembar Tambah Satu|Bagan Bagian|Lompat di Garis Bilangan|metode global/i.test(materi), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Doubles Plus One", "Part-Whole Model", "Number Line Jumps"], ["Kembar Tambah Satu", "Bagan Bagian dan Keseluruhan", "Lompat di Garis Bilangan"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Loket Karcis" && U.judul === M_VIDEO.judul && V.JUDUL_K1B6B === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k1b6B-materi" && U.id === "k1b6B-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,antre,hitung-maju,genap-sepuluh,belasan,pilih-cara,catatan,lonceng,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-kembar,luar-kembar-terapan,luar-bagan,luar-bagan-terapan,luar-lompat,luar-lompat-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46) && U.adegan.every((a) => /Metode global|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "label sumber");
  const TERLARANG = /buku|panduan guru|kunci|rubrik|latihan|soal|kelas|teman|kelompok|skor|nilai/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
  cek(!/tebak/i.test(materi) && !/tebak/i.test(luar), "video tanpa tebak-tebakan");
  // Bab 6 Sub-Bab B: hanya penjumlahan; tanpa kali, bagi, kurang, dan lambang lebih besar atau lebih kecil; semua angka paling besar dua puluh.
  const hitungRantai = (t) => {
    const sisi = t.split("=").map((x) => x.trim());
    if (sisi.length < 2 || !sisi.every((x) => /^\d+( \+ \d+)*$/.test(x))) return null;
    const nilai = sisi.map((x) => x.split(" + ").reduce((p, q) => p + Number(q), 0));
    return nilai.every((n) => n === nilai[0]);
  };
  const SALAH_SENGAJA = new Set(["catatan#3:8 + 7 = 14"]);
  let jumlahKalimatTambah = 0;
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan) {
      for (const kt of a.ketukan) cek(!/\bb(dikali|bagi|dibagi|perkalian|pembagian|dikurangi|pengurangan|bersusun|pinjam)\b/i.test(kt.suara), `${v.id}/${a.id}: suara tanpa kali-kalian, bagi, dan pengurangan`);
      a.ketukan.forEach((kt, i) => {
        for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) {
          cek(!/[<>×÷]/.test(t) && !/\d\s*-\s*\d/.test(t), `${v.id}/${a.id}#${i + 1}: tanpa lambang kali, bagi, kurang, banding ("${t}")`);
          for (const b of bilanganDari(t)) cek(Number(b) <= 20, `${v.id}/${a.id}#${i + 1}: angka paling besar dua puluh ("${t}")`);
          const r = hitungRantai(t);
          if (r !== null) {
            jumlahKalimatTambah += 1;
            cek(r || SALAH_SENGAJA.has(`${a.id}#${i + 1}:${t}`), `${v.id}/${a.id}#${i + 1}: kalimat tambah dihitung ulang ("${t}")`);
          }
        }
      });
    }
  cek(jumlahKalimatTambah >= 25, `banyak kalimat tambah yang diperiksa (${jumlahKalimatTambah})`);
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
  for (const n of [1, 3, 4, 5, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  for (const kata of ["Igil", "Kaka", "Abang", "Mamah", "Pak RT", "loket", "karcis", "komidi putar", "kucing", "hitung maju", "bilangan sesudahnya", "genapkan sepuluh", "belasan", "puluhan", "satuan", "kue cubit", "lonceng", "papan"])
    cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/Malosi/i, /\bKira\b/, /\bUpe\b/, /\bWei\b/, /Halim/i, /kebun/i, /bibit/i, /sekolah/i, /burung hantu/i, /piknik/i, /kereta/i, /Nenek/i, /festival/i, /kardus/i, /\bTika\b/i, /ulat/i, /tangga bilangan/i, /kelereng/i, /akuarium/i, /ikan/i, /nampan/i, /Tutup Pasar/i])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/menjumlahkan sampai dua puluh/.test(sapa.ketukan[0].suara) && ["Hitung maju dan genapkan sepuluh", "Belasan ditambah satuan", "Memilih cara yang pas"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
}
{
  const GB = (n) => G.xG(n);
  // 1. Antrean: loket berjendela, lima anak berbaris sampai pagar, Abang menjual, Igil membantu; dua rombongan; Pak RT dan komidi putar.
  const a = adegan(M_VIDEO, "antre");
  const a0 = akhirAdegan(a, 0);
  sama([ada(a0, "lk-b", "lk-j", "lk-r", "lk-m"), isiTeks(a0, "lk-t"), hitung(a0, "q"), ada(a0, "pg0", "pg-p", "ab", "ig")], [true, "KARCIS", 5, true], "antre: loket karcis berjendela, lima anak, pagar, Abang, dan Igil");
  const a1 = akhirAdegan(a, 1);
  sama([hitung(a1, "a"), hitung(a1, "b"), isiTeks(a1, "a-n"), isiTeks(a1, "b-n"), tidakAda(a1, "q0", "pg0")], [8, 7, "8", "7", true], "antre: rombongan pertama delapan karcis, kedua tujuh karcis");
  const kata8 = L.posisiKata(a.ketukan[1].suara, "delapan");
  cek(hitung(L.keadaanStory(a, 1, kata8 - 1), "a") === 0 && hitung(L.keadaanStory(a, 1, kata8), "a") === 8, "antre: delapan karcis muncul saat kata delapan");
  const a2 = akhirAdegan(a);
  sama([ada(a2, "pr", "kp"), isiTeks(a2, "bl-t0"), isiTeks(a2, "tj-t0"), tidakAda(a2, "a0", "b0")], [true, "hitung yang benar!", "karcis terjual: 8 dan 7", true], "antre: Pak RT meminta hitung benar, komidi putar");
  // 2. Hitung maju: salah langkah (delapan disebut dua kali, 14), lalu benar (mulai dari sesudahnya, 15).
  const m = adegan(M_VIDEO, "hitung-maju");
  const m0 = akhirAdegan(m, 0);
  sama([hitung(m0, "gb-a"), isiTeks(m0, "mu-t0"), isiTeks(m0, "ma-t0"), isiTeks(m0, "h14"), rentang(8, 14).every((n) => ketemu(m0, `d${n}`)?.x === GB(n))], [21, "mulai: 8", "maju 7 kali", "14 karcis!", true], "hitung maju: Igil mulai dari delapan, menyebut delapan sampai empat belas");
  const tujuh = L.posisiKata(m.ketukan[0].suara, "tujuh");
  cek(tidakAda(L.keadaanStory(m, 0, 0), "d9") && ada(L.keadaanStory(m, 0, 9999), "d9", "d14") && tidakAda(L.keadaanStory(m, 0, tujuh), "d14"), "hitung maju: titik muncul satu per satu mengikuti kata");
  const m1 = akhirAdegan(m, 1);
  sama([ada(m1, "kk", "sx", "d8", "h14"), isiTeks(m1, "kp-t0"), isiTeks(m1, "sd-t0"), tidakAda(m1, "ig", "mu-k")], [true, "8 sudah ada di kepala", "mulai dari 9", true], "hitung maju: Kaka menggeleng, delapan tidak disebut lagi, mulai dari sembilan");
  const m2 = akhirAdegan(m);
  cek(rentang(9, 15).every((n) => ketemu(m2, `l${n}`)?.x === GB(n - 1) && ketemu(m2, `l${n}`).d.endsWith(`${GB(n) - GB(n - 1)} 0`) && ketemu(m2, `e${n}`)?.x === GB(n)), "hitung maju: tujuh lompatan dari delapan sampai lima belas");
  sama([isiTeks(m2, "pj-t0"), isiTeks(m2, "h7"), tidakAda(m2, "h14", "sx", "d9", "kp-k")], ["8 + 7 = 15", "7 lompatan", true], "hitung maju: delapan ditambah tujuh sama dengan lima belas");
  // 3. Genapkan sepuluh dengan kucing.
  const g = adegan(M_VIDEO, "genap-sepuluh");
  const g0 = akhirAdegan(g, 0);
  const meja = ketemu(g0, "mj");
  const puncakTumpuk = Math.min(...rentang(0, 3).map((i) => ketemu(g0, `t${i}`).y));
  cek(hitung(g0, "t") === 4 && ada(g0, "kc", "ig", "mj") && ketemu(g0, "kc").y < puncakTumpuk && Math.abs(ketemu(g0, "kc").x - 125) < 1 && rentang(0, 3).every((i) => ketemu(g0, `t${i}`).y + ketemu(g0, `t${i}`).h <= meja.y + 0.01) && isiTeks(g0, "bs-t0") === "kucing ikut membeli!", "genap: kucing duduk di atas tumpukan karcis di meja, Igil berseru");
  const melompat = L.posisiKata(g.ketukan[0].suara, "melompat");
  cek(ketemu(L.keadaanStory(g, 0, melompat - 1), "kc")?.y === 152 && ketemu(L.keadaanStory(g, 0, melompat), "kc")?.y === 100, "genap: kucing melompat saat kata melompat");
  const g1 = akhirAdegan(g, 1);
  const sel9 = G.titikSel(24, 56, 9, 18, 13);
  sama([hitung(g1, "bfk"), ketemu(g1, "bf-c9") !== undefined, hitung(g1, "g"), ketemu(g1, "g0").x, ketemu(g1, "g0").y, isiTeks(g1, "l9"), isiTeks(g1, "eq-t0"), tidakAda(g1, "kc", "mj", "ig")], [9, true, 5, sel9.x, sel9.y, "10", "9 + 1 = 10", true], "genap: sembilan di bingkai, satu karcis dari lima pindah, sepuluh");
  const menggenap = L.posisiKata(g.ketukan[1].suara, "menggenapkan");
  cek(ketemu(L.keadaanStory(g, 1, menggenap - 1), "g0").x === 150 && ketemu(L.keadaanStory(g, 1, menggenap), "g0").x === sel9.x, "genap: karcis pindah saat kata menggenapkan");
  const g2 = akhirAdegan(g);
  sama([hitung(g2, "bfk"), isiTeks(g2, "l5"), isiTeks(g2, "e2-t0"), isiTeks(g2, "hs-t0"), sorot(g2, "g1", "g4", "bfk0")], [9, "4", "10 + 4 = 14", "1 bilangan hampir 10", true], "genap: sepuluh ditambah empat sama dengan empat belas");
  // 4. Belasan: tiga belas anak ditambah empat; puluhan dan satuan.
  const b = adegan(M_VIDEO, "belasan");
  const b0 = akhirAdegan(b, 0);
  sama([hitung(b0, "a"), hitung(b0, "c"), isiTeks(b0, "n13"), isiTeks(b0, "n4")], [13, 4, "13", "4"], "belasan: tiga belas anak disusul empat anak");
  const b1 = akhirAdegan(b, 1);
  sama([isiTeks(b1, "tb-hp"), isiTeks(b1, "tb-hs"), isiTeks(b1, "tb-tp"), isiTeks(b1, "tb-ts"), isiTeks(b1, "ik-t"), hitung(b1, "ls"), isiTeks(b1, "sd-t0"), tidakAda(b1, "a0", "c0")], ["puluhan", "satuan", "1", "3", "ikat 10", 3, "3 + 4 = 7", true], "belasan: tabel satu puluhan dan tiga satuan, tiga ditambah empat");
  const b2 = akhirAdegan(b);
  sama([isiTeks(b2, "tb-tp"), isiTeks(b2, "tb-ts"), hitung(b2, "ls"), isiTeks(b2, "sd-t0"), sorot(b2, "tb-kp", "tb-ts")], ["1", "7", 7, "13 + 4 = 17", true], "belasan: puluhan tetap satu, satuan tujuh, tujuh belas");
  // 5. Pilih cara.
  const p = adegan(M_VIDEO, "pilih-cara");
  const p0 = akhirAdegan(p, 0);
  sama([ada(p0, "mm", "tn"), isiTeks(p0, "n11"), isiTeks(p0, "n5"), isiTeks(p0, "c1-t0"), isiTeks(p0, "c2-t0"), isiTeks(p0, "hs")], [true, "11", "5", "cara A?", "cara B?", "= ?"], "pilih cara: Mamah bertanya sebelas ditambah lima, cara mana");
  const p1 = akhirAdegan(p, 1);
  sama([ada(p1, "kk"), tidakAda(p1, "mm", "tn"), isiTeks(p1, "c1-t0"), isiTeks(p1, "w1"), isiTeks(p1, "hs")], [true, true, "puluhan dan satuan", "1 + 5 = 6", "= 16"], "pilih cara: Kaka menambah satuannya, enam belas");
  const p2 = akhirAdegan(p);
  sama([ada(p2, "ig", "kk"), isiTeks(p2, "c2-t0"), isiTeks(p2, "kc5"), isiTeks(p2, "hsm-t0"), ada(p2, "ok")], [true, "hitung maju", "5 kecil", "dua cara: 11 + 5 = 16", true], "pilih cara: Igil hitung maju, hasilnya sama, 16");
  // 6. Catatan.
  const c = adegan(M_VIDEO, "catatan");
  const c0 = akhirAdegan(c, 0);
  sama([isiTeks(c0, "r0"), isiTeks(c0, "r1"), isiTeks(c0, "r2"), ada(c0, "kk", "pn")], ["8 + 7 = 15", "9 + 5 = 14", "13 + 4 = 17", true], "catatan: papan tiga baris lima belas, empat belas, tujuh belas");
  const c1 = akhirAdegan(c, 1);
  sama([ada(c1, "pr", "ok", "kp"), isiTeks(c1, "kc-t0")], [true, "kursi cukup"], "catatan: Pak RT mengangguk, kursi komidi putar cukup");
  const c2 = akhirAdegan(c);
  sama([ada(c2, "ig", "x14", "sx"), isiTeks(c2, "x14"), tidakAda(c2, "kp", "kc-k")], [true, "8 + 7 = 14", true], "catatan: Igil lega, empat belas yang keliru dicoret");
  // 7. Lonceng penutup (jembatan ke Sub-Bab C): lampu padam, kue sisa, Pak RT minta lapor.
  const l = adegan(M_VIDEO, "lonceng");
  const l0 = akhirAdegan(l, 0);
  sama([hitung(l0, "lp"), ada(l0, "bl", "lc"), ketemu(l0, "lc").rot], [6, true, 22], "lonceng: enam lampion, bulan, lonceng berbunyi");
  const l1 = akhirAdegan(l, 1);
  sama([hitung(l1, "ku"), ada(l1, "pr", "nm"), tidakAda(l1, "lc"), isiTeks(l1, "lr-t0"), ketemu(l1, "lp5").op, ketemu(l1, "lp4").op], [3, true, true, "lapor sisa", 0.25, 0.25], "lonceng: kue tinggal tiga, lampu ujung padam, Pak RT minta lapor");
  const l2 = akhirAdegan(l);
  sama([ada(l2, "mm", "tn"), hitung(l2, "gh"), isiTeks(l2, "sq-t0"), ketemu(l2, "lp3").op], [true, 3, "sisa kue: ?", 0.25], "lonceng: Mamah bertanya sisa kue cubit");
  // 8. Penutup.
  const q1 = akhirAdegan(adegan(M_VIDEO, "penutup"), 1);
  sama(["q0-t0", "q1-t0", "q2-t0"].map((id) => isiTeks(q1, id)), ["hitung maju: mulai dari bilangan sesudahnya", "hampir 10: genapkan 10 dulu", "belasan + satuan: puluhan tetap"], "penutup: tiga ringkasan");
  const q2 = akhirAdegan(adegan(M_VIDEO, "penutup"));
  cek(ada(q2, "ig", "kk", "ab", "mm", "tn", "qb-k") && tidakAda(q2, "q0-k"), "penutup: empat tokoh dan pertanyaan pengurangan");
}
{
  const GB = (n) => G.xG(n);
  const titikX = (objs, id) => ketemu(objs, id)?.x;
  // Pembuka metode global.
  const op = adegan(U, "luar-pembuka");
  const o0 = akhirAdegan(op, 0);
  sama([ada(o0, "lc", "ab", "ig", "tn"), ["rk0-k", "rk1-k", "rk2-k"].every((id) => ketemu(o0, id)), isiTeks(o0, "n3")], [true, true, "3 kartu rahasia"], "global pembuka: laci loket, tiga kartu rahasia");
  sama(["m0-t0", "m1-t0", "m2-t0"].map((id) => isiTeks(akhirAdegan(op, 1), id)), ["1. Doubles Plus One", "2. Part-Whole Model", "3. Number Line Jumps"], "global pembuka: tiga nama metode");
  sama(["n0-t0", "n1-t0", "n2-t0"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Kembar Tambah Satu", "2. Bagan Bagian dan Keseluruhan", "3. Lompat di Garis Bilangan"], "global pembuka: tiga nama bahasa Indonesia");
  sama([isiTeks(akhirAdegan(op), "g2"), sorot(akhirAdegan(op), "n0-k", "n2-k")], ["2 bilangan jadi 1 hasil", true], "global pembuka: ketiganya menggabungkan dua bilangan");
  // Doubles Plus One.
  const dk = adegan(U, "luar-kembar");
  const k0 = akhirAdegan(dk, 0);
  sama([hitung(k0, "a"), hitung(k0, "b"), isiTeks(k0, "p1"), isiTeks(k0, "kb"), isiTeks(k0, "la"), isiTeks(k0, "lb")], [6, 6, "+1", "2 bilangan sama", "6", "6"], "Doubles Plus One: kembar enam dan enam");
  sama([isiTeks(akhirAdegan(dk, 1), "eq"), sorot(akhirAdegan(dk, 1), "a0", "b5")], ["6 + 6 = 12", true], "Doubles Plus One: enam ditambah enam sama dengan dua belas");
  const k2 = akhirAdegan(dk, 2);
  sama([ada(k2, "bx"), hitung(k2, "b"), isiTeks(k2, "lbx"), isiTeks(k2, "kt"), tidakAda(k2, "eq")], [true, 6, "7", "kembar + 1", true], "Doubles Plus One: salah satu lebih satu, tambah satu");
  sama([isiTeks(akhirAdegan(dk), "e1")], ["6 + 7 = 12 + 1 = 13"], "Doubles Plus One: enam ditambah tujuh sama dengan dua belas ditambah satu, tiga belas");
  const dt = adegan(U, "luar-kembar-terapan");
  const t0 = akhirAdegan(dt, 0);
  sama([hitung(t0, "a"), hitung(t0, "b"), isiTeks(t0, "e1"), sorot(t0, "a0", "b6"), isiTeks(t0, "la"), isiTeks(t0, "lb")], [7, 8, "7 + 7 = 14", true, "7", "8"], "terapan kembar: tujuh ditambah delapan, kembar tujuh dan tujuh");
  const t1 = akhirAdegan(dt, 1);
  sama([isiTeks(t1, "e1"), sorot(t1, "b7"), isiTeks(t1, "p1")], ["14 + 1 = 15", true, "+1"], "terapan kembar: delapan itu tujuh lebih satu, lima belas");
  sama([isiTeks(akhirAdegan(dt, 2), "kl-t0"), ada(akhirAdegan(dt, 2), "kk")], ["bilangan hampir sama: kilat!", true], "terapan kembar: kilat bila hampir sama");
  sama([isiTeks(akhirAdegan(dt), "e2"), isiTeks(akhirAdegan(dt), "tk-t0"), ada(akhirAdegan(dt), "sx")], ["3 + 10", "tidak ada kembarnya", true], "terapan kembar: tiga ditambah sepuluh tanpa kembar");
  // Part-Whole Model.
  const bc = adegan(U, "luar-bagan");
  const f0 = akhirAdegan(bc, 0);
  sama([ada(f0, "bg-w", "bg-p0", "bg-p1", "bg-l0", "bg-l1"), isiTeks(f0, "bb"), isiTeks(f0, "ks"), sorot(f0, "bg-w", "bg-p0")], [true, "2 bagian", "keseluruhan", true], "Part-Whole Model: dua bagian di bawah, keseluruhan di atas");
  const f1 = akhirAdegan(bc, 1);
  sama([isiTeks(f1, "bg-w-t"), isiTeks(f1, "bg-p0-t"), isiTeks(f1, "bg-p1-t"), isiTeks(f1, "kc")], ["9", "4", "5", "2 bilangan lebih kecil"], "Part-Whole Model: bilangan dipisah menjadi dua bilangan lebih kecil");
  const f2 = akhirAdegan(bc, 2);
  sama([isiTeks(f2, "pj"), isiTeks(f2, "bg-w-t"), isiTeks(f2, "bg-p0-t"), isiTeks(f2, "bg-p1-t")], ["8 + 9", "9", "2", "7"], "Part-Whole Model: delapan ditambah sembilan, sembilan dipisah dua dan tujuh");
  const f3 = akhirAdegan(bc);
  sama([isiTeks(f3, "s1"), isiTeks(f3, "s2"), isiTeks(f3, "pj"), sorot(f3, "bg-p0", "bg-p1")], ["8 + 2 = 10", "10 + 7 = 17", "8 + 9 = 17", true], "Part-Whole Model: delapan dan dua sepuluh, ditambah tujuh tujuh belas");
  const bt = adegan(U, "luar-bagan-terapan");
  const h0 = akhirAdegan(bt, 0);
  sama([isiTeks(h0, "pj"), isiTeks(h0, "bg-w-t"), isiTeks(h0, "bg-p0-t"), isiTeks(h0, "bg-p1-t"), ada(h0, "kk")], ["7 + 6", "6", "3", "3", true], "terapan bagan: tujuh ditambah enam, enam dipisah tiga dan tiga");
  sama([isiTeks(akhirAdegan(bt, 1), "s1"), isiTeks(akhirAdegan(bt, 1), "s2"), isiTeks(akhirAdegan(bt, 1), "pj")], ["7 + 3 = 10", "10 + 3 = 13", "7 + 6 = 13"], "terapan bagan: tujuh ditambah tiga sepuluh, ditambah tiga tiga belas");
  sama([isiTeks(akhirAdegan(bt, 2), "ra-t0"), isiTeks(akhirAdegan(bt, 2), "rb-t0"), tidakAda(akhirAdegan(bt, 2), "bg-w")], ["langkah rapi", "mudah diperiksa", true], "terapan bagan: langkah rapi dan mudah diperiksa");
  sama([isiTeks(akhirAdegan(bt), "kk2-t0"), isiTeks(akhirAdegan(bt), "e2"), ada(akhirAdegan(bt), "jm")], ["bilangan kecil", "2 + 1 = 3", true], "terapan bagan: lama kalau bilangan kecil");
  // Number Line Jumps.
  const lc = adegan(U, "luar-lompat");
  const j0 = akhirAdegan(lc, 0);
  sama([hitung(j0, "gb-a"), titikX(j0, "st"), isiTeks(j0, "ms")], [21, GB(6), "mulai"], "Number Line Jumps: garis nol sampai dua puluh, mulai dari bilangan pertama");
  const j1 = akhirAdegan(lc, 1);
  cek(ketemu(j1, "jb").x === GB(6) && ketemu(j1, "jb").d.endsWith(`${GB(13) - GB(6)} 0`) && titikX(j1, "ld") === GB(13) && isiTeks(j1, "kn") === "ke kanan" && isiTeks(j1, "mt") === "mendarat", "Number Line Jumps: lompat ke kanan, mendarat di jumlahnya");
  const j2 = akhirAdegan(lc, 2);
  cek(ketemu(j2, "j1").d.endsWith(`${GB(10) - GB(6)} 0`) && ketemu(j2, "j2").x === GB(10) && ketemu(j2, "j2").d.endsWith(`${GB(13) - GB(10)} 0`) && sorot(j2, "gb-a10") && tidakAda(j2, "jb") && titikX(j2, "ld") === GB(13), "Number Line Jumps: lompatan dipecah menuju sepuluh dulu");
  const j3 = akhirAdegan(lc);
  cek(rentang(0, 2).every((i) => ketemu(j3, `q${i}`).x === GB(12 + i)) && titikX(j3, "s12") === GB(12) && titikX(j3, "e15") === GB(15) && isiTeks(j3, "p3") === "+3" && tidakAda(j3, "st", "j1") && !sorot(j3, "gb-a10"), "Number Line Jumps: dari dua belas tiga langkah mendarat di lima belas");
  const jt = adegan(U, "luar-lompat-terapan");
  const n0 = akhirAdegan(jt, 0);
  cek(titikX(n0, "st") === GB(9) && ketemu(n0, "j1").x === GB(9) && ketemu(n0, "j1").d.endsWith(`${GB(10) - GB(9)} 0`) && isiTeks(n0, "eq") === "9 + 5" && isiTeks(n0, "p1") === "+1" && sorot(n0, "gb-a10"), "terapan lompat: dari sembilan lompat satu menuju sepuluh");
  const n1 = akhirAdegan(jt, 1);
  cek(ketemu(n1, "j2").x === GB(10) && ketemu(n1, "j2").d.endsWith(`${GB(14) - GB(10)} 0`) && titikX(n1, "ld") === GB(14) && isiTeks(n1, "eq") === "9 + 5 = 14" && isiTeks(n1, "p4") === "+4", "terapan lompat: empat lagi, mendarat di empat belas");
  sama([isiTeks(akhirAdegan(jt, 2), "s1-t0"), isiTeks(akhirAdegan(jt, 2), "s2-t0")], ["1. lompat ke 10", "2. lompat ke 14"], "terapan lompat: urutan langkah jelas");
  const n3 = akhirAdegan(jt);
  sama([hitung(n3, "m"), isiTeks(n3, "eq"), isiTeks(n3, "bk"), tidakAda(n3, "j1", "j2", "st", "ld")], [15, "2 + 15", "banyak lompatan", true], "terapan lompat: bilangan kedua besar, lompatan banyak");
  // Ringkasan.
  const rk = akhirAdegan(adegan(U, "luar-ringkas"), 2);
  sama(["r0-t0", "r1-t0", "r2-t0"].map((id) => isiTeks(rk, id)), U1.NAMA_METODE.map((n, i) => `${i + 1}. ${n}`), "ringkasan: tiga metode");
  sama([isiTeks(akhirAdegan(adegan(U, "luar-ringkas")), "q"), ["s0-t0", "s1-t0", "s2-t0"].map((id) => isiTeks(akhirAdegan(adegan(U, "luar-ringkas")), id))], ["9 + 9", U1.NAMA_METODE], "ringkasan: sembilan ditambah sembilan, pilih salah satu metode");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k1b6B-.*\.ts$/.test(f));
  cek(berkas.length === 8, `berkas story k1b6B (${berkas.length}): bantu, gambar, luar-1, luar-2, materi-1 sampai 3, video`);
  cek(!berkas.includes("k1b6B-materi-4.ts"), "k1b6B-materi-4.ts tidak dipakai lagi");
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de) && !/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m2) => m2[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k1b1a-bantu|k1b4a-gambar|k1b6B-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, k1b1a-bantu, k1b4a-gambar, atau k1b6B (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k1b6b.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K1B6B/.test(pb) && /VIDEO_LUAR_K1B6B/.test(pb) && /export function VideoK1B6B/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿"), "video-k1b6b.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
