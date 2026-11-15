// Uji Story Kelas 1 Bab 3 Sub-Bab C (Hubungan Penjumlahan dan Pengurangan): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar (nama Indonesia saja),
// hanya bilangan sampai sepuluh dengan tanda tambah, kurang, dan sama dengan (tanpa kali, bagi, atau bilangan lebih dari sepuluh), tiap kalimat tambah dan kurang di gambar benar,
// hitungan benda satu demi satu, rumus yang tersusun potongan demi potongan mengikuti kata bilangan, jejak pelompat di deretan bilangan, bingkai sepuluh yang diisi dan dikosongkan,
// segitiga keluarga bilangan, peta dan tabel susun, aturan aplikasi belajar mandiri (tanpa kelompok, teman, depan kelas, buku, menulis, menggambar, membawa benda, kertas, pensil),
// emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k1b3c.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k1b3c-video.ts");
const U1 = await import("../src/components/modul/story/k1b3c-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K1B3C, V.VIDEO_LUAR_K1B3C];
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
const M_VIDEO = V.VIDEO_MATERI_K1B3C;
const U = V.VIDEO_LUAR_K1B3C;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /Mengambil|Hitung Mundur|Kurang di Bingkai|metode luar|metode dari luar/i;
const NAMA_INGGRIS = /Take Away|Counting Back|Counting On|Ten Frame|Part.Part.Whole/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
// Kata terlarang (aturan pemilik: aplikasi belajar mandiri, interaktif, dan digital) pada suara, teks gambar, judul, sumber, peta, dan tabel.
const TERLARANG_PEMILIK = /kelompok|teman|kawan|depan kelas|berpasangan|berpasang-pasangan|bersama-sama dengan|buku|menulis di|tulis di|menggambar|gambar sendiri|bawa|kertas|pensil|ambil benda|angkat jari|buat ceritamu|bercerita di|ceritakan/i;
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar");
  cek(!NAMA_INGGRIS.test(materi) && !NAMA_INGGRIS.test(luar), "tanpa nama metode berbahasa Inggris (Take Away, Counting Back, Ten Frame)");
  for (const m of U1.NAMA_METODE) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE, ["Mengambil", "Hitung Mundur", "Kurang di Bingkai"], "nama metode luar (bahasa Indonesia saja)");
  // Video diputar sebagai guru yang mengajar: tidak ada penyebutan sumber buku di suara, teks terlihat, label sumber, judul adegan, dan subjudul.
  const TERLARANG = /buku|panduan guru|hlm|halaman|kunci|rubrik|salah ketik|salah cetak|tambahan video|contoh video|temuan|pertemuan/i;
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
      cek(!/Uji Kompetensi|Pengayaan|Ayo Berlatih|Ayo Berdiskusi|Ayo Berefleksi|Ayo Mengingat|Ayo Berkomunikasi|Ayo Berpikir|soal \d|Soal \d|Eksplorasi|Refleksi/.test(semua.join(" | ")), `${v.id}/${a.id}: latihan disajikan sebagai Latihan, tanpa istilah buku`);
    }
  }
  cek(M_VIDEO.subjudul === "Materi kurikulum" && U.subjudul === "Tiga metode luar", "subjudul video: Materi kurikulum dan Tiga metode luar");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46), "video materi: label sumber berbentuk Materi: ... dan pendek");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "video metode luar: label sumber metode luar atau ringkasan, pendek");
  cek(M_VIDEO.id === "k1b3c-materi" && U.id === "k1b3c-luar", "id video k1b3c-materi dan k1b3c-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,cerita-kelinci,keluarga-bilangan,dua-tambah,dua-kurang,empat-kalimat,kebalikan,kaos-jemuran,tukar-tempat,periksa-kurang,periksa-tambah,cari-hilang,pilih-tanda,susun-layar,latihan-satu,latihan-dua,latihan-tiga,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-ambil,luar-ambil-terapan,luar-mundur,luar-mundur-terapan,luar-bingkai,luar-bingkai-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 3 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 3 lalu penutup");
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-ambil", "luar-ambil-terapan", "luar-mundur", "luar-mundur-terapan", "luar-bingkai", "luar-bingkai-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  for (const kata of ["Latihan", "Igil", "Malosi", "Kira", "Upe", "Wei", "Halim", "kelinci", "keluarga bilangan", "ditambah", "kurang", "sama dengan", "kebalikan", "periksa", "hilang", "tanda"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Hanya bilangan sampai sepuluh: tanpa banding, kali, bagi, atau bilangan lebih dari sepuluh.
  const BOCOR = /lebih (banyak|besar|sedikit|kecil)|bandingkan|membandingkan|\bbelas\b|\bpuluh\b|\bratus\b|\bribu\b|sebelas|dua belas|operasi|hasil bagi|dikali|\bkali\b|dibagi|\bbagi\b/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: hanya tambah dan kurang sampai sepuluh, tanpa banding, kali, bagi, atau bilangan lebih dari sepuluh`);
    for (const a of v.adegan) for (const [i] of a.ketukan.entries()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 10, `${v.id}/${a.id}#${i + 1}: angka di gambar paling besar sepuluh ("${t}")`);
  }
  cek(totalKetukan >= 70, `total ketukan cukup dalam (${totalKetukan})`);
  for (const v of VIDEO) cek(v.adegan.every((a) => a.ketukan.length >= 3 && a.ketukan.length <= 14), `${v.id}: tiap adegan 3 sampai 14 ketukan`);
  // Durasi materi diputar 8 sampai 13 menit (dua kata per detik, sapaan termasuk).
  const kataMateri = kataVideo(M_VIDEO);
  cek(kataMateri / 120 >= 8 && kataMateri / 120 <= 13, `durasi materi diputar 8 sampai 13 menit (${(kataMateri / 120).toFixed(1)} menit)`);
  cek(kataVideo(U) / 120 >= 3, `durasi video luar paling sedikit 3 menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
}

/* ------------------------------ Bilangan yang diucapkan dengan kata tampak sebagai angka ------------------------------ */
const NAMA_ANGKA = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh"];
for (const v of VIDEO) {
  for (const a of v.adegan) {
    const terlihat = new Set();
    a.ketukan.forEach((kt, i) => {
      for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) for (const b of bilanganDari(o.isi)) terlihat.add(b);
      if (L.kataDari(kt.suara).some((w) => w.toLowerCase().replace(/[^a-z]/g, "") === "sepuluh")) cek(terlihat.has("10"), `${v.id}/${a.id}#${i + 1}: "sepuluh" tampak sebagai angka 10 di gambar`);
    });
  }
}

