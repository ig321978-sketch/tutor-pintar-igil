// Uji Story Kelas 2 Bab 8 Sub-Bab B (Diagram Gambar): dua video (materi kurikulum dan metode luar) dengan mesin animasi Story baru.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar (nama metode hanya Indonesia),
// hanya bilangan sampai dua puluh (tanpa kali, bagi, bersusun, pinjam, simpan), nama bilangan sepuluh sampai dua puluh yang diucapkan tampak sebagai angka,
// dan HITUNG ULANG DATA dari STRUKTUR gambar (bukan dari kata kunci): diagram gambar mendatar (satu gambar = satu benda, baris dibaca dari kiri ke kanan, gambar rapat dari kiri, SEMUA gambar dalam satu diagram sama bentuk dan sama besar,
// warna gambar berbeda tiap baris, angka banyak, keterangan "1 bintang = 1 buah" di bawah, paling banyak empat baris dan paling banyak sebelas gambar per baris), turus (empat garis tegak dan garis kelima miring: banyak = 5 x ikatan lima + garis sisa),
// data identik di semua kelompok yang terlihat, setiap kalimat suara ("jeruk ada enam", "paling banyak", "lebih banyak dua dari", "kurang tiga dari", "sama banyak", "jumlah semuanya lima belas") dan teks gambar (persamaan, selisih, jumlah) cocok dengan data tergambar,
// jawaban latihan benar menurut gambar, total berlari = empat belas dan lebih dari dua putaran = enam, parsel = tujuh + delapan = lima belas, aturan pemilik (belajar mandiri digital: tanpa kelompok, teman, survei, depan kelas, buku, benda fisik, karet gelang, uang tabungan),
// peta dan tabel susun (isi tabel dihitung ulang), emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k2b8B.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k2b8B-video.ts");
const U1 = await import("../src/components/modul/story/k2b8B-luar-1.ts");
const B = await import("../src/components/modul/story/k2b8B-bantu.ts");
const G = await import("../src/components/modul/story/k2b8B-gambar.ts");

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
const VIDEO = [V.VIDEO_MATERI_K2B8B, V.VIDEO_LUAR_K2B8B];
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
const M_VIDEO = V.VIDEO_MATERI_K2B8B;
const U = V.VIDEO_LUAR_K2B8B;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
// Nama dua metode luar yang bukan istilah isi sub-bab: Kunci Gambar dan Banding Kategori (Diagram Gambar adalah judul sub-bab, jadi boleh di materi).
const NAMA_LUAR = /Kunci Gambar|Banding Kategori|metode luar|metode dari luar/i;
const NAMA_INGGRIS = /Tally Marks|Frequency Count|Category Sort|Pictograph|Key \/ Legend|Compare Categories|Data collection|Data display|Graph literacy|Data compare/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar Kunci Gambar dan Banding Kategori (Diagram Gambar adalah judul sub-bab)");
  for (const m of U1.NAMA_METODE_ID) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE_ID, ["Diagram Gambar", "Kunci Gambar", "Banding Kategori"], "nama Indonesia metode luar");
  cek(!NAMA_INGGRIS.test(materi) && !NAMA_INGGRIS.test(luar), "nama metode hanya bahasa Indonesia (tanpa Pictograph, Key / Legend, Compare Categories, Tally Marks)");
  // Video diputar sebagai guru yang mengajar: tidak ada penyebutan sumber buku di suara, teks terlihat, label sumber, judul adegan, dan subjudul.
  // Kata "kunci" BOLEH (nama metode Kunci Gambar); yang dilarang hanya kunci jawaban.
  const TERLARANG = /buku|panduan guru|hlm|halaman|kunci jawaban|rubrik|salah ketik|salah cetak|tambahan video|contoh video|temuan|pertemuan/i;
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
      // Tokoh hanya enam tokoh tetap (Malosi, Kira, Upe, Wei, Halim, Igil): tanpa nama lain dari data sumber. "lili" huruf kecil adalah nama bunga; Lili sebagai tokoh tidak dipakai.
      cek(!/\b(Tika|Ibu|Ayah|Bapak|Paman|Pak|Budi|Ani|Doni|Sinta|Dewi|Rudi|Nina|Andi|Siti|Zoltan|Maria)\b/.test(semua.join(" | ")), `${v.id}/${a.id}: hanya enam tokoh tetap`);
      cek(!/\bLili (suka|membawa|bertanya)|kesukaan Lili|sekolah Lili/.test(semua.join(" | ")), `${v.id}/${a.id}: Lili hanya sebagai nama bunga, bukan tokoh`);
    }
  }
  cek(M_VIDEO.subjudul === "Materi kurikulum" && U.subjudul === "Tiga metode luar", "subjudul video: Materi kurikulum dan Tiga metode luar");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46), "video materi: label sumber berbentuk Materi: ... dan pendek");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "video metode luar: label sumber metode luar atau ringkasan, pendek");
  cek(M_VIDEO.id === "k2b8B-materi" && U.id === "k2b8B-luar", "id video k2b8B-materi dan k2b8B-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(
    M_VIDEO.adegan.map((a) => a.id).join() ===
      "sapaan,buah-campur,satu-bintang,diagram-buah,bagian-diagram,baca-baris,gambar-lain,sama-ukuran,paling-banyak,lebihnya,jumlah-buah,diagram-bunga,sama-banyak,turus-ke-gambar,data-kue,diagram-kue,permainan,berlari,parsel,latihan-satu,latihan-dua,latihan-tiga,penutup",
    "urutan adegan materi",
  );
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-gambar,luar-gambar-terapan,luar-kunci,luar-kunci-terapan,luar-banding,luar-banding-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 3 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 3 lalu penutup");
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-gambar", "luar-gambar-terapan", "luar-kunci", "luar-kunci-terapan", "luar-banding", "luar-banding-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  for (const kata of ["Latihan", "Igil", "Malosi", "Halim", "Kira", "Wei", "Upe", "diagram gambar", "bintang", "lingkaran", "hati", "wajah tersenyum", "turus", "baris", "judul", "nama baris", "keterangan", "kiri ke kanan", "satu gambar mewakili satu benda", "sama bentuk", "sama besar", "paling banyak", "paling sedikit", "lebih banyak", "lebih sedikit", "kurang", "sama banyak", "selisih", "lebihnya", "kurangnya", "jumlah semuanya", "data", "angka", "ikat lima", "garis miring"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Hanya bilangan sampai dua puluh dan data di layar: tanpa kali, bagi, bilangan lebih dari dua puluh, bersusun, pinjam, simpan, satuan baku, atau rumus.
  const BOCOR = /dikali|perkalian|pembagian|dibagi|\bratus\b|\bribu\b|dua puluh (satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan)|(tiga|empat|lima|enam|tujuh|delapan|sembilan) puluh|\bluas\b|keliling|rumus|volume|sentimeter|centimeter|\bcm\b|\bmeter\b|\bkm\b|penggaris|bersusun|meminjam|pinjam|menyimpan|simpan|dikurangi|ditambah|×|÷|−/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: hanya bilangan sampai dua puluh dan data di layar (tanpa kali, bagi, bersusun, pinjam, satuan baku, rumus, bilangan lebih dari dua puluh)`);
    for (const a of v.adegan) for (const i of a.ketukan.keys()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 20, `${v.id}/${a.id}#${i + 1}: angka di gambar paling besar dua puluh ("${t}")`);
  }
  cek(totalKetukan >= 70 && M_VIDEO.adegan.reduce((t, ad) => t + ad.ketukan.length, 0) >= 70, `total ketukan cukup dalam (${totalKetukan}; materi ${M_VIDEO.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)})`);
  // Durasi materi diputar 8 sampai 13 menit (dua kata per detik, sapaan termasuk).
  const kataMateri = kataVideo(M_VIDEO);
  cek(kataMateri / 120 >= 8 && kataMateri / 120 <= 13, `durasi materi diputar 8 sampai 13 menit (${(kataMateri / 120).toFixed(1)} menit)`);
  cek(kataVideo(U) / 120 >= 3, `durasi video luar paling sedikit 3 menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
}

/* ------------------------------ Nama bilangan 10 sampai 20 yang diucapkan tampak sebagai angka ------------------------------ */
const NAMA = B.NAMA_BILANGAN;
const tokoh = (s) => s.toLowerCase().split(/\s+/).filter(Boolean).map((w) => w.replace(/[^a-z]/g, ""));
/** Nama bilangan 1 sampai 20 yang dimulai pada token `p`: [nilai, panjang] atau null (nama dua kata didahulukan). */
const bacaAngka = (t, p) => {
  for (let n = 20; n >= 1; n -= 1) {
    const pc = NAMA[n].split(" ");
    if (pc.every((c, q) => t[p + q] === c)) return [n, pc.length];
  }
  return null;
};
/** Panjang deret bilangan berurutan terpanjang yang dimulai dari nilai `v0` dalam suara. */
const rantaiTerpanjang = (suara, v0) => {
  const t = tokoh(suara);
  let terbaik = 0;
  for (let p = 0; p < t.length; p += 1) {
    const r = bacaAngka(t, p);
    if (!r || r[0] !== v0) continue;
    let len = 1;
    let q = p + r[1];
    let v = v0;
    for (;;) {
      const s = bacaAngka(t, q);
      if (!s || s[0] !== v + 1) break;
      len += 1;
      v += 1;
      q += s[1];
    }
    terbaik = Math.max(terbaik, len);
  }
  return terbaik;
};
const NAMA_METODE_SUARA = /banding kategori/gi;
let jumlahNama = 0;
for (const v of VIDEO) {
  for (const a of v.adegan) {
    const terlihat = new Set();
    a.ketukan.forEach((kt, i) => {
      for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) for (const b of bilanganDari(o.isi)) terlihat.add(b);
      const t = tokoh(kt.suara.replace(NAMA_METODE_SUARA, " "));
      for (let p = 0; p < t.length; p += 1) {
        const r = bacaAngka(t, p);
        if (r && r[0] >= 10) {
          jumlahNama += 1;
          cek(terlihat.has(String(r[0])), `${v.id}/${a.id}#${i + 1}: "${NAMA[r[0]]}" tampak sebagai angka ${r[0]} di gambar`);
        }
      }
    });
  }
}

