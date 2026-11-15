// Uji Story Kelas 1 Bab 7 Sub-Bab B (Mengukur Panjang dengan Satuan Tidak Baku): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar (nama metode hanya Indonesia),
// hanya bilangan sampai dua puluh dan satuan tidak baku di layar (tanpa kali, bagi, bersusun, pinjam, simpan, penggaris, sentimeter, meter), hitungan satu per satu (angka berurutan, dekat satuannya, sama dengan bilangan yang diucapkan),
// nama bilangan sepuluh sampai dua puluh yang diucapkan tampak sebagai angka, setiap pengukuran dihitung ulang dari gambar (satuan sejenis berjajar rapat dari garis awal, tanpa celah, tumpang tindih, atau miring;
// ujung benda sejajar ujung satuan terakhir; hasil "angka + nama satuan" sama dengan jumlah satuan; lebih panjang, lebih pendek, sama panjang, paling panjang, urutan, dan selisih cocok dengan bilangan),
// contoh cara salah (bukan dari ujung, celah, bertumpuk, miring, satuan campur) benar-benar salah, aturan pemilik (belajar mandiri digital: tanpa kelompok, teman, depan kelas, buku, benda fisik, jengkal, telapak kaki),
// emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k1b7B.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k1b7B-video.ts");
const U1 = await import("../src/components/modul/story/k1b7B-luar-1.ts");
const B = await import("../src/components/modul/story/k1b7B-bantu.ts");
const G = await import("../src/components/modul/story/k1b7B-gambar.ts");

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
const VIDEO = [V.VIDEO_MATERI_K1B7B, V.VIDEO_LUAR_K1B7B];
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
const M_VIDEO = V.VIDEO_MATERI_K1B7B;
const U = V.VIDEO_LUAR_K1B7B;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /Ulangi Satuan Panjang|Banding Panjang|Satuan Tak Baku|metode luar|metode dari luar/i;
const NAMA_INGGRIS = /Iterate|Compare Length|Nonstandard|Direct comparison|Measurement progression/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of U1.NAMA_METODE_ID) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE_ID, ["Ulangi Satuan Panjang", "Banding Panjang", "Satuan Tak Baku"], "nama Indonesia metode luar");
  cek(!NAMA_INGGRIS.test(materi) && !NAMA_INGGRIS.test(luar), "nama metode hanya bahasa Indonesia (tanpa Iterate Unit, Compare Length, Nonstandard Units)");
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
      cek(!/Uji Kompetensi|Pengayaan|Ayo Berlatih|Ayo Berdiskusi|Ayo Berefleksi|Ayo Mengingat|Ayo Berkomunikasi|Ayo Berpikir|Ayo Berkarya|Ayo Bermain|Ayo Mencoba|soal \d|Soal \d|Eksplorasi|Refleksi/.test(semua.join(" | ")), `${v.id}/${a.id}: latihan disajikan sebagai Latihan, tanpa istilah buku`);
      // Tokoh hanya enam tokoh tetap (Malosi, Kira, Upe, Wei, Halim, Igil): tanpa nama lain dari data sumber.
      cek(!/\b(Tika|Ibu|Ayah|Bapak|Budi|Ani|Doni|Sinta|Dewi|Rudi|Nina|Andi|Siti)\b/.test(semua.join(" | ")), `${v.id}/${a.id}: hanya enam tokoh tetap`);
    }
  }
  cek(M_VIDEO.subjudul === "Materi kurikulum" && U.subjudul === "Tiga metode luar", "subjudul video: Materi kurikulum dan Tiga metode luar");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46), "video materi: label sumber berbentuk Materi: ... dan pendek");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "video metode luar: label sumber metode luar atau ringkasan, pendek");
  cek(M_VIDEO.id === "k1b7B-materi" && U.id === "k1b7B-luar", "id video k1b7B-materi dan k1b7B-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,pita-malosi,satuan-layar,mulai-ujung,satuan-rapat,tidak-bertumpuk,tidak-miring,satu-jenis,lima-aturan,ukur-meja,tulis-hasil,dua-satuan,layar-berpetak,banding-dua,sama-panjang,banding-tiga,tebak-dulu,detektif,latihan-satu,latihan-dua,latihan-tiga,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-ulangi,luar-ulangi-terapan,luar-banding,luar-banding-terapan,luar-satuan,luar-satuan-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 3 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 3 lalu penutup");
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-ulangi", "luar-ulangi-terapan", "luar-banding", "luar-banding-terapan", "luar-satuan", "luar-satuan-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  for (const kata of ["Latihan", "Igil", "Malosi", "Halim", "Kira", "Wei", "Upe", "klip", "stik", "kotak", "sedotan", "jepit", "garis awal", "lebih panjang", "lebih pendek", "sama panjang", "paling panjang", "paling pendek", "satu jenis", "rapat", "tidak miring", "bertumpuk", "tebak", "selisih", "detektif", "satuan", "angka dan nama satuan"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Hanya bilangan sampai dua puluh, satuan tidak baku di layar: tanpa kali, bagi, bilangan lebih dari dua puluh, bersusun, pinjam, simpan, satuan baku (penggaris, sentimeter, meter), atau rumus.
  const BOCOR = /dikali|perkalian|pembagian|dibagi|\bratus\b|\bribu\b|dua puluh (satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan)|(tiga|empat|lima|enam|tujuh|delapan|sembilan) puluh|\bluas\b|keliling|rumus|volume|sentimeter|centimeter|\bcm\b|\bmeter\b|\bkm\b|penggaris|bersusun|meminjam|pinjam|menyimpan|simpan|dikurangi|ditambah|×|÷|−/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: hanya bilangan sampai dua puluh dan satuan tidak baku (tanpa kali, bagi, bersusun, pinjam, satuan baku, rumus, bilangan lebih dari dua puluh)`);
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
const NAMA_METODE_SUARA = /ulangi satuan panjang|banding panjang|satuan tak baku/gi;
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
/* ------------------------------ Hitungan, benda, dan bingkai dihitung ulang dari gambar ------------------------------ */
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const isiTeks = (objs, id) => ketemu(objs, id)?.isi;
const pusatObj = (b) => (b.t === "kotak" ? { x: b.x + b.w / 2, y: b.y + b.h / 2 } : b.t === "garis" ? { x: b.x + (b.x2 ?? 0) / 2, y: b.y + (b.y2 ?? 0) / 2 } : { x: b.x, y: b.y });
const daftarId = (objs, pola) => objs.filter((o) => pola.test(o.id));
const di = (id, ke) => {
  const a = adegan(M_VIDEO, id) ?? adegan(U, id);
  return akhirAdegan(a, ke);
};
const stat = { hitung: 0, aritmetika: 0, benda: 0 };
const stat2 = { grup: 0, hasil: 0, suara: 0, gambar: 0, salah: 0, khusus: 0 };
const labelAngka = (objs, p) => objs.filter((o) => o.t === "teks" && new RegExp(`^${p}n\\d+$`).test(o.id) && /^\d+$/.test(o.isi ?? "")).sort((m, n) => Number(m.id.slice(p.length + 1)) - Number(n.id.slice(p.length + 1)));

{
  // 1) Semua deret angka hitungan `${p}n{i}`: nilai berurutan, dekat bendanya, dan yang baru muncul sama banyak dengan bilangan berurutan yang diucapkan.
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((kt, i) => {
        const objs = akhirAdegan(a, i);
        const sebelum = i > 0 ? akhirAdegan(a, i - 1) : [];
        const awalan = new Set(objs.filter((o) => o.t === "teks" && /^\d+$/.test(o.isi ?? "")).map((o) => /^([a-z]+)n\d+$/.exec(o.id)?.[1]).filter(Boolean));
        for (const p of awalan) {
          const label = labelAngka(objs, p);
          if (label.length === 0) continue;
          stat.hitung += 1;
          const nama = `${v.id}/${a.id}#${i + 1} hitungan ${p}`;
          const indeks = label.map((lb) => Number(lb.id.slice(p.length + 1)));
          cek(indeks.every((n, q) => n === indeks[0] + q), `${nama}: nomor benda berurutan`);
          const nilai = label.map((lb) => Number(lb.isi));
          cek(nilai.every((n, q) => n === nilai[0] + q) && nilai[0] >= 1, `${nama}: angka hitungan berurutan (${nilai.join(",")})`);
          label.forEach((lb) => {
            const b = ketemu(objs, `${p}${lb.id.slice(p.length + 1)}`);
            cek(b && Math.hypot(pusatObj(b).x - lb.x, pusatObj(b).y - lb.y) < 30, `${nama}: angka ${lb.isi} dekat bendanya`);
          });
          const baru = label.filter((lb) => !sebelum.some((o) => o.id === lb.id));
          if (baru.length) cek(rantaiTerpanjang(kt.suara, Number(baru[0].isi)) === baru.length, `${nama}: ${baru.length} angka baru dari ${baru[0].isi} sama dengan banyak bilangan berurutan yang diucapkan (${rantaiTerpanjang(kt.suara, Number(baru[0].isi))})`);
        }
      });
    }
  }

  // 2) Ukuran: setiap benda yang diukur dihitung ulang dari gambar (satuan berjajar rapat dari garis awal, jumlah satuan sama dengan hasil yang ditulis dan diucapkan).
  const SAT = G.SATUAN;
  const NOUN = Object.keys(SAT);
  const jenisDari = (u) => NOUN.find((j) => SAT[j].w === u.w && SAT[j].h === u.h && SAT[j].warna === u.warna);
  const nomorId = (id) => Number(id.replace(/\D/g, ""));
  /** Semua pengukuran yang benar pada keadaan gambar: benda `${p}b` dengan satuan `${p}u{i}`. */
  const grupDari = (objs) =>
    objs
      .filter((o) => o.t === "kotak" && /^[a-z]+b$/.test(o.id))
      .map((bar) => {
        const p = bar.id.slice(0, -1);
        const units = objs.filter((o) => new RegExp(`^${p}u\\d+$`).test(o.id)).sort((m, n) => nomorId(m.id) - nomorId(n.id));
        return { p, bar, units };
      })
      .filter((g) => g.units.length > 0);
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((kt, i) => {
        const nm = `${v.id}/${a.id}#${i + 1}`;
        const objs = akhirAdegan(a, i);
        const grup = grupDari(objs);
        for (const g of grup) {
          stat2.grup += 1;
          const u0 = g.units[0];
          const j = jenisDari(u0);
          cek(!!j, `${nm}: satuan ${g.p} berukuran salah satu jenis (klip, stik, kotak, sedotan, jepit)`);
          if (!j) continue;
          const s = SAT[j];
          cek(g.units.every((u, q) => nomorId(u.id) === q && u.y === u0.y && u.w === s.w && u.h === s.h && u.warna === s.warna && !u.rot), `${nm}: satuan ${g.p} satu jenis, sebaris, lurus, bernomor berurutan`);
          cek(g.units.every((u, q) => Math.abs(u.x - (g.bar.x + q * s.w)) < 0.01), `${nm}: satuan ${g.p} berjajar rapat dari ujung benda (tanpa celah dan tanpa tumpang tindih)`);
          cek(g.units.length * s.w <= g.bar.w + 0.01 && g.bar.w % s.w === 0 && g.bar.w / s.w <= 20, `${nm}: ${g.p} paling banyak dua puluh satuan dan tidak melewati ujung benda`);
          const ga = ketemu(objs, `${g.p}g`);
          cek(ga && ga.x === g.bar.x && ga.y < g.bar.y && ga.y + (ga.y2 ?? 0) > u0.y, `${nm}: garis awal ${g.p} tepat di ujung benda dan satuan pertama`);
          cek(u0.y > g.bar.y + g.bar.h, `${nm}: satuan ${g.p} di bawah benda`);
          const h = ketemu(objs, `${g.p}h`);
          if (h) {
            stat2.hasil += 1;
            cek(h.isi === `${g.bar.w / s.w} ${j}`, `${nm}: hasil ${g.p} "${h.isi}" sama dengan ${g.bar.w / s.w} ${j}`);
            cek(g.units.length === g.bar.w / s.w, `${nm}: hasil ${g.p} baru ditulis setelah semua satuan ditaruh`);
          }
        }
        // Tulisan "N satuan" di gambar harus cocok dengan benda yang tergambar.
        const nilaiGrup = (noun) => grup.filter((g) => jenisDari(g.units[0]) === noun).map((g) => g.bar.w / SAT[noun].w);
        const tebak = (noun) => L.teksTerlihat(objs).map((t) => new RegExp(`^tebakan: (\\d+) ${noun}$`).exec(t)).filter(Boolean).map((m) => Number(m[1]));
        const eks = objs.filter((o) => /^exu\d+$/.test(o.id)).length;
        for (const t of L.teksTerlihat(objs)) {
          const m = new RegExp(`(\\d+) (${NOUN.join("|")})\\b`).exec(t);
          if (!m) continue;
          stat2.gambar += 1;
          const n = Number(m[1]);
          const noun = m[2];
          const pool = [...nilaiGrup(noun), ...tebak(noun)];
          if (/^selisih: /.test(t)) cek(pool.some((x) => pool.some((y) => Math.abs(x - y) === n && n > 0)) || n === eks, `${nm} gambar: "${t}" sama dengan selisih dua ukuran di layar`);
          else if (/^tebakan: /.test(t)) cek(n >= 1 && n <= 20, `${nm} gambar: "${t}" tebakan paling banyak dua puluh`);
          else cek(nilaiGrup(noun).includes(n), `${nm} gambar: "${t}" sama dengan jumlah ${noun} yang tergambar (${nilaiGrup(noun).join(",")})`);
        }
        // Ukuran yang diucapkan ("tujuh klip") harus tertulis di gambar dan, bila pengukuran tergambar, sama dengan jumlah satuan.
        const terlihat = new Set();
        for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) for (const t of L.teksTerlihat(L.keadaanStory(a, i, p))) terlihat.add(t);
        const N = NAMA.slice(1).sort((m2, n2) => n2.length - m2.length).join("|");
        const reUkuran = new RegExp(`\\b(${N}) (${NOUN.join("|")})\\b`, "gi");
        for (const m of kt.suara.matchAll(reUkuran)) {
          const n = NAMA.indexOf(m[1].toLowerCase());
          if (n === 1) continue;
          stat2.suara += 1;
          cek([...terlihat].some((t) => new RegExp(`(^|[^\\d])${n} ${m[2].toLowerCase()}\\b`).test(t)), `${nm} suara: "${m[0]}" tertulis di gambar sebagai "${n} ${m[2].toLowerCase()}"`);
        }
      });
    }
  }

  // 3) Contoh cara salah: tiap contoh benar-benar salah menurut aturannya.
  {
    const salah = (id, ke, p, cacat) => {
      const o = di(id, ke);
      const bar = ketemu(o, `${p}y`);
      const us = daftarId(o, new RegExp(`^${p}w\\d+$`)).sort((m, n) => nomorId(m.id) - nomorId(n.id));
      cek(bar && us.length >= 3 && ketemu(o, `${p}gx`)?.x === bar.x, `${id}: contoh salah ${p} lengkap (benda, garis awal, satuan)`);
      const lebar = (u) => u.w;
      const sambung = us.map((u, q) => (q === 0 ? 0 : u.x - (us[q - 1].x + lebar(us[q - 1]))));
      if (cacat === "ujung") cek(us[0].x > bar.x + 4 && sambung.every((c) => Math.abs(c) < 0.01), `${id}: ${p} tidak mulai dari ujung (satuan pertama menjauh dari garis awal), selebihnya rapat`);
      if (cacat === "celah") cek(us[0].x === bar.x && sambung.slice(1).every((c) => c > 3), `${id}: ${p} ada celah antar satuan`);
      if (cacat === "tumpuk") cek(us[0].x === bar.x && sambung.slice(1).every((c) => c < -3), `${id}: ${p} satuan bertumpuk`);
      if (cacat === "miring") cek(us.every((u) => u.rot && Math.abs(u.rot) >= 10), `${id}: ${p} satuan miring`);
      if (cacat === "campur") cek(new Set(us.map((u) => u.w)).size >= 2 && us.every((u) => jenisDari(u)), `${id}: ${p} satuan campur`);
      stat2.salah += 1;
    };
    salah("mulai-ujung", 1, "xa", "ujung");
    salah("satuan-rapat", 1, "xb", "celah");
    salah("tidak-bertumpuk", 1, "xc", "tumpuk");
    salah("tidak-miring", 1, "xd", "miring");
    salah("satu-jenis", 1, "xe", "campur");
    salah("detektif", 0, "xa", "celah");
    salah("detektif", 0, "xb", "tumpuk");
    const lebarGrup = (id, ke, p) => {
      const g = grupDari(di(id, ke)).find((q) => q.p === p);
      return g ? { n: g.bar.w / SAT[jenisDari(g.units[0])].w, j: jenisDari(g.units[0]), w: g.bar.w, x: g.bar.x, m: g.units.length } : null;
    };
    // Aturan mulai dari ujung dan seterusnya: pengukuran yang benar di bawah contoh salah.
    sama([lebarGrup("mulai-ujung", 3, "ra"), lebarGrup("satuan-rapat", 3, "rb"), lebarGrup("tidak-bertumpuk", 3, "rc"), lebarGrup("tidak-miring", 3, "rd"), lebarGrup("satu-jenis", 3, "re")].map((g) => `${g.n} ${g.j}`), ["6 klip", "5 sedotan", "4 stik", "8 klip", "4 stik"], "aturan 1 sampai 5: hasil pengukuran yang benar");
    sama(["pita-malosi", "ukur-meja", "tulis-hasil", "layar-berpetak", "latihan-satu"].map((id) => id), ["pita-malosi", "ukur-meja", "tulis-hasil", "layar-berpetak", "latihan-satu"], "adegan pengukuran lengkap ada");
    sama([lebarGrup("pita-malosi", 4, "pu"), lebarGrup("ukur-meja", 5, "um"), lebarGrup("tulis-hasil", 4, "th"), lebarGrup("layar-berpetak", 4, "pk"), lebarGrup("latihan-satu", 3, "la")].map((g) => `${g.n} ${g.j}/${g.m}`), ["7 klip/7", "6 sedotan/6", "5 stik/5", "9 kotak/9", "9 klip/9"], "pita, meja, ikan, kereta, pita Wei: hasil dan banyak satuan");
    stat2.khusus += 10;
    // Satuan di layar: stik lebih panjang dari klip; sedotan panjang dan tipis; jepit pendek dan lebar.
    cek(SAT.stik.w > SAT.klip.w && SAT.sedotan.w > SAT.kotak.w && SAT.sedotan.h < SAT.kotak.h && SAT.jepit.w < SAT.sedotan.w && SAT.jepit.h > SAT.sedotan.h, "satuan di layar: stik lebih panjang dari klip, sedotan panjang dan tipis, jepit pendek dan lebar");
    cek(new Set(NOUN.map((j) => SAT[j].w)).size === 5, "lima satuan berukuran beda semua");
    sama(NOUN.filter((j) => di("satuan-layar", 5, "x") && ketemu(di("satuan-layar", 3), `sm${NOUN.indexOf(j)}`)).length, 5, "satuan di layar: lima satuan tergambar");
    // Dua satuan, satu tali: hasil berbeda, satuan lebih panjang hasil lebih sedikit.
    {
      const a1 = lebarGrup("dua-satuan", 2, "da");
      const a2 = lebarGrup("dua-satuan", 2, "db");
      sama([a1.n, a1.j, a2.n, a2.j, a1.w === a2.w, a1.x === a2.x], [10, "klip", 5, "stik", true, true], "dua satuan: tali yang sama, sepuluh klip dan lima stik");
      cek(SAT.stik.w > SAT.klip.w && a2.n < a1.n, "dua satuan: satuan lebih panjang, hasil lebih sedikit");
    }
    // Banding dua: pita Malosi delapan klip, tali Kira lima klip, garis awal sama, selisih tiga klip.
    {
      const p = lebarGrup("banding-dua", 3, "ba");
      const q = lebarGrup("banding-dua", 3, "bb");
      sama([p.n, q.n, p.x === q.x, p.j === q.j, p.n - q.n], [8, 5, true, true, 3], "banding dua: delapan klip dan lima klip dari garis awal sama, selisih tiga");
      sama(isiTeks(di("banding-dua", 3), "bs"), "selisih: 3 klip", "banding dua: selisih tiga klip");
      sama(daftarId(di("banding-dua", 3), /^bau\d+$/).filter((u) => u.sorot).map((u) => u.id), ["bau5", "bau6", "bau7"], "banding dua: tiga klip yang lebih disorot");
      cek(p.n > q.n && ketemu(di("banding-dua", 2), "bab").sorot === true, "banding dua: pita lebih panjang dari tali disorot");
    }
    // Sama panjang: tujuh klip dan tujuh klip, ujung sejajar.
    {
      const p = lebarGrup("sama-panjang", 2, "sa");
      const q = lebarGrup("sama-panjang", 2, "sb");
      cek(p.n === 7 && q.n === 7 && p.j === q.j && p.w === q.w && p.x === q.x && ketemu(di("sama-panjang", 2), "sj").x === p.x + p.w, "sama panjang: dua benda tujuh klip, ujung sejajar pada garis putus");
    }
    // Tiga benda: paling panjang, paling pendek, dan urutan.
    {
      const g3 = ["ta", "tb", "tc"].map((p) => lebarGrup("banding-tiga", 1, p));
      sama(g3.map((g) => g.n), [9, 7, 5], "banding tiga: pita sembilan, ikan tujuh, tali lima");
      cek(g3.every((g) => g.x === g3[0].x && g.j === "klip"), "banding tiga: garis awal sama dan satuan sama");
      cek(g3[0].n === Math.max(...g3.map((g) => g.n)) && g3[2].n === Math.min(...g3.map((g) => g.n)), "banding tiga: paling panjang pita Malosi, paling pendek tali Kira");
      sama([ketemu(di("banding-tiga", 2), "tab").sorot, ketemu(di("banding-tiga", 2), "tcb").sorot, isiTeks(di("banding-tiga", 2), "tk-t0")], [true, true, "paling panjang: pita Malosi"], "banding tiga: yang paling panjang dan paling pendek disorot");
      sama(isiTeks(di("banding-tiga", 3), "tl-t0"), "pendek ke panjang: tali, ikan, pita", "banding tiga: urutan dari pendek ke panjang benar");
    }
    // Tebak dulu: tebakan empat stik, hasil lima stik, selisih satu.
    {
      const o = di("tebak-dulu", 3);
      const g = lebarGrup("tebak-dulu", 3, "tb");
      sama([g.n, g.j, isiTeks(o, "tt"), isiTeks(o, "tbh"), isiTeks(o, "ts"), ketemu(o, "tm").x], [5, "stik", "tebakan: 4 stik", "5 stik", "selisih: 1 stik", g.x + 4 * SAT.stik.w], "tebak dulu: tebakan empat stik, hasil lima stik, selisih satu");
    }
    // Latihan: meja, pita Wei, tongkat Upe dan tali Halim, meja Kira.
    {
      const l1 = di("latihan-satu", 3);
      sama([["c1-t", "c2-t", "c3-t"].map((q) => isiTeks(l1, q)), ketemu(l1, "c2-k").sorot, isiTeks(l1, "lah"), lebarGrup("latihan-satu", 3, "la").n], [["8", "9", "10"], true, "9 klip", 9], "latihan 1: sembilan klip dipilih");
      const l2 = di("latihan-dua", 2);
      const lb = lebarGrup("latihan-dua", 2, "lb");
      const lc = lebarGrup("latihan-dua", 2, "lc");
      sama([lb.n, lc.n, lb.x === lc.x, [isiTeks(l2, "c1-t"), isiTeks(l2, "c2-t")], ketemu(l2, "c2-k").sorot, ketemu(l2, "lcb").sorot], [6, 9, true, ["tongkat Upe", "tali Halim"], true, true], "latihan 2: tali Halim sembilan klip lebih panjang dari tongkat Upe enam klip");
      const l4 = di("latihan-dua", 3);
      sama([isiTeks(l4, "sd"), labelAngka(l4, "lcu").map((q) => Number(q.id.slice(4))), labelAngka(l4, "lcu").map((q) => q.isi)], ["selisih: 3 klip", [6, 7, 8], ["1", "2", "3"]], "latihan 2: tiga klip yang lebih dihitung, selisih tiga");
      const l3 = di("latihan-tiga", 0);
      const ma = lebarGrup("latihan-tiga", 0, "ma");
      const mb = lebarGrup("latihan-tiga", 3, "mb");
      const l33 = di("latihan-tiga", 1);
      sama([ma.n, ma.j, mb.n, mb.j, ma.w === mb.w, isiTeks(l3, "mah"), ["c1-t", "c2-t", "c3-t"].map((q) => isiTeks(l33, q))], [12, "kotak", 6, "sedotan", true, "12 kotak", ["lebih banyak", "lebih sedikit", "sama banyak"]], "latihan 3: meja dua belas kotak dan enam sedotan");
      cek(ketemu(di("latihan-tiga", 2), "c2-k").sorot === true && mb.n < ma.n, "latihan 3: satuan lebih panjang, hasil lebih sedikit (lebih sedikit dipilih)");
    }
    // Detektif: cara C yang benar.
    {
      const o = di("detektif", 2);
      const c = lebarGrup("detektif", 2, "rc");
      cek(c.n === 5 && c.j === "klip" && ketemu(o, "rcb").sorot === true && ketemu(o, "rc-x").isi === "✅" && ketemu(o, "xa-x").isi === "❌" && ketemu(o, "xb-x").isi === "❌", "detektif: cara C rapat dan lurus benar, cara A dan B salah");
    }
    // Metode luar.
    {
      const a = lebarGrup("luar-ulangi", 3, "ua");
      cek(a.n === 6 && a.j === "klip" && isiTeks(di("luar-ulangi", 3), "uah") === "6 klip", "luar ulangi: pita enam klip");
      const b = lebarGrup("luar-ulangi-terapan", 3, "ub");
      const lt = di("luar-ulangi-terapan", 3);
      sama([b.n, b.j, ketemu(lt, "c2-k").sorot, ["c1-t", "c2-t", "c3-t"].map((q) => isiTeks(lt, q)), isiTeks(lt, "ubh")], [9, "kotak", true, ["8", "9", "10"], "9 kotak"], "luar ulangi terapan: ikan sembilan kotak dipilih");
      // Banding Panjang: dua benda dari garis awal sama, bagian yang lebih = tiga klip tepat di ujung benda panjang.
      const o = di("luar-banding", 3);
      const A = ketemu(o, "cab");
      const B = ketemu(o, "cbb");
      const eks = daftarId(o, /^exu\d+$/).sort((m, n) => nomorId(m.id) - nomorId(n.id));
      cek(A.x === B.x && ketemu(o, "cg").x === A.x && A.w > B.w && A.w - B.w === 3 * SAT.klip.w && A.w % SAT.klip.w === 0 && B.w % SAT.klip.w === 0, "luar banding: dua benda dari garis awal sama, selisih panjang tepat tiga klip");
      cek(eks.length === 3 && eks.every((u, q) => u.x === B.x + B.w + q * SAT.klip.w && jenisDari(u) === "klip" && u.y === eks[0].y) && eks[2].x + SAT.klip.w === A.x + A.w, "luar banding: tiga klip rapat dari ujung benda pendek sampai ujung benda panjang");
      sama([isiTeks(o, "cs"), ketemu(o, "cm").x === B.x + B.w, ketemu(di("luar-banding", 2), "cab").sorot], ["selisih: 3 klip", true, true], "luar banding: selisih tiga klip, garis ujung tali, tongkat lebih panjang disorot");
      sama(labelAngka(o, "exu").map((q) => `${q.id.slice(4)}:${q.isi}`), ["5:1", "6:2", "7:3"], "luar banding: klip yang lebih dihitung satu, dua, tiga");
      const t = di("luar-banding-terapan", 3);
      const w3 = ["dab", "dbb", "dcb"].map((q) => ketemu(t, q));
      cek(w3.every((x) => x.x === w3[0].x) && w3[1].w === Math.max(...w3.map((x) => x.w)) && w3[0].w === Math.min(...w3.map((x) => x.w)), "luar banding terapan: pita B paling panjang, pita A paling pendek, garis awal sama");
      sama([ketemu(di("luar-banding-terapan", 2), "c2-k").sorot, ketemu(di("luar-banding-terapan", 2), "dbb").sorot, ketemu(t, "c1-k").sorot, ketemu(t, "dab").sorot, ["c1-t", "c2-t", "c3-t"].map((q) => isiTeks(t, q))], [true, true, true, true, ["A", "B", "C"]], "luar banding terapan: B paling panjang lalu A paling pendek");
      // Satuan Tak Baku: meja yang sama, sedotan enam dan jepit lima belas; tongkat Wei sepuluh klip sama panjang dengan tongkat Halim lima stik.
      const e = di("luar-satuan", 2);
      const fa = lebarGrup("luar-satuan", 2, "fa");
      const fb = lebarGrup("luar-satuan", 2, "fb");
      sama([fa.n, fa.j, fb.n, fb.j, fa.w === fb.w, isiTeks(e, "fah"), isiTeks(e, "fbh")], [6, "sedotan", 15, "jepit", true, "6 sedotan", "15 jepit"], "luar satuan: meja yang sama, enam sedotan dan lima belas jepit");
      const f = di("luar-satuan-terapan", 2);
      const ga = lebarGrup("luar-satuan-terapan", 2, "ga");
      const gb = lebarGrup("luar-satuan-terapan", 2, "gb");
      sama([ga.n, ga.j, gb.n, gb.j, ga.w === gb.w, ga.x === gb.x, ketemu(f, "gs").x === ga.x + ga.w], [10, "klip", 5, "stik", true, true, true], "luar satuan terapan: sepuluh klip sama panjang dengan lima stik");
    }
    stat2.khusus += 40;
  }
}


