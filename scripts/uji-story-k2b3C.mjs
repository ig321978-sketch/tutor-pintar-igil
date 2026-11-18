// Uji Story Kelas 2 Bab 3 Sub-Bab C "Gudang Mainan Pak Rudi" (bangun ruang), akhir cerita Taman Bermain Sekolah: video materi dan video metode global.
// Bagian umum sama dengan uji Kelas 2 Bab 1; bagian khusus memeriksa gudang, bola kabur, bisa diisi, menggelinding, kubus dan balok, tabung kerucut bola, tabel, rak rapi, penutup perayaan,
// bilangan yang diucapkan tampak sebagai angka, naskah suara tetap, dan tiga metode global (Mystery Bag, Face Printing, Top and Side Views).
// Jalankan: node --no-warnings scripts/uji-story-k2b3C.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k2b3C-video.ts");
const U1 = await import("../src/components/modul/story/k2b3C-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K2B3C, V.VIDEO_LUAR_K2B3C];
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

/* ------------------------------ Khusus Sub-Bab C Bab 3 Kelas 2 ------------------------------ */
const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
const M_VIDEO = V.VIDEO_MATERI_K2B3C;
const U = V.VIDEO_LUAR_K2B3C;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
const tidakAda = (objs, ...ids) => ids.every((id) => !ketemu(objs, id));
const sorot = (objs, ...ids) => ids.every((id) => ketemu(objs, id)?.sorot);

const SATUAN = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
const S = "satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan";
const POLA_BIL = new RegExp(`\\b(sebelas|(?:${S}) belas|(?:${S}) puluh(?: (?:${S}))?|sepuluh|${S})\\b`, "g");
const nilaiBil = (m) => {
  if (m === "sebelas") return 11;
  if (m === "sepuluh") return 10;
  const p = m.split(" ");
  if (p[1] === "belas") return 10 + SATUAN[p[0]];
  if (p[1] === "puluh") return 10 * SATUAN[p[0]] + (p[2] ? SATUAN[p[2]] : 0);
  return SATUAN[m];
};
const bilanganSuara = (s) => [...s.toLowerCase().matchAll(POLA_BIL)].map((m) => nilaiBil(m[1]));
sama(bilanganSuara("Segi empat, enam permukaan, keempat sisinya, keduanya, satu per satu, dua arah, tiga cara, lima baris."), [4, 6, 1, 1, 2, 3, 5], "pembaca bilangan suara");
{
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Mystery Bag|Face Printing|Top and Side Views|Tas Misteri|Cetak Permukaan|Pandangan Atas dan Samping/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Mystery Bag", "Face Printing", "Top and Side Views"], ["Tas Misteri", "Cetak Permukaan", "Pandangan Atas dan Samping"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Gudang Mainan Pak Rudi" && U.judul === M_VIDEO.judul && V.JUDUL_K2B3C === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k2b3C-materi" && U.id === "k2b3C-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,gudang,bola-kabur,bisa-diisi,gelinding,kubus-balok,tabung-kerucut-bola,tabel,rak-rapi,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-tas,luar-tas-terapan,luar-cetak,luar-cetak-terapan,luar-pandang,luar-pandang-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46) && U.adegan.every((a) => /Metode global|Ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  const TERLARANG = /\b(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|bernilai|soal|tebak|kunci|latihan)\b/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)) && !/buku|kelompok|bernilai/i.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan)
      for (const [i] of a.ketukan.entries())
        for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 8, `${v.id}/${a.id}#${i + 1}: angka paling besar delapan ("${t}")`);
  // Bilangan yang diucapkan tampak sebagai angka di gambar pada ketukan itu. Sapaan bersama dikecualikan.
  let bilDiucap = 0;
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan)
      if (a.id !== "sapaan")
        a.ketukan.forEach((kt, i) => {
          const terlihat = new Set();
          for (let p = -1; p < L.kataDari(kt.suara).length; p += 1) for (const t of L.teksTerlihat(L.keadaanStory(a, i, p))) for (const b of bilanganDari(t)) terlihat.add(Number(b));
          for (const n of bilanganSuara(kt.suara)) {
            bilDiucap += 1;
            cek(terlihat.has(n), `${v.id}/${a.id}#${i + 1}: bilangan ${n} yang diucapkan tampak sebagai angka`);
          }
        });
  cek(bilDiucap >= 12, `banyak bilangan diucapkan yang diperiksa (${bilDiucap})`);
  const suaraMateri = M_VIDEO.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  const suaraLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [4, 5, 6]) cek(bilanganSuara(suaraMateri).includes(n), `video materi mengucapkan bilangan ${n}`);
  for (const n of [1, 2, 3, 4]) cek(bilanganSuara(suaraLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Chacha", "Dika", "Nia", "Bu Sari", "Pak Rudi", "bangun ruang", "bangun datar", "bisa diisi", "menggelinding", "permukaan datar", "lengkung", "kubus", "balok", "tabung", "kerucut", "bola", "tabel", "rak", "gudang"])
    cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/\bIgil\b/, /Kaka/, /Abang/, /Mamah/, /Malosi/i, /Pak Pos/i, /kebun/i, /bibit/i, /kereta/i, /festival/i, /akuarium/i, /rumah/i, /Kakek Jaya/i, /pustaka/i, /Pak Anto/, /peluit/i, /lomba/i, /kantin/i, /koperasi/i, /seragam/i, /\bkue\b/i, /nampan/i, /pasar malam/i, /Pak Tono/, /Bu Ratna/])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lain ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/belajar bangun ruang/.test(sapa.ketukan[0].suara) && ["Bangun datar dan bangun ruang", "Permukaan datar dan lengkung", "Kubus, balok, tabung, kerucut, dan bola"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  const naskah = readFileSync(new URL("../naskah/story-naskah-k2b3c.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  for (const a of M_VIDEO.adegan) if (a.id !== "sapaan") cek(a.ketukan.length === 3, `materi/${a.id}: tiga ketukan`);
  for (const a of U.adegan) if (a.id !== "sapaan") cek(a.ketukan.length === 4, `global/${a.id}: empat ketukan`);
  let banyakTitik = 0;
  let total = 0;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) { total += 1; if (new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at))).size >= 2) banyakTitik += 1; }
  cek(banyakTitik / total >= 0.9, `visual berubah mengikuti kata pada sedikitnya 90 persen ketukan (${banyakTitik}/${total})`);
  // Bangun ruang digambar sendiri: ada bentuk jalur (polygon atau kurva), tidak hanya emoji.
  let adaJalur = 0;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) if (akhirAdegan(a, i).some((o) => o.t === "jalur")) adaJalur += 1;
  cek(adaJalur >= 20, `bentuk bangun digambar dengan jalur SVG (${adaJalur} ketukan)`);
}
{
  // 1. Gudang bercampur.
  const g = adegan(M_VIDEO, "gudang");
  const g0 = akhirAdegan(g, 0);
  cek(ada(g0, "gd", "gd-g", "gd-p1", "gd-p2", "rd", "rd-br", "m1", "m2-d", "m3-d", "m4-d", "m5-d") && isiTeks(g0, "gd-n") === "GUDANG MAINAN", "gudang: gudang berpintu lebar, Pak Rudi bertopi baret, lima mainan bercampur");
  const g1 = akhirAdegan(g, 1);
  cek(ada(g1, "sr", "sr-hm", "r1", "r2", "r1-k1") && isiTeks(g1, "sb-t0") === "spanduk Taman Dibuka", "gudang: Bu Sari berhelm kuning, rak, spanduk Taman Dibuka belum terpasang");
  const g2 = akhirAdegan(g);
  cek(ada(g2, "kg", "sl", "rb", "pg") && ketemu(g2, "m1").x < 78 && ketemu(g2, "m1").y > 170 && ada(g2, "m2-d"), "gudang: salah rak, bola menggelinding, kardus roboh");
  // 2. Bola kabur.
  const b = adegan(M_VIDEO, "bola-kabur");
  const b0 = akhirAdegan(b, 0);
  cek(ada(b0, "rm", "ch", "tg", "bl", "kd-d") && ketemu(b0, "bl").x < ketemu(b0, "kd-d").x && isiTeks(b0, "nm") === "rak miring", "bola kabur: Chacha menaruh bola di rak miring di sebelah kardus");
  cek(ada(akhirAdegan(b, 1), "dk", "kg") && isiTeks(akhirAdegan(b, 1), "aw-t0") === "Awas!", "bola kabur: Dika berteriak Awas");
  const b2 = akhirAdegan(b);
  cek(ketemu(b2, "bl").x > 230 && ketemu(b2, "bl").y > 170 && ada(b2, "gr", "sr", "kj"), "bola kabur: bola berhenti di dekat sepatu Bu Sari");
  // 3. Bisa diisi.
  const d = adegan(M_VIDEO, "bisa-diisi");
  cek(ada(akhirAdegan(d, 0), "ni", "ni-tp", "tn", "kd-d") && isiTeks(akhirAdegan(d, 0), "bd-t0") === "bisa diisi?", "bisa diisi: Nia bertanya tentang kardus");
  const d1 = akhirAdegan(d, 1);
  cek(ada(d1, "b1-d", "b2-d", "b3-d", "i1", "i2", "i3") && isiTeks(d1, "br-t0") === "bangun ruang" && tidakAda(d1, "kd-d"), "bisa diisi: kardus, kaleng, topi pesta bisa diisi, bangun ruang");
  const d2 = akhirAdegan(d);
  cek(ada(d2, "kt", "kt-x", "kx-k") && isiTeks(d2, "kx-t0") === "tidak bisa diisi" && isiTeks(d2, "dt-t0") === "bangun datar" && tidakAda(d2, "b1-d", "ni"), "bisa diisi: kertas gambar tidak bisa diisi, bangun datar");
  // 4. Gelinding.
  const l = adegan(M_VIDEO, "gelinding");
  const l0 = akhirAdegan(l, 0);
  cek(ada(l0, "lr", "ch", "dk", "bl", "kl-d", "ga", "gb", "sn") && ketemu(l0, "bl").x > 150, "gelinding: bola dan kaleng meluncur di papan lereng");
  const l1 = akhirAdegan(l, 1);
  cek(ada(l1, "dd-d", "kd-d", "dm1", "dm2") && isiTeks(l1, "lk-t0") === "lengkung: menggelinding" && tidakAda(l1, "bl", "kl-d"), "gelinding: dadu dan kardus diam, lengkung menggelinding");
  const l2 = akhirAdegan(l);
  cek(ada(l2, "rk", "k1-d", "k2-d", "k3-d") && ketemu(l2, "k3-d").y < ketemu(l2, "k1-d").y && isiTeks(l2, "dt-t0") === "datar: diam", "gelinding: kardus ditumpuk di rak datar");
  // 5. Kubus dan balok.
  const kb = adegan(M_VIDEO, "kubus-balok");
  const kb0 = akhirAdegan(kb, 0);
  cek(ada(kb0, "dk", "dd-d", "dd-a", "dd-s", "dd-p0") && sorot(kb0, "dd-d") && isiTeks(kb0, "sg-t0") === "segi empat" && isiTeks(kb0, "sg-t1") === "4 sisi sama" && isiTeks(kb0, "kb-t0") === "kubus", "kubus: dadu dengan permukaan datar, segi empat 4 sisi sama");
  const kb1 = akhirAdegan(kb, 1);
  cek(ada(kb1, "bk-d", "bk-a", "bk-s") && isiTeks(kb1, "kp") === "kotak pensil" && isiTeks(kb1, "bl-t0") === "balok" && tidakAda(kb1, "dd-d"), "balok: kotak pensil dengan segi empat berbeda ukuran");
  const kb2 = akhirAdegan(kb);
  cek(ada(kb2, "ch", "kk-d", "bb-d") && isiTeks(kb2, "k6") === "6 permukaan" && isiTeks(kb2, "b6") === "6 permukaan", "kubus dan balok: masing-masing enam permukaan");
  // 6. Tabung, kerucut, bola.
  const tk = adegan(M_VIDEO, "tabung-kerucut-bola");
  const tk0 = akhirAdegan(tk, 0);
  cek(ada(tk0, "kl-d", "kl-l", "tp-d", "tp-p", "kr", "kr-k") && ["n1", "n2", "n3"].map((id) => isiTeks(tk0, id)).join() === "tabung,kerucut,bola", "tabung kerucut bola: kaleng, topi pesta, kelereng berlabel");
  const tk1 = akhirAdegan(tk, 1);
  cek(isiTeks(tk1, "lk-t0") === "permukaan lengkung" && ada(tk1, "p1", "p2", "p3") && sorot(tk1, "kl-d", "tp-d", "kr"), "tabung kerucut bola: permukaan lengkung, bisa menggelinding");
  const tk2 = akhirAdegan(tk);
  cek(ada(tk2, "ch", "lg", "ar", "tp-d") && ketemu(tk2, "tp-d").x > 200 && isiTeks(tk2, "ln") === "lingkaran besar", "tabung kerucut bola: topi pesta berputar membentuk lingkaran besar");
  // 7. Tabel.
  const tb = adegan(M_VIDEO, "tabel");
  const tb0 = akhirAdegan(tb, 0);
  cek(ada(tb0, "pc", "dk", "tb-h0", "tb-h1") && ["kubus", "balok", "tabung", "kerucut", "bola"].every((n, i) => isiTeks(tb0, `tb-r${i}at`) === n) && isiTeks(tb0, "lm-t0") === "5 baris", "tabel: papan catatan Dika dengan lima baris bangun ruang");
  const tb1 = akhirAdegan(tb, 1);
  cek(["tb-r0bt", "tb-r1bt", "tb-r2bt"].map((id) => isiTeks(tb1, id)).join() === "dadu,kotak pensil,kaleng" && ada(tb1, "b1-d", "b2-d", "b3-d"), "tabel: dadu ke kubus, kotak pensil ke balok, kaleng ke tabung");
  const tb2 = akhirAdegan(tb);
  cek(["tb-r3bt", "tb-r4bt"].map((id) => isiTeks(tb2, id)).join() === "topi pesta,kelereng" && ada(tb2, "b4-d", "b5", "ok"), "tabel: topi pesta ke kerucut, kelereng ke bola");
  // 8. Rak rapi.
  const r = adegan(M_VIDEO, "rak-rapi");
  const r0 = akhirAdegan(r, 0);
  cek(ada(r0, "sr", "sr-hm", "ch", "rk", "k1-d", "dd-d", "k2-d") && ketemu(r0, "k2-d").y < ketemu(r0, "k1-d").y && isiTeks(r0, "rn") === "rak datar", "rak rapi: kardus dan dadu ditumpuk di rak datar");
  const r1 = akhirAdegan(r, 1);
  cek(ada(r1, "wd", "wd-p0", "wd-p4", "bl", "kr", "sl") && ketemu(r1, "bl").y > 130, "rak rapi: bola dan kelereng di wadah berpagar");
  const r2 = akhirAdegan(r);
  cek(ketemu(r2, "ch").isi === "\u{1F60C}" && isiTeks(r2, "sm-t0") === "semua mainan diam" && ada(r2, "an"), "rak rapi: semua mainan diam, Chacha lega");
  // 9. Penutup.
  const z = adegan(M_VIDEO, "penutup");
  const z0 = akhirAdegan(z, 0);
  cek(ada(z0, "gb", "gb-t1", "gb-t2", "kf0", "kf13", "ak1", "ak2", "ak3", "pt00", "pt37") && isiTeks(z0, "gb-n") === "Taman Dibuka", "penutup: gerbang Taman Dibuka, konfeti, anak berlarian di petak ubin");
  cek(ada(akhirAdegan(z, 1), "pz0", "pz3", "rk", "k1-d", "dd-d", "wd", "sn"), "penutup: papan puzzle lengkap, rak mainan tertata");
  const z2 = akhirAdegan(z);
  cek(["r1", "r2", "r3"].map((id) => isiTeks(z2, id)).join() === "bangun ruang bisa diisi,ada yang datar,ada yang lengkung" && ada(z2, "ch", "dk", "ni", "sr", "rd", "tn", "pc"), "penutup: rangkuman Dika, lima tokoh melambai");
}
{
  // Pembuka metode global.
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "rd", "rd-br", "am0", "am1", "am2", "lc") && isiTeks(akhirAdegan(op, 0), "tg3-t0") === "3 amplop tua", "global pembuka: Pak Rudi menyerahkan tiga amplop dari laci gudang");
  cek(ada(akhirAdegan(op, 1), "sr", "sr-hm", "cr-k", "sc"), "global pembuka: Bu Sari membuka amplop, tiga cara");
  sama(["m0-t0", "m1-t0", "m2-t0"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Mystery Bag", "2. Face Printing", "3. Top and Side Views"], "global pembuka: tiga nama metode");
  sama(["n0-t0", "n1-t0", "n2-t0"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["1. Tas Misteri", "2. Cetak Permukaan", "3. Pandangan Atas dan Samping"], "global pembuka: tiga nama bahasa Indonesia");
  // Mystery Bag.
  const t = adegan(U, "luar-tas");
  cek(ada(akhirAdegan(t, 0), "ts", "ts-t", "ts-q", "mb", "tm") && isiTeks(akhirAdegan(t, 0), "hd-t0") === "Mystery Bag · Tas Misteri", "Mystery Bag: tas kain misteri");
  cek(ada(akhirAdegan(t, 1), "ts", "rb", "hm-k") && tidakAda(akhirAdegan(t, 1), "mb", "bn-d"), "Mystery Bag: benda disembunyikan, hanya meraba");
  cek(isiTeks(akhirAdegan(t, 2), "r1-t0") === "permukaan rata" && isiTeks(akhirAdegan(t, 2), "r2-t0") === "permukaan lengkung" && isiTeks(akhirAdegan(t, 2), "c1") === "1" && isiTeks(akhirAdegan(t, 2), "c2") === "2", "Mystery Bag: ciri rata dan lengkung disebut satu per satu");
  cek(isiTeks(akhirAdegan(t), "nm-t0") === "nama bangun ruang" && ada(akhirAdegan(t), "pn", "jm"), "Mystery Bag: dari ciri ke nama bangun ruang");
  const tp = adegan(U, "luar-tas-terapan");
  cek(ada(akhirAdegan(tp, 0), "ch", "ts", "rb", "rt-k", "sm-k"), "Mystery Bag terapan: Chacha meraba tas, rata dan sama di semua sisi");
  cek(isiTeks(akhirAdegan(tp, 1), "kb-t0") === "kubus?" && ada(akhirAdegan(tp, 1), "dd-d", "dd-p0", "jm", "dn") && tidakAda(akhirAdegan(tp, 1), "ts"), "Mystery Bag terapan: kubus ternyata dadu");
  cek(isiTeks(akhirAdegan(tp, 2), "ck-t0") === "cocok untuk rasa" && ada(akhirAdegan(tp, 2), "ts", "cr-k", "rb"), "Mystery Bag terapan: cocok melatih mengenali ciri");
  cek(isiTeks(akhirAdegan(tp), "kr-t0") === "kurang cocok" && ada(akhirAdegan(tp), "kk-d", "bb-d", "tn", "rb"), "Mystery Bag terapan: kubus dan balok sulit dibedakan");
  // Face Printing.
  const c = adegan(U, "luar-cetak");
  cek(ada(akhirAdegan(c, 0), "bt", "bt-i", "fp", "cp") && isiTeks(akhirAdegan(c, 0), "hd-t0") === "Face Printing · Cetak Permukaan", "Face Printing: bantalan tinta");
  cek(ada(akhirAdegan(c, 1), "kb-d", "pd", "kr", "cx", "pc", "bt") && isiTeks(akhirAdegan(c, 1), "sp-t0") === "1 permukaan", "Face Printing: satu permukaan ditekan lalu dicetak di kertas");
  cek(ada(akhirAdegan(c, 2), "kr", "cx", "bd-k", "pr-k") && sorot(akhirAdegan(c, 2), "cx"), "Face Printing: hasil cetakan bangun datar");
  cek(isiTeks(akhirAdegan(c), "cxn") === "bangun datar" && isiTeks(akhirAdegan(c), "kbn") === "bangun ruang" && ada(akhirAdegan(c), "lm", "kb-d"), "Face Printing: ada bangun datar di permukaan bangun ruang");
  const cp = adegan(U, "luar-cetak-terapan");
  cek(ada(akhirAdegan(cp, 0), "ni", "dd-d", "sq", "kr") && isiTeks(akhirAdegan(cp, 0), "sg-t0") === "segi empat: 4 sisi sama", "Face Printing terapan: cetak dadu menjadi segi empat");
  cek(ada(akhirAdegan(cp, 1), "kl-d", "lk") && isiTeks(akhirAdegan(cp, 1), "lkn") === "lingkaran" && tidakAda(akhirAdegan(cp, 1), "dd-d", "sq"), "Face Printing terapan: cetak alas kaleng menjadi lingkaran");
  cek(isiTeks(akhirAdegan(cp, 2), "ck-t0") === "cocok untuk benda rata" && ada(akhirAdegan(cp, 2), "kd-d") && sorot(akhirAdegan(cp, 2), "kd-d"), "Face Printing terapan: cocok untuk permukaan rata");
  cek(isiTeks(akhirAdegan(cp), "kr-t0") === "kurang cocok untuk bola" && ada(akhirAdegan(cp), "bl", "sl", "ks", "tn"), "Face Printing terapan: bola tidak bisa dicetak");
  // Top and Side Views.
  const p = adegan(U, "luar-pandang");
  cek(ada(akhirAdegan(p, 0), "tv", "pa-k", "mt") && isiTeks(akhirAdegan(p, 0), "hd-t0") === "Top and Side Views · Pandangan Atas dan Samping", "Top and Side Views: pengantar");
  cek(ada(akhirAdegan(p, 1), "kc-d", "m1", "m2", "p1", "p2") && isiTeks(akhirAdegan(p, 1), "t1") === "dari atas" && isiTeks(akhirAdegan(p, 1), "t2") === "dari samping", "Top and Side Views: lihat dari atas lalu dari samping");
  cek(ada(akhirAdegan(p, 2), "kc-d", "lg", "sg") && isiTeks(akhirAdegan(p, 2), "lgn") === "tampak atas" && isiTeks(akhirAdegan(p, 2), "sgn") === "tampak samping", "Top and Side Views: tampak atas lingkaran, tampak samping segitiga");
  cek(isiTeks(akhirAdegan(p), "dr-t0") === "2 arah" && ada(akhirAdegan(p), "lm", "jm", "lg", "sg"), "Top and Side Views: bayangan dari dua arah");
  const pp = adegan(U, "luar-pandang-terapan");
  cek(ada(akhirAdegan(pp, 0), "dk", "kc-d", "m1", "lg") && isiTeks(akhirAdegan(pp, 0), "lgn") === "lingkaran", "Top and Side Views terapan: kerucut dari atas lingkaran");
  cek(ada(akhirAdegan(pp, 1), "m2", "sg") && isiTeks(akhirAdegan(pp, 1), "sgn") === "segitiga" && tidakAda(akhirAdegan(pp, 1), "lg", "m1"), "Top and Side Views terapan: kerucut dari samping segitiga");
  cek(isiTeks(akhirAdegan(pp, 2), "ck-t0") === "cocok untuk dilihat" && ada(akhirAdegan(pp, 2), "kl-d", "tg", "sl", "mt"), "Top and Side Views terapan: benda tidak boleh disentuh");
  cek(isiTeks(akhirAdegan(pp), "sa-t0") === "hanya 1 arah" && ada(akhirAdegan(pp), "kk-d", "bb-d", "ka", "ba") && isiTeks(akhirAdegan(pp), "sm-t0") === "sama: segi empat (4 sisi)", "Top and Side Views terapan: dari satu arah kubus dan balok sama-sama segi empat");
  // Ringkasan.
  const rk = adegan(U, "luar-ringkas");
  cek(["r0-t0", "r1-t0", "r2-t0"].map((id) => isiTeks(akhirAdegan(rk, 0), id)).join() === U1.NAMA_METODE.map((m, i) => `${i + 1}. ${m} · ${U1.NAMA_METODE_ID[i]}`).join(), "ringkasan: tiga metode");
  cek(isiTeks(akhirAdegan(rk, 1), "q0-t1") === "pakai Tas Misteri" && isiTeks(akhirAdegan(rk, 1), "q1-t1") === "pakai Cetak Permukaan" && isiTeks(akhirAdegan(rk, 2), "q2-t1") === "pakai Pandangan Atas dan Samping", "ringkasan: pilih cara menurut keadaan benda");
  cek(isiTeks(akhirAdegan(rk, 2), "pu-t0") === "apa pun caranya: lihat permukaan" && ada(akhirAdegan(rk), "bl", "pc0-k", "pc1-k", "pc2-k"), "ringkasan: pertanyaan bola, tiga pilihan cara");
}
function jumlahDengan(objs, awalan) {
  return objs.filter((o) => new RegExp(`^${awalan}\\d+$`).test(o.id)).length;
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k2b3C-.*\.ts$/.test(f));
  cek(berkas.length >= 8, `berkas story k2b3C (${berkas.length})`);
  cek(!berkas.includes("k2b3C-materi-4.ts") && !berkas.includes("k2b3C-materi-5.ts"), "k2b3C-materi-4.ts dan k2b3C-materi-5.ts sudah dihapus");
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s), `${f}: tanpa kata buku`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k1b1a-[a-z0-9-]+|k1b4a-gambar|k2b3C-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, k1b1a, k1b4a-gambar, atau k2b3C (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95 tanpa ZWJ`);
  const pb = readFileSync(new URL("../src/components/modul/video-k2b3c.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K2B3C/.test(pb) && /VIDEO_LUAR_K2B3C/.test(pb) && /export function VideoK2B3C/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿"), "video-k2b3c.tsx memakai dua video Story dan jeda seragam");
}


for (const v of VIDEO) {
  const n = kataVideo(v);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
