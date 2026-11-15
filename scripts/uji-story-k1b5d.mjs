// Uji Story Kelas 1 Bab 5 Sub-Bab D (Membandingkan dan Mengurutkan Bilangan): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar,
// hanya bilangan sampai dua puluh (tanpa kali, bagi, atau bilangan lebih dari dua puluh), hitungan benda satu demi satu sinkron dengan kata bilangan (sampai dua puluh),
// kalimat pembanding (lebih banyak, lebih sedikit, sama banyak, tanda) dan sepuluh ditambah sisa yang tampak selalu benar, memasangkan satu-satu, paling banyak dan paling sedikit pada batang,
// mengurutkan kartu dari terkecil dan dari terbesar, model puluhan dan satuan, garis bilangan, dua bingkai sepuluh, peta dan tabel susun,
// tanpa instruksi kelompok, teman, depan kelas, atau kegiatan di buku (aplikasi belajar mandiri), emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k1b5d.mjs
import { readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k1b5d-video.ts");
const U1 = await import("../src/components/modul/story/k1b5d-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K1B5D, V.VIDEO_LUAR_K1B5D];
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
const M_VIDEO = V.VIDEO_MATERI_K1B5D;
const U = V.VIDEO_LUAR_K1B5D;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /Hitung sampai 20|Sepuluh dan Satuan|Dua Bingkai Sepuluh|metode luar|metode dari luar/i;
const NAMA_INGGRIS = /Count to 20|Ten and Ones|Double Ten Frame|Counting|Place value|Ten-frame|Ten Frame/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
// Aturan pemilik: aplikasi belajar mandiri, interaktif, digital. Tidak boleh menyuruh kelompok, teman, depan kelas, menulis atau menggambar di buku, membawa benda nyata.
const DILARANG_PEMILIK = /kelompok|teman|kawan|depan kelas|menulis di|tulis di|menggambar|gambar di|bawa|kertas|pensil|pulpen|spidol|krayon|papan tulis|buku|berpasangan|berpasang-pasangan|ceritakan (kepada|ke) |tanya(kan)? (ke|pada|kepada) |ajak|angkat jari|ambil benda|buat ceritamu|gambar sendiri|bermain bersama|berbaris/i;
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar");
  cek(!NAMA_INGGRIS.test(materi) && !NAMA_INGGRIS.test(luar), "tidak ada nama metode berbahasa Inggris di video (hanya nama Indonesia)");
  for (const m of U1.NAMA_METODE_ID) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE_ID, ["Hitung sampai 20", "Sepuluh dan Satuan", "Dua Bingkai Sepuluh"], "nama Indonesia metode luar");
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
      cek(!/Uji Kompetensi|Pengayaan|Ayo Berlatih|Ayo Berdiskusi|Ayo Berefleksi|Ayo Mengingat|Ayo Berkomunikasi|Ayo Berpikir|Ayo Berkarya|Ayo Mencoba|soal \d|Soal \d|Eksplorasi|Refleksi|Evaluasi/.test(semua.join(" | ")), `${v.id}/${a.id}: latihan disajikan sebagai Latihan, tanpa istilah buku`);
    }
  }
  cek(M_VIDEO.subjudul === "Materi kurikulum" && U.subjudul === "Tiga metode luar", "subjudul video: Materi kurikulum dan Tiga metode luar");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46), "video materi: label sumber berbentuk Materi: ... dan pendek");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "video metode luar: label sumber metode luar atau ringkasan, pendek");
  cek(M_VIDEO.id === "k1b5d-materi" && U.id === "k1b5d-luar", "id video k1b5d-materi dan k1b5d-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,cerita-kelereng,jangan-menebak,pasangkan,kata-pembanding,jeruk-tiga,paling-banyak,urut-kecil,urut-besar,dua-stoples,puluhan-beda,garis-bilangan,tanda-banding,latihan-satu,latihan-dua,latihan-tiga,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-hitung,luar-hitung-terapan,luar-sepuluh,luar-sepuluh-terapan,luar-bingkai,luar-bingkai-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 3 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 3 lalu penutup");
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-hitung", "luar-hitung-terapan", "luar-sepuluh", "luar-sepuluh-terapan", "luar-bingkai", "luar-bingkai-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  for (const kata of ["Latihan", "Igil", "Malosi", "Kira", "Upe", "Wei", "Halim", "kelereng", "jeruk", "apel", "lebih banyak", "lebih sedikit", "sama banyak", "paling banyak", "paling sedikit", "terkecil", "terbesar", "puluhan", "satuan", "garis bilangan", "memasangkan", "tanda"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Hanya bilangan sampai dua puluh: tanpa bilangan lebih dari dua puluh, kali, atau bagi. Tambah hanya sebagai sepuluh ditambah sisa.
  const BOCOR = /dua puluh (satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan)|tiga puluh|empat puluh|lima puluh|\bratus\b|\bribu\b|dikali|dibagi|kali lipat|hasil bagi|dikurangi|operasi|\bkurang\b(?! dari)/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: hanya bilangan sampai dua puluh, tanpa kali, bagi, atau kurang`);
    for (const a of v.adegan) for (const [i] of a.ketukan.entries()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 20, `${v.id}/${a.id}#${i + 1}: angka di gambar paling besar dua puluh ("${t}")`);
  }
  cek(totalKetukan >= 70, `total ketukan cukup dalam (${totalKetukan})`);
  cek(M_VIDEO.adegan.reduce((t, a) => t + a.ketukan.length, 0) >= 70, "ketukan video materi paling sedikit 70");
  // Durasi materi diputar 8 sampai 13 menit (dua kata per detik, sapaan termasuk).
  const kataMateri = kataVideo(M_VIDEO);
  cek(kataMateri / 120 >= 8 && kataMateri / 120 <= 13, `durasi materi diputar 8 sampai 13 menit (${(kataMateri / 120).toFixed(1)} menit)`);
  cek(kataVideo(U) / 120 >= 3, `durasi video luar paling sedikit 3 menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
}

/* ------------------------------ Nama bilangan yang diucapkan tampak sebagai angka ------------------------------ */
const NAMA_BIL = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas", "dua belas", "tiga belas", "empat belas", "lima belas", "enam belas", "tujuh belas", "delapan belas", "sembilan belas", "dua puluh"];
const katak = (kt) => L.kataDari(kt.suara).map((w) => w.toLowerCase().replace(/[^a-z]/g, ""));
/** Bilangan (10 sampai 20) yang disebut dalam sebuah ketukan, sebagai deretan angka. */
const bilSebut = (kt) => {
  const w = katak(kt);
  const out = [];
  for (let i = 0; i < w.length; i += 1) {
    for (let v = 10; v <= 20; v += 1) {
      const nama = NAMA_BIL[v].split(" ");
      const namaMetode = v === 10 && ((w[i + 1] === "dan" && w[i + 2] === "satuan") || w[i - 1] === "bingkai");
      if (nama.every((n, j) => w[i + j] === n) && !namaMetode) out.push(v);
    }
  }
  return out;
};
let kataBilCek = 0;
for (const v of VIDEO) {
  for (const a of v.adegan) {
    const terlihat = new Set();
    a.ketukan.forEach((kt, i) => {
      for (let p = -1; p < L.kataDari(kt.suara).length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) for (const b of bilanganDari(o.isi)) terlihat.add(Number(b));
      for (const n of bilSebut(kt)) {
        kataBilCek += 1;
        cek(terlihat.has(n), `${v.id}/${a.id}#${i + 1}: bilangan "${NAMA_BIL[n]}" tampak sebagai angka ${n} di gambar`);
      }
    });
  }
}

