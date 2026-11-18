// Uji Story Kelas 2 Bab 2 Sub-Bab A "Kiriman dari Gudang" (penjumlahan sampai dua puluh), awal cerita Toko Seragam dan Alat Tulis Sekolah: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k2b2a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k2b2A-video.ts");
const U1 = await import("../src/components/modul/story/k2b2A-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K2B2A, V.VIDEO_LUAR_K2B2A];
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


/* ------------------------------ Khusus Sub-Bab A Kelas 2 Bab 2 ------------------------------ */
const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
const M_VIDEO = V.VIDEO_MATERI_K2B2A;
const U = V.VIDEO_LUAR_K2B2A;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
const tidakAda = (objs, ...ids) => ids.every((id) => !ketemu(objs, id));
const sorot = (objs, ...ids) => ids.every((id) => ketemu(objs, id)?.sorot);
const jumlahId = (objs, pola) => objs.filter((o) => pola.test(o.id)).length;

const SATUAN = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
const POLA_BIL = /\b(?:dua puluh|sebelas|sepuluh|(?:satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan) belas|satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan)\b/g;
const nilaiBil = (m) => {
  const t = m[0];
  if (t === "dua puluh") return 20;
  if (t === "sebelas") return 11;
  if (t === "sepuluh") return 10;
  if (t.endsWith(" belas")) return 10 + SATUAN[t.split(" ")[0]];
  return SATUAN[t];
};
const bilanganSuara = (s) => [...s.toLowerCase().matchAll(POLA_BIL)].map(nilaiBil);
sama(bilanganSuara("Dua belas, sebelas, sepuluh dan satu, kedua, keduanya, satuannya, berdua."), [12, 11, 10, 1], "pembaca bilangan suara (belasan)");
sama(bilanganSuara("Dua puluh baju, tiga belas ditambah lima, sembilan belas, puluhan."), [20, 13, 5, 19], "pembaca bilangan suara sampai dua puluh");
{
  const materi = JSON.stringify(M_VIDEO.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Make a Ten|Doubles Plus One|Round and Adjust|Membuat Sepuluh|Kembar Tambah Satu|Bulatkan Lalu Sesuaikan/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Make a Ten", "Doubles Plus One", "Round and Adjust"], ["Membuat Sepuluh", "Kembar Tambah Satu", "Bulatkan Lalu Sesuaikan"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M_VIDEO.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M_VIDEO.judul === "Kiriman dari Gudang" && U.judul === M_VIDEO.judul && V.JUDUL_K2B2A === M_VIDEO.judul, "judul dan subjudul");
  cek(M_VIDEO.id === "k2b2A-materi" && U.id === "k2b2A-luar" && M_VIDEO.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,kardus-datang,hitung-dari-awal,maju,pasangan,bersusun,baju-olahraga,tukar-sepuluh,gantungan-pas,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-sepuluh,luar-sepuluh-terapan,luar-kembar,luar-kembar-terapan,luar-bulat,luar-bulat-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 56) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 56), "label sumber");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan)/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa kata terlarang`);
  const SURUH = /bawalah|bawa benda|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda, menggambar di kertas, atau bermain bersama`);
  // Angka di gambar paling besar dua puluh.
  for (const v of [M_VIDEO, U])
    for (const a of v.adegan)
      for (const [i] of a.ketukan.entries())
        for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 20, `${v.id}/${a.id}#${i + 1}: angka paling besar dua puluh ("${t}")`);
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
  for (const n of [3, 4, 5, 8, 9, 10, 13, 16, 18, 20]) cek(bilanganSuara(semuaSuara).includes(n), `video materi mengucapkan bilangan ${n}`);
  const semuaLuar = U.adegan.map((a) => a.ketukan.map((kt) => kt.suara).join(" ")).join(" ");
  for (const n of [2, 3, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17]) cek(bilanganSuara(semuaLuar).includes(n), `video global mengucapkan bilangan ${n}`);
  for (const kata of ["Chacha", "Dika", "Nia", "Bu Sari", "Pak Ujang", "kardus", "koperasi", "puluhan", "satuan", "gantungan", "papan harga", "pensil", "baju olahraga", "maju", "pasangan", "tabel", "kucing"])
    cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  for (const pola of [/Igil/, /Kaka/, /Abang/, /Mamah/, /Pak Pos/i, /rumah rapi/i, /kebun/i, /bibit/i, /kereta/i, /festival/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /pustaka/i, /perpustakaan/i, /Pak Anto/, /Bu Dewi/, /kantin/i, /etalase/i, /karcis/i, /antrean/i, /\bkue\b/i, /jambu/i, /donat/i, /burung/i, /\bTika\b/, /\bKira\b/, /Bu Rina/, /Pak Budi/])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M_VIDEO);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3, `durasi video global lebih dari tiga menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
  const sapa = adegan(M_VIDEO, "sapaan");
  cek(/menjumlahkan bilangan sampai dua puluh/.test(sapa.ketukan[0].suara) && ["Menjumlahkan dengan maju dari bilangan yang besar", "Menjumlahkan dengan pasangan bilangan dan cara bersusun", "Menyimpan puluhan saat satuannya penuh"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global");
  cek(M_VIDEO.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k2b2a.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  // Visual berubah mengikuti kata (paling sedikit dua titik waktu) pada hampir semua ketukan.
  let banyakTitik = 0;
  let total = 0;
  for (const v of [M_VIDEO, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) { total += 1; if (new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at))).size >= 2) banyakTitik += 1; }
  cek(banyakTitik / total >= 0.9, `visual berubah mengikuti kata pada sedikitnya 90 persen ketukan (${banyakTitik}/${total})`);
}
{
  // 1. Kardus datang.
  const d = adegan(M_VIDEO, "kardus-datang");
  const d0 = akhirAdegan(d, 0);
  cek(ada(d0, "rk", "gt", "pu", "pu-tp", "tr", "k1", "k2", "k3", "kp-k") && isiTeks(d0, "pu-n") === "Pak Ujang" && isiTeks(d0, "kp-t0") === "KOPERASI SEKOLAH", "kardus datang: rak, gantungan, Pak Ujang bertopi, troli berkardus, papan nama koperasi");
  const d1 = akhirAdegan(d, 1);
  cek(ada(d1, "bl", "bs", "bs-ap", "ct-k") && ketemu(d1, "bl").rot > 0 && isiTeks(d1, "ct-t1") === "belum ada", "kardus datang: bel berbunyi, Bu Sari bercelemek, isi kardus belum tercatat");
  cek(ada(akhirAdegan(d), "sd", "xs", "ak0", "ak1") && isiTeks(akhirAdegan(d), "ct-t1") === "keliru!", "kardus datang: catatan keliru, anak baru tidak kebagian seragam");
  // 2. Hitung dari awal.
  const h = adegan(M_VIDEO, "hitung-dari-awal");
  const h0 = akhirAdegan(h, 0);
  cek(jumlahId(h0, /^g\d+$/) === 13 && jumlahId(h0, /^b\d+$/) === 5 && isiTeks(h0, "w13") === "13" && isiTeks(h0, "w5") === "5" && ada(h0, "kd", "ch"), "hitung dari awal: kardus berisi 13 pensil hijau dan 5 pensil biru");
  const h1 = akhirAdegan(h, 1);
  cek(ada(h1, "tj", "ct") && isiTeks(h1, "ct") === "13" && ketemu(h1, "g12").y > 160 && ketemu(h1, "g12").rot > 0, "hitung dari awal: Chacha menghitung semua dari awal, sebatang pensil berguling ke lantai");
  const h2 = akhirAdegan(h);
  cek(ada(h2, "dk", "lk", "pl") && sorot(h2, "g0", "g11") && tidakAda(h2, "tj", "ct"), "hitung dari awal: Dika menunjuk pensil hijau yang sudah diketahui 13");
  // 3. Maju.
  const m = adegan(M_VIDEO, "maju");
  const m0 = akhirAdegan(m, 0);
  cek(jumlahId(m0, /^jl-t\d$/) === 6 && isiTeks(m0, "v13") === "13" && isiTeks(m0, "lg") === "5 langkah" && ketemu(m0, "mk").x === 30, "maju: jalur bilangan dari 13, lima langkah");
  const m1 = akhirAdegan(m, 1);
  sama([14, 15, 16, 17, 18].map((n) => isiTeks(m1, `v${n}`)), ["14", "15", "16", "17", "18"], "maju: bilangan 14 sampai 18 di jalur");
  cek(jumlahId(m1, /^j\d$/) === 5 && ketemu(m1, "mk").x === 270, "maju: lima busur lompatan, penanda berhenti di 18");
  sama(["f13", "fp", "f5", "fs", "f18"].map((id) => isiTeks(akhirAdegan(m), id)), ["13", "+", "5", "=", "18"], "maju: 13 + 5 = 18");
  // 4. Pasangan.
  const p = adegan(M_VIDEO, "pasangan");
  const p0 = akhirAdegan(p, 0);
  cek(["tu", "ta", "tb"].map((id) => isiTeks(p0, id)).join() === "13,10,3" && ada(p0, "cu", "ca", "cb", "ga", "gb", "ni"), "pasangan: bagan 13 bercabang ke 10 dan 3");
  sama(["e1a", "e1b", "e1c", "e1d", "e1e", "e2a", "e2b", "e2c", "e2d", "e2e"].map((id) => isiTeks(akhirAdegan(p, 1), id)), ["3", "+", "5", "=", "8", "10", "+", "8", "=", "18"], "pasangan: 3 + 5 = 8 dan 10 + 8 = 18");
  cek(isiTeks(akhirAdegan(p), "hs") === "18" && ada(akhirAdegan(p), "ja-k", "jb-k", "pa", "pb", "ok"), "pasangan: dua cara bertemu di hasil 18");
  // 5. Bersusun.
  const b = adegan(M_VIDEO, "bersusun");
  const b0 = akhirAdegan(b, 0);
  cek(isiTeks(b0, "tb-hp") === "puluhan" && isiTeks(b0, "tb-hs") === "satuan" && ["a1", "a3", "a5"].map((id) => isiTeks(b0, id)).join() === "1,3,5" && sorot(b0, "tb-s"), "bersusun: tabel puluhan dan satuan, 13 + 5 tersusun, satuan lurus dengan satuan");
  cek(isiTeks(akhirAdegan(b, 1), "nt") === "3 + 5 = 8" && isiTeks(akhirAdegan(b, 1), "h8") === "8" && isiTeks(akhirAdegan(b, 1), "h1") === "1", "bersusun: satuan 3 + 5 = 8, puluhan tinggal 1");
  cek(isiTeks(akhirAdegan(b), "hs") === "18" && isiTeks(akhirAdegan(b), "t3") === "3 cara" && ada(akhirAdegan(b), "ok"), "bersusun: hasil 18, tiga cara sama");
  // 6. Baju olahraga.
  const o = adegan(M_VIDEO, "baju-olahraga");
  const o0 = akhirAdegan(o, 0);
  cek(ada(o0, "kd", "bh", "bk") && isiTeks(o0, "w16") === "16" && isiTeks(o0, "w4") === "4", "baju olahraga: kardus berisi 16 baju hijau dan 4 baju kuning");
  const o1 = akhirAdegan(o, 1);
  cek(jumlahId(o1, /^h\d+$/) === 20 && ketemu(o1, "h15").warna !== ketemu(o1, "h16").warna && isiTeks(o1, "n20") === "20" && ada(o1, "gt", "gt-a", "gt-b", "qm"), "baju olahraga: gantungan panjang muat 20 baju (16 hijau, 4 kuning)");
  const o2 = akhirAdegan(o);
  cek(isiTeks(o2, "nt") === "6 + 4 = 10" && isiTeks(o2, "h10") === "10" && ketemu(o2, "h10").u > 30 && ada(o2, "xs", "tm", "ch") && sorot(o2, "tb-s"), "baju olahraga: 6 + 4 = 10, angka 10 tidak muat di kotak satuan");
  // 7. Tukar sepuluh.
  const t = adegan(M_VIDEO, "tukar-sepuluh");
  const t0 = akhirAdegan(t, 0);
  cek(isiTeks(t0, "x10") === "10" && isiTeks(t0, "kt") === "1 kotak" && isiTeks(t0, "ka") === "1 angka" && ada(t0, "xs", "dk"), "tukar sepuluh: satu kotak hanya satu angka");
  const t1 = akhirAdegan(t, 1);
  cek(jumlahId(t1, /^c\d$/) === 0 && ada(t1, "br", "z0", "ok") && ketemu(t1, "br").x === 82 && isiTeks(t1, "z0") === "0" && isiTeks(t1, "ls") === "10 satuan" && isiTeks(t1, "lp") === "1 puluhan", "tukar sepuluh: sepuluh kubus jadi satu batang puluhan yang pindah ke kolom puluhan, satuan 0");
  cek(jumlahId(L.keadaanStory(t, 1, L.posisiKata(t.ketukan[1].suara, "ditukar")), /^c\d$/) === 10, "tukar sepuluh: sepuluh kubus satuan sebelum menyatu");
  const t2 = akhirAdegan(t);
  cek(["q1", "qp", "q2", "q3", "q0", "h20"].map((id) => isiTeks(t2, id)).join() === "1,+,1,2,0,20", "tukar sepuluh: 1 + 1 = 2 puluhan, hasil 20");
  // 8. Gantungan pas.
  const g = adegan(M_VIDEO, "gantungan-pas");
  cek(jumlahId(akhirAdegan(g, 0), /^h\d+$/) === 20 && isiTeks(akhirAdegan(g, 0), "n20") === "20" && ada(akhirAdegan(g, 0), "ok", "pp"), "gantungan pas: 20 baju, gantungan pas penuh");
  cek(isiTeks(akhirAdegan(g, 1), "k18") === "Pensil: 18" && isiTeks(akhirAdegan(g, 1), "k20") === "Baju olahraga: 20" && ada(akhirAdegan(g, 1), "ph", "bs"), "gantungan pas: papan harga 18 pensil dan 20 baju olahraga");
  cek(ada(akhirAdegan(g), "kc", "zz", "ks", "hh", "ch", "dk") && ketemu(akhirAdegan(g), "kc").x === 150, "gantungan pas: kucing koperasi tidur di kardus kosong");
  // 9. Penutup.
  const n = adegan(M_VIDEO, "penutup");
  cek(ada(akhirAdegan(n, 0), "rk", "bs", "kl", "an0", "ke", "r0") && tidakAda(akhirAdegan(n, 0), "r10", "r14") && ketemu(akhirAdegan(n, 0), "bs").isi === "\u{1F60A}", "penutup: rak penuh berkurang, Bu Sari tersenyum, anak datang membeli besok");
  cek(["r1-t0", "r2-t0", "r3-t0", "r4-t0"].map((id) => isiTeks(akhirAdegan(n, 1), id)).join("|") === "1. Maju dari yang besar|2. Pecah jadi pasangan|3. Susun di tabel|4. Tukar 10 satuan jadi 1 puluhan", "penutup: ringkasan empat langkah");
  const n2 = akhirAdegan(n);
  cek(["a9", "ap", "a5", "tq"].map((id) => isiTeks(n2, id)).join() === "9,+,5,?" && ada(n2, "ch", "dk", "ni", "bs", "lb0", "lb3"), "penutup: pertanyaan 9 + 5 pada kotak satuan, empat tokoh melambai");
}
{
  // Pembuka metode global.
  const op = adegan(U, "luar-pembuka");
  cek(ada(akhirAdegan(op, 0), "kd", "ni", "lb0-k", "lb1-k", "lb2-k", "pu") && isiTeks(akhirAdegan(op, 0), "n3") === "3 lembar cara", "global pembuka: kardus terakhir, tiga lembar cara, Pak Ujang");
  cek(ada(akhirAdegan(op, 1), "bs", "cp", "tk", "kt"), "global pembuka: Pak Ujang tertawa, cara cepat penjaga toko");
  sama(["m0", "m1", "m2"].map((id) => isiTeks(akhirAdegan(op, 2), id)), ["1. Make a Ten", "2. Doubles Plus One", "3. Round and Adjust"], "global pembuka: tiga nama metode");
  sama(["n0", "n1", "n2"].map((id) => isiTeks(akhirAdegan(op, 3), id)), ["Membuat Sepuluh", "Kembar Tambah Satu", "Bulatkan Lalu Sesuaikan"], "global pembuka: tiga nama bahasa Indonesia");
  // Make a Ten.
  const s = adegan(U, "luar-sepuluh");
  cek(jumlahId(akhirAdegan(s, 0), /^kp-s\d$/) === 10 && isiTeks(akhirAdegan(s, 0), "t10") === "10", "Make a Ten: kotak pensil sepuluh petak");
  cek(jumlahId(akhirAdegan(s, 1), /^g\d$/) === 8 && ketemu(akhirAdegan(s, 1), "b0").x === ketemu(akhirAdegan(s, 1), "g7").x + 24 && ketemu(akhirAdegan(s, 1), "b1").x === ketemu(akhirAdegan(s, 1), "g7").x + 48 && sorot(akhirAdegan(s, 1), "kp"), "Make a Ten: delapan pensil, dua pensil diambil dari yang kecil melengkapi sepuluh petak");
  cek(ada(akhirAdegan(s, 2), "sn", "js") && sorot(akhirAdegan(s, 2), "b2", "b3"), "Make a Ten: sepuluh itu mudah, sisanya ditambahkan");
  cek(isiTeks(akhirAdegan(s), "h10") === "10" && ada(akhirAdegan(s), "c9-k", "c4-k", "pn"), "Make a Ten: cocok bila salah satu bilangan hampir sepuluh");
  const st = adegan(U, "luar-sepuluh-terapan");
  cek(jumlahId(akhirAdegan(st, 0), /^a\d$/) === 8 && jumlahId(akhirAdegan(st, 0), /^b\d$/) === 5 && isiTeks(akhirAdegan(st, 0), "la") === "8" && isiTeks(akhirAdegan(st, 0), "lb") === "5" && isiTeks(akhirAdegan(st, 0), "bt") === "butuh 2 lagi", "Make a Ten terapan: 8 pensil dan 5 pensil, 8 butuh 2 lagi");
  cek(isiTeks(akhirAdegan(st, 1), "la") === "10" && isiTeks(akhirAdegan(st, 1), "lb") === "3" && ["e1", "e2", "e3", "e4", "e5"].map((id) => isiTeks(akhirAdegan(st, 1), id)).join(" ") === "10 + 3 = 13", "Make a Ten terapan: 10 + 3 = 13");
  cek(ada(akhirAdegan(st, 2), "ok", "c8-k", "c9-k") && ada(akhirAdegan(st, 3), "xs", "c2-k", "c3-k"), "Make a Ten terapan: cocok untuk 8 atau 9, kurang cocok untuk 2 + 3");
  // Doubles Plus One.
  const kb = adegan(U, "luar-kembar");
  cek(ada(akhirAdegan(kb, 0), "kd1", "kd2", "kb", "sm", "p1") && isiTeks(akhirAdegan(kb, 0), "p1") === "+1", "Doubles Plus One: dua kardus kembar, tambah satu");
  cek(["s1", "sm", "s2", "fe"].map((id) => isiTeks(akhirAdegan(kb, 1), id)).join() === "6,+,6,6 + 6 = 12", "Doubles Plus One: 6 + 6 = 12");
  cek(ada(akhirAdegan(kb, 2), "c7-k", "c8-k", "bd", "kk", "t1") && isiTeks(akhirAdegan(kb, 2), "kk") === "kembar: 7 + 7", "Doubles Plus One: beda satu, ambil kembarnya, tambah satu");
  cek(["d2", "d3", "d4", "d5"].map((id) => isiTeks(akhirAdegan(kb, 3), id)).join() === "2 + 2 = 4,3 + 3 = 6,4 + 4 = 8,5 + 5 = 10" && ada(akhirAdegan(kb, 3), "pt"), "Doubles Plus One: kembar kecil mudah diingat");
  const kt = adegan(U, "luar-kembar-terapan");
  cek(jumlahId(akhirAdegan(kt, 0), /^a\d$/) === 7 && jumlahId(akhirAdegan(kt, 0), /^b\d$/) === 8 && ["e1", "e2", "e3", "e4", "e5"].map((id) => isiTeks(akhirAdegan(kt, 0), id)).join(" ") === "7 + 7 = 14", "Doubles Plus One terapan: 7 topi dan 8 topi, 7 + 7 = 14");
  cek(isiTeks(akhirAdegan(kt, 1), "d1") === "8 = 7 + 1" && ["f1", "f2", "f3", "f4", "f5"].map((id) => isiTeks(akhirAdegan(kt, 1), id)).join(" ") === "14 + 1 = 15" && sorot(akhirAdegan(kt, 1), "b7"), "Doubles Plus One terapan: 14 + 1 = 15");
  cek(ada(akhirAdegan(kt, 2), "ok", "c7-k", "c8-k") && ada(akhirAdegan(kt, 3), "xs", "c3-k", "c12-k") && isiTeks(akhirAdegan(kt, 3), "c12-t0") === "12", "Doubles Plus One terapan: cocok bila hampir sama besar, kurang cocok untuk 3 + 12");
  // Round and Adjust.
  const bl = adegan(U, "luar-bulat");
  cek(ada(akhirAdegan(bl, 0), "bl-k", "sy-k", "pa", "kc"), "Round and Adjust: bulatkan lalu sesuaikan");
  cek(isiTeks(akhirAdegan(bl, 1), "v9") === "9" && isiTeks(akhirAdegan(bl, 1), "v10") === "10" && ada(akhirAdegan(bl, 1), "bs", "mk", "st") && ketemu(akhirAdegan(bl, 1), "mk").x === 150, "Round and Adjust: 9 dibulatkan ke 10 terdekat");
  cek(ada(akhirAdegan(bl, 2), "pb", "mn", "td") && isiTeks(akhirAdegan(bl, 2), "mn") === "-1" && tidakAda(akhirAdegan(bl, 2), "st"), "Round and Adjust: kurangi sebanyak yang tadi ditambahkan");
  cek(["n1", "n2"].map((id) => isiTeks(akhirAdegan(bl), id)).join() === "16,16" && ada(akhirAdegan(bl), "ca-k", "cb-k", "ok"), "Round and Adjust: hasil tetap sama");
  const bt = adegan(U, "luar-bulat-terapan");
  cek(["x9", "xp", "x7"].map((id) => isiTeks(akhirAdegan(bt, 0), id)).join("") === "9+7" && isiTeks(akhirAdegan(bt, 0), "ee") === "10 + 7 = 17" && isiTeks(akhirAdegan(bt, 0), "bl-t0") === "9 jadi 10", "Round and Adjust terapan: 9 + 7, 9 jadi 10, 10 + 7 = 17");
  cek(isiTeks(akhirAdegan(bt, 1), "r1") === "9 + 1 = 10" && isiTeks(akhirAdegan(bt, 1), "r2") === "17 - 1 = 16" && ada(akhirAdegan(bt, 1), "ok", "ni"), "Round and Adjust terapan: 17 - 1 = 16");
  cek(ada(akhirAdegan(bt, 2), "ok", "c9-k", "c10-k", "pn") && ada(akhirAdegan(bt, 3), "xs", "bs", "pl", "v4", "v10") && jumlahId(akhirAdegan(bt, 3), /^jl-t\d$/) === 7, "Round and Adjust terapan: cocok dekat 10, kurang cocok jauh dari 10");
  // Ringkasan.
  const rk = adegan(U, "luar-ringkas");
  cek(["r0-t0", "r1-t0", "r2-t0"].map((id) => isiTeks(akhirAdegan(rk, 0), id)).join() === U1.NAMA_METODE_ID.map((m, i) => `${i + 1}. ${m}`).join() && isiTeks(akhirAdegan(rk, 0), "t3") === "3 cara", "ringkasan: tiga metode");
  cek(isiTeks(akhirAdegan(rk, 1), "p0-t0") === "1 bilangan hampir 10" && isiTeks(akhirAdegan(rk, 1), "a0-t0") === "Membuat Sepuluh" && isiTeks(akhirAdegan(rk, 1), "a1-t0") === "Bulatkan Lalu Sesuaikan" && isiTeks(akhirAdegan(rk, 1), "a2-t0") === "Kembar Tambah Satu", "ringkasan: pilih cara menurut bilangannya");
  cek(ada(akhirAdegan(rk, 2), "dk", "kc", "ok"), "ringkasan: periksa lagi hasilnya");
  cek(["q8", "qp", "q9", "qs", "qq"].map((id) => isiTeks(akhirAdegan(rk), id)).join(" ") === "8 + 9 = ?" && ada(akhirAdegan(rk), "o0-k", "o1-k", "o2-k", "sm"), "ringkasan: pertanyaan 8 + 9, tiga cara untuk dipilih");
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k2b2A-.*\.ts$/.test(f));
  cek(berkas.length === 8, `berkas story k2b2A (${berkas.length})`);
  for (const f of ["k2b2A-materi-4.ts", "k2b2A-materi-5.ts"]) cek(!berkas.includes(f), `${f} tidak ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s), `${f}: tanpa kata buku`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k1b1a-bantu|k1b4a-gambar|k2b2A-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, k1b1a-bantu, k1b4a-gambar, atau k2b2A (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}: emoji gambar paling tinggi U+1FA95`);
  const pb = readFileSync(new URL("../src/components/modul/video-k2b2a.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K2B2A/.test(pb) && /VIDEO_LUAR_K2B2A/.test(pb) && /export function VideoK2B2A/.test(pb) && !/VideoPenjumlahanK2B2A/.test(pb) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pb) && !/\r/.test(pb) && !pb.startsWith("﻿"), "video-k2b2a.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
