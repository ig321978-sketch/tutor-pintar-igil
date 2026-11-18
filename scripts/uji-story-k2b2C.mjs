// Uji Story Kelas 2 Bab 2 Sub-Bab C "Pesanan Besar Pak Budi" (cerita hitungan penjumlahan dan pengurangan), akhir cerita Toko Seragam dan Alat Tulis Sekolah: video materi dan video metode global.
// Bagian umum sama dengan uji Kelas 2 Bab 1; bagian khusus memeriksa pesanan besar, salah langkah menjumlahkan padahal kurangnya, empat langkah, jumlah dan selisih,
// tiga bilangan, bilangan awal, cerita buatan Nia, pembukaan koperasi, penutup, bilangan sampai dua puluh yang diucapkan tampak sebagai angka,
// naskah suara tetap, dan tiga metode global (Part-Part-Whole, Act It Out, Work Backwards).
// Jalankan: node --no-warnings scripts/uji-story-k2b2C.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k2b2C-video.ts");
const U1 = await import("../src/components/modul/story/k2b2C-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K2B2C, V.VIDEO_LUAR_K2B2C];
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

/* ------------------------------ Khusus Sub-Bab C Bab 2 Kelas 2 ------------------------------ */
const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
const M_VIDEO = V.VIDEO_MATERI_K2B2C;
const U = V.VIDEO_LUAR_K2B2C;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
const tidakAda = (objs, ...ids) => ids.every((id) => !ketemu(objs, id));
const sorot = (objs, ...ids) => ids.every((id) => ketemu(objs, id)?.sorot);
const rangkai = (objs, awalan, n) => Array.from({ length: n }, (_, i) => isiTeks(objs, `${awalan}${i}`)).join(" ");
const jumlahDengan = (objs, awalan) => objs.filter((o) => new RegExp(`^${awalan}\\d+$`).test(o.id)).length;

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
sama(bilanganSuara("Dua puluh, sembilan belas, enam belas, sebelas, sepuluh, dua belas, satu bagian, kedua, satuannya, tujuh belas."), [20, 19, 16, 11, 10, 12, 1, 17], "pembaca bilangan suara sampai dua puluh");
{
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Part-Part-Whole|Act It Out|Work Backwards|Bagian dan Utuh|Peragakan Cerita|Berpikir Mundur/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Part-Part-Whole", "Act It Out", "Work Backwards"], ["Bagian dan Utuh", "Peragakan Cerita", "Berpikir Mundur"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Pesanan Besar Pak Budi" && U.judul === M_VIDEO.judul && V.JUDUL_K2B2C === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k2b2C-materi" && U.id === "k2b2C-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,pesanan-besar,terlalu-cepat,empat-langkah,selisih-jumlah,tiga-bilangan,bilangan-awal,cerita-nia,pembukaan,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-bagian,luar-bagian-terapan,luar-peragakan,luar-peragakan-terapan,luar-mundur,luar-mundur-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46) && U.adegan.every((a) => /Metode global|Ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  const TERLARANG = /\b(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|bernilai|soal|tebak|kunci|latihan)\b/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)) && !/buku|kelompok|bernilai/i.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
  // Angka di gambar paling besar dua puluh.
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan)
      for (const [i] of a.ketukan.entries())
        for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 20, `${v.id}/${a.id}#${i + 1}: angka paling besar dua puluh ("${t}")`);
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
  cek(bilDiucap >= 40, `banyak bilangan diucapkan yang diperiksa (${bilDiucap})`);
  const semuaSuara = M_VIDEO.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [3, 4, 6, 7, 8, 9, 11, 12, 15, 16, 17, 20]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  for (const kata of ["Chacha", "Dika", "Nia", "Bu Sari", "Pak Budi", "kepala sekolah", "koperasi", "kurangnya", "lebihnya", "selisih", "jumlah", "diketahui", "ditanya", "solusi", "kesimpulan", "mula-mula", "kata petunjuk", "cerita hitungan", "lencana", "pita"])
    cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/\bIgil\b/, /Kaka/, /Abang/, /Mamah/, /Malosi/i, /Pak Pos/i, /kebun/i, /bibit/i, /kereta/i, /festival/i, /kardus/i, /akuarium/i, /lapak/i, /rumah pohon/i, /Kakek Jaya/i, /mainan/i, /pustaka/i, /Pak Anto/, /peluit/i, /lomba/i, /kantin/i, /etalase/i, /kotak kue/i, /karcis/i, /Pesta Kue/i, /Pak Ujang/, /Bu Rina/, /Bu Dewi/, /jambu/i, /donat/i, /burung/i])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lain ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/cerita hitungan penjumlahan dan pengurangan/.test(sapa.ketukan[0].suara) && ["Membaca kata petunjuk dalam cerita", "Menulis diketahui, ditanya, solusi, dan kesimpulan", "Mencari bilangan awal dan membuat cerita sendiri"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k2b2c.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  for (const a of M_VIDEO.adegan) if (a.id !== "sapaan") cek(a.ketukan.length === 3, `materi/${a.id}: tiga ketukan`);
  for (const a of U.adegan) if (a.id !== "sapaan") cek(a.ketukan.length === 4, `global/${a.id}: empat ketukan`);
  let banyakTitik = 0;
  let total = 0;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) { total += 1; if (new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at))).size >= 2) banyakTitik += 1; }
  cek(banyakTitik / total >= 0.9, `visual berubah mengikuti kata pada sedikitnya 90 persen ketukan (${banyakTitik}/${total})`);
}
{
  // 1. Pesanan besar.
  const p = adegan(M_VIDEO, "pesanan-besar");
  const p0 = akhirAdegan(p, 0);
  cek(ada(p0, "rk", "bd", "bd-pc", "ks", "pt", "bp") && isiTeks(p0, "rk-n") === "rak alat tulis" && ada(p0, "pn0", "pn3", "pg0", "pg2"), "pesanan besar: Pak Budi berpeci menyerahkan kertas pesanan, rak alat tulis, pita belum terpasang");
  const p1 = akhirAdegan(p, 1);
  cek(ada(p1, "sr", "sr-ap", "ch", "dk", "ni", "ni-tp", "kc") && sorot(p1, "ks"), "pesanan besar: Bu Sari, Chacha, Dika, dan Nia mengerumuni kertas pesanan");
  const p2 = akhirAdegan(p);
  cek(ada(p2, "sl", "hd0", "hd1", "sd", "tc-k") && isiTeks(p2, "tc-t0") === "hadiah tidak cukup" && tidakAda(p2, "pn0", "pg0", "kc"), "pesanan besar: salah hitung, hadiah tidak cukup");
  // 2. Terlalu cepat.
  const t = adegan(M_VIDEO, "terlalu-cepat");
  const t0 = akhirAdegan(t, 0);
  cek(jumlahDengan(t0, "pn") === 12 && isiTeks(t0, "pn-n") === "pensil: 12" && isiTeks(t0, "kr-t0") === "4 kurangnya" && sorot(t0, "kr-k") && isiTeks(t0, "pg-n") === "penggaris: ?", "terlalu cepat: pensil 12, penggaris 4 kurangnya, penggaris ditanyakan");
  const t1 = akhirAdegan(t, 1);
  cek(rangkai(t1, "sm", 5) === "12 + 4 = 16" && 12 + 4 === 16 && isiTeks(t1, "pg-n") === "penggaris: 16" && ada(t1, "ch", "ss"), "terlalu cepat: Chacha menjumlahkan 12 + 4 = 16 dengan tanda seru");
  const t2 = akhirAdegan(t);
  cek(ada(t2, "dk", "x1", "x2") && sorot(t2, "kr-k") && isiTeks(t2, "pg-n") === "penggaris: lebih sedikit" && tidakAda(t2, "ss"), "terlalu cepat: Dika menggeleng, kurangnya berarti lebih sedikit");
  // 3. Empat langkah.
  const l = adegan(M_VIDEO, "empat-langkah");
  const l0 = akhirAdegan(l, 0);
  cek(["l0-n", "l1-n", "l2-n", "l3-n"].map((id) => isiTeks(l0, id)).join() === "Diketahui,Ditanya,Solusi,Kesimpulan" && isiTeks(l0, "n4") === "4 langkah di kartu" && ada(l0, "dk"), "empat langkah: empat kartu dengan nama langkah berurutan");
  const l1 = akhirAdegan(l, 1);
  cek(isiTeks(l1, "l0-i") === "pensil 12, penggaris kurang 4" && isiTeks(l1, "l1-i") === "banyak penggaris?" && isiTeks(l1, "l2-i") === "12 − 4 = 8" && 12 - 4 === 8, "empat langkah: diketahui, ditanya, solusi 12 - 4 = 8");
  const l2 = akhirAdegan(l);
  cek(isiTeks(l2, "l3-i") === "penggaris ada 8" && ada(l2, "ok", "jm") && sorot(l2, "l3-k"), "empat langkah: kesimpulan penggaris ada 8 dan centang");
  // 4. Jumlah dan selisih.
  const s = adegan(M_VIDEO, "selisih-jumlah");
  const s0 = akhirAdegan(s, 0);
  cek(isiTeks(s0, "kj-t0") === "JUMLAH +" && isiTeks(s0, "ks-t0") === "SELISIH −" && ada(s0, "sr", "pe", "pi"), "jumlah dan selisih: dua kartu kata, Bu Sari bertanya");
  const s1 = akhirAdegan(s, 1);
  cek(rangkai(s1, "kj", 5) === "12 + 8 = 20" && 12 + 8 === 20 && ada(s1, "pa1", "pa2") && sorot(s1, "kj-k"), "jumlah dan selisih: 12 + 8 = 20, digabung");
  const s2 = akhirAdegan(s);
  cek(rangkai(s2, "ks", 5) === "12 − 8 = 4" && 12 - 8 === 4 && isiTeks(s2, "bd-t0") === "beda banyaknya" && sorot(s2, "ks-k") && tidakAda(s2, "kj0", "pa1"), "jumlah dan selisih: 12 - 8 = 4, beda banyaknya");
  // 5. Tiga bilangan.
  const b = adegan(M_VIDEO, "tiga-bilangan");
  const b0 = akhirAdegan(b, 0);
  cek(jumlahDengan(b0, "hp") === 7 && jumlahDengan(b0, "rt") === 4 && jumlahDengan(b0, "pw") === 6 && isiTeks(b0, "hp-n") === "penghapus 7" && isiTeks(b0, "rt-n") === "rautan 4" && isiTeks(b0, "pw-n") === "pensil warna 6", "tiga bilangan: penghapus 7, rautan 4, pensil warna 6");
  const b2 = akhirAdegan(b, 1);
  cek(rangkai(b2, "e", 5) === "7 + 4 = 11" && rangkai(b2, "g", 5) === "11 + 6 = 17" && 7 + 4 === 11 && 11 + 6 === 17 && 7 + 4 + 6 === 17 && isiTeks(b2, "d2") === "2 bilangan dulu" && ada(b2, "ni", "ni-tp"), "tiga bilangan: dua bilangan dulu, 7 + 4 = 11 lalu 11 + 6 = 17");
  const b3 = akhirAdegan(b);
  cek(sorot(b3, "g4") && ada(b3, "jm", "bk") && isiTeks(b3, "pm-t0") === "mulai dari yang mudah", "tiga bilangan: jumlah semuanya 17, mulai dari yang mudah");
  // 6. Bilangan awal.
  const a = adegan(M_VIDEO, "bilangan-awal");
  const a0 = akhirAdegan(a, 0);
  cek(jumlahDengan(a0, "pg") === 9 && jumlahDengan(a0, "gh") === 6 && ketemu(a0, "gh0").op === 0.4 && isiTeks(a0, "tg-n") === "tinggal 9" && isiTeks(a0, "tj-n") === "terjual 6" && isiTeks(a0, "aw") === "mula-mula = ?" && ada(a0, "bd"), "bilangan awal: rak tinggal 9, terjual 6, mula-mula ditanyakan");
  const a1 = akhirAdegan(a, 1);
  cek([0, 1, 2, 3, 4, 5].every((i) => ketemu(a1, `gh${i}`).op === 1 && ketemu(a1, `gh${i}`).y > 80) && rangkai(a1, "kk", 3) === "9 + 6" && ada(a1, "ch", "dk", "pb"), "bilangan awal: enam penggaris dikembalikan ke rak, 9 + 6");
  const a2 = akhirAdegan(a);
  cek(rangkai(a2, "kk", 5) === "9 + 6 = 15" && 9 + 6 === 15 && isiTeks(a2, "aw") === "mula-mula = 15" && ada(a2, "ok") && tidakAda(a2, "pb"), "bilangan awal: 9 + 6 = 15, mula-mula 15");
  // 7. Cerita Nia.
  const n = adegan(M_VIDEO, "cerita-nia");
  const n0 = akhirAdegan(n, 0);
  cek(ada(n0, "ni", "ni-tp", "kt", "rk") && isiTeks(n0, "jc") === "cerita hitungan Nia", "cerita Nia: Nia menggambar rak di kertas tulis");
  const n1 = akhirAdegan(n, 1);
  cek(jumlahDengan(n1, "rt") === 8 && jumlahDengan(n1, "hp") === 3 && isiTeks(n1, "rt-n") === "rautan 8" && isiTeks(n1, "hp-n") === "penghapus 3" && sorot(n1, "lb") && isiTeks(n1, "lb") === "lebihnya" && ada(n1, "tn"), "cerita Nia: rautan 8, penghapus 3 lebihnya");
  const n2 = akhirAdegan(n);
  cek(rangkai(n2, "kn", 5) === "8 + 3 = 11" && 8 + 3 === 11 && ada(n2, "ch", "jm") && tidakAda(n2, "tn"), "cerita Nia: Chacha menjawab 8 + 3 = 11 dan membaca kata petunjuk");
  // 8. Pembukaan.
  const m = adegan(M_VIDEO, "pembukaan");
  const m0 = akhirAdegan(m, 0);
  cek(ada(m0, "pn", "pa", "pb", "bd", "bd-pc", "gt", "sp", "kf0", "kf1") && tidakAda(m0, "pt") && isiTeks(m0, "sp-t") === "Koperasi Dibuka", "pembukaan: pita digunting, spanduk Koperasi Dibuka dan konfeti");
  const m1 = akhirAdegan(m, 1);
  cek(ada(m1, "lk-k", "ok", "ak0", "ak1", "ak2", "tp", "pe"), "pembukaan: pesanan lengkap dan pas, anak mendapat topi dan pensil");
  const m2 = akhirAdegan(m);
  cek(ada(m2, "ch", "dk", "ni", "ni-tp", "lc0", "lc1", "lc2", "tw") && ketemu(m2, "lc0").rot === 180 && !ketemu(m2, "lc1").rot && tidakAda(m2, "bd", "ak0"), "pembukaan: tiga tokoh berlencana, lencana Chacha terbalik");
  // 9. Penutup.
  const z = adegan(M_VIDEO, "penutup");
  const z0 = akhirAdegan(z, 0);
  cek(ada(z0, "sr", "sr-ap", "sy", "sp", "tk", "ak0", "ak2") && isiTeks(z0, "sp-t") === "Koperasi Sekolah", "penutup: koperasi berhias, Bu Sari tersenyum");
  cek(["r1-t0", "r2-t0", "r3-t0", "r4-t0"].map((id) => isiTeks(akhirAdegan(z, 1), id)).join() === "1. Baca pelan-pelan,2. Tulis diketahui, ditanya,3. Pilih tambah atau kurang,4. Simpulkan", "penutup: ringkasan empat langkah");
  const z2 = akhirAdegan(z);
  cek(isiTeks(z2, "pt-t0") === "selisih: tambah atau kurang?" && ada(z2, "ch", "dk", "ni", "sr", "tn", "lb") && tidakAda(z2, "r1-k"), "penutup: pertanyaan kata selisih, empat tokoh");
}
{
  // Pembuka metode global.
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "bd", "kk", "kr0", "kr1", "kr2", "tk") && isiTeks(akhirAdegan(op, 0), "n3") === "3 kartu", "global pembuka: Pak Budi membawa kotak berisi tiga kartu");
  cek(ada(akhirAdegan(op, 1), "pk", "sr", "ct-k", "bg"), "global pembuka: kartu dipakai penjaga koperasi untuk cerita hitungan");
  sama(["m0-t0", "m1-t0", "m2-t0"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Part-Part-Whole", "2. Act It Out", "3. Work Backwards"], "global pembuka: tiga nama metode");
  sama(["n0-t0", "n1-t0", "n2-t0"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["1. Bagian dan Utuh", "2. Peragakan Cerita", "3. Berpikir Mundur"], "global pembuka: tiga nama bahasa Indonesia");
  // Part-Part-Whole.
  const g = adegan(U, "luar-bagian");
  const g0 = akhirAdegan(g, 0);
  cek(ada(g0, "bu-ga", "bu-gb", "bu-u", "bu-a", "bu-b", "bu-tu", "bu-ta", "bu-tb") && isiTeks(g0, "bu-tu") === "utuh" && isiTeks(g0, "bu-ta") === "bagian" && isiTeks(g0, "hd-t0") === "Part-Part-Whole · Bagian dan Utuh", "Part-Part-Whole: tiga lingkaran utuh dan dua bagian");
  const g1 = akhirAdegan(g, 1);
  cek(isiTeks(g1, "d2") === "2 bagian" && isiTeks(g1, "d1") === "1 utuh" && ada(g1, "pa", "pb") && sorot(g1, "bu-u"), "Part-Part-Whole: dua bagian digabung membentuk satu utuh");
  const g2 = akhirAdegan(g, 2);
  cek(isiTeks(g2, "bu-ta") === "?" && isiTeks(g2, "kp-t0") === "cari utuh: tambah" && isiTeks(g2, "kq-t0") === "cari bagian: kurang" && isiTeks(g2, "s1") === "1 bagian dicari", "Part-Part-Whole: cari utuh tambah, cari bagian kurang");
  cek(isiTeks(akhirAdegan(g), "t3") === "3 lingkaran" && sorot(akhirAdegan(g), "bu-u") && !sorot(akhirAdegan(g), "bu-a"), "Part-Part-Whole: tiga lingkaran, bagian dan utuh");
  const gt = adegan(U, "luar-bagian-terapan");
  const gt0 = akhirAdegan(gt, 0);
  cek(isiTeks(gt0, "tu-tu") === "14" && isiTeks(gt0, "tu-ta") === "5" && isiTeks(gt0, "tu-tb") === "?" && isiTeks(gt0, "t3") === "3 lingkaran" && isiTeks(gt0, "s1") === "1 bagian" && ada(gt0, "ni", "sm"), "Part-Part-Whole terapan: utuh 14, bagian 5 pensil merah, bagian lain ditanyakan");
  const gt1 = akhirAdegan(gt, 1);
  cek(rangkai(gt1, "kt", 5) === "14 − 5 = 9" && 14 - 5 === 9 && isiTeks(gt1, "tu-tb") === "9" && ada(gt1, "sb") && sorot(gt1, "tu-b"), "Part-Part-Whole terapan: 14 - 5 = 9 pensil biru");
  cek(isiTeks(akhirAdegan(gt, 2), "cc-t0") === "cocok: bagian dari 1 kumpulan" && ada(akhirAdegan(gt, 2), "ck"), "Part-Part-Whole terapan: cocok bila bagian dari satu kumpulan");
  cek(isiTeks(akhirAdegan(gt), "kc-t0") === "kurang cocok: 2 orang, tanpa 1 utuh" && ada(akhirAdegan(gt), "o1", "o2", "sl") && tidakAda(akhirAdegan(gt), "cc-k"), "Part-Part-Whole terapan: kurang cocok bila membandingkan dua orang");
  // Act It Out.
  const pr = adegan(U, "luar-peragakan");
  cek(isiTeks(akhirAdegan(pr, 0), "ac-t0") === "Act It Out" && isiTeks(akhirAdegan(pr, 0), "pc-t0") === "Peragakan Cerita" && ada(akhirAdegan(pr, 0), "tp"), "Act It Out: dua nama dan tepuk");
  cek(ada(akhirAdegan(pr, 1), "ch", "tt", "mj", "ps0", "ps1", "ps2", "tg", "pg", "kc", "bt"), "Act It Out: memerankan cerita dengan benda dan gerakan");
  cek(ada(akhirAdegan(pr, 2), "ps3", "ps4", "pi", "pu", "sc-k") && tidakAda(akhirAdegan(pr, 2), "ps0", "tg"), "Act It Out: benda ditambahkan dan diambil");
  cek(ada(akhirAdegan(pr), "lm", "ok") && tidakAda(akhirAdegan(pr), "mk", "kc"), "Act It Out: cerita yang bingung jadi jelas");
  const pt = adegan(U, "luar-peragakan-terapan");
  const pt0 = akhirAdegan(pt, 0);
  cek(jumlahDengan(pt0, "hp") === 7 && jumlahDengan(pt0, "gh") === 6 && ketemu(pt0, "gh0").op === 0.5 && isiTeks(pt0, "a7") === "7 penghapus" && isiTeks(pt0, "a6") === "6 lagi" && ada(pt0, "ch", "mj"), "Act It Out terapan: tujuh penghapus di meja, datang enam lagi");
  const pt1 = akhirAdegan(pt, 1);
  cek([0, 1, 2, 3, 4, 5].every((i) => ketemu(pt1, `gh${i}`).op === 1 && ketemu(pt1, `gh${i}`).y === 100) && isiTeks(pt1, "tt") === "7 + 6 = 13" && 7 + 6 === 13 && tidakAda(pt1, "a7"), "Act It Out terapan: enam digeser ke meja, 7 + 6 = 13");
  cek(isiTeks(akhirAdegan(pt, 2), "cc-t0") === "cocok: bilangan kecil, benda mudah dipegang" && isiTeks(akhirAdegan(pt), "kc-t0") === "kurang cocok: bilangan besar" && ada(akhirAdegan(pt), "ps", "mw"), "Act It Out terapan: cocok bila kecil, kurang cocok bila besar");
  // Work Backwards.
  const mu = adegan(U, "luar-mundur");
  cek(isiTeks(akhirAdegan(mu, 0), "wb-t0") === "Work Backwards" && isiTeks(akhirAdegan(mu, 0), "bm-t0") === "Berpikir Mundur" && ada(akhirAdegan(mu, 0), "pm", "mu"), "Work Backwards: dua nama dan panah mundur");
  cek(ada(akhirAdegan(mu, 1), "aw-k", "ak-k", "pf", "pb") && isiTeks(akhirAdegan(mu, 1), "sp") === "1 per 1", "Work Backwards: dari hasil akhir membalik satu per satu");
  cek(isiTeks(akhirAdegan(mu, 2), "t1-t0") === "tadi ditambah → kurangi" && isiTeks(akhirAdegan(mu, 2), "t2-t0") === "tadi dikurangi → tambah", "Work Backwards: ditambah jadi kurangi, dikurangi jadi tambah");
  cek(isiTeks(akhirAdegan(mu), "hk-t0") === "hasil akhir" && isiTeks(akhirAdegan(mu), "ba-t0") === "bilangan awal" && sorot(akhirAdegan(mu), "ba-k") && ada(akhirAdegan(mu), "kc"), "Work Backwards: hasil akhir adalah bilangan awal");
  const mt = adegan(U, "luar-mundur-terapan");
  const mt0 = akhirAdegan(mt, 0);
  cek(jumlahDengan(mt0, "rt") === 12 && jumlahDengan(mt0, "gh") === 5 && isiTeks(mt0, "tg-n") === "tinggal 12" && isiTeks(mt0, "tj-n") === "terjual 5" && ada(mt0, "dk", "rk"), "Work Backwards terapan: rak tinggal 12 rautan, terjual 5");
  const mt1 = akhirAdegan(mt, 1);
  cek([0, 1, 2, 3, 4].every((i) => ketemu(mt1, `gh${i}`).op === 1 && ketemu(mt1, `gh${i}-x`).op === 1) && rangkai(mt1, "kr", 5) === "12 + 5 = 17" && 12 + 5 === 17 && ada(mt1, "pb"), "Work Backwards terapan: lima rautan kembali ke rak, 12 + 5 = 17");
  cek(isiTeks(akhirAdegan(mt, 2), "aw") === "mula-mula = 17" && ada(akhirAdegan(mt, 2), "ok"), "Work Backwards terapan: mula-mula 17");
  cek(isiTeks(akhirAdegan(mt), "c1-t0") === "cocok: cari bilangan awal" && isiTeks(akhirAdegan(mt), "c2-t0") === "kurang cocok: cari hasil akhir" && ada(akhirAdegan(mt), "k1", "k2"), "Work Backwards terapan: cocok untuk bilangan awal, kurang cocok untuk hasil akhir");
  // Ringkasan.
  const rk = adegan(U, "luar-ringkas");
  cek(["r0-t0", "r1-t0", "r2-t0"].map((id) => isiTeks(akhirAdegan(rk, 0), id)).join() === U1.NAMA_METODE.map((m, i) => `${i + 1}. ${m} · ${U1.NAMA_METODE_ID[i]}`).join(), "ringkasan: tiga metode");
  cek(["qb0-t0", "qb1-t0", "qb2-t0"].map((id) => isiTeks(akhirAdegan(rk, 1), id)).join() === "pakai Bagian dan Utuh,pakai Peragakan Cerita,pakai Berpikir Mundur" && ["qa0-t0", "qa1-t0", "qa2-t0"].map((id) => isiTeks(akhirAdegan(rk, 1), id)).join() === "ada bagian dan utuh,benda mudah dipegang,dicari bilangan awal", "ringkasan: pilih cara menurut keadaan cerita");
  cek(isiTeks(akhirAdegan(rk, 2), "bc-t0") === "baca ceritanya pelan-pelan" && isiTeks(akhirAdegan(rk, 2), "pr-t0") === "periksa hasilnya" && ada(akhirAdegan(rk, 2), "kc"), "ringkasan: apa pun caranya baca pelan-pelan dan periksa hasil");
  const rk3 = akhirAdegan(rk);
  cek(jumlahDengan(rk3, "hp") === 10 && jumlahDengan(rk3, "gh") === 3 && isiTeks(rk3, "tg") === "tinggal 10" && isiTeks(rk3, "tj") === "terjual 3" && ada(rk3, "pc0-k", "pc2-k", "tn"), "ringkasan: pertanyaan tinggal 10 terjual 3, tiga pilihan cara");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k2b2C-.*\.ts$/.test(f));
  cek(berkas.length >= 8, `berkas story k2b2C (${berkas.length})`);
  cek(!berkas.includes("k2b2C-materi-4.ts") && !berkas.includes("k2b2C-materi-5.ts"), "k2b2C-materi-4.ts dan materi-5.ts sudah dihapus");
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s), `${f}: tanpa kata buku`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k1b1a-[a-z0-9-]+|k1b4a-gambar|k2b2C-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, k1b1a, k1b4a-gambar, atau k2b2C (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95 tanpa ZWJ`);
  const pb = readFileSync(new URL("../src/components/modul/video-k2b2c.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K2B2C/.test(pb) && /VIDEO_LUAR_K2B2C/.test(pb) && /export function VideoK2B2C/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿"), "video-k2b2c.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