/* ------------------------------ Hitungan, perbandingan, urutan, bingkai, dan garis bilangan ------------------------------ */
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const jumlahId = (a, ke, p, re) => L.keadaanStory(a, ke, p).filter((o) => re.test(o.id)).length;
const stat = { kalimat: 0, banding: 0, hitung: 0, urut: 0, bingkai: 0, garis: 0, pasang: 0, puluhan: 0 };

/** Nomor kata tempat bilangan `v` selesai diucapkan, berurutan dari `dari` sampai `sampai`, dicari setelah kata `setelah`. */
const urutPos = (a, ke, dari, sampai, setelah) => {
  const w = katak(a.ketukan[ke]);
  let mulai = setelah ? w.indexOf(setelah) + 1 : 0;
  if (setelah && mulai === 0) throw new Error(`kata ${setelah} tidak ada: ${a.ketukan[ke].suara}`);
  const out = [];
  for (let v = dari; v <= sampai; v += 1) {
    const nama = NAMA_BIL[v].split(" ");
    let q = -1;
    for (let i = mulai; i + nama.length <= w.length; i += 1) if (nama.every((n, j) => w[i + j] === n)) { q = i + nama.length - 1; break; }
    if (q < 0) throw new Error(`bilangan ${v} tidak diucapkan: ${a.ketukan[ke].suara}`);
    out.push(q);
    mulai = q + 1;
  }
  return out;
};
/**
 * Hitungan benda sinkron dengan suara: pada kata bilangan v (dari ... sampai), benda berid cocok `benda` berjumlah v, nomor `label` (bila ada) berjumlah v - dari + 1
 * dan bernilai v, penghitung `ct` (bila ada) bernilai v; sebelum kata itu, benda berjumlah v - 1.
 */
