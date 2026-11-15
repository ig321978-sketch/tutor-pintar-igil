// Uji Story Kelas 1 Bab 7 Sub-Bab A (Membandingkan Panjang dan Tinggi): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar (nama metode hanya Indonesia),
// hanya bilangan sampai dua puluh (tanpa kali, bagi, tambah, kurang, bersusun, bilangan lebih besar, satuan baku), hitungan satu per satu (angka berurutan, dekat bendanya, sama dengan bilangan yang diucapkan),
// nama bilangan sepuluh sampai dua puluh yang diucapkan tampak sebagai angka, batang kotak satuan (rapat, lurus, satu jenis satuan, garis awal sama, tanah sama), tulisan panjang sama dengan jumlah satuan,
// setiap kalimat perbandingan (lebih panjang/pendek/tinggi/rendah, sama, paling, selisih) di suara dihitung ulang dari batang yang digambar, urutan, pilihan jawaban,
// aturan pemilik (belajar mandiri digital: tanpa kelompok, teman, depan kelas, buku, menulis atau menggambar di buku, membawa benda nyata),
// emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k1b7A.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k1b7A-video.ts");
const U1 = await import("../src/components/modul/story/k1b7A-luar-1.ts");
const B = await import("../src/components/modul/story/k1b7A-bantu.ts");

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
const VIDEO = [V.VIDEO_MATERI_K1B7A, V.VIDEO_LUAR_K1B7A];
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
const M_VIDEO = V.VIDEO_MATERI_K1B7A;
const U = V.VIDEO_LUAR_K1B7A;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /Ulangi Satuan Panjang|Banding Panjang|Satuan Tak Baku|metode luar|metode dari luar/i;
const NAMA_INGGRIS = /Iterate Unit|Compare Length|Nonstandard|Direct comparison|Measurement progression/i;
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
      cek(!/Uji Kompetensi|Pengayaan|Ayo Berlatih|Ayo Berdiskusi|Ayo Berefleksi|Ayo Mengingat|Ayo Berkomunikasi|Ayo Berpikir|Ayo Berkarya|Ayo Bermain|soal \d|Soal \d|Eksplorasi|Refleksi/.test(semua.join(" | ")), `${v.id}/${a.id}: latihan disajikan sebagai Latihan, tanpa istilah buku`);
      // Tokoh hanya enam tokoh tetap (Malosi, Kira, Upe, Wei, Halim, Igil): tanpa nama lain dari data sumber.
      cek(!/\b(Tika|Ibu|Ayah|Bapak|Budi|Ani|Doni|Sinta|Dewi|Rudi|Nina|Andi|Siti)\b/.test(semua.join(" | ")), `${v.id}/${a.id}: hanya enam tokoh tetap`);
    }
  }
  cek(M_VIDEO.subjudul === "Materi kurikulum" && U.subjudul === "Tiga metode luar", "subjudul video: Materi kurikulum dan Tiga metode luar");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46), "video materi: label sumber berbentuk Materi: ... dan pendek");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "video metode luar: label sumber metode luar atau ringkasan, pendek");
  cek(M_VIDEO.id === "k1b7A-materi" && U.id === "k1b7A-luar", "id video k1b7A-materi dan k1b7A-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,pita-kira,kata-panjang,sama-panjang,garis-awal,tinggi-pohon,sama-tinggi,paling-panjang,urutkan,paling-tinggi,kupu-kupu,detektif,latihan-satu,latihan-dua,latihan-tiga,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-ulang,luar-ulang-terapan,luar-banding,luar-banding-terapan,luar-satuan,luar-satuan-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 3 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 3 lalu penutup");
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-ulang", "luar-ulang-terapan", "luar-banding", "luar-banding-terapan", "luar-satuan", "luar-satuan-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  for (const kata of ["Latihan", "Igil", "Malosi", "Halim", "Kira", "Wei", "Upe", "pita", "stik", "tali", "pohon", "kupu-kupu", "lebih panjang", "lebih pendek", "sama panjang", "lebih tinggi", "lebih rendah", "sama tinggi", "paling panjang", "paling pendek", "paling tinggi", "paling rendah", "garis awal", "kotak satuan", "detektif", "urutan"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
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

  // 3) Batang satuan: kotak berjajar rapat, lurus, satu ukuran, mulai dari garis awal (mendatar) atau tanah (menegak); tulisan panjang sama dengan jumlah satuan.
  const CW0 = 18;
  const GD0 = 172;
  const UNIT = "kotak|klip|stik|sedotan|kancing|jepit";
  const kelompok = (objs) => {
    const peta = new Map();
    const dapat = (key) => {
      if (!peta.has(key)) peta.set(key, { key, arah: key[0] === "u" ? "H" : "V", sel: [], benda: null, nm: null, ln: null });
      return peta.get(key);
    };
    for (const o of objs) {
      if (o.t === "kotak") {
        const m = /^(u[a-z]{1,2}|v[a-z]{1,2})(\d+)$/.exec(o.id);
        if (m) dapat(m[1]).sel.push({ i: Number(m[2]), o });
        const b = /^(u[a-z]{1,2})-b$/.exec(o.id);
        if (b) dapat(b[1]).benda = o;
      } else if (o.t === "teks") {
        const m = /^(u[a-z]{1,2}|v[a-z]{1,2})-(nm|ln)$/.exec(o.id);
        if (m) dapat(m[1])[m[2]] = o;
      }
    }
    for (const g of peta.values()) g.sel.sort((p, q) => p.i - q.i);
    return [...peta.values()];
  };
  const ukuran = (g) => (g.sel.length ? g.sel.length : g.benda ? g.benda.w / CW0 : 0);
  const lebarSatuan = (g) => (g.sel.length ? g.sel[0].o.w : CW0);
  const awalH = (g) => (g.sel.length ? g.sel[0].o.x : g.benda?.x);
  const stat2 = { batang: 0, banding: 0, label: 0 };
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((kt, i) => {
        const objs = akhirAdegan(a, i);
        const nm = `${v.id}/${a.id}#${i + 1}`;
        const gs = kelompok(objs);
        const ga = objs.find((o) => o.id === "ga");
        for (const g of gs) {
          stat2.batang += 1;
          const n = g.sel.length;
          if (n) {
            cek(g.sel.every((s, q) => s.i === q), `${nm} ${g.key}: nomor kotak satuan berurutan`);
            cek(g.sel.every((s) => s.o.w === g.sel[0].o.w && s.o.h === g.sel[0].o.h), `${nm} ${g.key}: satu jenis satuan (semua kotak sama besar)`);
            if (g.arah === "H") {
              cek(g.sel.every((s, q) => s.o.y === g.sel[0].o.y && s.o.x === g.sel[0].o.x + q * s.o.w), `${nm} ${g.key}: kotak berjajar rapat, tanpa celah, tanpa tumpang tindih, tidak miring`);
              if (g.benda) cek(g.benda.x === g.sel[0].o.x && g.benda.w === n * g.sel[0].o.w, `${nm} ${g.key}: ujung benda sejajar ujung kotak terakhir`);
            } else {
              cek(g.sel.every((s, q) => s.o.x === g.sel[0].o.x && s.o.y === g.sel[0].o.y - q * s.o.h), `${nm} ${g.key}: kotak bertumpuk rapat dari bawah, tegak`);
              cek(g.sel[0].o.y + g.sel[0].o.h === GD0, `${nm} ${g.key}: kotak pertama berdiri di tanah`);
            }
          } else if (g.benda) cek(g.benda.w % CW0 === 0 && g.benda.w / CW0 <= 20, `${nm} ${g.key}: panjang benda kelipatan satu kotak satuan`);
          cek(ukuran(g) >= 1 && ukuran(g) <= 20, `${nm} ${g.key}: ukuran paling banyak dua puluh`);
          if (g.ln) {
            stat2.label += 1;
            const m = new RegExp(`^(\\d+) (${UNIT})$`).exec(g.ln.isi ?? "");
            cek(!!m && Number(m[1]) === ukuran(g), `${nm} ${g.key}: tulisan panjang "${g.ln.isi}" sama dengan ${ukuran(g)} satuan yang digambar`);
          }
        }
        const H = gs.filter((g) => g.arah === "H");
        const Vt = gs.filter((g) => g.arah === "V");
        const sengajaBeda = a.id === "garis-awal" && i < 2;
        if (H.length >= 2 && !sengajaBeda) cek(H.every((g) => awalH(g) === awalH(H[0])), `${nm}: semua batang mendatar mulai dari garis awal yang sama`);
        if (ga && !sengajaBeda) cek(H.every((g) => awalH(g) === ga.x) && ga.x2 === 0, `${nm}: garis awal menegak tepat di awal semua batang`);
        if (Vt.length) cek(Vt.every((g) => g.sel.length === 0 || g.sel[0].o.y + g.sel[0].o.h === GD0), `${nm}: semua batang menegak berdiri di tanah yang sama`);
        const gd = objs.find((o) => o.id === "gd");
        if (gd) cek(gd.y === GD0 && gd.y2 === 0, `${nm}: tanah mendatar di tempatnya`);

        // Kalimat perbandingan di suara dihitung ulang dari batang yang digambar.
        const bernama = gs.filter((g) => g.nm && ukuran(g) > 0).map((g) => ({ g, nama: (g.nm.isi ?? "").toLowerCase(), n: ukuran(g), cw: lebarSatuan(g) }));
        if (bernama.length === 0) return;
        const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const NB = NAMA.slice(1).sort((p, q) => q.length - p.length).join("|");
        const kalimat = kt.suara.toLowerCase().split(/(?<=[.!?])\s+/);
        for (const kal of kalimat) {
          for (const A of bernama) {
            const reLebih = new RegExp(`(?:^|\\s)${esc(A.nama)}(?: terbang)? lebih (panjang|pendek|tinggi|rendah)(?: (${NB}) (${UNIT}))? dari (.*)$`).exec(kal);
            if (reLebih) {
              const [, kata, selisih, , kanan] = reLebih;
              const lawan = bernama.filter((B) => B !== A && kanan.includes(B.nama));
              cek(lawan.length >= 1, `${nm}: "${kal}" menyebut benda pembanding yang tergambar`);
              cek(kata === "panjang" ? A.g.arah === "H" : kata === "tinggi" || kata === "rendah" ? A.g.arah === "V" : true, `${nm}: kata ${kata} cocok dengan arah batang`);
              for (const B of lawan) {
                stat2.banding += 1;
                cek(A.cw === B.cw && A.g.arah === B.g.arah, `${nm}: "${A.nama}" dan "${B.nama}" memakai satuan yang sama`);
                const lebihBesar = kata === "panjang" || kata === "tinggi";
                cek(lebihBesar ? A.n > B.n : A.n < B.n, `${nm}: "${A.nama} lebih ${kata} dari ${B.nama}" benar (${A.n} dan ${B.n})`);
                if (selisih) cek(Math.abs(A.n - B.n) === NAMA.indexOf(selisih), `${nm}: selisih ${selisih} sama dengan ${Math.abs(A.n - B.n)}`);
              }
            }
            const reSama = new RegExp(`(?:^|\\s)${esc(A.nama)} sama (panjang|tinggi) dengan (.*)$`).exec(kal);
            if (reSama) {
              const lawan = bernama.filter((B) => B !== A && reSama[2].includes(B.nama));
              cek(lawan.length >= 1, `${nm}: "${kal}" menyebut benda pembanding yang tergambar`);
              for (const B of lawan) {
                stat2.banding += 1;
                cek(A.cw === B.cw && A.n === B.n, `${nm}: "${A.nama}" sama ${reSama[1]} dengan "${B.nama}" (${A.n} dan ${B.n})`);
              }
            }
            const rePaling = new RegExp(`(?:^|\\s)${esc(A.nama)}(?: terbang)? paling (panjang|pendek|tinggi|rendah)`).exec(kal);
            if (rePaling) {
              const sejenis = bernama.filter((B) => B.g.arah === A.g.arah);
              stat2.banding += 1;
              cek(sejenis.length >= 3 && sejenis.every((B) => B.cw === A.cw), `${nm}: "paling" untuk tiga benda atau lebih dengan satuan yang sama`);
              const besar = rePaling[1] === "panjang" || rePaling[1] === "tinggi";
              cek(sejenis.filter((B) => B !== A).every((B) => (besar ? A.n > B.n : A.n < B.n)), `${nm}: "${A.nama} paling ${rePaling[1]}" benar-benar ${besar ? "terbesar" : "terkecil"}`);
            }
          }
        }
      });
    }
  }
  cek(stat2.banding >= 30, `pernyataan perbandingan dihitung ulang cukup banyak (${stat2.banding})`);
  stat.benda += stat2.batang;
  stat.aritmetika += stat2.banding;

  // 4) Pemeriksaan isi tiap adegan (angka tepat, urutan, pilihan jawaban).
  {
    const cnt = (objs, key) => ukuran(kelompok(objs).find((g) => g.key === key));
    const emas = (objs, p) => daftarId(objs, new RegExp(`^${p}\\d+$`)).filter((c) => c.warna === "#FFC800").map((c) => c.id);
    sama([cnt(di("pita-kira", 6), "ua"), cnt(di("pita-kira", 6), "ub"), emas(di("pita-kira", 6), "ua")], [9, 6, ["ua6", "ua7", "ua8"]], "pita: Kira sembilan, Upe enam, tiga kotak lebihnya emas");
    sama(ketemu(di("pita-kira", 1), "ga")?.x, 64, "pita: garis awal di awal kedua pita");
    sama(isiTeks(di("pita-kira", 6), "kc-t0"), "lebihnya: 3 kotak", "pita: kartu lebihnya tiga");
    sama([cnt(di("sama-panjang", 3), "ua"), cnt(di("sama-panjang", 3), "ub")], [7, 7], "sama panjang: dua stik tujuh kotak");
    sama(ketemu(di("sama-panjang", 4), "c1-k").sorot, true, "sama panjang: kartu sama panjang dipilih");
    sama([daftarId(di("garis-awal", 1), /^ub\d$/).map((c) => c.x)[0], ketemu(di("garis-awal", 1), "ga")], [100, undefined], "garis awal: tali hijau bergeser dan belum ada garis awal");
    sama([daftarId(di("garis-awal", 2), /^ub\d$/).map((c) => c.x)[0], ketemu(di("garis-awal", 2), "ga")?.x], [64, 64], "garis awal: tali hijau digeser ke garis awal");
    sama([cnt(di("garis-awal", 3), "ua"), cnt(di("garis-awal", 3), "ub")], [6, 6], "garis awal: dua tali enam kotak");
    sama([cnt(di("tinggi-pohon", 5), "va"), cnt(di("tinggi-pohon", 5), "vb"), emas(di("tinggi-pohon", 5), "va")], [8, 5, ["va5", "va6", "va7"]], "tinggi pohon: Malosi delapan, Upe lima, tiga kotak lebihnya");
    const st = di("sama-tinggi", 3);
    const puncak = (objs, key) => kelompok(objs).find((g) => g.key === key).sel.at(-1).o.y;
    sama([cnt(st, "vb"), cnt(st, "vc"), puncak(st, "vb") === puncak(st, "vc"), ketemu(st, "gu").y === puncak(st, "vb")], [6, 6, true, true], "sama tinggi: pohon B dan C enam kotak, ujung atas sejajar");
    sama([cnt(di("sama-tinggi", 4), "va"), emas(di("sama-tinggi", 4), "va")], [8, ["va6", "va7"]], "sama tinggi: pohon A delapan, dua kotak lebihnya");
    sama(["ua", "ub", "uc", "ud"].map((q) => cnt(di("paling-panjang", 1), q)), [5, 9, 3, 7], "paling panjang: lima, sembilan, tiga, tujuh");
    const urut = (ke) => kelompok(di("urutkan", ke)).sort((p, q) => p.sel[0].o.y - q.sel[0].o.y).map((g) => ukuran(g));
    sama([urut(0), urut(1), urut(3), urut(4)], [[5, 9, 3, 7], [3, 5, 9, 7], [3, 5, 7, 9], [3, 5, 7, 9]], "urutkan: tali berpindah sampai berurutan dari yang paling pendek");
    const p = di("paling-tinggi", 0);
    sama([["va", "vb", "vc", "vd"].map((q) => cnt(p, q)), puncak(p, "vb") === puncak(p, "vc")], [[8, 6, 6, 4], true], "paling tinggi: A delapan, B dan C enam, D empat");
    sama(["va", "vb", "vc"].map((q) => cnt(di("kupu-kupu", 1), q)), [3, 5, 8], "kupu-kupu: terbang tiga, lima, delapan kotak");
    sama(["ua", "ub", "uc"].map((q) => cnt(di("detektif", 3), q)), [4, 6, 8], "detektif: hijau empat, merah enam, biru delapan");
    sama([cnt(di("latihan-satu", 1), "ua"), cnt(di("latihan-satu", 1), "ub"), ketemu(di("latihan-satu", 2), "c1-k").sorot, isiTeks(di("latihan-satu", 2), "c1-t")], [8, 5, true, "Halim"], "latihan 1: Halim delapan lebih panjang dari Wei lima");
    sama(["va", "vb", "vc"].map((q) => cnt(di("latihan-dua", 1), q)), [7, 4, 9], "latihan 2: tujuh, empat, sembilan kotak");
    sama(daftarId(di("latihan-dua", 3), /^vb\d$/).every((c) => c.sorot), true, "latihan 2: pohon Upe yang paling rendah disorot");
    const l3 = di("latihan-tiga", 3);
    const baris3 = kelompok(l3).sort((q, r) => q.sel[0].o.y - r.sel[0].o.y);
    sama([baris3.map((g) => ukuran(g)), [1, 2, 3].map((q) => isiTeks(l3, `r${q}`))], [[6, 3, 9], ["1", "2", "3"]], "latihan 3: tiga stik dan nomor urutan");
    const nomorY = [1, 2, 3].map((q) => ketemu(l3, `r${q}`).y);
    const urutKecil = kelompok(l3).sort((q, r) => ukuran(q) - ukuran(r)).map((g) => g.sel[0].o.y + 11);
    sama(nomorY, urutKecil, "latihan 3: nomor satu sampai tiga menempel pada stik dari yang paling pendek");
    // Metode luar.
    const u1 = di("luar-ulang", 3);
    const gu = kelompok(u1).find((g) => g.key === "ua");
    sama([ukuran(gu), gu.sel[0].o.w, gu.benda.w, isiTeks(u1, "ua-ln")], [7, 18, 126, "7 klip"], "luar ulang: pita merah tujuh klip, benda sepanjang tujuh satuan");
    sama([cnt(di("luar-ulang-terapan", 1), "ua"), cnt(di("luar-ulang-terapan", 1), "ub"), isiTeks(di("luar-ulang-terapan", 1), "ua-ln"), isiTeks(di("luar-ulang-terapan", 1), "ub-ln")], [6, 9, "6 klip", "9 klip"], "luar ulang terapan: enam dan sembilan klip");
    const ut = di("luar-ulang-terapan", 3);
    sama([["c1-t", "c2-t", "c3-t"].map((q) => isiTeks(ut, q)), ketemu(ut, "c2-k").sorot], [["2", "3", "4"], true], "luar ulang terapan: selisih tiga dipilih");
    const bd = kelompok(di("luar-banding", 0));
    const bs = ketemu(di("luar-banding", 2), "ua-s");
    sama([bd.map((g) => ukuran(g)), bs.x + bs.w === 64 + 9 * 18, bs.w], [[9, 6], true, 54], "luar banding: sembilan dan enam; bagian lebih panjang tiga kotak");
    sama(["ua", "ub", "uc"].map((q) => cnt(di("luar-banding-terapan", 0), q)), [8, 3, 5], "luar banding terapan: delapan, tiga, lima");
    sama(ketemu(di("luar-banding-terapan", 3), "c1-k").sorot, true, "luar banding terapan: kartu hijau dipilih");
    const s2 = kelompok(di("luar-satuan", 1));
    const s3 = kelompok(di("luar-satuan", 2));
    const kl = s3.find((g) => g.key === "ua");
    const sk = s3.find((g) => g.key === "ub");
    sama([s2.find((g) => g.key === "ua").sel.length, kl.sel.length * kl.sel[0].o.w, sk.sel.length * sk.sel[0].o.w, sk.sel[0].o.w, isiTeks(di("luar-satuan", 2), "ub-ln")], [8, 144, 144, 36, "4 stik"], "luar satuan: delapan klip sama panjang dengan empat stik");
    sama([cnt(di("luar-satuan-terapan", 1), "ua"), cnt(di("luar-satuan-terapan", 1), "ub"), isiTeks(di("luar-satuan-terapan", 1), "ua-ln"), isiTeks(di("luar-satuan-terapan", 1), "ub-ln")], [5, 7, "5 sedotan", "7 sedotan"], "luar satuan terapan: lima dan tujuh sedotan");
    sama(emas(di("luar-satuan-terapan", 2), "ub"), ["ub5", "ub6"], "luar satuan terapan: dua sedotan lebihnya emas");
    stat.benda += 40;
  }

  // Aturan pemilik: aplikasi belajar mandiri; tanpa instruksi kelompok, teman, kelas, atau buku.
  {
    const MANDIRI = /kelompok|\bteman\w*|\bkawan\w*|sekawan|depan kelas|bersama kelas|seluruh kelas|\bkelas\b|berpasangan dengan (teman|kawan)|bekerja berpasangan|secara berpasangan|bermain bersama|bertanya kepada|buat ceritamu|buku|menulis di|menuliskan di|tulis di|tuliskan di|menggambar|gambarlah|gambar sendiri|\bbawa(lah)?\b|membawa|dibawa|\bkertas\b|\bpensil\b|\bpulpen\b|\bspidol\b|ambil (benda|pensil|kelereng|bola|sedotan|balon)|tangan (kiri|kanan)|\bjari\b|menyuruh|suruh|jengkal|telapak|\bdepa\b|penggaris|\bkoin\b|di sekitar|di rumah|di kelas|centimeter|\bmeter\b|kakimu|tanganmu|badanmu|\braba\w*|\bmeraba|\btubuh|\blengan|lingkari|coret|guru kelas|di rumah|orang tua|\bayah\b|\bibu guru|bapak guru/i;
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
  const DAFTAR = ["Panjang dan tinggi dua benda", "Paling panjang dan urutan", "Garis awal yang sama"];
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Panjang dan tinggi dua benda/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => DAFTAR.includes(t)), DAFTAR, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara) && !/\d/.test(DAFTAR.join(" ")), "sapaan materi: tanpa angka");
  const sapLuar = adegan(U, "sapaan");
  cek(/cara lain/i.test(L.teksTerlihat(akhirAdegan(sapLuar, 1)).join(" | ")) && /metode-luar|Metode luar/.test(sapLuar.sumber), "sapaan metode luar: pengumuman cara lain");
  const sumberRingkas = JSON.parse(readFileSync(new URL("../src/data/kelas1-bab7-ringkas.json", import.meta.url), "utf8")).subBab?.A;
  const sementara = new URL("../.tmp-k1b7s/A.json", import.meta.url);
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
    // Isi tabel dihitung ulang: kolom ukuran ("N kotak"), urutan dari yang paling pendek, dan kata pendek, tengah, panjang.
    sama(T.kolom, ["Ukuran", "Urutan", "Kata"], "tabel susun: kolom ukuran, urutan, kata");
    const ORD = ["pertama", "kedua", "ketiga", "keempat", "kelima"];
    const ukur = T.baris.map((b) => ({ n: Number(/^(\d+) kotak$/.exec(b.sel[0])?.[1]), b }));
    cek(ukur.every((u) => u.n >= 1 && u.n <= 20) && new Set(ukur.map((u) => u.n)).size === ukur.length, "tabel susun: ukuran kotak berbeda, satu sampai dua puluh");
    const urutan = [...ukur].sort((p, q) => p.n - q.n);
    cek(urutan.every((u, r) => u.b.sel[1] === ORD[r] && u.b.sel[2] === (r === 0 ? "pendek" : r === urutan.length - 1 ? "panjang" : "tengah")), "tabel susun: urutan dan kata (pendek, tengah, panjang) sesuai ukuran");
    // Margin teks sel di lebar 405 px: sel pendek (paling banyak delapan huruf) supaya margin teks >= 5 px.
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 8)), "tabel susun: sel pendek supaya margin teks >= 5 px di 405 px");
    const KATA_LARANG = /buku|halaman|kunci|kelompok|\bteman|kawan|kelas\b|kertas|pensil|\bbawa\b|menggambar|menulis di|depan kelas|luas|keliling|di rumah|jengkal|telapak|\bdepa\b|penggaris|\bkoin\b|di sekitar|centimeter|\bmeter\b/i;
    cek(!KATA_LARANG.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: tanpa kata terlarang dan tanpa kelompok, teman, kelas, buku, kertas, pensil");
    cek(peta.every((s) => ![...s.teks, ...(s.ikon ?? "")].some((c) => c.codePointAt(0) > 0x1fa95)), "peta susun: emoji paling tinggi Emoji 12");
  } else cek(false, "peta dan tabel susun: .tmp-k1b7s/A.json atau kelas1-bab7-ringkas.json subBab.A.petaSusun ada");
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k1b7A-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k1b7A-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k1b7A sendiri (${impor.join(", ")})`);
  }
  // Emoji dalam data teks gambar juga paling tinggi Emoji 12 (diperiksa pada gambar yang diputar).
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${v.id}/${a.id}: emoji gambar paling tinggi Emoji 12`);
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k1b7a.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|naskah-k1b/.test(pembungkus) && /VIDEO_MATERI_K1B7A/.test(pembungkus) && /VIDEO_LUAR_K1B7A/.test(pembungkus) && /export function VideoK1B7A/.test(pembungkus) && /daftar-video-cerita/.test(pembungkus), "video-k1b7a.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k1b7a.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k1b7A.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k1b7A.mjs: akhir baris LF");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit diputar)`);
}
console.log(`Pemeriksaan: ${stat.hitung} deret hitungan, ${jumlahNama} nama bilangan tampak sebagai angka, ${stat.aritmetika} kalimat bilangan, ${stat.benda} pemeriksaan benda dan bingkai`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
