// Uji Story Kelas 3 Bab 2 Sub-Bab A (Kalimat Matematika Penjumlahan): dua video (materi kurikulum dan metode luar) dengan mesin animasi Story.
// Memeriksa: pemicu kata, suara tanpa digit, perubahan gambar tiap ketukan, keunikan antaradegan, batas kanvas, teks bertumpuk, pemisahan materi dan metode luar (nama metode hanya Indonesia),
// kata terlarang (buku, kelompok, teman, kelas, benda fisik), tokoh hanya enam, kalimat pendek, gambar lebih banyak daripada teks,
// dan HITUNG ULANG dari struktur adegan: persamaan lima bagian, bagan jumlah, timbangan, bungkus sepuluh, pilihan latihan, bilangan yang disebut di suara tampak di gambar,
// isi tabel susun, struktur peta susun, dan emoji paling tinggi Emoji 12.
// Jalankan: node --no-warnings scripts/uji-story-k3b2A.mjs
import { readFileSync, existsSync } from "node:fs";
import { register } from "node:module";

register(
  "data:text/javascript," +
    encodeURIComponent(`export async function resolve(s, c, n) { if ((s.startsWith('./') || s.startsWith('../')) && !/\\.[a-z]+$/.test(s)) { try { return await n(s + '.ts', c); } catch {} } return n(s, c); }`),
  import.meta.url,
);
const L = await import("../src/components/modul/story/logika-story.ts");
const V = await import("../src/components/modul/story/k3b2A-video.ts");
const U1 = await import("../src/components/modul/story/k3b2A-luar-1.ts");
const B = await import("../src/components/modul/story/k3b2A-bantu.ts");

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
const VIDEO = [V.VIDEO_MATERI_K3B2A, V.VIDEO_LUAR_K3B2A];
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
const M_VIDEO = V.VIDEO_MATERI_K3B2A;
const U = V.VIDEO_LUAR_K3B2A;
const adegan = (v, id) => v.adegan.find((a) => a.id === id);
const akhirAdegan = (a, ke = a.ketukan.length - 1) => L.keadaanStory(a, ke, 9999);
const teksAdegan = (a) => JSON.stringify([a.judul, a.ketukan.map((kt, i) => [kt.suara, L.teksTerlihat(L.keadaanStory(a, i, 9999))])]);
const ketemu = (objs, id) => objs.find((o) => o.id === id);
const NAMA_LUAR = /Timbangan Seimbang|Loncat Garis Bilangan|Bungkus Sepuluh|metode luar|metode dari luar/i;
const NAMA_INGGRIS = /Balance Scale|Number Line|Jump Strategy|Bundle|Bar Model|Part-Whole|Inverse Operation|Missing Number|Number Bond|Counting On|Singapore Math|Van de Walle/i;
const kataVideo = (v) => v.adegan.reduce((t, ad) => t + ad.ketukan.reduce((u, kt) => u + L.kataDari(kt.suara).length, 0), 0);
const picto = (o) => o.t !== "teks" || /^\p{Extended_Pictographic}/u.test(o.isi ?? "");
{
  const teksVideo = (v) => JSON.stringify(v.adegan.map(teksAdegan));
  const materi = teksVideo(M_VIDEO);
  const luar = teksVideo(U);
  cek(!NAMA_LUAR.test(materi), "video materi tidak memuat nama metode luar");
  for (const m of U1.NAMA_METODE_ID) cek(luar.includes(m), `video metode luar memuat ${m}`);
  sama(U1.NAMA_METODE_ID, ["Timbangan Seimbang", "Loncat Garis Bilangan", "Bungkus Sepuluh"], "nama Indonesia metode luar");
  cek(!NAMA_INGGRIS.test(materi) && !NAMA_INGGRIS.test(luar), "nama metode hanya bahasa Indonesia");
  const TERLARANG = /buku|panduan guru|hlm|halaman|kunci|rubrik|salah ketik|salah cetak|tambahan video|contoh video|temuan|pertemuan|loker|ibu guru|singapura/i;
  const LARANG_ATURAN = /kelompok|\bteman|kawan|\bkelas\b|kertas|pensil|penggaris|\bbawa\b|pisau|\bkoin\b|\buang\b|benda nyata|sekolah|\brumah\b/i;
  for (const v of [M_VIDEO, U]) {
    cek(!TERLARANG.test(`${v.judul} ${v.subjudul}`), `${v.id}: judul dan subjudul video tanpa kata terlarang`);
    cek(!/nomor|no\./i.test(v.subjudul) && v.subjudul.length <= 40, `${v.id}: subjudul pendek tanpa nomor halaman`);
    let gambar = 0;
    let kata = 0;
    for (const a of v.adegan) {
      const semua = [a.judul, a.sumber];
      a.ketukan.forEach((kt, i) => {
        semua.push(kt.suara);
        for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) semua.push(...L.teksTerlihat(L.keadaanStory(a, i, p)));
        // Kalimat pendek: tiap kalimat paling banyak 17 kata.
        for (const kal of kt.suara.split(/(?<=[.?!])\s+/)) cek(L.kataDari(kal).length <= 17, `${v.id}/${a.id}#${i + 1}: kalimat pendek (paling banyak 17 kata): "${kal}"`);
        const akhir = L.keadaanStory(a, i, 9999);
        gambar += akhir.filter(picto).length;
        kata += akhir.filter((o) => !picto(o) && o.isi && (o.op ?? 1) > 0).length;
        const lisan = akhir.filter((o) => !picto(o) && o.isi && (o.op ?? 1) > 0);
        cek(lisan.length <= 12, `${v.id}/${a.id}#${i + 1}: paling banyak 12 teks terlihat (ada ${lisan.length})`);
        cek(lisan.every((o) => o.isi.length <= 34), `${v.id}/${a.id}#${i + 1}: tiap teks layar paling banyak 34 huruf`);
      });
      const kena = semua.filter((t) => TERLARANG.test(t) || /soal nomor|nomor [1-9]|catatan video|menurut buku/i.test(t));
      cek(kena.length === 0, `${v.id}/${a.id}: tanpa penyebutan buku atau catatan sumber (${kena.slice(0, 2).join(" | ")})`);
      const larang = semua.filter((t) => LARANG_ATURAN.test(t));
      cek(larang.length === 0, `${v.id}/${a.id}: tanpa kerja kelompok, kelas, teman, kertas, benda fisik nyata (${larang.slice(0, 2).join(" | ")})`);
      cek(!/Uji Kompetensi|Pengayaan|Ayo Berlatih|Ayo Berdiskusi|Ayo Berefleksi|Ayo Mengingat|Ayo Berkomunikasi|Ayo Berpikir|Ayo Berkarya|Ayo Bermain|Ayo Mencoba|soal \d|Soal \d|Aktivitas|Eksplorasi|Refleksi/.test(semua.join(" | ")), `${v.id}/${a.id}: latihan disajikan sebagai Latihan, tanpa istilah buku`);
      // Tokoh hanya enam tokoh tetap (Malosi, Kira, Upe, Wei, Halim, Igil): tanpa nama lain dari data sumber.
      cek(!/\b(Tika|Lili|Paman|Ibu|Ayah|Bapak|Budi|Ani|Doni|Sinta|Dewi|Rudi|Nina|Andi|Siti|Bu Guru|Pak Guru|Pak|Ahmad|Alfa|Galih|Alen|Meutia|Bandi|Slamet)\b/.test(semua.join(" | ")), `${v.id}/${a.id}: hanya enam tokoh tetap`);
      cek(semua.every((t) => ![...t].some((c) => c.codePointAt(0) > 0x1fa95)), `${v.id}/${a.id}: emoji paling tinggi Emoji 12`);
    }
    cek(gambar >= kata, `${v.id}: gambar lebih banyak daripada teks (gambar ${gambar}, teks ${kata})`);
  }
  cek(M_VIDEO.subjudul === "Materi kurikulum" && U.subjudul === "Tiga metode luar", "subjudul video: Materi kurikulum dan Tiga metode luar");
  cek(M_VIDEO.adegan.every((a) => /^Materi: /.test(a.sumber) && a.sumber.length <= 46), "video materi: label sumber berbentuk Materi: ... dan pendek");
  cek(U.adegan.every((a) => /Metode luar|Ringkasan/i.test(a.sumber) && a.sumber.length <= 46), "video metode luar: label sumber metode luar atau ringkasan, pendek");
  cek(M_VIDEO.id === "k3b2A-materi" && U.id === "k3b2A-luar", "id video k3b2A-materi dan k3b2A-luar");
  cek(U.judul.endsWith(": Metode dari Luar") && !/menurut/i.test(M_VIDEO.judul), "judul video: materi tanpa 'menurut', luar berakhir ': Metode dari Luar'");
  cek(M_VIDEO.adegan.map((a) => a.id).join() === "sapaan,cerita-bintang,titik-titik,nama-kalimat,halim-kira,bagan-jumlah,jumlah-dikurangi,periksa,contoh-8,contoh-23,contoh-depan,contoh-36,kemungkinan-100,latihan-satu,latihan-dua,latihan-tiga,penutup", "urutan adegan materi");
  cek(U.adegan.map((a) => a.id).join() === "sapaan,luar-pembuka,luar-timbangan,luar-timbangan-terapan,luar-loncat,luar-loncat-terapan,luar-bungkus,luar-bungkus-terapan,luar-ringkas", "urutan adegan metode luar");
  cek(M_VIDEO.adegan[0].id === "sapaan" && U.adegan[0].id === "sapaan", "tiap video dibuka adegan sapaan");
  cek(M_VIDEO.adegan.filter((a) => /^latihan-/.test(a.id)).length === 3 && M_VIDEO.adegan[M_VIDEO.adegan.length - 1].id === "penutup", "video materi: Latihan 1 sampai 3 lalu penutup");
  cek(U.adegan[1].id === "luar-pembuka" && U.adegan[U.adegan.length - 1].id === "luar-ringkas", "video metode luar: pembuka dan ringkasan");
  cek(U.adegan.length - 3 === 6, "video metode luar: konsep dan penerapan untuk tiga metode (6 adegan di antara pembuka dan ringkasan)");
  for (const kata of ["Latihan", "Halim", "Kira", "Wei", "kalimat Matematika", "titik-titik", "dikurangi", "bagan", "periksa", "jumlah", "tujuh belas", "lima puluh", "dua puluh", "seratus", "sembilan belas", "empat puluh lima", "tiga puluh delapan", "tidak hanya satu"]) cek(materi.toLowerCase().includes(kata.toLowerCase()), `video materi memuat "${kata}"`);
  cek(["Upe", "Kira"].every((n) => luar.includes(n)), "video metode luar memuat tokoh Upe dan Kira");
  // Batas bab: bilangan sampai seratus, tanpa perkalian, pembagian, rumus, atau satuan baku.
  const BOCOR = /kilogram|gram|kg|dikali|perkalian|pembagian|rumus|ribu|×|÷|liter/i;
  for (const v of [M_VIDEO, U]) {
    for (const a of v.adegan) cek(!BOCOR.test(teksAdegan(a)), `${v.id}/${a.id}: tanpa satuan baku, rumus, perkalian, ribuan`);
    for (const a of v.adegan) for (const i of a.ketukan.keys()) for (const t of L.teksTerlihat(L.keadaanStory(a, i, 9999))) for (const b of bilanganDari(t)) cek(Number(b) <= 100, `${v.id}/${a.id}#${i + 1}: angka di gambar paling besar seratus ("${t}")`);
  }
  const ketMateri = M_VIDEO.adegan.reduce((t, ad) => t + ad.ketukan.length, 0);
  cek(totalKetukan >= 90 && ketMateri >= 55, `total ketukan cukup dalam (${totalKetukan}; materi ${ketMateri})`);
  const kataMateri = kataVideo(M_VIDEO);
  cek(kataMateri / 120 >= 5.5 && kataMateri / 120 <= 12, `durasi materi diputar 5,5 sampai 12 menit (${(kataMateri / 120).toFixed(1)} menit)`);
  cek(kataVideo(U) / 120 >= 2.5, `durasi video luar paling sedikit 2,5 menit (${(kataVideo(U) / 120).toFixed(1)} menit)`);
}

