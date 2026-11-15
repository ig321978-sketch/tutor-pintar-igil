// Uji Story Kelas 1 Bab 2 Sub-Bab B (Berbagai Cara Menjumlahkan): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, sinkron angka suara dan gambar, suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk,
// pemisahan materi dan metode luar, hanya penjumlahan dengan jumlah paling besar sepuluh (tanpa pengurangan atau bilangan lebih dari sepuluh), setiap kalimat penjumlahan di gambar benar,
// banyak benda (apel, kue, totol, jari, bola, balon, bingkai, petak) dihitung ulang dari gambar dan dicocokkan dengan kata bilangan di suara, angka tulisan tangan,
// aturan Igil sebagai aplikasi belajar mandiri (tanpa ajakan berkelompok, bermain bersama teman, tampil di depan kelas, menulis di buku, atau memakai benda nyata), emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k1b2b.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k1b2b-video.ts");
const U1 = await import("../src/components/modul/story/k1b2b-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K1B2B, V.VIDEO_LUAR_K1B2B];
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
const M_VIDEO = V.VIDEO_MATERI_K1B2B;
const U = V.VIDEO_LUAR_K1B2B;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /Counting On|Part-Part|Part–Part|Ten Frame|Menghitung Maju|Bagian-Utuh|Bagian–Utuh|Jumlah di Bingkai|bingkai|metode luar|metode dari luar/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE, ["Counting On", "Part-Part-Whole", "Ten Frame Add"], "nama metode di berkas luar-1");
  sama(U1.NAMA_METODE_ID, ["Menghitung Maju", "Bagian-Utuh", "Jumlah di Bingkai Sepuluh"], "nama Indonesia metode luar");
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
  // Aturan pemilik: Igil aplikasi belajar mandiri, interaktif, dan digital. Tidak ada ajakan berkelompok, bermain bersama teman, tampil di depan kelas, menulis di buku, atau memakai benda nyata.
  const BUKAN_MANDIRI = /kelompok|teman sekelas|teman|depan kelas|bersama teman|berpasangan|berkelompok|ceritamu di buku|di buku|buku tulis|tulis di|ambil (?:benda|bola|apel|kue)|siapkan|bawa (?:benda|bola|apel|kue)|bermain bersama|diskusi|bertanya kepada|tanya (?:ke|pada)/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) {
      const semua = [a.judul, a.sumber];
      a.ketukan.forEach((kt, i) => {
        semua.push(kt.suara);
        for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) semua.push(...L.teksTerlihat(L.keadaanStory(a, i, p)));
      });
      const kena = [...new Set(semua.filter((t) => BUKAN_MANDIRI.test(t)))];
      cek(kena.length === 0, `${v.id}/${a.id}: tanpa ajakan berkelompok, bermain bersama teman, atau memakai benda nyata (${kena.slice(0, 2).join(" | ")})`);
    }
  }
  cek(M_VIDEO.subjudul === "Materi kurikulum" && U.subjudul === "Tiga metode luar", "subjudul video: Materi kurikulum dan Tiga metode luar");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46), "video materi: label sumber berbentuk Materi: ... dan pendek");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "video metode luar: label sumber metode luar atau ringkasan, pendek");
  cek(M_VIDEO.id === "k1b2b-materi" && U.id === "k1b2b-luar", "id video k1b2b-materi dan k1b2b-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,cerita-taman,gabung,tukar,maju,kue,kembar,kembar-lain,jari,sepuluh,latihan-satu,latihan-dua,latihan-tiga,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-maju,luar-maju-terapan,luar-bagian,luar-bagian-terapan,luar-bingkai,luar-bingkai-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 3 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 3 lalu penutup");
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-maju", "luar-maju-terapan", "luar-bagian", "luar-bagian-terapan", "luar-bingkai", "luar-bingkai-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  for (const kata of ["Latihan", "Igil", "Malosi", "Kira", "Upe", "Wei", "tambah", "jumlah", "sama dengan", "kembar", "pasangan", "maju"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Hanya penjumlahan dengan jumlah paling besar sepuluh: tanpa kurang, bagi, kali, atau bilangan lebih dari sepuluh (tambah, jumlah, dan sama dengan memang isi sub-bab ini).
  const BOCOR = /kurang|\bbelas\b|\bpuluh\b|\bratus\b|\bribu\b|sebelas|dua belas|selisih|diambil|dikali|perkalian|dibagi|hasil bagi|pengurangan/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: hanya penjumlahan sampai sepuluh, tanpa kurang atau bilangan lebih dari sepuluh`);
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

/* ------------------------------ Banyak benda dan kalimat penjumlahan dihitung ulang dari gambar ------------------------------ */
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const hitungBenda = (objs, awalan) => objs.filter((o) => new RegExp(`^${awalan}\\d+$`).test(o.id)).length;
const kataSuara = (kt) => L.kataDari(kt.suara).map((w) => w.toLowerCase().replace(/[^a-z]/g, ""));
const W_MERAH = "#DC2626";
const W_BIRU = "#2563EB";
let stat = { hitung: 0, titik: 0, tulis: 0 };
{
  // 1) Semua deret hitungan (angka hitungan `${id}n{i}` di atas benda `${id}{i}`): berurutan dan sesuai kata bilangan yang diucapkan berurutan.
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((kt, i) => {
        const objs = akhirAdegan(a, i);
        const awalanSemua = new Set(objs.map((o) => /^([a-z]+)n0$/.exec(o.id)?.[1]).filter(Boolean));
        for (const p of awalanSemua) {
          const label = objs.filter((o) => new RegExp(`^${p}n\\d+$`).test(o.id));
          const nBenda = hitungBenda(objs, p);
          if (nBenda === 0) continue;
          stat.hitung += 1;
          const nama = `${v.id}/${a.id}#${i + 1} hitungan ${p}`;
          cek(label.length <= nBenda, `${nama}: angka hitungan tidak lebih banyak dari benda`);
          label.forEach((lb, q) => {
            const b = ketemu(objs, `${p}${q}`);
            const pusat = b.t === "kotak" ? b.x + b.w / 2 : b.x;
            cek(Math.abs(pusat - lb.x) < 1 && lb.y < (b.t === "kotak" ? b.y : b.y - (b.r ?? 0)), `${nama}: angka ${q + 1} tepat di atas benda ke-${q + 1}`);
            cek(lb.isi === String(q + 1), `${nama}: angka hitungan ke-${q + 1} bertuliskan ${q + 1}`);
          });
          const kata = kataSuara(kt);
          const posSatu = kata.indexOf("satu");
          const labelBaru = kt.aksi.some((ak) => ak.tambah && [].concat(ak.tambah).some((o) => new RegExp("^" + p + "n\\d+$").test(o.id)));
          if (posSatu >= 0 && labelBaru) {
            let n = 0;
            while (posSatu + n < kata.length && n + 1 < NAMA_ANGKA.length && kata[posSatu + n] === NAMA_ANGKA[n + 1]) n += 1;
            cek(n >= 1, `${nama}: deret kata dimulai dari satu`);
            cek(label.length === n, `${nama}: banyak angka hitungan (${label.length}) sama dengan banyak kata bilangan berurutan (${n})`);
          }
        }
      });
    }
  }
  // 2) Banyak benda yang disebut sama dengan jumlah benda di gambar akhir ketukan.
  const banyakDi = (id, ke, awalan, n) => {
    const a = adegan(M_VIDEO, id) ?? adegan(U, id);
    cek(!!a, `adegan ${id} ada`);
    if (!a) return;
    sama(hitungBenda(akhirAdegan(a, ke), awalan), n, `${id}#${ke + 1}: ${n} benda ${awalan} di gambar`);
    cek(a.ketukan.some((kt) => kataSuara(kt).includes(NAMA_ANGKA[n])), `${id}: suara menyebut bilangan "${NAMA_ANGKA[n]}"`);
    stat.hitung += 1;
  };
  const warnaDari = (objs, awalan, w) => objs.filter((o) => new RegExp(`^${awalan}\\d+$`).test(o.id) && o.warna === w).length;
  const emojiDari = (objs, awalan, e) => objs.filter((o) => new RegExp(`^${awalan}\\d+$`).test(o.id) && o.isi === e).length;
  // Apel Kira: tiga merah dan dua hijau; dua keranjang kecil; digabung lima apel.
  {
    const c1 = akhirAdegan(adegan(M_VIDEO, "cerita-taman"), 1);
    banyakDi("cerita-taman", 1, "cm", 3);
    banyakDi("cerita-taman", 1, "ch", 2);
    sama([emojiDari(c1, "cm", "\u{1F34E}"), emojiDari(c1, "ch", "\u{1F34F}")], [3, 2], "cerita: tiga apel merah dan dua apel hijau");
    banyakDi("gabung", 0, "ga", 3);
    banyakDi("gabung", 1, "gb", 2);
    banyakDi("gabung", 2, "ap", 5);
    const g3 = akhirAdegan(adegan(M_VIDEO, "gabung"), 2);
    sama([emojiDari(g3, "ap", "\u{1F34E}"), emojiDari(g3, "ap", "\u{1F34F}")], [3, 2], "gabung: 3 apel merah dan 2 apel hijau digabung");
    sama(isiTeks(akhirAdegan(adegan(M_VIDEO, "gabung"), 4), "f5"), "5", "gabung: jumlahnya 5");
    banyakDi("tukar", 0, "tk", 5);
    const t0 = akhirAdegan(adegan(M_VIDEO, "tukar"), 0);
    sama([emojiDari(t0, "tk", "\u{1F34F}"), ketemu(t0, "tk0").x < ketemu(t0, "tk4").x, ketemu(t0, "tk1").isi, ketemu(t0, "tk2").isi], [2, true, "\u{1F34F}", "\u{1F34E}"], "tukar: dua apel hijau di kiri, tiga apel merah di kanan");
    const t5 = akhirAdegan(adegan(M_VIDEO, "tukar"), 4);
    sama([0, 1, 2, 3].map((i) => isiTeks(t5, `pr${i}-t0`)), ["1 + 4", "2 + 3", "3 + 2", "4 + 1"], "tukar: empat pasangan bilangan untuk lima");
  }
  // Upe melompat di petak angka: petak nol sampai sepuluh, lompatan 5 ke 6, 7, 8, lalu 4 ke 5, 6.
  {
    const m = adegan(M_VIDEO, "maju");
    const o0 = akhirAdegan(m, 0);
    sama([...Array(11).keys()].map((i) => isiTeks(o0, `pn${i}`)), [...Array(11).keys()].map(String), "petak angka: nol sampai sepuluh berurutan");
    const px = [...Array(11).keys()].map((i) => ketemu(o0, `pt${i}`).x + ketemu(o0, `pt${i}`).w / 2);
    cek(px.every((x, i) => i === 0 || x - px[i - 1] === 24), "petak angka: jarak petak sama");
    sama(ketemu(o0, "up").x, px[5], "petak angka: Upe mulai di lima");
    const o2 = akhirAdegan(m, 2);
    sama([ketemu(o2, "up").x, isiTeks(o2, "lm0"), isiTeks(o2, "lm1"), isiTeks(o2, "lm2")], [px[8], "1", "2", "3"], "petak angka: Upe mendarat di delapan setelah tiga lompatan");
    const awal = (ke, kata) => L.keadaanStory(m, ke, L.posisiKata(m.ketukan[ke].suara, kata));
    sama(ketemu(awal(2, "enam."), "up").x, px[6], "lompatan pertama ke enam");
    sama(ketemu(awal(2, "tujuh."), "up").x, px[7], "lompatan kedua ke tujuh");
    sama(isiTeks(akhirAdegan(m, 3), "mt"), "5 + 3 = 8", "Upe: 5 + 3 = 8");
    const o5 = akhirAdegan(m, 5);
    sama([ketemu(o5, "up").x, isiTeks(o5, "mt2")], [px[6], "4 + 2 = 6"], "Upe kedua: dari empat maju dua ke enam");
  }
  // Kue dari meja ke kotak: empat di kotak, tiga di meja, tiga kue berpindah, tujuh di kotak.
  {
    const q = adegan(M_VIDEO, "kue");
    const q0 = akhirAdegan(q, 0);
    const kotakKue = ketemu(q0, "kb");
    const dlm = (b) => b.x > kotakKue.x && b.x < kotakKue.x + kotakKue.w;
    sama([hitungBenda(q0, "kq"), q0.filter((o) => /^kr\d$/.test(o.id)).length, q0.filter((o) => /^kq\d$/.test(o.id) && dlm(o)).length, q0.filter((o) => /^kr\d$/.test(o.id) && dlm(o)).length], [4, 3, 4, 0], "kue: empat di kotak, tiga di meja");
    const q2 = akhirAdegan(q, 1);
    sama([q2.filter((o) => /^kq\d$/.test(o.id) && dlm(o)).length + q2.filter((o) => /^kr\d$/.test(o.id) && dlm(o)).length, isiTeks(q2, "ql0"), isiTeks(q2, "ql1"), isiTeks(q2, "ql2")], [7, "5", "6", "7"], "kue: tujuh kue di kotak, dihitung 5, 6, 7");
    sama(isiTeks(akhirAdegan(q, 2), "qs"), "4 + 3 = 7", "kue: 4 + 3 = 7");
    sama([isiTeks(akhirAdegan(q, 3), "qs"), isiTeks(akhirAdegan(q, 3), "qt")], ["4 + 3 = 7", "3 + 4 = 7"], "kue: tukar tempat 3 + 4 = 7");
    sama([hitungBenda(akhirAdegan(q, 4), "qa"), hitungBenda(akhirAdegan(q, 4), "qb"), isiTeks(akhirAdegan(q, 4), "qx")], [2, 1, "2 + 1 = 3"], "kue: dua dan satu, jumlah tiga");
  }
  // Kepik kembar: tiga totol kiri, tiga totol kanan, dihitung satu sampai enam.
  {
    const kb = adegan(M_VIDEO, "kembar");
    const k0 = akhirAdegan(kb, 0);
    const k1 = akhirAdegan(kb, 1);
    cek(hitungBenda(k0, "tt") === 3 && hitungBenda(k1, "tt") === 6, "kepik: tiga totol di sayap kiri, enam setelah sayap kanan");
    const wk = ketemu(k1, "wk");
    const wn = ketemu(k1, "wn");
    const totolKiri = k1.filter((o) => /^tt[0-2]$/.test(o.id));
    const totolKanan = k1.filter((o) => /^tt[3-5]$/.test(o.id));
    cek(totolKiri.every((o) => Math.hypot(o.x - wk.x, o.y - wk.y) < wk.r) && totolKanan.every((o) => Math.hypot(o.x - wn.x, o.y - wn.y) < wn.r), "kepik: totol berada di dalam sayapnya");
    sama(isiTeks(akhirAdegan(kb, 3), "kz"), "3 + 3 = 6", "kepik: 3 + 3 = 6");
    sama(akhirAdegan(kb, 2).filter((o) => /^ttn\d$/.test(o.id)).length, 6, "kepik: enam totol dihitung satu sampai enam");
    const kl = adegan(M_VIDEO, "kembar-lain");
    sama([isiTeks(akhirAdegan(kl, 1), "la"), isiTeks(akhirAdegan(kl, 1), "lb"), isiTeks(akhirAdegan(kl, 2), "lc")], ["2 + 2 = 4", "4 + 4 = 8", "5 + 5 = 10"], "kembar lain: 2 + 2, 4 + 4, 5 + 5");
    sama(akhirAdegan(kl, 2).filter((o) => o.isi === "\u{1F590}").length, 2, "kembar lain: dua tangan");
  }
  // Delapan jari dan dua jari: sepuluh lingkaran, merah = terbuka.
  {
    const j = adegan(M_VIDEO, "jari");
    const merah = (ke) => warnaDari(akhirAdegan(j, ke), "jr", W_MERAH);
    banyakDi("jari", 0, "jr", 10);
    sama([merah(0), merah(1), merah(3), merah(4), merah(5)], [8, 8, 8, 7, 6], "jari: terbuka 8, 8, 8, lalu 7, lalu 6");
    sama([isiTeks(akhirAdegan(j, 3), "js"), isiTeks(akhirAdegan(j, 4), "js"), isiTeks(akhirAdegan(j, 5), "js")], ["8 + 2 = 10", "7 + 3 = 10", "6 + 4 = 10"], "jari: 8 + 2, 7 + 3, 6 + 4 = 10");
    sama(akhirAdegan(j, 1).filter((o) => /^jrn\d$/.test(o.id)).length, 8, "jari: delapan jari dihitung");
  }
  // Pasangan sepuluh dengan bola: sepuluh bola, merah dan biru.
  {
    const s = adegan(M_VIDEO, "sepuluh");
    const hit = (ke, w) => warnaDari(akhirAdegan(s, ke), "bo", w);
    banyakDi("sepuluh", 0, "bo", 10);
    sama([hit(0, W_MERAH), hit(0, W_BIRU), hit(2, W_MERAH), hit(2, W_BIRU), hit(3, W_MERAH), hit(3, W_BIRU)], [9, 1, 7, 3, 5, 5], "bola: 9 + 1, 7 + 3, lalu 5 + 5");
    sama([isiTeks(akhirAdegan(s, 1), "ps"), isiTeks(akhirAdegan(s, 2), "ps"), isiTeks(akhirAdegan(s, 3), "ps")], ["9 + 1 = 10", "7 + 3 = 10", "5 + 5 = 10"], "bola: kalimat pasangan sepuluh");
    sama([0, 1, 2, 3, 4].map((i) => isiTeks(akhirAdegan(s, 4), `pq${i}-t0`)), ["9 + 1 = 10", "8 + 2 = 10", "7 + 3 = 10", "6 + 4 = 10", "5 + 5 = 10"], "bola: lima pasangan sepuluh");
  }
  // Latihan.
  {
    const l1 = adegan(M_VIDEO, "latihan-satu");
    banyakDi("latihan-satu", 0, "pk", 4);
    banyakDi("latihan-satu", 0, "pm", 3);
    sama([isiTeks(akhirAdegan(l1, 1), "lq0"), isiTeks(akhirAdegan(l1, 1), "lq1"), isiTeks(akhirAdegan(l1, 1), "lq2"), isiTeks(akhirAdegan(l1, 2), "lj")], ["5", "6", "7", "4 + 3 = 7"], "Latihan 1: maju 5, 6, 7 dan 4 + 3 = 7");
    sama(["o6-t0", "o7-t0", "o8-t0"].map((i) => isiTeks(akhirAdegan(l1, 4), i)), ["6", "7", "8"], "Latihan 1: pilihan 6, 7, 8");
    const l2 = adegan(M_VIDEO, "latihan-dua");
    sama([isiTeks(akhirAdegan(l2, 1), "d1"), isiTeks(akhirAdegan(l2, 3), "d2"), isiTeks(akhirAdegan(l2, 4), "d3")], ["3 + 3 = 6", "2 + 5 = 7", "4 + 4 = 8"], "Latihan 2: 3 + 3 = 6, 2 + 5 = 7, 4 + 4 = 8");
    const l3 = adegan(M_VIDEO, "latihan-tiga");
    banyakDi("latihan-tiga", 0, "jr", 10);
    sama(warnaDari(akhirAdegan(l3, 0), "jr", W_MERAH), 7, "Latihan 3: tujuh jari terbuka");
    const tulis = akhirAdegan(l3, 1).filter((o) => /^w\d$/.test(o.id));
    sama([tulis.length, tulis.every((o) => o.gambar === true)], [2, true], "Latihan 3: angka sepuluh ditulis tergambar bertahap");
    stat.tulis += 2;
    sama([isiTeks(akhirAdegan(l3, 3), "c1"), isiTeks(akhirAdegan(l3, 3), "c2")], ["6 + 2 = 8", "5 + 4 = 9"], "Latihan 3: contoh kalimat sendiri");
  }
  // Metode luar.
  {
    const lm = adegan(U, "luar-maju");
    const a2 = akhirAdegan(lm, 1);
    sama([isiTeks(a2, "a6"), isiTeks(a2, "fl0"), isiTeks(a2, "fl1"), isiTeks(a2, "fl2"), isiTeks(akhirAdegan(lm, 2), "a9")], ["6", "7", "8", "9", "6 + 3 = 9"], "Counting On: dari 6 maju 7, 8, 9, jumlah 6 + 3 = 9");
    const mt = adegan(U, "luar-maju-terapan");
    banyakDi("luar-maju-terapan", 0, "wa", 5);
    banyakDi("luar-maju-terapan", 0, "wb", 2);
    sama([isiTeks(akhirAdegan(mt, 2), "bq0"), isiTeks(akhirAdegan(mt, 2), "bq1"), isiTeks(akhirAdegan(mt, 3), "b7")], ["6", "7", "5 + 2 = 7"], "Counting On terapan: 5 balon, maju 6, 7, jumlah 5 + 2 = 7");
    const bg = adegan(U, "luar-bagian");
    const b3 = akhirAdegan(bg, 2);
    sama([isiTeks(b3, "pa-t"), isiTeks(b3, "pb-t"), isiTeks(b3, "wh-t")], ["3", "2", "5"], "Part-Part-Whole: bagian 3 dan 2, utuh 5");
    const b4 = akhirAdegan(bg, 3);
    sama([isiTeks(b4, "pa-t"), isiTeks(b4, "pb-t"), isiTeks(b4, "wh-t")], ["2", "3", "5"], "Part-Part-Whole: ditukar 2 dan 3, utuh tetap 5");
    cek(ketemu(b4, "wh").r > ketemu(b4, "pa").r, "Part-Part-Whole: lingkaran utuh lebih besar dari lingkaran bagian");
    const bt = adegan(U, "luar-bagian-terapan");
    banyakDi("luar-bagian-terapan", 0, "da", 6);
    banyakDi("luar-bagian-terapan", 0, "db", 3);
    const d3 = akhirAdegan(bt, 2);
    sama([isiTeks(d3, "pa-t"), isiTeks(d3, "pb-t"), isiTeks(d3, "wh-t"), isiTeks(d3, "d9")], ["6", "3", "9", "6 + 3 = 9"], "Part-Part-Whole terapan: 6 + 3 = 9");
    const bk = akhirAdegan(adegan(U, "luar-bingkai"), 3);
    sama([bk.filter((x) => /^bk-c\d+$/.test(x.id)).length, warnaDari(bk, "bk-t", W_MERAH), warnaDari(bk, "bk-t", W_BIRU), isiTeks(bk, "b10"), isiTeks(bk, "e9")], [10, 5, 4, "10", "5 + 4 = 9"], "Ten Frame Add: sepuluh kotak, lima merah, empat biru, 5 + 4 = 9");
    stat.titik += 1;
    const bt0 = akhirAdegan(adegan(U, "luar-bingkai-terapan"), 0);
    sama([bt0.filter((x) => /^bu-c\d+$/.test(x.id)).length, bt0.filter((x) => /^bu-t\d+$/.test(x.id)).length, ketemu(bt0, "bz") !== undefined], [10, 9, true], "Ten Frame Add terapan: sembilan titik merah dan satu bola biru di luar");
    const bt1 = akhirAdegan(adegan(U, "luar-bingkai-terapan"), 1);
    const sel9 = ketemu(bt1, "bu-c9");
    cek(Math.abs(ketemu(bt1, "bz").x - (sel9.x + sel9.w / 2)) < 1 && Math.abs(ketemu(bt1, "bz").y - (sel9.y + sel9.h / 2)) < 1, "Ten Frame Add terapan: bola biru masuk kotak kesepuluh");
    sama(isiTeks(akhirAdegan(adegan(U, "luar-bingkai-terapan"), 2), "f10"), "9 + 1 = 10", "Ten Frame Add terapan: 9 + 1 = 10");
  }
}