/* ------------------------------ Data dihitung ulang dari gambar ------------------------------ */
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const di = (id, ke) => {
  const a = adegan(M_VIDEO, id) ?? adegan(U, id);
  return akhirAdegan(a, ke);
};
const stat = { diagram: 0, turus: 0, suara: 0, persamaan: 0, khusus: 0 };
const NUMRE = NAMA.slice(1)
  .sort((m, n) => n.length - m.length)
  .join("|");
const nilaiNama = (s) => NAMA.indexOf(s);
const kataBersih = (t) => t.toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
const nomorDari = (id, re) => {
  const m = re.exec(id);
  return m ? m.slice(1) : null;
};
const satuKarakter = (s) => [...(s ?? "")].length === 1;
const NAMA_LAMBANG = G.NAMA_LAMBANG;

/**
 * Semua kelompok data yang tergambar pada keadaan `objs`: diagram gambar mendatar dan turus; tiap kelompok = {tipe, p, kat: [{nama, n, c, pics, warna}], arah}.
 * Banyak dihitung ULANG dari STRUKTUR gambar (jumlah gambar per baris, goresan dan ikatan lima), bukan dari kata.
 */
function kumpulData(objs, nm) {
  const hasil = [];
  const teksObj = (id) => objs.find((o) => o.id === id && o.t === "teks");
  // Diagram gambar mendatar: gambar `${p}g{c}_{i}`.
  const gambar = objs.filter((o) => o.t === "teks" && /^[a-z]+?g\d+_\d+$/.test(o.id));
  for (const p of new Set(gambar.map((o) => /^([a-z]+?)g\d+_\d+$/.exec(o.id)[1]))) {
    const re = new RegExp(`^${p}g(\\d+)_(\\d+)$`);
    const milik = gambar.filter((o) => re.test(o.id));
    const kategori = [...new Set(milik.map((o) => Number(re.exec(o.id)[1])))].sort((a, b) => a - b);
    const kat = [];
    const awalX = [];
    const awalY = [];
    for (const c of kategori) {
      const pics = milik.filter((o) => Number(re.exec(o.id)[1]) === c).sort((a, b) => Number(re.exec(a.id)[2]) - Number(re.exec(b.id)[2]));
      const n = pics.length;
      cek(pics.every((o, i) => o.id === `${p}g${c}_${i}`), `${nm}: gambar ${p} baris ${c} bernomor berurutan dari nol`);
      cek(pics.every((o) => o.isi === pics[0].isi && satuKarakter(o.isi)), `${nm}: gambar ${p} baris ${c} satu jenis, satu gambar satu benda`);
      cek(pics.every((o) => o.y === pics[0].y), `${nm}: gambar ${p} baris ${c} sebaris (dibaca dari kiri ke kanan)`);
      cek(pics.every((o, i) => Math.abs(o.x - (G.XS + i * G.ST)) < 0.01), `${nm}: gambar ${p} baris ${c} berjajar rapat dari kiri, satu gambar tiap tempat`);
      cek(pics.every((o) => o.u === pics[0].u && o.warna === pics[0].warna), `${nm}: gambar ${p} baris ${c} sama besar dan sama warna`);
      awalX.push(pics[0].x);
      awalY.push(pics[0].y);
      const label = teksObj(`${p}l${c}`);
      cek(!!label, `${nm}: nama baris ${p}${c} ada`);
      const h = teksObj(`${p}h${c}`);
      if (h) cek(h.isi === String(n) && Math.abs(h.x - (G.XS + n * G.ST + 4)) < 0.01, `${nm}: angka banyak ${p}h${c} "${h.isi}" sama dengan ${n} gambar dan terletak di ujung baris`);
      kat.push({ nama: (label?.isi ?? `?${c}`).toLowerCase(), n, c, pics, warna: pics[0].warna });
    }
    cek(new Set(awalX).size === 1 && new Set(awalY).size === awalY.length && awalY.every((y, i) => i === 0 || y > awalY[i - 1]), `${nm}: baris ${p} mulai dari garis yang sama dan tersusun turun`);
    // Semua gambar dalam satu diagram sama bentuk dan sama besar; tiap baris punya warna sendiri; paling banyak empat baris, paling banyak sebelas gambar per baris.
    const semua = kat.flatMap((q) => q.pics);
    cek(new Set(semua.map((o) => o.isi)).size === 1 && new Set(semua.map((o) => o.u)).size === 1, `${nm}: semua gambar diagram ${p} sama bentuk dan sama besar`);
    cek(kat.length <= 4 && kat.every((q) => q.n >= 1 && q.n <= 11), `${nm}: diagram ${p} paling banyak empat baris dan paling banyak sebelas gambar per baris`);
    cek(new Set(kat.map((q) => q.warna)).size === kat.length, `${nm}: warna gambar tiap baris diagram ${p} berbeda`);
    const ket = teksObj(`${p}k`);
    const lambang = NAMA_LAMBANG[semua[0].isi];
    cek(!!ket && /^1 [a-z]+ = 1 [a-z]+$/.test(ket.isi ?? "") && ket.isi.startsWith(`1 ${lambang} = 1 `), `${nm}: keterangan "1 ${lambang} = 1 ..." ada pada diagram ${p} (${ket?.isi})`);
    cek(!ket || ket.y > Math.max(...awalY) + 5, `${nm}: keterangan diagram ${p} di bawah diagram`);
    stat.diagram += 1;
    hasil.push({ tipe: "diagram", p, kat, arah: "datar" });
  }
  // Turus: goresan `${p}s{c}_{i}`; banyak = 5 x ikatan lima (garis miring) + garis tegak sisa.
  const goresan = objs.filter((o) => o.t === "garis" && /^[a-z]+?s\d+_\d+$/.test(o.id));
  for (const p of new Set(goresan.map((o) => /^([a-z]+?)s\d+_\d+$/.exec(o.id)[1]))) {
    const re = new RegExp(`^${p}s(\\d+)_(\\d+)$`);
    const milik = goresan.filter((o) => re.test(o.id));
    const kategori = [...new Set(milik.map((o) => Number(re.exec(o.id)[1])))].sort((a, b) => a - b);
    const kat = [];
    for (const c of kategori) {
      const gs = milik.filter((o) => Number(re.exec(o.id)[1]) === c).sort((a, b) => Number(re.exec(a.id)[2]) - Number(re.exec(b.id)[2]));
      const n = gs.length;
      cek(gs.every((o, i) => o.id === `${p}s${c}_${i}`), `${nm}: goresan ${p} kategori ${c} bernomor berurutan dari nol`);
      const x0 = gs[0].x;
      gs.forEach((o, i) => {
        const g = Math.floor(i / 5);
        const j = i % 5;
        if (j === 4) cek((o.x2 ?? 0) > 0 && (o.y2 ?? 0) < 0 && o.x <= x0 + g * 32 && o.x + o.x2 >= x0 + g * 32 + 18, `${nm}: goresan kelima ${o.id} miring menutup empat goresan tegak`);
        else cek((o.x2 ?? 0) === 0 && (o.y2 ?? 0) > 0 && Math.abs(o.x - (x0 + g * 32 + j * 6)) < 0.01, `${nm}: goresan ${o.id} tegak dan rapat dalam satu ikat`);
      });
      const tegak = gs.filter((o) => (o.x2 ?? 0) === 0).length;
      const miring = gs.filter((o) => (o.x2 ?? 0) > 0).length;
      cek(n === 5 * miring + (tegak - 4 * miring) && tegak >= 4 * miring && tegak - 4 * miring < 5, `${nm}: banyak goresan ${p}${c} (${n}) sama dengan lima kali ${miring} ikat ditambah ${tegak - 4 * miring} garis sisa`);
      const label = objs.find((o) => o.id === `${p}l${c}` && o.t === "teks");
      cek(!!label, `${nm}: nama baris turus ${p}${c} ada`);
      const h = objs.find((o) => o.id === `${p}h${c}` && o.t === "teks");
      if (h) cek(h.isi === String(n), `${nm}: angka turus ${p}h${c} "${h.isi}" sama dengan ${n} goresan`);
      kat.push({ nama: (label?.isi ?? `?${c}`).toLowerCase(), n, c });
    }
    stat.turus += 1;
    hasil.push({ tipe: "turus", p, kat, arah: "-" });
  }
  // Konsistensi: kelompok data yang terlihat bersamaan memuat data yang sama.
  const peta = new Map();
  for (const g of hasil) {
    for (const q of g.kat) {
      if (peta.has(q.nama)) cek(peta.get(q.nama) === q.n, `${nm}: data "${q.nama}" sama di semua kelompok yang terlihat (${peta.get(q.nama)} lawan ${q.n} pada ${g.tipe} ${g.p})`);
      else peta.set(q.nama, q.n);
    }
  }
  return hasil;
}

