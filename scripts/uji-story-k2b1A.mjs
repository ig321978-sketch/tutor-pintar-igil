// Uji Story Kelas 2 Bab 1 Sub-Bab A (Menghitung, Membaca, dan Menulis Bilangan sampai dengan 50): dua video (materi kurikulum dan metode luar) dengan mesin animasi baru.
// Video diputar bergaya guru: suara, teks terlihat, sumber, judul adegan, dan subjudul tanpa penyebutan buku (kata terlarang diperiksa pada adegan yang diputar).
// Memeriksa: pemicu kata, suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar (nama metode hanya Indonesia),
// hanya bilangan sampai lima puluh (tanpa kali, bagi, kurang, bersusun; "ditambah" hanya dalam kalimat puluhan ditambah satuan yang dihitung ulang), hitungan satu per satu (angka berurutan,
// dekat bendanya, sama dengan bilangan yang diucapkan), nama bilangan sepuluh sampai lima puluh yang diucapkan tampak sebagai angka, data di layar dihitung ulang dari gambar (benda per kelompok,
// kotak sepuluh: benda ke-i tepat di petak i mod 10 pada kotak i div 10; angka jumlah sampai kotak; batang puluhan dan kubus satuan: nilai = 10 x batang + kubus; jalur bilangan naik satu demi satu;
// garis bilangan berselisih sepuluh; daftar lambang dan nama; sesudah dan sebelum berselisih satu), setiap kalimat bilangan di suara (ada N benda, N batang puluhan, N itu P puluhan dan S satuan,
// ditulis angka P lalu angka S, dan seterusnya) dicocokkan dengan gambar, pilihan jawaban, aturan pemilik (belajar mandiri digital: tanpa kerja kelompok, survei teman, depan kelas, buku,
// menulis atau menggambar di buku, membawa benda nyata, loker, Ibu guru), emoji paling tinggi Emoji 12, dan kemurnian berkas.
// Jalankan: node --no-warnings scripts/uji-story-k2b1A.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k2b1A-video.ts");
const U1 = await import("../src/components/modul/story/k2b1A-luar-1.ts");
const B = await import("../src/components/modul/story/k2b1A-bantu.ts");

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
const VIDEO = [V.VIDEO_MATERI_K2B1A, V.VIDEO_LUAR_K2B1A];
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
const M_VIDEO = V.VIDEO_MATERI_K2B1A;
const U = V.VIDEO_LUAR_K2B1A;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const NAMA_LUAR = /Bingkai Sepuluh|Hitung Sepuluh-Sepuluh|Garis Bilangan|metode luar|metode dari luar/i;
const NAMA_INGGRIS = /Ten Frame|Number Line|Skip Counting|Count On|Counting On|Place Value|Estimation|Number Bond/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar (jalur bilangan dan kotak sepuluh adalah istilah materi, boleh)");
  for (const m of U1.NAMA_METODE_ID) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE_ID, ["Bingkai Sepuluh", "Hitung Sepuluh-Sepuluh", "Garis Bilangan"], "nama Indonesia metode luar");
  cek(!NAMA_INGGRIS.test(materi) && !NAMA_INGGRIS.test(luar), "nama metode hanya bahasa Indonesia (tanpa Ten Frame, Number Line, Skip Counting)");
  // Video diputar sebagai guru yang mengajar: tidak ada penyebutan sumber buku di suara, teks terlihat, label sumber, judul adegan, dan subjudul.
  const TERLARANG = /buku|panduan guru|hlm|halaman|kunci|rubrik|salah ketik|salah cetak|tambahan video|contoh video|temuan|pertemuan|loker|ibu guru|singapura/i;
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
      cek(!/\b(Tika|Paman|Ibu|Ayah|Bapak|Budi|Ani|Doni|Sinta|Dewi|Rudi|Nina|Andi|Siti|Bu Guru|Pak Guru)\b/.test(semua.join(" | ")), `${v.id}/${a.id}: hanya enam tokoh tetap`);
    }
  }
  cek(M_VIDEO.subjudul === "Materi kurikulum" && U.subjudul === "Tiga metode luar", "subjudul video: Materi kurikulum dan Tiga metode luar");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46), "video materi: label sumber berbentuk Materi: ... dan pendek");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "video metode luar: label sumber metode luar atau ringkasan, pendek");
  cek(M_VIDEO.id === "k2b1A-materi" && U.id === "k2b1A-luar", "id video k2b1A-materi dan k2b1A-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,rak-tas,hitung-satu,kotak-sepuluh,sepuluh-sepuluh-enam,puluhan-satuan,baca-bilangan,tulis-bilangan,daftar-bilangan,menghitung-maju,menghitung-mundur,sebelum-sesudah,tebak-buktikan,latihan-satu,latihan-dua,latihan-tiga,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-bingkai,luar-bingkai-terapan,luar-sepuluh,luar-sepuluh-terapan,luar-garis,luar-garis-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 3 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 3 lalu penutup");
  const ids = U.adegan.map((a) => a.id);
  cek(["luar-bingkai", "luar-bingkai-terapan", "luar-sepuluh", "luar-sepuluh-terapan", "luar-garis", "luar-garis-terapan"].every((i) => ids.includes(i)), "video metode luar: konsep dan penerapan untuk tiap metode");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  for (const kata of ["Latihan", "Igil", "Malosi", "Halim", "Kira", "Wei", "Upe", "tas", "kelereng", "apel", "satu per satu", "kotak sepuluh", "puluhan", "satuan", "batang", "kubus", "dibaca", "ditulis", "jalur bilangan", "maju", "mundur", "sebelum", "sesudah", "menebak", "buktikan", "patokan", "dua angka"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  // Hanya bilangan sampai lima puluh dan satuan tidak baku di layar: tanpa kali, bagi, kurang, bilangan lebih dari lima puluh, bersusun, satuan baku (penggaris, sentimeter, meter), atau rumus. "ditambah" hanya dalam pola yang dihitung ulang.
  const BOCOR = /dikali|perkalian|pembagian|dibagi|dikurangi|pengurangan|\bratus\b|\bribu\b|lima puluh (satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan)|(enam|tujuh|delapan|sembilan) puluh|\bluas\b|keliling|rumus|volume|sentimeter|centimeter|\bcm\b|\bmeter\b|penggaris|bersusun|meminjam|pinjam|menyimpan|simpan|×|÷|−/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: hanya bilangan sampai lima puluh (tanpa kali, bagi, kurang, bersusun, satuan baku, bilangan lebih dari lima puluh, rumus)`);
    for (const a of v.adegan) for (const i of a.ketukan.keys()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 50, `${v.id}/${a.id}#${i + 1}: angka di gambar paling besar lima puluh ("${t}")`);
  }
  cek(totalKetukan >= 70 && M_VIDEO.adegan.reduce((t, ad) => t + ad.ketukan.length, 0) >= 70, `total ketukan cukup dalam (${totalKetukan}; materi ${M_VIDEO.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)})`);
  // Durasi materi diputar 8 sampai 13 menit (dua kata per detik, sapaan termasuk).
  const kataMateri = kataVideo(M_VIDEO);
  cek(kataMateri / 120 >= 8 && kataMateri / 120 <= 13, `durasi materi diputar 8 sampai 13 menit (${(kataMateri / 120).toFixed(1)} menit)`);
  cek(kataVideo(U) / 120 >= 3, `durasi video luar paling sedikit 3 menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
}

/* ------------------------------ Nama bilangan 10 sampai 50 yang diucapkan tampak sebagai angka ------------------------------ */
const NAMA = B.NAMA_BILANGAN;
const tokoh = (s) => s.toLowerCase().split(/\s+/).filter(Boolean).map((w) => ({ w: w.replace(/[^a-z]/g, ""), akhir: /[,.;:!?]$/.test(w) }));
/** Nama bilangan 1 sampai 50 yang dimulai pada token `p`: [nilai, panjang] atau null (nama lebih panjang didahulukan; nama banyak kata tidak menyeberangi tanda baca). */
const bacaAngka = (t, p) => {
  for (let n = 50; n >= 1; n -= 1) {
    const pc = NAMA[n].split(" ");
    if (pc.every((c, q) => t[p + q]?.w === c && (q === pc.length - 1 || !t[p + q].akhir))) return [n, pc.length];
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
const NAMA_METODE_SUARA = /bingkai sepuluh|hitung sepuluh-sepuluh|garis bilangan/gi;
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

  // 2) Tanpa kalimat kurang, kali, bagi, dan "menjadi"; "ditambah" dan "sama dengan" hanya dalam pola yang dihitung ulang (bagian 3b); tanpa lambang hitung selain penjumlahan benar di gambar.
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((kt, i) => {
        const nm = `${v.id}/${a.id}#${i + 1}`;
        cek(!/dikurangi|dikali|dibagi|menjadi|dibagikan/i.test(kt.suara), `${nm}: suara tanpa kalimat hitung (kurang, kali, bagi)`);
        cek(!/\b(enam|tujuh|delapan|sembilan) puluh\b|\blima puluh (satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan)/i.test(kt.suara), `${nm}: suara tanpa bilangan lebih dari lima puluh`);
        for (const t of L.teksTerlihat(akhirAdegan(a, i))) cek(/^\d+ \+ \d+ = \d+$/.test(t) || !/\d\s*[+\-−×÷=]\s*\d/.test(t), `${nm} gambar: "${t}" tanpa lambang hitung selain penjumlahan lengkap`);
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
            cek(g.items.length >= 1 && g.items.length <= 50, `${nm} e${g.key}: banyak benda paling banyak lima puluh (${g.items.length})`);
            totalItem += g.items.length;
            let rapat = true;
            for (let p = 0; p < g.items.length; p += 1) for (let q = p + 1; q < g.items.length; q += 1) if (Math.hypot(g.items[p].o.x - g.items[q].o.x, g.items[p].o.y - g.items[q].o.y) < 17) rapat = false;
            cek(rapat, `${nm} e${g.key}: benda tidak saling menimpa`);
          }
          if (g.ln) {
            cek(/^\d+$/.test(g.ln.isi) && Number(g.ln.isi) >= 1 && Number(g.ln.isi) <= 50, `${nm} e${g.key}: angka banyaknya satu sampai lima puluh ("${g.ln.isi}")`);
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
        cek(totalItem <= 50, `${nm}: jumlah semua benda paling banyak lima puluh (${totalItem})`);
        cek(totalGores === 0, `${nm}: tanpa goresan turus`);

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
  cek(stat3.kalimat >= 5, `kalimat baca data (ada N benda) dihitung ulang cukup banyak (${stat3.kalimat})`);
  cek(stat3.kelompok >= 40, `kelompok benda diperiksa cukup banyak (${stat3.kelompok})`);
  stat.aritmetika += stat3.kalimat;
  stat.benda += stat3.kelompok + stat3.turus + stat3.tabel + stat3.diagram + stat3.pemicu;

  // 3b) Bilangan sampai lima puluh: kotak sepuluh, batang dan kubus, jalur bilangan, garis bilangan, daftar, dan kalimat suara dihitung ulang dari gambar.
  const stat5 = { kotak: 0, label: 0, batang: 0, jalur: 0, garis: 0, daftar: 0, pola: 0, pemicu: 0, sorot: 0 };
  const NBD = `${NB}|nol`;
  const nilaiNBD = (s) => (s === "nol" ? 0 : NAMA.indexOf(s));
  const nilaiTeks = (objs, id) => {
    const t = isiTeks(objs, id);
    return t !== undefined && /^\d+$/.test(t) ? Number(t) : null;
  };
  const jumlahBenda = (objs, key) => objs.filter((o) => o.t === "teks" && new RegExp(`^e${key}\\d+$`).test(o.id)).length;
  for (const v of VIDEO) {
    for (const a of v.adegan) {
      a.ketukan.forEach((kt, i) => {
        const objs = akhirAdegan(a, i);
        const nm = `${v.id}/${a.id}#${i + 1}`;
        const suara = kt.suara.toLowerCase();
        const tk = tokoh(kt.suara);
        const teksSemua = [];
        for (let p = 0; p < tk.length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) teksSemua.push(o.isi);

        // Kotak sepuluh: benda ke-i berada di kotak ke-(i div 10), petak (i mod 10): lima petak tiap baris, dua baris.
        const frames = objs.filter((o) => o.t === "kotak" && /^fr[a-z]\d+$/.test(o.id));
        for (const fr of frames) {
          const key = fr.id[2];
          const f = Number(fr.id.slice(3));
          stat5.kotak += 1;
          const c = fr.w / 5;
          cek(Math.abs(fr.h - 2 * c) < 0.01, `${nm} ${fr.id}: kotak sepuluh lima petak kali dua baris`);
          for (const kk of [1, 2, 3, 4]) cek(!!ketemu(objs, `${fr.id}-v${kk}`), `${nm} ${fr.id}: garis petak ${kk} ada`);
          cek(!!ketemu(objs, `${fr.id}-h`), `${nm} ${fr.id}: garis tengah ada`);
          cek(f === 0 || !!ketemu(objs, `fr${key}${f - 1}`), `${nm} ${fr.id}: kotak sebelumnya ada`);
          for (const it of objs.filter((o) => o.t === "teks" && new RegExp(`^e${key}\\d+$`).test(o.id))) {
            const i2 = Number(it.id.slice(2));
            if (Math.floor(i2 / 10) !== f) continue;
            const p = i2 % 10;
            const ex = fr.x + ((p % 5) + 0.5) * c;
            const ey = fr.y + (Math.floor(p / 5) + 0.5) * c;
            cek(Math.abs(it.x - ex) < 1.5 && Math.abs(it.y - (it.u ?? 18) * 0.35 - ey) < 1.5, `${nm} ${it.id}: benda tepat di petak ${p + 1} kotak ${f + 1}`);
          }
        }
        for (const it of objs.filter((o) => o.t === "teks" && /^e[a-z]\d+$/.test(o.id))) {
          const key = it.id[1];
          const f = Math.floor(Number(it.id.slice(2)) / 10);
          if (objs.some((o) => /^fr[a-z]\d+$/.test(o.id) && o.id[2] === key)) cek(!!ketemu(objs, `fr${key}${f}`), `${nm} ${it.id}: kotak sepuluh untuk benda ini tergambar`);
        }
        // Angka jumlah sampai kotak f (atau baris f): sama dengan banyak benda yang nomornya kurang dari sepuluh kali (f + 1).
        for (const lb of objs.filter((o) => o.t === "teks" && /^fn[a-z]\d+$/.test(o.id))) {
          const key = lb.id[2];
          const f = Number(lb.id.slice(3));
          stat5.label += 1;
          const n = jumlahBenda(objs, key);
          cek(n > 0 && Number(lb.isi) === Math.min(n, 10 * (f + 1)), `${nm} ${lb.id}: angka ${lb.isi} sama dengan ${Math.min(n, 10 * (f + 1))} benda sampai kotak ke-${f + 1}`);
        }
        // Petak kosong bergaris putus-putus: tepat petak yang belum terisi.
        const ko = objs.filter((o) => o.t === "kotak" && /^ko\d+$/.test(o.id));
        if (ko.length) {
          const n = jumlahBenda(objs, "a");
          cek(ko.length === 10 - n && ko.every((o) => Number(o.id.slice(2)) >= n), `${nm}: ${ko.length} petak kosong sama dengan sepuluh dikurangi ${n} benda`);
        }

        // Batang puluhan dan kubus satuan: nilai = 10 kali batang ditambah kubus.
        for (const key of new Set(objs.filter((o) => /^p[a-z]\d+-k$/.test(o.id) || /^s[a-z]\d+$/.test(o.id)).map((o) => o.id[1]))) {
          const pb = objs.filter((o) => new RegExp(`^p${key}\\d+-k$`).test(o.id));
          const sk = objs.filter((o) => new RegExp(`^s${key}\\d+$`).test(o.id));
          stat5.batang += 1;
          cek(pb.length <= 5 && sk.length <= 9 && pb.length * 10 + sk.length <= 50, `${nm}: batang ${pb.length} dan kubus ${sk.length} tidak lebih dari lima puluh`);
          cek(pb.every((o, q) => o.id === `p${key}${q}-k`) && sk.every((o, q) => o.id === `s${key}${q}`), `${nm}: batang dan kubus bernomor berurutan`);
          cek(pb.every((o) => isiTeks(objs, o.id.replace("-k", "-t")) === "10"), `${nm}: tiap batang berisi 10`);
          const vv = nilaiTeks(objs, `v${key}`);
          if (vv !== null) cek(vv === pb.length * 10 + sk.length, `${nm}: nilai ${vv} sama dengan ${pb.length} batang puluhan dan ${sk.length} kubus satuan`);
        }
        {
          const wp = nilaiTeks(objs, "wr-p");
          const ws = nilaiTeks(objs, "wr-s");
          const vw = nilaiTeks(objs, "vw");
          if (wp !== null && ws !== null && vw !== null) {
            stat5.batang += 1;
            cek(wp >= 2 && wp <= 5 && ws >= 0 && ws <= 9 && vw === wp * 10 + ws, `${nm}: angka tulis ${wp} dan ${ws} membentuk ${vw}`);
          }
        }

        // Jalur bilangan: petak berurutan, selisih satu; petak tersembunyi bertanda tanya.
        const petak = objs.filter((o) => o.t === "teks" && /^nl\d+$/.test(o.id)).sort((p, q) => Number(p.id.slice(2)) - Number(q.id.slice(2)));
        if (petak.length) {
          stat5.jalur += 1;
          cek(petak.every((o, q) => o.id === `nl${q}` && !!ketemu(objs, `nl${q}-k`)), `${nm}: petak jalur bernomor berurutan dan bertepi`);
          const nil = petak.map((o) => (/^\d+$/.test(o.isi) ? Number(o.isi) : null));
          cek(petak.every((o) => /^\d+$/.test(o.isi) || o.isi === "?") && nil.every((n) => n === null || (n >= 1 && n <= 50)), `${nm}: isi petak jalur angka atau tanda tanya`);
          const dasar = nil.findIndex((n) => n !== null);
          cek(nil.every((n, q) => n === null || n === nil[dasar] + (q - dasar)), `${nm}: jalur bilangan naik satu demi satu (${nil.join(",")})`);
          cek(nil.filter((n) => n === null).length <= 1, `${nm}: paling banyak satu petak tersembunyi`);
        }
        // Sorotan petak jalur mengikuti bilangan yang diucapkan.
        for (const ak of kt.aksi) {
          for (const u of ak.ubah === undefined ? [] : [].concat(ak.ubah)) {
            const m = /^nl(\d+)-k$/.exec(u.id);
            if (!m || u.sorot !== true) continue;
            const r = bacaAngka(tk, L.posisiKata(kt.suara, ak.at));
            const nil = nilaiTeks(objs, `nl${m[1]}`);
            if (r && nil !== null) {
              stat5.sorot += 1;
              cek(r[0] === nil, `${nm}: petak ${u.id} disorot saat "${NAMA[r[0]]}" diucapkan, petak bernilai ${nil}`);
            }
          }
        }
        // Benda, baris daftar, dan tanda garis bilangan yang muncul saat nama bilangan diucapkan: nomornya cocok.
        for (const ak of kt.aksi) {
          for (const o of ak.tambah === undefined ? [] : [].concat(ak.tambah)) {
            const r = bacaAngka(tk, L.posisiKata(kt.suara, ak.at));
            let m;
            if ((m = /^e[a-z](\d+)$/.exec(o.id)) && o.t === "teks" && r) {
              stat5.pemicu += 1;
              cek(r[0] === Number(m[1]) + 1, `${nm}: ${o.id} muncul saat "${NAMA[r[0]]}" diucapkan (harus ${NAMA[Number(m[1]) + 1]})`);
            }
            if ((m = /^(dl|gb)\d+$/.exec(o.id)) && o.t === "teks" && r) {
              stat5.pemicu += 1;
              cek(r[0] === Number(o.isi), `${nm}: ${o.id} bertuliskan ${o.isi} muncul saat "${NAMA[r[0]]}" diucapkan`);
            }
          }
        }

        // Daftar lambang dan nama bilangan.
        const dl = objs.filter((o) => o.t === "teks" && /^dl\d+$/.test(o.id)).sort((p, q) => Number(p.id.slice(2)) - Number(q.id.slice(2)));
        if (dl.length) {
          stat5.daftar += 1;
          cek(dl.every((o, q) => o.id === `dl${q}` && Number(o.isi) === Number(dl[0].isi) + q), `${nm}: lambang daftar berurutan`);
          for (const o of dl) {
            const nama = isiTeks(objs, `dm${o.id.slice(2)}`);
            cek(nama !== undefined && nilaiNB(nama) === Number(o.isi), `${nm}: nama "${nama}" cocok dengan lambang ${o.isi}`);
          }
        }

        // Garis bilangan: tanda berselisih sepuluh dan loncatan menghubungkan tanda yang berurutan.
        const tanda = objs.filter((o) => o.t === "teks" && /^gb\d+$/.test(o.id)).sort((p, q) => Number(p.id.slice(2)) - Number(q.id.slice(2)));
        if (tanda.length) {
          stat5.garis += 1;
          cek(tanda.every((o, q) => o.id === `gb${q}` && Number(o.isi) === Number(tanda[0].isi) + 10 * q && Number(o.isi) <= 50 && !!ketemu(objs, `gb${q}-k`)), `${nm}: tanda garis bilangan berselisih sepuluh`);
          for (const j of objs.filter((o) => o.t === "panah" && /^jp\d+$/.test(o.id))) {
            const q = Number(j.id.slice(2));
            const x1 = ketemu(objs, `gb${q}`);
            const x2 = ketemu(objs, `gb${q + 1}`);
            cek(!!x1 && !!x2 && j.x === x1.x && j.x + j.x2 === x2.x && j.y2 === 0, `${nm}: loncatan ${j.id} menghubungkan tanda ${q} dan ${q + 1}`);
            cek(!!x1 && !!x2 && isiTeks(objs, `jl${q}`) === `+${Number(x2.isi) - Number(x1.isi)}`, `${nm}: angka loncatan ${j.id} sama dengan selisih tanda`);
          }
        }
        // Panah maju dan mundur pada jalur: selisih satu.
        for (const j of objs.filter((o) => o.t === "panah" && /^m[ab]a$/.test(o.id))) {
          const lb = isiTeks(objs, `${j.id.slice(0, 2)}l`);
          cek(lb === (j.x2 > 0 ? "+1" : "-1"), `${nm}: panah ${j.id} berlabel ${lb} sesuai arahnya`);
        }

        // Kalimat suara berpola dihitung ulang dari gambar.
        const pb = objs.filter((o) => /^pa\d+-k$/.test(o.id)).length;
        const sk = objs.filter((o) => /^sa\d+$/.test(o.id)).length;
        const va = nilaiTeks(objs, "va");
        const jb = jumlahBenda(objs, "a");
        const hitungPola = (re) => [...suara.matchAll(re)];
        const eqTampak = (x, y, z) => teksSemua.includes(`${x} + ${y} = ${z}`);
        for (const mm of hitungPola(new RegExp(`(${NB}) ditambah (${NB}) sama dengan (${NB})(?![a-z])`, "g"))) {
          stat5.pola += 1;
          const [x, y, z] = [nilaiNB(mm[1]), nilaiNB(mm[2]), nilaiNB(mm[3])];
          cek(x + y === z && z <= 50, `${nm}: ${mm[1]} ditambah ${mm[2]} sama dengan ${mm[3]} benar (${x}+${y}=${z})`);
          cek(eqTampak(x, y, z), `${nm}: penjumlahan ${x} + ${y} = ${z} tampak di gambar`);
        }
        cek((suara.match(/ditambah/g) ?? []).length === hitungPola(new RegExp(`(${NB}) ditambah (${NB}) sama dengan (${NB})(?![a-z])`, "g")).length, `${nm}: "ditambah" hanya dalam kalimat puluhan ditambah satuan yang lengkap`);
        cek((suara.match(/sama dengan/g) ?? []).length === hitungPola(new RegExp(`(${NB}) ditambah (${NB}) sama dengan (${NB})(?![a-z])`, "g")).length, `${nm}: "sama dengan" hanya dalam kalimat penjumlahan yang lengkap`);
        for (const t of teksSemua) {
          const m = /^(\d+) \+ (\d+) = (\d+)$/.exec(t);
          if (m) cek(Number(m[1]) + Number(m[2]) === Number(m[3]) && Number(m[3]) <= 50, `${nm}: gambar "${t}" benar`);
        }
        for (const mm of hitungPola(new RegExp(`(${NB}) batang puluhan`, "g"))) {
          stat5.pola += 1;
          cek(pb > 0 && nilaiNB(mm[1]) === pb, `${nm}: "${mm[1]} batang puluhan" sama dengan ${pb} batang yang digambar`);
        }
        for (const mm of hitungPola(new RegExp(`(${NB}) kubus satuan`, "g"))) {
          stat5.pola += 1;
          cek(sk > 0 && nilaiNB(mm[1]) === sk, `${nm}: "${mm[1]} kubus satuan" sama dengan ${sk} kubus yang digambar`);
        }
        if (/tanpa kubus satuan/.test(suara)) {
          stat5.pola += 1;
          cek(pb > 0 && sk === 0, `${nm}: tanpa kubus satuan, batang ${pb}, kubus ${sk}`);
        }
        for (const mm of hitungPola(new RegExp(`(${NB}) itu (${NB}) puluhan dan (${NB}) satuan`, "g"))) {
          stat5.pola += 1;
          const [n, pp, ss] = [nilaiNB(mm[1]), nilaiNB(mm[2]), nilaiNB(mm[3])];
          cek(n === pp * 10 + ss && pb === pp && sk === ss && va === n, `${nm}: ${mm[1]} itu ${mm[2]} puluhan dan ${mm[3]} satuan sama dengan gambar (batang ${pb}, kubus ${sk}, nilai ${va})`);
        }
        for (const mm of hitungPola(new RegExp(`(${NB}) dan (${NB}) dibaca (${NB})`, "g"))) {
          stat5.pola += 1;
          const [x, y, z] = [nilaiNB(mm[1]), nilaiNB(mm[2]), nilaiNB(mm[3])];
          cek(x % 10 === 0 && y < 10 && x + y === z && va === z, `${nm}: ${mm[1]} dan ${mm[2]} dibaca ${mm[3]} benar (${x}, ${y}, ${z}; gambar ${va})`);
        }
        for (const mm of hitungPola(new RegExp(`(${NB}) ditulis angka (${NBD}) lalu angka (${NBD})`, "g"))) {
          stat5.pola += 1;
          const [n, x, y] = [nilaiNB(mm[1]), nilaiNBD(mm[2]), nilaiNBD(mm[3])];
          cek(n === x * 10 + y && nilaiTeks(objs, "wr-p") === x && nilaiTeks(objs, "wr-s") === y && nilaiTeks(objs, "vw") === n, `${nm}: ${mm[1]} ditulis angka ${mm[2]} lalu angka ${mm[3]} sama dengan kotak tulis`);
        }
        for (const mm of hitungPola(new RegExp(`(?:sesudah|setelah) (${NB}) datang (${NB})`, "g"))) {
          stat5.pola += 1;
          cek(nilaiNB(mm[2]) === nilaiNB(mm[1]) + 1, `${nm}: sesudah ${mm[1]} datang ${mm[2]} (selisih satu)`);
        }
        for (const mm of hitungPola(new RegExp(`sebelum (${NB}) ada (${NB})`, "g"))) {
          stat5.pola += 1;
          cek(nilaiNB(mm[2]) === nilaiNB(mm[1]) - 1, `${nm}: sebelum ${mm[1]} ada ${mm[2]} (selisih satu)`);
        }
        for (const mm of hitungPola(new RegExp(`dari (${NB}) ke (${NB})`, "g"))) {
          stat5.pola += 1;
          const [x, y] = [nilaiNB(mm[1]), nilaiNB(mm[2])];
          if (petak.length) cek(Math.abs(y - x) === 1 && petak.some((o) => Number(o.isi) === x) && petak.some((o) => Number(o.isi) === y), `${nm}: dari ${mm[1]} ke ${mm[2]} berselisih satu pada jalur`);
          else if (tanda.length) {
            const q = tanda.findIndex((o) => Number(o.isi) === x);
            cek(y - x === 10 && q >= 0 && Number(tanda[q + 1]?.isi) === y && !!ketemu(objs, `jp${q}`), `${nm}: dari ${mm[1]} ke ${mm[2]} berselisih sepuluh dan loncatannya tergambar`);
          } else cek(false, `${nm}: dari ${mm[1]} ke ${mm[2]} tanpa jalur atau garis bilangan`);
        }
        for (const mm of hitungPola(new RegExp(`(${NB}) butuh (${NB}) lagi supaya penuh (${NB})`, "g"))) {
          stat5.pola += 1;
          const [x, y, z] = [nilaiNB(mm[1]), nilaiNB(mm[2]), nilaiNB(mm[3])];
          cek(x + y === z && z === 10 && jb === x && eqTampak(x, y, z), `${nm}: ${mm[1]} butuh ${mm[2]} lagi supaya penuh ${mm[3]} (benda ${jb}) dan tampak di gambar`);
        }
        for (const mm of hitungPola(new RegExp(`ada (${NB}) petak kosong`, "g"))) {
          stat5.pola += 1;
          cek(nilaiNB(mm[1]) === ko.length && ko.length === 10 - jb, `${nm}: ada ${mm[1]} petak kosong sama dengan ${ko.length} petak putus-putus dan 10 - ${jb}`);
        }
        for (const mm of hitungPola(new RegExp(`(${NB}) (?:kotak|bingkai) penuh(?:,)? (?:yaitu|adalah|berisi|berarti) (${NB})`, "g"))) {
          stat5.pola += 1;
          const [x, y] = [nilaiNB(mm[1]), nilaiNB(mm[2])];
          cek(y === 10 * x && jb >= y, `${nm}: ${mm[1]} kotak penuh ${mm[2]} (benda ${jb})`);
        }
        // Pilihan jawaban memuat bilangan yang berbeda dan satu yang benar.
        const pil = [1, 2, 3].map((q) => isiTeks(objs, `c${q}-t`)).filter((t) => t !== undefined);
        if (pil.length) cek(new Set(pil).size === pil.length && pil.every((t) => /^\d+$/.test(t) && Number(t) <= 50), `${nm}: pilihan jawaban bilangan berbeda ≤ 50 (${pil.join(",")})`);
      });
    }
  }
  cek(stat5.kotak >= 30 && stat5.label >= 25 && stat5.batang >= 15 && stat5.jalur >= 15 && stat5.garis >= 4 && stat5.daftar >= 4 && stat5.pola >= 30 && stat5.pemicu >= 30 && stat5.sorot >= 15, `pemeriksaan bilangan cukup banyak (${JSON.stringify(stat5)})`);
  stat.aritmetika += stat5.pola;
  stat.benda += stat5.kotak + stat5.label + stat5.batang + stat5.jalur + stat5.garis + stat5.daftar + stat5.pemicu + stat5.sorot;

  // 4) Pemeriksaan isi tiap adegan (angka tepat, urutan, pilihan jawaban, dihitung ulang dari gambar).
  {
    const cnt = (objs, key) => objs.filter((o) => new RegExp(`^e${key}\\d+$`).test(o.id)).length;
    const pilih = (objs) => [1, 2, 3].map((q) => ({ t: isiTeks(objs, `c${q}-t`), s: ketemu(objs, `c${q}-k`)?.sorot })).filter((c) => c.t !== undefined);
    const dipilih = (objs) => pilih(objs).filter((c) => c.s).map((c) => c.t);
    const pb = (objs) => objs.filter((o) => /^pa\d+-k$/.test(o.id)).length;
    const sk = (objs) => objs.filter((o) => /^sa\d+$/.test(o.id)).length;
    const perKotak = (objs, key = "a") => {
      const n = cnt(objs, key);
      return Array.from({ length: Math.ceil(n / 10) }, (_, f) => Math.min(10, n - f * 10));
    };
    const labelFn = (objs, key = "a") => objs.filter((o) => new RegExp(`^fn${key}\\d+$`).test(o.id)).sort((p, q) => p.id.localeCompare(q.id)).map((o) => o.isi);
    const barisY = (objs, key = "a") => {
      const peta = new Map();
      for (const o of objs.filter((q) => new RegExp(`^e${key}\\d+$`).test(q.id))) peta.set(o.y, (peta.get(o.y) ?? 0) + 1);
      return [...peta.entries()].sort((p, q) => p[0] - q[0]).map((e) => e[1]);
    };
    const nilaiJalur = (objs) => objs.filter((o) => /^nl\d+$/.test(o.id) && o.t === "teks").sort((p, q) => Number(p.id.slice(2)) - Number(q.id.slice(2))).map((o) => o.isi);
    const jmlSorot = (objs, pre) => objs.filter((o) => new RegExp(`^${pre}\\d+$`).test(o.id) && o.sorot).length;
    const sorotJalurDi = (objs) => objs.filter((o) => /^nl\d+-k$/.test(o.id) && o.sorot).map((o) => o.id);
    const urut = (dari, sampai) => Array.from({ length: sampai - dari + 1 }, (_, q) => String(dari + q));
    const daftarIsi = (objs) => objs.filter((o) => /^dl\d+$/.test(o.id)).sort((p, q) => Number(p.id.slice(2)) - Number(q.id.slice(2))).map((o) => o.isi);

    // Tas di rak toko Upe: dua puluh enam tas, baris sepuluh, sepuluh, enam.
    sama([cnt(di("rak-tas", 3), "a"), barisY(di("rak-tas", 3))], [26, [10, 10, 6]], "rak tas: 26 tas dalam tiga baris (10, 10, 6)");
    sama([jmlSorot(di("rak-tas", 2), "ea"), jmlSorot(di("rak-tas", 3), "ea")], [10, 0], "rak tas: sepuluh tas pertama disorot lalu diredam");
    const hs = di("hitung-satu", 5);
    sama([cnt(hs, "a"), labelAngka(hs, "ea").map((o) => o.isi), isiTeks(hs, "ea-ln")], [26, urut(1, 26), "26"], "hitung satu per satu: angka 1 sampai 26 pada 26 tas, banyaknya 26");
    sama(labelAngka(di("hitung-satu", 1), "ea").map((o) => o.isi), urut(1, 10), "hitung satu per satu: baris pertama dihitung 1 sampai 10");
    sama(labelAngka(di("hitung-satu", 2), "ea").map((o) => o.isi), urut(1, 20), "hitung satu per satu: baris kedua dihitung 11 sampai 20");

    // Kotak sepuluh: lima kotak penuh sampai lima puluh.
    const ks = di("kotak-sepuluh", 5);
    sama([perKotak(ks), labelFn(ks), ks.filter((o) => /^fra\d+$/.test(o.id)).length], [[10, 10, 10, 10, 10], ["10", "20", "30", "40", "50"], 5], "kotak sepuluh: lima kotak penuh, 10, 20, 30, 40, 50 (lima puluh benda)");
    sama([perKotak(di("kotak-sepuluh", 2)), perKotak(di("kotak-sepuluh", 4))], [[10], [10, 10, 10]], "kotak sepuluh: kotak terisi bertahap (1 lalu 3 kotak)");
    // Sepuluh, sepuluh, enam.
    const se = di("sepuluh-sepuluh-enam", 4);
    sama([perKotak(se), labelFn(se), isiTeks(se, "ea-ln"), isiTeks(di("sepuluh-sepuluh-enam", 3), "eq-t0")], [[10, 10, 6], ["10", "20", "26"], "26", "20 + 6 = 26"], "sepuluh sepuluh enam: kotak 10, 10, 6; 20 + 6 = 26");
    // Puluhan dan satuan: 26 = 2 puluhan 6 satuan.
    const ps = di("puluhan-satuan", 4);
    sama([pb(ps), sk(ps), nilaiTeks(ps, "va"), isiTeks(ps, "eq-t0")], [2, 6, 26, "20 + 6 = 26"], "puluhan satuan: 2 batang, 6 kubus, 26, 20 + 6 = 26");
    sama([pb(di("puluhan-satuan", 0)), pb(di("puluhan-satuan", 1)), sk(di("puluhan-satuan", 2))], [1, 2, 6], "puluhan satuan: batang bertambah 1 lalu 2, kubus 6");
    // Membaca bilangan: 31, 47, 30.
    sama([[pb(di("baca-bilangan", 0)), sk(di("baca-bilangan", 0)), nilaiTeks(di("baca-bilangan", 0), "va")], [pb(di("baca-bilangan", 3)), sk(di("baca-bilangan", 3)), nilaiTeks(di("baca-bilangan", 3), "va")], [pb(di("baca-bilangan", 5)), sk(di("baca-bilangan", 5)), nilaiTeks(di("baca-bilangan", 5), "va")]], [[3, 1, 31], [4, 7, 47], [3, 0, 30]], "membaca bilangan: 31 (3 batang 1 kubus), 47 (4 batang 7 kubus), 30 (3 batang tanpa kubus)");
    // Menulis bilangan: 47, 28, 30.
    const tulis = (ke) => [nilaiTeks(di("tulis-bilangan", ke), "wr-p"), nilaiTeks(di("tulis-bilangan", ke), "wr-s"), nilaiTeks(di("tulis-bilangan", ke), "vw")];
    sama([tulis(2), tulis(3), tulis(4)], [[4, 7, 47], [2, 8, 28], [3, 0, 30]], "menulis bilangan: 47, 28, 30 (angka kiri puluhan, angka kanan satuan)");
    // Daftar nama bilangan.
    sama([daftarIsi(di("daftar-bilangan", 0)), daftarIsi(di("daftar-bilangan", 2))], [urut(21, 25), urut(26, 30)], "daftar bilangan: 21 sampai 25 lalu 26 sampai 30");
    // Jalur bilangan maju dan mundur.
    sama([nilaiJalur(di("menghitung-maju", 0)), nilaiJalur(di("menghitung-mundur", 0))], [urut(20, 30), urut(20, 30)], "jalur bilangan maju dan mundur: 20 sampai 30");
    sama(sorotJalurDi(di("menghitung-maju", 1)), ["nl5-k"], "maju: sorotan terakhir pada petak 25");
    sama(sorotJalurDi(di("menghitung-maju", 2)), ["nl10-k"], "maju: sorotan terakhir pada petak 30");
    sama(sorotJalurDi(di("menghitung-mundur", 1)), ["nl5-k"], "mundur: sorotan terakhir pada petak 25");
    sama(sorotJalurDi(di("menghitung-mundur", 2)), ["nl0-k"], "mundur: sorotan terakhir pada petak 20");
    sama([isiTeks(di("menghitung-maju", 3), "mal"), ketemu(di("menghitung-maju", 3), "maa").x2 > 0, isiTeks(di("menghitung-mundur", 3), "mbl"), ketemu(di("menghitung-mundur", 3), "mba").x2 < 0], ["+1", true, "-1", true], "panah maju ke kanan (+1) dan mundur ke kiri (-1)");
    // Sebelum dan sesudah.
    sama([nilaiJalur(di("sebelum-sesudah", 0)), nilaiJalur(di("sebelum-sesudah", 2)), nilaiJalur(di("sebelum-sesudah", 3))], [urut(39, 43), ["39", "40", "41", "?", "43"], urut(39, 43)], "sebelum sesudah: 39 sampai 43, petak 42 disembunyikan lalu dibuka");
    // Tebak dan buktikan: 34 apel, tebakan 30.
    const tb = di("tebak-buktikan", 4);
    sama([cnt(di("tebak-buktikan", 1), "a"), barisY(di("tebak-buktikan", 1)), perKotak(tb), labelFn(tb), isiTeks(tb, "ea-ln"), isiTeks(tb, "tc-t0")], [34, [9, 9, 9, 7], [10, 10, 10, 4], ["10", "30", "34"], "34", "tebakan: 30"], "tebak buktikan: 34 apel (9, 9, 9, 7) lalu kotak 10, 10, 10, 4; tebakan 30 hampir tepat");
    // Latihan.
    const l1 = di("latihan-satu", 3);
    sama([cnt(l1, "a"), perKotak(l1), labelFn(l1), pilih(l1).map((c) => c.t), dipilih(l1), isiTeks(l1, "eq-t0")], [43, [10, 10, 10, 10, 3], ["10", "40", "43"], ["42", "43", "44"], ["43"], "40 + 3 = 43"], "latihan 1: 43 kelereng (10, 10, 10, 10, 3); jawaban 43 dipilih");
    const l2 = di("latihan-dua", 3);
    sama([pb(l2), sk(l2), nilaiTeks(l2, "va"), pilih(l2).map((c) => c.t), dipilih(l2)], [3, 8, 38, ["28", "38", "48"], ["38"]], "latihan 2: 3 batang, 8 kubus = 38; jawaban 38 dipilih");
    const l3 = di("latihan-tiga", 3);
    sama([nilaiJalur(di("latihan-tiga", 0)), nilaiJalur(l3), pilih(l3).map((c) => c.t), dipilih(l3)], [["44", "45", "?", "47", "48"], urut(44, 48), ["45", "46", "47"], ["46"]], "latihan 3: 44 45 ? 47 48; petak hilang 46 dipilih");
    // Metode luar: Bingkai Sepuluh.
    const b3 = di("luar-bingkai", 2);
    sama([cnt(b3, "a"), isiTeks(b3, "ea-ln")], [10, "10"], "luar bingkai: bingkai penuh sepuluh");
    const b5 = di("luar-bingkai", 4);
    sama([cnt(b5, "a"), isiTeks(b5, "eq-t0"), cnt(di("luar-bingkai", 4), "a")], [7, "5 + 2 = 7", 7], "luar bingkai: tujuh benda, 5 + 2 = 7");
    const b6 = di("luar-bingkai", 5);
    sama([cnt(b6, "a"), b6.filter((o) => /^ko\d+$/.test(o.id)).length, isiTeks(b6, "bt-t0")], [7, 3, "7 + 3 = 10"], "luar bingkai: tujuh benda, tiga petak kosong, 7 + 3 = 10");
    const bt = di("luar-bingkai-terapan", 3);
    sama([cnt(bt, "a"), perKotak(bt), labelFn(bt), isiTeks(bt, "ea-ln"), pilih(bt).map((c) => c.t), dipilih(bt), isiTeks(di("luar-bingkai-terapan", 1), "eq-t0")], [27, [10, 10, 7], ["20"], "27", ["26", "27", "28"], ["27"], "20 + 7 = 27"], "luar bingkai terapan: 27 benda (10, 10, 7); jawaban 27 dipilih");
    // Metode luar: Hitung Sepuluh-Sepuluh.
    const s3 = di("luar-sepuluh", 2);
    sama([cnt(s3, "a"), barisY(s3), labelFn(s3), labelAngka(s3, "ea").map((o) => o.isi), isiTeks(di("luar-sepuluh", 3), "ea-ln")], [34, [10, 10, 10, 4], ["10", "20", "30", "34"], urut(31, 34), "34"], "luar sepuluh: 34 balon (10, 10, 10, 4), 10 20 30 lalu 31 sampai 34");
    const s5 = di("luar-sepuluh-terapan", 3);
    sama([cnt(s5, "a"), barisY(s5), labelFn(s5), labelAngka(s5, "ea").map((o) => o.isi), pilih(s5).map((c) => c.t), dipilih(s5), isiTeks(s5, "ea-ln")], [47, [10, 10, 10, 10, 7], ["10", "20", "30", "40", "47"], urut(41, 47), ["46", "47", "48"], ["47"], undefined], "luar sepuluh terapan: 47 jeruk (10, 10, 10, 10, 7); jawaban 47 dipilih");
    sama(isiTeks(di("luar-sepuluh-terapan", 4), "ea-ln"), "47", "luar sepuluh terapan: banyaknya 47");
    // Metode luar: Garis Bilangan.
    const g5 = di("luar-garis", 4);
    sama([g5.filter((o) => /^gb\d+$/.test(o.id) && o.t === "teks").map((o) => o.isi), g5.filter((o) => /^jp\d+$/.test(o.id)).length, g5.filter((o) => /^jl\d+$/.test(o.id)).map((o) => o.isi)], [["20", "30", "40", "50"], 3, ["+10", "+10", "+10"]], "luar garis: tanda 20 30 40 50, tiga loncatan +10");
    const gt = di("luar-garis-terapan", 4);
    sama([nilaiJalur(di("luar-garis-terapan", 0)), labelAngka(di("luar-garis-terapan", 1), "nl").map((o) => o.isi), pilih(gt).map((c) => c.t), dipilih(gt)], [urut(30, 40), urut(1, 7), ["36", "38", "39"], ["38"]], "luar garis terapan: jalur 30 sampai 40, langkah 1 sampai 7, jawaban 38 dipilih");
    sama(labelAngka(di("luar-garis-terapan", 1), "nl").map((o) => nilaiTeks(di("luar-garis-terapan", 1), `nl${o.id.slice(3)}`)), urut(31, 37).map(Number), "luar garis terapan: langkah ke-n tepat di atas petak 30 + n");
    stat.benda += 60;
  }

  // Aturan pemilik: aplikasi belajar mandiri; tanpa instruksi kelompok, teman, kelas, atau buku.
  {
    const MANDIRI = /kerja kelompok|berkelompok|secara berkelompok|diskusi kelompok|sekelompok|kelompokmu|kelompok belajar|bersama kelompok|tanya teman|survei|karet gelang|uang tabungan|\bpaman\b|\btika\b|\bteman\w*|\bkawan\w*|sekawan|depan kelas|bersama kelas|seluruh kelas|\bkelas\b|berpasangan dengan (teman|kawan)|bekerja berpasangan|secara berpasangan|bermain bersama|bertanya kepada|buat ceritamu|buku|menulis di|menuliskan di|tulis di|tuliskan di|menggambar|gambarlah|gambar sendiri|\bbawa(lah)?\b|membawa|dibawa|\bkertas\b|\bpensil\b|\bpulpen\b|\bspidol\b|ambil (benda|pensil|kelereng|bola|sedotan|balon)|tangan (kiri|kanan)|\bjari\b|menyuruh|suruh|jengkal|telapak|\bdepa\b|penggaris|\bkoin\b|di sekitar|di rumah|di kelas|centimeter|\bmeter\b|kakimu|tanganmu|badanmu|\braba\w*|\bmeraba|\btubuh|\blengan|lingkari|coret|guru kelas|di rumah|orang tua|\bayah\b|\bibu guru|bapak guru|\bloker\b|singapura|\bkelompokkan lah|bermain bersama/i;
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
  const DAFTAR = ["Menghitung benda", "Membaca dan menulis bilangan", "Maju, mundur, dan menebak"];
  cek(/Halo anak-anak/.test(sap.ketukan[0].suara) && /Menghitung benda/i.test(L.teksTerlihat(akhirAdegan(sap, 1)).join(" | ")), "sapaan materi: tiga hal yang dipelajari tampil");
  sama(L.teksTerlihat(akhirAdegan(sap, 1)).filter((t) => DAFTAR.includes(t)), DAFTAR, "sapaan materi: daftar tiga hal");
  cek(!/\d/.test(sap.ketukan[1].suara) && !/\d/.test(DAFTAR.join(" ")), "sapaan materi: tanpa angka");
  const sapLuar = adegan(U, "sapaan");
  cek(/cara lain/i.test(L.teksTerlihat(akhirAdegan(sapLuar, 1)).join(" | ")) && /metode-luar|Metode luar/.test(sapLuar.sumber), "sapaan metode luar: pengumuman cara lain");
  const sumberRingkas = JSON.parse(readFileSync(new URL("../src/data/kelas2-bab1-ringkas.json", import.meta.url), "utf8")).subBab?.A;
  const sementara = new URL("../.tmp-k2b1s/A.json", import.meta.url);
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
    cek(A.petaSusun.pusat.judul.length <= 28, "peta susun: judul pusat <= 28 huruf");
    cek(!/\d/.test(A.petaSusun.pusat.suara) && !/\d/.test(A.petaSusun.petunjuk) && peta.every((s) => !/\d/.test(s.petunjuk ?? "")), "peta susun: suara dan petunjuk tanpa digit");
    cek(A.petaSusun.pusat.judul.length > 8 && /\?$/.test(A.petaSusun.pusat.judul), "peta susun: pusat berupa masalah (pertanyaan) sub-bab");
    const T = A.tabelSusun;
    cek(T.baris.length >= 3 && T.baris.length <= 5 && T.kolom.length >= 3 && T.kolom.length <= 4, "tabel susun: 3 sampai 5 baris dan 3 sampai 4 kolom");
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 26 && (s.match(/\d+/g) ?? []).length <= 1)), "tabel susun: sel <= 26 huruf dan paling banyak satu angka per sel");
    cek(T.baris.every((b) => b.label.split(/\s+/).every((w) => w.length <= 8)), "tabel susun: kata terpanjang kolom label <= 8 huruf");
    cek(!/\d/.test(T.suara) && !/\d/.test(T.petunjuk), "tabel susun: suara dan petunjuk tanpa digit");
    // Isi tabel dihitung ulang dari bilangan yang ada pada video materi: kolom puluhan, satuan, dan bilangan sesudahnya.
    sama(T.kolom, ["Puluhan", "Satuan", "Sesudah"], "tabel susun: kolom puluhan, satuan, sesudah");
    const nilaiVideo = [
      Number(isiTeks(akhirAdegan(adegan(M_VIDEO, "puluhan-satuan")), "va")),
      Number(isiTeks(akhirAdegan(adegan(M_VIDEO, "baca-bilangan"), 0), "va")),
      Number(isiTeks(akhirAdegan(adegan(M_VIDEO, "baca-bilangan"), 3), "va")),
      Number(isiTeks(akhirAdegan(adegan(M_VIDEO, "latihan-dua")), "va")),
    ];
    cek(T.baris.length === nilaiVideo.length && nilaiVideo.every((n) => T.baris.some((b) => b.label === String(n))), `tabel susun: baris sama dengan bilangan pada video materi (${nilaiVideo.join(",")})`);
    for (const n of nilaiVideo) {
      const b = T.baris.find((x) => x.label === String(n));
      cek(!!b && b.sel[0] === String(Math.floor(n / 10)) && b.sel[1] === String(n % 10) && b.sel[2] === String(n + 1) && n + 1 <= 50, `tabel susun: baris ${n} (puluhan ${Math.floor(n / 10)}, satuan ${n % 10}, sesudah ${n + 1}) dihitung ulang`);
    }
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 8)), "tabel susun: sel pendek supaya margin teks >= 5 px di 405 px");
    cek(T.baris.every((b) => Number(b.label) <= 50 && b.sel.every((s) => Number(s) <= 50)), "tabel susun: semua bilangan paling besar lima puluh");
    const KATA_LARANG = /buku|halaman|kunci|kerja kelompok|berkelompok|\bteman|kawan|kelas\b|kertas|pensil|\bbawa\b|menggambar|menulis di|depan kelas|luas|keliling|di rumah|survei|karet gelang|uang tabungan|di sekitar|\bpaman\b|\btika\b|loker|ibu guru|singapura/i;
    cek(!KATA_LARANG.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: tanpa kata terlarang dan tanpa kelompok, teman, kelas, buku, kertas, pensil, loker, Ibu guru");
    cek(peta.every((s) => ![...s.teks, ...(s.ikon ?? "")].some((c) => c.codePointAt(0) > 0x1fa95)), "peta susun: emoji paling tinggi Emoji 12");
  } else cek(false, "peta dan tabel susun: .tmp-k2b1s/A.json atau kelas2-bab1-ringkas.json subBab.A.petaSusun ada");
}