/* ------------------------------ Tambah, kurang, hitungan benda, deretan bilangan, bingkai, segitiga keluarga ------------------------------ */
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const kataSuara = (kt) => L.kataDari(kt.suara).map((w) => w.toLowerCase().replace(/[^a-z]/g, ""));
const xv = (v) => 33 + 26 * (v - 1);
const jumlahId = (a, ke, p, re) => L.keadaanStory(a, ke, p).filter((o) => re.test(o.id)).length;
const posKata = (a, ke, kata, n = 1) => {
  const w = kataSuara(a.ketukan[ke]);
  let c = 0;
  for (let i = 0; i < w.length; i += 1) if (w[i] === kata && (c += 1) === n) return i;
  throw new Error(`kata ${kata} ke-${n} tidak ada: ${a.ketukan[ke].suara}`);
};
const stat = { tambah: 0, kurang: 0, rumus: 0, hitung: 0, jejak: 0, bingkai: 0, segitiga: 0, pilihan: 0 };
/** Deretan posisi x pemain `id` (tanpa pengulangan berurutan) selama kalimat diucapkan kata demi kata. */
const jejakUp = (a, ke, id = "up") => {
  const out = [];
  const n = L.kataDari(a.ketukan[ke].suara).length;
  for (let p = -1; p < n; p += 1) {
    const up = ketemu(L.keadaanStory(a, ke, p), id);
    if (up && out[out.length - 1] !== up.x) out.push(up.x);
  }
  return out;
};
{
  // 1) Semua kalimat tambah dan kurang yang tampak benar dan tidak lebih dari sepuluh; tanpa kali dan bagi.
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((kt, i) => {
        for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) {
          for (const m of t.matchAll(/(\d+)\s*\+\s*(\d+)\s*=\s*(\d+)/g)) {
            stat.tambah += 1;
            cek(Number(m[1]) + Number(m[2]) === Number(m[3]) && Number(m[3]) <= 10, `${v.id}/${a.id}#${i + 1}: kalimat tambah benar, jumlah paling banyak sepuluh ("${m[0]}")`);
          }
          for (const m of t.matchAll(/(\d+)\s*−\s*(\d+)\s*=\s*(\d+)/g)) {
            stat.kurang += 1;
            cek(Number(m[1]) - Number(m[2]) === Number(m[3]) && Number(m[1]) <= 10 && Number(m[3]) >= 0, `${v.id}/${a.id}#${i + 1}: kalimat kurang benar, tidak ada hasil di bawah nol ("${m[0]}")`);
          }
          cek(!/\d\s*[×÷*\/]\s*\d|\d\s*-\s*\d/.test(t), `${v.id}/${a.id}#${i + 1}: tanpa tanda kali, bagi, atau tanda hubung sebagai kurang ("${t}")`);
        }
      });
    }
  }
  // 2) Rumus yang disusun potongan demi potongan: [adegan, ketukan, awalan id, bilangan pertama, tanda, bilangan kedua, hasil].
  const rumus = [
    [M_VIDEO, "dua-tambah", 0, "r1", "4", "+", "3", "7"],
    [M_VIDEO, "dua-tambah", 1, "r2", "3", "+", "4", "7"],
    [M_VIDEO, "dua-kurang", 2, "r3", "7", "−", "3", "4"],
    [M_VIDEO, "dua-kurang", 4, "r5", "7", "−", "4", "3"],
    [M_VIDEO, "kaos-jemuran", 1, "ka", "3", "+", "2", "5"],
    [M_VIDEO, "kaos-jemuran", 1, "kb", "2", "+", "3", "5"],
    [M_VIDEO, "kaos-jemuran", 3, "kc", "5", "−", "2", "3"],
    [M_VIDEO, "kaos-jemuran", 4, "kd", "5", "−", "3", "2"],
    [M_VIDEO, "periksa-kurang", 0, "pa", "9", "−", "4", "5"],
    [M_VIDEO, "periksa-kurang", 2, "pb", "5", "+", "4", "9"],
    [M_VIDEO, "periksa-tambah", 0, "ua", "3", "+", "5", "8"],
    [M_VIDEO, "periksa-tambah", 1, "ub", "8", "−", "5", "3"],
    [M_VIDEO, "periksa-tambah", 3, "uc", "8", "−", "3", "5"],
    [M_VIDEO, "cari-hilang", 3, "wc", "6", "+", "3", "9"],
    [M_VIDEO, "cari-hilang", 4, "we", "2", "+", "5", "7"],
    [M_VIDEO, "susun-layar", 2, "sa", "6", "+", "2", "8"],
    [M_VIDEO, "susun-layar", 2, "sb", "2", "+", "6", "8"],
    [M_VIDEO, "susun-layar", 3, "sc", "8", "−", "2", "6"],
    [M_VIDEO, "susun-layar", 3, "sd", "8", "−", "6", "2"],
    [M_VIDEO, "latihan-satu", 1, "la", "5", "+", "2", "7"],
    [M_VIDEO, "latihan-satu", 1, "lb", "2", "+", "5", "7"],
    [M_VIDEO, "latihan-dua", 3, "md", "5", "+", "4", "9"],
    [M_VIDEO, "latihan-tiga", 2, "nr", "6", "−", "2", "4"],
    [M_VIDEO, "latihan-tiga", 2, "ns", "4", "+", "2", "6"],
    [U, "luar-ambil", 2, "ma", "7", "−", "3", "4"],
    [U, "luar-ambil", 3, "mb", "4", "+", "3", "7"],
    [U, "luar-ambil-terapan", 2, "tu", "4", "−", "1", "3"],
    [U, "luar-ambil-terapan", 3, "tv", "3", "+", "1", "4"],
    [U, "luar-mundur-terapan", 3, "ev", "5", "+", "4", "9"],
  ];
  for (const [v, id, ke, p, b1, op, b2, h] of rumus) {
    const a = adegan(v, id);
    const o = akhirAdegan(a, ke);
    stat.rumus += 1;
    sama([0, 1, 2, 3, 4].map((i) => isiTeks(o, `${p}${i}`)), [b1, op, b2, "=", h], `${id}: rumus ${b1} ${op} ${b2} = ${h} tersusun`);
    cek(op === "+" ? Number(b1) + Number(b2) === Number(h) : Number(b1) - Number(b2) === Number(h), `${id}: hitungan rumus ${p} benar`);
    const xs = [0, 1, 2, 3, 4].map((i) => ketemu(o, `${p}${i}`).x);
    cek(xs.every((x, i) => i === 0 || x > xs[i - 1]), `${id}: potongan rumus ${p} berderet kiri ke kanan`);
    const w = kataSuara(a.ketukan[ke]);
    const sebut = w.filter((q) => NAMA_ANGKA.includes(q));
    let dari = 0;
    const urut = [b1, b2, h].every((n) => { const q = sebut.indexOf(NAMA_ANGKA[Number(n)], dari); dari = q + 1; return q >= 0; });
    cek(urut, `${id}: suara menyebut ${b1}, ${b2}, ${h} berurutan (${sebut.join(" ")})`);
    cek(w.includes(op === "+" ? (w.includes("ditambah") ? "ditambah" : "tambah") : "kurang"), `${id}: suara menyebut kata ${op === "+" ? "tambah" : "kurang"}`);
    const pos = [0, 1, 2, 3, 4].map((i) => [...Array(L.kataDari(a.ketukan[ke].suara).length).keys()].find((q) => ketemu(L.keadaanStory(a, ke, q), `${p}${i}`)));
    cek(pos.every((q, i) => q !== undefined && (i === 0 || q > pos[i - 1])), `${id}: potongan rumus ${p} muncul satu demi satu mengikuti ucapan`);
  }
  // 3) Cerita kelinci: empat kelinci cokelat dan tiga kelinci hitam dihitung satu demi satu.
  {
    const a = adegan(M_VIDEO, "cerita-kelinci");
    ["satu", "dua", "tiga", "empat"].forEach((w, i) => {
      stat.hitung += 1;
      const p = posKata(a, 1, w, 1 + (w === "satu" ? 0 : 0));
      sama(jumlahId(a, 1, p, /^kc\d$/), i + 1, `kelinci cokelat: ${i + 1} kelinci tampak pada kata ${w}`);
      sama(isiTeks(L.keadaanStory(a, 1, p), `kbn${i}`), String(i + 1), `kelinci cokelat: nomor ${i + 1} di atas kelinci ke-${i + 1}`);
    });
    ["satu", "dua", "tiga"].forEach((w, i) => {
      stat.hitung += 1;
      const p = posKata(a, 2, w);
      sama(jumlahId(a, 2, p, /^kh\d$/), i + 1, `kelinci hitam: ${i + 1} kelinci tampak pada kata ${w}`);
      sama(isiTeks(L.keadaanStory(a, 2, p), `khn${i}`), String(i + 1), `kelinci hitam: nomor ${i + 1} di atas kelinci ke-${i + 1}`);
    });
    sama([jumlahId(a, 1, 9999, /^kc\d$/), jumlahId(a, 2, 9999, /^kh\d$/)], [4, 3], "kelinci: empat cokelat dan tiga hitam");
  }
  // 4) Segitiga keluarga: empat, tiga, tujuh; lalu tiga, dua, lima. Jumlah bagian sama dengan puncak.
  {
    const a = adegan(M_VIDEO, "keluarga-bilangan");
    for (const [ke, [b1, b2, h]] of [[0, [4, 3, 7]], [4, [3, 2, 5]]]) {
      const o = akhirAdegan(a, ke);
      stat.segitiga += 1;
      sama([isiTeks(o, "p1-t0"), isiTeks(o, "p2-t0"), isiTeks(o, "wh-t0")], [String(b1), String(b2), String(h)], `segitiga keluarga ketukan ${ke + 1}: ${b1}, ${b2}, ${h}`);
      cek(b1 + b2 === h && ketemu(o, "wh-k").y < ketemu(o, "p1-k").y && ketemu(o, "p1-k").x < ketemu(o, "p2-k").x && ketemu(o, "gl1") && ketemu(o, "gl2"), `segitiga ketukan ${ke + 1}: puncak di atas, dua kaki dihubungkan garis, jumlah benar`);
    }
    const w = kataSuara(a.ketukan[0]);
    const kk = ["empat", "tiga", "tujuh"].map((n) => [...Array(w.length).keys()].find((q) => ketemu(L.keadaanStory(a, 0, q), n === "empat" ? "p1-k" : n === "tiga" ? "p2-k" : "wh-k")));
    cek(kk.every((q, i) => q !== undefined && (i === 0 || q > kk[i - 1])), "segitiga: kaki kiri, kaki kanan, lalu puncak muncul mengikuti ucapan");
  }
  // 5) Dua kalimat tambah (kelinci bertukar tempat) dan dua kalimat kurang (hitam pergi, lalu cokelat pergi).
  {
    const a = adegan(M_VIDEO, "dua-tambah");
    sama([jumlahId(a, 0, 9999, /^ta\d$/), jumlahId(a, 0, 9999, /^tb\d$/), jumlahId(a, 1, 9999, /^ta\d$/), jumlahId(a, 1, 9999, /^tb\d$/)], [4, 3, 4, 3], "tambah: empat cokelat dan tiga hitam, juga setelah bertukar tempat");
    const k0 = akhirAdegan(a, 0);
    const k1 = akhirAdegan(a, 1);
    cek(ketemu(k0, "ta0").x < ketemu(k0, "tb0").x && ketemu(k1, "tb0").x < ketemu(k1, "ta0").x, "tambah: urutan kelinci bertukar tempat di kalimat kedua");
    const b = adegan(M_VIDEO, "dua-kurang");
    sama(jumlahId(b, 0, 9999, /^kl\d$/), 7, "kurang: tujuh kelinci di kandang");
    ["satu", "dua", "tiga"].forEach((w, i) => { stat.hitung += 1; sama(jumlahId(b, 1, posKata(b, 1, w, w === "tiga" ? 2 : 1), /^xh\d$/), i + 1, `kurang: ${i + 1} kelinci hitam diketuk pada kata ${w}`); });
    ["satu", "dua", "tiga", "empat"].forEach((w, i) => { stat.hitung += 1; sama(jumlahId(b, 3, posKata(b, 3, w, w === "empat" ? 2 : 1), /^xc\d$/), i + 1, `kurang: ${i + 1} kelinci cokelat diketuk pada kata ${w}`); });
    const o2 = akhirAdegan(b, 2);
    cek([4, 5, 6].every((i) => ketemu(o2, `kl${i}`).op === 0.3) && [0, 1, 2, 3].every((i) => (ketemu(o2, `kl${i}`).op ?? 1) === 1), "kurang: empat kelinci cokelat tersisa terang, tiga hitam pudar");
    const o4 = akhirAdegan(b, 4);
    cek([0, 1, 2, 3].every((i) => ketemu(o4, `kl${i}`).op === 0.3) && [4, 5, 6].every((i) => (ketemu(o4, `kl${i}`).op ?? 1) === 1), "kurang: tiga kelinci hitam tersisa terang, empat cokelat pudar");
  }
  // 6) Empat kalimat satu keluarga terkumpul di kartu.
  {
    const a = adegan(M_VIDEO, "empat-kalimat");
    sama([0, 1, 2, 3].map((i) => isiTeks(akhirAdegan(a, 2), `ek${i}-t0`)), ["4 + 3 = 7", "3 + 4 = 7", "7 − 3 = 4", "7 − 4 = 3"], "empat kalimat: dua tambah, dua kurang dari keluarga 4, 3, 7");
    stat.tambah += 0;
  }
  // 7) Kebalikan: pelompat maju dari tiga ke tujuh lalu mundur ke tiga; kaos: lima kaos, diambil, dan dikembalikan.
  const jejak = [
    [M_VIDEO, "kebalikan", 1, [4, 5, 6, 7], "ba"],
    [M_VIDEO, "kebalikan", 3, [6, 5, 4, 3], "ba"],
    [U, "luar-mundur", 1, [7, 6, 5], "du"],
    [U, "luar-mundur", 3, [6, 7, 8], "du"],
    [U, "luar-mundur-terapan", 1, [8, 7, 6, 5], "eu"],
  ];
  for (const [v, id, ke, nilai, dasar] of jejak) {
    const a = adegan(v, id);
    stat.jejak += 1;
    sama(jejakUp(a, ke).slice(-nilai.length), nilai.map(xv), `${id}#${ke + 1}: pelompat berpindah mengikuti ${nilai.join(" ")}`);
    const pos = kataSuara(a.ketukan[ke]);
    {
      const sebut = pos.filter((w) => NAMA_ANGKA.includes(w));
      let dari = 0;
      const urut = nilai.every((n) => { const q = sebut.indexOf(NAMA_ANGKA[n], dari); dari = q + 1; return q >= 0; });
      cek(urut, `${id}#${ke + 1}: suara menyebut ${nilai.join(" ")} berurutan (${sebut.join(" ")})`);
    }
    nilai.forEach((n) => {
      const q = [...pos.keys()].filter((r) => pos[r] === NAMA_ANGKA[n]).pop();
      const up = ketemu(L.keadaanStory(a, ke, q), "up");
      cek(up && Math.abs(up.x - xv(n)) < 0.01, `${id}#${ke + 1}: pelompat di nilai ${n} saat kata ${NAMA_ANGKA[n]} diucapkan`);
    });
    const o = akhirAdegan(a, ke);
    sama([...Array(10).keys()].map((i) => isiTeks(o, `${dasar}t${i + 1}`)), [...Array(10).keys()].map((i) => String(i + 1)), `${id}: deretan bilangan satu sampai sepuluh`);
  }
  {
    // Maju empat lalu mundur empat: kembali ke bilangan semula; kalimat di atas deretan ikut berubah.
    const a = adegan(M_VIDEO, "kebalikan");
    sama([isiTeks(akhirAdegan(a, 1), "bq-t0"), isiTeks(akhirAdegan(a, 2), "bq-t0"), isiTeks(akhirAdegan(a, 3), "bq-t0"), isiTeks(akhirAdegan(a, 4), "bq-t0")], ["3 + 4 = ?", "3 + 4 = 7", "7 − 4 = ?", "7 − 4 = 3"], "kebalikan: kalimat di atas deretan");
    const b = adegan(U, "luar-mundur");
    sama([isiTeks(akhirAdegan(b, 0), "dq-t0"), isiTeks(akhirAdegan(b, 2), "dq-t0"), isiTeks(akhirAdegan(b, 3), "dq-t0")], ["8 − 3 = ?", "8 − 3 = 5", "5 + 3 = 8"], "hitung mundur: kalimat di atas deretan");
  }
  {
    const a = adegan(M_VIDEO, "kaos-jemuran");
    sama([jumlahId(a, 0, 9999, /^ky\d$/), jumlahId(a, 0, 9999, /^km\d$/)], [3, 2], "kaos: tiga kuning dan dua merah muda");
    ["satu", "dua"].forEach((w, i) => { stat.hitung += 1; sama(jumlahId(a, 2, posKata(a, 2, w, w === "dua" ? 2 : 1), /^xp\d$/), i + 1, `kaos: ${i + 1} kaos merah muda diketuk pada kata ${w}`); });
    ["satu", "dua", "tiga"].forEach((w, i) => { stat.hitung += 1; sama(jumlahId(a, 4, posKata(a, 4, w, w === "tiga" ? 2 : 1), /^xk\d$/), i + 1, `kaos: ${i + 1} kaos kuning diketuk pada kata ${w}`); });
    cek(jumlahId(a, 4, 9999, /^xp\d$/) === 0 && [0, 1].every((i) => (ketemu(akhirAdegan(a, 4), `km${i}`).op ?? 1) === 1), "kaos: kaos merah muda kembali sebelum kaos kuning diambil");
  }
  // 8) Tukar tempat: hanya penjumlahan; tiga kelinci tidak cukup untuk diambil tujuh.
  {
    const a = adegan(M_VIDEO, "tukar-tempat");
    sama([isiTeks(akhirAdegan(a, 0), "tk1-t0"), isiTeks(akhirAdegan(a, 0), "tk2-t0"), isiTeks(akhirAdegan(a, 1), "tk3-t0")], ["4 + 3 = 7", "3 + 4 = 7", "7 − 3 = 4"], "tukar tempat: dua kalimat tambah sama, kalimat kurang dari tujuh");
    cek(jumlahId(a, 2, 9999, /^tr\d$/) === 3 && isiTeks(akhirAdegan(a, 2), "tc-t0") === "tidak cukup!", "tukar tempat: tiga kelinci, tidak cukup");
  }
  // 9) Memeriksa: pengurangan dengan penjumlahan, penjumlahan dengan pengurangan (dua cara).
  {
    const a = adegan(M_VIDEO, "periksa-kurang");
    sama([isiTeks(akhirAdegan(a, 1), "pm-t0"), isiTeks(akhirAdegan(a, 1), "pn-t0")], ["mulai: 5", "tambah: 4"], "periksa kurang: mulai dari hasil, tambah bilangan yang diambil");
    const b = adegan(M_VIDEO, "periksa-tambah");
    cek(ketemu(akhirAdegan(b, 2), "ua0").sorot === true && ketemu(akhirAdegan(b, 2), "ub4").sorot === true && isiTeks(akhirAdegan(b, 2), "ua0") === isiTeks(akhirAdegan(b, 2), "ub4"), "periksa tambah: hasil pengurangan sama dengan bilangan pertama");
    cek(ketemu(akhirAdegan(b, 3), "ua2").sorot === true && isiTeks(akhirAdegan(b, 3), "ua2") === isiTeks(akhirAdegan(b, 3), "uc4"), "periksa tambah: cara lain, hasilnya sama dengan bilangan kedua");
  }
  // 10) Cari yang hilang: enam tambah berapa sama dengan sembilan, dibalik menjadi sembilan kurang enam.
  {
    const a = adegan(M_VIDEO, "cari-hilang");
    sama([0, 1, 2, 3, 4].map((i) => isiTeks(akhirAdegan(a, 0), `wa${i}`)), ["6", "+", "?", "=", "9"], "hilang: soal enam tambah berapa sama dengan sembilan");
    sama([isiTeks(akhirAdegan(a, 1), "wb-t0"), isiTeks(akhirAdegan(a, 2), "wb-t0"), isiTeks(akhirAdegan(a, 2), "wa2")], ["9 − 6 = ?", "9 − 6 = 3", "3"], "hilang: dibalik menjadi 9 − 6, angka yang hilang tiga");
    sama([0, 1, 2, 3, 4].map((i) => isiTeks(akhirAdegan(a, 4), `wd${i}`)), ["?", "−", "5", "=", "2"], "hilang: soal berapa kurang lima sama dengan dua");
    stat.pilihan += 1;
  }
  // 11) Memilih tanda: empat dan empat sama dengan delapan (tambah); tujuh dan tiga sama dengan empat (kurang).
  {
    const a = adegan(M_VIDEO, "pilih-tanda");
    sama([0, 1, 2, 3, 4].map((i) => isiTeks(akhirAdegan(a, 1), `ta${i}`)), ["4", "+", "4", "=", "8"], "tanda: empat tambah empat sama dengan delapan");
    sama([0, 1, 2, 3, 4].map((i) => isiTeks(akhirAdegan(a, 3), `tb${i}`)), ["7", "−", "3", "=", "4"], "tanda: tujuh kurang tiga sama dengan empat");
    cek(isiTeks(akhirAdegan(a, 0), "ta1") === "○" && isiTeks(akhirAdegan(a, 2), "tb1") === "○", "tanda: tanda yang hilang tampak sebagai lingkaran sebelum dipilih");
    cek(ketemu(akhirAdegan(a, 1), "bp-k").sorot === true && ketemu(akhirAdegan(a, 3), "bm-k").sorot === true, "tanda: tombol tambah lalu tombol kurang dipilih dengan ketukan");
    stat.pilihan += 2;
  }
  // 12) Menyusun keluarga bilangan di layar (pengganti kegiatan bersama): enam anak duduk, dua bersepeda, kartu dua, enam, delapan.
  {
    const a = adegan(M_VIDEO, "susun-layar");
    sama([jumlahId(a, 0, 9999, /^ua\d$/), jumlahId(a, 0, 9999, /^ub\d$/)], [6, 2], "susun layar: enam anak duduk dan dua anak bersepeda");
    const o = akhirAdegan(a, 1);
    cek(ketemu(o, "n2-k").sorot === true && ketemu(o, "n6-k").sorot === true && ketemu(o, "n8-k").sorot === true && !ketemu(o, "n4-k").sorot && !ketemu(o, "n10-k").sorot, "susun layar: kartu dua, enam, dan delapan dipilih dengan ketukan");
    cek(ketemu(akhirAdegan(a, 4), "sg") !== undefined, "susun layar: tombol suara untuk mendengar lagi");
    stat.pilihan += 1;
  }
  // 13) Latihan: pilihan kalimat sekeluarga, jawaban kue, pilihan tanda.
  {
    const a = adegan(M_VIDEO, "latihan-satu");
    sama([jumlahId(a, 0, 9999, /^lm\d$/)], [7], "Latihan 1: lima balon merah dan dua balon biru");
    const o = akhirAdegan(a, 2);
    cek(ketemu(o, "o1-k").sorot === true && isiTeks(o, "o1-t0") === "7 − 5 = 2" && isiTeks(o, "o2-t0") === "6 − 2 = 4", "Latihan 1: kalimat sekeluarga dipilih dari dua pilihan");
    sama([isiTeks(akhirAdegan(a, 3), "o1-t0"), isiTeks(akhirAdegan(a, 3), "o4-t0")], ["7 − 5 = 2", "7 − 2 = 5"], "Latihan 1: dua kalimat kurang sekeluarga");
    const b = adegan(M_VIDEO, "latihan-dua");
    sama([jumlahId(b, 0, 9999, /^ku\d$/), [5, 6, 7, 8].filter((i) => ketemu(akhirAdegan(b, 0), `ku${i}`).op === 0.3).length], [9, 4], "Latihan 2: sembilan kue, empat dimakan (pudar)");
    cek(ketemu(akhirAdegan(b, 2), "jb4-k").sorot === true && isiTeks(akhirAdegan(b, 2), "mc") === "9 − 5 = 4", "Latihan 2: jawaban empat dipilih dengan ketukan");
    const c = adegan(M_VIDEO, "latihan-tiga");
    sama([isiTeks(akhirAdegan(c, 1), "nn1"), ketemu(akhirAdegan(c, 1), "bm-k").sorot], ["−", true], "Latihan 3: tanda kurang dipilih");
    stat.pilihan += 3;
  }
  // 14) Metode luar: Mengambil (ketuk benda yang pergi), Hitung Mundur, dan Kurang di Bingkai (kosongkan, lalu isi lagi).
  {
    const a = adegan(U, "luar-ambil");
    sama(jumlahId(a, 0, 9999, /^kl\d$/), 7, "Mengambil: tujuh kelinci di kandang");
    ["satu", "dua", "tiga"].forEach((w, i) => { stat.hitung += 1; sama(jumlahId(a, 1, posKata(a, 1, w, w === "tiga" ? 2 : 1), /^xh\d$/), i + 1, `Mengambil: ${i + 1} kelinci hitam diketuk pada kata ${w}`); });
    cek([4, 5, 6].every((i) => ketemu(akhirAdegan(a, 2), `kl${i}`).op === 0.3) && [4, 5, 6].every((i) => (ketemu(akhirAdegan(a, 3), `kl${i}`).op ?? 1) === 1), "Mengambil: tiga kelinci pergi, lalu dikembalikan");
    const b = adegan(U, "luar-ambil-terapan");
    sama([jumlahId(b, 0, 9999, /^kp\d$/), ketemu(akhirAdegan(b, 1), "kp3").op, (ketemu(akhirAdegan(b, 3), "kp3").op ?? 1)], [4, 0.3, 1], "Mengambil terapan: empat kepik, satu terbang, lalu kembali");
    const c = adegan(U, "luar-mundur-terapan");
    sama(jumlahId(c, 0, 9999, /^el\d$/), 9, "Hitung Mundur terapan: sembilan kelereng");
    cek([5, 6, 7, 8].every((i) => ketemu(akhirAdegan(c, 1), `el${i}`).op === 0.25) && [0, 1, 2, 3, 4].every((i) => (ketemu(akhirAdegan(c, 1), `el${i}`).op ?? 1) === 1), "Hitung Mundur terapan: empat kelereng pergi, lima tersisa");
  }
  for (const [id, jumlah, pergi, titikKe] of [["luar-bingkai", 7, 3, [4, 5, 6]], ["luar-bingkai-terapan", 8, 5, [3, 4, 5, 6, 7]]]) {
    const a = adegan(U, id);
    stat.bingkai += 1;
    const titikAda = (ke, p = 9999) => L.keadaanStory(a, ke, p).filter((o) => /^bm\d$/.test(o.id));
    sama([titikAda(0).length, titikAda(1).length, titikAda(2).length, titikAda(3).length], [jumlah, jumlah - pergi, jumlah - pergi, jumlah], `${id}: ${jumlah} titik, dikosongkan ${pergi}, lalu diisi lagi`);
    const w1 = kataSuara(a.ketukan[1]);
    const dari = w1.indexOf(id === "luar-bingkai" ? "dikosongkan" : "dimakan");
    ["satu", "dua", "tiga", "empat", "lima"].slice(0, pergi).forEach((n, i) => sama(titikAda(1, w1.indexOf(n, dari + 1)).length, jumlah - i - 1, `${id}: titik berkurang satu demi satu pada kata ${n}`));
    const o = titikAda(3);
    sama(new Set(o.map((x) => `${x.x},${x.y}`)).size, jumlah, `${id}: tiap titik di petak yang berbeda`);
    cek(o.every((x) => x.x > 85 && x.x < 215 && x.y > 66 && x.y < 118), `${id}: titik berada di dalam bingkai`);
    cek(titikKe.every((i) => titikAda(2).every((x) => x.id !== `bm${i}`) === (i >= jumlah - pergi)), `${id}: titik yang dikosongkan adalah titik terakhir`);
  }
  {
    const o = akhirAdegan(adegan(U, "luar-bingkai"), 0);
    cek(ketemu(o, "bf-c9") && isiTeks(o, "tp") === "10 petak", "bingkai: sepuluh petak tampak");
    sama([isiTeks(akhirAdegan(adegan(U, "luar-bingkai"), 2), "bj-t0"), isiTeks(akhirAdegan(adegan(U, "luar-bingkai"), 3), "bk-t0"), isiTeks(akhirAdegan(adegan(U, "luar-bingkai-terapan"), 2), "bj-t0"), isiTeks(akhirAdegan(adegan(U, "luar-bingkai-terapan"), 3), "bk-t0")], ["7 − 3 = 4", "4 + 3 = 7", "8 − 5 = 3", "3 + 5 = 8"], "bingkai: kalimat kurang lalu kalimat tambah kebalikannya");
  }
  // 15) Metode luar: nama (bahasa Indonesia) tampil pada kepala tiap adegan konsep dan terapan.
  for (const [id, i] of [["luar-ambil", 0], ["luar-ambil-terapan", 0], ["luar-mundur", 1], ["luar-mundur-terapan", 1], ["luar-bingkai", 2], ["luar-bingkai-terapan", 2]]) {
    const semuaT = adegan(U, id).ketukan.flatMap((kt, q) => L.teksTerlihat(L.keadaanStory(adegan(U, id), q, 9999)));
    cek(semuaT.includes(U1.NAMA_METODE[i]), `${id}: kepala memuat ${U1.NAMA_METODE[i]}`);
  }
}

