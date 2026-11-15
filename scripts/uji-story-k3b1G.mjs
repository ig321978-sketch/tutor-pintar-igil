// Uji Story Kelas 3 Bab 1 Sub-Bab G (Pembagian Bilangan Cacah sampai 100): dua video (materi kurikulum dan metode luar) dengan mesin animasi Story.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar (nama metode hanya Indonesia),
// dan HITUNG ULANG dari struktur adegan: benda di tiap bagian (bagi rata: bilangan yang dibagi = benda, pembagi = bagian, hasil bagi = benda per bagian), langkah kurang berulang
// (berantai sampai nol, banyak langkah = hasil bagi, benda sisa), loncatan garis bilangan mundur (letak panah), susunan titik (baris x kolom), istilah (yang dibagi, pembagi, hasil bagi),
// keluarga fakta (empat kalimat dari tiga bilangan), klaim lisan (tokoh dapat berapa, sebanyak berapa kali, hitungan lisan), jawaban latihan (satu pilihan benar dan disorot), isi tabel susun,
// dan emoji paling tinggi Emoji 12. Kata "kelompok" tidak dipakai.
// Jalankan: node --no-warnings scripts/uji-story-k3b1G.mjs
import { readFileSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k3b1G-video.ts");
const U1 = await import("../src/components/modul/story/k3b1G-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K3B1G, V.VIDEO_LUAR_K3B1G];
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

/* ------------------------------ Pemisahan materi dan metode luar ------------------------------ */
const M_VIDEO = V.VIDEO_MATERI_K3B1G;
const U = V.VIDEO_LUAR_K3B1G;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /Bagi Rata|Kurang Berulang|Keluarga Fakta|metode luar|metode dari luar/i;
const NAMA_INGGRIS = /Fair Share|Repeated Subtraction|Fact Family|Equal Groups|Skip Counting|Singapore Math|Van de Walle/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar ");
  for (const m of U1.NAMA_METODE_ID) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE_ID, ["Bagi Rata", "Kurang Berulang", "Keluarga Fakta"], "nama Indonesia metode luar (namaId data)");
  cek(!NAMA_INGGRIS.test(materi) && !NAMA_INGGRIS.test(luar), "nama metode hanya bahasa Indonesia (tanpa Fair Share, Repeated Subtraction, Fact Family)");
  const TERLARANG = /buku|panduan guru|hlm|halaman|rubrik|salah ketik|salah cetak|tambahan video|contoh video|temuan|pertemuan|loker|ibu guru|singapura/i;
  for (const v of [M_VIDEO, U]) {
    cek(!TERLARANG.test(`${v.judul} ${v.subjudul}`), `${v.id}: judul dan subjudul video tanpa kata terlarang`);
    cek(!/nomor|no\./i.test(v.subjudul) && v.subjudul.length <= 40, `${v.id}: subjudul pendek tanpa nomor halaman`);
    for (const a of v.adegan) {
      const semua = [a.judul, a.sumber];
      a.ketukan.forEach((kt, i) => {
        semua.push(kt.suara);
        for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) semua.push(...L.teksTerlihat(L.keadaanStory(a, i, p)));
      });
      const kena = semua.filter((t) => TERLARANG.test(t) || /soal nomor|Latihan 3\.[1-4]|nomor [1-9]|catatan video|menurut buku/i.test(t));
      cek(kena.length === 0, `${v.id}/${a.id}: tanpa penyebutan buku atau catatan sumber (${kena.slice(0, 2).join(" | ")})`);
      cek(!/Uji Kompetensi|Pengayaan|Ayo Berlatih|Ayo Berdiskusi|Ayo Berefleksi|Ayo Mengingat|Ayo Berkomunikasi|Ayo Berpikir|Ayo Berkarya|Ayo Bermain|Ayo Mencoba|soal \d|Soal \d|Eksplorasi|Refleksi/.test(semua.join(" | ")), `${v.id}/${a.id}: latihan disajikan sebagai Latihan, tanpa istilah buku`);
      // Tokoh hanya enam tokoh tetap (Malosi, Kira, Upe, Wei, Halim, Igil): tanpa nama lain dari data sumber.
      cek(!/\b(Tika|Lili|Paman|Ibu|Ayah|Bapak|Budi|Ani|Doni|Sinta|Dewi|Rudi|Nina|Andi|Siti|Bu Guru|Pak Guru|Pak|Ahmad|Alfa|Galih|Alen|Meutia|Bandi|Pramuka)\b/.test(semua.join(" | ")), `${v.id}/${a.id}: hanya enam tokoh tetap`);
      cek(semua.every((t) => ![...t].some((c) => c.codePointAt(0) > 0x1fa95)), `${v.id}/${a.id}: emoji paling tinggi Emoji 12`);
    }
  }
  cek(M_VIDEO.subjudul === "Materi kurikulum" && U.subjudul === "Tiga metode luar", "subjudul video: Materi kurikulum dan Tiga metode luar");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46), "video materi: label sumber berbentuk Materi: ... dan pendek");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "video metode luar: label sumber metode luar atau ringkasan, pendek");
  cek(M_VIDEO.id === "k3b1G-materi" && U.id === "k3b1G-luar", "id video k3b1G-materi dan k3b1G-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,cerita-biskuit,bagi-rata-jeruk,sama-banyak,kurang-dua-belas,garis-mundur,kurang-lima-belas,nama-bilangan,titik-kali-bagi,kali-dan-bagi,contoh-dua-delapan,dibagi-satu,dibagi-sama,soal-cerita,latihan-satu,latihan-dua,latihan-tiga,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-bagi,luar-bagi-terapan,luar-kurang,luar-kurang-terapan,luar-fakta,luar-fakta-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 3 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 3 lalu penutup");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  cek(U.adegan.length - 3 === 6, "video metode luar: konsep dan penerapan untuk tiga metode (6 adegan di antara pembuka dan ringkasan)");
  for (const kata of ["Latihan", "Igil", "Halim", "Kira", "Wei", "Upe", "Malosi", "membagi", "pembagian", "dibagi", "pembagi", "hasil bagi", "bilangan yang dibagi", "mengurangi berulang", "sama banyak", "dikali", "perkalian", "biskuit", "jeruk", "apel", "kelereng", "bintang", "bunga", "garis bilangan", "titik", "dibagi satu", "soal cerita", "berpasangan"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Batas bab: operasi sampai seratus, tanpa satuan baku, rumus, pecahan, ribuan.
  const BOCOR = /kilogram|\bgram\b|\bkg\b|rumus|ribu|\bratus|÷|\bmeter\b|\bliter\b|pecahan|desimal/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa satuan baku, rumus, pecahan, ribuan`);
    for (const a of v.adegan) for (const i of a.ketukan.keys()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 100, `${v.id}/${a.id}#${i + 1}: angka di gambar paling besar seratus ("${t}")`);
  }
  const ketMateri = M_VIDEO.adegan.reduce((t, ad) => t + ad.ketukan.length, 0);
  cek(totalKetukan >= 70 && ketMateri >= 70, `total ketukan cukup dalam (${totalKetukan}; materi ${ketMateri})`);
  const kataMateri = kataVideo(M_VIDEO);
  cek(kataMateri / 120 >= 8 && kataMateri / 120 <= 13, `durasi materi diputar 8 sampai 13 menit (${(kataMateri / 120).toFixed(1)} menit)`);
  cek(kataVideo(U) / 120 >= 3, `durasi video luar paling sedikit 3 menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
}

/* ------------------------------ Pembagian dihitung ulang dari struktur adegan ------------------------------ */
const G = await import("../src/components/modul/story/k3b1G-gambar.ts");
const NAMA_ANAKX = G.NAMA_ANAK;
const stat = { benda: 0, bagian: 0, hitungan: 0, kb: 0, kbLengkap: 0, gm: 0, titik: 0, istilah: 0, keluarga: 0, klaim: 0, pilihan: 0, jawaban: 0, tabel: 0, tie: 0 };
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const U9 = "satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan";
const NILAI9 = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
const NUMW = `(?:seratus|sepuluh|sebelas|(?:${U9}) belas|(?:${U9}) puluh(?: (?:${U9}))?|${U9}|nol)(?![a-z])`;
const nilaiKata = (s) => {
  const t = s.toLowerCase().trim();
  if (t === "nol") return 0;
  if (t === "seratus") return 100;
  if (t === "sepuluh") return 10;
  if (t === "sebelas") return 11;
  let m = /^(\w+) belas$/.exec(t);
  if (m) return 10 + NILAI9[m[1]];
  m = /^(\w+) puluh(?: (\w+))?$/.exec(t);
  if (m) return 10 * NILAI9[m[1]] + (m[2] ? NILAI9[m[2]] : 0);
  return NILAI9[t] ?? null;
};
const BENDA_NAMA = Object.keys(G.EMO);
cek(BENDA_NAMA.length >= 6 && Object.values(G.EMO).every((e) => ![...e].some((c) => c.codePointAt(0) > 0x1fa95)), "emoji benda paling tinggi Emoji 12");

const bacaBenda = (objs) => {
  const peta = new Map();
  for (const o of objs) {
    const m = /^b-([a-z]+)-(\d+)$/.exec(o.id);
    if (m) {
      if (!peta.has(m[1])) peta.set(m[1], []);
      peta.get(m[1]).push({ i: Number(m[2]), o });
    }
  }
  for (const v of peta.values()) v.sort((p, q) => p.i - q.i);
  return peta;
};
/** Bagian penerima: kotak gr-g, nama gn-g, jumlah bj-g; benda di dalam kotak dihitung dari letaknya. */
const bacaBagian = (objs, benda) => {
  const out = [];
  for (let g = 0; ; g += 1) {
    const kt = ketemu(objs, `gr-${g}`);
    if (!kt) break;
    const semuaBenda = [...benda.values()].flat();
    const dalam = semuaBenda.filter((b) => b.o.x >= kt.x && b.o.x <= kt.x + kt.w && b.o.y - 5 >= kt.y && b.o.y - 5 <= kt.y + kt.h);
    out.push({ g, kt, nama: ketemu(objs, `gn-${g}`)?.isi, bj: ketemu(objs, `bj-${g}`), dalam });
  }
  return out;
};
const hitungAritm = (s) => {
  const m = /^(\d+) ([:×−+-]) (\d+) = (\d+)$/.exec(s);
  if (!m) return null;
  const a = Number(m[1]);
  const b = Number(m[3]);
  const c = Number(m[4]);
  const op = m[2];
  const ok = op === ":" ? b !== 0 && a === b * c : op === "×" ? a * b === c : op === "+" ? a + b === c : a - b === c;
  return { a, b, c, op, ok };
};

for (const v of VIDEO) {
  for (const a of v.adegan) {
    a.ketukan.forEach((kt, i) => {
      const objs = akhirAdegan(a, i);
      const nm = `${v.id}/${a.id}#${i + 1}`;
      const t = kt.suara.toLowerCase();
      const benda = bacaBenda(objs);
      const bagian = bacaBagian(objs, benda);
      const teksObj = objs.filter((o) => o.t === "teks" && o.isi);
      const angkaTampak = new Set(teksObj.flatMap((o) => bilanganDari(o.isi)).map(Number));
      const semuaHitungan = teksObj.map((o) => ({ o, r: hitungAritm(o.isi) })).filter((q) => q.r);
      const kuosien = new Set(semuaHitungan.filter((q) => q.r.op === ":").map((q) => q.r.c));
      const totalBenda = [...benda.values()].reduce((p, q) => p + q.length, 0);

      /* 1) Benda: gambar sesuai jenis, bernomor berurutan, label banyak benda cocok. */
      for (const [nama, daftar] of benda) {
        stat.benda += 1;
        cek(G.EMO[nama] !== undefined && daftar.every((q) => q.o.isi === G.EMO[nama]), `${nm}: gambar benda ${nama} sesuai jenisnya`);
        cek(new Set(daftar.map((q) => q.i)).size === daftar.length, `${nm}: nomor benda ${nama} unik`);
      }
      /* 2) Bagian penerima: banyak di tiap kotak, label banyak, kotak tidak tumpang tindih, tiap benda paling banyak di satu kotak. */
      if (bagian.length) {
        stat.bagian += 1;
        for (const q of bagian) {
          cek(!!q.nama && NAMA_ANAKX.includes(q.nama), `${nm}: nama bagian ${q.g} adalah tokoh tetap (${q.nama})`);
          if (q.bj) cek(Number(q.bj.isi) === q.dalam.length, `${nm}: banyak di bagian ${q.nama} (${q.bj.isi}) sama dengan benda di dalam kotak (${q.dalam.length})`);
        }
        const sekali = new Set();
        for (const q of bagian) for (const b of q.dalam) {
          cek(!sekali.has(b.o.id), `${nm}: benda ${b.o.id} hanya di satu kotak`);
          sekali.add(b.o.id);
        }
        cek(new Set(bagian.map((q) => q.nama)).size === bagian.length, `${nm}: nama bagian berbeda`);
      }
      const semuaDibagi = bagian.length > 0 && benda.size === 1 && totalBenda > 0 && bagian.reduce((p, q) => p + q.dalam.length, 0) === totalBenda;
      const sama_banyak = semuaDibagi && new Set(bagian.map((q) => q.dalam.length)).size === 1;
      const perBagian = semuaDibagi ? bagian[0].dalam.length : null;
      /* 3) Hitungan tertulis benar; hb diperiksa terhadap benda dan bagian, susunan titik, kurang berulang, atau garis bilangan. */
      for (const q of semuaHitungan) {
        stat.hitungan += 1;
        cek(q.r.ok, `${nm}: hitungan "${q.o.isi}" benar`);
      }
      const hb = semuaHitungan.find((q) => q.o.id === "hb");
      if (hb && semuaDibagi) {
        stat.tie += 1;
        cek(hb.r.op === ":" && hb.r.a === totalBenda && hb.r.b === bagian.length && sama_banyak && hb.r.c === perBagian, `${nm}: "${hb.o.isi}" cocok dengan ${totalBenda} benda, ${bagian.length} bagian, masing-masing ${perBagian}`);
      }
      /* 4) Kurang berulang: langkah berantai sampai nol, benda sisa sama dengan hasil langkah terakhir, ringkasan dan hitungan bagi cocok. */
      const langkah = [];
      for (let s = 1; ; s += 1) {
        const o = ketemu(objs, `kb-${s}`);
        if (!o) break;
        const r = hitungAritm(o.isi);
        langkah.push(r);
      }
      if (langkah.length) {
        stat.kb += 1;
        cek(langkah.every((r) => r && r.op === "−" && r.ok), `${nm}: tiap langkah kurang berulang berbentuk a − b = c yang benar`);
        const b0 = langkah[0].b;
        cek(langkah.every((r, q) => r.b === b0 && (q === 0 || r.a === langkah[q - 1].c)), `${nm}: langkah kurang berulang berantai dengan pengurang tetap`);
        const lengkap = langkah[langkah.length - 1].c === 0;
        if (lengkap) stat.kbLengkap += 1;
        if (totalBenda > 0 && benda.size === 1) cek(totalBenda === langkah[langkah.length - 1].c, `${nm}: benda yang tersisa (${totalBenda}) sama dengan hasil langkah terakhir (${langkah[langkah.length - 1].c})`);
        const kn = ketemu(objs, "kb-n");
        if (kn) {
          const m = /^dikurangi (\d+) sebanyak (\d+) kali$/.exec(kn.isi);
          cek(!!m && Number(m[1]) === b0 && Number(m[2]) === langkah.length && lengkap, `${nm}: ringkasan "${kn.isi}" cocok dengan langkah (${b0} sebanyak ${langkah.length}, selesai di nol)`);
        }
        if (hb && !semuaDibagi && lengkap) cek(hb.r.op === ":" && hb.r.a === langkah[0].a && hb.r.b === b0 && hb.r.c === langkah.length, `${nm}: "${hb.o.isi}" cocok dengan ${langkah.length} langkah kurang ${b0} dari ${langkah[0].a}`);
      }
      /* 5) Garis bilangan mundur: loncatan dihitung dari letak panah. */
      {
        const lompat = [];
        for (let s = 1; ; s += 1) {
          const h = ketemu(objs, `gm-h${s}`);
          if (!h) break;
          const dari = (h.x - G.GM.x0) / G.GM.dx;
          const ke = (h.x + h.x2 - G.GM.x0) / G.GM.dx;
          lompat.push({ dari, ke, h, label: ketemu(objs, `gm-j${s}`)?.isi });
        }
        const angka = objs.filter((o) => /^gm-l\d+$/.test(o.id));
        if (angka.length) {
          stat.gm += 1;
          const maks = Math.max(...angka.map((o) => Number(o.isi)));
          cek(angka.every((o) => Math.abs(o.x - G.xGm(Number(o.isi))) < 0.01) && angka.length === maks + 1, `${nm}: angka garis bilangan 0 sampai ${maks} di tempatnya`);
          cek(lompat.every((l) => Number.isInteger(Math.round(l.dari * 1000) / 1000) && Math.abs(l.dari - Math.round(l.dari)) < 0.01 && Math.abs(l.ke - Math.round(l.ke)) < 0.01), `${nm}: loncatan jatuh tepat pada angka`);
          if (lompat.length) {
            const b0 = Math.round(lompat[0].dari - lompat[0].ke);
            cek(lompat.every((l, q) => Math.round(l.dari - l.ke) === b0 && l.label === `−${b0}` && (q === 0 ? Math.round(l.dari) === maks : Math.round(l.dari) === Math.round(lompat[q - 1].ke))), `${nm}: loncatan berantai dari ${maks}, sebesar ${b0}`);
          }
          const p = ketemu(objs, "gm-p");
          cek(!!p && Math.abs(p.x - G.xGm(lompat.length ? Math.round(lompat[lompat.length - 1].ke) : maks)) < 0.01, `${nm}: titik berada di ujung loncatan terakhir`);
          const gn = ketemu(objs, "gm-n");
          if (gn) cek(Number(/^(\d+) loncatan$/.exec(gn.isi)?.[1]) === lompat.length && Math.round(lompat[lompat.length - 1].ke) === 0, `${nm}: "${gn.isi}" sama dengan banyak loncatan (${lompat.length}) dan berhenti di nol`);
          if (hb && lompat.length && Math.round(lompat[lompat.length - 1].ke) === 0) cek(hb.r.a === maks && hb.r.b === Math.round(lompat[0].dari - lompat[0].ke) && hb.r.c === lompat.length, `${nm}: "${hb.o.isi}" cocok dengan ${lompat.length} loncatan sebesar ${Math.round(lompat[0].dari - lompat[0].ke)} dari ${maks}`);
        }
        // Klaim suara tentang loncatan.
        for (const m of t.matchAll(new RegExp(`(${NUMW}) loncatan`, "g"))) {
          stat.klaim += 1;
          cek(lompat.length === nilaiKata(m[1]), `${nm}: "${m[0]}" sama dengan banyak panah (${lompat.length})`);
        }
        for (const m of t.matchAll(new RegExp(`mundur (${NUMW})`, "g"))) {
          stat.klaim += 1;
          cek(lompat.length > 0 && lompat.every((l) => Math.round(l.dari - l.ke) === nilaiKata(m[1])), `${nm}: "${m[0]}" sama dengan panjang loncatan`);
        }
        for (const m of t.matchAll(new RegExp(`sampai di (${NUMW})`, "g"))) {
          stat.klaim += 1;
          cek(lompat.some((l) => Math.round(l.ke) === nilaiKata(m[1])), `${nm}: "${m[0]}" adalah ujung salah satu loncatan`);
        }
      }
      /* 6) Susunan titik: baris x kolom, tulisan baris dan kolom, dan hitungan terhadap susunan. */
      {
        const dots = objs.filter((o) => /^dot-\d+-\d+$/.test(o.id)).map((o) => ({ r: Number(o.id.split("-")[1]), c: Number(o.id.split("-")[2]) }));
        if (dots.length) {
          stat.titik += 1;
          const baris = Math.max(...dots.map((d) => d.r)) + 1;
          const kolom = Math.max(...dots.map((d) => d.c)) + 1;
          cek(dots.length === baris * kolom, `${nm}: titik ${dots.length} = ${baris} baris x ${kolom} kolom`);
          const ab = ketemu(objs, "ar-b");
          if (ab) cek(Number(/^(\d+) baris$/.exec(ab.isi)?.[1]) === baris, `${nm}: tulisan "${ab.isi}" sama dengan banyak baris (${baris})`);
          const ak = ketemu(objs, "ar-k");
          if (ak) cek(Number(/^tiap baris (\d+)$/.exec(ak.isi)?.[1]) === kolom, `${nm}: tulisan "${ak.isi}" sama dengan isi tiap baris (${kolom})`);
          for (const q of semuaHitungan.filter((z) => ["hb", "hb2", "pr"].includes(z.o.id))) {
            const r = q.r;
            if (r.op === ":") cek(r.a === dots.length && ((r.b === baris && r.c === kolom) || (r.b === kolom && r.c === baris)), `${nm}: "${q.o.isi}" cocok dengan susunan ${baris} x ${kolom}`);
            else if (r.op === "×") cek(((r.a === baris && r.b === kolom) || (r.a === kolom && r.b === baris)) && r.c === dots.length, `${nm}: "${q.o.isi}" cocok dengan susunan ${baris} x ${kolom}`);
          }
        }
      }
      /* 7) Istilah: bilangan yang dibagi, pembagi, hasil bagi. */
      {
        const ia = ketemu(objs, "ist-a");
        const ib = ketemu(objs, "ist-b");
        const ic = ketemu(objs, "ist-c");
        if (ia && ib && ic) {
          stat.istilah += 1;
          const a = Number(ia.isi);
          const b = Number(ib.isi);
          const c = Number(ic.isi);
          cek(b !== 0 && a === b * c, `${nm}: istilah ${a} : ${b} = ${c} benar`);
          for (const [h, nama] of [["a", "yang dibagi"], ["b", "pembagi"], ["c", "hasil bagi"]]) {
            const lb = ketemu(objs, `ist-l${h}`);
            if (lb) cek(lb.isi === nama && Math.abs(lb.x - G.XI[h]) < 0.01, `${nm}: nama ${nama} di bawah bilangannya`);
          }
          const pr = semuaHitungan.find((z) => z.o.id === "pr");
          if (pr) cek(pr.r.op === "×" && pr.r.c === a && [b, c].sort().join() === [pr.r.a, pr.r.b].sort().join(), `${nm}: periksa "${pr.o.isi}" memakai ${c} dan ${b} menghasilkan ${a}`);
          for (const m of t.matchAll(new RegExp(`(${NUMW}) adalah (bilangan yang dibagi|pembagi|hasil bagi)`, "g"))) {
            stat.klaim += 1;
            cek(nilaiKata(m[1]) === (m[2] === "pembagi" ? b : m[2] === "hasil bagi" ? c : a), `${nm}: "${m[0]}" sesuai ${a} : ${b} = ${c}`);
          }
        }
      }
      /* 8) Keluarga: tiga bilangan dan empat kalimat kali dan bagi. */
      {
        const kfn = [1, 2, 3].map((q) => ketemu(objs, `kfn-${q}`)).filter(Boolean);
        const kf = [1, 2, 3, 4].map((q) => ({ q, o: ketemu(objs, `kf${q}-t0`) })).filter((z) => z.o);
        if (kfn.length === 3) {
          stat.keluarga += 1;
          const [p, q, z] = kfn.map((o) => Number(o.isi));
          cek(p * q === z, `${nm}: tiga bilangan ${p}, ${q}, ${z} membentuk keluarga (${p} x ${q} = ${z})`);
          const harap = [`${p} × ${q} = ${z}`, `${q} × ${p} = ${z}`, `${z} : ${p} = ${q}`, `${z} : ${q} = ${p}`];
          for (const w of kf) cek(w.o.isi === harap[w.q - 1], `${nm}: kalimat ${w.q} adalah "${harap[w.q - 1]}" (ada "${w.o.isi}")`);
          if (kf.length === 4) cek(new Set(kf.map((w) => w.o.isi)).size === 4, `${nm}: empat kalimat keluarga berbeda`);
        }
        for (const w of kf) cek(!!hitungAritm(w.o.isi)?.ok, `${nm}: kalimat keluarga "${w.o.isi}" benar`);
      }
      /* 9) Klaim di suara dihitung ulang: hitungan lisan, banyak langkah, bagian tokoh, banyak benda, bagian sama banyak. */
      const bilLisan = [...t.matchAll(new RegExp(NUMW, "g"))].map((m) => nilaiKata(m[0]));
      for (const m of t.matchAll(new RegExp(`(${NUMW}) (dibagi|kali|dikurangi|ditambah) (${NUMW}) (?:sama dengan|hasilnya) (${NUMW})`, "g"))) {
        stat.klaim += 1;
        const x = nilaiKata(m[1]);
        const y = nilaiKata(m[3]);
        const z = nilaiKata(m[4]);
        const op = m[2];
        const benar = op === "dibagi" ? y !== 0 && x === y * z : op === "kali" ? x * y === z : op === "dikurangi" ? x - y === z : x + y === z;
        cek(benar, `${nm}: kalimat lisan "${m[0]}" benar`);
        cek([x, y, z].every((n) => angkaTampak.has(n)), `${nm}: bilangan di "${m[0]}" tampak di gambar sebagai angka`);
      }
      for (const m of t.matchAll(new RegExp(`sebanyak (${NUMW}) kali`, "g"))) {
        stat.klaim += 1;
        cek(langkah.length > 0 && langkah.length === nilaiKata(m[1]) && langkah[langkah.length - 1].c === 0, `${nm}: "${m[0]}" sama dengan banyak langkah (${langkah.length})`);
      }
      for (const m of t.matchAll(new RegExp(`\\b(malosi|kira|upe|wei|halim|igil)(?: juga)? (?:dapat|mendapat|menerima) (${NUMW})`, "g"))) {
        stat.klaim += 1;
        const q = bagian.find((z) => z.nama?.toLowerCase() === m[1]);
        cek(!!q && q.dalam.length === nilaiKata(m[2]), `${nm}: "${m[0]}" sama dengan benda di bagian ${m[1]} (${q?.dalam.length})`);
      }
      for (const m of t.matchAll(new RegExp(`(?:tiap|setiap|masing-masing)(?: [a-z]+){0,2} (?:dapat|mendapat|menerima) (${NUMW})`, "g"))) {
        stat.klaim += 1;
        if (bagian.length) cek(semuaDibagi && sama_banyak && perBagian === nilaiKata(m[1]), `${nm}: "${m[0]}" sama dengan banyak benda per bagian (${perBagian})`);
        else cek(kuosien.has(nilaiKata(m[1])), `${nm}: "${m[0]}" sama dengan hasil bagi di gambar (${[...kuosien].join(",")})`);
      }
      for (const m of t.matchAll(new RegExp(`(?:punya|mempunyai) (${NUMW}) (${BENDA_NAMA.join("|")})`, "g"))) {
        stat.klaim += 1;
        const n = benda.get(m[2])?.length ?? 0;
        if (n > 0) cek(n === nilaiKata(m[1]), `${nm}: "${m[0]}" sama dengan benda di gambar (${n})`);
      }
      for (const m of t.matchAll(new RegExp(`hasil baginya (?:adalah )?(${NUMW})`, "g"))) {
        stat.klaim += 1;
        const kn = ketemu(objs, "kb-n");
        const n = kn ? Number(/sebanyak (\d+) kali/.exec(kn.isi)?.[1]) : null;
        cek(kuosien.has(nilaiKata(m[1])) || n === nilaiKata(m[1]), `${nm}: "${m[0]}" sama dengan hasil bagi di gambar`);
      }
      /* 10) Pilihan jawaban: satu benar dan disorot, dihitung dari gambar. */
      {
        const cp = [1, 2, 3].map((q) => ({ t: ketemu(objs, `c${q}-t`)?.isi, s: ketemu(objs, `c${q}-k`)?.sorot, id: `c${q}-k` })).filter((c) => c.t !== undefined);
        if (cp.length) {
          stat.pilihan += 1;
          cek(new Set(cp.map((c) => c.t)).size === cp.length && cp.length >= 2, `${nm}: pilihan jawaban berbeda (${cp.map((c) => c.t).join(", ")})`);
          const dipilih = cp.filter((c) => c.s);
          cek(/^betul/.test(t) ? dipilih.length === 1 : dipilih.length === 0, `${nm}: jawaban disorot tepat pada ketukan "Betul!"`);
          const tanya = ketemu(objs, "tanya")?.isi ?? "";
          cek(tanya.length > 0, `${nm}: pertanyaan tampil bersama pilihan`);
          let nilai = null;
          let m;
          if ((m = /^(\d+) : (\d+) = \?$/.exec(tanya))) nilai = Number(m[1]) % Number(m[2]) === 0 ? Number(m[1]) / Number(m[2]) : null;
          else if ((m = /^\? × (\d+) = (\d+)$/.exec(tanya))) nilai = Number(m[2]) % Number(m[1]) === 0 ? Number(m[2]) / Number(m[1]) : null;
          else if ((m = /^pembagi pada (\d+) : (\d+) = (\d+)\?$/.exec(tanya))) nilai = Number(m[1]) === Number(m[2]) * Number(m[3]) ? Number(m[2]) : null;
          else if (tanya === "tiap bagian dapat berapa?") nilai = bagian.length > 0 && totalBenda % bagian.length === 0 ? totalBenda / bagian.length : null;
          const benar = cp.filter((c) => Number(c.t) === nilai);
          cek(nilai !== null && benar.length === 1, `${nm}: tepat satu pilihan benar untuk "${tanya}" (${nilai})`);
          if (benar.length === 1) {
            stat.jawaban += 1;
            if (dipilih.length === 1) cek(dipilih[0].id === benar[0].id, `${nm}: jawaban yang disorot "${dipilih[0].t}" sama dengan hitungan ulang "${nilai}"`);
            if (/^betul/.test(t)) cek(bilLisan.includes(nilai), `${nm}: suara menyebut jawaban benar (${nilai})`);
          }
        }
      }
    });
  }
}

