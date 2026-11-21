// Uji Story Kelas 4 Bab 2 Sub-Bab A "Kain Lipat Bu Wulan" (pecahan dengan pembilang satu), awal cerita Sanggar Batik Kampung Mekar: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k4b2a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k4b2a-video.ts");

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
const VIDEO = [V.VIDEO_MATERI_K4B2A, V.VIDEO_LUAR_K4B2A];
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

/* ------------------------------ Khusus Sub-Bab A Kelas 4 Bab 2 ------------------------------ */
{
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k4b2a-luar-1.ts");
  const M_VIDEO = V.VIDEO_MATERI_K4B2A;
  const U = V.VIDEO_LUAR_K4B2A;
  const adegan = (v, id) => v.adegan.find((a) => a.id === id);
  const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  const ketemu = (objs, id) => objs.find((o) => o.id === id);
  const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
  const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
  const tidakAda = (objs, ...ids) => ids.every((id) => !ketemu(objs, id));
  const hampir = (a, b) => Math.abs(a - b) < 0.11;
  const ARSIR = "#C4B5FD";

  /** Bagian kain `${id}-c{i}` pada keadaan gambar: banyak, lebar, arsir, dan sambungannya diperiksa dari benda sungguhan. */
  const bagian = (objs, id) => objs.filter((o) => new RegExp(`^${id}-c\\d+$`).test(o.id)).sort((p, q) => Number(p.id.split("-c")[1]) - Number(q.id.split("-c")[1]));
  const kainBenar = (objs, id, n, arsir, lebarTotal, pesan) => {
    const b = bagian(objs, id);
    cek(b.length === n, `${pesan}: ${id} terbagi ${n} bagian (ada ${b.length})`);
    if (b.length !== n) return;
    cek(b.every((o) => hampir(o.w, lebarTotal / n)), `${pesan}: ${id} bagian sama besar (${b.map((o) => o.w).join(",")})`);
    cek(b.every((o, i) => i === 0 || hampir(o.x, b[i - 1].x + b[i - 1].w)), `${pesan}: ${id} bagian bersambung`);
    cek(hampir(b[0].x + lebarTotal, b[n - 1].x + b[n - 1].w), `${pesan}: ${id} bagian menutup seluruh kain`);
    sama(b.map((o, i) => (o.warna === ARSIR ? i : -1)).filter((i) => i >= 0), arsir, `${pesan}: ${id} bagian berarsir`);
  };

  // Pembaca bilangan yang diucapkan dengan kata sampai sembilan: satuan dan nol.
  const SATUAN = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
  const bilanganSuara = (s0) => {
    const t = s0.toLowerCase().split(/[^a-z]+/).filter(Boolean);
    const out = [];
    for (let q = 0; q < t.length; q += 1) {
      const w = t[q];
      if (w === "nol") out.push(0);
      else if (w === "sepuluh") out.push(10);
      else if (w === "sebelas") out.push(11);
      else if (SATUAN[w] && t[q + 1] === "belas") {
        out.push(SATUAN[w] + 10);
        q += 1;
      } else if (SATUAN[w]) out.push(SATUAN[w]);
    }
    return out;
  };
  sama(bilanganSuara("Satu bagian dari dua bagian sama besar kita tulis satu per dua."), [1, 2, 1, 2], "pembaca bilangan suara (pecahan)");
  sama(bilanganSuara("Kedua satuan dan pertama."), [], "pembaca bilangan suara (bukan bilangan)");
  sama(bilanganSuara("satu per tiga belas kurang dari satu per sebelas dan satu per sepuluh"), [1, 13, 1, 11, 1, 10], "pembaca bilangan suara (belas, sebelas, sepuluh)");

  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Unit Fraction Strip|Fold the Paper|Fraction Number Line|Pita Pecahan|Lipat Kertas|Garis Pecahan/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Unit Fraction Strip", "Fold the Paper", "Fraction Number Line"], ["Pita Pecahan", "Lipat Kertas", "Garis Pecahan"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Kain Lipat Bu Wulan" && U.judul === M_VIDEO.judul && V.JUDUL_K4B2A === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k4b2a-materi" && U.id === "k4b2a-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,sanggar,lipat-dua,lipat-empat,salah-delapan,bandingkan,mengaduk,garis,urut,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-pita,luar-pita-terapan,luar-lipat,luar-lipat-terapan,luar-garis,luar-garis-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan)/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)) && !TERLARANG.test(a.id), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda (di|dari) rumah|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
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
  for (const n of [1, 2, 4, 8]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [0, 1, 2, 3, 4, 8]) cek(bilanganSuara(semuaLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Pak Hendro", "Satria", "Laras", "Genta", "Bu Wulan", "Pak Joyo", "Sanggar Batik Kampung Mekar", "kain", "canting", "pembilang", "penyebut", "satu per dua", "satu per empat", "satu per delapan", "garis", "tali"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  cek(/Kalau aku salah, aku mengaduk malam sendirian sampai sore/.test(materi), "video materi: salah langkah dengan taruhan mengaduk malam");
  for (const pola of [/Helen/, /Azizah/, /Pak Toni/, /Pak Wicak/, /minimarket/i, /Raka/, /Salsa/, /Bima/, /Pak Joko/, /Pak Hasan/, /Bu Ratih/, /Kak Anton/, /Pak Samsul/, /layang/i, /bengkel/i, /sepeda/i, /Chacha/, /Dika/, /\bNia\b/, /Bu Sari/, /pentas/i, /angklung/i, /bank sampah/i, /toko/i, /kebun binatang/i, /perkemahan/i, /tenda/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /perpustakaan/i, /kantin/i, /koperasi/i, /Meutia/, /Alfa/, /Galih/, /Tiara/, /Slamet/, /pizza/i, /Bu Maya/, /Pak Laode/, /penginapan/i, /perahu/i, /pantai/i, /tiket/i, /kelapa/i])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/pecahan dengan pembilang satu/.test(sapa.ketukan[0].suara) && ["Satu bagian dari beberapa bagian sama besar", "Membandingkan pecahan", "Garis pecahan"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k4b2a.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  // Visual berubah mengikuti kata pada hampir semua ketukan.
  let banyakTitik = 0;
  let total = 0;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) { total += 1; if (new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at))).size >= 2) banyakTitik += 1; }
  cek(banyakTitik / total >= 0.9, `visual berubah mengikuti kata pada sedikitnya 90 persen ketukan (${banyakTitik}/${total})`);
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") cek(akhirAdegan(a).some((o) => o.t !== "teks"), `${v.id}/${a.id}: gambar akhir memuat bentuk gambar sendiri, bukan hanya teks`);
  // Tidak ada gambar tokoh yang menutup angka atau nama; label nama tokoh diturunkan (tidak menempel dagu).
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan)
      a.ketukan.forEach((_, i) => {
        const objs = L.keadaanStory(a, i, 9999);
        for (const w of objs.filter((o) => o.t === "teks" && /^[\u{1F466}\u{1F467}\u{1F9D2}\u{1F468}\u{1F469}]$/u.test(o.isi ?? "") && (o.u ?? 10) >= 28)) {
          const kiri = (w.x ?? 0) - 15;
          const kanan = (w.x ?? 0) + 15;
          const atas = (w.y ?? 0) - 24;
          const bawah = (w.y ?? 0) + 4;
          const label = ketemu(objs, `${w.id}-n`);
          if (label) cek((label.y ?? 0) >= (w.y ?? 0) + 4 + 14, `${v.id}/${a.id}#${i + 1}: label ${label.isi} diturunkan dari wajah ${w.id}`);
          for (const o of objs.filter((q) => q.t === "teks" && !/^[\u{1F000}-\u{1FFFF}]|^[✂✅❌]$/u.test(q.isi ?? "") && !/-n$/.test(q.id) && q.id !== w.id)) {
            const u = o.u ?? 10;
            const lebar = (o.isi ?? "").length * u * 0.56;
            const x1 = (o.x ?? 0) - lebar / 2;
            const x2 = (o.x ?? 0) + lebar / 2;
            const y1 = (o.y ?? 0) - u * 0.75;
            const y2 = (o.y ?? 0) + u * 0.2;
            cek(!(Math.min(x2, kanan) - Math.max(x1, kiri) > 1 && Math.min(y2, bawah) - Math.max(y1, atas) > 1), `${v.id}/${a.id}#${i + 1}: teks "${o.isi}" (${o.id}) tertutup gambar tokoh ${w.id}`);
          }
        }
      });
  // Pecahan di gambar selalu bersusun (pembilang, garis, penyebut) dan tidak ada pecahan lain selain pembilang satu.
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan)
      for (let i = 0; i < a.ketukan.length; i += 1) {
        const objs = L.keadaanStory(a, i, 9999);
        for (const o of objs.filter((q) => /-a$/.test(q.id) && /^f|^pc$|^p[a-z]$|^u\d|^l\d/.test(q.id.replace(/-a$/, "")) && q.t === "teks" && q.isi === "1")) {
          const dasar = o.id.replace(/-a$/, "");
          cek(ada(objs, `${dasar}-g`, `${dasar}-b`) && /^\d{1,2}$/.test(isiTeks(objs, `${dasar}-b`)) && ketemu(objs, `${dasar}-b`).x === o.x && ketemu(objs, `${dasar}-b`).y > o.y, `${v.id}/${a.id}#${i + 1}: pecahan ${dasar} bersusun: garis dan penyebut di bawah pembilang`);
        }
        for (const o of objs.filter((q) => q.t === "teks" && /^\d[\d.]*$/.test(q.isi ?? "") && (q.isi ?? "").length >= 4)) cek(false, `${v.id}/${a.id}#${i + 1}: bilangan ${o.isi} terlalu panjang`);
      }

  /* Adegan yang diubah untuk selaras buku (mengaduk, urut, lipat-empat): teks isi paling kecil 11 di viewBox 300 (efektif >= 10 px pada skala render 0,93),
     tanpa tumpang tindih antar teks, emoji, wajah tokoh, label nama, dan keterangan sumber. */
  for (const id of ["mengaduk", "urut", "lipat-empat"]) {
    const a = adegan(M_VIDEO, id);
    a.ketukan.forEach((_, i) => {
      const objs = L.keadaanStory(a, i, 9999);
      const adaEmoji = (o) => /^[\u{1F000}-\u{1FFFF}]|^[✂✅❌]$/u.test(o.isi ?? "");
      const teksObj = objs.filter((o) => o.t === "teks" && (o.op ?? 1) > 0 && o.isi);
      for (const o of teksObj.filter((q) => !adaEmoji(q) && !/-n$/.test(q.id))) cek((o.u ?? 10) >= 11, `${id}#${i + 1}: teks "${o.isi}" (${o.id}) ukuran ${o.u ?? 10} paling kecil 11`);
      const kotakDari = (o) => {
        if (adaEmoji(o)) {
          const u = o.u ?? 10;
          return [(o.x ?? 0) - u * 0.55, (o.y ?? 0) - u * 0.85, (o.x ?? 0) + u * 0.55, (o.y ?? 0) + u * 0.15];
        }
        return kotakTeks(o);
      };
      const sumber = [282 - a.sumber.length * 3.6, 198, 282, 204];
      const semua = [...teksObj.map((o) => ({ id: o.id, k: kotakDari(o) })), { id: "sumber", k: sumber }];
      const milikSama = (p, q) => { const d = (x) => x.replace(/-n$/, ""); return d(p) === d(q); };
      for (let p = 0; p < semua.length; p += 1) for (let q = p + 1; q < semua.length; q += 1) {
        if (milikSama(semua[p].id, semua[q].id)) continue;
        const lx = Math.min(semua[p].k[2], semua[q].k[2]) - Math.max(semua[p].k[0], semua[q].k[0]);
        const ly = Math.min(semua[p].k[3], semua[q].k[3]) - Math.max(semua[p].k[1], semua[q].k[1]);
        cek(!(lx > 0.5 && ly > 0.5), `${id}#${i + 1}: ${semua[p].id} dan ${semua[q].id} bertumpuk (${lx.toFixed(0)}x${ly.toFixed(0)})`);
      }
    });
  }

  /* Isi tiap adegan materi. */
  const sg = adegan(M_VIDEO, "sanggar");
  cek(ada(akhirAdegan(sg, 0), "tn", "jud", "ph", "ph-bj", "ph-tp", "ph-pl", "ph-ts", "sa", "sa-bj", "lr", "lr-ka", "lr-k1", "lr-kc", "ge", "ge-pc", "pn"), "sanggar: Pak Hendro bertopi pantai, Satria, Laras, Genta, dan papan nama");
  cek(isiTeks(akhirAdegan(sg, 0), "pn-s1") === "SANGGAR BATIK" && isiTeks(akhirAdegan(sg, 0), "pn-s2") === "KAMPUNG MEKAR", "sanggar: papan nama SANGGAR BATIK KAMPUNG MEKAR");
  cek(ada(akhirAdegan(sg, 1), "tj-p1", "tj-p2", "tj-tl", "kg1", "kg2", "kg3") && isiTeks(akhirAdegan(sg, 1), "sb") === "siap dibatik", "sanggar: tali jemuran dengan kain putih siap dibatik");
  cek(ada(akhirAdegan(sg), "bw", "bw-kr", "bw-ct", "ct", "ct-m", "kn") && isiTeks(akhirAdegan(sg), "sm") === "sama besar", "sanggar: Bu Wulan berkerudung ungu memegang canting dan kain harus dilipat sama besar");
  const ld = adegan(M_VIDEO, "lipat-dua");
  kainBenar(akhirAdegan(ld, 0), "kn", 2, [], 240, "lipat dua");
  cek(isiTeks(akhirAdegan(ld, 0), "n2") === "2 bagian" && ada(akhirAdegan(ld, 0), "bw"), "lipat dua: Bu Wulan melipat kain menjadi 2 bagian");
  kainBenar(akhirAdegan(ld, 1), "kn", 2, [0], 240, "lipat dua satu bagian berarsir");
  sama([isiTeks(akhirAdegan(ld, 1), "pc-a"), isiTeks(akhirAdegan(ld, 1), "pc-b")], ["1", "2"], "lipat dua: pecahan satu per dua bersusun");
  kainBenar(akhirAdegan(ld), "kn", 2, [0], 240, "lipat dua akhir");
  cek(isiTeks(akhirAdegan(ld), "lb1") === "pembilang" && isiTeks(akhirAdegan(ld), "lb2") === "penyebut" && ada(akhirAdegan(ld), "p1", "p2") && ketemu(akhirAdegan(ld), "pc-b").sorot === true && !ketemu(akhirAdegan(ld), "pc-a").sorot, "lipat dua: pembilang di atas dan penyebut di bawah diberi nama");
  const le = adegan(M_VIDEO, "lipat-empat");
  kainBenar(akhirAdegan(le, 0), "kn", 4, [], 240, "lipat empat");
  cek(isiTeks(akhirAdegan(le, 0), "n4") === "4 bagian" && ada(akhirAdegan(le, 0), "lr"), "lipat empat: Laras melipat lagi menjadi 4 bagian");
  kainBenar(akhirAdegan(le, 1), "kn", 4, [0], 240, "lipat empat satu bagian berarsir");
  sama([isiTeks(akhirAdegan(le, 1), "pc-a"), isiTeks(akhirAdegan(le, 1), "pc-b")], ["1", "4"], "lipat empat: pecahan satu per empat bersusun");
  cek(isiTeks(akhirAdegan(le), "sl") === "seluruh kain" && ketemu(akhirAdegan(le), "pc-b").sorot === true && [0, 1, 2, 3].every((q) => ketemu(akhirAdegan(le), `kn-c${q}`).sorot === true), "lipat empat: penyebut empat karena seluruh kain empat bagian");
  {
    // Buku (pizza dibagi empat bagian sama): taplak bundar empat sektor sama besar, satu berarsir.
    const o = akhirAdegan(le);
    const sektor = [0, 1, 2, 3].map((q) => ketemu(o, `tb-c${q}`));
    cek(sektor.every((q) => q && q.t === "jalur") && sektor.filter((q) => q.warna === ARSIR).length === 1 && sektor[0].warna === ARSIR, "lipat empat: taplak bundar empat sektor, satu berarsir");
    const luas = sektor.map((q) => { const t = titikJalur(q); let a = 0; for (let i = 0; i < t.length; i += 1) { const [x1, y1] = t[i]; const [x2, y2] = t[(i + 1) % t.length]; a += x1 * y2 - x2 * y1; } return Math.abs(a / 2); });
    cek(luas.every((v) => Math.abs(v - luas[0]) < luas[0] * 0.01), `lipat empat: keempat sektor taplak sama luas (${luas.map((v) => v.toFixed(1)).join(", ")})`);
  }
  const sd = adegan(M_VIDEO, "salah-delapan");
  kainBenar(akhirAdegan(sd, 0), "kn", 8, [0], 240, "salah delapan");
  sama([isiTeks(akhirAdegan(sd, 0), "pc-a"), isiTeks(akhirAdegan(sd, 0), "pc-b"), isiTeks(akhirAdegan(sd, 0), "n8")], ["1", "8", "8 bagian"], "salah delapan: Genta menulis satu per delapan");
  cek(isiTeks(akhirAdegan(sd, 1), "bn") === "8 > 4!" && ada(akhirAdegan(sd, 1), "sa", "sa-bj", "pk"), "salah delapan: Satria berseru delapan lebih besar dari empat");
  cek(ada(akhirAdegan(sd), "pm", "pm-m", "pm-t", "ap", "sa", "sr", "tp") && isiTeks(akhirAdegan(sd), "ss") === "sampai sore" && tidakAda(akhirAdegan(sd), "kn-c0"), "salah delapan: taruhan mengaduk malam sampai sore");
  const bd = adegan(M_VIDEO, "bandingkan");
  kainBenar(akhirAdegan(bd, 0), "k4", 4, [0], 240, "bandingkan satu per empat");
  kainBenar(akhirAdegan(bd, 0), "k8", 8, [0], 240, "bandingkan satu per delapan");
  cek(isiTeks(akhirAdegan(bd, 0), "n2") === "2 potongan" && isiTeks(akhirAdegan(bd, 0), "pa-b") === "4" && isiTeks(akhirAdegan(bd, 0), "pb-b") === "8", "bandingkan: dua potongan satu per empat dan satu per delapan");
  const k4 = bagian(akhirAdegan(bd, 1), "k4")[0];
  const k8 = bagian(akhirAdegan(bd, 1), "k8")[0];
  cek(ketemu(akhirAdegan(bd, 1), "g4").x === k4.x + k4.w && ketemu(akhirAdegan(bd, 1), "g8").x === k8.x + k8.w && k8.w < k4.w && k4.w === 2 * k8.w, "bandingkan: ujung potongan satu per delapan lebih pendek, tepat setengah dari satu per empat");
  cek(isiTeks(akhirAdegan(bd, 1), "lp") === "lebih pendek" && [1, 2, 3, 4, 5, 6, 7].every((q) => ketemu(akhirAdegan(bd, 1), `k8-c${q}`).sorot === true), "bandingkan: lebih pendek karena bagian lebih banyak");
  cek(isiTeks(akhirAdegan(bd), "bs") === "1/4 > 1/8" && isiTeks(akhirAdegan(bd), "tk") === "makin banyak, makin kecil" && ada(akhirAdegan(bd), "sa", "pk") && tidakAda(akhirAdegan(bd), "lp", "n2"), "bandingkan: makin banyak bagian makin kecil, satu per empat lebih besar");
  const mg = adegan(M_VIDEO, "mengaduk");
  cek(ada(akhirAdegan(mg, 0), "sa", "pm", "pm-m", "pm-t", "ad", "ap", "up", "ke") && isiTeks(akhirAdegan(mg, 0), "tm") === "malam", "mengaduk: Satria mengaduk malam di dekat tungku sampai wajahnya memerah");
  {
    // Buku: pecahan berpembilang satu dalam konteks berat (satu per dua kilogram dengan satu per empat kilogram).
    const o = akhirAdegan(mg, 1);
    kainBenar(o, "bm", 2, [0], 200, "batang malam satu kilogram dibagi dua");
    kainBenar(o, "bp", 4, [0], 200, "batang pewarna satu kilogram dibagi empat");
    cek(ketemu(o, "bm").w === ketemu(o, "bp").w && ketemu(o, "bm").x === ketemu(o, "bp").x, "mengaduk: dua batang satu kilogram sama panjang");
    sama([isiTeks(o, "bm-f-a"), isiTeks(o, "bm-f-b"), isiTeks(o, "bp-f-a"), isiTeks(o, "bp-f-b"), isiTeks(o, "bm-kg"), isiTeks(o, "bp-kg")], ["1", "2", "1", "4", "kg", "kg"], "mengaduk: malam satu per dua kg dan pewarna satu per empat kg");
    cek(isiTeks(o, "bt") === "malam lebih berat" && ada(o, "bw") && tidakAda(o, "pm", "sa"), "mengaduk: Bu Wulan menimbang, malam lebih berat");
  }
  cek(ada(akhirAdegan(mg), "cat-k", "cc", "lr") && ["c0", "c1", "c2", "c3"].map((id) => isiTeks(akhirAdegan(mg), id)).join("|") === "pembilang: 1|penyebut makin besar|bagian makin kecil|berat makin ringan", "mengaduk: Laras mencatat pembilang satu, penyebut makin besar, bagian makin kecil, berat makin ringan");
  const gr = adegan(M_VIDEO, "garis");
  cek(ada(akhirAdegan(gr, 0), "gb-l", "gb-t0", "gb-t1", "bw") && isiTeks(akhirAdegan(gr, 0), "gb-n0") === "0" && isiTeks(akhirAdegan(gr, 0), "gb-n1") === "1" && tidakAda(akhirAdegan(gr, 0), "gb-t2"), "garis: tali dari nol sampai satu");
  {
    const o = akhirAdegan(gr, 1);
    const x0 = ketemu(o, "gb-t0").x;
    const lebar = ketemu(o, "gb-t1").x - x0;
    sama([ketemu(o, "j2").x + 3, ketemu(o, "j4").x + 3, ketemu(o, "j8").x + 3], [x0 + lebar / 2, x0 + lebar / 4, x0 + lebar / 8], "garis: jepitan satu per dua, satu per empat, satu per delapan di tempat yang tepat");
    sama([ketemu(o, "f2-a").x, ketemu(o, "f4-a").x, ketemu(o, "f8-a").x], [x0 + lebar / 2, x0 + lebar / 4, x0 + lebar / 8], "garis: pecahan bersusun tepat di atas jepitannya");
    sama(["f2-b", "f4-b", "f8-b"].map((id) => isiTeks(o, id)), ["2", "4", "8"], "garis: penyebut dua, empat, delapan");
    cek(ada(o, "ge", "ar") && isiTeks(o, "mk") === "makin kecil", "garis: makin dekat ke nol makin kecil");
  }
  cek(isiTeks(akhirAdegan(gr), "tk") === "makin ke kiri, makin kecil" && isiTeks(akhirAdegan(gr), "lk") === "kecil" && isiTeks(akhirAdegan(gr), "lb") === "besar" && ketemu(akhirAdegan(gr), "j8").sorot === true, "garis: semakin ke kiri semakin kecil");
  const ur = adegan(M_VIDEO, "urut");
  cek(ada(akhirAdegan(ur, 0), "pA", "pB", "pC", "bw") && isiTeks(akhirAdegan(ur, 0), "tl2") === "yang terkecil", "urut: tiga potongan acak dan permintaan dari yang terkecil");
  {
    const o = akhirAdegan(ur, 1);
    const w = (id) => ketemu(o, id).w;
    cek(w("s10") * 5 === w("s2") * 1 + 0 && w("s5") * 5 === w("s2") * 2 && w("s5") === 2 * w("s10") && ketemu(o, "s10").y < ketemu(o, "s5").y && ketemu(o, "s5").y < ketemu(o, "s2").y, "urut: potongan 1/10, 1/5, 1/2 berurutan dari pendek ke panjang dengan lebar 1 : 2 : 5");
    sama(["u10-b", "u5-b", "u2-b"].map((id) => isiTeks(o, id)), ["10", "5", "2"], "urut: pecahan satu per sepuluh, satu per lima, satu per dua (penyebut dari buku)");
    cek(ada(o, "sa") && tidakAda(o, "pA", "pB", "pC"), "urut: Satria menyusun");
  }
  {
    // Buku: perbandingan 1/11 dan 1/13; kedua batang digambar sungguh dengan 11 dan 13 bagian sama besar.
    const o = akhirAdegan(ur);
    cek(ada(o, "tp", "bw", "lr", "b13", "b11") && isiTeks(o, "bn") === "13 bagian lebih sempit", "urut: Bu Wulan bertepuk tangan, Laras membandingkan sebelas dan tiga belas bagian");
    kainBenar(o, "b13", 13, [0], 156, "batang tiga belas bagian");
    kainBenar(o, "b11", 11, [0], 154, "batang sebelas bagian");
    sama(["p13-b", "p11-b"].map((id) => isiTeks(o, id)), ["13", "11"], "urut: pecahan satu per tiga belas dan satu per sebelas");
    cek(bagian(o, "b13")[0].w < bagian(o, "b11")[0].w, "urut: bagian batang tiga belas lebih sempit daripada batang sebelas");
  }
  const pt = adegan(M_VIDEO, "penutup");
  cek(ada(akhirAdegan(pt, 0), "pj", "pj-ap" === "x" ? "" : "pj-bj", "pj-pc", "b1", "b1-w", "b2", "b2-w", "b3", "b3-w"), "penutup: Pak Joyo berapron cokelat dengan tiga bak warna");
  {
    const o = akhirAdegan(pt, 0);
    cek(ketemu(o, "b1-w").h < ketemu(o, "b3-w").h && ketemu(o, "b3-w").h < ketemu(o, "b2-w").h, "penutup: isi tiga bak berbeda tinggi");
  }
  sama([isiTeks(akhirAdegan(pt, 1), "pc-a"), isiTeks(akhirAdegan(pt, 1), "pc-b")], ["1", "4"], "penutup: pecahan satu bagian hanya awal cerita");
  cek(ada(akhirAdegan(pt), "sa", "lr", "ge", "ph", "bw", "pj", "tq", "lb") && isiTeks(akhirAdegan(pt), "tq") === "?" && tidakAda(akhirAdegan(pt), "pc-a", "aw"), "penutup: lima tokoh melambai dan pertanyaan bak yang paling banyak isinya");

  /* Isi tiap adegan metode global. */
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "tr", "bw", "kb", "kt", "ks0", "ks2", "bl") && isiTeks(akhirAdegan(op, 0), "nt") === "potongan kain", "global pembuka: Bu Wulan membuka keranjang kain di serambi malam");
  cek(isiTeks(akhirAdegan(op, 1), "n3") === "3 cara" && ada(akhirAdegan(op, 1), "c0-k", "c2-k", "xs"), "global pembuka: tiga cara supaya pecahan mudah dibandingkan");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Unit Fraction Strip", "2. Fold the Paper", "3. Fraction Number Line"], "global pembuka: tiga nama metode");
  sama(["g0", "g1", "g2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Pita Pecahan", "Lipat Kertas", "Garis Pecahan"], "global pembuka: tiga nama bahasa Indonesia");
  const pk = adegan(U, "luar-pita");
  cek(isiTeks(akhirAdegan(pk, 0), "nm") === "Unit Fraction Strip" && isiTeks(akhirAdegan(pk, 0), "ni") === "Pita Pecahan" && ada(akhirAdegan(pk, 0), "pt", "q1-c0"), "pita konsep: judul dan pita utuh");
  cek(["q1", "q2", "q3"].every((id) => ada(akhirAdegan(pk, 1), id) && ketemu(akhirAdegan(pk, 1), id).w === 220), "pita konsep: tiga pita sama panjang");
  kainBenar(akhirAdegan(pk, 2), "q1", 1, [], 220, "pita utuh");
  kainBenar(akhirAdegan(pk, 2), "q2", 2, [0], 220, "pita dibagi dua");
  kainBenar(akhirAdegan(pk, 2), "q3", 4, [0], 220, "pita dibagi empat");
  sama(["w1", "w2", "w4"].map((id) => isiTeks(akhirAdegan(pk, 2), id)), ["1", "1/2", "1/4"], "pita konsep: satu, satu per dua, satu per empat");
  cek(ada(akhirAdegan(pk), "my", "g4", "g2") && isiTeks(akhirAdegan(pk), "lp") === "yang lebih panjang", "pita konsep: melihat langsung bagian yang lebih panjang");
  const pt2 = adegan(U, "luar-pita-terapan");
  kainBenar(akhirAdegan(pt2, 0), "a4", 4, [0], 220, "pita terapan 1/4");
  kainBenar(akhirAdegan(pt2, 0), "a8", 8, [0], 220, "pita terapan 1/8");
  kainBenar(akhirAdegan(pt2, 1), "a8", 8, [0, 1], 220, "pita terapan dua satu per delapan");
  cek(bagian(akhirAdegan(pt2, 1), "a8").filter((o) => o.warna === ARSIR).reduce((t, o) => t + o.w, 0) === bagian(akhirAdegan(pt2, 1), "a4")[0].w && isiTeks(akhirAdegan(pt2, 1), "kl") === "2 kali lebih panjang", "pita terapan: dua pita satu per delapan sama dengan satu pita satu per empat");
  cek(ada(akhirAdegan(pt2, 2), "ok", "cp") && isiTeks(akhirAdegan(pt2, 2), "bd") === "bandingkan 2 pecahan", "pita terapan: cocok untuk membandingkan dua pecahan");
  cek(ada(akhirAdegan(pt2), "xs", "pk") && isiTeks(akhirAdegan(pt2), "sg") === "1/50" && tidakAda(akhirAdegan(pt2), "ok"), "pita terapan: kurang cocok bila penyebut sangat besar");
  const lp = adegan(U, "luar-lipat");
  cek(isiTeks(akhirAdegan(lp, 0), "nm") === "Fold the Paper" && isiTeks(akhirAdegan(lp, 0), "ni") === "Lipat Kertas" && ada(akhirAdegan(lp, 0), "ky-c0"), "lipat konsep: judul dan selembar kertas");
  kainBenar(akhirAdegan(lp, 1), "ky", 3, [], 80, "lipat konsep");
  kainBenar(akhirAdegan(lp, 2), "ky", 3, [0], 80, "lipat konsep satu bagian berarsir");
  cek(isiTeks(akhirAdegan(lp, 2), "pl") === "pembilang" && isiTeks(akhirAdegan(lp, 2), "s1") === "1 bagian", "lipat konsep: bagian berarsir adalah pembilang");
  cek(ada(akhirAdegan(lp), "ok") && isiTeks(akhirAdegan(lp), "sm") === "sama besar", "lipat konsep: lipatan memastikan bagian sama besar");
  const lt = adegan(U, "luar-lipat-terapan");
  kainBenar(akhirAdegan(lt, 0), "r2", 2, [0], 200, "lipat terapan dua");
  kainBenar(akhirAdegan(lt, 0), "r4", 4, [0], 200, "lipat terapan empat");
  kainBenar(akhirAdegan(lt, 0), "r8", 8, [0], 200, "lipat terapan delapan");
  sama(["m2", "m4", "m8"].map((id) => isiTeks(akhirAdegan(lt, 0), id)), ["2", "4", "8"], "lipat terapan: dua, empat, delapan");
  cek(bagian(akhirAdegan(lt, 0), "r4")[0].w * 2 === bagian(akhirAdegan(lt, 0), "r2")[0].w && bagian(akhirAdegan(lt, 0), "r8")[0].w * 2 === bagian(akhirAdegan(lt, 0), "r4")[0].w, "lipat terapan: tiap lipatan membuat bagian tepat setengah");
  cek(isiTeks(akhirAdegan(lt, 1), "sg") === "tiap bagian jadi 1/2 dari sebelumnya" && ada(akhirAdegan(lt, 1), "a1", "a2"), "lipat terapan: tiap lipatan setengah dari sebelumnya");
  cek(ada(akhirAdegan(lt, 2), "ok") && isiTeks(akhirAdegan(lt, 2), "pk") === "penyebut besar, bagian kecil", "lipat terapan: cocok untuk memahami penyebut besar bagian kecil");
  cek(ada(akhirAdegan(lt), "xs", "kr") && isiTeks(akhirAdegan(lt), "t7") === "penyebut 7?" && isiTeks(akhirAdegan(lt), "sl") === "sulit sama besar", "lipat terapan: kurang cocok untuk penyebut tujuh");
  const gk = adegan(U, "luar-garis");
  cek(isiTeks(akhirAdegan(gk, 0), "nm") === "Fraction Number Line" && isiTeks(akhirAdegan(gk, 0), "ni") === "Garis Pecahan", "garis konsep: judul");
  {
    const o = akhirAdegan(gk, 1);
    const xs = [0, 1, 2, 3, 4].map((q) => ketemu(o, `gb-t${q}`)?.x);
    cek(xs.every((x) => x !== undefined) && xs.every((x, i) => i === 0 || hampir(x - xs[i - 1], 55)) && hampir(xs[4] - xs[0], 220) && isiTeks(o, "gb-n0") === "0" && isiTeks(o, "gb-n1") === "1", "garis konsep: garis dari nol sampai satu dibagi empat bagian sama panjang");
  }
  cek(isiTeks(akhirAdegan(gk, 2), "e4") === "1/4" && isiTeks(akhirAdegan(gk, 2), "e2") === "1/2" && ada(akhirAdegan(gk, 2), "ar") && isiTeks(akhirAdegan(gk, 2), "mb") === "makin besar", "garis konsep: tiap tanda sebuah pecahan dan makin ke kanan makin besar");
  cek(ada(akhirAdegan(gk), "jx", "jy", "jz", "mt") && isiTeks(akhirAdegan(gk), "bk") === "banyak pecahan sekaligus", "garis konsep: mengurutkan banyak pecahan sekaligus");
  const gt = adegan(U, "luar-garis-terapan");
  {
    const o = akhirAdegan(gt, 0);
    const x0 = ketemu(o, "gt-t0").x;
    const lebar = ketemu(o, "gt-t1").x - x0;
    sama([ketemu(o, "j8").x + 3, ketemu(o, "j4").x + 3, ketemu(o, "j2").x + 3], [x0 + lebar / 8, x0 + lebar / 4, x0 + lebar / 2], "garis terapan: jepitan satu per delapan, satu per empat, satu per dua di tempat yang tepat");
    sama(["f8-b", "f4-b", "f2-b"].map((id) => isiTeks(o, id)), ["8", "4", "2"], "garis terapan: penyebut delapan, empat, dua");
    cek(ada(o, "sa"), "garis terapan: Satria menjepit");
  }
  cek(isiTeks(akhirAdegan(gt, 1), "lk") === "kiri" && isiTeks(akhirAdegan(gt, 1), "lr") === "kanan" && isiTeks(akhirAdegan(gt, 1), "tk") === "terkecil ke terbesar" && ada(akhirAdegan(gt, 1), "ar"), "garis terapan: urutan dari kiri ke kanan dari yang terkecil");
  cek(ada(akhirAdegan(gt, 2), "ok") && isiTeks(akhirAdegan(gt, 2), "n3") === "3 pecahan atau lebih" && ketemu(akhirAdegan(gt, 2), "j8").sorot === true, "garis terapan: cocok untuk tiga pecahan atau lebih");
  {
    const o = akhirAdegan(gt);
    const xs = [40, 62, 128, 150, 262];
    cek(ada(o, "xs", "gu-l", ...xs.map((x) => `gu-t${x}`), "sa") && isiTeks(o, "tg") === "bagian tidak sama panjang" && tidakAda(o, "j8", "j4", "j2", "gt-l"), "garis terapan: kurang cocok bila tanda tidak sama jauh");
    const jarak = xs.slice(1).map((x, i) => x - xs[i]);
    cek(new Set(jarak).size > 1, "garis terapan: jarak tanda memang tidak sama");
  }
  const rg = adegan(U, "luar-ringkas");
  cek(["r0-t0", "r1-t0", "r2-t0"].map((id) => isiTeks(akhirAdegan(rg, 0), id)).join("|") === "Pita Pecahan|Lipat Kertas|Garis Pecahan" && isiTeks(akhirAdegan(rg, 0), "n3") === "3 cara" && ada(akhirAdegan(rg, 0), "bw", "tq"), "ringkasan: tiga kartu cara dan Bu Wulan");
  cek(isiTeks(akhirAdegan(rg, 1), "n2") === "2 pecahan" && ketemu(akhirAdegan(rg, 1), "r1-k").sorot === true && !ketemu(akhirAdegan(rg, 1), "r0-k").sorot && ada(akhirAdegan(rg, 1), "ok1", "ok2") && tidakAda(akhirAdegan(rg, 1), "tq"), "ringkasan: Pita Pecahan lalu Lipat Kertas");
  cek(ketemu(akhirAdegan(rg, 2), "r2-k").sorot === true && !ketemu(akhirAdegan(rg, 2), "r1-k").sorot && isiTeks(akhirAdegan(rg, 2), "sb") === "bagian sama besar" && ada(akhirAdegan(rg, 2), "ok3"), "ringkasan: Garis Pecahan dan bagian harus sama besar");
  cek(isiTeks(akhirAdegan(rg), "tq2") === "?" && isiTeks(akhirAdegan(rg), "n4") === "4 potongan" && ada(akhirAdegan(rg), "bw", "kn") && tidakAda(akhirAdegan(rg), "n3", "sb") && !ketemu(akhirAdegan(rg), "r2-k").sorot, "ringkasan: pertanyaan memilih cara untuk mengurutkan empat potongan");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k4b2a-.*\.ts$/.test(f));
  cek(berkas.length === 8, `berkas story k4b2a (${berkas.length})`);
  for (const f of ["bantu", "gambar", "luar-1", "luar-2", "materi-1", "materi-2", "materi-3", "video"]) cek(berkas.includes(`k4b2a-${f}.ts`), `k4b2a-${f}.ts ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!/\\u\{1FA74\}|\\u\{1F39F\}|\\u2602|\\u\{1FA9F\}|\\u\{1FAA3\}|\\u\{1F355\}/i.test(s) && ![...s].some((c) => [0x1fa74, 0x1f39f, 0x2602, 0x1fa9f, 0x1faa3, 0x1f355].includes(c.codePointAt(0))), `${f}: tanpa emoji yang tampil kosong atau hitam`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s) && !/senilai/i.test(s) && !/\\u\{1F41F\}|\\u\{1F420\}|\\u\{1F421\}|\\u\{1F988\}|\\u\{1F42C\}|\\u\{1F38F\}/i.test(s) && ![...s].some((c) => [0x1f41f, 0x1f420, 0x1f421, 0x1f988, 0x1f42c, 0x1f38f].includes(c.codePointAt(0))), `${f}: tanpa kata buku, senilai, dan tanpa emoji ikan`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k4b2a-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k4b2a (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pbc = readFileSync(new URL("../src/components/modul/video-k4b2a.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K4B2A/.test(pbc) && /VIDEO_LUAR_K4B2A/.test(pbc) && /export function VideoK4B2A/.test(pbc) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pbc) && !/\r/.test(pbc) && !pbc.startsWith("﻿") && !/data-k4b2|video-k4b2-umum|naskah-k4b2/.test(pbc), "video-k4b2a.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