/* ------------------------------ Setiap kalimat penjumlahan di gambar benar dan paling besar sepuluh ------------------------------ */
{
  let n = 0;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      for (let i = 0; i < a.ketukan.length; i += 1) {
        for (const t of L.teksTerlihat(akhirAdegan(a, i))) {
          for (const m of t.matchAll(/(\d+) \+ (\d+)(?: = (\d+))?/g)) {
            if (m[3] === undefined) continue;
            n += 1;
            cek(Number(m[1]) + Number(m[2]) === Number(m[3]) && Number(m[3]) <= 10, `${v.id}/${a.id}#${i + 1}: kalimat "${m[0]}" benar dan jumlahnya paling besar sepuluh`);
          }
        }
        for (const t of L.teksTerlihat(akhirAdegan(a, i))) cek(!/[−–×÷<>]|\d\s-\s\d/.test(t), `${v.id}/${a.id}#${i + 1}: gambar tanpa tanda kurang, kali, bagi, atau pembanding ("${t}")`);
      }
    }
  }
  cek(n >= 40, `kalimat penjumlahan lengkap diperiksa (${n})`);
}

/* ------------------------------ Sapaan dan peta susun ------------------------------ */
{
  const HAL = ["Pasangan bilangan", "Maju dari bilangan pertama", "Bilangan kembar"];
  const sap = adegan(M_VIDEO, "sapaan");
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Pasangan bilangan/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => HAL.includes(t)), HAL, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara), "sapaan materi: tanpa angka");
  const cerita = adegan(M_VIDEO, "cerita-taman");
  sama(L.teksTerlihat(akhirAdegan(cerita, 3)).filter((t) => HAL.includes(t)), HAL, "cerita taman: tiga hal sama dengan daftar sapaan");
  // Peta dan tabel: dari berkas data bila sudah digabung, bila belum dari berkas sementara .tmp-k1b2s/B.json.
  const ringkas = JSON.parse(readFileSync(new URL("../src/data/kelas1-bab2-ringkas.json", import.meta.url), "utf8")).subBab?.B;
  const sementara = new URL("../.tmp-k1b2s/B.json", import.meta.url);
  const A = ringkas?.petaSusun && ringkas?.tabelSusun ? ringkas : existsSync(sementara) ? JSON.parse(readFileSync(sementara, "utf8")) : null;
  cek(!!A, "peta dan tabel susun: ada di kelas1-bab2-ringkas.json (subBab.B) atau .tmp-k1b2s/B.json");
  if (A) {
    const peta = A.petaSusun.simpul;
    const anak = (id) => peta.filter((s) => s.induk === id).map((s) => s.teks);
    const akar = peta.filter((s) => s.induk === null);
    cek(akar.length === 3, "peta susun: tiga cabang dari pusat");
    sama(anak(akar[0].id), HAL, "peta susun: cabang pertama sama dengan daftar sapaan");
    sama([anak(akar[1].id).length, anak(akar[2].id).length, peta.length], [3, 2, 11], "peta susun: 3 cara, 2 hasil, 11 simpul");
    cek(peta.every((s) => s.teks.length <= 28) && new Set(peta.map((s) => s.teks)).size === peta.length, "peta susun: teks <= 28 huruf dan unik");
    cek(peta.map((s) => s.nomor).sort((m, n) => m - n).join() === [...Array(11).keys()].map((i) => i + 1).join(), "peta susun: nomor 1 sampai 11");
    cek(!/\d/.test(A.petaSusun.pusat.suara) && !/\d/.test(A.petaSusun.petunjuk) && peta.every((s) => !/\d/.test(s.petunjuk ?? "")), "peta susun: suara dan petunjuk tanpa digit");
    const T = A.tabelSusun;
    cek(T.baris.length >= 3 && T.baris.length <= 5 && T.kolom.length >= 3 && T.kolom.length <= 4, "tabel susun: 3 sampai 5 baris dan 3 sampai 4 kolom");
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 26 && (s.match(/\d+/g) ?? []).length <= 1)), "tabel susun: sel <= 26 huruf dan paling banyak satu angka per sel");
    cek(T.baris.every((b) => b.label.split(/\s+/).every((w) => w.length <= 8)), "tabel susun: kata terpanjang kolom label <= 8 huruf");
    cek(!/\d/.test(T.suara) && !/\d/.test(T.petunjuk), "tabel susun: suara dan petunjuk tanpa digit");
    // Penjumlahan pada tabel benar, hanya sampai sepuluh, dan semua teks sesuai aturan Igil mandiri dan tanpa pengurangan.
    for (const b of T.baris) {
      const m = /^(\d+) dan (\d+)$/.exec(b.label);
      if (m) cek(b.sel.some((s) => s === String(Number(m[1]) + Number(m[2]))) && Number(m[1]) + Number(m[2]) <= 10, `tabel susun: baris ${b.label} memuat jumlah yang benar`);
    }
    const semuaTeks = JSON.stringify({ p: A.petaSusun, t: A.tabelSusun });
    cek(!/kelompok|teman|depan kelas|berpasangan|di buku|buku|kurang|selisih/i.test(semuaTeks), "peta dan tabel susun: tanpa kata kelompok, teman, depan kelas, berpasangan, buku, atau kurang");
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k1b2b-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k1b2b-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k1b2b sendiri (${impor.join(", ")})`);
  }
  // Emoji dalam data teks gambar juga paling tinggi Emoji 12 (diperiksa pada gambar yang diputar).
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${v.id}/${a.id}: emoji gambar paling tinggi Emoji 12`);
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k1b2b.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|naskah-k1b1/.test(pembungkus) && /VIDEO_MATERI_K1B2B/.test(pembungkus) && /VIDEO_LUAR_K1B2B/.test(pembungkus) && /export function VideoK1B2B/.test(pembungkus) && /daftar-video-cerita/.test(pembungkus), "video-k1b2b.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k1b2b.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k1b2b.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k1b2b.mjs: akhir baris LF");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit diputar)`);
}
console.log(`Pemeriksaan: ${stat.hitung} deret hitungan, ${stat.titik} kartu titik, ${stat.tulis} angka tulisan`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
