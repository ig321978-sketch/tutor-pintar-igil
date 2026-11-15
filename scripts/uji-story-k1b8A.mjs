// Uji Story Kelas 1 Bab 8 Sub-Bab A (Mengelompokkan Data): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar (nama metode hanya Indonesia),
// hanya bilangan sampai dua puluh (tanpa kali, bagi, tambah, kurang, bersusun), hitungan satu per satu (angka berurutan, dekat bendanya, sama dengan bilangan yang diucapkan),
// nama bilangan sepuluh sampai dua puluh yang diucapkan tampak sebagai angka, data di layar dihitung ulang dari gambar (benda per kelompok, turus: goresan sama dengan benda dan goresan kelima miring,
// tabel menurun dan mendatar memuat data sama, diagram gambar: satu gambar satu data, angka sama dengan jumlah gambar), setiap kalimat baca data di suara
// (ada N benda, paling banyak, paling sedikit, lebih banyak, lebih sedikit, sama banyak, selisih, jumlah semuanya) dicocokkan dengan data yang digambar, pilihan jawaban,
// aturan pemilik (belajar mandiri digital: tanpa kerja kelompok, survei teman, depan kelas, buku, menulis atau menggambar di buku, membawa benda nyata),
// emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k1b8A.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k1b8A-video.ts");
const U1 = await import("../src/components/modul/story/k1b8A-luar-1.ts");
const B = await import("../src/components/modul/story/k1b8A-bantu.ts");

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
const VIDEO = [V.VIDEO_MATERI_K1B8A, V.VIDEO_LUAR_K1B8A];
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
const M_VIDEO = V.VIDEO_MATERI_K1B8A;
const U = V.VIDEO_LUAR_K1B8A;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /Diagram Gambar|Banding Kategori|metode luar|metode dari luar/i;
const NAMA_INGGRIS = /Tally Marks|Pictograph|Compare Categories|Data collection|Data display|Data literacy/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar (kata turus adalah istilah isi sub-bab, boleh)");
  for (const m of U1.NAMA_METODE_ID) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE_ID, ["Turus", "Diagram Gambar", "Banding Kategori"], "nama Indonesia metode luar");
  cek(!NAMA_INGGRIS.test(materi) && !NAMA_INGGRIS.test(luar), "nama metode hanya bahasa Indonesia (tanpa Tally Marks, Pictograph, Compare Categories)");
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
      cek(!/Uji Kompetensi|Pengayaan|Ayo Berlatih|Ayo Berdiskusi|Ayo Berefleksi|Ayo Mengingat|Ayo Berkomunikasi|Ayo Berpikir|Ayo Berkarya|Ayo Bermain|soal \d|Soal \d|Eksplorasi|Refleksi/.test(semua.join(" | ")), `${v.id}/${a.id}: latihan disajikan sebagai Latihan, tanpa istilah buku`);
      // Tokoh hanya enam tokoh tetap (Malosi, Kira, Upe, Wei, Halim, Igil): tanpa nama lain dari data sumber.
      cek(!/\b(Tika|Paman|Ibu|Ayah|Bapak|Budi|Ani|Doni|Sinta|Dewi|Rudi|Nina|Andi|Siti)\b/.test(semua.join(" | ")), `${v.id}/${a.id}: hanya enam tokoh tetap`);
    }
  }
  cek(M_VIDEO.subjudul === "Materi kurikulum" && U.subjudul === "Tiga metode luar", "subjudul video: Materi kurikulum dan Tiga metode luar");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46), "video materi: label sumber berbentuk Materi: ... dan pendek");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "video metode luar: label sumber metode luar atau ringkasan, pendek");
  cek(M_VIDEO.id === "k1b8A-materi" && U.id === "k1b8A-luar", "id video k1b8A-materi dan k1b8A-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,toko-berantakan,toko-rapi,hitung-kelompok,daftar-mainan,bola-warna,turus-merah,turus-lain,tabel-menurun,tabel-mendatar,hewan-pilihan,hewan-tabel,sama-banyak,selisih-bola,jumlah-semua,latihan-satu,latihan-dua,latihan-tiga,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-turus,luar-turus-terapan,luar-diagram,luar-diagram-terapan,luar-banding,luar-banding-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 3 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 3 lalu penutup");
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-turus", "luar-turus-terapan", "luar-diagram", "luar-diagram-terapan", "luar-banding", "luar-banding-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  for (const kata of ["Latihan", "Igil", "Malosi", "Halim", "Kira", "Wei", "Upe", "kereta", "mobil", "boneka", "bola", "turus", "tabel", "baris", "kolom", "judul", "daftar", "data", "menurun", "mendatar", "mengelompokkan", "paling banyak", "paling sedikit", "sama banyak", "lebih banyak", "lebih sedikit", "selisih", "jumlah semuanya", "goresan"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Hanya bilangan sampai dua puluh dan satuan tidak baku di layar: tanpa kali, bagi, tambah, kurang, bilangan lebih dari dua puluh, bersusun, satuan baku (penggaris, sentimeter, meter), atau rumus.
  const BOCOR = /dikali|perkalian|pembagian|dibagi|ditambah|dikurangi|\bratus\b|\bribu\b|dua puluh (satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan)|(tiga|empat|lima|enam|tujuh|delapan|sembilan) puluh|\bluas\b|keliling|rumus|volume|sentimeter|centimeter|\bcm\b|\bmeter\b|penggaris|bersusun|meminjam|pinjam|menyimpan|simpan|×|÷|−/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: hanya bilangan sampai dua puluh (tanpa kali, bagi, tambah, kurang, bersusun, satuan baku, bilangan lebih dari dua puluh, rumus)`);
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
const NAMA_METODE_SUARA = /turus|diagram gambar|banding kategori/gi;
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

  // 2) Tanpa kalimat hitung (tambah, kurang, kali, bagi) dan tanpa lambang hitung di gambar; yang dihitung hanya ukuran dan perbandingan.
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((kt, i) => {
        const nm = `${v.id}/${a.id}#${i + 1}`;
        cek(!/ditambah|dikurangi|dikali|dibagi|sama dengan|menjadi/i.test(kt.suara), `${nm}: suara tanpa kalimat hitung (tambah, kurang, kali, bagi)`);
        cek(!/\b(tiga|empat|lima|enam|tujuh|delapan|sembilan) puluh\b/i.test(kt.suara), `${nm}: suara tanpa bilangan lebih dari dua puluh`);
        for (const t of L.teksTerlihat(akhirAdegan(a, i))) cek(!/\d\s*[+\-−×÷=]\s*\d/.test(t), `${nm} gambar: "${t}" tanpa lambang hitung`);
      });
    }
  }

  // 3) Data di layar: benda per kelompok, turus, tabel menurun dan mendatar, diagram gambar; semua dihitung ulang dari gambar.
  const baca = (objs) => {
    const grup = new Map();
    const g = (key) => {
      if (!grup.has(key)) grup.set(key, { key, items: [], nm: null, ln: null, strokes: [] });
      return grup.get(key);
    };
    for (const o of objs) {
      let m;
      if (o.t === "teks" && (m = /^e([a-z])(\d+)$/.exec(o.id))) g(m[1]).items.push({ i: Number(m[2]), o });
      else if (o.t === "teks" && (m = /^e([a-z])-nm$/.exec(o.id))) g(m[1]).nm = o;
      else if (o.t === "teks" && (m = /^e([a-z])-ln$/.exec(o.id))) g(m[1]).ln = o;
      else if (o.t === "garis" && (m = /^t([a-z])-g(\d+)$/.exec(o.id))) g(m[1]).strokes.push({ i: Number(m[2]), o });
    }
    for (const x of grup.values()) {
      x.items.sort((p, q) => p.i - q.i);
      x.strokes.sort((p, q) => p.i - q.i);
    }
    return [...grup.values()];
  };
  const angkaDi = (objs, id) => {
    const o = objs.find((q) => q.id === id && q.t === "teks");
    return o && /^\d+$/.test(o.isi ?? "") ? Number(o.isi) : null;
  };
  const tabelDari = (objs) => {
    const hasil = [];
    for (const jd of objs.filter((o) => o.t === "teks" && /^[a-z]+-jd$/.test(o.id))) {
      const id = jd.id.slice(0, -3);
      const nomor = (re) => objs.filter((o) => o.t === "teks" && re.test(o.id)).map((o) => Number(re.exec(o.id)[1])).sort((p, q) => p - q);
      const baris = nomor(new RegExp(`^${id}-r(\\d+)a$`));
      const kolom = nomor(new RegExp(`^${id}-c(\\d+)a$`));
      const diag = nomor(new RegExp(`^${id}-l(\\d+)$`));
      if (baris.length) hasil.push({ id, jenis: "menurun", judul: jd.isi, baris: baris.map((r) => ({ nama: isiTeks(objs, `${id}-r${r}a`), n: angkaDi(objs, `${id}-r${r}b`) })) });
      if (kolom.length) hasil.push({ id, jenis: "mendatar", judul: jd.isi, baris: kolom.map((c) => ({ nama: isiTeks(objs, `${id}-c${c}a`), n: angkaDi(objs, `${id}-c${c}b`) })) });
      if (diag.length) {
        hasil.push({
          id,
          jenis: "diagram",
          judul: jd.isi,
          baris: diag.map((r) => {
            const pics = objs.filter((o) => o.t === "teks" && new RegExp(`^${id}-p${r}\\d+$`).test(o.id)).sort((p, q) => Number(p.id.slice(`${id}-p${r}`.length)) - Number(q.id.slice(`${id}-p${r}`.length)));
            return { nama: isiTeks(objs, `${id}-l${r}`), n: angkaDi(objs, `${id}-n${r}`), pics, r };
          }),
        });
      }
    }
    return hasil;
  };
  /** Peta nama (huruf kecil) ke banyaknya dari gambar yang terlihat; konflik antarsumber dilaporkan. */
  const petaData = (gs, tabel) => {
    const peta = new Map();
    const konflik = [];
    const taruh = (nama, n, sumber) => {
      if (nama == null || n == null) return;
      const key = nama.toLowerCase();
      if (peta.has(key) && peta.get(key).n !== n) konflik.push(`data "${nama}" berbeda antarsumber (${sumber}: ${n}, sebelumnya ${peta.get(key).n})`);
      else peta.set(key, { n, sumber });
    };
    for (const g of gs) if (g.nm) taruh(g.nm.isi, g.ln ? Number(g.ln.isi) : g.items.length > 0 ? g.items.length : null, `kelompok ${g.key}`);
    for (const t of tabel) for (const b of t.baris) taruh(b.nama, t.jenis === "diagram" ? (b.n ?? (b.pics.length || null)) : b.n, `${t.jenis} ${t.id}`);
    return { peta, konflik };
  };
  const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const NB = NAMA.slice(1).sort((p, q) => q.length - p.length).join("|");
  const nilaiNB = (s) => NAMA.indexOf(s);
  const stat3 = { kelompok: 0, turus: 0, tabel: 0, diagram: 0, kalimat: 0, pemicu: 0 };

  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((kt, i) => {
        const objs = akhirAdegan(a, i);
        const nm = `${v.id}/${a.id}#${i + 1}`;
        const gs = baca(objs);
        const tabel = tabelDari(objs);
        let totalItem = 0;
        let totalGores = 0;
        for (const g of gs) {
          if (g.items.length) {
            stat3.kelompok += 1;
            const e0 = g.items[0].o;
            cek(g.items.every((s, q) => s.i === q), `${nm} e${g.key}: nomor benda berurutan dari nol`);
            cek(g.items.every((s) => s.o.isi === e0.isi && s.o.u === e0.u), `${nm} e${g.key}: satu jenis benda (gambar dan ukuran sama)`);
            cek(g.items.length >= 1 && g.items.length <= 20, `${nm} e${g.key}: banyak benda paling banyak dua puluh (${g.items.length})`);
            totalItem += g.items.length;
            let rapat = true;
            for (let p = 0; p < g.items.length; p += 1) for (let q = p + 1; q < g.items.length; q += 1) if (Math.hypot(g.items[p].o.x - g.items[q].o.x, g.items[p].o.y - g.items[q].o.y) < 17) rapat = false;
            cek(rapat, `${nm} e${g.key}: benda tidak saling menimpa`);
          }
          if (g.ln) {
            cek(/^\d+$/.test(g.ln.isi) && Number(g.ln.isi) >= 1 && Number(g.ln.isi) <= 20, `${nm} e${g.key}: angka banyaknya satu sampai dua puluh ("${g.ln.isi}")`);
            if (g.items.length) cek(Number(g.ln.isi) === g.items.length, `${nm} e${g.key}: angka banyaknya ${g.ln.isi} sama dengan ${g.items.length} benda yang digambar`);
          }
          if (g.strokes.length) {
            stat3.turus += 1;
            const n = g.strokes.length;
            totalGores += n;
            cek(g.strokes.every((s, q) => s.i === q), `${nm} t${g.key}: nomor goresan berurutan dari nol`);
            cek(n <= 20, `${nm} t${g.key}: goresan paling banyak dua puluh`);
            const x0 = g.strokes[0].o.x;
            for (const s of g.strokes) {
              const gi = Math.floor(s.i / 5);
              const miring = s.i % 5 === 4;
              if (miring) {
                const tegak = g.strokes.filter((t) => Math.floor(t.i / 5) === gi && t.i % 5 < 4);
                const lo = Math.min(...tegak.map((t) => t.o.x));
                const hi = Math.max(...tegak.map((t) => t.o.x));
                cek(s.o.x2 > 0 && s.o.y2 < 0 && s.o.x <= lo && s.o.x + s.o.x2 >= hi && tegak.length === 4, `${nm} t${g.key}: goresan kelima ke-${gi + 1} miring dan memotong empat goresan tegak`);
              } else cek(s.o.x2 === 0 && s.o.y2 > 0, `${nm} t${g.key}: goresan ${s.i + 1} tegak`);
              if (s.i % 5 === 0) cek(s.o.x === x0 + gi * 32, `${nm} t${g.key}: kelompok lima ke-${gi + 1} berjarak rata`);
              else if (!miring) cek(s.o.x === x0 + gi * 32 + (s.i % 5) * 6, `${nm} t${g.key}: goresan ${s.i + 1} berjajar rapat`);
            }
            if (g.items.length) cek(n <= g.items.length, `${nm} t${g.key}: goresan (${n}) tidak lebih banyak dari benda (${g.items.length})`);
            if (i === a.ketukan.length - 1) {
              const target = g.items.length || (g.ln ? Number(g.ln.isi) : n);
              cek(n === target, `${nm} t${g.key}: di akhir adegan banyak goresan ${n} sama dengan banyak benda ${target}`);
            }
          }
        }
        cek(totalItem <= 20, `${nm}: jumlah semua benda paling banyak dua puluh (${totalItem})`);
        cek(totalGores <= 20, `${nm}: jumlah semua goresan paling banyak dua puluh (${totalGores})`);

        // Tabel dan diagram.
        for (const t of tabel) {
          if (t.jenis === "diagram") {
            stat3.diagram += 1;
            let totalPic = 0;
            for (const b of t.baris) {
              totalPic += b.pics.length;
              const e0 = b.pics[0]?.isi;
              cek(b.pics.every((p, q) => p.isi === e0 && p.id === `${t.id}-p${b.r}${q}` && p.x === b.pics[0].x + q * (b.pics[1] ? b.pics[1].x - b.pics[0].x : 0) && p.y === b.pics[0].y), `${nm} ${t.id} baris ${b.nama}: gambar sejenis, berurutan, rata dalam satu baris`);
              if (b.n != null) cek(b.n === b.pics.length, `${nm} ${t.id} baris ${b.nama}: angka ${b.n} sama dengan ${b.pics.length} gambar (satu gambar satu data)`);
            }
            cek(new Set(t.baris.map((b) => b.pics[0]?.isi).filter(Boolean)).size === t.baris.filter((b) => b.pics.length).length, `${nm} ${t.id}: tiap baris memakai gambar yang berbeda`);
            cek(totalPic <= 20, `${nm} ${t.id}: jumlah semua gambar paling banyak dua puluh (${totalPic})`);
          } else {
            stat3.tabel += 1;
            cek(t.baris.length >= 3 && t.baris.length <= 5 && new Set(t.baris.map((b) => b.nama)).size === t.baris.length, `${nm} ${t.id}: tiga sampai lima baris data dengan nama berbeda`);
            cek(t.baris.every((b) => b.n === null || (b.n >= 1 && b.n <= 20)), `${nm} ${t.id}: banyak data satu sampai dua puluh`);
            cek(t.baris.reduce((s, b) => s + (b.n ?? 0), 0) <= 20, `${nm} ${t.id}: jumlah semua data paling banyak dua puluh`);
          }
        }
        const penuh = tabel.filter((t) => t.jenis !== "diagram" && t.baris.every((b) => b.n !== null));
        if (penuh.length >= 2) {
          const kunci = (t) => JSON.stringify([...t.baris.map((b) => [b.nama, b.n])].sort());
          cek(penuh.every((t) => kunci(t) === kunci(penuh[0])), `${nm}: tabel menurun dan tabel mendatar memuat data yang sama`);
          cek(new Set(penuh.map((t) => t.jenis)).size === penuh.length, `${nm}: dua tabel berbentuk berbeda (menurun dan mendatar)`);
        }

        // Pemicu goresan dan gambar yang muncul pada nama bilangan: nomor sama dengan bilangan yang diucapkan.
        const tk = tokoh(kt.suara);
        for (const ak of kt.aksi) {
          for (const o of ak.tambah === undefined ? [] : [].concat(ak.tambah)) {
            const m = /^t[a-z]-g(\d+)$/.exec(o.id) ?? /^[a-z]+-p\d(\d+)$/.exec(o.id);
            if (!m) continue;
            const r = bacaAngka(tk, L.posisiKata(kt.suara, ak.at));
            if (r) {
              stat3.pemicu += 1;
              cek(r[0] === Number(m[1]) + 1, `${nm}: ${o.id} muncul saat "${NAMA[r[0]]}" diucapkan (harus ${NAMA[Number(m[1]) + 1]})`);
            }
          }
        }

        // Kalimat baca data di suara dihitung ulang.
        const { peta, konflik } = petaData(gs, tabel);
        for (const kf of konflik) cek(false, `${nm}: ${kf}`);
        const nama = [...peta.keys()];
        if (nama.length === 0) return;
        const awalKata = "(?:^|[\\s,])";
        const kalimat = kt.suara.toLowerCase().split(/(?<=[.!?])\s+/);
        for (const kal of kalimat) {
          for (const A of nama) {
            const nA = peta.get(A).n;
            for (const mm of kal.matchAll(new RegExp(`${awalKata}${esc(A)} ada (${NB})(?![a-z])`, "g"))) {
              stat3.kalimat += 1;
              cek(nilaiNB(mm[1]) === nA, `${nm}: "${A} ada ${mm[1]}" benar (data ${nA})`);
            }
            for (const mm of kal.matchAll(new RegExp(`ada (${NB}) ${esc(A)}(?![a-z])`, "g"))) {
              stat3.kalimat += 1;
              cek(nilaiNB(mm[1]) === nA, `${nm}: "ada ${mm[1]} ${A}" benar (data ${nA})`);
            }
            const reLebih = new RegExp(`${awalKata}${esc(A)} lebih (banyak|sedikit)(?: (${NB}))? dari (.*)$`).exec(kal);
            if (reLebih) {
              const lawan = nama.filter((B) => B !== A && new RegExp(`${awalKata}${esc(B)}(?![a-z])`).test(reLebih[3]));
              cek(lawan.length >= 1, `${nm}: "${kal}" menyebut pembanding yang tergambar`);
              for (const B of lawan) {
                stat3.kalimat += 1;
                const nB = peta.get(B).n;
                cek(reLebih[1] === "banyak" ? nA > nB : nA < nB, `${nm}: "${A} lebih ${reLebih[1]} dari ${B}" benar (${nA} dan ${nB})`);
                if (reLebih[2]) cek(Math.abs(nA - nB) === nilaiNB(reLebih[2]), `${nm}: selisih ${reLebih[2]} sama dengan ${Math.abs(nA - nB)}`);
              }
            }
            const rePaling = new RegExp(`${awalKata}${esc(A)} paling (banyak|sedikit)`).exec(kal);
            if (rePaling) {
              stat3.kalimat += 1;
              cek(nama.length >= 3, `${nm}: "paling" untuk tiga data atau lebih`);
              cek(nama.filter((B) => B !== A).every((B) => (rePaling[1] === "banyak" ? nA > peta.get(B).n : nA < peta.get(B).n)), `${nm}: "${A} paling ${rePaling[1]}" benar-benar ${rePaling[1] === "banyak" ? "terbanyak" : "tersedikit"}`);
            }
            for (const B of nama) {
              if (B <= A) continue;
              if (new RegExp(`${awalKata}(${esc(A)} dan ${esc(B)}|${esc(B)} dan ${esc(A)}) sama banyak`).test(kal)) {
                stat3.kalimat += 1;
                cek(nA === peta.get(B).n, `${nm}: "${A} dan ${B} sama banyak" benar (${nA} dan ${peta.get(B).n})`);
              }
            }
          }
          const mj = new RegExp(`jumlah semuanya(?: adalah)? (${NB})(?![a-z])`).exec(kal);
          if (mj) {
            stat3.kalimat += 1;
            cek(nama.length >= 2 && [...peta.values()].reduce((s, d) => s + d.n, 0) === nilaiNB(mj[1]), `${nm}: jumlah semuanya ${mj[1]} sama dengan penjumlahan semua kelompok (${[...peta.values()].map((d) => d.n).join("+")})`);
          }
        }
      });
    }
  }
  cek(stat3.kalimat >= 60, `kalimat baca data dihitung ulang cukup banyak (${stat3.kalimat})`);
  cek(stat3.turus >= 20 && stat3.tabel >= 20 && stat3.diagram >= 8 && stat3.kelompok >= 100, `kelompok, turus, tabel, dan diagram diperiksa cukup banyak (${stat3.kelompok}, ${stat3.turus}, ${stat3.tabel}, ${stat3.diagram})`);
  stat.aritmetika += stat3.kalimat;
  stat.benda += stat3.kelompok + stat3.turus + stat3.tabel + stat3.diagram + stat3.pemicu;

  // 4) Pemeriksaan isi tiap adegan (angka tepat, urutan, pilihan jawaban, dihitung ulang dari gambar).
  {
    const cnt = (objs, key) => objs.filter((o) => new RegExp(`^e${key}\\d+$`).test(o.id)).length;
    const strokes = (objs, key) => objs.filter((o) => new RegExp(`^t${key}-g\\d+$`).test(o.id)).length;
    const sorotItem = (objs, key) => objs.filter((o) => new RegExp(`^e${key}\\d+$`).test(o.id) && o.sorot).length;
    const lns = (objs, keys) => keys.map((q) => isiTeks(objs, `e${q}-ln`));
    const nmDari = (objs, keys) => keys.map((q) => isiTeks(objs, `e${q}-nm`));
    const pilih = (objs) => [1, 2, 3].map((q) => ({ t: isiTeks(objs, `c${q}-t`), s: ketemu(objs, `c${q}-k`)?.sorot })).filter((c) => c.t !== undefined);
    const dipilih = (objs) => pilih(objs).filter((c) => c.s).map((c) => c.t);
    // Mainan toko: kereta 6, mobil 4, boneka 5, bola 3 (jumlah semuanya delapan belas).
    const ber = di("toko-berantakan", 0);
    const rap = di("toko-rapi", 6);
    const sebar = ["a", "b", "c", "d"].map((q) => cnt(ber, q));
    sama(sebar, [6, 4, 5, 3], "toko berantakan: kereta 6, mobil 4, boneka 5, bola 3 berserakan");
    sama(["a", "b", "c", "d"].map((q) => cnt(rap, q)), sebar, "toko rapi: banyak tiap jenis sama dengan saat berantakan (hanya dipindah)");
    sama(nmDari(rap, ["a", "b", "c", "d"]), ["Kereta", "Mobil", "Boneka", "Bola"], "toko rapi: nama rak");
    for (const q of ["a", "b", "c", "d"]) {
      const it = rap.filter((o) => new RegExp(`^e${q}\\d+$`).test(o.id));
      cek(it.every((o, r) => o.y === it[0].y && o.x === it[0].x + r * 26 && o.isi === it[0].isi), `toko rapi: jenis ${q} tersusun dalam satu baris, satu jenis`);
    }
    cek(new Set(["a", "b", "c", "d"].map((q) => rap.find((o) => o.id === `e${q}0`).y)).size === 4, "toko rapi: tiap jenis di baris sendiri");
    sama(lns(di("hitung-kelompok", 5), ["a", "b", "c", "d"]), ["6", "4", "5", "3"], "hitung kelompok: enam, empat, lima, tiga");
    sama(lns(di("daftar-mainan", 1), ["a", "b", "c", "d"]), ["6", "4", "5", "3"], "daftar mainan: enam, empat, lima, tiga");
    sama(isiTeks(di("daftar-mainan", 6), "js-t0"), "jumlah semuanya: 18", "daftar mainan: jumlah semuanya delapan belas");
    sama(ketemu(di("daftar-mainan", 3), "ea-ln").sorot, true, "daftar mainan: kereta paling banyak disorot");
    sama(ketemu(di("daftar-mainan", 4), "ed-ln").sorot, true, "daftar mainan: bola paling sedikit disorot");
    // Bola Upe: merah 7, kuning 4, hijau 6 (jumlah semuanya tujuh belas).
    const bw = di("bola-warna", 1);
    sama([cnt(bw, "a"), cnt(bw, "b"), cnt(bw, "c"), lns(bw, ["a", "b", "c"])], [7, 4, 6, ["7", "4", "6"]], "bola warna: merah 7, kuning 4, hijau 6");
    sama(["ur0-t0", "ur1-t0", "ur2-t0"].map((q) => isiTeks(di("bola-warna", 5), q)), ["Merah", "Hijau", "Kuning"], "bola warna: urutan dari paling banyak: merah, hijau, kuning");
    // Turus: goresan sama dengan benda.
    const tm = di("turus-merah", 5);
    sama([cnt(tm, "a"), strokes(tm, "a"), isiTeks(tm, "ta-ln"), isiTeks(tm, "ea-ln")], [7, 7, "7", "7"], "turus merah: tujuh bola, tujuh goresan");
    sama([strokes(di("turus-merah", 2), "a"), strokes(di("turus-merah", 3), "a")], [4, 5], "turus merah: empat goresan tegak lalu goresan kelima miring");
    const tl = di("turus-lain", 4);
    sama([cnt(tl, "b"), strokes(tl, "b"), cnt(tl, "c"), strokes(tl, "c")], [4, 4, 6, 6], "turus lain: kuning empat, hijau enam");
    sama(sorotItem(tl, "c"), 2, "turus lain: dua bola hijau lebihnya disorot (selisih dua)");
    // Tabel menurun dan mendatar bola Upe.
    const tb = tabelDari(di("tabel-menurun", 4))[0];
    sama(tb.baris.map((b) => [b.nama, b.n]), [["Merah", 7], ["Kuning", 4], ["Hijau", 6]], "tabel menurun: merah 7, kuning 4, hijau 6");
    sama(tabelDari(di("tabel-mendatar", 2)).map((t) => t.jenis), ["menurun", "mendatar"], "tabel mendatar: dua tabel menurun dan mendatar");
    sama(tabelDari(di("tabel-mendatar", 2))[1].baris.map((b) => [b.nama, b.n]), [["Merah", 7], ["Kuning", 4], ["Hijau", 6]], "tabel mendatar: data sama dengan tabel menurun");
    sama(dipilih(di("tabel-mendatar", 5)), ["mendatar"], "tabel mendatar: kartu mendatar dipilih");
    // Hewan kesukaan: kucing 3 (Malosi, Upe, Wei), kelinci 2 (Kira, Halim), burung 1 (Igil).
    const hp = di("hewan-pilihan", 2);
    sama([cnt(hp, "a"), cnt(hp, "b"), cnt(hp, "c"), lns(hp, ["a", "b", "c"])], [3, 2, 1, ["3", "2", "1"]], "hewan pilihan: kucing 3, kelinci 2, burung 1");
    const anakDi = (q) => hp.filter((o) => /^pm-/.test(o.id) && hp.some((e) => new RegExp(`^e${q}\\d+$`).test(e.id) && e.x === o.x && Math.abs(e.y + 11 - o.y) < 2)).map((o) => o.isi);
    sama([anakDi("a"), anakDi("b"), anakDi("c")], [["Malosi", "Upe", "Wei"], ["Kira", "Halim"], ["Igil"]], "hewan pilihan: nama anak di bawah hewan pilihannya (enam anak)");
    const ht = tabelDari(di("hewan-tabel", 5))[0];
    sama(ht.baris.map((b) => [b.nama, b.n]), [["Kucing", 3], ["Kelinci", 2], ["Burung", 1]], "tabel hewan: kucing 3, kelinci 2, burung 1");
    sama(isiTeks(di("hewan-tabel", 5), "js-t0"), "jumlah semuanya: 6", "tabel hewan: jumlah semuanya enam (enam anak)");
    // Sama banyak: apel 5, jeruk 5, pisang 3 (jumlah semuanya tiga belas).
    const sb = di("sama-banyak", 1);
    sama([cnt(sb, "a"), cnt(sb, "b"), cnt(sb, "c")], [5, 5, 3], "sama banyak: apel 5, jeruk 5, pisang 3");
    sama(isiTeks(di("sama-banyak", 6), "js-t0"), "jumlah semuanya: 13", "sama banyak: jumlah semuanya tiga belas");
    // Selisih: merah 7, kuning 4; empat pasangan, tiga yang tidak berpasangan.
    const sl = di("selisih-bola", 2);
    const garisPr = sl.filter((o) => /^pr\d+$/.test(o.id));
    sama([cnt(sl, "a"), cnt(sl, "b"), garisPr.length, sorotItem(sl, "a")], [7, 4, 4, 3], "selisih: 7 merah, 4 kuning, 4 pasangan, 3 merah tanpa pasangan disorot");
    cek(garisPr.every((o, q) => o.x === ketemu(sl, `ea${q}`).x && o.x === ketemu(sl, `eb${q}`).x && o.x2 === 0 && o.y > ketemu(sl, `ea${q}`).y && o.y + o.y2 < ketemu(sl, `eb${q}`).y - 10), "selisih: tiap garis menghubungkan bola merah ke-i dengan bola kuning ke-i (lurus, tidak miring)");
    cek(sorotItem(sl, "a") === cnt(sl, "a") - cnt(sl, "b") && [4, 5, 6].every((q) => ketemu(sl, `ea${q}`).sorot), "selisih: yang disorot adalah bola merah ke-5 sampai ke-7 (7 dikurang 4 = 3 kelebihan)");
    sama(isiTeks(di("selisih-bola", 3), "sl-t0"), "selisihnya: 3", "selisih: kartu selisih tiga");
    // Jumlah semuanya: hitung satu per satu 1 sampai 17.
    const js = di("jumlah-semua", 3);
    const semua = ["a", "b", "c"].flatMap((q) => labelAngka(js, `e${q}`).map((o) => Number(o.isi)));
    sama(semua, Array.from({ length: 17 }, (_, q) => q + 1), "jumlah semua: angka 1 sampai 17 berurutan di seluruh bola");
    sama(["a", "b", "c"].map((q) => cnt(js, q)).reduce((s, n) => s + n, 0), 17, "jumlah semua: tujuh belas bola");
    sama(isiTeks(di("jumlah-semua", 4), "js-t0"), "jumlah semuanya: 17", "jumlah semua: kartu tujuh belas");
    // Latihan.
    const l1 = di("latihan-satu", 2);
    sama([cnt(l1, "a"), cnt(l1, "b"), cnt(l1, "c"), dipilih(l1)], [4, 7, 5, ["Pisang"]], "latihan 1: apel 4, pisang 7, jeruk 5; pisang dipilih (paling banyak)");
    sama(sorotItem(di("latihan-satu", 3), "b"), 7, "latihan 1: semua pisang disorot di jawaban");
    const l2 = di("latihan-dua", 2);
    sama([strokes(l2, "a"), dipilih(l2), pilih(l2).map((c) => c.t)], [8, ["8"], ["7", "8", "9"]], "latihan 2: delapan goresan; kartu delapan dipilih");
    sama([strokes(di("latihan-dua", 1), "a"), sorotItem(di("latihan-dua", 1), "a")], [8, 0], "latihan 2: lima dan tiga goresan");
    const l3 = di("latihan-tiga", 2);
    const tl3 = tabelDari(l3)[0];
    const selisih3 = tl3.baris.find((b) => b.nama === "Boneka").n - tl3.baris.find((b) => b.nama === "Mobil").n;
    sama([tl3.baris.map((b) => [b.nama, b.n]), dipilih(l3), selisih3], [[["Mobil", 5], ["Boneka", 8], ["Bola", 3]], ["3"], 3], "latihan 3: boneka lebih banyak tiga dari mobil; kartu tiga dipilih");
    // Metode luar.
    const lt = di("luar-turus", 4);
    sama([cnt(lt, "a"), strokes(lt, "a"), isiTeks(lt, "ea-ln"), isiTeks(lt, "ea-nm")], [8, 8, "8", "Kelereng biru"], "luar turus: delapan kelereng, delapan goresan");
    const ltt = di("luar-turus-terapan", 0);
    sama([strokes(ltt, "a"), strokes(ltt, "b"), isiTeks(di("luar-turus-terapan", 2), "ea-ln"), isiTeks(di("luar-turus-terapan", 2), "eb-ln")], [9, 6, "9", "6"], "luar turus terapan: kucing 9 goresan, burung 6 goresan");
    sama(dipilih(di("luar-turus-terapan", 3)), ["Kucing"], "luar turus terapan: kucing (9) lebih banyak dari burung (6)");
    const dg1 = tabelDari(di("luar-diagram", 5))[0];
    sama(dg1.baris.map((b) => [b.nama, b.pics.length, b.n]), [["Kucing", 5, 5], ["Kelinci", 3, 3], ["Burung", 4, 4]], "luar diagram: kucing 5, kelinci 3, burung 4 (satu gambar satu data)");
    const dg2 = tabelDari(di("luar-diagram-terapan", 1))[0];
    sama(dg2.baris.map((b) => [b.nama, b.pics.length, b.n]), [["Apel", 4, 4], ["Jeruk", 6, 6], ["Pisang", 2, 2]], "luar diagram terapan: apel 4, jeruk 6, pisang 2");
    sama(dipilih(di("luar-diagram-terapan", 2)), ["Pisang"], "luar diagram terapan: pisang paling sedikit dipilih");
    const bk = di("luar-banding", 1);
    sama([cnt(bk, "a"), cnt(bk, "b"), cnt(bk, "c"), lns(bk, ["a", "b", "c"])], [5, 3, 5, ["5", "3", "5"]], "luar banding: kucing 5, kelinci 3, burung 5");
    sama(sorotItem(di("luar-banding", 3), "a"), 2, "luar banding: dua kucing lebihnya disorot (selisih dua)");
    const bt = di("luar-banding-terapan", 0);
    sama([cnt(bt, "a"), cnt(bt, "b"), lns(bt, ["a", "b"])], [6, 4, ["6", "4"]], "luar banding terapan: mobil 6, boneka 4");
    sama([dipilih(di("luar-banding-terapan", 1)), sorotItem(di("luar-banding-terapan", 2), "a")], [["Mobil"], 2], "luar banding terapan: mobil lebih banyak, dua lebihnya disorot");
    sama(isiTeks(di("luar-banding-terapan", 3), "js-t0"), "jumlah semuanya: 10", "luar banding terapan: jumlah semuanya sepuluh");
    stat.benda += 80;
  }

  // Aturan pemilik: aplikasi belajar mandiri; tanpa instruksi kelompok, teman, kelas, atau buku.
  {
    const MANDIRI = /kerja kelompok|berkelompok|secara berkelompok|diskusi kelompok|sekelompok|kelompokmu|kelompok belajar|bersama kelompok|tanya teman|survei|karet gelang|uang tabungan|\bpaman\b|\btika\b|\bteman\w*|\bkawan\w*|sekawan|depan kelas|bersama kelas|seluruh kelas|\bkelas\b|berpasangan dengan (teman|kawan)|bekerja berpasangan|secara berpasangan|bermain bersama|bertanya kepada|buat ceritamu|buku|menulis di|menuliskan di|tulis di|tuliskan di|menggambar|gambarlah|gambar sendiri|\bbawa(lah)?\b|membawa|dibawa|\bkertas\b|\bpensil\b|\bpulpen\b|\bspidol\b|ambil (benda|pensil|kelereng|bola|sedotan|balon)|tangan (kiri|kanan)|\bjari\b|menyuruh|suruh|jengkal|telapak|\bdepa\b|penggaris|\bkoin\b|di sekitar|di rumah|di kelas|centimeter|\bmeter\b|kakimu|tanganmu|badanmu|\braba\w*|\bmeraba|\btubuh|\blengan|lingkari|coret|guru kelas|di rumah|orang tua|\bayah\b|\bibu guru|bapak guru/i;
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
  const DAFTAR = ["Mengelompokkan benda", "Turus dan tabel data", "Membandingkan data"];
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Mengelompokkan benda/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => DAFTAR.includes(t)), DAFTAR, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara) && !/\d/.test(DAFTAR.join(" ")), "sapaan materi: tanpa angka");
  const sapLuar = adegan(U, "sapaan");
  cek(/cara lain/i.test(L.teksTerlihat(akhirAdegan(sapLuar, 1)).join(" | ")) && /metode-luar|Metode luar/.test(sapLuar.sumber), "sapaan metode luar: pengumuman cara lain");
  const sumberRingkas = JSON.parse(readFileSync(new URL("../src/data/kelas1-bab8-ringkas.json", import.meta.url), "utf8")).subBab?.A;
  const sementara = new URL("../.tmp-k1b8s/A.json", import.meta.url);
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
    // Isi tabel dihitung ulang dari data mainan toko pada video materi: kolom banyak, urutan dari yang paling banyak, dan kata banyak, tengah, sedikit.
    sama(T.kolom, ["Banyak", "Urutan", "Kata"], "tabel susun: kolom banyak, urutan, kata");
    const rapi = akhirAdegan(adegan(M_VIDEO, "toko-rapi"));
    const data = ["a", "b", "c", "d"].map((q) => ({ nama: rapi.find((o) => o.id === `e${q}-nm`).isi, n: rapi.filter((o) => new RegExp(`^e${q}\\d+$`).test(o.id)).length }));
    const ORD = ["pertama", "kedua", "ketiga", "keempat", "kelima"];
    cek(T.baris.length === data.length && data.every((d) => T.baris.some((b) => b.label === d.nama)), "tabel susun: baris sama dengan jenis mainan di toko");
    const urut = [...data].sort((p, q) => q.n - p.n);
    cek(new Set(data.map((d) => d.n)).size === data.length, "tabel susun: banyak tiap jenis berbeda supaya urutan pasti");
    for (const d of data) {
      const b = T.baris.find((x) => x.label === d.nama);
      const r = urut.indexOf(d);
      cek(!!b && b.sel[0] === String(d.n) && b.sel[1] === ORD[r] && b.sel[2] === (r === 0 ? "banyak" : r === urut.length - 1 ? "sedikit" : "tengah"), `tabel susun: baris ${d.nama} (banyak ${d.n}, urutan ${ORD[r]}) dihitung ulang dari toko`);
    }
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 8)), "tabel susun: sel pendek supaya margin teks >= 5 px di 405 px");
    cek(data.reduce((t, d) => t + d.n, 0) === 18, "tabel susun: jumlah semua mainan delapan belas (tidak lebih dari dua puluh)");
    const KATA_LARANG = /buku|halaman|kunci|kerja kelompok|berkelompok|\bteman|kawan|kelas\b|kertas|pensil|\bbawa\b|menggambar|menulis di|depan kelas|luas|keliling|di rumah|survei|karet gelang|uang tabungan|di sekitar|\bpaman\b|\btika\b/i;
    cek(!KATA_LARANG.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: tanpa kata terlarang dan tanpa kelompok, teman, kelas, buku, kertas, pensil");
    cek(peta.every((s) => ![...s.teks, ...(s.ikon ?? "")].some((c) => c.codePointAt(0) > 0x1fa95)), "peta susun: emoji paling tinggi Emoji 12");
  } else cek(false, "peta dan tabel susun: .tmp-k1b8s/A.json atau kelas1-bab8-ringkas.json subBab.A.petaSusun ada");
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k1b8A-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k1b8A-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k1b8A sendiri (${impor.join(", ")})`);
  }
  // Emoji dalam data teks gambar juga paling tinggi Emoji 12 (diperiksa pada gambar yang diputar).
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${v.id}/${a.id}: emoji gambar paling tinggi Emoji 12`);
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k1b8a.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|naskah-k1b/.test(pembungkus) && /VIDEO_MATERI_K1B8A/.test(pembungkus) && /VIDEO_LUAR_K1B8A/.test(pembungkus) && /export function VideoK1B8A/.test(pembungkus) && /daftar-video-cerita/.test(pembungkus), "video-k1b8a.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k1b8a.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k1b8A.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k1b8A.mjs: akhir baris LF");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit diputar)`);
}
console.log(`Pemeriksaan: ${stat.hitung} deret hitungan, ${jumlahNama} nama bilangan tampak sebagai angka, ${stat.aritmetika} kalimat bilangan, ${stat.benda} pemeriksaan benda dan bingkai`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
