// Uji Story Kelas 1 Bab 6 Sub-Bab B (Penjumlahan yang Hasilnya Kurang dari 20): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar (nama metode hanya Indonesia),
// hanya penjumlahan dengan bilangan dan hasil sampai dua puluh (tanpa kali, bagi, pengurangan, bersusun, pinjam), hitungan satu per satu (angka berurutan, dekat bendanya, sama dengan bilangan yang diucapkan),
// nama bilangan sepuluh sampai dua puluh yang diucapkan tampak sebagai angka, setiap kalimat tambah (suara dan gambar) dihitung ulang dengan hasil paling besar dua puluh,
// donat, kelereng, balon, dan sedotan tepat di bingkai sepuluh atau ikat, garis bilangan dan lompatan katak, bagan pasangan, tabel nilai tempat, detektif salah hitung,
// aturan pemilik (belajar mandiri digital: tanpa kelompok, teman, depan kelas, buku, menulis atau menggambar di buku, membawa benda nyata),
// emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k1b6B.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k1b6B-video.ts");
const U1 = await import("../src/components/modul/story/k1b6B-luar-1.ts");
const B = await import("../src/components/modul/story/k1b6B-bantu.ts");
const G = await import("../src/components/modul/story/k1b6B-gambar.ts");

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
const VIDEO = [V.VIDEO_MATERI_K1B6B, V.VIDEO_LUAR_K1B6B];
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
const M_VIDEO = V.VIDEO_MATERI_K1B6B;
const U = V.VIDEO_LUAR_K1B6B;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /Maju dan Mundur|Pasangan sampai (20|dua puluh)|Menjadikan Sepuluh|metode luar|metode dari luar/i;
const NAMA_INGGRIS = /Counting|Number Bond|Make Ten|Place value|Ten-frame|ten frame|Count On/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of U1.NAMA_METODE_ID) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE_ID, ["Maju dan Mundur", "Pasangan sampai 20", "Menjadikan Sepuluh"], "nama Indonesia metode luar");
  cek(!NAMA_INGGRIS.test(materi) && !NAMA_INGGRIS.test(luar), "nama metode hanya bahasa Indonesia (tanpa Counting On/Back, Number Bond to 20, Make Ten)");
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
  cek(M_VIDEO.id === "k1b6B-materi" && U.id === "k1b6B-luar", "id video k1b6B-materi dan k1b6B-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,cerita-donat,gabung-donat,hitung-maju,garis-maju,maju-lagi,sepuluh-dulu,sepuluh-lagi,kembar,pasangan-bilangan,sedotan-upe,nilai-tempat,pilih-cara,soal-cerita,detektif,latihan-satu,latihan-dua,latihan-tiga,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-maju,luar-maju-terapan,luar-pasangan,luar-pasangan-terapan,luar-sepuluh,luar-sepuluh-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 3 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 3 lalu penutup");
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-maju", "luar-maju-terapan", "luar-pasangan", "luar-pasangan-terapan", "luar-sepuluh", "luar-sepuluh-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  for (const kata of ["Latihan", "Igil", "Malosi", "Halim", "Kira", "Wei", "Upe", "donat", "kelereng", "sepuluh", "belas", "dua puluh", "garis bilangan", "detektif", "kotak sepuluh", "menghitung maju", "nilai tempat", "puluhan", "satuan", "jumlah", "penjumlahan berulang", "pasangan bilangan"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Hanya penjumlahan sampai dua puluh: tanpa kali, bagi, pengurangan, bersusun, pinjam, bilangan lebih dari dua puluh, ukuran, atau rumus.
  const BOCOR = /dikali|perkalian|pembagian|dibagi|\bratus\b|\bribu\b|dua puluh (satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan)|(tiga|empat|lima|enam|tujuh|delapan|sembilan) puluh\b|\bluas\b|keliling|rumus|volume|sentimeter|\bcm\b|dikurangi|\bdikurang|pengurangan|mengurang|kurangkan|selisih|bersusun|pinjam|meminjam|menyimpan|disimpan|×|÷|−/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: hanya penjumlahan sampai dua puluh (tanpa kali, bagi, pengurangan, bersusun, pinjam, bilangan lebih dari dua puluh, rumus)`);
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
const NAMA_METODE_SUARA = /maju dan mundur|pasangan sampai dua puluh|menjadikan sepuluh/gi;
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
const dekat = (a, b, r = 0.6) => Math.hypot(a.x - b.x, a.y - b.y) <= r;
const daftarId = (objs, pola) => objs.filter((o) => pola.test(o.id));
const di = (id, ke) => {
  const a = adegan(M_VIDEO, id) ?? adegan(U, id);
  return akhirAdegan(a, ke);
};
const diKata = (id, ke, kata) => {
  const a = adegan(M_VIDEO, id) ?? adegan(U, id);
  return L.keadaanStory(a, ke, kata);
};
const pusatSel = (i, x, y, sel = 26) => ({ x: x + (i % 5) * sel + sel / 2, y: y + Math.floor(i / 5) * sel + sel / 2 });
const pusatDua = (i, y) => (i < 10 ? pusatSel(i, 14, y) : pusatSel(i - 10, 156, y));
const dalamKotak = (b, x, y, w, h) => b.x > x && b.x < x + w && b.y > y && b.y < y + h;
const stat = { hitung: 0, aritmetika: 0, benda: 0 };
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

  // 2) Setiap kalimat tambah (suara dan gambar) dihitung ulang; hasil paling besar dua puluh. Tanda tanya hanya pada tebakan salah di adegan detektif.
  const N = NAMA.slice(1).sort((m, n) => n.length - m.length).join("|");
  const nilaiNama = (s) => NAMA.indexOf(s.toLowerCase());
  const reTambah = new RegExp(`\\b((?:${N})(?: ditambah (?:${N}))+) (?:menjadi|sama dengan) (${N})\\b`, "gi");
  const reBelas = new RegExp(`\\b(${N}) (?:itu|artinya|sama dengan) sepuluh dan (${N})\\b`, "gi");
  const jumlahSuku = (s) => [...s.matchAll(new RegExp(`\\b(${N})\\b`, "gi"))].reduce((t, m) => t + nilaiNama(m[1]), 0);
  const nilaiLambang = (s) => s.split(" + ").reduce((t, x) => t + Number(x), 0);
  let tebakanSalah = 0;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((kt, i) => {
        for (const m of kt.suara.matchAll(reTambah)) {
          stat.aritmetika += 1;
          cek(jumlahSuku(m[1]) === nilaiNama(m[2]) && nilaiNama(m[2]) <= 20, `${v.id}/${a.id}#${i + 1} suara: "${m[0]}" benar dan paling besar dua puluh`);
        }
        for (const m of kt.suara.matchAll(reBelas)) {
          stat.aritmetika += 1;
          cek(10 + nilaiNama(m[2]) === nilaiNama(m[1]), `${v.id}/${a.id}#${i + 1} suara: "${m[0]}" benar`);
        }
        for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) {
          for (const t of L.teksTerlihat(L.keadaanStory(a, i, p))) {
            const j = /^(\d+(?: \+ \d+)+) = (\d+)$/.exec(t);
            if (j) {
              stat.aritmetika += 1;
              cek(nilaiLambang(j[1]) === Number(j[2]) && Number(j[2]) <= 20, `${v.id}/${a.id}#${i + 1} gambar: "${t}" benar dan paling besar dua puluh`);
            }
            const u = /^(\d+) = (\d+(?: \+ \d+)+)$/.exec(t);
            if (u) {
              stat.aritmetika += 1;
              cek(nilaiLambang(u[2]) === Number(u[1]) && Number(u[1]) <= 20, `${v.id}/${a.id}#${i + 1} gambar: "${t}" benar dan paling besar dua puluh`);
            }
            const s = /^(\d+(?: \+ \d+)+) = (\d+)\?$/.exec(t);
            if (s) {
              tebakanSalah += 1;
              cek(a.id === "detektif" && nilaiLambang(s[1]) !== Number(s[2]), `${v.id}/${a.id}#${i + 1} gambar: hanya adegan detektif boleh memuat jawaban salah bertanda tanya ("${t}")`);
            }
          }
        }
      });
    }
  }
  cek(tebakanSalah >= 2, "detektif: jawaban salah tampil sebelum dikoreksi");

  /* ---- Pembantu letak ---- */
  const bil = (objs, id) => Number(isiTeks(objs, id));
  const pusat = (objs, id) => pusatObj(ketemu(objs, id));
  void pusat;
  const sel = (i, x, y) => pusatSel(i, x, y);
  const dalamBingkai = (b, x, y) => dalamKotak(b, x, y, 130, 52);

  // Setiap donat: lubangnya tepat di tengah donat; tali balon tepat di bawah balonnya (di semua adegan, semua ketukan).
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((_, i) => {
        const o = akhirAdegan(a, i);
        for (const b of o.filter((x) => x.t === "bulat" && ketemu(o, `${x.id}-x`)?.t === "bulat")) cek(dekat(ketemu(o, `${b.id}-x`), b, 0.01), `${v.id}/${a.id}#${i + 1}: lubang donat ${b.id} di tengah donat`);
        for (const b of o.filter((x) => x.t === "bulat" && ketemu(o, `${x.id}-x`)?.t === "garis")) cek(ketemu(o, `${b.id}-x`).x === b.x && ketemu(o, `${b.id}-x`).y > b.y, `${v.id}/${a.id}#${i + 1}: tali balon ${b.id} di bawah balonnya`);
      });
    }
  }
  stat.benda += 1;

  // 3) Cerita dan gabung: tujuh dan enam donat, tiga belas semuanya.
  {
    const c = akhirAdegan(adegan(M_VIDEO, "cerita-donat"), 1);
    cek(daftarId(c, /^k\d$/).length === 7 && daftarId(c, /^k\d$/).every((d, i) => dekat(d, { x: 28 + i * 38, y: 122 })) && isiTeks(c, "vk") === "7", "cerita: tujuh donat Kira tepat di baris");
    cek(daftarId(c, /^w\d$/).length === 6 && daftarId(c, /^w\d$/).every((d, i) => dekat(d, { x: 28 + i * 38, y: 164 })) && isiTeks(c, "vw") === "6", "cerita: enam donat Wei tepat di baris");
    const g = akhirAdegan(adegan(M_VIDEO, "gabung-donat"), 0);
    const P13 = Array.from({ length: 13 }, (_, i) => (i < 7 ? { x: 28 + i * 38, y: 70 } : { x: 28 + (i - 7) * 38, y: 120 }));
    cek(daftarId(g, /^g\d+$/).length === 13 && daftarId(g, /^g\d+$/).every((d, i) => dekat(d, P13[i])), "gabung: tiga belas donat tepat di tempatnya (tujuh dan enam)");
    sama(isiTeks(akhirAdegan(adegan(M_VIDEO, "gabung-donat"), 2), "gj-t0"), "7 + 6 = 13", "gabung: kalimat bilangan");
    sama(labelAngka(akhirAdegan(adegan(M_VIDEO, "gabung-donat"), 1), "g").map((lb) => lb.isi), Array.from({ length: 13 }, (_, i) => String(i + 1)), "gabung: dihitung dari satu sampai tiga belas");
    stat.benda += 5;
  }

  // 4) Menghitung maju: mulai dari tujuh, enam donat Wei diketuk, bilangan berikutnya delapan sampai tiga belas.
  {
    const a = adegan(M_VIDEO, "hitung-maju");
    const o0 = akhirAdegan(a, 0);
    cek(daftarId(o0, /^k\d$/).length === 7 && daftarId(o0, /^k\d$/).every((d, i) => dekat(d, { x: 28 + i * 38, y: 62 })) && isiTeks(o0, "vk") === "7", "maju: tujuh donat Kira, bilangan awal tujuh");
    const o2 = akhirAdegan(a, 2);
    cek(daftarId(o2, /^w\d$/).length === 6 && daftarId(o2, /^w\d$/).every((d, i) => dekat(d, { x: 28 + i * 38, y: 122 })), "maju: enam donat Wei di baris");
    const lb = labelAngka(o2, "w");
    sama(lb.map((x) => x.isi), ["8", "9", "10", "11", "12", "13"], "maju: dihitung maju delapan sampai tiga belas");
    cek(Number(lb[lb.length - 1].isi) === daftarId(o2, /^k\d$/).length + daftarId(o2, /^w\d$/).length, "maju: bilangan terakhir sama dengan tujuh ditambah enam");
    sama(isiTeks(akhirAdegan(a, 3), "hj-t0"), "7 + 6 = 13", "maju: kalimat bilangan");
    stat.benda += 4;
  }

  // 5) Garis bilangan dan katak: letak bilangan, lompatan satu langkah, dan posisi katak sesuai lompatan.
  {
    const periksaGaris = (a, dari, sampai, mulai, keGaris, keKatak, keLompat) => {
      const X = (n) => 30 + ((n - dari) * 240) / (sampai - dari);
      const o0 = akhirAdegan(a, keGaris);
      for (let n = dari; n <= sampai; n += 1) cek(isiTeks(o0, `gb-n${n}`) === String(n) && ketemu(o0, `gb-n${n}`).x === X(n) && ketemu(o0, `gb-t${n}`).x === X(n), `${a.id}: ${n} tepat di tempatnya pada garis bilangan`);
      cek(ketemu(akhirAdegan(a, keKatak), "kt").x === X(mulai), `${a.id}: katak mulai dari ${mulai}`);
      for (const ke of keLompat) {
        for (let p = 0; p < L.kataDari(a.ketukan[ke].suara).length; p += 1) {
          const o = L.keadaanStory(a, ke, p);
          const lompatan = daftarId(o, /^lp\d+$/);
          cek(ketemu(o, "kt").x === X(mulai + lompatan.length), `${a.id} #${ke + 1} kata ${p}: posisi katak sesuai ${lompatan.length} lompatan`);
          for (const l of lompatan) {
            const n = Number(l.id.slice(2));
            const lebar = X(n) - X(n - 1);
            cek(l.x === X(n - 1) && l.d === `M0 0 Q${lebar / 2} -22 ${lebar} 0` && n >= mulai + 1, `${a.id}: lompatan ke ${n} satu langkah ke kanan`);
          }
        }
      }
      const akhir = akhirAdegan(a);
      sama([daftarId(akhir, /^lp\d+$/).length, ketemu(akhir, "kt").x], [sampai - mulai, X(sampai)], `${a.id}: katak mendarat di ${sampai} setelah ${sampai - mulai} lompatan`);
      stat.benda += 4;
    };
    periksaGaris(adegan(M_VIDEO, "garis-maju"), 7, 13, 7, 0, 1, [2, 3]);
    periksaGaris(adegan(U, "luar-maju"), 10, 15, 10, 1, 1, [2]);
    periksaGaris(adegan(U, "luar-maju-terapan"), 12, 17, 12, 0, 0, [1]);
    sama(isiTeks(akhirAdegan(adegan(M_VIDEO, "garis-maju"), 4), "gj-t0"), "7 + 6 = 13", "garis maju: kalimat bilangan");
    sama(isiTeks(akhirAdegan(adegan(U, "luar-maju"), 3), "mk-t0"), "10 + 5 = 15", "luar maju: kalimat bilangan");
    sama([...["c1-t", "c2-t", "c3-t"].map((i) => isiTeks(akhirAdegan(adegan(U, "luar-maju-terapan"), 2), i)), ketemu(akhirAdegan(adegan(U, "luar-maju-terapan"), 2), "c2-k").sorot], ["16", "17", "18", undefined], "luar maju terapan: pilihan enam belas, tujuh belas, delapan belas");
    sama(isiTeks(akhirAdegan(adegan(U, "luar-maju-terapan"), 3), "bj-t0"), "12 + 5 = 17", "luar maju terapan: kalimat bilangan");
  }

  // 6) Maju lagi: sembilan dan lima, dihitung maju sepuluh sampai empat belas; boleh ditukar.
  {
    const a = adegan(M_VIDEO, "maju-lagi");
    const o = akhirAdegan(a, 2);
    cek(daftarId(o, /^h\d$/).length === 9 && daftarId(o, /^m\d$/).length === 5, "maju lagi: sembilan dan lima kelereng");
    sama(labelAngka(o, "m").map((x) => x.isi), ["10", "11", "12", "13", "14"], "maju lagi: sepuluh sampai empat belas");
    sama([isiTeks(akhirAdegan(a, 3), "hj-t0"), isiTeks(akhirAdegan(a, 4), "tk-t0")], ["9 + 5 = 14", "5 + 9 = 14"], "maju lagi: kalimat bilangan dan penukarannya");
    stat.benda += 3;
  }

  // 7) Bingkai sepuluh: donat, kelereng, dan balon tepat di petak; sepuluh di bingkai, sisanya di luar.
  {
    const KX = 85;
    const KY = 34;
    const hitungIsi = (objs, pola, x, y) => ({ di: daftarId(objs, pola).filter((b) => dalamBingkai(b, x, y)).length, luar: daftarId(objs, pola).filter((b) => !dalamBingkai(b, x, y)).length });
    // Genapkan sepuluh: donat Kira tujuh, donat Wei enam; tiga masuk, tiga di luar.
    const a = adegan(M_VIDEO, "sepuluh-dulu");
    const a0 = akhirAdegan(a, 0);
    cek(daftarId(a0, /^kb-c\d$/).length === 10 && daftarId(a0, /^k\d$/).length === 7 && daftarId(a0, /^k\d$/).every((d, i) => dekat(d, sel(i, KX, KY))), "sepuluh dulu: tujuh donat tepat di petak kotak sepuluh");
    const a2 = akhirAdegan(a, 2);
    for (let i = 0; i < 3; i += 1) cek(dekat(ketemu(a2, `w${i}`), sel(7 + i, KX, KY)) && dekat(ketemu(a2, `w${i}-x`), sel(7 + i, KX, KY)), `sepuluh dulu: donat Wei ${i + 1} tepat di petak ${8 + i}`);
    cek(hitungIsi(a2, /^[kw]\d$/, KX, KY).di === 10 && hitungIsi(a2, /^w\d$/, KX, KY).luar === 3, "sepuluh dulu: sepuluh donat di kotak, tiga donat Wei di luar");
    cek(daftarId(akhirAdegan(a, 3), /^kb-c\d$/).every((c) => c.warna === "#FEF08A"), "sepuluh dulu: kotak penuh berwarna kuning");
    sama([isiTeks(akhirAdegan(a, 3), "kj-t0"), isiTeks(akhirAdegan(a, 4), "ke-t0"), isiTeks(akhirAdegan(a, 5), "kf-t0"), isiTeks(akhirAdegan(a, 5), "kg-t0")], ["7 + 3 = 10", "6 = 3 + 3", "10 + 3 = 13", "7 + 6 = 13"], "sepuluh dulu: kalimat bilangan");
    // Genapkan sepuluh lagi: sembilan kelereng di kotak, satu dari enam masuk, lima di luar.
    const b = adegan(M_VIDEO, "sepuluh-lagi");
    const b0 = akhirAdegan(b, 0);
    cek(daftarId(b0, /^t\d$/).length === 9 && daftarId(b0, /^t\d$/).every((d, i) => dekat(d, sel(i, KX, KY))) && daftarId(b0, /^m\d$/).length === 6, "sepuluh lagi: sembilan kelereng di petak, enam kelereng di luar");
    const b1 = akhirAdegan(b, 1);
    cek(dekat(ketemu(b1, "m0"), sel(9, KX, KY)) && hitungIsi(b1, /^[tm]\d$/, KX, KY).di === 10 && hitungIsi(b1, /^m\d$/, KX, KY).luar === 5, "sepuluh lagi: satu kelereng Malosi masuk, sepuluh di kotak, lima di luar");
    sama([isiTeks(akhirAdegan(b, 2), "tj-t0"), isiTeks(akhirAdegan(b, 3), "te-t0"), isiTeks(akhirAdegan(b, 4), "tf-t0"), isiTeks(akhirAdegan(b, 4), "tg2-t0")], ["9 + 1 = 10", "6 = 1 + 5", "10 + 5 = 15", "9 + 6 = 15"], "sepuluh lagi: kalimat bilangan");
    // Latihan 2: sembilan balon di kotak, satu masuk, tiga di luar.
    const c = adegan(M_VIDEO, "latihan-dua");
    const c0 = akhirAdegan(c, 0);
    cek(daftarId(c0, /^o\d$/).length === 9 && daftarId(c0, /^o\d$/).every((d, i) => dekat(d, sel(i, KX, KY))) && daftarId(c0, /^p\d$/).length === 4, "latihan 2: sembilan balon di petak, empat di luar");
    const c1 = akhirAdegan(c, 1);
    cek(dekat(ketemu(c1, "p0"), sel(9, KX, KY)) && hitungIsi(c1, /^[op]\d$/, KX, KY).di === 10 && hitungIsi(c1, /^p\d$/, KX, KY).luar === 3, "latihan 2: satu balon masuk, sepuluh di kotak, tiga di luar");
    sama([isiTeks(akhirAdegan(c, 1), "lj-t0"), isiTeks(akhirAdegan(c, 2), "ls-t0"), isiTeks(akhirAdegan(c, 3), "lz-t0")], ["9 + 1 = 10", "10 + 3 = 13", "9 + 4 = 13"], "latihan 2: kalimat bilangan");
    // Metode luar: Menjadikan Sepuluh.
    const SY = 56;
    const d = adegan(U, "luar-sepuluh");
    const d1 = akhirAdegan(d, 1);
    cek(daftarId(d1, /^sf-c\d$/).length === 10 && daftarId(d1, /^d\d$/).length === 9 && daftarId(d1, /^d\d$/).every((x, i) => dekat(x, sel(i, KX, SY))) && daftarId(d1, /^q\d$/).length === 4, "luar sepuluh: sembilan donat di petak, empat di luar");
    const d2 = akhirAdegan(d, 2);
    cek(dekat(ketemu(d2, "q0"), sel(9, KX, SY)) && hitungIsi(d2, /^[dq]\d$/, KX, SY).di === 10 && hitungIsi(d2, /^q\d$/, KX, SY).luar === 3, "luar sepuluh: satu donat masuk, sepuluh di kotak, tiga di luar");
    sama([isiTeks(akhirAdegan(d, 2), "ke-t0"), isiTeks(akhirAdegan(d, 3), "kf-t0"), isiTeks(akhirAdegan(d, 4), "kg-t0")], ["9 + 1 = 10", "10 + 3 = 13", "9 + 4 = 13"], "luar sepuluh: kalimat bilangan");
    const e = adegan(U, "luar-sepuluh-terapan");
    const e0 = akhirAdegan(e, 0);
    cek(daftarId(e0, /^o\d$/).length === 8 && daftarId(e0, /^o\d$/).every((x, i) => dekat(x, sel(i, KX, SY))) && daftarId(e0, /^p\d$/).length === 7, "luar sepuluh terapan: delapan balon di petak, tujuh di luar");
    const e1 = akhirAdegan(e, 1);
    cek(dekat(ketemu(e1, "p0"), sel(8, KX, SY)) && dekat(ketemu(e1, "p1"), sel(9, KX, SY)) && hitungIsi(e1, /^[op]\d$/, KX, SY).di === 10 && hitungIsi(e1, /^p\d$/, KX, SY).luar === 5, "luar sepuluh terapan: dua balon masuk, sepuluh di kotak, lima di luar");
    sama([isiTeks(akhirAdegan(e, 2), "fj-t0"), isiTeks(akhirAdegan(e, 3), "fz-t0")], ["10 + 5 = 15", "8 + 7 = 15"], "luar sepuluh terapan: kalimat bilangan");
    stat.benda += 28;
  }

  // 8) Penjumlahan berulang: enam ditambah enam, dipisah satu.
  {
    const a = adegan(M_VIDEO, "kembar");
    const o0 = akhirAdegan(a, 0);
    cek(daftarId(o0, /^k\d$/).length === 7 && daftarId(o0, /^w\d$/).length === 6, "kembar: tujuh dan enam donat");
    const o1 = akhirAdegan(a, 1);
    cek(dekat(ketemu(o1, "k6"), { x: 262, y: 160 }) && daftarId(o1, /^k[0-5]$/).every((d) => d.y === 70) && daftarId(o1, /^w\d$/).every((d) => d.y === 116), "kembar: satu donat dipisah, tersisa dua baris enam donat");
    const o4 = akhirAdegan(a, 4);
    cek(dekat(ketemu(o4, "k6"), { x: 256, y: 116 }) && daftarId(o4, /^[kw]\d$/).length === 13, "kembar: donat dipisah masuk lagi, ada tiga belas donat");
    sama([isiTeks(akhirAdegan(a, 1), "kp-t0"), isiTeks(akhirAdegan(a, 3), "kd-t0"), isiTeks(akhirAdegan(a, 4), "kh-t0"), isiTeks(akhirAdegan(a, 5), "kj-t0")], ["7 = 6 + 1", "6 + 6 = 12", "12 + 1 = 13", "7 + 6 = 13"], "kembar: kalimat bilangan");
    stat.benda += 4;
  }

  // 9) Bagan pasangan: bilangan di atas sama dengan jumlah dua bagiannya.
  {
    const a = adegan(M_VIDEO, "pasangan-bilangan");
    const o = akhirAdegan(a, 1);
    cek(bil(o, "pa-t") === bil(o, "pb-t") + bil(o, "pc-t") && bil(o, "pa-t") === 12, "pasangan: dua belas sama dengan sepuluh dan dua");
    sama([isiTeks(akhirAdegan(a, 1), "ka-t0"), isiTeks(akhirAdegan(a, 2), "kb-t0"), isiTeks(akhirAdegan(a, 3), "kc-t0"), isiTeks(akhirAdegan(a, 4), "kz-t0")], ["12 = 10 + 2", "2 + 3 = 5", "10 + 5 = 15", "12 + 3 = 15"], "pasangan: kalimat bilangan");
    const p = adegan(U, "luar-pasangan");
    const p1 = akhirAdegan(p, 1);
    cek(bil(p1, "pb-t") + bil(p1, "pc-t") === bil(p1, "pa-t") && bil(p1, "pa-t") === 20, "luar pasangan: delapan dan dua belas menjadi dua puluh");
    const p3 = akhirAdegan(p, 3);
    cek(["q1-t0", "q2-t0", "q3-t0"].every((i) => /= 20$/.test(isiTeks(p3, i))), "luar pasangan: semua pasangan menjadi dua puluh");
    const t = adegan(U, "luar-pasangan-terapan");
    const t0 = akhirAdegan(t, 0);
    sama([isiTeks(t0, "pa-t"), isiTeks(t0, "pb-t"), isiTeks(t0, "pc-t")], ["20", "14", "?"], "luar pasangan terapan: dua puluh, empat belas, dan yang dicari");
    const t2 = akhirAdegan(t, 2);
    cek(bil(t2, "pb-t") + bil(t2, "pc-t") === bil(t2, "pa-t") && labelAngka(t2, "pt").length === 6 && Number(labelAngka(t2, "pt")[5].isi) === 20 && Number(labelAngka(t2, "pt")[0].isi) === bil(t2, "pb-t") + 1, "luar pasangan terapan: enam langkah dari empat belas mendarat di dua puluh");
    sama(isiTeks(akhirAdegan(t, 3), "pj-t0"), "14 + 6 = 20", "luar pasangan terapan: kalimat bilangan");
    stat.benda += 7;
  }

  // 10) Sedotan Upe dan Malosi: sepuluh dalam ikat, dua lepas ditambah tiga lepas.
  {
    const a = adegan(M_VIDEO, "sedotan-upe");
    const pusatSed = (b) => ({ x: b.x + (b.w ?? 0) / 2, y: b.y + (b.h ?? 0) / 2 });
    const dalamIkat = (b, ik) => dalamKotak(pusatSed(b), ik.x, ik.y, ik.w, ik.h);
    const o0 = akhirAdegan(a, 0);
    const ik = ketemu(o0, "ik");
    const sd0 = daftarId(o0, /^u\d+$/);
    cek(sd0.length === 12 && sd0.filter((b) => dalamIkat(b, ik)).length === 10 && sd0.filter((b) => dalamIkat(b, ik)).every((b) => Number(b.id.slice(1)) < 10), "sedotan: dua belas sedotan Upe, sepuluh di dalam ikat, dua lepas");
    cek(isiTeks(o0, "tu") === "Upe: 12", "sedotan: Upe punya dua belas");
    const o1 = akhirAdegan(a, 1);
    cek(daftarId(o1, /^m\d$/).length === 3 && daftarId(o1, /^m\d$/).every((b) => !dalamIkat(b, ik)) && isiTeks(o1, "tm") === "Malosi: 3", "sedotan: tiga sedotan Malosi di luar ikat");
    const o2 = akhirAdegan(a, 2);
    const semuaSd = [...daftarId(o2, /^u\d+$/), ...daftarId(o2, /^m\d$/)];
    const lepas = semuaSd.filter((b) => !dalamIkat(b, ik));
    cek(semuaSd.length === 15 && lepas.length === 5 && lepas.every((b) => Number(b.id.slice(1)) >= 10 || b.id.startsWith("m")), "sedotan: lima belas sedotan, sepuluh terikat, lima lepas (dua ditambah tiga)");
    const koordinat = [{ x: 232, y: 56 }, { x: 260, y: 56 }, { x: 176, y: 96 }];
    cek([0, 1, 2].every((i) => dekat(pusatSed(ketemu(o2, `m${i}`)), koordinat[i]) && dekat(ketemu(o2, `m${i}-x`), ketemu(o2, `m${i}`))), "sedotan: sedotan Malosi digeser ke sedotan lepas Upe (tutup ikut)");
    sama([isiTeks(akhirAdegan(a, 2), "ka-t0"), isiTeks(akhirAdegan(a, 3), "kb-t0"), isiTeks(akhirAdegan(a, 4), "kc-t0")], ["2 + 3 = 5", "10 + 5 = 15", "12 + 3 = 15"], "sedotan: kalimat bilangan");
    stat.benda += 6;
  }

  // 11) Tabel nilai tempat: tiga belas ditambah empat, satuan dengan satuan, puluhan tetap.
  {
    const a = adegan(M_VIDEO, "nilai-tempat");
    const o = akhirAdegan(a, 4);
    const t = (id) => isiTeks(o, id);
    cek(daftarId(o, /^nt-c\d\d$/).length === 6 && isiTeks(o, "hp") === "Puluhan" && isiTeks(o, "hs") === "Satuan", "nilai tempat: tabel puluhan dan satuan enam kotak");
    sama([t("nt-d00"), t("nt-d01"), t("nt-d10"), t("nt-d11"), t("nt-d20"), t("nt-d21")], ["1", "3", undefined, "4", "1", "7"], "nilai tempat: isi tabel tiga belas, empat, dan tujuh belas");
    cek(10 * Number(t("nt-d00")) + Number(t("nt-d01")) + Number(t("nt-d11")) === 10 * Number(t("nt-d20")) + Number(t("nt-d21")) && 10 * Number(t("nt-d20")) + Number(t("nt-d21")) === 17, "nilai tempat: 13 + 4 = 17 dari kotak puluhan dan satuan");
    cek(Number(t("nt-d01")) + Number(t("nt-d11")) === Number(t("nt-d21")) && t("nt-d20") === t("nt-d00"), "nilai tempat: satuan dijumlahkan, puluhan tetap");
    sama([isiTeks(akhirAdegan(a, 3), "ks-t0"), isiTeks(o, "kt-t0")], ["3 + 4 = 7", "13 + 4 = 17"], "nilai tempat: kalimat bilangan");
    stat.benda += 4;
  }

  // 12) Memilih cara, soal cerita, dan detektif.
  {
    const a = adegan(M_VIDEO, "pilih-cara");
    const o = akhirAdegan(a, 4);
    sama(["c1-t1", "c2-t1", "c3-t1", "c4-t1"].map((i) => isiTeks(o, i)), ["9 + 2 = 11", "9 + 6 = 15", "7 + 8 = 15", "12 + 5 = 17"], "pilih cara: empat contoh dengan cara yang cocok");
    sama(["c1-t0", "c2-t0", "c3-t0", "c4-t0"].map((i) => isiTeks(o, i)), ["hitung maju", "genapkan 10", "hampir kembar", "nilai tempat"], "pilih cara: nama cara sesuai bilangan");
    const q = adegan(M_VIDEO, "soal-cerita");
    const q1 = akhirAdegan(q, 1);
    cek(daftarId(q1, /^ay\d+$/).length === 15, "soal cerita: dua belas anak ayam dan tiga datang lagi, lima belas");
    sama(isiTeks(akhirAdegan(q, 2), "qj-t0"), "12 + 3 = 15", "soal cerita: kalimat bilangan");
    const deretMaju = (isiTeks(akhirAdegan(q, 3), "qm-t0").match(/\d+/g) ?? []).map(Number);
    sama(deretMaju, [12, 13, 14, 15], "soal cerita: maju dari dua belas sampai lima belas");
    const dd = adegan(M_VIDEO, "detektif");
    sama([isiTeks(akhirAdegan(dd, 0), "dc-t0"), isiTeks(akhirAdegan(dd, 1), "d1-t1"), isiTeks(akhirAdegan(dd, 2), "d2-t1"), isiTeks(akhirAdegan(dd, 3), "d3-t1"), isiTeks(akhirAdegan(dd, 4), "dc-t0")], ["12 + 3 = 16?", "12 = 10 + 2", "2 + 3 = 5", "10 + 5 = 15", "12 + 3 = 15"], "detektif: dua langkah benar, langkah ketiga dikoreksi");
    sama(isiTeks(L.keadaanStory(dd, 3, 3), "d3-t1"), "10 + 5 = 16?", "detektif: langkah ketiga semula salah");
    stat.benda += 6;
  }

  // 13) Latihan 1 sampai 3.
  {
    const a = adegan(M_VIDEO, "latihan-satu");
    const o1 = akhirAdegan(a, 1);
    cek(daftarId(o1, /^a\d$/).length === 8 && daftarId(o1, /^b\d$/).length === 4, "latihan 1: delapan dan empat donat");
    sama(labelAngka(o1, "b").map((x) => x.isi), ["9", "10", "11", "12"], "latihan 1: hitung maju sembilan sampai dua belas");
    const o3 = akhirAdegan(a, 3);
    sama([["c1-t", "c2-t", "c3-t"].map((i) => isiTeks(o3, i)), ketemu(o3, "c2-k").sorot, isiTeks(o3, "lq-t0")], [["11", "12", "13"], true, "8 + 4 = 12"], "latihan 1: dua belas dipilih dari tiga jawaban");
    const l3 = adegan(M_VIDEO, "latihan-tiga");
    const p3 = akhirAdegan(l3, 3);
    sama([["c1-t", "c2-t", "c3-t"].map((i) => isiTeks(p3, i)), ketemu(p3, "c2-k").sorot, isiTeks(p3, "lq-t0"), isiTeks(p3, "ln-t0")], [["17", "19", "20"], true, "14 + 5 = 19", "4 + 5 = 9"], "latihan 3: sembilan belas dipilih dari tiga jawaban");
    stat.benda += 5;
  }

  // 14) Ringkasan metode luar memuat tiga metode berurutan.
  {
    const r = akhirAdegan(adegan(U, "luar-ringkas"));
    cek(["r1-t0", "r2-t0", "r3-t0"].map((i) => isiTeks(r, i)).join("|") === "1. Maju dan Mundur|2. Pasangan sampai 20|3. Menjadikan Sepuluh", "luar ringkas: tiga metode berurutan");
    stat.benda += 1;
  }


  // Aturan pemilik: aplikasi belajar mandiri; tanpa instruksi kelompok, teman, kelas, atau buku.
  {
    const MANDIRI = /kelompok|\bteman\w*|\bkawan\w*|sekawan|depan kelas|bersama kelas|seluruh kelas|\bkelas\b|berpasangan|bermain bersama|bertanya kepada|buat ceritamu|buku|menulis di|menuliskan di|tulis di|tuliskan di|menggambar|gambarlah|gambar sendiri|\bbawa(lah)?\b|membawa|dibawa|\bkertas\b|\bpensil\b|\bpulpen\b|\bspidol\b|ambil (benda|pensil|kelereng|bola|sedotan|balon)|tangan (kiri|kanan)|\bjari\b|menyuruh|suruh|\braba\w*|\bmeraba|\btubuh|\blengan|lingkari|coret|guru kelas|di rumah|orang tua|\bayah\b|\bibu guru|bapak guru/i;
    for (const v of VIDEO) {
      for (const a of v.adegan) {
        const semua = [a.judul, a.sumber];
        a.ketukan.forEach((kt, i) => {
          semua.push(kt.suara);
          semua.push(...L.teksTerlihat(L.keadaanStory(a, i, 9999)));
        });
        const kena = semua.filter((t) => MANDIRI.test(t));
        cek(kena.length === 0, `${v.id}/${a.id}: narasi mandiri dan digital, tanpa kelompok, teman, kelas, buku, kertas, atau pensil (${kena.slice(0, 2).join(" | ")})`);
      }
    }
  }
}

