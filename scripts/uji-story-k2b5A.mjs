// Uji Story Kelas 2 Bab 5 Sub-Bab A (Setengah dari Benda Utuh): dua video (materi kurikulum dan metode luar) dengan mesin animasi Story.
// Uji Story Kelas 2 Bab 5 Sub-Bab A (Setengah dari Benda Utuh): dua video (materi kurikulum dan metode luar) dengan mesin animasi Story.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar (nama metode hanya Indonesia),
// dan HITUNG ULANG dari struktur adegan (lintasan jalur): luas tiap bagian benda dari rumus tali sepatu, jumlah dua bagian sama dengan benda utuh, dua bagian sama besar atau tidak, garis potong lewat titik tengah,
// pemantulan bagian terhadap garis lipat (pas menumpuk atau menonjol), tinggi air gelas dibanding tinggi gelas, tulisan setengah/bukan setengah/pas pada gambar, kalimat suara yang menyebut setengah,
// jawaban latihan dan terapan (satu pilihan benar dan disorot), isi tabel susun, dan emoji paling tinggi Emoji 12.
// Jalankan: node --no-warnings scripts/uji-story-k2b5A.mjs
import { readFileSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k2b5A-video.ts");
const U1 = await import("../src/components/modul/story/k2b5A-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K2B5A, V.VIDEO_LUAR_K2B5A];
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
const M_VIDEO = V.VIDEO_MATERI_K2B5A;
const U = V.VIDEO_LUAR_K2B5A;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /Setengah Benda Utuh|Bagian Sama(?! besar)|Uji Lipat|metode luar|metode dari luar/i;
const NAMA_INGGRIS = /Halving Whole|Equal Parts|Fold Test|Halving|Singapore Math/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar ");
  for (const m of U1.NAMA_METODE_ID) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE_ID, ["Setengah Benda Utuh", "Bagian Sama", "Uji Lipat"], "nama Indonesia metode luar (namaId data)");
  cek(!NAMA_INGGRIS.test(materi) && !NAMA_INGGRIS.test(luar), "nama metode hanya bahasa Indonesia (tanpa Halving Whole, Equal Parts, Fold Test)");
  const TERLARANG = /buku|panduan guru|hlm|halaman|kunci|rubrik|salah ketik|salah cetak|tambahan video|contoh video|temuan|pertemuan|loker|ibu guru|singapura/i;
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
      cek(!/\b(Tika|Lili|Paman|Ibu|Ayah|Bapak|Budi|Ani|Doni|Sinta|Dewi|Rudi|Nina|Andi|Siti|Bu Guru|Pak Guru)\b/.test(semua.join(" | ")), `${v.id}/${a.id}: hanya enam tokoh tetap`);
    }
  }
  cek(M_VIDEO.subjudul === "Materi kurikulum" && U.subjudul === "Tiga metode luar", "subjudul video: Materi kurikulum dan Tiga metode luar");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46), "video materi: label sumber berbentuk Materi: ... dan pendek");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "video metode luar: label sumber metode luar atau ringkasan, pendek");
  cek(M_VIDEO.id === "k2b5A-materi" && U.id === "k2b5A-luar", "id video k2b5A-materi dan k2b5A-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,cerita-martabak,dua-bagian,tidak-sama,dua-utuh,benda-layar,lingkaran,persegi,lipat-pas,lipat-gagal,gambar-ab,martabak-adil,latihan-satu,latihan-dua,latihan-tiga,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-setengah,luar-setengah-terapan,luar-bagian,luar-bagian-terapan,luar-lipat,luar-lipat-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 3 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 3 lalu penutup");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  cek(U.adegan.length - 3 === 6, "video metode luar: konsep dan penerapan untuk tiga metode (6 adegan di antara pembuka dan ringkasan)");
  for (const kata of ["Latihan", "Igil", "Halim", "Kira", "Wei", "Upe", "Malosi", "martabak", "setengah", "sama besar", "garis potong", "lingkaran", "persegi", "kue bolu", "semangka", "gelas", "pas menumpuk", "menonjol", "bukan setengah", "pecahan", "dua bagian", "utuh"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Setengah dari benda utuh: tanpa luas, keliling, rumus, satuan baku, perkalian, dan bilangan besar ("membagi" dan "dibagi" boleh: pecahan memang membagi).
  const BOCOR = /luas|keliling|rumus|volume|sentimeter|centimeter|\bcm\b|meter|penggaris|ribu|ratus|dikali|perkalian|pembagian|×|÷|−/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa luas, keliling, rumus, satuan baku, perkalian`);
    for (const a of v.adegan) for (const i of a.ketukan.keys()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 20, `${v.id}/${a.id}#${i + 1}: angka di gambar paling besar dua puluh ("${t}")`);
  }
  const ketMateri = M_VIDEO.adegan.reduce((t, ad) => t + ad.ketukan.length, 0);
  cek(totalKetukan >= 70 && ketMateri >= 70, `total ketukan cukup dalam (${totalKetukan}; materi ${ketMateri})`);
  const kataMateri = kataVideo(M_VIDEO);
  cek(kataMateri / 120 >= 8 && kataMateri / 120 <= 13, `durasi materi diputar 8 sampai 13 menit (${(kataMateri / 120).toFixed(1)} menit)`);
  cek(kataVideo(U) / 120 >= 3, `durasi video luar paling sedikit 3 menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
}

/* ------------------------------ Bagian benda dihitung ulang dari lintasan ------------------------------ */
const G = await import("../src/components/modul/story/k2b5A-gambar.ts");
const stat = { grup: 0, sama: 0, tidakSama: 0, jumlah: 0, garis: 0, tengah: 0, lipat: 0, gelas: 0, label: 0, klaim: 0, jawaban: 0, tabel: 0, sisi: 0 };
const titikDari = (o) => {
  const n = bilangan(o.d ?? "");
  const out = [];
  for (let i = 0; i + 1 < n.length; i += 2) out.push([n[i], n[i + 1]]);
  return out;
};
const luas = (p) => Math.abs(p.reduce((t, [x, y], i) => t + x * p[(i + 1) % p.length][1] - p[(i + 1) % p.length][0] * y, 0)) / 2;
const pusatLuas = (p) => {
  let a = 0;
  let cx = 0;
  let cy = 0;
  for (let i = 0; i < p.length; i += 1) {
    const [x1, y1] = p[i];
    const [x2, y2] = p[(i + 1) % p.length];
    const c = x1 * y2 - x2 * y1;
    a += c;
    cx += (x1 + x2) * c;
    cy += (y1 + y2) * c;
  }
  return [cx / (3 * a), cy / (3 * a)];
};
const hampir = (a, b, tol = 0.006) => Math.abs(a - b) <= tol * Math.max(a, b, 1);
const sisiGaris = (a, b, t) => (b[0] - a[0]) * (t[1] - a[1]) - (b[1] - a[1]) * (t[0] - a[0]);
const jarakGaris = (a, b, t) => Math.abs(sisiGaris(a, b, t)) / Math.hypot(b[0] - a[0], b[1] - a[1]);
const pantulUji = (p, a, b) => {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const t = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy);
  return [2 * (a[0] + t * dx) - p[0], 2 * (a[1] + t * dy) - p[1]];
};
/** Irisan dua segi banyak cembung (Sutherland-Hodgman). */
const irisan = (subjek, klip) => {
  let hasil = subjek;
  const arah = klip.reduce((t, [x, y], i) => t + x * klip[(i + 1) % klip.length][1] - klip[(i + 1) % klip.length][0] * y, 0) > 0 ? 1 : -1;
  for (let i = 0; i < klip.length && hasil.length; i += 1) {
    const a = klip[i];
    const b = klip[(i + 1) % klip.length];
    const masuk = (t) => arah * sisiGaris(a, b, t) >= -1e-6;
    const baru = [];
    for (let j = 0; j < hasil.length; j += 1) {
      const p = hasil[j];
      const q = hasil[(j + 1) % hasil.length];
      const sp = arah * sisiGaris(a, b, p);
      const sq = arah * sisiGaris(a, b, q);
      if (masuk(p)) baru.push(p);
      if ((sp > 1e-6 && sq < -1e-6) || (sp < -1e-6 && sq > 1e-6)) {
        const u = sp / (sp - sq);
        baru.push([p[0] + u * (q[0] - p[0]), p[1] + u * (q[1] - p[1])]);
      }
    }
    hasil = baru;
  }
  return hasil;
};
const adaTitik = (p, daftar, tol = 0.35) => daftar.some((q) => Math.hypot(p[0] - q[0], p[1] - q[1]) <= tol);
const sebangunHimpunan = (p, q) => p.length > 0 && p.every((t) => adaTitik(t, q)) && q.every((t) => adaTitik(t, p));
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;

/** Semua benda (jejak) yang pernah muncul sampai ketukan ke-`ke` pada adegan: kunci id, nilai benda terakhir. */
const jejakAdegan = (a, ke) => {
  const m = new Map();
  for (let j = 0; j <= ke; j += 1) for (const o of akhirAdegan(a, j)) m.set(o.id, o);
  return m;
};
/** Kelompok benda ke-n: bagian a, b (atau b dari jejak bila sudah dilipat menjadi c), utuh, garis potong, penanda, tulisan. */
const kelompokBn = (objs, jejak) => {
  const ada = (id) => objs.find((o) => o.id === id);
  const ns = [...new Set(objs.map((o) => /^bn(\d+)-/.exec(o.id)?.[1]).filter(Boolean))].map(Number).sort();
  const out = [];
  for (const n of ns) {
    const g = { n, w: ada(`bn${n}-w`), a: ada(`bn${n}-a`), b: ada(`bn${n}-b`), c: ada(`bn${n}-c`), gp: ada(`bn${n}-gp`), pt: ada(`bn${n}-pt`), ha: ada(`bn${n}-ha`), hb: ada(`bn${n}-hb`), hs: ada(`bn${n}-hs`), lp: ada(`bn${n}-lp`) };
    g.bTersedia = g.b ?? (g.c ? jejak.get(`bn${n}-b`) : undefined);
    g.utuhJejak = g.w ?? jejak.get(`bn${n}-w`);
    g.tampil = !!(g.a && g.bTersedia);
    out.push(g);
  }
  return out;
};
const sorotGrup = (g) => [g.a, g.b, g.c].some((o) => o?.sorot);
const hitungGrup = (g) => {
  const A = titikDari(g.a);
  const B = titikDari(g.bTersedia);
  const la = luas(A);
  const lb = luas(B);
  return { A, B, la, lb, sama: hampir(la, lb), ca: pusatLuas(A), cb: pusatLuas(B) };
};
const garisUjung = (gp) => [[gp.x, gp.y], [gp.x + (gp.x2 ?? 0), gp.y + (gp.y2 ?? 0)]];
const pasLipat = (g, h) => {
  if (!g.c) return null;
  const C = titikDari(g.c);
  const dalam = irisan(h.A, C);
  return luas(dalam) / Math.max(h.la, luas(C)) > 0.985;
};
const pilihanUji = (objs) => [1, 2, 3].map((q) => ({ t: isiTeks(objs, `c${q}-t`), s: ketemu(objs, `c${q}-k`)?.sorot, q })).filter((c) => c.t !== undefined);
const luasGelas = (objs, n) => {
  const w = ketemu(objs, `gl${n}-w`);
  const air = ketemu(objs, `gl${n}-a`);
  return w && air ? { w, air, r: air.h / w.h } : null;
};
const hurufPosisi = (objs) => objs.filter((o) => /^huruf-[a-z]$/.test(o.id)).map((o) => ({ huruf: o.isi, x: o.x }));
const huruf_terdekat = (daftar, x) => daftar.map((h) => ({ h, d: Math.abs(x - h.x) })).sort((p, q) => p.d - q.d)[0]?.h.huruf;

for (const v of VIDEO) {
  for (const a of v.adegan) {
    a.ketukan.forEach((kt, i) => {
      const objs = akhirAdegan(a, i);
      const nm = `${v.id}/${a.id}#${i + 1}`;
      const jejak = jejakAdegan(a, i);
      const kel = kelompokBn(objs, jejak);
      const suara = kt.suara.toLowerCase();
      const tampil = kel.filter((g) => g.tampil);
      stat.grup += tampil.length;
      // 1) Luas bagian dari lintasan: sama atau tidak; jumlah dua bagian sama dengan benda utuh; garis potong memisahkan dua bagian; titik tengah.
      for (const g of kel) {
        if (g.a && g.w) cek(g.a.d !== g.w.d, `${nm}: bagian a berbeda dari benda utuh (bn${g.n})`);
        if (!g.tampil) continue;
        const h = hitungGrup(g);
        const utuh = g.utuhJejak;
        if (utuh) {
          stat.jumlah += 1;
          cek(hampir(h.la + h.lb, luas(titikDari(utuh)), 0.004), `${nm}: bn${g.n} dua bagian (${h.la.toFixed(0)} + ${h.lb.toFixed(0)}) berjumlah sama dengan benda utuh (${luas(titikDari(utuh)).toFixed(0)})`);
        }
        const gpAda = g.gp ?? jejak.get(`bn${g.n}-gp`);
        if (g.gp) {
          stat.garis += 1;
          const [p, q] = garisUjung(g.gp);
          const sa = h.A.map((t) => sisiGaris(p, q, t));
          const sb = h.B.map((t) => sisiGaris(p, q, t));
          const tolSisi = 0.35 * Math.hypot(q[0] - p[0], q[1] - p[1]);
          cek((sa.every((s) => s >= -tolSisi) && sb.every((s) => s <= tolSisi)) || (sa.every((s) => s <= tolSisi) && sb.every((s) => s >= -tolSisi)), `${nm}: garis potong bn${g.n} memisahkan bagian a dan b`);
          cek(h.A.filter((t) => jarakGaris(p, q, t) < 0.35).length >= 2 && h.B.filter((t) => jarakGaris(p, q, t) < 0.35).length >= 2, `${nm}: kedua bagian bn${g.n} bertemu di garis potong`);
          const pusat = [(h.la * h.ca[0] + h.lb * h.cb[0]) / (h.la + h.lb), (h.la * h.ca[1] + h.lb * h.cb[1]) / (h.la + h.lb)];
          if (g.pt) cek(Math.hypot(g.pt.x - pusat[0], g.pt.y - pusat[1]) < 0.8, `${nm}: penanda titik tengah bn${g.n} memang di pusat benda (${pusat.map((q) => q.toFixed(1))})`);
        }
        for (const [o, sisi] of [[g.ha, "a"], [g.hb, "b"]]) {
          if (!o) continue;
          stat.label += 1;
          if (o.isi === "setengah") cek(h.sama, `${nm}: tulisan setengah pada bn${g.n}-${sisi}, bagiannya harus sama besar (${h.la.toFixed(0)} dan ${h.lb.toFixed(0)})`);
          else if (o.isi === "besar") cek((sisi === "a" ? h.la > h.lb : h.lb > h.la) && !h.sama, `${nm}: tulisan besar pada bn${g.n}-${sisi} memang bagian yang lebih besar`);
          else if (o.isi === "kecil") cek((sisi === "a" ? h.la < h.lb : h.lb < h.la) && !h.sama, `${nm}: tulisan kecil pada bn${g.n}-${sisi} memang bagian yang lebih kecil`);
          else cek(false, `${nm}: isi tulisan bagian tidak dikenal "${o.isi}"`);
        }
        if (g.hs) {
          stat.label += 1;
          if (g.hs.isi === "setengah" || g.hs.isi === "sama besar") cek(h.sama, `${nm}: hasil "${g.hs.isi}" bn${g.n} harus sama besar (${h.la.toFixed(0)} dan ${h.lb.toFixed(0)})`);
          else if (g.hs.isi === "bukan setengah" || g.hs.isi === "tidak sama besar") cek(!h.sama, `${nm}: hasil "${g.hs.isi}" bn${g.n} harus tidak sama besar (${h.la.toFixed(0)} dan ${h.lb.toFixed(0)})`);
          else cek(false, `${nm}: isi hasil tidak dikenal "${g.hs.isi}"`);
        }
        if (h.sama) stat.sama += 1;
        else stat.tidakSama += 1;
        // 2) Lipat: bagian b dipantulkan terhadap garis potong; pas bila menutup bagian a tepat.
        if (g.c) {
          stat.lipat += 1;
          const gp = g.gp ?? gpAda;
          cek(!!gp, `${nm}: garis lipat bn${g.n} ada`);
          if (gp) {
            const [p, q] = garisUjung(gp);
            const harap = h.B.map((t) => pantulUji(t, p, q));
            cek(sebangunHimpunan(titikDari(g.c), harap), `${nm}: lipatan bn${g.n}-c adalah pantulan bagian b terhadap garis potong`);
          }
          cek((g.a.x ?? 0) === 0 && (g.a.y ?? 0) === 0 && (g.c.x ?? 0) === 0 && (g.c.y ?? 0) === 0, `${nm}: bagian a dan lipatan bn${g.n} tidak bergeser (tumpukan tepat)`);
          const pas = pasLipat(g, h);
          cek(pas === h.sama, `${nm}: pas menumpuk (${pas}) sama dengan sama besar (${h.sama}) pada bn${g.n}`);
          if (g.lp) {
            stat.label += 1;
            cek((g.lp.isi === "pas" && pas) || (g.lp.isi === "tidak pas" && !pas), `${nm}: tulisan "${g.lp.isi}" cocok dengan hasil lipat (pas = ${pas})`);
          }
        } else if (g.lp) cek(false, `${nm}: tulisan pas ada tanpa lipatan bn${g.n}-c`);
      }
      // 3) Gelas air: tinggi air dibanding tinggi gelas.
      for (const n of [1, 2, 3]) {
        const gl = luasGelas(objs, n);
        if (!gl) continue;
        stat.gelas += 1;
        cek(gl.air.x === gl.w.x && gl.air.w === gl.w.w && Math.abs(gl.air.y + gl.air.h - (gl.w.y + gl.w.h)) < 0.2, `${nm}: air gelas ${n} menempel dasar gelas, selebar gelas`);
        const hs = ketemu(objs, `gl${n}-hs`);
        if (hs) {
          const r = gl.r;
          const ok = hs.isi === "setengah" ? Math.abs(r - 0.5) < 0.01 : hs.isi === "lebih" ? r > 0.51 && r < 0.99 : hs.isi === "kurang" ? r < 0.49 : hs.isi === "penuh" ? r > 0.99 : false;
          cek(ok, `${nm}: tulisan "${hs.isi}" pada gelas ${n} cocok dengan tinggi air (${r.toFixed(2)} dari gelas)`);
        }
        const gm = ketemu(objs, `gl${n}-gm`);
        if (gm) cek(Math.abs(gm.y - (gl.w.y + gl.w.h / 2)) < 0.6 && Math.abs(gl.r - 0.5) < 0.01, `${nm}: garis tengah gelas ${n} tepat di setengah tinggi gelas`);
      }
      // 4) Kalimat suara yang menyebut setengah dihitung ulang dari gambar.
      {
        const tanya = /\?|\bkalau\b|\bjika\b|\bbila\b|\bhanya\b|^ingat/.test(suara);
        const negatif = /bukan setengah|tidak sama besar/.test(suara);
        const positif = /\bsetengah\b/.test(suara) && !negatif;
        const fokusGrup = tampil.filter(sorotGrup);
        const fokus = fokusGrup.length ? fokusGrup : tampil;
        if (!tanya && tampil.length) {
          if (negatif) {
            stat.klaim += 1;
            cek(fokus.every((g) => !hitungGrup(g).sama), `${nm}: suara menyebut tidak sama besar/bukan setengah, semua gambar yang dibahas memang tidak sama besar (${fokus.map((g) => `bn${g.n}`).join(",")})`);
          } else if (positif) {
            stat.klaim += 1;
            cek(fokus.every((g) => hitungGrup(g).sama), `${nm}: suara menyebut setengah, semua gambar yang dibahas memang dua bagian sama besar (${fokus.map((g) => `bn${g.n}`).join(",")})`);
          }
        }
        const pusatBenda = (g) => {
          const u = g.utuhJejak ? titikDari(g.utuhJejak) : null;
          if (u) return pusatLuas(u);
          const h = hitungGrup(g);
          return [(h.la * h.ca[0] + h.lb * h.cb[0]) / (h.la + h.lb), (h.la * h.ca[1] + h.lb * h.cb[1]) / (h.la + h.lb)];
        };
        const bergaris = kel.filter((g) => g.gp && (g.utuhJejak || g.tampil));
        if (/(?<!tidak )(?:lewat (?:tepat )?(?:di )?(?:titik )?tengah|garis [a-z]+ di tengah|garis potong di tengah)/.test(suara) && !/tidak lewat/.test(suara)) {
          for (const g of bergaris) {
            stat.tengah += 1;
            const [p, q] = garisUjung(g.gp);
            cek(jarakGaris(p, q, pusatBenda(g)) < 0.8, `${nm}: garis potong bn${g.n} lewat titik tengah benda (jarak ${jarakGaris(p, q, pusatBenda(g)).toFixed(2)})`);
          }
        }
        if (/tidak lewat (?:di )?(?:titik )?tengah/.test(suara)) {
          for (const g of bergaris) {
            stat.tengah += 1;
            const [p, q] = garisUjung(g.gp);
            cek(jarakGaris(p, q, pusatBenda(g)) > 4, `${nm}: garis potong bn${g.n} tidak lewat titik tengah benda (jarak ${jarakGaris(p, q, pusatBenda(g)).toFixed(2)})`);
          }
        }
        const miring = (g) => g.gp && (g.gp.x2 ?? 0) !== 0 && (g.gp.y2 ?? 0) !== 0;
        if (/pojok ke pojok/.test(suara)) {
          for (const g of tampil.filter(miring)) {
            stat.sisi += 1;
            const u = g.utuhJejak ? titikDari(g.utuhJejak) : [...titikDari(g.a), ...titikDari(g.bTersedia)];
            const [p, q] = garisUjung(g.gp);
            cek(adaTitik(p, u) && adaTitik(q, u) && titikDari(g.a).length === 3 && titikDari(g.bTersedia).length === 3, `${nm}: garis miring bn${g.n} dari pojok ke pojok dan menghasilkan dua segitiga`);
          }
        }
        if (/dua segitiga/.test(suara)) for (const g of tampil.filter(miring)) cek(titikDari(g.a).length === 3 && titikDari(g.bTersedia).length === 3, `${nm}: dua segitiga pada bn${g.n}`);
        if (/bagian kiri kecil dan bagian kanan besar|kecil di kiri dan bagian besar di kanan/.test(suara)) {
          for (const g of tampil) {
            const h = hitungGrup(g);
            cek(h.ca[0] < h.cb[0] && h.la < h.lb, `${nm}: bagian kiri bn${g.n} lebih kecil dari bagian kanan`);
          }
        }
        if (/bagian kanan dilipat ke atas bagian kiri/.test(suara)) {
          for (const g of kel.filter((q) => q.c)) {
            const h = hitungGrup(g);
            cek(h.cb[0] > h.ca[0], `${nm}: bagian kanan bn${g.n} memang di kanan bagian kiri`);
          }
        }
        // gelas yang disebut dalam suara
        const huruf = hurufPosisi(objs);
        const gelasUrut = [1, 2, 3].map((n) => ({ n, gl: luasGelas(objs, n) })).filter((q) => q.gl);
        for (const m of suara.matchAll(/gelas ([abc]) berisi (lebih dari |kurang dari )?setengah/g)) {
          stat.gelas += 1;
          const tujuan = gelasUrut.find((q) => huruf_terdekat(huruf, q.gl.w.x + q.gl.w.w / 2)?.toLowerCase() === m[1]);
          cek(!!tujuan, `${nm}: gelas ${m[1]} tergambar`);
          if (tujuan) {
            const r = tujuan.gl.r;
            const ok = m[2] === undefined ? Math.abs(r - 0.5) < 0.01 : m[2].startsWith("lebih") ? r > 0.51 : r < 0.49;
            cek(ok, `${nm}: gelas ${m[1]} ${m[2] ?? ""}setengah sesuai tinggi air (${r.toFixed(2)})`);
          }
        }
        if (/gelas ini berisi setengah|sampai setengah/.test(suara)) for (const { n, gl } of gelasUrut) cek(Math.abs(gl.r - 0.5) < 0.01, `${nm}: gelas ${n} berisi setengah (${gl.r.toFixed(2)})`);
      }
      // 5) Jawaban latihan dan terapan: satu pilihan benar dan disorot, dihitung dari gambar.
      {
        const cp = pilihanUji(objs);
        if (cp.length) {
          cek(new Set(cp.map((c) => c.t)).size === cp.length && cp.length >= 2, `${nm}: pilihan jawaban berbeda (${cp.map((c) => c.t).join(", ")})`);
          const dipilih = cp.filter((c) => c.s);
          const betul = /^betul/.test(suara);
          cek(betul ? dipilih.length === 1 : dipilih.length === 0, `${nm}: jawaban disorot tepat pada ketukan "Betul!"`);
          if (dipilih.length === 1) {
            stat.jawaban += 1;
            const teksPilih = dipilih[0].t;
            const huruf = hurufPosisi(objs);
            const pusatX = (g) => {
              const h = hitungGrup(g);
              return (h.la * h.ca[0] + h.lb * h.cb[0]) / (h.la + h.lb);
            };
            let benar;
            if (cp.every((c) => ["pas", "tidak pas"].includes(c.t))) {
              const g = kel.find((q) => q.c);
              benar = g ? (pasLipat(g, hitungGrup(g)) ? "pas" : "tidak pas") : "?";
            } else if (cp.every((c) => ["setengah", "dua", "utuh"].includes(c.t))) {
              const g = tampil[0];
              benar = g && hitungGrup(g).sama ? "setengah" : "?";
            } else if (huruf.length) {
              const gelasUrut2 = [1, 2, 3].map((n) => ({ n, gl: luasGelas(objs, n) })).filter((q) => q.gl);
              const unik = gelasUrut2.length
                ? gelasUrut2.filter((q) => Math.abs(q.gl.r - 0.5) < 0.01).map((q) => huruf_terdekat(huruf, q.gl.w.x + q.gl.w.w / 2))
                : tampil.filter((g) => hitungGrup(g).sama).map((g) => huruf_terdekat(huruf, pusatX(g)));
              cek(unik.length === 1, `${nm}: tepat satu gambar atau gelas yang setengah (${unik.join(",")})`);
              benar = unik[0];
              const sebut = /(?:gambar|gelas) ([a-z])\b/.exec(kt.suara.replace(/^Betul!\s*/, ""));
              if (sebut) cek(sebut[1].toUpperCase() === benar, `${nm}: huruf yang disebut suara (${sebut[1].toUpperCase()}) sama dengan jawaban benar (${benar})`);
            } else benar = "?";
            cek(teksPilih === benar, `${nm}: jawaban yang disorot "${teksPilih}" sama dengan hitungan ulang "${benar}"`);
          }
        }
      }
    });
  }
}
console.log(`Pemeriksaan bagian: ${stat.grup} keadaan benda terbagi, ${stat.sama} sama besar, ${stat.tidakSama} tidak sama besar, ${stat.jumlah} jumlah dua bagian, ${stat.garis} garis potong, ${stat.tengah} titik tengah, ${stat.sisi} pojok ke pojok, ${stat.lipat} lipatan, ${stat.gelas} gelas, ${stat.label} tulisan, ${stat.klaim} kalimat suara, ${stat.jawaban} jawaban`);

