// Uji Story Kelas 1 Bab 2 Sub-Bab C (Soal Cerita Penjumlahan): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar,
// hanya penjumlahan dengan jumlah sampai sepuluh (tanpa kurang atau bilangan lebih dari sepuluh), tiap kalimat penjumlahan di gambar benar, hitungan benda satu demi satu,
// rumus yang tersusun potongan demi potongan mengikuti kata bilangan, jejak pelompat di deretan bilangan, bingkai sepuluh, diagram bagian-utuh, peta dan tabel susun,
// tanpa instruksi kelompok, teman, depan kelas, atau kegiatan di buku (aplikasi belajar mandiri), emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k1b2c.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k1b2c-video.ts");
const U1 = await import("../src/components/modul/story/k1b2c-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K1B2C, V.VIDEO_LUAR_K1B2C];
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
const M_VIDEO = V.VIDEO_MATERI_K1B2C;
const U = V.VIDEO_LUAR_K1B2C;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /Counting On|Part.Part.Whole|Ten Frame|Menghitung Maju|Bagian.Utuh|Jumlah di Bingkai|metode luar|metode dari luar/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE, ["Counting On", "Part–Part–Whole", "Ten Frame Add"], "nama metode di berkas luar-1");
  sama(U1.NAMA_METODE_ID, ["Menghitung Maju", "Bagian–Utuh", "Jumlah di Bingkai Sepuluh"], "nama Indonesia metode luar");
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
  cek(M_VIDEO.id === "k1b2c-materi" && U.id === "k1b2c-luar", "id video k1b2c-materi dan k1b2c-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,cerita-burung,tiga-bagian,cari-bilangan,kata-petunjuk,tulis-kalimat,kalimat-jawaban,soal-pensil,soal-anak,sepeda-becak,periksa,susun-cerita,latihan-satu,latihan-dua,latihan-tiga,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-maju,luar-maju-terapan,luar-bagian,luar-bagian-terapan,luar-bingkai,luar-bingkai-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 3 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 3 lalu penutup");
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-maju", "luar-maju-terapan", "luar-bagian", "luar-bagian-terapan", "luar-bingkai", "luar-bingkai-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  for (const kata of ["Latihan", "Igil", "Malosi", "Kira", "Upe", "Wei", "Halim", "burung", "pensil", "ditambah", "sama dengan", "jawaban", "periksa", "soal cerita"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Hanya penjumlahan dengan jumlah sampai 10: tanpa kurang, banding, atau bilangan lebih dari sepuluh.
  const BOCOR = /kurang|lebih (banyak|besar|sedikit|kecil)|bandingkan|membandingkan|\bbelas\b|\bpuluh\b|\bratus\b|\bribu\b|sebelas|dua belas|operasi|hasil bagi|dikali/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: hanya penjumlahan sampai sepuluh, tanpa kurang, banding, atau bilangan lebih dari sepuluh`);
    for (const a of v.adegan) for (const [i] of a.ketukan.entries()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 10, `${v.id}/${a.id}#${i + 1}: angka di gambar paling besar sepuluh ("${t}")`);
  }
  cek(totalKetukan >= 70, `total ketukan cukup dalam (${totalKetukan})`);
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

/* ------------------------------ Penjumlahan, hitungan benda, deretan bilangan, bingkai sepuluh, dan diagram bagian-utuh ------------------------------ */
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
const stat = { kalimat: 0, hitung: 0, jejak: 0, bingkai: 0, diagram: 0, kartuJawab: 0 };
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
  // 1) Semua kalimat penjumlahan yang tampak benar dan tidak lebih dari sepuluh; tanpa tanda kurang.
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((kt, i) => {
        const teksSemua = L.teksTerlihat(L.keadaanStory(a, i, 9999));
        for (const t of teksSemua) {
          for (const m of t.matchAll(/(\d+)\s*\+\s*(\d+)\s*=\s*(\d+)/g)) {
            stat.kalimat += 1;
            cek(Number(m[1]) + Number(m[2]) === Number(m[3]) && Number(m[3]) <= 10, `${v.id}/${a.id}#${i + 1}: kalimat penjumlahan benar dan jumlah paling banyak sepuluh ("${m[0]}")`);
          }
          cek(!/\d\s*[-−–]\s*\d|\d\s*[×÷]\s*\d/.test(t), `${v.id}/${a.id}#${i + 1}: tanpa tanda kurang, kali, atau bagi ("${t}")`);
        }
      });
    }
  }
  // 2) Hitungan burung di dahan: satu demi satu pada kata bilangan, lalu dua burung datang lagi.
  {
    const a = adegan(M_VIDEO, "cerita-burung");
    const nama = ["satu", "dua", "tiga", "empat"];
    nama.forEach((w, i) => {
      stat.hitung += 1;
      const p = posKata(a, 1, w);
      sama(jumlahId(a, 1, p, /^b\d$/), i + 1, `burung: ${i + 1} burung tampak pada kata ${w}`);
      sama(isiTeks(L.keadaanStory(a, 1, p), `bn${i}`), String(i + 1), `burung: nomor ${i + 1} di atas burung ke-${i + 1}`);
    });
    sama([jumlahId(a, 1, 9999, /^b\d$/), jumlahId(a, 2, -1, /^b\d$/), jumlahId(a, 2, 9999, /^b\d$/)], [4, 4, 6], "burung: empat, lalu enam setelah dua burung datang");
    const xs = [0, 1, 2, 3, 4, 5].map((i) => ketemu(akhirAdegan(a, 2), `b${i}`).x);
    cek(xs.every((x, i) => i === 0 || x > xs[i - 1]), "burung: enam burung berderet di dahan dari kiri ke kanan");
    sama(isiTeks(akhirAdegan(a, 2), "dl-t0"), "datang lagi: 2 burung", "burung: kartu datang lagi dua burung");
  }
  // 3) Tiga bagian soal cerita.
  {
    const a = adegan(M_VIDEO, "tiga-bagian");
    const o = akhirAdegan(a, 2);
    sama(["g1-t0", "g2-t0", "g3-t0"].map((i) => isiTeks(o, i)), ["1. Yang ada: 4 burung", "2. Datang lagi: 2 burung", "3. Semua ada berapa burung?"], "tiga bagian: tiga kartu berurutan");
    sama([jumlahId(a, 0, 9999, /^e\d$/), jumlahId(a, 1, 9999, /^e\d$/)], [4, 6], "tiga bagian: empat burung lalu enam burung");
  }
  // 4) Mencari dua bilangan: kartu angka tiga dan empat, sesuai cerita Halim.
  {
    const a = adegan(M_VIDEO, "cari-bilangan");
    const o = akhirAdegan(a, 1);
    sama([isiTeks(o, "p1-t"), isiTeks(o, "p2-t")], ["3", "4"], "cari bilangan: kartu tiga dan empat");
    sama([jumlahId(a, 0, 9999, /^pm\d$/), jumlahId(a, 0, 9999, /^ph\d$/)], [3, 4], "cari bilangan: tiga pensil merah dan empat pensil hijau");
  }
  // 5) Menulis kalimat penjumlahan: potongan 4, +, 2, =, 6 muncul berurutan pada katanya dan berderet kiri ke kanan.
  {
    const a = adegan(M_VIDEO, "tulis-kalimat");
    const kotakAda = (ke, p) => jumlahId(a, ke, p, /^t\d-k$/);
    sama([kotakAda(1, -1), kotakAda(1, posKata(a, 1, "empat")), kotakAda(1, posKata(a, 1, "tanda")), kotakAda(1, 9999)], [0, 1, 2, 3], "tulis kalimat: empat, lalu tanda tambah, lalu dua muncul berurutan");
    const o = akhirAdegan(a, 3);
    sama([0, 1, 2, 3, 4].map((i) => isiTeks(o, `t${i}-t`)), ["4", "+", "2", "=", "6"], "tulis kalimat: 4 + 2 = 6 tersusun");
    const xs = [0, 1, 2, 3, 4].map((i) => ketemu(o, `t${i}-k`).x);
    cek(xs.every((x, i) => i === 0 || x > xs[i - 1]), "tulis kalimat: kotak berderet kiri ke kanan");
    stat.kalimat += 1;
  }
  // 6) Kalimat jawaban lengkap memuat hasil dan nama benda; pilihan nama benda burung.
  {
    const a = adegan(M_VIDEO, "kalimat-jawaban");
    sama(isiTeks(akhirAdegan(a, 2), "jl-t0"), "Semuanya ada 6 burung.", "jawaban lengkap: hasil dan nama benda");
    sama([isiTeks(akhirAdegan(a, 3), "b1-t0"), isiTeks(akhirAdegan(a, 3), "b2-t0"), isiTeks(akhirAdegan(a, 3), "b3-t0")], ["Semuanya ada", "6", "burung"], "jawaban lengkap: tiga bagian kalimat jawaban");
    cek(ketemu(akhirAdegan(a, 4), "c1-k").warna === "#FFC800" && isiTeks(akhirAdegan(a, 4), "c1-t0") === "burung", "pilihan nama benda: burung terpilih");
    stat.kartuJawab += 1;
  }
  // 7) Rumus yang disusun potongan demi potongan: urutan potongan, hasil benar, dan kata bilangan di suara berurutan.
  const rumus = [
    [M_VIDEO, "soal-pensil", 2, "ps", [3, 4, 7]],
    [M_VIDEO, "soal-anak", 2, "as", [5, 3, 8]],
    [M_VIDEO, "sepeda-becak", 4, "rj", [6, 3, 9]],
    [M_VIDEO, "susun-cerita", 3, "su", [6, 4, 10]],
    [M_VIDEO, "latihan-satu", 2, "ls", [2, 6, 8]],
    [M_VIDEO, "latihan-tiga", 1, "qq", [3, 2, 5]],
  ];
  for (const [v, id, ke, p, [b1, b2, h]] of rumus) {
    const a = adegan(v, id);
    const o = akhirAdegan(a, ke);
    stat.kalimat += 1;
    sama([0, 1, 2, 3, 4].map((i) => isiTeks(o, `${p}${i}`)), [String(b1), "+", String(b2), "=", String(h)], `${id}: rumus ${b1} + ${b2} = ${h} tersusun`);
    const xs = [0, 1, 2, 3, 4].map((i) => ketemu(o, `${p}${i}`).x);
    cek(xs.every((x, i) => i === 0 || x > xs[i - 1]), `${id}: potongan rumus berderet kiri ke kanan`);
    const w = kataSuara(a.ketukan[ke]).filter((q) => NAMA_ANGKA.includes(q));
    sama(w.slice(0, 3), [NAMA_ANGKA[b1], NAMA_ANGKA[b2], NAMA_ANGKA[h]], `${id}: suara menyebut ${NAMA_ANGKA[b1]}, ${NAMA_ANGKA[b2]}, ${NAMA_ANGKA[h]}`);
    const pos = [0, 1, 2, 3, 4].map((i) => [...Array(L.kataDari(a.ketukan[ke].suara).length).keys()].find((q) => ketemu(L.keadaanStory(a, ke, q), `${p}${i}`)));
    cek(pos.every((q, i) => q !== undefined && (i === 0 || q > pos[i - 1])), `${id}: potongan rumus muncul satu demi satu mengikuti ucapan`);
  }
  // 8) Sepeda dan becak: roda dihitung dua, empat, enam, lalu enam ditambah tiga.
  {
    const a = adegan(M_VIDEO, "sepeda-becak");
    sama([0, 1, 2].map((i) => isiTeks(akhirAdegan(a, 3), `rt${i}`)), ["2", "4", "6"], "sepeda: hitungan roda dua, empat, enam");
    sama([0, 1, 2].map((i) => jumlahId(a, 3, posKata(a, 3, ["dua", "empat", "enam"][i]), /^rt\d$/)), [1, 2, 3], "sepeda: hitungan roda muncul pada kata bilangannya");
    sama(isiTeks(akhirAdegan(a, 1), "kd-t0"), "kendaraan: 3 + 1 = 4", "sepeda: pertanyaan kendaraan");
    sama(jumlahId(a, 0, 9999, /^sp\d$/), 3, "sepeda: tiga sepeda");
    stat.hitung += 1;
  }
  // 9) Jejak katak dan anak di deretan bilangan mengikuti kata bilangan.
  const jejak = [
    [M_VIDEO, "soal-anak", 4, [5, 6, 7, 8]],
    [M_VIDEO, "periksa", 2, [4, 5, 6]],
    [U, "luar-maju", 2, [5, 6]],
    [U, "luar-maju-terapan", 1, [5, 6, 7, 8]],
  ];
  for (const [v, id, ke, nilai] of jejak) {
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
    const dasar = ["ak", "pr", "mu", "tu"].find((d) => ketemu(o, `${d}t1`));
    sama([...Array(10).keys()].map((i) => isiTeks(o, `${dasar}t${i + 1}`)), [...Array(10).keys()].map((i) => String(i + 1)), `${id}: deretan bilangan satu sampai sepuluh`);
  }
  // 10) Pilihan kalimat pada Latihan 2: pilihan yang cocok (lima ditambah empat) terpilih.
  {
    const a = adegan(M_VIDEO, "latihan-dua");
    const o = akhirAdegan(a, 2);
    sama([isiTeks(o, "o1-t0"), isiTeks(o, "o2-t0")], ["5 + 4 = 9", "5 + 3 = 8"], "Latihan 2: dua pilihan kalimat");
    cek(ketemu(o, "o1-k").warna === "#FFC800", "Latihan 2: pilihan yang cocok disorot");
    sama([jumlahId(a, 0, 9999, /^kw\d$/), jumlahId(a, 0, 9999, /^ku\d$/)], [5, 4], "Latihan 2: lima kue Wei dan empat kue Upe");
    const b = adegan(M_VIDEO, "latihan-satu");
    sama([jumlahId(b, 0, 9999, /^lk\d$/), jumlahId(b, 0, 9999, /^lb\d$/)], [2, 6], "Latihan 1: dua balon dan enam balon");
    const c = adegan(M_VIDEO, "latihan-tiga");
    sama([jumlahId(c, 0, 9999, /^mt\d$/), jumlahId(c, 0, 9999, /^mb\d$/)], [3, 2], "Latihan 3: tiga motor dan dua mobil");
    sama(isiTeks(akhirAdegan(c, 2), "qj-t0"), "Semuanya ada 5 kendaraan.", "Latihan 3: kalimat jawaban");
  }
  // 11) Menyusun cerita di layar (tanpa kegiatan di luar layar): stoples enam merah dan empat biru, kalimat, lalu jawaban.
  {
    const a = adegan(M_VIDEO, "susun-cerita");
    sama([jumlahId(a, 1, 9999, /^ma\d$/), jumlahId(a, 2, 9999, /^mb\d$/)], [6, 4], "susun cerita: enam kelereng merah dan empat kelereng biru");
    sama(isiTeks(akhirAdegan(a, 4), "sj-t0"), "Semuanya ada 10 kelereng.", "susun cerita: kalimat jawaban sepuluh kelereng");
    cek(ketemu(akhirAdegan(a, 1), "n6-k").sorot === true && ketemu(akhirAdegan(a, 2), "n4-k").sorot === true, "susun cerita: angka enam lalu empat dipilih dengan ketukan");
  }
  // 12) Bingkai sepuluh: titik merah lalu biru mengisi petak berbeda, jumlah sesuai cerita.
  for (const [id, merahN, biruN, ke1, ke2, sesudah] of [["luar-bingkai", 5, 3, 1, 2, "merah"], ["luar-bingkai-terapan", 6, 4, 1, 2, "jeruk"]]) {
    const a = adegan(U, id);
    stat.bingkai += 1;
    sama([jumlahId(a, ke1, 9999, /^bm\d$/), jumlahId(a, ke2, 9999, /^bb\d+$/)], [merahN, biruN], `${id}: ${merahN} titik merah lalu ${biruN} titik biru`);
    const o = akhirAdegan(a, 3);
    const titik = o.filter((x) => /^b[mb]\d+$/.test(x.id));
    sama(new Set(titik.map((x) => `${x.x},${x.y}`)).size, merahN + biruN, `${id}: tiap titik di petak yang berbeda`);
    cek(titik.every((x) => x.x > 85 && x.x < 215 && x.y > 66 && x.y < 118), `${id}: titik berada di dalam bingkai`);
    const w = kataSuara(a.ketukan[ke1]);
    ["satu", "dua", "tiga", "empat", "lima", "enam"].slice(0, merahN).forEach((kata, i) => sama(jumlahId(a, ke1, w.indexOf(kata, w.indexOf(sesudah) + 1), /^bm\d$/), i + 1, `${id}: ${i + 1} titik merah pada kata ${kata}`));
  }
  {
    const a = adegan(U, "luar-bingkai-terapan");
    cek(isiTeks(akhirAdegan(a, 3), "bj-t0") === "6 + 4 = 10", "bingkai terapan: 6 + 4 = 10");
    sama(adegan(U, "luar-bingkai").ketukan.length, 4, "bingkai: empat ketukan");
  }
  // 13) Diagram bagian-utuh: dua bagian (tiga dan empat; enam dan tiga) membentuk utuh (tujuh; sembilan).
  for (const [id, ke, bagian, utuh] of [["luar-bagian", 3, ["3", "4"], "7"], ["luar-bagian-terapan", 2, ["6 merah", "3 biru"], "9"]]) {
    const a = adegan(U, id);
    const o = akhirAdegan(a, ke);
    stat.diagram += 1;
    sama(isiTeks(o, "wh-t0"), utuh, `${id}: utuh bernilai ${utuh}`);
    sama([isiTeks(o, "p1-t0"), isiTeks(o, "p2-t0")], bagian, `${id}: dua bagian ${bagian.join(" dan ")}`);
    cek(ketemu(o, "wh-k").y < ketemu(o, "p1-k").y && ketemu(o, "p1-k").x < ketemu(o, "p2-k").x && ketemu(o, "gl1") && ketemu(o, "gl2"), `${id}: utuh di atas, dua bagian di bawah, dihubungkan garis`);
  }
  {
    const o = akhirAdegan(adegan(U, "luar-bagian-terapan"), 0);
    sama([o.filter((x) => /^dm\d$/.test(x.id)).length, o.filter((x) => /^db\d$/.test(x.id)).length], [6, 3], "bagian terapan: enam titik merah dan tiga titik biru");
  }
  // 14) Metode luar: nama tampil pada kepala tiap adegan konsep dan terapan.
  for (const [id, i] of [["luar-maju", 0], ["luar-maju-terapan", 0], ["luar-bagian", 1], ["luar-bagian-terapan", 1], ["luar-bingkai", 2], ["luar-bingkai-terapan", 2]]) {
    const t = L.teksTerlihat(akhirAdegan(adegan(U, id), id.endsWith("terapan") ? 0 : 0));
    const semuaT = adegan(U, id).ketukan.flatMap((kt, q) => L.teksTerlihat(L.keadaanStory(adegan(U, id), q, 9999)));
    cek(t.concat(semuaT).some((s) => s.startsWith(U1.NAMA_METODE[i]) && s.includes(U1.NAMA_METODE_ID[i])), `${id}: kepala memuat ${U1.NAMA_METODE[i]} dan namanya dalam bahasa Indonesia`);
  }
}