/** Persamaan "6 + 4 + 5 = 15", "5 + 1 = 6", "jumlah: 15", dan "selisih: 2" pada teks gambar dihitung ulang. */
function periksaTeksGambar(nm, objs, grup) {
  const jumlahGrup = grup.filter((g) => g.kat.length >= 2).map((g) => g.kat.reduce((t, q) => t + q.n, 0));
  for (const t of L.teksTerlihat(objs)) {
    let m = /^(\d+(?: \+ \d+)+) = (\d+)$/.exec(t);
    if (m) {
      const op = m[1].split(" + ").map(Number);
      stat.persamaan += 1;
      cek(op.reduce((a, b) => a + b, 0) === Number(m[2]) && Number(m[2]) <= 20, `${nm}: persamaan "${t}" benar`);
      if (op.length >= 3) cek(grup.some((g) => JSON.stringify(g.kat.map((q) => q.n).sort()) === JSON.stringify([...op].sort())), `${nm}: operand "${t}" sama dengan banyak tiap baris pada data yang tergambar`);
      else {
        // Operand: banyak satu baris, jumlah beberapa baris yang berurutan, satu ikat lima, atau garis sisa setelah ikat lima.
        const sah = (o) =>
          grup.some((g) => {
            for (let i = 0; i < g.kat.length; i += 1) {
              let s = 0;
              for (let j = i; j < g.kat.length; j += 1) {
                s += g.kat[j].n;
                if (s === o) return true;
              }
            }
            return o === 5 || g.kat.some((q) => q.n % 5 === o);
          });
        cek(op.every(sah), `${nm}: operand "${t}" berasal dari banyak baris, jumlah baris berurutan, atau ikat lima`);
      }
      continue;
    }
    m = /^jumlah: (\d+)$/.exec(t);
    if (m) {
      stat.persamaan += 1;
      cek(jumlahGrup.includes(Number(m[1])), `${nm}: "${t}" sama dengan jumlah semua data (${jumlahGrup.join(",")})`);
      continue;
    }
    m = /^selisih: (\d+)$/.exec(t);
    if (m) {
      stat.persamaan += 1;
      const beda = new Set();
      for (const g of grup) for (const a of g.kat) for (const b of g.kat) if (a !== b) beda.add(Math.abs(a.n - b.n));
      cek(beda.has(Number(m[1])), `${nm}: "${t}" sama dengan selisih dua baris (${[...beda].join(",")})`);
    }
  }
}

