// Uji Story Kelas 1 Bab 1 Sub-Bab C (Menghitung Maju dan Mundur): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, sinkron angka suara dan gambar (bilangan yang diucapkan dengan kata tampak sebagai angka), suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas,
// teks bertumpuk, pemisahan materi dan metode luar, tidak membocorkan tambah, kurang, perbandingan, atau bilangan lebih dari sepuluh, jejak pemain pada tangga dan deretan bilangan (naik dan turun)
// dicocokkan dengan kata bilangan di suara, nomor anak tangga, sebelum dan sesudah, kotak bilangan yang hilang beserta jawabannya, titik berurutan, tangga balok, emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k1b1c.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k1b1c-video.ts");
const G = await import("../src/components/modul/story/k1b1c-gambar.ts");
const U1 = await import("../src/components/modul/story/k1b1c-luar-1.ts");

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
const VIDEO = [V.VIDEO_MATERI_K1B1C, V.VIDEO_LUAR_K1B1C];
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
const M_VIDEO = V.VIDEO_MATERI_K1B1C;
const U = V.VIDEO_LUAR_K1B1C;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /CPA|Concrete|Pictorial|Abstract|Benda Nyata Dulu|Gambar Representasi|Simbol Matematika|metode luar|metode dari luar/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of [...U1.NAMA_METODE, ...U1.NAMA_METODE_ID]) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE, ["CPA Concrete", "CPA Pictorial", "CPA Abstract"], "nama metode di berkas luar-1");
  sama(U1.NAMA_METODE_ID, ["Benda Nyata Dulu", "Gambar Representasi", "Simbol Matematika"], "nama Indonesia metode luar");
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
  cek(M_VIDEO.id === "k1b1c-materi" && U.id === "k1b1c-luar", "id video k1b1c-materi dan k1b1c-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,cerita-tangga,hitung-maju,hitung-mundur,mulai-mana-saja,sebelum-sesudah,hitung-berantai,hubungkan-titik,lengkapi-maju,lengkapi-mundur,latihan-satu,latihan-dua,latihan-tiga,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-konkret,luar-konkret-terapan,luar-gambar,luar-gambar-terapan,luar-simbol,luar-simbol-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 3 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 3 lalu penutup");
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-konkret", "luar-konkret-terapan", "luar-gambar", "luar-gambar-terapan", "luar-simbol", "luar-simbol-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  for (const kata of ["Latihan", "Igil", "Malosi", "Kira", "Upe", "Wei", "maju", "mundur", "sebelum", "sesudah", "hilang"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Hanya bilangan 0 sampai 10: tanpa tambah, kurang, banding, atau bilangan lebih dari sepuluh.
  const BOCOR = /tambah|kurang|jumlah|lebih (banyak|besar|sedikit|kecil)|bandingkan|membandingkan|\bbelas\b|\bpuluh\b|\bratus\b|\bribu\b|sebelas|dua belas|operasi|hasil bagi|dikali/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: hanya bilangan sampai sepuluh, tanpa tambah, kurang, banding, atau bilangan lebih dari sepuluh`);
    for (const a of v.adegan) for (const [i, kt] of a.ketukan.entries()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 10, `${v.id}/${a.id}#${i + 1}: angka di gambar paling besar sepuluh ("${t}")`);
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

/* ------------------------------ Tangga, deretan bilangan, dan jejak pemain ------------------------------ */
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const kataSuara = (kt) => L.kataDari(kt.suara).map((w) => w.toLowerCase().replace(/[^a-z]/g, ""));
const xv = (v) => 33 + 26 * (v - 1);
const nilaiDi = (x) => Math.round((x - 33) / 26) + 1;
const stat = { tangga: 0, deret: 0, jejak: 0, kotak: 0 };
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
const titikAda = (a, ke, p, awalan) => L.keadaanStory(a, ke, p).filter((x) => new RegExp(`^${awalan}\\d+$`).test(x.id)).length;
{
  // 1) Tangga sepuluh anak tangga: tinggi naik sepuluh tiap anak tangga, nomor tepat di atas anak tangganya.
  for (const [v, id, ke] of [[M_VIDEO, "hitung-maju", 4], [M_VIDEO, "hitung-mundur", 2], [M_VIDEO, "cerita-tangga", 3], [M_VIDEO, "latihan-tiga", 0], [U, "luar-gambar", 1]]) {
    const o = akhirAdegan(adegan(v, id), ke);
    const ts = o.filter((x) => /^(ts|gs)\d+$/.test(x.id));
    stat.tangga += 1;
    sama(ts.length, 10, `${id}#${ke + 1}: sepuluh anak tangga`);
    cek(ts.every((s, i) => s.h === 10 * (i + 1) && Math.abs(s.x + s.w / 2 - xv(i + 1)) < 0.01 && s.y + s.h === 150), `${id}#${ke + 1}: tinggi anak tangga naik sepuluh demi sepuluh, alas sama`);
    const nomor = o.filter((x) => /^tl\d+$/.test(x.id)).sort((p, q) => Number(p.id.slice(2)) - Number(q.id.slice(2)));
    cek(nomor.length === 10 && nomor.every((t, i) => t.isi === String(i + 1) && Math.abs(t.x - xv(i + 1)) < 0.01), `${id}#${ke + 1}: nomor satu sampai sepuluh di atas anak tangganya`);
  }
  // Nomor muncul bertahap pada cerita tangga: satu dulu, sepuluh kemudian.
  {
    const a = adegan(M_VIDEO, "cerita-tangga");
    const kt = a.ketukan[3];
    sama([titikAda(a, 3, -1, "tl"), titikAda(a, 3, L.posisiKata(kt.suara, "satu."), "tl"), titikAda(a, 3, 9999, "tl")], [0, 1, 10], "cerita tangga: nomor satu muncul saat disebut, sepuluh nomor di akhir");
  }
  // 2) Jejak pemain: menghitung maju (naik) dan mundur (turun) sesuai kata bilangan, saat kata itu diucapkan.
  const jejak = [
    [M_VIDEO, "hitung-maju", 1, [1, 2, 3, 4, 5]],
    [M_VIDEO, "hitung-maju", 2, [6, 7, 8, 9, 10]],
    [M_VIDEO, "hitung-mundur", 1, [10, 9, 8, 7, 6]],
    [M_VIDEO, "hitung-mundur", 2, [5, 4, 3, 2, 1]],
    [M_VIDEO, "mulai-mana-saja", 1, [4, 5, 6, 7, 8]],
    [M_VIDEO, "mulai-mana-saja", 3, [8, 7, 6, 5, 4]],
    [U, "luar-gambar-terapan", 1, [3, 4, 5, 6, 7]],
    [U, "luar-gambar-terapan", 2, [7, 6, 5, 4, 3]],
  ];
  for (const [v, id, ke, nilai] of jejak) {
    const a = adegan(v, id);
    stat.jejak += 1;
    sama(jejakUp(a, ke).slice(-nilai.length), nilai.map(xv), `${id}#${ke + 1}: pemain berpindah mengikuti ${nilai.join(" ")}`);
    const pos = kataSuara(a.ketukan[ke]);
    sama(pos.filter((w) => NAMA_ANGKA.includes(w)).slice(-nilai.length), nilai.map((n) => NAMA_ANGKA[n]), `${id}#${ke + 1}: suara menyebut ${nilai.join(" ")} berurutan`);
    nilai.forEach((n) => {
      const q = [...pos.keys()].filter((r) => pos[r] === NAMA_ANGKA[n]).pop();
      const up = ketemu(L.keadaanStory(a, ke, q), "up");
      cek(up && Math.abs(up.x - xv(n)) < 0.01, `${id}#${ke + 1}: pemain di nilai ${n} saat kata ${NAMA_ANGKA[n]} diucapkan`);
    });
  }
  // Di tangga: maju makin tinggi, mundur makin rendah; pemain berdiri di atas anak tangga bernilai sesuai.
  for (const [id, ke, naik] of [["hitung-maju", 1, true], ["hitung-maju", 2, true], ["hitung-mundur", 1, false], ["hitung-mundur", 2, false]]) {
    const a = adegan(M_VIDEO, id);
    const ys = [];
    const n = L.kataDari(a.ketukan[ke].suara).length;
    for (let p = -1; p < n; p += 1) {
      const up = ketemu(L.keadaanStory(a, ke, p), "up");
      if (up && ys[ys.length - 1] !== up.y) ys.push(up.y);
    }
    cek(ys.every((y, i) => i === 0 || (naik ? y < ys[i - 1] : y > ys[i - 1])), `${id}#${ke + 1}: pemain ${naik ? "makin tinggi (naik)" : "makin rendah (turun)"}`);
    const up = ketemu(akhirAdegan(a, ke), "up");
    cek(Math.abs(up.y - (150 - 10 * nilaiDi(up.x) - 2)) < 0.01, `${id}#${ke + 1}: pemain berdiri di atas anak tangga bernilai ${nilaiDi(up.x)}`);
  }
  // Latihan 3: Upe di anak tangga enam, tujuh, lalu kembali ke enam dan turun ke lima.
  {
    const a = adegan(M_VIDEO, "latihan-tiga");
    const nilai = (ke) => nilaiDi(ketemu(akhirAdegan(a, ke), "up").x);
    sama([nilai(0), nilai(1), nilai(2)], [6, 7, 5], "Latihan 3: Upe di anak tangga enam, tujuh, lima");
    sama(jejakUp(a, 2).map(nilaiDi), [7, 6, 5], "Latihan 3: turun dari tujuh ke enam lalu lima");
    cek(isiTeks(akhirAdegan(a, 1), "qq-t0") === "Naik satu: anak tangga 7" && isiTeks(akhirAdegan(a, 2), "qq-t0") === "Turun satu: anak tangga 5", "Latihan 3: kartu jawaban tujuh dan lima");
  }
  // 3) Deretan bilangan satu sampai sepuluh berurutan.
  for (const [v, id, ke, p] of [[M_VIDEO, "hitung-maju", 5, "dr"], [M_VIDEO, "hitung-mundur", 5, "dm"], [M_VIDEO, "mulai-mana-saja", 0, "dr"], [M_VIDEO, "sebelum-sesudah", 0, "bt"], [U, "luar-gambar-terapan", 0, "gr"]]) {
    const o = akhirAdegan(adegan(v, id), ke);
    stat.deret += 1;
    sama([...Array(10).keys()].map((i) => isiTeks(o, `${p}t${i + 1}`)), [...Array(10).keys()].map((i) => String(i + 1)), `${id}: deretan bilangan satu sampai sepuluh (${p})`);
    cek([...Array(10).keys()].every((i) => { const s = ketemu(o, `${p}k${i + 1}`); return s && Math.abs(s.x + s.w / 2 - xv(i + 1)) < 0.01 && s.w === 26; }), `${id}: sel deretan berurutan kiri ke kanan (${p})`);
  }
  // 4) Katak di batu: enam, tujuh (sesudah), kembali ke enam, lima (sebelum), lalu sebelum dan sesudah enam.
  {
    const a = adegan(M_VIDEO, "sebelum-sesudah");
    const batu = (ke) => nilaiDi(ketemu(akhirAdegan(a, ke), "kt").x);
    sama([batu(0), batu(1), batu(2), batu(3)], [6, 7, 5, 6], "katak: batu enam, tujuh, lima, kembali enam");
    sama(jejakUp(a, 2, "kt").map(nilaiDi), [7, 6, 5], "katak: dari tujuh kembali ke enam lalu lompat ke lima");
    const o = akhirAdegan(a, 3);
    sama([isiTeks(o, "lb"), nilaiDi(ketemu(o, "lb").x), isiTeks(o, "ld"), nilaiDi(ketemu(o, "ld").x)], ["sebelum", 5, "sesudah", 7], "sebelum di batu lima, sesudah di batu tujuh");
    const o5 = akhirAdegan(a, 4);
    sama([isiTeks(o5, "sb-t0"), isiTeks(o5, "ss-t0")], ["sebelum 6 itu 5", "sesudah 6 itu 7"], "kartu sebelum dan sesudah enam");
    const s6 = kataSuara(a.ketukan[5]).join(" ");
    cek(s6.includes("sebelum enam adalah lima") && s6.includes("sesudah enam adalah tujuh"), "suara: sebelum enam adalah lima, sesudah enam adalah tujuh");
  }
  // 5) Hitung berantai: kartu tiga, empat, lima, enam dari kiri ke kanan tepat di bawah Upe, Kira, Malosi, Wei.
  {
    const o = akhirAdegan(adegan(M_VIDEO, "hitung-berantai"), 3);
    const kar = [3, 4, 5, 6].map((n) => ketemu(o, `k${n}-k`));
    sama([3, 4, 5, 6].map((n) => isiTeks(o, `k${n}-t`)), ["3", "4", "5", "6"], "berantai: kartu tiga sampai enam");
    cek(kar.every((c, i) => c && (i === 0 || c.x > kar[i - 1].x)), "berantai: kartu berderet kiri ke kanan");
    const anak = ["Upe", "Kira", "Malosi", "Wei"].map((n) => ketemu(o, `h-${n}`));
    cek(anak.every((c, i) => c && Math.abs(c.x - (kar[i].x + kar[i].w / 2)) < 6), "berantai: tiap kartu tepat di bawah anaknya (Upe tiga, Kira empat, Malosi lima, Wei enam)");
    const urut = ["Upe", "Kira", "Malosi", "Wei"].map((n) => kataSuara({ suara: [...adegan(M_VIDEO, "hitung-berantai").ketukan.map((kt) => kt.suara)].join(" ") }).indexOf(n.toLowerCase()));
    cek(urut.every((p, i) => p >= 0 && (i === 0 || p > urut[i - 1])), "berantai: nama anak disebut urut Upe, Kira, Malosi, Wei");
    const e = akhirAdegan(adegan(M_VIDEO, "hitung-berantai"), 5);
    sama(["e6", "e7", "e8"].map((i) => isiTeks(e, `${i}-t`)), ["6", "7", "8"], "berantai: berlanjut enam, tujuh, delapan");
  }
  // 6) Titik berurutan: sepuluh titik bernomor satu sampai sepuluh, garis tg{i} menghubungkan titik ke-i dan ke-(i+1).
  {
    const a = adegan(M_VIDEO, "hubungkan-titik");
    const o = akhirAdegan(a, 2);
    sama([...Array(10).keys()].map((i) => isiTeks(o, `tn${i}`)), ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], "titik: nomor satu sampai sepuluh");
    sama([titikAda(a, 0, 9999, "tt"), titikAda(a, 0, 9999, "tn")], [10, 10], "titik: sepuluh titik dan sepuluh nomor tampil di awal");
    let ok = true;
    for (let i = 1; i <= 9; i += 1) {
      const g = ketemu(o, `tg${i}`);
      const a1 = ketemu(o, `tt${i - 1}`);
      const a2 = ketemu(o, `tt${i}`);
      if (!(g && a1 && a2 && g.x === a1.x && g.y === a1.y && g.x + g.x2 === a2.x && g.y + g.y2 === a2.y)) ok = false;
    }
    cek(ok, "titik: tiap garis menghubungkan titik ke-i dan ke-(i+1) secara berurutan");
    sama(titikAda(a, 1, 9999, "tg"), 4, "titik: sesudah kata lima baru empat garis");
    const kp = (ke, w) => kataSuara(a.ketukan[ke]).indexOf(w);
    sama([titikAda(a, 1, kp(1, "dua") - 1, "tg"), titikAda(a, 1, kp(1, "dua"), "tg")], [0, 1], "titik: garis pertama muncul saat kata dua diucapkan");
    sama(titikAda(a, 2, kp(2, "sepuluh"), "tg"), 9, "titik: sembilan garis pada kata sepuluh");
    sama(titikAda(a, 2, kp(2, "sembilan"), "tg"), 8, "titik: delapan garis pada kata sembilan");
  }
  // 7) Kotak bilangan yang hilang: sebelum dijawab "?", sesudah dijawab sesuai urutan (selisih satu).
  const lengkapi = [
    [M_VIDEO, "lengkapi-maju", 0, 2, "a", 3, 1, ["3", "4", "5"]],
    [M_VIDEO, "lengkapi-maju", 3, 4, "b", 5, 2, ["4", "5", "6", "7", "8"]],
    [M_VIDEO, "lengkapi-mundur", 0, 2, "c", 4, 2, ["8", "7", "6", "5"]],
    [M_VIDEO, "lengkapi-mundur", 3, 4, "d", 5, 2, ["5", "4", "3", "2", "1"]],
    [M_VIDEO, "latihan-satu", 0, 2, "e", 4, 1, ["5", "6", "7", "8"]],
    [M_VIDEO, "latihan-dua", 0, 2, "f", 4, 2, ["9", "8", "7", "6"]],
    [U, "luar-simbol-terapan", 0, 2, "u", 5, 2, ["2", "3", "4", "5", "6"]],
  ];
  for (const [v, id, keTanya, keJawab, p, n, q, urut] of lengkapi) {
    const a = adegan(v, id);
    stat.kotak += 1;
    const tanya = akhirAdegan(a, keTanya);
    const jawab = akhirAdegan(a, keJawab);
    sama([...Array(n).keys()].map((i) => isiTeks(tanya, `${p}${i}-t`)), urut.map((x, i) => (i === q ? "?" : x)), `${id}: kotak ${p} sebelum dijawab ada tanda tanya di tempat yang hilang`);
    sama([...Array(n).keys()].map((i) => isiTeks(jawab, `${p}${i}-t`)), urut, `${id}: kotak ${p} sesudah dijawab`);
    const selisih = urut.map(Number).slice(1).map((x, i) => x - Number(urut[i]));
    cek(selisih.every((d) => d === selisih[0]) && Math.abs(selisih[0]) === 1, `${id}: urutan ${urut.join(" ")} berselisih satu dan searah`);
    cek(kataSuara(a.ketukan[keJawab]).includes(NAMA_ANGKA[Number(urut[q])]), `${id}: suara jawaban menyebut ${NAMA_ANGKA[Number(urut[q])]}`);
    const xs = [...Array(n).keys()].map((i) => ketemu(tanya, `${p}${i}-k`).x);
    cek(xs.every((x, i) => i === 0 || x > xs[i - 1]), `${id}: kotak ${p} berderet kiri ke kanan`);
  }
  // Pada simbol terapan kedua: delapan, tujuh, enam, lima.
  {
    const o = akhirAdegan(adegan(U, "luar-simbol-terapan"), 3);
    sama([0, 1, 2, 3].map((i) => isiTeks(o, `w${i}-t`)), ["8", "7", "6", "5"], "CPA Abstract: urutan mundur delapan, tujuh, enam, lima lengkap");
  }
  // 8) Tangga balok (CPA Concrete): kolom i berisi i + 1 balok; maju menambah kolom, mundur membongkar dari kolom tertinggi.
  {
    const kol = (o) => [0, 1, 2, 3, 4].map((i) => o.filter((x) => new RegExp(`^bl${i}b\\d$`).test(x.id)).length);
    const a = adegan(U, "luar-konkret");
    const kataK = kataSuara(a.ketukan[1]);
    sama(kol(akhirAdegan(a, 1)), [1, 2, 3, 4, 5], "tangga balok: kolom berisi satu sampai lima balok");
    ["satu", "dua", "tiga", "empat", "lima"].forEach((kata, i) => sama(kol(L.keadaanStory(a, 1, kataK.lastIndexOf(kata))).filter((c) => c > 0).length, i + 1, `tangga balok: ${i + 1} kolom tampak pada kata ${kata}`));
    sama(kol(akhirAdegan(a, 3)), [1, 2, 3, 0, 0], "tangga balok: dua kolom tertinggi diambil, tinggal satu sampai tiga balok");
    const t = adegan(U, "luar-konkret-terapan");
    const t2 = akhirAdegan(t, 1);
    sama([0, 1, 2, 3, 4].map((i) => isiTeks(t2, `lb${i}`)), ["1", "2", "3", "4", "5"], "terapan balok: angka satu sampai lima di bawah kolom");
    sama(kol(t2), [1, 2, 3, 4, 5], "terapan balok: lima kolom tersusun");
    sama(kol(akhirAdegan(t, 2)), [0, 0, 0, 0, 0], "terapan balok: semua dibongkar dari yang tertinggi");
    const kt3 = kataSuara(t.ketukan[2]);
    const sisa = (kata) => kol(L.keadaanStory(t, 2, kt3.lastIndexOf(kata))).reduce((p, q) => p + q, 0);
    sama([sisa("lima"), sisa("empat"), sisa("tiga"), sisa("dua"), sisa("satu")], [10, 6, 3, 1, 0], "terapan balok: sisa balok 10, 6, 3, 1, 0 sesuai kolom yang dibongkar");
  }
  // 9) Metode luar: nama tampil pada kepala tiap adegan konsep dan terapan.
  for (const [id, i] of [["luar-konkret", 0], ["luar-konkret-terapan", 0], ["luar-gambar", 1], ["luar-gambar-terapan", 1], ["luar-simbol", 2], ["luar-simbol-terapan", 2]]) {
    const t = L.teksTerlihat(akhirAdegan(adegan(U, id), 0));
    cek(t.some((s) => s.startsWith(U1.NAMA_METODE[i]) && s.includes(U1.NAMA_METODE_ID[i])), `${id}: kepala memuat ${U1.NAMA_METODE[i]} dan namanya dalam bahasa Indonesia`);
  }
  {
    const t = L.teksTerlihat(akhirAdegan(adegan(U, "luar-simbol"), 2));
    cek(t.includes("1 2 3 4 5") && t.includes("10 9 8 7 6 5 4 3 2 1") && t.includes("1 → 2 → 3 → 4 → 5"), "CPA Abstract: urutan maju dan mundur ditulis dengan angka");
  }
}

/* ------------------------------ Sapaan dan peta susun ------------------------------ */
{
  const sap = adegan(M_VIDEO, "sapaan");
  const DAFTAR = ["Menghitung maju", "Menghitung mundur", "Melengkapi urutan"];
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Menghitung maju/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => DAFTAR.includes(t)), DAFTAR, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara), "sapaan materi: tanpa angka");
  if (true) {
    const A = JSON.parse(readFileSync(new URL("../src/data/kelas1-bab1-ringkas.json", import.meta.url), "utf8")).subBab.C;
    const peta = A.petaSusun.simpul;
    const anak = (id) => peta.filter((s) => s.induk === id).map((s) => s.teks);
    const akar = peta.filter((s) => s.induk === null);
    cek(akar.length === 3, "peta susun: tiga cabang dari pusat");
    sama(anak(akar[0].id), DAFTAR, "peta susun: cabang pertama sama dengan daftar sapaan");
    sama([anak(akar[1].id).length, anak(akar[2].id).length, peta.length], [3, 2, 11], "peta susun: 3 cara, 2 hasil, 11 simpul");
    cek(peta.every((s) => s.teks.length <= 28) && new Set(peta.map((s) => s.teks)).size === peta.length, "peta susun: teks <= 28 huruf dan unik");
    cek(!/\d/.test(A.petaSusun.pusat.suara) && !/\d/.test(A.petaSusun.petunjuk) && peta.every((s) => !/\d/.test(s.petunjuk ?? "")), "peta susun: suara dan petunjuk tanpa digit");
    cek(!/buku|halaman|kunci/i.test(JSON.stringify(A)), "peta dan tabel susun: tanpa kata buku, halaman, atau kunci");
    const T = A.tabelSusun;
    cek(T.baris.length >= 3 && T.baris.length <= 5 && T.kolom.length >= 3 && T.kolom.length <= 4, "tabel susun: 3 sampai 5 baris dan 3 sampai 4 kolom");
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 26 && (s.match(/\d+/g) ?? []).length <= 1)), "tabel susun: sel <= 26 huruf dan paling banyak satu angka per sel");
    cek(T.baris.every((b) => b.label.split(/\s+/).every((w) => w.length <= 8)), "tabel susun: kata terpanjang kolom label <= 8 huruf");
    cek(!/\d/.test(T.suara) && !/\d/.test(T.petunjuk), "tabel susun: suara dan petunjuk tanpa digit");
    cek(T.baris.every((b) => { const [a1, s1, s2] = b.sel.map(Number); return NAMA_ANGKA[a1] === b.label.toLowerCase() && s1 === a1 - 1 && s2 === a1 + 1; }), "tabel susun: label nama angka, sebelum angka minus satu, sesudah angka plus satu");
  } else cek(false, "peta dan tabel susun: .tmp-k1b1as/C.json ada");
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k1b1c-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k1b1c-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k1b1c sendiri (${impor.join(", ")})`);
  }
  // Emoji dalam data teks gambar juga paling tinggi Emoji 12 (diperiksa pada gambar yang diputar).
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${v.id}/${a.id}: emoji gambar paling tinggi Emoji 12`);
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k1b1c.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|naskah-k1b1/.test(pembungkus) && /VIDEO_MATERI_K1B1C/.test(pembungkus) && /VIDEO_LUAR_K1B1C/.test(pembungkus) && /export function VideoK1B1C/.test(pembungkus) && /daftar-video-cerita/.test(pembungkus), "video-k1b1c.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k1b1c.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k1b1c.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k1b1c.mjs: akhir baris LF");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit diputar)`);
}
console.log(`Pemeriksaan: ${stat.tangga} tangga, ${stat.deret} deretan bilangan, ${stat.jejak} jejak pemain, ${stat.kotak} kotak bilangan hilang`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
