// Uji Story Kelas 4 Bab 2 Sub-Bab C "Meja Jahit Kak Sekar" (pecahan yang sama besar), cerita Sanggar Batik Kampung Mekar: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k4b2c.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k4b2c-video.ts");

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
const VIDEO = [V.VIDEO_MATERI_K4B2C, V.VIDEO_LUAR_K4B2C];
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

/* ------------------------------ Khusus Sub-Bab C Kelas 4 Bab 2 ------------------------------ */
{
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k4b2c-luar-1.ts");
  const G = await import("../src/components/modul/story/k4b2c-gambar.ts");
  const M_VIDEO = V.VIDEO_MATERI_K4B2C;
  const U = V.VIDEO_LUAR_K4B2C;
  const adegan = (v, id) => v.adegan.find((a) => a.id === id);
  const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  const ketemu = (objs, id) => objs.find((o) => o.id === id);
  const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
  const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
  const tidakAda = (objs, ...ids) => ids.every((id) => !ketemu(objs, id));

  // Pembaca bilangan yang diucapkan dengan kata (satuan, belasan, puluhan, ratusan).
  const SATUAN = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
  const BATAS = ["puluh", "belas", "ratus", "ribu"];
  const bilanganSuara = (s0) => {
    const potong = s0.split(/[,.;:!?]/);
    if (potong.length > 1) return potong.flatMap((x) => bilanganSuara(x));
    const t = s0.toLowerCase().split(/[^a-z]+/).filter(Boolean);
    const puluhSatuan = (i) => {
      const w = t[i];
      if (w === "sepuluh" && t[i + 1] !== "ribu") return [10, i + 1];
      if (w === "sebelas") return [11, i + 1];
      if (SATUAN[w]) {
        if (t[i + 1] === "belas") return [10 + SATUAN[w], i + 2];
        if (t[i + 1] === "puluh") {
          let n = SATUAN[w] * 10;
          let j = i + 2;
          if (SATUAN[t[j]] && !BATAS.includes(t[j + 1])) {
            n += SATUAN[t[j]];
            j += 1;
          }
          return [n, j];
        }
        if (!["ratus", "ribu"].includes(t[i + 1])) return [SATUAN[w], i + 1];
      }
      return null;
    };
    const ratus = (i) => {
      const w = t[i];
      if (w === "seratus") {
        const b = puluhSatuan(i + 1);
        return b ? [100 + b[0], b[1]] : [100, i + 1];
      }
      if (SATUAN[w] && t[i + 1] === "ratus") {
        const b = puluhSatuan(i + 2);
        return b ? [SATUAN[w] * 100 + b[0], b[1]] : [SATUAN[w] * 100, i + 2];
      }
      return null;
    };
    const out = [];
    for (let i = 0; i < t.length; ) {
      if (t[i] === "nol") {
        out.push(0);
        i += 1;
        continue;
      }
      const b = ratus(i) ?? puluhSatuan(i);
      if (b) {
        out.push(b[0]);
        i = b[1];
      } else i += 1;
    }
    return out;
  };
  sama(bilanganSuara("Dua per empat, dan empat per delapan."), [2, 4, 4, 8], "pembaca bilangan suara (pecahan)");
  sama(bilanganSuara("Satu per tiga dalam bentuk per dua belas."), [1, 3, 12], "pembaca bilangan suara (dua belas)");
  sama(bilanganSuara("Sepuluh per lima belas, seratus bagian."), [10, 15, 100], "pembaca bilangan suara (sepuluh, lima belas, seratus)");

  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Area Model Match|Multiply by One|Divide Both|Cocokkan Daerah|Kali Bentuk Satu|Bagi Keduanya/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Area Model Match", "Multiply by One", "Divide Both"], ["Cocokkan Daerah", "Kali Bentuk Satu", "Bagi Keduanya"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Meja Jahit Kak Sekar" && U.judul === M_VIDEO.judul && V.JUDUL_K4B2C === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k4b2c-materi" && U.id === "k4b2c-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,jahit,setengah,dua-per-empat,salah-tambah,periksa,kancing,kali,sederhana,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-daerah,luar-daerah-terapan,luar-kali,luar-kali-terapan,luar-bagi,luar-bagi-terapan,luar-ringkas", "urutan adegan metode global");
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
  for (const n of [1, 2, 3, 4, 6, 8, 10, 100]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [1, 2, 3, 4, 8, 10, 12, 15]) cek(bilanganSuara(semuaLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Pak Hendro", "Satria", "Laras", "Genta", "Kak Sekar", "Pak Bagas", "meja jahit", "kancing", "pecahan", "sama besar", "sederhana"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  cek(/Kalau aku salah, aku menjahit semua kancing/.test(materi), "video materi: salah langkah dengan taruhan menjahit kancing");
  for (const pola of [/Helen/, /Azizah/, /Pak Toni/, /Pak Wicak/, /minimarket/i, /Raka/, /Salsa/, /Bima/, /Pak Joko/, /Pak Hasan/, /Bu Ratih/, /Kak Anton/, /Pak Samsul/, /layang/i, /bengkel/i, /sepeda/i, /Chacha/, /Dika/, /\bNia\b/, /Bu Sari/, /pentas/i, /angklung/i, /bank sampah/i, /toko/i, /kebun binatang/i, /perkemahan/i, /tenda/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /perpustakaan/i, /kantin/i, /koperasi/i, /Meutia/, /Alfa/, /Galih/, /penginapan/i, /pantai/i, /perahu/i, /kelapa/i, /Bu Maya/, /Pak Laode/, /tiket/i, /pizza/i, /senilai/i, /Tiara/, /Slamet/])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/pecahan yang sama besar/.test(sapa.ketukan[0].suara) && ["Bagian berbeda tetapi sama besar", "Mengalikan atau membagi dengan bilangan sama", "Menyederhanakan pecahan"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k4b2c.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  // Visual berubah mengikuti kata pada hampir semua ketukan.
  let banyakTitik = 0;
  let total = 0;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) { total += 1; if (new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at))).size >= 2) banyakTitik += 1; }
  cek(banyakTitik / total >= 0.9, `visual berubah mengikuti kata pada sedikitnya 90 persen ketukan (${banyakTitik}/${total})`);
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") cek(akhirAdegan(a).some((o) => o.t !== "teks"), `${v.id}/${a.id}: gambar akhir memuat bentuk gambar sendiri, bukan hanya teks`);
  // Tidak ada gambar tokoh yang menutup angka atau nama.
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan)
      a.ketukan.forEach((_, i) => {
        const objs = L.keadaanStory(a, i, 9999);
        for (const w of objs.filter((o) => o.t === "teks" && /^[\u{1F466}\u{1F467}\u{1F9D2}\u{1F468}\u{1F469}]$/u.test(o.isi ?? "") && (o.u ?? 10) >= 28)) {
          const kiri = (w.x ?? 0) - 15;
          const kanan = (w.x ?? 0) + 15;
          const atas = (w.y ?? 0) - 24;
          const bawah = (w.y ?? 0) + 4;
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
        // Label nama tokoh diturunkan (tidak menempel dagu).
        for (const n of objs.filter((o) => /-n$/.test(o.id) && o.t === "teks")) {
          const w = objs.find((o) => o.id === n.id.slice(0, -2));
          if (w) cek((n.y ?? 0) - (w.y ?? 0) >= 18, `${v.id}/${a.id}#${i + 1}: label ${n.isi} turun dari dagu`);
        }
      });
  // Pecahan digambar benar: bagian berarsir sungguh sebanyak pembilang dari penyebut, bagian sama besar, dan pecahan bertingkat sesuai.
  const arsir = (objs, id, q) => G.idKain(id, q).filter((n) => ketemu(objs, n)?.warna === G.W.arsir).length;
  const sebanding = (objs, id, q, lebar) => G.idKain(id, q).every((n) => Math.abs((ketemu(objs, n)?.w ?? 0) - lebar / q) < 0.15) && ada(objs, ...G.idKain(id, q));
  const urut = (objs, id, q) => G.idKain(id, q).every((n, i, arr) => i === 0 || Math.abs((ketemu(objs, n)?.x ?? 0) - ((ketemu(objs, arr[i - 1])?.x ?? 0) + (ketemu(objs, arr[i - 1])?.w ?? 0))) < 0.2);
  const frak = (objs, id) => `${isiTeks(objs, `${id}-p`)}/${isiTeks(objs, `${id}-q`)}`;
  const bar = (nama, objs, id, q, p, lebar) => cek(arsir(objs, id, q) === p && sebanding(objs, id, q, lebar) && urut(objs, id, q), `${nama}: kain ${id} berbagi ${q} sama besar dengan ${p} bagian berarsir`);
  const jh = adegan(M_VIDEO, "jahit");
  cek(ada(akhirAdegan(jh, 0), "lt", "ks", "ks-pt", "ks-mt", "sa", "lr", "ge", "ks-n") && isiTeks(akhirAdegan(jh, 1), "n2") === undefined && ada(akhirAdegan(jh, 1), "mj", "ms", "bn1", "bn2"), "jahit: Kak Sekar dan tiga anak di serambi, meja dengan mesin dan benang");
  cek(isiTeks(akhirAdegan(jh), "n2") === "2 potongan" && ada(akhirAdegan(jh), "mj"), "jahit: dua potongan berbeda bagian");
  bar("jahit", akhirAdegan(jh), "ba", 3, 0, 160);
  bar("jahit", akhirAdegan(jh), "bb", 6, 0, 160);
  const sd = adegan(M_VIDEO, "setengah");
  bar("setengah", akhirAdegan(sd, 0), "kb", 2, 1, 160);
  cek(isiTeks(akhirAdegan(sd, 0), "nd") === "2 bagian" && isiTeks(akhirAdegan(sd, 0), "ns") === "1 diarsir" && frak(akhirAdegan(sd, 1), "pc") === "1/2", "setengah: kain dibagi dua, satu diarsir, pecahan satu per dua");
  bar("setengah", akhirAdegan(sd), "kl", 2, 1, 44);
  cek(ada(akhirAdegan(sd), "lr", "mj", "ar"), "setengah: Laras menyimpan potongan di meja kiri");
  const dp = adegan(M_VIDEO, "dua-per-empat");
  bar("dua per empat", akhirAdegan(dp, 0), "kb", 4, 2, 160);
  cek(isiTeks(akhirAdegan(dp, 0), "nd") === "4 bagian" && isiTeks(akhirAdegan(dp, 0), "ns") === "2 diarsir" && frak(akhirAdegan(dp, 1), "pc") === "2/4", "dua per empat: kain dibagi empat, dua diarsir, pecahan dua per empat");
  bar("dua per empat", akhirAdegan(dp), "ta", 2, 1, 160);
  bar("dua per empat", akhirAdegan(dp), "tb", 4, 2, 160);
  cek(ketemu(akhirAdegan(dp), "ta-c1").x === ketemu(akhirAdegan(dp), "tb-c2").x && ada(akhirAdegan(dp), "gv") && isiTeks(akhirAdegan(dp), "sm") === "=" && isiTeks(akhirAdegan(dp), "n2") === "2 potongan", "dua per empat: arsiran satu per dua dan dua per empat berakhir di titik yang sama");
  const st = adegan(M_VIDEO, "salah-tambah");
  cek(frak(akhirAdegan(st, 0), "pa") === "1/2" && isiTeks(akhirAdegan(st, 0), "t1") === "+2" && isiTeks(akhirAdegan(st, 0), "t2") === "+2", "salah tambah: satu per dua ditambah dua pada pembilang dan penyebut");
  cek(frak(akhirAdegan(st, 1), "pb") === "3/4" && frak(akhirAdegan(st, 1), "pa") === "1/2" && isiTeks(akhirAdegan(st, 1), "md") === "mudah sekali!", "salah tambah: Satria menulis tiga per empat");
  cek(ada(akhirAdegan(st), "mj", "kk", "kk-b0", "b1", "b2", "ms", "st") && tidakAda(akhirAdegan(st), "pa-p", "pb-p"), "salah tambah: taruhan menjahit semua kancing baju di meja");
  const pr = adegan(M_VIDEO, "periksa");
  bar("periksa", akhirAdegan(pr, 0), "ta", 4, 3, 160);
  bar("periksa", akhirAdegan(pr, 0), "tb", 2, 1, 160);
  cek(frak(akhirAdegan(pr, 0), "pa") === "3/4" && frak(akhirAdegan(pr, 0), "pb") === "1/2", "periksa: tiga per empat di atas satu per dua");
  cek(ada(akhirAdegan(pr, 1), "gv", "lp") && isiTeks(akhirAdegan(pr, 1), "ts") === "tidak sama" && ketemu(akhirAdegan(pr, 1), "ta-c2").sorot === true && ketemu(akhirAdegan(pr, 1), "gv").x === ketemu(akhirAdegan(pr, 1), "tb-c0").x + ketemu(akhirAdegan(pr, 1), "tb-c0").w, "periksa: tiga per empat lebih panjang dari ujung satu per dua");
  cek(isiTeks(akhirAdegan(pr), "kt-t0") === "menambah" && isiTeks(akhirAdegan(pr), "kl-t0") === "mengalikan" && ada(akhirAdegan(pr), "xs", "ok"), "periksa: menambah tidak menjaga, mengalikan menjaga");
  const kc = adegan(M_VIDEO, "kancing");
  cek(ada(akhirAdegan(kc, 0), "bj", "kc0", "kc1", "kc2", "c1") && isiTeks(akhirAdegan(kc, 0), "c1") === "1", "kancing: Satria menjahit kancing satu per satu");
  cek(isiTeks(akhirAdegan(kc, 1), "n2") === "2 kali" && ada(akhirAdegan(kc, 1), "jr") && ketemu(akhirAdegan(kc, 1), "st").isi === "\u{1F623}", "kancing: jarum menusuk jari dua kali, Satria meringis");
  cek(ada(akhirAdegan(kc), "ks", "tw", "pl") && ketemu(akhirAdegan(kc), "st").isi === "\u{1F466}", "kancing: Kak Sekar tertawa dan menempelkan plester");
  const kl = adegan(M_VIDEO, "kali");
  cek(frak(akhirAdegan(kl, 0), "pa") === "1/2" && isiTeks(akhirAdegan(kl, 0), "x1") === "×2" && isiTeks(akhirAdegan(kl, 0), "x2") === "×2", "kali: satu per dua dikali dua pada pembilang dan penyebut");
  cek(["p1", "p2", "p3"].map((id) => frak(akhirAdegan(kl, 1), id)).join("|") === "1/2|2/4|4/8" && isiTeks(akhirAdegan(kl, 1), "l1") === "×2" && isiTeks(akhirAdegan(kl, 1), "l2") === "×4", "kali: satu per dua, dua per empat, empat per delapan");
  bar("kali", akhirAdegan(kl), "b1", 2, 1, 76);
  bar("kali", akhirAdegan(kl), "b2", 4, 2, 76);
  bar("kali", akhirAdegan(kl), "b3", 8, 4, 76);
  const sg = adegan(M_VIDEO, "sederhana");
  bar("sederhana", akhirAdegan(sg, 0), "kb", 8, 6, 160);
  cek(frak(akhirAdegan(sg, 0), "pc") === "6/8" && ada(akhirAdegan(sg, 0), "ks"), "sederhana: enam per delapan ditunjukkan Kak Sekar");
  cek(frak(akhirAdegan(sg, 1), "pd") === "3/4" && isiTeks(akhirAdegan(sg, 1), "dv") === "÷2" && ada(akhirAdegan(sg, 1), "lr", "ar"), "sederhana: dibagi dua menjadi tiga per empat");
  bar("sederhana", akhirAdegan(sg), "sb", 4, 3, 160);
  bar("sederhana", akhirAdegan(sg), "kb", 8, 6, 160);
  cek(ketemu(akhirAdegan(sg), "kb-c5").x + ketemu(akhirAdegan(sg), "kb-c5").w === ketemu(akhirAdegan(sg), "sb-c2").x + ketemu(akhirAdegan(sg), "sb-c2").w && isiTeks(akhirAdegan(sg), "ls") === "lebih sederhana", "sederhana: enam per delapan dan tiga per empat berakhir di titik yang sama");
  const pt = adegan(M_VIDEO, "penutup");
  cek(ada(akhirAdegan(pt, 0), "pb", "pb-tp", "pb-gl", "mt", "gk", "gp", "lt") && isiTeks(akhirAdegan(pt, 0), "pj") === "kain panjang", "penutup: Pak Bagas bertopi memanggul gulungan kain dan meteran");
  bar("penutup", akhirAdegan(pt, 1), "kb", 10, 3, 120);
  cek(G.idKain("kb", 10).length === 10 && Array.from({ length: 100 }, (_, i) => `kd${i}`).every((id) => ketemu(akhirAdegan(pt, 1), id)) && isiTeks(akhirAdegan(pt, 1), "n10") === "10 bagian" && isiTeks(akhirAdegan(pt, 1), "n100") === "100 bagian", "penutup: sepuluh bagian dan kisi seratus bagian digambar sungguh");
  cek(frak(akhirAdegan(pt), "pq") === "3/10" && isiTeks(akhirAdegan(pt), "tq") === "= ?" && ada(akhirAdegan(pt), "sa", "lr", "ge", "ph", "ks", "lb"), "penutup: tiga per sepuluh dengan koma dan lima tokoh melambai");

  /* Metode global. */
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "mj", "ms", "ks", "lc", "ks0", "ks2"), "global pembuka: Kak Sekar membuka laci di meja jahit");
  cek(isiTeks(akhirAdegan(op, 1), "n3") === "3 cara" && ada(akhirAdegan(op, 1), "c0-k", "c2-k", "ok", "xs"), "global pembuka: tiga cara");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Area Model Match", "2. Multiply by One", "3. Divide Both"], "global pembuka: tiga nama metode");
  sama(["g0", "g1", "g2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Cocokkan Daerah", "Kali Bentuk Satu", "Bagi Keduanya"], "global pembuka: tiga nama bahasa Indonesia");
  const dm = adegan(U, "luar-daerah");
  cek(isiTeks(akhirAdegan(dm, 0), "nm") === "Area Model Match" && isiTeks(akhirAdegan(dm, 0), "ni") === "Cocokkan Daerah", "Area Model Match konsep: judul");
  cek(isiTeks(akhirAdegan(dm, 1), "n2") === "2 bangun" && ada(akhirAdegan(dm, 1), "s1-c0", "s2-c0"), "Area Model Match konsep: dua bangun sama besar dibagi berbeda");
  bar("Area Model Match", akhirAdegan(dm), "s1", 4, 2, 180);
  bar("Area Model Match", akhirAdegan(dm), "s2", 8, 4, 180);
  cek(frak(akhirAdegan(dm), "fa") === "2/4" && frak(akhirAdegan(dm), "fb") === "4/8" && ada(akhirAdegan(dm), "ok") && isiTeks(akhirAdegan(dm), "eq") === "=", "Area Model Match konsep: dua per empat sama besar dengan empat per delapan");
  const dt = adegan(U, "luar-daerah-terapan");
  bar("Cocokkan Daerah terapan", akhirAdegan(dt, 1), "a", 3, 1, 180);
  bar("Cocokkan Daerah terapan", akhirAdegan(dt, 1), "b", 6, 2, 180);
  cek(ketemu(akhirAdegan(dt, 1), "a-c0").x + ketemu(akhirAdegan(dt, 1), "a-c0").w === ketemu(akhirAdegan(dt, 1), "b-c1").x + ketemu(akhirAdegan(dt, 1), "b-c1").w && ada(akhirAdegan(dt, 1), "gv", "ok"), "Cocokkan Daerah terapan: satu per tiga dan dua per enam berakhir di titik yang sama");
  cek(frak(akhirAdegan(dt, 2), "ga") === "1/3" && frak(akhirAdegan(dt, 2), "gb") === "2/6" && isiTeks(akhirAdegan(dt, 2), "n2b") === "2 pecahan", "Cocokkan Daerah terapan: cocok untuk melihat dua pecahan sama besar");
  cek(ada(akhirAdegan(dt), "bx-c11", "by-c14", "kr", "jm") && isiTeks(akhirAdegan(dt), "lm") === "lama", "Cocokkan Daerah terapan: kurang cocok bila bagian banyak");
  bar("Cocokkan Daerah terapan", akhirAdegan(dt), "bx", 12, 7, 180);
  const lk = adegan(U, "luar-kali");
  cek(isiTeks(akhirAdegan(lk, 0), "nm") === "Multiply by One" && isiTeks(akhirAdegan(lk, 0), "ni") === "Kali Bentuk Satu" && isiTeks(akhirAdegan(lk, 0), "b1") === "bentuk 1", "Multiply by One konsep: judul");
  cek(frak(akhirAdegan(lk, 1), "fa") === "2/2" && frak(akhirAdegan(lk, 1), "fb") === "3/3" && isiTeks(akhirAdegan(lk, 1), "e1") === "= 1" && isiTeks(akhirAdegan(lk, 1), "e2") === "= 1", "Multiply by One konsep: dua per dua dan tiga per tiga sama dengan satu");
  cek(frak(akhirAdegan(lk, 2), "pa") === "3/5" && frak(akhirAdegan(lk, 2), "pb") === "2/2" && frak(akhirAdegan(lk, 2), "pc") === "6/10", "Multiply by One konsep: tiga per lima dikali dua per dua menjadi enam per sepuluh");
  cek(frak(akhirAdegan(lk), "qa") === "3/5" && frak(akhirAdegan(lk), "qc") === "6/10" && isiTeks(akhirAdegan(lk), "t1") === "×2" && isiTeks(akhirAdegan(lk), "t2") === "×2", "Multiply by One konsep: pembilang dan penyebut sama-sama dikali dua");
  const lt = adegan(U, "luar-kali-terapan");
  cek(frak(akhirAdegan(lt, 0), "pa") === "1/3" && frak(akhirAdegan(lt, 0), "pq") === "?/12", "Kali Bentuk Satu terapan: satu per tiga menjadi per dua belas");
  cek(frak(akhirAdegan(lt, 1), "pq") === "4/12" && isiTeks(akhirAdegan(lt, 1), "t1") === "×4" && isiTeks(akhirAdegan(lt, 1), "t2") === "×4", "Kali Bentuk Satu terapan: dikali empat menjadi empat per dua belas");
  cek(ada(akhirAdegan(lt, 2), "ok") && isiTeks(akhirAdegan(lt, 2), "pb") === "penyebut baru", "Kali Bentuk Satu terapan: cocok untuk penyebut baru");
  cek(ada(akhirAdegan(lt), "xs") && frak(akhirAdegan(lt), "pw") === "4/3" && isiTeks(akhirAdegan(lt), "bb") === "besar berubah" && tidakAda(akhirAdegan(lt), "ok"), "Kali Bentuk Satu terapan: kurang cocok bila hanya pembilang dikali");
  const lb = adegan(U, "luar-bagi");
  cek(isiTeks(akhirAdegan(lb, 0), "nm") === "Divide Both" && isiTeks(akhirAdegan(lb, 0), "ni") === "Bagi Keduanya", "Divide Both konsep: judul");
  cek(frak(akhirAdegan(lb, 1), "pa") === "12/16" && isiTeks(akhirAdegan(lb, 1), "t1") === "÷4" && isiTeks(akhirAdegan(lb, 1), "t2") === "÷4", "Divide Both konsep: dua belas per enam belas dibagi empat");
  cek(frak(akhirAdegan(lb, 2), "pc") === "3/4" && ada(akhirAdegan(lb, 2), "ar"), "Divide Both konsep: hasil lebih sederhana tiga per empat");
  cek(frak(akhirAdegan(lb), "pd") === "3/4" && ada(akhirAdegan(lb), "st", "ok") && isiTeks(akhirAdegan(lb), "tb") === "tidak bisa dibagi lagi", "Divide Both konsep: berhenti bila tidak ada pembagi lagi");
  const bt = adegan(U, "luar-bagi-terapan");
  cek(frak(akhirAdegan(bt, 0), "pa") === "8/12" && isiTeks(akhirAdegan(bt, 0), "t1") === "÷4" && ada(akhirAdegan(bt, 0), "sa"), "Bagi Keduanya terapan: Satria membagi delapan per dua belas dengan empat");
  cek(frak(akhirAdegan(bt, 1), "pc") === "2/3" && isiTeks(akhirAdegan(bt, 1), "tb") === "tidak bisa dibagi lagi", "Bagi Keduanya terapan: dua per tiga tidak bisa dibagi lagi");
  cek(ada(akhirAdegan(bt, 2), "ok") && isiTeks(akhirAdegan(bt, 2), "jw") === "jawaban akhir", "Bagi Keduanya terapan: cocok untuk jawaban paling sederhana");
  cek(ada(akhirAdegan(bt), "xs", "tr") && isiTeks(akhirAdegan(bt), "tj") === "12 jadi 3", "Bagi Keduanya terapan: kurang cocok bila ingin penyebut besar");
  const rg = adegan(U, "luar-ringkas");
  cek(["r0-t0", "r1-t0", "r2-t0"].map((id) => isiTeks(akhirAdegan(rg, 0), id)).join("|") === "Cocokkan Daerah|Kali Bentuk Satu|Bagi Keduanya" && isiTeks(akhirAdegan(rg, 0), "n3") === "3 cara" && ada(akhirAdegan(rg, 0), "ks", "tq"), "ringkasan: tiga kartu cara dan Kak Sekar");
  cek(ketemu(akhirAdegan(rg, 1), "r1-k").sorot === true && ada(akhirAdegan(rg, 1), "ok1", "ok2") && tidakAda(akhirAdegan(rg, 1), "tq"), "ringkasan: Cocokkan Daerah lalu Kali Bentuk Satu");
  cek(ketemu(akhirAdegan(rg, 2), "r2-k").sorot === true && !ketemu(akhirAdegan(rg, 2), "r1-k").sorot && ada(akhirAdegan(rg, 2), "ok3"), "ringkasan: Bagi Keduanya");
  cek(frak(akhirAdegan(rg), "rq") === "10/15" && isiTeks(akhirAdegan(rg), "tq2") === "?" && ada(akhirAdegan(rg), "ks"), "ringkasan: pertanyaan menyederhanakan sepuluh per lima belas");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k4b2c-.*\.ts$/.test(f));
  cek(berkas.length === 8, `berkas story k4b2c (${berkas.length})`);
  for (const f of ["bantu", "gambar", "luar-1", "luar-2", "materi-1", "materi-2", "materi-3", "video"]) cek(berkas.includes(`k4b2c-${f}.ts`), `k4b2c-${f}.ts ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!/\\u\{1FA74\}|\\u\{1F39F\}|\\u\{2602\}|\\u\{1FA9F\}|\\u\{1FAA3\}/i.test(s) && ![...s].some((c) => [0x1fa74, 0x1f39f, 0x2602, 0x1fa9f, 0x1faa3].includes(c.codePointAt(0))), `${f}: tanpa emoji yang tampil kosong atau hitam`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s) && !/senilai/i.test(s) && !/\\u\{1F41F\}|\\u\{1F420\}|\\u\{1F421\}|\\u\{1F988\}|\\u\{1F42C\}|\\u\{1F38F\}/i.test(s) && ![...s].some((c) => [0x1f41f, 0x1f420, 0x1f421, 0x1f988, 0x1f42c, 0x1f38f].includes(c.codePointAt(0))), `${f}: tanpa kata buku, senilai, dan tanpa emoji ikan`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k4b2c-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k4b2c (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pbc = readFileSync(new URL("../src/components/modul/video-k4b2c.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K4B2C/.test(pbc) && /VIDEO_LUAR_K4B2C/.test(pbc) && /export function VideoK4B2C/.test(pbc) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pbc) && !/\r/.test(pbc) && !pbc.startsWith("﻿") && !/data-k4b2|video-k4b2-umum|naskah-k4b2/.test(pbc), "video-k4b2c.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