/** Kalimat hitungan dan baca-data pada suara dihitung ulang terhadap data yang tergambar. */
function periksaSuara(nm, suara, grup) {
  const semuaLabel = [...new Set(grup.flatMap((g) => g.kat.map((q) => kataBersih(q.nama))))].filter((s) => /^[a-z ]+$/.test(s) && s.length >= 2);
  if (!semuaLabel.length) return;
  const LBL = semuaLabel.sort((a, b) => b.length - a.length).join("|");
  const dengan = (label) => grup.filter((g) => g.kat.some((q) => kataBersih(q.nama) === label));
  const banyak = (g, label) => g.kat.find((q) => kataBersih(q.nama) === label)?.n;
  // a) "jeruk ada enam" / "apel empat": banyak yang diucapkan sama dengan banyak yang tergambar.
  for (const kal of suara.split(/[.?!]/).map(kataBersih).filter(Boolean)) {
    const re = new RegExp(`(?:^| )(${LBL}) (?:ada )?(${NUMRE})(?= |$)`, "g");
    for (const m of kal.matchAll(re)) {
      const v = nilaiNama(m[2]);
      const sisa = kal.slice(m.index + m[0].length);
      const lanjut = new RegExp(`^ (${NUMRE})(?= |$)`).exec(sisa);
      if (lanjut && nilaiNama(lanjut[1]) === v + 1) continue;
      stat.suara += 1;
      for (const g of dengan(m[1])) cek(banyak(g, m[1]) === v, `${nm} suara: "${m[0].trim()}" sama dengan ${banyak(g, m[1])} pada ${g.tipe} ${g.p}`);
    }
  }
  const segmen = suara.split(/[.!,]/).map(kataBersih).filter(Boolean);
  for (const kal of segmen) {
    // b) "paling banyak" dan "paling sedikit": benar-benar maksimum atau minimum, tanpa kembar.
    for (const m of kal.matchAll(new RegExp(`paling (banyak|sedikit)(?: [a-z]+)?(?: adalah| ialah| yaitu)? (${LBL})(?= |$)`, "g"))) cekEkstrem(nm, m[0], m[2], m[1], dengan, banyak, grup);
    for (const m of kal.matchAll(new RegExp(`(?:^| )(${LBL}) paling (banyak|sedikit)(?= |$)`, "g"))) cekEkstrem(nm, m[0].trim(), m[1], m[2], dengan, banyak, grup);
    // c) "jeruk lebih banyak dua dari apel" (selisih) atau tanpa bilangan (arah saja); "pisang kurang satu dari apel".
    for (const m of kal.matchAll(new RegExp(`(?:^| )(${LBL}) lebih (banyak|sedikit) (${NUMRE}) (?:gambar |anak |buah )?(?:dari|daripada) (${LBL})(?= |$)`, "g"))) {
      stat.suara += 1;
      const v = nilaiNama(m[3]);
      const g = dengan(m[1]).find((q) => banyak(q, m[4]) !== undefined);
      cek(!!g && (m[2] === "banyak" ? banyak(g, m[1]) - banyak(g, m[4]) : banyak(g, m[4]) - banyak(g, m[1])) === v, `${nm} suara: "${m[0].trim()}" cocok dengan data`);
    }
    for (const m of kal.matchAll(new RegExp(`(?:^| )(${LBL}) lebih (banyak|sedikit) (?:dari|daripada) (${LBL})(?= |$)`, "g"))) {
      stat.suara += 1;
      const g = dengan(m[1]).find((q) => banyak(q, m[3]) !== undefined);
      cek(!!g && (m[2] === "banyak" ? banyak(g, m[1]) > banyak(g, m[3]) : banyak(g, m[1]) < banyak(g, m[3])), `${nm} suara: "${m[0].trim()}" cocok dengan data`);
    }
    for (const m of kal.matchAll(new RegExp(`(?:^| )(${LBL}) kurang (${NUMRE}) (?:dari|daripada) (${LBL})(?= |$)`, "g"))) {
      stat.suara += 1;
      const g = dengan(m[1]).find((q) => banyak(q, m[3]) !== undefined);
      cek(!!g && banyak(g, m[3]) - banyak(g, m[1]) === nilaiNama(m[2]), `${nm} suara: "${m[0].trim()}" cocok dengan data (kurangnya dihitung ulang)`);
    }
    // d) "lili dan aster sama banyak".
    for (const m of kal.matchAll(new RegExp(`(?:^| )(${LBL}) dan (${LBL}) sama banyak`, "g"))) {
      stat.suara += 1;
      const g = dengan(m[1]).find((q) => banyak(q, m[2]) !== undefined);
      cek(!!g && banyak(g, m[1]) === banyak(g, m[2]), `${nm} suara: "${m[0].trim()}" benar-benar sama banyak`);
    }
    // e) "jumlah semuanya lima belas".
    for (const m of kal.matchAll(new RegExp(`(?:jumlah semuanya|semuanya ada|semua ada)(?: adalah)? (${NUMRE})(?= |$)`, "g"))) {
      stat.suara += 1;
      const v = nilaiNama(m[1]);
      cek(grup.some((g) => g.kat.length >= 2 && g.kat.reduce((t, q) => t + q.n, 0) === v), `${nm} suara: "${m[0]}" sama dengan jumlah semua data (${grup.map((g) => g.kat.reduce((t, q) => t + q.n, 0)).join(",")})`);
    }
  }
}
function cekEkstrem(nm, kutip, label, jenis, dengan, banyak, grup) {
  stat.suara += 1;
  const daftar = dengan(label).filter((g) => g.kat.length >= 2);
  cek(daftar.length > 0, `${nm} suara: "${kutip}" menyebut baris yang tergambar`);
  for (const g of daftar) {
    const n = banyak(g, label);
    const semua = g.kat.map((q) => q.n);
    const ekstrem = jenis === "banyak" ? Math.max(...semua) : Math.min(...semua);
    cek(n === ekstrem && semua.filter((x) => x === ekstrem).length === 1, `${nm} suara: "${kutip}" benar-benar paling ${jenis} tanpa kembar (${g.kat.map((q) => `${q.nama} ${q.n}`).join(", ")})`);
  }
}

for (const v of VIDEO) {
  for (const a of v.adegan) {
    a.ketukan.forEach((kt, i) => {
      const nm = `${v.id}/${a.id}#${i + 1}`;
      const objs = akhirAdegan(a, i);
      const grup = kumpulData(objs, nm);
      periksaTeksGambar(nm, objs, grup);
      periksaSuara(nm, kt.suara, grup);
    });
  }
}