/* ------------------------------ Emoji, akhir baris, dan kemurnian ------------------------------ */
{
  const folder = new URL("../src/components/modul/story/", import.meta.url);
  const berkas = readdirSync(folder).filter((f) => /^(k2b1A-.*)\.(ts|tsx)$/.test(f));
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
    cek(impor.every((i) => /^\.\/(logika-story|sapaan|k2b1A-[a-z0-9-]+)$/.test(i)), `${f}: hanya mengimpor logika dan berkas bab k2b1A sendiri (${impor.join(", ")})`);
  }
  // Emoji dalam data teks gambar juga paling tinggi Emoji 12 (diperiksa pada gambar yang diputar).
  for (const v of VIDEO) for (const a of v.adegan) for (let i = 0; i < a.ketukan.length; i += 1) for (const o of akhirAdegan(a, i)) if (o.t === "teks") cek(![...(o.isi ?? "")].some((c) => c.codePointAt(0) > 0x1fa95 || c.codePointAt(0) === 0x200d), `${v.id}/${a.id}: emoji gambar paling tinggi Emoji 12`);
  const mesin = readFileSync(new URL("mesin-story.tsx", folder), "utf8");
  cek(!/video-visual-kit|video-visual-k[456]|AdeganVisual|visualK[456]/.test(mesin), "mesin-story: tanpa kit visual lama");
  const pembungkus = readFileSync(new URL("../src/components/modul/video-k2b1a.tsx", import.meta.url), "utf8");
  cek(!/video-visual-adegan|AdeganVisual|naskah-k1b/.test(pembungkus) && /VIDEO_MATERI_K2B1A/.test(pembungkus) && /VIDEO_LUAR_K2B1A/.test(pembungkus) && /export function VideoK2B1A/.test(pembungkus) && /daftar-video-cerita/.test(pembungkus), "video-k2b1a.tsx: dua video dari mesin Story, tanpa naskah lama");
  cek(!/\r/.test(pembungkus), "video-k2b1a.tsx: akhir baris LF");
  const sendiri = readFileSync(new URL("uji-story-k2b1A.mjs", import.meta.url), "utf8");
  cek(!/\r/.test(sendiri), "uji-story-k2b1A.mjs: akhir baris LF");
}

for (const v of VIDEO) {
  const n = kataVideo(v);
  if (process.env.RINCI) for (const ad of v.adegan) console.log(`  ${ad.id}: ${ad.ketukan.length} ketukan, ${ad.ketukan.reduce((t, kt) => t + L.kataDari(kt.suara).length, 0)} kata`);
  console.log(`${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, ad) => t + ad.ketukan.length, 0)} ketukan, ${n} kata (sekitar ${(n / 120).toFixed(1)} menit diputar)`);
}
console.log(`Pemeriksaan: ${stat.hitung} deret hitungan, ${jumlahNama} nama bilangan tampak sebagai angka, ${stat.aritmetika} kalimat bilangan, ${stat.benda} pemeriksaan benda dan bingkai`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