/* ------------------------------ Aturan pemilik: belajar mandiri, digital, tanpa benda fisik ------------------------------ */
{
  const MANDIRI = /kelompok|\bteman\w*|\bkawan\w*|sekawan|depan kelas|bersama kelas|seluruh kelas|\bkelas\b|berpasangan dengan (teman|kawan)|bekerja berpasangan|secara berpasangan|bermain bersama|bertanya kepada|buat ceritamu|buku|menulis di|menuliskan di|tulis di|tuliskan di|menggambar|gambarlah|gambar sendiri|\bbawa(lah)?\b|membawa|dibawa|\bkertas\b|\bpensil\b|\bpulpen\b|\bspidol\b|ambil (benda|pensil|kelereng|bola|sedotan|balon|klip|stik)|tangan (kiri|kanan)|\bjari\b|menyuruh|suruh|\braba\w*|\bmeraba|\btubuh|\blengan|lingkari|coret|guru kelas|di rumah|orang tua|\bayah\b|\bibu guru|bapak guru/i;
  // Benda fisik dari data sumber diganti aksi layar: tanpa jengkal, telapak kaki, depa, penggaris, koin, penjepit kertas, atau benda di sekitar.
  const FISIK = /jengkal|telapak|\bdepa\b|penggaris|\bkoin\b|penjepit|di sekitar|sekitarmu|di sekitar kita|kakimu|tanganmu|badanmu|tinggi badan|mengukur sendiri|ukur sendiri|\bmeja belajar|centimeter|sentimeter|\bmeter\b/i;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      const semua = [a.judul, a.sumber];
      a.ketukan.forEach((kt, i) => {
        semua.push(kt.suara);
        semua.push(...L.teksTerlihat(L.keadaanStory(a, i, 9999)));
      });
      const kena = semua.filter((t) => MANDIRI.test(t) || FISIK.test(t));
      cek(kena.length === 0, `${v.id}/${a.id}: narasi mandiri dan digital, tanpa kelompok, teman, kelas, buku, kertas, pensil, benda fisik, atau satuan baku (${kena.slice(0, 2).join(" | ")})`);
    }
  }
}