console.log(`Pemeriksaan: ${stat.benda} kelompok benda, ${stat.bagian} keadaan bagian, ${stat.tie} hitungan dicocokkan dengan benda dan bagian, ${stat.hitungan} hitungan tertulis, ${stat.kb} keadaan kurang berulang (${stat.kbLengkap} selesai di nol), ${stat.gm} garis bilangan, ${stat.titik} susunan titik, ${stat.istilah} istilah, ${stat.keluarga} keluarga, ${stat.klaim} klaim di suara, ${stat.pilihan} pilihan, ${stat.jawaban} jawaban`);
for (const [nama, batas] of [["benda", 50], ["bagian", 30], ["tie", 6], ["hitungan", 80], ["kb", 20], ["kbLengkap", 6], ["gm", 5], ["titik", 5], ["istilah", 5], ["keluarga", 8], ["klaim", 80], ["pilihan", 12], ["jawaban", 6]]) cek(stat[nama] >= batas, `uji menjalankan cukup banyak pemeriksaan ${nama} (${stat[nama]} >= ${batas})`);

/* ------------------------------ Aturan pemilik ------------------------------ */
{
  // "kelompok" hanya boleh sebagai istilah matematika; di sub-bab ini tidak dipakai sama sekali.
  const MANDIRI = /kerja kelompok|berkelompok|secara berkelompok|diskusi kelompok|sekelompok|kelompokmu|kelompok belajar|bersama kelompok|\bkelompok\b|tanya teman|survei|karet gelang|uang tabungan|uang logam|\bpaman\b|\btika\b|\bteman\w*|\bkawan\w*|sekawan|sahabat|depan kelas|bersama kelas|seluruh kelas|\bkelas\b|berpasangan dengan (teman|kawan)|bekerja berpasangan|secara berpasangan|bermain bersama|bertanya kepada|buat ceritamu|buku|menulis di|menuliskan di|tulis di|tuliskan di|menulis|menggambar|gambarlah|gambar sendiri|\bbawa(lah)?\b|membawa|dibawa|\bkertas\b|\bpensil\b|\bpulpen\b|\bspidol\b|\bgunting\b|ambil (benda|pensil|kelereng|bola|sedotan|balon|kerucut|kubus)|\bjari\b|menyuruh|suruh|jengkal|telapak|\bdepa\b|penggaris|\bkoin\b|di sekitar|di rumah|di kelas|centimeter|\bmeter\b|kakimu|tanganmu|badanmu|\braba\w*|\bmeraba|\btubuh|\blengan|lingkari|guru kelas|orang tua|\bayah\b|\bibu\b|bapak guru|\bloker\b|singapura|\bmeja\b|di sekitarmu|\brumah\b|\bpisau\b|dua tangan|tangan (kiri|kanan)|angkat|mengangkat|\bkantin|\blidi\b|kelas tiga|presentasi|mempresentasikan|\bketua\b|\banggota\b|toples|wadah|manik|kerikil|kaleng|gelas|pramuka|\bpak\b/i;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      const semua = [a.judul, a.sumber];
      a.ketukan.forEach((kt, i) => {
        semua.push(kt.suara);
        semua.push(...L.teksTerlihat(L.keadaanStory(a, i, 9999)));
      });
      const kena = semua.filter((t) => MANDIRI.test(t) || /\bLili\b/.test(t));
      cek(kena.length === 0, `${v.id}/${a.id}: narasi mandiri dan digital, tanpa teman, kelas, buku, kertas, pensil, ketua, anggota, wadah, atau tokoh di luar enam (${kena.slice(0, 2).join(" | ")})`);
    }
  }
}

