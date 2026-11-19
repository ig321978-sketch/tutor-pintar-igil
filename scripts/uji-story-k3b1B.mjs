// Uji Story Kelas 3 Bab 1 Sub-Bab B "Kartu Harga Bu Wati" (tempat angka), cerita Toko Kelontong Pak Joko: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k3b1B.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k3b1B-video.ts");
const U1 = await import("../src/components/modul/story/k3b1B-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K3B1B, V.VIDEO_LUAR_K3B1B];
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
      cek(kata.length >= 4 && kata.length <= 40, `${nama}#${i + 1}: 4 sampai 40 kata (ada ${kata.length})`);
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

/* ------------------------------ Khusus Sub-Bab B Kelas 3 Bab 1 ------------------------------ */
const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
const M_VIDEO = V.VIDEO_MATERI_K3B1B;
const U = V.VIDEO_LUAR_K3B1B;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
const tak = (objs, ...ids) => ids.every((id) => !ketemu(objs, id));

/** Bilangan yang diucapkan (kata, sampai ratusan) sebagai angka. Tanda baca memutus bilangan. */
const SAT = { nol: 0, satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
function bilanganSuara(s) {
  const w = s.toLowerCase().replace(/[.,?!:;]/g, " | ").split(/\s+/).filter(Boolean);
  const unit = (x) => x !== undefined && x in SAT;
  const hasil = [];
  let i = 0;
  while (i < w.length) {
    let total = 0;
    let cocok = false;
    let ratus = false;
    if (w[i] === "seratus") {
      total = 100;
      i += 1;
      cocok = true;
      ratus = true;
    } else if (unit(w[i]) && w[i] !== "nol" && w[i + 1] === "ratus") {
      total = SAT[w[i]] * 100;
      i += 2;
      cocok = true;
      ratus = true;
    }
    let t = null;
    if (w[i] === "sepuluh") {
      t = 10;
      i += 1;
    } else if (w[i] === "sebelas") {
      t = 11;
      i += 1;
    } else if (unit(w[i]) && w[i + 1] === "belas") {
      t = 10 + SAT[w[i]];
      i += 2;
    } else if (unit(w[i]) && w[i] !== "nol" && w[i + 1] === "puluh") {
      t = SAT[w[i]] * 10;
      i += 2;
      if (unit(w[i]) && w[i] !== "nol") {
        t += SAT[w[i]];
        i += 1;
      }
    }
    if (t !== null) {
      total += t;
      cocok = true;
    } else if (ratus && unit(w[i]) && w[i] !== "nol") {
      total += SAT[w[i]];
      i += 1;
    } else if (!cocok && unit(w[i])) {
      total = SAT[w[i]];
      i += 1;
      cocok = true;
    }
    if (cocok) hasil.push(total);
    else i += 1;
  }
  return hasil;
}
sama(bilanganSuara("Dua ratus lima puluh satu, enam ratus dua; tujuh ratus, lima puluh, dan tiga. Seratus, sepuluh, sebelas, empat nol dan delapan."), [251, 602, 700, 50, 3, 100, 10, 11, 4, 0, 8], "pembaca bilangan suara sampai ratusan");
sama(bilanganSuara("Sembilan ratus delapan puluh tujuh, tiga puluh enam."), [987, 36], "pembaca bilangan suara: ratusan, puluhan");
const angkaTampak = (objs) => {
  const s = new Set();
  for (const o of objs) if (o.t === "teks" && (o.op ?? 1) > 0 && o.isi) for (const m of o.isi.matchAll(/\d+/g)) s.add(Number(m[0]));
  return s;
};
{
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Place Value|Montessori|Expanded Form/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global Inggris");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Place Value", "Montessori Cards", "Expanded Form"], ["Tempat Angka", "Kartu Angka Montessori", "Bentuk Uraian"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Kartu Harga Bu Wati" && U.judul === M_VIDEO.judul && V.JUDUL_K3B1B === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k3b1B-materi" && U.id === "k3b1B-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,meja-label,tempat-angka,susun-kartu,salah-enam,bentuk-uraian,nol-menjaga,tabel-angka,susun-bilangan,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-tempat,luar-tempat-terapan,luar-kartu,luar-kartu-terapan,luar-uraian,luar-uraian-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan)/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan)
      if (a.id !== "sapaan")
        a.ketukan.forEach((kt, i) => {
          const terlihat = new Set();
          for (let p = -1; p < L.kataDari(kt.suara).length; p += 1) for (const n of angkaTampak(L.keadaanStory(a, i, p))) terlihat.add(n);
          for (const n of bilanganSuara(kt.suara)) cek(terlihat.has(n), `${v.id}/${a.id}#${i + 1}: bilangan ${n} yang diucapkan tampak sebagai angka`);
        });
  const semuaSuara = M_VIDEO.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [1, 5, 6, 10, 50, 60, 100, 200, 251, 300, 345, 408, 602, 804, 987]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [1, 3, 5, 6, 10, 30, 70, 100, 400, 472, 753, 836, 905]) cek(bilanganSuara(semuaLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Raka", "Salsa", "Bima", "Pak Joko", "Bu Wati", "tempat angka", "kartu angka", "bentuk uraian", "ratusan", "puluhan", "satuan", "topi badut", "mewakili", "nol", "tabel", "Pak Dodi"])
    cek(materi.toLowerCase().includes(kata.toLowerCase()) || M_VIDEO.adegan.some((a) => a.ketukan.some((kt) => kt.suara.toLowerCase().includes(kata.toLowerCase()))), `video materi memuat "${kata}"`);
  for (const pola of [/Igil/, /Kaka/, /Abang/, /Mamah/, /Pak Pos/i, /rumah rapi/i, /bibit/i, /kereta/i, /festival/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /pustaka/i, /perpustakaan/i, /kantin/i, /koperasi/i, /seragam/i, /Bu Dewi/, /Pak Rudi/, /Pak Tono/, /ubin/i, /taman bermain/i, /puzzle/i, /pameran/i, /manik/i, /Chacha/, /Dika/, /Nia\b/, /Bu Sari/, /semangka/i, /kebun/i, /Pak Anton/, /Bu Ratna/, /neraca/i, /peluit/i, /lapangan/i, /Pak Ujang/, /Bu Lia/, /bank sampah/i, /Pak Hendra/, /angklung/i, /Bu Maya/, /selendang/i, /Kak Dewi/, /toples/i, /troli/i, /Nenek Ijah/, /Bu Tuti/, /Pak Anto/, /Bu Mirna/, /telur/i])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lain ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/tempat angka/.test(sapa.ketukan[0].suara) && ["Jumlah yang diwakili tiap angka", "Menyusun bilangan dari kartu", "Menguraikan bilangan"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  const naskah = readFileSync(new URL("../naskah/story-naskah-k3b1b.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  let banyakTitik = 0;
  let total = 0;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) { total += 1; if (new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at))).size >= 2) banyakTitik += 1; }
  cek(banyakTitik / total >= 0.9, `visual berubah mengikuti kata pada sedikitnya 90 persen ketukan (${banyakTitik}/${total})`);
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") cek(akhirAdegan(a).some((o) => o.t !== "teks"), `${v.id}/${a.id}: gambar akhir memuat bentuk gambar sendiri, bukan hanya teks`);
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") cek(ada(akhirAdegan(a, 0), "dn-a", "dn-l"), `${v.id}/${a.id}: latar Toko Pak Joko tampil sejak ketukan pertama`);
}
const baca = (objs, ...ids) => ids.map((id) => isiTeks(objs, id)).join();
{
  const ml = adegan(M_VIDEO, "meja-label");
  cek(ada(akhirAdegan(ml, 0), "dn-p", "mj", "bw", "bw-ap", "bw-kl", "et", "et-i2", "pj", "pj-km", "pj-pn", "ks", "ks-l", "kk") && isiTeks(akhirAdegan(ml, 0), "dn-p") === "TOKO PAK JOKO" && tak(akhirAdegan(ml, 0), "c0", "rk"), "meja label: toko, Bu Wati berapron ungu, etalase, Pak Joko berkumis berpensil, kasir, kotak kartu");
  cek(baca(akhirAdegan(ml, 1), "c0-t", "c1-t", "c2-t") === "100,10,1" && ada(akhirAdegan(ml, 1), "c0", "c1", "c2"), "meja label: kartu hijau 100, biru 10, merah 1");
  cek(ada(akhirAdegan(ml, 2), "rk", "rk-kz", "sl", "sl-kp0", "sl-ct", "bm", "bm-kz", "lb", "pn", "gl-k") && isiTeks(akhirAdegan(ml, 2), "lb-t") === "_ _ _", "meja label: tiga anak, label harga kosong, panah susun");
  const ta = adegan(M_VIDEO, "tempat-angka");
  cek(baca(akhirAdegan(ta, 0), "d0", "d1", "d2", "lb-c") === "2,5,1,Label 251" && ada(akhirAdegan(ta, 0), "t0", "t1", "t2", "a0", "a2"), "tempat angka: label 251, angka 2, 5, 1 dan tiga tempat");
  cek(baca(akhirAdegan(ta, 1), "e0", "e1", "e2", "m0", "m1", "m2") === "7,7,7,700,70,7" && ada(akhirAdegan(ta, 1), "tb-k", "tb-h0", "tb-h2"), "tempat angka: angka tujuh sama di tiga tempat, 700, 70, 7");
  cek(baca(akhirAdegan(ta, 2), "d0", "d1", "d2", "m0", "m1", "m2") === "2,5,1,200,50,1", "tempat angka: dua mewakili 200, lima 50, satu 1");
  const sk = adegan(M_VIDEO, "susun-kartu");
  cek(ada(akhirAdegan(sk, 0), "rk", "h0", "h1", "p0", "p4", "s0") && tak(akhirAdegan(sk, 0), "h2", "p5", "s1") && baca(akhirAdegan(sk, 0), "h-t", "p-t", "s-t", "x0", "x1", "x2") === "100,10,1,x2,x5,x1", "susun kartu: dua kartu 100, lima kartu 10, satu kartu 1");
  cek(baca(akhirAdegan(sk, 1), "e0", "e1", "e2", "res") === "200,50,1,251", "susun kartu: 200 + 50 + 1 = 251");
  cek(isiTeks(akhirAdegan(sk, 2), "lb-t") === "251" && isiTeks(akhirAdegan(sk, 2), "sm") === "=" && tak(akhirAdegan(sk, 2), "e0", "res"), "susun kartu: tumpukan sama dengan label 251");
  const se = adegan(M_VIDEO, "salah-enam");
  cek(baca(akhirAdegan(se, 0), "l0-t", "l1-t", "l2-t") === "600,60,6" && ada(akhirAdegan(se, 0), "bm", "q0", "q2", "tp", "tp-p"), "salah enam: label 600, 60, 6, tanda tanya, topi badut, Bima");
  cek(ada(akhirAdegan(se, 1), "sl", "gl", "hd0", "hd2") && isiTeks(akhirAdegan(se, 1), "hd0") === "ratusan", "salah enam: Salsa menggeleng, tempat berbeda");
  cek(ada(akhirAdegan(se, 2), "h5", "p5", "s5", "bm", "pk") && baca(akhirAdegan(se, 2), "v0", "v1", "v2") === "600,60,6" && tak(akhirAdegan(se, 2), "h6", "l0"), "salah enam: tiga tumpukan enam kartu berbeda tinggi, Bima berpikir");
  const bu = adegan(M_VIDEO, "bentuk-uraian");
  cek(isiTeks(akhirAdegan(bu, 0), "lb-t") === "345" && baca(akhirAdegan(bu, 0), "u0-t", "u1-t", "u2-t") === "300,40,5" && ada(akhirAdegan(bu, 0), "bw", "pl1", "pl2"), "bentuk uraian: 345 pecah jadi kartu 300, 40, 5");
  cek(baca(akhirAdegan(bu, 1), "d0", "d1", "d2") === "300,40,5" && ada(akhirAdegan(bu, 1), "tb-k", "bw"), "bentuk uraian: 300 di ratusan, 40 di puluhan, 5 di satuan");
  cek(baca(akhirAdegan(bu, 2), "e0", "e1", "e2", "eq", "lb-t") === "300,40,5,=,345" && ada(akhirAdegan(bu, 2), "pn", "ok"), "bentuk uraian: dijumlahkan kembali 345");
  const nm = adegan(M_VIDEO, "nol-menjaga");
  cek(isiTeks(akhirAdegan(nm, 0), "lg-t") === "602" && isiTeks(akhirAdegan(nm, 0), "lx-t") === "62" && ada(akhirAdegan(nm, 0), "mc", "x1", "db"), "nol menjaga: mesin macet, label 62 keluar miring");
  cek(baca(akhirAdegan(nm, 1), "d0", "d1", "d2") === "6,0,2" && ada(akhirAdegan(nm, 1), "sl", "ks", "tb-k") && ketemu(akhirAdegan(nm, 1), "ks").putus === true, "nol menjaga: Salsa menunjuk puluhan kosong lalu diisi nol");
  cek(baca(akhirAdegan(nm, 2), "e0", "e1", "e2", "res", "n3") === "600,0,2,602,3 tempat", "nol menjaga: 600 + 0 + 2 = 602");
  const tb = adegan(M_VIDEO, "tabel-angka");
  cek(isiTeks(akhirAdegan(tb, 0), "cap") === "Bilangan 987" && baca(akhirAdegan(tb, 0), "d0", "d1", "d2") === "9,8,7" && ada(akhirAdegan(tb, 0), "pk", "tb-k", "bm"), "tabel angka: papan kapur, tabel diisi 9, 8, 7");
  cek(ada(akhirAdegan(tb, 1), "ar", "mu") && ketemu(akhirAdegan(tb, 1), "tb-c0").sorot === true, "tabel angka: dibaca dari ratusan");
  cek(baca(akhirAdegan(tb, 2), "w0", "w1", "w2", "sa") === "900,80,7,1 angka di tiap tempat" && ada(akhirAdegan(tb, 2), "sx", "x1") && tak(akhirAdegan(tb, 2), "ar", "mu"), "tabel angka: contoh salah 900, 80, 7 dicoret");
  const sb = adegan(M_VIDEO, "susun-bilangan");
  cek(baca(akhirAdegan(sb, 0), "a4-t", "a0-t", "a8-t", "tg") === "4,0,8,3 angka" && ada(akhirAdegan(sb, 0), "bw", "qq"), "susun bilangan: tiga kartu angka 4, 0, 8");
  cek(baca(akhirAdegan(sb, 1), "c1", "c2", "ne") === "408,804,≠" && baca(akhirAdegan(sb, 1), "a4", "a0", "a8", "b8", "b0", "b4") === "4,0,8,8,0,4", "susun bilangan: 408 dan 804 berdampingan dengan tanda tidak sama");
  cek(baca(akhirAdegan(sb, 2), "l1-t", "l2-t", "ne") === "408,804,≠", "susun bilangan: label 408 dan 804");
  const pn = adegan(M_VIDEO, "penutup");
  cek(ada(akhirAdegan(pn, 0), "bm", "tp", "tp-p", "pb", "tw", "ks"), "penutup: Bima bertopi badut melayani pembeli, pembeli tertawa");
  cek(ada(akhirAdegan(pn, 1), "tr", "tr-r0", "tr-r1", "pd", "k0", "g0", "g2", "pj", "qq") && isiTeks(akhirAdegan(pn, 1), "pt-t0") === "3 gudang", "penutup: truk Pak Dodi, karung, tiga gudang, Pak Joko");
  cek(baca(akhirAdegan(pn, 2), "la-t", "lb-t") === "408,804" && ada(akhirAdegan(pn, 2), "rk", "sl", "bm", "pj", "bw", "lm", "qq"), "penutup: 408 atau 804, lima tokoh melambai");
  // Metode global.
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "kk", "sl", "ls0", "ls2") && isiTeks(akhirAdegan(op, 0), "n3") === "3 lembar", "global pembuka: Salsa menemukan tiga lembar petunjuk di dasar kotak kartu");
  cek(ada(akhirAdegan(op, 1), "bw", "sy", "lb") && isiTeks(akhirAdegan(op, 1), "n3b") === "3 cara", "global pembuka: Bu Wati tersenyum, tiga cara");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Place Value", "2. Montessori Cards", "3. Expanded Form"], "global pembuka: tiga nama metode");
  sama(["q0", "q1", "q2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Tempat Angka", "Kartu Angka Montessori", "Bentuk Uraian"], "global pembuka: tiga nama bahasa Indonesia");
  const lt = adegan(U, "luar-tempat");
  cek(isiTeks(akhirAdegan(lt, 0), "nm-t0") === "Place Value" && isiTeks(akhirAdegan(lt, 0), "nid") === "Tempat Angka" && ada(akhirAdegan(lt, 0), "ic"), "Tempat Angka konsep: nama");
  cek(ada(akhirAdegan(lt, 1), "tb-k", "d0", "d2", "q0", "q2") && baca(akhirAdegan(lt, 1), "d0", "d1", "d2") === "3,1,6", "Tempat Angka konsep: tiap angka punya tempat");
  cek(baca(akhirAdegan(lt, 2), "kr", "tg", "kn") === "kiri,tengah,kanan" && ketemu(akhirAdegan(lt, 2), "tb-c2").sorot === true, "Tempat Angka konsep: kiri ratusan, tengah puluhan, kanan satuan");
  cek(baca(akhirAdegan(lt, 3), "e0", "e1", "e2", "m0", "m1", "m2") === "9,9,9,900,90,9", "Tempat Angka konsep: angka sama, jumlah berbeda");
  const lp = adegan(U, "luar-tempat-terapan");
  cek(isiTeks(akhirAdegan(lp, 0), "cap") === "Label 472" && baca(akhirAdegan(lp, 0), "d0", "d1", "d2", "m1") === "4,7,2,70" && ada(akhirAdegan(lp, 0), "rk"), "Tempat Angka terapan: tujuh di puluhan mewakili 70");
  cek(baca(akhirAdegan(lp, 1), "m0", "m2") === "400,2", "Tempat Angka terapan: empat 400, dua 2");
  cek(ada(akhirAdegan(lp, 2), "cc-k", "cc-ok") && ada(akhirAdegan(lp, 3), "kc-k", "kc-no", "no"), "Tempat Angka terapan: cocok dan kurang cocok");
  const lk = adegan(U, "luar-kartu");
  cek(isiTeks(akhirAdegan(lk, 0), "nm-t0") === "Montessori Cards" && baca(akhirAdegan(lk, 0), "c0-t", "c1-t", "c2-t") === "100,10,1", "Kartu Montessori konsep: nama, kartu 100, 10, 1");
  cek(baca(akhirAdegan(lk, 1), "t0-t", "t1-t", "t2-t") === "100,10,1" && ada(akhirAdegan(lk, 1), "t0", "t1", "t2", "pa"), "Kartu Montessori konsep: kartu bertumpuk saling menutup");
  cek(baca(akhirAdegan(lk, 2), "a0-t", "a1-t", "a2-t") === "3,4,6" && ada(akhirAdegan(lk, 2), "p0", "p2", "q0", "q2"), "Kartu Montessori konsep: kartu angka menempel pada kartu tempat");
  cek(isiTeks(akhirAdegan(lk, 3), "lb-t") === "346" && isiTeks(akhirAdegan(lk, 3), "n3") === "3 bagian", "Kartu Montessori konsep: tiga bagian");
  const lkt = adegan(U, "luar-kartu-terapan");
  cek(baca(akhirAdegan(lkt, 0), "c0-t", "c1-t", "c2-t", "s1", "lb-t") === "700,50,3,1 kartu,753" && ada(akhirAdegan(lkt, 0), "bm", "pn"), "Kartu Montessori terapan: 700, 50, 3 menjadi satu kartu 753");
  cek(isiTeks(akhirAdegan(lkt, 1), "n3") === "3 kartu" && ada(akhirAdegan(lkt, 1), "tg", "ok") && tak(akhirAdegan(lkt, 1), "lb", "pn"), "Kartu Montessori terapan: tiga kartu muncul kembali");
  cek(ada(akhirAdegan(lkt, 2), "cc-k", "tg", "a0", "a2", "ok2") && ada(akhirAdegan(lkt, 3), "kc-k", "no", "pe", "ct"), "Kartu Montessori terapan: cocok dan kurang cocok");
  const lu = adegan(U, "luar-uraian");
  cek(isiTeks(akhirAdegan(lu, 0), "nm-t0") === "Expanded Form" && isiTeks(akhirAdegan(lu, 0), "nid") === "Bentuk Uraian", "Bentuk Uraian konsep: nama");
  cek(isiTeks(akhirAdegan(lu, 1), "lb-t") === "246" && ada(akhirAdegan(lu, 1), "p0", "p1b", "p2b", "p1", "p2"), "Bentuk Uraian konsep: jumlah ratusan, puluhan, satuan");
  cek(baca(akhirAdegan(lu, 2), "lb-t", "e0", "e1", "e2") === "836,800,30,6", "Bentuk Uraian konsep: 836 = 800 + 30 + 6");
  cek(baca(akhirAdegan(lu, 3), "z", "e0", "e1", "e2") === "0,700,0,5" && ketemu(akhirAdegan(lu, 3), "ks").putus === true, "Bentuk Uraian konsep: nol tetap ditulis");
  const lut = adegan(U, "luar-uraian-terapan");
  cek(baca(akhirAdegan(lut, 0), "lb-t", "e0", "e1", "e2") === "905,900,0,5" && ada(akhirAdegan(lut, 0), "sl"), "Bentuk Uraian terapan: 905 = 900 + 0 + 5");
  cek(baca(akhirAdegan(lut, 1), "e0", "e1", "e2", "lb-t") === "900,0,5,905" && ada(akhirAdegan(lut, 1), "pn", "ok"), "Bentuk Uraian terapan: dijumlahkan kembali 905");
  cek(ada(akhirAdegan(lut, 2), "cc-k", "kc", "ok2") && ada(akhirAdegan(lut, 3), "kc-k", "cp", "pj"), "Bentuk Uraian terapan: cocok dan kurang cocok");
  const rk = adegan(U, "luar-ringkas");
  cek(isiTeks(akhirAdegan(rk, 0), "n3") === "3 cara" && baca(akhirAdegan(rk, 0), "r0", "r1", "r2") === "1. Tempat Angka,2. Kartu Angka Montessori,3. Bentuk Uraian", "ringkasan: tiga metode");
  cek(ada(akhirAdegan(rk, 2), "a0-k", "b0-k", "a1-k", "b1-k", "a2-k", "b2-k", "sm-k"), "ringkasan: tiga pasang kebutuhan dan cara");
  cek(ada(akhirAdegan(rk, 3), "lb", "n3", "o0", "o1", "o2", "qq") && isiTeks(akhirAdegan(rk, 3), "n3") === "3 angka", "ringkasan: label tiga angka dan tiga cara untuk dipilih");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k3b1B-.*\.ts$/.test(f));
  cek(berkas.length >= 8, `berkas story k3b1B (${berkas.length})`);
  cek(!berkas.includes("k3b1B-materi-4.ts") && !berkas.includes("k3b1B-materi-5.ts"), "k3b1B-materi-4.ts dan materi-5.ts sudah dihapus");
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku|nilai|kelompok/i.test(s), `${f}: tanpa kata buku, nilai, kelompok`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k3b1B-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k3b1B (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k3b1b.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K3B1B/.test(pb) && /VIDEO_LUAR_K3B1B/.test(pb) && /export function VideoK3B1B/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿"), "video-k3b1b.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