const cekHitung = (a, ke, dari, sampai, setelah, o, nama) => {
  const pos = urutPos(a, ke, dari, sampai, setelah);
  pos.forEach((p, i) => {
    const v = dari + i;
    stat.hitung += 1;
    const sekarang = L.keadaanStory(a, ke, p);
    if (o.benda) {
      sama(sekarang.filter((x) => o.benda.test(x.id)).length, v, `${nama}: ${v} benda pada kata ${NAMA_BIL[v]}`);
      sama(L.keadaanStory(a, ke, p - 1).filter((x) => o.benda.test(x.id)).length, v - 1, `${nama}: ${v - 1} benda sebelum kata ${NAMA_BIL[v]}`);
    }
    if (o.label) {
      sama(sekarang.filter((x) => o.label.test(x.id)).length, i + 1, `${nama}: ${i + 1} nomor pada kata ${NAMA_BIL[v]}`);
      sama(isiTeks(sekarang, `${o.dasar}${i}`), String(v), `${nama}: nomor ${v} di atas benda ke-${i + 1}`);
    }
    if (o.ct) sama(isiTeks(sekarang, o.ct), String(v), `${nama}: penghitung bernilai ${v} pada kata ${NAMA_BIL[v]}`);
  });
};
{
  // 1) Semua kalimat tambah dan pembanding yang tampak benar; bilangan paling banyak dua puluh.
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((kt, i) => {
        const semuaT = new Set();
        for (let p = -1; p < L.kataDari(kt.suara).length; p += 1) for (const t of L.teksTerlihat(L.keadaanStory(a, i, p))) semuaT.add(t);
        for (const t of semuaT) {
          for (const m of t.matchAll(/(\d+)\s*\+\s*(\d+)\s*=\s*(\d+)/g)) {
            stat.kalimat += 1;
            cek(Number(m[1]) + Number(m[2]) === Number(m[3]) && Number(m[3]) <= 20 && Number(m[1]) === 10, `${v.id}/${a.id}#${i + 1}: kalimat sepuluh ditambah sisa benar dan paling banyak dua puluh ("${m[0]}")`);
          }
          const sisa = t.replace(/(\d+)\s*\+\s*(\d+)\s*=\s*(\d+)/g, "");
          for (const m of sisa.matchAll(/(\d+)\s*([<>=])\s*(\d+)/g)) {
            stat.banding += 1;
            const [p, q] = [Number(m[1]), Number(m[3])];
            cek((m[2] === ">" && p > q) || (m[2] === "<" && p < q) || (m[2] === "=" && p === q), `${v.id}/${a.id}#${i + 1}: tanda pembanding benar ("${m[0]}")`);
          }
          for (const m of t.matchAll(/(\d+) lebih (besar|banyak) dari (\d+)/g)) {
            stat.banding += 1;
            cek(Number(m[1]) > Number(m[3]), `${v.id}/${a.id}#${i + 1}: "${m[0]}" benar`);
          }
          for (const m of t.matchAll(/(\d+) lebih (kecil|sedikit) dari (\d+)/g)) {
            stat.banding += 1;
            cek(Number(m[1]) < Number(m[3]), `${v.id}/${a.id}#${i + 1}: "${m[0]}" benar`);
          }
          cek(!/\d\s*[×÷]\s*\d/.test(t) && !/\d\s*−\s*\d/.test(t), `${v.id}/${a.id}#${i + 1}: tanpa tanda kali, bagi, atau kurang ("${t}")`);
        }
      });
    }
  }
  // 2) Kelereng Halim dan Upe: hitung satu demi satu sampai lima belas dan sebelas.
  {
    const a = adegan(M_VIDEO, "cerita-kelereng");
    cekHitung(a, 1, 1, 15, "pelanpelan", { benda: /^h\d+$/, label: /^hn\d+$/, dasar: "hn" }, "Halim");
    cekHitung(a, 2, 1, 11, "juga", { benda: /^u\d+$/, label: /^un\d+$/, dasar: "un" }, "Upe");
    sama([isiTeks(akhirAdegan(a, 1), "th"), isiTeks(akhirAdegan(a, 2), "tu")], ["Halim: 15 kelereng", "Upe: 11 kelereng"], "kelereng: jumlah akhir Halim dan Upe");
    sama([jumlahId(a, 5, 9999, /^h\d+$/), jumlahId(a, 2, 9999, /^u\d+$/)], [0, 11], "kelereng: ketukan penutup membersihkan, Upe sebelas");
    sama(isiTeks(akhirAdegan(a, 3), "bd-t0"), "15 lebih besar dari 11", "kelereng: lima belas lebih besar dari sebelas");
    sama([ketemu(akhirAdegan(a, 4), "cb-t0")?.isi, ketemu(akhirAdegan(a, 4), "cs-t0")?.isi], ["Halim: lebih banyak", "Upe: lebih sedikit"], "kelereng: Halim lebih banyak, Upe lebih sedikit");
  }
  // 3) Jangan menebak: tersebar dan rapat sama-sama dua belas.
  {
    const a = adegan(M_VIDEO, "jangan-menebak");
    sama([jumlahId(a, 0, 9999, /^as\d+$/), jumlahId(a, 0, 9999, /^br\d+$/)], [12, 12], "menebak: dua belas kelereng tersebar dan dua belas rapat");
    const lebar = (re) => { const xs = akhirAdegan(a, 0).filter((o) => re.test(o.id)).map((o) => o.x); return Math.max(...xs) - Math.min(...xs); };
    cek(lebar(/^as\d+$/) > 2 * lebar(/^br\d+$/), "menebak: kumpulan tersebar jauh lebih lebar daripada yang rapat");
    cekHitung(a, 2, 1, 12, "tersebar", { label: /^ann\d+$/, dasar: "ann" }, "tersebar");
    cekHitung(a, 3, 1, 12, "rapat", { label: /^bnn\d+$/, dasar: "bnn" }, "rapat");
    sama([isiTeks(akhirAdegan(a, 2), "ta"), isiTeks(akhirAdegan(a, 3), "tb"), isiTeks(akhirAdegan(a, 4), "sm-t0")], ["tersebar: 12", "rapat: 12", "sama"], "menebak: hasil sama banyak");
  }
  // 4) Memasangkan satu-satu: empat belas titik merah, sebelas titik biru, sebelas pasangan, sisa tiga.
  {
    const a = adegan(M_VIDEO, "pasangkan");
    sama([jumlahId(a, 0, 9999, /^pm\d+$/), jumlahId(a, 0, 9999, /^pb\d+$/)], [14, 11], "pasangkan: empat belas merah dan sebelas biru");
    const w = urutPos(a, 1, 1, 11, "pasangkan");
    w.forEach((p, i) => {
      stat.pasang += 1;
      sama(jumlahId(a, 1, p, /^ppl\d+$/), i + 1, `pasangkan: ${i + 1} pasangan pada kata ${NAMA_BIL[i + 1]}`);
    });
    const o = akhirAdegan(a, 1);
    for (let i = 0; i < 11; i += 1) {
      const g = ketemu(o, `ppl${i}`);
      const m = ketemu(o, `pm${i}`);
      const b = ketemu(o, `pb${i}`);
      cek(g && Math.abs(g.x - m.x) < 0.01 && Math.abs(g.y - m.y) < 0.01 && Math.abs(g.x + g.x2 - b.x) < 0.01 && Math.abs(g.y + g.y2 - b.y) < 0.01, `pasangkan: garis ${i} menghubungkan titik merah dan titik biru ke-${i + 1}`);
    }
    const o3 = akhirAdegan(a, 2);
    sama([11, 12, 13].map((i) => ketemu(o3, `pm${i}`).sorot), [true, true, true], "pasangkan: tiga titik merah sisa disorot");
    sama([0, 10].map((i) => !!ketemu(o3, `pm${i}`).sorot), [true, true], "pasangkan: titik yang sudah berpasangan disorot");
    cekHitung(a, 2, 1, 3, "sisanya", { label: /^psn\d+$/, dasar: "psn" }, "sisa titik merah");
    sama(isiTeks(akhirAdegan(a, 4), "pn-t0"), "14 lebih banyak dari 11", "pasangkan: empat belas lebih banyak dari sebelas");
  }
  // 5) Kata pembanding: batang lima belas dan sebelas, lalu dua belas dan dua belas.
  {
    const a = adegan(M_VIDEO, "kata-pembanding");
    const lebarBar = (ke, id) => ketemu(akhirAdegan(a, ke), id).w;
    sama([lebarBar(1, "ba"), lebarBar(1, "bb")], [180, 132], "kata pembanding: batang lima belas lebih panjang dari sebelas");
    sama([lebarBar(3, "ba"), lebarBar(3, "bb")], [144, 144], "kata pembanding: batang dua belas dan dua belas sama panjang");
    sama([0, 1, 2].map((i) => isiTeks(akhirAdegan(a, 0), `kw${i}-t0`)), ["lebih banyak", "lebih sedikit", "sama banyak"], "kata pembanding: tiga kata");
  }
  // 6) Jeruk Kira, Tika, dan Wei: sepuluh, empat belas, dua belas.
  {
    const a = adegan(M_VIDEO, "jeruk-tiga");
    cekHitung(a, 0, 1, 10, "pelanpelan", { benda: /^kj\d+$/, label: /^kn\d+$/, dasar: "kn" }, "jeruk Kira");
    cekHitung(a, 1, 1, 14, "pelanpelan", { benda: /^tj\d+$/, label: /^tn\d+$/, dasar: "tn" }, "jeruk Tika");
    cekHitung(a, 2, 1, 12, "pelanpelan", { benda: /^wj\d+$/, label: /^wn\d+$/, dasar: "wn" }, "jeruk Wei");
    sama([isiTeks(akhirAdegan(a, 0), "nk"), isiTeks(akhirAdegan(a, 1), "nt"), isiTeks(akhirAdegan(a, 2), "nw")], ["Kira: 10 jeruk", "Tika: 14 jeruk", "Wei: 12 jeruk"], "jeruk: jumlah tiap anak");
    sama([isiTeks(akhirAdegan(a, 5), "jb-t0"), isiTeks(akhirAdegan(a, 5), "js-t0")], ["paling banyak: Tika", "paling sedikit: Kira"], "jeruk: Tika paling banyak, Kira paling sedikit");
    cek(akhirAdegan(a, 4).filter((o) => /^tj\d+$/.test(o.id)).every((o) => o.sorot === true), "jeruk: jeruk Tika disorot sebagai paling banyak");
  }
  // 7) Paling banyak dan paling sedikit: batang jeruk.
  {
    const a = adegan(M_VIDEO, "paling-banyak");
    const o = akhirAdegan(a, 1);
    sama([ketemu(o, "bt0").w, ketemu(o, "bt1").w, ketemu(o, "bt2").w], [120, 168, 144], "paling: batang sepuluh, empat belas, dua belas");
    const o2 = akhirAdegan(a, 2);
    cek(ketemu(o2, "bt1").warna === "#4ADE80" && ketemu(o2, "bt0").warna === "#60A5FA", "paling: batang terpanjang hijau, terpendek biru");
    cek(ketemu(o2, "bt1").w === Math.max(...[0, 1, 2].map((i) => ketemu(o2, `bt${i}`).w)) && ketemu(o2, "bt0").w === Math.min(...[0, 1, 2].map((i) => ketemu(o2, `bt${i}`).w)), "paling: yang disorot memang terpanjang dan terpendek");
  }
  // 8) Mengurutkan kartu: posisi akhir kartu dari kiri ke kanan mengikuti urutan, di tempatnya.
  const urutan = [
    [M_VIDEO, "urut-kecil", 4, ["10", "12", "14"]],
    [M_VIDEO, "urut-besar", 3, ["18", "15", "11"]],
    [M_VIDEO, "latihan-tiga", 2, ["19", "16", "12"]],
  ];
  for (const [v, id, ke, nilai] of urutan) {
    const a = adegan(v, id);
    stat.urut += 1;
    const o = akhirAdegan(a, ke);
    const kartuKe = nilai.map((n) => ketemu(o, `c${n}-k`));
    sama(nilai.map((n) => isiTeks(o, `c${n}-t`)), nilai, `${id}: isi kartu`);
    cek(kartuKe.every((c, i) => c.y === 128 && c.x === [32, 122, 212][i]), `${id}: kartu berada di tempat pertama, kedua, ketiga menurut urutan`);
    const n = nilai.map(Number);
    cek(id === "urut-kecil" ? n.every((x, i) => i === 0 || x > n[i - 1]) : n.every((x, i) => i === 0 || x < n[i - 1]), `${id}: urutan nilai benar (${id === "urut-kecil" ? "naik" : "turun"})`);
  }
  {
    const a = adegan(M_VIDEO, "urut-kecil");
    // Kartu berpindah satu demi satu: sepuluh pada kata pertama, dua belas pada kedua, empat belas pada ketiga.
    const lokasi = (ke, id, p) => ketemu(L.keadaanStory(a, ke, p), `c${id}-k`).y;
    sama([lokasi(2, 10, 9999), lokasi(2, 12, 9999), lokasi(2, 14, 9999)], [128, 44, 44], "urut kecil: baru sepuluh yang pindah pada ketukan ketiga");
    sama([lokasi(3, 10, 9999), lokasi(3, 12, 9999), lokasi(3, 14, 9999)], [128, 128, 44], "urut kecil: lalu dua belas pindah");
    const pk = katak(a.ketukan[2]).indexOf("pertama");
    sama([lokasi(2, 10, pk - 1), lokasi(2, 10, pk)], [44, 128], "urut kecil: sepuluh pindah tepat pada kata pertama");
    cek(!!ketemu(akhirAdegan(a, 4), "hu-t0") && isiTeks(akhirAdegan(a, 4), "hu-t0") === "10, 12, 14", "urut kecil: hasil urutan sepuluh, dua belas, empat belas");
    sama(isiTeks(akhirAdegan(a, 5), "mb"), "makin besar", "urut kecil: makin besar ke kanan");
    const b = adegan(M_VIDEO, "urut-besar");
    sama(isiTeks(akhirAdegan(b, 4), "mb"), "makin kecil", "urut besar: makin kecil ke kanan");
    sama(isiTeks(akhirAdegan(b, 3), "hu-t0"), "18, 15, 11", "urut besar: hasil urutan delapan belas, lima belas, sebelas");
  }
  // 9) Dua stoples: tiga belas dan enam belas sebagai puluhan dan satuan.
  {
    const a = adegan(M_VIDEO, "dua-stoples");
    stat.puluhan += 2;
    const o = akhirAdegan(a, 1);
    sama([jumlahId(a, 1, 9999, /^ap\d+$/), jumlahId(a, 1, 9999, /^as\d+$/), jumlahId(a, 1, 9999, /^bp\d+$/), jumlahId(a, 1, 9999, /^bs\d+$/)], [10, 3, 10, 6], "stoples: A sepuluh dan tiga, B sepuluh dan enam");
    sama([isiTeks(o, "sa"), isiTeks(o, "sb"), isiTeks(o, "ac"), isiTeks(o, "bc")], ["Stoples A: 13", "Stoples B: 16", "10 + 3", "10 + 6"], "stoples: nama dan rumus sepuluh ditambah sisa");
    cek([...Array(10).keys()].every((i) => { const t = ketemu(o, `ap${i}`); const kb = ketemu(o, "ab"); return t.x > kb.x && t.x < kb.x + kb.w && t.y > kb.y && t.y < kb.y + kb.h; }), "stoples: sepuluh titik A berada di dalam kotak puluhan");
    cek([...Array(3).keys()].every((i) => { const t = ketemu(o, `as${i}`); const kb = ketemu(o, "ab"); return t.y > kb.y + kb.h; }), "stoples: tiga titik satuan A di luar kotak");
    sama(isiTeks(akhirAdegan(a, 4), "hs-t0"), "A: lebih sedikit", "stoples: A lebih sedikit");
    sama(isiTeks(akhirAdegan(a, 5), "jk-t0"), "13 lebih kecil dari 16", "stoples: tiga belas lebih kecil dari enam belas");
  }
  // 10) Puluhan berbeda: dua puluh (dua puluhan) dan delapan belas (satu puluhan dan delapan satuan).
  {
    const a = adegan(M_VIDEO, "puluhan-beda");
    stat.puluhan += 2;
    sama([jumlahId(a, 1, 9999, /^(ap|cp)\d+$/), jumlahId(a, 1, 9999, /^bp\d+$/), jumlahId(a, 1, 9999, /^bs\d+$/)], [20, 10, 8], "puluhan beda: dua puluh titik, satu puluhan dan delapan satuan");
    sama([isiTeks(akhirAdegan(a, 2), "q2"), isiTeks(akhirAdegan(a, 2), "q1")], ["2 puluhan", "1 puluhan"], "puluhan beda: dua puluhan dan satu puluhan");
    sama(isiTeks(akhirAdegan(a, 3), "qk-t0"), "20 lebih besar dari 18", "puluhan beda: dua puluh lebih besar dari delapan belas");
  }
  // 11) Garis bilangan: sel sepuluh sampai dua puluh berurutan dari kiri ke kanan; katak melompat mengikuti kata bilangan; tanda di tempatnya.
  {
    const a = adegan(M_VIDEO, "garis-bilangan");
    stat.garis += 1;
    const xv = (v) => 30 + 24 * (v - 10);
    const o = akhirAdegan(a, 0);
    sama([...Array(11).keys()].map((i) => isiTeks(o, `gt${10 + i}`)), [...Array(11).keys()].map((i) => String(10 + i)), "garis bilangan: sepuluh sampai dua puluh berurutan");
    cek([...Array(11).keys()].every((i) => Math.abs(ketemu(o, `gt${10 + i}`).x - xv(10 + i)) < 0.01), "garis bilangan: jarak sel sama, bilangan makin ke kanan");
    const pos = urutPos(a, 1, 10, 15, "maju");
    pos.forEach((p, i) => {
      stat.garis += 1;
      const fr = ketemu(L.keadaanStory(a, 1, p), "fr");
      cek(fr && Math.abs(fr.x - xv(10 + i)) < 0.01, `garis bilangan: katak di bilangan ${10 + i} pada kata ${NAMA_BIL[10 + i]}`);
    });
    const o3 = akhirAdegan(a, 2);
    cek(ketemu(o3, "m15").x === xv(15) && ketemu(o3, "m11").x === xv(11) && ketemu(o3, "m15").x > ketemu(o3, "m11").x, "garis bilangan: lima belas di sebelah kanan sebelas");
    cek(isiTeks(o3, "pt") === "ke kanan" && isiTeks(akhirAdegan(a, 3), "pt") === "ke kiri", "garis bilangan: kata ke kanan lalu ke kiri");
    const o4 = akhirAdegan(a, 4);
    cek(ketemu(o4, "m18").x === xv(18) && ketemu(o4, "m13").x === xv(13) && ketemu(o4, "m18").x > ketemu(o4, "m13").x, "garis bilangan: delapan belas di sebelah kanan tiga belas");
    sama(isiTeks(o4, "g5-t0"), "18 lebih besar dari 13", "garis bilangan: delapan belas lebih besar dari tiga belas");
  }
  // 12) Tanda pembanding: urutan ungkapan.
  {
    const a = adegan(M_VIDEO, "tanda-banding");
    sama([0, 1, 2, 3, 4].map((i) => isiTeks(akhirAdegan(a, i), "ex")), ["15 ? 11", "15 > 11", "11 < 15", "12 = 12", "17 > 11"], "tanda: ungkapan tiap ketukan");
  }
  // 13) Latihan 1 sampai 3.
  {
    const a1 = adegan(M_VIDEO, "latihan-satu");
    sama([jumlahId(a1, 0, 9999, /^mw\d+$/), jumlahId(a1, 0, 9999, /^mh\d+$/)], [9, 13], "Latihan 1: sembilan mobil Wei dan tiga belas mobil Halim");
    sama(isiTeks(akhirAdegan(a1, 2), "lk-t0"), "9 lebih kecil dari 13", "Latihan 1: sembilan lebih kecil dari tiga belas");
    cek(ketemu(akhirAdegan(a1, 2), "o1-k").sorot === true && ketemu(akhirAdegan(a1, 2), "o2-k").sorot === false, "Latihan 1: kartu Wei dipilih");
    const a2 = adegan(M_VIDEO, "latihan-dua");
    const o = akhirAdegan(a2, 2);
    sama([ketemu(o, "ub").w, ketemu(o, "mb").w, ketemu(o, "rb").w], [144, 216, 120], "Latihan 2: batang dua belas, delapan belas, sepuluh");
    cek(ketemu(o, "mb").warna === "#4ADE80" && ketemu(o, "rb").warna === "#60A5FA" && ketemu(o, "n2-k").sorot === true && ketemu(o, "n3-k").sorot === true, "Latihan 2: Malosi paling banyak, Kira paling sedikit dipilih");
    sama([isiTeks(o, "pp-t0"), isiTeks(o, "ps-t0")], ["paling banyak: Malosi", "paling sedikit: Kira"], "Latihan 2: kartu jawaban");
  }
  // 14) Metode luar: Hitung sampai 20.
  {
    const a = adegan(U, "luar-hitung");
    cekHitung(a, 1, 1, 10, "layar", { benda: /^m\d+$/, ct: "ct" }, "Hitung sampai 20: bingkai pertama");
    cekHitung(a, 2, 11, 16, "melewati", { benda: /^m\d+$/, ct: "ct" }, "Hitung sampai 20: melewati sepuluh");
    sama([isiTeks(akhirAdegan(a, 2), "tt"), isiTeks(akhirAdegan(a, 3), "tt"), jumlahId(a, 3, 9999, /^m\d+$/)], ["16 titik", "20 titik", 20], "Hitung sampai 20: sampai dua puluh titik");
    const o = akhirAdegan(a, 3);
    cek([...Array(10).keys()].every((i) => ketemu(o, `m${i}`).x < 156) && [10, 11, 12, 13, 14, 15, 16, 17, 18, 19].every((i) => ketemu(o, `m${i}`).x > 156), "Hitung sampai 20: sepuluh titik di bingkai pertama, sisanya di bingkai kedua");
    stat.bingkai += 1;
    const b = adegan(U, "luar-hitung-terapan");
    sama([jumlahId(b, 0, 9999, /^ki\d+$/), jumlahId(b, 0, 9999, /^we\d+$/)], [17, 14], "Hitung sampai 20 terapan: tujuh belas dan empat belas kelereng");
    cekHitung(b, 1, 1, 17, "dulu", { label: /^kn\d+$/, dasar: "kn" }, "terapan Kira");
    cekHitung(b, 2, 1, 14, "juga", { label: /^wn\d+$/, dasar: "wn" }, "terapan Wei");
    sama(isiTeks(akhirAdegan(b, 3), "tk-t0"), "17 lebih banyak dari 14", "Hitung sampai 20 terapan: tujuh belas lebih banyak dari empat belas");
  }
  // 15) Metode luar: Sepuluh dan Satuan.
  {
    const a = adegan(U, "luar-sepuluh");
    stat.puluhan += 1;
    sama([jumlahId(a, 3, 9999, /^ap\d+$/), jumlahId(a, 3, 9999, /^as\d+$/), isiTeks(akhirAdegan(a, 3), "bj-t0")], [10, 4, "10 + 4 = 14"], "Sepuluh dan Satuan: empat belas = sepuluh dan empat");
    const b = adegan(U, "luar-sepuluh-terapan");
    stat.puluhan += 2;
    sama([jumlahId(b, 0, 9999, /^ap\d+$/), jumlahId(b, 0, 9999, /^as\d+$/), jumlahId(b, 0, 9999, /^bp\d+$/), jumlahId(b, 0, 9999, /^bs\d+$/)], [10, 3, 10, 7], "Sepuluh dan Satuan terapan: tiga belas dan tujuh belas");
    sama([isiTeks(akhirAdegan(b, 2), "ca"), isiTeks(akhirAdegan(b, 2), "cb"), isiTeks(akhirAdegan(b, 3), "cj-t0")], ["3 satuan", "7 satuan", "13 lebih kecil dari 17"], "Sepuluh dan Satuan terapan: satuan dan hasil");
  }
  // 16) Metode luar: Dua Bingkai Sepuluh.
  {
    const a = adegan(U, "luar-bingkai");
    stat.bingkai += 1;
    cekHitung(a, 1, 1, 13, "titik", { benda: /^m\d+$/, ct: "ct" }, "Dua Bingkai: tiga belas titik");
    const o = akhirAdegan(a, 1);
    cek([...Array(10).keys()].every((i) => ketemu(o, `m${i}`).x < 156) && [10, 11, 12].every((i) => ketemu(o, `m${i}`).x > 156), "Dua Bingkai: sepuluh titik di bingkai pertama, tiga di bingkai kedua");
    sama(new Set([...Array(13).keys()].map((i) => `${ketemu(o, `m${i}`).x},${ketemu(o, `m${i}`).y}`)).size, 13, "Dua Bingkai: tiap titik di petak yang berbeda");
    sama(isiTeks(akhirAdegan(a, 2), "bj-t0"), "10 + 3 = 13", "Dua Bingkai: sepuluh ditambah tiga sama dengan tiga belas");
    const b = adegan(U, "luar-bingkai-terapan");
    stat.bingkai += 2;
    cekHitung(b, 1, 1, 12, "Malosi".toLowerCase(), { benda: /^mm\d+$/, ct: "cm" }, "Dua Bingkai terapan: kelereng Malosi");
    cekHitung(b, 2, 1, 16, "wei", { benda: /^ww\d+$/, ct: "cw" }, "Dua Bingkai terapan: kelereng Wei");
    const ob = akhirAdegan(b, 3);
    cek([...Array(10).keys()].every((i) => ketemu(ob, `mm${i}`).x < 150) && [10, 11].every((i) => ketemu(ob, `mm${i}`).x >= 150) && [...Array(10).keys()].every((i) => ketemu(ob, `ww${i}`).x < 150) && [10, 11, 12, 13, 14, 15].every((i) => ketemu(ob, `ww${i}`).x >= 150), "Dua Bingkai terapan: bingkai pertama penuh, bingkai kedua berisi dua dan enam");
    sama(isiTeks(ob, "ej-t0"), "16 lebih banyak dari 12", "Dua Bingkai terapan: enam belas lebih banyak dari dua belas");
  }
  // 17) Metode luar: nama Indonesia dan ringkasan tampil pada kepala tiap adegan konsep dan terapan.
  for (const [id, i] of [["luar-hitung", 0], ["luar-hitung-terapan", 0], ["luar-sepuluh", 1], ["luar-sepuluh-terapan", 1], ["luar-bingkai", 2], ["luar-bingkai-terapan", 2]]) {
    const semuaT = adegan(U, id).ketukan.flatMap((kt, q) => L.teksTerlihat(L.keadaanStory(adegan(U, id), q, 9999)));
    cek(semuaT.some((s) => s.startsWith(U1.NAMA_METODE_ID[i]) && s.includes(U1.RINGKAS_METODE[i])), `${id}: kepala memuat ${U1.NAMA_METODE_ID[i]} dan ringkasannya`);
  }
  // 18) Aksi digital (CPA): tiap video punya ketuk/seret/pilih (kata ajakan aksi di layar).
  {
    const suaraMateri = M_VIDEO.adegan.flatMap((a) => a.ketukan.map((kt) => kt.suara)).join(" ");
    for (const kata of ["Ketuk", "seret", "Pilih", "Ucapkan lagi mengikuti suara guru"]) cek(new RegExp(kata, "i").test(suaraMateri), `video materi memuat aksi digital "${kata}"`);
  }
}