/* ------------------------------ Sapaan dan peta susun ------------------------------ */
{
  const sap = adegan(M_VIDEO, "sapaan");
  const DAFTAR = ["Mengukur dengan satuan", "Cara mengukur yang benar", "Membandingkan hasil ukur"];
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Mengukur dengan satuan/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => DAFTAR.includes(t)), DAFTAR, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara) && !/\d/.test(DAFTAR.join(" ")), "sapaan materi: tanpa angka");
  const sapLuar = adegan(U, "sapaan");
  cek(/cara lain/i.test(L.teksTerlihat(akhirAdegan(sapLuar, 1)).join(" | ")) && /metode-luar|Metode luar/.test(sapLuar.sumber), "sapaan metode luar: pengumuman cara lain");
  const sumberRingkas = JSON.parse(readFileSync(new URL("../src/data/kelas1-bab7-ringkas.json", import.meta.url), "utf8")).subBab?.B;
  const sementara = new URL("../.tmp-k1b7s/B.json", import.meta.url);
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
    cek(A.petaSusun.pusat.judul.length > 8 && /\?$/.test(A.petaSusun.pusat.judul), "peta susun: pusat berupa masalah (pertanyaan) sub-bab");
    const T = A.tabelSusun;
    cek(T.baris.length >= 3 && T.baris.length <= 5 && T.kolom.length >= 3 && T.kolom.length <= 4, "tabel susun: 3 sampai 5 baris dan 3 sampai 4 kolom");
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 26 && (s.match(/\d+/g) ?? []).length <= 1)), "tabel susun: sel <= 26 huruf dan paling banyak satu angka per sel");
    cek(T.baris.every((b) => b.label.split(/\s+/).every((w) => w.length <= 8)), "tabel susun: kata terpanjang kolom label <= 8 huruf");
    cek(!/\d/.test(T.suara) && !/\d/.test(T.petunjuk), "tabel susun: suara dan petunjuk tanpa digit");
    // Isi tabel dihitung ulang: tiap baris satu benda diukur dengan satu satuan; sel = tebakan, hasil, selisih (angka dan nama satuan sama).
    cek(T.baris.every((b) => {
      const m = b.sel.map((s) => /^(\d+) (klip|stik|kotak|sedotan|jepit)$/.exec(s));
      if (m.some((x) => !x) || new Set(m.map((x) => x[2])).size !== 1) return false;
      const [x, y, z] = m.map((q) => Number(q[1]));
      return x >= 1 && y >= 1 && x <= 20 && y <= 20 && x !== y && Math.abs(x - y) === z;
    }), "tabel susun: tebakan, hasil ukur, dan selisih benar, satu satuan tiap baris");
    sama(T.kolom, ["Tebakan", "Hasil", "Selisih"], "tabel susun: kolom tebakan, hasil, selisih");
    // Margin teks sel di lebar 405 px: sel pendek (paling banyak delapan huruf) supaya margin teks >= 5 px.
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 8)), "tabel susun: sel pendek supaya margin teks >= 5 px di 405 px");
    const KATA_LARANG = /buku|halaman|kunci|kelompok|\bteman|kawan|kelas\b|kertas|pensil|\bbawa\b|menggambar|menulis di|depan kelas|luas|keliling|di rumah|jengkal|telapak|\bdepa\b|penggaris|koin|penjepit|sentimeter|centimeter|\bmeter\b/i;
    cek(!KATA_LARANG.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: tanpa kata terlarang dan tanpa kelompok, teman, kelas, buku, kertas, pensil, benda fisik");
    cek(peta.every((s) => ![...s.teks, ...(s.ikon ?? "")].some((c) => c.codePointAt(0) > 0x1fa95)), "peta susun: emoji paling tinggi Emoji 12");
  } else cek(false, "peta dan tabel susun: .tmp-k1b7s/B.json atau kelas1-bab7-ringkas.json subBab.B.petaSusun ada");
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k1b7B-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k1b7B-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k1b7B sendiri (${impor.join(", ")})`);
  }
  // Emoji dalam data teks gambar juga paling tinggi Emoji 12 (diperiksa pada gambar yang diputar).
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${v.id}/${a.id}: emoji gambar paling tinggi Emoji 12`);
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k1b7b.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|naskah-k1b/.test(pembungkus) && /VIDEO_MATERI_K1B7B/.test(pembungkus) && /VIDEO_LUAR_K1B7B/.test(pembungkus) && /export function VideoK1B7B/.test(pembungkus) && /daftar-video-cerita/.test(pembungkus), "video-k1b7b.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k1b7b.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k1b7B.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k1b7B.mjs: akhir baris LF");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit diputar)`);
}
console.log(`Pemeriksaan: ${stat.hitung} deret hitungan, ${jumlahNama} nama bilangan tampak sebagai angka, ${stat2.grup} pengukuran (${stat2.hasil} hasil), ${stat2.suara} ukuran di suara, ${stat2.gambar} ukuran di gambar, ${stat2.salah} contoh salah, ${stat2.khusus} pemeriksaan khusus`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
