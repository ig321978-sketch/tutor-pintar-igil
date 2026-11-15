// Uji Story Kelas 1 Bab 3 Sub-Bab D (Soal Cerita Pengurangan): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar,
// hanya pengurangan dengan bilangan sampai sepuluh (tanpa bilangan lebih dari sepuluh, kali, atau bagi), tiap kalimat pengurangan dan penjumlahan pemeriksa di gambar benar, benda yang pergi dicoret satu demi satu,
// rumus yang tersusun potongan demi potongan mengikuti kata bilangan, jejak pelompat di deretan bilangan, bingkai sepuluh, diagram bagian-utuh, peta dan tabel susun,
// tanpa instruksi kelompok, teman, depan kelas, atau kegiatan di buku (aplikasi belajar mandiri), emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k1b3d.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k1b3d-video.ts");
const U1 = await import("../src/components/modul/story/k1b3d-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K1B3D, V.VIDEO_LUAR_K1B3D];
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
const M_VIDEO = V.VIDEO_MATERI_K1B3D;
const U = V.VIDEO_LUAR_K1B3D;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /Mengambil|Hitung Mundur|Kurang di Bingkai|metode luar|metode dari luar/i;
const NAMA_INGGRIS = /Take Away|Counting Back|Ten Frame|Subtract/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
// Aturan pemilik: aplikasi belajar mandiri, interaktif, digital. Tidak boleh menyuruh kelompok, teman, depan kelas, menulis atau menggambar di buku, membawa benda nyata.
const DILARANG_PEMILIK = /kelompok|teman|kawan|depan kelas|menulis di|tulis di|menggambar|gambar di|bawa|kertas|pensil|pulpen|spidol|krayon|papan tulis|buku|berpasangan|ceritakan (kepada|ke) |tanya(kan)? (ke|pada|kepada) |ajak|angkat jari|ambil benda|buat ceritamu|gambar sendiri/i;
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar");
  cek(!NAMA_INGGRIS.test(materi) && !NAMA_INGGRIS.test(luar), "tidak ada nama metode berbahasa Inggris di video (hanya nama Indonesia)");
  for (const m of U1.NAMA_METODE_ID) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE_ID, ["Mengambil", "Hitung Mundur", "Kurang di Bingkai"], "nama Indonesia metode luar");
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
      cek(!/Uji Kompetensi|Pengayaan|Ayo Berlatih|Ayo Berdiskusi|Ayo Berefleksi|Ayo Mengingat|Ayo Berkomunikasi|Ayo Berpikir|Ayo Berkarya|soal \d|Soal \d|Eksplorasi|Refleksi/.test(semua.join(" | ")), `${v.id}/${a.id}: latihan disajikan sebagai Latihan, tanpa istilah buku`);
    }
  }
  cek(M_VIDEO.subjudul === "Materi kurikulum" && U.subjudul === "Tiga metode luar", "subjudul video: Materi kurikulum dan Tiga metode luar");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46), "video materi: label sumber berbentuk Materi: ... dan pendek");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "video metode luar: label sumber metode luar atau ringkasan, pendek");
  cek(M_VIDEO.id === "k1b3d-materi" && U.id === "k1b3d-luar", "id video k1b3d-materi dan k1b3d-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,cerita-burung,tiga-bagian,kata-petunjuk,soal-kepik,tulis-kalimat,kalimat-jawaban,cari-pergi,cari-mula,soal-bola,beri-bola,kurangi-dua-kali,periksa,susun-cerita,latihan-satu,latihan-dua,latihan-tiga,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-ambil,luar-ambil-terapan,luar-mundur,luar-mundur-terapan,luar-bingkai,luar-bingkai-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 3 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 3 lalu penutup");
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-ambil", "luar-ambil-terapan", "luar-mundur", "luar-mundur-terapan", "luar-bingkai", "luar-bingkai-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  for (const kata of ["Latihan", "Igil", "Malosi", "Kira", "Upe", "Wei", "Halim", "burung", "kepik", "dikurangi", "sama dengan", "sisa", "mula-mula", "yang pergi", "jawaban", "periksa", "soal cerita", "kata petunjuk"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Hanya pengurangan (dan penjumlahan sebagai pemeriksa) dengan bilangan sampai 10: tanpa banding, bilangan lebih dari sepuluh, kali, atau bagi.
  const BOCOR = /lebih (banyak|besar|sedikit|kecil)|bandingkan|membandingkan|\bbelas\b|\bpuluh\b|\bratus\b|\bribu\b|sebelas|dua belas|operasi|hasil bagi|dikali|dibagi|kali lipat/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: hanya pengurangan sampai sepuluh, tanpa banding, kali, bagi, atau bilangan lebih dari sepuluh`);
    for (const a of v.adegan) for (const [i] of a.ketukan.entries()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 10, `${v.id}/${a.id}#${i + 1}: angka di gambar paling besar sepuluh ("${t}")`);
  }
  cek(totalKetukan >= 70, `total ketukan cukup dalam (${totalKetukan})`);
  cek(M_VIDEO.adegan.reduce((t, a) => t + a.ketukan.length, 0) >= 70, "ketukan video materi paling sedikit 70");
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

/* ------------------------------ Pengurangan, benda yang pergi, deretan bilangan, bingkai sepuluh, dan model batang ------------------------------ */
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const kataSuara = (kt) => L.kataDari(kt.suara).map((w) => w.toLowerCase().replace(/[^a-z]/g, ""));
const xv = (v) => 33 + 26 * (v - 1);
const jumlahId = (a, ke, p, re) => L.keadaanStory(a, ke, p).filter((o) => re.test(o.id)).length;
/** Jumlah benda berid cocok `re` yang masih tampak jelas (tidak memudar). */
const tampak = (a, ke, p, re) => L.keadaanStory(a, ke, p).filter((o) => re.test(o.id) && (o.op ?? 1) >= 0.9).length;
/** Jumlah benda berid cocok `re` yang memudar (dicoret). */
const pudar = (a, ke, p, re) => L.keadaanStory(a, ke, p).filter((o) => re.test(o.id) && (o.op ?? 1) < 0.9).length;
const posKata = (a, ke, kata, n = 1) => {
  const w = kataSuara(a.ketukan[ke]);
  let c = 0;
  for (let i = 0; i < w.length; i += 1) if (w[i] === kata && (c += 1) === n) return i;
  throw new Error(`kata ${kata} ke-${n} tidak ada: ${a.ketukan[ke].suara}`);
};
const stat = { kalimat: 0, hitung: 0, coret: 0, jejak: 0, bingkai: 0, batang: 0, kartuJawab: 0 };
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
/** Benda `${awalan}${n}` memudar tepat pada kata bilangan ke-i (satu, dua, ...) setelah kata `setelah`, satu demi satu, dengan tanda silang. */
const cekCoret = (a, ke, awalan, daftar, setelah, nama) => {
  const w = kataSuara(a.ketukan[ke]);
  const mulai = w.indexOf(setelah);
  cek(mulai >= 0, `${nama}: kata ${setelah} ada`);
  daftar.forEach((n, i) => {
    stat.coret += 1;
    const q = w.indexOf(NAMA_ANGKA[i + 1], mulai + 1);
    cek(q >= 0, `${nama}: kata ${NAMA_ANGKA[i + 1]} diucapkan setelah ${setelah}`);
    const sebelum = L.keadaanStory(a, ke, q - 1).find((o) => o.id === `${awalan}${n}`);
    const sesudah = L.keadaanStory(a, ke, q).find((o) => o.id === `${awalan}${n}`);
    cek(sebelum && (sebelum.op ?? 1) >= 0.9 && sesudah && (sesudah.op ?? 1) < 0.9, `${nama}: benda ${awalan}${n} dicoret tepat pada kata ${NAMA_ANGKA[i + 1]}`);
    cek(!!L.keadaanStory(a, ke, q).find((o) => o.id === `${awalan}x${n}`), `${nama}: tanda silang ${awalan}x${n} muncul pada kata ${NAMA_ANGKA[i + 1]}`);
  });
};
{
  // 1) Semua kalimat pengurangan dan penjumlahan yang tampak benar; bilangan paling banyak sepuluh; tanpa kali atau bagi.
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((kt, i) => {
        const teksSemua = L.teksTerlihat(L.keadaanStory(a, i, 9999));
        for (const t of teksSemua) {
          for (const m of t.matchAll(/(\d+)\s*\+\s*(\d+)\s*=\s*(\d+)/g)) {
            stat.kalimat += 1;
            cek(Number(m[1]) + Number(m[2]) === Number(m[3]) && Number(m[3]) <= 10, `${v.id}/${a.id}#${i + 1}: kalimat penjumlahan benar dan jumlah paling banyak sepuluh ("${m[0]}")`);
          }
          for (const m of t.matchAll(/(\d+|\?)\s*−\s*(\d+|\?)\s*=\s*(\d+|\?)/g)) {
            stat.kalimat += 1;
            const [p, q, r] = [m[1], m[2], m[3]];
            const tanya = [p, q, r].filter((z) => z === "?").length;
            cek(tanya <= 1, `${v.id}/${a.id}#${i + 1}: paling banyak satu tanda tanya ("${m[0]}")`);
            const a1 = p === "?" ? Number(r) + Number(q) : Number(p);
            const a2 = q === "?" ? a1 - Number(r) : Number(q);
            const a3 = r === "?" ? a1 - a2 : Number(r);
            cek(a1 - a2 === a3 && a1 <= 10 && a2 >= 0 && a3 >= 0, `${v.id}/${a.id}#${i + 1}: kalimat pengurangan benar, mula-mula paling banyak sepuluh, sisa tidak negatif ("${m[0]}")`);
          }
          cek(!/\d\s*[×÷]\s*\d/.test(t), `${v.id}/${a.id}#${i + 1}: tanpa tanda kali atau bagi ("${t}")`);
        }
      });
    }
  }
  // 2) Burung di dahan: hitung satu demi satu sampai delapan, dua burung pergi, enam tersisa.
  {
    const a = adegan(M_VIDEO, "cerita-burung");
    for (let i = 0; i < 8; i += 1) {
      stat.hitung += 1;
      const p = posKata(a, 1, NAMA_ANGKA[i + 1], i === 7 ? 2 : 1);
      sama(jumlahId(a, 1, p, /^b\d$/), i + 1, `burung: ${i + 1} burung tampak pada kata ${NAMA_ANGKA[i + 1]}`);
      sama(isiTeks(L.keadaanStory(a, 1, p), `bn${i}`), String(i + 1), `burung: nomor ${i + 1} di atas burung ke-${i + 1}`);
    }
    sama([tampak(a, 1, 9999, /^b\d$/), tampak(a, 2, -1, /^b\d$/), tampak(a, 2, 9999, /^b\d$/), pudar(a, 2, 9999, /^b\d$/)], [8, 8, 6, 2], "burung: delapan, lalu dua burung pergi dan enam tersisa");
    cekCoret(a, 2, "b", [6, 7], "coret", "burung pergi");
    sama([0, 1, 2, 3, 4, 5].map((i) => isiTeks(akhirAdegan(a, 3), `sn${i}`)), ["1", "2", "3", "4", "5", "6"], "burung: sisa dihitung satu sampai enam");
    sama(isiTeks(akhirAdegan(a, 3), "sk-t0"), "sisa: 6 burung", "burung: kartu sisa enam burung");
    const xs = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => ketemu(akhirAdegan(a, 2), `b${i}`).x);
    cek(xs.every((x, i) => i === 0 || x > xs[i - 1]), "burung: delapan burung berderet di dahan dari kiri ke kanan");
  }
  // 3) Tiga bagian soal cerita: mula-mula, pergi, sisa pada model batang.
  {
    const a = adegan(M_VIDEO, "tiga-bagian");
    const o = akhirAdegan(a, 2);
    sama(["g1-t0", "g2-t0", "g3-t0"].map((i) => isiTeks(o, i)), ["1. Mula-mula: 8 burung", "2. Pergi: 2 burung", "3. Sisa: 6 burung"], "tiga bagian: tiga kartu berurutan");
    sama([jumlahId(a, 0, 9999, /^bt\d$/), L.keadaanStory(a, 1, 9999).filter((q) => /^bt\d$/.test(q.id) && q.warna === "#CBD5E1").length], [8, 2], "tiga bagian: batang delapan kotak, dua kotak pergi dicoret");
    sama(isiTeks(akhirAdegan(a, 4), "jm-t1"), "8 − 2 = 6", "tiga bagian: rumus mula-mula dikurangi pergi");
    stat.batang += 1;
  }
  // 4) Kata petunjuk kurang.
  {
    const a = adegan(M_VIDEO, "kata-petunjuk");
    const o = akhirAdegan(a, 4);
    sama([0, 1, 2, 3].map((i) => isiTeks(o, `kw${i}-t0`)), ["terbang: 8 − 2", "dimakan: 5 − 1", "diberikan: 6 − 2", "diambil: 7 − 3"], "kata petunjuk: empat kata dan contohnya");
    const h = akhirAdegan(a, 5);
    sama([isiTeks(h, "hh1-t0"), isiTeks(h, "hh2-t0")], ["datang lagi, bergabung: tanda +", "terbang, pergi, diambil: tanda −"], "kata petunjuk: pembeda tanda tambah dan tanda kurang");
  }
  // 5) Kepik: sepuluh kepik, dua dicoret satu demi satu, kalimat 10 - 2 = 8, jawaban, pemeriksaan.
  {
    const a = adegan(M_VIDEO, "soal-kepik");
    sama(tampak(a, 0, 9999, /^kp\d$/), 10, "kepik: sepuluh kepik");
    cekCoret(a, 1, "kp", [8, 9], "terbang", "kepik terbang");
    sama([tampak(a, 1, 9999, /^kp\d$/), pudar(a, 1, 9999, /^kp\d$/)], [8, 2], "kepik: delapan tersisa, dua dicoret");
    sama(isiTeks(akhirAdegan(a, 3), "pj-t0"), "Sisa kepik ada 8 ekor.", "kepik: kalimat jawaban lengkap");
    sama(isiTeks(akhirAdegan(a, 4), "pt"), "8 + 2 = 10", "kepik: periksa dengan penjumlahan");
    stat.kartuJawab += 1;
  }
  // 6) Menyusun kalimat pengurangan: potongan 8, -, 2, =, 6 muncul berurutan pada katanya dan berderet kiri ke kanan.
  {
    const a = adegan(M_VIDEO, "tulis-kalimat");
    const kotakAda = (ke, p) => jumlahId(a, ke, p, /^t\d-k$/);
    sama([kotakAda(1, -1), kotakAda(1, posKata(a, 1, "delapan")), kotakAda(1, posKata(a, 1, "tanda")), kotakAda(1, 9999)], [0, 1, 2, 3], "susun kalimat: delapan, lalu tanda kurang, lalu dua muncul berurutan");
    const o = akhirAdegan(a, 3);
    sama([0, 1, 2, 3, 4].map((i) => isiTeks(o, `t${i}-t`)), ["8", "−", "2", "=", "6"], "susun kalimat: 8 − 2 = 6 tersusun");
    const xs = [0, 1, 2, 3, 4].map((i) => ketemu(o, `t${i}-k`).x);
    cek(xs.every((x, i) => i === 0 || x > xs[i - 1]), "susun kalimat: kotak berderet kiri ke kanan");
    sama([jumlahId(a, 0, 9999, /^tb\d$/), jumlahId(a, 0, 9999, /^tc\d$/)], [8, 2], "susun kalimat: delapan burung dikurangi dua burung");
    stat.kalimat += 1;
  }
  // 7) Kalimat jawaban lengkap memuat sisa, nama benda, dan hasil; pilihan nama benda burung.
  {
    const a = adegan(M_VIDEO, "kalimat-jawaban");
    sama(isiTeks(akhirAdegan(a, 2), "jl-t0"), "Sisa burung ada 6 ekor.", "jawaban lengkap: sisa, nama benda, dan hasil");
    sama([isiTeks(akhirAdegan(a, 3), "b1-t0"), isiTeks(akhirAdegan(a, 3), "b3-t0"), isiTeks(akhirAdegan(a, 3), "b2-t0")], ["Sisa", "burung ada", "6 ekor"], "jawaban lengkap: tiga bagian kalimat jawaban");
    cek(ketemu(akhirAdegan(a, 4), "c1-k").warna === "#FFC800" && isiTeks(akhirAdegan(a, 4), "c1-t0") === "burung", "pilihan nama benda: burung terpilih");
    stat.kartuJawab += 1;
  }
  // 8) Mencari yang pergi: tujuh anak, lima tetap, dua dicoret satu demi satu.
  {
    const a = adegan(M_VIDEO, "cari-pergi");
    sama(tampak(a, 0, 9999, /^a\d$/), 7, "cari yang pergi: tujuh anak");
    sama(L.keadaanStory(a, 0, 9999).filter((o) => /^a\d$/.test(o.id) && o.sorot).length, 5, "cari yang pergi: lima anak masih di taman (disorot)");
    cekCoret(a, 2, "a", [5, 6], "layar", "anak pergi");
    sama(isiTeks(akhirAdegan(a, 1), "gq-t0"), "yang dicari: yang pergi", "cari yang pergi: kartu yang dicari");
    sama(isiTeks(akhirAdegan(a, 4), "gj-t0"), "Ada 2 anak yang pergi.", "cari yang pergi: kalimat jawaban");
    sama(isiTeks(akhirAdegan(a, 4), "gc"), "5 + 2 = 7", "cari yang pergi: periksa dengan penjumlahan");
    stat.kartuJawab += 1;
  }
  // 9) Mencari mula-mula: empat apel di keranjang, tiga apel di luar dikembalikan satu demi satu, mula-mula tujuh.
  {
    const a = adegan(M_VIDEO, "cari-mula");
    const o0 = akhirAdegan(a, 0);
    const dalam = (o) => o.filter((q) => /^ap\d$/.test(q.id) && q.x < 175).length;
    const luar = (o) => o.filter((q) => /^ap\d$/.test(q.id) && q.x >= 175).length;
    sama([dalam(o0), luar(o0)], [4, 3], "mula-mula: empat apel di keranjang, tiga apel di luar");
    sama(isiTeks(akhirAdegan(a, 1), "qk"), "? − 3 = 4", "mula-mula: kalimat dengan tanda tanya");
    const w = kataSuara(a.ketukan[2]);
    const mulai = w.indexOf("keranjang");
    [1, 2, 3].forEach((n) => {
      stat.coret += 1;
      const q = w.indexOf(NAMA_ANGKA[n], mulai + 1);
      sama(dalam(L.keadaanStory(a, 2, q)), 4 + n, `mula-mula: ${4 + n} apel di keranjang pada kata ${NAMA_ANGKA[n]}`);
    });
    sama([dalam(akhirAdegan(a, 2)), luar(akhirAdegan(a, 2))], [7, 0], "mula-mula: tujuh apel di keranjang, tidak ada di luar");
    sama([isiTeks(akhirAdegan(a, 3), "mt-t0"), isiTeks(akhirAdegan(a, 3), "qk")], ["4 + 3 = 7", "7 − 3 = 4"], "mula-mula: empat ditambah tiga, lalu tujuh dikurangi tiga");
    sama(isiTeks(akhirAdegan(a, 4), "mj-t0"), "Mula-mula ada 7 apel.", "mula-mula: kalimat jawaban");
    stat.kartuJawab += 1;
  }
  // 10) Bola dan kardus.
  {
    const a = adegan(M_VIDEO, "soal-bola");
    const o = akhirAdegan(a, 0);
    const bola = o.filter((q) => /^bl\d$/.test(q.id));
    sama([bola.length, bola.filter((q) => q.x > 50 && q.x < 190).length, bola.filter((q) => q.x >= 190).length], [10, 7, 3], "bola: sepuluh bola, tujuh di kardus, tiga di luar");
    sama([isiTeks(akhirAdegan(a, 1), "n1-t"), isiTeks(akhirAdegan(a, 1), "n2-t")], ["10", "3"], "bola: kartu sepuluh dan tiga");
    sama(isiTeks(akhirAdegan(a, 3), "sj-t0"), "Di kardus ada 7 bola.", "bola: kalimat jawaban");
    sama(isiTeks(akhirAdegan(a, 4), "pc"), "7 + 3 = 10", "bola: periksa dengan penjumlahan");
    stat.kartuJawab += 1;
  }
  // 11) Bola Kira diberikan kepada Wei: sisa enam diketahui, yang diberikan dicari.
  {
    const a = adegan(M_VIDEO, "beri-bola");
    sama([tampak(a, 0, 9999, /^bo\d$/), L.keadaanStory(a, 0, 9999).filter((q) => /^bo\d$/.test(q.id) && q.sorot).length], [10, 6], "beri bola: sepuluh bola, enam disorot sebagai sisa");
    cekCoret(a, 2, "bo", [6, 7, 8, 9], "wei", "bola diberikan");
    sama([tampak(a, 2, 9999, /^bo\d$/), pudar(a, 2, 9999, /^bo\d$/)], [6, 4], "beri bola: enam tersisa, empat diberikan");
    sama(isiTeks(akhirAdegan(a, 4), "ec-t0"), "6 + 4 = 10", "beri bola: periksa dengan penjumlahan");
  }
  // 12) Kurangi dua kali: sembilan kelereng, dua dicoret, lalu empat dicoret, sisa tiga; cara lain 2 + 4 = 6.
  {
    const a = adegan(M_VIDEO, "kurangi-dua-kali");
    sama(tampak(a, 0, 9999, /^kl\d$/), 9, "dua kali: sembilan kelereng");
    cekCoret(a, 1, "kl", [0, 1], "coret", "kelereng ke Kira");
    cekCoret(a, 3, "kl", [2, 3, 4, 5], "coret", "kelereng ke Upe");
    sama([tampak(a, 1, 9999, /^kl\d$/), tampak(a, 3, 9999, /^kl\d$/)], [7, 3], "dua kali: tujuh lalu tiga kelereng tersisa");
    sama([isiTeks(akhirAdegan(a, 2), "d1-t0"), isiTeks(akhirAdegan(a, 4), "d2-t0")], ["9 − 2 = 7", "7 − 4 = 3"], "dua kali: dua kalimat pengurangan");
    sama([isiTeks(akhirAdegan(a, 5), "d3-t0"), isiTeks(akhirAdegan(a, 5), "d4-t0")], ["2 + 4 = 6", "9 − 6 = 3"], "dua kali: cara lain gabungkan dulu");
  }
  // 13) Memeriksa: tambah, mundur di deretan bilangan, dan titik di layar.
  {
    const a = adegan(M_VIDEO, "periksa");
    sama(isiTeks(akhirAdegan(a, 1), "e2-t0"), "periksa: 6 + 2 = 8", "periksa: enam ditambah dua sama dengan delapan");
    const o = akhirAdegan(a, 3);
    sama([tampak(a, 3, 9999, /^dt\d$/), pudar(a, 3, 9999, /^dt\d$/)], [6, 2], "periksa: enam titik biru tersisa, dua titik merah dicoret");
    cekCoret(a, 3, "dt", [6, 7], "merah", "titik merah");
    sama(isiTeks(o, "dr"), "8 − 2 = 6", "periksa: kalimat di bawah titik");
  }
  // 14) Menyusun cerita di layar (tanpa kegiatan di luar layar): stoples sembilan kue, empat dimakan, kalimat, lalu jawaban.
  {
    const a = adegan(M_VIDEO, "susun-cerita");
    sama(jumlahId(a, 1, 9999, /^kue\d$/), 9, "susun cerita: sembilan kue di stoples");
    cek(ketemu(akhirAdegan(a, 1), "n9-k").sorot === true && ketemu(akhirAdegan(a, 2), "n4-k").sorot === true, "susun cerita: angka sembilan lalu empat dipilih dengan ketukan");
    cekCoret(a, 2, "kue", [0, 1, 2, 3], "coret", "kue dimakan");
    sama(isiTeks(akhirAdegan(a, 4), "sj-t0"), "Sisa kue ada 5 buah.", "susun cerita: kalimat jawaban sisa lima kue");
  }
  // 15) Rumus yang disusun potongan demi potongan: urutan potongan, hasil benar, dan kata bilangan di suara berurutan.
  const rumus = [
    [M_VIDEO, "soal-kepik", 2, "ps", [10, 2, 8]],
    [M_VIDEO, "cari-pergi", 3, "gs", [7, 5, 2]],
    [M_VIDEO, "soal-bola", 2, "ss", [10, 3, 7]],
    [M_VIDEO, "beri-bola", 3, "es", [10, 6, 4]],
    [M_VIDEO, "susun-cerita", 3, "su", [9, 4, 5]],
    [M_VIDEO, "latihan-satu", 2, "ls", [8, 3, 5]],
    [M_VIDEO, "latihan-tiga", 1, "qq", [9, 4, 5]],
  ];
  for (const [v, id, ke, p, [b1, b2, h]] of rumus) {
    const a = adegan(v, id);
    const o = akhirAdegan(a, ke);
    stat.kalimat += 1;
    sama([0, 1, 2, 3, 4].map((i) => isiTeks(o, `${p}${i}`)), [String(b1), "−", String(b2), "=", String(h)], `${id}: rumus ${b1} − ${b2} = ${h} tersusun`);
    const xs = [0, 1, 2, 3, 4].map((i) => ketemu(o, `${p}${i}`).x);
    cek(xs.every((x, i) => i === 0 || x > xs[i - 1]), `${id}: potongan rumus berderet kiri ke kanan`);
    const w = kataSuara(a.ketukan[ke]).filter((q) => NAMA_ANGKA.includes(q));
    sama(w.slice(0, 3), [NAMA_ANGKA[b1], NAMA_ANGKA[b2], NAMA_ANGKA[h]], `${id}: suara menyebut ${NAMA_ANGKA[b1]}, ${NAMA_ANGKA[b2]}, ${NAMA_ANGKA[h]}`);
    const pos = [0, 1, 2, 3, 4].map((i) => [...Array(L.kataDari(a.ketukan[ke].suara).length).keys()].find((q) => ketemu(L.keadaanStory(a, ke, q), `${p}${i}`)));
    cek(pos.every((q, i) => q !== undefined && (i === 0 || q > pos[i - 1])), `${id}: potongan rumus muncul satu demi satu mengikuti ucapan`);
  }
  // 16) Latihan: balon Wei, kue Upe (pilihan kalimat), motor di tempat parkir.
  {
    const a1 = adegan(M_VIDEO, "latihan-satu");
    sama([tampak(a1, 0, posKata(a1, 0, "terbang") - 1, /^lb\d$/), tampak(a1, 0, 9999, /^lb\d$/), pudar(a1, 0, 9999, /^lb\d$/)], [8, 5, 3], "Latihan 1: delapan balon, tiga terbang, lima tersisa");
    sama(isiTeks(akhirAdegan(a1, 2), "lj-t0"), "Wei punya 5 balon.", "Latihan 1: kalimat jawaban");
    const a2 = adegan(M_VIDEO, "latihan-dua");
    const o = akhirAdegan(a2, 2);
    sama([isiTeks(o, "o1-t0"), isiTeks(o, "o2-t0")], ["7 − 2 = 5", "7 − 3 = 4"], "Latihan 2: dua pilihan kalimat");
    cek(ketemu(o, "o1-k").warna === "#FFC800", "Latihan 2: pilihan yang cocok disorot");
    sama(jumlahId(a2, 0, 9999, /^ku\d$/), 7, "Latihan 2: tujuh kue Upe");
    sama(isiTeks(akhirAdegan(a2, 3), "jw-t0"), "Sisa kue Upe ada 5.", "Latihan 2: kalimat jawaban");
    const a3 = adegan(M_VIDEO, "latihan-tiga");
    sama([tampak(a3, 0, posKata(a3, 0, "pergi") - 1, /^mt\d$/), tampak(a3, 0, 9999, /^mt\d$/), pudar(a3, 0, 9999, /^mt\d$/)], [9, 5, 4], "Latihan 3: sembilan motor, empat pergi, lima tersisa");
    sama(isiTeks(akhirAdegan(a3, 2), "qj-t0"), "Sisa motor ada 5.", "Latihan 3: kalimat jawaban");
    stat.kartuJawab += 3;
  }
  // 17) Jejak katak dan anak di deretan bilangan mengikuti kata bilangan (mundur).
  const jejak = [
    [M_VIDEO, "periksa", 2, 8, [7, 6]],
    [U, "luar-mundur", 2, 9, [8, 7, 6]],
    [U, "luar-mundur-terapan", 1, 7, [6, 5, 4, 3]],
  ];
  for (const [v, id, ke, awal, nilai] of jejak) {
    const a = adegan(v, id);
    stat.jejak += 1;
    sama(jejakUp(a, ke), [awal, ...nilai].map(xv), `${id}#${ke + 1}: pelompat mundur dari ${awal} mengikuti ${nilai.join(" ")}`);
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
    const dasar = ["pr", "mu", "nu"].find((d) => ketemu(o, `${d}t1`));
    sama([...Array(10).keys()].map((i) => isiTeks(o, `${dasar}t${i + 1}`)), [...Array(10).keys()].map((i) => String(i + 1)), `${id}: deretan bilangan satu sampai sepuluh`);
  }
  {
    const a = adegan(U, "luar-mundur");
    sama(isiTeks(akhirAdegan(a, 3), "mh-t0"), "9 − 3 = 6", "Hitung Mundur: sembilan dikurangi tiga sama dengan enam");
    sama(isiTeks(akhirAdegan(a, 1), "mq-t0"), "9 − 3 = ?", "Hitung Mundur: soal dengan tanda tanya");
    const b = adegan(U, "luar-mundur-terapan");
    sama(isiTeks(akhirAdegan(b, 3), "nj-t0"), "Sisa kue Kira ada 3.", "Hitung Mundur terapan: kalimat jawaban");
    sama(isiTeks(akhirAdegan(b, 2), "nh-t0"), "7 − 4 = 3", "Hitung Mundur terapan: tujuh dikurangi empat sama dengan tiga");
  }
  // 18) Mengambil: jeruk dan kelereng berpindah satu demi satu; sisa dihitung satu demi satu.
  {
    const a = adegan(U, "luar-ambil");
    const jer = (o) => o.filter((q) => /^j\d$/.test(q.id));
    sama([jer(akhirAdegan(a, 0)).length, jer(akhirAdegan(a, 0)).filter((q) => q.y < 120).length], [6, 6], "Mengambil: enam jeruk di piring");
    const w = kataSuara(a.ketukan[1]);
    const mulai = w.indexOf("diambil");
    ["satu", "dua"].forEach((kata, i) => {
      stat.coret += 1;
      const q = w.indexOf(kata, mulai + 1);
      sama(jer(L.keadaanStory(a, 1, q)).filter((r) => r.y > 120).length, i + 1, `Mengambil: ${i + 1} jeruk diambil dari piring pada kata ${kata}`);
    });
    sama(jer(akhirAdegan(a, 1)).filter((q) => q.y < 120).length, 4, "Mengambil: empat jeruk masih di piring");
    sama([0, 1, 2, 3].map((i) => isiTeks(akhirAdegan(a, 2), `an${i}`)), ["1", "2", "3", "4"], "Mengambil: sisa jeruk dihitung satu sampai empat");
    sama(isiTeks(akhirAdegan(a, 3), "ah-t0"), "6 − 2 = 4", "Mengambil: enam dikurangi dua sama dengan empat");
    const b = adegan(U, "luar-ambil-terapan");
    const kel = (o) => o.filter((q) => /^kl\d$/.test(q.id));
    sama([kel(akhirAdegan(b, 0)).length, kel(akhirAdegan(b, 0)).filter((q) => q.y < 120).length], [9, 9], "Mengambil terapan: sembilan kelereng");
    const w2 = kataSuara(b.ketukan[1]);
    const m2 = w2.indexOf("ketuk");
    ["satu", "dua", "tiga", "empat"].forEach((kata, i) => {
      stat.coret += 1;
      const q = w2.indexOf(kata, m2 + 1);
      sama(kel(L.keadaanStory(b, 1, q)).filter((r) => r.y > 120).length, i + 1, `Mengambil terapan: ${i + 1} kelereng diambil pada kata ${kata}`);
    });
    sama([0, 1, 2, 3, 4].map((i) => isiTeks(akhirAdegan(b, 2), `tn${i}`)), ["1", "2", "3", "4", "5"], "Mengambil terapan: sisa kelereng dihitung satu sampai lima");
    sama(isiTeks(akhirAdegan(b, 3), "tj-t0"), "9 − 4 = 5", "Mengambil terapan: sembilan dikurangi empat sama dengan lima");
  }
  // 19) Kurang di Bingkai: titik merah mengisi petak berbeda, lalu dikosongkan satu demi satu.
  for (const [id, isi, pergi, sisa, rumusTeks] of [["luar-bingkai", 8, [5, 6, 7], 5, "8 − 3 = 5"], ["luar-bingkai-terapan", 10, [6, 7, 8, 9], 6, "10 − 4 = 6"]]) {
    const a = adegan(U, id);
    stat.bingkai += 1;
    sama(jumlahId(a, 1, 9999, /^bm\d$/), isi, `${id}: ${isi} titik merah mengisi bingkai`);
    const titik = akhirAdegan(a, 1).filter((x) => /^bm\d$/.test(x.id));
    sama(new Set(titik.map((x) => `${x.x},${x.y}`)).size, isi, `${id}: tiap titik di petak yang berbeda`);
    cek(titik.every((x) => x.x > 85 && x.x < 215 && x.y > 66 && x.y < 118), `${id}: titik berada di dalam bingkai`);
    const w = kataSuara(a.ketukan[1]);
    for (let n = 1; n <= isi; n += 1) sama(jumlahId(a, 1, w.indexOf(NAMA_ANGKA[n], w.indexOf(id === "luar-bingkai" ? "merah" : "jeruk") + 1), /^bm\d$/), n, `${id}: ${n} titik pada kata ${NAMA_ANGKA[n]}`);
    cekCoret(a, 2, "bm", pergi, id === "luar-bingkai" ? "tiga" : "dimakan", `${id}: titik dikosongkan`);
    sama([tampak(a, 2, 9999, /^bm\d$/), pudar(a, 2, 9999, /^bm\d$/)], [sisa, pergi.length], `${id}: ${sisa} titik tersisa, ${pergi.length} dikosongkan`);
    sama(isiTeks(akhirAdegan(a, 3), id === "luar-bingkai" ? "gj-t0" : "bj-t0"), rumusTeks, `${id}: ${rumusTeks}`);
  }
  // 20) Metode luar: nama Indonesia dan ringkasan tampil pada kepala tiap adegan konsep dan terapan.
  for (const [id, i] of [["luar-ambil", 0], ["luar-ambil-terapan", 0], ["luar-mundur", 1], ["luar-mundur-terapan", 1], ["luar-bingkai", 2], ["luar-bingkai-terapan", 2]]) {
    const semuaT = adegan(U, id).ketukan.flatMap((kt, q) => L.teksTerlihat(L.keadaanStory(adegan(U, id), q, 9999)));
    cek(semuaT.some((s) => s.startsWith(U1.NAMA_METODE_ID[i]) && s.includes(U1.RINGKAS_METODE[i])), `${id}: kepala memuat ${U1.NAMA_METODE_ID[i]} dan ringkasannya`);
  }
}