/* ------------------------------ Ejaan, bilangan lisan, dan hitungan dihitung ulang dari struktur adegan ------------------------------ */
const W9 = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9 };
const NUMTOK = new Set(["seratus", "ratus", "puluh", "belas", "sepuluh", "sebelas", ...Object.keys(W9)]);
const nilaiRun = (t) => {
  let v = 0;
  for (let i = 0; i < t.length; i += 1) {
    const w = t[i];
    if (w === "seratus") v += 100;
    else if (W9[w] && t[i + 1] === "ratus") {
      v += W9[w] * 100;
      i += 1;
    } else if (W9[w] && t[i + 1] === "puluh") {
      v += W9[w] * 10;
      i += 1;
    } else if (W9[w] && t[i + 1] === "belas") {
      v += 10 + W9[w];
      i += 1;
    } else if (w === "sepuluh") v += 10;
    else if (w === "sebelas") v += 11;
    else if (W9[w]) v += W9[w];
  }
  return v;
};
const frasaBilangan = (s) => {
  const out = [];
  for (const seg of s.toLowerCase().split(/[,.?!:;]/)) {
    let run = [];
    const tutup = () => {
      if (run.length) out.push({ teks: run.join(" "), nilai: nilaiRun(run) });
      run = [];
    };
    for (const w of seg.split(/\s+/).filter(Boolean)) {
      if (NUMTOK.has(w)) run.push(w);
      else tutup();
    }
    tutup();
  }
  return out;
};
for (let n = 1; n <= 999; n += 1) cek(nilaiRun(B.eja(n).split(" ")) === n, `ejaan ${n}: dibaca kembali sama (${B.eja(n)})`);
sama([B.eja(8), B.eja(19), B.eja(23), B.eja(38), B.eja(54), B.eja(100)], ["delapan", "sembilan belas", "dua puluh tiga", "tiga puluh delapan", "lima puluh empat", "seratus"], "ejaan bilangan contoh");

