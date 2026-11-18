// Uji Story Kelas 2 Bab 6 Sub-Bab B "Jadwal Lomba Bu Ratna" (waktu dan jam), akhir cerita Hari Olahraga Sekolah: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k2b6B.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k2b6B-video.ts");
const U1 = await import("../src/components/modul/story/k2b6B-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K2B6B, V.VIDEO_LUAR_K2B6B];
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




/* ------------------------------ Khusus Sub-Bab B Kelas 2 Bab 6 ------------------------------ */
const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
const M_VIDEO = V.VIDEO_MATERI_K2B6B;
const U = V.VIDEO_LUAR_K2B6B;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
const jarum = (objs, id) => ketemu(objs, id)?.rot;

/** Bilangan yang diucapkan (kata) sebagai angka: satuan, belasan, dan dua puluh empat; "nol" dihitung 0. */
const SATUAN = { nol: 0, satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
function bilanganSuara(s) {
  let t = s.toLowerCase().replace(/[.,?!:;]/g, " ");
  const hasil = [];
  t = t.replace(/\b(satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan) belas\b/g, (_, a) => {
    hasil.push(10 + SATUAN[a]);
    return " ";
  });
  t = t.replace(/\bdua puluh empat\b/g, () => {
    hasil.push(24);
    return " ";
  });
  for (const m of t.matchAll(/\b(nol|satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan)\b/g)) hasil.push(SATUAN[m[1]]);
  return hasil;
}
sama(bilanganSuara("Dua belas, lima belas, enam belas titik nol nol, dua puluh empat, satu, kedua, satuan."), [12, 15, 16, 24, 0, 0, 1], "pembaca bilangan suara");
const angkaTampak = (objs) => {
  const s = new Set();
  for (const o of objs) if (o.t === "teks" && (o.op ?? 1) > 0 && o.isi) for (const m of o.isi.matchAll(/\d+/g)) s.add(Number(m[0]));
  return s;
};
{
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Day Timeline|Hour Track|Duration Bars|Garis Waktu Hari|Jalur Jam|Batang Lama Kegiatan/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Day Timeline", "Hour Track", "Duration Bars"], ["Garis Waktu Hari", "Jalur Jam", "Batang Lama Kegiatan"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Jadwal Lomba Bu Ratna" && U.judul === M_VIDEO.judul && V.JUDUL_K2B6B === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k2b6B-materi" && U.id === "k2b6B-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,jam-lapangan,salah-jarum,pukul-tepat,digital,bagian-hari,urut-kegiatan,lama-sebentar,jarum-satu-jam,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-garis,luar-garis-terapan,luar-jalur,luar-jalur-terapan,luar-batang,luar-batang-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan)/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
  // Angka di gambar paling besar dua puluh empat.
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan)
      for (const [i] of a.ketukan.entries())
        for (const n of angkaTampak(L.keadaanStory(a, i, 9999))) cek(n <= 24, `${v.id}/${a.id}#${i + 1}: angka di gambar paling besar dua puluh empat (${n})`);
  // Bilangan yang diucapkan tampak sebagai angka di gambar pada ketukan itu. Sapaan bersama dikecualikan.
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan)
      if (a.id !== "sapaan")
        a.ketukan.forEach((kt, i) => {
          const terlihat = new Set();
          for (let p = -1; p < L.kataDari(kt.suara).length; p += 1) for (const n of angkaTampak(L.keadaanStory(a, i, p))) terlihat.add(n);
          for (const n of bilanganSuara(kt.suara)) cek(terlihat.has(n), `${v.id}/${a.id}#${i + 1}: bilangan ${n} yang diucapkan tampak sebagai angka`);
        });
  const semuaSuara = M_VIDEO.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [1, 2, 4, 6, 7, 9, 12, 15, 16, 24]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [1, 2, 3, 6, 8]) cek(bilanganSuara(semuaLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Chacha", "Dika", "Nia", "Bu Sari", "Bu Ratna", "jam besar", "jarum pendek", "jarum panjang", "pukul tepat", "jam digital", "dua puluh empat jam", "pagi", "siang", "sore", "malam", "lebih lama", "lebih sebentar", "lompat tali", "tarik tambang", "peluit"])
    cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/Igil/, /Kaka/, /Abang/, /Mamah/, /Pak Pos/i, /rumah rapi/i, /bibit/i, /kereta/i, /festival/i, /kardus/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /pustaka/i, /perpustakaan/i, /kantin/i, /koperasi/i, /seragam/i, /Bu Dewi/, /Pak Rudi/, /Pak Tono/, /ubin/i, /taman bermain/i, /puzzle/i, /gudang/i, /pameran/i, /manik/i, /Pak Hasan/, /Bu Mira/, /Pak Danu/, /Bu Wati/, /Pak Joko/, /semangka/i, /kebun/i, /martabak/i, /Pak Anton/, /neraca/i, /timbang/i])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/waktu dan jam/.test(sapa.ketukan[0].suara) && ["Membaca jam pukul tepat", "Pagi, siang, sore, dan malam", "Membandingkan lama kegiatan"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k2b6b.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  // Visual berubah mengikuti kata (paling sedikit dua titik waktu) pada hampir semua ketukan.
  let banyakTitik = 0;
  let total = 0;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) { total += 1; if (new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at))).size >= 2) banyakTitik += 1; }
  cek(banyakTitik / total >= 0.9, `visual berubah mengikuti kata pada sedikitnya 90 persen ketukan (${banyakTitik}/${total})`);
  // Gambar bukan hanya emoji: setiap adegan memuat bentuk gambar sendiri.
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") cek(akhirAdegan(a).some((o) => o.t !== "teks"), `${v.id}/${a.id}: gambar akhir memuat bentuk gambar sendiri, bukan hanya teks`);
}
{
  const sj = adegan(M_VIDEO, "salah-jarum");
  cek(jarum(akhirAdegan(sj, 0), "j-p") === 180 && jarum(akhirAdegan(sj, 0), "j-m") === 0, "salah jarum: jarum pendek di enam (180 derajat), jarum panjang di dua belas");
  cek(isiTeks(akhirAdegan(sj, 0), "pq-t0") === "pukul 12?" && isiTeks(akhirAdegan(sj, 1), "pq-t0") === "pukul 6!", "salah jarum: Chacha membaca pukul 12, Dika meluruskan pukul 6");
  cek(ada(akhirAdegan(sj, 2), "mt", "pj", "kr"), "salah jarum: matahari terbit, penjaga jatuh dari kursi");
  const pt = adegan(M_VIDEO, "pukul-tepat");
  cek(jarum(akhirAdegan(pt, 1), "j-p") === 210 && jarum(akhirAdegan(pt, 1), "j-m") === 0 && isiTeks(akhirAdegan(pt, 1), "p7-t0") === "pukul 7 tepat", "pukul tepat: jarum pendek di tujuh, panjang di dua belas");
  cek(ada(akhirAdegan(pt, 2), "tb", "tb-b", "an0", "an5") && ketemu(akhirAdegan(pt, 2), "tb-b").y === 52, "pukul tepat: bendera naik, anak berbaris");
  const dg = adegan(M_VIDEO, "digital");
  cek(isiTeks(akhirAdegan(dg, 1), "d1") === "07" && isiTeks(akhirAdegan(dg, 1), "d2") === "00", "digital: jam 07 dan menit 00 berwarna beda");
  cek(isiTeks(akhirAdegan(dg, 2), "dg-t") === "16.00" && jarum(akhirAdegan(dg, 2), "j-p") === 120 && isiTeks(akhirAdegan(dg, 2), "d24-t0") === "24 jam", "digital: pukul empat sore ditulis 16.00, 24 jam");
  const bh = adegan(M_VIDEO, "bagian-hari");
  cek(["bg0-n", "bg1-n", "bg2-n", "bg3-n"].map((id) => isiTeks(akhirAdegan(bh, 0), id)).join() === "pagi,siang,sore,malam", "bagian hari: empat bagian hari");
  cek(ada(akhirAdegan(bh, 1), "bs", "bl", "lm-k") && !ketemu(akhirAdegan(bh, 1), "mt"), "bagian hari: busur langit dan bulan malam");
  cek(isiTeks(akhirAdegan(bh, 2), "pa-t0") === "6 pagi" && isiTeks(akhirAdegan(bh, 2), "pb-t0") === "6 sore" && jarum(akhirAdegan(bh, 2), "ja-p") === 180 && jarum(akhirAdegan(bh, 2), "jb-p") === 180, "bagian hari: pukul enam pagi dan sore");
  const uk = adegan(M_VIDEO, "urut-kegiatan");
  sama(["r1", "r2", "r3", "r4", "r5"].map((id) => isiTeks(akhirAdegan(uk), `${id}-j`)), ["pukul 7 pagi", "pukul 9 pagi", "pukul 12 siang", "pukul 4 sore", "pukul 7 malam"], "urut kegiatan: lima jam jadwal");
  const ls = adegan(M_VIDEO, "lama-sebentar");
  cek(ketemu(akhirAdegan(ls, 1), "b1").w < ketemu(akhirAdegan(ls, 1), "b2").w && isiTeks(akhirAdegan(ls, 1), "b1-t") === "15 menit" && isiTeks(akhirAdegan(ls, 1), "b2-t") === "1 jam", "lama sebentar: batang 15 menit lebih pendek daripada 1 jam");
  const js = adegan(M_VIDEO, "jarum-satu-jam");
  cek(jarum(akhirAdegan(js, 1), "ja-p") === 120 && jarum(akhirAdegan(js, 1), "jb-p") === 150 && isiTeks(akhirAdegan(js, 1), "sj-t0") === "1 jam", "jarum satu jam: dari empat ke lima, 1 jam");
  const pn = adegan(M_VIDEO, "penutup");
  cek(ada(akhirAdegan(pn, 2), "ch", "dk", "ni", "bs", "br", "pi", "pl", "lp1", "lp2", "j-h") && jarum(akhirAdegan(pn, 2), "j-p") === 210 && isiTeks(akhirAdegan(pn, 2), "p7-t0") === "pukul 7 malam", "penutup: lima tokoh, piala, peluit, lampu lapangan, jam pukul 7 malam");
  // Metode global.
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "j-w", "dk", "c0-k", "c1-k", "c2-k") && isiTeks(akhirAdegan(op, 0), "n3") === "3 kartu", "global pembuka: Dika di balik jam menemukan tiga kartu tua");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Day Timeline", "2. Hour Track", "3. Duration Bars"], "global pembuka: tiga nama metode");
  sama(["q0", "q1", "q2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Garis Waktu Hari", "Jalur Jam", "Batang Lama Kegiatan"], "global pembuka: tiga nama bahasa Indonesia");
  const g = adegan(U, "luar-garis");
  cek(isiTeks(akhirAdegan(g, 0), "nm-t0") === "Day Timeline" && ada(akhirAdegan(g, 1), "rs0", "rs3", "nh0", "nh3") && ada(akhirAdegan(g, 3), "aw", "ak", "pk", "pr"), "Garis konsep: nama, empat ruas bagian hari, kiri awal dan kanan akhir");
  const gt = adegan(U, "luar-garis-terapan");
  cek(ada(akhirAdegan(gt, 0), "ni", "g0-k", "g1-k", "g2-k") && ada(akhirAdegan(gt, 3), "p0", "p1", "x1") && isiTeks(akhirAdegan(gt, 3), "n2") === "2 kegiatan", "Garis terapan: Nia menaruh tiga lomba, dua kegiatan berdekatan sempit");
  const j = adegan(U, "luar-jalur");
  cek(isiTeks(akhirAdegan(j, 0), "nm-t0") === "Hour Track" && ada(akhirAdegan(j, 1), "jk0", "jk5") && isiTeks(akhirAdegan(j, 1), "t2") === "= 1 jam", "Jalur konsep: satu kotak satu jam");
  cek(ketemu(akhirAdegan(j, 2), "jk3").warna === "#FFC800" && isiTeks(akhirAdegan(j, 3), "lk-t0") === "lama: 4 jam", "Jalur konsep: hitung kotak sampai selesai");
  const jt = adegan(U, "luar-jalur-terapan");
  cek(["k6", "k7", "k8", "k9"].map((id) => isiTeks(akhirAdegan(jt, 0), id)).join() === "6,7,8,9" && ketemu(akhirAdegan(jt, 0), "jt1").warna === "#FFC800" && ketemu(akhirAdegan(jt, 0), "jt2").warna !== "#FFC800", "Jalur terapan: senam pukul 6 sampai 8, dua kotak diwarnai");
  cek(isiTeks(akhirAdegan(jt, 1), "sp-t0") === "senam: 2 jam" && isiTeks(akhirAdegan(jt, 1), "b2") === "2", "Jalur terapan: dua jam, angka 2");
  const b = adegan(U, "luar-batang");
  cek(isiTeks(akhirAdegan(b, 0), "nm-t0") === "Duration Bars" && ketemu(akhirAdegan(b, 2), "b1").w < ketemu(akhirAdegan(b, 2), "b2").w && ada(akhirAdegan(b, 3), "kp-k", "kl-k"), "Batang konsep: nama, batang pendek dan panjang, lebih lama");
  const bt = adegan(U, "luar-batang-terapan");
  cek(ketemu(akhirAdegan(bt, 0), "q2").w > ketemu(akhirAdegan(bt, 0), "q1").w && ketemu(akhirAdegan(bt, 0), "q1").w > ketemu(akhirAdegan(bt, 0), "q3").w && ada(akhirAdegan(bt, 3), "j-w", "tq", "x1"), "Batang terapan: senam paling panjang, batang tidak memuat jam");
  const rk = adegan(U, "luar-ringkas");
  cek(["r0-t0", "r1-t0", "r2-t0"].map((id) => isiTeks(akhirAdegan(rk, 0), id)).join() === U1.NAMA_METODE_ID.map((m, i) => `${i + 1}. ${m}`).join() && isiTeks(akhirAdegan(rk, 0), "t3") === "3 cara", "ringkasan: tiga metode");
  cek(ada(akhirAdegan(rk, 3), "pp", "ct", "e0", "e1", "e2", "g0", "g2"), "ringkasan: pertanyaan jadwal belajar di rumah");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k2b6B-.*\.ts$/.test(f));
  cek(berkas.length >= 8, `berkas story k2b6B (${berkas.length})`);
  cek(!berkas.includes("k2b6B-materi-4.ts") && !berkas.includes("k2b6B-materi-5.ts"), "k2b6B-materi-4.ts dan materi-5.ts sudah dihapus");
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s), `${f}: tanpa kata buku`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k2b6B-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k2b6B (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k2b6b.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K2B6B/.test(pb) && /VIDEO_LUAR_K2B6B/.test(pb) && /export function VideoK2B6B/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿"), "video-k2b6b.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
