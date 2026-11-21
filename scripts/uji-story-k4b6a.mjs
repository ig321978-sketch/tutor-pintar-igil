// Uji Story Kelas 4 Bab 6 Sub-Bab A "Piktogram Jajanan Bu Rini" (piktogram skala satu dan lebih dari satu), awal cerita Bazar Kuliner Sekolah: video materi dan video metode global.
// Jalankan: node --no-warnings scripts/uji-story-k4b6a.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k4b6a-video.ts");

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

const VIDEO = [V.VIDEO_MATERI_K4B6A, V.VIDEO_LUAR_K4B6A];
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
const EMOJI_SAJA = /^[\u{1F000}-\u{1FFFF}]|^[✂✅❌⭐➕]$/u;
for (const v of VIDEO) {
  cek(v.adegan.length === (v.jenis === "materi" ? 10 : 9), `${v.id}: jumlah adegan (ada ${v.adegan.length})`);
  cek(["materi", "metode-luar"].includes(v.jenis) && v.judul.length > 5 && v.subjudul.length > 5, `${v.id}: jenis dan judul ada`);
  cek(new Set(v.adegan.map((a) => a.id)).size === v.adegan.length, `${v.id}: id adegan unik`);
  for (const a of v.adegan) {
    const nama = `${v.id}/${a.id}`;
    cek(a.ketukan.length >= 3 && a.ketukan.length <= 14, `${nama}: 3 sampai 14 ketukan (ada ${a.ketukan.length})`);
    cek(a.sumber.length > 8 && a.judul.length > 5 && /^#[0-9A-Fa-f]{6}$/.test(a.latar), `${nama}: sumber, judul, dan latar ada`);
    let sebelumnya = null;
    a.ketukan.forEach((kt, i) => {
      const kata = L.kataDari(kt.suara);
      totalKetukan += 1;
      totalKata += kata.length;
      cek(kata.length >= 5 && kata.length <= 40, `${nama}#${i + 1}: 5 sampai 40 kata (ada ${kata.length})`);
      cek(!/[=×÷<>\/%]/.test(kt.suara), `${nama}#${i + 1}: suara tanpa lambang`);
      cek(/[.?!]$/.test(kt.suara.trim()), `${nama}#${i + 1}: suara berakhir tanda baca`);
      cek(!/\d/.test(kt.suara), `${nama}#${i + 1}: suara tanpa digit`);
      cek(kt.aksi.length >= 1, `${nama}#${i + 1}: ada aksi gambar`);
      for (const ak of kt.aksi) {
        cek(L.posisiKata(kt.suara, ak.at) >= 0, `${nama}#${i + 1}: pemicu "${ak.at}" ditemukan`);
        if (typeof ak.at === "number") cek(ak.at >= 0 && ak.at < kata.length, `${nama}#${i + 1}: pemicu angka dalam batas`);
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
        cek(!lama, `${nama}: gambar akhir tidak sama dengan adegan lain (${lama ?? ""})`);
        semuaSidik.set(sidik, nama);
      }
      cek(new Set(akhir.map((o) => o.id)).size === akhir.length, `${nama}#${i + 1}: id benda unik`);
      const titikAksi = [...new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at)))].sort((m, n) => m - n);
      if (titikAksi.length >= 2) cek(new Set(titikAksi.map((p) => L.sidikKeadaan(L.keadaanStory(a, i, p)))).size >= 2, `${nama}#${i + 1}: gambar berubah mengikuti kata`);
      for (const o of akhir) {
        const x = o.x ?? 0;
        const y = o.y ?? 0;
        if (o.t === "teks") {
          const lebar = (o.isi ?? "").length * (o.u ?? 10) * 0.56;
          const kiri = (o.anchor ?? "middle") === "middle" ? x - lebar / 2 : (o.anchor ?? "middle") === "end" ? x - lebar : x;
          cek(y > 0 && y < 200 && kiri > -4 && kiri + lebar < 304, `${nama}#${i + 1}: teks "${o.isi}" masuk kanvas (x=${x}, y=${y})`);
        } else if (o.t === "kotak") cek(x > -2 && y > -2 && x + (o.w ?? 0) < 302 && y + (o.h ?? 0) < 202, `${nama}#${i + 1}: kotak ${o.id} masuk kanvas`);
        else if (o.t === "bulat") cek(x - (o.r ?? 0) > -2 && x + (o.r ?? 0) < 302 && y - (o.r ?? 0) > -2 && y + (o.r ?? 0) < 210, `${nama}#${i + 1}: bulat ${o.id} masuk kanvas`);
        else if (o.t === "garis" || o.t === "panah") cek(x > -2 && x < 302 && y > -2 && y < 204 && x + (o.x2 ?? 0) > -2 && x + (o.x2 ?? 0) < 302 && y + (o.y2 ?? 0) > -2 && y + (o.y2 ?? 0) < 204, `${nama}#${i + 1}: garis ${o.id} masuk kanvas`);
      }
      {
        const teksAda = akhir.filter((o) => o.t === "teks" && (o.op ?? 1) > 0 && o.isi && !EMOJI_SAJA.test(o.isi));
        for (let p = 0; p < teksAda.length; p += 1)
          for (let q = p + 1; q < teksAda.length; q += 1) {
            const m = kotakTeks(teksAda[p]);
            const n = kotakTeks(teksAda[q]);
            const lx = Math.min(m[2], n[2]) - Math.max(m[0], n[0]);
            const ly = Math.min(m[3], n[3]) - Math.max(m[1], n[1]);
            cek(!(lx > 1 && ly > 1), `${nama}#${i + 1}: teks "${teksAda[p].isi}" (${teksAda[p].id}) bertumpuk dengan "${teksAda[q].isi}" (${teksAda[q].id})`);
          }
      }
    });
  }
}