/* ------------------------------ Aplikasi belajar mandiri: tanpa instruksi yang menuntut kelompok, teman, atau kegiatan di luar layar ------------------------------ */
{
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      const semua = [a.judul, a.sumber, v.judul, v.subjudul];
      a.ketukan.forEach((kt, i) => {
        semua.push(kt.suara);
        for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) semua.push(...L.teksTerlihat(L.keadaanStory(a, i, p)));
      });
      const kena = semua.filter((t) => DILARANG_PEMILIK.test(t));
      cek(kena.length === 0, `${v.id}/${a.id}: tanpa kelompok, teman, depan kelas, buku, kertas, pensil, bawa benda, atau menulis dan menggambar di buku (${kena.slice(0, 2).join(" | ")})`);
    }
  }
}

/* ------------------------------ Sapaan dan peta susun ------------------------------ */
{
  const sap = adegan(M_VIDEO, "sapaan");
  const DAFTAR = ["Membandingkan dua kumpulan", "Mencari paling banyak", "Mengurutkan bilangan"];
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Membandingkan dua kumpulan/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => DAFTAR.includes(t)), DAFTAR, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara), "sapaan materi: tanpa angka");
  cek(adegan(U, "sapaan").ketukan.length === 3 && /Halo anak-anak/.test(adegan(U, "sapaan").ketukan[0].suara), "sapaan metode luar: tiga ketukan");
  // Data peta dan tabel: dibaca dari berkas ringkas bila sudah digabung koordinator, bila belum dari berkas sementara .tmp-k1b5s/D.json.
  let A = null;
  try {
    A = JSON.parse(readFileSync(new URL("../src/data/kelas1-bab5-ringkas.json", import.meta.url), "utf8")).subBab.D;
  } catch {}
  if (!A || !A.petaSusun) {
    try {
      A = JSON.parse(readFileSync(new URL("../.tmp-k1b5s/D.json", import.meta.url), "utf8"));
    } catch {}
  }
  cek(!!(A && A.petaSusun && A.tabelSusun), "peta dan tabel susun: data ada (kelas1-bab5-ringkas.json subBab.D atau .tmp-k1b5s/D.json)");
  if (A && A.petaSusun && A.tabelSusun) {
    const peta = A.petaSusun.simpul;
    const anak = (id) => peta.filter((s) => s.induk === id).map((s) => s.teks);
    const akar = peta.filter((s) => s.induk === null);
    cek(akar.length === 3, "peta susun: tiga cabang dari pusat");
    sama(anak(akar[0].id), DAFTAR, "peta susun: cabang pertama sama dengan daftar sapaan");
    sama([anak(akar[1].id).length, anak(akar[2].id).length, peta.length], [3, 2, 11], "peta susun: 3 cara, 2 hasil, 11 simpul");
    cek(peta.every((s) => s.teks.length <= 28) && new Set(peta.map((s) => s.teks)).size === peta.length, "peta susun: teks <= 28 huruf dan unik");
    cek(peta.every((s, i) => s.nomor === i + 1), "peta susun: nomor 1 sampai 11 berurutan");
    cek(!/\d/.test(A.petaSusun.pusat.suara) && !/\d/.test(A.petaSusun.petunjuk) && peta.every((s) => !/\d/.test(s.petunjuk ?? "")), "peta susun: suara dan petunjuk tanpa digit");
    const SEMUA = JSON.stringify({ p: A.petaSusun, t: A.tabelSusun });
    cek(!/buku|halaman|kunci/i.test(SEMUA), "peta dan tabel susun: tanpa kata buku, halaman, atau kunci");
    cek(!DILARANG_PEMILIK.test(SEMUA), "peta dan tabel susun: tanpa kelompok, teman, depan kelas, buku, kertas, pensil, bawa, menulis atau menggambar di buku");
    cek(!NAMA_INGGRIS.test(SEMUA) && !/ratus|ribu|tiga puluh/i.test(SEMUA), "peta dan tabel susun: tanpa nama metode Inggris dan tanpa bilangan lebih dari dua puluh");
    cek(A.petaSusun.pusat.judul.length <= 28 && /\?$/.test(A.petaSusun.pusat.judul), "peta susun: judul pusat <= 28 huruf (masalah sub-bab berupa pertanyaan)");
    const T = A.tabelSusun;
    cek(T.baris.length >= 3 && T.baris.length <= 5 && T.kolom.length >= 3 && T.kolom.length <= 4, "tabel susun: 3 sampai 5 baris dan 3 sampai 4 kolom");
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 26 && (s.match(/\d+/g) ?? []).length <= 1)), "tabel susun: sel <= 26 huruf dan paling banyak satu angka per sel");
    cek(T.baris.every((b) => b.label.split(/\s+/).every((w) => w.length <= 8)), "tabel susun: kata terpanjang kolom label <= 8 huruf");
    cek(!/\d/.test(T.suara) && !/\d/.test(T.petunjuk), "tabel susun: suara dan petunjuk tanpa digit");
    cek(T.baris.every((b) => { const [kiri, kanan, besar] = b.sel.map(Number); return kiri !== kanan && besar === Math.max(kiri, kanan) && kiri >= 10 - 1 && besar <= 20; }), "tabel susun: tiap baris kolom ketiga = bilangan yang lebih besar dari dua kolom pertama, paling banyak dua puluh");
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 3)), "tabel susun: sel pendek (margin teks sel di lebar 405 px terjaga)");
  }
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k1b5d-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k1b5d-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k1b5d sendiri (${impor.join(", ")})`);
  }
  // Emoji dalam data teks gambar juga paling tinggi Emoji 12 (diperiksa pada gambar yang diputar).
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${v.id}/${a.id}: emoji gambar paling tinggi Emoji 12`);
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k1b5d.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|naskah-k1b1/.test(pembungkus) && /VIDEO_MATERI_K1B5D/.test(pembungkus) && /VIDEO_LUAR_K1B5D/.test(pembungkus) && /export function VideoK1B5D/.test(pembungkus) && /daftar-video-cerita/.test(pembungkus), "video-k1b5d.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k1b5d.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k1b5d.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k1b5d.mjs: akhir baris LF");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit diputar)`);
}
console.log(`Pemeriksaan: ${stat.kalimat} kalimat sepuluh ditambah sisa, ${stat.banding} pembanding, ${stat.hitung} hitungan sinkron, ${stat.pasang} pasangan, ${stat.urut} urutan kartu, ${stat.puluhan} model puluhan, ${stat.bingkai} bingkai, ${stat.garis} garis bilangan, ${kataBilCek} nama bilangan tampak di gambar`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