/* ------------------------------ Pemeriksaan khusus tiap adegan (dihitung ulang dari struktur gambar) ------------------------------ */
{
  const grupDi = (id, ke, p) => kumpulData(di(id, ke), `${id}#${ke + 1}`).find((g) => g.p === p);
  const peta = (g) => g.kat.map((q) => `${q.nama}:${q.n}`).join(",");
  const dataPeta = (d) => d.map((q) => `${q.nama}:${q.n}`).join(",");
  const warnaDari = (g) => g.kat.map((q) => q.warna).join();
  const sorotId = (objs) => objs.filter((o) => o.sorot).map((o) => o.id).sort();
  const idBaris = (g, nama) => g.kat.find((q) => q.nama === nama).pics.map((o) => o.id).sort();
  const banyakDi = (g, nama) => g.kat.find((q) => q.nama === nama).n;
  const sorotPilihan = (objs) => {
    const i = [1, 2, 3].find((q) => ketemu(objs, `c${q}-k`)?.sorot);
    return i ? isiTeks(objs, `c${i}-t`) : null;
  };
  const tengah = (v, id, ke, kata) => {
    const a = adegan(v, id);
    return L.keadaanStory(a, ke, L.posisiKata(a.ketukan[ke].suara, kata));
  };
  const jml = (g) => g.kat.reduce((t, q) => t + q.n, 0);

  // Buah tercampur: lima belas benda; setelah dipilah, empat baris sejenis berisi 2, 6, 4, 3 benda.
  {
    const o = di("buah-campur", 3);
    const sc = o.filter((q) => /^bc\d+$/.test(q.id));
    const baris = new Map();
    for (const q of sc) baris.set(q.y, [...(baris.get(q.y) ?? []), q]);
    const urut = [...baris.entries()].sort((a, b) => a[0] - b[0]).map(([, b]) => b);
    sama(urut.map((b) => `${new Set(b.map((x) => x.isi)).size}:${b.length}`), ["1:2", "1:6", "1:4", "1:3"], "buah tercampur: empat baris sejenis berisi 2, 6, 4, 3 benda");
    sama([sc.length, urut.map((b) => b[0].isi)], [15, G.EMO_BUAH], "buah tercampur: lima belas benda, jenis anggur, jeruk, apel, pisang");
    cek(urut.every((b) => new Set(b.map((q) => q.x)).size === b.length), "buah tercampur: benda dalam baris tidak bertumpuk");
    sama([0, 1, 2, 3].map((c) => isiTeks(di("buah-campur", 4), `bn${c}`)), ["2", "6", "4", "3"], "buah tercampur: banyak tiap jenis ditulis 2, 6, 4, 3");
    stat.khusus += 4;
  }
  // Satu bintang satu buah: jumlah buah sama dengan jumlah bintang; contoh salah (dua buah satu bintang) bertanda silang.
  {
    const o = di("satu-bintang", 2);
    const pasang = (r) => [o.filter((q) => new RegExp(`^fe${r}\\d+$`).test(q.id)).length, o.filter((q) => new RegExp(`^bt${r}\\d+$`).test(q.id)).length];
    sama([0, 1, 2].map(pasang), [[1, 1], [1, 1], [2, 2]], "satu bintang: apel, jeruk, anggur: jumlah buah sama dengan jumlah bintang");
    sama([0, 1, 2].map((r) => ketemu(o, `bt${r}0`).warna), [G.BUAH[2].warna, G.BUAH[1].warna, G.BUAH[0].warna], "satu bintang: warna bintang apel merah, jeruk jingga, anggur biru");
    const s = di("satu-bintang", 3);
    cek(!!ketemu(s, "ax") && !!ketemu(s, "ay") && !!ketemu(s, "bx") && ketemu(s, "sl")?.isi === "❌", "satu bintang: contoh salah (satu bintang dua buah) bertanda silang");
    cek(L.teksTerlihat(di("satu-bintang", 4)).includes("1 gambar = 1 benda"), "satu bintang: aturan 1 gambar = 1 benda tertulis");
    stat.khusus += 4;
  }
  // Diagram buah: data sama dengan sumber, semua baris punya angka, keterangan di bawah.
  {
    const d = grupDi("diagram-buah", 3, "db");
    sama([peta(d), d.arah, warnaDari(d)], [dataPeta(G.BUAH), "datar", G.BUAH.map((q) => q.warna).join()], "diagram buah: anggur 2, jeruk 6, apel 4, pisang 3, mendatar, warna biru, jingga, merah, hijau");
    const kt = di("diagram-buah", 3);
    sama([isiTeks(kt, "dbk"), isiTeks(kt, "dbjd"), d.kat.map((q) => isiTeks(kt, `dbh${q.c}`))], ["1 bintang = 1 buah", "Buah Kesukaan", ["2", "6", "4", "3"]], "diagram buah: keterangan, judul, dan angka banyak");
    sama(grupDi("diagram-buah", 4, "db").kat.length, 4, "diagram buah: empat baris");
    stat.khusus += 3;
  }
  // Bagian diagram: judul, nama baris, gambar, angka, keterangan disorot satu per satu.
  {
    const tahap = (ke) => sorotId(di("bagian-diagram", ke));
    sama(tahap(1), ["dbjd"], "bagian diagram: judul");
    sama(tahap(2), ["dbl0", "dbl1", "dbl2", "dbl3"], "bagian diagram: empat nama baris");
    const g3 = tahap(3);
    sama([g3.length, g3.every((id) => /^dbg\d_\d+$/.test(id))], [15, true], "bagian diagram: lima belas gambar");
    sama(tahap(4), ["dbh0", "dbh1", "dbh2", "dbh3"], "bagian diagram: empat angka banyak");
    sama(tahap(5), ["dbk"], "bagian diagram: keterangan");
    stat.khusus += 5;
  }
  // Membaca baris dari kiri ke kanan.
  {
    const a1 = di("baca-baris", 0);
    cek(ketemu(a1, "ar")?.t === "panah" && ketemu(a1, "ar").x2 > 0 && ketemu(a1, "ar").y2 === 0 && L.teksTerlihat(a1).includes("dibaca dari kiri ke kanan"), "baca baris: panah mengarah ke kanan");
    const g = grupDi("baca-baris", 1, "db");
    const b = di("baca-baris", 1);
    sama([sorotId(b), isiTeks(b, "dbh1")], [idBaris(g, "jeruk"), "6"], "baca baris: enam bintang jeruk dihitung dari kiri, angka enam");
    const c = di("baca-baris", 2);
    sama([isiTeks(c, "dbh0"), isiTeks(c, "dbh2"), sorotId(c)], ["2", "4", idBaris(g, "apel")], "baca baris: anggur dua dan apel empat");
    sama(isiTeks(di("baca-baris", 3), "dbh3"), "3", "baca baris: pisang tiga");
    stat.khusus += 4;
  }
  // Gambar lain: bintang, lingkaran, hati, wajah; masing-masing empat gambar untuk empat apel.
  {
    const o = di("gambar-lain", 0);
    const baris = [0, 1, 2, 3].map((r) => o.filter((q) => new RegExp(`^gx${r}\\d$`).test(q.id)));
    sama([baris.map((b) => b.length), baris.map((b) => b[0].isi), baris.map((b) => new Set(b.map((q) => q.isi)).size)], [[4, 4, 4, 4], [G.BINTANG, G.BULAT, G.HATI, G.WAJAH], [1, 1, 1, 1]], "gambar lain: empat lambang berbeda, masing-masing empat gambar sejenis");
    cek(L.teksTerlihat(di("gambar-lain", 1)).includes("4 apel = 4 gambar"), "gambar lain: 4 apel = 4 gambar");
    stat.khusus += 2;
  }
  // Sama bentuk dan sama besar: baris benar sama besar dan berjarak sama; baris salah beda ukuran.
  {
    const o = di("sama-ukuran", 2);
    const ok = o.filter((q) => /^ok\d$/.test(q.id));
    const bad = o.filter((q) => /^bad\d$/.test(q.id));
    sama([ok.length, new Set(ok.map((q) => q.u)).size, new Set(ok.map((q) => q.isi)).size], [5, 1, 1], "sama ukuran: lima bintang sama besar dan sama bentuk");
    cek(ok.every((q, i) => i === 0 || Math.abs(q.x - ok[i - 1].x - 28) < 0.01), "sama ukuran: jarak antar bintang sama");
    cek(bad.length === 5 && new Set(bad.map((q) => q.u)).size >= 2, "sama ukuran: contoh salah memuat bintang besar dan kecil");
    cek(ketemu(o, "oc")?.isi === "✅" && ketemu(o, "tdk")?.isi === "❌", "sama ukuran: tanda benar dan tanda salah");
    stat.khusus += 4;
  }
  // Paling banyak dan paling sedikit.
  {
    const g = grupDi("paling-banyak", 0, "db");
    const maks = g.kat.reduce((a, b) => (a.n >= b.n ? a : b));
    const min = g.kat.reduce((a, b) => (a.n <= b.n ? a : b));
    sama([sorotId(di("paling-banyak", 1)), maks.nama], [idBaris(g, "jeruk"), "jeruk"], "paling banyak: baris jeruk (enam) paling panjang dan disorot");
    sama([sorotId(di("paling-banyak", 2)), min.nama], [idBaris(g, "anggur"), "anggur"], "paling sedikit: baris anggur (dua) paling pendek dan disorot");
    const tengahId = sorotId(di("paling-banyak", 4));
    const bukanUjung = g.kat.filter((q) => q.pics.every((o) => tengahId.includes(o.id)));
    sama([bukanUjung.map((q) => q.nama).sort(), bukanUjung.every((q) => q.n !== maks.n && q.n !== min.n)], [["apel", "pisang"], true], "baris tengah: apel dan pisang tidak paling banyak dan tidak paling sedikit");
    stat.khusus += 3;
  }
  // Lebihnya, kurangnya, selisih (jeruk lawan apel dua; apel lawan pisang satu).
  {
    const g = grupDi("lebihnya", 0, "db");
    sama(banyakDi(g, "jeruk") - banyakDi(g, "apel"), 2, "lebihnya: jeruk enam, apel empat, selisih dua");
    sama(sorotId(di("lebihnya", 2)), ["dbg1_4", "dbg1_5"], "lebihnya: dua bintang jeruk tanpa pasangan di baris apel disorot");
    sama(isiTeks(di("lebihnya", 3), "sl-t0"), "selisih: 2", "lebihnya: kartu selisih dua");
    sama([banyakDi(g, "apel") - banyakDi(g, "pisang"), sorotId(di("lebihnya", 4)), isiTeks(di("lebihnya", 4), "sm-t0")], [1, ["dbg2_3"], "selisih: 1"], "kurangnya: apel empat, pisang tiga, selisih satu");
    stat.khusus += 4;
  }
  // Jumlah semua buah: gabungan bertahap dan hitung semua bintang sampai lima belas.
  {
    sama(isiTeks(di("jumlah-buah", 1), "j0"), "6 + 4 = 10", "jumlah buah: jeruk dan apel sepuluh");
    sama(["j1", "j2", "j3"].map((id) => isiTeks(di("jumlah-buah", 2), id)), ["2 + 6 = 8", "8 + 4 = 12", "12 + 3 = 15"], "jumlah buah: gabungan bertahap delapan, dua belas, lima belas");
    sama(isiTeks(di("jumlah-buah", 3), "jt"), "jumlah: 15", "jumlah buah: jumlah semuanya lima belas");
    const o = di("jumlah-buah", 4);
    const bintang = o.filter((q) => /^dbg\d_\d+$/.test(q.id));
    sama([bintang.length, bintang.filter((q) => q.sorot).length, isiTeks(o, "cn")], [15, 15, "15"], "jumlah buah: lima belas bintang dihitung satu per satu sampai 15");
    stat.khusus += 4;
  }
  // Diagram bunga: data dan warna sesuai sumber; hati berwarna dan nama di pembuka.
  {
    const d = grupDi("diagram-bunga", 4, "bg");
    sama([peta(d), d.arah, warnaDari(d), isiTeks(di("diagram-bunga", 4), "bgk")], [dataPeta(G.BUNGA), "datar", G.BUNGA.map((q) => q.warna).join(), "1 hati = 1 bunga"], "diagram bunga: mawar 7, lili 4, tulip 5, aster 4 dengan hati berwarna");
    const o = di("diagram-bunga", 0);
    sama([0, 1, 2, 3].map((c) => [isiTeks(o, `bm${c}`), ketemu(o, `bh${c}`).warna]), G.BUNGA.map((q) => [q.nama, q.warna]), "diagram bunga: pembuka menampilkan empat bunga bernama dan berwarna");
    stat.khusus += 2;
  }
  // Sama banyak (lili dan aster), lebihnya (tulip lawan lili satu), kurangnya (aster lawan mawar tiga).
  {
    const g = grupDi("sama-banyak", 0, "bg");
    sama([banyakDi(g, "lili"), banyakDi(g, "aster")], [4, 4], "sama banyak: lili dan aster sama empat");
    sama(sorotId(di("sama-banyak", 1)), [...idBaris(g, "lili"), ...idBaris(g, "aster")].sort(), "sama banyak: baris lili dan aster disorot");
    sama([banyakDi(g, "tulip") - banyakDi(g, "lili"), sorotId(di("sama-banyak", 3))], [1, ["bgg2_4"]], "lebihnya: tulip lima, lili empat, satu hati tanpa pasangan");
    sama([banyakDi(g, "mawar") - banyakDi(g, "aster"), sorotId(di("sama-banyak", 4)), isiTeks(di("sama-banyak", 4), "sm-t0")], [3, ["bgg0_4", "bgg0_5", "bgg0_6"], "selisih: 3"], "kurangnya: mawar tujuh, aster empat, selisih tiga");
    stat.khusus += 4;
  }
  // Turus dan diagram gambar jeruk: enam = satu ikat lima + satu garis = enam bintang.
  {
    const t = grupDi("turus-ke-gambar", 1, "tj");
    const o = di("turus-ke-gambar", 1);
    const gs = o.filter((q) => /^tjs0_\d$/.test(q.id));
    sama([peta(t), gs.filter((q) => q.x2 > 0).length, gs.filter((q) => q.x2 === 0).length], ["jeruk:6", 1, 5], "turus jeruk: enam goresan, satu ikat lima (empat tegak dan satu miring) dan satu garis sisa");
    const d = grupDi("turus-ke-gambar", 3, "tg");
    sama([peta(d), d.kat[0].n === t.kat[0].n, isiTeks(di("turus-ke-gambar", 4), "ik")], ["jeruk:6", true, "5 + 1 = 6"], "turus dan gambar: enam goresan sama dengan enam bintang, 5 + 1 = 6");
    sama(L.teksTerlihat(di("turus-ke-gambar", 3)).includes("1 bintang = 1 buah"), true, "turus dan gambar: keterangan bintang");
    stat.khusus += 3;
  }
  // Kira mencatat kue dengan turus lalu diagram lingkaran.
  {
    const t = grupDi("data-kue", 4, "kt");
    const o = di("data-kue", 4);
    sama([peta(t), [0, 1, 2, 3].map((c) => o.filter((q) => new RegExp(`^kts${c}_\\d+$`).test(q.id) && q.x2 > 0).length)], [dataPeta(G.KUE), [1, 1, 0, 1]], "turus kue: cucur 6, onde-onde 5, lemper 3, talam 7 dengan ikat lima 1, 1, 0, 1");
    const d = grupDi("diagram-kue", 2, "dk");
    sama([peta(d), d.arah, warnaDari(d), isiTeks(di("diagram-kue", 2), "dkk")], [dataPeta(G.KUE), "datar", G.KUE.map((q) => q.warna).join(), "1 lingkaran = 1 anak"], "diagram kue: sama dengan turus, lingkaran berwarna");
    const a = di("diagram-kue", 4);
    sama([sorotId(a), banyakDi(d, "cucur") - banyakDi(d, "onde-onde"), banyakDi(d, "talam") - banyakDi(d, "lemper")], [["dkg0_5", "dkg3_3", "dkg3_4", "dkg3_5", "dkg3_6"], 1, 4], "diagram kue: cucur lebih satu dari onde-onde, talam lebih empat dari lemper");
    sama(sorotId(di("diagram-kue", 3)), idBaris(d, "lemper"), "diagram kue: baris lemper (paling sedikit) disorot");
    stat.khusus += 4;
  }
  // Permainan tradisional.
  {
    const d = grupDi("permainan", 2, "dp");
    sama([peta(d), d.arah, isiTeks(di("permainan", 2), "dpk")], [dataPeta(G.PERMAINAN), "datar", "1 wajah = 1 anak"], "permainan: karet 4, lompat tali 6, petak umpet 5, benteng 7");
    sama([sorotId(di("permainan", 3)), d.kat.reduce((a, b) => (a.n >= b.n ? a : b)).nama], [idBaris(d, "benteng"), "benteng"], "permainan: benteng paling banyak");
    sama([banyakDi(d, "lompat tali") - banyakDi(d, "karet"), sorotId(di("permainan", 4)), d.kat.reduce((a, b) => (a.n <= b.n ? a : b)).nama], [2, idBaris(d, "karet"), "karet"], "permainan: lompat tali lebih dua dari karet, karet paling sedikit");
    stat.khusus += 3;
  }
  // Para siswa berlari: 5 + 3 + 4 + 2 = 14; lebih dari dua putaran = 4 + 2 = 6.
  {
    cek(L.teksTerlihat(di("berlari", 0)).includes("14 siswa"), "berlari: empat belas siswa ditulis 14 siswa");
    const g = grupDi("berlari", 2, "dr");
    sama([peta(g), jml(g)], ["1 putaran:5,2 putaran:3,3 putaran:4,4 putaran:2", 14], "berlari: 5, 3, 4, 2 siswa; jumlah empat belas dihitung ulang dari gambar");
    sama(isiTeks(di("berlari", 3), "jm"), "5 + 3 + 4 + 2 = 14", "berlari: persamaan jumlah empat belas");
    const lebih = g.kat.filter((q) => /^(3|4) putaran$/.test(q.nama));
    const o4 = di("berlari", 4);
    sama([sorotId(o4), lebih.reduce((t, q) => t + q.n, 0), isiTeks(o4, "jn")], [lebih.flatMap((q) => q.pics.map((p) => p.id)).sort(), 6, "4 + 2 = 6"], "berlari: lebih dari dua putaran = tiga putaran dan empat putaran = 4 + 2 = 6 siswa");
    stat.khusus += 4;
  }
  // Parsel buah Wei: apel + jeruk = 7, mangga + pisang = 8, semua = 15.
  {
    const g = grupDi("parsel", 1, "pr");
    sama([peta(g), jml(g), banyakDi(g, "apel") + banyakDi(g, "jeruk"), banyakDi(g, "mangga") + banyakDi(g, "pisang")], [dataPeta(G.PARSEL), 15, 7, 8], "parsel: apel 3, jeruk 4, mangga 5, pisang 3; 7 + 8 = 15");
    const o = di("parsel", 4);
    sama([isiTeks(o, "e1"), isiTeks(o, "e2"), isiTeks(o, "e3"), isiTeks(o, "jt")], ["3 + 4 = 7", "5 + 3 = 8", "7 + 8 = 15", "jumlah: 15"], "parsel: persamaan tujuh, delapan, lima belas");
    sama([sorotId(di("parsel", 2)).length, sorotId(di("parsel", 3)).length], [7, 8], "parsel: tujuh bintang (apel dan jeruk) lalu delapan bintang (mangga dan pisang) disorot");
    stat.khusus += 3;
  }
  // Latihan: jawaban yang disorot benar menurut gambar.
  {
    const l1 = di("latihan-satu", 2);
    const g1 = grupDi("latihan-satu", 2, "lw");
    sama([sorotPilihan(l1), String(banyakDi(g1, "merah")), g1.arah, ["c1-t", "c2-t", "c3-t"].map((q) => isiTeks(l1, q))], ["5", "5", "datar", ["4", "5", "6"]], "latihan 1: jawaban lima anak suka merah sama dengan gambar");
    const g1b = grupDi("latihan-satu", 3, "lw");
    sama([peta(g1b), g1b.kat.reduce((a, b) => (a.n <= b.n ? a : b)).nama, sorotId(di("latihan-satu", 3))], ["merah:5,biru:3,kuning:4", "biru", idBaris(g1b, "biru")], "latihan 1: biru paling sedikit");
    const l2 = di("latihan-dua", 2);
    const g2 = grupDi("latihan-dua", 2, "lh");
    sama([sorotPilihan(l2), g2.kat.reduce((a, b) => (a.n <= b.n ? a : b)).nama, g2.arah, ["c1-t", "c2-t", "c3-t"].map((q) => isiTeks(l2, q))], ["menari", "menari", "datar", ["renang", "bersepeda", "menari"]], "latihan 2: menari paling sedikit sama dengan gambar");
    sama([banyakDi(g2, "bersepeda") - banyakDi(g2, "menari"), sorotId(di("latihan-dua", 3)), isiTeks(di("latihan-dua", 3), "sd-t0")], [3, ["lhg1_3", "lhg1_4", "lhg1_5"], "selisih: 3"], "latihan 2: selisih bersepeda dan menari tiga");
    const l3 = di("latihan-tiga", 2);
    const g3 = grupDi("latihan-tiga", 2, "la");
    sama([sorotPilihan(l3), String(jml(g3)), g3.arah, ["c1-t", "c2-t", "c3-t"].map((q) => isiTeks(l3, q)), isiTeks(l3, "jm")], ["12", "12", "datar", ["11", "12", "13"], "3 + 4 + 5 = 12"], "latihan 3: jumlah semuanya dua belas sama dengan gambar");
    sama(isiTeks(di("latihan-tiga", 3), "jt-t0"), "jumlah: 12", "latihan 3: jumlah dua belas ditulis");
    stat.khusus += 7;
  }
  // Metode luar.
  {
    const dw = grupDi("luar-gambar", 4, "dw");
    sama([peta(dw), dw.arah, isiTeks(di("luar-gambar", 4), "dwk"), warnaDari(dw)], [dataPeta(U1.BALON), "datar", "1 lingkaran = 1 balon", U1.BALON.map((q) => q.warna).join()], "luar gambar: balon merah 6, biru 4, kuning 5, lingkaran berwarna");
    const ta = di("luar-gambar-terapan", 2);
    const gu = grupDi("luar-gambar-terapan", 2, "du");
    sama([sorotPilihan(ta), String(gu.kat[0].n), isiTeks(ta, "duh0"), ["c1-t", "c2-t", "c3-t"].map((q) => isiTeks(ta, q))], ["7", "7", "7", ["6", "7", "8"]], "luar gambar terapan: tujuh balon hijau, tujuh lingkaran");
    const dk = grupDi("luar-kunci", 4, "kw");
    sama([peta(dk), isiTeks(di("luar-kunci", 4), "kwk"), isiTeks(di("luar-kunci", 4), "kwk") === `1 ${NAMA_LAMBANG[dk.kat[0].pics[0].isi]} = 1 ikan`], ["mas:4,lele:6,nila:3", "1 hati = 1 ikan", true], "luar kunci: ikan mas 4, lele 6, nila 3; kunci satu hati satu ikan");
    sama([sorotId(di("luar-kunci", 1)), sorotId(di("luar-kunci", 2))], [["kwk"], idBaris(dk, "lele")], "luar kunci: kunci disorot, lalu baris lele (enam hati) dihitung");
    const ko = grupDi("luar-kunci-terapan", 2, "ko");
    const kt = di("luar-kunci-terapan", 2);
    sama([peta(ko), sorotPilihan(kt), String(banyakDi(ko, "renang")), isiTeks(kt, "kok")], ["voli:4,renang:6", "6", "6", "1 bintang = 1 anak"], "luar kunci terapan: enam anak suka renang menurut kunci");
    const bk = grupDi("luar-banding", 0, "bk");
    sama([peta(bk), banyakDi(bk, "merah") - banyakDi(bk, "biru"), banyakDi(bk, "kuning") - banyakDi(bk, "biru"), banyakDi(bk, "merah") - banyakDi(bk, "kuning")], [dataPeta(U1.BALON), 2, 1, 1], "luar banding: merah lebih dua dari biru, kuning lebih satu dari biru, merah lebih satu dari kuning");
    sama(sorotId(tengah(U, "luar-banding", 2, "dua")), ["bkg0_4", "bkg0_5"], "luar banding: dua bulatan merah tanpa pasangan biru disorot");
    sama(sorotId(tengah(U, "luar-banding", 2, "Kuning")), ["bkg2_4"], "luar banding: satu bulatan kuning tanpa pasangan biru disorot");
    sama(sorotId(tengah(U, "luar-banding", 3, "satu")), ["bkg0_5"], "luar banding: satu bulatan merah tanpa pasangan kuning disorot");
    sama(isiTeks(di("luar-banding", 4), "jm"), "6 + 4 + 5 = 15", "luar banding: jumlah lima belas");
    const bt = di("luar-banding-terapan", 2);
    const gt = grupDi("luar-banding-terapan", 2, "bt");
    sama([sorotPilihan(bt), peta(gt), banyakDi(gt, "teh") === banyakDi(gt, "jus"), ["c1-t", "c2-t", "c3-t"].map((q) => isiTeks(bt, q))], ["teh dan jus", "teh:5,jus:5,susu:3", true, ["teh dan jus", "jus dan susu", "teh dan susu"]], "luar banding terapan: teh dan jus sama banyak");
    sama([banyakDi(gt, "teh") - banyakDi(gt, "susu"), sorotId(di("luar-banding-terapan", 3))], [2, ["btg0_3", "btg0_4"]], "luar banding terapan: teh lebih dua dari susu");
    stat.khusus += 12;
  }
}