const stat = { kalimat: 0, selisih: 0, eq5: 0, bagan: 0, timbangan: 0, bungkus: 0, lisan: 0, pilihan: 0, contoh: 0, tabel: 0 };
const ADD = /^(\d+|…|\?) \+ (\d+|…|\?) = (\d+|…|\?)$/;
const SUB = /^(\d+) − (\d+) = (\d+|\?)$/;
const angkaTeks = (s) => (/^\d+$/.test(s ?? "") ? Number(s) : null);
/** Kalimat penjumlahan atau pengurangan dalam satu teks: dihitung ulang. Mengembalikan true bila teks berbentuk kalimat. */
const periksaKalimat = (s, nama) => {
  let m = ADD.exec(s);
  if (m) {
    const [a, b, c] = [angkaTeks(m[1]), angkaTeks(m[2]), angkaTeks(m[3])];
    const kosong = [a, b, c].filter((x) => x === null).length;
    cek(kosong <= 1, `${nama}: paling banyak satu bilangan belum diketahui di "${s}"`);
    if (kosong === 0) cek(a + b === c, `${nama}: "${s}" benar secara hitungan`);
    else if (c === null) cek(a !== null && b !== null, `${nama}: jumlah belum diketahui hanya bila kedua bagian ada ("${s}")`);
    else cek((a ?? b) <= c, `${nama}: bilangan yang diketahui tidak melebihi jumlah ("${s}")`);
    stat.kalimat += 1;
    return true;
  }
  m = SUB.exec(s);
  if (m) {
    const [a, b, c] = [Number(m[1]), Number(m[2]), angkaTeks(m[3])];
    cek(a >= b, `${nama}: pengurangan tidak negatif ("${s}")`);
    if (c !== null) cek(a - b === c, `${nama}: "${s}" benar secara hitungan`);
    stat.selisih += 1;
    return true;
  }
  return false;
};
const nilaiBungkus = (objs, awalan, ambangDim = 0.5) => {
  const p = objs.filter((o) => new RegExp(`^${awalan}-p\\d+$`).test(o.id));
  const s = objs.filter((o) => new RegExp(`^${awalan}-s\\d+$`).test(o.id));
  const terang = (o) => (o.op ?? 1) >= ambangDim;
  return { ada: p.length + s.length > 0, nilai: p.filter(terang).length * 10 + s.filter(terang).length, redup: p.filter((o) => !terang(o)).length * 10 + s.filter((o) => !terang(o)).length };
};
const NILAI_BUNGKUS = { ua: 10, ub: 31, uc: 31, vt: 31, vt2: 31 };
for (const v of [M_VIDEO, U]) {
  for (const a of v.adegan) {
    const terlihatAdegan = new Set();
    a.ketukan.forEach((kt, i) => {
      for (let p = 0; p < L.kataDari(kt.suara).length; p += 1) for (const o of L.keadaanStory(a, i, p)) if (o.t === "teks" && o.isi) for (const b of bilanganDari(o.isi)) terlihatAdegan.add(Number(b));
    });
    a.ketukan.forEach((kt, i) => {
      const nama = `${v.id}/${a.id}#${i + 1}`;
      const objs = L.keadaanStory(a, i, 9999);
      // Bilangan yang disebut di suara (paling sedikit sepuluh) tampak di gambar.
      for (const f of frasaBilangan(kt.suara.replace(/Bungkus Sepuluh/g, "Bungkus"))) {
        if (f.nilai >= 10) {
          stat.lisan += 1;
          cek(terlihatAdegan.has(f.nilai), `${nama}: bilangan lisan "${f.teks}" (${f.nilai}) tampak di gambar adegan`);
        }
      }
      for (const o of objs) if (o.t === "teks" && o.isi) periksaKalimat(o.isi, nama);
      // Persamaan lima bagian: bagian 0..4 digabung.
      for (const p of ["eq", "eb", "ep"]) {
        const bag = [0, 1, 2, 3, 4].map((q) => ketemu(objs, `${p}${q}-t`)?.isi);
        if (bag.every((x) => x !== undefined)) {
          stat.eq5 += 1;
          cek(periksaKalimat(bag.join(" "), `${nama} ${p}`), `${nama}: persamaan ${p} berbentuk kalimat ("${bag.join(" ")}")`);
        }
      }
      // Bagan jumlah.
      const bg = ["bg-a-t", "bg-b-t", "bg-c-t"].map((id) => ketemu(objs, id)?.isi);
      if (bg.every((x) => x !== undefined)) {
        stat.bagan += 1;
        const [t, x, y] = bg.map(angkaTeks);
        if (t !== null && x !== null && y !== null) cek(x + y === t, `${nama}: bagan ${x} + ${y} = ${t}`);
        const kosong = bg.filter((s) => angkaTeks(s) === null).length;
        cek(kosong <= 2 && angkaTeks(bg[0]) !== null, `${nama}: bagan memuat jumlah dan paling banyak dua bagian belum diketahui`);
      }
      // Timbangan.
      const tk = ketemu(objs, "tm-kiri-t")?.isi;
      const tn = ketemu(objs, "tm-kanan-t")?.isi;
      if (tk !== undefined && tn !== undefined) {
        stat.timbangan += 1;
        const m = /^(\d+) \+ (\d+|\?)$/.exec(tk);
        cek(!!m && angkaTeks(tn) !== null, `${nama}: timbangan berbentuk "a + b" dan "jumlah" ("${tk}" | "${tn}")`);
        if (m && angkaTeks(tn) !== null) {
          if (m[2] === "?") cek(Number(m[1]) < Number(tn), `${nama}: timbangan sisi kiri belum penuh (${tk} | ${tn})`);
          else cek(Number(m[1]) + Number(m[2]) === Number(tn), `${nama}: timbangan seimbang (${tk} | ${tn})`);
        }
      }
      // Bungkus sepuluh.
      for (const [awalan, harus] of Object.entries(NILAI_BUNGKUS)) {
        const b = nilaiBungkus(objs, awalan);
        if (!b.ada) continue;
        stat.bungkus += 1;
        if (b.redup === 0) cek(b.nilai === harus, `${nama}: bungkus ${awalan} bernilai ${b.nilai}, seharusnya ${harus}`);
        else cek(b.redup === 18 && b.nilai === 13, `${nama}: bungkus ${awalan} dikeluarkan delapan belas, sisa tiga belas (redup ${b.redup}, sisa ${b.nilai})`);
      }
      const kc = ketemu(objs, "kc-t0")?.isi;
      if (kc !== undefined) cek(nilaiBungkus(objs, "ub").nilai === Number(kc), `${nama}: kartu bilangan sama dengan bungkus (${kc})`);
    });
  }
}
cek(stat.kalimat >= 25 && stat.selisih >= 8 && stat.eq5 >= 20 && stat.bagan >= 5 && stat.timbangan >= 5 && stat.bungkus >= 6 && stat.lisan >= 30, `cakupan hitung ulang cukup (${JSON.stringify(stat)})`);

