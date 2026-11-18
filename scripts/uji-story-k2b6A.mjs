// Uji Story Kelas 2 Bab 6 Sub-Bab A "Peralatan Lomba Pak Anton" (berat benda), awal cerita Hari Olahraga Sekolah: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k2b6A.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k2b6A-video.ts");

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
const VIDEO = [V.VIDEO_MATERI_K2B6A, V.VIDEO_LUAR_K2B6A];
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
      cek(kata.length >= 5 && kata.length <= 40, `${nama}#${i + 1}: 5 sampai 40 kata (ada ${kata.length})`);
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



/* ------------------------------ Khusus Sub-Bab A Kelas 2 Bab 6 ------------------------------ */
{
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k2b6A-luar-1.ts");
  const M_VIDEO = V.VIDEO_MATERI_K2B6A;
  const U = V.VIDEO_LUAR_K2B6A;
  const adegan = (v, id) => v.adegan.find((a) => a.id === id);
  const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  const ketemu = (objs, id) => objs.find((o) => o.id === id);
  const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
  const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
  const tidakAda = (objs, ...ids) => ids.every((id) => !ketemu(objs, id));

  const SATUAN = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9, sepuluh: 10 };
  const POLA_BIL = /\b(satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan|sepuluh)\b/g;
  const bilanganSuara = (s) => [...s.toLowerCase().matchAll(POLA_BIL)].map((m) => SATUAN[m[1]]);
  sama(bilanganSuara("Satu, dua, kedua, keduanya, satuannya, sepuluh."), [1, 2, 10], "pembaca bilangan suara (satuan)");
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Bar Model|Dot Balance|Heavy First|Model Batang|Neraca Titik|Berat di Dasar/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Bar Model", "Dot Balance", "Heavy First"], ["Model Batang", "Neraca Titik", "Berat di Dasar"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Peralatan Lomba Pak Anton" && U.judul === M_VIDEO.judul && V.JUDUL_K2B6A === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k2b6A-materi" && U.id === "k2b6A-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,troli-datang,salah-besar,tiga-cara,posisi-kata,tiga-benda,kira-bukti,satuan,dua-hasil,rantai-penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-batang,luar-batang-terapan,luar-titik,luar-titik-terapan,luar-dasar,luar-dasar-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan)/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda (di|dari) rumah|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
  // Angka di gambar paling besar sepuluh.
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) for (const [i] of a.ketukan.entries()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 10, `${v.id}/${a.id}#${i + 1}: angka paling besar sepuluh ("${t}")`);
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
  for (const n of [1, 2, 3, 4, 10]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [1, 2, 3, 9]) cek(bilanganSuara(semuaLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Chacha", "Dika", "Nia", "Bu Sari", "Pak Anton", "Bu Ratna", "bola karet raksasa", "kerucut", "kantong pasir", "gantungan baju", "papan jungkat-jungkit", "lebih berat", "lebih ringan", "sama berat", "paling berat", "paling ringan", "kira-kira", "satuan tidak baku", "kelereng", "bola tenis", "boneka harimau", "pepaya", "mangga", "manggis", "jam besar"])
    cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/Igil/, /Kaka/, /Abang/, /Mamah/, /Pak Pos/i, /rumah rapi/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /pustaka/i, /perpustakaan/i, /kantin/i, /koperasi/i, /seragam/i, /Bu Dewi/, /Pak Rudi/, /Pak Tono/, /Pak Hasan/, /Bu Mira/, /ubin/i, /taman bermain/i, /puzzle/i, /gudang/i, /pameran/i, /\baula\b/i, /\brak\b/i, /manik/i, /Pak Joko/, /Pak Danu/, /Bu Wati/, /kebun/i, /semangka/i, /bedeng/i, /gerobak/i, /pagar/i])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/berat benda/.test(sapa.ketukan[0].suara) && ["Membandingkan berat dua benda", "Kata lebih berat dan lebih ringan", "Mengukur berat dengan satuan tidak baku"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k2b6a.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  // Visual berubah mengikuti kata pada hampir semua ketukan.
  let banyakTitik = 0;
  let total = 0;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) { total += 1; if (new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at))).size >= 2) banyakTitik += 1; }
  cek(banyakTitik / total >= 0.9, `visual berubah mengikuti kata pada sedikitnya 90 persen ketukan (${banyakTitik}/${total})`);
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") cek(akhirAdegan(a).some((o) => o.t !== "teks"), `${v.id}/${a.id}: gambar akhir memuat bentuk gambar sendiri, bukan hanya teks`);

  // Isi tiap adegan materi.
  const d = adegan(M_VIDEO, "troli-datang");
  cek(ada(akhirAdegan(d, 0), "lp", "bd", "tn", "pa", "pa-cp", "pa-ks", "tr", "kc", "kp", "bl") && isiTeks(akhirAdegan(d, 0), "pa-n") === "Pak Anton" && ketemu(akhirAdegan(d, 0), "tr").x > 90, "troli datang: lapangan, Pak Anton berkaus dan bertopi oranye mendorong troli berisi kerucut, kantong pasir, bola");
  cek(ada(akhirAdegan(d, 1), "bs", "bs-cp", "bs-pl", "kb", "kk") && isiTeks(akhirAdegan(d, 1), "lb") === "Biru" && isiTeks(akhirAdegan(d, 1), "lk") === "Kuning", "troli datang: Bu Sari berpeluit, dua keranjang tim Biru dan Kuning");
  cek(ada(akhirAdegan(d), "kc", "kp", "ch") && isiTeks(akhirAdegan(d), "n1") === "1 jari" && isiTeks(akhirAdegan(d), "n2") === "2 tangan", "troli datang: kerucut satu jari, kantong dua tangan");
  const s = adegan(M_VIDEO, "salah-besar");
  cek(ada(akhirAdegan(s, 0), "ch", "pn", "bk", "k1", "k2") && isiTeks(akhirAdegan(s, 0), "pb") === "paling berat?", "salah besar: Chacha menunjuk bola raksasa, taruhan kerucut");
  cek(ketemu(akhirAdegan(s, 1), "bk").y < 80 && ada(akhirAdegan(s, 1), "pa", "pa-cp") && ketemu(akhirAdegan(s, 1), "pa-cp").y < 120, "salah besar: bola melayang, topi Pak Anton terbang");
  cek(ada(akhirAdegan(s), "dk", "bn", "bt") && ketemu(akhirAdegan(s), "dk").isi === "\u{1F604}" && isiTeks(akhirAdegan(s), "bb") === "besar belum tentu berat", "salah besar: Dika tertawa, balon besar ringan, batu kecil berat");
  const t3 = adegan(M_VIDEO, "tiga-cara");
  cek(isiTeks(akhirAdegan(t3, 0), "n3") === "3 cara" && ada(akhirAdegan(t3, 0), "q1", "q2", "q3", "ni-tp"), "tiga cara: Nia dan tiga kartu kosong");
  cek(ada(akhirAdegan(t3, 1), "th", "mg", "mp") && [isiTeks(akhirAdegan(t3, 1), "l1"), isiTeks(akhirAdegan(t3, 1), "l2"), isiTeks(akhirAdegan(t3, 1), "l3")].join() === "tangan,gantungan,jungkat-jungkit", "tiga cara: tangan, gantungan, jungkat-jungkit");
  cek(ada(akhirAdegan(t3), "gw-p", "gt", "kl", "kr") && ketemu(akhirAdegan(t3), "gt").y2 > 0 && ketemu(akhirAdegan(t3), "kr").y > ketemu(akhirAdegan(t3), "kl").y, "tiga cara: gantungan di gawang, kantong kanan turun");
  const p = adegan(M_VIDEO, "posisi-kata");
  cek(ketemu(akhirAdegan(p, 0), "pj").y2 > 0 && ada(akhirAdegan(p, 0), "kp", "va", "pb", "pa") && isiTeks(akhirAdegan(p, 0), "ta") === "atas" && isiTeks(akhirAdegan(p, 0), "tb") === "bawah", "posisi: yang berat di bawah, yang ringan di atas");
  cek(ketemu(akhirAdegan(p, 1), "pj").y2 === 0 && ada(akhirAdegan(p, 1), "b1", "b2", "ch") && isiTeks(akhirAdegan(p, 1), "sb") === "sama berat" && tidakAda(akhirAdegan(p, 1), "va", "kp"), "posisi: dua bola sama berat, papan datar");
  cek(ada(akhirAdegan(p), "c1-k", "c2-k", "c3-k", "m1", "m2", "m3") && isiTeks(akhirAdegan(p), "n3") === "3 kata", "posisi: tiga kartu kata");
  const b = adegan(M_VIDEO, "tiga-benda");
  cek(ada(akhirAdegan(b, 0), "pa", "pj", "kp", "bb", "bv"), "tiga benda: Pak Anton menaruh tiga benda di papan");
  cek(ada(akhirAdegan(b, 1), "mk", "aw", "l1", "l2", "l3") && isiTeks(akhirAdegan(b, 1), "l1") === "paling berat" && isiTeks(akhirAdegan(b, 1), "l3") === "paling ringan", "tiga benda: paling berat dan paling ringan");
  cek(ada(akhirAdegan(b), "c1-k", "c2-k", "o1", "o2", "o3") && isiTeks(akhirAdegan(b), "n3") === "3 benda atau lebih", "tiga benda: tiga atau lebih memakai dua kata");
  const kb = adegan(M_VIDEO, "kira-bukti");
  cek(ada(akhirAdegan(kb, 0), "dk", "pc", "s1", "s2", "s3", "s4") && isiTeks(akhirAdegan(kb, 0), "n4") === "4 langkah", "kira-bukti: papan catatan empat langkah");
  cek(ada(akhirAdegan(kb, 1), "gt", "rk", "bt", "pt") && ketemu(akhirAdegan(kb, 1), "bt").y > 105 && tidakAda(akhirAdegan(kb, 1), "tq", "kr"), "kira-bukti: botol minum turun setelah ditimbang");
  cek(ada(akhirAdegan(kb), "t1-k", "t2-k", "x1", "o1", "bs", "ch", "ct"), "kira-bukti: Chacha mencatat hasil di tabel");
  const sa = adegan(M_VIDEO, "satuan");
  cek(ada(akhirAdegan(sa, 0), "bx", "sb", "sk", "sn", "st", "pa") && isiTeks(akhirAdegan(sa, 0), "sat") === "satuan tidak baku", "satuan: kotak berisi balok, kelereng, koin, bola tenis");
  cek(ada(akhirAdegan(sa, 1), "nr", "hm", "bt0", "bt1", "bt2", "ni") && tidakAda(akhirAdegan(sa, 1), "bt3"), "satuan: boneka harimau dan bola tenis ditambah satu per satu");
  cek(ada(akhirAdegan(sa), "bt0", "bt1", "bt2", "bt3", "ok") && ketemu(akhirAdegan(sa), "nr").y2 === 0 && isiTeks(akhirAdegan(sa), "n5") === "boneka sama dengan 4 bola tenis", "satuan: empat bola tenis, neraca seimbang");
  const dh = adegan(M_VIDEO, "dua-hasil");
  cek(ada(akhirAdegan(dh, 0), "nr", "hm", "kl0", "kl9", "dk") && ketemu(akhirAdegan(dh, 0), "nr").y2 === 0 && isiTeks(akhirAdegan(dh, 0), "n10") === "10 kelereng", "dua hasil: sepuluh kelereng membuat neraca seimbang");
  cek(ada(akhirAdegan(dh, 1), "hm", "ka-k", "kb-k") && isiTeks(akhirAdegan(dh, 1), "ka-t0") === "4 bola tenis" && isiTeks(akhirAdegan(dh, 1), "kb-t0") === "10 kelereng", "dua hasil: dua kartu hasil berbeda");
  cek(ada(akhirAdegan(dh), "lr", "lb", "n1", "oku", "xm") && ada(akhirAdegan(dh), "u0", "m0"), "dua hasil: satuan ringan perlu lebih banyak, satu jenis satuan");
  const rp = adegan(M_VIDEO, "rantai-penutup");
  cek(ada(akhirAdegan(rp, 0), "py", "mg1", "mg2", "mg0", "ms1", "ms2", "bs") && isiTeks(akhirAdegan(rp, 0), "l1") === "1 pepaya = 2 mangga" && isiTeks(akhirAdegan(rp, 0), "l2") === "1 mangga = 2 manggis", "rantai: satu pepaya dua mangga, satu mangga dua manggis");
  cek(ada(akhirAdegan(rp, 1), "py", "ms0", "ms3", "ch", "kc4") && isiTeks(akhirAdegan(rp, 1), "l1") === "1 pepaya = 4 manggis" && ketemu(akhirAdegan(rp, 1), "ch").isi === "\u{1F635}", "rantai: empat manggis, Chacha membawa kerucut sambil terhuyung");
  cek(ada(akhirAdegan(rp), "br", "br-cp", "jm", "tq", "ch", "dk", "ni", "bs", "pa") && isiTeks(akhirAdegan(rp), "br-n") === "Bu Ratna", "rantai: Bu Ratna bertopi biru membawa jam besar, lima tokoh melambai");
  // Isi tiap adegan metode global.
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "tr", "ni", "c0-k", "c1-k", "c2-k") && isiTeks(akhirAdegan(op, 0), "n3") === "3 kertas", "global pembuka: troli dan tiga kertas lipat");
  cek(ada(akhirAdegan(op, 1), "pa", "kc", "kp", "ok") && ketemu(akhirAdegan(op, 1), "pa").isi === "\u{1F60A}", "global pembuka: Pak Anton tersenyum, cara pelatih memilih peralatan");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Bar Model", "2. Dot Balance", "3. Heavy First"], "global pembuka: tiga nama metode");
  sama(["n0", "n1", "n2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Model Batang", "Neraca Titik", "Berat di Dasar"], "global pembuka: tiga nama bahasa Indonesia");
  const c = adegan(U, "luar-batang");
  cek(ada(akhirAdegan(c, 0), "ib1", "ib2", "ib3") && isiTeks(akhirAdegan(c, 0), "nm") === "Model Batang", "Model Batang konsep: tiga batang");
  cek(ada(akhirAdegan(c, 1), "b1", "b2", "b3", "kp", "bo", "rk", "pa") && isiTeks(akhirAdegan(c, 1), "n1") === "1 batang", "Model Batang konsep: satu batang untuk setiap benda, makin berat makin tinggi");
  cek(ada(akhirAdegan(c, 2), "c6", "c4", "c2", "sk0") && isiTeks(akhirAdegan(c, 2), "n1") === "1 kotak = 1 satuan", "Model Batang konsep: kotak dihitung");
  cek(ada(akhirAdegan(c), "mk", "aw", "l1", "l3") && ketemu(akhirAdegan(c), "b1").sorot && ketemu(akhirAdegan(c), "b3").sorot, "Model Batang konsep: batang tertinggi dan terpendek");
  const ct = adegan(U, "luar-batang-terapan");
  cek(ada(akhirAdegan(ct, 0), "dk", "bk", "bb", "bv", "kp", "t9") && isiTeks(akhirAdegan(ct, 0), "t9") === "9 kotak", "Model Batang terapan: batang pasir sembilan kotak");
  cek(isiTeks(akhirAdegan(ct, 1), "t6") === "6 kotak" && isiTeks(akhirAdegan(ct, 1), "t3") === "3 kotak" && ada(akhirAdegan(ct, 1), "r1", "r2", "r3", "ok"), "Model Batang terapan: enam, tiga, dan urutan");
  cek(ada(akhirAdegan(ct, 2), "ok", "cc-k", "g0", "g4") && ada(akhirAdegan(ct, 3), "xs", "h1", "h2", "jm", "pn") && isiTeks(akhirAdegan(ct, 3), "n2") === "2 benda", "Model Batang terapan: cocok untuk banyak benda, kurang cocok untuk dua");
  const tk = adegan(U, "luar-titik");
  cek(ada(akhirAdegan(tk, 0), "nr", "nr-pL", "nr-pR") && isiTeks(akhirAdegan(tk, 0), "nm") === "Neraca Titik", "Neraca Titik konsep: neraca dua piringan");
  cek(isiTeks(akhirAdegan(tk, 1), "n2") === "2 piringan" && ada(akhirAdegan(tk, 1), "dl3", "dr1") && ketemu(akhirAdegan(tk, 1), "nr").y2 < 0, "Neraca Titik konsep: titik di tiap piringan, kiri lebih banyak dan turun");
  cek(isiTeks(akhirAdegan(tk, 2), "kt-t0") === "1 titik = 1 satuan berat" && ada(akhirAdegan(tk, 2), "pb", "lb"), "Neraca Titik konsep: satu titik satu satuan, lebih banyak lebih berat");
  cek(ketemu(akhirAdegan(tk), "nr").y2 === 0 && ada(akhirAdegan(tk), "dr3", "ok", "sb") && tidakAda(akhirAdegan(tk), "pb", "lb"), "Neraca Titik konsep: titik sama, seimbang");
  const tt = adegan(U, "luar-titik-terapan");
  cek(ada(akhirAdegan(tt, 0), "ni", "bs", "rk", "dl4", "dr3") && isiTeks(akhirAdegan(tt, 0), "n5") === "5 titik" && isiTeks(akhirAdegan(tt, 0), "n4") === "4 titik" && ketemu(akhirAdegan(tt, 0), "nr").y2 < 0, "Neraca Titik terapan: bola basket lima titik turun, raket empat titik");
  cek(isiTeks(akhirAdegan(tt, 1), "sl") === "selisih 1 titik" && ketemu(akhirAdegan(tt, 1), "dl4").sorot, "Neraca Titik terapan: selisih satu titik");
  cek(ada(akhirAdegan(tt, 2), "ok", "cc-k", "ra4", "rb3") && ada(akhirAdegan(tt, 3), "xs", "x39", "tq"), "Neraca Titik terapan: cocok untuk selisih, kurang cocok untuk titik terlalu banyak");
  const dd = adegan(U, "luar-dasar");
  cek(ada(akhirAdegan(dd, 0), "d1", "d2", "d3") && isiTeks(akhirAdegan(dd, 0), "nm") === "Berat di Dasar", "Berat di Dasar konsep: tumpukan tiga kotak");
  cek(ada(akhirAdegan(dd, 1), "ik", "ib", "ir", "l1", "l3", "pa") && ketemu(akhirAdegan(dd, 1), "ik").x < ketemu(akhirAdegan(dd, 1), "ib").x, "Berat di Dasar konsep: benda diurutkan dari paling berat");
  cek(ada(akhirAdegan(dd, 2), "d1", "d2", "d3", "pb", "pt") && isiTeks(akhirAdegan(dd, 2), "l1") === "paling berat", "Berat di Dasar konsep: paling berat paling bawah");
  cek(ada(akhirAdegan(dd), "ok", "bs", "w1", "w2", "xs"), "Berat di Dasar konsep: tumpukan kokoh dan contoh remuk");
  const dt = adegan(U, "luar-dasar-terapan");
  cek(ada(akhirAdegan(dt, 0), "ch", "kj", "py", "mg", "ms") && ketemu(akhirAdegan(dt, 0), "py").y > ketemu(akhirAdegan(dt, 0), "ms").y, "Berat di Dasar terapan: pepaya paling bawah, manggis paling atas");
  cek(ada(akhirAdegan(dt, 1), "ok", "bs", "sr") && ketemu(akhirAdegan(dt, 1), "ch").isi === "\u{1F604}", "Berat di Dasar terapan: keranjang kokoh, Chacha bersorak");
  cek(ada(akhirAdegan(dt, 2), "ok", "cc-k", "f0", "f4", "kj") && ada(akhirAdegan(dt, 3), "xs", "cc-k", "nr", "xt"), "Berat di Dasar terapan: cocok untuk menata, kurang cocok untuk tahu yang lebih berat saja");
  const rk = adegan(U, "luar-ringkas");
  cek(["r0-t0", "r1-t0", "r2-t0"].map((id) => isiTeks(akhirAdegan(rk, 0), id)).join() === U1.NAMA_METODE_ID.map((m, i) => `${i + 1}. ${m}`).join() && isiTeks(akhirAdegan(rk, 0), "t3") === "3 cara", "ringkasan: tiga metode");
  cek(ketemu(akhirAdegan(rk, 1), "r1-k").sorot && !ketemu(akhirAdegan(rk, 1), "r0-k").sorot && ada(akhirAdegan(rk, 1), "sb1", "sd0") && isiTeks(akhirAdegan(rk, 1), "n1") === "1 gambar", "ringkasan: Model Batang untuk banyak benda, Neraca Titik untuk selisih");
  cek(ketemu(akhirAdegan(rk, 2), "r2-k").sorot && ada(akhirAdegan(rk, 2), "sk1", "ok"), "ringkasan: Berat di Dasar untuk menata dan mengangkut");
  cek(ada(akhirAdegan(rk), "rs", "tq", "p0-k", "p1-k", "p2-k"), "ringkasan: pertanyaan menata ransel");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k2b6A-.*\.ts$/.test(f));
  cek(berkas.length >= 8, `berkas story k2b6A (${berkas.length})`);
  cek(!berkas.includes("k2b6A-materi-4.ts"), "k2b6A-materi-4.ts sudah dihapus");
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s), `${f}: tanpa kata buku`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k2b6A-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k2b6A (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k2b6a.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K2B6A/.test(pb) && /VIDEO_LUAR_K2B6A/.test(pb) && /export function VideoK2B6A/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿") && !/data-k2b6|video-k2b6-umum/.test(pb), "video-k2b6a.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