/* ------------------------------ Sapaan, peta susun, dan tabel susun ------------------------------ */
{
  const sap = adegan(M_VIDEO, "sapaan");
  const DAFTAR = ["Membagi sama banyak", "Mengurangi berulang", "Hubungan kali dan bagi"];
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Membagi sama banyak/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => DAFTAR.includes(t)), DAFTAR, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara) && !/\d/.test(DAFTAR.join(" ")), "sapaan materi: tanpa angka");
  const sapLuar = adegan(U, "sapaan");
  cek(/cara lain/i.test(L.teksTerlihat(akhirAdegan(sapLuar, 1)).join(" | ")) && /metode-luar|Metode luar/.test(sapLuar.sumber), "sapaan metode luar: pengumuman cara lain");
  const ringkasBerkas = new URL("../src/data/kelas3-bab1-ringkas.json", import.meta.url);
  const sumberRingkas = existsSync(ringkasBerkas) ? JSON.parse(readFileSync(ringkasBerkas, "utf8")).subBab?.G : null;
  const sementara = new URL("../.tmp-k3b1s/G.json", import.meta.url);
  const A = sumberRingkas?.petaSusun && sumberRingkas?.tabelSusun ? sumberRingkas : existsSync(sementara) ? JSON.parse(readFileSync(sementara, "utf8")) : null;
  if (A) {
    const peta = A.petaSusun.simpul;
    const anak = (id) => peta.filter((s) => s.induk === id).map((s) => s.teks);
    const akar = peta.filter((s) => s.induk === null);
    cek(akar.length === 3, "peta susun: tiga cabang dari pusat");
    sama(anak(akar[0].id), DAFTAR, "peta susun: cabang pertama sama dengan daftar sapaan");
    sama([anak(akar[1].id).length, anak(akar[2].id).length, peta.length], [3, 2, 11], "peta susun: 3 cara, 2 hasil, 11 simpul");
    sama(peta.map((s) => s.nomor), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], "peta susun: nomor 1 sampai 11");
    cek(peta.every((s) => s.teks.length <= 28) && new Set(peta.map((s) => s.teks)).size === peta.length, "peta susun: teks <= 28 huruf dan unik");
    cek(A.petaSusun.pusat.judul.length <= 28, "peta susun: judul pusat <= 28 huruf");
    cek(!/\d/.test(A.petaSusun.pusat.suara) && !/\d/.test(A.petaSusun.petunjuk) && peta.every((s) => !/\d/.test(s.petunjuk ?? "")), "peta susun: suara dan petunjuk tanpa digit");
    cek(A.petaSusun.pusat.judul.length > 8 && /\?$/.test(A.petaSusun.pusat.judul), "peta susun: pusat berupa masalah (pertanyaan) sub-bab");
    const T = A.tabelSusun;
    cek(T.baris.length >= 3 && T.baris.length <= 5 && T.kolom.length >= 3 && T.kolom.length <= 4, "tabel susun: 3 sampai 5 baris dan 3 sampai 4 kolom");
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 26 && (s.match(/\d+/g) ?? []).length <= 1)), "tabel susun: sel <= 26 huruf dan paling banyak satu angka per sel");
    cek(T.baris.every((b) => b.label.split(/\s+/).every((w) => w.length <= 8)), "tabel susun: kata terpanjang kolom label <= 8 huruf");
    cek(!/\d/.test(T.suara) && !/\d/.test(T.petunjuk), "tabel susun: suara dan petunjuk tanpa digit");
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 8)), "tabel susun: sel pendek supaya margin teks >= 5 px di 405 px");
    // Isi tabel dihitung ulang dari keadaan akhir adegan pembagian pada video materi: banyak benda, banyak bagian, banyak per bagian.
    sama(T.kolom, ["Dibagi", "Pembagi", "Hasil bagi"], "tabel susun: kolom dibagi, pembagi, hasil bagi");
    sama(T.baris.map((b) => b.label), ["Biskuit", "Jeruk", "Kelereng", "Bintang"], "tabel susun: baris biskuit, jeruk, kelereng, bintang");
    const SUMBER = { biskuit: "cerita-biskuit", jeruk: "bagi-rata-jeruk", kelereng: "sama-banyak", bintang: "dibagi-sama" };
    for (const b of T.baris) {
      const nama = b.label.toLowerCase();
      const ad = adegan(M_VIDEO, SUMBER[nama]);
      cek(!!ad, `tabel susun: adegan sumber ${b.label} ada`);
      if (!ad) continue;
      const objs = akhirAdegan(ad);
      const benda = bacaBenda(objs);
      const bagian = bacaBagian(objs, benda);
      const total = benda.get(nama)?.length ?? 0;
      const per = bagian.map((q) => q.dalam.length);
      cek(bagian.length > 0 && per.every((n) => n === per[0]) && bagian.reduce((p, q) => p + q.dalam.length, 0) === total, `tabel susun: ${b.label} dibagi sama banyak di adegan sumber`);
      stat.tabel += 1;
      sama(b.sel, [String(total), String(bagian.length), String(per[0])], `tabel susun: baris ${b.label} dihitung ulang dari benda dan bagian`);
    }
    const KATA_LARANG = /buku|halaman|kerja kelompok|berkelompok|\bteman|kawan|kelas\b|kertas|pensil|\bbawa\b|menggambar|menulis|depan kelas|\bluas\b|keliling|di rumah|survei|karet gelang|uang tabungan|di sekitar|\bpaman\b|\btika\b|\blili\b|loker|ibu guru|singapura|fair share|repeated subtraction|fact family|pisau|koin|\brumah\b|\bayah\b|\bibu\b|\bpak\b|\bkantin|\blidi\b|\bketua\b|\banggota\b|toples|wadah|manik/i;
    cek(!KATA_LARANG.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: tanpa kata terlarang dan tanpa nama Inggris, teman, kelas, buku, kertas, pensil, pisau, loker, Ibu guru, ketua, anggota");
    cek(peta.every((s) => ![...s.teks, ...(s.ikon ?? "")].some((c) => c.codePointAt(0) > 0x1fa95)), "peta susun: emoji paling tinggi Emoji 12");
  } else cek(false, "peta dan tabel susun: .tmp-k3b1s/G.json atau kelas3-bab1-ringkas.json subBab.G.petaSusun ada");
}

console.log(`Tabel susun dihitung ulang: ${stat.tabel} baris`);
console.log(`${VIDEO.map((v) => `${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, a) => t + a.ketukan.length, 0)} ketukan, ${kataVideo(v)} kata (sekitar ${(kataVideo(v) / 120).toFixed(1)} menit diputar)`).join("\n")}`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