/* ------------------------------ Contoh, kemungkinan, dan pilihan latihan ------------------------------ */
const CONTOH = [["contoh-8", 8, 19, false], ["contoh-23", 23, 45, false], ["contoh-depan", 16, 54, true], ["contoh-36", 36, 68, true]];
const SUMBER_TABEL = [];
for (const [id, tahu, c, depan] of CONTOH) {
  const a = adegan(M_VIDEO, id);
  cek(!!a && a.ketukan.length === 4, `${id}: empat ketukan`);
  if (!a) continue;
  const objs = akhirAdegan(a);
  const eq = [0, 1, 2, 3, 4].map((q) => ketemu(objs, `eq${q}-t`)?.isi);
  const jawab = c - tahu;
  stat.contoh += 1;
  sama(eq, depan ? [String(jawab), "+", String(tahu), "=", String(c)] : [String(tahu), "+", String(jawab), "=", String(c)], `${id}: persamaan akhir dihitung ulang`);
  cek(ketemu(objs, "eb4-t")?.isi === String(jawab) && ketemu(objs, "eb0-t")?.isi === String(c) && ketemu(objs, "eb2-t")?.isi === String(tahu), `${id}: jumlah dikurangi bilangan diketahui sama dengan isi titik-titik`);
  cek(periksaKalimat(ketemu(objs, "pk-t0")?.isi ?? "", id) && ketemu(objs, "pk-t0").isi === eq.join(" "), `${id}: kartu periksa sama dengan persamaan akhir`);
  const awal = akhirAdegan(a, 0);
  cek(ketemu(awal, depan ? "eq0-t" : "eq2-t")?.isi === "…", `${id}: titik-titik pada tempat yang benar di awal (${depan ? "depan" : "belakang"})`);
  SUMBER_TABEL.push({ label: `${depan ? "…" : tahu} + ${depan ? tahu : "…"} = ${c}`, sel: [String(tahu), String(c), String(jawab)] });
}
{
  const a = adegan(M_VIDEO, "kemungkinan-100");
  const objs = akhirAdegan(a);
  const pasang = [1, 2, 3].map((i) => ketemu(objs, `m${i}-t0`)?.isi);
  cek(pasang.every((s) => periksaKalimat(s ?? "", "kemungkinan") && /= 100$/.test(s)), `kemungkinan: tiga pasangan berjumlah seratus (${pasang.join(" | ")})`);
  cek(new Set(pasang).size === 3, "kemungkinan: tiga pasangan berbeda");
  cek(ketemu(objs, "bg-a-t")?.isi === "100", "kemungkinan: bagan jumlah seratus");
}
const LATIHAN = [
  ["latihan-satu", "c2", (t) => /^… \+ 20 = 55$/.test(t), "… + 20 = 55"],
  ["latihan-dua", "c3", (t) => Number(t) === 40 - 12, "28"],
  ["latihan-tiga", "c1", (t) => Number(t) === 70 - 25, "45"],
];
for (const [id, benar, adalah, teksBenar] of LATIHAN) {
  const a = adegan(M_VIDEO, id);
  const objs = akhirAdegan(a, 2);
  const kartu = [1, 2, 3].map((i) => ketemu(objs, `c${i}-t`)?.isi);
  stat.pilihan += 1;
  cek(kartu.every((t) => typeof t === "string") && new Set(kartu).size === 3, `${id}: tiga pilihan berbeda (${kartu.join(" | ")})`);
  cek(kartu.filter((t) => t && adalah(t)).length === 1, `${id}: tepat satu pilihan benar (${kartu.join(" | ")})`);
  const sorot = objs.filter((o) => o.sorot).map((o) => o.id);
  sama(sorot, [`${benar}-k`], `${id}: satu pilihan disorot`);
  cek(ketemu(objs, `${benar}-t`)?.isi === teksBenar && adalah(teksBenar), `${id}: pilihan yang disorot adalah jawaban benar`);
}
{
  // Pilihan timbangan: tujuh puluh dikurangi dua puluh lima.
  const a = adegan(U, "luar-timbangan-terapan");
  const objs = akhirAdegan(a, 1);
  const kartu = [1, 2, 3].map((i) => ketemu(objs, `c${i}-t`)?.isi);
  cek(kartu.filter((t) => Number(t) === 70 - 25).length === 1 && new Set(kartu).size === 3, `timbangan terapan: tepat satu pilihan benar (${kartu.join(" | ")})`);
  const objs2 = L.keadaanStory(a, 2, 1);
  sama(objs2.filter((o) => o.sorot).map((o) => o.id), ["c1-k"], "timbangan terapan: pilihan benar disorot");
  cek(ketemu(objs2, "c1-t")?.isi === "45" && ketemu(akhirAdegan(a, 2), "tm-kiri-t")?.isi === "25 + 45", "timbangan terapan: jawaban benar mengisi sisi kiri");
}
{
  // Loncat: jumlah loncatan sama dengan jumlah yang dicari.
  const a1 = adegan(U, "luar-loncat");
  const o1 = akhirAdegan(a1);
  cek(ketemu(o1, "lc1-t")?.isi === "+10" && ketemu(o1, "lc2-t")?.isi === "+10" && ketemu(o1, "kj-t0")?.isi === "30 + 20 = 50", "loncat: dua loncatan sepuluh dari tiga puluh ke lima puluh");
  const a2 = adegan(U, "luar-loncat-terapan");
  const o2 = akhirAdegan(a2);
  cek(ketemu(o2, "lc1-t")?.isi === "+2" && ketemu(o2, "lc2-t")?.isi === "+10" && ketemu(o2, "kt-t0")?.isi === "2 + 10 = 12" && ketemu(o2, "kp-t0")?.isi === "38 + 12 = 50", "loncat terapan: dua tambah sepuluh sama dengan dua belas, tiga puluh delapan tambah dua belas sama dengan lima puluh");
  cek(Number(ketemu(o2, "gb-l38")?.isi) === 38 && Number(ketemu(o2, "gb-l40")?.isi) === 40 && Number(ketemu(o2, "gb-l50")?.isi) === 50, "loncat terapan: garis bilangan memuat tiga puluh delapan, empat puluh, lima puluh");
}
{
  const a = adegan(U, "luar-bungkus-terapan");
  const o = akhirAdegan(a);
  cek(ketemu(o, "kn-t0")?.isi === "13" && nilaiBungkus(o, "vt2").nilai === 13 && ketemu(o, "kz-t0")?.isi === "18 + 13 = 31", "bungkus terapan: sisa tiga belas, delapan belas tambah tiga belas sama dengan tiga puluh satu");
}