/* ------------------------------ Aplikasi belajar mandiri: tanpa instruksi kelompok, teman, buku, menulis, menggambar, atau benda nyata ------------------------------ */
{
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      const semua = [a.judul, a.sumber, v.judul, v.subjudul];
      a.ketukan.forEach((kt, i) => {
        semua.push(kt.suara);
        for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) semua.push(...L.teksTerlihat(L.keadaanStory(a, i, p)));
      });
      const kena = semua.filter((t) => TERLARANG_PEMILIK.test(t));
      cek(kena.length === 0, `${v.id}/${a.id}: tanpa kelompok, teman, depan kelas, buku, menulis di, menggambar, bawa, kertas, atau pensil (${kena.slice(0, 2).join(" | ")})`);
    }
  }
}

/* ------------------------------ Sapaan, peta susun, dan tabel susun ------------------------------ */
{
  const sap = adegan(M_VIDEO, "sapaan");
  const DAFTAR = ["Keluarga bilangan", "Dua tambah, dua kurang", "Memeriksa jawaban"];
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Keluarga bilangan/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => DAFTAR.includes(t)), DAFTAR, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara), "sapaan materi: tanpa angka");
  cek(adegan(U, "sapaan").sumber.startsWith("Metode luar") && sap.sumber.startsWith("Materi"), "sapaan: dua jenis (materi dan metode luar)");
  // Data peta dan tabel: dibaca dari berkas ringkas bila sudah digabung koordinator, bila belum dari berkas sementara .tmp-k1b3s/C.json.
  let A = null;
  try {
    A = JSON.parse(readFileSync(new URL("../src/data/kelas1-bab3-ringkas.json", import.meta.url), "utf8")).subBab.C;
  } catch {}
  if (!A || !A.petaSusun) {
    try {
      A = JSON.parse(readFileSync(new URL("../.tmp-k1b3s/C.json", import.meta.url), "utf8"));
    } catch {}
  }
  cek(!!(A && A.petaSusun && A.tabelSusun), "peta dan tabel susun: data ada (kelas1-bab3-ringkas.json subBab.C atau .tmp-k1b3s/C.json)");
  if (A && A.petaSusun && A.tabelSusun) {
    const peta = A.petaSusun.simpul;
    const anak = (id) => peta.filter((s) => s.induk === id).map((s) => s.teks);
    const akar = peta.filter((s) => s.induk === null);
    cek(akar.length === 3, "peta susun: tiga cabang dari pusat");
    sama(anak(akar[0].id), DAFTAR, "peta susun: cabang pertama sama dengan daftar sapaan");
    sama([anak(akar[1].id).length, anak(akar[2].id).length, peta.length], [3, 2, 11], "peta susun: 3 cara, 2 hasil, 11 simpul");
    sama(peta.map((s) => s.nomor), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], "peta susun: nomor 1 sampai 11");
    cek(peta.every((s) => s.teks.length <= 28) && new Set(peta.map((s) => s.teks)).size === peta.length, "peta susun: teks <= 28 huruf dan unik");
    cek(!/\d/.test(A.petaSusun.pusat.suara) && !/\d/.test(A.petaSusun.petunjuk) && peta.every((s) => !/\d/.test(s.petunjuk ?? "")), "peta susun: suara dan petunjuk tanpa digit");
    cek(!TERLARANG_PEMILIK.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: tanpa kata terlarang (kelompok, teman, buku, menulis di, menggambar, bawa, kertas, pensil)");
    cek(!/halaman|kunci|Take Away|Counting|Ten Frame/i.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: tanpa kata halaman, kunci, atau nama metode berbahasa Inggris");
    cek(!/\bbelas\b|\bpuluh\b|\bratus\b|\bribu\b|dikali|dibagi/i.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: hanya bilangan sampai sepuluh");
    cek(A.petaSusun.pusat.judul.length <= 28, "peta susun: judul pusat <= 28 huruf (masalah sub-bab)");
    const T = A.tabelSusun;
    cek(T.baris.length >= 3 && T.baris.length <= 5 && T.kolom.length >= 3 && T.kolom.length <= 4, "tabel susun: 3 sampai 5 baris dan 3 sampai 4 kolom");
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 26 && (s.match(/\d+/g) ?? []).length <= 1)), "tabel susun: sel <= 26 huruf dan paling banyak satu angka per sel");
    cek(T.baris.every((b) => b.label.split(/\s+/).every((w) => w.length <= 8)), "tabel susun: kata terlama kolom label <= 8 huruf");
    cek(!/\d/.test(T.suara) && !/\d/.test(T.petunjuk), "tabel susun: suara dan petunjuk tanpa digit");
    cek(T.baris.every((b) => { const [semua, pergi, sisa] = b.sel.map(Number); return semua - pergi === sisa && pergi + sisa === semua && semua <= 10 && pergi >= 1; }), "tabel susun: tiap baris semua kurang pergi sama dengan sisa (dan sisa tambah pergi sama dengan semua), paling banyak sepuluh");
    // Margin teks sel >= 5 px di lebar 405 px: sel satu angka (lebar teks jauh di bawah lebar sel), label terpanjang dipakai sebagai batas.
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 2)) && Math.max(...T.baris.map((b) => b.label.length)) <= 8, "tabel susun: sel pendek supaya margin teks >= 5 px di lebar 405 px");
  }
}


/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k1b3c-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k1b3c-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k1b3c sendiri (${impor.join(", ")})`);
  }
  // Emoji dalam data teks gambar juga paling tinggi Emoji 12 (diperiksa pada gambar yang diputar).
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${v.id}/${a.id}: emoji gambar paling tinggi Emoji 12`);
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k1b3c.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|naskah-k1b1/.test(pembungkus) && /VIDEO_MATERI_K1B3C/.test(pembungkus) && /VIDEO_LUAR_K1B3C/.test(pembungkus) && /export function VideoK1B3C/.test(pembungkus) && /daftar-video-cerita/.test(pembungkus), "video-k1b3c.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k1b3c.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k1b3c.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k1b3c.mjs: akhir baris LF");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit diputar)`);
}
console.log(`Pemeriksaan: ${stat.tambah} kalimat tambah, ${stat.kurang} kalimat kurang, ${stat.rumus} rumus tersusun, ${stat.hitung} hitungan benda, ${stat.jejak} jejak pelompat, ${stat.bingkai} bingkai sepuluh, ${stat.segitiga} segitiga keluarga, ${stat.pilihan} pilihan ketukan`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
