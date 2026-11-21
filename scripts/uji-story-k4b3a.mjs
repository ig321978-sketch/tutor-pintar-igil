// Uji Story Kelas 4 Bab 3 Sub-Bab A "Deret Angklung Bu Ratri" (pola gambar), awal cerita Orkestra Angklung Kampung Senandung: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k4b3a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k4b3a-video.ts");

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
const VIDEO = [V.VIDEO_MATERI_K4B3A, V.VIDEO_LUAR_K4B3A];
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

/* ------------------------------ Khusus Sub-Bab A Kelas 4 Bab 3 ------------------------------ */
{
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k4b3a-luar-1.ts");
  const M_VIDEO = V.VIDEO_MATERI_K4B3A;
  const U = V.VIDEO_LUAR_K4B3A;
  const adegan = (v, id) => v.adegan.find((a) => a.id === id);
  const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  const ketemu = (objs, id) => objs.find((o) => o.id === id);
  const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
  const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
  const tidakAda = (objs, ...ids) => ids.every((id) => !ketemu(objs, id));
  const hampir = (a, b) => Math.abs(a - b) < 0.11;

  /** Deret angklung (atau titik) `${id}-c{i}`: banyak, jarak sama, dan sebaris diperiksa dari benda sungguhan. */
  const batang = (objs, id) => objs.filter((o) => new RegExp(`^${id}-c\\d+$`).test(o.id)).sort((p, q) => Number(p.id.split("-c")[1]) - Number(q.id.split("-c")[1]));
  const deretBenar = (objs, id, n, pesan) => {
    const b = batang(objs, id);
    cek(b.length === n, `${pesan}: ${id} berisi ${n} (ada ${b.length})`);
    if (b.length !== n || n < 2) return;
    const jarak = b[1].x - b[0].x;
    cek(jarak >= 10 && b.every((o, i) => i === 0 || hampir(o.x - b[i - 1].x, jarak)), `${pesan}: ${id} berjarak sama (${b.map((o) => o.x).join(",")})`);
    cek(b.every((o) => o.y === b[0].y), `${pesan}: ${id} sebaris`);
  };
  const selisihTetap = (daftar, d, pesan) => cek(daftar.every((n, i) => i === 0 || n - daftar[i - 1] === d), `${pesan}: selisih tetap ${d} (${daftar.join(",")})`);

  const idDeretSorot = (objs, id, n) => batang(objs, id).length === n && batang(objs, id).every((o) => o.sorot === true);

  // Pembaca bilangan yang diucapkan dengan kata sampai sembilan: satuan dan nol.
  const SATUAN = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
  const bilanganSuara = (s0) => {
    const t = s0.toLowerCase().split(/[^a-z]+/).filter(Boolean);
    const out = [];
    for (const w of t) {
      if (w === "nol") out.push(0);
      else if (SATUAN[w]) out.push(SATUAN[w]);
    }
    return out;
  };
  sama(bilanganSuara("Satu angklung jatuh, lalu dua dan tujuh angklung."), [1, 2, 7], "pembaca bilangan suara (deret)");
  sama(bilanganSuara("Kedua satuan dan pertama sepuluh."), [], "pembaca bilangan suara (bukan bilangan)");

  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Draw the Next|Difference Table|Group by Five|Gambar Berikutnya|Tabel Selisih|Susun Per Lima/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Draw the Next", "Difference Table", "Group by Five"], ["Gambar Berikutnya", "Tabel Selisih", "Susun Per Lima"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Deret Angklung Bu Ratri" && U.judul === M_VIDEO.judul && V.JUDUL_K4B3A === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k4b3a-materi" && U.id === "k4b3a-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,lapangan,deret-tumbuh,tabel,salah-mengecil,kurang,mengangkat,lanjut,ketujuh,habis,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-gambar,luar-gambar-terapan,luar-tabel,luar-tabel-terapan,luar-lima,luar-lima-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan|senilai|ditemani)/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)) && !TERLARANG.test(a.id), `${v.id}/${a.id}: tanpa kata terlarang`);
  // Sub-Bab A tidak memakai istilah pola bilangan, barisan, suku, aturan, dan mesin (itu untuk Sub-Bab B).
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!/pola bilangan|barisan|\bsuku\b|\baturan\b|\bmesin\b/i.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa istilah Sub-Bab B (pola bilangan, barisan, suku, aturan, mesin)`);
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
  for (const n of [0, 1, 2, 3, 4, 5, 6, 7]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [1, 2, 3, 4, 5, 6, 7, 8]) cek(bilanganSuara(semuaLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Pak Hendro", "Satria", "Laras", "Genta", "Bu Ratri", "Pak Gunawan", "Kampung Senandung", "angklung", "tongkat dirigen", "rak", "panggung", "deret", "selisih", "tabel", "pola membesar", "pola mengecil", "nol"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  cek(/Kalau aku salah, aku mengangkat semua angklung sendirian/.test(materi), "video materi: salah langkah dengan taruhan mengangkat angklung");
  for (const pola of [/Helen/, /Azizah/, /Pak Toni/, /Pak Wicak/, /minimarket/i, /Raka/, /Salsa/, /Bima/, /Pak Joko/, /Pak Hasan/, /Bu Ratih/, /Kak Anton/, /Pak Samsul/, /layang/i, /bengkel/i, /sepeda/i, /Chacha/, /Dika/, /\bNia\b/, /Bu Sari/, /pentas/i, /bank sampah/i, /toko\b/i, /kebun binatang/i, /perkemahan/i, /tenda/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /perpustakaan/i, /kantin/i, /koperasi/i, /Meutia/, /Alfa/, /Galih/, /Tiara/, /Slamet/, /pizza/i, /Bu Maya/, /Pak Laode/, /penginapan/i, /perahu/i, /pantai/i, /tiket/i, /kelapa/i, /Bu Wulan/, /Pak Joyo/, /batik/i, /canting/i, /sanggar/i, /Kampung Mekar/i, /\bkain\b/i])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3.2, `durasi video global lebih dari tiga menit dengan margin (${(kataVideo(U) / 120).toFixed(2)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/pola gambar/.test(sapa.ketukan[0].suara) && ["Pola membesar", "Pola mengecil", "Selisih tetap"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/pola gambar/.test(adegan(U, "sapaan").ketukan[0].suara) && /Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global dan bertopik pola gambar");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k4b3a.md", import.meta.url), "utf8");
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

  /* Isi tiap adegan materi. */
  const lp = adegan(M_VIDEO, "lapangan");
  cek(ada(akhirAdegan(lp, 0), "tn", "jud", "ph", "ph-bj", "ph-tp", "ph-pl", "ph-ts", "sa", "sa-bj", "lr", "lr-ka", "lr-k1", "lr-kc", "ge", "ge-pc", "pn"), "lapangan: Pak Hendro bertopi pantai, Satria, Laras, Genta, dan papan nama");
  cek(isiTeks(akhirAdegan(lp, 0), "pn-s1") === "ORKESTRA ANGKLUNG" && isiTeks(akhirAdegan(lp, 0), "pn-s2") === "KAMPUNG SENANDUNG", "lapangan: papan nama ORKESTRA ANGKLUNG KAMPUNG SENANDUNG");
  deretBenar(akhirAdegan(lp, 1), "ra", 4, "lapangan");
  deretBenar(akhirAdegan(lp, 1), "rb", 5, "lapangan");
  cek(ada(akhirAdegan(lp, 1), "rk", "rk-p1", "rk-p2", "pg", "pg-k1", "pg-k2", "kk") && isiTeks(akhirAdegan(lp, 1), "kk") === "masih kosong", "lapangan: rak angklung bertingkat dan panggung kayu yang masih kosong");
  cek(ada(akhirAdegan(lp), "br", "br-sl", "br-tg", "rp") && isiTeks(akhirAdegan(lp), "rp") === "konser rapi" && ketemu(akhirAdegan(lp), "rk").sorot === true && ketemu(akhirAdegan(lp), "br-tg").sorot === true, "lapangan: Bu Ratri berselendang hijau memegang tongkat dirigen, konser harus rapi");
  const dt = adegan(M_VIDEO, "deret-tumbuh");
  {
    const o = akhirAdegan(dt, 0);
    deretBenar(o, "d1", 2, "deret tumbuh");
    deretBenar(o, "d2", 4, "deret tumbuh");
    deretBenar(o, "d3", 6, "deret tumbuh");
    sama(["n1", "n2", "n3"].map((id) => isiTeks(o, id)), ["2", "4", "6"], "deret tumbuh: dua, empat, enam angklung");
    selisihTetap([2, 4, 6].map((_, i) => batang(o, `d${i + 1}`).length), 2, "deret tumbuh: banyak angklung tiap deret");
    cek(ada(o, "br"), "deret tumbuh: Bu Ratri menata");
  }
  {
    const o = akhirAdegan(dt, 1);
    cek(isiTeks(o, "s1") === "+2" && isiTeks(o, "s2") === "+2" && ada(o, "lr", "a1", "a2") && ["d2-c2", "d2-c3", "d3-c4", "d3-c5"].every((id) => ketemu(o, id).sorot === true), "deret tumbuh: Laras melihat tiap deret bertambah dua");
  }
  cek(isiTeks(akhirAdegan(dt), "tp") === "selisih sama" && isiTeks(akhirAdegan(dt), "pl") === "pola" && ada(akhirAdegan(dt), "bg", "ok"), "deret tumbuh: selisih yang sama membuat pola");
  const tb = adegan(M_VIDEO, "tabel");
  {
    const o = akhirAdegan(tb, 0);
    sama(["c1", "c2", "c3"].map((id) => isiTeks(o, id)), ["2", "4", "6"], "tabel: dua, empat, enam di kertas saku");
    sama(["e1", "e2"].map((id) => isiTeks(o, id)), ["+2", "+2"], "tabel: tiap langkah tambah dua");
    cek(ada(o, "lr", "kt", "kg"), "tabel: Laras menulis di kertas saku");
    const p = akhirAdegan(tb, 1);
    cek(isiTeks(p, "c4") === "8" && isiTeks(p, "e3") === "+2" && isiTeks(p, "fs") === "6 + 2 = 8" && ada(p, "sk"), "tabel: deret keempat delapan karena enam ditambah dua");
  }
  cek(isiTeks(akhirAdegan(tb), "mb") === "membesar" && isiTeks(akhirAdegan(tb), "pm") === "makin banyak" && ada(akhirAdegan(tb), "pa", "tp"), "tabel: makin banyak disebut pola membesar");
  const sm = adegan(M_VIDEO, "salah-mengecil");
  {
    const o = akhirAdegan(sm, 0);
    deretBenar(o, "e1", 7, "salah mengecil");
    deretBenar(o, "e2", 5, "salah mengecil");
    deretBenar(o, "e3", 3, "salah mengecil");
    sama(["n1", "n2", "n3"].map((id) => isiTeks(o, id)), ["7", "5", "3"], "salah mengecil: tujuh, lima, tiga");
    selisihTetap([1, 2, 3].map((i) => batang(o, `e${i}`).length), -2, "salah mengecil: banyak angklung tiap deret");
    cek(ada(o, "ge"), "salah mengecil: Genta membawa deret penabuh");
    const p = akhirAdegan(sm, 1);
    cek(isiTeks(p, "sb") === "7 besar!" && isiTeks(p, "mq") === "membesar?" && ada(p, "sa", "sa-bj", "cm") && idDeretSorot(p, "e1", 7), "salah mengecil: Satria berseru tujuh besar jadi pasti membesar");
  }
  {
    const o = akhirAdegan(sm);
    cek(ada(o, "sa", "ge", "tm", "kr", "ot", "tg") && isiTeks(o, "ks") === "kalau salah:" && isiTeks(o, "tg") === "semua angklung" && tidakAda(o, "e1-c0"), "salah mengecil: taruhan mengangkat semua angklung sendirian");
    deretBenar(o, "tb", 5, "salah mengecil taruhan");
  }
  const kr = adegan(M_VIDEO, "kurang");
  {
    const o = akhirAdegan(kr, 0);
    deretBenar(o, "e1", 7, "kurang");
    deretBenar(o, "e2", 5, "kurang");
    deretBenar(o, "e3", 3, "kurang");
    cek(ada(o, "ge") && isiTeks(o, "hs") === "hitung selisihnya", "kurang: Genta menaruh deret berdampingan dan menghitung selisih");
    const p = akhirAdegan(kr, 1);
    cek(isiTeks(p, "s1") === "−2" && isiTeks(p, "s2") === "−2" && ada(p, "a1", "a2") && idDeretSorot(p, "e1", 7) && idDeretSorot(p, "e2", 5), "kurang: dari tujuh ke lima dan dari lima ke tiga berkurang dua");
  }
  cek(isiTeks(akhirAdegan(kr), "mc") === "mengecil" && isiTeks(akhirAdegan(kr), "ms") === "makin sedikit" && isiTeks(akhirAdegan(kr), "bk") === "bukan angka kecil" && ada(akhirAdegan(kr), "bg", "xs"), "kurang: pola mengecil, bukan karena angkanya kecil");
  const mg = adegan(M_VIDEO, "mengangkat");
  {
    const o = akhirAdegan(mg, 0);
    cek(ada(o, "sa", "ku", "tm", "pk", "rk", "rk-p1", "rk-p2"), "mengangkat: Satria mengangkat tumpukan ke rak");
    deretBenar(o, "tb", 3, "mengangkat");
    deretBenar(o, "ra", 4, "mengangkat");
    deretBenar(o, "rb", 5, "mengangkat");
    const p = akhirAdegan(mg, 1);
    cek(ada(p, "jt", "dn", "tw1", "tw2") && isiTeks(p, "sj") === "1 jatuh", "mengangkat: satu angklung jatuh berdenting dan semua tertawa");
    const q = akhirAdegan(mg);
    cek(ada(q, "lr", "ct") && isiTeks(q, "c0") === "lihat selisih" && isiTeks(q, "c1") === "bukan besar angka", "mengangkat: Laras mencatat lihat selisih bukan besar angka");
  }
  const ln = adegan(M_VIDEO, "lanjut");
  {
    const o = akhirAdegan(ln, 0);
    const u = ["u1", "u2", "u3", "u4", "u5"].map((id) => isiTeks(o, `${id}-t`));
    sama(u, ["2", "4", "6", "8", "10"], "lanjut: dua, empat, enam, delapan, sepuluh");
    selisihTetap(u.map(Number), 2, "lanjut: deret dilanjutkan");
    cek(ada(o, "br"), "lanjut: Bu Ratri meminta");
    const p = akhirAdegan(ln, 1);
    deretBenar(p, "d5", 10, "lanjut deret kelima");
    cek(ada(p, "ge") && isiTeks(p, "sp") === "1 per 1" && isiTeks(p, "dl") === "deret 5" && idDeretSorot(p, "d5", 10), "lanjut: Genta menyusun deret kelima satu per satu");
    const q = akhirAdegan(ln, 2);
    sama(["v1", "v2", "v3", "v4"].map((id) => isiTeks(q, `${id}-t`)), ["7", "5", "3", "1"], "lanjut: tujuh, lima, tiga, lalu satu");
    cek(isiTeks(q, "kk") === "−2" && 3 - 2 === 1 && ada(q, "ak", "br") && tidakAda(q, "d5-c0"), "lanjut: pola mengecil dikurangi dua lagi tinggal satu");
    deretBenar(q, "d6", 1, "lanjut tinggal satu");
  }
  const kj = adegan(M_VIDEO, "ketujuh");
  {
    const o = akhirAdegan(kj, 0);
    const banyakBaris = [1, 2, 3, 7].map((i) => isiTeks(o, `r${i}b`));
    sama(banyakBaris, ["2", "4", "6", "14"], "ketujuh: tabel uraian, deret pertama sampai ketiga dan deret ketujuh empat belas");
    sama([2, 3].map((i) => isiTeks(o, `r${i}u`)), ["2 + 2", "4 + 2"], "ketujuh: uraian dua ditambah dua dan empat ditambah dua");
    sama([1, 2, 3, 4, 5, 6, 7].map((i) => isiTeks(o, `r${i}n`)), ["1", "2", "3", "4", "5", "6", "7"], "ketujuh: tujuh baris urutan");
    cek(2 + 6 * 2 === 14 && ketemu(o, "r7u").sorot === true, "ketujuh: dua ditambah dua sebanyak enam kali sama dengan empat belas");
    const p = akhirAdegan(kj, 1);
    const hitung = (id) => p.filter((x) => x.id.startsWith(`${id}-c`) && /^\d+$/.test(x.id.slice(id.length + 2))).length;
    sama([hitung("q1"), hitung("q2"), hitung("q4"), hitung("o1"), hitung("o2"), hitung("o3")], [2, 4, 8, 5, 6, 7], "ketujuh: kotak kosong, titik sungguh sebanyak data (dua, empat, delapan, dan tiga pilihan)");
    cek(ada(p, "q3", "q3t", "pk", "ok") && hitung("q3") === 0 && 2 + 2 * 2 === 6 && hitung("o2") === 6, "ketujuh: kotak ketiga kosong, gambar enam yang melengkapi (dua, empat, enam, delapan)");
    const q = akhirAdegan(kj, 2);
    sama(["w1", "w2", "w3", "w4", "w5"].map((id) => isiTeks(q, `${id}-t`)), ["9", "7", "5", "3", "1"], "ketujuh: pola mengecil sembilan, tujuh, lima, tiga, satu");
    selisihTetap(["w1", "w2", "w3", "w4", "w5"].map((id) => Number(isiTeks(q, `${id}-t`))), -2, "ketujuh: sembilan sampai satu");
  }
  const hb = adegan(M_VIDEO, "habis");
  {
    const o = akhirAdegan(hb, 0);
    deretBenar(o, "b1", 1, "habis");
    cek(ada(o, "sa") && isiTeks(o, "bk") === "1 − 2" && isiTeks(o, "tq") === "?", "habis: Satria bertanya satu dikurangi dua berapa");
    const p = akhirAdegan(hb, 1);
    cek(ada(p, "br", "br-sl", "br-tg", "sn", "rh") && isiTeks(p, "hb") === "habis" && isiTeks(p, "n0") === "0" && tidakAda(p, "b1-c0", "bk", "tq"), "habis: Bu Ratri tersenyum, angklung habis, polanya berhenti di nol");
  }
  cek(isiTeks(akhirAdegan(hb), "bw") === "tidak di bawah 0" && isiTeks(akhirAdegan(hb), "td") === "tidak ada" && isiTeks(akhirAdegan(hb), "pm") === "pola mengecil" && ada(akhirAdegan(hb), "xs") && ketemu(akhirAdegan(hb), "rh").sorot === true, "habis: tidak sampai di bawah nol karena benda tidak bisa kurang dari tidak ada");
  const pt = adegan(M_VIDEO, "penutup");
  {
    const o = akhirAdegan(pt, 0);
    cek(ada(o, "pg", "pg-bj", "pg-tp", "pgg", "mt", "pl", "pk") && isiTeks(o, "tm") === "meteran" && isiTeks(o, "tpl") === "palu" && isiTeks(o, "pg-n") === "Pak Gunawan", "penutup: Pak Gunawan berompi oranye membawa gulungan meteran dan palu");
    const p = akhirAdegan(pt, 1);
    cek(ada(p, "c1-d", "c1-s", "c2-d", "c3-d") && isiTeks(p, "pl2") === "pola kursi" && isiTeks(p, "bl") === "3, 6, 9", "penutup: kursi penonton dengan pola bilangan");
    selisihTetap(isiTeks(p, "bl").split(", ").map(Number), 3, "penutup: bilangan kursi");
  }
  {
    const o = akhirAdegan(pt);
    cek(ada(o, "pg", "sa", "lr", "ge", "ph", "br", "c1-d", "c2-d", "c3-d", "c4-d", "tq", "lb") && isiTeks(o, "tq") === "?" && ["m1", "m2", "m3"].map((id) => isiTeks(o, id)).join("") === "123" && tidakAda(o, "pgg"), "penutup: enam tokoh melambai, kursi bernomor, dan pertanyaan menyusun kursi tanpa menggambar");
  }

  /* Isi tiap adegan metode global. */
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "tr", "br", "pt", "tt", "bl") && isiTeks(akhirAdegan(op, 0), "tr2") === "teratur", "global pembuka: Bu Ratri membuka peti angklung di tepi panggung sore");
  deretBenar(akhirAdegan(op, 0), "pe", 4, "global pembuka peti");
  cek(isiTeks(akhirAdegan(op, 1), "n3") === "3 cara" && ada(akhirAdegan(op, 1), "c0-k", "c2-k", "xs", "ok"), "global pembuka: tiga cara supaya pola gambar mudah dilanjutkan");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Draw the Next", "2. Difference Table", "3. Group by Five"], "global pembuka: tiga nama metode");
  sama(["g0", "g1", "g2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Gambar Berikutnya", "Tabel Selisih", "Susun Per Lima"], "global pembuka: tiga nama bahasa Indonesia");
  const gk = adegan(U, "luar-gambar");
  cek(isiTeks(akhirAdegan(gk, 0), "nm") === "Draw the Next" && isiTeks(akhirAdegan(gk, 0), "ni") === "Gambar Berikutnya" && ada(akhirAdegan(gk, 0), "pt", "g1-c0"), "gambar konsep: judul dan deret pertama");
  deretBenar(akhirAdegan(gk, 0), "g1", 3, "gambar konsep");
  deretBenar(akhirAdegan(gk, 1), "g2", 5, "gambar konsep");
  cek(isiTeks(akhirAdegan(gk, 1), "l1") === "deret 1" && isiTeks(akhirAdegan(gk, 1), "l2") === "deret 2" && ada(akhirAdegan(gk, 1), "ey"), "gambar konsep: mencari yang berubah dari deret ke deret");
  deretBenar(akhirAdegan(gk, 2), "g3", 7, "gambar konsep");
  selisihTetap([3, 5, 7].map((_, i) => batang(akhirAdegan(gk, 2), `g${i + 1}`).length), 2, "gambar konsep: perubahan sama persis");
  cek(isiTeks(akhirAdegan(gk, 2), "pb") === "perubahan sama" && ketemu(akhirAdegan(gk, 2), "g3-c6").sorot === true, "gambar konsep: deret selanjutnya dengan perubahan yang sama");
  cek(ada(akhirAdegan(gk), "ek") && isiTeks(akhirAdegan(gk), "bt") === "bertambah" && isiTeks(akhirAdegan(gk), "bg") === "atau berkurang", "gambar konsep: langsung melihat bertambah atau berkurang");
  const gt = adegan(U, "luar-gambar-terapan");
  {
    const o = akhirAdegan(gt, 0);
    deretBenar(o, "g1", 2, "gambar terapan");
    deretBenar(o, "g2", 4, "gambar terapan");
    deretBenar(o, "g3", 6, "gambar terapan");
    sama(["t1", "t2", "t3"].map((id) => isiTeks(o, id)), ["2", "4", "6"], "gambar terapan: dua, empat, enam");
    cek(ada(o, "lr", "gk") && isiTeks(o, "gq") === "?", "gambar terapan: Laras menggambar deret keempat yang belum ada");
    const p = akhirAdegan(gt, 1);
    deretBenar(p, "g4", 8, "gambar terapan deret keempat");
    cek(isiTeks(p, "pd") === "+2" && isiTeks(p, "n8") === "8" && tidakAda(p, "gk", "gq") && ketemu(p, "g4-c6").sorot === true && ketemu(p, "g4-c7").sorot === true && 6 + 2 === 8, "gambar terapan: menambah dua angklung baru jadi delapan");
  }
  cek(ada(akhirAdegan(gt, 2), "ok", "my") && isiTeks(akhirAdegan(gt, 2), "pp") === "pola pendek", "gambar terapan: cocok untuk pola yang masih pendek");
  cek(ada(akhirAdegan(gt), "xs", "kr") && isiTeks(akhirAdegan(gt), "dj") === "deret 50" && tidakAda(akhirAdegan(gt), "ok"), "gambar terapan: kurang cocok untuk deret yang sangat jauh");
  const tk = adegan(U, "luar-tabel");
  cek(isiTeks(akhirAdegan(tk, 0), "nm") === "Difference Table" && isiTeks(akhirAdegan(tk, 0), "ni") === "Tabel Selisih" && ada(akhirAdegan(tk, 0), "tb", "tb-h", "tb-v1", "tb-v2", "tb-v3"), "tabel konsep: judul dan tabel kapur");
  {
    const o = akhirAdegan(tk, 0);
    const v = ["tb-v1", "tb-v2", "tb-v3"].map((id) => ketemu(o, id).x);
    cek(hampir(v[1] - v[0], v[2] - v[1]) && hampir(v[0] - ketemu(o, "tb").x, v[1] - v[0]), "tabel konsep: empat kolom sama lebar");
    const p = akhirAdegan(tk, 1);
    const c = ["c0", "c1", "c2", "c3"].map((id) => isiTeks(p, id));
    sama(c, ["4", "7", "10", "13"], "tabel konsep: banyak tiap deret");
    selisihTetap(c.map(Number), 3, "tabel konsep: banyak tiap deret");
    sama(["e1", "e2", "e3"].map((id) => isiTeks(p, id)), ["+3", "+3", "+3"], "tabel konsep: selisih di baris bawah");
    cek(isiTeks(p, "r1") === "baris 1" && isiTeks(p, "r2") === "baris 2", "tabel konsep: satu baris untuk banyak, satu baris untuk selisih");
  }
  cek(ketemu(akhirAdegan(tk, 2), "e1").sorot === true && isiTeks(akhirAdegan(tk, 2), "ss") === "selisih sama" && ada(akhirAdegan(tk, 2), "ok") && isiTeks(akhirAdegan(tk, 2), "mb") === "membesar?" && isiTeks(akhirAdegan(tk, 2), "mc") === "mengecil?", "tabel konsep: selisih selalu sama, pola membesar atau mengecil");
  cek(isiTeks(akhirAdegan(tk), "pt1") === "+3 membesar" && isiTeks(akhirAdegan(tk), "km") === "−3 mengecil" && ada(akhirAdegan(tk), "up", "dn") && tidakAda(akhirAdegan(tk), "ss", "mb", "mc"), "tabel konsep: tanda tambah membesar, tanda kurang mengecil");
  const tt = adegan(U, "luar-tabel-terapan");
  {
    const o = akhirAdegan(tt, 0);
    sama(["c0", "c1", "c2"].map((id) => isiTeks(o, id)), ["7", "5", "3"], "tabel terapan: tujuh, lima, tiga");
    sama(["e1", "e2"].map((id) => isiTeks(o, id)), ["−2", "−2"], "tabel terapan: kurang dua di antara tiap pasangan");
    cek(ada(o, "ge", "tb", "pt"), "tabel terapan: Genta menulis di papan");
    const p = akhirAdegan(tt, 1);
    cek(isiTeks(p, "e3") === "−2" && isiTeks(p, "c3") === "1" && 3 - 2 === 1 && ada(p, "sk") && ketemu(p, "e1").sorot === true, "tabel terapan: deret berikutnya satu");
  }
  cek(ada(akhirAdegan(tt, 2), "ok") && isiTeks(akhirAdegan(tt, 2), "pk") === "periksa selisih" && isiTeks(akhirAdegan(tt, 2), "dj") === "deret jauh", "tabel terapan: cocok untuk memeriksa selisih dan deret yang jauh");
  cek(ada(akhirAdegan(tt), "xs") && isiTeks(akhirAdegan(tt), "bu") === "−2, −1, −3" && isiTeks(akhirAdegan(tt), "hy") === "hanya selisih tetap" && tidakAda(akhirAdegan(tt), "ok"), "tabel terapan: kurang cocok bila selisih berubah-ubah");
  const lm = adegan(U, "luar-lima");
  cek(isiTeks(akhirAdegan(lm, 0), "nm") === "Group by Five" && isiTeks(akhirAdegan(lm, 0), "ni") === "Susun Per Lima" && isiTeks(akhirAdegan(lm, 0), "g5") === "5 per baris", "lima konsep: judul dan lima per baris");
  deretBenar(akhirAdegan(lm, 0), "t0", 5, "lima konsep");
  {
    const o = akhirAdegan(lm, 1);
    deretBenar(o, "t1", 5, "lima konsep baris pertama");
    deretBenar(o, "t2", 3, "lima konsep sisa");
    cek(batang(o, "t1").length + batang(o, "t2").length === 8 && isiTeks(o, "l5") === "5 benda" && isiTeks(o, "s3") === "sisa 3" && tidakAda(o, "t0-c0", "g5"), "lima konsep: baris berisi lima, sisanya di baris berikutnya");
    cek(batang(o, "t1")[0].x === batang(o, "t2")[0].x && batang(o, "t2")[0].y > batang(o, "t1")[0].y, "lima konsep: baris kedua tepat di bawah baris pertama");
  }
  cek(isiTeks(akhirAdegan(lm, 2), "sk") === "5 + 3 = 8" && isiTeks(akhirAdegan(lm, 2), "sx") === "bukan 1 per 1" && ada(akhirAdegan(lm, 2), "ok"), "lima konsep: banyaknya terbaca sekilas tanpa menghitung satu per satu");
  {
    const o = akhirAdegan(lm);
    deretBenar(o, "t3", 5, "lima konsep deret kedua");
    deretBenar(o, "t4", 5, "lima konsep deret kedua");
    cek(isiTeks(o, "d1") === "deret 1" && isiTeks(o, "d2") === "deret 2" && tidakAda(o, "sk", "sx", "ok"), "lima konsep: dua deret mudah dibandingkan");
  }
  const lt = adegan(U, "luar-lima-terapan");
  {
    const o = akhirAdegan(lt, 0);
    deretBenar(o, "h1", 5, "lima terapan");
    deretBenar(o, "h2", 5, "lima terapan");
    cek(batang(o, "h1").length + batang(o, "h2").length === 10 && isiTeks(o, "n10") === "10" && isiTeks(o, "b2") === "2 baris" && isiTeks(o, "f1") === "5" && isiTeks(o, "f2") === "5" && ada(o, "sa"), "lima terapan: Satria menyusun sepuluh angklung jadi dua baris berisi lima");
    cek(batang(o, "h1")[0].x === batang(o, "h2")[0].x && batang(o, "h2")[0].y > batang(o, "h1")[0].y, "lima terapan: baris kedua tepat di bawah baris pertama");
    const p = akhirAdegan(lt, 1);
    cek(isiTeks(p, "k5") === "deret 5 = 10" && ada(p, "el", "ok") && idDeretSorot(p, "h1", 5) && idDeretSorot(p, "h2", 5), "lima terapan: deret kelima berisi sepuluh angklung");
  }
  cek(ada(akhirAdegan(lt, 2), "ok2", "rk") && isiTeks(akhirAdegan(lt, 2), "bb") === "benda banyak" && tidakAda(akhirAdegan(lt, 2), "k5"), "lima terapan: cocok untuk benda yang banyak");
  cek(ada(akhirAdegan(lt), "xs") && isiTeks(akhirAdegan(lt), "dt") === "hanya 2 atau 3" && isiTeks(akhirAdegan(lt), "bs") === "baris 5 boros" && tidakAda(akhirAdegan(lt), "ok2", "bb"), "lima terapan: kurang cocok bila bendanya hanya dua atau tiga");
  const rg = adegan(U, "luar-ringkas");
  cek(["r0-t", "r1-t", "r2-t"].map((id) => isiTeks(akhirAdegan(rg, 0), id)).join("|") === "Gambar Berikutnya|Tabel Selisih|Susun Per Lima" && isiTeks(akhirAdegan(rg, 0), "n3") === "3 cara" && ada(akhirAdegan(rg, 0), "br", "pk"), "ringkasan: tiga kartu cara dan Bu Ratri");
  cek(ketemu(akhirAdegan(rg, 1), "r1-k").sorot === true && !ketemu(akhirAdegan(rg, 1), "r0-k").sorot && ada(akhirAdegan(rg, 1), "ok1", "ok2") && tidakAda(akhirAdegan(rg, 1), "pk"), "ringkasan: Gambar Berikutnya lalu Tabel Selisih");
  cek(ketemu(akhirAdegan(rg, 2), "r2-k").sorot === true && !ketemu(akhirAdegan(rg, 2), "r1-k").sorot && isiTeks(akhirAdegan(rg, 2), "s5") === "5 per baris" && isiTeks(akhirAdegan(rg, 2), "ps") === "periksa selisih" && ada(akhirAdegan(rg, 2), "ok3"), "ringkasan: Susun Per Lima dan selalu periksa selisih");
  deretBenar(akhirAdegan(rg), "pj", 10, "ringkasan deret panjang");
  cek(isiTeks(akhirAdegan(rg), "tq") === "?" && isiTeks(akhirAdegan(rg), "sp") === "sangat panjang" && ada(akhirAdegan(rg), "br", "i0", "i1", "i2") && tidakAda(akhirAdegan(rg), "n3", "r0-k"), "ringkasan: pertanyaan cara untuk deret angklung yang sangat panjang");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k4b3a-.*\.ts$/.test(f));
  cek(berkas.length === 8, `berkas story k4b3a (${berkas.length})`);
  for (const f of ["bantu", "gambar", "luar-1", "luar-2", "materi-1", "materi-2", "materi-3", "video"]) cek(berkas.includes(`k4b3a-${f}.ts`), `k4b3a-${f}.ts ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!/\\u\{1FA74\}|\\u\{1F39F\}|\\u2602|\\u\{1FA9F\}|\\u\{1FAA3\}|\\u\{1F355\}/i.test(s) && ![...s].some((c) => [0x1fa74, 0x1f39f, 0x2602, 0x1fa9f, 0x1faa3, 0x1f355].includes(c.codePointAt(0))), `${f}: tanpa emoji yang tampil kosong atau hitam`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s) && !/senilai/i.test(s) && !/\\u\{1F41F\}|\\u\{1F420\}|\\u\{1F421\}|\\u\{1F988\}|\\u\{1F42C\}|\\u\{1F38F\}/i.test(s) && ![...s].some((c) => [0x1f41f, 0x1f420, 0x1f421, 0x1f988, 0x1f42c, 0x1f38f].includes(c.codePointAt(0))), `${f}: tanpa kata buku, senilai, dan tanpa emoji ikan`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k4b3a-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k4b3a (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pbc = readFileSync(new URL("../src/components/modul/video-k4b3a.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K4B3A/.test(pbc) && /VIDEO_LUAR_K4B3A/.test(pbc) && /export function VideoK4B3A/.test(pbc) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pbc) && !/\r/.test(pbc) && !pbc.startsWith("﻿") && !/data-k4b3|video-k4b3-umum|naskah-k4b3|skenario-k4b3/.test(pbc), "video-k4b3a.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