/* ------------------------------ Mind-Map dan Infografis susun ------------------------------ */
{
  const S = await import("../src/components/modul/susun-logika.ts");
  let A = null;
  const sementara = ".tmp-k3b2A-ringkas.json";
  if (existsSync(sementara)) A = JSON.parse(readFileSync(sementara, "utf8"));
  else if (existsSync("src/data/kelas3-bab2-ringkas.json")) A = JSON.parse(readFileSync("src/data/kelas3-bab2-ringkas.json", "utf8")).subBab?.A;
  if (A && A.petaSusun && A.tabelSusun) {
    for (const e of S.periksaPeta(A.petaSusun)) cek(false, `peta susun: ${e}`);
    for (const e of S.periksaTabel(A.tabelSusun)) cek(false, `tabel susun: ${e}`);
    const peta = A.petaSusun.simpul;
    const anak = (id) => peta.filter((s) => s.induk === id).map((s) => s.teks);
    const akar = peta.filter((s) => s.induk === null);
    cek(akar.length === 3, "peta susun: tiga cabang dari pusat");
    const sapaan = akhirAdegan(adegan(M_VIDEO, "sapaan"), 1);
    const DAFTAR = [0, 1, 2].map((q) => ketemu(sapaan, `sp${q}-t`)?.isi);
    sama(anak(akar[0].id), DAFTAR, "peta susun: cabang pertama sama dengan daftar sapaan");
    sama([anak(akar[0].id).length, anak(akar[1].id).length, anak(akar[2].id).length, peta.length], [3, 3, 2, 11], "peta susun: 3 hal, 3 cara, 2 hasil, 11 simpul");
    sama(peta.map((s) => s.nomor), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], "peta susun: nomor 1 sampai 11");
    cek(peta.every((s) => s.teks.length <= 28) && new Set(peta.map((s) => s.teks)).size === peta.length, "peta susun: teks <= 28 huruf dan unik");
    cek(A.petaSusun.pusat.judul.length <= 28 && A.petaSusun.pusat.judul.length > 8 && /\?$/.test(A.petaSusun.pusat.judul), "peta susun: pusat berupa pertanyaan <= 28 huruf");
    cek(!/\d/.test(A.petaSusun.pusat.suara) && !/\d/.test(A.petaSusun.petunjuk) && peta.every((s) => !/\d/.test(s.petunjuk ?? "")), "peta susun: suara dan petunjuk tanpa digit");
    const T = A.tabelSusun;
    cek(T.baris.length >= 3 && T.baris.length <= 5 && T.kolom.length >= 3 && T.kolom.length <= 4, "tabel susun: 3 sampai 5 baris dan 3 sampai 4 kolom");
    cek(T.baris.every((b) => b.sel.every((s) => s.length <= 8 && (s.match(/\d+/g) ?? []).length <= 1)), "tabel susun: sel <= 8 huruf dan paling banyak satu angka per sel");
    cek(!/\d/.test(T.suara) && !/\d/.test(T.petunjuk), "tabel susun: suara dan petunjuk tanpa digit");
    sama(T.kolom, ["Diketahui", "Jumlah", "Titik-titik"], "tabel susun: kolom diketahui, jumlah, titik-titik");
    sama(T.baris.map((b) => b.label), SUMBER_TABEL.map((b) => b.label), "tabel susun: baris sama dengan empat contoh");
    for (const b of T.baris) {
      stat.tabel += 1;
      const dari = SUMBER_TABEL.find((x) => x.label === b.label);
      sama(b.sel, dari?.sel, `tabel susun: baris ${b.label} dihitung ulang dari adegan contoh`);
      const m = /^(\d+|…) \+ (\d+|…) = (\d+)$/.exec(b.label);
      cek(!!m && Number(b.sel[0]) + Number(b.sel[2]) === Number(b.sel[1]), `tabel susun: baris ${b.label}: diketahui + titik-titik = jumlah`);
    }
    const KATA_LARANG = /buku|halaman|kunci|kerja kelompok|berkelompok|kelompok|\bteman|kawan|kelas\b|kertas|pensil|\bbawa\b|loker|ibu guru|singapura|timbangan seimbang|loncat garis bilangan|bungkus sepuluh|galih|andi\b/i;
    cek(!KATA_LARANG.test(JSON.stringify({ p: A.petaSusun, t: A.tabelSusun })), "peta dan tabel susun: tanpa kata terlarang, kelompok, teman, kelas, buku, dan nama metode luar");
    cek(peta.every((s) => ![...s.teks, ...(s.ikon ?? "")].some((c) => c.codePointAt(0) > 0x1fa95)), "peta susun: emoji paling tinggi Emoji 12");
  } else cek(false, "peta dan tabel susun: .tmp-k3b2A-ringkas.json atau kelas3-bab2-ringkas.json subBab.A.petaSusun ada");
}

console.log(`Hitung ulang: ${JSON.stringify(stat)}`);
console.log(`${VIDEO.map((v) => `${v.id}: ${v.adegan.length} adegan, ${v.adegan.reduce((t, a) => t + a.ketukan.length, 0)} ketukan, ${kataVideo(v)} kata (sekitar ${(kataVideo(v) / 120).toFixed(1)} menit diputar)`).join("\n")}`);
console.log(`Lulus ${lulus}, gagal ${gagal}; ${totalKetukan} ketukan, ${totalKata} kata`);
process.exit(gagal ? 1 : 0);