/* ------------------------------ Aplikasi belajar mandiri: tanpa instruksi yang menuntut kelompok, teman, atau kegiatan di luar layar ------------------------------ */
{
  const LUAR_LAYAR = /kelompok|teman sekelas|depan kelas|bersama teman|bersama-sama dengan teman|berpasangan|berpasang-pasangan|di buku|ke buku|buku tulis|buat ceritamu|ceritakan di depan|tanya(kan)? (ke|pada|kepada) teman|bertanya (ke|pada|kepada) teman|ajak(lah)? teman|temanmu|kertas|gambar sendiri|menggambar|ambil benda|bawa benda|angkat jari/i;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      const semua = [a.judul, a.sumber, v.judul, v.subjudul];
      a.ketukan.forEach((kt, i) => {
        semua.push(kt.suara);
        for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) semua.push(...L.teksTerlihat(L.keadaanStory(a, i, p)));
      });
      const kena = semua.filter((t) => LUAR_LAYAR.test(t));
      cek(kena.length === 0, `${v.id}/${a.id}: tanpa instruksi kelompok, teman, depan kelas, atau kegiatan di buku (${kena.slice(0, 2).join(" | ")})`);
    }
  }
}

/* ------------------------------ Sapaan dan peta susun ------------------------------ */
{
  const sap = adegan(M_VIDEO, "sapaan");
  const DAFTAR = ["Membaca soal cerita", "Menulis kalimat tambah", "Menjawab lalu memeriksa"];
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Membaca soal cerita/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => DAFTAR.includes(t)), DAFTAR, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara), "sapaan materi: tanpa angka");
  // Data peta dan tabel: dibaca dari berkas ringkas bila sudah digabung koordinator, bila belum dari berkas sementara .tmp-k1b2s/C.json.
  let A = null;
  try {
    A = JSON.parse(readFileSync(new URL("../src/data/kelas1-bab2-ringkas.json", import.meta.url), "utf8")).subBab.C;
  } catch {}
  if (!A || !A.petaSusun) {
    try {
      A = JSON.parse(readFileSync(new URL("../.tmp-k1b2s/C.json", import.meta.url), "utf8"));
    } catch {}
  }
  cek(!!(A && A.petaSusun && A.tabelSusun), "peta dan tabel susun: data ada (kelas1-bab2-ringkas.json subBab.C atau .tmp-k1b2s/C.json)");
  if (A && A.petaSusun && A.tabelSusun) {
    const peta = A.petaSusun.simpul;
    const anak = (id) => peta.filter((s) => s.induk === id).map((s) => s.teks);
    const akar = peta.filter((s) => s.induk === null);
    cek(akar.length === 3, "peta susun: tiga cabang dari pusat");
    sama(anak(akar[0].id), DAFTAR, "peta susun: cabang pertama sama dengan daftar sapaan");
    sama([anak(akar[1].id).length, anak(akar[2].id).length, peta.length], [3, 2, 11], "peta susun: 3 cara, 2 hasil, 11 simpul");
    cek(peta.every((s) => s.teks.length <= 28) && new Set(peta.map((s) => s.teks)).size === peta.length, "peta susun: teks <= 28 huruf dan unik");
    cek(!/\d/.test(A.petaSusun.pusat.suara) && !/\d/.test(A.petaSusun.petunjuk) && peta.every((s) => !/\d/.test(s.petunjuk ?? "")), "peta susun: suara dan petunjuk tanpa digit");
    cek(!/buku|halaman|kunci/i.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: tanpa kata buku, halaman, atau kunci");
    cek(!/kelompok|teman sekelas|depan kelas|bersama teman|berpasangan|buat ceritamu|di buku/i.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: tanpa kelompok, teman sekelas, depan kelas, bersama teman, berpasangan, atau kegiatan di buku");
    cek(!/kurang|\bbelas\b|\bpuluh\b|\bratus\b|\bribu\b/i.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: hanya penjumlahan sampai sepuluh");
    cek(A.petaSusun.pusat.judul.length <= 28, "peta susun: judul pusat <= 28 huruf (masalah sub-bab berupa pertanyaan cerita)");
    const T = A.tabelSusun;
    cek(T.baris.length >= 3 && T.baris.length <= 5 && T.kolom.length >= 3 && T.kolom.length <= 4, "tabel susun: 3 sampai 5 baris dan 3 sampai 4 kolom");
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 26 && (s.match(/\d+/g) ?? []).length <= 1)), "tabel susun: sel <= 26 huruf dan paling banyak satu angka per sel");
    cek(T.baris.every((b) => b.label.split(/\s+/).every((w) => w.length <= 8)), "tabel susun: kata terpanjang kolom label <= 8 huruf");
    cek(!/\d/.test(T.suara) && !/\d/.test(T.petunjuk), "tabel susun: suara dan petunjuk tanpa digit");
    cek(T.baris.every((b) => { const [a1, a2, h] = b.sel.map(Number); return a1 + a2 === h && h <= 10; }), "tabel susun: tiap baris bilangan pertama + kedua = jumlah, paling banyak sepuluh");
  }
}


/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k1b2c-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k1b2c-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k1b2c sendiri (${impor.join(", ")})`);
  }
  // Emoji dalam data teks gambar juga paling tinggi Emoji 12 (diperiksa pada gambar yang diputar).
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${v.id}/${a.id}: emoji gambar paling tinggi Emoji 12`);
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k1b2c.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|naskah-k1b1/.test(pembungkus) && /VIDEO_MATERI_K1B2C/.test(pembungkus) && /VIDEO_LUAR_K1B2C/.test(pembungkus) && /export function VideoK1B2C/.test(pembungkus) && /daftar-video-cerita/.test(pembungkus), "video-k1b2c.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k1b2c.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k1b2c.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k1b2c.mjs: akhir baris LF");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit diputar)`);
}
console.log(`Pemeriksaan: ${stat.kalimat} kalimat penjumlahan, ${stat.hitung} hitungan benda, ${stat.jejak} jejak pelompat, ${stat.bingkai} bingkai sepuluh, ${stat.diagram} diagram bagian-utuh, ${stat.kartuJawab} kalimat jawaban`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