/* ------------------------------ Khusus Sub-Bab A Kelas 4 Bab 6 ------------------------------ */
{
  const { ejaanInggrisUntukSuaraId } = await import("../src/lib/ejaan-inggris-id.ts");
  const U1 = await import("../src/components/modul/story/k4b6a-luar-1.ts");
  const M = V.VIDEO_MATERI_K4B6A;
  const U = V.VIDEO_LUAR_K4B6A;
  const adegan = (v, id) => v.adegan.find((a) => a.id === id);
  const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
  const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
  const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  const ketemu = (objs, id) => objs.find((o) => o.id === id);
  const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
  const ada = (objs, ...ids) => ids.every((id) => ketemu(objs, id));
  const tidakAda = (objs, ...ids) => ids.every((id) => !ketemu(objs, id));
  const hitungIkon = (objs, awalan) => objs.filter((o) => new RegExp(`^${awalan}\\d+$`).test(o.id)).length;

  // Pembaca bilangan yang diucapkan dengan kata: satuan, belasan, puluhan, dan sepuluh.
  const SAT = { nol: 0, satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
  const bilanganSuara = (s0) => {
    const w = s0.toLowerCase().split(/[^a-z]+/).filter(Boolean);
    const hasil = [];
    for (let i = 0; i < w.length; i += 1) {
      if (w[i] === "sepuluh") hasil.push(10);
      else if (w[i] === "sebelas") hasil.push(11);
      else if (w[i] in SAT) {
        const n = SAT[w[i]];
        if (w[i + 1] === "belas") {
          hasil.push(10 + n);
          i += 1;
        } else if (w[i + 1] === "puluh") {
          let t = n * 10;
          i += 1;
          if (w[i + 1] in SAT && w[i + 1] !== "nol") {
            t += SAT[w[i + 1]];
            i += 1;
          }
          hasil.push(t);
        } else hasil.push(n);
      }
    }
    return hasil;
  };
  sama(bilanganSuara("Tiga puluh porsi, lima belas, dua puluh lima, sepuluh, enam."), [30, 15, 25, 10, 6], "pembaca bilangan suara");

  const materi = JSON.stringify(M.adegan.map(teksAdegan));
  const luar = JSON.stringify(U.adegan.map(teksAdegan));
  cek(!(/Count the Icons|Table to Picture|Rank and Compare|Hitung Ikon|Tabel ke Gambar|Urutkan dan Banding/.test(materi) || /metode global/i.test(materi)), "video materi tanpa nama metode global");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode global memuat ${m}`);
  sama([U1.NAMA_METODE, U1.NAMA_METODE_ID], [["Count the Icons", "Table to Picture", "Rank and Compare"], ["Hitung Ikon", "Tabel ke Gambar", "Urutkan dan Banding"]], "nama tiga metode global");
  for (const m of U1.NAMA_METODE) {
    const e = ejaanInggrisUntukSuaraId(`Metode ${m}, ya.`);
    cek(e !== `Metode ${m}, ya.` && !/[A-Z]/.test(e.replace(/^Metode /, "")), `nama ${m} dieja untuk suara Indonesia ("${e}")`);
  }
  cek(M.subjudul === "Metode Kurikulum" && U.subjudul === "Metode Global" && M.judul === "Piktogram Jajanan Bu Rini" && U.judul === M.judul && V.JUDUL_K4B6A === M.judul, "judul dan subjudul");
  cek(M.id === "k4b6a-materi" && U.id === "k4b6a-luar" && M.jenis === "materi" && U.jenis === "metode-luar", "id dan jenis video");
  cek(M.adegan.map((a) => a.id).join() === "sapaan,bazar,piktogram,keterangan,baca-ikon,salah-jumlah,periksa-jumlah,banding,keterangan-lain,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-hitung,luar-hitung-terapan,luar-tabel,luar-tabel-terapan,luar-urut,luar-urut-terapan,luar-ringkas", "urutan adegan metode global");
  cek(M.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 52) && U.adegan.every((a) => /Metode global|Ringkasan|ringkasan/i.test(a.sumber) && a.sumber.length <= 52), "label sumber");
  cek([...M.adegan, ...U.adegan].every((a) => a.judul.length <= 34), "judul adegan maksimal 34 huruf");
  const TERLARANG = /(kelas|buku|teman|kelompok|mengelompokkan|skor|nilai|soal|tebak|kunci|latihan|senilai|ditemani)/i;
  for (const v of [M, U]) for (const a of v.adegan) cek(!TERLARANG.test(teksAdegan(a)) && !TERLARANG.test(a.id), `${v.id}/${a.id}: tanpa kata terlarang`);
  // Sub-Bab A tidak membahas diagram batang (Sub-Bab B): hanya menyebut batang sebagai jembatan di adegan penutup.
  for (const v of [M, U]) for (const a of v.adegan) if (a.id !== "penutup") cek(!/batang|sumbu|tingkatan/i.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa istilah diagram batang di luar penutup`);
  const SURUH = /bawalah|bawa benda (di|dari) rumah|ambil benda di rumah|gambarlah|gambar di kertas|di kertasmu|ajak (ayah|ibu|adik|kakak|orang)|bermain bersama/i;
  for (const v of [M, U]) for (const a of v.adegan) cek(!SURUH.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa suruhan membawa benda atau menggambar di kertas`);
  // Bilangan yang diucapkan tampak sebagai angka di gambar pada ketukan itu. Sapaan bersama dikecualikan.
  for (const v of [M, U])
    for (const a of v.adegan)
      if (a.id !== "sapaan")
        a.ketukan.forEach((kt, i) => {
          const terlihat = new Set();
          for (let p = -1; p < L.kataDari(kt.suara).length; p += 1) for (const t of L.teksTerlihat(L.keadaanStory(a, i, p))) for (const b of bilanganDari(t)) terlihat.add(Number(b));
          for (const n of bilanganSuara(kt.suara)) cek(terlihat.has(n), `${v.id}/${a.id}#${i + 1}: bilangan ${n} yang diucapkan tampak sebagai angka`);
        });
  for (const kata of ["Pak Hendro", "Satria", "Laras", "Genta", "Bu Rini", "Pak Dodi", "bazar kuliner", "piktogram", "ikon", "keterangan", "porsi", "risoles", "pisang goreng", "lemper", "es cincau", "paling laris", "selisih", "kertas berpetak", "penggaris"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  cek(/Kalau aku salah, aku mencuci semua piring bazar/.test(materi) && /delapan belas porsi/.test(materi) && /sembilan puluh porsi/.test(materi), "video materi: Satria menjumlah ikon saja dengan taruhan mencuci piring");
  for (const pola of [/Helen/, /Azizah/, /Pak Toni/, /Pak Wicak/, /minimarket/i, /Bu Ratri/, /Pak Gunawan/, /angklung/i, /Raka/, /Salsa/, /Bima/, /Pak Joko/, /Pak Hasan/, /Bu Ratih/, /Kak Anton/, /Pak Samsul/, /bengkel/i, /sepeda/i, /Chacha/, /Dika/, /\bNia\b/, /Bu Sari/, /pentas/i, /bank sampah/i, /kebun binatang/i, /perkemahan/i, /akuarium/i, /pasar malam/i, /rumah pohon/i, /perpustakaan/i, /kantin/i, /Tiara/, /Slamet/, /pizza/i, /Bu Maya/, /penginapan/i, /perahu/i, /pantai/i, /tiket/i, /kelapa/i, /Bu Wulan/, /Pak Joyo/, /batik/i, /sanggar/i, /Bu Sinta/, /Pak Anto/, /kolam/i, /ubin/i, /ember/i, /pulau/i, /panggung/i, /keramik/i, /Bu Dewi/, /Pak Rudi/, /etalase/i, /Karel/])
    for (const isi of [materi, luar]) cek(!pola.test(isi), `video tanpa tokoh atau latar lama ${pola}`);
  const km = kataVideo(M);
  cek(km >= 300 && km <= 400, `materi 300 sampai 400 kata (${km})`);
  cek(kataVideo(U) / 120 > 3.2, `durasi video global lebih dari tiga menit dengan margin (${(kataVideo(U) / 120).toFixed(2)} menit)`);
  const sapa = adegan(M, "sapaan");
  cek(/piktogram/.test(sapa.ketukan[0].suara) && ["Ikon", "Keterangan", "Paling banyak"].every((d) => teksAdegan(sapa).includes(d)), "sapaan materi: topik dan tiga hal");
  cek(/piktogram/.test(adegan(U, "sapaan").ketukan[0].suara) && /Metode global/.test(adegan(U, "sapaan").sumber), "sapaan global berlabel Metode global dan bertopik piktogram");
  cek(M.adegan.slice(1).every((a) => a.ketukan.length === 3) && U.adegan.slice(1).every((a) => a.ketukan.length === 4), "3 ketukan tiap adegan materi, 4 ketukan tiap adegan global");
  // Naskah tetap: kalimat suara sama dengan berkas naskah.
  const naskah = readFileSync(new URL("../naskah/story-naskah-k4b6a.md", import.meta.url), "utf8");
  const dalamNaskah = (s) => naskah.replace(/\s+/g, " ").includes(s.replace(/\s+/g, " "));
  for (const v of [M, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) cek(dalamNaskah(kt.suara), `${v.id}/${a.id}: suara sesuai naskah tetap ("${kt.suara.slice(0, 40)}")`);
  let banyakTitik = 0;
  let total = 0;
  for (const v of [M, U]) for (const a of v.adegan) if (a.id !== "sapaan") for (const kt of a.ketukan) { total += 1; if (new Set(kt.aksi.map((ak) => L.posisiKata(kt.suara, ak.at))).size >= 2) banyakTitik += 1; }
  cek(banyakTitik / total >= 0.9, `visual berubah mengikuti kata pada sedikitnya 90 persen ketukan (${banyakTitik}/${total})`);
  for (const v of [M, U]) for (const a of v.adegan) if (a.id !== "sapaan") cek(akhirAdegan(a).some((o) => o.t !== "teks"), `${v.id}/${a.id}: gambar akhir memuat bentuk gambar sendiri`);
  // Label nama tokoh diturunkan dan tidak ada teks yang tertutup wajah tokoh.
  for (const v of [M, U])
    for (const a of v.adegan)
      a.ketukan.forEach((_, i) => {
        const objs = L.keadaanStory(a, i, 9999);
        for (const w of objs.filter((o) => o.t === "teks" && /^[\u{1F466}\u{1F467}\u{1F9D2}\u{1F468}\u{1F469}]$/u.test(o.isi ?? "") && (o.u ?? 10) >= 28)) {
          const label = ketemu(objs, `${w.id}-n`);
          if (label) cek((label.y ?? 0) >= (w.y ?? 0) + 4 + 14, `${v.id}/${a.id}#${i + 1}: label ${label.isi} diturunkan dari wajah ${w.id}`);
          for (const o of objs.filter((q) => q.t === "teks" && !EMOJI_SAJA.test(q.isi ?? "") && !/-n$/.test(q.id) && q.id !== w.id)) {
            const m = kotakTeks(o);
            cek(!(Math.min(m[2], (w.x ?? 0) + 15) - Math.max(m[0], (w.x ?? 0) - 15) > 1 && Math.min(m[3], (w.y ?? 0) + 4) - Math.max(m[1], (w.y ?? 0) - 24) > 1), `${v.id}/${a.id}#${i + 1}: teks "${o.isi}" (${o.id}) tertutup wajah ${w.id}`);
          }
        }
      });

  /* Isi tiap adegan materi: deret ikon sungguh sebanyak data dibagi keterangan (satu ikon sama dengan lima porsi). */
  const kt = adegan(M, "keterangan");
  {
    const o = akhirAdegan(kt);
    cek(hitungIkon(o, "ri") === 6 && isiTeks(o, "p30") === "30 porsi" && isiTeks(o, "i6") === "6 ikon" && 30 / 5 === 6, "keterangan: risoles tiga puluh porsi digambar enam ikon");
    cek(hitungIkon(o, "pg") === 4 && isiTeks(o, "p20") === "20 porsi" && isiTeks(o, "bg") === "20 : 5 = 4" && 20 / 5 === 4, "keterangan: pisang goreng dua puluh porsi digambar empat ikon");
    cek(isiTeks(akhirAdegan(kt, 0), "kr2") === "1 ikon = 5 porsi", "keterangan: satu ikon sama dengan lima porsi");
  }
  const bi = adegan(M, "baca-ikon");
  {
    cek(hitungIkon(akhirAdegan(bi, 0), "lm") === 3 && isiTeks(akhirAdegan(bi, 0), "h1") === "3 × 5" && isiTeks(akhirAdegan(bi, 0), "h2") === "= 15 porsi" && 3 * 5 === 15, "baca ikon: lemper tiga ikon kali lima sama dengan lima belas");
    cek(hitungIkon(akhirAdegan(bi, 1), "cn") === 5 && isiTeks(akhirAdegan(bi, 1), "h2") === "= 25 porsi" && 5 * 5 === 25, "baca ikon: es cincau lima ikon kali lima sama dengan dua puluh lima");
  }
  const sj = adegan(M, "salah-jumlah");
  {
    const o = akhirAdegan(sj, 0);
    sama(["r1", "r2", "r3", "r4"].map((id) => hitungIkon(o, id)), [6, 4, 3, 5], "salah jumlah: ikon tiap baris enam, empat, tiga, lima");
    const jumlah = 6 + 4 + 3 + 5;
    cek(jumlah === 18 && isiTeks(akhirAdegan(sj, 1), "j18") === "= 18 porsi", "salah jumlah: Satria menjumlah ikon saja delapan belas");
    cek(ada(akhirAdegan(sj), "mc", "pr1", "pr2", "pr3", "ku") && tidakAda(akhirAdegan(sj), "j18"), "salah jumlah: taruhan mencuci piring");
  }
  const pj = adegan(M, "periksa-jumlah");
  {
    const o = akhirAdegan(pj, 1);
    cek(isiTeks(o, "t1") === "18 ikon" && isiTeks(o, "t3") === "18 × 5 = 90 porsi" && 18 * 5 === 90, "periksa jumlah: delapan belas ikon kali lima sama dengan sembilan puluh");
    cek(ada(akhirAdegan(pj, 2), "sa", "pr1", "bs0", "t1", "t2", "t3"), "periksa jumlah: Satria mencuci piring dengan busa, semua tertawa");
  }
  const bd = adegan(M, "banding");
  {
    const o = akhirAdegan(bd);
    sama([hitungIkon(o, "r1"), hitungIkon(o, "r3")], [6, 3], "banding: risoles enam ikon dan lemper tiga ikon");
    cek(isiTeks(o, "s1") === "6 − 3 = 3 ikon" && isiTeks(o, "s2") === "3 × 5 = 15 porsi" && (6 - 3) * 5 === 15, "banding: selisih tiga ikon sama dengan lima belas porsi");
    cek(isiTeks(akhirAdegan(bd, 0), "mx") === "terbanyak" && isiTeks(akhirAdegan(bd, 1), "mn") === "paling sedikit", "banding: paling banyak dan paling sedikit");
  }
  const kl = adegan(M, "keterangan-lain");
  {
    cek(isiTeks(akhirAdegan(kl, 0), "kt") === "1 ikon = 10 porsi" && hitungIkon(akhirAdegan(kl, 0), "rs") === 3, "keterangan lain: satu ikon sepuluh porsi, risoles tiga ikon");
    cek(hitungIkon(akhirAdegan(kl, 1), "dt") === 30 && isiTeks(akhirAdegan(kl, 1), "k1") === "1 ikon = 1 porsi" && isiTeks(akhirAdegan(kl, 1), "k30") === "30 ikon", "keterangan lain: skala satu butuh tiga puluh ikon untuk risoles");
  }
  const pt = adegan(M, "penutup");
  {
    const o = akhirAdegan(pt, 0);
    cek(ada(o, "pd", "pd-tg", "pd-pg", "kp", "pg") && isiTeks(o, "pd-n") === "Pak Dodi", "penutup: Pak Dodi berkalung tanda pengenal membawa kertas berpetak dan penggaris");
    cek(ada(akhirAdegan(pt, 1), "bt0", "bt1", "bt2", "bt3") && isiTeks(akhirAdegan(pt, 1), "tg") === "tegak", "penutup: data digambar menjadi batang tegak");
    cek(ada(akhirAdegan(pt), "sa", "lr", "ge", "ph", "br", "pd", "tq") && isiTeks(akhirAdegan(pt), "tq") === "?", "penutup: enam tokoh dan pertanyaan batang dengan deretan ikon");
  }
}
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^k4b6a-.*\.ts$/.test(f));
  cek(berkas.length === 8, `berkas story k4b6a (${berkas.length})`);
  for (const f of ["bantu", "gambar", "luar-1", "luar-2", "materi-1", "materi-2", "materi-3", "video"]) cek(berkas.includes(`k4b6a-${f}.ts`), `k4b6a-${f}.ts ada`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    cek(![...s].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d || c.codePointAt(0) === 0x1f6de), `${f}: emoji paling tinggi U+1FA95 tanpa ZWJ`);
    cek(!/\\u\{1FA(9[6-9A-F]|[A-F][0-9A-F])\}|\\u\{1F[B-F][0-9A-F]{2}\}|\\u\{200D\}|\\u\{1F6DE\}/i.test(s), `${f}: kode emoji tidak melewati U+1FA95`);
    cek(![...s].some((c) => [0x1fa74, 0x1f39f, 0x2602, 0x1fa9f, 0x1faa3, 0x1f355, 0x1f9cb].includes(c.codePointAt(0))) && !/\\u\{1FA74\}|\\u\{1F39F\}|\\u2602|\\u\{1FA9F\}|\\u\{1FAA3\}|\\u\{1F355\}|\\u\{1F9CB\}/i.test(s), `${f}: tanpa emoji yang tampil kosong atau hitam`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: tanpa BOM, akhir baris LF`);
    cek(!/from "react"|fetch\(/.test(s), `${f}: tanpa React dan jaringan`);
    cek(!/buku/i.test(s) && !/senilai/i.test(s) && ![...s].some((c) => [0x1f41f, 0x1f420, 0x1f421, 0x1f988, 0x1f42c, 0x1f38f].includes(c.codePointAt(0))), `${f}: tanpa kata buku, senilai, dan tanpa emoji ikan`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k4b6a-[a-z0-9-]+)$/.test(i)), `${f}: impor hanya logika, sapaan, atau k4b6a (${impor.join(", ")})`);
  }
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of L.keadaanStory(a, i, 9999)) if (o.t === "teks") cek(typeof o.isi === "string" && o.isi.length > 0 && ![...o.isi].some((c) => c.codePointAt(0) > 0x1fa95), `${v.id}/${a.id}#${i + 1}: teks ${o.id} berisi dan emoji sah`);
  const pbc = readFileSync(new URL("../src/components/modul/video-k4b6a.tsx", import.meta.url), "utf8");
  cek(/VIDEO_MATERI_K4B6A/.test(pbc) && /VIDEO_LUAR_K4B6A/.test(pbc) && /export function VideoK4B6A/.test(pbc) && /jedaAntarParagrafMs=\{SUARA_SERAGAM\.jedaAntarParagrafMs\}/.test(pbc) && !/\r/.test(pbc) && !pbc.startsWith("﻿") && !/data-k4b6|naskah-k4b6|skenario-k4b6/.test(pbc), "video-k4b6a.tsx memakai dua video Story dan jeda seragam");
}

for (const v of VIDEO) {
  const n = v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit)`);
}
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