/* ------------------------------ Aturan pemilik: belajar mandiri, digital, tanpa benda fisik ------------------------------ */
{
  // "karet" sebagai nama permainan (lompat karet) boleh; yang dilarang karet gelang. "lili" adalah nama bunga.
  const MANDIRI = /kerja kelompok|berkelompok|secara berkelompok|diskusi kelompok|sekelompok|kelompokmu|kelompok belajar|bersama kelompok|\bkelompok\b|tanya teman|survei|karet gelang|uang tabungan|tabungan|\bpaman\b|\btika\b|\bteman\w*|\bkawan\w*|sekawan|depan kelas|bersama kelas|seluruh kelas|\bkelas\b|kelas dua|berpasangan dengan (teman|kawan)|bekerja berpasangan|secara berpasangan|bermain bersama|bertanya kepada|buat ceritamu|buku|menulis di|menuliskan di|tulis di|tuliskan di|menggambar|gambarlah|gambar sendiri|\bbawa(lah)?\b|membawa|dibawa|\bkertas\b|\bpensil\b|\bpulpen\b|\bspidol\b|\bgunting\w*|ambil (benda|pensil|kelereng|bola|sedotan|balon|kerucut|kubus)|tangan (kiri|kanan)|\bjari\b|menyuruh|suruh|jengkal|telapak|\bdepa\b|penggaris|\bkoin\b|di sekitar|di rumah|di kelas|centimeter|\bmeter\b|kakimu|tanganmu|badanmu|\braba\w*|\bmeraba|\btubuh|\blengan|lingkari|coret|guru kelas|orang tua|\bayah\b|\bibu guru|bapak guru|\bloker\b|\bpaku\b|\brumah\b|\bpak\b|\bibu\b|\blidi\b|kantong plastik|kue cubit|rambutan|\bbetawi\b|sahabat|\bkantin\b|mempresentasikan|presentasi|\bpara teman|seperti lidi/i;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      const semua = [a.judul, a.sumber];
      a.ketukan.forEach((kt, i) => {
        semua.push(kt.suara);
        semua.push(...L.teksTerlihat(L.keadaanStory(a, i, 9999)));
      });
      const kena = semua.filter((t) => MANDIRI.test(t));
      cek(kena.length === 0, `${v.id}/${a.id}: narasi mandiri dan digital, tanpa kelompok, teman, kelas, buku, kertas, pensil, benda fisik, atau satuan baku (${kena.slice(0, 2).join(" | ")})`);
    }
  }
}

