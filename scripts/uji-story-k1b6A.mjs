// Uji Story Kelas 1 Bab 6 Sub-Bab A "Dua Nampan Kue" (lebih dari, kurang dari, dan selisih), awal cerita Pasar Malam Kampung: video materi dan video metode global.
// Bagian umum sama dengan uji Bab 5; bagian khusus memeriksa dua nampan kue, salah langkah menjumlahkan, pasangkan satu-satu, selisih dengan mengurangi,
// menyamakan, lampion (batang kotak dan garis bilangan), es lilin (bilangan belum diketahui), loket karcis (jembatan ke Sub-Bab B),
// bilangan yang diucapkan tampak sebagai angka, dan tiga metode global (Bar Model, Number Line Difference, Equalizing).
// Jalankan: node --no-warnings scripts/uji-story-k1b6a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k1b6A-video.ts");
const U1 = await import("../src/components/modul/story/k1b6A-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K1B6A, V.VIDEO_LUAR_K1B6A];
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


/* ------------------------------ Khusus Sub-Bab A Bab 6 ------------------------------ */
const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
const G = await import("../src/components/modul/story/k1b6A-gambar.ts");
const M_VIDEO = V.VIDEO_MATERI_K1B6A;
const U = V.VIDEO_LUAR_K1B6A;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const hitung = (objs, p) => objs.filter((o) => new RegExp(`^${p}\\d+$`).test(o.id)).length;
const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
const dalam = (o, x0, y0, x1, y1) => !!o && o.x > x0 && o.x < x1 && o.y > y0 && o.y < y1;

// Bilangan yang diucapkan (satu sampai dua puluh, belasan dibaca utuh) dibaca dari suara.
const SATUAN = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
const POLA_BIL = /\b(sebelas|(?:satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan) belas|dua puluh|sepuluh|satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan)\b/g;
const nilaiBil = (m) => (m === "sebelas" ? 11 : m === "dua puluh" ? 20 : m === "sepuluh" ? 10 : m.endsWith(" belas") ? 10 + SATUAN[m.split(" ")[0]] : SATUAN[m]);
const bilanganSuara = (s) => [...s.toLowerCase().matchAll(POLA_BIL)].map((m) => nilaiBil(m[1]));
sama(bilanganSuara("Dua belas, tiga belas, sebelas, sepuluh dan satu, dua puluh, kedua, satuannya."), [12, 13, 11, 10, 1, 20], "pembaca bilangan suara");
{
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!/Bar Model|Number Line Difference|Equalizing|Model Batang|Menyamakan|metode global/i.test(materi.replace(/Menyamakan dua nampan|Menyamakan banyaknya/gi, "")), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Bar Model", "Number Line Difference", "Equalizing"], ["Model Batang", "Selisih di Garis Bilangan", "Menyamakan"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(/nam ber lain di fe rens/.test(ejaanInggrisUntukSuaraId("Number Line Difference")) && /i kua lai zing/.test(ejaanInggrisUntukSuaraId("Equalizing")) && /bar mo del/.test(ejaanInggrisUntukSuaraId("Bar Model")), "ejaan tiga nama metode");
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Dua Nampan Kue" && U.judul === M_VIDEO.judul && V.JUDUL_K1B6A === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k1b6a-materi" && U.id === "k1b6a-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,petang,jumlah-salah,pasangkan,selisih,samakan,lampion,es-lilin,loket,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-batang,luar-batang-terapan,luar-garis,luar-garis-terapan,luar-samakan,luar-samakan-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46) && U.adegan.every((a) => /Metode global|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "label sumber");
  const TERLARANG = /buku|panduan guru|kunci|rubrik|latihan|soal|kelas|teman|kelompok|skor|nilai|tebak/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
  // Bab 6: tanpa kali dan bagi, tanpa lambang lebih besar atau lebih kecil (cukup kata), angka paling besar dua puluh. Boleh + (tambah), – (kurang), dan = (sama dengan).
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) {
    for (const kt of a.ketukan) cek(!/\b(kali|dikali|bagi|dibagi|perkalian|pembagian)\b/i.test(kt.suara), `${v.id}/${a.id}: suara tanpa kali dan bagi`);
    for (const [i] of a.ketukan.entries()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) {
      cek(!/[<>×÷]/.test(t) && !/\d\s*-\s*\d/.test(t), `${v.id}/${a.id}#${i + 1}: tanpa lambang terlarang ("${t}")`);
      for (const b of bilanganDari(t)) cek(Number(b) <= 20, `${v.id}/${a.id}#${i + 1}: angka paling besar dua puluh ("${t}")`);
    }
  }
  // Bilangan yang diucapkan tampak sebagai angka di gambar pada ketukan itu. Sapaan bersama dikecualikan.
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") a.ketukan.forEach((kt, i) => {
    const terlihat = new Set();
    for (let p = -1; p < L.kataDari(kt.suara).length; p += 1) for (const t of L.teksTerlihat(L.keadaanStory(a, i, p))) for (const b of bilanganDari(t)) terlihat.add(Number(b));
    for (const n of bilanganSuara(kt.suara)) cek(terlihat.has(n), `${v.id}/${a.id}#${i + 1}: bilangan ${n} yang diucapkan tampak sebagai angka`);
  });
  const semuaSuara = M_VIDEO.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [1, 3, 4, 5, 6, 7, 8, 10, 11, 12, 20]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  for (const kata of ["Igil", "Kaka", "Abang", "Mamah", "Pak RT", "nampan", "kue cubit", "kue pukis", "selisih", "lebihnya", "kurangnya", "pasang", "lampion", "es lilin", "karcis", "lapak", "menambah", "mengurangi"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/Malosi/i, /\bKira\b/, /\bUpe\b/, /\bWei\b/, /Halim/i, /bibit/i, /sekolah/i, /burung hantu/i, /piknik/i, /kereta/i, /Nenek/i, /festival/i, /kardus/i, /\bTika\b/i, /akuarium/i, /\bikan\b/i, /\bguppy\b/i]) for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/lebih dari, kurang dari, dan selisih/.test(sapa.ketukan[0].suara) && ["Memasangkan benda satu-satu", "Lebihnya dan kurangnya", "Mencari selisih dua bilangan"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  // Tiap adegan materi 3 ketukan; adegan global 3 sampai 4 ketukan.
  cek(M_VIDEO.adegan.filter((a) => a.id !== "sapaan").every((a) => a.ketukan.length === 3), "materi: tiga ketukan tiap adegan");
  cek(U.adegan.filter((a) => a.id !== "sapaan").every((a) => a.ketukan.length === 4), "metode global: empat ketukan tiap adegan");
}
{
  // 1. Pasar malam buka: dua nampan, dua belas cubit dan delapan pukis, Pak RT bertanya, Mamah menoleh pada Igil.
  const p = adegan(M_VIDEO, "petang");
  const p0 = akhirAdegan(p, 0);
  cek(ada(p0, "lp-a0", "lp-m", "lt0", "mm", "na", "nb") && hitung(p0, "c") === 12 && hitung(p0, "k") === 8 && isiTeks(p0, "n2") === "2 nampan", "petang: lapak, lampu, Mamah, dua nampan berisi dua belas cubit dan delapan pukis");
  const p1 = akhirAdegan(p, 1);
  cek(ada(p1, "pk", "q1", "q2") && isiTeks(p1, "kh-t0") === "pembeli kehabisan kue", "petang: Pak RT bertanya, pembeli bisa kehabisan");
  const p2 = akhirAdegan(p);
  cek(ada(p2, "ig", "mm") && !ketemu(p2, "pk") && isiTeks(p2, "ps-t0") === "cara yang pasti", "petang: Mamah menoleh pada Igil, cara yang pasti");
  // 2. Igil menjumlahkan (salah langkah).
  const j = adegan(M_VIDEO, "jumlah-salah");
  const j0 = akhirAdegan(j, 0);
  sama([isiTeks(j0, "n12"), isiTeks(j0, "n8"), hitung(j0, "c"), hitung(j0, "k")], ["12", "8", 12, 8], "jumlah-salah: dua belas dan delapan");
  const j1 = akhirAdegan(j, 1);
  sama([isiTeks(j1, "sl"), isiTeks(j1, "e1"), isiTeks(j1, "e2"), isiTeks(j1, "e3"), isiTeks(j1, "e4")], ["selisih 20", "12", "+", "8", "= 20"], "jumlah-salah: Igil menjumlahkan");
  const j2 = akhirAdegan(j);
  cek(ketemu(j2, "e1").op < 1 && ada(j2, "sx", "kk") && isiTeks(j2, "jm-t0") === "jumlah semuanya" && isiTeks(j2, "sb-t0") === "selisih = beda banyaknya" && !ketemu(j2, "sl"), "jumlah-salah: Kaka mengoreksi, coretan, selisih = beda banyaknya");
  // 3. Pasangkan satu-satu.
  const q = adegan(M_VIDEO, "pasangkan");
  const q0 = akhirAdegan(q, 0);
  cek(hitung(q0, "c") === 12 && hitung(q0, "k") === 8 && ada(q0, "pr0", "ab") && !ketemu(q0, "pr1") && ketemu(q0, "c0").sorot && ketemu(q0, "k0").sorot && isiTeks(q0, "p1") === "1", "pasangkan: satu cubit dengan satu pukis");
  const q1 = akhirAdegan(q, 1);
  cek(Array.from({ length: 8 }, (_, i) => ketemu(q1, `pr${i}`)).every(Boolean) && !ketemu(q1, "pr8") && isiTeks(q1, "p8") === "8 pasang" && isiTeks(q1, "p4") === "4 tanpa pasangan" && [8, 9, 10, 11].every((i) => ketemu(q1, `c${i}`).sorot) && !ketemu(q1, "c7").sorot, "pasangkan: delapan pasang, empat cubit tanpa pasangan");
  const q2 = akhirAdegan(q);
  sama([isiTeks(q2, "lb-t0"), isiTeks(q2, "kr-t0")], ["cubit lebihnya 4", "pukis kurangnya 4"], "pasangkan: lebihnya dan kurangnya");
  // 4. Selisih dan jari yang tidak cukup.
  const s = adegan(M_VIDEO, "selisih");
  const s0 = akhirAdegan(s, 0);
  sama([isiTeks(s0, "a8"), isiTeks(s0, "ak"), isiTeks(s0, "a12"), isiTeks(s0, "b12"), isiTeks(s0, "bl"), isiTeks(s0, "b8")], ["8", "kurang dari", "12", "12", "lebih dari", "8"], "selisih: kurang dari dan lebih dari");
  const s1 = akhirAdegan(s, 1);
  sama(["q12", "qm", "q8", "qs", "q4"].map((id) => isiTeks(s1, id)), ["12", "–", "8", "=", "4"], "selisih: 12 – 8 = 4 tampil bertahap");
  const s2 = akhirAdegan(s);
  cek(isiTeks(s2, "t12") === "12?" && isiTeks(s2, "t10") === "jari: 10" && ada(s2, "jr1", "jr2", "kk") && ketemu(s2, "sd1").x === 36 && ketemu(s2, "sd2").x === 250 && isiTeks(s2, "tk") === "pakai jari kaki", "selisih: Igil kehabisan jari dan memakai jari kaki");
  // 5. Menyamakan dua nampan.
  const m = adegan(M_VIDEO, "samakan");
  const m1 = akhirAdegan(m, 1);
  cek([0, 1, 2, 3].every((i) => ada(m1, `n${i}`)) && isiTeks(m1, "r1") === "jadi 12" && isiTeks(m1, "r2") === "jadi 8" && [8, 9, 10, 11].every((i) => ketemu(m1, `c${i}`).y === 32) && isiTeks(m1, "tb-t0") === "tambah 4 pukis" && isiTeks(m1, "am-t0") === "ambil 4 cubit", "samakan: tambah empat pukis atau ambil empat cubit");
  cek(Array.from({ length: 4 }, (_, i) => G.kisi(12, 180, 58, 6, 18, 18)[8 + i]).every((p, i) => ketemu(m1, `n${i}`).x === p.x && ketemu(m1, `n${i}`).y === p.y), "samakan: empat pukis baru mengisi nampan sampai dua belas");
  cek(isiTeks(akhirAdegan(m), "se-t0") === "tambah 4 = ambil 4 = selisih 4", "samakan: banyak yang ditambah atau diambil sama dengan selisih");
  // 6. Lampion: batang kotak dan garis bilangan.
  const l = adegan(M_VIDEO, "lampion");
  const l0 = akhirAdegan(l, 0);
  sama([hitung(l0, "rl"), hitung(l0, "yl"), hitung(l0, "br"), hitung(l0, "by"), isiTeks(l0, "m7"), isiTeks(l0, "m10"), isiTeks(l0, "n2")], [7, 10, 7, 10, "7", "10", "2 batang"], "lampion: tujuh merah, sepuluh kuning, dua batang kotak");
  const l1 = akhirAdegan(l, 1);
  cek(["by7", "by8", "by9"].every((id) => ketemu(l1, id).sorot) && !ketemu(l1, "by6").sorot && ada(l1, "h1", "h2", "h3", "m7", "m10") && isiTeks(l1, "lg") === "3 langkah" && isiTeks(l1, "k3") === "3 kotak", "lampion: tiga kotak lebih dan tiga langkah di garis bilangan");
  const l2 = akhirAdegan(l);
  sama(["g10", "gm", "g7", "gs", "g3"].map((id) => isiTeks(l2, id)), ["10", "–", "7", "=", "3"], "lampion: 10 – 7 = 3");
  // 7. Es lilin: bilangan belum diketahui.
  const e = adegan(M_VIDEO, "es-lilin");
  const e0 = akhirAdegan(e, 0);
  cek(hitung(e0, "ec") === 6 && isiTeks(e0, "lm-t0") === "lebihnya 5" && isiTeks(e0, "ls") === "stroberi ?", "es lilin: enam cokelat, lima lebihnya, stroberi belum diketahui");
  const e1 = akhirAdegan(e, 1);
  cek(hitung(e1, "es") === 5 && hitung(e1, "ec") === 6 && ["e6", "e7", "e5", "e8", "e11"].map((id) => isiTeks(e1, id)).join(" ") === "6 + 5 = 11", "es lilin: enam ditambah lima sama dengan sebelas");
  const e2 = akhirAdegan(e);
  sama([isiTeks(e2, "t1-t0"), isiTeks(e2, "t2-t0")], ["lebihnya diketahui → menambah", "kurangnya diketahui → mengurangi"], "es lilin: lebihnya menambah, kurangnya mengurangi");
  // 8. Loket karcis (jembatan ke Sub-Bab B).
  const o = adegan(M_VIDEO, "loket");
  const o0 = akhirAdegan(o, 0);
  cek(hitung(o0, "c") === 12 && hitung(o0, "k") === 12 && isiTeks(o0, "sm-t0") === "12 dan 12: sama" && ada(o0, "pb0", "pb1", "pb2"), "loket: dua nampan sama banyak, pembeli mengantre");
  const o1 = akhirAdegan(o, 1);
  cek(ada(o1, "lk", "lk-t", "ab", "an0", "an3") && isiTeks(o1, "lk-t") === "KARCIS" && ketemu(o1, "an0").x === 62, "loket: Abang membuka loket karcis, rombongan datang");
  const o2 = akhirAdegan(o);
  cek(ada(o2, "mm", "sy", "cr-k") && /cepat/.test(isiTeks(o2, "cr-t0")) && /menggabungkan/.test(o.ketukan[2].suara), "loket: butuh cara cepat menggabungkan (jembatan ke karcis)");
  // 9. Penutup.
  const z = adegan(M_VIDEO, "penutup");
  const z1 = akhirAdegan(z, 1);
  sama(["p0a", "p1a", "p1b"].map((id) => isiTeks(z1, id)), ["pasangkan 1 – 1", "selisih = besar – kecil", "12 – 8 = 4"], "penutup: ringkasan dua cara");
  cek(ada(akhirAdegan(z), "ig", "kk", "kk-pita", "ab", "mm") && /karcis/.test(z.ketukan[2].suara), "penutup: empat tokoh dan pertanyaan ke karcis");
}
{
  // Metode global: Bar Model.
  const b = adegan(U, "luar-batang");
  const b3 = akhirAdegan(b);
  cek(hitung(b3, "bp") === 15 && hitung(b3, "bq") === 11 && [11, 12, 13, 14].every((i) => ketemu(b3, `bp${i}`).sorot) && !ketemu(b3, "bp10").sorot && isiTeks(b3, "t4") === "4 kotak", "Bar Model: lima belas dan sebelas, empat kotak melebihi");
  const bt = adegan(U, "luar-batang-terapan");
  const bt0 = akhirAdegan(bt, 0);
  cek(hitung(bt0, "bj") === 16 && hitung(bt0, "bm") === 9, "Bar Model terapan: jambu enam belas, mangga sembilan");
  cek([9, 10, 11, 12, 13, 14, 15].every((i) => ketemu(akhirAdegan(bt, 1), `bj${i}`).sorot) && isiTeks(akhirAdegan(bt, 1), "sl-t0") === "selisih = 7", "Bar Model terapan: tujuh kotak melebihi");
  // Number Line Difference.
  const g = adegan(U, "luar-garis");
  const g2 = akhirAdegan(g, 2);
  cek(ada(g2, "ma", "mb", "h1", "h2", "h3") && isiTeks(g2, "lg") === "3 langkah" && !ketemu(g2, "sa"), "Number Line Difference: delapan ke sebelas, tiga langkah");
  cek(isiTeks(akhirAdegan(g), "sd-t0") === "selisih 8 dan 11" && isiTeks(akhirAdegan(g), "k3") === "= 3", "Number Line Difference: selisih tiga");
  const gt = adegan(U, "luar-garis-terapan");
  const gx = (n) => 46 + (n - 8) * 34;
  const kt = gt.ketukan[1];
  for (const [at, n] of [["sepuluh,", 10], ["sebelas,", 11], [7, 12], [9, 13]]) cek(ketemu(L.keadaanStory(gt, 1, L.posisiKata(kt.suara, at)), "mk")?.x === gx(n), `Number Line Difference terapan: penanda di ${n}`);
  cek(ada(akhirAdegan(gt, 1), "h1", "h2", "h3", "h4") && isiTeks(akhirAdegan(gt, 1), "l4") === "4 langkah", "Number Line Difference terapan: empat langkah");
  cek(ada(akhirAdegan(gt, 0), "bb", "bm") && ketemu(akhirAdegan(gt, 0), "bb").x === gx(9) && ketemu(akhirAdegan(gt, 0), "bm").x === gx(13), "Number Line Difference terapan: balon biru sembilan, merah tiga belas");
  // Equalizing.
  const zk = adegan(U, "luar-samakan");
  const zk1 = akhirAdegan(zk, 1);
  cek(hitung(zk1, "t") === 4 && hitung(zk1, "a") === 5 && hitung(zk1, "b") === 9, "Equalizing: yang ditambahkan sebanyak selisih");
  cek(Array.from({ length: 4 }, (_, i) => ketemu(akhirAdegan(zk, 2), `b${5 + i}`).y).every((y) => y === 54), "Equalizing: bisa juga mengambil dari yang banyak");
  const zt = adegan(U, "luar-samakan-terapan");
  const zt0 = akhirAdegan(zt, 0);
  sama([hitung(zt0, "ki"), hitung(zt0, "ka"), isiTeks(zt0, "m14"), isiTeks(zt0, "m10")], [14, 10, "14", "10"], "Equalizing terapan: empat belas dan sepuluh kelereng");
  const zt1 = akhirAdegan(zt, 1);
  sama([hitung(zt1, "n"), ["c1", "c2", "c3", "c4"].map((id) => isiTeks(zt1, id)).join(), isiTeks(zt1, "m14b")], [4, "1,2,3,4", "sama: 14"], "Equalizing terapan: tambah satu, dua, tiga, empat sampai sama");
  const kz = zt.ketukan[1];
  for (const [i, at] of [[1, 2], [2, 3], [3, 4], [4, 5]]) cek(ada(L.keadaanStory(zt, 1, at), `c${i}`) && !ketemu(L.keadaanStory(zt, 1, at), `c${i + 1}`), `Equalizing terapan: kelereng ke-${i} muncul saat disebut`);
  cek(kz.suara.length > 0 && isiTeks(akhirAdegan(zt, 2), "sk-t0") === "selisih = 4", "Equalizing terapan: selisih empat");
  const rk = akhirAdegan(adegan(U, "luar-ringkas"));
  sama(["q0-t0", "q1-t0", "q2-t0"].map((id) => isiTeks(rk, id)), U1.NAMA_METODE, "ringkasan: tiga metode");
  sama(["p3", "p15"].map((id) => isiTeks(rk, id)), ["3", "15"], "ringkasan: tiga dan lima belas");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k1b6A-.*\.ts$/.test(f));
  cek(berkas.length === 8 && !berkas.includes("k1b6A-materi-4.ts"), `berkas story k1b6A (${berkas.length}), tanpa materi-4`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k1b1a-[a-z0-9-]+|k1b4a-gambar|k1b6A-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, k1b1a, k1b4a-gambar, atau k1b6A (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k1b6a.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K1B6A/.test(pb) && /VIDEO_LUAR_K1B6A/.test(pb) && /export function VideoK1B6A/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿"), "video-k1b6a.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