/* ------------------------------ Aplikasi belajar mandiri: tanpa instruksi yang menuntut kelompok, teman, atau kegiatan di luar layar ------------------------------ */
{
  const LUAR_LAYAR = /kelompok|teman|kawan|depan kelas|menulis di|tulis di|menggambar|gambar di|bawa|kertas|pensil|pulpen|spidol|krayon|papan tulis|buku|berpasangan|berpasang-pasangan|bersama-sama dengan|ceritakan (kepada|ke) |tanya(kan)? (ke|pada|kepada) |ajak|angkat jari|ambil benda|buat ceritamu|gambar sendiri/i;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      const semua = [a.judul, a.sumber, v.judul, v.subjudul];
      a.ketukan.forEach((kt, i) => {
        semua.push(kt.suara);
        for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) semua.push(...L.teksTerlihat(L.keadaanStory(a, i, p)));
      });
      const kena = semua.filter((t) => LUAR_LAYAR.test(t) || DILARANG_PEMILIK.test(t));
      cek(kena.length === 0, `${v.id}/${a.id}: tanpa kelompok, teman, depan kelas, buku, kertas, pensil, bawa benda, atau menulis dan menggambar di buku (${kena.slice(0, 2).join(" | ")})`);
    }
  }
}

/* ------------------------------ Sapaan dan peta susun ------------------------------ */
{
  const sap = adegan(M_VIDEO, "sapaan");
  const DAFTAR = ["Membaca soal cerita", "Menyusun kalimat kurang", "Menjawab lalu memeriksa"];
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Membaca soal cerita/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => DAFTAR.includes(t)), DAFTAR, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara), "sapaan materi: tanpa angka");
  cek(adegan(U, "sapaan").ketukan.length === 3 && /Halo anak-anak/.test(adegan(U, "sapaan").ketukan[0].suara), "sapaan metode luar: tiga ketukan");
  // Data peta dan tabel: dibaca dari berkas ringkas bila sudah digabung koordinator, bila belum dari berkas sementara .tmp-k1b3s/D.json.
  let A = null;
  try {
    A = JSON.parse(readFileSync(new URL("../src/data/kelas1-bab3-ringkas.json", import.meta.url), "utf8")).subBab.D;
  } catch {}
  if (!A || !A.petaSusun) {
    try {
      A = JSON.parse(readFileSync(new URL("../.tmp-k1b3s/D.json", import.meta.url), "utf8"));
    } catch {}
  }
  cek(!!(A && A.petaSusun && A.tabelSusun), "peta dan tabel susun: data ada (kelas1-bab3-ringkas.json subBab.D atau .tmp-k1b3s/D.json)");
  if (A && A.petaSusun && A.tabelSusun) {
    const peta = A.petaSusun.simpul;
    const anak = (id) => peta.filter((s) => s.induk === id).map((s) => s.teks);
    const akar = peta.filter((s) => s.induk === null);
    cek(akar.length === 3, "peta susun: tiga cabang dari pusat");
    sama(anak(akar[0].id), DAFTAR, "peta susun: cabang pertama sama dengan daftar sapaan");
    sama([anak(akar[1].id).length, anak(akar[2].id).length, peta.length], [3, 2, 11], "peta susun: 3 cara, 2 hasil, 11 simpul");
    cek(peta.every((s) => s.teks.length <= 28) && new Set(peta.map((s) => s.teks)).size === peta.length, "peta susun: teks <= 28 huruf dan unik");
    cek(!/\d/.test(A.petaSusun.pusat.suara) && !/\d/.test(A.petaSusun.petunjuk) && peta.every((s) => !/\d/.test(s.petunjuk ?? "")), "peta susun: suara dan petunjuk tanpa digit");
    const SEMUA = JSON.stringify({ p: A.petaSusun, t: A.tabelSusun });
    cek(!/buku|halaman|kunci/i.test(SEMUA), "peta dan tabel susun: tanpa kata buku, halaman, atau kunci");
    cek(!DILARANG_PEMILIK.test(SEMUA), "peta dan tabel susun: tanpa kelompok, teman, depan kelas, buku, kertas, pensil, bawa, menulis atau menggambar di buku");
    cek(!/Take Away|Counting Back|Ten Frame|belas|puluh|ratus|ribu/i.test(SEMUA), "peta dan tabel susun: tanpa nama metode Inggris dan tanpa bilangan lebih dari sepuluh");
    cek(A.petaSusun.pusat.judul.length <= 28 && /\?$/.test(A.petaSusun.pusat.judul), "peta susun: judul pusat <= 28 huruf (masalah sub-bab berupa pertanyaan cerita)");
    const T = A.tabelSusun;
    cek(T.baris.length >= 3 && T.baris.length <= 5 && T.kolom.length >= 3 && T.kolom.length <= 4, "tabel susun: 3 sampai 5 baris dan 3 sampai 4 kolom");
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 26 && (s.match(/\d+/g) ?? []).length <= 1)), "tabel susun: sel <= 26 huruf dan paling banyak satu angka per sel");
    cek(T.baris.every((b) => b.label.split(/\s+/).every((w) => w.length <= 8)), "tabel susun: kata terpanjang kolom label <= 8 huruf");
    cek(!/\d/.test(T.suara) && !/\d/.test(T.petunjuk), "tabel susun: suara dan petunjuk tanpa digit");
    cek(T.baris.every((b) => { const [a1, a2, h] = b.sel.map(Number); return a1 - a2 === h && a1 <= 10 && h >= 0; }), "tabel susun: tiap baris mula-mula - pergi = sisa, paling banyak sepuluh");
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 3)), "tabel susun: sel pendek (margin teks sel di lebar 405 px terjaga)");
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k1b3d-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k1b3d-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k1b3d sendiri (${impor.join(", ")})`);
  }
  // Emoji dalam data teks gambar juga paling tinggi Emoji 12 (diperiksa pada gambar yang diputar).
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${v.id}/${a.id}: emoji gambar paling tinggi Emoji 12`);
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k1b3d.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|naskah-k1b1/.test(pembungkus) && /VIDEO_MATERI_K1B3D/.test(pembungkus) && /VIDEO_LUAR_K1B3D/.test(pembungkus) && /export function VideoK1B3D/.test(pembungkus) && /daftar-video-cerita/.test(pembungkus), "video-k1b3d.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k1b3d.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k1b3d.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k1b3d.mjs: akhir baris LF");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit diputar)`);
}
console.log(`Pemeriksaan: ${stat.kalimat} kalimat hitung, ${stat.hitung} hitungan benda, ${stat.coret} benda dicoret atau dipindah, ${stat.jejak} jejak pelompat, ${stat.bingkai} bingkai sepuluh, ${stat.batang} model batang, ${stat.kartuJawab} kalimat jawaban`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