/* ------------------------------ Sapaan, peta susun, dan tabel susun ------------------------------ */
{
  const sap = adegan(M_VIDEO, "sapaan");
  const DAFTAR = ["Membaca diagram gambar", "Membandingkan data diagram", "Membuat diagram gambar"];
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Membaca diagram gambar/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => DAFTAR.includes(t)), DAFTAR, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara) && !/\d/.test(DAFTAR.join(" ")), "sapaan materi: tanpa angka");
  const sapLuar = adegan(U, "sapaan");
  cek(/cara lain/i.test(L.teksTerlihat(akhirAdegan(sapLuar, 1)).join(" | ")) && /metode-luar|Metode luar/.test(sapLuar.sumber), "sapaan metode luar: pengumuman cara lain");
  let sumberRingkas = null;
  try {
    sumberRingkas = JSON.parse(readFileSync(new URL("../src/data/kelas2-bab8-ringkas.json", import.meta.url), "utf8")).subBab?.B;
  } catch {
    sumberRingkas = null;
  }
  const sementara = new URL("../.tmp-k2b8s/B.json", import.meta.url);
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
    cek(!/\d/.test(A.petaSusun.pusat.suara) && !/\d/.test(A.petaSusun.petunjuk) && peta.every((s) => !/\d/.test(s.petunjuk ?? "")), "peta susun: suara dan petunjuk tanpa digit");
    cek(A.petaSusun.pusat.judul.length > 8 && A.petaSusun.pusat.judul.length <= 28 && /\?$/.test(A.petaSusun.pusat.judul), "peta susun: pusat berupa masalah (pertanyaan) sub-bab, <= 28 huruf");
    const T = A.tabelSusun;
    cek(T.baris.length >= 3 && T.baris.length <= 5 && T.kolom.length >= 3 && T.kolom.length <= 4, "tabel susun: 3 sampai 5 baris dan 3 sampai 4 kolom");
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 26 && (s.match(/\d+/g) ?? []).length <= 1)), "tabel susun: sel <= 26 huruf dan paling banyak satu angka per sel");
    cek(T.baris.every((b) => b.label.split(/\s+/).every((w) => w.length <= 8)), "tabel susun: kata terpanjang kolom label <= 8 huruf");
    cek(!/\d/.test(T.suara) && !/\d/.test(T.petunjuk), "tabel susun: suara dan petunjuk tanpa digit");
    // Isi tabel dihitung ulang: tiap baris satu buah; turus (4 garis tegak + 1 miring per ikat lima, sisa tegak), gambar, dan angka menyatakan banyak yang sama, sama dengan data buah di video.
    sama(T.kolom, ["Turus", "Gambar", "Angka"], "tabel susun: kolom turus, gambar, angka");
    const turusDari = (n) => "||||/".repeat(Math.floor(n / 5)) + "|".repeat(n % 5);
    for (const b of T.baris) {
      const [tr, gb, an] = b.sel;
      const n = Number(an);
      const ref = G.BUAH.find((q) => q.nama === b.label.toLowerCase());
      cek(!!ref && ref.n === n, `tabel susun: ${b.label} ${an} sama dengan data buah di video`);
      const bar = (tr.match(/\|/g) ?? []).length;
      const mir = (tr.match(/\//g) ?? []).length;
      cek(/^[|/]+$/.test(tr) && tr === turusDari(n) && bar + mir === n, `tabel susun: turus ${tr} untuk ${b.label} dihitung ulang (${bar} tegak + ${mir} miring = ${n})`);
      sama(gb, `${n} gambar`, `tabel susun: gambar ${b.label}`);
      stat.khusus += 1;
    }
    cek(T.baris.reduce((t, b) => t + Number(b.sel[2]), 0) <= 20 && new Set(T.baris.map((b) => b.sel[2])).size === T.baris.length, "tabel susun: jumlah semua paling banyak dua puluh dan banyak tiap baris berbeda");
    cek(new Set(T.baris.map((b) => b.label)).size === T.baris.length, "tabel susun: label tiap baris berbeda");
    // Margin teks sel di lebar 405 px: sel pendek (paling banyak delapan huruf) supaya margin teks >= 5 px.
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 8)), "tabel susun: sel pendek supaya margin teks >= 5 px di 405 px");
    const KATA_LARANG = /buku|halaman|kunci jawaban|kerja kelompok|\bkelompok|\bteman|kawan|kelas\b|kertas|pensil|\bbawa\b|menggambar|menulis di|depan kelas|luas|keliling|di rumah|\brumah\b|survei|karet gelang|uang tabungan|di sekitar|loker|ibu guru|bersusun|\bkali\b|gunting|\bpaku\b|\bpak\b|\bayah\b|\bibu\b|lidi|kantong plastik|kantin|tabungan|menabung|koin|penjepit|sentimeter|centimeter|\bmeter\b/i;
    cek(!KATA_LARANG.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: tanpa kata terlarang dan tanpa kelompok, teman, kelas, buku, kertas, pensil");
    cek(!/Tally Marks|Frequency Count|Category Sort|Pictograph|Key \/ Legend|Compare Categories/i.test(JSON.stringify(A)), "peta dan tabel susun: tanpa nama metode berbahasa Inggris");
    cek(peta.every((s) => ![...s.teks, ...(s.ikon ?? "")].some((c) => c.codePointAt(0) > 0x1fa95)), "peta susun: emoji paling tinggi Emoji 12");
    cek(![...JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), "peta dan tabel susun: tanpa emoji di atas Emoji 12 dan tanpa ZWJ");
  } else cek(false, "peta dan tabel susun: .tmp-k2b8s/B.json atau kelas2-bab8-ringkas.json subBab.B.petaSusun ada");
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k2b8B-.*)\.(ts|tsx)$/.test(f));
  cek(berkas.length >= 8, `berkas story ditemukan (${berkas.length})`);
  for (const f of berkas) {
    const s = readFileSync(new URL(f, folder), "utf8");
    const buruk = [...s].filter((c) => {
      const kode = c.codePointAt(0);
      return kode > 0x1fa95 || kode === 0x1f7f0 || kode === 0x200d;
    });
    cek(buruk.length === 0, `${f}: tanpa emoji di atas Emoji 12 dan tanpa ZWJ (${buruk.map((c) => c.codePointAt(0).toString(16)).join()})`);
    cek(!s.startsWith("﻿") && !s.includes("\r"), `${f}: UTF-8 tanpa BOM dan akhir baris LF`);
    cek(!/fetch\(|XMLHttpRequest|openai|anthropic|gemini|correct_index|explanation/i.test(s), `${f}: tanpa jaringan, model bahasa, atau kunci jawaban`);
    cek(!/from "react"/.test(s), `${f}: logika dan data tanpa React`);
    const impor = [...s.matchAll(/from "([^"]+)"/g)].map((m) => m[1]);
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k2b8B-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k2b8B sendiri (${impor.join(", ")})`);
  }
  // Emoji dalam data teks gambar juga paling tinggi Emoji 12 (diperiksa pada gambar yang diputar).
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${v.id}/${a.id}: emoji gambar paling tinggi Emoji 12`);
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k2b8b.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|naskah-k2b8|data-k2b8|kit-k2b8|video-k2b8-umum|naskah-k1b/.test(pembungkus) && /VIDEO_MATERI_K2B8B/.test(pembungkus) && /VIDEO_LUAR_K2B8B/.test(pembungkus) && /export function VideoK2B8B/.test(pembungkus) && /daftar-video-cerita/.test(pembungkus), "video-k2b8b.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k2b8b.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k2b8B.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k2b8B.mjs: akhir baris LF");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit diputar)`);
}
console.log(`Pemeriksaan: ${stat.diagram} diagram, ${stat.turus} turus, ${stat.suara} kalimat suara dicocokkan dengan data, ${stat.persamaan} persamaan atau selisih di gambar, ${stat.khusus} pemeriksaan khusus, ${jumlahNama} nama bilangan tampak sebagai angka`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