/* ------------------------------ Aturan pemilik ------------------------------ */
{
  const MANDIRI = /kerja kelompok|berkelompok|secara berkelompok|diskusi kelompok|sekelompok|kelompokmu|kelompok belajar|bersama kelompok|tanya teman|survei|karet gelang|uang tabungan|uang logam|\bpaman\b|\btika\b|\bteman\w*|\bkawan\w*|sekawan|depan kelas|bersama kelas|seluruh kelas|\bkelas\b|berpasangan dengan (teman|kawan)|bekerja berpasangan|secara berpasangan|bermain bersama|bertanya kepada|buat ceritamu|buku|menulis di|menuliskan di|tulis di|tuliskan di|menggambar|gambarlah|gambar sendiri|\bbawa(lah)?\b|membawa|dibawa|\bkertas\b|\bpensil\b|\bpulpen\b|\bspidol\b|\bgunting\b|ambil (benda|pensil|kelereng|bola|sedotan|balon|kerucut|kubus)|tangan (kiri|kanan)|\bjari\b|menyuruh|suruh|jengkal|telapak|\bdepa\b|penggaris|\bkoin\b|di sekitar|di rumah|di kelas|centimeter|\bmeter\b|kakimu|tanganmu|badanmu|\braba\w*|\bmeraba|\btubuh|\blengan|lingkari|coret|guru kelas|orang tua|\bayah\b|\bibu guru|bapak guru|\bloker\b|singapura|\bmeja\b|di sekitarmu/i;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      const semua = [a.judul, a.sumber];
      a.ketukan.forEach((kt, i) => {
        semua.push(kt.suara);
        semua.push(...L.teksTerlihat(L.keadaanStory(a, i, 9999)));
      });
      const kena = semua.filter((t) => MANDIRI.test(t));
      cek(kena.length === 0, `${v.id}/${a.id}: narasi mandiri dan digital, tanpa kelompok, teman, kelas, buku, kertas, pensil, gunting, koin, atau benda nyata (${kena.slice(0, 2).join(" | ")})`);
    }
  }
}

