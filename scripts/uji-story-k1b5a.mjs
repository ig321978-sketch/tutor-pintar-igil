// Uji Story Kelas 1 Bab 5 Sub-Bab A (Menghitung, Membaca, dan Menulis Bilangan sampai 20): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar (nama metode hanya Indonesia),
// hanya bilangan sampai dua puluh (tanpa kali, bagi, kurang, bilangan lebih besar), hitungan satu per satu (angka berurutan, dekat bendanya, sama dengan bilangan yang diucapkan),
// nama bilangan sepuluh sampai dua puluh yang diucapkan tampak sebagai angka, kalimat bilangan (suara dan gambar) dihitung ulang, kelereng dan titik tepat di petak bingkai sepuluh,
// garis bilangan, tulisan angka, aturan pemilik (belajar mandiri digital: tanpa kelompok, teman, depan kelas, buku, menulis atau menggambar di buku, membawa benda nyata),
// emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k1b5a.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k1b5a-video.ts");
const U1 = await import("../src/components/modul/story/k1b5a-luar-1.ts");
const B = await import("../src/components/modul/story/k1b5a-bantu.ts");
const G = await import("../src/components/modul/story/k1b5a-gambar.ts");

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
const VIDEO = [V.VIDEO_MATERI_K1B5A, V.VIDEO_LUAR_K1B5A];
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
const M_VIDEO = V.VIDEO_MATERI_K1B5A;
const U = V.VIDEO_LUAR_K1B5A;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /Hitung sampai (20|dua puluh)|Sepuluh dan Satuan|Dua Bingkai Sepuluh|metode luar|metode dari luar/i;
const NAMA_INGGRIS = /Count to 20|Ten and Ones|Double Ten Frame|Counting|Place value|Ten-frame|ten frame/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of U1.NAMA_METODE_ID) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE_ID, ["Hitung sampai 20", "Sepuluh dan Satuan", "Dua Bingkai Sepuluh"], "nama Indonesia metode luar");
  cek(!NAMA_INGGRIS.test(materi) && !NAMA_INGGRIS.test(luar), "nama metode hanya bahasa Indonesia (tanpa Count to 20, Ten and Ones, Double Ten Frame)");
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
  cek(M_VIDEO.id === "k1b5a-materi" && U.id === "k1b5a-luar", "id video k1b5a-materi dan k1b5a-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,merapikan-mainan,hitung-satu,sepuluh-dulu,lima-belas,baca-nama,tulis-angka,dua-puluh,garis-bilangan,pasangan-bilangan,siapa-banyak,tebak-buktikan,detektif,latihan-satu,latihan-dua,latihan-tiga,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-hitung,luar-hitung-terapan,luar-sepuluh,luar-sepuluh-terapan,luar-bingkai,luar-bingkai-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 3 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 3 lalu penutup");
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-hitung", "luar-hitung-terapan", "luar-sepuluh", "luar-sepuluh-terapan", "luar-bingkai", "luar-bingkai-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  for (const kata of ["Latihan", "Igil", "Malosi", "Halim", "Kira", "Wei", "Tika", "kelereng", "sepuluh", "sebelas", "belas", "dua puluh", "garis bilangan", "detektif", "kotak sepuluh", "satu per satu"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Hanya bilangan sampai dua puluh: tanpa kali, bagi, kurang, bilangan lebih dari dua puluh, ukuran, atau rumus.
  const BOCOR = /dikali|perkalian|pembagian|dibagi|\bratus\b|\bribu\b|dua puluh (satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan)|(tiga|empat|lima|enam|tujuh|delapan|sembilan) puluh|\bluas\b|keliling|rumus|volume|sentimeter|\bcm\b|\bkurang\w*|dikurangi|pengurangan|×|÷|−/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: hanya bilangan sampai dua puluh (tanpa kali, bagi, kurang, bilangan lebih dari dua puluh, ukuran, rumus)`);
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
const NAMA_METODE_SUARA = /hitung sampai dua puluh|sepuluh dan satuan|dua bingkai sepuluh/gi;
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

  // 2) Kalimat bilangan: jumlah dihitung ulang dan paling besar dua puluh (suara dan gambar).
  const N = NAMA.slice(1).sort((m, n) => n.length - m.length).join("|");
  const nilaiNama = (s) => NAMA.indexOf(s.toLowerCase());
  const reJumlah = new RegExp(`\\b(${N}) ditambah (${N}) menjadi (${N})\\b`, "gi");
  const reBelas = new RegExp(`\\b(${N}) (?:itu|artinya|sama dengan) sepuluh dan (${N})\\b`, "gi");
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((kt, i) => {
        for (const m of kt.suara.matchAll(reJumlah)) {
          stat.aritmetika += 1;
          cek(nilaiNama(m[1]) + nilaiNama(m[2]) === nilaiNama(m[3]) && nilaiNama(m[3]) <= 20, `${v.id}/${a.id}#${i + 1} suara: "${m[0]}" benar`);
        }
        for (const m of kt.suara.matchAll(reBelas)) {
          stat.aritmetika += 1;
          cek(10 + nilaiNama(m[2]) === nilaiNama(m[1]), `${v.id}/${a.id}#${i + 1} suara: "${m[0]}" benar`);
        }
        for (const t of L.teksTerlihat(akhirAdegan(a, i))) {
          const j = /^(\d+) \+ (\d+) = (\d+)$/.exec(t);
          if (j) {
            stat.aritmetika += 1;
            cek(Number(j[1]) + Number(j[2]) === Number(j[3]) && Number(j[3]) <= 20, `${v.id}/${a.id}#${i + 1} gambar: "${t}" benar`);
          }
          const u = /^(\d+) = (\d+) \+ (\d+)$/.exec(t);
          if (u) {
            stat.aritmetika += 1;
            cek(Number(u[2]) + Number(u[3]) === Number(u[1]) && Number(u[1]) <= 20, `${v.id}/${a.id}#${i + 1} gambar: "${t}" benar`);
          }
        }
      });
    }
  }

  // 3) Kotak sepuluh: sepuluh kelereng tepat di petak, sisanya di luar.
  {
    const kotakAda = (objs, p) => daftarId(objs, new RegExp(`^${p}-c\\d$`)).length;
    const a0 = di("sepuluh-dulu", 0);
    cek(kotakAda(a0, "kb") === 10 && daftarId(a0, /^s\d+$/).length === 11, "sepuluh dulu: kotak punya sepuluh petak dan ada sebelas kelereng");
    cek(daftarId(a0, /^s\d+$/).every((b) => !dalamKotak(b, 85, 34, 130, 52)), "sepuluh dulu: awalnya semua kelereng di luar kotak");
    const a2 = di("sepuluh-dulu", 2);
    for (let i = 0; i < 10; i += 1) cek(dekat(ketemu(a2, `s${i}`), pusatSel(i, 85, 34)), `sepuluh dulu: kelereng ${i + 1} tepat di petak ${i + 1}`);
    cek(daftarId(a2, /^s\d+$/).filter((b) => dalamKotak(b, 85, 34, 130, 52)).length === 10 && !dalamKotak(ketemu(a2, "s10"), 85, 34, 130, 52), "sepuluh dulu: sepuluh kelereng di kotak, satu di luar");
    const a1 = di("sepuluh-dulu", 1);
    cek(daftarId(a1, /^s\d+$/).filter((b) => dalamKotak(b, 85, 34, 130, 52)).length === 5, "sepuluh dulu: baris atas berisi lima kelereng");
    cek(daftarId(di("sepuluh-dulu", 3), /^kb-c\d$/).every((c) => c.warna === "#FEF08A"), "sepuluh dulu: kotak penuh berwarna kuning");
    stat.benda += 6;
    // Latihan 1: delapan belas kelereng, sepuluh di kotak, delapan di luar dan dihitung.
    const l0 = di("latihan-satu", 0);
    cek(daftarId(l0, /^ly\d+$/).length === 18 && daftarId(l0, /^lk-c\d$/).length === 10, "latihan 1: delapan belas kelereng dan kotak sepuluh");
    const l1 = di("latihan-satu", 1);
    for (let i = 0; i < 10; i += 1) cek(dekat(ketemu(l1, `ly${i}`), pusatSel(i, 85, 30)), `latihan 1: kelereng ${i + 1} tepat di petak`);
    cek(daftarId(l1, /^ly\d+$/).filter((b) => !dalamKotak(b, 85, 30, 130, 52)).length === 8, "latihan 1: delapan kelereng di luar kotak");
    const l2 = di("latihan-satu", 2);
    sama(labelAngka(l2, "ly").map((lb) => [lb.id, lb.isi]), Array.from({ length: 8 }, (_, q) => [`lyn${10 + q}`, String(q + 1)]), "latihan 1: sisa dihitung satu sampai delapan");
    sama(isiTeks(di("latihan-satu", 3), "lj-t0"), "10 + 8 = 18", "latihan 1: kalimat bilangan");
    stat.benda += 6;
  }

  // 4) Sampai lima belas dan dua puluh: titik bingkai dihitung ulang.
  {
    const A = di("lima-belas", 0);
    cek(daftarId(A, /^fb-t\d+$/).length === 10 && daftarId(A, /^fb-t\d+$/).every((d, i) => dekat(d, pusatDua(i, 30))), "lima belas: sepuluh titik mengisi bingkai pertama");
    cek(daftarId(A, /^o\d+$/).length === 5 && daftarId(A, /^o\d+$/).every((b) => b.y > 90), "lima belas: lima kelereng di luar bingkai");
    const C = di("lima-belas", 3);
    for (let i = 0; i < 5; i += 1) cek(dekat(ketemu(C, `o${i}`), pusatDua(10 + i, 30)), `lima belas: kelereng ke-${i + 1} masuk petak bingkai kedua`);
    cek(isiTeks(C, "b15") === "15", "lima belas: ada lima belas kelereng");
    sama(["nb0", "nb1", "nb2"].map((i) => isiTeks(di("lima-belas", 4), `${i}-t`)), ["11", "12", "13"], "lima belas: tiga kartu nama bilangan");
    sama(["nm0", "nm1", "nm2"].map((i) => isiTeks(di("lima-belas", 4), i)), ["sebelas", "dua belas", "tiga belas"], "lima belas: nama sesuai lambang");
    sama([0, 1, 2, 3, 4].map((i) => isiTeks(di("lima-belas", 6), `uc${i}-t`)), ["11", "12", "13", "14", "15"], "lima belas: ucapkan sebelas sampai lima belas");
    // Dua puluh: pencacah selalu sama dengan banyak titik.
    const D = adegan(M_VIDEO, "dua-puluh");
    for (const ke of [0, 1, 3]) {
      for (let p = 0; p < L.kataDari(D.ketukan[ke].suara).length; p += 1) {
        const o = L.keadaanStory(D, ke, p);
        const titik = daftarId(o, /^dd-t\d+$/);
        if (titik.length === 0 && isiTeks(o, "bil") === undefined) continue;
        cek(titik.length === Number(isiTeks(o, "bil")), `dua puluh #${ke + 1} kata ${p}: pencacah ${isiTeks(o, "bil")} sama dengan ${titik.length} titik`);
        cek(titik.every((d) => dekat(d, pusatDua(Number(d.id.slice(4)), 30))) && titik.every((d) => d.warna === (Number(d.id.slice(4)) < 10 ? "#DC2626" : "#1C01A5")), `dua puluh #${ke + 1} kata ${p}: titik tepat di petak, sepuluh pertama merah, sisanya biru`);
        stat.benda += 1;
      }
    }
    cek(daftarId(di("dua-puluh", 3), /^dd-t\d+$/).length === 20 && isiTeks(di("dua-puluh", 3), "bil") === "20", "dua puluh: dua kotak penuh, dua puluh titik");
    cek(isiTeks(di("dua-puluh", 5), "bil") === "20" && daftarId(di("dua-puluh", 5), /^dd-t\d+$/).length === 20, "dua puluh: hitung dari sepuluh berakhir di dua puluh");
    // Hitung dari sepuluh: pencacah mengikuti nama bilangan yang diucapkan.
    {
      const kt = D.ketukan[5];
      const t = tokoh(kt.suara);
      let nilai = 10;
      const dipakai = [];
      for (let p = 0; p < t.length; p += 1) {
        const r = bacaAngka(t, p);
        if (r && r[0] === nilai && p > 4) {
          dipakai.push([p, nilai]);
          nilai += 1;
        }
      }
      cek(dipakai.length === 11, "dua puluh: sebelas nama bilangan dari sepuluh sampai dua puluh diucapkan");
      for (const [p, n] of dipakai) {
        const o = L.keadaanStory(D, 5, p);
        cek(isiTeks(o, "bil") === String(n), `dua puluh: pencacah ${n} saat nama bilangannya diucapkan (kata ${p})`);
      }
    }
    // Kalimat tulis: paling sedikit pasangan angka dan jalur tulisan sesuai.
    const W1 = adegan(M_VIDEO, "tulis-angka");
    for (const [ke, angka] of [[1, "12"], [2, "15"], [3, "17"], [4, "20"]]) {
      const o = akhirAdegan(W1, ke);
      const jalur = o.filter((x) => /^w\d$/.test(x.id));
      const harap = G.tulisAngka("w", 112, 40, angka, 1.6);
      sama(jalur.map((x) => x.d), harap.map((x) => x.d), `tulis angka: jalur tulisan ${angka} sesuai`);
      cek(isiTeks(o, "wn")?.endsWith(`= ${angka}`), `tulis angka: tulisan ${angka} cocok dengan nama bilangannya`);
      cek(NAMA[Number(angka)] === isiTeks(o, "wn").split(" = ")[0], `tulis angka: nama bilangan ${angka}`);
    }
    sama(akhirAdegan(adegan(M_VIDEO, "dua-puluh"), 4).filter((x) => /^ts\d$/.test(x.id)).map((x) => x.d), G.tulisAngka("ts", 112, 50, "20", 1.6).map((x) => x.d), "dua puluh: tulisan angka dua puluh sesuai");
    stat.benda += 12;
  }

  // 5) Membaca nama bilangan di papan.
  {
    const a = adegan(M_VIDEO, "baca-nama");
    const o0 = akhirAdegan(a, 0);
    sama(Array.from({ length: 10 }, (_, i) => isiTeks(o0, `bk${11 + i}-t`)), Array.from({ length: 10 }, (_, i) => String(11 + i)), "baca nama: papan memuat sebelas sampai dua puluh berurutan");
    for (const ke of [1, 2, 3, 4, 5]) {
      const o = akhirAdegan(a, ke);
      const n = NAMA.indexOf(isiTeks(o, "nm"));
      cek(n >= 11 && n <= 20 && ketemu(o, `bk${n}-k`)?.sorot === true, `baca nama #${ke + 1}: nama "${isiTeks(o, "nm")}" sesuai kartu yang disorot`);
      const angkaLb = (isiTeks(o, "lb").match(/\d/g) ?? []).join("");
      cek(angkaLb === String(n), `baca nama #${ke + 1}: lambang ${angkaLb} sesuai ${n}`);
    }
    // Pada tiap kata nama, nama dan kartu sorot selaras.
    const t4 = tokoh(a.ketukan[3].suara);
    for (const [kata, n] of [["tiga", 13], ["empat", 14], ["lima", 15]]) {
      const p = t4.indexOf(kata);
      const o = L.keadaanStory(a, 3, p);
      cek(isiTeks(o, "nm") === NAMA[n] && ketemu(o, `bk${n}-k`).sorot === true, `baca nama: saat "${kata}" kartu ${n} dan nama ${NAMA[n]} tampak`);
    }
    const o6 = akhirAdegan(a, 6);
    cek(isiTeks(o6, "pk-t") === "1" && isiTeks(o6, "ps-t") === "3" && isiTeks(o6, "pt") === "13 = 10 + 3", "baca nama: angka kiri satu bernilai sepuluh, angka kanan tiga");
    stat.benda += 4;
  }

  // 6) Garis bilangan: letak bilangan, lompatan, dan katak.
  {
    const a = adegan(M_VIDEO, "garis-bilangan");
    const o0 = akhirAdegan(a, 0);
    for (let n = 10; n <= 20; n += 1) cek(isiTeks(o0, `gb-n${n}`) === String(n) && ketemu(o0, `gb-n${n}`).x === 25 + (n - 10) * 25 && ketemu(o0, `gb-t${n}`).x === 25 + (n - 10) * 25, `garis bilangan: ${n} tepat di tempatnya`);
    cek(dekat({ x: ketemu(akhirAdegan(a, 1), "kt").x, y: 0 }, { x: 25, y: 0 }), "garis bilangan: katak mulai dari sepuluh");
    for (const ke of [2, 4]) {
      for (let p = 0; p < L.kataDari(a.ketukan[ke].suara).length; p += 1) {
        const o = L.keadaanStory(a, ke, p);
        const lompat = daftarId(o, /^lp\d+$/);
        cek(ketemu(o, "kt").x === 25 + lompat.length * 25, `garis bilangan #${ke + 1} kata ${p}: posisi katak sesuai ${lompat.length} lompatan`);
        for (const l of lompat) {
          const n = Number(l.id.slice(2));
          cek(l.x === 25 + (n - 11) * 25 && /Q12\.5 -22 25\.0 0$/.test(l.d), `garis bilangan: lompatan ke ${n} satu langkah ke kanan`);
        }
      }
    }
    sama(akhirAdegan(a, 4).filter((x) => /^lp\d+$/.test(x.id)).length, 10, "garis bilangan: sepuluh lompatan dari sepuluh ke dua puluh");
    stat.benda += 5;
  }

  // 7) Sepuluh ditambah sisa: titik di bingkai kedua sesuai angka.
  {
    const a = adegan(M_VIDEO, "pasangan-bilangan");
    for (const [ke, sisa] of [[1, 3], [2, 7], [3, 8]]) {
      const o = akhirAdegan(a, ke);
      const titik = daftarId(o, /^pp-t\d+$/);
      cek(titik.length === 10 + sisa && titik.every((d) => dekat(d, pusatDua(Number(d.id.slice(4)), 30))), `pasangan: ${10 + sisa} titik tepat di petak`);
      cek(isiTeks(o, "e1") === "10" && isiTeks(o, "e3") === String(sisa) && isiTeks(o, "e5") === String(10 + sisa) && isiTeks(o, "e2") === "+" && isiTeks(o, "e4") === "=", `pasangan: kalimat 10 + ${sisa} = ${10 + sisa}`);
    }
    stat.benda += 6;
  }

  // 8) Membandingkan lewat sepuluh dan sisa.
  {
    const a = adegan(M_VIDEO, "siapa-banyak");
    const o = akhirAdegan(a, 0);
    cek(daftarId(o, /^krf-t\d+$/).length === 10 && daftarId(o, /^wif-t\d+$/).length === 10, "siapa banyak: sepuluh titik di tiap bingkai");
    cek(daftarId(o, /^krf-t\d+$/).every((d, i) => dekat(d, pusatSel(i, 62, 44, 14))) && daftarId(o, /^wif-t\d+$/).every((d, i) => dekat(d, pusatSel(i, 62, 116, 14))), "siapa banyak: titik tepat di petak bingkai kecil");
    const kr = daftarId(o, /^krs-t\d+$/).length;
    const wi = daftarId(o, /^wis-t\d+$/).length;
    sama([kr, wi, isiTeks(o, "ck"), isiTeks(o, "cw")], [3, 5, String(10 + kr), String(10 + wi)], "siapa banyak: Kira sepuluh tambah tiga, Wei sepuluh tambah lima");
    const p = akhirAdegan(a, 3);
    sama([isiTeks(p, "sk"), isiTeks(p, "sw")], ["sisa 3", "sisa 5"], "siapa banyak: sisa Kira tiga, sisa Wei lima");
    cek(Number(isiTeks(o, "cw")) > Number(isiTeks(o, "ck")) && isiTeks(akhirAdegan(a, 4), "lb") === "Wei lebih banyak", "siapa banyak: Wei lebih banyak");
    stat.benda += 4;
  }

  // 9) Tebak dan buktikan: tujuh belas kelereng di dalam stoples.
  {
    const a = adegan(M_VIDEO, "tebak-buktikan");
    const o = akhirAdegan(a, 0);
    const j = daftarId(o, /^j\d+$/);
    cek(j.length === 17 && j.every((b) => dalamKotak(b, 84, 56, 132, 94)), "tebak: tujuh belas kelereng di dalam stoples");
    cek(j.every((b, i) => j.every((c, q) => q <= i || Math.hypot(b.x - c.x, b.y - c.y) > 14)), "tebak: kelereng tidak bertumpuk");
    sama(isiTeks(akhirAdegan(a, 1), "tb-t0"), "tebakan: 15", "tebak: tebakan lima belas");
    const h = labelAngka(akhirAdegan(a, 3), "j");
    sama([h.length, h[h.length - 1].isi], [17, "17"], "tebak: hitungan berakhir di tujuh belas");
    sama(isiTeks(akhirAdegan(a, 4), "hs-t0"), "tebak 15, hitung 17", "tebak: tebakan dan hitungan");
    stat.benda += 5;
  }

  // 10) Detektif dan Latihan.
  {
    const a = adegan(M_VIDEO, "detektif");
    sama([isiTeks(akhirAdegan(a, 1), "ka-t"), isiTeks(akhirAdegan(a, 1), "kb-t"), isiTeks(akhirAdegan(a, 2), "kb-t")], ["14", "?", "15"], "detektif: setelah empat belas ada lima belas");
    sama([isiTeks(akhirAdegan(a, 3), "ka-t"), isiTeks(akhirAdegan(a, 3), "kb-t"), isiTeks(akhirAdegan(a, 4), "ka-t")], ["?", "20", "19"], "detektif: sebelum dua puluh ada sembilan belas");
    sama([isiTeks(akhirAdegan(a, 5), "ka-t"), isiTeks(akhirAdegan(a, 5), "kb-t")], ["10 + 2", "12"], "detektif: sepuluh ditambah dua menjadi dua belas");
    const c = akhirAdegan(adegan(M_VIDEO, "latihan-tiga"), 2);
    sama([isiTeks(c, "nm"), ["pl0-t", "pl1-t", "pl2-t"].map((i) => isiTeks(c, i)), ketemu(c, "pl0-k").sorot], ["dua belas", ["12", "15", "20"], true], "latihan 3: dua belas dipilih dari tiga lambang");
    // Latihan 2: sepuluh sedotan terikat, enam di luar.
    const b = adegan(M_VIDEO, "latihan-dua");
    cek(daftarId(akhirAdegan(b, 0), /^sd\d+$/).length === 16, "latihan 2: enam belas sedotan");
    const b3 = akhirAdegan(b, 2);
    const ik = ketemu(b3, "ik");
    const sd = daftarId(b3, /^sd\d+$/);
    const di3 = sd.filter((s) => dalamKotak(s, ik.x, ik.y, ik.w, ik.h));
    cek(di3.length === 10 && di3.every((s) => Number(s.id.slice(2)) < 10) && sd.filter((s) => !dalamKotak(s, ik.x, ik.y, ik.w, ik.h)).length === 6, "latihan 2: sepuluh sedotan di dalam ikat, enam di luar");
    sama(labelAngka(akhirAdegan(b, 1), "sd").map((lb) => lb.isi), ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], "latihan 2: sepuluh sedotan dipilih");
    sama(labelAngka(akhirAdegan(b, 3), "sd").map((lb) => lb.isi), ["1", "2", "3", "4", "5", "6"], "latihan 2: sisa dihitung satu sampai enam");
    sama(isiTeks(akhirAdegan(b, 4), "sj-t0"), "10 + 6 = 16", "latihan 2: kalimat bilangan");
    stat.benda += 7;
  }

  // 11) Metode luar.
  {
    const h = adegan(U, "luar-hitung");
    sama([daftarId(akhirAdegan(h, 0), /^lh\d+$/).length, daftarId(akhirAdegan(h, 2), /^lh\d+$/).length, isiTeks(akhirAdegan(h, 3), "lk-t0")], [10, 12, "12 kelereng"], "luar hitung: sepuluh lalu dua belas kelereng");
    const t = akhirAdegan(adegan(U, "luar-hitung-terapan"), 3);
    cek(daftarId(t, /^lb\d+$/).length === 14, "luar hitung terapan: empat belas bola");
    sama([...["c1-t", "c2-t", "c3-t"].map((i) => isiTeks(t, i)), ketemu(t, "c2-k").sorot], ["13", "14", "15", true], "luar hitung terapan: empat belas dipilih");
    const s = adegan(U, "luar-sepuluh");
    const s1 = akhirAdegan(s, 1);
    cek(daftarId(s1, /^sf-t\d+$/).length === 10 && daftarId(s1, /^sf-t\d+$/).every((d, i) => dekat(d, pusatSel(i, 85, 56))) && isiTeks(s1, "b14") === "14", "luar sepuluh: empat belas, sepuluh titik di kotak");
    const s2 = akhirAdegan(s, 2);
    cek(daftarId(s2, /^ss-t\d+$/).length === 4 && daftarId(s2, /^ss-t\d+$/).every((d) => !dalamKotak(d, 85, 56, 130, 52)) && isiTeks(s2, "sa") === "sisa 4", "luar sepuluh: sisa empat di luar kotak");
    sama(isiTeks(akhirAdegan(s, 3), "lj-t0"), "14 = 10 + 4", "luar sepuluh: kalimat empat belas");
    const bt = adegan(U, "luar-sepuluh-terapan");
    sama(daftarId(akhirAdegan(bt, 0), /^bl\d+$/).length, 16, "luar sepuluh terapan: enam belas balon");
    const b1 = akhirAdegan(bt, 1);
    const bl = daftarId(b1, /^bl\d+$/);
    cek(bl.filter((b) => dalamKotak(b, 85, 56, 130, 52)).length === 10 && bl.filter((b) => !dalamKotak(b, 85, 56, 130, 52)).length === 6, "luar sepuluh terapan: sepuluh balon di kotak, enam di luar");
    cek(bl.every((b) => ketemu(b1, `${b.id}-x`).x === b.x && ketemu(b1, `${b.id}-x`).y > b.y), "luar sepuluh terapan: tali balon tetap di bawah balonnya");
    const g = adegan(U, "luar-bingkai");
    for (const [ke, n] of [[1, 10], [2, 15], [4, 20]]) {
      const o = akhirAdegan(g, ke);
      const titik = daftarId(o, /^bb-t\d+$/);
      cek(titik.length === n && titik.every((d) => dekat(d, pusatDua(Number(d.id.slice(4)), 56)) && d.warna === (Number(d.id.slice(4)) < 10 ? "#DC2626" : "#1C01A5")), `luar bingkai: ${n} titik tepat di petak`);
    }
    sama([isiTeks(akhirAdegan(g, 3), "b15"), isiTeks(akhirAdegan(g, 4), "b15")], ["15", "20"], "luar bingkai: lima belas lalu dua puluh");
    const w = adegan(U, "luar-bingkai-terapan");
    for (const ke of [1, 2]) {
      for (let p = 0; p < L.kataDari(w.ketukan[ke].suara).length; p += 1) {
        const o = L.keadaanStory(w, ke, p);
        cek(daftarId(o, /^fw-t\d+$/).length === Number(isiTeks(o, "cnt")), `luar bingkai terapan #${ke + 1} kata ${p}: pencacah ${isiTeks(o, "cnt")} sama dengan banyak titik`);
      }
    }
    const w3 = akhirAdegan(w, 3);
    cek(daftarId(w3, /^fw-t\d+$/).length === 13 && isiTeks(w3, "fj-t0") === "10 + 3 = 13", "luar bingkai terapan: tiga belas titik");
    stat.benda += 12;
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
  const DAFTAR = ["Menghitung benda", "Membaca nama bilangan", "Menulis lambang bilangan"];
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Menghitung benda/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => DAFTAR.includes(t)), DAFTAR, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara) && !/\d/.test(DAFTAR.join(" ")), "sapaan materi: tanpa angka");
  const sapLuar = adegan(U, "sapaan");
  cek(/cara lain/i.test(L.teksTerlihat(akhirAdegan(sapLuar, 1)).join(" | ")) && /metode-luar|Metode luar/.test(sapLuar.sumber), "sapaan metode luar: pengumuman cara lain");
  const sumberRingkas = JSON.parse(readFileSync(new URL("../src/data/kelas1-bab5-ringkas.json", import.meta.url), "utf8")).subBab.A;
  const sementara = new URL("../.tmp-k1b5s/A.json", import.meta.url);
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
    // Isi tabel dihitung ulang: angka, sisa setelah sepuluh, dan bilangan sesudahnya cocok dengan nama pada label.
    cek(T.baris.every((b) => {
      const n = NAMA.indexOf(b.label.toLowerCase());
      return n >= 11 && n <= 20 && b.sel[0] === String(n) && b.sel[1] === String(n - 10) && b.sel[2] === String(n + 1);
    }), "tabel susun: angka, sisa, dan bilangan sesudahnya sesuai nama bilangan pada label");
    // Margin teks sel di lebar 405 px: sel pendek (paling banyak delapan huruf) supaya margin teks >= 5 px.
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 8)), "tabel susun: sel pendek supaya margin teks >= 5 px di 405 px");
    const KATA_LARANG = /buku|halaman|kunci|kelompok|\bteman|kawan|kelas\b|kertas|pensil|\bbawa\b|menggambar|menulis di|depan kelas|kurang|luas|keliling|di rumah/i;
    cek(!KATA_LARANG.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: tanpa kata terlarang dan tanpa kelompok, teman, kelas, buku, kertas, pensil");
    cek(peta.every((s) => ![...s.teks, ...(s.ikon ?? "")].some((c) => c.codePointAt(0) > 0x1fa95)), "peta susun: emoji paling tinggi Emoji 12");
  } else cek(false, "peta dan tabel susun: .tmp-k1b5s/A.json atau kelas1-bab5-ringkas.json subBab.A.petaSusun ada");
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k1b5a-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k1b5a-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k1b5a sendiri (${impor.join(", ")})`);
  }
  // Emoji dalam data teks gambar juga paling tinggi Emoji 12 (diperiksa pada gambar yang diputar).
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${v.id}/${a.id}: emoji gambar paling tinggi Emoji 12`);
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k1b5a.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|naskah-k1b/.test(pembungkus) && /VIDEO_MATERI_K1B5A/.test(pembungkus) && /VIDEO_LUAR_K1B5A/.test(pembungkus) && /export function VideoK1B5A/.test(pembungkus) && /daftar-video-cerita/.test(pembungkus), "video-k1b5a.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k1b5a.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k1b5a.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k1b5a.mjs: akhir baris LF");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit diputar)`);
}
console.log(`Pemeriksaan: ${stat.hitung} deret hitungan, ${jumlahNama} nama bilangan tampak sebagai angka, ${stat.aritmetika} kalimat bilangan, ${stat.benda} pemeriksaan benda dan bingkai`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