/* ------------------------------ Sapaan dan peta susun ------------------------------ */
{
  const sap = adegan(M_VIDEO, "sapaan");
  const DAFTAR = ["Menghitung maju", "Memisah dan menggabung", "Menambah puluhan dan satuan"];
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Menghitung maju/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => DAFTAR.includes(t)), DAFTAR, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara) && !/\d/.test(DAFTAR.join(" ")), "sapaan materi: tanpa angka");
  const sapLuar = adegan(U, "sapaan");
  cek(/cara lain/i.test(L.teksTerlihat(akhirAdegan(sapLuar, 1)).join(" | ")) && /metode-luar|Metode luar/.test(sapLuar.sumber), "sapaan metode luar: pengumuman cara lain");
  let sumberRingkas = null;
  try {
    sumberRingkas = JSON.parse(readFileSync(new URL("../src/data/kelas1-bab6-ringkas.json", import.meta.url), "utf8")).subBab?.B ?? null;
  } catch {
    sumberRingkas = null;
  }
  const sementara = new URL("../.tmp-k1b6s/B.json", import.meta.url);
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
    // Isi tabel dihitung ulang: label berbentuk "a + b"; sel berisi a, b, dan jumlahnya (paling besar dua puluh).
    cek(T.baris.every((b) => {
      const m = /^(\d+) \+ (\d+)$/.exec(b.label);
      return m && b.sel[0] === m[1] && b.sel[1] === m[2] && b.sel[2] === String(Number(m[1]) + Number(m[2])) && Number(b.sel[2]) <= 20;
    }), "tabel susun: mulai, maju, dan jumlah sesuai soal pada label (jumlah paling besar dua puluh)");
    // Margin teks sel di lebar 405 px: sel pendek (paling banyak delapan huruf) supaya margin teks >= 5 px.
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 8)), "tabel susun: sel pendek supaya margin teks >= 5 px di 405 px");
    const KATA_LARANG = /buku|halaman|kunci|kelompok|\bteman|kawan|kelas\b|kertas|pensil|\bbawa\b|menggambar|menulis di|depan kelas|dikurangi|pengurangan|luas|keliling|di rumah/i;
    cek(!KATA_LARANG.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: tanpa kata terlarang dan tanpa kelompok, teman, kelas, buku, kertas, pensil");
    cek(peta.every((s) => ![...s.teks, ...(s.ikon ?? "")].some((c) => c.codePointAt(0) > 0x1fa95)), "peta susun: emoji paling tinggi Emoji 12");
  } else cek(false, "peta dan tabel susun: .tmp-k1b6s/B.json atau kelas1-bab6-ringkas.json subBab.B.petaSusun ada");
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k1b6B-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k1b6B-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k1b6B sendiri (${impor.join(", ")})`);
  }
  // Emoji dalam data teks gambar juga paling tinggi Emoji 12 (diperiksa pada gambar yang diputar).
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${v.id}/${a.id}: emoji gambar paling tinggi Emoji 12`);
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k1b6b.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|naskah-k1b/.test(pembungkus) && /VIDEO_MATERI_K1B6B/.test(pembungkus) && /VIDEO_LUAR_K1B6B/.test(pembungkus) && /export function VideoK1B6B/.test(pembungkus) && /daftar-video-cerita/.test(pembungkus), "video-k1b6b.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k1b6b.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k1b6B.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k1b6B.mjs: akhir baris LF");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit diputar)`);
}
console.log(`Pemeriksaan: ${stat.hitung} deret hitungan, ${jumlahNama} nama bilangan tampak sebagai angka, ${stat.aritmetika} kalimat bilangan, ${stat.benda} pemeriksaan benda dan bingkai`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