/* ------------------------------ Sapaan, peta susun, dan tabel susun ------------------------------ */
{
  const sap = adegan(M_VIDEO, "sapaan");
  const DAFTAR = ["Dua bagian sama besar", "Setengah pada banyak benda", "Melipat gambar di layar"];
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Dua bagian sama besar/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => DAFTAR.includes(t)), DAFTAR, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara) && !/\d/.test(DAFTAR.join(" ")), "sapaan materi: tanpa angka");
  const sapLuar = adegan(U, "sapaan");
  cek(/cara lain/i.test(L.teksTerlihat(akhirAdegan(sapLuar, 1)).join(" | ")) && /metode-luar|Metode luar/.test(sapLuar.sumber), "sapaan metode luar: pengumuman cara lain");
  const ringkasBerkas = new URL("../src/data/kelas2-bab5-ringkas.json", import.meta.url);
  const sumberRingkas = existsSync(ringkasBerkas) ? JSON.parse(readFileSync(ringkasBerkas, "utf8")).subBab?.A : null;
  const sementara = new URL("../.tmp-k2b5s/A.json", import.meta.url);
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
    // Isi tabel dihitung ulang dari gambar pada video materi: bentuk benda, jenis garis potong, sama besar atau tidak, hasil.
    sama(T.kolom, ["Bentuk", "Garis", "Besar", "Setengah"], "tabel susun: kolom bentuk, garis, besar, setengah");
    sama(T.baris.map((b) => b.label), ["Tengah", "Geser", "Pojok"], "tabel susun: baris tengah, geser, pojok");
    const sumberBaris = { Tengah: ["dua-bagian", 5], Geser: ["tidak-sama", 3], Pojok: ["persegi", 4] };
    for (const b of T.baris) {
      const [idAdegan, ke] = sumberBaris[b.label];
      const ad = adegan(M_VIDEO, idAdegan);
      const objs = akhirAdegan(ad, ke - 1);
      const jejak = jejakAdegan(ad, ke - 1);
      const kel = kelompokBn(objs, jejak).filter((g) => g.tampil);
      const g = b.label === "Pojok" ? kel.find((q) => q.n === 3) : kel[0];
      cek(!!g, `tabel susun: gambar sumber baris ${b.label} ada (${idAdegan}#${ke})`);
      if (!g) continue;
      const h = hitungGrup(g);
      const bentuk = titikDari(g.utuhJejak).length >= 20 ? "bulat" : "persegi";
      const [px, py] = [g.gp.x2 ?? 0, g.gp.y2 ?? 0];
      const lurus = px === 0 ? "tegak" : py === 0 ? "datar" : "miring";
      const harap = [bentuk, lurus, h.sama ? "sama" : "beda", h.sama ? "ya" : "tidak"];
      stat.tabel += 1;
      sama(b.sel, harap, `tabel susun: baris ${b.label} dihitung ulang dari gambar ${idAdegan}`);
    }
    const KATA_LARANG = /buku|halaman|kunci|kerja kelompok|berkelompok|\bteman|kawan|kelas\b|kertas|pensil|\bbawa\b|menggambar|menulis di|depan kelas|\bluas\b|keliling|di rumah|survei|karet gelang|uang tabungan|di sekitar|\bpaman\b|\btika\b|\blili\b|loker|ibu guru|singapura|halving|equal parts|fold test|pisau/i;
    cek(!KATA_LARANG.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: tanpa kata terlarang dan tanpa nama Inggris, kelompok, teman, kelas, buku, kertas, pensil, pisau, loker, Ibu guru");
    cek(peta.every((s) => ![...s.teks, ...(s.ikon ?? "")].some((c) => c.codePointAt(0) > 0x1fa95)), "peta susun: emoji paling tinggi Emoji 12");
  } else cek(false, "peta dan tabel susun: .tmp-k2b5s/A.json atau kelas2-bab5-ringkas.json subBab.A.petaSusun ada");
}

console.log(`Tabel susun dihitung ulang: ${stat.tabel} baris`);
console.log(`${VIDEO.map((v) => `${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, a) => t + a.ketukan.length, 0)} ketukan, ${kataVideo(v)} kata (sekitar ${(kataVideo(v) / 120).toFixed(1)} menit diputar)`).join("\n")}`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
